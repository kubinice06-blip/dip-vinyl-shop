#!/usr/bin/env node
// 替「還沒有標籤、所以落不進子曲風」的卡預熱 worker 的 /album-genres（它會把 Spotify／Last.fm 標籤寫進 KV 的 mapgenre3）。
// 跑完再執行 `node scripts/build-genre-tree.mjs --pull --write`，那些卡才進得了類型挑片的第二層。
//
//   node scripts/warm-album-genres.mjs [--all] [--delay-ms 1600]
//
// 預設只打「子曲風表沒有、且 data/rawgenres-cache.json 也沒有標籤」的卡；--all 改成全池沒有標籤的卡。
// worker 只在「有對應到曲風」時才寫 KV，所以失敗或查無都不會污染快取，可以重跑。
// ⚠ 每張卡會讓 worker 打一到兩次 Spotify。節流別調太快——Spotify 一旦 429，全站的封面查詢會一起受影響。
import fs from 'node:fs';

const args = process.argv.slice(2);
const ALL = args.includes('--all');
const DELAY = Math.max(800, Number(args[args.indexOf('--delay-ms') + 1]) || 1600);
const WORKER = process.env.DIP_ONBOARD_WORKER_BASE || 'https://dip-vinyl-worker.kubinice06.workers.dev';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const sub = JSON.parse(fs.readFileSync('card-subgenres.json', 'utf8'));
const cache = JSON.parse(fs.readFileSync('data/rawgenres-cache.json', 'utf8'));
const hasTag = r => cache[`${r[0]}|${r[1]}`.toLowerCase()];
const targets = seed.filter(r => !hasTag(r) && (ALL || !sub[`${r[0]}|${r[1]}`]));
console.log(`目標 ${targets.length} 張，間隔 ${DELAY} ms，預估 ${Math.round(targets.length * (DELAY + 900) / 60000)} 分鐘`);

let hit = 0, empty = 0, broken = 0, streak = 0, pauses = 0;
for (let i = 0; i < targets.length; i++) {
  const [artist, album] = targets[i];
  let shape = 'broken', cached = false;
  try {
    const r = await fetch(`${WORKER}/album-genres?` + new URLSearchParams({ artist, album }), { signal: AbortSignal.timeout(25000) });
    cached = r.headers.get('x-cache') === 'KV-HIT';   // 上次跑過的：沒有打到 Spotify，不必等
    const j = await r.json();
    // 正常回應一定帶 rawGenres；只有 {"genres":[]} 代表 worker 拿不到 Spotify token 或中途丟例外
    shape = !('rawGenres' in j) ? 'broken' : (j.genres?.length ? 'hit' : 'empty');
  } catch { shape = 'broken'; }
  if (shape === 'hit') { hit++; streak = 0; } else if (shape === 'empty') { empty++; streak = 0; } else { broken++; streak++; }
  if (streak >= 12) {
    pauses++; console.log(`⚠ 連續 ${streak} 次異常回應（疑似 Spotify 限流），暫停 90 秒（第 ${pauses} 次）`);
    if (pauses >= 4) { console.log('✘ 暫停四次仍未恢復，中止。已寫入的標籤都留在 KV，可稍後重跑。'); break; }
    await sleep(90000); streak = 0;
  }
  if ((i + 1) % 100 === 0) console.log(`  ${i + 1}/${targets.length}　有標籤 ${hit}｜查無 ${empty}｜異常 ${broken}`);
  if (!cached) await sleep(DELAY);
}
console.log(`完成：有標籤 ${hit}｜查無 ${empty}｜異常 ${broken}`);
