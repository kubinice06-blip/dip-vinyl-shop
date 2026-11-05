import fs from 'node:fs';
const F = 'batch-progress/spotify-replaced-20261105/replaced.json';
const rows = JSON.parse(fs.readFileSync(F, 'utf8'));
const UA = { 'User-Agent': 'dip-vinyl-repair/1.0 (https://dipvinyl.tw)' };
for (const r of rows) {
  if (r.mb !== undefined || !r.rgMbid) continue;
  const res = await fetch(`https://musicbrainz.org/ws/2/release?release-group=${r.rgMbid}&inc=url-rels&fmt=json&limit=100`, { headers: UA });
  if (!res.ok) { r.mbErr = res.status; await new Promise(s => setTimeout(s, 3000)); continue; }
  const j = await res.json();
  r.rgTitle = j.releases?.[0]?.title || '';
  r.mb = '';
  for (const rel of j.releases || []) {
    const u = (rel.relations || []).map(x => x.url?.resource || '').find(u => /^https:\/\/open\.spotify\.com\/album\//.test(u));
    if (u) { r.mb = u.replace(/\?.*$/, ''); break; }
  }
  await new Promise(s => setTimeout(s, 1100));
}
fs.writeFileSync(F, JSON.stringify(rows, null, 1));
console.log('mb hits', rows.filter(r => r.mb).length, '/', rows.length, 'err', rows.filter(r => r.mbErr).length);
for (const r of rows.filter(r => r.mb)) console.log(r.artist, '—', r.album, '→', r.mb);
