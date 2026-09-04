import fs from 'fs';
const P='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c85a/parts';
const cards=JSON.parse(fs.readFileSync('./batches/cards/c85-cards.json','utf8')).filter(c=>c.group==='a');
const out=[];
for(let i=1;i<=22;i++){
  const f=`${P}/p${String(i).padStart(2,'0')}.json`;
  if(!fs.existsSync(f)) continue;
  const a=JSON.parse(fs.readFileSync(f,'utf8'));
  for(const e of a) out.push(e);
}
// order-check against card list
const keys=cards.map(c=>c.key);
out.sort((a,b)=>keys.indexOf(a.key)-keys.indexOf(b.key));
for(const e of out) if(!keys.includes(e.key)) throw new Error('unknown key '+e.key);
fs.writeFileSync('./batches/research/c85-a.json', JSON.stringify(out,null,1)+'\n');
console.log('merged',out.length,'facts total',out.reduce((s,x)=>s+x.facts.length,0));
