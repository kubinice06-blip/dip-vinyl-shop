#!/usr/bin/env node
// 三軸重評第二輪「套用」：
//   (A) 第二輪 26 片 verdicts → 冷門度下限機械檢查 → applied.json
//   (B) 第一輪 2,957 張（rerate-20261101/applied.json 新值為底）→ 同一張下限表 → floor-r1.json
//   (C) --write：seed_cards.json 三軸欄字串替換＋所有涵蓋到的 manifest（根目錄＋batch 副本）ratings／rarity
// 用法：node batch-progress/rerate-20261102/apply.mjs [--write]   （不帶 --write 只產 applied.json／floor-r1.json 並報數）
// 冪等：old 以既有 applied.json／floor-r1.json 為準；seed 已是新值的卡算「已是新值」略過；manifest 只在值不同時改寫，previous 只留第一次。
import fs from 'node:fs';
const D = 'batch-progress/rerate-20261102/', D1 = 'batch-progress/rerate-20261101/';
const WRITE = process.argv.includes('--write');
const SRC = 'manual:rerate-20261102', AT = '2026-11-02T00:00:00Z';
const AX = ['classic', 'obscurity', 'accessibility'];
const rarityOf = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common'; };
const J = p => JSON.parse(fs.readFileSync(p, 'utf8'));

// ---- Last.fm 疑錯配：不套下限，冷門度照 RUBRIC 錨點（調度裁定 2026-11-02；名單出自各片 summary）----
// 值：照 RUBRIC 冷門度錨點給的分。9 張調度點名者一律 3；其餘「比照處理」逐張依錨點判。
const MISMATCH = {
  // s10／s11（調度點名，Blue Note 等知名盤，盤名寫法不同）
  "Horace Silver|Doin' the Thing: Live at the Village Gate": 3,
  'Kenny Clarke & Francy Boland|The Golden Eight': 3,
  "Stanley Turrentine|Up at Minton's, Volume 1": 3,
  'Zoot Sims & Bob Brookmeyer|Stretching Out': 3,
  'Art Blakey and the Jazz Messengers|Meet You at the Jazz Corner of the World, Volume 2': 3,
  'Billie Holiday|Ladylove': 3,
  'Freddie Hubbard|The Night of the Cookers: Live at Club La Marchal, Volume 1': 3,
  'Freddie Hubbard|The Night of the Cookers: Live at Club La Marchal, Volume 2': 3,
  'Ornette Coleman|At the "Golden Circle" Stockholm, Volume Two': 3,
  // 同系列知名卷次（ADDENDUM 例外條款）
  "Stanley Turrentine|Up at Minton's, Volume 2": 3,
  'Art Blakey and the Jazz Messengers|Meet You at the Jazz Corner of the World, Volume 1': 3,
  // s01–s03
  'Carlos Santana|Oneness: Silver Dreams-Golden Reality': 3,
  'Émile Parisien Quintet|Sfumato': 3,
  'Carmen Linares|Antología de la mujer en el cante': 3,
  'José Mercé|Aire': 3,
  'Fernanda de Utrera y Bernarda de Utrera|El cante de Fernanda y Bernarda de Utrera': 3,
  'Carlos Di Sarli|Archivo RCA: 1954 / 1958': 3,
  // s04
  'Toby Fox|UNDERTALE: Soundtrack': 2,
  'Quartetto Italiano|Debussy: String Quartet / Ravel: String Quartet': 3,
  'Carl Perkins (rockabilly)|Dance Album of Carl Perkins': 3,
  "Fats Domino|Rock and Rollin' with Fats Domino": 3,
  "Johnny Burnette and the Rock 'n' Roll Trio|Johnny Burnette and the Rock 'n' Roll Trio": 3,
  'ไททศมิตร|เพื่อชีวิตกู': 3,
  'Sek Loso|Sek': 3,
  // s06
  '藤井風|Prema': 3,
  '星野源|Gen': 3,
  'Isaiah Rashad|IT’S BEEN AWFUL': 3,
  'Udo Lindenberg & Das Panikorchester|Alles klar auf der Andrea Doria': 3,
  // s09（台灣主流樂團：該語言圈主流流通＝2）
  '告五人 Accusefive|我們就像那些要命的傻瓜': 2,
  '告五人 Accusefive|我肯定在幾百年前就說過愛你': 2,
  // s14
  'Brian Blade Fellowship|Body and Shadow': 3,
  'Lonnie Smith|Evolution': 3,
  'Stacey Kent|Raconte-moi…': 3,
  'Götz Alsmann|In Paris.': 3,
  // s16／s17
  'THE SQUARE|R·E·S·O·R·T': 3,
  'Miles Davis|Miles in Tokyo: Miles Davis Live in Concert': 3,
  'Al Di Meola, John McLaughlin & Paco de Lucía|Passion, Grace & Fire': 3,
  'Jule Styne|Funny Girl': 3,
  'Lerner & Loewe|Brigadoon': 3,
  // s18（Suicide 第二張：ZE／Antilles 正規發行、首作光環下的知名續作＝3；張惠妹華語圈主流＝2）
  'Suicide|Suicide: Alan Vega and Martin Rev': 3,
  '張惠妹|我可以抱你嗎？愛人': 2,
  // s18：listeners=0 是查詢漏抓，視同缺值（R10 主線裁定，維持 verdict 值）
  'Azra|Filigranski pločnici': null, 'Azra|Sunčana strana ulice': null, 'Azra|Azra': null, 'Riblja Čorba|Mrtva priroda': null,
};
// ADDENDUM 但書：試聽 unavailable 但代理確知有正式數位版、在 why 註明而給 4 → 不抬到 5
const DIGITAL = /(Spotify|Bandcamp|數位版|數位發行|數位再發|串流再發|正式串流|有串流|串流上架|串流可聽|Apple Music|iTunes|YouTube Music|Qobuz|Tidal|官方[^；｜]*數位|FLAC|WAV|Apple 有條目)/i;

