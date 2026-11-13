// game-lab/test/tutorial.test.mjs — 序章男子那場的引導教學 v4（SPEC-v4 §2.5.5、§2.2.10、§5.1 B2）
//   node game-lab/test/tutorial.test.mjs        # 有失敗 exit 1
// 用 content.js 的 C.tutorial、tutorial.js 的純邏輯（stepsFor／createRunner／matches…）與真引擎（startFight(run, C, {tutorial:true})）：
// 照教學的每一步餵 gate（跟 duel.js 送的一樣；v5 手風琴：點一張封面（疊著那排露出來的那一條）＝在那張打開 {kind:'card'} → 點屬性鈕＝丟 {kind:'throw'}；
//   再點打開那張、點手牌外面 {kind:'collapse'} 教學中一律不放行、也不罵；沒有 {kind:'spread'} 了），丟出去時 resolveTurn。
// 路線：三張王牌 × 特價箱 84 種挑法 × {照做、真的點（card 帶 at 座標）、點錯、看唱片資訊}，每條：
//   26 步照順序走完、每手 kind／toE／toP＝C.tutorial.expect、第 5 手剋不動（你 −(5−冷)）、第 6 手王牌 KO、前 5 手不 KO、學到 L1–L6、你沒倒。
//   手牌 5 張（FIXLIST 11；CFG.handSize）：每一手開手時你手上都是 5 張、要教的那張在手上；第 5 手手指指的（blockedChoice 最左）＝特價箱挑的第 2 張。男子的暗手照舊 3 張。
// 另外測：步驟資料（六手、字數、禁用字、目標名＝duel.js 的名字、allow、三角邊、小卡）、老闆說的話是真的、擋錯招（e2e #20 的純邏輯版）、
// 重掛（依 duel.n 接到那一手）、跳過、放手、重看教學的包包（禮物＋特價箱 c／o／h 或上次序章挑的三張）。
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const require = createRequire(import.meta.url);
const E = require(path.join(LAB, 'engine.js'));
const C = require(path.join(LAB, 'content.js'));
const TUT = require(path.join(LAB, 'tutorial.js'));

let pass = 0, fail = 0; const fails = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } return !!cond; }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); return ok(A === B, name, A + ' !== ' + B); }
function section(name, fn) { const f0 = fail; try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name); }

const T = C.tutorial;
const TIERS = ['hall', 'pearl', 'heresy'];
const ATTRS = ['c', 'o', 'h'];
const ZH = E.ZH, BEATS = E.BEATS;
const len = s => [...String(s)].length;
const POOL = C.bargain.pool.slice();
const COMBOS = [];
for (let a = 0; a < POOL.length; a++) for (let b = a + 1; b < POOL.length; b++) for (let c = b + 1; c < POOL.length; c++) COMBOS.push([POOL[a], POOL[b], POOL[c]]);
const IDS = ['m1', 'm2', 'm3', 'm4', 'm5', 'k0', 'k1', 'k2', 'k3', 'c0', 'c1', 'c2', 'c3', 'h0', 'h1', 'h2', 'h3', 'h4', 'b0', 'b1', 'b2', 'b3', 'b4', 'a1', 'a2', 'a3'];   // v5 教學（店主 11-12）：第 2–5 手前面加說明（讀提示）、第 3–5 手結算再講一次、第 4 手指相剋圖
const LEARN_AT = { m4: 'L1', k3: 'L2', c3: 'L3', h3: 'L4', b3: 'L5', a3: 'L6' };
const LEARNED = { L1: '同色比星數', L2: '冷門剋經典：大家都聽過的不稀奇', L3: '經典剋硬蕊：比不過名盤', L4: '硬蕊剋冷門：稀有不等於有料', L5: '差 2 星以上：剋不動', L6: '王牌 7 星，一場用一次' };   // §2.5.5；L2–L5 店主 11-12 改
const TRI = { k1: ['oc'], k2: ['oc'], c1: ['ch'], c2: ['ch'], h1: ['ho'], h2: ['ho'], h4: ['oc', 'ch', 'ho'], b1: ['oc'], b2: ['oc'] };

// 教學那場：跟 ui.js 一樣用 startFight(run, C, {tutorial:true})；包包＝老闆四張＋特價箱挑的三張（照挑的順序）
function tutDuel(tier, bargain, seedKey) {
  const run = E.newRun(C, { seedKey: seedKey || ('tut-' + tier), nightNo: 1, ace: tier, prologue: true });
  run.bag = C.gifts[tier].concat(bargain || POOL.filter(id => E.topAttr(C.cards[id]) === 'c').slice(0, 1).concat(POOL.filter(id => E.topAttr(C.cards[id]) === 'o').slice(0, 1), POOL.filter(id => E.topAttr(C.cards[id]) === 'h').slice(0, 1)));
  run.shop.bargainPicked = true;
  const r = E.startFight(run, C, { tutorial: true });
  return { run, duel: r.duel, events: r.events };
}
const actOf = pick => pick.i === 'ace' ? { ace: true } : { i: pick.i, attr: pick.attr };
const cardAt = (duel, i) => i === 'ace' ? duel.p.ace : duel.p.hand[i];
const idxOf = (duel, id) => duel.p.ace && duel.p.ace.id === id ? 'ace' : duel.p.hand.findIndex(c => c && c.id === id);
const axisOf = duel => E.aceAxis(duel.p.ace);
// duel.js 會送的 gate：點封面＝浮起（attr＝topAttr；王牌＝它那軸）、點屬性鈕＝丟、（API select(i,attr)）換預覽屬性
const cardAct = (duel, i) => { const c = cardAt(duel, i); return { kind: 'card', i, attr: i === 'ace' ? axisOf(duel) : E.topAttr(c), id: c.id }; };
const chipAct = (duel, i, attr) => { const c = cardAt(duel, i); return { kind: 'chip', i, attr: i === 'ace' ? axisOf(duel) : attr, id: c.id }; };
const shotAct = (duel, i, attr) => { const c = cardAt(duel, i); return { kind: 'throw', i, attr: i === 'ace' ? axisOf(duel) : attr, id: c.id }; };
// 這一手 pick 指的那一顆（{i, attr}）
function target(duel, pick) {
  if (pick === 'ace') return { i: 'ace', attr: axisOf(duel) };
  if (pick === 'blocked:o') return E.blockedChoice(duel, 'o');
  const i = idxOf(duel, pick.id); return i == null || i < 0 ? null : { i, attr: pick.attr };
}

