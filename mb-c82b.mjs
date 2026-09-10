// 暫存工具（c-82 b 組研究層）：帶快取的 MB／Discogs 取數
import fs from 'node:fs';
import crypto from 'node:crypto';
const DIR='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/cache';
const UA='dip-vinyl-research/1.0 (kubinice06@gmail.com)';
let last=0;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export async function get(url,{ttl=0}={}){
  const f=`${DIR}/${crypto.createHash('sha1').update(url).digest('hex')}.json`;
  if(fs.existsSync(f)) return JSON.parse(fs.readFileSync(f,'utf8'));
  const gap=url.includes('discogs')?1400:1200;
  const wait=last+gap-Date.now(); if(wait>0) await sleep(wait);
  let r,txt;
  for(let i=0;i<4;i++){
    try{ r=await fetch(url,{headers:{'User-Agent':UA,'Accept':'application/json'}});
      last=Date.now();
      if(r.status===429||r.status===503){ await sleep(4000*(i+1)); continue; }
      txt=await r.text();
      if(!r.ok) return {__err:r.status,__url:url,__body:txt.slice(0,300)};
      const j=JSON.parse(txt); fs.writeFileSync(f,JSON.stringify(j)); return j;
    }catch(e){ await sleep(2500*(i+1)); }
  }
  return {__err:'fail',__url:url};
}
export const MB=(p)=>get(`https://musicbrainz.org/ws/2/${p}${p.includes('?')?'&':'?'}fmt=json`);
export const DC=(p)=>get(`https://api.discogs.com/${p}`);
