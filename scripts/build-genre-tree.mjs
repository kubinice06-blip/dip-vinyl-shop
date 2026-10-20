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
// - 第三層只在資料撐得住的桶生成（門檻同第二層：節點卡數 ≥ MIN_NODE；定義可帶 min 覆寫）。
// - 搖滾兩個「非標籤」的第三層（2026-10-18 店主指示）：老搖滾依卡片年份分年代；
//   日亞搖滾依藝人國別分（rock-asia-country-map.json，由 build-asia-country-map.mjs 維護）。
//   日亞搖滾是地區不是風格：亞洲藝人不論落在哪個風格桶，都另外掛進日亞搖滾（多重歸屬）。
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

// 日亞搖滾第三層＝國別。店主點名台／日／韓／中／泰／越「等等」，所以門檻放到 1 張：
// 卡少的國家照樣開門，讓人看得到卡池在哪裡還很薄。順序由建樹時依張數排。
const ASIA_COUNTRIES = {
  tw: '台灣', jp: '日本', kr: '韓國', cn: '中國', hk: '香港', th: '泰國', vn: '越南',
  id: '印尼', ph: '菲律賓', my: '馬來西亞', sg: '新加坡', kh: '柬埔寨', pk: '巴基斯坦', in: '印度', mn: '蒙古', bd: '孟加拉', np: '尼泊爾',
};
const asiaChildren = Object.fromEntries(Object.entries(ASIA_COUNTRIES).map(([cc, zh]) => [cc, { zh, min: 1 }]));

