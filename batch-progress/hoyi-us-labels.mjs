// 補遺線重篩第二輪（主線第 2011-B 條；c-197 b 第 7775 條建議）：判「乙」而最早那一版在美國的 King／Victor／Columbia 碟，
// 逐筆抓 MB release 的 label-info，看最早那一版是不是日本系的美國字標（Paddle Wheel／ProJazz／Electric Bird／JVC JD-）。
// 用法：node batch-progress/hoyi-us-labels.mjs batch-progress/enum/hoyi-us-labels.json（有快取）
import fs from 'node:fs';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)'; const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const o=JSON.parse(fs.readFileSync('batch-progress/enum/hoyi-foreign-origin.json','utf8'));
const OUT=process.argv[2]; let cache={}; try{cache=JSON.parse(fs.readFileSync(OUT,'utf8'))}catch{}
for (const [rg,v] of Object.entries(o)) {
  if (v.verdict!=='乙' || !/king|victor|columbia|cbs/.test(v.slug) || !/US/.test(v.why) || v.year>1989) continue;
  if (cache[rg]) continue;
  let rels=[];
  for (let t=0;t<4;t++){ try{ const r=await fetch(`https://musicbrainz.org/ws/2/release?release-group=${rg}&inc=labels&fmt=json&limit=100`,{headers:{'User-Agent':UA}}); if(r.ok){rels=(await r.json()).releases||[];break} }catch{} await sleep(3000); }
  const nonjp=rels.filter(x=>x.country!=='JP'&&x.date).sort((a,b)=>a.date.localeCompare(b.date));
  const jp=rels.filter(x=>x.country==='JP').sort((a,b)=>(a.date||'9').localeCompare(b.date||'9'));
  const lab=x=>x?(x['label-info']||[]).map(l=>`${l.label?.name||'?'} ${l['catalog-number']||''}`).join(' / '):'';
  cache[rg]={artist:v.artist,album:v.album,year:v.year,slug:v.slug,why:v.why,firstNonJp:nonjp[0]?`${nonjp[0].date} ${nonjp[0].country} ${lab(nonjp[0])}`:'',firstJp:jp[0]?`${jp[0].date||'?'} ${lab(jp[0])}`:''};
  fs.writeFileSync(OUT,JSON.stringify(cache,null,1));
  await sleep(1100);
}
console.log(Object.keys(cache).length);
