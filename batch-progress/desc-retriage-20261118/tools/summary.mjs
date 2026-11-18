// retriage.json → summary.md
import fs from 'node:fs';
const D = 'batch-progress/desc-retriage-20261118', T = D + '/triage';
const R = JSON.parse(fs.readFileSync(D + '/retriage.json', 'utf8'));
const ins = {}; for (const f of fs.readdirSync(T + '/in')) for (const c of JSON.parse(fs.readFileSync(T + '/in/' + f))) ins[c.k] = c;
const G = ['severe', 'rewrite', 'polish', 'keep'];
const cjk = s => /[぀-ヿ㐀-鿿가-힯]/.test(s);
const cnt = f => { const o = {}; for (const g of G) o[g] = R.filter(x => x.grade === g && f(x)).length; return o; };
const row = (lab, o) => { const t = G.reduce((a, g) => a + o[g], 0); return `| ${lab} | ${t} | ${G.map(g => `${o[g]}（${(o[g] / t * 100).toFixed(1)}%）`).join(' | ')} |`; };
const ex = {
  severe: ['江蕙|紅線', '楊千嬅|single', '狗毛|衝動', '田中フミヤ|right moment', '薄荷葉|涼'],
  rewrite: ['bunny wailer|blackheart man', 'massive attack|protection', 'max richter|infra', 'bad bunny|x 100pre', '311|evolver'],
  polish: ['big thief|two hands', 'wes montgomery|smokin\' at the half note', 'women|women', 'larry young|unity', 'café tacvba|café tacvba'],
  keep: ['weather report|sweetnighter', 'still corners|creatures of an hour', 'ben lamar gay|open arms to open us', 'air (us jazz trio)|air lore', 'glenn gould|10 intermezzi for piano'],
};
const by = new Map(R.map(x => [x.k, x]));
const codeCnt = g => { const o = {}; for (const x of R.filter(x => x.grade === g)) for (const c of x.codes) o[c] = (o[c] || 0) + 1; return Object.entries(o).sort((a, b) => a[0] - b[0]).map(([c, n]) => `${c}:${n}`).join('、'); };
let s = `# rewrite 級重新判定 summary（desc-retriage-20261118）\n\n範圍：11-17 第 0 步判成 rewrite 的 13711 張一般卡，用四級（severe／rewrite／polish／keep）重判。只讀現行簡介，未上網、未改稿、未寫 KV。\n\n## 四級張數\n\n| 範圍 | 張數 | severe | rewrite | polish | keep |\n|---|---|---|---|---|---|\n`;
s += row('全部', cnt(() => true)) + '\n' + row('CJK（藝人或盤名含中日韓字）', cnt(x => cjk(x.artist + x.album))) + '\n' + row('非 CJK', cnt(x => !cjk(x.artist + x.album))) + '\n';
s += row('經典度 ≥4', cnt(x => (x.classic || 0) >= 4)) + '\n' + row('經典度 ≤3', cnt(x => (x.classic || 0) < 4)) + '\n' + row('CJK 且經典度 ≥4', cnt(x => cjk(x.artist + x.album) && (x.classic || 0) >= 4)) + '\n';
s += `\ncodes 分布（1 雜項開頭、2 不知是什麼、3 沒聲音、4 雜項過半、5 做作、6 封號、7 可疑、8 主體不是專輯、9 超過 240 字）：\n\n`;
for (const g of G) s += `- ${g}：${codeCnt(g) || '—'}\n`;
s += `\n## 之後怎麼處理\n\n- **severe／rewrite**（合計 ${R.filter(x => x.grade === 'severe' || x.grade === 'rewrite').length}）：研究＋寫作，照 severe 線流程。\n- **polish**（${R.filter(x => x.grade === 'polish').length}）：不上網，寫作層直接改稿＋主線審。\n- **keep**（${R.filter(x => x.grade === 'keep').length}）：不動。\n\n## 每級代表例（現行簡介全文）\n`;
for (const g of G) { s += `\n### ${g}\n`; for (const k of ex[g]) { const x = by.get(k); if (!x) { s += `\n（缺 ${k}）\n`; continue; } if (x.grade !== g) s += `\n⚠ ${k} 實際為 ${x.grade}\n`;
  s += `\n- **${x.artist}《${x.album}》**（${x.year || '—'}，經典度 ${x.classic ?? '—'}）[${x.codes}] ${x.why}\n  > ${ins[k].desc}\n`; } }
fs.writeFileSync(D + '/summary.md', s); console.log(s.slice(0, 2500));
