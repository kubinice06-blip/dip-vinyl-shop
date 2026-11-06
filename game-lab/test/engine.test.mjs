// game-lab/test/engine.test.mjs — engine unit / property tests (SPEC §8.1).  Plain node script: `node game-lab/test/engine.test.mjs`
// Exits 1 on any failure.  Content: game-lab/content.js (real) unless `--content <path>` is given.
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const EN = require(path.join(HERE, '../engine.js'));
const { ATTRS, COUNTER_OF, beats, CFG } = EN;

function loadContent() {
  const i = process.argv.indexOf('--content');
  const cands = [];
  if (i > 0 && process.argv[i + 1]) cands.push(path.resolve(process.argv[i + 1]));
  cands.push(path.join(HERE, '../content.js'));
  for (const p of cands) {
    if (!fs.existsSync(p)) continue;
    try { const c = require(p); if (c && c.cards && c.enemies) return { C: c, from: p }; } catch (e) { console.log('! could not load', p, e.message); }
  }
  throw new Error('no content found');
}
const { C, from } = loadContent();
console.log('content:', from);

// ---------------- tiny harness ----------------
let pass = 0, fail = 0; const fails = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); ok(A === B, name, A + ' !== ' + B); }
function section(name, fn) { const f0 = fail; const t0 = Date.now(); try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name + ' (' + (Date.now() - t0) + ' ms)'); }

// ---------------- helpers ----------------
const card = id => { const c = C.cards[id]; if (!c) throw new Error('missing card ' + id); return c; };
const ENEMY_IDS = ['man', 'copycat', 'already', 'needle', 'skip', 'broke', 'buyer', 'label', 'critic', 'boss'];
function pDefFor(tier, o = {}) {
  return { hp: o.hp || 22, maxHp: o.maxHp || 22, deck: [...C.gifts[tier], ...C.junk, ...(o.add || [])].map(card), ace: card(C.aces[tier]), ear: tier,
    relics: o.relics || [], startQi: o.startQi || 0, reviveOnce: !!o.reviveOnce };
}
const eDefFor = (id, over = {}) => ({ ...C.enemies[id], deck: C.enemies[id].deck.map(card), ...over });
const otherTier = (tier, k) => EN.TIERS.filter(t => t !== tier)[k % 2];
function startFor(id, tier, seed, o = {}) {
  const E = C.enemies[id];
  return EN.startDuel(pDefFor(tier, o), eDefFor(id, o.eOver || {}), { seed, ultAttr: EN.resolveUltAttr(E.ultAttr, tier), request: o.request || null,
    prologue: id === 'man', habitKnown: !!o.habitKnown, enemyAce: E.boss ? card(C.aces[otherTier(tier, seed)]) : null });
}
function lcg(s) { s = s >>> 0; return () => (s = (Math.imul(s, 1103515245) + 12345) >>> 0) / 4294967296; }
const sumV = (bd, ks) => bd.filter(t => !ks || ks.includes(t.k)).reduce((a, t) => a + t.v, 0);
function termInvariant(cl) {
  const k = cl.kind, bd = cl.breakdown;
  if (['counter', 'mirrorWin', 'ult', 'reflect'].includes(k)) return sumV(bd) === cl.toE && cl.toP === 0;
  if (['countered', 'mirrorLose', 'block', 'eultHit'].includes(k)) return sumV(bd) === cl.toP && cl.toE === 0;
  if (['tie', 'hegemonyE', 'hegemonyP'].includes(k)) return sumV(bd) === 0 && cl.toE === 0 && cl.toP === 0;
  if (k === 'trade') return sumV(bd, ['ult', 'matrix']) === cl.toE && sumV(bd, ['eult']) === cl.toP;
  return false;
}
const TERM_KS = ['atk', 'K', 'def', 'ear', 'stylus', 'feint', 'chain', 'skip', 'dust', 'mirrorP', 'mirrorE', 'obi', 'ult', 'matrix', 'eult', 'block', 'isolation', 'reflect'];
const KINDS = ['counter', 'countered', 'mirrorWin', 'mirrorLose', 'tie', 'hegemonyE', 'hegemonyP', 'ult', 'trade', 'reflect', 'block', 'eultHit'];
const STAMPS = ['readHit', 'seeThrough', 'readMiss', 'feintHit', 'reflect', 'block', 'hegemony', null];

// A hand-built duel for spot checks: custom disc, record, hand, K.
function mk(o = {}) {
  const tier = o.tier || 'hall';
  const E = C.enemies[o.enemy || 'copycat'];
  const eDef = { ...E, deck: E.deck.map(card), disc: o.disc || E.disc, hidden: o.hidden !== undefined ? o.hidden : E.hidden, phases: o.phases || E.phases,
    quirk: o.quirk !== undefined ? o.quirk : E.quirk, hp: o.eHp || E.hp, qi0: 0, qiRate: o.qiRate || 0, ultAt: o.ultAt != null ? o.ultAt : E.ultAt, stake: o.stake || null };
  const { duel: st } = EN.startDuel(pDefFor(tier, { relics: o.relics || [], hp: o.hp, maxHp: o.maxHp, reviveOnce: o.reviveOnce }), eDef,
    { seed: o.seed || 7, ultAttr: o.ultAttr || 'c', request: o.request || null, habitKnown: !!o.habitKnown, enemyAce: o.enemyAce || null });
  if (o.hand) st.p.hand = o.hand;
  if (o.record) st.e.record = o.record;
  if (o.K) st.K = o.K;
  if (o.pQi != null) st.p.qi = o.pQi;
  if (o.eQi != null) st.e.qi = o.eQi;
  if (o.intent) st.intent = o.intent; else st.intent = { ult: false, bubble: EN.topAxis(st.e.record, st.e.taste), cellIdx: 0 };
  if (o.lastAttr !== undefined) st.p.lastAttr = o.lastAttr;
  return st;
}
const R = (c, o, h, extra = {}) => ({ id: 'test-' + c + o + h + (extra.tag || ''), artist: 'T', album: 'T', year: 1990, genres: ['rock'], region: 'xx', c, o, h, tier: null, coverUrl: '', localCover: null, previewUrl: '', tags: extra.tags || [], pitch: null, ...extra });
const clashOf = ev => ev.find(e => e.t === 'clash');

// =====================================================================================
section('1+2. forecast === resolve, view === actual (all 10 enemies, 3 aces, relic toggles)', () => {
  const RELIC_SETS = [[], ['stylus', 'dustcover', 'obi'], ['matrix', 'isolation', 'firstpress'], ['gauge', 'headphone'], ['stylus', 'dustcover', 'obi', 'matrix', 'isolation', 'firstpress', 'gauge', 'headphone']];
  let checked = 0, bad = 0, attrBad = 0, invBad = 0, schemaBad = 0, perEnemy = {}, perTier = {}, ultHands = 0, mutBad = 0, kinds = {};
  for (let seed = 1; seed <= 420 || (checked < 3600 && seed < 5000); seed++) {
    const tier = EN.TIERS[seed % 3]; const id = ENEMY_IDS[seed % ENEMY_IDS.length];
    const relics = RELIC_SETS[Math.floor(seed / 3) % RELIC_SETS.length];
    const E = C.enemies[id];
    const request = E.requests && E.requests.length && seed % 4 ? E.requests[seed % E.requests.length] : null;
    const { duel: st } = startFor(id, tier, seed, { relics, request, startQi: seed % 7, habitKnown: seed % 5 === 0 });
    const r = lcg(seed * 99);
    let guard = 0;
    while (!st.over && guard++ < 60) {
      const acts = EN.legalActions(st);
      const act = acts[Math.floor(r() * acts.length)];
      const snap = checked % 37 === 0 ? JSON.stringify(st) : null;
      const fc = EN.forecast(st, act);
      if (snap && JSON.stringify(st) !== snap) mutBad++;
      const pub = EN.view(st).intent;
      const expect = fc.ult ? fc.outcome : fc.slices[st.intent.cellIdx].outcome;   // test-only peek at the hidden cell
      const expectAttr = fc.ult ? null : pub.slices[st.intent.cellIdx].attr;
      if (fc.ult) ultHands++;
      const ev = EN.resolveTurn(st, act); const c = clashOf(ev); const rv = ev.find(e => e.t === 'reveal');
      checked++; perEnemy[id] = (perEnemy[id] || 0) + 1; perTier[tier] = (perTier[tier] || 0) + 1; kinds[c.kind] = (kinds[c.kind] || 0) + 1;
      if (expect && (c.toE !== expect.toE || c.toP !== expect.toP || c.kind !== expect.kind || c.stamp !== expect.stamp || JSON.stringify(c.breakdown) !== JSON.stringify(expect.breakdown))) { bad++; if (bad < 4) fails.push('mismatch ' + JSON.stringify({ id, seed, act, c, expect })); }
      if (expectAttr && rv.eAttr !== expectAttr) attrBad++;
      if (!termInvariant(c)) { invBad++; if (invBad < 4) fails.push('term sum ' + JSON.stringify(c)); }
      if (!KINDS.includes(c.kind) || !STAMPS.includes(c.stamp) || c.breakdown.some(t => !TERM_KS.includes(t.k) || typeof t.label !== 'string' || typeof t.v !== 'number')) schemaBad++;
    }
  }
  console.log('     checked', checked, 'ult hands', ultHands, 'per enemy', JSON.stringify(perEnemy), 'kinds', JSON.stringify(kinds));
  ok(checked >= 3000, 'at least 3000 forecast cases', checked);
  ok(ENEMY_IDS.every(id => perEnemy[id] > 50), 'all 10 enemies covered', perEnemy);
  ok(EN.TIERS.every(t => perTier[t] > 500), 'all 3 aces covered', perTier);
  ok(KINDS.every(k => kinds[k] > 0), 'every clash kind reached', kinds);
  ok(bad === 0, 'forecast ≠ resolve', bad);
  ok(attrBad === 0, 'displayed slice attr ≠ played attr', attrBad);
  ok(invBad === 0, 'breakdown terms sum to damage', invBad);
  ok(schemaBad === 0, 'kind/stamp/Term schema', schemaBad);
  ok(mutBad === 0, 'forecast does not mutate the duel', mutBad);
});

