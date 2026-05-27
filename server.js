// Local dev API server — mirrors the Vercel serverless function exactly.
// Runs on port 3001; Vite proxies /api → http://localhost:3001
//
// Usage: npm run dev  (starts both this server AND Vite together via concurrently)

import 'dotenv/config';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app  = express();
const PORT = 3001;

// ── Lightweight in-memory cache ──────────────────────────────────────────────
// Prevents hammering the Cloudinary API on every hot-reload during development.
const cache     = new Map();   // key: category slug, value: { data, expiresAt }
const CACHE_TTL = 60_000;      // 60 seconds

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { cache.delete(key); return null; }
  return entry.data;
}
function setCache(key, data) {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL });
}

// ── Helper: inject optimisation transformations into image URLs ───────────────
function optimiseImageUrl(url) {
  return url.replace('/upload/', '/upload/q_auto,f_auto,w_800/');
}

// ── Helper: build preview thumbnail URL for PDFs stored as raw resources ────────
function pdfPreviewUrl(cloudName, publicId) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/pg_1,q_auto,f_auto,w_800/${publicId}.jpg`;
}

// ── Helper: Fetch folder assets from candidates list ──────────────────────────
async function fetchAssetsFromCandidates(candidates) {
  for (let i = 0; i < candidates.length; i++) {
    const folder = candidates[i];
    try {
      console.log(`[API] Fetching from candidate folder: ${folder}`);
      const res = await cloudinary.api.resources_by_asset_folder(folder, { max_results: 100 });
      console.log(`[API] Success fetching from folder "${folder}"`);
      const resources = res.resources || [];
      return {
        folder,
        resources
      };
    } catch (err) {
      const isNotFound = err.error && err.error.http_code === 404 && err.error.message.includes("Folder doesn't exist");
      if (isNotFound && i < candidates.length - 1) {
        console.log(`[API] Folder "${folder}" not found. Trying next candidate...`);
        continue;
      }
      if (isNotFound) {
        console.log(`[API] All folder candidates exhausted.`);
        return { folder, resources: [] };
      }
      throw err;
    }
  }
}

// ── Route: GET /api/projects/:category ───────────────────────────────────────
// Mirrors /api/projects/[category].js in the Vercel functions directory.
app.get('/api/projects/:category', async (req, res) => {
  const { category } = req.params;

  if (!category) {
    return res.status(400).json({ error: 'Missing category parameter' });
  }

  // Return cached response if still fresh
  const cached = getCached(category);
  if (cached) {
    console.log(`[API] Cache hit for "${category}"`);
    return res.json(cached);
  }

  const candidateMappings = {
    'social-media-promotional-videos': [
      'myworks/social_media_promotional_videos',
      'VEEDU/Social_Media_Fromotional_Videos',
      'VEEDU/Social_Media_Promotional_Videos'
    ],
    'photography-projects': [
      'myworks/photography_projects',
      'VEEDU/Photography_Projects'
    ],
    'video-editing-works': [
      'myworks/video_editing_works',
      'VEEDU/Video_Editing_Works'
    ]
  };

  const candidates = candidateMappings[category] || [`VEEDU/${category}`, `myworks/${category}`];
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;

  try {
    const { folder, resources } = await fetchAssetsFromCandidates(candidates);
    console.log(`[API] Resolved category "${category}" to folder "${folder}" | Found ${resources.length} total resources`);

    // Map images and videos
    const mediaItems = resources
      .filter((r) => r.resource_type === 'image' || r.resource_type === 'video')
      .map((r) => ({
        url:       r.resource_type === 'image'
                     ? optimiseImageUrl(r.secure_url)
                     : r.secure_url,
        preview:   r.resource_type === 'image'
                     ? optimiseImageUrl(r.secure_url)
                     : r.secure_url,
        type:      r.resource_type,
        format:    r.format,
        public_id: r.public_id,
        width:     r.width  ?? null,
        height:    r.height ?? null,
      }));

    // Map raw PDFs
    const pdfItems = resources
      .filter((r) => r.resource_type === 'raw' && r.format === 'pdf')
      .map((r) => ({
        url:       r.secure_url,
        preview:   pdfPreviewUrl(cloudName, r.public_id),
        type:      'raw',
        format:    'pdf',
        public_id: r.public_id,
        width:     null,
        height:    null,
      }));

    const allItems = [...mediaItems, ...pdfItems];
    console.log(`[API] Returned ${allItems.length} items for "${category}"`);

    setCache(category, allItems);
    return res.json(allItems);

  } catch (err) {
    console.error('[API] Cloudinary fetch error:', err);
    return res.status(500).json({
      error:  'Failed to fetch media from Cloudinary',
      detail: err.message || String(err),
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Local API server running at http://localhost:${PORT}`);
  console.log(`   Cloud: ${process.env.CLOUDINARY_CLOUD_NAME || '⚠ CLOUDINARY_CLOUD_NAME not set'}\n`);
});
