// 套用 version-fix-plan-2026-10-27.json：18 條換正確版本、5 條清空；先備份舊值，寫完讀回驗證
import fs from 'node:fs';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105', T = process.env.CLOUDFLARE_API_TOKEN;
const KV = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/values/`, H = { Authorization: `Bearer ${T}` };
const plan = JSON.parse(fs.readFileSync('version-fix-plan-2026-10-27.json', 'utf8')), backup = {}, out = [];
for (const x of plan) {
  const r = await fetch(KV + encodeURIComponent(x.key), { headers: H }); if (!r.ok) { console.log('GET fail', x.key, r.status); continue; }
  const v = await r.json(); backup[x.key] = v;
  if (v.spotifyUrl !== x.oldUrl) { console.log('SKIP（現值已變）', x.key, v.spotifyUrl); continue; }
  const nv = { ...v, spotifyUrl: x.newUrl || '', spotifyChecked: 'fix-2026-10-28-version' };
  const p = await fetch(KV + encodeURIComponent(x.key), { method: 'PUT', headers: { ...H, 'Content-Type': 'text/plain' }, body: JSON.stringify(nv) });
  const back = await (await fetch(KV + encodeURIComponent(x.key), { headers: H })).json();
  const ok = p.ok && back.spotifyUrl === nv.spotifyUrl; out.push({ key: x.key, ok, now: back.spotifyUrl });
  console.log(ok ? 'OK ' : 'FAIL', x.key, '→', back.spotifyUrl || '（清空）');
}
fs.writeFileSync('kv-backup-2026-10-28.json', JSON.stringify(backup, null, 1)); fs.writeFileSync('apply-report.json', JSON.stringify(out, null, 1));
console.log('done', out.filter(o => o.ok).length, '/', plan.length);
