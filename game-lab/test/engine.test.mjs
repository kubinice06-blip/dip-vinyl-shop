// game-lab/test/engine.test.mjs — v3 engine unit / property tests (SPEC-v3 §11.1 + 發燒配件).  Plain node script:
//   node game-lab/test/engine.test.mjs [--quick]
// Exits 1 on any failure.  Uses the real content.js (cards.js).
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const EN = require(path.join(HERE, '../engine.js'));
const C = require(path.join(HERE, '../content.js'));
const { ATTRS, BEATS, COUNTER_OF, CFG, TIERS } = EN;
const QUICK = process.argv.includes('--quick');

// ---------------- tiny harness ----------------
let pass = 0, fail = 0; const fails = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; if (fails.length < 60) fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } return !!cond; }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); ok(A === B, name, A + ' !== ' + B); }
function section(name, fn) { const f0 = fail; const t0 = Date.now(); try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name + ' (' + (Date.now() - t0) + ' ms)'); }

// ---------------- helpers ----------------
const card = id => { const c = C.cards[id]; if (!c) throw new Error('missing card ' + id); return c; };
const ENEMY_IDS = ['man', ...C.normals, ...C.elites, C.boss];
const RELIC_IDS = Object.keys(C.relics);
const otherTier = (tier, k) => TIERS.filter(t => t !== tier)[k % 2];
function pDefFor(tier, o = {}) {
  return { hp: o.hp, bag: (o.bag || [...C.gifts[tier], ...C.junk]).map(card), ace: o.noAce ? null : card(C.aces[tier]), relics: (o.relics || []).map(r => EN.relicObj(r, C)) };
}
function startFor(id, tier, seed, o = {}) {
  const eDef = Object.assign(EN.enemyDef(C, id, { tutorial: !!o.tutorial }), o.eOver || {});
  return EN.startDuel(pDefFor(tier, o), eDef, { seed, enemyAce: eDef.boss ? card(C.aces[otherTier(tier, seed)]) : null, script: o.script || null, firstRecordId: o.firstRecordId });
}
// cards are never mutated by the rules → a structural clone that shares card objects is enough (fast)
function fastClone(st) {
  const P = st.p, E = st.e;
  return { ...st, over: st.over ? { ...st.over } : null, intent: st.intent ? { ...st.intent } : null, stats: { ...st.stats }, log: st.log.slice(), script: st.script ? { attrs: st.script.attrs.slice() } : null,
    p: { ...P, draw: P.draw.slice(), hand: P.hand.slice(), disc: P.disc.slice(), relics: P.relics.slice() },
    e: { ...E, pile: E.pile.slice(), thrown: E.thrown.slice() } };
}
const clashOf = evs => evs.find(e => e.t === 'clash');
const sig = r => r && { kind: r.kind, toE: r.toE, toP: r.toP, notes: (r.notes || []).filter(n => n.relic !== 'headphone') };
function lcg(s) { s = s >>> 0; return () => (s = (Math.imul(s, 1103515245) + 12345) >>> 0) / 4294967296; }
function play(d, pol, R, mem, max = 40) { const evs = []; let g = 0; while (!d.over && g++ < max) evs.push(...EN.resolveTurn(d, EN.policies[pol](d, R, mem))); return evs; }
function mkCard(id, c, o, h, tier) { return { id, artist: id, album: id, c, o, h, tier: tier || null }; }

// =====================================================================================================
section('1 preview === resolve（10 客人 × 3 王牌 × 400 種子；每一手每一個合法動作；配件組合）', () => {
  const seeds = QUICK ? 60 : 400;
  let checked = 0;
  for (const id of ENEMY_IDS) for (const tier of TIERS) for (let s = 1; s <= seeds; s++) {
    const relics = s % 4 === 0 ? [] : [RELIC_IDS[s % 6], RELIC_IDS[(s * 7 + 1) % 6], RELIC_IDS[(s * 13 + 2) % 6]].filter((x, k, a) => a.indexOf(x) === k).slice(0, 1 + (s % 3));
    const { duel } = startFor(id, tier, s * 7919 + 13, { relics });
    const R = lcg(s);
    let g = 0;
    while (!duel.over && g++ < 12) {
      const v = EN.view(duel);
      ok(!('intent' in v) && JSON.stringify(v).indexOf('habitAttr') < 0 && JSON.stringify(v).indexOf('"how"') < 0, 'view never carries the intent');
      const before = JSON.stringify(duel);
      const acts = EN.legalActions(duel);
      for (const act of acts) {
        const pv = EN.preview(duel, act);
        const c2 = fastClone(duel);
        const cl = clashOf(EN.resolveTurn(c2, act));
        if (!ok(!!pv && !!cl, 'preview/resolve exist', { id, tier, s })) continue;
        const want = sig(pv[cl.eAttr]);
        if (JSON.stringify(want) !== JSON.stringify(sig(cl))) ok(false, 'preview[eAttr] === clash', { id, tier, s, n: duel.n, act, want, got: sig(cl) });
        else pass++;
        checked++;
      }
      ok(JSON.stringify(duel) === before, 'preview is pure (state unchanged)', { id, tier, s, n: duel.n });
      const act = acts[Math.floor(R() * acts.length)];
      EN.resolveTurn(duel, act);
    }
    ok(!!duel.over, 'duel ends within 12 resolves', { id, tier, s });
  }
  console.log('     ' + checked + ' action previews checked');
});

