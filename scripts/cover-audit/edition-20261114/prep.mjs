// 找原版的前置資料：對「可疑」的卡抓
//   (a) MB：該卡 release-group 底下有正面圖的 release（日期／國別／格式／廠牌／目錄號）→ CAA 候選
//   (b) Discogs：master 主圖＋各版本清單（依發行日排序，含 150px 縮圖）
// 用法：node prep.mjs <targets.json>   targets：[{key(docId), artist, album, year, rg}]
// 產出／續跑：prep.json（{key: {mb:{rg, releases:[…]}, dg:{…, versions:[…]}}}），每 10 筆落檔。
// MB 與補掃（scan.mjs）共用 IP 的 1 req/s 額度，這裡放慢到 3 秒一次；Discogs 未登入 25 次／分 → 2.5 秒一次。
import fs from 'node:fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const UA = { 'User-Agent': 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)' };
const targets = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const MBGAP = Number(process.env.MBGAP || 3000);
const OUT = 'prep.json';
const prep = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const rgScan = fs.existsSync('rg-scan.json') ? JSON.parse(fs.readFileSync('rg-scan.json', 'utf8')) : {};
const oldScan = JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/scripts/cover-audit/data/edition-scan.json', 'utf8'));
const norm = s => String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/\(.*?\)|\[.*?\]/g, ' ').replace(/&/g, ' and ').replace(/^the\s+/, '').replace(/[^\p{L}\p{N}]+/gu, '');
const normA = s => norm(String(s || '').replace(/\(\d+\)$/, '').replace(/\*$/, ''));
let lastDg = 0, lastMb = 0;
async function getJson(url, gapRef, gap, headers = UA) {
  for (let i = 0; i < 5; i++) {
    const last = gapRef === 'dg' ? lastDg : lastMb;
    const wait = last + gap - Date.now(); if (wait > 0) await sleep(wait);
    if (gapRef === 'dg') lastDg = Date.now(); else lastMb = Date.now();
    try {
      const r = await fetch(url, { headers, signal: AbortSignal.timeout(25000) });
      if (r.status === 429 || r.status === 503) { await sleep(gapRef === 'dg' ? 30000 : 5000); continue; }
      if (r.ok) return await r.json();
      if (r.status === 404) return null;
    } catch { }
    await sleep(3000 * (i + 1));
  }
  return null;
}
const dg = p => getJson('https://api.discogs.com' + p, 'dg', 2500);
const mb = u => getJson(u, 'mb', MBGAP);
const titleOf = x => String(x.title).split(' - ').slice(1).join(' - ');
const artistOf = x => String(x.title).split(' - ')[0];
function pick(results, t) {
  const exact = results.filter(x => norm(titleOf(x)) === norm(t.album));
  const pool = exact.length ? exact : results.filter(x => { const n = norm(titleOf(x)); return n.startsWith(norm(t.album)) && n.length <= norm(t.album).length + 12; });
  const ok = pool.filter(x => { const a = normA(artistOf(x)); const b = normA(t.artist); return a && b && (a === b || a.includes(b) || b.includes(a) || (!/various/i.test(artistOf(x)) && a.slice(0, 6) === b.slice(0, 6))); });
  return { list: ok.sort((a, b) => (+a.year || 9999) - (+b.year || 9999)), exact: !!exact.length };
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
    const v = await dg(`/masters/${m.id}/versions?per_page=60&sort=released&sort_order=asc`);
    const versions = (v?.versions || []).filter(x => x.thumb && !/spacer/.test(x.thumb)).slice(0, 40).map(x => ({
      id: x.id, released: x.released || '', country: x.country || '', label: x.label || '', catno: x.catno || '', format: x.format || '', thumb: x.thumb, major: (x.major_formats || []).join('+') }));
    return { kind: 'master', exact, id: m.id, title: (m.artists || []).map(a => a.name).join(', ') + ' - ' + m.title, year: m.year, mainRelease: m.main_release, img: prim?.uri || null, versions };
  }
  for (const q of [qa, qq]) {
    const res = await dg(q + '&type=release');
    const { list, exact } = pick((res?.results || []).filter(x => x.cover_image && !/spacer/.test(x.cover_image)), t);
    if (!list.length) continue;
    return { kind: 'release', exact, versions: list.slice(0, 12).map(h => ({ id: h.id, released: String(h.year || ''), country: h.country || '', label: (h.label || [])[0] || '', catno: h.catno || '', format: (h.format || []).join(','), thumb: h.thumb || h.cover_image, cover: h.cover_image })) };
  }
  return { kind: 'none' };
}
const mapRel = x => ({ id: x.id, date: x.date || '', country: x.country || '', status: x.status || '',
  format: (x.media || []).map(m => m.format).filter(Boolean).join('+'),
  label: (x['label-info'] || []).map(l => l.label?.name).filter(Boolean).join(' / '),
  catno: (x['label-info'] || []).map(l => l['catalog-number']).filter(Boolean).join(' / '),
  title: x.title || '', front: !!x['cover-art-archive']?.front });
async function mbAlts(t) {
  if (!t.rg) return null;
  let rel = rgScan[t.rg]?.releases || (oldScan[t.rg]?.mbStatus === 200 ? oldScan[t.rg].releases : null);
  if (!rel) {
    const j = await mb(`https://musicbrainz.org/ws/2/release?release-group=${t.rg}&inc=labels+media&fmt=json&limit=100`);
    rel = (j?.releases || []).map(mapRel);
  }
  return { rg: t.rg, releases: rel.filter(r => r.front) };
}
let n = 0;
const todo = targets.filter(t => !prep[t.key]);
console.log('待抓', todo.length, '／共', targets.length);
for (const t of todo) {
  const [d, m] = await Promise.all([discogs(t), mbAlts(t)]);
  prep[t.key] = { dg: d, mb: m };
  if (++n % 10 === 0) { fs.writeFileSync(OUT, JSON.stringify(prep)); console.log(n, '/', todo.length); }
}
fs.writeFileSync(OUT, JSON.stringify(prep));
console.log('done', n);
