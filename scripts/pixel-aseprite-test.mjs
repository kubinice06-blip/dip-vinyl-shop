#!/usr/bin/env node
// dip-pixel-aseprite.js 的單元測試：node scripts/pixel-aseprite-test.mjs
//
// 這裡的 .aseprite 檔是**照規格自己組出來的**，不是 Aseprite 本人存出來的
// （雲端這台機器連不到 GitHub 以外的檔案，抓不到真的樣本）。
// 所以這組測試驗的是「我對規格的理解」與解析器一致，不是「跟 Aseprite 實際輸出一致」。
// 真檔案要等店主自己丟一個進繪圖器試——繪圖器會把 warnings 印出來。
import { createRequire } from 'node:module';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const A = require(path.join(ROOT, 'dip-pixel-aseprite.js'));

const inflate = async buf => new Uint8Array(zlib.inflateSync(Buffer.from(buf)));

let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if(cond) pass++; else { fail++; if(extra !== undefined) console.log('     實際:', JSON.stringify(extra)); }
  console.log((cond ? '✓ ' : '✗ ') + name); };

import { layerChunk, celChunk, linkedCelChunk, paletteChunk, oldPaletteChunk, tagsChunk, buildAse } from './lib/fake-aseprite.mjs';

// ══════════ 8 bit 索引色 ══════════
console.log('── 8 bit 索引色 ──');
{
  const PAL = ['#000000', '#c11628', '#1f5fae', '#ffffff'];   // 0 號是透明色
  // 4×3 的圖：中間一橫是 1，右下角是 2
  const px = [0,0,0,0,
              1,1,1,0,
              0,0,2,2];
  const file = buildAse({ w:4, h:3, depth:8, transparentIndex:0, frames:[
    { duration: 120, chunks: [paletteChunk(PAL), layerChunk('底'), celChunk(0, 0, 0, 4, 3, px)] },
  ]});
  const ase = await A.parseAseprite(file, inflate);
  ok('尺寸與格數', ase.width === 4 && ase.height === 3 && ase.nFrames === 1, [ase.width, ase.height, ase.nFrames]);
  ok('色彩深度 8', ase.colorDepth === 8);
  ok('圖層名讀得到', ase.layers.length === 1 && ase.layers[0].name === '底', ase.layers);
  ok('每格時間讀得到', ase.frames[0].duration === 120, ase.frames[0].duration);
  ok('色盤四色', ase.palette.length === 4 && ase.palette[1].hex === '#c11628', ase.palette);

  const ix = A.asepriteToIndexed(ase);
  ok('轉出來尺寸對', ix.w === 4 && ix.h === 3);
  ok('透明色編號沒被收進色盤', !ix.palette.includes('#000000'), ix.palette);
  ok('色盤照原檔順序（不是照用量）', JSON.stringify(ix.palette) === JSON.stringify(['#c11628','#1f5fae']), ix.palette);
  const cel = ix.layers[0].cels[0];
  ok('透明的地方是 0', cel[0] === 0 && cel[3] === 0 && cel[8] === 0);
  ok('紅色那一橫指到色盤第 1 色', cel[4] === 1 && cel[5] === 1 && cel[6] === 1, Array.from(cel));
  ok('藍色那兩格指到第 2 色', cel[10] === 2 && cel[11] === 2, Array.from(cel));
  ok('沒有警告', ix.warnings.length === 0, ix.warnings);
  ok('每格時間帶出來', JSON.stringify(ix.durations) === JSON.stringify([120]));
}