// ---------------------------------------------------------------------------
// 一條路線（DOM 的順序：丟 → resolveTurn → 結算時講的步驟（盤面 hold）→ 分出勝負才 R.resolved → 下一手 handReady）
//   variant：'plain' 照手指點（點封面＝打開那張、點屬性鈕）｜'tap' 跟 duel.js 真的點一樣（card 帶 at 座標）｜'wrong' 每個操作步先點錯幾種｜'info' 每一步先開唱片資訊再關
function route(tier, bargain, variant = 'plain', o = {}) {
  const { run, duel } = tutDuel(tier, bargain, o.seedKey);
  const bargainOf = run.bag.slice(4);   // 特價箱挑的三張（照挑的順序）
  const R = TUT.createRunner(C, tier, duel, { engine: E });
  const out = { clashes: [], steps: [], blocked: 0, infoOk: 0, hpAfter: [], over: null, learnedAt: {}, hints: [] };
  const tag = tier + '/' + variant + '/' + (bargain || []).map(id => id.slice(0, 8)).join('+');
  const tryWrong = (a, why) => {
    const idx = R.idx, n = duel.n, st = R.state;
    const res = R.gate(a);
    ok(res === false, tag + ' ' + (R.cur() || {}).id + ' 擋住 ' + why, a);
    ok(R.idx === idx && R.state === st && duel.n === n, tag + ' 擋住後不前進 ' + why);
    ok(R.last && R.last.wrong === 'target', tag + ' 擋住時標記 wrong ' + why);
    out.blocked++;
  };
  const peek = () => {
    const idx = R.idx;
    ok(R.gate({ kind: 'info', where: 'e-rec' }) === true, tag + ' 看唱片資訊放行 ' + (R.cur() ? R.cur().id : '-'));
    ok(R.gate({ kind: 'close' }) === true, tag + ' 關唱片資訊放行');
    ok(R.idx === idx && R.state === 'run', tag + ' 看一眼唱片資訊不算完成、也不算錯');
    out.infoOk++;
  };
  let guard = 0;
  while (R.state === 'run' && guard++ < 60) {
    const s = R.begin(); if (!s) break;
    if (variant === 'info') peek();
    if (s.kind === 'say') {
      ok(!TUT.atResolve(s) || (out.clashes.length && s.hand === out.clashes.length), tag + ' ' + s.id + ' 結算時講的步驟只在剛結算完出現');
      if (variant === 'wrong') { tryWrong({ kind: 'card', i: 0, attr: 'o', id: duel.p.hand[0] && duel.p.hand[0].id }, '說明步點封面'); tryWrong({ kind: 'spread' }, '說明步送舊的 spread（v5 沒有了）'); }
      out.steps.push(s.id);
      if (s.learn) out.learnedAt[s.learn] = s.id;
      R.done();
      continue;
    }
    ok(s.kind === 'do', tag + ' ' + s.id + ' 只有說／做兩種');
    const al = s.allow || {};
    const want = target(duel, s.pick);
    ok(!!want, tag + ' ' + s.id + ' 手指指得到（' + JSON.stringify(s.pick) + '）');
    if (!al.throw) {
      eq(duel.p.hand.filter(Boolean).length, E.CFG.handSize, tag + ' ' + s.id + ' 第 ' + duel.n + ' 手：手上 ' + E.CFG.handSize + ' 張');
      eq(duel.e.hand.length, Math.min(3, T.plays.length - duel.n + 1), tag + ' ' + s.id + ' 男子的暗手 3 張（牌單剩不到 3 張時＝剩下的）');
      if (s.pick === 'blocked:o' && bargainOf) ok(want && want.i === 0 && duel.p.hand[0].id === bargainOf[1], tag + ' 第 5 手手指＝最左＝特價箱挑的第 2 張', { want, hand: duel.p.hand.map(c => c.id) });
    }
    if (!want) break;
    // 點手牌外面（收回）：教學中不放行、不算點錯、不前進
    { const idx = R.idx; ok(R.gate({ kind: 'collapse' }) === false && R.last.quiet === true && !R.last.wrong && R.idx === idx, tag + ' ' + s.id + ' 收回手牌：不放行、不罵'); }
    if (!al.throw) {                    // 點那一張（＝在那張打開）
      ok(TUT.isLift(s), tag + ' ' + s.id + ' 是點那張的步驟');
      if (variant === 'wrong') {
        const others = duel.p.hand.map((c, i) => i).filter(i => i !== want.i && duel.p.hand[i]);
        if (want.i !== 'ace' && duel.p.ace && !duel.p.aceUsed) tryWrong(cardAct(duel, 'ace'), '點王牌');
        if (others.length) { tryWrong(cardAct(duel, others[0]), '點別張的封面'); tryWrong(chipAct(duel, others[0], want.attr), '別張同色（API）'); }
        tryWrong(shotAct(duel, want.i, want.attr), '還沒浮起就丟');
      }
      const a = cardAct(duel, want.i);
      if (variant === 'tap') a.at = { x: 120, y: 560 };
      ok(R.gate(a) === true, tag + ' ' + s.id + ' 點手指那張（' + a.kind + '）', a);
      ok(R.last.final === true && R.state === 'run', tag + ' ' + s.id + ' 這步完成');
      out.steps.push(s.id);
      continue;
    }
    // 點那個屬性＝丟
    const p = R.pick;
    ok(p && p.i === want.i, tag + ' ' + s.id + ' 上一步點的就是手指那張', { p, want });
    if (variant === 'wrong') {
      const others = duel.p.hand.map((c, i) => i).filter(i => i !== want.i && duel.p.hand[i]);
      if (others.length) { tryWrong(cardAct(duel, others[0]), '丟之前換浮起別張'); tryWrong(shotAct(duel, others[0], want.attr), '丟別張'); }
      if (want.i !== 'ace') for (const a of ATTRS.filter(a => a !== want.attr)) tryWrong(shotAct(duel, want.i, a), '丟同張別色 ' + a);
      tryWrong({ kind: 'spread' }, '點屬性那步送舊的 spread');
    }
    out.hints.push(E.view(duel).hint.line);
    const plan = duel.plan;
    ok(R.gate(shotAct(duel, want.i, want.attr)) === true, tag + ' ' + s.id + ' 點屬性鈕＝丟');
    ok(R.last.commit === true && R.awaiting === true, tag + ' ' + s.id + ' 丟出去＝等結算');
    out.steps.push(s.id);
    if (s.learn) out.learnedAt[s.learn] = s.id;
    const act = actOf(want);
    const pv = E.preview(duel, act, { i: plan.idx, attr: plan.attr });
    const evs = E.resolveTurn(duel, act, {});
    const cl = evs.find(e => e.t === 'clash');
    if (!ok(!!cl, tag + ' 引擎收了第 ' + (out.clashes.length + 1) + ' 手', act)) break;
    out.clashes.push(cl);
    ok(pv.kind === cl.kind && pv.toE === cl.toE && pv.toP === cl.toP && pv.blocked === cl.blocked, tag + ' 第 ' + cl.n + ' 手：預告＝結算', { pv, cl });
    out.hpAfter.push([duel.p.hp, duel.e.hp]);
    // 盤面 hold 住，講結算時的步驟
    while (R.state === 'run' && TUT.atResolve(R.cur())) { const s2 = R.begin(); if (variant === 'info') peek(); out.steps.push(s2.id); if (s2.learn) out.learnedAt[s2.learn] = s2.id; R.done(); }
    const over = evs.find(e => e.t === 'over');
    if (over) { R.resolved(evs); out.over = over; break; }
    R.handReady();
  }
  out.learned = R.learnedIds.slice();
  out.state = R.state;
  out.duel = duel;
  out.tag = tag;
  return out;
}

