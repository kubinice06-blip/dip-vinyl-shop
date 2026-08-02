// 卡池封面稽核 步驟 1：彙整全卡池卡單，並直接從 Cloudflare KV bulk get 讀出既有 cover6: 快取。
//
// 為什麼不逐張打 worker /spotify-search：cover6 是永久快取，KV 裡已經有的直接讀最快、
// 也完全不碰 Spotify。bulk get 一次 100 把 key，7 千多張只要 ~80 個請求。
// 讀不到的（KV miss）才在步驟 2 交給 worker 去補。
//
// 用法：node scripts/cover-audit/1-collect-cards.mjs
// 產出：scripts/cover-audit/data/cards.json（卡單）、data/kv-covers.json（KV 現值）
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd());
const OUT = path.join(ROOT, 'scripts', 'cover-audit', 'data');
fs.mkdirSync(OUT, { recursive: true });

const ACCOUNT = '3a23f905e8f31d91c85050f2ed304321';
const NS = '5f65e74b17d644b68a3f542b08a5c105';
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
if (!TOKEN) { console.error('缺 CLOUDFLARE_API_TOKEN'); process.exit(1); }
const BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/storage/kv/namespaces/${NS}`;
const H = { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };

// ── 卡單 ──
const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const apex = JSON.parse(fs.readFileSync(path.join(ROOT, 'apex_pool.json'), 'utf8'));

const cards = new Map();   // key → { artist, album, year, genres, sources[] }
const add = (artist, album, genres, year, source) => {
  const key = `${artist.toLowerCase()}|${album.toLowerCase()}`;
  const hit = cards.get(key);
  if (hit) { if (!hit.sources.includes(source)) hit.sources.push(source); return; }
  cards.set(key, { key, artist, album, genres: genres || [], year: year ?? null, sources: [source] });
};

// seed_cards：[artist, album, x, y, z, [genres], year]
for (const r of seed) add(r[0], r[1], r[5], r[6], 'seed');
// apex_pool：{ hall|pearl|heresy: [[artist, album, [genres], year], …] }
for (const [tier, rows] of Object.entries(apex)) for (const r of rows) add(r[0], r[1], r[2], r[3], `apex:${tier}`);

const list = [...cards.values()];
fs.writeFileSync(path.join(OUT, 'cards.json'), JSON.stringify(list, null, 1));
console.log(`卡單：${list.length} 張（seed ${seed.length}、apex ${Object.values(apex).flat().length}，去重後）`);

// ── KV bulk get ──
async function bulkGet(keys) {
  for (let attempt = 1; ; attempt++) {
    const r = await fetch(BASE + '/bulk/get', { method: 'POST', headers: H, body: JSON.stringify({ keys }) });
    if (r.ok) {
      const j = await r.json();
      if (j.success) return j.result.values || j.result;
      throw new Error(JSON.stringify(j.errors));
    }
    if (attempt >= 4) throw new Error(`bulk get HTTP ${r.status}`);
    await new Promise(s => setTimeout(s, 1500 * attempt));
  }
}

const covers = {};
let hits = 0;
for (let i = 0; i < list.length; i += 100) {
  const slice = list.slice(i, i + 100);
  const vals = await bulkGet(slice.map(c => `cover6:${c.key}`));
  for (const c of slice) {
    const raw = vals[`cover6:${c.key}`];
    if (raw == null) { covers[c.key] = null; continue; }
    hits++;
    try { covers[c.key] = typeof raw === 'string' ? JSON.parse(raw) : raw; }
    catch { covers[c.key] = { parseError: String(raw).slice(0, 200) }; }
  }
  process.stdout.write(`\rKV 讀取 ${Math.min(i + 100, list.length)}/${list.length}（命中 ${hits}）`);
}
console.log();
fs.writeFileSync(path.join(OUT, 'kv-covers.json'), JSON.stringify(covers, null, 1));

const miss = list.filter(c => covers[c.key] == null).length;
const noImage = list.filter(c => covers[c.key] && !covers[c.key].imageUrl).length;
const caa = list.filter(c => covers[c.key]?.coverSource === 'coverartarchive').length;
console.log(`KV 命中 ${hits}｜未快取 ${miss}｜快取但無封面 ${noImage}｜CAA 來源 ${caa}`);
