// game-lab/test/tutorial.test.mjs — 序章引導教學的腳本測試（SPEC-v2 §6、§7.1、§9.3；移植 tut-tools/canon2.cjs）
//   node game-lab/test/tutorial.test.mjs        # 有失敗 exit 1
// 用 content.js 的 C.tutorial 與 tutorial.js 的純邏輯（stepsFor／prepDuel／createRunner），照教學的每一步餵 gate、
// 出牌時用 runner.forcedCell() 呼叫真引擎 resolveTurn(…, { forcedCell })。
// 三張王牌 × 好耳朵（開局氣勢 0／1）× 第 2 課挑哪一張（殿堂、異端各 4 種；流亡固定王牌）＝18 條路線，每條：
//   變臉發生在第 2 課那手、第 5 課之前沒有人倒下、品味輾壓收尾、玩家聲望 16 一滴都沒少、他每手結算後的聲望＝劇本（tutorial-simplify.md §4.4）。
// 另外測：步驟資料（字數、目標名、allow、標記）、擋錯招、放手、重掛（B15）、老闆說的話是真的（預覽「怎樣都是他扣」）。
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
const JUNK = 'david-bowie-never-let-me-down';
const len = s => [...String(s)].length;
const card = id => JSON.parse(JSON.stringify(C.cards[id]));

// ---------------------------------------------------------------------------
section('C.tutorial：男子 20／18、牌序、起手＋牌庫＝老闆四張＋門口三張', () => {
  eq(T.man.hp, 20, '教學場男子聲望 20');
  eq(T.man.phases.length, 1, '一次變臉');
  eq(T.man.phases[0].atHp, 18, '變臉刻度 18');
  eq(T.man.phases[0].disc, ['true', 'true', 'feint', 'feint', 'feint', 'feint'], '變臉後 真真晃晃晃晃');
  eq(T.records, C.enemies.man.deck, '他擺的盤＝男子的牌庫順序（Mylo Xyloto 先）');
  eq(T.records[0], 'coldplay-mylo-xyloto', '第 1 手 Mylo Xyloto');
  for (const t of TUT.TIERS) {
    ok(T.hand[t].length === 4 && T.draw[t].length === 3, t + ' 起手 4、牌庫 3');
    eq([...T.hand[t], ...T.draw[t]].sort(), [...C.gifts[t], ...C.junk].sort(), t + ' 起手＋牌庫＝老闆四張＋門口一百塊三張');
    eq(T.hand[t][0], JUNK, t + ' 起手第一張＝門口一百塊 Bowie（第 1 課用它）');
    [...T.hand[t], ...T.draw[t]].forEach(id => ok(C.cards[id], t + ' 卡存在 ' + id));
  }
  // 夜晚與直接開打照舊：男子本身沒被改
  eq(C.enemies.man.hp, 16, '男子本身仍是 16');
  eq(C.enemies.man.phases[0].atHp, 12, '男子本身變臉仍是 12');
  const tc = TUT.content(C);
  eq(tc.enemies.man.hp, 20, 'content(C) 的男子 20');
  ok(tc.enemies.copycat === C.enemies.copycat && tc.cards === C.cards, 'content(C) 只換男子');
  eq(C.enemies.man.hp, 16, 'content(C) 不改原資料');
  eq(TUT.startOpts(C), { firstRecordId: 'coldplay-mylo-xyloto' }, 'startOpts');
  eq(T.learned, { L1: '冷門剋經典', L3: '晃・經剋硬・硬剋冷', L4: '王牌', L5: '品味輾壓' }, '四張小卡');
});

// ---------------------------------------------------------------------------
// duel.js 的 data-tut 名稱（契約，SPEC-v2 §3.3）：從 duel.js 原始碼抓，抓不到就用規格表
const SPEC_NAMES = ['e-hud', 'e-hp', 'e-qi', 'e-quirk', 'e-rec', 'e-stars', 'e-shout', 'e-intent', 'table', 'slot-e', 'slot-p', 'stake', 'tri', 'result',
  'p-hud', 'p-hp', 'p-qi', 'request', 'chain', 'ult', 'hand', 'hand-ace', 'hand-0', 'hand-1', 'hand-2', 'hand-3', 'attrs', 'attr-c', 'attr-o', 'attr-h', 'attr-ace', 'ult-confirm'];
