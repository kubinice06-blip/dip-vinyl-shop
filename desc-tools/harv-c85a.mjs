import {j,get} from './fetch-c85a.mjs';
import fs from 'fs';
const OUT='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c85a';
fs.mkdirSync(OUT,{recursive:true});
const cards=JSON.parse(fs.readFileSync('./batches/cards/c85-cards.json','utf8')).filter(c=>c.group==='a');
const SPEC={
 1:{dg:[1445402],master:[186950],apple:[1815788020]},
 2:{dg:[1906518],master:[486587],apple:[1413337908]},
 3:{dg:[567128],master:[866671],apple:[]},
 4:{dg:[3988455],master:[464288],apple:[]},
 5:{dg:[1242383],master:[875453],apple:[302866738]},
 6:{dg:[1801497],master:[410723],apple:[1451727441]},
 7:{dg:[1093433],master:[507864],apple:[]},
 8:{dg:[1522216],master:[686357],apple:[1274199535]},
 9:{dg:[6870402],master:[820477],apple:[]},
 10:{dg:[2872169],master:[805085],apple:[]},
 11:{dg:[2782515],master:[321897],apple:[1800033922]},
 12:{dg:[1976568],master:[1449710],apple:[187684676]},
 13:{dg:[1225163],master:[235198],apple:[65866661]},
 14:{dg:[10308307],master:[1999507],apple:[]},
 15:{dg:[2936268],master:[1007865],apple:[1086445656]},
 16:{dg:[32704917,538511],master:[118441],apple:[576239322]},
 17:{dg:[3201504],master:[1234855],apple:[1839056132]},
 18:{dg:[2319917],master:[507092],apple:[1583924704]},
 19:{dg:[2189638],master:[],apple:[]},
 20:{dg:[2858057],master:[],apple:[1658933613]},
 21:{dg:[3142606],master:[1155920],apple:[1221853662]},
 22:{dg:[2349736],master:[685317],apple:[]},
};
const only=process.argv.slice(2).map(Number);
function fmtms(ms){return ms?Math.floor(ms/60000)+':'+String(Math.round(ms%60000/1000)).padStart(2,'0'):''}
for(let i=0;i<cards.length;i++){
  const n=i+1; if(only.length&&!only.includes(n)) continue;
  const c=cards[i]; const s=SPEC[n]||{dg:[],master:[],apple:[]};
  const L=[]; const p=x=>L.push(typeof x==='string'?x:JSON.stringify(x,null,1));
  p(`##### CARD ${n}: ${c.artist} | ${c.album} | ${c.year} | ${c.label}`);
  const rg=await j(`https://musicbrainz.org/ws/2/release-group/${c.rgMbid}?inc=artist-credits+genres+url-rels+annotation&fmt=json`);
  p('## MB RG '+c.rgMbid);
  p({title:rg.title,frd:rg['first-release-date'],pt:rg['primary-type'],st:rg['secondary-types'],ann:rg.annotation,
    ac:(rg['artist-credit']||[]).map(a=>({credit:a.name,artistName:a.artist?.name,id:a.artist?.id,type:a.artist?.type,country:a.artist?.country,dis:a.artist?.disambiguation,sort:a.artist?.['sort-name']})),
    genres:(rg.genres||[]).map(g=>g.name+':'+g.count), rels:(rg.relations||[]).map(r=>r.type+' -> '+(r.url?.resource||''))});
  for(const a of (rg['artist-credit']||[])){
    if(!a.artist?.id) continue;
    const ar=await j(`https://musicbrainz.org/ws/2/artist/${a.artist.id}?inc=aliases+url-rels&fmt=json`);
    p('## MB ARTIST '+a.artist.id);
    p({name:ar.name,sort:ar['sort-name'],type:ar.type,gender:ar.gender,country:ar.country,area:ar.area?.name,begin:ar['begin-area']?.name,life:ar['life-span'],dis:ar.disambiguation,
      aliases:(ar.aliases||[]).map(x=>x.name+'|'+(x.type||'')+'|'+(x.locale||'')), rels:(ar.relations||[]).map(r=>r.type+' -> '+(r.url?.resource||''))});
  }
  const rs=await j(`https://musicbrainz.org/ws/2/release?release-group=${c.rgMbid}&inc=recordings+labels+media+artist-credits&limit=100&fmt=json`);
  p('## MB RELEASES count='+rs['release-count']);
  for(const r of (rs.releases||[])) p({id:r.id,title:r.title,date:r.date,country:r.country,status:r.status,barcode:r.barcode,pkg:r.packaging,
      ac:(r['artist-credit']||[]).map(a=>a.name).join(''),
      labels:(r['label-info']||[]).map(l=>(l.label?.name||'?')+' | '+(l['catalog-number']||'')),
      media:(r.media||[]).map(m=>m.format+' x'+m['track-count']),
      tracks:(r.media||[]).flatMap(m=>(m.tracks||[]).map(t=>`${t.position}. ${t.title} ${fmtms(t.length)}`))});
  for(const id of s.dg){
    const o=await j(`https://api.discogs.com/releases/${id}`);
    p('## DISCOGS RELEASE '+id+' https://www.discogs.com/release/'+id);
    if(o.__fail||o.__parsefail||o.message){p({err:o.message||'fail'});continue;}
    p({title:o.title,artists:(o.artists||[]).map(a=>a.name+(a.anv?` (anv:${a.anv})`:'')+(a.join?' '+a.join:'')),
      year:o.year,released:o.released,released_formatted:o.released_formatted,country:o.country,
      labels:(o.labels||[]).map(l=>l.name+' | '+l.catno),series:(o.series||[]).map(x=>x.name+' | '+x.catno),
      formats:(o.formats||[]).map(f=>f.name+' x'+f.qty+' ['+(f.descriptions||[]).join(', ')+']'+(f.text?' text:'+f.text:'')),
      genres:o.genres,styles:o.styles,notes:o.notes,
      companies:(o.companies||[]).map(x=>x.entity_type_name+': '+x.name),
      extraartists:(o.extraartists||[]).map(e=>e.role+': '+e.name+(e.anv?'(anv:'+e.anv+')':'')+(e.tracks?' ['+e.tracks+']':'')),
      identifiers:(o.identifiers||[]).map(x=>x.type+': '+x.value+(x.description?' ['+x.description+']':'')),
      tracklist:(o.tracklist||[]).map(t=>`${t.position}. ${t.title} ${t.duration||''}`+(t.extraartists?' {'+t.extraartists.map(e=>e.role+':'+e.name).join('; ')+'}':'')),
      master_url:o.master_url,num_for_sale:undefined});
  }
  for(const id of s.master){
    const o=await j(`https://api.discogs.com/masters/${id}`);
    p('## DISCOGS MASTER '+id+' https://www.discogs.com/master/'+id);
    if(o.__fail||o.message){p({err:o.message||'fail'});continue;}
    p({title:o.title,year:o.year,main_release:o.main_release,num_versions:o.versions_url?undefined:undefined,
      genres:o.genres,styles:o.styles,notes:o.notes,
      tracklist:(o.tracklist||[]).map(t=>`${t.position}. ${t.title} ${t.duration||''}`),
      artists:(o.artists||[]).map(a=>a.name+(a.anv?` (anv:${a.anv})`:''))});
    const v=await j(`https://api.discogs.com/masters/${id}/versions?per_page=100`);
    p('## DISCOGS VERSIONS of master '+id+' count='+(v.pagination?.items));
    p((v.versions||[]).map(x=>`${x.id} | ${x.released} | ${x.country} | ${x.label} | ${x.catno} | ${x.format} | ${x.title} | ${x.major_formats} | ${x.status||''}`));
  }
  for(const id of s.apple){
    for(const cc of ['gb','us']){
      const o=await j(`https://itunes.apple.com/lookup?id=${id}&entity=song&limit=200&country=${cc}`);
      const r=o.results||[]; const col=r.find(x=>x.wrapperType==='collection');
      p(`## APPLE ${cc} lookup ${id}`);
      if(!col){p('NOTFOUND in '+cc);continue;}
      p({name:col.collectionName,artist:col.artistName,tc:col.trackCount,date:col.releaseDate,cr:col.copyright,genre:col.primaryGenreName,url:col.collectionViewUrl});
      p(r.filter(x=>x.wrapperType==='track').map(t=>`${t.trackNumber}. ${t.trackName} ${fmtms(t.trackTimeMillis)}${t.previewUrl?'':' [NOPREVIEW]'}`));
      break;
    }
  }
  fs.writeFileSync(`${OUT}/card${String(n).padStart(2,'0')}.txt`,L.join('\n'));
  console.log('done',n,c.artist);
}
