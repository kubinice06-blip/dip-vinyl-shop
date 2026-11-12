// lint-copy.mjs：品味對決 v4 文案檢查（SPEC-v4 §0.4、§2.2.9；v3 的檢查與 v2 的店主用語規則照舊）。
//
//   node game-lab/tools/lint-copy.mjs          # 檢查＋產生 game-lab/LINES-REVIEW.md；有違規 exit 1
//
// 檢查：
//   1. 禁用字串（店主用語、支語、破折號、舊三軸名「入」）：content.js 的字串、cards.js 的 pitch、
//      ui.js／duel.js／tutorial.js／cardinfo.js／econ.js（v4 B3）／stage.js／shop.js／shop-props.js／fx.js／index.html 的字串、shops/*.json 的名牌（缺檔就跳過）。
//      三軸一律經典／冷門／硬蕊；「唱片資訊」不寫「卡片資訊」；「櫃檯」不寫「櫃台」；「派對」不出現；台詞與提示不用破折號。
//   2. v3 拿掉的系統不准回來（SPEC-v3 §2.3、§10.6）：
//      對決、教學、外殼的畫面字不准有「氣勢、輾壓、賭注、相生、割捨、七星回擊、霸權、點播」
//        （content.js、duel.js、tutorial.js、ui.js、cardinfo.js、index.html）；
//      對決與教學的字不准有「晃」（脾氣的內部名 C.habits.*.zh「虛晃」除外，它不上畫面）；
//      「配件」只准出現在發燒配件的介面（content.js／duel.js／tutorial.js 裡，同一行原始碼要提到 relic；ui.js 本身就是配件介面所在，不擋）。
//   3. 必須原樣出現的六句（序章拍板句與原句）；不得出現尾聲的耳朵宣告（09-03 店主拿掉）；
//      v4 劇本（SPEC-v4 §2.5.4，B2）：序章＋收尾標「原句」的恰好 25 句（原版 RPG_BEATS 19 句扣掉被換掉的 5 句（第一句 11-10 改成開頭旁白）＋TUT_EPILOGUE_BEATS 11 句），
//      而且跟原版的順序一致；D §2 拿掉的試做版句子不准回來（回嘴、好耳朵、一百塊三張、交流夜…）
//   4. 每一句都有來源標記（Beat.tag、lineTags、coachTipTags、rulesTag／rulesLinesTag、duelTextTag、relics[].tag、hints[].tag、hintKeywordsTag、
//      rarityTag、tonightLinesTag、tutorial steps[].tag／uiTag、shopLineTags、shopUiTag、bargainTag、summaryTag、trialTag（無限試煉 C.trial.ui／levelUp／notes）、pitches.json）；
//      無限試煉沒有打烊、第二夜：C.night、C.secondNight 不准回來；畫面字不准再寫「今晚來客／打烊／再來一夜／今晚賣完」
//      FIXLIST 6：畫面不寫誠實度（C.honesty 只有 q、沒有 zh；不准有 honestyTag）、客人沒有副標（enemies[*].title）；
//      FIXLIST 2：王牌沒有「不會被剋」（content 的字不准出現「不會被剋」）
//      Beat 的畫面字（prompt／prompts／button／set.stamp）：在 roguelike.html 找得到＝原句、在 owner-lines-v4.json＝店主、其他＝新
//   5. 標成 原句／拍板 的句子，必須一字不差地出現在現行 roguelike.html；標成 店主 的字串，必須一字不差地在 tools/owner-lines-v4.json
//      （＝DECISIONS-v4 裡店主寫／核可的字，SPEC-v4 §2.2.9）
//   6. 長度：教學老闆的泡泡 ≤25 字、按鈕 ≤18；一次性小提示 ≤20；規則卡六行、每行 ≤56（D 第 6 行 54 字）、第 3 行是三相剋（冷剋經／經剋硬／硬剋冷）、
//      六行逐字＝owner-lines 的規則卡；提示句不寫屬性名、key 是句子的子字串；
//      發燒配件說明 ≤16、生效那句 ≤12；說話的 Beat 要用「」；台詞鍵齊全（line／intro／lose／win；v4 沒有 switch）
// 產出：game-lab/LINES-REVIEW.md（所有「新」句依場景列出，給店主過目）
//   LINT_SKIP=ui.js node game-lab/tools/lint-copy.mjs   # 暫時不掃某幾個程式檔（逗號分隔；平行改檔時用），其他照查
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const LAB = path.resolve(HERE, '..');
const ROOT = path.resolve(LAB, '..');
const require = createRequire(import.meta.url);
const errors = [];
const warns = [];
const err = (where, msg) => errors.push(where + '：' + msg);
const len = s => [...String(s)].length;

