const worker = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const cases = [
  { artist: '五月天', album: '後青春期的詩', expected: 'rock' },
  { artist: '竹内まりや', album: 'Variety', expected: 'pop' },
  { artist: 'B.B. King', album: 'Live at the Regal', expected: 'blues' },
  { artist: 'Taylor Swift', album: '1989', expected: 'pop' }
];

let failed = false;
for (const item of cases) {
  const query = new URLSearchParams({ artist: item.artist, album: item.album });
  const response = await fetch(`${worker}/album-genres?${query}`);
  const body = await response.json().catch(() => ({}));
  const genres = Array.isArray(body.genres) ? body.genres : [];
  const passed = response.ok && genres.includes(item.expected);
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${item.artist} — ${item.album}  [${genres.join(', ')}]`);
  if (!passed) failed = true;
}

if (failed) process.exitCode = 1;
