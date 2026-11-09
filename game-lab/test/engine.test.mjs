// game-lab/test/engine.test.mjs — v4 engine unit / property tests (SPEC-v4 §5.1 A1 列 #1–#14).  Plain node script:
//   node game-lab/test/engine.test.mjs [--quick]
// Exits 1 on any failure.  Uses the real content.js (cards.js, bins.js).
//   第一波：A3 還沒烘 v4 的新卡（cards.js 沒有的卡）時，用下面 STUB 表的星數補一張只有星數的假卡（只在測試裡）；
//   烘好之後 STUB 用不到，#14 會順便比對 STUB 跟真卡的星數一致。
//   箱子（FIXLIST 4／5／8＋X／Y 契約）：bins.js 還不是契約形狀（沒有 feature 那一區；Y 還沒交）時，用 contractBins() 做一份契約形狀的假箱子
//   （十一個分類＋new＋picks＋feature；真卡照第一個曲風／台灣分區，不夠的補 fx-* 假卡），#8 #15 照契約驗上貨。
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { shapeProblems, binsProblems } from '../tools/check-content.mjs';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const EN = require(path.join(HERE, '../engine.js'));
const C0 = require(path.join(HERE, '../content.js'));
const { ATTRS, BEATS, COUNTER_OF, CFG, TIERS } = EN;
const QUICK = process.argv.includes('--quick');

// ---------------- tiny harness ----------------
let pass = 0, fail = 0; const fails = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; if (fails.length < 60) fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } return !!cond; }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); return ok(A === B, name, A + ' !== ' + B); }
function section(name, fn) { const f0 = fail; const t0 = Date.now(); try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name + ' (' + (Date.now() - t0) + ' ms)'); }

// ---------------- test content（STUB 星數＝SPEC-v4 §4.1–§4.3 的表；already／skip 各 2 張是 A3-M2 換上的新卡） ----------------
const STUB = {
  'limp-bizkit-results-may-vary': [1, 1, 3], 'eminem-the-eminem-show': [5, 1, 2], 'low-double-negative': [5, 3, 4],
  'sophie-oil-of-every-pearl-s-un-insides': [5, 2, 4], 'don-slepian-sea-of-bliss': [3, 4, 2], 'harold-budd-abandoned-cities': [3, 4, 3],
  'demetrio-stratos-metrodora': [3, 5, 4], 'etron-fou-leloublan-les-trois-fou-s-perdegagnent-au-pays-des': [4, 5, 4],
  'nocturnal-emissions-fruiting-body': [4, 5, 4], 'eivind-aarset-electronique-noire': [4, 5, 3], 'yezda-urfa-boris': [4, 5, 3], 'roberto-goyeneche-cantor-de-mi-barrio': [3, 4, 2],
  'amalia-rodrigues-gostava-de-ser-quem-era': [4, 5, 2], 'king-sunny-ade-aura': [3, 4, 2],
  'washington-phillips-the-key-to-the-kingdom': [4, 5, 4], 'otha-turner-the-rising-star-fife-drum-band-everybody-holleri': [4, 5, 3],
  '血肉果汁機-flesh-juicer-golden太子bro': [3, 3, 4], '血肉果汁機-flesh-juicer-深海童話': [3, 3, 4], '閃靈-失竊千年': [3, 3, 4], '血肉果汁機-flesh-juicer-血肉宮建宮蓋廟演唱會': [2, 3, 4],
  '閃靈-永劫輪迴': [4, 3, 4], '閃靈-醒靈寺大決戰': [3, 4, 4], '林強-驚蟄': [4, 4, 3], 'venetian-snares-making-orange-things': [4, 4, 5],
  'nurse-with-wound-homotopy-to-marie': [4, 4, 5], 'ryoji-ikeda-mort-aux-vaches': [3, 4, 5], 'harry-roesli-gang-philosophy-gang': [5, 5, 3],
  'c-o-b-moyshe-mcstiff-and-the-tartan-lancers-of-the-sacred-he': [4, 5, 3], 'pholas-dactylus-concerto-delle-menti': [4, 5, 4],
  'the-plastic-people-of-the-universe-egon-bondy-s-happy-hearts': [5, 4, 4], 'ganelin-trio-ancora-da-capo': [5, 4, 4],
  'luis-russell-the-luis-russell-story-1929-1934': [4, 5, 4], 'raw-material-time-is': [4, 5, 3], 'alexander-von-schlippenbach-globe-unity': [5, 4, 5],
  '裸のラリーズ-the-oz-tapes': [4, 4, 5], 'beverly-glenn-copeland-keyboard-fantasies': [5, 4, 2], 'charles-brackeen-rhythm-x': [4, 5, 4],
  'magma-mekanik-destruktiw-kommandoh': [5, 4, 4], 'blur-the-great-escape': [3, 2, 1], 'oasis-dig-out-your-soul': [3, 1, 1],
  'the-velvet-underground-squeeze': [2, 3, 1], 'stevie-wonder-eivets-rednow': [2, 3, 1], 'the-kinks-preservation-act-1': [2, 3, 1],
  'metallica-reload': [2, 1, 3], 'weezer-van-weezer': [2, 2, 3], 'ramones-halfway-to-sanity': [2, 2, 3],
};
const CARDS = Object.assign({}, C0.cards);
let stubbed = 0;
for (const [id, s] of Object.entries(STUB)) if (!CARDS[id]) { stubbed++; CARDS[id] = { id, artist: id, album: id, c: s[0], o: s[1], h: s[2], tier: null, genres: [], region: 'xx', stub: true }; }
// 引用到的卡（箱子以外）
const USED = new Set([...Object.values(C0.aces), ...Object.values(C0.gifts).flat(), ...C0.bargain.pool,
  ...Object.values(C0.enemies).flatMap(e => e.deck.concat(e.drop ? [e.drop] : []))]);
// X／Y 契約的箱子：鍵、英文名牌、中文名
const CATS = ['jazz', 'tw', 'rock', 'elec', 'soul', 'hiphop', 'pop', 'classical', 'world', 'folk', 'blues'];
const LABEL = { jazz: ['JAZZ', '爵士'], tw: ['TW', '台灣'], rock: ['ROCK', '搖滾'], elec: ['ELEC', '電子'], soul: ['SOUL', '靈魂放克'], hiphop: ['HIP-HOP', '嘻哈 R&B'],
  pop: ['POP', '流行'], classical: ['CLASSICAL', '古典'], world: ['WORLD', '世界'], folk: ['FOLK', '民謠'], blues: ['BLUES', '藍調'], new: ['NEW', '新進'],
  feature: ['FEATURE', '店長推薦精選'], picks: ['PICKS', '店長推薦'] };
const BIN_KEYS = [...CATS, 'new', 'feature', 'picks'];
function contractBins() {
  const B = {}; for (const k of BIN_KEYS) B[k] = { key: k, label: LABEL[k][0], zh: LABEL[k][1], pool: [], front: [] };
  const GENRE = { elec: 'electronic' };
  const shelf = [], top = [];
  for (const id of Object.keys(CARDS).sort()) {
    const c = CARDS[id];
    if (c.tier || c.stub || C0.bargain.pool.includes(id)) continue;
    const r = EN.rarity(c), k = EN.categoryOf(c);
    if (r === 'epic' || r === 'legendary') { top.push(id); continue; }
    if (k && B[k]) B[k].pool.push(id);
    shelf.push(id);
  }
  // 每個分類補到 ≥7 張（fx-* 假卡；三軸輪流當主軸、普通／稀有／獨特都有）
  const STARS = [[1, 5, 1], [5, 1, 1], [1, 1, 5], [2, 4, 3], [4, 2, 1], [1, 3, 5], [3, 5, 3]];
  let n = 0;
  const mk = (genre, region, st) => { const id = 'fx-' + (n++); CARDS[id] = { id, artist: id, album: id, c: st[0], o: st[1], h: st[2], tier: null, genres: [genre], region, fixture: true }; return id; };
  for (const k of CATS) for (let i = 0; B[k].pool.length < 7; i++) B[k].pool.push(mk(k === 'tw' ? 'rock' : (GENRE[k] || k), k === 'tw' ? 'tw' : 'xx', STARS[i % STARS.length]));
  // 新進、店長推薦：不限曲風（跟分類箱的 pool 有重疊，上貨時全店不重複）；FEATURE：史詩＋傳奇
  B.new.pool = shelf.filter((id, k) => k % 3 === 0).concat([mk('pop', 'xx', [5, 2, 1]), mk('rock', 'xx', [1, 4, 4])]);
  B.picks.pool = shelf.filter((id, k) => k % 3 === 1).concat([mk('jazz', 'xx', [2, 5, 2]), mk('folk', 'xx', [1, 2, 5])]);
  B.feature.pool = top.slice();
  for (const k of BIN_KEYS) B[k].front = B[k].pool.slice(0, 4);
  return B;
}
let BINS = C0.bins, fakeBins = false;
if (!BINS.feature) { fakeBins = true; BINS = contractBins(); }
const C = Object.assign({}, C0, { cards: CARDS, bins: BINS });

