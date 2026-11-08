// game-lab/tutorial.js — 序章男子那場的引導教學 v4（B2；SPEC-v4 §2.5.5、§2.2.10）
//
// 六手各教一件事（C.tutorial.lessons）：比星數 → 冷剋經 → 經剋硬 → 硬剋冷 → 差 2 星剋不動 → 王牌。對手是序章男子（老實，教學場聲望 18）。
// 他每手出什麼、提示哪句、你抽哪幾張，都由引擎的 script 決定（C.tutorial.script[tier]，engine.startFight(run, C, {tutorial:true}) 帶進 startDuel；
// 有 script 時你的牌堆不洗：老闆四張先（照出牌順序）、特價箱三張照挑的順序接在後面；手牌 5 張（FIXLIST 11）＝四張＋特價箱第 1 張，
// 第 5 手最左那張一定是特價箱的，見 content.js C.tutorial 的註解）。教學只管「手指指哪、放行哪個動作」。
// 每手（FIXLIST 11：手牌平時疊成一排錯開、點牌才跳屬性）：點那張（allow.pick）→ 點那個屬性（allow.pick＋throw＝出手）。
//   點那張那一步：手牌還疊著時，洞與手指先指整疊手牌（'hand'；第一次泡泡換成 step.spread「點一下手牌攤開。」），攤開了才指那張。
// 手指目標＝C.tutorial.script[tier].pick（{id,attr} → 封面 card:id:<id>、屬性鈕 chip:id:<id>:<attr>；'blocked:o' → card:／chip:blocked:o＝engine.blockedChoice；
//   'ace' → card-ace／chip-ace），由 stepsFor 代入步驟裡的 'card:pick'（封面）／'pick'（屬性鈕）／'tile:pick'（那一格）／allow.pick。
// 畫面：壓暗＋挖洞（一張 SVG evenodd）、金框脈動、像素手指、貼著目標的老闆一句話（≤25 字）、說明步點一下繼續、
// 操作步只放行指定的動作（點錯：目標震一下＋「先點我指的這裡。」）。三角亮邊交給 duel.js：DipLabDuel.tri(['oc'])。
// 結算時講的步驟（target 含 'result'）：浮框剛出現就 hold 住盤面，講完才走（第 6 手 KO 那一手也一樣，講完才蓋大章）。
// 教學外：一次性老闆小提示（C.coachTips：tip_bluff／tip_block／tip_ace／tip_mirror／tip_rounds）——不壓暗、不擋點擊、5 秒，每種一輩子一次。
//
// ── 介面 ───────────────────────────────────────────────────────────────────────────────────────────
// window.DipLabTut = {
//   configure({ stage, content, save:()=>saveObj, persist:()=>void, onEnd?(how) }),
//   duelHooks() → { gate(a)→bool, onPhase(ph), onResolved(evs), resolveOpts(act)→{} }   // 只給教學那場的 DipLabDuel hooks.tut
//   startDuelLesson({ tier, replay? }) → Promise<'done'|'skipped'|'released'|'aborted'>  // mount 之後叫；依 duel.n 自己接到那一手的步驟
//   skip(), abort(), active(), fastForward()
//   hintHook(id, targets)   // ＝DipLabDuel hooks.hint：一次性老闆小提示；教學進行中不出、不記
//   firstTime(id, targets)  // 同一條佇列；另有 'night'（C.shopLines.nightIntro 兩句，壓暗 40%、點一下換句）
//   dismissSoft(), step(def), replayDuel(C, tier, seed?, {bargain?}), learned(), learnedIds(), settled(), debug()
// };
// gate action（duel.js 送進來）：{kind:'spread'}（點疊著的手牌＝攤開） {kind:'card',i,attr,id}（攤開後點封面＝浮起這張）
//   {kind:'throw',i,attr,id}（點屬性鈕＝出手） {kind:'collapse'}（點手牌外面＝收回：教學中一律不放行、也不罵）
//   {kind:'chip',i,attr,id}（只有 API select(i,attr) 送） {kind:'info',where} {kind:'close'}；i＝0..handSize−1 或 'ace'。
// allow：{pick:true}（stepsFor 代入：點那張的步驟 → {card:{id}}｜{card:{blocked:attr}}｜{ace:true}；
//   點屬性的步驟（allow.throw）→ {throw:true, chip:{id,attr}}｜{throw:true, chip:{blocked:attr}}｜{throw:true, ace:true}） {info} {close}
//   （v3 的 {chip:{i:'best'|'any'|n, attr}} 照收）。點那張的步驟：{kind:'spread'} 放行但不算完成（攤開了才指那張）。
//
// Node（test/tutorial.test.mjs）：require('./tutorial.js') 拿到純邏輯（stepsFor／createRunner／matches／replayDuel…），不碰 DOM。
// 只掛 window.DipLabTut；localStorage 一律不碰（seen／learned 寫進 ui.js 給的存檔物件，由 ui.js persist）。
(function (root) {
  'use strict';

  // ================================================================== 純邏輯（Node＋瀏覽器）
  var TIERS = ['hall', 'pearl', 'heresy'];
  var ATTRS = ['c', 'o', 'h'];

  function textOf(step, tier) { return (step.text && typeof step.text === 'object') ? (step.text[tier] || '') : (step.text || ''); }
  // script[tier].pick 的一項 → 封面（card）／屬性鈕（chip）／那一格（tile）的名字，與兩步各放行什麼（lift＝點那張、shot＝點那個屬性）
  function pickSpec(p) {
    if (p === 'ace') return { card: 'card-ace', chip: 'chip-ace', tile: 'hand-ace', lift: { ace: true }, shot: { ace: true } };
    if (typeof p === 'string' && /^blocked:[coh]$/.test(p)) { var ba = p.slice(8); return { card: 'card:blocked:' + ba, chip: 'chip:blocked:' + ba, tile: 'tile:card:blocked:' + ba, lift: { card: { blocked: ba } }, shot: { chip: { blocked: ba } } }; }
    if (p && typeof p === 'object' && p.id && ATTRS.indexOf(p.attr) >= 0) return { card: 'card:id:' + p.id, chip: 'chip:id:' + p.id + ':' + p.attr, tile: 'tile:card:id:' + p.id, lift: { card: { id: p.id } }, shot: { chip: { id: p.id, attr: p.attr } } };
    return null;
  }
  function subPick(name, P) { return name === 'pick' ? P.chip : name === 'card:pick' ? P.card : name === 'tile:pick' ? P.tile : name; }
  var PICK_NAMES = ['pick', 'card:pick', 'tile:pick'];
  function stepsFor(C, tier) {
    var T = (C && C.tutorial) || {};
    var picks = (T.script && T.script[tier] && T.script[tier].pick) || [];
    var hand = 1;
    return (T.steps || []).filter(function (s) {
      if (!s.tier) return true;
      return Array.isArray(s.tier) ? s.tier.indexOf(tier) >= 0 : s.tier === tier;
    }).map(function (s) {
      var o = {}; for (var k in s) o[k] = s[k]; o.text = textOf(s, tier);
      var res = o.kind === 'say' && (o.target || []).indexOf('result') >= 0;
      o.hand = res ? hand - 1 : hand;
      var uses = (o.target || []).concat(o.look || []).some(function (n) { return PICK_NAMES.indexOf(n) >= 0; }) || PICK_NAMES.indexOf(o.point) >= 0 || !!(o.allow && o.allow.pick);
      var P = uses ? pickSpec(picks[o.hand - 1]) : null;
      if (P) {
        o.target = (o.target || []).map(function (n) { return subPick(n, P); });
        if (o.look) o.look = o.look.map(function (n) { return subPick(n, P); });
        if (o.point) o.point = subPick(o.point, P);
        if (o.allow && o.allow.pick) {
          var al = {}, add = o.allow.throw ? P.shot : P.lift;
          for (var q in o.allow) if (q !== 'pick') al[q] = o.allow[q];
          for (var r in add) al[r] = add[r];
          o.allow = al;
        }
        o.pick = picks[o.hand - 1];
      }
      if (o.allow && o.allow.throw) hand++;
      return o;
    });
  }
  // 丟出去的那一步（這一手的最後一個操作：點屬性鈕）
  function isCommit(s) { return !!(s && s.allow && s.allow.throw); }
  // 點那張的那一步（手牌疊著時先攤開）
  function isLift(s) { return !!(s && s.kind === 'do' && s.allow && !s.allow.throw && (s.allow.card || s.allow.ace)); }
  // 結算浮框出現時才講的說明步（第 6 步：「剋中：用你那顆星扣他。」）
  function atResolve(s) { return !!(s && s.kind === 'say' && (s.target || []).indexOf('result') >= 0); }
  // 第 n 手從哪一步開始（hand 1 → 0；每過一個 commit 加一手；結算時講的那步算前一手）
  function stepForHand(steps, n) {
    var hand = 1, k = 0;
    n = Math.max(1, n | 0);
    for (; k < steps.length && hand < n; k++) {
      if (isCommit(steps[k])) { hand++; while (k + 1 < steps.length && atResolve(steps[k + 1])) k++; }
    }
    return k;
  }
  function starOf(card, a) { return card ? (card[a] | 0) : 0; }
  function aceAxisOf(duel, C) {
    var ace = duel && duel.p && duel.p.ace;
    if (!ace) return null;
    if (C && C.aceAxis && ace.tier && C.aceAxis[ace.tier]) return C.aceAxis[ace.tier];
    return ATTRS.reduce(function (b, a) { return starOf(ace, a) > starOf(ace, b) ? a : b; }, 'c');
  }
  // 那一色最大的星（只看手牌、不含王牌；並列取最左）＝duel.js el('chip:best:<attr>')
  function bestChipOf(duel, attr, Eng) {
    if (Eng && typeof Eng.bestChip === 'function') { try { return Eng.bestChip(duel, attr) || null; } catch (_) {} }
    var hand = (duel && duel.p && duel.p.hand) || [], b = null, bs = -1;
    hand.forEach(function (c, i) { if (c && starOf(c, attr) > bs) { bs = starOf(c, attr); b = { i: i, attr: attr }; } });
    return b;
  }
  function chipOk(spec, a, ctx) {
    if (!spec || !a) return false;
    ctx = ctx || {};
    if (spec.attr && a.attr !== spec.attr) return false;
    if (spec.id) return a.id === spec.id && a.i !== undefined;                                   // 那一張（＋spec.attr 那一色）
    if (spec.blocked) { var bk = ctx.blocked && ctx.blocked[spec.blocked]; return a.attr === spec.blocked && !!bk && a.i === bk.i; }   // engine.blockedChoice 那張
    var i = spec.i == null ? 'any' : spec.i;
    if (i === 'any') return a.i === 'ace' ? (!!ctx.aceLive && ctx.aceAxis === a.attr) : (typeof a.i === 'number');
    if (i === 'best') { var b = ctx.best && ctx.best[a.attr]; return !!b && !b.ace && a.i === b.i; }
    if (i === 'ace') return a.i === 'ace';
    return a.i === i;
  }
  // 這一步放不放行這個動作（不含「看一眼」：info／close 由 runner 另外處理）
  function matches(step, a, ctx) {
    var al = step && step.allow; if (!al || !a) return false;
    ctx = ctx || {};
    switch (a.kind) {
      case 'card':      // 攤開後點封面＝浮起這張
        if (al.card) {
          if (al.card.blocked) { var bk = ctx.blocked && ctx.blocked[al.card.blocked]; return !!bk && a.i === bk.i; }   // engine.blockedChoice 那張
          return a.id === al.card.id;
        }
        if (al.ace) return a.i === 'ace';
        return !!al.chip && chipOk(al.chip, a, ctx);
      case 'chip': return !!al.chip ? chipOk(al.chip, a, ctx) : (!!al.ace && a.i === 'ace');
      case 'throw':     // 點屬性鈕＝丟
        if (!al.throw) return false;
        if (al.chip) return chipOk(al.chip, a, ctx);                       // 那一張的那一色
        if (al.ace) return a.i === 'ace';
        if (ctx.pick) return a.i === ctx.pick.i && a.attr === ctx.pick.attr;  // 丟的就是上一步點的那顆
        return true;
      case 'info': return !!al.info && al.info === a.where;
      case 'close': return !!al.close;
    }
    return false;
  }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }

  // 腳本狀態機：DOM 控制器與 Node 測試共用。不碰 DOM、不讀 duel.intent。
  //   state：'run' 進行中｜'done' 十步走完（或教學中就把他打倒）｜'skipped' 跳過｜'released' 放手（目標沒出現、教學中輸了）
  function createRunner(C, tier, duel, opts) {
    opts = opts || {};
    var Eng = opts.engine || null;
    var steps = stepsFor(C, tier);
    var learnedMap = (C.tutorial && C.tutorial.learned) || {};
    var R = {
      tier: tier, duel: duel, steps: steps, idx: 0, state: 'run', awaiting: false, commitN: 0, pick: null, picked: false,
      learnedIds: [], learnQ: [], ctx: null, last: null, log: []
    };
    R.cur = function () { return R.state === 'run' ? (steps[R.idx] || null) : null; };
    R.next = function () { return steps[R.idx] || null; };
    R.active = function () { return R.state === 'run'; };
    function learn(id, quiet) {
      if (!id || !learnedMap[id] || R.learnedIds.indexOf(id) >= 0) return;
      R.learnedIds.push(id);
      if (!quiet) R.learnQ.push(id);
    }
    R.learn = learn;
    // 第 n 手開始（重掛、續玩）：前面的步驟算學過了（不飛小卡）
    R.startAt = function (n) {
      R.idx = stepForHand(steps, n);
      for (var j = 0; j < R.idx; j++) if (steps[j].learn) learn(steps[j].learn, true);
      if (R.idx >= steps.length) R.state = 'done';
      return R;
    };
    R.context = function () {
      var best = {};
      ATTRS.forEach(function (a) { best[a] = bestChipOf(R.duel, a, Eng); });
      var P = R.duel && R.duel.p;
      var blocked = {};
      ATTRS.forEach(function (a) { var b = null; if (Eng && typeof Eng.blockedChoice === 'function') { try { b = Eng.blockedChoice(R.duel, a); } catch (_) { b = null; } } blocked[a] = b; });
      R.ctx = { best: best, blocked: blocked, pick: R.pick, aceLive: !!(P && P.ace && !P.aceUsed), aceAxis: aceAxisOf(R.duel, C) };
      return R.ctx;
    };
    R.begin = function () { var s = R.cur(); if (!s) return null; R.picked = false; R.context(); return s; };
    // 點了什麼 → 放不放行。R.last＝{ ok, final, commit, wrong:'target'|null, note }
    R.gate = function (a) {
      if (R.state !== 'run') { R.last = { ok: true, free: true }; return true; }
      if (!a) { R.last = { ok: false, wrong: 'target' }; return false; }
      if (a.kind === 'close' || a.kind === 'info') {
        // 看一眼唱片資訊不算錯（說明步有整片接點層，點不到封面）；等著它的步驟（allow.info／close）才算完成
        var s0 = R.cur();
        if (s0 && !R.awaiting && s0.kind !== 'say' && matches(s0, a, R.ctx || R.context())) { R.last = { ok: true, final: true }; R.done(); return true; }
        R.last = { ok: true, note: true }; return true;
      }
      if (a.kind === 'collapse') { R.last = { ok: false, quiet: true }; return false; }   // 教學中手牌不收回（手指指著的東西不會不見）；不算點錯
      var s = R.cur();
      if (!s || R.awaiting || s.kind === 'say') { R.last = { ok: false, wrong: 'target' }; R.log.push('block ' + (s ? s.id : '-') + ' ' + JSON.stringify(a)); return false; }
      if (a.kind === 'spread') {    // 點那張的步驟：先攤開（放行，但這一步還沒完成）
        if (isLift(s)) { R.last = { ok: true, final: false, spread: true }; R.log.push('spread ' + s.id); return true; }
        R.last = { ok: false, wrong: 'target' }; R.log.push('block ' + s.id + ' spread'); return false;
      }
      if (s.kind === 'soft') {      // 第 10 步：建議，不擋；任何一個動作就算看過了
        R.log.push('soft ' + s.id + ' ' + a.kind);
        R.last = { ok: true, final: true, soft: true };
        R.done();
        return true;
      }
      var ctx = R.ctx || R.context();
      if (!matches(s, a, ctx)) {
        R.last = { ok: false, wrong: 'target' };
        R.log.push('block ' + s.id + ' ' + JSON.stringify(a));
        return false;
      }
      if (a.kind === 'chip' || a.kind === 'card') {
        R.pick = { i: a.i, attr: a.attr }; ctx.pick = R.pick;
        if (s.allow.throw) { R.picked = true; R.last = { ok: true, final: false }; R.log.push('pick ' + s.id); return true; }   // 第 9 步：先點一顆，丟了才算
        R.last = { ok: true, final: true }; R.log.push('ok ' + s.id + ' ' + a.kind); R.done(); return true;
      }
      if (a.kind === 'throw') {
        R.awaiting = true; R.commitN = (R.duel && R.duel.n) | 0;
        R.last = { ok: true, final: true, commit: true };
        R.log.push('ok ' + s.id + ' throw');
        R.done();
        return true;
      }
      R.last = { ok: true, final: true }; R.done(); return true;
    };
    R.done = function () {      // 這一步完成 → 下一步
      var s = R.cur(); if (!s) return null;
      if (s.learn) learn(s.learn);
      R.idx++; R.picked = false;
      if (R.idx >= steps.length && !R.awaiting) R.state = 'done';
      return s;
    };
    // 引擎結算完（duel.js tut.onResolved）。分出勝負：贏＝教學完成（還沒學到的小卡一起飛）；輸＝放手
    R.resolved = function (evs) {
      var over = (evs || []).find(function (e) { return e && e.t === 'over'; });
      if (over && R.state === 'run') {
        if (over.win) { steps.forEach(function (s) { if (s.learn) learn(s.learn); }); R.state = 'done'; }
        else R.state = 'released';
        R.awaiting = false;
      }
      return over || null;
    };
    R.handReady = function () { R.awaiting = false; R.pick = null; if (R.idx >= steps.length && R.state === 'run') R.state = 'done'; };
    R.release = function () { if (R.state === 'run') R.state = 'released'; };
    R.skip = function () { if (R.state === 'run') R.state = 'skipped'; };
    if (opts.from != null) R.startAt(opts.from);
    else if (duel && (duel.n | 0) > 1) R.startAt(duel.n | 0);
    return R;
  }

  // 峰值那軸，並列 c→o→h（＝engine.topAttr）
  function topOf(card, Eng) {
    if (Eng && typeof Eng.topAttr === 'function') { try { return Eng.topAttr(card); } catch (_) {} }
    return ATTRS.reduce(function (b, a) { return starOf(card, a) > starOf(card, b) ? a : b; }, 'c');
  }
  // 「重看教學」的包包：老闆四張＋特價箱三張（上次序章挑的那三張還在特價箱的話用那三張；不然依 topAttr 取 c、o、h 各第一張——固定、可重現）
  function replayBag(C, tier, last, Eng) {
    var gifts = ((C.gifts || {})[tier] || []).slice();
    var pool = ((C.bargain || {}).pool || []).filter(function (id) { return C.cards && C.cards[id]; });
    var okLast = Array.isArray(last) && last.length === 3 && last.every(function (id, k) { return pool.indexOf(id) >= 0 && last.indexOf(id) === k; });
    var extra = okLast ? last.slice() : ATTRS.map(function (a) { return pool.filter(function (id) { return topOf(C.cards[id], Eng) === a; })[0]; }).filter(Boolean);
    return gifts.concat(extra);
  }
  // 「重看教學」用的一場（照劇本開；ui.js mount 它、再叫 startDuelLesson({tier, replay:true})）
  function replayDuel(C, tier, seed, Eng, o) {
    Eng = Eng || (typeof window !== 'undefined' ? window.DipLabEngine : null);
    if (!Eng) throw new Error('DipLabTut.replayDuel: 沒有 DipLabEngine');
    tier = TIERS.indexOf(tier) >= 0 ? tier : 'hall';
    var bag = replayBag(C, tier, o && o.bargain, Eng);
    var pDef = Eng.playerDef(C, { bag: bag, ace: tier, relics: [] });
    var eDef = Eng.enemyDef(C, C.prologueEnemy || 'man', { tutorial: true });
    return Eng.startDuel(pDef, eDef, { seed: (seed >>> 0) || 7, script: C.tutorial.script[tier] });
  }

  var core = { TIERS: TIERS, stepsFor: stepsFor, textOf: textOf, pickSpec: pickSpec, isCommit: isCommit, isLift: isLift, atResolve: atResolve, stepForHand: stepForHand,
    bestChipOf: bestChipOf, chipOk: chipOk, matches: matches, createRunner: createRunner, replayBag: replayBag, replayDuel: replayDuel, clone: clone };

  if (typeof module === 'object' && module.exports) { module.exports = core; return; }
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // ================================================================== 瀏覽器：遮罩、洞、泡泡、手指
  var W = window;
  var HAND = ['...kk....', '..kwwk...', '..kwwk...', '..kwwkkk.', '.kkwwwwwk', 'kwkwwwwwk', 'kwwwwwwwk', '.kwwwwwk.', '..kkkkk..'];
  var OWNER_HEAD = ['................', '.....dddddd.....', '....dddddddd....', '....dssssssd....', '....ekkeekke....', '....sdssssds....', '.....dddddd.....'];
  var PAD = 4;
  var SAY_ARM_RESOLVE_MS = 1000;   // 結算時講的說明：連點中的一下（間隔 <400 ms）要等它出現滿 1 秒才算「看完了」（RV11-4）
  var SWALLOW_MS = 350;      // 換步之後這麼短的時間內點錯＝上一步的連點，不罵、不震，只是不放行（B-duel-doubletap）
  var TIP_MS = 5000;         // 一次性小提示停多久（SPEC-v3 §6）
  var READ_MS = 1200;        // 至少要在畫面上這麼久才算看過（NP-05）
  var CFG = { stage: null, save: null, persist: null, content: null, onEnd: null };
  var S = {
    root: null, tipRoot: null, lesson: null, runner: null, armed: 0, show: null, raf: 0, sig: '',
    softQ: [], soft: null, tipQ: [], tip: null, replayDuel: null, memSeen: {}, learnBusy: Promise.resolve(), learnedAll: [], lastStepAt: 0
  };
  var Cn = function () { return CFG.content || W.DipLabContent || {}; };
  var Duel = function () { return W.DipLabDuel || null; };
  var Eng = function () { return W.DipLabEngine || null; };
  var Fx = function () { return W.DipLabFx || null; };
  var sfx = function (n, o) { var f = Fx(); if (f && f.sfx) try { f.sfx(n, o); } catch (_) {} };
  var rm = function () { try { var f = Fx(); if (f && f.reducedMotion) return !!f.reducedMotion(); return !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; } };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); };
  var UI = function () { var T = Cn().tutorial || {}; return T.ui || {}; };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var now = function () { return (W.performance && performance.now) ? performance.now() : Date.now(); };

  // ---------------------------------------------------------------- 像素圖
  function pix(rows, size) {
    if (typeof W.pixArtHTML === 'function') { try { return W.pixArtHTML(rows, size); } catch (_) {} }
    var PAL = { k: '#111', w: '#fff', d: '#888', s: '#e8b48c', e: '#d8d8d8', n: '#2e7d52' };
    var w = rows[0].length, h = rows.length, r = '';
    rows.forEach(function (row, y) { for (var x = 0; x < row.length; x++) { var c = PAL[row[x]]; if (c) r += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + c + '"/>'; } });
    return '<svg class="pixicon" width="' + size + '" height="' + Math.round(size * h / w) + '" viewBox="0 0 ' + w + ' ' + h + '" shape-rendering="crispEdges" aria-hidden="true">' + r + '</svg>';
  }
  var ownerHeadHTML = null;
  function ownerHead() {
    if (ownerHeadHTML) return ownerHeadHTML;
    var rows = OWNER_HEAD;
    if (typeof W.sprRows === 'function') {
      try { rows = W.sprRows(OWNER_HEAD, 'w', 'd', { 8: '...wnnnnnnnnw...', 9: '...snnnnnnnns...', 10: '...snnnnnnnns...', 11: '....nnnnnnnn....' }).slice(0, 10); } catch (_) {}
    }
    ownerHeadHTML = pix(rows, 30);
    return ownerHeadHTML;
  }

  // ---------------------------------------------------------------- DOM 骨架
  function ensureRoot() {
    var r = document.getElementById('tut');
    if (!r) { r = document.createElement('div'); r.id = 'tut'; document.body.appendChild(r); }
    if (!r.__tut) {
      r.__tut = true;
      r.setAttribute('aria-live', 'polite');
      r.innerHTML =
        '<svg class="tut-mask" aria-hidden="true" preserveAspectRatio="none"><path class="m" fill-rule="evenodd"/><path class="lk"/><rect class="tb"/></svg>' +
        '<div class="tut-catch" hidden></div>' +
        '<div class="tut-rings"></div>' +
        '<div class="tut-fx"></div>' +
        '<div class="tut-bub" hidden><span class="av"></span><span class="who"></span><span class="tx"></span><span class="nx" aria-hidden="true">▼</span></div>' +
        '<div class="tut-hand" hidden aria-hidden="true"></div>' +
        '<button type="button" class="tut-skip" hidden></button>';
      var q = function (s) { return r.querySelector(s); };
      r._ = { svg: q('.tut-mask'), path: q('.tut-mask .m'), lk: q('.tut-mask .lk'), tb: q('.tut-mask .tb'), catcher: q('.tut-catch'), rings: q('.tut-rings'), fx: q('.tut-fx'),
        bub: q('.tut-bub'), tx: q('.tut-bub .tx'), who: q('.tut-bub .who'), av: q('.tut-bub .av'), hand: q('.tut-hand'), skip: q('.tut-skip') };
      r._.av.innerHTML = ownerHead();
      r._.hand.innerHTML = pix(HAND, 27);
      r._.path.addEventListener('pointerdown', onMaskDown);
      r._.path.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); });
      // 只給看的洞（他的星、三角）：亮著，但點下去＝點錯，不穿過去（ART-01）
      r._.lk.addEventListener('pointerdown', onMaskDown);
      r._.lk.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); });
      // 說明步用 click（整個點擊結束才換下一步）：用 pointerdown 的話，iOS 隨後補發的 click 會落到下一步才露出來的目標上
      r._.catcher.addEventListener('pointerdown', function (e) { e.preventDefault(); });
      r._.catcher.addEventListener('click', onCatchTap);
      // 每一下按下的間隔（不管按在哪：揭曉時連點盤面加速的那串也算）：分辨「連點中的一下」與「停下來再點」（RV11-4）
      document.addEventListener('pointerdown', function (e) { var t = now(); S.downGap = S.lastDown ? t - S.lastDown : 1e9; S.lastDown = t; S.lastXY = { x: e.clientX, y: e.clientY }; }, true);
      r._.skip.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
      r._.skip.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); api.skip(); });
    }
    S.root = r;
    return r;
  }
  function appRect() {
    var a = document.getElementById('app');
    var r = a ? a.getBoundingClientRect() : null;
    if (!r || !r.width) return { left: 0, right: W.innerWidth, width: W.innerWidth, top: 0, bottom: W.innerHeight, height: W.innerHeight };
    return r;
  }
  function topBottom() {
    var t = document.getElementById('top');
    var r = t ? t.getBoundingClientRect() : null;
    return r && r.height ? Math.max(0, r.bottom) : 0;
  }

  // ---------------------------------------------------------------- 目標 → 元素／矩形
  function stageApi() { return (S.lesson && S.lesson.stage) || CFG.stage || null; }
  function resolveTarget(name) {
    if (!name) return null;
    if (typeof name !== 'string') return name;     // Element 或 DOMRect
    var D = Duel(), el = null;
    if (name.indexOf('shop:') === 0) {
      var st = stageApi();
      if (st && typeof st.hotRect === 'function') { try { return st.hotRect(name.slice(5)); } catch (_) { return null; } }
      return null;
    }
    if (name.indexOf('tile:') === 0) {      // 那顆星鈕（或封面）所在的整格
      var inner = resolveTarget(name.slice(5));
      return inner && inner.closest ? (inner.closest('.tile') || inner) : inner;
    }
    if (name === 'info-close') return document.querySelector('#cardInfoMask [data-tut="info-close"]') || document.querySelector('#cardInfoMask #ciClose') || null;
    if (name[0] === '@') {
      if (D && D.el) el = D.el(name);
      if (!el) { var s2 = stageApi(); if (s2 && s2.anchor) try { el = s2.anchor(name.slice(1)); } catch (_) {} }
      return el;
    }
    if (/^[.#\[]/.test(name)) return document.querySelector(name);
    if (D && D.el) { try { el = D.el(name); } catch (_) { el = null; } }      // data-tut 名、'chip:best:o'、'card:<id>'
    if (el) return el;
    var dl = document.querySelector('.dl');
    return (dl && dl.querySelector('[data-tut="' + name + '"]')) || document.querySelector('[data-tut="' + name + '"]');
  }
  function rectOf(t) {
    if (!t) return null;
    var r = (typeof t.getBoundingClientRect === 'function') ? t.getBoundingClientRect() : t;
    if (!r || !(r.width > 0) || !(r.height > 0)) return null;
    if (t.nodeType === 1) {
      if (t.hidden || t.closest('[hidden]')) return null;
      var cs = W.getComputedStyle(t); if (cs.visibility === 'hidden' || cs.display === 'none') return null;
    }
    return { left: r.left, top: r.top, right: r.left + r.width, bottom: r.top + r.height, width: r.width, height: r.height };
  }
  // 星鈕：看得見的框是 ::after（上下各縮 6px），洞照看得見的框挖，金框才不會比按鈕大一圈
  function visRect(t) {
    var r = rectOf(t); if (!r) return null;
    if (t && t.nodeType === 1 && t.classList && t.classList.contains('chip')) {
      try { var cs = W.getComputedStyle(t, '::after'), top = parseFloat(cs.top), bot = parseFloat(cs.bottom); if (top > 0 && bot > 0 && r.height - top - bot > 12) { r.top += top; r.bottom -= bot; r.height = r.bottom - r.top; } } catch (_) {}
    }
    return r;
  }
  // 疊著的手牌整疊的外框（洞只框那一疊，不框整個手牌區的空白；點那一疊＝攤開）
  function stackRect() {
    var D = Duel(), h = D && D.el ? D.el('hand') : null; if (!h) return null;
    var u = null;
    [].forEach.call(h.querySelectorAll('.tile:not(.gone)'), function (t) { var r = rectOf(t); if (r) u = u ? union(u, r) : r; });
    return u;
  }
  // 疊著的手牌裡某一張露出來的那一條：從這張左緣到下一張（蓋在上面）左緣
  function stripRect(t) {
    var tile = t && t.closest ? t.closest('.tile') : null; if (!tile) return null;
    var r = rectOf(tile); if (!r) return null;
    for (var nx = tile.nextElementSibling; nx; nx = nx.nextElementSibling) {
      if (!nx.classList || !nx.classList.contains('tile') || nx.classList.contains('gone')) continue;
      var q = rectOf(nx); if (q && q.left > r.left + 4 && q.left < r.right) r = { left: r.left, top: r.top, right: q.left, bottom: r.bottom, width: q.left - r.left, height: r.height };
      break;
    }
    return r;
  }
  function pad(r, p) { return { left: r.left - p, top: r.top - p, right: r.right + p, bottom: r.bottom + p, width: r.width + 2 * p, height: r.height + 2 * p }; }
  function inter(a, b) { return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom; }
  function union(a, b) { var l = Math.min(a.left, b.left), t = Math.min(a.top, b.top), r = Math.max(a.right, b.right), bt = Math.max(a.bottom, b.bottom); return { left: l, top: t, right: r, bottom: bt, width: r - l, height: bt - t }; }
  // 洞重疊時（evenodd 會把重疊那塊又塗黑）：只是外擴碰在一起的，從中間切開；真的疊在一起的才合併成一個
  function mergeRects(list) {
    var out = list.map(function (r) { return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, look: r.look }; }), again = true, guard = 0;
    while (again && guard++ < 50) {
      again = false;
      for (var i = 0; i < out.length && !again; i++) for (var j = i + 1; j < out.length; j++) {
        var a = out[i], b = out[j]; if (!inter(a, b)) continue;
        var ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (oy <= 12 && oy <= ox) { var up = a.top <= b.top ? a : b, dn = up === a ? b : a, my = (Math.max(a.top, b.top) + Math.min(a.bottom, b.bottom)) / 2; up.bottom = my; dn.top = my; }
        else if (ox <= 12) { var lf = a.left <= b.left ? a : b, rt = lf === a ? b : a, mx = (Math.max(a.left, b.left) + Math.min(a.right, b.right)) / 2; lf.right = mx; rt.left = mx; }
        else { var u = union(a, b); u.look = a.look && b.look; out[i] = u; out.splice(j, 1); }
        again = true; break;
      }
    }
    return out.map(function (r) { return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.right - r.left, height: r.bottom - r.top, look: !!r.look }; });
  }

  // ---------------------------------------------------------------- 一步畫面（show）：mode say｜do｜soft｜wait｜fx｜hide
  // show = { mode, targets:[...], look:[...], point:name|null, keep:[...], text, bubble, dim, onTap?, step }
  function setShow(sh) {
    ensureRoot();
    // 步驟之間的短暫等待：保留上一步的壓暗與洞（不閃一下全亮），只收泡泡和手指
    if (sh && sh.mode === 'wait' && sh.keepMask && S.show && S.show.targets && (S.show.mode === 'say' || S.show.mode === 'do' || (S.show.mode === 'wait' && S.show.dim))) {
      sh.targets = S.show.targets; sh.look = S.show.look; sh.dim = true;
    }
    S.show = sh; S.sig = '';
    var R = S.root._;
    clearTimeout(wrongT); R.bub.classList.remove('warn');
    if (!sh || sh.mode === 'hide') {
      S.root.className = '';
      R.svg.style.display = 'none'; R.catcher.hidden = true; R.bub.hidden = true; R.hand.hidden = true; R.rings.innerHTML = ''; R.skip.hidden = true;
      if (!S.tip) stopLoop();
      return;
    }
    S.root.className = 'on m-' + sh.mode + (rm() ? ' rm' : '');
    R.svg.style.display = ((sh.mode === 'wait' && !sh.dim) || sh.mode === 'fx') ? 'none' : '';
    R.svg.setAttribute('class', 'tut-mask' + (sh.mode === 'soft' ? ' soft' : '') + (sh.mode === 'do' ? ' block' : ''));
    R.catcher.hidden = !(sh.mode === 'say' || sh.mode === 'wait');
    R.catcher.className = 'tut-catch' + (sh.mode === 'wait' ? ' clear' : '');
    R.skip.hidden = !(S.lesson && S.runner && S.runner.active()) || sh.mode === 'fx';
    R.skip.textContent = UI().skipTut || '跳過教學';
    if (sh.text != null) {
      R.who.textContent = UI().who || '老闆';
      setText(sh.text, sh.colorChars);
      R.bub.hidden = false;
      R.bub.querySelector('.nx').style.display = sh.mode === 'say' ? '' : 'none';
      R.bub.setAttribute('data-step', sh.step ? sh.step.id || '' : '');
      if (!rm()) try { R.bub.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 160, easing: 'ease-out' }); } catch (_) {}
    } else { R.bub.hidden = true; R.bub.setAttribute('data-step', ''); }
    R.hand.hidden = !sh.point;
    sh.shownAt = now();
    startLoop();
    layout(true);
  }
  function colorize(text, chars) {
    var h = esc(text).replace(/(經典|冷門|硬蕊)/g, function (m) { return '<b class="' + { '經典': 'c', '冷門': 'o', '硬蕊': 'h' }[m] + '">' + m + '</b>'; });
    if (chars) h = h.replace(/(^|[^>])([經冷硬])(?![典門蕊<])/g, function (m, a, ch) { return a + '<b class="' + { '經': 'c', '冷': 'o', '硬': 'h' }[ch] + '">' + ch + '</b>'; });
    return h;
  }
  function setText(t, chars) { var R = S.root._; R.tx.innerHTML = colorize(t, chars); S.sig = ''; }
  function startLoop() { if (!S.raf) S.raf = requestAnimationFrame(tick); }
  function stopLoop() { if (S.raf) cancelAnimationFrame(S.raf); S.raf = 0; }
  function tick() {
    S.raf = 0;
    var anyShow = S.show && S.show.mode !== 'hide';
    if (!anyShow && !S.tip) return;
    // 盤面收掉（⏸ 回標題、重新開始…）或換成別場對決：這堂課作廢（B-stale-lesson-hijack）
    if (S.lesson && !S.lesson.dead && (!duelApi() || staleLesson())) { endLesson('aborted'); return; }
    // 對決中的提示：盤面收掉就收
    if (S.soft && S.soft.kind === 'duel' && !duelApi()) { dismissSoft('gone'); return; }
    // 對決以外的提示（今晚來客）：它指的東西不見了（換畫面了）就收掉，不帶進對決（B-map-hint-leak）
    if (S.soft && S.soft.kind !== 'duel' && !S.lesson && softTargetsGone(S.soft)) { dismissSoft('gone'); return; }
    if (S.tip && !duelApi()) hideTip('gone');
    else if (S.tip && duelPhase() && duelPhase() !== 'choose') hideTip('next');     // 你丟出去了：下一手的演出不要被泡泡蓋住（R-01）
    if (anyShow) layout(false);
    if (S.tip) layoutTip(false);
    if ((S.show && S.show.mode !== 'hide') || S.tip) S.raf = requestAnimationFrame(tick);
  }
  // 現在盤面上那場不是這堂課的那場
  function staleLesson() {
    var L = S.lesson; if (!L || L.dead) return false;
    var a = duelApi(); if (!a || !a.duel) return false;
    var d = null; try { d = a.duel(); } catch (_) { return false; }
    return !!d && d !== L.R.duel;
  }
  function softTargetsGone(cur) {
    if (!cur || !cur.targets || !cur.targets.length || !cur.shownAt || now() - cur.shownAt < 600) return false;
    return !rectOf(resolveTarget(cur.targets[0]));
  }

  function holesFor(sh) {
    var rs = [], look = sh.look || [];
    (sh.targets || []).concat(look.filter(function (n) { return (sh.targets || []).indexOf(n) < 0; })).forEach(function (n) {
      var r = (n === 'hand' && sh.stacked && stackRect()) || visRect(resolveTarget(n)); if (!r) return;
      r = pad(r, sh.pad == null ? PAD : sh.pad);
      r.look = look.indexOf(n) >= 0 && (sh.targets || []).indexOf(n) < 0;
      rs.push(r);
    });
    return mergeRects(rs);
  }
  function layout(force) {
    var sh = S.show; if (!sh || !S.root) return;
    var R = S.root._, vw = W.innerWidth, vh = W.innerHeight;
    var holes = holesFor(sh);
    var keep = (sh.keep || []).map(function (n) { return rectOf(resolveTarget(n)); }).filter(Boolean);
    // 手牌疊著時（sh.pointAt＝那一課的封面）：手指指那張露出來的那一條（點那一條＝點整疊＝攤開）
    var pt = sh.point && sh.pointAt ? stripRect(resolveTarget(sh.pointAt)) : null;
    if (!pt && sh.point) pt = visRect(resolveTarget(sh.point));
    var tb = topBottom();
    var sig = vw + 'x' + vh + '|' + tb + '|' + holes.map(function (h) { return [h.left, h.top, h.width, h.height].map(Math.round).join(',') + (h.look ? 'L' : ''); }).join(';') + '|' + (pt ? [pt.left, pt.top].map(Math.round).join(',') : '') +
      '|' + keep.map(function (k) { return Math.round(k.top) + ',' + Math.round(k.bottom); }).join(';') + '|' + R.tx.textContent;
    if (!force && sig === S.sig) return;
    S.sig = sig;
    sh.holes = holes;
    // 遮罩：外框減掉每個洞（evenodd）；頂欄另外一塊只壓暗、不吃點擊（⏸、? 隨時按得到）
    R.svg.setAttribute('viewBox', '0 0 ' + vw + ' ' + vh);
    R.svg.setAttribute('width', vw); R.svg.setAttribute('height', vh);
    var d = 'M0 ' + tb + 'H' + vw + 'V' + vh + 'H0Z', dl = '';
    holes.forEach(function (h) {
      var t = Math.max(tb, h.top), b = Math.min(vh, h.bottom), l = Math.max(0, h.left), r = Math.min(vw, h.right); if (b <= t || r <= l) return;   // 洞不能超出外框（evenodd 會把外面塗黑）
      var rect = 'M' + l.toFixed(1) + ' ' + t.toFixed(1) + 'h' + (r - l).toFixed(1) + 'v' + (b - t).toFixed(1) + 'h' + (l - r).toFixed(1) + 'Z';
      d += rect;
      if (h.look || sh.mode === 'say') dl += rect;      // 透明蓋子：看得到、點不穿
    });
    R.path.setAttribute('d', d);
    if (dl) R.lk.setAttribute('d', dl); else R.lk.removeAttribute('d');
    R.tb.setAttribute('x', 0); R.tb.setAttribute('y', 0); R.tb.setAttribute('width', vw); R.tb.setAttribute('height', tb);
    R.catcher.style.top = tb + 'px';
    // 金框（只給要點的洞與說明步的目標；只給看的洞不框，免得以為要點它）
    var ringHTML = '';
    if (sh.mode !== 'wait' && sh.mode !== 'fx') holes.forEach(function (h) { if (h.look) return; ringHTML += '<div class="tut-ring" style="left:' + h.left.toFixed(1) + 'px;top:' + h.top.toFixed(1) + 'px;width:' + h.width.toFixed(1) + 'px;height:' + h.height.toFixed(1) + 'px"></div>'; });
    if (R.rings.innerHTML !== ringHTML) R.rings.innerHTML = ringHTML;
    // 手指：指尖落在目標中心偏右下（不蓋住數字）；HAND 的指尖在圖的 (12,1)
    if (pt && sh.point) {
      R.hand.hidden = false;
      var tipX = pt.left + pt.width / 2 + Math.min(pt.width * 0.22, 26), tipY = pt.top + pt.height / 2 + Math.min(pt.height * 0.2, 12);
      R.hand.style.left = Math.round(Math.min(vw - 28, tipX - 12)) + 'px';
      R.hand.style.top = Math.round(Math.min(vh - 28, tipY - 1)) + 'px';
    } else R.hand.hidden = true;
    var ar = appRect();
    placeSkip(R.skip, ar, tb, vw);
    if (!R.bub.hidden) placeBubble(R.bub, sh, holes, keep, ar, tb);
  }
  // 「跳過教學」：放在頂欄裡、「?」的左邊（頂欄只壓暗不擋，這裡永遠不會跟泡泡或洞打架）；
  // 頂欄擠不下（標題字太長）就退回舞台右上角
  function placeSkip(b, ar, tb, vw) {
    if (b.hidden) return;
    var top = document.getElementById('top'), spot = null;
    var tr = top ? top.getBoundingClientRect() : null;
    if (tr && tr.height >= 26) {
      var bw = b.offsetWidth || 72, leftLim = tr.left + 8, rightLim = Math.min(tr.right, ar.right) - 8;
      var tt = top.querySelector('.tt');
      if (tt) { try { var rg = document.createRange(); rg.selectNodeContents(tt); var rr = rg.getBoundingClientRect(); if (rr.width) leftLim = rr.right + 10; } catch (_) {} }
      var bs = top.querySelectorAll('button, a, [role="button"], .ti, .lnk');
      for (var i = 0; i < bs.length; i++) { var r = bs[i].getBoundingClientRect(); if (r.width && r.left >= leftLim - 4 && r.left - 10 < rightLim) rightLim = r.left - 10; }
      if (rightLim - leftLim >= bw) spot = { left: Math.round(rightLim - bw), top: Math.round(tr.top + (tr.height - 24) / 2) };
    }
    if (spot) { b.classList.add('intop'); b.style.left = spot.left + 'px'; b.style.top = spot.top + 'px'; b.style.right = 'auto'; }
    else { b.classList.remove('intop'); b.style.left = 'auto'; b.style.top = (tb + 6) + 'px'; b.style.right = Math.max(8, Math.round(vw - ar.right + 8)) + 'px'; }
  }
  // 泡泡：先試貼著第一個洞（上或下），不壓到其他洞與 keep；放不下就放最大的空白帶
  function placeBubble(b, sh, holes, keep, ar, tb) {
    var left = Math.round(ar.left + 12), width = Math.round(ar.width - 24);
    b.style.left = left + 'px'; b.style.width = width + 'px';
    b.style.top = '0px'; b.classList.remove('up', 'down');
    var bh = b.offsetHeight || 60, vh = W.innerHeight;
    var minTop = tb + 4, maxBot = vh - 4;
    var first = null;
    for (var i = 0; i < holes.length; i++) if (!holes[i].look) { first = holes[i]; break; }
    first = first || holes[0] || null;
    var obst = holes.filter(function (h) { return h !== first; }).concat(keep);
    var ok = function (top) {
      if (top < minTop || top + bh > maxBot) return false;
      var box = { left: left, right: left + width, top: top, bottom: top + bh };
      for (var i = 0; i < obst.length; i++) if (inter(box, obst[i])) return false;
      if (first && inter(box, first)) return false;
      return true;
    };
    var top = null, dir = null;
    if (first && sh.bubble !== 'free') {
      var above = first.top - 12 - bh, below = first.bottom + 12;
      var down1 = sh.bubble === 'below' || ((!sh.bubble || sh.bubble === 'auto') && (first.top + first.bottom) / 2 < vh * 0.45);
      var order = down1 ? [['down', below], ['up', above]] : [['up', above], ['down', below]];
      for (var k = 0; k < order.length; k++) if (ok(order[k][1])) { dir = order[k][0]; top = order[k][1]; break; }
    }
    if (top == null) {   // 最大的空白帶，不畫箭頭
      var occ = holes.concat(keep).map(function (r) { return [Math.max(minTop, r.top), Math.min(maxBot, r.bottom)]; }).filter(function (x) { return x[1] > x[0]; }).sort(function (a, c) { return a[0] - c[0]; });
      var gaps = [], y = minTop;
      occ.forEach(function (o) { if (o[0] > y) gaps.push([y, o[0]]); y = Math.max(y, o[1]); });
      if (maxBot > y) gaps.push([y, maxBot]);
      gaps.sort(function (a, c) { return (c[1] - c[0]) - (a[1] - a[0]); });
      var g = gaps[0] || [minTop, maxBot];
      // 最上面那段空白＝舞台橫條＋他的名字與聲望：貼著頂欄放（蓋舞台，不蓋他的聲望條；矮螢幕 375×548 的第 9 步）
      if (g[0] <= minTop && g[1] - g[0] >= bh) top = minTop;
      else top = (g[1] - g[0] >= bh) ? Math.round(g[0] + (g[1] - g[0] - bh) / 2) : Math.round(Math.max(minTop, Math.min(maxBot - bh, g[0])));
    }
    b.style.top = Math.round(top) + 'px';
    if (dir && first) {
      b.classList.add(dir);
      var ax = Math.max(18, Math.min(width - 18, first.left + first.width / 2 - left));
      b.style.setProperty('--ax', Math.round(ax) + 'px');
    }
  }

  // ---------------------------------------------------------------- 點擊
  function onCatchTap(e) {
    e.preventDefault(); e.stopPropagation();
    var sh = S.show; if (!sh) return;
    // 結算時講的那句（k3「剋中：…」之類）：玩家常在揭曉時連點盤面加速，那串連點不能把這句點掉（RV11-4）——
    //   連點中的一下（跟上一下按下隔不到 400 ms）要等這句出現滿 1 秒才算；停了一下再點的照舊 280 ms 就收
    var age = now() - sh.shownAt, burst = S.downGap < 400;
    if (sh.mode === 'say' && sh.onTap && age > 280 && (!atResolve(sh.step) || !burst || age > SAY_ARM_RESOLVE_MS)) { var f = sh.onTap; sh.onTap = null; f(); }
  }
  function onMaskDown(e) {
    e.preventDefault(); e.stopPropagation();
    var sh = S.show; if (!sh) return;
    var q = sh.quiet;
    if (q && now() - q.t < SWALLOW_MS && Math.abs(e.clientX - q.x) < 24 && Math.abs(e.clientY - q.y) < 24) return;   // 雙擊攤開的第二下：不罵（點別的地方照罵）
    if (sh.mode === 'do') wrong('target');
  }
  function bump(el) {
    if (!el || rm() || !el.animate) return;
    try { el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 300, easing: 'steps(3,end)' }); } catch (_) {}
  }
  var wrongT = 0;
  function wrong() {
    var sh = S.show; if (!sh || !S.root || sh.mode !== 'do' || sh.text == null) return;
    if (sh.shownAt && now() - sh.shownAt < SWALLOW_MS) return;
    var R = S.root._;
    R.rings.querySelectorAll('.tut-ring').forEach(bump); bump(R.hand);
    setText(UI().wrong || '先點我指的這裡。', false); layout(true);
    R.bub.classList.add('warn');
    sfx('deny');
    clearTimeout(wrongT);
    wrongT = setTimeout(function () { if (S.show === sh) { R.bub.classList.remove('warn'); setText(sh.text, sh.colorChars); layout(true); } }, 1500);
  }

  // ---------------------------------------------------------------- 小動畫
  function A(el, kf, o) { if (!el || !el.animate) return null; try { return el.animate(kf, o); } catch (_) { return null; } }
  function setTri(lit) { var D = Duel(); if (D && typeof D.tri === 'function') try { D.tri(lit && lit.length ? lit : null); } catch (_) {} }
  function helpRect() {
    var el = document.querySelector('#top [data-tut="help"]') || document.querySelector('[data-tut="help"]') || document.querySelector('#top [data-a="help"]') || document.querySelector('#top [data-act="help"]');
    if (!el) { var bs = document.querySelectorAll('#top button'); for (var i = 0; i < bs.length; i++) if (/^[?？]$/.test((bs[i].textContent || '').trim())) { el = bs[i]; break; } }
    var r = el && rectOf(el);
    if (r) return r;
    var ar = appRect(); return { left: ar.right - 60, top: 4, right: ar.right - 36, bottom: 28, width: 24, height: 24 };
  }
  // 元素飛進頂欄「?」縮小；減少動態＝淡出
  function flyTo(el, to, ms) {
    if (!el) return Promise.resolve();
    var fr = el.getBoundingClientRect();
    if (rm() || !el.animate || !fr.width) { var a0 = A(el, [{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: 'forwards' }); return a0 ? a0.finished.catch(function () {}) : Promise.resolve(); }
    var dx = (to.left + to.width / 2) - (fr.left + fr.width / 2), dy = (to.top + to.height / 2) - (fr.top + fr.height / 2);
    var a = A(el, [{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px) scale(.12)', opacity: 0.4 }], { duration: ms || 300, easing: 'cubic-bezier(.5,0,.9,.6)', fill: 'forwards' });
    return a ? a.finished.catch(function () {}) : Promise.resolve();
  }
  // 「學會了：…」小卡：從牌桌浮出 → 飛進「?」（收進小抄）
  function learnCard(id) {
    var C = Cn(), title = C.tutorial && C.tutorial.learned && C.tutorial.learned[id];
    if (!title) return Promise.resolve();
    if (S.learnedAll.indexOf(title) < 0) S.learnedAll.push(title);
    markLearned(id);
    ensureRoot();
    var D = Duel(), tbl = rectOf(D && D.el ? D.el('table') : null), ar = appRect();
    var c = document.createElement('div');
    c.className = 'tut-learn';
    c.setAttribute('data-learn', id);
    c.innerHTML = '<small>' + esc(UI().learnedPrefix || '學會了：') + '</small><b>' + colorize(title, true) + '</b>';
    S.root._.fx.appendChild(c);
    var cw = c.offsetWidth, chh = c.offsetHeight;
    var cx = tbl ? tbl.left + tbl.width / 2 : ar.left + ar.width / 2, cy = tbl ? tbl.top + tbl.height / 2 : W.innerHeight / 2;
    // 打完了（第 6 手 KO）：盤面正中間是「品味勝出」大章——小卡放到牌桌上緣，不疊在大章上（V10）
    if (tbl && duelPhase() === 'over') cy = tbl.top + chh / 2 + 4;
    c.style.left = Math.round(cx - cw / 2) + 'px'; c.style.top = Math.round(cy - chh / 2) + 'px';
    sfx('slam');
    var p = (rm() ? Promise.resolve() : (function () { var a = A(c, [{ transform: 'scale(.6)', opacity: 0 }, { transform: 'scale(1.06)', opacity: 1, offset: 0.6 }, { transform: 'scale(1)', opacity: 1 }], { duration: 260, easing: 'ease-out' }); return a ? a.finished.catch(function () {}) : Promise.resolve(); })())
      .then(function () { return wait(rm() ? 650 : 760); })
      .then(function () { return flyTo(c, helpRect(), 300); })
      .then(function () { c.remove(); });
    S.learnBusy = S.learnBusy.then(function () { return p; });
    return p;
  }

  // ---------------------------------------------------------------- 存檔（ui.js 給的存檔物件；重看教學時不寫）
  function saveObj() { if (S.lesson && S.lesson.replay) return null; try { return CFG.save ? CFG.save() : null; } catch (_) { return null; } }
  function persist() { try { if (CFG.persist) CFG.persist(); } catch (e) { console.error(e); } }
  function markLearned(id) {
    var sv = saveObj(); if (!sv) return;
    sv.learned = sv.learned || {};
    if (!sv.learned[id]) { sv.learned[id] = true; persist(); }
  }
  function seen(id) {
    try { var sv = CFG.save && CFG.save(); if (sv && sv.seen && sv.seen[id]) return true; } catch (_) {}
    return !!S.memSeen[id];
  }
  function markSeen(id) {
    S.memSeen[id] = true;
    try { var sv = CFG.save && CFG.save(); if (sv) { sv.seen = sv.seen || {}; if (!sv.seen[id]) { sv.seen[id] = true; persist(); } } } catch (e) { console.error(e); }
  }

  // ---------------------------------------------------------------- 等待
  function duelApi() { var D = Duel(); return D && D.api ? D.api() : null; }
  function duelPhase() { var a = duelApi(); try { return a && a.phase ? a.phase() : null; } catch (_) { return null; } }
  function duelReady() {
    var a = duelApi(); if (!a) return false;
    var dbg = null; try { dbg = Duel().debug ? Duel().debug() : null; } catch (_) {}
    if (dbg && dbg.enterDone === false) return false;
    if (a.busy && a.busy()) return false;
    if (a.held && a.held()) return false;
    return duelPhase() === 'choose';
  }
  function entering() { return !!document.querySelector('.enc2, .enc-ov, .lb-duelwrap.entering'); }
  function until(fn, ms, every) {
    var L0 = S.lesson;
    return new Promise(function (res) {
      var t0 = now();
      (function poll() {
        if (L0 && L0.dead) return res(false);
        if (L0 && L0 === S.lesson && (!duelApi() || staleLesson())) { endLesson('aborted'); return res(false); }
        var v = false; try { v = fn(); } catch (_) {}
        if (v) return res(v);
        if (ms && now() - t0 > ms) return res(false);
        setTimeout(poll, every || 50);
      })();
    });
  }

  // ---------------------------------------------------------------- 序章對決的教學
  function startDuelLesson(o) {
    o = o || {};
    if (S.lesson) endLesson('aborted');
    var C = o.content || Cn();
    var D = o.duelApi || Duel();
    var a = D && D.api ? D.api() : null;
    var duel = a && a.duel ? a.duel() : (o.duel || null);     // 以盤面上那場為準
    if (!C.tutorial || !duel) { console.error('DipLabTut.startDuelLesson: 沒有 C.tutorial 或盤面上沒有對決'); return Promise.resolve('aborted'); }
    dismissSoft('lesson'); hideTip('lesson');
    var tier = TIERS.indexOf(o.tier) >= 0 ? o.tier : tierOf(duel, C);
    var R = createRunner(C, tier, duel, { engine: Eng(), from: o.from != null ? o.from : (duel.n | 0) });
    var L = { R: R, tier: tier, stage: o.stage || CFG.stage, replay: !!o.replay, dead: false, res: null, offs: [], held: 0, evs: null, step: null };
    L.promise = new Promise(function (res) { L.res = res; });
    S.lesson = L; S.runner = R; S.armed = 0;
    if (L.replay) S.replayDuel = duel;
    ensureRoot();
    // 續玩（重整後依 duel.n 接回來）：前面手數學過的小卡、教學中就把他打倒的那一場，都補寫進存檔（B-tut-done-not-persisted）
    if (duel.over && duel.over.win) R.resolved([{ t: 'over', win: true }]);
    R.learnedIds.forEach(function (id) { markLearned(id); });
    if (duel.over || R.state !== 'run') {      // 續玩：已經過了第 4 手（或打完了）＝教學早就走完
      R.learnedIds.forEach(function (id) { var t = C.tutorial.learned[id]; if (t && S.learnedAll.indexOf(t) < 0) S.learnedAll.push(t); });
      setTimeout(function () { if (S.lesson === L) endLesson(R.state === 'run' ? 'done' : (R.state === 'skipped' ? 'skipped' : R.state === 'released' ? 'released' : 'done')); }, 0);
      return L.promise;
    }
    R.learnedIds.forEach(function (id) { var t = C.tutorial.learned[id]; if (t && S.learnedAll.indexOf(t) < 0) S.learnedAll.push(t); });
    if (D && D.on) {
      L.offs.push(D.on('infoClosed', function () { kick(); }));
      L.offs.push(D.on('over', function () { kick(); }));
      L.offs.push(D.on('phase', function () { kick(); }));
      L.offs.push(D.on('spread', function () { kick(); if (L.step && L.step.refresh) setTimeout(function () { if (L.step && L.step.refresh) L.step.refresh(); }, 0); }));
    }
    setShow({ mode: 'wait' });
    run(L);
    return L.promise;
  }
  function tierOf(duel, C) {
    var ace = duel && duel.p && duel.p.ace;
    if (ace && ace.tier && TIERS.indexOf(ace.tier) >= 0) return ace.tier;
    var aces = (C && C.aces) || {};
    for (var t in aces) if (ace && aces[t] === ace.id) return t;
    return 'hall';
  }
  var kickers = [];
  function kick() { var k = kickers; kickers = []; k.forEach(function (f) { try { f(); } catch (_) {} }); }

  // hold 會把盤面上所有動畫停在原地：浮框剛開始放大（scale .3、透明）就被停住，老闆講解時看不到結果。浮框的進場動畫直接跳到終點
  function finishCallout() {
    var el = resolveTarget('result');
    if (!el || typeof el.getAnimations !== 'function') return;
    try { el.getAnimations({ subtree: true }).forEach(function (a) { try { a.finish(); } catch (_) {} }); } catch (_) {}
  }
  function holdDuel(L, on) {
    var D = Duel(); if (!D || typeof D.hold !== 'function') return;
    if (on) { L.held++; try { D.hold(true); } catch (_) {} }
    else if (L.held > 0) { L.held--; try { D.hold(false); } catch (_) {} }
  }
  function endLesson(why) {
    var L = S.lesson; if (!L) return;
    L.dead = true;
    if (L.step && L.step.finish) try { L.step.finish(); } catch (_) {}   // 讓舊的 run() 迴圈醒來、看到 dead 就收
    L.offs.forEach(function (f) { try { f && f(); } catch (_) {} });
    while (L.held > 0) holdDuel(L, false);     // 第 6 步停在浮框上時跳過／離開：盤面要接著走
    if (S.runner) { if (why === 'skipped') S.runner.skip(); else if (why !== 'done') S.runner.release(); }
    if (duelApi()) setTri(null);
    setShow(null);
    S.lesson = null;
    if (CFG.onEnd && !L.replay) try { CFG.onEnd(why, { tier: L.tier, learned: L.R.learnedIds.slice() }); } catch (e) { console.error(e); }
    L.res(why);
    setTimeout(pumpTips, 300);
  }

  async function run(L) {
    var R = L.R;
    // 進場：等盤面滑上來、鏡頭推完、遇敵黑條收掉
    await until(function () { return duelReady() && !entering(); }, 0);
    if (L.dead) return;
    await wait(300);
    while (!L.dead) {
      if (R.state === 'released') return endLesson('released');
      if (R.state === 'skipped') return endLesson('skipped');
      if (R.state === 'done' && !R.awaiting) return finishDone(L);
      if (R.awaiting) {     // 丟出去了：等這手結算；浮框出現時講第 6 步；等下一手可以點（或分出勝負）
        setShow({ mode: 'wait' });
        setTri(null);
        var t0 = now(), sawBusy = false;
        var got = await until(function () {
          var a = duelApi(); if (!a) return false;
          if (a.busy && a.busy()) sawBusy = true;
          if (L.evs) return 'res';
          if (!sawBusy && now() - t0 > 1500) return 'none';     // 引擎沒收（極少見）：退回那一步
          return false;
        }, 0, 30);
        if (L.dead) return;
        if (got === 'none') { R.awaiting = false; R.idx = Math.max(0, R.idx - 1); while (R.idx > 0 && !isLift(R.steps[R.idx])) R.idx--; continue; }   // 退回這一手「點那張」那步
        var evs = L.evs; L.evs = null;
        var over = (evs || []).find(function (e) { return e.t === 'over'; });
        // 第 6 步：浮框停在畫面上講（duel.js 在 onResolved 之前已經畫好浮框；L.held 在 onResolved 裡同步 hold 住了）
        while (!L.dead && R.state === 'run' && atResolve(R.cur())) {
          var s6 = R.cur();
          R.begin();
          await showStep(L, s6);
        }
        while (L.held > 0) holdDuel(L, false);
        if (L.dead) return;
        setShow({ mode: 'wait' });
        if (over) {
          if (over.win) return finishKo(L);
          return endLesson('released');
        }
        await until(function () { var a = duelApi(); if (!a) return false; var d = a.duel ? a.duel() : R.duel; return (d && d.over) || (duelReady() && (d.n | 0) > R.commitN); }, 0, 40);
        if (L.dead) return;
        if (R.duel.over) return R.duel.over.win ? finishKo(L) : endLesson('released');
        R.handReady();
        await flushLearn(L);
        if (L.dead) return;
        continue;
      }
      var s = R.cur();
      if (!s) return finishDone(L);
      // 這一步要的東西出現了才開始
      setShow({ mode: 'wait', keepMask: true });
      var ready = await until(function () { return duelReady() && targetsReady(s); }, 4000);
      if (L.dead) return;
      if (R.cur() !== s) continue;
      if (!ready) {
        if (s.kind === 'say' || s.kind === 'soft') { R.log.push('skip ' + s.id); R.done(); continue; }
        console.warn('DipLabTut: 步驟 ' + s.id + ' 的目標沒出現，放手'); R.release(); continue;
      }
      R.begin();
      await showStep(L, s);
      if (L.dead) return;
      if (R.state === 'done' && !R.awaiting) { await flushLearn(L, true); if (L.dead) return; return finishDone(L); }
    }
  }
  async function flushLearn(L, fx) {
    var R = L.R;
    while (R.learnQ.length && !L.dead) {
      setShow({ mode: fx ? 'fx' : 'wait', keepMask: !fx });
      await learnCard(R.learnQ.shift());
    }
  }
  function finishDone(L) {
    if (L.dead) return;
    setShow({ mode: 'fx' });
    return flushLearn(L, true).then(function () { if (!L.dead) endLesson('done'); });
  }
  // 教學中就把他打倒（異端第 9 步丟王牌之類）：等盤面大章蓋完再飛小卡；duel.js 的 beforeEnd（＝settled()）會等小卡飛完才收盤面
  async function finishKo(L) {
    var R = L.R;
    R.resolved([{ t: 'over', win: true }]);
    var release = null, hold = new Promise(function (r) { release = r; });
    S.learnBusy = S.learnBusy.then(function () { return hold; });
    setShow({ mode: 'fx' });
    await until(function () { return duelPhase() === 'over' || !duelApi(); }, 4000, 60);
    if (!L.dead) await wait(rm() ? 300 : 900);
    if (!L.dead) await flushLearn(L, true);
    release();
    if (!L.dead) endLesson('done');
  }
  function targetsReady(s) {
    var list = targetsFor(s);
    if (!list.length) return true;
    for (var i = 0; i < list.length; i++) { if (rectOf(resolveTarget(list[i]))) return true; }
    return false;
  }
  // 操作步：看得見、點不到的洞（提示句、三角），讀題用
  function lookFor(s) {
    var look = (s.look || []).slice();
    if (s.kind === 'do') {
      if (look.indexOf('e-hint') < 0) look.push('e-hint');
      if (s.tri && s.tri.length && look.indexOf('tri') < 0) look.push('tri');
      if (s.tri && s.tri.length && look.indexOf('rounds') < 0) look.push('rounds');   // 洞連「第 n／6 手」一起框（不從那行字中間切過去；RH-8）
    }
    return look.filter(function (n) { return (s.target || []).indexOf(n) < 0; });
  }
  // 手牌還疊著（沒攤開）：點那張的步驟先指整疊手牌（FIXLIST 11：點牌堆 → 點牌 → 點屬性）
  function stacked() {
    var D = Duel(); if (!D || !D.debug) return false;
    var d = null; try { d = D.debug(); } catch (_) { d = null; }
    return !!d && d.spread === false;
  }
  function targetsFor(s) {
    if (isLift(s) && stacked()) return ['hand'];
    return (s.target || []).slice();
  }
  // 這一步此刻的手指與泡泡（點那張的步驟：疊著時指整疊，第一次寫 step.spread）
  function liveDo(s) {
    var stk = isLift(s) && stacked(), soft = s.kind === 'soft';
    var point = stk ? 'hand' : (s.point === false ? null : (s.point || (soft ? null : (s.target || [])[0]) || null));
    var text = stk && s.spread ? s.spread : s.text;          // step.spread 只有第一手那步有（「點一下手牌攤開。」）
    return { targets: targetsFor(s), point: point, text: text, stacked: stk, pointAt: stk ? (s.point || (s.target || [])[0] || null) : null };
  }
  // 攤開了（gate 放行 spread、或盤面送 'spread'）：同一步，洞與手指換到那張
  function refreshDo(s) {
    var sh = S.show; if (!sh || sh.step !== s || sh.mode !== 'do') return;
    var x = liveDo(s);
    if (sh.stacked && !x.stacked && S.lastXY) sh.quiet = { t: now(), x: S.lastXY.x, y: S.lastXY.y };   // 剛攤開：雙擊的第二下（同一點）落在遮罩上（洞已經移到那張）不罵（RV11-5）
    sh.targets = x.targets; sh.point = x.point; sh.stacked = x.stacked; sh.pointAt = x.pointAt;
    if (sh.text !== x.text) { sh.text = x.text; setText(x.text, sh.colorChars); }
    S.root._.hand.hidden = !sh.point;
    S.sig = ''; layout(true);
  }
  // 一步：say 等點一下；do 等 gate 放行；soft 等任一操作
  function showStep(L, s) {
    var R = L.R;
    S.lastStepAt = now();
    return new Promise(function (res) {
      var finished = false;
      var finish = function () { if (finished) return; finished = true; res(); };
      var text = s.text;
      // 結算時講的那步（第 6 步）：泡泡放在浮框下面（蓋已經變暗的手牌），不蓋牌桌上的兩張唱片與勝負角標
      setTri(s.tri);
      if (s.kind === 'say') {
        setShow({ mode: 'say', step: s, targets: s.target, look: s.look, text: text, bubble: s.bubble || (atResolve(s) ? 'below' : undefined), keep: s.keep, colorChars: s.colorChars, point: null,
          onTap: function () { sfx('tick'); R.done(); if (!atResolve(s)) setShow({ mode: 'wait', keepMask: true }); finish(); } });
        L.step = { s: s, finish: finish };
        return;
      }
      var soft = s.kind === 'soft';
      // 點屬性那步：「你丟的」預覽換成要教的那一色（浮起時預設是最高那顆；跟手指指的那顆一致）
      if (isCommit(s) && s.pick && s.pick !== 'ace') { var D0 = Duel(), pa = s.pick === 'blocked:o' ? 'o' : s.pick.attr; if (D0 && D0.preview) try { D0.preview(pa); } catch (_) {} }
      // 建議步（第 10 步）不給手指：異端的王牌是硬蕊，指著它等於叫你被剋
      var x = liveDo(s);
      setShow({ mode: soft ? 'soft' : 'do', step: s, targets: x.targets, look: soft ? [] : lookFor(s), point: x.point, text: x.text, stacked: x.stacked, pointAt: x.pointAt, bubble: s.bubble || 'above', keep: s.keep, colorChars: s.colorChars });
      L.step = {
        s: s, finish: finish,
        refresh: function () { if (!finished) refreshDo(s); },
        onGate: function (last) {         // gate 之後由 hooks 呼叫
          if (finished) return;
          if (!last.ok) { if (!last.quiet) wrong(); return; }
          if (last.note) return;
          if (last.final) { finish(); return; }
          if (last.spread) { setTimeout(function () { if (!finished) refreshDo(s); }, 0); return; }   // 攤開了：同一步，手指換到那張（盤面先畫好再量）
        }
      };
    }).then(function () { if (L.step && L.step.s === s) L.step = null; });
  }

  // ---------------------------------------------------------------- duel.js hooks.tut
  function duelHooks() {
    S.armed = now();
    return {
      gate: function (a) {
        var R = S.runner, L = S.lesson;
        if (!L || !R || L.dead) {
          // mount 之後、startDuelLesson 之前：擋 3 秒（防止玩家搶先出牌），之後放行
          if (S.armed && now() - S.armed < 3000 && a && (a.kind === 'chip' || a.kind === 'card' || a.kind === 'throw' || a.kind === 'spread')) return false;
          return true;
        }
        if (!R.active()) return true;
        if (R.awaiting && a && (a.kind === 'chip' || a.kind === 'card' || a.kind === 'throw' || a.kind === 'spread' || a.kind === 'collapse')) return false;
        var ok = R.gate(a);
        var last = R.last || { ok: ok };
        if (L.step && L.step.onGate) L.step.onGate(last);
        else if (!ok && !last.quiet) wrong();
        if (last.commit || last.soft) setTri(null);
        kick();
        return ok;
      },
      onPhase: function () { kick(); },
      onResolved: function (evs) {
        var L = S.lesson, R = S.runner;
        if (!L || L.dead || !R) return;
        // 結算時講的步驟：浮框剛出現（560 ms）就停住，講完再走（第 6 手 KO 也一樣：講完才蓋大章）
        if (R.state === 'run' && R.awaiting && atResolve(R.cur())) { holdDuel(L, true); finishCallout(); }
        L.evs = evs || [];
        kick();
      },
      resolveOpts: function () { return {}; }      // 他每手出什麼由引擎的 script 決定（v3 的 forcedAttr 拿掉）
    };
  }

  // ---------------------------------------------------------------- 通用一步（對決以外）
  function step(def) {
    def = def || {};
    return new Promise(function (res) {
      var kind = def.kind || 'say';
      var targets = def.target ? (Array.isArray(def.target) ? def.target : [def.target]) : [];
      var done = function (v) { off(); setShow(null); res(v); };
      var off = function () {};
      if (kind === 'say') { setShow({ mode: 'say', targets: targets, text: def.text || '', bubble: def.bubble, keep: def.keep, colorChars: def.colorChars, onTap: function () { done(true); } }); return; }
      if (kind === 'soft') {
        setShow({ mode: 'soft', targets: targets, text: def.text || '', bubble: def.bubble, keep: def.keep, point: def.point === false ? null : (def.point || targets[0] || null), colorChars: def.colorChars });
        var h = function () { done(true); };
        setTimeout(function () { document.addEventListener('pointerdown', h, true); }, 0);
        off = function () { document.removeEventListener('pointerdown', h, true); };
        return;
      }
      // do：點到洞裡的目標才算
      setShow({ mode: 'do', targets: targets, text: def.text || '', bubble: def.bubble, keep: def.keep, point: def.point || targets[0] || null, colorChars: def.colorChars });
      var hd = function (e) {
        for (var i = 0; i < targets.length; i++) { var el = resolveTarget(targets[i]); if (el && el.nodeType === 1 && el.contains(e.target)) { setTimeout(function () { done(true); }, 0); return; } }
      };
      document.addEventListener('click', hd, true);
      off = function () { document.removeEventListener('click', hd, true); };
    });
  }

  // ---------------------------------------------------------------- 一次性老闆小提示（SPEC-v3 §6）：不壓暗、不擋點擊、5 秒，每種一輩子一次
  function tipText(id) { var C = Cn(); return (C.coachTips && C.coachTips[id]) || (C.hints && C.hints[id]) || ''; }
  function ensureTipRoot() {
    var r = document.getElementById('tutTip');
    if (!r) {
      r = document.createElement('div'); r.id = 'tutTip'; r.setAttribute('aria-live', 'polite'); r.setAttribute('role', 'status');
      r.innerHTML = '<div class="tut-ring tip-ring" hidden></div><div class="tut-bub tut-tip" hidden><span class="av"></span><span class="who"></span><span class="tx"></span></div>';
      document.body.appendChild(r);
      r._ = { ring: r.querySelector('.tip-ring'), bub: r.querySelector('.tut-tip'), tx: r.querySelector('.tut-tip .tx'), who: r.querySelector('.tut-tip .who'), av: r.querySelector('.tut-tip .av') };
      r._.av.innerHTML = ownerHead();
    }
    S.tipRoot = r;
    return r;
  }
  function queueTip(id, targets) {
    if (!id || S.lesson) return;                       // 教學進行中不出、也不記
    var a0 = duelApi(); try { if (S.replayDuel && a0 && a0.duel && a0.duel() === S.replayDuel) return; } catch (_) {}   // 重看教學那場：不出、不記
    if (seen(id)) return;
    if ((S.tip && S.tip.id === id) || S.tipQ.some(function (x) { return x.id === id; })) return;
    var text = tipText(id); if (!text) return;
    S.tipQ.push({ id: id, targets: (targets || []).slice(), text: text });
    setTimeout(pumpTips, 0);
  }
  function pumpTips() {
    if (S.tip || !S.tipQ.length || S.lesson) return;
    if (!duelApi()) { S.tipQ = []; return; }            // 對決已經收掉：丟掉（沒看到就不算看過，下次遇到再出）
    // 揭曉演出中不出（R-01／V04：泡泡在舞台橫條上，會蓋住兩個人、唱盤與老闆舉旗）：等這手演完、輪到你挑牌再出；打完了就丟掉
    var ph = duelPhase();
    if (ph === 'over') { S.tipQ = []; return; }
    if (ph && ph !== 'choose') { setTimeout(pumpTips, 200); return; }
    var t = S.tipQ.shift();
    if (seen(t.id)) { setTimeout(pumpTips, 0); return; }
    var r = ensureTipRoot();
    var cur = S.tip = { id: t.id, targets: t.targets, text: t.text, at: now(), pos: null };
    r._.who.textContent = UI().who || '老闆';
    r._.tx.innerHTML = colorize(t.text, false);
    r._.bub.hidden = false;
    r._.bub.setAttribute('data-tip', t.id);
    if (!rm()) A(r._.bub, [{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }], { duration: 180, easing: 'ease-out' });
    sfx('tick');
    layoutTip(true);
    startLoop();
    cur.seenT = setTimeout(function () { if (S.tip === cur && duelApi()) markSeen(cur.id); }, READ_MS);
    cur.hideT = setTimeout(function () { if (S.tip === cur) hideTip('time'); }, TIP_MS);
  }
  function hideTip(why) {
    var cur = S.tip; if (!cur) return;
    clearTimeout(cur.seenT); clearTimeout(cur.hideT);
    if (why === 'next' && now() - cur.at >= 800) markSeen(cur.id);     // 看了一會兒才丟出去：算看過
    S.tip = null;
    var r = S.tipRoot;
    if (r) {
      r._.ring.hidden = true;
      var b = r._.bub;
      if (why === 'time' && !rm() && b.animate) { var a = A(b, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' }); var fin = function () { if (!S.tip) { b.hidden = true; try { a && a.cancel(); } catch (_) {} } }; if (a) a.finished.then(fin, fin); else fin(); }
      else b.hidden = true;
    }
    if (why === 'lesson' || why === 'gone') S.tipQ = why === 'gone' ? [] : S.tipQ;
    setTimeout(pumpTips, why === 'time' ? 400 : 0);
  }
  // 揭曉時頭上屬性方塊的範圍（CSS；stage.badgeRect，方塊還沒出來就用兩個對決者頭頂往上一個方塊高估）；舞台不在回 null
  function badgeZone() {
    var sa = stageApi(); if (!sa) return null;
    var t = Infinity, b = -Infinity;
    ['e', 'p'].forEach(function (side) {
      var r = null;
      try { r = typeof sa.badgeRect === 'function' ? sa.badgeRect(side) : null; } catch (_) { r = null; }
      if (!r || !r.height) {
        var a = null; try { a = typeof sa.anchor === 'function' ? sa.anchor(side === 'e' ? 'f' : 'p') : null; } catch (_) { a = null; }
        var ar = a && a.getBoundingClientRect ? a.getBoundingClientRect() : null;
        if (ar && ar.height) r = { top: ar.top - 24, bottom: ar.top };
      }
      if (r) { t = Math.min(t, r.top); b = Math.max(b, r.bottom); }
    });
    return isFinite(t) && isFinite(b) ? { top: t, bottom: b } : null;
  }
  // 提示泡泡放在舞台橫條上（老闆就在櫃檯後面）：不蓋他的名牌、唱片、牌桌與你的手牌、頭上的屬性方塊；舞台不在就貼著目標
  function layoutTip(force) {
    var cur = S.tip, r = S.tipRoot; if (!cur || !r) return;
    var ar = appRect(), tb = topBottom(), vh = W.innerHeight;
    var tg = null; for (var i = 0; i < cur.targets.length && !tg; i++) tg = visRect(resolveTarget(cur.targets[i]));
    var ring = r._.ring;
    if (tg) { var p = pad(tg, 3); ring.hidden = false; ring.style.left = p.left.toFixed(1) + 'px'; ring.style.top = p.top.toFixed(1) + 'px'; ring.style.width = p.width.toFixed(1) + 'px'; ring.style.height = p.height.toFixed(1) + 'px'; }
    else ring.hidden = true;
    if (cur.pos && !force) return;       // 泡泡位置定了就不跟著跑（目標收掉也不動）
    var b = r._.bub, left = Math.round(ar.left + 12), width = Math.round(ar.width - 24);
    b.style.left = left + 'px'; b.style.width = width + 'px';
    var bh = b.offsetHeight || 52;
    var st = rectOf(document.getElementById('stage'));
    var top;
    if (st && st.height >= bh + 8) {
      top = Math.round(Math.max(tb + 4, st.top + 6));
      // 整合版面 a：不蓋揭曉時頭上的屬性方塊——舞台上緣會蓋到方塊時，放到方塊上面（高螢幕橫條夠高）或方塊下面（人身上）
      var bz = badgeZone();
      if (bz && top < bz.bottom + 2 && top + bh > bz.top - 2) {
        if (bz.top - 4 - bh >= Math.max(tb + 2, st.top + 2)) top = Math.round(bz.top - 4 - bh);
        else top = Math.round(Math.min(vh - bh - 4, bz.bottom + 4));
      }
    }
    else if (tg) top = tg.top - 10 - bh >= tb + 4 ? Math.round(tg.top - 10 - bh) : Math.round(Math.min(vh - bh - 4, tg.bottom + 10));
    else top = tb + 6;
    b.style.top = top + 'px';
    cur.pos = { top: top };
  }

  // ---------------------------------------------------------------- 對決以外的一次性提示（今晚來客）：壓暗 40%、不擋，點一下換句
  function firstTime(id, targets) {
    if (!id) return;
    if (/^tip_/.test(id) || (Cn().coachTips && Cn().coachTips[id])) return queueTip(id, targets);
    if (S.lesson) return;
    if (seen(id)) return;
    var C = Cn(), SL = C.shopLines || {};
    var lines = (id === 'night' || id === 'map' || id === 'h_map') ? ((SL.nightIntro || SL.mapIntro || []).slice()) : (C.hints && C.hints[id] ? [C.hints[id]] : []);
    if (!lines.length) return;
    if (S.softQ.some(function (x) { return x.id === id; }) || (S.soft && S.soft.id === id)) return;
    S.softQ.push({ id: id, targets: (targets || []).slice(), lines: lines });
    setTimeout(pumpSoft, 0);
  }
  function pumpSoft() {
    if (S.soft || !S.softQ.length || S.lesson) return;
    var h = S.softQ.shift();
    var cur = { id: h.id, kind: 'other', lines: h.lines, k: 0, targets: h.targets };
    S.soft = cur;
    showSoft(cur);
  }
  function showSoft(cur) {
    setShow({ mode: 'soft', targets: cur.targets, text: cur.lines[cur.k], point: null, bubble: 'auto' });
    cur.shownAt = cur.shownAt || now();
    cur.lineAt = now();                 // 這一句出現的時間（最後一句停滿 1.2 s 才點掉，才算讀過）
    var t0 = cur.lineAt;
    var h = function (e) {
      if (e && e.timeStamp && e.timeStamp < t0 - 1) return;     // 叫出這則的那一下不算
      document.removeEventListener('pointerdown', h, true);
      if (S.soft !== cur) return;
      if (cur.k < cur.lines.length - 1) { cur.k++; setTimeout(function () { if (S.soft === cur) showSoft(cur); }, 0); return; }
      dismissSoft('tap');
    };
    cur.off = function () { document.removeEventListener('pointerdown', h, true); };
    // 馬上開始聽（B-map-hint-leak：晚聽的話，那段時間點了收不掉，就被帶進下一個畫面）
    setTimeout(function () { if (S.soft === cur) document.addEventListener('pointerdown', h, true); }, 0);
  }
  // how：'tap'＝玩家點掉（最後一句停滿 1.2 s 才算看過）；其他（換畫面、教學開始）＝收掉、下次再出
  function dismissSoft(how) {
    var cur = S.soft; if (!cur) return;
    if (cur.off) cur.off();
    S.soft = null;
    if (how === 'tap' && cur.lineAt && now() - cur.lineAt >= READ_MS) markSeen(cur.id);
    if (!S.lesson) setShow(null);
    setTimeout(pumpSoft, 200);
  }

  // ---------------------------------------------------------------- 公開
  var api = {
    configure: function (o) { o = o || {}; ['stage', 'save', 'persist', 'content', 'onEnd'].forEach(function (k) { if (o[k] !== undefined) CFG[k] = o[k]; }); return api; },
    duelHooks: duelHooks,
    startDuelLesson: startDuelLesson,
    step: step,
    firstTime: firstTime,
    hintHook: function (id, targets) { firstTime(id, targets); return true; },
    skip: function () { if (S.lesson) endLesson('skipped'); },
    abort: function () { if (S.lesson) endLesson('aborted'); },
    fastForward: function () {      // 頂欄 ⏩（若有）：說明步直接跳到下一個要操作的步驟
      var L = S.lesson, R = S.runner; if (!L || !R || R.awaiting) return;
      var s = R.cur(); if (!s || s.kind !== 'say') return;
      var f = L.step && L.step.s === s ? L.step.finish : null;
      while (R.cur() && R.cur().kind === 'say' && !atResolve(R.cur())) R.done();
      if (f) f();
    },
    active: function () { return !!(S.lesson && S.runner && S.runner.active()); },
    learned: function () { return S.learnedAll.slice(); },
    learnedIds: function () { var L = (Cn().tutorial && Cn().tutorial.learned) || {}; return Object.keys(L).filter(function (k) { return S.learnedAll.indexOf(L[k]) >= 0; }); },
    dismissSoft: function () { dismissSoft('ui'); hideTip('ui'); },
    settled: function () { return S.learnBusy; },
    replayDuel: function (C, tier, seed, o) { return replayDuel(C || Cn(), tier, seed, Eng(), o); },
    replayBag: function (C, tier, last) { return replayBag(C || Cn(), tier, last, Eng()); },
    debug: function () {
      var R = S.runner;
      return { active: api.active(), step: R && R.cur() ? R.cur().id : null, shown: S.show && S.show.step ? S.show.step.id || null : null, idx: R ? R.idx : -1,
        state: R ? R.state : null, awaiting: R ? R.awaiting : null, picked: R ? R.picked : null, mode: S.show ? S.show.mode : null,
        point: S.show && S.show.point && typeof S.show.point === 'string' ? S.show.point : null, stacked: !!(S.show && S.show.stacked),
        text: S.root && S.root._ && !S.root._.bub.hidden ? S.root._.tx.textContent : null, warn: !!(S.root && S.root._ && S.root._.bub.classList.contains('warn')),
        holes: S.show && S.show.holes ? S.show.holes.length : 0, soft: S.soft ? S.soft.id : null, tip: S.tip ? S.tip.id : null, tipQ: S.tipQ.map(function (x) { return x.id; }),
        held: S.lesson ? S.lesson.held : 0, learned: S.learnedAll.slice(), learnedIds: R ? R.learnedIds.slice() : [], log: R ? R.log.slice(-30) : [] };
    },
    _core: core
  };
  W.DipLabTut = api;
  W.addEventListener('resize', function () { S.sig = ''; if (S.tip) layoutTip(true); });
})(typeof self !== 'undefined' ? self : this);
