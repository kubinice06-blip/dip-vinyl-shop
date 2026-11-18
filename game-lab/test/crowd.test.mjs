// game-lab/test/crowd.test.mjs — 活店純函式（crowd-core.js，SPEC-H 棒 2a）的測試：LE11 輪替、LE13 誰推門、LE14 停留點與清路。
//   node game-lab/test/crowd.test.mjs        # 有失敗 exit 1
// 資料：
//   - 台詞池：自己造一份照 §5.7 句數表的樣本池（每位熟客 hello 2 泡、again 6、chat 12、dig 8、shelf 4、trip 6、close 3、mem 3、busy 2；
//     周姐另有 loreIn 10、loreOut 4、fact 20；路人 30；老闆 22＋trip 8）。content.js 的 C.chat 句數到齊（棒 3b 搬進來）就再用真資料跑一次 LE11；
//     還是佔位（每類 1 句）時只跑「不出錯、need 不成立的不出」，句數不夠的輪替檢查印一行提醒、不算失敗。
//   - 名冊：樣本名冊（附錄 A 的權重）；content.js 有 C.regulars 就再用真的跑一次 LE13。
//   - 停留點：讀真的 shops/dip.json；`crowd` 段（棒 1 在加）還沒有就用 §4.1 的形狀（座標一樣從 dip.json 的 bin.stand／spots 取）。
//     路線用 shop.js 的 navRoute（跟 Stage.route 同一個尋路）。
import path from 'path';
import fs from 'fs';
import vm from 'vm';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const K = require(path.join(LAB, 'crowd-core.js'));

let pass = 0, fail = 0; const fails = [], notes = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; if (fails.length < 80) fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } return !!cond; }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); return ok(A === B, name, A + ' !== ' + B); }
function section(name, fn) { const f0 = fail; const t0 = Date.now(); try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name + ' (' + (Date.now() - t0) + ' ms)'); }
const h = s => K.hash01('test#' + s);

// =====================================================================================================================
// 樣本資料
// =====================================================================================================================
const REG5 = ['xiaoyu', 'akai', 'datou', 'afang', 'laochen'];
const SAMPLE_REGULARS = {
  xiaoyu: { name: '小魚', look: 'girl', weight: 1.4, encW: 2, likes: ['c-citypop', 'c-folk', 'c-listen'] },
  akai: { name: '阿凱', look: 'cust2', weight: 1.0, encW: 3, likes: ['c-rock', 'c-hiphop', 'c-elec'] },
  datou: { name: '大頭', look: 'dude', weight: 1.0, encW: 3, likes: ['c-elec', 'c-soul', 'c-hiphop'] },
  afang: { name: '阿芳', look: {}, weight: 1.0, encW: 2, likes: ['c-citypop', 'c-world', 'c-listen'] },
  laochen: { name: '老陳', look: {}, weight: 1.0, encW: 2, likes: ['c-classical', 'c-soul', 'c-folk'] },
  zhoujie: { name: '周姐', look: 'regular', weight: 0.8, encW: 1, likes: ['c-world', 'c-classical', 'c-folk'] }
};
const SAMPLE_C = { regulars: SAMPLE_REGULARS, crowd: { kinds: { regular: 0.65, passer: 0.35 }, recent: 60000, passers: [{ skin: 'a' }, { skin: 'b' }, { skin: 'c' }, { skin: 'd' }] } };
const TRIP_NEEDS = [{ streakGte: 3 }, { hpHalf: true }, { posGte: 10 }, { firstRun: true }, { ace: 'pearl' }, { bagGte: 8 }, { newFar: true }, { retried: true }];

function samplePool() {
  const P = [];
  const add = (who, cat, i, text, need) => P.push(Object.assign({ id: who + '-' + cat + '-' + i, who, cat, text, tag: '新' }, need ? { need } : {}));
  for (const w of REG5.concat(['zhoujie'])) {
    add(w, 'hello', 1, ['你好。', '我常來。']);
    for (let i = 1; i <= 6; i++) add(w, 'again', i, '又見面了' + i);
    const nChat = w === 'zhoujie' ? 8 : 12;
    for (let i = 1; i <= nChat; i++) add(w, 'chat', i, '閒聊' + i, w === 'datou' && i > 10 ? { at: ['c-elec', 'c-hiphop', 'c-soul'] } : null);
    if (w !== 'zhoujie') {
      for (let i = 1; i <= 8; i++) add(w, 'dig', i, '挖寶' + i);
      for (let i = 1; i <= 4; i++) add(w, 'shelf', i, '這箱有張《{album}》' + i);
    }
    const nTrip = w === 'zhoujie' ? 3 : 6;
    for (let i = 1; i <= nTrip; i++) add(w, 'trip', i, i === 5 ? '你也走{title}的路子' : '這一趟' + i, TRIP_NEEDS[(i - 1 + REG5.indexOf(w) + 1) % TRIP_NEEDS.length]);
    for (let i = 1; i <= 3; i++) add(w, 'close', i, '熟了' + i);
    for (let i = 1; i <= 3; i++) add(w, 'mem', i, i === 1 ? '上一趟你停在第 {last} 位' : '記得你' + i);
    for (let i = 1; i <= 2; i++) add(w, 'busy', i, '我再翻一下' + i);
  }
  for (let i = 1; i <= 10; i++) add('zhoujie', 'loreIn', i, '{artist}啊' + i);
  for (let i = 1; i <= 4; i++) add('zhoujie', 'loreOut', i, '點封面看唱片資訊' + i);
  const FACT = [null, null, null, { onShelf: true }, { onShelf: true }, { o: 4 }, { o: '>=4' }, { h: 4 }, { h: 4 }, { c: 4 }, { c: [4, 5] }, null, null, null, null, null, null, null, null, null];
  for (let i = 1; i <= 20; i++) add('zhoujie', 'fact', i, i === 4 ? '那張就在{bin}那箱' : i === 12 ? '{artist}是{region}的' : i === 13 ? '這張偏{axis}' : '《{album}》是{year}年發行的' + i, FACT[i - 1]);
  for (let i = 1; i <= 30; i++) add('passer', 'chat', i, '路人' + i);
  return P;
}
function sampleOwner() {
  const P = [];
  for (let i = 1; i <= 12; i++) P.push({ id: 'own-chat-' + i, who: 'owner', cat: 'chat', text: '老闆閒聊' + i, tag: '新' });
  for (let i = 1; i <= 10; i++) P.push({ id: 'own-shop-' + i, who: 'owner', cat: 'chat', text: '{name}以前' + i, need: { met: REG5.concat(['zhoujie'])[i % 6] }, tag: '新' });
  for (let i = 1; i <= 8; i++) P.push({ id: 'own-trip-' + i, who: 'owner', cat: 'trip', text: '撐著點' + i, need: TRIP_NEEDS[i - 1], tag: '新' });
  return P;
}
const POOL = samplePool(), OWNER = sampleOwner();

// content.js（棒 3a／3b 同時在寫；載不起來或還沒有就跳過真資料那一輪）
let C0 = null;
try { C0 = require(path.join(LAB, 'content.js')); } catch (e) { notes.push('content.js 載入失敗（棒 3a 可能正在改）：' + String(e.message).slice(0, 120)); }
// §5.7 第一階段句數（每位熟客、周姐、路人、老闆；切磋類第二階段才有）
const FULL = {
  regular: { again: 6, chat: 12, dig: 8, shelf: 4, trip: 6, close: 3, mem: 3, busy: 2 },
  zhoujie: { again: 6, chat: 8, trip: 3, close: 3, mem: 3, busy: 2, loreIn: 10, loreOut: 4, fact: 20 },
  passer: { chat: 30 }, owner: { chat: 22, trip: 8 }
};
function countOf(pool, who, cat) { return pool.filter(l => l && l.who === who && l.cat === cat).length; }
function fullFor(pool, who) { const want = who === 'zhoujie' ? FULL.zhoujie : FULL[who] || FULL.regular; return Object.keys(want).every(c => countOf(pool, who, c) >= want[c]); }