// ---------------------------------------------------------------------------
// 字串常值抽取（跳過註解；處理樣板字串與正規表示式常值）。回傳 { s, line, src }（src＝那一行原始碼）
// ---------------------------------------------------------------------------
function jsStrings(src) {
  const out = []; let i = 0; const n = src.length;
  const kwBeforeRegex = /(?:^|[^\w$])(return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/;
  const lines = src.split('\n');
  const lineOf = k => src.slice(0, k).split('\n').length;
  const push = (s, start) => { const ln = lineOf(start); out.push({ s, line: ln, src: lines[ln - 1] || '' }); };
  function readQuoted(q) {
    const start = i; i++; let s = '';
    while (i < n && src[i] !== q) { if (src[i] === '\\') { s += src[i + 1]; i += 2; continue; } if (src[i] === '\n') break; s += src[i++]; }
    i++; push(s, start);
  }
  function readTemplate() {
    const start = i; i++; let s = '';
    while (i < n && src[i] !== '`') {
      if (src[i] === '\\') { s += src[i + 1]; i += 2; continue; }
      if (src[i] === '$' && src[i + 1] === '{') {
        push(s, start); s = ''; i += 2; let depth = 1;
        while (i < n && depth) {
          const ch = src[i];
          if (ch === '{') depth++; else if (ch === '}') { depth--; if (!depth) break; }
          else if (ch === "'" || ch === '"') { readQuoted(ch); continue; }
          else if (ch === '`') { readTemplate(); continue; }
          i++;
        }
        i++; continue;
      }
      s += src[i++];
    }
    i++; push(s, start);
  }
  while (i < n) {
    const ch = src[i];
    if (ch === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (ch === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue; }
    if (ch === "'" || ch === '"') { readQuoted(ch); continue; }
    if (ch === '`') { readTemplate(); continue; }
    if (ch === '/') {
      const before = src.slice(Math.max(0, i - 12), i).replace(/\s+$/, '');
      const last = before.slice(-1);
      if (!before || '(,=:[!&|?{};+-*%<>~^'.includes(last) || kwBeforeRegex.test(before)) {
        i++; let inClass = false;
        while (i < n) { const c = src[i]; if (c === '\\') { i += 2; continue; } if (c === '[') inClass = true; else if (c === ']') inClass = false; else if (c === '/' && !inClass) break; else if (c === '\n') break; i++; }
        i++; while (/[a-z]/i.test(src[i] || '')) i++; continue;
      }
    }
    i++;
  }
  return out;
}
function htmlStrings(src) {
  const out = [];
  let body = src.replace(/<!--[\s\S]*?-->/g, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  body = body.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (m, code) => { for (const x of jsStrings(code)) out.push(x); return ''; });
  body.split('\n').forEach((s, k) => out.push({ s, line: k + 1, src: s }));
  return out;
}

// ---------------------------------------------------------------------------
// 1. 禁用字串（店主用語）；2. v3 拿掉的系統
// ---------------------------------------------------------------------------
const FORBID = ['——', '櫃台', '遺物', '卡片資訊', '派對', '全場大合唱', '心聲', '反咬',
  '視頻', '質量', '信息', '網絡', '軟件', '默認', '用戶', '屏幕', '登錄', '鼠標', '硬盤', '打印', '緩存', '加載'];
// SPEC-v3 §10.6：v3 拿掉的系統（對決、教學、外殼的畫面字都不准有）
const OLD_MECH = ['氣勢', '輾壓', '賭注', '相生', '割捨', '七星回擊', '霸權', '點播'];
const HAS_CJK = /[㐀-鿿　-〿＀-￯]/;
// 「入耳」：舊的軸名不准（入耳 5、入耳：）；店主 11-12 的教學句用它當白話「難入耳」（再難入耳、難入耳），照用
const AXIS_IN = [/入耳\s?[0-9０-９：:]/, /(^|[^一-鿿])入\s?[0-9０-９]/, /[經冷](典|門)?\s?[0-9０-９]*\s?[／/、・|｜ ]\s?入(?![一-鿿])/, /^入[:：]?$/];
let HABIT_ZH = new Set();     // 脾氣的內部名（虛晃…）：不上畫面，「晃」不擋
const SWAY_OK = new Set(['玻璃門晃了晃，映出推門的人。']);   // 店主 11-10 開頭旁白：玻璃門在晃，不是虛晃翻面
function scanStrings(file, strings, opts = {}) {
  for (const { s, line, src } of strings) {
    if (!s) continue;
    const at = file + ':' + line;
    for (const f of FORBID) if (s.includes(f)) err(at, '禁用字串「' + f + '」→ ' + s.slice(0, 60));
    if (s.includes('—') && (opts.allDash || HAS_CJK.test(s))) err(at, '破折號「—」→ ' + s.slice(0, 60));
    for (const re of AXIS_IN) if (re.test(s)) err(at, '三軸寫成舊名「入」（要寫硬蕊）→ ' + s.slice(0, 60));
    if (opts.mech) for (const w of OLD_MECH) if (s.includes(w)) err(at, 'v3 拿掉的系統「' + w + '」不准出現在畫面字 → ' + s.slice(0, 60));
    if (opts.duelCopy) {
      if (s.includes('晃') && !HABIT_ZH.has(s) && !SWAY_OK.has(s)) err(at, 'v3 對決／教學的字不准有「晃」（虛晃翻面已刪）→ ' + s.slice(0, 60));
      if (s.includes('配件') && !/relic/i.test(src || '')) err(at, '「配件」只准出現在發燒配件的介面（這一行原始碼沒提到 relic）→ ' + s.slice(0, 60));
    }
  }
}
const read = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null;

// 先載入資料（HABIT_ZH 要用）
let C;
try { C = require(path.join(LAB, 'content.js')); }
catch (e) { err('content.js', '載入失敗：' + e.message); report(); process.exit(1); }
HABIT_ZH = new Set(Object.values(C.habits || {}).map(h => h && h.zh).filter(Boolean));

const scanned = [];
const FILES = [
  // [檔名, 種類, 舊系統字, 對決／教學的字]
  ['content.js', 'js', true, true], ['duel.js', 'js', true, true], ['tutorial.js', 'js', true, true],
  ['ui.js', 'js', true, false], ['cardinfo.js', 'js', true, false], ['econ.js', 'js', true, false], ['index.html', 'html', true, false],
  ['stage.js', 'js', false, false], ['shop.js', 'js', false, false], ['shop-props.js', 'js', false, false], ['fx.js', 'js', false, false]
];
const SKIP = new Set(String(process.env.LINT_SKIP || '').split(',').map(x => x.trim()).filter(Boolean));
for (const [rel, kind, mech, duelCopy] of FILES) {
  if (SKIP.has(rel)) { warns.push('LINT_SKIP：這次沒掃 ' + rel); continue; }
  const src = read(path.join(LAB, rel));
  if (src == null) { warns.push('略過（尚無此檔）：' + rel); continue; }
  scanned.push(rel);
  scanStrings(rel, kind === 'html' ? htmlStrings(src) : jsStrings(src), { allDash: rel === 'content.js', mech, duelCopy });
}

// 店內名牌（shops/*.json：熱點 label、revealLabel、店名、區名）
const SHOP_KEYS = ['label', 'revealLabel', 'name', 'district', 'note'];
const shopLabels = [];
const shopDir = path.join(LAB, 'shops');
if (fs.existsSync(shopDir)) {
  for (const f of fs.readdirSync(shopDir).filter(x => x.endsWith('.json')).sort()) {
    let J; try { J = JSON.parse(fs.readFileSync(path.join(shopDir, f), 'utf8')); } catch (e) { err('shops/' + f, 'JSON 讀不了：' + e.message); continue; }
    const walk = (o, p) => {
      if (Array.isArray(o)) o.forEach((v, k) => walk(v, p + '[' + k + ']'));
      else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) {
        if (typeof v === 'string' && SHOP_KEYS.includes(k) && HAS_CJK.test(v)) shopLabels.push({ file: 'shops/' + f, where: p + '.' + k, s: v });
        else walk(v, p + '.' + k);
      }
    };
    walk(J, '');
  }
  scanStrings('shops', shopLabels.map(x => ({ s: x.s, line: x.file + x.where })), { allDash: true });
  scanned.push('shops/*.json（名牌 ' + shopLabels.length + '）');
}

const CARDS = C.cards || {};
const pitches = JSON.parse(read(path.join(HERE, 'pitches.json')) || '{}');
scanned.push('cards.js（pitch／藝人／專輯）', 'tools/pitches.json');
for (const card of Object.values(CARDS)) {
  if (card.pitch) scanStrings('cards.js#' + card.id, [{ s: card.pitch, line: 'pitch' }], { allDash: true });
  for (const k of ['artist', 'album']) if (/派對/.test(card[k] || '')) err('cards.js#' + card.id, k + ' 含「派對」（會出現在畫面上）');
}
for (const [id, p] of Object.entries(pitches)) if (!id.startsWith('_')) scanStrings('pitches.json#' + id, [{ s: p.text, line: 'text' }], { allDash: true });

// ---------------------------------------------------------------------------
// 收集所有句子（含場景與來源標記）
// ---------------------------------------------------------------------------
const TAG_OK = t => ['原句', '拍板', '店主', '新'].includes(t) || /^新:[A-D]$/.test(t);
let OWNER = { rules: [], lines: [] };
try { OWNER = JSON.parse(read(path.join(HERE, 'owner-lines-v4.json'))); } catch (e) { err('tools/owner-lines-v4.json', '讀不了：' + e.message); }
const OWNER_SET = new Set(OWNER.lines || []);
const items = []; // { scene, where, who, key?, text, tag, raw? }
const draftEdits = []; // 改過店主草稿的提示句 { id, from, to, key }（R-03／COPY-05）
const add = it => items.push(it);
const SCENE = { prologue: '序章（O2–O21；O1 11-10 併進開頭旁白）', epilogueWin: '序章收尾（E1–E11：他走了 → 地上那張盤 → 發燒配件三選一 → 第一位客人推門）',
  bossEnter: '傳說藏家進門（每輪第 5 位）', bossDown: '打倒傳說藏家（每一輪：翻開他的王牌）', dead: '散場（這一趟結束）', again: '再挑戰一趟' };
const UI_OK = ['guess', 'acePick', 'recs', 'bargain', 'duel', 'stake', 'relic', 'map'];
const WHO_OK = ['', '老闆', '男子', '藏家', '傳說藏家', '？？？', 'player'];
const TIER_KEYS = ['hall', 'pearl', 'heresy'];
const seenBeat = new Set();
const seenExtra = new Set();
const ORIG = read(path.join(ROOT, 'roguelike.html'));
let OWNER_SET0 = new Set(); try { OWNER_SET0 = new Set(JSON.parse(read(path.join(HERE, 'owner-lines-v4.json'))).lines || []); } catch (_) {}
const extraTag = t => ORIG && ORIG.includes(t) ? '原句' : (OWNER_SET0.has(t) || [...OWNER_SET0].some(o => typeof o === 'string' && o.includes(t))) ? '店主' : '新';   // O7 的面板標題＝店主句的一段（COPY-18d）
// Beat.text：字串，或 { hall, pearl, heresy }（依今晚那張；C.tonightLines）→ 展開成 [[tier|null, 字串]]
const beatTexts = b => (b && b.text && typeof b.text === 'object') ? TIER_KEYS.map(t => [t, b.text[t]]) : [[null, b && b.text]];
const flatTexts = b => beatTexts(b).map(x => x[1]).filter(x => typeof x === 'string');
for (const [key, beats] of Object.entries(C.script || {})) {
  if (!Array.isArray(beats)) { err('script.' + key, '不是陣列'); continue; }
  const ids = new Set();
  beats.forEach((b, k) => {
    const where = 'script.' + key + '[' + k + ']';
    if (!b || beatTexts(b).some(x => typeof x[1] !== 'string' || !x[1])) { err(where, '沒有 text（字串，或 hall／pearl／heresy 三個都有）'); return; }
    if (!b.id || ids.has(b.id)) err(where, 'Beat 要有不重複的 id：' + b.id); ids.add(b.id);
    if (!TAG_OK(b.tag)) err(where, 'Beat 沒有合法 tag（原句／拍板／店主／新）：' + flatTexts(b)[0].slice(0, 30));
    if (!WHO_OK.includes(b.who)) err(where, 'who 不合法：' + b.who);
    for (const t of flatTexts(b)) if (b.who && b.who !== 'player' && !t.includes('「')) err(where, '說話的句子要用「」：' + t.slice(0, 30));
    if (b.ui && !UI_OK.includes(b.ui)) err(where, 'ui 不合法：' + b.ui);
    const extras = [];
    for (const extra of ['prompt', 'stamp', 'quietText', 'button']) if (b[extra]) extras.push([extra, b[extra]]);
    if (b.set && b.set.stamp) extras.push(['set.stamp', b.set.stamp]);
    (b.prompts || []).forEach((t, j) => extras.push(['prompts[' + j + ']', t]));
    (b.promptSubs || []).forEach((t, j) => { if (t) extras.push(['promptSubs[' + j + ']', t]); });
    for (const [extra, t] of extras) if (!seenExtra.has(t)) {
      seenExtra.add(t);
      add({ scene: SCENE[key] || key, where: where + '.' + extra, who: '（畫面字）', text: t, tag: extraTag(t), ui: true });
    }
    for (const [tier, t] of beatTexts(b)) {
      const dup = b.who + '|' + t + '|' + b.tag;
      if (seenBeat.has(dup)) continue; seenBeat.add(dup);
      add({ scene: SCENE[key] || key, where: where + (tier ? '.' + tier : ''), who: (b.who || '旁白') + '・' + b.id + (tier ? '・' + tier : ''), text: t, tag: b.tag, beat: true });
    }
  });
}
// 開頭旁白＋玻璃倒影捏人（店主 11-10 定稿；第一次推門）
((C.intro || {}).lines || []).forEach((x, k) => {
  if (!TAG_OK(x.tag)) err('intro.lines[' + k + ']', '沒有 tag');
  add({ scene: '開頭旁白（第一次推門：黑幕 → 玻璃倒影捏人）', where: 'intro.lines[' + k + ']', who: '旁白・' + x.id, text: x.text, tag: x.tag, beat: x.tag === '原句' });
});
for (const k of ['title', 'skip']) if ((C.intro || {})[k]) add({ scene: '開頭旁白（第一次推門：黑幕 → 玻璃倒影捏人）', where: 'intro.' + k, who: '（畫面字）', text: C.intro[k], tag: extraTag(C.intro[k]), ui: true });
// 今晚那張的兩句音樂描述（D §2 猜歌第 2 步；店主草稿）
for (const t of TIER_KEYS) ((C.tonightLines || {})[t] || []).forEach((x, k) => {
  if (!TAG_OK(C.tonightLinesTag)) err('tonightLines.' + t, '沒有 tag（tonightLinesTag）');
  add({ scene: '序章・今晚那張的音樂描述（O5a／O5b）', where: 'tonightLines.' + t + '[' + k + ']', who: '旁白', text: x, tag: C.tonightLinesTag });
});

// 舞台泡泡（lines ↔ lineTags 同形狀）
const LINE_KEY = { line: '口頭禪（開場泡泡）', intro: '進門那句', switch: '急了／翻面（泡泡）', lose: '你贏了（他說）', win: '你輸了（他說）',
  jabBubble: '回嘴選了那張（第一手）', stampSub: '出場蓋章的副標', retry: '老闆說情', bagFull: '包包滿了', relicFull: '發燒配件滿了' };
const WHO = { owner: '老闆', player: '你' };
for (const [who, lines] of Object.entries(C.lines || {})) {
  const tags = (C.lineTags || {})[who];
  const name = WHO[who] || (C.enemies[who] && C.enemies[who].name) || who;
  if (!tags) { err('lineTags.' + who, '缺少整組標記'); continue; }
  for (const [key, val] of Object.entries(lines)) {
    const arr = Array.isArray(val) ? val : [val];
    const tarr = Array.isArray(tags[key]) ? tags[key] : [tags[key]];
    arr.forEach((text, k) => {
      const where = 'lines.' + who + '.' + key + (Array.isArray(val) ? '[' + k + ']' : '');
      if (typeof text !== 'string' || !text) { err(where, '不是字串'); return; }
      if (!TAG_OK(tarr[k])) err(where, '沒有合法 tag：' + text);
      if (text.includes('「') && !/「[^」]*」/.test(text)) err(where, '「」不成對：' + text);
      add({ scene: who === 'owner' ? '老闆（對決外）' : who === 'player' ? '你' : '舞台泡泡・' + name, where, who: name, key: LINE_KEY[key] || key, text, tag: tarr[k] });
    });
  }
}
// 每位客人的台詞鍵（v3：口頭禪、進門、你贏、你輸；菁英與藏家多一句急了／翻面）
for (const id of Object.keys(C.enemies || {})) {
  const l = (C.lines || {})[id], e = C.enemies[id];
  if (!l) { err('lines.' + id, '缺少台詞'); continue; }
  const keys = e && e.prologue ? ['intro', 'lose'] : ['line', 'intro', 'lose', 'win'];      // 序章男子只有原句（D §2、COPY-01）
  for (const k of keys) if (!l[k] || (Array.isArray(l[k]) && !l[k].length)) err('lines.' + id, '缺少 ' + k);
  if (e && e.prologue) for (const k of ['line', 'win']) if (k in l) err('lines.' + id, '序章男子不該有 ' + k + '（試做版加的句子，D §2）');
  if ('switch' in l) err('lines.' + id, 'v4 拿掉急了／翻面：不該有 switch');
  // 開場泡泡（line）與進門那句（intro）跟提示句同時在畫面上：不能用提示的關鍵字（R-04／COPY-06：資深樂評「名盤就是名盤。」像這手的提示）
  const KEYS = [].concat(...Object.values(C.hintKeywords || {}), ...Object.values(C.hints || {}).map(a => a.map(h => h.key)));
  for (const k of ['line', 'intro']) [].concat(l[k] || []).forEach(t => { const hit = KEYS.find(w => w && String(t).includes(w)); if (hit) err('lines.' + id + '.' + k, '用到提示關鍵字「' + hit + '」：' + t); });
}
for (const k of ['retry', 'bagFull', 'relicFull']) if (!((C.lines || {}).owner || {})[k]) err('lines.owner', '缺少 ' + k);

// 誠實度不上畫面（FIXLIST 6，店主 2026-11-08 06:05）：C.honesty 只留機率 q；客人只有名字（身分），沒有副標
for (const [k, h] of Object.entries(C.honesty || {})) if (h && 'zh' in h) err('honesty.' + k + '.zh', '誠實度不上畫面（FIXLIST 6）：拿掉 zh');
if ('honestyTag' in C) err('honestyTag', '誠實度不上畫面（FIXLIST 6）：拿掉 honestyTag');
for (const [k, e] of Object.entries(C.enemies || {})) if (e && 'title' in e) err('enemies.' + k + '.title', '客人的副標併進名字了（FIXLIST 6）：拿掉 title');
// 客人名字（名牌、今晚來客清單；FIXLIST 6 店主定的身分）
for (const [k, e] of Object.entries(C.enemies || {})) if (e && e.name) add({ scene: '客人名字（名牌、今晚來客；FIXLIST 6）', where: 'enemies.' + k + '.name', who: '（畫面字）', key: k, text: e.name, tag: '店主' });
// 稀有度名（FIXLIST 8＝CARD_GAME_DESIGN §5）
for (const [k, v] of Object.entries(C.rarityZh || {})) {
  if (!TAG_OK(C.rarityTag)) err('rarityZh.' + k, '沒有 tag（rarityTag）');
  add({ scene: '稀有度（唱片資訊、價錢）', where: 'rarityZh.' + k, who: '（畫面字）', key: k, text: v, tag: C.rarityTag });
}

// 提示句（SPEC-v4 §2.2.4）：每色 5 句；不寫屬性名；key 必為句子的子字串（結果句用它教「『key』是 X」）
const ATTR_ZH = { c: '經典', o: '冷門', h: '硬蕊' };
for (const a of ['c', 'o', 'h']) {
  const hs = (C.hints || {})[a];
  if (!Array.isArray(hs) || hs.length !== 5) { err('hints.' + a, '每色要 5 句'); continue; }
  hs.forEach((h, k) => {
    const where = 'hints.' + a + '[' + k + ']';
    if (!h || typeof h.text !== 'string' || !h.text) { err(where, '沒有 text'); return; }
    if (!TAG_OK(h.tag)) err(where, '沒有合法 tag：' + h.text);
    if (/經典|冷門|硬蕊/.test(h.text)) err(where, '提示句不准寫出屬性名：' + h.text);
    if (typeof h.key !== 'string' || !h.key || !h.text.includes(h.key)) err(where, 'key 要是句子的子字串：' + h.key);
    if (len(h.text) > 24) err(where, '提示句超過 24 字：' + h.text);
    add({ scene: '提示句（他這手的打算；揭曉後教「key 是哪一色」）', where, who: '（提示）', key: ATTR_ZH[a] + '・' + h.id + '・key「' + h.key + '」', text: h.text, tag: h.tag });
    if (h.draft) { if (!OWNER_SET0.has(h.draft)) err(where, 'draft 要是 owner-lines-v4.json 裡的店主草稿原文：' + h.draft); draftEdits.push({ id: h.id, from: h.draft, to: h.text, key: h.key }); }
  });
}
for (const [a, ws] of Object.entries(C.hintKeywords || {})) (ws || []).forEach((w, k) => {
  if (!TAG_OK(C.hintKeywordsTag)) err('hintKeywords.' + a, '沒有 tag（hintKeywordsTag）');
  add({ scene: '提示的關鍵字族（D §5；參考清單）', where: 'hintKeywords.' + a + '[' + k + ']', who: '（關鍵字）', key: ATTR_ZH[a], text: w, tag: C.hintKeywordsTag });
});

// 一次性老闆小提示（SPEC-v3 §6）：duel.js hooks.hint 的五個 id
const TIP_IDS = ['tip_mirror', 'tip_bluff', 'tip_block', 'tip_ace', 'tip_rounds'];
const TIPS = C.coachTips || {};
for (const id of TIP_IDS) if (!TIPS[id]) err('coachTips.' + id, '缺少（duel.js 會送這個 id）');
for (const [k, v] of Object.entries(TIPS)) {
  const tag = (C.coachTipTags || {})[k];
  if (!TAG_OK(tag)) err('coachTips.' + k, '沒有 tag（coachTipTags）');
  if (len(v) > 20) err('coachTips.' + k, '超過 20 字（' + len(v) + '）：' + v);
  add({ scene: '一次性老闆小提示（第一次發生時，5 秒）', where: 'coachTips.' + k, who: '老闆', key: (C.coachTipWhen || {})[k], text: v, tag });
}

// 規則卡（「?」小抄與標題畫面共用；SPEC-v3 §0）
const R = C.rules;
if (!R || !Array.isArray(R.lines)) err('rules', '沒有規則卡');
else {
  if (!TAG_OK(C.rulesTag)) err('rules', '沒有 tag（rulesTag）');
  if (!TAG_OK(C.rulesLinesTag)) err('rules.lines', '沒有 tag（rulesLinesTag）');
  if (R.lines.length !== 6) err('rules.lines', '規則卡要六行，現在 ' + R.lines.length);
  R.lines.forEach((t, k) => { if (len(t) > 56) err('rules.lines[' + k + ']', '超過 56 字：' + t); });
  if (!['冷門剋經典', '經典剋硬蕊', '硬蕊剋冷門'].every(w => (R.lines[2] || '').includes(w))) err('rules.lines[2]', '第 3 行要含 冷門剋經典、經典剋硬蕊、硬蕊剋冷門（店主 11-12 改全名）');
  if (JSON.stringify(R.lines) !== JSON.stringify(OWNER.rules || [])) err('rules.lines', '六行要逐字＝tools/owner-lines-v4.json 的規則卡（D §5，不含編號與「←」註記）');
  const push = (where, text, tag, raw) => { if (typeof text === 'string' && text) add({ scene: '規則卡（「?」小抄）', where, who: '（畫面字）', text, tag: tag || C.rulesTag, raw }); };
  push('rules.title', R.title);
  R.lines.forEach((t, k) => push('rules.lines[' + k + ']', (k + 1) + ' ' + t, C.rulesLinesTag, t));
  if (R.example) {
    push('rules.example.title', R.example.title);
    (R.example.read || []).forEach((t, k) => push('rules.example.read[' + k + ']', t));
    for (const k of ['eLabel', 'pLabel', 'rowLabel']) push('rules.example.' + k, R.example[k]);
  }
  push('rules.why', R.why);
  push('rules.relics', R.relics);
  (R.foot || []).forEach((t, k) => push('rules.foot[' + k + ']', t));
}
// 牌桌小抄（點相剋圖打開；店主 11-12）
(C.cheatSheet || []).forEach((r, k) => {
  if (!TAG_OK(C.cheatSheetTag)) err('cheatSheet', '沒有 tag（cheatSheetTag）');
  if (!Array.isArray(r) || r.length !== 2 || !r.every(x => typeof x === 'string' && x)) { err('cheatSheet[' + k + ']', '要是 [左欄, 右欄] 兩個字串'); return; }
  if (len(r[0] + r[1]) > 20) err('cheatSheet[' + k + ']', '超過 20 字：' + r.join(' '));
  add({ scene: '對決盤面・牌桌小抄（點相剋圖打開）', where: 'cheatSheet[' + k + ']', who: '（畫面字）', text: r[0] + '　' + r[1], tag: C.cheatSheetTag });
});
// 三軸 7 星的白話（挑王牌那行括號、唱盤前三張的小字）
for (const [t, v] of Object.entries(C.aceGloss || {})) {
  if (!TAG_OK(C.aceGlossTag)) err('aceGloss.' + t, '沒有 tag（aceGlossTag）');
  add({ scene: '挑王牌那行括號／唱盤前三張的小字', where: 'aceGloss.' + t, who: '（畫面字）', key: (C.aceTitle || {})[t], text: v, tag: C.aceGlossTag });
}

// 對決盤面上的字（SPEC-v3 §4、§6）
for (const [k, v] of Object.entries(C.duelText || {})) {
  if (typeof v !== 'string') continue;
  if (!TAG_OK(C.duelTextTag)) err('duelText.' + k, '沒有 tag（duelTextTag）');
  add({ scene: '對決盤面的字（{x} 由畫面代入）', where: 'duelText.' + k, who: '（畫面字）', key: k, text: v, tag: C.duelTextTag });
}

// 發燒配件（6 件；說明＋生效那句）
for (const [id, r] of Object.entries(C.relics || {})) {
  if (!TAG_OK(r.tag)) err('relics.' + id, '沒有 tag');
  if (!r.desc) err('relics.' + id, '沒有 desc'); else if (len(r.desc) > 16) err('relics.' + id + '.desc', '超過 16 字：' + r.desc);
  if (!r.note) err('relics.' + id, '沒有 note'); else if (len(r.note) > 12) err('relics.' + id + '.note', '超過 12 字：' + r.note);
  add({ scene: '發燒配件（點圖示看的說明／生效那手結果行補的一句）', where: 'relics.' + id, who: r.name + (r.price ? '・$' + r.price : ''), text: r.desc + '｜' + r.note, tag: r.tag });
}
if (C.relics && C.relics.boost_o && C.relics.boost_o.desc !== '冷門出招時 +1 星' + '。') err('relics.boost_o.desc', '要是 D §6 例句「冷門出招時 +1 星」加句號');
if (!OWNER_SET.has('冷門出招時 +1 星')) err('tools/owner-lines-v4.json', '少了 D §6 的「冷門出招時 +1 星」');

// 序章引導教學（SPEC-v4 §2.5.5：六手 18 步，老闆的泡泡 ≤25 字；依王牌分句的 text 三張各算一句）
const TUT = C.tutorial;
if (!TUT) err('tutorial', '沒有 C.tutorial');
else {
  const steps = TUT.steps || [];
  if (!steps.length) err('tutorial.steps', '沒有教學步驟');
  let hand = 1;
  const handOf = [];
  steps.forEach(st => {
    const atRes = st.kind === 'say' && (st.target || []).includes('result');
    handOf.push(atRes ? hand - 1 : hand);
    if (st.allow && st.allow.throw) hand++;
  });
  steps.forEach((st, k) => {
    const texts = typeof st.text === 'object' ? Object.entries(st.text) : [[null, st.text]];   // （v5 手風琴：沒有 step.spread「點一下手牌攤開。」了）
    for (const [tier, t] of texts) {
      const where = 'tutorial.steps.' + st.id + (tier ? '.' + tier : '');
      if (typeof t !== 'string' || !t) { err(where, '沒有台詞'); continue; }
      if (!TAG_OK(st.tag)) err(where, '沒有合法 tag');
      if (len(t) > 25) err(where, '教學台詞超過 25 字（' + len(t) + '）：' + t);
      const tierZh = { hall: '殿堂', pearl: '流亡', heresy: '異端' };
      const kindZh = { say: '說', do: '做', soft: '建議' }[st.kind] || st.kind;
      add({ scene: '序章引導教學・第 ' + handOf[k] + ' 手（老闆的泡泡）', where, who: '老闆・' + st.id + '・' + kindZh + (tier ? '・' + tierZh[tier] : ''), text: t, tag: st.tag });
    }
  });
  if (!TAG_OK(TUT.uiTag)) err('tutorial.ui', '沒有 uiTag');
  for (const [k, v] of Object.entries(TUT.ui || {})) {
    if (len(v) > 18) err('tutorial.ui.' + k, '超過 18 字：' + v);
    add({ scene: k === 'wrong' ? '序章引導教學・點錯時' : '序章引導教學・按鈕與標題', where: 'tutorial.ui.' + k, who: k === 'wrong' ? '老闆' : '（畫面字）', text: v,
      tag: ORIG && ORIG.includes(v) && v.length > 3 ? '原句' : TUT.uiTag });
  }
  // 唱盤前（教學那條路）：老闆攤開三張，一句亮一條箭頭（C.tutorial.intro；店主 11-12）
  ((TUT.intro && TUT.intro.lines) || []).forEach((L, k) => {
    const where = 'tutorial.intro.' + (L && L.id || k);
    if (!L || typeof L.text !== 'string' || !L.text) { err(where, '沒有台詞'); return; }
    if (!TAG_OK(TUT.introTag)) err(where, '沒有 tag（introTag）');
    if (!/^「[^」]*」$/.test(L.text)) err(where, '說話的句子要用「」：' + L.text);
    add({ scene: '序章引導教學・唱盤前（老闆攤開三張，看向老闆那條路）', where, who: ((TUT.intro && TUT.intro.who) || '老闆') + '・' + (L.id || k), text: L.text, tag: TUT.introTag });
  });
  for (const [k, v] of Object.entries(TUT.learned || {})) {
    if (len(v) > 16) err('tutorial.learned.' + k, '超過 16 字：' + v);
    add({ scene: '序章引導教學・學會的小卡（飛進「?」）', where: 'tutorial.learned.' + k, who: '（畫面字）', text: (TUT.ui && TUT.ui.learnedPrefix || '') + v, tag: TUT.uiTag });
  }
}

// 店裡熱點、今晚來客、台北預告（C.shopLines ↔ C.shopLineTags 同形狀）
if (C.shopLines) {
  const SHORT = ['poster', 'cat', 'locked', 'binBusy', 'ownerHint', 'nightIntro', 'taipeiHere', 'backToShop', 'bin', 'booth', 'boothEmpty'];
  const sceneOf = key => key === 'nightIntro' ? '今晚來客・第一次（soft 提示）' : /^taipei|backToShop/.test(key) ? '台北地圖預告' : '店裡熱點（點了說一句）';
  const walkS = (val, tag, key, where) => {
    if (Array.isArray(val)) return val.forEach((v, k) => walkS(v, Array.isArray(tag) ? tag[k] : tag, key, where + '[' + k + ']'));
    if (val && typeof val === 'object') return Object.entries(val).forEach(([k, v]) => walkS(v, tag && tag[k], key, where + '.' + k));
    if (typeof val !== 'string' || !val) { err(where, '不是字串'); return; }
    if (!TAG_OK(tag)) err(where, '沒有合法 tag（shopLineTags）：' + val);
    if (SHORT.includes(key) && len(val) > 20) err(where, '超過 20 字：' + val);
    add({ scene: sceneOf(key), where, who: ((C.shopLineWho || {})[key]) || '老闆', key: where.replace(/^shopLines\./, ''), text: val, tag });
  };
  for (const [k, v] of Object.entries(C.shopLines)) walkS(v, (C.shopLineTags || {})[k], k, 'shopLines.' + k);
}
for (const [k, b] of Object.entries(C.bins || {})) if (b && b.label) add({ scene: '店裡熱點・箱子的名牌', where: 'bins.' + k + '.label', who: '（畫面字）', text: b.label, tag: '新' });
// 經濟介面的字（B3 用；SPEC-v4 §2.2.8）
for (const [k, v] of Object.entries(C.shopUi || {})) {
  if (typeof v !== 'string' || !v) { err('shopUi.' + k, '不是字串'); continue; }
  if (!TAG_OK(C.shopUiTag)) err('shopUi.' + k, '沒有 tag（shopUiTag）');
  if (len(v) > 24) err('shopUi.' + k, '超過 24 字：' + v);
  add({ scene: '經濟介面（箱子、櫃檯、特價箱；{x} 由畫面代入）', where: 'shopUi.' + k, who: '（畫面字）', key: k, text: v, tag: C.shopUiTag });
}
if (C.bargain && C.bargain.label) { if (!TAG_OK(C.bargainTag)) err('bargain.label', '沒有 tag（bargainTag）'); add({ scene: '經濟介面（箱子、櫃檯、特價箱；{x} 由畫面代入）', where: 'bargain.label', who: '（畫面字）', text: C.bargain.label, tag: C.bargainTag }); }
// 無限試煉（C.trial 的畫面字：頂欄、來客、說情、升級三選一、結果行補的一句）與結算
if ('night' in C || 'secondNight' in C) err('content', '無限試煉沒有一晚與第二夜：C.night／C.secondNight 不准回來');
const TRIAL_SCENE = { ui: '無限試煉・頂欄、來客、說情、標題（{x} 由畫面代入）', levelUp: '無限試煉・升級三選一（店主暫定的名字：品味／底氣）', notes: '無限試煉・結果行補的一句（品味／底氣多扣、少扣）' };
for (const [grp, scene] of Object.entries(TRIAL_SCENE)) {
  const walkT = (val, where) => {
    if (Array.isArray(val)) return val.forEach((v, k) => walkT(v, where + '[' + k + ']'));
    if (typeof val !== 'string' || !val) { err(where, '不是字串'); return; }
    if (!TAG_OK(C.trialTag)) err(where, '沒有 tag（trialTag）');
    if (len(val.replace(/\{\w+\}/g, '')) > 24) err(where, '超過 24 字（不算 {x}）：' + val);
    add({ scene, where, who: '（畫面字）', key: where.replace(/^trial\.[a-zA-Z]+\./, ''), text: val, tag: C.trialTag });
  };
  for (const [k, v] of Object.entries((C.trial || {})[grp] || {})) walkT(v, 'trial.' + grp + '.' + k);
}
for (const [k, v] of Object.entries(C.summary || {})) {
  if (!TAG_OK(C.summaryTag)) err('summary.' + k, '沒有 tag（summaryTag）');
  add({ scene: '無限試煉・結算與標題的紀錄', where: 'summary.' + k, who: '（畫面字）', key: k, text: v, tag: C.summaryTag });
}
// 一晚版的字不准回到畫面字（店主 11-12：沒有時間、沒有打烊）；序章「今晚那張」（猜歌那張盤）照用
const NIGHT_WORDS = [/今晚來客/, /打烊/, /再來一夜/, /今晚賣完/, /今晚就到這/, /今晚到這/, /第二夜/];
for (const it of items) if (!/^(pitch#|shops\/)/.test(it.where)) for (const re of NIGHT_WORDS) if (re.test(String(it.text))) err(it.where, '無限試煉沒有一晚：不准再寫「' + re.source + '」→ ' + it.text);
for (const x of shopLabels) if (!/\.note$/.test(x.where)) add({ scene: '店內名牌（' + x.file + '）', where: x.file + x.where, who: '（畫面字）', text: x.s, tag: '新' });   // *.note 是給開發看的註解、不上畫面（COPY-18b；禁用字照掃）
// 推薦語分組照這張卡真的出現在哪裡（COPY-18c：pitches.json 的 scene 是 v3 的分組，FEATURE 的卡被列在「老闆四張」）
function pitchScene(id, p) {
  const TZ = { hall: '殿堂', pearl: '流亡', heresy: '異端' };
  for (const t of Object.keys(C.aces || {})) if (C.aces[t] === id) return '王牌（' + (TZ[t] || t) + '）';
  for (const t of Object.keys(C.gifts || {})) if ((C.gifts[t] || []).includes(id)) return '老闆四張・' + (TZ[t] || t);
  if (((C.bargain || {}).pool || []).includes(id)) return '特價箱';
  const en = Object.entries(C.enemies || {}).filter(([, e]) => (e.deck || []).includes(id)).map(([, e]) => e.name);
  if (en.length) return '客人的唱片（' + en.join('、') + '）';
  for (const [k, b] of Object.entries(C.bins || {})) if (((b && (b.pool || b.cards)) || []).includes(id)) return '店裡的箱子（' + (b.label || k) + '）';
  return p.scene || '其他';
}
for (const [id, p] of Object.entries(pitches)) {
  if (id.startsWith('_')) continue;
  if (!TAG_OK(p.tag)) err('pitches.json#' + id, '沒有 tag');
  const card = CARDS[id];
  if (card && card.pitch !== p.text) err('pitches.json#' + id, 'cards.js 的 pitch 跟 pitches.json 不一致（重跑 bake-cards.mjs）');
  add({ scene: '推薦語・' + pitchScene(id, p), where: 'pitch#' + id, who: card ? card.artist + '《' + card.album + '》' : id, text: p.text, tag: p.tag });
}

// 收集來的句子再掃一次 v3 舊系統字（資料欄位不一定在 content.js 原始碼的同一行，例如 pitches.json）
for (const it of items) {
  if (it.where.startsWith('pitch#') || it.where.startsWith('shops/')) continue;
  for (const w of OLD_MECH) if (String(it.text).includes(w)) err(it.where, 'v3 拿掉的系統「' + w + '」→ ' + it.text);
  if (String(it.text).includes('不會被剋')) err(it.where, '王牌沒有「不會被剋」了（FIXLIST 2）→ ' + it.text);
  if (/^(tutorial|coachTips|duelText|hints|honesty|rules\.lines|lines\.)/.test(it.where)) {
    if (String(it.text).includes('晃')) err(it.where, '對決／教學的字不准有「晃」→ ' + it.text);
    if (String(it.text).includes('配件') && !/relic/i.test(it.where)) err(it.where, '「配件」只准出現在發燒配件的介面 → ' + it.text);
  }
}

// ---------------------------------------------------------------------------
// 3. 必須原樣出現；耳朵宣告不得出現
// ---------------------------------------------------------------------------
const MUST = ['封套邊緣磨損嚴重，顯然塵封已久。', '老闆不發一語，緩步走出櫃檯，站在兩人之間。', '……這品味，也敢出來丟臉？',
  '搵休督欸丟！', '你的憤怒表露無遺。', '既然雙方都不服氣，不如來一場品味對決如何？'];
const scriptText = Object.values(C.script || {}).flat().map(b => flatTexts(b).join('\n')).join('\n');
for (const m of MUST) if (!scriptText.includes(m)) err('script', '必須原樣出現的句子不見了：「' + m + '」');
const EAR_DECL = [/往後都是你自己的打法/, /耳朵專長/, /你的耳朵是/, /你是(老派耳朵|挖盤狂|噪音信徒)/];
for (const it of items) for (const re of EAR_DECL) if (re.test(it.text)) err(it.where, '出現耳朵宣告句（店主 09-03 拿掉，不准加回）：' + it.text);
for (const [key, beats] of Object.entries(C.script || {})) for (const b of beats) for (const t of flatTexts(b)) if (b.who === '老闆' && /(老派耳朵|挖盤狂|噪音信徒)/.test(t)) err('script.' + key, '老闆的對白提到耳朵名（耳朵宣告不准加回）：' + t);

// ---------------------------------------------------------------------------
// 5. 原句／拍板 必須與現行 roguelike.html 一字不差
// ---------------------------------------------------------------------------
let origChecked = 0;
const beatTextsOf = name => {
  if (!ORIG) return [];
  const i = ORIG.indexOf('let ' + name + ' = ['); if (i < 0) return [];
  const blk = ORIG.slice(i, ORIG.indexOf('\n];', i));
  return [...blk.matchAll(/text:'([^']*)'/g)].map(m => m[1]);
};
const ORIG_BEATS = new Set(beatTextsOf('RPG_BEATS').concat(beatTextsOf('TUT_EPILOGUE_BEATS')));
// 藏家進門那句用原版 BOSS_LINES（D §2）
const BOSS_LINES = (() => { if (!ORIG) return []; const i = ORIG.indexOf('const BOSS_LINES = ['); if (i < 0) return []; return [...ORIG.slice(i, ORIG.indexOf('];', i)).matchAll(/'([^']*)'/g)].map(m => m[1]); })();
if (ORIG && BOSS_LINES.length < 5) warns.push('roguelike.html 的 BOSS_LINES 只抓到 ' + BOSS_LINES.length + ' 句');
if (ORIG && ORIG_BEATS.size < 20) warns.push('roguelike.html 的 RPG_BEATS／TUT_EPILOGUE_BEATS 只抓到 ' + ORIG_BEATS.size + ' 句，請確認格式');
if (ORIG == null) warns.push('找不到 ../roguelike.html，略過原句比對');
else for (const it of items) if (it.tag === '原句' || it.tag === '拍板') {
  const t = it.raw || it.text;
  origChecked++;
  if (it.beat && !ORIG_BEATS.has(t) && !(/^script\.bossEnter/.test(it.where) && BOSS_LINES.includes(t))) { err(it.where, '標成「' + it.tag + '」但不等於現行 RPG_BEATS／TUT_EPILOGUE_BEATS（藏家進門：BOSS_LINES）的任何一句：' + t); continue; }
  const inner = /^「([^「」]+)」$/.exec(t);
  if (!ORIG.includes(t) && !(inner && it.where.startsWith('pitch#') && ORIG.includes(inner[1]))) err(it.where, '標成「' + it.tag + '」但現行 roguelike.html 裡找不到一字不差的原文：' + t);
}

// v4 劇本的原句（SPEC-v4 §2.5.4、§2.2.9 B2）：序章＋收尾標「原句」的恰好 25 句，順序＝原版 RPG_BEATS（扣掉 D §2 換掉的 4 句＋11-10 改成開頭旁白的第一句）＋TUT_EPILOGUE_BEATS
//   換掉的 4＋1 句：很迷人那句（→ 今晚那張的兩句描述）、「剛才那段，你覺得是哪一張？」、「跟你有緣，收下吧。」、「你把五張唱片…」
const REPLACED_BY_D = ['……很迷人。你停下腳步，不自覺跟著點起頭來。', '「這三張，是我這裡最貴的三張。」他沒抬頭。「剛才那段，你覺得是哪一張？」',
  '「這四張也很適合你。跟你有緣，收下吧。」', '你把五張唱片放到櫃檯上。老闆一張一張看過，替你收進紙袋。',
  // 店主 11-10：第一句改成開頭旁白（C.intro）
  '下著雨。你推開巷子裡那間唱片行的門。門上的鈴鐺，響了一聲。'];
let orig26 = 0;
if (ORIG) {
  const want = beatTextsOf('RPG_BEATS').filter(t => !REPLACED_BY_D.includes(t)).concat(beatTextsOf('TUT_EPILOGUE_BEATS'));
  const got = [].concat((C.script || {}).prologue || [], (C.script || {}).epilogueWin || []).filter(b => b.tag === '原句').map(b => b.text);
  if (want.length !== 25) err('roguelike.html', '原版序章＋收尾扣掉換掉的 5 句應該是 25 句，抓到 ' + want.length + ' 句（格式變了？）');
  if (got.length !== 25) err('script.prologue＋epilogueWin', '標「原句」的要恰好 25 句，現在 ' + got.length + ' 句');
  want.forEach((t, k) => { if (got[k] !== t) err('script.prologue＋epilogueWin', '第 ' + (k + 1) + ' 句原句不對（要跟原版順序一致）：要「' + t + '」，是「' + (got[k] || '（沒有）') + '」'); else orig26++; });
}
// D §2 拿掉的試做版句子不准回來
const GONE = [/Mylo Xyloto/, /好耳朵/, /點封套下面的字/, /一百塊三張/, /他的袋子裡掉出一張盤/, /每個禮拜都來聽這張/, /今晚是交流夜/, /不是這張。不過/];
for (const it of items) for (const re of GONE) if (re.test(it.text)) err(it.where, 'D §2 拿掉的試做版句子不准回來：' + it.text);
if ('retorts' in C || (C.script && ('quietPrologue' in C.script || 'afterPrologue' in C.script))) err('content', 'v3 的回嘴（C.retorts）、安靜版序章、afterPrologue 要刪掉（D §2）');

// 店主：必須一字不差地在 tools/owner-lines-v4.json（SPEC-v4 §2.2.9）
let ownerChecked = 0;
for (const it of items) if (it.tag === '店主') {
  ownerChecked++;
  const t = it.raw || it.text;
  const part = it.ui && [...OWNER_SET].some(o => typeof o === 'string' && o.includes(t));   // 面板標題＝店主句的一段（O7「你覺得，現在播的是哪張？」）
  if (!OWNER_SET.has(t) && !part) err(it.where, '標成「店主」但 tools/owner-lines-v4.json 裡找不到一字不差的原文：' + t);
}

// ---------------------------------------------------------------------------
// 產生 LINES-REVIEW.md
// ---------------------------------------------------------------------------
const isNew = t => t === '新' || /^新:/.test(t);
const SRC = { '新': '本規格新寫', '新:A': '概念稿 A', '新:B': '概念稿 B', '新:C': '概念稿 C', '新:D': '概念稿 D' };
const esc = s => String(s).replace(/\|/g, '｜').replace(/\n/g, ' ');
const fresh = items.filter(it => isNew(it.tag));
const byScene = new Map();
for (const it of fresh) { if (!byScene.has(it.scene)) byScene.set(it.scene, []); byScene.get(it.scene).push(it); }
const counts = { '原句': 0, '拍板': 0, '店主': 0, '新': 0 };
for (const it of items) counts[isNew(it.tag) ? '新' : it.tag]++;
let md = `# 台詞審稿：品味對決 v4（LINES-REVIEW）

> 由 \`node game-lab/tools/lint-copy.mjs\` 產生，請勿手改。要改句子，直接改 \`game-lab/content.js\`（劇本、台詞、名牌、提示、規則卡、教學）或 \`game-lab/tools/pitches.json\`（推薦語，改完重跑 \`node game-lab/tools/bake-cards.mjs\`），再重跑本檢查。
> 這份只列**新句**（試做版新寫、或取自四份概念稿，店主還沒看過）。標成「原句」「拍板」的句子已與現行 \`roguelike.html\` 逐字比對（${origChecked} 句）；標成「店主」的字已與 \`tools/owner-lines-v4.json\`（DECISIONS-v4 店主寫／核可的字）逐字比對（${ownerChecked} 句）。全部一致才會產生這份。
> v4：三相剋＋差 2 星剋不動、對手暗選＋提示（會唬人）、六手上限、經濟（錢、箱子、櫃檯配件、特價箱）。脾氣、急了、翻面、B 面的句子全部刪除。
> 第二波（B2）：v4 劇本（開頭旁白 I1–I2、序章 O2–O21、收尾 E1–E11：原版 25 句逐字＋店主改的句子；原本的 O1 11-10 改成開頭旁白）；回嘴、好耳朵、一百塊三張等試做版句子已刪。教學六手（B2 第 2 階段）、經濟介面的字（B3，shopUi）已進來（C 整合）。

統計：原句 ${counts['原句']}、拍板 ${counts['拍板']}、店主 ${counts['店主']}、新 ${counts['新']}（同一句在有聲／安靜兩版序章只算一次）。

`;
if (draftEdits.length) {
  md += `## 改過店主草稿的句子（等店主決定）\n\nD §5 提示句草稿 15 句，13 句一字不差；這幾句改成含關鍵字（揭曉後結果句教「『關鍵字』是經典」），店主可以改回原文。\n\n| 提示 | 店主草稿（D §5） | 現在畫面上 | 關鍵字 |\n|---|---|---|---|\n`;
  for (const d of draftEdits) md += `| ${d.id} | ${esc(d.from)} | ${esc(d.to)} | ${esc(d.key)} |\n`;
  md += '\n';
}
for (const [scene, list] of byScene) {
  md += `## ${scene}\n\n| 說話者 | 句子 | 出處 | 位置 |\n|---|---|---|---|\n`;
  for (const it of list) md += `| ${esc(it.who)}${it.key ? '・' + esc(it.key) : ''} | ${esc(it.text)} | ${SRC[it.tag] || it.tag} | \`${it.where}\` |\n`;
  md += '\n';
}
md += `## 原句、拍板、店主（已逐字比對，列出供對照）\n\n| 標記 | 句子 | 位置 |\n|---|---|---|\n`;
for (const it of items) if (!isNew(it.tag)) md += `| ${it.tag} | ${esc(it.text)} | \`${it.where}\` |\n`;

function report() {
  for (const w of warns) console.log('注意：' + w);
  if (errors.length) { console.log('\n文案檢查沒過（' + errors.length + ' 項）：'); errors.forEach(e => console.log('  ✗ ' + e)); process.exitCode = 1; }
}
report();
if (!errors.length) {
  fs.writeFileSync(path.join(LAB, 'LINES-REVIEW.md'), md);
  console.log('文案檢查通過。掃過：' + scanned.join('、'));
  console.log('句子 ' + items.length + '（原句 ' + counts['原句'] + '、拍板 ' + counts['拍板'] + '、店主 ' + counts['店主'] + '、新 ' + counts['新'] + '）；原句／拍板逐字比對 ' + origChecked + ' 句、店主逐字比對 ' + ownerChecked + ' 句一致；v4 劇本原句 ' + orig26 + '／25 句、順序一致。');
  console.log('已寫 game-lab/LINES-REVIEW.md（新句 ' + fresh.length + '，' + byScene.size + ' 個場景）。');
}
