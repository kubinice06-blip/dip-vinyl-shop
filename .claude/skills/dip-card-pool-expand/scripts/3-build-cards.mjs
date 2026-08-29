// 步驟 3：產卡 —— 去重選定名 → 打 /album-rating 取三軸 → 產出待匯入清單
// 用法：node 3-build-cards.mjs <步驟2的輸出檔> [輸出檔]
//
// 三軸沿用全站既有的同一套標準（不要自己另立評分規則）：
//   obscurity 冷門度   ← Last.fm 真實聽眾數（worker listenersToObscurity 分級）
//   classic   經典度   ← Haiku 依 AllMusic/Pitchfork/RYM 樂評共識
//   accessibility 硬蕊度 ← 同上（越前衛／越難入耳分數越高，勿當成「好聽度」）
import fs from 'fs';

const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const SEED = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop/seed_cards.json';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const inPath = process.argv[2];
const outPath = process.argv[3] || inPath.replace(/\.json$/, '-ready.json');
if (!inPath) { console.error('用法: node 3-build-cards.mjs <步驟2輸出檔> [輸出檔]'); process.exit(1); }

const rows = JSON.parse(fs.readFileSync(inPath, 'utf-8')).filter(r => r.src);
const norm = s => s.toLowerCase().replace(/[^a-z0-9ぁ-ヿ一-鿿]/g, '');
const hasCJK = s => /[ぁ-ヿ一-鿿]/.test(s || '');

// 同一張碟會有多種掛名（羅馬拼音／日文原文／加掛伴奏者）→ 選一個當卡名：
//   優先羅馬拼音（與現有卡池 5500+ 張的命名習慣一致），其次取掛名最短者（通常是主奏者本人）
function pickCanonical(list) {
  const latin = list.filter(x => !hasCJK(x.artist));
  return (latin.length ? latin : list).slice().sort((a, b) => a.artist.length - b.artist.length)[0];
}
const groups = new Map();
for (const r of rows) {
  const k = norm(r.title);
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push(r);
}
let cards = [...groups.values()].map(pickCanonical);
console.log(`有封面 ${rows.length} → 標題去重後 ${cards.length} 張`);

// 與現有卡池比對，排除已收錄的
const seed = JSON.parse(fs.readFileSync(SEED, 'utf-8'));
const seedKeys = new Set(seed.map(([a, b]) => norm(a) + '|' + norm(b)));
const before = cards.length;
cards = cards.filter(c => !seedKeys.has(norm(c.artist) + '|' + norm(c.title)));
console.log(`排除與現有卡池重複 ${before - cards.length} 張 → 實際新增 ${cards.length} 張`);

const out = [];
for (const c of cards) {
  const q = `artist=${encodeURIComponent(c.artist)}&album=${encodeURIComponent(c.title)}`;
  let rate = null;
  for (let i = 0; i < 3 && !rate; i++) {
    try {
      const r = await fetch(`${W}/album-rating?${q}`, { signal: AbortSignal.timeout(30000) });
      if (r.ok) { const j = await r.json(); if (j.classic && j.obscurity && j.accessibility) rate = j; }
    } catch (e) { }
    if (!rate) await sleep(1500);
  }
  if (!rate) { console.log(`✗ 評分失敗 ${c.artist} - ${c.title}`); continue; }
  out.push({
    artist: c.artist, album: c.title,
    classic: rate.classic, obscurity: rate.obscurity, accessibility: rate.accessibility,
    coverUrl: c.url, coverSrc: c.src,
    listeners: rate._listeners ?? null, obSrc: rate._obscuritySource,
  });
  console.log(`✓ [${rate.classic},${rate.obscurity},${rate.accessibility}] ${c.artist} - ${c.title}  (listeners ${rate._listeners ?? '?'} / ${rate._obscuritySource})`);
  await sleep(400);
}
fs.writeFileSync(outPath, JSON.stringify(out, null, 1));

const rarity = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common'; };
const dist = f => out.reduce((m, c) => (m[f(c)] = (m[f(c)] || 0) + 1, m), {});
console.log(`\n完成 ${out.length} 張 → ${outPath}`);
console.log('classic      ', JSON.stringify(dist(c => c.classic)));
console.log('obscurity    ', JSON.stringify(dist(c => c.obscurity)));
console.log('accessibility', JSON.stringify(dist(c => c.accessibility)));
console.log('稀有度       ', JSON.stringify(dist(c => rarity(c.classic, c.obscurity, c.accessibility))));

// ── 品質警示：同名藝人會讓 Last.fm 抓到錯的聽眾數 → 冷門度失真 → 稀有度失真 ──
// 例：日本前衛爵士團 Air 的《Air》被算到法國電子雙人組 Air 的聽眾數（66856），冷門度硬生生從 5 掉到 3。
const suspects = out.filter(c => c.obSrc === 'lastfm' && c.listeners > 20000);
if (suspects.length) {
  console.log(`\n⚠ 聽眾數異常高的 ${suspects.length} 張（冷門廠牌目錄不該有這種數字，多半是同名藝人誤配，請人工覆核）：`);
  suspects.forEach(c => console.log(`   ${c.artist} - ${c.album}  listeners=${c.listeners} → obscurity=${c.obscurity}`));
}
const aiFallback = out.filter(c => c.obSrc === 'ai');
if (aiFallback.length) console.log(`\nℹ 冷門度靠 AI 推估（Last.fm 查無）的有 ${aiFallback.length} 張，數值較不可靠。`);
