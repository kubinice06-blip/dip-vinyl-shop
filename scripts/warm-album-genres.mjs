#!/usr/bin/env node
// 替「還沒有標籤、所以落不進子曲風」的卡預熱 worker 的 /album-genres（它會把 Spotify／Last.fm 標籤寫進 KV 的 mapgenre3）。
// 跑完再執行 `node scripts/build-genre-tree.mjs --pull --write`，那些卡才進得了類型挑片的第二層。
//
//   node scripts/warm-album-genres.mjs [--all] [--from 0] [--limit 450] [--workers 2] [--delay-ms 1100]
//
// 預設只打「子曲風表沒有、且 data/rawgenres-cache.json 也沒有標籤」的卡；--all 改成全池沒有標籤的卡。
// worker 只在「有對應到曲風」時才寫 KV，所以失敗或查無都不會污染快取，可以重跑。
//
// **分段跑**：一次前景呼叫只有十分鐘，整池要一個多小時，背景工作又有時限（2026-10-04 丟背景跑到 230 張被停掉）。
// 用 --from／--limit 切成每段約 450 張；目標清單在兩次重建之間是固定的，所以照結尾印的「下一段 --from」接下去即可，
// 全部跑完再重建一次子曲風表。
// ⚠ 每張卡會讓 worker 打一到兩次 Spotify。兩個 worker、間隔 1.1 秒實測零異常；再快就可能 429，連帶影響全站的封面查詢。
import fs from 'node:fs';

const args = process.argv.slice(2);
const num = (flag, dflt) => { const i = args.indexOf(flag); return i >= 0 && Number.isFinite(Number(args[i + 1])) ? Number(args[i + 1]) : dflt; };
const ALL = args.includes('--all');
const FROM = Math.max(0, num('--from', 0)), LIMIT = num('--limit', Infinity);
const WORKERS = Math.min(3, Math.max(1, num('--workers', 2))), DELAY = Math.max(800, num('--delay-ms', 1100));
const WORKER = process.env.DIP_ONBOARD_WORKER_BASE || 'https://dip-vinyl-worker.kubinice06.workers.dev';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const sub = JSON.parse(fs.readFileSync('card-subgenres.json', 'utf8'));
const cache = JSON.parse(fs.readFileSync('data/rawgenres-cache.json', 'utf8'));
const hasTag = r => cache[`${r[0]}|${r[1]}`.toLowerCase()];
const targets = seed.filter(r => !hasTag(r) && (ALL || !sub[`${r[0]}|${r[1]}`]));
const end = Math.min(targets.length, FROM + LIMIT);
console.log(`目標共 ${targets.length} 張；這一段跑第 ${FROM}–${end} 張，${WORKERS} 個 worker、間隔 ${DELAY} ms`);

let cursor = FROM, hit = 0, empty = 0, broken = 0, streak = 0, pauses = 0, stop = false;
async function run() {
  while (cursor < end && !stop) {
    const [artist, album] = targets[cursor++];
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
      if (pauses >= 3) { console.log('✘ 暫停三次仍未恢復，這一段中止。已寫入的標籤都留在 KV。'); stop = true; break; }
      await sleep(90000); streak = 0;
    }
    if (!cached) await sleep(DELAY);
  }
}
await Promise.all(Array.from({ length: WORKERS }, run));
console.log(`這一段完成：有標籤 ${hit}｜查無 ${empty}｜異常 ${broken}` + (cursor < targets.length ? `｜下一段 --from ${cursor}` : '｜全部跑完，可以重建子曲風表了'));