section('2 照脾氣率：60,000 手中照名牌的比例 0.6±0.01（男子 1.0）；不照脾氣時三色各 1/3±0.01', () => {
  const target = QUICK ? 12000 : 60000;
  let hands = 0, same = 0, anyN = 0; const anyC = { c: 0, o: 0, h: 0 }; let manHands = 0, manSame = 0;
  for (let s = 1; hands < target; s++) {
    const id = [...C.normals, ...C.elites, C.boss][s % 9];
    const { duel } = startFor(id, TIERS[s % 3], s * 31 + 7);
    const R = lcg(s * 3 + 1);
    while (!duel.over) {
      const it = duel.intent;
      hands++; if (it.attr === it.habitAttr) same++;
      if (it.how === 'any') { anyN++; anyC[it.attr]++; }
      EN.resolveTurn(duel, EN.policies.random(duel, R));
    }
  }
  for (let s = 1; s <= 600; s++) {
    const { duel } = startFor('man', TIERS[s % 3], s);
    const R = lcg(s);
    while (!duel.over) { manHands++; if (duel.intent.attr === duel.intent.habitAttr) manSame++; EN.resolveTurn(duel, EN.policies.random(duel, R)); }
  }
  const f = same / hands;
  ok(Math.abs(f - 0.6) <= 0.01, 'follow rate 0.6 ± 0.01', f.toFixed(4));
  for (const a of ATTRS) ok(Math.abs(anyC[a] / anyN - 1 / 3) <= 0.01, 'random throw ' + a + ' 1/3 ± 0.01', (anyC[a] / anyN).toFixed(4));
  ok(manSame === manHands, 'man follows 100%', manSame + '/' + manHands);
  console.log('     follow ' + f.toFixed(4) + ' over ' + hands + ' hands; any c/o/h ' + ATTRS.map(a => (anyC[a] / anyN).toFixed(3)).join('/'));
});

section('3 決定性：同種子同動作 → 同事件；policies 同 R 同結果', () => {
  for (let s = 1; s <= 120; s++) {
    const id = ENEMY_IDS[s % 10], tier = TIERS[s % 3];
    const a = startFor(id, tier, s * 101), b = startFor(id, tier, s * 101);
    eq(a.events, b.events, 'start events equal');
    const ea = play(a.duel, 'learner', lcg(s)), eb = play(b.duel, 'learner', lcg(s));
    eq(ea, eb, 'event streams equal ' + id);
    eq(a.duel, b.duel, 'final state equal');
  }
  const r1 = EN.newRun(C, { seedKey: '2026-11-07', nightNo: 1, ace: 'hall' }), r2 = EN.newRun(C, { seedKey: '2026-11-07', nightNo: 1, ace: 'pearl' });
  eq(r1.order, r2.order, 'same date → same guests whatever the ace');
});

section('4 存讀檔：對決打到一半 JSON 存讀後接著打，事件一模一樣', () => {
  for (let s = 1; s <= 150; s++) {
    const id = ENEMY_IDS[s % 10], tier = TIERS[s % 3];
    const { duel } = startFor(id, tier, s * 977, { relics: [RELIC_IDS[s % 6]] });
    const R = lcg(s);
    for (let k = 0; k < 2 && !duel.over; k++) EN.resolveTurn(duel, EN.policies.novice(duel, R));
    if (duel.over) continue;
    const saved = JSON.parse(JSON.stringify(duel));
    const ra = lcg(s + 99), rb = lcg(s + 99);
    const ea = play(duel, 'sloppy', ra), eb = play(saved, 'sloppy', rb);
    eq(ea, eb, 'resumed events equal ' + id);
    eq(EN.view(duel), EN.view(saved), 'resumed view equal');
  }
});