// ══════════ 壓縮的 cel、cel 偏移、多圖層、連結 cel ══════════
console.log('\n── 壓縮 cel / 偏移 / 多圖層 / 連結 cel ──');
{
  const PAL = ['#000000', '#ff0000', '#00ff00'];
  const solid = n => new Array(n).fill(1);
  const file = buildAse({ w:8, h:8, depth:8, frames:[
    { duration: 80, chunks: [
      paletteChunk(PAL),
      layerChunk('下'), layerChunk('上', { visible:false }),
      celChunk(0, 2, 3, 3, 2, solid(6), { compress:true }),          // 壓縮的 cel，偏移到 (2,3)
      celChunk(1, 0, 0, 2, 2, [2,2,2,2]),
    ] },
    { duration: 200, chunks: [ linkedCelChunk(0, 0) ] },             // 第二格連結到第一格
  ]});
  const ase = await A.parseAseprite(file, inflate);
  ok('兩格、兩圖層', ase.nFrames === 2 && ase.layers.length === 2);
  ok('第二個圖層是隱藏的', ase.layers[1].visible === false);
  const ix = A.asepriteToIndexed(ase);
  ok('壓縮的 cel 解得開', ix.layers[0].cels[0][3*8+2] === 1 && ix.layers[0].cels[0][3*8+4] === 1, Array.from(ix.layers[0].cels[0].slice(24, 32)));
  ok('cel 偏移有套用（左上角是空的）', ix.layers[0].cels[0][0] === 0);
  ok('偏移範圍外沒有被畫到', ix.layers[0].cels[0][3*8+5] === 0 && ix.layers[0].cels[0][5*8+2] === 0);
  ok('隱藏圖層仍然讀進來，只是 visible=false', ix.layers[1].visible === false && ix.layers[1].cels[0][0] === 2);
  ok('連結 cel 跟來源長得一樣', JSON.stringify(Array.from(ix.layers[0].cels[1])) === JSON.stringify(Array.from(ix.layers[0].cels[0])));
  ok('每格時間各自帶出來', JSON.stringify(ix.durations) === JSON.stringify([80, 200]), ix.durations);
}

