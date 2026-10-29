// 判定 KV cover6 的 spotifyUrl：失效（oEmbed 404）／錯版本／錯專輯 → <WORK>/sp-issues.json
import fs from 'node:fs';
import { ROOT, DEF_WORK, albumMatch, badWords } from './common.mjs';
const WORK = process.argv[2] || DEF_WORK;
const kv = JSON.parse(fs.readFileSync(`${WORK}/kv-dump.json`, 'utf8'));
const oe = JSON.parse(fs.readFileSync(`${WORK}/sp-oembed.json`, 'utf8'));
const seed = JSON.parse(fs.readFileSync(`${ROOT}/seed_cards.json`, 'utf8'));
const seedBy = new Map(); for (const r of seed) seedBy.set(`cover6:${r[0].toLowerCase()}|${r[1].toLowerCase()}`, r);
const fixed = new Set(JSON.parse(fs.readFileSync(`${ROOT}/batch-progress/spotify-link-audit/2026-10-28/version-fix-plan-2026-10-27.json`, 'utf8')).map(x => x.key));
// 10-27 稽核已人工覆核放行的旗標（flags.json 有、badkeys.json 沒有）
const SPA = '/tmp/claude-0/-home-user/f1503c39-7ef0-590a-82ba-a39436835848/scratchpad/sp-audit';
const priorOk = new Set(); try { const f = JSON.parse(fs.readFileSync(`${SPA}/flags.json`, 'utf8')), b = new Set(JSON.parse(fs.readFileSync(`${SPA}/badkeys.json`, 'utf8'))); for (const x of [...f.kw, ...f.mism]) if (!b.has(x[0])) priorOk.add(x[0]); } catch {}
const RE = /^https:\/\/open\.spotify\.com\/album\/[A-Za-z0-9]{22}$/;
const stat = { kvKeys: 0, withSpotify: 0, emptySpotify: 0, nullSpotify: 0, inSeed: 0, badFormat: 0, dead: 0, unknown: 0, wrongVersion: 0, albumMismatch: 0, albumPartial: 0, skippedFixed: 0, skippedPriorOk: 0 };
const issues = [];
for (const [k, v] of Object.entries(kv)) {
  stat.kvKeys++;
  if (v.spotifyUrl === '') { stat.emptySpotify++; continue; }
  if (!v.spotifyUrl) { stat.nullSpotify++; continue; }
  stat.withSpotify++;
  const card = seedBy.get(k); if (card) stat.inSeed++;
  const body = k.slice(7), p = body.indexOf('|');
  const artist = card?.[0] ?? body.slice(0, p), album = card?.[1] ?? body.slice(p + 1);
  const o = oe[k] || {}; const flags = [];
  if (!RE.test(v.spotifyUrl)) { flags.push('bad-format'); stat.badFormat++; }
  let am = null, bw = [];
  if (o.status === 404 || o.status === 400) { flags.push('dead:' + o.status); stat.dead++; }
  else if (o.status !== 200) { flags.push('unknown:' + o.status); stat.unknown++; }
  else {
    bw = badWords(o.title, album, artist); am = albumMatch(album, o.title);
    if (bw.length) { flags.push('wrong-version:' + bw.join('+')); stat.wrongVersion++; }
    if (am === 'mismatch') { flags.push('album-mismatch'); stat.albumMismatch++; }
    else if (am === 'partial') { flags.push('album-partial'); stat.albumPartial++; }
  }
  if (!flags.length) continue;
  if (fixed.has(k) && !flags.some(f => f.startsWith('dead'))) { stat.skippedFixed++; continue; }
  if (priorOk.has(k) && !flags.some(f => f.startsWith('dead'))) { stat.skippedPriorOk++; continue; }
  issues.push({ key: k, artist, album, inSeed: !!card, spotifyUrl: v.spotifyUrl, spotifyTitle: o.title ?? null, oembedStatus: o.status ?? null, rgMbid: v.rgMbid || null, spotifyChecked: v.spotifyChecked || null, albumMatch: am, flags });
}
fs.writeFileSync(`${WORK}/sp-issues.json`, JSON.stringify({ stat, issues }, null, 1));
console.log(stat, issues.length);
