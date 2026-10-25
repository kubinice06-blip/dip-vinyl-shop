// 店主 2026-10-25：「宇多田的 first love 藝人名用英文、其他專輯用日文，全改成日文」。
// 卡 Hikaru Utada《First Love》→ 宇多田ヒカル《First Love》，本機檔案各處換鍵（KV／Firestore 另跑）。
//   node batch-progress/rename-utada-20261025/apply-local.mjs
import fs from 'node:fs';
const OLD = 'Hikaru Utada', NEW = '宇多田ヒカル', ALBUM = 'First Love';
const oldId = `${OLD}|${ALBUM}`.toLowerCase(), newId = `${NEW}|${ALBUM}`.toLowerCase();
const once = (file, from, to) => { const s = fs.readFileSync(file, 'utf8'); const n = s.split(from).length - 1; if (n !== 1) throw new Error(`${file}：${from} 命中 ${n} 次`); fs.writeFileSync(file, s.replace(from, to)); console.log('✓', file); };
// 1 卡池（單行壓縮格式，字串替換）
once('seed_cards.json', `["${OLD}","${ALBUM}",`, `["${NEW}","${ALBUM}",`);
// 2 子曲風（原字 Artist|Album）
once('card-subgenres.json', `"${OLD}|${ALBUM}"`, `"${NEW}|${ALBUM}"`);
// 3 情緒先驗座標、封面／原始曲風快取（小寫 id）
for (const f of ['data/mood/card-moods-v0.json', 'data/rawgenres-cache.json', 'data/covers-cache.json']) once(f, `"${oldId}"`, `"${newId}"`);
// 4 試聽索引（鍵＝NFKD 正規化 artist\0album，之後重建 runtime）
{ const f = 'data/apple-audio-map-v1.json', m = JSON.parse(fs.readFileSync(f, 'utf8'));
  const oldK = 'hikaruutada\u0000firstlove', newK = '宇多田ヒカル\u0000firstlove';
  if (!m.entries[oldK] || m.entries[newK]) throw new Error('試聽索引鍵狀態不對');
  m.entries[newK] = { ...m.entries[oldK], artist: NEW }; delete m.entries[oldK];
  fs.writeFileSync(f, JSON.stringify(m, null, 1)); console.log('✓', f); }
// 5 店內庫存（cardKey 與 index.html shopKeyOf 同規則）
{ const f = 'data/shop/inventory.json', s = fs.readFileSync(f, 'utf8');
  const n = s.split('"cardKey": "hikaruutada|firstlove"').length - 1; if (n !== 1) throw new Error('庫存命中 ' + n);
  fs.writeFileSync(f, s.replace('"cardKey": "hikaruutada|firstlove",\n   "artist": "Hikaru Utada",', `"cardKey": "宇多田ヒカル|firstlove",\n   "artist": "${NEW}",`));
  if (fs.readFileSync(f, 'utf8').includes('"cardKey": "hikaruutada|firstlove"')) throw new Error('庫存沒換到'); console.log('✓', f); }