// =====================================================================================================================
// 模擬聊天（導演的最小版本：照 §5.5、§8 存 n／met／seen，recent 放記憶體）
// =====================================================================================================================
const STOPS_ALL = ['c-rock', 'c-soul', 'c-citypop', 'c-world', 'c-elec', 'c-hiphop', 'c-classical', 'c-folk', 'c-listen', 'c-pay'];
function tripFacts(tag) {
  return { pos: 1 + Math.floor(h(tag + 'pos') * 30), streak: Math.floor(h(tag + 'st') * 6), hpHalf: h(tag + 'hp') < 0.3, retried: h(tag + 're') < 0.2, dare: h(tag + 'da') < 0.2,
    bag: Math.floor(h(tag + 'bag') * 12), ace: ['hall', 'pearl', 'heresy'][Math.floor(h(tag + 'ace') * 3)], firstRun: h(tag + 'fr') < 0.15, newFar: h(tag + 'nf') < 0.2 };
}
function cardFacts(tag) {
  const ax = k => 1 + Math.floor(h(tag + k) * 5);
  const c = { o: ax('o'), h: ax('h'), c: ax('c'), onShelf: h(tag + 'sh') < 0.5, lore: h(tag + 'lo') < 0.7 };
  const axis = c.c >= 4 ? '經典' : c.o >= 4 ? '冷門' : c.h >= 4 ? '硬蕊' : null;
  c.vars = { artist: 'A', album: 'B', year: 1977, decade: 1970, genre: '搖滾', bin: c.onShelf ? '搖滾' : null, region: h(tag + 'rg') < 0.3 ? '日本' : null, tune: '午夜', axis };
  return c;
}
// 跑 trips 趟；每趟 1–3 次來、每次來 1–3 段（見過以後）；回傳每段的紀錄
function simulate(pool, who, trips, o) {
  o = o || {};
  const S = { n: o.n0 | 0, met: null, recent: [] };
  const log = [];
  for (let t = 0; t < trips; t++) {
    const runTag = 'seed' + (t >> 2) + '#' + t;
    const visits = o.visits ? o.visits(t) : 1 + Math.floor(h(who + 'v' + t) * 3);
    for (let v = 0; v < visits; v++) {
      const visit = [];
      const beats = o.beats ? o.beats(t, v) : 1 + Math.floor(h(who + 'b' + t + '#' + v) * 3);
      const at = STOPS_ALL[Math.floor(h(who + 'at' + t + '#' + v) * 9)];
      for (let b = 0; b < beats; b++) {
        const tag = who + '#' + t + '#' + v + '#' + b;
        const trip = h(tag + 'title') < 0.1 ? null : tripFacts(tag);
        const ctx = {
          met: !!S.met, talks: S.met ? S.met.talks : 0, againAt: S.met ? S.met.againAt : '', runTag, visit: visit.slice(), at,
          shelf: at !== 'c-listen' && at !== 'c-pay' && h(tag + 'shelf') < 0.6 ? ['card-1'] : [], runs: t, trip,
          metIds: o.metIds ? o.metIds(t) : [], card: o.card ? cardFacts(tag) : null, recent: S.recent,
          vars: { title: '冷門流', pos: 3, last: t ? 7 : null, far: 9, album: 'B', artist: 'A', name: null }
        };
        const r = K.chatPick({ who, pool, seen: S.met ? S.met.seen : (o.seen || {}), n: S.n, ctx });
        if (!r) { log.push({ t, v, b, none: true, ctx }); continue; }
        log.push({ t, v, b, cat: r.cat, ids: r.ids, mode: r.mode, quoteAt: r.quoteAt, ctx, runTag });
        visit.push(r.cat);
        S.n++;
        S.recent = r.recent;
        if (who === 'owner' || who === 'passer') { o.seen = r.seen; S.met = null; }
        else S.met = K.noteChat(S.met, r, runTag);
      }
    }
  }
  return { log, S };
}
const byId = pool => { const m = new Map(); for (const l of pool) m.set(String(l.id), l); return m; };

// LE11 的檢查本體（樣本池、真資料共用）
function checkRotation(label, pool, who, o) {
  o = o || {};
  const ID = byId(pool);
  const { log } = simulate(pool, who, o.trips || 120, o.sim || {});
  const segs = log.filter(x => !x.none);
  ok(segs.length > 50, label + '：有講出東西', segs.length);
  // hello 一輩子一次、是第一段
  const hellos = segs.filter(x => x.cat === 'hello');
  if (countOf(pool, who, 'hello')) { eq(hellos.length, 1, label + '：hello 一輩子一次'); ok(segs[0].cat === 'hello', label + '：第一段是 hello', segs[0].cat); }
  // again：每趟最多一次、只在這一趟第一段；同一句至少隔 5 趟（環 4）
  if (countOf(pool, who, 'again')) {
    const firstOfTrip = new Set(); const seenTrip = new Set();
    for (const s of segs) if (!seenTrip.has(s.t)) { seenTrip.add(s.t); firstOfTrip.add(s); }
    let bad = 0, perTrip = {};
    for (const s of segs) if (s.cat === 'again') { perTrip[s.t] = (perTrip[s.t] || 0) + 1; if (!firstOfTrip.has(s)) bad++; }
    eq(bad, 0, label + '：again 只在這一趟第一段');
    ok(Object.values(perTrip).every(x => x === 1), label + '：again 一趟只講一次');
    const nAgain = countOf(pool, who, 'again'), L = K.ringLen(nAgain);
    const order = segs.filter(s => s.cat === 'again').map(s => s.ids[0]);
    let minGap = Infinity; const last = {};
    order.forEach((id, i) => { if (id in last) minGap = Math.min(minGap, i - last[id]); last[id] = i; });
    ok(minGap >= L + 1, label + '：開場句同一句至少隔 ' + (L + 1) + ' 趟', minGap);
    if (nAgain >= 6) ok(minGap >= 5, label + '：開場句（6 句、環 4）至少 5 趟才重複', minGap);
    // 每趟第一段（見過以後）都是 again
    const missed = [...firstOfTrip].filter(s => s.t > 0 && s.cat !== 'again').length;
    eq(missed, 0, label + '：這一趟第一次遇到＝again');
  }
  // 同一類同一句至少隔「環長」次該類（環長照「沒有 need 的句數」算＝保守下限）
  const cats = [...new Set(segs.map(s => s.cat))];
  for (const cat of cats) {
    if (cat === 'hello' || cat === 'again' || cat === 'know') continue;
    const free = pool.filter(l => l.who === who && l.cat === cat && !l.need).length;
    if (!free) continue;
    const L = K.ringLen(free);
    const order = segs.filter(s => s.cat === cat).map(s => s.ids[0]);
    let minGap = Infinity; const last = {};
    order.forEach((id, i) => { if (id in last) minGap = Math.min(minGap, i - last[id]); last[id] = i; });
    ok(minGap >= L + 1, label + '：' + cat + ' 同一句至少隔 ' + L + ' 次該類', minGap);
  }
  // 同一位連續 10 段沒有同一句
  let rep = null;
  for (let i = 0; i < segs.length && !rep; i++) for (let j = Math.max(0, i - 9); j < i && !rep; j++) for (const id of segs[i].ids) if (segs[j].ids.includes(id)) rep = [j, i, id];
  ok(!rep, label + '：同一位連續 10 段沒有同一句', rep);
  // need 不成立的不出（含 at、onShelf、三軸）；空格填得到
  let needBad = 0, holeBad = 0;
  for (const s of segs) for (const id of s.ids) {
    const l = ID.get(id);
    if (!K.needOk(l, s.ctx)) needBad++;
    if (!K.usable(l, s.ctx)) holeBad++;
    if (l.need && l.need.at) ok(l.need.at.includes(s.ctx.at), label + '：need.at 只在那幾格', [id, s.ctx.at]);
  }
  eq(needBad, 0, label + '：need 不成立的不出');
  eq(holeBad, 0, label + '：空格填不到的不出');
  // 同一次來不連兩段同類（只剩一類可抽除外：老闆、路人只有 chat）
  if (!o.singleCat) {
    let dup = 0;
    for (let i = 1; i < segs.length; i++) { const a = segs[i - 1], b = segs[i]; if (a.t === b.t && a.v === b.v && a.cat === b.cat) dup++; }
    eq(dup, 0, label + '：同一次來不連兩段同類');
  }
  // 段的形狀：一段 1–2 句（hello 照台詞表取到 2 泡；周姐知識段 2–3 泡）
  for (const s of segs) {
    const bubbles = s.ids.reduce((t, id) => t + (Array.isArray(ID.get(id).text) ? ID.get(id).text.length : 1), 0) + (s.mode === 'lore' ? 1 : 0);
    if (s.cat === 'know') ok(bubbles >= 2 && bubbles <= 3 || (s.mode === 'fact' && bubbles >= 1 && bubbles <= 2), label + '：知識段 1–3 泡', [s.mode, bubbles]);
    else if (s.cat === 'hello') ok(bubbles >= 1 && bubbles <= 2 + 1, label + '：hello 一段', bubbles);
    else ok(s.ids.length === 1, label + '：一般一段一句', s.ids);
  }
  return segs;
}

