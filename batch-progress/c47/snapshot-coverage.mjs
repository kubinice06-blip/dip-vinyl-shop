// c-47 開工前的覆蓋快照：把稽核底稿（2026-08-22，池 10,735 鍵）提到的每位藝人
// 在「現在的池子」（seed 11,866＋apex 873）裡的全部條目抓出來，給策展代理精確比對。
// 先驗證缺口再決定重心——c-46 的方法教訓（雷鬼與新世紀兩線都推翻過 brief 的假設）。
import fs from 'node:fs';
const R = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const seed = JSON.parse(fs.readFileSync(`${R}/seed_cards.json`, 'utf8'));
const apex = JSON.parse(fs.readFileSync(`${R}/apex_pool.json`, 'utf8'));
const rows = [
  ...seed.map(r => ({ artist: r[0], album: r[1], where: 'seed', year: r[6] })),
  ...['hall', 'pearl', 'heresy'].flatMap(t => apex[t].map(r => ({ artist: r[0], album: r[1], where: `apex:${t}`, year: r[3] }))),
];
// 摺連字號＋NFKC＋去重音＋小寫（同 pool-keys.mjs 思路），比對用
const fold = s => String(s || '').replace(/[‐-―－]/g, '-').normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '').normalize('NFKC').toLowerCase();

const DOMAINS = {
  'us-pop-nordic': ['Frank Sinatra','Nat King Cole','Dean Martin','Barbra Streisand','Neil Diamond','Carpenters','Whitney Houston','Mariah Carey','Celine Dion','Céline Dion','Cher','Dionne Warwick','Barry Manilow','Andy Williams','Perry Como','Bing Crosby','Doris Day','Johnny Mathis','Sammy Davis','Bobby Darin','Dusty Springfield','Tom Jones','Engelbert','Shirley Bassey','Petula Clark','Paul Anka','Neil Sedaka','Connie Francis','Brenda Lee','5th Dimension','The 5th Dimension','Burt Bacharach','Anne Murray','Helen Reddy','Michael Bolton','Richard Marx','Josh Groban','Judy Garland','ABBA','Roxette','a-ha','Ace of Base','The Cardigans','Robyn','Aqua','Sinead','Sinéad O\'Connor','The Cranberries','Clannad','The Chieftains','Planxty','The Pogues','Loreena McKennitt','Westlife','Enya','The Corrs','The Dubliners','Boyzone','Secret Garden','Sissel'],
  'country': ['Johnny Cash','Merle Haggard','Waylon Jennings','Willie Nelson','Dolly Parton','Loretta Lynn','Emmylou Harris','George Jones','Kenny Rogers','Glen Campbell','Chris Stapleton','Kacey Musgraves','Sturgill Simpson','Tyler Childers','Jason Isbell','Gillian Welch','John Prine','Townes Van Zandt','Lucinda Williams','Patsy Cline','Marty Robbins','Buck Owens','Roger Miller','Jim Reeves','Conway Twitty','Charlie Rich','Tammy Wynette','Charley Pride','Hank Snow','Lefty Frizzell','The Judds','Rosanne Cash','Randy Travis','Garth Brooks','Vince Gill','Reba','The Chicks','Dixie Chicks','Brooks & Dunn','Trisha Yearwood','LeAnn Rimes','Toby Keith','Kenny Chesney','Brad Paisley','Eric Church','Luke Combs','Morgan Wallen','Zach Bryan','Margo Price','Don Williams','Alabama','Stanley Brothers','The Stanley Brothers','Ricky Skaggs','Hank Williams','Bill Monroe','Flatt','Alison Krauss','Dwight Yoakam'],
  'latin': ['Soda Stereo','Gustavo Cerati','Café Tacvba','Charly García','Luis Alberto Spinetta','Los Fabulosos Cadillacs','Natalia Lafourcade','Bad Bunny','J Balvin','Daddy Yankee','ROSALÍA','Rosalía','Selena','Shakira','Juan Gabriel','José José','Luis Miguel','Maná','Julieta Venegas','Juanes','Gloria Estefan','Marc Anthony','Vicente Fernández','Rocío Dúrcal','Los Bukis','Camilo Sesto','Thalía','Karol G','Calle 13','Aventura','Romeo Santos','Los Tigres del Norte','Mon Laferte','Fito Páez','Los Prisioneros','Caifanes','Héroes del Silencio','Mecano','Hombres G','Alejandro Sanz','Julio Iglesias'],
  'fr-it-es-de': ['Françoise Hardy','Serge Gainsbourg','Jacques Brel','Charles Aznavour','Jacques Dutronc','Michel Polnareff','Édith Piaf','Edith Piaf','Georges Brassens','Barbara','France Gall','Véronique Sanson','Daniel Balavoine','Mylène Farmer','Stromae','Charles Trenet','Yves Montand','Juliette Gréco','Gilbert Bécaud','Léo Ferré','Dalida','Johnny Hallyday','Claude François','Michel Berger','Jean-Jacques Goldman','Renaud','Alain Souchon','Julien Clerc','Jane Birkin','Indochine','Téléphone','Angèle','Christine and the Queens','Lucio Battisti','Fabrizio De André','Franco Battiato','Mina','Paolo Conte','Adriano Celentano','Domenico Modugno','Eros Ramazzotti','Laura Pausini','Zucchero','Vasco Rossi','Pino Daniele','Andrea Bocelli','Raphael','Nino Bravo','Joan Manuel Serrat','Joaquín Sabina','Raffaella Carrà','Nena','Falco','Herbert Grönemeyer','Udo Lindenberg','Westernhagen','Marlene Dietrich','Modern Talking','Helene Fischer'],
  'musicals-songbook': ['Ella Fitzgerald','Billie Holiday','Sarah Vaughan','Dinah Washington','Anita O\'Day','Mel Tormé','Julie London','Blossom Dearie','Carmen McRae','Fred Astaire','Rosemary Clooney','Original Broadway Cast','Original Cast','Various Artists'],
};
// 音樂劇要另外用「專輯名」掃（掛名多為 Various/OBC）
const MUSICAL_TITLES = ['West Side Story','The Sound of Music','Jesus Christ Superstar','Grease','My Fair Lady','Oklahoma','South Pacific','The King and I','Guys and Dolls','Gypsy','Fiddler on the Roof','Cabaret','Hair','Camelot','Evita','Cats','Les Misérables','Phantom of the Opera','Rent','Wicked','Hamilton','Sweeney Todd','Company','Into the Woods','Wizard of Oz'];

const out = {};
for (const [dom, artists] of Object.entries(DOMAINS)) {
  const fa = artists.map(fold);
  out[dom] = rows.filter(r => {
    const f = fold(r.artist);
    return fa.some(a => f === a || f.includes(a) || (a.length > 5 && a.includes(f)));
  });
}
out['musicals-by-title'] = rows.filter(r => {
  const f = fold(r.album);
  return MUSICAL_TITLES.some(t => f.includes(fold(t)));
});
for (const [dom, list] of Object.entries(out)) {
  console.log(`\n== ${dom}（${list.length} 筆）==`);
  for (const r of list.sort((a, b) => a.artist.localeCompare(b.artist))) {
    console.log(`  [${r.where}] ${r.artist} — ${r.album}（${r.year ?? '?'}）`);
  }
}
fs.writeFileSync(`${R}/batch-progress/c47/pool-coverage.json`, JSON.stringify(out, null, 1));
console.log('\n→ batch-progress/c47/pool-coverage.json');
