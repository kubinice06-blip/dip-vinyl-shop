#!/usr/bin/env node
// dip-pixel-import.js 的單元測試（純資料，不用瀏覽器）：
//   node scripts/pixel-import-test.mjs
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const I = require(path.join(ROOT, 'dip-pixel-import.js'));

let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if(cond) pass++; else { fail++; if(extra !== undefined) console.log('    ', extra); }
  console.log((cond ? '✓ ' : '✗ ') + name); };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// ── 造一張小像素圖（每格一個顏色字元），再放大 k 倍、加偏移、可選加雜訊
const PAL = { r:[220,40,40], g:[40,180,80], b:[40,80,220], w:[255,255,255], k:[16,16,16], '.':null };
function make(rows){
  const h = rows.length, w = rows[0].length, img = I.newImg(w, h);
  for(let y = 0; y < h; y++) for(let x = 0; x < w; x++){
    const c = PAL[rows[y][x]], o = (y*w + x)*4;
    if(!c){ img.data[o+3] = 0; continue; }
    img.data[o] = c[0]; img.data[o+1] = c[1]; img.data[o+2] = c[2]; img.data[o+3] = 255; }
  return img;
}
function upscale(img, k, ox = 0, oy = 0, pad = [255,255,255]){
  const w = img.width*k + ox, h = img.height*k + oy, out = I.newImg(w, h);
  for(let i = 0; i < w*h; i++){ const o = i*4; out.data[o] = pad[0]; out.data[o+1] = pad[1]; out.data[o+2] = pad[2]; out.data[o+3] = 255; }
  for(let y = 0; y < img.height*k; y++) for(let x = 0; x < img.width*k; x++){
    const si = (((y/k)|0)*img.width + ((x/k)|0))*4, di = ((y+oy)*w + (x+ox))*4;
    out.data[di] = img.data[si]; out.data[di+1] = img.data[si+1]; out.data[di+2] = img.data[si+2]; out.data[di+3] = img.data[si+3];
  }
  return out;
}
function noise(img, amt){ const out = I.cloneImg(img);
  let s = 12345; const rnd = () => (s = (s*1103515245 + 12345) & 0x7fffffff) / 0x7fffffff - .5;
  for(let i = 0; i < out.width*out.height; i++){ const o = i*4; if(out.data[o+3] < 128) continue;
    for(let c = 0; c < 3; c++) out.data[o+c] = Math.max(0, Math.min(255, out.data[o+c] + rnd()*amt)); }
  return out; }
// 相鄰欄與相鄰列都必須不同，否則圖的「真實週期」會是格寬的倍數（測試圖本身的陷阱）
const SRC = [
  'rgbkwrgb',
  'gbkwrgbk',
  'bkwrgbkw',
  'kwrgbkwr',
  'wrgbkwrg',
  'rgbkwrgb',
  'gbkwrgbk',
  'bkwrgbkw',
];

console.log('── 像素格偵測 ──');
for(const [k, ox, oy] of [[5,0,0], [4,3,1], [7,2,5], [3,0,2], [12,0,0]]){
  const big = upscale(make(SRC), k, ox, oy);
  const g = I.detectGrid(big);
  ok(`偵測 ${big.width}×${big.height}（真實格寬 ${k}、偏移 ${ox},${oy}）→ ${g.cell.x}×${g.cell.y} @${g.offset.x},${g.offset.y}`,
     g.cell.x === k && g.cell.y === k && g.offset.x === ox % k && g.offset.y === oy % k, g);
}
{
  const big = noise(upscale(make(SRC), 6, 2, 2), 26);
  const g = I.detectGrid(big);
  ok(`有雜訊也偵測得到（±13 色階）→ ${g.cell.x}×${g.cell.y} @${g.offset.x},${g.offset.y}`,
     g.cell.x === 6 && g.cell.y === 6 && g.offset.x === 2 && g.offset.y === 2, g);
}