// ---------------- helpers ----------------
const card = id => { const c = C.cards[id]; if (!c) throw new Error('missing card ' + id); return c; };
const ENEMY_IDS = ['man', ...C.normals, ...C.elites, C.boss];
const RELIC_IDS = Object.keys(C.relics);
const HINTS = { c: C.hints.c.map(h => h.id), o: C.hints.o.map(h => h.id), h: C.hints.h.map(h => h.id) };
const otherTier = (tier, k) => TIERS.filter(t => t !== tier)[k % 2];
const BP3 = [C.bargain.pool[0], C.bargain.pool[3], C.bargain.pool[6]];     // 每色一張
const relicObjs = rs => rs.map(r => typeof r === 'string' ? EN.relicObj(r, C) : r);
const HEADPHONE_ON = Object.assign({}, C.relics.headphone, { v4: true });
function pDefFor(tier, o = {}) {
  return { hp: o.hp, bag: (o.bag || [...C.gifts[tier], ...BP3]).map(card), ace: o.noAce ? null : card(C.aces[tier]), relics: relicObjs(o.relics || []) };
}
function startFor(id, tier, seed, o = {}) {
  const eDef = Object.assign(EN.enemyDef(C, id, { tutorial: !!o.tutorial, depth: o.depth }), o.eOver || {});
  return EN.startDuel(pDefFor(tier, o), eDef, { seed, enemyAce: eDef.boss ? card(C.aces[otherTier(tier, seed)]) : null, script: o.script || null, hintTable: HINTS });
}
// cards are never mutated by the rules → a structural clone that shares card objects is enough (fast)
function fastClone(st) {
  const P = st.p, E = st.e;
  return { ...st, over: st.over ? { ...st.over } : null, plan: st.plan ? { ...st.plan, hint: { ...st.plan.hint } } : null, stats: { ...st.stats }, log: st.log.slice(),
    p: { ...P, draw: P.draw.slice(), hand: P.hand.slice(), disc: P.disc.slice(), relics: P.relics.slice() },
    e: { ...E, pile: E.pile.slice(), hand: E.hand.slice(), thrown: E.thrown.slice(), deckIds: E.deckIds.slice() } };
}
const clashOf = evs => evs.find(e => e.t === 'clash');
const sig = r => r && { kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked, by: r.by, notes: r.notes || [] };
function lcg(s) { s = s >>> 0; return () => (s = (Math.imul(s, 1103515245) + 12345) >>> 0) / 4294967296; }
function play(d, pol, R, mem = {}, max = 40) { const evs = []; let g = 0; while (!d.over && g++ < max) { const act = EN.policies[pol](d, R, mem, C); ok(EN.isLegal(d, act), 'policy ' + pol + ' legal', act); evs.push(...EN.resolveTurn(d, act)); } return evs; }
function mkCard(id, c, o, h, tier) { return { id, artist: id, album: id, c, o, h, tier: tier || null }; }
// RNG 取用次數：mulberry32 每次 state += 0x6D2B79F5（mod 2^32）→ 次數＝差 × 逆元
const M32 = 1n << 32n;
function modInv(a, m) { let [r0, r1, s0, s1] = [a, m, 1n, 0n]; while (r1) { const q = r0 / r1; [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return ((s0 % m) + m) % m; }
const INV = modInv(0x6D2B79F5n, M32);
const rngCalls = (before, after) => Number(((((BigInt(after) - BigInt(before)) % M32) + M32) % M32) * INV % M32);
const relicSet = s => {
  if (s % 5 === 0) return [];
  if (s % 5 === 1) return [RELIC_IDS[s % RELIC_IDS.length]];
  const boost = ['boost_c', 'boost_o', 'boost_h'][s % 3], rest = RELIC_IDS.filter(r => r !== boost && r !== 'headphone');
  const out = [boost, rest[(s * 7) % rest.length], rest[(s * 13 + 3) % rest.length]].filter((x, k, a) => a.indexOf(x) === k);
  return s % 7 === 0 ? out.slice(0, 2).concat([HEADPHONE_ON]) : out;
};

// =====================================================================================================
section('1 preview === resolve（10 客人 × 3 王牌 × 400 種子；每一手每一個合法動作；配件組合）', () => {
  const seeds = QUICK ? 40 : 400;
  let checked = 0;
  for (const id of ENEMY_IDS) for (const tier of TIERS) for (let s = 1; s <= seeds; s++) {
    const { duel } = startFor(id, tier, s * 7919 + 13, { relics: relicSet(s), depth: s % 5 });
    const R = lcg(s);
    let g = 0;
    while (!duel.over && g++ < 12) {
      const before = JSON.stringify(duel);
      const acts = EN.legalActions(duel), eSide = { i: duel.plan.idx, attr: duel.plan.attr };
      for (const act of acts) {
        const pv = EN.preview(duel, act, eSide);
        const c2 = fastClone(duel);
        const cl = clashOf(EN.resolveTurn(c2, act));
        if (!ok(!!pv && !!cl, 'preview/resolve exist', { id, tier, s })) continue;
        if (JSON.stringify(sig(pv)) !== JSON.stringify(sig(cl))) ok(false, 'preview === clash', { id, tier, s, n: duel.n, act, want: sig(pv), got: sig(cl) });
        else pass++;
        checked++;
      }
      ok(JSON.stringify(duel) === before, 'preview is pure (state unchanged)', { id, tier, s, n: duel.n });
      EN.resolveTurn(duel, acts[Math.floor(R() * acts.length)]);
    }
    ok(!!duel.over && duel.n <= CFG.maxRounds, 'duel ends within 6 hands', { id, tier, s, n: duel.n });
  }
  console.log('     ' + checked + ' action previews checked');
});

section('2 誠實度：每一級 ≥60,000 手照實比例＝q±0.01；ace／script／headphone 100% 照實；唬人出 BEATS[提示]；王牌不變式', () => {
  const target = QUICK ? 12000 : 60000;
  const LV = { honest: ['man'], sometimes: C.normals, often: C.elites, veteran: [C.boss] };
  const whyN = {};
  for (const [lv, ids] of Object.entries(LV)) {
    let hands = 0, honest = 0, aceThrows = 0;
    for (let s = 1; hands < target; s++) {
      const id = ids[s % ids.length], tier = TIERS[s % 3];
      const { duel } = startFor(id, tier, s * 31 + 7 + lv.length, { depth: s % 5 });
      const R = lcg(s * 3 + 1);
      while (!duel.over) {
        const pl = duel.plan, eCard = duel.e.hand[pl.idx];
        whyN[pl.why] = (whyN[pl.why] || 0) + 1;
        if (pl.why === 'honest' || pl.why === 'bluff') { hands++; if (pl.why === 'honest') honest++; }
        if (pl.why === 'bluff') { if (pl.attr !== BEATS[pl.hint.attr] || pl.bluff !== true || eCard.tier) ok(false, 'bluff plays BEATS[hint] and never the ace', pl); else pass++; }
        else if (pl.attr !== pl.hint.attr || pl.bluff) ok(false, pl.why + ' → honest', pl);
        if (pl.why === 'ace' && !(eCard.tier && pl.hint.attr === EN.aceAxis(eCard))) ok(false, 'why ace → plays the ace on its axis', pl);
        const cl = clashOf(EN.resolveTurn(duel, EN.policies.random(duel, R)));
        if (cl.eCard !== eCard || cl.eAttr !== pl.attr || cl.bluff !== pl.bluff) ok(false, 'clash shows the planned play', { pl, eAttr: cl.eAttr });
        if (cl.eCard.tier) { aceThrows++; if (cl.hint.attr !== EN.aceAxis(cl.eCard) || cl.bluff) ok(false, 'ace thrown → hint is its axis, no bluff', cl.hint); }
      }
    }
    const q = C.honesty[lv].q, f = honest / hands;
    ok(Math.abs(f - q) <= 0.01, 'honest rate ' + lv + ' = ' + q + ' ± 0.01', f.toFixed(4));
    console.log('     ' + lv + ': honest ' + f.toFixed(4) + ' (q ' + q + ') over ' + hands + ' hands' + (aceThrows ? '; ace thrown ' + aceThrows : ''));
  }
  // 王牌不變式：藏家 × 3 王牌 × ≥20,000 場
  const games = QUICK ? 1500 : 20000;
  let aceHands = 0, bluffHands = 0;
  for (const tier of TIERS) for (let s = 1; s <= games; s++) {
    const { duel } = startFor('boss', tier, s * 911 + 3, { depth: 4 });
    const R = lcg(s + 17);
    while (!duel.over) {
      const cl = clashOf(EN.resolveTurn(duel, EN.policies.random(duel, R)));
      if (cl.eCard.tier) { aceHands++; if (cl.hint.attr !== EN.aceAxis(cl.eCard) || cl.bluff) ok(false, 'boss ace invariant', cl.hint); }
      if (cl.bluff) { bluffHands++; if (cl.eCard.tier) ok(false, 'bluff never throws the ace'); }
    }
  }
  ok(aceHands > 0 && bluffHands > 0, 'boss threw his ace and bluffed', { aceHands, bluffHands });
  console.log('     boss × 3 × ' + games + ': ace thrown ' + aceHands + ', bluffs ' + bluffHands + '; why ' + JSON.stringify(whyN));
  // script：100% 照實（教學）；headphone（v4 打開）：第一手照實
  for (const tier of TIERS) for (let s = 1; s <= 30; s++) {
    const { duel } = startFor('man', tier, s, { tutorial: true, script: C.tutorial.script[tier] });
    while (!duel.over) { ok(duel.plan.why === 'script' && !duel.plan.bluff, 'script → honest'); EN.resolveTurn(duel, EN.policies.random(duel, lcg(s))); }
  }
  let hp1 = 0, hpLater = 0;
  for (let s = 1; s <= 400; s++) {
    const { duel } = startFor('copycat', TIERS[s % 3], s, { relics: [HEADPHONE_ON], eOver: { q: 0 } });
    ok(duel.plan.why === 'headphone' && !duel.plan.bluff, 'headphone (v4 on) → first hand honest', duel.plan);
    if (duel.plan.why === 'headphone') hp1++;
    EN.resolveTurn(duel, EN.legalActions(duel)[0]);
    if (!duel.over) { if (duel.plan.why === 'bluff') hpLater++; ok(duel.plan.why !== 'headphone', 'headphone only on hand 1'); }
    const off = startFor('copycat', TIERS[s % 3], s, { relics: ['headphone'], eOver: { q: 0 } }).duel;
    ok(off.plan.why === 'bluff', 'headphone (v4 off) does nothing', off.plan.why);
  }
  ok(hp1 === 400 && hpLater > 300, 'headphone counts', { hp1, hpLater });
});

section('3 決定性：同種子同動作 → 同事件；每手 RNG 固定 8 次；mercy=false 次數不變、結果不同', () => {
  for (let s = 1; s <= 120; s++) {
    const id = ENEMY_IDS[s % 10], tier = TIERS[s % 3];
    const a = startFor(id, tier, s * 101, { depth: s % 5 }), b = startFor(id, tier, s * 101, { depth: s % 5 });
    eq(a.events, b.events, 'start events equal');
    const ea = play(a.duel, 'thoughtful', lcg(s)), eb = play(b.duel, 'thoughtful', lcg(s));
    eq(ea, eb, 'event streams equal ' + id);
    eq(a.duel, b.duel, 'final state equal');
  }
  const r1 = EN.newRun(C, { seedKey: '2026-11-07', nightNo: 1, ace: 'hall' }), r2 = EN.newRun(C, { seedKey: '2026-11-07', nightNo: 1, ace: 'pearl' });
  eq(r1.order, r2.order, 'same date → same guests whatever the ace');
  // RNG：beginHand 每手 8 次；resolveTurn 沒洗牌時＝8 次（男子、客人、教學）
  const count = (d) => { const c = JSON.parse(JSON.stringify(d)); c.plan = null; c.n--; const b = c.rng; EN.beginHand(c, []); return rngCalls(b, c.rng); };
  let measured = 0;
  const kinds = [['man', {}], ['copycat', { depth: 0 }], ['label', { depth: 3 }], ['boss', { depth: 4 }], ['man', { tutorial: true, script: C.tutorial.script.hall }]];
  for (const [id, o] of kinds) for (let s = 1; s <= 60; s++) {
    const { duel } = startFor(id, o.script ? 'hall' : TIERS[s % 3], s * 13, o);
    const R = lcg(s);
    while (!duel.over) {
      if (count(duel) !== 8) ok(false, 'beginHand takes 8 RNG ' + id, count(duel)); else pass++;
      const b = duel.rng, evs = EN.resolveTurn(duel, EN.policies.random(duel, R));
      const dr = evs.find(e => e.t === 'draw');
      if (!duel.over && !(dr && dr.reshuffled)) { if (rngCalls(b, duel.rng) !== 8) ok(false, 'resolveTurn takes 8 RNG (no reshuffle)', rngCalls(b, duel.rng)); else pass++; }
      measured++;
    }
  }
  console.log('     RNG counted on ' + measured + ' hands');
  // mercy=false：次數不變、計畫會不同
  let diff = 0;
  try {
    for (let s = 1; s <= 300; s++) {
      CFG.mercy = true; const a = startFor('critic', TIERS[s % 3], s * 5, { depth: 3 }).duel;
      CFG.mercy = false; const b = startFor('critic', TIERS[s % 3], s * 5, { depth: 3 }).duel;
      const Ra = lcg(s), Rb = lcg(s);
      while (!a.over && !b.over) {
        if (a.plan.hint.attr !== b.plan.hint.attr) diff++;
        CFG.mercy = false; if (count(b) !== 8) ok(false, 'mercy=false still 8 RNG');
        const actA = EN.legalActions(a)[Math.floor(Ra() * EN.legalActions(a).length)], actB = EN.legalActions(b)[Math.floor(Rb() * EN.legalActions(b).length)];
        CFG.mercy = true; EN.resolveTurn(a, actA);
        CFG.mercy = false; EN.resolveTurn(b, actB);
      }
    }
  } finally { CFG.mercy = true; }
  ok(diff > 0, 'mercy=false changes some plans', diff);
});

// 一晚的推進器（sim／整晚測試共用）：bargainPick → (shop → fight → finish → reward…)
function nightStep(run, pol, mode, R, log, mem) {
  if (run.over && !run.pending) return false;
  if (EN.canBargainPick(run) && !run.duel && !run.pending) { const ch = EN.bargainPolicy(run, C); const r = EN.choose(run, C, ch); ok(r.ok, 'bargainPick ok', r.error); log.push(['bp', ch.ids]); return true; }
  const step = EN.nextStep(run);
  if (step === 'reward' || step === 'retry') { const ch = EN.runPolicy(run, C); const r = EN.choose(run, C, ch); ok(r.ok, 'runPolicy choice ok', { ch, err: r.error }); log.push([step, ch, r.ok]); return true; }
  if (!step) return false;
  if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, C, mode)) { ok(ch.sellId == null || !EN.isGift(run, C, ch.sellId), 'shopPolicy never sells a gift', ch); const r = EN.choose(run, C, ch); ok(r.ok, 'shopPolicy choice ok', { ch, err: r.error }); log.push(['shop', ch]); }
  ok(run.money >= 0, 'money ≥ 0', run.money);
  const f = EN.startFight(run, C, {});
  const evs = play(f.duel, pol, R, mem);
  log.push(['duel', f.enemyId, evs.length]);
  const res = EN.finishFight(run, C);
  log.push(['finish', res.win, res.earn, run.money]);
  ok(run.money >= 0, 'money ≥ 0', run.money);
  return true;
}
function playNight(run, pol, mode, R, log = [], max = 200) { let g = 0; const mem = {}; while (g++ < max && nightStep(run, pol, mode, R, log, mem)); return log; }

