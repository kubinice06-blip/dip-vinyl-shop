// game-lab/duel.js — 品味對決 v4：店內舞台下方的對決盤面（Agent B1；SPEC-v4 §2.5.1、§2.2.7、§2.3.3）
//
// ── v4 contract（tutorial.js／ui.js／e2e 照這些名字找）────────────────────────────────────────────────────
// data-tut  他的一塊：e-hud e-name e-honesty（D §5：店主 06:05 拿掉，DOM 留著但 hidden） e-hp e-hint e-rec e-sleeve e-pile
//           牌桌    ：table slot-e slot-p tri tri-oc tri-ch tri-ho rounds result（浮框 .l1 .l2 .l3） lastline
//           你的一塊：p-hud p-hp relics relic-<id> hand hand-<i> hand-ace card-<i> card-ace chip-<i>-<attr> chip-ace act throw
// el(name)：上面的名字；
//           'card:best:<attr>'／'chip:best:<attr>'（＋':ace'＝王牌也算）＝那一色星最多的那張封面／星鈕（engine.bestChip）；
//           'card:id:<cardId>'＝那張的封面；'chip:id:<cardId>:<attr>'＝那張那色的星鈕；'chip:blocked:<attr>'＝engine.blockedChoice；
//           'card:<cardId>'＝那張的整格（v3）；'@f'|'@p'|'@o'＝舞台錨點。
//
// DipLabDuel.mount(panelEl, { duel, events, run, content, enter, onEnd(result), onSave(duel),
//   hooks: { stage, cardInfo(card,{attr,from}), hint(id,targets), settings()->{fastAnim}, onEvent(ev,duel), tut, resolveOpts(act),
//            beforeEnd(result)->Promise, endText(result)->{title,sub}|null, relicIcon(id,size)->html } })
//   result（onEnd／'over'）＝{ over:'win'|'lose', win, by:'hp'|'rounds'|'pile', pHp, eHp, duel }
// DipLabDuel.unmount() rerender() el(name) on(evt,cb)->off hold(bool)->count select(i|'ace'|null, attr?) play(act)->Promise
//           tri(lit|null)（教學：強制亮哪幾條箭頭，'oc'|'ch'|'ho' 或陣列） autoplay(policy) stopAuto() debug()
//           _fmt.clashText(clashEvent, T, hints) → { l1, l2, l3, cls, rule, notes }（e2e 比對浮框）
// gate（hooks.tut.gate(action) 回 false 就擋）：{kind:'card',i,attr,id}（點封面＝選這張、自動選 topAttr）
//   {kind:'chip',i,attr,id}（點星鈕＝換屬性；再點已選的那顆不做事） {kind:'throw',i,attr,id}（「丟！」＝唯一的出手方式）
//   {kind:'info',where} {kind:'close'}；i＝0..2 或 'ace'
// 事件：'phase'(choose|resolve|over) 'selected'({i,attr}|null) 'resolved'(evs：560 ms 浮框剛出現時，同步) 'settled'(evs：1460 浮框收成一行)
//       'handStart'(view) 'over'(result) 'info'(where) 'infoClosed'(where) 'relic'(id)
//
// 規則：畫面上每個數字都來自引擎的 view()／resolveTurn() 事件；UI 不算傷害、不讀 duel.plan。提示只寫句子，不寫屬性名（D §5）。
// 一手（T_FLIP 280／T_HIT 560／T_LINE 1460／T_NEXT 2060）：0 你的牌飛上牌桌、他那格「蓋著」、舞台一台唱盤開演 → 280 他那格翻面
//   → 560 浮框三行、聲望 → 1460 收成「上一手」→ 2060 下一手。結算中點畫面任一處（牌桌兩張除外）＝這手 4 倍速；?fast=1 全程 4 倍速；?debug=1 → window.__dl。
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  const BASE = (function () {
    try { const s = document.currentScript && document.currentScript.src; if (s) return new URL('.', s).href; } catch (_) {}
    try { return new URL('.', location.href).href; } catch (_) { return ''; }
  })();
  const ZH = { c: '經典', o: '冷門', h: '硬蕊' }, ZH1 = { c: '經', o: '冷', h: '硬' }, ATTRS = ['c', 'o', 'h'];
  const EDGES = [['o', 'c'], ['c', 'h'], ['h', 'o']];   // 三角的箭頭（畫圖用；輸贏一律看引擎事件）：冷→經、經→硬、硬→冷
  const TIER_AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };
  const LONG_MS = 450;     // 長按手牌封面＝唱片資訊
  const RUSH_MS = 350;     // 丟出後 350 ms 內的點擊不算「加速這一手」
  const T_FLIP = 280, T_HIT = 560, T_LINE = 1460, T_NEXT = 2060;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const Eng = () => window.DipLabEngine;
  const Fx = () => window.DipLabFx || null;
  const sfx = (n, o) => { const f = Fx(); if (f && f.sfx) try { f.sfx(n, o); } catch (_) {} };
  const qs = new URLSearchParams(location.search || '');
  const FAST = qs.get('fast') === '1';
  const rmq = () => { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; } };
  const cssEsc = s => (window.CSS && CSS.escape ? CSS.escape(String(s)) : String(s).replace(/["\\]/g, '\\$&'));

  // ------------------------------------------------------------------ covers
  function coverSrc(card) {
    if (!card) return '';
    if (card.localCover) { try { return new URL(card.localCover, BASE).href; } catch (_) {} }
    return card.coverUrl || '';
  }
  function img(card) {
    if (!card) return '<span class="cv noimg"></span>';
    const src = coverSrc(card);
    if (!src) return `<span class="cv noimg"><span>${esc(card.album)}</span></span>`;
    const fb = card.localCover && card.coverUrl ? ` data-fb="${esc(card.coverUrl)}"` : '';
    return `<img class="cv" src="${esc(src)}"${fb} alt="${esc((card.artist || '') + '《' + (card.album || '') + '》')}" draggable="false" decoding="async">`;
  }
  // 封套背面（他蓋著的那張；跟舞台 holdDraw 的背面同一個樣子：深色紙＋白色內圈標）
  const sleeveHTML = cls => `<span class="sleeve-bk${cls ? ' ' + cls : ''}" aria-hidden="true"><i></i></span>`;
  const title = c => c ? `${c.artist || ''}《${c.album || ''}》` : '';
  const starOf = (c, a) => (c && c[a] | 0) || 0;
  // 峰值那軸，並列 c→o→h（＝engine.topAttr；引擎沒載入時的退路）
  function topAttrOf(c) {
    const E = Eng(); if (E && typeof E.topAttr === 'function') try { return E.topAttr(c); } catch (_) {}
    let b = 'c'; for (const a of ['o', 'h']) if (starOf(c, a) > starOf(c, b)) b = a; return b;
  }
  const aceAxisOf = c => c ? (TIER_AXIS[c.tier] || topAttrOf(c)) : 'c';

  // ------------------------------------------------------------------ 字
  // 盤面上的字：content.duelText 有就用（lint 掃 content.js），沒有就用這份（同一套字，SPEC-v4 §2.2.7）
  const DT0 = {
    pickHint: '點一張專輯', picked: '選好了：', again: '點別的星換屬性，或按丟', throwBtn: '丟！', waiting: '演完就換下一手（點畫面跳過）',
    hintLabel: '提示', sleeve: '蓋著', rounds: '第 {n}／{max} 手', hp: '聲望', aceSlot: '王牌', aceUsed: '用過', aceWord: '王牌',
    he: '他・', you: '你・', slotE: '他丟的', slotP: '你丟的', lastPrefix: '上一手', pileLeft: '他還有 {n} 張',
    counter: '{a}剋{b}，命中！', countered: '{b}剋{a}，被剋了。',
    blockedYou: '{a}剋{b}，但他高你 2 星以上，剋不動。比星數，', blockedHim: '{b}剋{a}，但你高他 2 星以上，他剋不動。比星數，',
    aceYou: '{b}剋{a}，但王牌不會被剋。比星數，', aceHim: '{a}剋{b}，但他的王牌不會被剋。比星數，',
    mirror: '同樣是{a}，比星數，', tie: '一樣大，不扣。',
    hitE: '他 −{n}', hitP: '你 −{n}',
    bluff: '他唬你！『{key}』是{hint}，他出的是{e}。', honest: '『{key}』是{hint}，他照實出。',
    bluffNoKey: '他唬你！提示是{hint}，他出的是{e}。', honestNoKey: '提示是{hint}，他照實出。',
    koWin: '品味勝出', koWinSub: '你贏了【{name}】。', koLose: '聲望歸零', koLoseRetry: '老闆：……再一場。',
    roundsOut: '六手打完，比聲望', roundsScore: '你 {p} 比 他 {e}：{who}贏',
  };
  function dtOf(content) {
    const src = (content && content.duelText) || {};
    return (k, vars) => {
      let s = src[k] != null ? String(src[k]) : (DT0[k] != null ? DT0[k] : k);
      if (vars) s = s.replace(/\{(\w+)\}/g, (m, n) => (vars[n] != null ? vars[n] : ''));
      return s;
    };
  }
  const T0 = dtOf(null);
  // 提示句：view().hint.line（id）→ C.hints 那句 { id, text, key }（A1 notes 請求：字串＝C.hints[attr] 裡 id === line 那句）
  function hintOf(hints, h) {
    if (!h || !h.line) return null;
    const H = hints || (window.DipLabContent && window.DipLabContent.hints) || null;
    if (!H) return null;
    const find = arr => Array.isArray(arr) ? arr.find(x => x && (x.id === h.line)) : null;
    let x = find(H[h.attr]);
    if (!x) for (const a of ATTRS) { x = find(H[a]); if (x) break; }
    return x || null;
  }
  // 一手的結果字（SPEC-v4 §2.5.1）。c＝clash 事件（或 view().last）；hints＝C.hints。
  //   l1＝唬人時 bluff；否則規則句（counter｜countered｜blockedYou｜blockedHim｜aceYou｜aceHim｜mirror）
  //   l2＝hitE｜hitP｜tie；l3＝照實時 honest（關鍵字那句）；唬人且剋不動時放規則句（句尾「，」改「。」）；其他空
  //   D 的三個例句：l1＋l2 逐字＝「冷門剋經典，命中！他 −4」「冷門剋經典，但他高你 2 星以上，剋不動。比星數，你 −3」「他唬你！『紀念版』是經典，他出的是硬蕊。你 −4」
  function ruleText(c, T) {
    const ace = c.ace ? T('aceWord') : '';
    const a = ace + ZH[c.pAttr], a0 = ZH[c.pAttr], b = ZH[c.eAttr];
    if (c.blocked === 'gap') return T(c.by === 'e' ? 'blockedHim' : 'blockedYou', { a, b });
    if (c.blocked === 'ace') return c.by === 'e' ? T('aceYou', { a: a0, b }) : T('aceHim', { a, b });   // aceYou 句子裡已經有「王牌」，{a} 不再加
    if (c.kind === 'counter') return T('counter', { a, b });
    if (c.kind === 'countered') return T('countered', { a, b });
    return T('mirror', { a: a0, b });                                                                  // 「同樣是經典」：同色不加「王牌」
  }
  function clashText(c, T, hints) {
    T = T || T0;
    const rule = ruleText(c, T);
    let l1 = rule, l2, l3 = '', cls = 'z';
    if ((c.toE | 0) > 0) { l2 = T('hitE', { n: c.toE }); cls = 'g'; }
    else if ((c.toP | 0) > 0) { l2 = T('hitP', { n: c.toP }); cls = 'r'; }
    else l2 = T('tie');
    const h = c.hint && ATTRS.includes(c.hint.attr) ? c.hint : null;
    if (h) {
      const x = hintOf(hints, h), key = x && x.key ? x.key : null, hz = ZH[h.attr], e = ZH[c.eAttr];
      if (c.bluff) {
        l1 = key ? T('bluff', { key, hint: hz, e }) : T('bluffNoKey', { hint: hz, e });
        if (c.blocked) l3 = rule.replace(/[，,]\s*$/, '。');
      } else l3 = key ? T('honest', { key, hint: hz }) : T('honestNoKey', { hint: hz });
    }
    const notes = (c.notes || []).map(n => (typeof n === 'string' ? n : n && n.text) || '').filter(Boolean);
    return { l1, l2, l3, cls, rule, notes, bluff: !!c.bluff };
  }

  // ------------------------------------------------------------------ module state
  let CUR = null;
  const LISTEN = {};
  function emit(evt, ...a) { const set = LISTEN[evt]; if (set) [...set].forEach(cb => { try { cb(...a); } catch (e) { console.error(e); } }); }
  function on(evt, cb) { (LISTEN[evt] = LISTEN[evt] || new Set()).add(cb); return () => { if (LISTEN[evt]) LISTEN[evt].delete(cb); }; }
  function mount(panel, opts) { unmount(); CUR = createDuel(panel, opts || {}); return CUR.api; }
  function unmount() { if (CUR) { const c = CUR; CUR = null; try { c.destroy(); } catch (e) { console.error(e); } } }

  // ================================================================== instance
  function createDuel(panel, opts) {
    const E = Eng();
    if (!E) throw new Error('DipLabDuel: DipLabEngine not loaded');
    const duel = opts.duel, content = opts.content || window.DipLabContent || {}, run = opts.run || null;
    const hooks = opts.hooks || {};
    const tut = hooks.tut || null;
    const eid = duel && duel.e ? duel.e.id : null;
    const enemy = Object.assign({ id: eid, name: duel && duel.e && duel.e.name, title: duel && duel.e && duel.e.title }, (content.enemies && content.enemies[eid]) || {});
    const lines = (content.lines && content.lines[eid]) || {};
    const hints = content.hints || null;
    const T = dtOf(content);
    const settings = () => { try { return (hooks.settings && hooks.settings()) || {}; } catch (_) { return {}; } };
    const view = () => E.view(duel);
    const S = {
      v: view(), phase: 'choose', sel: null, busy: false, destroyed: false, speed: 1,
      anims: new Set(), timers: new Set(), infoOpen: 0, held: 0, table: null, flash: null, triForce: null,
      lp: null, swallow: null, enterDone: !opts.enter, ending: false, auto: false, tagged: false,
      rush: false, playAt: 0, fitRaf: 0, ro: null, lastLine: {}, lastCt: null, debug: { log: [], hands: [] },
    };
    const paused = () => !!(S.infoOpen || S.held);
    const baseSpeed = () => FAST ? 4 : (settings().fastAnim ? 2 : 1);
    S.speed = baseSpeed();
    const rm = () => { const f = Fx(); try { return f && f.reducedMotion ? f.reducedMotion() : rmq(); } catch (_) { return rmq(); } };
    const log = s => { S.debug.log.push(s); if (S.debug.log.length > 400) S.debug.log.shift(); };

    // ---------------- timing (speed- and pause-aware) ----------------
    function wait(ms) {
      return new Promise(res => {
        if (S.destroyed) return res();
        let left = ms, last = performance.now(), h;
        const tick = () => {
          S.timers.delete(h);
          if (S.destroyed) return res();
          const now = performance.now();
          if (!paused()) left -= (now - last) * S.speed;
          last = now;
          if (left <= 0) res(); else { h = setTimeout(tick, 16); S.timers.add(h); }
        };
        h = setTimeout(tick, Math.min(16, ms)); S.timers.add(h);
      });
    }
    function later(fn, ms) { const h = setTimeout(() => { S.timers.delete(h); if (!S.destroyed) fn(); }, ms); S.timers.add(h); return h; }
    function A(el, kf, o) {
      if (!el || !el.animate) return null;
      let a; try { a = el.animate(kf, o); } catch (_) { return null; }
      try { a.playbackRate = S.speed; if (paused()) a.pause(); } catch (_) {}
      S.anims.add(a);
      const done = () => S.anims.delete(a); a.finished.then(done, done);
      return a;
    }
    function setSpeed(s) {
      S.speed = s;
      S.anims.forEach(a => { try { a.playbackRate = s; } catch (_) {} });
      const f = Fx(); if (f && f.setSpeed) try { f.setSpeed(s); } catch (_) {}
      if (hasStage('speed')) stg('speed', s);
    }
    const pauseAnims = () => S.anims.forEach(a => { try { a.pause(); } catch (_) {} });
    const resumeAnims = () => S.anims.forEach(a => { try { if (a.playState === 'paused') a.play(); } catch (_) {} });
    // 外殼開 ⏸／登場卡、教學要停在浮框上時 hold(true)，收掉 hold(false)（計數，可巢狀）：結算停在原地、盤面不收點擊
    function hold(onOff) {
      const was = S.held;
      S.held = Math.max(0, S.held + (onOff ? 1 : -1));
      if (S.held && !was) { pauseAnims(); if (S.lp) { clearTimeout(S.lp.h); S.lp = null; } root.classList.add('held'); if (hasStage('pause')) stg('pause', true); }
      else if (!S.held && was) { root.classList.remove('held'); if (!paused()) resumeAnims(); if (hasStage('pause')) stg('pause', false); }
      return S.held;
    }

    // ---------------- stage（常駐 DipLabStage；duel.js 只呼叫 API） ----------------
    function stg(m, ...a) { const s = hooks.stage; if (!s || typeof s[m] !== 'function') return null; try { return s[m](...a); } catch (e) { console.error(e); return null; } }
    const hasStage = m => !!(hooks.stage && typeof hooks.stage[m] === 'function');
    function say(id, text, ms) { if (text) stg('say', id, text, { ms: ms || 1500, lift: 7 }); }
    function pickLine(keys) {
      for (const key of keys) {
        let arr = lines[key]; if (arr == null) continue;
        if (!Array.isArray(arr)) arr = [arr];
        if (!arr.length) continue;
        let i = Math.floor(Math.random() * arr.length);
        if (arr.length > 1 && i === S.lastLine[key]) i = (i + 1) % arr.length;
        S.lastLine[key] = i;
        return arr[i];
      }
      return null;
    }
    function tags(onOff) {
      if (onOff && !S.tagged) { stg('tag', 'f', enemy.name || '他', 'e', 'L'); stg('tag', 'p', '你', 'p', 'R'); S.tagged = true; }
      else if (!onOff && S.tagged) { stg('untag', 'f'); stg('untag', 'p'); S.tagged = false; }
    }
    // 舞台上手裡拿的：你＝選了哪張就拿哪張（王牌＝'ace'）；他＝選牌階段一直拿著背面朝外的封套（§2.3.3）
    function holdSleeve(side, card, ace) {
      if (!hasStage('hold')) return;
      stg('hold', side, card ? (ace ? 'ace' : { sleeve: card.id }) : null);
    }
    function holdBack() { if (hasStage('hold')) stg('hold', 'e', { back: true }); }

    // ---------------- hooks: tutorial / hints / info ----------------
    function gate(action) {
      if (!tut || typeof tut.gate !== 'function') return true;
      try { return tut.gate(action) !== false; } catch (e) { console.error(e); return true; }
    }
    const hinted = new Set();
    function hint(id, targets) {
      if (!hooks.hint || hinted.has(id)) return;        // 一場只送一次；一輩子只出一次由外殼／教學記
      hinted.add(id);
      try { hooks.hint(id, targets || []); } catch (e) { console.error(e); }
      log('hint:' + id);
    }
    function onEvent(ev) { if (hooks.onEvent) try { hooks.onEvent(ev, duel); } catch (e) { console.error(e); } }
    function setPhase(p) {
      S.phase = p;
      if (root) root.dataset.phase = p;
      if (tut && typeof tut.onPhase === 'function') try { tut.onPhase(p); } catch (e) { console.error(e); }
      emit('phase', p);
    }
    async function openInfo(card, where, attr) {
      if (!card || S.destroyed || S.held) return;
      if (!gate({ kind: 'info', where })) return;
      emit('info', where);
      const fn = typeof hooks.cardInfo === 'function' ? hooks.cardInfo
        : (window.DipLabCardInfo && typeof window.DipLabCardInfo.open === 'function' ? (c, o) => window.DipLabCardInfo.open(c, o) : null);
      log('info:' + where + ':' + card.id);
      if (!fn) return;
      S.infoOpen++; pauseAnims();
      try { await Promise.resolve(fn(card, { attr: attr || null, from: 'duel:' + where })); } catch (e) { console.error(e); }
      S.infoOpen = Math.max(0, S.infoOpen - 1);
      if (!paused()) resumeAnims();
      if (S.destroyed) return;
      if (tut && typeof tut.gate === 'function') try { tut.gate({ kind: 'close' }); } catch (_) {}
      emit('infoClosed', where);
    }

    // ---------------- DOM skeleton（§2.5.1 的樹） ----------------
    const root = document.createElement('div');
    root.className = 'dl';
    root.dataset.phase = 'choose';
    root.setAttribute('role', 'application');
    root.setAttribute('aria-label', '品味對決');
    root.innerHTML = `
      <section class="dl-e" data-tut="e-hud">
        <div class="nmrow"><b class="nm" data-tut="e-name"></b><span class="sub"></span><span class="hon" data-tut="e-honesty" hidden></span><span class="sp"></span>
          <span class="hpn" data-tut="e-hp"><span>${esc(T('hp'))}</span><b class="num key"></b></span></div>
        <div class="hp"><i class="lost"></i><i class="fill"></i></div>
        <div class="hint" data-tut="e-hint"><span class="lb">${esc(T('hintLabel'))}</span><span class="tx"></span></div>
        <div class="rec" data-tut="e-rec">
          <div class="sleeve" data-tut="e-sleeve">${sleeveHTML()}<span class="sl">${esc(T('sleeve'))}</span></div>
          <span class="sp"></span>
          <div class="pile" data-tut="e-pile"><span class="bars"></span><small></small></div>
        </div>
      </section>
      <section class="dl-t" data-tut="table">
        <div class="slot e" data-tut="slot-e"></div>
        <div class="slot p" data-tut="slot-p"></div>
        <div class="tri" data-tut="tri"></div>
        <div class="rounds num" data-tut="rounds"></div>
        <div class="callout" data-tut="result" aria-live="polite"><div class="l1"></div><div class="l2"></div><div class="l3"></div></div>
        <div class="lastline" data-tut="lastline"></div>
      </section>
      <section class="dl-p" data-tut="p-hud">
        <div class="nmrow"><b>你</b><span class="relics" data-tut="relics"></span><span class="sp"></span>
          <span class="hpn" data-tut="p-hp"><span>${esc(T('hp'))}</span><b class="num key"></b></span></div>
        <div class="hp"><i class="lost"></i><i class="fill"></i></div>
        <div class="hand" data-tut="hand"></div>
        <div class="act" data-tut="act"><div class="say"></div><button type="button" class="throw" data-tut="throw" disabled>${esc(T('throwBtn'))}</button></div>
      </section>
      <div class="dl-pop" role="status" hidden></div>
      <div class="kost" aria-hidden="true"></div>
      <div class="dl-fx" aria-hidden="true"></div>`;
    panel.innerHTML = '';
    panel.appendChild(root);
    const $ = s => root.querySelector(s);
    const els = {
      e: $('.dl-e'), enm: $('.dl-e .nm'), esub: $('.dl-e .sub'), hon: $('.dl-e .hon'), ehpn: $('.dl-e .hpn .num'), ehp: $('.dl-e .hp'),
      hint: $('.hint'), htx: $('.hint .tx'), rec: $('.rec'), sleeve: $('.rec .sleeve'), bars: $('.pile .bars'), pileTx: $('.pile small'),
      table: $('.dl-t'), se: $('.slot.e'), sp: $('.slot.p'), tri: $('.tri'), rounds: $('.rounds'), call: $('.callout'), last: $('.lastline'),
      p: $('.dl-p'), relics: $('.relics'), phpn: $('.dl-p .hpn .num'), php: $('.dl-p .hp'),
      hand: $('.hand'), act: $('.act'), say: $('.act .say'), thr: $('.throw'), pop: $('.dl-pop'), kost: $('.kost'), fx: $('.dl-fx'),
    };
    // 封面載入失敗：本機 → 遠端 → 文字
    root.addEventListener('error', ev => {
      const t = ev.target; if (!t || t.tagName !== 'IMG') return;
      if (t.dataset.fb && t.src !== t.dataset.fb) { const fb = t.dataset.fb; t.removeAttribute('data-fb'); t.src = fb; return; }
      const d = document.createElement('span'); d.className = 'cv noimg'; const s = document.createElement('span'); s.textContent = (t.alt || '').replace(/^.*《|》$/g, ''); d.appendChild(s);
      t.replaceWith(d);
    }, true);

    // ---------------- helpers ----------------
    const pct = (x, m) => Math.max(0, Math.min(100, (x / (m || 1)) * 100));
    function setHp(bar, numEl, hp, max, animate) {
      const fill = bar.querySelector('.fill'), lost = bar.querySelector('.lost');
      const w = pct(Math.max(0, hp), max);
      numEl.textContent = `${Math.max(0, hp)}/${max}`;
      if (!animate) { fill.style.transition = 'none'; lost.style.transition = 'none'; fill.style.width = w + '%'; lost.style.width = w + '%'; void fill.offsetWidth; fill.style.transition = ''; lost.style.transition = ''; return; }
      const dur = Math.round(500 / S.speed);
      fill.style.transitionDuration = dur + 'ms';
      const old = parseFloat(fill.style.width) || 0;
      if (w < old) { lost.style.transition = 'none'; lost.style.width = old + '%'; void lost.offsetWidth; lost.style.transition = ''; fill.style.width = w + '%'; later(() => { lost.style.transitionDuration = dur + 'ms'; lost.style.width = w + '%'; }, dur + 250); }
      else { fill.style.width = w + '%'; lost.style.width = w + '%'; }
    }
    // 數字旁的小飄字（不吃點擊）：聲望數字左邊往左飄
    function floatAt(el, text, cls) {
      if (!el || !text || S.destroyed) return;
      const a0 = (el.closest && el.closest('.hpn')) || el, r = a0.getBoundingClientRect(), rr = root.getBoundingClientRect();
      if (!r.width) return;
      const d = document.createElement('span'); d.className = 'fl ' + (cls || ''); d.textContent = text;
      els.fx.appendChild(d);
      const fh = d.offsetHeight || 16;
      d.style.left = Math.round(r.left - rr.left - 4) + 'px'; d.style.top = Math.round(r.top - rr.top + (r.height - fh) / 2) + 'px';
      const kf = rm() ? [{ opacity: 0, transform: 'translate(-100%,0)' }, { opacity: 1, transform: 'translate(-100%,0)', offset: .2 }, { opacity: 1, transform: 'translate(-100%,0)', offset: .8 }, { opacity: 0, transform: 'translate(-100%,0)' }]
        : [{ transform: 'translate(-100%,0)', opacity: 0 }, { transform: 'translate(calc(-100% - 6px),0)', opacity: 1, offset: .2 }, { transform: 'translate(calc(-100% - 10px),0)', opacity: 1, offset: .75 }, { transform: 'translate(calc(-100% - 14px),0)', opacity: 0 }];
      d.style.transform = 'translate(-100%,0)';
      const a = A(d, kf, { duration: 1300, easing: 'ease-out', fill: 'forwards' });
      const rmv = () => d.remove(); if (a) a.finished.then(rmv, rmv); else later(rmv, 1300);
    }
    // 手牌的一格：i＝0..2 或 'ace'。王牌用過了仍留在王牌格（變淡、寫「用過」）
    const cardOf = (v, i) => i === 'ace' ? (v.aceCard || v.ace || null) : (v.hand || [])[i] || null;
    const aceLive = v => !!(v.ace && !v.aceUsed);
    const aceAx = v => v.aceAxis || aceAxisOf(v.aceCard || v.ace);
    const selKey = s => s ? s.i + ':' + s.attr : '';
    function actOf(sel) { return sel.i === 'ace' ? { ace: true, attr: aceAx(S.v) } : { i: sel.i, attr: sel.attr }; }
    function legal(sel) {
      if (!sel) return false;
      try { return !!E.isLegal(duel, actOf(sel)); } catch (_) { return false; }
    }
    function idxOfCard(v, id) {
      const k = (v.hand || []).findIndex(c => c && c.id === id);
      if (k >= 0) return k;
      const ac = v.aceCard || v.ace;
      return ac && ac.id === id ? 'ace' : null;
    }

    // ---------------- render: 他的一塊 ----------------
    function hintText(v) { const x = hintOf(hints, v.hint); return x ? x.text : ''; }
    function renderE(v, opt) {
      opt = opt || {};
      els.enm.textContent = enemy.name || v.eName || '';
      els.esub.textContent = enemy.title || v.eTitle || '';
      els.hon.textContent = (v.honesty && v.honesty.zh) || '';   // D §5：不顯示（hidden），留給教學／測試讀
      if (!opt.keepHp) setHp(els.ehp, els.ehpn, v.eHp, v.eMax, false);
      renderHint(v);
      renderRec(v);
    }
    function renderHint(v) {
      const tx = v.over ? '' : hintText(v);
      els.htx.textContent = tx;
      els.hint.classList.toggle('empty', !tx);
    }
    // 他還有 N 張＝他手牌＋牌堆；丟出的那一刻（t=0）他已經把一張放上牌桌 → thrown＝1 先少一張（不等下一手的 view）
    function renderRec(v, thrown) {
      const n = Math.max(0, (v.pile | 0) + (v.eHandN | 0) - (thrown | 0)), max = Math.max(n + (thrown | 0), v.pileMax | 0);
      els.bars.innerHTML = Array.from({ length: max }, (_, k) => `<i${k < n ? '' : ' class="x"'}></i>`).join('');
      els.pileTx.textContent = T('pileLeft', { n });
      els.sleeve.classList.toggle('off', !!v.over || S.busy);
    }

    // ---------------- render: 牌桌 ----------------
    function renderSlot(side) {
      const el = side === 'e' ? els.se : els.sp, Tb = S.table, d = Tb && Tb[side];
      el.className = 'slot ' + side + (Tb && Tb.dim ? ' dim' : '') + (d ? '' : ' empty') + (d && d.hidden ? ' back' : '');
      el.removeAttribute('data-card'); el.removeAttribute('role'); el.removeAttribute('tabindex'); el.removeAttribute('aria-label');
      if (!d) { el.innerHTML = `<span class="ph">${esc(T(side === 'e' ? 'slotE' : 'slotP'))}</span>`; return; }
      const who = esc(T(side === 'e' ? 'he' : 'you'));
      if (d.hidden) { el.innerHTML = `<span class="cvw">${sleeveHTML('cv')}</span><div class="who">${who}<span class="z">${esc(T('sleeve'))}</span></div>`; return; }
      el.innerHTML = `<span class="cvw">${img(d.card)}</span><div class="who">${who}<span class="${d.attr}">${d.ace ? esc(T('aceWord')) : ''}${ZH[d.attr]} <span class="num">${d.star}</span></span></div>`;
      if (d.card) { el.dataset.card = d.card.id; el.setAttribute('role', 'button'); el.tabIndex = 0; el.setAttribute('aria-label', (side === 'e' ? '他丟的：' : '你丟的：') + title(d.card)); }
    }
    function triSVG() {
      const P = { c: [66, 17], h: [112, 97], o: [20, 97] }, R = 15;
      const col = { c: 'var(--c,#1f5fae)', o: 'var(--o,#6a3fa0)', h: 'var(--h,#c11628)' };
      const STROKE = { k: '#111', g: '#2e7d52', r: '#c11628', f: '#d6d6d6' };
      let ring = null;
      const tone = {};
      EDGES.forEach(([a, b]) => { tone[a + b] = 'k'; });
      if (S.triForce) { EDGES.forEach(([a, b]) => { tone[a + b] = S.triForce.includes(a + b) ? 'g' : 'f'; }); }
      else if (S.flash) {
        const f = S.flash;
        EDGES.forEach(([a, b]) => { tone[a + b] = 'f'; });
        if (f.edge) tone[f.edge] = f.tone; else ring = f.ring;
      } else if (S.sel && !S.busy) {
        const x = S.sel.attr; ring = x;
        EDGES.forEach(([a, b]) => { tone[a + b] = a === x ? 'g' : b === x ? 'r' : 'f'; });
      }
      let s = `<svg viewBox="0 0 132 118" aria-label="冷剋經、經剋硬、硬剋冷" role="img"><defs>`;
      Object.keys(STROKE).forEach(k => { s += `<marker id="dlm${k}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${STROKE[k]}"/></marker>`; });
      s += '</defs>';
      EDGES.forEach(([a, b]) => {
        const p0 = P[a], p1 = P[b], dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
        const x1 = p0[0] + ux * (R + 3), y1 = p0[1] + uy * (R + 3), x2 = p1[0] - ux * (R + 4), y2 = p1[1] - uy * (R + 4);
        const k = tone[a + b], w = k === 'f' ? 1.6 : (k === 'k' ? 2.2 : 3.2);
        const mx = (p0[0] + p1[0]) / 2 - uy * 9, my = (p0[1] + p1[1]) / 2 + ux * 9 + 4;
        s += `<g data-tut="tri-${a}${b}" class="eg ${k}"><line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${STROKE[k]}" stroke-width="${w}" marker-end="url(#dlm${k})"/>`
          + `<text x="${mx.toFixed(1)}" y="${my.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${k === 'f' ? '#c4c4c4' : STROKE[k]}">剋</text></g>`;
      });
      ATTRS.forEach(a => {
        const p = P[a];
        s += `<circle cx="${p[0]}" cy="${p[1]}" r="${R}" fill="${col[a]}"${ring === a ? ' stroke="#111" stroke-width="3"' : ''}/>`;
        s += `<text x="${p[0]}" y="${p[1] + 5.5}" text-anchor="middle" font-size="16" font-weight="900" fill="#fff">${ZH1[a]}</text>`;
      });
      return s + '</svg>';
    }
    function renderTri() { els.tri.innerHTML = triSVG(); }
    function renderRounds(v) { els.rounds.textContent = T('rounds', { n: Math.max(1, v.n | 0), max: v.maxRounds || (E.CFG && E.CFG.maxRounds) || 6 }); }
    function lastLineHTML(ct) {
      return `<span class="lb">${esc(T('lastPrefix'))}</span><b>${esc(ct.l1)}<span class="${ct.cls}">${esc(ct.l2)}</span></b>`
        + (ct.notes.length ? `<span class="nt">${esc(ct.notes.join('・'))}</span>` : '');
    }
    function renderLast() { els.last.innerHTML = S.lastCt ? lastLineHTML(S.lastCt) : ''; }
    function renderTable(v) { renderSlot('e'); renderSlot('p'); renderTri(); renderRounds(v); renderLast(); }

    // ---------------- render: 你的一塊、手牌、星鈕 ----------------
    function relicIconHTML(r) {
      const sz = 16;
      try { if (typeof hooks.relicIcon === 'function') { const h = hooks.relicIcon(r.id, sz); if (h) return h; } } catch (_) {}
      try { const U = window.DipLabUI; if (U && typeof U.relicIcon === 'function') { const h = U.relicIcon(r.id, sz); if (h && !/lb-ri/.test(h)) return h; } } catch (_) {}
      return `<span class="rl-t">${esc(String(r.name || '?').slice(0, 1))}</span>`;
    }
    function renderP(v, opt) {
      opt = opt || {};
      if (!opt.keepHp) setHp(els.php, els.phpn, v.pHp, v.pMax, false);
      els.relics.innerHTML = (v.relics || []).slice(0, 3).map(r => `<button type="button" class="rl" data-tut="relic-${esc(r.id)}" data-relic="${esc(r.id)}" aria-label="發燒配件：${esc(r.name || '')}">${relicIconHTML(r)}</button>`).join('');
    }
    function tileHTML(v, i) {
      const isAce = i === 'ace', c = cardOf(v, i); if (!c) return '';
      const used = isAce && !aceLive(v), sel = S.sel && S.sel.i === i;
      const lock = S.busy || used;
      const chip = (a, wide) => {
        const on = sel && S.sel.attr === a;
        return `<button type="button" class="chip ${a}${wide ? ' wide' : ''}${on ? ' sel' : ''}" data-tut="${isAce ? 'chip-ace' : `chip-${i}-${a}`}" data-i="${i}" data-a="${a}"${lock ? ' disabled' : ''} aria-pressed="${on}" aria-label="${esc((isAce ? '王牌 ' : '') + ZH[a] + ' ' + starOf(c, a) + ' 星')}">`
          + `<i>${ZH1[a]}</i><b class="key">${starOf(c, a)}</b></button>`;
      };
      const chips = isAce ? chip(aceAx(v), true) : ATTRS.map(a => chip(a)).join('');
      return `<div class="tile${isAce ? ' ace' : ''}${sel ? ' sel' : ''}${used ? ' used' : ''}" data-tut="${isAce ? 'hand-ace' : 'hand-' + i}" data-card="${esc(c.id)}" data-i="${i}">`
        + `<button type="button" class="cvw" data-tut="${isAce ? 'card-ace' : 'card-' + i}" data-act="pick"${used ? ' aria-disabled="true"' : ''} aria-label="${esc((isAce ? '王牌：' : '選這張：') + title(c))}（按住看唱片資訊）">${img(c)}${isAce ? `<span class="acetag">${esc(T(used ? 'aceUsed' : 'aceSlot'))}</span>` : ''}</button>`
        + `<div class="chips">${chips}</div></div>`;
    }
    function renderHand(v, opt) {
      opt = opt || {};
      const ids = [];
      if (v.aceCard || v.ace) ids.push('ace');
      (v.hand || []).forEach((c, i) => { if (c) ids.push(i); });
      els.hand.innerHTML = ids.map(i => tileHTML(v, i)).join('');
      if (opt.slideNew != null) {
        const t = els.hand.querySelector(`.tile[data-i="${opt.slideNew}"]`);
        if (t && !rm()) A(t, [{ transform: 'translateY(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 260, easing: 'cubic-bezier(.2,.7,.3,1)' });
      }
    }
    // 只換選取狀態（不重畫封面，避免圖片閃）
    function markSel() {
      els.hand.querySelectorAll('.tile').forEach(t => {
        const i = t.dataset.i === 'ace' ? 'ace' : +t.dataset.i, on = !!(S.sel && S.sel.i === i);
        t.classList.toggle('sel', on);
        t.querySelectorAll('.chip').forEach(ch => { const s = on && ch.dataset.a === S.sel.attr; ch.classList.toggle('sel', s); ch.setAttribute('aria-pressed', String(s)); });
      });
    }
    function renderAct() {
      const v = S.v;
      els.act.classList.remove('wait', 'ready');
      if (S.ending || v.over) { els.act.classList.add('wait'); els.say.innerHTML = ''; els.thr.disabled = true; return; }
      if (S.busy) { els.act.classList.add('wait'); els.say.innerHTML = `<span class="w">${esc(T('waiting'))}</span>`; els.thr.disabled = true; return; }
      if (!S.sel) { els.say.innerHTML = `<span class="w">${esc(T('pickHint'))}</span>`; els.thr.disabled = true; return; }
      const c = cardOf(v, S.sel.i), a = S.sel.attr;
      els.act.classList.add('ready');
      els.say.innerHTML = `<small>${esc(T('picked'))}${esc(title(c))}</small><b class="${a}">${S.sel.i === 'ace' ? esc(T('aceWord')) + ' ' : ''}${ZH[a]} <span class="num">${starOf(c, a)}</span></b><span class="hn">${esc(T('again'))}</span>`;
      els.thr.disabled = false;
    }
    function renderAll(opt) {
      const v = S.v;
      renderE(v, opt); renderTable(v); renderP(v, opt); renderHand(v); renderAct();
      scheduleFit();
    }

    // ---------------- 尺寸：沒有捲動；依盤面可用高度換一級 ----------------
    function fit() {
      S.fitRaf = 0;
      if (S.destroyed) return;
      const H = root.clientHeight;
      root.classList.remove('roomy', 'compact', 'short', 'tighter');
      if (H > 0) {
        if (H >= 600) root.classList.add('roomy');
        else if (H < 450) root.classList.add('short');
        else if (H < 500) root.classList.add('compact');
      }
      if (root.scrollHeight > root.clientHeight + 1) root.classList.add('tighter');
    }
    function scheduleFit() { if (!S.fitRaf) { fit(); S.fitRaf = requestAnimationFrame(() => { S.fitRaf = 0; fit(); }); } }
    try { S.ro = new ResizeObserver(() => scheduleFit()); S.ro.observe(root); } catch (_) {}
    try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => scheduleFit()); } catch (_) {}

    // ---------------- input（D §5：點專輯＝選這張、自動選最高屬性；點別的星＝換屬性；「丟！」＝出手） ----------------
    function bumpEl(el) { if (el && !rm()) A(el, [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 300 }); }
    const isOver = () => !!(S.v && S.v.over) || S.ending;
    const canAct = () => !S.busy && S.enterDone && !isOver() && !S.held;
    function applySel(sel, c) {
      const changedCard = !S.sel || S.sel.i !== sel.i;
      S.sel = sel;
      sfx('select');
      markSel(); renderTri(); renderAct();
      if (changedCard) holdSleeve('p', c, sel.i === 'ace');
      emit('selected', { i: sel.i, attr: sel.attr });
      return true;
    }
    function clearSel() {
      if (!S.sel) return true;
      S.sel = null; markSel(); renderTri(); renderAct(); holdSleeve('p', null); emit('selected', null); return true;
    }
    // 點封面：選這張、屬性＝topAttr（王牌＝它那軸）；已選同一張就不變
    function pickCard(i) {
      if (!canAct()) return false;
      const v = S.v, c = cardOf(v, i); if (!c) return false;
      if (i === 'ace' && !aceLive(v)) return false;
      if (S.sel && S.sel.i === i) return true;
      const attr = i === 'ace' ? aceAx(v) : topAttrOf(c), sel = { i, attr };
      if (!legal(sel)) return false;
      if (!gate({ kind: 'card', i, attr, id: c.id })) return false;
      return applySel(sel, c);
    }
    // 點星鈕：選這張的這個屬性；再點已選的那顆不做事（v3 的「再點一次＝丟」拿掉，§2.5.1）
    function selectChip(i, attr) {
      if (!canAct()) return false;
      if (i === null) return clearSel();
      const v = S.v, c = cardOf(v, i); if (!c) return false;
      if (i === 'ace') { if (!aceLive(v)) return false; attr = aceAx(v); }
      if (!ATTRS.includes(attr)) return false;
      if (S.sel && S.sel.i === i && S.sel.attr === attr) return true;
      const sel = { i, attr };
      if (!legal(sel)) return false;
      if (!gate({ kind: 'chip', i, attr, id: c.id })) return false;
      return applySel(sel, c);
    }
    function throwSel(btn) {
      if (!canAct()) return false;
      if (!S.sel) { bumpEl(btn || els.thr); return false; }
      const c = cardOf(S.v, S.sel.i);
      if (!legal(S.sel)) { bumpEl(btn || els.thr); return false; }
      if (!gate({ kind: 'throw', i: S.sel.i, attr: S.sel.attr, id: c && c.id })) { bumpEl(btn || els.thr); return false; }
      if (btn && !rm()) A(btn, [{ transform: 'scale(1)' }, { transform: 'scale(.95)' }, { transform: 'scale(1)' }], { duration: 90 });
      play(actOf(S.sel), S.sel);
      return true;
    }
    function chipTap(btn) {
      const i = btn.dataset.i === 'ace' ? 'ace' : +btn.dataset.i, a = btn.dataset.a;
      if (!canAct()) return;
      if (S.sel && S.sel.i === i && S.sel.attr === a) return;          // 已選的那顆：不做事
      if (!selectChip(i, a)) bumpEl(btn);
    }
    function cardTap(btn) {
      const tl = btn.closest('.tile'); if (!tl) return;
      const i = tl.dataset.i === 'ace' ? 'ace' : +tl.dataset.i;
      if (!canAct()) return;
      if (!pickCard(i)) bumpEl(btn);
    }
    function relicTap(btn) {
      const id = btn.dataset.relic, r = (S.v.relics || []).find(x => x.id === id); if (!r) return;
      emit('relic', id);
      els.pop.innerHTML = `<b>${esc(r.name || '')}</b>${esc(r.line || r.desc || '')}`;
      els.pop.hidden = false;
      const br = btn.getBoundingClientRect(), rr = root.getBoundingClientRect();
      els.pop.style.left = Math.max(8, Math.min(rr.width - 230, br.left - rr.left - 8)) + 'px';
      els.pop.style.top = Math.max(4, br.top - rr.top - els.pop.offsetHeight - 6) + 'px';
      clearTimeout(S.popT); S.popT = later(() => { els.pop.hidden = true; }, 2600);
    }
    // 唱片資訊：手牌封面長按；牌桌上兩張（揭曉後）點一下；他蓋著的封套不給看
    function infoOfSlot(x) {
      const side = x.classList.contains('e') ? 'e' : 'p', d = S.table && S.table[side];
      if (d && d.card && !d.hidden) { openInfo(d.card, 'slot-' + side, d.attr); return true; }
      return false;
    }
    function infoOfTile(x) {
      const tl = x.closest('.tile'); if (!tl) return false;
      const i = tl.dataset.i === 'ace' ? 'ace' : +tl.dataset.i, c = cardOf(S.v, i);
      if (c) openInfo(c, i === 'ace' ? 'hand-ace' : 'hand');
      return !!c;
    }
    function onClick(ev) {
      const t = ev.target;
      const sw = S.swallow; S.swallow = null;
      if (sw && performance.now() < sw.until && sw.el.contains(t)) { ev.preventDefault(); return; }   // 長按之後的那一下 click
      if (S.held) { ev.preventDefault(); return; }
      if (!els.pop.hidden && !t.closest('.rl')) els.pop.hidden = true;
      let x;
      if ((x = t.closest('.slot[data-card]'))) { infoOfSlot(x); return; }
      if ((x = t.closest('.rl'))) { relicTap(x); return; }
      if (S.busy) {   // 結算中點畫面＝這手 4 倍速
        if (!S.rush && performance.now() - S.playAt > RUSH_MS) { S.rush = true; setSpeed(Math.max(S.speed, 4)); }
        return;
      }
      if ((x = t.closest('.cvw[data-act="pick"]'))) { cardTap(x); return; }
      if ((x = t.closest('.chip'))) { chipTap(x); return; }
      if ((x = t.closest('.throw'))) { throwSel(x); return; }
    }
    const LP_SEL = '.cvw[data-act="pick"], .slot[data-card]';
    function onDown(ev) {
      const t = ev.target.closest(LP_SEL);
      if (!t || S.held || (ev.button != null && ev.button > 0)) { S.lp = null; return; }
      const lp = S.lp = { el: t, x: ev.clientX, y: ev.clientY, h: 0 };
      lp.h = later(() => {
        if (S.lp !== lp) return;
        S.lp = null;
        const ok = t.matches('.slot') ? infoOfSlot(t) : infoOfTile(t);
        if (ok) S.swallow = { el: t, until: performance.now() + 900 };   // 放開手指的那一下 click 不再選牌／再開一次
      }, LONG_MS);
    }
    function onMove(ev) { const lp = S.lp; if (lp && (Math.abs(ev.clientX - lp.x) > 10 || Math.abs(ev.clientY - lp.y) > 10)) { clearTimeout(lp.h); S.lp = null; } }
    function onUp() { const lp = S.lp; if (lp) { clearTimeout(lp.h); S.lp = null; } }
    root.addEventListener('click', onClick);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerup', onUp);
    root.addEventListener('pointercancel', onUp);
    root.addEventListener('contextmenu', ev => { if (ev.target.closest('.tile,.slot,.chip,.sleeve')) ev.preventDefault(); });
    root.addEventListener('keydown', ev => {
      if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.classList && ev.target.classList.contains('slot')) { ev.preventDefault(); ev.target.click(); }
    });

    // ---------------- 一手（約 2 s；SPEC-v4 §2.5.1） ----------------
    function rectOf(el) { if (!el) return null; const r = el.getBoundingClientRect(); return r.width ? r : null; }
    function fly(el, from, ms) {
      if (!el) return null;
      if (!from || rm()) return A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 150 });
      const to = el.getBoundingClientRect(); if (!to.width) return null;
      const dx = from.left - to.left, dy = from.top - to.top, s = from.width / to.width;
      el.style.transformOrigin = '0 0';
      const a = A(el, [{ transform: `translate(${dx}px,${dy}px) scale(${s})` }, { transform: 'translate(0,0) scale(1)' }], { duration: ms, easing: 'cubic-bezier(.2,.7,.3,1)' });
      if (a) a.finished.then(() => { el.style.transformOrigin = '50% 50%'; }, () => {});
      return a;
    }
    // 浮框的句子只在標點後面換行（「冷門」「白版」不會被拆成兩行）：每段（到，。！？為止）包成不拆的一塊（不用 lookbehind：iOS 16.3 以前不認）
    const segHTML = t => String(t || '').replace(/([，。！？；：])/g, '$1\n').split('\n').filter(Boolean).map(x => `<span class="sg">${esc(x)}</span>`).join('');
    function fadeIn(el, ms) { if (el) A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: ms || 200, easing: 'ease-out' }); }
    function showCallout(ct) {
      const c = els.call;
      c.querySelector('.l1').className = 'l1' + (ct.bluff ? ' bl' : '');
      c.querySelector('.l1').innerHTML = segHTML(ct.l1);
      c.querySelector('.l2').className = 'l2 ' + ct.cls;
      c.querySelector('.l2').innerHTML = `<span class="v key">${esc(ct.l2)}</span>${ct.notes.length ? `<span class="nt">${esc(ct.notes.join('・'))}</span>` : ''}`;
      c.querySelector('.l3').innerHTML = segHTML(ct.l3);
      c.querySelector('.l3').hidden = !ct.l3;
      c.classList.add('on');
      els.table.classList.add('res');
      if (rm()) A(c, [{ opacity: 0 }, { opacity: 1 }], { duration: 150, fill: 'both' });
      else A(c, [{ transform: 'translateX(-50%) scale(.3)', opacity: 0 }, { transform: 'translateX(-50%) scale(1.06)', opacity: 1, offset: .6 }, { transform: 'translateX(-50%) scale(1)', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.18,.9,.32,1.25)', fill: 'both' });
    }
    function hideCallout() {
      const c = els.call; if (!c.classList.contains('on')) return;
      const a = A(c, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
      const done = () => { c.classList.remove('on'); els.table.classList.remove('res'); S.anims.forEach(x => { try { if (x.effect && x.effect.target === c) x.cancel(); } catch (_) {} }); };
      if (a) a.finished.then(done, done); else done();
    }
    function bigStamp(text, cls, sub) {
      const k = els.kost;
      k.className = 'kost on ' + (cls || '');
      k.innerHTML = `<b>${esc(text)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}`;
      if (rm()) A(k, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
      else A(k, [{ transform: 'translate(-50%,-50%) rotate(-4deg) scale(1.8)', opacity: 0 }, { transform: 'translate(-50%,-50%) rotate(-4deg) scale(.96)', opacity: 1, offset: .5 }, { transform: 'translate(-50%,-50%) rotate(-4deg) scale(1)', opacity: 1 }], { duration: 420, easing: 'ease-out', fill: 'forwards' });
    }
    // 音效：counter→readHit、countered／mirrorLose→hurt、其他→mirror（§2.5.1）
    const hitSfx = c => c.kind === 'counter' ? 'readHit' : (c.kind === 'countered' || c.kind === 'mirrorLose') ? 'hurt' : 'mirror';
    function flashOf(c) {
      if (c.kind === 'counter') return { edge: c.pAttr + c.eAttr, tone: 'g' };
      if (c.kind === 'countered') return { edge: c.eAttr + c.pAttr, tone: 'r' };
      if (c.blocked && c.by) return c.by === 'p' ? { edge: c.pAttr + c.eAttr, tone: 'f' } : { edge: c.eAttr + c.pAttr, tone: 'f' };
      return { ring: c.pAttr };
    }
    function stageClash(cl) {
      if (!hasStage('clash')) return null;
      if (hasStage('clearClash')) stg('clearClash');
      return stg('clash', {
        kind: cl.kind, blocked: cl.blocked || null, by: cl.by === undefined ? null : cl.by, toE: cl.toE | 0, toP: cl.toP | 0,
        p: { attr: cl.pAttr, star: cl.pStar, card: cl.pCard && cl.pCard.id, ace: !!cl.ace },
        e: { attr: cl.eAttr, star: cl.eStar, card: cl.eCard && cl.eCard.id, ace: !!cl.eAce },
        nameE: enemy.name || '', speed: S.speed, reduced: rm(),
      });
    }
    function stageFallbackHit(cl) {   // 沒有舞台時：受擊＋頭上飄字
      if (cl.toE > 0) { stg('pose', 'f', 'hurt', 200); stg('float', 'f', '−' + cl.toE); }
      if (cl.toP > 0) { stg('pose', 'p', 'hurt', 200); stg('float', 'p', '−' + cl.toP, 'r'); }
    }
    function oneTimeTips(cl) {
      if (cl.bluff) hint('tip_bluff', ['result']);
      if (cl.blocked === 'gap') hint('tip_block', ['result']);
      if (cl.blocked === 'ace') hint('tip_ace', ['result']);
      if (cl.pAttr === cl.eAttr) hint('tip_mirror', ['result']);
    }
    async function play(act, sel) {
      if (!canAct() || !legal(sel)) return false;
      S.busy = true; S.rush = false; S.playAt = performance.now();
      const v0 = S.v;
      const tileEl = els.hand.querySelector(`.tile[data-i="${sel.i}"]`);
      const srcP = rectOf(tileEl && tileEl.querySelector('.cv'));
      const srcE = rectOf(els.sleeve.querySelector('.sleeve-bk'));
      let evs;
      const ro = {};
      try { if (typeof hooks.resolveOpts === 'function') Object.assign(ro, hooks.resolveOpts(act) || {}); } catch (e) { console.error(e); }
      try { if (tut && typeof tut.resolveOpts === 'function') Object.assign(ro, tut.resolveOpts(act) || {}); } catch (e) { console.error(e); }
      try { evs = E.resolveTurn(duel, act, ro) || []; } catch (e) { console.error(e); S.busy = false; renderAll(); return false; }
      if (opts.onSave) try { opts.onSave(duel); } catch (e) { console.error(e); }
      const v1 = view();
      const cl = evs.find(e => e.t === 'clash');
      const over = evs.find(e => e.t === 'over'), hs = evs.find(e => e.t === 'hand'), dr = evs.find(e => e.t === 'draw');
      if (!cl) { console.error('DipLabDuel: no clash event', evs); S.busy = false; S.v = v1; renderAll(); return false; }
      const t0 = performance.now();
      const ct = clashText(cl, T, hints);
      const rec = { n: v0.n, act, sel, evs, ct };
      S.debug.hands.push(rec); if (S.debug.hands.length > 300) S.debug.hands.shift();
      S.sel = null;
      setPhase('resolve');
      root.classList.add('busy');
      emit('selected', null);
      // ---- t=0：你的牌飛上牌桌；他那格「蓋著」；舞台一台唱盤開演
      S.lastCt = null; S.flash = null;
      S.table = { e: { card: cl.eCard, attr: cl.eAttr, star: cl.eStar, ace: !!cl.eAce, hidden: true }, p: { card: cl.pCard, attr: cl.pAttr, star: cl.pStar, ace: !!cl.ace }, dim: false };
      renderTable(v0);
      if (tileEl) tileEl.classList.add('gone');
      els.hand.querySelectorAll('.chip').forEach(b => { b.disabled = true; });
      renderRec(v0, 1);
      els.sleeve.classList.add('off');
      fly(els.sp.querySelector('.cv'), srcP, 260); fadeIn(els.sp.querySelector('.who'), 260);
      fly(els.se.querySelector('.cv'), srcE, 260);
      renderAct();
      let stagePr = stageClash(cl);
      if (!stagePr && !hasStage('clash')) { stg('pose', 'p', 'atk', 200); later(() => stg('pose', 'f', 'atk', 200), 260 / S.speed); }
      onEvent(cl);
      await wait(T_FLIP);
      if (S.destroyed) return true;
      // ---- t=280：他那格翻面（屬性＋星）
      S.table.e.hidden = false; renderSlot('e');
      const ecv = els.se.querySelector('.cvw');
      if (ecv && !rm()) A(ecv, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 120, easing: 'ease-out' });
      fadeIn(els.se.querySelector('.who'), 160);
      await wait(T_HIT - T_FLIP);
      if (S.destroyed) return true;
      // ---- t=560：浮框三行、聲望條、音效、一次性小提示
      S.flash = flashOf(cl); renderTri();
      showCallout(ct);
      sfx(hitSfx(cl));
      if (!hasStage('clash')) stageFallbackHit(cl);
      setHp(els.ehp, els.ehpn, v1.eHp, v1.eMax, true);
      setHp(els.php, els.phpn, v1.pHp, v1.pMax, true);
      if (cl.toE > 0) floatAt(els.ehpn, '−' + cl.toE, 'g');
      if (cl.toP > 0) floatAt(els.phpn, '−' + cl.toP, 'r');
      if (ct.notes.length) (cl.notes || []).forEach(n => { const b = n && n.relic && els.relics.querySelector(`[data-relic="${cssEsc(n.relic)}"]`); if (b && !rm()) A(b, [{ transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(184,134,11,0)' }, { transform: 'scale(1.25)', boxShadow: '0 0 0 3px rgba(184,134,11,.6)', offset: .4 }, { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(184,134,11,0)' }], { duration: 700 }); });
      oneTimeTips(cl);
      rec.ui = snapUI();
      if (tut && typeof tut.onResolved === 'function') try { tut.onResolved(evs); } catch (e) { console.error(e); }
      emit('resolved', evs);
      await wait(T_LINE - T_HIT);
      if (S.destroyed) return true;
      // ---- t=1460：浮框收成「上一手」
      hideCallout();
      S.lastCt = ct; S.flash = null;
      renderLast(); renderTri();
      rec.ui.lastline = els.last.textContent.replace(/\s+/g, ' ').trim();
      emit('settled', evs);
      if (over) { await finish(over, v1, cl); return true; }
      await wait(T_NEXT - T_LINE);
      if (S.destroyed) return true;
      if (stagePr && typeof stagePr.then === 'function' && !S.rush) { /* 舞台演完才換手（最多再等 400 ms） */ await Promise.race([stagePr.catch(() => {}), wait(400)]); }
      // ---- t=2060：下一手（提示句換字、手數加一）
      S.debug.lastMs = performance.now() - t0;
      S.v = v1;
      if (S.table) S.table.dim = true;
      S.speed = baseSpeed(); setSpeed(S.speed); S.rush = false;
      root.classList.remove('busy');
      S.busy = false;
      renderE(v1); renderTable(v1); renderP(v1); renderHand(v1, { slideNew: dr && dr.card ? dr.i : null }); renderAct();
      scheduleFit();
      if (!rm()) { A(els.htx, [{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' }); A(els.rounds, [{ opacity: .2 }, { opacity: 1 }], { duration: 320 }); }
      if (hs) onEvent(hs);
      handStart(v1);
      setPhase('choose');
      return true;
    }
    function handStart(v) {
      holdBack();
      holdSleeve('p', null);
      if ((v.n | 0) >= (v.maxRounds || 6)) hint('tip_rounds', ['rounds']);
      emit('handStart', v);
    }
    // 六手打完／他牌出完的副標（店主還沒定比法：現在比剩下的聲望絕對值＝engine finish()；要改比扣多少或比幾成，改這裡＋C.duelText.roundsScore）
    function roundsVars(v, win) { return { p: Math.max(0, v.pHp), e: Math.max(0, v.eHp), who: win ? '你' : '他' }; }
    // 勝利曲（D §4）：一律播整場贏家最後丟出的那張（＝最後一手贏家那邊的唱片；§2.5.1）
    function winnerSong(win, cl) {
      const card = cl ? (win ? cl.pCard : cl.eCard) : null;
      const f = Fx(); if (!card || !f || !f.music || typeof f.music.play !== 'function') return;
      try { const p = f.music.play(card, { fadeMs: 600 }); if (p && p.catch) p.catch(() => {}); } catch (e) { console.error(e); }
    }
    async function finish(over, v1, cl) {
      S.ending = true;
      const win = !!over.win;
      const result = { over: win ? 'win' : 'lose', win, by: over.by || 'hp', pHp: v1.pHp, eHp: v1.eHp, duel };
      setPhase('over');
      root.classList.add('over');
      renderAct(); renderHint(v1); renderRec(v1);
      if (result.by === 'hp') stg('pose', win ? 'f' : 'p', 'ko', 700);
      sfx('ko');
      say('f', pickLine(win ? ['lose'] : ['win']), 1800);
      later(() => sfx(win ? 'win' : 'lose'), 300);
      winnerSong(win, cl);
      let tx = null;
      if (typeof hooks.endText === 'function') try { tx = hooks.endText(result); } catch (e) { console.error(e); }
      if (!tx) {
        const nm = enemy.name || '';
        if (result.by === 'rounds' || result.by === 'pile') tx = { title: T('roundsOut'), sub: T('roundsScore', roundsVars(v1, win)), cls: win ? 'ink' : 'red' };
        else if (win) tx = { title: T('koWin'), sub: nm ? T('koWinSub', { name: nm }) : '', cls: 'ink' };
        else tx = { title: T('koLose'), sub: run && (run.retryLeft | 0) > 0 ? T('koLoseRetry') : '', cls: 'red' };
      }
      bigStamp(tx.title, tx.cls || (win ? 'ink' : 'red'), tx.sub);
      onEvent(over);
      S.v = v1;
      emit('over', result);
      await wait(1500);
      if (S.destroyed) return;
      if (typeof hooks.beforeEnd === 'function') { try { await hooks.beforeEnd(result); } catch (e) { console.error(e); } }
      if (S.destroyed) return;
      if (!rm()) { const a = A(root, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(24px)' }], { duration: 300, easing: 'ease-in', fill: 'forwards' }); if (a) await a.finished.catch(() => {}); }
      tags(false);
      stg('hold', 'e', null); holdSleeve('p', null);
      S.busy = false;
      if (opts.onEnd) try { opts.onEnd(result); } catch (e) { console.error(e); }
    }

    // ---------------- 起手 ----------------
    function initialTable() {   // 續玩：從 view().last 還原「上一手」兩張（變淡）
      const l = S.v.last;
      if (!l || S.v.over) return;
      S.lastCt = clashText(l, T, hints);
      S.table = { e: { card: l.eCard, attr: l.eAttr, star: l.eStar, ace: !!l.eAce }, p: { card: l.pCard, attr: l.pAttr, star: l.pStar, ace: !!l.ace }, dim: true };
    }
    initialTable();
    renderAll();
    if (opts.enter && !rm()) {
      const a = A(root, [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 600, easing: 'cubic-bezier(.2,.7,.3,1)' });
      const done = () => { if (S.destroyed) return; S.enterDone = true; afterEnter(); };
      if (a) a.finished.then(done, done); else done();
    } else { S.enterDone = true; later(afterEnter, 0); }
    function afterEnter() {
      if (S.destroyed) return;
      tags(true);
      const fresh = (S.v.n | 0) <= 1 && !S.v.last;
      const open1 = lines.line || lines.intro;   // 口頭禪，沒有就用推門那句
      if (fresh && open1 && !tut) say('f', Array.isArray(open1) ? open1[0] : open1, 1800);
      renderAct();
      handStart(S.v);
      setPhase('choose');
    }

    // ---------------- autoplay（e2e 用；走正常的點擊流程與 gate：先點封面，屬性不同再點星鈕，再按丟） ----------------
    async function autoplay(policy) {
      const P = E.policies || {};
      const pol = P[policy] || P.novice || P.random;
      if (typeof pol !== 'function') return false;
      S.auto = true;
      const r = E.makeRng ? E.makeRng(1234) : Math.random, mem = {};
      while (S.auto && !S.destroyed && !isOver()) {
        if (!canAct() || paused()) { await wait(40); continue; }
        let act; try { act = pol(duel, r, mem, content); } catch (e) { console.error(e); break; }
        if (!act) break;
        const sel = act.ace ? { i: 'ace', attr: aceAx(S.v) } : { i: act.i, attr: act.attr };
        if (!pickCard(sel.i) && !(S.sel && S.sel.i === sel.i)) { await wait(80); continue; }
        await wait(80);
        if (selKey(S.sel) !== selKey(sel) && !selectChip(sel.i, sel.attr)) { await wait(80); continue; }
        await wait(80);
        throwSel(null);
        await wait(60);
      }
      return true;
    }

    function destroy() {
      S.destroyed = true;
      tags(false);
      S.timers.forEach(h => clearTimeout(h)); S.timers.clear();
      S.anims.forEach(a => { try { a.cancel(); } catch (_) {} }); S.anims.clear();
      if (S.fitRaf) cancelAnimationFrame(S.fitRaf);
      if (S.ro) try { S.ro.disconnect(); } catch (_) {}
      root.remove();
    }
    // ---------------- 名字 → 元素（教學手指、e2e） ----------------
    const byTut = n => root.querySelector(`[data-tut="${cssEsc(n)}"]`);
    const chipEl = (b, a) => b ? byTut(b.ace || b.i === 'ace' ? 'chip-ace' : `chip-${b.i}-${a}`) : null;
    const coverEl = b => b ? byTut(b.ace || b.i === 'ace' ? 'card-ace' : `card-${b.i}`) : null;
    function bestOf(spec) {
      const [a, withAce] = spec.split(':');
      if (!ATTRS.includes(a)) return null;
      try { return E.bestChip(duel, a, { ace: withAce === 'ace' }); } catch (_) { return null; }
    }
    function elByName(name) {
      if (!name) return null;
      if (name[0] === '@') { const s = hooks.stage; return s && typeof s.anchor === 'function' ? (() => { try { return s.anchor(name.slice(1)); } catch (_) { return null; } })() : null; }
      if (name.startsWith('chip:best:')) { const s = name.slice(10), b = bestOf(s); return chipEl(b, s.split(':')[0]); }
      if (name.startsWith('card:best:')) return coverEl(bestOf(name.slice(10)));
      if (name.startsWith('chip:blocked:')) {
        const a = name.slice(13); let b = null;
        try { b = E.blockedChoice(duel, a); } catch (_) { b = null; }
        return chipEl(b, a);
      }
      if (name.startsWith('chip:id:')) {
        const s = name.slice(8), k = s.lastIndexOf(':'); if (k < 0) return null;
        const id = s.slice(0, k), a = s.slice(k + 1), i = idxOfCard(S.v, id);
        if (i == null) return null;
        if (i === 'ace') return a === aceAx(S.v) ? byTut('chip-ace') : null;
        return byTut(`chip-${i}-${a}`);
      }
      if (name.startsWith('card:id:')) { const i = idxOfCard(S.v, name.slice(8)); return i == null ? null : coverEl({ i }); }
      if (name.startsWith('card:')) return els.hand.querySelector(`.tile[data-card="${cssEsc(name.slice(5))}"]`);
      return byTut(name);
    }
    const txt = el => el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
    function snapUI() {
      const slot = el => ({ who: txt(el.querySelector('.who')), card: el.dataset.card || null, dim: el.classList.contains('dim'), back: el.classList.contains('back') });
      return {
        call: { l1: txt(els.call.querySelector('.l1')), l2: txt(els.call.querySelector('.l2 .v')), l3: txt(els.call.querySelector('.l3')), notes: txt(els.call.querySelector('.l2 .nt')), on: els.call.classList.contains('on') },
        slotE: slot(els.se), slotP: slot(els.sp), lastline: txt(els.last), hint: txt(els.htx), rounds: txt(els.rounds),
        eHp: txt(els.ehpn), pHp: txt(els.phpn), pile: txt(els.pileTx), act: txt(els.say),
      };
    }
    const api = {
      el: root,
      elByName,
      view: () => S.v,
      duel: () => duel,
      busy: () => S.busy,
      phase: () => S.phase,
      // select(i)＝點封面（屬性＝topAttr）；select(i, attr)＝點那顆星；select(null)＝取消
      select: (i, attr) => {
        if (i == null) return selectChip(null);
        if (attr == null) return pickCard(i);
        return selectChip(i, attr);
      },
      play: act => {
        if (!act) return Promise.resolve(false);
        const sel = act.ace ? { i: 'ace', attr: aceAx(S.v) } : { i: act.i, attr: act.attr };
        if (selKey(S.sel) !== selKey(sel) && !selectChip(sel.i, sel.attr)) return Promise.resolve(false);
        const c = cardOf(S.v, sel.i);
        if (!canAct() || !gate({ kind: 'throw', i: sel.i, attr: sel.attr, id: c && c.id })) return Promise.resolve(false);
        return play(actOf(sel), sel);
      },
      hold: onOff => hold(onOff !== false),
      held: () => S.held,
      tri: lit => { S.triForce = lit == null ? null : [].concat(lit); renderTri(); },
      autoplay: p => autoplay(p),
      stopAuto: () => { S.auto = false; },
      rerender: () => { if (S.destroyed || S.busy) return; S.v = view(); S.speed = baseSpeed(); setSpeed(S.speed); renderAll(); },
      debug: () => ({
        phase: S.phase, n: S.v.n, view: S.v, sel: S.sel, busy: S.busy, held: S.held, speed: S.speed, enterDone: S.enterDone, rush: S.rush,
        ui: snapUI(), hands: S.debug.hands.map(h => ({ n: h.n, sel: h.sel, evs: h.evs, ct: h.ct, ui: h.ui })), last: S.debug.hands[S.debug.hands.length - 1] || null,
        log: S.debug.log.slice(), ms: S.debug.lastMs || null, cls: root.className,
      }),
    };
    if (qs.get('debug') === '1') window.__dl = api;
    return { api, destroy };
  }

  const DipLabDuel = {
    mount, unmount, on,
    el: name => (CUR ? CUR.api.elByName(name) : null),
    debug: () => (CUR ? CUR.api.debug() : null),
    api: () => (CUR ? CUR.api : null),
    select: (i, attr) => (CUR ? CUR.api.select(i, attr) : false),
    hold: onOff => (CUR ? CUR.api.hold(onOff) : 0),
    play: act => (CUR ? CUR.api.play(act) : Promise.resolve(false)),
    tri: lit => { if (CUR) CUR.api.tri(lit); },
    autoplay: policy => (CUR ? CUR.api.autoplay(policy) : false),
    stopAuto: () => { if (CUR) CUR.api.stopAuto(); },
    rerender: () => { if (CUR) CUR.api.rerender(); },
    _fmt: { clashText, ruleText, hintOf, text: dtOf },
  };
  window.DipLabDuel = DipLabDuel;
})();
