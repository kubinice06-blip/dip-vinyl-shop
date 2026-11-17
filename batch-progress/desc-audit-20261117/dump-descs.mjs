import fs from 'node:fs';
const SP=process.argv[2];
const ACC='3a23f905e8f31d91c85050f2ed304321', NS='5f65e74b17d644b68a3f542b08a5c105';
const seed=JSON.parse(fs.readFileSync('seed_cards.json','utf8'));
const OUT=SP+'/da/descs.json';
const done=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
const cards=seed.map(r=>({k:`${r[0].toLowerCase()}|${r[1].toLowerCase()}`,a:r[0],b:r[1],c:r[2],o:r[3],h:r[4],g:r[5],y:r[6],tier:r[8]||''})).filter(c=>!(c.k in done));
const parse=v=>{if(v==null)return null;try{const o=typeof v==='string'?JSON.parse(v):v;return o.desc??null}catch{return String(v)}};
let n=0;
for(let i=0;i<cards.length;i+=45){
  const part=cards.slice(i,i+45);const keys=part.flatMap(c=>['desc2:'+c.k,'desc4:'+c.k]);
  let j;for(let t=0;t<4;t++){try{j=await(await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/bulk/get`,{method:'POST',headers:{Authorization:'Bearer '+process.env.CLOUDFLARE_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({keys})})).json();if(j.success)break}catch{}await new Promise(s=>setTimeout(s,3000))}
  if(!j?.success){console.log('fail at',i);break}
  for(const c of part){const d2=parse(j.result.values['desc2:'+c.k]),d4=parse(j.result.values['desc4:'+c.k]);done[c.k]={...c,desc:d2??d4??null,src:d2!=null?'desc2':d4!=null?'desc4':'none'}}
  if(++n%40===0){fs.writeFileSync(OUT,JSON.stringify(done));console.log(Object.keys(done).length)}
}
fs.writeFileSync(OUT,JSON.stringify(done));console.log('done',Object.keys(done).length);
