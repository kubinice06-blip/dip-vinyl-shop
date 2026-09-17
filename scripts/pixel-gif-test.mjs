#!/usr/bin/env node
// dip-pixel-gif.js 的單元測試：node scripts/pixel-gif-test.mjs
//
// 自己編自己解只能證明「前後一致」，不能證明「別人讀得懂」。
// 真正的驗證在 Playwright 那組：把產出的 GIF 丟給 Chromium 的解碼器畫出來再比對像素。
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const G = require(path.join(ROOT, 'dip-pixel-gif.js'));

let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if(cond) pass++; else { fail++; if(extra !== undefined) console.log('     實際:', JSON.stringify(extra)); }
  console.log((cond ? '✓ ' : '✗ ') + name); };
const str = (b, i, n) => Array.from(b.slice(i, i+n)).map(c => String.fromCharCode(c)).join('');

console.log('── 檔案結構 ──');
{
  const data = new Uint8Array(4*3); data.fill(1); data[0] = 0; data[11] = 2;
  const gif = G.encodeGIF({ width:4, height:3, palette:['#c11628','#1f5fae'], frames:[{ data, delay:100 }] });
  ok('開頭是 GIF89a', str(gif, 0, 6) === 'GIF89a', str(gif, 0, 6));
  ok('邏輯螢幕尺寸寫對（小端序）', gif[6] === 4 && gif[7] === 0 && gif[8] === 3 && gif[9] === 0, Array.from(gif.slice(6,10)));
  ok('有全域色表', !!(gif[10] & 0x80));
  ok('色表大小是 4（2 色＋透明→補成 2 的次方）', (1 << ((gif[10] & 7) + 1)) === 4, 1 << ((gif[10] & 7) + 1));
  ok('第 0 格是透明佔位色（洋紅）', gif[13] === 0xff && gif[14] === 0x00 && gif[15] === 0xff, Array.from(gif.slice(13,16)));
  ok('第 1 格是色盤第一色', gif[16] === 0xc1 && gif[17] === 0x16 && gif[18] === 0x28, Array.from(gif.slice(16,19)));
  ok('結尾是 0x3b', gif[gif.length-1] === 0x3b);
  const s = Array.from(gif).map(c => String.fromCharCode(c)).join('');
  ok('有 NETSCAPE2.0 循環擴充', s.includes('NETSCAPE2.0'));
  ok('有圖形控制擴充（0x21 0xf9）', s.includes('\x21\xf9\x04'));
  ok('透明色編號是 0、而且有開透明旗標', (() => {
    const i = s.indexOf('\x21\xf9\x04'); return (gif[i+3] & 1) === 1 && gif[i+6] === 0; })());
  ok('處置方式是 2（下一格前還原成背景）', (() => {
    const i = s.indexOf('\x21\xf9\x04'); return ((gif[i+3] >> 2) & 7) === 2; })());
}

console.log('\n── 編碼／解碼一致 ──');
{
  const data = new Uint8Array([0,1,1,2, 2,2,1,0, 0,0,0,1, 2,1,2,1]);
  const gif = G.encodeGIF({ width:4, height:4, palette:['#ff0000','#00ff00'], frames:[{ data, delay:100 }] });
  const back = G.decodeGIF(gif);
  ok('解回來尺寸對', back.width === 4 && back.height === 4);
  ok('解回來一格', back.frames.length === 1);
  ok('像素一個都沒錯', JSON.stringify(Array.from(back.frames[0].data)) === JSON.stringify(Array.from(data)),
    Array.from(back.frames[0].data));
  ok('色表讀得回來', back.palette[1] === '#ff0000' && back.palette[2] === '#00ff00', back.palette.slice(0,3));
  ok('透明色編號 0', back.frames[0].transparent === 0);
}
{
  // 大圖 ＋ 高亂度：逼字典長到 12 bit 再重設，這段最容易寫錯
  const n = 96*96, data = new Uint8Array(n);
  let seed = 12345;
  for(let i = 0; i < n; i++){ seed = (seed * 1103515245 + 12345) & 0x7fffffff; data[i] = seed % 200; }
  const palette = []; for(let i = 0; i < 199; i++) palette.push('#' + i.toString(16).padStart(2,'0').repeat(3));
  const gif = G.encodeGIF({ width:96, height:96, palette, frames:[{ data, delay:50 }] });
  const back = G.decodeGIF(gif);
  ok('高亂度大圖：色表 256 格', back.palette.length === 256, back.palette.length);
  ok('高亂度大圖：9216 個像素一個都沒錯', (() => {
    for(let i = 0; i < n; i++) if(back.frames[0].data[i] !== data[i]) return false; return true; })());
  ok('確實用到了字典重設（檔案不會小得離譜）', gif.length > n * 0.8, gif.length);
}
{
  // 反過來：整張同一色，LZW 應該壓得非常小
  const data = new Uint8Array(64*64); data.fill(3);
  const gif = G.encodeGIF({ width:64, height:64, palette:['#111','#222','#333'], frames:[{ data }] });
  const back = G.decodeGIF(gif);
  ok('整張同色也解得對', Array.from(back.frames[0].data).every(v => v === 3));
  ok('整張同色壓得很小（不到 300 位元組）', gif.length < 300, gif.length);
}

