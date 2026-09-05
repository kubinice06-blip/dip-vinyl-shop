const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function s(term,cc){
  for(let i=0;i<5;i++){
    const r=await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=${cc}&entity=album&limit=20`);
    if(r.status===403||r.status===429){await sleep(2500*(i+1));continue;}
    const d=await r.json();
    return d.results.map(x=>`${x.collectionId} | ${x.artistName} | ${x.collectionName}`);
  }
  return ['BLOCKED'];
}
const cases=[
 ['血肉果汁機 Flesh Juicer GIGO','tw'],
 ['血肉果汁機 GIGO','tw'],
 ['Flesh Juicer GIGO','tw'],
 ['血肉果汁機 Flesh Juicer 深海童話','tw'],
 ['血肉果汁機 深海童話','tw'],
 ['謝銘祐 城市','tw'],
 ['謝銘祐 城市裡那麼多的人','tw'],
 ['929 929同名專輯','tw'],
 ['929 渺小','tw'],
 ['玖壹壹 玖肆伍參','tw'],
 ['玖壹壹 9453','tw'],
];
for(const [t,cc] of cases){
  const r=await s(t,cc); await sleep(1500);
  console.log('### ['+t+'] @'+cc+' -> '+r.length);
  console.log(r.slice(0,8).map(x=>'   '+x).join('\n'));
}
