import fs from 'node:fs';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mb(url,tries=5){for(let i=0;i<tries;i++){try{const r=await fetch(url,{headers:{'User-Agent':UA},signal:AbortSignal.timeout(30000)});if(r.ok)return await r.json();if(r.status===503){await sleep(2500*(i+1));continue;}return {_http:r.status};}catch{await sleep(1800*(i+1));}}return{_http:'timeout'};}
async function caa(id){for(let i=0;i<3;i++){try{const r=await fetch(`https://coverartarchive.org/release-group/${id}/front`,{method:'HEAD',redirect:'follow',signal:AbortSignal.timeout(25000)});return r.status;}catch{await sleep(1500);}}return 'ERR';}
const picks=JSON.parse(fs.readFileSync('batch-progress/c122/picks.json','utf8'));
const rgp=JSON.parse(fs.readFileSync('batch-progress/c122/rg-probe.json','utf8'));
const OUT='batch-progress/c122/caa-label.json';
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
for(const p of picks){
  if(out[p.rg]){console.log('skip',p.album);continue;}
  const rec={artist:p.artist,album:p.album};
  rec.caa=await caa(p.rg); await sleep(400);
  // 釘最早的實體版（非 Digital Media 優先，取日期最早者）
  const rels=(rgp[p.rg]?.releases)||[];
  const phys=rels.filter(r=>!/Digital Media/.test(r.media));
  const pick=(phys.length?phys:rels).slice().sort((a,b)=>String(a.date||'9999').localeCompare(String(b.date||'9999')))[0];
  if(pick){
    const j=await mb(`https://musicbrainz.org/ws/2/release/${pick.id}?fmt=json&inc=labels+media`);
    rec.relId=pick.id;
    rec.rel=j._http?('HTTP '+j._http):{
      title:j.title,date:j.date,country:j.country,status:j.status,barcode:j.barcode||null,
      media:(j.media||[]).map(m=>`${m.format||'?'}×${m['track-count']}`).join('+'),
      labels:(j['label-info']||[]).map(l=>`${l.label?l.label.name:'?'}${l['catalog-number']?' ('+l['catalog-number']+')':''}`)
    };
    await sleep(1100);
  }
  out[p.rg]=rec;
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  console.log(`${p.artist} — ${p.album}  CAA ${rec.caa}  ${rec.rel&&rec.rel.labels?rec.rel.labels.join('; '):''} ${rec.rel&&rec.rel.media||''}`);
}
