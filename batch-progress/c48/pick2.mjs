// 版本鎖定用的挑選器：合併 mb-raw（RG 層）、mb-fallback、mb-wide（release 層，掛名含演奏者）。
// 古典配錯錄音的三種典型：搭檔不對（Schwanengesang 配到 Brendel 而非 Gerald Moore）、
// 作曲家不對（Borodin 的「Franck 五重奏」其實是 Brahms）、曲目不對（Brahms 2 配到 Brahms 4）。
// 因此評分以「演奏者掛名是否出現」與「作曲家是否出現」為主，標題重疊為輔。
import fs from 'node:fs';
import { fold } from '../lib.mjs';

const here = p => new URL(p, import.meta.url);
const load = f => fs.existsSync(here(f)) ? JSON.parse(fs.readFileSync(here(f), 'utf8')) : {};
const seeds = JSON.parse(fs.readFileSync(here('./seed-list.json'), 'utf8'));
const srcs = { raw: load('./mb-raw.json'), fb: load('./mb-fallback.json'), wide: load('./mb-wide.json') };

const flat = s => fold(s).replace(/[^\p{L}\p{N}]+/gu, '');
const wordsOf = s => fold(s).replace(/[^\p{L}\p{N} ]+/gu, ' ').split(/\s+/).filter(Boolean);
const workOf = a => String(a).includes(':') ? String(a).split(':').slice(1).join(':').replace(/\(.*?\)/g, '') : String(a);
// 掛名可能是「A / B / C」或「A & B」；每一位都當作要比對的演奏者
const performers = a => String(a).split(/\s*[\/&]\s*/).map(x => x.replace(/\s+\S+$/, '') && x.trim())
  .flatMap(x => [flat(x), flat(x.split(/\s+/).pop())]).filter(x => x.length > 3);

const STOP = new Set(['symphony','concerto','sonata','sonatas','quartet','quartets','quintet','variations',
  'works','piano','violin','cello','string','songs','suite','mass','recital','minor','major','no','op','the','in','for','and']);

const out = [];
for (const s of seeds) {
  const k = `${s.artist}|${s.album}`;
  const cands = [...(Array.isArray(srcs.raw[k]) ? srcs.raw[k] : []),
                 ...(Array.isArray(srcs.fb[k]) ? srcs.fb[k] : []),
                 ...(Array.isArray(srcs.wide[k]) ? srcs.wide[k] : [])];
  const uniq = [...new Map(cands.map(c => [c.id, c])).values()];
  const perf = performers(s.artist);
  const comp = flat(String(s.composer).replace(/^[A-Z]\.[A-Z]\.\s*/, '').split(/\s+/).pop());
  const wantW = wordsOf(workOf(s.album)).filter(w => w.length > 2 && !STOP.has(w));

  for (const c of uniq) {
    const credit = flat((c.rgCredit || '') + '|' + (c.artist || '') + '|' + (c.releaseCredit || ''));
    const title = fold(c.title || '') + ' ' + fold(c.viaRelease || '');
    const hitPerf = perf.filter(p => credit.includes(p)).length;
    const hitComp = comp && credit.includes(comp);
    const hitW = wantW.filter(w => title.includes(w)).length;
    const yr = parseInt(String(c.firstRelease || c.releaseDate || '').slice(0, 4)) || null;

    let sc = 0;
    if (hitPerf) sc += 45 + (hitPerf - 1) * 10;      // 演奏者是最強訊號
    if (hitComp) sc += 25;                            // 作曲家對不上多半是配錯碟
    sc += hitW * 14;
    if (wantW.length && hitW === wantW.length) sc += 18;
    if (c.primaryType === 'Album') sc += 8;
    if ((c.secondaryTypes || []).includes('Compilation')) sc -= 20;
    Object.assign(c, { _score: Math.round(sc), _year: yr, _perf: hitPerf, _comp: !!hitComp, _w: `${hitW}/${wantW.length}` });
  }
  uniq.sort((a, b) => b._score - a._score);
  out.push({ seed: s, cands: uniq });
}

fs.writeFileSync(here('./picks2.json'), JSON.stringify(out, null, 1));

// 分三級：confident（演奏者＋作曲家都中且作品字詞全中）、review（缺其一）、none
let conf = 0, rev = 0, none = 0;
for (const o of out) {
  const b = o.cands[0];
  if (!b) { none++; continue; }
  const [h, t] = b._w.split('/').map(Number);
  if (b._perf && b._comp && (t === 0 || h === t)) conf++; else rev++;
}
console.log(`種子 ${out.length}｜可直接採用 ${conf}｜需人工裁定 ${rev}｜MB 無條目 ${none}`);