// ---------------------------------------------------------------------------
section('C.tutorial：聲望 18、六手課表、劇本（他出的牌與色、提示、手牌）、三王牌的 expect', () => {
  eq(T.hp, 18, '教學場聲望 18');
  eq(C.enemies.man.hp, 10, '男子本身 10（直接開打）');
  eq(T.lessons, ['mirror', 'oc', 'ch', 'ho', 'block', 'ace'], '課表：比星數、冷剋經、經剋硬、硬剋冷、差 2 星剋不動、王牌');
  eq(T.plays.map(p => p.attr), ['c', 'c', 'h', 'o', 'c', 'c'], '他出 經→經→硬→冷→經→經');
  eq(T.hints, ['c5', 'c2', 'h2', 'o2', 'c4', 'c2'], '提示句照 §2.2.10');
  for (const t of TIERS) {
    const s = T.script[t];
    eq([...s.hand, ...s.draw].sort(), [...C.gifts[t]].sort(), t + ' 起手＋抽牌＝老闆四張');
    eq(s.pick.length, 6, t + ' pick 6 手');
    eq(s.hand.length + s.draw.length, 4, t + ' 劇本起手＋抽牌＝四張（第 5 張是特價箱挑的第 1 張）');
    eq(s.pick.slice(0, 4).map(p => p.id), [...s.hand, ...s.draw], t + ' 劇本的四張照出牌順序排（第 k 手出第 k 格）');
    const { run, duel, events } = tutDuel(t);
    eq([duel.e.hp, duel.p.hp], [18, E.CFG.playerHp], t + ' startFight(tutorial)：他 18、你 ' + E.CFG.playerHp);
    eq(duel.e.hand.length && duel.plan && duel.plan.attr, 'c', t + ' 第一手他打算出經典');
    eq(E.CFG.handSize, 5, '手牌 5 張（FIXLIST 11）');
    eq([E.CFG.enemyHand, duel.e.hand.length], [3, 3], t + ' 男子的暗手 3 張（CFG.enemyHand）');
    eq(duel.p.hand.map(c => c.id), s.hand.concat(run.bag.slice(4)).slice(0, E.CFG.handSize), t + ' 起手照劇本：四張＋特價箱挑的第 1 張');
    eq(duel.p.ace.id, C.aces[t], t + ' 王牌');
    ok(events.length && events[0].t === 'hand' && events[0].n === 1 && events[0].hint.line === 'c5', t + ' 開場事件 hand 1、提示 c5');
  }
  const run = E.newRun(C, { seedKey: 'skip', nightNo: 1, ace: 'pearl', prologue: true });
  const r = E.startFight(run, C, {});
  eq(r.duel.e.hp, 10, '直接開打：男子 10');
  eq(r.duel.script, null, '直接開打：沒有劇本');
});

