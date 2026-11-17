// bake-cards.mjs：把 tools/deck-lists.json 的專輯清單烘成 game-lab/cards.js＋bins.js（SPEC §4.3、§7.2；v4：SPEC-v4 §2.2.1）。
//
// v4（SPEC-v4 §2.2.1）：
//   - deck-lists.json 裡 `_` 開頭的鍵是設定，不是卡組：_region（{卡片 id: tw|jp|zh|xx} 覆寫）、_bins（每一區的 rule）、_ost（原聲帶旗標）。
//   - region 值域 tw｜jp｜zh｜xx：先看 _region，再看 TW／JP／ZH 正規式；王菲＝zh。
//   - 推薦語強制：ace_*、gift_*、bargain、gold。
//   - apex_trial（頂點卡純輔助卡試做 ?apex=1，2026-11-15）：tier 照 seed（不是頂點卡就失敗）、星數照王牌烘（ACE_STATS：那軸 7、其他 1）、不強制推薦語、
//     不強制試聽（Apple 索引沒有的＝主站「無來源」，previewUrl ''；42 張裡 21 張）；
//     名單與能力在 content.js C.apexTrial（三派各 15 張，第 1 張＝ace_* 那張；這一組只列另外 42 張）。放在最後一組：新卡接在 cards.js 最後面
//   - 另外寫 bins.js（UMD：window.DipLabBins／module.exports）：bin_<key> → shops.dip.<key>＝{ key, label, zh, rule, pool, front }
//     （FIXLIST 4／5，X／Y 契約：十大類＋tw＋new＋門口牆 feature／picks；label／zh／rule 在 deck-lists.json 的 _bins；
//     front＝shops/dip.json 那一區看得到的封面，照道具順序，由 check-covers.mjs 的 sectionFronts 讀）；
//     每張卡都要符合該區 rule（check-covers.mjs 的 ruleMisses，同一份）、front ⊂ pool、各區不重複、也不跟牌組／禮物／特價箱／王牌／掉牌重複，否則整份不寫。
//
//   node game-lab/tools/bake-cards.mjs              # 解析 seed＋Apple 試聽索引＋Firestore 封面，驗證後寫 cards.js
//   node game-lab/tools/bake-cards.mjs --no-verify  # 不逐一驗證封面／試聽網址（只在離線時用）
//   node game-lab/tools/bake-cards.mjs --links-only # v2：只補四平台連結（appleUrl／spotifyUrl／bandcampUrl），其他欄位原封不動
//   node game-lab/tools/bake-cards.mjs --covers-only # v2 fix：只套 LOCAL_COVER_SKIP（本機封面是錯的那幾張改用遠端 coverUrl）＋tools/cover-overrides.json＋重算 subs、tune，不打 Firestore、不重抓連結
//     （--covers-only --no-verify＝完全不打網路；主站重建 data/mood/card-moods.json 之後用這條更新頻率）
//   node game-lab/tools/bake-cards.mjs --pool-only   # 第 B 波：只烘精選新卡 cards-pool.js＋cards-media.json（不打網路、不碰 cards.js／bins.js；完整烘焙最後也跑這段）
//
// 精選新卡（第 B 波 SPEC-B §1.2–§1.4，2026-11-16）：tools/pool-list.json（make-pool-list.mjs 從 v5/pool5k 產；4,677 張＝精選 5,000 扣掉核心）→
//   cards-pool.js（同步；UMD window.DipLabPool／module.exports）＝邏輯＋名字，照欄存（每欄一個陣列、第 i 張＝各欄第 i 個；順序＝pool-list.json）：
//     { v, n, G:[曲風], K:[箱 key], T:[頻率], R:['jp','tw','xx','zh'], A:[藝人（同藝人只寫一次）],
//       art:[藝人索引跟上一張的差（第一張跟 0 比）], alb:[專輯], year:[年], c:[經典], o:[冷門], h:[硬蕊], bin:[箱索引], tune:[頻率索引], gen:[[曲風索引…]], reg:[地區索引] }
//     照欄存不照列存（SPEC-B §1.3 原本是 rows 一列一張）：數字欄跟專輯名分開壓得比較好，gzip 97.7 → 82 KB（首屏硬門檻 740 KB；rulings W1b-1）
//   cards-media.json（標題畫好後才 fetch）＝{ v, rows:[[封面碼, 試聽碼], …] }，順序同 rows：
//     封面碼 c<mbid>＝CAA release front-250、g<mbid>＝release-group front-250、C<mbid>/<n>＝release <n>-250.jpg、a<d><path>＝is<d>-ssl.mzstatic.com 300x300bb、
//     s<hex>＝i.scdn.co ab67616d00001e02<hex>、u<網址>＝原樣；試聽碼＝去掉 https://audio-ssl.itunes.apple.com/itunes-assets/（https:// 開頭＝原樣）。
//     解碼在 content.js C.attachMedia（兩邊同一套；這裡每張都驗「編了再解＝原網址」）。
//   v＝兩個檔內容的 sha1 前 8 碼（同一份輸入重烘一字不差；content.js C.poolVersion、媒體網址 ?v= 都用它，版本不合 attachMedia 不套）。
//   三軸、曲風、年＝seed 原字串那一列（MISSING-IN-SEED）；頻率＝card-moods（NO-TUNE）；地區＝pool-list 的（pool5k 判法；_region 覆寫照套）；
//   不烘平台連結（唱片資訊退回搜尋）、不打網路驗封面試聽（pool5k check.md 逐張驗過；改名單＝回 pool5k 工具重產、重跑 pool5k/tools/check.mjs）。
//   擋（任一條 exit 1、不寫檔）：MISSING-IN-SEED、POOL-APEX（seed 有 tier）、POOL-DUP-CORE（撞核心 catalogId）、POOL-DUP、NO-TUNE、POOL-REGION、POOL-STARS、
//     POOL-BIN（沒有這個箱）、POOL-BIN-RULE（箱子規則；subs 從 card-subgenres 現算）、POOL-RARITY（FEATURE 只能史詩／傳奇、其他只能普通／稀有／獨特）、
//     POOL-COVER-HOST（rewrite 後 https 且主機是 coverartarchive.org／is1–5-ssl.mzstatic.com／i.scdn.co）、POOL-PREVIEW（https://audio-ssl.itunes.apple.com/）、POOL-MEDIA-CODE。
//
// 卡片 id（第 B 波 SPEC-B §1.1，2026-11-16）：一律是主站 catalogId＝(藝人+'|'+專輯).toLowerCase()、斜線換連字號（＝主站 cardIdOf、Firestore 唱片櫃文件 id）。
//   之前的 id 是舊 slug（oldSlug，下面；只留給 migrate-ids.mjs／content.js C.legacyIds 當舊存檔對照）。下面說的「卡片 id」都是 catalogId：
//   _region、pitches.json、cover-overrides.json、LOCAL_COVER_SKIP、LINK_OVERRIDES、shops/dip.json 的鍵／值都已換成 catalogId（tools/migrate-ids.mjs）。
//   --covers-only／--links-only（REUSE 路）讀現有 cards.js 時，鍵一律用藝人／專輯重算成 catalogId（舊 slug 鍵的 cards.js 也吃，順序照舊）。
// 箱子 bin（第 B 波 SPEC-B §1.4）：在 bin_<key> 組的卡烘 bin: '<key>'（不在箱子的不寫）；content.js 用它推全卡池那一份 C.bins[k].all。三條路都算。
// 封面縮圖 rewrite（三條路都跑；REUSE 路對每張現有 coverUrl 也跑一次，覆寫的不跑）：CAA front-250、Spotify 300px、Apple 300x300bb（bb／bf／cc／-n 都改；
//   第 B 波補 bf：Luis Russell 600x600bf、林生祥《野蓮出庄》1000x1000bf 原本沒縮）；archive.org 綁機器的直連（iaNNN.us.archive.org／dnNNN.ca.archive.org）
//   改 CAA 正式網址 release/<mbid>/<圖 id>-250.jpg（同 v5/pool5k tools/data.mjs thumbOf）。
// 封面覆寫（店主 11-13：「有些封面用成了 cd 版或其他特別版……我只要正常版就好」）：tools/cover-overrides.json {卡片 id: {coverUrl, source, note}}
//   三條路（完整烘焙、--covers-only、--links-only）都優先用它，重烘不會把修好的封面蓋回去；有覆寫的卡不給 localCover（畫面優先讀本機圖），
//   也不做 CAA→Apple 300px 的替換（Apple 那張常是再版／系列圖：Argerich 拉三、石頭記就是這樣換錯的）；覆寫的網址打不開就失敗，不退回 iTunes。
// 子曲風（v5 店面改版：INDIE ROCK／INDIE POP／CITY POP 三區的上架規則 sub）：../card-subgenres.json 的 "藝人|專輯" → subs（子曲風路徑），烘進每張卡（空的不寫）。
// 頻率（v5 第六項第二期）：../data/mood/card-moods.json（主站頻率光譜的前台檔）→ tune（八格之一：calm still languid decay lift crisp boil charge）。
//   對卡跟主站一樣：fnv1a32(catalogId(藝人, 專輯)) 在 _h 找索引 → cards[i] 的 [x, y, z]，門檻用檔內 thresholds 判格（dip-tune.js 的 cellOf），
//   所以遊戲顯示的格子跟主站頻率光譜一模一樣。必填：查不到 → NO-TUNE（整份不寫）。三條路都算（REUSE 路也重算）。
//   只上色、不進戰鬥規則（engine 的 outcome／星數不准讀 tune）。
//
// v2（SPEC-v2 §4.3）：唱片資訊的平台鈕在烘焙時就把連結烘進 cards.js，執行期不打網路。
//   appleUrl    ← Apple 試聽索引的專輯 id＋slug＋國別（https://music.apple.com/<cc>/album/<slug>/<id>）；沒有就空（畫面上退回搜尋連結）
//   spotifyUrl  ← dip-vinyl-worker /spotify-search（只用它；2026-11-17 #467 拿掉只比藝人的 /spotify-album-link 退路，查不到就不給鈕）
//   bandcampUrl ← dip-vinyl-worker /bandcamp-search，而且 bandcamp 子網域要對得上藝人名（搜尋常回別人的翻唱／現場頁，對不上就不烘）
//   LINK_OVERRIDES（下面）：逐張固定某個平台連結（'' ＝不給鈕）；搜尋回的頁子網域對得上、其實是第三方再版頁的就寫在這裡。
//     三條路都套（完整烘焙、--links-only 抓完連結之後、--covers-only 也照套），重烘不會把它抓回來。
//
// 來源（全部唯讀）：
//   ../seed_cards.json                    三軸星數（seed 原值）、曲風、年份、apex tier
//   ../data/apple-audio-runtime-v1.json   固定試聽 previewUrl（只在烘焙時讀；頁面執行期不載這份 4.3 MB 索引）
//   Firestore card_catalog（公開 REST）     coverUrl（只在烘焙時讀；頁面執行期不碰 Firestore）
//   iTunes lookup                         Firestore 封面在 CAA／archive.org（慢、偶爾 500）、沒封面或打不開時，用 Apple 索引裡的專輯 id 取 300px 封面
//   ../art/covers/<slug>.jpg              本機封面（有就給 localCover）
//   tools/pitches.json                    推薦語 {卡片 id:{text, tag}}
//   tools/cover-overrides.json            封面覆寫 {卡片 id:{coverUrl, source, note}}（見上）
//   ../card-subgenres.json                子曲風 {"藝人|專輯": [路徑]}（店主網站的子曲風樹；只在烘焙時讀）
//   ../data/mood/card-moods.json          頻率座標（_h 雜湊＋cards [x,y,z,把握]＋thresholds；只在烘焙時讀，頁面執行期不載這份 600 KB）
//
// 規則：王牌改 NEO 星數 7/1/1、1/7/1、1/1/7；非王牌組不得用到 apex 卡；每張卡一定要有能開的封面與試聽，否則失敗（exit 1）。
// 從 $S/design/ref/build-cards.mjs 擴寫。
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ruleMisses as ruleMissesCC, sectionFronts, rarityOf } from './check-covers.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const LAB = path.resolve(HERE, '..');
const ROOT = path.resolve(LAB, '..') + '/';
const ARGV = new Set(process.argv.slice(2));
const VERIFY = !ARGV.has('--no-verify');
const LINKS_ONLY = ARGV.has('--links-only');
const COVERS_ONLY = ARGV.has('--covers-only');
const REUSE = LINKS_ONLY || COVERS_ONLY;      // 拿現有的 cards.js 當底
const POOL_ONLY = ARGV.has('--pool-only');    // 只烘精選新卡（cards-pool.js＋cards-media.json）
const POOL_LIST = JSON.parse(fs.readFileSync(path.join(HERE, 'pool-list.json'), 'utf8'));
// 本機封面（art/covers）是別的版本、看不出是哪張專輯的：不給 localCover，改用遠端 coverUrl（店主：封面要看得出專輯）
//   art/covers 那張檔案本身也要在主站換掉（不在 game-lab 範圍）
const LOCAL_COVER_SKIP = {
  "john coltrane|blue train": '本機圖是 10 CD 合輯的封面，不是 Blue Note 1577（v2 fix O9）'
};
const WORKER = 'https://dip-vinyl-worker.kubinice06.workers.dev';

