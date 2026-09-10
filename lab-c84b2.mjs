const UA={'User-Agent':'dipvinylshop/1.0 +https://dipvinyl.example'};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function j(u){for(let i=0;i<5;i++){const r=await fetch(u,{headers:UA});if(r.ok)return await r.json();if(r.status===429){await sleep(4000);continue}return{__err:r.status}}return{__err:'fail'}}
for(const id of process.argv.slice(2)){
  const d=await j(`https://api.discogs.com/labels/${id}`);
  if(d.__err){console.log('#### LABEL',id,'ERR',d.__err);continue}
  console.log('#### LABEL',id,'|',d.name,'| contact:',(d.contact_info||'').replace(/\n/g,' '),'| parent',d.parent_label&&d.parent_label.name);
  console.log('  PROFILE:',(d.profile||'').replace(/\n/g,' \\n '));
  console.log('  SUBS:',JSON.stringify((d.sublabels||[]).map(s=>s.name)));
  await sleep(1200);
}