section('4 存讀檔：對決打到一半、run 打到一半（含 money、shop）JSON 存讀後接著打，事件一模一樣', () => {
  for (let s = 1; s <= 150; s++) {
    const id = ENEMY_IDS[s % 10], tier = TIERS[s % 3];
    const { duel } = startFor(id, tier, s * 977, { relics: relicSet(s), depth: s % 5 });
    const R = lcg(s);
    for (let k = 0; k < 2 && !duel.over; k++) EN.resolveTurn(duel, EN.policies.novice(duel, R, {}, C));
    if (duel.over) continue;
    const saved = JSON.parse(JSON.stringify(duel));
    const ea = play(duel, 'thoughtful', lcg(s + 99)), eb = play(saved, 'thoughtful', lcg(s + 99));
    eq(ea, eb, 'resumed duel events equal ' + id);
    eq(EN.view(duel), EN.view(saved), 'resumed view equal');
  }
  for (let s = 1; s <= (QUICK ? 10 : 40); s++) {
    const run = EN.newRun(C, { seedKey: 'save-' + s, nightNo: 1 + (s % 2), ace: TIERS[s % 3] });
    const R = lcg(s), log = [];
    for (let k = 0; k < 4 + (s % 4); k++) nightStep(run, 'thoughtful', 'smart', R, log, {});
    const saved = JSON.parse(JSON.stringify(run));
    ok(saved.v === 4 && typeof saved.money === 'number' && saved.shop && saved.shop.bins, 'run JSON has v4 money and shop');
    const la = playNight(run, 'thoughtful', 'smart', lcg(s + 5)), lb = playNight(saved, 'thoughtful', 'smart', lcg(s + 5));
    eq(la, lb, 'resumed night log equal');
    eq(run, saved, 'resumed night end state equal');
  }
});

section('5 規則抽查', () => {
  const X = (pa, ps, ea, es, pace, eace) => EN.clash({ attr: pa, star: ps, ace: !!pace }, { attr: ea, star: es, ace: !!eace });
  eq(X('o', 4, 'c', 5), { kind: 'counter', toE: 4, toP: 0, blocked: null, by: 'p' }, '冷 4 剋經 5 → counter 4');
  eq(X('o', 3, 'c', 5), { kind: 'mirrorLose', toE: 0, toP: 2, blocked: 'gap', by: 'p' }, '冷 3 剋經 5 → 剋不動、比星你 −2');
  eq(X('o', 3, 'c', 4), { kind: 'counter', toE: 3, toP: 0, blocked: null, by: 'p' }, '冷 3 剋經 4 → counter 3');
  eq(X('c', 5, 'c', 3), { kind: 'mirrorWin', toE: 2, toP: 0, blocked: null, by: null }, '同色 5 比 3 → 他 −2');
  eq(X('h', 3, 'h', 3), { kind: 'tie', toE: 0, toP: 0, blocked: null, by: null }, '同色同星 → tie');
  // FIXLIST 2：王牌沒有「不會被剋」，只是 7 星：照三相剋＋差 2 星門檻
  eq(X('o', 5, 'c', 7, false, true), { kind: 'mirrorLose', toE: 0, toP: 2, blocked: 'gap', by: 'p' }, '他王牌經 7 被你冷 5 剋 → 差 2 星剋不動、你 −2');
  eq(X('o', 6, 'c', 7, false, true), { kind: 'counter', toE: 6, toP: 0, blocked: null, by: 'p' }, '他王牌經 7 被你冷 6（加成）剋 → 差 1 星剋得動、他 −6');
  eq(X('h', 7, 'c', 2, true, false), { kind: 'mirrorWin', toE: 5, toP: 0, blocked: 'gap', by: 'e' }, '你王牌硬 7 被他經 2 剋 → 他剋不動、他 −5');
  eq(X('h', 7, 'c', 6, true, false), { kind: 'countered', toE: 0, toP: 6, blocked: null, by: 'e' }, '你王牌硬 7 被他經 6 剋 → 被剋 6');
  eq(X('c', 7, 'o', 7, true, true), { kind: 'countered', toE: 0, toP: 7, blocked: null, by: 'e' }, '王牌對王牌：他冷 7 剋你經 7 → 被剋 7');
  eq(X('o', 7, 'c', 7, true, true), { kind: 'counter', toE: 7, toP: 0, blocked: null, by: 'p' }, '王牌對王牌：你冷 7 剋他經 7 → 他 −7');
  eq(X('h', 7, 'h', 7, true, true).kind, 'tie', '王牌對王牌同色 → tie');
  for (let a = 1; a <= 7; a++) for (let b = 1; b <= 7; b++) for (const pa of ATTRS) for (const ea of ATTRS) for (const fl of [[false, false], [true, false], [false, true], [true, true]]) {
    const r1 = X(pa, a, ea, b, fl[0], fl[1]), r0 = X(pa, a, ea, b);
    if (JSON.stringify(r1) !== JSON.stringify(r0)) ok(false, 'ace flag never changes the clash', { pa, a, ea, b, fl }); else pass++;
    if (r1.blocked === 'ace') ok(false, 'no blocked:ace');
  }
  eq(X('c', 5, 'o', 3), { kind: 'mirrorWin', toE: 2, toP: 0, blocked: 'gap', by: 'e' }, '他冷 3 剋你經 5 → 他剋不動、比星他 −2');
  eq(X('c', 4, 'o', 3), { kind: 'countered', toE: 0, toP: 3, blocked: null, by: 'e' }, '他冷 3 剋你經 4 → 被剋 3');
  eq(X('o', 2, 'c', 4).blocked, 'gap', '差剛好 2 → 剋不動');
  eq(EN.clash({ attr: 'o', star: 2 }, { attr: 'c', star: 4 }, { threshold: 3 }).kind, 'counter', 'threshold 3 → 差 2 剋得動');
  eq(EN.clash(4, 'o', 5, 'c').kind, 'counter', 'v3 墊片：clash(pStar, pAttr, eStar, eAttr)');
  for (const x of ATTRS) { ok(EN.beats(x, BEATS[x]) && !EN.beats(BEATS[x], x), 'beats ' + x); ok(BEATS[COUNTER_OF[x]] === x, 'COUNTER_OF ' + x); }
  // boost_o 冷 3→4 對經 5 → 不再 blocked
  const d = rig(['boost_o'], [mkCard('p-o3', 1, 3, 1)], [mkCard('e1', 5, 1, 1)]);
  const r = EN.preview(d, { i: 0, attr: 'o' }, { attr: 'c', star: 5, ace: false });
  eq([r.kind, r.toE, r.blocked], ['counter', 4, null], 'boost_o 冷 3→4 對經 5 → counter 4');
  const d0 = rig([], [mkCard('p-o3', 1, 3, 1)], [mkCard('e1', 5, 1, 1)]);
  eq(EN.preview(d0, { i: 0, attr: 'o' }, { attr: 'c', star: 5 }).blocked, 'gap', '沒加成 → 剋不動');
  // topAttr／peak／deckMain
  eq([EN.topAttr(mkCard('a', 2, 2, 1)), EN.topAttr(mkCard('b', 1, 3, 3)), EN.topAttr(mkCard('c', 1, 2, 4))], ['c', 'o', 'h'], 'topAttr 並列 c→o→h');
  eq(EN.peak(mkCard('a', 2, 5, 3)), 5, 'peak');
  eq(EN.deckMain([mkCard('a', 5, 5, 1), mkCard('b', 1, 4, 1)], 'coh'), 'o', 'deckMain：並列峰值各算一票');
  eq(EN.deckMain([mkCard('a', 5, 1, 1), mkCard('b', 1, 1, 4)], 'hco'), 'h', 'deckMain：票數並列照 taste');
  // 王牌：一場一次、只能出 7 星那軸、不補牌
  for (const tier of TIERS) {
    const { duel } = startFor('copycat', tier, 5);
    const acts = EN.legalActions(duel), aces = acts.filter(a => a.ace);
    ok(aces.length === 1 && aces[0].attr === C.aceAxis[tier] && acts.length === 3 * CFG.handSize + 1, 'one ace action on the 7 axis (hand ' + CFG.handSize + ' × 3 colours + ace)', { aces, n: acts.length });
    eq(duel.p.hand.length, CFG.handSize, 'your hand ' + CFG.handSize + ' (FIXLIST 11)');
    ok(!EN.isLegal(duel, { ace: true, attr: ATTRS.find(a => a !== C.aceAxis[tier]) }), 'ace on another axis is illegal');
    const hand0 = duel.p.hand.map(c => c.id);
    const cl = clashOf(EN.resolveTurn(duel, { ace: true }));
    ok(cl.ace && cl.pStar === 7 && cl.pAttr === C.aceAxis[tier], 'ace throws 7 on its axis', cl);
    if (!duel.over) {
      ok(!EN.legalActions(duel).some(a => a.ace) && !EN.isLegal(duel, { ace: true }), 'ace only once per duel');
      eq(duel.p.hand.map(c => c.id), hand0, 'ace does not draw');
      const v = EN.view(duel);
      ok(v.ace === null && v.aceUsed && v.aceCard.id === C.aces[tier], 'view after the ace');
      const before = JSON.stringify(duel);
      eq(EN.resolveTurn(duel, { ace: true }), [], 'illegal act → no events');
      ok(JSON.stringify(duel) === before, 'illegal act changes nothing');
    }
  }
  // 他的手牌 3 張、不洗回；公開牌單＝牌單＋王牌
  const bd = startFor('boss', 'hall', 9).duel;
  ok(bd.e.hand.length === 3 && bd.e.deckIds.length === 7 && bd.e.deckIds.includes(C.aces[otherTier('hall', 9)]), 'boss: hand 3, public list 6 + ace');
});

