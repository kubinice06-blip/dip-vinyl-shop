import {wiki} from './fetch-c88a.mjs';
const list=[[0,"Woodstock: Music from the Original Soundtrack and More"],[1,"The Rocky Horror Picture Show (soundtrack)"],[2,"Music of the Back to the Future franchise"],[4,"Rocky: Original Motion Picture Score"],[5,"The Sting (soundtrack)"],[6,"The Third Man Theme"],[7,"Midnight Cowboy"],[8,"La La Land (soundtrack)"],[9,"Amélie (soundtrack)"],[10,"Fight Club"],[11,"Forrest Gump: The Soundtrack"],[12,"The Matrix: Music from the Motion Picture"],[13,"O Brother, Where Art Thou? (soundtrack)"],[14,"Guardians of the Galaxy (soundtrack)"],[15,"The Big Lebowski (soundtrack)"],[16,"Reservoir Dogs (soundtrack)"],[17,"Jurassic Park (film score)"],[18,"The Lion King (1994 soundtrack)"],[19,"Batman (album)"],[20,"Gladiator (2000 soundtrack)"],[21,"Dances with Wolves (soundtrack)"]];
const only=process.argv[2]?process.argv[2].split(',').map(Number):list.map(x=>x[0]);
for(const [i,t] of list){ if(!only.includes(i))continue;
  const s=await wiki(t,'wk-'+i);
  console.log('\n#### '+i+' '+t+'  len='+s.length);
  if(s.length<200){console.log(' (MISSING)');continue}
  const clean=s.replace(/<ref[^>]*\/>/g,'[ref]').replace(/<ref[^>]*>[\s\S]*?<\/ref>/g,'[ref]');
  for(const p of clean.split('\n')){
    if(!/\[ref\]/.test(p)) continue;
    if(/^\s*[|*!{]/.test(p)) continue;
    if(!/(Academy Award|Oscar|Grammy|Golden Globe|Billboard|certifi|number one|number-one|chart|BAFTA|platinum|Platinum|gold|Gold|sold|sales|released|recorded|Recorded)/.test(p)) continue;
    console.log(' -- '+p.replace(/'''?/g,'').slice(0,700));
  }
}
