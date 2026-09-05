import fs from 'fs';
const DIR='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c88b';
const cards=JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/desc-tools/batches/cards/c88-cards.json','utf8'));
const arr=(Array.isArray(cards)?cards:(cards.cards||cards.items)).filter(x=>x.group==='b');
const out=[];
arr.forEach((c,i)=>{
  const f=`${DIR}/${String(i+1).padStart(2,'0')}.json`;
  if(fs.existsSync(f)){
    const o=JSON.parse(fs.readFileSync(f,'utf8'));
    if(o.key!==c.key){ console.error('KEY MISMATCH at '+(i+1)+': '+o.key+' != '+c.key); process.exit(1); }
    out.push(o);
  }
});
fs.writeFileSync('/home/user/dip-vinyl-shop/desc-tools/batches/research/c88-b.json', JSON.stringify(out,null,1));
console.log('written',out.length,'entries; facts total', out.reduce((s,x)=>s+x.facts.length,0));
