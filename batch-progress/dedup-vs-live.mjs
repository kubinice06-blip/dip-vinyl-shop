// 候選對**線上池**的撞卡檢查。用法：node batch-progress/dedup-vs-live.mjs c48 c49
//
// 為什麼需要這支：批次做候選時，同期還沒上架的兄弟批次只存在於它自己的
// cand-*.json 裡，去重得手動把那些檔納入範圍。等那個批次真的上架之後，
// 「當初對候選檔驗過」就不等於「對現在的池子驗過」——中間可能有改名、
// 合併、或本機審稿時的增補。兄弟批次一上架就該重跑這支。
//
// 2026-08-29 實例：c-47 上架後 seed 11,866 → 12,005、apex hall +31，
// 本支對 c-48／c-49 的 183 張重驗，撞卡 0。
import fs from 'node:fs';
import path from 'node:path';
import { key, ROOT } from './lib.mjs';

const batches = process.argv.slice(2);
if (!batches.length) { console.error('用法: node batch-progress/dedup-vs-live.mjs c48 c49'); process.exit(1); }

const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const apex = JSON.parse(fs.readFileSync(path.join(ROOT, 'apex_pool.json'), 'utf8'));

const live = new Map();
const add = (a, b, src) => { const k = key(a) + '|' + key(b); if (!live.has(k)) live.set(k, `${a} — ${b} [${src}]`); };
for (const r of (Array.isArray(seed) ? seed : Object.values(seed))) {
  if (Array.isArray(r)) add(r[0], r[1], 'seed'); else add(r.artist, r.album, 'seed');
}
for (const tier of ['hall', 'pearl', 'heresy']) for (const r of apex[tier]) add(r[0], r[1], 'apex:' + tier);
console.log(`線上池去重鍵：${live.size}`);

let hits = 0, n = 0;
for (const batch of batches) {
  const dir = path.join(ROOT, 'batch-progress', batch);
  for (const f of fs.readdirSync(dir)) {
    if (!/^cand(-.*)?\.json$/.test(f)) continue;   // c50 起單一候選檔叫 cand.json，早期批次是 cand-A.json
    for (const a of JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8')).albums || []) {
      n++;
      const k = key(a.artist) + '|' + key(a.album);
      if (live.has(k)) { console.log(`⚠ 撞卡 [${batch}] ${a.artist} — ${a.album}\n     線上：${live.get(k)}`); hits++; }
    }
  }
}
console.log(`\n候選 ${n} 張｜與線上池撞卡 ${hits} 張`);
process.exit(hits ? 1 : 0);
