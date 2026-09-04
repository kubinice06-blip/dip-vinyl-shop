import fs from 'fs';
const P='/home/user/dip-vinyl-shop/desc-tools/batches/research/c84-b.json';
const cur=JSON.parse(fs.readFileSync(P,'utf8'));
const add=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const byKey=new Map(cur.map(x=>[x.key,x]));
for(const e of add){ if(byKey.has(e.key)){ const i=cur.findIndex(x=>x.key===e.key); cur[i]=e; } else cur.push(e); }
fs.writeFileSync(P, JSON.stringify(cur,null,2)+'\n');
console.log('now',cur.length,'entries');
