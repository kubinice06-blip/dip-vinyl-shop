// 封面「版本」稽核 步驟 17：把一段 review 卡合成成單張對照圖，給主線直接用 Read 讀。
//
// 為什麼不用步驟 14 的 HTML＋瀏覽器截圖：瀏覽器窗格原生尺寸只有約 778×450，
// 一屏最多塞 3 張卡，830 張要判就要 280 次截圖。改成本機合成 JPEG 之後，
// 一張圖塞 16 卡（2 欄 × 8 列，每卡 4 個候選），判定張數不變、來回次數少 5 倍。
//
// 圖上只畫 ASCII（年份、國別、NOW／ORG 標記）——中文由本腳本印在終端機，
// 因為 System.Drawing 畫 CJK 要挑字型，不值得為此冒險。
//
// 用法：node scripts/cover-audit/17-montage.mjs <from> [count=16]
// 產出：scratchpad 底下的 montage-<from>.jpg，並在終端機印出對照清單。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const DATA = path.join(HERE, 'data');
const THUMBS = path.join(ROOT, 'cover-edition-thumbs');
const OUT = process.env.DIP_MONTAGE_DIR
  || 'C:\\Users\\User\\AppData\\Local\\Temp\\claude\\C--Users-User-dip-vinyl-home\\07aac163-5f1b-45c0-8b72-c2914647769a\\scratchpad';

const FROM = Number(process.argv[2] || 0);
const COUNT = Number(process.argv[3] || 16);
const MAX = 4;                       // 每卡最多列幾個候選

const review = JSON.parse(fs.readFileSync(path.join(DATA, 'edition-review.json'), 'utf8')).review;
const rows = review.slice(FROM, FROM + COUNT);
fs.mkdirSync(THUMBS, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

// 候選挑選沿用步驟 14：現用與最早一定在列，其餘依日期補到 MAX，最後統一按日期排序。
const pick = r => {
  const all = [r.served, ...r.alternatives.filter(a => a.id !== r.served.id)]
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
  const must = new Set([r.served.id, r.original.id]);
  return [...all.filter(o => must.has(o.id)), ...all.filter(o => !must.has(o.id))]
    .slice(0, MAX)
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
};

const jobs = rows.map((r, k) => ({ idx: FROM + k, r, opts: pick(r) }));

// 缺的縮圖先抓回來，PowerShell 那端只讀檔不連網
const missing = [];
for (const j of jobs) for (const o of j.opts) {
  const f = path.join(THUMBS, o.id + '.jpg');
  if (!fs.existsSync(f)) missing.push({ id: o.id, f });
}
if (missing.length) {
  let cur = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (cur < missing.length) {
      const m = missing[cur++];
      for (let i = 0; i < 3; i++) {
        try {
          const res = await fetch(`https://coverartarchive.org/release/${m.id}/front-250`,
            { redirect: 'follow', signal: AbortSignal.timeout(30000) });
          if (res.ok) { fs.writeFileSync(m.f, Buffer.from(await res.arrayBuffer())); break; }
          if (res.status < 500 && res.status !== 429) break;
        } catch { /* 重試 */ }
        await new Promise(s => setTimeout(s, 1500 * (i + 1)));
      }
    }
  }));
  console.log(`補抓縮圖 ${missing.filter(m => fs.existsSync(m.f)).length}／${missing.length}`);
}

const spec = jobs.map(j => ({
  idx: j.idx,
  cells: j.opts.map(o => ({
    file: fs.existsSync(path.join(THUMBS, o.id + '.jpg')) ? path.join(THUMBS, o.id + '.jpg') : '',
    label: `${(o.date || '?').slice(0, 4)} ${o.country || '--'}`,
    tag: o.id === j.r.served.id ? 'NOW' : (o.id === j.r.original.id ? 'ORG' : ''),
  })),
}));

const specPath = path.join(OUT, `montage-${FROM}.json`);
const imgPath = path.join(OUT, `montage-${FROM}.jpg`);
fs.writeFileSync(specPath, JSON.stringify(spec));
execFileSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass',
  '-File', path.join(HERE, '17-montage.ps1'), '-Spec', specPath, '-Out', imgPath], { stdio: 'inherit' });

// 中文清單印在終端機（圖上不畫 CJK）
for (const j of jobs) {
  const cands = j.opts.map((o, n) => `${'abcd'[n]}=${(o.date || '?').slice(0, 4)}/${o.country || '--'}/${o.format || '?'}` +
    (o.id === j.r.served.id ? '(現用)' : '') + (o.id === j.r.original.id ? '(最早)' : '')).join(' ');
  console.log(`#${j.idx} ${j.r.artist} — ${j.r.album}｜${cands}`);
}
console.log(imgPath);