section('5 規則抽查', () => {
  // the clash table
  eq(EN.clash(4, 'o', 5, 'c'), { kind: 'counter', toE: 4, toP: 0 }, '冷剋經：扣你的星');
  eq(EN.clash(3, 'c', 4, 'h'), { kind: 'counter', toE: 3, toP: 0 }, '經剋硬');
  eq(EN.clash(2, 'h', 5, 'o'), { kind: 'counter', toE: 2, toP: 0 }, '硬剋冷');
  eq(EN.clash(5, 'c', 2, 'o'), { kind: 'countered', toE: 0, toP: 2 }, '被剋：扣他的星');
  eq(EN.clash(4, 'h', 2, 'h'), { kind: 'mirrorWin', toE: 2, toP: 0 }, '同色你大：差額');
  eq(EN.clash(2, 'h', 4, 'h'), { kind: 'mirrorLose', toE: 0, toP: 2 }, '同色你小：差額');
  eq(EN.clash(3, 'o', 3, 'o'), { kind: 'tie', toE: 0, toP: 0 }, '同色同星：沒事');
  for (const x of ATTRS) { ok(EN.beats(x, BEATS[x]) && !EN.beats(BEATS[x], x), 'beats ' + x); ok(BEATS[COUNTER_OF[x]] === x, 'COUNTER_OF ' + x); }

  // ace: once, only the 7 axis
  for (const tier of TIERS) {
    const { duel } = startFor('copycat', tier, 5);
    const acts = EN.legalActions(duel), aces = acts.filter(a => a.ace);
    ok(aces.length === 1 && aces[0].attr === C.aceAxis[tier], 'one ace action on the 7 axis', aces);
    ok(acts.length === 10, '9 chips + ace', acts.length);
    ok(!EN.isLegal(duel, { ace: true, attr: ATTRS.find(a => a !== C.aceAxis[tier]) }), 'ace on another axis is illegal');
    const pv = EN.preview(duel, { ace: true });
    const cl = clashOf(EN.resolveTurn(duel, { ace: true }));
    ok(cl.ace && cl.pStar === 7 && cl.pAttr === C.aceAxis[tier], 'ace throws 7 on its axis', cl);
    eq(sig(pv[cl.eAttr]), sig(cl), 'ace preview');
    ok(!EN.legalActions(duel).some(a => a.ace) && !EN.isLegal(duel, { ace: true }), 'ace only once per duel');
    ok(EN.view(duel).ace === null && EN.view(duel).aceUsed && EN.view(duel).aceCard.id === C.aces[tier], 'view after the ace');
    const before = JSON.stringify(duel);
    eq(EN.resolveTurn(duel, { ace: true }), [], 'illegal act → no events');
    ok(JSON.stringify(duel) === before, 'illegal act changes nothing');
  }

  // first hand: copy/grudge/repeat/rot fall back to his biggest star; view.first
  for (const id of ENEMY_IDS) for (let s = 1; s <= 30; s++) {
    const { duel } = startFor(id, TIERS[s % 3], s * 17);
    const E = C.enemies[id];
    const fb = !!EN.USES_LAST[E.habit];
    ok(EN.view(duel).first === fb, 'view.first on hand 1 ' + id);
    if (fb) ok(EN.habitAttrOf(duel) === EN.topAxis(duel.e.card, E.taste), 'first hand → his biggest star ' + id);
    EN.resolveTurn(duel, EN.policies.random(duel, lcg(s)));
    if (!duel.over) ok(EN.view(duel).first === false, 'view.first false on hand 2 ' + id);
  }

  // 盯手: biggest star in your hand, ace = leftmost, ties c→o→h
  const A = mkCard('a', 5, 1, 1, 'hall'), X = mkCard('x', 2, 5, 1), Y = mkCard('y', 5, 1, 1), Z = mkCard('z', 4, 4, 4), W = mkCard('w', 1, 5, 5);
  eq(EN.handTopAxis([X, Y, Z], null), { i: 0, attr: 'o' }, '盯手：並列取最左');
  eq(EN.handTopAxis([Z, Y, X], null), { i: 1, attr: 'c' }, '盯手：最大的那顆');
  eq(EN.handTopAxis([W, Z, Z], null), { i: 0, attr: 'o' }, '盯手：同一張並列照經→冷→硬');
  eq(EN.handTopAxis([X, Y, Z], A), { i: 'ace', attr: 'c' }, '盯手：王牌算最左');
  ok(EN.habitAttr('eye', { top: 'c', hand: [X, Y, Z], ace: null }) === COUNTER_OF.o, '盯手丟剋它的');
  {
    const { duel } = startFor('needle', 'pearl', 3);
    const v = EN.view(duel);
    eq(v.eyeTarget, { i: 'ace', attr: 'o' }, 'eyeTarget = the unused ace');
    ok(EN.habitAttrOf(duel) === 'h', '盯手 vs 流亡 → 硬蕊');
    ok(EN.view(startFor('copycat', 'pearl', 3).duel).eyeTarget === null, 'eyeTarget only for 盯手');
  }

  // 急了 at ≤ ⌊hp/2⌋, once; not when he is down
  for (const id of ['label', 'critic', 'boss']) {
    const E = C.enemies[id], half = Math.floor(E.hp / 2);
    const { duel } = startFor(id, 'hall', 11);
    ok(EN.view(duel).notch === half && EN.view(duel).habitLabel === (E.habitLabel || C.habitLabels.base), 'notch / label ' + id);
    let evs = EN.resolveTurn(duel, EN.legalActions(duel)[0], { debugOutcome: { kind: 'counter', toE: E.hp - half - 1, toP: 0 } });
    ok(!evs.some(e => e.t === 'switch') && duel.e.hp === half + 1, 'no switch above the notch ' + id);
    evs = EN.resolveTurn(duel, EN.legalActions(duel)[0], { debugOutcome: { kind: 'counter', toE: 1, toP: 0 } });
    const sw = evs.find(e => e.t === 'switch');
    ok(!!sw && sw.habit === E.phase2 && duel.e.habit === E.phase2 && sw.line === C.habits[E.phase2].line && sw.label === E.phase2Label, 'switch at ⌊hp/2⌋ ' + id, sw);
    ok(evs.findIndex(e => e.t === 'switch') < evs.findIndex(e => e.t === 'hand'), 'switch before the next hand');
    const v = EN.view(duel);
    ok(v.switched && v.habitLine === C.habits[E.phase2].line && v.habitLabel === E.phase2Label, 'view after switch ' + id);
    evs = EN.resolveTurn(duel, EN.legalActions(duel)[0], { debugOutcome: { kind: 'counter', toE: 1, toP: 0 } });
    ok(!evs.some(e => e.t === 'switch'), 'switch only once ' + id);
    const k = startFor(id, 'hall', 12).duel;
    evs = EN.resolveTurn(k, EN.legalActions(k)[0], { debugOutcome: { kind: 'counter', toE: E.hp, toP: 0 } });
    ok(!evs.some(e => e.t === 'switch') && k.over && k.over.win, 'no switch on the KO hand ' + id);
  }
  ok(!C.enemies.copycat.phase2 && EN.view(startFor('copycat', 'hall', 1).duel).notch === null, 'normal guests have no notch');

  // pile out: compare 聲望, equal → you win
  const pileOut = (pDrop, eDrop) => {
    const { duel } = startFor('copycat', 'hall', 21);
    EN.resolveTurn(duel, EN.legalActions(duel)[0], { debugOutcome: { kind: 'counter', toE: eDrop, toP: pDrop } });
    let evs = [];
    while (!duel.over) evs = EN.resolveTurn(duel, EN.legalActions(duel)[0], { debugOutcome: { kind: 'tie', toE: 0, toP: 0 } });
    return { over: duel.over, n: duel.n, last: evs[evs.length - 1] };
  };
  let r = pileOut(0, 4);   // 10 vs 10
  ok(r.over.by === 'pile' && r.over.win === true && r.n === 7 && r.last.t === 'over', '唱片丟完、聲望一樣 → 你贏', r);
  r = pileOut(0, 3); ok(r.over.by === 'pile' && r.over.win === false, '唱片丟完、他多 → 你輸', r);
  r = pileOut(2, 9); ok(r.over.by === 'pile' && r.over.win === true, '唱片丟完、你多 → 你贏', r);
  // both ≤0 on the same hand: compare what is left (negatives too); equal → you win
  const bothDown = (pLeft, eLeft) => {
    const { duel } = startFor('copycat', 'hall', 22);
    EN.resolveTurn(duel, EN.legalActions(duel)[0], { debugOutcome: { kind: 'counter', toE: duel.e.hp - eLeft, toP: duel.p.hp - pLeft } });
    return duel.over;
  };
  eq(bothDown(-1, -3), { win: true, by: 'hp' }, '兩邊都 ≤0：你剩得多 → 你贏');
  eq(bothDown(-3, -1), { win: false, by: 'hp' }, '兩邊都 ≤0：他剩得多 → 你輸');
  eq(bothDown(0, 0), { win: true, by: 'hp' }, '兩邊都 0 → 你贏');
  eq(bothDown(-2, -2), { win: true, by: 'hp' }, '兩邊一樣負 → 你贏');
  eq(bothDown(3, 0), { win: true, by: 'hp' }, '他歸零 → 你贏');
  eq(bothDown(0, 5), { win: false, by: 'hp' }, '你歸零 → 你輸');

  // 看穿 = he followed his name tag AND you countered; followed = eAttr === the tag's colour at the start of the hand
  let reads = 0;
  for (let s = 1; s <= 300; s++) {
    const { duel } = startFor(ENEMY_IDS[1 + (s % 9)], TIERS[s % 3], s * 13);
    const R = lcg(s);
    while (!duel.over) {
      const h = EN.habitAttrOf(duel);
      const cl = clashOf(EN.resolveTurn(duel, EN.policies.sloppy(duel, R)));
      ok(cl.followed === (cl.eAttr === h), 'followed === (eAttr === tag colour)');
      ok(cl.read === (cl.followed && cl.kind === 'counter'), 'read === followed && counter');
      if (cl.read) reads++;
    }
  }
  ok(reads > 300, 'reads happen', reads);

  // draw: slot refilled at the same index; the ace never refills; discards reshuffle
  {
    const { duel } = startFor('copycat', 'hall', 7);
    const before = duel.p.hand.slice();
    const evs = EN.resolveTurn(duel, { i: 1, attr: 'o' });
    const d = evs.find(e => e.t === 'draw');
    ok(d && d.i === 1 && duel.p.hand[1] === d.card && duel.p.hand[0] === before[0] && duel.p.hand[2] === before[2], 'slot 1 refilled in place');
    ok(evs.map(e => e.t).join() === (duel.over ? 'clash,draw,over' : 'clash,draw,hand'), 'event order clash→draw→hand', evs.map(e => e.t));
    let resh = false, guard = 0;
    while (!duel.over && guard++ < 10) { const e2 = EN.resolveTurn(duel, { i: 0, attr: 'c' }); if (e2.some(e => e.t === 'draw' && e.reshuffled)) resh = true; ok(duel.p.hand.every(Boolean), 'hand always full'); }
    const k = startFor('copycat', 'hall', 8).duel;
    const ea = EN.resolveTurn(k, { ace: true });
    ok(!ea.some(e => e.t === 'draw') && k.p.hand.length === 3, 'the ace does not draw');
    // a long fight (7 hands, no ace) needs a reshuffle with a 7-card bag
    const L = startFor('copycat', 'hall', 9).duel; let rs = false;
    while (!L.over) { const e3 = EN.resolveTurn(L, { i: 0, attr: 'c' }, { debugOutcome: { kind: 'tie', toE: 0, toP: 0 } }); if (e3.some(e => e.t === 'draw' && e.reshuffled)) rs = true; }
    ok(rs && L.n === 7, 'discards reshuffle into the draw pile', { rs, n: L.n });
    void resh;
  }
  // never more than 7 hands; his pile counts down; boss carries 6 + your unchosen ace
  for (const id of ENEMY_IDS) {
    const { duel, events } = startFor(id, 'hall', 4);
    const E = C.enemies[id];
    ok(events.length === 1 && events[0].t === 'hand' && events[0].n === 1, 'startDuel → hand 1 event');
    eq(EN.view(duel).pileMax, E.deck.length + (E.boss ? 1 : 0), 'pileMax ' + id);
    eq(EN.view(duel).pile, E.deck.length + (E.boss ? 1 : 0) - 1, 'pile under the face-up record ' + id);
  }
});

