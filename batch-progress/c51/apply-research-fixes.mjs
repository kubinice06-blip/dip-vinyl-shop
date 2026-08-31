// 研究層查證後推翻卡單的部分，回寫候選檔。
// 用法：node batch-progress/c51/apply-research-fixes.mjs [--write]
//
// 這些不是簡介行文的問題，是**卡片資料本身錯了**——年份、廠牌、序數。
// 不回寫的話，卡單、寫作層輸入與最終上架的 manifest 會一路帶著錯值，
// 而簡介裡寫對、卡片欄位寫錯是最難查的一種不一致。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const FIX = {
  '齊豫|你是我所有的回憶': {
    year: 1983, label: '金聲唱片',
    why: '研究層查證：卡單記 1980 年、新格唱片，curatorWhy 說是《橄欖樹》之後的第二張——三處都錯。實為 1983 年 11 月、金聲唱片、第三張（中間有 1982 年拍譜的《祝福》）。策展層說的「延續李泰祥與三毛的創作班底」也不成立：本張是李泰祥＋侯德健，齊豫與三毛的《回聲》要到 1985 年。（研究層回報時把卡單原值誤述為 1982／滾石，實際原值是 1980／新格唱片；查證結論不受影響。）',
  },
  '蘇芮|驀然回首': {
    year: 1984,
    why: '研究層查證：卡單記 1983，實為 1984 年 1 月。策展層說的「與《蘇芮專輯》同年」不成立（前作 1983-06-18，跨年）。另註：這張沒有一首叫〈驀然回首〉的歌。',
  },
  'Manu Dibango|Africadelic': {
    year: 1972, label: 'Mondiaphone',
    why: '研究層查證：卡單記 1973／Fiesta，實為 1972 年、出品單位是 library music 廠牌 Mondiaphone（原版曲名只是〈Theme No 1〉這類編號）。',
  },
  "Hugh Mundell|Blackman's Foundation": {
    year: 1983, label: 'Shanachie',
    why: '研究層查證：卡單的 1978／Message 查無支持，United Reggae 與 reggaerecord 均記 1983 年、Shanachie，MB 底下兩個 release 也都是 Shanachie。1978 年的 Message 盤是 Mundell 首作《Africa Must Be Free by 1983》（卡池已有），卡單極可能從那張誤帶。另註：本作是 1978–1980 年錄音的彙整，不是一次錄完的錄音室專輯，寫作層要標明。',
  },
  'Machito|With Flute to Boot': {
    year: 1959,
    why: '研究層查證：卡單的 1958 是錄音年（1958 年 11 月錄於紐約 Metropolitan Studios），Roulette R／SR 52026 的發行年是 1959，MusicBrainz 與 Discogs 三筆原版一致。本產線取原盤首發年。',
  },
  'Janko Nilovic|Soul Impressions': {
    year: 1975,
    why: '研究層查證：卡單的 1971 查無任何來源。Discogs 上 Editions Montparnasse 2000（MP 43）原版三筆全標 1975，EX-YU Music 專文同樣寫 1975（MusicBrainz 標 1974）。另：策展層說的「被取樣頻率遠高於其他作品」方向錯了——JAY-Z〈D.O.A.〉取樣的〈In the Space〉出自《Psyc Impressions》（MP 06, 1969）、Dr. Dre《Compton》取樣的是〈Underground Session〉，兩首都不在本張的十二首曲目裡。',
  },
  'X JAPAN|DAHLIA': {
    label: 'Atlantic',
    why: '研究層查證：卡單寫 Polydor，1996 年原盤是 Atlantic 唱片日本分支發行（英文維基 infobox 標 Atlantic Records，原盤型號 AMCM-4271）。Polydor 只出現在後續單曲再版的脈絡。年份 1996-11-04 與 rgMbid 正確。',
  },
  'THE BLUE HEARTS|BUST WASTE HIP': {
    label: 'GARLAND',
    why: '研究層查證：卡單寫 Meldac，那是他們 1987–1989 的廠牌；本作原盤是 East West Japan 體系的 GARLAND（MB：GARLAND／AMCW-4077）。年份 1990-09-10 正確。',
  },
  'Milton Wright|Spaced': {
    year: 1977,
    why: '研究層查證：卡單 year 寫 1976，MB 原盤是 1977 US Alston 4407，WBUR 報導與唱片行商品說明皆寫 1977（1975 是首張《Friends and Buddies》）。卡單自己的 mbFirstRelease 也是 1977，是 year 欄沒跟上。',
  },
  'The Mighty Diamonds|Deeper Roots (Back to the Channel)': {
    year: 1979,
    why: '研究層查證：rgMbid 正確，但該 release-group 底下只掛 2002 年再版、沒有 1979 原盤，所以 mbFirstRelease 顯示 2002。年份要用原盤的 1979（Front Line FLD 6001，Virgin 旗下）。本作是人聲 LP 加同曲目 dub LP 的雙唱片原創作，不是精選包裝。',
  },
  'Michael Stearns|Encounter': {
    label: 'Hearts of Space Records',
    why: '研究層查證：卡單寫 Sonic Atmospheres，1988 年原始發行廠牌是 Hearts of Space Records。Sonic Atmospheres 是他另一張《Planetary Unfolding》1985 年再版的廠牌，被誤植過來。',
  },
  "Piero Umiliani|To-Day's Sound": {
    label: 'Liuto',
    why: '研究層查證：卡單寫 Omicron，1973 年 6 月原版是雙 LP、廠牌 Liuto（編號 LRS 0053-0054）。Omicron 是 Umiliani 目錄裡另一個 library 廠牌。年份 1973-06 正確。',
  },
  '非常階段|King of Noise': {
    year: 1985,
    why: '研究層查證：卡單 year 寫 1982，MB first-release-date 是 1985-05（Alchemy Records ARLP-006），Discogs 另載錄音是 1985 年 2 月大阪與 3 月東京。1982 年的非常階段作品是《蔵六の奇病》。連帶推翻 curatorWhy 的「比卡池已有的 1984 年作更根本」——本作晚於那張一年，寫作層不得寫「起點盤／更早／最初」。',
  },
  'Benny Goodman|Together Again!': {
    year: 1964,
    why: '研究層查證：卡單的 1963 是錄音年（AllMusic 記 1963-02-13 起錄音），MB 首發年是 1964（RCA Victor LSP-2698／LPM-2698，1964 年 1 月發行）。主線裁定：本批一貫取原盤首發年（Machito《With Flute to Boot》同樣把 1958 錄音年改成 1959 首發年），故改 1964。寫作層仍可寫「1963 年重聚錄音」。',
  },
  "Garth Brooks|Ropin' the Wind": {
    label: 'Capitol Records Nashville',
    why: '研究層查證：卡單寫 Liberty。英文維基 infobox 與內文皆記 Capitol Records Nashville，且明寫本作是該廠牌名下的最後一張錄音室專輯。Capitol Nashville 在 1991–1995 年間才改名 Liberty，MB 上 1991-09-10 的美版同時存在兩種壓片標示，Liberty 屬改名後再壓。',
  },
  'Bernard Parmegiani|La Création du monde': {
    year: 1986,
    why: '主線裁定：卡單的 1984 是三樂章完成並完整首演的年份，唱片首發是 1986 年的 INA C 1002（研究層查無 1984 年 LP）。本批一貫取原盤首發年（Machito 1958→1959、Benny Goodman 1963→1964 同此）。古典批那條「年份取錄音年」的例外不套用到這張——那條例外是為「同一作品有許多次演奏、錄音才是這張卡的識別」而設，但電聲作品的母帶本身就是作品，沒有另一次演奏可以標年。卡片顯示的是唱片，取唱片的年。hook 層已把完成／首演與發行分開寫，改年不影響正文。',
  },
  'Univers Zero|Ceux du dehors': {
    label: 'Recommended Records',
    why: '研究層查證：卡單的 Cryonic 查無支持。維基資訊框、Bandcamp 與唱片行均指向 Recommended Records；MB 的 release 清單裡 1981 年法版掛 Atem、1982 年英版掛 Recommended Records，完全沒有 Cryonic。',
  },
  'Masonna|Inner Mind Mystique': {
    label: 'Release Entertainment',
    why: '研究層查證：卡單寫 Relapse，實際發行單位是 Relapse 旗下的實驗支線 Release Entertainment。',
  },
};

