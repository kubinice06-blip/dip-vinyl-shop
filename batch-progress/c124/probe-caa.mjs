// c-124：CAA release-group front 封面實測。
import fs from 'node:fs';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const OUT='batch-progress/c124/caa-probe.json';
const ids=JSON.parse(fs.readFileSync('batch-progress/c124/rg-ids.json','utf8'));
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
let n=0;
for(const {id,note} of ids){
  if(out[id]){n++;continue;}
  let code='ERR';
  try{
    const r=await fetch(`https://coverartarchive.org/release-group/${id}/front`,{redirect:'follow',signal:AbortSignal.timeout(25000)});
    code=r.status;
  }catch(e){code='timeout';}
  out[id]={note,code};
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  n++; console.log(`${n}/${ids.length} ${note} → ${code}`);
  await sleep(600);
}
console.log('done');
