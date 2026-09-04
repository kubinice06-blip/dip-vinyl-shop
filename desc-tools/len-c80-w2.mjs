import fs from 'node:fs';
const f = process.argv[2];
const rows = JSON.parse(fs.readFileSync(f,'utf-8'));
rows.forEach(r=>{
  const n = Array.from(r.desc).length;
  const flag = (n<180||n>240)?'  <<< OUT':(n<215||n>235?'  (~)':'');
  console.log(String(n).padStart(3)+'  '+r.key+flag);
});
console.log('total', rows.length);
