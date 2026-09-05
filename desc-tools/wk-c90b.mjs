const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const UA='dip-vinyl-research/1.0 (kubinice06@gmail.com)';
async function get(url,tries=5){
  for(let i=0;i<tries;i++){
    try{const r=await fetch(url,{headers:{'User-Agent':UA,'Api-User-Agent':UA}});
      if(r.status===429||r.status===503){await sleep(4000*(i+1));continue;}
      if(!r.ok)return{__http:r.status};
      return JSON.parse(await r.text());}catch(e){await sleep(3000);}
  } return {__error:1};
}
for(const title of process.argv.slice(2)){
  const url=`https://zh.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&format=json&redirects=1&titles=${encodeURIComponent(title)}&variant=zh-tw`;
  const j=await get(url);
  const pages=j.query?j.query.pages:{};
  for(const p of Object.values(pages||{})){
    console.log('\n######## '+title+' -> '+(p.title||'MISSING')+(p.missing!==undefined?' [MISSING]':''));
    if(p.extract) console.log(p.extract.slice(0,9000));
  }
  await sleep(1800);
}
