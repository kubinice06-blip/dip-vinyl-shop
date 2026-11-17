// severe 清單切批：中日韓台（藝人或盤名有 CJK）→ 經典度 ≥4 → 其餘；同類內按藝人聚在一起（藝人以其最高經典度排前），每批 30。
//   node …/cut.mjs [--write]   → batches.json（{"sd-001":[key…]}）＋ 印出分批表列
import fs from 'node:fs';
const D = 'batch-progress/desc-severe-20261117';
const cjk = v => /[぀-ヿ㐀-鿿豈-﫿가-힯]/.test(String(v || ''));
const tri = JSON.parse(fs.readFileSync(D + '/triage.json', 'utf8')).filter(x => x.grade === 'severe');
const cls = x => cjk(x.artist) || cjk(x.album) ? 0 : (x.classic || 0) >= 4 ? 1 : 2;
const label = ['中日韓台', '經典度≥4', '其餘'];
const by = new Map();
for (const x of tri) { const c = cls(x), a = x.artist.toLowerCase(); const g = by.get(c + '|' + a) || { c, a, max: 0, rows: [] }; g.rows.push(x); g.max = Math.max(g.max, x.classic || 0); by.set(c + '|' + a, g); }
const groups = [...by.values()].sort((p, q) => p.c - q.c || q.max - p.max || (p.a < q.a ? -1 : 1));
const order = groups.flatMap(g => g.rows.sort((p, q) => (q.classic || 0) - (p.classic || 0) || (p.album < q.album ? -1 : 1)));
const out = {}, rows = [];
for (let i = 0, n = 1; i < order.length; i += 30, n++) {
  const part = order.slice(i, i + 30), name = 'sd-' + String(n).padStart(3, '0');
  out[name] = part.map(x => x.k);
  const cs = [...new Set(part.map(cls))].map(c => label[c]).join('＋');
  rows.push(`| ${name} | ${cs}（${part[0].artist} … ${part[part.length - 1].artist}） | ${part.length} | | |`);
}
console.log(`severe ${order.length} 張 → ${rows.length} 批；中日韓台 ${order.filter(x => cls(x) === 0).length}、經典度≥4 ${order.filter(x => cls(x) === 1).length}、其餘 ${order.filter(x => cls(x) === 2).length}`);
if (process.argv.includes('--write')) { fs.writeFileSync(D + '/batches.json', JSON.stringify(out, null, 1)); fs.writeFileSync(D + '/batch-table.md', rows.join('\n') + '\n'); console.log('已寫 batches.json、batch-table.md'); }
else console.log(rows.slice(0, 5).join('\n'));
