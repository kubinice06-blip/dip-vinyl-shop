import fs from 'node:fs';
const IN='batches/input/c83-writer-1.json', OUT='batches/output/c83-out-1.json';
const src=JSON.parse(fs.readFileSync(IN,'utf8'));
const T=JSON.parse(fs.readFileSync('c83-w1-tail.json','utf8'));
const rows=src.filter(x=>T[x.key]!==undefined).map(x=>({key:x.key,desc:x.hook+T[x.key]}));
fs.writeFileSync(OUT, JSON.stringify(rows,null,2)+'\n');
for(const r of rows){
  const n=Array.from(r.desc).length;
  console.log((n<180||n>240?'!!':'  '), String(n).padStart(3), r.key.replace(/^desc2:/,''));
}
console.log('rows',rows.length);
