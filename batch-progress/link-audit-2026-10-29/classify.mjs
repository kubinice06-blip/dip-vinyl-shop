// 套用 verdicts.json 人工裁定，把旗標分成 wrong / review / gone / ok（誤報）→ <WORK>/classified.json，並產生修補目標清單
import fs from 'node:fs';
import { DEF_WORK } from './common.mjs';
const WORK = process.argv[2] || DEF_WORK;
const here = new URL('.', import.meta.url).pathname;
const V = JSON.parse(fs.readFileSync(`${here}verdicts.json`, 'utf8'));
const ap = JSON.parse(fs.readFileSync(`${WORK}/ap-issues.json`, 'utf8'));
const sp = JSON.parse(fs.readFileSync(`${WORK}/sp-issues.json`, 'utf8'));
const lc = s => String(s || '').toLowerCase().normalize('NFKC').trim();
function lookupVerdict(table, it, title) {
  for (const verdict of ['wrong', 'review']) for (const [k, reason] of Object.entries(table[verdict] || {})) {
    const p = k.indexOf('|');
    if (p < 0) { if (lc(it.album) === lc(k)) return [verdict, reason]; continue; }
    const x = lc(k.slice(0, p)), y = lc(k.slice(p + 1));
    if ((lc(it.artist) === x || lc(it.artist).includes(x)) && lc(it.album) === y) return [verdict, reason];
    if (lc(it.album) === x && (lc(title).includes(y) || lc(it.artist).includes(y))) return [verdict, reason];
  }
  return null;
}
const FMT = /^[A-Z]{2}$/, out = { preview: [], streaming: [] }, cnt = { preview: {}, streaming: {} };
for (const it of ap.issues) {
  const title = it.apple?.collectionName || it.otherStoreNames?.[0] || '';
  let v = lookupVerdict(V.apple, it, title);
  const gone = it.flags.find(f => f.startsWith('collection-gone'));
  if (!v && it.flags.some(f => f.startsWith('preview-dead'))) v = ['dead', '試聽網址失效'];
  if (!v && gone) v = ['gone', gone.includes('其他店面') ? `專輯在 ${it.storefront} 店面已下架（${gone.match(/:(.*)\)/)?.[1]} 仍有）` : `專輯在 ${it.storefront} 及 TW/US/JP/KR/GB 都查無（已下架）`];
  if (!v && it.flags.includes('not-in-seed') && it.flags.length === 1) v = ['orphan', '索引有、卡池已無此卡（無害，前台查不到）'];
  if (!v) v = ['ok', '人工覆核判定誤報'];
  it.verdict = v[0]; it.reason = v[1];
  cnt.preview[v[0]] = (cnt.preview[v[0]] || 0) + 1;
  out.preview.push(it);
}
for (const it of sp.issues) {
  let v = lookupVerdict(V.spotify, it, it.spotifyTitle);
  if (!v && it.flags.some(f => f.startsWith('dead'))) v = ['dead', 'oEmbed 404，連結失效'];
  if (!v) v = ['ok', '人工覆核判定誤報'];
  it.verdict = v[0]; it.reason = v[1];
  cnt.streaming[v[0]] = (cnt.streaming[v[0]] || 0) + 1;
  out.streaming.push(it);
}
// 檢查有沒有裁定條目沒對到任何旗標（打錯字）
const used = new Set([...out.preview, ...out.streaming].filter(x => x.verdict === 'wrong' || x.verdict === 'review').map(x => x.reason));
const unused = []; for (const side of ['apple', 'spotify']) for (const vv of ['wrong', 'review']) for (const [k, r] of Object.entries(V[side][vv])) if (!used.has(r)) unused.push(`${side}/${vv}: ${k}`);
fs.writeFileSync(`${WORK}/classified.json`, JSON.stringify({ apStat: ap.stat, spStat: sp.stat, cnt, ...out }, null, 1));
fs.writeFileSync(`${WORK}/sp-fix-targets.json`, JSON.stringify(out.streaming.filter(x => x.verdict === 'wrong' || x.verdict === 'dead'), null, 1));
fs.writeFileSync(`${WORK}/ap-fix-targets.json`, JSON.stringify(out.preview.filter(x => ['wrong', 'dead', 'gone'].includes(x.verdict)), null, 1));
console.log(cnt, 'unused verdicts:', unused);