section('6 每一種脾氣（名牌那句算出來的顏色；照脾氣率 1 時他每手都照它丟）', () => {
  const card5 = mkCard('k', 2, 5, 3);   // top o (taste coh)
  const cases = {
    honest: [{ top: 'o' }, 'o'],
    copy:   [{ top: 'o', pLast: 'h' }, 'h'],
    grudge: [{ top: 'o', pLast: 'h' }, COUNTER_OF.h],
    repeat: [{ top: 'o', eLast: 'c' }, 'c'],
    rot:    [{ top: 'o', eLast: 'o' }, BEATS.o],
    bluff:  [{ top: 'o' }, BEATS.o],
    eye:    [{ top: 'o', hand: [card5], ace: null }, COUNTER_OF.o],
  };
  for (const [h, [ctx, want]] of Object.entries(cases)) ok(EN.habitAttr(h, ctx) === want, 'habit ' + h, EN.habitAttr(h, ctx));
  eq(EN.HABIT_KEYS.slice().sort(), Object.keys(C.habits).sort(), 'every habit has a name-tag line');
  // rot follows the arrows 冷→經→硬→冷
  ok(EN.habitAttr('rot', { top: 'c', eLast: 'o' }) === 'c' && EN.habitAttr('rot', { top: 'c', eLast: 'c' }) === 'h' && EN.habitAttr('rot', { top: 'c', eLast: 'h' }) === 'o', '輪流：冷→經→硬→冷');
  // with p = 1 every hand equals the formula computed from what is on screen (his record, both last throws, your hand)
  for (const h of EN.HABIT_KEYS) for (let s = 1; s <= 60; s++) {
    const { duel } = startFor('copycat', TIERS[s % 3], s * 3, { eOver: { habit: h, phase2: null, p: 1 } });
    const R = lcg(s); let pLast = null, eLast = null;
    while (!duel.over) {
      const v = EN.view(duel);
      const top = EN.topAxis(v.eCard, C.enemies.copycat.taste);
      const want = { honest: top, copy: pLast || top, grudge: pLast ? COUNTER_OF[pLast] : top, repeat: eLast || top, rot: eLast ? BEATS[eLast] : top,
        bluff: BEATS[top], eye: COUNTER_OF[(EN.handTopAxis(v.hand, v.ace) || {}).attr] }[h];
      const cl = clashOf(EN.resolveTurn(duel, EN.policies.random(duel, R)));
      if (cl.eAttr !== want) ok(false, 'p=1 habit ' + h, { s, n: cl.n, want, got: cl.eAttr }); else pass++;
      ok(cl.followed, 'p=1 always followed');
      pLast = cl.pAttr; eLast = cl.eAttr;
    }
  }
});

