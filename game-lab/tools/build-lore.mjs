// build-lore.mjs：行家（周姐）的摘句 game-lab/lore.json（SPEC-H §6.3；活店棒 3c，2026-11-18）。
//
//   node game-lab/tools/build-lore.mjs            # 重產 lore.json，印涵蓋率
//   node game-lab/tools/build-lore.mjs --check    # 不寫檔：過期（摘句不再是該藝人現行介紹的子字串）＞0 → exit 1；另驗形狀、≤300 KB、
//                                                 #   每句仍守切句規則、同輸入兩次逐位元組相同；印涵蓋率與「要不要重算」
//   node game-lab/tools/build-lore.mjs --dry      # 不寫檔，只印涵蓋率
//
// 零編造：周姐講的音樂知識只准是主站已上線、已審的藝人介紹（data/artist-intros/，dip-artist-intro 產線：補洞 → 寫作 → 主線逐位審稿 → 建分片）
//   **逐字切出來的句子**。這支只切、不改字；建置時逐句驗「是原文的子字串」，有一句不是就整個失敗、不寫檔。
//
// 來源：遊戲卡池（require('content.js').cards＝核心 cards.js 368＋cards-pool.js 展開）的每位藝人 →
//   鍵 norm＝NFC().trim().toLowerCase()（＝dip-artist-intro.js、scripts/build-artist-intros.mjs）→ 分片 shardOf(鍵, 64)（FNV-1a，同上兩支）→
//   data/artist-intros/<NN>.json 的 entries[鍵]＝{ name, intro }。只收卡池裡有卡的藝人；various artists 沒有介紹（主站 SKIP）。
//
// 切句（§6.3）：以「。！？」切（括號裡的不切：「」『』《》〈〉（）() 裡面的句號屬於引文），頭尾空白去掉；留下同時符合的句子：
//   1. 14–48 字（Unicode 字元數，含句尾標點）；「」『』《》〈〉（）() 成對而且不交錯；
//   2. 句中有藝人名（介紹的 name、卡上的藝人欄；拉丁名去掉開頭 The 也算）、或四位數年份、或《…》——離開上下文也知道在講哪一年、哪張；
//   3. 不以承接詞、時間詞、代名詞開頭（START；開頭的括號先剝掉再看）；
//   4. 不含沉重字（HEAVY：聊天要輕鬆）、不含定論字（VERDICT：拆出來像周姐自己下定論）。
//   補充（棒 3c 裁定，只會比規格嚴、可逆；實例：Stevie Ray Vaughan「墜機身亡，得年 35 歲」、中森明菜「輕生未遂」原本會過）：
//   3'. 開頭另擋 START_MORE（隨後、當時、翌年、就、才、又、卻、前者……「兩年後」這類相對時間）；第一個逗號之前出現「則／卻／也／同樣」也擋
//       （「《Brother Sister》則打進……」單獨拿出來不知道在跟誰比）；
//   4'. 沉重字另擋 HEAVY_MORE（身亡、辭世、輕生、墜機、得年、失蹤、成癮、病……：規格那串的同義詞）；
//   2'. 拉丁字母開頭／結尾的藝人名要整字比（Can 不能算中 American）。
//   每位最多 2 句：先挑第一句有年份的、再挑第一句有《》的（不同句），不足再照原文順序補；輸出照原文順序。
//   讀起來怪的藝人（主線抽讀後裁定）寫進 EXCLUDE（整位不收），單句寫進 EXCLUDE_QUOTE（鍵＋句子開頭）。
//
// 輸出（§6.3）：{ v:1, src:{ updatedAt, shards:{ NN: sha1 } }, n, a:{ <藝人鍵>:[句…] } }
//   updatedAt＝data/artist-intros/manifest.json 的 updatedAt；shards＝當下每個分片檔的 sha1（只列存在的分片）；n＝a 的藝人數；
//   a 的鍵照字串排序、一位一行（好 diff）；同輸入連跑兩次逐位元組相同。上限 300 KB。
//   執行期（棒 4，§6.4）：周姐第一次要講知識段才 fetch('lore.json?v=…')，用 norm(card.artist) 查 a；摘句下方灰字「藝人介紹・{藝人}」。
//
// 「過期」（§6.3、批判 4.5）：摘句已經不是該藝人現行介紹的子字串（介紹被改寫或刪掉）→ --check 列出、exit 1；上線前要 0 筆。
//   分片雜湊變了只表示「要重算」、卡池新進的藝人只進涵蓋率——都不算過期（藝人介紹產線一直在跑，拿雜湊當門檻會天天紅）。
//
// 涵蓋率（§6.3）：報兩個數——有摘句的藝人／遊戲藝人、有摘句的卡／核心 368 張；任一低於 60% 印警告（回報主線）。
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const ROOT = path.resolve(LAB, '..');
const require = createRequire(import.meta.url);
export const LORE = path.join(LAB, 'lore.json');
export const INTRO_DIR = path.join(ROOT, 'data', 'artist-intros');
export const MAX_BYTES = 300 * 1024;
export const MIN_LEN = 14, MAX_LEN = 48, PER_ARTIST = 2;
// 規則開關（預設＝規格 §6.3）。涵蓋率低於 60% 時主線決定要不要放寬：ends 加「；」（分號也切）、anchor:false（拿掉規則 2）；改這裡、重跑即可。
export const RULES = { ends: '。！？', anchor: true };
const COVER_WARN = 0.6;

