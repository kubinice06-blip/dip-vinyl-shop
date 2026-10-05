// 卡上的 rgMbid 是不是真的 release-group、標題與掛名對不對得上。
//
// 為什麼要有這支：2026-10-04 c-186 的カリオカ《Sunny Place Carnival》，rgMbid 欄填的其實是**藝人**的 MBID
// （格式一樣是 UUID，驗證器只看格式）。CAA 因此查無封面、Apple 探測也配錯，補救層補來的圖反而是對的。
// CAA 有圖的卡等於已經驗過（圖是用這個 id 取的）；這支只查 CAA 沒圖的那些。
//
// 用法：node batch-progress/verify-rgmbid.mjs <批名...>      續跑檔：batch-progress/rgmbid-check.json
import fs from 'node:fs';
const UA = 'dip-vinyl-shop/1.0 ( https://dip-vinyl-shop.pages.dev )';
const OUT = 'batch-progress/rgmbid-check.json';
const done = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const norm = s => String(s || '').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
const sleep = ms => new Promise(r => setTimeout(r, ms));
let n = 0;
for (const b of process.argv.slice(2)) {
  const cand = JSON.parse(fs.readFileSync(`batch-progress/${b}/cand-all.json`, 'utf8'));
  const caa = fs.existsSync(`batch-progress/${b}/caa.json`) ? JSON.parse(fs.readFileSync(`batch-progress/${b}/caa.json`, 'utf8')) : [];
  const hasCaa = new Set(caa.filter(x => x.art && x.art.url).map(x => x.artist + '|' + x.album));
  for (const c of cand) {
    const k = `${b}|${c.artist}|${c.album}`;
    if (!c.rgMbid || hasCaa.has(c.artist + '|' + c.album) || done[k]) continue;
    let res = null;
    for (let a = 0; a < 4 && !res; a++) {
      await sleep(1100);
      try {
        const r = await fetch(`https://musicbrainz.org/ws/2/release-group/${c.rgMbid}?inc=artists&fmt=json`, { headers: { 'User-Agent': UA } });
        if (r.status === 404) res = { ok: false, why: '404（不是 release-group）' };
        else if (r.ok) { const j = await r.json(); const t = norm(j.title), w = norm(c.album);
          res = { ok: true, title: j.title, first: j['first-release-date'], artist: (j['artist-credit'] || []).map(x => x.name).join(' '), titleMatch: !!t && (t.includes(w) || w.includes(t)) }; }
        else await sleep(2000);
      } catch { await sleep(2000); }
    }
    done[k] = res || { ok: null, why: '查詢失敗' };
    if (++n % 10 === 0) fs.writeFileSync(OUT, JSON.stringify(done, null, 1));
  }
}
fs.writeFileSync(OUT, JSON.stringify(done, null, 1));
const all = Object.entries(done);
console.log(`已查 ${all.length} 張｜不是 RG ${all.filter(([, v]) => v.ok === false).length}｜標題對不上 ${all.filter(([, v]) => v.ok && !v.titleMatch).length}｜查詢失敗 ${all.filter(([, v]) => v.ok === null).length}`);
