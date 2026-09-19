// c-166 a 組：把新產出的提案逐批併進 prop-a.json（續跑安全，見 CLAUDE.md 那節）。
// 用法：node append.mjs <part.json>；重複的 artist|album 折鍵直接覆蓋，不重複追加。
import fs from 'node:fs';
const OUT='/home/user/dip-vinyl-shop/batch-progress/c166/prop-a.json';
const k=s=>String(s).toLowerCase().replace(/[&＆]/g,'and').replace(/[^\p{L}\p{N}]+/gu,'');
let cur=[]; try{cur=JSON.parse(fs.readFileSync(OUT,'utf8'))}catch{}
const add=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const idx=new Map(cur.map((x,i)=>[k(x.artist)+'|'+k(x.album),i]));
for(const x of add){const kk=k(x.artist)+'|'+k(x.album); if(idx.has(kk))cur[idx.get(kk)]=x; else {idx.set(kk,cur.length);cur.push(x);}}
fs.writeFileSync(OUT,JSON.stringify(cur,null,1)+'\n');
console.log('prop-a.json now',cur.length);