// ---------------------------------------------------------------------------
const duelSrc = fs.readFileSync(path.join(LAB, 'duel.js'), 'utf8');
const tutSrc = fs.readFileSync(path.join(LAB, 'tutorial.js'), 'utf8');
// 目標名：duel.js 的 data-tut 名或 elByName 認得的前綴；'tile:' 是 tutorial.js 自己的前綴（那顆所在的整格）
function nameKnown(n) {
  if (n.startsWith('tile:')) return tutSrc.includes("'tile:'") && nameKnown(n.slice(5));
  for (const pre of ['chip:id:', 'chip:blocked:', 'card:id:', 'card:blocked:', 'chip:best:', 'card:best:']) if (n.startsWith(pre)) return duelSrc.includes("'" + pre + "'") || duelSrc.includes("startsWith('" + pre);
  return duelSrc.includes('data-tut="' + n + '"') || duelSrc.includes("'" + n + "'") || duelSrc.includes('"' + n + '"') || new RegExp('data-tut="\\$\\{isAce \\? \'' + n + '\'').test(duelSrc);
}
section('步驟資料：26 步、六手、≤25 字、禁用字、目標名＝duel.js、allow、三角邊、小卡 L1–L6', () => {
  const steps = T.steps;
  eq(steps.map(s => s.id), IDS, '26 步照順序');
  const FORBID = /——|—|派對|櫃台|卡片資訊|氣勢|輾壓|賭注|相生|割捨|七星回擊|霸權|點播|配件|脾氣|急了|看穿/;
  for (const s of steps) {
    const texts = typeof s.text === 'object' ? Object.values(s.text) : [s.text];
    ok(s.spread == null, s.id + ' 沒有 spread（v5 手風琴：沒有「點牌堆攤開」）');
    for (const t of texts) {
      ok(typeof t === 'string' && t.length > 0, s.id + ' 有台詞');
      ok(len(t) <= 25, s.id + ' ≤25 字（' + len(t) + '）：' + t);
      ok(!FORBID.test(t), s.id + ' 沒有禁用字：' + t);
      ok(!/[經冷硬](?![典門蕊])/.test(t.replace(/剋/g, '')) || /經典|冷門|硬蕊/.test(t), s.id + ' 屬性寫全名：' + t);
    }
    ok(s.tag === '新', s.id + ' tag 新');
    ok(['say', 'do'].includes(s.kind), s.id + ' 說或做');
    if (s.tri) eq(s.tri, TRI[s.id], s.id + ' 三角亮邊');
    else ok(!TRI[s.id], s.id + ' 要亮三角');
    if (s.kind === 'do') ok(s.allow && s.allow.pick === true && Object.keys(s.allow).every(k => k === 'pick' || k === 'throw'), s.id + ' 做的步驟：點那張（allow.pick）或點那個屬性＝丟（allow.pick＋throw）');
  }
  eq(steps.find(s => s.id === 'm2').text, '先出這張：點一下。', '第 1 手點那張那步：「先出這張：點一下。」（v5：點疊著那排露出來的那一條就打開）');
  ok(!steps.some(s => /攤開/.test(typeof s.text === 'object' ? Object.values(s.text).join('') : s.text)), '教學沒有一句說「攤開」');
  eq(Object.fromEntries(steps.filter(s => s.learn).map(s => [s.id, s.learn])), LEARN_AT, '學會的小卡在 m4／k3／c3／h3／b3／a3');
  eq(T.learned, LEARNED, '小卡 L1–L6＝§2.5.5');
  for (const v of Object.values(T.learned)) ok(len(v) <= 16 && !/霸權|配件/.test(v), '小卡 ≤16 字、沒有禁用字：' + v);
  eq(Object.keys(T.ui).sort(), ['learnedPrefix', 'learnedTitle', 'replay', 'skipTut', 'who', 'wrong'], 'ui 只剩用得到的鍵');
  for (const [k, v] of Object.entries(T.ui)) ok(len(v) <= 18, 'ui.' + k + ' ≤18');
  eq(T.ui.wrong, '先點我指的這裡。', '點錯的那句（e2e #20）');
  for (const t of TIERS) {
    const S = TUT.stepsFor(C, t), pick = T.script[t].pick;
    eq(S.map(s => s.hand), [1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6], t + ' 每步屬於第幾手');
    for (let h = 1; h <= 6; h++) eq(S.filter(s => s.hand === h && s.allow && s.allow.throw).length, 1, t + ' 第 ' + h + ' 手剛好一個「丟」');
    for (const s of S) {
      for (const n of [...(s.target || []), ...(s.point ? [s.point] : []), ...(s.look || []), ...(s.keep || [])]) {
        ok(n !== 'pick' && n !== 'tile:pick', t + ' ' + s.id + ' pick 都代入了：' + n);
        ok(nameKnown(n), t + ' ' + s.id + ' 目標名在 duel.js 裡：' + n);
      }
      const p = pick[s.hand - 1];
      if (s.kind === 'do' && !s.allow.throw) {        // 點那張（疊著時 tutorial.js 先指 'hand'）
        ok(TUT.isLift(s), t + ' ' + s.id + ' isLift');
        if (p === 'ace') { eq(s.allow, { ace: true }, t + ' ' + s.id + ' 第 6 手只放行王牌'); eq([s.target, s.point], [['card-ace'], 'card-ace'], t + ' ' + s.id + ' 洞＝王牌封面、手指指它'); }
        else if (p === 'blocked:o') { eq(s.allow, { card: { blocked: 'o' } }, t + ' ' + s.id + ' 第 5 手只放行 blockedChoice 那張'); eq([s.target, s.point], [['card:blocked:o'], 'card:blocked:o'], t + ' ' + s.id + ' 手指 card:blocked:o'); }
        else { eq(s.allow, { card: { id: p.id } }, t + ' ' + s.id + ' 只放行 pick 那張'); eq([s.target, s.point], [['card:id:' + p.id], 'card:id:' + p.id], t + ' ' + s.id + ' 洞＝那張封面、手指指它'); }
      }
      if (s.kind === 'do' && s.allow.throw) {         // 點那個屬性＝丟
        ok(!TUT.isLift(s) && TUT.isCommit(s), t + ' ' + s.id + ' isCommit');
        if (p === 'ace') { eq(s.allow, { throw: true, ace: true }, t + ' ' + s.id + ' 只放行王牌那顆'); eq([s.target, s.point, s.look], [['chip-ace'], 'chip-ace', ['card-ace']], t + ' ' + s.id + ' 洞＝王牌那顆、看得到王牌'); }
        else if (p === 'blocked:o') { eq(s.allow, { throw: true, chip: { blocked: 'o' } }, t + ' ' + s.id + ' 只放行 blockedChoice 那張的冷門'); eq([s.target, s.point, s.look], [['chip:blocked:o'], 'chip:blocked:o', ['card:blocked:o']], t + ' ' + s.id + ' 手指 chip:blocked:o'); }
        else { eq(s.allow, { throw: true, chip: { id: p.id, attr: p.attr } }, t + ' ' + s.id + ' 只放行那張那色'); eq([s.target, s.point, s.look], [['chip:id:' + p.id + ':' + p.attr], 'chip:id:' + p.id + ':' + p.attr, ['card:id:' + p.id]], t + ' ' + s.id + ' 洞＝那顆屬性鈕、看得到那張'); }
      }
    }
    eq(S.find(s => s.id === 'a3').text, T.steps.find(s => s.id === 'a3').text[t], t + ' a3 用這張王牌的那句');
  }
});

