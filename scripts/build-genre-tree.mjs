#!/usr/bin/env node
// 建立「類型挑片 v2」的曲風樹與卡片歸屬。
//
//   node scripts/build-genre-tree.mjs [--pull] [--write]
//
//   --pull   先從 Cloudflare KV 重新拉 mapgenre3 的 rawGenres（需 CLOUDFLARE_API_TOKEN），
//            否則沿用 data/rawgenres-cache.json。
//   --write  寫出 genre-tree.json 與 card-subgenres.json；預設只印報告。
//
// 設計要點（規格見 GENRE_PICK_SWAP_PLAN.md、研究見 GENRE_LAYER_PLAN.md）：
// - 十大類＝卡片的**主類型**（seed_cards 曲風陣列首欄），不是「含此標籤」。
// - 第二層規則以 Last.fm 標籤正規式為主；搖滾另有藝人級對照 rock-subgenre-map.json 優先，
//   對照表沒收錄的藝人退回標籤後備（ROCK_FALLBACK），否則新上架的搖滾卡整批落不了位。
// - 第三層只在資料撐得住的桶生成（門檻同第二層：節點卡數 ≥ MIN_NODE）。
// - 多重歸屬：一張卡可落在同層多個節點（ambient＋techno 很正常），不硬切。
// - 古典不用標籤（覆蓋僅 23%），改用作曲家欄＋年份推時期。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PULL = process.argv.includes('--pull');
const WRITE = process.argv.includes('--write');
const MIN_NODE = 20;              // 節點卡數門檻，低於此不生成為可選項
const CACHE = path.join(ROOT, 'data', 'rawgenres-cache.json');

// ── 標籤雜訊 ──────────────────────────────────────────────────────────
// 只濾「真的無法用來分類」的：年代、地名、個人清單、電台自訂標、情緒詞、樂器與載體，
// 外加過於籠統的大類名（rock／jazz／metal／country…，它們無法區分第二層）。
// ⚠ 子類型名一律保留（ambient、disco、punk、funk、shoegaze…），規則直接拿它們比對——
// 初版誤把 ambient／disco／funk 也當雜訊，Ambient 桶因此從 516 掉到 228。
const NOISE = new RegExp('^(' + [
  // 年代、國籍與地名
  '\\d{2,4}s?', 'british', 'american', 'usa', 'uk', 'japanese', 'japan', 'taiwan', 'taiwanese',
  'chinese', 'german', 'french', 'italian', 'swedish', 'canadian', 'australian', 'brazilian',
  'korean', 'asia', 'asian', 'europe', 'hong kong', 'cantonese', 'mandarin', 'jamaica',
  'jamaican', 'africa', 'india', 'cuba', 'mali', 'spanish', 'karlsruhe',
  // 個人清單與電台／社群自訂標
  'favou?rite albums?', 'albums? i own', 'seen live', '1001 albums.*', 'best of \\d+',
  'all time favou?rites?', 'under \\d+ listeners', 'albums', 'all', 'laptop', 'totec radio',
  'gammarec', 'freepurp1e', 'allboutguitar', 'bluezzz', 'brc blues band.*', 'allbout guitar.*',
  'wwwlautfmbluesclub', 'blue note', 'ecm records',
  // 情緒與評價詞
  'love', 'beautiful', 'awesome', 'chill', 'mellow', 'masterpiece', 'essential', 'epic',
  'oldies', 'sexy', 'funky', 'gritty', 'smooth', 'ethnic', 'roots',
  // 樂器、角色與載體
  'guitar', 'piano', 'saxophone', 'trumpet', 'harmonica', 'composer', 'composers', 'conductor',
  'pianist', 'virtuoso', 'instrumental', 'vinyl', 'lp', 'male vocalists?', 'female vocalists?',
  // 過於籠統的大類名
  'rock', 'jazz', 'pop', 'soul', 'blues', 'folk', 'electronic', 'electronica', 'classical',
  'world', 'world music', 'hip-hop', 'hip hop', 'rap', 'indie', 'alternative', 'experimental',
  'classic', 'classics', 'dance', 'metal', 'country', 'reggae', 'acoustic',
].join('|') + ')$', 'i');

