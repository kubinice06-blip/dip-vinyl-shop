#!/usr/bin/env node
// 店內紙本介紹卡 → Illustrator 腳本（.jsx）：在 Illustrator 裡用原生物件重建每張卡，
// 專輯介紹是一個「區域文字」框（可直接改字、自動換行），其餘是點文字、線條與色塊。
// 版面位置量自 build-shop-print.mjs 產生的 HTML（瀏覽器排好版，再逐元素量座標）。
// 用法：node scripts/build-shop-print-ai.mjs [--size a7|a6] [--html data/shop/print/shop-a7.html] [--out data/shop/print/shop-a7.jsx]
// 在 Illustrator：檔案 → 指令碼 → 其他指令碼… 選這個 .jsx。字型需先安裝（見 data/shop/print/README.md）。
// 雲端容器連不到 Google Fonts 時加環境變數 SHOP_PRINT_CURL=1（字型經 curl 抓）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const SIZE = (arg('--size') || 'a7').toLowerCase();
const HTML = path.resolve(R, arg('--html') || `data/shop/print/shop-${SIZE}.html`);
const SHEET = (arg('--sheet') || '').toLowerCase();   // a4：每張 A4 橫式拼 8 張 A7（4 × 2），卡緣畫淺灰虛線裁切線
const OUT = path.resolve(R, arg('--out') || HTML.replace(/\.html$/, SHEET ? `-${SHEET}.jsx` : '.jsx'));

