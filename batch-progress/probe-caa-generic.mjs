// 通用 CAA 封面探測。用法：node batch-progress/probe-caa-generic.mjs <批名>
// 以 release-group MBID 為鍵，不受掛名文字影響——正好繞開 c-53 那個
// 「MB 的 artist: 比對的是 artist-credit」的陷阱。
// 只在 group 端回真正的 404 時才下鑽到各 release；逾時或其他 HTTP 錯不下鑽，
// 那會把「暫時打不通」誤記成「沒有封面」。
import fs from 'node:fs';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const batch = process.argv[2];
const cards = JSON.parse(fs.readFileSync(`desc-tools/batches/cards/${batch}-cards.json`, 'utf8'));
const OUT = `batch-progress/${batch}/caa.json`;
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : [];
const done = new Map(prev.map(r => [r.artist + '|' + r.album, r]));

const head = async url => {
  try { const r = await fetch(url, { headers: UA, redirect: 'follow', signal: AbortSignal.timeout(20000) });
        return r.ok ? { ok: true, status: r.status } : { ok: false, status: r.status }; }
  catch (e) { return { _err: String(e.name || e).slice(0, 40) }; }
};
const out = [];
for (const c of cards) {
  const k = c.artist + '|' + c.album;
  const cached = done.get(k);
  if (cached && (cached.art || cached.probed)) { out.push(cached); continue; }
  const rec = { artist: c.artist, album: c.album, year: c.year, g: c.group, rgMbid: c.rgMbid || null, art: null, probed: true };
  if (c.rgMbid) {
    const u = `https://coverartarchive.org/release-group/${c.rgMbid}/front`;
    const h = await head(u); await sleep(900);
    if (h.ok) rec.art = { url: u, source: 'caa', rgMbid: c.rgMbid };
    else if (h.status === 404) {
      const rel = await fetch(`https://musicbrainz.org/ws/2/release?release-group=${c.rgMbid}&fmt=json&limit=25`,
        { headers: UA, signal: AbortSignal.timeout(25000) }).then(x => x.json()).catch(() => null);
      await sleep(1100);
      for (const x of (rel?.releases || [])) {
        const ru = `https://coverartarchive.org/release/${x.id}/front`;
        const hh = await head(ru); await sleep(900);
        if (hh.ok) { rec.art = { url: ru, source: 'caa-release', rgMbid: c.rgMbid, releaseMbid: x.id, relDate: x.date }; break; }
      }
    } else { rec.probeError = h.status || h._err; rec.probed = false; }
  }
  out.push(rec);
  console.log(`[${c.group}] ${c.artist} 《${c.album}》 → ${rec.art ? rec.art.source : (rec.probeError ? '錯誤 ' + rec.probeError : '無圖')}`);
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log(`\n${batch}｜CAA 有圖 ${out.filter(r => r.art).length}／${out.length}｜探測錯誤 ${out.filter(r => r.probeError).length}`);
