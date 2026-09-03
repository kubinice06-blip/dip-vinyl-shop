// obscurity 冷門軸校準工具（2026-09-02 店主核可校準後建）。
//
// 這支腳本**不寫回任何線上資料**。它做三件事，全部只輸出報表供本機審核：
//   1. 從 listeners 資料反推現行的絕對分級門檻（<3k=5、<20k=4、<100k=3、<500k=2、其餘 1）
//   2. 算出各曲風的 listeners 分位數，並列「絕對分級」與「曲風相對分級」兩套結果
//   3. 列出兩套分級不一致的卡、以及與現行門檻不相容的卡（例如 obscurity=2 但 listeners<3k
//      ——那代表 worker 當年查到的是別的實體，資料本身要複核）
//
// 用法：
//   node batch-progress/recalibrate-obscurity.mjs --demo
//       用歷批 batch-progress/c*/ratings.json 裡的 525 對 lastfm 配對當樣本（雲端就能跑）
//   node batch-progress/recalibrate-obscurity.mjs <listeners.json>
//       本機從 worker 的 rating4: KV 快取匯出全池 listeners 後跑。格式：
//       { "artist|album": { "listeners": 1234, "obscurity": 4, "genres": ["soul"] }, ... }
//
// 雲端依 REMOTE_RUNBOOK 不碰 KV，所以全池那一份只有本機做得出來。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

// 現行 worker 的分級（由 525 對歷史配對反推，邊界乾淨無重疊：
// 5 最大 2,983 / 4 最小 3,214；4 最大 19,837 / 3 最小 20,330；
// 3 最大 98,649 / 2 最小 101,704；2 最大 471,449 / 1 最小 506,864）
export const ABS = [[3000, 5], [20000, 4], [100000, 3], [500000, 2], [Infinity, 1]];
export const absBand = l => ABS.find(([cap]) => l < cap)[1];

// 曲風相對分級：用該曲風內的分位數切五級。分位點可調，預設對齊全池現況的
// 「每曲風 o5 約佔一成」直覺——但這只是起點，真正的切點要店主看過報表再定。
const Q = [0.10, 0.30, 0.60, 0.85]; // 累積：10% → 5、30% → 4、60% → 3、85% → 2、其餘 1
function relBands(vals) {
  const s = [...vals].sort((a, b) => a - b);
  const at = q => s[Math.min(s.length - 1, Math.floor(q * s.length))];
  const cuts = Q.map(at);
  return { cuts, band: l => { for (let i = 0; i < cuts.length; i++) if (l <= cuts[i]) return 5 - i; return 1; } };
}

const arg = process.argv[2];
if (!arg) { console.error('用法見檔頭'); process.exit(1); }

let rows = [];
if (arg === '--demo') {
  for (const d of fs.readdirSync(path.join(ROOT, 'batch-progress')).filter(d => /^c\d+$/.test(d))) {
    const rf = path.join(ROOT, 'batch-progress', d, 'ratings.json');
    if (!fs.existsSync(rf)) continue;
    const r = JSON.parse(fs.readFileSync(rf, 'utf8'));
    const gmap = new Map();
    for (const cf of ['cand-all.json', 'cand.json', 'handoff.json']) {
      const p = path.join(ROOT, 'batch-progress', d, cf);
      if (!fs.existsSync(p)) continue;
      try {
        const c = JSON.parse(fs.readFileSync(p, 'utf8'));
        (Array.isArray(c) ? c : Object.values(c)).forEach(x => {
          if (x && x.artist && (x.album || x.title)) gmap.set(x.artist + '|' + (x.album || x.title), x.genres || (x.genre ? [x.genre] : null));
        });
      } catch { /* 有些檔不是這個形狀 */ }
    }
    for (const [k, v] of Object.entries(r)) {
      const l = v._listeners ?? v.listeners;
      if (!Number.isInteger(l) || (v._obscuritySource || v.obSrc) !== 'lastfm') continue;
      rows.push({ k, batch: d, listeners: l, obscurity: v.obscurity, genre: (gmap.get(k) || [null])[0] });
    }
  }
} else {
  const j = JSON.parse(fs.readFileSync(arg, 'utf8'));
  for (const [k, v] of Object.entries(j)) {
    if (!Number.isInteger(v.listeners)) continue;
    rows.push({ k, listeners: v.listeners, obscurity: v.obscurity, genre: (v.genres || [null])[0] });
  }
}

console.log(`樣本 ${rows.length} 張，其中有曲風 ${rows.filter(r => r.genre).length} 張\n`);

// 1. 與現行門檻不相容的卡——資料層的問題，不是分級的問題
const incompatible = rows.filter(r => Number.isInteger(r.obscurity) && absBand(r.listeners) !== r.obscurity);
console.log(`## 一、與現行絕對門檻不相容的卡：${incompatible.length} 張`);
console.log('（obscurity 不是 listeners 算出來的值——代表當年 worker 查到別的實體、或事後人工改過。要複核。）');
incompatible.slice(0, 30).forEach(r => console.log(`  ${r.k}  listeners=${r.listeners} → 門檻算 ${absBand(r.listeners)}，卡上是 ${r.obscurity}`));
if (incompatible.length > 30) console.log(`  …另 ${incompatible.length - 30} 張`);

// 2. 各曲風分位數
const byG = {};
rows.filter(r => r.genre).forEach(r => (byG[r.genre] = byG[r.genre] || []).push(r));
console.log('\n## 二、各曲風的 listeners 分位數（同一個絕對門檻對不同曲風意味著不同的稀有程度）');
console.log('曲風'.padEnd(11), '  n', '     P10', '     P30', '     P60', '     P85', '  絕對o5%', '  絕對o≥4%');
for (const [g, rs] of Object.entries(byG).sort((a, b) => b[1].length - a[1].length)) {
  const { cuts } = relBands(rs.map(r => r.listeners));
  const o5 = rs.filter(r => absBand(r.listeners) === 5).length, o4 = rs.filter(r => absBand(r.listeners) >= 4).length;
  console.log(g.padEnd(11), String(rs.length).padStart(3), ...cuts.map(c => String(c).padStart(8)),
    (100 * o5 / rs.length).toFixed(0).padStart(8) + '%', (100 * o4 / rs.length).toFixed(0).padStart(9) + '%');
}

// 3. 兩套分級並列，列出會變動的卡
console.log('\n## 三、絕對分級 vs 曲風相對分級（分位點 10/30/60/85）——會變動的卡');
let changed = 0;
for (const [g, rs] of Object.entries(byG)) {
  const { band } = relBands(rs.map(r => r.listeners));
  for (const r of rs) {
    const a = absBand(r.listeners), b = band(r.listeners);
    if (a !== b) { changed++; if (changed <= 40) console.log(`  [${g}] ${r.k}  listeners=${r.listeners}  絕對 ${a} → 相對 ${b}`); }
  }
}
console.log(`  …合計 ${changed}/${rows.filter(r => r.genre).length} 張會變動`);
console.log('\n注意：曲風相對分級會讓「同一個 listeners 數在不同曲風拿到不同分數」，這正是它的目的，');
console.log('但也表示 pearl 門檻（obscurity=5 且 listeners<300）裡的 listeners 那一半仍要維持絕對值——');
console.log('pearl 判的是「近乎無人聽過」，那是絕對的事實，不是相對的。');