// ── 樹定義 ────────────────────────────────────────────────────────────
const L1 = [
  ['rock', '搖滾'], ['jazz', '爵士'], ['electronic', '電子'], ['soul', '靈魂放克'],
  ['hiphop', '嘻哈 R&B'], ['classical', '古典'], ['folk', '民謠'], ['pop', '流行'],
  ['world', '世界'], ['blues', '藍調'],
];

const RULES = {
  // 搖滾第二層走藝人級對照（rock-subgenre-map.json）＋ ROCK_FALLBACK，此處只列中文名與第三層
  rock: {
    classic: { zh: '老搖滾' },
    'psych-prog': { zh: '迷幻前衛', children: {
      krautrock: { zh: 'Krautrock', re: /^(krautrock|kraut)$/ },
      prog: { zh: '前衛搖滾', re: /^(progressive rock|prog|symphonic prog|symphonic rock|canterbury scene)$/ },
      psych: { zh: '迷幻搖滾', re: /^(psychedelic rock|psychedelic|acid rock|neo-psychedelia)$/ },
      'space-rock': { zh: '太空搖滾', re: /^space rock$/ },
      'art-rock': { zh: '藝術搖滾', re: /^art rock$/ },
    } },
    'punk-wave': { zh: '龐克新浪潮', children: {
      punk: { zh: '龐克硬蕊', re: /^(punk|punk rock|hardcore punk|hardcore|pop punk|oi!|ska punk|anarcho-punk|proto-punk|art punk|post-hardcore)$/ },
      'post-punk': { zh: '後龐克', re: /^(post-punk|post punk|postpunk)$/ },
      'new-wave': { zh: '新浪潮', re: /^(new wave|synthpop|synth pop|new romantic)$/ },
      goth: { zh: '哥德暗潮', re: /^(gothic rock|goth|gothic|darkwave|deathrock|ethereal wave)$/ },
      industrial: { zh: '工業', re: /^(industrial rock|industrial|ebm)$/ },
      'no-wave': { zh: 'No Wave', re: /^(no wave|noise rock)$/ },
    } },
    metal: { zh: '金屬', children: {
      thrash: { zh: '鞭擊', re: /^(thrash metal|speed metal|thrash)$/ },
      death: { zh: '死亡金屬', re: /death metal$/ },
      black: { zh: '黑金屬', re: /black metal$/ },
      doom: { zh: '厄運與粗厚', re: /^(doom metal|sludge|sludge metal|stoner rock|stoner metal|drone metal|funeral doom)$/ },
      'prog-metal': { zh: '前衛與技術', re: /^(progressive metal|technical death metal|djent|progressive death metal)$/ },
      trad: { zh: '傳統重金屬', re: /^(heavy metal|nwobhm|power metal|traditional heavy metal)$/ },
      'alt-metal': { zh: '另類與新金屬', re: /^(alternative metal|nu metal|groove metal|metalcore|gothic metal)$/ },
    } },
    'indie-alt': { zh: '獨立另類' },
    'dream-post': { zh: '音牆後搖', children: {
      shoegaze: { zh: '瞪鞋', re: /^(shoegaze|noise pop)$/ },
      'dream-pop': { zh: '夢幻流行', re: /^dream pop$/ },
      'post-rock': { zh: '後搖滾', re: /^(post-rock|post rock)$/ },
      slowcore: { zh: '慢核', re: /^(slowcore|sadcore)$/ },
    } },
    'jrock-asia': { zh: '日亞搖滾' },
    'roots-other': { zh: '根源其他' },
  },

  jazz: {
    bop: { zh: 'Bebop / Hard Bop', re: /^(bebop|bop|hard bop|hardbop|post-bop|post bop)$/ },
    cool: { zh: 'Cool / 西岸', re: /^(cool jazz|west coast jazz)$/ },
    modal: { zh: 'Modal / 靈性爵士', re: /^(modal jazz|modal|spiritual jazz)$/ },
    free: { zh: '自由與前衛', re: /^(free jazz|avant-garde jazz|free improvisation|avantgarde|avant-garde)$/ },
    fusion: { zh: 'Fusion / Jazz-Funk', re: /^(fusion|jazz fusion|jazz-funk|jazz funk|jazz rock)$/ },
    vocal: { zh: '人聲爵士', re: /^(vocal jazz|jazz vocal)$/ },
    swing: { zh: 'Swing / 大樂團', re: /^(swing|big band|dixieland|trad jazz)$/ },
    latin: { zh: '拉丁與巴莎', re: /^(latin jazz|bossa nova|afro-cuban jazz|brazilian jazz)$/ },
    ecm: { zh: 'ECM / 歐陸', re: /^(ecm|european jazz|nordic jazz|scandinavian jazz|chamber jazz)$/ },
    'soul-jazz': { zh: 'Soul Jazz / 管風琴', re: /^(soul jazz|soul-jazz|organ jazz|groove)$/ },
    contemporary: { zh: '當代與 Nu Jazz', re: /^(contemporary jazz|nu jazz|nu-jazz|acid jazz|smooth jazz)$/ },
    'jp-jazz': { zh: '日本爵士', re: /^(japanese jazz|j-jazz|和ジャズ)$/ },
  },

  electronic: {
    ambient: { zh: 'Ambient / Drone', re: /^(ambient|drone|dark ambient|ambient techno|space music)$/ },
    techno: { zh: 'Techno', re: /^(techno|minimal techno|detroit techno|minimal|acid techno)$/ },
    house: { zh: 'House', re: /^(house|deep house|acid house|chicago house|tech house)$/ },
    idm: { zh: 'IDM / Glitch', re: /^(idm|glitch|braindance|intelligent dance music)$/ },
    synth: { zh: 'Synthpop / Electro', re: /^(synthpop|electropop|synth pop|electro|italo disco)$/ },
    industrial: { zh: 'Industrial / EBM', re: /^(industrial|ebm|power electronics)$/ },
    downtempo: { zh: 'Trip-hop / Downtempo', re: /^(trip-hop|trip hop|downtempo|chillout|chillwave)$/ },
    bass: { zh: 'Dub / Bass', re: /^(dubstep|uk garage|jungle|drum and bass|dnb|breakbeat|dub techno|dub)$/ },
    noise: { zh: '實驗與噪音', re: /^(noise|musique concrete|sound collage|plunderphonics|lowercase)$/ },
    'nu-disco': { zh: 'Disco / Nu-Disco', re: /^(disco|nu-disco|disco house|french house)$/ },
    'jp-electronic': { zh: '日系電子', re: /^(city pop|japanese electronic|kankyo ongaku|environmental music)$/ },
  },

  soul: {
    funk: { zh: 'Funk / P-Funk', re: /^(funk|p-funk|jazz-funk|funk rock|deep funk)$/ },
    motown: { zh: 'Motown / Northern', re: /^(motown|northern soul)$/ },
    southern: { zh: 'Southern / Stax', re: /^(southern soul|stax|deep soul|memphis soul|muscle shoals)$/ },
    philly: { zh: 'Philly / Quiet Storm', re: /^(philly soul|smooth soul|quiet storm)$/ },
    disco: { zh: 'Disco / Boogie', re: /^(disco|boogie|post-disco)$/ },
    'classic-rnb': { zh: '經典 R&B / Doo-wop', re: /^(rhythm and blues|rnb|r&b|doo-wop|doo wop)$/ },
    'neo-soul': { zh: 'Neo-Soul', re: /^(neo-soul|neo soul)$/ },
    gospel: { zh: 'Gospel', re: /^(gospel|spirituals)$/ },
    'psych-soul': { zh: '迷幻靈魂', re: /^psychedelic soul$/ },
  },

  hiphop: {
    'east-coast': { zh: '東岸 / Boom Bap', re: /^(east coast rap|east coast hip hop|boom bap|hardcore hip hop|new york rap)$/ },
    'west-coast': { zh: '西岸 / G-Funk', re: /^(west coast rap|west coast hip hop|g-funk|g funk)$/ },
    south: { zh: '南方 / Trap', re: /^(dirty south|southern rap|southern hip hop|trap|memphis rap)$/ },
    underground: { zh: '地下與抽象', re: /^(underground hip-hop|underground rap|abstract hip hop|experimental hip hop|art rap)$/ },
    conscious: { zh: 'Jazz Rap / Conscious', re: /^(jazz rap|conscious hip hop|alternative hip-hop|alternative rap)$/ },
    gangsta: { zh: 'Gangsta', re: /^(gangsta rap|hardcore rap|mafioso rap)$/ },
    rnb: { zh: '當代 R&B', re: /^(contemporary rnb|alternative rnb|alt rnb|neo-soul|neo soul|rnb)$/ },
    'pop-rap': { zh: 'Pop Rap', re: /^(pop rap|pop rnb)$/ },
    'asia-rap': { zh: '亞洲嘻哈', re: /^(japanese hip-hop|j-rap|k-hip hop|taiwanese hip hop|mandarin rap|c-rap)$/ },
  },

  folk: {
    country: { zh: '鄉村', re: /^(classic country|outlaw country|country pop|honky tonk)$/ },
    americana: { zh: 'Americana / Alt-Country', re: /^(americana|alt-country|alternative country|country rock)$/ },
    british: { zh: '英倫與凱爾特', re: /^(british folk|celtic|traditional folk|folk revival|irish folk)$/ },
    'psych-folk': { zh: '迷幻與怪奇民謠', re: /^(psychedelic folk|freak folk|acid folk|psych folk)$/ },
    'indie-folk': { zh: '獨立與室內民謠', re: /^(indie folk|chamber folk|contemporary folk)$/ },
    bluegrass: { zh: 'Bluegrass', re: /^(bluegrass|old time|appalachian)$/ },
    'folk-rock': { zh: '民謠搖滾', re: /^(folk rock|progressive folk)$/ },
    songwriter: { zh: '創作歌手', re: /^(singer-songwriter|singer songwriter)$/ },
    'tw-folk': { zh: '台灣與華語民謠', re: /^(campus folk|taiwanese folk|mandarin folk|c-folk)$/ },
  },

  pop: {
    'jp-pop': { zh: '日本流行 / City Pop', re: /^(j-pop|jpop|city pop|japanese city pop|shibuya-kei|kayokyoku)$/ },
    'c-pop': { zh: '華語流行', re: /^(c-pop|cpop|cantopop|mandopop|canto-pop)$/ },
    'k-pop': { zh: '韓國流行', re: /^(k-pop|kpop)$/ },
    synth: { zh: '合成器流行', re: /^(synthpop|electropop|synth pop|dance-pop|dance pop)$/ },
    'art-pop': { zh: '藝術流行', re: /^(art pop|baroque pop|chamber pop|psychedelic pop|sophisti-pop)$/ },
    'indie-pop': { zh: '獨立流行', re: /^(indie pop|dream pop|jangle pop|twee pop|bedroom pop)$/ },
    'pop-rock': { zh: '流行搖滾', re: /^(pop rock|power pop|soft rock)$/ },
  },

  world: {
    reggae: { zh: 'Reggae / Dub', re: /^(roots reggae|dub|dancehall|ska|rocksteady|dancehall reggae)$/ },
    african: { zh: '非洲', re: /^(african|afrobeat|highlife|ethiopian|nigeria|south africa|desert blues|afro-pop|soukous)$/ },
    latin: { zh: '拉丁 / 古巴', re: /^(latin|salsa|cuban|son cubano|mambo|cumbia|tango)$/ },
    brazil: { zh: '巴西 / Bossa', re: /^(bossa nova|mpb|brazilian|samba|tropicalia|tropicália)$/ },
    india: { zh: '印度與南亞', re: /^(indian|indian classical|hindustani|carnatic|raga|bollywood)$/ },
    med: { zh: '佛朗明哥與地中海', re: /^(flamenco|fado|portuguese|greek|rebetiko)$/ },
    arabic: { zh: '中東與土耳其', re: /^(arabic|turkish|persian|middle east|anatolian rock|rai)$/ },
  },

  blues: {
    delta: { zh: 'Delta / 鄉村藍調', re: /^(delta blues|country blues|acoustic blues|prewar blues|pre-war blues)$/ },
    chicago: { zh: '芝加哥 / 電氣', re: /^(chicago blues|electric blues|urban blues)$/ },
    'blues-rock': { zh: '藍調搖滾', re: /^(blues rock|british blues)$/ },
    texas: { zh: '德州藍調', re: /^(texas blues|west coast blues|jump blues)$/ },
    piano: { zh: '鋼琴與 Boogie', re: /^(piano blues|boogie woogie|barrelhouse)$/ },
    'classic-blues': { zh: '古典藍調', re: /^(classic blues|classic female blues|vaudeville blues)$/ },
    soulblues: { zh: 'Soul Blues', re: /^(soul blues|swamp blues)$/ },
  },

  // 古典：不用標籤（覆蓋僅 23%），改用作曲家欄＋年份，見 classifyClassical()
  classical: {
    baroque: { zh: '巴洛克與早期' },
    'classical-era': { zh: '古典時期' },
    romantic: { zh: '浪漫時期' },
    modern: { zh: '20 世紀' },
    contemporary: { zh: '當代與極簡' },
    film: { zh: '電影配樂' },
    opera: { zh: '歌劇與聲樂' },
  },
};

