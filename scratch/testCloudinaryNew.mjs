import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dim1on7ce',
  api_key:    '457156778655876',
  api_secret: 'xaiJ0Eq9hqipA_NAAW18yYQK1k8',
});

async function run() {
  try {
    console.log('Querying the 20 most recent resources in the account...');
    const res = await cloudinary.api.resources({
      type: 'upload',
      direction: 'desc',
      sort_by: 'created_at',
      max_results: 20
    });
    
    console.log(`Found ${res.resources ? res.resources.length : 0} resources:`);
    if (res.resources) {
      res.resources.forEach((r, idx) => {
        console.log(`${idx + 1}. [${r.resource_type}] ${r.public_id} | Created: ${r.created_at} | Folder: ${r.folder} | AssetFolder: ${r.asset_folder}`);
      });
    }
  } catch (err) {
    console.error('Error running test:', err);
  }
}

run();
