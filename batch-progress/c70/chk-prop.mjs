// c-70 提案檢查。用法：node batch-progress/c70/chk-prop.mjs [組別…]
// 卡池合併後「線上池」＝ seed_cards.json 全部（一般卡與王牌都算，撞到哪種都是撞卡）。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';
const VALID = ['rock', 'jazz', 'soul', 'electronic', 'pop', 'hiphop', 'folk', 'classical', 'world', 'blues'];
const k = s => String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
const rows = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const live = new Map(); for (const r of rows) live.set(k(r[0]) + '|' + k(r[1]), r[8] ? `apex:${r[8]}` : 'seed');

const groups = process.argv.slice(2).length ? process.argv.slice(2) : ['a', 'b'];
const all = [];
let bad = 0;
for (const g of groups) {
  const f = path.join(ROOT, `batch-progress/c70/prop-${g}.json`);
  if (!fs.existsSync(f)) { console.log(`prop-${g}.json：未產出`); continue; }
  const p = JSON.parse(fs.readFileSync(f, 'utf8'));
  const say = (m) => { bad++; console.log(`  ⚠ ${m}`); };
  console.log(`\nprop-${g}.json：${p.length} 張、${new Set(p.map(x => x.artist)).size} 位`);
  p.forEach(x => {
    if (!x.artist || !x.album || !x.year || !x.why) say(`缺欄：${x.artist} — ${x.album}`);
    if (!Array.isArray(x.genres) || !x.genres.length || x.genres.some(y => !VALID.includes(y)))
      say(`曲風越界：${x.artist} — ${x.album} ${JSON.stringify(x.genres)}`);
    if (x.year < 1900 || x.year > 2026) say(`年份離譜：${x.artist} — ${x.album}（${x.year}）`);
    // 非 ASCII 連字號會讓標題比對整組失準（路線圖反模式：c-50 踩過）
    if (/[‐‑‒–—―－]/.test(x.album)) say(`專輯名含非 ASCII 連字號：${x.artist} — ${x.album}`);
    if (x.releaseType === 'Compilation') {
      // §5.6 精選制門檻：合輯要收，就得自己交代歷史重要性與可追溯的證據
      if (!x.exceptionReason || Array.from(String(x.exceptionReason)).length < 12)
        say(`合輯缺 exceptionReason（≥12 字）：${x.artist} — ${x.album}`);
      const urls = (x.exceptionEvidenceUrls || []).filter(u => /^https:\/\/\S+$/.test(String(u)));
      if (urls.length < 2) say(`合輯的證據網址不足兩個：${x.artist} — ${x.album}`);
    } else if (x.exceptionReason || (x.exceptionEvidenceUrls || []).length) {
      say(`非合輯卻帶例外欄位：${x.artist} — ${x.album}`);
    }
    const hit = live.get(k(x.artist) + '|' + k(x.album));
    if (hit) say(`與線上池撞卡：${x.artist} — ${x.album}（線上 ${hit}）`);
    all.push({ ...x, _g: g });
  });
}
// 跨組重複——五組並行、名單有重疊風險
const kk = all.map(x => k(x.artist) + '|' + k(x.album));
const dup = [...new Set(kk.filter((x, i) => kk.indexOf(x) !== i))];
dup.forEach(d => { bad++; console.log(`  ⚠ 跨組重複：${all.filter(x => k(x.artist) + '|' + k(x.album) === d).map(x => x._g + ':' + x.artist + ' — ' + x.album).join('  ／  ')}`); });
// 跨批去重（2026-09-02 新增，裁定第 119 條）：chk-prop 原本只比「線上池」與「批內跨組」，
// 漏掉「其他待上架批次」。這裡在結尾串跑共用的 dedup-crossbatch.mjs。
import { execFileSync } from 'node:child_process';
try {
  execFileSync(process.execPath, [path.join(ROOT, 'batch-progress/dedup-crossbatch.mjs')], { stdio: 'inherit' });
} catch { bad++; console.log('  ⚠ 跨批去重未通過（見上）'); }

console.log(`\n合計 ${all.length} 張、${new Set(all.map(x => x.artist)).size} 位｜標記 ${bad}`);
process.exit(bad ? 1 : 0);
