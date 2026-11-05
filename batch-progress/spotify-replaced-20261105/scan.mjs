// 掃 KV cover6:*：worker 覆核時把 Spotify 模糊命中換成 MusicBrainz 封面、清掉 spotifyUrl 的鍵（replacedSpotifyAlbum）
import fs from 'node:fs';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const H = { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' };
const KV = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const keys = []; let cursor = null;
do { const u = new URL(KV + '/keys'); u.searchParams.set('prefix', 'cover6:'); u.searchParams.set('limit', '1000'); if (cursor) u.searchParams.set('cursor', cursor);
  const j = await (await fetch(u, { headers: H })).json(); keys.push(...j.result.map(k => k.name)); cursor = j.result_info?.cursor || null; } while (cursor);
const out = {};
for (let i = 0; i < keys.length; i += 100) {
  const chunk = keys.slice(i, i + 100);
  const j = await (await fetch(KV + '/bulk/get', { method: 'POST', headers: H, body: JSON.stringify({ keys: chunk }) })).json();
  for (const k of chunk) { const v = j.result?.values?.[k]; out[k] = v == null ? null : (typeof v === 'string' ? v : JSON.stringify(v)); }
}
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const orig = new Map(seed.map(r => [(r[0] + '|' + r[1]).toLowerCase(), r]));
const rows = [];
let withUrl = 0, noUrl = 0;
for (const k of keys) {
  let o; try { o = JSON.parse(out[k] || '{}'); } catch { continue; }
  if (o.spotifyUrl) withUrl++; else noUrl++;
  if (!o.replacedSpotifyAlbum || o.spotifyUrl) continue;
  const id = k.slice(7), r = orig.get(id);
  if (!r) continue;
  rows.push({ key: k, artist: r[0], album: r[1], replaced: o.replacedSpotifyAlbum, rgMbid: o.rgMbid || '', checked: o.spotifyChecked || '' });
}
fs.writeFileSync(process.argv[2], JSON.stringify(rows, null, 1));
console.log({ keys: keys.length, withUrl, noUrl, replacedInPool: rows.length });