const seed = JSON.parse(fs.readFileSync(ROOT + 'seed_cards.json', 'utf8'));
const apple = JSON.parse(fs.readFileSync(ROOT + 'data/apple-audio-runtime-v1.json', 'utf8')).entries;
const lists = JSON.parse(fs.readFileSync(path.join(HERE, 'deck-lists.json'), 'utf8'));
const pitches = fs.existsSync(path.join(HERE, 'pitches.json')) ? JSON.parse(fs.readFileSync(path.join(HERE, 'pitches.json'), 'utf8')) : {};
const COVER_OVERRIDES = fs.existsSync(path.join(HERE, 'cover-overrides.json')) ? JSON.parse(fs.readFileSync(path.join(HERE, 'cover-overrides.json'), 'utf8')) : {};
for (const k of Object.keys(COVER_OVERRIDES)) if (k.startsWith('_')) delete COVER_OVERRIDES[k];
const SUBGENRES = fs.existsSync(ROOT + 'card-subgenres.json') ? JSON.parse(fs.readFileSync(ROOT + 'card-subgenres.json', 'utf8')) : {};
const subsOf = (artist, album) => (SUBGENRES[artist + '|' + album] || []).slice();
// 頻率：跟 dip-tune.js 同一套（fnv＝:57、cellOf＝:65，門檻讀檔內 thresholds、不寫死）；鍵＝catalogId（下面，跟主站 cardIdOf 同一條）
const MOODS = JSON.parse(fs.readFileSync(ROOT + 'data/mood/card-moods.json', 'utf8'));
if (!Array.isArray(MOODS._h) || MOODS._h.length !== MOODS.cards.length || !MOODS.thresholds) throw new Error('data/mood/card-moods.json 格式不對（_h／cards／thresholds）');
const MOOD_BY_HASH = new Map();
MOODS._h.forEach((h, i) => { if (MOODS.cards[i]) MOOD_BY_HASH.set(h, MOODS.cards[i]); });
const fnv = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
const MT = MOODS.thresholds;
const cellOf = (x, y, z) => (x >= MT.x ? (y >= MT.y ? (z >= MT.z ? 'boil' : 'charge') : (z >= MT.z ? 'lift' : 'crisp'))
                                       : (y >= MT.y ? (z >= MT.z ? 'languid' : 'decay') : (z >= MT.z ? 'calm' : 'still')));