section('3. uniform cell draw: 60,000 hand starts, each of 6 cells within 1/6 ± 1%', () => {
  const cnt = [0, 0, 0, 0, 0, 0]; const N = 60000;
  const eDef = eDefFor('copycat');
  const pDef = pDefFor('pearl');
  for (let s = 1; s <= N; s++) { const { duel } = EN.startDuel(pDef, eDef, { seed: s * 2654435761 >>> 0, ultAttr: 'c' }); cnt[duel.intent.cellIdx]++; }
  const fr = cnt.map(c => c / N);
  console.log('     freq', fr.map(f => f.toFixed(4)).join(' '));
  ok(fr.every(f => Math.abs(f - 1 / 6) <= 0.01), 'uniform within ±1%', fr);
  // also: across hands of one long duel stream
  const cnt2 = [0, 0, 0, 0, 0, 0]; let hands = 0;
  for (let s = 1; hands < 20000; s++) {
    const { duel: st } = EN.startDuel(pDef, { ...eDef, hp: 999, ultAt: 99 }, { seed: s, ultAttr: 'c' });
    for (let k = 0; k < 25 && !st.over; k++) { cnt2[st.intent.cellIdx]++; hands++; EN.resolveTurn(st, { type: 'card', i: 0, attr: 'c' }); if (st.p.hp < 8) st.p.hp = 22; }
  }
  ok(cnt2.every(c => Math.abs(c / hands - 1 / 6) <= 0.01), 'uniform across in-duel hands', cnt2);
});

section('4. determinism: same seed + same actions → identical event JSON', () => {
  for (const id of ENEMY_IDS) {
    const play = () => { const { duel: st, events } = startFor(id, 'heresy', 4242, { relics: ['stylus', 'obi'] }); const all = [events]; const r = lcg(5); while (!st.over) { const a = EN.legalActions(st); all.push(EN.resolveTurn(st, a[Math.floor(r() * a.length)])); } return JSON.stringify(all) + JSON.stringify(st); };
    ok(play() === play(), 'deterministic ' + id);
  }
  const a = startFor('boss', 'hall', 1).duel, b = startFor('boss', 'hall', 2).duel;
  ok(JSON.stringify(a.p.hand) !== JSON.stringify(b.p.hand) || a.intent.cellIdx !== b.intent.cellIdx, 'different seeds differ');
});

section('5. save/load: JSON round trip at hand 3, both branches identical afterwards', () => {
  for (const id of ENEMY_IDS) for (const tier of EN.TIERS) {
    const { duel: st } = startFor(id, tier, 99 + id.length, { relics: ['dustcover', 'testpress'] });
    while (st.hand < 3 && !st.over) EN.resolveTurn(st, EN.policies.ev(st));
    if (st.over) continue;
    const copy = JSON.parse(JSON.stringify(st));
    eq(EN.view(copy), EN.view(st), 'view equal after reload ' + id);
    const r1 = EN.makeRng(11), r2 = EN.makeRng(11); const e1 = [], e2 = [];
    while (!st.over) e1.push(EN.resolveTurn(st, EN.policies.mostLikely(st, r1)));
    while (!copy.over) e2.push(EN.resolveTurn(copy, EN.policies.mostLikely(copy, r2)));
    ok(JSON.stringify(e1) === JSON.stringify(e2) && JSON.stringify(st) === JSON.stringify(copy), 'branches equal ' + id + '/' + tier);
  }
});