// 搖滾第二層的標籤後備（藝人不在 rock-subgenre-map.json 時用）。
// 順序＝優先序：特徵最強的桶先判，避免 metal 卡被 classic 的 hard rock 收走。
const ROCK_FALLBACK = [
  ['metal', /^(heavy metal|death metal|black metal|thrash metal|doom metal|sludge|stoner rock|power metal|nwobhm|metalcore|nu metal|alternative metal|progressive metal|groove metal|speed metal|technical death metal|gothic metal|drone metal|funeral doom)$/],
  ['punk-wave', /^(punk|punk rock|hardcore punk|post-punk|new wave|no wave|gothic rock|darkwave|deathrock|industrial rock|pop punk|art punk|post-hardcore|oi!|ska punk|anarcho-punk|proto-punk|noise rock|ethereal wave)$/],
  ['dream-post', /^(shoegaze|dream pop|post-rock|post rock|slowcore|sadcore|noise pop)$/],
  ['psych-prog', /^(krautrock|kraut|progressive rock|psychedelic rock|space rock|art rock|canterbury scene|symphonic prog|acid rock|neo-psychedelia)$/],
  ['jrock-asia', /^(j-rock|japanese rock|visual kei|c-rock|k-rock|taiwanese rock|mandarin rock)$/],
  ['indie-alt', /^(indie rock|alternative rock|indie pop|grunge|britpop|emo|lo-fi|jangle pop|math rock|college rock|twee pop|art pop|bedroom pop)$/],
  ['classic', /^(classic rock|hard rock|blues rock|glam rock|soft rock|aor|southern rock|country rock|rock and roll|rockabilly|folk rock|pop rock|power pop)$/],
];

