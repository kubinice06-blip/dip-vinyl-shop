#!/usr/bin/env node
// 店內紙本介紹卡（A6 直式 105×148mm）：從 data/shop/descs.json＋inventory.json 產生可列印 HTML。
// 用法：node scripts/build-shop-print.mjs [--ids id1,id2,…] [--out data/shop/print/shop-a6.html]
// 不帶 --ids 就輸出全部在售品（依曲風排序）。PDF 由 Playwright 列印此 HTML（見 data/shop/print/README.md）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const SHEET = (arg('--sheet') || '').toLowerCase();   // a4：A7 卡 8 張拼一張 A4 橫式（4 欄 × 2 列）
// --fold（限 A7）：卡片上緣留一段反折片，折成ㄇ字掛在唱片封套上緣——上到下依序是背面反折片 17mm（空白）、
// 跨封套厚度的頂邊 4mm（兩條折線之間）、正面 84mm（原本的內容，字級整體縮小）
const FOLD = process.argv.includes('--fold');
const OUT = path.resolve(R, arg('--out') || `data/shop/print/shop-${(arg('--size') || 'a6').toLowerCase()}${FOLD ? '-fold' : ''}${SHEET ? '-' + SHEET : ''}.html`);
const pick = arg('--ids') ? new Set(arg('--ids').split(',')) : null;
const SIZE = (arg('--size') || 'a6').toLowerCase();   // a6 105×148mm（預設）｜a7 74×105mm

const descs = JSON.parse(fs.readFileSync(path.join(R, 'data/shop/descs.json'), 'utf8'));
const inv = JSON.parse(fs.readFileSync(path.join(R, 'data/shop/inventory.json'), 'utf8'));
const byKey = new Map(descs.items.map(i => [i.key, i]));
// 三軸與頂點：讀卡池 seed_cards.json（[藝人, 專輯, 經典, 冷門, 硬蕊, 曲風, 年, 作曲, 頂點]）
const norm = s => String(s || '').toLowerCase().replace(/[\u2010-\u2015\uff0d]/g, '-').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const seed = new Map(JSON.parse(fs.readFileSync(path.join(R, 'seed_cards.json'), 'utf8')).map(r => [norm(r[0]) + '|' + norm(r[1]), r]));
// 與前台 SPECIAL_TIERS 相同：頂點卡的對應軸固定滿 7 顆星
const APEX = { hall: { label: '殿堂', en: 'Hall of Fame', dim: 2 }, pearl: { label: '流亡', en: 'Exile', dim: 3 }, heresy: { label: '異端', en: 'Heresy', dim: 4 } };
const pendingMeta = (() => { try { return JSON.parse(fs.readFileSync(path.join(R, 'data/shop/pending-meta.json'), 'utf8')).items || {}; } catch { return {}; } })();
const byId = new Map(); descs.items.forEach(i => (i.ids || []).forEach(id => byId.set(id, i)));
const ORDER = ['Jazz', 'Soul', 'R&B', 'Hip-Hop', 'Reggae', 'Rock', 'Folk', 'City Pop', 'Pop', 'Electronic', 'Classical', 'Soundtrack'];
const ZH = { Jazz: '爵士', Soul: '靈魂', 'R&B': '節奏藍調', 'Hip-Hop': '嘻哈', Rock: '搖滾', Folk: '民謠', 'City Pop': '城市流行', Pop: '流行', Electronic: '電子', Soundtrack: '原聲帶', Classical: '古典', Reggae: '雷鬼' };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const rows = inv.items
  .filter(i => i.status !== 'sold' && (!pick || pick.has(i.id)))
  .map(i => ({ i, d: byId.get(i.id) || byKey.get(i.cardKey) }))
  .filter(x => x.d);
const rk = x => { const k = ORDER.indexOf((x.i.genres || [])[0]); return k < 0 ? 99 : k; };
rows.sort((a, b) => rk(a) - rk(b) || a.d.artist.localeCompare(b.d.artist));

