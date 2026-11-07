// game-lab/duel.js — 品味對決 v2：店內舞台下方的極簡雙方盤面（Agent D；SPEC-v2 §3、§7.1、B04 B08 B09 O6）
//
// ── v2 contract (SPEC-v2 §3.3/§3.8) — names are final; tutorial.js targets them ─────────────────────────────
// data-tut: e-hud e-hp e-qi e-quirk e-rec e-stars e-shout e-intent | table slot-e slot-p stake tri | result |
//           p-hud p-hp p-qi request chain ult | hand hand-ace hand-0..hand-3 | attrs attr-c attr-o attr-h attr-ace ult-confirm
// DipLabDuel.el(name) -> Element|null   ('@f'|'@p'|'@o' -> hooks.stage.anchor(id); 'card:<id>' -> that hand tile)
// DipLabDuel.on(evt, cb) -> off   evt: 'phase'(phase) 'selected'(i|'ace'|null) 'resolved'(events) 'over'(result) 'info'(where) 'infoClosed'(where)
//
// DipLabDuel.mount(panelEl, { duel, events, run, content, onEnd(result), onSave(duel), enter,
//   hooks: { stage, cardInfo(card,{attr,from}), hint(id,targets), pause(), help(), settings(), onEvent(ev,duel), player,
//            previews() -> bool, tut, beforeEnd(result) -> Promise } })
// DipLabDuel.unmount(); rerender(); el(name); on(evt,cb); select(i|'ace'|null); play(act); sheet('temper'|'calc'|null); debug()
//
// 規則：畫面上每個數字都來自 view()／forecast()／legalActions()／resolveTurn() 的事件；UI 不算傷害、不讀 intent.cellIdx。
// 出牌前一定問 hooks.tut.gate(action)；結算一律 resolveTurn(duel, act, tut ? { forcedCell: tut.forcedCell() } : undefined)。
// gate action: {kind:'card',i,id} {kind:'ace'} {kind:'attr',attr,i?,id?,ace?} {kind:'ult'} {kind:'ultConfirm'} {kind:'info',where} {kind:'close'}
// ?fast=1 → 動畫 4 倍速；結算中點畫面任一處 → 這手 4 倍速；?debug=1 → window.__dl。
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  const BASE = (function () {
    try { const s = document.currentScript && document.currentScript.src; if (s) return new URL('.', s).href; } catch (_) {}
    try { return new URL('.', location.href).href; } catch (_) { return ''; }
  })();
  const ZH = { c: '經典', o: '冷門', h: '硬蕊' }, ZH1 = { c: '經', o: '冷', h: '硬' }, ATTRS = ['c', 'o', 'h'];
  const GL = { true: '真', feint: '晃', copy: '跟', grudge: '報', eye: '盯', hidden: '？' };
  const BEATS = { o: 'c', h: 'o', c: 'h' };          // x 剋 BEATS[x]
  const NEXT = { c: 'o', o: 'h', h: 'c' };
  const TIER_AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };
  const CELL_TAG = { true: '照喊的出', feint: '晃！', copy: '跟你上一手', grudge: '記仇', eye: '盯你最大張' };
  const LONG_MS = 450;
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
  const aceAxis = c => c ? (TIER_AXIS[c.tier] || ATTRS.reduce((b, a) => ((c[a] | 0) > (c[b] | 0) ? a : b), 'c')) : 'c';
  function starsHTML(card, plus) {
    plus = plus || 0;
    return '<span class="stars">' + ATTRS.map(a => `<b class="${a}"><i>${ZH1[a]}</i>${(card[a] | 0)}${plus ? `<small>+${plus}</small>` : ''}</b>`).join('') + '</span>';
  }

  // ------------------------------------------------------------------ pure formatters (no rules; only regroup engine output)
  // 他會出：intent.slices 加總（attr 已由引擎代入跟／報／盯）
  function intentLine(it) {
    const n = { c: 0, o: 0, h: 0, q: 0 }, order = ['c', 'o', 'h', 'q'];
    it.slices.forEach(s => n[s.attr || 'q']++);
    const idx = order.flatMap(a => it.slices.filter(s => (s.attr || 'q') === a).map(s => s.i));     // 色條照 經→冷→硬→？ 排；值＝slice 序號
    const cells = idx.map(i => it.slices[i].attr || 'q');
    const tot = it.slices.length;
    const parts = order.filter(a => n[a]).sort((a, b) => n[b] - n[a] || order.indexOf(a) - order.indexOf(b))
      .map(a => ({ a, n: n[a], text: (a === 'q' ? '？' : ZH1[a]) + ' ' + n[a] + '/' + tot }));
    return { n, cells, idx, parts, tot, text: parts.map(p => p.text).join('・') };
  }
  function outcomeText(o) {
    if (!o) return { cls: 'z', text: '不知道' };
    if (o.toE > 0 && o.toP > 0) return { cls: 'r', text: `他扣 ${o.toE}・你扣 ${o.toP}` };
    if (o.toE > 0) return { cls: 'g', text: '他扣 ' + o.toE };
    if (o.toP > 0) return { cls: 'r', text: '你扣 ' + o.toP };
    if (o.kind === 'tie') return { cls: 'z', text: '平手' };
    if (o.kind === 'block') return { cls: 'z', text: '全擋下' };
    return { cls: 'z', text: '互不傷害' };
  }
  function ultLine(o) {
    const t = outcomeText(o);
    const name = { reflect: '七星回擊', block: '割捨防禦', eultHit: '吃下', trade: '對轟', ult: '品味輾壓' }[o && o.kind] || '';
    return { name, cls: t.cls, text: t.text };
  }
  // 預覽：forecast 依「結果」分組，最多兩行，格數多的在上
  function previewLines(duel, act) {
    const E = Eng(), f = E.forecast(duel, act);
    if (!f) return { lines: [], more: 0 };
    if (f.ult) { const u = ultLine(f.outcome); return { ult: true, outcome: f.outcome, lines: [{ frac: '', name: u.name, cls: u.cls, text: u.text }], more: 0 }; }
    const g = new Map();
    for (const s of f.slices) {
      const k = s.outcome ? `${s.outcome.toE}|${s.outcome.toP}|${s.outcome.kind}` : '?';
      const e = g.get(k) || { n: 0, o: s.outcome };
      e.n++; g.set(k, e);
    }
    const arr = [...g].sort((a, b) => b[1].n - a[1].n);
    const tot = f.slices.length;
    const lines = arr.slice(0, 2).map(([k, e]) => Object.assign({ frac: e.n + '/' + tot }, k === '?' ? { cls: 'z', text: '不知道' } : outcomeText(e.o)));
    return { lines, more: Math.max(0, arr.length - 2), slices: f.slices };
  }
  // 結果：浮框＋結果一行（主詞一定先寫）
  function clashText(c) {
    const sub = (k) => { const t = (c.breakdown || []).find(x => x.k === k); return t ? Math.abs(t.v) : null; };
    const G = n => `<span class="g">他扣 ${n}</span>`, R = n => `<span class="r">你扣 ${n}</span>`;
    const CG = n => `<span class="g">他 −${n}</span>`, CR = n => `<span class="r">你 −${n}</span>`;
    let st = null, gold = false, l1 = '', l2 = '', l3 = '', line = '', plain = '';
    switch (c.kind) {
      case 'counter': st = c.stamp === 'seeThrough' ? '看穿' : '讀中'; gold = c.stamp === 'seeThrough';
        l1 = '你・' + c.counterName; l2 = CG(c.toE); line = `你・${esc(c.counterName)} ${G(c.toE)}`; plain = `你・${c.counterName} 他扣 ${c.toE}`; break;
      case 'countered': st = c.stamp === 'feintHit' ? '虛晃' : null;
        l1 = '他・' + c.counterName; l2 = CR(c.toP); line = `他・${esc(c.counterName)} ${R(c.toP)}`; plain = `他・${c.counterName} 你扣 ${c.toP}`; break;
      case 'mirrorWin': st = '撞招'; l1 = `你的${ZH[c.pAttr]} ${sub('mirrorP')} 大`; l2 = CG(c.toE); line = `你大 ${G(c.toE)}`; plain = `你大 他扣 ${c.toE}`; break;
      case 'mirrorLose': st = c.glyph === 'feint' ? '虛晃' : '撞招'; l1 = `他的${ZH[c.eAttr]} ${sub('mirrorE')} 大`; l2 = CR(c.toP); line = `他大 ${R(c.toP)}`; plain = `他大 你扣 ${c.toP}`; break;
      case 'tie': st = '撞招'; l1 = `${ZH[c.pAttr]} ${sub('mirrorP')} 對 ${sub('mirrorE')}`; l2 = '<span class="z">平手</span>'; line = '平手'; plain = '平手'; break;
      case 'hegemonyE': case 'hegemonyP': st = '霸權'; l1 = '王牌被剋'; l2 = '<span class="z">互不傷害</span>'; line = '互不傷害'; plain = '互不傷害'; break;
      case 'ult': l1 = '你・品味輾壓'; l2 = CG(c.toE); l3 = '他這手作廢'; line = `你・品味輾壓 ${G(c.toE)}`; plain = `你・品味輾壓 他扣 ${c.toE}`; break;
      case 'eultHit': l1 = '他・品味輾壓'; l2 = CR(c.toP); line = `他・品味輾壓 ${R(c.toP)}`; plain = `他・品味輾壓 你扣 ${c.toP}`; break;
      case 'block': l1 = '你・割捨防禦'; l2 = c.toP ? CR(c.toP) : '<span class="z">全擋下</span>';
        line = `你・割捨防禦 ${c.toP ? R(c.toP) : '<span class="z">全擋下</span>'}`; plain = `你・割捨防禦 ${c.toP ? '你扣 ' + c.toP : '全擋下'}`; break;
      case 'reflect': st = '七星回擊'; gold = true; l1 = '你・王牌'; l2 = CG(c.toE); line = `你・王牌 ${G(c.toE)}`; plain = `你・王牌 他扣 ${c.toE}`; break;
      case 'trade': st = '對轟'; l1 = '雙方品味輾壓'; l2 = `${CG(c.toE)} ${CR(c.toP)}`; line = `${G(c.toE)}・${R(c.toP)}`; plain = `他扣 ${c.toE}・你扣 ${c.toP}`; break;
    }
    return { st, gold, l1, l2, l3, line, plain };
  }
  function badgesOf(c) {
    if (c.toE > c.toP) return { e: '負', p: '勝' };
    if (c.toP > c.toE) return { e: '勝', p: '負' };
    return { e: '平', p: '平' };
  }

  // 算式（原 v1 banner 的組字；只用 clash.breakdown）
  const sgnTerm = t => (t.v >= 0 ? '＋' : '－') + t.label + ' ' + Math.abs(t.v);
  const MAIN_K = ['atk', 'K', 'def', 'mirrorP', 'mirrorE', 'ult', 'eult', 'block', 'reflect'];
  function termStr(label, t) {
    if (!t) return { s: '', multi: false };
    const v = Math.abs(t.v);
    if (t.note === '點播+2') return { s: `${label} ${v - 2}＋點播 2`, multi: true };
    const m = t.note && /^\+(\d+)星$/.exec(t.note);
    if (m) return { s: `${label} ${v - +m[1]}＋${m[1]}星`, multi: true };
    return { s: `${label} ${v}`, multi: false };
  }
  const minus = o => (o.multi ? `（${o.s}）` : o.s);
  function formula(c) {
    const bd = c.breakdown || [], by = k => bd.find(t => t.k === k), extras = bd.filter(t => !MAIN_K.includes(t.k)).map(sgnTerm).join('');
    switch (c.kind) {
      case 'counter': case 'countered': {
        const atk = by('atk'), K = by('K'), def = by('def'), N = c.kind === 'counter' ? c.toE : c.toP;
        if (def && def.note === '擋住星差') return `${termStr(atk ? atk.label : '', atk).s}，${def.label} ${def.star} 擋住星差；剩賭注 ${K ? K.v : c.K}${extras}＝${N}`;
        return `${termStr(atk ? atk.label : '', atk).s}－${minus(termStr(def ? def.label : '', def))}＋賭注 ${K ? K.v : c.K}${extras}＝${N}`;
      }
      case 'mirrorWin': return `${termStr('你的' + ZH[c.pAttr], by('mirrorP')).s}－${minus(termStr('他的' + ZH[c.eAttr], by('mirrorE')))}${extras}＝${c.toE}`;
      case 'mirrorLose': return `${termStr('他的' + ZH[c.eAttr], by('mirrorE')).s}－${minus(termStr('你的' + ZH[c.pAttr], by('mirrorP')))}${extras}＝${c.toP}`;
      case 'tie': { const p = by('mirrorP'), e = by('mirrorE'); return `你的${ZH[c.pAttr]} ${p ? Math.abs(p.v) : ''} 對 他的${ZH[c.eAttr]} ${e ? Math.abs(e.v) : ''}：平手，雙方氣勢 +1`; }
      case 'hegemonyE': case 'hegemonyP': return '王牌被剋：這手互不傷害';
      case 'ult': { const u = by('ult'); return `品味輾壓＝氣勢 ${u ? u.v : c.toE}${extras}＝${c.toE}，他這手作廢`; }
      case 'trade': { const u = by('ult'), eu = by('eult'), m = by('matrix'); return `你的品味輾壓 ${u ? u.v : ''}${m ? sgnTerm(m) : ''} 對 他的品味輾壓 ${eu ? eu.v : ''}：他扣 ${c.toE}，你扣 ${c.toP}`; }
      case 'reflect': { const K = by('K'); return `七星回擊＝7＋賭注 ${K ? K.v : c.K}＝${c.toE}，他的氣勢歸零`; }
      case 'block': { const b = by('block'), eu = by('eult'), iso = by('isolation'); return `他的品味輾壓 ${eu ? eu.v : ''}－${ZH[c.pAttr]} ${b ? b.star : ''} 擋下${iso ? sgnTerm(iso) : ''}＝${c.toP}`; }
      case 'eultHit': { const eu = by('eult'); return `他的品味輾壓・${ZH[c.eAttr] || ''} ${eu ? eu.v : c.toP}，你這手沒剋到它＝${c.toP}`; }
    }
    return '';
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
    const enemy = (content.enemies && content.enemies[duel.e.id]) || { id: duel.e.id, name: duel.e.name };
    const lines = (content.lines && content.lines[duel.e.id]) || {};
    const settings = () => { try { return (hooks.settings && hooks.settings()) || {}; } catch (_) { return {}; } };
    const S = {
      v: E.view(duel), phase: 'choose', sel: null, ultArmed: false, busy: false, destroyed: false, speed: 1,
      anims: new Set(), timers: new Set(), infoOpen: 0, table: null, res: null, hist: [], recNext: false,
      lastLine: {}, chainShown: false, sheet: null, lp: null, enterDone: !opts.enter, ending: false, auto: false,
      tagged: false, rush: false, fitRaf: 0, ro: null, celltag: null, debug: { log: [], hands: [] },
    };
    const baseSpeed = () => FAST ? 4 : (settings().fastAnim ? 2 : 1);
    S.speed = baseSpeed();
    const rm = () => { const f = Fx(); try { return f && f.reducedMotion ? f.reducedMotion() : rmq(); } catch (_) { return rmq(); } };
    const log = s => { S.debug.log.push(s); if (S.debug.log.length > 400) S.debug.log.shift(); };

    // ---------------- timing (speed- and info-aware) ----------------
    function wait(ms) {
      return new Promise(res => {
        if (S.destroyed) return res();
        let left = ms, last = performance.now(), h;
        const tick = () => {
          S.timers.delete(h);
          if (S.destroyed) return res();
          const now = performance.now();
          if (!S.infoOpen) left -= (now - last) * S.speed;
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
      try { a.playbackRate = S.speed; if (S.infoOpen) a.pause(); } catch (_) {}
      S.anims.add(a);
      const done = () => S.anims.delete(a); a.finished.then(done, done);
      return a;
    }
    function setSpeed(s) { S.speed = s; S.anims.forEach(a => { try { a.playbackRate = s; } catch (_) {} }); const f = Fx(); if (f && f.setSpeed) try { f.setSpeed(s); } catch (_) {} }
    const pauseAnims = () => S.anims.forEach(a => { try { a.pause(); } catch (_) {} });
    const resumeAnims = () => S.anims.forEach(a => { try { if (a.playState === 'paused') a.play(); } catch (_) {} });

    // ---------------- stage (常駐 DipLabStage；duel.js 只呼叫 API) ----------------
    function stg(m, ...a) { const s = hooks.stage; if (!s || typeof s[m] !== 'function') return null; try { return s[m](...a); } catch (e) { console.error(e); return null; } }
    const hasStage = m => !!(hooks.stage && typeof hooks.stage[m] === 'function');
    function say(id, text, ms) { if (text) stg('say', id, text, { ms: ms || 1500 }); }
    function pickLine(key, fill) {
      let arr = lines[key]; if (arr == null) return null;
      if (!Array.isArray(arr)) arr = [arr];
      if (!arr.length) return null;
      let i = Math.floor(Math.random() * arr.length);
      if (arr.length > 1 && i === S.lastLine[key]) i = (i + 1) % arr.length;
      S.lastLine[key] = i;
      let s = arr[i];
      if (fill) s = s.replace(/\{lastAttr\}/g, fill);
      return s;
    }
    function emote(id, kind, ms) { if (hasStage('emote')) stg('emote', id, kind, ms); else if (kind === 'anger') stg('pose', id, 'warn', ms || 600); }
    function tags(on) {
      if (on && !S.tagged) { stg('tag', 'f', enemy.name || duel.e.name || '他', 'e', 'L'); stg('tag', 'p', '你', 'p', 'R'); S.tagged = true; }
      else if (!on && S.tagged) { stg('untag', 'f'); stg('untag', 'p'); S.tagged = false; }
    }

    // ---------------- hooks: tutorial / hints / info ----------------
    function gate(action) {
      if (!tut || typeof tut.gate !== 'function') return true;
      try { return tut.gate(action) !== false; } catch (e) { console.error(e); return true; }
    }
    function previewsOn() {
      let on = true;
      if (typeof hooks.previews === 'function') { try { on = !!hooks.previews(); } catch (_) {} }
      if (on && tut && typeof tut.previews === 'function') { try { on = !!tut.previews(); } catch (_) {} }
      return on;
    }
    const hinted = new Set();
    function hint(id, targets) {
      if (!hooks.hint || hinted.has(id)) return;       // 一場只送一次；存檔層級的「只出一次」由 ui.js／tutorial.js 記 save.seen
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
      if (!card || S.destroyed) return;
      if (!gate({ kind: 'info', where })) return;
      emit('info', where);
      const fn = typeof hooks.cardInfo === 'function' ? hooks.cardInfo
        : (window.DipLabCardInfo && typeof window.DipLabCardInfo.open === 'function' ? (c, o) => window.DipLabCardInfo.open(c, o) : null);
      log('info:' + where + ':' + card.id);
      if (!fn) return;
      S.infoOpen++; pauseAnims();
      try { await Promise.resolve(fn(card, { attr: attr || null, from: 'duel:' + where })); } catch (e) { console.error(e); }
      S.infoOpen = Math.max(0, S.infoOpen - 1);
      if (!S.infoOpen) resumeAnims();
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
        <div class="nmrow"><b class="nm"></b><span class="qk" data-tut="e-quirk" hidden></span><span class="bl"></span>
          <span class="hpn" data-tut="e-hp"><span>聲望</span><b class="num"></b></span></div>
        <div class="hp"><i class="lost"></i><i class="fill"></i></div>
        <div class="qirow" data-tut="e-qi" hidden><span class="lb">氣勢</span><span class="seg"></span><span class="n num"></span><span class="tip"></span></div>
        <div class="rec" data-tut="e-rec"></div>
      </section>
      <section class="dl-t" data-tut="table">
        <div class="slot e" data-tut="slot-e"></div>
        <div class="stk" data-tut="stake"><small>賭注</small><b class="num"></b></div>
        <div class="slot p" data-tut="slot-p"></div>
        <div class="tri" data-tut="tri" aria-hidden="true"></div>
        <div class="callout" aria-hidden="true"></div>
        <div class="kost" aria-hidden="true"></div>
      </section>
      <button type="button" class="dl-res" data-tut="result" aria-live="polite"></button>
      <section class="dl-p" data-tut="p-hud">
        <div class="nmrow"><b>你</b><span class="bl req" data-tut="request"></span><span class="hpn" data-tut="p-hp"><span>聲望</span><b class="num"></b></span></div>
        <div class="hp"><i class="lost"></i><i class="fill"></i></div>
        <div class="qirow" data-tut="p-qi"><span class="lb">氣勢</span><span class="seg"></span><span class="n num"></span>
          <span class="chain" data-tut="chain" hidden></span><button type="button" class="ultb" data-tut="ult" hidden></button></div>
      </section>
      <div class="dl-hand" data-tut="hand"></div>
      <div class="dl-at" data-tut="attrs"></div>
      <div class="dl-scrim" hidden></div>
      <div class="dl-sheet" role="dialog" aria-modal="false" hidden><div class="hd"><b class="tt"></b><button type="button" class="x">關閉</button></div><div class="bd"></div></div>
      <div class="dl-fx" aria-hidden="true"></div>`;
    panel.innerHTML = '';
    panel.appendChild(root);
    const $ = s => root.querySelector(s);
    const els = {
      e: $('.dl-e'), enm: $('.dl-e .nm'), eqk: $('.dl-e .qk'), ebl: $('.dl-e .bl'), ehpn: $('.dl-e .hpn .num'), ehp: $('.dl-e .hp'),
      eqi: $('.dl-e .qirow'), eseg: $('.dl-e .seg'), eqn: $('.dl-e .qirow .n'), etip: $('.dl-e .tip'), rec: $('.rec'),
      table: $('.dl-t'), se: $('.slot.e'), sp: $('.slot.p'), stk: $('.stk b'), call: $('.callout'), kost: $('.kost'),
      res: $('.dl-res'), p: $('.dl-p'), req: $('.dl-p .req'), phpn: $('.dl-p .hpn .num'), php: $('.dl-p .hp'),
      pseg: $('.dl-p .seg'), pqn: $('.dl-p .qirow .n'), chain: $('.chain'), ult: $('.ultb'),
      hand: $('.dl-hand'), at: $('.dl-at'), scrim: $('.dl-scrim'), sheet: $('.dl-sheet'), stt: $('.dl-sheet .tt'), sbd: $('.dl-sheet .bd'), fx: $('.dl-fx'),
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
    function segHTML(n) { let s = ''; for (let i = 0; i < 10; i++) s += `<s class="${i < n ? 'on' : ''}${i === 6 ? ' gap' : ''}"></s>`; return s; }
    function setSeg(segEl, nEl, from, to, animate) {
      const segs = segEl.children.length === 10 ? segEl.children : (segEl.innerHTML = segHTML(from), segEl.children);
      if (!animate || to <= from || rm()) { for (let i = 0; i < 10; i++) segs[i].classList.toggle('on', i < to); nEl.textContent = to; return; }
      nEl.textContent = to;
      for (let i = 0; i < 10; i++) segs[i].classList.toggle('on', i < from);
      for (let k = from; k < to; k++) later(() => { if (segs[k]) { segs[k].classList.add('on', 'pop'); later(() => segs[k] && segs[k].classList.remove('pop'), 260); } if (k === to - 1) sfx('qiUp', { n: to }); }, ((k - from) * 40 + 10) / S.speed);
    }
    function setHp(bar, numEl, hp, max, notches, animate) {
      const fill = bar.querySelector('.fill'), lost = bar.querySelector('.lost');
      const w = pct(Math.max(0, hp), max);
      bar.querySelectorAll('.notch').forEach(n => n.remove());
      (notches || []).forEach(n => { const t = document.createElement('span'); t.className = 'notch'; t.style.left = pct(n, max) + '%'; bar.appendChild(t); });
      numEl.textContent = `${Math.max(0, hp)}/${max}`;
      if (!animate) { fill.style.transition = 'none'; lost.style.transition = 'none'; fill.style.width = w + '%'; lost.style.width = w + '%'; void fill.offsetWidth; fill.style.transition = ''; lost.style.transition = ''; return; }
      const dur = Math.round(500 / S.speed);
      fill.style.transitionDuration = dur + 'ms';
      const old = parseFloat(fill.style.width) || 0;
      if (w < old) { lost.style.transition = 'none'; lost.style.width = old + '%'; void lost.offsetWidth; lost.style.transition = ''; fill.style.width = w + '%'; later(() => { lost.style.transitionDuration = dur + 'ms'; lost.style.width = w + '%'; }, (dur + 250) / 1); }
      else { fill.style.width = w + '%'; lost.style.width = w + '%'; }
    }
    function floatAt(el, text, cls) {      // 盤面上的小飄字（數字旁），pointer-events:none；貼著盤面上緣的數字改往左飄（不被舞台切掉）
      if (!el || !text) return;
      const r = el.getBoundingClientRect(), rr = root.getBoundingClientRect();
      const d = document.createElement('span'); d.className = 'fl ' + (cls || ''); d.textContent = text;
      const side = r.top - rr.top < 26;
      d.style.left = Math.round(side ? r.left - rr.left - 4 : r.left - rr.left + r.width / 2) + 'px'; d.style.top = Math.round(side ? r.top - rr.top + 2 : r.top - rr.top) + 'px';
      els.fx.appendChild(d);
      const kf = side ? [{ transform: 'translate(-100%,0)', opacity: 0 }, { transform: 'translate(calc(-100% - 6px),0)', opacity: 1, offset: 0.2 }, { transform: 'translate(calc(-100% - 10px),0)', opacity: 1, offset: 0.75 }, { transform: 'translate(calc(-100% - 14px),0)', opacity: 0 }]
        : [{ transform: 'translate(-50%,-2px)', opacity: 0 }, { transform: 'translate(-50%,-10px)', opacity: 1, offset: 0.2 }, { transform: 'translate(-50%,-16px)', opacity: 1, offset: 0.75 }, { transform: 'translate(-50%,-22px)', opacity: 0 }];
      if (side) d.style.transform = 'translate(-100%,0)';
      const a = rm() ? A(d, [{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 1, offset: 0.8 }, { opacity: 0 }], { duration: 1100, fill: 'forwards' })
        : A(d, kf, { duration: 1100, easing: 'ease-out', fill: 'forwards' });
      const rmv = () => d.remove(); if (a) a.finished.then(rmv, rmv); else later(rmv, 1100);
    }
    function phaseBlurb(v) {
      const ph = v.e.phase | 0;
      if (ph < 1) return null;
      const pb = enemy.phaseBlurb != null ? enemy.phaseBlurb : (content.phaseBlurb && content.phaseBlurb[duel.e.id]);
      if (pb == null) return null;
      if (Array.isArray(pb)) return pb[Math.min(pb.length - 1, ph - 1)] || null;
      if (typeof pb === 'object') return pb[ph] || pb[String(ph)] || null;
      return String(pb);
    }
    const cardOfHand = (v, i) => i === 'ace' ? v.p.ace : v.p.hand[i];

    // ---------------- render: 他的一塊 ----------------
    function renderE(v, opt) {
      opt = opt || {};
      const e = v.e;
      els.enm.textContent = enemy.name || e.name || '';
      els.ebl.textContent = phaseBlurb(v) || enemy.blurb || enemy.title || '';
      const q = e.quirk && e.quirk.type === 'skip' && e.quirk.val > 0;
      els.eqk.hidden = !q; if (q) els.eqk.textContent = '跳針 +' + e.quirk.val;
      if (!opt.keepHp) setHp(els.ehp, els.ehpn, e.hp, e.maxHp, (e.notches || []).filter((n, i) => i >= (e.phase | 0)), false);
      const showQi = e.ultAt != null && e.ultAt <= 10;
      els.eqi.hidden = !showQi;
      if (showQi) {
        if (!opt.keepHp) setSeg(els.eseg, els.eqn, e.qi, e.qi, false);
        els.etip.innerHTML = `氣勢 ${e.ultAt} 會輾壓${e.ultAttr ? `・<span class="${e.ultAttr}">${ZH[e.ultAttr]}</span>` : ''}${v.p.aceCanReflect ? ' <b>王牌接得住</b>' : ''}`;
      }
      renderRec(v);
    }
    function willHTML(it) {
      const L = intentLine(it);
      const cells = L.cells.map((a, k) => `<i class="${a}" data-i="${L.idx[k]}"></i>`).join('');
      const pc = L.parts.slice(0, 3).map(p => `<span class="${p.a === 'q' ? 'q' : p.a}">${esc(p.text)}</span>`).join('・');   // 色條已經畫出全部六格，字最多三段
      return `<button type="button" class="will" data-tut="e-intent" aria-label="他會出：${esc(L.text)}（點一下看他的脾氣）"><span class="lb">他會出</span><span class="bar6">${cells}</span><span class="pc">${pc}</span><span class="more">›</span></button>`;
    }
    function renderRec(v) {
      const it = v.intent;
      if (S.recNext || !it) {
        // 他的盤飛去牌桌了：原位變虛線框；「他會出」那一行留著（抽中的格子會閃）
        const will = S.recNext && S.recNext.will ? S.recNext.will : '';
        els.rec.innerHTML = `<span class="cv nextph" aria-hidden="true">…</span><div class="tx"><div class="l1"><small>他的下一張，這手結束後拿出</small></div><div class="l2"></div>${will}</div>`;
        return;
      }
      const rc = it.record || {};
      const plus = rc && !rc.tier ? (v.e.starPlus | 0) : 0;
      els.rec.innerHTML = `<button type="button" class="cvb" data-card="${esc(rc.id)}" aria-label="唱片資訊：${esc(rc.artist + '《' + rc.album + '》')}">${img(rc)}</button>
        <div class="tx"><div class="l1"><small>他拿出</small>${esc(rc.artist)}《${esc(rc.album)}》</div>
        <div class="l2" data-tut="e-stars">${starsHTML(rc, plus)}${it.ult ? '' : `<span class="shout" data-tut="e-shout">喊 <span class="${it.bubble}">${ZH[it.bubble]}</span></span>`}</div>
        ${it.ult ? `<button type="button" class="killbar" data-tut="e-intent">殺氣騰騰：這手品味輾壓・${ZH[it.attr] || ''} ${it.dmg}</button>` : willHTML(it)}</div>`;
    }

    // ---------------- render: 牌桌 ----------------
    function slotData(side, rv, cl, it0) {
      if (side === 'p') {
        if (rv.pAct === 'ult') return { ult: cl.kind === 'trade' || cl.kind === 'ult' ? (cl.breakdown.find(t => t.k === 'ult') || {}).v : null, kind: 'ult' };
        const c = rv.pCard; return { card: c, attr: rv.pAttr, star: c ? (c[rv.pAttr] | 0) : 0, ace: !!(c && c.tier) };
      }
      if (rv.eUlt) { const eu = (cl.breakdown || []).find(t => t.k === 'eult'); return { card: rv.eCard, ult: it0 && it0.ult ? it0.dmg : (eu ? eu.v : null), ultAttr: rv.eAttr, kind: 'eult' }; }
      const c = rv.eCard;
      return { card: c, attr: rv.eAttr, star: c ? (c[rv.eAttr] | 0) : 0, plus: c && !c.tier ? starPlusOf(cl) : 0, void: cl.kind === 'ult' };
    }
    function starPlusOf(cl) { const t = (cl.breakdown || []).find(x => x.note && /^\+\d+星$/.test(x.note)); return t ? +/\d+/.exec(t.note)[0] : 0; }
    function whoText(side, d) {
      const W = side === 'e' ? '他' : '你';
      if (!d) return '';
      if (d.kind === 'ult') return `${W}・<span class="r">品味輾壓</span>`;
      if (d.kind === 'eult') return `${W}・<span class="r">品味輾壓</span>`;
      return `${W}・<span class="${d.attr}">${ZH[d.attr]} <span class="num">${d.star}${d.plus ? '+' + d.plus : ''}</span></span>`;
    }
    function renderSlot(side) {
      const el = side === 'e' ? els.se : els.sp, T = S.table, d = T && T[side];
      el.className = 'slot ' + side + (T && T.dim ? ' dim' : '') + (d ? '' : ' empty');
      el.removeAttribute('data-card'); el.removeAttribute('role'); el.removeAttribute('tabindex'); el.removeAttribute('aria-label');
      if (!d) { el.innerHTML = side === 'e' ? '他出的' : '你出的'; return; }
      const badge = T.badges && T.badges[side] ? `<span class="badge ${T.badges[side] === '負' ? 'l' : T.badges[side] === '平' ? 'd' : 'w'}">${T.badges[side]}</span>` : '';
      let body;
      if (d.kind === 'ult' || d.kind === 'eult') body = `<span class="cv ultbox">品味輾壓${d.ult != null ? `<b class="num">${d.ult}</b>` : ''}${d.ultAttr ? `<small>${ZH[d.ultAttr]}</small>` : ''}</span>`;
      else body = img(d.card);
      el.innerHTML = body + (d.void ? '<span class="void">作廢</span>' : '') + badge + `<div class="who">${whoText(side, d)}</div>`;
      if (d.card) { el.dataset.card = d.card.id; el.setAttribute('role', 'button'); el.tabIndex = 0; el.setAttribute('aria-label', (side === 'e' ? '他出的：' : '你出的：') + (d.card.artist || '') + '《' + (d.card.album || '') + '》'); }
    }
    function renderTable(v) {
      renderSlot('e'); renderSlot('p');
      const k = '×' + v.K, old = els.stk.textContent;
      els.stk.textContent = k;
      if (old && old !== k && !rm()) A(els.stk, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.1)', offset: 0.45 }, { transform: 'scaleY(1)' }], { duration: 300, easing: 'ease-in-out' });   // 賭注變大：壓扁再撐開（2D，不鏡像）
    }
    function renderRes() {
      const r = S.res;
      els.res.classList.toggle('old', !!(r && r.old));
      if (!r) { els.res.innerHTML = '<span class="lbl">還沒出牌</span>'; els.res.disabled = true; return; }
      els.res.disabled = false;
      els.res.innerHTML = (r.old ? '<span class="lbl">上一手</span>' : '') + (r.st ? `<span class="stp${r.gold ? ' gold' : ''}">${esc(r.st)}</span>` : '') + `<span class="tx">${r.line}</span><span class="more">算式 ›</span>`;
    }

    // ---------------- render: 你的一塊、手牌、屬性鈕 ----------------
    function renderP(v, opt) {
      opt = opt || {};
      if (!opt.keepHp) { setHp(els.php, els.phpn, v.p.hp, v.p.maxHp, null, false); setSeg(els.pseg, els.pqn, v.p.qi, v.p.qi, false); }
      if (v.request) { const rl = (content.requests || {})[v.request] || v.request; els.req.innerHTML = `點播 <b>${esc(rl)}</b> +2`; els.req.hidden = false; } else { els.req.textContent = ''; }
      renderChain(v);
      renderUlt(v);
    }
    function renderChain(v) {
      const on = S.chainShown && v.p.chainLen >= 1 && v.p.chainLast;
      els.chain.hidden = !on;
      if (on) els.chain.innerHTML = `相生 ${v.p.chainLen} 連・下一環 <b class="${NEXT[v.p.chainLast]}">${ZH1[NEXT[v.p.chainLast]]}</b>`;
    }
    function canUlt() { return !duel.over && E.legalActions(duel).some(a => a.type === 'ult'); }
    function renderUlt(v) {
      const show = !S.busy && canUlt();
      els.ult.hidden = !show;
      els.ult.classList.toggle('armed', S.ultArmed);
      if (show) els.ult.textContent = S.ultArmed ? '取消' : `品味輾壓 ${v.p.qi}`;
    }
    function tileHTML(v, i) {
      const isAce = i === 'ace', c = cardOfHand(v, i); if (!c) return '';
      const sel = S.sel === i, used = isAce && v.p.aceUsed;
      const ok = isAce && !used && v.p.aceCanReflect && v.intent && v.intent.ult;
      const req = !!(v.request && (c.tags || []).includes(v.request));
      const ax = aceAxis(c);
      const st3 = isAce ? `<b class="${ax}"><i>${ZH1[ax]}</i>${c[ax] | 0}</b>${ok ? '<b class="okt">接得住</b>' : ''}`
        : ATTRS.map(a => `<b class="${a}"><i>${ZH1[a]}</i>${c[a] | 0}</b>`).join('');
      return `<button type="button" class="tile${isAce ? ' ace' : ''}${sel ? ' sel' : ''}${used ? ' used' : ''}${ok ? ' ok' : ''}${req ? ' req' : ''}" data-tut="${isAce ? 'hand-ace' : 'hand-' + i}" data-card="${esc(c.id)}" data-i="${i}" aria-pressed="${sel}" aria-label="${esc((isAce ? '王牌：' : '') + c.artist + '《' + c.album + '》')}">`
        + `<span class="cvw">${img(c)}${isAce ? `<span class="acetag${ok ? ' ok' : ''}">${used ? '用過' : '王牌'}</span>` : ''}${req ? '<span class="reqtag">+2</span>' : ''}${sel ? '<span class="itag" data-act="info" aria-label="唱片資訊">i</span>' : ''}</span>`
        + `<span class="st3">${st3}</span></button>`;
    }
    function renderHand(v, opt) {
      opt = opt || {};
      const ids = [];
      if (v.p.ace) ids.push('ace');
      v.p.hand.forEach((_, i) => ids.push(i));
      els.hand.innerHTML = ids.map(i => tileHTML(v, i)).join('');
      if (opt.slideNew != null) {
        const t = els.hand.querySelector(`.tile[data-i="${opt.slideNew}"]`);
        if (t && !rm()) A(t, [{ transform: 'translateX(60px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 260, easing: 'cubic-bezier(.2,.7,.3,1)' });
      }
    }
    function pvHTML(p) {
      if (!p || !p.lines.length) return '';
      return p.lines.map(l => `<span class="pv">${l.frac ? `<span class="f">${esc(l.frac)}</span>` : ''}${l.name ? `<span class="nm">${esc(l.name)}</span>` : ''}<span class="${l.cls}">${esc(l.text)}</span></span>`).join('');
    }
    function renderAttrs(v) {
      const lock = S.busy || !S.enterDone || !!duel.over;
      els.at.classList.toggle('lock', lock);
      if (S.ultArmed && !S.busy) {
        const f = E.forecast(duel, { type: 'ult' });
        const o = f ? (f.ult ? f.outcome : (f.slices.find(s => s.outcome) || {}).outcome) : null;
        const txt = o && o.kind === 'trade' ? `對轟 他扣 ${o.toE}・你扣 ${o.toP}` : `放！品味輾壓 他扣 ${o ? o.toE : v.p.qi}・他這手作廢`;
        els.at.innerHTML = `<button type="button" class="ab wide ult" data-tut="ult-confirm" data-a="ult"><span class="k">${esc(txt)}</span></button>`;
        return;
      }
      if (S.sel == null || S.busy || duel.over) { els.at.innerHTML = '<div class="ab ph">先點一張盤，再選屬性</div>'; return; }
      const pvOn = previewsOn();
      if (S.sel === 'ace') {
        const c = v.p.ace, ax = aceAxis(c);
        const p = pvOn ? previewLines(duel, { type: 'ace' }) : null;
        const gold = !!(p && p.ult && p.outcome && p.outcome.kind === 'reflect');
        els.at.innerHTML = `<button type="button" class="ab wide${gold ? ' gold' : ''}" data-tut="attr-ace" data-a="ace"><span class="k"><span class="${ax}">${ZH[ax]} <span class="num">${c[ax] | 0}</span></span>・王牌</span>${pvHTML(p)}${gold ? '<span class="l3">擋下他的輾壓，反打回去</span>' : ''}</button>`;
        return;
      }
      const c = v.p.hand[S.sel];
      els.at.innerHTML = ATTRS.map(a => {
        const p = pvOn ? previewLines(duel, { type: 'card', i: S.sel, attr: a }) : null;
        const more = p && p.more ? `<span class="mo">＋${p.more} 種</span>` : '';
        return `<button type="button" class="ab${pvOn ? '' : ' bare'}" data-tut="attr-${a}" data-a="${a}"><span class="k ${a}">${ZH[a]} <span class="num">${c[a] | 0}</span>${more}</span>${pvHTML(p)}</button>`;
      }).join('');
    }
    function renderAll(opt) {
      const v = S.v;
      renderE(v, opt); renderTable(v); renderRes(); renderP(v, opt); renderHand(v); renderAttrs(v);
      scheduleFit();
    }

    // ---------------- 矮螢幕：內容放不下就換緊湊版（B04；不捲動） ----------------
    function fit() {
      S.fitRaf = 0;
      if (S.destroyed) return;
      root.classList.remove('tight', 'tighter');
      const over = () => root.scrollHeight > root.clientHeight;
      const short = root.clientHeight > 0 && root.clientHeight < 470;
      if (short || over()) { root.classList.add('tight'); if (over()) root.classList.add('tighter'); }
    }
    function scheduleFit() { if (!S.fitRaf) { fit(); S.fitRaf = requestAnimationFrame(() => { S.fitRaf = 0; fit(); }); } }
    try { S.ro = new ResizeObserver(() => scheduleFit()); [root, els.e, els.p, els.hand].forEach(x => S.ro.observe(x)); } catch (_) {}
    try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => scheduleFit()); } catch (_) {}

    // ---------------- sheets（點了才出現：他的脾氣／算式／六格完整表） ----------------
    function cellRows(slices, outcomes) {
      const desc = {}; (content.helpGlyphs || []).forEach(([g, d]) => { desc[g] = d; });
      return slices.map((s, k) => {
        const g = GL[s.glyph] || '？', a = s.attr;
        const o = outcomes ? outcomes[k] : null, ot = outcomes ? outcomeText(o) : null;
        return `<div class="cl"><b class="gl">${g}</b><span class="a ${a || 'q'}">${a ? ZH[a] : '？'}</span><span class="d">${esc(desc[g] || '')}</span>${ot ? `<span class="o ${ot.cls}">${esc(ot.text)}</span>` : ''}</div>`;
      }).join('');
    }
    function openSheet(kind, data) {
      const v = S.v; let title = '', body = '';
      if (kind === 'temper') {
        title = '他的脾氣';
        const pb = phaseBlurb(v);
        body = `<p class="sb">${esc(enemy.blurb || '')}</p>${pb ? `<p class="sb pb">${esc(pb)}</p>` : ''}`;
        const it = v.intent;
        if (it && it.ult) body += `<p class="kill">殺氣騰騰：這手品味輾壓・${ZH[it.attr] || ''} ${it.dmg}</p><p class="sb">${esc((content.hints && (v.p.aceCanReflect && !v.p.aceUsed ? content.hints.h_reflect : content.hints.h_eult)) || '')}</p>`;
        else if (it) {
          const row = (content.helpRows || []).find(r => r[0] === '氣場唱盤');
          body += `<p class="sb">他喊 <b class="${it.bubble}">${ZH[it.bubble]}</b>。${esc(row ? row[1].replace(/。?$/, '。') : '')}</p><div class="cells">${cellRows(it.slices)}</div>`;
        }
      } else if (kind === 'cells') {
        const it = v.intent; if (!it || it.ult) return;
        const f = E.forecast(duel, data.act); if (!f || f.ult) return;
        const c = data.act.type === 'ace' ? v.p.ace : v.p.hand[data.act.i], a = data.act.type === 'ace' ? aceAxis(c) : data.act.attr;
        title = `出 ${ZH[a]} ${c ? c[a] | 0 : ''} 會怎樣`;
        body = `<p class="sb">${esc(c ? c.artist + '《' + c.album + '》' : '')}</p><div class="cells wo">${cellRows(it.slices, f.slices.map(s => s.outcome))}</div>`;
      } else if (kind === 'calc') {
        const h = S.hist[S.hist.length - 1]; if (!h) return;
        title = '算式';
        body = `<p class="fm">${esc(formula(h.clash))}</p><p class="sb">最近三手</p><div class="hist">` + S.hist.slice(-3).reverse().map((x, k) => {
          const cv = (d, w) => d && d.card ? `<button type="button" class="hc" data-card="${esc(d.card.id)}" data-w="${w}" data-h="${S.hist.length - 1 - k}">${img(d.card)}</button>` : '<span class="hc ub">輾壓</span>';
          return `<div class="hr">${cv(x.e, 'e')}${cv(x.p, 'p')}<span class="ht"><span>${whoText('e', x.e)} ✕ ${whoText('p', x.p)}</span><span class="hl">→ ${x.line}</span></span></div>`;
        }).join('') + '</div>';
      } else return;
      S.sheet = kind;
      els.stt.textContent = title; els.sbd.innerHTML = body;
      els.sheet.hidden = false; els.scrim.hidden = false;
      els.sheet.dataset.kind = kind;
      if (!rm()) A(els.sheet, [{ transform: 'translateY(30px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 180, easing: 'ease-out' });
      log('sheet:' + kind);
    }
    function closeSheet() { if (!S.sheet) return; S.sheet = null; els.sheet.hidden = true; els.scrim.hidden = true; }

    // ---------------- input ----------------
    function bumpEl(el) { if (el && !rm()) A(el, [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 300 }); }
    function select(i) {
      if (S.busy || !S.enterDone || duel.over) return false;
      const v = S.v;
      if (i === null) { S.sel = null; S.ultArmed = false; setPhase('choose'); renderHand(v); renderAttrs(v); renderUlt(v); emit('selected', null); return true; }
      const isAce = i === 'ace';
      const c = cardOfHand(v, i); if (!c) return false;
      if (isAce && v.p.aceUsed) return false;
      if (!gate(isAce ? { kind: 'ace' } : { kind: 'card', i, id: c.id })) return false;
      S.sel = i; S.ultArmed = false;
      sfx('select');
      setPhase('attr');
      renderHand(v); renderAttrs(v); renderUlt(v);
      emit('selected', i);
      return true;
    }
    function tileTap(i, el) {
      const v = S.v; const c = cardOfHand(v, i); if (!c) return;
      if (S.sel === i || (i === 'ace' && v.p.aceUsed) || S.busy) { openInfo(c, 'hand'); return; }
      if (!select(i)) bumpEl(el);
    }
    function attrTap(a, btn) {
      if (S.busy || !S.enterDone || duel.over) return;
      let act, g;
      if (a === 'ult') { act = { type: 'ult' }; g = { kind: 'ultConfirm' }; }
      else if (a === 'ace') { const ax = aceAxis(S.v.p.ace); act = { type: 'ace' }; g = { kind: 'attr', attr: ax, ace: true }; }
      else { if (S.sel == null || S.sel === 'ace') return; const c = S.v.p.hand[S.sel]; act = { type: 'card', i: S.sel, attr: a }; g = { kind: 'attr', attr: a, i: S.sel, id: c && c.id }; }
      if (!E.isLegal(duel, act)) { bumpEl(btn); return; }
      if (!gate(g)) { bumpEl(btn); return; }
      if (btn && !rm()) A(btn, [{ transform: 'scale(1)' }, { transform: 'scale(.96)' }, { transform: 'scale(1)' }], { duration: 80 });
      play(act);
    }
    function ultTap() {
      if (S.busy || !S.enterDone || duel.over) return;
      if (S.ultArmed) { S.ultArmed = false; setPhase(S.sel != null ? 'attr' : 'choose'); renderUlt(S.v); renderAttrs(S.v); return; }
      if (!canUlt()) return;
      if (!gate({ kind: 'ult' })) { bumpEl(els.ult); return; }
      S.ultArmed = true; S.sel = null;
      sfx('ultCharge');
      setPhase('attr');
      renderHand(S.v); renderUlt(S.v); renderAttrs(S.v);
      emit('selected', 'ult');
    }
    function onClick(ev) {
      const t = ev.target;
      const sw = S.swallow; S.swallow = null;
      if (sw && performance.now() < sw.until && sw.el.contains(t)) { ev.preventDefault(); return; }   // 長按之後的那一下 click 不算點選
      if (S.busy && !t.closest('[data-card],.dl-sheet,.dl-scrim,.will,.killbar,.dl-res') && !S.rush) { S.rush = true; setSpeed(Math.max(S.speed, 4)); }
      let x;
      if ((x = t.closest('.dl-scrim'))) { closeSheet(); return; }
      if ((x = t.closest('.dl-sheet'))) {
        if (t.closest('.x')) { closeSheet(); return; }
        const hc = t.closest('[data-card]');
        if (hc) { const h = S.hist[+hc.dataset.h], d = h && h[hc.dataset.w]; if (d && d.card) openInfo(d.card, 'calc', d.attr); }
        return;
      }
      if ((x = t.closest('[data-act="info"]'))) { const c = S.sel != null ? cardOfHand(S.v, S.sel) : null; if (c) openInfo(c, 'hand'); return; }
      if ((x = t.closest('.tile'))) { const i = x.dataset.i === 'ace' ? 'ace' : +x.dataset.i; tileTap(i, x); return; }
      if ((x = t.closest('.ab'))) { if (x.dataset.a) attrTap(x.dataset.a, x); return; }
      if ((x = t.closest('.ultb'))) { ultTap(); return; }
      if ((x = t.closest('.cvb, .rec .l1'))) { const it = S.v.intent; if (it && it.record) openInfo(it.record, 'e-rec'); return; }   // 封面或「他拿出 藝人《專輯》」那一行都開唱片資訊
      if ((x = t.closest('.slot[data-card]'))) {
        const side = x.classList.contains('e') ? 'e' : 'p', d = S.table && S.table[side];
        if (d && d.card) openInfo(d.card, 'slot-' + side, d.attr); return;
      }
      if ((x = t.closest('.will,.killbar'))) { if (!S.recNext) openSheet('temper'); return; }
      if ((x = t.closest('.dl-res'))) { if (S.hist.length) openSheet('calc'); return; }
    }
    function onDown(ev) {
      const t = ev.target.closest('.tile,.ab:not(.ph):not(.wide)');
      if (!t || (ev.button != null && ev.button > 0)) { S.lp = null; return; }
      const lp = S.lp = { el: t, x: ev.clientX, y: ev.clientY, fired: false, h: 0 };
      lp.h = later(() => {
        if (S.lp !== lp) return;
        lp.fired = true; S.lp = null; S.swallow = { el: t, until: performance.now() + 900 };
        if (t.classList.contains('tile')) { const i = t.dataset.i === 'ace' ? 'ace' : +t.dataset.i; const c = cardOfHand(S.v, i); if (c) openInfo(c, 'hand'); }
        else if (S.sel != null && S.sel !== 'ace' && !S.busy) { const a = t.dataset.a; if (ATTRS.includes(a)) openSheet('cells', { act: { type: 'card', i: S.sel, attr: a } }); }
      }, LONG_MS);
    }
    function onMove(ev) { const lp = S.lp; if (lp && !lp.fired && (Math.abs(ev.clientX - lp.x) > 10 || Math.abs(ev.clientY - lp.y) > 10)) { clearTimeout(lp.h); S.lp = null; } }
    function onUp() { const lp = S.lp; if (lp) { clearTimeout(lp.h); S.lp = null; } }
    root.addEventListener('click', onClick);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerup', onUp);
    root.addEventListener('pointercancel', () => { if (S.lp) { clearTimeout(S.lp.h); S.lp = null; } });
    root.addEventListener('contextmenu', ev => { if (ev.target.closest('.tile,.ab,.slot,.cvb,.hc')) ev.preventDefault(); });
    root.addEventListener('keydown', ev => {
      if (ev.key === 'Escape' && S.sheet) { closeSheet(); return; }
      if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.classList && ev.target.classList.contains('slot')) { ev.preventDefault(); ev.target.click(); }
    });

    // ---------------- play one hand（約 2.1 s；SPEC-v2 §3.6） ----------------
    function rectOf(el) { if (!el) return null; const r = el.getBoundingClientRect(); return r.width ? r : null; }
    function fly(el, from, ms) {
      if (!el) return null;
      if (!from || rm()) return A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 150 });
      const to = el.getBoundingClientRect(); if (!to.width) return null;
      const dx = from.left - to.left, dy = from.top - to.top, s = from.width / to.width;
      el.style.transformOrigin = '0 0';
      const a = A(el, [{ transform: `translate(${dx}px,${dy}px) scale(${s})` }, { transform: 'translate(0,0) scale(1)' }], { duration: ms, easing: 'cubic-bezier(.2,.7,.3,1)' });
      if (a) a.finished.then(() => { el.style.transformOrigin = '50% 50%'; A(el, [{ transform: 'scale(1)' }, { transform: 'scale(1.07)', offset: 0.4 }, { transform: 'scale(1)' }], { duration: 300, easing: 'ease-out' }); }, () => {});
      return a;
    }
    function fadeIn(el, ms) { if (el) A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: ms || 200, easing: 'ease-out' }); }
    function showCallout(ct) {
      const c = els.call;
      c.innerHTML = (ct.st ? `<span class="st${ct.gold ? ' gold' : ''}">${esc(ct.st)}</span>` : '') + (ct.l1 ? `<div class="l1">${esc(ct.l1)}</div>` : '') + `<div class="l2">${ct.l2}</div>` + (ct.l3 ? `<div class="l3">${esc(ct.l3)}</div>` : '');
      c.classList.add('on');
      if (rm()) A(c, [{ opacity: 0 }, { opacity: 1 }], { duration: 150, fill: 'both' });
      else A(c, [{ transform: 'translate(-50%,0) scale(.2)', opacity: 0 }, { transform: 'translate(-50%,0) scale(1.14)', opacity: 1, offset: 0.6 }, { transform: 'translate(-50%,0) scale(1)', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.18,.9,.32,1.25)', fill: 'both' });
    }
    function hideCallout() {
      const c = els.call; if (!c.classList.contains('on')) return;
      const a = A(c, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
      const done = () => { c.classList.remove('on'); c.innerHTML = ''; S.anims.forEach(x => { try { if (x.effect && x.effect.target === c) x.cancel(); } catch (_) {} }); };
      if (a) a.finished.then(done, done); else done();
    }
    function bigStamp(text, cls, ms, sub) {
      const k = els.kost;
      k.className = 'kost on ' + (cls || ''); k.textContent = text;
      if (sub) { const s2 = document.createElement('small'); s2.textContent = sub; k.appendChild(s2); }
      if (rm()) A(k, [{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.85 }, { opacity: 0 }], { duration: ms, fill: 'forwards' });
      else A(k, [{ transform: 'translate(-50%,-50%) rotate(-6deg) scale(2.2)', opacity: 0 }, { transform: 'translate(-50%,-50%) rotate(-6deg) scale(.94)', opacity: 1, offset: 0.2 },
        { transform: 'translate(-50%,-50%) rotate(-6deg) scale(1)', opacity: 1, offset: 0.3 }, { transform: 'translate(-50%,-50%) rotate(-6deg) scale(1)', opacity: 1, offset: 0.85 }, { transform: 'translate(-50%,-50%) rotate(-6deg) scale(1)', opacity: 0 }], { duration: ms, easing: 'ease-out', fill: 'forwards' });
      later(() => { k.className = 'kost'; k.textContent = ''; }, ms / S.speed + 40);
    }
    function flashCell(rv) {
      const will = els.rec.querySelector('.will'); if (!will || rv.cellIdx == null || rv.cellIdx < 0) return;
      const cell = will.querySelector(`.bar6 i[data-i="${rv.cellIdx}"]`); if (!cell) return;
      cell.classList.add('hit');
      const g = rv.found ? 'hidden' : (rv.glyph || 'true');
      const txt = rv.found ? `新習慣：${GL[rv.glyph] || '？'}` : (CELL_TAG[g] || GL[g] || '');
      const tag = document.createElement('span'); tag.className = 'celltag'; tag.textContent = txt;
      const wr = will.getBoundingClientRect(), cr = cell.getBoundingClientRect();
      tag.style.left = Math.round(cr.left - wr.left + cr.width / 2) + 'px';
      will.appendChild(tag);
      if (!rm()) A(cell, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.7)' }, { transform: 'scaleY(1)' }, { transform: 'scaleY(1.5)' }, { transform: 'scaleY(1)' }], { duration: 600 });
      A(tag, [{ opacity: 0, transform: 'translate(-50%,2px)' }, { opacity: 1, transform: 'translate(-50%,-2px)', offset: 0.15 }, { opacity: 1, offset: 0.8 }, { opacity: 0 }], { duration: 1200, fill: 'forwards' });
    }
    const HIT_SFX = { counter: c => c.stamp === 'seeThrough' ? 'seeThrough' : 'readHit', countered: c => c.stamp === 'feintHit' ? 'feintHit' : 'hurt', mirrorWin: () => 'mirror', mirrorLose: () => 'hurt',
      tie: () => 'mirror', hegemonyE: () => 'scratch', hegemonyP: () => 'scratch', ult: () => 'ult', eultHit: () => 'hurt', block: () => 'mirror', reflect: () => 'reflect', trade: () => 'ult' };
    const RELIC_K = ['ear', 'stylus', 'obi', 'dust', 'isolation', 'matrix', 'skip'];

    async function play(act) {
      if (S.busy || S.destroyed || duel.over || !S.enterDone) return false;
      if (!E.isLegal(duel, act)) return false;
      closeSheet();
      S.busy = true; S.rush = false;
      const v0 = S.v;
      const srcP = act.type === 'card' ? rectOf(els.hand.querySelector(`.tile[data-i="${act.i}"] .cv`)) : act.type === 'ace' ? rectOf(els.hand.querySelector('.tile[data-i="ace"] .cv')) : null;
      const srcE = rectOf(els.rec.querySelector('.cv'));
      const willHTMLKeep = v0.intent && !v0.intent.ult ? willHTML(v0.intent) : '';
      let evs;
      try {
        if (tut) { const fc = typeof tut.forcedCell === 'function' ? tut.forcedCell() : null; evs = E.resolveTurn(duel, act, { forcedCell: Number.isInteger(fc) ? fc : null }); }
        else evs = E.resolveTurn(duel, act);
      } catch (e) { console.error(e); S.busy = false; renderAll(); return false; }
      if (opts.onSave) try { opts.onSave(duel); } catch (e) { console.error(e); }
      const v1 = E.view(duel);
      const rv = evs.find(e => e.t === 'reveal'), cl = evs.find(e => e.t === 'clash');
      const ko = evs.find(e => e.t === 'ko'), hs = evs.find(e => e.t === 'handStart');
      const t0 = performance.now();
      S.debug.hands.push({ hand: v0.hand, act, clash: cl, reveal: { pAct: rv.pAct, pAttr: rv.pAttr, eAttr: rv.eAttr, eUlt: rv.eUlt, cellIdx: rv.cellIdx, glyph: rv.glyph, pCard: rv.pCard && rv.pCard.id, eCard: rv.eCard && rv.eCard.id } });
      if (S.debug.hands.length > 80) S.debug.hands.shift();
      S.sel = null; S.ultArmed = false;
      setPhase('resolve');
      root.classList.add('busy');
      renderAttrs(v0); renderUlt(v0);
      els.hand.querySelectorAll('.tile').forEach(t => { t.classList.remove('sel'); const it = t.querySelector('.itag'); if (it) it.remove(); });
      // ---- t=0：你出牌
      if (v0.intent && v0.intent.ult) stg('pose', 'f', null);
      stg('pose', 'p', 'atk', 200);
      sfx(act.type === 'ult' ? 'ultCharge' : 'needle');
      onEvent(rv);
      const badges = badgesOf(cl);
      S.table = { e: null, p: slotData('p', rv, cl), dim: false, badges: null };
      renderSlot('e'); renderSlot('p'); els.stk.textContent = '×' + v0.K;
      const playedTile = act.type === 'card' ? els.hand.querySelector(`.tile[data-i="${act.i}"]`) : act.type === 'ace' ? els.hand.querySelector('.tile[data-i="ace"]') : null;
      if (playedTile) playedTile.classList.add('gone');
      fly(els.sp.querySelector('.cv'), srcP, 240);
      fadeIn(els.sp.querySelector('.who'), 240);
      await wait(260);
      if (S.destroyed) return true;
      // ---- t=260：他的盤飛下去
      S.table.e = slotData('e', rv, cl, v0.intent);
      renderSlot('e');
      S.recNext = { will: willHTMLKeep };
      renderRec(v0);
      fly(els.se.querySelector('.cv'), srcE, 240);
      fadeIn(els.se.querySelector('.who'), 240);
      stg('pose', 'f', 'atk', 200);
      sfx('flip');
      if (!rv.eUlt) flashCell(rv);
      await wait(300);
      if (S.destroyed) return true;
      // ---- t=560：浮框、勝負角標、受擊
      const ct = clashText(cl);
      if (cl.kind !== 'reflect') showCallout(ct);
      S.table.badges = badges; renderSlot('e'); renderSlot('p');
      onEvent(cl);
      sfx((HIT_SFX[cl.kind] || (() => 'hurt'))(cl));
      if (cl.toE > 0) { stg('pose', 'f', 'hurt', 200); if (hasStage('float')) stg('float', 'f', '−' + cl.toE); else floatAt(els.ehpn, '−' + cl.toE, 'r big'); }
      if (cl.toP > 0) { stg('pose', 'p', 'hurt', 200); if (hasStage('float')) stg('float', 'p', '−' + cl.toP); else floatAt(els.phpn, '−' + cl.toP, 'r big'); }
      if ((cl.stamp === 'seeThrough' || cl.kind === 'reflect') && !rm()) { const f = Fx(); if (f && f.hitStop) try { f.hitStop(80); } catch (_) {} }
      if (cl.kind === 'reflect') {   // 全場唯一的大演出：牌桌金章＋舞台閃白一下
        bigStamp('七星回擊', 'gold', 1200, '他 −' + cl.toE);
        if (!rm()) { if (hasStage('flash')) stg('flash', '#fff', 80); else { const f = Fx(); if (f && f.flash) try { f.flash('#fff', 80); } catch (_) {} } }
      }
      // 他的台詞（只在事件時）
      if (cl.kind === 'counter' || cl.kind === 'reflect') say('f', pickLine('countered'));
      else if (cl.kind === 'countered' || cl.kind === 'eultHit' || cl.kind === 'mirrorLose') say('f', pickLine('hit'));
      // 聲望條、氣勢
      for (const e of evs) if (e.t === 'damage') onEvent(e);
      setHp(els.ehp, els.ehpn, v1.e.hp, v1.e.maxHp, (v1.e.notches || []).filter((n, i) => i >= (v1.e.phase | 0)), true);
      setHp(els.php, els.phpn, v1.p.hp, v1.p.maxHp, null, true);
      setSeg(els.pseg, els.pqn, v0.p.qi, v1.p.qi, true);
      if (!els.eqi.hidden) setSeg(els.eseg, els.eqn, v0.e.qi, v1.e.qi, true);
      // 小字（屬性效果、相生、配件）：只飄在對應數字旁
      later(() => {
        for (const e of evs) {
          if (e.t === 'attrFx') {
            const mine = e.who === 'p';
            if (e.hp) floatAt(mine ? els.phpn : els.ehpn, '+' + e.hp, 'g');
            if (e.qi) floatAt(mine ? els.pqn : (els.eqi.hidden ? null : els.eqn), '+' + e.qi, 'gd');
            if (e.oppQi) floatAt(mine ? (els.eqi.hidden ? null : els.eqn) : els.pqn, '−' + Math.abs(e.oppQi), 'z');
            onEvent(e);
          } else if (e.t === 'chain') {
            floatAt(els.pqn, '相生 +' + e.qi, 'gd'); onEvent(e);
            if (e.len === 2 && !S.chainShown) { S.chainShown = true; hint('h_chain', ['chain']); }
          } else if (e.t === 'acePassive' || e.t === 'habitRevealed' || e.t === 'revive') {
            onEvent(e);
            if (e.t === 'revive') { floatAt(els.phpn, '+' + e.hp, 'g'); say('p', (content.lines && content.lines.player && content.lines.player.revive) || ''); }
          }
        }
        (cl.breakdown || []).filter(t => RELIC_K.includes(t.k)).forEach((t, k) => {
          const target = t.k === 'dust' || t.k === 'isolation' ? els.phpn : (t.k === 'skip' ? els.phpn : els.ehpn);
          later(() => floatAt(target, `${t.label} ${t.v >= 0 ? '+' : '−'}${Math.abs(t.v)}`, 'gd'), (k * 180) / S.speed);
        });
        renderChain(v1);
      }, 120 / S.speed);
      // 第一次才講的提示（照 §6.5）
      if (cl.stamp === 'feintHit') hint('h_feint', ['result']);
      if (cl.kind === 'hegemonyE' || cl.kind === 'hegemonyP') hint('h_hegemony', ['table']);
      if (rv.glyph && ['copy', 'grudge', 'eye'].includes(rv.glyph)) hint('h_' + rv.glyph, ['e-intent']);
      if (rv.found) hint('h_hidden', ['e-intent']);
      await wait(900);
      if (S.destroyed) return true;
      // ---- t=1460：浮框收起，寫進結果一行
      hideCallout();
      S.res = { st: ct.st, gold: ct.gold, line: ct.line, plain: ct.plain, old: false };
      renderRes();
      S.hist.push({ e: S.table.e, p: S.table.p, clash: cl, line: (ct.st ? `<span class="stp${ct.gold ? ' gold' : ''}">${esc(ct.st)}</span> ` : '') + ct.line });
      if (S.hist.length > 12) S.hist.shift();
      // 變臉
      const faces = evs.filter(e => e.t === 'faceChange');
      if (faces.length) {
        faces.forEach(onEvent);
        emote('f', 'anger', 900);
        sfx('faceChange');
        say('f', pickLine('faceChange', rv.pAttr ? ZH[rv.pAttr] : ''), 1800);
        els.ebl.textContent = phaseBlurb(v1) || enemy.blurb || '';
        S.relight = true;
        if (duel.prologue && !tut) hint('h_face', ['e-intent']);
      }
      if (tut && typeof tut.onResolved === 'function') try { tut.onResolved(evs); } catch (e) { console.error(e); }
      emit('resolved', evs);
      if (ko) { await finish(ko, v1); return true; }
      await wait(600);
      if (S.destroyed) return true;
      // ---- t=2060：下一手
      S.debug.lastMs = performance.now() - t0;
      S.v = v1; S.recNext = false;
      if (S.table) S.table.dim = true;
      if (S.res) S.res.old = true;
      S.speed = baseSpeed(); setSpeed(S.speed); S.rush = false;
      root.classList.remove('busy');
      S.busy = false;
      const newIdx = act.type === 'card' ? v1.p.hand.length - 1 : null;
      renderE(v1); renderTable(v1); renderRes(); renderP(v1); renderHand(v1, { slideNew: v1.p.hand.length > v0.p.hand.length - (act.type === 'card' ? 1 : 0) ? newIdx : null }); renderAttrs(v1);
      scheduleFit();
      if (!rm()) { const cv = els.rec.querySelector('.cv'); if (cv) A(cv, [{ transform: 'translateY(-12px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 200, easing: 'ease-out' }); }
      const recd = v1.intent && v1.intent.record;
      if (recd) emote('f', 'record', 600);
      if (hs) onEvent(hs);
      handStartFx(v1);
      setPhase('choose');
      return true;
    }
    function handStartFx(v) {
      const it = v.intent; if (!it) return;
      if (it.ult) {
        stg('pose', 'f', 'warn', 1400);
        sfx('eUltWarn');
        say('f', pickLine('ultWarn'), 1800);
        hint('h_eult', ['e-intent']);
        if (v.p.aceCanReflect && !v.p.aceUsed) hint('h_reflect', ['hand-ace']);
      } else {
        const gl = new Set(it.slices.map(s => s.glyph));
        if (v.request) hint('h_request', ['request', 'hand']);
        if (v.e.quirk && v.e.quirk.type === 'skip' && v.e.quirk.val > 0) hint('h_skip', ['e-quirk']);
        void gl;
        // 變臉後「他會出」色條重新逐格亮一次
        if (S.relight) {
          S.relight = false;
          const cells = els.rec.querySelectorAll('.bar6 i');
          if (cells.length && !rm()) cells.forEach((c, k) => A(c, [{ opacity: 0.15 }, { opacity: 1 }], { duration: 160, delay: k * 70, fill: 'backwards' }));
        }
      }
    }
    async function finish(ko, v1) {
      S.ending = true;
      const result = { over: duel.over, duel };
      setPhase('over');
      root.classList.add('over');
      const lose = ko.winner === 'e';
      stg('pose', lose ? 'p' : 'f', 'ko', 700);
      sfx('ko');
      say('f', pickLine(lose ? 'win' : 'lose'), 1800);
      later(() => sfx(lose ? 'lose' : 'win'), 300);
      bigStamp(lose ? '聲望歸零' : '品味勝出', lose ? 'red' : 'ink', 900);
      onEvent(ko);
      S.v = v1;
      renderUlt(v1); renderAttrs(v1);
      emit('over', result);
      await wait(900);
      if (S.destroyed) return;
      if (typeof hooks.beforeEnd === 'function') { try { await hooks.beforeEnd(result); } catch (e) { console.error(e); } }
      if (S.destroyed) return;
      if (!rm()) { const a = A(root, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(24px)' }], { duration: 300, easing: 'ease-in', fill: 'forwards' }); if (a) await a.finished.catch(() => {}); }
      tags(false);
      S.busy = false;
      if (opts.onEnd) try { opts.onEnd(result); } catch (e) { console.error(e); }
    }

    // ---------------- 起手 ----------------
    function initialTable() {
      // 續玩：從 duel.lastReveal／lastClash 還原「上一手」兩張（變淡）
      const rv = duel.lastReveal, cl = duel.lastClash;
      if (rv && cl && !duel.over) {
        S.table = { e: slotData('e', rv, cl), p: slotData('p', rv, cl), dim: true, badges: badgesOf(cl) };
        const ct = clashText(cl);
        S.res = { st: ct.st, gold: ct.gold, line: ct.line, plain: ct.plain, old: true };
        S.hist.push({ e: S.table.e, p: S.table.p, clash: cl, line: (ct.st ? `<span class="stp">${esc(ct.st)}</span> ` : '') + ct.line });
        S.chainShown = (S.v.p.chainLen | 0) >= 2;
      }
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
      renderAttrs(S.v);
      const fresh = S.v.hand === 1 && !duel.lastClash;
      if (fresh && lines.intro && !tut) say('f', lines.intro, 1600);
      handStartFx(S.v);
      setPhase(S.sel != null ? 'attr' : 'choose');
    }

    // ---------------- autoplay（e2e 用；走正常的點擊流程與 gate） ----------------
    async function autoplay(policy) {
      const pol = (E.policies && (E.policies[policy] || E.policies.ev)) || null;
      if (!pol) return false;
      S.auto = true;
      const r = E.makeRng ? E.makeRng(1234) : Math.random;
      while (S.auto && !S.destroyed && !duel.over) {
        if (S.busy || S.infoOpen || !S.enterDone) { await wait(40); continue; }
        const act = pol(duel, r);
        if (act.type === 'card') { select(act.i); await wait(120); attrTap(act.attr, null); }
        else if (act.type === 'ace') { select('ace'); await wait(120); attrTap('ace', null); }
        else { ultTap(); await wait(120); attrTap('ult', null); }
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
      return root.querySelector(`[data-tut="${name}"]`);
    }
    const api = {
      el: root,
      elByName,
      view: () => S.v,
      duel: () => duel,
      busy: () => S.busy,
      phase: () => S.phase,
      play: act => {
        if (!act) return Promise.resolve(false);
        if (act.type === 'card') { if (!select(act.i) && S.sel !== act.i) return Promise.resolve(false); const c = S.v.p.hand[act.i]; if (!gate({ kind: 'attr', attr: act.attr, i: act.i, id: c && c.id })) return Promise.resolve(false); return play(act); }
        if (act.type === 'ace') { if (!select('ace') && S.sel !== 'ace') return Promise.resolve(false); if (!gate({ kind: 'attr', attr: aceAxis(S.v.p.ace), ace: true })) return Promise.resolve(false); return play(act); }
        if (act.type === 'ult') { if (!gate({ kind: 'ult' }) || !gate({ kind: 'ultConfirm' })) return Promise.resolve(false); return play(act); }
        return Promise.resolve(false);
      },
      select: i => select(i),
      sheet: k => { if (!k) closeSheet(); else openSheet(k); },
      autoplay: p => autoplay(p),
      stopAuto: () => { S.auto = false; },
      rerender: () => { if (S.destroyed || S.busy) return; S.v = E.view(duel); S.speed = baseSpeed(); setSpeed(S.speed); renderAll(); },
      debug: () => {
        const who = el => { const w = el && el.querySelector('.who'); return w ? w.textContent.replace(/\s+/g, ' ').trim() : null; };
        const badge = el => { const b = el && el.querySelector('.badge'); return b ? b.textContent : null; };
        return {
          phase: S.phase, view: S.v, sel: S.sel, busy: S.busy, ultArmed: S.ultArmed, enterDone: S.enterDone, introDone: S.enterDone, speed: S.speed,
          banner: S.res ? S.res.plain : '',
          slots: { e: { who: who(els.se), badge: badge(els.se), card: els.se.dataset.card || null, dim: els.se.classList.contains('dim') },
            p: { who: who(els.sp), badge: badge(els.sp), card: els.sp.dataset.card || null, dim: els.sp.classList.contains('dim') } },
          result: els.res.textContent.replace(/\s+/g, ' ').trim(), resPlain: S.res ? S.res.plain : null,
          lastClash: S.debug.hands.length ? S.debug.hands[S.debug.hands.length - 1] : null, hands: S.debug.hands.slice(), log: S.debug.log.slice(),
          ms: S.debug.lastMs || null, tight: root.classList.contains('tight'), sheet: S.sheet,
        };
      },
    };
    if (qs.get('debug') === '1') window.__dl = api;
    return { api, destroy };
  }

  const DipLabDuel = {
    mount, unmount, on,
    el: name => (CUR ? CUR.api.elByName(name) : null),
    debug: () => (CUR ? CUR.api.debug() : null),
    api: () => (CUR ? CUR.api : null),
    select: i => (CUR ? CUR.api.select(i) : false),
    play: act => (CUR ? CUR.api.play(act) : Promise.resolve(false)),
    sheet: k => { if (CUR) CUR.api.sheet(k); },
    autoplay: policy => (CUR ? CUR.api.autoplay(policy) : false),
    stopAuto: () => { if (CUR) CUR.api.stopAuto(); },
    rerender: () => { if (CUR) CUR.api.rerender(); },
    _fmt: { intentLine, previewLines, outcomeText, ultLine, clashText, badgesOf, formula, banner: c => ({ text: formula(c), stamp: clashText(c).st, line: clashText(c).plain }) },
  };
  window.DipLabDuel = DipLabDuel;
})();
