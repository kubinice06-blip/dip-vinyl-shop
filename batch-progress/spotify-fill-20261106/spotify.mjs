// Spotify 搜尋補連結（可續跑）：album:"…" artist:"…"，只收「藝人正規化相同（任一掛名）＋專輯名完全相同或只差版本後綴／冠詞」。
// 模糊命中不收（寧缺勿錯）。進度逐筆寫 spotify.jsonl；遇 429 立即停。
// 用法：node spotify.mjs <budget> [own]   own＝用自己的 Spotify app（accounts.spotify.com client_credentials，憑證由代理注入）
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { normalize, titleMatch } from './match.mjs';
const D = 'batch-progress/spotify-fill-20261106/';
const [budgetArg, mode] = process.argv.slice(2);
const BUDGET = +budgetArg || 500;
const done = new Map();
if (fs.existsSync(D + 'spotify.jsonl')) for (const l of fs.readFileSync(D + 'spotify.jsonl', 'utf8').split('\n')) if (l.trim()) { const r = JSON.parse(l); done.set(r.key, r); }
const filled = new Set(JSON.parse(fs.readFileSync(D + 'plan-wikidata.json', 'utf8')).map(p => p.key));
const todo = JSON.parse(fs.readFileSync(D + 'missing.json', 'utf8')).filter(m => !filled.has(m.key) && !done.has(m.key));
console.log(`todo ${todo.length}, done ${done.size}, budget ${BUDGET}, mode ${mode || 'worker-app'}`);
let token = '';
async function getToken() {
  if (mode === 'own') {
    // 憑證由雲端代理注入：curl 的請求會被注入，Node fetch 不會（實測 invalid_client），所以換 token 走 curl
    const out = execFileSync('curl', ['-s', '-X', 'POST', '-H', 'Content-Type: application/x-www-form-urlencoded', '-d', 'grant_type=client_credentials', 'https://accounts.spotify.com/api/token']).toString();
    token = JSON.parse(out).access_token || '';
  } else token = (await (await fetch('https://dip-vinyl-worker.kubinice06.workers.dev/spotify-token')).json()).access_token || '';
  if (!token) throw new Error('no token');
}
await getToken();
let used = 0, linked = 0;
for (const m of todo) {
  if (used >= BUDGET) { console.log('budget reached'); break; }
  const q = encodeURIComponent(`album:"${m.album.replace(/"/g, '')}" artist:"${m.artist.replace(/"/g, '')}"`);
  let r = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=album&limit=10&market=TW`, { headers: { Authorization: 'Bearer ' + token } });
  used++;
  if (r.status === 401) { await getToken(); r = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=album&limit=10&market=TW`, { headers: { Authorization: 'Bearer ' + token } }); used++; }
  if (r.status === 429) { console.log(`429 retry-after ${r.headers.get('retry-after')}s — stop`); break; }
  if (!r.ok) { fs.appendFileSync(D + 'spotify.jsonl', JSON.stringify({ key: m.key, err: r.status }) + '\n'); continue; }
  const items = (await r.json()).albums?.items || [];
  const sa = normalize(m.artist);
  let pick = null, how = '';
  for (const it of items) {
    const artistOk = (it.artists || []).some(a => normalize(a.name) === sa) || (sa.length >= 4 && (it.artists || []).map(a => normalize(a.name)).join('') === sa);
    if (!artistOk) continue;
    const t = titleMatch(m.album, it.name);
    if (t === 'exact') { pick = it; how = t; break; }
    if (t === 'edition' && !pick) { pick = it; how = t; }
  }
  const row = { key: m.key, artist: m.artist, album: m.album, url: pick?.external_urls?.spotify || '', spName: pick?.name || '', how, near: pick ? '' : items.slice(0, 3).map(i => `${i.artists?.[0]?.name} — ${i.name}`).join(' | ') };
  fs.appendFileSync(D + 'spotify.jsonl', JSON.stringify(row) + '\n');
  if (row.url) linked++;
  await new Promise(s => setTimeout(s, 1500));
}
console.log(`used ${used}, linked ${linked}`);
