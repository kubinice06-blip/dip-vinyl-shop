// 只補指定 release 的中繼資料（套用批次缺的），不跑整條佇列：node fetch-releases.mjs <missing-release.json>
import fs from 'node:fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const UA = { 'User-Agent': 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)' };
const cache = JSON.parse(fs.readFileSync('dg-cache.json', 'utf8'));
const ids = [...new Set(JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).map(m => m.release).filter(Boolean))].filter(id => !cache['release:' + id]);
let n = 0;
for (const id of ids) {
  for (let t = 0; t < 4; t++) {
    await sleep(2600);
    const r = await fetch('https://api.discogs.com/releases/' + id, { headers: UA }).catch(() => null);
    if (r && r.status === 429) { await sleep(30000); continue; }
    if (r && r.status === 404) { cache['release:' + id] = { missing: true }; break; }
    if (!r || !r.ok) continue;
    const x = await r.json();
    const imgs = x.images || []; const prim = imgs.find(i => i.type === 'primary') || imgs[0];
    cache['release:' + id] = { id: x.id, title: x.title, artists: (x.artists || []).map(a => a.name).join(', '), year: x.year, released: x.released, country: x.country,
      labels: (x.labels || []).map(l => ({ name: l.name, catno: l.catno })), formats: (x.formats || []).map(f => [f.name, ...(f.descriptions || [])].join(' ')).join('; '),
      img: prim?.uri || null, w: prim?.width, h: prim?.height, masterId: x.master_id || null, barcode: (x.identifiers || []).filter(i => i.type === 'Barcode').map(i => i.value).slice(0, 2) };
    n++; break;
  }
  if (n % 20 === 0) fs.writeFileSync('dg-cache.json', JSON.stringify(cache));
}
fs.writeFileSync('dg-cache.json', JSON.stringify(cache));
console.log('fetched', n, 'of', ids.length);
