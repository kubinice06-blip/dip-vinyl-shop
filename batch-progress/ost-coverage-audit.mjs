// 電影原聲覆蓋掃描（2026-09-04 店主指示）：拿一份正典片單去比對 seed_cards.json，
// 印出「池中已有」與「缺」。用法：node batch-progress/ost-coverage-audit.mjs
// ⚠ 比對是模糊的（子字串），兩種誤判都會有：
//   偽陽性——E.T.→Tony Williams、Titanic→Weyes Blood（下游會擋掉，不致命）；
//   偽陰性——**片單寫英文譯名、卡池存原題**，例如 Once Upon a Time in the West
//   在池中是《C'era una volta il West》、A Fistful of Dollars 是《Per un pugno di dollari》。
//   **偽陰性才是致命的那一種**：它會讓我們重複收碟、或跟店主報一個不存在的缺口（裁定第 151 條）。
//   **每一部片都要把原題與常見譯名一起列進 WANT，任一個比中就算命中。**
//   輸出只能當**候選清單**，每一張都要人眼確認。片單要擴充就直接改 WANT 陣列。
import fs from 'fs';
const s = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const norm = t => String(t).toLowerCase().replace(/[^a-z0-9぀-ヿ一-鿿Ѐ-ӿ]+/g, '');
const idx = s.map(r => ({ a: r[0], t: r[1], y: r[6], na: norm(r[0]), nt: norm(r[1]) }));

