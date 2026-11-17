// game-lab/cards.js 烘進去的 spotifyUrl 稽核：bake 時沒查到 /spotify-search 就退回 /spotify-album-link（只比藝人、不比專輯名），會烘進同藝人別張。
import fs from 'node:fs';
import { titleMatch } from '../spotify-fill-20261106/match.mjs';
const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
import vm from 'node:vm';
const src = fs.readFileSync('game-lab/cards.js', 'utf8');
const box = { self: {}, module: { exports: {} } }; box.exports = box.module.exports;
vm.runInNewContext(src, box);
const raw = box.module.exports && Object.keys(box.module.exports).length ? box.module.exports : Object.values(box.self)[0];
const cards = Object.values(raw?.CARDS || raw?.cards || raw || {}).filter(c => c && c.id);
const out = [];
for (const c of cards) {
  if (!c.spotifyUrl) continue;
  const q = `artist=${encodeURIComponent(c.artist)}&album=${encodeURIComponent(c.album)}`;
  const sr = await fetch(`${W}/spotify-search?${q}`).then(r => r.ok ? r.json() : {}).catch(() => ({}));
  const o = await fetch('https://open.spotify.com/oembed?url=' + c.spotifyUrl).then(r => r.ok ? r.json() : null).catch(() => null);
  const title = o?.title || '';
  const how = title ? titleMatch(c.album, title) : '';
  const verdict = sr.spotifyUrl === c.spotifyUrl ? 'kv-same' : sr.spotifyUrl ? 'kv-differs' : how ? 'title-ok' : 'WRONG?';
  out.push({ id: c.id, artist: c.artist, album: c.album, baked: c.spotifyUrl, bakedTitle: title, kv: sr.spotifyUrl || '', how, verdict });
  await new Promise(s => setTimeout(s, 150));
}
fs.writeFileSync('batch-progress/spotify-fallback-20261117/gamelab-audit.json', JSON.stringify(out, null, 1));
const c = {}; for (const r of out) c[r.verdict] = (c[r.verdict] || 0) + 1;
console.log('cards', cards.length, 'with spotify', out.length, c);
for (const r of out.filter(r => r.verdict !== 'kv-same' && r.verdict !== 'title-ok')) console.log(r.verdict.padEnd(10), (r.artist + ' — ' + r.album).slice(0, 50).padEnd(50), '→', r.bakedTitle.slice(0, 50), r.verdict === 'kv-differs' ? '| KV→' + r.kv.slice(-22) : '');
