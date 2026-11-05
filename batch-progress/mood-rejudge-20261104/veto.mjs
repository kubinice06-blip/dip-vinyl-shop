// 主線審稿：推翻代理（keep）或改主線座標，輸出 veto.json 給 apply.mjs。理由見 rulings.md「主線審稿」。
import fs from 'node:fs';
const c = JSON.parse(fs.readFileSync('candidates.json', 'utf8'));
const all = [...c.A, ...c.B];
const find = (a, b) => {
  let r = all.filter(r => r.artist.toLowerCase() === a && r.album.toLowerCase() === b);
  if (!r.length) r = all.filter(r => r.artist.toLowerCase() === a && r.album.toLowerCase().startsWith(b));
  if (r.length !== 1) throw new Error(`${a} ${b} ${r.length}`);
  return r[0];
};
const v = {};
const keep = [['the pharcyde', 'labcabin'], ['onra', 'chinoiseries'], ['prince fatty', 'super size'], ['little tempo', 'kedaco'],
  ['kid loco', 'kill your'], ['organum', 'submission'], ['organum', 'vacant'], ['depeche mode', 'black celebration'],
  ['tim hecker', 'harmony'], ['swans', 'soundtracks'], ['tricky', 'pre-mill'], ['2562', 'aerial'], ['lemon jelly', "'64"]];
for (const [a, b] of keep) v[find(a, b).id] = 'keep';
const set = (a, b, x, y, z, why) => { v[find(a, b).id] = { x, y, z, why }; };
set('bunny wailer', 'sings the wailers', 2.7, 0.3, 1.4, 'Sly & Robbie 時期翻唱 Wailers，製作乾淨、拍子鬆，靜輕暖（主線改：代理判雀躍）');
const junjo = 'Roots Radics／Junjo 時期早期 dancehall，riddim 跳動往前、貝斯厚，躁重暖（主線改：低頻是厚的，不是輕）';
for (const [a, b] of [['barrington levy', 'shaolin'], ['barrington levy', 'poor man'], ['barrington levy', 'teach me'], ['barrington levy', 'open book'],
  ['barrington levy', 'run come'], ['barrington levy', 'shine eye'], ['barrington levy', 'doh ray'], ['little john', 'reggae dance'],
  ['little john', 'ghetto youth'], ['sugar minott', 'herbman'], ['sugar minott', 'buy off'], ['sugar minott', 'wicked ago'],
  ['linval thompson', 'look how'], ['linval thompson', 'baby father'], ['johnny osbourne', 'folly'], ['tony tuff', 'presenting'],
  ['jimmy riley', 'rydim'], ['triston palma', 'joker'], ['triston palma', 'settle'], ['triston palma', 'fancy'], ['triston palma', 'show case'],
  ['sammy dread', 'roadblock'], ['anthony johnson', "i'm ready"]]) set(a, b, 3.3, 0.8, 0.9, junjo);
set('atmosphere', 'southsiders', 3.2, 0.3, 0.5, "中速 boom bap 鼓點清楚、吉他取樣明亮，往前走（主線補：比照《Seven's Travels》）");
set('atmosphere', 'fishing blues', 3.2, 0.3, 0.6, "中速 boom bap 鼓點清楚、製作明亮，往前走（主線補：比照《Seven's Travels》）");
set('little brother', 'may the lord', 3.3, 0.3, 1.1, '9th Wonder 靈魂取樣 boom bap，鼓點推進、溫熱好入耳（主線補：比照《The Listening》）');
set('slum village', 'trinity', 3.3, 0.4, 1.0, '較商業化的 boom bap，鼓拍彈跳、hook 明亮（主線補）');
set('cunninlynguists', 'dirty acres', 3.3, 0.9, 0.6, '南方 boom bap 鼓硬、饒舌密，有推進感（主線補：比照《SouthernUnderground》）');
set('cunninlynguists', 'will rap', 3.3, 0.9, 0.6, '南方 boom bap 鼓硬、饒舌密，有推進感（主線補：比照《SouthernUnderground》）');
set('nas', 'life is good', 3.3, 0.8, 0.8, 'No I.D. 靈魂取樣配硬鼓，饒舌往前推（主線補）');
set('j. cole', '2014 forest', 3.2, 0.4, 0.8, '鼓點彈跳、hook 好唱的主流饒舌，往前走（主線補）');
set('cormega', 'the realness', 3.3, 1.0, -0.4, '皇后區硬鼓 boom bap，饒舌紮實、陰沉往前壓（主線補：比照 O.C.）');
set('ariana grande', 'thank u', 3.2, 0.3, 1.0, 'trap 鼓機彈跳的流行 R&B，人聲亮、旋律清楚（主線補）');
fs.writeFileSync('veto.json', JSON.stringify(v, null, 1));
console.log('veto', Object.keys(v).length);