// ---------------------------------------------------------------------------
section('老闆說的話是真的：提示、點破的關鍵字、三相剋、剋中扣你那顆星、剋不動、王牌 7 星', () => {
  const hint = id => C.hints[id[0]].find(h => h.id === id);
  ok(T.steps.find(s => s.id === 'm1').target.includes('e-hint'), 'm1 指著提示句');
  const key1 = hint(T.hints[0]).key;
  ok(T.steps.find(s => s.id === 'm5').text.includes('『' + key1 + '』就是' + ZH[T.plays[0].attr]), 'm5 點破的關鍵字＝第 1 手提示句的 key（' + key1 + '）＋他出的色');
  ok(T.steps.find(s => s.id === 'b0').text.includes(hint(T.hints[4]).key), 'b0「這次是真正的大名盤」＝第 5 手提示句的 key');
  for (const [id, h] of [['k0', 1], ['c0', 2], ['h0', 3]]) ok(T.steps.find(s => s.id === id).text.startsWith('『' + hint(T.hints[h]).key + '』'), id + ' 說明點破第 ' + (h + 1) + ' 手提示句的 key（' + hint(T.hints[h]).key + '）');
  for (const id of ['k0', 'c0', 'h0', 'b0']) ok(T.steps.find(s => s.id === id).target.includes('e-hint'), id + ' 指著提示句');
  ok(T.steps.find(s => s.id === 'h4').target.includes('tri') && TUT.atResolve(T.steps.find(s => s.id === 'h4')), 'h4 指相剋圖、結算時講');
  eq(hint(T.hints[4]).key, key1, '第 5 手的關鍵字跟第 1 手點破的一樣（又是）');
  eq([BEATS.o, BEATS.c, BEATS.h], ['c', 'h', 'o'], '冷剋經、經剋硬、硬剋冷');
  ok(T.steps.find(s => s.id === 'k3').text.includes('冷門剋經典') && T.plays[1].attr === 'c', 'k3 冷門剋經典，他第 2 手出經典');
  ok(T.steps.find(s => s.id === 'c3').text.startsWith('經典剋硬蕊') && T.plays[2].attr === 'h', 'c3 經典剋硬蕊，他第 3 手出硬蕊');
  ok(T.steps.find(s => s.id === 'h3').text.startsWith('硬蕊剋冷門') && T.plays[3].attr === 'o', 'h3 硬蕊剋冷門，他第 4 手出冷門');
  for (const t of TIERS) {
    const r = route(t, null);
    const [c1, c2, , , c5, c6] = r.clashes;
    ok(c1.pAttr === c1.eAttr && c1.kind === 'mirrorWin', t + ' m4「同色就比星數，多的扣差額」：第 1 手同色、比星', c1);
    eq(c1.toE, c1.pStar - c1.eStar, t + ' m4 多的扣差額');
    ok(c2.kind === 'counter' && c2.toE === c2.pStar, t + ' k3「剋中：用你那顆星扣他」', c2);
    ok(c5.kind === 'mirrorLose' && c5.blocked === 'gap' && c5.eStar - c5.pStar >= 2 && c5.toP === c5.eStar - c5.pStar, t + ' b3／b4「他高你 2 星以上，戳不動」「剋不動，就改比星數」', c5);
    eq(c6.pStar, 7, t + ' a1「王牌：7 星」');
    eq(E.CFG.aceStar, 7, '王牌 7 星');
  }
  const a3 = T.steps.find(s => s.id === 'a3').text;
  const hall = route('hall', null).clashes[5], pearl = route('pearl', null).clashes[5], heresy = route('heresy', null).clashes[5];
  ok(hall.kind === 'mirrorWin' && hall.pAttr === hall.eAttr && a3.hall.includes(hall.pStar + ' 比 ' + hall.eStar) && a3.hall.includes('−' + hall.toE), '殿堂 a3：' + a3.hall, hall);
  ok(pearl.kind === 'counter' && a3.pearl.includes('−' + pearl.toE) && a3.pearl.startsWith(ZH[pearl.pAttr] + '剋' + ZH[pearl.eAttr]), '流亡 a3：' + a3.pearl, pearl);
  ok(heresy.kind === 'mirrorWin' && heresy.by === 'e' && heresy.blocked && a3.heresy.startsWith(ZH[heresy.eAttr] + '剋' + ZH[heresy.pAttr]) && a3.heresy.includes('−' + heresy.toE), '異端 a3（COPY-04：跟另外兩種一樣寫出扣多少）：' + a3.heresy, heresy);
});