section('7 每一件發燒配件', () => {
  eq(RELIC_IDS.sort(), ['cleaner', 'dustcover', 'headphone', 'obi', 'stylus', 'testpress'], '6 relics');
  eq(C.rewards.prologueRelics, ['dustcover', 'stylus', 'cleaner'], '序章三選一：防塵套／黑膠唱針／洗碟水');
  for (const id of RELIC_IDS) ok(C.relics[id].desc && C.relics[id].note && C.relics[id].name && C.relics[id].icon, 'relic text ' + id);
  // engine-level, forced colours (script attrs) so we know what he throws
  const duelWith = (relics, attrs, seed = 5) => startFor('copycat', 'hall', seed, { relics, script: { attrs } }).duel;
  const chipOf = (d, attr) => EN.bestChip(d, attr);
  // color relics: +1 on a counter of that colour only
  for (const [rid, a] of [['obi', 'c'], ['testpress', 'o'], ['stylus', 'h']]) {
    const d = duelWith([rid], [BEATS[a], BEATS[BEATS[a]]]);
    const act = chipOf(d, a), st = d.p.hand[act.i][a];
    const pv = EN.preview(d, act);
    const cl = clashOf(EN.resolveTurn(d, act));
    ok(cl.kind === 'counter' && cl.toE === st + 1 && cl.notes.length === 1 && cl.notes[0].relic === rid && cl.notes[0].text === C.relics[rid].note, rid + ' 剋中多扣 1', cl);
    eq(sig(pv[cl.eAttr]), sig(cl), rid + ' preview');
    // other colours untouched
    const other = ATTRS.find(x => x !== a);
    const d2 = duelWith([rid], [BEATS[other]]);
    const act2 = chipOf(d2, other), cl2 = clashOf(EN.resolveTurn(d2, act2));
    ok(cl2.kind === 'counter' && cl2.toE === d2.p.disc[0][other] && !cl2.notes.length, rid + ' no bonus on ' + other, cl2);
  }
  // dustcover: the first counter against you each fight is 1 smaller; only once
  {
    const d = duelWith(['dustcover'], ['o', 'o', 'o']);
    const pv = EN.preview(d, { i: 0, attr: 'c' });
    const c1 = clashOf(EN.resolveTurn(d, { i: 0, attr: 'c' }));
    ok(c1.kind === 'countered' && c1.toP === c1.eStar - CFG.dustcoverCut && c1.notes[0].relic === 'dustcover', '防塵套：第一次被剋少扣', c1);
    eq(sig(pv.o), sig(c1), 'dustcover preview');
    ok(EN.view(d).dustUsed, 'dustUsed after');
    const pv2 = EN.preview(d, { i: 0, attr: 'c' });
    const c2 = clashOf(EN.resolveTurn(d, { i: 0, attr: 'c' }));
    ok(c2.kind === 'countered' && c2.toP === c2.eStar && !c2.notes.length, '防塵套：第二次照扣', c2);
    eq(sig(pv2.o), sig(c2), 'dustcover preview after use');
  }
  // cleaner: tie → you take 1 off him
  {
    let found = false;
    for (let s = 1; s < 400 && !found; s++) {
      const d = duelWith(['cleaner'], ['c'], s);
      const eStar = d.e.card.c;
      const i = d.p.hand.findIndex(c => c.c === eStar);
      if (i < 0) continue;
      found = true;
      const cl = clashOf(EN.resolveTurn(d, { i, attr: 'c' }));
      ok(cl.kind === 'tie' && cl.toE === 1 && cl.toP === 0 && cl.notes[0].relic === 'cleaner', '洗碟水：同色同星你扣他 1', cl);
    }
    ok(found, 'found a tie for cleaner');
  }
  // headphone: hand 1 always follows the tag (even at p = 0); hand 2 does not care; note on hand 1 only
  {
    let n1 = 0, f1 = 0, f2 = 0, n2 = 0;
    for (let s = 1; s <= 300; s++) {
      const { duel } = startFor('copycat', TIERS[s % 3], s, { relics: ['headphone'], eOver: { p: 0 } });
      ok(duel.intent.attr === duel.intent.habitAttr, 'headphone hand 1 follows');
      const cl = clashOf(EN.resolveTurn(duel, EN.policies.random(duel, lcg(s))));
      n1++; if (cl.followed) f1++;
      ok(cl.notes.some(x => x.relic === 'headphone' && x.text === C.relics.headphone.note), 'headphone note on hand 1');
      if (duel.over) continue;
      n2++; if (duel.intent.attr === duel.intent.habitAttr) f2++;
      const c2 = clashOf(EN.resolveTurn(duel, EN.policies.random(duel, lcg(s + 1))));
      ok(!c2.notes.some(x => x.relic === 'headphone'), 'no headphone note on hand 2');
    }
    ok(f1 === n1 && f2 / n2 < 0.6, 'headphone only on hand 1', { f1, n1, f2, n2 });
    const man = startFor('man', 'hall', 1, { relics: ['headphone'] }).duel;
    ok(!clashOf(EN.resolveTurn(man, { i: 0, attr: 'o' })).notes.some(x => x.relic === 'headphone'), 'no headphone note vs the man (he always follows)');
  }
  // at most 3 relics in a duel; view lists them with text
  {
    const d = startFor('copycat', 'hall', 1, { relics: ['obi', 'stylus', 'cleaner', 'dustcover'] }).duel;
    ok(d.p.relics.length === 3, 'relics capped at 3');
    const v = EN.view(d);
    ok(v.relics.every(r => r.name && r.icon && r.line && r.note), 'view.relics carry name/icon/line/note', v.relics);
  }
});

