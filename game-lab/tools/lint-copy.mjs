// lint-copy.mjs：品味對決 v3 文案檢查（SPEC-v3 §3、§6、§8、§10.6；v2 的店主用語規則照舊）。
//
//   node game-lab/tools/lint-copy.mjs          # 檢查＋產生 game-lab/LINES-REVIEW.md；有違規 exit 1
//
// 檢查：
//   1. 禁用字串（店主用語、支語、破折號、舊三軸名「入」）：content.js 的字串、cards.js 的 pitch、
//      ui.js／duel.js／tutorial.js／cardinfo.js／stage.js／shop.js／shop-props.js／fx.js／index.html 的字串、shops/*.json 的名牌（缺檔就跳過）。
//      三軸一律經典／冷門／硬蕊；「唱片資訊」不寫「卡片資訊」；「櫃檯」不寫「櫃台」；「派對」不出現；台詞與提示不用破折號。
//   2. v3 拿掉的系統不准回來（SPEC-v3 §2.3、§10.6）：
//      對決、教學、外殼的畫面字不准有「氣勢、輾壓、賭注、相生、割捨、七星回擊、霸權、點播」
//        （content.js、duel.js、tutorial.js、ui.js、cardinfo.js、index.html）；
//      對決與教學的字不准有「晃」（脾氣的內部名 C.habits.*.zh「虛晃」除外，它不上畫面）；
//      「配件」只准出現在發燒配件的介面（content.js／duel.js／tutorial.js 裡，同一行原始碼要提到 relic；ui.js 本身就是配件介面所在，不擋）。
//   3. 必須原樣出現的六句（序章拍板句與原句）；不得出現尾聲的耳朵宣告（09-03 店主拿掉）
//   4. 每一句都有來源標記（Beat.tag、lineTags、hintTags、rulesTag、duelTextTag、habits[].tag、relics[].tag、tutorial steps[].tag／uiTag、
//      shopLineTags、summaryTag、nightTag、phase2LinesTag、habitLabelsTag、retorts[].tag、pitches.json）
//   5. 標成 原句／拍板 的句子，必須一字不差地出現在現行 roguelike.html
//   6. 長度：教學老闆的泡泡 ≤25 字（SPEC-v3 §8）、按鈕 ≤18；一次性小提示 ≤20；規則卡六行、每行 ≤32；名牌那句 ≤22；
//      發燒配件說明 ≤16、生效那句 ≤12；說話的 Beat 要用「」；台詞鍵齊全（line／intro／lose／win，菁英與藏家 switch）
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
const FORBID = ['——', '櫃台', '入耳', '遺物', '卡片資訊', '派對', '全場大合唱', '心聲', '反咬',
  '視頻', '質量', '信息', '網絡', '軟件', '默認', '用戶', '屏幕', '登錄', '鼠標', '硬盤', '打印', '緩存', '加載'];