// =====================================================================================================================
section('hash01 跟 engine.js 同一個值（雜湊不分家）', () => {
  let E = null; try { E = require(path.join(LAB, 'engine.js')); } catch (e) { notes.push('engine.js 載不起來，略過 hash01 對照'); }
  if (E && typeof E.hash01 === 'function') for (const s of ['a', 'seed#3#12#crowd#0', 'title#4#2026-11-18#crowd#2', '17#xiaoyu#chat', '']) eq(K.hash01(s), E.hash01(s), 'hash01(' + s + ')');
  for (let i = 0; i < 200; i++) { const u = K.hash01('x' + i); ok(u >= 0 && u < 1, 'hash01 在 [0,1)'); }
});

// =====================================================================================================================
// LE11 輪替
// =====================================================================================================================
section('LE11 輪替：樣本池（五位熟客、周姐、老闆、路人）', () => {
  for (const w of REG5) checkRotation('樣本 ' + w, POOL, w, { trips: 120 });
  const zj = checkRotation('樣本 zhoujie', POOL, 'zhoujie', { trips: 120, sim: { card: true } });
  ok(zj.some(s => s.cat === 'know' && s.mode === 'lore'), '周姐有摘句段');
  ok(zj.some(s => s.cat === 'know' && s.mode === 'fact'), '周姐有樣板段');
  checkRotation('樣本 owner', OWNER, 'owner', { trips: 80, singleCat: true, sim: { metIds: t => t < 20 ? [] : t < 40 ? ['xiaoyu'] : REG5.concat(['zhoujie']) } });
  checkRotation('樣本 passer', POOL, 'passer', { trips: 80, singleCat: true, sim: { seen: [], visits: () => 1, beats: () => 1 } });
});

section('LE11 hello／again／分類條件（單點）', () => {
  const base = { met: true, talks: 20, againAt: 'r1', runTag: 'r1', visit: [], at: 'c-rock', shelf: [], runs: 3, trip: tripFacts('x'), metIds: [] };
  // 沒見過 → hello（一段 2 泡）
  let r = K.chatPick({ who: 'akai', pool: POOL, seen: {}, n: 0, ctx: Object.assign({}, base, { met: false }) });
  eq([r.cat, r.ids], ['hello', ['akai-hello-1']], '沒見過＝hello');
  // 見過、這一趟還沒講開場 → again；againAt＝這一趟就不講
  r = K.chatPick({ who: 'akai', pool: POOL, seen: {}, n: 0, ctx: Object.assign({}, base, { againAt: 'r0' }) });
  eq(r.cat, 'again', 'againAt≠runTag＝again');
  const rec = K.noteChat({ talks: 3, againAt: 'r0', seen: {} }, r, 'r1');
  eq([rec.talks, rec.againAt], [4, 'r1'], 'noteChat 記 talks+1、againAt＝這一趟');
  for (let n = 0; n < 200; n++) { const x = K.chatPick({ who: 'akai', pool: POOL, seen: {}, n, ctx: base }); ok(x && x.cat !== 'again' && x.cat !== 'hello', '同一趟不再講 again', x && x.cat); }
  // 標題回訪（沒有 run）：trip 不出
  for (let n = 0; n < 300; n++) { const x = K.chatPick({ who: 'akai', pool: POOL, seen: {}, n, ctx: Object.assign({}, base, { trip: null }) }); ok(x.cat !== 'trip', '沒有 run：trip 不出'); }
  // close 要 talks≥8、mem 要 runs≥1 且 talks≥12、shelf 要架上有卡
  const cats = (ctx, N) => { const s = new Set(); for (let n = 0; n < (N || 400); n++) { const x = K.chatPick({ who: 'akai', pool: POOL, seen: {}, n, ctx: Object.assign({}, base, ctx) }); if (x) s.add(x.cat); } return s; };
  let s = cats({ talks: 7 }); ok(!s.has('close') && !s.has('mem'), 'talks 7：沒有 close、mem', [...s]);
  s = cats({ talks: 8 }); ok(s.has('close') && !s.has('mem'), 'talks 8：有 close、沒有 mem', [...s]);
  s = cats({ talks: 12, runs: 0 }); ok(!s.has('mem'), '第一趟（runs 0）：沒有 mem', [...s]);
  s = cats({ talks: 12, runs: 1 }); ok(s.has('mem'), 'runs 1、talks 12：有 mem', [...s]);
  s = cats({ shelf: [] }); ok(!s.has('shelf'), '架上沒卡：沒有 shelf', [...s]);
  s = cats({ shelf: ['x'] }); ok(s.has('shelf'), '架上有卡：有 shelf', [...s]);
  s = cats({ shelf: ['x'], at: null }); ok(s.has('shelf'), 'shelf 看 ctx.shelf（導演只在停箱子時給）', [...s]);
  // trip：條件成立、這次來還沒講 → 約 35%；講過就不出
  let tr = 0, N = 2000;
  const tctx = Object.assign({}, base, { trip: { pos: 12, streak: 4, hpHalf: true, bag: 9, ace: 'pearl', firstRun: true, newFar: true, retried: true } });
  for (let n = 0; n < N; n++) { const x = K.chatPick({ who: 'akai', pool: POOL, seen: {}, n, ctx: tctx }); if (x.cat === 'trip') tr++; }
  ok(Math.abs(tr / N - 0.35) < 0.03, 'trip 約 35%', tr / N);
  for (let n = 0; n < 300; n++) { const x = K.chatPick({ who: 'akai', pool: POOL, seen: {}, n, ctx: Object.assign({}, tctx, { visit: ['chat', 'trip'] }) }); ok(x.cat !== 'trip', '這次來講過 trip 就不出'); }
  // trip 條件全不成立 → 不出
  for (let n = 0; n < 300; n++) { const x = K.chatPick({ who: 'akai', pool: POOL, seen: {}, n, ctx: Object.assign({}, base, { trip: { pos: 1, streak: 0, bag: 0, ace: 'hall' } }) }); ok(x.cat !== 'trip', 'trip 條件不成立不出'); }
  // 同一次來不連兩段同類
  for (let n = 0; n < 300; n++) { const x = K.chatPick({ who: 'akai', pool: POOL, seen: {}, n, ctx: Object.assign({}, base, { visit: ['dig'] }) }); ok(x.cat !== 'dig', '上一段 dig 這段不 dig'); }
  // 權重大致照 chat 40／dig 25（不給 shelf、close、mem、trip 時＝40:25）
  let ch = 0, dg = 0;
  for (let n = 0; n < 3000; n++) { const x = K.chatPick({ who: 'akai', pool: POOL, seen: {}, n, ctx: Object.assign({}, base, { talks: 0, runs: 0, trip: null }) }); if (x.cat === 'chat') ch++; else if (x.cat === 'dig') dg++; }
  ok(Math.abs(ch / (ch + dg) - 40 / 65) < 0.03, 'chat:dig≈40:25', ch / (ch + dg));
});