// 下限表（RUBRIC-ADDENDUM）
function floorOf(L, preview) {
  if (L == null) return null;
  if (L < 1000) return preview === 'ready' ? { min: 4, rule: 'L<1000 試聽 ready → ≥4' } : { min: 5, rule: 'L<1000 試聽非 ready → 5' };
  if (L < 5000) return { min: 3, rule: 'L 1,000–4,999 → ≥3' };
  return null;
}

// 試聽狀態：所有 2026-09-01 起 manifest
const manifestFiles = fs.readdirSync('.').filter(f => /^onboarding-manifest-.*?(2026\d{4})b?\.json$/.test(f) && f.match(/(2026\d{4})b?\.json$/)[1] >= '20260901').sort();
const preview = {};
for (const f of manifestFiles) for (const a of (J(f).albums || [])) { const k = a.artist + '|' + a.album; if (!(k in preview)) preview[k] = a.preview?.status || null; }

const judge = (key, L, pv, base, flags) => {
  // base：評分值（第二輪 verdict／第一輪 applied.new）；回傳 { obscurity, floor }
  const mm = Object.prototype.hasOwnProperty.call(MISMATCH, key);
  const fl = floorOf(L, pv);
  if (mm) return { obscurity: MISMATCH[key] ?? base, floor: { triggered: false, exempt: MISMATCH[key] == null ? 'listeners=0 漏抓（視同缺值）' : 'Last.fm 疑錯配', rule: fl?.rule || null } };
  if (flags.floorExempt) return { obscurity: base, floor: { triggered: false, exempt: 'floorExempt（評分工作階段主線裁定）', rule: fl?.rule || null } };
  if (!fl || base >= fl.min) return { obscurity: base, floor: { triggered: false, rule: fl?.rule || null } };
  if (fl.min === 5 && base === 4 && flags.why && DIGITAL.test(flags.why)) return { obscurity: 4, floor: { triggered: false, exempt: 'ADDENDUM 但書：確知有正式數位版', rule: fl.rule } };
  return { obscurity: fl.min, floor: { triggered: true, rule: fl.rule, from: base } };
};

