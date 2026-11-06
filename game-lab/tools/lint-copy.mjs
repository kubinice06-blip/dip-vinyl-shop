// lint-copy.mjs：試做版文案檢查（SPEC §8.4、附錄 B、附錄 D）。
//
//   node game-lab/tools/lint-copy.mjs          # 檢查＋產生 game-lab/LINES-REVIEW.md；有違規 exit 1
//
// 檢查：
//   1. 禁用字串（店主用語、支語、破折號）：content.js 的字串、cards.js 的 pitch、ui.js／duel.js／index.html 的字串（缺檔就跳過）
//   2. 必須原樣出現的六句（序章拍板句與原句）
//   3. 不得出現現行尾聲第 8 句（老闆宣告耳朵專長，09-03 店主拿掉）
//   4. 每一句都有來源標記（Beat.tag、lineTags、hintTags、helpTag、retorts[].tag、relics[].lineTag、events[].tag、pitches.json）
//   5. 標成 原句／拍板 的句子，必須一字不差地出現在現行 roguelike.html
//   6. 提示 ≤20 字、小抄 ≤200 字；說話的 Beat 要用「」
// 產出：game-lab/LINES-REVIEW.md（所有「新」句依場景列出，給店主過目）
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

// ---------------------------------------------------------------------------
// 字串常值抽取（跳過註解；處理樣板字串與正規表示式常值）
// ---------------------------------------------------------------------------
function jsStrings(src) {
  const out = []; let i = 0; const n = src.length; let prevSig = '';
  const kwBeforeRegex = /(?:^|[^\w$])(return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/;
  const lineOf = k => src.slice(0, k).split('\n').length;
  function readQuoted(q) {
    const start = i; i++; let s = '';
    while (i < n && src[i] !== q) { if (src[i] === '\\') { s += src[i + 1]; i += 2; continue; } if (src[i] === '\n') break; s += src[i++]; }
    i++; out.push({ s, line: lineOf(start) });
  }
  function readTemplate() {
    const start = i; i++; let s = '';
    while (i < n && src[i] !== '`') {
      if (src[i] === '\\') { s += src[i + 1]; i += 2; continue; }
      if (src[i] === '$' && src[i + 1] === '{') {
        out.push({ s, line: lineOf(start) }); s = ''; i += 2; let depth = 1;
        const exprStart = i;
        while (i < n && depth) { // 遞迴處理 ${} 裡的字串
          const ch = src[i];
          if (ch === '{') depth++; else if (ch === '}') { depth--; if (!depth) break; }
          else if (ch === "'" || ch === '"') { readQuoted(ch); continue; }
          else if (ch === '`') { readTemplate(); continue; }
          i++;
        }
        i++; void exprStart; continue;
      }
      s += src[i++];
    }
    i++; out.push({ s, line: lineOf(start) });
  }
  while (i < n) {
    const ch = src[i];
    if (ch === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (ch === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue; }
    if (ch === "'" || ch === '"') { readQuoted(ch); prevSig = 'str'; continue; }
    if (ch === '`') { readTemplate(); prevSig = 'str'; continue; }
    if (ch === '/') {
      const before = src.slice(Math.max(0, i - 12), i).replace(/\s+$/, '');
      const last = before.slice(-1);
      if (!before || '(,=:[!&|?{};+-*%<>~^'.includes(last) || kwBeforeRegex.test(before)) {
        i++; let inClass = false;
        while (i < n) { const c = src[i]; if (c === '\\') { i += 2; continue; } if (c === '[') inClass = true; else if (c === ']') inClass = false; else if (c === '/' && !inClass) break; else if (c === '\n') break; i++; }
        i++; while (/[a-z]/i.test(src[i] || '')) i++; prevSig = 're'; continue;
      }
    }
    if (!/\s/.test(ch)) prevSig = ch;
    i++;
  }
  void prevSig;
  return out;
}
function htmlStrings(src) {
  const out = [];
  let body = src.replace(/<!--[\s\S]*?-->/g, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  body = body.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (m, code) => { for (const x of jsStrings(code)) out.push(x); return ''; });
  body.split('\n').forEach((s, k) => out.push({ s, line: k + 1 }));
  return out;
}

// ---------------------------------------------------------------------------
// 1. 禁用字串
// ---------------------------------------------------------------------------
const FORBID = ['——', '櫃台', '入耳', '遺物', '卡片資訊', '派對', '全場大合唱', '心聲', '反咬',
  '視頻', '質量', '信息', '網絡', '軟件', '默認', '用戶', '屏幕', '登錄', '鼠標', '硬盤', '打印', '緩存', '加載'];
const HAS_CJK = /[㐀-鿿　-〿＀-￯]/;
function scanStrings(file, strings, opts = {}) {
  for (const { s, line } of strings) {
    if (!s) continue;
    for (const f of FORBID) if (s.includes(f)) err(file + ':' + line, '禁用字串「' + f + '」→ ' + s.slice(0, 60));
    // 單一破折號：只在含中文的字串（畫面上的對白／說明）裡禁止
    if (s.includes('—') && (opts.allDash || HAS_CJK.test(s))) err(file + ':' + line, '破折號「—」→ ' + s.slice(0, 60));
  }
}
const read = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null;
const scanned = [];
for (const [rel, kind] of [['content.js', 'js'], ['ui.js', 'js'], ['duel.js', 'js'], ['index.html', 'html']]) {
  const src = read(path.join(LAB, rel));
  if (src == null) { warns.push('略過（尚無此檔）：' + rel); continue; }
  scanned.push(rel);
  scanStrings(rel, kind === 'html' ? htmlStrings(src) : jsStrings(src), { allDash: rel === 'content.js' });
}

// ---------------------------------------------------------------------------
// 載入資料
// ---------------------------------------------------------------------------
let C;
try { C = require(path.join(LAB, 'content.js')); }
catch (e) { err('content.js', '載入失敗：' + e.message); report(); process.exit(1); }
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
const items = []; // { scene, where, who, text, tag }
const SCENE = { prologue: '序章（有聲音）', quietPrologue: '序章（安靜）', epilogueWin: '序章收尾', afterPrologue: '配件挑完 → 地圖',
  bossEnter: '傳說藏家進門', clear: '打烊（通關）', dead: '散場', again: '再來一夜' };
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
    if (b.ui && !['guess', 'acePick', 'retort', 'duel', 'stake', 'relic', 'map'].includes(b.ui)) err(where, 'ui 不合法：' + b.ui);
    const dup = b.who + '|' + b.text + '|' + b.tag;
    // 面板提示／蓋章字：現行 roguelike.html 有原文就算原句，否則算新句；同一句只列一次
    for (const extra of ['prompt', 'stamp', 'quietText']) if (b[extra] && !seenExtra.has(b[extra])) {
      seenExtra.add(b[extra]);
      items.push({ scene: SCENE[key] || key, where: where + '.' + extra, who: '（畫面字）', text: b[extra], tag: ORIG && ORIG.includes(b[extra]) ? '原句' : '新', ui: true });
    }
    if (seenBeat.has(dup)) return; seenBeat.add(dup);
    items.push({ scene: SCENE[key] || key, where, who: b.who || '旁白', text: b.text, tag: b.tag });
  });
}
(C.retorts || []).forEach((r, k) => {
  if (!TAG_OK(r.tag)) err('retorts[' + k + ']', '沒有 tag');
  items.push({ scene: '回嘴（玩家第一次有台詞）', where: 'retorts[' + k + '].label', who: '你', text: r.label, tag: r.tag });
  items.push({ scene: '回嘴（玩家第一次有台詞）', where: 'retorts[' + k + '].reply', who: '男子', text: r.reply, tag: r.tag });
});
// lines ↔ lineTags 必須同形狀
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
      items.push({ scene: who === 'owner' ? '老闆（對決外的小聲提點）' : who === 'player' ? '你' : '對決台詞・' + name, where, who: name, key, text, tag: tarr[k] });
    });
  }
}
// 每位敵人都要有完整的台詞鍵
for (const id of Object.keys(C.enemies || {})) {
  const l = (C.lines || {})[id];
  if (!l) { err('lines.' + id, '缺少台詞'); continue; }
  for (const k of ['intro', 'bubble', 'countered', 'hit', 'faceChange', 'lose', 'win']) if (!l[k] || (Array.isArray(l[k]) && !l[k].length)) err('lines.' + id, '缺少 ' + k);
  if (id !== 'man' && !l.ultWarn) err('lines.' + id, '缺少 ultWarn');
  if (C.enemies[id].hidden && !l.habit) err('lines.' + id, '有 ？ 格但缺少 habit');
}
for (const [k, v] of Object.entries(C.hints || {})) {
  const tag = (C.hintTags || {})[k];
  if (!TAG_OK(tag)) err('hints.' + k, '沒有 tag');
  if ([...v].length > 20) err('hints.' + k, '超過 20 字（' + [...v].length + '）：' + v);
  items.push({ scene: '老闆小聲提點（即時提示）', where: 'hints.' + k, who: '老闆', text: v, tag });
}
if (typeof C.help !== 'string') err('help', '沒有小抄');
else {
  if ([...C.help].length > 200) err('help', '超過 200 字（' + [...C.help].length + '）');
  if (!TAG_OK(C.helpTag)) err('help', '沒有 tag');
  items.push({ scene: '「？」小抄', where: 'help', who: '（畫面字）', text: C.help, tag: C.helpTag });
}
for (const [id, r] of Object.entries(C.relics || {})) if (r.line) {
  if (!TAG_OK(r.lineTag)) err('relics.' + id, 'line 沒有 lineTag');
  items.push({ scene: '發燒配件', where: 'relics.' + id + '.line', who: '老闆', text: r.line + '（' + r.name + '）', raw: r.line, tag: r.lineTag });
}
(C.events || []).forEach(ev => {
  if (!TAG_OK(ev.tag)) err('events.' + ev.id, '沒有 tag');
  items.push({ scene: '事件・' + ev.title, where: 'events.' + ev.id + '.text', who: '旁白', text: ev.text, tag: ev.tag });
  ev.options.forEach((o, k) => {
    items.push({ scene: '事件・' + ev.title, where: 'events.' + ev.id + '.options[' + k + ']', who: '選項', text: o.label + '｜' + o.note + '｜→ ' + o.result, tag: ev.tag });
    for (const s of [o.label, o.note, o.result]) scanStrings('events.' + ev.id, [{ s, line: 'option' + k }], { allDash: true });
  });
});
if (C.secondNight) items.push({ scene: '第二夜預告', where: 'secondNight', who: '（畫面字）', text: C.secondNight.name + '（' + C.secondNight.title + '）／' + C.secondNight.label, tag: C.secondNight.tag });
for (const [id, p] of Object.entries(pitches)) {
  if (id.startsWith('_')) continue;
  if (!TAG_OK(p.tag)) err('pitches.json#' + id, '沒有 tag');
  const card = CARDS[id];
  if (card && card.pitch !== p.text) err('pitches.json#' + id, 'cards.js 的 pitch 跟 pitches.json 不一致（重跑 bake-cards.mjs）');
  items.push({ scene: '推薦語・' + (p.scene || '其他'), where: 'pitch#' + id, who: card ? card.artist + '《' + card.album + '》' : id, text: p.text, tag: p.tag });
}