console.log('\n── 還原成原尺寸 ──');
{
  const orig = make(SRC);
  const big = upscale(orig, 5, 0, 0);
  const g = I.detectGrid(big);
  const small = I.downsampleMode(big, g.cell, g.offset);
  ok('還原尺寸 8×8（不含外圍填白）', small.width === 8 && small.height === 8, `${small.width}×${small.height}`);
  let same = 0;
  for(let i = 0; i < 64; i++){ const o = i*4;
    if(Math.abs(small.data[o]-orig.data[o]) < 6 && Math.abs(small.data[o+1]-orig.data[o+1]) < 6 && Math.abs(small.data[o+2]-orig.data[o+2]) < 6) same++; }
  ok('還原後 64 格顏色全部一致', same === 64, same + '/64');
}
{
  // 有雜訊 + 偏移，眾數法仍應還原出同樣的 8×8
  const orig = make(SRC);
  const big = noise(upscale(orig, 6, 2, 2), 30);
  const g = I.detectGrid(big);
  const small = I.downsampleMode(big, g.cell, g.offset);
  let same = 0, n = 0;
  for(let y = 0; y < 8; y++) for(let x = 0; x < 8; x++){
    const so = ((y+1)*small.width + (x+1))*4;   // 偏移讓左上多補一格
    const oo = (y*8 + x)*4; n++;
    if(Math.abs(small.data[so]-orig.data[oo]) < 20 && Math.abs(small.data[so+1]-orig.data[oo+1]) < 20) same++; }
  ok('有雜訊時眾數還原仍正確', same === n, same + '/' + n);
}

console.log('\n── 面積平均縮圖 ──');
{
  const img = make(['rrrr','rrrr','bbbb','bbbb']);
  const s = I.areaAverage(img, 2, 2);
  ok('4×4 → 2×2 上紅下藍', s.width === 2 && s.height === 2 &&
     Math.abs(s.data[0]-220) < 2 && Math.abs(s.data[10]-220) < 2,
     [s.data[0], s.data[1], s.data[2], s.data[8], s.data[9], s.data[10]]);
  const mix = I.areaAverage(make(['rb','rb']), 1, 1);
  ok('面積平均會混色（紅＋藍 → 中間色）', Math.abs(mix.data[0]-130) < 8 && Math.abs(mix.data[2]-130) < 8,
     [mix.data[0], mix.data[1], mix.data[2]]);
}

console.log('\n── 抽色盤（中位切分）──');
{
  // 顏色本來就夠少 → 一個色都不失真地照抄
  const pal = I.medianCut(make(SRC), 5).map(I.hex6).sort();
  const want = ['#101010','#2850dc','#28b450','#dc2828','#ffffff'].sort();
  ok('5 色圖抽 5 色 → 原來那 5 色（照抄）', eq(pal, want), pal);
  ok('抽 8 色也只回 5 色（圖裡只有 5 色）', I.medianCut(make(SRC), 8).length === 5);
  ok('exactColors 超過上限回 null', I.exactColors(make(SRC), 3) === null);
}
{
  const pal = I.medianCut(make(SRC), 2);
  ok('同一張圖抽 2 色 → 剛好 2 色（走中位切分）', pal.length === 2, pal);
}
{
  // 真的需要中位切分的情況：連續漸層抽 4 色，應該由暗到亮分佈開
  const w = 64, h = 8, img = I.newImg(w, h);
  for(let y = 0; y < h; y++) for(let x = 0; x < w; x++){ const o = (y*w+x)*4;
    img.data[o] = img.data[o+1] = img.data[o+2] = Math.round(x/(w-1)*255); img.data[o+3] = 255; }
  const pal = I.medianCut(img, 4).map(c => I.hexRGB(c)[0]).sort((a,b)=>a-b);
  ok('灰階漸層抽 4 色 → 由暗到亮分開', pal.length === 4 && pal[0] < 60 && pal[3] > 195 &&
     pal[1] > pal[0] + 40 && pal[2] > pal[1] + 40, pal);
}
{
  const img = make(['....','....']);
  ok('整張透明 → 空色盤', I.medianCut(img, 8).length === 0);
}

