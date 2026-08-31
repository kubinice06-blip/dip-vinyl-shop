// 補驗去重：開工時的 coverage.mjs 只比對「artist|album 完全相同」，
// 漏掉了「同一張碟、卡名寫法不同」的情況——C 組實際抓到一張：
// 種子寫「Gothic Voices｜Hildegard von Bingen: A Feather on the Breath of God」，
// 池內既有卡是「Gothic Voices｜A Feather on the Breath of God」（無作曲家前綴）。
// 這裡改成「同一 artist 之下，比對去掉作曲家前綴與括註後的作品名」。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadPool, fold } from '../lib.mjs';

const { all } = loadPool();
const flat = s => fold(s).replace(/[^\p{L}\p{N}]+/gu, '');
// 拆成「作曲家前綴」與「作品側」兩塊。只比作品側會讓 "Violin Concerto" 這種
// 通用曲名跨作曲家互撞（實測誤報 5 筆），所以作品側相同時還要求作曲家不衝突。
const parts = s => {
  const noParen = String(s).replace(/\(.*?\)/g, '');
  const i = noParen.indexOf(':');
  return i < 0 ? { comp: '', work: flat(noParen) }
               : { comp: flat(noParen.slice(0, i)), work: flat(noParen.slice(i + 1)) };
};

const byArtist = new Map();
for (const r of all) {
  const k = flat(r.artist);
  if (!byArtist.has(k)) byArtist.set(k, []);
  byArtist.get(k).push(r);
}

let hits = 0, total = 0;
for (const f of process.argv.slice(2)) {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
  for (const a of j.albums || []) {
    total++;
    const rows = byArtist.get(flat(a.artist)) || [];
    const A = parts(a.album);
    if (!A.work) continue;
    for (const r of rows) {
      const R = parts(r.album);
      // 一方包含另一方即視為可疑（作品名可能多帶／少帶副標）
      const workHit = R.work === A.work
        || (R.work.length > 8 && A.work.length > 8 && (R.work.includes(A.work) || A.work.includes(R.work)));
      if (!workHit) continue;
      // 兩邊都標了作曲家而且不同 → 是同名曲目不同作品，不是重複卡
      if (A.comp && R.comp && A.comp !== R.comp) continue;
      {
        console.log(`★ ${f.replace(/^batch-progress\//, '')}`);
        console.log(`    新卡：${a.artist}｜${a.album}`);
        console.log(`    池內：[${r.where}] ${r.artist}｜${r.album}（${r.year ?? '?'}）`);
        hits++;
      }
    }
  }
}
console.log(`\n檢查 ${total} 張｜疑似重複 ${hits} 筆`);
