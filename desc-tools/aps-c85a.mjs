import {j} from './fetch-c85a.mjs';
const terms=[
 ['1','Earth Stone Kool Roots','Kool Roots'],
 ['3','Johnny Osbourne In Nah Disco Style','In Nah Disco Style'],
 ['4','Leroy Smart Impressions','Impressions of Leroy Smart'],
 ['7','Phil Pratt Star Wars Dub','Star Wars Dub'],
 ['9','Prince Jazzbo Kick Boy Face','Kick Boy Face'],
 ['10','Owen Gray Forward on the Scene','Forward on the Scene'],
 ['14','Sylvia Tella Will You Still Want Me','Will You Still Want Me'],
 ['16','Winston Edwards Blackbeard Dub Conference','At 10 Downing Street'],
 ['19','Jean Adebambo Feelings','Jean Adebambo'],
 ['22','Well Pack Band Workers Speak','Workers Speak To Their Slave Masters'],
];
for(const [n,t1,t2] of terms){
  console.log('##### CARD',n);
  for(const t of [t1,t2]){
    for(const c of ['gb','us']){
      const o=await j(`https://itunes.apple.com/search?term=${encodeURIComponent(t)}&entity=album&limit=25&country=${c}`);
      const rs=(o.results||[]);
      console.log(` [${c}] "${t}" -> ${rs.length}`);
      for(const x of rs.slice(0,12)) console.log(`    ${x.collectionId} | ${x.artistName} | ${x.collectionName} | ${x.trackCount}tr | ${String(x.releaseDate).slice(0,10)}`);
    }
  }
}