console.log('\n── 多格動畫 ──');
{
  const f = v => { const d = new Uint8Array(9); d.fill(v); return d; };
  const gif = G.encodeGIF({ width:3, height:3, palette:['#ff0000','#00ff00','#0000ff'],
    frames:[{ data:f(1), delay:100 }, { data:f(2), delay:250 }, { data:f(3), delay:5 }] });
  const back = G.decodeGIF(gif);
  ok('三格都在', back.frames.length === 3);
  ok('每格內容各自正確', back.frames.every((fr, i) => Array.from(fr.data).every(v => v === i+1)));
  ok('延遲換算成 1/100 秒（100ms → 10）', back.frames[0].delay === 100, back.frames[0].delay);
  ok('250ms → 25', back.frames[1].delay === 250, back.frames[1].delay);
  ok('太短的延遲夾到 20ms（瀏覽器會把 0/1 當成跑最快）', back.frames[2].delay === 20, back.frames[2].delay);
  ok('40ms 不會被夾（只有低於 20ms 才夾）', G.decodeGIF(G.encodeGIF({ width:1, height:1, palette:['#fff'],
    frames:[{ data:new Uint8Array([1]), delay:40 }] })).frames[0].delay === 40);
}

console.log('\n── 邊界與錯誤 ──');
{
  const one = G.encodeGIF({ width:1, height:1, palette:['#ffffff'], frames:[{ data:new Uint8Array([1]) }] });
  ok('1×1 也編得出來、解得回來', G.decodeGIF(one).frames[0].data[0] === 1);
  ok('只有一色時色表補到 2 格', (1 << ((one[10] & 7) + 1)) === 2, 1 << ((one[10] & 7) + 1));
  const allClear = G.encodeGIF({ width:2, height:2, palette:['#ffffff'], frames:[{ data:new Uint8Array(4) }] });
  ok('整張透明也是合法的 GIF', Array.from(G.decodeGIF(allClear).frames[0].data).every(v => v === 0));

  const boom = (fn, re, name) => { let m = ''; try { fn(); } catch(e){ m = e.message; } ok(name, re.test(m), m); };
  boom(() => G.encodeGIF({ width:0, height:4, palette:['#fff'], frames:[{ data:new Uint8Array(0) }] }), /尺寸/, '尺寸 0 報錯');
  boom(() => G.encodeGIF({ width:2, height:2, palette:['#fff'], frames:[] }), /一格/, '沒有格報錯');
  boom(() => G.encodeGIF({ width:2, height:2, palette:['#fff'], frames:[{ data:new Uint8Array(3) }] }), /大小/, '格的大小對不上報錯');
  boom(() => G.encodeGIF({ width:2, height:2, palette:new Array(300).fill('#fff'), frames:[{ data:new Uint8Array(4) }] }),
    /256/, '超過 256 色報錯');
  boom(() => G.decodeGIF(new Uint8Array([1,2,3,4,5,6,7,8])), /不是 GIF/, '不是 GIF 就報錯');
}

console.log(`\n${pass} 通過 / ${fail} 失敗`);
process.exit(fail ? 1 : 0);
