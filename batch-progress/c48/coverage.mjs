// c-48 開工前覆蓋重驗：稽核底稿是 2026-08-22（池 10,735 鍵）做的，之後 c-41～c-47 又補了幾批。
// 對每個種子查兩件事：(a) 同演奏者在池內的全部條目；(b) 同作曲家＋作品關鍵字的既有版本。
// 目的是抓出「稽核說缺、其實已補」與「同曲已有多版、新增需括年區辨」兩種情況。
import fs from 'node:fs';
import { loadPool, fold } from '../lib.mjs';

const seeds = JSON.parse(fs.readFileSync(new URL('./seed-list.json', import.meta.url), 'utf8'));
const { all } = loadPool();

// 作品關鍵字：從 album 欄的「作曲家: 作品」取作品側，去掉括註與版本字樣
const workKey = a => fold(String(a).split(':').slice(1).join(':') || a)
  .replace(/\(.*?\)/g, '').replace(/[^\p{L}\p{N} ]+/gu, ' ').trim();

const report = [];
for (const s of seeds) {
  const fa = fold(s.artist).replace(/[^\p{L}\p{N}]+/gu, '');
  // 演奏者比對：容許「Lang Lang 郎朗」這種雙語掛名，用包含關係雙向比
  const byArtist = all.filter(r => {
    const f = fold(r.artist).replace(/[^\p{L}\p{N}]+/gu, '');
    // 兩邊都要夠長才做包含比對：短鍵（!!! 摺成空字串、T.I. 摺成 ti）會匹配到整個池
    if (!f || f.length < 5 || fa.length < 5) return f === fa;
    return f === fa || f.includes(fa) || fa.includes(f);
  });
  // 作品比對必須「作曲家＋作品特徵字」同時中，否則 "symphony" 一個字就掃到全池交響曲
  const w = workKey(s.album);
  const STOP = new Set(['symphony', 'concerto', 'sonata', 'quartet', 'quintet', 'variations',
    'works', 'piano', 'violin', 'cello', 'string', 'songs', 'suite', 'mass', 'recital', 'minor', 'major']);
  const words = w.split(/\s+/).filter(x => x.length > 3 && !STOP.has(x));
  const comp = fold(s.composer).replace(/^[a-z]\.[a-z]\.\s*/, '').split(/\s+/).pop();
  const byWork = all.filter(r => {
    const f = fold(r.album);
    if (comp && !f.includes(comp)) return false;
    if (!words.length) return true;               // 作品名全是通用字，只比作曲家
    return words.every(x => f.includes(x));
  });
  const exact = all.find(r => fold(r.artist).replace(/[^\p{L}\p{N}]+/gu, '') === fa
    && fold(r.album).replace(/[^\p{L}\p{N}]+/gu, '') === fold(s.album).replace(/[^\p{L}\p{N}]+/gu, ''));
  report.push({ ...s, poolExact: exact || null, poolByArtist: byArtist, poolByWork: byWork });
}

let dup = 0, sameWork = 0;
for (const r of report) {
  const flags = [];
  if (r.poolExact) { flags.push('★撞鍵'); dup++; }
  if (r.poolByWork.length) { flags.push(`同曲 ${r.poolByWork.length} 版`); sameWork++; }
  console.log(`[軸${r.axis}] ${r.artist} — ${r.album}${flags.length ? '  ⇒ ' + flags.join('、') : ''}`);
  for (const p of r.poolByWork) console.log(`        同曲：[${p.where}] ${p.artist} — ${p.album}（${p.year ?? '?'}）`);
  if (r.poolByArtist.length) console.log(`        該演奏者池內 ${r.poolByArtist.length} 張：${r.poolByArtist.slice(0, 6).map(p => p.album).join('｜')}${r.poolByArtist.length > 6 ? ' …' : ''}`);
}
fs.writeFileSync(new URL('./pool-coverage.json', import.meta.url), JSON.stringify(report, null, 1));
console.log(`\n合計 ${report.length} 筆｜完全撞鍵 ${dup}｜同曲已有其他版本 ${sameWork}`);
