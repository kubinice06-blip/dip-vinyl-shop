// พุ่มพวง ดวงจันทร์《ลำเพลิน พุ่มพวง ดวงจันทร์》的身分更正。
// 用法：node batch-progress/csea/fix-lamphloen.mjs [--write]
//
// **這張不是廠牌寫錯，是卡片與它釘住的 MBID 描述的不是同一張唱片。**
//
// 卡單原本：year 1979、label「Asona Promotion（2017 年由 EM Records 復刻）」、
// rgMbid 430d1db9。但 430d1db9 在 MB 上的 first-release-date 是 2017-07-26，
// 而研究層查出 EM 那張**根本不是 1979 年原盤的復刻**——十軌裡七軌來自 2522（1979）
// 那張、三軌來自 2528（1985）的《พุ่มพวง 85》。也就是說卡片宣稱 1979，
// 釘住的卻是一張 2017 年、內容橫跨兩張原盤的選輯。
//
// 我逐一查過該藝人名下的六筆 release-group（artist 6b3c73bc 的 browse），
// **MB 上沒有 1979 年原盤的條目**，只有這一筆 2017 的。所以「改釘原盤」這條路
// 走不通（§1 的 MBID 是硬規則，不能留空）。與 Joey Ayala 那張同型，
// 但這張更嚴重——Joey Ayala 至少內容相同、只是版本晚，這張連曲目都不一樣。
//
// **裁定：把卡片改成誠實描述 EM Records 這張 2017 年選輯。**
// year 2017、label EM Records、走 ALBUM_ONBOARDING §5.6 的合輯例外
// （2026-08-21 店主核定、全曲風開放）。原盤 1979 與 1985 的來歷寫進正文。
//
// 注意 MB 沒有把 430d1db9 標成 Compilation（secondary-types 是空的），
// 所以 §5.6 的舉證要靠 exceptionEvidenceUrls，不能指望驗證器從 MB 讀到。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const write = process.argv.includes('--write');
const KEY = 'พุ่มพวง ดวงจันทร์';
let hit = 0;

for (const s of ['cards', 'a', 'b', 'c', 'd', 'e']) {
  const p = path.join(ROOT, `desc-tools/batches/cards/cseac-${s}.json`);
  if (!fs.existsSync(p)) continue;
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  const c = rows.find(x => x.artist === KEY && x.album.includes('ลำเพลิน'));
  if (!c) continue;

  // 前提檢查：這支腳本假設卡片還是「year 1979 ＋ 釘 430d1db9」那個不自洽的狀態。
  // 若已經被改過就不要再動，免得蓋掉別人的判斷。
  if (c.year === 2017) { console.log(`${path.basename(p)}：已是更正後的狀態，略過`); continue; }
  if (c.year !== 1979 || c.rgMbid !== '430d1db9-ea90-469e-9f6b-41a02d5761f5')
    throw new Error(`${p} 的狀態不符預期（year=${c.year} rgMbid=${c.rgMbid}），停手`);

  c.year = 2017;
  c.label = 'EM Records';
  c.releaseType = 'Compilation';
  c.exceptionReason = '日本 EM Records 2017 年首次把 พุ่มพวง ดวงจันทร์ 的早期 luk thung 錄音帶出泰國發行，選曲、解說與美術由 Soi48 負責，母帶由 Takuto Kuratani 重製，是這批錄音第一次在泰國以外流通。';
  c.exceptionEvidenceUrls = [
    'https://musicbrainz.org/release-group/430d1db9-ea90-469e-9f6b-41a02d5761f5',
    'https://th.wikipedia.org/wiki/พุ่มพวง_ดวงจันทร์',
  ];
  c.mbNote = [c.mbNote || '',
    '【主線身分更正】卡單原記 year 1979、label Asona Promotion，兩者皆不成立：'
    + '研究層查出泰文維基本傳明載她 2525（1982）才進 อโซน่า，這張不在該廠名下；'
    + '而釘住的 release-group 430d1db9 的 first-release-date 是 2017-07-26，'
    + '且 EM 那張十軌裡有三軌來自 2528（1985）的《พุ่มพวง 85》，並非 1979 原盤的復刻。'
    + '已逐一 browse 該藝人名下六筆 release-group，MB 無 1979 原盤條目，改釘原盤這條路不通。'
    + '故本卡改為誠實描述 EM Records 這張 2017 年選輯，走 §5.6 合輯例外；'
    + '1979 與 1985 兩張原盤的來歷由正文承載。'
    + '（MB 未把本 group 標成 Compilation，§5.6 的舉證不能指望驗證器從 MB 讀到。）',
  ].filter(Boolean).join('｜');

  hit++;
  console.log(`${path.basename(p)}｜${KEY}《ลำเพลิน》：1979／Asona → 2017／EM Records（§5.6 合輯例外）`);
  if (write) fs.writeFileSync(p, JSON.stringify(rows, null, 1));
}
console.log(`\n共更正 ${hit} 處${write ? '（已寫檔）' : '（dry-run，加 --write 才寫）'}`);