const tuneOf = (artist, album) => { const m = MOOD_BY_HASH.get(fnv(catalogId(artist, album))); return m ? cellOf(m[0], m[1], m[2]) : null; };

// Apple 索引的鍵：與 dip-player 同一套正規化
const norm = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯]+/g, '');
const ACE_STATS = { hall: [7, 1, 1], pearl: [1, 7, 1], heresy: [1, 1, 7] };
// v4：補齊 §4.5 用到的台灣／日本藝人；王菲改 zh（SPEC-v4 §2.2.1）。正規式抓不到的寫進 deck-lists.json 的 _region。
const TW = /台灣|^(交工|生祥|林生祥|草東|美秀|deca joins|宇宙人|傷心欲絕|老王|濁水溪|陳珊妮|雷光夏|黃小楨|廢五金|林強|陳綺貞|張懸|閃靈|落日飛車|周杰倫|擊沉女孩|甜約翰|拍謝少年|血肉果汁機|Sorry Youth|DSPS|Elephant Gym|大象體操|五月天|伍佰|蔡琴|江蕙|陳建年|陳明章)/i;
const JP = /[぀-ヿ]|^(Fishmans|Cornelius|Melt-Banana|Keiji Haino|Ruins|Merzbow|Masonna|BOREDOMS|Boris|坂本龍一|細野晴臣|山下達郎|竹内まりや|大貫妙子|椎名林檎|宇多田|Anri|明田川|菊地|富樫|Masahiko|Ryuichi|Haruomi|Yellow Magic|Les Rallizes|灰野|Hiroshi Yoshimura|Midori Takada|吉田美奈子|松田聖子|久石譲|大野雄二)/i;
const ZH = /^(王菲)/;
const REGION_OVERRIDE = lists._region || {};
const BIN_RULES = lists._bins || {};
const OST_IDS = lists._ost || [];
const OST_RE = /(original (motion picture )?(soundtrack|score))|soundtrack from|music from the (motion picture|film|original|soundtrack)|サウンドトラック|原聲帶|原聲專輯/i;
// 舊卡片 id（第 B 波之前）：拉丁字去重音、保留中日文、截 60。bake 不再用它當 id（5,000 張會撞：韓文／俄文／泰文全變空字串、截 60 撞號），
//   只留著當紀錄：tools/migrate-ids.mjs 與 content.js C.oldSlug 照抄這條推舊存檔的對照表（改這條＝老存檔遷不過去）。
const oldSlug = (a, b) => (a + '-' + b).normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
  .replace(/[^a-z0-9㐀-鿿぀-ヿ]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
// art/covers 的檔名規則（scripts/fetch-shop-covers.py）：小寫、非英數換 -、截 60
const coverSlug = (a, b) => (a + '-' + b).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
// 卡片 id＝主站 catalogId（index.html cardIdOf、build-pool-index.mjs、content.js C.catalogId 同一條）
const catalogId = (a, b) => (a + '|' + b).toLowerCase().replace(/\//g, '-').trim();

const problems = [];
const cards = {};          // id -> card（依 deck-lists.json 第一次出現的順序）
const groupsOf = {};       // id -> [group]
const appleIdOf = {};

const seedRow = s => { const [a, b] = s.split('|'); return seed.find(r => r[0] === a && r[1] === b) || seed.find(r => norm(r[0]) === norm(a) && norm(r[1]) === norm(b)); };
// v4：牆（wall_a／wall_b）原本是展示用、可以擺王牌；FIXLIST 4／5 起門口牆也是賣的（feature／picks＝bin_*），沒有展示組了
const DISPLAY_GROUPS = new Set([]);
const APEX_TRIAL = 'apex_trial';   // 頂點卡純輔助卡試做（見檔頭）
const ACE_OF = {};
for (const [group, arr] of Object.entries(lists)) if (group.startsWith('ace_')) for (const s of arr) { const r = seedRow(s); if (r) ACE_OF[catalogId(r[0], r[1])] = group.slice(4); }
for (const [group, arr] of Object.entries(lists)) if (!group.startsWith('_')) for (const s of arr) {
  const r = seedRow(s);
  if (!r) { problems.push('MISSING-IN-SEED ' + s + ' [' + group + ']'); continue; }
  const [artist, album, c, o, h, genres, year, , tier] = r;
  const id = catalogId(artist, album);
  const aceTier = group.startsWith('ace_') ? group.slice(4) : group === APEX_TRIAL ? (tier || null) : (DISPLAY_GROUPS.has(group) && tier && ACE_OF[id] === tier) ? tier : null;
  if (group === APEX_TRIAL && !tier) problems.push('APEX-TRIAL-NOT-APEX ' + s + '（seed 沒有 tier）');
  if (tier && !aceTier) problems.push('APEX-AS-NORMAL ' + s + ' (' + tier + ') [' + group + ']');
  if (aceTier && tier !== aceTier) problems.push('ACE-TIER-MISMATCH ' + s + ' seed=' + tier + ' group=' + aceTier);
  (groupsOf[id] = groupsOf[id] || []).includes(group) || groupsOf[id].push(group);
  if (cards[id]) continue;
  const st = aceTier ? ACE_STATS[aceTier] : [c, o, h];
  const ap = apple[norm(artist) + '\u0000' + norm(album)] || [];
  const previewUrl = ap[2] || '';
  if (ap[1]) appleIdOf[id] = { id: ap[1], cc: ap[0] };
  if (!previewUrl && group !== APEX_TRIAL) problems.push('NO-PREVIEW ' + s + ' [' + group + ']');   // apex_trial：主站沒有固定試聽的照「無來源」烘（previewUrl ''；畫面本來就會跳過沒有試聽的卡）
  const region = REGION_OVERRIDE[id] || (TW.test(artist) ? 'tw' : JP.test(artist) ? 'jp' : ZH.test(artist) ? 'zh' : 'xx');
  const tags = (genres || []).map(g => 'g:' + g)
    .concat(year < 1980 ? ['y:<1980'] : year >= 2000 ? ['y:>=2000'] : [])
    .concat(region !== 'xx' ? ['r:' + region] : []);
  cards[id] = { id, artist, album, year, genres: genres || [], region, c: st[0], o: st[1], h: st[2], tier: aceTier,
    coverUrl: null, localCover: null, previewUrl, tags, pitch: null, subs: subsOf(artist, album), tune: tuneOf(artist, album) };
  if (!cards[id].tune) problems.push('NO-TUNE ' + s + ' [' + group + ']（data/mood/card-moods.json 查不到；catalogId=' + catalogId(artist, album) + '）');
}
// 金邊池（店主私藏）：gold 標記
for (const id of Object.keys(cards)) if (groupsOf[id].includes('gold')) cards[id].gold = true;

// 推薦語
for (const [id, p] of Object.entries(pitches)) {
  if (id.startsWith('_')) continue;
  if (!cards[id]) { problems.push('PITCH-FOR-UNKNOWN-CARD ' + id); continue; }
  cards[id].pitch = p.text;
}
// v4：junk 改名 bargain（SPEC-v4 §2.2.1）
const needPitch = g => /^(ace_|gift_)/.test(g) || g === 'bargain' || g === 'gold';
for (const id of Object.keys(cards)) if (groupsOf[id].some(needPitch) && !cards[id].pitch) problems.push('NO-PITCH ' + id);
const POOL_IDS = new Set((POOL_LIST.rows || []).map(r => catalogId(r[0], r[1])));   // _region 也可以覆寫精選新卡（--pool-only 套）
for (const id of Object.keys(REGION_OVERRIDE)) {
  if (!['tw', 'jp', 'zh', 'xx'].includes(REGION_OVERRIDE[id])) problems.push('BAD-REGION-OVERRIDE ' + id + '=' + REGION_OVERRIDE[id]);
  if (!cards[id] && !POOL_IDS.has(id)) problems.push('REGION-OVERRIDE-FOR-UNKNOWN-CARD ' + id);
}
for (const id of OST_IDS) if (!cards[id]) problems.push('OST-FLAG-FOR-UNKNOWN-CARD ' + id);

// ---- 箱子與門口牆（v4 FIXLIST 4／5，X／Y 契約）→ bins.js ----
// rule 的判斷＝check-covers.mjs 的 ruleMisses（cat、rarity、first、regions、minYear、minTop、notGenres、ost、sub）
const ruleMisses = (rule, c) => ruleMissesCC(rule, c, OST_IDS);
const BIN_GROUP = g => g.startsWith('bin_') ? g.slice(4) : null;
const NOT_EXCLUSIVE = new Set(['gold', 'listen', 'stake']);   // v3 唱片櫃／試聽機用的組，可以跟箱子重疊
const SHOP = JSON.parse(fs.readFileSync(path.join(LAB, 'shops/dip.json'), 'utf8'));
function buildBins() {
  const probs = [], dip = {};
  const idOf = s => { const r = seedRow(s); return r ? catalogId(r[0], r[1]) : null; };
  const uses = {};         // id -> [{g, cat}]（只看「排他」組：牌組、禮物、特價箱、王牌、掉牌、箱子）
  for (const [g, arr] of Object.entries(lists)) {
    if (g.startsWith('_') || NOT_EXCLUSIVE.has(g)) continue;
    const cat = BIN_GROUP(g) ? 'bin' : 'deck';
    for (const s of arr) { const id = idOf(s); if (id) (uses[id] = uses[id] || []).push({ g, cat }); }
  }
  // 箱子的卡不准出現在別處（各區之間、牌組、禮物、特價箱、王牌、掉牌）；牌組之間的重複歸 check-content 管
  for (const [id, u] of Object.entries(uses)) if (u.length > 1 && u.some(x => x.cat === 'bin')) probs.push('BIN-OVERLAP ' + id + ' [' + u.map(x => x.g).join(', ') + ']');
  const fronts = sectionFronts(SHOP);
  for (const [g, arr] of Object.entries(lists)) {
    if (g.startsWith('_')) continue;
    const key = BIN_GROUP(g);
    if (!key) continue;
    const M = BIN_RULES[key];
    if (!M || !M.rule || !M.label || !M.zh) { probs.push('NO-BIN-META ' + key + '（deck-lists.json _bins 要有 label、zh、rule）'); continue; }
    const pool = [];
    for (const s of arr) {
      const id = idOf(s); if (!id || !cards[id]) continue;
      const miss = ruleMisses(M.rule, cards[id]);
      if (miss.length) probs.push('BIN-RULE ' + key + ' ' + id + ' ' + miss.join(','));
      pool.push(id);
    }
    const front = (fronts[key] || []).slice();
    for (const id of front) if (!pool.includes(id)) probs.push('BIN-FRONT-NOT-IN-POOL ' + key + ' ' + id + '（shops/dip.json 看得到的封面要在 bin_' + key + '）');
    dip[key] = { key, label: M.label, zh: M.zh, rule: M.rule, pool, front };
  }
  for (const k of Object.keys(BIN_RULES)) if (!dip[k]) probs.push('BIN-META-WITHOUT-GROUP ' + k + '（_bins 有、bin_' + k + ' 沒有）');
  for (const k of Object.keys(fronts)) if (k !== 'sale' && !dip[k]) probs.push('SHOP-SECTION-WITHOUT-GROUP ' + k + '（shops/dip.json 有這一區、deck-lists 沒有 bin_' + k + '）');
  // 輸出順序＝_bins 的順序（契約：jazz tw rock elec soul hiphop citypop classical world folk indierock indiepop blues new feature picks）
  const ordered = {};
  for (const k of Object.keys(BIN_RULES)) if (dip[k]) ordered[k] = dip[k];
  for (const k of Object.keys(dip)) if (!ordered[k]) ordered[k] = dip[k];
  return { dip: ordered, probs };
}
if (!REUSE && !POOL_ONLY) {
  problems.push(...buildBins().probs);
  // 卡單或箱子本身就有問題：不必先打網路（封面／試聽要幾分鐘）
  if (problems.length) {
    console.log('PROBLEMS (' + problems.length + '):'); problems.forEach(p => console.log('  ' + p));
    console.log('cards.js / bins.js NOT written (pre-network check).'); process.exit(1);
  }
}

// ---- 封面 ----
const rewrite = u => {
  if (!u) return '';
  u = String(u).trim();
  // archive.org 綁機器的直連 → CAA 正式網址（會轉到現在活著的機器；同 v5/pool5k tools/data.mjs thumbOf）
  const ia = u.match(/^https?:\/\/[^/]*archive\.org\/(?:\d+\/items|download)\/mbid-([0-9a-f-]{36})\/mbid-\1-(\d+)(?:_thumb\d*)?\.(?:jpe?g|png|gif)$/i);
  if (ia && !/coverartarchive\.org/.test(u)) return 'https://coverartarchive.org/release/' + ia[1] + '/' + ia[2] + '-250.jpg';
  if (/coverartarchive\.org/.test(u)) {
    if (/\/front$/.test(u)) return u + '-250';
    if (/\/front-\d+(\.jpg)?$/.test(u)) return u.replace(/\/front-\d+(\.jpg)?$/, '/front-250');
    if (/\/(\d+)(-\d+)?\.jpg$/.test(u)) return u.replace(/\/(\d+)(-\d+)?\.jpg$/, '/$1-250.jpg');
    return u;
  }
  if (/i\.scdn\.co\/image\/ab67616d0000b273/.test(u)) return u.replace('ab67616d0000b273', 'ab67616d00001e02');
  if (/mzstatic\.com/.test(u)) return u.replace(/\/\d+x\d+(bb|bf|cc|-\d+)?\.(jpg|png|webp)$/, '/300x300bb.$2');   // bf：第 B 波補（原本漏了，600x600bf／1000x1000bf 沒縮）
  return u;
};

// ---- 精選新卡（第 B 波 SPEC-B §1.3／§1.4；--pool-only，完整烘焙最後也跑）→ cards-pool.js＋cards-media.json ----
const CAA = 'https://coverartarchive.org/', MZ = /^https:\/\/is(\d)-ssl\.mzstatic\.com\/image\/thumb\/(.+)\/300x300bb\.jpg$/, SCDN = 'https://i.scdn.co/image/ab67616d00001e02';
const PREVIEW_BASE = 'https://audio-ssl.itunes.apple.com/itunes-assets/';
function coverCode(u) {
  let m;
  if ((m = /^https:\/\/coverartarchive\.org\/release\/([0-9a-f-]{36})\/front-250$/.exec(u))) return 'c' + m[1];
  if ((m = /^https:\/\/coverartarchive\.org\/release-group\/([0-9a-f-]{36})\/front-250$/.exec(u))) return 'g' + m[1];
  if ((m = /^https:\/\/coverartarchive\.org\/release\/([0-9a-f-]{36})\/(\d+)-250\.jpg$/.exec(u))) return 'C' + m[1] + '/' + m[2];
  if ((m = MZ.exec(u))) return 'a' + m[1] + m[2];
  if ((m = /^https:\/\/i\.scdn\.co\/image\/ab67616d00001e02([0-9a-f]+)$/.exec(u))) return 's' + m[1];
  return 'u' + u;
}
// 解碼＝content.js C.attachMedia 那一套（改這裡要一起改那裡；下面每張都驗編了再解＝原網址）
function coverOf(k) {
  k = String(k || ''); const t = k[0], r = k.slice(1);
  if (t === 'c') return CAA + 'release/' + r + '/front-250';
  if (t === 'g') return CAA + 'release-group/' + r + '/front-250';
  if (t === 'C') { const i = r.indexOf('/'); return CAA + 'release/' + r.slice(0, i) + '/' + r.slice(i + 1) + '-250.jpg'; }
  if (t === 'a') return 'https://is' + r[0] + '-ssl.mzstatic.com/image/thumb/' + r.slice(1) + '/300x300bb.jpg';
  if (t === 's') return SCDN + r;
  if (t === 'u') return r;
  return '';
}
const previewCode = u => String(u || '').indexOf(PREVIEW_BASE) === 0 ? u.slice(PREVIEW_BASE.length) : String(u || '');
const previewOf = k => !k ? '' : /^https:\/\//.test(k) ? k : PREVIEW_BASE + k;
const COVER_HOST = /^(coverartarchive\.org|is[1-5]-ssl\.mzstatic\.com|i\.scdn\.co)$/;
function bakePool() {
  const probs = [];
  const rows = Array.isArray(POOL_LIST.rows) ? POOL_LIST.rows : [];
  if (!rows.length) probs.push('POOL-LIST-EMPTY tools/pool-list.json 沒有 rows');
  // 核心（deck-lists 推的那一份；跟 cards.js 同一組 catalogId）：新卡不准撞
  const coreIds = new Set(Object.keys(cards));
  const seedExact = new Map();
  for (const r of seed) { const k = r[0] + '\u0000' + r[1]; if (!seedExact.has(k)) seedExact.set(k, r); }
  const seen = new Set(), out = [];
  for (const row of rows) {
    const [a, b, bin, region0, thumb0, preview] = row;
    const tag = a + '|' + b;
    const r = seedExact.get(a + '\u0000' + b);
    if (!r) { probs.push('MISSING-IN-SEED ' + tag + '（pool-list.json 的藝人＋專輯要等於 seed_cards.json 原字串）'); continue; }
    const [artist, album, c, o, h, genres, year, , tier] = r;
    const id = catalogId(artist, album);
    if (tier) probs.push('POOL-APEX ' + tag + '（seed tier=' + tier + '；頂點卡不進精選池）');
    if (coreIds.has(id)) probs.push('POOL-DUP-CORE ' + id + '（核心 cards.js 已有；pool-list.json 只收核心以外的）');
    if (seen.has(id)) probs.push('POOL-DUP ' + id); seen.add(id);
    const tune = tuneOf(artist, album);
    if (!tune) probs.push('NO-TUNE ' + tag + '（data/mood/card-moods.json 查不到；catalogId=' + id + '）');
    const region = REGION_OVERRIDE[id] || region0;
    if (!['tw', 'jp', 'zh', 'xx'].includes(region)) probs.push('POOL-REGION ' + id + ' region=' + region);
    if (![c, o, h].every(x => Number.isInteger(x) && x >= 1 && x <= 5)) probs.push('POOL-STARS ' + id + ' ' + [c, o, h].join('/') + '（非頂點卡每軸 1–5 星）');
    const card = { id, artist, album, year, genres: genres || [], region, c, o, h, tier: null, subs: subsOf(artist, album) };
    const M = BIN_RULES[bin];
    if (!M || !M.rule) probs.push('POOL-BIN ' + id + ' bin=' + bin + '（deck-lists.json _bins 沒有這個箱）');
    else { const miss = ruleMisses(M.rule, card); if (miss.length) probs.push('POOL-BIN-RULE ' + bin + ' ' + id + ' ' + miss.join(',')); }
    const rar = rarityOf(card);
    if (bin === 'feature' ? !['epic', 'legendary'].includes(rar) : !['common', 'rare', 'uncommon'].includes(rar)) probs.push('POOL-RARITY ' + bin + ' ' + id + ' ' + rar);
    const thumb = rewrite(thumb0);
    let host = ''; try { const U = new URL(thumb); host = U.protocol === 'https:' ? U.hostname : ''; } catch (_) { host = ''; }
    if (!COVER_HOST.test(host)) probs.push('POOL-COVER-HOST ' + id + ' ' + thumb);
    if (!/^https:\/\/audio-ssl\.itunes\.apple\.com\//.test(String(preview || ''))) probs.push('POOL-PREVIEW ' + id + ' ' + preview);
    const cc = coverCode(thumb), pc = previewCode(preview);
    if (coverOf(cc) !== thumb || previewOf(pc) !== preview) probs.push('POOL-MEDIA-CODE ' + id + '（編碼再解碼對不上：' + thumb + '）');
    out.push({ artist, album, year, c, o, h, bin, tune, genres: genres || [], region, cc, pc });
  }
  if (probs.length) {
    console.log('POOL PROBLEMS (' + probs.length + '):'); probs.slice(0, 200).forEach(p => console.log('  ' + p));
    if (probs.length > 200) console.log('  …（另 ' + (probs.length - 200) + ' 條）');
    console.log('cards-pool.js / cards-media.json NOT written.');
    return false;
  }
  // 表：曲風、頻率排序；箱＝_bins 的順序；地區固定；藝人照第一次出現的順序
  const G = [...new Set(out.flatMap(x => x.genres))].sort();
  const K = Object.keys(BIN_RULES);
  const T = [...new Set(out.map(x => x.tune))].sort();
  const R = ['jp', 'tw', 'xx', 'zh'];
  const A = [...new Set(out.map(x => x.artist))];
  const ai = new Map(A.map((a, i) => [a, i]));
  const mrow = out.map(x => [x.cc, x.pc]);
  const J = v => JSON.stringify(v);
  const lines = a => '[\n' + a.map(J).join(',\n') + '\n]';
  const art = out.map((x, i) => ai.get(x.artist) - (i ? ai.get(out[i - 1].artist) : 0));
  const body = '"n":' + out.length + ',\n"G":' + J(G) + ',\n"K":' + J(K) + ',\n"T":' + J(T) + ',\n"R":' + J(R) + ',\n"A":' + lines(A) +
    ',\n"art":' + J(art) + ',\n"alb":' + lines(out.map(x => x.album)) + ',\n"year":' + J(out.map(x => x.year)) +
    ',\n"c":' + J(out.map(x => x.c)) + ',\n"o":' + J(out.map(x => x.o)) + ',\n"h":' + J(out.map(x => x.h)) +
    ',\n"bin":' + J(out.map(x => K.indexOf(x.bin))) + ',\n"tune":' + J(out.map(x => T.indexOf(x.tune))) +
    ',\n"gen":' + J(out.map(x => x.genres.map(g => G.indexOf(g)))) + ',\n"reg":' + J(out.map(x => R.indexOf(x.region)));
  const mbody = '"rows":[\n' + mrow.map(J).join(',\n') + '\n]';
  const v = crypto.createHash('sha1').update(body + '\n' + mbody).digest('hex').slice(0, 8);
  const binN = {}; for (const x of out) binN[x.bin] = (binN[x.bin] || 0) + 1;
  const kinds = {}; for (const x of out) kinds[x.cc[0]] = (kinds[x.cc[0]] || 0) + 1;
  const poolJs = `/* cards-pool.js：由 tools/bake-cards.mjs --pool-only 產生，請勿手改（改名單＝回 v5/pool5k 工具重產 tools/pool-list.json，再重烘）。
 * 精選新卡 ${out.length} 張（精選 5,000 張扣掉核心 cards.js 已有的）的邏輯＋名字；封面／試聽在 cards-media.json（標題畫好後才抓），平台連結不烘。
 * content.js 展開成 C.cards（鍵＝catalogId；pool: true）：{ id, artist, album, year, genres, region, c, o, h, tier: null, coverUrl: null, localCover: null,
 *   previewUrl: '', tags, pitch: null, tune, bin, pool: true }。v＝內容雜湊（C.poolVersion；cards-media.json 的 v 要一樣才套）。
 * 照欄存（第 i 張＝各欄第 i 個；順序＝tools/pool-list.json，照 catalogId）：art＝藝人索引(A) 跟上一張的差、alb 專輯、year、c 經典、o 冷門、h 硬蕊、
 *   bin 箱索引(K)、tune 頻率索引(T)、gen [曲風索引(G)…]、reg 地區索引(R)。
 * 箱：${K.map(k => k + ' ' + (binN[k] || 0)).join('、')}
 */
(function (root, factory) {
  var pool = factory();
  if (typeof module === 'object' && module.exports) module.exports = pool;
  else root.DipLabPool = pool;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return {"v":${J(v)},${body}};
});
`;
  const mediaJson = '{"v":' + J(v) + ',\n' + mbody + '}\n';
  fs.writeFileSync(path.join(LAB, 'cards-pool.js'), poolJs);
  fs.writeFileSync(path.join(LAB, 'cards-media.json'), mediaJson);
  console.log('wrote cards-pool.js:', out.length, 'cards, v=' + v, '(' + (poolJs.length / 1024).toFixed(1) + ' KB raw)');
  console.log('wrote cards-media.json:', out.length, 'rows (' + (mediaJson.length / 1024).toFixed(1) + ' KB raw); covers', Object.entries(kinds).map(([k, n]) => k + ' ' + n).join('、'));
  return true;
}
if (POOL_ONLY) process.exit(bakePool() ? 0 : 1);

async function batchGetCovers(ids) {
  const FS = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents';
  const name = id => 'projects/price-manager-e8846/databases/(default)/documents/card_catalog/' + catalogId(cards[id].artist, cards[id].album);
  const out = {};
  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    const r = await fetch(FS + ':batchGet', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documents: chunk.map(name), mask: { fieldPaths: ['coverUrl'] } }) });
    if (!r.ok) throw new Error('batchGet HTTP ' + r.status);
    const byName = {};
    for (const x of await r.json()) if (x.found) byName[x.found.name] = (x.found.fields && x.found.fields.coverUrl && x.found.fields.coverUrl.stringValue) || '';
    for (const id of chunk) {
      // Firestore 回傳的 name 不一定跟送出的字串同樣編碼，兩種都比
      const n = name(id);
      out[id] = byName[n] != null ? byName[n] : (Object.entries(byName).find(([k]) => decodeURIComponent(k) === n) || [])[1] || '';
    }
  }
  return out;
}