let chromium;
try { ({ chromium } = await import('playwright')); } catch { ({ chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs')); }

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 900, height: 1200 } });
if (process.env.SHOP_PRINT_CURL) {
  await ctx.route(/^https:\/\//, async route => {
    try {
      const out = execFileSync('curl', ['-sS', '-L', '-D', '-', '--max-time', '30', '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36', route.request().url()], { maxBuffer: 80e6 });
      let sep = out.indexOf('\r\n\r\n'), head = out.subarray(0, sep).toString(), rest = out.subarray(sep + 4);
      while (/^HTTP\/\S+ (3\d\d|200 Connection established)/i.test(head)) { const n = rest.indexOf('\r\n\r\n'); head = rest.subarray(0, n).toString(); rest = rest.subarray(n + 4); }
      const ct = (head.match(/content-type:\s*([^\r\n]+)/i) || [])[1] || 'application/octet-stream';
      return route.fulfill({ status: Number(head.split(' ')[1]) || 200, body: rest, contentType: ct, headers: { 'access-control-allow-origin': '*' } });
    } catch { return route.abort(); }
  });
}
const page = await ctx.newPage();
await page.goto('file://' + HTML, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// 每張卡：{ name, w, h, items[] }，座標單位 pt，原點為卡片左上角，y 向下
const cards = await page.evaluate(() => {
  const PT = 0.75;   // CSS px → pt
  const font = cs => {
    const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(), w = Number(cs.fontWeight);
    if (/Serif/.test(fam)) return w >= 800 ? 'serif-black' : w >= 600 ? 'serif-bold' : 'serif-medium';
    if (/Mono/.test(fam)) return w >= 500 ? 'mono-medium' : 'mono-regular';
    return w >= 500 ? 'sans-medium' : 'sans-regular';
  };
  const st = el => {
    const cs = getComputedStyle(el), size = parseFloat(cs.fontSize);
    const ls = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing);
    const lh = cs.lineHeight === 'normal' ? size * 1.2 : parseFloat(cs.lineHeight);
    return { font: font(cs), size: size * PT, lead: lh * PT, color: cs.color, tracking: Math.round(ls / size * 1000) };
  };
  // 文字基線：在元素（或文字節點後）塞一個零寬 inline-block，它的底就是基線
  const baseline = (el, after) => {
    const m = document.createElement('span'); m.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
    if (after === 'first') el.prepend(m); else if (after) after.after(m); else el.appendChild(m);
    const y = m.getBoundingClientRect().bottom; m.remove(); return y;
  };
  return [...document.querySelectorAll('.card')].map(card => {
    const c = card.getBoundingClientRect();
    const X = v => (v - c.left) * PT, Y = v => (v - c.top) * PT;
    const items = [];
    const point = (el, s, align = 'left', node = null) => {
      const r = node ? (() => { const g = document.createRange(); g.selectNodeContents(node); return g.getBoundingClientRect(); })() : el.getBoundingClientRect();
      items.push({ k: 'point', s, x: X(align === 'right' ? r.right : r.left), y: Y(baseline(el, node)), align, ...st(el) });
    };
    const line = (el, side) => {
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el), w = parseFloat(cs[`border${side}Width`]);
      if (!w) return;
      const y = side === 'Bottom' ? r.bottom - w / 2 : r.top + w / 2;
      items.push({ k: 'line', x1: X(r.left), x2: X(r.right), y: Y(y), sw: w * PT, color: cs[`border${side}Color`] });
    };
    const box = (el, fill, stroke) => {
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      items.push({ k: 'rect', x: X(r.left), y: Y(r.top), w: r.width * PT, h: r.height * PT, r: parseFloat(cs.borderTopLeftRadius) * PT,
        fill: fill ? cs.backgroundColor : null, stroke: stroke ? cs.borderTopColor : null, sw: parseFloat(cs.borderTopWidth) * PT });
    };
    // 頁首：店名、頂點徽章、曲風
    const shop = card.querySelector('.shop');
    point(shop, shop.firstChild.textContent.trim(), 'left', shop.firstChild);
    const badge = card.querySelector('.apexbadge');
    if (badge) { box(badge, true, false); point(badge, badge.firstChild.textContent, 'left', badge.firstChild); const i = badge.querySelector('i'); point(i, i.textContent); }
    card.querySelectorAll('.g').forEach(g => { box(g, false, true); point(g, g.firstChild.textContent, 'left', g.firstChild); const i = g.querySelector('i'); point(i, i.textContent); });
    // 標題：藝人（點文字）、專輯名（區域文字，長名會折行）
    const artist = card.querySelector('.artist'); point(artist, artist.textContent);
    const h1 = card.querySelector('h1'), hr = h1.getBoundingClientRect();
    items.push({ k: 'area', s: h1.textContent, x: X(hr.left), y: Y(hr.top), b0: Y(baseline(h1, 'first')) - Y(hr.top), w: (c.right - c.left) * PT - X(hr.left) * 2, h: hr.height * PT, align: 'left', ...st(h1) });
    line(card.querySelector('.title'), 'Bottom');
    // 三軸
    const axes = card.querySelector('.axes');
    if (axes) {
      axes.querySelectorAll('.ax').forEach(ax => {
        const em = ax.querySelector('em'); point(em, em.textContent);
        const s = ax.querySelector('.st'), b = s.querySelector('b');
        const it = { k: 'point', s: s.textContent, x: X(s.getBoundingClientRect().left), y: Y(baseline(s)), align: 'left', ...st(s) };
        it.spans = [{ n: b ? b.textContent.length : 0, color: b ? getComputedStyle(b).color : it.color }];
        items.push(it);
      });
      line(axes, 'Bottom');
    }
    // 介紹：一個區域文字框，範圍＝HTML 裡內文可用的整塊空間（到頁尾線為止）
    const t = card.querySelector('.text'), tr = t.getBoundingClientRect();
    items.push({ k: 'area', s: t.textContent, x: X(tr.left), y: Y(tr.top), b0: Y(baseline(t, 'first')) - Y(tr.top), w: tr.width * PT, h: tr.height * PT, align: 'justify', ...st(t) });
    // 頁尾
    const foot = card.querySelector('footer'); line(foot, 'Top');
    const sub = card.querySelector('.sub'); if (sub.textContent.trim()) point(sub, sub.textContent);
    const price = card.querySelector('.price'); point(price, price.textContent, 'right');
    return { name: (card.querySelector('.artist').textContent + '｜' + h1.textContent).slice(0, 60), w: c.width * PT, h: c.height * PT, items };
  });
});
await browser.close();

// 數值收斂到 0.01pt，非 ASCII 全轉 \uXXXX（ExtendScript 讀檔編碼不一定是 UTF-8）
const r2 = v => typeof v === 'number' ? Math.round(v * 100) / 100 : v;
const data = JSON.stringify(cards, (k, v) => r2(v)).replace(/[\u007f-￿]/g, ch => '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0'));

