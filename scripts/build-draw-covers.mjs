#!/usr/bin/env node
// 抽卡動畫的「分類封面池」：每個曲風節點挑最多 N 張該節點卡片的封面，給閃卡迴圈用
//（2026-10-20 店主：抽搖滾不要閃出 2Pac）。
//
//   node scripts/build-draw-covers.mjs [--pull] [--write]
//
//   --pull   從 Cloudflare KV 拉 cover6 快取（worker /spotify-search 的永久快取，需 CLOUDFLARE_API_TOKEN），
//            存 data/covers-cache.json；否則沿用既有快取。另外一律合併 onboarding-manifest 裡的封面。
//   --write  寫出 draw-covers/<大類>.json（每大類一檔、前端選到大類才載）；預設只印報告。
//
// 每檔 { urls: [url…], nodes: { "rock": [idx…], "rock/punk-wave": [idx…], "rock/punk-wave/post-punk": [idx…] } }，
// 同一張封面只存一次（一張卡會同時出現在三層）。每節點最多 PER_NODE 張。
// 挑選偏好快的 CDN（i.scdn.co、mzstatic）勝過 coverartarchive（要跟一次轉址到 archive.org），
// 其餘隨機；閃卡只需要「看起來是這一類」，不需要完整清單。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PULL = process.argv.includes('--pull');
const WRITE = process.argv.includes('--write');
const PER_NODE = { 1: 20, 2: 16, 3: 10 };
const CACHE = path.join(ROOT, 'data', 'covers-cache.json');

const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const sub = JSON.parse(fs.readFileSync(path.join(ROOT, 'card-subgenres.json'), 'utf8'));
const lk = (a, b) => `${a}|${b}`.toLowerCase();

async function pullCovers() {
  const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
  if (!TOKEN) { console.error('缺少 CLOUDFLARE_API_TOKEN，無法 --pull'); process.exit(1); }
  const ACCOUNT = '3a23f905e8f31d91c85050f2ed304321';
  const NS = '5f65e74b17d644b68a3f542b08a5c105';
  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/storage/kv/namespaces/${NS}/bulk/get`;
  const keys = seed.map(r => `cover6:${lk(r[0], r[1])}`);
  const out = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
  let hit = 0;
  for (let i = 0; i < keys.length; i += 100) {
    const chunk = keys.slice(i, i + 100);
    let json = null;
    for (let t = 0; t < 3; t++) {
      try {
        const res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ keys: chunk }) });
        json = await res.json();
        if (json.success) break;
      } catch { /* retry */ }
      await new Promise(r => setTimeout(r, 1500));
    }
    if (!json?.success) continue;
    for (const [k, v] of Object.entries(json.result?.values || json.result || {})) {
      let d = (v && typeof v === 'object' && 'value' in v) ? v.value : v;
      if (d == null) continue;
      try { d = typeof d === 'string' ? JSON.parse(d) : d; } catch { continue; }
      if (d?.imageUrl) { out[k.replace(/^cover6:/, '')] = d.imageUrl; hit++; }
    }
    if ((i / 100) % 20 === 0) { fs.writeFileSync(CACHE, JSON.stringify(out), 'utf8'); }   // 容器會重啟，邊拉邊存
    process.stdout.write(`\rKV 拉取 ${Math.min(i + 100, keys.length)}/${keys.length} 命中 ${hit}`);
  }
  console.log();
  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  fs.writeFileSync(CACHE, JSON.stringify(out), 'utf8');
  return out;
}

const kv = PULL ? await pullCovers() : (fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {});
// manifest 封面（上架時人工／腳本解析過的）
const manifest = {};
for (const f of fs.readdirSync(ROOT).filter(f => f.startsWith('onboarding-manifest-') && f.endsWith('.json'))) {
  let m; try { m = JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8')); } catch { continue; }
  for (const a of (m.albums || [])) { const u = a.cover?.url; if (a.artist && a.album && u) manifest[lk(a.artist, a.album)] = u; }
}
const coverOf = (a, b) => manifest[lk(a, b)] || kv[lk(a, b)] || '';
const rank = u => /i\.scdn\.co|mzstatic\.com/.test(u) ? 0 : /bcbits|discogs/.test(u) ? 1 : 2;

// 節點 → 候選封面
const byNode = {};
let withCover = 0;
for (const r of seed) {
  const u = coverOf(r[0], r[1]);
  if (!u) continue;
  withCover++;
  const g = (r[5] || [])[0];
  const nodes = new Set([g, ...((sub[`${r[0]}|${r[1]}`] || []).flatMap(p => { const s = p.split('/'); return [s.slice(0, 2).join('/'), ...(s.length > 2 ? [p] : [])]; }))]);
  for (const n of nodes) { if (!n) continue; (byNode[n] = byNode[n] || []).push(u); }
}
// 每節點：先依 CDN 偏好分組、組內洗牌，取前 PER_NODE；同一張封面不重複
const picked = {};
for (const [n, list] of Object.entries(byNode)) {
  const uniq = [...new Set(list)];
  const shuffled = uniq.map(u => [rank(u) + Math.random() * 0.999, u]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  if (shuffled.length >= 4) picked[n] = shuffled.slice(0, PER_NODE[n.split('/').length] || 10);
}
// 按大類分檔，檔內去重
const files = {};
for (const [n, list] of Object.entries(picked)) {
  const g = n.split('/')[0];
  const f = files[g] = files[g] || { urls: [], index: new Map(), nodes: {} };
  f.nodes[n] = list.map(u => { if (!f.index.has(u)) { f.index.set(u, f.urls.length); f.urls.push(u); } return f.index.get(u); });
}
console.log(`卡池 ${seed.length}｜有封面 ${withCover}（manifest ${Object.keys(manifest).length}、KV ${Object.keys(kv).length}）｜節點 ${Object.keys(picked).length}`);
const thin = Object.entries(byNode).filter(([, l]) => new Set(l).size < 8).map(([n, l]) => `${n}(${new Set(l).size})`);
if (thin.length) console.log('封面偏少的節點:', thin.join('、'));
if (WRITE) {
  const dir = path.join(ROOT, 'draw-covers');
  fs.mkdirSync(dir, { recursive: true });
  for (const old of fs.readdirSync(dir)) fs.unlinkSync(path.join(dir, old));
  const sizes = [];
  for (const [g, f] of Object.entries(files)) {
    const target = path.join(dir, `${g}.json`);
    fs.writeFileSync(target, JSON.stringify({ urls: f.urls, nodes: f.nodes }) + '\n', 'utf8');
    sizes.push(`${g} ${(fs.statSync(target).size / 1024).toFixed(0)}KB/${f.urls.length}張`);
  }
  console.log('已寫出 draw-covers/：' + sizes.join('、'));
} else console.log('(未加 --write，未寫檔)');