section('LE11 need：at、onShelf、三軸、met、未知鍵', () => {
  const L = (need, cat) => ({ id: 'q', who: 'x', cat: cat || 'chat', text: 't', need });
  ok(K.needOk(L({ at: ['c-elec', 'c-soul'] }), { at: 'c-soul' }), 'at 成立');
  ok(!K.needOk(L({ at: ['c-elec'] }), { at: 'c-soul' }), 'at 不成立');
  ok(!K.needOk(L({ at: ['c-elec'] }), { at: null }), '走路中（at null）不成立');
  ok(K.needOk(L({ at: 'c-elec' }), { at: 'c-elec' }), 'at 寫字串也可以');
  ok(K.needOk(L({ onShelf: true }), { card: { onShelf: true } }) && !K.needOk(L({ onShelf: true }), { card: { onShelf: false } }) && !K.needOk(L({ onShelf: true }), {}), 'onShelf');
  ok(K.needOk(L({ o: 4 }), { card: { o: 4 } }) && !K.needOk(L({ o: 4 }), { card: { o: 3 } }), 'o 數字＝至少');
  ok(K.needOk(L({ h: '>=4' }), { card: { h: 5 } }) && !K.needOk(L({ h: '>=4' }), { card: { h: 2 } }), "h '>=4'");
  ok(K.needOk(L({ c: '<=2' }), { card: { c: 2 } }) && !K.needOk(L({ c: '<=2' }), { card: { c: 3 } }), "c '<=2'");
  ok(K.needOk(L({ c: [4, 5] }), { card: { c: 5 } }) && !K.needOk(L({ c: [4, 5] }), { card: { c: 3 } }), 'c [4,5]');
  ok(!K.needOk(L({ o: 4 }), {}), '三軸沒卡＝不成立');
  ok(K.needOk(L({ met: 'zhoujie' }), { metIds: ['zhoujie'] }) && !K.needOk(L({ met: 'zhoujie' }), { metIds: ['xiaoyu'] }), 'met 字串');
  ok(K.needOk(L({ met: true }), { metIds: ['xiaoyu'] }) && !K.needOk(L({ met: true }), { metIds: [] }), 'met true');
  ok(K.needOk(L({ met: ['a', 'b'] }), { metIds: ['a', 'b', 'c'] }) && !K.needOk(L({ met: ['a', 'b'] }), { metIds: ['a'] }), 'met 陣列＝都見過');
  ok(!K.needOk(L({ whatever: 1 }), { trip: {} }), '不認得的鍵＝不講');
  const T = { pos: 10, streak: 3, bag: 8, ace: 'pearl', hpHalf: true, firstRun: false };
  ok(K.needOk(L({ posGte: 10 }), { trip: T }) && !K.needOk(L({ posGte: 11 }), { trip: T }), 'posGte');
  ok(K.needOk(L({ posLte: 10 }), { trip: T }) && !K.needOk(L({ posLte: 9 }), { trip: T }), 'posLte');
  ok(K.needOk(L({ streakGte: 3, bagGte: 8 }), { trip: T }) && !K.needOk(L({ streakGte: 4 }), { trip: T }), 'streakGte／bagGte');
  ok(K.needOk(L({ ace: 'pearl' }), { trip: T }) && K.needOk(L({ ace: ['hall', 'pearl'] }), { trip: T }) && !K.needOk(L({ ace: 'heresy' }), { trip: T }), 'ace');
  ok(K.needOk(L({ hpHalf: true }), { trip: T }) && !K.needOk(L({ firstRun: true }), { trip: T }) && K.needOk(L({ firstRun: false }), { trip: T }), '布林鍵');
  ok(!K.needOk(L({ hpHalf: true }), { trip: null }), '沒有 run：trip 類鍵不成立');
  // 空格：有 vars 才查；{name} 帶 need.met 指定熟客就算填得到
  ok(K.usable({ id: 'a', text: '第 {last} 位', cat: 'mem' }, {}), '沒給 vars 不查空格');
  ok(!K.usable({ id: 'a', text: '第 {last} 位', cat: 'mem' }, { vars: { last: null } }), '{last} 填不到＝不出');
  ok(K.usable({ id: 'a', text: '第 {last} 位', cat: 'mem' }, { vars: { last: 7 } }), '{last} 填得到');
  ok(K.usable({ id: 'a', text: '{name}以前', need: { met: 'zhoujie' } }, { vars: {}, metIds: ['zhoujie'] }), '{name}＋need.met');
  ok(!K.usable({ id: 'a', text: '這張偏{axis}', cat: 'fact' }, { card: { vars: { axis: null } } }), '{axis} 沒有 ≥4 的軸＝不出');
  ok(K.usable({ id: 'a', text: '這張偏{axis}', cat: 'fact' }, { card: { vars: { axis: '冷門' } } }), '{axis} 有');
  // 樣本池跑出來：大頭的綁站位句只在那三格出
  let atLines = 0;
  for (let n = 0; n < 2000; n++) {
    const at = STOPS_ALL[n % 10];
    const x = K.chatPick({ who: 'datou', pool: POOL, seen: {}, n, ctx: { met: true, talks: 0, againAt: 'r', runTag: 'r', visit: [], at, shelf: [], runs: 0, trip: null } });
    for (const id of x.ids) if (/^datou-chat-1[12]$/.test(id)) { atLines++; ok(['c-elec', 'c-hiphop', 'c-soul'].includes(at), '大頭綁站位句只在 c-elec／c-hiphop／c-soul', at); }
  }
  ok(atLines > 0, '大頭的綁站位句有機會出', atLines);
});

section('LE11 周姐知識段：摘句 80／樣板 20、onShelf、三軸', () => {
  let lore = 0, fact = 0;
  const ID = byId(POOL);
  for (let n = 0; n < 3000; n++) {
    const card = cardFacts('k' + n);
    const r = K.chatPick({ who: 'zhoujie', pool: POOL, seen: {}, n, ctx: { met: true, againAt: 'r', runTag: 'r', talks: 0, visit: [], cat: 'know', card } });
    if (!r) continue;
    eq(r.cat, 'know', '硬指定 know');
    for (const id of r.ids) { const l = ID.get(id); ok(K.needOk(l, { card }), '知識句 need 成立', [id, card.o, card.h, card.c, card.onShelf]); ok(K.usable(l, { card }), '知識句空格填得到', [id]); }
    if (r.mode === 'lore') {
      if (card.lore) lore++; else ok(false, '沒有摘句的卡不會出摘句段');
      ok(/^zhoujie-loreIn-/.test(r.ids[0]) && r.quoteAt === 1, '摘句段＝引子先、摘句插在第 2 個', r.ids);
      if (card.onShelf) ok(r.ids[1] === 'zhoujie-fact-4' || r.ids[1] === 'zhoujie-fact-5' || /loreOut/.test(r.ids[1]), '在架上：收尾優先「那張就在{bin}那箱」', r.ids);
      else ok(/loreOut/.test(r.ids[1]), '不在架上：收尾「點封面看唱片資訊」', r.ids);
    } else {
      eq(r.mode, 'fact', '不是摘句就是樣板');
      if (card.lore) fact++;
      ok(r.ids.length >= 1 && r.ids.length <= 2 && r.ids.every(id => /fact/.test(id)), '樣板段 1–2 句', r.ids);
    }
  }
  ok(Math.abs(lore / (lore + fact) - 0.8) < 0.03, '有摘句時 摘句 80／樣板 20', lore / (lore + fact));
  // 沒有卡＝know 不出
  for (let n = 0; n < 300; n++) { const r = K.chatPick({ who: 'zhoujie', pool: POOL, seen: {}, n, ctx: { met: true, againAt: 'r', runTag: 'r', talks: 0, visit: [], card: null } }); ok(r && r.cat !== 'know', '沒有卡：know 不出'); }
  // 周姐的分類權重：know 55／chat 25／trip 10／mem 10
  const cnt = {};
  for (let n = 0; n < 4000; n++) {
    const r = K.chatPick({ who: 'zhoujie', pool: POOL, seen: {}, n, ctx: { met: true, againAt: 'r', runTag: 'r', talks: 20, runs: 2, visit: [], card: cardFacts('w' + n), trip: { pos: 12, streak: 5, hpHalf: true, bag: 9, ace: 'pearl', firstRun: true, newFar: true, retried: true } } });
    cnt[r.cat] = (cnt[r.cat] || 0) + 1;
  }
  ok(Math.abs(cnt.know / 4000 - 0.55) < 0.03 && Math.abs(cnt.chat / 4000 - 0.25) < 0.03 && Math.abs((cnt.trip || 0) / 4000 - 0.1) < 0.02 && Math.abs((cnt.mem || 0) / 4000 - 0.1) < 0.02, '周姐 know55／chat25／trip10／mem10', cnt);
});

