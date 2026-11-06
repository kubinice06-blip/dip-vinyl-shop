import fs from 'node:fs';
import { titleMatch } from './match.mjs';
const D = 'batch-progress/spotify-fill-20261106/';
const miss = JSON.parse(fs.readFileSync(D + 'missing.json', 'utf8'));
const wd = JSON.parse(fs.readFileSync(D + 'wikidata.json', 'utf8'));
const out = fs.existsSync(D + 'wd-verified.json') ? JSON.parse(fs.readFileSync(D + 'wd-verified.json', 'utf8')) : {};
for (const m of miss) {
  const ids = wd[m.rgMbid]; if (!ids || out[m.key]) continue;
  const cands = [];
  for (const id of [...new Set(ids)].slice(0, 4)) {
    const j = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/album/${id}`).then(r => r.ok ? r.json() : null).catch(() => null);
    cands.push({ id, title: j?.title || '', ok: j ? titleMatch(m.album, j.title) : '' , alive: !!j });
    await new Promise(s => setTimeout(s, 250));
  }
  const best = cands.find(c => c.ok === 'exact') || cands.find(c => c.ok === 'edition') || null;
  out[m.key] = { artist: m.artist, album: m.album, cands, pick: best ? `https://open.spotify.com/album/${best.id}` : '', how: best?.ok || '' };
  if (Object.keys(out).length % 50 === 0) fs.writeFileSync(D + 'wd-verified.json', JSON.stringify(out, null, 1));
}
fs.writeFileSync(D + 'wd-verified.json', JSON.stringify(out, null, 1));
const v = Object.values(out);
console.log({ total: v.length, exact: v.filter(x => x.how === 'exact').length, edition: v.filter(x => x.how === 'edition').length, nomatch: v.filter(x => !x.pick && x.cands.some(c => c.alive)).length, dead: v.filter(x => !x.cands.some(c => c.alive)).length });
