// 把 plan（[{key, url, via}]）寫進 KV cover6:*：逐筆讀現值、已有連結的跳過、只補 spotifyUrl＋spotifyFix，舊值存 before-<tag>.json
import fs from 'node:fs';
const [planFile, tag] = process.argv.slice(2);
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const H = { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' };
const KV = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const D = 'batch-progress/spotify-fill-20261106/';
const plan = JSON.parse(fs.readFileSync(planFile, 'utf8'));
const before = {}, put = [];
for (let i = 0; i < plan.length; i += 100) {
  const chunk = plan.slice(i, i + 100);
  const j = await (await fetch(KV + '/bulk/get', { method: 'POST', headers: H, body: JSON.stringify({ keys: chunk.map(p => p.key) }) })).json();
  for (const p of chunk) {
    const raw = j.result?.values?.[p.key]; if (raw == null) continue;
    const s = typeof raw === 'string' ? raw : JSON.stringify(raw); before[p.key] = s;
    const o = JSON.parse(s); if (o.spotifyUrl) continue;
    o.spotifyUrl = p.url; o.spotifyFix = `fill-20261106:${p.via}`;
    put.push({ key: p.key, value: JSON.stringify(o) });
  }
}
fs.writeFileSync(D + `before-${tag}.json`, JSON.stringify(before, null, 1));
for (let i = 0; i < put.length; i += 500) {
  const r = await (await fetch(KV + '/bulk', { method: 'PUT', headers: H, body: JSON.stringify(put.slice(i, i + 500)) })).json();
  if (!r.success) throw new Error(JSON.stringify(r.errors));
}
fs.writeFileSync(D + `applied-${tag}.json`, JSON.stringify(put.map(p => ({ key: p.key, url: JSON.parse(p.value).spotifyUrl })), null, 1));
console.log(`${tag}: plan ${plan.length}, written ${put.length}`);