// 古典作曲家 → 時期（只需覆蓋卡池實際出現的；查無則用年份與標籤兜底）
const COMPOSER_ERA = [
  [/bach|handel|vivaldi|scarlatti|purcell|monteverdi|telemann|corelli|rameau|couperin|buxtehude|palestrina|lassus|victoria|byrd|tallis|dowland|gesualdo|schütz|biber|albinoni|pachelbel/i, 'baroque'],
  [/mozart|haydn|beethoven|schubert|gluck|salieri|clementi|boccherini|cherubini/i, 'classical-era'],
  [/chopin|liszt|brahms|tchaikovsky|schumann|mendelssohn|wagner|verdi|dvořák|dvorak|grieg|rachmaninoff|rachmaninov|mahler|bruckner|saint-saëns|saint-saens|berlioz|bizet|puccini|rossini|donizetti|bellini|paganini|smetana|borodin|mussorgsky|rimsky|franck|fauré|faure|elgar|sibelius|richard strauss|johann strauss/i, 'romantic'],
  [/debussy|ravel|stravinsky|prokofiev|shostakovich|bartók|bartok|schoenberg|berg|webern|hindemith|poulenc|milhaud|honegger|janáček|janacek|kodály|kodaly|respighi|varèse|varese|ives|copland|barber|gershwin|weill|orff|messiaen|britten|walton|vaughan williams|holst|nielsen|szymanowski|enescu|villa-lobos|ginastera|revueltas|chávez|chavez|weinberg|schnittke|gubaidulina|ustvolskaya|lutosławski|lutoslawski|penderecki|ligeti|xenakis|nono|berio|stockhausen|boulez|cage|feldman/i, 'modern'],
  [/pärt|part|glass|reich|riley|la monte young|adams|górecki|gorecki|tavener|nyman|richter|einaudi|frahm|arnalds|jóhannsson|johannsson|sakamoto|takemitsu|scelsi|radigue|lucier|niblock|palestine|bryars|budd|eno|hassell|saariaho|lachenmann|sciarrino|ferneyhough|grisey|murail|haas|abrahamsen|adès|ades|muhly|shaw|montgomery|higdon|chin|zhou|chen|tan dun|unsuk/i, 'contemporary'],
];
const FILM_RE = /^(film score|soundtrack score|original score|movie score|film music|soundtrack|score)$/;
const OPERA_RE = /^(opera|operetta|art song|lieder|choral|sacred music|requiem|cantata|oratorio)$/;

