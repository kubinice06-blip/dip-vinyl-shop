// game-lab/duel.js — 品味對決 v3：店內舞台下方的極簡雙方盤面，三相剋為核心（Agent D；SPEC-v3 §4–§7）
//
// ── v3 contract（tutorial.js／ui.js 照這些名字找）──────────────────────────────────────────────────────────
// data-tut  他的一塊：e-hud e-name e-hp e-habit e-rec e-cover e-stars e-star-c e-star-o e-star-h e-pile
//           牌桌    ：table slot-e slot-p tri tri-oc tri-ch tri-ho result（浮框） lastline
//           你的一塊：p-hud p-hp relics relic-<id> hand hand-ace hand-0 hand-1 hand-2 chip-ace chip-<i>-<attr> throw act
// el(name)：上面的名字；'chip:best:<attr>'＝那一色星最多的星鈕（王牌能丟且同色也算；並列取最左，王牌格算最左）；
//           'card:<id>'＝那張手牌；'@f'|'@p'|'@o'＝舞台錨點。
//
// DipLabDuel.mount(panelEl, { duel, events, run, content, enter, onEnd(result), onSave(duel),
//   hooks: { stage, cardInfo(card,{attr,from}), hint(id,targets), settings()->{fastAnim}, onEvent(ev,duel), tut,
//            beforeEnd(result)->Promise, endText(result)->{title,sub}|null, relicIcon(id,size)->html } })
//   result（onEnd／'over'）＝{ over:'win'|'lose', win, by:'hp'|'pile', pHp, eHp, duel }
// DipLabDuel.unmount() rerender() el(name) on(evt,cb)->off hold(bool)->count select(i|'ace'|null, attr?) play(act)->Promise
//           tri(lit|null)（教學：強制亮哪幾條箭頭，'oc'|'ch'|'ho' 或陣列） autoplay(policy) stopAuto() debug()
// gate（hooks.tut.gate(action) 回 false 就擋）：{kind:'chip',i,attr,id} {kind:'throw',i,attr,id} {kind:'info',where} {kind:'close'}
// 事件：'phase'(choose|resolve|over) 'selected'({i,attr}|null) 'resolved'(evs：560 ms 浮框剛出現時，同步) 'settled'(evs：1460 浮框收成一行)
//       'handStart'(view) 'over'(result) 'info'(where) 'infoClosed'(where) 'relic'(id)
//
// 規則：畫面上每個數字都來自引擎的 view()／preview()／legalActions()／resolveTurn() 事件；UI 不算傷害、不讀 intent。
// 一手：點一顆星（選）→ 再點同一顆或按「丟！」（丟）。結算約 2 s：0 兩張飛上牌桌＋舞台互丟 → 560 浮框、角標、聲望 → 1460 收成「上一手」→ 2060 下一手。
// 結算中點畫面任一處（封面除外）＝這手 4 倍速；?fast=1 → 全程 4 倍速；?debug=1 → window.__dl。
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  const BASE = (function () {
    try { const s = document.currentScript && document.currentScript.src; if (s) return new URL('.', s).href; } catch (_) {}
    try { return new URL('.', location.href).href; } catch (_) { return ''; }
  })();
  const ZH = { c: '經典', o: '冷門', h: '硬蕊' }, ZH1 = { c: '經', o: '冷', h: '硬' }, ATTRS = ['c', 'o', 'h'];
  const ARROW = { o: 'c', c: 'h', h: 'o' };            // 三角的箭頭（畫圖用；輸贏一律看引擎事件）：冷→經、經→硬、硬→冷
  const EDGES = [['o', 'c'], ['c', 'h'], ['h', 'o']];
  const TIER_AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };
  const FIRST_HABITS = ['copy', 'grudge', 'repeat', 'rot'];   // 第一手還沒有「上一手」時退回丟最大的星（SPEC-v3 §2.2）
  const LONG_MS = 450;
  const DBL_MS = 230;      // 同一顆星連點兩下：230 ms 內的第二下吞掉（一次觸控不會被算成兩下）；之後的第二下＝丟
  const RUSH_MS = 350;     // 丟出後 350 ms 內的點擊不算「加速這一手」
  const T_HIT = 560, T_LINE = 1460, T_NEXT = 2060;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const Eng = () => window.DipLabEngine;
  const Fx = () => window.DipLabFx || null;
  const sfx = (n, o) => { const f = Fx(); if (f && f.sfx) try { f.sfx(n, o); } catch (_) {} };
  const qs = new URLSearchParams(location.search || '');
  const FAST = qs.get('fast') === '1';
  const rmq = () => { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; } };

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
  const title = c => c ? `${c.artist || ''}《${c.album || ''}》` : '';
  const aceAxisOf = c => c ? (TIER_AXIS[c.tier] || ATTRS.reduce((b, a) => ((c[a] | 0) > (c[b] | 0) ? a : b), 'c')) : 'c';

  // ------------------------------------------------------------------ 引擎輸出 → 盤面要的形狀（只改名字，不算規則）
  function normView(v, duel) {
    v = Object.assign({}, v || {});
    const e = (duel && duel.e) || {};
    if (v.hand == null) v.hand = [];
    if (!v.ace && v.aceUsed && v.aceCard) v.ace = v.aceCard;          // 用過的王牌仍留在王牌格（變淡、寫「用過」）
    if (v.aceAxis == null && v.ace) v.aceAxis = aceAxisOf(v.ace);
    if (v.pileMax == null) v.pileMax = Math.max(v.pile | 0, (e.deck && e.deck.length) || 7);
    if (!v.habitLabel) v.habitLabel = v.switched ? '急了' : '脾氣';
    if (v.first == null) v.first = !v.last && FIRST_HABITS.includes(v.habit);
    if (!Array.isArray(v.relics)) v.relics = [];
    return v;
  }
  // 名牌那句：「急了：…」「B 面：…」的前綴收進左邊的黑底標籤
  function habitParts(v) {
    let lb = v.habitLabel || DT0.habitLabel, tx = String(v.habitLine || '');
    const m = /^(急了|B ?面|A ?面)[：:]\s*/.exec(tx);
    if (m) { lb = m[1].replace(/^([AB])面$/, '$1 面'); tx = tx.slice(m[0].length); }
    return { lb, tx };
  }
  // 盤面上的字：content.duelText 有就用（lint 掃 content.js），沒有就用這份（同一套字，SPEC-v3 §4、§6）
  const DT0 = {
    firstHand: '第一手：他多半丟最大的星。', pickHint: '點一顆星選牌', picked: '選好了：', again: '再點一次，或按丟', throwBtn: '丟！',
    waiting: '演完就換下一手（點畫面跳過）', next: '下一張，演完就亮出', pileLeft: '還有 {n} 張', lastPrefix: '上一手', shows: '他亮出',
    he: '他・', you: '你・', seeThrough: '看穿！', counter: '{who}{ace}{a}剋{b}', aceWord: '王牌', mirror: '同一色比星　{x} 比 {y}',
    tie: '同一色、一樣多', nothing: '沒事', hitE: '他 −{n}', hitP: '你 −{n}', badgeWin: '勝', badgeLose: '負', badgeTie: '平', eyeMark: '盯',
    koWin: '品味勝出', koWinSub: '你贏了【{name}】。', koLose: '聲望歸零', koLoseRetry: '老闆：……再一場。',
    pileOut: '他的唱片丟完了', pileScore: '你 {p} 比 他 {e}：{who}贏', switchBubble: '……急了。', switchBubbleB: '……換面。', hp: '聲望', aceSlot: '王牌', aceUsed: '用過',
    slotE: '他丟的', slotP: '你丟的', habitLabel: '脾氣',
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
  // 一手的結果字（SPEC-v3 §6）。c＝clash 事件（或 view().last）。主詞一定先寫。
  function clashText(c, T) {
    T = T || T0;
    const p = ZH[c.pAttr], e = ZH[c.eAttr], ace = c.ace ? T('aceWord') : '';
    const W = T('badgeWin'), Lz = T('badgeLose'), D = T('badgeTie');
    let st = null, l1 = '', l2 = '', cls = 'z', badges;
    switch (c.kind) {
      case 'counter': st = c.read ? T('seeThrough') : null; l1 = T('counter', { who: T('you'), ace, a: p, b: e }); badges = { e: Lz, p: W }; break;
      case 'countered': l1 = T('counter', { who: T('he'), ace: '', a: e, b: p }); badges = { e: W, p: Lz }; break;
      case 'mirrorWin': l1 = T('mirror', { x: (ace ? ace + ' ' : '') + c.pStar, y: c.eStar }); badges = { e: Lz, p: W }; break;
      case 'mirrorLose': l1 = T('mirror', { x: c.pStar, y: c.eStar }); badges = { e: W, p: Lz }; break;
      default: l1 = T('tie'); badges = (c.toE | 0) > 0 ? { e: Lz, p: W } : { e: D, p: D };
    }
    if ((c.toE | 0) > 0) { l2 = T('hitE', { n: c.toE }); cls = 'g'; }
    else if ((c.toP | 0) > 0) { l2 = T('hitP', { n: c.toP }); cls = 'r'; }
    else l2 = T('nothing');
    const notes = (c.notes || []).map(n => (typeof n === 'string' ? n : n && n.text) || '').filter(Boolean);
    return { st, l1, l2, cls, badges, notes };
  }
  function answerOf(o, T) {
    T = T || T0;
    if (!o) return { cls: '', text: '' };
    if ((o.toE | 0) > 0) return { cls: 'g', text: T('hitE', { n: o.toE }) };
    if ((o.toP | 0) > 0) return { cls: 'r', text: T('hitP', { n: o.toP }) };
    return { cls: 'z', text: T('nothing') };
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
    const T = dtOf(content);
    const settings = () => { try { return (hooks.settings && hooks.settings()) || {}; } catch (_) { return {}; } };
    const view = () => normView(E.view(duel), duel);
    const S = {
      v: view(), phase: 'choose', sel: null, selAt: 0, busy: false, destroyed: false, speed: 1,
      anims: new Set(), timers: new Set(), infoOpen: 0, held: 0, table: null, flash: null, triForce: null,
      recNext: false, lp: null, swallow: null, enterDone: !opts.enter, ending: false, auto: false, tagged: false,
      rush: false, playAt: 0, fitRaf: 0, ro: null, lastLine: {}, seenOff: false, debug: { log: [], hands: [] },
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

    // ---------------- stage（常駐 DipLabStage；duel.js 只呼叫 API，新唱盤 API 有就用、沒有就退回 pose／float） ----------------
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
    function holdSleeve(side, card, ace) {
      if (!hasStage('hold')) return;
      stg('hold', side, card ? (ace ? 'ace' : { sleeve: card.id }) : null);
    }

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

    // ---------------- DOM skeleton ----------------
    const root = document.createElement('div');
    root.className = 'dl';
    root.dataset.phase = 'choose';
    root.setAttribute('role', 'application');
    root.setAttribute('aria-label', '品味對決');
    root.innerHTML = `
      <section class="dl-e" data-tut="e-hud">
        <div class="nmrow"><b class="nm" data-tut="e-name"></b><span class="sub"></span><span class="sp"></span>
          <span class="hpn" data-tut="e-hp"><span>${esc(T('hp'))}</span><b class="num key"></b></span></div>
        <div class="hp"><i class="lost"></i><i class="fill"></i></div>
        <div class="habit" data-tut="e-habit"><span class="lb"></span><span class="tx"></span></div>
        <div class="rec" data-tut="e-rec"></div>
      </section>
      <section class="dl-t" data-tut="table">
        <div class="slot e" data-tut="slot-e"></div>
        <div class="slot p" data-tut="slot-p"></div>
        <div class="tri" data-tut="tri"></div>
        <div class="callout" data-tut="result" aria-live="polite"></div>
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
      e: $('.dl-e'), enm: $('.dl-e .nm'), esub: $('.dl-e .sub'), ehpn: $('.dl-e .hpn .num'), ehp: $('.dl-e .hp'),
      habit: $('.habit'), hlb: $('.habit .lb'), htx: $('.habit .tx'), rec: $('.rec'),
      table: $('.dl-t'), se: $('.slot.e'), sp: $('.slot.p'), tri: $('.tri'), call: $('.callout'), last: $('.lastline'),
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
    function setHp(bar, numEl, hp, max, notch, animate) {
      const fill = bar.querySelector('.fill'), lost = bar.querySelector('.lost');
      const w = pct(Math.max(0, hp), max);
      bar.querySelectorAll('.notch').forEach(n => n.remove());
      [].concat(notch == null ? [] : notch).forEach(n => { if (!(n > 0)) return; const t = document.createElement('span'); t.className = 'notch'; t.style.left = pct(n, max) + '%'; bar.appendChild(t); });
      numEl.textContent = `${Math.max(0, hp)}/${max}`;
      if (!animate) { fill.style.transition = 'none'; lost.style.transition = 'none'; fill.style.width = w + '%'; lost.style.width = w + '%'; void fill.offsetWidth; fill.style.transition = ''; lost.style.transition = ''; return; }
      const dur = Math.round(500 / S.speed);
      fill.style.transitionDuration = dur + 'ms';
      const old = parseFloat(fill.style.width) || 0;
      if (w < old) { lost.style.transition = 'none'; lost.style.width = old + '%'; void lost.offsetWidth; lost.style.transition = ''; fill.style.width = w + '%'; later(() => { lost.style.transitionDuration = dur + 'ms'; lost.style.width = w + '%'; }, dur + 250); }
      else { fill.style.width = w + '%'; lost.style.width = w + '%'; }
    }
    // 數字旁的小飄字（不吃點擊）：'left'＝聲望數字左邊往左飄
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
    const cardOf = (v, i) => i === 'ace' ? v.ace : v.hand[i];
    const selKey = s => s ? s.i + ':' + s.attr : '';
    function actOf(sel) { return sel.i === 'ace' ? { type: 'ace', ace: true } : { type: 'card', i: sel.i, attr: sel.attr }; }
    function safePreview(sel) {
      if (!sel || typeof E.preview !== 'function') return null;
      try { return E.preview(duel, actOf(sel)) || null; } catch (e) { console.error(e); return null; }
    }
    function legal(sel) {
      if (!sel) return false;
      try {
        if (typeof E.isLegal === 'function') return !!E.isLegal(duel, actOf(sel));
        const L = E.legalActions(duel) || [];
        return L.some(a => sel.i === 'ace' ? (a.ace || a.type === 'ace') : (!a.ace && a.type !== 'ace' && a.i === sel.i && a.attr === sel.attr));
      } catch (_) { return false; }
    }

    // ---------------- render: 他的一塊 ----------------
    function renderE(v, opt) {
      opt = opt || {};
      els.enm.textContent = enemy.name || v.eName || '';
      els.esub.textContent = enemy.title || v.eTitle || '';
      if (!opt.keepHp) setHp(els.ehp, els.ehpn, v.eHp, v.eMax, v.notch, false);
      renderHabit(v);
      renderRec(v);
    }
    function renderHabit(v) {
      const h = habitParts(v);
      els.hlb.textContent = h.lb; els.htx.textContent = h.tx;
    }
    function renderRec(v) {
      const n = v.pile | 0, max = Math.max(n, v.pileMax | 0);
      const bars = Array.from({ length: max }, (_, k) => `<i${k < n ? '' : ' class="x"'}></i>`).join('');
      const pile = `<div class="pile" data-tut="e-pile"><span class="bars">${bars}</span><small>${esc(T('pileLeft', { n }))}</small></div>`;
      if (S.recNext || !v.eCard) {
        els.rec.innerHTML = `<span class="cv nextph" aria-hidden="true">…</span><div class="tx"><div class="l1"><small>${S.recNext && !v.over ? esc(T('next')) : ''}</small></div>
          <div class="estars" data-tut="e-stars">${ATTRS.map(a => `<div class="es q" data-tut="e-star-${a}"><span class="k"><i>${ZH1[a]}</i>?</span><span class="ans"></span></div>`).join('')}</div></div>${pile}`;
        return;
      }
      const c = v.eCard;
      els.rec.innerHTML = `<button type="button" class="cvb" data-tut="e-cover" data-card="${esc(c.id)}" aria-label="唱片資訊：${esc(title(c))}">${img(c)}</button>
        <div class="tx"><div class="l1" data-card="${esc(c.id)}"><small>${esc(T('shows'))}</small>${esc(title(c))}</div>
        <div class="estars" data-tut="e-stars">${ATTRS.map(a => `<div class="es" data-tut="e-star-${a}"><span class="k ${a}"><i>${ZH1[a]}</i><b class="key">${c[a] | 0}</b></span><span class="ans"></span></div>`).join('')}</div></div>${pile}`;
      renderAnswers();
    }
    // 結果預告：你點了一顆星，他三顆星底下各浮一個結果（他丟那色會怎樣）；數字全部是 preview()
    function renderAnswers() {
      const p = !S.busy && S.sel ? safePreview(S.sel) : null;
      ATTRS.forEach(a => {
        const el = els.rec.querySelector(`.es[data-tut="e-star-${a}"] .ans`); if (!el) return;
        const t = p ? answerOf(p[a], T) : { cls: '', text: '' };
        el.className = 'ans key ' + t.cls; el.textContent = t.text;
      });
    }

    // ---------------- render: 牌桌 ----------------
    function renderSlot(side) {
      const el = side === 'e' ? els.se : els.sp, Tb = S.table, d = Tb && Tb[side];
      el.className = 'slot ' + side + (Tb && Tb.dim ? ' dim' : '') + (d ? '' : ' empty');
      el.removeAttribute('data-card'); el.removeAttribute('role'); el.removeAttribute('tabindex'); el.removeAttribute('aria-label');
      if (!d) { el.innerHTML = `<span class="ph">${esc(T(side === 'e' ? 'slotE' : 'slotP'))}</span>`; return; }
      const b = Tb.badges && Tb.badges[side];
      const badge = b ? `<span class="badge ${b === T('badgeLose') ? 'l' : b === T('badgeTie') ? 'd' : 'w'}">${esc(b)}</span>` : '';
      el.innerHTML = `<span class="cvw">${img(d.card)}${badge}</span><div class="who">${esc(T(side === 'e' ? 'he' : 'you'))}<span class="${d.attr}">${d.ace ? esc(T('aceWord')) : ''}${ZH[d.attr]} <span class="num">${d.star}</span></span></div>`;
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
      let s = `<svg viewBox="0 0 132 118" aria-label="冷門剋經典，經典剋硬蕊，硬蕊剋冷門" role="img"><defs>`;
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
    function lastLineHTML(ct) {
      return `<span class="lb">${esc(T('lastPrefix'))}</span><b>${esc(ct.l1)}　<span class="${ct.cls}">${esc(ct.l2)}</span></b>${ct.st ? `<span class="stp">${esc(ct.st.replace(/[！!]$/, ''))}</span>` : ''}`
        + (ct.notes.length ? `<span class="nt">${esc(ct.notes.join('・'))}</span>` : '');
    }
    function renderLast(v) {
      els.last.classList.remove('first');
      if (S.lastCt) { els.last.innerHTML = lastLineHTML(S.lastCt); return; }
      if (v.first && !v.over) { els.last.classList.add('first'); els.last.textContent = T('firstHand'); return; }
      els.last.textContent = '';
    }
    function renderTable(v) { renderSlot('e'); renderSlot('p'); renderTri(); renderLast(v); }

    // ---------------- render: 你的一塊、手牌、星鈕 ----------------
    function relicIconHTML(r) {
      const sz = 16;
      try { if (typeof hooks.relicIcon === 'function') { const h = hooks.relicIcon(r.id, sz); if (h) return h; } } catch (_) {}
      try { const U = window.DipLabUI; if (U && typeof U.relicIcon === 'function') { const h = U.relicIcon(r.id, sz); if (h && !/lb-ri/.test(h)) return h; } } catch (_) {}
      return `<span class="rl-t">${esc(String(r.name || '?').slice(0, 1))}</span>`;
    }
    function renderP(v, opt) {
      opt = opt || {};
      if (!opt.keepHp) setHp(els.php, els.phpn, v.pHp, v.pMax, null, false);
      els.relics.innerHTML = (v.relics || []).slice(0, 3).map(r => `<button type="button" class="rl" data-tut="relic-${esc(r.id)}" data-relic="${esc(r.id)}" aria-label="發燒配件：${esc(r.name || '')}">${relicIconHTML(r)}</button>`).join('');
    }
    function tileHTML(v, i) {
      const isAce = i === 'ace', c = cardOf(v, i); if (!c) return '';
      const used = isAce && v.aceUsed, sel = S.sel && S.sel.i === i;
      const eye = v.eyeTarget && v.eyeTarget.i === i ? v.eyeTarget.attr : null;
      const lock = S.busy || used;
      const chip = (a, wide) => {
        const on = sel && S.sel.attr === a;
        return `<button type="button" class="chip ${a}${wide ? ' wide' : ''}${on ? ' sel' : ''}" data-tut="${isAce ? 'chip-ace' : `chip-${i}-${a}`}" data-i="${i}" data-a="${a}"${lock ? ' disabled' : ''} aria-pressed="${on}" aria-label="${esc((isAce ? '王牌 ' : '') + ZH[a] + ' ' + (c[a] | 0) + ' 星')}">`
          + `<i>${ZH1[a]}</i><b class="key">${c[a] | 0}</b>${eye === a ? `<span class="eye">${esc(T('eyeMark'))}</span>` : ''}</button>`;
      };
      const chips = isAce ? chip(v.aceAxis || aceAxisOf(c), true) : ATTRS.map(a => chip(a)).join('');
      return `<div class="tile${isAce ? ' ace' : ''}${sel ? ' sel' : ''}${used ? ' used' : ''}" data-tut="${isAce ? 'hand-ace' : 'hand-' + i}" data-card="${esc(c.id)}" data-i="${i}">`
        + `<button type="button" class="cvw" data-act="info" aria-label="唱片資訊：${esc(title(c))}">${img(c)}${isAce ? `<span class="acetag">${esc(T(used ? 'aceUsed' : 'aceSlot'))}</span>` : ''}</button>`
        + `<div class="chips">${chips}</div></div>`;
    }
    function renderHand(v, opt) {
      opt = opt || {};
      const ids = [];
      if (v.ace) ids.push('ace');
      v.hand.forEach((c, i) => { if (c) ids.push(i); });
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
      els.say.innerHTML = `<small>${esc(T('picked'))}${esc(title(c))}</small><b class="${a}">${S.sel.i === 'ace' ? esc(T('aceWord')) + ' ' : ''}${ZH[a]} <span class="num">${c ? c[a] | 0 : ''}</span></b><span class="hn">${esc(T('again'))}</span>`;
      els.thr.disabled = false;
    }
    function renderAll(opt) {
      const v = S.v;
      renderE(v, opt); renderTable(v); renderP(v, opt); renderHand(v); renderAct();
      scheduleFit();
    }

    // ---------------- 尺寸：沒有捲動；依盤面可用高度換一級（SPEC-v3 §4 矮螢幕） ----------------
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

    // ---------------- input ----------------
    function bumpEl(el) { if (el && !rm()) A(el, [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 300 }); }
    const isOver = () => !!(S.v && S.v.over) || S.ending;
    const canAct = () => !S.busy && S.enterDone && !isOver() && !S.held;
    function selectChip(i, attr) {
      if (!canAct()) return false;
      const v = S.v;
      if (i === null) {
        if (!S.sel) return true;
        S.sel = null; markSel(); renderAnswers(); renderTri(); renderAct(); holdSleeve('p', null); emit('selected', null); return true;
      }
      const c = cardOf(v, i); if (!c) return false;
      if (i === 'ace') { if (v.aceUsed) return false; attr = v.aceAxis || aceAxisOf(c); }
      if (!ATTRS.includes(attr)) return false;
      const sel = { i, attr };
      if (!legal(sel)) return false;
      if (!gate({ kind: 'chip', i, attr, id: c.id })) return false;
      const changedCard = !S.sel || S.sel.i !== i;
      S.sel = sel; S.selAt = performance.now();
      sfx('select');
      markSel(); renderAnswers(); renderTri(); renderAct();
      if (changedCard) holdSleeve('p', c, i === 'ace');
      emit('selected', { i, attr });
      return true;
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
      if (S.sel && S.sel.i === i && S.sel.attr === a) {
        if (performance.now() - S.selAt < DBL_MS) return;     // 一次觸控的第二下：吞掉
        throwSel(btn);
        return;
      }
      if (!selectChip(i, a)) bumpEl(btn);
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
    // 點封面（或長按）＝唱片資訊：他亮出的、牌桌上兩張、手牌、王牌。星鈕不開。
    const INFO_SEL = '[data-act="info"], .cvb, .rec .l1[data-card], .slot[data-card]';
    function infoFor(t) {
      const x = t && t.closest && t.closest(INFO_SEL); if (!x) return false;
      if (x.matches('[data-act="info"]')) { const tl = x.closest('.tile'); const i = tl.dataset.i === 'ace' ? 'ace' : +tl.dataset.i; const c = cardOf(S.v, i); if (c) openInfo(c, i === 'ace' ? 'hand-ace' : 'hand'); return true; }
      if (x.matches('.slot')) { const side = x.classList.contains('e') ? 'e' : 'p', d = S.table && S.table[side]; if (d && d.card) openInfo(d.card, 'slot-' + side, d.attr); return true; }
      if (S.v.eCard && !S.recNext) openInfo(S.v.eCard, 'e-rec');
      return true;
    }
    function onClick(ev) {
      const t = ev.target;
      const sw = S.swallow; S.swallow = null;
      if (sw && performance.now() < sw.until && sw.el.contains(t)) { ev.preventDefault(); return; }   // 長按之後的那一下 click
      if (S.held) { ev.preventDefault(); return; }
      if (!els.pop.hidden && !t.closest('.rl')) els.pop.hidden = true;
      let x;
      if (infoFor(t)) return;
      if ((x = t.closest('.rl'))) { relicTap(x); return; }
      if (S.busy) {   // 結算中點畫面＝這手 4 倍速
        if (!S.rush && performance.now() - S.playAt > RUSH_MS) { S.rush = true; setSpeed(Math.max(S.speed, 4)); }
        return;
      }
      if ((x = t.closest('.chip'))) { chipTap(x); return; }
      if ((x = t.closest('.throw'))) { throwSel(x); return; }
    }
    function onDown(ev) {
      const t = ev.target.closest(INFO_SEL);
      if (!t || S.held || (ev.button != null && ev.button > 0)) { S.lp = null; return; }
      const lp = S.lp = { el: t, x: ev.clientX, y: ev.clientY, h: 0 };
      lp.h = later(() => {
        if (S.lp !== lp) return;
        S.lp = null;
        infoFor(t);
        S.swallow = { el: t, until: performance.now() + 900 };   // 放開手指的那一下 click 不再開一次
      }, LONG_MS);
    }
    function onMove(ev) { const lp = S.lp; if (lp && (Math.abs(ev.clientX - lp.x) > 10 || Math.abs(ev.clientY - lp.y) > 10)) { clearTimeout(lp.h); S.lp = null; } }
    function onUp() { const lp = S.lp; if (lp) { clearTimeout(lp.h); S.lp = null; } }
    root.addEventListener('click', onClick);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerup', onUp);
    root.addEventListener('pointercancel', onUp);
    root.addEventListener('contextmenu', ev => { if (ev.target.closest('.tile,.slot,.cvb,.chip')) ev.preventDefault(); });
    root.addEventListener('keydown', ev => {
      if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.classList && ev.target.classList.contains('slot')) { ev.preventDefault(); ev.target.click(); }
    });

    // ---------------- 一手（約 2 s；SPEC-v3 §5、§7） ----------------
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
    function fadeIn(el, ms) { if (el) A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: ms || 200, easing: 'ease-out' }); }
    function showCallout(ct) {
      const c = els.call;
      c.innerHTML = `<div class="l1">${ct.st ? `<span class="st">${esc(ct.st)}</span>` : ''}${esc(ct.l1)}</div>`
        + `<div class="l2 ${ct.cls}"><span class="v key">${esc(ct.l2)}</span>${ct.notes.length ? `<span class="l3">${esc(ct.notes.join('・'))}</span>` : ''}</div>`;   // 發燒配件生效：數字旁一句
      c.classList.add('on');
      els.table.classList.add('res');
      if (rm()) A(c, [{ opacity: 0 }, { opacity: 1 }], { duration: 150, fill: 'both' });
      else A(c, [{ transform: 'translate(-50%,0) scale(.3)', opacity: 0 }, { transform: 'translate(-50%,0) scale(1.08)', opacity: 1, offset: .6 }, { transform: 'translate(-50%,0) scale(1)', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.18,.9,.32,1.25)', fill: 'both' });
    }
    function hideCallout() {
      const c = els.call; if (!c.classList.contains('on')) return;
      const a = A(c, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
      const done = () => { c.classList.remove('on'); c.innerHTML = ''; els.table.classList.remove('res'); S.anims.forEach(x => { try { if (x.effect && x.effect.target === c) x.cancel(); } catch (_) {} }); };
      if (a) a.finished.then(done, done); else done();
    }
    function bigStamp(text, cls, sub) {
      const k = els.kost;
      k.className = 'kost on ' + (cls || '');
      k.innerHTML = `<b>${esc(text)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}`;
      if (rm()) A(k, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
      else A(k, [{ transform: 'translate(-50%,-50%) rotate(-4deg) scale(1.8)', opacity: 0 }, { transform: 'translate(-50%,-50%) rotate(-4deg) scale(.96)', opacity: 1, offset: .5 }, { transform: 'translate(-50%,-50%) rotate(-4deg) scale(1)', opacity: 1 }], { duration: 420, easing: 'ease-out', fill: 'forwards' });
    }
    const HIT_SFX = { counter: c => (c.read ? 'seeThrough' : 'readHit'), countered: () => 'hurt', mirrorWin: () => 'mirror', mirrorLose: () => 'hurt', tie: () => 'mirror' };
    function flashOf(c) {
      if (c.kind === 'counter') return { edge: c.pAttr + c.eAttr, tone: 'g' };
      if (c.kind === 'countered') return { edge: c.eAttr + c.pAttr, tone: 'r' };
      return { ring: c.pAttr };
    }
    function stageFallbackHit(cl) {   // 沒有新唱盤 API 時：受擊＋頭上飄字
      if (cl.toE > 0) { stg('pose', 'f', 'hurt', 200); stg('float', 'f', '−' + cl.toE); }
      if (cl.toP > 0) { stg('pose', 'p', 'hurt', 200); stg('float', 'p', '−' + cl.toP, 'r'); }
    }

    // 他丟的那色跟名牌算出來的那色，在玩家眼裡一樣（最大的星並列，例：經 3／冷 3）：不跳「他這手沒照脾氣」，免得教錯
    function tiedWithTag(v0, cl) {
      const c = cl && cl.eCard; if (!c || !v0) return false;
      const st = a => +(c[a] || 0), mx = Math.max(st('c'), st('o'), st('h'));
      const tops = ATTRS.filter(a => st(a) === mx); if (tops.length < 2) return false;
      const BE = (E && E.BEATS) || { o: 'c', c: 'h', h: 'o' };
      if (v0.habit === 'bluff') return tops.some(a => BE[a] === cl.eAttr);
      if (v0.habit === 'honest' || v0.first) return tops.indexOf(cl.eAttr) >= 0;
      return false;
    }
    async function play(act, sel) {
      if (!canAct() || !legal(sel)) return false;
      S.busy = true; S.rush = false; S.playAt = performance.now();
      const v0 = S.v;
      const tileEl = els.hand.querySelector(`.tile[data-i="${sel.i}"]`);
      const srcP = rectOf(tileEl && tileEl.querySelector('.cv'));
      const srcE = rectOf(els.rec.querySelector('.cvb .cv'));
      let evs;
      const ro = {};
      try { if (typeof hooks.resolveOpts === 'function') Object.assign(ro, hooks.resolveOpts(act) || {}); } catch (e) { console.error(e); }
      try { if (tut && typeof tut.resolveOpts === 'function') Object.assign(ro, tut.resolveOpts(act) || {}); } catch (e) { console.error(e); }
      try { evs = E.resolveTurn(duel, act, ro) || []; } catch (e) { console.error(e); S.busy = false; renderAll(); return false; }
      if (opts.onSave) try { opts.onSave(duel); } catch (e) { console.error(e); }
      const v1 = view();
      const cl = evs.find(e => e.t === 'clash');
      const sw = evs.find(e => e.t === 'switch'), over = evs.find(e => e.t === 'over'), hs = evs.find(e => e.t === 'hand'), dr = evs.find(e => e.t === 'draw');
      if (!cl) { console.error('DipLabDuel: no clash event', evs); S.busy = false; S.v = v1; renderAll(); return false; }
      const t0 = performance.now();
      const ct = clashText(cl, T);
      const rec = { n: v0.n, act, sel, evs, ct };
      S.debug.hands.push(rec); if (S.debug.hands.length > 300) S.debug.hands.shift();
      S.sel = null;
      setPhase('resolve');
      root.classList.add('busy');
      emit('selected', null);
      // ---- t=0：兩張唱片飛上牌桌、舞台開始互丟
      sfx('needle');
      S.lastCt = null; S.flash = null;
      S.table = { e: { card: cl.eCard, attr: cl.eAttr, star: cl.eStar }, p: { card: cl.pCard, attr: cl.pAttr, star: cl.pStar, ace: !!cl.ace }, dim: false, badges: null };
      renderTable(v0);
      els.last.textContent = '';
      if (tileEl) tileEl.classList.add('gone');
      els.hand.querySelectorAll('.chip').forEach(b => { b.disabled = true; });
      S.recNext = true; renderRec(v1);
      fly(els.sp.querySelector('.cv'), srcP, 260); fadeIn(els.sp.querySelector('.who'), 260);
      fly(els.se.querySelector('.cv'), srcE, 260); fadeIn(els.se.querySelector('.who'), 260);
      renderAct();
      let stagePr = null;
      if (hasStage('clash')) {
        if (hasStage('clearClash')) stg('clearClash');
        stagePr = stg('clash', { kind: cl.kind, p: { attr: cl.pAttr, card: cl.pCard && cl.pCard.id, ace: !!cl.ace }, e: { attr: cl.eAttr, card: cl.eCard && cl.eCard.id },
          seeThrough: !!cl.read, toE: cl.toE | 0, toP: cl.toP | 0, nameE: enemy.name || '', speed: S.speed, reduced: rm() });
      } else {
        stg('pose', 'p', 'atk', 200);
        later(() => stg('pose', 'f', 'atk', 200), 260 / S.speed);
      }
      onEvent(cl);
      await wait(T_HIT);
      if (S.destroyed) return true;
      // ---- t=560：浮框、勝負角標、聲望條、音效
      S.table.badges = ct.badges; renderSlot('e'); renderSlot('p');
      S.flash = flashOf(cl); renderTri();
      showCallout(ct);
      sfx((HIT_SFX[cl.kind] || (() => 'mirror'))(cl));
      if (cl.read && !rm()) { const f = Fx(); if (f && f.hitStop) try { f.hitStop(80); } catch (_) {} }
      if (!hasStage('clash')) stageFallbackHit(cl);
      setHp(els.ehp, els.ehpn, v1.eHp, v1.eMax, v1.notch, true);
      setHp(els.php, els.phpn, v1.pHp, v1.pMax, null, true);
      if (cl.toE > 0) floatAt(els.ehpn, '−' + cl.toE, 'g');
      if (cl.toP > 0) floatAt(els.phpn, '−' + cl.toP, 'r');
      if (ct.notes.length) (cl.notes || []).forEach(n => { const b = n && n.relic && els.relics.querySelector(`[data-relic="${CSS.escape(n.relic)}"]`); if (b && !rm()) A(b, [{ transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(184,134,11,0)' }, { transform: 'scale(1.25)', boxShadow: '0 0 0 3px rgba(184,134,11,.6)', offset: .4 }, { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(184,134,11,0)' }], { duration: 700 }); });
      // 一次性小提示（外殼／教學決定是不是這輩子第一次）
      if (cl.kind === 'mirrorWin' || cl.kind === 'mirrorLose' || cl.kind === 'tie') hint('tip_mirror', ['result']);
      if (cl.followed === false && !tiedWithTag(v0, cl)) hint('tip_offhabit', ['e-habit']);
      if (cl.read) hint('tip_read', ['result']);
      rec.ui = snapUI();
      if (tut && typeof tut.onResolved === 'function') try { tut.onResolved(evs); } catch (e) { console.error(e); }
      emit('resolved', evs);
      await wait(T_LINE - T_HIT);
      if (S.destroyed) return true;
      // ---- t=1460：浮框收成「上一手」
      hideCallout();
      S.lastCt = ct; S.flash = null;
      renderLast(v1); renderTri();
      rec.ui.lastline = els.last.textContent.replace(/\s+/g, ' ').trim();
      if (sw) habitSwap(sw, v1);
      emit('settled', evs);
      if (over) { await finish(over, v1); return true; }
      await wait(T_NEXT - T_LINE);
      if (S.destroyed) return true;
      if (stagePr && typeof stagePr.then === 'function' && !S.rush) { /* 舞台演完才換手（最多再等 400 ms） */ await Promise.race([stagePr.catch(() => {}), wait(400)]); }
      // ---- t=2060：下一手
      S.debug.lastMs = performance.now() - t0;
      S.v = v1; S.recNext = false;
      if (S.table) S.table.dim = true;
      S.speed = baseSpeed(); setSpeed(S.speed); S.rush = false;
      root.classList.remove('busy');
      S.busy = false;
      renderE(v1); renderTable(v1); renderP(v1); renderHand(v1, { slideNew: dr && dr.card ? dr.i : null }); renderAct();
      scheduleFit();
      const cv = els.rec.querySelector('.cvb'), stars = els.rec.querySelector('.estars');
      if (!rm()) { A(cv, [{ transform: 'translateY(-10px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 260, easing: 'ease-out' }); A(stars, [{ opacity: 0 }, { opacity: 1 }], { duration: 260 }); }
      if (hs) onEvent(hs);
      handStart(v1);
      setPhase('choose');
      return true;
    }
    function habitSwap(sw, v1) {
      onEvent(sw);
      sfx('faceChange');
      const boss = /B ?面/.test(String(sw.label || v1.habitLabel || ''));
      say('f', pickLine(['switch', 'phase2', '急了']) || T(boss ? 'switchBubbleB' : 'switchBubble'), 1800);
      if (rm()) { renderHabit(v1); }
      else {
        const a = A(els.habit, [{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: 'forwards' });
        const fin = () => { renderHabit(v1); A(els.habit, [{ opacity: 0 }, { opacity: 1 }], { duration: 150, fill: 'forwards' }); };
        if (a) a.finished.then(fin, fin); else fin();
      }
      hint('tip_switch', ['e-habit']);
    }
    function handStart(v) {
      if (v.eCard) holdSleeve('e', v.eCard, false);
      holdSleeve('p', null);
      if (v.habit === 'eye' && v.eyeTarget) {
        const t = v.eyeTarget.i === 'ace' ? 'chip-ace' : `chip-${v.eyeTarget.i}-${v.eyeTarget.attr}`;
        hint('tip_eye', ['e-habit', t]);
      }
      emit('handStart', v);
    }
    async function finish(over, v1) {
      S.ending = true;
      const win = !!over.win;
      const result = { over: win ? 'win' : 'lose', win, by: over.by || 'hp', pHp: v1.pHp, eHp: v1.eHp, duel };
      setPhase('over');
      root.classList.add('over');
      renderAct();
      stg('pose', win ? 'f' : 'p', 'ko', 700);
      sfx('ko');
      say('f', pickLine(win ? ['lose'] : ['win']), 1800);
      later(() => sfx(win ? 'win' : 'lose'), 300);
      let tx = null;
      if (typeof hooks.endText === 'function') try { tx = hooks.endText(result); } catch (e) { console.error(e); }
      if (!tx) {
        const nm = enemy.name || '';
        if (result.by === 'pile') tx = { title: T('pileOut'), sub: T('pileScore', { p: Math.max(0, v1.pHp), e: Math.max(0, v1.eHp), who: win ? '你' : '他' }), cls: win ? 'ink' : 'red' };
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
      holdSleeve('e', null); holdSleeve('p', null);
      S.busy = false;
      if (opts.onEnd) try { opts.onEnd(result); } catch (e) { console.error(e); }
    }

    // ---------------- 起手 ----------------
    function initialTable() {   // 續玩：從 view().last 還原「上一手」兩張（變淡）
      const l = S.v.last;
      if (!l || S.v.over) return;
      S.lastCt = clashText(l, T);
      S.table = { e: { card: l.eCard, attr: l.eAttr, star: l.eStar }, p: { card: l.pCard, attr: l.pAttr, star: l.pStar, ace: !!l.ace }, dim: true, badges: S.lastCt.badges };
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
      const open1 = lines.line || lines.intro;   // 口頭禪（SPEC-v3 §3），沒有就用推門那句
      if (fresh && open1 && !tut) say('f', Array.isArray(open1) ? open1[0] : open1, 1800);
      renderAct();
      handStart(S.v);
      setPhase('choose');
    }

    // ---------------- autoplay（e2e 用；走正常的點擊流程與 gate） ----------------
    async function autoplay(policy) {
      const P = E.policies || {};
      const pol = P[policy] || P.novice || P.random;
      if (typeof pol !== 'function') return false;
      S.auto = true;
      const r = E.makeRng ? E.makeRng(1234) : Math.random, mem = {};
      while (S.auto && !S.destroyed && !isOver()) {
        if (!canAct() || paused()) { await wait(40); continue; }
        let act; try { act = pol(duel, r, mem); } catch (e) { console.error(e); break; }
        if (!act) break;
        const isAce = act.ace || act.type === 'ace';
        const sel = isAce ? { i: 'ace', attr: S.v.aceAxis } : { i: act.i, attr: act.attr };
        if (!selectChip(sel.i, sel.attr) && selKey(S.sel) !== selKey(sel)) { await wait(80); continue; }
        await wait(120);
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
    function elByName(name) {
      if (!name) return null;
      if (name[0] === '@') { const s = hooks.stage; return s && typeof s.anchor === 'function' ? (() => { try { return s.anchor(name.slice(1)); } catch (_) { return null; } })() : null; }
      if (name.startsWith('card:')) return els.hand.querySelector(`.tile[data-card="${CSS && CSS.escape ? CSS.escape(name.slice(5)) : name.slice(5)}"]`);
      if (name.startsWith('chip:best:')) {   // 'chip:best:o'＝手牌裡冷門星最多的那顆（不含王牌）；'chip:best:o:ace'＝含王牌
        const [a, withAce] = name.slice(10).split(':'), v = S.v; let b = null;
        if (typeof E.bestChip === 'function') { try { b = E.bestChip(duel, a, { ace: withAce === 'ace' }); } catch (_) { b = null; } }
        else {
          let bs = -1;
          if (withAce === 'ace' && v.ace && !v.aceUsed && v.aceAxis === a) { b = { ace: true }; bs = v.ace[a] | 0; }
          v.hand.forEach((c, i) => { if (c && (c[a] | 0) > bs) { bs = c[a] | 0; b = { i, attr: a }; } });
        }
        if (!b) return null;
        return root.querySelector(`[data-tut="${b.ace ? 'chip-ace' : `chip-${b.i}-${a}`}"]`);
      }
      return root.querySelector(`[data-tut="${name}"]`);
    }
    const txt = el => el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
    function snapUI() {
      const ans = {}, stars = {};
      ATTRS.forEach(a => { const es = els.rec.querySelector(`.es[data-tut="e-star-${a}"]`); ans[a] = txt(es && es.querySelector('.ans')); stars[a] = txt(es && es.querySelector('.k')); });
      const slot = el => ({ who: txt(el.querySelector('.who')), badge: txt(el.querySelector('.badge')), card: el.dataset.card || null, dim: el.classList.contains('dim') });
      return {
        call: { st: txt(els.call.querySelector('.st')), l1: txt(els.call.querySelector('.l1')).replace(/^看穿！\s*/, ''), l2: txt(els.call.querySelector('.l2 .v')), l3: txt(els.call.querySelector('.l3')), on: els.call.classList.contains('on') },
        slotE: slot(els.se), slotP: slot(els.sp), lastline: txt(els.last), habit: { lb: txt(els.hlb), tx: txt(els.htx) },
        eHp: txt(els.ehpn), pHp: txt(els.phpn), answers: ans, stars, pile: txt(els.rec.querySelector('.pile small')), act: txt(els.say),
      };
    }
    const api = {
      el: root,
      elByName,
      view: () => S.v,
      duel: () => duel,
      busy: () => S.busy,
      phase: () => S.phase,
      select: (i, attr) => {
        if (i == null) return selectChip(null);
        if (attr == null) { const c = cardOf(S.v, i); if (!c) return false; attr = i === 'ace' ? (S.v.aceAxis || aceAxisOf(c)) : ATTRS.reduce((b, a) => ((c[a] | 0) > (c[b] | 0) ? a : b), 'c'); }
        return selectChip(i, attr);
      },
      play: act => {
        if (!act) return Promise.resolve(false);
        const isAce = act.ace || act.type === 'ace';
        const sel = isAce ? { i: 'ace', attr: S.v.aceAxis } : { i: act.i, attr: act.attr };
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
        ui: snapUI(), hands: S.debug.hands.map(h => ({ n: h.n, sel: h.sel, evs: h.evs, ui: h.ui })), last: S.debug.hands[S.debug.hands.length - 1] || null,
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
    _fmt: { clashText, answerOf, habitParts, text: dtOf },
  };
  window.DipLabDuel = DipLabDuel;
})();
