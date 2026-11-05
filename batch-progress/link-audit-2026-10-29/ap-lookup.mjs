// 只讀：runtime 每個 collectionId 依 storefront 分組，iTunes Lookup 一次 150 個 → <WORK>/ap-lookup.json {storefront:id → {artistName, collectionName, artistSlug, albumSlug, trackCount} | null(查無)}
import fs from 'node:fs';
const WORK = process.argv[2] || '/tmp/claude-0/-home-user/f1503c39-7ef0-590a-82ba-a39436835848/scratchpad/link-audit';
const rt = JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/data/apple-audio-runtime-v1.json', 'utf8')).entries;
const OUT = `${WORK}/ap-lookup.json`, done = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const by = {};
for (const v of Object.values(rt)) { const id = `${v[0]}:${v[1]}`; if (id in done) continue; (by[v[0]] ||= new Set()).add(v[1]); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const slug = (u, seg) => { const m = (u || '').match(new RegExp(`/${seg}/([^/]+)/\\d+`)); return m ? decodeURIComponent(m[1]) : null; };
let n = 0;
for (const [sf, set] of Object.entries(by)) {
  const ids = [...set];
  for (let i = 0; i < ids.length; i += 150) {
    const chunk = ids.slice(i, i + 150); let j = null;
    for (let a = 0; a < 6 && !j; a++) {
      try { const r = await fetch(`https://itunes.apple.com/lookup?id=${chunk.join(',')}&country=${sf}&entity=album`, { signal: AbortSignal.timeout(30000) });
        if (r.ok) j = await r.json(); else { console.log('HTTP', r.status, sf); await sleep(r.status === 429 || r.status === 403 ? 60000 : 5000); } }
      catch (e) { console.log('ERR', e.message); await sleep(5000); }
    }
    if (!j) { console.log('give up chunk', sf, i); continue; }
    const got = {};
    for (const x of j.results || []) if (x.wrapperType === 'collection') got[String(x.collectionId)] = { artistName: x.artistName, collectionName: x.collectionName, artistSlug: slug(x.artistViewUrl, 'artist'), albumSlug: slug(x.collectionViewUrl, 'album'), trackCount: x.trackCount, releaseDate: x.releaseDate };
    for (const id of chunk) done[`${sf}:${id}`] = got[id] || null;
    n += chunk.length; fs.writeFileSync(OUT, JSON.stringify(done)); console.log(sf, n);
    await sleep(3500);
  }
}
fs.writeFileSync(OUT, JSON.stringify(done)); console.log('done', Object.keys(done).length);
