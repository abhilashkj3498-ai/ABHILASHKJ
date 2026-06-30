import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dshrufj9k',
  api_key:    '766743732968996',
  api_secret: 'd8UO5hLXC9vdMtNkBdsAppfG8do',
});

async function run() {
  try {
    const res = await cloudinary.search
      .expression('folder:VEEDU/Social_Media_Fromotional_Videos')
      .execute();
    console.log('Search Results with Key 7667...:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