// 擺好的對決：你的手牌、他的牌照順序（script），配件
function rig(relics, pCards, eCards, o = {}) {
  const eAttrs = o.eAttrs || eCards.map(() => 'c');
  const pDef = { hp: o.pHp, bag: pCards, ace: o.ace || null, relics: relicObjs(relics) };
  const eDef = { id: 'rig', name: 'rig', hp: o.eHp || 30, deck: eCards, honesty: 'honest', q: 1, planner: 'normal', coef: { w: 0.6, nz: 1.4, mercy: true }, taste: 'coh' };
  return EN.startDuel(pDef, eDef, { seed: 7, script: { plays: eCards.map((c, k) => ({ id: c.id, attr: eAttrs[k] })), hints: eAttrs.map(a => a + '1'), hand: pCards.slice(0, 3).map(c => c.id), draw: pCards.slice(3).map(c => c.id) } }).duel;
}

// 六手比的是聲望條剩幾成（FIXLIST 3：hp÷max，一樣算你贏；engine.playerAhead 一個函式）
section('6 六手上限：比聲望條剩幾成（一樣算你贏）；落後一手再 tie → 你輸；牌出完 → pile；兩邊都 ≤0 也照比例', () => {
  // playerAhead：交叉相乘、一樣算你贏
  ok(EN.playerAhead(10, 10, 18, 18) && EN.playerAhead(5, 10, 9, 18) && EN.playerAhead(6, 10, 9, 18) && !EN.playerAhead(4, 10, 9, 18), 'playerAhead: 比例、一樣算你贏');
  ok(!EN.playerAhead(9, 10, 19, 20) && EN.playerAhead(19, 20, 9, 10) && EN.playerAhead(-1, 3, -2, 3) && !EN.playerAhead(-2, 3, -1, 3), 'playerAhead: 0.9<0.95、負數也照比例');
  eq([EN.hpPct(6, 10), EN.hpPct(9, 18), EN.hpPct(-3, 10), EN.hpPct(7, 15)], [60, 50, 0, 47], 'hpPct');
  eq([EN.pctPair(6, 10, 9, 18), EN.pctPair(9, 10, 28, 31), EN.pctPair(5, 10, 15, 30), EN.pctPair(-1, 10, 3, 30)],
    [{ p: '60', e: '50' }, { p: '90.0', e: '90.3' }, { p: '50', e: '50' }, { p: '0', e: '10' }], 'pctPair: integers unless they would hide the winner');
  // 你 9／10、客人 12–40：pctPair 顯示的大小永遠跟 playerAhead 一致（一樣大 ⇔ 真的一樣大）
  for (const P of [9, 10]) for (let E = 12; E <= 40; E++) for (let e = 0; e <= E; e++) for (let p = 0; p <= P; p++) {
    const t = EN.pctPair(p, P, e, E), a = EN.playerAhead(p, P, e, E), b = EN.playerAhead(e, E, p, P);
    const shown = +t.p > +t.e ? 'p' : +t.p < +t.e ? 'e' : 'tie', real = a && b ? 'tie' : a ? 'p' : 'e';
    if (shown !== real) ok(false, 'pctPair consistent', { p, e, E, t }); else pass++;
  }
  // 這一段的比例照「你 10」寫（6/10 vs 9/18…）：明確給你 10，跟 CFG.playerHp（現在 9）無關；最後一個 g 才用 CFG.playerHp
  const T = { debugOutcome: { kind: 'tie', toE: 0, toP: 0 } }, E10 = { hp: 10, eOver: { hp: 10 } }, Y10 = { hp: 10 };
  for (let s = 1; s <= 30; s++) {
    const { duel } = startFor('copycat', TIERS[s % 3], s, E10);
    const evs = [];
    for (let k = 0; k < 6; k++) { ok(!duel.over, 'not over before hand ' + (k + 1)); evs.push(...EN.resolveTurn(duel, EN.legalActions(duel)[0], T)); }
    ok(duel.over && duel.over.by === 'rounds' && duel.over.win === true && duel.n === 6, 'six ties → rounds, you win', duel.over);
    eq(evs.filter(e => e.t === 'over').length, 1, 'one over event');
    const b = startFor('copycat', TIERS[s % 3], s, E10).duel;
    EN.resolveTurn(b, EN.legalActions(b)[0], { debugOutcome: { kind: 'mirrorLose', toE: 0, toP: 1 } });
    for (let k = 0; k < 5; k++) EN.resolveTurn(b, EN.legalActions(b)[0], T);
    ok(b.over && b.over.by === 'rounds' && b.over.win === false, 'behind one → rounds, you lose', b.over);
    const c = startFor('copycat', TIERS[s % 3], s, E10).duel;
    EN.resolveTurn(c, EN.legalActions(c)[0], { debugOutcome: { kind: 'mirrorWin', toE: 1, toP: 0 } });
    EN.resolveTurn(c, EN.legalActions(c)[0], { debugOutcome: { kind: 'mirrorLose', toE: 0, toP: 1 } });
    for (let k = 0; k < 4; k++) EN.resolveTurn(c, EN.legalActions(c)[0], T);
    ok(c.over && c.over.win === true, 'level after 6 → you win', c.over);
    const g = startFor('copycat', TIERS[s % 3], s).duel;     // 客人聲望 25 > 你 9：六手都 tie → 兩邊都滿條（100%＝100%）→ 你贏（舊規則比絕對值是他贏）
    const ge = []; for (let k = 0; k < 6; k++) ge.push(...EN.resolveTurn(g, EN.legalActions(g)[0], T));
    ok(g.over && g.over.by === 'rounds' && g.over.win === true, 'rounds compare the bar (9/9 = 25/25 → you win)', g.over);
    const ov = ge.find(e => e.t === 'over');
    ok(ov && ov.pPct === 100 && ov.ePct === 100 && ov.pMax === CFG.playerHp && ov.eMax === C.enemies.copycat.hp && ov.pct.p === '100' && ov.pct.e === '100', 'over event has pMax／eMax／pPct／ePct／pct', ov);
    // 你 6/10（60%）、他 9/18（50%）→ 你贏（舊規則 6 < 9 是你輸）；你 4/10、他 9/18 → 你輸
    const h = startFor('copycat', TIERS[s % 3], s, { ...Y10, eOver: { hp: 18 } }).duel;
    EN.resolveTurn(h, EN.legalActions(h)[0], { debugOutcome: { kind: 'counter', toE: 9, toP: 4 } });
    for (let k = 0; k < 5; k++) EN.resolveTurn(h, EN.legalActions(h)[0], T);
    ok(h.over && h.over.by === 'rounds' && h.over.win === true && h.p.hp === 6 && h.e.hp === 9, '60% vs 50% → you win', h.over);
    const i2 = startFor('copycat', TIERS[s % 3], s, { ...Y10, eOver: { hp: 18 } }).duel;
    EN.resolveTurn(i2, EN.legalActions(i2)[0], { debugOutcome: { kind: 'counter', toE: 9, toP: 6 } });
    for (let k = 0; k < 5; k++) EN.resolveTurn(i2, EN.legalActions(i2)[0], T);
    ok(i2.over && i2.over.win === false && i2.p.hp === 4, '40% vs 50% → you lose', i2.over);
  }
  const save = CFG.maxRounds;
  try {
    CFG.maxRounds = 99;
    const { duel } = startFor('copycat', 'hall', 3, E10);
    let g = 0; while (!duel.over && g++ < 20) EN.resolveTurn(duel, EN.legalActions(duel)[0], T);
    ok(duel.over && duel.over.by === 'pile' && duel.n === 7 && duel.over.win, 'his 7 records run out → pile', { over: duel.over, n: duel.n });
  } finally { CFG.maxRounds = save; }
  // 兩邊同一手都 ≤0 → 同一個 playerAhead（負數也照比例）
  const both = startFor('copycat', 'hall', 4, { hp: 3 }).duel;
  both.e.hp = 3; both.e.max = 3;
  EN.resolveTurn(both, EN.legalActions(both)[0], { debugOutcome: { kind: 'counter', toE: 5, toP: 4 } });
  ok(both.over && both.over.by === 'hp' && both.over.win === true, 'both ≤0 → you −1/3 ≥ him −2/3 → you win', both.over);
  const both2 = startFor('copycat', 'hall', 4, { hp: 3 }).duel;
  both2.e.hp = 3; both2.e.max = 3;
  EN.resolveTurn(both2, EN.legalActions(both2)[0], { debugOutcome: { kind: 'counter', toE: 4, toP: 5 } });
  ok(both2.over && both2.over.win === false, 'both ≤0 → you −2/3 < him −1/3 → you lose', both2.over);
  const both3 = startFor('copycat', 'hall', 4, { hp: 10 }).duel;     // 你 −2/10、他 −3/18：比例他高 → 你輸（絕對值會是你贏）
  both3.e.hp = 15; both3.e.max = 18; both3.p.hp = 2;
  EN.resolveTurn(both3, EN.legalActions(both3)[0], { debugOutcome: { kind: 'counter', toE: 18, toP: 4 } });
  ok(both3.over && both3.over.win === false && both3.p.hp === -2 && both3.e.hp === -3, 'both ≤0 → −2/10 < −3/18 → you lose', { over: both3.over, p: both3.p.hp, e: both3.e.hp });
});

