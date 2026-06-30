async function testEndpoint(category) {
  const url = `http://localhost:3001/api/projects/${category}`;
  try {
    console.log(`Fetching ${url}...`);
    const res = await fetch(url);
    console.log(`Status: ${res.status}`);
    const data = await res.json();
    console.log(`Response length: ${data.length || 0}`);
    if (res.status !== 200) {
      console.log('Error Detail:', data);
    }
  } catch (err) {
    console.error(`Request failed for ${category}:`, err.message || err);
  }
}

async function run() {
  await testEndpoint('photography-projects');
  await testEndpoint('social-media-promotional-videos');
  await testEndpoint('video-editing-works');
}

run();
