import fs from 'node:fs';
const base = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog';
const have = new Map(); let tok = '', pages = 0;
do {
  const u = `${base}?pageSize=1000&mask.fieldPaths=coverUrl${tok ? '&pageToken=' + encodeURIComponent(tok) : ''}`;
  const j = await (await fetch(u)).json(); pages++;
  for (const d of j.documents || []) have.set((s => { try { return decodeURIComponent(s); } catch { return s; } })(d.name.split('/card_catalog/')[1]), d.fields?.coverUrl?.stringValue || '');
  tok = j.nextPageToken || '';
} while (tok);
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const id = r => (r[0] + '|' + r[1]).toLowerCase().replace(/\//g, '-').trim();
const noDoc = [], empty = [];
for (const r of seed) { const k = id(r); if (!have.has(k)) noDoc.push(r.slice(0, 2)); else if (!have.get(k)) empty.push(r.slice(0, 2)); }
console.log('pages', pages, 'docs', have.size, '卡池', seed.length, '無文件', noDoc.length, 'coverUrl 空', empty.length);
fs.writeFileSync(process.argv[2], JSON.stringify({ noDoc, empty }));
console.log(empty.slice(0, 20).map(x => x.join('《') + '》').join('、'));
