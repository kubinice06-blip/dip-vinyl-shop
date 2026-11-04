// ax7u 升格卡簡介寫 KV：before（存舊值）｜bulk（產 bulk 檔）｜verify（逐字回讀）
//   node batch-progress/add-20261104-ax7/ax7u-kv.mjs before|bulk|verify
import fs from 'node:fs';
const ACC='3a23f905e8f31d91c85050f2ed304321',NS='5f65e74b17d644b68a3f542b08a5c105';
const D='batch-progress/add-20261104-ax7';
const cmd=process.argv[2];
const rows=JSON.parse(fs.readFileSync('desc-tools/batches/output/ax7u-out-1.json','utf8')).concat(fs.existsSync('desc-tools/batches/output/ax7u-out-2.json')?JSON.parse(fs.readFileSync('desc-tools/batches/output/ax7u-out-2.json','utf8')):[]);
const cjk=v=>/[぀-ヿ㐀-鿿豈-﫿가-힯]/.test(String(v||''));
async function bulkGet(ks){const j=await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/bulk/get`,{method:'POST',headers:{Authorization:'Bearer '+process.env.CLOUDFLARE_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({keys:ks})})).json();if(!j.success)throw new Error(JSON.stringify(j.errors));return j.result.values;}
const lk=k=>k.toLowerCase();
if(cmd==='before'){const ks=rows.flatMap(r=>['desc2:'+lk(r.key),'desc4:'+lk(r.key)]);const v=await bulkGet(ks);const out=ks.map(k=>({key:k,value:v[k]??null}));fs.writeFileSync(`${D}/kv-before-ax7u.json`,JSON.stringify(out,null,1));console.log('舊值',out.length,'非 null',out.filter(x=>x.value!=null).length);}
const before=()=>new Map(JSON.parse(fs.readFileSync(`${D}/kv-before-ax7u.json`,'utf8')).map(x=>[x.key,x.value]));
const puts=()=>{const b=before();return rows.flatMap(r=>{const v=JSON.stringify({desc:r.desc});const p=[{key:'desc2:'+lk(r.key),value:v}];if(b.get('desc4:'+lk(r.key))!=null||cjk(r.artist)||cjk(r.album))p.push({key:'desc4:'+lk(r.key),value:v});return p;});};
if(cmd==='bulk'){const p=puts();fs.mkdirSync('publish-stage',{recursive:true});fs.writeFileSync('publish-stage/kv-ax7u-20261104.json',JSON.stringify(p));console.log(p.length,'鍵 → publish-stage/kv-ax7u-20261104.json');}
if(cmd==='verify'){const p=puts();const v=await bulkGet(p.map(x=>x.key));let ok=0;for(const x of p){if(v[x.key]===x.value)ok++;else console.log('不符',x.key);}console.log(`回讀 ${ok}/${p.length}`);process.exit(ok===p.length?0:1);}