section('8 newRun：500 種子 × 3 王牌（今晚來客、序章只在第一晚、藏家帶你沒選的王牌）', () => {
  const seeds = QUICK ? 120 : 500;
  for (let s = 0; s < seeds; s++) for (const ace of TIERS) {
    const run = EN.newRun(C, { seedKey: 'd' + s, nightNo: 1 + (s % 3), ace });
    const normals = run.order.slice(0, 3);
    ok(run.order.length === 5 && normals.every(id => C.normals.includes(id)) && new Set(normals).size === 3, '3 distinct normals', run.order);
    ok(C.elites.includes(run.order[3]) && run.order[4] === C.boss, 'elite then boss', run.order);
    ok(run.prologue === (run.nightNo === 1 ? 'pending' : null), 'prologue only on the first night');
    ok(run.bossAce !== ace && TIERS.includes(run.bossAce), 'boss ace = one you did not pick');
    eq(run.bag, [...C.gifts[ace], ...C.junk], 'bag = 4 gifts + 3 junk');
    ok(run.bag.length === CFG.bagStart && run.retryLeft === 1 && run.relics.length === 0 && run.times.length === 5, 'run defaults');
    eq(EN.nextStep(run), run.nightNo === 1 ? 'prologue' : 'fight', 'first step');
  }
  // the boss's pile holds the unchosen ace
  for (const ace of TIERS) {
    const run = EN.newRun(C, { seedKey: 'boss', nightNo: 2, ace });
    run.idx = 4;
    const f = EN.startFight(run, C);
    ok(f.enemyId === C.boss && [f.duel.e.card, ...f.duel.e.pile].some(c => c.id === C.aces[run.bossAce]) && f.duel.e.deckSize === 7, 'boss carries your unchosen ace');
  }
  // relics carried in, capped, unknown ids dropped
  const r = EN.newRun(C, { seedKey: 'x', ace: 'hall', relics: ['obi', 'nope', 'obi', 'stylus', 'cleaner', 'testpress'] });
  eq(r.relics, ['obi', 'stylus', 'cleaner'], 'carried relics: known, unique, ≤3');
  eq(EN.current(r, C), 'man', 'current = man while the prologue is pending');
  const f1 = EN.startFight(r, C), f2 = EN.startFight(r, C);
  ok(f2.resumed && f2.duel === f1.duel && f2.events.length === 0 && EN.nextStep(r) === 'duel', 'startFight with a fight in progress resumes it');
});

section('9 整晚（照名牌、粗心、亂丟；runPolicy）：一定結束、沒有非法選擇', () => {
  const nights = QUICK ? 60 : 300;
  let clears = 0;
  for (let s = 0; s < nights; s++) for (const pol of ['novice', 'sloppy', 'random']) {
    const run = EN.newRun(C, { seedKey: 'n' + s, nightNo: 1 + (s % 2), ace: TIERS[s % 3] });
    const R = lcg(s * 7 + pol.length);
    let guard = 0, manTries = 0;
    while (EN.nextStep(run) && guard++ < 120) {
      const step = EN.nextStep(run);
      if (step === 'reward' || step === 'retry') {
        if (step === 'retry' && run.pending.free && manTries > 25) break;
        const ch = EN.runPolicy(run, C);
        const res = EN.choose(run, C, ch);
        ok(res.ok, 'runPolicy choice valid', { ch, err: res.error, pending: run.pending });
        if (!res.ok) break;
        continue;
      }
      const f = EN.startFight(run, C);
      ok(!!f && !!f.duel, 'startFight works at ' + step);
      if (f.enemyId === 'man') manTries++;
      play(f.duel, pol, R);
      ok(!!f.duel.over && f.duel.n <= 7, 'fight ends ≤7 hands');
      const fin = EN.finishFight(run, C, f.duel);
      ok(fin.win === f.duel.over.win && Array.isArray(fin.met), 'finishFight');
      ok(run.bag.length <= CFG.bagMax && run.relics.length <= CFG.relicMax, 'bag ≤8, relics ≤3');
    }
    if (pol === 'novice') { ok(!!run.over, 'novice night always ends', { s, step: EN.nextStep(run) }); if (run.over === 'clear') clears++; }
    if (run.over === 'clear') ok(run.idx === 5 && run.stats.wins >= 5, 'clear = 5 wins');
    if (run.over === 'dead') ok(run.stats.lostAt && run.stats.lostAt.enemyId, 'dead records lostAt');
    ok(run.stats.met.length >= 3, 'met records go to the shelf');
  }
  ok(clears / nights > 0.6, 'novice clears most first/second nights with 說情', clears / nights);
});

section('10 跑到一半存讀檔（run 與對決一起 JSON）', () => {
  for (let s = 0; s < 40; s++) {
    const mk = () => EN.newRun(C, { seedKey: 'save' + s, ace: TIERS[s % 3] });
    const a = mk(), b = mk();
    const step = (run, R) => {
      const st = EN.nextStep(run);
      if (st === 'reward' || st === 'retry') return EN.choose(run, C, EN.runPolicy(run, C));
      if (st === 'duel') { const d = run.duel; EN.resolveTurn(d, EN.policies.novice(d, R)); if (d.over) EN.finishFight(run, C, d); return; }
      const f = EN.startFight(run, C); EN.resolveTurn(f.duel, EN.policies.novice(f.duel, R)); if (f.duel.over) EN.finishFight(run, C, f.duel);
    };
    const Ra = lcg(s), Rb = lcg(s);
    for (let k = 0; k < 9 && EN.nextStep(a); k++) { step(a, Ra); step(b, Rb); }
    const saved = JSON.parse(JSON.stringify(b));
    for (let k = 0; k < 80 && EN.nextStep(a); k++) { step(a, Ra); step(saved, Rb); }
    eq(a, saved, 'run resumed from JSON plays out the same ' + s);
  }
});

