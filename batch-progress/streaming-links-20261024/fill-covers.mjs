import fs from 'node:fs';
const S = process.argv[2], dry = process.argv.includes('--dry');
const { noDoc, empty } = JSON.parse(fs.readFileSync(S + '/cover-miss.json', 'utf8'));
const src = fs.readFileSync('dip-player.js', 'utf8');
const npt = new Function('value', src.match(/function normalizePreviewText\(value\) \{([\s\S]*?)\n  \}/)[1]);
const key = (a, b) => `${npt(a)}\u0000${npt(b)}`;
const rt = JSON.parse(fs.readFileSync('data/apple-audio-runtime-v1.json', 'utf8')).entries;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const id = (a, b) => (a + '|' + b).toLowerCase().replace(/\//g, '-').trim();
const all = [...empty.map(x => [...x, 'empty']), ...noDoc.map(x => [...x, 'nodoc'])];
const out = [], miss = [];
for (const [a, b, kind] of all) {
  const hit = rt[key(a, b)]; let url = '', how = '';
  if (hit) {
    const j = await (await fetch(`https://itunes.apple.com/lookup?id=${hit[1]}&country=${hit[0]}`)).json(); await sleep(1500);
    const r = (j.results || [])[0]; if (r?.artworkUrl100) { url = r.artworkUrl100.replace(/\/\d+x\d+bb\.(jpg|png)$/, '/600x600bb.jpg'); how = 'apple ' + hit[1]; }
  }
  if (!url) {
    const q = encodeURIComponent(`artist:"${a}" AND releasegroup:"${b}"`);
    const j = await (await fetch(`https://musicbrainz.org/ws/2/release-group/?query=${q}&fmt=json&limit=3`, { headers: { 'User-Agent': 'dip-vinyl-repair/1.0 (https://dipvinyl.tw)' } })).json(); await sleep(1100);
    const rg = (j['release-groups'] || []).find(g => g.score >= 95);
    if (rg) { const h = await fetch(`https://coverartarchive.org/release-group/${rg.id}/front-500`, { method: 'HEAD', redirect: 'follow' }); if (h.ok) { url = `https://coverartarchive.org/release-group/${rg.id}/front-500`; how = 'caa ' + rg.id + ' ' + rg.title; } }
  }
  if (url) out.push({ artist: a, album: b, kind, url, how }); else miss.push([a, b, kind]);
  console.log(url ? '✓' : '✗', a, '《' + b + '》', how);
}
fs.writeFileSync(S + '/cover-fill.json', JSON.stringify({ out, miss }, null, 1));
console.log('補到', out.length, '查無', miss.length);
