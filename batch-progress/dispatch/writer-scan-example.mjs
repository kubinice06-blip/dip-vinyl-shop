// 寫作層自掃腳本範例（c-192 writer-1 留下的；主線第 2012-B 條收進 repo，scratchpad 會被容器重啟清空）。
// 用法：複製到 scratchpad、把批號與 drafts 路徑改成自己的再跑；它讀 `./<批>w<組>-drafts.mjs` 的 BODY。
// c193 writer-1 自掃：字數、跨張 4-gram（本組＋b 組 hook/note 代理或正文）、跨批、日期三欄、否定、平台、自身盤名、間距
import fs from 'fs';
import { BODY } from './c192w1-drafts.mjs';
const R = '/home/user/dip-vinyl-shop/desc-tools/batches/';
const L = s => Array.from(s).length;
const load = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const inp = load(R + 'input/c192-writer-1.json');
const mine = inp.map((c, i) => ({ id: 'a' + (i + 1), key: c.key, album: c.album, hook: c.hook, desc: c.hook + (BODY['a' + (i + 1)] || '') }));
const strip = s => s.replace(/主故事：/g, '').replace(/→/g, '').replace(/正文只寫上列各項。/g, '').replace(/這條骨架全批只走本張。?/g, '').replace(/這條骨架全批只走本張/g, '');
let other;
if (fs.existsSync(R + 'output/c192-out-2.json')) {
  const o2 = load(R + 'output/c192-out-2.json'); other = o2.map((x, i) => ({ id: 'b' + (i + 1), desc: x.desc, real: true }));
} else {
  const w2 = load(R + 'input/c192-writer-2.json'); other = w2.map((x, i) => ({ id: 'b' + (i + 1), desc: strip(x.hook + x.note), real: false }));
}
const MIX = /[\u3400-\u9fff\u3040-\u30ff]/;
const only = s => Array.from(s).filter(c => MIX.test(c)).join('');
const grams = (s, n = 4) => { const a = Array.from(only(s)), o = new Set(); for (let i = 0; i + n <= a.length; i++) o.add(a.slice(i, i + n).join('')); return o; };
console.log('=== 字數 ===');
mine.forEach(x => { const n = L(x.desc); console.log(x.id, n, n < 180 ? '<<下限' : n > 240 ? '<<上限' : ''); });
// within batch
const m = new Map();
for (const x of [...mine, ...other]) for (const g of grams(x.desc)) { if (!m.has(g)) m.set(g, new Set()); m.get(g).add(x.id); }
const hookSet = new Map(); // grams fully inside hooks
for (const x of [...mine]) for (const g of grams(x.hook)) hookSet.set(g + x.id, 1);
const res = [...m].filter(([, v]) => v.size >= 2 && [...v].some(id => id.startsWith('a')));
console.log(`=== 本批（a 正文 + b ${other[0].real ? '正文' : 'hook+note 代理'}）≥2 張、含 a：${res.length} ===`);
res.sort((p, q) => q[1].size - p[1].size).forEach(([g, v]) => console.log('  ', g, [...v].join(',')));
// cross batch
const outs = [];
for (const f of fs.readdirSync(R + 'output').filter(f => /^c1(8[4-9]|9[0-13-9])-out/.test(f))) outs.push(...load(R + 'output/' + f).map(x => ({ ...x, f })));
const oG = new Map();
for (const o of outs) for (const g of grams(o.desc)) { if (!oG.has(g)) oG.set(g, new Set()); oG.get(g).add(o.f.replace('-out-', '/') + ':' + o.key.replace(/^desc\d:/, '').slice(0, 18)); }
console.log('=== 跨批（c184–c191+c193 out）：本組命中者，總張數≥3 標 << ===');
const cross = new Map();
for (const x of mine) for (const g of grams(x.desc)) if (oG.has(g)) { if (!cross.has(g)) cross.set(g, new Set()); cross.get(g).add(x.id); }
for (const [g, v] of cross) { const tot = v.size + oG.get(g).size; const recent = [...oG.get(g)].filter(s => /c1(8[8-9]|9)/.test(s)).length; console.log('  ', tot >= 3 ? '<<' : '  ', g, [...v].join(','), '× 前批', oG.get(g).size, '(c188+:' + recent + ')', [...oG.get(g)].slice(0, 3).join(' ; ')); }
// dates
console.log('=== 日期三欄 ===');
const pre = new Map(), post = new Map();
for (const x of [...mine, ...other]) {
  const s = x.desc;
  for (const mm of s.matchAll(/(\d{4})\s*年\s*\d{1,2}\s*月\s*\d{1,2}\s*日(.)/g)) {
    const before = only(s.slice(0, mm.index)); const p1 = Array.from(before).slice(-1)[0];
    pre.set(p1, [...(pre.get(p1) || []), x.id]); post.set(mm[2], [...(post.get(mm[2]) || []), x.id]);
  }
}
console.log('  前一字：', [...pre].map(([c, v]) => c + ':' + v.join('/')).join('  '));
console.log('  後一字：', [...post].map(([c, v]) => c + ':' + v.join('/')).join('  '));
console.log('  前重複：', JSON.stringify([...pre].filter(([, v]) => v.length > 1)), ' 後重複：', JSON.stringify([...post].filter(([, v]) => v.length > 1)));
// checks
console.log('=== 否定／平台／盤名／間距／半形逗號 ===');
for (const x of mine) {
  const b = x.desc;
  const neg = b.match(/不是|沒有|並不|未曾|從未|並非|而非|查無|不[\u4e00-\u9fa5]/g);
  const plat = b.match(/Apple|Discogs|MusicBrainz|Spotify|維基|Wikipedia|官網|串流|封面/g);
  const self = b.includes(x.album) ? '自身盤名!' : '';
  const t = b.replace(/《[^》]*》|〈[^〉]*〉|「[^」]*」/g, '');
  const sp = t.match(/[\u3400-\u9fff\u3040-\u30ff][A-Za-z0-9]|[A-Za-z0-9][\u3400-\u9fff\u3040-\u30ff]/g);
  const comma = b.match(/[\u3400-\u9fff],|,[\u3400-\u9fff]/g);
  const bad = b.match(/傑作|必聽|里程碑|獨樹一格|融合多種元素|具有代表性|層次豐富|全片|全曲|你|我/g);
  if (neg || plat || self || sp || comma || bad) console.log('  ', x.id, neg ? '否定:' + neg.join('/') : '', plat ? '平台:' + plat.join('/') : '', self, sp ? '間距:' + sp.join(' ') : '', comma ? '逗號:' + comma.join(' ') : '', bad ? '禁語:' + bad.join('/') : '');
}
// years in body vs research blob
console.log('=== 年份回查 ===');
for (const [i, c] of inp.entries()) {
  const blob = JSON.stringify(c.facts) + c.sound + JSON.stringify(c.researchNotes || '') + c.note;
  const ys = [...new Set((mine[i].desc.match(/\d{4}(?=\s*年)/g) || []))];
  const miss = ys.filter(y => !blob.includes(y));
  const notInNote = ys.filter(y => !(c.note + c.hook).includes(y));
  if (miss.length || notInNote.length) console.log('  ', mine[i].id, miss.length ? '研究稿零次:' + miss : '', notInNote.length ? 'note 沒有:' + notInNote : '');
}