console.log('\n── 量化 ──');
{
  const img = make(SRC);
  const pal = ['#dc2828','#28b450','#2850dc','#101010','#ffffff'];
  const idx = I.quantize(img, pal, { dither:'none' });
  const rows = I.idxToRows(idx, ['.','r','g','b','k','w']);
  ok('量化後每格都對到原本的顏色', I.countColors(idx) === 5 && rows[0] === SRC[0] && rows[7] === SRC[7],
     [rows[0], SRC[0], I.countColors(idx)]);
  ok('轉回 rows 字串形狀正確', rows.length === 8 && rows.every(r => r.length === 8));
}
{
  // 透明要保持透明
  const img = make(['r.r.','.r.r']);
  const idx = I.quantize(img, ['#dc2828'], {});
  ok('透明像素量化後仍是 0', idx.data[1] === 0 && idx.data[0] === 1);
}
{
  // 50% 灰在黑白色盤上用 Bayer → 約一半一半
  const w = 16, h = 16, img = I.newImg(w, h);
  for(let i = 0; i < w*h; i++){ const o = i*4; img.data[o] = img.data[o+1] = img.data[o+2] = 128; img.data[o+3] = 255; }
  const flat = I.quantize(img, ['#000000','#ffffff'], { dither:'none' });
  const dith = I.quantize(img, ['#000000','#ffffff'], { dither:'bayer4' });
  const white = a => { let n = 0; for(const v of a.data) if(v === 2) n++; return n; };
  ok('不網點時 50% 灰全部倒向同一色', white(flat) === 0 || white(flat) === w*h, white(flat));
  ok('Bayer 網點把 50% 灰打散成約一半', Math.abs(white(dith) - w*h/2) <= w*h*0.12, white(dith) + '/' + w*h);
}
{
  // 誤差擴散：漸層應該產生多種顏色而不是色帶
  const w = 32, h = 8, img = I.newImg(w, h);
  for(let y = 0; y < h; y++) for(let x = 0; x < w; x++){ const o = (y*w+x)*4;
    img.data[o] = img.data[o+1] = img.data[o+2] = Math.round(x/(w-1)*255); img.data[o+3] = 255; }
  const fs = I.quantize(img, ['#000000','#808080','#ffffff'], { dither:'floyd' });
  ok('Floyd–Steinberg 三色漸層用滿三色', I.countColors(fs) === 3, I.countColors(fs));
}

console.log('\n── 去背 ──');
{
  // 白底、白邊框、中間有個白色的「洞」→ 洞要留著（flood 只清連到邊界的）
  const img = make([
    'wwwwwwww',
    'wkkkkkkw',
    'wkwwwwkw',
    'wkwwwwkw',
    'wkkkkkkw',
    'wwwwwwww',
  ]);
  const out = I.removeBackground(img, { mode:'border', tolerance:10 });
  const alpha = (x, y) => out.data[(y*8 + x)*4 + 3];
  ok('邊框白色被清掉', alpha(0,0) === 0 && alpha(7,5) === 0);
  ok('框內的白洞保留', alpha(3,2) === 255 && alpha(4,3) === 255);
  ok('黑框本身保留', alpha(1,1) === 255);
}
{
  const img = make(['wwww','wrrw','wwww']);
  const out = I.removeBackground(img, { mode:'color', color:'#ffffff', tolerance:10 });
  ok('指定色去背清掉所有同色（不限相連）', out.data[3] === 0 && out.data[(1*4+1)*4+3] === 255);
}
{
  const img = make(['rrrr','rrrr']);
  img.data[3] = 0; img.data[7] = 0;
  const out = I.removeBackground(img, { mode:'alpha' });
  ok('alpha 模式保留原本的透明', out.data[3] === 0 && out.data[11] === 255);
}
{
  ok('邊框主色偵測', eq(I.borderDominantColor(make(['wwww','wrrw','wwww'])).map(Math.round), [255,255,255]));
}