async function itunesCover(id) {
  const a = appleIdOf[id]; if (!a) return '';
  try {
    const r = await fetch('https://itunes.apple.com/lookup?id=' + a.id + '&country=' + (a.cc || 'US').toLowerCase());
    if (!r.ok) return '';
    const j = await r.json(); const x = (j.results || [])[0];
    return x && x.artworkUrl100 ? x.artworkUrl100.replace(/\/\d+x\d+bb\.(jpg|png)$/, '/300x300bb.$1') : '';
  } catch (e) { return ''; }
}

async function probe(url, kind) {
  // kind: 'image' | 'audio'
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 25000);
  try {
    const r = await fetch(url, { redirect: 'follow', signal: ctl.signal, headers: kind === 'audio' ? { Range: 'bytes=0-2047' } : {} });
    const ct = r.headers.get('content-type') || '';
    try { await r.body.cancel(); } catch (e) {}
    const okType = kind === 'image' ? /^image\//.test(ct) : /^(audio\/|video\/mp4|application\/octet-stream)/.test(ct);
    return { ok: (r.status === 200 || r.status === 206) && okType, status: r.status, ct };
  } catch (e) { return { ok: false, status: 0, ct: String(e.name || e) }; }
  finally { clearTimeout(t); }
}
async function pool(items, n, fn) {
  const out = new Array(items.length); let k = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (k < items.length) { const i = k++; out[i] = await fn(items[i], i); } }));
  return out;
}

