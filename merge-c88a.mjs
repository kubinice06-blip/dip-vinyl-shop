import fs from 'node:fs';
const OUT='/home/user/dip-vinyl-shop/desc-tools/batches/research/c88-a.json';
const cards=JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/desc-tools/batches/cards/c88-cards.json','utf8')).filter(x=>x.group==='a');
const entries=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
let cur=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):[];
const byKey=new Map(cur.map(e=>[e.key,e]));
for(const e of entries){ if(!cards.some(c=>c.key===e.key)) throw new Error('key not in a-group: '+e.key); byKey.set(e.key,e); }
const out=cards.map(c=>byKey.get(c.key)).filter(Boolean);
fs.writeFileSync(OUT,JSON.stringify(out,null,1)+'\n');
console.log('wrote',out.length,'/',cards.length);
