// 把後台按過「⬇ 降級」的頂級牌，真正降成一般卡。
//
// 2026-08-30 卡池合併後，這件事變成「把那一列的第 9 欄 tier 拿掉」——
// 合併前要從 apex_pool.json 搬到 seed_cards.json，而 apex 列沒有三軸，
// 還得回頭去 Firestore 撈值才組得出 seed 列。整支腳本因此少掉一半。
//
// 後台是靜態頁、寫不了 git，所以它只清 Firestore 欄位並在 apex_pool 那筆留 demoted 旗標，
// 卡池檔這半由本機這支補完。
//
// 用法：
//   node scripts/apply-apex-demotions.mjs            # 乾跑
//   node scripts/apply-apex-demotions.mjs --write    # 實際改 seed_cards.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPool, savePool, keyOf } from './pool.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const KEY = process.env.DIP_FIREBASE_API_KEY || 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const BASE = process.env.DIP_ONBOARD_FIRESTORE_BASE
  || 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents';

// ── 1. 撈出所有標記降級的 ──
const marked = [];
let token = '';
for (let i = 0; i < 60; i++) {
  const url = `${BASE}/apex_pool?pageSize=300&key=${KEY}` + (token ? `&pageToken=${token}` : '');
  const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!r.ok) { console.error('讀 apex_pool 失敗 HTTP', r.status); process.exit(1); }
  const j = await r.json();
  for (const d of (j.documents || [])) {
    const f = d.fields || {};
    if (f.demoted?.booleanValue !== true) continue;
    marked.push({ artist: f.artist?.stringValue || '', album: f.album?.stringValue || '', tier: f.tier?.stringValue || '' });
  }
  if (!j.nextPageToken) break;
  token = j.nextPageToken;
}
if (!marked.length) { console.log('沒有標記降級的卡。'); process.exit(0); }

// ── 2. 對上卡池。**冪等靠這裡**：tier 已經拿掉的就跳過，重跑不會出事 ──
const { rows } = loadPool(ROOT);
const byKey = new Map(rows.map((r, i) => [keyOf(r[0], r[1]), i]));
const plan = [], already = [], missing = [];
for (const m of marked) {
  const i = byKey.get(keyOf(m.artist, m.album));
  if (i == null) { missing.push(`${m.artist} — ${m.album}`); continue; }
  if (!rows[i][8]) { already.push(`${m.artist} — ${m.album}`); continue; }
  plan.push({ ...m, i, row: rows[i] });
}

console.log(`標記降級 ${marked.length} 張｜待處理 ${plan.length}｜已降過 ${already.length}｜卡池找不到 ${missing.length}`);
for (const p of plan) {
  const r = p.row;
  const warn = (Array.isArray(r[5]) && r[5].length) ? '' : '  ⚠ 曲風欄為空，降級後「類型挑片」抽不到';
  console.log(`  ${r[8]} → 一般卡｜${r[0]} — ${r[1]}｜三軸 ${r[2]}/${r[3]}/${r[4]}｜${JSON.stringify(r[5])} ${r[6]}${warn}`);
}
if (missing.length) { console.log('\n卡池找不到（可能已被移除）：'); missing.forEach(m => console.log('  ', m)); }
if (!WRITE) { console.log('\n（乾跑，未動任何檔案。加 --write 實際執行）'); process.exit(0); }
if (!plan.length) { console.log('沒有可執行的項目。'); process.exit(0); }

// ── 3. 拿掉 tier 欄就完成降級 ──
for (const p of plan) rows[p.i] = p.row.slice(0, 8);
savePool(ROOT, rows);
const left = rows.filter(r => r[8]).length;
console.log(`\n已降級 ${plan.length} 張｜卡池共 ${rows.length} 列，其中王牌 ${left} 張`);

// 不回寫 Firestore：apex_pool 與 album_overrides 的規則是 isAdmin() 才能寫，
// 本機用網頁端那把公開 API key 打 PATCH 會 403（2026-08-30 實測）。
// 冪等靠卡池檔本身的 tier 欄判定，重跑不會重複處理。
console.log('接著 git diff 確認只動到這幾列，再提交並部署。');
console.log('（後台的「待同步」提示會在部署後自動消失）');
