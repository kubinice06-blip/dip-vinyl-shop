// game-lab/test/tutorial.test.mjs — 序章引導教學 v3 的腳本測試（SPEC-v3 §8、§11.4）
//   node game-lab/test/tutorial.test.mjs        # 有失敗 exit 1
// 用 content.js 的 C.tutorial、tutorial.js 的純邏輯（stepsFor／createRunner／matches…）與真引擎（startFight(run, C, {tutorial:true})）：
// 照教學的每一步餵 gate，丟出去時呼叫 resolveTurn(…, runner.forcedAttr())。
// 路線：三張王牌 × 照做／點錯一次／點唱片資訊再回來＝9 條（×多個種子），每條：
//   前三手都是剋中、看穿，他扣的＝劇本（殿堂 3+5+4、流亡 4+5+3、異端 3+5+5），你一滴都沒少；第 10 步出現；學會四張小卡；之後自由打，一定贏。
// 另外測：步驟資料（10 步、字數、禁用字、目標名＝duel.js 的 data-tut、allow、三角邊）、老闆說的話是真的（他會丟最大的星、
// 剋中扣你那顆星、預告＝結算）、擋錯招（e2e #20 的純邏輯版）、教學中把他打倒、重掛（依 duel.n 接到那一手）、跳過、放手、直接開打。
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
function ok(cond, name, info) { if (cond) pass++; else { fail++; fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); ok(A === B, name, A + ' !== ' + B); }
function section(name, fn) { const f0 = fail; try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name); }

const T = C.tutorial;
const TIERS = ['hall', 'pearl', 'heresy'];
const ZH = E.ZH, BEATS = E.BEATS, COUNTER_OF = E.COUNTER_OF;
const len = s => [...String(s)].length;
const EXPECT = { hall: [3, 5, 4], pearl: [4, 5, 3], heresy: [3, 5, 5] };     // SPEC-v3 §8
const SPEC_TEXT = {                                                            // SPEC-v3 §8 的表（老闆說）
  t1: '這是他的脾氣。他多半照著丟。', t2: '只認排行榜：他會丟最大的星，經典。', t3: '冷門剋經典。', t4: '點這顆冷門。', t5: '再點一下，丟！',
  t6: '剋中：用你那顆星扣他。', t7: '他最大的是硬蕊。經典剋硬蕊。', t8: '丟！', t9: '冷門最大。剋冷門的是哪個？', t10: '王牌 7 星，每場一次。接下來自己來。'
};
const SPEC_KIND = { t1: 'say', t2: 'say', t3: 'say', t4: 'do', t5: 'do', t6: 'say', t7: 'do', t8: 'do', t9: 'do', t10: 'soft' };

