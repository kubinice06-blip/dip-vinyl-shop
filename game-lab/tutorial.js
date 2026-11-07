// game-lab/tutorial.js — 序章引導教學 v2（Agent T；SPEC-v2 §6、B15、O2、O5）
//
// 手遊式一步一步帶：壓暗＋挖洞聚光（一張 SVG、可同時多個洞）、金框脈動、像素手指、貼著目標的老闆一句話（≤18 字）、
// 說明步 ▼ 點一下繼續、操作步只放行指定的動作（點錯：目標震一下＋「先點我指的這裡。」）、建議步不擋。
// 腳本對手：每一手用 duel.js 傳給引擎的 forcedCell 指定他抽到的格子（engine.js §7.1；UI 不讀 intent.cellIdx）。
//
// ── 介面（SPEC-v2 §6.6）────────────────────────────────────────────────────────────────────────────
// window.DipLabTut = {
//   configure({ stage, save:()=>saveObj, persist:()=>void, content }),   // ui.js 開機時給一次（save.seen 讀寫、舞台熱點）
//   duelHooks() → { gate(action)→bool, forcedCell()→int|null, previews()→bool, onPhase(phase), onResolved(events) }   // 放進 DipLabDuel hooks.tut
//   startDuelLesson({ tier, duelApi?, stage?, duel?, replay?, from? }) → Promise<'done'|'skipped'|'released'|'aborted'>
//   prep: content(C) → 教學場用的 content（只換 enemies.man＝男子 20／18）；enemyDef(C)；startOpts(C)；prepDuel(duel, tier, C)（排好起手、牌庫、他擺的盤）
//         prepareDuel(duel, { tier, content })＝一般男子開場之後一起改成 20／18 再排牌（ui.js 用這個）
//   step(def) → Promise                     // 通用：一步（say／do／soft），給對決以外的畫面用
//   firstTime(hintId, targets) → void      // 第一個夜晚的 soft 提示（save.seen 一個存檔一次；照著做完那一手才寫）
//   hintHook                               // ＝(id, targets) => firstTime(id, targets)；可直接當 duel hooks.hint
//   skip(), abort(), fastForward(), active() → bool, learned() → ['冷門剋經典', …], learnedIds() → ['L1', …], settled() → Promise
//   dismissSoft()                          // 收掉現在的一次性提示（ui.js 換畫面時叫；這樣收掉的不算看過，下次再出）
// };
// gate action（duel.js 送進來）：{kind:'card',i,id} {kind:'ace'} {kind:'attr',attr,i?,id?,ace?} {kind:'ult'} {kind:'ultConfirm'} {kind:'info',where} {kind:'close'}
//   v2 fix：{kind:'sheet', which:'temper'|'calc'|'cells'}（開面板前問；操作步只放行那一步要的）{kind:'sheetClose'}（tutorial.js 自己看 DOM 送）
//
// Node（test/tutorial.test.mjs）：require('./tutorial.js') 拿到純邏輯（stepsFor／prepDuel／createRunner…），不碰 DOM。
// 不宣告 dip-character.js 的全域（PIX_PAL、SPR_BODY、AVATAR_*）；只掛 window.DipLabTut。localStorage 一律不碰（seen 交給 ui.js 的存檔）。
(function (root) {
  'use strict';

  // ================================================================== 純邏輯（Node＋瀏覽器）
  var TIERS = ['hall', 'pearl', 'heresy'];
  var COMMIT_KINDS = { attr: 1, ultConfirm: 1 };
  var PEEK_KINDS = { info: 1, sheet: 1, sheetClose: 1, close: 1 };

  function tierOk(step, tier) {
    if (!step.tier) return true;
    return Array.isArray(step.tier) ? step.tier.indexOf(tier) >= 0 : step.tier === tier;
  }
  function textOf(step, tier) { return (step.text && typeof step.text === 'object') ? (step.text[tier] || '') : (step.text || ''); }
  // 一張王牌的整條腳本（文字、小卡都換成那條路線的）
  function stepsFor(C, tier) {
    var T = C.tutorial;
    return T.steps.filter(function (s) { return tierOk(s, tier); }).map(function (s) {
      var o = {}; for (var k in s) o[k] = s[k];
      o.text = textOf(s, tier);
      o.learn = s.learn || (s.learnTier && s.learnTier[tier]) || null;
      return o;
    });
  }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  // 教學那場的男子：聲望 20、變臉刻度 18（只有教學場；直接開打照舊 16／12）
  function enemyDef(C) {
    var o = {}, man = C.enemies.man, t = C.tutorial.man;
    for (var k in man) o[k] = man[k];
    o.hp = t.hp; o.phases = clone(t.phases);
    return o;
  }
  // 給 E.startNodeDuel(run, DipLabTut.content(C), nodeId, DipLabTut.startOpts(C)) 用的 content（淺拷貝，只換男子）
  function content(C) {
    var o = {}; for (var k in C) o[k] = C[k];
    var en = {}; for (var id in C.enemies) en[id] = C.enemies[id];
    en.man = enemyDef(C);
    o.enemies = en;
    return o;
  }
  function startOpts(C) { return { firstRecordId: C.tutorial.records[0] }; }
  // startDuel 之後、第一手之前：排好起手 4 張、抽牌順序、他第 2 手起擺的盤（draw() 從尾巴抽，所以倒過來放）
  function prepDuel(duel, tier, C) {
    var T = C.tutorial, card = function (id) { var c = C.cards[id]; if (!c) throw new Error('DipLabTut: 找不到卡 ' + id); return clone(c); };
    if (!T.hand[tier]) throw new Error('DipLabTut: 不認得的王牌 ' + tier);
    duel.p.hand = T.hand[tier].map(card);
    duel.p.deck = T.draw[tier].slice().reverse().map(card);
    duel.p.discard = [];
    var curId = duel.e.record && duel.e.record.id;
    var rest = T.records.filter(function (id) { return id !== curId; });
    duel.e.deck = rest.reverse().map(card);
    duel.e.discard = [];
    return duel;
  }
  // ui.js 用 E.startNodeDuel 開的是一般男子（16／12）：這裡一起改成教學數字（20／18）再排牌。用 content(C) 開的也可以再叫一次（不會重複扣）。
  function prepareDuel(duel, o) {
    o = o || {};
    var C = o.content, tier = o.tier || (duel.p && duel.p.ear) || 'hall', man = C.tutorial.man;
    var hp0 = duel.e.hp, max0 = duel.e.maxHp;
    if (hp0 === max0) { duel.e.hp = man.hp; duel.e.maxHp = man.hp; }
    duel.e.phases = clone(man.phases); duel.e.phase = 0;
    return prepDuel(duel, tier, C);
  }
  function bestCIndex(hand) {
    var bi = -1, bv = -1;
    (hand || []).forEach(function (c, i) { if ((c.c | 0) > bv) { bv = c.c | 0; bi = i; } });
    return bi;
  }
  function matches(allow, a, ctx) {
    if (!allow || !a) return false;
    switch (a.kind) {
      case 'card':
        if (!allow.card) return false;
        if (allow.card === 'any') return true;
        if (allow.card === 'bestC') return !!ctx.bestC && a.id === ctx.bestC;
        return a.id === allow.card;
      case 'ace': return !!allow.ace;
      case 'attr': return a.ace ? !!allow.aceAttr : (!!allow.attr && allow.attr === a.attr);
      case 'ult': return !!allow.ult;
      case 'ultConfirm': return !!allow.ultConfirm;
      case 'info': return !!allow.info && allow.info === a.where;
      case 'close': return !!allow.close;
      case 'sheet': return !!allow.sheet && allow.sheet === (a.which || a.where);   // duel.js 送 {kind:'sheet', where:'temper'}；which 也認
      case 'sheetClose': return !!allow.sheetClose;
    }
    return false;
  }
  // 腳本狀態機：DOM 控制器與 Node 測試共用。不碰 DOM、不讀 intent.cellIdx。
  function createRunner(C, tier, duel, opts) {
    opts = opts || {};
    var steps = stepsFor(C, tier);
    var R = {
      tier: tier, duel: duel, steps: steps, idx: 0, state: 'run', previews: false, pendingCell: null, picked: false,
      awaiting: false, commitHand: 0, learned: [], learnedIds: [], learnQ: [], bestC: null, last: null, log: []
    };
    R.cur = function () { return R.state === 'run' ? (steps[R.idx] || null) : null; };
    R.active = function () { return R.state === 'run'; };
    // 第幾手開始（B15：重掛時依 duel.hand 從那一課的開頭接；from＝步驟 id 直接跳）
    R.startAt = function (from) {
      var k = 0;
      if (typeof from === 'string') { k = steps.findIndex(function (s) { return s.id === from; }); if (k < 0) k = 0; }
      else {
        var h = (from | 0) || 1, commits = 0;
        for (k = 0; k < steps.length && commits < h - 1; k++) if (isCommitStep(steps[k])) commits++;
      }
      R.idx = k;
      for (var j = 0; j < k; j++) if (steps[j].previews) R.previews = true;
      return R;
    };
    function isCommitStep(s) { return !!(s.allow && (s.allow.attr || s.allow.aceAttr || s.allow.ultConfirm)); }
    R.isCommitStep = isCommitStep;
    R.begin = function () {
      var s = R.cur(); if (!s) return null;
      R.picked = false;
      if (s.previews) R.previews = true;
      var bi = bestCIndex(duel.p && duel.p.hand);
      R.bestC = bi >= 0 ? duel.p.hand[bi].id : null;
      return s;
    };
    R.text = function (s) {
      s = s || R.cur(); if (!s) return '';
      return String(s.text || '').replace(/\{qi\}/g, String(duel.p ? duel.p.qi : ''));
    };
    // 點了什麼 → 放不放行。R.last＝{ ok, final, commit, wrong:'target'|'attr'|null, released }
    R.gate = function (a) {
      if (R.state !== 'run') { R.last = { ok: true, free: true }; return true; }
      if (a && a.kind === 'close') {      // 唱片資訊關掉的通知：1-9 就在等它；其他時候只是通知
        var s0 = R.cur();
        if (s0 && s0.kind === 'do' && s0.allow && s0.allow.close && !R.awaiting) { R.last = { ok: true, final: true }; R.done(); return true; }
        R.last = { ok: true, note: true }; return true;
      }
      var s = R.cur();
      if (!s || R.awaiting || s.kind === 'say') { R.last = { ok: false, wrong: 'target' }; return false; }
      var ok = matches(s.allow, a, { bestC: R.bestC });
      if (!ok) {
        // 建議步（第 5 課）：只是看一眼（唱片資訊、他的脾氣、算式）不算放手；出別的盤才算
        if (s.kind === 'soft' && a && PEEK_KINDS[a.kind]) { R.last = { ok: true, note: true }; return true; }
        if (s.kind === 'soft') { R.release(); R.last = { ok: true, released: true }; return true; }
        R.last = { ok: false, wrong: (a && a.kind === 'attr' && !a.ace && s.wrongAttr && R.picked) ? 'attr' : 'target' };
        R.log.push('block ' + s.id + ' ' + JSON.stringify(a));
        return false;
      }
      var final = !(a.kind === 'card' && s.allow.attr);   // 2-3：先挑一張（不算完），再出冷門才算
      if (!final) { R.picked = true; R.last = { ok: true, final: false }; return true; }
      var commit = !!COMMIT_KINDS[a.kind];
      if (commit) {
        R.pendingCell = s.cell ? cellIndex(duel, s.cell) : null;
        R.awaiting = true; R.commitHand = duel.hand | 0;
      }
      R.last = { ok: true, final: true, commit: commit };
      R.log.push('ok ' + s.id + ' ' + a.kind);
      R.done();
      return true;
    };
    R.done = function () {      // 這一步完成 → 下一步（小卡由呼叫端演）
      var s = R.cur(); if (!s) return null;
      if (s.learn && s.learn !== 'L5' && C.tutorial.learned[s.learn]) { R.learned.push(C.tutorial.learned[s.learn]); R.learnedIds.push(s.learn); R.learnQ.push(C.tutorial.learned[s.learn]); }
      R.idx++; R.picked = false;
      if (R.idx >= steps.length && !R.awaiting) R.state = 'done';
      return s;
    };
    R.forcedCell = function () { return R.state === 'run' && Number.isInteger(R.pendingCell) && R.pendingCell >= 0 ? R.pendingCell : null; };
    R.previewsOn = function () { return R.state !== 'run' || R.previews; };
    R.resolved = function (evs) {
      R.pendingCell = null;
      var ko = (evs || []).find(function (e) { return e.t === 'ko'; });
      if (ko && R.state === 'run') {
        if (ko.winner === 'p') { R.learned.push(C.tutorial.learned.L5); R.learnedIds.push('L5'); R.state = 'done'; }
        else R.state = 'released';
      }
      return ko || null;
    };
    R.handReady = function () { R.awaiting = false; if (R.idx >= steps.length && R.state === 'run') R.state = 'done'; };
    R.release = function () { if (R.state === 'run') R.state = 'released'; R.pendingCell = null; };
    R.skip = function () { if (R.state === 'run') R.state = 'skipped'; R.pendingCell = null; };
    if (opts.from != null) R.startAt(opts.from);
    else if ((duel.hand | 0) > 1) R.startAt(duel.hand | 0);
    return R;
  }
  function cellIndex(duel, glyph) { var d = duel && duel.e && duel.e.disc; return d ? d.indexOf(glyph) : -1; }

  var core = { TIERS: TIERS, stepsFor: stepsFor, textOf: textOf, enemyDef: enemyDef, content: content, startOpts: startOpts, prepDuel: prepDuel, prepareDuel: prepareDuel,
    bestCIndex: bestCIndex, matches: matches, createRunner: createRunner, cellIndex: cellIndex };

  if (typeof module === 'object' && module.exports) { module.exports = core; return; }
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // ================================================================== 瀏覽器：遮罩、洞、泡泡、手指
  var W = window;
  var HAND = ['...kk....', '..kwwk...', '..kwwk...', '..kwwkkk.', '.kkwwwwwk', 'kwkwwwwwk', 'kwwwwwwwk', '.kwwwwwk.', '..kkkkk..'];
  var OWNER_HEAD = ['................', '.....dddddd.....', '....dddddddd....', '....dssssssd....', '....ekkeekke....', '....sdssssds....', '.....dddddd.....'];
  var PAD = 4;
  var Cn = function () { return CFG.content || W.DipLabContent || {}; };
  var Duel = function () { return W.DipLabDuel || null; };
  var Fx = function () { return W.DipLabFx || null; };
  var sfx = function (n, o) { var f = Fx(); if (f && f.sfx) try { f.sfx(n, o); } catch (_) {} };
  var rm = function () { try { var f = Fx(); if (f && f.reducedMotion) return !!f.reducedMotion(); return !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; } };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); };
  var UI = function () { var T = Cn().tutorial || {}; return T.ui || {}; };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  var CFG = { stage: null, save: null, persist: null, content: null };
  var S = {
    root: null, lesson: null, runner: null, armed: 0, show: null, raf: 0, sig: '', softQ: [], soft: null,
    pendingSeen: {}, memSeen: {}, offs: [], learnBusy: Promise.resolve(), learnedAll: [], ownSheet: false, softHand: null
  };

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
      // 只給看的洞（look）：亮著、有金框，但點下去＝點錯（ART-01：1-5 點「喊 經典」會穿過去開他的脾氣面板）
      r._.lk.addEventListener('pointerdown', onMaskDown);
      r._.lk.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); });
      // 說明步用 click（整個點擊結束才換下一步）：用 pointerdown 的話，iOS 隨後補發的 click 會落到下一步才露出來的目標上
      r._.catcher.addEventListener('pointerdown', function (e) { e.preventDefault(); });
      r._.catcher.addEventListener('click', onCatchTap);
      r._.skip.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); api.skip(); });
    }
    S.root = r;
    return r;
  }
  function appRect() {
    var a = document.getElementById('app');
    var r = a ? a.getBoundingClientRect() : null;
    if (!r || !r.width) return { left: 0, right: W.innerWidth, width: W.innerWidth, top: 0, bottom: W.innerHeight };
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
    if (name === 'info-close') return document.querySelector('#cardInfoMask [data-tut="info-close"]') || document.querySelector('#cardInfoMask #ciClose') || null;
    if (name.indexOf('card:') === 0) {
      var id = name.slice(5);
      if (id === 'bestC' && S.runner) id = S.runner.bestC || '';
      if (D && D.el) el = D.el('card:' + id);
      return el;
    }
    if (name[0] === '@') {
      if (D && D.el) el = D.el(name);
      if (!el) { var s2 = stageApi(); if (s2 && s2.anchor) try { el = s2.anchor(name.slice(1)); } catch (_) {} }
      return el;
    }
    if (/^[.#\[]/.test(name)) return document.querySelector(name);
    if (D && D.el) el = D.el(name);
    return el || document.querySelector('[data-tut="' + name + '"]');
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
  function pad(r, p) { return { left: r.left - p, top: r.top - p, right: r.right + p, bottom: r.bottom + p, width: r.width + 2 * p, height: r.height + 2 * p }; }
  function inter(a, b) { return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom; }
  function union(a, b) { var l = Math.min(a.left, b.left), t = Math.min(a.top, b.top), r = Math.max(a.right, b.right), bt = Math.max(a.bottom, b.bottom); return { left: l, top: t, right: r, bottom: bt, width: r - l, height: bt - t }; }
  // 洞重疊時（evenodd 會把重疊那塊又塗黑）：只是外擴 4px 碰在一起的，從中間切開；真的疊在一起的才合併成一個
  function mergeRects(list) {
    var out = list.map(function (r) { return { left: r.left, top: r.top, right: r.right, bottom: r.bottom }; }), again = true, guard = 0;
    while (again && guard++ < 50) {
      again = false;
      for (var i = 0; i < out.length && !again; i++) for (var j = i + 1; j < out.length; j++) {
        var a = out[i], b = out[j]; if (!inter(a, b)) continue;
        var ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (oy <= 12 && oy <= ox) { var up = a.top <= b.top ? a : b, dn = up === a ? b : a, my = (Math.max(a.top, b.top) + Math.min(a.bottom, b.bottom)) / 2; up.bottom = my; dn.top = my; }
        else if (ox <= 12) { var lf = a.left <= b.left ? a : b, rt = lf === a ? b : a, mx = (Math.max(a.left, b.left) + Math.min(a.right, b.right)) / 2; lf.right = mx; rt.left = mx; }
        else { out[i] = union(a, b); out.splice(j, 1); }
        again = true; break;
      }
    }
    return out.map(function (r) { return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.right - r.left, height: r.bottom - r.top }; });
  }

  // ---------------------------------------------------------------- 一步畫面（show）：mode say｜do｜soft｜wait｜modal｜hide
  // show = { mode, targets:[...], point:name|null, keep:[...], text, bubble, dim, onTap?, step }
  function setShow(sh) {
    ensureRoot();
    // 步驟之間的短暫等待：保留上一步的壓暗與洞（不閃一下全亮），只收泡泡和手指
    if (sh && sh.mode === 'wait' && sh.keepMask && S.show && S.show.targets && S.show.mode !== 'wait' && S.show.mode !== 'modal' && S.show.mode !== 'hide') { sh.targets = S.show.targets; sh.dim = true; }
    else if (sh && sh.mode === 'wait' && sh.keepMask && S.show && S.show.dim) { sh.targets = S.show.targets; sh.dim = true; }
    S.show = sh; S.sig = '';
    var R = S.root._;
    clearTimeout(wrongT); R.bub.classList.remove('warn');
    if (!sh || sh.mode === 'hide') {
      S.root.className = '';
      R.svg.style.display = 'none'; R.catcher.hidden = true; R.bub.hidden = true; R.hand.hidden = true; R.rings.innerHTML = ''; R.skip.hidden = true;
      stopLoop();
      return;
    }
    S.root.className = 'on m-' + sh.mode + (rm() ? ' rm' : '');
    R.svg.style.display = ((sh.mode === 'wait' && !sh.dim) || sh.mode === 'modal' || sh.mode === 'fx') ? 'none' : '';
    R.svg.setAttribute('class', 'tut-mask' + (sh.mode === 'soft' ? ' soft' : '') + (sh.mode === 'do' ? ' block' : ''));
    R.catcher.hidden = !(sh.mode === 'say' || sh.mode === 'wait');
    R.catcher.className = 'tut-catch' + (sh.mode === 'wait' ? ' clear' : '');
    R.skip.hidden = !(S.lesson && S.runner && S.runner.active()) || sh.mode === 'modal' || sh.mode === 'fx';
    R.skip.textContent = UI().skipTut || '跳過教學';
    if (sh.text != null) {
      R.who.textContent = UI().who || '老闆';
      setText(sh.text, sh.colorChars);
      R.bub.hidden = false;
      R.bub.querySelector('.nx').style.display = sh.mode === 'say' ? '' : 'none';
      R.bub.setAttribute('data-step', sh.step ? sh.step.id || '' : '');
      if (!rm()) try { R.bub.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 160, easing: 'ease-out' }); } catch (_) {}
    } else R.bub.hidden = true;
    R.hand.hidden = !sh.point;
    sh.shownAt = performance.now();
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
    S.raf = 0; if (!S.show || S.show.mode === 'hide') return;
    // 盤面上換成別場對決（⏸ 回標題再「直接開打」之類）：舊教學作廢，不准接管新的一場（B-stale-lesson-hijack）
    if (staleLesson()) { endLesson('aborted'); return; }
    // 對決盤面被收掉（⏸ → 唱片櫃之類）：遮罩先藏起來、不擋別的畫面；盤面回來再出現（ui.js 重開教學會叫 startDuelLesson，舊的自動作廢）
    var gone = !!((S.lesson || (S.soft && S.soft.kind === 'duel')) && !duelApi());
    if (S.root) S.root.classList.toggle('gone', gone);
    if (gone && S.soft && S.soft.kind === 'duel' && !S.lesson) { dismissSoft('gone'); return; }
    // 對決以外的一次性提示（今晚地圖）：它指的東西不見了（換畫面了）就收掉，不帶進對決（B-map-hint-leak）
    if (S.soft && S.soft.kind !== 'duel' && !S.lesson && softTargetsGone(S.soft)) { dismissSoft('gone'); return; }
    if (!gone && S.lesson) guardSheet();
    if (!gone) layout(false);
    S.raf = requestAnimationFrame(tick);
  }
  // 現在盤面上那場不是這堂課的那場
  function staleLesson() {
    var L = S.lesson; if (!L || L.dead) return false;
    var a = duelApi(); if (!a || !a.duel) return false;
    var d = null; try { d = a.duel(); } catch (_) { return false; }
    return !!d && d !== L.R.duel;
  }
  // 開著的對決面板（他的脾氣／算式／六格表）：回 data-kind 或 null
  function openSheetKind() {
    var el = document.querySelector('.dl-sheet:not([hidden])');
    if (!el || !rectOf(el)) return null;
    return el.getAttribute('data-kind') || 'sheet';
  }
  // 教學步驟中跑出來的面板（不是這一步要的）：收掉；操作步順便提醒「先點我指的這裡」（ART-01：面板蓋住屬性鈕、遮罩又不讓你按關閉）
  function guardSheet() {
    if (!openSheetKind()) return;
    var R = S.runner, s = R && R.active() ? R.cur() : null;
    if (!s) return;
    if (s.allow && (s.allow.sheet || s.allow.sheetClose)) return;
    if (S.ownSheet || (S.show && S.show.step && S.show.step.fx === 'calc')) return;
    var D = Duel(); if (D && D.sheet) try { D.sheet(null); } catch (_) {}
    if (S.show && S.show.mode === 'do') wrong('target');
  }
  function softTargetsGone(cur) {
    if (!cur || !cur.targets || !cur.targets.length || !cur.shownAt || performance.now() - cur.shownAt < 600) return false;
    return !rectOf(resolveTarget(cur.targets[0]));
  }

  function holesFor(sh) {
    var rs = [], look = sh.look || [], pass = [];
    (sh.targets || []).forEach(function (n) {
      var r = rectOf(resolveTarget(n)); if (!r) return;
      r = pad(r, sh.pad == null ? PAD : sh.pad); rs.push(r);
      if (look.indexOf(n) < 0) pass.push(r);
    });
    var out = mergeRects(rs);
    // 只給看的洞：合併後沒碰到任何可以點的目標的那幾個
    out.forEach(function (h) { h.look = !!look.length && !pass.some(function (p) { return inter(h, p); }); });
    return out;
  }
  function layout(force) {
    var sh = S.show; if (!sh) return;
    var R = S.root._, vw = W.innerWidth, vh = W.innerHeight;
    var holes = holesFor(sh);
    var keep = (sh.keep || []).map(function (n) { return rectOf(resolveTarget(n)); }).filter(Boolean);
    var ptEl = sh.point ? resolveTarget(sh.point) : null;
    if (ptEl && ptEl.nodeType === 1 && ptEl.querySelector) { var cv = ptEl.querySelector('.cv'); if (cv && rectOf(cv)) ptEl = cv; }   // 手牌：指封面，不蓋住星數
    var pt = rectOf(ptEl);
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
      if (h.look) dl += rect;      // 透明蓋子：看得到、點不穿
    });
    R.path.setAttribute('d', d);
    if (dl) R.lk.setAttribute('d', dl); else R.lk.removeAttribute('d');
    R.tb.setAttribute('x', 0); R.tb.setAttribute('y', 0); R.tb.setAttribute('width', vw); R.tb.setAttribute('height', tb);
    R.catcher.style.top = tb + 'px';
    // 金框
    var ringHTML = '';
    if (sh.mode !== 'wait') holes.forEach(function (h) { ringHTML += '<div class="tut-ring" style="left:' + h.left.toFixed(1) + 'px;top:' + h.top.toFixed(1) + 'px;width:' + h.width.toFixed(1) + 'px;height:' + h.height.toFixed(1) + 'px"></div>'; });
    if (R.rings.innerHTML !== ringHTML) R.rings.innerHTML = ringHTML;
    // 手指：指尖落在目標中心偏右下（不蓋住按鈕上的數字）；HAND 的指尖在圖的 (12,1)
    if (pt && sh.point) {
      R.hand.hidden = false;
      var tipX = pt.left + pt.width / 2 + Math.min(pt.width * 0.22, 26), tipY = pt.top + pt.height / 2 + Math.min(pt.height * 0.2, 12);
      R.hand.style.left = Math.round(tipX - 12) + 'px';
      R.hand.style.top = Math.round(tipY - 1) + 'px';
    } else R.hand.hidden = true;
    // 泡泡
    var sk = R.skip;
    var ar = appRect();
    sk.style.top = (tb + 6) + 'px';
    sk.style.right = Math.max(8, Math.round(vw - ar.right + 8)) + 'px';
    if (!R.bub.hidden) placeBubble(sh, holes, keep, ar, tb);
  }
  function placeBubble(sh, holes, keep, ar, tb) {
    var R = S.root._, b = R.bub;
    var left = Math.round(ar.left + 12), width = Math.round(ar.width - 24);
    b.style.left = left + 'px'; b.style.width = width + 'px';
    b.style.top = '0px'; b.classList.remove('up', 'down');
    var bh = b.offsetHeight || 60, vh = W.innerHeight;
    var minTop = tb + 4, maxBot = vh - 4;
    var first = holes[0] || null;
    var obst = holes.slice(1).concat(keep);
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
      // 'auto'（夜晚的一次性提示）：洞在畫面上半就放下面、在下半就放上面，泡泡往牌桌那邊靠
      var down1 = sh.bubble === 'below' || (sh.bubble === 'auto' && (first.top + first.bottom) / 2 < vh / 2);
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
      top = (g[1] - g[0] >= bh) ? Math.round(g[0] + (g[1] - g[0] - bh) / 2) : Math.round(Math.max(minTop, Math.min(maxBot - bh, g[0])));
      // 對決中：空白帶裡有牌桌就壓在牌桌中間（牌桌是選盤時最不要緊的一塊），別蓋到他拿出的盤、「他會出」或你的手牌
      var Dt = Duel(), tbl = Dt && Dt.el ? Dt.el('table') : null, tr = tbl ? tbl.getBoundingClientRect() : null;
      if (tr && tr.height && g[1] - g[0] >= bh && tr.bottom > g[0] && tr.top < g[1]) {
        var tt = Math.round(tr.top + tr.height / 2 - bh / 2);
        top = Math.max(g[0], Math.min(g[1] - bh, tt));
      }
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
    if (sh.mode === 'say' && sh.onTap && performance.now() - sh.shownAt > 280) { var f = sh.onTap; sh.onTap = null; f(); }
  }
  function onMaskDown(e) {
    e.preventDefault(); e.stopPropagation();
    var sh = S.show; if (!sh) return;
    if (sh.mode === 'do') wrong('target');
  }
  function bump(el) {
    if (!el || rm() || !el.animate) return;
    try { el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 300, easing: 'steps(3,end)' }); } catch (_) {}
  }
  var wrongT = 0;
  function wrong(kind) {
    var sh = S.show; if (!sh || !S.root || !(sh.mode === 'do' || sh.mode === 'soft') || sh.text == null) return;
    var R = S.root._;
    R.rings.querySelectorAll('.tut-ring').forEach(bump); bump(R.hand);
    var msg = kind === 'attr' && sh.step && sh.step.wrongAttr ? sh.step.wrongAttr : (UI().wrong || '先點我指的這裡。');
    setText(msg, false); layout(true);
    R.bub.classList.add('warn');
    clearTimeout(wrongT);
    wrongT = setTimeout(function () { if (S.show === sh) { R.bub.classList.remove('warn'); setText(sh.text, sh.colorChars); layout(true); } }, 1500);
  }

  // ---------------------------------------------------------------- 小動畫
  function A(el, kf, o) { if (!el || !el.animate) return null; try { return el.animate(kf, o); } catch (_) { return null; } }
  function fxStart(step) {
    var D = Duel(), q = function (n) { return D && D.el ? D.el(n) : null; };
    if (!step || !step.fx) return;
    var reduce = rm();
    switch (step.fx) {
      case 'stars': { var st = q('e-stars'); if (st && !reduce) st.querySelectorAll('.stars b').forEach(function (b, k) { A(b, [{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 320, delay: 150 + k * 220, easing: 'ease-out' }); }); break; }
      case 'bar6': { var w = q('e-intent'); if (w && !reduce) w.querySelectorAll('.bar6 i').forEach(function (c, k) { A(c, [{ opacity: 0.12 }, { opacity: 1 }], { duration: 160, delay: 120 + k * 90, fill: 'backwards' }); }); break; }
      case 'qi6': { var sg = q('p-qi'); var cells = sg ? sg.querySelectorAll('.seg > *') : []; var six = cells[5]; if (six && !reduce) A(six, [{ boxShadow: '0 0 0 0 rgba(184,134,11,0)' }, { boxShadow: '0 0 0 3px rgba(184,134,11,.9)' }, { boxShadow: '0 0 0 0 rgba(184,134,11,0)' }], { duration: 500, iterations: 2, delay: 150 }); break; }
      case 'sweep': sweep(step.target && step.target[0]); break;
      case 'stake': { var sk = q('stake'); var b2 = sk && sk.querySelector('b'); if (b2 && !reduce) A(b2, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)', offset: 0.45 }, { transform: 'scaleY(1)' }], { duration: 360, delay: 120, easing: 'ease-in-out' }); break; }
      case 'tri': drawTri(step.tri || []); break;
      case 'calc': if (D && D.sheet) try { S.ownSheet = true; D.sheet('calc'); } catch (_) {} break;
    }
  }
  function fxEnd(step, next) {
    var D = Duel();
    if (!step) return Promise.resolve();
    if (step.fx === 'calc') { S.ownSheet = false; if (D && D.sheet) try { D.sheet(null); } catch (_) {} }
    if (step.fx === 'tri' && !(next && next.fx === 'tri')) {
      if (step.triOut) return flyTo(triBox(), helpRect(), 360).then(clearTri);
      clearTri();
    }
    return Promise.resolve();
  }
  function sweep(name) {
    var r = rectOf(resolveTarget(name)); if (!r || rm()) return;
    var fx = S.root._.fx, s = document.createElement('div');
    s.className = 'tut-sweep';
    s.style.left = r.left + 'px'; s.style.top = r.top + 'px'; s.style.width = r.width + 'px'; s.style.height = r.height + 'px';
    s.innerHTML = '<i></i>';
    fx.appendChild(s);
    var a = A(s.firstChild, [{ transform: 'translateX(-120%) skewX(-20deg)' }, { transform: 'translateX(' + Math.round(r.width + 40) + 'px) skewX(-20deg)' }], { duration: 700, delay: 150, easing: 'ease-in-out', fill: 'both' });
    var done = function () { s.remove(); };
    if (a) a.finished.then(done, done); else setTimeout(done, 900);
  }
  // 相剋三角：畫進 duel.js 的 [data-tut=tri]（110×100、置中、不吃點擊）
  var TRI_POS = { c: [55, 15], o: [17, 83], h: [93, 83] };
  var TRI_ARROWS = { oc: ['o', 'c'], ch: ['c', 'h'], ho: ['h', 'o'] };   // 冷→經、經→硬、硬→冷（前者剋後者）
  var COLOR = { c: '#1f5fae', o: '#6a3fa0', h: '#c11628' }, ZH = { c: '經典', o: '冷門', h: '硬蕊' };
  function triHolder() { var D = Duel(); return D && D.el ? D.el('tri') : null; }
  function triBox() { var h = triHolder(); return h && h.querySelector('.tut-tri'); }
  function drawTri(lit) {
    var h = triHolder(); if (!h) return;
    var prev = h.querySelector('.tut-tri'); var prevLit = prev ? (prev.getAttribute('data-lit') || '').split(',') : [];
    var svg = '<svg viewBox="0 0 110 100" width="110" height="100" aria-hidden="true">';
    svg += '<defs>' + Object.keys(COLOR).map(function (a) { return '<marker id="tutArr' + a + '" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8Z" fill="' + COLOR[a] + '"/></marker>'; }).join('') + '</defs>';
    Object.keys(TRI_ARROWS).forEach(function (k) {
      var on = lit.indexOf(k) >= 0, f = TRI_POS[TRI_ARROWS[k][0]], t = TRI_POS[TRI_ARROWS[k][1]];
      var dx = t[0] - f[0], dy = t[1] - f[1], L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L, s0 = 17, s1 = 19;
      var x1 = f[0] + ux * s0, y1 = f[1] + uy * s0, x2 = t[0] - ux * s1, y2 = t[1] - uy * s1;
      var col = COLOR[TRI_ARROWS[k][0]];
      svg += on ? '<line class="ar' + (prevLit.indexOf(k) < 0 ? ' new' : '') + '" x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + col + '" stroke-width="3" marker-end="url(#tutArr' + TRI_ARROWS[k][0] + ')"/>'
        : '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#ddd" stroke-width="1.5" stroke-dasharray="3 3"/>';
    });
    svg += '</svg>';
    var lab = Object.keys(TRI_POS).map(function (a) { return '<b class="' + a + '" style="left:' + TRI_POS[a][0] + 'px;top:' + TRI_POS[a][1] + 'px">' + ZH[a] + '</b>'; }).join('');
    var box = prev || document.createElement('div');
    box.className = 'tut-tri';
    box.setAttribute('data-lit', lit.join(','));
    box.innerHTML = svg + lab;
    if (!prev) { h.appendChild(box); if (!rm()) A(box, [{ opacity: 0, transform: 'scale(.8)' }, { opacity: 1, transform: 'none' }], { duration: 200, easing: 'ease-out' }); }
    if (!rm()) box.querySelectorAll('line.new').forEach(function (ln) {
      var len = 80; ln.style.strokeDasharray = len; ln.style.strokeDashoffset = len;
      var a = A(ln, [{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 420, delay: 180, easing: 'ease-out', fill: 'forwards' });
      var fin = function () { ln.style.strokeDasharray = ''; ln.style.strokeDashoffset = ''; }; if (a) a.finished.then(fin, fin);
    });
  }
  function clearTri() { var b = triBox(); if (b) b.remove(); }
  function helpRect() {
    var el = document.querySelector('#top [data-tut="help"]') || document.querySelector('[data-tut="help"]') || document.querySelector('#top [data-act="help"]');
    if (!el) { var bs = document.querySelectorAll('#top button'); for (var i = 0; i < bs.length; i++) if (/^[?？]$/.test((bs[i].textContent || '').trim())) { el = bs[i]; break; } }
    var r = el && rectOf(el);
    if (r) return r;
    var ar = appRect(); return { left: ar.right - 60, top: 4, right: ar.right - 36, bottom: 28, width: 24, height: 24 };
  }
  // 元素飛進頂欄「?」縮小（300 ms）；減少動態＝淡出
  function flyTo(el, to, ms) {
    if (!el) return Promise.resolve();
    var fr = el.getBoundingClientRect();
    if (rm() || !el.animate || !fr.width) { var a0 = A(el, [{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: 'forwards' }); return a0 ? a0.finished.catch(function () {}) : Promise.resolve(); }
    var dx = (to.left + to.width / 2) - (fr.left + fr.width / 2), dy = (to.top + to.height / 2) - (fr.top + fr.height / 2);
    var a = A(el, [{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px) scale(.12)', opacity: 0.4 }], { duration: ms || 300, easing: 'cubic-bezier(.5,0,.9,.6)', fill: 'forwards' });
    return a ? a.finished.catch(function () {}) : Promise.resolve();
  }
  // 「學會了：…」小卡：從牌桌浮出 → 飛進「?」
  function learnCard(title) {
    if (!title) return Promise.resolve();
    S.learnedAll.push(title);
    ensureRoot();
    var D = Duel(), tbl = rectOf(D && D.el ? D.el('table') : null), ar = appRect();
    var c = document.createElement('div');
    c.className = 'tut-learn';
    c.innerHTML = '<small>' + esc(UI().learnedPrefix || '學會了：') + '</small><b>' + colorize(title, true) + '</b>';
    S.root._.fx.appendChild(c);
    var cw = c.offsetWidth, chh = c.offsetHeight;
    var cx = tbl ? tbl.left + tbl.width / 2 : ar.left + ar.width / 2, cy = tbl ? tbl.top + tbl.height / 2 : W.innerHeight / 2;
    c.style.left = Math.round(cx - cw / 2) + 'px'; c.style.top = Math.round(cy - chh / 2) + 'px';
    sfx('slam');
    var p = (rm() ? Promise.resolve() : (function () { var a = A(c, [{ transform: 'scale(.6)', opacity: 0 }, { transform: 'scale(1.06)', opacity: 1, offset: 0.6 }, { transform: 'scale(1)', opacity: 1 }], { duration: 260, easing: 'ease-out' }); return a ? a.finished.catch(function () {}) : Promise.resolve(); })())
      .then(function () { return wait(rm() ? 700 : 820); })
      .then(function () { return flyTo(c, helpRect(), 300); })
      .then(function () { c.remove(); });
    S.learnBusy = S.learnBusy.then(function () { return p; });
    return p;
  }

  // ---------------------------------------------------------------- 等待
  function duelApi() { var D = Duel(); return D && D.api ? D.api() : null; }
  function duelReady() {
    var a = duelApi(); if (!a) return false;
    var dbg = Duel().debug ? Duel().debug() : null;
    if (dbg && dbg.enterDone === false) return false;
    if (a.busy && a.busy()) return false;
    var ph = a.phase ? a.phase() : 'choose';
    return ph === 'choose' || ph === 'attr';
  }
  function until(fn, ms, every) {
    var L0 = S.lesson;
    return new Promise(function (res) {
      var t0 = performance.now();
      (function poll() {
        if (L0 && L0.dead) return res(false);
        if (L0 && L0 === S.lesson && staleLesson()) { endLesson('aborted'); return res(false); }
        var v = false; try { v = fn(); } catch (_) {}
        if (v) return res(v);
        if (ms && performance.now() - t0 > ms) return res(false);
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
    var mounted = a && a.duel ? a.duel() : null;
    var duel = mounted || o.duel || null;               // 以盤面上那場為準（重看教學時存檔裡的 run.duel 是另一場）
    if (mounted && o.duel && o.duel !== mounted) console.warn('DipLabTut: startDuelLesson 的 duel 跟盤面上的不是同一場，用盤面上的');
    if (!C.tutorial || !duel) { console.error('DipLabTut.startDuelLesson: 沒有 C.tutorial 或對決'); return Promise.resolve('aborted'); }
    var tier = o.tier || (duel.p && duel.p.ear) || 'hall';
    var R = createRunner(C, tier, duel, { from: o.from });
    var L = { R: R, tier: tier, stage: o.stage || CFG.stage, replay: !!o.replay, dead: false, res: null, offs: [] };
    L.promise = new Promise(function (res) { L.res = res; });
    S.lesson = L; S.runner = R; S.armed = 0;
    ensureRoot();
    if (D && D.on) {
      L.offs.push(D.on('infoClosed', function () { if (S.runner === R) R.gate({ kind: 'close' }); kick(); }));
      L.offs.push(D.on('over', function (res) { void res; kick(); }));
    }
    setShow({ mode: 'wait' });
    run(L);
    return L.promise;
  }
  var kickers = [];
  function kick() { var k = kickers; kickers = []; k.forEach(function (f) { try { f(); } catch (_) {} }); }
  function kicked(ms) { return new Promise(function (res) { var t = setTimeout(res, ms || 80); kickers.push(function () { clearTimeout(t); res(); }); }); }

  function endLesson(why) {
    var L = S.lesson; if (!L) return;
    L.dead = true;
    if (L.step && L.step.finish) try { L.step.finish(); } catch (_) {}   // 讓舊的 run() 迴圈醒來、看到 dead 就收
    L.offs.forEach(function (f) { try { f && f(); } catch (_) {} });
    if (S.runner) { if (why === 'skipped') S.runner.skip(); else if (why !== 'done') S.runner.release(); }
    clearTri();
    var D = Duel();
    setShow(null);
    S.lesson = null;
    if (D && D.rerender) try { D.rerender(); } catch (_) {}
    L.res(why);
  }

  async function run(L) {
    var R = L.R;
    // 進場：等盤面滑上來、鏡頭推完、遇敵黑條（fx.encounter2 的 .enc2）收掉
    await until(function () { return duelReady() && !document.querySelector('.enc2, .lb-duelwrap.entering'); }, 0);
    if (L.dead) return;
    await wait(350);
    while (!L.dead) {
      while (R.learnQ.length && !L.dead) { setShow({ mode: 'wait' }); await learnCard(R.learnQ.shift()); }
      if (L.dead) return;
      if (R.state === 'released') return endLesson('released');
      if (R.state === 'skipped') return endLesson('skipped');
      if (R.awaiting) {     // 出完牌：等這手結算完、下一手可以點（或分出勝負）
        setShow({ mode: 'wait' });
        var t0 = performance.now(), sawBusy = false;
        await until(function () {
          var a = duelApi(); if (!a) return false;
          if (a.busy && a.busy()) sawBusy = true;
          var d = a.duel ? a.duel() : R.duel;
          if (d && d.over) return true;
          if (!sawBusy && performance.now() - t0 > 1500) return true;     // 引擎沒收（極少見）：退回那一步
          return duelReady() && a.view && a.view().hand > R.commitHand;
        }, 0, 40);
        if (L.dead) return;
        var d2 = R.duel;
        if (!sawBusy && !d2.over && (duelApi() && duelApi().view().hand <= R.commitHand)) { R.awaiting = false; R.idx = Math.max(0, R.idx - 1); continue; }
        if (d2.over) {
          if (d2.over === 'win' && R.state !== 'released') {
            if (R.state === 'run') { R.learned.push(Cn().tutorial.learned.L5); R.learnedIds.push('L5'); R.state = 'done'; }
            // 引擎已經分出勝負，畫面還在演這一手：等盤面進到 over、牌桌大章（900 ms）蓋完再飛小卡，不跟浮框、大章疊在一起。
            // settled() 先掛住，duel.js 的 beforeEnd 會等小卡飛完才收盤面
            var release = null, hold = new Promise(function (r) { release = r; });
            S.learnBusy = S.learnBusy.then(function () { return hold; });
            await until(function () { var a2 = duelApi(); return !a2 || (a2.phase && a2.phase() === 'over'); }, 4000, 60);
            if (!L.dead) await wait(rm() ? 300 : 950);
            if (L.dead) { release(); return; }
            setShow({ mode: 'fx' });           // 只留小卡（不壓暗、不擋點）
            await learnCard(Cn().tutorial.learned.L5);
            release();
            return endLesson('done');
          }
          return endLesson('released');
        }
        R.handReady();
        continue;
      }
      var s = R.cur();
      if (!s) { if (R.state === 'done') return endLesson('done'); return endLesson('released'); }
      // 這一步要的東西出現了才開始（例：attr 鈕在選了盤之後才有）
      setShow({ mode: 'wait', keepMask: true });
      var lookOnly = !!(s.allow && (s.allow.close || s.allow.sheetClose));     // 等著關掉的東西（唱片資訊、面板）：已經關了就跳過
      var ready = await until(function () { return duelReady() && targetsReady(s); }, s.kind === 'do' && lookOnly ? 1500 : 4000);
      if (L.dead) return;
      if (R.cur() !== s) continue;          // 等的時候已經被點掉了（例：唱片資訊一開就關）
      if (!ready) {
        if (s.kind === 'say' || lookOnly) { R.log.push('skip ' + s.id); R.done(); continue; }
        console.warn('DipLabTut: 步驟 ' + s.id + ' 的目標沒出現，放手'); R.release(); continue;
      }
      if (s.delay) { await wait(s.delay); if (L.dead) return; }
      R.begin();
      var D = Duel();
      if (s.previews && D && D.rerender) try { D.rerender(); } catch (_) {}
      await showStep(L, s);
      if (L.dead) return;
      await fxEnd(s, R.cur());
    }
  }
  function targetsReady(s) {
    var list = s.target || [];
    if (!list.length) return true;
    for (var i = 0; i < list.length; i++) { if (rectOf(resolveTarget(list[i]))) return true; }
    return false;
  }
  // 一步：say 等點一下；do 等 gate 放行；soft 等任一操作
  function showStep(L, s) {
    var R = L.R;
    return new Promise(function (res) {
      var finished = false;
      var finish = function () { if (finished) return; finished = true; res(); };
      var text = R.text(s);
      if (s.kind === 'say') {
        setShow({ mode: 'say', step: s, targets: s.target, text: text, bubble: s.bubble, keep: s.keep, colorChars: s.colorChars, point: null,
          onTap: function () { sfx('tick'); R.done(); setShow({ mode: 'wait', keepMask: true }); finish(); } });
        fxStart(s);
        L.step = { s: s, finish: finish };
        return;
      }
      var modal = !!(s.allow && s.allow.close);
      var phaseTargets = function () {
        var a = duelApi(), ph = a && a.phase ? a.phase() : 'choose';
        return (s.target2 && ph === 'attr' && R.picked) ? { t: s.target2, p: s.point2 || s.target2[0] } : { t: s.target, p: s.point || s.target[0] };
      };
      var pt = phaseTargets();
      setShow({ mode: modal ? 'modal' : (s.kind === 'soft' ? 'soft' : 'do'), step: s, targets: pt.t, look: s.look, point: pt.p, text: text, bubble: modal ? 'above' : s.bubble, keep: s.keep, colorChars: s.colorChars });
      fxStart(s);
      if (modal) S.root.classList.add('over-modal');
      L.step = {
        s: s, finish: finish,
        onGate: function (last) {         // gate 之後由 hooks 呼叫
          if (finished) return;
          if (!last.ok) { wrong(last.wrong); return; }
          if (last.released) { finish(); return; }
          if (last.final) { finish(); return; }
          // 2-3：挑了一張 → 洞改成屬性鈕、手指指冷門
          setTimeout(function () { if (!finished && S.show && S.show.step === s) { var p3 = phaseTargets(); S.show.targets = p3.t; S.show.point = p3.p; S.sig = ''; } }, 30);
        },
        onPhase: function (ph) {
          if (finished) return;
          if (s.id === '5-2' && ph === 'choose' && !R.awaiting) { R.idx = Math.max(0, R.idx - 1); finish(); return; }   // 收回輾壓 → 回 5-1
          if (s.target2) { var p4 = phaseTargets(); if (S.show && S.show.step === s) { S.show.targets = p4.t; S.show.point = p4.p; S.sig = ''; } }
        }
      };
      // 唱片資訊沒開成（沒有 cardinfo）：1-9 自己收
      if (modal) until(function () { return !document.getElementById('cardInfoMask'); }, 0, 120).then(function () { if (!finished && R.cur() === s) { R.gate({ kind: 'close' }); finish(); } });
      // 2-7：他的脾氣面板開了就算（duel.js 有沒有先問 gate 都一樣）；2-7b：面板關了就算
      if (s.allow && s.allow.sheet) until(function () { return openSheetKind() === s.allow.sheet; }, 0, 80).then(function (v) { if (v && !finished && R.cur() === s) { R.gate({ kind: 'sheet', which: s.allow.sheet }); finish(); } });
      if (s.allow && s.allow.sheetClose) until(function () { return !openSheetKind(); }, 0, 80).then(function (v) { if (v && !finished && R.cur() === s) { R.gate({ kind: 'sheetClose' }); finish(); } });
    }).then(function () { if (S.root) S.root.classList.remove('over-modal'); if (L.step && L.step.s === s) L.step = null; });
  }

  // ---------------------------------------------------------------- duel.js hooks.tut
  function duelHooks() {
    S.armed = performance.now();
    return {
      gate: function (a) {
        var R = S.runner, L = S.lesson;
        if (!L || !R) {
          // mount 之後、startDuelLesson 之前：擋 3 秒（防止玩家搶先出牌），之後放行
          if (S.armed && performance.now() - S.armed < 3000 && a && a.kind !== 'close') return false;
          return true;
        }
        var ok = R.gate(a);
        var last = R.last || { ok: ok };
        if (L.step && L.step.onGate) L.step.onGate(last);
        else if (!ok && S.show) wrong(last.wrong);
        if (last.released) { kick(); }
        return ok;
      },
      forcedCell: function () { return S.runner && S.lesson ? S.runner.forcedCell() : null; },
      previews: function () { return S.runner && S.lesson ? S.runner.previewsOn() : true; },
      onPhase: function (ph) { var L = S.lesson; if (L && L.step && L.step.onPhase) L.step.onPhase(ph); kick(); },
      onResolved: function (evs) { if (S.runner && S.lesson) S.runner.resolved(evs); kick(); }
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

  // ---------------------------------------------------------------- 第一個夜晚：遇到才教（soft，一個存檔一次）
  var DUEL_HINTS = { h_eult: 1, h_reflect: 1, h_feint: 1, h_copy: 1, h_grudge: 1, h_eye: 1, h_hidden: 1, h_chain: 1, h_request: 1, h_hegemony: 1, h_skip: 1, h_face: 1 };
  var POINT_HINTS = { h_reflect: 1 };
  function seen(id) {
    try { var sv = CFG.save && CFG.save(); if (sv && sv.seen) return !!sv.seen[id]; } catch (_) {}
    return !!S.memSeen[id];
  }
  function markSeen(id) {
    S.memSeen[id] = true;
    try { var sv = CFG.save && CFG.save(); if (sv) { sv.seen = sv.seen || {}; sv.seen[id] = true; if (CFG.persist) CFG.persist(); } } catch (e) { console.error(e); }
  }
  function commitSeen(id) {
    if (id) { if (S.pendingSeen[id]) { delete S.pendingSeen[id]; markSeen(id); } return; }
    Object.keys(S.pendingSeen).forEach(function (k) { delete S.pendingSeen[k]; markSeen(k); });
  }
  function firstTime(id, targets) {
    if (!id || S.lesson) return;                 // 教學進行中不出、也不記
    if (seen(id) || S.pendingSeen[id]) return;
    var C = Cn();
    var lines = (id === 'map' || id === 'h_map') ? ((C.shopLines && C.shopLines.mapIntro) || []).slice() : (C.hints && C.hints[id] ? [C.hints[id]] : []);
    if (!lines.length) return;
    if (S.softQ.some(function (x) { return x.id === id; }) || (S.soft && S.soft.id === id)) return;
    S.softQ.push({ id: id, targets: (targets || []).slice(), lines: lines });
    ensureDuelSeenHook();
    setTimeout(pumpSoft, 0);      // 同一下送進來的幾則（殺氣騰騰那手的 h_eult＋h_reflect）先排好再挑
  }
  var duelSeenOff = null;
  function ensureDuelSeenHook() {
    var D = Duel();
    if (duelSeenOff || !D || !D.on) return;
    duelSeenOff = D.on('resolved', function () {   // 照著做完那一手才寫 seen（B15）
      Object.keys(S.pendingSeen).forEach(function (k) { if (S.pendingSeen[k] === 'duel') { delete S.pendingSeen[k]; markSeen(k); } });
      if (S.soft && S.soft.kind === 'duel') dismissSoft('resolved');
    });
  }
  var SOFT_READ_MS = 1200;          // 提示至少要在畫面上這麼久，點掉才算看過（NP-05：手快點掉的不算）
  function duelNow() {               // { d: 這場對決, hand: 第幾手, choose: 現在可以重新選盤 }
    var a = duelApi(); if (!a) return null;
    var d = null, hand = 0, ph = 'choose';
    try { d = a.duel ? a.duel() : null; hand = a.view ? (a.view().hand | 0) : 0; ph = a.phase ? a.phase() : 'choose'; } catch (_) {}
    return { d: d, hand: hand, choose: duelReady() && ph === 'choose' };
  }
  function qIndex(id) { for (var i = 0; i < S.softQ.length; i++) if (S.softQ[i].id === id) return i; return -1; }
  function pumpSoft() {
    if (S.soft || !S.softQ.length || S.lesson) return;
    // 殺氣騰騰那手、王牌剋得到：先講七星回擊（比割捨防禦好得多）；h_eult 這次不出、也不記看過，下一次殺氣騰騰再講
    var iR = qIndex('h_reflect'), iE = qIndex('h_eult');
    if (iR >= 0 && iE >= 0) S.softQ.splice(iE, 1);
    var h = S.softQ[0];
    var isDuel = !!DUEL_HINTS[h.id];
    if (isDuel) {
      var now = duelNow();
      if (!now) { S.softQ.shift(); setTimeout(pumpSoft, 0); return; }   // 對決已經收掉：丟掉
      // NP-05：對決中的提示只在「可以重新選盤」的時候出（不插在選了盤、按了輾壓還沒確認的兩下中間），而且一手最多一則
      var sameHand = S.softHand && S.softHand.d === now.d && S.softHand.hand === now.hand;
      if (!now.choose || sameHand) { setTimeout(pumpSoft, 150); return; }
      S.softHand = { d: now.d, hand: now.hand };
    }
    S.softQ.shift();
    var cur = { id: h.id, kind: isDuel ? 'duel' : 'other', lines: h.lines, k: 0, targets: h.targets, retried: !!h.retried };
    S.soft = cur;
    S.pendingSeen[h.id] = cur.kind;
    showSoft(cur);
  }
  function showSoft(cur) {
    // 對決中的提示：泡泡貼著洞、往牌桌靠，不蓋手牌與屬性鈕（玩家要看得到手上的盤才能照著做）
    var duelK = cur.kind === 'duel';
    setShow({ mode: 'soft', targets: cur.targets, text: cur.lines[cur.k], point: POINT_HINTS[cur.id] ? cur.targets[0] : null, bubble: duelK ? 'auto' : 'free', keep: duelK ? ['hand', 'attrs'] : null });
    var t0 = performance.now();
    if (!cur.shownAt) cur.shownAt = t0;
    cur.lineAt = t0;                 // 這一句出現的時間（最後一句停滿 1.2 s 才點掉，才算讀過）
    var h = function (e) {
      if (e && e.timeStamp && e.timeStamp < t0 - 1) return;     // 叫出這則的那一下不算
      document.removeEventListener('pointerdown', h, true);
      if (S.soft !== cur) return;
      if (cur.k < cur.lines.length - 1) { cur.k++; setTimeout(function () { if (S.soft === cur) showSoft(cur); }, 0); return; }
      dismissSoft('tap');
    };
    cur.off = function () { document.removeEventListener('pointerdown', h, true); };
    // 馬上開始聽（B-map-hint-leak：晚 250 ms 才聽，那段時間點了收不掉，就被帶進下一個畫面）
    setTimeout(function () { if (S.soft === cur) document.addEventListener('pointerdown', h, true); }, 0);
  }
  // how：'tap'＝玩家點掉；其他（換畫面、對決收掉、這手結算完）＝自動收。
  //   對決中的提示：照著做完那一手（'resolved'）才記看過，那邊先記好了才叫這裡；
  //   對決以外的（今晚地圖）：玩家在最後一句停滿 1.2 s 後自己點掉才記看過，換畫面被收掉的下次再出（NP-05、B-map-hint-leak）
  var NO_RETRY = { h_eult: 1, h_reflect: 1 };      // 只在殺氣騰騰那一手有意義：不補出，下一次殺氣騰騰再講
  function dismissSoft(how) {
    var cur = S.soft; if (!cur) return;
    if (cur.off) cur.off();
    S.soft = null;
    var read = how === 'tap' && cur.lineAt && performance.now() - cur.lineAt >= SOFT_READ_MS;
    if (cur.kind !== 'duel') { if (read) commitSeen(cur.id); else delete S.pendingSeen[cur.id]; }
    else if (how === 'tap' && !read) {
      // 一閃就被點掉：不算看過，下一手再出一次（只補一次）
      delete S.pendingSeen[cur.id];
      if (!cur.retried && !NO_RETRY[cur.id] && duelApi()) S.softQ.push({ id: cur.id, targets: cur.targets, lines: cur.lines, retried: true });
    } else if (how !== 'tap' && how !== 'resolved') delete S.pendingSeen[cur.id];   // 對決收掉了還沒做完那一手：不算
    if (!S.lesson) setShow(null);
    setTimeout(pumpSoft, 200);
  }

  // ---------------------------------------------------------------- 公開
  var api = {
    configure: function (o) { o = o || {}; ['stage', 'save', 'persist', 'content'].forEach(function (k) { if (o[k] !== undefined) CFG[k] = o[k]; }); return api; },
    duelHooks: duelHooks,
    startDuelLesson: startDuelLesson,
    step: step,
    firstTime: firstTime,
    hintHook: function (id, targets) { firstTime(id, targets); return true; },
    commitSeen: commitSeen,
    skip: function () { if (S.lesson) endLesson('skipped'); },
    abort: function () { if (S.lesson) endLesson('aborted'); },
    fastForward: function () {      // 頂欄 ⏩：跳到下一個要操作的步驟
      var L = S.lesson, R = S.runner; if (!L || !R || R.awaiting) return;
      var s = R.cur(); if (!s || s.kind !== 'say') return;
      var f = L.step && L.step.s === s ? L.step.finish : null;
      while (R.cur() && R.cur().kind === 'say') R.done();
      fxEnd(s, R.cur()); clearTri();
      if (f) f();
    },
    active: function () { return !!(S.lesson && S.runner && S.runner.active()); },
    learned: function () { return S.learnedAll.slice(); },
    // 學到的規則鍵（C.tutorial.learned 的 L1／L3／L4／L5）：不管教學怎麼結束（走完、跳過、放手），ui.js 都可以寫進 save.learned
    learnedIds: function () { var L = (Cn().tutorial && Cn().tutorial.learned) || {}; return Object.keys(L).filter(function (k) { return S.learnedAll.indexOf(L[k]) >= 0; }); },
    dismissSoft: function () { dismissSoft('ui'); },
    settled: function () { return S.learnBusy; },
    // 給 ui.js 開教學場（SPEC-v2 §6.3：startDuel 之後、第一手之前排好牌）
    content: function (C) { return content(C || Cn()); },
    enemyDef: function (C) { return enemyDef(C || Cn()); },
    startOpts: function (C) { return startOpts(C || Cn()); },
    prepDuel: function (duel, tier, C) { return prepDuel(duel, tier, C || Cn()); },
    prepareDuel: function (duel, o) { o = o || {}; return prepareDuel(duel, { tier: o.tier, content: o.content || Cn() }); },
    debug: function () {
      var R = S.runner;
      return { active: api.active(), step: R && R.cur() ? R.cur().id : null, shown: S.show && S.show.step ? S.show.step.id || null : null, idx: R ? R.idx : -1, state: R ? R.state : null, awaiting: R ? R.awaiting : null,
        previews: R ? R.previewsOn() : true, cell: R ? R.forcedCell() : null, mode: S.show ? S.show.mode : null,
        text: S.root && S.root._ && !S.root._.bub.hidden ? S.root._.tx.textContent : null, holes: S.show && S.show.holes ? S.show.holes.length : 0,
        soft: S.soft ? S.soft.id : null, learned: S.learnedAll.slice(), log: R ? R.log.slice(-30) : [] };
    },
    _core: core
  };
  W.DipLabTut = api;
  W.addEventListener('resize', function () { S.sig = ''; });
})(typeof self !== 'undefined' ? self : this);
