// 把 mb-raw（RG 層查詢）與 mb-fallback（release 層備援）合併，對每個種子提出最佳 RG 建議，
// 並印出待人工裁定的清單。評分：演奏者是否出現在掛名、標題與作品名的字詞重疊、
// 首發年與預期錄音年的距離、是否 Album 且無 Compilation 副型。
import fs from 'node:fs';
import { fold } from '../lib.mjs';

const here = p => new URL(p, import.meta.url);
const seeds = JSON.parse(fs.readFileSync(here('./seed-list.json'), 'utf8'));
const raw = JSON.parse(fs.readFileSync(here('./mb-raw.json'), 'utf8'));
const fb = fs.existsSync(here('./mb-fallback.json')) ? JSON.parse(fs.readFileSync(here('./mb-fallback.json'), 'utf8')) : {};

const words = s => new Set(fold(s).replace(/[^\p{L}\p{N} ]+/gu, ' ').split(/\s+/).filter(x => x.length > 2));
const workOf = a => String(a).includes(':') ? String(a).split(':').slice(1).join(':').replace(/\(.*?\)/g, '') : String(a);
const soloNames = a => String(a).split(/\s*[\/&]\s*/).map(x => fold(x).replace(/[^\p{L}\p{N}]+/gu, '')).filter(x => x.length > 3);

const out = [];
for (const s of seeds) {
  const k = `${s.artist}|${s.album}`;
  const cands = [ ...(Array.isArray(raw[k]) ? raw[k] : []), ...(Array.isArray(fb[k]) ? fb[k] : []) ];
  const uniq = [...new Map(cands.map(c => [c.id, c])).values()];
  const wantW = words(workOf(s.album));
  const solos = soloNames(s.artist);
  for (const c of uniq) {
    const credit = fold((c.rgCredit || c.artist || '') + ' ' + (c.releaseCredit || ''));
    const tw = words(c.title);
    const overlap = [...wantW].filter(w => [...tw].some(t => t.includes(w) || w.includes(t))).length;
    const yr = parseInt(String(c.firstRelease || c.releaseDate || '').slice(0, 4)) || null;
    let sc = 0;
    if (solos.some(p => credit.replace(/[^\p{L}\p{N}]+/gu, '').includes(p))) sc += 50;
    sc += overlap * 12;
    if (wantW.size && overlap === wantW.size) sc += 15;
    if (yr) sc += Math.max(0, 20 - Math.abs(yr - s.year) / 2);
    if (c.primaryType === 'Album') sc += 10;
    if ((c.secondaryTypes || []).includes('Compilation')) sc -= 25;
    if ((c.secondaryTypes || []).includes('Live')) sc -= 5;
    c._score = Math.round(sc);
    c._year = yr;
  }
  uniq.sort((a, b) => b._score - a._score);
  out.push({ seed: s, best: uniq[0] || null, alts: uniq.slice(1, 4) });
}

let none = 0;
for (const o of out) {
  const s = o.seed, b = o.best;
  if (!b) { none++; console.log(`\n✗ [軸${s.axis}] ${s.artist} — ${s.album}（期望 ${s.year}）  ⇒ MB 無條目`); continue; }
  const sec = (b.secondaryTypes || []).length ? ` sec=${b.secondaryTypes.join('/')}` : '';
  const warn = [];
  if ((b.secondaryTypes || []).includes('Compilation')) warn.push('★合輯副型');
  if (b._year && Math.abs(b._year - s.year) > 3) warn.push(`★年差 ${b._year} vs ${s.year}`);
  if (b._score < 55) warn.push('★低分需人工看');
  console.log(`\n${warn.length ? '⚠' : '✓'} [軸${s.axis}] ${s.artist} — ${s.album}（期望 ${s.year}）${warn.length ? '  ' + warn.join(' ') : ''}`);
  console.log(`    ${b.id}  ${b.title}  [${b.primaryType}${sec}] 首發 ${b.firstRelease || b.releaseDate || '?'}  分 ${b._score}`);
  console.log(`      掛名：${(b.rgCredit || b.artist || b.releaseCredit || '').slice(0, 100)}`);
  for (const a of o.alts) console.log(`    alt ${a.id}  ${a.title}  [${a.primaryType}] ${a.firstRelease || a.releaseDate || '?'}  分 ${a._score}`);
}
fs.writeFileSync(here('./picks.json'), JSON.stringify(out, null, 1));
console.log(`\n合計 ${out.length}｜無 MB 條目 ${none}`);