const duelSrc = fs.existsSync(path.join(LAB, 'duel.js')) ? fs.readFileSync(path.join(LAB, 'duel.js'), 'utf8') : '';
const header = duelSrc.slice(0, 2000);
const KNOWN = new Set(SPEC_NAMES.filter(n => !duelSrc || header.includes(n) || duelSrc.includes('data-tut="' + n + '"')));
section('步驟資料：字數、種類、目標、allow、標記', () => {
  const KINDS = ['say', 'do', 'soft'];
  const ALLOW = ['card', 'attr', 'ace', 'aceAttr', 'ult', 'ultConfirm', 'info', 'close'];
  const ids = new Set();
  for (const s of T.steps) {
    ok(!ids.has(s.id), '步驟 id 不重複 ' + s.id); ids.add(s.id);
    ok(KINDS.includes(s.kind), s.id + ' kind');
    ok(s.tag === '新' || s.tag === '原句' || s.tag === '拍板', s.id + ' tag');
    const texts = typeof s.text === 'object' ? Object.values(s.text) : [s.text];
    for (const tx of texts) {
      const t = tx.replace('{qi}', '10');
      ok(len(t) <= 18, s.id + ' 台詞 ≤18 字（' + len(t) + '）：' + t);
      ok(!/——|—|反咬|派對|櫃台|卡片資訊/.test(t), s.id + ' 沒有禁用字：' + t);
    }
    ok(Array.isArray(s.target) && s.target.length, s.id + ' 有目標');
    for (const n of [...s.target, ...(s.target2 || []), ...(s.keep || []), ...(s.point2 ? [s.point2] : [])]) {
      const okName = KNOWN.has(n) || (/^hand-[0-3]$/.test(n) && /hand-0\.\.hand-3|'hand-' \+ i/.test(duelSrc)) || /^@[fpo]$/.test(n) || n === 'card:bestC' || (n.startsWith('card:') && C.cards[n.slice(5)]) || n === 'info-close' || /^[.#[]/.test(n) || n.startsWith('shop:');
      ok(okName, s.id + ' 目標名合法：' + n);
    }
    if (s.kind !== 'say') {
      ok(s.allow && Object.keys(s.allow).length && Object.keys(s.allow).every(k => ALLOW.includes(k)), s.id + ' allow 合法', s.allow);
    } else ok(!s.allow, s.id + ' 說明步沒有 allow');
    if (s.cell) ok(['true', 'feint'].includes(s.cell) && (s.allow.attr || s.allow.aceAttr), s.id + ' cell 只用在出牌那一下');
    if (s.learn) ok(T.learned[s.learn], s.id + ' learn ' + s.learn);
    if (s.tier) for (const t of [].concat(s.tier)) ok(TUT.TIERS.includes(t), s.id + ' tier ' + t);
    if (typeof s.text === 'object') for (const t of [].concat(s.tier)) ok(s.text[t], s.id + ' 每條路線都有字 ' + t);
  }
  for (const [k, v] of Object.entries(T.ui)) ok(typeof v === 'string' && len(v) <= 18 && !/——|反咬|派對/.test(v), 'ui.' + k + '：' + v);
  for (const t of TUT.TIERS) {
    const st = TUT.stepsFor(C, t);
    ok(st[0].id === 'D-1' && st[st.length - 2].id === '5-1' && st[st.length - 1].id === '5-2', t + ' 從 D-1 開始、5-1／5-2 收尾');
    ok(st.filter(s => s.kind === 'soft').length === 2, t + ' 只有最後兩步是建議（放手）');
    ok(st.every(s => typeof s.text === 'string' && s.text), t + ' 每步都解成字串');
    console.log('     ' + t + '：' + st.length + ' 步（操作 ' + st.filter(s => s.kind !== 'say').length + '）');
  }
  eq(TUT.stepsFor(C, 'pearl').some(s => s.id.startsWith('4-')), false, '流亡沒有第 4 課');
  eq(TUT.stepsFor(C, 'hall').some(s => s.id.endsWith('p')), false, '殿堂沒有流亡的王牌課');
  eq(T.steps.find(s => s.id === '2-7').text, C.hints.h_face, '2-7＝現有提示 h_face');
});

// ---------------------------------------------------------------------------
// 一條路線：照步驟點（每個操作步先試一個錯的，確定擋住）
function newDuel(tier, q, seed) {
  const pDef = { hp: E.CFG.prologueHp, maxHp: E.CFG.prologueHp, deck: [...C.gifts[tier], ...C.junk].map(card), ace: card(C.aces[tier]), ear: tier, relics: [], startQi: q, reviveOnce: false };
  const man = TUT.content(C).enemies.man;
  const eDef = Object.assign({}, man, { deck: man.deck.map(card) });
  const { duel } = E.startDuel(pDef, eDef, Object.assign({ seed, prologue: true }, TUT.startOpts(C)));
  TUT.prepDuel(duel, tier, C);
  return duel;
}
const AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };
function play(tier, q, l2, seed, opt = {}) {
  const d = newDuel(tier, q, seed);
  const R = TUT.createRunner(C, tier, d);
  const out = { hands: [], fc: null, koEarly: false, php: [], steps: [], blocks: 0, previewsAt: {}, claims: [], route: tier + ' q' + q + ' L2=' + l2 + ' seed' + seed };
  let sel = null, guard = 0;
  const commit = (act) => {
    const fc = R.forcedCell();
    const s = R.steps[R.idx - 1];
    if (s && s.cell) ok(Number.isInteger(fc) && d.e.disc[fc] === s.cell, out.route + ' ' + s.id + ' 指定格子＝' + s.cell, { fc, disc: d.e.disc });
    const before = { ehp: d.e.hp, qi: d.p.qi };
    const evs = E.resolveTurn(d, act, { forcedCell: fc });
    const cl = evs.find(e => e.t === 'clash');
    if (evs.some(e => e.t === 'faceChange')) out.fc = out.fc || d.hand - 1;
    const ko = R.resolved(evs);
    if (ko && act.type !== 'ult') out.koEarly = true;
    out.hands.push({ h: d.hand - (ko ? 0 : 1), act: act.type === 'card' ? act.attr : act.type, kind: cl.kind, stamp: cl.stamp || null, toE: cl.toE, toP: cl.toP, ehp: d.e.hp, qiBefore: before.qi });
    out.php.push(d.p.hp);
    R.handReady();
    sel = null;
  };
  while (R.active() && guard++ < 200) {
    const s = R.begin();
    if (!s) break;
    out.steps.push(s.id);
    out.previewsAt[s.id] = R.previewsOn();
    const a = s.allow || {};
    if (s.kind === 'say') {
      ok(R.gate({ kind: 'card', i: 0, id: d.p.hand[0].id }) === false, out.route + ' ' + s.id + ' 說明步擋住出牌');
      R.done(); continue;
    }
    if (s.id === '5-1' && opt.releaseAt51) { ok(R.gate({ kind: 'card', i: 0, id: d.p.hand[0].id }) === true, '5-1 出別張：放行'); break; }
    // 先點錯（操作步）
    if (s.kind === 'do') {
      const wrongId = d.p.hand.find(c => !(a.card === 'any' || c.id === a.card || (a.card === 'bestC' && c.id === R.bestC)));
      if (a.card && a.card !== 'any' && wrongId) { const i0 = d.p.hand.indexOf(wrongId); ok(R.gate({ kind: 'card', i: i0, id: wrongId.id }) === false && R.last.wrong === 'target', out.route + ' ' + s.id + ' 點別張被擋'); out.blocks++; }
      if (a.attr && !a.card) { const w = ['c', 'o', 'h'].find(x => x !== a.attr); ok(R.gate({ kind: 'attr', attr: w, i: sel, id: d.p.hand[sel] && d.p.hand[sel].id }) === false, out.route + ' ' + s.id + ' 按錯屬性被擋'); out.blocks++; }
      if (a.ace) { ok(R.gate({ kind: 'ult' }) === false, out.route + ' ' + s.id + ' 按輾壓被擋'); out.blocks++; }
      if (a.info) { ok(R.gate({ kind: 'info', where: 'hand' }) === false, out.route + ' ' + s.id + ' 開別張的資訊被擋'); out.blocks++; }
    }
    if (a.card) {
      let i;
      if (a.card === 'any') i = l2;
      else if (a.card === 'bestC') i = d.p.hand.findIndex(c => c.id === R.bestC);
      else i = d.p.hand.findIndex(c => c.id === a.card);
      ok(i >= 0 && d.p.hand[i], out.route + ' ' + s.id + ' 找得到那張', a.card);
      if (a.card === 'bestC') ok(d.p.hand[i].c === 5, out.route + ' 3-5「經典 5」是真的（' + d.p.hand[i].c + '）');
      ok(R.gate({ kind: 'card', i, id: d.p.hand[i].id }) === true, out.route + ' ' + s.id + ' 選這張放行');
      sel = i;
      if (a.attr) {   // 2-3：挑一張之後，按錯屬性換「這手先出冷門。」
        ok(R.gate({ kind: 'attr', attr: 'c', i, id: d.p.hand[i].id }) === false && R.last.wrong === 'attr', out.route + ' 2-3 按經典＝這手先出冷門');
        ok(R.gate({ kind: 'attr', attr: a.attr, i, id: d.p.hand[i].id }) === true, out.route + ' ' + s.id + ' 出冷門放行');
        commit({ type: 'card', i, attr: a.attr });
      }
      continue;
    }
    if (a.attr) {
      if (s.id === '3-7') {   // 老闆說「怎樣都是他扣」：預覽六格都要是他扣、你不扣
        const f = E.forecast(d, { type: 'card', i: sel, attr: 'c' });
        ok(f.slices.every(x => x.outcome && x.outcome.toE > 0 && x.outcome.toP === 0), out.route + ' 3-7「怎樣都是他扣」是真的', f.slices.map(x => x.outcome && [x.outcome.toE, x.outcome.toP]));
      }
      if (s.id === '1-5') {
        const f = E.forecast(d, { type: 'card', i: sel, attr: 'o' });
        ok(f.slices.filter(x => x.glyph === 'true').every(x => x.outcome.kind === 'counter'), out.route + ' 1-5 冷門剋他喊的經典');
      }
      ok(R.gate({ kind: 'attr', attr: a.attr, i: sel, id: d.p.hand[sel].id }) === true, out.route + ' ' + s.id + ' 屬性放行');
      commit({ type: 'card', i: sel, attr: a.attr });
      continue;
    }
    if (a.ace) { ok(R.gate({ kind: 'ace' }) === true, out.route + ' ' + s.id + ' 王牌放行'); continue; }
    if (a.aceAttr) {
      if (tier === 'hall') { const f = E.forecast(d, { type: 'ace' }); ok(f.slices.every(x => x.outcome.toE > 0 && x.outcome.toP === 0), out.route + ' 4-4「他晃也好，真也好」是真的'); }
      if (tier === 'heresy') { const f = E.forecast(d, { type: 'ace' }); ok(f.slices.filter(x => x.attr === 'h').length >= 4, out.route + ' 4-4「他多半出硬蕊」是真的'); }
      ok(R.gate({ kind: 'attr', attr: AXIS[tier], ace: true }) === true, out.route + ' ' + s.id + ' 王牌寬鈕放行');
      commit({ type: 'ace' });
      continue;
    }
    if (a.ult) { ok(R.text(s) === '氣勢 ' + d.p.qi + '：現在放！', out.route + ' 5-1 字帶當下氣勢', R.text(s)); ok(R.gate({ kind: 'ult' }) === true, out.route + ' 5-1 輾壓放行'); continue; }
    if (a.ultConfirm) { ok(R.gate({ kind: 'ultConfirm' }) === true, out.route + ' 5-2 確認放行'); commit({ type: 'ult' }); continue; }
    if (a.info) { ok(R.gate({ kind: 'info', where: a.info }) === true, out.route + ' ' + s.id + ' 開他的盤'); continue; }
    if (a.close) { ok(R.gate({ kind: 'close' }) === true, out.route + ' ' + s.id + ' 關閉'); continue; }
    ok(false, out.route + ' 不認得的步驟 ' + s.id);
    break;
  }
  out.duel = d; out.R = R;
  return out;
}

