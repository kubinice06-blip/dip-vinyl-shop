import fs from 'node:fs';
const D='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/mb';
for(let i=0;i<22;i++){
  const f=`${D}/orig-${i}.json`; if(!fs.existsSync(f))continue;
  const r=JSON.parse(fs.readFileSync(f,'utf8'));
  const ts=[]; for(const m of r.media) for(const t of m.tracks) if(t.length) ts.push([t.length,t.title,t.number]);
  ts.sort((a,b)=>a[0]-b[0]);
  const fm=x=>Math.floor(x/60000)+':'+String(Math.floor(x%60000/1000)).padStart(2,'0');
  console.log(i, '| n='+ts.length, '| min', fm(ts[0][0]), ts[0][1], '| max', fm(ts[ts.length-1][0]), ts[ts.length-1][1]);
}
