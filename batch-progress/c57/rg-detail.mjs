import fs from 'node:fs';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mb(url,tries=4){for(let i=0;i<tries;i++){try{const r=await fetch(url,{headers:{'User-Agent':UA},signal:AbortSignal.timeout(30000)});if(r.ok)return r.json();if(r.status===503){await sleep(2500*(i+1));continue;}return{_http:r.status};}catch{await sleep(1500*(i+1));}}return{_http:'timeout'};}
const ids=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const outF=process.argv[3];
const out=fs.existsSync(outF)?JSON.parse(fs.readFileSync(outF,'utf8')):{};
for(const id of ids){
  if(out[id])continue;
  const j=await mb(`https://musicbrainz.org/ws/2/release-group/${id}?inc=releases+artist-credits&fmt=json`);
  await sleep(1100);
  if(j._http){out[id]={_err:j._http};continue;}
  const rel=(j.releases||[]).map(r=>({date:r.date||null,country:r.country||null,status:r.status,title:r.title,barcode:r.barcode||null}))
    .sort((a,b)=>String(a.date||'9999').localeCompare(String(b.date||'9999')));
  out[id]={title:j.title,credit:(j['artist-credit']||[]).map(c=>c.name+(c.joinphrase||'')).join(''),
    primary:j['primary-type'],secondary:j['secondary-types'],first:j['first-release-date'],n:rel.length,rel:rel.slice(0,8)};
  fs.writeFileSync(outF,JSON.stringify(out,null,1));
  console.log('ok',id,out[id].title);
}
fs.writeFileSync(outF,JSON.stringify(out,null,1));
