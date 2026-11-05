#!/usr/bin/env node
// 情緒三軸前台檔：data/mood/card-moods-v0.json（後台底稿）→ data/mood/card-moods.json（前台）。
//
// 前台檔依 seed_cards.json 的順序存，每張 [x, y, z, 把握]（把握 0 低／1 中／2 高／3 錨點），
// 另存每張 id 的 FNV-1a 32 位元雜湊 _h（不存 id 本身：依 id 存要 361KB gz，雜湊只多 ~90KB）。
// 前台用雜湊對卡，不靠順序：瀏覽器快取裡的舊 seed（2026-10-21 上線當天店主手機就撞到）、
// 之後新上架還沒評分的卡，都只是對不到而被跳過，不會整檔失效或畫錯位置。_seed 只當參考。
//
// 同時是 gate：seed 每張都要有座標、v0 檔不能有 seed 以外的 id、104 張錨點要在原格。
// 任一項不過就 exit 1（MOOD_LAUNCH_PLAN §3.2）。
//
// 用法：node scripts/build-card-moods.mjs            # 建檔＋檢查
//       node scripts/build-card-moods.mjs --check    # 只檢查，不寫檔
import fs from 'node:fs';

const CHECK_ONLY = process.argv.includes('--check');
// --allow-missing：seed 有卡還沒評分時照樣寫檔（缺的存 null，前端用雜湊對卡、對不到就跳過）。
// 用在只改 overrides 要立刻上線、新上架那批還沒跑評分的時候；孤兒 id 與錨點換格仍擋。
const ALLOW_MISSING = process.argv.includes('--allow-missing');
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();

const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const v0 = JSON.parse(fs.readFileSync('data/mood/card-moods-v0.json', 'utf8'));
const scale = JSON.parse(fs.readFileSync('data/mood/scale-v0.json', 'utf8'));
const overridesPath = 'data/mood/overrides.json';
const overrides = fs.existsSync(overridesPath) ? JSON.parse(fs.readFileSync(overridesPath, 'utf8')) : {};

// 把握度在四批評分檔裡（v0 緊湊列沒有），有批次目錄才讀；沒有（例如只 checkout 網站檔）就全記中
const CONF = { low: 0, mid: 1, high: 2 };
const conf = new Map();
for (const f of ['score500/scored-500.json', 'score3000/scored-3000.json', 'score10k/scored-10k.json', 'score-rest/scored-rest.json', 'onboard/scored-onboard.json']) {
  const p = 'batch-progress/mood-axes/' + f;
  if (!fs.existsSync(p)) continue;
  for (const r of JSON.parse(fs.readFileSync(p, 'utf8'))) conf.set(r.id, CONF[r.conf] ?? 1);
}

const T = v0._thresholds;
const cellOf = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? 'boil' : 'charge') : (z >= T.z ? 'lift' : 'crisp')) : (y >= T.y ? (z >= T.z ? 'languid' : 'decay') : (z >= T.z ? 'calm' : 'still')));

const fnv = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
const errors = [];
const seedIds = new Set();
const cards = [], hashes = [];
const counts = {};
let missing = 0, overridden = 0;
for (const row of seed) {
  const id = idOf(row[0], row[1]);
  seedIds.add(id);
  hashes.push(fnv(id));
  let m = v0.cards[id];
  const ov = overrides[id];
  let c;
  if (ov && typeof ov.x === 'number' && typeof ov.y === 'number' && typeof ov.z === 'number') { m = [ov.x, ov.y, ov.z]; c = 3; overridden++; }
  if (!m) { missing++; cards.push(null); continue; }
  if (c == null) c = m[4] === 1 ? 3 : (conf.get(id) ?? 1);
  const x = +m[0].toFixed(1), y = +m[1].toFixed(1), z = +m[2].toFixed(1);
  cards.push([x, y, z, c]);
  const k = cellOf(x, y, z);
  counts[k] = (counts[k] || 0) + 1;
}
if (missing) (ALLOW_MISSING ? console.warn : errors.push.bind(errors))(`seed 有 ${missing} 張沒有座標（先補評分再重建）${ALLOW_MISSING ? '——--allow-missing，照樣寫檔' : ''}`);

const orphans = Object.keys(v0.cards).filter(id => !seedIds.has(id));
if (orphans.length) errors.push(`v0 檔有 ${orphans.length} 個 seed 以外的 id（改名或刪卡後沒重建）：${orphans.slice(0, 5).join('、')}${orphans.length > 5 ? '…' : ''}`);

// 錨點回歸：每張都要在它原本的格
const anchorsPath = 'batch-progress/mood-axes/anchors-v1.json';
if (fs.existsSync(anchorsPath)) {
  const A = JSON.parse(fs.readFileSync(anchorsPath, 'utf8')).anchors;
  let moved = 0, total = 0;
  for (const a of A) {
    const id = idOf(a.artist, a.album);
    const m = v0.cards[id];
    if (!m) { errors.push(`錨點不在 v0 檔：${a.key}`); continue; }
    total++;
    const want = a.region || a.cell;
    if (want && cellOf(m[0], m[1], m[2]) !== want) { moved++; errors.push(`錨點換格：${a.key} 應在 ${want}，現在 ${cellOf(m[0], m[1], m[2])}`); }
  }
  console.log(`錨點 ${total - moved}/${total} 同格`);
}

const out = {
  _v: 'front-v0',
  _built: new Date().toISOString().slice(0, 10),
  _source: v0._v,
  _seed: { count: seed.length, head: idOf(seed[0][0], seed[0][1]), tail: idOf(seed[seed.length - 1][0], seed[seed.length - 1][1]) },
  thresholds: T,
  breaks: scale.breaks,
  names: scale.names,
  cells: counts,
  _h: hashes,
  cards,
};

console.log(`seed ${seed.length} 張，座標 ${seed.length - missing}，店主改判 ${overridden}`);
console.log('八格：' + Object.entries(scale.names).map(([k, n]) => `${n} ${counts[k] || 0}`).join('、'));
if (errors.length) {
  console.error('✘ mood gate 不過：');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
if (!CHECK_ONLY) {
  fs.writeFileSync('data/mood/card-moods.json', JSON.stringify(out));
  console.log(`✔ 寫入 data/mood/card-moods.json（${(fs.statSync('data/mood/card-moods.json').size / 1024).toFixed(0)} KB）`);
} else console.log('✔ mood gate 通過');