// 劇本的數字（tutorial-simplify.md §4.4）：他每手結算後的聲望
function expectedEhp(tier, l2card) {
  if (tier === 'pearl') return [19, 13, 7];
  const after2 = 19 - (l2card.o === 3 ? 3 : 2) + 1;      // 冷3 他扣 3／冷2 他扣 2；他出經典自己回 1
  const after3 = after2 - 6;
  const after4 = after3 - (tier === 'hall' ? 9 : 8);
  return [19, after2, after3, after4];
}
section('18 條路線（三張王牌 × 好耳朵 × 第 2 課選牌）：照劇本走完、品味輾壓收尾、你一滴血都沒少', () => {
  let n = 0, good = 0;
  for (const tier of TUT.TIERS) for (const q of [0, 1]) {
    const opts = tier === 'pearl' ? ['ace'] : [0, 1, 2, 3];
    for (const l2 of opts) {
      for (const seed of [7, 99, 20261107]) {
        const r = play(tier, q, l2, seed);
        const d = r.duel;
        const tag = r.route;
        const l2card = tier === 'pearl' ? null : C.cards[T.hand[tier][l2 + 1] || T.draw[tier][0]];   // L1 出掉 Bowie 之後的手牌：起手 2–4 張＋抽到的第一張
        ok(d.over === 'win', tag + ' 打贏', d.over);
        ok(r.R.state === 'done', tag + ' 教學走完（done）', r.R.state);
        ok(!r.koEarly, tag + ' 第 5 課之前沒有人倒下');
        eq(r.fc, 2, tag + ' 變臉在第 2 課那手');
        ok(r.php.every(h => h === 16), tag + ' 玩家聲望一直是 16', r.php);
        const last = r.hands[r.hands.length - 1];
        ok(last.act === 'ult' && last.kind === 'ult' && last.toE === last.qiBefore, tag + ' 品味輾壓收尾（傷害＝氣勢）', last);
        eq(r.hands.length, tier === 'pearl' ? 4 : 5, tag + ' 手數');
        const exp = expectedEhp(tier, l2card);
        eq(r.hands.slice(0, -1).map(h => h.ehp), exp, tag + ' 他每手結算後的聲望（劇本數字）');
        eq(r.hands[0].kind + '/' + r.hands[0].toE, 'counter/2', tag + ' 第 1 課：品味突襲 他扣 2');
        const l3 = r.hands[2];
        ok(l3.kind === 'counter' && l3.stamp === 'seeThrough' && l3.toE === 6, tag + ' 第 3 課：看穿 他扣 6', l3);
        if (tier === 'hall') ok(r.hands[3].kind === 'counter' && r.hands[3].stamp === 'seeThrough' && r.hands[3].toE === 9, tag + ' 第 4 課：殿堂 看穿 他扣 9', r.hands[3]);
        if (tier === 'heresy') ok(r.hands[3].kind === 'mirrorWin' && r.hands[3].toE === 8, tag + ' 第 4 課：異端 撞招 他扣 8', r.hands[3]);
        if (tier === 'pearl') ok(r.hands[1].act === 'ace' && r.hands[1].toE === 7, tag + ' 流亡第 2 課：王牌冷門 7 他扣 7', r.hands[1]);
        ok(r.previewsAt['1-5'] === false && r.previewsAt['2-2'] === false && r.previewsAt['3-6'] === true, tag + ' 預覽：第 1、2 課關著，3-5 起打開', r.previewsAt);
        eq(r.R.learned, tier === 'pearl' ? ['冷門剋經典', '王牌', '晃・經剋硬・硬剋冷', '品味輾壓'] : ['冷門剋經典', '晃・經剋硬・硬剋冷', '王牌', '品味輾壓'], tag + ' 學會的四張小卡');
        ok(r.blocks >= 5, tag + ' 每條路線都試過點錯被擋（' + r.blocks + '）');
        if (seed === 7) { n++; if (d.over === 'win' && r.fc === 2 && !r.koEarly && r.php.every(h => h === 16)) good++; console.log('     ' + tag.replace(' seed7', '') + ' → ' + r.hands.map(h => h.ehp).join('→') + '（' + r.steps.length + ' 步）'); }
      }
    }
  }
  eq(n, 18, '18 條路線');
  eq(good, 18, '18 條全部照劇本');
});

