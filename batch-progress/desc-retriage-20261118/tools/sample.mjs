// 抽查：node tools/sample.mjs <grade> <n> [seed] [maxLen]  印出已判的某級隨機 n 張（附現行簡介）
import fs from 'node:fs';
const D='batch-progress/desc-retriage-20261118', T=D+'/triage';
const [g,n='10',seed='1']=process.argv.slice(2);
const ins={};for(const f of fs.readdirSync(T+'/in'))for(const c of JSON.parse(fs.readFileSync(T+'/in/'+f)))ins[c.k]=c;
const all=fs.readdirSync(T).filter(f=>/^triage-\d+\.json$/.test(f)).flatMap(f=>JSON.parse(fs.readFileSync(T+'/'+f)));
let s=+seed;const rnd=()=>(s=(s*1103515245+12345)%2147483648)/2147483648;
const pool=all.filter(x=>x.grade===g).map(x=>[rnd(),x]).sort((a,b)=>a[0]-b[0]).slice(0,+n).map(a=>a[1]);
for(const x of pool)console.log(`● ${x.artist}《${x.album}》[${x.codes}] ${x.why}\n${ins[x.k].desc}\n`);