if (REUSE) {
  // 只補連結／只修本機封面：拿現有的 cards.js（試聽、推薦語都不動；封面只重跑縮圖 rewrite）
  const { createRequire } = await import('module');
  const existing = createRequire(import.meta.url)(path.join(LAB, 'cards.js'));
  for (const k of Object.keys(cards)) delete cards[k];
  problems.length = 0;
  // 鍵一律用藝人／專輯重算成 catalogId（第 B 波：舊 slug 鍵的 cards.js 也吃；順序照舊）；封面照新的 rewrite 再縮一次（覆寫的下面另套，不跑）
  for (const v of Object.values(existing)) {
    const id = catalogId(v.artist, v.album);
    if (cards[id]) { problems.push('REUSE-DUP ' + id + '（cards.js 兩張算出同一個 catalogId）'); continue; }
    const coverUrl = COVER_OVERRIDES[id] ? v.coverUrl : (rewrite(v.coverUrl) || null);
    cards[id] = Object.assign({}, v, { id, coverUrl, subs: subsOf(v.artist, v.album), tune: tuneOf(v.artist, v.album) });
  }
  for (const [k, v] of Object.entries(cards)) if (!v.tune) problems.push('NO-TUNE ' + k + '（data/mood/card-moods.json 查不到；catalogId=' + catalogId(v.artist, v.album) + '）');
}
const ids = Object.keys(cards);
// 箱子 bin（第 B 波 SPEC-B §1.4）：在 bin_<key> 組的卡＝那個 key（各區不重疊歸 buildBins 的 BIN-OVERLAP 擋）；不在箱子的不寫
for (const id of ids) {
  const g = (groupsOf[id] || []).find(x => x.startsWith('bin_'));
  if (g) cards[id].bin = g.slice(4); else delete cards[id].bin;
}
const fsCovers = REUSE ? {} : await batchGetCovers(ids);
if (!REUSE) for (const id of ids) {
  const c = cards[id];
  c.coverUrl = rewrite(fsCovers[id]) || null;
  const f = coverSlug(c.artist, c.album) + '.jpg';
  if (fs.existsSync(ROOT + 'art/covers/' + f) && !LOCAL_COVER_SKIP[id]) c.localCover = '../art/covers/' + f;
}
for (const id of Object.keys(LOCAL_COVER_SKIP)) {
  if (!cards[id]) continue;
  cards[id].localCover = null;
  if (!cards[id].coverUrl) problems.push('LOCAL-COVER-SKIPPED-BUT-NO-REMOTE ' + id);
}
// 封面覆寫：三條路都套（見檔頭）；卡池裡沒有的覆寫只提醒（卡移出卡池時不必同時刪覆寫）
const OVERRIDDEN = new Set();
for (const [id, o] of Object.entries(COVER_OVERRIDES)) {
  if (!cards[id]) { console.log('cover-override for a card not in the pool (ignored): ' + id); continue; }
  if (!o || !/^https:\/\//.test(String(o.coverUrl || ''))) { problems.push('BAD-COVER-OVERRIDE ' + id + '（coverUrl 要是 https 網址）'); continue; }
  cards[id].coverUrl = o.coverUrl; cards[id].localCover = null; OVERRIDDEN.add(id);
}

const report = { coversOk: 0, coverFallback: [], coverFail: [], previewOk: 0, previewFail: [], caaSwapped: [], overridden: 0 };
// 覆寫的封面（CAA／archive.org 偶爾 500 或斷線）：最多試三次
async function probeOverride(url) { let r = { ok: false }; for (let k = 0; k < 3 && !r.ok; k++) r = await probe(url, 'image'); return r; }
if (LINKS_ONLY) {
  // 跳過封面／試聽驗證
} else if (COVERS_ONLY) {
  // 只驗改用遠端的那幾張＋覆寫的封面
  if (VERIFY) await pool(Object.keys(LOCAL_COVER_SKIP).concat([...OVERRIDDEN]).filter((id, i, a) => a.indexOf(id) === i), 6, async id => {
    if (!cards[id] || !cards[id].coverUrl) return;
    const res = OVERRIDDEN.has(id) ? await probeOverride(cards[id].coverUrl) : await probe(cards[id].coverUrl, 'image');
    if (res.ok) report.coversOk++; else report.coverFail.push(id + ' ' + cards[id].coverUrl + ' → ' + res.status + ' ' + (res.ct || ''));
  });
} else if (VERIFY) {
  await pool(ids, 6, async id => {
    const c = cards[id];
    if (OVERRIDDEN.has(id)) {   // 覆寫的封面：不換 Apple、打不開就失敗（不退回 iTunes）
      const res = await probeOverride(c.coverUrl);
      if (res.ok) { report.coversOk++; report.overridden++; } else report.coverFail.push(id + ' ' + c.coverUrl + ' → ' + res.status + ' ' + (res.ct || '') + '（cover-overrides.json）');
      if (c.previewUrl) { const p = await probe(c.previewUrl, 'audio'); if (p.ok) report.previewOk++; else report.previewFail.push(id + ' → ' + p.status + ' ' + p.ct); }
      return;
    }
    // CAA／archive.org 封面要先轉址兩次、2–3 秒、偶爾回 500 或斷線；Apple 有同一張專輯的 300px 封面就改用它（快、穩）
    if (c.coverUrl && /coverartarchive\.org|archive\.org/.test(c.coverUrl)) {
      const alt = await itunesCover(id);
      const r0 = alt ? await probe(alt, 'image') : { ok: false };
      if (r0.ok) { report.caaSwapped.push(id); c.coverUrl = alt; }
    }
    let res = c.coverUrl ? await probe(c.coverUrl, 'image') : { ok: false, status: 'none' };
    if (!res.ok) {
      const alt = await itunesCover(id);
      const r2 = alt ? await probe(alt, 'image') : { ok: false };
      if (r2.ok) { report.coverFallback.push(id + ' (' + (c.coverUrl || 'no coverUrl') + ' ' + res.status + ' → iTunes)'); c.coverUrl = alt; res = r2; }
    }
    if (res.ok) report.coversOk++;
    else if (c.localCover) { report.coverFallback.push(id + ' (remote failed, localCover only)'); c.coverUrl = null; report.coversOk++; }
    else report.coverFail.push(id + ' ' + (c.coverUrl || '(no coverUrl)') + ' → ' + res.status + ' ' + (res.ct || ''));
    if (c.previewUrl) {
      const p = await probe(c.previewUrl, 'audio');
      if (p.ok) report.previewOk++; else report.previewFail.push(id + ' → ' + p.status + ' ' + p.ct);
    }
  });
} else {
  for (const id of ids) if (!cards[id].coverUrl && !cards[id].localCover) report.coverFail.push(id + ' (no coverUrl)');
}
for (const x of report.coverFail) problems.push('NO-WORKING-COVER ' + x);
for (const x of report.previewFail) problems.push('PREVIEW-UNREACHABLE ' + x);

// ---- 四平台連結（v2）----
async function getJson(url, ms) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms || 15000);
  try { const r = await fetch(url, { signal: ctl.signal }); return r.ok ? await r.json() : {}; } catch (e) { return {}; } finally { clearTimeout(t); }
}
const loose = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '').replace(/^the\s+/, '').replace(/[^a-z0-9]+/g, '');
// 子網域對得上藝人、專輯 slug 去掉「再版／豪華版／年份」之後要等於專輯名（例：the-ascension-the-sequel ≠ The Ascension）
const BC_EXTRA = /^(?:\d+|th|st|nd|rd|remastered|remaster|deluxe|edition|anniversary|reissue|expanded|version|contemporaryrecords|records)*$/;
function bandcampMatches(url, artist, album) {
  const m = /^https?:\/\/([a-z0-9-]+)\.bandcamp\.com\/album\/([a-z0-9-]+)/i.exec(String(url || '')); if (!m) return false;
  const sub = m[1].toLowerCase().replace(/-/g, ''), a = loose(artist);
  if (!a) return false;
  const artistOk = a.length < 4 ? sub === a : (sub.includes(a) || a.includes(sub) || (a.length >= 6 && sub.includes(a.slice(0, 6))));
  if (!artistOk) return false;
  const slug = m[2].toLowerCase().replace(/-/g, ''), al = loose(album);
  if (!al || slug.indexOf(al) < 0) return false;
  return BC_EXTRA.test(slug.replace(al, '').replace(/^the/, ''));
}
// 平台連結逐張覆寫：{卡片 id: {appleUrl?, spotifyUrl?, bandcampUrl?}}；'' ＝不給那個鈕（唱片資訊退回搜尋連結）
const LINK_OVERRIDES = {
  // 審查 11-13：/bandcamp-search 回的 themilesdavisquintet.bandcamp.com 是第三方的 50 週年 K2 CD 再版頁，不是原版、也不是唱片公司官方
  "miles davis|cookin' with the miles davis quintet": { bandcampUrl: '' },
  // 11-17 稽核（batch-progress/spotify-fallback-20261117；#467）：KV 沒有、主線判讀為同一錄音的，固定保留
  'goblin|profondo rosso': { spotifyUrl: 'https://open.spotify.com/album/2NoDQ9XSGdio43xMKm6rM8' },
  'glenn gould & leonard bernstein|brahms: piano concerto no. 1 (1962)': { spotifyUrl: 'https://open.spotify.com/album/4SDwjgfk4ZSdDEt9k96thp' },
  // 11-17 稽核（#467）：舊 /spotify-album-link 退路烘進的錯張，固定不給鈕。#467 在 cards.js 直接刪；
  // 這裡也寫死，REUSE 路（--covers-only／--links-only 讀現有 cards.js）從舊檔重烘才不會把錯連結帶回來。
  'john zorn|cobra': { spotifyUrl: '' },                              // → 《Cobra-Tokyo Operations '94》
  'glenn branca|the ascension': { spotifyUrl: '' },                   // → 《The Ascension: The Sequel》
  'arthur rubinstein|chopin: nocturnes': { spotifyUrl: '' },          // → 夜曲＋船歌＋搖籃曲合輯
  'einojuhani rautavaara|cantus arcticus': { spotifyUrl: '' },        // → 1997 另錄（鋼協 1、交響曲 3）
  'harry roesli|ken arok': { spotifyUrl: '' },                        // → 《Opera Rock Ken Arok》，不確定同一張
};
function applyLinkOverrides(cards) {
  let n = 0;
  for (const [id, o] of Object.entries(LINK_OVERRIDES)) {
    if (!cards[id]) { console.log('LINK_OVERRIDES：' + id + ' 不在這次的卡裡（跳過）'); continue; }
    for (const k of ['appleUrl', 'spotifyUrl', 'bandcampUrl']) if (k in o) cards[id][k] = o[k];
    n++;
  }
  return n;
}
async function bakeLinks(cards, ids) {
  const stat = { apple: 0, spotify: 0, bandcamp: 0 };
  for (const id of ids) {
    const c = cards[id];
    const ap = apple[norm(c.artist) + '\u0000' + norm(c.album)] || [];
    c.appleUrl = (ap[0] && ap[1]) ? 'https://music.apple.com/' + String(ap[0]).toLowerCase() + '/album/' + encodeURIComponent(ap[3] || 'album') + '/' + ap[1] : '';
    if (c.appleUrl) stat.apple++;
  }
  await pool(ids, 4, async id => {
    const c = cards[id];
    const q = 'artist=' + encodeURIComponent(c.artist) + '&album=' + encodeURIComponent(c.album);
    // 只用 /spotify-search（KV、藝人＋專輯名比對、MB 覆核）。2026-11-17 拿掉 /spotify-album-link 退路：
    // 它只比藝人、不比專輯名，取同藝人第一張就回，烘進了 John Zorn《Cobra》→《Cobra-Tokyo Operations '94》、
    // Glenn Branca《The Ascension》→《The Sequel》等錯張（店主截圖回報）。查不到就不給鈕，寧缺勿錯。
    const sp = (await getJson(WORKER + '/spotify-search?' + q)).spotifyUrl || '';
    c.spotifyUrl = /^https:\/\/open\.spotify\.com\/album\//.test(sp) ? sp : '';
    const bc = (await getJson(WORKER + '/bandcamp-search?' + q, 25000)).bandcampUrl || '';
    c.bandcampUrl = bandcampMatches(bc, c.artist, c.album) ? bc : '';
    if (c.spotifyUrl) stat.spotify++; if (c.bandcampUrl) stat.bandcamp++;
  });
  console.log('links: apple', stat.apple + '/' + ids.length, ' spotify', stat.spotify, ' bandcamp', stat.bandcamp);
}
if (!COVERS_ONLY) await bakeLinks(cards, ids);
console.log('link overrides:', applyLinkOverrides(cards), '(LINK_OVERRIDES)');

