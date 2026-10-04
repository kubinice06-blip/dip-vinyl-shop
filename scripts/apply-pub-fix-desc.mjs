#!/usr/bin/env node
// 已上線專輯簡介的兩道修正，一次算完、一次寫：
//   1. 套用 audits/pub-fix/APPLY-desc.json（雲端 2026-09-30 定案的改寫稿）；
//   2. 中文行文裡的半形標點改全形（writer-base「中文行文禁用半形逗號」）。
//
// 用法：node scripts/apply-pub-fix-desc.mjs            乾跑，只印統計與抽樣
//       node scripts/apply-pub-fix-desc.mjs --emit     另外寫出 bulk put 檔與變更紀錄
//
// 這支**不直接寫 KV**。它產出 publish-stage/pub-fix-<日期>/kv-puts.json，
// 由 `wrangler kv bulk put … --remote` 上傳，再用 --verify 逐字回讀。
//       node scripts/apply-pub-fix-desc.mjs --verify   拿變更紀錄對 KV 現值
//
// ⚠ 鍵規則：`desc2:<artist>|<album>` **全小寫、斜線不動**；值是 `{"desc":"…"}` 的 JSON 字串。
// ⚠ worker 的讀取順序是 desc2 → CURATED_DESCS → desc4，所以 desc4 只處理「沒有 desc2 的卡」
//   （有 desc2 的卡，desc4 根本不會被讀到）。
import fs from 'node:fs';

const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const AUTH = { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN };
const BASE = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const STAMP = '20261004';
const OUT = `publish-stage/pub-fix-${STAMP}`;
const EMIT = process.argv.includes('--emit'), VERIFY = process.argv.includes('--verify');

