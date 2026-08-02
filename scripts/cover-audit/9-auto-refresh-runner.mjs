// 卡池封面稽核 步驟 9：等 Spotify 限流解除，然後自動跑步驟 8。
//
// 步驟 8 自己會拒絕在限流期間執行（exit 2）。這支就是守在旁邊、每次依 Retry-After
// 算出該睡多久，時間到再叫它一次，直到成功或放棄。設計成可以卸離 session 獨立跑，
// 所有輸出寫進 data/auto-refresh.log，session 斷掉也不影響。
//
// 用法：node scripts/cover-audit/9-auto-refresh-runner.mjs [--levels A] [--max-hours 12]
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');
const OUT = path.join(ROOT, 'scripts', 'cover-audit', 'data');
const LOG = path.join(OUT, 'auto-refresh.log');
const argv = process.argv.slice(2);
const argOf = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const LEVELS = argOf('--levels', 'A');
const MAX_MS = Number(argOf('--max-hours', 12)) * 3600 * 1000;

const log = (msg) => {
  const line = `[${new Date().toISOString().replace('T', ' ').slice(0, 19)}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG, line + '\n');
};
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Spotify 還要限流多久（秒）；0 代表可以動了
async function limitedFor() {
  try {
    const tok = await (await fetch('https://dip-vinyl-worker.kubinice06.workers.dev/spotify-token')).json();
    if (!tok.access_token) return 900;
    const r = await fetch('https://api.spotify.com/v1/search?q=abbey%20road&type=album&limit=1&market=TW',
      { headers: { Authorization: 'Bearer ' + tok.access_token } });
    if (r.status === 429) return Number(r.headers.get('retry-after') || 900);
    return r.ok ? 0 : 900;
  } catch { return 900; }
}

const runStep8 = () => new Promise(resolve => {
  const p = spawn(process.execPath,
    [path.join('scripts', 'cover-audit', '8-refresh-suspects.mjs'), '--levels', LEVELS],
    { cwd: ROOT });
  let out = '';
  p.stdout.on('data', d => { out += d; process.stdout.write(d); });
  p.stderr.on('data', d => { out += d; process.stderr.write(d); });
  p.on('close', code => resolve({ code, out }));
});

const started = Date.now();
log(`守候開始｜等級 ${LEVELS}｜最多等 ${MAX_MS / 3600000} 小時`);
while (Date.now() - started < MAX_MS) {
  const wait = await limitedFor();
  if (wait > 0) {
    // 多睡 60 秒緩衝，免得剛好卡在邊界又被回一次 429
    const ms = Math.min(wait + 60, 3600) * 1000;
    log(`Spotify 仍在限流，約 ${(wait / 3600).toFixed(2)} 小時；睡 ${Math.round(ms / 60000)} 分鐘後再看`);
    await sleep(ms);
    continue;
  }
  log('Spotify 已恢復，執行步驟 8');
  const { code, out } = await runStep8();
  if (code === 0) {
    const tail = out.trim().split('\n').slice(-3).join(' ｜ ');
    log(`步驟 8 完成（exit 0）：${tail}`);
    log('AUTO-REFRESH-DONE');
    process.exit(0);
  }
  if (code === 2) { log('步驟 8 說還在限流，繼續等'); await sleep(600000); continue; }
  log(`步驟 8 失敗（exit ${code}），10 分鐘後重試`);
  await sleep(600000);
}
log('AUTO-REFRESH-TIMEOUT：超過最長等待時間仍未完成');
process.exit(1);
