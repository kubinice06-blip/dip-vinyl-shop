import fs from 'node:fs';
const SP=process.argv[2];const W='https://dip-vinyl-worker.kubinice06.workers.dev';const UA='dip-vinyl-shop/1.0 (+https://dipvinyl.tw)';
const rows=JSON.parse(fs.readFileSync(SP+'/nt/cand.json','utf8'));const OUT=SP+'/nt/listeners.json';
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};const todo=rows.filter(r=>!(r.key in out));let n=0,idx=0;
async function one(r){try{const res=await fetch(`${W}/album-rating?artist=${encodeURIComponent(r.artist)}&album=${encodeURIComponent(r.title)}`,{headers:{'User-Agent':UA},signal:AbortSignal.timeout(20000)});const j=await res.json();out[r.key]=typeof j._listeners==='number'?j._listeners:null}catch{out[r.key]=null}if(++n%100===0){fs.writeFileSync(OUT,JSON.stringify(out));console.log(n,'/',todo.length)}}
await Promise.all(Array.from({length:10},async()=>{while(idx<todo.length){const r=todo[idx++];await one(r);await new Promise(s=>setTimeout(s,100))}}));
fs.writeFileSync(OUT,JSON.stringify(out));console.log('done',Object.values(out).filter(v=>typeof v==='number').length,'/',Object.keys(out).length);
