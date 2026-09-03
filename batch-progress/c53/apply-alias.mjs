// 裁定 2：Наутилус Помпилиус 在 MusicBrainz 上掛的是拉丁名，
// 用西里爾團名查 release-group 零命中。卡片掛名維持西里爾（與卡池原文字慣例一致），
// 但要帶一個下游查詢用的別名——否則封面／評分／試聽三條打字串搜尋的 API 會整個落空。
import fs from 'node:fs';
const P = 'batch-progress/c53/prop-a.json';
const rows = JSON.parse(fs.readFileSync(P, 'utf8'));
const ALIAS = { 'Наутилус Помпилиус': 'Nautilus Pompilius' };
let n = 0;
for (const r of rows) {
  const a = ALIAS[r.artist];
  if (!a || r.queryAlias === a) continue;
  r.queryAlias = a; n++;
}
if (n) fs.writeFileSync(P, JSON.stringify(rows, null, 1));
console.log(`加上 queryAlias：${n} 張`);
const by = {}; for (const r of rows) by[r.artist] = (by[r.artist] || 0) + 1;
console.log('a 組', rows.length, '張：', Object.entries(by).map(([k, v]) => `${k}×${v}`).join('、'));
