// game-lab/engine.js — 品味對決 v4 pure rules engine (Agent A1).  SPEC-v4 §2.1（契約一字照做）、§2.2（content 由參數傳入）。
// No DOM, no Math.random, no Date. Every state object is plain JSON (save it as is); RNG = mulberry32 with its integer state in `.rng`.
// Browser: window.DipLabEngine ; Node: module.exports.  Content (content.js) is always passed in, never required.
//
// ============================================================================================================================
// API (VERSION 'lab-4'；run.v === 4)
// ----------------------------------------------------------------------------------------------------------------------------
// Constants  ATTRS ['c','o','h'] · ZH {c:'經典',o:'冷門',h:'硬蕊'} · ZH1 {c:'經',o:'冷',h:'硬'} · TIERS · TIER_AXIS · COLOR_RELIC
//            BEATS {o:'c',c:'h',h:'o'} (x beats BEATS[x]) · COUNTER_OF {c:'o',o:'h',h:'c'} (the attr that beats x) · beats(x,y)
//            CFG {playerHp 10, handSize 3, enemyHand 3, bagMax 8, retries 1, relicMax 3, threshold 2, maxRounds 6, aceStar 7,
//                 colorRelicBonus 1, dustcoverCut 1, cleanerTie 1, boostStar 1, bargainPick 3, mercy true}  (sim --set k=v 改這裡)
// Cards      topAttr(card) 峰值軸，並列 c→o→h · peak(card) max(c,o,h) · deckMain(cards, taste) 牌單主屬性（並列峰值各算一票，票數並列照 taste）
// Clash      clash(p, e, {threshold}) p/e = {attr, star, ace} -> {kind, toE, toP, blocked: null|'gap'|'ace', by: 'p'|'e'|null}
//              kind ∈ counter|countered|mirrorWin|mirrorLose|tie（mirror＝比星分出勝負，含「剋不動改比星」）
//              （v3 墊片：clash(pStar, pAttr, eStar, eAttr) 也收，第二波 B2 改掉 ui.js 的舊呼叫後可刪）
// Duel       enemyDef(content, id, {tutorial, depth, planner?}) -> eDef · playerDef(content, {bag, ace, relics}) -> pDef
//            startDuel(pDef, eDef, {seed, enemyAce?, script?, hintTable?}) -> {duel, events}
//            legalActions(duel) · isLegal(duel, act)          act = {i:0..2, attr} | {ace:true}
//            preview(duel, act, eSide) -> {kind,toE,toP,blocked,by,notes}   eSide = {i, attr}（他手牌第 i 張）| {attr, star, ace}（假設值）
//            resolveTurn(duel, act, {forcedPlay?:{i,attr}, debugOutcome?:{kind,toE,toP}}) -> Event[]   (illegal act → [] and nothing changes)
//            view(duel) -> 公開資訊（§2.1.5；不含他這手出哪張、哪色、有沒有唬人）
//            bestChip(duel, attr, {ace}) · blockedChoice(duel, attr) -> {i, attr} | null（用 attr 出會被 'gap' 擋下的那張；教學第 5 手）
//            Events {t:'hand', n, hint:{attr, line}, eHandN, pile}
//                   {t:'clash', n, pCard, pAttr, pStar, pBase, ace, eCard, eAttr, eStar, eAce, kind, toE, toP, blocked, by, hint, bluff, notes, pHp, eHp}
//                   {t:'draw', i, card, reshuffled}     {t:'over', win, by:'hp'|'rounds'|'pile', pHp, eHp}
//            order per resolve: clash → draw (not after the ace) → over | hand
// Night      newRun(content, {seedKey, nightNo, ace, prologue?, relics?, bossAce?}) -> run    nextStep(run) · current(run, content)
//            startFight(run, content, {tutorial?}) -> {duel, events, enemyId}   (run.duel already there → {…, events:[], resumed:true})
//            finishFight(run, content, duel?) -> {win, by, enemyId, met:[ids], offer, over, earn}
//            choose(run, content, ch) -> {ok, effects} | {ok:false, error}
//              ch: take／relic／skip／retry／end（v3）＋ bargainPick／buy／buyBargain／buyRelic（§2.1.6；錯的選擇完全不改 run）
//            canShop(run) · canBargainPick(run) · priceOf(content, card) · relicPrice(content, id) · sellValue(content, card|relicId)
//            runPolicy(run, content, {preferRelic}) · shopPolicy(run, content, 'none'|'smart') -> [ch] · bargainPolicy(run, content) -> ch
// Policies   policies[name](duel, R, mem, content) -> act：random, high, counterHint, formula, mirrorHint, thoughtful, oracle, novice(=counterHint)
//            只有 oracle 讀 duel.plan／e.hand／e.pile；其他只看 view(duel)＋content
// ============================================================================================================================
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DipLabEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const VERSION = 'lab-4';
  const RUN_V = 4;
  const ATTRS = ['c', 'o', 'h'];
  const ZH = { c: '經典', o: '冷門', h: '硬蕊' };
  const ZH1 = { c: '經', o: '冷', h: '硬' };
  const BEATS = { o: 'c', c: 'h', h: 'o' };          // 冷剋經、經剋硬、硬剋冷：x beats BEATS[x]
  const COUNTER_OF = { c: 'o', o: 'h', h: 'c' };     // COUNTER_OF[x] = the attribute that beats x
  const beats = (x, y) => !!x && !!y && BEATS[x] === y;
  const TIERS = ['hall', 'pearl', 'heresy'];
  const TIER_AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };
  const COLOR_RELIC = { c: 'obi', o: 'testpress', h: 'stylus' };          // X剋中多扣 1

  const CFG = {
    playerHp: 10, handSize: 3, enemyHand: 3, bagMax: 8, retries: 1, relicMax: 3,
    threshold: 2,        // D §5 規則 4：被剋方星數 − 剋方星數 ≥ 2 → 剋不動，改比星
    maxRounds: 6,        // D §5 規則 6：第 6 手結算完還沒人倒 → 比聲望，平手算你贏
    aceStar: 7,
    colorRelicBonus: 1,  // 原版側標／神秘見本盤／黑膠唱針：那色剋中多扣 1
    dustcoverCut: 1,     // 防塵套：每場第一次被剋少扣 1
    cleanerTie: 1,       // 洗碟水：tie 時你扣他 1
    boostStar: 1,        // 重量盤／絕版編號標／內圈刻字：那色出招時 +1 星（王牌不加）
    bargainPick: 3,      // 每晚開局特價箱挑 3 張（序章與再來一夜都一樣）
    mercy: true,         // 原版 aiPlan 的 mercyLevel（你落後時他出招變鈍，roguelike.html:3618-3624）；sim 可 --set mercy=false 對照
  };
  // content 沒給時的預設（＝content.js 的 C.honesty／C.planners／C.plannerByDepth／C.economy；直接呼叫 startDuel 的地方不傳 content 也不會壞）
  const HONESTY = { honest: { zh: '老實', q: 1 }, sometimes: { zh: '偶爾唬人', q: 0.8 }, often: { zh: '愛唬人', q: 0.7 }, veteran: { zh: '老江湖', q: 0.6 } };
  const PLANNERS = { easy: { w: 0.45, nz: 2.4, mercy: false }, normal: { w: 0.6, nz: 1.4, mercy: true }, hard: { w: 0.7, nz: 0.8, mercy: true } };
  const PLANNER_BY_DEPTH = ['easy', 'easy', 'normal', 'normal', 'hard'];
  const DEFAULT_HINTS = { c: ['c1', 'c2', 'c3', 'c4', 'c5'], o: ['o1', 'o2', 'o3', 'o4', 'o5'], h: ['h1', 'h2', 'h3', 'h4', 'h5'] };
  const ECON = { start: 0, win: { prologue: 0, normal: 300, elite: 500, boss: 0 }, price: { 1: 100, 2: 100, 3: 200, 4: 400, 5: 800 },
    sellRate: 0.5, bargainPrice: 100, stock: [4, 6], relicStock: [2, 3] };

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
  const power = c => star(c, 'c') + star(c, 'o') + star(c, 'h');
  function tasteStr(t) { let s = Array.isArray(t) ? t.join('') : String(t || ''); s = s.split('').filter((x, k, a) => ATTRS.includes(x) && a.indexOf(x) === k).join(''); for (const a of ATTRS) if (!s.includes(a)) s += a; return s; }

  // ---------- 卡片 ----------
  function topAttr(card) { let b = 'c'; for (const a of ['o', 'h']) if (star(card, a) > star(card, b)) b = a; return b; }
  function peak(card) { return Math.max(star(card, 'c'), star(card, 'o'), star(card, 'h')); }
  // 牌單主屬性：每張卡的峰值軸算一票（並列的每一軸都算一票）；票數最多的那軸，並列照 taste
  function deckMain(cards, taste) {
    const t = tasteStr(taste), votes = { c: 0, o: 0, h: 0 };
    for (const c of cards || []) { if (!c) continue; const p = peak(c); for (const a of ATTRS) if (star(c, a) === p) votes[a]++; }
    let best = t[0];
    for (const a of t) if (votes[a] > votes[best]) best = a;
    return best;
  }
  const aceAxis = ace => ace ? (TIER_AXIS[ace.tier] || topAttr(ace)) : null;
  const isAce = c => !!(c && c.tier);
  const isAcePlay = (c, a) => isAce(c) && aceAxis(c) === a;                 // 王牌只在自己那軸算王牌
  const eStarOf = (c, a) => isAcePlay(c, a) ? CFG.aceStar : star(c, a);

  // ---------- 三相剋＋門檻：一手的結算（§2.1.3） ----------
  function clash(p, e, opts) {
    if (typeof p === 'number') { const x = arguments; return clash({ star: x[0], attr: x[1] }, { star: x[2], attr: x[3] }); }   // v3 墊片（ui.js 舊規則卡例子）
    const N = opts && opts.threshold != null ? opts.threshold : CFG.threshold;
    const ps = p.star | 0, es = e.star | 0;
    const cmp = (blocked, by) => {
      const d = ps - es;
      if (d > 0) return { kind: 'mirrorWin', toE: d, toP: 0, blocked, by };
      if (d < 0) return { kind: 'mirrorLose', toE: 0, toP: -d, blocked, by };
      return { kind: 'tie', toE: 0, toP: 0, blocked, by };
    };
    if (p.attr === e.attr) return cmp(null, null);
    if (BEATS[p.attr] === e.attr) {                       // 你剋他
      if (e.ace) return cmp('ace', 'p');
      if (es - ps >= N) return cmp('gap', 'p');
      return { kind: 'counter', toE: ps, toP: 0, blocked: null, by: 'p' };
    }
    if (p.ace) return cmp('ace', 'e');                    // 他剋你
    if (ps - es >= N) return cmp('gap', 'e');
    return { kind: 'countered', toE: 0, toP: es, blocked: null, by: 'e' };
  }

  // ---------- relics ----------
  function relicObj(r, content) {
    if (!r) return null;
    const id = typeof r === 'string' ? r : r.id;
    if (!id) return null;
    const d = typeof r === 'string' ? ((content && content.relics && content.relics[r]) || {}) : r;
    const o = { id, name: d.name || id, icon: d.icon || id, line: d.line || d.desc || '', note: d.note || '' };
    if (d.boost) o.boost = d.boost;
    if (d.v4 != null) o.v4 = !!d.v4;
    return o;
  }
  const hasRelic = (st, id) => st.p.relics.some(r => r.id === id);
  const noteOf = (st, id) => { const r = st.p.relics.find(x => x.id === id); return { relic: id, text: (r && r.note) || id }; };
  // 監聽耳機：v4 新效果（第一手他不唬人）只在 relic.v4 打開時生效（〔補〕⚠規則，預設不上架）
  const headphoneOn = st => st.p.relics.some(r => r.id === 'headphone' && r.v4 === true);

  // 加成與配件（§2.1.3 outcome）。pPlay/ePlay = {attr, star, ace}。純函式，除非 commit（只會改 dustUsed）
  function outcome(st, pPlay, ePlay, commit) {
    const notes = [];
    let ps = pPlay.star | 0;
    const boost = 'boost_' + pPlay.attr;
    if (!pPlay.ace && hasRelic(st, boost)) { ps += CFG.boostStar; notes.push(noteOf(st, boost)); }
    const r = clash({ attr: pPlay.attr, star: ps, ace: !!pPlay.ace }, { attr: ePlay.attr, star: ePlay.star | 0, ace: !!ePlay.ace });
    if (r.kind === 'counter' && hasRelic(st, COLOR_RELIC[pPlay.attr])) { r.toE += CFG.colorRelicBonus; notes.push(noteOf(st, COLOR_RELIC[pPlay.attr])); }
    if (r.kind === 'countered' && !st.p.dustUsed && hasRelic(st, 'dustcover')) {
      r.toP = Math.max(0, r.toP - CFG.dustcoverCut); notes.push(noteOf(st, 'dustcover'));
      if (commit) st.p.dustUsed = true;
    }
    if (r.kind === 'tie' && hasRelic(st, 'cleaner')) { r.toE += CFG.cleanerTie; notes.push(noteOf(st, 'cleaner')); }
    r.notes = notes; r.pStar = ps;
    return r;
  }

  // ---------- duel creation ----------
  function cardFrom(content, id) { const c = content && content.cards && content.cards[id]; if (!c) throw new Error('engine: missing card ' + id); return c; }
  function hintTableOf(content) {
    const H = content && content.hints;
    if (!H || !ATTRS.every(a => Array.isArray(H[a]) && H[a].length)) return null;
    const t = {}; for (const a of ATTRS) t[a] = H[a].map(h => (h && typeof h === 'object') ? h.id : h).filter(Boolean);
    return t;
  }
  // enemyDef(content, id, {tutorial, depth, planner}) — content enemy → eDef（§2.1.4）
  //   planner：序章男子＝easy；其他＝C.plannerByDepth[depth]（depth＝run.idx）；沒給 depth 時藏家 hard、其他 normal
  function enemyDef(content, id, o) {
    o = o || {};
    const E = content.enemies[id]; if (!E) throw new Error('engine: unknown enemy ' + id);
    const T = content.tutorial, tut = !!o.tutorial && !!T;
    const HT = content.honesty || HONESTY;
    const hk = HT[E.honesty] ? E.honesty : (E.prologue ? 'honest' : 'sometimes');
    const H = HT[hk] || HONESTY[hk];
    let planner = o.planner;
    if (!planner) {
      const byD = content.plannerByDepth || PLANNER_BY_DEPTH;
      if (E.prologue) planner = 'easy';
      else if (Number.isInteger(o.depth) && byD[o.depth]) planner = byD[o.depth];
      else planner = E.boss ? 'hard' : 'normal';
    }
    const PL = content.planners || PLANNERS;
    const co = PL[planner] || PLANNERS[planner] || PLANNERS.normal;
    return {
      id, name: E.name, title: E.title || null, hp: tut ? T.hp : E.hp, taste: tasteStr(E.taste),
      deck: (E.deck || []).map(x => cardFrom(content, x)),
      honesty: hk, honestyZh: H.zh, q: H.q, planner, coef: { w: co.w, nz: co.nz, mercy: !!co.mercy },
      elite: !!E.elite, boss: !!E.boss,
    };
  }
  // playerDef(content, {bag:[ids], ace:tier, relics:[ids]}) — a run (or anything shaped like it) → pDef
  function playerDef(content, src) {
    return { hp: CFG.playerHp, bag: (src.bag || []).map(x => cardFrom(content, x)), ace: src.ace ? cardFrom(content, content.aces[src.ace]) : null,
      relics: (src.relics || []).map(r => relicObj(r, content)).filter(Boolean) };
  }
  function normScript(sc) {
    if (!sc || !Array.isArray(sc.plays)) return null;
    return { plays: sc.plays.map(p => ({ id: p.id, attr: p.attr })), hints: (sc.hints || []).slice(), hand: (sc.hand || []).slice(), draw: (sc.draw || []).slice() };
  }

  function startDuel(pDef, eDef, opts) {
    opts = opts || {};
    const sc = normScript(opts.script);
    const hp = pDef.hp || CFG.playerHp;
    const hk = HONESTY[eDef.honesty] ? eDef.honesty : 'honest';
    const co = eDef.coef || PLANNERS[eDef.planner] || PLANNERS.normal;
    const st = {
      v: VERSION, rng: (opts.seed >>> 0) || 1, n: 0, over: null,
      p: { hp, max: pDef.maxHp || hp, draw: [], hand: [], disc: [], ace: pDef.ace || null, aceUsed: false,
        relics: (pDef.relics || []).map(r => relicObj(r)).filter(Boolean).slice(0, CFG.relicMax), dustUsed: false, last: null },
      e: { id: eDef.id, name: eDef.name, title: eDef.title || null, elite: !!eDef.elite, boss: !!eDef.boss,
        honesty: hk, honestyZh: eDef.honestyZh || HONESTY[hk].zh, q: eDef.q != null ? +eDef.q : HONESTY[hk].q,
        planner: eDef.planner || 'normal', coef: { w: co.w, nz: co.nz, mercy: !!co.mercy }, taste: tasteStr(eDef.taste),
        hp: eDef.hp, max: eDef.hp, deckIds: [], pile: [], hand: [], thrown: [], last: null, deckSize: 0 },
      hintTable: opts.hintTable && ATTRS.every(a => Array.isArray(opts.hintTable[a]) && opts.hintTable[a].length) ? clone(opts.hintTable) : clone(DEFAULT_HINTS),
      script: sc, plan: null, last: null, log: [],
      stats: { hands: 0, counter: 0, countered: 0, mirror: 0, tie: 0, blocked: 0, blockedYou: 0, bluffs: 0, honest: 0, caught: 0, ace: 0, relicNotes: 0 },
    };
    const P = st.p, E = st.e;
    // 你的牌堆：script 的起手＋抽牌在前，剩下的照包包順序（有 script 不洗；教學第 5 手要抽到特價箱那幾張）；沒 script 整包洗
    const bag = (pDef.bag || []).filter(Boolean).slice();
    const takeIds = ids => { const out = []; for (const id of ids || []) { const k = bag.findIndex(c => c.id === id); if (k >= 0) out.push(bag.splice(k, 1)[0]); } return out; };
    if (sc) { const h = takeIds(sc.hand), d = takeIds(sc.draw); P.draw = h.concat(d, bag); }
    else P.draw = shuffle(bag, st);
    // 他的牌堆：牌單＋（藏家）你沒選的王牌；洗牌、不洗回（script：照 plays 的順序，其餘照牌單順序接在後面）
    const deck = (eDef.deck || []).slice();
    if (opts.enemyAce) deck.push(opts.enemyAce);
    E.deckSize = deck.length; E.deckIds = deck.map(c => c.id);
    if (sc) {
      const first = []; for (const pl of sc.plays) { const k = deck.findIndex(c => c.id === pl.id); if (k >= 0) first.push(deck.splice(k, 1)[0]); }
      E.pile = first.concat(deck);
    } else E.pile = shuffle(deck, st);
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

  // 手牌裡 a 軸星最大的那張（同星取三軸總和大的，再同取前面）；王牌只算在自己那一軸；noAce＝王牌不算
  function bestIdx(hand, a, noAce) {
    let bi = -1, bs = -1, bp = -1;
    for (let i = 0; i < hand.length; i++) {
      const c = hand[i]; if (!c) continue;
      if (isAce(c) && (noAce || aceAxis(c) !== a)) continue;
      const s = eStarOf(c, a), p = power(c);
      if (s > bs || (s === bs && p > bp)) { bi = i; bs = s; bp = p; }
    }
    return bi;
  }
  // 原版 mercyLevel（roguelike.html:3618-3624）：你落後越多，他出招越鈍
  function mercyOf(st) {
    const P = st.p, E = st.e;
    const pR = Math.max(0, P.hp) / (P.max || 1), eR = Math.max(0, E.hp) / (E.max || 1);
    let m = Math.max(0, eR - pR) * 1.3;
    if (P.hp <= 3) m += 0.35;
    return Math.min(1, m);
  }

  // 開手（§2.1.4）：他補牌 → 計畫屬性（原版 aiPlan 去掉相生／氣勢）→ 提示句 → 照實或唬人 → 出哪張。
  // RNG 每手固定 8 次（計畫 6＋提示 1＋照實 1），script／王牌／耳機都照取，讓 RNG 流不分支。
  function beginHand(st, events) {
    const E = st.e, P = st.p;
    st.n++;
    while (E.hand.length < CFG.enemyHand && E.pile.length) E.hand.push(E.pile.shift());
    const best = {}; for (const a of ATTRS) best[a] = bestIdx(E.hand, a, false);
    const co = E.coef || PLANNERS.normal, m = mercyOf(st), useMercy = !!co.mercy && !!CFG.mercy;
    let plan = null, ps = -Infinity;
    for (const a of ATTRS) {
      const u1 = rng(st), u2 = rng(st);
      if (best[a] < 0) continue;
      const s = co.w * eStarOf(E.hand[best[a]], a) + u1 * co.nz + (useMercy ? u2 * 5 * m : 0);
      if (plan === null || s > ps) { plan = a; ps = s; }
    }
    const uLine = rng(st), r = rng(st);
    const sc = st.script, sp = sc && sc.plays[st.n - 1];
    let idx = -1, attr, why;
    if (sp) {
      plan = sp.attr; attr = sp.attr; why = 'script';
      idx = E.hand.findIndex(c => c && c.id === sp.id);
      if (idx < 0) idx = bestIdx(E.hand, attr, true);
    } else if (plan !== null && isAce(E.hand[best[plan]])) {
      attr = plan; why = 'ace'; idx = best[plan];
    } else if (st.n === 1 && headphoneOn(st)) {
      attr = plan; why = 'headphone';
    } else if (r < E.q) {
      attr = plan; why = 'honest';
    } else {
      attr = BEATS[plan]; why = 'bluff';
    }
    if (idx < 0) idx = bestIdx(E.hand, attr, true);       // 唬人絕不出王牌
    if (idx < 0) {                                        // 手上只剩王牌（理論上第 2 步已讓 plan＝王牌那軸）：照實出王牌
      idx = E.hand.findIndex(isAce); plan = attr = aceAxis(E.hand[idx]); why = 'ace';
    }
    // 提示句：照劇本，否則從那色的句子裡抽一句，不跟上一手同一句
    let line;
    if (sp && sc.hints[st.n - 1]) line = sc.hints[st.n - 1];
    else {
      const lines = (st.hintTable && st.hintTable[plan]) || DEFAULT_HINTS[plan];
      let k = Math.floor(uLine * lines.length);
      const prev = st.last && st.last.hint ? st.last.hint.line : null;
      if (lines.length > 1 && lines[k] === prev) k = (k + 1) % lines.length;
      line = lines[k];
    }
    st.plan = { hint: { attr: plan, line }, attr, idx, bluff: attr !== plan, why };
    events.push({ t: 'hand', n: st.n, hint: { attr: plan, line }, eHandN: E.hand.length, pile: E.pile.length });
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
  function actPlay(st, act) {
    if (act.ace) { const a = aceAxis(st.p.ace); return { card: st.p.ace, attr: a, star: CFG.aceStar, ace: true }; }
    const card = st.p.hand[act.i];
    return { card, attr: act.attr, star: star(card, act.attr), ace: false };
  }
  // 他那一側：{i, attr}＝他手牌第 i 張；{attr, star, ace}＝假設值（策略估算用）
  function ePlayOf(st, eSide) {
    if (!eSide || !ATTRS.includes(eSide.attr)) return null;
    if (Number.isInteger(eSide.i)) { const c = st.e.hand[eSide.i]; if (!c) return null; return { card: c, attr: eSide.attr, star: eStarOf(c, eSide.attr), ace: isAcePlay(c, eSide.attr) }; }
    return { card: null, attr: eSide.attr, star: eSide.star | 0, ace: !!eSide.ace };
  }

  // 結果預告（純函式）：不變式 resolveTurn 的 clash ＝ preview(st0, act, {i: plan.idx, attr: plan.attr})
  function preview(st, act, eSide) {
    if (!isLegal(st, act)) return null;
    const e = ePlayOf(st, eSide); if (!e) return null;
    const r = outcome(st, actPlay(st, act), e, false);
    return { kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked, by: r.by, notes: r.notes };
  }

  function resolveTurn(st, act, opts) {
    opts = opts || {};
    if (!isLegal(st, act) || !st.plan) return [];
    const P = st.p, E = st.e, plan = st.plan, events = [];
    const fp = opts.forcedPlay;
    const eSide = (fp && Number.isInteger(fp.i) && E.hand[fp.i] && ATTRS.includes(fp.attr)) ? { i: fp.i, attr: fp.attr } : { i: plan.idx, attr: plan.attr };
    const pPlay = actPlay(st, act), ePlay = ePlayOf(st, eSide), eCard = ePlay.card;
    let r;
    if (opts.debugOutcome) {
      const d = opts.debugOutcome;
      r = { kind: d.kind, toE: d.toE | 0, toP: d.toP | 0, blocked: d.blocked || null, by: d.by || null, notes: [], pStar: pPlay.star };
    } else r = outcome(st, pPlay, ePlay, true);
    E.hp -= r.toE; P.hp -= r.toP;
    const hint = { attr: plan.hint.attr, line: plan.hint.line }, bluff = ePlay.attr !== hint.attr;
    const S = st.stats;
    S.hands++; if (act.ace) S.ace++; S.relicNotes += r.notes.length;
    if (r.kind === 'counter') S.counter++; else if (r.kind === 'countered') S.countered++; else if (r.kind === 'tie') S.tie++; else S.mirror++;
    if (r.blocked) { S.blocked++; if (r.by === 'p') S.blockedYou++; }
    if (bluff) { S.bluffs++; if (r.kind !== 'countered') S.caught++; } else S.honest++;
    const sum = { n: st.n, pCard: pPlay.card, pAttr: pPlay.attr, pStar: r.pStar, pBase: pPlay.star, ace: !!act.ace,
      eCard, eAttr: ePlay.attr, eStar: ePlay.star, eAce: ePlay.ace,
      kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked, by: r.by, hint, bluff, notes: r.notes };
    st.last = sum;
    st.log.push({ n: st.n, pAttr: pPlay.attr, eAttr: ePlay.attr, hint: hint.attr, bluff, why: plan.why, kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked });
    events.push(Object.assign({ t: 'clash' }, sum, { pHp: P.hp, eHp: E.hp }));
    P.last = pPlay.attr; E.last = ePlay.attr;
    E.thrown.push(eCard); E.hand.splice(eSide.i, 1); st.plan = null;
    if (act.ace) P.aceUsed = true;
    else {
      P.disc.push(P.hand[act.i]);
      const d = pull(st); P.hand[act.i] = d.card;
      events.push({ t: 'draw', i: act.i, card: d.card, reshuffled: d.reshuffled });
    }
    if (P.hp <= 0 || E.hp <= 0) return finish(st, 'hp', events);
    if (st.n >= CFG.maxRounds) return finish(st, 'rounds', events);
    if (!E.hand.length && !E.pile.length) return finish(st, 'pile', events);
    beginHand(st, events);
    return events;
  }
  // 聲望 ≤0 就輸；兩邊同一手都 ≤0 比剩下的（負數也比）；六手打完／他牌出完比剩下的；一樣都算你贏
  function finish(st, by, events) {
    const P = st.p, E = st.e;
    const win = by === 'hp' ? ((P.hp <= 0 && E.hp <= 0) ? P.hp >= E.hp : E.hp <= 0) : P.hp >= E.hp;
    st.over = { win, by }; st.plan = null;
    events.push({ t: 'over', win, by, pHp: P.hp, eHp: E.hp });
    return events;
  }

  // 公開資訊（§2.1.5）：提示只給屬性（畫面上不得寫出屬性名）與句子 id；揭曉前不給他出哪張、哪色、有沒有唬人
  function view(st) {
    const P = st.p, E = st.e;
    const aceLive = P.aceUsed ? null : P.ace;
    const pl = st.over ? null : st.plan;
    return {
      n: st.n, maxRounds: CFG.maxRounds, over: st.over ? { win: st.over.win, by: st.over.by } : null,
      pHp: P.hp, pMax: P.max, eHp: E.hp, eMax: E.max,
      eId: E.id, eName: E.name, eTitle: E.title, elite: E.elite, boss: E.boss,
      honesty: { key: E.honesty, zh: E.honestyZh, q: E.q },
      hint: pl ? { attr: pl.hint.attr, line: pl.hint.line } : null,
      eHandN: E.hand.length, pile: E.pile.length, pileMax: E.deckSize,
      eDeckIds: E.deckIds.slice(), eThrownIds: E.thrown.map(c => c.id),
      hand: P.hand.slice(), ace: aceLive, aceCard: P.ace, aceAxis: aceAxis(P.ace), aceUsed: P.aceUsed,
      last: st.last, relics: P.relics.map(r => Object.assign({}, r)), dustUsed: P.dustUsed,
    };
  }

  function bestChip(st, attr, o) {
    let best = null, bs = -1;
    if (o && o.ace && st.p.ace && !st.p.aceUsed && aceAxis(st.p.ace) === attr) { best = { ace: true, attr }; bs = CFG.aceStar; }
    st.p.hand.forEach((c, i) => { if (c && star(c, attr) > bs) { bs = star(c, attr); best = { i, attr }; } });
    return best;
  }
  // 手牌裡用 attr 出、對上「他這手的提示屬性、他手牌該軸最大星」會被 blocked:'gap' 的那張（最左）；沒有 → null（教學第 5 手的手指）
  function blockedChoice(st, attr) {
    if (!st || st.over || !st.plan || !ATTRS.includes(attr)) return null;
    const h = st.plan.hint.attr, bi = bestIdx(st.e.hand, h, false);
    if (bi < 0) return null;
    const c = st.e.hand[bi], e = { attr: h, star: eStarOf(c, h), ace: isAcePlay(c, h) };
    for (let i = 0; i < st.p.hand.length; i++) {
      if (!st.p.hand[i]) continue;
      if (outcome(st, actPlay(st, { i, attr }), e, false).blocked === 'gap') return { i, attr };
    }
    return null;
  }

  // ============================================================================================================================
  // 一晚：今晚來客（線性）＋ 經濟（§2.1.6；錢與買的唱片只在這一晚，配件照 v3 帶到下一晚）
  // ============================================================================================================================
  function nightCfg(content) { const n = content.night || {}; return { times: n.times || ['22:00', '22:40', '23:20', '00:10', '02:00'], normals: n.normals || 3, retry: n.retry != null ? n.retry : CFG.retries }; }
  function econ(content) {
    const e = (content && content.economy) || {};
    return { start: e.start != null ? e.start : ECON.start, win: Object.assign({}, ECON.win, e.win || {}), price: Object.assign({}, ECON.price, e.price || {}),
      sellRate: e.sellRate != null ? e.sellRate : ECON.sellRate, bargainPrice: e.bargainPrice != null ? e.bargainPrice : ECON.bargainPrice,
      stock: e.stock || ECON.stock, relicStock: e.relicStock || ECON.relicStock };
  }
  const relicOk = (content, id) => !!(content.relics && content.relics[id]) && content.relics[id].v4 !== false;
  const cardOf = (content, id) => (content.cards && content.cards[id]) || null;

  function newRun(content, o) {
    o = o || {};
    const seedKey = String(o.seedKey || 'lab'), nightNo = o.nightNo || 1;
    const ace = TIERS.includes(o.ace) ? o.ace : 'hall';
    const N = nightCfg(content), EC = econ(content);
    const run = {
      v: RUN_V, seedKey, nightNo, rng: fnv1a32(seedKey + '#' + nightNo) || 1, ace, bossAce: null,
      bag: ((content.gifts || {})[ace] || []).slice(),
      relics: (o.relics || []).filter((id, k, a) => relicOk(content, id) && a.indexOf(id) === k).slice(0, CFG.relicMax),
      order: [], times: N.times.slice(), idx: 0,
      prologue: (o.prologue != null ? !!o.prologue : nightNo === 1) ? 'pending' : null,
      retryLeft: N.retry, pending: null, duel: null, duelEnemy: null, over: null,
      money: EC.start,
      shop: { bins: {}, relics: [], bargain: [], bargainPicked: false, firstGuestInside: false },
      stats: { wins: 0, fights: 0, hands: 0, retries: 0, taken: [], met: [], relicsGot: [], lostAt: null,
        earned: 0, spent: 0, bought: [], sold: [], relicsBought: [], relicsSold: [] },
    };
    // 客人順序與藏家王牌（RNG 順序同 v3，同一天的今晚來客跟 v3 一樣）
    const normals = shuffle((content.normals || []).slice(), run).slice(0, N.normals);
    run.order = normals.concat([pickOne(content.elites || [], run), content.boss || 'boss']).filter(Boolean);
    const others = TIERS.filter(t => t !== ace);
    run.bossAce = others.includes(o.bossAce) ? o.bossAce : pickOne(others, run);
    stockShop(run, content, EC);
    return run;
  }
  // 今晚的貨（newRun 一次決定；RNG 在客人順序與藏家王牌之後才取）
  function stockShop(run, content, EC) {
    const owned = new Set([content.aces && content.aces[run.ace], ...run.bag].filter(Boolean));
    const span = (lohi, fallback) => { const lo = (lohi && lohi[0]) | 0 || fallback[0], hi = (lohi && lohi[1]) | 0 || fallback[1]; return lo + Math.floor(rng(run) * (Math.max(hi, lo) - lo + 1)); };
    const B = content.bins || {};
    for (const key of Object.keys(B)) {
      const b = B[key]; if (!b || b.display) continue;                        // 牆上兩區只展示、不賣
      const pool = (b.pool || []).filter(id => !owned.has(id) && cardOf(content, id) && !cardOf(content, id).tier);
      shuffle(pool, run);
      run.shop.bins[key] = pool.slice(0, Math.min(span(EC.stock, ECON.stock), pool.length));
    }
    const rp = (((content.relicShop || {}).pool) || []).filter(id => relicOk(content, id) && !run.relics.includes(id));
    shuffle(rp, run);
    run.shop.relics = rp.slice(0, Math.min(span(EC.relicStock, ECON.relicStock), rp.length));
    const bp = (((content.bargain || {}).pool) || []).filter(id => cardOf(content, id));
    shuffle(bp, run);
    const by = { c: [], o: [], h: [] };
    for (const id of bp) by[topAttr(cardOf(content, id))].push(id);
    const out = [];
    for (let k = 0; k < 2; k++) for (const a of ATTRS) if (by[a][k]) out.push(by[a][k]);
    run.shop.bargain = out;
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
    const prologue = run.prologue === 'pending';
    const tut = !!o.tutorial && prologue && !!content.tutorial;
    const eDef = enemyDef(content, enemyId, { tutorial: tut, depth: prologue ? undefined : run.idx });
    const opts = { seed: (Math.floor(rng(run) * 4294967296) >>> 0) || 1, hintTable: hintTableOf(content) };
    if (eDef.boss && run.bossAce) opts.enemyAce = cardFrom(content, content.aces[run.bossAce]);
    if (tut && content.tutorial.script) opts.script = content.tutorial.script[run.ace] || null;
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
    S.fights++; S.hands += duel.stats.hands;
    const met = uniq(duel.e.thrown.map(c => c.id));
    for (const id of met) if (!S.met.includes(id)) S.met.push(id);
    run.duel = null; run.duelEnemy = null;
    let earn = 0;
    if (win) {
      S.wins++;
      const cls = prologue ? 'prologue' : E.boss ? 'boss' : E.elite ? 'elite' : 'normal';
      earn = Math.max(0, econ(content).win[cls] | 0);
      run.money += earn; S.earned += earn;
      if (prologue) {
        run.prologue = 'done';
        const cards = (E.drop ? [E.drop] : []).filter(id => !run.bag.includes(id) && content.cards[id]);
        const relics = (((content.rewards || {}).prologueRelics) || []).filter(id => !run.relics.includes(id));
        run.pending = { type: 'reward', enemyId, prologue: true, cards, relics, need: 'cardThenRelic', cardDone: !cards.length, relicDone: !relics.length };
      } else {
        const cards = met.filter(id => content.cards[id] && !content.cards[id].tier && !run.bag.includes(id));
        let relics = [];
        if (E.elite || E.boss) {
          const pool = (((content.rewards || {}).relicPool) || Object.keys(content.relics || {})).filter(id => relicOk(content, id) && !run.relics.includes(id));
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
    return { win, by: duel.over.by, enemyId, met, offer: run.pending, over: run.over, earn };
  }
  function advance(run, p) {
    run.pending = null;
    if (p && p.prologue) return;
    run.idx++;
    if (run.idx >= run.order.length) run.over = 'clear';
  }
  function settle(run) { const p = run.pending; if (p && p.type === 'reward' && p.cardDone && p.relicDone) advance(run, p); }

  // ---------- 價格與時機 ----------
  function priceOf(content, card) {
    const c = typeof card === 'string' ? cardOf(content, card) : card;
    if (!c || c.tier) return null;                                   // 王牌不賣
    const p = econ(content).price[peak(c)];
    return p != null ? p : null;
  }
  function relicPrice(content, id) { const r = content && content.relics && content.relics[id]; return r && r.price != null ? r.price : null; }
  function sellValue(content, x) {
    const p = typeof x === 'string' ? relicPrice(content, x) : priceOf(content, x);
    return p == null ? 0 : Math.floor(p * econ(content).sellRate);
  }
  const shopOf = run => run.shop || { bins: {}, relics: [], bargain: [], bargainPicked: false };
  function canShop(run) { return !!run && !run.over && !run.pending && !run.duel && run.prologue !== 'pending' && !!shopOf(run).bargainPicked; }
  function canBargainPick(run) { return !!run && !shopOf(run).bargainPicked && !run.duel && !run.over && run.idx === 0; }

  function choose(run, content, ch) {
    const effects = [];
    const fail = error => ({ ok: false, error, effects: [] });
    const p = run.pending;
    if (!ch || !ch.type) return fail('badChoice');
    const rew = p && p.type === 'reward' ? p : null;
    const S = run.stats, EC = econ(content), SH = shopOf(run);
    switch (ch.type) {
      case 'take': {
        if (!rew || rew.cardDone) return fail('noCardOffer');
        if (!rew.cards.includes(ch.cardId)) return fail('notOffered');
        if (run.bag.includes(ch.cardId)) return fail('owned');
        if (run.bag.length >= CFG.bagMax) {
          if (!ch.dropId || !run.bag.includes(ch.dropId)) return fail('bagFull');
          run.bag.splice(run.bag.indexOf(ch.dropId), 1); effects.push({ loseCard: ch.dropId });
        }
        run.bag.push(ch.cardId); S.taken.push(ch.cardId); effects.push({ gainCard: ch.cardId });
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
        run.relics.push(ch.relicId); S.relicsGot.push(ch.relicId); effects.push({ gainRelic: ch.relicId });
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
        S.retries++; run.pending = null; effects.push({ retry: p.enemyId, free: !!p.free });
        return { ok: true, effects };
      }
      case 'end': {
        if (!p || p.type !== 'retry') return fail('noRetry');
        run.pending = null; run.over = 'dead';
        S.lostAt = { enemyId: p.enemyId, idx: run.idx, time: run.times[run.idx] || null };
        effects.push({ end: true });
        return { ok: true, effects };
      }
      // ---- 經濟（§2.1.6）：先驗完全部條件，才動 run ----
      case 'bargainPick': {
        if (!canBargainPick(run)) return fail('notNow');
        const ids = ch.ids;
        if (!Array.isArray(ids) || ids.length !== CFG.bargainPick || new Set(ids).size !== ids.length) return fail('badCount');
        if (!ids.every(id => SH.bargain.includes(id) && cardOf(content, id))) return fail('notInStock');
        if (ids.some(id => run.bag.includes(id))) return fail('owned');
        if (run.bag.length + ids.length > CFG.bagMax) return fail('bagFull');
        for (const id of ids) { run.bag.push(id); SH.bargain.splice(SH.bargain.indexOf(id), 1); effects.push({ gainCard: id }); }
        SH.bargainPicked = true;
        return { ok: true, effects };
      }
      case 'buy': {
        if (!canShop(run)) return fail('notNow');
        const stock = SH.bins[ch.key];
        if (!Array.isArray(stock) || !stock.includes(ch.cardId) || !cardOf(content, ch.cardId)) return fail('notInStock');
        if (run.bag.includes(ch.cardId)) return fail('owned');
        const price = priceOf(content, ch.cardId);
        if (price == null) return fail('notInStock');
        let sell = null;
        if (ch.sellId != null) { if (!run.bag.includes(ch.sellId) || !cardOf(content, ch.sellId)) return fail('badSell'); sell = ch.sellId; }
        else if (run.bag.length >= CFG.bagMax) return fail('bagFull');
        const earn = sell ? sellValue(content, cardOf(content, sell)) : 0;
        if (run.money + earn < price) return fail('noMoney');
        if (sell) { run.bag.splice(run.bag.indexOf(sell), 1); run.money += earn; S.earned += earn; S.sold.push(sell); effects.push({ loseCard: sell, earn }); }
        run.money -= price; S.spent += price;
        run.bag.push(ch.cardId); stock.splice(stock.indexOf(ch.cardId), 1); S.bought.push(ch.cardId);
        effects.push({ gainCard: ch.cardId, spend: price });
        return { ok: true, effects };
      }
      case 'buyBargain': {
        if (!canShop(run)) return fail('notNow');
        const ids = ch.ids;
        if (!Array.isArray(ids) || ids.length < 1 || ids.length > CFG.bargainPick || new Set(ids).size !== ids.length) return fail('badCount');
        if (!ids.every(id => SH.bargain.includes(id) && cardOf(content, id))) return fail('notInStock');
        if (ids.some(id => run.bag.includes(id))) return fail('owned');
        const sells = ch.sellIds == null ? [] : ch.sellIds;
        if (!Array.isArray(sells)) return fail('badSell');
        const need = Math.max(0, run.bag.length + ids.length - CFG.bagMax);
        if (sells.length < need) return fail('bagFull');
        if (sells.length > need || new Set(sells).size !== sells.length || !sells.every(id => run.bag.includes(id) && cardOf(content, id))) return fail('badSell');
        const earn = sells.reduce((s, id) => s + sellValue(content, cardOf(content, id)), 0), price = EC.bargainPrice;
        if (run.money + earn < price) return fail('noMoney');
        for (const id of sells) { const v = sellValue(content, cardOf(content, id)); run.bag.splice(run.bag.indexOf(id), 1); run.money += v; S.earned += v; S.sold.push(id); effects.push({ loseCard: id, earn: v }); }
        run.money -= price; S.spent += price;
        ids.forEach((id, k) => { run.bag.push(id); SH.bargain.splice(SH.bargain.indexOf(id), 1); S.bought.push(id); effects.push(k === 0 ? { gainCard: id, spend: price } : { gainCard: id, spend: 0 }); });
        return { ok: true, effects };
      }
      case 'buyRelic': {
        if (!canShop(run)) return fail('notNow');
        if (!SH.relics.includes(ch.relicId) || !relicOk(content, ch.relicId)) return fail('notInStock');
        if (run.relics.includes(ch.relicId)) return fail('owned');
        const price = relicPrice(content, ch.relicId);
        if (price == null) return fail('notInStock');
        let sell = null;
        if (ch.sellRelicId != null) { if (!run.relics.includes(ch.sellRelicId)) return fail('badSell'); sell = ch.sellRelicId; }
        else if (run.relics.length >= CFG.relicMax) return fail('relicsFull');
        const earn = sell ? sellValue(content, sell) : 0;
        if (run.money + earn < price) return fail('noMoney');
        if (sell) { run.relics.splice(run.relics.indexOf(sell), 1); run.money += earn; S.earned += earn; S.relicsSold.push(sell); effects.push({ loseRelic: sell, earn }); }
        run.money -= price; S.spent += price;
        run.relics.push(ch.relicId); SH.relics.splice(SH.relics.indexOf(ch.relicId), 1); S.relicsBought.push(ch.relicId);
        effects.push({ gainRelic: ch.relicId, spend: price });
        return { ok: true, effects };
      }
    }
    return fail('badChoice');
  }

  // a reasonable player's choice for whatever the run waits on (sim, __lab autoplay)
  function runPolicy(run, content, o) {
    o = o || {};
    const preferRelic = o.preferRelic !== false;
    const p = run.pending;
    if (!p) return null;
    if (p.type === 'retry') return { type: 'retry' };
    const cOf = id => content.cards[id];
    const pickRelic = () => {
      const left = p.relics.filter(id => !run.relics.includes(id));
      if (!left.length || run.relics.length >= CFG.relicMax) return null;
      return { type: 'relic', relicId: p.prologue ? left[fnv1a32(run.seedKey + '#relic#' + run.nightNo) % left.length] : left[0] };
    };
    if (p.need === 'cardOrRelic' && preferRelic) { const r = pickRelic(); if (r) return r; }
    if (!p.cardDone) {
      const best = p.cards.slice().sort((a, b) => peak(cOf(b)) - peak(cOf(a)) || power(cOf(b)) - power(cOf(a)))[0];
      if (!best) return { type: 'skip' };
      if (run.bag.length < CFG.bagMax) return { type: 'take', cardId: best };
      const weakest = run.bag.slice().sort((a, b) => power(cOf(a)) - power(cOf(b)) || peak(cOf(a)) - peak(cOf(b)))[0];
      if (power(cOf(weakest)) >= power(cOf(best))) return { type: 'skip' };
      return { type: 'take', cardId: best, dropId: weakest };
    }
    if (!p.relicDone) return pickRelic() || { type: 'skip' };
    return { type: 'skip' };
  }
  // 特價箱挑三張（sim 的「三色各一、同色挑峰值大的」）：c、o、h 各挑一張；某色沒有就從剩下的挑峰值大的補
  function bargainPolicy(run, content) {
    if (!canBargainPick(run)) return null;
    const left = shopOf(run).bargain.filter(id => cardOf(content, id) && !run.bag.includes(id));
    const better = (a, b) => peak(cardOf(content, b)) - peak(cardOf(content, a)) || power(cardOf(content, b)) - power(cardOf(content, a));
    const ids = [];
    for (const a of ATTRS) { const c = left.filter(id => !ids.includes(id) && topAttr(cardOf(content, id)) === a).sort(better)[0]; if (c) ids.push(c); }
    for (const id of left.slice().sort(better)) if (ids.length < CFG.bargainPick && !ids.includes(id)) ids.push(id);
    return ids.length === CFG.bargainPick ? { type: 'bargainPick', ids } : null;
  }
  // 兩位客人之間怎麼買（§2.1.6）：'none' 不買；'smart' 看下一位客人的牌單主屬性 M，買 COUNTER_OF[M] 軸 ≥4 星、而且比包包裡該軸最強那張更強的唱片
  //   （包包滿就賣總星最少的那張），錢夠且還有空位就買加成 COUNTER_OF[M] 的配件
  function shopPolicy(run, content, mode) {
    if (mode !== 'smart' || !canShop(run)) return [];
    const r = clone(run), out = [];
    const id = r.order[r.idx], E = id && content.enemies[id];
    if (!E) return [];
    const deck = (E.deck || []).map(x => cardOf(content, x)).filter(Boolean);
    if (E.boss && r.bossAce && content.aces && cardOf(content, content.aces[r.bossAce])) deck.push(cardOf(content, content.aces[r.bossAce]));
    const T = COUNTER_OF[deckMain(deck, E.taste)];
    for (let guard = 0; guard < 8; guard++) {
      const bagBest = r.bag.reduce((m, x) => Math.max(m, star(cardOf(content, x), T)), 0);
      const cands = [];
      for (const key of Object.keys(r.shop.bins)) for (const cid of r.shop.bins[key]) {
        const c = cardOf(content, cid);
        if (c && star(c, T) >= 4 && star(c, T) > bagBest) cands.push({ key, cid, c, price: priceOf(content, c) });
      }
      cands.sort((a, b) => star(b.c, T) - star(a.c, T) || power(b.c) - power(a.c) || a.price - b.price);
      let bought = false;
      for (const x of cands) {
        const ch = { type: 'buy', key: x.key, cardId: x.cid };
        if (r.bag.length >= CFG.bagMax) {
          ch.sellId = r.bag.slice().sort((a, b) => power(cardOf(content, a)) - power(cardOf(content, b)) || peak(cardOf(content, a)) - peak(cardOf(content, b)))[0];
        }
        if (choose(r, content, ch).ok) { out.push(ch); bought = true; break; }
      }
      if (!bought) break;
    }
    const rid = 'boost_' + T;
    if (r.shop.relics.includes(rid) && r.relics.length < CFG.relicMax) {
      const ch = { type: 'buyRelic', relicId: rid };
      if (choose(r, content, ch).ok) out.push(ch);
    }
    return out;
  }

  // ============================================================================================================================
  // 玩家策略（§2.1.7）：policies[name](duel, R, mem, content) -> act。只有 oracle 讀 duel.plan／e.hand／e.pile。
  // ============================================================================================================================
  function pubOpts(v) {
    const os = [];
    v.hand.forEach((c, i) => { if (c) for (const a of ATTRS) os.push({ act: { i, attr: a }, card: c, attr: a, star: star(c, a), ace: false }); });
    if (v.ace) os.push({ act: { ace: true }, card: v.ace, attr: v.aceAxis, star: CFG.aceStar, ace: true });
    return os;
  }
  function pickMax(os) { let b = null; for (const o of os) if (!b || o.star > b.star) b = o; return b; }
  const onAxis = (os, a) => pickMax(os.filter(o => o.attr === a));
  const fallbackR = st => makeRng(((st.rng | 0) ^ 0x9e3779b9) + (st.n | 0));
  // 他各軸星數估計：公開牌單扣掉已亮過的，該軸前三大的平均（四捨五入）
  function estStars(v, content) {
    const left = v.eDeckIds.slice();
    for (const id of v.eThrownIds) { const k = left.indexOf(id); if (k >= 0) left.splice(k, 1); }
    const cards = left.map(id => content && content.cards && content.cards[id]).filter(Boolean);
    const est = {};
    for (const a of ATTRS) {
      const top = cards.map(c => star(c, a)).sort((x, y) => y - x).slice(0, 3);
      est[a] = top.length ? Math.round(top.reduce((s, x) => s + x, 0) / top.length) : 3;
    }
    return est;
  }
  function valueOf(v, r, terminal) {
    const p2 = v.pHp - r.toP, e2 = v.eHp - r.toE;
    let val = r.toE - r.toP;
    if (p2 <= 0 || e2 <= 0) val += ((p2 <= 0 && e2 <= 0) ? p2 >= e2 : e2 <= 0) ? 20 : -20;
    else if (terminal) val += p2 >= e2 ? 20 : -20;
    return val;
  }
  // 期望值一步最佳；同分取總星小的（省大牌）
  function evPick(st, v, os, dist, aceCost) {
    const terminal = v.n >= v.maxRounds || (v.eHandN + v.pile) <= 1;
    let best = null, bv = -Infinity, bp = Infinity;
    for (const o of os) {
      let ev = 0;
      for (const d of dist) { if (!d.p) continue; const r = preview(st, o.act, d.side); if (r) ev += d.p * valueOf(v, r, terminal); }
      if (o.ace && !terminal) ev -= aceCost;
      const pw = power(o.card);
      if (ev > bv + 1e-9 || (Math.abs(ev - bv) <= 1e-9 && pw < bp)) { best = o; bv = ev; bp = pw; }
    }
    return best;
  }
  const policyFns = {
    random: (st, R) => { R = R || fallbackR(st); const acts = legalActions(st); return acts[Math.floor(R() * acts.length)] || null; },
    // 只出最大星：手牌＋王牌裡星最大的那一手（王牌算 7 → 第一手就丟）
    high: st => { const b = pickMax(pubOpts(view(st))); return b ? b.act : null; },
    // 永遠剋提示：COUNTER_OF[提示] 軸最大的那張；那軸最大 ≤1 星就改 high
    counterHint: st => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      const o = v.hint ? onAxis(os, COUNTER_OF[v.hint.attr]) : null;
      return (o && o.star > 1 ? o : pickMax(os)).act;
    },
    // 兩步公式：上一手你出的是 COUNTER_OF[上一手提示] → 這手出提示同色最大的；否則同 counterHint
    formula: st => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      if (!v.hint) return pickMax(os).act;
      const L = v.last, two = !!(L && L.hint && L.pAttr === COUNTER_OF[L.hint.attr]);
      const o = onAxis(os, two ? v.hint.attr : COUNTER_OF[v.hint.attr]);
      return (o && o.star > 1 ? o : pickMax(os)).act;
    },
    // 跟提示同色（對照組）
    mirrorHint: st => { const v = view(st), os = pubOpts(v); if (!os.length) return null; const o = v.hint ? onAxis(os, v.hint.attr) : null; return (o || pickMax(os)).act; },
    // 會讀的：他這手 {提示: q, BEATS[提示]: 1−q}；他各軸星數用公開牌單估；王牌在非最後一手扣 2
    thoughtful: (st, R, mem, content) => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      if (!v.hint) return pickMax(os).act;
      const q = v.honesty && v.honesty.q != null ? v.honesty.q : 1, h = v.hint.attr, est = estStars(v, content);
      const dist = [{ p: q, side: { attr: h, star: est[h], ace: false } }, { p: 1 - q, side: { attr: BEATS[h], star: est[BEATS[h]], ace: false } }];
      return evPick(st, v, os, dist, 2).act;
    },
    // 先知：知道他這手出哪張、哪色（王牌成本 0.5）
    oracle: st => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      if (!st.plan) return pickMax(os).act;
      return evPick(st, v, os, [{ p: 1, side: { i: st.plan.idx, attr: st.plan.attr } }], 0.5).act;
    },
  };
  policyFns.novice = policyFns.counterHint;
  const policies = policyFns;

  return { VERSION, ATTRS, ZH, ZH1, BEATS, COUNTER_OF, beats, TIERS, TIER_AXIS, COLOR_RELIC, CFG, HONESTY, PLANNERS, PLANNER_BY_DEPTH,
    rng, makeRng, shuffle, fnv1a32, clone, star, aceAxis, topAttr, peak, deckMain, clash, relicObj,
    enemyDef, playerDef, startDuel, beginHand, legalActions, isLegal, preview, resolveTurn, view, bestChip, blockedChoice,
    newRun, current, nextStep, startFight, finishFight, choose, canShop, canBargainPick, priceOf, relicPrice, sellValue,
    runPolicy, shopPolicy, bargainPolicy, policies };
});
