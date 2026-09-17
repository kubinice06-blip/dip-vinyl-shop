#!/usr/bin/env node
// dip-pixel-palette.js 的單元測試：node scripts/pixel-palette-test.mjs
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = require(path.join(ROOT, 'dip-pixel-palette.js'));

let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if(cond) pass++; else { fail++; if(extra !== undefined) console.log('     實際:', JSON.stringify(extra)); }
  console.log((cond ? '✓ ' : '✗ ') + name); };
const hsv = hx => { const [r,g,b] = P.hexRGB(hx); return P.rgbHsv(r,g,b); };

console.log('── 明暗階 ──');
{
  const r = P.shadeRamp('#c11628', 5);
  ok('階數對', r.length === 5, r);
  ok('全部是合法 hex', r.every(P.isHex), r);
  ok('由暗到亮單調遞增', r.every((c, i) => i === 0 || P.luma(c) > P.luma(r[i-1])), r.map(c => +P.luma(c).toFixed(3)));
  ok('中間那階就是原色（明度相符）', Math.abs(hsv(r[2])[2] - hsv('#c11628')[2]) < 0.02, [r[2], '#c11628']);
  // 紅色（h≈353）的暗部要往藍紫走、亮部要往黃走
  const h0 = hsv('#c11628')[0], hd = hsv(r[0])[0], hl = hsv(r[4])[0];
  ok('暗部往藍紫偏（色相往 260° 走）', Math.abs(P.hueDelta(hd, 260)) < Math.abs(P.hueDelta(h0, 260)), [h0, hd].map(v => +v.toFixed(1)));
  ok('亮部往黃偏（色相往 50° 走）', Math.abs(P.hueDelta(hl, 50)) < Math.abs(P.hueDelta(h0, 50)), [h0, hl].map(v => +v.toFixed(1)));
  ok('暗部彩度比原色高', hsv(r[0])[1] > hsv('#c11628')[1] - 1e-6, [hsv(r[0])[1], hsv('#c11628')[1]]);
  ok('亮部彩度比原色低', hsv(r[4])[1] < hsv('#c11628')[1], [hsv(r[4])[1], hsv('#c11628')[1]]);
}
{
  // 藍色是最容易做錯的：固定往同一個方向轉色相的話，暗部會跑到青色去
  const b = P.shadeRamp('#1f5fae', 5);
  const h0 = hsv('#1f5fae')[0], hd = hsv(b[0])[0];
  ok('藍色的暗部不會跑去青色', P.hueDelta(h0, hd) >= -1, [h0, hd].map(v => +v.toFixed(1)));
  ok('藍色暗部往紫走', hd >= h0 - 1, [h0, hd].map(v => +v.toFixed(1)));
}
{
  const g = P.shadeRamp('#808080', 5);
  ok('灰色不偏色（RGB 三通道相等）', g.every(c => { const [r,gg,b] = P.hexRGB(c); return r === gg && gg === b; }), g);
}
{
  ok('暖暗部模式（coolDark:false）往另一邊拉', (() => {
    const cool = P.shadeRamp('#2e7d52', 5, { coolDark:true })[0];
    const warm = P.shadeRamp('#2e7d52', 5, { coolDark:false })[0];
    return Math.abs(P.hueDelta(hsv(cool)[0], 260)) < Math.abs(P.hueDelta(hsv(warm)[0], 260));
  })());
  ok('階數夾在 2–32', P.shadeRamp('#123456', 99).length === 32 && P.shadeRamp('#123456', 1).length === 2);
  ok('hueShift 0 就不轉色相', (() => { const r = P.shadeRamp('#c11628', 5, { hueShift:0 });
    return r.every(c => Math.abs(P.hueDelta(hsv(c)[0], hsv('#c11628')[0])) < 2); })());
  const wide = P.shadeRamp('#c11628', 7, { range:1 }), narrow = P.shadeRamp('#c11628', 7, { range:0.2 });
  ok('range 越大兩端拉越開', (P.luma(wide[6]) - P.luma(wide[0])) > (P.luma(narrow[6]) - P.luma(narrow[0])));
}
{
  const r = P.blendRamp('#000000', '#ffffff', 5);
  ok('blendRamp 兩端就是給的兩色', r[0] === '#000000' && r[4] === '#ffffff', r);
  ok('blendRamp 中間是灰', r[2] === '#808080' || r[2] === '#7f7f7f', r[2]);
  const c = P.blendRamp('#ff0000', '#0000ff', 3);
  ok('blendRamp 走色相短邊（紅→藍中間是洋紅不是綠）', hsv(c[1])[0] > 270 || hsv(c[1])[0] < 330, [c, hsv(c[1])[0]]);
}

