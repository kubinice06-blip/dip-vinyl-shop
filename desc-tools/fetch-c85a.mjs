import fs from 'fs';
import path from 'path';
const CACHE='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/cache85a';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export async function get(url,{tries=6,delay=1500}={}){
  const key=path.join(CACHE, Buffer.from(url).toString('base64url').slice(0,180)+'.txt');
  if(fs.existsSync(key)) return fs.readFileSync(key,'utf8');
  for(let i=0;i<tries;i++){
    try{
      const r=await fetch(url,{headers:{'User-Agent':UA,'Accept':'application/json'}});
      const t=await r.text();
      if(r.status===200 && !/MusicBrainz web server is currently busy/.test(t)){
        fs.writeFileSync(key,t); await sleep(/discogs/.test(url)?2700:1100); return t;
      }
      if(r.status===404){ fs.writeFileSync(key,JSON.stringify({__http:404})); return fs.readFileSync(key,'utf8'); }
      await sleep(delay*(i+1));
    }catch(e){ await sleep(delay*(i+1)); }
  }
  return JSON.stringify({__fail:true,url});
}
export async function j(url){ try{ return JSON.parse(await get(url)); }catch(e){ return {__parsefail:true,url}; } }
if(process.argv[2]==='raw'){ console.log(await get(process.argv[3])); }