const RULES = {
  // 搖滾第二層走藝人級對照（rock-subgenre-map.json）＋ ROCK_FALLBACK，此處只列中文名與第三層
  rock: {
    // 老搖滾第三層依卡片年份（seed 第 7 欄）分年代，不看標籤。90 年代之後是老牌藝人的晚期作品，
    // 另成一桶，才不會從選單上消失。
    classic: { zh: '老搖滾', children: {
      '50s': { zh: '50 年代', years: [1950, 1959], min: 10 },
      '60s': { zh: '60 年代', years: [1960, 1969] },
      '70s': { zh: '70 年代', years: [1970, 1979] },
      '80s': { zh: '80 年代', years: [1980, 1989] },
      later: { zh: '90 年代之後', years: [1990, 9999] },
    } },
    'psych-prog': { zh: '迷幻前衛', children: {
      krautrock: { zh: 'Krautrock', re: /^(krautrock|kraut|kraut rock)$/ },
      symphonic: { zh: '交響前衛', re: /^(symphonic prog|symphonic rock|italian progressive rock|neo-prog|rock progressivo italiano)$/ },
      prog: { zh: '前衛搖滾', re: /^(progressive rock|prog|symphonic prog|symphonic rock|canterbury scene)$/ },
      psych: { zh: '迷幻搖滾', re: /^(psychedelic rock|psychedelic|acid rock|neo-psychedelia)$/ },
      'space-rock': { zh: '太空搖滾', re: /^space rock$/ },
      'art-rock': { zh: '藝術搖滾', re: /^art rock$/ },
    } },
    'punk-wave': { zh: '龐克新浪潮', children: {
      punk: { zh: '龐克', re: /^(punk|punk rock|oi!|ska punk|anarcho-punk|art punk|garage punk|street punk)$/ },
      hardcore: { zh: '硬蕊', re: /^(hardcore punk|hardcore|nyhc|post-hardcore|melodic hardcore|crust|crust punk|d-beat|powerviolence|thrashcore|screamo)$/ },
      'pop-punk': { zh: 'Pop Punk / Emo', re: /^(pop punk|skate punk|emo|midwest emo|melodic punk|emo pop)$/ },
      garage: { zh: '車庫與原型龐克', re: /^(garage rock|garage punk|proto-punk|garage)$/ },
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
    'indie-alt': { zh: '獨立另類', children: {
      'indie-rock': { zh: '獨立搖滾', re: /^(indie rock|slacker rock|college rock|garage rock)$/ },
      'alt-rock': { zh: '另類搖滾與油漬', re: /^(alternative rock|grunge|post-grunge|alternative metal)$/ },
      britpop: { zh: 'Britpop', re: /^(britpop|madchester|baggy)$/ },
      'indie-pop': { zh: '獨立流行', re: /^(indie pop|jangle pop|twee pop|chamber pop|dream pop|noise pop)$/ },
      emo: { zh: 'Emo / 後硬蕊', re: /^(emo|midwest emo|post-hardcore|screamo|pop punk)$/ },
      'lo-fi': { zh: 'Lo-fi', re: /^(lo-fi|lo fi|bedroom pop|slacker rock)$/ },
      'art-exp': { zh: '藝術與實驗', re: /^(art rock|experimental rock|noise rock|math rock|post-punk)$/ },
      'neo-psych': { zh: '新迷幻', re: /^(neo-psychedelia|psychedelic|psychedelic rock|psychedelic pop)$/ },
      'folk-side': { zh: '民謠與創作歌手', re: /^(indie folk|folk rock|singer-songwriter|alt-country)$/ },
    } },
    'dream-post': { zh: '音牆後搖', children: {
      shoegaze: { zh: '瞪鞋', re: /^(shoegaze|noise pop)$/ },
      'dream-pop': { zh: '夢幻流行', re: /^dream pop$/ },
      'post-rock': { zh: '後搖滾', re: /^(post-rock|post rock)$/ },
      slowcore: { zh: '慢核', re: /^(slowcore|sadcore)$/ },
    } },
    'jrock-asia': { zh: '日亞搖滾', children: asiaChildren },
    'roots-other': { zh: '根源其他', children: {
      'soft-rock': { zh: '軟搖滾 / AOR', re: /^(soft rock|soft-rock|yacht rock|aor|album rock|easy listening|adult contemporary)$/ },
      roots: { zh: '根源與藍調搖滾', re: /^(roots rock|southern rock|blues rock|blues-rock|americana|rhythm and blues|heartland rock)$/ },
    } },
  },

  jazz: {
    bop: { zh: 'Bebop / Hard Bop', re: /^(bebop|bop|hard bop|hardbop|post-bop|post bop)$/, children: {
      'hard-bop': { zh: 'Hard Bop', re: /^(hard bop|hardbop)$/ },
      bebop: { zh: 'Bebop', re: /^(bebop|bop)$/ },
      'post-bop': { zh: 'Post-Bop / 現代爵士', re: /^(post-bop|post bop|modern jazz|modernjazz)$/ },
      piano: { zh: '鋼琴', re: /^(jazz piano|piano jazz|piano trio|jazz trio)$/ },
      sax: { zh: '薩克斯風', re: /^(jazz saxophone|tenor sax|sax|alto sax|alto saxophone|saxophone jazz)$/ },
      'blue-note': { zh: 'Blue Note 廠牌', re: /^(blue note|blue note records)$/ },
    } },
    cool: { zh: 'Cool / 西岸', re: /^(cool jazz|west coast jazz)$/ },
    modal: { zh: 'Modal / 靈性爵士', re: /^(modal jazz|modal|spiritual jazz)$/, children: {
      spiritual: { zh: '靈性爵士', re: /^(spiritual jazz|spiritual|strata-east|african|south africa)$/ },
      modal: { zh: 'Modal', re: /^(modal jazz|modal|post-bop|hard bop)$/ },
    } },
    free: { zh: '自由與前衛', re: /^(free jazz|avant-garde jazz|free improvisation|avantgarde|avant-garde)$/, children: {
      'free-improv': { zh: '自由即興', re: /^(free improvisation|improvisation|improv|improvised|improvised music|eai)$/ },
      spiritual: { zh: '靈性與 Modal', re: /^(spiritual jazz|spiritual|modal jazz)$/ },
      avant: { zh: '前衛與 New Thing', re: /^(avant-garde jazz|avant-jazz|avant-garde|new thing|aacm|harmolodic|avantgarde)$/ },
      euro: { zh: '歐陸自由爵士', re: /^(ecm|polish jazz|polish|european free jazz|european jazz|fmp)$/ },
      'post-bop': { zh: '偏 Post-Bop', re: /^(post-bop|post bop|hard bop)$/ },
      fusion: { zh: '偏 Fusion', re: /^(jazz fusion|fusion|jazz-funk)$/ },
    } },
    fusion: { zh: 'Fusion / Jazz-Funk', re: /^(fusion|jazz fusion|jazz-funk|jazz funk|jazz rock)$/, children: {
      'jazz-funk': { zh: 'Jazz-Funk', re: /^(jazz-funk|jazz funk|funk)$/ },
      'jazz-rock': { zh: 'Jazz-Rock', re: /^(jazz rock|jazz-rock|progressive rock|canterbury scene)$/ },
      smooth: { zh: 'Smooth / 當代', re: /^(smooth jazz|contemporary jazz)$/ },
      'acid-nu': { zh: 'Acid / Nu Jazz', re: /^(acid jazz|nu jazz|nu-jazz)$/ },
      japan: { zh: '日本 Fusion', re: /^(asian music|asian pop|j-pop|jpop|japanese jazz|j-jazz|j-fusion|japanese fusion)$/ },
      guitar: { zh: '吉他', re: /^(jazz guitar|guitar virtuoso|guitar jazz)$/ },
      latin: { zh: '拉丁與非洲', re: /^(latin|latin jazz|afrobeat|brazilian jazz|world jazz)$/ },
    } },
    vocal: { zh: '人聲爵士', re: /^(vocal jazz|jazz vocal)$/ },
    swing: { zh: 'Swing / 大樂團', re: /^(swing|big band|dixieland|trad jazz)$/, children: {
      'big-band': { zh: '大樂團', re: /^(big band|jazz orchestra|orchestra)$/ },
      dixieland: { zh: 'Dixieland / 紐奧良', re: /^(dixieland|new orleans jazz|new orleans|trad jazz|traditional jazz|classic jazz|clarinet)$/ },
      vocal: { zh: '人聲與標準曲', re: /^(vocal jazz|jazz vocal|standards|traditional pop|easy listening)$/ },
      piano: { zh: '鋼琴', re: /^(jazz piano|piano jazz|stride|boogie woogie)$/ },
    } },
    latin: { zh: '拉丁與巴莎', re: /^(latin jazz|bossa nova|afro-cuban jazz|brazilian jazz)$/, children: {
      bossa: { zh: 'Bossa / 巴西', re: /^(bossa nova|bossa|mpb|samba|brazil|brasil|brazilian jazz|samba-jazz|samba jazz|tropicalia|tropicália)$/ },
      'afro-cuban': { zh: 'Afro-Cuban / 拉丁', re: /^(latin jazz|latin-jazz|afro-cuban jazz|cuban jazz|cuba|cuban|salsa|mambo|afro-cuban)$/ },
    } },
    ecm: { zh: 'ECM / 歐陸', re: /^(ecm|european jazz|nordic jazz|scandinavian jazz|chamber jazz)$/ },
    'soul-jazz': { zh: 'Soul Jazz / 管風琴', re: /^(soul jazz|soul-jazz|organ jazz|groove)$/, children: {
      organ: { zh: '管風琴', re: /^(organ|hammond|hammond organ|jazz organ|organ jazz|b3)$/ },
      groove: { zh: 'Groove / Jazz-Funk', re: /^(groove|jazz-funk|jazz funk|funk|acid jazz|boogaloo)$/ },
    } },
    contemporary: { zh: '當代與 Nu Jazz', re: /^(contemporary jazz|nu jazz|nu-jazz|acid jazz|smooth jazz)$/, children: {
      smooth: { zh: 'Smooth / Lounge', re: /^(smooth jazz|chillout|lounge|downtempo)$/ },
      'nu-jazz': { zh: 'Nu / Acid Jazz', re: /^(nu jazz|nu-jazz|acid jazz|jazz-funk|jazz funk|funk|rnb)$/ },
      euro: { zh: 'ECM / 歐陸', re: /^(ecm|polish jazz|polish|european jazz|nordic jazz|scandinavian jazz)$/ },
      vocal: { zh: '人聲', re: /^(vocal jazz|jazz vocal|vocal)$/ },
      piano: { zh: '鋼琴', re: /^(jazz piano|piano jazz|piano trio)$/ },
      'post-bop': { zh: '偏 Post-Bop', re: /^(post-bop|post bop|hard bop|bebop|modern jazz)$/ },
      free: { zh: '偏前衛', re: /^(free jazz|avant-garde jazz|avant-garde)$/ },
      world: { zh: '世界與靈性', re: /^(world jazz|latin jazz|afrobeat|spiritual jazz)$/ },
    } },
    'jp-jazz': { zh: '日本爵士', re: /^(japanese jazz|j-jazz|和ジャズ)$/ },
  },

  electronic: {
    ambient: { zh: 'Ambient / Drone', re: /^(ambient|drone|dark ambient|ambient techno|space music)$/, children: {
      'ambient-techno': { zh: 'Ambient Techno / Dub', re: /^(ambient techno|ambient dub|dub techno)$/ },
      drone: { zh: 'Drone', re: /^(drone|drone ambient|space ambient|space music)$/ },
      'dark-ambient': { zh: 'Dark Ambient', re: /^(dark ambient|post-industrial|ritual ambient)$/ },
      'new-age': { zh: 'New Age', re: /^(new age|healing|meditation|kankyo ongaku|environmental music)$/ },
      neoclassical: { zh: '偏現代古典', re: /^(modern classical|neoclassical|neo-classical|contemporary classical|post-classical|minimalism)$/ },
      idm: { zh: '偏 IDM', re: /^(idm|glitch|braindance)$/ },
    } },
    techno: { zh: 'Techno', re: /^(techno|minimal techno|detroit techno|minimal|acid techno)$/, children: {
      detroit: { zh: 'Detroit', re: /^(detroit techno|detroit|detroit house)$/ },
      minimal: { zh: 'Minimal', re: /^(minimal techno|minimal|microhouse|minimal house)$/ },
      'dub-techno': { zh: 'Dub Techno', re: /^(dub techno|ambient dub|basic channel)$/ },
      acid: { zh: 'Acid', re: /^(acid|acid techno|acid house|303)$/ },
      'ambient-techno': { zh: 'Ambient Techno', re: /^(ambient techno|ambient)$/ },
      electro: { zh: 'Electro', re: /^(electro|electro-funk|electro funk|electro techno)$/ },
      'tech-house': { zh: 'Tech House', re: /^(tech house|tech-house|progressive house)$/ },
      hard: { zh: 'Hard / Rave / Industrial', re: /^(rave|hardcore techno|gabber|hard techno|schranz|industrial techno|industrial|hardcore)$/ , min: 12 },
    } },
    house: { zh: 'House', re: /^(house|deep house|acid house|chicago house|tech house)$/, children: {
      deep: { zh: 'Deep House', re: /^(deep house|deep-house)$/ },
      acid: { zh: 'Acid House', re: /^(acid house|acid|acid techno)$/ },
      chicago: { zh: 'Chicago', re: /^(chicago house|chicago|classic house)$/ },
      detroit: { zh: 'Detroit', re: /^(detroit techno|detroit|detroit house)$/ },
      tech: { zh: 'Tech House', re: /^(tech house|tech-house|minimal|microhouse|minimal techno)$/ },
      progressive: { zh: 'Progressive / Electro House', re: /^(progressive house|electro house|edm|big room)$/ },
      garage: { zh: 'UK Garage', re: /^(uk garage|future garage|garage|2-step|2 step|speed garage|uk funky)$/, min: 12 },
      french: { zh: 'French / Disco House', re: /^(french house|disco house|filter house|funky house|nu-disco|nu disco)$/, min: 12 },
    } },
    idm: { zh: 'IDM / Glitch', re: /^(idm|glitch|braindance|intelligent dance music)$/, children: {
      glitch: { zh: 'Glitch / Microsound', re: /^(glitch|microsound|clicks and cuts|clicks n cuts|raster-noton)$/ },
      warp: { zh: 'Warp / Braindance', re: /^(warp|braindance|rephlex|intelligent dance music)$/ },
      breakcore: { zh: 'Breakcore / Drill n Bass', re: /^(breakcore|drill and bass|drill n bass|drill'n'bass)$/ },
      'ambient-idm': { zh: 'Ambient IDM', re: /^(ambient techno|ambient|ambient dub)$/ },
      'glitch-hop': { zh: 'Glitch Hop / Folktronica', re: /^(glitch hop|glitch-hop|folktronica|indietronica)$/, min: 12 },
    } },
    synth: { zh: 'Synthpop / Electro', re: /^(synthpop|electropop|synth pop|electro|italo disco)$/, children: {
      synthpop: { zh: 'Synthpop', re: /^(synthpop|synth pop|synth-pop|new romantic|minimal synth)$/ },
      electropop: { zh: 'Electropop / Dance', re: /^(electropop|dance-pop|dance pop|edm|electro pop)$/ },
      electro: { zh: 'Electro / Electroclash', re: /^(electro|electroclash|electro house|electro-funk)$/ },
      'new-wave': { zh: 'New Wave', re: /^(new wave|post-punk|new romantic)$/ },
      synthwave: { zh: 'Synthwave / Italo', re: /^(synthwave|outrun|retrowave|italo disco|italo|italo-disco)$/ },
      indietronica: { zh: 'Indietronica', re: /^(indietronica|alternative dance|chillwave|dream pop)$/ },
      techno: { zh: '偏 Techno', re: /^(techno|detroit techno|house|deep house)$/ },
    } },
    industrial: { zh: 'Industrial / EBM', re: /^(industrial|ebm|power electronics)$/, children: {
      ebm: { zh: 'EBM / Electro-Industrial', re: /^(ebm|electro-industrial|old school ebm|dark electro|electro industrial)$/ },
      'power-electronics': { zh: 'Power Electronics / 噪音', re: /^(power electronics|harsh noise|death industrial|japanoise|noise)$/ },
      'industrial-rock': { zh: 'Industrial Rock / Metal', re: /^(industrial rock|industrial metal)$/, min: 12 },
      'dark-ambient': { zh: 'Dark Ambient / Post-Industrial', re: /^(dark ambient|post-industrial|ambient)$/ },
      'old-school': { zh: '老派工業', re: /^(old school industrial|post-punk|new wave|avant-garde)$/ },
    } },
    downtempo: { zh: 'Trip-hop / Downtempo', re: /^(trip-hop|trip hop|downtempo|chillout|chillwave)$/, children: {
      'trip-hop': { zh: 'Trip-hop', re: /^(trip-hop|trip hop|triphop|bristol)$/ },
      chillout: { zh: 'Chillout / Lounge', re: /^(chillout|lounge|chill-out|chill out|balearic)$/ },
      'nu-jazz': { zh: 'Nu Jazz / Acid Jazz', re: /^(acid jazz|nu jazz|nu-jazz|jazz-funk)$/ },
      chillwave: { zh: 'Chillwave / Synthwave', re: /^(chillwave|synthwave|vaporwave)$/ },
      beats: { zh: 'Instrumental Hip-hop / Beats', re: /^(instrumental hip-hop|instrumental hip hop|beats|lo-fi hip hop|lofi hip hop|chillhop|abstract hip hop|ninja tune)$/ },
      folktronica: { zh: 'Folktronica / Indietronica', re: /^(folktronica|indietronica|ambient pop|dream pop)$/, min: 12 },
      ambient: { zh: '偏 Ambient', re: /^(ambient|ambient techno|new age)$/ },
    } },
    bass: { zh: 'Dub / Bass', re: /^(dubstep|uk garage|jungle|drum and bass|dnb|breakbeat|dub techno|dub)$/, children: {
      dubstep: { zh: 'Dubstep / UK Bass', re: /^(dubstep|future garage|post-dubstep|uk bass|uk garage|garage|2-step|2 step|bass)$/ },
      dnb: { zh: 'Drum & Bass / Jungle', re: /^(drum and bass|drum n bass|dnb|drum'n'bass|drum & bass|jungle|liquid funk|liquid dnb|neurofunk|ragga jungle)$/ },
      dub: { zh: 'Dub / Dub Techno', re: /^(dub|dub techno|ambient dub|roots reggae|reggae)$/ },
      breakbeat: { zh: 'Breakbeat / Big Beat', re: /^(breakbeat|big beat|breaks|rave|nu skool breaks)$/ },
    } },
    noise: { zh: '實驗與噪音', re: /^(noise|musique concrete|sound collage|plunderphonics|lowercase)$/, children: {
      harsh: { zh: 'Harsh Noise / 日本噪音', re: /^(harsh noise|power electronics|japanoise|death industrial|noise)$/ },
      concrete: { zh: '具象音樂與拼貼', re: /^(musique concrete|musique concrète|electroacoustic|tape music|sound collage|plunderphonics|field recordings|acousmatic)$/ },
      drone: { zh: 'Drone / Dark Ambient', re: /^(drone|dark ambient|ambient)$/ },
      glitch: { zh: 'Glitch / Microsound', re: /^(glitch|microsound|idm)$/ },
    } },
    'nu-disco': { zh: 'Disco / Nu-Disco', re: /^(disco|nu-disco|disco house|french house)$/ },
    trance: { zh: 'Trance / Goa', re: /^(trance|psytrance|psy-trance|psychedelic trance|goa|goa trance|progressive trance|uplifting trance|hard trance)$/, children: {
      psy: { zh: 'Psy / Goa', re: /^(psytrance|psy-trance|goa|goa trance|psychedelic trance|psychill|psybient|psychedelic)$/, min: 12 },
      progressive: { zh: 'Progressive / Uplifting', re: /^(progressive trance|progressive house|progressive|uplifting trance|vocal trance|melodic trance)$/, min: 12 },
    } },
    'jp-electronic': { zh: '日系電子', re: /^(city pop|japanese electronic|kankyo ongaku|environmental music)$/ },
  },

  soul: {
    funk: { zh: 'Funk / P-Funk', re: /^(funk|p-funk|jazz-funk|funk rock|deep funk)$/, children: {
      'p-funk': { zh: 'P-Funk / Funk Rock', re: /^(p-funk|p funk|funk rock|funk-rock|psychedelic funk|psychedelic soul)$/ },
      'jazz-funk': { zh: 'Jazz-Funk / Fusion', re: /^(jazz-funk|jazz funk|fusion|jazz fusion)$/ },
      'disco-funk': { zh: 'Disco Funk / Boogie', re: /^(disco|disco funk|disco-funk|boogie|boogie funk|post-disco)$/ },
      'synth-funk': { zh: '80s Synth Funk', re: /^(80s funk|electro funk|electro-funk|synth funk|synth-funk|new jack swing)$/ },
      'afro-funk': { zh: 'Afro-Funk / Deep Funk', re: /^(deep funk|rare groove|afrobeat|afro-funk|afro funk|afro-beat)$/ },
      'soul-side': { zh: '偏靈魂樂', re: /^(motown|southern soul|stax|smooth soul|philly soul|quiet storm|neo-soul|neo soul|gospel)$/ },
    } },
    motown: { zh: 'Motown / Northern', re: /^(motown|northern soul)$/ },
    southern: { zh: 'Southern / Stax', re: /^(southern soul|stax|deep soul|memphis soul|muscle shoals)$/ },
    philly: { zh: 'Philly / Quiet Storm', re: /^(philly soul|smooth soul|quiet storm)$/ },
    disco: { zh: 'Disco / Boogie', re: /^(disco|boogie|post-disco)$/ },
    'classic-rnb': { zh: '經典 R&B / Doo-wop', re: /^(rhythm and blues|rnb|r&b|doo-wop|doo wop)$/, children: {
      southern: { zh: 'Southern / Stax / Deep', re: /^(southern soul|stax|deep soul|memphis soul|muscle shoals|hi records)$/ },
      motown: { zh: 'Motown / Northern', re: /^(motown|northern soul|motown sound)$/ },
      'doo-wop': { zh: '50s R&B / Doo-wop', re: /^(doo-wop|doo wop|vocal group|girl groups|girl group|jump blues|new orleans r&b|new orleans rnb|rock and roll|rock n roll)$/, min: 12 },
      gospel: { zh: 'Gospel', re: /^(gospel|southern gospel|black gospel|gospel soul)$/ },
      smooth: { zh: 'Smooth / Philly / Quiet Storm', re: /^(smooth soul|quiet storm|philly soul|slow jams|pop soul|pop-soul)$/ },
      'neo-contemporary': { zh: 'Neo-Soul / 當代', re: /^(neo-soul|neo soul|contemporary rnb|new jack swing|urban)$/ },
      chicago: { zh: 'Chicago Soul', re: /^(chicago soul|chicago)$/, min: 12 },
      funk: { zh: '偏 Funk', re: /^(funk|disco|p-funk|jazz-funk)$/ },
    } },
    'neo-soul': { zh: 'Neo-Soul', re: /^(neo-soul|neo soul)$/ },
    gospel: { zh: 'Gospel', re: /^(gospel|spirituals)$/ },
    'psych-soul': { zh: '迷幻靈魂', re: /^psychedelic soul$/ },
  },

  hiphop: {
    'east-coast': { zh: '東岸 / Boom Bap', re: /^(east coast rap|east coast hip hop|boom bap|hardcore hip hop|new york rap)$/, children: {
      'boom-bap': { zh: 'Boom Bap / 黃金年代', re: /^(boom bap|golden age|old school|old school rap|old school hip hop|old school hip-hop|golden age hip hop)$/ },
      hardcore: { zh: 'Hardcore / Gangsta', re: /^(hardcore hip hop|hardcore rap|hardcore hip-hop|gangsta rap|mafioso rap|horrorcore)$/ },
      'jazz-rap': { zh: 'Jazz Rap / Conscious', re: /^(jazz rap|jazz hop|conscious hip hop|political hip hop|alternative hip-hop|alternative rap)$/ },
      abstract: { zh: '抽象與地下', re: /^(experimental hip hop|abstract hip hop|experimental hip-hop|abstract hip-hop|underground hip-hop|underground rap|industrial hip hop|drumless|glitch hop)$/ },
    } },
    'west-coast': { zh: '西岸 / G-Funk', re: /^(west coast rap|west coast hip hop|g-funk|g funk)$/ },
    south: { zh: '南方 / Trap', re: /^(dirty south|southern rap|southern hip hop|trap|memphis rap)$/, children: {
      trap: { zh: 'Trap / Drill', re: /^(trap|trap rap|drill|plugg|rage)$/ },
      'dirty-south': { zh: 'Dirty South / Crunk', re: /^(dirty south|southern rap|southern hip hop|southern hip-hop|crunk|snap|atlanta|houston|texas)$/ },
      memphis: { zh: 'Memphis / Horrorcore', re: /^(memphis rap|memphis|horrorcore|phonk)$/, min: 12 },
      'new-orleans': { zh: 'New Orleans / Bounce', re: /^(new orleans|bounce|cash money|no limit|louisiana)$/, min: 12 },
      cloud: { zh: 'Cloud / Emo Rap', re: /^(cloud rap|emo rap|sad rap)$/ },
    } },
    underground: { zh: '地下與抽象', re: /^(underground hip-hop|underground rap|abstract hip hop|experimental hip hop|art rap)$/, children: {
      abstract: { zh: '抽象與實驗', re: /^(abstract hip hop|abstract hip-hop|experimental hip hop|experimental hip-hop|art rap)$/ },
      instrumental: { zh: 'Instrumental / Beats', re: /^(instrumental hip-hop|instrumental hip hop|beats|drumless|lo-fi hip hop|lofi hip hop|chillhop|glitch hop|trip-hop|trip hop)$/ },
      industrial: { zh: 'Industrial / Noise Rap', re: /^(industrial hip hop|industrial hip-hop|noise rap|horrorcore|punk rap)$/, min: 12 },
      cloud: { zh: 'Cloud / Emo Rap', re: /^(cloud rap|emo rap|plugg|phonk)$/, min: 12 },
      'east-coast': { zh: '東岸地下', re: /^(east coast rap|east coast hip hop|east coast|hardcore hip hop|boom bap|new york)$/ },
      'jazz-rap': { zh: 'Jazz Rap / Conscious', re: /^(jazz rap|conscious hip hop|alternative hip-hop|alternative rap|political hip hop)$/ },
    } },
    conscious: { zh: 'Jazz Rap / Conscious', re: /^(jazz rap|conscious hip hop|alternative hip-hop|alternative rap)$/, children: {
      'jazz-rap': { zh: 'Jazz Rap', re: /^(jazz rap|jazz hop|jazz-rap)$/ },
      conscious: { zh: 'Conscious / Political', re: /^(conscious hip hop|conscious hip-hop|political hip hop|political|afrocentric)$/ },
      alternative: { zh: 'Alternative Hip-hop', re: /^(alternative hip-hop|alternative rap|alternative hip hop|alt hip hop)$/ },
      'neo-soul': { zh: '偏 Neo-Soul', re: /^(neo-soul|neo soul|rnb|funk)$/, min: 12 },
    } },
    gangsta: { zh: 'Gangsta', re: /^(gangsta rap|hardcore rap|mafioso rap)$/, children: {
      west: { zh: '西岸 / G-Funk', re: /^(west coast rap|west coast|west coast hip hop|g-funk|g funk|compton|los angeles)$/ },
      east: { zh: '東岸 / Hardcore', re: /^(east coast rap|east coast|east coast hip hop|hardcore rap|hardcore hip hop|boom bap|mafioso rap|new york)$/ },
      south: { zh: '南方 / Trap', re: /^(southern rap|dirty south|southern hip hop|southern hip-hop|new orleans|memphis rap|memphis|trap|drill|horrorcore|houston|texas)$/ },
    } },
    rnb: { zh: '當代 R&B', re: /^(contemporary rnb|alternative rnb|alt rnb|neo-soul|neo soul|rnb)$/, children: {
      contemporary: { zh: '當代 R&B / 90s', re: /^(contemporary rnb|90s rnb|new jack swing|slow jams|urban|r and b)$/ },
      alt: { zh: 'Alternative R&B', re: /^(alternative rnb|alt rnb|alt-rnb|art pop|psychedelic soul|pbr&b)$/ },
      'neo-soul': { zh: 'Neo-Soul', re: /^(neo-soul|neo soul|neosoul)$/ },
      asia: { zh: '日韓華 R&B', re: /^(j-urban|jpop|j-pop|k-pop|kpop|krnb|k-rnb|k-r&b|c-pop|cpop|mandopop)$/, min: 12 },
      'hiphop-side': { zh: '偏嘻哈', re: /^(trap|jazz rap|pop rap|conscious hip hop|southern hip hop|hip-hop soul)$/ },
    } },
    'pop-rap': { zh: 'Pop Rap', re: /^(pop rap|pop rnb)$/ },
    'uk-euro': { zh: '英國與歐陸', re: /^(grime|uk rap|uk hip hop|uk hip-hop|british hip hop|uk drill|road rap|french hip hop|french rap|rap francais|rap français)$/, children: {
      uk: { zh: '英國 Grime / Drill', re: /^(grime|uk grime|uk rap|uk hip hop|uk hip-hop|british hip hop|english hip hop|uk drill|road rap|uk garage|london)$/, min: 12 },
      french: { zh: '法語嘻哈', re: /^(french rap|french hip-hop|french hip hop|rap francais|rap français|belgian hip hop)$/, min: 10 },
    } },
    'asia-rap': { zh: '亞洲嘻哈', re: /^(japanese hip-hop|japanese hip hop|j-rap|jrap|k-hip hop|korean hip hop|k-rap|taiwanese hip hop|mandarin rap|c-rap|chinese hip hop)$/, children: {
      jp: { zh: '日本', re: /^(japanese hip-hop|japanese hip hop|j-hiphop|j-hip hop|j-rap|jrap|japanese rap|j-pop|jpop)$/, min: 10 },
      kr: { zh: '韓國', re: /^(k-pop|kpop|k-hiphop|korean hip-hop|korean hip hop|k-hip hop|k-rap|khh|korean)$/, min: 10 },
      'tw-cn': { zh: '台灣與華語', re: /^(c-rap|taiwanese hip hop|taiwanese hip-hop|mandarin hip hop|mandarin rap|chinese hip hop|cpop|c-pop|made in taichung|mj116)$/, min: 8 },
    } },
  },

  folk: {
    country: { zh: '鄉村', re: /^(classic country|outlaw country|country pop|honky tonk)$/, children: {
      classic: { zh: '經典與 Outlaw', re: /^(classic country|traditional country|honky tonk|honky-tonk|bakersfield sound|nashville sound|outlaw country|countrypolitan)$/ },
      modern: { zh: '當代與流行鄉村', re: /^(country pop|modern country|contemporary country|pop country|country-pop|90s country|late 90s country|80s country)$/ },
      americana: { zh: '偏 Americana', re: /^(americana|alt-country|country rock|progressive country|country soul)$/ },
    } },
    americana: { zh: 'Americana / Alt-Country', re: /^(americana|alt-country|alternative country|country rock)$/, children: {
      'alt-country': { zh: 'Alt-Country', re: /^(alt-country|alt country|alternative country|cowpunk|gothic country)$/ },
      bluegrass: { zh: 'Bluegrass / 老時光', re: /^(bluegrass|banjo|progressive bluegrass|old time|old-time|appalachian|mandolin)$/ },
      'country-rock': { zh: 'Country Rock / 根源搖滾', re: /^(country rock|roots rock|heartland rock|southern rock)$/ },
      'classic-country': { zh: '經典鄉村', re: /^(classic country|outlaw country|honky tonk|traditional country|progressive country)$/ },
      indie: { zh: '偏獨立民謠', re: /^(indie folk|indie rock|lo-fi|chamber folk)$/ },
    } },
    british: { zh: '英倫與凱爾特', re: /^(british folk|celtic|traditional folk|folk revival|irish folk)$/, children: {
      celtic: { zh: '凱爾特 / 愛爾蘭 / 蘇格蘭', re: /^(celtic|irish|irish folk|celtic folk|scottish|scottish folk|ireland|scotland|celtic fusion)$/ },
      english: { zh: '英格蘭傳統', re: /^(english folk|british folk|english|england|traditional folk|folk revival|sea shanties|trad)$/ },
      'folk-rock': { zh: '英倫民謠搖滾', re: /^(folk rock|folk-rock|british folk-rock|british folk rock|progressive folk|psychedelic folk|electric folk)$/ },
    } },
    'psych-folk': { zh: '迷幻與怪奇民謠', re: /^(psychedelic folk|freak folk|acid folk|psych folk)$/, children: {
      freak: { zh: 'Freak Folk / New Weird America', re: /^(freak folk|new weird america|free folk|avant-folk|experimental folk|avant folk)$/ },
      dark: { zh: 'Neofolk / Dark Folk', re: /^(neofolk|neo-folk|dark folk|apocalyptic folk|apocalyptic|drone)$/, min: 12 },
      prog: { zh: '前衛民謠', re: /^(progressive folk|progressive rock|folk rock)$/ },
      british: { zh: '英倫迷幻', re: /^(british folk|scottish|english folk|acid folk)$/, min: 12 },
    } },
    'indie-folk': { zh: '獨立與室內民謠', re: /^(indie folk|chamber folk|contemporary folk)$/, children: {
      chamber: { zh: 'Chamber / Baroque', re: /^(chamber folk|chamber pop|baroque pop|art pop)$/ },
      contemporary: { zh: '當代民謠', re: /^(contemporary folk|folk pop|modern folk)$/ },
      americana: { zh: '偏 Americana', re: /^(americana|alt-country)$/ },
      psych: { zh: '偏迷幻', re: /^(psychedelic folk|freak folk|psychedelic|new weird america|avant-folk|progressive folk)$/ },
      'lo-fi': { zh: 'Lo-fi / Slowcore', re: /^(lo-fi|slowcore|bedroom pop|bedroom)$/, min: 12 },
    } },
    bluegrass: { zh: 'Bluegrass', re: /^(bluegrass|old time|appalachian)$/ },
    'folk-rock': { zh: '民謠搖滾', re: /^(folk rock|progressive folk)$/, children: {
      british: { zh: '英倫', re: /^(british folk|english folk|british folk rock|british folk-rock|celtic|irish|scottish|england|ireland|electric folk)$/ },
      psych: { zh: '迷幻與前衛', re: /^(psychedelic folk|psychedelic|progressive folk|acid folk|freak folk|avant-folk)$/ },
      americana: { zh: 'Americana', re: /^(americana|alt-country|country rock|roots rock)$/ },
    } },
    songwriter: { zh: '創作歌手', re: /^(singer-songwriter|singer songwriter)$/, children: {
      americana: { zh: 'Americana / 鄉村', re: /^(americana|alt-country|country rock|outlaw country|classic country|bluegrass|country)$/ },
      'folk-rock': { zh: '民謠搖滾 / 軟搖滾', re: /^(folk rock|folk-rock|soft rock|classic rock)$/ },
      indie: { zh: '獨立與室內', re: /^(indie folk|chamber folk|contemporary folk|chamber pop|indie rock|indie pop|lo-fi|slowcore)$/ },
      psych: { zh: '迷幻', re: /^(psychedelic folk|freak folk|psychedelic|progressive folk|acid folk)$/ },
      british: { zh: '英倫', re: /^(british folk|english folk|celtic|irish|scottish)$/, min: 12 },
      latin: { zh: '拉丁美洲', re: /^(latin|nueva cancion|nueva canción|cantautor|trova|mpb|brazilian)$/, min: 12 },
      japan: { zh: '日本', re: /^(j-pop|jpop|okinawa|okinawan|japanese folk|kayokyoku|japanese singer-songwriter|j-folk)$/, min: 12 },
      'folk-pop': { zh: 'Folk Pop', re: /^(folk pop|pop folk|easy listening|adult contemporary|pop)$/, min: 12 },
    } },
    'tw-folk': { zh: '東亞民謠', re: /^(campus folk|taiwanese folk|mandarin folk|c-folk|japanese folk|min'yo|minyo|korean folk|shakuhachi|tsugaru shamisen)$/, min: 10 },
    'world-folk': { zh: '各地傳統民謠', re: /^(nueva cancion|nueva canción|gypsy|romani|klezmer|throat singing|kora|griot|fado|rebetiko|hawaiian|slack-key|slack key|sean-nós|joik|yoik|cante jondo)$/, children: {
      latin: { zh: '拉丁美洲新歌謠', re: /^(latin|nueva cancion|nueva canción|trova|nueva trova|cantautor|chile|chilean|cuba|cuban|argentina|argentinian|folklore argentino|latinoamerica|nueva cancion chilena|trova cubana|folklore)$/ },
      african: { zh: '非洲', re: /^(african|africa|mali|malian|kora|griot|pan-african|senegal)$/, min: 10 },
      gypsy: { zh: '吉普賽 / 巴爾幹 / Klezmer', re: /^(gypsy|balkan|romani|klezmer|romanian|yiddish|jewish)$/, min: 10 },
    } },
  },

  pop: {
    'jp-pop': { zh: '日本流行 / City Pop', re: /^(j-pop|jpop|city pop|japanese city pop|shibuya-kei|kayokyoku)$/, children: {
      'city-pop': { zh: 'City Pop / New Music', re: /^(city pop|japanese city pop|niagara|new music|70s-80s new music - rock|aor)$/ },
      kayokyoku: { zh: '歌謠曲 / 演歌 / 昭和', re: /^(enka|kayoukyoku|kayokyoku|50s-80s kayoukyoku-enka|showa|showa pop|mood kayo)$/ },
      idol: { zh: '偶像', re: /^(idol|idol pops|j-idol|akb48|boy groups|girl groups|girl group|idol pop)$/ },
      'singer-songwriter': { zh: '創作歌手', re: /^(singer-songwriter|japanese singer-songwriter|j-folk|female vocal)$/ },
      anime: { zh: '動畫與遊戲', re: /^(anime|game|soundtrack|ost|anison|game music)$/, min: 12 },
      'shibuya-kei': { zh: '澀谷系', re: /^(shibuya-kei|shibuya kei|neo-acoustic|neo acoustic)$/, min: 8 },
    } },
    'c-pop': { zh: '華語流行', re: /^(c-pop|cpop|cantopop|mandopop|canto-pop)$/, children: {
      cantopop: { zh: '粵語流行', re: /^(cantopop|canto-pop|hk-pop|hk pop|hk|hongkong|hong kong|cantonese)$/, min: 12 },
      mandopop: { zh: '國語流行', re: /^(mandopop|mandarin|chinese pop|china|shidaiqu|mandarin pop)$/, min: 12 },
    } },
    // t-pop 無標籤可依，靠 tw-pop-artists.json 從 c-pop 切出來
    't-pop': { zh: '台灣流行' },
    chanson: { zh: '法語香頌', re: /^(chanson|chanson francaise|chanson française|french pop|ye-ye|yé-yé|nouvelle chanson)$/, min: 10 },
    india: { zh: '印度與寶萊塢', re: /^(bollywood|filmi|playback singer|indian pop)$/ },
    'sea-pop': { zh: '東南亞流行', re: /^(dangdut|luk thung|molam|mor lam|keroncong|v-pop|opm|pinoy pop)$/ },
    'k-pop': { zh: '韓國流行', re: /^(k-pop|kpop)$/, children: {
      idol: { zh: '偶像團體', re: /^(girl group|girl groups|girlband|boyband|boy group|boy groups|idol|sm entertainment|yg|jyp|exo|exo-k|exo-m|bts|shinee|bigbang|seventeen|itzy|twice|blackpink|nct|red velvet)$/, min: 12 },
      ballad: { zh: '抒情與獨立', re: /^(ballad|k-ballad|ost|k-indie|k-rock|trot|korean ballad)$/, min: 10 },
    } },
    synth: { zh: '合成器流行', re: /^(synthpop|electropop|synth pop|dance-pop|dance pop)$/, children: {
      synthpop: { zh: '80s Synthpop / New Wave', re: /^(synthpop|synth pop|synth-pop|new wave|new romantic)$/ },
      'dance-pop': { zh: 'Dance Pop / Electropop', re: /^(dance-pop|dance pop|electropop|teen pop|edm|dancepop)$/ },
      indie: { zh: '偏獨立', re: /^(indie pop|indietronica|alt-pop|alternative pop|dream pop|art pop)$/ },
      asia: { zh: '日韓', re: /^(k-pop|kpop|j-pop|jpop)$/, min: 12 },
    } },
    'art-pop': { zh: '藝術流行', re: /^(art pop|baroque pop|chamber pop|psychedelic pop|sophisti-pop)$/, children: {
      baroque: { zh: 'Baroque / Chamber / Sunshine', re: /^(baroque pop|chamber pop|sunshine pop|psychedelic pop|progressive pop)$/ },
      sophisti: { zh: 'Sophisti-pop / New Wave', re: /^(sophisti-pop|sophisti pop|new wave|new romantic|synthpop|jazz pop)$/ },
      dream: { zh: 'Dream / Ambient Pop', re: /^(dream pop|ambient pop|neo-psychedelia|ethereal)$/ },
      modern: { zh: '當代 Alt-pop', re: /^(alt-pop|alternative pop|alternative rnb|electropop|glitch pop|experimental pop|hyperpop)$/, min: 12 },
    } },
    'indie-pop': { zh: '獨立流行', re: /^(indie pop|dream pop|jangle pop|twee pop|bedroom pop)$/, children: {
      dream: { zh: 'Dream Pop', re: /^(dream pop|ambient pop|shoegaze|ethereal|ethereal wave)$/ },
      jangle: { zh: 'Jangle / Twee', re: /^(jangle pop|twee pop|twee|c86|indie rock)$/ },
      chamber: { zh: 'Chamber / Art Pop', re: /^(chamber pop|baroque pop|art pop|sophisti-pop)$/ },
      bedroom: { zh: 'Bedroom / Indietronica', re: /^(bedroom pop|lo-fi|indietronica|synthpop|electropop)$/ },
      psych: { zh: '新迷幻流行', re: /^(neo-psychedelia|psychedelic pop|psychedelic)$/, min: 12 },
    } },
    'pop-rock': { zh: '流行搖滾', re: /^(pop rock|power pop|soft rock)$/, children: {
      'soft-rock': { zh: 'Soft Rock / AOR', re: /^(soft rock|yacht rock|adult contemporary|easy listening|aor|soft-rock)$/ },
      'new-wave': { zh: 'New Wave / Synth', re: /^(new wave|synthpop|electropop)$/ },
      baroque: { zh: 'Baroque / Art Pop', re: /^(baroque pop|psychedelic pop|sunshine pop|art pop|progressive pop)$/ },
      'power-pop': { zh: 'Power Pop', re: /^(power pop|jangle pop|pub rock|powerpop)$/, min: 12 },
    } },
  },

  world: {
    reggae: { zh: 'Reggae / Dub', re: /^(roots reggae|dub|dancehall|ska|rocksteady|dancehall reggae)$/, children: {
      roots: { zh: 'Roots Reggae', re: /^(roots reggae|roots and culture|rasta|rastafari|political reggae|lion|roots)$/ },
      dub: { zh: 'Dub', re: /^(dub|dub reggae|on-u sound|electro dub|ambient dub|dub techno)$/ },
      dancehall: { zh: 'Dancehall / Ragga', re: /^(dancehall|dancehall reggae|ragga|raggamuffin|reggaeton|digital reggae)$/ },
      ska: { zh: 'Ska / Rocksteady', re: /^(ska|rocksteady|skinhead reggae|trojan|early reggae|2 tone|two tone|two-tone)$/ },
      lovers: { zh: 'Lovers Rock', re: /^(lovers rock|lovers|uk reggae)$/, min: 8 },
    } },
    african: { zh: '非洲', re: /^(african|afrobeat|highlife|ethiopian|nigeria|south africa|desert blues|afro-pop|soukous)$/, children: {
      west: { zh: '西非 Afrobeat / Highlife', re: /^(afrobeat|afro-beat|nigeria|nigerian|juju|highlife|fela kuti|ghana|ghanaian|from: nigeria|benin)$/ },
      sahel: { zh: '馬利 / 塞內加爾 / 沙漠', re: /^(mali|malian|senegal|senegalese|kora|wassoulou|mbalax|desert blues|tuareg|griot|west african|niger|mauritania)$/ },
      south: { zh: '南部非洲', re: /^(south africa|south african|mbube|township|township jive|mbaqanga|zimbabwe|zimbabwean|chimurenga|a capella|a cappella|choir)$/, min: 12 },
      congo: { zh: '剛果 Soukous / Rumba', re: /^(soukous|congo|dr congo|drc|rumba congolaise|congolese|congolese rumba)$/, min: 10 },
      ethio: { zh: '衣索比亞', re: /^(ethiopian|ethiopia|ethio-jazz|ethiopiques|ethio jazz)$/, min: 8 },
    } },
    latin: { zh: '拉丁 / 古巴', re: /^(latin|salsa|cuban|son cubano|mambo|cumbia|tango)$/, children: {
      salsa: { zh: 'Salsa / 古巴', re: /^(salsa|fania|boogaloo|mambo|son|son cubano|cuban|cuba|afro-cuban|afro-cuban jazz|puerto rico|merengue|latin jazz|timba|charanga)$/ },
      cumbia: { zh: 'Cumbia / Chicha / 安地斯', re: /^(cumbia|chicha|peru|peruvian|psychedelic|tropical|mexico|mexican|colombia|colombian|andean)$/ },
      'latin-pop': { zh: '拉丁流行與西語', re: /^(latin pop|reggaeton|latino|bolero|latin grammy nominated|spanish|spain|latin alternative|rock en espanol|rock en español)$/ },
      tango: { zh: 'Tango', re: /^(tango|nuevo tango|argentina|argentinian)$/, min: 8 },
    } },
    brazil: { zh: '巴西 / Bossa', re: /^(bossa nova|mpb|brazilian|samba|tropicalia|tropicália)$/ },
    india: { zh: '印度與南亞', re: /^(indian|indian classical|hindustani|carnatic|raga|bollywood)$/ },
    med: { zh: '地中海與巴爾幹', re: /^(flamenco|fado|portuguese|greek|rebetiko|balkan|klezmer|sevdah|romani brass)$/, children: {
      flamenco: { zh: 'Flamenco', re: /^(flamenco|flamenco nuevo|nuevo flamenco|spanish|spain|spanish guitar|buleria|bulería|cantaor|flamenco pop)$/, min: 12 },
      fado: { zh: 'Fado', re: /^(fado|portuguese|portugal|amalia rodrigues|moura)$/, min: 10 },
      balkan: { zh: '巴爾幹 / 吉普賽 / Klezmer', re: /^(gypsy|balkan|serbian|bosnian|balkan brass|romani brass|klezmer|jewish|yiddish|brass|sevdah|romani)$/, min: 12 },
    } },
    asia: { zh: '亞洲', re: /^(gamelan|dangdut|luk thung|molam|mor lam|okinawan|min'yo|gagaku|throat singing|uzbek|mongolian|tuvan|khmer|keroncong)$/ },
    arabic: { zh: '中東與土耳其', re: /^(arabic|turkish|persian|middle east|anatolian rock|rai)$/, children: {
      arab: { zh: '阿拉伯', re: /^(arabic|arabic pop|arabic oldies|egyptian|egypt|lebanese|lebanon|oum kolthoum|fairuz|oud|oriental|oriental classic|middle east|middle eastern|syrian|iraqi)$/, min: 12 },
      turkish: { zh: '土耳其', re: /^(turkish|turkey|anatolian rock|anatolian|turkish psychedelic)$/, min: 8 },
      maghreb: { zh: '北非 / Raï', re: /^(algerian|algeria|rai|raï|north africa|moroccan|morocco|gnawa|tunisian)$/, min: 8 },
      persian: { zh: '波斯與蘇菲', re: /^(persian|iran|iranian|sufi|qawwali|pakistani|pakistan|mysticism)$/, min: 8 },
    } },
  },

  blues: {
    delta: { zh: 'Delta / 鄉村藍調', re: /^(delta blues|country blues|acoustic blues|prewar blues|pre-war blues)$/ },
    chicago: { zh: '芝加哥 / 電氣', re: /^(chicago blues|electric blues|urban blues)$/ },
    'blues-rock': { zh: '藍調搖滾', re: /^(blues rock|british blues)$/ },
    texas: { zh: '德州藍調', re: /^(texas blues|west coast blues|jump blues)$/ },
    piano: { zh: '鋼琴與 Boogie', re: /^(piano blues|boogie woogie|barrelhouse)$/ },
    'classic-blues': { zh: '古典藍調', re: /^(classic blues|classic female blues|vaudeville blues)$/ },
    soulblues: { zh: 'Soul Blues', re: /^(soul blues|swamp blues)$/ },
    desert: { zh: '沙漠藍調', re: /^(desert blues|tuareg|tishoumaren|tuareg blues)$/, min: 10 },
  },

  // 古典：不用標籤（覆蓋僅 23%），改用作曲家欄＋年份，見 classifyClassical()
  classical: {
    baroque: { zh: '巴洛克與早期' },
    'classical-era': { zh: '古典時期' },
    romantic: { zh: '浪漫時期' },
    modern: { zh: '20 世紀' },
    contemporary: { zh: '當代與極簡', children: {
      minimal: { zh: '極簡主義', re: /^(minimalism|minimal|minimalist|post-minimalism|post minimalism)$/ },
      neoclassical: { zh: '新古典 / 氛圍鋼琴', re: /^(neoclassical|neo-classical|neo classical|post-classical|modern classical|contemporary piano|ambient|new age|piano)$/ },
      avant: { zh: '前衛與現代', re: /^(avant-garde|20th century classical|serialism|contemporary classical|electroacoustic|avant garde)$/ },
      'film-score': { zh: '偏配樂', re: /^(soundtrack|film score|score|film music|cinematic|soundtracks)$/ },
    } },
    film: { zh: '電影配樂' },
    opera: { zh: '歌劇與聲樂' },
    musical: { zh: '音樂劇', min: 10 },
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
  if (tags.some(t => /^(musical|musicals|show tunes|showtunes|showtune|broadway|west end)$/.test(t))) out.add('musical');
  else if (tags.some(t => OPERA_RE.test(t))) out.add('opera');
  if (tags.some(t => /^(baroque|early music|renaissance|medieval|gregorian)$/.test(t))) out.add('baroque');
  if (tags.some(t => /^(minimalism|minimal|post-minimalism|neoclassical|post-classical|modern classical|contemporary classical|neo-classical|new age)$/.test(t))) out.add('contemporary');
  if (tags.some(t => /^(20th century classical|serialism|twelve-tone|atonal|musique concrete)$/.test(t))) out.add('modern');
  if (tags.some(t => /^(romantic|romanticism)$/.test(t))) out.add('romantic');
  // 作曲家欄優先於年份；沒有作曲家欄時用 artist（古典卡的 artist 常常就是作曲家）
  const hay = card.composer || card.artist;
  for (const [re, era] of COMPOSER_ERA) if (re.test(hay)) { out.add(era); break; }
  // 完全無訊息時才用年份兜底（錄音年份對古典意義不大）
  if (!out.size && card.year >= 1980) out.add('contemporary');
  // 第三層：目前只有「當代與極簡」有標籤可切
  const paths = [...out];
  for (const l2 of out) {
    for (const [cid, cdef] of Object.entries(RULES.classical[l2]?.children || {})) {
      if (cdef.re && tags.some(t => cdef.re.test(t))) paths.push(`${l2}/${cid}`);
    }
  }
  return paths;
}

// ── 讀資料 ────────────────────────────────────────────────────────────
const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const rockMap = JSON.parse(fs.readFileSync(path.join(ROOT, 'rock-subgenre-map.json'), 'utf8'));
// 藝人級分桶對照（代理覆核產出，補標籤規則落不了位的藝人）。鍵是「大類 → 藝人 → 第二層 id」，
// ⚠ 不能只用藝人名——同一位可跨大類（Luc Ferrari 在 electronic 與 classical 各有一筆）。
// 只在標籤規則落空時才採用，不覆蓋既有落位。
const artistMap = fs.existsSync(path.join(ROOT, 'genre-artist-map.json'))
  ? JSON.parse(fs.readFileSync(path.join(ROOT, 'genre-artist-map.json'), 'utf8')) : {};
// 「台灣出產」的流行藝人：落到 c-pop 的卡改記 t-pop。這是唯一會覆蓋標籤規則的清單——
// c-pop 標籤分不出台港中星馬，只能靠出產地名單切。
const TW_POP = new Set((fs.existsSync(path.join(ROOT, 'tw-pop-artists.json'))
  ? JSON.parse(fs.readFileSync(path.join(ROOT, 'tw-pop-artists.json'), 'utf8')).artists : []) || []);
// 亞洲搖滾藝人 → 國別代碼（ASIA_COUNTRIES 的鍵）。人工裁定過的對照表，新藝人由
// scripts/build-asia-country-map.mjs 依標籤／文字系統提案、列出待裁定名單。
const ASIA_MAP_FILE = path.join(ROOT, 'rock-asia-country-map.json');
// 細項藝人對照（2026-10-20 甲類補標）：節點路徑 → 藝人。標籤沒寫到細項名、但藝人明確屬於該細項的卡，
// 在步驟 2.6 加掛第二、三層。只給主類型＝節點第一層的卡（前台抽卡要求主類型相符）。
const L3_MAP_FILE = path.join(ROOT, 'genre-l3-artist-map.json');
const l3Map = fs.existsSync(L3_MAP_FILE) ? JSON.parse(fs.readFileSync(L3_MAP_FILE, 'utf8')) : {};
const asiaMap = fs.existsSync(ASIA_MAP_FILE) ? JSON.parse(fs.readFileSync(ASIA_MAP_FILE, 'utf8')) : {};

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
  const over = artistMap[g]?.[card.artist];
  const paths = new Set();
  if (g === 'classical') {
    for (const n of classifyClassical(card)) paths.add(`classical/${n}`);
    if (!paths.size && over) paths.add(`classical/${over.split('/')[0]}`);
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
    let fixedL3 = '';
    if (!bucket && over) [bucket, fixedL3] = over.split('/');
    if (bucket && RULES.rock[bucket]) {
      paths.add(`rock/${bucket}`);
      addRockL3(paths, bucket, card, fixedL3);
    }
    // 日亞搖滾的地區掛載不在這裡做（見步驟 2.5）：若在此加進 paths，沒標籤的卡會被視為
    // 「已落位」而跳過步驟 2 的同藝人傳播，風格桶反而少掉一批（實測 indie-alt 少 26、metal 少 17）。
    return [...paths];
  }
  for (const [id, def] of Object.entries(RULES[g])) {
    if (!def.re) continue;
    if (!card.tags.some(t => def.re.test(t))) continue;
    paths.add(`${g}/${id}`);
    // 第三層（2026-10-20 店主：分類要更細）：同一桶內再照標籤落到子節點，多重歸屬
    for (const [cid, cdef] of Object.entries(def.children || {})) {
      if (cdef.re && card.tags.some(t => cdef.re.test(t))) paths.add(`${g}/${id}/${cid}`);
    }
  }
  if (g === 'pop' && paths.has('pop/c-pop') && TW_POP.has(card.artist)) {
    paths.delete('pop/c-pop');
    paths.add('pop/t-pop');
  }
  if (!paths.size && over) {
    const [l2, l3] = over.split('/');
    if (RULES[g][l2]) {
      paths.add(`${g}/${l2}`);
      const children = RULES[g][l2].children;
      if (l3 && children?.[l3]) paths.add(`${g}/${l2}/${l3}`);
      else if (children) for (const [id, def] of Object.entries(children)) {
        if (card.tags.some(t => def.re.test(t))) paths.add(`${g}/${l2}/${id}`);
      }
    }
  }
  return [...paths];
}

// 搖滾第三層：對照表直接指定就用它；年代桶看年份；其餘照標籤比對
function addRockL3(paths, bucket, card, fixedL3) {
  const children = RULES.rock[bucket]?.children;
  if (!children) return;
  if (fixedL3 && children[fixedL3]) { paths.add(`rock/${bucket}/${fixedL3}`); return; }
  for (const [id, def] of Object.entries(children)) {
    if (def.years) {
      if (card.year >= def.years[0] && card.year <= def.years[1]) paths.add(`rock/${bucket}/${id}`);
    } else if (def.re && card.tags.some(t => def.re.test(t))) {
      paths.add(`rock/${bucket}/${id}`);
    }
  }
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

// 步驟 2.5：日亞搖滾是「地區」不是「風格」——亞洲藝人不論落在哪個風格桶（閃靈在金屬、BOØWY 在
// 龐克新浪潮、崔健在獨立另類……），都另外掛進日亞搖滾並依國別分第三層；以前這些卡從日亞搖滾抽不到。
// 加在風格落位（含步驟 2 的傳播）之上，不取代它。"-"＝裁定過不是亞洲藝人（同名混淆）。
let stepAsia = 0;
for (const c of cards) {
  if (c.prim !== 'rock') continue;
  const cc = asiaMap[c.artist];
  if (!cc || cc === '-') continue;
  const k = `${c.artist}|${c.album}`;
  const p = new Set(assign.get(k) || []);
  p.add('rock/jrock-asia');
  if (RULES.rock['jrock-asia'].children[cc]) p.add(`rock/jrock-asia/${cc}`);
  assign.set(k, [...p]);
  stepAsia++;
}

// 步驟 2.6：細項藝人對照（加掛，不取代既有落位）。條目寫「藝人|專輯」就只掛那一張（Various Artists 用）。
let stepL3 = 0;
const l3ByArtist = new Map();
for (const [node, artists] of Object.entries(l3Map)) {
  if (node.startsWith('_') || !Array.isArray(artists)) continue;
  for (const a of artists) { if (!l3ByArtist.has(a)) l3ByArtist.set(a, []); l3ByArtist.get(a).push(node); }
}
for (const c of cards) {
  const k = `${c.artist}|${c.album}`;
  const nodes = [...(l3ByArtist.get(c.artist) || []), ...(l3ByArtist.get(k) || [])];
  if (!nodes.length) continue;
  const p = new Set(assign.get(k) || []);
  const before = p.size;
  for (const node of nodes) {
    const parts = node.split('/');
    if (parts[0] !== c.prim) continue;
    for (let i = 2; i <= parts.length; i++) p.add(parts.slice(0, i).join('/'));
  }
  if (p.size > before) { assign.set(k, [...p]); stepL3++; }
}

// 步驟 3：台灣流行正規化。步驟 2 的同藝人傳播也會發 c-pop，跑在 classify() 的覆寫之後，
// 所以要在這裡再掃一次，否則同一位台灣歌手會一半 t-pop 一半 c-pop。
let step3 = 0;
for (const [k, paths] of assign) {
  const artist = k.slice(0, k.lastIndexOf('|'));
  if (!TW_POP.has(artist) || !paths.includes('pop/c-pop')) continue;
  assign.set(k, paths.map(p => (p === 'pop/c-pop' ? 'pop/t-pop' : p)));
  step3++;
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
    if (n < (def.min || MIN_NODE)) continue;   // def.min：資料天生就少但值得存在的桶
    const child = { id: cid, zh: def.zh, count: n, children: [] };
    for (const [gcid, gdef] of Object.entries(def.children || {})) {
      const gn = counts.get(`${p}/${gcid}`) || 0;
      if (gn < (gdef.min || MIN_NODE)) continue;
      child.children.push({ id: gcid, zh: gdef.zh, count: gn, ...(gdef.years ? { _y: gdef.years[0] } : {}) });
    }
    // 年代桶照時間排（50→60→70…），其餘第三層照張數排
    child.children.sort((a, b) => (a._y != null && b._y != null) ? a._y - b._y : b.count - a.count);
    child.children.forEach(x => { delete x._y; });
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
  + `步驟1 規則命中 ${step1}｜步驟2 同藝人傳播 +${step2}｜步驟2.5 日亞搖滾地區掛載 ${stepAsia}｜步驟2.6 細項藝人對照 ${stepL3}｜步驟3 台灣流行改判 ${step3}｜剪枝後覆蓋 ${covered}`
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
