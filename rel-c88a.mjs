import {mbRelease} from './fetch-c88a.mjs';
const ids={
0:'adf7d4ca-da9a-4595-ac1f-69284a5e8ced',1:'cf45ab94-a52a-4109-bac6-e596dd805d5d',2:'d25d4b18-3045-4549-abac-ad258d99ce46',
3:'190bbf08-00a7-3c27-98b9-bb648b3b5f60',4:'1d5ac899-3b7f-337d-9982-7d4a0c248e21',5:'e02c28af-8f42-4ea4-928c-4c5244b7c10a',
6:'349245e0-b3ad-4ddf-87cd-5854e154fb90',7:'80448e69-a14c-43bc-b9f9-688522a72891',8:'c2d280a9-b5c8-4f4b-b311-9859aabe9003',
9:'fd14a4e3-f39a-4fef-afba-36ab8d22902b',10:'39e42ee2-37e5-389b-8f38-edceb898ed09',11:'97b727f1-8f4e-42fc-ac00-cc87536273aa',
12:'70087da2-9e33-3499-880a-af3bcf549a4d',13:'3d57a436-7685-4390-95b0-4704acacdae1',14:'e02022fc-2f0d-40fa-99ff-c2b9d06d2b3b',
15:'48405599-1ac5-4e15-a4d5-6a22557dc320',16:'02c1a25d-8f78-4a0a-85e6-30ef56661e3f',17:'adac72b1-b63d-4a65-a21b-ac86e21ef0ae',
18:'1c4cab82-1beb-4fb3-a04f-cb69b5c6ae3e',19:'2da4b3bc-90ef-4b19-859a-de62284311f0',20:'7ce55375-0f8d-462d-bb5e-a6a37acc23e2',
21:'9f4ff8ba-ea1c-4ee7-8814-2a514fb78c28'};
const only=process.argv[2]?process.argv[2].split(',').map(Number):Object.keys(ids).map(Number);
for(const i of only){
  const r=await mbRelease(ids[i],`orig-${i}`);
  if(!r){console.log('### '+i+' FAIL');continue;}
  console.log(`\n### ${i} ${r.title} | ${r['artist-credit'].map(a=>a.name+(a.joinphrase||'')).join('')} | ${r.date} ${r.country} ${r.status} | barcode ${r.barcode} | ${(r['label-info']||[]).map(l=>(l.label&&l.label.name)+' '+l['catalog-number']).join(' ; ')}`);
  for(const m of r.media){
    console.log(` -- ${m.format} disc${m.position} (${m['track-count']})`);
    for(const t of m.tracks) console.log(`    ${t.number} ${t.title} [${t.length?Math.floor(t.length/60000)+':'+String(Math.round(t.length%60000/1000)).padStart(2,'0'):'-'}] :: ${t['artist-credit'].map(a=>a.name+(a.joinphrase||'')).join('')}`);
  }
}
