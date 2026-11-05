import fs from 'node:fs';
const SP=process.argv[2];const W='https://dip-vinyl-worker.kubinice06.workers.dev';const UA='dip-vinyl-shop/1.0 (+https://dipvinyl.tw)';
const rows=JSON.parse(fs.readFileSync(SP+'/bc/cand-all.json','utf8'));const OUT=SP+'/bc/listeners.json';
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};const todo=rows.filter(r=>!(r.key in out));let n=0,idx=0;
async function one(r){try{const res=await fetch(`${W}/album-rating?artist=${encodeURIComponent(r.artist)}&album=${encodeURIComponent(r.album)}`,{headers:{'User-Agent':UA},signal:AbortSignal.timeout(20000)});const j=await res.json();out[r.key]={l:typeof j._listeners==='number'?j._listeners:null,p:j._playcount??null}}catch{out[r.key]={l:null}}if(++n%100===0){fs.writeFileSync(OUT,JSON.stringify(out));console.log(n,'/',todo.length)}}
await Promise.all(Array.from({length:10},async()=>{while(idx<todo.length){const r=todo[idx++];await one(r);await new Promise(s=>setTimeout(s,100))}}));
fs.writeFileSync(OUT,JSON.stringify(out));console.log('done',Object.values(out).filter(v=>typeof v.l==='number').length,'/',Object.keys(out).length);
