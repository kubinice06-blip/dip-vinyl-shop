// c-166 a 組 證據層：MusicBrainz release-group ＋ 轄下 release（labels/media/artist-credits）
import fs from 'node:fs';
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const DIR = '/home/user/dip-vinyl-shop/batch-progress/c166/evidence-a';
const slice = JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/batch-progress/c166/slice.json','utf8')).filter(x=>x.g==='a');
const OUT = DIR+'/mb.json';
let out = {}; try { out = JSON.parse(fs.readFileSync(OUT,'utf8')); } catch {}
const sleep = ms => new Promise(r=>setTimeout(r,ms));
async function j(u){ for(let i=0;i<4;i++){ const r = await fetch(u,{headers:{'User-Agent':UA,'Accept':'application/json'}}); if(r.ok) return r.json(); await sleep(2000*(i+1)); } throw new Error('fail '+u); }
let n=0;
for (const s of slice) {
  if (out[s.rgMbid]) continue;
  const rg = await j(`https://musicbrainz.org/ws/2/release-group/${s.rgMbid}?fmt=json&inc=artist-credits+tags`);
  await sleep(1100);
  const rel = await j(`https://musicbrainz.org/ws/2/release?fmt=json&release-group=${s.rgMbid}&inc=labels+media+artist-credits&limit=100`);
  await sleep(1100);
  out[s.rgMbid] = { slice: {artist:s.artist, album:s.album, year:s.year}, rg, releases: rel.releases };
  n++;
  if (n % 3 === 0) { fs.writeFileSync(OUT, JSON.stringify(out,null,1)); console.log('saved', Object.keys(out).length); }
}
fs.writeFileSync(OUT, JSON.stringify(out,null,1));
console.log('done', Object.keys(out).length);
