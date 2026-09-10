import fs from 'node:fs';
const H = JSON.parse(fs.readFileSync('batches/hooks/c81-hooks-a.json','utf8'));
const R = JSON.parse(fs.readFileSync('batches/research/c81-a.json','utf8'));
const w = s => Array.from(s).reduce((n,c)=>n+(/[\x00-\x7F]/.test(c)?0.5:1),0);
const heads = new Map();
let bad=0;
H.forEach((h,i)=>{
  const hw=w(h.hook), nl=Array.from(h.note).length;
  const head=Array.from(h.hook).slice(0,4).join('');
  if(!heads.has(head)) heads.set(head,[]); heads.get(head).push(h.key);
  const errs=[];
  if(hw>50) errs.push('hook>'+hw);
  if(nl>350) errs.push('note='+nl);
  if(!/[。？！]$/.test(h.hook)) errs.push('句末');
  if(/不是|卻不是|並非|而不是/.test(h.hook)) errs.push('否定句');
  if(/這張專輯|傑作|必聽|里程碑|獨樹一格|融合多種元素|具有代表性|層次豐富|你|我們/.test(h.hook)) errs.push('禁語');
  if(/卡池|查無|並非|而非|無從查證|不得寫|禁補|未能查證|兩者是完全不同|標錯|有出入/.test(h.note)) errs.push('note校對痕跡:'+h.note.match(/卡池|查無|並非|而非|無從查證|不得寫|禁補|未能查證|兩者是完全不同|標錯|有出入/)[0]);
  if(R[i] && R[i].key!==h.key) errs.push('key錯位');
  if(errs.length){bad++;console.log(`[${i}] ${h.key}\n    hw=${hw} nl=${nl} ${errs.join(' | ')}`);}
  else console.log(`[${i}] ok hw=${hw} nl=${nl} 頭「${head}」 ${h.key.slice(6,40)}`);
});
[...heads].filter(([,v])=>v.length>1).forEach(([k,v])=>{console.log('⚠ 開頭重複',k,v.join(','));bad++;});
console.log(bad? `\n${bad} 項待修` : '\n✓ 本組自檢通過');