section('LE11 邊界：空的分類、空池、共用環、硬指定、決定性', () => {
  // 第一階段沒有切磋類：硬指定 encDare＝null，不丟錯
  eq(K.chatPick({ who: 'akai', pool: POOL, seen: {}, n: 3, ctx: { met: true, cat: 'encDare' } }), null, '空的分類＝null');
  eq(K.chatPick({ who: 'nobody', pool: POOL, seen: {}, n: 3, ctx: {} }), null, '沒有這個人的句子＝null');
  eq(K.chatPick({ who: 'akai', pool: [], seen: null, n: 0 }), null, '空池＝null');
  eq(K.chatPick({}), null, '什麼都沒給＝null');
  // 只有 chat 一類的人（佔位資料）也挑得到
  const tiny = [{ id: 'a1', who: 'a', cat: 'chat', text: 'x' }];
  for (let n = 0; n < 5; n++) { const r = K.chatPick({ who: 'a', pool: tiny, seen: { chat: ['a1'] }, n, ctx: { met: true, againAt: 'r', runTag: 'r', visit: ['chat'] } }); eq(r && r.ids, ['a1'], '只剩一句一類也講得出來'); }
  // busy：硬指定、兩句輪流
  const b1 = K.chatPick({ who: 'akai', pool: POOL, seen: {}, n: 0, ctx: { met: true, cat: 'busy' } });
  const b2 = K.chatPick({ who: 'akai', pool: POOL, seen: b1.seen, n: 1, ctx: { met: true, cat: 'busy' } });
  ok(b1.cat === 'busy' && b2.cat === 'busy' && b1.ids[0] !== b2.ids[0], 'busy 兩句輪流', [b1.ids, b2.ids]);
  // 路人共用環：seen 傳陣列、回傳陣列、環長 floor(0.75×30)＝22
  let seen = [], last = {}, minGap = Infinity;
  for (let n = 0; n < 400; n++) { const r = K.chatPick({ who: 'passer', pool: POOL, seen, n, ctx: {} }); ok(Array.isArray(r.seen), '路人 seen 回傳陣列'); seen = r.seen; const id = r.ids[0]; if (id in last) minGap = Math.min(minGap, n - last[id]); last[id] = n; }
  eq(K.ringLen(30), 22, '路人環長 22');
  ok(minGap >= 23, '路人同一句至少隔 22 次', minGap);
  ok(seen.length <= 22, '路人 seen 長度 ≤22', seen.length);
  // 環長：chat 12＝9、dig 8＝6、again 6＝4
  eq([K.ringLen(12), K.ringLen(8), K.ringLen(6), K.ringLen(3), K.ringLen(1), K.ringLen(0)], [9, 6, 4, 2, 1, 1], '環長＝max(1, floor(0.75×句數))');
  // seen 長度按類算、不改到輸入
  const seenIn = { chat: ['akai-chat-1'], dig: [] }, frozen = JSON.stringify(seenIn);
  const r = K.chatPick({ who: 'akai', pool: POOL, seen: seenIn, n: 5, ctx: { met: true, againAt: 'r', runTag: 'r', visit: [] } });
  eq(JSON.stringify(seenIn), frozen, '不改到傳進來的 seen');
  ok(r.seen[r.cat].includes(r.ids[0]), '回傳的 seen 有剛講的那句');
  // 決定性
  const a = K.chatPick({ who: 'laochen', pool: POOL, seen: {}, n: 77, ctx: { met: true, againAt: 'r', runTag: 'r', talks: 13, runs: 2, visit: [], shelf: ['x'] } });
  const b = K.chatPick({ who: 'laochen', pool: POOL, seen: {}, n: 77, ctx: { met: true, againAt: 'r', runTag: 'r', talks: 13, runs: 2, visit: [], shelf: ['x'] } });
  eq(a, b, '同輸入同輸出');
  // 某類句子全在 seen 裡、硬指定 → 砍掉較舊的一半再挑（不會挑不到）
  const allDig = POOL.filter(l => l.who === 'akai' && l.cat === 'dig').map(l => l.id);
  const r2 = K.chatPick({ who: 'akai', pool: POOL, seen: { dig: allDig }, n: 1, ctx: { met: true, cat: 'dig' } });
  ok(r2 && allDig.slice(0, 4).includes(r2.ids[0]), '全看過：從較舊的一半挑', r2 && r2.ids);
});

section('LE11 真資料（content.js C.chat／C.ownerChat；句數到齊才跑輪替）', () => {
  const chat = C0 && Array.isArray(C0.chat) ? C0.chat : null;
  if (!chat) { notes.push('LE11 真資料：content.js 還沒有 C.chat（棒 3a／3b 未交），這次只跑樣本池'); return; }
  const owner = Array.isArray(C0.ownerChat) ? C0.ownerChat : [];
  const regs = C0.regulars ? Object.keys(C0.regulars) : [...new Set(chat.map(l => l.who))].filter(w => w !== 'passer');
  const ids = chat.concat(owner).map(l => l && l.id);
  eq(ids.length, new Set(ids).size, '真資料 id 不重複');
  // 不管句數到不到，每個人都要能挑、不丟錯、need 不成立的不出
  for (const w of regs.concat(['passer'])) {
    const pool = chat;
    for (let n = 0; n < 200; n++) {
      const ctx = { met: n % 7 !== 0, talks: n % 20, againAt: n % 3 ? 'r' : 'q', runTag: 'r', visit: [], at: STOPS_ALL[n % 10], shelf: n % 2 ? ['x'] : [], runs: n % 4, trip: n % 5 ? tripFacts('real' + n) : null, metIds: regs.slice(0, n % 6), card: w === 'zhoujie' ? cardFacts('rc' + n) : null };
      const r = K.chatPick({ who: w, pool, seen: w === 'passer' ? [] : {}, n, ctx });
      if (!r) continue;
      for (const id of r.ids) { const l = pool.find(x => String(x.id) === id); ok(l && K.needOk(l, ctx), '真資料 ' + w + '：need 不成立的不出', id); }
    }
    if (fullFor(chat, w)) checkRotation('真資料 ' + w, chat, w, { trips: 120, singleCat: w === 'passer', sim: w === 'zhoujie' ? { card: true } : w === 'passer' ? { seen: [], visits: () => 1, beats: () => 1 } : {} });
    else notes.push('LE11 真資料：' + w + ' 句數還沒到 §5.7 第一階段表（佔位中），輪替檢查等棒 3b 搬句後再跑');
  }
  if (owner.length) {
    if (fullFor(owner, 'owner')) checkRotation('真資料 owner', owner, 'owner', { trips: 80, singleCat: true, sim: { metIds: t => t < 20 ? [] : regs } });
    else notes.push('LE11 真資料：老闆句數還沒到 §5.7（佔位中）');
  }
});

