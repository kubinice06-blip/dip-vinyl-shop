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
  const url=`https://zh.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json&redirects=1`;
  const j=await get(url);
  console.log('\n######## '+title+(j.error?(' ERROR '+j.error.code):''));
  if(j.parse&&j.parse.wikitext) console.log(j.parse.wikitext['*'].slice(0,60000));
  await sleep(1800);
}
