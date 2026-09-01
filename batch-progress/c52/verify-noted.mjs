// 策展層的 mbNote 裡記了不少 MBID，但**混了藝人 MBID 與 release-group MBID**
// （例：Barong's Band 那筆自己就寫明是藝人條目、底下沒有任何 release-group）。
// §1 要的是 release-group MBID，抄錯就等於釘了一個假身分。這裡逐個回問 MB 判定。
import fs from 'node:fs';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const cand = JSON.parse(fs.readFileSync('batch-progress/c52/cand.json', 'utf8'));
const MBID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;

const get = async (path) => {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch('https://musicbrainz.org/ws/2/' + path, { headers: UA, signal: AbortSignal.timeout(25000) });
      if (r.status === 503) { await sleep(3000); continue; }
      if (r.status === 404) return { _404: true };
      if (!r.ok) return { _http: r.status };
      return await r.json();
    } catch { await sleep(1500); }
  }
  return { _err: true };
};

const out = [];
for (const c of cand) {
  const ids = [...new Set((c.mbNote || '').match(MBID) || [])];
  const rec = { artist: c.artist, album: c.album, year: c.year, releaseType: c.releaseType, ids: [] };
  for (const id of ids) {
    const rg = await get(`release-group/${id}?inc=artist-credits&fmt=json`); await sleep(1100);
    if (rg && !rg._404 && !rg._err && rg.title) {
      rec.ids.push({ id, kind: 'release-group', title: rg.title,
        credit: (rg['artist-credit'] || []).map(x => x.name).join(', '),
        type: rg['primary-type'], sec: rg['secondary-types'] || [],
        date: rg['first-release-date'] || '' });
      continue;
    }
    const ar = await get(`artist/${id}?fmt=json`); await sleep(1100);
    if (ar && !ar._404 && !ar._err && ar.name) { rec.ids.push({ id, kind: 'artist', name: ar.name, area: ar.area?.name || '' }); continue; }
    rec.ids.push({ id, kind: 'unknown' });
  }
  out.push(rec);
  const rgs = rec.ids.filter(x => x.kind === 'release-group');
  console.log(`${c.artist} 《${c.album}》 → RG ${rgs.length}｜藝人 ${rec.ids.filter(x=>x.kind==='artist').length}` +
    (rgs.length ? '｜' + rgs.map(r => `${r.title} [${r.type}${r.sec?.length?'/'+r.sec.join('+'):''}] ${r.date}`).join(' ; ') : ''));
}
fs.writeFileSync('batch-progress/c52/noted-verified.json', JSON.stringify(out, null, 1));
console.log('\n有可用 release-group 的:', out.filter(r => r.ids.some(x => x.kind === 'release-group')).length, '／', out.length);
