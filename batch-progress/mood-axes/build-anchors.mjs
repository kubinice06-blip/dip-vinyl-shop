import fs from 'node:fs';
import { A } from './anchors-src.mjs';
const seed = JSON.parse(fs.readFileSync(new URL('../../seed_cards.json', import.meta.url),'utf8'));
const idx = new Map(seed.map(c => [c[0]+'|'+c[1], c]));
// 區域：X≥4.75 一律興奮（頂端合流），其餘取 (x,y) 最近中心
const C = { calm:[1.7,-1.4,0.5], languid:[2.1,1.3,0.0], glad:[3.0,0.0,0.8], lift:[3.9,-0.4,1.4], charge:[4.2,1.5,-0.6] };
const ZW = 0.5;
const regionOf = (x,y,z) => x >= 4.75 ? 'blaze' : Object.entries(C).map(([k,[cx,cy,cz]])=>[k,(x-cx)**2+(y-cy)**2+ZW*(z-cz)**2]).sort((a,b)=>a[1]-b[1])[0][0];
const out = [], miss = [], mism = [], dup = new Set();
for (const [key,x,y,z,intent,why] of A) {
  if (dup.has(key)) { miss.push('DUP '+key); continue; } dup.add(key);
  const c = idx.get(key);
  if (!c) { miss.push(key); continue; }
  const r = regionOf(x,y,z);
  if (r !== intent) mism.push(`${key}: intent ${intent} → ${r} (${x},${y})`);
  out.push({ key, artist:c[0], album:c[1], year:c[6], genre:(c[5]||[])[0], tier:c[8]||null, old:{classic:c[2],obscurity:c[3],accessibility:c[4]}, x, y, z, region:r, why });
}
console.log('total', A.length, 'ok', out.length, 'missing', miss.length); miss.forEach(m=>console.log('  MISS', m));
console.log('mismatch', mism.length); mism.forEach(m=>console.log('  ', m));
const cnt = {}; out.forEach(o=>cnt[o.region]=(cnt[o.region]||0)+1); console.log(cnt);
const g = {}; out.forEach(o=>g[o.genre]=(g[o.genre]||0)+1); console.log(g);
// 與舊三軸的 Spearman
const rank = a => { const s=[...a].map((v,i)=>[v,i]).sort((p,q)=>p[0]-q[0]); const r=new Array(a.length); let i=0; while(i<s.length){let j=i;while(j+1<s.length&&s[j+1][0]===s[i][0])j++; const m=(i+j)/2+1; for(let k=i;k<=j;k++)r[s[k][1]]=m; i=j+1;} return r; };
const sp = (a,b) => { const ra=rank(a), rb=rank(b), n=a.length, ma=ra.reduce((s,v)=>s+v,0)/n, mb=rb.reduce((s,v)=>s+v,0)/n; let num=0,da=0,db=0; for(let i=0;i<n;i++){num+=(ra[i]-ma)*(rb[i]-mb);da+=(ra[i]-ma)**2;db+=(rb[i]-mb)**2;} return num/Math.sqrt(da*db); };
const corr = {};
for (const n of ['x','y','z']) for (const o of ['classic','obscurity','accessibility']) corr[`${n}~${o}`] = +sp(out.map(v=>v[n]), out.map(v=>v.old[o])).toFixed(2);
console.log(corr);
fs.writeFileSync(new URL('./anchors-v1.json', import.meta.url), JSON.stringify({ _built:'2026-10-14', _by:'cloud-main（人工判定，尚無音訊層）', _axes:{x:'能量 1–5（靜→狂）', y:'質地 −2–+2（輕→重）', z:'色溫 −2–+2（冷→暖）'}, _regionRule:{blaze:'x≥4.75', centers:C, zWeight:ZW}, _corrWithOldAxes:corr, anchors: out }, null, 1));
