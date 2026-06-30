import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dim1on7ce',
  api_key:    '457156778655876',
  api_secret: 'xaiJ0Eq9hqipA_NAAW18yYQK1k8',
});

async function listFolderDetails(folder) {
  console.log(`\n=== Listing details for: ${folder} ===`);
  for (const type of ['image', 'video', 'raw']) {
    try {
      const res = await cloudinary.api.resources_by_asset_folder(folder, {
        resource_type: type,
        max_results: 10
      });
      const resources = res.resources || [];
      console.log(`Type "${type}": found ${resources.length}`);
      resources.forEach(r => {
        console.log(`- ID: ${r.public_id} | Type: ${r.resource_type} | Format: ${r.format} | URL: ${r.secure_url}`);
      });
    } catch (e) {
      console.log(`Failed for type "${type}":`, e.message || e);
    }
  }
}

async function run() {
  await listFolderDetails('myworks/photography_projects');
  await listFolderDetails('myworks/video_editing_works');
}

run();
