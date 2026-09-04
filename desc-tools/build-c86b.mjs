import fs from 'fs';
const cards=JSON.parse(fs.readFileSync('./batches/cards/c86-cards.json','utf8'));
const arr=Array.isArray(cards)?cards:(cards.cards||cards.items);
const order=arr.filter(x=>x.group==='b').map(x=>x.key);
const map={};
for(const f of fs.readdirSync('./parts-c86b').filter(f=>f.endsWith('.json')).sort()){
  const part=JSON.parse(fs.readFileSync('./parts-c86b/'+f,'utf8'));
  for(const c of part) map[c.key]=c;
}
const out=order.filter(k=>map[k]).map(k=>map[k]);
fs.writeFileSync('./batches/research/c86-b.json', JSON.stringify(out,null,1));
console.log('wrote',out.length,'cards; missing',order.filter(k=>!map[k]).length);
