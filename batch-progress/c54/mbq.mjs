// c-53 c 組：MB release-group 查詢輔助。用法：node mbq.mjs "<artist>" "<album>"
// 或 node mbq.mjs --file queries.json
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function q(artist, album, limit = 8) {
  const query = `artist:"${artist}" AND releasegroup:"${album}"`;
  const url = `https://musicbrainz.org/ws/2/release-group?query=${encodeURIComponent(query)}&fmt=json&limit=${limit}`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) return { error: r.status };
  const j = await r.json();
  return (j['release-groups'] || []).map(g => ({
    mbid: g.id, title: g.title, score: g.score,
    date: g['first-release-date'] || '',
    pt: g['primary-type'] || '', st: (g['secondary-types'] || []).join('+'),
    ac: (g['artist-credit'] || []).map(a => a.name).join(' & '),
  }));
}

async function browseArtist(name, limit = 100) {
  const url = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(name)}&fmt=json&limit=5`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  const j = await r.json();
  return (j.artists || []).map(a => ({ mbid: a.id, name: a.name, score: a.score, dis: a.disambiguation || '', country: a.country || '', type: a.type || '' }));
}

async function rgOfArtist(mbid, offset = 0) {
  const url = `https://musicbrainz.org/ws/2/release-group?artist=${mbid}&fmt=json&limit=100&offset=${offset}`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  const j = await r.json();
  return { count: j['release-group-count'], list: (j['release-groups'] || []).map(g => ({
    mbid: g.id, title: g.title, date: g['first-release-date'] || '',
    pt: g['primary-type'] || '', st: (g['secondary-types'] || []).join('+') })) };
}

const args = process.argv.slice(2);
const mode = args[0];
if (mode === '--artist') {
  console.log(JSON.stringify(await browseArtist(args[1]), null, 1));
} else if (mode === '--rg') {
  console.log(JSON.stringify(await rgOfArtist(args[1], Number(args[2] || 0)), null, 1));
} else if (mode === '--file') {
  const pairs = JSON.parse(await (await import('node:fs')).promises.readFile(args[1], 'utf8'));
  for (const [a, b] of pairs) {
    const res = await q(a, b);
    console.log(`\n=== ${a} — ${b}`);
    if (res.error) console.log('  ERR ' + res.error);
    else if (!res.length) console.log('  查無');
    else res.slice(0, 5).forEach(x => console.log(`  ${x.score} | ${x.date} | ${x.pt}${x.st ? '/' + x.st : ''} | ${x.title} | ${x.ac} | ${x.mbid}`));
    await sleep(1100);
  }
} else {
  console.log(JSON.stringify(await q(args[0], args[1]), null, 1));
}