// ── 半形標點 → 全形 ─────────────────────────────────────────────
const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
const CLOSE = /[》〉」』）】]/, OPEN = /[《〈「『（【]/;
const isCJK = c => !!c && CJK.test(c);
const FULL = { ',': '，', ';': '；', ':': '：', '!': '！', '?': '？' };
const STRICT = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}][,;:!?]|[,;:][\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;

// 《》〈〉裡是原文標題，一個字都不動（《Ugh, Those Feels Again》〈Canta, vive y sueña〉）。
function splitProtected(t) {
  const parts = []; let last = 0;
  for (const m of t.matchAll(/《[^》]*》|〈[^〉]*〉/g)) {
    if (m.index > last) parts.push([false, t.slice(last, m.index)]);
    parts.push([true, m[0]]); last = m.index + m[0].length;
  }
  if (last < t.length) parts.push([false, t.slice(last)]);
  return parts;
}

// 一段未受保護的文字。prevCh／nextCh 是這段前後緊鄰的字元（跨越保護區時用得到）。
function fixSegment(s, prevCh, nextCh) {
  const a = [...s]; let out = '';
  for (let i = 0; i < a.length; i++) {
    const c = a[i];
    if (!(c in FULL)) { out += c; continue; }
    const p = i > 0 ? a[i - 1] : prevCh;                       // 緊鄰的前一字
    const n = i + 1 < a.length ? a[i + 1] : nextCh;            // 緊鄰的後一字
    let j = i + 1; while (j < a.length && a[j] === ' ') j++;
    const nn = j < a.length ? a[j] : nextCh;                   // 跳過空白後的下一字
    const spaced = n === ' ';
    const pCJK = isCJK(p) || CLOSE.test(p || ''), nCJK = isCJK(nn) || OPEN.test(nn || '');
    let conv = false;
    if (c === ',' || c === ';') {
      // 千分位：逗號後面**剛好**三位數字（1,000／12,500,000）。
      // 「DLP-75,1962 年」「第 65,1997 年」後面是四位數的年份，那是中文逗號。
      const after = a.slice(i + 1, i + 5).join('');
      if (c === ',' && /\d/.test(p || '') && /^\d{3}(?!\d)/.test(after)) conv = false;
      else if (n === undefined) conv = pCJK;
      else if (spaced) conv = pCJK || nCJK;                              // 「Latin, Latin」是原文專名，留著
      else conv = true;                                                  // 沒有空白的逗號＝中文行文
    } else if (c === ':') {
      if (/\d/.test(p || '') && /\d/.test(n || '')) conv = false;        // 3:45、2:1
      else conv = pCJK || (!spaced && nCJK) || (spaced && pCJK);
    } else {                                                             // ! ?
      conv = isCJK(p);
    }
    if (!conv) { out += c; continue; }
    out = out.replace(/ +$/, '') + FULL[c];
    while (i + 1 < a.length && a[i + 1] === ' ') i++;                    // 全形標點後不留空白
  }
  return out;
}

export function normalizePunct(t) {
  if (!STRICT.test(t)) return t;            // 沒有任何「貼著中文」的半形標點就整篇不碰
  const parts = splitProtected(t);
  return parts.map(([prot, s], i) => {
    if (prot) return s;
    const prev = i > 0 ? [...parts[i - 1][1]].pop() : undefined;
    const next = i + 1 < parts.length ? [...parts[i + 1][1]][0] : undefined;
    return fixSegment(s, prev, next);
  }).join('');
}

// ── KV 讀取 ────────────────────────────────────────────────────
async function listKeys(prefix) {
  const keys = []; let cursor = null;
  do {
    const u = `${BASE}/keys?limit=1000&prefix=${encodeURIComponent(prefix)}` + (cursor ? `&cursor=${encodeURIComponent(cursor)}` : '');
    const j = await (await fetch(u, { headers: AUTH })).json();
    if (!j.success) throw new Error('列鍵失敗 ' + JSON.stringify(j.errors));
    for (const k of j.result) keys.push(k.name);
    cursor = j.result_info?.cursor || null;
  } while (cursor);
  return keys;
}
async function bulkGet(keys) {
  const out = new Map();
  for (let i = 0; i < keys.length; i += 90) {
    const batch = keys.slice(i, i + 90); let j = null;
    for (let a = 0; a < 5 && !j; a++) {
      try {
        const r = await fetch(`${BASE}/bulk/get`, { method: 'POST', headers: { ...AUTH, 'Content-Type': 'application/json' }, body: JSON.stringify({ keys: batch }) });
        const t = await r.json(); if (t.success) j = t; else await new Promise(s => setTimeout(s, 1000 * (a + 1)));
      } catch { await new Promise(s => setTimeout(s, 1000 * (a + 1))); }
    }
    if (!j) throw new Error('bulk get 失敗於第 ' + i + ' 筆');
    for (const k of batch) { const v = j.result.values[k]; if (v != null) out.set(k, typeof v === 'string' ? v : JSON.stringify(v)); }
  }
  return out;
}
const descOf = raw => { try { const o = JSON.parse(raw); return (o && typeof o === 'object' && typeof o.desc === 'string') ? o.desc : null; } catch { return null; } };
const withDesc = (raw, desc) => JSON.stringify({ ...JSON.parse(raw), desc });

// ── 回讀驗證 ───────────────────────────────────────────────────
if (VERIFY) {
  const rec = JSON.parse(fs.readFileSync(`${OUT}/applied.json`, 'utf8'));
  const live = await bulkGet(rec.map(r => r.key));
  let ok = 0; const bad = [];
  for (const r of rec) { if (live.get(r.key) === r.newValue) ok++; else bad.push(r.key); }
  console.log(`回讀 ${rec.length} 個鍵：逐字一致 ${ok}｜不符 ${bad.length}`);
  for (const k of bad.slice(0, 30)) console.log('  ✗ ' + k);
  process.exit(bad.length ? 1 : 0);
}

// ── 主流程 ─────────────────────────────────────────────────────
const k2 = await listKeys('desc2:'), k4all = await listKeys('desc4:');
const has2 = new Set(k2.map(k => k.slice(6)));
const k4 = k4all.filter(k => !has2.has(k.slice(6)));       // 只有 desc4、沒有 desc2 的卡才會被讀到
console.log(`desc2 ${k2.length} 個｜desc4 ${k4all.length} 個（其中沒有 desc2、實際會被讀到的 ${k4.length} 個）`);
const live = await bulkGet([...k2, ...k4]);
console.log(`取值 ${live.size} 個`);

const changes = new Map();   // key → { oldValue, desc, kinds:Set }
const touch = (key, desc, kind) => {
  const c = changes.get(key) || { oldValue: live.get(key), desc: null, kinds: new Set() };
  c.desc = desc; c.kinds.add(kind); changes.set(key, c);
};
const cur = key => changes.has(key) ? changes.get(key).desc : descOf(live.get(key));

// 1. 修正包
const pack = JSON.parse(fs.readFileSync('audits/pub-fix/APPLY-desc.json', 'utf8'));
const st = { applied: 0, already: 0, mismatch: [], missing: [] };
for (const r of pack) {
  const base = `${r.artist}|${r.album}`.toLowerCase();
  const key = live.has('desc2:' + base) ? 'desc2:' + base : (live.has('desc4:' + base) ? 'desc4:' + base : null);
  if (!key) { st.missing.push(base); continue; }
  const now = descOf(live.get(key));
  if (now === r.newDesc) { st.already++; continue; }
  if (now !== r.oldDesc) { st.mismatch.push({ key, now, old: r.oldDesc }); continue; }   // 本機已改過 → 不蓋
  touch(key, r.newDesc, 'pack'); st.applied++;
}
console.log(`\n【修正包 ${pack.length} 則】套用 ${st.applied}｜已是新稿 ${st.already}｜現值與 oldDesc 不符（跳過）${st.mismatch.length}｜KV 查無 ${st.missing.length}`);
for (const m of st.mismatch) {
  const a = [...m.now], b = [...m.old]; let i = 0; while (i < a.length && a[i] === b[i]) i++;
  console.log(`  ≠ ${m.key}\n      KV : …${a.slice(Math.max(0, i - 12), i + 24).join('')}…\n      old: …${b.slice(Math.max(0, i - 12), i + 24).join('')}…`);
}
for (const k of st.missing) console.log('  ? 查無 ' + k);

// 2. 半形標點（吃修正包套用後的文字）
let punctN = 0; const residual = [];
for (const key of [...k2, ...k4]) {
  const d = cur(key); if (d == null) continue;
  const f = normalizePunct(d);
  if (f !== d) { touch(key, f, 'punct'); punctN++; }
  if (STRICT.test(f)) residual.push(key);
}
console.log(`\n【半形標點】改動 ${punctN} 則｜改完仍有半形貼中文的 ${residual.length} 則`);
for (const k of residual.slice(0, 40)) {
  const d = cur(k); const m = d.match(new RegExp('.{0,14}(?:' + STRICT.source + ').{0,14}', 'u'));
  console.log('  殘留 ' + k + '  …' + (m ? m[0] : '') + '…');
}

const both = [...changes.values()].filter(c => c.kinds.size === 2).length;
console.log(`\n合計要寫 ${changes.size} 個鍵（只修正包 ${[...changes.values()].filter(c => c.kinds.size === 1 && c.kinds.has('pack')).length}｜只標點 ${[...changes.values()].filter(c => c.kinds.size === 1 && c.kinds.has('punct')).length}｜兩者皆有 ${both}）`);

// 抽樣：只做標點的，印出每一處改動的前後文，供人眼複核
const sample = [...changes].filter(([, c]) => c.kinds.size === 1 && c.kinds.has('punct'));
const pick = process.argv.includes('--all-diffs') ? sample : sample.filter((_, i) => i % Math.max(1, Math.floor(sample.length / 12)) === 0).slice(0, 12);
console.log(`\n── 標點改動抽樣 ${pick.length} 則 ──`);
for (const [key, c] of pick) {
  console.log('▸ ' + key);
  console.log('  前 ' + descOf(c.oldValue));
  console.log('  後 ' + c.desc);
}

// 「保留不動」的半形逗號：改過的文章裡還剩哪些，全部列出來看有沒有該改沒改的
const kept = [];
for (const [key, c] of changes) {
  const m = c.desc.match(/.{0,16}[,;].{0,16}/gu);
  if (m) for (const x of m) kept.push(key.slice(6) + '  ⟪' + x + '⟫');
}
console.log(`\n── 改過的文章裡保留的半形 , ; 共 ${kept.length} 處 ──`);
for (const x of kept) console.log('  ' + x);

if (EMIT) {
  fs.mkdirSync(OUT, { recursive: true });
  const puts = [], rec = [];
  for (const [key, c] of changes) {
    const newValue = withDesc(c.oldValue, c.desc);
    puts.push({ key, value: newValue });
    rec.push({ key, kinds: [...c.kinds], oldValue: c.oldValue, newValue });
  }
  fs.writeFileSync(`${OUT}/kv-puts.json`, JSON.stringify(puts));
  fs.writeFileSync(`${OUT}/applied.json`, JSON.stringify(rec, null, 1));
  console.log(`\n已寫出 ${OUT}/kv-puts.json（${puts.length} 筆）與 applied.json`);
}