// ---------------------------------------------------------------------------
section('擋錯招（e2e #20 的純邏輯版）：1-4 點別張、1-5 點經典 → 不前進', () => {
  const d = newDuel('hall', 0, 7);
  const R = TUT.createRunner(C, 'hall', d);
  while (R.cur().id !== '1-4') { R.begin(); R.done(); }
  R.begin();
  const vi = d.p.hand.findIndex(c => c.id === 'vashti-bunyan-just-another-diamond-day');
  eq(R.gate({ kind: 'card', i: vi, id: d.p.hand[vi].id }), false, '1-4 點 Vashti 被擋');
  eq(R.last.wrong, 'target', '泡泡換「先點我指的這裡。」');
  eq(R.cur().id, '1-4', '還在 1-4');
  eq(R.gate({ kind: 'ace' }), false, '1-4 點王牌被擋');
  eq(R.gate({ kind: 'card', i: 0, id: JUNK }), true, '點 Bowie 放行');
  eq(R.cur().id, '1-5', '到 1-5');
  R.begin();
  eq(R.gate({ kind: 'attr', attr: 'c', i: 0, id: JUNK }), false, '1-5 點經典被擋');
  eq(R.gate({ kind: 'attr', attr: 'h', i: 0, id: JUNK }), false, '1-5 點硬蕊被擋');
  eq(R.gate({ kind: 'info', where: 'hand' }), false, '1-5 再點一次 Bowie（唱片資訊）被擋');
  eq(d.hand, 1, '引擎沒有前進');
  eq(R.forcedCell(), null, '還沒出牌，不指定格子');
  eq(R.gate({ kind: 'attr', attr: 'o', i: 0, id: JUNK }), true, '冷門放行');
  eq(d.e.disc[R.forcedCell()], 'true', '指定「真」那一格');
  eq(R.gate({ kind: 'card', i: 1, id: d.p.hand[1].id }), false, '結算中再點牌被擋');
});

