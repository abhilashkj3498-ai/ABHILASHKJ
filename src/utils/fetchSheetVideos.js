/**
 * Google Sheets CSV → YouTube embed video utility
 *
 * Fetches a published Google Sheets CSV, parses it, sorts by `order`,
 * and converts YouTube watch/short URLs into embeddable iframes.
 *
 * Sheet structure: order,videoName,link
 */

// ── CSV parser ────────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];          // header + at least one data row

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());

  return lines.slice(1).map((line) => {
    // Handle quoted CSV fields properly
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    values.push(current.trim());

    const row = {};
    headers.forEach((h, i) => {
      row[h] = values[i] ?? '';
    });
    return row;
  });
}

// ── YouTube URL → embed URL ──────────────────────────────────────────────────
function toEmbedUrl(url) {
  if (!url) return null;

  let videoId = null;

  // youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) { videoId = watchMatch[1]; }

  // youtu.be/ID
  if (!videoId) {
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) { videoId = shortMatch[1]; }
  }

  // youtube.com/shorts/ID
  if (!videoId) {
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) { videoId = shortsMatch[1]; }
  }

  // youtube.com/embed/ID (already embed)
  if (!videoId) {
    const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) { videoId = embedMatch[1]; }
  }

  if (!videoId) return url;   // fallback: return as-is

  return `https://www.youtube.com/embed/${videoId}`;
}

// ── YouTube thumbnail URL ────────────────────────────────────────────────────
function toThumbnailUrl(url) {
  if (!url) return null;

  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);

  const videoId = embedMatch?.[1] || watchMatch?.[1] || shortMatch?.[1] || shortsMatch?.[1];
  if (!videoId) return null;

  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// ── Mapping of slug → Google Sheets CSV URL ──────────────────────────────────
const SHEET_CSV_URLS = {
  'social-media-promotional-videos':
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQbTkTm_sEO1hLi_n4zYwYUcRp0A5VsQELftEW4CTO0v_V95EEDPZ2aLfkSM4PkiicrG-7d0qi-zi6T/pub?output=csv',
  'video-editing-works':
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSeATbxGZLPQV466Bki2Y-KTyExz8qJ2t-lDkwNzekTihsfiE-RZ_ghNjioGBr4zQATy0i41v3PXQq7/pub?output=csv',
};

/**
 * Check whether a given category slug uses Google Sheets as its data source.
 */
export function isSheetCategory(slug) {
  return slug in SHEET_CSV_URLS;
}

/**
 * Fetch video data from a Google Sheet CSV for a given category slug.
 * Returns an array of objects: { id, url, embedUrl, thumbnail, filename, isVideo, isYouTube }
 * sorted by the `order` column ascending.
 */
export async function fetchSheetVideos(slug) {
  const csvUrl = SHEET_CSV_URLS[slug];
  if (!csvUrl) throw new Error(`No Google Sheet URL configured for slug: ${slug}`);

  const response = await fetch(csvUrl);
  if (!response.ok) throw new Error(`Failed to fetch sheet: ${response.status}`);

  const text = await response.text();
  const rows = parseCSV(text);

  // Sort by order ascending (parse as integer)
  rows.sort((a, b) => (parseInt(a.order, 10) || 0) - (parseInt(b.order, 10) || 0));

  return rows.map((row, index) => {
    const rawLink = row.link || '';
    const embedUrl = toEmbedUrl(rawLink);
    const thumbnail = toThumbnailUrl(rawLink);

    return {
      id:         `sheet-${slug}-${index}`,
      url:        embedUrl,
      embedUrl,
      thumbnail,
      preview:    thumbnail,
      filename:   row.videoname || row.videoName || `Video ${index + 1}`,
      isVideo:    true,
      isYouTube:  true,
      isPDF:      false,
      format:     'youtube',
    };
  });
}