// ---------- (A) 第二輪 ----------
const shard = {}; for (const f of fs.readdirSync(D + 'shards').sort()) for (const x of J(D + 'shards/' + f)) shard[x.key] = x;
const verdict = {}; for (const f of fs.readdirSync(D + 'verdicts').filter(f => /^s\d\d-.*\.json$/.test(f)).sort())
  for (const v of J(D + 'verdicts/' + f)) { if (verdict[v.key]) throw new Error('重複 ' + v.key); verdict[v.key] = v; }
for (const k in shard) if (!verdict[k]) throw new Error('缺 verdict ' + k);
for (const k in verdict) if (!shard[k]) throw new Error('verdict 多出 ' + k);
for (const k in MISMATCH) if (!shard[k]) throw new Error('疑錯配名單鍵不在第二輪 ' + k);
const lineOf = b => /^c\d+/.test(b) ? 'c' : /^csea/.test(b) ? 'csea' : (b.match(/^([a-z]+)/) || [])[1] || b;
const prevA = fs.existsSync(D + 'applied.json') ? Object.fromEntries(J(D + 'applied.json').map(x => [x.key, x])) : {};
const applied = Object.keys(shard).map(k => {
  const s = shard[k], v = verdict[k];
  const old = prevA[k]?.old || { ...s.cur };
  const base = v.keep ? { ...old } : { classic: v.classic, obscurity: v.obscurity, accessibility: v.accessibility };
  const j = judge(k, s.listeners, preview[k], base.obscurity, { floorExempt: v.floorExempt, why: v.why });
  const nw = { ...base, obscurity: j.obscurity };
  for (const ax of AX) if (!Number.isInteger(nw[ax]) || nw[ax] < 1 || nw[ax] > 5) throw new Error(`值錯 ${k} ${ax}`);
  return { key: k, artist: s.artist, album: s.album, batch: s.batch, line: lineOf(s.batch), manifest: s.manifest, listeners: s.listeners, preview: preview[k] ?? null,
    old, verdict: { classic: v.classic, obscurity: v.obscurity, accessibility: v.accessibility }, new: nw,
    oldRarity: rarityOf(old.classic, old.obscurity, old.accessibility), newRarity: rarityOf(nw.classic, nw.obscurity, nw.accessibility),
    keep: !!v.keep, floor: j.floor, changed: AX.some(a => old[a] !== nw[a]), why: v.why };
});
fs.writeFileSync(D + 'applied.json', JSON.stringify(applied, null, 1) + '\n');

// ---------- (B) 第一輪補下限 ----------
const r1 = J(D1 + 'applied.json');
const r1L = {}; for (const f of fs.readdirSync(D1 + 'shards').sort()) for (const x of J(D1 + 'shards/' + f)) r1L[x.key] = x.listeners;
const prevB = fs.existsSync(D + 'floor-r1.json') ? Object.fromEntries(J(D + 'floor-r1.json').map(x => [x.key, x])) : {};
const R1_MISMATCH = {}; // 抽看結果見 REPORT；有疑錯配者在此列鍵→值
const floorR1 = r1.map(x => {
  const old = prevB[x.key]?.old || { ...x.new };
  const L = r1L[x.key] ?? null, pv = preview[x.key] ?? null;
  let j;
  if (Object.prototype.hasOwnProperty.call(R1_MISMATCH, x.key)) j = { obscurity: R1_MISMATCH[x.key], floor: { triggered: false, exempt: 'Last.fm 疑錯配', rule: floorOf(L, pv)?.rule || null } };
  else {
    j = judge(x.key, L, pv, old.obscurity, { why: x.why });
    // 抽看裁定：第一輪已依 RUBRIC 判為正規／主流通路（≤2），下限卻要一口氣抬到 4–5 的，
    // 抽看幾乎全是大廠／華語主流盤因盤名寫法、拆名而聽眾數偏低（蕭亞軒、陳奕迅、Twin Peaks 原聲…）→ 比照疑錯配例外，維持第一輪值。
    if (j.floor.triggered && old.obscurity <= 2 && j.obscurity >= 4) j = { obscurity: old.obscurity, floor: { triggered: false, exempt: 'Last.fm 疑錯配（第一輪判 ≤2、下限要跳到 4–5）', rule: j.floor.rule } };
  }
  const nw = { ...old, obscurity: j.obscurity };
  return { key: x.key, artist: x.artist, album: x.album, batch: x.batch, line: x.line, listeners: L, preview: pv, old, new: nw,
    oldRarity: rarityOf(old.classic, old.obscurity, old.accessibility), newRarity: rarityOf(nw.classic, nw.obscurity, nw.accessibility),
    floor: j.floor, changed: old.obscurity !== nw.obscurity, why: x.why };
});
fs.writeFileSync(D + 'floor-r1.json', JSON.stringify(floorR1, null, 1) + '\n');

