// 試聽比對規則的回歸測試（裁定第 90 條）。用法：node batch-progress/probe/test-match.mjs
// 每一條都是本次擴充實際踩過的案例，改 match-lib.mjs 之前先跑、全過再跑批。
import { titleOk, looseTitleOk, artistOk, looseArtistOk, canon } from './match-lib.mjs';

const T = (want, got, selfTitled = false) => titleOk(want, got, selfTitled) || looseTitleOk(want, got, selfTitled);
const A = (want, got) => artistOk(want, got) || looseArtistOk(want, got);

const cases = [
  ['Moğollar 自我同名 vs Moğollar\'94（c-55 錯配，第 90 條）', T, 'Moğollar', 'Moğollar\'94', true, false],
  ['3 Hür-El 自我同名 vs 1953 Hürel（c-55 錯配，第 90 條）', T, '3 Hür-El', '1953 Hürel', true, false],
  ['Υπάρχω vs Iparho - Gialinos Kosmos 併輯（c-62 誤放，第 77 條）', T, 'Υπάρχω', 'Iparho - Gialinos Kosmos', false, false],
  ['Θητεία vs Thitia (Remastered 2013)（年份在尾綴後）', T, 'Θητεία', 'Thitia (Remastered 2013)', false, true],
  ['Erkin Koray Tutkusu vs (2025 Remastered)（年份在尾綴前）', T, 'Erkin Koray Tutkusu', 'Erkin Koray Tutkusu (2025 Remastered)', false, true],
  ['Ερωτόκριτος vs 30th Anniversary Edition（序數吸收）', T, 'Ερωτόκριτος', 'Ερωτόκριτος - 30th Anniversary Edition', false, true],
  ['Τετραλογία vs Tetralogia (30th Anniversary Edtion)（Apple 拼錯）', T, 'Τετραλογία', 'Tetralogia (30th Anniversary Edtion)', false, true],
  ['Ριζίτικα vs Rizitika (Remastered)', T, 'Ριζίτικα', 'Rizitika (Remastered)', false, true],
  ['Ρωμιοσύνη vs Romiosini (Remastered)（υ→i）', T, 'Ρωμιοσύνη', 'Romiosini (Remastered)', false, true],
  ['Ένα μεσημέρι vs Ena Mesimeri', T, 'Ένα μεσημέρι', 'Ena Mesimeri', false, true],
  ['Άνθρωπε vs Anthrope', T, 'Άνθρωπε', 'Anthrope', false, true],
  ['Akritas 自我同名完全相等 → 放行', T, 'Akritas', 'Akritas', true, true],
  ['Akritas 自我同名 vs Akritas 1973 → 擋', T, 'Akritas', 'Akritas 1973', true, false],
  ['Phos vs Phos', T, 'Phos', 'Phos', false, true],
  ['Türkülerimiz 1 vs Türkülerimiz 1（兩邊都有數字 → 放行）', T, 'Türkülerimiz 1', 'Türkülerimiz 1', false, true],
  ['Dead Man vs Dead Man - Single → 擋（§1 單曲不進）', T, 'Dead Man', 'Dead Man - Single', false, false],
  ['Разлука 西里爾原文相等', T, 'Разлука', 'Разлука', false, true],
  ['Θεοδωράκης vs Mikis Theodorakis & Grigóris Bithikótsis（合掛名放行）', A, 'Μίκης Θεοδωράκης', 'Mikis Theodorakis & Grigóris Bithikótsis', true],
  ['Θεοδωράκης vs Grigóris Bithikótsis 單掛演唱者 → 擋（第 77 條留人工）', A, 'Μίκης Θεοδωράκης', 'Grigóris Bithikótsis', false],
  ['canon：Ρωμιοσύνη → romiosini', s => canon(s), 'Ρωμιοσύνη', 'romiosini'],
  // 2026-09-05 c-96：卷號殘餘（第 140／141／162 條那一族）
  ['Cuban Linx Pt. II vs 第一集 → 擋（卷號殘餘，c-96 實際錯配）', T, 'Only Built 4 Cuban Linx... Pt. II', 'Only Built 4 Cuban Linx...', false, false],
  ['Cuban Linx Pt. II vs Pt. II → 放行', T, 'Only Built 4 Cuban Linx... Pt. II', 'Only Built 4 Cuban Linx… Pt. II', false, true],
  ['Led Zeppelin II vs Led Zeppelin → 擋（裸羅馬數字）', T, 'Led Zeppelin II', 'Led Zeppelin', false, false],
  ['Led Zeppelin IV vs Led Zeppelin IV (Remastered) → 放行', T, 'Led Zeppelin IV', 'Led Zeppelin IV (Remastered)', false, true],
  // Vol. 1 vs Volume 1：卷號相同、卷號那道放行，但 `vol`→`volume` 讓摺疊後長度差 3 之外還斷了子字串關係，
  // 兩道都判 false。這是既有的長度差／子字串設計，不是本次卷號改動造成的，先記錄現況。
  ['In My Lifetime, Vol. 1 vs Volume 1 → 現況擋（子字串斷開，非卷號所致）', T, 'In My Lifetime, Vol. 1', 'In My Lifetime, Volume 1', false, false],
  ['In My Lifetime, Vol. 1 vs Vol. 2 → 擋（卷號不同）', T, 'In My Lifetime, Vol. 1', 'In My Lifetime, Vol. 2', false, false],
  ['4 Walls vs 4 Walls（數字在字首不是卷號）→ 放行', T, '4 Walls', '4 Walls', false, true],
  // Boom vs The Sonics Boom：卷號那道放行（兩邊都無），但摺疊後長度差 9 超過上限 8 → 擋。
  // c-96／c-93 那張就是因此判 unavailable、由研究層人工救回，**這是既有設計的已知代價**，先記錄現況。
  ['Boom vs The Sonics Boom → 現況擋（長度差 9 > 8，非卷號所致）', T, 'Boom', 'The Sonics Boom', false, false],
];
let pass = 0, fail = 0;
for (const [name, fn, ...rest] of cases) {
  const expected = rest.pop(); const got = fn(...rest); const ok = got === expected; ok ? pass++ : fail++;
  console.log(`${ok ? '✓' : '✗'} ${name}${ok ? '' : `  → 得到 ${JSON.stringify(got)}，期望 ${JSON.stringify(expected)}`}`);
}
console.log(`\n${pass}/${cases.length} 通過${fail ? `，${fail} 失敗` : ''}`);
process.exit(fail ? 1 : 0);
