// Discogs 單一佇列（未登入 25 次／分 → 2.5 秒一次；所有 Discogs 請求都走這裡，避免多程序互搶被 429）。
// 任務檔 dg-tasks.jsonl（一行一個，可隨時追加）：
//   {"t":"search","key":docId,"artist":…,"album":…,"p":5}   → 參考圖（master 主圖；沒有就最早有圖的 release）
//   {"t":"versions","id":masterId,"p":1}                      → master 各版本（依發行日）
//   {"t":"release","id":releaseId,"p":0}                      → 單一 release（大圖、年份、廠牌、目錄號、國別）
// p 越小越先做。結果寫 dg-cache.json（鍵 search:<key>／versions:<id>／release:<id>），每 10 筆落檔。
// 閒置 90 分鐘自動結束；重啟會跳過已完成的。
import fs from 'node:fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const UA = { 'User-Agent': 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)' };
const CACHE = 'dg-cache.json', TASKS = 'dg-tasks.jsonl';
const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
const norm = s => String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/\(.*?\)|\[.*?\]/g, ' ').replace(/&/g, ' and ').replace(/^the\s+/, '').replace(/[^\p{L}\p{N}]+/gu, '');
const normA = s => norm(String(s || '').replace(/\(\d+\)$/, '').replace(/\*$/, ''));
let last = 0;
async function dg(path) {
  for (let i = 0; i < 6; i++) {
    const wait = last + 2500 - Date.now(); if (wait > 0) await sleep(wait); last = Date.now();
    try {
      const r = await fetch('https://api.discogs.com' + path, { headers: UA, signal: AbortSignal.timeout(25000) });
      if (r.status === 429) { await sleep(40000); continue; }
      if (r.ok) return await r.json();
      if (r.status === 404) return { __404: true };
    } catch { }
    await sleep(4000 * (i + 1));
  }
  return null;
}
const titleOf = x => String(x.title).split(' - ').slice(1).join(' - ');
const artistOf = x => String(x.title).split(' - ')[0];
function pick(results, t) {
  const exact = results.filter(x => norm(titleOf(x)) === norm(t.album));
  const pool = exact.length ? exact : results.filter(x => { const n = norm(titleOf(x)); return n.startsWith(norm(t.album)) && n.length <= norm(t.album).length + 12; });
  const ok = pool.filter(x => { const a = normA(artistOf(x)); const b = normA(t.artist); return a && b && (a === b || a.includes(b) || b.includes(a) || (!/various/i.test(artistOf(x)) && a.slice(0, 6) === b.slice(0, 6))); });
  return { list: ok.sort((a, b) => (+a.year || 9999) - (+b.year || 9999)), exact: !!exact.length };
}
const good = x => x.cover_image && !/spacer/.test(x.cover_image);
async function doSearch(t) {
  // 一次搜尋（不限 type），master 與 release 混在結果裡：先挑同名 master，沒有再挑最早有圖的同名 release
  let r = await dg(`/database/search?artist=${encodeURIComponent(t.artist)}&release_title=${encodeURIComponent(t.album)}&per_page=50`);
  if (!r) return null;
  if (!(r.results || []).length) {   // 被擠爆時 Discogs 會回 200＋空結果：等一下再查一次確認
    await sleep(10000);
    r = await dg(`/database/search?artist=${encodeURIComponent(t.artist)}&release_title=${encodeURIComponent(t.album)}&per_page=50`);
    if (!r) return null;
  }
  const res = (r.results || []).filter(good);
  let { list, exact } = pick(res.filter(x => x.type === 'master'), t);
  if (list.length) { const h = list[0]; return { kind: 'master', exact, id: h.id, title: h.title, year: h.year, country: h.country, img: h.cover_image, thumb: h.thumb }; }
  ({ list, exact } = pick(res.filter(x => x.type === 'release'), t));
  if (list.length) { const h = list[0]; return { kind: 'release', exact, id: h.id, masterId: h.master_id || null, title: h.title, year: h.year, country: h.country, label: (h.label || [])[0], catno: h.catno, format: (h.format || []).join(','), img: h.cover_image, thumb: h.thumb }; }
  return { kind: 'none' };
}
async function doVersions(id) {
  const v = await dg(`/masters/${id}/versions?per_page=80&sort=released&sort_order=asc`);
  if (!v) return null;
  return (v.versions || []).filter(x => x.thumb && !/spacer/.test(x.thumb)).map(x => ({ id: x.id, released: x.released || '', country: x.country || '', label: x.label || '', catno: x.catno || '', format: x.format || '', major: (x.major_formats || []).join('+'), thumb: x.thumb }));
}
async function doRelease(id) {
  const x = await dg('/releases/' + id);
  if (!x || x.__404) return x ? { missing: true } : null;
  const imgs = x.images || []; const prim = imgs.find(i => i.type === 'primary') || imgs[0];
  return { id: x.id, title: x.title, artists: (x.artists || []).map(a => a.name).join(', '), year: x.year, released: x.released, country: x.country,
    labels: (x.labels || []).map(l => ({ name: l.name, catno: l.catno })), formats: (x.formats || []).map(f => [f.name, ...(f.descriptions || [])].join(' ')).join('; '),
    img: prim?.uri || null, w: prim?.width, h: prim?.height, masterId: x.master_id || null, barcode: (x.identifiers || []).filter(i => i.type === 'Barcode').map(i => i.value).slice(0, 2) };
}
const keyOf = t => t.t === 'search' ? (t.v ? 'vdone:' : 'search:') + t.key : `${t.t}:${t.id}`;
let idleSince = Date.now(), n = 0;
while (true) {
  const tasks = fs.existsSync(TASKS) ? fs.readFileSync(TASKS, 'utf8').split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
  const todo = tasks.filter(t => !(keyOf(t) in cache)).sort((a, b) => (a.p ?? 5) - (b.p ?? 5));
  if (!todo.length) {
    if (Date.now() - idleSince > 90 * 60000) break;
    await sleep(15000); continue;
  }
  idleSince = Date.now();
  // 一次做一小段，做完重讀任務檔（讓新追加的高優先任務插隊）
  for (const t of todo.slice(0, 10)) {
    let res;
    if (t.t === 'search') {
      res = cache['search:' + t.key] || await doSearch(t);
      if (res) cache['search:' + t.key] = res;
      if (res && t.v && res.kind === 'master' && !cache['versions:' + res.id]) { const vv = await doVersions(res.id); if (vv) cache['versions:' + res.id] = vv; }
      if (res && t.v) cache['vdone:' + t.key] = 1;
    }
    else if (t.t === 'versions') res = await doVersions(t.id);
    else if (t.t === 'release') res = await doRelease(t.id);
    else if (t.t === 'master') { const m = await dg('/masters/' + t.id); if (m && !m.__404) { const im = m.images || []; const pr = im.find(i => i.type === 'primary') || im[0]; res = { id: m.id, mainRelease: m.main_release, year: m.year, title: m.title, img: pr?.uri || null }; } else if (m) res = { missing: true }; }
    if (res && !(t.t === 'search' && t.v)) cache[keyOf(t)] = res;
    n++;
  }
  fs.writeFileSync(CACHE, JSON.stringify(cache));
  if (n % 100 < 10) console.log(new Date().toISOString().slice(11, 19), 'done', n, 'left', todo.length - 10);
}
fs.writeFileSync(CACHE, JSON.stringify(cache));
console.log('idle exit', n);
