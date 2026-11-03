// Q1b：同級內一藝人一張＋殿堂補位＋濁水溪公社。只產出決定清單，不改卡池。
// 用法：node batch-progress/apex-rebalance-20261103/build-decisions-q1.js
const fs = require('fs'), D = 'batch-progress/apex-rebalance-20261103/', A = 'batch-progress/audit-20261102/';
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const K = r => r[0] + '|' + r[1];
const ev = new Map();
const loadEv = dir => { for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) { let j = JSON.parse(fs.readFileSync(dir + f)); if (!Array.isArray(j)) j = Object.values(j).find(Array.isArray) || []; for (const x of j) if (x && x.key && Array.isArray(x.evidence) && x.evidence.length) ev.set(x.key, [...new Set([...(ev.get(x.key) || []), ...x.evidence])]); } };
loadEv(A + 'verdicts/'); loadEv(A + 'apex7/verdicts/');
const dupes = JSON.parse(fs.readFileSync(D + 'dupes.json', 'utf8'));
const alts = JSON.parse(fs.readFileSync(D + 'hall-alternates.json', 'utf8'));
const altBy = new Map(alts.map(x => [x.key, x]));

// 1) 同級內留哪張：藝人|tier → [專輯, 理由]
const KEEP = {
  'Oasis|hall': ['(What\'s the Story) Morning Glory?', '樂團銷量與全球知名度最高的一張（Wonderwall、Don\'t Look Back in Anger），listeners 274 萬遠高於首張'],
  'Stevie Wonder|hall': ['Songs in the Key of Life', 'RS500（2020）第 4，評論共識的生涯頂點；7 星重審唯一強度 3'],
  'Aretha Franklin|hall': ['I Never Loved a Man the Way I Love You', 'Respect 所在、RS500（2020）前 15；靈魂樂正典，7 星重審強度 3'],
  'Frank Ocean|hall': ['Blonde', 'Pitchfork 2010 年代第 1、RS500（2020）排名高於 Channel Orange'],
  'The Beatles|hall': ['Abbey Road', 'RS500（2020）樂團最高名次（第 5）、listeners 最高；封面與 Come Together／Something 跨圈知名度最高。注意池中 White Album 重複兩筆'],
  'Bob Marley & The Wailers|hall': ['Exodus', 'Time 二十世紀最佳專輯；Legend 是精選輯，原創專輯優先'],
  'Bob Dylan|hall': ['Highway 61 Revisited', 'Like a Rolling Stone 所在，RS500（2003）第 4、listeners 最高；電聲轉向的里程碑'],
  'The Rolling Stones|hall': ['Exile on Main St.', '評論共識的樂團最高作，RS500 兩版皆為樂團最高（2003 第 7）；7 星重審強度 3'],
  'The Velvet Underground|hall': ['The Velvet Underground & Nico', '7 星錨點本身；White Light/White Heat 7 星重審未過'],
  'The Jimi Hendrix Experience|hall': ['Are You Experienced', '7 星重審強度 3；首張即改寫電吉他語彙'],
  'Led Zeppelin|hall': ['Led Zeppelin IV', 'Stairway to Heaven 所在、銷量最高；7 星重審強度 3（II 未過）'],
  'Pink Floyd|hall': ['The Dark Side of the Moon', '史上銷量最高專輯之一、榜單常客；7 星重審強度 3（WYWH 未過）'],
  'David Bowie|hall': ['The Rise and Fall of Ziggy Stardust and the Spiders from Mars', 'Bowie 最具代表性的角色與專輯，RS500 兩版為其最高名次之一、跨圈知名度最高'],
  'Michael Jackson|hall': ['Thriller', '史上銷量第一專輯；7 星重審強度 3'],
  'Prince|hall': ['Purple Rain', 'listeners 164 萬、同名電影；7 星重審強度 3（Sign o the Times 未過）'],
  'U2|hall': ['The Joshua Tree', '葛萊美年度專輯、樂團最高銷量；7 星重審強度 3'],
  'Radiohead|hall': ['OK Computer', '7 星錨點本身；listeners 489 萬'],
  'Black Sabbath|hall': ['Paranoid', '7 星重審通過（同名首張未過）；War Pigs／Iron Man，重金屬的大眾門面'],
  'Miles Davis|hall': ['Kind of Blue', '7 星錨點本身；史上最暢銷爵士唱片'],
  'John Coltrane|hall': ['A Love Supreme', '7 星重審強度 3；Giant Steps 未過。異端那張另計，不受影響'],
  'Frank Sinatra|hall': ['In the Wee Small Hours', '7 星重審通過、listeners 高出另一張 15 倍；概念專輯先驅'],
  'Brian Eno|hall': ['Another Green World', '兩張 7 星重審皆未過；取歷代榜名次與 listeners（47.7 萬 vs 12.7 萬）較高者。Music for Airports 是 ambient 命名之作，屬有爭議的取捨'],
  'Various Artists|pearl': ['Bouquet of Steel', '三張中稽核強度最高（pearl2）；Sheffield 1980 地下合輯。註：VA 不是單一藝人，套用時可考慮豁免'],
  'John Williams|hall': ['Star Wars (Original Motion Picture Soundtrack)', 'AFI 百年最佳電影配樂第 1，跨圈知名度高於 Jaws'],
  'Louis Armstrong|hall': ['The Complete Hot Five and Hot Seven Recordings, Volume 1', '7 星重審通過（Vol. 3 未過）；West End Blues 系列的起點'],
  'Merzbow|heresy': ['Pulse Demon', '7 星錨點本身、7 星重審強度 3'],
  'Masonna|heresy': ['Spectrum Ripper', '稽核強度 3、listeners 較高；Masonna 最具代表性的 harsh noise 作'],
  '非常階段|heresy': ['蔵六の奇病', '7 星重審強度 3、經典度 5；日本噪音的起點之一'],
  'The Residents|heresy': ['Eskimo', '經典度 5（Not Available 為 4）；樂團最受公認的結構性實驗作'],
  'Scott Walker|heresy': ['The Drift', '經典度 5、listeners 較高；晚期三部曲的核心'],
  'Swans|heresy': ['Filth', '首張、listeners 14 萬 vs 2.7 萬；no wave 之後最兇的聲音原型'],
  'Derek Bailey|pearl': ['Solo Guitar Volume 1', '經典度 5，自由即興吉他的奠基錄音；listeners 234 仍在門檻內'],
  'Anthony Braxton|pearl': ['Seven Compositions 1978', '稽核判 pearl 強度 2（Series F 稽核判的是 heresy，不是 pearl）'],
  'Throbbing Gristle|heresy': ['The Second Annual Report', '7 星重審唯一通過者、經典度 5；工業樂命名之作'],
  'This Heat|heresy': ['Deceit', 'listeners 16.6 萬、評論共識的樂團代表作；兩張稽核皆 heresy3，取場景地位'],
  'Ryoji Ikeda|heresy': ['+/-', '經典度 5（另兩張為 4）；正弦波極簡主義的原點'],
  'AKA|pearl': ['Do What You Like', '經典度 4（另一張 3）'],
  '生活向上委員会|pearl': ['生活向上委員会ニューヨーク支部', '經典度 4（另一張 3）；日本自由爵士史上傳說級自主盤'],
  'Wilson McKinley|pearl': ['Spirit of Elijah', '經典度 4，基督教迷幻圈公認的聖杯'],
  'Hope of Glory|pearl': ['Under the Spout Where the Glory Comes Out', '兩張強度相同；取首張、場景名氣較高者'],
  '夢幻|pearl': ['Sinfonia della Luna', '經典度 4、稽核強度 2（另一張 1）'],
  'The Clark Sisters|pearl': ['Unworthy', '兩張強度相同；取較早、listeners 較低者'],
  'Third Quadrant|pearl': ['N = R* FP NE FL FI FC L', '稽核強度 3（另一張 2）'],
  'Treatment|pearl': ['Intensive', '兩張強度相同；取首張'],
  'Geoff Mann|pearl': ['I May Sing Grace', '經典度 3（另兩張 2）'],
  'Suzukiski|pearl': ['Waiting', '兩張強度、經典度相同；取首張、listeners 較低者'],
  'Roscoe Mitchell|pearl': ['Nonaah', '經典度 4、AACM 名作，知名度遠高於另一張'],
  '光束夜|pearl': ['The Dark Spot', '經典度 3（另一張 2）'],
  '北村英治|pearl': ['Happy Cooking', '經典度 3（Vol. II 為 2）'],
  'Altan Urag|pearl': ['Once Upon a Time in Mongolia', '兩張強度、經典度相同；取 listeners 較低者（冷門度軸）'],
  'Spontaneous Music Ensemble|pearl': ['Challenge', '經典度 4，英國自由即興的首張錄音、Eyemark 原版公認聖杯'],
  'Organum|pearl': ['Vacant Lights', '經典度 4、稽核強度 2（另兩張 3／1）'],
  'Company|pearl': ['Company 2', '經典度 4、稽核強度 3'],
  'Ned Rothenberg|pearl': ['Trials of the Argo', '兩張強度、經典度相同；取首張個人作'],
};

