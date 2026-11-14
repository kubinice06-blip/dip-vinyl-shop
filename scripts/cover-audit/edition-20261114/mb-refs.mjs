// MB 參考圖：每張卡找 release-group（catalog 有 rgMbid 就直接用，沒有就 MB 搜尋），參考圖＝CAA release-group front-250。
// 用法：node mb-refs.mjs <items.json>（items-dsp.json 格式；從尾端往前做，跟 dg-worker 從頭往後錯開）
// 產出／續跑：mb-refs.json {key: {rg, title, first, type, via}}；MBGAP（毫秒）控制間隔，補掃還在跑時用 3000。
import fs from 'node:fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const UA = { 'User-Agent': 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)' };
const GAP = Number(process.env.MBGAP || 3000);
const items = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const cat = JSON.parse(fs.readFileSync('catalog.json', 'utf8'));
const sm = JSON.parse(fs.readFileSync('seedmap.json', 'utf8'));
const OUT = 'mb-refs.json';
const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const norm = s => String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/\(.*?\)|\[.*?\]/g, ' ').replace(/&/g, ' and ').replace(/^the\s+/, '').replace(/[^\p{L}\p{N}]+/gu, '');
const esc = s => String(s).replace(/([+\-&|!(){}\[\]^"~*?:\\/])/g, '\\$1');
let last = 0;
async function mb(url) {
  for (let i = 0; i < 5; i++) {
    const w = last + GAP - Date.now(); if (w > 0) await sleep(w); last = Date.now();
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(25000) });
      if (r.status === 503 || r.status === 429) { await sleep(6000 * (i + 1)); continue; }
      if (r.ok) return await r.json();
      if (r.status === 404 || r.status === 400) return null;
    } catch { }
    await sleep(3000 * (i + 1));
  }
  return null;
}
let n = 0;
const todo = [...items].reverse().filter(it => !out[it.key]);
console.log('待查', todo.length);
for (const it of todo) {
  const c = cat[it.key] || {}, s = sm[it.key];
  if (c.rgMbid) { out[it.key] = { rg: c.rgMbid, via: 'catalog' }; continue; }
  const q = `releasegroup:"${esc(s.album)}" AND artist:"${esc(s.artist)}"`;
  const j = await mb(`https://musicbrainz.org/ws/2/release-group?query=${encodeURIComponent(q)}&fmt=json&limit=8`);
  const hits = (j?.['release-groups'] || []).filter(g => norm(g.title) === norm(s.album)
    && (g['artist-credit'] || []).some(a => { const x = norm(a.name || a.artist?.name), y = norm(s.artist); return x && y && (x === y || x.includes(y) || y.includes(x)); }));
  hits.sort((a, b) => ((a['primary-type'] === 'Album' ? 0 : 1) - (b['primary-type'] === 'Album' ? 0 : 1)) || String(a['first-release-date'] || '9999').localeCompare(String(b['first-release-date'] || '9999')));
  const g = hits[0];
  out[it.key] = g ? { rg: g.id, title: g.title, first: g['first-release-date'] || '', type: g['primary-type'] || '', via: 'search' } : { rg: null, via: 'search' };
  if (++n % 25 === 0) { fs.writeFileSync(OUT, JSON.stringify(out)); console.log(new Date().toISOString().slice(11, 19), n, '/', todo.length); }
}
fs.writeFileSync(OUT, JSON.stringify(out));
console.log('done', n);
