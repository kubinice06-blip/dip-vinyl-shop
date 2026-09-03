// 對「驗出真的有 release-group」的卡跑 CAA。CAA 以 release-group MBID 為鍵，
// 版本釘得住，優於 Spotify 抓回來的再發版（Chrisye 那張 Spotify 是 1999 再發、卡片是 1977）。
// 只在 group 端回真正的 404 時才下鑽到各 release，逾時或其他 HTTP 錯不下鑽——
// 那會把「暫時打不通」誤記成「沒有封面」。
import fs from 'node:fs';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const noted = JSON.parse(fs.readFileSync('batch-progress/c52/identity.json', 'utf8'))
  .filter(r => r.identitySource === 'pinned')
  .map(r => ({ artist: r.artist, album: r.album, year: r.year,
               ids: [{ kind: 'release-group', id: r.rgMbid, title: r.rgTitle, date: r.rgDate }] }));

const head = async url => {
  try {
    const r = await fetch(url, { headers: UA, redirect: 'follow', signal: AbortSignal.timeout(20000) });
    return r.ok ? { ok: true, status: r.status } : { ok: false, status: r.status };
  } catch (e) { return { _err: String(e.name || e).slice(0, 40) }; }
};

const out = [];
for (const rec of noted) {
  const rgs = rec.ids.filter(x => x.kind === 'release-group');
  const row = { artist: rec.artist, album: rec.album, year: rec.year, art: null, tried: [] };
  for (const rg of rgs) {
    const url = `https://coverartarchive.org/release-group/${rg.id}/front`;
    const g = await head(url); await sleep(900);
    row.tried.push({ id: rg.id, title: rg.title, status: g.status || g._err });
    if (g.ok) { row.art = { url, source: 'caa', rgMbid: rg.id, rgTitle: rg.title, rgDate: rg.date }; break; }
    if (g.status === 404) {
      const rel = await fetch(`https://musicbrainz.org/ws/2/release?release-group=${rg.id}&fmt=json&limit=25`,
        { headers: UA, signal: AbortSignal.timeout(25000) }).then(r => r.json()).catch(() => null);
      await sleep(1100);
      for (const r of (rel?.releases || [])) {
        const u = `https://coverartarchive.org/release/${r.id}/front`;
        const h = await head(u); await sleep(900);
        if (h.ok) { row.art = { url: u, source: 'caa-release', rgMbid: rg.id, releaseMbid: r.id, rgTitle: rg.title, relDate: r.date }; break; }
      }
      if (row.art) break;
    }
  }
  out.push(row);
  console.log(`${rec.artist} 《${rec.album}》 → ${row.art ? row.art.source + ' ' + (row.art.rgTitle||'') : (rgs.length ? '無圖' : '無 RG，跳過')}`);
}
fs.writeFileSync('batch-progress/c52/caa.json', JSON.stringify(out, null, 1));
console.log('\nCAA 有圖:', out.filter(r => r.art).length, '／', out.length);