function classifyClassical(card) {
  const out = new Set();
  const tags = card.tags;
  if (tags.some(t => FILM_RE.test(t))) out.add('film');
  if (tags.some(t => OPERA_RE.test(t))) out.add('opera');
  if (tags.some(t => /^(baroque|early music|renaissance|medieval|gregorian)$/.test(t))) out.add('baroque');
  if (tags.some(t => /^(minimalism|minimal|post-minimalism|neoclassical|post-classical|modern classical|contemporary classical|neo-classical|new age)$/.test(t))) out.add('contemporary');
  if (tags.some(t => /^(20th century classical|serialism|twelve-tone|atonal|musique concrete)$/.test(t))) out.add('modern');
  if (tags.some(t => /^(romantic|romanticism)$/.test(t))) out.add('romantic');
  // 作曲家欄優先於年份；沒有作曲家欄時用 artist（古典卡的 artist 常常就是作曲家）
  const hay = card.composer || card.artist;
  for (const [re, era] of COMPOSER_ERA) if (re.test(hay)) { out.add(era); break; }
  // 完全無訊息時才用年份兜底（錄音年份對古典意義不大）
  if (!out.size && card.year >= 1980) out.add('contemporary');
  return [...out];
}

// ── 讀資料 ────────────────────────────────────────────────────────────
const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const rockMap = JSON.parse(fs.readFileSync(path.join(ROOT, 'rock-subgenre-map.json'), 'utf8'));

