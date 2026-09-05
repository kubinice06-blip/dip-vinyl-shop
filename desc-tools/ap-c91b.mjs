import fs from 'fs';
const SD='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const list=[
 ['滅火器|衝啦!',572183014,'tw'],
 ['滅火器|無名英雄',1547581059,'tw'],
 ['滅火器|無名英雄-EN',1541563781,'tw'],
 ['滅火器|家和萬事興',1689536430,'tw'],
 ['珂拉琪|MEmento·MORI',1783103459,'tw'],
 ['珂拉琪|Deus Ex Machina',1783690060,'tw'],
 ['血肉果汁機|GIGO',1578470615,'tw'],
 ['血肉果汁機|深海童話',1398909746,'tw'],
 ['謝銘祐|城市',1745304543,'tw'],
 ['929|929同名專輯',6768261172,'tw'],
 ['玖壹壹|玖肆伍參',1064846463,'tw'],
 ['玖壹壹|打鐵',1498569508,'tw'],
 ['玖壹壹|周法薷',1239322549,'tw'],
];
const out={};
for(const [k,id,cc] of list){
  let d=null;
  for(let i=0;i<4;i++){
    try{const r=await fetch(`https://itunes.apple.com/lookup?id=${id}&country=${cc}&entity=song&limit=60`);
      if(r.status===403||r.status===429){await sleep(3000*(i+1));continue;}
      d=await r.json(); break;}catch(e){await sleep(2500);}
  }
  await sleep(1500);
  if(!d||!d.results||!d.results.length){out[k]={id,err:'no result'};console.log(k,'NO RESULT');continue;}
  const col=d.results.find(x=>x.wrapperType==='collection');
  const tr=d.results.filter(x=>x.wrapperType==='track');
  out[k]={id,collectionName:col?.collectionName,artistName:col?.artistName,trackCount:col?.trackCount,
    releaseDate:col?.releaseDate,copyright:col?.copyright,explicit:col?.collectionExplicitness,
    tracks:tr.map(t=>({n:t.trackNumber,name:t.trackName,ms:t.trackTimeMillis,ex:t.trackExplicitness,prev:!!t.previewUrl})),
    firstPreview:tr[0]?.previewUrl};
  console.log(k,'|',col?.collectionName,'|',col?.artistName,'|tc',col?.trackCount,'|got',tr.length,'|',col?.collectionExplicitness,'|',col?.releaseDate,'|',col?.copyright);
}
fs.writeFileSync(SD+'/c91b-apple.json',JSON.stringify(out,null,1));
