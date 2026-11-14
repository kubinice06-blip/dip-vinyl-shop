// 抓整個 card_catalog（只取需要的欄位），寫 catalog.json；可續跑（page token 存檔）
import fs from 'node:fs';
const KEY='AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const BASE='https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog';
const out='catalog.json';
let state=fs.existsSync('catalog-state.json')?JSON.parse(fs.readFileSync('catalog-state.json')):{token:'',docs:{}};
const fields=['artist','album','coverUrl','rgMbid','cardId','upc','rarity','classic'];
let pages=0;
while(true){
  const u=new URL(BASE); u.searchParams.set('pageSize','300'); u.searchParams.set('key',KEY);
  for(const f of fields) u.searchParams.append('mask.fieldPaths',f);
  if(state.token) u.searchParams.set('pageToken',state.token);
  let r; for(let t=0;t<5;t++){ try{ r=await fetch(u); if(r.ok) break; }catch(e){} await new Promise(s=>setTimeout(s,2000*(t+1))); }
  if(!r||!r.ok){ console.error('fail',r&&r.status, r&&await r.text()); process.exit(1); }
  const j=await r.json();
  for(const d of j.documents||[]){ const raw=d.name.split('/card_catalog/')[1]; let id; try{id=decodeURIComponent(raw)}catch(e){id=raw} const o={}; for(const [k,v] of Object.entries(d.fields||{})) o[k]=v.stringValue??v.integerValue??v.booleanValue??v.doubleValue??null; state.docs[id]=o; }
  state.token=j.nextPageToken||''; pages++;
  if(pages%10==0){ fs.writeFileSync('catalog-state.json',JSON.stringify(state)); console.log(pages, Object.keys(state.docs).length); }
  if(!state.token) break;
}
fs.writeFileSync(out,JSON.stringify(state.docs)); fs.writeFileSync('catalog-state.json',JSON.stringify(state));
console.log('done',Object.keys(state.docs).length);