async function pullRawGenres() {
  const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
  if (!TOKEN) { console.error('缺少 CLOUDFLARE_API_TOKEN，無法 --pull'); process.exit(1); }
  const ACCOUNT = '3a23f905e8f31d91c85050f2ed304321';
  const NS = '5f65e74b17d644b68a3f542b08a5c105';
  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/storage/kv/namespaces/${NS}/bulk/get`;
  const keys = seed.map(r => `mapgenre3:${r[0].toLowerCase()}|${r[1].toLowerCase()}`);
  const out = {};
  let hit = 0;
  for (let i = 0; i < keys.length; i += 100) {
    const chunk = keys.slice(i, i + 100);
    let json = null;
    for (let t = 0; t < 3; t++) {
      try {
        const res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ keys: chunk }) });
        json = await res.json();
        if (json.success) break;
      } catch { /* retry */ }
      await new Promise(r => setTimeout(r, 1500));
    }
    if (!json?.success) continue;
    for (const [k, v] of Object.entries(json.result?.values || json.result || {})) {
      let d = (v && typeof v === 'object' && 'value' in v) ? v.value : v;
      if (d == null) continue;
      try { d = typeof d === 'string' ? JSON.parse(d) : d; } catch { continue; }
      out[k.replace(/^mapgenre3:/, '')] = d;
      hit++;
    }
    process.stdout.write(`\rKV 拉取 ${Math.min(i + 100, keys.length)}/${keys.length} 命中 ${hit}`);
  }
  console.log();
  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  fs.writeFileSync(CACHE, JSON.stringify(out), 'utf8');
  return out;
}

const rawGenres = PULL ? await pullRawGenres()
  : (fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : (() => {
      console.error(`找不到 ${CACHE}，請先跑一次 --pull`);
      process.exit(1);
    })());

const cards = seed.map((r, i) => {
  const g = rawGenres[`${r[0].toLowerCase()}|${r[1].toLowerCase()}`];
  return {
    i, artist: r[0], album: r[1], prim: (r[5] || [])[0], year: r[6] || 0, composer: r[7] || '',
    tags: (g?.rawGenres || []).map(t => String(t).toLowerCase().trim()).filter(t => t && !NOISE.test(t)),
  };
});

// ── 落位 ──────────────────────────────────────────────────────────────
function classify(card) {
  const g = card.prim;
  if (!g || !RULES[g]) return [];
  const paths = new Set();
  if (g === 'classical') {
    for (const n of classifyClassical(card)) paths.add(`classical/${n}`);
    return [...paths];
  }
  if (g === 'rock') {
    // 藝人級對照優先（三支 agent 覆核過，品質高於標籤）；沒收錄的退回標籤後備
    let bucket = rockMap[card.artist];
    if (!bucket) {
      for (const [id, re] of ROCK_FALLBACK) {
        if (card.tags.some(t => re.test(t))) { bucket = id; break; }
      }
    }
    if (bucket && RULES.rock[bucket]) {
      paths.add(`rock/${bucket}`);
      const children = RULES.rock[bucket].children;
      if (children) for (const [id, def] of Object.entries(children)) {
        if (card.tags.some(t => def.re.test(t))) paths.add(`rock/${bucket}/${id}`);
      }
    }
    return [...paths];
  }
  for (const [id, def] of Object.entries(RULES[g])) {
    if (!def.re) continue;
    if (card.tags.some(t => def.re.test(t))) paths.add(`${g}/${id}`);
  }
  return [...paths];
}

const assign = new Map();               // "artist|album" -> paths[]
for (const c of cards) {
  const p = classify(c);
  if (p.length) assign.set(`${c.artist}|${c.album}`, p);
}
const step1 = assign.size;

// 步驟 2：同藝人傳播——同一藝人在同一大類下已落的第二層節點，補給沒落位的卡
const byArtistGenre = new Map();
for (const c of cards) {
  const p = assign.get(`${c.artist}|${c.album}`);
  if (!p) continue;
  const k = `${c.artist}|${c.prim}`;
  if (!byArtistGenre.has(k)) byArtistGenre.set(k, new Map());
  const m = byArtistGenre.get(k);
  for (const x of p) m.set(x, (m.get(x) || 0) + 1);
}
let step2 = 0;
for (const c of cards) {
  if (assign.has(`${c.artist}|${c.album}`)) continue;
  const m = byArtistGenre.get(`${c.artist}|${c.prim}`);
  if (!m || !m.size) continue;
  // 只繼承第二層（不繼承第三層，避免把不同期的卡硬塞同一個細分）
  const best = [...m.entries()].filter(([p]) => p.split('/').length === 2).sort((a, b) => b[1] - a[1])[0];
  if (!best) continue;
  assign.set(`${c.artist}|${c.album}`, [best[0]]);
  step2++;
}

// ── 統計與樹輸出 ──────────────────────────────────────────────────────
const counts = new Map();
for (const paths of assign.values()) for (const p of paths) counts.set(p, (counts.get(p) || 0) + 1);
const primCount = {};
for (const c of cards) if (c.prim) primCount[c.prim] = (primCount[c.prim] || 0) + 1;

const tree = { 產出日期: new Date().toISOString().slice(0, 10), minNode: MIN_NODE, genres: [] };
for (const [gid, zh] of L1) {
  const node = { id: gid, zh, count: primCount[gid] || 0, children: [] };
  for (const [cid, def] of Object.entries(RULES[gid] || {})) {
    const p = `${gid}/${cid}`;
    const n = counts.get(p) || 0;
    if (n < MIN_NODE) continue;
    const child = { id: cid, zh: def.zh, count: n, children: [] };
    for (const [gcid, gdef] of Object.entries(def.children || {})) {
      const gn = counts.get(`${p}/${gcid}`) || 0;
      if (gn < MIN_NODE) continue;
      child.children.push({ id: gcid, zh: gdef.zh, count: gn });
    }
    child.children.sort((a, b) => b.count - a.count);
    node.children.push(child);
  }
  node.children.sort((a, b) => b.count - a.count);
  tree.genres.push(node);
}

// 卡片歸屬只保留樹上真的存在的節點（低於門檻的節點被剪掉）
const live = new Set();
for (const g of tree.genres) for (const c of g.children) {
  live.add(`${g.id}/${c.id}`);
  for (const gc of c.children) live.add(`${g.id}/${c.id}/${gc.id}`);
}
const cardMap = {};
let covered = 0;
for (const [k, paths] of assign) {
  const keep = paths.filter(p => live.has(p));
  if (keep.length) { cardMap[k] = keep; covered++; }
}

// ── 報告 ──────────────────────────────────────────────────────────────
console.log(`\n卡池 ${cards.length} 張｜有標籤 ${cards.filter(c => c.tags.length).length}｜`
  + `步驟1 規則命中 ${step1}｜步驟2 同藝人傳播 +${step2}｜剪枝後覆蓋 ${covered}`
  + ` (${(covered / cards.length * 100).toFixed(1)}%)`);
console.log(`節點門檻 ${MIN_NODE} 張\n`);
for (const g of tree.genres) {
  console.log(`[${g.zh} ${g.id}] 主類型 ${g.count} 張，第二層 ${g.children.length} 個節點`);
  for (const c of g.children) {
    const l3 = c.children.length ? '  └ ' + c.children.map(x => `${x.zh}(${x.count})`).join('、') : '';
    console.log(`   ${c.zh.padEnd(16)} ${String(c.count).padStart(4)}${l3}`);
  }
  if (!g.children.length) console.log('   （無節點達門檻，此類只有一層）');
}
const missing = {};
for (const c of cards) if (!cardMap[`${c.artist}|${c.album}`]) missing[c.prim] = (missing[c.prim] || 0) + 1;
console.log('\n未落位（需補標）:', JSON.stringify(missing));

if (WRITE) {
  fs.writeFileSync(path.join(ROOT, 'genre-tree.json'), JSON.stringify(tree, null, 1) + '\n', 'utf8');
  fs.writeFileSync(path.join(ROOT, 'card-subgenres.json'), JSON.stringify(cardMap) + '\n', 'utf8');
  console.log('\n已寫出 genre-tree.json 與 card-subgenres.json');
} else {
  console.log('\n(未加 --write，未寫檔)');
}