section('11 choose：take（含包包滿要換）、relic（含滿 3 件）、skip、retry、end；錯的選擇不改狀態', () => {
  const winFight = (run) => { const f = EN.startFight(run, C); while (!f.duel.over) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } }); return EN.finishFight(run, C, f.duel); };
  const loseFight = (run) => { const f = EN.startFight(run, C); while (!f.duel.over) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'countered', toE: 0, toP: 99 } }); return EN.finishFight(run, C, f.duel); };
  const same = (run, fn, name) => { const before = JSON.stringify(run); const r = fn(); ok(!r.ok && JSON.stringify(run) === before, name + ' → error, unchanged', r); return r; };
  // prologue: lose → free retry; win → Fishmans + 3 relics (cardThenRelic)
  const run = EN.newRun(C, { seedKey: 'ch', ace: 'pearl' });
  let fin = loseFight(run);
  ok(fin.offer.type === 'retry' && fin.offer.free && EN.nextStep(run) === 'retry', 'prologue loss → free retry');
  ok(EN.choose(run, C, { type: 'retry' }).ok && run.retryLeft === 1 && EN.nextStep(run) === 'prologue', 'free retry keeps 老闆說情');
  fin = winFight(run);
  ok(fin.offer.need === 'cardThenRelic' && fin.offer.cards[0] === C.enemies.man.drop && fin.offer.relics.join() === C.rewards.prologueRelics.join(), 'prologue reward', fin.offer);
  same(run, () => EN.choose(run, C, { type: 'take', cardId: 'nope' }), 'take unoffered');
  same(run, () => EN.choose(run, C, { type: 'relic', relicId: 'obi' }), 'relic unoffered');
  same(run, () => EN.choose(run, C, { type: 'retry' }), 'retry without a loss');
  ok(EN.choose(run, C, { type: 'take', cardId: C.enemies.man.drop }).ok && run.bag.length === 8 && run.pending && !run.pending.relicDone, 'take Fishmans → relic next');
  ok(EN.choose(run, C, { type: 'relic', relicId: 'stylus' }).ok && run.relics.join() === 'stylus' && run.pending === null && run.prologue === 'done', 'pick 黑膠唱針');
  eq(EN.nextStep(run), 'fight', 'then 今晚來客');
  eq(EN.current(run, C), run.order[0], 'first guest');
  // normal win with a full bag
  fin = winFight(run);
  ok(fin.offer.need === 'card' && fin.offer.cards.length > 0 && !fin.offer.relics.length, 'normal reward = his records', fin.offer);
  ok(fin.offer.cards.every(id => !C.cards[id].tier && !run.bag.includes(id)), 'offer: no aces, nothing you own');
  same(run, () => EN.choose(run, C, { type: 'take', cardId: fin.offer.cards[0] }), 'take with a full bag and no drop');
  const r1 = EN.choose(run, C, { type: 'take', cardId: fin.offer.cards[0], dropId: run.bag[0] });
  ok(r1.ok && run.bag.length === 8 && run.bag.includes(fin.offer.cards[0]) && run.idx === 1 && !run.pending, 'take with drop', r1);
  // second normal: skip
  fin = winFight(run);
  ok(EN.choose(run, C, { type: 'skip' }).ok && run.idx === 2 && !run.pending, 'skip');
  // third normal: lose → 老闆說情 → lose again → end
  fin = loseFight(run);
  ok(fin.offer.type === 'retry' && !fin.offer.free, '老闆說情 offered');
  ok(EN.choose(run, C, { type: 'retry' }).ok && run.retryLeft === 0 && EN.current(run, C) === run.order[2], 'retry the same guest');
  const f3 = EN.startFight(run, C); ok(f3.duel.p.hp === CFG.playerHp, '聲望回滿');
  while (!f3.duel.over) EN.resolveTurn(f3.duel, EN.legalActions(f3.duel)[0], { debugOutcome: { kind: 'countered', toE: 0, toP: 99 } });
  fin = EN.finishFight(run, C, f3.duel);
  ok(fin.over === 'dead' && run.over === 'dead' && fin.offer === null && run.stats.lostAt.enemyId === run.order[2], 'second loss → 散場');
  ok(EN.nextStep(run) === null && EN.startFight(run, C) === null, 'nothing after 散場');
  // end instead of retry
  const r2 = EN.newRun(C, { seedKey: 'end', nightNo: 2, ace: 'hall' });
  loseFight(r2);
  ok(EN.choose(r2, C, { type: 'end' }).ok && r2.over === 'dead', 'end → 散場');
  // elite: card OR relic; relics full needs a drop
  const r3 = EN.newRun(C, { seedKey: 'elite', nightNo: 2, ace: 'heresy', relics: ['obi', 'stylus', 'cleaner'] });
  r3.idx = 3;
  fin = winFight(r3);
  ok(fin.offer.need === 'cardOrRelic' && fin.offer.relics.length === 1 && !r3.relics.includes(fin.offer.relics[0]), 'elite offers a relic you do not have', fin.offer);
  same(r3, () => EN.choose(r3, C, { type: 'relic', relicId: fin.offer.relics[0] }), 'relic with 3 carried and no drop');
  const rr = EN.choose(r3, C, { type: 'relic', relicId: fin.offer.relics[0], dropRelicId: 'obi' });
  ok(rr.ok && r3.relics.length === 3 && !r3.relics.includes('obi') && r3.idx === 4 && !r3.pending, 'relic with drop → done (no card)', rr);
  // boss win → clear at once, reward still choosable
  fin = winFight(r3);
  ok(r3.over === 'clear' && fin.offer && fin.offer.need === 'cardOrRelic' && EN.nextStep(r3) === 'reward', 'boss win: clear + reward');
  ok(EN.choose(r3, C, { type: 'take', cardId: fin.offer.cards[0], dropId: r3.bag[0] }).ok && EN.nextStep(r3) === null && r3.over === 'clear', 'boss reward taken');
});

section('12 policies：都有、都合法、同 R 同結果', () => {
  const names = ['random', ...EN.FORMULAS, 'novice', 'reader', 'sloppy', 'learner', 'veteran', 'oracle'];
  for (const n of names) ok(typeof EN.policies[n] === 'function', 'policy ' + n);
  for (const n of names) for (let s = 1; s <= 25; s++) {
    const id = ENEMY_IDS[s % 10];
    const a = startFor(id, TIERS[s % 3], s * 5).duel, b = startFor(id, TIERS[s % 3], s * 5).duel;
    const Ra = lcg(s), Rb = lcg(s);
    while (!a.over) {
      const x = EN.policies[n](a, Ra), y = EN.policies[n](b, Rb);
      if (!EN.isLegal(a, x)) { ok(false, 'legal ' + n, x); break; }
      eq(x, y, 'deterministic ' + n);
      EN.resolveTurn(a, x); EN.resolveTurn(b, y);
    }
  }
  // without an rng they still work (fallback is deterministic)
  const d = startFor('copycat', 'hall', 3).duel;
  eq(EN.policies.random(d), EN.policies.random(d), 'random without R is deterministic');
  // the oracle never loses a hand it can win outright
  let w = 0; for (let s = 1; s <= 200; s++) { const k = startFor(ENEMY_IDS[1 + s % 9], TIERS[s % 3], s).duel; play(k, 'oracle'); if (k.over.win) w++; }
  ok(w / 200 >= 0.99, 'oracle ≥99%', w / 200);
});

