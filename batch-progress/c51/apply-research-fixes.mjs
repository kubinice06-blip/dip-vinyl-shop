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
  c.mbNote = [c.mbNote, `【研究層更正】${f.why}`].filter(Boolean).join('｜');
  console.log(`${artist} —《${album}》`);
  if (f.year) console.log(`   年份 ${before.year} → ${f.year}`);
  if (f.label) console.log(`   廠牌 ${before.label || '（空）'} → ${f.label}`);
  n++;
}
missing.forEach(k => console.log(`  ⚠ 候選檔裡找不到：${k}`));
console.log(`\n回寫 ${n} 張｜找不到 ${missing.length} 張`);
if (write) { fs.writeFileSync(p, JSON.stringify(j, null, 1)); console.log('已寫回 cand.json'); }
process.exit(missing.length ? 1 : 0);