console.log('\n── 排序 ──');
{
  const list = ['#ffffff', '#000000', '#808080'];
  ok('依亮度排', JSON.stringify(P.sortOrder(list, 'luma')) === JSON.stringify([1,2,0]), P.sortOrder(list, 'luma'));
  const hues = ['#00ff00', '#ff0000', '#0000ff'];      // 綠120 紅0 藍240
  ok('依色相排', JSON.stringify(P.sortOrder(hues, 'hue')) === JSON.stringify([1,0,2]), P.sortOrder(hues, 'hue'));
  const mix = ['#ff0000', '#333333', '#00ff00', '#eeeeee'];
  ok('色相排序把無彩色集中在最前面、彩色在後', (() => {
    const o = P.sortOrder(mix, 'hue'); return o[0] === 1 && o[1] === 3 && o.slice(2).sort().join() === '0,2'; })(),
    P.sortOrder(mix, 'hue'));
  ok('依彩度排', JSON.stringify(P.sortOrder(['#ff0000','#888888','#ff8080'], 'sat')) === JSON.stringify([1,2,0]));
  ok('依用量排', JSON.stringify(P.sortOrder(['#a','#b','#c'].map((_,i)=>['#ff0000','#00ff00','#0000ff'][i]), 'count', [3, 90, 20])) === JSON.stringify([1,2,0]));
  ok('排序不改變元素、只換順序', (() => { const o = P.sortOrder(mix, 'luma'); return o.slice().sort().join() === '0,1,2,3'; })());
}

console.log('\n── 合併相近色 ──');
{
  const list = ['#ff0000', '#fe0101', '#00ff00', '#0000ff'];
  const m0 = P.mergeSimilar(list, 0);
  ok('門檻 0 一個都不合併', m0.palette.length === 4, m0.palette);
  const m = P.mergeSimilar(list, 10);
  ok('門檻拉起來就把幾乎一樣的兩個紅併掉', m.palette.length === 3, m.palette);
  ok('map 指到新色盤的位置', m.map[0] === m.map[1] && m.map[2] !== m.map[0], m.map);
  ok('留下的是原本就有的顏色，不是平均色', m.palette.every(c => list.includes(c)), m.palette);
  const mc = P.mergeSimilar(list, 10, [1, 50, 1, 1]);
  ok('有 counts 時留下出現最多的那個', mc.palette[0] === '#fe0101', mc.palette);
  const big = P.mergeSimilar(list, 100);
  ok('門檻 100 全部併成一色', big.palette.length === 1, big.palette);
}

console.log('\n── 色盤檔讀寫 ──');
const PAL = ['#111111', '#b8860b', '#c11628', '#1f5fae', '#ffffff'];
{
  const g = P.writeGPL(PAL, '測試');
  ok('GPL 有表頭', g.startsWith('GIMP Palette\nName: 測試'));
  ok('GPL round-trip', JSON.stringify(P.parseGPL(g)) === JSON.stringify(PAL), P.parseGPL(g));
  ok('GPL 吃 GIMP 原生的空白與註解', JSON.stringify(P.parseGPL(
    'GIMP Palette\nName: x\nColumns: 0\n#\n# 註解\n  0   0   0\tBlack\n255 255 255\tWhite\n')) === JSON.stringify(['#000000','#ffffff']));
  const h = P.writeHEX(PAL);
  ok('HEX 一行一色、沒有井字號', h.split('\n')[0] === '111111');
  ok('HEX round-trip', JSON.stringify(P.parseHEX(h)) === JSON.stringify(PAL), P.parseHEX(h));
  ok('HEX 也吃有井字號的寫法', JSON.stringify(P.parseHEX('#ff0000\n#00ff00\n')) === JSON.stringify(['#ff0000','#00ff00']));
  const j = P.writePAL(PAL);
  ok('JASC-PAL 表頭與色數', j.startsWith('JASC-PAL\r\n0100\r\n5\r\n'), j.slice(0, 20));
  ok('JASC-PAL round-trip', JSON.stringify(P.parsePAL(j)) === JSON.stringify(PAL), P.parsePAL(j));
  ok('不是 JASC-PAL 就回空陣列', P.parsePAL('0 0 0\n255 255 255').length === 0);
}
{
  ok('parseAny 認 .gpl', JSON.stringify(P.parseAny(P.writeGPL(PAL), 'x.gpl')) === JSON.stringify(PAL));
  ok('parseAny 認 .hex', JSON.stringify(P.parseAny(P.writeHEX(PAL), 'x.hex')) === JSON.stringify(PAL));
  ok('parseAny 認 .pal', JSON.stringify(P.parseAny(P.writePAL(PAL), 'x.pal')) === JSON.stringify(PAL));
  ok('副檔名不對也能靠內容認出來', JSON.stringify(P.parseAny(P.writeGPL(PAL), 'x.txt')) === JSON.stringify(PAL));
  ok('最後手段：從亂七八糟的文字裡撿 hex', JSON.stringify(P.parseAny('顏色一 #c11628 顏色二\n然後 #1f5fae 結束', 'x.txt')) === JSON.stringify(['#c11628','#1f5fae']));
  ok('parseAny 去重', JSON.stringify(P.parseAny('#ff0000\n#ff0000\n#00ff00\n', 'x.hex')) === JSON.stringify(['#ff0000','#00ff00']));
  ok('空檔案回空陣列', P.parseAny('', 'x.gpl').length === 0);
}
{
  ok('nearest 找最近色', P.nearest(PAL, '#c01527') === 2, P.nearest(PAL, '#c01527'));
  ok('nearest 空色盤回 -1', P.nearest([], '#000000') === -1);
  ok('dedupe 大小寫一致化', JSON.stringify(P.dedupe(['#FF0000', '#ff0000', '#0F0'])) === JSON.stringify(['#ff0000', '#00ff00']));
}

console.log(`\n${pass} 通過 / ${fail} 失敗`);
process.exit(fail ? 1 : 0);
