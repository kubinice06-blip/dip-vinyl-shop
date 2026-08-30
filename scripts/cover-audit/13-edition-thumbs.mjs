// 封面「版本」稽核 步驟 13：把覆核要用的 250px 縮圖抓到本機。
//
// 為什麼要這一步：CAA 的縮圖實測只有 2.7 張／秒（8 條併發、平均 20KB，瓶頸在 archive.org
// 的單次延遲）。接觸表一頁 100 張卡就有五百多張圖，直接連 CAA 要等好幾分鐘才填滿，
// 翻頁又要重等。先抓到本機後由 localhost 供圖，翻頁就是瞬間。
//
// 約 5,000 張、97MB、31 分鐘。可續跑：已存在的檔會跳過。
// 產出目錄已列入 .gitignore——repo 根目錄會被 Cloudflare Pages 部署，不可提交。
//
// 用法：node scripts/cover-audit/13-edition-thumbs.mjs [--conc 8]
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA = path.join(ROOT, 'scripts', 'cover-audit', 'data');
const DEST = path.join(ROOT, 'cover-edition-thumbs');
const argv = process.argv.slice(2);
const ci = argv.indexOf('--conc');
const CONC = ci >= 0 ? Number(argv[ci + 1]) : 8;

fs.mkdirSync(DEST, { recursive: true });
const buckets = JSON.parse(fs.readFileSync(path.join(DATA, 'edition-review.json'), 'utf8'));

const ids = new Set();
for (const r of buckets.review) {
  ids.add(r.served.id);
  for (const a of r.alternatives.slice(0, 6)) ids.add(a.id);
}
const todo = [...ids].filter(id => !fs.existsSync(path.join(DEST, `${id}.jpg`)));
console.log(`需要 ${ids.size} 張，已有 ${ids.size - todo.length}，本次抓 ${todo.length}（併發 ${CONC}）`);

let cur = 0, ok = 0, miss = 0, err = 0, bytes = 0;
const t0 = Date.now();
async function worker() {
  while (cur < todo.length) {
    const id = todo[cur++];
    let saved = false;
    for (let i = 0; i < 3 && !saved; i++) {
      try {
        const r = await fetch(`https://coverartarchive.org/release/${id}/front-250`, { redirect: 'follow', signal: AbortSignal.timeout(30000) });
        if (r.status === 404) { miss++; saved = true; break; }
        if (r.ok) {
          const b = Buffer.from(await r.arrayBuffer());
          fs.writeFileSync(path.join(DEST, `${id}.jpg`), b);
          bytes += b.length; ok++; saved = true; break;
        }
      } catch { /* 逾時重試 */ }
      await new Promise(s => setTimeout(s, 1500 * (i + 1)));
    }
    if (!saved) err++;
    const done = ok + miss + err;
    if (done % 100 === 0) {
      const s = (Date.now() - t0) / 1000;
      const rate = done / s;
      console.log(`  ${done}/${todo.length}｜成功 ${ok} 無圖 ${miss} 失敗 ${err}｜${rate.toFixed(1)} 張/秒｜約剩 ${Math.round((todo.length - done) / Math.max(rate, .01) / 60)} 分鐘`);
    }
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
console.log(`完成｜成功 ${ok}、無圖 ${miss}、失敗 ${err}｜共 ${(bytes / 1024 / 1024).toFixed(0)}MB → ${DEST}`);
console.log('接著重跑 步驟 12 產接觸表，圖會改由本機供應。');
