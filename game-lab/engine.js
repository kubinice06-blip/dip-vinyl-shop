// game-lab/engine.js — 品味對決 v3 pure rules engine (Agent R).  SPEC-v3 §2, §9, §10.1 + 發燒配件 override (main session).
// No DOM, no Math.random, no Date. Every state object is plain JSON (save it as is); RNG = mulberry32 with its integer state in `.rng`.
// Browser: window.DipLabEngine ; Node: module.exports.  Content (content.js) is always passed in, never required.
//
// ============================================================================================================================
// API (VERSION 'lab-3')
// ----------------------------------------------------------------------------------------------------------------------------
// Constants  ATTRS ['c','o','h'] · ZH {c:'經典',o:'冷門',h:'硬蕊'} · ZH1 {c:'經',o:'冷',h:'硬'}
//            BEATS {o:'c',c:'h',h:'o'} (x beats BEATS[x]) · COUNTER_OF {c:'o',o:'h',h:'c'} (the attr that beats x) · beats(x,y)
//            TIERS · TIER_AXIS · HABIT_KEYS · FORMULAS · CFG {playerHp:10, handSize:3, bagStart:7, bagMax:8, habitP:0.4, retries:1, relicMax:3}
// Helpers    clash(pStar,pAttr,eStar,eAttr) -> {kind,toE,toP}       kind ∈ counter|countered|mirrorWin|mirrorLose|tie
//            habitAttr(habit, ctx) · habitAttrOf(duel) (what his name tag implies THIS hand — policies/tests only, never shown)
//            bestChip(duel, attr, {ace:false}) -> {i,attr} | {ace:true,attr} | null   (leftmost max star of attr; default hand only)
//            handTopAxis(hand, ace) -> {i:number|'ace', attr} | null   (盯手: biggest star in your hand, ace counts as leftmost; ties c→o→h)
// Duel       enemyDef(content, enemyId, {tutorial}) -> eDef · playerDef(content, {bag,ace,relics}) -> pDef
//            startDuel(pDef, eDef, opts) -> {duel, events}
//              pDef {hp?, bag:[Card], ace:Card|null, relics:[id|{id,name,icon,line,note}]}
//              eDef {id,name,title,habit,phase2,p,hp,taste,deck:[Card],elite,boss,habitLabel,habitLine,phase2Label,phase2Line}
//              opts {seed, enemyAce:Card, script:{records:[id] (his pile, top first), attrs:[attr|null] (forced per hand), hand:[3 ids], draw:[ids]}, firstRecordId}
//            legalActions(duel) -> [{i,attr}×(hand×3), {ace:true,attr}]       act = {i:0..2, attr} | {ace:true}
//            isLegal(duel, act)
//            preview(duel, act) -> {c:{kind,toE,toP,notes}, o:{…}, h:{…}}  (relics included; preview[eAttr] === the resolved clash)
//            resolveTurn(duel, act, {forcedAttr?, debugOutcome?:{kind,toE,toP}}) -> Event[]   (illegal act → [] and nothing changes)
//            view(duel) -> { n, over, pHp, pMax, eHp, eMax, notch, eId, eName, elite, boss, eCard, pile, pileMax, habit, habitLine, habitLabel,
//                            switched, first, hand, ace, aceCard, aceAxis, aceUsed, last, eyeTarget, relics, dustUsed }   (never the intent)
//            Events {t:'hand', n, eCard, pile, first}
//                   {t:'clash', n, pCard, pAttr, pStar, ace, eCard, eAttr, eStar, kind, toE, toP, followed, read, habit, notes:[{relic,text}], pHp, eHp}
//                   {t:'draw', i, card, reshuffled}     {t:'switch', habit, line, label}     {t:'over', win, by:'hp'|'pile', pHp, eHp}
//            order per resolve: clash → draw (not after the ace) → over | (switch? → hand)
// Night      newRun(content, {seedKey, nightNo, ace, prologue?, relics?, bossAce?}) -> run    nextStep(run) · current(run, content)
//            startFight(run, content, {tutorial?, firstRecordId?}) -> {duel, events, enemyId}   (run.duel already there → {…, events:[], resumed:true})
//            finishFight(run, content, duel?) -> {win, by, enemyId, met:[ids], offer, over}
//            choose(run, content, {type:'take',cardId,dropId?}|{type:'relic',relicId,dropRelicId?}|{type:'skip'}|{type:'retry'}|{type:'end'})
//              -> {ok, error?, effects}
//            runPolicy(run, content, {preferRelic=true}) -> a valid choice for run.pending
// Policies   policies[name](duel, rngFn?, mem?) -> act. random, strongest, counterTop, mirrorTop, counterLast, dodgeMine, beatMine,
//            mirrorLast, beatLast, counterSecond (FORMULAS), novice (= reader: 照名牌剋), sloppy, learner (不看名牌), veteran, oracle
// ============================================================================================================================
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DipLabEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const VERSION = 'lab-3';
  const ATTRS = ['c', 'o', 'h'];
  const ZH = { c: '經典', o: '冷門', h: '硬蕊' };
  const ZH1 = { c: '經', o: '冷', h: '硬' };
  const BEATS = { o: 'c', c: 'h', h: 'o' };          // 冷剋經、經剋硬、硬剋冷：x beats BEATS[x]
  const COUNTER_OF = { c: 'o', o: 'h', h: 'c' };     // COUNTER_OF[x] = the attribute that beats x
  const beats = (x, y) => !!x && !!y && BEATS[x] === y;
  const TIERS = ['hall', 'pearl', 'heresy'];
  const TIER_AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };
  const HABIT_KEYS = ['honest', 'copy', 'grudge', 'repeat', 'rot', 'bluff', 'eye'];
  const USES_LAST = { copy: 'p', grudge: 'p', repeat: 'e', rot: 'e' };   // habits that read a 'last' (first hand → his biggest star)
  const COLOR_RELIC = { c: 'obi', o: 'testpress', h: 'stylus' };          // X剋中多扣 1

  const CFG = {
    playerHp: 10, handSize: 3, bagStart: 7, bagMax: 8, habitP: 0.4, retries: 1, relicMax: 3,
    colorRelicBonus: 1,   // 原版側標／神秘見本盤／黑膠唱針：那色剋中多扣 1
    dustcoverCut: 1,      // 防塵套：每場第一次被剋少扣 1（2 太強：固定公式一晚過 20%，見 sim.mjs）
    cleanerTie: 1,        // 洗碟水：同色同星時你扣他 1
  };

  // ---------- RNG (mulberry32; state lives in the object so clones are deterministic) ----------
  function rng(st) {
    let a = st.rng = (st.rng + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function makeRng(seed) { const o = { rng: seed | 0 }; return () => rng(o); }
  function shuffle(arr, st) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rng(st) * (i + 1)); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }
  const pickOne = (arr, st) => arr[Math.floor(rng(st) * arr.length)];
  function fnv1a32(str) { let h = 0x811c9dc5; str = String(str); for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; }
  const clone = o => JSON.parse(JSON.stringify(o));
  const star = (card, a) => (card && card[a]) | 0;
  const tasteStr = t => Array.isArray(t) ? t.join('') : String(t || 'coh');
  function topAxis(card, taste) { const t = tasteStr(taste); let best = t[0]; for (let k = 1; k < t.length; k++) if (star(card, t[k]) > star(card, best)) best = t[k]; return best; }
  function secondAxis(card, taste) {
    const t = tasteStr(taste), top = topAxis(card, t), rest = t.split('').filter(a => a !== top);
    return star(card, rest[0]) >= star(card, rest[1]) ? rest[0] : rest[1];
  }
  const aceAxis = ace => ace ? (TIER_AXIS[ace.tier] || topAxis(ace, 'coh')) : null;

  // ---------- 三相剋：一手的結算（SPEC-v3 §2.2） ----------
  function clash(pStar, pAttr, eStar, eAttr) {
    if (pAttr === eAttr) {
      const d = pStar - eStar;
      return d > 0 ? { kind: 'mirrorWin', toE: d, toP: 0 } : d < 0 ? { kind: 'mirrorLose', toE: 0, toP: -d } : { kind: 'tie', toE: 0, toP: 0 };
    }
    if (BEATS[pAttr] === eAttr) return { kind: 'counter', toE: pStar, toP: 0 };
    return { kind: 'countered', toE: 0, toP: eStar };
  }

  // ---------- 脾氣（名牌上那一句）：ctx = { top, eCard, pLast, eLast, hand, ace } → 他照脾氣會丟的屬性 ----------
  function handTopAxis(hand, ace) {
    let best = null, bs = -1;
    if (ace) for (const a of ATTRS) if (star(ace, a) > bs) { bs = star(ace, a); best = { i: 'ace', attr: a }; }
    (hand || []).forEach((c, i) => { if (c) for (const a of ATTRS) if (star(c, a) > bs) { bs = star(c, a); best = { i, attr: a }; } });
    return best;
  }
  const HABITS = {
    honest: x => x.top,                                                // 只認排行榜：丟他那張最大的星
    copy:   x => x.pLast || x.top,                                     // 你上一手丟什麼，他就跟著丟
    grudge: x => (x.pLast ? COUNTER_OF[x.pLast] : x.top),              // 專丟剋你上一手的那種
    repeat: x => x.eLast || x.top,                                     // 上一手丟什麼，這手還丟什麼
    rot:    x => (x.eLast ? BEATS[x.eLast] : x.top),                   // 照三角的箭頭輪著丟：冷→經→硬→冷
    bluff:  x => BEATS[x.top],                                         // 亮最大的星嚇你，丟的是剋你的那招
    eye:    x => { const t = handTopAxis(x.hand, x.ace); return t ? COUNTER_OF[t.attr] : x.top; },   // 盯著你手上最大的星，丟剋它的
  };
  function habitAttr(habit, ctx) { return (HABITS[habit] || HABITS.honest)(ctx); }
  function ctxOf(st) {
    const P = st.p, E = st.e;
    return { top: topAxis(E.card, E.taste), eCard: E.card, pLast: P.last, eLast: E.last, hand: P.hand, ace: P.aceUsed ? null : P.ace };
  }
  function habitAttrOf(st) { return st.e.card ? habitAttr(st.e.habit, ctxOf(st)) : null; }
  function isFirst(st) { const k = USES_LAST[st.e.habit]; return !!k && !(k === 'p' ? st.p.last : st.e.last); }

  // ---------- relics ----------
  function relicObj(r, content) {
    if (!r) return null;
    if (typeof r === 'string') { const d = content && content.relics && content.relics[r]; return d ? { id: r, name: d.name, icon: d.icon || r, line: d.desc || d.line || '', note: d.note || '' } : { id: r, name: r, icon: r, line: '', note: '' }; }
    return { id: r.id, name: r.name || r.id, icon: r.icon || r.id, line: r.line || r.desc || '', note: r.note || '' };
  }
  const hasRelic = (st, id) => st.p.relics.some(r => r.id === id);
  const noteOf = (st, id) => { const r = st.p.relics.find(x => x.id === id); return { relic: id, text: (r && r.note) || id }; };

  // the relic-adjusted outcome of one clash (pure unless commit)
  function outcome(st, pAttr, pStar, eAttr, eStar, commit) {
    const r = clash(pStar, pAttr, eStar, eAttr), notes = [];
    if (r.kind === 'counter' && hasRelic(st, COLOR_RELIC[pAttr])) { r.toE += CFG.colorRelicBonus; notes.push(noteOf(st, COLOR_RELIC[pAttr])); }
    if (r.kind === 'countered' && !st.p.dustUsed && hasRelic(st, 'dustcover')) {
      r.toP = Math.max(0, r.toP - CFG.dustcoverCut); notes.push(noteOf(st, 'dustcover'));
      if (commit) st.p.dustUsed = true;
    }
    if (r.kind === 'tie' && hasRelic(st, 'cleaner')) { r.toE += CFG.cleanerTie; notes.push(noteOf(st, 'cleaner')); }
    r.notes = notes;
    return r;
  }

  // ---------- duel creation ----------
  function cardFrom(content, id) { const c = content && content.cards && content.cards[id]; if (!c) throw new Error('engine: missing card ' + id); return c; }
  // enemyDef(content, enemyId, {tutorial}) — content enemy → eDef (deck expanded; tutorial = the scripted man of SPEC-v3 §8)
  function enemyDef(content, id, o) {
    o = o || {};
    const E = content.enemies[id]; if (!E) throw new Error('engine: unknown enemy ' + id);
    const H = content.habits || {}, L = content.habitLabels || {};
    const tut = !!o.tutorial && content.tutorial;
    return {
      id, name: E.name, title: E.title || null, habit: E.habit, phase2: E.phase2 || null,
      p: E.p != null ? E.p : CFG.habitP, hp: tut ? content.tutorial.hp : E.hp, taste: tasteStr(E.taste),
      deck: (tut ? content.tutorial.records : E.deck).map(x => cardFrom(content, x)),
      elite: !!E.elite, boss: !!E.boss,
      habitLabel: E.habitLabel || L.base || '脾氣', habitLine: (H[E.habit] || {}).line || '',
      phase2Label: E.phase2 ? (E.phase2Label || L.switched || '急了') : null, phase2Line: E.phase2 ? (H[E.phase2] || {}).line || '' : null,
    };
  }
  // playerDef(content, {bag:[ids], ace:tier, relics:[ids]}) — a run (or anything shaped like it) → pDef
  function playerDef(content, src) {
    return { hp: CFG.playerHp, bag: (src.bag || []).map(x => cardFrom(content, x)), ace: src.ace ? cardFrom(content, content.aces[src.ace]) : null,
      relics: (src.relics || []).map(r => relicObj(r, content)) };
  }

  function startDuel(pDef, eDef, opts) {
    opts = opts || {};
    const sc = opts.script || null;
    const hp = pDef.hp || CFG.playerHp;
    const st = {
      v: VERSION, rng: (opts.seed >>> 0) || 1, n: 0, over: null,
      p: { hp, max: pDef.maxHp || hp, draw: [], hand: [], disc: [], ace: pDef.ace || null, aceUsed: false,
        relics: (pDef.relics || []).map(r => relicObj(r)).filter(Boolean).slice(0, CFG.relicMax), dustUsed: false, last: null },
      e: { id: eDef.id, name: eDef.name, title: eDef.title || null, elite: !!eDef.elite, boss: !!eDef.boss,
        habit: eDef.habit || 'honest', habit0: eDef.habit || 'honest', phase2: eDef.phase2 || null, switched: false,
        label: eDef.habitLabel || '', line: eDef.habitLine || '', label2: eDef.phase2Label || '', line2: eDef.phase2Line || '',
        p: eDef.p != null ? eDef.p : CFG.habitP, hp: eDef.hp, max: eDef.hp, taste: tasteStr(eDef.taste),
        pile: [], card: null, thrown: [], last: null, deckSize: 0 },
      script: sc && sc.attrs ? { attrs: sc.attrs.slice() } : null,
      intent: null, last: null, log: [],
      stats: { hands: 0, reads: 0, followed: 0, counter: 0, countered: 0, mirror: 0, tie: 0, ace: 0, relicNotes: 0 },
    };
    const P = st.p, E = st.e;
    // your bag → draw pile (script: fixed opening hand + fixed draw order, then the rest shuffled)
    const bag = (pDef.bag || []).slice();
    const takeIds = ids => { const out = []; for (const id of ids || []) { const k = bag.findIndex(c => c && c.id === id); if (k >= 0) out.push(bag.splice(k, 1)[0]); } return out; };
    if (sc && (sc.hand || sc.draw)) { const h = takeIds(sc.hand), d = takeIds(sc.draw); P.draw = h.concat(d, shuffle(bag, st)); }
    else P.draw = shuffle(bag, st);
    // his pile (script: fixed order of the scripted records, the rest shuffled after them)
    let deck = (eDef.deck || []).slice();
    if (opts.enemyAce) deck.push(opts.enemyAce);
    E.deckSize = deck.length;
    if (sc && sc.records) {
      const first = []; for (const id of sc.records) { const k = deck.findIndex(c => c.id === id); if (k >= 0) first.push(deck.splice(k, 1)[0]); }
      E.pile = first.concat(shuffle(deck, st));
    } else E.pile = shuffle(deck, st);
    if (opts.firstRecordId) { const k = E.pile.findIndex(c => c.id === opts.firstRecordId); if (k > 0) E.pile.unshift(E.pile.splice(k, 1)[0]); }
    for (let i = 0; i < CFG.handSize; i++) P.hand.push(pull(st).card);
    const events = [];
    beginHand(st, events);
    return { duel: st, events };
  }

  // one card off your draw pile (reshuffles the discards when it runs out)
  function pull(st) {
    const P = st.p; let reshuffled = false;
    if (!P.draw.length && P.disc.length) { P.draw = shuffle(P.disc, st); P.disc = []; reshuffled = true; }
    return { card: P.draw.length ? P.draw.shift() : null, reshuffled };
  }

  // 開手：他翻出這手的唱片，同時決定要丟哪色（存在 duel.intent，view 不給）
  function beginHand(st, events) {
    const E = st.e, P = st.p;
    st.n++;
    E.card = E.pile.shift();
    const ctx = ctxOf(st);
    const hAttr = habitAttr(E.habit, ctx);
    const roll = rng(st), any = ATTRS[Math.floor(rng(st) * 3)];
    const headphone = st.n === 1 && E.p < 1 && hasRelic(st, 'headphone');
    let how = roll < E.p ? 'habit' : headphone ? 'headphone' : 'any';
    let attr = how === 'any' ? any : hAttr;
    const forced = st.script && st.script.attrs[st.n - 1];
    if (forced) { attr = forced; how = 'script'; }
    const hk = {}; for (const k of HABIT_KEYS) hk[k] = HABITS[k](ctx);   // every habit's answer this hand (learner policy)
    st.intent = { attr, habitAttr: hAttr, how, headphone: headphone && !forced, hk };
    events.push({ t: 'hand', n: st.n, eCard: E.card, pile: E.pile.length, first: isFirst(st) });
  }

  function legalActions(st) {
    if (st.over) return [];
    const out = [];
    st.p.hand.forEach((c, i) => { if (c) for (const a of ATTRS) out.push({ i, attr: a }); });
    if (st.p.ace && !st.p.aceUsed) out.push({ ace: true, attr: aceAxis(st.p.ace) });
    return out;
  }
  function isLegal(st, act) {
    if (!st || st.over || !act) return false;
    if (act.ace) return !!st.p.ace && !st.p.aceUsed && (!act.attr || act.attr === aceAxis(st.p.ace));
    return Number.isInteger(act.i) && act.i >= 0 && act.i < st.p.hand.length && !!st.p.hand[act.i] && ATTRS.includes(act.attr);
  }
  function actCard(st, act) {
    const card = act.ace ? st.p.ace : st.p.hand[act.i], attr = act.ace ? aceAxis(st.p.ace) : act.attr;
    return { card, attr, star: star(card, attr) };
  }

  // 結果預告：他丟各色時的結果（純函式）
  function preview(st, act) {
    if (!isLegal(st, act)) return null;
    const a = actCard(st, act), out = {};
    for (const x of ATTRS) { const r = outcome(st, a.attr, a.star, x, star(st.e.card, x), false); out[x] = { kind: r.kind, toE: r.toE, toP: r.toP, notes: r.notes }; }
    return out;
  }

  function resolveTurn(st, act, opts) {
    opts = opts || {};
    if (!isLegal(st, act)) return [];
    const P = st.p, E = st.e, events = [];
    const a = actCard(st, act);
    const eAttr = ATTRS.includes(opts.forcedAttr) ? opts.forcedAttr : st.intent.attr;
    const eCard = E.card, eStar = star(eCard, eAttr);
    let r = outcome(st, a.attr, a.star, eAttr, eStar, true);
    if (opts.debugOutcome) r = { kind: opts.debugOutcome.kind, toE: opts.debugOutcome.toE | 0, toP: opts.debugOutcome.toP | 0, notes: [] };
    const notes = r.notes.slice();
    if (st.intent.headphone) notes.unshift(noteOf(st, 'headphone'));
    E.hp -= r.toE; P.hp -= r.toP;
    const followed = eAttr === st.intent.habitAttr, read = followed && r.kind === 'counter';
    const S = st.stats;
    S.hands++; if (followed) S.followed++; if (read) S.reads++; if (act.ace) S.ace++; S.relicNotes += notes.length;
    if (r.kind === 'counter') S.counter++; else if (r.kind === 'countered') S.countered++; else if (r.kind === 'tie') S.tie++; else S.mirror++;
    const sum = { n: st.n, pCard: a.card, pAttr: a.attr, pStar: a.star, ace: !!act.ace, eCard, eAttr, eStar, kind: r.kind, toE: r.toE, toP: r.toP, followed, read, notes };
    st.last = sum;
    st.log.push({ n: st.n, pAttr: a.attr, eAttr, kind: r.kind, toE: r.toE, toP: r.toP, followed, read, phase: E.switched ? 1 : 0, hk: st.intent.hk });
    events.push(Object.assign({ t: 'clash' }, sum, { habit: E.habit, pHp: P.hp, eHp: E.hp }));
    P.last = a.attr; E.last = eAttr; E.thrown.push(eCard); E.card = null; st.intent = null;
    if (act.ace) P.aceUsed = true;
    else {
      P.disc.push(P.hand[act.i]);
      const d = pull(st); P.hand[act.i] = d.card;
      events.push({ t: 'draw', i: act.i, card: d.card, reshuffled: d.reshuffled });
    }
    if (P.hp <= 0 || E.hp <= 0) return finish(st, 'hp', events);
    if (!E.pile.length) return finish(st, 'pile', events);
    if (E.phase2 && !E.switched && E.hp <= Math.floor(E.max / 2)) {
      E.switched = true; E.habit = E.phase2;
      events.push({ t: 'switch', habit: E.habit, line: E.line2, label: E.label2 });
    }
    beginHand(st, events);
    return events;
  }
  // 聲望 ≤0 就輸；兩邊同一手都 ≤0 比剩下的（負數也比）；唱片丟完比剩下的；一樣都算你贏
  function finish(st, by, events) {
    const P = st.p, E = st.e;
    let win;
    if (by === 'hp') win = (P.hp <= 0 && E.hp <= 0) ? P.hp >= E.hp : E.hp <= 0;
    else win = P.hp >= E.hp;
    st.over = { win, by };
    events.push({ t: 'over', win, by, pHp: P.hp, eHp: E.hp });
    return events;
  }

  function view(st) {
    const P = st.p, E = st.e;
    const aceLive = P.aceUsed ? null : P.ace;
    return {
      n: st.n, over: st.over ? { win: st.over.win, by: st.over.by } : null,
      pHp: P.hp, pMax: P.max, eHp: E.hp, eMax: E.max, notch: E.phase2 ? Math.floor(E.max / 2) : null,
      eId: E.id, eName: E.name, eTitle: E.title, elite: E.elite, boss: E.boss,
      eCard: E.card, pile: E.pile.length, pileMax: E.deckSize,
      habit: E.habit, habitLine: E.switched ? E.line2 : E.line, habitLabel: E.switched ? E.label2 : E.label, switched: E.switched,
      first: !st.over && isFirst(st),
      hand: P.hand.slice(), ace: aceLive, aceCard: P.ace, aceAxis: aceAxis(P.ace), aceUsed: P.aceUsed,
      last: st.last, eyeTarget: (!st.over && E.habit === 'eye') ? handTopAxis(P.hand, aceLive) : null,
      relics: P.relics.map(r => Object.assign({}, r)), dustUsed: P.dustUsed,
    };
  }

  function bestChip(st, attr, o) {
    let best = null, bs = -1;
    if (o && o.ace && st.p.ace && !st.p.aceUsed && aceAxis(st.p.ace) === attr) { best = { ace: true, attr }; bs = star(st.p.ace, attr); }
    st.p.hand.forEach((c, i) => { if (c && star(c, attr) > bs) { bs = star(c, attr); best = { i, attr }; } });
    return best;
  }

  // ============================================================================================================================
  // 一晚：今晚來客（線性，SPEC-v3 §9）＋ 發燒配件（最多 3 件，被動）
  // ============================================================================================================================
  function nightCfg(content) { const n = content.night || {}; return { times: n.times || ['22:00', '22:40', '23:20', '00:10', '02:00'], normals: n.normals || 3, retry: n.retry != null ? n.retry : CFG.retries }; }
  function newRun(content, o) {
    o = o || {};
    const seedKey = String(o.seedKey || 'lab'), nightNo = o.nightNo || 1;
    const ace = TIERS.includes(o.ace) ? o.ace : 'hall';
    const N = nightCfg(content);
    const run = {
      v: 3, seedKey, nightNo, rng: fnv1a32(seedKey + '#' + nightNo) || 1, ace, bossAce: null,
      bag: [...((content.gifts || {})[ace] || []), ...(content.junk || [])],
      relics: (o.relics || []).filter((id, k, a) => content.relics && content.relics[id] && a.indexOf(id) === k).slice(0, CFG.relicMax),
      order: [], times: N.times.slice(), idx: 0,
      prologue: (o.prologue != null ? !!o.prologue : nightNo === 1) ? 'pending' : null,
      retryLeft: N.retry, pending: null, duel: null, duelEnemy: null, over: null,
      stats: { wins: 0, fights: 0, hands: 0, reads: 0, retries: 0, taken: [], met: [], relicsGot: [], lostAt: null },
    };
    const normals = shuffle((content.normals || []).slice(), run).slice(0, N.normals);
    run.order = normals.concat([pickOne(content.elites || [], run), content.boss || 'boss']).filter(Boolean);
    const others = TIERS.filter(t => t !== ace);
    run.bossAce = others.includes(o.bossAce) ? o.bossAce : pickOne(others, run);
    return run;
  }
  function current(run, content) {
    if (run.duel && run.duelEnemy) return run.duelEnemy;
    if (run.pending && run.pending.enemyId) return run.pending.enemyId;
    return run.prologue === 'pending' ? ((content && content.prologueEnemy) || 'man') : run.order[run.idx];
  }
  function nextStep(run) {
    if (run.pending) return run.pending.type === 'reward' ? 'reward' : 'retry';
    if (run.over) return null;
    if (run.duel) return 'duel';
    return run.prologue === 'pending' ? 'prologue' : 'fight';
  }
  function startFight(run, content, o) {
    o = o || {};
    if (run.duel) return { duel: run.duel, events: [], enemyId: run.duelEnemy || run.duel.e.id, resumed: true };   // a saved fight in progress (or over but not finished)
    if (run.over || run.pending) return null;
    const enemyId = current(run, content);
    if (!enemyId) return null;
    const tut = !!o.tutorial && run.prologue === 'pending' && !!content.tutorial;
    const eDef = enemyDef(content, enemyId, { tutorial: tut });
    const opts = { seed: (Math.floor(rng(run) * 4294967296) >>> 0) || 1 };
    if (eDef.boss && run.bossAce) opts.enemyAce = cardFrom(content, content.aces[run.bossAce]);
    if (tut) opts.script = content.tutorial.script[run.ace];
    if (o.firstRecordId) opts.firstRecordId = o.firstRecordId;
    const r = startDuel(playerDef(content, run), eDef, opts);
    run.duel = r.duel; run.duelEnemy = enemyId;
    return { duel: r.duel, events: r.events, enemyId };
  }
  const uniq = a => a.filter((x, k) => a.indexOf(x) === k);
  function finishFight(run, content, duel) {
    duel = duel || run.duel;
    if (!duel || !duel.over) return { error: 'notOver' };
    const enemyId = run.duelEnemy || duel.e.id;
    const E = content.enemies[enemyId] || {};
    const S = run.stats, win = duel.over.win;
    const prologue = run.prologue === 'pending' && enemyId === (content.prologueEnemy || 'man');
    S.fights++; S.hands += duel.stats.hands; S.reads += duel.stats.reads;
    const met = uniq(duel.e.thrown.map(c => c.id));
    for (const id of met) if (!S.met.includes(id)) S.met.push(id);
    run.duel = null; run.duelEnemy = null;
    if (win) {
      S.wins++;
      if (prologue) {
        run.prologue = 'done';
        const cards = (E.drop ? [E.drop] : []).filter(id => !run.bag.includes(id) && content.cards[id]);
        const relics = (((content.rewards || {}).prologueRelics) || []).filter(id => !run.relics.includes(id));
        run.pending = { type: 'reward', enemyId, prologue: true, cards, relics, need: 'cardThenRelic', cardDone: !cards.length, relicDone: !relics.length };
      } else {
        const cards = met.filter(id => content.cards[id] && !content.cards[id].tier && !run.bag.includes(id));
        let relics = [];
        if (E.elite || E.boss) {
          const pool = (((content.rewards || {}).relicPool) || Object.keys(content.relics || {})).filter(id => !run.relics.includes(id));
          if (pool.length) relics = [pickOne(pool, run)];
        }
        if (E.boss) run.over = 'clear';
        run.pending = { type: 'reward', enemyId, prologue: false, cards, relics, need: relics.length ? 'cardOrRelic' : 'card', cardDone: !cards.length, relicDone: !relics.length };
      }
      settle(run);
    } else if (prologue) {
      run.pending = { type: 'retry', enemyId, free: true };
    } else if (run.retryLeft > 0) {
      run.pending = { type: 'retry', enemyId, free: false };
    } else {
      run.over = 'dead';
      S.lostAt = { enemyId, idx: run.idx, time: run.times[run.idx] || null, n: duel.n, last: duel.last };
    }
    return { win, by: duel.over.by, enemyId, met, offer: run.pending, over: run.over };
  }
  function advance(run, p) {
    run.pending = null;
    if (p && p.prologue) return;
    run.idx++;
    if (run.idx >= run.order.length) run.over = 'clear';
  }
  function settle(run) { const p = run.pending; if (p && p.type === 'reward' && p.cardDone && p.relicDone) advance(run, p); }
  function choose(run, content, ch) {
    const effects = [];
    const fail = error => ({ ok: false, error, effects: [] });
    const p = run.pending;
    if (!ch || !ch.type) return fail('badChoice');
    const rew = p && p.type === 'reward' ? p : null;
    switch (ch.type) {
      case 'take': {
        if (!rew || rew.cardDone) return fail('noCardOffer');
        if (!rew.cards.includes(ch.cardId)) return fail('notOffered');
        if (run.bag.includes(ch.cardId)) return fail('owned');
        if (run.bag.length >= CFG.bagMax) {
          if (!ch.dropId || !run.bag.includes(ch.dropId)) return fail('bagFull');
          run.bag.splice(run.bag.indexOf(ch.dropId), 1); effects.push({ loseCard: ch.dropId });
        }
        run.bag.push(ch.cardId); run.stats.taken.push(ch.cardId); effects.push({ gainCard: ch.cardId });
        rew.cardDone = true; if (rew.need === 'cardOrRelic') rew.relicDone = true;
        settle(run); return { ok: true, effects };
      }
      case 'relic': {
        if (!rew || rew.relicDone) return fail('noRelicOffer');
        if (!rew.relics.includes(ch.relicId)) return fail('notOffered');
        if (run.relics.includes(ch.relicId)) return fail('owned');
        if (run.relics.length >= CFG.relicMax) {
          if (!ch.dropRelicId || !run.relics.includes(ch.dropRelicId)) return fail('relicsFull');
          run.relics.splice(run.relics.indexOf(ch.dropRelicId), 1); effects.push({ loseRelic: ch.dropRelicId });
        }
        run.relics.push(ch.relicId); run.stats.relicsGot.push(ch.relicId); effects.push({ gainRelic: ch.relicId });
        rew.relicDone = true; if (rew.need === 'cardOrRelic') rew.cardDone = true;
        settle(run); return { ok: true, effects };
      }
      case 'skip': {
        if (!rew) return fail('nothingToSkip');
        if (rew.need === 'cardOrRelic' || rew.need === 'card') { rew.cardDone = true; rew.relicDone = true; }
        else if (!rew.cardDone) rew.cardDone = true; else rew.relicDone = true;
        effects.push({ skip: true });
        settle(run); return { ok: true, effects };
      }
      case 'retry': {
        if (!p || p.type !== 'retry') return fail('noRetry');
        if (!p.free) run.retryLeft--;
        run.stats.retries++; run.pending = null; effects.push({ retry: p.enemyId, free: !!p.free });
        return { ok: true, effects };
      }
      case 'end': {
        if (!p || p.type !== 'retry') return fail('noRetry');
        run.pending = null; run.over = 'dead';
        run.stats.lostAt = { enemyId: p.enemyId, idx: run.idx, time: run.times[run.idx] || null };
        effects.push({ end: true });
        return { ok: true, effects };
      }
    }
    return fail('badChoice');
  }

  // a reasonable player's choice for whatever the run waits on (sim, __lab autoplay)
  const power = c => star(c, 'c') + star(c, 'o') + star(c, 'h');
  const peak = c => Math.max(star(c, 'c'), star(c, 'o'), star(c, 'h'));
  function runPolicy(run, content, o) {
    o = o || {};
    const preferRelic = o.preferRelic !== false;
    const p = run.pending;
    if (!p) return null;
    if (p.type === 'retry') return { type: 'retry' };
    const cardOf = id => content.cards[id];
    const pickRelic = () => {
      const left = p.relics.filter(id => !run.relics.includes(id));
      if (!left.length || run.relics.length >= CFG.relicMax) return null;
      return { type: 'relic', relicId: p.prologue ? left[fnv1a32(run.seedKey + '#relic#' + run.nightNo) % left.length] : left[0] };
    };
    if (p.need === 'cardOrRelic' && preferRelic) { const r = pickRelic(); if (r) return r; }
    if (!p.cardDone) {
      const best = p.cards.slice().sort((a, b) => peak(cardOf(b)) - peak(cardOf(a)) || power(cardOf(b)) - power(cardOf(a)))[0];
      if (!best) return { type: 'skip' };
      if (run.bag.length < CFG.bagMax) return { type: 'take', cardId: best };
      const weakest = run.bag.slice().sort((a, b) => power(cardOf(a)) - power(cardOf(b)) || peak(cardOf(a)) - peak(cardOf(b)))[0];
      if (power(cardOf(weakest)) >= power(cardOf(best))) return { type: 'skip' };
      return { type: 'take', cardId: best, dropId: weakest };
    }
    if (!p.relicDone) return pickRelic() || { type: 'skip' };
    return { type: 'skip' };
  }

  // ============================================================================================================================
  // 玩家策略（SPEC-v3 §12，移植自 v3/final/sim.js）：policies[name](duel, rngFn?, mem?) -> act
  // ============================================================================================================================
  function pview(st) {
    const P = st.p, E = st.e, opts = [];
    P.hand.forEach((c, i) => { if (c) for (const a of ATTRS) opts.push({ card: c, i, attr: a, ace: false }); });
    if (P.ace && !P.aceUsed) opts.push({ card: P.ace, i: -1, attr: aceAxis(P.ace), ace: true });
    const ctx = ctxOf(st);
    return { opts, eCard: E.card, top: ctx.top, second: secondAxis(E.card, E.taste), pLast: P.last, eLast: E.last, pHp: P.hp, eHp: E.hp,
      ctx, habit: E.habit, p: E.p, eAttrTrue: st.intent ? st.intent.attr : null };
  }
  const toAct = o => (o ? (o.ace ? { ace: true } : { i: o.i, attr: o.attr }) : null);
  function bestFor(v, attr) { let best = null; for (const o of v.opts) { if (o.attr !== attr) continue; if (!best || o.card[attr] > best.card[attr]) best = o; } return best || v.opts[0]; }
  function evPick(v, dist, aceCost) {
    let best = null, bestScore = -1e9;
    for (const o of v.opts) {
      let s = 0;
      for (const ea of ATTRS) {
        const pr = dist[ea]; if (!pr) continue;
        const r = clash(o.card[o.attr], o.attr, v.eCard[ea], ea);
        let val = r.toE - r.toP;
        if (r.toE >= v.eHp) val += 20;
        if (r.toP >= v.pHp) val -= 20;
        s += pr * val;
      }
      if (o.ace) s -= aceCost;
      s -= 0.01 * power(o.card);
      if (s > bestScore) { bestScore = s; best = o; }
    }
    return best;
  }
  function habitDist(v, post, pHat, hk) {
    const dist = { c: 0, o: 0, h: 0 };
    for (const k of HABIT_KEYS) { const w = post[k]; if (!w) continue; dist[hk[k]] += w * pHat; for (const a of ATTRS) dist[a] += w * (1 - pHat) / 3; }
    return dist;
  }
  const fallbackR = st => makeRng((st.rng ^ 0x9e3779b9) + st.n);
  const P_HAT = 0.7;
  const policyFns = {
    random: (st, R) => { R = R || fallbackR(st); const os = pview(st).opts; return toAct(os[Math.floor(R() * os.length)]); },
    strongest: st => { let b = null; for (const o of pview(st).opts) if (!b || o.card[o.attr] > b.card[b.attr]) b = o; return toAct(b); },
    counterTop: st => { const v = pview(st); return toAct(bestFor(v, COUNTER_OF[v.top])); },
    mirrorTop: st => { const v = pview(st); return toAct(bestFor(v, v.top)); },
    counterLast: st => { const v = pview(st); return toAct(bestFor(v, COUNTER_OF[v.eLast || v.top])); },
    dodgeMine: st => { const v = pview(st); return toAct(bestFor(v, COUNTER_OF[v.pLast || COUNTER_OF[v.top]])); },
    beatMine: st => { const v = pview(st); return toAct(bestFor(v, v.pLast ? BEATS[v.pLast] : COUNTER_OF[v.top])); },
    mirrorLast: st => { const v = pview(st); return toAct(bestFor(v, v.eLast || v.top)); },
    beatLast: st => { const v = pview(st); return toAct(bestFor(v, v.eLast ? BEATS[v.eLast] : COUNTER_OF[v.top])); },
    counterSecond: st => { const v = pview(st); return toAct(bestFor(v, COUNTER_OF[v.second])); },
    // 照名牌剋：讀名牌算出他這手的顏色，在剋它的那色挑最大顆（王牌合用就丟）
    novice: st => { const v = pview(st); return toAct(bestFor(v, COUNTER_OF[habitAttr(v.habit, v.ctx)])); },
    // 粗心新手：照名牌，但每四手隨便丟一色
    sloppy: (st, R) => { R = R || fallbackR(st); const v = pview(st); const a = R() < 0.25 ? ATTRS[Math.floor(R() * 3)] : COUNTER_OF[habitAttr(v.habit, v.ctx)]; return toAct(bestFor(v, a)); },
    // 不看名牌、邊打邊猜：七種脾氣做機率更新（只用急了之後的手），挑期望值最高的
    learner: st => {
      const v = pview(st), post = {}; let z = 0;
      for (const k of HABIT_KEYS) post[k] = 1 / HABIT_KEYS.length;
      const phase = st.e.switched ? 1 : 0;
      for (const h of st.log) {
        if (h.phase !== phase || !h.hk) continue;
        z = 0; for (const k of HABIT_KEYS) { post[k] *= (h.hk[k] === h.eAttr ? P_HAT : 0) + (1 - P_HAT) / 3 + 0.02; z += post[k]; }
        for (const k of HABIT_KEYS) post[k] /= z;
      }
      return toAct(evPick(v, habitDist(v, post, P_HAT, st.intent ? st.intent.hk : null || {}), 1));
    },
    // 老手：照名牌＋看他的星算期望值（會避險、會留王牌）
    veteran: st => {
      const v = pview(st), d = { c: 0, o: 0, h: 0 }, h = habitAttr(v.habit, v.ctx);
      for (const a of ATTRS) d[a] = (1 - v.p) / 3; d[h] += v.p;
      return toAct(evPick(v, d, 1));
    },
    // 先知：知道他這手丟哪色
    oracle: st => { const v = pview(st), d = { c: 0, o: 0, h: 0 }; d[v.eAttrTrue || v.top] = 1; return toAct(evPick(v, d, 0.5)); },
  };
  policyFns.reader = policyFns.novice;
  // learner needs the hand's habit answers; fall back to recomputing when the intent is gone (shouldn't happen mid-hand)
  const _learner = policyFns.learner;
  policyFns.learner = (st, R, mem) => {
    if (!st.intent || !st.intent.hk) { const ctx = ctxOf(st); const hk = {}; for (const k of HABIT_KEYS) hk[k] = HABITS[k](ctx); st = Object.assign({}, st, { intent: Object.assign({}, st.intent || {}, { hk }) }); }
    return _learner(st, R, mem);
  };
  const policies = policyFns;
  const FORMULAS = ['strongest', 'counterTop', 'mirrorTop', 'counterLast', 'dodgeMine', 'beatMine', 'mirrorLast', 'beatLast', 'counterSecond'];

  return { VERSION, ATTRS, ZH, ZH1, BEATS, COUNTER_OF, beats, TIERS, TIER_AXIS, HABIT_KEYS, USES_LAST, COLOR_RELIC, CFG, FORMULAS,
    rng, makeRng, shuffle, fnv1a32, clone, star, topAxis, secondAxis, aceAxis, handTopAxis, clash, habitAttr, habitAttrOf, bestChip, relicObj,
    enemyDef, playerDef, startDuel, beginHand, legalActions, isLegal, preview, resolveTurn, view,
    newRun, current, nextStep, startFight, finishFight, choose, runPolicy,
    policies };
});
