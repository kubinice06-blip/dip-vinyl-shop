// 2026-08-29 店主裁決的落實。店主指示：克卜勒不進殿堂、陶喆只留同名專輯，
// 其餘由我逕行判斷不必再問。以下每一條都寫明依據，讓本機能複查而不是照單全收。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const write = process.argv.includes('--write');
const log = [];

// ── 1. 候選檔的逐卡裁決 ──────────────────────────────
// 年份的取捨原則：實體佐證（唱片編號、條碼）勝過條目敘述；
// 同一來源內部矛盾時，版本表勝過導言（導言最常沿用舊說）。
const RULINGS = {
  '孫燕姿|克卜勒': a => {
    a.apexCandidate.eligible = false;
    a.apexCandidate.tier = null;
    a.apexCandidate.reason = '【2026-08-29 店主裁決：不進殿堂】協會 2014 年度十大專輯與十大單曲雙榜、第 19 屆新加坡金曲獎最佳專輯皆查證屬實，但本作未進回溯型正典名單、亦無獨立樂評來源，依 §3 的跨來源長期共識門檻判為一般卡。原查證內容保留於 evidenceUrls 供日後覆核。';
    return '孫燕姿《克卜勒》：hall → 一般卡（店主裁決）';
  },
  '白光|百代中國時代曲名典20：白光 如果沒有你': a => {
    a.suggestedYear = 1948;
    a.yearNote += '｜【2026-08-29 主線裁決：1942 → 1948】原值 1942 只有 Apple Music 與百度百科，兩者皆無一手佐證。多方來源把〈如果沒有你〉繫為電影《柳浪聞鶯》插曲，而中文維基〈張露〉條目**獨立地**把該片繫在 1948 年——若插曲說成立，1942 與片年相差六年、難以並存。改採 1948。仍無標日期的唱片實體佐證，本機取得碟面後可再定。';
    return '白光《名典20》：1942 → 1948';
  },
  '姚莉|百代中國時代曲名典25／26：姚莉 秋的懷念（上海時期歌曲）': a => {
    a.suggestedYear = 1941;
    a.yearNote += '｜【2026-08-29 主線裁決：1940 → 1941】中文維基〈玫瑰玫瑰我愛你〉的**導言**寫 1940，但**同一條目的版本表**註明「唱片應在 1941 年出版」，且 Discogs 的 35500 號原盤標 1941。同一來源內部矛盾時取版本表（導言最常沿用舊說），且與實體編號一致。另注意英文維基把編號記為 B. 597，與 35500 衝突，本機釘版本時請以碟面為準。';
    return '姚莉《名典25／26》：1940 → 1941';
  },
  '李香蘭|百代百年系列5：李香蘭 夜來香': a => {
    a.yearNote += '｜【2026-08-29 主線裁決：維持 1944】研究層查到 Discogs 上百代 78 轉原盤（編號 35610）標 1943，與中文維基的 1944 衝突。維持 1944 的理由：維基給到 1944-07-20 的具體日期，具體度高於 Discogs 的年份欄；而 Discogs 的年份多為貢獻者依編號推估。本機若取得碟面或百代原始編號表可再翻。';
    return '李香蘭《百代百年5》：維持 1944（記下 Discogs 的 1943 異說）';
  },
  '洪一峰|洪一峰典藏集(1)': a => {
    a.yearNote += '｜【2026-08-29 主線裁決：維持 1962】1959 是〈舊情綿綿〉譜曲完成年，1962 是台語電影《舊情綿綿》主題曲與原始錄音流通年，兩者指不同事件。卡片年份代表的是**盤的流通**而非創作，故取 1962，與本批「原盤首發年」的口徑一致。';
    return '洪一峰《典藏集(1)》：維持 1962';
  },
  '陳芬蘭|陳芬蘭典藏集(1)': a => {
    a.yearNote += '｜【2026-08-29 主線裁決：維持 1958】四說之中只有 1958 帶得出唱片編號（亞洲唱片 AL271《流浪的小歌女》，即〈孤女的願望〉首度出盤），其餘三說（1956「8 歲」推算、1959、1960 電影插曲年）皆無編號可繫。1956 說與日語原曲〈花笠道中〉的時序矛盾，不採。**注意**：本卡簡介正文未寫發行年——寫作層查核時事實表無任何可繫到年份的事件，依事實紀律不寫，這是正確處理，非缺漏。';
    return '陳芬蘭《典藏集(1)》：維持 1958（正文仍不寫年份）';
  },
  '葉麗儀|上海灘': a => {
    a.versionNote += '｜【2026-08-29 主線裁決：改歸粵語流行，不歸電影配樂】本作是 1980 年 TVB 電視劇《上海灘》的主題曲專輯，不是電影原聲帶。卡片本身成立且值得收（粵語流行黃金期、顧嘉煇＋黃霑的 TVB 劇集音樂、EMI 香港目錄三條線的起點），僅子域歸類需由本機改掛。';
    return '葉麗儀《上海灘》：子域改歸粵語流行（非電影配樂）';
  },
};

