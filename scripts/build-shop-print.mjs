#!/usr/bin/env node
// 店內紙本介紹卡（A6 直式 105×148mm）：從 data/shop/descs.json＋inventory.json 產生可列印 HTML。
// 用法：node scripts/build-shop-print.mjs [--ids id1,id2,…] [--out data/shop/print/shop-a6.html]
// 不帶 --ids 就輸出全部在售品（依曲風排序）。PDF 由 Playwright 列印此 HTML（見 data/shop/print/README.md）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const OUT = path.resolve(R, arg('--out') || `data/shop/print/shop-${(arg('--size') || 'a6').toLowerCase()}.html`);
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
const byId = new Map(); descs.items.forEach(i => (i.ids || []).forEach(id => byId.set(id, i)));
const ORDER = ['Jazz', 'Soul', 'R&B', 'Hip-Hop', 'Rock', 'Folk', 'City Pop', 'Pop', 'Electronic', 'Soundtrack'];
const ZH = { Jazz: '爵士', Soul: '靈魂', 'R&B': '節奏藍調', 'Hip-Hop': '嘻哈', Rock: '搖滾', Folk: '民謠', 'City Pop': '城市流行', Pop: '流行', Electronic: '電子', Soundtrack: '原聲帶' };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const rows = inv.items
  .filter(i => i.status !== 'sold' && (!pick || pick.has(i.id)))
  .map(i => ({ i, d: byId.get(i.id) || byKey.get(i.cardKey) }))
  .filter(x => x.d);
const rk = x => { const k = ORDER.indexOf((x.i.genres || [])[0]); return k < 0 ? 99 : k; };
rows.sort((a, b) => rk(a) - rk(b) || a.d.artist.localeCompare(b.d.artist));

const stars = (n, total) => { n = Math.max(0, Math.min(total, Math.round(Number(n) || 0))); return '<b>' + '★'.repeat(n) + '</b>' + '☆'.repeat(total - n); };
const card = ({ i, d }) => {
  const row = i.cardKey ? seed.get(i.cardKey) : null;
  const apex = row && APEX[row[8]] ? APEX[row[8]] : null;
  const axes = row ? [['經典度', 2], ['冷門度', 3], ['硬蕊度', 4]].map(([label, k]) => {
    const hit = apex && apex.dim === k;
    return `<span class="ax${hit ? ' hit' : ''}"><em>${label}</em><span class="st">${hit ? stars(7, 7) : stars(row[k], 5)}</span></span>`;
  }).join('') : '';
  const genres = (i.genres || []).map(g => `<span class="g">${esc(ZH[g] || g)}<i>${esc(g)}</i></span>`).join('');
  const price = i.priceNT ? `NT$ ${Number(i.priceNT).toLocaleString('en-US')}` : '價格請洽店員';
  const sub = [i.pressingYear ? `${i.pressingYear} 年壓片` : '', i.condition ? `品相 ${i.condition}` : ''].filter(Boolean).join('　');
  const len = [...d.text].length;
  return `<section class="card${len > 225 ? ' long' : ''}${apex ? ' apex apex-' + row[8] : ''}">
  <header><span class="shop">dip vinyl${apex ? `<span class="apexbadge">${apex.label}<i>${apex.en}</i></span>` : ''}</span><span class="genres">${genres}</span></header>
  <div class="title"><p class="artist">${esc(d.artist)}</p><h1>${esc(d.album)}</h1></div>
  ${axes ? `<div class="axes">${axes}</div>` : ''}
  <p class="text">${esc(d.text)}</p>
  <footer><span class="sub">${esc(sub)}</span><span class="price">${esc(price)}</span></footer>
</section>`;
};

const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><title>dip vinyl 店內介紹卡 A6</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;700;900&family=Noto+Serif+JP:wght@500;700;900&family=Noto+Sans+TC:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
@page { size: 105mm 148mm; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; background: #e9e6df; }
body { font-family: "Noto Sans TC", sans-serif; color: #1c1b19; }
.card { width: 105mm; height: 148mm; background: #fbfaf6; margin: 6mm auto; padding: 9mm 8.5mm 8mm;
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
.apexbadge { margin-left: 2.5mm; padding: .6mm 2mm; border-radius: .6mm; color: #fbfaf6; font-family: "Noto Sans TC", sans-serif; font-weight: 500; font-size: 7pt; letter-spacing: .1em; }
.apexbadge i { font-style: normal; font-family: "IBM Plex Mono", monospace; font-size: 5.5pt; margin-left: 1.2mm; opacity: .85; letter-spacing: .06em; }
.apex-hall .apexbadge { background: #6f777f; } .apex-pearl .apexbadge { background: #8a5a2b; } .apex-heresy .apexbadge { background: #a3122a; }

.artist { margin: 0 0 1.5mm; font-size: 9.5pt; letter-spacing: .04em; color: #4a463f; }
h1 { margin: 0; font-family: "Noto Serif TC", "Noto Serif JP", serif; font-weight: 900; font-size: 19pt; line-height: 1.25; text-wrap: balance; word-break: normal; overflow-wrap: anywhere; }
.text { margin: 3.5mm 0 0; font-family: "Noto Serif TC", "Noto Serif JP", serif; font-weight: 500; font-size: 10.2pt; line-height: 1.85; text-align: justify; flex: 1; }
.long .text { font-size: 9.8pt; line-height: 1.8; }
footer { display: flex; justify-content: space-between; align-items: flex-end; border-top: .2mm solid #b9b3a8; padding-top: 2.5mm; }
.sub { font-family: "IBM Plex Mono", "Noto Sans TC", monospace; font-size: 6.5pt; color: #6d675e; }
.price { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 16pt; letter-spacing: .02em; }
@media print { html, body { background: none; } .card { margin: 0; } }
${SIZE === 'a7' ? `
/* A7 74×105mm：同版面等比縮小，內文字級另調到可讀下限 */
@page { size: 74mm 105mm; margin: 0; }
.card { width: 74mm; height: 105mm; padding: 6mm 5.8mm 5.5mm; }
header { font-size: 5pt; }
.g { font-size: 5.6pt; padding: .3mm 1.4mm; border-radius: 2mm; } .g i { font-size: 4.4pt; margin-left: .7mm; }
.apexbadge { font-size: 5.6pt; padding: .4mm 1.4mm; margin-left: 1.6mm; } .apexbadge i { font-size: 4.4pt; }
.title { margin-top: 5mm; padding-bottom: 2.4mm; }
.artist { font-size: 7pt; margin-bottom: 1mm; }
h1 { font-size: 13pt; }
.axes { padding: 1.5mm 0; } .ax em { font-size: 5.2pt; } .st { font-size: 7.6pt; }
.text { margin-top: 2.4mm; font-size: 9pt; line-height: 1.5; }
.long .text { font-size: 9pt; line-height: 1.5; }
footer { padding-top: 1.6mm; } .sub { font-size: 5pt; } .price { font-size: 11.5pt; }` : ''}
</style></head><body>
${rows.map(card).join('\n')}
</body></html>`;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
console.log(`寫出 ${path.relative(R, OUT)}：${rows.length} 張`);
