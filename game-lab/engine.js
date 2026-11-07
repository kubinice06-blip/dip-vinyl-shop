// game-lab/engine.js — 品味對決・試做版 pure rules engine (Agent A).  SPEC §3, §4.1, §7.1, §7.7.
// No DOM, no Math.random, no Date. Every state object is plain JSON; RNG = mulberry32 with its integer state in `.rng`.
// Browser: window.DipLabEngine ; Node: module.exports.  Content (content.js shape, SPEC §7.2) is always passed in, never required.
//
// Attributes: 'c' 經典 / 'o' 冷門 / 'h' 硬蕊.  Counter: o beats c, c beats h, h beats o.  Chain (相生): c→o→h→c.
//
// Breakdown Term = { k, label, v, star?, note? }
//   v      signed contribution. Invariant: the v's of a clash sum to its damage on that side —
//          toE for counter / mirrorWin / ult / reflect, toP for countered / mirrorLose / block / eultHit,
//          0 for tie / hegemonyE / hegemonyP; for 'trade' the {ult, matrix} terms sum to toE and the 'eult' term is toP.
//   star   (optional) the raw star printed on the card when it differs from |v| or is worth showing (atk/def/mirror/block).
//   note   (optional) short qualifier: '點播+2' (request bonus folded into atk), '擋住星差' (counter floor = K applied),
//          '+1星' (boss B-side starPlus folded in).
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DipLabEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const VERSION = 'lab-1';
  const ATTRS = ['c', 'o', 'h'];
  const ZH = { c: '經典', o: '冷門', h: '硬蕊' };
  const ZH1 = { c: '經', o: '冷', h: '硬' };
  const COUNTER_OF = { c: 'o', o: 'h', h: 'c' };       // COUNTER_OF[x] = the attribute that beats x
  const NEXT = { c: 'o', o: 'h', h: 'c' };             // 相生 successor (== COUNTER_OF by design)
  const beats = (x, y) => !!x && !!y && COUNTER_OF[y] === x;   // x beats y
  const COUNTER_NAME = { o: '品味突襲', c: '大眾共鳴', h: '降維打擊' };     // keyed by the WINNING attribute
  const CHAIN_NAME = { 'c>o': '品味拓荒', 'o>h': '閾值突破', 'h>c': '前衛收編' };
  const GLYPHS = { true: '真', feint: '晃', copy: '跟', grudge: '報', eye: '盯', hidden: '？' };
  const TIER_AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };
  const TIERS = ['hall', 'pearl', 'heresy'];
  const TIMES = ['21:30', '22:00', '22:40', '23:20', '00:10', '01:00', '02:00'];

  const CFG = {
    handSize: 4, qiMax: 10, ultMin: 6,
    heatQi: 0,                         // 場子變熱 knob (0 = off)
    stake: [2, 2, 3, 4, 5, 6],         // 賭注 K by hand number (1-based); last value repeats. Per-enemy override: enemy.stake
    minDmgK: true,                     // counter damage floor = K
    counterQiWin: 2, counterQiLose: -1, mirrorQiWin: 1, tieQi: 1,
    feintBonus: 2,                     // revealed cell is 晃 → the hand's winner deals +2
    attrFx: { c: { selfHp: 1 }, o: { selfQi: 1 }, h: { oppQi: -1 } },
    reflectBase: 7,                    // 七星回擊 = 7 + K
    requestBonus: 2,                   // 點播✓ : +2 to YOUR attacking star only
    pearlCounterQi: 4,                 // 流亡【私盤特攻】
    hallQiCut: 2,                      // 殿堂【眾望所歸】
    maxHands: 30,
    playerHp: 20, prologueHp: 16, winHeal: 3, deckCap: 12, prologueStake: [1, 1, 2, 2, 3],   // A2 balance: playerHp 22→20 (SPEC §8.2 step ②)
    // additive knobs (not in SPEC's CFG list, used by the rules below)
    reviveHp: 6, cleanerHeal: 3, relicOwnedHp: 4, deckMin: 5,
    stylusBonus: 2, obiBonus: 2, matrixBonus: 2, isolationBlock: 2, firstpressBonus: 2, chain3Dmg: 2,
    adapterQi: 2, goodEarQi: 1,
    goldChance: 0.1, teaHp: 8, listenHit: 6, listenMiss: 3, listenMuted: 4, starCap: 5,
    overflowQiAt: 3, overflowQiCap: 2,   // a node heal that overflows full 聲望 by ≥3 → 下一場開局氣勢 +1 (at most +2 per fight)
  };

  // ---------- RNG (mulberry32; state lives in the object so clones are deterministic) ----------
  function rng(st) {
    let a = st.rng = (st.rng + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function makeRng(seed) { const o = { rng: seed | 0 }; return () => rng(o); }   // closure form for policies / sim
  function shuffle(arr, st) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rng(st) * (i + 1)); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }
  const pickOne = (arr, st) => arr[Math.floor(rng(st) * arr.length)];
  function fnv1a32(str) { let h = 0x811c9dc5; str = String(str); for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; }
  const clone = o => JSON.parse(JSON.stringify(o));
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const stakeAt = (n, tbl) => { const t = tbl || CFG.stake; return t[Math.min(t.length - 1, n - 1)]; };
  const star = (card, a) => (card && card[a]) | 0;
  const topAxis = (card, taste) => { taste = taste || ATTRS; let best = taste[0]; for (const a of taste) if (star(card, a) > star(card, best)) best = a; return best; };
  const aceAxis = ace => ace ? (TIER_AXIS[ace.tier] || topAxis(ace, ATTRS)) : null;
  const tasteArr = t => Array.isArray(t) ? t.slice() : String(t || 'coh').split('');
  function T(k, label, v, extra) { const o = { k, label, v }; if (extra) { if (extra.star != null) o.star = extra.star; if (extra.note) o.note = extra.note; } return o; }

  // cards are never mutated by the rules, so a duel can be cloned shallowly (fast enough for forecast on phones)
  function cloneDuel(st) {
    const P = st.p, E = st.e;
    return { ...st, intent: st.intent ? { ...st.intent } : null, stats: { ...st.stats }, history: st.history.slice(),
      p: { ...P, deck: P.deck.slice(), hand: P.hand.slice(), discard: P.discard.slice(), relics: P.relics.slice(), flags: { ...P.flags } },
      e: { ...E, disc: E.disc.slice(), taste: E.taste.slice(), deck: E.deck.slice(), discard: E.discard.slice(), quirk: E.quirk ? { ...E.quirk } : null } };
  }

  // ---------- duel creation ----------
  // pDef: { hp, maxHp, deck:[Card], ace:Card|null, ear:'hall'|'pearl'|'heresy'|null, relics:[id], startQi, reviveOnce }
  // eDef: content enemy object with deck expanded to [Card] ; opts: { seed, ultAttr, request, prologue, habitKnown, enemyAce }
  function startDuel(pDef, eDef, opts) {
    opts = opts || {};
    const relics = (pDef.relics || []).slice();
    const ultAt = eDef.ultAt == null ? 99 : eDef.ultAt;
    const st = {
      v: VERSION, rng: (opts.seed >>> 0) || 1, hand: 0, K: 1, over: null, request: opts.request || null,
      prologue: !!opts.prologue, stake: eDef.stake || (opts.prologue ? CFG.prologueStake.slice() : null),
      p: { hp: pDef.hp, maxHp: pDef.maxHp || pDef.hp, qi: clamp(pDef.startQi || 0, 0, CFG.qiMax), ear: pDef.ear || null,
        deck: (pDef.deck || []).map(clone), hand: [], discard: [], ace: pDef.ace ? clone(pDef.ace) : null, aceUsed: false,
        lastAttr: null, chainLast: null, chainLen: 0, relics, flags: {}, reviveOnce: !!pDef.reviveOnce, revived: false },
      e: { id: eDef.id, name: eDef.name, hp: eDef.hp, maxHp: eDef.hp, qi: clamp(eDef.qi0 || 0, 0, CFG.qiMax), qiRate: eDef.qiRate || 0,
        ultAt, ultAttr: opts.ultAttr || (ATTRS.includes(eDef.ultAttr) ? eDef.ultAttr : null), taste: tasteArr(eDef.taste),
        disc: eDef.disc.slice(), hidden: eDef.hidden || null, habitKnown: !!opts.habitKnown || relics.includes('headphone'),
        phases: clone(eDef.phases || []), phase: 0,
        quirk: eDef.quirk ? clone(eDef.quirk) : null, quirkVal: 0, quirkReset: false, starPlus: 0,
        deck: (eDef.deck || []).map(clone), discard: [], record: null, ace: opts.enemyAce ? clone(opts.enemyAce) : null },
      intent: null, history: [], lastClash: null, lastReveal: null,
      stats: { pUlt: 0, eUlt: 0, reflect: 0, block: 0, feintSeen: 0, feintBitten: 0, seeThrough: 0, readHit: 0, hegemony: 0, chain3: 0, faceChange: 0, found: 0, maxHit: 0 },
    };
    shuffle(st.p.deck, st); shuffle(st.e.deck, st);
    // opts.firstRecordId: that record comes up on hand 1 (序章回嘴的伏筆); same RNG draws as without it
    if (opts.firstRecordId) { const k = st.e.deck.findIndex(c => c.id === opts.firstRecordId); if (k >= 0) st.e.deck.push(st.e.deck.splice(k, 1)[0]); }
    draw(st);
    const events = [];
    beginHand(st, events);
    return { duel: st, events };
  }

  function draw(st) {
    const P = st.p;
    while (P.hand.length < CFG.handSize) {
      if (!P.deck.length) { if (!P.discard.length) break; P.deck = shuffle(P.discard, st); P.discard = []; }
      P.hand.push(P.deck.pop());
    }
  }
  function enemyNextRecord(st) {
    const E = st.e;
    if (!E.deck.length) { E.deck = shuffle(E.discard, st); E.discard = []; }
    return E.deck.pop();
  }

  // ---------- cells (氣場唱盤) ----------
  // glyphs: 'true' 真 | 'feint' 晃 | 'copy' 跟 | 'grudge' 報 | 'eye' 盯 | 'hidden' ？ (resolves with E.hidden)
  function bigAxis(P) {                       // 「你最大張」: highest single star among hand cards (ace slot excluded); ties → hand order, then c>o>h
    let best = null, bv = -1;
    for (const card of P.hand) for (const a of ATTRS) if (star(card, a) > bv) { bv = star(card, a); best = a; }
    return best;
  }
  function glyphAttr(st, glyph, bubble) {
    const P = st.p, E = st.e;
    const g = glyph === 'hidden' ? E.hidden : glyph;
    switch (g) {
      case 'true': return bubble;
      case 'feint': return COUNTER_OF[COUNTER_OF[bubble]];
      case 'copy': return P.lastAttr || bubble;
      case 'grudge': return P.lastAttr ? COUNTER_OF[P.lastAttr] : bubble;
      case 'eye': { if (P.relics.includes('gauge')) return bubble; const b = bigAxis(P); return b ? COUNTER_OF[b] : bubble; }
    }
    return bubble;
  }
  const realGlyph = (st, i) => st.e.disc[i] === 'hidden' ? st.e.hidden : st.e.disc[i];

  function beginHand(st, events) {
    const P = st.p, E = st.e;
    st.hand++; st.K = stakeAt(st.hand, st.stake);
    let pe = 0, ee = 0;
    if (st.hand > 1) {
      pe = CFG.heatQi; ee = CFG.heatQi + E.qiRate;
      P.qi = clamp(P.qi + pe, 0, CFG.qiMax); E.qi = clamp(E.qi + ee, 0, CFG.qiMax);
      if (CFG.heatQi) events.push({ t: 'heat', p: pe, e: ee });
    }
    // 跳針王: every hand after the first, unless you countered him last hand, the skip counter grows (visible chip 「跳針 +N」)
    if (E.quirk && E.quirk.type === 'skip' && st.hand > 1) {
      if (E.quirkReset) E.quirkReset = false; else E.quirkVal = Math.min(E.quirk.max, E.quirkVal + E.quirk.step);
    }
    E.record = enemyNextRecord(st);
    const bubble = topAxis(E.record, E.taste);
    if (E.qi >= E.ultAt) {
      // 殺氣騰騰: attribute and damage are locked NOW (later qi cuts do not change them)
      st.intent = { ult: true, attr: E.ultAttr || bubble, dmg: Math.min(CFG.qiMax, E.qi), bubble };
    } else {
      const cellIdx = Math.floor(rng(st) * E.disc.length);
      st.intent = { ult: false, bubble, cellIdx };      // cellIdx is HIDDEN from the UI until resolve
    }
    const ev = { t: 'handStart', hand: st.hand, K: st.K, intent: publicIntent(st), qiGain: { p: pe, e: ee } };
    if (E.quirk) ev.quirkVal = E.quirkVal;
    events.push(ev);
  }
  function publicIntent(st) {
    const it = st.intent, E = st.e;
    if (!it) return null;
    if (it.ult) return { ult: true, attr: it.attr, dmg: it.dmg, record: E.record, bubble: it.bubble };
    return { ult: false, bubble: it.bubble, record: E.record,
      slices: E.disc.map((g, i) => {
        const unknown = g === 'hidden' && !E.habitKnown;
        return { i, glyph: unknown ? 'hidden' : (g === 'hidden' ? E.hidden : g), attr: unknown ? null : glyphAttr(st, g, it.bubble) };
      }) };
  }

  // ---------- legal actions ----------
  function legalActions(st) {
    const acts = [];
    if (st.over) return acts;
    st.p.hand.forEach((_, i) => ATTRS.forEach(a => acts.push({ type: 'card', i, attr: a })));
    if (st.p.ace && !st.p.aceUsed) acts.push({ type: 'ace' });
    if (st.p.qi >= CFG.ultMin) acts.push({ type: 'ult' });
    return acts;
  }
  function isLegal(st, act) {
    if (!act || st.over) return false;
    if (act.type === 'card') return Number.isInteger(act.i) && act.i >= 0 && act.i < st.p.hand.length && ATTRS.includes(act.attr);
    if (act.type === 'ace') return !!st.p.ace && !st.p.aceUsed;
    if (act.type === 'ult') return st.p.qi >= CFG.ultMin;
    return false;
  }

  // ---------- the pure clash (no RNG except deck reshuffles on 變臉 addAce). Mutates st. Returns events. ----------
  function applyClash(st, act, forcedCell) {
    const P = st.p, E = st.e, it = st.intent, K = st.K, ev = [];
    const rel = id => P.relics.includes(id);
    // --- player side ---
    let pCard = null, pAttr = null;
    if (act.type === 'card') { pCard = P.hand[act.i]; pAttr = act.attr; }
    else if (act.type === 'ace') { pCard = P.ace; pAttr = aceAxis(P.ace); P.aceUsed = true; }
    const pUlt = act.type === 'ult';
    // --- enemy side ---
    const cellIdx = it.ult ? -1 : (forcedCell != null ? forcedCell : it.cellIdx);
    const cellGlyph = it.ult ? null : E.disc[cellIdx];
    const glyph = it.ult ? null : realGlyph(st, cellIdx);
    const eAttr = it.ult ? it.attr : glyphAttr(st, cellGlyph, it.bubble);
    const eCard = E.record;
    const plus = eCard && !eCard.tier ? E.starPlus : 0;
    const eStar = a => star(eCard, a) + plus;
    const reqP = pCard && st.request && (pCard.tags || []).includes(st.request) ? CFG.requestBonus : 0;   // 點播: your attack star only
    ev.push({ t: 'reveal', pAct: act.type, pCard, pAttr, eCard, eAttr, eUlt: !!it.ult, cellIdx, glyph, bubble: it.bubble, hiddenCell: cellGlyph === 'hidden', prevLast: P.lastAttr || null });
    if (cellGlyph === 'hidden' && !E.habitKnown) { E.habitKnown = true; st.stats.found++; ev[0].found = true; ev.push({ t: 'habitRevealed', glyph: E.hidden, cellIdx }); }
    // --- ace on-play passives (cannot cancel an already-announced ult: its damage was locked at beginHand) ---
    if (act.type === 'ace') {
      if (P.ace.tier === 'hall') { const d = Math.min(E.qi, CFG.hallQiCut); E.qi -= d; ev.push({ t: 'acePassive', tier: 'hall', name: '眾望所歸', qi: -d }); }
      if (P.ace.tier === 'heresy') { const d = E.qi; E.qi = 0; ev.push({ t: 'acePassive', tier: 'heresy', name: '終極解構', qi: -d }); }
    }
    // --- chain (相生) ---
    let chainDmg = 0;
    if (pUlt) { P.chainLen = 0; P.chainLast = null; }
    else {
      const key = P.chainLast + '>' + pAttr;
      if (P.chainLast && NEXT[P.chainLast] === pAttr && P.chainLen >= 1) P.chainLen++; else P.chainLen = 1;
      if (P.chainLen === 2) { P.qi += 1; ev.push({ t: 'chain', len: 2, skill: CHAIN_NAME[key], qi: 1 }); }
      else if (P.chainLen === 3) {
        P.qi += 2; st.stats.chain3++;
        chainDmg = CFG.chain3Dmg + (rel('firstpress') ? CFG.firstpressBonus : 0);
        ev.push({ t: 'chain', len: 3, skill: CHAIN_NAME[key], qi: 2, dmg: chainDmg });
      }
      P.chainLast = pAttr;
      if (P.chainLen >= 3) { P.chainLen = 0; P.chainLast = null; }
    }
    let toE = 0, toP = 0, kind, bd = [];
    const feint = glyph === 'feint';
    if (feint) st.stats.feintSeen++;
    const chainTerm = () => T('chain', rel('firstpress') ? '相生三連＋首刻盤' : '相生三連', chainDmg);
    if (it.ult) {
      st.stats.eUlt++;
      const U = it.dmg;
      if (pUlt) {
        st.stats.pUlt++; kind = 'trade';
        const m = rel('matrix') ? CFG.matrixBonus : 0;
        toE = P.qi + m; toP = U;
        bd = [T('ult', '你的品味輾壓', P.qi)]; if (m) bd.push(T('matrix', '內圈刻字', m)); bd.push(T('eult', '他的品味輾壓', U));
        P.qi = 0;
      } else if (pCard && pCard.tier && beats(pAttr, it.attr)) {
        kind = 'reflect'; st.stats.reflect++; toE = CFG.reflectBase + K; toP = 0;
        bd = [T('reflect', '七星回擊', CFG.reflectBase), T('K', '賭注', K)];
      } else if (pCard && beats(pAttr, it.attr)) {
        kind = 'block'; st.stats.block++;
        const s = star(pCard, pAttr), iso = rel('isolation') ? CFG.isolationBlock : 0;
        const bv = Math.min(U, s), iv = Math.min(iso, U - bv);
        toP = U - bv - iv;
        bd = [T('eult', '他的品味輾壓', U), T('block', '割捨防禦 ' + ZH[pAttr], -bv, { star: s })];
        if (iv) bd.push(T('isolation', '絕緣避震墊', -iv));
        P.qi += 1;
      } else { kind = 'eultHit'; toP = U; bd = [T('eult', '他的品味輾壓', U)]; }
      E.qi = 0;
    } else if (pUlt) {
      st.stats.pUlt++; kind = 'ult';
      const m = rel('matrix') ? CFG.matrixBonus : 0;
      toE = P.qi + m; bd = [T('ult', '品味輾壓', P.qi)]; if (m) bd.push(T('matrix', '內圈刻字', m));
      P.qi = 0;
    } else if (pAttr === eAttr) {
      const ps = star(pCard, pAttr) + reqP, es = eStar(eAttr), d = ps - es;
      const pT = T('mirrorP', '你的' + ZH[pAttr], ps, { star: star(pCard, pAttr), note: reqP ? '點播+2' : null });
      const eT = T('mirrorE', '他的' + ZH[eAttr], es, { star: star(eCard, eAttr), note: plus ? '+' + plus + '星' : null });
      if (d > 0) {
        kind = 'mirrorWin';
        eT.v = -es; bd = [pT, eT];
        toE = d;
        if (feint) { toE += CFG.feintBonus; bd.push(T('feint', '晃格', CFG.feintBonus)); }
        if (chainDmg) { toE += chainDmg; bd.push(chainTerm()); }
        if (rel('obi')) { toE += CFG.obiBonus; bd.push(T('obi', '原版側標', CFG.obiBonus)); }
        P.qi += CFG.mirrorQiWin;
      } else if (d < 0) {
        kind = 'mirrorLose';
        pT.v = -ps; bd = [eT, pT];
        toP = -d;
        if (feint) { toP += CFG.feintBonus; bd.push(T('feint', '虛晃', CFG.feintBonus)); }
        E.qi += CFG.mirrorQiWin;
      } else {
        kind = 'tie'; eT.v = -es; bd = [pT, eT];
        P.qi += CFG.tieQi; E.qi += CFG.tieQi;
      }
    } else if (beats(pAttr, eAttr)) {
      if (eCard.tier) { kind = 'hegemonyE'; st.stats.hegemony++; }
      else {
        kind = 'counter';
        const raw = star(pCard, pAttr), atk = raw + reqP, def = eStar(pAttr);
        const floor = CFG.minDmgK ? K : 1;
        let d = Math.max(floor, atk + K - def);
        const defV = d - atk - K;
        bd = [T('atk', ZH[pAttr], atk, { star: raw, note: reqP ? '點播+2' : null }), T('K', '賭注', K),
          T('def', '他的' + ZH[pAttr], defV, { star: def, note: -defV < def ? '擋住星差' : (plus ? '+' + plus + '星' : null) })];
        if (P.ear === 'heresy' && pAttr === 'h') { d += 1; bd.push(T('ear', '噪音信徒', 1)); }
        if (rel('stylus') && !P.flags.stylusUsed) { d += CFG.stylusBonus; P.flags.stylusUsed = true; bd.push(T('stylus', '黑膠唱針', CFG.stylusBonus)); }
        if (feint) { d += CFG.feintBonus; bd.push(T('feint', '看穿', CFG.feintBonus)); }
        if (chainDmg) { d += chainDmg; bd.push(chainTerm()); }
        toE = d;
        P.qi += (pCard.tier === 'pearl' ? CFG.pearlCounterQi : CFG.counterQiWin); E.qi += CFG.counterQiLose;
        if (E.quirk && E.quirk.type === 'skip') { E.quirkVal = 0; E.quirkReset = true; }
      }
    } else {
      if (pCard.tier) { kind = 'hegemonyP'; st.stats.hegemony++; }
      else {
        kind = 'countered';
        const raw = star(eCard, eAttr), atk = raw + plus, def = star(pCard, eAttr);
        const floor = CFG.minDmgK ? K : 1;
        let d = Math.max(floor, atk + K - def);
        const defV = d - atk - K;
        bd = [T('atk', '他的' + ZH[eAttr], atk, { star: raw, note: plus ? '+' + plus + '星' : null }), T('K', '賭注', K),
          T('def', '你的' + ZH[eAttr], defV, { star: def, note: -defV < def ? '擋住星差' : null })];
        if (feint) { d += CFG.feintBonus; bd.push(T('feint', '虛晃', CFG.feintBonus)); }
        if (E.quirk && E.quirk.type === 'skip' && E.quirkVal) { d += E.quirkVal; bd.push(T('skip', '跳針', E.quirkVal)); }
        if (rel('dustcover') && !P.flags.dustUsed) { const cut = Math.floor(d / 2); d -= cut; P.flags.dustUsed = true; bd.push(T('dust', '防塵套', -cut)); }
        toP = d; E.qi += CFG.counterQiWin; P.qi += CFG.counterQiLose;
      }
    }
    // stamps
    let stamp = null;
    if (kind === 'counter') stamp = feint ? 'seeThrough' : 'readHit';
    else if (kind === 'countered') stamp = feint ? 'feintHit' : 'readMiss';
    else if (kind === 'reflect') stamp = 'reflect';
    else if (kind === 'block') stamp = 'block';
    else if (kind === 'hegemonyE' || kind === 'hegemonyP') stamp = 'hegemony';
    if (stamp === 'seeThrough') st.stats.seeThrough++;
    if (stamp === 'feintHit') st.stats.feintBitten++;
    if (stamp === 'readHit') st.stats.readHit++;
    const clashEv = { t: 'clash', kind, pAttr, eAttr, K, counterName: kind === 'counter' ? COUNTER_NAME[pAttr] : (kind === 'countered' ? COUNTER_NAME[eAttr] : null),
      stamp, breakdown: bd, toE, toP, glyph, bubble: it.bubble, hand: st.hand };
    ev.push(clashEv);
    // apply damage
    if (toE) { E.hp -= toE; ev.push({ t: 'damage', target: 'e', amount: toE }); }
    if (toP) { P.hp -= toP; ev.push({ t: 'damage', target: 'p', amount: toP }); }
    // attribute effects (only for played records; an ult never triggers them; the voided side never triggers them).
    // §3.3: 屬性效果 (step 5) → 扣血／聲望不超過上限 (step 6): the 經典 heal is capped AFTER the hit, so at full HP it still
    // offsets damage; attrFx.hp is what was actually healed (0 when nothing moved, so the UI floats nothing).
    const fx = (side, attr, isP) => {
      const X = isP ? P : E, Y = isP ? E : P;
      if (attr === 'c') { const h = CFG.attrFx.c.selfHp + (isP && X.ear === 'hall' ? 1 : 0); const g = Math.max(0, Math.min(X.maxHp, X.hp + h) - X.hp); X.hp += g; ev.push({ t: 'attrFx', who: side, attr, hp: g }); }
      if (attr === 'o') { const q = CFG.attrFx.o.selfQi + (isP && X.ear === 'pearl' ? 1 : 0); X.qi += q; ev.push({ t: 'attrFx', who: side, attr, qi: q }); }
      if (attr === 'h') { Y.qi += CFG.attrFx.h.oppQi; ev.push({ t: 'attrFx', who: side, attr, oppQi: CFG.attrFx.h.oppQi }); }
    };
    if (pCard) fx('p', pAttr, true);
    if (!it.ult && kind !== 'ult') fx('e', eAttr, false);
    if (toE > st.stats.maxHit) st.stats.maxHit = toE;
    P.qi = clamp(P.qi, 0, CFG.qiMax); E.qi = clamp(E.qi, 0, CFG.qiMax);
    if (!pUlt) P.lastAttr = pAttr;
    // discard
    if (act.type === 'card') P.discard.push(P.hand.splice(act.i, 1)[0]);
    E.discard.push(E.record);
    st.lastClash = clashEv; st.lastReveal = ev[0];
    st.history.push({ hand: st.hand, pAct: act.type, pAttr, eAttr, bubble: it.bubble, eUlt: !!it.ult, glyph, kind, stamp, toE, toP });
    if (st.history.length > 3) st.history.shift();
    // 神秘見本盤: you dropped to 0 while he is still standing → stand up at 6 (once per night; pDef.reviveOnce)
    if (P.hp <= 0 && E.hp > 0 && P.reviveOnce && !P.revived) { P.revived = true; P.hp = Math.min(P.maxHp, CFG.reviveHp); ev.push({ t: 'revive', hp: P.hp }); }
    // KO (both ≤0: more HP left wins; equal → player)
    if (P.hp <= 0 || E.hp <= 0) {
      st.over = (E.hp <= 0 && (P.hp > 0 || E.hp <= P.hp)) ? 'win' : 'lose';
      ev.push({ t: 'ko', winner: st.over === 'win' ? 'p' : 'e' });
    } else {
      // face change (變臉): each notch fires once
      let ph;
      while ((ph = E.phases[E.phase]) && E.hp <= ph.atHp) {
        E.phase++; st.stats.faceChange++;
        if (ph.disc) E.disc = ph.disc.slice();
        if (ph.hidden !== undefined) E.hidden = ph.hidden;
        if (ph.ultAt != null) E.ultAt = ph.ultAt;
        if (ph.qiRate != null) E.qiRate = ph.qiRate;
        if (ph.starPlus != null) E.starPlus = ph.starPlus;
        let aceIn = false;
        if (ph.addAce && E.ace) { E.deck.push(clone(E.ace)); shuffle(E.deck, st); aceIn = true; }
        ev.push({ t: 'faceChange', phase: E.phase, lineKey: 'faceChange', notch: ph.atHp, aceIn, starPlus: E.starPlus });
      }
    }
    return ev;
  }

  // opts.forcedCell (SPEC-v2 §7.1, tutorial only): resolve against that cell instead of the hidden intent.cellIdx.
  // Not a rule change: applyClash already takes forcedCell (forecast uses it); consumes no RNG; ignored on 殺氣騰騰 hands.
  function resolveTurn(st, act, opts) {
    if (st.over) return [];
    if (!isLegal(st, act)) throw new Error('DipLabEngine.resolveTurn: illegal action ' + JSON.stringify(act));
    const fc = opts && Number.isInteger(opts.forcedCell) && st.intent && !st.intent.ult && opts.forcedCell >= 0 && opts.forcedCell < st.e.disc.length ? opts.forcedCell : null;
    const ev = applyClash(st, act, fc);
    if (!st.over) {
      draw(st);
      if (st.hand >= CFG.maxHands) { st.over = st.p.hp >= st.e.hp ? 'win' : 'lose'; ev.push({ t: 'ko', winner: st.over === 'win' ? 'p' : 'e', timeout: true }); }
      else beginHand(st, ev);
    }
    return ev;
  }

  // forecast(st, act) → per-slice outcome, computed by the SAME applyClash on clones (preview can never lie)
  function summarize(evs) { const c = evs.find(e => e.t === 'clash'); return { kind: c.kind, stamp: c.stamp, toE: c.toE, toP: c.toP, breakdown: c.breakdown }; }
  function forecast(st, act) {
    if (!st.intent || st.over) return null;
    if (st.intent.ult) { const s = cloneDuel(st); return { ult: true, outcome: summarize(applyClash(s, act, null)) }; }
    const slices = st.e.disc.map((g, i) => {
      const hidden = g === 'hidden' && !st.e.habitKnown;
      if (hidden) return { i, glyph: 'hidden', attr: null, outcome: null };
      const s = cloneDuel(st); const out = summarize(applyClash(s, act, i));
      return { i, glyph: g === 'hidden' ? st.e.hidden : g, attr: glyphAttr(st, g, st.intent.bubble), outcome: out };
    });
    return { ult: false, slices };
  }
  // public view for the UI (never exposes intent.cellIdx or the deck order)
  function view(st) {
    const P = st.p, E = st.e;
    return { hand: st.hand, K: st.K, request: st.request, over: st.over, prologue: st.prologue,
      p: { hp: P.hp, maxHp: P.maxHp, qi: P.qi, hand: P.hand, deckCount: P.deck.length, discardCount: P.discard.length, ace: P.ace, aceUsed: P.aceUsed,
        chainLast: P.chainLast, chainLen: P.chainLen, lastAttr: P.lastAttr, ear: P.ear, relics: P.relics.slice(),
        aceCanReflect: !!(P.ace && !P.aceUsed && E.ultAt <= CFG.qiMax && beats(aceAxis(P.ace), E.ultAttr)),
        reviveReady: !!(P.reviveOnce && !P.revived), flags: { ...P.flags } },
      e: { id: E.id, name: E.name, hp: E.hp, maxHp: E.maxHp, qi: E.qi, ultAt: E.ultAt, ultAttr: E.ultAttr, phase: E.phase,
        notches: E.phases.map(p => p.atHp), quirk: E.quirk ? { type: E.quirk.type, val: E.quirkVal } : null,
        habitKnown: E.habitKnown, hasHidden: !!E.hidden && E.disc.includes('hidden'),
        hiddenGlyph: E.habitKnown && E.hidden ? E.hidden : null, starPlus: E.starPlus, deckCount: E.deck.length },
      intent: publicIntent(st), history: st.history.slice() };
  }

  // ======================= NIGHT (一晚) — pure functions; randomness from run.rng =======================
  const isFightType = t => t === 'prologue' || t === 'fight' || t === 'elite' || t === 'boss';
  function resolveUltAttr(ultAttr, aceTier) {
    const ax = TIER_AXIS[aceTier] || 'c';
    if (ultAttr === 'reflectable') return COUNTER_OF[COUNTER_OF[ax]];   // the attribute your ace's axis beats
    if (ultAttr === 'unreflectable') return COUNTER_OF[ax];            // the attribute that beats your ace's axis
    return ATTRS.includes(ultAttr) ? ultAttr : null;
  }
  function findNode(run, id) { if (!run || !run.map) return null; for (const c of run.map.cols) for (const n of c.nodes) if (n.id === id) return n; return null; }
  function getEvent(content, id) { return (content.events || []).find(e => e.id === id) || null; }
  function cardWithMods(content, id, mod) {
    const base = content.cards[id];
    if (!base) return null;
    if (!mod) return base;
    const c = Object.assign({}, base);
    for (const a of ATTRS) if (mod[a]) c[a] = clamp(star(base, a) + mod[a], 1, CFG.starCap);
    if (mod.washed) c.washed = true;
    if (mod.worn) c.worn = true;
    return c;
  }
  function deckCards(run, content) { return run.deck.map(id => cardWithMods(content, id, run.cardMods[id])).filter(Boolean); }
  function addMet(run, id) {
    if (!id) return;
    const S = run.stats;
    if (!S.metIds.includes(id)) { S.metIds.push(id); if (!(run.knownCards && run.knownCards[id])) S.newMetIds.push(id); }
  }
  function drawDistinct(run, pool, n, exclude) {
    const ex = new Set(exclude || []);
    let cand = (pool || []).filter(id => !ex.has(id));
    if (cand.length < n) cand = cand.concat((pool || []).filter(id => ex.has(id)));   // pool too small: allow repeats of owned cards
    shuffle(cand, run);
    return cand.slice(0, n);
  }
  function crateUnion(content) { const c = (content.pools && content.pools.crate) || {}; return [].concat(c.jazz || [], c.tw || [], c.noise || []); }
  // cards the bag already holds plus every stake of tonight: crate／event／listen draws avoid them (no duplicate copies)
  function ownedOrStaked(run) { const out = run.deck.slice(); if (run.map) for (const c of run.map.cols) for (const n of c.nodes) if (n.stakeId) out.push(n.stakeId); return out; }
  function drawFromPool(run, content, which) {
    const pool = which === 'gold' ? ((content.pools && content.pools.gold) || []) : crateUnion(content);
    return drawDistinct(run, pool, 1, ownedOrStaked(run))[0] || null;
  }
  function listenTrio(run, content) {
    const ex = new Set(ownedOrStaked(run)), all = ((content.pools && content.pools.listen) || []);
    const fresh = all.filter(id => !ex.has(id));
    const pool = shuffle((fresh.length >= 3 ? fresh : all).slice(), run);
    const out = [], seenG = new Set();
    for (const id of pool) { const c = content.cards[id]; const g = c && c.genres && c.genres[0]; if (out.length < 3 && !seenG.has(g)) { out.push(id); seenG.add(g); } }
    for (const id of pool) if (out.length < 3 && !out.includes(id)) out.push(id);
    return out;
  }
  function washTarget(run, content, cardId) {
    const c = cardWithMods(content, cardId, run.cardMods[cardId]);
    if (!c) return null;
    const ax = topAxis(c, ATTRS);
    return star(c, ax) < CFG.starCap ? ax : null;
  }

  // generateNight(content, rngObj, aceTier, withPrologue) -> { cols:[{ col, time, nodes:Node[] }] }
  function generateNight(content, R, aceTier, withPrologue) {
    const times = (content.map && content.map.times) || TIMES;
    const order = shuffle(content.normals.slice(), R);
    const bi = order.indexOf('buyer');
    if (bi > 2) { const t = order[2]; order[2] = order[bi]; order[bi] = t; }    // 剁手黨 always shows up in c1 or c3
    const evIds = shuffle((content.events || []).map(e => e.id), R).slice(0, 2);  // 2 of 7, no repeats
    const c5Listen = rng(R) < 0.5;
    const elite = pickOne(content.elites, R);
    const bossAceTier = pickOne(TIERS.filter(t => t !== aceTier), R);          // the ace the player did NOT pick (one of two)
    const mk = (col, idx, type, extra) => Object.assign({ id: 'c' + col + 'ab'[idx], col, time: times[col], type }, extra || {});
    // stakes never repeat within a night and never duplicate the starting bag (two copies would share cardMods)
    const usedStakes = new Set([...((content.gifts || {})[aceTier] || []), ...(content.junk || [])]);
    const fightNode = (col, idx, type, enemyId) => {
      const E = content.enemies[enemyId];
      const n = mk(col, idx, type, { enemyId });
      n.request = type === 'prologue' || !(E.requests && E.requests.length) ? null : pickOne(E.requests, R);
      if (E.stakePool && E.stakePool.length) {
        const fresh = E.stakePool.filter(id => !usedStakes.has(id));
        n.stakeId = pickOne(fresh.length ? fresh : E.stakePool, R); usedStakes.add(n.stakeId);
      } else n.stakeId = null;
      n.relicId = E.relicOffer || null;
      n.ultAttr = resolveUltAttr(E.ultAttr, aceTier);
      return n;
    };
    const cols = [];
    if (withPrologue) cols.push({ col: 0, time: times[0], nodes: [fightNode(0, 0, 'prologue', content.prologueEnemy || 'man')] });
    cols.push({ col: 1, time: times[1], nodes: [fightNode(1, 0, 'fight', order[0]), fightNode(1, 1, 'fight', order[1])] });
    cols.push({ col: 2, time: times[2], nodes: [mk(2, 0, 'crate'), mk(2, 1, 'listen')] });
    cols.push({ col: 3, time: times[3], nodes: [fightNode(3, 0, 'fight', order[2]), mk(3, 1, 'event', { eventId: evIds[0] })] });
    cols.push({ col: 4, time: times[4], nodes: [fightNode(4, 0, 'elite', elite), mk(4, 1, 'rest')] });
    cols.push({ col: 5, time: times[5], nodes: [fightNode(5, 0, 'fight', order[3]), c5Listen ? mk(5, 1, 'listen') : mk(5, 1, 'event', { eventId: evIds[1] })] });
    const boss = fightNode(6, 0, 'boss', content.boss || 'boss');
    boss.enemyAceTier = bossAceTier; boss.enemyAceId = content.aces[bossAceTier]; boss.stakeId = boss.enemyAceId;
    cols.push({ col: 6, time: times[6], nodes: [boss] });
    return { cols };
  }

  // newRun(content, { seedKey, nightNo, aceTier, goodEar, knownHabits, knownCards?, prologue? }) -> Run
  function newRun(content, o) {
    o = o || {};
    const seedKey = o.seedKey || 'lab', nightNo = o.nightNo || 1, aceTier = TIERS.includes(o.aceTier) ? o.aceTier : 'hall';
    const withPrologue = o.prologue != null ? !!o.prologue : nightNo === 1;
    const run = { v: 1, seedKey, nightNo, rng: fnv1a32(seedKey + '#' + nightNo) || 1, aceTier, goodEar: !!o.goodEar,
      knownHabits: Object.assign({}, o.knownHabits || {}), knownCards: Object.assign({}, o.knownCards || {}),
      hp: CFG.playerHp, maxHp: CFG.playerHp, deck: [...(content.gifts[aceTier] || []), ...(content.junk || [])], relics: [],
      nextStartQi: 0, testpressUsed: false, cardMods: {},
      map: null, col: 0, visited: [], pending: null, duel: null,
      stats: { wins: 0, readHit: 0, seeThrough: 0, feintBitten: 0, reflect: 0, found: 0, metIds: [], newMetIds: [], maxHit: 0, lostAt: null,
        fights: 0, hands: 0, block: 0, pUlt: 0, chain3: 0, retries: 0 },
      over: null };
    run.map = generateNight(content, run, aceTier, withPrologue);
    run.col = run.map.cols[0].col;
    return run;
  }

  function canMove(run, nodeId) {
    const n = findNode(run, nodeId);
    return !!n && !run.over && !run.pending && n.col === run.col;
  }

  // nodePreview(run, content, nodeId) -> { node, enemy?, ultAttr?, reflectable?, stake?:{c,o,h,tier,gold}, request?, relic? } (+ additive fields)
  function nodePreview(run, content, nodeId) {
    const node = findNode(run, nodeId);
    if (!node) return null;
    const out = { node, canMove: canMove(run, nodeId) };
    if (node.enemyId) {
      const E = content.enemies[node.enemyId];
      out.enemy = E;
      out.hp = E.hp;
      out.ultAt = E.ultAt == null ? 99 : E.ultAt;
      out.ultAttr = node.ultAttr;
      out.ults = out.ultAt <= CFG.qiMax;
      out.reflectable = out.ults && beats(TIER_AXIS[run.aceTier], node.ultAttr);
      const s = node.stakeId ? content.cards[node.stakeId] : null;
      out.stake = s ? { c: s.c, o: s.o, h: s.h, tier: s.tier || null, gold: !!s.gold } : null;
      out.request = node.request || null;
      out.requestLabel = node.request ? ((content.requests || {})[node.request] || node.request) : null;
      out.relic = node.relicId ? ((content.relics || {})[node.relicId] || { id: node.relicId }) : null;
      out.relicOwned = !!node.relicId && run.relics.includes(node.relicId);
      out.habitKnown = !!(run.knownHabits && run.knownHabits[node.enemyId]) || run.relics.includes('headphone');
      out.disc = E.disc.slice(); out.hidden = out.habitKnown ? (E.hidden || null) : null;
    }
    if (node.eventId) out.event = getEvent(content, node.eventId);
    return out;
  }

  // startNodeDuel(run, content, nodeId) -> { duel, events }   (moves to the node first if needed; prologue uses prologueHp/prologueStake)
  function startNodeDuel(run, content, nodeId, extra) {
    const none = error => ({ duel: null, events: [], error });
    if (run.over) return none('over');
    const node = findNode(run, nodeId);
    if (!node || !isFightType(node.type)) return none('notFight');
    const pend = run.pending;
    if (pend && pend.type === 'duel' && pend.nodeId === nodeId && run.duel) {
      // resume the saved duel (never re-roll it); if it is already over the caller should finishDuel next
      const d = run.duel;
      return { duel: d, events: d.over ? [] : [{ t: 'handStart', hand: d.hand, K: d.K, intent: publicIntent(d), qiGain: { p: 0, e: 0 } }], resumed: true };
    }
    if (!(pend && pend.type === 'duel' && pend.nodeId === nodeId)) {
      const r = choose(run, content, { type: 'move', nodeId });
      if (r.error) return none(r.error);
    }
    const E = content.enemies[node.enemyId];
    const prologue = node.type === 'prologue';
    const has = id => run.relics.includes(id);
    const startQi = (run.goodEar ? CFG.goodEarQi : 0) + (has('adapter45') ? CFG.adapterQi : 0) + (run.nextStartQi || 0);
    run.nextStartQi = 0; run.ovQi = 0;
    const pDef = { hp: prologue ? CFG.prologueHp : run.hp, maxHp: prologue ? CFG.prologueHp : run.maxHp, deck: deckCards(run, content),
      ace: content.cards[content.aces[run.aceTier]] || null, ear: run.aceTier, relics: run.relics.slice(), startQi,
      reviveOnce: has('testpress') && !run.testpressUsed };
    const eDeck = (E.deck || []).map(id => content.cards[id]).filter(Boolean);
    if (!eDeck.length) throw new Error('DipLabEngine: enemy ' + node.enemyId + ' has no resolvable deck cards');
    const eDef = Object.assign({}, E, { deck: eDeck });
    const seed = ((rng(run) * 4294967296) >>> 0) || 1;
    const opts = { seed, ultAttr: node.ultAttr, request: prologue ? null : (node.request || null), prologue,
      habitKnown: !!(run.knownHabits && run.knownHabits[node.enemyId]),
      enemyAce: node.enemyAceId ? (content.cards[node.enemyAceId] || null) : null,
      firstRecordId: (extra && extra.firstRecordId) || null };
    const res = startDuel(pDef, eDef, opts);
    run.duel = res.duel;
    return res;
  }

  function eliteRelicChoices(run, content) {
    const pool = ((content.pools && content.pools.eliteRelics) || []).filter(id => !run.relics.includes(id));
    return shuffle(pool.slice(), run).slice(0, 3);
  }
  function tier1Choices(run, content) { return ((content.pools && content.pools.tier1Relics) || ['dustcover', 'stylus', 'cleaner']).slice(); }

  // finishDuel(run, content, duel) -> { offer }
  function finishDuel(run, content, duel) {
    duel = duel || run.duel;
    if (!duel || !duel.over) return { offer: null, error: 'notOver' };
    const pend = run.pending;
    const node = pend && pend.type === 'duel' ? findNode(run, pend.nodeId) : null;
    if (!node) return { offer: null, error: 'noDuelPending' };
    const S = run.stats, ds = duel.stats;
    const prologue = node.type === 'prologue';
    if (!(prologue && duel.over === 'lose')) {   // a lost prologue attempt is retried with the same deck: it adds nothing to the score
    S.readHit += ds.readHit | 0; S.seeThrough += ds.seeThrough | 0; S.feintBitten += ds.feintBitten | 0; S.reflect += ds.reflect | 0;
    S.found += ds.found | 0; S.block += ds.block | 0; S.pUlt += ds.pUlt | 0; S.chain3 += ds.chain3 | 0;
    S.maxHit = Math.max(S.maxHit, ds.maxHit | 0); S.fights++; S.hands += duel.hand | 0;
    }
    if (duel.p.revived) run.testpressUsed = true;
    if (duel.e.habitKnown && ds.found) run.knownHabits[node.enemyId] = true;
    run.duel = null;
    let offer;
    if (duel.over === 'win') {
      S.wins++;
      const lc = duel.lastClash;   // 看穿收尾：KO 那一手是看穿（FUN-13；duel.js 蓋「看穿收尾！」章）
      if (lc && lc.kind === 'counter' && lc.stamp === 'seeThrough') S.seeThroughKO = (S.seeThroughKO | 0) + 1;
      if (!prologue) run.hp = Math.min(run.maxHp, Math.max(0, duel.p.hp) + CFG.winHeal + (run.relics.includes('cleaner') ? CFG.cleanerHeal : 0));
      addMet(run, node.stakeId);
      if (node.type === 'boss') {
        offer = { kind: 'clear', cardId: node.stakeId };
        run.over = 'clear'; run.pending = null; run.col = node.col + 1;
      } else if (node.type === 'elite') {
        offer = { kind: 'elite', cardId: node.stakeId, relicChoices: eliteRelicChoices(run, content) };
        run.pending = { type: 'reward', nodeId: node.id, offer, stakeDone: false, relicDone: false };
      } else if (prologue) {
        offer = { kind: 'stake', cardId: node.stakeId, relicId: null, relicChoices: tier1Choices(run, content), prologue: true };
        run.pending = { type: 'reward', nodeId: node.id, offer, stakeDone: false, relicDone: false };
      } else {
        offer = { kind: 'stake', cardId: node.stakeId, relicId: node.relicId || null };
        if (offer.relicId && run.relics.includes(offer.relicId)) offer.relicOwned = true;
        if (run.relics.includes('pointcard')) {
          const seen = new Set([node.stakeId]); const extra = [];
          for (const c of duel.e.deck.slice().reverse().concat(duel.e.discard.slice().reverse())) {
            if (extra.length >= 2) break;
            if (!c || c.tier || seen.has(c.id) || !content.cards[c.id]) continue;
            seen.add(c.id); extra.push(c.id);
          }
          if (extra.length) offer.extraCardIds = extra;
        }
        run.pending = { type: 'reward', nodeId: node.id, offer, stakeDone: false, relicDone: false };
      }
    } else if (prologue) {
      offer = { kind: 'retry' }; S.retries++;
      run.pending = { type: 'duel', nodeId: node.id };      // same deck, reshuffled, nothing lost
    } else {
      run.over = 'dead'; run.hp = Math.max(0, duel.p.hp); run.pending = null;
      S.lostAt = { nodeId: node.id, enemyId: node.enemyId, col: node.col, time: node.time, hand: duel.hand, clash: duel.lastClash || null, reveal: duel.lastReveal || null };
      offer = { kind: 'dead' };
    }
    return { offer };
  }

  const fallbackHp = content => (content.relicFallback && content.relicFallback.hp != null ? content.relicFallback.hp : CFG.relicOwnedHp);
  function completeNode(run) { run.pending = null; run.col++; }
  function needsStakeAndRelic(run, p) { const n = findNode(run, p.nodeId); return !!n && (n.type === 'elite' || n.type === 'prologue'); }
  function deckFullError(run, dropId) { return run.deck.length >= CFG.deckCap && (!dropId || run.deck.indexOf(dropId) < 0) ? 'deckFull' : null; }
  function deckAdd(run, cardId, dropId, effects) {
    if (run.deck.length >= CFG.deckCap) { run.deck.splice(run.deck.indexOf(dropId), 1); effects.push({ loseCard: dropId }); }
    run.deck.push(cardId); effects.push({ gainCard: cardId });
  }
  function heal(run, n) { run.hp = clamp(run.hp + n, 1, run.maxHp); }
  // node heals (試聽機／櫃檯／事件／配件重複): what spills over a full bar by ≥ overflowQiAt becomes 下一場開局氣勢 +1
  // (run.ovQi counts those, capped per fight, reset at the next duel start). Effects: {hp:n} then {overflowQi:1}.
  function nodeHeal(run, n, effects) {
    const over = run.hp + n - run.maxHp;
    heal(run, n); effects.push({ hp: n });
    if (n > 0 && over >= CFG.overflowQiAt && (run.ovQi | 0) < CFG.overflowQiCap) { run.ovQi = (run.ovQi | 0) + 1; run.nextStartQi += 1; effects.push({ overflowQi: 1 }); }
  }
  function gainRelicOrHp(run, id, elseHp, effects) {
    if (!id || run.relics.includes(id)) nodeHeal(run, elseHp, effects);
    else { run.relics.push(id); effects.push({ gainRelic: id }); }
  }

  // nextStep(run) -> what the run is waiting for: 'move'|'duel'|'stake'|'relic'|'crate'|'crateCard'|'listen'|'listenKeep'|'event'|'rest'|null
  function nextStep(run) {
    if (run.over) return null;
    const p = run.pending;
    if (!p) return 'move';
    if (p.type === 'duel') return 'duel';
    if (p.type === 'reward') { if (!p.stakeDone) return 'stake'; return 'relic'; }
    return p.step || null;
  }

  // choose(run, content, choice) -> { effects:Effect[], error?, result? }   (invalid choices change nothing and return error)
  function choose(run, content, ch) {
    const effects = [];
    const fail = error => ({ effects: [], error });
    if (!ch || !ch.type) return fail('badChoice');
    if (run.over) return fail('over');
    const p = run.pending;
    const rew = p && p.type === 'reward' ? p : null;
    const nodeStep = s => p && p.type === 'node' && p.step === s;
    switch (ch.type) {
      case 'move': {
        if (!canMove(run, ch.nodeId)) return fail('cannotMove');
        const node = findNode(run, ch.nodeId);
        run.visited.push(node.id);
        if (isFightType(node.type)) { run.pending = { type: 'duel', nodeId: node.id }; return { effects }; }
        if (node.type === 'crate') { run.pending = { type: 'node', nodeId: node.id, step: 'crate' }; return { effects }; }
        if (node.type === 'listen') {
          const ids = listenTrio(run, content); const answerId = pickOne(ids, run);
          run.pending = { type: 'node', nodeId: node.id, step: 'listen', cardIds: ids, answerId };
          effects.push({ reveal: ids.slice() }); return { effects };
        }
        if (node.type === 'event') {
          const evd = getEvent(content, node.eventId); const eventCards = {};
          if (evd) evd.options.forEach((o, i) => (o.effects || []).forEach(fx => { if (fx.gainFromPool) eventCards[i] = drawFromPool(run, content, fx.gainFromPool); }));
          run.pending = { type: 'node', nodeId: node.id, step: 'event', eventId: node.eventId, eventCards };
          const ids = Object.keys(eventCards).map(k => eventCards[k]).filter(Boolean);
          if (ids.length) effects.push({ reveal: ids });
          return { effects };
        }
        if (node.type === 'rest') { run.pending = { type: 'node', nodeId: node.id, step: 'rest' }; return { effects }; }
        return fail('badNode');
      }
      case 'takeStake': {
        if (!rew || rew.stakeDone || !rew.offer.cardId || rew.offer.kind === 'clear') return fail('noStake');
        const e = deckFullError(run, ch.dropId); if (e) return fail(e);
        deckAdd(run, rew.offer.cardId, ch.dropId, effects);
        rew.stakeDone = true;
        if (!needsStakeAndRelic(run, rew) || rew.relicDone) completeNode(run);
        return { effects };
      }
      case 'keepStakeOnShelf': {
        if (!rew || rew.stakeDone) return fail('noStake');
        rew.stakeDone = true;
        if (!needsStakeAndRelic(run, rew) || rew.relicDone) completeNode(run);
        return { effects };
      }
      case 'takeRelic': {
        if (!rew || rew.stakeDone || needsStakeAndRelic(run, rew) || !rew.offer.relicId) return fail('noRelic');
        if (ch.relicId && ch.relicId !== rew.offer.relicId) return fail('wrongRelic');
        gainRelicOrHp(run, rew.offer.relicId, fallbackHp(content), effects);
        completeNode(run);
        return { effects };
      }
      case 'takeExtra': {
        if (!rew || rew.stakeDone || !(rew.offer.extraCardIds || []).includes(ch.cardId)) return fail('noExtra');
        const e = deckFullError(run, ch.dropId); if (e) return fail(e);
        deckAdd(run, ch.cardId, ch.dropId, effects); addMet(run, ch.cardId);
        completeNode(run);
        return { effects };
      }
      case 'pickRelic': {
        if (!rew || rew.relicDone || !needsStakeAndRelic(run, rew)) return fail('noRelicPick');
        const choices = rew.offer.relicChoices || [];
        if (choices.length && !choices.includes(ch.relicId)) return fail('wrongRelic');
        gainRelicOrHp(run, choices.length ? ch.relicId : null, fallbackHp(content), effects);
        rew.relicDone = true;
        if (rew.stakeDone) completeNode(run);
        return { effects };
      }
      case 'crate': {
        if (!nodeStep('crate')) return fail('noCrate');
        const pool = content.pools && content.pools.crate && content.pools.crate[ch.crate];
        if (!pool || !pool.length) return fail('badCrate');
        const ids = drawDistinct(run, pool, 3, ownedOrStaked(run));
        const goldRoll = rng(run);
        let goldId = null;
        if (goldRoll < (content.pools.goldChance != null ? content.pools.goldChance : CFG.goldChance)) {
          goldId = drawDistinct(run, (content.pools.gold || []), 1, ownedOrStaked(run).concat(ids))[0] || null;
          if (goldId) ids[Math.min(2, ids.length)] = goldId;
        }
        p.step = 'crateCard'; p.crate = ch.crate; p.cardIds = ids; p.goldId = goldId;
        effects.push({ reveal: ids.slice() });
        return { effects };
      }
      case 'crateCard': {
        if (!nodeStep('crateCard')) return fail('noCrateCard');
        if (ch.cardId == null) { completeNode(run); return { effects }; }
        if (!p.cardIds.includes(ch.cardId)) return fail('badCard');
        const e = deckFullError(run, ch.dropId); if (e) return fail(e);
        deckAdd(run, ch.cardId, ch.dropId, effects); addMet(run, ch.cardId);
        completeNode(run);
        return { effects };
      }
      case 'listen': {
        if (!nodeStep('listen')) return fail('noListen');
        const g = ch.guessId == null ? null : ch.guessId;
        if (g != null && !p.cardIds.includes(g)) return fail('badGuess');
        let n, result, keepId;
        if (g == null) { n = CFG.listenMuted; result = 'muted'; keepId = p.cardIds.includes(ch.pickId) ? ch.pickId : p.answerId; }
        else if (g === p.answerId) { n = CFG.listenHit; result = 'hit'; keepId = p.answerId; addMet(run, p.answerId); }
        else { n = CFG.listenMiss; result = 'miss'; keepId = null; }
        nodeHeal(run, n, effects);
        p.step = 'listenKeep'; p.result = result; p.keepId = keepId; p.guessId = g;
        return { effects, result, answerId: p.answerId };
      }
      case 'listenKeep': {
        if (!nodeStep('listenKeep')) return fail('noListenKeep');
        if (ch.keep && p.keepId) {
          const e = deckFullError(run, ch.dropId); if (e) return fail(e);
          deckAdd(run, p.keepId, ch.dropId, effects); addMet(run, p.keepId);
        }
        completeNode(run);
        return { effects };
      }
      case 'rest': {
        if (!nodeStep('rest')) return fail('noRest');
        if (ch.option === 'tea') nodeHeal(run, CFG.teaHp, effects);
        else if (ch.option === 'wash') {
          if (!run.deck.includes(ch.cardId)) return fail('badCard');
          const ax = washTarget(run, content, ch.cardId);
          if (!ax) return fail('maxed');
          const m = Object.assign({}, run.cardMods[ch.cardId] || {});
          m[ax] = (m[ax] || 0) + 1; m.washed = true; run.cardMods[ch.cardId] = m;
          effects.push({ starUp: { cardId: ch.cardId, axis: ax } });
        } else return fail('badOption');
        completeNode(run);
        return { effects };
      }
      case 'event': {
        if (!nodeStep('event')) return fail('noEvent');
        if (ch.eventId && ch.eventId !== p.eventId) return fail('wrongEvent');
        const evd = getEvent(content, p.eventId);
        const opt = evd && evd.options[ch.option];
        if (!opt) return fail('badOption');
        const fxs = opt.effects || [];
        const needsCard = opt.needsCard || fxs.some(f => f.giveAwayPicked || f.starUpPicked);
        if (needsCard && !run.deck.includes(ch.cardId)) return fail('needsCard');
        if (opt.minDeck && run.deck.length < opt.minDeck) return fail('deckTooSmall');
        if (fxs.some(f => f.giveAwayPicked) && run.deck.length - 1 < CFG.deckMin) return fail('deckTooSmall');
        const upFx = fxs.find(f => f.starUpPicked);
        if (upFx) { const c0 = cardWithMods(content, ch.cardId, run.cardMods[ch.cardId]); if (!c0 || star(c0, upFx.starUpPicked) >= CFG.starCap) return fail('maxed'); }
        const gainId = fxs.some(f => f.gainFromPool) ? (p.eventCards || {})[ch.option] : null;
        if (gainId) { const e = deckFullError(run, ch.dropId); if (e) return fail(e); }
        for (const f of fxs) {
          if (f.hp != null) nodeHeal(run, f.hp, effects);
          if (f.nextStartQi != null) { run.nextStartQi += f.nextStartQi; effects.push({ nextStartQi: f.nextStartQi }); }
          if (f.giveAwayPicked) { run.deck.splice(run.deck.indexOf(ch.cardId), 1); effects.push({ loseCard: ch.cardId }); }
          if (f.gainRelic) gainRelicOrHp(run, f.gainRelic, f.elseHp || 0, effects);
          if (f.gainFromPool && gainId) {
            if (f.minus1) { const m = Object.assign({}, run.cardMods[gainId] || {}); for (const a of ATTRS) m[a] = (m[a] || 0) - 1; m.worn = true; run.cardMods[gainId] = m; }
            deckAdd(run, gainId, ch.dropId, effects); addMet(run, gainId);
          }
          if (f.starUpPicked) {
            const ax = f.starUpPicked, c = cardWithMods(content, ch.cardId, run.cardMods[ch.cardId]);
            if (c && star(c, ax) < CFG.starCap) { const m = Object.assign({}, run.cardMods[ch.cardId] || {}); m[ax] = (m[ax] || 0) + 1; run.cardMods[ch.cardId] = m; effects.push({ starUp: { cardId: ch.cardId, axis: ax } }); }
          }
        }
        if (opt.result) effects.push({ text: opt.result });
        completeNode(run);
        return { effects };
      }
    }
    return fail('badChoice');
  }

  // scoreRun(run) -> { total, parts:[[label, value]] }   (SPEC §3.10)
  function scoreRun(run) {
    const s = run.stats, parts = [];
    parts.push(['勝場 ×' + s.wins, s.wins * 100]);
    parts.push(['讀中 ×' + s.readHit, s.readHit * 10]);
    parts.push(['看穿 ×' + s.seeThrough, s.seeThrough * 25]);
    if (s.seeThroughKO) parts.push(['看穿收尾 ×' + s.seeThroughKO, s.seeThroughKO * 50]);
    parts.push(['七星回擊 ×' + s.reflect, s.reflect * 60]);
    parts.push(['🔍發現 ×' + s.found, s.found * 20]);
    parts.push(['新認識的盤 ×' + s.newMetIds.length, s.newMetIds.length * 15]);
    if (run.over === 'clear') { parts.push(['通關', 300]); parts.push(['剩餘聲望 ×' + run.hp, run.hp * 10]); }
    return { total: parts.reduce((a, p) => a + p[1], 0), parts };
  }

  // ======================= POLICIES (SPEC §7.7; shared by sim.mjs and the browser __lab.autoplay) =======================
  // Every policy: (duel, rngFn?) -> Action. rngFn defaults to a deterministic generator derived from the duel state (duel is not mutated).
  function outcomeOf(st, act, cell) {
    const s = cloneDuel(st); applyClash(s, act, cell);
    return { toE: st.e.hp - s.e.hp, toP: st.p.hp - s.p.hp, dqP: s.p.qi - st.p.qi, dqE: s.e.qi - st.e.qi, win: s.over === 'win', lose: s.over === 'lose', aceUsed: s.p.aceUsed && !st.p.aceUsed };
  }
  const visibleCells = st => { const out = []; st.e.disc.forEach((g, i) => { if (!(g === 'hidden' && !st.e.habitKnown)) out.push(i); }); return out; };
  function attrDist(st) { const v = publicIntent(st); const d = { c: 0, o: 0, h: 0 }; let n = 0; for (const s of v.slices) if (s.attr) { d[s.attr]++; n++; } for (const a of ATTRS) d[a] /= (n || 1); return d; }
  function bestCardFor(st, attr) { let bi = -1, bv = -1; st.p.hand.forEach((c, i) => { if (star(c, attr) > bv) { bv = star(c, attr); bi = i; } }); return bi; }
  const aceCanReflect = st => !!(st.p.ace && !st.p.aceUsed && beats(aceAxis(st.p.ace), st.e.ultAttr));
  function handleEnemyUlt(st) {
    const it = st.intent, P = st.p;
    if (aceCanReflect(st)) return { type: 'ace' };
    if (P.qi >= CFG.ultMin && P.qi >= st.e.hp) return { type: 'ult' };
    const blockAttr = COUNTER_OF[it.attr]; const i = bestCardFor(st, blockAttr);
    return { type: 'card', i, attr: blockAttr };
  }
  function valueOf(o, w) {
    w = w || {};
    if (o.win) return 1000 - o.toP; if (o.lose) return -1000;
    const qv = w.qv != null ? w.qv : 0.35, qe = w.qe != null ? w.qe : 0.35, hurt = w.hurt != null ? w.hurt : 1.1;
    return o.toE - hurt * o.toP + qv * o.dqP - qe * o.dqE - (o.aceUsed ? (w.aceCost || 0) : 0);
  }
  const defRng = st => makeRng((st.rng ^ Math.imul(st.hand + 1, 0x9E3779B1)) | 0);
  function lastCounteredBubble(st) { const h = st.history[st.history.length - 1]; return !!h && !h.eUlt && h.pAct !== 'ult' && h.pAttr === COUNTER_OF[h.bubble]; }
  function evScore(st, a, cells, holdAce) {
    let s = 0; for (const c of cells) s += valueOf(outcomeOf(st, a, c), { aceCost: holdAce ? 5 : 1.5 });
    s /= cells.length;
    if (a.type === 'ult' && !st.intent.ult) s -= 0.15 * Math.max(0, CFG.qiMax - st.p.qi);   // mild incentive to bank
    return s;
  }
  const policies = {
    random(st, r) { r = r || defRng(st); const a = legalActions(st); return a[Math.floor(r() * a.length)]; },
    highest(st) {
      if (st.intent.ult) return handleEnemyUlt(st);
      if (st.p.qi >= CFG.ultMin) return { type: 'ult' };
      if (st.p.ace && !st.p.aceUsed) return { type: 'ace' };
      let best = null, bv = -1; st.p.hand.forEach((c, i) => ATTRS.forEach(a => { if (star(c, a) > bv) { bv = star(c, a); best = { type: 'card', i, attr: a }; } })); return best;
    },
    counterBubble(st) {
      if (st.intent.ult) return handleEnemyUlt(st);
      if (st.p.qi >= CFG.ultMin) return { type: 'ult' };
      const a = COUNTER_OF[st.intent.bubble];
      if (st.p.ace && !st.p.aceUsed && aceAxis(st.p.ace) === a && !aceCanReflect(st)) return { type: 'ace' };
      return { type: 'card', i: bestCardFor(st, a), attr: a };
    },
    oldFormula(st) {
      if (st.intent.ult) return handleEnemyUlt(st);
      if (st.p.qi >= CFG.ultMin) return { type: 'ult' };
      const b = st.intent.bubble; const a = lastCounteredBubble(st) ? b : COUNTER_OF[b];
      if (st.p.ace && !st.p.aceUsed && aceAxis(st.p.ace) === a && !aceCanReflect(st)) return { type: 'ace' };
      return { type: 'card', i: bestCardFor(st, a), attr: a };
    },
    mostLikely(st, r) {
      r = r || defRng(st);
      if (st.intent.ult) return handleEnemyUlt(st);
      if (st.p.qi >= CFG.ultMin && (st.p.qi >= 8 || st.p.qi >= st.e.hp)) return { type: 'ult' };
      const d = attrDist(st); let m = 'c'; for (const a of ATTRS) if (d[a] > d[m] || (d[a] === d[m] && r() < 0.5)) m = a;
      const a = COUNTER_OF[m];
      const holdAce = aceCanReflect(st) && st.e.qi >= st.e.ultAt - 4;
      if (st.p.ace && !st.p.aceUsed && aceAxis(st.p.ace) === a && !holdAce) return { type: 'ace' };
      return { type: 'card', i: bestCardFor(st, a), attr: a };
    },
    ev(st) {
      const acts = legalActions(st); const cells = st.intent.ult ? [null] : visibleCells(st);
      const holdAce = aceCanReflect(st) && !st.intent.ult;
      let best = null, bv = -Infinity;
      for (const a of acts) { const s = evScore(st, a, cells, holdAce); if (s > bv) { bv = s; best = a; } }
      return best;
    },
    ev2(st) {
      // 1-ply EV + manipulation lookahead: how concentrated will his NEXT disc be if I play this attribute now?
      const acts = legalActions(st); const cells = st.intent.ult ? [null] : visibleCells(st);
      const holdAce = aceCanReflect(st) && !st.intent.ult;
      const deck = st.e.deck.concat(st.e.discard); const tops = { c: 0, o: 0, h: 0 }; for (const c of deck) tops[topAxis(c, st.e.taste)]++;
      let best = null, bv = -Infinity;
      for (const a of acts) {
        let s = evScore(st, a, cells, holdAce);
        const myAttr = a.type === 'card' ? a.attr : a.type === 'ace' ? aceAxis(st.p.ace) : st.p.lastAttr;
        const fake = { p: { relics: st.p.relics, lastAttr: myAttr, hand: a.type === 'card' ? st.p.hand.filter((_, i) => i !== a.i) : st.p.hand }, e: st.e };
        let conc = 0, tot = 0;
        for (const b of ATTRS) {
          if (!tops[b]) continue; const d = { c: 0, o: 0, h: 0 }; let n = 0;
          for (const g of st.e.disc) { if (g === 'hidden' && !st.e.habitKnown) continue; d[glyphAttr(fake, g, b)]++; n++; }
          conc += tops[b] * Math.max(d.c, d.o, d.h) / Math.max(1, n); tot += tops[b];
        }
        if (tot) s += 6 * (conc / tot - 0.5);
        if (s > bv) { bv = s; best = a; }
      }
      return best;
    },
    oracle(st) {
      const acts = legalActions(st); let best = null, bv = -Infinity;
      const holdAce = aceCanReflect(st) && !st.intent.ult;
      for (const a of acts) { const v = valueOf(outcomeOf(st, a, st.intent.ult ? null : st.intent.cellIdx), { aceCost: holdAce ? 5 : 1.5 }); if (v > bv) { bv = v; best = a; } }
      return best;
    },
  };

  // routePolicy(run, content, pending) -> Choice | null   (null = nothing to choose: a duel is pending → call startNodeDuel; or the run is over)
  // HP < 12 → prefer 試聽機／櫃檯／事件; otherwise fights; rewards always take the stake record.
  const RELIC_PRIORITY = ['testpress', 'adapter45', 'isolation', 'matrix', 'firstpress', 'stylus', 'dustcover', 'headphone', 'obi', 'cleaner', 'gauge', 'pointcard'];
  function routePolicy(run, content, pending) {
    if (run.over) return null;
    if (pending === undefined) pending = run.pending;
    const step = nextStep(run);
    const lowHp = run.hp < 12;
    const cardOf = id => cardWithMods(content, id, run.cardMods[id]);
    const power = c => c ? Math.max(c.c, c.o, c.h) * 10 + c.c + c.o + c.h : -1;
    const weakest = () => { let best = null, bv = Infinity; for (const id of run.deck) { const v = power(cardOf(id)); if (v >= 0 && v < bv) { bv = v; best = id; } } return best; };
    const dropIfFull = () => run.deck.length >= CFG.deckCap ? weakest() : undefined;
    const withDrop = ch => { const d = dropIfFull(); if (d) ch.dropId = d; return ch; };
    switch (step) {
      case 'move': {
        const col = run.map.cols.find(c => c.col === run.col); if (!col) return null;
        const nodes = col.nodes; let n;
        if (nodes.length === 1) n = nodes[0];
        else if (lowHp) n = nodes.find(x => x.type === 'listen' || x.type === 'rest' || x.type === 'event') || nodes.find(x => !isFightType(x.type)) || nodes[0];
        else n = nodes.find(x => isFightType(x.type)) || nodes.find(x => x.type === 'crate') || nodes[0];
        return { type: 'move', nodeId: n.id };
      }
      case 'duel': return null;
      case 'stake': return withDrop({ type: 'takeStake' });
      case 'relic': {
        const ch = (pending.offer && pending.offer.relicChoices) || [];
        if (!ch.length) return { type: 'pickRelic', relicId: null };
        if (pending.offer.prologue) return { type: 'pickRelic', relicId: ch[fnv1a32(run.seedKey + '#' + run.nightNo) % ch.length] };
        const best = ch.slice().sort((a, b) => RELIC_PRIORITY.indexOf(a) - RELIC_PRIORITY.indexOf(b))[0];
        return { type: 'pickRelic', relicId: best };
      }
      case 'crate': { const crates = ['jazz', 'tw', 'noise']; return { type: 'crate', crate: crates[fnv1a32(run.seedKey + '@' + run.nightNo) % 3] }; }
      case 'crateCard': {
        let best = null, bv = -1; for (const id of pending.cardIds) { const v = power(content.cards[id]); if (v > bv) { bv = v; best = id; } }
        return withDrop({ type: 'crateCard', cardId: best });
      }
      case 'listen': return { type: 'listen', guessId: pending.cardIds[0] };
      case 'listenKeep': return pending.keepId ? withDrop({ type: 'listenKeep', keep: true }) : { type: 'listenKeep', keep: false };
      case 'rest': {
        if (run.hp <= run.maxHp - 6) return { type: 'rest', option: 'tea' };
        let best = null, bv = -1; for (const id of run.deck) { if (!washTarget(run, content, id)) continue; const v = power(cardOf(id)); if (v > bv) { bv = v; best = id; } }
        return best ? { type: 'rest', option: 'wash', cardId: best } : { type: 'rest', option: 'tea' };
      }
      case 'event': {
        const evd = getEvent(content, pending.eventId); if (!evd) return null;
        let bi = -1, bv = -Infinity;
        evd.options.forEach((o, i) => {
          const fxs = o.effects || [];
          if (o.minDeck && run.deck.length < o.minDeck) return;
          if (fxs.some(f => f.giveAwayPicked) && run.deck.length - 1 < CFG.deckMin) return;
          if (fxs.some(f => f.starUpPicked) && !run.deck.some(id => { const c = cardOf(id); return c && star(c, fxs.find(f => f.starUpPicked).starUpPicked) < CFG.starCap; })) return;
          let v = 0, dh = 0;
          for (const f of fxs) {
            if (f.hp) { v += f.hp * (lowHp ? 1.5 : 0.4); dh += f.hp; }
            if (f.nextStartQi) v += f.nextStartQi * 1.2;
            if (f.giveAwayPicked) v -= 0.5;
            if (f.gainRelic) v += run.relics.includes(f.gainRelic) ? (f.elseHp || 0) * 0.4 : 3;
            if (f.gainFromPool) v += f.minus1 ? 1 : 2.5;
            if (f.starUpPicked) v += 1.5;
          }
          if (run.hp + dh < 8 && dh < 0) v -= 10;
          if (v > bv) { bv = v; bi = i; }
        });
        if (bi < 0) bi = 0;
        const o = evd.options[bi], fxs = o.effects || [];
        const ch = { type: 'event', eventId: evd.id, option: bi };
        const up = fxs.find(f => f.starUpPicked);
        if (up) { let best = null, bv2 = -1; for (const id of run.deck) { const c = cardOf(id); if (c && star(c, up.starUpPicked) < CFG.starCap && power(c) > bv2) { bv2 = power(c); best = id; } } ch.cardId = best; }
        else if (o.needsCard || fxs.some(f => f.giveAwayPicked)) ch.cardId = weakest();
        if (fxs.some(f => f.gainFromPool)) withDrop(ch);
        return ch;
      }
    }
    return null;
  }

  return { VERSION, ATTRS, ZH, ZH1, COUNTER_OF, NEXT, beats, COUNTER_NAME, CHAIN_NAME, GLYPHS, TIER_AXIS, TIERS, TIMES, CFG,
    rng, makeRng, shuffle, fnv1a32, clone, cloneDuel, stakeAt, topAxis, aceAxis, bigAxis, glyphAttr, realGlyph, publicIntent,
    startDuel, beginHand, legalActions, isLegal, applyClash, resolveTurn, forecast, view,
    resolveUltAttr, generateNight, newRun, nodePreview, canMove, startNodeDuel, finishDuel, choose, scoreRun, nextStep, findNode,
    cardWithMods, deckCards, washTarget,
    policies, routePolicy, outcomeOf, valueOf };
});
