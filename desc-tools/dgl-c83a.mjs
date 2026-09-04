import {j} from './fetch-c83a.mjs';
for(const id of process.argv.slice(2)){
  const o=await j(`https://api.discogs.com/labels/${id}`);
  if(o.__fail||o.__parsefail||o.__http){console.log('### FAIL',id,JSON.stringify(o));continue;}
  console.log('### LABEL',id,'https://www.discogs.com/label/'+id);
  console.log(JSON.stringify({name:o.name,profile:o.profile,contact_info:o.contact_info,urls:o.urls,sublabels:(o.sublabels||[]).map(s=>s.name),parent:o.parent_label&&o.parent_label.name},null,1));
}
