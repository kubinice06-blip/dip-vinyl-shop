#!/usr/bin/env node
// dip-pixel-font.js 的單元測試：node scripts/pixel-font-test.mjs
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const F = require(path.join(ROOT, 'dip-pixel-font.js'));

let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if(cond) pass++; else { fail++; if(extra !== undefined) console.log('     實際:', extra); }
  console.log((cond ? '✓ ' : '✗ ') + name); };
const art = r => { let s = ''; for(let y = 0; y < r.height; y++){ let l = '';
  for(let x = 0; x < r.width; x++) l += r.data[y*r.width+x] ? '#' : '.'; s += l + '\n'; } return s; };

console.log('── 字型資料 ──');
const f57 = F.FONTS['5x7'], f35 = F.FONTS['3x5'];
ok('5×7 有 95 個字（ASCII 32–126 全套）', Object.keys(f57.g).length === 95, Object.keys(f57.g).length);
ok('3×5 有 50 個字', Object.keys(f35.g).length === 50, Object.keys(f35.g).length);
ok('5×7 每個字都是 35 個像素', Object.values(f57.g).every(v => v.length === 35));
ok('3×5 每個字都是 15 個像素', Object.values(f35.g).every(v => v.length === 15));
ok('字形只用 # 與 .', Object.values(f57.g).concat(Object.values(f35.g)).every(v => /^[#.]+$/.test(v)));
for(const need of ['A','Z','a','z','0','9',' ','?','!','.',',','-','#','@'])
  ok(`5×7 有「${need}」`, !!f57.g[need]);
ok('空白是全空的', /^\.+$/.test(f57.g[' ']));
ok('每個非空白字都有像素', Object.entries(f57.g).every(([k, v]) => k === ' ' || v.includes('#')));

console.log('\n── 量測 ──');
{
  const m = F.measureText('A', '5x7');
  ok('單字 5×7', m.w === 5 && m.h === 7, `${m.w}×${m.h}`);
  const m3 = F.measureText('ABC', '5x7');
  ok('三個字含字距 1 → 17×7', m3.w === 17 && m3.h === 7, `${m3.w}×${m3.h}`);
  const m2 = F.measureText('AB\nC', '5x7');
  ok('兩行含行距 1 → 11×15', m2.w === 11 && m2.h === 15, `${m2.w}×${m2.h}`);
  const m0 = F.measureText('', '5x7');
  ok('空字串 → 0 寬', m0.w === 0);
  const ms = F.measureText('AB', '5x7', { letterSpacing: 3 });
  ok('字距可調（3 → 13 寬）', ms.w === 13, ms.w);
  ok('3×5 單字 3×5', F.measureText('A', '3x5').w === 3 && F.measureText('A', '3x5').h === 5);
}

console.log('\n── 描繪 ──');
{
  const r = F.renderText('A', '5x7');
  ok('renderText 尺寸對得上 measureText', r.width === 5 && r.height === 7);
  const a = art(r);
  ok('A 的頂點在中間、中間有橫槓', a.split('\n')[0] === '..#..' && a.split('\n')[4] === '#####', JSON.stringify(a.split('\n').slice(0,5)));
  ok('A 的最後一列兩側是直桿', a.split('\n')[6] === '#...#');
}
{
  // 下伸字：g 的尾巴要落在最後兩列
  const g = art(F.renderText('g', '5x7')).split('\n');
  ok('小寫 g 有下伸（最後兩列有像素）', g[5].includes('#') && g[6].includes('#'), JSON.stringify(g));
  // x 高度字：o 的前兩列應該是空的
  const o = art(F.renderText('o', '5x7')).split('\n');
  ok('小寫 o 從第 3 列才開始', o[0] === '.....' && o[1] === '.....' && o[2].includes('#'), JSON.stringify(o));
}
{
  const r = F.renderText('AB', '5x7');
  ok('兩個字中間留 1 px 字距（第 6 欄全空）', [0,1,2,3,4,5,6].every(y => !r.data[y*r.width + 5]));
}
{
  const r = F.renderText('A\nB', '5x7');
  ok('兩行中間留 1 px 行距（第 8 列全空）', [0,1,2,3,4].every(x => !r.data[7*r.width + x]));
}
{
  const left = F.renderText('AB\nC', '5x7', { align:'left' });
  const right = F.renderText('AB\nC', '5x7', { align:'right' });
  const center = F.renderText('AB\nC', '5x7', { align:'center' });
  const firstColOfRow = (r, y) => { for(let x = 0; x < r.width; x++) if(r.data[y*r.width+x]) return x; return -1; };
  ok('靠左：第二行從 0 開始', firstColOfRow(left, 8) <= 2, firstColOfRow(left, 8));
  ok('靠右：第二行往右推', firstColOfRow(right, 8) >= 6, firstColOfRow(right, 8));
  ok('置中：介於兩者之間', firstColOfRow(center, 8) > firstColOfRow(left, 8) && firstColOfRow(center, 8) < firstColOfRow(right, 8),
     [firstColOfRow(left,8), firstColOfRow(center,8), firstColOfRow(right,8)]);
}
{
  const r = F.renderText('中', '5x7');
  ok('沒有的字用 ? 代替（不會爆）', r.width === 5 && r.height === 7 && [...r.data].some(Boolean));
}
ok('fontNames 列出兩套', JSON.stringify(F.fontNames()) === JSON.stringify(['5x7','3x5']), F.fontNames());

console.log(`\n${pass} 通過 / ${fail} 失敗`);
process.exit(fail ? 1 : 0);