// 左下角 QR：data/shop/stream-links.json（scripts/resolve-shop-stream-links.mjs 產生），依 Spotify → Apple Music → YT Music → Bandcamp 取第一個；
// QR 中央放該平台 logo（scripts/lib/stream-logos.mjs），所以容錯用最高的 H 級（可承受約 30% 遮蔽，logo 底塊只佔約 9%）
import qrcode from './vendor/qrcode-generator.mjs';
import { LOGOS, logoOf, toSvg } from './lib/stream-logos.mjs';
const LINKS = (() => { try { return JSON.parse(fs.readFileSync(path.join(R, 'data/shop/stream-links.json'), 'utf8')).items || {}; } catch { return {}; } })();
const STREAMS = ['spotify', 'apple', 'yt', 'bandcamp'];
const QR_M = 2;   // 2 格靜區
// logo 底塊：邊長約 QR 的 30%，取奇數格讓它正好置中在格線上
const logoBox = n => { let b = Math.round(n * 0.3); if (b % 2 === 0) b++; return { b, o: QR_M + (n - b) / 2 }; };
const qrSvg = (url, logo) => {
  const q = qrcode(0, 'H'); q.addData(url); q.make();
  const n = q.getModuleCount(), m = QR_M;
  let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c + m} ${r + m}h1v1h-1z`;
  const { b, o } = logoBox(n), pad = 0.7, sc = (b - 2 * pad) / 100;
  return `<svg class="qr" data-url="${esc(url)}" data-logo="${logo}" viewBox="0 0 ${n + 2 * m} ${n + 2 * m}"><path d="${d}" fill="#1c1b19" shape-rendering="crispEdges"/>`
    + `<rect x="${o}" y="${o}" width="${b}" height="${b}" fill="#ffffff"/><g transform="translate(${o + pad} ${o + pad}) scale(${sc})">${toSvg(LOGOS[logo])}</g></svg>`;
};
const streamOf = id => { const l = LINKS[id]; if (!l) return null; for (const k of STREAMS) if (l[k]) return { url: l[k], logo: logoOf(k, l[k]) }; return null; };

const stars = (n, total) => { n = Math.max(0, Math.min(total, Math.round(Number(n) || 0))); return '<b>' + '★'.repeat(n) + '</b>' + '☆'.repeat(total - n); };
const card = ({ i, d }) => {
  // 待上架（卡池還沒有）的三軸讀 data/shop/pending-meta.json 的店內暫定值
  const ax = pendingMeta[i.id]?.axes;
  const row = i.cardKey ? seed.get(i.cardKey) : ax ? [0, 0, ax.classic, ax.obscurity, ax.accessibility] : null;
  const apex = row && APEX[row[8]] ? APEX[row[8]] : null;
  const axes = row ? [['經典度', 2], ['冷門度', 3], ['硬蕊度', 4]].map(([label, k]) => {
    const hit = apex && apex.dim === k;
    return `<span class="ax${hit ? ' hit' : ''}"><em>${label}</em><span class="st">${hit ? stars(7, 7) : stars(row[k], 5)}</span></span>`;
  }).join('') : '';
  const genres = (i.genres || []).map(g => `<span class="g">${esc(ZH[g] || g)}<i>${esc(g)}</i></span>`).join('');
  const price = i.priceNT ? `NT$ ${Number(i.priceNT).toLocaleString('en-US')}` : '價格請洽店員';
  const sub = [i.pressingYear ? `${i.pressingYear} 年壓片` : '', i.condition ? `品相 ${i.condition}` : ''].filter(Boolean).join('　');
  const len = [...d.text].length;
  const st = streamOf(i.id);
  const body = `<header><span class="shop">dip vinyl${apex ? `<span class="apexbadge">${apex.label}<i>${apex.en}</i></span>` : ''}</span><span class="genres">${genres}</span></header>
  <div class="title"><p class="artist">${esc(d.artist)}</p><h1>${esc(d.album)}</h1></div>
  ${axes ? `<div class="axes">${axes}</div>` : ''}
  <p class="text">${esc(d.text)}</p>
  <footer><span class="foot-l">${st ? qrSvg(st.url, st.logo) : ''}<span class="sub">${esc(sub)}</span></span><span class="price">${esc(price)}</span></footer>`;
  const cls = `card${len > 225 ? ' long' : ''}${apex ? ' apex apex-' + row[8] : ''}${FOLD ? ' fold' : ''}`;
  if (!FOLD) return `<section class="${cls}">\n  ${body}\n</section>`;
  return `<section class="${cls}">
  <div class="flap"></div>
  <div class="spine"></div>
  <div class="front">${body}</div>
