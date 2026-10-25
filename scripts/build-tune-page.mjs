// 頻率光譜的獨立網址 /tune/（2026-10-25 店主：「希望頻率光譜是一個獨立頁面，而不是分頁前有井字號的暫時分頁」）。
// 部署時由 scripts/pages-build.sh 呼叫：拿 dist/index.html 複製一份成 dist/tune/index.html，
//   ・加 <base href="/">：頁面在 /tune/ 底下，所有相對路徑（data/…、tune/…、dip-tune.js）照樣指回網站根目錄；
//   ・標題、分享預覽（og:*）、主畫面名稱、manifest 換成頻率光譜的；
// 開機路由讀 pathname（tune）直接進頻率光譜，setActiveTab 在頻率光譜時把網址寫成 /tune/（不帶 #）。
// repo 裡的 tune/index.html 是本機開發用的轉址頁（→ /#tune），正式站會被這支的輸出蓋掉。
//   用法：node scripts/build-tune-page.mjs dist/index.html dist/tune/index.html
import fs from 'node:fs';
const [src, out] = process.argv.slice(2);
let h = fs.readFileSync(src, 'utf8');
const swap = (from, to) => { if (!h.includes(from)) throw new Error('index.html 找不到：' + from); h = h.replace(from, to); };
swap('<meta charset="UTF-8"/>', '<meta charset="UTF-8"/>\n  <base href="/">');
swap('<title>dip vinyl shop</title>', [
  '<title>頻率光譜 — dip vinyl shop</title>',
  '  <meta name="description" content="不分類型，以光譜的方式探索音樂。">',
  '  <meta property="og:title" content="頻率光譜">',
  '  <meta property="og:description" content="不分類型，以光譜的方式探索音樂。">',
  '  <meta property="og:url" content="https://dipvinyl.tw/tune/">',
  '  <meta property="og:type" content="website">',
  '  <meta property="og:image" content="https://dipvinyl.tw/og-tune.png">',
  '  <meta name="twitter:card" content="summary_large_image">',
  '  <meta name="twitter:image" content="https://dipvinyl.tw/og-tune.png">',
  '  <link rel="canonical" href="https://dipvinyl.tw/tune/">',
].join('\n'));
swap('<link rel="manifest" href="/manifest.json">', '<link rel="manifest" href="/manifest-tune.json">');
swap('<meta name="apple-mobile-web-app-title" content="dip 選歌">', '<meta name="apple-mobile-web-app-title" content="頻率光譜">');
fs.mkdirSync(out.replace(/\/[^/]+$/, ''), { recursive: true });
fs.writeFileSync(out, h);
console.log('✓ 頻率光譜獨立頁', out, h.length, 'bytes');