// =====================================================================================================================
// LE13 誰推門
// =====================================================================================================================
function checkSeq(label, C) {
  const ids = Object.keys(C.regulars);
  // 決定性
  const t = K.seqTag({ seedKey: '2026-11-18', runNo: 2, pos: 7 });
  eq(t, '2026-11-18#2#7', label + '：seqTag＝seedKey#runNo#pos');
  for (let k = 0; k < 20; k++) eq(K.crowdSeq(t, C, k, {}), K.crowdSeq(t, C, k, {}), label + '：同輸入同輸出 k=' + k);
  // 比例：熟客 0.65±0.02；熟客照權重
  let reg = 0, N = 0; const per = {};
  for (let s = 0; s < 1000; s++) for (let k = 0; k < 20; k++) {
    const r = K.crowdSeq('seed' + s + '#1#' + (s % 40), C, k, {});
    N++; if (r.kind === 'regular') { reg++; per[r.who] = (per[r.who] || 0) + 1; } else ok(r.look === C.crowd.passers[r.li], label + '：路人外觀＝C.crowd.passers[li]');
  }
  ok(Math.abs(reg / N - 0.65) < 0.02, label + '：熟客／路人＝0.65±0.02', reg / N);
  const W = ids.reduce((t2, id) => t2 + (+C.regulars[id].weight || 0), 0);
  for (const id of ids) ok(Math.abs((per[id] || 0) / reg - C.regulars[id].weight / W) < 0.02, label + '：' + id + ' 照權重', [(per[id] || 0) / reg, C.regulars[id].weight / W]);
  // 已在店裡的、60 秒內離開的、這一位的邀請者不抽
  const now = 1e6;
  for (let s = 0; s < 400; s++) for (let k = 0; k < 4; k++) {
    const ctx = { inside: [ids[s % ids.length]], left: { [ids[(s + 1) % ids.length]]: now - 59999, [ids[(s + 3) % ids.length]]: now - 60001 }, now, enc: ids[(s + 2) % ids.length], looks: [s % 4] };
    const r = K.crowdSeq('x' + s, C, k, ctx);
    if (r.kind === 'regular') {
      ok(r.who !== ctx.inside[0], label + '：已在店裡的不抽');
      ok(r.who !== ids[(s + 1) % ids.length], label + '：60 秒內離開的不抽');
      ok(r.who !== ctx.enc, label + '：這一位的邀請者不抽');
    } else ok(r.li !== s % 4, label + '：店裡路人正在用的外觀不抽');
  }
  // 60 秒以後可以再來
  let back = 0;
  for (let s = 0; s < 400; s++) { const r = K.crowdSeq('y' + s, C, 0, { left: { [ids[0]]: now - 60001 }, now }); if (r.who === ids[0]) back++; }
  ok(back > 0, label + '：離開滿 60 秒可以再抽', back);
  // 熟客全在店裡 → 只來路人；路人外觀全在用、熟客全在 → null
  const allIn = { inside: ids };
  for (let k = 0; k < 50; k++) eq(K.crowdSeq('z', C, k, allIn).kind, 'passer', label + '：熟客都在店裡＝只來路人');
  eq(K.crowdSeq('z', C, 0, { inside: ids, looks: [0, 1, 2, 3] }), null, label + '：沒人能來＝null');
  // 路人外觀全在用 → 改來熟客
  for (let k = 0; k < 50; k++) eq(K.crowdSeq('w', C, k, { looks: [0, 1, 2, 3] }).kind, 'regular', label + '：路人外觀都在用＝改來熟客');
  // boost（店裡空著開場小魚 ×2）
  if (C.regulars.xiaoyu) {
    let a = 0, b = 0;
    for (let s = 0; s < 3000; s++) { const r1 = K.crowdSeq('b' + s, C, 0, {}); const r2 = K.crowdSeq('b' + s, C, 0, { boost: { xiaoyu: 2 } }); if (r1.who === 'xiaoyu') a++; if (r2.who === 'xiaoyu') b++; }
    ok(b > a * 1.4, label + '：小魚 ×2 權重變多', [a, b]);
  }
  // 標題鍵：title#runs.length#當天種子鍵（不用 save.runSeq）；runs.length 不同 → 結果不同
  eq(K.titleTag(3, '2026-11-18'), 'title#3#2026-11-18', label + '：titleTag 格式');
  const seqOf = tag => Array.from({ length: 20 }, (_, k) => JSON.stringify(K.crowdSeq(tag, C, k, {})));
  ok(seqOf(K.titleTag(3, '2026-11-18')).join() !== seqOf(K.titleTag(4, '2026-11-18')).join(), label + '：runs.length 不同 → 推門序列不同');
  ok(seqOf(K.titleTag(3, '2026-11-18')).join() !== seqOf(K.titleTag(3, '2026-11-19')).join(), label + '：換一天 → 推門序列不同');
  eq(K.titleTag(3, '2026-11-18'), K.titleTag(3.9, '2026-11-18'), label + '：titleTag 吃整數');
}
section('LE13 crowdSeq：樣本名冊', () => checkSeq('樣本', SAMPLE_C));
section('LE13 crowdSeq：真名冊（content.js 有 C.regulars 才跑）', () => {
  if (!C0 || !C0.regulars || !Object.keys(C0.regulars).length) { notes.push('LE13 真名冊：content.js 還沒有 C.regulars（棒 3a 未交），只跑樣本'); return; }
  const P = C0.crowd && Array.isArray(C0.crowd.passers) && C0.crowd.passers.length === 4 ? C0.crowd.passers : SAMPLE_C.crowd.passers;
  if (P === SAMPLE_C.crowd.passers) notes.push('LE13 真名冊：C.crowd.passers 還不是 4 套，路人外觀用樣本');
  checkSeq('真名冊', { regulars: C0.regulars, crowd: Object.assign({}, C0.crowd || {}, { passers: P }) });
});
section('LE13 小工具：weighted／pickTable／pickRange／tripTag', () => {
  const T = [[0, 0.15], [1, 0.60], [2, 0.25]], cnt = [0, 0, 0];
  for (let i = 0; i < 4000; i++) cnt[K.pickTable(T, K.hash01('st' + i))]++;
  ok(Math.abs(cnt[0] / 4000 - 0.15) < 0.02 && Math.abs(cnt[1] / 4000 - 0.6) < 0.02, 'pickTable 照表', cnt);
  eq([K.pickRange([9000, 16000], 0), K.pickRange([9000, 16000], 0.5)], [9000, 12500], 'pickRange');
  eq(K.weighted([], () => 1, 0.5), null, 'weighted 空＝null');
  eq(K.weighted(['a', 'b'], x => (x === 'a' ? 0 : 1), 0), 'b', 'weighted 權重 0 的不挑');
  eq(K.tripTag({ seedKey: 'k', runNo: 3, pos: 9 }), 'k#3', 'tripTag＝seedKey#runNo（同一趟不同位一樣）');
  eq(K.titleDayTag('2026-11-18'), 'title#2026-11-18', 'titleDayTag');
});

