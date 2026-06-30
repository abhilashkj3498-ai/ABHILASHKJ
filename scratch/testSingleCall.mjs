import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dim1on7ce',
  api_key:    '457156778655876',
  api_secret: 'xaiJ0Eq9hqipA_NAAW18yYQK1k8',
});

async function run() {
  try {
    console.log('Testing single resources_by_asset_folder call on photography_projects:');
    const resPhoto = await cloudinary.api.resources_by_asset_folder('myworks/photography_projects', {
      max_results: 100
    });
    console.log('Photography assets count:', resPhoto.resources ? resPhoto.resources.length : 0);
    if (resPhoto.resources) {
      resPhoto.resources.forEach(r => {
        console.log(`- ID: ${r.public_id} | Type: ${r.resource_type} | Format: ${r.format}`);
      });
    }

    console.log('\nTesting single resources_by_asset_folder call on video_editing_works:');
    const resVideo = await cloudinary.api.resources_by_asset_folder('myworks/video_editing_works', {
      max_results: 100
    });
    console.log('Video assets count:', resVideo.resources ? resVideo.resources.length : 0);
    if (resVideo.resources) {
      resVideo.resources.forEach(r => {
        console.log(`- ID: ${r.public_id} | Type: ${r.resource_type} | Format: ${r.format}`);
      });
    }
  } catch (err) {
    console.error('Error running test:', err);
  }
}

run();
