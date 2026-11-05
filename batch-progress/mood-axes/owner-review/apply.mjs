// 店主 2026-10-23 試聽頁逐張點選（picks.json）→ overrides：只動翻過去的軸，推到門檻另一側的中度值。
import fs from 'node:fs';
const J=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const picks=J('batch-progress/mood-axes/owner-review/picks.json'), ov=J('data/mood/overrides.json'), v0=J('data/mood/card-moods-v0.json');
const T=v0._thresholds;
const AX={lift:[1,0,1],boil:[1,1,1],crisp:[1,0,0],charge:[1,1,0],calm:[0,0,1],languid:[0,1,1],still:[0,0,0],decay:[0,1,0]};
const NAME={calm:'放鬆',still:'平靜',languid:'恍惚',decay:'頹靡',lift:'雀躍',crisp:'冷冽',boil:'沸騰',charge:'亢奮'};
let n=0;
for(const [id,p] of Object.entries(picks)){
  if(p.unsure||!p.pick||p.pick===p.current) continue;
  const base=ov[id]||{x:v0.cards[id][0],y:v0.cards[id][1],z:v0.cards[id][2]};
  let {x,y,z}=base; const [e,t,w]=AX[p.pick];
  if(e&&x<T.x) x=3.2; if(!e&&x>=T.x) x=2.8;
  if(t&&y<T.y) y=0.7; if(!t&&y>=T.y) y=0.3;
  if(w&&z<T.z) z=0.3; if(!w&&z>=T.z) z=-0.5;
  ov[id]={x,y,z,why:`${base.why?base.why+'｜':''}2026-10-23 店主試聽點選：${NAME[p.current]}→${NAME[p.pick]}`}; n++;
}
fs.writeFileSync('data/mood/overrides.json',JSON.stringify(ov,null,1)); console.log('applied',n);