// ---- 寫檔 ----
const FIELDS = ['id', 'artist', 'album', 'year', 'genres', 'region', 'c', 'o', 'h', 'tier', 'coverUrl', 'localCover', 'previewUrl', 'tags', 'pitch', 'gold', 'appleUrl', 'spotifyUrl', 'bandcampUrl', 'subs', 'tune', 'bin'];
const OPTIONAL = new Set(['gold', 'appleUrl', 'spotifyUrl', 'bandcampUrl', 'subs', 'bin']);
const lines = ids.map(id => {
  const c = cards[id]; const o = {};
  for (const k of FIELDS) if (!OPTIONAL.has(k) || (Array.isArray(c[k]) ? c[k].length : c[k])) o[k] = c[k];
  return '    ' + JSON.stringify(id) + ': ' + JSON.stringify(o);
});
const groupsSummary = Object.entries(lists).filter(([g]) => !g.startsWith('_')).map(([g, arr]) => g + ' ' + arr.length).join('、');
const js = `/* cards.js：由 tools/bake-cards.mjs 產生，請勿手改（改 tools/deck-lists.json 或 tools/pitches.json 後重跑）。
 *   node game-lab/tools/bake-cards.mjs
 * 鍵＝卡片 id＝主站 catalogId（藝人|專輯 小寫、斜線換 -；第 B 波起）；bin＝在哪個策展箱（不在箱子的不寫）。
 * ${ids.length} 張；三軸＝seed 原值（王牌改 7/1/1 系列）；封面＝Firestore card_catalog 預烘（CAA front-250／scdn 300px／mzstatic 300x300bb），
 * 本機有的另給 localCover；tools/cover-overrides.json 的卡用覆寫的原版封面（不給 localCover）；previewUrl＝Apple 固定試聽；
 * appleUrl／spotifyUrl／bandcampUrl＝唱片資訊的平台鈕（有就烘）；subs＝card-subgenres.json 的子曲風路徑（箱子規則 sub 用，有就烘）。
 * tune＝data/mood/card-moods.json（_v ${MOODS._v}、_built ${MOODS._built}）判的八格頻率（跟主站頻率光譜同一格；只上色、不進戰鬥規則）：${(() => { const n = {}; for (const id of ids) n[cards[id].tune] = (n[cards[id].tune] || 0) + 1; return Object.entries(n).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' ' + v).join('、'); })()}。
 * 分組：${groupsSummary}
 */
(function (root, factory) {
  var cards = factory();
  if (typeof module === 'object' && module.exports) module.exports = cards;
  else root.DipLabCards = cards;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return {
${lines.join(',\n')}
  };
});
`;
const BINS = buildBins();
problems.push(...BINS.probs);
const binsJs = `/* bins.js：由 tools/bake-cards.mjs 產生，請勿手改（改 tools/deck-lists.json 的 bin_<key>／_bins 或 shops/dip.json 的封面後重跑）。
 *   node game-lab/tools/bake-cards.mjs          （只改了店裡的封面：--covers-only 也會重寫 bins.js）
 * FIXLIST 4／5（X／Y 契約）：shops.<shop>.<key> = { key, label（名牌英文）, zh（點了掛的中文全名）, rule, pool（卡池）, front（店裡畫出來的封面，照道具順序） }。
 * 分類＝第一個曲風標籤對到十大類、台灣地區一律 tw；citypop／indierock／indiepop＝子曲風（rule.sub，卡的 subs；v5 店面改版）；new／picks 不限分類；feature＝史詩＋傳奇。每一區都賣（沒有 display）。
 * ${Object.entries(BINS.dip).map(([k, v]) => k + ' ' + v.pool.length + '（看得到 ' + v.front.length + '）').join('、')}
 */
(function (root, factory) {
  var bins = factory();
  if (typeof module === 'object' && module.exports) module.exports = bins;
  else root.DipLabBins = bins;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return {
    version: 5,
    shops: {
      dip: {
${Object.entries(BINS.dip).map(([k, v]) => '        ' + JSON.stringify(k) + ': ' + JSON.stringify(v)).join(',\n')}
      }
    }
  };
});
`;
if (problems.length) {
  console.log('PROBLEMS (' + problems.length + '):'); problems.forEach(p => console.log('  ' + p));
  console.log('cards.js / bins.js NOT written.'); process.exitCode = 1;
} else {
  fs.writeFileSync(path.join(LAB, 'cards.js'), js);
  fs.writeFileSync(path.join(LAB, 'bins.js'), binsJs);
  console.log('wrote cards.js:', ids.length, 'cards');
  console.log('wrote bins.js:', Object.keys(BINS.dip).length, 'sections,', Object.values(BINS.dip).reduce((n, v) => n + v.pool.length, 0), 'slots');
  // 完整烘焙：最後也烘精選新卡（同一支程式、同一個 v 規則）；--covers-only／--links-only 不碰 pool 檔
  if (!REUSE && !bakePool()) process.exitCode = 1;
}
console.log('covers verified:', VERIFY ? report.coversOk + '/' + ids.length : 'skipped', ' previews verified:', VERIFY ? report.previewOk : 'skipped');
console.log('local covers:', ids.filter(id => cards[id].localCover).length, ' gold:', ids.filter(id => cards[id].gold).length);
if (report.caaSwapped.length) console.log('CAA/archive.org → Apple 300px:', report.caaSwapped.length, 'cards');
console.log('cover overrides:', OVERRIDDEN.size, '(tools/cover-overrides.json)');
if (report.coverFallback.length) { console.log('cover fallbacks:'); report.coverFallback.forEach(x => console.log('  ' + x)); }
