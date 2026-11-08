// game-lab/duel.js — 品味對決 v4：店內舞台下方的對決盤面（Agent B1；SPEC-v4 §2.5.1、§2.2.7、§2.3.3；手牌 FIXLIST 11：H2）
//
// ── v4 contract（tutorial.js／ui.js／e2e 照這些名字找）────────────────────────────────────────────────────
// data-tut  他的一塊：e-hud e-name e-hp e-hint e-rec e-sleeve e-pile（名牌只有名字：副標與誠實度都拿掉，FIXLIST 6）
//           牌桌    ：table slot-e slot-p tri tri-oc tri-ch tri-ho rounds result（浮框 .l1 .l2 .l3） lastline
//           你的一塊：p-hud p-hp relics relic-<id> hand hand-<i> hand-ace card-<i> card-ace pop chip-<i>-<attr> chip-ace
//             （FIXLIST 11：手牌平時疊成扇形（hand.fan），點一下攤開（hand.spread）；攤開後點一張＝浮起，正上方跳屬性鈕（pop；
//              chip-<i>-<attr>／王牌 chip-ace 只有浮起的那張有）；點屬性鈕＝照那個屬性丟出。沒有星鈕列、沒有「丟！」）
// el(name)：上面的名字；
//           'card:best:<attr>'／'chip:best:<attr>'（＋':ace'＝王牌也算）＝那一色星最多的那張封面／屬性鈕（engine.bestChip）；
//           'card:id:<cardId>'＝那張的封面；'chip:id:<cardId>:<attr>'＝那張那色的屬性鈕（浮起時才有）；
//           'card:blocked:<attr>'／'chip:blocked:<attr>'＝engine.blockedChoice 那張的封面／屬性鈕；
//           'card:<cardId>'＝那張的整格（v3）；'@f'|'@p'|'@o'＝舞台錨點。
//
// DipLabDuel.mount(panelEl, { duel, events, run, content, enter, onEnd(result), onSave(duel),
//   hooks: { stage, cardInfo(card,{attr,from}), hint(id,targets), settings()->{fastAnim}, onEvent(ev,duel), tut, resolveOpts(act),
//            beforeEnd(result)->Promise, endText(result)->{title,sub}|null, relicIcon(id,size)->html } })
//   result（onEnd／'over'）＝{ over:'win'|'lose', win, by:'hp'|'rounds'|'pile', pHp, eHp, duel }
// DipLabDuel.unmount() rerender() el(name) on(evt,cb)->off hold(bool)->count select(i|'ace'|null, attr?) spread(bool) preview(attr) play(act)->Promise
//           tri(lit|null)（教學：強制亮哪幾條箭頭，'oc'|'ch'|'ho' 或陣列） autoplay(policy) stopAuto() debug()
//           _fmt.clashText(clashEvent, T, hints) → { l1, l2, l3, cls, rule, notes }（e2e 比對浮框）
// gate（hooks.tut.gate(action) 回 false 就擋）：{kind:'spread'}（點疊著的手牌＝攤開） {kind:'card',i,attr,id}（攤開後點封面＝浮起這張，attr＝topAttr）
//   {kind:'throw',i,attr,id}（點屬性鈕＝出手，唯一的出手方式） {kind:'collapse'}（點手牌外面＝收回扇形）
//   {kind:'chip',i,attr,id}（只有 API select(i, attr) 送：換預覽的屬性，不出手） {kind:'info',where} {kind:'close'}；i＝0..handSize−1 或 'ace'
// 事件：'phase'(choose|resolve|over) 'selected'({i,attr}|null) 'spread'(bool) 'resolved'(evs：560 ms 浮框剛出現時，同步) 'settled'(evs：1460 浮框收成一行)
//       'handStart'(view) 'over'(result) 'info'(where) 'infoClosed'(where) 'relic'(id)
//
// 規則：畫面上每個數字都來自引擎的 view()／resolveTurn() 事件；UI 不算傷害、不讀 duel.plan。提示只寫句子，不寫屬性名（D §5）。
// 一手（T_FLIP 280／T_HIT 560／T_LINE 1460／T_NEXT 2060）：0 你的牌飛上牌桌、手牌收回扇形、他那格「蓋著」、舞台一台唱盤開演 → 280 他那格翻面
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
  const FAN_DX = 0.3, FAN_ROT = 3.5, FAN_ROT_MAX = 9, FAN_ARC = 1.2;   // 扇形：每張往右錯開 3 成寬、每張轉 3.5°（最多 ±9°）、兩端往下彎一點
  const LIFT = 10, POP_GAP = 6;  // 浮起 10 px；屬性鈕在浮起那張上面 6 px
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
    pickHint: '點一張專輯', hintLabel: '提示', sleeve: '蓋著', rounds: '第 {n}／{max} 手', hp: '聲望', aceSlot: '王牌', aceWord: '王牌',
    he: '他・', you: '你・', slotE: '他丟的', slotP: '你丟的', lastPrefix: '上一手', pileLeft: '他還有 {n} 張',
    counter: '{a}剋{b}，命中！', countered: '{b}剋{a}，被剋了。',
    blockedYou: '{a}剋{b}，但他高你 2 星以上，剋不動。比星數，', blockedHim: '{b}剋{a}，但你高他 2 星以上，他剋不動。比星數，',
    mirror: '同樣是{a}，比星數，', tie: '一樣大，不扣。',
    hitE: '他 −{n}', hitP: '你 −{n}',
    bluff: '他唬你！『{key}』是{hint}，他出的是{e}。', honest: '『{key}』是{hint}，他照實出。',
    bluffNoKey: '他唬你！提示是{hint}，他出的是{e}。', honestNoKey: '提示是{hint}，他照實出。',
    koWin: '品味勝出', koWinSub: '你贏了【{name}】。', koLose: '聲望歸零',
    roundsOut: '六手打完，比聲望條', roundsScore: '你剩 {p}%，他剩 {e}%：{who}贏', roundsEven: '你剩 {p}%，他剩 {e}%：一樣，算你贏',
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
  //   l1＝唬人時 bluff；否則規則句（counter｜countered｜blockedYou｜blockedHim｜mirror）；王牌沒有「不會被剋」（FIXLIST 2）：被 ≤5 星剋＝剋不動（gap）
  //   l2＝hitE｜hitP｜tie；l3＝照實時 honest（關鍵字那句）；唬人且剋不動時放規則句（句尾「，」改「。」）；其他空
  //   D 的三個例句：l1＋l2 逐字＝「冷門剋經典，命中！他 −4」「冷門剋經典，但他高你 2 星以上，剋不動。比星數，你 −3」「他唬你！『紀念版』是經典，他出的是硬蕊。你 −4」
  function ruleText(c, T) {
    const ace = c.ace ? T('aceWord') : '';
    const a = ace + ZH[c.pAttr], a0 = ZH[c.pAttr], b = ZH[c.eAttr];
    if (c.blocked === 'gap') return T(c.by === 'e' ? 'blockedHim' : 'blockedYou', { a, b });
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
    const enemy = Object.assign({ id: eid, name: duel && duel.e && duel.e.name }, (content.enemies && content.enemies[eid]) || {});
    const lines = (content.lines && content.lines[eid]) || {};
    const hints = content.hints || null;
    const T = dtOf(content);
    const settings = () => { try { return (hooks.settings && hooks.settings()) || {}; } catch (_) { return {}; } };
    const view = () => E.view(duel);
    const S = {
      v: view(), phase: 'choose', sel: null, busy: false, destroyed: false, speed: 1,
      anims: new Set(), timers: new Set(), infoOpen: 0, held: 0, table: null, flash: null, triForce: null,
      lp: null, swallow: null, enterDone: !opts.enter, ending: false, auto: false, tagged: false, spread: false, lay: null,
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
    // 結果框的進場動畫（showCallout）在 hold 時直接跳到終點：不然教學在浮框剛出現時 hold，浮框會停在 scale .3／透明（notes-B2 請求）
    const finishCallIn = () => S.anims.forEach(a => { try { const ef = a.effect; if (ef && ef.target === els.call && a.playState !== 'finished') { const kf = ef.getKeyframes(); if (kf.length && +kf[kf.length - 1].opacity === 1) a.finish(); } } catch (_) {} });
    const resumeAnims = () => S.anims.forEach(a => { try { if (a.playState === 'paused') a.play(); } catch (_) {} });
    // 外殼開 ⏸／登場卡、教學要停在浮框上時 hold(true)，收掉 hold(false)（計數，可巢狀）：結算停在原地、盤面不收點擊
    function hold(onOff) {
      const was = S.held;
      S.held = Math.max(0, S.held + (onOff ? 1 : -1));
      if (S.held && !was) { finishCallIn(); pauseAnims(); if (S.lp) { clearTimeout(S.lp.h); S.lp = null; } root.classList.add('held'); if (hasStage('pause')) stg('pause', true); }
      else if (!S.held && was) { root.classList.remove('held'); if (!paused()) resumeAnims(); if (hasStage('pause')) stg('pause', false); }
      return S.held;
    }

    // ---------------- stage（常駐 DipLabStage；duel.js 只呼叫 API） ----------------
    function stg(m, ...a) { const s = hooks.stage; if (!s || typeof s[m] !== 'function') return null; try { return s[m](...a); } catch (e) { console.error(e); return null; } }
    const hasStage = m => !!(hooks.stage && typeof hooks.stage[m] === 'function');
    // 他說話時先收起他頭上的名牌（矮螢幕的橫條鏡頭裡泡泡會被壓到名牌上），說完再掛回去；keepOff＝說完也不掛（打完那一句）
    function say(id, text, ms, keepOff) {
      if (!text) return;
      ms = ms || 1500;
      const tagOff = id === 'f' && S.tagged;
      if (tagOff) stg('untag', 'f');
      stg('say', id, text, { ms, lift: 7 });
      if (tagOff && !keepOff) later(() => { if (S.tagged) stg('tag', 'f', enemy.name || '他', 'e', 'L'); }, ms + 80);
    }
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
        <div class="nmrow"><b class="nm" data-tut="e-name"></b>
          <div class="rec" data-tut="e-rec"><div class="pile" data-tut="e-pile"><span class="bars"></span><small></small></div></div><span class="sp"></span>
          <span class="hpn" data-tut="e-hp"><span>${esc(T('hp'))}</span><b class="num key"></b></span></div>
        <div class="hp"><i class="lost"></i><i class="fill"></i></div>
      </section>
      <section class="dl-t" data-tut="table">
        <div class="slot e" data-tut="slot-e"></div>
        <div class="slot p" data-tut="slot-p"></div>
        <div class="tcol"><div class="rounds num" data-tut="rounds"></div><div class="tri" data-tut="tri"></div></div>
        <div class="hint" data-tut="e-hint"><span class="lb">${esc(T('hintLabel'))}</span><span class="tx"></span></div>
        <div class="callout" data-tut="result" aria-live="polite"><div class="l1"></div><div class="l2"></div><div class="l3"></div></div>
        <div class="lastline" data-tut="lastline"></div>
      </section>
      <section class="dl-p" data-tut="p-hud">
        <div class="nmrow"><b>你</b><span class="relics" data-tut="relics"></span><span class="sp"></span>
          <span class="hpn" data-tut="p-hp"><span>${esc(T('hp'))}</span><b class="num key"></b></span></div>
        <div class="hp"><i class="lost"></i><i class="fill"></i></div>
        <div class="hand fan" data-tut="hand" role="group" aria-label="手牌"><div class="tiles"></div><div class="hprompt" aria-hidden="true"></div><div class="pop" data-tut="pop" role="group" aria-label="選屬性出牌" hidden></div></div>
      </section>
      <div class="dl-pop" role="status" hidden></div>
      <div class="kost" aria-hidden="true"></div>
      <div class="dl-fx" aria-hidden="true"></div>`;
    panel.innerHTML = '';
    panel.appendChild(root);
    const $ = s => root.querySelector(s);
    const els = {
      e: $('.dl-e'), enm: $('.dl-e .nm'), ehpn: $('.dl-e .hpn .num'), ehp: $('.dl-e .hp'),
      hint: $('.hint'), htx: $('.hint .tx'), rec: $('.rec'), bars: $('.pile .bars'), pileTx: $('.pile small'),
      table: $('.dl-t'), se: $('.slot.e'), sp: $('.slot.p'), tri: $('.tri'), rounds: $('.rounds'), call: $('.callout'), last: $('.lastline'),
      p: $('.dl-p'), relics: $('.relics'), phpn: $('.dl-p .hpn .num'), php: $('.dl-p .hp'),
      hand: $('.hand'), tiles: $('.hand .tiles'), hprompt: $('.hand .hprompt'), abpop: $('.hand .pop'), tcol: $('.tcol'),
      pop: $('.dl-pop'), kost: $('.kost'), fx: $('.dl-fx'),
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
      if (!opt.keepHp) setHp(els.ehp, els.ehpn, v.eHp, v.eMax, false);
      renderHint(v);
      renderRec(v);
    }
    // 打完了（v.over）：引擎不再給提示 → 留著最後一手那句、變淡（不留一個空框）
    function renderHint(v) {
      const tx = v.over ? '' : hintText(v);
      if (tx || !v.over) els.htx.textContent = tx;
      els.hint.classList.toggle('empty', !tx && !(v.over && els.htx.textContent));
      els.hint.classList.toggle('done', !!v.over);
    }
    // 他還有 N 張＝他手牌＋牌堆；丟出的那一刻（t=0）他已經把一張放上牌桌 → thrown＝1 先少一張（不等下一手的 view）
    function renderRec(v, thrown) {
      const n = Math.max(0, (v.pile | 0) + (v.eHandN | 0) - (thrown | 0)), max = Math.max(n + (thrown | 0), v.pileMax | 0);
      els.bars.innerHTML = Array.from({ length: max }, (_, k) => `<i${k < n ? '' : ' class="x"'}></i>`).join('');
      els.pileTx.textContent = T('pileLeft', { n });
    }

    // ---------------- render: 牌桌 ----------------
    // 出牌前（店主 FIXLIST 9：中間不留空帶）：他那格＝蓋著的封套＋「？」，你那格＝目前選的那張（半透明預覽＋屬性與星數），沒選才是空格。
    // 上一手的兩張不再留在牌桌（「上一手」那行只在揭曉後、換手前出現）；打完（over）照舊留著最後一手
    function preSlot(side) { return !S.busy && !(S.v && S.v.over) && (!S.table || S.table.dim); }
    function renderSlot(side) {
      const el = side === 'e' ? els.se : els.sp, Tb = S.table;
      el.removeAttribute('data-card'); el.removeAttribute('role'); el.removeAttribute('tabindex'); el.removeAttribute('aria-label');
      const who = esc(T(side === 'e' ? 'he' : 'you'));
      if (preSlot(side)) {
        if (side === 'e') {
          el.className = 'slot e pre';
          el.innerHTML = `<span class="cvw esl" data-tut="e-sleeve">${sleeveHTML('cv')}<b class="q" aria-hidden="true">?</b><span class="sl">${esc(T('sleeve'))}</span></span><div class="who">${who}<span class="z">${esc(T('sleeve'))}</span></div>`;
          return;
        }
        const v = S.v, c = S.sel && v ? cardOf(v, S.sel.i) : null;
        if (!c) { el.className = 'slot p empty'; el.innerHTML = `<span class="ph">${esc(T('slotP'))}</span>`; return; }
        const a = S.sel.attr, ace = S.sel.i === 'ace';
        el.className = 'slot p pre' + (ace ? ' ace' : '');
        el.innerHTML = `<span class="cvw">${img(c)}${ace ? `<span class="acetag">${esc(T('aceWord'))}</span>` : ''}</span><div class="who">${who}<span class="${a}">${ZH[a]} <span class="num">${starOf(c, a)}</span></span></div>`;
        return;
      }
      const d = Tb && Tb[side];
      el.className = 'slot ' + side + (Tb && Tb.dim ? ' dim' : '') + (d ? '' : ' empty') + (d && d.hidden ? ' back' : '');
      if (!d) { el.innerHTML = `<span class="ph">${esc(T(side === 'e' ? 'slotE' : 'slotP'))}</span>`; return; }
      if (d.hidden) { el.innerHTML = `<span class="cvw">${sleeveHTML('cv')}</span><div class="who">${who}<span class="z">${esc(T('sleeve'))}</span></div>`; return; }
      // 王牌：封面左上角掛「王牌」小標（跟手牌一樣），字只寫「你・經典 7」——字短才不會伸進中間的浮框
      el.innerHTML = `<span class="cvw">${img(d.card)}${d.ace ? `<span class="acetag">${esc(T('aceWord'))}</span>` : ''}</span><div class="who">${who}<span class="${d.attr}">${ZH[d.attr]} <span class="num">${d.star}</span></span></div>`;
      el.classList.toggle('ace', !!d.ace);
      if (d.card) { el.dataset.card = d.card.id; el.setAttribute('role', 'button'); el.tabIndex = 0; el.setAttribute('aria-label', (side === 'e' ? '他丟的：' : '你丟的：') + title(d.card)); }
    }
    // 相剋圖例（店主 2026-11-08：相剋圖縮小、專輯當主角）：牌桌中間一個約 64 px 的小三角，圓大一點、箭頭粗一點、不寫「剋」字（箭頭就是剋）；
    // 選了一顆星：你剋得到的那條亮綠、剋你的那條亮紅；揭曉：剋中的那條亮起
    function triSVG() {
      const P = { c: [66, 23], h: [107, 94], o: [25, 94] }, R = 21;
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
      Object.keys(STROKE).forEach(k => { s += `<marker id="dlm${k}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${STROKE[k]}"/></marker>`; });
      s += '</defs>';
      EDGES.forEach(([a, b]) => {
        const p0 = P[a], p1 = P[b], dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
        const x1 = p0[0] + ux * (R + 3), y1 = p0[1] + uy * (R + 3), x2 = p1[0] - ux * (R + 7), y2 = p1[1] - uy * (R + 7);
        const k = tone[a + b], w = k === 'f' ? 3 : (k === 'k' ? 4 : 6);
        s += `<g data-tut="tri-${a}${b}" class="eg ${k}"><line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${STROKE[k]}" stroke-width="${w}" marker-end="url(#dlm${k})"/></g>`;
      });
      ATTRS.forEach(a => {
        const p = P[a];
        s += `<circle cx="${p[0]}" cy="${p[1]}" r="${R}" fill="${col[a]}"${ring === a ? ' stroke="#111" stroke-width="5"' : ''}/>`;
        s += `<text x="${p[0]}" y="${p[1] + 8.5}" text-anchor="middle" font-size="24" font-weight="900" fill="#fff">${ZH1[a]}</text>`;
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
    // ---------------- render: 手牌（FIXLIST 11：平時疊成扇形、點一下攤開成一排；攤開後點一張＝浮起，正上方跳屬性鈕） ----------------
    // 順序：手牌 0..n−1，王牌（還沒用）放最右＝扇形最上面那張（金框）；用過的王牌不在手牌裡
    function handIds(v) {
      const ids = [];
      (v.hand || []).forEach((c, i) => { if (c) ids.push(i); });
      if (aceLive(v)) ids.push('ace');
      return ids;
    }
    function tileHTML(v, i) {
      const isAce = i === 'ace', c = cardOf(v, i); if (!c) return '';
      return `<div class="tile${isAce ? ' ace' : ''}" data-tut="${isAce ? 'hand-ace' : 'hand-' + i}" data-card="${esc(c.id)}" data-i="${i}">`
        + `<button type="button" class="cvw" data-tut="${isAce ? 'card-ace' : 'card-' + i}" data-act="pick" aria-label="${esc((isAce ? '王牌：' : '') + title(c))}（按住看唱片資訊）">${img(c)}${isAce ? `<span class="acetag">${esc(T('aceSlot'))}</span>` : ''}</button></div>`;
    }
    function renderHand(v, opt) {
      opt = opt || {};
      els.tiles.innerHTML = handIds(v).map(i => tileHTML(v, i)).join('');
      renderPop();
      layoutHand(false);
      if (opt.slideNew != null) {
        const t = els.tiles.querySelector(`.tile[data-i="${opt.slideNew}"] .cvw`);
        if (t && !rm()) A(t, [{ transform: 'translateY(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 260, easing: 'cubic-bezier(.2,.7,.3,1)' });
      }
    }
    // 浮起那張的屬性鈕：經 n／冷 n／硬 n（最高那顆大一點、黑框＝.top）；王牌只有一顆「王牌 經 7」。點了就丟
    function popHTML() {
      const v = S.v, sel = S.sel;
      if (!sel || S.busy || isOver()) return '';
      const c = cardOf(v, sel.i); if (!c) return '';
      if (sel.i === 'ace') {
        const a = aceAx(v);
        return `<button type="button" class="ab ace top ${a}" data-tut="chip-ace" data-i="ace" data-a="${a}" aria-label="${esc('王牌 ' + ZH[a] + ' ' + starOf(c, a) + ' 星：丟出')}"><span class="aw">${esc(T('aceWord'))}</span><i>${ZH1[a]}</i><b class="key">${starOf(c, a)}</b></button>`;
      }
      const top = topAttrOf(c);
      return ATTRS.map(a => `<button type="button" class="ab ${a}${a === top ? ' top' : ''}" data-tut="chip-${sel.i}-${a}" data-i="${sel.i}" data-a="${a}" aria-label="${esc(ZH[a] + ' ' + starOf(c, a) + ' 星：丟出')}"><i>${ZH1[a]}</i><b class="key">${starOf(c, a)}</b></button>`).join('');
    }
    function renderPop() {
      const h = popHTML(), c = S.sel ? cardOf(S.v, S.sel.i) : null, key = h && c ? S.sel.i + ':' + c.id : '';
      if (els.abpop.dataset.k !== key) {          // 換了一張才重畫（滑鼠換預覽的屬性不重畫，按鈕不閃）
        els.abpop.innerHTML = h; els.abpop.dataset.k = key; els.abpop.hidden = !h;
        if (h && !rm()) A(els.abpop, [{ opacity: 0, transform: 'translateY(6px) scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 140, easing: 'ease-out' });
      }
      els.abpop.querySelectorAll('.ab').forEach(b => b.classList.toggle('pv', !!(S.sel && b.dataset.a === S.sel.attr)));
      els.hprompt.textContent = S.spread && !S.sel && !S.busy && !isOver() ? T('pickHint') : '';
      els.hand.setAttribute('aria-label', S.spread ? '手牌（點一張專輯）' : '手牌（點一下攤開）');
    }
    // 扇形／一排的位置（每張絕對定位；transform＝位移＋轉角，換模式時 CSS 轉場 180 ms；減少動態＝直接換）
    function layoutHand(animate) {
      const W = els.hand.clientWidth, H = els.hand.clientHeight;
      if (!W || !H) return;
      const tiles = [...els.tiles.querySelectorAll('.tile')].filter(t => !t.classList.contains('gone'));
      const n = tiles.length, L = S.lay || {};
      els.hand.classList.toggle('fan', !S.spread); els.hand.classList.toggle('spread', !!S.spread);
      root.classList.toggle('spread', !!S.spread);
      const still = !animate || rm();
      if (still) els.hand.classList.add('noanim');
      const pos = [];
      let rowY = H;
      if (!S.spread) {
        const mid = (n - 1) / 2, arcMax = FAN_ARC * mid * mid;
        const F = Math.max(30, Math.min(L.F || 80, Math.floor((W - 8) / (1 + FAN_DX * Math.max(0, n - 1)))));
        const dx = Math.round(F * FAN_DX), tw = F + dx * Math.max(0, n - 1);
        const x0 = Math.round((W - tw) / 2), y0 = Math.round((H - F - arcMax) / 2);
        tiles.forEach((t, k) => {
          const d = k - mid;
          pos.push({ x: x0 + k * dx, y: y0 + Math.round(FAN_ARC * d * d), s: F, r: Math.max(-FAN_ROT_MAX, Math.min(FAN_ROT_MAX, d * FAN_ROT)), z: k + 1 });
        });
      } else {
        const gap = L.gap || 6, s = Math.max(36, Math.floor(Math.min(L.smax || 72, (W - (n - 1) * gap) / Math.max(1, n))));
        const tw = n * s + (n - 1) * gap, x0 = Math.round((W - tw) / 2);
        // 手牌區比「一排＋浮起＋屬性鈕」高出來的，一半放在那一排下面、一半留在屬性鈕上面（不在一邊堆出空帶）
        const extra = Math.max(0, H - (L.handMin || H)), bot = (L.bot == null ? 3 : L.bot) + Math.floor(extra / 2);
        rowY = H - s - bot;
        tiles.forEach((t, k) => {
          const i = t.dataset.i === 'ace' ? 'ace' : +t.dataset.i, up = !!(S.sel && S.sel.i === i);
          pos.push({ x: x0 + k * (s + gap), y: rowY - (up ? LIFT : 0), s, r: 0, z: up ? 40 : k + 1, up });
        });
      }
      tiles.forEach((t, k) => {
        const p = pos[k];
        t.style.width = p.s + 'px'; t.style.height = p.s + 'px';
        t.style.transform = `translate(${p.x}px,${p.y}px)` + (p.r ? ` rotate(${p.r.toFixed(2)}deg)` : '');
        t.style.zIndex = String(p.z);
        t.classList.toggle('up', !!p.up);
      });
      // 屬性鈕：浮起那張正上方（左右夾在手牌區裡；手牌區不夠高時往上蓋到「你」那一列）
      const ui = pos.findIndex(p => p.up);
      if (ui >= 0 && !els.abpop.hidden) {
        const p = pos[ui], pw = els.abpop.offsetWidth, ph = els.abpop.offsetHeight;
        els.abpop.style.left = Math.max(0, Math.min(W - pw, Math.round(p.x + p.s / 2 - pw / 2))) + 'px';
        els.abpop.style.top = Math.round(p.y - POP_GAP - ph) + 'px';
      }
      // 「點一張專輯」：虛線框，在屬性鈕會跳出來的位置（跟「你丟的」空格同一個樣子；不在那一排上面留一條空帶）
      const ph = L.popH || 50;
      els.hprompt.style.height = ph + 'px';
      els.hprompt.style.top = Math.max(0, Math.round(rowY - LIFT - POP_GAP - ph)) + 'px';
      if (still) { void els.hand.offsetWidth; if (!rm()) els.hand.classList.remove('noanim'); }
    }

    // ---------------- 尺寸：沒有捲動；依盤面可用高度換一級 ----------------
    function fit() {
      S.fitRaf = 0;
      if (S.destroyed) return;
      const H = root.clientHeight;
      root.classList.remove('roomy', 'compact', 'short', 'tighter');
      if (H > 0) {
        if (H >= 580) root.classList.add('roomy');   // 580：430×932 的橫條往上長之後盤面約 584（shops/dip.json strip.grow.panel）
        else if (H < 450) root.classList.add('short');
        else if (H < 500) root.classList.add('compact');
      }
      sizeBoard();
      if (root.scrollHeight > root.clientHeight + 1) { root.classList.add('tighter'); sizeBoard(); }
    }
    // 牌桌（兩張封面＋下面那行字＋中間字帶）與手牌區（FIXLIST 11）：
    //   手牌區至少放得下「攤開的一排（照寬度算，6 張）＋浮起＋屬性鈕」；其餘給牌桌，兩張封面照剩下的高與寬放大（空出來的高度給牌桌）；
    //   封面到上限還有多的，給手牌區（扇形大一點、上下置中）——中間不留空帶（FIXLIST 9）。
    //   兩張封面中間只留 --gap（相剋圖例與「第 n／6 手」搬到中間字帶的左邊）。
    //   [上緣 --tp, 字高 --lab, 中間字帶高, 封面最小, 封面最大, 屬性鈕高]（上緣、字高跟 duel.css 的 .dl-t 一致）
    const BOARD = { short: [4, 17, 66, 84, 176, 46], compact: [6, 19, 72, 96, 176, 48], base: [6, 19, 74, 100, 176, 50], roomy: [12, 20, 80, 110, 188, 52] };
    const SPREAD_MAX = 76, PAIR_GAP = 10, TX = 12;
    function sizeBoard() {
      const k = ['short', 'compact', 'roomy'].find(c => root.classList.contains(c)) || 'base';
      const [tp, lab, band, mn, mx, popH] = BOARD[k];
      const total = root.clientHeight, W = root.clientWidth;
      if (!total || !W) return;
      // 你的一塊除了手牌區以外的高（上框線＋名字列＋聲望條＋留白；.dl-p 是 flex:1，不能用它自己的高去減）
      const eH = els.e.offsetHeight, pFixed = 1 + els.hand.offsetTop + (parseFloat(getComputedStyle(els.p).paddingBottom) || 0);
      const hw = els.hand.clientWidth || (W - 2 * TX), n = ((E.CFG && E.CFG.handSize) || 5) + 1;   // 一排照最多 6 張（手牌＋王牌）算，換手時不跳
      const gap = hw < 350 ? 5 : 6, s = Math.max(36, Math.floor(Math.min(SPREAD_MAX, (hw - (n - 1) * gap) / n)));
      const handMin = s + LIFT + POP_GAP + popH + 3 + 2;
      const fixedT = tp + lab + 6 + band + 6;
      const byW = Math.floor((W - 2 * TX - PAIR_GAP) / 2);
      const scv = Math.round(Math.max(mn, Math.min(mx, byW, total - eH - pFixed - handMin - fixedT - 1)));
      const tableH = fixedT + scv;
      const handH = Math.max(handMin, total - eH - pFixed - tableH - 1);
      els.table.style.height = tableH + 'px';
      els.hand.style.height = handH + 'px';
      root.style.setProperty('--scv', scv + 'px');
      root.style.setProperty('--band-h', band + 'px');
      // 扇形：手牌區放得下的最大（轉角讓上下多出一點），不超過牌桌封面的 6 成多、118 px（牌桌那兩張才是主角）
      const mid = (n - 1) / 2, arcMax = FAN_ARC * mid * mid;
      const F = Math.max(s, Math.min(Math.round(scv * 0.64), 118, Math.floor((handH - 8 - arcMax) / 1.15), Math.floor((hw - 8) / (1 + FAN_DX * (n - 1)))));
      S.lay = { F, smax: SPREAD_MAX, gap, bot: 3, handH, handMin, scv, popH };
      layoutHand(false);
    }
    function scheduleFit() { if (!S.fitRaf) { fit(); S.fitRaf = requestAnimationFrame(() => { S.fitRaf = 0; fit(); }); } }
    try { S.ro = new ResizeObserver(() => scheduleFit()); S.ro.observe(root); } catch (_) {}
    try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => scheduleFit()); } catch (_) {}

    // ---------------- input（FIXLIST 11＝原版：點疊著的手牌＝攤開；點一張＝浮起＋跳屬性鈕；點屬性鈕＝照那個屬性丟出；點外面＝收回） ----------------
    function bumpEl(el) { if (el && !rm()) A(el, [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 300 }); }
    const isOver = () => !!(S.v && S.v.over) || S.ending;
    const canAct = () => !S.busy && S.enterDone && !isOver() && !S.held;
    function setSpread(on, animate) {
      on = !!on;
      if (S.spread === on) return;
      S.spread = on;
      if (!on && S.sel) { S.sel = null; renderTri(); renderSlot('p'); holdSleeve('p', null); emit('selected', null); }
      renderPop(); layoutHand(animate !== false);
      emit('spread', on);
    }
    function spreadHand() {
      if (!canAct()) return false;
      if (S.spread) return true;
      if (!gate({ kind: 'spread' })) return false;
      sfx('tick');
      setSpread(true);
      return true;
    }
    function collapseHand(user) {
      if (!S.spread) return true;
      if (user && (!canAct() || !gate({ kind: 'collapse' }))) return false;
      setSpread(false);
      return true;
    }
    function applySel(sel, c) {
      const changedCard = !S.sel || S.sel.i !== sel.i;
      S.sel = sel;
      if (changedCard) sfx('select');
      renderPop(); layoutHand(true); renderTri(); renderSlot('p');
      if (changedCard) holdSleeve('p', c, sel.i === 'ace');
      emit('selected', { i: sel.i, attr: sel.attr });
      return true;
    }
    function clearSel() {
      if (!S.sel) return true;
      S.sel = null; renderPop(); layoutHand(true); renderTri(); renderSlot('p'); holdSleeve('p', null); emit('selected', null); return true;
    }
    // 攤開後點封面：浮起這張，預覽的屬性＝topAttr（王牌＝它那軸）；已浮起的再點不變。api＝select(i)：沒攤開就直接攤開
    function liftCard(i, api) {
      if (!canAct()) return false;
      const v = S.v, c = cardOf(v, i); if (!c) return false;
      if (i === 'ace' && !aceLive(v)) return false;
      if (S.sel && S.sel.i === i) { if (!S.spread) setSpread(true, false); return true; }
      const attr = i === 'ace' ? aceAx(v) : topAttrOf(c), sel = { i, attr };
      if (!legal(sel)) return false;
      if (!gate({ kind: 'card', i, attr, id: c.id })) return false;
      if (!S.spread) { S.spread = true; emit('spread', true); }
      return applySel(sel, c);
    }
    // API select(i, attr)：浮起這張、預覽那個屬性（不出手；e2e／harness 用）
    function previewAttr(i, attr) {
      if (!canAct()) return false;
      if (i === null) return clearSel();
      const v = S.v, c = cardOf(v, i); if (!c) return false;
      if (i === 'ace') { if (!aceLive(v)) return false; attr = aceAx(v); }
      if (!ATTRS.includes(attr)) return false;
      if (S.sel && S.sel.i === i && S.sel.attr === attr) return true;
      const sel = { i, attr };
      if (!legal(sel)) return false;
      if (!gate({ kind: 'chip', i, attr, id: c.id })) return false;
      if (!S.spread) { S.spread = true; emit('spread', true); }
      return applySel(sel, c);
    }
    // 點屬性鈕＝照那個屬性丟出（原版：點牌 → 選屬性＝出招；沒有「丟！」）
    function throwAttr(i, attr, btn) {
      if (!canAct()) return false;
      const v = S.v, c = cardOf(v, i); if (!c) return false;
      if (i === 'ace') attr = aceAx(v);
      const sel = { i, attr };
      if (!legal(sel)) { bumpEl(btn); return false; }
      if (!gate({ kind: 'throw', i, attr, id: c.id })) { bumpEl(btn); return false; }
      if (btn && !rm()) A(btn, [{ transform: 'scale(1)' }, { transform: 'scale(.92)' }, { transform: 'scale(1)' }], { duration: 90 });
      S.sel = sel;
      play(actOf(sel), sel);
      return true;
    }
    function abTap(btn) {
      const i = btn.dataset.i === 'ace' ? 'ace' : +btn.dataset.i;
      if (!canAct() || !S.sel || S.sel.i !== i) return;
      throwAttr(i, btn.dataset.a, btn);
    }
    function handTap(t) {
      if (!canAct()) return;
      if (!S.spread) { if (!spreadHand()) bumpEl(els.tiles); return; }
      const cv = t.closest('.cvw[data-act="pick"]');
      if (cv) {
        const tl = cv.closest('.tile'), i = tl.dataset.i === 'ace' ? 'ace' : +tl.dataset.i;
        if (!liftCard(i)) bumpEl(cv);
        return;
      }
      collapseHand(true);                            // 攤開時點到牌與牌之間：收回
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
    // 唱片資訊：手牌封面長按（扇形、攤開都可以）；牌桌上兩張（揭曉後）點一下；他蓋著的封套不給看
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
      if ((x = t.closest('.ab'))) { abTap(x); return; }
      if (t.closest('.hand')) { handTap(t); return; }
      if (S.spread) collapseHand(true);              // 點手牌外面：收回扇形
    }
    // 盤面外面（舞台、頂欄）也算「手牌外面」；唱片資訊、教學遮罩、面板上的點擊不算
    function onDocClick(ev) {
      if (!S.spread || S.destroyed || S.infoOpen) return;
      const t = ev.target;
      if (!t || !t.closest || root.contains(t) || t.closest('#cardInfoMask, #tut, #tutTip, .lb-modal')) return;
      collapseHand(true);
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
        if (ok) S.swallow = { el: t, until: performance.now() + 900 };   // 放開手指的那一下 click 不再攤開／浮起／再開一次
      }, LONG_MS);
    }
    function onMove(ev) { const lp = S.lp; if (lp && (Math.abs(ev.clientX - lp.x) > 10 || Math.abs(ev.clientY - lp.y) > 10)) { clearTimeout(lp.h); S.lp = null; } }
    function onUp() { const lp = S.lp; if (lp) { clearTimeout(lp.h); S.lp = null; } }
    // 滑鼠移到屬性鈕上＝「你丟的」那格預覽那個屬性（觸控沒有 hover：預覽一直是最高那顆）
    function onOver(ev) {
      if (ev.pointerType !== 'mouse' || !S.sel || S.sel.i === 'ace' || !canAct()) return;
      const b = ev.target.closest && ev.target.closest('.ab'); if (!b) return;
      const a = b.dataset.a; if (!ATTRS.includes(a) || S.sel.attr === a) return;
      S.sel = { i: S.sel.i, attr: a };
      renderPop(); renderTri(); renderSlot('p');
      emit('selected', { i: S.sel.i, attr: a });
    }
    root.addEventListener('click', onClick);
    document.addEventListener('click', onDocClick);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerup', onUp);
    root.addEventListener('pointercancel', onUp);
    root.addEventListener('pointerover', onOver);
    root.addEventListener('contextmenu', ev => { if (ev.target.closest('.tile,.slot,.ab,.sleeve')) ev.preventDefault(); });
    root.addEventListener('keydown', ev => {
      if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.classList && ev.target.classList.contains('slot')) { ev.preventDefault(); ev.target.click(); }
      if (ev.key === 'Escape' && S.spread) { ev.preventDefault(); collapseHand(true); }
    });
    function renderAll(opt) {
      const v = S.v;
      renderE(v, opt); renderTable(v); renderP(v, opt); renderHand(v);
      scheduleFit();
    }

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
      else A(c, [{ transform: 'scale(.3)', opacity: 0 }, { transform: 'scale(1.06)', opacity: 1, offset: .6 }, { transform: 'scale(1)', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.18,.9,.32,1.25)', fill: 'both' });
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
      if (cl.ace) hint('tip_ace', ['result']);          // 第一次丟王牌（FIXLIST 2；hint 一場只送一次）
      if (cl.pAttr === cl.eAttr) hint('tip_mirror', ['result']);
    }
    async function play(act, sel) {
      if (!canAct() || !legal(sel)) return false;
      S.busy = true; S.rush = false; S.playAt = performance.now();
      const v0 = S.v;
      const tileEl = els.tiles.querySelector(`.tile[data-i="${sel.i}"]`);
      const srcP = rectOf(tileEl && tileEl.querySelector('.cv'));
      const srcE = rectOf(els.se.querySelector('.sleeve-bk'));
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
      const wasSpread = S.spread;
      S.spread = false;                                  // 丟出去：手牌收回扇形（下一手從扇形開始）
      setPhase('resolve');
      root.classList.add('busy');
      emit('selected', null);
      if (wasSpread) emit('spread', false);
      // ---- t=0：你的牌飛上牌桌、手牌收回扇形；他那格「蓋著」；舞台一台唱盤開演
      S.lastCt = null; S.flash = null;
      S.table = { e: { card: cl.eCard, attr: cl.eAttr, star: cl.eStar, ace: !!cl.eAce, hidden: true }, p: { card: cl.pCard, attr: cl.pAttr, star: cl.pStar, ace: !!cl.ace }, dim: false };
      renderTable(v0);
      if (tileEl) tileEl.classList.add('gone');
      renderPop(); layoutHand(true);
      renderRec(v0, 1);
      fly(els.sp.querySelector('.cv'), srcP, 260); fadeIn(els.sp.querySelector('.who'), 260);
      fly(els.se.querySelector('.cv'), srcE, 260);
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
      root.classList.add('revealed');          // 中間字帶：提示句收起、換成結果句（之後是「上一手」那行），下一手才換回提示（FIXLIST 9）
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
      if (!rm()) A(els.last, [{ opacity: 0 }, { opacity: 0, offset: .5 }, { opacity: 1 }], { duration: 420 });   // 結果框淡完才出「上一手」，不疊字（R-05a）
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
      root.classList.remove('busy', 'revealed');
      S.busy = false;
      renderE(v1); renderTable(v1); renderP(v1); renderHand(v1, { slideNew: dr && dr.card ? dr.i : null });
      scheduleFit();
      // 提示從半透明開始：中間字帶不會只剩「提示」兩個字（R-05b）
      if (!rm()) { A(els.htx, [{ opacity: .45, transform: 'translateY(-3px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'ease-out' }); A(els.rounds, [{ opacity: .2 }, { opacity: 1 }], { duration: 320 }); }
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
    // 六手打完／他牌出完的副標（FIXLIST 3：比聲望條剩幾成）。% 用引擎 over 事件的 pct（＝E.pctPair：整數一樣但勝負不同時改一位小數），
    //   不自己四捨五入；兩邊比例真的一樣（一樣算你贏）用 roundsEven
    function roundsVars(over, v, win) {
      let pct = over && over.pct;
      if (!pct && typeof E.pctPair === 'function') pct = E.pctPair(v.pHp, v.pMax, v.eHp, v.eMax);
      pct = pct || { p: String(Math.max(0, v.pHp)), e: String(Math.max(0, v.eHp)) };
      const even = win && typeof E.playerAhead === 'function' && v.pMax > 0 && v.eMax > 0 && v.pHp * v.eMax === v.eHp * v.pMax;
      return { p: pct.p, e: pct.e, who: win ? '你' : '他', even };
    }
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
      renderPop(); renderHint(v1); renderRec(v1);
      if (result.by === 'hp') stg('pose', win ? 'f' : 'p', 'ko', 700);
      sfx('ko');
      // 打完他說一句（只說一次，COPY-02）：序章男子的 E2／E3、藏家輸了的 C1 由接下來的對白講，盤面不冒泡泡；其他人在這裡說，挑唱片／說情畫面不再重複
      if (!enemy.prologue && !(win && enemy.boss)) say('f', pickLine(win ? ['lose'] : ['win']), 1800, true);
      later(() => sfx(win ? 'win' : 'lose'), 300);
      winnerSong(win, cl);
      let tx = null;
      if (typeof hooks.endText === 'function') try { tx = hooks.endText(result); } catch (e) { console.error(e); }
      if (!tx) {
        const nm = enemy.name || '';
        if (result.by === 'rounds' || result.by === 'pile') { const rv = roundsVars(over, v1, win); tx = { title: T('roundsOut'), sub: T(rv.even ? 'roundsEven' : 'roundsScore', rv), cls: win ? 'ink' : 'red' }; }
        else if (win) tx = { title: T('koWin'), sub: nm ? T('koWinSub', { name: nm }) : '', cls: 'ink' };
        else tx = { title: T('koLose'), sub: '', cls: 'red' };      // 老闆說情由接下來的對白講（COPY-07：大章不再寫「老闆：……再一場。」）
      }
      if (els.call.classList.contains('on')) await wait(220);      // 結果框淡完再蓋大章（R-05c：大章被結果框蓋住半秒）
      if (S.destroyed) return;
      bigStamp(tx.title, tx.cls || (win ? 'ink' : 'red'), tx.sub);
      onEvent(over);
      S.v = v1;
      emit('over', result);
      await wait(result.by === 'rounds' || result.by === 'pile' ? 3000 : 1500);   // 比聲望條的大章有兩行要看：至少 3 秒（R-05c）
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
      if (fresh && open1 && !tut && !enemy.prologue) say('f', Array.isArray(open1) ? open1[0] : open1, 1800);   // 序章男子沒有口頭禪（D §2、COPY-01）
      renderPop();
      handStart(S.v);
      setPhase('choose');
    }

    // ---------------- autoplay（e2e 用；走正常的點擊流程與 gate：攤開 → 點那張 → 點那個屬性） ----------------
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
        if (!S.spread) { if (!spreadHand()) { await wait(80); continue; } await wait(120); }
        if (!(S.sel && S.sel.i === sel.i) && !liftCard(sel.i)) { await wait(80); continue; }
        await wait(100);
        if (!canAct() || !S.sel || S.sel.i !== sel.i) continue;
        throwAttr(sel.i, sel.attr, els.abpop.querySelector(`.ab[data-a="${sel.attr}"]`) || els.abpop.querySelector('.ab'));
        await wait(60);
      }
      return true;
    }

    function destroy() {
      S.destroyed = true;
      document.removeEventListener('click', onDocClick);
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
      if (name.startsWith('card:blocked:')) {
        let b = null;
        try { b = E.blockedChoice(duel, name.slice(13)); } catch (_) { b = null; }
        return coverEl(b);
      }
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
      if (name.startsWith('card:')) return els.tiles.querySelector(`.tile[data-card="${cssEsc(name.slice(5))}"]`);
      return byTut(name);
    }
    const txt = el => el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
    function snapUI() {
      const slot = el => ({ who: txt(el.querySelector('.who')), card: el.dataset.card || null, dim: el.classList.contains('dim'), back: el.classList.contains('back') });
      return {
        call: { l1: txt(els.call.querySelector('.l1')), l2: txt(els.call.querySelector('.l2 .v')), l3: txt(els.call.querySelector('.l3')), notes: txt(els.call.querySelector('.l2 .nt')), on: els.call.classList.contains('on') },
        slotE: slot(els.se), slotP: slot(els.sp), lastline: txt(els.last), hint: txt(els.htx), rounds: txt(els.rounds),
        eHp: txt(els.ehpn), pHp: txt(els.phpn), pile: txt(els.pileTx), spread: !!S.spread, pop: txt(els.abpop),
      };
    }
    const api = {
      el: root,
      elByName,
      view: () => S.v,
      duel: () => duel,
      busy: () => S.busy,
      phase: () => S.phase,
      // select(i)＝浮起那張（沒攤開就直接攤開；預覽屬性＝topAttr）；select(i, attr)＝浮起並預覽那個屬性（不出手）；select(null)＝放下
      select: (i, attr) => {
        if (i == null) return clearSel();
        if (attr == null) return liftCard(i, true);
        return previewAttr(i, attr);
      },
      // preview(attr)＝浮起那張的預覽換成這個屬性（不經 gate、不出手；教學點屬性那步用：「你丟的」跟手指指的那顆一致）
      preview: attr => {
        if (!S.sel || S.sel.i === 'ace' || !ATTRS.includes(attr) || !canAct() || S.sel.attr === attr) return !!(S.sel && S.sel.attr === attr);
        S.sel = { i: S.sel.i, attr }; renderPop(); renderTri(); renderSlot('p'); emit('selected', { i: S.sel.i, attr });
        return true;
      },
      // spread(true)＝攤開（不經 gate）；spread(false)＝收回扇形
      spread: on => { if (on === false) return collapseHand(false); if (!canAct()) return false; setSpread(true); return true; },
      // play(act)＝直接照這個屬性丟出（gate 只看 'throw'）
      play: act => {
        if (!act || !canAct()) return Promise.resolve(false);
        const sel = act.ace ? { i: 'ace', attr: aceAx(S.v) } : { i: act.i, attr: act.attr };
        const c = cardOf(S.v, sel.i);
        if (!c || !legal(sel) || !gate({ kind: 'throw', i: sel.i, attr: sel.attr, id: c.id })) return Promise.resolve(false);
        S.sel = sel;
        return play(actOf(sel), sel);
      },
      hold: onOff => hold(onOff !== false),
      held: () => S.held,
      tri: lit => { S.triForce = lit == null ? null : [].concat(lit); renderTri(); },
      autoplay: p => autoplay(p),
      stopAuto: () => { S.auto = false; },
      rerender: () => { if (S.destroyed || S.busy) return; S.v = view(); S.speed = baseSpeed(); setSpeed(S.speed); renderAll(); },
      debug: () => ({
        phase: S.phase, n: S.v.n, view: S.v, sel: S.sel, spread: S.spread, lay: S.lay, busy: S.busy, held: S.held, speed: S.speed, enterDone: S.enterDone, rush: S.rush,
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
    spread: on => (CUR ? CUR.api.spread(on) : false),
    preview: attr => (CUR ? CUR.api.preview(attr) : false),
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
