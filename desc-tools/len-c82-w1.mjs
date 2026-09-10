import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const inp = JSON.parse(fs.readFileSync('batches/input/c82-writer-1.json','utf8'));
rows.forEach((r,i)=>{
  const n = Array.from(r.desc).length;
  const ok = r.desc.replace(/ /g,'').startsWith(inp[i].hook.replace(/ /g,''));
  console.log(String(i+1).padStart(2), n, ok?'hook✓':'HOOK✗', inp[i].key===r.key?'':'KEY✗', r.desc.slice(0,24));
});
