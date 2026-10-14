// 封面縮圖表：NODE_PATH=$(npm root -g) node cover-sheet.cjs <卡單絕對路徑> <圖目錄絕對路徑> <輸出前綴> [序號=替代檔名 ...]
// 圖目錄先放 CAA front-250（檔名 <序號>.jpg），輸出 <前綴>0.png、1.png… 用 Read 看圖。
const fs=require('fs'); const {chromium}=require('playwright');
const [cardsF,dir,out,...extra]=process.argv.slice(2); const cards=JSON.parse(fs.readFileSync(cardsF,'utf8'));
const ex=Object.fromEntries(extra.map(e=>e.split('=')));
const cells=cards.map((c,i)=>{const f=ex[i]||`${i}.jpg`; return `<div><img src="${dir}/${f}"><p>${i} ${c.artist}《${c.album}》</p></div>`}).join('');
fs.writeFileSync(dir+'/sheet.html',`<html><body style="margin:0;background:#fff;font:13px sans-serif"><style>div{display:inline-block;width:190px;margin:3px;vertical-align:top}img{width:190px;height:190px;object-fit:cover;background:#ddd}p{margin:2px;height:32px;overflow:hidden}</style>${cells}</body></html>`);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:800}});await p.goto('file://'+dir+'/sheet.html');await p.waitForTimeout(2000);const h=await p.evaluate(()=>document.body.scrollHeight);for(let i=0;i*800<h;i++)await p.screenshot({path:`${out}${i}.png`,fullPage:true,clip:{x:0,y:i*800,width:1200,height:Math.min(800,h-i*800)}});console.log(h);await b.close();})();
