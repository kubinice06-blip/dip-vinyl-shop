import fs from 'fs';
const props = JSON.parse(fs.readFileSync('batch-progress/csea/prop-all.json','utf8'));
const arr = Array.isArray(props) ? props : props.cards || [];

// 已進管線的 99 張（研究檔為準）
const done = new Set();
for (const b of ['cseaa','cseab','cseac'])
  for (const f of ['a','b','c','d','e']) {
    const p = `desc-tools/batches/research/${b}-${f}.json`;
    if (!fs.existsSync(p)) continue;
    const j = JSON.parse(fs.readFileSync(p,'utf8'));
    for (const r of (j.cards || j)) done.add((r.artist||'') + '|' + (r.album||''));
  }

// 線上卡池（本機 9/1 已上架 230 張，池 13,418）
const seeds = JSON.parse(fs.readFileSync('seed_cards.json','utf8'));
const pool = new Set(seeds.map(c => c[0] + '|' + c[1]));
const poolArtist = new Set(seeds.map(c => c[0]));

const left = arr.filter(c => !done.has(c.artist + '|' + c.album));
const out = [], collide = [];
for (const c of left) {
  if (pool.has(c.artist + '|' + c.album)) { collide.push(c); continue; }
  out.push({ ...c, artistInPool: poolArtist.has(c.artist) });
}
console.log('prop-all', arr.length, '｜已進管線', done.size, '｜未進管線', left.length);
console.log('其中已在線上池（撞卡，剔除）', collide.length);
for (const c of collide) console.log('   撞:', c.artist, c.album);
console.log('c-52 候選', out.length);
fs.writeFileSync('batch-progress/c52/cand.json', JSON.stringify(out, null, 1));
const byG = {}; for (const c of out) byG[c.g||'?'] = (byG[c.g||'?']||0)+1;
console.log('地區分佈', JSON.stringify(byG));
console.log('合輯', out.filter(c=>c.releaseType==='Compilation').length, '／', out.length);
console.log('藝人已在池', out.filter(c=>c.artistInPool).length);