section('7 每一件發燒配件（9 件）', () => {
  const pv = (d, act, e) => EN.preview(d, act, e);
  const P1 = [mkCard('pc3', 3, 1, 1), mkCard('po3', 1, 3, 1), mkCard('ph3', 1, 1, 3)];
  const E1 = [mkCard('e1', 2, 2, 2), mkCard('e2', 2, 2, 2), mkCard('e3', 2, 2, 2), mkCard('e4', 2, 2, 2)];
  // stylus／obi／testpress：那色剋中多扣 1
  for (const [rid, a, e] of [['stylus', 'h', 'o'], ['obi', 'c', 'h'], ['testpress', 'o', 'c']]) {
    const d = rig([rid], P1, E1), i = P1.findIndex(c => c[a] === 3);
    const r = pv(d, { i, attr: a }, { attr: e, star: 2 });
    eq([r.kind, r.toE, r.notes.map(n => n.relic)], ['counter', 4, [rid]], rid + '：剋中多扣 1');
    const other = ATTRS.find(x => x !== a), r2 = pv(d, { i: P1.findIndex(c => c[other] === 3), attr: other }, { attr: BEATS[other], star: 2 });
    eq([r2.kind, r2.toE, r2.notes.length], ['counter', 3, 0], rid + '：別色不加');
  }
  // cleaner：tie 你扣他 1
  { const d = rig(['cleaner'], P1, E1); const r = pv(d, { i: 0, attr: 'c' }, { attr: 'c', star: 3 }); eq([r.kind, r.toE, r.toP], ['tie', 1, 0], 'cleaner：tie → 他 −1'); }
  // dustcover：每場第一次被剋少扣 1（commit 才記）
  {
    const P = [mkCard('p1', 1, 1, 1), mkCard('p2', 1, 1, 1), mkCard('p3', 1, 1, 1), mkCard('p4', 1, 1, 1)];
    const d = rig(['dustcover'], P, [mkCard('e1', 1, 5, 1), mkCard('e2', 1, 5, 1), mkCard('e3', 1, 5, 1), mkCard('e4', 1, 5, 1)], { eAttrs: ['o', 'o', 'o', 'o'], pHp: 20 });
    const a = pv(d, { i: 0, attr: 'c' }, { i: d.plan.idx, attr: 'o' });
    eq([a.kind, a.toP], ['countered', 4], 'dustcover preview：5 → 4');
    ok(!d.p.dustUsed, 'preview does not use the dustcover');
    const c1 = clashOf(EN.resolveTurn(d, { i: 0, attr: 'c' }));
    eq([c1.kind, c1.toP, d.p.dustUsed], ['countered', 4, true], 'dustcover：first countered −1');
    const c2 = clashOf(EN.resolveTurn(d, { i: 0, attr: 'c' }));
    eq([c2.kind, c2.toP], ['countered', 5], 'dustcover：only once per duel');
  }
  // boost_c／o／h：那色出招 +1 星（王牌不加）
  {
    const d = rig(['boost_c', 'boost_o', 'boost_h'], P1, E1, { ace: card(C.aces.hall) });
    for (const a of ATTRS) {
      const i = P1.findIndex(c => c[a] === 3);
      const r = pv(d, { i, attr: a }, { attr: a, star: 3 });
      eq([r.kind, r.toE, r.notes.map(n => n.relic)], ['mirrorWin', 1, ['boost_' + a]], 'boost_' + a + '：+1 星');
    }
    const ra = pv(d, { ace: true }, { attr: 'c', star: 5 });
    eq([ra.kind, ra.toE, ra.notes.length], ['mirrorWin', 2, 0], '王牌不加 boost');
    const cl = clashOf(EN.resolveTurn(d, { i: 1, attr: 'o' }));
    eq([cl.pBase, cl.pStar], [3, 4], 'clash event: pBase 3, pStar 4');
  }
  // headphone：預設不上架（v4:false），newRun 濾掉；打開時第一手不唬人（#2 有測）
  ok(C.relics.headphone.v4 === false, 'headphone v4 off by default');
  eq(EN.newRun(C, { seedKey: 'hp', nightNo: 2, ace: 'hall', relics: ['headphone', 'dustcover', 'nope'] }).relics, ['dustcover'], 'newRun filters v4:false and unknown relics');
  ok(!C.rewards.relicPool.includes('headphone') && !C.relicShop.pool.includes('headphone'), 'headphone in no pool');
  // 三件同時：最多 3 件
  const many = rig(RELIC_IDS, P1, E1);
  eq(many.p.relics.length, 3, 'relicMax 3 in a duel');
});

section('8 newRun：500 種子 × 3 王牌（今晚來客、今晚的貨〔契約：每區 4–6、FEATURE 2–3 史詩／傳奇、全店不重複〕、特價箱、包包、時機）', () => {
  const seeds = QUICK ? 100 : 500;
  const seenBargain = { c: new Set(), o: new Set(), h: new Set() };
  const shopKeys = Object.keys(C.bins).filter(k => !C.bins[k].display);
  const seenStock = {}; for (const k of shopKeys) seenStock[k] = new Set();
  for (let s = 1; s <= seeds; s++) for (const ace of TIERS) {
    const night = 1 + (s % 3);
    const run = EN.newRun(C, { seedKey: 'nr-' + s, nightNo: night, ace });
    ok(run.v === 4 && run.prologue === (night === 1 ? 'pending' : null), 'v4, prologue only on night 1');
    ok(run.order.length === 5 && new Set(run.order.slice(0, 3)).size === 3 && run.order.slice(0, 3).every(x => C.normals.includes(x)) && C.elites.includes(run.order[3]) && run.order[4] === C.boss, 'order: 3 normals, 1 elite, boss', run.order);
    ok(run.bossAce !== ace && TIERS.includes(run.bossAce), 'boss ace is one you did not pick');
    eq(run.bag, C.gifts[ace], 'bag starts as the 4 gifts');
    ok(run.money === C.economy.start && run.shop.bargainPicked === false && !EN.canShop(run) && EN.canBargainPick(run), 'start: money, not picked, cannot shop, can pick');
    eq(Object.keys(run.shop.bins).sort(), shopKeys.slice().sort(), 'shop bins = non-display bins');
    const all = [];
    for (const k of shopKeys) {
      const st = run.shop.bins[k], pool = C.bins[k].pool, feat = k === 'feature';
      const lo = feat ? 2 : 4, hi = feat ? 3 : 6;
      if (!(st.length >= lo && st.length <= hi && st.every(id => pool.includes(id)) && new Set(st).size === st.length)) ok(false, 'bin ' + k + ' ' + lo + '–' + hi + ' ⊂ pool', st.length); else pass++;
      if (st.some(id => run.bag.includes(id) || id === C.aces[ace] || C.bargain.pool.includes(id))) ok(false, 'bin ' + k + ' excludes owned／bargain'); else pass++;
      const rs = st.map(id => EN.rarity(card(id)));
      if (!rs.every(r => feat ? (r === 'epic' || r === 'legendary') : ['common', 'rare', 'uncommon'].includes(r))) ok(false, 'bin ' + k + ' rarity', rs); else pass++;
      if (CATS.includes(k) && !st.every(id => EN.categoryOf(card(id)) === k)) ok(false, 'bin ' + k + ' only its category', st); else pass++;
      all.push(...st); st.forEach(id => seenStock[k].add(id));
    }
    if (new Set(all).size !== all.length) ok(false, 'nothing repeats across the shop', all.filter((x, k2) => all.indexOf(x) !== k2)); else pass++;
    ok(run.shop.relics.length >= 2 && run.shop.relics.length <= 3 && run.shop.relics.every(id => /^boost_/.test(id)) && new Set(run.shop.relics).size === run.shop.relics.length, 'counter 2–3 boost relics', run.shop.relics);
    const n = { c: 0, o: 0, h: 0 }; run.shop.bargain.forEach(id => { n[EN.topAttr(card(id))]++; seenBargain[EN.topAttr(card(id))].add(id); });
    ok(run.shop.bargain.length === 6 && n.c === 2 && n.o === 2 && n.h === 2, 'bargain 6 = 2 per color', n);
    const ch = EN.bargainPolicy(run, C), r = EN.choose(run, C, ch);
    ok(r.ok && run.bag.length === 7 && run.shop.bargain.length === 3 && run.shop.bargainPicked, 'bargainPick → bag 7, 3 left', r.error);
    ok(EN.canShop(run) === (night !== 1), 'can shop after the pick (prologue night: after the prologue)');
    ok(!EN.canBargainPick(run), 'pick only once');
    if (night === 1) { run.prologue = 'done'; ok(EN.canShop(run), 'prologue done → can shop'); }
  }
  for (const a of ATTRS) ok(seenBargain[a].size === 3, 'bargain color ' + a + ' shows all 3 cards across seeds', [...seenBargain[a]]);
  if (fakeBins) {
    eq(shopKeys.slice().sort(), BIN_KEYS.slice().sort(), 'contract bins: 11 categories + new + feature + picks, all for sale');
    for (const k of shopKeys) ok(seenStock[k].size >= 4, 'bin ' + k + ' rotates across nights', seenStock[k].size);
  }
  // 同一晚（同一個 seedKey＋nightNo）的貨一樣；換一晚會換
  { const a = EN.newRun(C, { seedKey: 'same', nightNo: 2, ace: 'hall' }), b = EN.newRun(C, { seedKey: 'same', nightNo: 2, ace: 'hall' }), c2 = EN.newRun(C, { seedKey: 'same', nightNo: 3, ace: 'hall' });
    eq(a.shop, b.shop, 'same night → same stock'); ok(JSON.stringify(a.shop.bins) !== JSON.stringify(c2.shop.bins), 'next night → new stock'); }
  for (let s = 1; s <= 50; s++) {
    const run = EN.newRun(C, { seedKey: 'rl-' + s, nightNo: 2, ace: 'hall', relics: ['boost_c', 'boost_o'] });
    eq(run.shop.relics, ['boost_h'], 'two boosts owned → counter has 1');
    eq(run.relics, ['boost_c', 'boost_o'], 'relics carried over');
  }
  ok(fakeBins || !!C.bins.feature || Object.keys(C.bins).some(k => C.bins[k].display), 'feature (contract) or old display areas exist');
});

