import {j} from './fetch-c82a.mjs';
const arts=[
['Sawasaki','15415384-7777-459c-9485-6af5e311517d'],
['BlindLight','49e8b2a3-c38d-4fbc-8fb7-0f9030ec552a'],
['AKIO','a9313083-773d-4d68-bbab-1ec689e81cc3'],
['OKIHIDE','02199597-be4f-4eac-b207-2ec04de599fb'],
['Curtin','6acf709d-9deb-46de-aaa4-44e3b835c15f'],
['Web','53fa0233-3ae2-4804-872f-c120a29f5d3b'],
['UraUra','bce3bddb-5971-408f-a5c4-52e8b96fe7ab'],
['Shiraishi','c81ebc74-1134-4b4f-ac4d-67f4555773b2'],
['Quadra','f8680968-5aab-443b-8bf8-f2984b23d034'],
['KAGAMI','d0cf00b5-bfd3-49be-863f-f2d50e7773b6'],
['CoFusion','90563b61-bf68-4708-9d97-bd4cb3aa6149'],
['CaptainFunk','61012883-fb14-490f-ae9a-e9c152809038'],
['Brennan','19e9dfaf-36bd-4819-bc21-ced5d3db4156'],
['RiowArai','6efd4a56-0328-455e-b20b-ecae1619921d'],
['Cappablack','af36c3b1-66ab-4791-bb06-0bb206661221'],
['MFON','96b5d5a9-3a98-44fb-811b-bc24e6d657e0'],
['Zuev','8ad9497b-3003-41ff-9af6-667ec8b68110'],
['Taichi','21f50036-39eb-4248-99a2-a2c30a4beb31'],
['Goto','3e559cd1-ae94-490b-9c52-b4a5657460e5'],
];
for(const [k,id] of arts){
  const a=await j(`https://musicbrainz.org/ws/2/artist/${id}?inc=aliases+url-rels&fmt=json`);
  console.log('###',k,id, JSON.stringify({name:a.name,sort:a['sort-name'],type:a.type,country:a.country,area:a.area&&a.area.name,begin:a['life-span'],disamb:a.disambiguation,
   aliases:(a.aliases||[]).map(x=>x.name+(x.type?'['+x.type+']':'')+(x.locale?'@'+x.locale:'')),
   urls:(a.relations||[]).map(r=>r.type+': '+(r.url&&r.url.resource))}));
}
