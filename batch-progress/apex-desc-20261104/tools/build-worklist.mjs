#!/usr/bin/env node
// 第 0 步：從 seed 撈全部頂點卡（排除《台客的復仇》）→ 用 Cloudflare KV bulk get 讀現行簡介 → worklist.json
// 讀取順序照 worker：desc2 → (CURATED_DESCS，不在此 repo) → desc4。兩鍵都讀，記下哪個是現行。
import fs from 'node:fs';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const OUT = 'batch-progress/apex-desc-20261104/worklist.json';
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const cjk = v => /[぀-ヿ㐀-鿿豈-﫿가-힯]/.test(String(v || ''));
const cards = seed.filter(r => ['hall', 'heresy', 'pearl'].includes(r[8]) && !(r[0] === '濁水溪公社' && r[1] === '台客的復仇'))
  .map(r => { const k = `${r[0].toLowerCase()}|${r[1].toLowerCase()}`; return { key: k, artist: r[0], album: r[1], year: r[6], tier: r[8], genres: r[5], k2: 'desc2:' + k, k4: 'desc4:' + k }; });
const keys = cards.flatMap(c => [c.k2, c.k4]);
const vals = {};
for (let i = 0; i < keys.length; i += 90) {
  const part = keys.slice(i, i + 90);
  const j = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/bulk/get`, {
    method: 'POST', headers: { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ keys: part }) })).json();
  if (!j.success) throw new Error(JSON.stringify(j.errors));
  Object.assign(vals, j.result.values);
}
const parse = v => { if (v == null) return null; try { const o = typeof v === 'string' ? JSON.parse(v) : v; return o.desc ?? null; } catch { return String(v); } };
for (const c of cards) {
  const d2 = parse(vals[c.k2]), d4 = parse(vals[c.k4]);
  c.has2 = d2 != null; c.has4 = d4 != null;
  c.desc = d2 ?? d4 ?? null; c.src = d2 != null ? 'desc2' : d4 != null ? 'desc4' : 'none';
  c.cjk = cjk(c.artist) || cjk(c.album);
  delete c.k2; delete c.k4;
}
fs.writeFileSync(OUT, JSON.stringify(cards, null, 1));
const cnt = (f) => cards.filter(f).length;
console.log(`頂點卡 ${cards.length}｜hall ${cnt(c=>c.tier==='hall')} heresy ${cnt(c=>c.tier==='heresy')} pearl ${cnt(c=>c.tier==='pearl')}`);
console.log(`desc2 ${cnt(c=>c.has2)}｜desc4 ${cnt(c=>c.has4)}｜沒有簡介 ${cnt(c=>c.src==='none')}`);
