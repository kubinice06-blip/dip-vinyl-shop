// add-20261010-shop：37 張 Discogs 封面登錄 data/discogs-cover-registry.json（§4 逐張入名單），之後跑 scripts/render-discogs-registry.mjs。
import fs from 'node:fs';
const D = 'batch-progress/add-20261010-shop/';
const rd = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const REG = 'data/discogs-cover-registry.json';
const reg = rd(REG), spec = rd(D + 'spec.json'), dg = rd(D + 'discogs.json');
const inv = rd('data/shop/inventory.json').items, pm = rd('data/shop/pending-meta.json').items;
const have = new Set(reg.entries.map(e => String(e.discogsReleaseId)));
let added = 0;
for (const s of spec) {
  const g = dg[s.n]; if (!g || have.has(g.rid)) continue;
  const p = pm[inv.find(i => i.id.endsWith(s.n)).id];
  const [label, ...cat] = (g.labels[0] || '').split(' ');
  reg.entries.push({
    discogsReleaseId: g.rid, reviewed: 'ok', artist: s.artist, album: s.album, batch: 'add-20261010-shop',
    discogsUrl: `https://www.discogs.com/release/${g.rid}`, discogsTitle: g.title, year: String(g.year || ''),
    label: g.labels[0] ? g.labels[0].replace(/\s+\S+$/, '') : '', catno: g.labels[0] ? g.labels[0].split(' ').pop() : '', country: g.country || '',
    matchedOn: [g.master ? `Discogs master ${g.master} 的版本` : '唯一版本（無 master）', '曲目與盤名相符', '主線 2026-10-10 縮圖表目視核對'],
    imageUrl: p.cover, imageSize: '', note: `店內待上架卡（Notion 10-08／10-09）。店主 2026-10-09 選定的無側標（或唯一可得）照片（${p.coverSrc}）。`, fetchedAt: new Date().toISOString(),
  });
  have.add(g.rid); added++;
}
reg.count = reg.entries.length; reg.updatedAt = new Date().toISOString().slice(0, 10);
fs.writeFileSync(REG, JSON.stringify(reg, null, 1) + '\n');
console.log('registry +', added, '→', reg.count);
