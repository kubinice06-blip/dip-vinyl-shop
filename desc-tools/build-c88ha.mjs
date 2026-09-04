import fs from 'node:fs';
const research = JSON.parse(fs.readFileSync('batches/research/c88-a.json','utf8'));
const D = JSON.parse(fs.readFileSync('tmp-c88ha/data.json','utf8'));
const out = research.map((r,i)=>{
  const d = D[i];
  if(!d) return null;
  return { key: r.key, hook: d.hook, note: d.note };
}).filter(Boolean);
fs.writeFileSync('batches/hooks/c88-hooks-a.json', JSON.stringify(out,null,1)+'\n');
const w = s => Array.from(s).reduce((n,c)=>n+(/[\x00-\x7F]/.test(c)?0.5:1),0);
out.forEach((x,i)=>{
  const hw=w(x.hook), nl=Array.from(x.note).length;
  const head=Array.from(x.hook).slice(0,4).join('');
  console.log(`${String(i).padStart(2)} hook ${String(hw).padStart(5)} note ${String(nl).padStart(3)} 「${head}」 ${hw>50?'⚠HOOK':''}${nl>350?'⚠NOTE':''}`);
});
const heads=out.map(x=>Array.from(x.hook).slice(0,4).join(''));
const dup=heads.filter((h,i)=>heads.indexOf(h)!==i);
console.log('重複開頭:', dup.length?dup:'無');
console.log('張數:', out.length);
