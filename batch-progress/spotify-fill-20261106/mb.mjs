// MusicBrainz release-group 底下發行版的 url-rels → Spotify 專輯連結（免配額，1.1 秒一張，可續跑）；oEmbed 核專輯名
import fs from 'node:fs';
import { titleMatch } from './match.mjs';
const D = 'batch-progress/spotify-fill-20261106/';
const filled = new Set([...JSON.parse(fs.readFileSync(D + 'plan-wikidata.json', 'utf8')), ...JSON.parse(fs.readFileSync(D + 'applied-spotify-1.json', 'utf8'))].map(p => p.key));
const done = new Map();
if (fs.existsSync(D + 'mb.jsonl')) for (const l of fs.readFileSync(D + 'mb.jsonl', 'utf8').split('\n')) if (l.trim()) { const r = JSON.parse(l); done.set(r.key, r); }
const todo = JSON.parse(fs.readFileSync(D + 'missing.json', 'utf8')).filter(m => m.rgMbid && !filled.has(m.key) && !done.has(m.key));
console.log('todo', todo.length);
const UA = { 'User-Agent': 'dip-vinyl-repair/1.0 (https://dipvinyl.tw)' };
for (const m of todo) {
  let url = '', title = '', how = '', err = '';
  try {
    const r = await fetch(`https://musicbrainz.org/ws/2/release?release-group=${m.rgMbid}&inc=url-rels&fmt=json&limit=100`, { headers: UA });
    if (!r.ok) err = 'mb-' + r.status;
    else for (const rel of (await r.json()).releases || []) {
      const u = (rel.relations || []).map(x => x.url?.resource || '').find(u => /^https:\/\/open\.spotify\.com\/album\/[A-Za-z0-9]+/.test(u));
      if (u) { url = u.replace(/\?.*$/, ''); break; }
    }
    if (url) {
      const o = await fetch('https://open.spotify.com/oembed?url=' + url).then(r => r.ok ? r.json() : null).catch(() => null);
      title = o?.title || ''; how = o ? titleMatch(m.album, title) : '';
    }
  } catch (e) { err = String(e.message || e).slice(0, 60); }
  fs.appendFileSync(D + 'mb.jsonl', JSON.stringify({ key: m.key, artist: m.artist, album: m.album, url, title, how, err }) + '\n');
  await new Promise(s => setTimeout(s, 1100));
}
console.log('mb finished');
