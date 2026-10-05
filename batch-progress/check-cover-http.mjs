// 逐張實測封面網址（跟著轉址到底）。CAA 的圖實際存在 archive.org，那邊個別檔案會回 500。
// 用法：node batch-progress/check-cover-http.mjs <stamp> <批名...>   結果寫 batch-progress/cover-http-<stamp>.json
import fs from 'node:fs';
const [stamp, ...batches] = process.argv.slice(2);
const OUT = `batch-progress/cover-http-${stamp}.json`;
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const jobs = [];
for (const b of batches) { const f = `onboarding-manifest-${b}-${stamp}.json`; if (!fs.existsSync(f)) continue;
  for (const a of JSON.parse(fs.readFileSync(f, 'utf8')).albums) jobs.push({ b, k: a.artist + '|' + a.album, url: a.cover.url, src: a.cover.source }); }
const RECHECK = process.argv.includes('--recheck-bad');
let i = 0;
async function w() { while (i < jobs.length) { const j = jobs[i++]; const id = j.b + '|' + j.k;
  if (prev[id] && (prev[id].status === 200 || !RECHECK)) continue;
  let st = 0, ct = '', n = 0;
  for (let a = 0; a < 2 && st !== 200; a++) { try { const r = await fetch(j.url, { redirect: 'follow', signal: AbortSignal.timeout(30000) }); st = r.status; ct = r.headers.get('content-type') || ''; n = (await r.arrayBuffer()).byteLength; } catch (e) { st = -1; } }
  prev[id] = { status: st, type: ct, bytes: n, src: j.src, url: j.url }; } }
await Promise.all(Array.from({ length: 10 }, w));
fs.writeFileSync(OUT, JSON.stringify(prev, null, 1));
const all = jobs.map(j => prev[j.b + '|' + j.k]).filter(Boolean);
const bad = jobs.filter(j => prev[j.b + '|' + j.k]?.status !== 200);
console.log(`封面 ${all.length} 張：200 的 ${all.length - bad.length}｜異常 ${bad.length}`);
for (const j of bad) console.log(`  ${prev[j.b + '|' + j.k].status} ${j.b} ${j.k} [${j.src}]`);
