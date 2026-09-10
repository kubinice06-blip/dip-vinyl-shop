import fs from 'node:fs';
const DIR='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/mb';
const UA='dip-vinyl-shop/1.0 ( kubinice06@gmail.com )';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url,name,delay=400,hdr={}){
  const f=`${DIR}/${name}.json`;
  if(fs.existsSync(f)) return JSON.parse(fs.readFileSync(f,'utf8'));
  for(let i=0;i<4;i++){
    try{
      const r=await fetch(url,{headers:{'User-Agent':UA,...hdr}});
      if(r.ok){const t=await r.text();fs.writeFileSync(f,t);await sleep(delay);return JSON.parse(t);}
    }catch(e){}
    await sleep(2000);
  }
  console.error('FAIL '+url); return null;
}
export const mbRelease=(id,n)=>get(`https://musicbrainz.org/ws/2/release/${id}?fmt=json&inc=recordings+labels+artist-credits+media+release-groups`,n,1100);
export const mbRG=(id,n)=>get(`https://musicbrainz.org/ws/2/release-group/${id}?fmt=json&inc=artist-credits+releases`,n,1100);
export const mbArtist=(id,n)=>get(`https://musicbrainz.org/ws/2/artist/${id}?fmt=json`,n,1100);
export const itunes=(url,n)=>get(url,n,300);
export const dg=(path,n)=>get('https://api.discogs.com'+path,n,1200);
export async function wiki(title,n){
  const f=`${DIR}/${n}.txt`;
  if(fs.existsSync(f)) return fs.readFileSync(f,'utf8');
  const r=await fetch(`https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(title)}&action=raw`,{headers:{'User-Agent':UA}});
  if(!r.ok){console.error('wiki fail '+title);return '';}
  const t=await r.text(); fs.writeFileSync(f,t); await sleep(300); return t;
}
if(process.argv[2]==='cli'){
  const [,,,kind,arg,name]=process.argv;
  const fn={rel:mbRelease,rg:mbRG,art:mbArtist,it:itunes,dg:dg,wiki:wiki}[kind];
  const r=await fn(arg,name);
  console.log(typeof r==='string'?r:JSON.stringify(r,null,1));
}
