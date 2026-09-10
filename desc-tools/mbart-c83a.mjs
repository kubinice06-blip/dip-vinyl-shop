import {j} from './fetch-c83a.mjs';
import fs from 'fs';
const cards=JSON.parse(fs.readFileSync('./batches/cards/c83-cards.json','utf8')).filter(x=>x.group==='a');
for(const c of cards){
  const rg=await j(`https://musicbrainz.org/ws/2/release-group/${c.rgMbid}?inc=artist-credits&fmt=json`);
  const aid=rg['artist-credit'][0].artist.id;
  const a=await j(`https://musicbrainz.org/ws/2/artist/${aid}?inc=aliases+release-groups+url-rels&fmt=json`);
  const rgs=(a['release-groups']||[]);
  console.log('###',c.artist,'| MBID',aid);
  console.log(JSON.stringify({name:a.name,sort:a['sort-name'],country:a.country,area:a.area&&a.area.name,begin_area:a['begin-area']&&a['begin-area'].name,type:a.type,disamb:a.disambiguation,life:a['life-span'],
    aliases:(a.aliases||[]).map(x=>x.name+(x.type?'['+x.type+']':'')),
    urls:(a.relations||[]).map(r=>r.type+':'+(r.url&&r.url.resource)),
    rgCount:rgs.length, albums:rgs.filter(g=>g['primary-type']==='Album').map(g=>`${g['first-release-date']||'?'} ${g.title} [${(g['secondary-types']||[]).join('/')}]`)}));
}
