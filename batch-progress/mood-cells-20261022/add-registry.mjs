// 情緒薄格策展線（md／mc／ml）：covers.json 裡 source=discogs 的封面登錄 data/discogs-cover-registry.json（§4），再跑 render-discogs-registry。
//   node batch-progress/mood-cells-20261022/add-registry.mjs add-20261020-ts1
import fs from 'node:fs';
const batch = process.argv[2];
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const REG = 'data/discogs-cover-registry.json';
const reg = JSON.parse(fs.readFileSync(REG, 'utf8'));
const covers = JSON.parse(fs.readFileSync(`batch-progress/${batch}/covers.json`, 'utf8'));
const cards = JSON.parse(fs.readFileSync(`desc-tools/batches/cards/${batch}-cards.json`, 'utf8'));
const have = new Set(reg.entries.map(e => String(e.discogsReleaseId)));
let added = 0;
for (const [key, cv] of Object.entries(covers)) {
  if (cv.source !== 'discogs' || have.has(String(cv.discogsReleaseId))) continue;
  const c = cards.find(x => x.key === key);
  await new Promise(r => setTimeout(r, 2500));
  const j = await (await fetch(`https://api.discogs.com/releases/${cv.discogsReleaseId}`, { headers: { 'User-Agent': UA } })).json();
  const l = (j.labels || [])[0] || {};
  reg.entries.push({ discogsReleaseId: String(cv.discogsReleaseId), reviewed: 'ok', artist: c.artist, album: c.album, batch,
    discogsUrl: `https://www.discogs.com/release/${cv.discogsReleaseId}`, discogsTitle: j.title || '', year: String(j.year || ''), label: l.name || '', catno: l.catno || '', country: j.country || '',
    matchedOn: [j.master_id ? `Discogs master ${j.master_id} 的版本` : '唯一版本', '主線目視與盤名相符'], imageUrl: cv.url, imageSize: '', note: cv.note, fetchedAt: new Date().toISOString() });
  added++;
}
reg.count = reg.entries.length; reg.updatedAt = new Date().toISOString().slice(0, 10);
fs.writeFileSync(REG, JSON.stringify(reg, null, 1) + '\n');
console.log(batch, 'registry +', added, '→', reg.count);
