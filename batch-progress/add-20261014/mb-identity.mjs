// 本批身分查證：MB 1 req/s、503 重試 3 次、逐筆存檔
import fs from 'node:fs';
const UA = 'dip-vinyl/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function mb(path) {
  for (let i = 0; i < 4; i++) {
    await sleep(1200);
    const r = await fetch('https://musicbrainz.org/ws/2/' + path + (path.includes('?') ? '&' : '?') + 'fmt=json', { headers: { 'User-Agent': UA } });
    if (r.ok) return r.json();
    if (r.status !== 503) throw new Error(r.status + ' ' + path);
    await sleep(2000);
  }
  throw new Error('503x4 ' + path);
}
const out = {};
const cas = (await mb('artist/?query=artist:%22Cigarettes%20After%20Sex%22&limit=3')).artists[0];
out.casArtist = { id: cas.id, name: cas.name, country: cas.country, dis: cas.disambiguation };
const groups = { 'b36d4a6d-0034-4ec9-8eb5-9b29f998e6f5': '溫蒂漫步 Wendy Wander', [cas.id]: 'Cigarettes After Sex' };
out.rgs = [];
for (const [aid, name] of Object.entries(groups)) {
  const j = await mb(`release-group?artist=${aid}&limit=100`);
  for (const g of j['release-groups']) out.rgs.push({ artist: name, rg: g.id, title: g.title, date: g['first-release-date'], primary: g['primary-type'], secondary: g['secondary-types'] || [] });
}
fs.writeFileSync('mb-rgs.json', JSON.stringify(out, null, 1));
const want = out.rgs.filter(g => g.primary === 'Album' && !g.secondary.length);
out.releases = {};
for (const g of want) {
  const j = await mb(`release?release-group=${g.rg}&inc=labels+media&limit=50`);
  out.releases[g.rg] = j.releases.map(r => ({ id: r.id, title: r.title, date: r.date, country: r.country, barcode: r.barcode, status: r.status, labels: (r['label-info'] || []).map(l => (l.label?.name || '') + ' ' + (l['catalog-number'] || '')), media: (r.media || []).map(m => m.format + ':' + m['track-count']) }));
  fs.writeFileSync('mb-rgs.json', JSON.stringify(out, null, 1));
}
console.log(JSON.stringify(out.casArtist));
for (const g of out.rgs) console.log(g.artist, '|', g.date, g.primary, g.secondary.join(','), g.rg, g.title);
for (const [rg, rs] of Object.entries(out.releases)) { console.log('##', rg); rs.forEach(r => console.log('  ', r.date, r.country, r.barcode, r.title, '|', r.labels.join(';'), '|', r.media.join(','), r.id)); }
