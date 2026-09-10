const UA={'User-Agent':'dipvinylshop/1.0 +https://dipvinyl.example'};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function j(u){for(let i=0;i<5;i++){const r=await fetch(u,{headers:UA});if(r.ok)return await r.json();if(r.status===429){await sleep(4000);continue}return{__err:r.status,u}}return{__err:'fail'}}
const cmd=process.argv[2];
if(cmd==='labelrel'){
  const id=process.argv[3];
  for(let p=1;p<=(+process.argv[4]||1);p++){
    const d=await j(`https://api.discogs.com/labels/${id}/releases?per_page=100&page=${p}`);
    if(d.__err){console.log('ERR',d.__err);break}
    console.log('# page',p,'of',d.pagination&&d.pagination.pages,'items',d.pagination&&d.pagination.items);
    for(const r of (d.releases||[])) console.log(' ',r.catno,'|',r.artist,'|',r.title,'|',r.year,'|',r.format,'|',r.id);
    await sleep(1200);
  }
}