section('9 整晚（thoughtful／high／random × shopPolicy none／smart）：一定結束、沒有非法選擇、錢永遠 ≥0', () => {
  const nights = QUICK ? 12 : 60;
  const tally = {};
  for (const pol of ['thoughtful', 'high', 'random']) for (const mode of ['none', 'smart']) {
    let clear = 0, bought = 0;
    for (let s = 1; s <= nights; s++) {
      const run = EN.newRun(C, { seedKey: 'night-' + s, nightNo: 1, ace: TIERS[s % 3] });
      playNight(run, pol, mode, lcg(s));
      ok(!!run.over && !run.pending && !run.duel, 'night ends ' + pol + '/' + mode, { over: run.over, pending: run.pending });
      ok(run.money >= 0 && run.bag.length <= CFG.bagMax && run.relics.length <= CFG.relicMax, 'limits hold');
      if (run.over === 'clear') clear++;
      bought += run.stats.bought.length + run.stats.relicsBought.length;
    }
    if (mode === 'none') ok(bought === 0, 'none buys nothing');
    tally[pol + '/' + mode] = clear + '/' + nights + ' clear, ' + bought + ' bought';
  }
  console.log('     ' + JSON.stringify(tally));
});

section('10 choose：每一種（含每個錯誤碼）；錯的選擇完全不改 run', () => {
  const err = (run, ch, code, name) => { const b = JSON.stringify(run); const r = EN.choose(run, C, ch); ok(!r.ok && r.error === code, name + ' → ' + code, r); ok(JSON.stringify(run) === b, name + ': run unchanged'); };
  const fresh = (night = 2) => EN.newRun(C, { seedKey: 'ch-' + night, nightNo: night, ace: 'hall' });
  const extra = Object.keys(C.cards).filter(id => !C.cards[id].tier && !run0Used(id)).slice(0, 12);
  function run0Used(id) { return USED.has(id) || Object.values(C.bins).some(b => b.pool.includes(id)); }
  // bargainPick
  let run = fresh();
  const B = run.shop.bargain.slice();
  err(run, { type: 'buy', key: Object.keys(run.shop.bins)[0], cardId: 'x' }, 'notNow', 'buy before the bargain pick');
  err(run, { type: 'bargainPick', ids: B.slice(0, 2) }, 'badCount', 'bargainPick 2');
  err(run, { type: 'bargainPick', ids: [B[0], B[0], B[1]] }, 'badCount', 'bargainPick dup');
  err(run, { type: 'bargainPick', ids: [B[0], B[1], 'nope'] }, 'notInStock', 'bargainPick not in stock');
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.push(B[0]); err(r2, { type: 'bargainPick', ids: B.slice(0, 3) }, 'owned', 'bargainPick owned'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.push(extra[0], extra[1]); err(r2, { type: 'bargainPick', ids: B.slice(0, 3) }, 'bagFull', 'bargainPick bag full'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.duel = {}; err(r2, { type: 'bargainPick', ids: B.slice(0, 3) }, 'notNow', 'bargainPick during a duel'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.idx = 1; err(r2, { type: 'bargainPick', ids: B.slice(0, 3) }, 'notNow', 'bargainPick after the first guest'); }
  const ok1 = EN.choose(run, C, { type: 'bargainPick', ids: [B[1], B[0], B[2]] });
  ok(ok1.ok && JSON.stringify(run.bag.slice(4)) === JSON.stringify([B[1], B[0], B[2]]) && ok1.effects.length === 3, 'bargainPick in tap order', ok1);
  err(run, { type: 'bargainPick', ids: B.slice(3, 6) }, 'notNow', 'bargainPick twice');
  // buy
  const key = Object.keys(run.shop.bins).find(k => k !== 'feature' && run.shop.bins[k].length), cid = run.shop.bins[key][0], price = EN.priceOf(C, card(cid));
  ok(price === C.economy.price[EN.rarity(card(cid))] && price >= 800 && price <= 1200, 'priceOf = price[rarity] (shelf 800–1200)', price);
  ok(EN.priceOf(C, card(C.aces.hall)) === 8000 && !Object.values(run.shop.bins).flat().includes(C.aces.hall), 'apex priced 8000 but never stocked');
  eq(EN.sellValue(C, card(cid)), Math.floor(price * 0.5), 'sellValue card = half');
  const RP = C.economy.relicPrice;
  eq(EN.sellValue(C, 'boost_c'), Math.floor(RP * C.economy.sellRate), 'sellValue relic = half');
  eq(EN.relicPrice(C, 'boost_c'), RP, 'relicPrice');
  { const r2 = JSON.parse(JSON.stringify(run)); r2.money = 0; err(r2, { type: 'buy', key, cardId: cid }, 'noMoney', 'buy with $0'); }
  run.money = 20000;
  err(run, { type: 'buy', key: 'nope', cardId: cid }, 'notInStock', 'buy wrong bin');
  err(run, { type: 'buy', key, cardId: 'nope' }, 'notInStock', 'buy wrong card');
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.push(cid); err(r2, { type: 'buy', key, cardId: cid }, 'owned', 'buy owned'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.push(extra[0]); err(r2, { type: 'buy', key, cardId: cid }, 'bagFull', 'buy with 8 and no sell'); err(r2, { type: 'buy', key, cardId: cid, sellId: 'nope' }, 'badSell', 'buy sell not in bag'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.pending = { type: 'retry' }; err(r2, { type: 'buy', key, cardId: cid }, 'notNow', 'buy while pending'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.prologue = 'pending'; err(r2, { type: 'buy', key, cardId: cid }, 'notNow', 'buy during the prologue'); }
  const m0 = run.money, rb = EN.choose(run, C, { type: 'buy', key, cardId: cid });
  ok(rb.ok && run.money === m0 - price && run.bag.includes(cid) && !run.shop.bins[key].includes(cid) && run.stats.bought.includes(cid), 'buy ok', rb);
  eq(rb.effects, [{ gainCard: cid, spend: price }], 'buy effects');
  ok(run.bag.length === 8, 'bag full now');
  const key2 = Object.keys(run.shop.bins).find(k => run.shop.bins[k].length), cid2 = run.shop.bins[key2][0], sell = run.bag.find(id => !EN.isGift(run, C, id));
  // 老闆送的（王牌那組四張＋王牌）不能賣回（FIXLIST 11 追加）；客人丟的、買的、特價箱的照舊半價
  ok(C.gifts.hall.every(id => EN.isGift(run, C, id)) && EN.isGift(run, C, C.aces.hall) && EN.isGift(run, C, card(C.gifts.hall[0])), 'isGift: the four gifts + the ace (id or card)');
  ok(!EN.isGift(run, C, sell) && !EN.isGift(run, C, cid) && !EN.isGift(run, C, C.gifts.pearl[0]) && !EN.isGift(run, C, C.aces.pearl) && !EN.isGift(null, C, C.gifts.hall[0]), 'isGift: bargain／bought／another tier\'s gifts are not');
  eq(run.bag.slice(0, 4), C.gifts.hall, 'gifts are the first four in the bag');
  for (const g of C.gifts.hall) err(run, { type: 'buy', key: key2, cardId: cid2, sellId: g }, 'giftNoSell', 'buy selling a gift ' + g);
  err(run, { type: 'buy', key: key2, cardId: cid2, sellId: C.aces.hall }, 'badSell', 'buy selling the ace (not in the bag)');
  { const r2 = JSON.parse(JSON.stringify(run)); r2.money = EN.priceOf(C, card(cid2)) - EN.sellValue(C, card(sell)) - 1; err(r2, { type: 'buy', key: key2, cardId: cid2, sellId: sell }, 'noMoney', 'buy+sell short by 1'); }
  const rs = EN.choose(run, C, { type: 'buy', key: key2, cardId: cid2, sellId: sell });
  ok(rs.ok && !run.bag.includes(sell) && run.bag.includes(cid2) && run.bag.length === 8, 'sell then buy', rs);
  eq(rs.effects[0], { loseCard: sell, earn: EN.sellValue(C, card(sell)) }, 'sell effect first');
  // buyBargain
  const BL = run.shop.bargain.slice();
  err(run, { type: 'buyBargain', ids: [] }, 'badCount', 'buyBargain 0');
  err(run, { type: 'buyBargain', ids: [BL[0], BL[0]] }, 'badCount', 'buyBargain dup');
  err(run, { type: 'buyBargain', ids: [BL[0], BL[1], BL[2], BL[0]] }, 'badCount', 'buyBargain 4');
  err(run, { type: 'buyBargain', ids: ['nope'] }, 'notInStock', 'buyBargain not in stock');
  err(run, { type: 'buyBargain', ids: [BL[0], BL[1]], sellIds: [run.bag[0]] }, 'bagFull', 'buyBargain 2 into a full bag with 1 sell');
  err(run, { type: 'buyBargain', ids: [BL[0]], sellIds: [run.bag[0], run.bag[1]] }, 'badSell', 'buyBargain too many sells');
  err(run, { type: 'buyBargain', ids: [BL[0]], sellIds: ['nope'] }, 'badSell', 'buyBargain sell not in bag');
  err(run, { type: 'buyBargain', ids: [BL[0]], sellIds: [C.gifts.hall[1]] }, 'giftNoSell', 'buyBargain selling a gift');
  { const r2 = JSON.parse(JSON.stringify(run)), g = C.gifts.hall[2], ng = r2.bag.filter(id => !EN.isGift(r2, C, id));
    eq(r2.bag.length, 8, 'bag full (8) before buying two from the bargain crate');
    err(r2, { type: 'buyBargain', ids: [BL[0], BL[1]], sellIds: [ng[0], g] }, 'giftNoSell', 'buyBargain 2 sells, one a gift');
    const m = r2.money, r = EN.choose(r2, C, { type: 'buyBargain', ids: [BL[0], BL[1]], sellIds: [ng[0], ng[ng.length - 1]] });
    const sv = EN.sellValue(C, card(ng[0])) + EN.sellValue(C, card(ng[ng.length - 1]));
    ok(r.ok && !r2.bag.includes(ng[0]) && C.gifts.hall.every(id => r2.bag.includes(id)) && r2.money === m + sv - EN.bargainPriceOf(C, BL[0]) - EN.bargainPriceOf(C, BL[1]), 'buyBargain selling bargain／bought records: still half', r); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.push(BL[0]); r2.bag.shift(); err(r2, { type: 'buyBargain', ids: [BL[0]], sellIds: [] }, 'owned', 'buyBargain owned'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.money = EN.bargainPriceOf(C, BL[0]) - 1; r2.bag.shift(); err(r2, { type: 'buyBargain', ids: [BL[0]] }, 'noMoney', 'buyBargain no money'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.splice(0, 2); r2.money = EN.bargainPriceOf(C, BL[0]) + EN.bargainPriceOf(C, BL[1]) - 1; err(r2, { type: 'buyBargain', ids: [BL[0], BL[1]] }, 'noMoney', 'buyBargain 2 short by 1'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.splice(0, 3); const m = r2.money, each = BL.slice(0, 3).map(id => EN.bargainPriceOf(C, id));
    const r = EN.choose(r2, C, { type: 'buyBargain', ids: BL.slice(0, 3) });
    ok(r.ok && r2.money === m - each.reduce((a, b) => a + b, 0) && r2.bag.length === 8 && r2.shop.bargain.length === 0, 'buyBargain 3 = sum of per-card prices', { r, each });
    eq(r.effects.map(e => e.spend), each, 'buyBargain effects: each card its own spend');
    ok(each.every((p, k) => p === C.economy.bargain[EN.peak(card(BL[k]))]), 'bargain price by highest star', each);
    ok(EN.sellValue(C, card(BL[0])) === Math.floor(each[0] / 2), 'bargain card sells back at half its bargain price (no buy-sell profit)'); }
  // buyRelic
  const RL = run.shop.relics.slice();
  err(run, { type: 'buyRelic', relicId: 'obi' }, 'notInStock', 'buyRelic not on the counter');
  { const r2 = JSON.parse(JSON.stringify(run)); r2.relics.push(RL[0]); err(r2, { type: 'buyRelic', relicId: RL[0] }, 'owned', 'buyRelic owned'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.relics = ['dustcover', 'stylus', 'cleaner']; err(r2, { type: 'buyRelic', relicId: RL[0] }, 'relicsFull', 'buyRelic 3 relics, no sell'); err(r2, { type: 'buyRelic', relicId: RL[0], sellRelicId: 'obi' }, 'badSell', 'buyRelic sell not owned');
    const m = r2.money, r = EN.choose(r2, C, { type: 'buyRelic', relicId: RL[0], sellRelicId: 'stylus' });
    ok(r.ok && r2.relics.includes(RL[0]) && !r2.relics.includes('stylus') && r2.money === m + EN.sellValue(C, 'stylus') - EN.relicPrice(C, RL[0]), 'buyRelic with sell', { r, money: r2.money }); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.money = EN.relicPrice(C, RL[0]) - 1; err(r2, { type: 'buyRelic', relicId: RL[0] }, 'noMoney', 'buyRelic short'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.over = 'dead'; err(r2, { type: 'buyRelic', relicId: RL[0] }, 'notNow', 'buyRelic after closing'); }
  const rr = EN.choose(run, C, { type: 'buyRelic', relicId: RL[0] });
  ok(rr.ok && run.relics.includes(RL[0]) && !run.shop.relics.includes(RL[0]), 'buyRelic ok', rr);
  // v3 choices still there
  err(run, { type: 'take', cardId: 'x' }, 'noCardOffer', 'take without an offer');
  err(run, { type: 'retry' }, 'noRetry', 'retry without pending');
  err(run, { type: 'nope' }, 'badChoice', 'unknown type');
  err(run, null, 'badChoice', 'null choice');
  // during a fight: no shopping
  const f = EN.startFight(run, C, {});
  ok(!!f && !!run.duel && !EN.canShop(run), 'no shopping during a fight');
  err(run, { type: 'buyRelic', relicId: RL[1] || RL[0] }, 'notNow', 'buyRelic during a fight');
});

section('11 policies：§2.1.7 每個都有、都合法、同 R 同結果；只有 oracle 讀 plan／e.hand／e.pile', () => {
  const NAMES = ['random', 'high', 'counterHint', 'formula', 'mirrorHint', 'thoughtful', 'oracle', 'novice'];
  for (const n of NAMES) ok(typeof EN.policies[n] === 'function', 'policy exists ' + n);
  for (const old of ['strongest', 'counterTop', 'learner', 'veteran', 'sloppy', 'reader']) ok(!EN.policies[old], 'old policy removed ' + old);
  function spy(st) {
    const hits = new Set();
    const planP = st.plan ? new Proxy(st.plan, { get(t, k) { if (['attr', 'idx', 'bluff', 'why'].includes(k)) hits.add('plan.' + String(k)); return t[k]; } }) : st.plan;
    const arrP = (arr, name) => new Proxy(arr, { get(t, k) { if (k !== 'length') hits.add(name + '.' + String(k)); return t[k]; } });
    const eP = new Proxy(st.e, { get(t, k) { if (k === 'hand') return arrP(t.hand, 'e.hand'); if (k === 'pile') return arrP(t.pile, 'e.pile'); return t[k]; } });
    return { sp: new Proxy(st, { get(t, k) { if (k === 'plan') return planP; if (k === 'e') return eP; return t[k]; } }), hits };
  }
  let states = 0;
  for (let s = 1; s <= (QUICK ? 30 : 120); s++) {
    const id = ENEMY_IDS[s % 10], tier = TIERS[s % 3];
    const { duel } = startFor(id, tier, s * 53, { relics: relicSet(s), depth: s % 5 });
    const R = lcg(s);
    while (!duel.over) {
      states++;
      for (const n of NAMES) {
        const before = JSON.stringify(duel);
        const a1 = EN.policies[n](duel, lcg(s * 9 + duel.n), {}, C), a2 = EN.policies[n](duel, lcg(s * 9 + duel.n), {}, C);
        ok(EN.isLegal(duel, a1), n + ' legal', a1);
        eq(a1, a2, n + ' same R → same act');
        ok(JSON.stringify(duel) === before, n + ' does not change the duel');
        const { sp, hits } = spy(duel);
        EN.policies[n](sp, lcg(1), {}, C);
        if (n === 'oracle') ok(hits.has('plan.idx') && hits.has('plan.attr'), 'oracle reads the plan', [...hits]);
        else ok(hits.size === 0, n + ' reads only the public view', [...hits]);
      }
      EN.resolveTurn(duel, EN.policies.random(duel, R));
    }
  }
  console.log('     ' + states + ' states × ' + NAMES.length + ' policies');
  // runPolicy／shopPolicy／bargainPolicy 形狀
  const run = EN.newRun(C, { seedKey: 'pol', nightNo: 2, ace: 'pearl' });
  ok(EN.shopPolicy(run, C, 'smart').length === 0, 'shopPolicy before the pick → []');
  EN.choose(run, C, EN.bargainPolicy(run, C));
  run.money = 3000;
  const chs = EN.shopPolicy(run, C, 'smart');
  ok(Array.isArray(chs) && EN.shopPolicy(run, C, 'none').length === 0, 'shopPolicy returns a list', chs);
  const r2 = JSON.parse(JSON.stringify(run));
  for (const ch of chs) ok(EN.choose(r2, C, ch).ok, 'shopPolicy choice valid', ch);
  eq(run.money, 3000, 'shopPolicy does not change the run');
});

section('12 view() 不洩漏：沒有 plan／他的 attr／idx／bluff，也沒有他手牌的卡', () => {
  for (let s = 1; s <= (QUICK ? 60 : 300); s++) {
    const { duel } = startFor(ENEMY_IDS[s % 10], TIERS[s % 3], s * 3, { depth: s % 5 });
    const R = lcg(s);
    while (!duel.over) {
      const v = EN.view(duel);
      ok(['plan', 'attr', 'idx', 'bluff', 'why', 'eCard', 'eHand'].every(k => !(k in v)), 'no hidden keys at the top', Object.keys(v));
      eq(Object.keys(v.hint).sort(), ['attr', 'line'], 'hint = {attr, line}');
      ok(v.hint.attr === duel.plan.hint.attr && v.hint.line === duel.plan.hint.line, 'hint is the plan hint');
      const hand = new Set(duel.e.hand);
      const walk = o => { if (!o || typeof o !== 'object') return false; if (hand.has(o)) return true; return Object.values(o).some(walk); };
      ok(!walk(v), 'no card of his hand in the view');
      ok(v.eHandN === duel.e.hand.length && v.pile === duel.e.pile.length && v.eDeckIds.length === duel.e.deckSize, 'counts are public');
      EN.resolveTurn(duel, EN.policies.random(duel, R));
    }
    ok(EN.view(duel).hint === null, 'no hint after the end');
  }
});

section('13 教學：3 王牌 × 特價箱 84 種挑法，照 pick 出 → 每手＝expect、第 6 手 KO、前 5 手不 KO', () => {
  const P = C.bargain.pool, combos = [];
  for (let i = 0; i < 9; i++) for (let j = i + 1; j < 9; j++) for (let k = j + 1; k < 9; k++) combos.push([P[i], P[j], P[k]]);
  ok(combos.length === 84, '84 combos');
  let n = 0;
  for (const tier of TIERS) {
    const sc = C.tutorial.script[tier], ex = C.tutorial.expect[tier];
    combos.forEach((cb, ci) => {
      const bag = [...C.gifts[tier], ...(ci % 2 ? cb.slice().reverse() : cb)];
      const eDef = EN.enemyDef(C, 'man', { tutorial: true });
      ok(eDef.hp === 18 && eDef.planner === 'easy' && eDef.q === 1, 'tutorial man: 18, easy, honest');
      const { duel } = EN.startDuel(pDefFor(tier, { bag }), eDef, { seed: ci * 31 + 1, script: sc, hintTable: HINTS });
      for (let h = 0; h < 6; h++) {
        ok(!duel.over, 'not over before hand ' + (h + 1), { tier, cb });
        if (duel.over) break;
        ok(duel.plan.why === 'script' && duel.plan.hint.line === sc.hints[h] && duel.plan.hint.attr === sc.plays[h].attr, 'hand ' + (h + 1) + ' follows the script');
        const p = sc.pick[h];
        let act;
        if (p === 'ace') act = { ace: true };
        else if (p === 'blocked:o') act = EN.blockedChoice(duel, 'o');
        else act = { i: duel.p.hand.findIndex(c => c && c.id === p.id), attr: p.attr };
        if (!ok(act && EN.isLegal(duel, act), 'pick legal ' + tier + ' hand ' + (h + 1), { p, act })) break;
        const played = act.ace ? duel.p.ace : duel.p.hand[act.i];
        if (p === 'blocked:o') ok(cb.includes(played.id), 'hand 5 plays a bargain card', played.id);
        const cl = clashOf(EN.resolveTurn(duel, act));
        const want = Object.assign({}, ex[h]);
        if (h === 4) { want.toE = 0; want.toP = 5 - played.o; }
        const got = {}; for (const k of Object.keys(want)) got[k] = cl[k];
        if (JSON.stringify(got) !== JSON.stringify(want)) ok(false, 'expect ' + tier + ' hand ' + (h + 1), { want, got, cb }); else pass++;
        ok(cl.eCard.id === sc.plays[h].id && !cl.bluff, 'he plays the scripted record');
      }
      ok(duel.over && duel.over.win && duel.over.by === 'hp' && duel.n === 6, 'KO on hand 6', { over: duel.over, n: duel.n });
      n++;
    });
  }
  console.log('     ' + n + ' tutorial runs');
  // 走 run 的路：newRun（序章）→ 特價箱挑三張 → startFight({tutorial}) → 照 pick 打 → 贏了收 Fishmans＋配件三選一
  for (const tier of TIERS) {
    const run = EN.newRun(C, { seedKey: 'tut-' + tier, nightNo: 1, ace: tier });
    ok(EN.choose(run, C, EN.bargainPolicy(run, C)).ok, 'tutorial run: pick');
    const f = EN.startFight(run, C, { tutorial: true });
    const sc = C.tutorial.script[tier];
    for (let h = 0; h < 6 && !f.duel.over; h++) {
      const p = sc.pick[h];
      const act = p === 'ace' ? { ace: true } : p === 'blocked:o' ? EN.blockedChoice(f.duel, 'o') : { i: f.duel.p.hand.findIndex(c => c && c.id === p.id), attr: p.attr };
      EN.resolveTurn(f.duel, act);
    }
    ok(f.duel.over && f.duel.over.win && f.duel.n === 6, 'run tutorial KO on 6 ' + tier);
    const res = EN.finishFight(run, C);
    ok(res.win && res.earn === C.economy.win.prologue && run.prologue === 'done' && run.pending && run.pending.prologue && run.pending.cards[0] === C.enemies.man.drop, 'prologue reward offer', res);
  }
});

section('14 content 形狀（§4 牌組限制、§4.2 禮物、§4.3 特價箱、提示、誠實度、經濟、配件、教學資料）', () => {
  const probs = shapeProblems(C, EN);
  ok(probs.length === 0, 'shapeProblems empty', probs.slice(0, 12));
  // STUB 跟真卡一致（A3 烘好之後）
  let real = 0;
  for (const [id, s] of Object.entries(STUB)) if (C0.cards[id]) { real++; eq([C0.cards[id].c, C0.cards[id].o, C0.cards[id].h], s, 'stub stars = baked ' + id); }
  // 主屬性分布：經典 4（男子、那張我有、針壓、名盤守門員）、冷門 3、硬蕊 2
  const main = {}; for (const id of ['man', ...C.normals, ...C.elites]) main[id] = EN.deckMain(C.enemies[id].deck.map(card), C.enemies[id].taste);
  eq(main, { man: 'c', copycat: 'c', already: 'o', needle: 'c', skip: 'o', broke: 'h', buyer: 'h', label: 'o', critic: 'c' }, 'deckMain per guest (§4.1)');
  ok(C.version === 'lab-4' && EN.VERSION === 'lab-4', 'version lab-4');
  for (const k of ['habits', 'habitLabels']) ok(!(k in C), 'v3 shim ' + k + ' removed');
  ok(!('phase2Lines' in C) && !('example' in C.rules) && !('sub' in C.rules), 'v3 rule-card example / phase2 removed');
  for (const id of ENEMY_IDS) ok(!('title' in C.enemies[id]) && !('zh' in C.honesty[C.enemies[id].honesty]), 'FIXLIST 6: no subtitle, no honesty label ' + id);
  eq(ENEMY_IDS.map(id => C.enemies[id].name), ['男子', '文青同好', '社團學長', '音響發燒友', '二手店老闆', '地下樂團吉他手', '前衛樂迷', '地下廠牌主理人', '資深樂評', '傳說藏家'], 'FIXLIST 6 names');
  ok(C.rules.lines[5] === '提示會暗示他這手的打算，但有些人會唬你。王牌 7 星，一場用一次。六手內沒分出勝負，比誰的聲望條剩得多。', 'rule card line 6 (FIXLIST 2／3)');
  const FORBID = /氣勢|輾壓|賭注|相生|割捨|七星回擊|霸權|點播/;
  const scan = (o, p) => { if (typeof o === 'string') ok(!FORBID.test(o), 'no removed mechanic words in ' + p, o); else if (o && typeof o === 'object') for (const k in o) if (k !== 'cards') scan(o[k], p + '.' + k); };
  scan({ relics: C.relics, coachTips: C.coachTips, rules: C.rules, hints: C.hints, duelText: C.duelText, lines: C.lines, shopLines: C.shopLines, shopUi: C.shopUi }, 'C');
  console.log('     stubbed cards: ' + stubbed + ' (baked & checked: ' + real + ')' + (fakeBins ? '; fake bins (no bins.js yet)' : ''));
});

section('15 台幣行情（FIXLIST 8）：稀有度、價格、特價箱每張、配件 3000、賣回半價、千分位；分類（契約）；view 不帶誠實度字', () => {
  const R = (c, o, h, tier) => EN.rarity(mkCard('r', c, o, h, tier));
  // score＝c＋h＋(o===5?1:0)：≤5 普通、6 稀有、7 獨特、8 史詩、≥9 傳奇；頂點卡＝頂點
  eq([R(1, 5, 1), R(3, 4, 2), R(4, 1, 2), R(5, 5, 1), R(5, 4, 2), R(4, 5, 3), R(5, 1, 3), R(5, 5, 3), R(5, 1, 4), R(5, 5, 5), R(7, 3, 3, 'hall'), R(1, 7, 1, 'pearl')],
    ['common', 'common', 'rare', 'uncommon', 'uncommon', 'epic', 'epic', 'legendary', 'legendary', 'legendary', 'apex', 'apex'], 'rarity table');
  eq(EN.rarityScore(mkCard('s', 4, 5, 3)), 8, 'rarityScore o=5 → +1');
  eq(EN.RARITY, ['common', 'rare', 'uncommon', 'epic', 'legendary', 'apex'], 'RARITY order');
  const P = r => EN.priceOf(C, Object.assign(mkCard('p-' + r, 1, 1, 1), r === 'apex' ? { tier: 'hall', c: 7 } : {
    common: { c: 1, o: 4, h: 1 }, rare: { c: 5, o: 1, h: 1 }, uncommon: { c: 5, o: 1, h: 2 }, epic: { c: 5, o: 1, h: 3 }, legendary: { c: 5, o: 1, h: 4 } }[r]));
  eq(EN.RARITY.map(P), [800, 1000, 1200, 3000, 4000, 8000], 'priceOf by rarity');
  for (const id of C.bargain.pool) eq(EN.priceOf(C, id), [0, 100, 200, 300][EN.peak(card(id))], 'bargain ' + id + ' by highest star');
  eq([EN.bargainPriceOf(C, mkCard('b1', 1, 1, 1)), EN.bargainPriceOf(C, mkCard('b2', 2, 1, 1)), EN.bargainPriceOf(C, mkCard('b3', 1, 3, 2)), EN.bargainPriceOf(C, mkCard('b4', 4, 1, 1))], [100, 200, 300, 300], 'bargainPriceOf 1/2/3/(4→3)');
  for (const id of Object.keys(C.relics)) { eq(EN.relicPrice(C, id), 3000, 'relic ' + id + ' $3,000'); eq(EN.sellValue(C, id), 1500, 'relic ' + id + ' sells for half'); }
  eq(EN.sellValue(C, mkCard('sv', 5, 1, 3)), 1500, 'epic sells for half');
  eq([EN.moneyText(0), EN.moneyText(800), EN.moneyText(1200), EN.moneyText(12000), EN.moneyText(1234567)], ['0', '800', '1,200', '12,000', '1,234,567'], 'moneyText');
  // 分類：第一個曲風（electronic → elec）、台灣地區優先
  const K = (genres, region) => EN.categoryOf({ genres, region });
  eq([K(['rock', 'jazz'], 'xx'), K(['electronic'], 'jp'), K(['jazz'], 'tw'), K(['hiphop'], 'xx'), K(['blues', 'folk'], 'xx'), K(['nope'], 'xx'), K([], 'tw')],
    ['rock', 'elec', 'tw', 'hiphop', 'blues', null, 'tw'], 'categoryOf');
  // 契約形狀的箱子（bins.js 交了用真的；沒交用 fixture）
  for (const k of BIN_KEYS) {
    const b = C.bins[k];
    if (!ok(!!b, 'bin ' + k + ' exists')) continue;
    ok(b.key === k && b.zh === LABEL[k][1] && (k === 'picks' ? !!b.label : b.label === LABEL[k][0]) && Array.isArray(b.pool) && Array.isArray(b.front), 'bin ' + k + ' {key,label,zh,pool,front}', { key: b.key, label: b.label, zh: b.zh });
    if (CATS.includes(k)) ok(b.pool.every(id => EN.categoryOf(card(id)) === k), 'bin ' + k + ' pool = its category');
    if (k === 'feature') ok(b.pool.every(id => ['epic', 'legendary'].includes(EN.rarity(card(id)))), 'feature pool = epic + legendary');
  }
  { const bp = binsProblems(C, EN); ok(bp.length === 0, 'binsProblems (check-content) empty on ' + (fakeBins ? 'the fixture' : 'bins.js'), bp.slice(0, 8)); }
  // view：沒有誠實度的字（只有 key 與 q，給策略）；客人沒有副標
  const v = EN.view(startFor('label', 'hall', 3).duel);
  eq(Object.keys(v.honesty).sort(), ['key', 'q'], 'view.honesty = {key, q}');
  ok(v.eTitle === null && v.eName === '地下廠牌主理人', 'view: name only, no title', { n: v.eName, t: v.eTitle });
});

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { console.log(fails.join('\n')); process.exit(1); }
