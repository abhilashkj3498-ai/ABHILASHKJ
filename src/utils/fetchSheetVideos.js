/**
 * Google Sheets CSV → Google Drive embed video utility
 *
 * Fetches a published Google Sheets CSV, parses it, sorts by `order`,
 * and converts Google Drive share URLs into embeddable iframes.
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

// ── Google Drive URL → embed URL ──────────────────────────────────────────────
// Supports:
//   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//   https://drive.google.com/open?id=FILE_ID
//   https://drive.google.com/file/d/FILE_ID/preview   (already embed)
function toEmbedUrl(url) {
  if (!url) return null;

  // drive.google.com/file/d/FILE_ID/...
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
  }

  // drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    return `https://drive.google.com/file/d/${openMatch[1]}/preview`;
  }

  // drive.google.com/uc?id=FILE_ID  (direct download link)
  const ucMatch = url.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (ucMatch) {
    return `https://drive.google.com/file/d/${ucMatch[1]}/preview`;
  }

  return url;   // fallback: return as-is
}

// ── Google Drive file ID extractor ───────────────────────────────────────────
function extractDriveFileId(url) {
  if (!url) return null;

  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];

  const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) return openMatch[1];

  const ucMatch = url.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (ucMatch) return ucMatch[1];

  return null;
}

// ── Google Drive thumbnail URL ────────────────────────────────────────────────
// Uses Drive's built-in thumbnail endpoint (no API key required).
function toThumbnailUrl(url) {
  const fileId = extractDriveFileId(url);
  if (!fileId) return null;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
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
 * Returns an array of objects: { id, url, embedUrl, thumbnail, filename, isVideo, isDrive }
 * sorted by the `order` column ascending.
 */
export async function fetchSheetVideos(slug) {
  const csvUrl = SHEET_CSV_URLS[slug];
  if (!csvUrl) throw new Error(`No Google Sheet URL configured for slug: ${slug}`);

  const response = await fetch(csvUrl);
  if (!response.ok) throw new Error(`Failed to fetch sheet: ${response.status}`);

  const text = await response.text();
  const rows = parseCSV(text).filter((row) => row.link && row.link.trim() !== '');

  // Sort by order ascending (parse as integer)
  rows.sort((a, b) => (parseInt(a.order, 10) || 0) - (parseInt(b.order, 10) || 0));

  return rows.map((row, index) => {
    const rawLink = row.link || '';
    const embedUrl  = toEmbedUrl(rawLink);
    const thumbnail = toThumbnailUrl(rawLink);

    return {
      id:         `sheet-${slug}-${index}`,
      url:        embedUrl,
      embedUrl,
      thumbnail,
      preview:    thumbnail,
      filename:   row.video || row.videoname || row.videoName || `Video ${index + 1}`,
      isVideo:    true,
      isYouTube:  false,
      isDrive:    true,
      isPDF:      false,
      format:     'drive',
    };
  });
}