// ---------------------------------------------------------------------------
// 2. 必須原樣出現；3. 耳朵宣告不得出現
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
// 劇本的原句／拍板 Beat：整句要等於現行 RPG_BEATS 或 TUT_EPILOGUE_BEATS 裡某一句的 text（不是只要包含）
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
  // 推薦語可以是原句的節錄：外層「」裡的字要一字不差
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
let md = `# 台詞審稿：品味對決・試做版（LINES-REVIEW）

> 由 \`node game-lab/tools/lint-copy.mjs\` 產生，請勿手改。要改句子，直接改 \`game-lab/content.js\`（劇本、台詞、提示、事件）或 \`game-lab/tools/pitches.json\`（推薦語，改完重跑 \`node game-lab/tools/bake-cards.mjs\`），再重跑本檢查。
> 這份只列**新句**（試做版新寫、或取自四份概念稿，店主還沒看過）。標成「原句」「拍板」的句子已與現行 \`roguelike.html\` 逐字比對（${origChecked} 句，全部一致才會產生這份）。

統計：原句 ${counts['原句']}、拍板 ${counts['拍板']}、新 ${counts['新']}（同一句在有聲／安靜兩版序章只算一次）。

`;
for (const [scene, list] of byScene) {
  md += `## ${scene}\n\n| 說話者 | 句子 | 出處 | 位置 |\n|---|---|---|---|\n`;
  for (const it of list) md += `| ${esc(it.who)}${it.key ? '・' + it.key : ''} | ${esc(it.text)} | ${SRC[it.tag] || it.tag} | \`${it.where}\` |\n`;
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