section('prepareDuel（ui.js 用一般男子 16／12 開場之後再改成教學數字）＝content(C) 開場', () => {
  for (const tier of TUT.TIERS) {
    const pDef = { hp: E.CFG.prologueHp, maxHp: E.CFG.prologueHp, deck: [...C.gifts[tier], ...C.junk].map(card), ace: card(C.aces[tier]), ear: tier, relics: [], startQi: 0, reviveOnce: false };
    const man = C.enemies.man;
    const { duel } = E.startDuel(pDef, Object.assign({}, man, { deck: man.deck.map(card) }), Object.assign({ seed: 5, prologue: true }, TUT.startOpts(C)));
    TUT.prepareDuel(duel, { tier, content: C });
    eq([duel.e.hp, duel.e.maxHp, duel.e.phases[0].atHp], [20, 20, 18], tier + ' 男子改成 20／18');
    eq(duel.p.hand.map(c => c.id), T.hand[tier], tier + ' 起手');
    TUT.prepareDuel(duel, { tier, content: C });
    eq(duel.e.hp, 20, tier + ' 叫兩次也一樣');
    const ref = newDuel(tier, 0, 5);
    eq(E.view(duel).intent.slices.map(x => x.glyph), E.view(ref).intent.slices.map(x => x.glyph), tier + ' 第一手意圖相同');
    eq(duel.e.deck.map(c => c.id), ref.e.deck.map(c => c.id), tier + ' 他的牌序相同');
    eq(duel.p.deck.map(c => c.id), ref.p.deck.map(c => c.id), tier + ' 你的牌序相同');
  }
});

