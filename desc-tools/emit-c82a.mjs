import fs from 'fs';
import {ENTRIES} from './entries-c82a.mjs';
const cards=JSON.parse(fs.readFileSync('batches/cards/c82-cards.json','utf8')).filter(x=>x.group==='a');
const order=cards.map(c=>c.key);
const byKey=new Map(ENTRIES.map(e=>[e.key,e]));
const out=order.map(k=>byKey.get(k)).filter(Boolean);
const missing=order.filter(k=>!byKey.has(k));
fs.writeFileSync('batches/research/c82-a.json', JSON.stringify(out,null,1)+'\n');
console.log('written',out.length,'of',order.length,'missing:',missing.length);
missing.forEach(m=>console.log('  -',m));
const bad=out.flatMap(e=>(e.facts||[]).filter(f=>!/^https:\/\/\S+$/.test(String(f.src||''))).map(f=>e.key+' :: '+String(f.src)));
if(bad.length){console.log('BAD SRC:');bad.forEach(b=>console.log('  ',b));}
out.forEach(e=>{ if((e.hookCandidates||[]).length>2) console.log('HOOK>2',e.key); if((e.facts||[]).length<9) console.log('FACTS<9',e.key,(e.facts||[]).length); });
