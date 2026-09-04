import {dg} from './fetch-c88a.mjs';
const qs=[
 ['0','catno=SD 3-500&country=US&format=Vinyl&type=release'],
 ['1','catno=OSV-21653&type=release'],
 ['3','catno=SK 63213&country=US&type=release'],
 ['5','catno=MCA-390&country=US&type=release'],
 ['6','q=Anton Karas Third Man Soundtrack Factory&type=release'],
 ['7','catno=UAS 5198&type=release'],
 ['8','catno=B0026092-02&type=release'],
 ['9','catno=724381022924&type=release'],
 ['10','catno=7 73715-2&type=release'],
 ['11','catno=E2K 66329&type=release'],
 ['12','catno=9 47390-2&type=release'],
 ['13','catno=088 170-069-2&type=release'],
 ['14','catno=D002054602&type=release'],
 ['15','catno=314 536 903-2&type=release'],
 ['16','catno=MCAD-10541&type=release'],
 ['17','catno=MCAD-10859&type=release'],
 ['18','catno=60858-2&type=release'],
 ['19','catno=9 25977-2&type=release'],
 ['20','catno=289 467 094-2&type=release'],
 ['21','catno=ZK 46982&type=release'],
];
for(const [i,q] of qs){
  const r=await dg('/database/search?'+q+'&per_page=6','dgs-'+i);
  console.log('### '+i);
  if(!r){console.log(' FAIL');continue}
  for(const x of (r.results||[])) console.log('  ',x.id,'|',x.title,'|',x.year,'|',(x.label||[]).slice(0,2).join('/'),'|',x.catno,'|',(x.format||[]).join(','),'|',x.country);
}