section('放手：5-1 出別張 → 教學結束、不再指定格子、預覽打開', () => {
  const r = play('hall', 0, 0, 7, { releaseAt51: true });
  eq(r.R.state, 'released', '狀態 released');
  eq(r.R.forcedCell(), null, '不再指定格子');
  eq(r.R.previewsOn(), true, '預覽打開');
  eq(r.R.gate({ kind: 'attr', attr: 'o', i: 0 }), true, '之後什麼都放行');
  eq(r.duel.p.hp, 16, '放手之前沒被扣血');
});

section('跳過：skip() 之後全部放行、不指定格子、預覽打開', () => {
  const d = newDuel('heresy', 1, 7);
  const R = TUT.createRunner(C, 'heresy', d);
  R.begin();
  eq(R.previewsOn(), false, '一開始預覽關著');
  R.skip();
  eq(R.state, 'skipped', 'skipped');
  eq(R.gate({ kind: 'card', i: 2, id: d.p.hand[2].id }), true, '放行');
  eq(R.previewsOn(), true, '預覽打開');
  eq(R.forcedCell(), null, '不指定格子');
});

section('重掛（B15）：依 duel.hand 從那一課開頭接；from 可指定步驟', () => {
  const d = newDuel('hall', 0, 7);
  eq(TUT.createRunner(C, 'hall', d).cur().id, 'D-1', '第 1 手從 D-1');
  eq(TUT.createRunner(C, 'hall', d, { from: '1-1' }).cur().id, '1-1', 'from 1-1');
  d.hand = 2; eq(TUT.createRunner(C, 'hall', d).cur().id, '1-6', '第 2 手從 1-6（第 1 手結算後的說明）');
  d.hand = 3; const r3 = TUT.createRunner(C, 'hall', d); eq(r3.cur().id, '2-7', '第 3 手從 2-7'); eq(r3.previewsOn(), false, '第 3 手開頭預覽還關著');
  d.hand = 4; const r4 = TUT.createRunner(C, 'hall', d); eq(r4.cur().id, '3-8', '第 4 手從 3-8'); eq(r4.previewsOn(), true, '第 4 手預覽打開');
  d.hand = 5; eq(TUT.createRunner(C, 'hall', d).cur().id, '4-6', '第 5 手從 4-6');
  d.hand = 4; eq(TUT.createRunner(C, 'pearl', d).cur().id, '3-8', '流亡第 4 手從 3-8（接著品味輾壓）');
});