// 2) 殿堂補位：依序取 36 張（= 原殿堂 170 − 同級去重拿掉 37 + 36 = 169；加另行上架的《台客的復仇》= 170）
const ADD = [
  ['Pearl Jam|Ten', '原殿堂被降級、listeners 306 萬；RS500 收錄，grunge 兩大正典之一'],
  ['Green Day|Dookie', 'listeners 319 萬、全球銷量逾 2,000 萬；RS500 收錄，pop-punk 的大眾門面'],
  ['Adele|21', 'listeners 354 萬、21 世紀銷量最高專輯；RS500（2020）收錄'],
  ['Rage Against the Machine|Rage Against the Machine', 'listeners 197 萬；RS500 收錄，rap metal 的原型'],
  ['Neutral Milk Hotel|In the Aeroplane Over the Sea', 'listeners 192 萬；RS500、Pitchfork 90 年代前列，獨立搖滾的跨圈正典'],
  ['Nine Inch Nails|The Downward Spiral', 'listeners 173 萬；RS500 收錄，工業搖滾進主流的代表'],
  ['Red Hot Chili Peppers|Blood Sugar Sex Magik', 'listeners 144 萬；RS500 收錄，Under the Bridge／Give It Away'],
  ['OutKast|Aquemini', 'RS500（2020）收錄、評論共識的 OutKast 高峰；listeners 104 萬'],
  ['Beyoncé|Lemonade', 'RS500（2020）前 40、listeners 132 萬；2010 年代跨圈正典'],
  ['Arctic Monkeys|Whatever People Say I Am, That\'s What I\'m Not', 'listeners 350 萬；英國史上最快銷首張，RS500（2020）收錄'],
  ['The White Stripes|Elephant', 'listeners 311 萬；Seven Nation Army，RS500 收錄'],
  ['Björk|Homogenic', 'listeners 106 萬；RS500（2020）收錄，Björk 評論最高之作之一'],
  ['Beck|Odelay', '稽核強度 3、listeners 106 萬；RS500 收錄'],
  ['Pulp|Different Class', '稽核強度 3、listeners 117 萬；Britpop 正典，RS500 收錄'],
  ['Nick Drake|Pink Moon', 'listeners 154 萬；RS500 收錄，民謠跨圈正典'],
  ['Soundgarden|Superunknown', 'listeners 158 萬；RS500 收錄，Black Hole Sun'],
  ['Madvillain|Madvillainy', 'listeners 171 萬；RS500（2020）收錄，地下嘻哈的跨圈正典'],
  ['Elliott Smith|Either/Or', 'listeners 175 萬；RS500（2020）收錄'],
  ['Blur|Parklife', 'listeners 101 萬；Britpop 定義之作，RS500 收錄'],
  ['Erykah Badu|Baduizm', 'listeners 105 萬；neo-soul 定義之作，RS500 收錄'],
  ['Chet Baker|Chet Baker Sings', 'listeners 106 萬；爵士之外也廣為人知的人聲名盤'],
  ['Smashing Pumpkins|Siamese Dream', 'listeners 93 萬；RS500 收錄，90 年代另類搖滾正典'],
  ['Eagles|Hotel California', '史上銷量前十的專輯之一；RS500 收錄，非搖滾樂迷也知道'],
  ['The Band|The Band', 'RS500 收錄、評論共識的美式搖滾根源正典'],
  ['Derek and the Dominos|Layla and Other Assorted Love Songs', 'RS500 收錄；Layla，Clapton 生涯代表作'],
  ['Blondie|Parallel Lines', 'listeners 93 萬；RS500 收錄，Heart of Glass'],
  ['Buena Vista Social Club|Buena Vista Social Club', 'listeners 95 萬；世界音樂最暢銷專輯之一、葛萊美、1001 Albums 收錄'],
  ['Sonny Rollins|Saxophone Colossus', '稽核強度 3；硬咆勃正典，爵士歷代榜必收'],
  ['Steve Reich|Music for 18 Musicians', '稽核強度 3；極簡主義的代表作，跨進搖滾／電子榜單'],
  ['Can|Tago Mago', '稽核強度 3；krautrock 正典，RS500／Pitchfork 歷代榜收錄'],
  ['De La Soul|3 Feet High and Rising', '稽核強度 3；RS500 收錄，取樣嘻哈的里程碑'],
  ['Boards of Canada|Music Has the Right to Children', '稽核強度 3、listeners 123 萬；電子樂跨圈正典'],
  ['Creedence Clearwater Revival|Cosmo\'s Factory', 'listeners 89 萬；RS500 收錄，CCR 最暢銷原創專輯'],
  ['Serge Gainsbourg|Histoire de Melody Nelson', '稽核強度 3；法語流行的世界性正典，歷代榜常客'],
  ['Peter Gabriel|So', 'RS500 收錄、Sledgehammer，Gabriel 銷量與知名度最高之作'],
  ['Cocteau Twins|Heaven or Las Vegas', 'listeners 142 萬；dream pop 定義之作，RS500（2020）收錄'],
];

