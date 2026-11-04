// 驗收 out/*.json → 寫進 data/mood/overrides.json；--dry 只統計。主線推翻見 veto.json（id → 保留原座標，或 {x,y,z,why} 改主線座標）。
import fs from 'node:fs';
const R = '/home/user/dip-vinyl-shop/';
const DRY = process.argv.includes('--dry');
const T = { x: 3, y: 0.5, z: 0 };
const cellOf = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? 'boil' : 'charge') : (z >= T.z ? 'lift' : 'crisp')) : (y >= T.y ? (z >= T.z ? 'languid' : 'decay') : (z >= T.z ? 'calm' : 'still')));
const names = { calm: '放鬆', still: '平靜', languid: '恍惚', decay: '頹靡', lift: '雀躍', crisp: '冷冽', boil: '沸騰', charge: '暴躁' };
const cand = JSON.parse(fs.readFileSync('candidates.json', 'utf8'));
const byId = new Map([...cand.A, ...cand.B].map(r => [r.id, r]));
const veto = fs.existsSync('veto.json') ? JSON.parse(fs.readFileSync('veto.json', 'utf8')) : {};
const ovPath = R + 'data/mood/overrides.json';
const ov = JSON.parse(fs.readFileSync(ovPath, 'utf8'));
const errs = [], moves = [];
for (const f of fs.readdirSync('out').filter(f => f.endsWith('.json')).sort()) {
  const arr = JSON.parse(fs.readFileSync('out/' + f, 'utf8'));
  const inp = JSON.parse(fs.readFileSync('chunks/' + f, 'utf8'));
  if (arr.length !== inp.length) errs.push(`${f}: ${arr.length}/${inp.length} 筆`);
  for (const o of arr) {
    const c = byId.get(o.id); if (!c) { errs.push(`${f}: 未知 id ${o.id}`); continue; }
    let { x, y, z, why } = o; let mv = o.move === true && o.conf !== 'low';
    const v = veto[o.id];
    if (v === 'keep') mv = false; else if (v && typeof v === 'object') { ({ x, y, z } = v); why = v.why; mv = true; }
    if (!mv) continue;
    const nc = cellOf(x, y, z);
    if (nc === c.cell) continue;
    if ([x, y, z].some(n => typeof n !== 'number') || x < 1 || x > 5 || Math.abs(y) > 2 || Math.abs(z) > 2) { errs.push(`${o.id}: 座標越界`); continue; }
    moves.push({ ...c, nx: x, ny: y, nz: z, ncell: nc, why, conf: o.conf, part: f.slice(0, 1), src: v ? 'main' : 'agent' });
  }
}
const tag = r => r.part === 'A' ? (r.genres[0] === 'hiphop' ? '嘻哈' : '雷鬼') : '電子';
const t = {}; for (const m of moves) { const k = `${tag(m)} ${names[m.cell]}→${names[m.ncell]}`; t[k] = (t[k] || 0) + 1; }
console.log('errors', errs.length, errs.slice(0, 10)); console.log('moves', moves.length, t);
fs.writeFileSync('applied.json', JSON.stringify(moves, null, 1));
if (!DRY && !errs.length) {
  for (const m of moves) {
    const lead = m.part === 'A' ? '2026-11-04 店主：恍惚／頹靡嘻哈雷鬼太多，體感重判：' : '2026-11-04 店主：恍惚／頹靡要多電子，體感重判：';
    ov[m.id] = { x: m.nx, y: m.ny, z: m.nz, why: `${lead}${m.why}。原 (${m.x}, ${m.y}, ${m.z})` };
  }
  fs.writeFileSync(ovPath, JSON.stringify(ov, null, 1));
  console.log('overrides 寫入', moves.length);
}
