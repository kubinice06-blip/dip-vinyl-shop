// 查池中同藝人（子字串、大小寫不分）已有的卡與三軸：node pool-axes.mjs "藝人" ["藝人2" …]
// 輸出：藝人｜盤  x y z  來源（0 子曲風暫估／1 錨點／2 評分）  落格
import fs from 'node:fs';
const m = JSON.parse(fs.readFileSync(new URL('../../data/mood/card-moods-v0.json', import.meta.url)));
const n = s => s.toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const cell = ([x, y, z]) => (x >= 3 ? (y >= 0.5 ? (z >= 0 ? '沸騰' : '暴躁') : (z >= 0 ? '雀躍' : '冷冽')) : (y >= 0.5 ? (z >= 0 ? '恍惚' : '頹靡') : (z >= 0 ? '放鬆' : '平靜')));
for (const q of process.argv.slice(2)) {
  const k = n(q); let hit = 0;
  for (const [key, v] of Object.entries(m.cards)) {
    const a = key.split('|')[0];
    if (n(a).includes(k)) { hit++; console.log(`${key}\t${v[0]} ${v[1]} ${v[2]}\tsrc${v[4]}\t${cell(v)}`); }
  }
  if (!hit) console.log(`${q}\t（池中無）`);
}