const cnt = (xs, f) => xs.filter(f).length;
console.log(`第二輪 ${applied.length}｜三軸有變 ${cnt(applied, x => x.changed)}｜下限觸發 ${cnt(applied, x => x.floor.triggered)}（→4 ${cnt(applied, x => x.floor.triggered && x.new.obscurity === 4)}、→5 ${cnt(applied, x => x.floor.triggered && x.new.obscurity === 5)}、→3 ${cnt(applied, x => x.floor.triggered && x.new.obscurity === 3)}）｜豁免 ${cnt(applied, x => x.floor.exempt)}｜稀有度有變 ${cnt(applied, x => x.oldRarity !== x.newRarity)}｜preview 缺 ${cnt(applied, x => !x.preview)}`);
console.log(`第一輪補下限 ${floorR1.length}｜抬分 ${cnt(floorR1, x => x.changed)}（→3 ${cnt(floorR1, x => x.changed && x.new.obscurity === 3)}、→4 ${cnt(floorR1, x => x.changed && x.new.obscurity === 4)}、→5 ${cnt(floorR1, x => x.changed && x.new.obscurity === 5)}）｜豁免 ${cnt(floorR1, x => x.floor.exempt)}｜稀有度有變 ${cnt(floorR1, x => x.oldRarity !== x.newRarity)}｜preview 缺 ${cnt(floorR1, x => !x.preview)}`);
const ida = floorR1.find(x => x.key === 'Yancy Körössy|Identification');
console.log('Identification', JSON.stringify(ida));
if (!WRITE) process.exit(0);

// ---------- (C) 寫回 ----------
const all = [...applied.map(x => ({ ...x, round: 2 })), ...floorR1.map(x => ({ ...x, round: 1 }))];
const map = {}; for (const x of all) { if (map[x.key]) throw new Error('兩輪重疊 ' + x.key); map[x.key] = x; }
const todo = all.filter(x => x.changed);