section('敏感度（canon2 的表）：男子 16／12 照劇本不成立，20／18 才全部成立', () => {
  // 用原本的 16／12 跑同一份腳本：殿堂、異端會在王牌課就打倒他（教不到品味輾壓）
  const save = T.man; let early = 0, total = 0;
  try {
    T.man = { hp: 16, phases: [{ atHp: 12, disc: save.phases[0].disc }] };
    for (const tier of ['hall', 'heresy']) for (const l2 of [0, 1, 2, 3]) {
      total++;
      const d = newDuel(tier, 0, 7);
      const R = TUT.createRunner(C, tier, d);
      let broke = false, guard = 0, sel = null;
      while (R.active() && !d.over && guard++ < 200) {
        const s = R.begin(); const a = s.allow || {};
        if (s.kind === 'say') { R.done(); continue; }
        const go = act => { const evs = E.resolveTurn(d, act, { forcedCell: R.forcedCell() }); R.resolved(evs); R.handReady(); if (d.over && act.type !== 'ult') broke = true; };
        if (a.card) { const i = a.card === 'any' ? l2 : a.card === 'bestC' ? d.p.hand.findIndex(c => c.id === R.bestC) : d.p.hand.findIndex(c => c.id === a.card); R.gate({ kind: 'card', i, id: d.p.hand[i].id }); sel = i; if (a.attr) { R.gate({ kind: 'attr', attr: a.attr }); go({ type: 'card', i, attr: a.attr }); } continue; }
        if (a.attr) { R.gate({ kind: 'attr', attr: a.attr }); go({ type: 'card', i: sel, attr: a.attr }); continue; }
        if (a.aceAttr) { R.gate({ kind: 'attr', attr: AXIS[tier], ace: true }); go({ type: 'ace' }); continue; }
        if (a.ultConfirm) { R.gate({ kind: 'ultConfirm' }); go({ type: 'ult' }); continue; }
        R.gate(a.ace ? { kind: 'ace' } : a.ult ? { kind: 'ult' } : a.info ? { kind: 'info', where: a.info } : { kind: 'close' });
      }
      if (broke) early++;
    }
  } finally { T.man = save; }
  ok(early >= 6, '16／12：殿堂、異端多數路線在王牌課之前／當下就打倒他（' + early + '/' + total + '）');
});

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