// SPEC-v3 §10.6：v3 拿掉的系統（對決、教學、外殼的畫面字都不准有）
const OLD_MECH = ['氣勢', '輾壓', '賭注', '相生', '割捨', '七星回擊', '霸權', '點播'];
const HAS_CJK = /[㐀-鿿　-〿＀-￯]/;
const AXIS_IN = [/(^|[^一-鿿])入\s?[0-9０-９]/, /[經冷](典|門)?\s?[0-9０-９]*\s?[／/、・|｜ ]\s?入(?![一-鿿])/, /^入[:：]?$/];
let HABIT_ZH = new Set();     // 脾氣的內部名（虛晃…）：不上畫面，「晃」不擋
function scanStrings(file, strings, opts = {}) {
  for (const { s, line, src } of strings) {
    if (!s) continue;
    const at = file + ':' + line;
    for (const f of FORBID) if (s.includes(f)) err(at, '禁用字串「' + f + '」→ ' + s.slice(0, 60));
    if (s.includes('—') && (opts.allDash || HAS_CJK.test(s))) err(at, '破折號「—」→ ' + s.slice(0, 60));
    for (const re of AXIS_IN) if (re.test(s)) err(at, '三軸寫成舊名「入」（要寫硬蕊）→ ' + s.slice(0, 60));
    if (opts.mech) for (const w of OLD_MECH) if (s.includes(w)) err(at, 'v3 拿掉的系統「' + w + '」不准出現在畫面字 → ' + s.slice(0, 60));
    if (opts.duelCopy) {
      if (s.includes('晃') && !HABIT_ZH.has(s)) err(at, 'v3 對決／教學的字不准有「晃」（虛晃翻面已刪）→ ' + s.slice(0, 60));
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
  ['ui.js', 'js', true, false], ['cardinfo.js', 'js', true, false], ['index.html', 'html', true, false],
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
const TAG_OK = t => ['原句', '拍板', '新'].includes(t) || /^新:[A-D]$/.test(t);
const items = []; // { scene, where, who, key?, text, tag, raw? }
const add = it => items.push(it);
const SCENE = { prologue: '序章（有聲音）', quietPrologue: '序章（安靜）', epilogueWin: '序章收尾（贏了男子 → 挑一張盤 → 發燒配件三選一）',
  afterPrologue: '配件挑完 → 今晚來客', bossEnter: '傳說藏家進門', clear: '打烊（通關）', dead: '散場', again: '再來一夜' };
const UI_OK = ['guess', 'acePick', 'retort', 'duel', 'stake', 'relic', 'map'];
const seenBeat = new Set();
const seenExtra = new Set();
const ORIG = read(path.join(ROOT, 'roguelike.html'));
for (const [key, beats] of Object.entries(C.script || {})) {
  if (!Array.isArray(beats)) { err('script.' + key, '不是陣列'); continue; }
  beats.forEach((b, k) => {
    const where = 'script.' + key + '[' + k + ']';
    if (!b || typeof b.text !== 'string') { err(where, '沒有 text'); return; }
    if (!TAG_OK(b.tag)) err(where, 'Beat 沒有合法 tag（原句／拍板／新）：' + b.text.slice(0, 30));
    if (!['', '老闆', '男子', '藏家', 'player'].includes(b.who)) err(where, 'who 不合法：' + b.who);
    if (b.who && b.who !== 'player' && !b.text.includes('「')) err(where, '說話的句子要用「」：' + b.text.slice(0, 30));
    if (b.ui && !UI_OK.includes(b.ui)) err(where, 'ui 不合法：' + b.ui);
    const extras = [];
    for (const extra of ['prompt', 'stamp', 'quietText']) if (b[extra]) extras.push([extra, b[extra]]);
    (b.prompts || []).forEach((t, j) => extras.push(['prompts[' + j + ']', t]));
    for (const [extra, t] of extras) if (!seenExtra.has(t)) {
      seenExtra.add(t);
      add({ scene: SCENE[key] || key, where: where + '.' + extra, who: '（畫面字）', text: t, tag: ORIG && ORIG.includes(t) ? '原句' : '新', ui: true });
    }
    const dup = b.who + '|' + b.text + '|' + b.tag;
    if (seenBeat.has(dup)) return; seenBeat.add(dup);
    add({ scene: SCENE[key] || key, where, who: b.who || '旁白', text: b.text, tag: b.tag });
  });
}
(C.retorts || []).forEach((r, k) => {
  if (!TAG_OK(r.tag)) err('retorts[' + k + ']', '沒有 tag');
  add({ scene: '回嘴（玩家第一次有台詞）', where: 'retorts[' + k + '].label', who: '你', text: r.label, tag: r.tag });
  add({ scene: '回嘴（玩家第一次有台詞）', where: 'retorts[' + k + '].reply', who: '男子', text: r.reply, tag: r.tag });
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
  for (const k of ['line', 'intro', 'lose', 'win']) if (!l[k] || (Array.isArray(l[k]) && !l[k].length)) err('lines.' + id, '缺少 ' + k);
  if ((e.elite || e.boss) && !l.switch) err('lines.' + id, '菁英／藏家缺少 switch（急了／翻面的泡泡）');
  if (e.phase2 && !l.switch) err('lines.' + id, '有第二句脾氣但缺少 switch');
}
for (const k of ['retry', 'bagFull', 'relicFull']) if (!((C.lines || {}).owner || {})[k]) err('lines.owner', '缺少 ' + k);
if (C.lines && C.lines.man && !C.lines.man.jabBubble) err('lines.man', '缺少 jabBubble（回嘴選《Mylo Xyloto》後第一手的泡泡）');

// 名牌那句（脾氣）＋第二句＋標籤
const HABIT_TAG = (C.habits && Object.values(C.habits)[0] && 'tag') || 'tag';
for (const [k, h] of Object.entries(C.habits || {})) {
  const where = 'habits.' + k + '.line';
  if (!h || typeof h.line !== 'string' || !h.line) { err(where, '沒有名牌那句'); continue; }
  if (!TAG_OK(h[HABIT_TAG])) err(where, '沒有 tag');
  if (len(h.line) > 22) err(where, '名牌那句超過 22 字（' + len(h.line) + '）：' + h.line);
  add({ scene: '名牌上的脾氣（對決盤面 e-habit）', where, who: '（畫面字）', key: h.zh, text: h.line, tag: h[HABIT_TAG] });
}
for (const [k, v] of Object.entries(C.phase2Lines || {})) {
  const where = 'phase2Lines.' + k;
  if (!TAG_OK(C.phase2LinesTag)) err(where, '沒有 tag（phase2LinesTag）');
  if (len(v) > 24) err(where, '超過 24 字：' + v);
  add({ scene: '名牌上的脾氣・急了／翻面之後', where, who: (C.enemies[k] && C.enemies[k].name) || k, text: v, tag: C.phase2LinesTag });
}
for (const [k, v] of Object.entries(C.habitLabels || {})) {
  if (!TAG_OK(C.habitLabelsTag)) err('habitLabels.' + k, '沒有 tag');
  add({ scene: '名牌上的脾氣・左邊的黑底標籤', where: 'habitLabels.' + k, who: '（畫面字）', text: v, tag: C.habitLabelsTag });
}

// 一次性老闆小提示（SPEC-v3 §6）：duel.js hooks.hint 的五個 id
const TIP_IDS = ['tip_mirror', 'tip_offhabit', 'tip_read', 'tip_switch', 'tip_eye'];
const TIPS = C.coachTips || C.hints || {};
for (const id of TIP_IDS) if (!TIPS[id]) err('coachTips.' + id, '缺少（duel.js 會送這個 id）');
for (const [k, v] of Object.entries(TIPS)) {
  const tag = (C.hintTags || {})[k];
  if (!TAG_OK(tag)) err('coachTips.' + k, '沒有 tag（hintTags）');
  if (len(v) > 20) err('coachTips.' + k, '超過 20 字（' + len(v) + '）：' + v);
  add({ scene: '一次性老闆小提示（第一次發生時，5 秒）', where: 'coachTips.' + k, who: '老闆', key: (C.coachTipWhen || {})[k], text: v, tag });
}

// 規則卡（「?」小抄與標題畫面共用；SPEC-v3 §0）
const R = C.rules;
if (!R || !Array.isArray(R.lines)) err('rules', '沒有規則卡');
else {
  if (!TAG_OK(C.rulesTag)) err('rules', '沒有 tag（rulesTag）');
  if (R.lines.length !== 6) err('rules.lines', '規則卡要六行，現在 ' + R.lines.length);
  R.lines.forEach((t, k) => { if (len(t) > 32) err('rules.lines[' + k + ']', '超過 32 字：' + t); });
  if (!/冷門剋經典/.test(R.lines[0] || '') || !/經典剋硬蕊/.test(R.lines[0] || '') || !/硬蕊剋冷門/.test(R.lines[0] || '')) err('rules.lines[0]', '第一行要是三相剋');
  const push = (where, text) => { if (typeof text === 'string' && text) add({ scene: '規則卡（「?」小抄）', where, who: '（畫面字）', text, tag: C.rulesTag }); };
  push('rules.title', R.title); push('rules.sub', R.sub);
  R.lines.forEach((t, k) => push('rules.lines[' + k + ']', (k + 1) + ' ' + t));
  if (R.example) {
    push('rules.example.title', R.example.title);
    (R.example.read || []).forEach((t, k) => push('rules.example.read[' + k + ']', t));
    for (const k of ['eLabel', 'pLabel', 'rowLabel']) push('rules.example.' + k, R.example[k]);
  }
  push('rules.relics', R.relics);
  (R.foot || []).forEach((t, k) => push('rules.foot[' + k + ']', t));
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
  add({ scene: '發燒配件（點圖示看的說明／生效那手結果行補的一句）', where: 'relics.' + id, who: r.name, text: r.desc + '｜' + r.note, tag: r.tag });
}

// 序章引導教學（SPEC-v3 §8：10 步，老闆的泡泡 ≤25 字）
const TUT = C.tutorial;
if (!TUT) err('tutorial', '沒有 C.tutorial');
else {
  const steps = TUT.steps || [];
  if (steps.length !== 10) err('tutorial.steps', '要 10 步，現在 ' + steps.length);
  let hand = 1;
  const handOf = [];
  steps.forEach(st => {
    const atRes = st.kind === 'say' && (st.target || []).includes('result');
    handOf.push(atRes ? hand - 1 : hand);
    if (st.allow && st.allow.throw) hand++;
  });
  steps.forEach((st, k) => {
    const texts = typeof st.text === 'object' ? Object.entries(st.text) : [[null, st.text]];
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
  for (const [k, v] of Object.entries(TUT.learned || {})) {
    if (len(v) > 16) err('tutorial.learned.' + k, '超過 16 字：' + v);
    add({ scene: '序章引導教學・學會的小卡（飛進「?」）', where: 'tutorial.learned.' + k, who: '（畫面字）', text: (TUT.ui && TUT.ui.learnedPrefix || '') + v, tag: TUT.uiTag });
  }
}

// 店裡熱點、今晚來客、台北預告（C.shopLines ↔ C.shopLineTags 同形狀）
if (C.shopLines) {
  const SHORT = ['poster', 'cat', 'locked', 'ownerHint', 'nightIntro', 'taipeiHere', 'backToShop', 'bin', 'booth', 'boothEmpty'];
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
// 今晚來客、結算三件事
if (C.night) for (const k of ['label', 'closing']) if (C.night[k]) {
  if (!TAG_OK(C.nightTag)) err('night.' + k, '沒有 tag（nightTag）');
  add({ scene: '今晚來客・結算', where: 'night.' + k, who: '（畫面字）', text: C.night[k], tag: C.nightTag });
}
for (const [k, v] of Object.entries(C.summary || {})) {
  if (!TAG_OK(C.summaryTag)) err('summary.' + k, '沒有 tag（summaryTag）');
  add({ scene: '今晚來客・結算', where: 'summary.' + k, who: '（畫面字）', key: k, text: v, tag: C.summaryTag });
}
if (C.junkLabel) add({ scene: '包包與唱片櫃', where: 'junkLabel', who: '（畫面字）', text: C.junkLabel, tag: '新' });
for (const x of shopLabels) add({ scene: '店內名牌（' + x.file + '）', where: x.file + x.where, who: '（畫面字）', text: x.s, tag: '新' });
if (C.secondNight) add({ scene: '第二夜預告', where: 'secondNight', who: '（畫面字）', text: C.secondNight.name + '（' + C.secondNight.title + '）／' + C.secondNight.label, tag: C.secondNight.tag });
for (const [id, p] of Object.entries(pitches)) {
  if (id.startsWith('_')) continue;
  if (!TAG_OK(p.tag)) err('pitches.json#' + id, '沒有 tag');
  const card = CARDS[id];
  if (card && card.pitch !== p.text) err('pitches.json#' + id, 'cards.js 的 pitch 跟 pitches.json 不一致（重跑 bake-cards.mjs）');
  add({ scene: '推薦語・' + (p.scene || '其他'), where: 'pitch#' + id, who: card ? card.artist + '《' + card.album + '》' : id, text: p.text, tag: p.tag });
}

// 收集來的句子再掃一次 v3 舊系統字（資料欄位不一定在 content.js 原始碼的同一行，例如 pitches.json）
for (const it of items) {
  if (it.where.startsWith('pitch#') || it.where.startsWith('shops/')) continue;
  for (const w of OLD_MECH) if (String(it.text).includes(w)) err(it.where, 'v3 拿掉的系統「' + w + '」→ ' + it.text);
  if (/^(tutorial|coachTips|duelText|habits|phase2Lines|habitLabels|rules\.lines|lines\.)/.test(it.where)) {
    if (String(it.text).includes('晃')) err(it.where, '對決／教學的字不准有「晃」→ ' + it.text);
    if (String(it.text).includes('配件') && !/relic/i.test(it.where)) err(it.where, '「配件」只准出現在發燒配件的介面 → ' + it.text);
  }
}

// ---------------------------------------------------------------------------
// 3. 必須原樣出現；耳朵宣告不得出現
// ---------------------------------------------------------------------------
const MUST = ['封套邊緣磨損嚴重，顯然塵封已久。', '老闆不發一語，緩步走出櫃檯，站在兩人之間。', '……這品味，也敢出來丟臉？',
  '搵休督欸丟！', '你的憤怒表露無遺。', '既然雙方都不服氣，不如來一場品味對決如何？'];
const scriptText = Object.values(C.script || {}).flat().map(b => b.text).join('\n');
for (const m of MUST) if (!scriptText.includes(m)) err('script', '必須原樣出現的句子不見了：「' + m + '」');
const EAR_DECL = [/往後都是你自己的打法/, /耳朵專長/, /你的耳朵是/, /你是(老派耳朵|挖盤狂|噪音信徒)/];
for (const it of items) for (const re of EAR_DECL) if (re.test(it.text)) err(it.where, '出現耳朵宣告句（店主 09-03 拿掉，不准加回）：' + it.text);
for (const [key, beats] of Object.entries(C.script || {})) for (const b of beats) if (b.who === '老闆' && /(老派耳朵|挖盤狂|噪音信徒)/.test(b.text)) err('script.' + key, '老闆的對白提到耳朵名（耳朵宣告不准加回）：' + b.text);

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
if (ORIG && ORIG_BEATS.size < 20) warns.push('roguelike.html 的 RPG_BEATS／TUT_EPILOGUE_BEATS 只抓到 ' + ORIG_BEATS.size + ' 句，請確認格式');
if (ORIG == null) warns.push('找不到 ../roguelike.html，略過原句比對');
else for (const it of items) if (it.tag === '原句' || it.tag === '拍板') {
  const t = it.raw || it.text;
  origChecked++;
  if (/^script\.[^.]+\[\d+\]$/.test(it.where) && !ORIG_BEATS.has(t)) { err(it.where, '標成「' + it.tag + '」但不等於現行 RPG_BEATS／TUT_EPILOGUE_BEATS 的任何一句：' + t); continue; }
  const inner = /^「([^「」]+)」$/.exec(t);
  if (!ORIG.includes(t) && !(inner && it.where.startsWith('pitch#') && ORIG.includes(inner[1]))) err(it.where, '標成「' + it.tag + '」但現行 roguelike.html 裡找不到一字不差的原文：' + t);
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
const counts = { '原句': 0, '拍板': 0, '新': 0 };
for (const it of items) counts[isNew(it.tag) ? '新' : it.tag]++;
let md = `# 台詞審稿：品味對決 v3（LINES-REVIEW）

> 由 \`node game-lab/tools/lint-copy.mjs\` 產生，請勿手改。要改句子，直接改 \`game-lab/content.js\`（劇本、台詞、名牌、提示、規則卡、教學）或 \`game-lab/tools/pitches.json\`（推薦語，改完重跑 \`node game-lab/tools/bake-cards.mjs\`），再重跑本檢查。
> 這份只列**新句**（試做版新寫、或取自四份概念稿，店主還沒看過）。標成「原句」「拍板」的句子已與現行 \`roguelike.html\` 逐字比對（${origChecked} 句，全部一致才會產生這份）。
> v3（三相剋當核心）：氣勢、輾壓、賭注、相生、割捨、七星回擊、霸權、點播、脾氣唱盤（晃）、事件、挖箱、試聽機的句子全部刪除；v2 教學的 37 句換成 10 步；發燒配件留 6 件，每件一句話。

統計：原句 ${counts['原句']}、拍板 ${counts['拍板']}、新 ${counts['新']}（同一句在有聲／安靜兩版序章只算一次）。

`;
for (const [scene, list] of byScene) {
  md += `## ${scene}\n\n| 說話者 | 句子 | 出處 | 位置 |\n|---|---|---|---|\n`;
  for (const it of list) md += `| ${esc(it.who)}${it.key ? '・' + esc(it.key) : ''} | ${esc(it.text)} | ${SRC[it.tag] || it.tag} | \`${it.where}\` |\n`;
  md += '\n';
}
md += `## 原句與拍板（已逐字比對，列出供對照）\n\n| 標記 | 句子 | 位置 |\n|---|---|---|\n`;
for (const it of items) if (!isNew(it.tag)) md += `| ${it.tag} | ${esc(it.text)} | \`${it.where}\` |\n`;

function report() {
  for (const w of warns) console.log('注意：' + w);
  if (errors.length) { console.log('\n文案檢查沒過（' + errors.length + ' 項）：'); errors.forEach(e => console.log('  ✗ ' + e)); process.exitCode = 1; }
}
report();
if (!errors.length) {
  fs.writeFileSync(path.join(LAB, 'LINES-REVIEW.md'), md);
  console.log('文案檢查通過。掃過：' + scanned.join('、'));
  console.log('句子 ' + items.length + '（原句 ' + counts['原句'] + '、拍板 ' + counts['拍板'] + '、新 ' + counts['新'] + '）；原句／拍板逐字比對 ' + origChecked + ' 句一致。');
  console.log('已寫 game-lab/LINES-REVIEW.md（新句 ' + fresh.length + '，' + byScene.size + ' 個場景）。');
}