// 每筆：[片名/盤名關鍵字, 作曲者關鍵字(可空), 標籤]
const WANT = [
  // ── 好萊塢／英美主流經典 ──
  ['star wars', 'williams', '主流'], ['jaws', 'williams', '主流'],
  ['raiders of the lost ark', 'williams', '主流'], ['e t', 'williams', '主流'],
  ['schindler', 'williams', '主流'], ['jurassic park', 'williams', '主流'],
  ['back to the future', 'silvestri', '主流'], ['ghostbusters', '', '主流'],
  ['top gun', '', '主流'], ['dirty dancing', '', '主流'], ['footloose', '', '主流'],
  ['flashdance', '', '主流'], ['saturday night fever', 'bee gees', '主流'],
  ['grease', '', '主流'], ['the bodyguard', 'houston', '主流'],
  ['titanic', 'horner', '主流'], ['braveheart', 'horner', '主流'],
  ['gladiator', 'zimmer', '主流'], ['the lion king', '', '主流'],
  ['purple rain', 'prince', '主流'], ['pulp fiction', '', '主流'],
  ['reservoir dogs', '', '主流'], ['trainspotting', '', '主流'],
  ['the graduate', 'simon', '主流'], ['easy rider', '', '主流'],
  ['american graffiti', '', '主流'], ['the harder they come', 'cliff', '主流'],
  ['a hard day s night', 'beatles', '主流'], ['help', 'beatles', '主流'],
  ['the sound of music', '', '主流'], ['west side story', '', '主流'],
  ['singin in the rain', '', '主流'], ['the wizard of oz', '', '主流'],
  ['breakfast club', '', '主流'], ['pretty in pink', '', '主流'],
  ['the big lebowski', '', '主流'], ['forrest gump', '', '主流'],
  ['o brother where art thou', '', '主流'], ['garden state', '', '主流'],
  ['lost in translation', '', '主流'], ['amelie', 'tiersen', '主流'],
  ['fabuleux destin', 'tiersen', '主流'],
  ['the matrix', '', '主流'], ['fight club', 'dust brothers', '主流'],
  ['requiem for a dream', 'mansell', '主流'], ['inception', 'zimmer', '主流'],
  ['interstellar', 'zimmer', '主流'], ['the dark knight', 'zimmer', '主流'],
  ['la la land', '', '主流'], ['whiplash', '', '主流'],
  ['guardians of the galaxy', '', '主流'], ['the hunger games', '', '主流'],
  ['frozen', '', '主流'], ['moana', '', '主流'], ['encanto', '', '主流'],
  ['a star is born', '', '主流'], ['bohemian rhapsody', 'queen', '主流'],
  ['black panther', '', '主流'], ['barbie', '', '主流'],
  ['once upon a time in the west', 'morricone', '主流'],
  ['the mission', 'morricone', '主流'], ['cinema paradiso', 'morricone', '主流'],
  ['a fistful of dollars', 'morricone', '主流'],
  ['the exorcist', '', '主流'], ['halloween', 'carpenter', '主流'],
  ['blade runner', 'vangelis', '主流'], ['2001', '', '主流'],
  ['a clockwork orange', '', '主流'], ['apocalypse now', '', '主流'],
  ['the godfather', 'rota', '主流'], ['taxi driver', 'herrmann', '主流'],
  ['shaft', 'hayes', '主流'], ['superfly', 'mayfield', '主流'],
  ['across 110th street', '', '主流'], ['trouble man', 'gaye', '主流'],
  ['let s get it on', '', 'skip'],
  ['the last waltz', '', '主流'], ['woodstock', '', '主流'],
  ['stop making sense', 'talking heads', '主流'],
  ['the rocky horror', '', '主流'], ['tommy', 'who', '主流'],
  ['the wall', 'pink floyd', '主流'], ['more', 'pink floyd', '主流'],
  ['zabriskie point', '', '主流'], ['performance', '', '主流'],
  ['the harder they fall', '', 'skip'],

  // ── 影展／作者電影經典 ──
  ['woman in the dunes', 'takemitsu', '影展'], ['砂の女', '', '影展'],
  ['solaris', 'artemyev', '影展'], ['солярис', '', '影展'],
  ['stalker', 'artemyev', '影展'], ['сталкер', '', '影展'],
  ['mirror', 'artemyev', '影展'], ['зеркало', '', '影展'],
  ['harakiri', 'takemitsu', '影展'], ['切腹', '', '影展'],
  ['kwaidan', 'takemitsu', '影展'], ['怪談', '', '影展'],
  ['ran', 'takemitsu', '影展'], ['乱', '', '影展'],
  ['double suicide', 'takemitsu', '影展'], ['心中天網島', '', '影展'],
  ['tokyo story', '', '影展'], ['東京物語', '', '影展'],
  ['rashomon', '', '影展'], ['羅生門', '', '影展'],
  ['seven samurai', '', '影展'], ['七人の侍', '', '影展'],
  ['godzilla', 'ifukube', '影展'], ['ゴジラ', '', '影展'],
  ['la strada', 'rota', '影展'], ['la dolce vita', 'rota', '影展'],
  ['8 1 2', 'rota', '影展'], ['amarcord', 'rota', '影展'],
  ['satyricon', 'rota', '影展'],
  ['jules et jim', 'delerue', '影展'], ['le mepris', 'delerue', '影展'],
  ['contempt', 'delerue', '影展'],
  ['breathless', '', '影展'], ['a bout de souffle', '', '影展'],
  ['pierrot le fou', '', '影展'], ['alphaville', '', '影展'],
  ['les parapluies de cherbourg', 'legrand', '影展'],
  ['umbrellas of cherbourg', 'legrand', '影展'],
  ['les demoiselles de rochefort', 'legrand', '影展'],
  ['orfeu negro', '', '影展'], ['black orpheus', '', '影展'],
  ['un homme et une femme', 'lai', '影展'], ['a man and a woman', 'lai', '影展'],
  ['rosemary s baby', 'komeda', '影展'], ['knife in the water', 'komeda', '影展'],
  ['the double life of veronique', 'preisner', '影展'],
  ['la double vie de veronique', 'preisner', '影展'],
  ['trois couleurs', 'preisner', '影展'], ['dekalog', 'preisner', '影展'],
  ['aguirre', 'popol vuh', '影展'], ['fitzcarraldo', 'popol vuh', '影展'],
  ['nosferatu', 'popol vuh', '影展'],
  ['paris texas', 'cooder', '影展'], ['wings of desire', '', '影展'],
  ['der himmel uber berlin', '', '影展'],
  ['suspiria', 'goblin', '影展'], ['profondo rosso', 'goblin', '影展'],
  ['blue velvet', 'badalamenti', '影展'], ['twin peaks', 'badalamenti', '影展'],
  ['eraserhead', '', '影展'], ['mulholland', 'badalamenti', '影展'],
  ['lost highway', '', '影展'],
  ['koyaanisqatsi', 'glass', '影展'], ['mishima', 'glass', '影展'],
  ['the hours', 'glass', '影展'],
  ['merry christmas mr lawrence', 'sakamoto', '影展'],
  ['戦場のメリークリスマス', '', '影展'],
  ['the last emperor', 'sakamoto', '影展'], ['the sheltering sky', 'sakamoto', '影展'],
  ['there will be blood', 'greenwood', '影展'], ['the master', 'greenwood', '影展'],
  ['phantom thread', 'greenwood', '影展'],
  ['under the skin', 'levi', '影展'], ['jackie', 'levi', '影展'],
  ['ascenseur pour l echafaud', 'davis', '影展'],
  ['lift to the scaffold', 'davis', '影展'],
  ['anatomy of a murder', 'ellington', '影展'],
  ['the man with the golden arm', 'bernstein', '影展'],
  ['alice in den stadten', '', 'skip'],
  ['sorcerer', 'tangerine', '影展'], ['thief', 'tangerine', '影展'],
  ['dead man', 'young', '影展'],
  ['the piano', 'nyman', '影展'], ['the draughtsman', 'nyman', '影展'],
  ['brokeback mountain', 'santaolalla', '影展'],
  ['babel', 'santaolalla', '影展'],
  ['in the mood for love', '', '影展'], ['花樣年華', '', '影展'],
  ['chungking express', '', '影展'], ['重慶森林', '', '影展'],
  ['a city of sadness', '', '影展'], ['悲情城市', '', '影展'],
  ['yi yi', '', '影展'], ['一一', '', '影展'],
  ['raise the red lantern', '', '影展'], ['大紅燈籠高高掛', '', '影展'],
  ['farewell my concubine', '', '影展'], ['霸王別姬', '', '影展'],
  ['oldboy', '', '影展'], ['spring summer fall winter', '', '影展'],
  ['pather panchali', 'shankar', '影展'], ['apu', 'shankar', '影展'],
  ['the battle of algiers', 'morricone', '影展'],
  ['il conformista', '', '影展'], ['the conformist', '', '影展'],
  ['last tango in paris', 'barbieri', '影展'],
  ['ultimo tango', 'barbieri', '影展'],
  ['performance 2', '', 'skip'],
  ['picnic at hanging rock', '', '影展'],
  ['walkabout', '', '影展'], ['the wicker man', '', '影展'],
  ['jodorowsky', '', '影展'], ['el topo', '', '影展'], ['holy mountain', '', '影展'],
  ['stroszek', '', '影展'], ['querelle', '', '影展'],
  ['nuovo cinema', 'morricone', '影展'],
];

const found = [], missing = [];
for (const [film, comp, tag] of WANT) {
  if (tag === 'skip') continue;
  const nf = norm(film), nc = norm(comp);
  const hit = idx.find(r => r.nt.includes(nf) && (!nc || r.na.includes(nc) || r.nt.includes(nc)));
  const loose = hit;
  if (loose) found.push(`${tag}｜${film}${comp ? '／' + comp : ''} → ${loose.a}《${loose.t}》${loose.y}`);
  else missing.push([tag, film, comp]);
}
console.log('=== 池中已有 ' + found.length + ' ===');
found.forEach(x => console.log('  ' + x));
console.log('\n=== 缺 ' + missing.length + ' ===');
for (const tag of ['主流', '影展']) {
  const g = missing.filter(m => m[0] === tag);
  console.log(`\n[${tag}] ${g.length} 筆`);
  console.log('  ' + g.map(m => m[1] + (m[2] ? '(' + m[2] + ')' : '')).join('、'));
}