// 教學那場：跟 ui.js 一樣用 startFight(run, C, {tutorial:true})（第一晚、序章還沒打）
function tutDuel(tier, seedKey) {
  const run = E.newRun(C, { seedKey: seedKey || ('tut-' + tier), nightNo: 1, ace: tier });
  const r = E.startFight(run, C, { tutorial: true });
  return { run, duel: r.duel, events: r.events };
}
const actOf = pick => pick.i === 'ace' ? { ace: true } : { i: pick.i, attr: pick.attr };
const optsOf = R => { const fa = R.forcedAttr(); return fa ? { forcedAttr: fa } : {}; };
function rngFn(seed) { let s = seed >>> 0 || 1; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// ---------------------------------------------------------------------------
// 一條路線
//   variant：'plain' 照手指點｜'wrong' 每個操作步先點錯（不只一種）｜'info' 每一步先開唱片資訊再關掉
//   o.t9：第 9 步點哪一顆硬蕊（'best'｜'worst'｜'ace'）；o.hand4：第 10 步之後第一手怎麼丟（'novice'｜'ace'）
function route(tier, variant, o = {}) {
  const { duel } = tutDuel(tier, o.seedKey);
  const R = TUT.createRunner(C, tier, duel, { engine: E });
  const out = { tier, variant, clashes: [], eHpAfter: [], pHpAfter: [], blocked: 0, infoOk: 0, steps: [], learned: null, over: null, shownT10: false, freeHands: 0 };
  const tryWrong = (a, why) => {
    const idx = R.idx, n = duel.n, st = R.state;
    const res = R.gate(a);
    ok(res === false, tier + '/' + variant + ' ' + R.cur().id + ' 擋住 ' + why, a);
    ok(R.idx === idx && R.state === st && duel.n === n, tier + '/' + variant + ' 擋住後不前進 ' + why);
    ok(R.last && R.last.wrong === 'target', tier + '/' + variant + ' 擋住時標記 wrong ' + why);
    out.blocked++;
  };
  const peek = () => {
    const idx = R.idx;
    ok(R.gate({ kind: 'info', where: 'e-rec' }) === true, tier + ' 看唱片資訊放行 ' + (R.cur() ? R.cur().id : '-'));
    ok(R.gate({ kind: 'close' }) === true, tier + ' 關唱片資訊放行');
    ok(R.idx === idx && R.state === 'run', tier + ' 看一眼唱片資訊不算完成、也不算錯');
    out.infoOk++;
  };
  const commit = () => {
    const act = actOf(R.pick);
    const pv = E.preview(duel, act);
    const evs = E.resolveTurn(duel, act, optsOf(R));
    ok(evs.length > 0, tier + ' 引擎收了這一手', act);
    const cl = evs.find(e => e.t === 'clash');
    out.clashes.push(cl);
    ok(pv && cl && pv[cl.eAttr].kind === cl.kind && pv[cl.eAttr].toE === cl.toE && pv[cl.eAttr].toP === cl.toP, tier + ' 第 ' + cl.n + ' 手：預告＝結算', { pv, cl });
    out.eHpAfter.push(duel.e.hp); out.pHpAfter.push(duel.p.hp);
    R.resolved(evs);
    // 結算浮框出現時講的那步（t6）：講完點一下
    while (R.state === 'run' && TUT.atResolve(R.cur())) { if (variant === 'info') peek(); const s = R.begin(); out.steps.push(s.id); R.done(); }
    if (duel.over) return true;
    R.handReady();
    return false;
  };
  let guard = 0;
  while (R.state === 'run' && guard++ < 40) {
    const s = R.begin(); if (!s) break;
    if (variant === 'info') peek();
    if (s.kind === 'say') {
      if (variant === 'wrong') tryWrong({ kind: 'chip', i: 0, attr: 'o' }, '說明步點星鈕');
      out.steps.push(s.id); R.done(); continue;
    }
    if (s.kind === 'soft') {               // 第 10 步：建議，不擋；任何一個動作就算看過
      out.shownT10 = true; out.steps.push(s.id);
      ok(TUT.matches(s, { kind: 'chip', i: 0, attr: 'c' }, R.context()) === false, tier + ' t10 沒有 allow（建議步，靠 kind 放行）');
      const first = o.hand4 === 'ace' ? { i: 'ace', attr: duel.p.ace ? E.TIER_AXIS[tier] : 'c' } : null;
      const a = first || (() => { const p = E.policies.novice(duel, rngFn(1)); return p.ace ? { i: 'ace', attr: E.TIER_AXIS[tier] } : { i: p.i, attr: p.attr }; })();
      ok(R.gate({ kind: 'chip', i: a.i, attr: a.attr }) === true, tier + ' t10 任何操作都放行');
      R.pick = a;
      break;
    }
    // 操作步
    const al = s.allow;
    if (variant === 'wrong') {
      if (al.chip && !al.throw) {         // t4、t7：點別色、點同色但不是最大那張、點王牌、還沒選就丟
        const wrongAttr = al.chip.attr === 'o' ? 'c' : 'o';
        tryWrong({ kind: 'chip', i: 0, attr: wrongAttr }, '點別色');
        const best = E.bestChip(duel, al.chip.attr);
        const other = [0, 1, 2].find(i => i !== best.i);
        tryWrong({ kind: 'chip', i: other, attr: al.chip.attr }, '同色但不是最大那張');
        if (duel.p.ace && !duel.p.aceUsed) tryWrong({ kind: 'chip', i: 'ace', attr: E.TIER_AXIS[tier] }, '點王牌');
        tryWrong({ kind: 'throw', i: best.i, attr: al.chip.attr }, '還沒選就丟');
      } else if (al.throw && !al.chip) {  // t5、t8：換點別顆、丟別顆
        const p = R.pick;
        tryWrong({ kind: 'chip', i: (p.i + 1) % 3, attr: p.attr }, '換點別顆');
        tryWrong({ kind: 'throw', i: (p.i + 1) % 3, attr: p.attr }, '丟別顆');
        tryWrong({ kind: 'throw', i: p.i, attr: p.attr === 'c' ? 'o' : 'c' }, '丟同張別色');
      } else {                            // t9：點經典、點冷門、丟冷門
        tryWrong({ kind: 'chip', i: 0, attr: 'c' }, '第 9 步點經典');
        tryWrong({ kind: 'chip', i: 1, attr: 'o' }, '第 9 步點冷門');
        tryWrong({ kind: 'throw', i: 2, attr: 'o' }, '第 9 步丟冷門');
      }
    }
    if (al.chip && !al.throw) {
      const best = E.bestChip(duel, al.chip.attr);
      ok(best && !best.ace, tier + ' ' + s.id + ' 最大的星在手牌上（不含王牌）');
      ok(R.gate({ kind: 'chip', i: best.i, attr: best.attr }) === true, tier + ' ' + s.id + ' 點手指那顆');
      ok(R.last.final === true && R.state === 'run', tier + ' ' + s.id + ' 這步完成');
      out.steps.push(s.id);
      continue;
    }
    if (al.throw && !al.chip) {
      const p = R.pick;
      ok(R.gate({ kind: 'throw', i: p.i, attr: p.attr }) === true, tier + ' ' + s.id + ' 丟');
      ok(R.last.commit === true && R.awaiting === true, tier + ' ' + s.id + ' 丟出去＝等結算');
      out.steps.push(s.id);
      if (commit()) break;
      continue;
    }
    // t9：只開放硬蕊（任一張），點了再丟
    let h;
    if (o.t9 === 'ace') h = { i: 'ace', attr: 'h' };
    else if (o.t9 === 'worst') { let w = null; duel.p.hand.forEach((c, i) => { if (c && (!w || c.h < duel.p.hand[w.i].h)) w = { i, attr: 'h' }; }); h = w; }
    else { const b = E.bestChip(duel, 'h'); h = { i: b.i, attr: 'h' }; }
    ok(R.gate({ kind: 'chip', i: h.i, attr: 'h' }) === true, tier + ' t9 點硬蕊 ' + (o.t9 || 'best'));
    ok(R.last.final === false && R.picked === true && R.state === 'run', tier + ' t9 點了還沒完成（要丟）');
    if (variant === 'wrong') tryWrong({ kind: 'throw', i: h.i === 'ace' ? 0 : h.i, attr: 'c' }, '第 9 步點了硬蕊卻丟經典');
    ok(R.gate({ kind: 'throw', i: h.i, attr: 'h' }) === true, tier + ' t9 丟硬蕊');
    out.steps.push(s.id);
    if (commit()) break;
  }
  out.learned = R.learnedIds.slice();
  out.lessonState = R.state;
  // 第 10 步之後：自由打（教學已經結束、gate 全放行、不再指定他丟的色）
  ok(R.state === 'done', tier + '/' + variant + ' 教學走完（' + R.state + '）');
  ok(R.forcedAttr() === null, tier + ' 教學走完後不再送 forcedAttr');
  ok(R.gate({ kind: 'throw', i: 0, attr: 'h' }) === true, tier + ' 教學走完後 gate 全放行');
  const rr = rngFn(99);
  if (!duel.over && R.pick) {           // 第 10 步選的那顆：丟出去
    const evs = E.resolveTurn(duel, actOf(R.pick), {});
    ok(evs.length > 0, tier + ' 第 4 手丟出去');
    out.clashes.push(evs.find(e => e.t === 'clash')); out.freeHands++;
  }
  let g2 = 0;
  while (!duel.over && g2++ < 12) {
    const a = E.policies.novice(duel, rr);
    const evs = E.resolveTurn(duel, a, {});
    if (!evs.length) { ok(false, tier + ' novice 出了不合法的牌', a); break; }
    out.clashes.push(evs.find(e => e.t === 'clash')); out.freeHands++;
  }
  out.over = duel.over;
  out.duel = duel;
  return out;
}

// ---------------------------------------------------------------------------
section('C.tutorial：聲望 14、劇本（唱片、色、手牌）、三王牌的數字', () => {
  eq(T.hp, 14, '教學場聲望 14');
  eq(C.enemies.man.hp, 10, '男子本身 10（直接開打）');
  eq(T.records.slice(0, 4), ['coldplay-mylo-xyloto', 'sigur-ros-von', '老王樂隊-暮夜徐行', 'imagine-dragons-night-visions'], '他的四張照劇本');
  eq(T.attrs, ['c', 'h', 'o', 'c'], '他丟經→硬→冷→經');
  eq(T.expect, EXPECT, 'expect＝SPEC-v3 §8 的數字');
  eq([T.learned.L1, T.learned.L2, T.learned.L3], ['冷門剋經典', '經典剋硬蕊', '硬蕊剋冷門'], '小卡 L1–L3＝三相剋');
  ok(/^王牌[：\s]?7 星，每場一次$/.test(T.learned.L4) && Object.keys(T.learned).length === 4, '小卡 L4＝王牌 7 星，每場一次', T.learned.L4);
  for (const t of TIERS) {
    const s = T.script[t];
    eq([...s.hand, ...s.draw].sort(), [...C.gifts[t], ...C.junk].sort(), t + ' 起手＋抽牌＝老闆四張＋門口三張');
    const { duel, events } = tutDuel(t);
    eq(duel.e.hp, 14, t + ' startFight(tutorial) 他 14');
    eq(duel.p.hp, 10, t + ' 你 10');
    eq(duel.e.card.id, 'coldplay-mylo-xyloto', t + ' 第一手 Mylo Xyloto');
    eq(duel.p.hand.map(c => c.id), s.hand, t + ' 起手照劇本');
    eq(duel.p.ace.id, C.aces[t], t + ' 王牌');
    ok(events.length && events[0].t === 'hand' && events[0].n === 1, t + ' 開場事件 hand 1');
    const rp = TUT.replayDuel(C, t, 7, E);
    eq(rp.duel.e.hp, 14, t + ' 重看教學那場也是 14');
    eq(rp.duel.p.hand.map(c => c.id), s.hand, t + ' 重看教學起手一樣');
    eq(rp.duel.p.relics, [], t + ' 重看教學沒有發燒配件');
  }
  // 直接開打：男子 10，不照劇本
  const run = E.newRun(C, { seedKey: 'skip', nightNo: 1, ace: 'pearl' });
  const r = E.startFight(run, C, {});
  eq(r.duel.e.hp, 10, '直接開打：男子 10');
  eq(r.duel.script, null, '直接開打：沒有劇本');
  eq(r.duel.e.p, 1, '直接開打：照脾氣 100%');
});

// ---------------------------------------------------------------------------
const duelSrc = fs.existsSync(path.join(LAB, 'duel.js')) ? fs.readFileSync(path.join(LAB, 'duel.js'), 'utf8') : '';
const nameKnown = n => /^chip:best:[coh](:ace)?$/.test(n) ? duelSrc.includes('chip:best:') : (duelSrc.includes("'" + n + "'") || duelSrc.includes('"' + n + '"') || duelSrc.includes('data-tut="' + n + '"') || duelSrc.includes(' ' + n + ' ') || duelSrc.includes(' ' + n + '\n'));
section('步驟資料：10 步、說／做／建議、台詞＝SPEC、≤25 字、禁用字、目標名＝duel.js、allow、三角邊', () => {
  const steps = T.steps;
  eq(steps.map(s => s.id), Object.keys(SPEC_TEXT), '十步 t1–t10');
  const FORBID = /——|—|派對|櫃台|卡片資訊|氣勢|輾壓|賭注|相生|割捨|七星回擊|霸權|點播|晃|配件/;
  for (const s of steps) {
    eq(s.kind, SPEC_KIND[s.id], s.id + ' 種類');
    eq(s.text, SPEC_TEXT[s.id], s.id + ' 台詞＝SPEC-v3 §8');
    ok(len(s.text) <= 25, s.id + ' ≤25 字（' + len(s.text) + '）');
    ok(!FORBID.test(s.text), s.id + ' 沒有禁用字：' + s.text);
    ok(s.tag === '新' || s.tag === '原句' || s.tag === '拍板', s.id + ' tag');
    for (const n of [...s.target, ...(s.point ? [s.point] : []), ...(s.look || []), ...(s.keep || [])]) ok(nameKnown(n), s.id + ' 目標名在 duel.js 裡：' + n);
    if (s.tri) ok(s.tri.every(x => ['oc', 'ch', 'ho'].includes(x)), s.id + ' tri');
  }
  for (const [k, v] of Object.entries(T.ui)) { ok(len(v) <= 18, 'ui.' + k + ' ≤18'); ok(!FORBID.test(v), 'ui.' + k + ' 禁用字'); }
  eq(T.ui.wrong, '先點我指的這裡。', '點錯的那句（e2e #20）');
  for (const v of Object.values(T.learned)) ok(!FORBID.test(v), '小卡禁用字 ' + v);
  // 一手只要求一個動作：t4 點、t5 丟、t7 點、t8 丟、t9 點＋丟（同一個動作：丟硬蕊）
  const byId = Object.fromEntries(steps.map(s => [s.id, s]));
  eq(byId.t4.allow, { chip: { i: 'best', attr: 'o' } }, 't4 只放行最大的冷門星');
  eq(byId.t5.allow, { throw: true }, 't5 只放行丟');
  eq(byId.t7.allow, { chip: { i: 'best', attr: 'c' } }, 't7 只放行最大的經典星');
  eq(byId.t8.allow, { throw: true }, 't8 只放行丟');
  eq(byId.t9.allow, { chip: { i: 'any', attr: 'h' }, throw: true }, 't9 只放行硬蕊（任一張）');
  eq(byId.t9.point, false, 't9 不給手指');
  eq(byId.t3.tri, ['oc'], 't3 三角亮冷→經'); eq(byId.t7.tri, ['ch'], 't7 亮經→硬'); eq(byId.t9.tri, ['ho'], 't9 亮硬→冷');
  eq(steps.filter(s => s.learn).map(s => s.id + ':' + s.learn), ['t6:L1', 't8:L2', 't9:L3', 't10:L4'], '學會的小卡在 t6／t8／t9／t10');
  // 每個王牌拿到的步驟都一樣（v3 不分王牌）
  for (const t of TIERS) eq(TUT.stepsFor(C, t).map(s => s.id + s.text), steps.map(s => s.id + s.text), t + ' stepsFor 一樣');
  // 一次性小提示：duel.js 送的五個 id 都有字
  for (const id of ['tip_mirror', 'tip_offhabit', 'tip_read', 'tip_switch', 'tip_eye']) {
    ok(C.coachTips[id] && len(C.coachTips[id]) <= 20, 'coachTips.' + id);
    ok(!duelSrc || duelSrc.includes(id), 'duel.js 會送 ' + id);
  }
});

// ---------------------------------------------------------------------------
section('老闆說的話是真的：他會丟最大的星、三角的邊、剋中扣你那顆星、王牌 7 星', () => {
  const recs = T.records.map(id => C.cards[id]);
  const big = c => [...C.enemies.man.taste].find(x => c[x] === Math.max(c.c, c.o, c.h));
  eq(big(recs[0]), 'c', 't2「他會丟最大的星，經典」：Mylo Xyloto 最大是經典');
  ok(T.steps[1].text.includes(ZH[T.attrs[0]]), 't2 說的色＝他第一手丟的色');
  eq(big(recs[1]), 'h', 't7「他最大的是硬蕊」：Von 最大是硬蕊');
  ok(T.steps[6].text.includes('他最大的是' + ZH[T.attrs[1]]), 't7 說的色＝他第二手丟的色');
  eq(big(recs[2]), 'o', 't9「冷門最大」：暮夜徐行最大是冷門');
  eq(COUNTER_OF[T.attrs[2]], 'h', 't9 剋冷門的是硬蕊＝唯一放行的色');
  eq(BEATS.o, 'c', 't3「冷門剋經典」'); eq(BEATS.c, 'h', 't7「經典剋硬蕊」'); eq(BEATS.h, 'o', '小卡 L3「硬蕊剋冷門」');
  // 男子是老實、照脾氣 100%：引擎算出的脾氣色＝劇本的色（劇本沒有騙人）
  for (const t of TIERS) {
    const { duel } = tutDuel(t);
    eq(duel.e.habit, 'honest', t + ' 男子老實');
    eq(E.habitAttrOf(duel), T.attrs[0], t + ' 第一手名牌算出的色＝劇本');
    eq(E.view(duel).habitLine, C.habits.honest.line, t + ' 名牌那句＝只認排行榜');
    ok(!('intent' in E.view(duel)), t + ' view 不給 intent');
    // t4 的預告：點最大的冷門 → 他丟經典時「他 −N」
    const b = E.bestChip(duel, 'o');
    const pv = E.preview(duel, { i: b.i, attr: 'o' });
    eq([pv.c.kind, pv.c.toE, pv.c.toP], ['counter', EXPECT[t][0], 0], t + ' t4 的預告：剋中、他 −' + EXPECT[t][0]);
    eq(pv.c.toE, duel.p.hand[b.i].o, t + ' t6「剋中：用你那顆星扣他」');
    eq(duel.p.ace[E.TIER_AXIS[t]], 7, t + ' t10「王牌 7 星」');
  }
});

// ---------------------------------------------------------------------------
section('9 條路線（三王牌 × 照做／點錯／看唱片資訊）× 5 個種子：前三手照劇本、你沒掉血、第 10 步出現、四張小卡、最後贏', () => {
  for (const t of TIERS) for (const variant of ['plain', 'wrong', 'info']) for (let k = 0; k < 5; k++) {
    const r = route(t, variant, { seedKey: 'tut-' + t + '-' + variant + '-' + k });
    const tag = t + '/' + variant + '#' + k;
    const first3 = r.clashes.slice(0, 3);
    eq(first3.map(c => c.kind), ['counter', 'counter', 'counter'], tag + ' 前三手都剋中');
    eq(first3.map(c => c.eAttr), T.attrs.slice(0, 3), tag + ' 他丟的色照劇本');
    eq(first3.map(c => c.toE), EXPECT[t], tag + ' 他扣的＝劇本');
    eq(first3.map(c => c.pAttr), ['o', 'c', 'h'], tag + ' 你丟冷→經→硬');
    ok(first3.every(c => c.read && c.followed), tag + ' 前三手都是看穿（照脾氣＋剋中）');
    eq(r.eHpAfter, [14 - EXPECT[t][0], 14 - EXPECT[t][0] - EXPECT[t][1], 14 - EXPECT[t][0] - EXPECT[t][1] - EXPECT[t][2]], tag + ' 他每手結算後的聲望');
    eq(r.pHpAfter, [10, 10, 10], tag + ' 你一滴都沒少');
    ok(r.shownT10, tag + ' 第 10 步出現（前三手沒把他打倒）');
    eq(r.steps, ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10'], tag + ' 十步照順序');
    eq(r.learned, ['L1', 'L2', 'L3', 'L4'], tag + ' 四張小卡照順序');
    ok(r.over && r.over.win === true, tag + ' 最後贏', r.over);
    ok(r.clashes.length <= 7, tag + ' 最多 7 手');
    if (variant === 'wrong') ok(r.blocked >= 14, tag + ' 點錯都被擋（' + r.blocked + ' 次）');
    if (variant === 'info') ok(r.infoOk >= 10, tag + ' 每一步都能看唱片資訊（' + r.infoOk + ' 次）');
    // 第 4 手：照名牌（他丟經典）剋中就收掉（SPEC：第四手任何剋中都收得掉）
    if (variant === 'plain') {
      const c4 = r.clashes[3];
      ok(c4 && c4.n === 4 && c4.eAttr === 'c' && c4.kind === 'counter' && r.over.by === 'hp' && r.clashes.length === 4, tag + ' 第 4 手照名牌剋中就收掉', c4);
    }
  }
});

// ---------------------------------------------------------------------------
section('第 9 步點最小的硬蕊也行；第 10 步丟王牌（殿堂、流亡收掉；異端被剋，之後照名牌打照樣贏）', () => {
  for (const t of TIERS) {
    const w = route(t, 'plain', { t9: 'worst' });
    ok(w.clashes[2].kind === 'counter' && w.clashes[2].pAttr === 'h', t + ' t9 最小的硬蕊也剋中');
    ok(w.shownT10 && w.over && w.over.win, t + ' t9 點最小的硬蕊：第 10 步出現、最後贏', w.over);
    const a = route(t, 'plain', { hand4: 'ace' });
    const c4 = a.clashes[3];
    ok(c4 && c4.ace && c4.pStar === 7, t + ' 第 4 手丟王牌 7 星');
    if (t === 'heresy') ok(c4.kind === 'countered' && a.over && a.over.win, '異端王牌（硬蕊）被經典剋：你 −3，之後照名牌打照樣贏', { c4, over: a.over });
    else ok(a.over && a.over.win && a.over.by === 'hp' && a.clashes.length === 4, t + ' 第 4 手丟王牌收掉', a.over);
  }
});

section('教學中就把他打倒：異端第 9 步丟王牌（硬蕊 7）→ 教學完成、四張小卡都學到', () => {
  const r = route('heresy', 'plain', { t9: 'ace' });
  const c3 = r.clashes[2];
  ok(c3 && c3.ace && c3.kind === 'counter' && c3.toE === 7, '第 3 手王牌剋中 7', c3);
  ok(r.over && r.over.win && r.over.by === 'hp' && r.clashes.length === 3, '第 3 手就收掉', r.over);
  eq(r.lessonState, 'done', '教學算完成（不是放手）');
  eq(r.learned, ['L1', 'L2', 'L3', 'L4'], '還沒教到的王牌小卡也一起學到');
  ok(!r.shownT10, '第 10 步沒出現（他已經倒了）');
  // 殿堂、流亡的王牌在第 9 步不能用（不是硬蕊）
  for (const t of ['hall', 'pearl']) {
    const { duel } = tutDuel(t);
    const R = TUT.createRunner(C, t, duel, { engine: E });
    const s9 = R.steps.find(s => s.id === 't9');
    ok(!TUT.matches(s9, { kind: 'chip', i: 'ace', attr: E.TIER_AXIS[t] }, R.context()), t + ' t9 王牌不是硬蕊：擋');
  }
});

// ---------------------------------------------------------------------------
section('擋錯招（e2e #20 的純邏輯版）：第 4 步點錯星鈕、第 9 步點非硬蕊星 → 不前進、標 wrong', () => {
  for (const t of TIERS) {
    const { duel } = tutDuel(t);
    const R = TUT.createRunner(C, t, duel, { engine: E });
    R.begin(); R.done(); R.begin(); R.done(); R.begin(); R.done();     // t1–t3
    eq(R.cur().id, 't4', t + ' 到第 4 步');
    R.begin();
    for (const a of [{ i: 0, attr: 'c' }, { i: 1, attr: 'h' }, { i: 'ace', attr: E.TIER_AXIS[t] }]) {
      if (a.i === 'ace' && a.attr === 'o') continue;
      const best = E.bestChip(duel, 'o');
      if (a.attr === 'o' && a.i === best.i) continue;
      eq(R.gate(Object.assign({ kind: 'chip' }, a)), false, t + ' t4 擋 ' + JSON.stringify(a));
    }
    if (t === 'pearl') eq(R.gate({ kind: 'chip', i: 'ace', attr: 'o' }), false, '流亡 t4 擋王牌（冷門 7，但手指指的是手牌上最大的冷門）');
    eq([R.cur().id, duel.n, R.state], ['t4', 1, 'run'], t + ' t4 被擋後還在 t4、引擎第 1 手');
    eq(R.last.wrong, 'target', t + ' t4 標 wrong');
  }
  // 換步之後（awaiting）點星鈕：擋
  const { duel } = tutDuel('hall');
  const R = TUT.createRunner(C, 'hall', duel, { engine: E });
  for (let k = 0; k < 3; k++) { R.begin(); R.done(); }
  R.begin(); const b = E.bestChip(duel, 'o'); R.gate({ kind: 'chip', i: b.i, attr: 'o' });
  R.begin(); R.gate({ kind: 'throw', i: b.i, attr: 'o' });
  ok(R.awaiting, '丟出去之後在等結算');
  eq(R.gate({ kind: 'chip', i: 0, attr: 'c' }), false, '等結算時點星鈕：擋');
  eq(R.gate({ kind: 'info', where: 'slot-e' }), true, '等結算時看唱片資訊：放行');
});

// ---------------------------------------------------------------------------
section('重掛：依 duel.n 接到那一手（2 → t7、3 → t9、4 → t10、5 → 完成），前面的小卡算學過、不飛', () => {
  for (const t of TIERS) {
    const { duel } = tutDuel(t);
    const want = { 1: 't4', 2: 't7', 3: 't9', 4: 't10' };
    eq(TUT.createRunner(C, t, duel, { engine: E }).cur().id, 't1', t + ' 第 1 手從 t1');
    const picks = [E.bestChip(duel, 'o'), null, null];
    // 照劇本打三手（最大的冷、經、硬），每手之後重掛一次
    for (let h = 1; h <= 4; h++) {
      const R = TUT.createRunner(C, t, duel, { engine: E });
      if (h === 1) { eq(R.cur().id, 't1', t + ' n=1 → t1'); eq(R.learnedIds, [], t + ' n=1 沒學過'); }
      else {
        eq(R.cur().id, want[h], t + ' n=' + h + ' → ' + want[h]);
        eq(R.learnedIds, ['L1', 'L2', 'L3'].slice(0, h === 4 ? 3 : h - 1), t + ' n=' + h + ' 前面的小卡算學過');
        eq(R.learnQ, [], t + ' n=' + h + ' 重掛不飛小卡');
      }
      if (h === 4) break;
      const attr = ['o', 'c', 'h'][h - 1];
      const b = E.bestChip(duel, attr);
      E.resolveTurn(duel, { i: b.i, attr }, { forcedAttr: T.attrs[h - 1] });
    }
    void picks;
    E.resolveTurn(duel, E.policies.novice(duel, rngFn(3)), {});
    if (!duel.over) { const R5 = TUT.createRunner(C, t, duel, { engine: E }); eq(R5.state, 'done', t + ' n=5 → 教學早就走完'); }
    const RF = TUT.createRunner(C, t, duel, { engine: E, from: 2 });
    eq(RF.cur() ? RF.cur().id : RF.state, 't7', t + ' from 可以指定那一手');
  }
  eq(TUT.stepForHand(T.steps, 1), 0, 'stepForHand(1)=0');
  eq(T.steps[TUT.stepForHand(T.steps, 2)].id, 't7', 'stepForHand(2)=t7（t6 算第 1 手）');
  eq(T.steps[TUT.stepForHand(T.steps, 3)].id, 't9', 'stepForHand(3)=t9');
  eq(T.steps[TUT.stepForHand(T.steps, 4)].id, 't10', 'stepForHand(4)=t10');
  eq(TUT.stepForHand(T.steps, 5), T.steps.length, 'stepForHand(5)=結束');
});

// ---------------------------------------------------------------------------
section('跳過、放手、輸了：狀態、gate 全放行、不再送 forcedAttr', () => {
  const { duel } = tutDuel('pearl');
  const R = TUT.createRunner(C, 'pearl', duel, { engine: E });
  eq(R.forcedAttr(), 'c', '教學中第 1 手送 forcedAttr 經典');
  R.skip();
  eq(R.state, 'skipped', 'skip → skipped');
  eq(R.gate({ kind: 'chip', i: 2, attr: 'h' }), true, '跳過之後 gate 全放行');
  eq(R.forcedAttr(), null, '跳過之後不送 forcedAttr（引擎的劇本照樣讓他照名牌丟）');
  R.skip(); eq(R.state, 'skipped', '再 skip 一次不變');
  const d2 = tutDuel('hall').duel;
  const R2 = TUT.createRunner(C, 'hall', d2, { engine: E });
  R2.release(); eq(R2.state, 'released', 'release → released');
  const d3 = tutDuel('hall').duel;
  const R3 = TUT.createRunner(C, 'hall', d3, { engine: E });
  R3.resolved([{ t: 'clash' }, { t: 'over', win: false, by: 'hp' }]);
  eq(R3.state, 'released', '教學中輸了 → 放手（不會發生，但要收得乾淨）');
  const d4 = tutDuel('hall').duel;
  const R4 = TUT.createRunner(C, 'hall', d4, { engine: E });
  R4.resolved([{ t: 'over', win: true, by: 'hp' }]);
  eq([R4.state, R4.learnedIds], ['done', ['L1', 'L2', 'L3', 'L4']], '教學中贏了 → 完成、小卡全學到');
  // 已經結束的 runner 收到結算：不改狀態
  R.resolved([{ t: 'over', win: true }]); eq(R.state, 'skipped', '跳過之後的結算不改狀態');
});

// ---------------------------------------------------------------------------
section('matches／chipOk：best 不含王牌、any 只認那一色（含能用的王牌）、丟的要是點的那顆', () => {
  const { duel } = tutDuel('heresy');
  const R = TUT.createRunner(C, 'heresy', duel, { engine: E });
  const ctx = R.context();
  const s4 = T.steps[3], s5 = T.steps[4], s9 = T.steps[8];
  const b = E.bestChip(duel, 'o');
  ok(TUT.matches(s4, { kind: 'chip', i: b.i, attr: 'o' }, ctx), 't4 最大的冷門：放行');
  ok(!TUT.matches(s4, { kind: 'throw', i: b.i, attr: 'o' }, ctx), 't4 丟：擋');
  ok(TUT.matches(s5, { kind: 'throw', i: b.i, attr: 'o' }, Object.assign({}, ctx, { pick: null })) === true, 't5 沒有 pick 時，丟任何一顆都算（DOM 端一定有 pick）');
  ok(TUT.matches(s5, { kind: 'throw', i: b.i, attr: 'o' }, Object.assign({}, ctx, { pick: { i: b.i, attr: 'o' } })), 't5 丟點的那顆：放行');
  ok(!TUT.matches(s5, { kind: 'throw', i: (b.i + 1) % 3, attr: 'o' }, Object.assign({}, ctx, { pick: { i: b.i, attr: 'o' } })), 't5 丟別顆：擋');
  ok(TUT.matches(s9, { kind: 'chip', i: 'ace', attr: 'h' }, ctx), 't9 異端王牌（硬蕊 7）：放行');
  ok(TUT.matches(s9, { kind: 'chip', i: 0, attr: 'h' }, ctx) && TUT.matches(s9, { kind: 'chip', i: 2, attr: 'h' }, ctx), 't9 任一張的硬蕊：放行');
  ok(!TUT.matches(s9, { kind: 'chip', i: 0, attr: 'o' }, ctx), 't9 冷門：擋');
  ok(TUT.matches(s9, { kind: 'throw', i: 1, attr: 'h' }, ctx) && !TUT.matches(s9, { kind: 'throw', i: 1, attr: 'c' }, ctx), 't9 丟的也要是硬蕊');
  ok(!TUT.matches(s4, { kind: 'info', where: 'e-rec' }, ctx), '沒有 allow.info 的步驟：看唱片資訊不算完成這步');
  ok(!TUT.matches(null, { kind: 'chip', i: 0, attr: 'o' }, ctx) && !TUT.matches(s4, null, ctx), 'null 安全');
  // 王牌用掉之後，any 不再認王牌
  const used = JSON.parse(JSON.stringify(duel)); used.p.aceUsed = true;
  const R2 = TUT.createRunner(C, 'heresy', used, { engine: E });
  ok(!TUT.matches(s9, { kind: 'chip', i: 'ace', attr: 'h' }, R2.context()), 't9 王牌用掉之後：擋');
});

// ---------------------------------------------------------------------------
section('tutorial.js 在 Node 只輸出純邏輯，不碰 DOM／localStorage', () => {
  const src = fs.readFileSync(path.join(LAB, 'tutorial.js'), 'utf8');
  ok(!/localStorage/.test(src.replace(/\/\/.*$/gm, '')), 'tutorial.js 不碰 localStorage（存檔交給 ui.js）');
  for (const k of ['stepsFor', 'createRunner', 'matches', 'chipOk', 'stepForHand', 'atResolve', 'isCommit', 'replayDuel', 'TIERS']) ok(k in TUT, 'core 匯出 ' + k);
  ok(!('startDuelLesson' in TUT), 'Node 不輸出瀏覽器 API');
  // v2 的機制不准回來
  for (const w of ['forcedCell', 'openSheetKind', 'guardSheet', 'qi6', 'bar6', 'sweep(']) ok(!src.includes(w), 'tutorial.js 沒有 v2 的 ' + w);
});

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f)); process.exitCode = 1; }
