// 盤點卡池 Spotify 連結：KV cover6:<artist|album 小寫> 有無 spotifyUrl
import fs from 'node:fs';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const H = { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' };
const KV = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const keys = []; let cursor = null;
do { const u = new URL(KV + '/keys'); u.searchParams.set('prefix', 'cover6:'); u.searchParams.set('limit', '1000'); if (cursor) u.searchParams.set('cursor', cursor);
  const j = await (await fetch(u, { headers: H })).json(); keys.push(...j.result.map(k => k.name)); cursor = j.result_info?.cursor || null; } while (cursor);
const vals = {};
for (let i = 0; i < keys.length; i += 100) {
  const chunk = keys.slice(i, i + 100);
  const j = await (await fetch(KV + '/bulk/get', { method: 'POST', headers: H, body: JSON.stringify({ keys: chunk }) })).json();
  for (const k of chunk) { const v = j.result?.values?.[k]; vals[k] = v == null ? null : (typeof v === 'string' ? v : JSON.stringify(v)); }
}
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const c = { pool: seed.length, hasUrl: 0, noKey: 0, noUrl: 0 }, why = {};
const missing = [], nokey = [];
for (const r of seed) {
  const k = 'cover6:' + (r[0] + '|' + r[1]).toLowerCase();
  const v = vals[k];
  if (v == null) { c.noKey++; nokey.push({ key: k, artist: r[0], album: r[1], year: r[6] }); continue; }
  let o; try { o = JSON.parse(v); } catch { o = {}; }
  if (o.spotifyUrl) { c.hasUrl++; continue; }
  c.noUrl++;
  const tag = o.replacedSpotifyAlbum ? 'replaced' : o.spotifyChecked ? 'checked:' + o.spotifyChecked : o.spotifyUnchecked ? 'unchecked' : o.coverSource || 'spotify-cover-no-url';
  why[tag] = (why[tag] || 0) + 1;
  missing.push({ key: k, artist: r[0], album: r[1], year: r[6], rgMbid: o.rgMbid || '', tag });
}
fs.writeFileSync('batch-progress/spotify-fill-20261106/missing.json', JSON.stringify(missing, null, 1));
fs.writeFileSync('batch-progress/spotify-fill-20261106/nokey.json', JSON.stringify(nokey, null, 1));
console.log(c, why);