// ---------------------------------------------------------------------------
section('三王牌 × 特價箱 84 種挑法 × {照做、真的點、點錯、看唱片資訊}：26 步走完、每手＝expect、第 6 手 KO、學到 L1–L6', () => {
  eq(COMBOS.length, 84, '特價箱 9 張挑 3＝84 種');
  let n = 0;
  for (const t of TIERS) for (let k = 0; k < COMBOS.length; k++) {
    for (const variant of ['plain', 'tap', 'wrong', 'info']) {
      // 挑的順序也換一換（照挑的順序抽）
      const combo = k % 2 ? COMBOS[k].slice().reverse() : COMBOS[k];
      const r = route(t, combo, variant, { seedKey: 'tut-' + t + '-' + k });
      const exp = T.expect[t];
      n++;
      eq(r.steps, IDS, r.tag + ' 26 步照順序');
      eq(r.clashes.length, 6, r.tag + ' 打 6 手');
      r.clashes.forEach((cl, h) => {
        const x = exp[h];
        ok(cl.kind === x.kind && (x.toE == null || cl.toE === x.toE) && (h === 4 || cl.toP === x.toP) && (x.blocked == null || cl.blocked === x.blocked), r.tag + ' 第 ' + (h + 1) + ' 手＝expect', { cl: { kind: cl.kind, toE: cl.toE, toP: cl.toP, blocked: cl.blocked }, x });
        eq(cl.eCard.id, T.plays[h].id, r.tag + ' 第 ' + (h + 1) + ' 手他出的牌照劇本');
      });
      const c5 = r.clashes[4];
      ok(c5 && combo.includes(c5.pCard.id) && c5.pAttr === 'o' && c5.pStar <= 3 && c5.toP === 5 - c5.pStar, r.tag + ' 第 5 手：特價箱那張冷 ≤3 → 剋不動、你 −(5−冷)', c5);
      eq(r.hints, T.hints, r.tag + ' 每手提示句照劇本');
      ok(r.hpAfter.slice(0, 5).every(([, eh]) => eh > 0), r.tag + ' 前 5 手不 KO');
      ok(r.over && r.over.win === true && r.over.by === 'hp' && r.clashes.length === 6, r.tag + ' 第 6 手王牌 KO', r.over);
      ok(r.clashes[5].ace === true, r.tag + ' 第 6 手丟的是王牌');
      ok(r.hpAfter.every(([ph]) => ph > 0), r.tag + ' 你沒倒');
      eq(r.state, 'done', r.tag + ' 教學完成');
      eq(r.learned, ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'], r.tag + ' 六張小卡照順序');
      eq(r.learnedAt, Object.fromEntries(Object.entries(LEARN_AT).map(([k, v]) => [v, k])), r.tag + ' 小卡在對的步驟學到');
      if (variant === 'wrong') ok(r.blocked >= 40, r.tag + ' 點錯都被擋（' + r.blocked + ' 次）');
      if (variant === 'info') ok(r.infoOk >= 18, r.tag + ' 每一步都能看唱片資訊（' + r.infoOk + ' 次）');
    }
  }
  eq(n, 3 * 84 * 4, '路線數 3 王牌 × 84 種 × 4 種點法');
});

// ---------------------------------------------------------------------------
section('擋錯招（e2e #20 的純邏輯版）：第 1 手點別張／王牌、點同張別色、第 5 手點不是 blockedChoice 的那張 → 不前進、標 wrong；收回手牌不罵', () => {
  for (const t of TIERS) {
    const { duel } = tutDuel(t);
    const R = TUT.createRunner(C, t, duel, { engine: E });
    R.begin(); R.done();                                   // m1
    eq(R.cur().id, 'm2', t + ' 到 m2');
    R.begin();
    const w = target(duel, T.script[t].pick[0]);
    for (const a of [cardAct(duel, (w.i + 1) % duel.p.hand.length), cardAct(duel, 'ace'), chipAct(duel, (w.i + 1) % duel.p.hand.length, 'c'), shotAct(duel, w.i, 'c')])
      eq(R.gate(a), false, t + ' m2 擋 ' + JSON.stringify(a));
    eq([R.cur().id, duel.n, R.state], ['m2', 1, 'run'], t + ' 被擋後還在 m2、引擎第 1 手');
    eq(R.last.wrong, 'target', t + ' 標 wrong');
    eq([R.gate({ kind: 'collapse' }), R.last.quiet, R.cur().id], [false, true, 'm2'], t + ' 收回手牌：不放行、不罵');
    eq([R.gate({ kind: 'spread' }), R.cur().id], [false, 'm2'], t + ' m2 舊的 spread：擋、還在 m2');
    ok(R.gate(cardAct(duel, w.i)) && R.cur().id === 'm3', t + ' m2 點那張 → m3');
    R.begin();
    for (const a of ATTRS.filter(a => a !== w.attr).map(a => shotAct(duel, w.i, a)).concat([cardAct(duel, (w.i + 1) % duel.p.hand.length), { kind: 'spread' }]))
      eq(R.gate(a), false, t + ' m3 擋 ' + JSON.stringify(a));
    eq(R.cur().id, 'm3', t + ' 被擋後還在 m3');
    // 等結算時點封面／屬性／手牌：擋；看唱片資訊：放行
    R.gate(shotAct(duel, w.i, w.attr));
    ok(R.awaiting, t + ' 丟出去之後在等結算');
    eq(R.gate(chipAct(duel, 0, 'c')), false, t + ' 等結算時點屬性：擋');
    eq(R.gate(cardAct(duel, 0)), false, t + ' 等結算時點封面：擋');
    eq(R.gate({ kind: 'collapse' }), false, t + ' 等結算時收回手牌：擋');
    eq(R.gate({ kind: 'info', where: 'slot-e' }), true, t + ' 等結算時看唱片資訊：放行');
  }
  // 第 5 手：手牌三張特價箱都冷 ≤3（都會剋不動），手指只指 blockedChoice 那張（最左）
  const { duel } = tutDuel('pearl', [POOL[0], POOL[3], POOL[6]]);
  for (let h = 0; h < 4; h++) { const p = target(duel, T.script.pearl.pick[h]); E.resolveTurn(duel, actOf(p), {}); }
  eq(duel.n, 5, '第 5 手');
  const R5 = TUT.createRunner(C, 'pearl', duel, { engine: E });
  eq(R5.cur().id, 'b0', '重掛在 b0（第 5 手的說明）');
  R5.begin(); R5.done();
  eq(R5.cur().id, 'b1', '說明講完到 b1');
  R5.begin();
  const b = E.blockedChoice(duel, 'o');
  ok(b && b.i === 0, 'blockedChoice＝最左那張', b);
  eq(R5.gate(cardAct(duel, 1)), false, 'b1 點別張：擋');
  eq(R5.gate(cardAct(duel, 0)), true, 'b1 點 blockedChoice 那張：放行');
  R5.begin();
  eq(R5.cur().id, 'b2', '到 b2');
  eq(R5.gate(shotAct(duel, 0, 'c')), false, 'b2 那張的經典：擋');
  eq(R5.gate(shotAct(duel, 1, 'o')), false, 'b2 別張的冷門：擋');
  eq(R5.gate(shotAct(duel, 0, 'o')), true, 'b2 那張的冷門：放行（丟）');
});

// ---------------------------------------------------------------------------
section('重掛：依 duel.n 接到那一手（1 m1、2 k0、3 c0、4 h0、5 b0、6 a1），前面的小卡算學過、不飛', () => {
  const firstOf = { 1: 'm1', 2: 'k0', 3: 'c0', 4: 'h0', 5: 'b0', 6: 'a1' };
  const before = { 1: [], 2: ['L1'], 3: ['L1', 'L2'], 4: ['L1', 'L2', 'L3'], 5: ['L1', 'L2', 'L3', 'L4'], 6: ['L1', 'L2', 'L3', 'L4', 'L5'] };
  for (const t of TIERS) {
    const { duel } = tutDuel(t);
    for (let h = 1; h <= 6; h++) {
      const R = TUT.createRunner(C, t, duel, { engine: E });
      eq(R.cur() && R.cur().id, firstOf[h], t + ' n=' + h + ' → ' + firstOf[h]);
      eq(R.learnedIds, before[h], t + ' n=' + h + ' 前面的小卡算學過');
      eq(R.learnQ, [], t + ' n=' + h + ' 重掛不飛小卡');
      if (h === 6) break;
      E.resolveTurn(duel, actOf(target(duel, T.script[t].pick[h - 1])), {});
    }
    const steps = TUT.stepsFor(C, t);
    for (let h = 1; h <= 6; h++) eq(steps[TUT.stepForHand(steps, h)].id, firstOf[h], t + ' stepForHand(' + h + ')');
    eq(TUT.stepForHand(steps, 7), steps.length, t + ' stepForHand(7)＝結束');
    eq(TUT.createRunner(C, t, duel, { engine: E, from: 2 }).cur().id, 'k0', t + ' from 可以指定那一手');
  }
});

// ---------------------------------------------------------------------------
section('跳過、放手、輸了：狀態、gate 全放行', () => {
  const { duel } = tutDuel('pearl');
  const R = TUT.createRunner(C, 'pearl', duel, { engine: E });
  R.skip();
  eq(R.state, 'skipped', 'skip → skipped');
  eq(R.gate({ kind: 'chip', i: 2, attr: 'h', id: 'x' }), true, '跳過之後 gate 全放行');
  ok(!('forcedAttr' in R), 'v3 的 forcedAttr 拿掉了（他出什麼由引擎的 script 決定）');
  R.skip(); eq(R.state, 'skipped', '再 skip 一次不變');
  const R2 = TUT.createRunner(C, 'hall', tutDuel('hall').duel, { engine: E });
  R2.release(); eq(R2.state, 'released', 'release → released');
  const R3 = TUT.createRunner(C, 'hall', tutDuel('hall').duel, { engine: E });
  R3.resolved([{ t: 'clash' }, { t: 'over', win: false, by: 'hp' }]);
  eq(R3.state, 'released', '教學中輸了 → 放手（不會發生，但要收得乾淨）');
  const R4 = TUT.createRunner(C, 'hall', tutDuel('hall').duel, { engine: E });
  R4.resolved([{ t: 'over', win: true, by: 'hp' }]);
  eq([R4.state, R4.learnedIds], ['done', ['L1', 'L2', 'L3', 'L4', 'L5', 'L6']], '教學中贏了 → 完成、小卡全學到');
  R.resolved([{ t: 'over', win: true }]); eq(R.state, 'skipped', '跳過之後的結算不改狀態');
  // 跳過之後自由打：引擎照劇本出牌，隨便打也打得完
  const d = tutDuel('heresy').duel;
  const rr = E.makeRng(5);
  for (let g = 0; g < 12 && !d.over; g++) E.resolveTurn(d, E.policies.thoughtful(d, rr, {}, C), {});
  ok(!!d.over, '跳過之後自由打得完', d.over);
});

// ---------------------------------------------------------------------------
section('matches／chipOk：點那張認 id／blocked／ace；點屬性（丟）要是那張那色', () => {
  const { duel } = tutDuel('hall');
  const R = TUT.createRunner(C, 'hall', duel, { engine: E });
  const ctx = R.context();
  const S = TUT.stepsFor(C, 'hall');
  const k1 = S.find(s => s.id === 'k1'), k2 = S.find(s => s.id === 'k2'), m2 = S.find(s => s.id === 'm2'), m3 = S.find(s => s.id === 'm3');
  const kf = 'nick-drake-bryter-layter', low = 'daft-punk-random-access-memories';   // 店主 11-13：殿堂那組換成有名的（第 1 手 Random Access Memories、第 2 手 Bryter Layter）
  const iKF = idxOf(duel, kf), iLow = idxOf(duel, low);
  ok(TUT.matches(m2, cardAct(duel, iLow), ctx), 'm2 點 Random Access Memories 的封面：放行');
  ok(!TUT.matches(m2, cardAct(duel, iKF), ctx), 'm2 點別張：擋');
  ok(!TUT.matches(m2, shotAct(duel, iLow, 'c'), ctx), 'm2 還沒浮起就丟：擋');
  eq(E.topAttr(C.cards[kf]), 'c', 'Bryter Layter 的 topAttr 是經典');
  ok(TUT.matches(k1, cardAct(duel, iKF), ctx), 'k1 點 Bryter Layter 的封面（不管 topAttr）：放行');
  ok(TUT.matches(k2, shotAct(duel, iKF, 'o'), ctx), 'k2 點 Bryter Layter 的冷門：放行');
  ok(!TUT.matches(k2, shotAct(duel, iKF, 'c'), ctx), 'k2 點 Bryter Layter 的經典（topAttr）：擋');
  ok(!TUT.matches(m3, shotAct(duel, iKF, 'c'), ctx), 'm3 丟別張：擋');
  ok(TUT.matches(m3, shotAct(duel, iLow, 'c'), ctx), 'm3 丟 Random Access Memories 的經典：放行');
  ok(TUT.matches({ allow: { ace: true } }, { kind: 'card', i: 'ace', attr: 'c', id: C.aces.hall }, ctx), 'allow.ace：點王牌封面');
  ok(TUT.matches({ allow: { throw: true, ace: true } }, { kind: 'throw', i: 'ace', attr: 'c', id: C.aces.hall }, ctx) && !TUT.matches({ allow: { throw: true, ace: true } }, shotAct(duel, 0, 'c'), ctx), 'allow throw＋ace：只丟王牌');
  ok(!TUT.matches({ allow: { ace: true } }, cardAct(duel, 0), ctx), 'allow.ace：點別張擋');
  const bk = { o: { i: 2, attr: 'o' } };
  ok(TUT.matches({ allow: { card: { blocked: 'o' } } }, cardAct(duel, 2), Object.assign({}, ctx, { blocked: bk })) && !TUT.matches({ allow: { card: { blocked: 'o' } } }, cardAct(duel, 1), Object.assign({}, ctx, { blocked: bk })), 'allow.card.blocked：只認 blockedChoice 那張');
  ok(!TUT.matches({ allow: { card: { blocked: 'o' } } }, cardAct(duel, 2), Object.assign({}, ctx, { blocked: { c: null, o: null, h: null } })), 'blocked 沒有那張：擋');
  ok(!TUT.matches({ allow: { throw: true, chip: { blocked: 'o' } } }, shotAct(duel, 0, 'o'), Object.assign({}, ctx, { blocked: { c: null, o: null, h: null } })), 'blocked 沒有那張：丟也擋');
  ok(!TUT.matches(m2, { kind: 'info', where: 'e-rec' }, ctx), '沒有 allow.info 的步驟：看唱片資訊不算完成這步');
  ok(!TUT.matches(m2, { kind: 'spread' }, ctx) && TUT.isLift(m2) && !TUT.isLift(m3), 'spread 不放行（v5 沒有了）；m2 是點那張的步驟');
  ok(!TUT.matches(null, chipAct(duel, 0, 'o'), ctx) && !TUT.matches(m2, null, ctx), 'null 安全');
  // v3 的 {i:'best'|'any'} 照收
  ok(TUT.chipOk({ i: 'any', attr: 'h' }, { kind: 'chip', i: 1, attr: 'h' }, ctx) && !TUT.chipOk({ i: 'any', attr: 'h' }, { kind: 'chip', i: 1, attr: 'o' }, ctx), 'v3 {i:any} 照收');
});

// ---------------------------------------------------------------------------
section('重看教學：包包＝老闆四張＋特價箱 c／o／h 各第一張（或上次序章挑的三張）；照劇本打得完', () => {
  for (const t of TIERS) {
    const def = TUT.replayBag(C, t, null, E);
    const firsts = ATTRS.map(a => POOL.find(id => E.topAttr(C.cards[id]) === a));
    eq(def, C.gifts[t].concat(firsts), t + ' 預設：禮物＋特價箱 c、o、h 各第一張');
    const last = [POOL[8], POOL[2], POOL[4]];
    eq(TUT.replayBag(C, t, last, E), C.gifts[t].concat(last), t + ' 上次序章挑的三張（照挑的順序）');
    for (const bad of [[POOL[0], POOL[0], POOL[1]], [POOL[0], 'no-such-card', POOL[1]], [POOL[0]], 'x', [C.gifts[t][0], POOL[1], POOL[2]]])
      eq(TUT.replayBag(C, t, bad, E), def, t + ' 上次挑的不合法 → 預設 ' + JSON.stringify(bad).slice(0, 40));
    for (const lb of [null, last]) {
      const rp = TUT.replayDuel(C, t, 7, E, { bargain: lb });
      eq([rp.duel.e.hp, rp.duel.p.hp], [18, E.CFG.playerHp], t + ' 重看教學那場：他 18、你 ' + E.CFG.playerHp);
      eq(rp.duel.p.hand.map(c => c.id), T.script[t].hand.concat(TUT.replayBag(C, t, lb, E).slice(4)).slice(0, E.CFG.handSize), t + ' 重看教學起手一樣（四張＋特價箱第 1 張）');
      eq(rp.duel.p.relics, [], t + ' 重看教學沒有發燒配件');
      // 照教學走一遍（用 runner、跟真的一樣）
      const R = TUT.createRunner(C, t, rp.duel, { engine: E });
      const clashes = [];
      for (let g = 0; g < 60 && R.state === 'run'; g++) {
        const s = R.begin(); if (!s) break;
        if (s.kind === 'say') { R.done(); continue; }
        const w = target(rp.duel, s.pick);
        if (!s.allow.throw) { R.gate(cardAct(rp.duel, w.i)); continue; }
        R.gate(shotAct(rp.duel, w.i, w.attr));
        const evs = E.resolveTurn(rp.duel, actOf(w), {});
        clashes.push(evs.find(e => e.t === 'clash'));
        while (R.state === 'run' && TUT.atResolve(R.cur())) { R.begin(); R.done(); }
        const over = evs.find(e => e.t === 'over');
        if (over) { R.resolved(evs); break; }
        R.handReady();
      }
      eq(clashes.map(c => c.kind), T.expect[t].map(x => x.kind), t + ' 重看教學（' + (lb ? '上次挑的' : '預設') + '）每手照 expect');
      ok(rp.duel.over && rp.duel.over.win && clashes.length === 6, t + ' 重看教學第 6 手 KO');
    }
  }
});

// ---------------------------------------------------------------------------
section('tutorial.js 在 Node 只輸出純邏輯，不碰 DOM／localStorage；v3 的機制不回來', () => {
  ok(!/localStorage/.test(tutSrc.replace(/\/\/.*$/gm, '')), 'tutorial.js 不碰 localStorage（存檔交給 ui.js）');
  for (const k of ['stepsFor', 'pickSpec', 'createRunner', 'matches', 'chipOk', 'stepForHand', 'atResolve', 'isCommit', 'replayBag', 'replayDuel', 'TIERS']) ok(k in TUT, 'core 匯出 ' + k);
  ok(!('startDuelLesson' in TUT), 'Node 不輸出瀏覽器 API');
  for (const w of ['forcedAttr', 'e-stars', 'e-habit', 'C.junk', 'habit', 'forcedCell', 'openSheetKind', 'qi6']) ok(!tutSrc.replace(/\/\/.*$/gm, '').includes(w), 'tutorial.js 沒有舊的 ' + w);
});

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f)); process.exitCode = 1; }