// seed_cards.json：字串替換
const seedRaw = fs.readFileSync('seed_cards.json', 'utf8');
let out = seedRaw, hits = 0, already = 0;
for (const x of todo) {
  const head = '[' + JSON.stringify(x.artist) + ',' + JSON.stringify(x.album) + ',';
  const from = head + [x.old.classic, x.old.obscurity, x.old.accessibility].join(',') + ',';
  const to = head + [x.new.classic, x.new.obscurity, x.new.accessibility].join(',') + ',';
  const n = out.split(from).length - 1;
  if (n === 1) { out = out.replace(from, () => to); hits++; continue; }
  if (n === 0 && out.split(to).length - 1 === 1) { already++; continue; }
  throw new Error(`seed 命中 ${n}：${x.key}`);
}
// 防呆 1：總筆數不變
const before = JSON.parse(seedRaw), after = JSON.parse(out);
if (before.length !== after.length) throw new Error('總筆數變了');
// 防呆 2：命中數＝要改數
if (hits + already !== todo.length) throw new Error(`命中 ${hits}+${already} ≠ 要改 ${todo.length}`);
// 防呆 3：逐列比對，只有第 3–5 欄變、且只有本範圍的卡、新值正確
for (let i = 0; i < before.length; i++) {
  const b = before[i], a = after[i];
  if (!Array.isArray(b)) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('非卡列變動 ' + i); continue; }
  const x = map[b[0] + '|' + b[1]];
  const rest = r => JSON.stringify([r[0], r[1], ...r.slice(5)]);
  if (rest(a) !== rest(b)) throw new Error('非三軸欄變動 ' + b[0]);
  if (!x) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('範圍外變動 ' + b[0]); continue; }
  if (a[2] !== x.new.classic || a[3] !== x.new.obscurity || a[4] !== x.new.accessibility) throw new Error('新值不符 ' + x.key);
}
fs.writeFileSync('seed_cards.json', out);
console.log(`seed：替換 ${hits}（已是新值 ${already}）｜總筆數 ${after.length} 不變｜長度 ${seedRaw.length}→${out.length}`);

// manifests：根目錄（2026-09-01 起）＋ batch-progress/<add-批>/onboarding-manifest.json；只改值有變的卡
let mfiles = 0, mcards = 0; const seen = new Set(); const touched = [];
for (const f of manifestFiles) {
  const b = (f.match(/^onboarding-manifest-(add-.*?)-\d{8}b?\.json$/) || [])[1];
  const paths = [f]; if (b && fs.existsSync(`batch-progress/${b}/onboarding-manifest.json`)) paths.push(`batch-progress/${b}/onboarding-manifest.json`);
  for (const p of paths) {
    const raw = fs.readFileSync(p, 'utf8'); const m = JSON.parse(raw); let n = 0;
    const ind = (raw.match(/^\{\r?\n( +|\t)/) || [, ' '])[1];
    for (const a of m.albums || []) {
      const x = map[a.artist + '|' + a.album]; if (!x) continue;
      seen.add(x.key);
      if (!x.changed) continue;
      const r = a.ratings, nw = x.new;
      const same = r.classic === nw.classic && r.obscurity === nw.obscurity && r.accessibility === nw.accessibility && r.source === SRC;
      if (same && a.rarity === x.newRarity) continue;
      if (r.source !== SRC) r.previous = { classic: r.classic, obscurity: r.obscurity, accessibility: r.accessibility, source: r.source, checkedAt: r.checkedAt, ...(r.note ? { note: r.note } : {}), rarity: a.rarity };
      r.classic = nw.classic; r.obscurity = nw.obscurity; r.accessibility = nw.accessibility;
      r.source = SRC; r.checkedAt = AT;
      const fl = x.floor.triggered ? `；冷門度下限（${x.floor.rule}，L=${x.listeners}）${x.floor.from}→${nw.obscurity}` : x.floor.exempt ? `；冷門度下限豁免：${x.floor.exempt}` : '';
      r.note = x.round === 2 ? ((x.keep ? '重評沿用舊值：' : '三軸重評第二輪（RUBRIC＋ADDENDUM 2026-11-02）：') + x.why + fl)
        : `第一輪值補冷門度下限（ADDENDUM 2026-11-02）${fl}`;
      a.rarity = x.newRarity; n++;
    }
    if (n) { fs.writeFileSync(p, JSON.stringify(m, null, ind) + (raw.endsWith('\n') ? '\n' : '')); mfiles++; mcards += n; touched.push(p); }
  }
}
const miss = all.filter(x => !seen.has(x.key));
if (miss.length) throw new Error(`manifest 找不到 ${miss.length} 張，例 ${miss[0].key}`);
if (touched.length) fs.writeFileSync(D + 'touched-manifests.json', JSON.stringify(touched, null, 1) + '\n');
console.log(`manifest：改 ${mfiles} 檔、${mcards} 筆（根目錄＋batch 副本合計）`);
