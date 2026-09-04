import fs from 'fs';
const DIR='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/cards';
const cards=JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/desc-tools/batches/cards/c84-cards.json','utf8'));
const arr=(cards.cards||cards).filter(x=>x.group==='a');
const out=[];
arr.forEach((c,i)=>{
  const f=`${DIR}/${String(i+1).padStart(2,'0')}.json`;
  if(fs.existsSync(f)){
    const o=JSON.parse(fs.readFileSync(f,'utf8'));
    if(o.key!==c.key) throw new Error('key mismatch at '+(i+1)+': '+o.key+' vs '+c.key);
    out.push(o);
  }
});
fs.writeFileSync('/home/user/dip-vinyl-shop/desc-tools/batches/research/c84-a.json', JSON.stringify(out,null,1)+'\n');
console.log('wrote',out.length,'cards; facts',out.map(o=>o.facts.length).join(','));
