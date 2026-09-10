import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/seed_cards.json','utf8'));
const k = s => String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'');
const kThe = s => k(String(s).replace(/^the\s+/i,''));
const cand = fs.readFileSync(process.argv[2],'utf8').trim().split('\n').map(l=>l.split('|'));
let flags=0;
for (const [a,al] of cand) {
  const exactPair = rows.filter(r=>k(r[0])===k(a) && k(r[1])===k(al));
  if (exactPair.length) { flags++; console.log(`❌ 真撞卡 ${a} — ${al} :: ${JSON.stringify(exactPair[0])}`); }
  // album as primary key, substring, length>=4 guard
  const ka = k(al);
  if (ka.length>=4) {
    const sub = rows.filter(r=>{const kb=k(r[1]); if(kb.length<4) return false; return kb.includes(ka)||ka.includes(kb);});
    const eq = rows.filter(r=>k(r[1])===ka);
    if (eq.length) console.log(`  ＝盤名相等 ${a} — ${al} → ${eq.map(r=>r[0]+'《'+r[1]+'》'+r[6]).join(' / ')}`);
    else if (sub.length) console.log(`  ~盤名子字串 ${a} — ${al} → ${sub.slice(0,6).map(r=>r[0]+'《'+r[1]+'》'+r[6]).join(' / ')}`);
  }
  const artEq = rows.filter(r=>kThe(r[0])===kThe(a));
  if (artEq.length) console.log(`  ·掛名去The相等 ${a} → ${artEq.map(r=>r[0]+'《'+r[1]+'》'+r[6]).join(' / ')}`);
}
console.log('真撞卡數',flags,'候選',cand.length);