// =====================================================================================================================
// LE14 停留點、互斥、清路（讀真 dip.json）
// =====================================================================================================================
const dip = JSON.parse(fs.readFileSync(path.join(LAB, 'shops', 'dip.json'), 'utf8'));
// §4.1 的形狀（dip.json 還沒有 crowd 段時的退路；座標照樣從 dip.json 取）
const SPEC_CROWD = {
  stops: [
    { id: 'c-rock', bin: 'rock', pose: 'dig' }, { id: 'c-soul', bin: 'soul', pose: 'dig' }, { id: 'c-citypop', bin: 'citypop', pose: 'dig' }, { id: 'c-world', bin: 'world', pose: 'dig' },
    { id: 'c-elec', bin: 'elec', pose: 'dig' }, { id: 'c-hiphop', bin: 'hiphop', pose: 'dig' }, { id: 'c-classical', bin: 'classical', pose: 'dig' }, { id: 'c-folk', bin: 'folk', pose: 'dig' },
    { id: 'c-listen', at: 'listen', kind: 'listen', short: true, guestClear: true },
    { id: 'c-pay', at: 'regular', kind: 'pay', back: true, short: true, hotPri: 3 }
  ],
  via: { left: 'in', right: 'leaving', cross: ['mid', 'leaving'] },
  guest: { in: ['in', 'frontleft', 'duelE'], out: ['frontleft', 'in', 'door', 'leave'] },
  door: 'door'
};
const CROWD = dip.crowd && Array.isArray(dip.crowd.stops) ? dip.crowd : SPEC_CROWD;
if (CROWD === SPEC_CROWD) notes.push('LE14：dip.json 還沒有 crowd 段（棒 1 未交），停留點用 §4.1 的形狀、座標照讀 dip.json');
const binStand = key => { const p = dip.props.find(q => q.bin && q.bin.key === key); return p && p.bin.stand; };
const STOPS = CROWD.stops.map(s => { const xy = s.bin ? binStand(s.bin) : dip.spots[s.at]; return Object.assign({ id: s.id, x: xy[0], y: xy[1], side: xy[0] < 140 ? 'left' : 'right', pose: s.pose || null, kind: s.kind || (s.bin ? 'dig' : null), back: !!s.back, short: !!s.short, guestClear: !!s.guestClear, hotPri: s.hotPri || 2 }); });
const SXY = Object.fromEntries(STOPS.map(s => [s.id, [s.x, s.y]]));
// shop.js＋shop-props.js（家具要先註冊，navObstacles 才有障礙；跟 check-shops loadLib 一樣的載法）
let DS = null;
try {
  DS = require(path.join(LAB, 'shop.js'));
  const sb = { window: { DipShop: DS }, console, Math, JSON, Object, Array, String, Number, Promise, RegExp, parseInt, parseFloat, isFinite };
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(LAB, 'shop-props.js'), 'utf8'), sb, { filename: 'shop-props.js' });
} catch (e) { DS = null; notes.push('shop.js／shop-props.js 載不起來（棒 1 可能正在改）：' + String(e.message).slice(0, 120)); }
const OBS = DS && DS.navObstacles ? DS.navObstacles(dip) : null;
function route(keys, from) {
  let cur = from || dip.spots.door; let pts = [cur];
  for (const k of keys) {
    const to = Array.isArray(k) ? k : (SXY[k] || dip.spots[k]);
    const r = DS.navRoute(dip, cur, to, OBS);
    if (!r) return null;
    pts = pts.concat(r.length && r[0][0] === cur[0] && r[0][1] === cur[1] ? r.slice(1) : r);
    cur = to;
  }
  return pts;
}
const touched = pts => STOPS.filter(s => K.onRoute(pts, [s.x, s.y])).map(s => s.id).sort();
const U = Array.from({ length: 200 }, (_, i) => (i + 0.5) / 200);

section('LE14 onRoute：幾何（線段對身體框 20×14，精確）', () => {
  ok(K.onRoute([[0, 0], [100, 0]], [50, 10]), '水平線從框內穿過');
  ok(!K.onRoute([[0, 0], [100, 0]], [50, 14]), 'dy＝14 剛好不算（開區間）');
  ok(K.onRoute([[0, 0], [100, 0]], [50, 13.9]), 'dy 13.9 算');
  ok(!K.onRoute([[0, 0], [100, 0]], [121, 0]), '線段結束在框外 1 格');
  ok(K.onRoute([[0, 0], [100, 0]], [119, 0]), '線段結束在框裡');
  ok(K.onRoute([[0, 0], [0, 100]], [19, 50]) && !K.onRoute([[0, 0], [0, 100]], [20, 50]), '垂直線 dx 19 算、20 不算');
  ok(K.onRoute([[0, 0], [100, 100]], [50, 50]) && !K.onRoute([[0, 0], [100, 100]], [80, 20]), '斜線');
  ok(K.onRoute([[0, 0], [100, 100]], [60, 40]), '斜線擦過框角');
  ok(K.onRoute([[5, 5]], [10, 10]) && !K.onRoute([[5, 5]], [30, 10]), '只有一點');
  ok(!K.onRoute([], [0, 0]) && !K.onRoute(null, [0, 0]) && !K.onRoute([[0, 0], [1, 1]], null), '空的不碰');
  ok(K.onRoute([[0, 0], [100, 0]], [50, 30], [20, 40]) && !K.onRoute([[0, 0], [100, 0]], [50, 30]), 'box 可換（[dx, dy]）');
  ok(K.onRoute([[0, 0], [100, 0]], { x: 50, y: 0 }), 'xy 可以是 {x,y}');
  // 跟取樣法（toolsF/final-routes.mjs：每 2 格一點）對拍：真路線 × 每個停留點
  if (DS) {
    const sample = (pts, step = 2) => { const out = []; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(d / step)); for (let k = 0; k <= n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]); } return out; };
    for (const keys of [['in', 'duelE'], ['leaving', 'c-pay'], ['in', 'frontleft', 'duelE'], ['mid', 'leaving', 'c-folk']]) {
      const pts = route(keys); const sm = sample(pts);
      for (const s of STOPS) { const a = K.onRoute(pts, [s.x, s.y]), b = sm.some(p => Math.abs(p[0] - s.x) < 20 && Math.abs(p[1] - s.y) < 14); ok(a === b || (a && !b), '精確法不比取樣法少抓：' + keys.join('→') + ' × ' + s.id, [a, b]); }
    }
  }
});

section('LE14 停留點互斥表＝§4.3（照 dip.json 座標算）', () => {
  eq(STOPS.map(s => s.id), ['c-rock', 'c-soul', 'c-citypop', 'c-world', 'c-elec', 'c-hiphop', 'c-classical', 'c-folk', 'c-listen', 'c-pay'], '十格');
  eq(STOPS.filter(s => s.side === 'left').map(s => s.id), ['c-rock', 'c-soul', 'c-citypop', 'c-world', 'c-listen'], '左排（x<140）');
  const X = K.exclusive(STOPS);
  const sorted = o => Object.fromEntries(Object.keys(o).sort().map(k => [k, o[k].slice().sort()]));
  eq(sorted(X), sorted({
    'c-rock': ['c-soul', 'c-listen'], 'c-soul': ['c-rock', 'c-citypop', 'c-listen'], 'c-citypop': ['c-soul', 'c-world', 'c-listen'], 'c-world': ['c-citypop'],
    'c-elec': ['c-hiphop'], 'c-hiphop': ['c-elec', 'c-classical'], 'c-classical': ['c-hiphop', 'c-folk'], 'c-folk': ['c-classical'],
    'c-listen': ['c-rock', 'c-soul', 'c-citypop'], 'c-pay': []
  }), '互斥表');
  // 一排最多兩人（窮舉）
  for (const side of ['left', 'right']) {
    const row = STOPS.filter(s => s.side === side && s.kind === 'dig');
    let best = 0;
    for (let m = 1; m < 1 << row.length; m++) { const pick = row.filter((_, i) => m >> i & 1); if (pick.every((a, i) => pick.every((b, j) => i === j || !K.clash(a, b)))) best = Math.max(best, pick.length); }
    eq(best, 2, side + ' 排翻箱的格最多同時兩人');
  }
  // pickStop 一直往店裡塞：任兩人不撞、一排不超過兩人
  for (let s = 0; s < 200; s++) {
    const occ = [];
    for (let i = 0; i < 6; i++) { const id = K.pickStop(STOPS, occ, [], null, null, K.hash01('fill' + s + '#' + i)); if (!id) break; occ.push(id); }
    ok(occ.every((a, i) => occ.every((b, j) => i === j || !K.clash(SXY[a], SXY[b]))), '塞滿：任兩人不撞', occ);
    for (const side of ['left', 'right']) ok(occ.filter(id => STOPS.find(t => t.id === id).side === side && STOPS.find(t => t.id === id).kind === 'dig').length <= 2, '塞滿：一排翻箱 ≤2', occ);
  }
  // c-pay 不撞任何格
  for (const s of STOPS) if (s.id !== 'c-pay') ok(!K.clash(SXY['c-pay'], [s.x, s.y]), 'c-pay 不撞 ' + s.id);
});

