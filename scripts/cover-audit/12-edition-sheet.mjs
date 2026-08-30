// 封面「版本」稽核 步驟 12：把步驟 11 的 review 清單產成本機接觸表，供人工挑版本。
//
// 為什麼不做自動比圖：2026-08-29 拿 Paris, Texas 當已知答案實測，dHash 與「裁邊後色塊」
// 兩種方法，「同一套視覺的不同掃描」與「完全不同的封面」數值範圍完全重疊
// （同視覺 28/21/39/62，不同視覺 21/33/73/52）。原因是 CAA 的圖有的是平面掃描、
// 有的是套子實拍，帶白邊與角度，差異比換封面還大。所以最後一關一定要人看。
//
// 為什麼是本機頁面而不是 Artifact：Artifact 的 CSP 擋外部主機，CAA 的圖載不進去；
// 全部內嵌成 data URI 又會爆 16MB 上限。
//
// 為什麼分頁：830 張放同一頁會產生 5,190 個 img，Chrome 的 lazy-load 在這種 DOM 量下
// 整個停擺（實測 28 秒零張載入，但單獨 fetch 同一個網址只要 568ms）。切成每頁 100 張就正常。
// 各頁共用同一個 localStorage 鍵，所以在任何一頁按「產生修正清單」都會匯出全部選擇。
//
// 用法：node scripts/cover-audit/12-edition-sheet.mjs [--top N] [--per 100]
// 產出：cover-edition-sheet-01.html …（本機開，勿提交部署）
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'scripts', 'cover-audit', 'data');
const argv = process.argv.slice(2);
const num = (flag, dflt) => { const i = argv.indexOf(flag); return i >= 0 ? Number(argv[i + 1]) : dflt; };
const TOP = num('--top', Infinity);
const PER = num('--per', 100);

const buckets = JSON.parse(fs.readFileSync(path.join(OUT, 'edition-review.json'), 'utf8'));
const rows = buckets.review.slice(0, TOP);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// 步驟 13 抓過的縮圖優先走本機（CAA 只有 2.7 張／秒，直連會讓每頁等好幾分鐘）；
// 沒抓到的仍退回 CAA，所以縮圖還沒抓完也能先用。
const THUMBS = path.join(ROOT, 'cover-edition-thumbs');
const hasLocal = fs.existsSync(THUMBS)
  ? new Set(fs.readdirSync(THUMBS).filter(f => f.endsWith('.jpg')).map(f => f.slice(0, -4)))
  : new Set();
const thumb = id => hasLocal.has(id)
  ? `cover-edition-thumbs/${id}.jpg`
  : `https://coverartarchive.org/release/${id}/front-250`;
const cap = r => `${r.date || '無日期'} · ${r.country || '--'} · ${r.format || '?'}${r.label ? ' · ' + r.label : ''}${r.catno ? ' · ' + r.catno : ''}`;
const pages = Math.ceil(rows.length / PER);
const pageName = p => `cover-edition-sheet-${String(p).padStart(2, '0')}.html`;

const STYLE = `<style>
:root{--bg:#111;--fg:#eee;--dim:#888;--line:#333;--pick:#4ade80;--keep:#60a5fa}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.5 system-ui,"Noto Sans TC",sans-serif}
#bar{position:sticky;top:0;z-index:9;background:#000;border-bottom:1px solid var(--line);padding:10px 16px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}
#bar b{font-size:15px}#bar .n{color:var(--pick)}
button{background:#222;color:var(--fg);border:1px solid var(--line);border-radius:6px;padding:6px 12px;cursor:pointer}
button:hover{border-color:var(--fg)}
#pager a{color:var(--dim);text-decoration:none;padding:2px 6px;border-radius:4px}
#pager a:hover{color:var(--fg);background:#222}
#pager a.here{color:#000;background:var(--pick);font-weight:700}
.card{border-bottom:1px solid var(--line);padding:14px 16px}
.card.done{opacity:.35}
.card header{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:10px}
.score{background:#333;border-radius:4px;padding:1px 7px;color:var(--dim);font-size:12px}
.t{background:#2a2a2a;color:#bbb;border-radius:4px;padding:1px 7px;font-size:12px;font-style:normal;margin-left:4px}
.t-c{background:#4a2020;color:#f9a}
.t-d{background:#3a3320;color:#ec9}
.opts{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px}
.opt{margin:0;width:170px;flex:0 0 auto;cursor:pointer;border:2px solid transparent;border-radius:8px;padding:6px;background:#191919}
.opt:hover{border-color:#555}
.opt.current{border-color:#555}
.opt.picked{border-color:var(--pick);background:#12251a}
.opt img{width:100%;aspect-ratio:1;object-fit:contain;background:#000;border-radius:4px;display:block}
.opt figcaption{font-size:11px;color:var(--dim);margin-top:5px;word-break:break-word}
.card.kept header .keep{border-color:var(--keep);color:var(--keep)}
#outwrap{padding:16px}
textarea{width:100%;height:190px;background:#000;color:var(--pick);border:1px solid var(--line);border-radius:6px;padding:10px;font:12px/1.4 ui-monospace,monospace}
</style>`;

