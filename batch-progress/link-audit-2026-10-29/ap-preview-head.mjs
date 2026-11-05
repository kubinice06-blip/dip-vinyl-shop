// 只讀：data/apple-audio-runtime-v1.json 每個 previewUrl 打 HEAD（失敗再以 Range GET 複驗），200/206 算活 → <WORK>/ap-head.json（每 200 筆寫回，可接續）
import fs from 'node:fs';
const WORK = process.argv[2] || '/tmp/claude-0/-home-user/f1503c39-7ef0-590a-82ba-a39436835848/scratchpad/link-audit';
const rt = JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/data/apple-audio-runtime-v1.json', 'utf8')).entries;
const OUT = `${WORK}/ap-head.json`, done = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const items = Object.entries(rt).filter(([k]) => !(k in done) || done[k] === 'error');
console.log('todo', items.length);
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function probe(url) {
  let last = 'error';
  for (let a = 0; a < 4; a++) {
    try {
      let r = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(15000) });
      if (r.status === 200 || r.status === 206) return r.status;
      r = await fetch(url, { headers: { Range: 'bytes=0-1023' }, signal: AbortSignal.timeout(15000) });
      try { await r.arrayBuffer(); } catch {}
      if (r.status === 200 || r.status === 206) return r.status;
      last = r.status; if (r.status === 404 || r.status === 403 || r.status === 410) { if (a >= 1) return last; }
    } catch (e) { last = 'error'; }
    await sleep(1500 * (a + 1));
  }
  return last;
}
let i = 0, n = 0;
async function worker() { while (i < items.length) { const [k, v] = items[i++]; done[k] = await probe(v[2]); if (++n % 200 === 0) { fs.writeFileSync(OUT, JSON.stringify(done)); console.log(n); } } }
await Promise.all(Array.from({ length: 8 }, worker));
fs.writeFileSync(OUT, JSON.stringify(done)); console.log('done', Object.keys(done).length);