// ══════════ 32 bit RGBA ══════════
console.log('\n── 32 bit RGBA ──');
{
  const rgba = [];
  const put = (r,g,b,a) => rgba.push(r,g,b,a);
  put(255,0,0,255); put(0,255,0,255);
  put(0,0,0,0);     put(0,0,255,120);     // 一格全透明、一格半透明
  const file = buildAse({ w:2, h:2, depth:32, frames:[
    { chunks: [layerChunk('rgba'), celChunk(0, 0, 0, 2, 2, rgba, { bpp:4 })] },
  ]});
  const ase = await A.parseAseprite(file, inflate);
  ok('深度 32', ase.colorDepth === 32);
  const ix = A.asepriteToIndexed(ase);
  ok('RGBA 抽出兩個不透明色', ix.palette.length === 2 && ix.palette.includes('#ff0000') && ix.palette.includes('#00ff00'), ix.palette);
  ok('全透明的格子是 0', ix.layers[0].cels[0][2] === 0);
  ok('alpha 低於一半的格子當成透明', ix.layers[0].cels[0][3] === 0, ix.layers[0].cels[0][3]);
  ok('色盤依用量排（各一格時照出現順序）', ix.palette[0] === '#ff0000', ix.palette);
}
{
  // 半透明但 alpha 夠高 → 當成不透明，並且要有警告
  const rgba = [255,0,0,200, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  const file = buildAse({ w:2, h:2, depth:32, frames:[{ chunks:[layerChunk('a'), celChunk(0,0,0,2,2,rgba)] }] });
  const ix = A.asepriteToIndexed(await A.parseAseprite(file, inflate));
  ok('alpha 200 當成不透明', ix.layers[0].cels[0][0] === 1);
  ok('有半透明就出警告', ix.warnings.some(w => /半透明/.test(w)), ix.warnings);
}

// ══════════ 16 bit 灰階 ══════════
console.log('\n── 16 bit 灰階 ──');
{
  const g = [0,255, 128,255, 200,0, 64,255];    // 值+alpha
  const file = buildAse({ w:2, h:2, depth:16, frames:[{ chunks:[layerChunk('灰'), celChunk(0,0,0,2,2,g)] }] });
  const ix = A.asepriteToIndexed(await A.parseAseprite(file, inflate));
  ok('灰階變成三個灰色', ix.palette.length === 3 && ix.palette.includes('#808080'), ix.palette);
  ok('alpha 0 的格子是透明', ix.layers[0].cels[0][2] === 0);
  ok('灰階值變成等值的 RGB', ix.palette.includes('#000000') && ix.palette.includes('#404040'), ix.palette);
}

// ══════════ 標籤、舊色盤、群組圖層、警告 ══════════
console.log('\n── 標籤 / 舊色盤 / 群組 / 警告 ──');
{
  const file = buildAse({ w:2, h:2, depth:8, frames:[
    { chunks: [oldPaletteChunk(['#000000','#123456']), tagsChunk([{ name:'走路', from:0, to:1 }, { name:'待機', from:2, to:2, dir:2 }]),
      layerChunk('底'), celChunk(0,0,0,2,2,[0,1,1,0])] },
    { chunks: [] }, { chunks: [] },
  ]});
  const ase = await A.parseAseprite(file, inflate);
  ok('動畫標籤讀得到', ase.tags.length === 2 && ase.tags[0].name === '走路' && ase.tags[1].to === 2, ase.tags);
  ok('舊色盤區塊也吃', ase.palette[1].hex === '#123456', ase.palette.slice(0,2));
  const ix = A.asepriteToIndexed(ase);
  ok('標籤帶進轉換結果', ix.tags.length === 2 && ix.tags[0].from === 0 && ix.tags[0].to === 1, ix.tags);
  ok('三格都有（沒有 cel 的格是空的）', ix.layers[0].cels.length === 3 && ix.layers[0].cels[2].every(v => v === 0));
}
{
  const file = buildAse({ w:2, h:2, depth:8, frames:[
    { chunks: [paletteChunk(['#000000','#ff0000']),
      layerChunk('群組', { type:1 }), layerChunk('裡面'),
      layerChunk('半透明', { opacity:128 }), layerChunk('相乘', { blend:3 }),
      celChunk(1,0,0,2,2,[1,1,1,1])] },
  ]});
  const ase = await A.parseAseprite(file, inflate);
  ok('群組圖層被跳過、不佔圖層位置', (() => { const ix = A.asepriteToIndexed(ase);
    return ix.layers.length === 3 && ix.layers[0].name === '裡面'; })(),
    A.asepriteToIndexed(ase).layers.map(l => l.name));
  ok('跳過群組之後 cel 還是對到正確的圖層', A.asepriteToIndexed(ase).layers[0].cels[0][0] === 1);
  ok('不透明度不是 255 會出警告', ase.warnings.some(w => /不透明度/.test(w)), ase.warnings);
  ok('混合模式會出警告', ase.warnings.some(w => /混合模式/.test(w)), ase.warnings);
}
{
  // 顏色超過上限 → 少用的對應到最接近的
  const px = [], PAL = ['#000000'];
  for(let i = 1; i <= 9; i++) PAL.push('#' + (i*17).toString(16).padStart(2,'0').repeat(3));
  for(let i = 0; i < 16; i++) px.push(i < 9 ? (i % 9) + 1 : 1);   // 1 號用最多
  const file = buildAse({ w:4, h:4, depth:8, frames:[{ chunks:[paletteChunk(PAL), layerChunk('多色'), celChunk(0,0,0,4,4,px)] }] });
  const ix = A.asepriteToIndexed(await A.parseAseprite(file, inflate), { maxColors: 4 });
  ok('色盤壓到上限', ix.palette.length === 4, ix.palette);
  ok('超量會出警告', ix.warnings.some(w => /超過上限/.test(w)), ix.warnings);
  ok('被砍掉的顏色對應到最接近的（不是變透明）', Array.from(ix.layers[0].cels[0]).every(v => v > 0), Array.from(ix.layers[0].cels[0]));
}

// ══════════ 壞檔案 ══════════
console.log('\n── 壞檔案 ──');
{
  let msg = '';
  try { await A.parseAseprite(new Uint8Array(200), inflate); } catch(e){ msg = e.message; }
  ok('魔數不對就直接報錯', /魔數/.test(msg), msg);
  msg = '';
  try { await A.parseAseprite(new Uint8Array(10), inflate); } catch(e){ msg = e.message; }
  ok('檔案太小也報錯', /太小/.test(msg), msg);
  msg = '';
  const bad = buildAse({ w:2, h:2, depth:8, frames:[{ chunks:[] }] });
  bad[12] = 7; bad[13] = 0;           // 色彩深度改成 7
  try { await A.parseAseprite(bad, inflate); } catch(e){ msg = e.message; }
  ok('看不懂的色彩深度報錯', /色彩深度/.test(msg), msg);
}

console.log(`\n${pass} 通過 / ${fail} 失敗`);
process.exit(fail ? 1 : 0);
