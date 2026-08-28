#!/usr/bin/env node
// 查「某張碟在不在現有卡池裡」。策展 agent 一律用這支，不要自己 grep。
//
// 為什麼：grep 會被三件事騙——(1) U+2010–2015 連字號（a‐ha、B‐52s、Drive‐By Truckers）
// 在 ASCII 下零命中；(2) C locale 的 grep -i 不摺疊重音大寫（ROSALÍA 誤判為零）；
// (3) apex_pool.json 是物件不是陣列，直接迭代會拋錯被吞掉，634 張王牌整批漏掉。
// 這支用與 scripts/pool-keys.mjs 相同的正規化，三個來源都涵蓋。
//
// 用法（在 repo 根目錄執行）：
//   node scripts/pool-check.mjs "Artist|Album"
//   node check.mjs "Ennio Morricone|The Good, the Bad and the Ugly"
//   node check.mjs --file list.txt      # 每行一筆 artist|album
//   echo "A|B" | node check.mjs --stdin
import fs from 'node:fs';
const R = '/home/user/dip-vinyl-shop';
const norm = s => String(s || '').toLowerCase()
  .replace(/[‐-―－]/g, '-').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const key = (a, b) => norm(a) + '|' + norm(b);

const pool = new Map();                       // key → 來源說明
const add = (a, b, src) => { const k = key(a, b); if (!pool.has(k)) pool.set(k, `${src}｜${a} — ${b}`); };
for (const r of JSON.parse(fs.readFileSync(`${R}/seed_cards.json`, 'utf8'))) add(r[0], r[1], 'seed');
const apex = JSON.parse(fs.readFileSync(`${R}/apex_pool.json`, 'utf8'));
for (const t of Object.keys(apex)) for (const r of apex[t]) add(r[0], r[1], `apex:${t}`);
for (const f of fs.readdirSync(R).filter(x => /^onboarding-manifest-.*json$/.test(x)))
  for (const a of (JSON.parse(fs.readFileSync(`${R}/${f}`, 'utf8')).albums || [])) add(a.artist, a.album, f.replace(/^onboarding-manifest-|\.json$/g, ''));

// 同藝人的其他作品：判斷「這位藝人池裡有沒有、有的話收了哪幾張」
const byArtist = new Map();
const addArt = (a, b, src) => { const n = norm(a); if (!byArtist.has(n)) byArtist.set(n, []); byArtist.get(n).push(`${b} [${src}]`); };
for (const r of JSON.parse(fs.readFileSync(`${R}/seed_cards.json`, 'utf8'))) addArt(r[0], r[1], 'seed');
for (const t of Object.keys(apex)) for (const r of apex[t]) addArt(r[0], r[1], `apex:${t}`);
for (const f of fs.readdirSync(R).filter(x => /^onboarding-manifest-.*json$/.test(x)))
  for (const a of (JSON.parse(fs.readFileSync(`${R}/${f}`, 'utf8')).albums || [])) addArt(a.artist, a.album, 'manifest');

// 專輯名 → 所有掛名，供掛名分裂偵測用
const byAlbum = new Map();
{
  const push = (a, b, src) => { const n = norm(b); if (!byAlbum.has(n)) byAlbum.set(n, []); byAlbum.get(n).push({ a, src }); };
  for (const r of JSON.parse(fs.readFileSync(`${R}/seed_cards.json`, 'utf8'))) push(r[0], r[1], 'seed');
  for (const t of Object.keys(apex)) for (const r of apex[t]) push(r[0], r[1], `apex:${t}`);
  for (const f of fs.readdirSync(R).filter(x => /^onboarding-manifest-.*json$/.test(x)))
    for (const a of (JSON.parse(fs.readFileSync(`${R}/${f}`, 'utf8')).albums || [])) push(a.artist, a.album, 'manifest');
}
let warn = 0;

const args = process.argv.slice(2);
let lines = [];
if (args[0] === '--file') lines = fs.readFileSync(args[1], 'utf8').split('\n');
else if (args[0] === '--stdin') lines = fs.readFileSync(0, 'utf8').split('\n');
else lines = args;
lines = lines.map(s => s.trim()).filter(Boolean);

let have = 0, miss = 0;
for (const line of lines) {
  const i = line.indexOf('|');
  if (i < 0) { console.log(`?? 格式錯誤（需 artist|album）: ${line}`); continue; }
  const a = line.slice(0, i).trim(), b = line.slice(i + 1).trim();
  const hit = pool.get(key(a, b));
  if (hit) { have++; console.log(`[池內已有] ${a} | ${b}\n           ← ${hit}`); continue; }

  // 同專輯名但藝人掛名不同 → 極可能是同一張碟，只是寫法不同。
  // 2026-08-23 補：福音線用「Rev. Gary Davis」查出可收，正式掛名「Reverend Gary Davis」
  // 其實池內已有。這正是 audits/pool-artist-name-splits.md 記錄的掛名分裂問題
  // （John Coltrane / John Coltrane Quartet、Ms. Lauryn Hill / Lauryn Hill 等 6 組）。
  // 光靠 artist|album 字串鍵擋不住，所以這裡改用「專輯名」反查並列出所有掛名。
  const sameAlbum = (byAlbum.get(norm(b)) || []).filter(r => norm(r.a) !== norm(a));
  miss++;
  const other = byArtist.get(norm(a));
  console.log(`[可收] ${a} | ${b}`);
  if (sameAlbum.length) {
    console.log(`       ⚠ 池內有同名專輯但掛名不同，請確認是不是同一張碟：`);
    for (const r of sameAlbum.slice(0, 5)) console.log(`         「${r.a}」[${r.src}]`);
    warn++;
  }
  // 同藝人下、專輯名互為子字串 → 常常是「簡題 vs 全題」的同一張碟。
  // 2026-08-28 補：新世紀線的 Yutaka Hirose《Soundscape 2: Nova》池內作《Nova》，
  // artist 相同但 album 鍵不同，上面的等值比對與同名反查都抓不到，是靠人工雙查才發現的。
  if (other) {
    const nb = norm(b);
    const near = other.filter(t => {
      const na = norm(t.replace(/\s*\[[^\]]*\]\s*$/, ''));
      return na && na !== nb && (na.includes(nb) || nb.includes(na));
    });
    if (near.length) {
      console.log(`       ⚠ 同藝人有題名互為子字串的碟，可能是簡題／全題的同一張：`);
      for (const t of near.slice(0, 5)) console.log(`         「${t}」`);
      warn++;
    }
    console.log(`       同藝人池內已有 ${other.length} 張：${other.slice(0, 8).join('; ')}${other.length > 8 ? ' …' : ''}`);
  }
  else console.log(`       此藝人池內完全沒有`);
}
console.log(`\n合計 ${lines.length} 筆：池內已有 ${have}、可收 ${miss}（其中 ${warn} 筆有同名專輯不同掛名的警告，請逐一確認）`);