const jsx = `// dip vinyl 店內介紹卡（${SIZE.toUpperCase()}）— Illustrator 指令碼，由 scripts/build-shop-print-ai.mjs 產生，請勿手改
// 檔案 → 指令碼 → 其他指令碼… 執行。會開一份新文件，一張卡一個工作區域，介紹文字是可編輯的區域文字框。
#target illustrator
(function () {
var CARDS = ${data};
// 字型：依序嘗試，第一個裝了的就用
var FONTS = {
  'serif-medium': ['NotoSerifTC-Medium', 'SourceHanSerifTC-Medium', 'SourceHanSerifTW-Medium', 'NotoSerifCJKtc-Medium'],
  'serif-bold': ['NotoSerifTC-Bold', 'SourceHanSerifTC-Bold', 'SourceHanSerifTW-Bold', 'NotoSerifCJKtc-Bold'],
  'serif-black': ['NotoSerifTC-Black', 'SourceHanSerifTC-Heavy', 'SourceHanSerifTW-Heavy', 'NotoSerifCJKtc-Black'],
  'sans-regular': ['NotoSansTC-Regular', 'SourceHanSansTC-Regular', 'SourceHanSansTW-Regular', 'NotoSansCJKtc-Regular'],
  'sans-medium': ['NotoSansTC-Medium', 'SourceHanSansTC-Medium', 'SourceHanSansTW-Medium', 'NotoSansCJKtc-Medium'],
  'mono-regular': ['IBMPlexMono', 'IBMPlexMono-Regular'],
  'mono-medium': ['IBMPlexMono-Medium']
};
var missing = {}, fontCache = {};
function getFont(key) {
  if (fontCache.hasOwnProperty(key)) return fontCache[key];
  var list = FONTS[key] || [], f = null;
  for (var i = 0; i < list.length && !f; i++) { try { f = app.textFonts.getByName(list[i]); } catch (e) { f = null; } }
  if (!f) missing[list[0]] = true;
  fontCache[key] = f; return f;
}
// rgb(r, g, b) → CMYK；接近黑的字一律 K100（小字印刷不套四色）
function color(css) {
  var m = /rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)/.exec(css || ''), c = new CMYKColor();
  if (!m) { c.black = 100; return c; }
  var r = m[1] / 255, g = m[2] / 255, b = m[3] / 255, k = 1 - Math.max(r, g, b);
  if (k > 0.85) { c.cyan = 0; c.magenta = 0; c.yellow = 0; c.black = 100; return c; }
  c.cyan = Math.round((1 - r - k) / (1 - k) * 100); c.magenta = Math.round((1 - g - k) / (1 - k) * 100);
  c.yellow = Math.round((1 - b - k) / (1 - k) * 100); c.black = Math.round(k * 100); return c;
}
function style(tf, it) {
  var a = tf.textRange.characterAttributes, f = getFont(it.font);
  if (f) a.textFont = f;
  a.size = it.size; a.fillColor = color(it.color); a.tracking = it.tracking || 0;
  a.autoLeading = false; a.leading = it.lead;
  var p = tf.textRange.paragraphAttributes;
  p.justification = it.align === 'right' ? Justification.RIGHT : it.align === 'justify' ? Justification.FULLJUSTIFYLASTLINELEFT : Justification.LEFT;
  try { p.kinsoku = '\\u5f37\\u3044'; } catch (e) { try { p.kinsoku = 'Hard'; } catch (e2) {} }  // 禁則：強
}

var SHEET = ${SHEET === 'a4' ? '{ w: 841.89, h: 595.28, cols: 4, rows: 2 }' : 'null'};   // A4 橫式 297×210mm
var first = CARDS[0], N = CARDS.length, PER = SHEET ? SHEET.cols * SHEET.rows : 1, PAGES = Math.ceil(N / PER);
var doc = SHEET
  ? app.documents.add(DocumentColorSpace.CMYK, SHEET.w, SHEET.h, PAGES, DocumentArtboardLayout.Column, 36, 1)
  : app.documents.add(DocumentColorSpace.CMYK, first.w, first.h, N, DocumentArtboardLayout.GridByRow, 24, Math.min(N, 8));
var overflow = [];
for (var n = 0; n < N; n++) {
  var cd = CARDS[n], ab = doc.artboards[Math.floor(n / PER)], R = ab.artboardRect, L = R[0], T = R[1];
  if (SHEET) {   // 整頁置中，第 n 張落在第 (n % 8) 格
    var slot = n % PER, col = slot % SHEET.cols, row = Math.floor(slot / SHEET.cols);
    L += (SHEET.w - SHEET.cols * cd.w) / 2 + col * cd.w; T -= (SHEET.h - SHEET.rows * cd.h) / 2 + row * cd.h;
    if (slot === 0) ab.name = 'A4 ' + (Math.floor(n / PER) + 1);
  } else ab.name = cd.name;
  var grp = doc.groupItems.add(); grp.name = cd.name;
  if (SHEET) {   // 裁切線：卡片外框，淺灰虛線
    var cut = grp.pathItems.rectangle(T, L, cd.w, cd.h);
    cut.filled = false; cut.stroked = true; cut.strokeWidth = 0.28; cut.strokeDashes = [2, 2]; cut.strokeColor = color('rgb(201, 195, 184)'); cut.name = 'cut';
  }
  for (var j = 0; j < cd.items.length; j++) {
    var it = cd.items[j], o;
    if (it.k === 'line') {
      o = grp.pathItems.add(); o.setEntirePath([[L + it.x1, T - it.y], [L + it.x2, T - it.y]]);
      o.filled = false; o.stroked = true; o.strokeWidth = it.sw; o.strokeColor = color(it.color);
    } else if (it.k === 'rect') {
      o = grp.pathItems.roundedRectangle(T - it.y, L + it.x, it.w, it.h, it.r, it.r);
      o.filled = !!it.fill; if (it.fill) o.fillColor = color(it.fill);
      o.stroked = !!it.stroke; if (it.stroke) { o.strokeColor = color(it.stroke); o.strokeWidth = it.sw; }
    } else if (it.k === 'point') {
      o = grp.textFrames.pointText([L + it.x, T - it.y]); o.contents = it.s; style(o, it);
      if (it.spans) {   // 三軸星號：實心星上色
        var chars = o.textRange.characters, k = 0;
        for (var q = 0; q < it.spans[0].n && q < chars.length; q++) chars[q].characterAttributes.fillColor = color(it.spans[0].color);
      }
    } else if (it.k === 'area') {
      // 區域文字：第一行基線固定在 HTML 量到的位置；框底多留半個字高，免得最後一行被判溢出
      var box = grp.pathItems.rectangle(T - it.y, L + it.x, it.w, it.h + it.size * 0.5);
      o = grp.textFrames.areaText(box); o.contents = it.s; style(o, it);
      try { o.firstBaseline = FirstBaselineType.FIXED; o.firstBaselineMin = it.b0; } catch (e) {}
      if (it.align === 'justify') {
        o.name = '\\u4ecb\\u7d39';   // 介紹
        var shown = 0; for (var li = 0; li < o.lines.length; li++) shown += o.lines[li].characters.length;
        if (shown < it.s.length) overflow.push(cd.name);
      }
    }
  }
}
var msg = '\\u5b8c\\u6210\\uff1a' + N + ' \\u5f35\\u5361\\u3002';   // 完成：N 張卡。
var miss = []; for (var m in missing) if (missing.hasOwnProperty(m)) miss.push(m);
if (miss.length) msg += '\\n\\n\\u7f3a\\u5b57\\u578b\\uff08\\u5df2\\u7528\\u9810\\u8a2d\\u5b57\\u578b\\u66ff\\u4ee3\\uff09\\uff1a\\n' + miss.join('\\n');   // 缺字型（已用預設字型替代）
if (overflow.length) msg += '\\n\\n\\u4ecb\\u7d39\\u6587\\u5b57\\u6ea2\\u51fa\\uff08\\u6846\\u5167\\u653e\\u4e0d\\u4e0b\\uff09\\uff1a\\n' + overflow.join('\\n');   // 介紹文字溢出（框內放不下）
alert(msg);
})();
`;
fs.writeFileSync(OUT, jsx);
console.log(`寫出 ${path.relative(R, OUT)}：${cards.length} 張${SHEET === 'a4' ? `，${Math.ceil(cards.length / 8)} 頁 A4` : ''}`);
