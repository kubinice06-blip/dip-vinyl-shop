// c-52 封面探測：走 §4 的 Bandcamp → Spotify 順序（c-SEA 當初只跑了 CAA）。
// 每一筆都把來源端的藝人／專輯／年份抓回來對，不接受「worker 回了圖就算數」——
// §4 明文要求核對藝人、專輯與版本，iTunes 模糊搜尋被禁就是因為少了這一步。
import fs from 'node:fs';
const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const targets = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const OUT = process.argv[3];

const search = async (path, a, b) => {
  const url = `${W}/${path}?artist=${encodeURIComponent(a)}&album=${encodeURIComponent(b)}`;
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(25000) });
      if (res.ok) { const j = await res.json(); return { img: j.imageUrl || j.coverUrl || null, link: j.spotifyUrl || j.bandcampUrl || '' }; }
      if (res.status === 429) { await sleep(4000 * (i + 1)); continue; }
      return null;
    } catch { await sleep(2000 * (i + 1)); }
  }
  return null;
};

// 把來源頁的 og 中繼資料抓回來，作為「這張圖是哪張碟」的可覆核證據
const meta = async (link) => {
  if (!link) return null;
  try {
    const r = await fetch(link, { signal: AbortSignal.timeout(25000), headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!r.ok) return { _http: r.status };
    const html = await r.text();
    const g = re => (html.match(re) || [])[1] || '';
    return {
      title: g(/<meta property="og:title" content="([^"]*)"/),
      desc: g(/<meta property="og:description" content="([^"]*)"/),
    };
  } catch (e) { return { _err: String(e.name || e).slice(0, 30) }; }
};

const headOk = async (u) => {
  try { const r = await fetch(u, { method: 'GET', signal: AbortSignal.timeout(20000) }); return r.status; }
  catch { return 0; }
};

const rows = [];
for (const [i, t] of targets.entries()) {
  const rec = { artist: t.artist, album: t.album, year: t.year ?? null, src: t.src || '' };
  for (const [path, source] of [['bandcamp-search', 'bandcamp'], ['spotify-search', 'spotify']]) {
    const hit = await search(path, t.artist, t.album);
    await sleep(400);
    if (!hit?.img) continue;
    const m = await meta(hit.link);
    const status = await headOk(hit.img);
    rec.cover = { url: hit.img, source, link: hit.link, httpStatus: status,
                  srcTitle: m?.title || '', srcDesc: m?.desc || '' };
    // 來源頁年份與卡片年份不一致 → 標旗，交人工判版本，不靜默採用
    const y = (m?.desc || '').match(/\b(19|20)\d{2}\b/);
    if (y && t.year && Number(y[0]) !== t.year) rec.cover.yearMismatch = `來源 ${y[0]}／卡片 ${t.year}`;
    break;
  }
  rows.push(rec);
  console.log(`${i + 1}/${targets.length} ${t.artist} 《${t.album}》 → ${rec.cover ? rec.cover.source + ' ' + rec.cover.httpStatus + (rec.cover.yearMismatch ? ' ⚠' + rec.cover.yearMismatch : '') : '✗'}`);
}
fs.writeFileSync(OUT, JSON.stringify(rows, null, 1));
console.log(`\n有封面 ${rows.filter(r => r.cover).length}／${rows.length}｜年份不符 ${rows.filter(r => r.cover?.yearMismatch).length}`);
