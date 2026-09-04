import fs from 'fs';
import path from 'path';
const CACHE='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/cache88b';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export async function get(url,{tries=5,delay=1500}={}){
  const key=path.join(CACHE, Buffer.from(url).toString('base64url').slice(0,180)+'.txt');
  if(fs.existsSync(key)) return fs.readFileSync(key,'utf8');
  for(let i=0;i<tries;i++){
    try{
      const r=await fetch(url,{headers:{'User-Agent':UA,'Accept':'application/json'}});
      const t=await r.text();
      if(r.status===200 && !/MusicBrainz web server is currently busy/.test(t)){
        fs.writeFileSync(key,t); await sleep(1100); return t;
      }
      if(r.status===404){ const b=JSON.stringify({__http:404}); fs.writeFileSync(key,b); return b; }
      await sleep(delay*(i+1));
    }catch(e){ await sleep(delay*(i+1)); }
  }
  return JSON.stringify({__fail:true,url});
}
export async function j(url){ try{ return JSON.parse(await get(url)); }catch(e){ return {__parsefail:true,url}; } }
export const ms=n=>{ if(n==null) return '?'; const s=Math.floor(n/1000); return Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); };
if(process.argv[2]==='raw'){ console.log(await get(process.argv[3])); }
