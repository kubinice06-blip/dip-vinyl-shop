const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function s(term,cc,ent='album'){
  for(let i=0;i<5;i++){
    const r=await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=${cc}&entity=${ent}&limit=25`);
    if(r.status===403||r.status===429){await sleep(2500*(i+1));continue;}
    const d=await r.json();
    return d.results.map(x=>`${x.collectionId} | ${x.artistName} | ${x.collectionName}`);
  }
  return ['BLOCKED'];
}
for(const [t,cc] of [['謝銘祐','tw'],['玖壹壹','tw'],['血肉果汁機','tw'],['Flesh Juicer','tw'],['玖壹壹 嘻哈庄腳情','tw'],['血肉果汁機 血肉宮','tw']]){
  const r=await s(t,cc); await sleep(1500);
  console.log('### ['+t+'] -> '+r.length);
  console.log(r.map(x=>'   '+x).join('\n'));
}