const write = process.argv.includes('--write');
const p = path.join(ROOT, 'batch-progress/c51/cand.json');
const j = JSON.parse(fs.readFileSync(p, 'utf8'));
let n = 0;
const missing = [];
for (const [k, f] of Object.entries(FIX)) {
  const [artist, album] = k.split('|');
  const c = j.albums.find(x => x.artist === artist && x.album === album);
  if (!c) { missing.push(k); continue; }
  const before = { year: c.suggestedYear, label: c.label };
  if (f.year) c.suggestedYear = f.year;
  if (f.label) c.label = f.label;
  // 可重複執行：**先把舊的更正註記整段剝掉再重寫**，不能只做 includes 比對——
  // 註記文字改過之後 includes 就抓不到，會把新舊兩份都留著。2026-08-31 實踩，六張中招。
  const stripped = String(c.mbNote || '').split('｜').filter(x => !x.startsWith('【研究層更正】')).join('｜');
  c.mbNote = [stripped, `【研究層更正】${f.why}`].filter(Boolean).join('｜');
  console.log(`${artist} —《${album}》`);
  if (f.year) console.log(`   年份 ${before.year} → ${f.year}`);
  if (f.label) console.log(`   廠牌 ${before.label || '（空）'} → ${f.label}`);
  n++;
}
missing.forEach(k => console.log(`  ⚠ 候選檔裡找不到：${k}`));
console.log(`\n回寫 ${n} 張｜找不到 ${missing.length} 張`);
if (write) { fs.writeFileSync(p, JSON.stringify(j, null, 1)); console.log('已寫回 cand.json'); }
process.exit(missing.length ? 1 : 0);