export const norm = s => String(s || '').normalize('NFC').trim().toLowerCase();
// ⚠ 必須與 dip-artist-intro.js、scripts/build-artist-intros.mjs 的 shardOf() 完全一致
export function shardOf(key, shards = 64) {
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h % shards;
}
const SKIP = new Set(['various artists']);

// ── 切句規則（§6.3）──
const PAIRS = [['「', '」'], ['『', '』'], ['《', '》'], ['〈', '〉'], ['（', '）'], ['(', ')']];
const OPENS = PAIRS.map(p => p[0]).join(''), CLOSES = PAIRS.map(p => p[1]).join('');
export const START = /^(但|而|因此|不過|然而|此外|另外|同時|後來|之後|此後|隔年|同年|次年|當年|那年|最後|接著|於是|甚至|其中|也|並|則|這|那|該|此|其|他|她|它)/;
export const HEAVY = /死|逝|過世|自殺|過量|謀殺|獄|癌|毒|槍|車禍/;
export const VERDICT = /被譽為|公認|最偉大|最重要|史上/;
// 補充（比規格嚴）：開頭的承接、相對時間；第一個逗號前的對比、追加；沉重字的同義詞
export const START_MORE = /^(隨後|隨即|當時|此時|那時|翌年|第二年|同一年|不久|稍後|其後|爾後|期間|此前|先前|直到|然後|前者|後者|對此|如此|就|便|才|更|又|再|還|仍|卻|([0-9]+|[一二三四五六七八九十兩數幾多半]+) ?(年|個月|週|天)(後|前|間|之後|以後))/;
export const LEAD_LINK = /^[^，；：,]*(則|卻|也|同樣)/;
export const HEAVY_MORE = /亡|殺|辭世|離世|去世|喪|遇害|遇刺|輕生|自盡|墜機|墜毀|空難|得年|享年|失蹤|成癮|戒治|酗酒|吸食|罹|病|葬|悼|追思|告別式|遺作|遺孀|遺體|遺願|中風|癱瘓|腫瘤|愛滋|截肢|昏迷|受傷|重傷|送醫|納粹|集中營|屠殺|政變|白色恐怖|恐攻|轟炸/;
// 四位數年份：1500–2029，前後不黏數字、千分位或小數點
export const YEAR = /(?<![0-9０-９,.，])(1[5-9][0-9]{2}|20[0-2][0-9])(?![0-9０-９]|[,.][0-9])/;
export const ALBUM = /《[^《》]+》/;

