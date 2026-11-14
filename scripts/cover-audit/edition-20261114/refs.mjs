// 參考圖：每張卡抓 Discogs master 的主圖（＋最早年份、主要版本）與維基百科條目的封面圖，給看圖判定當「原版長什麼樣」的對照。
// 用法：node refs.mjs <targets.json>   targets：[{key, artist, album, year}]
// 產出／續跑：refs.json（{key: {dg, wp}}），每 20 筆落檔。
import fs from 'node:fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const UA = { 'User-Agent': 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)' };
const targets = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const OUT = 'refs.json';
const refs = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const norm = s => String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/\(.*?\)|\[.*?\]/g, ' ').replace(/&/g, ' and ').replace(/^the\s+/, '').replace(/[^\p{L}\p{N}]+/gu, '');
const normA = s => norm(String(s || '').replace(/\(\d+\)$/, '').replace(/\*$/, ''));
let lastDg = 0;
async function dg(path) {
  for (let i = 0; i < 5; i++) {
    const wait = lastDg + 2500 - Date.now(); if (wait > 0) await sleep(wait); lastDg = Date.now();
    try {
      const r = await fetch('https://api.discogs.com' + path, { headers: UA, signal: AbortSignal.timeout(25000) });
      if (r.status === 429) { await sleep(30000); continue; }
      if (r.ok) return await r.json();
      if (r.status === 404) return null;
    } catch { }
    await sleep(3000 * (i + 1));
  }
  return null;
}
async function wj(url) {
  for (let i = 0; i < 3; i++) {
    try { const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) }); if (r.ok) return await r.json(); if (r.status === 404) return null; } catch { }
    await sleep(2000 * (i + 1));
  }
  return null;
}
const titleOf = x => { const parts = String(x.title).split(' - '); return parts.slice(1).join(' - '); };
const artistOf = x => String(x.title).split(' - ')[0];
function pick(results, t) {
  const exact = results.filter(x => norm(titleOf(x)) === norm(t.album));
  const pool = exact.length ? exact : results.filter(x => { const n = norm(titleOf(x)); return n.startsWith(norm(t.album)) && n.length <= norm(t.album).length + 12; });
  // 藝人要對得上（詞集合互含），避免同名異人
  const aw = new Set(normA(t.artist).match(/.{1,}/g) || []);
  const ok = pool.filter(x => { const a = normA(artistOf(x)); const b = normA(t.artist); return a && b && (a === b || a.includes(b) || b.includes(a) || /various/i.test(artistOf(x)) === false && a.slice(0, 6) === b.slice(0, 6)); });
  const out = (ok.length ? ok : []).sort((a, b) => (+a.year || 9999) - (+b.year || 9999));
  return { list: out, exact: !!exact.length };
}
async function discogs(t) {
  const qa = `/database/search?artist=${encodeURIComponent(t.artist)}&release_title=${encodeURIComponent(t.album)}&per_page=15`;
  const qq = `/database/search?q=${encodeURIComponent(t.artist + ' ' + t.album)}&per_page=15`;
  for (const q of [qa, qq]) {
    const res = await dg(q + '&type=master');
    const { list, exact } = pick(res?.results || [], t);
    if (!list.length) continue;
    const m = await dg('/masters/' + list[0].id);
    if (!m) continue;
    const imgs = m.images || [];
    const prim = imgs.find(x => x.type === 'primary') || imgs[0];
    return { kind: 'master', exact, id: m.id, title: (m.artists || []).map(a => a.name).join(', ') + ' - ' + m.title, year: m.year, mainRelease: m.main_release,
      img: prim?.uri || null };
  }
  for (const q of [qa, qq]) {
    const res = await dg(q + '&type=release');
    const { list, exact } = pick((res?.results || []).filter(x => x.cover_image && !/spacer/.test(x.cover_image)), t);
    if (!list.length) continue;
    const h = list[0];
    return { kind: 'release', exact, id: h.id, title: h.title, year: h.year, country: h.country, label: (h.label || [])[0], catno: h.catno, format: (h.format || []).join(','), img: h.cover_image };
  }
  return { kind: 'none' };
}
async function wiki(t) {
  const cjk = /[぀-ヿ㐀-鿿가-힯]/.test(t.artist + t.album);
  for (const lang of cjk ? ['zh', 'ja', 'en'] : ['en']) {
    const s = await wj(`https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srlimit=4&format=json&srsearch=${encodeURIComponent(`"${t.album}" ${t.artist} album`)}`);
    for (const h of s?.query?.search || []) {
      if (!norm(h.title).startsWith(norm(t.album)) || norm(h.title).length > norm(t.album).length + 25) continue;
      const p = await wj(`https://${lang}.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=thumbnail|name&pithumbsize=500&format=json&titles=${encodeURIComponent(h.title)}`);
      const pg = Object.values(p?.query?.pages || {})[0];
      if (pg?.thumbnail?.source) return { lang, title: h.title, img: pg.thumbnail.source, file: pg.pageimage };
    }
  }
  return null;
}
let n = 0;
const todo = targets.filter(t => !refs[t.key]);
console.log('待抓', todo.length, '／共', targets.length);
for (const t of todo) {
  const d = await discogs(t);
  refs[t.key] = { dg: d };
  if (++n % 20 === 0) { fs.writeFileSync(OUT, JSON.stringify(refs)); console.log(n, '/', todo.length); }
}
fs.writeFileSync(OUT, JSON.stringify(refs));
console.log('done', n);
