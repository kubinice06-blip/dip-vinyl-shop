// lint-copy.mjs：品味對決 v4 文案檢查（SPEC-v4 §0.4、§2.2.9；v3 的檢查與 v2 的店主用語規則照舊）。
//
//   node game-lab/tools/lint-copy.mjs          # 檢查＋產生 game-lab/LINES-REVIEW.md；有違規 exit 1
//
// 檢查：
//   1. 禁用字串（店主用語、支語、破折號、舊三軸名「入」）：content.js 的字串、cards.js 的 pitch、
//      ui.js／duel.js／recap.js（11-17 上一手詳情）／tutorial.js／cardinfo.js／econ.js（v4 B3）／stage.js／shop.js／shop-props.js／fx.js／index.html 的字串、shops/*.json 的名牌（缺檔就跳過）。
//      三軸一律經典／冷門／硬蕊；「唱片資訊」不寫「卡片資訊」；「櫃檯」不寫「櫃台」；「派對」不出現；台詞與提示不用破折號。
//      藝人／專輯含「派對」：核心卡擋、精選新卡（cards-pool.js，真實專輯名）只警告（第 B 波 D19）。
//   2. v3 拿掉的系統不准回來（SPEC-v3 §2.3、§10.6）：
//      對決、教學、外殼的畫面字不准有「氣勢、輾壓、賭注、相生、割捨、七星回擊、霸權、點播」
//        （content.js、duel.js、tutorial.js、ui.js、cardinfo.js、index.html）；
//      對決與教學的字不准有「晃」（脾氣的內部名 C.habits.*.zh「虛晃」除外，它不上畫面）；
//      「配件」只准出現在發燒配件的介面（content.js／duel.js／tutorial.js 裡，同一行原始碼要提到 relic；ui.js 本身就是配件介面所在，不擋）。
//   3. 必須原樣出現的六句（序章拍板句與原句）；不得出現尾聲的耳朵宣告（09-03 店主拿掉）；
//      v4 劇本（SPEC-v4 §2.5.4，B2）：序章＋收尾標「原句」的恰好 25 句（原版 RPG_BEATS 19 句扣掉被換掉的 5 句（第一句 11-10 改成開頭旁白）＋TUT_EPILOGUE_BEATS 11 句），
//      而且跟原版的順序一致；D §2 拿掉的試做版句子不准回來（回嘴、好耳朵、一百塊三張、交流夜…）
//   4. 每一句都有來源標記（Beat.tag、lineTags、coachTipTags、rulesTag／rulesLinesTag、duelTextTag、relics[].tag、hints[].tag、hintKeywordsTag、
//      rarityTag、tonightLinesTag、tutorial steps[].tag／uiTag、shopLineTags、shopUiTag、bargainTag、summaryTag、trialTag（無限試煉 C.trial.ui／levelUp／notes）、seedsTag（從唱片櫃挑牌開局 C.seeds.ui）、
//      dailyTag（今日推薦集點卡 C.daily，第 B 波）、
//      tunesTag／radioTag（頻率八格的名字與收音機，v5 第六項第二期）、apexTrialTag（頂點卡純輔助卡試做 ?apex=1：能力名 ≤8、說明 ≤25、畫面字、小提示 ≤20、結果句 ≤25）、
//      factionsTag（第 D 波棒二三流派 ?fac=1：派系卡 ≤34、本派選項 名 ≤6 說明 ≤24、結果行小字 ≤16、換一格 ≤25、畫面字 ≤25）、pitches.json）；
//      無限試煉沒有打烊、第二夜：C.night、C.secondNight 不准回來；畫面字不准再寫「今晚來客／打烊／再來一夜／今晚賣完」
//      FIXLIST 6：畫面不寫誠實度（C.honesty 只有 q、沒有 zh；不准有 honestyTag）、客人沒有副標（enemies[*].title）；
//      FIXLIST 2：王牌沒有「不會被剋」（content 的字不准出現「不會被剋」）
//      Beat 的畫面字（prompt／prompts／button／set.stamp）：在 roguelike.html 找得到＝原句、在 owner-lines-v4.json＝店主、其他＝新
//   5. 標成 原句／拍板 的句子，必須一字不差地出現在現行 roguelike.html；標成 店主 的字串，必須一字不差地在 tools/owner-lines-v4.json
//      （＝DECISIONS-v4 裡店主寫／核可的字，SPEC-v4 §2.2.9）
//   6. 長度：教學老闆的泡泡 ≤25 字、按鈕 ≤18；一次性小提示 ≤20；規則卡六行、每行 ≤56（D 第 6 行 54 字）、第 3 行是三相剋（冷剋經／經剋硬／硬剋冷）、
//      六行逐字＝owner-lines 的規則卡；提示句不寫屬性名、key 是句子的子字串；
//      發燒配件說明 ≤16、生效那句 ≤12；說話的 Beat 要用「」；台詞鍵齊全（line／intro／lose／win；v4 沒有 switch）
//   7. 活店（SPEC-H §5.8、§6.2；C.chat／C.ownerChat／C.crowdUi／C.crowdFact）：防編造（手寫句沒有拉丁字母、數字、《》、事實字；樣板只准白名單空格、評價字配 need 的軸）、
//      「這箱」＋聲音綁站位、切磋與踢館帖字面分開、收藏通則字要主線裁定（CROWD_RULED）；lore.json 的 src 跟藝人介紹現況不同只警告。LINES-REVIEW 分節「活店・…」＋摘句抽樣 30 句
//      第二階段切磋（§5.8；棒 3d）：切磋句（enc*＋trip 的 encWon／encLost）與 C.crowdUi 不准「踢館」「帖」「番外」、介面字不准「這一輪」、踢館帖的字（C.waveC 的 dare*、
//      站名與站主一句、說到踢館帖的活店台詞、任何程式字串含「踢館／帖」的）不准「切磋」；LINES-REVIEW 節「活店・切磋・<名字>」「活店・切磋・介面字」
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
// 「安可」：店主 11-20 改名「翻面」（王牌條件加成；店主：這兩個字被弄髒了）——玩家看得到的字一律不准出現（程式識別字 encore 照舊）
const FORBID = ['——', '櫃台', '遺物', '卡片資訊', '派對', '全場大合唱', '心聲', '反咬', '安可',
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
    if (/踢館|帖/.test(s) && /切磋/.test(s)) err(at, '踢館帖的字不准有「切磋」（SPEC-H §5.8：跟切磋字面分開）→ ' + s.slice(0, 60));
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
  ['content.js', 'js', true, true], ['duel.js', 'js', true, true], ['recap.js', 'js', true, true], ['tutorial.js', 'js', true, true],
  ['ui.js', 'js', true, false], ['cardinfo.js', 'js', true, false], ['econ.js', 'js', true, false], ['loot.js', 'js', true, false], ['stalls.js', 'js', true, false], ['index.html', 'html', true, false],
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
// 藝人／專輯含「派對」（第 B 波 SPEC-B §1.4【定稿 A1】、rulings D19）：核心卡（cards.js，我們挑的）擋；精選新卡（cards-pool.js，pool: true）只警告——
//   真實專輯名不是我們寫的字（目前只有 Beyond《命運派對》，留在卡池）；要拿掉＝pool-list.json 刪一列重烘
for (const card of Object.values(CARDS)) {
  if (card.pitch) scanStrings('cards.js#' + card.id, [{ s: card.pitch, line: 'pitch' }], { allDash: true });
  for (const k of ['artist', 'album']) if (/派對/.test(card[k] || '')) {
    if (card.pool) warns.push('cards-pool.js#' + card.id + '：' + k + ' 含「派對」（精選新卡的真實專輯名，不擋；D19）');
    else err('cards.js#' + card.id, k + ' 含「派對」（會出現在畫面上）');
  }
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
const SCENE = { prologue: '序章（O2–O21；O1 11-10 併進開頭旁白）', epilogueWin: '序章收尾（E1–E11：他走了 → 地上那張盤（掉落旁白 G1）→ 發燒配件三選一 → 第一位客人推門）',
  bossEnter: '傳說藏家進門（每輪第 5 位）', bossDown: '打倒傳說藏家（每一輪：翻開他的王牌）', dead: '散場（這一趟結束）', again: '再挑戰一趟',
  drop: '打贏客人・領獎之前；序章收尾 E4 之後、撿起面板之前（掉落旁白；店主 11-13）' };
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
  jabBubble: '回嘴選了那張（第一手）', stampSub: '出場蓋章的副標', retry: '老闆說情', relicFull: '發燒配件滿了' };
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
for (const k of ['retry', 'relicFull']) if (!((C.lines || {}).owner || {})[k]) err('lines.owner', '缺少 ' + k);   // 包包不限張數（店主 11-16）：沒有 bagFull 那句了

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
// 提示句庫（11-17 讀牌加難；content C.hintLines，scratchpad v5/harder DESIGN §3）：one 明指（鍵＝他打算那色）／half 半指（鍵＝他不出那色）／none 不露
//   不寫屬性名、不寫關鍵字對照（C.hintKeywords 與舊 15 句的 key 不准出現在別色的句子裡：半指的鍵＝他不出那色，用那色的字是在否定它，可以；不露一個都不准）、id 全域唯一（也不跟 C.hints 撞）、voice＝C.enemies 的鍵（不是序章男子）、
//   form 'say'（說出口）要有成對的「」、≤24 字、要有 tag；名盤／絕版／噪音各最多 3 句（同一色要換角度說，不要變成對照表）
const HL = C.hintLines;
const HL_KIND = { one: '明指', half: '半指', none: '不露' };
const HL_FORMS = ['act', 'say', 'look'];
let hlCount = 0;
if (HL) {
  if (!TAG_OK(C.hintLinesTag)) err('hintLinesTag', '沒有 tag（hintLinesTag）');
  const ids = new Set();
  for (const a of ['c', 'o', 'h']) for (const h of (C.hints || {})[a] || []) if (h && h.id) ids.add(h.id);
  const keyOf = {};            // 舊 15 句的 key＋關鍵字族 → 哪一色
  for (const [a, ws] of Object.entries(C.hintKeywords || {})) for (const w of ws || []) keyOf[w] = a;
  for (const a of ['c', 'o', 'h']) for (const h of (C.hints || {})[a] || []) if (h && h.key) keyOf[h.key] = a;
  const capWords = { '名盤': 0, '絕版': 0, '噪音': 0 };
  const one = (h, where, kind, a) => {
    if (!h || typeof h.text !== 'string' || !h.text) { err(where, '沒有 text'); return; }
    hlCount++;
    if (!h.id || typeof h.id !== 'string') err(where, '沒有 id：' + h.text);
    else if (ids.has(h.id)) err(where, 'id 重複：' + h.id); else ids.add(h.id);
    if (!TAG_OK(h.tag)) err(where, '沒有合法 tag：' + h.text);
    if (/經典|冷門|硬蕊/.test(h.text)) err(where, '提示句不准寫出屬性名：' + h.text);
    if (len(h.text) > 24) err(where, '提示句超過 24 字（' + len(h.text) + '）：' + h.text);
    if (h.form != null && !HL_FORMS.includes(h.form)) err(where, 'form 只能是 act／say／look：' + h.form);
    if (h.form === 'say' && !/「[^」]+」/.test(h.text)) err(where, '說出口的句子（form say）要用「」：' + h.text);
    if (h.text.includes('「') && !/「[^」]*」/.test(h.text)) err(where, '「」不成對：' + h.text);
    if (h.voice != null) { const e = (C.enemies || {})[h.voice]; if (!e || e.prologue) err(where, 'voice 要是客人的鍵（不是序章男子）：' + h.voice); }
    for (const [w, wa] of Object.entries(keyOf)) if (h.text.includes(w) && (kind === 'none' || wa !== a)) err(where, '用到「' + w + '」（' + ATTR_ZH[wa] + '的關鍵字；明指只准用自己那色的、半指只准用他不出那色的、不露都不准）：' + h.text);
    for (const w of Object.keys(capWords)) if (h.text.includes(w)) capWords[w]++;
    for (const w of OLD_MECH) if (h.text.includes(w)) err(where, 'v3 拿掉的系統「' + w + '」→ ' + h.text);
    if (h.text.includes('晃')) err(where, '對決的字不准有「晃」→ ' + h.text);
    const who = h.voice ? ((C.enemies || {})[h.voice] || {}).name || h.voice : '誰都會講';
    const key = kind === 'none' ? '不指任何色' : kind === 'half' ? '他不出' + ATTR_ZH[a] : ATTR_ZH[a];
    add({ scene: '提示句・' + HL_KIND[kind] + '・' + (h.voice ? '個性' : '通用'), where, who, key: key + '・' + h.id, text: h.text, tag: h.tag });
  };
  for (const kind of ['one', 'half']) for (const a of ['c', 'o', 'h']) {
    const arr = (HL[kind] || {})[a];
    if (!Array.isArray(arr) || !arr.length) { err('hintLines.' + kind + '.' + a, '沒有句子'); continue; }
    arr.forEach((h, k) => one(h, 'hintLines.' + kind + '.' + a + '[' + k + ']', kind, a));
  }
  if (!Array.isArray(HL.none) || !HL.none.length) err('hintLines.none', '沒有句子');
  else HL.none.forEach((h, k) => one(h, 'hintLines.none[' + k + ']', 'none', null));
  for (const [w, n] of Object.entries(capWords)) if (n > 3) err('hintLines', '「' + w + '」出現在 ' + n + ' 句（最多 3 句：同一色要換角度說）');
}
for (const [a, ws] of Object.entries(C.hintKeywords || {})) (ws || []).forEach((w, k) => {
  if (!TAG_OK(C.hintKeywordsTag)) err('hintKeywords.' + a, '沒有 tag（hintKeywordsTag）');
  add({ scene: '提示的關鍵字族（D §5；參考清單）', where: 'hintKeywords.' + a + '[' + k + ']', who: '（關鍵字）', key: ATTR_ZH[a], text: w, tag: C.hintKeywordsTag });
});

// 一次性老闆小提示（SPEC-v3 §6）：duel.js hooks.hint 的六個 id（tip_lastplay：上一手小列，店主 11-16）
const TIP_IDS = ['tip_mirror', 'tip_bluff', 'tip_block', 'tip_ace', 'tip_rounds', 'tip_lastplay', 'tip_read', 'tip_half', 'tip_none', 'tip_hit'];   // 後四個：11-17 讀牌加難
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
// 選屬性時相剋圖旁那一行（v5 第二項小尾巴）：{a}＝你選的、{b}＝它剋的、{c}＝剋它的；三個空格都要有、組出來 ≤12 字
if (C.triLegend != null) {
  if (!TAG_OK(C.triLegendTag)) err('triLegend', '沒有 tag（triLegendTag）');
  if (typeof C.triLegend !== 'string' || !['{a}', '{b}', '{c}'].every(k => C.triLegend.includes(k))) err('triLegend', '要有 {a}／{b}／{c} 三個空格');
  else {
    const ex = C.triLegend.replace('{a}', '冷門').replace('{b}', '經典').replace('{c}', '硬蕊');
    if (len(ex) > 12) err('triLegend', '組出來超過 12 字：' + ex);
    add({ scene: '對決盤面・選屬性時相剋圖旁那一行', where: 'triLegend', who: '（畫面字）', text: ex + '（例：選冷門）', tag: C.triLegendTag });
  }
}
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
  const SHORT = ['poster', 'cat', 'locked', 'binBusy', 'ownerHint', 'nightIntro', 'taipeiHere', 'backToShop', 'bin', 'booth', 'boothEmpty',
    'homeBtn', 'homeTitle', 'homeSub', 'homeShelf', 'homeDeck', 'homeConsole', 'homePut', 'homeStop', 'homeNow', 'homeIdle', 'homeWantN', 'homeDeckEmpty', 'homeOnDeck', 'homeWant', 'homeWantAgain', 'homeTuneFail', 'homeTuneLoading', 'homeTuneBack'];
  const sceneOf = key => key === 'nightIntro' ? '今晚來客・第一次（soft 提示）' : /^home/.test(key) ? '你家・聆聽室' : /^taipei|backToShop/.test(key) ? '台北地圖預告' :
    /^lot/.test(key) ? '一檔貨（兩位客人之間換貨、第 2 輪起全卡池；老闆一句）' : key === 'dailyNew' ? '今日推薦集點卡（老闆提醒）' : '店裡熱點（點了說一句）';
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
  if (len(v.replace(/\{\w+\}/g, '')) > 24) err('shopUi.' + k, '超過 24 字（不算 {x}）：' + v);   // 第 B 波起不算 {x}（wantOnShelf 有 {album}／{bin} 兩個空格），同 trial／seeds
  add({ scene: '經濟介面（箱子、櫃檯、特價箱；{x} 由畫面代入）', where: 'shopUi.' + k, who: '（畫面字）', key: k, text: v, tag: C.shopUiTag });
}
if (C.bargain && C.bargain.label) { if (!TAG_OK(C.bargainTag)) err('bargain.label', '沒有 tag（bargainTag）'); add({ scene: '經濟介面（箱子、櫃檯、特價箱；{x} 由畫面代入）', where: 'bargain.label', who: '（畫面字）', text: C.bargain.label, tag: C.bargainTag }); }
// 無限試煉（C.trial 的畫面字：頂欄、來客、說情、升級三選一、結果行補的一句）與結算
if ('night' in C || 'secondNight' in C) err('content', '無限試煉沒有一晚與第二夜：C.night／C.secondNight 不准回來');
const TRIAL_SCENE = { ui: '無限試煉・頂欄、來客、說情、標題（{x} 由畫面代入）', levelUp: '無限試煉・升級三選一（店主暫定的名字：品味／底氣）', notes: '無限試煉・結果行補的一句（品味／底氣多扣、少扣）',
  titles: '無限試煉・客人稱號（每 2 位換一次；舊版 enemyForDepth 的字，來客條與對決他名字旁）', titlesShort: '無限試煉・客人稱號在來客條的短寫（名牌放不下的）' };
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
// 第 D 波棒三：試煉階級的階表（C.trial.tiers[k].name 1–4 字／text ≤24 字；推門那列、過場卡「開了第 k 階：…」）
((C.trial || {}).tiers || []).forEach((x, i) => {
  const where = 'trial.tiers[' + i + ']';
  if (!x || typeof x.name !== 'string' || !x.name || len(x.name) > 4) err(where + '.name', '名字要 1–4 字：' + (x && x.name));
  if (!x || typeof x.text !== 'string' || !x.text) { err(where + '.text', '不是字串'); return; }
  if (!TAG_OK(C.trialTag)) err(where, '沒有 tag（trialTag）');
  if (len(x.text) > 24) err(where + '.text', '超過 24 字：' + x.text);
  add({ scene: '試煉階級・階表（第 k 階：名字＋這一階新加的那條；推門那列、過場卡）', where: where + '.text', who: '（畫面字）', key: '第 ' + (i + 1) + ' 階', text: x.name + '：' + x.text, tag: C.trialTag });
});
// 從唱片櫃挑牌開局（店主 11-13；C.seeds.ui）：挑種子、結算帶走一張、唱片櫃頁（我的收藏／認識過）；每句 ≤28 字（不算 {x}）
for (const [k, v] of Object.entries(((C.seeds || {}).ui) || {})) {
  const where = 'seeds.ui.' + k;
  if (typeof v !== 'string' || !v) { err(where, '不是字串'); continue; }
  if (!TAG_OK(C.seedsTag)) err(where, '沒有 tag（seedsTag）');
  if (len(v.replace(/\{\w+\}/g, '')) > 28) err(where, '超過 28 字（不算 {x}）：' + v);
  const scene = /^pick/.test(k) ? '從唱片櫃挑牌開局・挑種子（第二趟起，挑完王牌）' : /^(keep|from)/.test(k) ? '從唱片櫃挑牌開局・結算：這一趟帶走一張' :
    /^(reward|bagOut|stake)/.test(k) ? '從唱片櫃挑牌開局・沒收的只算「認識」（領獎、包包滿拿出來、序章撿唱片）' : '從唱片櫃挑牌開局・唱片櫃頁（我的收藏／認識過）';
  add({ scene, where, who: '（畫面字）', key: k, text: v, tag: C.seedsTag });
}
// 今日推薦集點卡（第 B 波 SPEC-B §4.7；C.daily、dailyTag）：說明 hint ≤60、其他每句 ≤24（不算 {x}）
for (const [k, v] of Object.entries(C.daily || {})) {
  const where = 'daily.' + k;
  if (typeof v !== 'string' || !v) { err(where, '不是字串'); continue; }
  if (!TAG_OK(C.dailyTag)) err(where, '沒有 tag（dailyTag）');
  const max = k === 'hint' ? 60 : 24;
  if (len(v.replace(/\{\w+\}/g, '')) > max) err(where, '超過 ' + max + ' 字（不算 {x}）：' + v);
  add({ scene: '今日推薦集點卡（試聽機那塊、標題小籤、換獎勵；{x} 由畫面代入）', where, who: k === 'hint' ? '老闆' : '（畫面字）', key: k, text: v, tag: C.dailyTag });
}
// 第 D 波棒一：樂歷畫面字（C.career.ui、careerTag；樂歷頁、標題第二行、結算那行＋明細、過場卡、入帳吐司、演唱會、說情）＋新手推薦標（C.aceNewbie、aceNewbieTag）。每句 ≤40 字（不算 {x}）
{
  const CSC = [[/^live/, '樂歷・攤位頂列細條（一趟裡就看得到樂歷漲；第 I 波 I-0）'], [/^recurve/, '樂歷・開機補級吐司（曲線改了；第 I 波 I-0）'],
    [/^(lv|drawGot|ladderOpen|goTalent|profUp|card)/, '樂歷・過場卡（結算主鈕之後、開機入帳之後；一次一張，一次升兩級以上合成一張清單卡）'], [/^deposit/, '樂歷・開機入帳的吐司（C 波記的樂歷）'],
    [/^(endLine|tierPre|part|routeCap|gainTitle|toPage)/, '樂歷・結算頁那一行＋明細'], [/^(line|shelfBtn|bestTier)/, '樂歷・標題第二行、唱片櫃頁頭'],
    [/^off/, '樂歷・關掉樂歷（Lv10 起、只在樂歷頁）'], [/^(ladder|drawRow)/, '樂歷・樂歷頁的解鎖階梯'], [/^gig/, '樂歷・演唱會買票面板'], [/^plea/, '樂歷・來客條說情、備用說情'],
    [/^srcLexp/, '樂歷・唱片櫃來源'], [/./, '樂歷・樂歷頁（天賦、重配、熟練度）']];
  const walkC = (v, where, k0) => {
    if (Array.isArray(v)) return v.forEach((x, i) => walkC(x, where + '[' + i + ']', k0));
    if (v && typeof v === 'object') return Object.entries(v).forEach(([k, x]) => { if (k !== 'key' && k !== 'cats') walkC(x, where + '.' + k, k0); });
    if (typeof v !== 'string' || !v) { err(where, '不是字串'); return; }
    if (!TAG_OK(C.careerTag)) err(where, '沒有 tag（careerTag）');
    if (len(v.replace(/\{\w+\}/g, '')) > 40) err(where, '超過 40 字（不算 {x}）：' + v);
    add({ scene: CSC.find(x => x[0].test(k0))[1], where, who: /^deposit/.test(k0) ? '老闆' : '（畫面字）', key: where.replace(/^career\.ui\./, ''), text: v, tag: C.careerTag });
  };
  for (const [k, v] of Object.entries(((C.career || {}).ui) || {})) walkC(v, 'career.ui.' + k, k);
  for (const [k, v] of Object.entries(C.aceNewbie || {})) {
    if (!TAG_OK(C.aceNewbieTag)) err('aceNewbie.' + k, '沒有 tag（aceNewbieTag）');
    add({ scene: '流派・第一次挑派的新手推薦標', where: 'aceNewbie.' + k, who: '（畫面字）', key: k, text: v, tag: C.aceNewbieTag });
  }
}
for (const [k, v] of Object.entries(C.summary || {})) {
  if (!TAG_OK(C.summaryTag)) err('summary.' + k, '沒有 tag（summaryTag）');
  add({ scene: '無限試煉・結算與標題的紀錄', where: 'summary.' + k, who: '（畫面字）', key: k, text: v, tag: C.summaryTag });
}
// 頻率（v5 第六項第二期）：八格的名字（抄主站頻率光譜 card-moods.json names；check-content 比對走鐘）、label／guest／guestAria；收音機轉頻率的字。每句 ≤28 字（不算 {x}）
{
  const T = C.tunes || {};
  const one = (where, v, scene, tag, tagName) => {
    if (typeof v !== 'string' || !v) { err(where, '不是字串'); return; }
    if (!TAG_OK(tag)) err(where, '沒有 tag（' + tagName + '）');
    if (len(v.replace(/\{\w+\}/g, '')) > 28) err(where, '超過 28 字（不算 {x}）：' + v);
    add({ scene, where, who: '（畫面字）', key: where.split('.').pop(), text: v, tag });
  };
  for (const k of ['label', 'guest', 'guestAria']) if (k in T) one('tunes.' + k, T[k], '頻率・唱片資訊「頻率 ● 暴躁」、客人資訊「常聽 ● 暴躁」、提示籤前的圓點（讀屏）', C.tunesTag, 'tunesTag');
  for (const k of (T.order || Object.keys(T.names || {}))) one('tunes.names.' + k, (T.names || {})[k], '頻率・八格的名字（抄主站頻率光譜；改名要兩邊一起改）', C.tunesTag, 'tunesTag');
  for (const [k, v] of Object.entries(C.radio || {})) one('radio.' + k, v, '收音機・轉頻率（兩位客人之間、每輪一次；{x} 由畫面代入）', C.radioTag, 'radioTag');
  // 第 I 波 §4 背景音樂（C.bgm.ui、bgmTag）：收音機旁「正在播放」、點我放歌、⏸ 背景音樂三行與說明小字；不寫曲名（只有卡片欄位）
  for (const [k, v] of Object.entries(((C.bgm || {}).ui) || {})) {
    if (Array.isArray(v)) { v.forEach((x, i) => one('bgm.ui.' + k + '[' + i + ']', x, '背景音樂・⏸ 音樂音量 小／中／大', C.bgmTag, 'bgmTag')); continue; }
    one('bgm.ui.' + k, v, /^(np|tapPlay|icon)$/.test(k) ? '背景音樂・收音機旁「正在播放」泡泡與 ♪（點我放歌：這次造訪還沒點過畫面才出）' : '背景音樂・⏸ 選單「聲音」下面三行與說明小字', C.bgmTag, 'bgmTag');
  }
  // v6 試玩捷徑（C.tryKit.ui、tryKitTag；店主 11-28）：只在預覽站（*.pages.dev）或 ?try=1 出現的左上角小鈕與面板（正式站看不到）
  for (const [k, v] of Object.entries(((C.tryKit || {}).ui) || {})) one('tryKit.ui.' + k, v, '試玩捷徑・只在預覽站出現的「試玩」小鈕與面板（正式站看不到）', C.tryKitTag, 'tryKitTag');
}
// 頂點卡純輔助卡試做（?apex=1；C.apexTrial、apexTrialTag）：每張「能力名・時機：說明」（名 ≤8、說明 ≤25）、畫面字 ≤25（規則卡頁尾那行照頁尾）、小提示 ≤20、結果句 ≤25（不算 {x}）；
//   fact（典故出處）不上畫面、不列（禁用字照掃 content.js）
if (C.apexTrial) {
  const A = C.apexTrial, TZ = { hall: '殿堂', pearl: '流亡', heresy: '異端' }, TM = (A.ui || {}).timing || {};
  const one = (where, v, scene, max, who, text) => {
    if (typeof v !== 'string' || !v) { err(where, '不是字串'); return; }
    if (!TAG_OK(C.apexTrialTag)) err(where, '沒有 tag（apexTrialTag）');
    if (max && len(v.replace(/\{\w+\}/g, '')) > max) err(where, '超過 ' + max + ' 字（不算 {x}）：' + v);
    add({ scene, where, who: who || '（畫面字）', key: where.split('.').pop(), text: text || v, tag: C.apexTrialTag });
  };
  for (const t of ['hall', 'pearl', 'heresy']) (A[t] || []).forEach((x, k) => {
    const c = CARDS[x.card] || {}, w = 'apexTrial.' + t + '[' + k + ']', who = c.artist ? c.artist + '《' + c.album + '》' : x.card;
    if (typeof x.name !== 'string' || !x.name || len(x.name) > 8) err(w + '.name', '能力名要 1–8 字：' + x.name);
    one(w + '.text', x.text, '頂點卡試做・' + (TZ[t] || t) + '的王牌能力（能力名・時機：說明；挑王牌面板 5×3 的順序；?apex=1）', 25, who, x.name + '・' + (TM[x.timing] || x.timing) + '：' + x.text);
  });
  for (const [k, v] of Object.entries(A.ui || {})) {
    if (k === 'timing') { for (const [t, x] of Object.entries(v || {})) one('apexTrial.ui.timing.' + t, x, '頂點卡試做・畫面字（王牌格、能力框、挑王牌面板、看穿的章；{x} 由畫面代入）', 25); continue; }
    one('apexTrial.ui.' + k, v, '頂點卡試做・畫面字（王牌格、能力框、挑王牌面板、看穿的章；{x} 由畫面代入）', k === 'rulesFoot' ? 48 : 25);
  }
  for (const [k, v] of Object.entries(A.tips || {})) one('apexTrial.tips.' + k, v, '頂點卡試做・一次性老闆小提示（第一次看到能力框／第一次「沒作用」）', 20, '老闆');
  for (const [k, v] of Object.entries(A.notes || {})) one('apexTrial.notes.' + k, v, '頂點卡試做・結果行補的一句（{d}＝這手王牌替你多賺／少扣幾點、{h}＝回幾聲望、{name}＝能力名）', 25);
  for (const [k, v] of Object.entries(A.holdNotes || {})) one('apexTrial.holdNotes.' + k, v, '頂點卡試做・結果行補的一句（{d}＝這手王牌替你多賺／少扣幾點、{h}＝回幾聲望、{name}＝能力名）', 25);
}
// 第 I 波 I-1 翻面（C.encore；店主 11-20 從「安可」改名；C.encore.ui、encoreTag）：條件句／加成句 ≤12、籤的兩半 ≤4、樣板與畫面字 ≤25、規則卡那段 ≤40、老闆第一次那句 ≤25、老闆小提示（翻面例外那兩則）≤20（不算 {x}）；
//   另列每張頂點卡與三張 7 星王牌組出來的說明句（engine encoreLine，給店主過目；≤30）
if (C.encore && C.encore.ui) {
  const U = C.encore.ui;
  const one = (where, v, scene, max, who, text) => {
    if (typeof v !== 'string' || !v) { err(where, '不是字串'); return; }
    if (!TAG_OK(C.encoreTag)) err(where, '沒有 tag（encoreTag）');
    if (max && len(v.replace(/\{\w+\}/g, '')) > max) err(where, '超過 ' + max + ' 字（不算 {x}）：' + v);
    add({ scene, where, who: who || '（畫面字）', key: where.split('.').pop(), text: text || v, tag: C.encoreTag });
  };
  const SC = '翻面・畫面字（王牌格的籤、結果句小字、頭上小章、吐司、領獎小字、規則卡、紀錄的章；{x} 由畫面代入）';
  for (const [k, v] of Object.entries(U)) {
    if (v && typeof v === 'object') { for (const [k2, x] of Object.entries(v)) one('encore.ui.' + k + '.' + k2, x, SC, /^tag/.test(k) ? 4 : 12); continue; }
    one('encore.ui.' + k, v, SC, k === 'ruleApex' ? 40 : /^tip/.test(k) ? 20 : 25, k === 'first' || /^tip/.test(k) ? '老闆' : null);
  }
  const EN = require(path.join(LAB, 'engine.js'));
  if (typeof EN.encoreLine === 'function') {
    for (const t of ['hall', 'pearl', 'heresy']) {
      const e = EN.aceEncoreOf(C, t, false), l = EN.encoreLine(C, e, { ace: true });
      if (len(l) > 30) err('encore.aces.' + t, '說明句超過 30 字：' + l);
      add({ scene: '翻面・三張 7 星王牌的說明句（挑王牌面板、唱片資訊）', where: 'encore.aces.' + t, who: '（畫面字）', text: l, tag: C.encoreTag });
      ((C.apexTrial || {})[t] || []).forEach((x, k) => {
        const l2 = EN.encoreLine(C, EN.encoreOf(C, x, t));
        if (len(l2) > 30) err('encore.apexTrial.' + t + '[' + k + ']', '說明句超過 30 字：' + l2);
        const c = CARDS[x.card] || {};
        add({ scene: '翻面・頂點卡的說明句（挑王牌面板、唱片資訊；家族預設或自己寫的 encore）', where: 'encore.apexTrial.' + t + '[' + k + ']', who: c.artist ? c.artist + '《' + c.album + '》' : x.card, text: l2, tag: C.encoreTag });
      });
    }
  }
}
// 第 I 波 I-2 上場＋耐聽（C.lineup.ui、C.wear.ui；lineupTag；scratchpad v5/wave-i SPEC-I §3、§5、§A-3、§A-4）：畫面字、老闆第一次那兩句、規則卡那段都 ≤30（不算 {x}）；
//   「刮傷」不准出現在上場／耐聽的字（§A-4：說「聽膩」「休息一輪就好」，不像永久損壞）；「帶上場」只准出現在 C.lineup 的字（§A-3：種子從唱片櫃帶進一趟說「帶來」；
//   程式檔的字串也不准有「帶上場」）。LINES-REVIEW 節「上場・畫面字」「耐聽・畫面字」
if (C.lineup && C.lineup.ui) {
  const one = (where, v, scene, who) => {
    if (typeof v !== 'string' || !v) { err(where, '不是字串'); return; }
    if (!TAG_OK(C.lineupTag)) err(where, '沒有 tag（lineupTag）');
    if (len(v.replace(/\$?\{\w+\}/g, '')) > 30) err(where, '超過 30 字（不算 {x}）：' + v);
    if (/刮傷/.test(v)) err(where, '上場／耐聽的字不准有「刮傷」（SPEC-I §A-4：聽膩、休息一輪就好）→ ' + v);
    add({ scene, where, who: who || '（畫面字）', key: where.split('.').pop(), text: v, tag: C.lineupTag });
  };
  for (const [k, v] of Object.entries(C.lineup.ui)) one('lineup.ui.' + k, v, '上場・畫面字（上場面板、來客畫面上場列、包包、戰利品列、吐司、規則卡；{n}{album} 由畫面代入）', k === 'first' ? '老闆' : null);
  for (const [k, v] of Object.entries((C.wear && C.wear.ui) || {})) one('wear.ui.' + k, v, '耐聽・畫面字（耐聽點的讀屏字、手牌記號、休息中、領獎小字、規則卡）', k === 'first' ? '老闆' : null);
}
{
  const walkC = (o, p, depth) => {
    if (depth > 8 || o == null) return;
    if (typeof o === 'string') { if (o.includes('帶上場') && !/^lineup\./.test(p)) err('content.' + p, '「帶上場」只准出現在 C.lineup 的字（SPEC-I §A-3：種子說「帶來」）→ ' + o.slice(0, 60)); return; }
    if (Array.isArray(o)) { o.forEach((v, k) => walkC(v, p + '[' + k + ']', depth + 1)); return; }
    if (typeof o === 'object') for (const [k, v] of Object.entries(o)) { if (k === 'cards') continue; walkC(v, p ? p + '.' + k : k, depth + 1); }
  };
  walkC(C, '', 0);
  for (const [rel, kind] of FILES) {
    if (rel === 'content.js' || SKIP.has(rel)) continue;
    const src = read(path.join(LAB, rel)); if (src == null) continue;
    for (const { s: x, line } of (kind === 'html' ? htmlStrings(src) : jsStrings(src))) if (x && x.includes('帶上場')) err(rel + ':' + line, '「帶上場」只准出現在 C.lineup 的字（SPEC-I §A-3）→ ' + x.slice(0, 60));
  }
}
// 活店（SPEC-H §5.7、§5.8、§6.2；棒 3b，2026-11-18）：C.chat（熟客、路人）、C.ownerChat（老闆）、C.crowdUi（介面字）、C.crowdFact 的填空字。
//   每句 add({ scene:'活店・<名字>・<分類中文>', where:'chat.<id>', who:<名字>, key:<id>（＋出場條件）, text, tag })——LINES-REVIEW 的分節就是 scene。
//   錯誤：tag 不是「新」、id 重複、who 不在名冊、「」不成對、空格不在白名單；手寫句有拉丁字母／阿拉伯數字／《》／兩個以上中文數字＋年／事實字／寫死流派名；
//         「這箱」＋聲音描述沒綁 need.at；樣板（shelf／fact／loreIn／loreOut）拿掉空格後有數字或拉丁字母、《》不是包 {album}、{year}／{decade} 後 3 字內有盤／壓、
//         評價字跟 need 的軸對不上、說哪一箱的知識樣板沒 onShelf；提到讀牌提示或遊戲數值（聲望幾點、$）；切磋句與介面字有踢館／帖／番外、介面字有「這一輪」；
//         踢館帖的字有「切磋」（第二階段棒 3d：切磋句＝enc* 七類＋trip 帶 need.encWon／encLost；踢館帖的字＝C.waveC ui 的 dare*、stations.dare、stationLines.dare、
//         C.waveC 裡任何含「踢館／帖」的字、need.dare 或講到踢館帖的活店台詞；程式字串另在 scanStrings 擋「踢館／帖＋切磋」）；介面字空格只准 {artist}{name}{cash}；
//         字數（手寫每泡 ≤28、路人 ≤20、樣板拿掉空格 ≤28）。現有規則（FORBID、一晚的字、D §2 拿掉的句子、三軸舊名）照樣掃到這些句子。
//   收藏通則字（首版、日版、音質、錄音、樂手、最好、史上…，批判 4.4）：要在 CROWD_RULED 寫上主線裁定（rulings.md）才算過，沒裁定＝錯誤；有裁定的印成警告清單。
//   lore.json 的 src（分片雜湊、manifest updatedAt）跟 data/artist-intros 現況不同：只警告（要重算 build-lore；過期與否由 build-lore --check 判）。
const CROWD_RULED = {};   // { 句子 id: '主線裁定（rulings.md 哪一條）' }——收藏通則字逐句裁定後才准放；第一批 0 句命中
const COLLECT = /首版|初版|原版|日版|美版|英版|德版|再版|復刻|壓片|母帶|音質|錄音|混音|樂手|名盤|神盤|經典之作|史上|最好|最強|最偉大|公認|被譽為/;
const CROWD_FACT_HAND = /年代|得獎|葛萊美|金曲|銷量|賣了.*張|排行|榜|出道|解散|團員|製作人|廠牌|首張|最後一張|遺作|影響了/;
const CROWD_FACT_TPL = /首張|最後一張|得獎|葛萊美|金曲|銷量|賣了.*張|排行|榜|出道|解散|團員|製作人|廠牌|遺作|影響了|名盤|首版|原版|壓片|音質/;
const CROWD_FLOW = /經典流|冷門流|異端流|殿堂|流亡/;
const CROWD_ZH_YEAR = /[〇零一二三四五六七八九十]{2,}年/;
const CROWD_THIS_BIN = /這箱|這區|這排|這邊的/;
const CROWD_SOUND = /鼓|貝斯|吉他|人聲|唱腔|節奏|旋律|編曲|合成器|弦樂|取樣|鋼琴|管樂|和聲/;
const CROWD_EVAL = { o: /冷門|知道的人不多|少人知道/, h: /硬蕊|入耳|門檻|難入口|慢慢聽/, c: /經典|很多人|大家都/ };
const CROWD_HINT = /讀牌|提示|他這手|下一手會|出哪一色|出哪色/;
const CROWD_NUMBERS = /[$＄]|聲望.{0,3}([0-9０-９一二三四五六七八九十兩幾]+|\{[a-z]+\})\s*點/;
const CROWD_DARE = /踢館|帖|番外/;
const CROWD_SPAR = /切磋/;                                     // 踢館帖的字不准有（§5.8：切磋跟踢館帖字面分開）
const CROWD_UI_HOLES = ['artist', 'name', 'cash'];              // 介面字的空格：摘句出處 {artist}、切磋的熟客名 {name}、錢 {cash}（「$」字面＋engine.moneyText）
const sparLine = l => !!l && (CROWD_ENC.includes(l.cat) || (l.cat === 'trip' && !!l.need && ('encWon' in l.need || 'encLost' in l.need)));   // 切磋句（第二階段）
const CROWD_HAND_HOLES = ['title', 'pos', 'last', 'far', 'name'];
const CROWD_CARD_HOLES = ['artist', 'album', 'year', 'decade', 'genre', 'bin', 'region', 'tune', 'axis'];
const CROWD_TPL = ['shelf', 'fact', 'loreIn', 'loreOut'];
const CROWD_ENC = ['encDare', 'encYes', 'encNo', 'encLapse', 'encLose', 'encWin', 'encVoid'];
const CROWD_CAT_ZH = { hello: '打招呼（第一次見面，一輩子一次）', again: '這一趟第一次遇到', chat: '閒聊', dig: '挖寶', shelf: '架上樣板（{album} 是他停的那箱架上某張）',
  trip: '看你這一趟', close: '熟了以後', mem: '記得你上一趟', busy: '忙著翻（一次來聊滿三段）', loreIn: '知識引子（接藝人介紹摘句）', loreOut: '知識收尾',
  fact: '知識樣板（{x} 照卡片欄位填，填不出來那句不出）', encDare: '切磋・嗆', encYes: '切磋・接了', encNo: '切磋・改天', encLapse: '切磋・沒理他', encLose: '切磋・他輸了',
  encWin: '切磋・他贏了', encVoid: '切磋・作廢' };