// 讀起來怪、主線裁定不收的（鍵 → 理由）；單句：鍵 → [[句子開頭, 理由]]
export const EXCLUDE = new Map([
]);
export const EXCLUDE_QUOTE = new Map([
  ['andrew lloyd webber', [['兩人的成名作', '「兩人」指前一句的 Tim Rice，單獨拿出來不知道是誰（棒 3c 抽讀）']]],
  ['the modern jazz quartet', [['1974 年兩人決裂', '四重奏的「兩人」指前文的兩位成員，單獨拿出來不知道是誰（棒 3c 抽讀）']]],
]);

const len = s => Array.from(s).length;

// 括號裡的句號不切；句尾連著的「。！？」一起帶走；最後一段沒有句號也算一句
export function splitSentences(text, ends = RULES.ends) {
  const out = [];
  let start = 0, depth = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (OPENS.includes(ch)) depth++;
    else if (CLOSES.includes(ch)) depth = Math.max(0, depth - 1);
    else if (depth === 0 && ends.includes(ch)) {
      let end = i + 1;
      while (end < text.length && ends.includes(text[end])) end++;
      const s = text.slice(start, end).trim().replace(/；$/, '');   // 分號切的那段不帶分號（仍是原文子字串）
      if (s) out.push(s);
      start = end;
      i = end - 1;
    }
  }
  const tail = text.slice(start).trim();
  if (tail) out.push(tail);
  return out;
}

export function paired(s) {
  const stack = [];
  for (const ch of s) {
    const o = OPENS.indexOf(ch), c = CLOSES.indexOf(ch);
    if (o >= 0) stack.push(o);
    else if (c >= 0) { if (stack.pop() !== c) return false; }
  }
  return stack.length === 0;
}

// 藝人名的寫法：介紹的 name、卡上藝人欄（可能不只一種大小寫）；拉丁名去掉開頭 The 也算；不到 2 字的不拿來比（太容易誤中）
const esc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export function namesOf(entryName, cardNames) {
  const set = new Set();
  for (const n of [entryName, ...(cardNames || [])]) {
    const k = norm(n);
    if (len(k) >= 2) set.add(k);
    const noThe = k.replace(/^the\s+/, '');
    if (noThe !== k && len(noThe) >= 2) set.add(noThe);
  }
  // 拉丁字母開頭／結尾的名字整字比（前後不能再黏拉丁字母或數字）
  return [...set].sort(cmp).map(k => new RegExp((/^[a-z0-9]/.test(k) ? '(?<![a-z0-9])' : '') + esc(k) + (/[a-z0-9]$/.test(k) ? '(?![a-z0-9])' : '')));
}