console.log('\n── 清雜點 ──');
{
  const img = make(['rrrrr','rrbrr','rrrrr']);
  const idx = I.quantize(img, ['#dc2828','#2850dc'], {});
  ok('清之前中間有一顆藍', idx.data[1*5+2] === 2);
  const cleaned = I.despeckle(idx, 1);
  ok('孤立的一顆被換成鄰居色', cleaned.data[1*5+2] === 1);
  const big = I.despeckle(I.quantize(make(['rrrrr','rbbbr','rbbbr']), ['#dc2828','#2850dc'], {}), 1);
  ok('成片的區塊不會被清掉', big.data[1*5+2] === 2);
}

console.log('\n── 自動切件 ──');
{
  const img = make([
    'rr...gg.',
    'rr...gg.',
    '........',
    '..bbb...',
    '..bbb...',
  ]);
  const idx = I.quantize(img, ['#dc2828','#28b450','#2850dc'], {});
  const parts = I.sliceComponents(idx, { minArea: 3 });
  ok('切出 3 件', parts.length === 3, parts.map(p => `${p.width}×${p.height}@${p.x},${p.y}`));
  const blue = parts.find(p => p.x === 2 && p.y === 3);
  ok('藍色那件 3×2 @2,3', blue && blue.width === 3 && blue.height === 2 && blue.area === 6, blue);
  const red = parts.find(p => p.x === 0);
  ok('紅色那件 2×2 @0,0', red && red.width === 2 && red.height === 2);
  ok('依面積由大到小排序', parts[0].area >= parts[1].area && parts[1].area >= parts[2].area);
  ok('最小面積可以濾掉小件', I.sliceComponents(idx, { minArea: 5 }).length === 1);
  ok('gap 可以把分開的零件併起來', I.sliceComponents(idx, { minArea:3, gap:3 }).length < 3);
}
{
  // 切出來的子圖只含自己那一塊，別人的像素不能跟進來
  const img = make(['rr.gg', 'rr.gg']);
  const idx = I.quantize(img, ['#dc2828','#28b450'], {});
  const parts = I.sliceComponents(idx, { minArea:1 });
  ok('子圖不混到隔壁的像素', parts.length === 2 && parts.every(p => new Set([...p.data].filter(Boolean)).size === 1),
     parts.map(p => [...new Set([...p.data])]));
}

console.log('\n── 一次跑完 analyze ──');
{
  const big = upscale(make(SRC), 5, 0, 0);
  const r = I.analyze(big, { bg:{ mode:'none' }, mode:'grid', colors:5 });
  ok('analyze（格子模式）→ 8×8 / 5 色', r.idx.width === 8 && r.idx.height === 8 && r.palette.length === 5,
     `${r.idx.width}×${r.idx.height} ${r.palette.length}色`);
  const back = I.idxToRows(r.idx, ['.'].concat(r.palette.map(c => ({'#dc2828':'r','#28b450':'g','#2850dc':'b','#101010':'k','#ffffff':'w'})[I.hex6(c)] || '?')));
  ok('analyze 還原出來的圖與原圖一字不差', eq(back, SRC), back);
}
{
  const big = upscale(make(SRC), 5, 0, 0, [255,255,255]);
  const r = I.analyze(big, { bg:{ mode:'border', tolerance:10 }, mode:'scale', outW:8, outH:8, colors:4 });
  ok('analyze（縮放模式＋去背）→ 8×8', r.idx.width === 8 && r.idx.height === 8);
  ok('沿用指定色盤時不會多抽色', I.analyze(big, { bg:{mode:'none'}, mode:'scale', outW:8, outH:8,
      palette:['#000000','#ffffff'] }).palette.length === 2);
}

console.log(`\n${pass} 通過 / ${fail} 失敗`);
process.exit(fail ? 1 : 0);
