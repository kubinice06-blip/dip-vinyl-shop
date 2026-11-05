// 只讀：列出 KV 全部 cover6:* 鍵並 bulk get 值 → <WORK>/kv-dump.json（checkpoint：每 200 筆寫回，可接續）
import fs from 'node:fs';
const WORK = process.argv[2] || '/tmp/claude-0/-home-user/f1503c39-7ef0-590a-82ba-a39436835848/scratchpad/link-audit';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105', T = process.env.CLOUDFLARE_API_TOKEN;
const B = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`, H = { Authorization: `Bearer ${T}` };
const KF = `${WORK}/kv-keys.json`, VF = `${WORK}/kv-dump.json`;
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function api(url, opt = {}) {
  for (let a = 0; a < 6; a++) {
    try { const r = await fetch(url, { ...opt, headers: { ...H, ...(opt.headers || {}) }, signal: AbortSignal.timeout(30000) });
      if (r.ok) return await r.json(); console.log('HTTP', r.status); } catch (e) { console.log('ERR', e.message); }
    await sleep(2000 * (a + 1));
  }
  throw new Error('api fail ' + url);
}
let ks = fs.existsSync(KF) ? JSON.parse(fs.readFileSync(KF, 'utf8')) : { keys: [], cursor: '', done: false };
while (!ks.done) {
  const j = await api(`${B}/keys?prefix=cover6:&limit=1000${ks.cursor ? '&cursor=' + encodeURIComponent(ks.cursor) : ''}`);
  ks.keys.push(...j.result.map(x => x.name)); ks.cursor = j.result_info?.cursor || ''; ks.done = !ks.cursor || !j.result.length;
  fs.writeFileSync(KF, JSON.stringify(ks)); console.log('keys', ks.keys.length);
}
const vals = fs.existsSync(VF) ? JSON.parse(fs.readFileSync(VF, 'utf8')) : {};
const todo = [...new Set(ks.keys)].filter(k => !(k in vals)); console.log('values todo', todo.length);
for (let i = 0; i < todo.length; i += 100) {
  const batch = todo.slice(i, i + 100);
  const j = await api(`${B}/bulk/get`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ keys: batch, type: 'text' }) });
  for (const k of batch) { const raw = j.result?.values?.[k]; let v; try { v = JSON.parse(raw); } catch { v = { __raw: raw ?? null }; } vals[k] = v; }
  if ((i / 100) % 2 === 1 || i + 100 >= todo.length) { fs.writeFileSync(VF, JSON.stringify(vals)); console.log('values', Object.keys(vals).length); }
}
fs.writeFileSync(VF, JSON.stringify(vals)); console.log('done', Object.keys(vals).length);
