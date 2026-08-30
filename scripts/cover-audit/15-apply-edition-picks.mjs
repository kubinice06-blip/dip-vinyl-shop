// 封面「版本」稽核 步驟 15：把主線目視判定的結果套進 Firestore card_catalog.coverUrl。
//
// 店主 2026-08-30 的選片規則，依序套用：
//   0. **封面真的分岔時，取廣為流傳、大家認得的那一套**（店主裁定：「邏輯跟 Paris, Texas 一樣」）。
//      這條優先於下面全部——例如 AC/DC《Highway to Hell》的 1979 澳洲版是另一套火焰設計，
//      但全世界認得的是樂團合照版，所以取合照。
//   1. 在同一套視覺內，以**發行國**的封面為主（同年並列時用這條決勝——例如 Journey《Frontiers》
//      MB 最早有圖的是 1983 JP，但同年也有 1983 US，美國團取美版）
//   2. **年代版本越早越好**
//   3. 太模糊就挑清晰的（原版掃圖褪色／實拍歪斜時，退而取同一套視覺中最清楚的）
//
// 判定檔格式（scripts/cover-audit/data/edition-picks.json）：
//   [{ "i": 0, "do": "orig" }, { "i": 9, "do": "keep", "why": "原版掃圖褪色，現用同視覺但更清晰" },
//    { "i": 16, "do": "pick", "releaseId": "…", "why": "同年並列，取發行國美版" }]
//   do=orig → 換成該群組最早且有正面圖的那筆；keep → 不動；pick → 指定 release。
//
// 用法：
//   node scripts/cover-audit/15-apply-edition-picks.mjs           # 乾跑
//   node scripts/cover-audit/15-apply-edition-picks.mjs --write   # 實際 PATCH Firestore 並回讀
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DATA = path.join(ROOT, 'scripts', 'cover-audit', 'data');
const WRITE = process.argv.includes('--write');
const KEY = process.env.DIP_FIREBASE_API_KEY || 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const BASE = process.env.DIP_ONBOARD_FIRESTORE_BASE
  || 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents';

const review = JSON.parse(fs.readFileSync(path.join(DATA, 'edition-review.json'), 'utf8')).review;
const picksPath = path.join(DATA, 'edition-picks.json');
if (!fs.existsSync(picksPath)) { console.error('缺 data/edition-picks.json'); process.exit(1); }
const picks = JSON.parse(fs.readFileSync(picksPath, 'utf8'));

const urlOf = id => `https://coverartarchive.org/release/${id}/front`;
const docIdOf = (artist, album) => `${artist}|${album}`.toLowerCase().replace(/\//g, '-').trim();

const plan = [], keeps = [], bad = [];
for (const p of picks) {
  const r = review[p.i];
  if (!r) { bad.push(`#${p.i} 超出 review 範圍`); continue; }
  if (p.do === 'keep') { keeps.push(`#${p.i} ${r.artist} — ${r.album}${p.why ? '：' + p.why : ''}`); continue; }
  const id = p.do === 'orig' ? r.original.id : p.releaseId;
  if (!id) { bad.push(`#${p.i} ${r.artist} — ${r.album}：do=pick 但沒給 releaseId`); continue; }
  const all = [r.served, r.original, ...r.alternatives];
  const meta = all.find(x => x.id === id);
  if (!meta) { bad.push(`#${p.i} ${r.artist} — ${r.album}：releaseId 不在候選內`); continue; }
  if (id === r.served.id) { keeps.push(`#${p.i} ${r.artist} — ${r.album}：指定的就是現用版本`); continue; }
  plan.push({ i: p.i, artist: r.artist, album: r.album, docId: docIdOf(r.artist, r.album), url: urlOf(id), meta, why: p.why || '' });
}

console.log(`判定 ${picks.length} 筆｜要換 ${plan.length}｜維持現狀 ${keeps.length}｜有問題 ${bad.length}`);
for (const p of plan) console.log(`  #${p.i} ${p.artist} — ${p.album} → ${p.meta.date || '?'} ${p.meta.country || '--'} ${p.meta.format || ''} ${p.meta.label || ''}${p.why ? '（' + p.why + '）' : ''}`);
if (keeps.length) { console.log('\n維持現狀：'); keeps.forEach(k => console.log('  ' + k)); }
if (bad.length) { console.log('\n⚠ 有問題：'); bad.forEach(b => console.log('  ' + b)); }
if (!WRITE) { console.log('\n（乾跑，未動 Firestore。加 --write 實際執行）'); process.exit(0); }
if (!plan.length) process.exit(0);

// 先確認每個新網址都真的讀得到，再寫——換成一個 404 比留著舊版本更糟
let cur = 0; const dead = [];
await Promise.all(Array.from({ length: 6 }, async () => {
  while (cur < plan.length) {
    const p = plan[cur++];
    try {
      const r = await fetch(p.url, { redirect: 'follow', signal: AbortSignal.timeout(30000) });
      if (!r.ok) dead.push(`#${p.i} ${p.artist} — ${p.album}：HTTP ${r.status}`);
    } catch (e) { dead.push(`#${p.i} ${p.artist} — ${p.album}：${e.message}`); }
  }
}));
if (dead.length) { console.error(`\n中止：${dead.length} 個新網址讀不到`); dead.forEach(d => console.error('  ' + d)); process.exit(1); }
console.log(`\n新網址全部可讀（${plan.length}／${plan.length}），開始寫入`);

let ok = 0; const failed = [];
for (const p of plan) {
  const u = `${BASE}/card_catalog/${encodeURIComponent(p.docId)}?updateMask.fieldPaths=coverUrl&key=${KEY}`;
  const res = await fetch(u, { method: 'PATCH', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: { coverUrl: { stringValue: p.url } } }), signal: AbortSignal.timeout(20000) });
  if (!res.ok) { failed.push(`#${p.i} ${p.docId} HTTP ${res.status}`); continue; }
  const back = await (await fetch(`${BASE}/card_catalog/${encodeURIComponent(p.docId)}?key=${KEY}`)).json();
  if (back.fields?.coverUrl?.stringValue === p.url) ok++;
  else failed.push(`#${p.i} ${p.docId} 回讀不一致`);
}
console.log(`寫入並回讀一致 ${ok}／${plan.length}`);
if (failed.length) { console.log('失敗：'); failed.forEach(f => console.log('  ' + f)); }