// c-48：Michelangeli 那張的 MB Compilation 標記與事實不符
const RULINGS48 = {
  'Arturo Benedetti Michelangeli|Beethoven / Galuppi / Scarlatti Recital': a => {
    const urls = (a.exceptionEvidenceUrls || []).slice();
    a.secondaryTypes = (a.secondaryTypes || []).filter(t => t !== 'Compilation');
    a.exceptionReason = '';
    a.exceptionEvidenceUrls = [];
    a.versionNote += `｜【2026-08-29 主線裁決：不是選輯，§5.6 例外不適用】MB 把本盤標為 Compilation 與事實不符——這套曲目 1965 年就以**單張原創獨奏會 LP** 發行（Decca SXL 6181／LXT 6181，美版 London CS 6446／CM 9446），曲目與 1988 年 CD 完全相同。已移除 secondaryTypes 的 Compilation 與 §5.6 舉證欄。原舉證網址保留於此供覆核：${urls.join('、')}`;
    return 'Michelangeli《Recital》：移除 Compilation 標記與 §5.6 舉證';
  },
};

for (const [batch, table] of [['c49', RULINGS], ['c48', RULINGS48]]) {
  const dir = path.join(ROOT, 'batch-progress', batch);
  for (const f of fs.readdirSync(dir)) {
    if (!f.startsWith('cand-')) continue;
    const p = path.join(dir, f);
    const j = JSON.parse(fs.readFileSync(p, 'utf8'));
    let dirty = false;
    for (const a of j.albums || []) {
      const fn = table[`${a.artist}|${a.album}`];
      if (fn) { log.push('  ✎ ' + fn(a)); dirty = true; }
    }
    if (dirty && write) fs.writeFileSync(p, JSON.stringify(j, null, 1));
  }
}

// ── 2. apex_pool.json：陶喆只留同名專輯 ────────────────
// ⚠ REMOTE_RUNBOOK 規定雲端不動 apex_pool.json。這一筆是店主 2026-08-29
//   在對話中明確指示的例外，且是純移除、不需封面／試聽／listeners 等本機工項。
const apexPath = path.join(ROOT, 'apex_pool.json');
const apex = JSON.parse(fs.readFileSync(apexPath, 'utf8'));
const KEEP = '陶喆同名專輯';
const before = apex.hall.length;
const removed = apex.hall.filter(r => r[0] === '陶喆' && r[1] !== KEEP);
apex.hall = apex.hall.filter(r => !(r[0] === '陶喆' && r[1] !== KEEP));
log.push(`  ✎ apex_pool hall：移除陶喆 ${removed.length} 張（${removed.map(r => r[1]).join('、')}），保留《${KEEP}》`);
log.push(`      hall ${before} → ${apex.hall.length}`);
if (write) fs.writeFileSync(apexPath, JSON.stringify(apex, null, 1));

console.log(log.join('\n'));
console.log(`\n${write ? '已寫回' : '（乾跑）'}`);
