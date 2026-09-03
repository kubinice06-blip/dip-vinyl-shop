// c-53 全批封面探測。策展層每筆的 mbNote 都記了實查的 release-group MBID，
// 直接拿來打 CAA（CAA 以 release-group MBID 為鍵，版本釘得住，不受掛名文字影響——
// 這正好繞開 Наутилус Помпилиус 那個「MB 掛拉丁名」的陷阱）。
// 只在 group 端回真正的 404 時才下鑽到各 release；逾時或其他 HTTP 錯不下鑽，
// 那會把「暫時打不通」誤記成「沒有封面」。
import fs from 'node:fs';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const MBID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

const rows = [];
for (const g of ['a', 'b']) {
  const p = `batch-progress/c53/prop-${g}.json`;
  if (!fs.existsSync(p)) continue;
  for (const r of JSON.parse(fs.readFileSync(p, 'utf8'))) rows.push({ ...r, _g: g });
}
const head = async url => {
  try { const r = await fetch(url, { headers: UA, redirect: 'follow', signal: AbortSignal.timeout(20000) });
        return r.ok ? { ok: true, status: r.status } : { ok: false, status: r.status }; }
  catch (e) { return { _err: String(e.name || e).slice(0, 40) }; }
};

const out = [];
for (const r of rows) {
  const id = (r.mbNote || '').match(MBID)?.[0];
  const rec = { artist: r.artist, album: r.album, year: r.year, g: r._g, rgMbid: id || null, art: null };
  if (id) {
    const u = `https://coverartarchive.org/release-group/${id}/front`;
    const h = await head(u); await sleep(900);
    if (h.ok) rec.art = { url: u, source: 'caa', rgMbid: id };
    else if (h.status === 404) {
      const rel = await fetch(`https://musicbrainz.org/ws/2/release?release-group=${id}&fmt=json&limit=25`,
        { headers: UA, signal: AbortSignal.timeout(25000) }).then(x => x.json()).catch(() => null);
      await sleep(1100);
      for (const x of (rel?.releases || [])) {
        const ru = `https://coverartarchive.org/release/${x.id}/front`;
        const hh = await head(ru); await sleep(900);
        if (hh.ok) { rec.art = { url: ru, source: 'caa-release', rgMbid: id, releaseMbid: x.id, relDate: x.date }; break; }
      }
    } else rec.probeError = h.status || h._err;
  }
  out.push(rec);
  console.log(`[${r._g}] ${r.artist} 《${r.album}》 → ${rec.art ? rec.art.source : (id ? '無圖' : 'mbNote 無 MBID')}`);
}
fs.writeFileSync('batch-progress/c53/caa.json', JSON.stringify(out, null, 1));
console.log(`\nCAA 有圖 ${out.filter(r => r.art).length}／${out.length}｜無 MBID ${out.filter(r => !r.rgMbid).length}｜探測錯誤 ${out.filter(r => r.probeError).length}`);
