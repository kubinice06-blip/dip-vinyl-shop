// MusicBrainz 單一佇列（取代 mb-refs.mjs）。任務檔 mb-tasks.jsonl（可隨時追加）：
//   {"t":"rg","key":docId,"p":5}        → 找卡的 release-group（catalog 有 rgMbid 就直接用，否則 MB 搜尋）→ 結果寫 mb-refs.json[key]
//   {"t":"browse","key":docId,"p":1}    → 先確定 RG（同上），再抓該 RG 有圖的 release 清單 → 寫 prep.json[key].mb
// p 越小越先。間隔讀 mb-pace.txt（毫秒，預設 2500；補掃跑完改 1050）。閒置 90 分鐘結束。
import fs from 'node:fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const UA = { 'User-Agent': 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)' };
const cat = JSON.parse(fs.readFileSync('catalog.json', 'utf8'));
const sm = JSON.parse(fs.readFileSync('seedmap.json', 'utf8'));
const REFS = 'mb-refs.json', PREP = 'prep.json', TASKS = 'mb-tasks.jsonl';
const refs = fs.existsSync(REFS) ? JSON.parse(fs.readFileSync(REFS, 'utf8')) : {};
const norm = s => String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/\(.*?\)|\[.*?\]/g, ' ').replace(/&/g, ' and ').replace(/^the\s+/, '').replace(/[^\p{L}\p{N}]+/gu, '');
const esc = s => String(s).replace(/([+\-&|!(){}\[\]^"~*?:\\/])/g, '\\$1');
const pace = () => { try { return Number(fs.readFileSync('mb-pace.txt', 'utf8').trim()) || 2500; } catch { return 2500; } };
let last = 0;
async function mb(url) {
  for (let i = 0; i < 5; i++) {
    const w = last + pace() - Date.now(); if (w > 0) await sleep(w); last = Date.now();
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
const mapRel = x => ({ id: x.id, date: x.date || '', country: x.country || '', status: x.status || '',
  format: (x.media || []).map(m => m.format).filter(Boolean).join('+'),
  label: (x['label-info'] || []).map(l => l.label?.name).filter(Boolean).join(' / '),
  catno: (x['label-info'] || []).map(l => l['catalog-number']).filter(Boolean).join(' / '),
  title: x.title || '', front: !!x['cover-art-archive']?.front });
async function findRg(key) {
  if (refs[key]) return refs[key];
  const c = cat[key] || {}, s = sm[key];
  if (c.rgMbid) return (refs[key] = { rg: c.rgMbid, via: 'catalog' });
  const q = `releasegroup:"${esc(s.album)}" AND artist:"${esc(s.artist)}"`;
  const j = await mb(`https://musicbrainz.org/ws/2/release-group?query=${encodeURIComponent(q)}&fmt=json&limit=8`);
  if (!j) return null;
  const hits = (j['release-groups'] || []).filter(g => norm(g.title) === norm(s.album)
    && (g['artist-credit'] || []).some(a => { const x = norm(a.name || a.artist?.name), y = norm(s.artist); return x && y && (x === y || x.includes(y) || y.includes(x)); }));
  hits.sort((a, b) => ((a['primary-type'] === 'Album' ? 0 : 1) - (b['primary-type'] === 'Album' ? 0 : 1)) || String(a['first-release-date'] || '9999').localeCompare(String(b['first-release-date'] || '9999')));
  const g = hits[0];
  return (refs[key] = g ? { rg: g.id, title: g.title, first: g['first-release-date'] || '', type: g['primary-type'] || '', via: 'search' } : { rg: null, via: 'search' });
}
const done = t => t.t === 'rg' ? !!refs[t.key] : !!(readPrep()[t.key]?.mb);
let prepCache = null;
const readPrep = () => (prepCache ||= fs.existsSync(PREP) ? JSON.parse(fs.readFileSync(PREP, 'utf8')) : {});
let idle = Date.now(), n = 0;
while (true) {
  prepCache = null;
  const tasks = fs.existsSync(TASKS) ? fs.readFileSync(TASKS, 'utf8').split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
  const todo = tasks.filter(t => !done(t)).sort((a, b) => (a.p ?? 5) - (b.p ?? 5));
  if (!todo.length) { if (Date.now() - idle > 90 * 60000) break; await sleep(15000); continue; }
  idle = Date.now();
  const browsed = {};
  for (const t of todo.slice(0, 15)) {
    const g = await findRg(t.key);
    if (t.t === 'browse' && g) {
      let rel = [];
      if (g.rg) { const j = await mb(`https://musicbrainz.org/ws/2/release?release-group=${g.rg}&inc=labels+media&fmt=json&limit=100`); rel = (j?.releases || []).map(mapRel); }
      browsed[t.key] = { rg: g.rg, releases: rel.filter(r => r.front), allCount: rel.length, rgFirst: rel.map(r => r.date).filter(Boolean).sort()[0] || '' };
    }
    n++;
  }
  fs.writeFileSync(REFS, JSON.stringify(refs));
  if (Object.keys(browsed).length) {   // 重讀再合併，避免蓋掉別的程式剛寫進 prep.json 的東西
    const prep = fs.existsSync(PREP) ? JSON.parse(fs.readFileSync(PREP, 'utf8')) : {};
    for (const [k, v] of Object.entries(browsed)) prep[k] = { ...(prep[k] || {}), mb: v };
    fs.writeFileSync(PREP, JSON.stringify(prep));
  }
  if (n % 150 < 15) console.log(new Date().toISOString().slice(11, 19), 'done', n, 'left', todo.length - 15);
}
console.log('idle exit', n);
