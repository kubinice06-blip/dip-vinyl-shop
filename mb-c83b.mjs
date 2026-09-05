// c83 b 組研究層暫存工具（用完刪）
const UA = 'dip-vinyl-shop-research/1.0 ( kubinice06@gmail.com )';
const CACHE = '/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c83b';
import fs from 'fs';
import crypto from 'crypto';

const sleep = ms => new Promise(r => setTimeout(r, ms));

export async function getJSON(url, {tries=6, base=1500, ua=UA, cache=true} = {}) {
  const key = CACHE + '/' + crypto.createHash('md5').update(url).digest('hex') + '.json';
  if (cache && fs.existsSync(key)) return JSON.parse(fs.readFileSync(key,'utf8'));
  let last;
  for (let i=0;i<tries;i++) {
    try {
      const r = await fetch(url, {headers:{'User-Agent':ua,'Accept':'application/json'}});
      const t = await r.text();
      let j; try { j = JSON.parse(t); } catch(e) { last = 'nonjson:'+t.slice(0,200); await sleep(base*(i+1)); continue; }
      if (j && j.error) { last = j.error; await sleep(base*(i+1)*1.5); continue; }
      if (cache) fs.writeFileSync(key, JSON.stringify(j));
      return j;
    } catch(e) { last = String(e); await sleep(base*(i+1)); }
  }
  throw new Error('FAIL '+url+' :: '+last);
}

export const mb = (path) => getJSON('https://musicbrainz.org/ws/2/'+path+(path.includes('?')?'&':'?')+'fmt=json');
export const dg = (path) => getJSON('https://api.discogs.com/'+path);
export const itunes = (path) => getJSON('https://itunes.apple.com/'+path, {cache:true});

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop()) && process.argv[2]) {
  const which = process.argv[2], arg = process.argv[3];
  const fn = {mb, dg, itunes}[which];
  fn(arg).then(j => console.log(JSON.stringify(j, null, 1))).catch(e => { console.error(e.message); process.exit(1); });
}