</section>`;
};

// 裁切線只畫在卡與卡之間：3 條直線、1 條橫線
const CUTS = [1, 2, 3].map(c => `<i class="cut v" style="left:${c * 74.25}mm"></i>`).join('') + '<i class="cut h" style="top:105mm"></i>';
const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><title>dip vinyl 店內介紹卡 A6</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;700;900&family=Noto+Serif+JP:wght@500;700;900&family=Noto+Sans+TC:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
@page { size: 105mm 148mm; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; background: #e9e6df; }
body { font-family: "Noto Sans TC", sans-serif; color: #1c1b19; }
.card { width: 105mm; height: 148mm; background: #ffffff; margin: 6mm auto; padding: 9mm 8.5mm 8mm;
  display: flex; flex-direction: column; page-break-after: always; break-after: page; overflow: hidden; }
header { display: flex; justify-content: space-between; align-items: center; gap: 3mm;
  font-family: "IBM Plex Mono", monospace; font-size: 6.5pt; letter-spacing: .14em; text-transform: lowercase; }
.shop { color: #1c1b19; font-weight: 500; }
.genres { display: flex; gap: 1.5mm; flex-wrap: wrap; justify-content: flex-end; }
.g { border: .25mm solid #1c1b19; border-radius: 3mm; padding: .5mm 2mm; font-family: "Noto Sans TC", sans-serif; font-size: 7pt; letter-spacing: .06em; }
.g i { font-style: normal; font-family: "IBM Plex Mono", monospace; font-size: 5.5pt; margin-left: 1mm; color: #6d675e; letter-spacing: .04em; }
.title { margin: 9mm 0 0; padding-bottom: 3.5mm; border-bottom: .3mm solid #1c1b19; }
.axes { display: flex; justify-content: space-between; gap: 2mm; padding: 2.2mm 0; border-bottom: .2mm solid #b9b3a8; }
.ax { display: flex; flex-direction: column; gap: .6mm; }
.ax em { font-style: normal; font-size: 7pt; letter-spacing: .12em; color: #6d675e; }
.st { font-size: 10.5pt; letter-spacing: .02em; color: #c9c3b8; line-height: 1; }
.st b { color: #1c1b19; font-weight: 400; }
.ax.hit em { color: #1c1b19; font-weight: 500; }
.apex-hall .ax.hit .st b { color: #6f777f; } .apex-pearl .ax.hit .st b { color: #8a5a2b; } .apex-heresy .ax.hit .st b { color: #a3122a; }
.apexbadge { margin-left: 2.5mm; padding: .6mm 2mm; border-radius: .6mm; color: #ffffff; font-family: "Noto Sans TC", sans-serif; font-weight: 500; font-size: 7pt; letter-spacing: .1em; }
.apexbadge i { font-style: normal; font-family: "IBM Plex Mono", monospace; font-size: 5.5pt; margin-left: 1.2mm; opacity: .85; letter-spacing: .06em; }
.apex-hall .apexbadge { background: #6f777f; } .apex-pearl .apexbadge { background: #8a5a2b; } .apex-heresy .apexbadge { background: #a3122a; }

.artist { margin: 0 0 1.5mm; font-size: 9.5pt; letter-spacing: .04em; color: #4a463f; }
h1 { margin: 0; font-family: "Noto Serif TC", "Noto Serif JP", serif; font-weight: 900; font-size: 19pt; line-height: 1.25; text-wrap: balance; word-break: normal; overflow-wrap: anywhere; }
.text { margin: 3.5mm 0 0; font-family: "Noto Serif TC", "Noto Serif JP", serif; font-weight: 500; font-size: 10.2pt; line-height: 1.85; text-align: justify; flex: 1; }
.long .text { font-size: 9.8pt; line-height: 1.8; }
footer { display: flex; justify-content: space-between; align-items: flex-end; border-top: .2mm solid #b9b3a8; padding-top: 2.5mm; }
.sub { font-family: "IBM Plex Mono", "Noto Sans TC", monospace; font-size: 6.5pt; color: #6d675e; }
.price { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 16pt; letter-spacing: .02em; }
.foot-l { display: flex; align-items: flex-end; gap: 2mm; min-width: 0; }
.qr { width: 14mm; height: 14mm; flex: none; display: block; margin: 0 0 -1mm -1mm; }
@media print { html, body { background: none; } .card { margin: 0; } }
${SIZE === 'a7' ? `
/* A7 74×105mm：同版面等比縮小，內文字級另調到可讀下限 */
@page { size: 74mm 105mm; margin: 0; }
.card { width: 74mm; height: 105mm; padding: 6mm 5.8mm 5.5mm; }
header { font-size: 5pt; }
.g { font-size: 5.6pt; padding: .3mm 1.4mm; border-radius: 2mm; } .g i { font-size: 4.4pt; margin-left: .7mm; }
.apexbadge { font-size: 5.6pt; padding: .4mm 1.4mm; margin-left: 1.6mm; } .apexbadge i { font-size: 4.4pt; }
.title { margin-top: 3mm; padding-bottom: 1.8mm; }
.artist { font-size: 6.5pt; margin-bottom: .6mm; }
h1 { font-size: 10.5pt; line-height: 1.25; }
.axes { padding: 1.5mm 0; } .ax em { font-size: 5.2pt; } .st { font-size: 7.6pt; }
.text { margin-top: 2.4mm; font-size: 9pt; line-height: 1.5; }
.long .text { font-size: 9pt; line-height: 1.5; }
footer { padding-top: 1.6mm; } .sub { font-size: 5pt; } .price { font-size: 11.5pt; }
.qr { width: 11mm; height: 11mm; margin: 0 0 -.8mm -.8mm; } .foot-l { gap: 1.4mm; }` : ''}
${FOLD ? `
/* 掛卡（ㄇ字折）：反折片 17mm（空白）＋頂邊 4mm＋正面 84mm＝105mm；兩條折線是灰色虛線 */
.card.fold { padding: 0; }
.flap { height: 17mm; flex: none; }
.spine { height: 4mm; flex: none; border-top: .15mm dashed #d9d4ca; border-bottom: .15mm dashed #d9d4ca; }
.front { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 3mm 5.8mm 4.2mm; }
header { font-size: 4.6pt; }
.g { font-size: 5pt; padding: .25mm 1.2mm; } .g i { font-size: 4pt; }
.apexbadge { font-size: 5pt; padding: .3mm 1.2mm; } .apexbadge i { font-size: 4pt; }
.title { margin-top: 2.2mm; padding-bottom: 1.4mm; }
.artist { font-size: 6pt; margin-bottom: .4mm; }
h1 { font-size: 9.5pt; }
.axes { padding: 1.1mm 0; } .ax em { font-size: 4.8pt; } .st { font-size: 6.8pt; }
.text, .long .text { margin-top: 1.8mm; font-size: 7.6pt; line-height: 1.5; }
footer { padding-top: 1.2mm; } .sub { font-size: 4.6pt; } .price { font-size: 10pt; }
.qr { width: 11mm; height: 11mm; }` : ''}
${SHEET === 'a4' ? `
/* A4 橫式 297×210mm 拼 8 張（4 × 2），卡片 74.25×105mm 剛好平分塞滿、四周不留白（店主 2026-10-17）；
   只在卡與卡之間畫淺灰虛線當裁切線，紙張外緣不畫 */
@page { size: 297mm 210mm; margin: 0; }
.sheet { position: relative; width: 297mm; height: 210mm; margin: 6mm auto; background: #ffffff; display: grid;
  grid-template-columns: repeat(4, 74.25mm); grid-template-rows: repeat(2, 105mm);
  break-after: page; page-break-after: always; }
.sheet .card { width: 74.25mm; margin: 0; break-after: auto; page-break-after: auto; }
.cut { position: absolute; display: block; border: 0 dashed #c9c3b8; }
.cut.v { top: 0; bottom: 0; width: 0; border-left-width: .1mm; margin-left: -.05mm; }
.cut.h { left: 0; right: 0; height: 0; border-top-width: .1mm; margin-top: -.05mm; }
@media print { .sheet { margin: 0; } }` : ''}
</style></head><body>
${SHEET === 'a4'
  ? Array.from({ length: Math.ceil(rows.length / 8) }, (_, i) => `<div class="sheet">\n${rows.slice(i * 8, i * 8 + 8).map(card).join('\n')}\n${CUTS}</div>`).join('\n')
  : rows.map(card).join('\n')}
</body></html>`;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
console.log(`寫出 ${path.relative(R, OUT)}：${rows.length} 張${SHEET === 'a4' ? `，${Math.ceil(rows.length / 8)} 頁 A4` : ''}`);
