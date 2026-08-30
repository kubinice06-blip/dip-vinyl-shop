// 封面「版本」稽核 步驟 14：產給主線（Claude）逐張目視判定用的密集對照表。
//
// 與步驟 12 的差別：12 是給店主點選用的（一列一卡、大圖、可互動）；
// 這支是給主線用截圖讀的——一屏塞六張卡、每張並列所有候選，只求判得準、不求好點。
//
// 店主 2026-08-30 的選片規則：
//   1. 以**發行國**的封面為主
//   2. **年代版本越早越好**
//   3. 太模糊就挑清晰的
// 所以預設目標是 original（最早且有正面圖的那筆）；主線要判的是
// (a) served 與 original 是不是同一套視覺（同就維持現狀，換了反而可能拿到更差的掃圖）
// (b) original 的掃圖夠不夠清楚，不夠就往後挑同視覺中最清楚的。
//
// 用法：node scripts/cover-audit/14-edition-audit-sheet.mjs [--from 0] [--count 225] [--per 6]
// 產出：cover-audit-sheet-NNN.html（已列入 .gitignore）
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA = path.join(ROOT, 'scripts', 'cover-audit', 'data');
const THUMBS = path.join(ROOT, 'cover-edition-thumbs');
const argv = process.argv.slice(2);
const num = (f, d) => { const i = argv.indexOf(f); return i >= 0 ? Number(argv[i + 1]) : d; };
const FROM = num('--from', 0), COUNT = num('--count', Infinity), PER = num('--per', 5);
// 縮圖邊長：瀏覽器窗格原生尺寸約 778x662，這個值要讓 PER 張卡剛好塞滿一屏
const IMG = num('--img', 86);
const MAX = num('--max', 4);   // 每張卡最多列幾個候選

const buckets = JSON.parse(fs.readFileSync(path.join(DATA, 'edition-review.json'), 'utf8'));
const rows = buckets.review.slice(FROM, FROM + COUNT);
const local = fs.existsSync(THUMBS)
  ? new Set(fs.readdirSync(THUMBS).filter(f => f.endsWith('.jpg')).map(f => f.slice(0, -4)))
  : new Set();
const src = id => local.has(id) ? `cover-edition-thumbs/${id}.jpg` : `https://coverartarchive.org/release/${id}/front-250`;
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cap = r => `${(r.date || '?').slice(0, 4)} ${r.country || '--'}`;

const pages = Math.ceil(rows.length / PER);
const name = p => `cover-audit-sheet-${String(FROM + (p - 1) * PER).padStart(3, '0')}.html`;

for (let p = 1; p <= pages; p++) {
  const slice = rows.slice((p - 1) * PER, p * PER);
  const cards = slice.map((r, k) => {
    const idx = FROM + (p - 1) * PER + k;
    // 候選依年份排序，最早的排最前（＝店主規則的預設目標）。
    // **只列 MAX 張**：判定只需要「現用 vs 最早」，再加一兩張備胎供「太模糊挑清晰的」時替換；
    // 全部列出來會讓每張卡換行成兩排，一屏只塞得下兩張，截圖數量直接翻倍。
    const sorted = [r.served, ...r.alternatives.filter(a => a.id !== r.served.id)]
      .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
    const must = new Set([r.served.id, r.original.id]);
    const opts = [...sorted.filter(o => must.has(o.id)), ...sorted.filter(o => !must.has(o.id))]
      .slice(0, MAX)
      .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
    const figs = opts.map(o => {
      const isServed = o.id === r.served.id;
      const isOrig = o.id === r.original.id;
      const tag = isServed ? '<b class="now">現用</b>' : (isOrig ? '<b class="org">最早</b>' : '');
      return `<figure class="${isServed ? 'served' : ''}${isOrig ? ' orig' : ''}">
        <img loading="lazy" src="${src(o.id)}"><figcaption>${tag}${esc(cap(o))}</figcaption></figure>`;
    }).join('');
    return `<section><h3><span class="n">#${idx}</span> ${esc(r.artist)} — ${esc(r.album)}</h3><div class="row">${figs}</div></section>`;
  }).join('\n');

  fs.writeFileSync(path.join(ROOT, name(p)), `<!doctype html><meta charset="utf-8">
<title>封面稽核 ${FROM + (p - 1) * PER}–${FROM + (p - 1) * PER + slice.length - 1}</title>
<style>
body{margin:0;background:#fff;color:#111;font:12px/1.3 system-ui,"Noto Sans TC",sans-serif}
section{border-bottom:1px solid #ddd;padding:3px 8px}
h3{margin:0 0 2px;font-size:12px;font-weight:600}
.n{color:#999;font-weight:400;margin-right:6px}
.row{display:flex;gap:4px;flex-wrap:wrap}
figure{margin:0;width:${IMG}px}
figure img{width:${IMG}px;height:${IMG}px;object-fit:contain;background:#eee;display:block;border:2px solid transparent}
figure.served img{border-color:#d00}
figure.orig img{border-color:#07c}
figure.served.orig img{border-color:#0a0}
figcaption{font-size:9px;color:#666;text-align:center}
.now{color:#d00}.org{color:#07c}
</style>
${cards}`);
}
console.log(`稽核表 ${rows.length} 張（#${FROM}–#${FROM + rows.length - 1}），每頁 ${PER} 張、共 ${pages} 頁 → ${name(1)} …`);
console.log('紅框＝目前線上顯示、藍框＝最早且有圖、候選依年份由早到晚排列。');
