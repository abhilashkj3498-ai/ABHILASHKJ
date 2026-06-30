import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dim1on7ce',
  api_key:    '457156778655876',
  api_secret: 'xaiJ0Eq9hqipA_NAAW18yYQK1k8',
});

async function fetchFromCandidates(candidates) {
  for (let i = 0; i < candidates.length; i++) {
    const folder = candidates[i];
    try {
      console.log(`[API] Fetching from candidate folder: ${folder}`);
      // Fetch in parallel
      const [images, videos, raws] = await Promise.all([
        cloudinary.api.resources_by_asset_folder(folder, { resource_type: 'image', max_results: 100 }),
        cloudinary.api.resources_by_asset_folder(folder, { resource_type: 'video', max_results: 100 }),
        cloudinary.api.resources_by_asset_folder(folder, { resource_type: 'raw', max_results: 100 }),
      ]);
      
      console.log(`[API] Success fetching from: ${folder}`);
      return {
        folder,
        images: images.resources || [],
        videos: videos.resources || [],
        raws: raws.resources || []
      };
    } catch (err) {
      const isNotFound = err.error && err.error.http_code === 404 && err.error.message.includes("Folder doesn't exist");
      if (isNotFound && i < candidates.length - 1) {
        console.log(`[API] Folder "${folder}" not found. Trying next candidate...`);
        continue;
      }
      if (isNotFound) {
        console.log(`[API] All folder candidates exhausted. Folder not found.`);
        return { folder, images: [], videos: [], raws: [] };
      }
      throw err;
    }
  }
}

async function run() {
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

  for (const [category, candidates] of Object.entries(candidateMappings)) {
    console.log(`\n--- Resolving for category: ${category} ---`);
    const result = await fetchFromCandidates(candidates);
    console.log(`Result: Selected folder = "${result.folder}"`);
    console.log(`Counts: Images: ${result.images.length}, Videos: ${result.videos.length}, Raws: ${result.raws.length}`);
  }
}

run();
