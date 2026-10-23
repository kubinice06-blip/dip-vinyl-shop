// 把 out/chunk-NN.json 的判定寫進 data/mood/overrides.json：
//   sour → 色溫 z = min(z, −1.2)；sour 且 drive → 能量 x = max(x, 3.2)（自由爵士／no wave／harsh）或 3.1（其他）；質地不動。
//   已在 overrides 的卡只改需要的欄位、保留原 why 並附註。輸出 merge-report.json。
import fs from 'node:fs';
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const v0 = J('data/mood/card-moods-v0.json'), ov = J('data/mood/overrides.json'), cands = J('batch-progress/mood-axes/sour-rejudge/candidates.json');
const T = v0._thresholds;
const cell = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? '沸騰' : '亢奮') : (z >= T.z ? '雀躍' : '冷冽')) : (y >= T.y ? (z >= T.z ? '恍惚' : '頹靡') : (z >= T.z ? '放鬆' : '平靜')));
const byId = new Map(cands.map(c => [c.id, c]));
const rep = { files: 0, judged: 0, sour: 0, drive: 0, changed: 0, moves: {}, skippedLow: 0, missing: [] };
const REJECT = new Set((process.env.REJECT || '').split(',').filter(Boolean));   // 主線審稿退回的 id
for (const f of fs.readdirSync('batch-progress/mood-axes/sour-rejudge/out').filter(x => x.endsWith('.json')).sort()) {
  rep.files++;
  for (const r of J('batch-progress/mood-axes/sour-rejudge/out/' + f)) {
    const c = byId.get(r.id); if (!c) { rep.missing.push(r.id); continue; }
    rep.judged++; if (!r.sour || REJECT.has(r.id)) continue; rep.sour++;
    let { x, y, z } = c; const nz = Math.min(z, -1.2); let nx = x;
    const freeish = /free|avant|no-wave|harsh|noise/.test(c.tags);
    if (r.drive) { rep.drive++; nx = Math.max(x, freeish ? 3.2 : 3.1); }
    nx = +nx.toFixed(1); const from = cell(x, y, z), to = cell(nx, y, nz);
    if (nx === x && nz === z) continue; rep.changed++; rep.moves[from + '→' + to] = (rep.moves[from + '→' + to] || 0) + 1;
    const prev = ov[c.id];
    ov[c.id] = { x: nx, y, z: +nz.toFixed(1), why: `${prev?.why ? prev.why + '｜' : ''}2026-10-23 酸冷重判（${r.conf}）：${r.why || ''}。原 (${x}, ${y}, ${z})` };
  }
}
fs.writeFileSync('data/mood/overrides.json', JSON.stringify(ov, null, 1));
fs.writeFileSync('batch-progress/mood-axes/sour-rejudge/merge-report.json', JSON.stringify(rep, null, 1));
console.log(JSON.stringify(rep));