const FALLBACK = {
  'John Williams|Star Wars (Original Motion Picture Soundtrack)': ['https://en.wikipedia.org/wiki/Star_Wars_(soundtrack)', 'https://en.wikipedia.org/wiki/AFI%27s_100_Years_of_Film_Scores'],
  'The Residents|Eskimo': ['https://en.wikipedia.org/wiki/Eskimo_(album)'],
  "Arctic Monkeys|Whatever People Say I Am, That's What I'm Not": ['https://en.wikipedia.org/wiki/Whatever_People_Say_I_Am,_That%27s_What_I%27m_Not'],
  'The White Stripes|Elephant': ['https://en.wikipedia.org/wiki/Elephant_(album)'],
  'Elliott Smith|Either/Or': ['https://en.wikipedia.org/wiki/Either/Or_(album)'],
  'Erykah Badu|Baduizm': ['https://en.wikipedia.org/wiki/Baduizm'],
};
for (const [k, u] of Object.entries(FALLBACK)) if (!ev.has(k)) ev.set(k, u);
const out = [];
const curApex = new Map(seed.filter(r => r[8]).map(r => [K(r), r[8]]));
let groups = 0;
for (const g of dupes) {
  const by = {}; for (const c of g.cards) (by[c.tier] = by[c.tier] || []).push(c);
  for (const [t, cs] of Object.entries(by)) {
    if (cs.length < 2) continue; groups++;
    const k = KEEP[g.artist + '|' + t]; if (!k) throw new Error('no keep ' + g.artist + '|' + t);
    const keep = cs.find(c => c.album === k[0]); if (!keep) throw new Error('keep not found ' + g.artist + ' ' + k[0]);
    for (const c of cs) if (c !== keep) out.push({ key: c.key, from: t, to: null, why: `同級內一藝人一張：${g.artist} ${t} 留《${keep.album}》。${k[1]}`, evidence: (ev.get(keep.key) || []).slice(0, 3) });
  }
}
// 濁水溪公社
const zk = '濁水溪公社|鬼島社會檔案';
if (curApex.get(zk) !== 'pearl') throw new Error('濁水溪 state changed');
out.push({ key: zk, from: 'pearl', to: null, why: '店主 2026-11-03：濁水溪公社不算流亡；指定《台客的復仇》進殿堂（另行上架），池中其他 4 張不當頂點', evidence: ['batch-progress/apex-rebalance-20261103/PLAN.md'] });
// 殿堂補位
const seen = new Set();
for (const [key, why] of ADD) {
  const a = altBy.get(key); if (!a) throw new Error('not in alternates ' + key);
  if (seen.has(a.artist)) throw new Error('dup artist ' + a.artist); seen.add(a.artist);
  out.push({ key, from: null, to: 'hall', why: `殿堂補位：${why}`, evidence: (ev.get(key) || []).slice(0, 4) });
}
fs.writeFileSync(D + 'decisions-q1.json', JSON.stringify(out, null, 1) + '\n');

// 自查
const after = new Map(curApex); for (const d of out) { if (d.to) after.set(d.key, d.to); else after.delete(d.key); }
const cnt = {}, per = new Map();
for (const [k, t] of after) { cnt[t] = (cnt[t] || 0) + 1; const pk = k.split('|')[0] + '|' + t; per.set(pk, (per.get(pk) || 0) + 1); }
const viol = [...per].filter(([, n]) => n > 1);
const drops = out.filter(d => !d.to).length, adds = out.filter(d => d.to).length;
console.log('groups', groups, 'drops', drops, '(dupes', drops - 1, '+ 濁水溪 1)', 'adds', adds);
console.log('after', cnt, '+《台客的復仇》 → hall', cnt.hall + 1);
console.log('同級多張違規', viol.length, viol);
console.log('缺 evidence', out.filter(d => !d.evidence.length).map(d => d.key));