// =====================================================================================
section('6. rule spot-checks', () => {
  // counter floor = K
  { const st = mk({ hand: [R(1, 1, 1)], record: R(5, 5, 1), K: 4, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });   // bubble c → he plays c; you play o (1★) vs his o 5★
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'o' }, 0)); ok(c.kind === 'counter' && c.toE === 4 && c.stamp === 'readHit', 'counter floor = K', c);
    ok(c.breakdown.find(t => t.k === 'def').note === '擋住星差', 'floor note'); }
  { const st = mk({ hand: [R(1, 5, 1)], record: R(5, 2, 1), K: 2, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'o' }, 0)); ok(c.toE === 5 + 2 - 2, 'counter = K + star diff', c); }
  // feint: +2 to the winner, both directions
  { const st = mk({ hand: [R(4, 4, 4)], record: R(5, 1, 1), K: 2, disc: ['feint', 'feint', 'feint', 'feint', 'feint', 'feint'] });   // bubble c → feint plays h
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'c' }, 0)); ok(c.kind === 'counter' && c.stamp === 'seeThrough' && c.toE === Math.max(2, 4 + 2 - 5) + 2, 'seeThrough +2', c); }
  { const st = mk({ hand: [R(4, 4, 4)], record: R(5, 1, 1), K: 2, disc: ['feint', 'feint', 'feint', 'feint', 'feint', 'feint'] });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'o' }, 0)); ok(c.kind === 'countered' && c.stamp === 'feintHit' && c.toP === Math.max(2, 1 + 2 - 4) + 2, 'feintHit +2', c); }
  { const st = mk({ hand: [R(4, 4, 4)], record: R(5, 1, 4), K: 2, disc: ['feint', 'feint', 'feint', 'feint', 'feint', 'feint'] });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'h' }, 0)); ok(c.kind === 'tie' && c.toE === 0 && c.toP === 0, 'feint tie: no bonus', c); }
  // hegemony: ace countered → 0/0, qi unchanged by the clash (attrFx still applies)
  { const st = mk({ tier: 'hall', record: R(5, 1, 1), K: 3, disc: ['grudge', 'grudge', 'grudge', 'grudge', 'grudge', 'grudge'], lastAttr: 'h', pQi: 3, eQi: 2 });   // grudge vs last h → he plays c? no: COUNTER_OF[h]=c
    st.p.lastAttr = 'o'; // grudge → COUNTER_OF[o] = h ... we want o (beats c): lastAttr 'c' → COUNTER_OF[c] = o
    st.p.lastAttr = 'c';
    const ev = EN.applyClash(st, { type: 'ace' }, 0); const c = clashOf(ev);
    ok(c.kind === 'hegemonyP' && c.toE === 0 && c.toP === 0 && c.stamp === 'hegemony', 'hegemony: ace countered', c);
    ok(st.p.qi === 3 + 0 && st.e.qi === 0 + 1, 'hegemony: clash qi unchanged; attrFx (hall: e −2 passive, his o +1)', [st.p.qi, st.e.qi]); }
  { const ace = card(C.aces.heresy); const st = mk({ tier: 'pearl', hand: [R(1, 1, 5)], record: ace, K: 3, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });   // he plays his h-ace; you play c (beats h)
    st.hand = st.hand; const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'c' }, 0)); ok(c.kind === 'hegemonyE' && c.toE === 0 && c.toP === 0, 'hegemony: enemy ace countered', c); }
  // reflect = 7 + K and his qi → 0
  { const st = mk({ tier: 'hall', K: 4, eQi: 8, intent: { ult: true, attr: 'h', dmg: 8, bubble: 'c' } });
    const c = clashOf(EN.applyClash(st, { type: 'ace' }, null)); ok(c.kind === 'reflect' && c.toE === 7 + 4 && c.toP === 0 && st.e.qi === 0, 'reflect 7+K, his qi 0', [c, st.e.qi]); }
  // block = max(0, U − star), isolation −2 more
  { const st = mk({ hand: [R(3, 1, 1)], eQi: 8, intent: { ult: true, attr: 'h', dmg: 8, bubble: 'c' } });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'c' }, null)); ok(c.kind === 'block' && c.toP === 5 && c.stamp === 'block', 'block U−star', c); }
  { const st = mk({ hand: [R(5, 1, 1)], eQi: 4, intent: { ult: true, attr: 'h', dmg: 4, bubble: 'c' } });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'c' }, null)); ok(c.kind === 'block' && c.toP === 0, 'block floor 0', c); }
  { const st = mk({ hand: [R(3, 1, 1)], relics: ['isolation'], intent: { ult: true, attr: 'h', dmg: 8, bubble: 'c' } });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'c' }, null)); ok(c.toP === 3 && c.breakdown.some(t => t.k === 'isolation' && t.v === -2), 'isolation +2 block', c); }
  { const st = mk({ hand: [R(5, 5, 5)], intent: { ult: true, attr: 'h', dmg: 8, bubble: 'c' } });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'o' }, null)); ok(c.kind === 'eultHit' && c.toP === 8 && c.toE === 0, 'eult full hit', c); }
  // player ult voids his hand: no enemy attrFx; damage = qi (+2 matrix)
  { const st = mk({ pQi: 7, record: R(5, 1, 1), disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    const hp0 = st.e.hp; const ev = EN.applyClash(st, { type: 'ult' }, 0); const c = clashOf(ev);
    ok(c.kind === 'ult' && c.toE === 7 && c.toP === 0 && !ev.some(e => e.t === 'attrFx') && st.e.hp === hp0 - 7 && st.p.qi === 0, 'ult voids his hand', ev); }
  { const st = mk({ pQi: 6, relics: ['matrix'] }); const c = clashOf(EN.applyClash(st, { type: 'ult' }, 0)); ok(c.toE === 8, 'matrix +2', c); }
  { const st = mk({ pQi: 6, intent: { ult: true, attr: 'h', dmg: 9, bubble: 'c' } }); const c = clashOf(EN.applyClash(st, { type: 'ult' }, null)); ok(c.kind === 'trade' && c.toE === 6 && c.toP === 9 && st.e.qi === 0 && st.p.qi === 0, 'trade', c); }
  // copy / grudge fall back to the bubble without a last hand (incl. when the only previous hand was an ult)
  { const st = mk({ record: R(5, 1, 1), disc: ['copy', 'grudge', 'copy', 'grudge', 'copy', 'grudge'], lastAttr: null });
    const v = EN.view(st).intent.slices; ok(v.every(s => s.attr === 'c'), 'copy/grudge fallback to bubble', v); }
  { const { duel: st } = EN.startDuel(pDefFor('hall', { startQi: 6 }), { ...eDefFor('copycat'), disc: ['copy', 'grudge', 'copy', 'grudge', 'copy', 'grudge'], qiRate: 0 }, { seed: 3, ultAttr: 'c' });
    EN.resolveTurn(st, { type: 'ult' });
    if (!st.over) { const b = st.intent.bubble; ok(st.p.lastAttr === null && EN.view(st).intent.slices.every(s => s.attr === b), 'after a first-hand ult, copy/grudge = bubble', EN.view(st).intent); } }
  { const st = mk({ record: R(5, 1, 1), disc: ['copy', 'grudge', 'copy', 'grudge', 'copy', 'grudge'], lastAttr: 'o' });
    const v = EN.view(st).intent.slices; ok(v[0].attr === 'o' && v[1].attr === 'h', 'copy = last, grudge = counter of last', v); }
  // eye ignores the ace slot; gauge makes eye = true
  { const st = mk({ tier: 'hall', hand: [R(2, 5, 1), R(3, 3, 3), R(1, 1, 4), R(4, 1, 1)], record: R(5, 1, 1), disc: ['eye', 'eye', 'eye', 'eye', 'eye', 'eye'] });
    ok(EN.view(st).intent.slices.every(s => s.attr === COUNTER_OF.o), 'eye = counter of your biggest hand axis (ace ignored)', EN.view(st).intent.slices); }
  { const st = mk({ hand: [R(2, 5, 1), R(5, 3, 3)], record: R(1, 1, 5), disc: ['eye', 'eye', 'eye', 'eye', 'eye', 'eye'] });
    ok(EN.view(st).intent.slices[0].attr === COUNTER_OF.o, 'eye tie → hand order', EN.view(st).intent.slices[0]); }
  { const st = mk({ relics: ['gauge'], hand: [R(2, 5, 1)], record: R(1, 1, 5), disc: ['eye', 'eye', 'eye', 'eye', 'eye', 'eye'] });
    ok(EN.view(st).intent.slices.every(s => s.attr === 'h'), 'gauge: eye = true', EN.view(st).intent.slices); }
  // skip: after you counter him, next hand does not grow and resets
  { const { duel: st } = EN.startDuel(pDefFor('pearl'), { ...eDefFor('skip'), disc: ['true', 'true', 'true', 'true', 'true', 'true'], hp: 99, phases: [] }, { seed: 5, ultAttr: 'c' });
    const vals = [];
    for (let k = 0; k < 4; k++) { vals.push(st.e.quirkVal); EN.resolveTurn(st, { type: 'card', i: 0, attr: COUNTER_OF[COUNTER_OF[COUNTER_OF[st.intent.bubble]]] === st.intent.bubble ? st.intent.bubble : st.intent.bubble }); }   // mirror (no counter) → grows
    ok(vals[0] === 0 && vals[1] === 2 && vals[2] === 4 && vals[3] === 6, 'skip grows +2/hand from hand 2 (cap 6)', vals);
    EN.resolveTurn(st, { type: 'card', i: 0, attr: 'c' }); ok(st.e.quirkVal === 6, 'skip capped at 6', st.e.quirkVal);
    st.e.qi = 0; const b = st.intent.bubble; const ev = EN.resolveTurn(st, { type: 'card', i: 0, attr: COUNTER_OF[b] });
    ok(clashOf(ev).kind === 'counter' && st.e.quirkVal === 0, 'countered him → reset to 0 and no growth this hand', [clashOf(ev).kind, st.e.quirkVal]);
    EN.resolveTurn(st, { type: 'card', i: 0, attr: st.intent.bubble }); ok(st.e.quirkVal === 2, 'grows again afterwards', st.e.quirkVal); }
  { const st = mk({ enemy: 'skip', hand: [R(1, 1, 1)], record: R(5, 1, 1), K: 2, disc: ['true', 'true', 'true', 'true', 'true', 'true'] }); st.e.quirkVal = 4;
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'h' }, 0)); ok(c.kind === 'countered' && c.toP === 5 + 2 - 1 + 4 && c.breakdown.some(t => t.k === 'skip' && t.v === 4), 'skip adds N when he counters you', c); }
  // face change: once per notch
  { const st = mk({ enemy: 'copycat', eHp: 18, hand: [R(5, 5, 5), R(5, 5, 5), R(5, 5, 5), R(5, 5, 5)], record: R(1, 1, 1), disc: ['true', 'true', 'true', 'true', 'true', 'true'], phases: [{ atHp: 12, disc: ['feint', 'feint', 'feint', 'feint', 'feint', 'feint'] }] });
    st.e.hp = 13; let ev = EN.applyClash(st, { type: 'card', i: 0, attr: 'o' }, 0); ok(ev.filter(e => e.t === 'faceChange').length === 1 && st.e.disc[0] === 'feint', 'face change fires', ev);
    st.e.record = R(1, 1, 1); st.intent = { ult: false, bubble: 'c', cellIdx: 0 }; ev = EN.applyClash(st, { type: 'card', i: 0, attr: 'c' }, 0);
    ok(!ev.some(e => e.t === 'faceChange') && st.stats.faceChange === 1, 'face change only once per notch', ev); }
  { const st = mk({ enemy: 'copycat', eHp: 30, hand: [R(5, 5, 5)], record: R(1, 1, 1), K: 6, disc: ['true', 'true', 'true', 'true', 'true', 'true'], phases: [{ atHp: 20 }, { atHp: 18 }] });
    st.e.hp = 21; const ev = EN.applyClash(st, { type: 'card', i: 0, attr: 'o' }, 0); ok(ev.filter(e => e.t === 'faceChange').length === 2 && st.e.phase === 2, 'crossing two notches fires both, once each', ev.filter(e => e.t === 'faceChange')); }
  // simultaneous KO: more HP left wins; equal → player
  for (const [php, ehp, U, q, want] of [[3, 5, 4, 8, 'win'], [3, 5, 5, 6, 'lose'], [3, 5, 5, 7, 'win'], [2, 2, 2, 6, 'win'], [2, 6, 3, 6, 'lose']]) {
    const st = mk({ hp: 22, pQi: q, intent: { ult: true, attr: 'h', dmg: U, bubble: 'c' } }); st.p.hp = php; st.e.hp = ehp;
    const ev = EN.applyClash(st, { type: 'ult' }, null); ok(st.over === want, `simultaneous KO P${php}-${U} E${ehp}-${q} → ${want}`, [st.p.hp, st.e.hp, st.over]); }
  // 點播 +2 only on YOUR attack star
  { const st = mk({ request: 'g:jazz', hand: [R(1, 3, 1, { tags: ['g:jazz'] })], record: R(5, 2, 1, { tags: ['g:jazz'] }), K: 2, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'o' }, 0)); ok(c.toE === (3 + 2) + 2 - 2 && c.breakdown[0].note === '點播+2', 'request +2 on your counter', c); }
  { const st = mk({ request: 'g:jazz', hand: [R(1, 3, 1, { tags: ['g:jazz'] })], record: R(5, 2, 1, { tags: ['g:jazz'] }), K: 2, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'h' }, 0)); ok(c.kind === 'countered' && c.toP === 5 + 2 - 1, 'request does not add to your defence nor to his card', c); }
  { const st = mk({ request: 'g:jazz', hand: [R(4, 1, 1, { tags: ['g:jazz'] })], record: R(5, 2, 1), K: 2, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'c' }, 0)); ok(c.kind === 'mirrorWin' && c.toE === 1, 'request +2 in a mirror', c); }
  // relic hooks
  { const st = mk({ relics: ['stylus'], hand: [R(1, 4, 1), R(1, 4, 1)], record: R(5, 1, 1), K: 2, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    const c1 = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'o' }, 0)); st.e.record = R(5, 1, 1); st.intent = { ult: false, bubble: 'c', cellIdx: 0 };
    const c2 = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'o' }, 0)); ok(c1.toE === 5 + 2 + 2 - 2 + 0 && c2.toE === 5 + 2 - 2 - 0 + 0 + (c2.breakdown.some(t => t.k === 'chain') ? c2.breakdown.find(t => t.k === 'chain').v : 0) && !c2.breakdown.some(t => t.k === 'stylus'), 'stylus once per duel', [c1, c2]); }
  { const st = mk({ relics: ['dustcover'], hand: [R(1, 1, 1), R(1, 1, 1)], record: R(5, 1, 1), K: 3, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    const c1 = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'h' }, 0)); st.e.record = R(5, 1, 1); st.intent = { ult: false, bubble: 'c', cellIdx: 0 };
    const c2 = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'h' }, 0)); ok(c1.toP === 7 - 3 && c2.toP === 7, 'dustcover halves (floor of the cut) the first counter only', [c1.toP, c2.toP]); }
  { const st = mk({ relics: ['obi'], hand: [R(5, 1, 1)], record: R(3, 1, 1), disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'c' }, 0)); ok(c.kind === 'mirrorWin' && c.toE === 2 + 2, 'obi +2 on mirror win', c); }
  { const st = mk({ relics: ['firstpress'], hand: [R(5, 5, 5), R(5, 5, 5), R(5, 5, 5), R(5, 5, 5)], record: R(1, 1, 1), K: 2, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    let c; for (const a of ['c', 'o', 'h']) { st.e.record = R(5, 1, 1); if (a === 'h') st.e.record = R(1, 5, 1); if (a === 'c') st.e.record = R(1, 1, 5); st.intent = { ult: false, bubble: EN.topAxis(st.e.record, st.e.taste), cellIdx: 0 }; c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: a }, 0)); }
    ok(c.kind === 'counter' && c.breakdown.some(t => t.k === 'chain' && t.v === 4) && st.p.chainLen === 0 && st.stats.chain3 === 1, 'chain 3 +2 (+2 firstpress), then resets', c); }
  { const st = mk({ tier: 'heresy', hand: [R(1, 1, 3)], record: R(1, 5, 1), K: 2, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'h' }, 0)); ok(c.toE === 3 + 2 - 1 + 1, 'heresy ear +1 on hardcore counter', c); }
  { const st = mk({ tier: 'pearl', record: R(5, 1, 1), K: 2, pQi: 0, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    EN.applyClash(st, { type: 'ace' }, 0); ok(st.p.qi === 4 + 1 + 1, 'pearl ace counter qi +4 (+o attrFx 1 +ear 1)', st.p.qi); }
  { const st = mk({ tier: 'hall', record: R(1, 1, 5), K: 2, eQi: 5, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    const ev = EN.applyClash(st, { type: 'ace' }, 0); ok(ev.some(e => e.t === 'acePassive' && e.qi === -2), 'hall passive −2', ev.filter(e => e.t === 'acePassive')); }
  { const st = mk({ tier: 'heresy', record: R(1, 5, 1), K: 2, eQi: 5, disc: ['true', 'true', 'true', 'true', 'true', 'true'] });
    const ev = EN.applyClash(st, { type: 'ace' }, 0); ok(ev.some(e => e.t === 'acePassive' && e.qi === -5), 'heresy passive → 0', ev.filter(e => e.t === 'acePassive')); }
  // enemy ult: announced at beginHand with locked damage; ace passive does not change it
  { const { duel: st, events } = EN.startDuel(pDefFor('hall'), { ...eDefFor('buyer'), qi0: 8 }, { seed: 9, ultAttr: 'o' });
    const hs = events.find(e => e.t === 'handStart'); ok(hs.intent.ult && hs.intent.dmg === 8 && hs.intent.attr === 'o', 'ult announced at beginHand', hs.intent);
    const c = clashOf(EN.resolveTurn(st, { type: 'ace' })); ok(c.kind === 'eultHit' && c.toP === 8, 'locked damage survives the hall −2 cut (not reflectable: c does not beat o)', c); }
  // revive (神秘見本盤)
  { const st = mk({ reviveOnce: true, hand: [R(1, 1, 1)], record: R(5, 1, 1), K: 6, disc: ['true', 'true', 'true', 'true', 'true', 'true'] }); st.p.hp = 3;
    const ev = EN.applyClash(st, { type: 'card', i: 0, attr: 'h' }, 0); ok(ev.some(e => e.t === 'revive' && e.hp === 6) && st.p.hp === 6 && !st.over && st.p.revived, 'revive at 6, duel continues', ev);
    st.e.record = R(5, 1, 1); st.intent = { ult: false, bubble: 'c', cellIdx: 0 }; st.p.hand.push(R(1, 1, 1));
    const ev2 = EN.applyClash(st, { type: 'card', i: 0, attr: 'h' }, 0); ok(st.over === 'lose' && !ev2.some(e => e.t === 'revive'), 'revive only once', ev2); }
  // boss B side: starPlus 1 and addAce
  { const otherAce = card(C.aces.pearl);
    const { duel: st } = EN.startDuel(pDefFor('hall'), eDefFor('boss'), { seed: 21, ultAttr: 'o', enemyAce: otherAce });
    st.e.hp = 13; st.e.qi = 0; st.intent = { ult: false, bubble: 'c', cellIdx: 0 }; st.e.disc = ['true', 'true', 'true', 'true', 'true', 'true']; st.e.record = R(1, 1, 1); st.p.hand[0] = R(5, 5, 5); st.K = 2;
    const ev = EN.applyClash(st, { type: 'card', i: 0, attr: 'o' }, 0);
    ok(ev.some(e => e.t === 'faceChange') && st.e.starPlus === 1 && st.e.deck.some(c => c.id === otherAce.id), 'boss B: starPlus 1 and the other ace shuffled in', ev.filter(e => e.t === 'faceChange'));
    st.e.record = R(4, 1, 1); st.intent = { ult: false, bubble: 'c', cellIdx: 0 }; st.e.disc = ['true', 'true', 'true', 'true', 'true', 'true']; st.p.hand[0] = R(1, 1, 1);
    const c = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'h' }, 0)); ok(c.kind === 'countered' && c.toP === (4 + 1) + 2 - 1, 'starPlus adds to his attack star', c);
    st.e.record = otherAce; st.intent = { ult: false, bubble: 'o', cellIdx: 0 }; st.p.hand[0] = R(3, 1, 3);
    const c2 = clashOf(EN.applyClash(st, { type: 'card', i: 0, attr: 'h' }, 0)); ok(c2.kind === 'hegemonyE', 'countering his ace = hegemony', c2); }
  // headphone reveals ？ at duel start; ？ reveal event otherwise
  { const { duel: st } = EN.startDuel(pDefFor('hall', { relics: ['headphone'] }), eDefFor('already'), { seed: 3, ultAttr: 'h' });
    const v = EN.view(st); ok(v.e.habitKnown && v.e.hiddenGlyph === C.enemies.already.hidden && v.intent.slices.every(s => s.glyph !== 'hidden' && s.attr), 'headphone reveals ？', v.intent.slices); }
  { const st = mk({ enemy: 'already', hidden: 'copy', disc: ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'], hand: [R(3, 3, 3)], record: R(5, 1, 1), lastAttr: 'h' });
    ok(EN.view(st).intent.slices.every(s => s.glyph === 'hidden' && s.attr === null) && EN.view(st).e.hiddenGlyph === null, 'unknown ？ has no attr');
    const fc = EN.forecast(st, { type: 'card', i: 0, attr: 'o' }); ok(fc.slices.every(s => s.outcome === null), 'forecast hides ？ outcome');
    const ev = EN.applyClash(st, { type: 'card', i: 0, attr: 'o' }, 0); const hr = ev.find(e => e.t === 'habitRevealed');
    ok(hr && hr.glyph === 'copy' && ev.find(e => e.t === 'reveal').eAttr === 'h' && st.stats.found === 1 && EN.view(st).e.hiddenGlyph === 'copy', 'habitRevealed + copy resolved', ev.slice(0, 2)); }
  // heat event absent with heatQi 0; handStart carries qiGain
  { const { duel: st } = EN.startDuel(pDefFor('hall'), eDefFor('buyer'), { seed: 3, ultAttr: 'h' }); const ev = EN.resolveTurn(st, EN.policies.ev(st));
    ok(!ev.some(e => e.t === 'heat') && ev.find(e => e.t === 'handStart').qiGain.e === 2, 'no heat event, qiGain on handStart', ev.find(e => e.t === 'handStart')); }
  // illegal actions throw
  { const st = mk({ pQi: 2 }); let threw = false; try { EN.resolveTurn(st, { type: 'ult' }); } catch (e) { threw = true; } ok(threw, 'illegal action throws'); }
  // stake tables
  { const { duel: st } = startFor('man', 'hall', 3); const Ks = [st.K]; while (!st.over && st.hand < 7) { EN.resolveTurn(st, { type: 'card', i: 0, attr: 'c' }); if (st.p.hp < 5) st.p.hp = 16; if (st.e.hp < 5) st.e.hp = 16; Ks.push(st.K); }
    eq(Ks.slice(0, 7), [1, 1, 2, 2, 3, 3, 3], 'prologue stake 1,1,2,2,3'); }
  { const { duel: st } = startFor('copycat', 'hall', 3); const Ks = [st.K]; while (!st.over && st.hand < 7) { EN.resolveTurn(st, { type: 'card', i: 0, attr: 'c' }); st.p.hp = 22; st.e.hp = 18; Ks.push(st.K); }
    eq(Ks.slice(0, 7), [2, 2, 3, 4, 5, 6, 6], 'night stake 2,2,3,4,5,6'); }
});

// =====================================================================================
const allNodes = run => run.map.cols.flatMap(c => c.nodes);
section('7. generateNight invariants over 500 seeds × 3 aces', () => {
  let buyerOk = 0, total = 0, c5listen = 0, golds = 0, eliteSeen = {}, evSeen = {};
  for (let s = 0; s < 500; s++) for (const tier of EN.TIERS) {
    total++;
    const run = EN.newRun(C, { seedKey: 'gen' + s, nightNo: 1, aceTier: tier });
    const cols = run.map.cols; const ax = EN.TIER_AXIS[tier];
    ok(cols.length === 7 && cols.every((c, i) => c.col === i && c.time === C.map.times[i]), 'cols 0..6 with times');
    const t = cols.map(c => c.nodes.map(n => n.type).join(','));
    ok(t[0] === 'prologue' && t[1] === 'fight,fight' && t[2] === 'crate,listen' && t[3] === 'fight,event' && t[4] === 'elite,rest' && (t[5] === 'fight,listen' || t[5] === 'fight,event') && t[6] === 'boss', 'column types', t);
    if (t[5] === 'fight,listen') c5listen++;
    const fights = [cols[1].nodes[0], cols[1].nodes[1], cols[3].nodes[0], cols[5].nodes[0]].map(n => n.enemyId);
    ok(new Set(fights).size === 4 && fights.every(id => C.normals.includes(id)), 'four distinct normals', fights);
    if (fights.slice(0, 3).includes('buyer')) buyerOk++;
    const evs = allNodes(run).filter(n => n.type === 'event').map(n => n.eventId);
    ok(new Set(evs).size === evs.length && evs.every(id => C.events.some(e => e.id === id)), 'events distinct and valid', evs);
    evs.forEach(e => evSeen[e] = 1);
    const el = cols[4].nodes[0]; ok(C.elites.includes(el.enemyId), 'elite id'); eliteSeen[el.enemyId] = 1;
    ok(new Set(allNodes(run).map(n => n.id)).size === allNodes(run).length, 'unique node ids');
    for (const n of allNodes(run).filter(n => n.enemyId)) {
      const E = C.enemies[n.enemyId];
      if (n.type === 'prologue') ok(n.request === null && n.enemyId === (C.prologueEnemy || 'man'), 'prologue: man, no request', n);
      else ok(!E.requests.length ? n.request === null : E.requests.includes(n.request), 'request from his pool', n);
      if (n.type !== 'boss') ok(E.stakePool.includes(n.stakeId), 'stake from his pool', n);
      ok(n.relicId === (E.relicOffer || null), 'relic = relicOffer', n);
      if (E.ultAttr === 'reflectable') ok(beats(ax, n.ultAttr), 'reflectable resolved to what your ace beats', [tier, n]);
      else if (E.ultAttr === 'unreflectable') ok(beats(n.ultAttr, ax), 'unreflectable beats your ace', [tier, n]);
      else ok(n.ultAttr === E.ultAttr, 'fixed ultAttr kept', n);
    }
    const boss = cols[6].nodes[0];
    ok(boss.enemyAceTier !== tier && EN.TIERS.includes(boss.enemyAceTier) && boss.enemyAceId === C.aces[boss.enemyAceTier] && boss.stakeId === boss.enemyAceId, 'boss carries the ace you did not pick', boss);
  }
  ok(buyerOk === total, '剁手黨 always in c1 or c3', buyerOk + '/' + total);
  ok(c5listen / total > 0.4 && c5listen / total < 0.6, 'c5 listen/event about half', c5listen / total);
  ok(Object.keys(eliteSeen).length === 2 && Object.keys(evSeen).length === C.events.length, 'both elites and all events appear', [eliteSeen, evSeen]);
  // determinism + date seed + night 2
  eq(EN.newRun(C, { seedKey: '2026-11-06', nightNo: 1, aceTier: 'hall' }).map.cols.map(c => c.nodes.map(n => n.enemyId || n.eventId || n.type)),
    EN.newRun(C, { seedKey: '2026-11-06', nightNo: 1, aceTier: 'heresy' }).map.cols.map(c => c.nodes.map(n => n.enemyId || n.eventId || n.type)), 'same date seed → same night layout for any ace');
  const n2 = EN.newRun(C, { seedKey: '2026-11-06', nightNo: 2, aceTier: 'hall' });
  ok(n2.map.cols[0].col === 1 && n2.col === 1 && !allNodes(n2).some(n => n.type === 'prologue'), 'night 2: no prologue, starts at c1', n2.map.cols[0]);
  ok(EN.fnv1a32('a') === 0xe40c292c && EN.fnv1a32('') === 0x811c9dc5, 'fnv1a32 reference values');
});

function playNight(seedKey, tier, pol, o = {}) {
  const run = EN.newRun(C, { seedKey, nightNo: o.nightNo || 1, aceTier: tier, goodEar: !!o.goodEar });
  const errs = []; let guard = 0;
  while (!run.over && guard++ < 400) {
    const step = EN.nextStep(run);
    if (step === 'duel') {
      const { duel } = EN.startNodeDuel(run, C, run.pending.nodeId);
      const r = EN.makeRng(guard + 1);
      while (!duel.over) EN.resolveTurn(duel, EN.policies[pol](duel, r));
      const f = EN.finishDuel(run, C, duel); if (f.error) errs.push(f.error);
      if (f.offer && f.offer.kind === 'retry' && run.stats.retries > 30) break;
      continue;
    }
    const ch = EN.routePolicy(run, C, run.pending);
    const res = EN.choose(run, C, ch); if (res.error) { errs.push(step + ':' + res.error + ':' + JSON.stringify(ch)); break; }
  }
  return { run, errs };
}

section('8. full nights via routePolicy + ev end with over set and no invalid choices', () => {
  let clears = 0, n = 0;
  for (let s = 0; s < 60; s++) {
    const { run, errs } = playNight('full' + s, EN.TIERS[s % 3], 'ev', { goodEar: s % 2 === 0 });
    n++; if (run.over === 'clear') clears++;
    ok(run.over === 'clear' || run.over === 'dead', 'night ends', run.over);
    ok(errs.length === 0, 'no errors', errs);
    ok(run.deck.length <= CFG.deckCap && run.deck.length >= CFG.deckMin, 'deck size within 5..12', run.deck.length);
    if (run.over === 'dead') ok(run.stats.lostAt && run.stats.lostAt.clash && run.stats.lostAt.enemyId, 'lostAt recorded', run.stats.lostAt);
    if (run.over === 'clear') ok(run.stats.metIds.includes(run.map.cols[6].nodes[0].enemyAceId) && run.col === 7, 'clear: boss ace met', run.stats.metIds);
    ok(JSON.parse(JSON.stringify(run)) && true, 'run JSON-serialisable');
  }
  console.log('     ev clears', clears + '/' + n);
  ok(clears > n * 0.4, 'ev clears a reasonable share', clears);
  // night 2 also runs
  const { run, errs } = playNight('n2', 'pearl', 'ev', { nightNo: 2 }); ok(run.over && !errs.length && run.stats.wins >= 1, 'night 2 plays', [run.over, errs]);
});

section('9. run save/load mid-night (with a duel in progress) continues identically', () => {
  const run = EN.newRun(C, { seedKey: 'sl', nightNo: 1, aceTier: 'hall' });
  EN.startNodeDuel(run, C, 'c0a');
  while (!run.duel.over && run.duel.hand < 3) EN.resolveTurn(run.duel, EN.policies.ev(run.duel));
  const copy = JSON.parse(JSON.stringify(run));
  const go = r => { const out = []; while (!r.over) { const st = EN.nextStep(r); if (st === 'duel') { const d = r.duel || EN.startNodeDuel(r, C, r.pending.nodeId).duel; while (!d.over) out.push(EN.resolveTurn(d, EN.policies.ev(d))); out.push(EN.finishDuel(r, C, d)); continue; } out.push(EN.choose(r, C, EN.routePolicy(r, C, r.pending))); } return JSON.stringify(out) + JSON.stringify(r); };
  ok(go(run) === go(copy), 'identical continuation after JSON round trip');
});

// helpers to place a run at a given node
function runAt(tier, col, o = {}) {
  const run = EN.newRun(C, { seedKey: o.seedKey || 'at', nightNo: 1, aceTier: tier, goodEar: !!o.goodEar });
  run.col = col; return run;
}
function winDuelAt(run, nodeId) { const { duel } = EN.startNodeDuel(run, C, nodeId); duel.over = 'win'; return { duel, res: EN.finishDuel(run, C, duel) }; }

section('10. choose(): every choice type', () => {
  // move: only next column
  { const run = EN.newRun(C, { seedKey: 'mv', nightNo: 1, aceTier: 'hall' });
    ok(EN.canMove(run, 'c0a') && !EN.canMove(run, 'c1a'), 'canMove next column only');
    ok(EN.choose(run, C, { type: 'move', nodeId: 'c1a' }).error === 'cannotMove', 'move to a later column refused');
    ok(!EN.choose(run, C, { type: 'move', nodeId: 'c0a' }).error && run.pending.type === 'duel' && !EN.canMove(run, 'c0a'), 'move sets duel pending');
    const p = EN.nodePreview(run, C, 'c1a'); ok(p && p.enemy && p.stake && 'c' in p.stake && typeof p.reflectable === 'boolean' && p.ultAttr, 'nodePreview fields', p && Object.keys(p)); }
  // prologue: HP 16, stake table, win → stake Fishmans then tier-1 relic pick; loss → retry
  { const run = EN.newRun(C, { seedKey: 'pro', nightNo: 1, aceTier: 'pearl', goodEar: true });
    const { duel } = EN.startNodeDuel(run, C, 'c0a');
    ok(duel.p.hp === 16 && duel.p.maxHp === 16 && duel.prologue && duel.K === 1 && duel.request === null && duel.p.qi === 1, 'prologue duel: HP 16, K 1, no request, good ear qi 1', [duel.p.hp, duel.K, duel.p.qi]);
    duel.over = 'lose'; const f = EN.finishDuel(run, C, duel);
    ok(f.offer.kind === 'retry' && run.pending.type === 'duel' && !run.over && run.hp === CFG.playerHp, 'prologue loss → retry', f);
    const again = EN.startNodeDuel(run, C, 'c0a'); ok(again.duel && again.duel.p.hp === 16 && !again.resumed && again.duel !== duel, 'retry duel starts fresh');
    EN.resolveTurn(again.duel, EN.policies.ev(again.duel)); const snapD = JSON.stringify(again.duel);
    const res2 = EN.startNodeDuel(run, C, 'c0a'); ok(res2.resumed && res2.duel === again.duel && JSON.stringify(res2.duel) === snapD && res2.events[0].t === 'handStart', 'startNodeDuel resumes the saved duel instead of re-rolling');
    again.duel.over = 'win'; const g = EN.finishDuel(run, C, again.duel);
    ok(g.offer.kind === 'stake' && g.offer.cardId === C.enemies.man.stakePool[0] && g.offer.relicId === null && run.hp === CFG.playerHp, 'prologue win → stake offer (Fishmans)', g.offer);
    ok(EN.choose(run, C, { type: 'takeRelic', relicId: 'x' }).error, 'prologue: no takeRelic');
    ok(!EN.choose(run, C, { type: 'keepStakeOnShelf' }).error && run.pending && EN.nextStep(run) === 'relic', 'keep on shelf → relic pick pending');
    ok(EN.choose(run, C, { type: 'pickRelic', relicId: 'matrix' }).error === 'wrongRelic', 'prologue relic must be tier-1');
    const r = EN.choose(run, C, { type: 'pickRelic', relicId: 'cleaner' });
    ok(!r.error && run.relics.includes('cleaner') && run.col === 1 && run.pending === null, 'pickRelic completes prologue', [r, run.col]); }
  // normal fight win: heal +3 (+3 cleaner), takeStake / takeRelic / keepStakeOnShelf / takeExtra (pointcard)
  { const run = runAt('hall', 1); run.hp = 10; run.relics = ['cleaner'];
    const { duel, res } = winDuelAt(run, 'c1a'); ok(run.hp === Math.min(CFG.playerHp, duel.p.hp + CFG.winHeal + CFG.cleanerHeal), 'win heal +3 +3 cleaner', [run.hp, duel.p.hp]);
    ok(res.offer.kind === 'stake' && res.offer.cardId === run.map.cols[1].nodes[0].stakeId && run.stats.metIds.includes(res.offer.cardId), 'stake offer, stake met');
    const n0 = run.deck.length; const r = EN.choose(run, C, { type: 'takeStake' });
    ok(!r.error && run.deck.length === n0 + 1 && run.col === 2 && !run.pending, 'takeStake adds and completes', r); }
  { const run = runAt('hall', 1); const node = run.map.cols[1].nodes[0]; const { res } = winDuelAt(run, 'c1a');
    const r = EN.choose(run, C, { type: 'takeRelic', relicId: node.relicId });
    ok(!r.error && run.relics.includes(node.relicId) && run.col === 2, 'takeRelic', r); }
  { const run = runAt('hall', 1); const node = run.map.cols[1].nodes[0]; run.relics = [node.relicId]; run.hp = 10;
    const { duel, res } = winDuelAt(run, 'c1a'); ok(res.offer.relicOwned === true, 'owned relic flagged');
    const hp0 = run.hp; const r = EN.choose(run, C, { type: 'takeRelic' }); ok(!r.error && run.hp === Math.min(CFG.playerHp, hp0 + 4) && r.effects[0].hp === 4, 'owned relic → +4 HP', r); }
  { const run = runAt('hall', 1); const { res } = winDuelAt(run, 'c1a'); const n0 = run.deck.length;
    ok(!EN.choose(run, C, { type: 'keepStakeOnShelf' }).error && run.deck.length === n0 && run.col === 2, 'keepStakeOnShelf'); }
  { const run = runAt('hall', 1); run.relics = ['pointcard']; const { res } = winDuelAt(run, 'c1a');
    ok(res.offer.extraCardIds && res.offer.extraCardIds.length === 2 && !res.offer.extraCardIds.includes(res.offer.cardId), 'pointcard: 2 extra cards', res.offer);
    ok(EN.choose(run, C, { type: 'takeExtra', cardId: 'nope' }).error === 'noExtra', 'takeExtra validates');
    const id = res.offer.extraCardIds[1]; const r = EN.choose(run, C, { type: 'takeExtra', cardId: id }); ok(!r.error && run.deck.includes(id) && run.stats.metIds.includes(id), 'takeExtra', r); }
  // deck cap 12 with dropId
  { const run = runAt('hall', 1); while (run.deck.length < 12) run.deck.push(C.pools.listen[run.deck.length % C.pools.listen.length]);
    const { res } = winDuelAt(run, 'c1a');
    ok(EN.choose(run, C, { type: 'takeStake' }).error === 'deckFull' && run.deck.length === 12 && run.pending, 'deck full without dropId refused, nothing changed');
    ok(EN.choose(run, C, { type: 'takeStake', dropId: 'not-in-deck' }).error === 'deckFull', 'dropId must be in deck');
    const drop = run.deck[0]; const r = EN.choose(run, C, { type: 'takeStake', dropId: drop });
    ok(!r.error && run.deck.length === 12 && run.deck.includes(res.offer.cardId) && r.effects.some(e => e.loseCard === drop), 'deck cap 12 with dropId', r); }
  // elite: stake + relic three-pick, either order
  { const run = runAt('heresy', 4); run.relics = ['matrix']; const { res } = winDuelAt(run, 'c4a');
    ok(res.offer.kind === 'elite' && res.offer.relicChoices.length === 3 && !res.offer.relicChoices.includes('matrix') && res.offer.relicChoices.every(r => C.pools.eliteRelics.includes(r)), 'elite offer: 3 unowned', res.offer);
    ok(EN.choose(run, C, { type: 'takeRelic' }).error, 'elite: no takeRelic');
    const r1 = EN.choose(run, C, { type: 'pickRelic', relicId: res.offer.relicChoices[0] }); ok(!r1.error && run.pending && run.col === 4, 'relic first, still pending');
    const r2 = EN.choose(run, C, { type: 'takeStake' }); ok(!r2.error && !run.pending && run.col === 5 && run.relics.length === 2, 'then stake completes'); }
  // boss win → clear
  { const run = runAt('hall', 6); run.hp = 5; const boss = run.map.cols[6].nodes[0];
    const { duel } = EN.startNodeDuel(run, C, 'c6a'); ok(duel.e.ace && duel.e.ace.id === boss.enemyAceId && duel.e.ultAttr === EN.COUNTER_OF.c, 'boss duel carries enemy ace, unreflectable ult');
    duel.over = 'win'; const f = EN.finishDuel(run, C, duel); ok(f.offer.kind === 'clear' && f.offer.cardId === boss.enemyAceId && run.over === 'clear', 'boss win → clear', f); }
  // night loss → dead
  { const run = runAt('hall', 3); const { duel } = EN.startNodeDuel(run, C, 'c3a'); EN.resolveTurn(duel, { type: 'card', i: 0, attr: 'c' }); duel.over = 'lose'; duel.p.hp = -2;
    const f = EN.finishDuel(run, C, duel); ok(f.offer.kind === 'dead' && run.over === 'dead' && run.stats.lostAt.nodeId === 'c3a' && run.stats.lostAt.clash.t === 'clash' && run.stats.lostAt.reveal.t === 'reveal' && run.hp === 0, 'night loss → dead + lostAt', run.stats.lostAt);
    ok(EN.choose(run, C, { type: 'move', nodeId: 'c4a' }).error === 'over', 'no moves after death'); }
  // testpress bookkeeping
  { const run = runAt('hall', 1); run.relics = ['testpress']; const { duel } = EN.startNodeDuel(run, C, 'c1a');
    ok(duel.p.reviveOnce && !duel.p.revived, 'testpress → reviveOnce'); duel.p.revived = true; duel.over = 'win'; EN.finishDuel(run, C, duel);
    ok(run.testpressUsed, 'revived → testpressUsed'); EN.choose(run, C, { type: 'keepStakeOnShelf' }); run.col = 3;
    const d2 = EN.startNodeDuel(run, C, 'c3a').duel; ok(!d2.p.reviveOnce, 'testpress only once per night'); }
  // start qi: good ear 1 + adapter45 2 + nextStartQi, then reset
  { const run = runAt('hall', 1, { goodEar: true }); run.relics = ['adapter45']; run.nextStartQi = 3;
    const { duel } = EN.startNodeDuel(run, C, 'c1a'); ok(duel.p.qi === 6 && run.nextStartQi === 0, 'start qi 1+2+3 then reset', duel.p.qi); }
  // habitKnown from knownHabits
  { const run = EN.newRun(C, { seedKey: 'hk', nightNo: 1, aceTier: 'hall', knownHabits: { already: true, needle: true, label: true, critic: true, boss: true, broke: true } });
    run.col = 1; const id = run.map.cols[1].nodes[0].id; const { duel } = EN.startNodeDuel(run, C, id); ok(duel.e.habitKnown === true, 'knownHabits → habitKnown'); }
  // cardMods clamp 1..5
  { const run = runAt('hall', 1); const id = run.deck[0]; run.cardMods[id] = { c: 3, o: -9, washed: true };
    const c = EN.cardWithMods(C, id, run.cardMods[id]); ok(c.c === 5 && c.o === 1 && c.washed, 'mods clamp 1..5', c);
    const { duel } = EN.startNodeDuel(run, C, 'c1a'); const all = duel.p.hand.concat(duel.p.deck); ok(all.some(x => x.id === id && x.c === 5 && x.o === 1), 'duel deck uses modded card'); }
  // crate: 3 distinct from the pool, gold 10%
  { let gold = 0, n = 0;
    for (let s = 0; s < 600; s++) {
      const run = runAt('hall', 2, { seedKey: 'crate' + s }); EN.choose(run, C, { type: 'move', nodeId: 'c2a' });
      const crate = ['jazz', 'tw', 'noise'][s % 3]; const r = EN.choose(run, C, { type: 'crate', crate }); n++;
      const ids = run.pending.cardIds; ok(!r.error && ids.length === 3 && new Set(ids).size === 3, 'crate 3 distinct', ids);
      ok(ids.slice(0, 2).every(id => C.pools.crate[crate].includes(id)), 'crate from its pool', ids);
      if (run.pending.goldId) { gold++; ok(C.pools.gold.includes(ids[2]) && ids[2] === run.pending.goldId, 'gold replaces the 3rd card'); }
      if (s === 0) { ok(EN.choose(run, C, { type: 'crateCard', cardId: 'nope' }).error === 'badCard', 'crateCard validates'); ok(!EN.choose(run, C, { type: 'crateCard', cardId: null }).error && run.col === 3, 'crate: take nothing'); }
      else if (s === 1) { const r2 = EN.choose(run, C, { type: 'crateCard', cardId: ids[0] }); ok(!r2.error && run.deck.includes(ids[0]) && run.stats.metIds.includes(ids[0]), 'crateCard takes'); }
    }
    console.log('     gold rate', (gold / n).toFixed(3));
    ok(gold / n > 0.06 && gold / n < 0.14, 'gold ≈ 10%', gold / n); }
  // listen: hit / miss / muted (+ pick), keep
  { const mkL = () => { const run = runAt('hall', 2); run.hp = 5; EN.choose(run, C, { type: 'move', nodeId: 'c2b' }); return run; };
    { const run = mkL(); const ids = run.pending.cardIds; ok(ids.length === 3 && new Set(ids.map(id => C.cards[id].genres[0])).size === 3 && ids.includes(run.pending.answerId), 'listen trio: different genres, answer among them', ids);
      const r = EN.choose(run, C, { type: 'listen', guessId: run.pending.answerId }); ok(!r.error && r.result === 'hit' && run.hp === 11 && run.stats.metIds.includes(run.pending.answerId), 'listen hit +6, met', r);
      const ans = run.pending.answerId; const k = EN.choose(run, C, { type: 'listenKeep', keep: true }); ok(!k.error && run.deck.includes(ans) && run.col === 3, 'listenKeep keep', k); }
    { const run = mkL(); const wrong = run.pending.cardIds.find(id => id !== run.pending.answerId);
      const r = EN.choose(run, C, { type: 'listen', guessId: wrong }); ok(r.result === 'miss' && run.hp === 8 && run.pending.keepId === null, 'listen miss +3', r);
      const n0 = run.deck.length; EN.choose(run, C, { type: 'listenKeep', keep: true }); ok(run.deck.length === n0 && run.col === 3, 'miss: nothing to keep'); }
    { const run = mkL(); const pick = run.pending.cardIds[2];
      const r = EN.choose(run, C, { type: 'listen', guessId: null, pickId: pick }); ok(r.result === 'muted' && run.hp === 9 && run.pending.keepId === pick, 'muted pick +4', r);
      EN.choose(run, C, { type: 'listenKeep', keep: true }); ok(run.deck.includes(pick) && run.stats.metIds.includes(pick), 'muted keep');
      const run2 = mkL(); ok(EN.choose(run2, C, { type: 'listen', guessId: 'nope' }).error === 'badGuess', 'listen validates guess'); } }
  // rest: tea / wash
  { const run = runAt('hall', 4); run.hp = 5; EN.choose(run, C, { type: 'move', nodeId: 'c4b' });
    const r = EN.choose(run, C, { type: 'rest', option: 'tea' }); ok(!r.error && run.hp === 13 && run.col === 5, 'tea +8', r); }
  { const run = runAt('hall', 4); EN.choose(run, C, { type: 'move', nodeId: 'c4b' });
    const id = run.deck.find(x => EN.washTarget(run, C, x)); const before = EN.cardWithMods(C, id, run.cardMods[id]); const ax = EN.washTarget(run, C, id);
    const r = EN.choose(run, C, { type: 'rest', option: 'wash', cardId: id }); const after = EN.cardWithMods(C, id, run.cardMods[id]);
    ok(!r.error && after[ax] === before[ax] + 1 && after.washed && r.effects[0].starUp.axis === ax, 'wash: top axis +1', [before, after]);
    const run2 = runAt('hall', 4); EN.choose(run2, C, { type: 'move', nodeId: 'c4b' }); const five = run2.deck.find(x => !EN.washTarget(run2, C, x));
    if (five) ok(EN.choose(run2, C, { type: 'rest', option: 'wash', cardId: five }).error === 'maxed', 'wash refuses a maxed card'); }
});

section('11. events: every option of all 7 events', () => {
  const evAt = (eventId, o = {}) => { const run = runAt('hall', 3, { seedKey: 'ev-' + eventId }); run.map.cols[3].nodes[1].eventId = eventId; if (o.hp) run.hp = o.hp; if (o.deck) run.deck = o.deck(run); EN.choose(run, C, { type: 'move', nodeId: 'c3b' }); return run; };
  const ids = C.events.map(e => e.id);
  ok(ids.length === 7 && ['delivery', 'auntie', 'cat', 'rsd', 'analog', 'firstpress', 'ninetynine'].every(id => ids.includes(id)), 'the 7 events', ids);
  // delivery
  { const run = evAt('delivery', { hp: 10 }); const r = EN.choose(run, C, { type: 'event', eventId: 'delivery', option: 0 }); ok(!r.error && run.hp === 14 && run.col === 4, 'delivery towel +4', r); }
  { const run = evAt('delivery'); ok(EN.choose(run, C, { type: 'event', option: 1 }).error === 'needsCard', 'delivery give needs a card');
    const id = run.deck[0], n0 = run.deck.length; const r = EN.choose(run, C, { type: 'event', option: 1, cardId: id });
    ok(!r.error && run.deck.length === n0 - 1 && run.nextStartQi === 3, 'delivery give → next start qi +3', r); }
  { const run = evAt('delivery', { deck: r => r.deck.slice(0, 5) }); ok(EN.choose(run, C, { type: 'event', option: 1, cardId: run.deck[0] }).error === 'deckTooSmall', 'give needs a bag of ≥6'); }
  // auntie
  { const run = evAt('auntie', { hp: 10 }); EN.choose(run, C, { type: 'event', option: 0 }); ok(run.hp === 15, 'auntie eat +5'); }
  { const run = evAt('auntie'); const r = EN.choose(run, C, { type: 'event', option: 1, cardId: run.deck[1] }); ok(!r.error && run.relics.includes('pointcard'), 'auntie gift → pointcard', r); }
  { const run = evAt('auntie', { hp: 10 }); run.relics = ['pointcard']; const r = EN.choose(run, C, { type: 'event', option: 1, cardId: run.deck[1] }); ok(!r.error && run.hp === 15 && run.relics.length === 1, 'auntie gift, pointcard owned → +5', r); }
  // cat
  { const run = evAt('cat', { hp: 10 }); EN.choose(run, C, { type: 'event', option: 0 }); ok(run.hp === 13, 'cat wait +3'); }
  { const run = evAt('cat', { hp: 10 }); const pre = run.pending.eventCards[1]; ok(pre && [].concat(C.pools.crate.jazz, C.pools.crate.tw, C.pools.crate.noise).includes(pre), 'cat card pre-drawn from the crates', pre);
    const r = EN.choose(run, C, { type: 'event', option: 1 }); ok(!r.error && run.deck.includes(pre) && run.hp === 7, 'cat pull: card, −3', r); }
  // rsd
  { const run = evAt('rsd', { hp: 10 }); const pre = run.pending.eventCards[0]; ok(C.pools.gold.includes(pre), 'rsd gold pre-drawn');
    const r = EN.choose(run, C, { type: 'event', option: 0 }); ok(!r.error && run.deck.includes(pre) && run.hp === 6, 'rsd queue: −4, gold card', r); }
  { const run = evAt('rsd', { hp: 10 }); EN.choose(run, C, { type: 'event', option: 1 }); ok(run.hp === 12 && run.nextStartQi === 1, 'rsd skip: +2, qi +1'); }
  { const run = evAt('rsd', { hp: 3 }); EN.choose(run, C, { type: 'event', option: 0 }); ok(run.hp === 1 && !run.over, 'events never kill (HP floor 1)', run.hp); }
  // analog
  { const run = evAt('analog', { hp: 10 }); const id = run.deck.find(x => EN.cardWithMods(C, x, null).h < 5); const h0 = EN.cardWithMods(C, id, null).h;
    const r = EN.choose(run, C, { type: 'event', option: 0, cardId: id }); ok(!r.error && EN.cardWithMods(C, id, run.cardMods[id]).h === h0 + 1 && run.hp === 8, 'analog: picked card h +1, −2', r); }
  { const run = evAt('analog'); EN.choose(run, C, { type: 'event', option: 1 }); ok(run.nextStartQi === 3, 'analog digital qi +3'); }
  { const run = evAt('analog', { hp: 10 }); EN.choose(run, C, { type: 'event', option: 2 }); ok(run.hp === 12, 'analog walk away +2'); }
  // firstpress
  { const run = evAt('firstpress'); EN.choose(run, C, { type: 'event', option: 0 }); ok(run.nextStartQi === 3, 'firstpress yes qi +3'); }
  { const run = evAt('firstpress', { hp: 10 }); EN.choose(run, C, { type: 'event', option: 1 }); ok(run.hp === 13, 'firstpress honest +3'); }
  // ninetynine
  { const run = evAt('ninetynine'); const pre = run.pending.eventCards[0]; const base = C.cards[pre];
    const r = EN.choose(run, C, { type: 'event', option: 0 }); const c = EN.cardWithMods(C, pre, run.cardMods[pre]);
    ok(!r.error && run.deck.includes(pre) && c.worn && ATTRS.every(a => c[a] === Math.max(1, base[a] - 1)), 'ninetynine: card −1 each axis, worn', c); }
  { const run = evAt('ninetynine'); const n0 = run.deck.length; const r = EN.choose(run, C, { type: 'event', option: 1 }); ok(!r.error && run.deck.length === n0 && run.col === 4, 'ninetynine pass: nothing', r); }
  // deck cap on event gains
  { const run = evAt('cat', { deck: r => { const d = r.deck.slice(); while (d.length < 12) d.push(C.pools.listen[d.length % 9]); return d; } });
    ok(EN.choose(run, C, { type: 'event', option: 1 }).error === 'deckFull', 'event gain at cap needs dropId');
    ok(!EN.choose(run, C, { type: 'event', option: 1, dropId: run.deck[0] }).error && run.deck.length === 12, 'event gain with dropId'); }
});

section('12. scoreRun', () => {
  const run = EN.newRun(C, { seedKey: 'sc', nightNo: 1, aceTier: 'hall', knownCards: { [C.enemies.man.stakePool[0]]: true } });
  Object.assign(run.stats, { wins: 3, readHit: 5, seeThrough: 2, reflect: 1, found: 2 });
  run.stats.metIds = ['a', 'b', 'c']; run.stats.newMetIds = ['a', 'b'];
  let s = EN.scoreRun(run); ok(s.total === 300 + 50 + 50 + 60 + 40 + 30 && s.parts.length === 6, 'score without clear', s);
  run.over = 'clear'; run.hp = 9; s = EN.scoreRun(run); ok(s.total === 530 + 300 + 90 && s.parts.length === 8, 'score with clear', s);
  // newMetIds honours knownCards
  const r2 = EN.newRun(C, { seedKey: 'sc2', nightNo: 1, aceTier: 'hall', knownCards: { [C.enemies.man.stakePool[0]]: true } });
  const { duel } = EN.startNodeDuel(r2, C, 'c0a'); duel.over = 'win'; EN.finishDuel(r2, C, duel);
  ok(r2.stats.metIds.length === 1 && r2.stats.newMetIds.length === 0, 'known card is met but not new', r2.stats);
});

section('13. policies are exported, legal and deterministic', () => {
  for (const name of ['random', 'highest', 'counterBubble', 'oldFormula', 'mostLikely', 'ev', 'ev2', 'oracle']) {
    ok(typeof EN.policies[name] === 'function', 'policy ' + name);
    const { duel: st } = startFor('critic', 'pearl', 77); let illegal = 0;
    const snap = JSON.stringify(st); const a1 = EN.policies[name](st); ok(JSON.stringify(st) === snap, name + ' does not mutate');
    ok(JSON.stringify(EN.policies[name](st)) === JSON.stringify(a1), name + ' deterministic without rngFn');
    const r = EN.makeRng(3); while (!st.over) { const a = EN.policies[name](st, r); if (!EN.isLegal(st, a)) { illegal++; break; } EN.resolveTurn(st, a); }
    ok(illegal === 0, name + ' always legal');
  }
});

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { console.log('\nFAILURES:'); fails.slice(0, 40).forEach(f => console.log(' - ' + f.slice(0, 600))); process.exit(1); }
