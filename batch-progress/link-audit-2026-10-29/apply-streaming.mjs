// 套用 fix-plan.json 的串流修正到 KV cover6:*（2026-11-04 店主「可以」）。比照 sp-audit/apply.mjs：
// 先 GET 備份、現值等於稽核時的 old 才 PUT、寫完讀回。備份寫進 kv-backup-*.json（pages-build 會排除，不上站）。
import fs from 'node:fs';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105', T = process.env.CLOUDFLARE_API_TOKEN;
const KV = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/values/`, H = { Authorization: `Bearer ${T}` };
const D = 'batch-progress/link-audit-2026-10-29/';
const plan = JSON.parse(fs.readFileSync(D + 'fix-plan.json', 'utf8')).streaming, backup = {}, out = [];
for (const x of plan) {
  const r = await fetch(KV + encodeURIComponent(x.kvKey), { headers: H });
  if (!r.ok) { out.push({ key: x.kvKey, ok: false, why: 'GET ' + r.status }); continue; }
  const v = await r.json(); backup[x.kvKey] = v;
  if ((v.spotifyUrl || '') !== (x.old || '')) { out.push({ key: x.kvKey, ok: false, why: '現值已變', now: v.spotifyUrl }); continue; }
  const nv = { ...v, spotifyUrl: x.new || '', spotifyChecked: x.spotifyChecked || 'fix-2026-10-29-link-audit' };
  const p = await fetch(KV + encodeURIComponent(x.kvKey), { method: 'PUT', headers: { ...H, 'Content-Type': 'text/plain' }, body: JSON.stringify(nv) });
  const back = await (await fetch(KV + encodeURIComponent(x.kvKey), { headers: H })).json();
  out.push({ key: x.kvKey, action: x.action, ok: p.ok && (back.spotifyUrl || '') === nv.spotifyUrl, now: back.spotifyUrl });
}
fs.writeFileSync(D + 'kv-backup-2026-11-04-streaming.json', JSON.stringify(backup, null, 1));
fs.writeFileSync(D + 'apply-streaming-report.json', JSON.stringify(out, null, 1));
const ok = out.filter(o => o.ok);
console.log('ok', ok.length, '/', plan.length, 'replace', ok.filter(o => o.action === 'replace').length, 'clear', ok.filter(o => o.action === 'clear').length);
console.log(JSON.stringify(out.filter(o => !o.ok)));
