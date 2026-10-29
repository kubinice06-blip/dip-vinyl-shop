// 只讀：kv-dump.json 裡每個 spotifyUrl 打 Spotify oEmbed 取標題 → <WORK>/sp-oembed.json（每 200 筆寫回，可接續）
import fs from 'node:fs';
const WORK = process.argv[2] || '/tmp/claude-0/-home-user/f1503c39-7ef0-590a-82ba-a39436835848/scratchpad/link-audit';
const kv = JSON.parse(fs.readFileSync(`${WORK}/kv-dump.json`, 'utf8'));
const OUT = `${WORK}/sp-oembed.json`, done = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const items = Object.entries(kv).filter(([k, v]) => v.spotifyUrl && !(k in done) ).map(([k, v]) => [k, v.spotifyUrl]);
console.log('todo', items.length);
const sleep = ms => new Promise(r => setTimeout(r, ms));
let i = 0, n = 0;
async function worker() {
  while (i < items.length) {
    const [k, url] = items[i++];
    let rec = { url, title: null, status: 'error' };
    for (let a = 0; a < 5; a++) {
      try {
        const r = await fetch('https://open.spotify.com/oembed?url=' + encodeURIComponent(url), { signal: AbortSignal.timeout(15000) });
        if (r.ok) { const j = await r.json(); rec = { url, title: j.title, status: 200 }; break; }
        if (r.status === 404 || r.status === 400) { rec = { url, title: null, status: r.status }; if (a >= 1) break; }
        else rec = { url, title: null, status: r.status };
        await sleep(r.status === 429 ? 10000 * (a + 1) : 2000 * (a + 1));
      } catch (e) { rec = { url, title: null, status: 'error:' + e.message }; await sleep(2000 * (a + 1)); }
    }
    done[k] = rec;
    if (++n % 200 === 0) { fs.writeFileSync(OUT, JSON.stringify(done)); console.log(n); }
  }
}
await Promise.all([1, 2, 3, 4].map(worker));
fs.writeFileSync(OUT, JSON.stringify(done)); console.log('done', Object.keys(done).length);
