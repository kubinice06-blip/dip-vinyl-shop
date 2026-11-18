// 合併＋套用複核與主線裁定 → retriage.json；印統計。node tools/finalize.mjs
import fs from 'node:fs';
const D = 'batch-progress/desc-retriage-20261118', T = D + '/triage';
const L = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const base = fs.readdirSync(T).filter(f => /^triage-\d+\.json$/.test(f)).sort().flatMap(f => L(T + '/' + f));
const recheck = new Map(['K01', 'K02'].flatMap(n => L(`${T}/triage-${n}.json`)).map(x => [x.k, x]));
// 主線裁定（rulings.md「收尾」段）
const manual = {
  'にせんねんもんだい|destination tokyo': { grade: 'polish', codes: [1, 4], why: '主線：曲長開頭、發行日到日；聲音具體' },
  '舐達麻|northernblue1.0.4.': { grade: 'polish', codes: [4], why: '主線：發行日到日；概念與聲音齊' },
};
const log = { recheck: {}, manual: 0, p2r: 0 };
const out = base.map(x => {
  let y = { ...x, via: 'tri' };
  if (x.grade === 'keep' && recheck.has(x.k)) { const r = recheck.get(x.k); log.recheck[r.grade] = (log.recheck[r.grade] || 0) + 1;
    y = { ...y, grade: r.grade, codes: r.codes, why: r.why, via: r.grade === 'keep' ? 'tri+keepcheck' : 'keepcheck' }; }
  if (manual[x.k]) { y = { ...y, ...manual[x.k], via: 'main' }; log.manual++; }
  if (y.grade === 'polish' && y.codes.some(c => c === 3 || c === 7)) { y = { ...y, grade: 'rewrite', via: y.via + '+p2r' }; log.p2r++; }
  return y;
});
fs.writeFileSync(D + '/retriage.json', '[' + out.map(x => JSON.stringify(x)).join(',\n') + ']\n');
const g = {}; for (const x of out) g[x.grade] = (g[x.grade] || 0) + 1;
console.log(out.length, JSON.stringify(g), JSON.stringify(log));
