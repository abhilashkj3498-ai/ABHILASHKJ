import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Inject Cloudinary image optimisation transformations.
 * Only applied to images — videos and raw files are returned as-is.
 */
function optimiseImageUrl(url) {
  return url.replace('/upload/', '/upload/q_auto,f_auto,w_800/');
}

/**
 * Build a preview thumbnail URL for a PDF stored as a raw Cloudinary resource.
 * Uses Cloudinary's pg_1 (page 1) transformation to render the first page as JPEG.
 */
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

/**
 * Vercel serverless handler
 * Route: GET /api/projects/[category]
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  const { category } = req.query;
  if (!category) return res.status(400).json({ error: 'Missing category parameter' });

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
    console.log(`[API] Successfully mapped ${allItems.length} total items`);

    return res.status(200).json(allItems);

  } catch (error) {
    console.error('[API] Cloudinary API Error:', error);
    return res.status(500).json({
      error:  error.message || String(error),
      media:  [],
    });
  }
}
