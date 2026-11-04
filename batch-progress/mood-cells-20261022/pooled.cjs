// 用法：node pooled.cjs "藝人" ["藝人2" ...]  → 印池中同藝人卡與 v0 三軸
const path=require('path');const R='/home/user/dip-vinyl-shop/';
const v=require(R+'data/mood/card-moods-v0.json');const cards=v.cards||{};
const s=require(R+'seed_cards.json');
for(const a of process.argv.slice(2)){const al=a.toLowerCase();
 const rows=s.filter(r=>r[0].toLowerCase()===al);
 if(!rows.length){console.log(a,'=> 池中無');continue}
 for(const r of rows){const k=(r[0]+'|'+r[1]).toLowerCase();const c=cards[k];console.log(a,'|',r[1],r[6]||'',c?('x '+c[0]+' y '+c[1]+' z '+c[2]):'(無三軸)')}}