section('LE14 pickStop：你站 browse／pay 擋掉的格、occupied／reserved／likes／side', () => {
  const got = (occ, res, av, likes) => new Set(U.map(u => K.pickStop(STOPS, occ, res, av, likes, u)));
  let g = got([dip.spots.browse], []);
  ok(!g.has('c-classical') && !g.has('c-folk') && g.has('c-hiphop') && g.has('c-elec'), '你站 browse：擋掉 c-classical／c-folk', [...g]);
  g = got([dip.spots.pay], []);
  ok(!g.has('c-hiphop') && !g.has('c-classical') && !g.has('c-folk') && g.has('c-elec'), '你站 pay：擋掉 c-hiphop／c-classical／c-folk', [...g]);
  g = got([dip.spots.counter], []);
  ok(g.has('c-pay'), '老闆站 counter 不擋 c-pay（櫃檯前結帳）', [...g]);
  // 主線客人走路時 c-listen 保留（reserved 只排那一格本身）
  g = got([], ['c-listen']);
  ok(!g.has('c-listen') && g.has('c-rock') && g.has('c-soul') && g.has('c-citypop'), 'reserved c-listen：只排 c-listen 本身', [...g]);
  // occupied 用停留點 id：撞的格都不挑
  g = got(['c-soul'], []);
  ok(!g.has('c-soul') && !g.has('c-rock') && !g.has('c-citypop') && !g.has('c-listen') && g.has('c-world'), 'occupied c-soul：擋 c-rock／c-citypop／c-listen', [...g]);
  // 全部擋住 → null
  eq(K.pickStop(STOPS, [], STOPS.map(s => s.id), null, null, 0.3), null, '沒有空格＝null');
  eq(K.pickStop([], [], [], null, null, 0.3), null, '沒有停留點＝null');
  // 每一格都挑得到（rnd 掃一輪）
  g = got([], []);
  eq([...g].sort(), STOPS.map(s => s.id).sort(), '每一格都挑得到');
  // likes ×3：三格裡一格愛停 → 3/5
  const three = STOPS.filter(s => ['c-rock', 'c-elec', 'c-pay'].includes(s.id));
  let n3 = 0; for (const u of U) if (K.pickStop(three, [], [], null, ['c-elec'], u) === 'c-elec') n3++;
  ok(Math.abs(n3 / U.length - 0.6) < 0.02, '愛停的點 ×3', n3 / U.length);
  // 第二三位優先另一排 ×2：左 1 格、右 1 格 → 2/3
  const two = STOPS.filter(s => ['c-world', 'c-elec'].includes(s.id));
  let nR = 0; for (const u of U) if (K.pickStop(two, [], [], null, { ids: [], side: 'right' }, u) === 'c-elec') nR++;
  ok(Math.abs(nR / U.length - 2 / 3) < 0.02, '另一排 ×2', nR / U.length);
  // rnd 可以是函式；決定性
  eq(K.pickStop(STOPS, [], [], null, null, () => 0.42), K.pickStop(STOPS, [], [], null, null, 0.42), 'rnd 函式＝數字');
  // avoid 函式（clearDuel：頭被橫條切到的格不要）
  const T = dip.cameras.strip.y;
  g = got([], [], s => s.y - 48 < T && T < s.y);
  for (const id of g) ok(!(SXY[id][1] - 48 < T && T < SXY[id][1]), 'avoid 函式：頭會被切的格不挑', id);
});

section('LE14 清路：主線客人 in／out 只碰 c-listen、老闆去裁判碰右排三格、clearRoute 的候選格都不碰那條路', () => {
  if (!DS) { ok(false, 'shop.js 載不起來，清路測不了'); return; }
  const G = CROWD.guest || SPEC_CROWD.guest;
  const gIn = route(G.in, dip.spots.door), gOut = route(G.out, dip.spots.duelE);
  ok(gIn && gOut, '主線客人路線走得到');
  const clearIds = STOPS.filter(s => s.guestClear).map(s => s.id).sort();
  eq(clearIds, ['c-listen'], 'guestClear 的格＝c-listen');
  eq(touched(gIn), clearIds, 'crowd.guest.in 的身體框只碰 c-listen');
  eq(touched(gOut), clearIds, 'crowd.guest.out 的身體框只碰 c-listen');
  // 舊路（不走 frontleft）會穿過左排（提醒 guest 路線不能改回去）
  ok(touched(route(['in', 'duelE'])).length > 1, '舊路 door→in→duelE 會碰到左排（所以要走 frontleft）', touched(route(['in', 'duelE'])));
  const oRef = route(['ref'], dip.spots.counter);
  eq(touched(oRef), ['c-classical', 'c-folk', 'c-hiphop'], '老闆 counter→ref 碰 c-hiphop／c-classical／c-folk');
  const pDuel = route(['duelP'], dip.spots.browse);
  eq(touched(pDuel), ['c-folk'], '你 browse→duelP 碰 c-folk');
  const oSnack = route(['stSnack'], dip.spots.counter);
  ok(touched(oSnack).includes('c-elec') && touched(oSnack).includes('c-rock'), '宵夜：老闆 counter→stSnack 碰 c-elec、c-rock', touched(oSnack));
  // clearRoute：候選格都不碰那條路、而且不碰的格都挑得到
  for (const [name, pts] of [['guest.in', gIn], ['guest.out', gOut], ['counter→ref', oRef], ['browse→duelP', pDuel], ['counter→stSnack', oSnack]]) {
    const g = new Set(U.map(u => K.pickStop(STOPS, [], [], pts, null, u)));
    for (const id of g) ok(id && !K.onRoute(pts, SXY[id]), 'clearRoute ' + name + '：挑到的格不碰路', id);
    eq([...g].sort(), STOPS.filter(s => !K.onRoute(pts, [s.x, s.y])).map(s => s.id).sort(), 'clearRoute ' + name + '：不碰路的格都挑得到');
  }
  // 兩條一起清（clearDuel：老闆 counter→ref＋你→duelP）
  const g2 = new Set(U.map(u => K.pickStop(STOPS, [], [], [oRef, pDuel], null, u)));
  for (const id of g2) ok(!K.onRoute(oRef, SXY[id]) && !K.onRoute(pDuel, SXY[id]), 'clearDuel 兩條路都不碰', id);
  ok(!g2.has('c-folk') && !g2.has('c-hiphop') && !g2.has('c-classical'), 'clearDuel 不挑右排下三格', [...g2]);
  // avoid 物件形狀 { routes, box }
  const g3 = new Set(U.map(u => K.pickStop(STOPS, [], [], { routes: [gIn] }, null, u)));
  ok(!g3.has('c-listen'), 'avoid {routes}', [...g3]);
});

section('LE14 路線：左排走 in、右排走 leaving、跨排走上面，都不掉進唱盤區', () => {
  if (!DS) return;
  const V = CROWD.via || SPEC_CROWD.via;
  for (const s of STOPS) {
    const enter = route([s.side === 'left' ? V.left : V.right, s.id], dip.spots.door);
    ok(enter && Math.max(...enter.map(p => p[1])) <= 250, '進門 → ' + s.id + ' 不掉進唱盤區（y≤250）', enter && Math.round(Math.max(...enter.map(p => p[1]))));
    const exit = route([s.side === 'left' ? V.left : V.right, 'door'], [s.x, s.y]);
    ok(exit && Math.max(...exit.map(p => p[1])) <= 250, s.id + ' → 出門 y≤250');
  }
  for (const a of STOPS.filter(s => s.side === 'left')) for (const b of STOPS.filter(s => s.side === 'right')) {
    const r = route(V.cross.concat([b.id]), [a.x, a.y]);
    ok(r && Math.max(...r.map(p => p[1])) <= 250, '跨排 ' + a.id + '→' + b.id + ' 走上面', r && Math.round(Math.max(...r.map(p => p[1]))));
  }
});

// =====================================================================================================================
console.log('\n' + pass + ' passed, ' + fail + ' failed');
for (const n of notes) console.log('note: ' + n);
if (fail) { for (const f of fails) console.log('  FAIL ' + f); process.exit(1); }
