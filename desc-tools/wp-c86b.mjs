import {get} from './fetch-c86b.mjs';
const [,,title,...rest]=process.argv;
const url=`https://en.wikipedia.org/w/index.php?action=raw&title=${encodeURIComponent(title)}`;
const t=await get(url);
if(rest[0]==='grep'){
  const re=new RegExp(rest.slice(1).join(' '),'i');
  t.split(/\n/).forEach((l,i)=>{ if(re.test(l)) console.log(i+': '+l.slice(0,900)); });
} else {
  console.log(t.slice(0, rest[0]?Number(rest[0]):6000));
}
