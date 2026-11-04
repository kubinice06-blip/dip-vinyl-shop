#!/usr/bin/env node
// 頂點卡簡介重寫的每批工具（在 repo 根執行）。
//   node batch-progress/apex-desc-20261104/tools/ad.mjs cards  ad-01   產卡單（含現行簡介）→ desc-tools/batches/cards/ad-01-cards.json
//   node … ad.mjs before ad-01   讀 KV 現值存 kv-before-ad-01.json（desc2＋desc4 都存，null 也存）
//   node … ad.mjs bulk   ad-01   由 output 產 publish-stage/kv-ad-01-<stamp>.json（desc2 一律寫；原有 desc4 或 CJK 卡也寫 desc4）
//   node … ad.mjs manifest ad-01 [--write]  同步 onboarding manifest 的 description.text
import fs from 'node:fs';
const [cmd, batch, ...rest] = process.argv.slice(2);
const DIR = 'batch-progress/apex-desc-20261104';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const STAMP = '20261104';
const cjk = v => /[぀-ヿ㐀-鿿豈-﫿가-힯]/.test(String(v || ''));
const plan = JSON.parse(fs.readFileSync(`${DIR}/batches.json`, 'utf8'));
const keys = plan[batch]; if (!keys) throw new Error('沒有這一批：' + batch);
const wl = new Map(JSON.parse(fs.readFileSync(`${DIR}/worklist.json`, 'utf8')).map(c => [c.key, c]));
const tri = new Map(JSON.parse(fs.readFileSync(`${DIR}/triage.json`, 'utf8')).map(c => [c.key, c]));
async function bulkGet(ks) {
  const vals = {};
  for (let i = 0; i < ks.length; i += 90) {
    const j = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/bulk/get`, {
      method: 'POST', headers: { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ keys: ks.slice(i, i + 90) }) })).json();
    if (!j.success) throw new Error(JSON.stringify(j.errors));
    Object.assign(vals, j.result.values);
  }
  return vals;
}
const outRows = () => fs.readdirSync('desc-tools/batches/output').filter(f => f.startsWith(batch + '-out-'))
  .flatMap(f => JSON.parse(fs.readFileSync('desc-tools/batches/output/' + f, 'utf8')));

if (cmd === 'cards') {
  const cards = keys.map(k => { const c = wl.get(k); const t = tri.get(k) || {};
    return { key: k, artist: c.artist, album: c.album, year: c.year, tier: c.tier, genres: c.genres, currentDesc: c.desc, triageReason: t.reason || '' }; });
  fs.writeFileSync(`desc-tools/batches/cards/${batch}-cards.json`, JSON.stringify(cards, null, 1));
  console.log(`卡單 ${cards.length} 張 → desc-tools/batches/cards/${batch}-cards.json`);
}
if (cmd === 'before') {
  const ks = keys.flatMap(k => ['desc2:' + k, 'desc4:' + k]);
  const v = await bulkGet(ks); const out = ks.map(k => ({ key: k, value: v[k] ?? null }));
  fs.writeFileSync(`${DIR}/kv-before-${batch}.json`, JSON.stringify(out, null, 1));
  console.log(`舊值 ${out.length} 鍵（非 null ${out.filter(x => x.value != null).length}）→ ${DIR}/kv-before-${batch}.json`);
}
if (cmd === 'bulk') {
  const before = new Map(JSON.parse(fs.readFileSync(`${DIR}/kv-before-${batch}.json`, 'utf8')).map(x => [x.key, x.value]));
  const rows = new Map(outRows().map(r => [r.key, r]));
  const puts = [];
  for (const k of keys) {
    const r = rows.get(k); if (!r) { console.log('缺稿', k); continue; }
    const c = wl.get(k); const value = JSON.stringify({ desc: r.desc });
    puts.push({ key: 'desc2:' + k, value });
    if (before.get('desc4:' + k) != null || cjk(c.artist) || cjk(c.album)) puts.push({ key: 'desc4:' + k, value });
  }
  const f = `publish-stage/kv-${batch}-${STAMP}.json`; fs.mkdirSync('publish-stage', { recursive: true });
  fs.writeFileSync(f, JSON.stringify(puts)); console.log(`${puts.length} 鍵（${rows.size} 張）→ ${f}`);
}
if (cmd === 'manifest') {
  const write = rest.includes('--write');
  const rows = new Map(outRows().map(r => [r.key, r]));
  const files = fs.readdirSync('.').filter(f => /^onboarding-manifest-.*\.json$/.test(f));
  let hits = 0;
  for (const f of files) {
    const raw = fs.readFileSync(f, 'utf8'); const m = JSON.parse(raw); let ch = 0;
    for (const a of m.albums || []) {
      const k = `${String(a.artist || '').trim().toLowerCase()}|${String(a.album || '').trim().toLowerCase()}`;
      const r = rows.get(k);
      if (r && a.description && typeof a.description === 'object' && a.description.text !== r.desc) { a.description.text = r.desc; ch++; }
    }
    if (ch) { hits += ch; console.log(f, ch); if (write) fs.writeFileSync(f, JSON.stringify(m, null, raw.includes('\n  "') ? 2 : raw.includes('\n "') ? 1 : 0) + (raw.endsWith('\n') ? '\n' : '')); }
  }
  console.log(`manifest 需同步 ${hits} 處${write ? '（已寫）' : '（乾跑）'}`);
}
