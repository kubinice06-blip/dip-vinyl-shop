import fs from 'node:fs';
const D='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c90b/parts';
const order=JSON.parse(fs.readFileSync('batches/cards/c90-cards.json','utf8')).filter(x=>x.group==='b').map(x=>x.key);
const all=[];
for(const f of fs.readdirSync(D).filter(f=>/^p\d+\.json$/.test(f)).sort((a,b)=>parseInt(a.slice(1))-parseInt(b.slice(1))))
  all.push(...JSON.parse(fs.readFileSync(`${D}/${f}`,'utf8')));
const m=new Map(all.map(x=>[x.key,x]));
const out=order.filter(k=>m.has(k)).map(k=>m.get(k));
const extra=all.filter(x=>!order.includes(x.key));
if(extra.length) console.error('!! key 不在卡單:', extra.map(x=>x.key));
fs.writeFileSync('batches/research/c90-b.json', JSON.stringify(out,null,1)+'\n');
console.log('wrote', out.length, '/', order.length, '| 缺:', order.filter(k=>!m.has(k)).length);
