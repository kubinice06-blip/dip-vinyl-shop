import {j} from './fetch-c88b.mjs';
const [,,lang,title,grep]=process.argv;
const o=await j(`https://${lang}.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json&formatversion=2&redirects=1`);
if(o.error){console.log('ERR',JSON.stringify(o.error).slice(0,300));process.exit(0);}
let t=o.parse.wikitext;
console.log('PAGE:',o.parse.title);
if(grep){
  const re=new RegExp(grep,'i');
  const paras=t.split(/\n\n+/);
  for(const p of paras) if(re.test(p)) console.log('---\n'+p.slice(0,2500));
} else {
  console.log(t.slice(0,6000));
}