section('13 教學劇本（script）：三種王牌照手指打，前三手 §8 的傷害、第 4 手收掉；firstRecordId', () => {
  for (const tier of TIERS) {
    const run = EN.newRun(C, { seedKey: 'tut', ace: tier });
    const f = EN.startFight(run, C, { tutorial: true });
    const d = f.duel;
    ok(d.e.hp === C.tutorial.hp && d.e.max === 14 && f.enemyId === 'man', 'tutorial man 14');
    eq([d.e.card.id, ...d.e.pile.map(c => c.id)], C.tutorial.records, 'his records in script order');
    eq(d.p.hand.map(c => c.id), C.tutorial.script[tier].hand, 'scripted opening hand');
    const dmg = [];
    for (const a of ['o', 'c', 'h']) {
      const act = EN.bestChip(d, a);
      ok(act && !act.ace, 'best chip is in the hand (not the ace)');
      const cl = clashOf(EN.resolveTurn(d, act));
      ok(cl.kind === 'counter' && cl.toP === 0 && cl.eAttr === C.tutorial.attrs[dmg.length], 'scripted hand is a clean counter', cl);
      dmg.push(cl.toE);
    }
    eq(dmg, C.tutorial.expect[tier], 'tutorial damage ' + tier);
    ok(!d.over && d.n === 4 && d.e.card.id === 'imagine-dragons-night-visions', 'hand 4 = Imagine Dragons');
    ok(EN.legalActions(d).some(a => a.ace), 'ace still there for step 10');
    // any counter finishes it on hand 4
    for (const act of EN.legalActions(d)) {
      const c2 = fastClone(d); const evs = EN.resolveTurn(c2, act); const cl = clashOf(evs);
      if (cl.kind === 'counter') ok(c2.over && c2.over.win, 'any counter on hand 4 finishes ' + tier, { act, cl });
    }
    // skipping the tutorial: the man has 10 and no script
    const run2 = EN.newRun(C, { seedKey: 'tut', ace: tier });
    const g = EN.startFight(run2, C);
    ok(g.duel.e.max === 10 && !g.duel.script && g.duel.e.p === 1, '直接開打：男子 10、照脾氣 100%');
  }
  // the retort: his first record is Mylo Xyloto
  for (let s = 0; s < 20; s++) {
    const run = EN.newRun(C, { seedKey: 'jab' + s, ace: TIERS[s % 3] });
    const f = EN.startFight(run, C, { firstRecordId: 'coldplay-mylo-xyloto' });
    ok(f.duel.e.card.id === 'coldplay-mylo-xyloto', 'firstRecordId on hand 1');
  }
  // forcedAttr overrides his throw for one hand
  const d = startFor('copycat', 'hall', 1).duel;
  const cl = clashOf(EN.resolveTurn(d, { i: 0, attr: 'c' }, { forcedAttr: 'h' }));
  ok(cl.eAttr === 'h', 'forcedAttr');
});

section('14 content 形狀（v3）', () => {
  for (const id of ENEMY_IDS) {
    const E = C.enemies[id];
    ok(E.deck.length === (E.boss ? 6 : id === 'man' ? 6 : 7), 'deck size ' + id, E.deck.length);
    for (const c of E.deck) ok(!!C.cards[c] && !C.cards[c].tier, 'deck card ok ' + id + ' ' + c);
    ok(!!C.habits[E.habit] && (!E.phase2 || !!C.habits[E.phase2]), 'habits exist ' + id);
    const hp = id === 'man' ? 10 : E.boss ? 18 : E.elite ? 16 : 14;
    ok(E.hp === hp, 'hp ' + id, E.hp);
    ok(!!(C.lines[id] && C.lines[id].line && C.lines[id].intro && C.lines[id].lose && C.lines[id].win), 'lines ' + id);
    if (E.phase2) ok(!!C.lines[id].switch, 'switch line ' + id);
    for (const k of ['qi0', 'qiRate', 'ultAt', 'ultAttr', 'disc', 'hidden', 'phases', 'quirk', 'stake', 'stakePool', 'relicOffer', 'requests']) ok(!(k in E), 'no v2 field ' + k + ' on ' + id);
  }
  for (const k of ['ears', 'acePassives', 'requests', 'map', 'pools', 'events', 'help', 'helpRows', 'helpGlyphs', 'previewGloss']) ok(!(k in C), 'v2 key removed: ' + k);
  eq(Object.keys(C.coachTips).sort(), ['tip_eye', 'tip_mirror', 'tip_offhabit', 'tip_read', 'tip_switch'], 'coach tip ids');
  ok(C.rules.lines.length === 6, 'rule card: 6 lines');
  ok(C.tutorial.steps.length === 10 && C.tutorial.steps.every(s => s.text.length <= 25 && s.tag), 'tutorial: 10 steps ≤25 字');
  for (const t of TIERS) for (const id of [...C.tutorial.script[t].hand, ...C.tutorial.script[t].draw]) ok([...C.gifts[t], ...C.junk].includes(id), 'tutorial card in the bag ' + t + ' ' + id);
  for (const b of Object.values(C.bins)) for (const id of b.ids) ok(!!C.cards[id], 'bin card ' + id);
  const FORBID = /氣勢|輾壓|賭注|相生|割捨|七星回擊|霸權|點播/;
  const scan = (o, p) => { if (typeof o === 'string') ok(!FORBID.test(o), 'no removed mechanic words in ' + p, o); else if (o && typeof o === 'object') for (const k in o) if (k !== 'cards') scan(o[k], p + '.' + k); };
  scan({ habits: C.habits, relics: C.relics, coachTips: C.coachTips, rules: C.rules, tutorial: C.tutorial, duelText: C.duelText, lines: C.lines, shopLines: C.shopLines, script: C.script }, 'C');
});

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { console.log(fails.join('\n')); process.exit(1); }
