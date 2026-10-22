// 薄細項策展線（ts，複製自 downtempo 線）：每批的封面（CAA release-group front）、三軸基線（worker /album-rating，含 Last.fm listeners）、
// MB 曲目表與 Apple 試聽候選。可續跑（逐張寫回 batch-progress/<批>/meta.json）。
//   node batch-progress/thin-sub-20261020/meta.mjs add-20261020-ts1
import fs from 'node:fs';
const batch = process.argv[2];
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const n = s => String(s || '').toLowerCase().normalize('NFKC').replace(/\(.*?\)|\[.*?\]|（.*?）/g, '').replace(/[^\p{L}\p{N}]+/gu, '');
const cards = JSON.parse(fs.readFileSync(`desc-tools/batches/cards/${batch}-cards.json`, 'utf8'));
const OUT = `batch-progress/${batch}/meta.json`;
const meta = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
async function get(u, opt = {}, tries = 4) { for (let i = 0; i < tries; i++) { try { const r = await fetch(u, { ...opt, signal: AbortSignal.timeout(30000) }); if (r.ok || r.status === 404) return r; } catch {} await sleep(2500 * (i + 1)); } return null; }
async function mbTracks(rg) {
  await sleep(1100);
  const r = await get(`https://musicbrainz.org/ws/2/release?release-group=${rg}&inc=recordings+labels&limit=5&fmt=json`, { headers: { 'User-Agent': UA } });
  if (!r?.ok) return null;
  const j = await r.json();
  const rels = (j.releases || []).sort((a, b) => String(a.date || '9999').localeCompare(String(b.date || '9999')));
  const rel = rels[0]; if (!rel) return null;
  return { release: rel.id, date: rel.date, country: rel.country, label: (rel['label-info'] || []).map(l => (l.label?.name || '') + ' ' + (l['catalog-number'] || '')).join('; '), tracks: (rel.media || []).flatMap(m => (m.tracks || []).map(t => t.title)) };
}
async function apple(c, want) {
  const cands = new Map();
  // 地區 storefront 優先（vn／th／ph／my／sg／id／in／pk／mn 等），再 us、jp
  const SF = { vn: 'vn', kh: 'kh', sg: 'sg', th: 'th', ph: 'ph', my: 'my', id: 'id', in: 'in', pk: 'pk', mn: 'mn', bd: 'bd', lk: 'lk', np: 'np', tw: 'tw', hk: 'hk', kr: 'kr', fr: 'fr', be: 'be', se: 'se', cn: 'tw' };
  for (const cc of [...new Set([SF[c.country], 'us', 'jp'].filter(Boolean))]) {
    for (const term of [`${c.artist} ${c.album}`, c.album]) {
      await sleep(1600);
      const r = await get(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=${cc}&entity=album&limit=15`);
      if (!r?.ok) continue;
      const j = await r.json().catch(() => ({ results: [] }));
      for (const a of j.results || []) {
        const an = n(a.artistName), cn = n(a.collectionName), sa = n(c.artist), sb = n(c.album);
        const artOk = an.includes(sa.slice(0, 6)) || sa.includes(an.slice(0, 6));
        const albOk = cn.includes(sb.slice(0, 6)) || sb.includes(cn.slice(0, 6));
        if (artOk && albOk && !cands.has(a.collectionId)) cands.set(a.collectionId, { cc, a });
      }
    }
  }
  const res = [];
  for (const [id, { cc, a }] of [...cands].slice(0, 4)) {
    await sleep(1600);
    const r = await get(`https://itunes.apple.com/lookup?id=${id}&entity=song&country=${cc}`);
    if (!r?.ok) continue;
    const songs = ((await r.json().catch(() => ({}))).results || []).filter(x => x.wrapperType === 'track');
    const got = songs.map(x => n(x.trackName));
    const hit = want.filter(w => w.length > 1 && got.some(g => g.length > 1 && (g === w || g.includes(w) || w.includes(g)))).length;
    res.push({ id: String(id), cc, artist: a.artistName, name: a.collectionName, date: a.releaseDate?.slice(0, 10), count: a.trackCount, expl: a.collectionExplicitness, copy: a.copyright, hit, want: want.length, songs: songs.map(x => [x.discNumber, x.trackNumber, x.trackName, x.previewUrl]) });
  }
  return res.sort((x, y) => y.hit - x.hit);
}
for (const c of cards) {
  const k = c.key; if (meta[k]?.done) continue;
  const m = meta[k] || {};
  if (!m.caa && c.rgMbid) { const r = await get(`https://coverartarchive.org/release-group/${c.rgMbid}/front-500`, { method: 'HEAD', redirect: 'follow' }, 3); m.caa = r ? r.status : 0; }
  if (!m.rating) { const r = await get(`https://dip-vinyl-worker.kubinice06.workers.dev/album-rating?artist=${encodeURIComponent(c.artist)}&album=${encodeURIComponent(c.album)}`); m.rating = r?.ok ? await r.json() : null; }
  if (!m.mb && c.rgMbid) m.mb = await mbTracks(c.rgMbid);
  if (!m.apple) m.apple = await apple(c, (m.mb?.tracks || c.tracks || []).map(n));
  m.done = true; meta[k] = m;
  fs.writeFileSync(OUT, JSON.stringify(meta, null, 1));
  const b = m.apple[0];
  console.log(`${c.artist}《${c.album}》 caa ${m.caa} L=${m.rating?._listeners ?? '-'} tracks ${m.mb?.tracks?.length ?? '-'} | ${b ? `${b.cc} ${b.id} ${b.hit}/${b.want} n=${b.count}` : 'no apple'}`);
}
console.log('done', Object.keys(meta).length);
