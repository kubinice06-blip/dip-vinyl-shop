// 只有 desc4 的卡：worker 讀 CURATED_DESCS 在 desc4 前面，確認前台實際供的是哪份（鍵存在，不會觸發生成）。
import fs from 'node:fs';
const f = 'batch-progress/apex-desc-20261104/worklist.json'; const w = JSON.parse(fs.readFileSync(f));
for (const c of w.filter(c => !c.has2 && c.has4)) {
  const r = await fetch(`https://dip-vinyl-worker.kubinice06.workers.dev/album-desc?artist=${encodeURIComponent(c.artist)}&album=${encodeURIComponent(c.album)}`, { headers: { 'User-Agent': 'dip-vinyl-shop/1.0 (+https://dipvinyl.tw)' } });
  const j = await r.json(); const xc = r.headers.get('x-cache');
  if (j.desc !== c.desc) { console.log('差異', c.key, xc); c.desc = j.desc; c.src = 'curated'; }
}
fs.writeFileSync(f, JSON.stringify(w, null, 1));