const BEHAVIOUR = [
  '<' + 'script>',
  "const KEY='dip-cover-edition-v1';",
  'const META=window.__META;',
  "const state=JSON.parse(localStorage.getItem(KEY)||'{}');",
  "const cards=[...document.querySelectorAll('.card')];",
  'function paint(){',
  '  for(const c of cards){',
  '    const rg=c.dataset.rg,s=state[rg];',
  "    c.classList.toggle('done',!!s);c.classList.toggle('kept',s==='keep');",
  "    c.querySelectorAll('.opt').forEach(o=>o.classList.toggle('picked',!!s&&s===o.dataset.id));",
  '  }',
  "  document.getElementById('cnt').textContent=Object.keys(state).length;",
  "  document.getElementById('cntPage').textContent=cards.filter(c=>state[c.dataset.rg]).length;",
  '  localStorage.setItem(KEY,JSON.stringify(state));',
  '}',
  "document.addEventListener('click',e=>{",
  "  const o=e.target.closest('.opt'),k=e.target.closest('.keep');",
  "  if(o){const rg=o.closest('.card').dataset.rg;if(state[rg]===o.dataset.id)delete state[rg];else state[rg]=o.dataset.id;paint();}",
  "  else if(k){const rg=k.closest('.card').dataset.rg;if(state[rg]==='keep')delete state[rg];else state[rg]='keep';paint();}",
  '});',
  "document.getElementById('onlyTodo').onclick=e=>{",
  "  const on=e.target.classList.toggle('on');",
  "  e.target.textContent=on?'顯示全部':'只看未處理';",
  "  for(const c of cards)c.style.display=(on&&state[c.dataset.rg])?'none':'';",
  '};',
  "document.getElementById('export').onclick=()=>{",
  "  const picks=Object.entries(state).filter(([,v])=>v&&v!=='keep')",
  '    .map(([rg,id])=>({rg,releaseId:id,...(META[rg]||{})}));',
  "  const kept=Object.values(state).filter(v=>v==='keep').length;",
  "  const ta=document.getElementById('out');",
  '  ta.value=JSON.stringify({要換封面:picks.length,維持現狀:kept,picks},null,1);',
  '  ta.select();',
  '};',
  'paint();',
  '<' + '/script>',
].join('\n');

// 匯出時要帶藝人／專輯名，但選擇散在各頁 → 每頁都嵌入全量對照表（純文字，很小）
const META = {};
for (const r of rows) META[r.rg] = { artist: r.artist, album: r.album };

for (let p = 1; p <= pages; p++) {
  const slice = rows.slice((p - 1) * PER, p * PER);
  const cardsHtml = slice.map(r => {
    const opts = [r.served, ...r.alternatives.filter(a => a.id !== r.served.id).slice(0, 6)];
    const figs = opts.map((o, j) => `
    <figure class="opt${j === 0 ? ' current' : ''}" data-id="${esc(o.id)}">
      <img loading="lazy" src="${thumb(o.id)}" alt="">
      <figcaption>${j === 0 ? '<b>目前顯示</b><br>' : ''}${esc(cap(o))}</figcaption>
    </figure>`).join('');
    const tags = (r.diffCountry ? '<i class="t t-c">國別不同</i>' : '')
      + (r.digital ? '<i class="t t-d">數位重發</i>' : '')
      + (r.yearGap ? `<i class="t">差 ${r.yearGap} 年</i>` : '');
    return `<section class="card" data-rg="${esc(r.rg)}">
  <header>
    <span class="score">${r.score}</span>
    <b>${esc(r.artist)}</b> — ${esc(r.album)}
    <span class="tags">${tags}</span>
    <button class="keep">維持現狀</button>
  </header>
  <div class="opts">${figs}</div>
</section>`;
  }).join('\n');

  const pager = Array.from({ length: pages }, (_, k) =>
    `<a href="${pageName(k + 1)}"${k + 1 === p ? ' class="here"' : ''}>${k + 1}</a>`).join('');

  const html = `<!doctype html><meta charset="utf-8">
<title>封面版本覆核 ${p}/${pages}</title>${STYLE}
<div id="bar">
  <b>封面版本覆核</b>
  <span>第 ${p}/${pages} 頁（本頁 ${slice.length} 張，已處理 <b class="n" id="cntPage">0</b>）</span>
  <span>全部 ${rows.length} 張，累計 <b class="n" id="cnt">0</b></span>
  <button id="onlyTodo">只看未處理</button>
  <button id="export">產生修正清單</button>
  <span id="pager">${pager}</span>
</div>
${cardsHtml}
<div id="outwrap"><textarea id="out" placeholder="按「產生修正清單」後，把這裡的內容整段貼回對話（含所有頁面的選擇）"></textarea></div>
<` + `script>window.__META=${JSON.stringify(META)}<` + `/script>
${BEHAVIOUR}`;
  fs.writeFileSync(path.join(ROOT, pageName(p)), html);
}
const localCount = rows.reduce((n, r) => n + [r.served, ...r.alternatives.slice(0, 6)].filter(o => hasLocal.has(o.id)).length, 0);
const totalImgs = rows.reduce((n, r) => n + 1 + r.alternatives.slice(0, 6).length, 0);
console.log(`接觸表 ${rows.length} 張，切成 ${pages} 頁（每頁 ${PER}）→ ${pageName(1)} …`);
console.log(`縮圖 ${localCount}/${totalImgs} 走本機，其餘退回 CAA（跑完步驟 13 再重產可全部本機化）`);
console.log('各頁共用同一份選擇，按「產生修正清單」會匯出全部。');