const crowdNeedZh = (need, R) => {
  if (!need) return '';
  const T = C.aceTitle || {}, out = [];
  for (const [k, v] of Object.entries(need)) {
    if (k === 'at') out.push('停在 ' + [].concat(v).map(s => s.replace(/^c-/, '')).join('／') + ' 才講');
    else if (k === 'onShelf') out.push('那張在架上');
    else if (k === 'o' || k === 'h' || k === 'c') out.push(ZH_AX[k] + ' ' + (typeof v === 'number' ? '≥' + v : String(v).replace('<=', '≤').replace('>=', '≥')));
    else if (k === 'met') out.push('見過' + [].concat(v).map(id => ((R[id] || {}).name) || id).join('、'));
    else if (k === 'posGte') out.push('第 ' + v + ' 位以後');
    else if (k === 'posLte') out.push('第 ' + v + ' 位以前');
    else if (k === 'streakGte') out.push('連贏 ≥' + v);
    else if (k === 'bagGte') out.push('包包 ≥' + v + ' 張');
    else if (k === 'hpHalf') out.push('聲望剩一半以下');
    else if (k === 'retried') out.push('說情重打過');
    else if (k === 'dare') out.push('接了踢館帖');
    else if (k === 'firstRun') out.push('第一趟');
    else if (k === 'newFar') out.push('這一趟破最遠紀錄');
    else if (k === 'ace') out.push('王牌走' + [].concat(v).map(t => T[t] || t).join('／'));
    else if (k === 'encWon') out.push(v === false ? '還沒切磋贏過' : '切磋贏過（不分跟誰打）');
    else if (k === 'encLost') out.push(v === false ? '還沒切磋輸過' : '切磋輸過（不分跟誰打）');
    else out.push(k + '=' + JSON.stringify(v));
  }
  return out.join('、');
};
const ZH_AX = { c: '經典', o: '冷門', h: '硬蕊' };
const quotesPaired = s => { let d = 0; for (const ch of s) { if (ch === '「') d++; else if (ch === '」') { d--; if (d < 0) return false; } } return d === 0; };
{
  const R = C.regulars || {}, ids = new Set();
  const nameOf = who => who === 'passer' ? '路人' : who === 'owner' ? '老闆' : ((R[who] || {}).name || who);
  const sceneOf = (l, isOwner) => {
    if (isOwner) return l.cat === 'trip' ? '活店・老闆・看你這一趟' : (l.need && l.need.met ? '活店・老闆・店裡的事（見過那位熟客才講）' : '活店・老闆閒聊');
    if (l.who === 'passer') return '活店・路人（四套外觀共用一個環；隨口、找唱片、對店）';
    if (sparLine(l)) return '活店・切磋・' + nameOf(l.who);   // 例「活店・切磋・大頭」（§5.8）；說話者欄另標分類
    return '活店・' + nameOf(l.who) + '・' + (CROWD_CAT_ZH[l.cat] || l.cat);
  };
  const ruled = [];
  const one = (l, k, isOwner) => {
    const where = (isOwner ? 'ownerChat.' : 'chat.') + ((l && l.id) || '[' + k + ']');
    if (!l || typeof l !== 'object') { err(where, '不是物件'); return; }
    if (!l.id || ids.has(l.id)) err(where, 'id 要有、全域唯一：' + l.id); ids.add(l.id);
    if (!TAG_OK(l.tag) || l.tag !== '新') err(where, 'tag 要是「新」（活店台詞全部進 LINES-REVIEW）');
    if (isOwner ? l.who !== 'owner' : !(l.who === 'passer' || R[l.who])) err(where, 'who 要是 C.regulars 的鍵、passer 或（ownerChat）owner：' + l.who);
    const texts = [].concat(l.text == null ? [] : l.text);
    if (!texts.length || !texts.every(t => typeof t === 'string' && t)) { err(where, 'text 要是字串或字串陣列'); return; }
    const tpl = !isOwner && CROWD_TPL.includes(l.cat), N = l.need || {}, enc = !isOwner && sparLine(l);
    const dareLine = !!N.dare || texts.some(t => /踢館|帖/.test(t));   // 講到踢館帖的活店台詞
    for (const t of texts) {
      const bare = t.replace(/\{[a-zA-Z]+\}/g, ''), n = len(bare);
      const holes = [...t.matchAll(/\{([a-zA-Z]+)\}/g)].map(m => m[1]);
      for (const h of holes) if (!(tpl ? CROWD_HAND_HOLES.concat(CROWD_CARD_HOLES) : CROWD_HAND_HOLES).includes(h)) err(where, '空格 {' + h + '} 不在白名單（' + (tpl ? '樣板' : '手寫句') + '）：' + t);
      if (!quotesPaired(t)) err(where, '「」不成對：' + t);
      if (CROWD_FLOW.test(t)) err(where, '不准寫死流派名（用 {title}）：' + t);
      if (CROWD_HINT.test(t)) err(where, '不准提讀牌提示（那是 C.hintLines 的事）：' + t);
      if (CROWD_NUMBERS.test(t)) err(where, '不准出現遊戲數值（聲望幾點、$多少）：' + t);
      if (enc && CROWD_DARE.test(t)) err(where, '切磋句不准有「踢館」「帖」「番外」（跟踢館帖分開）：' + t);
      if (dareLine && CROWD_SPAR.test(t)) err(where, '講到踢館帖的句子不准有「切磋」（跟切磋分開）：' + t);
      if (CROWD_THIS_BIN.test(t) && CROWD_SOUND.test(t) && !(Array.isArray(N.at) ? N.at.length : N.at)) err(where, '「這箱」＋聲音描述要綁站位 need.at（換箱就假）：' + t);
      if (tpl) {
        if (/[A-Za-z0-9０-９Ａ-Ｚａ-ｚ]/.test(bare)) err(where, '樣板拿掉空格後不准有數字、拉丁字母：' + t);
        if (/[《》]/.test(t.replace(/《\{album\}》/g, ''))) err(where, '樣板的《》只准包 {album}：' + t);
        if (CROWD_FACT_TPL.test(t)) err(where, '樣板不准有事實字／收藏通則（首張、得獎、銷量、團員、製作人、廠牌、排行、影響了、名盤、首版、原版、壓片、音質…）：' + t);
        if (/\{(year|decade)\}.{0,3}[盤壓]/.test(t)) err(where, '{year}／{decade} 後面 3 字內不准有「盤」「壓」（只准說發行）：' + t);
        const has = ['c', 'o', 'h'].filter(a => CROWD_EVAL[a].test(t)), axes = ['c', 'o', 'h'].filter(a => a in N);
        if (!has.every(a => axes.includes(a))) err(where, '評價字（' + has.map(a => ZH_AX[a]).join('、') + '）要配同一軸的 need：' + t);
        if (l.cat === 'fact' && (/\{bin\}/.test(t) || CROWD_THIS_BIN.test(t)) && N.onShelf !== true) err(where, '說「在哪一箱」的知識樣板要 need.onShelf：' + t);
        if (n > 28) err(where, '樣板拿掉空格後 ≤28 字，現在 ' + n + '：' + t);
      } else {
        if (/[A-Za-z0-9０-９Ａ-Ｚａ-ｚ]/.test(bare)) err(where, '手寫句不准有拉丁字母、阿拉伯數字（真的藝人、專輯、年份只能從樣板空格來）：' + t);
        if (/[《》]/.test(t)) err(where, '手寫句不准有《》：' + t);
        if (CROWD_ZH_YEAR.test(t)) err(where, '手寫句不准兩個以上中文數字接「年」：' + t);
        if (CROWD_FACT_HAND.test(t)) err(where, '手寫句不准有事實字（年代、得獎、銷量、排行、出道、團員、製作人、廠牌、首張、遺作、影響了…）：' + t);
        const max = l.who === 'passer' ? 20 : 28;
        if (n > max) err(where, '每泡 ≤' + max + ' 字，現在 ' + n + '：' + t);
      }
      if (COLLECT.test(t)) {
        if (CROWD_RULED[l.id]) ruled.push(l.id + '「' + t + '」→ ' + CROWD_RULED[l.id]);
        else err(where, '收藏通則字「' + t.match(COLLECT)[0] + '」要主線逐句裁定（寫進 rulings.md，再登記到 lint-copy 的 CROWD_RULED）：' + t);
      }
    }
    const nz = crowdNeedZh(l.need, R);
    const kz = enc ? (CROWD_ENC.includes(l.cat) ? CROWD_CAT_ZH[l.cat].replace(/^切磋・/, '') : CROWD_CAT_ZH.trip) : '';   // 切磋節裡每列標分類（嗆、改天…）
    add({ scene: sceneOf(l, isOwner), where, who: nameOf(l.who), key: l.id + (kz ? '・' + kz : '') + (nz ? '・' + nz : ''), text: texts.join('／'), tag: l.tag });
  };
  // 第一階段的句子先列（LINES-REVIEW 節的順序照舊），第二階段切磋句在老闆與介面字之後另成「活店・切磋・<名字>」
  const chatAll = Array.isArray(C.chat) ? C.chat : [];
  chatAll.forEach((l, k) => { if (!sparLine(l)) one(l, k, false); });
  (Array.isArray(C.ownerChat) ? C.ownerChat : []).forEach((l, k) => one(l, k, true));
  for (const x of ruled) warns.push('活店收藏通則字（有主線裁定）：' + x);
  // 介面字（第一階段：老闆的一次性提示兩句、摘句出處、路人泡泡第一行；第二階段：切磋邀請面板…）
  const CU = C.crowdUi || {};
  if (!TAG_OK(C.crowdUiTag)) err('crowdUi', '沒有 tag（crowdUiTag）');
  const uiOne = (k, v) => {
    const where = 'crowdUi.' + k, spar = /^enc[A-Z]/.test(k);   // enc*＝第二階段切磋（邀請面板、對決頂欄、戰利品列、唱片櫃）
    if (typeof v !== 'string' || !v) { err(where, '不是字串'); return; }
    if (CROWD_DARE.test(v)) err(where, '活店介面字不准有「踢館」「帖」「番外」（跟踢館帖分開）：' + v);
    if (/這一輪/.test(v)) err(where, '活店介面字（切磋邀請面板）不准有「這一輪」（踢館帖的核心字）：' + v);
    if (len(v.replace(/\{\w+\}/g, '')) > 28) err(where, '超過 28 字（不算 {x}）：' + v);
    for (const m of v.matchAll(/\{([a-zA-Z]+)\}/g)) if (!CROWD_UI_HOLES.includes(m[1])) err(where, '介面字空格 {' + m[1] + '} 不在白名單（' + CROWD_UI_HOLES.map(h => '{' + h + '}').join('') + '）：' + v);
    if (!quotesPaired(v)) err(where, '「」不成對：' + v);
    if (CROWD_HINT.test(v)) err(where, '不准提讀牌提示：' + v);
    add({ scene: spar ? '活店・切磋・介面字（邀請面板、對決頂欄、戰利品列、唱片櫃；{name}＝熟客名字、${cash}＝錢）' : '活店・介面字（老闆的一次性提示、摘句下緣的出處、路人泡泡第一行）',
      where, who: /intro/i.test(k) ? '老闆' : '（畫面字）', key: k, text: v, tag: C.crowdUiTag });
  };
  for (const [k, v] of Object.entries(CU)) if (!/^enc[A-Z]/.test(k)) uiOne(k, v);
  // 填空字（{genre}{region}；照抄主站 genre-tree.json 的十類中文、規格 §6.2 的地區名）
  const F = C.crowdFact || {};
  for (const grp of ['genre', 'region']) for (const [k, v] of Object.entries(F[grp] || {}))
    add({ scene: '活店・周姐知識樣板的填空字（{genre} 照主站十類、{region} 只有台灣／日本／華語）', where: 'crowdFact.' + grp + '.' + k, who: '（填空）', key: '{' + grp + '}・' + k, text: v, tag: C.crowdUiTag });
  // 第二階段：切磋句（照 C.chat 的順序，一位一節）與切磋介面字
  chatAll.forEach((l, k) => { if (sparLine(l)) one(l, k, false); });
  for (const [k, v] of Object.entries(CU)) if (/^enc[A-Z]/.test(k)) uiOne(k, v);
  // 踢館帖的字不准有「切磋」（C.waveC：介面字 dare*、站名與站主一句的 dare、其他含「踢館／帖」的字）
  {
    const W = C.waveC || {}, walk = (o, p) => {
      if (typeof o === 'string') { const dare = /(^|\.)(dare[A-Za-z]*)$/.test(p) || /踢館|帖/.test(o); if (dare && CROWD_SPAR.test(o)) err('waveC.' + p, '踢館帖的字不准有「切磋」（跟切磋分開）：' + o); return; }
      if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) walk(v, p ? p + '.' + k : k);
    };
    walk(W, '');
  }
  // lore.json 的 src 跟藝人介紹現況（只警告）
  try {
    const lore = JSON.parse(read(path.join(LAB, 'lore.json')) || 'null');
    const dir = path.join(ROOT, 'data', 'artist-intros');
    const man = JSON.parse(read(path.join(dir, 'manifest.json')) || 'null');
    if (lore && man) {
      const crypto = require('crypto');
      if (lore.src && lore.src.updatedAt !== (man.updatedAt || null)) warns.push('lore.json 記的藝人介紹 updatedAt（' + (lore.src && lore.src.updatedAt) + '）跟現在的 manifest（' + man.updatedAt + '）不同：重跑 node game-lab/tools/build-lore.mjs（過期與否看 --check）');
      else {
        const changed = [];
        for (let s = 0; s < (man.shards || 64); s++) {
          const nn = String(s).padStart(2, '0'), f = path.join(dir, nn + '.json');
          const h = fs.existsSync(f) ? crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex') : undefined;
          if (h !== ((lore.src || {}).shards || {})[nn]) changed.push(nn);
        }
        if (changed.length) warns.push('lore.json 記的分片雜湊有 ' + changed.length + ' 片跟現在不同（' + changed.join(' ') + '）：重跑 build-lore（過期與否看 --check）');
      }
      scanned.push('lore.json（src 比對 ' + (man.shards || 64) + ' 片）');
    } else if (!lore) warns.push('略過（尚無 lore.json）');
  } catch (e) { warns.push('lore.json 讀不了：' + e.message); }
}
// 第 D 波棒二：三流派（?fac=1；C.factions、factionsTag）：派系卡（定位、被動、代價、讀法、第一次觸發那句）≤34、本派選項（名 ≤6、說明 ≤24）、結果行小字 ≤16、
//   ?fac=1&apex=1 換一格的能力說明 ≤25、結果句 ≤25、畫面字 ≤25（不算 {x}）
if (C.factions) {
  const F = C.factions;
  const one = (where, v, scene, max, who, text) => {
    if (typeof v !== 'string' || !v) { err(where, '不是字串'); return; }
    if (!TAG_OK(C.factionsTag)) err(where, '沒有 tag（factionsTag）');
    if (max && len(v.replace(/\{\w+\}/g, '')) > max) err(where, '超過 ' + max + ' 字（不算 {x}）：' + v);
    add({ scene, where, who: who || '（畫面字）', key: where.split('.').pop(), text: text || v, tag: C.factionsTag });
  };
  for (const t of ['hall', 'pearl', 'heresy']) {
    const D = F[t] || {}, nm = D.name || t;
    for (const k of ['tagline', 'passive', 'cost', 'read', 'first']) one('factions.' + t + '.' + k, D[k], '流派試做・' + nm + '的派系卡與本派說明（定位、被動、代價、讀法；first＝第一次觸發那手結果行補的一句）', 34);
    (D.picks || []).forEach((x, k) => {
      if (typeof x.name !== 'string' || !x.name || len(x.name) > 6) err('factions.' + t + '.picks[' + k + '].name', '名字要 1–6 字：' + x.name);
      one('factions.' + t + '.picks[' + k + '].text', x.text, '流派試做・' + nm + '的本派選項（升級第 4 格；名字：說明' + '）', 24, null, x.name + (x.second ? '（第二招）' : '') + '：' + x.text);
    });
    (D.tree || []).forEach(x => {                                         // 第 D 波棒三：派樹九格（名 ≤6、說明 ≤24；之後開放的格子可以沒有說明）
      if (!x || typeof x.name !== 'string' || !x.name || len(x.name) > 6) err('factions.' + t + '.tree.' + (x && x.id) + '.name', '名字要 1–6 字：' + (x && x.name));
      if (x && x.text != null) one('factions.' + t + '.tree.' + x.id + '.text', x.text, '流派試做・' + nm + '的派樹（樂歷頁派樹分頁；名字：說明；soon＝之後開放）', 24, null, x.name + (x.soon ? '（之後開放）' : '') + '：' + x.text);
      else if (x) one('factions.' + t + '.tree.' + x.id + '.name', x.name, '流派試做・' + nm + '的派樹（樂歷頁派樹分頁；名字：說明；soon＝之後開放）', 6, null, x.name + '（之後開放）');
    });
  }
  for (const [k, v] of Object.entries(F.notes || {})) one('factions.notes.' + k, v, '流派試做・結果行小字（{n}：整張／借／以小搏大＝這手扣他的總數，其他＝多扣／回的那一份）', 16);
  const S = F.apexSwap || {}, AT = C.apexTrial || {};
  for (const t of ['hall', 'pearl', 'heresy']) {
    const T = S[t] || {};
    for (const [op, x] of Object.entries(T.ops || {})) one('factions.apexSwap.' + t + '.ops.' + op + '.text', x.text, '流派試做・?fac=1&apex=1 同開：頂點卡換一格後的能力說明（這個原語的卡都換）', 25);
    for (const [id, x] of Object.entries(T.cards || {})) {
      const e = (AT[t] || []).find(z => z && z.id === id) || {};
      one('factions.apexSwap.' + t + '.cards.' + id + '.text', x.text, '流派試做・?fac=1&apex=1 同開：頂點卡換一格後的能力說明（指定那張）', 25, null, (e.name || id) + '：' + x.text);
    }
  }
  for (const [k, v] of Object.entries(S.notes || {})) one('factions.apexSwap.notes.' + k, v, k === 'leechFac' ? '流派試做・?fac=1&apex=1 同開：拆穿回血的頂點卡那手，回的聲望被流派被動蓋過（取大）＝這張沒另外回' : '流派試做・?fac=1&apex=1 同開：換過能力那手的結果句（{d}＝多扣幾點）', 25);
  for (const [k, v] of Object.entries(F.ui || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {   // treePath＝派樹的路線名（≤4）；deepHow＝本派說明裡深耕「一手是什麼」（棒三審查，≤25）
      for (const [k2, v2] of Object.entries(v)) one('factions.ui.' + k + '.' + k2, v2, k === 'treePath' ? '流派試做・畫面字（派樹的路線名）' : '流派試做・畫面字（本派說明：深耕記的一手是什麼）', k === 'treePath' ? 4 : 25);
      continue;
    }
    one('factions.ui.' + k, v, '流派試做・畫面字（標題旗標章、升級第 4 格、本派說明、我的狀態、派樹分頁；{x} 由畫面代入）', 25, k === 'pickFirst' ? '老闆' : null);
  }
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
  if (/^(tutorial|coachTips|duelText|hints|hintLines|honesty|rules\.lines|lines\.)/.test(it.where)) {
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
> 活店（SPEC-H 第一階段）：熟客、路人、老闆閒聊、周姐知識樣板在「活店・…」各節（「說話者」欄＝名字・句子 id・出場條件；兩個泡泡用「／」隔開；{x} 由畫面代入，卡片欄位填不出來的那句就不出）。周姐的藝人介紹摘句是主站已審的原文，最後附抽樣 30 句看語感。
> 活店第二階段（切磋＝遭遇戰）：每位熟客的切磋句在「活店・切磋・<名字>」（說話者欄多標分類：嗆、接了、改天、沒理他、他輸了、他贏了、作廢、看你這一趟的切磋輸贏），邀請面板、對決頂欄、戰利品列的字在「活店・切磋・介面字」。

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
// 活店：周姐的藝人介紹摘句抽樣 30 句（SPEC-H §6.3：主站已審的原文、不逐句送審；附在這裡給店主看語感）。穩定抽樣：FNV-1a(藝人鍵＋句子) 最小的 30 句
{
  let lore = null; try { lore = JSON.parse(read(path.join(LAB, 'lore.json')) || 'null'); } catch (_) {}
  if (lore && lore.a) {
    const fnv = str => { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h; };
    const disp = {}; for (const c of Object.values(CARDS)) { const k = String(c.artist || '').normalize('NFC').trim().toLowerCase(); if (k && !disp[k]) disp[k] = c.artist; }
    const all = []; for (const [k, qs] of Object.entries(lore.a)) for (const q of qs) all.push([k, q, fnv('lore-sample#' + k + '#' + q)]);
    const pick = all.slice().sort((x, y) => x[2] - y[2] || (x[0] < y[0] ? -1 : 1)).slice(0, 30).sort((x, y) => (x[0] < y[0] ? -1 : x[0] > y[0] ? 1 : 0));
    md += `## 活店・周姐的藝人介紹摘句（抽樣 30 句；原文照抄主站已審的藝人介紹，不逐句審）\n\n> 畫面上：周姐說「{藝人}啊，我記得介紹上寫：」→ 摘句泡泡（下緣灰字「藝人介紹・{藝人}」）。全部 ${lore.n} 位、${all.length} 句在 \`game-lab/lore.json\`（\`node game-lab/tools/build-lore.mjs\` 產生；每句都是主站藝人介紹的原文子字串）。讀起來怪的，告訴主線加進 build-lore 的排除表。\n\n| 藝人 | 摘句 |\n|---|---|\n`;
    for (const [k, q] of pick) md += `| ${esc(disp[k] || k)} | ${esc(q)} |\n`;
    md += '\n';
  }
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
