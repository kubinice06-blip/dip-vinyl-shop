// 試聽比對規則的回歸測試（裁定第 90 條）。用法：node batch-progress/probe/test-match.mjs
// 每一條都是本次擴充實際踩過的案例，改 match-lib.mjs 之前先跑、全過再跑批。
import { titleOk, looseTitleOk, artistOk, looseArtistOk, canon } from './match-lib.mjs';

const T = (want, got, selfTitled = false) =>
  titleOk(want, got, selfTitled) || looseTitleOk(want, got, selfTitled);
const A = (want, got) => artistOk(want, got) || looseArtistOk(want, got);

const cases = [
  // [說明, 函式, 參數…, 期望]
  ['Moğollar 自我同名 vs Moğollar\'94（c-55 錯配，第 90 條）', T, 'Moğollar', 'Moğollar\'94', true, false],
  ['3 Hür-El 自我同名 vs 1953 Hürel（c-55 錯配，第 90 條）', T, '3 Hür-El', '1953 Hürel', true, false],
  ['Υπάρχω vs Iparho - Gialinos Kosmos 併輯（c-62 誤放，第 77 條）', T, 'Υπάρχω', 'Iparho - Gialinos Kosmos', false, false],
  ['Θητεία vs Thitia (Remastered 2013)（年份在尾綴後，第 90 條）', T, 'Θητεία', 'Thitia (Remastered 2013)', false, true],
  ['Erkin Koray Tutkusu vs (2025 Remastered)（年份在尾綴前，第 90 條補記二）', T, 'Erkin Koray Tutkusu', 'Erkin Koray Tutkusu (2025 Remastered)', false, true],
  ['Ερωτόκριτος vs 30th Anniversary Edition（序數吸收）', T, 'Ερωτόκριτος', 'Ερωτόκριτος - 30th Anniversary Edition', false, true],
  ['Τετραλογία vs Tetralogia (30th Anniversary Edtion)（Apple 自己拼錯）', T, 'Τετραλογία', 'Tetralogia (30th Anniversary Edtion)', false, true],
  ['Ριζίτικα vs Rizitika (Remastered)（第 76 條寬鬆轉寫）', T, 'Ριζίτικα', 'Rizitika (Remastered)', false, true],
  ['Ρωμιοσύνη vs Romiosini (Remastered)（υ→i 分歧）', T, 'Ρωμιοσύνη', 'Romiosini (Remastered)', false, true],
  ['Ένα μεσημέρι vs Ena Mesimeri', T, 'Ένα μεσημέρι', 'Ena Mesimeri', false, true],
  ['Άνθρωπε vs Anthrope', T, 'Άνθρωπε', 'Anthrope', false, true],
  ['Akritas 自我同名完全相等 → 放行', T, 'Akritas', 'Akritas', true, true],
  ['Akritas 自我同名 vs Akritas 1973 → 擋', T, 'Akritas', 'Akritas 1973', true, false],
  ['Phos vs Phos', T, 'Phos', 'Phos', false, true],
  ['Türkülerimiz 1 vs Türkülerimiz 1（盤名自帶數字，兩邊都有 → 放行）', T, 'Türkülerimiz 1', 'Türkülerimiz 1', false, true],
  ['Dead Man - Single 尾綴 → 擋（§1 單曲不進）', T, 'Dead Man', 'Dead Man - Single', false, false],
  ['Разлука 西里爾原文相等', T, 'Разлука', 'Разлука', false, true],
  ['Θεοδωράκης vs Mikis Theodorakis & Grigóris Bithikótsis（合掛名，第 71 條形狀，藝人寬鬆放行）', A, 'Μίκης Θεοδωράκης', 'Mikis Theodorakis & Grigóris Bithikótsis', true],
  ['Θεοδωράκης vs Grigóris Bithikótsis 單掛演唱者 → 擋（第 77 條留給人工）', A, 'Μίκης Θεοδωράκης', 'Grigóris Bithikótsis', false],
  ['canon：Ρωμιοσύνη → romiosini', s => canon(s), 'Ρωμιοσύνη', 'romiosini'],
];

let pass = 0, fail = 0;
for (const c of cases) {
  const [name, fn, ...rest] = c;
  const expected = rest.pop();
  const got = fn(...rest);
  const ok = got === expected;
  ok ? pass++ : fail++;
  console.log(`${ok ? '✓' : '✗'} ${name}${ok ? '' : `  → 得到 ${JSON.stringify(got)}，期望 ${JSON.stringify(expected)}`}`);
}
console.log(`\n${pass}/${cases.length} 通過${fail ? `，${fail} 失敗` : ''}`);
process.exit(fail ? 1 : 0);
