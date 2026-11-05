import fs from 'node:fs';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const H = { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' };
const KV = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const D = 'batch-progress/spotify-replaced-20261105/';
const rows = JSON.parse(fs.readFileSync(D + 'replaced.json', 'utf8'));
const REJECT_MB = ['Sasha & John Digweed|Northern Exposure'];   // MB 連到重混的 Redux
const REJECT_SP = ['Ohbliv|Rugged Tranquility'];                // 卡是 2009 版，Spotify Vol. 1 是 2021，無法確認同一張
const plan = [];
for (const r of rows) {
  const id = `${r.artist}|${r.album}`;
  const url = (r.mb && !REJECT_MB.includes(id)) ? r.mb : (r.sp && !REJECT_SP.includes(id)) ? r.sp : '';
  if (url) plan.push({ key: r.key, url, via: r.mb && !REJECT_MB.includes(id) ? 'musicbrainz' : 'spotify-search' });
}
const before = {}, put = [];
for (const p of plan) {
  const res = await fetch(`${KV}/values/${encodeURIComponent(p.key)}`, { headers: H });
  const raw = await res.text(); before[p.key] = raw;
  const o = JSON.parse(raw);
  if (o.spotifyUrl) continue;
  o.spotifyUrl = p.url;
  o.spotifyFix = `replaced-recheck-20261105:${p.via}`;
  put.push({ key: p.key, value: JSON.stringify(o) });
}
fs.writeFileSync(D + 'before.json', JSON.stringify(before, null, 1));
const r = await (await fetch(`${KV}/bulk`, { method: 'PUT', headers: H, body: JSON.stringify(put) })).json();
console.log('write', put.length, r.success);
let ok = 0;
for (const p of put) { const v = JSON.parse(await (await fetch(`${KV}/values/${encodeURIComponent(p.key)}`, { headers: H })).text()); if (v.spotifyUrl === JSON.parse(p.value).spotifyUrl) ok++; }
console.log('readback', ok, '/', put.length);
fs.writeFileSync(D + 'applied.json', JSON.stringify(put.map(p => ({ key: p.key, ...JSON.parse(p.value) })), null, 1));
