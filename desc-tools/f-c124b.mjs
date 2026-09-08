// c-124 b 組研究層：MB 資料抓取，可續跑、逐筆落檔
import fs from 'node:fs';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const SD='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c124b';
async function mb(url,tries=6){
  for(let i=0;i<tries;i++){
    try{
      const r=await fetch(url,{headers:{'User-Agent':UA},signal:AbortSignal.timeout(40000)});
      if(r.ok) return await r.json();
      if(r.status===503||r.status===429){await sleep(3000*(i+1));continue;}
      return {_http:r.status};
    }catch(e){await sleep(2000*(i+1));}
  }
  return {_http:'timeout'};
}
const cards=JSON.parse(fs.readFileSync('batches/cards/c124-cards.json','utf8')).filter(x=>x.group==='b');
const OUT=SD+'/mb.json';
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
const save=()=>fs.writeFileSync(OUT,JSON.stringify(out,null,1));
const only=process.argv[2]?parseInt(process.argv[2]):null;
for(let i=0;i<cards.length;i++){
  if(only!==null && i!==only) continue;
  const c=cards[i];
  const k=c.rgMbid;
  out[k]=out[k]||{key:c.key};
  // 1 rg
  if(!out[k].rg||out[k].rg._http){
    const j=await mb(`https://musicbrainz.org/ws/2/release-group/${k}?fmt=json&inc=artist-credits+releases+media+genres+tags`);
    out[k].rg=j._http?j:{
      id:j.id,title:j.title,disamb:j.disambiguation||'',
      ac:(j['artist-credit']||[]).map(a=>({n:a.name,jp:a.joinphrase||'',id:a.artist&&a.artist.id,an:a.artist&&a.artist.name,sort:a.artist&&a.artist['sort-name']})),
      pt:j['primary-type']||null,st:j['secondary-types']||[],frd:j['first-release-date']||null,
      genres:(j.genres||[]).map(g=>g.name+':'+g.count),
      tags:(j.tags||[]).map(g=>g.name+':'+g.count),
      releases:(j.releases||[]).map(r=>({id:r.id,title:r.title,date:r.date||null,country:r.country||null,status:r.status||null,disamb:r.disambiguation||'',barcode:r.barcode||null,media:(r.media||[]).map(m=>`${m.format||'?'}x${m['track-count']}`).join('+')}))
    };
    save();console.log(i,'rg',out[k].rg._http||out[k].rg.title);
    await sleep(1100);
  }
  // 2 releases full
  if(!out[k].rels||out[k].rels._http){
    const j=await mb(`https://musicbrainz.org/ws/2/release?release-group=${k}&fmt=json&inc=media+labels+recordings+artist-credits&limit=100`);
    out[k].rels=j._http?j:(j.releases||[]).map(r=>({
      id:r.id,title:r.title,date:r.date||null,country:r.country||null,status:r.status||null,
      barcode:r.barcode||null,packaging:r.packaging||null,
      labels:(r['label-info']||[]).map(l=>({label:l.label&&l.label.name,lid:l.label&&l.label.id,catno:l['catalog-number']||null})),
      media:(r.media||[]).map(m=>({fmt:m.format||null,tc:m['track-count'],tracks:(m.tracks||[]).map(t=>({p:t.position,t:t.title,len:t.length,ac:(t['artist-credit']||[]).map(a=>a.name).join('')}))}))
    }));
    save();console.log(i,'rels',out[k].rels._http||out[k].rels.length);
    await sleep(1100);
  }
  // 3 artists
  out[k].artists=out[k].artists||{};
  const aids=[...new Set((out[k].rg.ac||[]).map(a=>a.id).filter(Boolean))];
  for(const aid of aids){
    if(out[k].artists[aid]&&!out[k].artists[aid]._http) continue;
    const j=await mb(`https://musicbrainz.org/ws/2/artist/${aid}?fmt=json&inc=artist-rels+aliases`);
    out[k].artists[aid]=j._http?j:{
      id:j.id,name:j.name,sort:j['sort-name'],type:j.type||null,disamb:j.disambiguation||'',
      country:j.country||null,area:j.area&&j.area.name,begin:j['life-span']&&j['life-span'].begin,end:j['life-span']&&j['life-span'].end,ended:j['life-span']&&j['life-span'].ended,
      beginArea:j['begin-area']&&j['begin-area'].name,endArea:j['end-area']&&j['end-area'].name,
      aliases:(j.aliases||[]).map(a=>a.name+(a.locale?`(${a.locale})`:'')),
      rels:(j.relations||[]).map(r=>`${r.type}:${r.direction}:${(r.artist&&r.artist.name)||''}`)
    };
    save();console.log(i,'artist',aid,out[k].artists[aid]._http||out[k].artists[aid].name);
    await sleep(1100);
  }
  // 4 catalog
  out[k].cat=out[k].cat||{};
  for(const aid of aids){
    if(out[k].cat[aid]&&!out[k].cat[aid]._http) continue;
    let all=[],off=0,tot=1;
    while(off<tot){
      const j=await mb(`https://musicbrainz.org/ws/2/release-group?artist=${aid}&fmt=json&limit=100&offset=${off}`);
      if(j._http){all={_http:j._http};break;}
      tot=j['release-group-count'];
      all.push(...(j['release-groups']||[]).map(g=>({id:g.id,t:g.title,pt:g['primary-type']||null,st:g['secondary-types']||[],d:g['first-release-date']||null})));
      off+=100;await sleep(1100);
    }
    out[k].cat[aid]=all;
    save();console.log(i,'cat',aid,all._http||all.length);
  }
}
console.log('ALLDONE');
