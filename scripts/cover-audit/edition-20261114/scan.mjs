// 主站封面全面清查：補掃 card_catalog 裡 CAA release-group／release 網址的版本資料。
// 沿用 scripts/cover-audit/10-edition-scan.mjs 的格式（MB browse 1 req/s＋CAA RG JSON）。
// 可續跑：rg-scan.json／rel-scan.json 每 25 筆落檔，重跑跳過已完成。
import fs from 'node:fs';
const UA = { 'User-Agent': 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const cat = JSON.parse(fs.readFileSync('catalog.json', 'utf8'));
const old = JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/scripts/cover-audit/data/edition-scan.json', 'utf8'));
const rgs = new Map(), rels = new Map();
for (const [id, v] of Object.entries(cat)) {
  const u = v.coverUrl || '';
  let m = u.match(/\/release-group\/([0-9a-f-]{36})/);
  if (m) { if (!rgs.has(m[1])) rgs.set(m[1], []); rgs.get(m[1]).push(id); }
  m = u.match(/coverartarchive\.org\/release\/([0-9a-f-]{36})/);
  if (m) { if (!rels.has(m[1])) rels.set(m[1], []); rels.get(m[1]).push(id); }
}
const RGF = 'rg-scan.json', RLF = 'rel-scan.json';
const rgc = fs.existsSync(RGF) ? JSON.parse(fs.readFileSync(RGF, 'utf8')) : {};
const rlc = fs.existsSync(RLF) ? JSON.parse(fs.readFileSync(RLF, 'utf8')) : {};
async function getJson(url, { headers = {}, tries = 4 } = {}) {
  let last = 0;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers, signal: AbortSignal.timeout(25000) });
      last = r.status;
      if (r.ok) return { status: r.status, data: await r.json() };
      if (r.status === 404) return { status: 404, data: null };
      if (r.status !== 429 && r.status !== 503 && r.status < 500) return { status: r.status, data: null };
    } catch { }
    await sleep(2500 * (i + 1));
  }
  return { status: last, data: null };
}
const mapRel = x => ({ id: x.id, date: x.date || '', country: x.country || '', status: x.status || '',
  format: (x.media || []).map(m => m.format).filter(Boolean).join('+'),
  label: (x['label-info'] || []).map(l => l.label?.name).filter(Boolean).join(' / '),
  catno: (x['label-info'] || []).map(l => l['catalog-number']).filter(Boolean).join(' / '),
  title: x.title || '', disamb: x.disambiguation || '', front: !!x['cover-art-archive']?.front });
const todoRg = [...rgs.keys()].filter(r => !rgc[r] && !(old[r] && old[r].mbStatus === 200));
const todoRel = [...rels.keys()].filter(r => !rlc[r]);
console.log(`RG ${rgs.size}（舊掃描可用 ${[...rgs.keys()].filter(r => old[r] && old[r].mbStatus === 200).length}、已補 ${Object.keys(rgc).length}、待跑 ${todoRg.length}）｜release ${rels.size}（待跑 ${todoRel.length}）`);
let n = 0, fail = 0; const t0 = Date.now();
// MB 每 1.05 秒發一個（不等前一個回來，速率仍 ≤1 req/s）；CAA 另外排隊、並行 6 個
const caaQ = []; let caaActive = 0;
function caaGet(url) { return new Promise(res => { caaQ.push({ url, res }); pumpCaa(); }); }
function pumpCaa() { while (caaActive < 6 && caaQ.length) { const { url, res } = caaQ.shift(); caaActive++; getJson(url).then(r => { caaActive--; res(r); pumpCaa(); }); } }
const jobs = [];
for (const rg of todoRg) {
  const job = (async () => {
    const [mb, caa] = await Promise.all([
      getJson(`https://musicbrainz.org/ws/2/release?release-group=${rg}&inc=labels+media&fmt=json&limit=100`, { headers: UA }),
      caaGet(`https://coverartarchive.org/release-group/${rg}`)]);
    rgc[rg] = { rg, cards: rgs.get(rg), releases: (mb.data?.releases || []).map(mapRel), mbStatus: mb.status, caaStatus: caa.status,
      served: (caa.data?.release || '').split('/').pop() || null, total: mb.data?.['release-count'] ?? null };
    if (mb.status !== 200) fail++;
    if (++n % 50 === 0) { fs.writeFileSync(RGF, JSON.stringify(rgc)); const rate = n / ((Date.now() - t0) / 1000); console.log(`RG ${n}/${todoRg.length} 失敗 ${fail} 約剩 ${Math.round((todoRg.length - n) / rate / 60)} 分`); }
  })();
  jobs.push(job);
  if (jobs.length > 40) await Promise.race(jobs.filter(Boolean));
  await sleep(1050);
}
await Promise.all(jobs);
fs.writeFileSync(RGF, JSON.stringify(rgc));
n = 0;
for (const id of todoRel) {
  const tick = sleep(1050);
  const mb = await getJson(`https://musicbrainz.org/ws/2/release/${id}?inc=labels+media+release-groups&fmt=json`, { headers: UA });
  const x = mb.data;
  rlc[id] = { id, cards: rels.get(id), mbStatus: mb.status, rel: x ? mapRel(x) : null,
    rg: x?.['release-group']?.id || null, rgFirst: x?.['release-group']?.['first-release-date'] || '', rgType: x?.['release-group']?.['primary-type'] || '',
    rgSecondary: x?.['release-group']?.['secondary-types'] || [] };
  if (++n % 25 === 0) { fs.writeFileSync(RLF, JSON.stringify(rlc)); console.log(`REL ${n}/${todoRel.length}`); }
  await tick;
}
fs.writeFileSync(RLF, JSON.stringify(rlc));
console.log('done');
