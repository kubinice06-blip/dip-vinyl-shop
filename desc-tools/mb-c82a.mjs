import {get,j} from './fetch-c82a.mjs';
const rgs=[
 ['sawasaki','03f864aa-9806-4ec8-af37-149d76c30bba'],
 ['blindlight','54088894-66b3-3280-8df6-dc7a91b13255'],
 ['scratches','b30f9e18-1d4f-4265-90b3-c1dd0bc2d43d'],
 ['curtin','54cede5d-a16a-4219-ac8c-293eda6ca7ce'],
 ['web','c0b99d3a-ab40-4059-a3c7-213e8c616b8e'],
 ['okihide','36cfcb96-cec4-445a-98b7-c670fca95da7'],
 ['uraura','12ddff22-f064-36ae-89d7-b7843c62afda'],
 ['photon','d7a37819-e8d8-4a46-a07c-6739a14b3ab9'],
 ['quadra','d4548b61-ade5-3c79-9260-6e1b6345c136'],
 ['kagami','c41ab607-3aef-4150-84e2-a85ec2eb027e'],
 ['cofu','1f8e1d64-f110-34ad-999c-89119c22cc23'],
 ['captainfunk','c6fd1c85-7c32-37a6-b06f-e64cc875515d'],
 ['brennan','1953ba6f-d34c-31dc-90fd-d9b830565b57'],
 ['circuit72','09844ab4-d8fb-3533-8786-33dd89956144'],
 ['cappablack','47ac7dbe-042a-362c-acd4-f02968fd194f'],
 ['mindedit','4dde2586-f578-389d-9ef0-02d58f83c976'],
 ['mfon','433eeaf0-628b-4ff0-b074-af003370a797'],
 ['zueff','768133b8-e897-49aa-b700-0d5e5e8e79e5'],
 ['taichi','5ced8e00-060a-3557-a701-583131ce9d6f'],
 ['goto','26347d9a-7bff-4086-b6b5-cc3a8b59caec'],
];
const out={};
for(const [k,id] of rgs){
  const rg=await j(`https://musicbrainz.org/ws/2/release-group/${id}?inc=artist-credits+releases+url-rels&fmt=json`);
  const rel=await j(`https://musicbrainz.org/ws/2/release?release-group=${id}&inc=recordings+labels+media+artist-credits&fmt=json&limit=100`);
  out[k]={rg,rel};
  const rs=(rel.releases||[]).map(r=>({id:r.id,date:r.date,country:r.country,status:r.status,title:r.title,
    labels:(r['label-info']||[]).map(l=>`${l.label&&l.label.name}|${l['catalog-number']}`),
    media:(r.media||[]).map(m=>({fmt:m.format,tc:m['track-count'],tracks:(m.tracks||[]).map(t=>`${t.position}. ${t.title} [${t.length?Math.round(t.length/1000):'?'}s]`)}))}));
  console.log('###',k,id);
  console.log(JSON.stringify({title:rg.title,frd:rg['first-release-date'],pt:rg['primary-type'],st:rg['secondary-types'],ac:(rg['artist-credit']||[]).map(a=>({credit:a.name,artist:a.artist&&a.artist.name,sort:a.artist&&a.artist['sort-name'],country:a.artist&&a.artist.country,type:a.artist&&a.artist.type,disamb:a.artist&&a.artist.disambiguation,id:a.artist&&a.artist.id})),relCount:(rel.releases||[]).length,releases:rs},null,1));
}