// 一句過不過；過＝null，不過＝理由（--check 與抽樣用）
export function whyNot(s, names, rules = RULES) {
  const n = len(s);
  if (n < MIN_LEN) return '太短';
  if (n > MAX_LEN) return '太長';
  if (!paired(s)) return '括號不成對';
  const low = s.toLowerCase();
  if (rules.anchor !== false && !(names.some(re => re.test(low)) || YEAR.test(s) || ALBUM.test(s))) return '沒有藝人名、年份或《》';
  const head = s.replace(/^[「『《〈（(\s]+/, '');
  if (START.test(head)) return '承接詞／時間詞／代名詞開頭';
  if (START_MORE.test(head) || LEAD_LINK.test(s)) return '承接（補充規則）';
  if (HEAVY.test(s)) return '沉重字';
  if (HEAVY_MORE.test(s)) return '沉重字（補充規則）';
  if (VERDICT.test(s)) return '定論字';
  return null;
}

// 一位藝人的摘句（照原文順序；最多 2 句）
export function quotesOf(key, entry, cardNames, rules = RULES) {
  if (!entry || !entry.intro || EXCLUDE.has(key)) return [];
  const intro = entry.intro;
  const names = namesOf(entry.name, cardNames);
  const skip = EXCLUDE_QUOTE.get(key) || [];
  const ok = splitSentences(intro, rules.ends).filter(s => !whyNot(s, names, rules) && !skip.some(([head]) => s.startsWith(head)));
  const pick = [];
  const yearS = ok.find(s => YEAR.test(s));
  if (yearS) pick.push(yearS);
  const albS = ok.find(s => !pick.includes(s) && ALBUM.test(s));
  if (albS) pick.push(albS);
  for (const s of ok) { if (pick.length >= PER_ARTIST) break; if (!pick.includes(s)) pick.push(s); }
  const out = pick.slice(0, PER_ARTIST).sort((x, y) => intro.indexOf(x) - intro.indexOf(y));
  for (const s of out) if (!intro.includes(s)) throw new Error(`build-lore：${key} 的摘句不是原文子字串：${s}`);
  return out;
}

// ── 讀資料 ──
export function readIntros(dir = INTRO_DIR) {
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
  const shards = manifest.shards || 64;
  const entries = new Map(), hashes = {};
  for (let s = 0; s < shards; s++) {
    const nn = String(s).padStart(2, '0');
    const f = path.join(dir, nn + '.json');
    if (!fs.existsSync(f)) continue;
    const raw = fs.readFileSync(f);
    hashes[nn] = crypto.createHash('sha1').update(raw).digest('hex');
    const j = JSON.parse(raw.toString('utf8'));
    for (const [k, v] of Object.entries((j && j.entries) || {})) {
      if (shardOf(k, shards) !== s) throw new Error(`build-lore：${k} 放在分片 ${nn}，shardOf 算出 ${shardOf(k, shards)}（分片規則跟主站不一致？）`);
      entries.set(k, v);
    }
  }
  return { manifest, shards, entries, hashes };
}

// 遊戲卡池：藝人鍵 → { names:[卡上寫法…], cards:[id…], core:[id…] }
export function readPool(cards = require(path.join(LAB, 'content.js')).cards) {
  const by = new Map();
  for (const id of Object.keys(cards)) {
    const c = cards[id];
    if (!c || !c.artist) continue;
    const k = norm(c.artist);
    if (!k || SKIP.has(k)) continue;
    if (!by.has(k)) by.set(k, { names: [], cards: [], core: [] });
    const r = by.get(k);
    if (!r.names.includes(c.artist)) r.names.push(c.artist);
    r.cards.push(id);
    if (!c.pool) r.core.push(id);
  }
  return by;
}

const cmp = (x, y) => (x < y ? -1 : x > y ? 1 : 0);

// lore 物件 → 檔案文字（一位一行；鍵排序；決定性）
export function serialize(lore) {
  const keys = Object.keys(lore.a).sort(cmp);
  // 分片鍵 "10"–"63" 是整數樣的鍵，JS 物件會排在 "00"–"09" 前面 → 自己照字串順序拼
  const shards = Object.keys(lore.src.shards).sort(cmp).map(nn => JSON.stringify(nn) + ':' + JSON.stringify(lore.src.shards[nn])).join(',');
  const body = keys.map(k => JSON.stringify(k) + ':' + JSON.stringify(lore.a[k])).join(',\n');
  return '{"v":' + JSON.stringify(lore.v) + ',"src":{"updatedAt":' + JSON.stringify(lore.src.updatedAt) + ',"shards":{' + shards + '}},"n":' + keys.length +
    ',"a":{\n' + body + '\n}}\n';
}

export function buildLore(intros = readIntros(), pool = readPool(), rules = RULES) {
  const a = {};
  for (const k of [...pool.keys()].sort(cmp)) {
    const q = quotesOf(k, intros.entries.get(k), pool.get(k).names, rules);
    if (q.length) a[k] = q;
  }
  return { v: 1, src: { updatedAt: intros.manifest.updatedAt || null, shards: intros.hashes }, n: Object.keys(a).length, a };
}

export function coverage(lore, pool, intros) {
  const artists = pool.size;
  let withIntro = 0, withLore = 0, cards = 0, cardsLore = 0, core = 0, coreLore = 0, quotes = 0;
  for (const [k, r] of pool) {
    const has = !!(lore.a[k] && lore.a[k].length);
    if (intros.entries.has(k)) withIntro++;
    if (has) { withLore++; quotes += lore.a[k].length; }
    cards += r.cards.length; core += r.core.length;
    if (has) { cardsLore += r.cards.length; coreLore += r.core.length; }
  }
  return { artists, withIntro, withLore, cards, cardsLore, core, coreLore, quotes };
}

const pct = (x, y) => (y ? (100 * x / y).toFixed(1) : '0.0') + '%';
function printCoverage(cv) {
  console.log(`涵蓋率：有摘句的藝人 ${cv.withLore}／遊戲藝人 ${cv.artists}（${pct(cv.withLore, cv.artists)}）；` +
    `有摘句的卡（核心）${cv.coreLore}／${cv.core}（${pct(cv.coreLore, cv.core)}）`);
  console.log(`  參考：有介紹的藝人 ${cv.withIntro}／${cv.artists}（${pct(cv.withIntro, cv.artists)}）；全池卡 ${cv.cardsLore}／${cv.cards}（${pct(cv.cardsLore, cv.cards)}）；摘句共 ${cv.quotes} 句`);
  const low = [];
  if (cv.artists && cv.withLore / cv.artists < COVER_WARN) low.push('藝人');
  if (cv.core && cv.coreLore / cv.core < COVER_WARN) low.push('核心卡');
  if (low.length) console.log(`⚠ ${low.join('、')}涵蓋率低於 ${COVER_WARN * 100}%：回報主線（放寬規則 2，或提前加 §6.1 的專輯簡介來源）`);
}

// --check：過期＝摘句不再是該藝人現行介紹的子字串（或介紹整段沒了）
export function staleOf(lore, intros) {
  const stale = [];
  for (const [k, qs] of Object.entries(lore.a || {})) {
    const e = intros.entries.get(k);
    if (!e || !e.intro) { stale.push(`${k}：現行介紹沒有這位了`); continue; }
    for (const q of qs) if (!e.intro.includes(q)) stale.push(`${k}：「${q}」不在現行介紹裡`);
  }
  return stale;
}

export function checkLore({ file = LORE, intros = readIntros(), pool = readPool() } = {}) {
  const errors = [], notes = [];
  if (!fs.existsSync(file)) return { errors: [`${path.relative(ROOT, file)} 不存在（node game-lab/tools/build-lore.mjs）`], notes, stale: [] };
  const raw = fs.readFileSync(file);
  let lore = null;
  try { lore = JSON.parse(raw.toString('utf8')); } catch (e) { return { errors: ['lore.json 不是合法 JSON：' + e.message], notes, stale: [] }; }
  if (raw.length > MAX_BYTES) errors.push(`lore.json ${raw.length} bytes，超過上限 ${MAX_BYTES}`);
  if (!lore || lore.v !== 1 || !lore.src || typeof lore.src.shards !== 'object' || !lore.a || typeof lore.a !== 'object') errors.push('lore.json 形狀不對（要 { v:1, src:{ updatedAt, shards }, n, a }）');
  else {
    if (lore.n !== Object.keys(lore.a).length) errors.push(`n（${lore.n}）≠ a 的藝人數（${Object.keys(lore.a).length}）`);
    for (const [k, qs] of Object.entries(lore.a)) {
      if (!Array.isArray(qs) || !qs.length || qs.length > PER_ARTIST || !qs.every(q => typeof q === 'string')) { errors.push(`${k}：要 1–${PER_ARTIST} 句字串`); continue; }
      if (k !== norm(k)) errors.push(`${k}：鍵不是 norm 過的（NFC、trim、小寫）`);
      if (EXCLUDE.has(k)) errors.push(`${k}：在排除表（${EXCLUDE.get(k)}）卻還在 lore.json`);
      for (const [head, why] of EXCLUDE_QUOTE.get(k) || []) if (qs.some(q => q.startsWith(head))) errors.push(`${k}：「${head}…」在單句排除表（${why}）卻還在 lore.json`);
      const e = intros.entries.get(k);
      const names = namesOf(e && e.name, pool.has(k) ? pool.get(k).names : []);
      for (const q of qs) { const why = whyNot(q, names); if (why) errors.push(`${k}：「${q}」不守切句規則（${why}）`); }
      if (!pool.has(k)) notes.push(`${k}：卡池已經沒有這位的卡（重算會拿掉）`);
    }
    const stale = staleOf(lore, intros);
    // 要不要重算（只是提醒，不算失敗）
    const changed = Object.keys(intros.hashes).filter(nn => lore.src.shards[nn] !== intros.hashes[nn]);
    const gone = Object.keys(lore.src.shards).filter(nn => !intros.hashes[nn]);
    if (changed.length || gone.length) notes.push(`分片變了 ${changed.length + gone.length} 片（${[...changed, ...gone].join(' ')}）：要重算`);
    if (lore.src.updatedAt !== (intros.manifest.updatedAt || null)) notes.push(`manifest updatedAt ${intros.manifest.updatedAt}，lore.json 記的是 ${lore.src.updatedAt}：要重算`);
    const t1 = serialize(buildLore(intros, pool)), t2 = serialize(buildLore(intros, pool));
    if (t1 !== t2) errors.push('同輸入建兩次結果不同（不是決定性的）');
    else if (t1 !== raw.toString('utf8')) notes.push('照現在的介紹與卡池重算會不一樣：要重算（node game-lab/tools/build-lore.mjs）');
    return { errors, notes, stale, lore };
  }
  return { errors, notes, stale: [] };
}

// ── CLI ──
if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const args = new Set(process.argv.slice(2));
  const intros = readIntros(), pool = readPool();
  if (args.has('--check')) {
    const { errors, notes, stale, lore } = checkLore({ intros, pool });
    for (const n of notes) console.log('· ' + n);
    if (stale.length) console.error(`✗ 過期 ${stale.length} 筆（摘句不再是現行介紹的子字串；重算：node game-lab/tools/build-lore.mjs）：\n  ` + stale.join('\n  '));
    else console.log('過期 0 筆');
    if (errors.length) console.error(`✗ ${errors.length} 處不合格：\n  ` + errors.join('\n  '));
    if (lore) printCoverage(coverage(lore, pool, intros));
    if (stale.length || errors.length) process.exit(1);
    console.log(`✓ lore.json 通過（${fs.statSync(LORE).size} bytes）`);
  } else {
    const lore = buildLore(intros, pool);
    const text = serialize(lore);
    if (text !== serialize(buildLore(intros, pool))) { console.error('✗ 同輸入建兩次結果不同，不寫檔'); process.exit(1); }
    const bytes = Buffer.byteLength(text);
    if (bytes > MAX_BYTES) { console.error(`✗ ${bytes} bytes，超過上限 ${MAX_BYTES}，不寫檔`); process.exit(1); }
    if (!args.has('--dry')) fs.writeFileSync(LORE, text);
    console.log(`${args.has('--dry') ? '（--dry 沒寫檔）' : '寫入 ' + path.relative(ROOT, LORE)}：${lore.n} 位、${bytes} bytes`);
    printCoverage(coverage(lore, pool, intros));
  }
}
