// game-lab/duel.js — 品味對決・試做版：對決畫面＋動畫佇列（Agent C）。SPEC §6.4、§5.1、§7.4、§2.5。
// window.DipLabDuel = { mount(container, opts), unmount(), debug() }
//
// ── mount 契約（Agent D 照這個接）────────────────────────────────────────────────
// DipLabDuel.mount(container, { duel, events, run, content, onEnd(result), onSave(duel), hooks })
//   duel/events：engine.startDuel／startNodeDuel 的回傳；result = { over:'win'|'lose', duel }
//   只透過 DipLabEngine.view / forecast / legalActions / isLegal / resolveTurn 讀寫對決。每次 resolveTurn 後立刻 onSave(duel)。
// hooks（全部可省略；省略時用簡易替代品）：
//   stage(el, 'duel') -> Stage   C 在 mount 時呼叫一次，el＝空的舞台橫條（寬 100%，高度會 flex 長高，約 140–200px；
//                                 請以邏輯 y=417 為底對齊裁切）。C 用到的 Stage 方法（都會先 typeof 檢查）：
//                                 foe(sprKeyOrAvatar)、put(id,key)（C 呼叫 put('p','duel')、put('f','duel')、put('o','counter')）、
//                                 actor(id)->HTMLElement（C 在上面加 dl-act/e/p 與 atk/hurt/ko/warn class，動畫 CSS 在 duel.css）、
//                                 unmount()。泡泡、💢、提示泡泡都由 C 自己畫（不需要 stage.say）。
//   sprite(sprKeyOrAvatar, px) -> HTML string   LAB_SPR／avatarRows 小人（沒有 stage 時的替代舞台與小頭像用）
//   hint(hintId) -> boolean      UI 只查／記 save.seen，第一次回 true；C 負責把 content.hints[id] 畫在老闆泡泡（h_counter 另描金框）
//   info(card)                   唱片資訊彈窗（長按 450 ms、選中卡的 ⓘ、點他的唱片、點迷你唱盤）
//   pause() / help()             頂欄 ⏸ ／ ？
//   settings() -> { selfRead, fastAnim }        每手讀一次
//   onEvent(ev, duel)            每個引擎事件播放時呼叫（圖鑑、唱片櫃等由 UI 自己記）
//   player -> { name, avatar }   （可省略）
//   artBase                      （可省略）沒有 stage 時替代舞台的圖檔路徑，預設 '<game-lab>/../art/'
// ?fast=1 → 動畫 4 倍速；結算中點畫面任一處 → 4 倍速跑完；?debug=1 時 window.__dl = DipLabDuel.debug。
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  const BASE = (function () {
    try { const s = document.currentScript && document.currentScript.src; if (s) return new URL('.', s).href; } catch (_) {}
    try { return new URL('.', location.href).href; } catch (_) { return ''; }
  })();
  const ZH = { c: '經典', o: '冷門', h: '硬蕊' }, ZH1 = { c: '經', o: '冷', h: '硬' }, ATTRS = ['c', 'o', 'h'];
  const GL = { true: '真', feint: '晃', copy: '跟', grudge: '報', eye: '盯', hidden: '？' };
  const BEATER = { c: 'o', o: 'h', h: 'c' };        // BEATER[x] 剋 x
  const BEATS = { o: 'c', h: 'o', c: 'h' };         // x 剋 BEATS[x]
  const NEXT = { c: 'o', o: 'h', h: 'c' };
  const TIER_AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };
  const TIER_ZH = { hall: '殿堂', pearl: '流亡', heresy: '異端' };
  const NEEDLE_DEG = 90;   // 唱針落點（12 點鐘起順時針）；唱臂支點在唱盤右上
  const HEAVY180 = ['............', '...kkkkkk...', '..kkkkkkkk..', '.kkkkkkkkkk.', '.kkkkggkkkk.', '.kkkg..gkkk.', '.kkkg..gkkk.', '.kkkkggkkkk.', '.kkkkkkkkkk.', '..kkkkkkkk..', '...kkkkkk...', '............'];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const Eng = () => window.DipLabEngine;
  const Fx = () => window.DipLabFx || null;
  const sfx = (n, o) => { const f = Fx(); if (f) try { f.sfx(n, o); } catch (_) {} };
  const qs = new URLSearchParams(location.search || '');
  const FAST = qs.get('fast') === '1';

  function coverSrc(card) {
    if (!card) return '';
    if (card.localCover) { try { return new URL(card.localCover, BASE).href; } catch (_) {} }
    return card.coverUrl || '';
  }
  function coverHTML(card) {
    if (!card) return '<div class="dl-noimg"></div>';
    const src = coverSrc(card);
    const fb = card.localCover && card.coverUrl ? ` data-fb="${esc(card.coverUrl)}"` : '';
    return src ? `<img class="dl-cv" src="${esc(src)}"${fb} alt="${esc(card.artist + '《' + card.album + '》')}" draggable="false">`
      : `<div class="dl-noimg">${esc(card.album)}</div>`;
  }
  const starsOf = (card, plus) => ATTRS.map(a => `<span class="${a}">${ZH1[a]}<b>${(card[a] | 0) + (plus || 0)}</b></span>`).join('');

  // ---------------------------------------------------------------- 預覽行（只整理 forecast，不算傷害）
  function resText(o) {
    if (!o) return '不知道';
    switch (o.kind) {
      case 'counter': return '他−' + o.toE;
      case 'countered': return '你−' + o.toP;
      case 'mirrorWin': return '撞 他−' + o.toE;
      case 'mirrorLose': return '撞 你−' + o.toP;
      case 'tie': return '撞 平';
      case 'hegemonyE': case 'hegemonyP': return '霸權 互不傷';
      case 'ult': return '他−' + o.toE;
      case 'reflect': return '七星回擊 他−' + o.toE;
      case 'block': return '割捨防禦 你−' + o.toP;
      case 'eultHit': return '吃下 你−' + o.toP;
      case 'trade': return '對轟 他−' + o.toE + ' 你−' + o.toP;
    }
    return '';
  }
  const resCls = o => !o ? 'eq' : o.toE > o.toP ? 'ok' : o.toP > o.toE ? 'ng' : 'eq';
  function groupRows(fc, selfRead) {
    if (!fc) return [];
    if (fc.ult) return [{ ult: true, n: 6, res: resText(fc.outcome), cls: resCls(fc.outcome), outcome: fc.outcome }];
    const rows = [], map = {};
    for (const s of fc.slices) {
      let key, row;
      if (s.attr == null || !s.outcome) {
        key = '?';
        row = map[key] || (map[key] = { hidden: true, attr: null, glyph: 'hidden', n: 0, res: '不知道', cls: 'eq' });
      } else {
        const feint = s.glyph === 'feint', res = resText(s.outcome);
        key = (selfRead ? 'g:' + s.glyph : 'a:' + s.attr + (feint ? 'f' : '')) + '|' + res;
        row = map[key] || (map[key] = { attr: s.attr, glyph: s.glyph, feint, n: 0, res, cls: resCls(s.outcome), outcome: s.outcome, cells: [] });
      }
      if (!row.n) rows.push(row);
      row.n++; if (row.cells) row.cells.push(s.i);
    }
    const ord = r => r.hidden ? 99 : (selfRead ? ['true', 'feint', 'copy', 'grudge', 'eye'].indexOf(r.glyph) : ATTRS.indexOf(r.attr) * 2 + (r.feint ? 1 : 0));
    rows.sort((a, b) => ord(a) - ord(b));
    return rows;
  }
  function rowLabel(r, selfRead) {
    if (r.ult) return '';
    if (r.hidden) return '？×' + r.n;
    if (selfRead) return GL[r.glyph] + '×' + r.n;
    return ZH1[r.attr] + '×' + r.n + (r.feint ? '晃' : '');
  }
  function rowLong(r) {
    if (r.ult) return r.res;
    if (r.hidden) return `他有 ${r.n} 格還沒看過`;
    return `他出${ZH[r.attr]}${r.feint ? '（晃）' : ''}時 ${r.res.replace('他−', '他扣 ').replace('你−', '你扣 ')}`;
  }

  // ---------------------------------------------------------------- 結果橫幅（由 clash.breakdown 組字）
  const sgnTerm = t => (t.v >= 0 ? '＋' : '−') + t.label + ' ' + Math.abs(t.v);
  const MAIN_K = ['atk', 'K', 'def', 'mirrorP', 'mirrorE', 'ult', 'eult', 'block', 'reflect'];
  function atkStr(t) {
    if (!t) return '';
    if (t.note === '點播+2') return `${t.label}${t.star}＋點播 2`;
    if (t.note && /^\+\d星$/.test(t.note)) return `${t.label}${t.star}${t.note.replace('+', '＋')}`;
    return `${t.label}${t.v}`;
  }
  function banner(c, ctx) {
    ctx = ctx || {};
    const bd = c.breakdown || [], by = k => bd.find(t => t.k === k), ex = bd.filter(t => !MAIN_K.includes(t.k));
    const extras = ex.map(sgnTerm).join('');
    const feint = c.glyph === 'feint';
    const fe = `虛晃！他喊${ZH[c.bubble] || ''}，出的是${ZH[c.eAttr] || ''}：`;
    let stamp = null, cls = 'ink', text = '', tone = '';
    switch (c.kind) {
      case 'counter': case 'countered': {
        const atk = by('atk'), K = by('K'), def = by('def');
        const N = c.kind === 'counter' ? c.toE : c.toP;
        const defStr = def ? `${def.label}${def.star}${def.note && /星$/.test(def.note) && def.note !== '擋住星差' ? '（' + def.note.replace('+', '＋') + '）' : ''}` : '';
        const main = def && def.note === '擋住星差' ? `（${def.label}${def.star} 擋住星差）賭注${K ? K.v : c.K}` : `${atkStr(atk)}−${defStr}＋賭注${K ? K.v : c.K}`;
        const body = main + extras + '＝' + N;
        if (c.kind === 'counter') { stamp = c.stamp === 'seeThrough' ? '看穿' : '讀中'; cls = 'gold'; tone = 'win'; text = `${stamp}！${c.counterName || ''} ${body}`; }
        else if (c.stamp === 'feintHit') { stamp = '虛晃'; cls = 'red'; tone = 'lose'; text = fe + body; }
        else { stamp = '被剋'; cls = 'ink'; tone = 'lose'; text = `被剋！${c.counterName || ''} ${body}`; }
        break;
      }
      case 'mirrorWin': case 'mirrorLose': {
        const p = by('mirrorP'), e = by('mirrorE');
        const ps = p ? (p.note === '點播+2' ? `你的${ZH[c.pAttr]}${p.star}＋點播 2` : `你的${ZH[c.pAttr]}${Math.abs(p.v)}`) : '';
        const es = e ? (e.note && /星$/.test(e.note) ? `他的${ZH[c.eAttr]}${e.star}${e.note.replace('+', '＋')}` : `他的${ZH[c.eAttr]}${Math.abs(e.v)}`) : '';
        if (c.kind === 'mirrorWin') { stamp = '撞招'; cls = 'ink'; tone = 'win'; text = `撞招！${ps}−${es}${extras}＝${c.toE}`; }
        else if (feint) { stamp = '虛晃'; cls = 'red'; tone = 'lose'; text = fe + `撞招 ${es}−${ps}${extras}＝${c.toP}`; }
        else { stamp = '撞招'; cls = 'ink'; tone = 'lose'; text = `撞招！${es}−${ps}${extras}＝${c.toP}`; }
        break;
      }
      case 'tie': {
        const p = by('mirrorP'), e = by('mirrorE');
        stamp = '撞招'; cls = 'ink'; text = `撞招！你的${ZH[c.pAttr]}${p ? Math.abs(p.v) : ''} 對 他的${ZH[c.eAttr]}${e ? Math.abs(e.v) : ''}：平手，雙方氣勢 +1`;
        break;
      }
      case 'hegemonyE': case 'hegemonyP':
        stamp = '霸權'; cls = 'grey'; text = '霸權：王牌被剋，這手互不傷害'; break;
      case 'ult': {
        const u = by('ult');
        stamp = '輾壓'; cls = 'red'; tone = 'win'; text = `品味輾壓！氣勢 ${u ? u.v : c.toE}${extras}＝${c.toE}，他這手作廢`; break;
      }
      case 'trade': {
        const u = by('ult'), eu = by('eult'), m = by('matrix');
        stamp = '對轟'; cls = 'red'; text = `對轟！你的品味輾壓 ${u ? u.v : ''}${m ? sgnTerm(m) : ''} 對 他的品味輾壓 ${eu ? eu.v : ''}：他−${c.toE} 你−${c.toP}`; break;
      }
      case 'reflect': {
        const K = by('K');
        stamp = '七星回擊'; cls = 'gold'; tone = 'win'; text = `七星回擊！7＋賭注${K ? K.v : c.K}＝${c.toE}，他的氣勢歸零`; break;
      }
      case 'block': {
        const b = by('block'), iso = by('isolation');
        stamp = '割捨防禦'; cls = 'blue'; tone = c.toP ? 'lose' : 'win';
        text = `割捨防禦：${ZH[c.pAttr]}${b ? b.star : ''}${iso ? sgnTerm(iso).replace('−', '＋') : ''} 擋下，吃 ${c.toP}`; break;
      }
      case 'eultHit': {
        const eu = by('eult');
        stamp = '吃下'; cls = 'red'; tone = 'lose';
        text = `吃下輾壓：他的品味輾壓・${ZH[c.eAttr] || ''} ${eu ? eu.v : c.toP}，你這手沒剋到它＝${c.toP}`; break;
      }
    }
    let found = '';
    if (ctx.habit) {
      const g = ctx.habit.glyph, ea = c.eAttr, last = ctx.prevLast;
      let why = '';
      if (g === 'copy') why = last ? `這手他跟了你上一手的${ZH[last]}` : '沒有上一手，他照喊的出';
      else if (g === 'grudge') why = last ? `這手他剋了你上一手的${ZH[last]}` : '沒有上一手，他照喊的出';
      else if (g === 'eye') why = `這手他剋了你最大張的${ZH[BEATS[ea]] || ''}`;
      else if (g === 'feint') why = `這手他出剋你剋招的${ZH[ea] || ''}`;
      else why = `這手他照喊的出${ZH[ea] || ''}`;
      found = `🔍 發現：他有『${GL[g] || '？'}』。${why}`;
    }
    return { stamp, cls, text, found, tone };
  }
  function subLine(c, target) {
    const bd = c.breakdown || [], by = k => bd.find(t => t.k === k);
    const ex = bd.filter(t => !MAIN_K.includes(t.k) && (target !== 'p' || c.kind !== 'trade'));
    const parts = [];
    switch (c.kind) {
      case 'counter': case 'countered': {
        const atk = by('atk'), K = by('K'), def = by('def');
        parts.push('賭注 ' + (K ? K.v : c.K));
        const diff = (atk ? atk.v : 0) + (def ? def.v : 0);
        if (diff > 0) parts.push('星差 ' + diff); else if (def && def.note === '擋住星差') parts.push('星差擋住');
        break;
      }
      case 'mirrorWin': case 'mirrorLose': { const p = by('mirrorP'), e = by('mirrorE'); parts.push('星差 ' + Math.abs((p ? p.v : 0) + (e ? e.v : 0))); break; }
      case 'ult': { const u = by('ult'); parts.push('氣勢 ' + (u ? u.v : c.toE)); break; }
      case 'trade': { if (target === 'p') { const eu = by('eult'); return '他的品味輾壓 ' + (eu ? eu.v : c.toP); } const u = by('ult'); parts.push('氣勢 ' + (u ? u.v : '')); break; }
      case 'reflect': { const K = by('K'); parts.push('7', '賭注 ' + (K ? K.v : c.K)); break; }
      case 'block': { const eu = by('eult'), b = by('block'); return `輾壓 ${eu ? eu.v : ''}−擋 ${b ? -b.v : 0}` + bd.filter(t => t.k === 'isolation').map(sgnTerm).join(''); }
      case 'eultHit': { const eu = by('eult'); return '品味輾壓 ' + (eu ? eu.v : c.toP); }
    }
    let s = parts.join('＋');
    ex.forEach(t => { s += (t.v >= 0 ? '＋' : '−') + t.label + ' ' + Math.abs(t.v); });
    return s;
  }

  // ================================================================ instance
  let CUR = null;
  function mount(container, opts) {
    unmount();
    CUR = createDuel(container, opts || {});
    return CUR.api;
  }
  function unmount() { if (CUR) { try { CUR.destroy(); } catch (e) { console.error(e); } CUR = null; } }

  function createDuel(container, opts) {
    const E = Eng();
    if (!E) throw new Error('DipLabDuel: DipLabEngine not loaded');
    const duel = opts.duel, content = opts.content || window.DipLabContent || {}, run = opts.run || null;
    const hooks = opts.hooks || {};
    const enemy = (content.enemies && content.enemies[duel.e.id]) || { id: duel.e.id, name: duel.e.name };
    const lines = (content.lines && content.lines[duel.e.id]) || {};
    const node = run && run.pending && E.findNode ? E.findNode(run, run.pending.nodeId) : null;
    const settings = () => { try { return (hooks.settings && hooks.settings()) || {}; } catch (_) { return {}; } };
    const S = {
      v: E.view(duel), sel: null, armed: false, busy: false, destroyed: false,
      speed: 1, anims: new Set(), timers: new Set(), rot: 0, lastLine: {}, seenLocal: {},
      stage: null, fb: {}, bubT: {}, hintOn: false, hintTimer: 0, recAttr: null,
      musicHand: -9, lastPlayed: null, ending: false, debug: { events: [], banner: '', rows: null, act: null, log: [] },
      offMusic: null, toggle: null, keyH: null, introDone: false,
    };
    const baseSpeed = () => FAST ? 4 : (settings().fastAnim ? 2 : 1);
    S.speed = baseSpeed();
    const rm = () => { const f = Fx(); return f ? f.reducedMotion() : false; };

    // ---------------- timing (speed-aware) ----------------
    function wait(ms) {
      return new Promise(res => {
        if (S.destroyed) return res();
        let left = ms, last = performance.now();
        const tick = () => {
          S.timers.delete(h);
          if (S.destroyed) return res();
          const now = performance.now(); left -= (now - last) * S.speed; last = now;
          if (left <= 0) res(); else { h = setTimeout(tick, Math.max(4, Math.min(20, left / S.speed))); S.timers.add(h); }
        };
        let h = setTimeout(tick, Math.max(4, Math.min(20, ms / S.speed))); S.timers.add(h);
      });
    }
    function later(fn, ms) { const h = setTimeout(() => { S.timers.delete(h); if (!S.destroyed) fn(); }, ms); S.timers.add(h); return h; }
    function A(el, kf, o) {
      if (!el || !el.animate) return null;
      let a; try { a = el.animate(kf, o); } catch (_) { return null; }
      a.playbackRate = S.speed; S.anims.add(a);
      const done = () => S.anims.delete(a); a.finished.then(done, done);
      return a;
    }
    function setSpeed(s) { S.speed = s; S.anims.forEach(a => { try { a.playbackRate = s; } catch (_) {} }); const f = Fx(); if (f && f.setSpeed) f.setSpeed(s); }
    function cssDur(el, ms) { if (el) el.style.animationDuration = Math.round(ms / S.speed) + 'ms'; }

    // ---------------- DOM skeleton ----------------
    const root = document.createElement('div');
    root.className = 'dl-root';
    root.setAttribute('role', 'application');
    root.setAttribute('aria-label', '品味對決');
    root.innerHTML = `
      <div class="dl-top">
        <span class="dl-time"></span><span class="dl-tname"></span><span class="dl-hid" aria-label="隱藏習慣"></span>
        <span class="dl-stake key" aria-live="polite"></span><span class="sp"></span>
        <span class="dl-snd"></span>
        <button type="button" class="dl-ic dl-help" aria-label="小抄">？</button>
        <button type="button" class="dl-ic dl-pause" aria-label="暫停選單">⏸</button>
      </div>
      <div class="dl-stage"><div class="dl-stagehost"></div><div class="dl-board"></div><div class="dl-bubs">
        <div class="dl-bub f tl"></div><div class="dl-bub o tl hint"></div><div class="dl-bub p"></div><div class="dl-anger">💢</div></div></div>
      <div class="dl-ename"><span class="nm"></span><span class="tt"></span><span class="dl-phase"></span><span class="lab">聲望</span>
        <div class="dl-hp e"><div class="gh"></div><div class="fl"></div></div><span class="dl-hpn e key"></span></div>
      <div class="dl-eqi"><span class="lab">氣勢</span><div class="dl-segs"></div><span class="qn"></span><span class="uat"></span></div>
      <div class="dl-mid">
        <button type="button" class="dl-rec" aria-label="他擺上唱盤的唱片"><div class="cv"></div><div class="dl-stars key"></div></button>
        <div class="dl-discw"><div class="dl-disc"><div class="dl-plate"><div class="dl-lbl"></div></div>
          <div class="kill"></div><div class="dl-arm"><i class="base"></i><i class="rod"></i></div></div></div>
        <div class="dl-side"><div class="chips"></div><div class="dl-table"><span class="who">你出</span><div class="tc"></div></div></div>
      </div>
      <div class="dl-hist"></div>
      <div class="dl-res"><div class="dl-ban" aria-live="polite"><span class="bs"></span><span class="bt key"></span></div>
        <button type="button" class="dl-tt" aria-label="正在播的唱片"><div class="rec"><div class="lb"></div></div><i class="ta"></i></button></div>
      <div class="dl-me"><div class="l">
          <div class="row"><span class="lab">聲望</span><div class="dl-hp me"><div class="gh"></div><div class="fl"></div></div><span class="dl-hpn p key"></span></div>
          <div class="row"><span class="lab">氣勢</span><div class="dl-vu"></div><span class="qn"></span><span class="dl-peak">PEAK</span>
            <span class="dl-chain"><span class="lab">相生</span><i>●</i><i>●</i><i>●</i><span class="nx"></span></span></div>
        </div><button type="button" class="dl-ult key" aria-label="品味輾壓"></button></div>
      <div class="dl-hand"></div>
      <div class="dl-attrs"></div>`;
    container.innerHTML = '';
    container.appendChild(root);
    const $ = s => root.querySelector(s);
    const els = {
      time: $('.dl-time'), tname: $('.dl-tname'), hid: $('.dl-hid'), stake: $('.dl-stake'), snd: $('.dl-snd'),
      stageWrap: $('.dl-stage'), host: $('.dl-stagehost'), board: $('.dl-board'), bubs: $('.dl-bubs'),
      bf: $('.dl-bub.f'), bo: $('.dl-bub.o'), bp: $('.dl-bub.p'), anger: $('.dl-anger'),
      nm: $('.dl-ename .nm'), tt: $('.dl-ename .tt'), phase: $('.dl-phase'), ehp: $('.dl-hp.e'), ehpn: $('.dl-hpn.e'),
      eqi: $('.dl-eqi'), segs: $('.dl-segs'), eqn: $('.dl-eqi .qn'), uat: $('.dl-eqi .uat'),
      rec: $('.dl-rec'), recCv: $('.dl-rec .cv'), stars: $('.dl-stars'), disc: $('.dl-disc'), plate: $('.dl-plate'), lbl: $('.dl-lbl'),
      kill: $('.dl-disc .kill'), arm: $('.dl-arm .rod'), side: $('.dl-side'), chips: $('.dl-side .chips'), table: $('.dl-table'), tableC: $('.dl-table .tc'),
      hist: $('.dl-hist'), ban: $('.dl-ban'), bs: $('.dl-ban .bs'), bt: $('.dl-ban .bt'), tt2: $('.dl-tt'), ttLb: $('.dl-tt .lb'),
      php: $('.dl-hp.me'), phpn: $('.dl-hpn.p'), vu: $('.dl-vu'), pqn: $('.dl-me .row:nth-child(2) .qn'), peak: $('.dl-peak'), chain: $('.dl-chain'),
      ult: $('.dl-ult'), hand: $('.dl-hand'), attrs: $('.dl-attrs'),
    };
    // 高度：容器沒給高度時，用可見高度
    later(() => { if (root.getBoundingClientRect().height < 480) root.style.height = Math.max(560, window.innerHeight - root.getBoundingClientRect().top) + 'px'; }, 0);
    els.segs.innerHTML = '<i></i>'.repeat(10) + '<b class="ul"></b>';
    els.vu.innerHTML = Array.from({ length: 10 }, (_, i) => `<i class="${i < 5 ? 'g' : i < 7 ? 'y' : 'r'}"></i>`).join('');
    // 封面載入失敗：本機 → 遠端 → 文字
    root.addEventListener('error', ev => {
      const t = ev.target; if (!t || t.tagName !== 'IMG') return;
      if (t.dataset.fb && t.src !== t.dataset.fb) { const fb = t.dataset.fb; t.removeAttribute('data-fb'); t.src = fb; return; }
      const d = document.createElement('div'); d.className = 'dl-noimg'; d.textContent = (t.alt || '').replace(/^.*《|》$/g, '');
      t.replaceWith(d);
    }, true);

    // ---------------- stage ----------------
    const artBase = hooks.artBase || (BASE ? new URL('../art/', BASE).href : '../art/');
    function spriteHTML(key, px) {
      if (hooks.sprite) { try { const h = hooks.sprite(key, px); if (h) return h; } catch (e) { console.error(e); } }
      try {
        if (key && typeof key === 'object' && typeof window.avatarRows === 'function' && typeof window.pixArtHTML === 'function') return window.pixArtHTML(window.avatarRows(key), px);
        if (typeof window.sprRows === 'function' && typeof window.pixArtHTML === 'function') {
          const heads = { boss: ['.....kkkkkk.....', '.....kkkkkk.....', '.....kkkkkk.....', '...kkkkkkkkkk...', '....ssssssss....', '....sskssyys....', '.....ssssss.....'] };
          const head = heads[key] || ['................', '.....kkkkkk.....', '....kkkkkkkk....', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'];
          const shirt = key === 'owner' ? 'n' : key === 'p' ? 'b' : 'd';
          return window.pixArtHTML(window.sprRows(head, shirt, 'k'), px);
        }
      } catch (_) {}
      return `<div style="width:${px}px;height:${px}px;background:#333;border-radius:40% 40% 8px 8px"></div>`;
    }
    const foeKey = enemy.spr || enemy.avatar || 'e0';
    const playerAv = (hooks.player && hooks.player.avatar) || (content.avatarsFallback && content.avatarsFallback[0]) || null;
    function setupStage() {
      if (hooks.stage) {
        try { S.stage = hooks.stage(els.host, 'duel') || null; } catch (e) { console.error(e); S.stage = null; }
      }
      const st = S.stage;
      if (st) {
        try { if (typeof st.foe === 'function') st.foe(foeKey); } catch (e) { console.error(e); }
        try { if (typeof st.put === 'function') { st.put('p', 'duel'); st.put('f', 'duel', foeKey); st.put('o', 'counter'); } } catch (e) { console.error(e); }
      }
      if (!st || typeof st.actor !== 'function') fallbackStage(!!st);
      ['f', 'p', 'o'].forEach(id => { const a = actor(id); if (a) a.classList.add('dl-act', id === 'f' ? 'e' : id); });
    }
    function fallbackStage(spritesOnly) {
      const W = els.host.clientWidth || 390, H = els.host.clientHeight || 160, s = W / 448;
      const top = H - 417 * s;
      const fb = document.createElement('div'); fb.className = 'dl-fb';
      if (!spritesOnly) {
        fb.style.backgroundImage = `url('${artBase}shop2-bg.jpg')`; fb.style.backgroundSize = '100% auto'; fb.style.backgroundPosition = `0 ${top}px`;
        fb.innerHTML = `<div class="lay" style="top:${top}px;height:${492 * s}px;background-image:url('${artBase}shop2-fg-back.png');z-index:6"></div>
          <div class="lay" style="top:${top}px;height:${492 * s}px;background-image:url('${artBase}shop2-fg-front.png');z-index:20"></div>`;
      }
      const put = (id, x, y, key, z) => {
        const a = document.createElement('div'); a.className = 'act ' + id + ' bob';
        a.style.width = (78 * s) + 'px'; a.style.left = ((x - 39) * s) + 'px'; a.style.bottom = ((417 - (y + 5)) * s) + 'px'; a.style.zIndex = z;
        a.innerHTML = spriteHTML(key, Math.round(78 * s)); fb.appendChild(a); S.fb[id] = a;
      };
      put('o', 174, 325, 'owner', 2);
      put('p', 48, 412, playerAv || 'p', 12);
      put('f', 196, 412, foeKey, 12);
      els.host.appendChild(fb);
    }
    function actor(id) {
      const st = S.stage;
      if (st && typeof st.actor === 'function') { try { const a = st.actor(id); if (a) return a; } catch (_) {} }
      return S.fb[id] || null;
    }
    function sprAnim(id, cls, ms) {
      const a = actor(id); if (!a) return;
      a.classList.remove('atk', 'hurt'); void a.offsetWidth;
      a.classList.add(cls); cssDur(a, ms);
      later(() => { a.classList.remove(cls); a.style.animationDuration = ''; }, ms / S.speed + 30);
    }

    // ---------------- bubbles ----------------
    function bubbleAt(which) {
      const sr = els.stageWrap.getBoundingClientRect(), W = sr.width, H = sr.height;
      const a = actor(which), r = a && a.getBoundingClientRect();
      const ax = r && r.width ? r.left - sr.left + r.width / 2 : (which === 'f' ? W * 0.44 : which === 'p' ? W * 0.11 : W * 0.39);
      const ay = r && r.height ? r.top - sr.top : H - 70;
      return { W, H, ax, ay, r: r && r.width ? { l: r.left - sr.left, t: r.top - sr.top, w: r.width, h: r.height } : null };
    }
    function say(which, html, o) {
      o = o || {};
      const b = which === 'f' ? els.bf : which === 'o' ? els.bo : els.bp;
      clearTimeout(S.bubT[which]);
      if (!html) { b.classList.remove('on'); return; }
      b.className = 'dl-bub ' + which + (which === 'o' ? ' tl hint' : which === 'f' ? ' tl' : '') + (o.tone ? ' ' + o.tone : '');
      b.innerHTML = html;
      const P = bubbleAt(which);
      b.style.maxWidth = (which === 'f' ? Math.max(120, P.W - (P.r ? P.r.l + P.r.w * 0.78 : P.W * 0.5) - 6) : which === 'o' ? Math.min(230, P.W - 150) : 170) + 'px';
      b.style.left = '0px'; b.style.top = '0px';
      const bw = b.offsetWidth, bh = b.offsetHeight;
      let x, y;
      if (which === 'f') { x = P.r ? P.r.l + P.r.w * 0.8 : P.ax + 30; y = Math.max(4, (P.r ? P.r.t + P.r.h * 0.36 : P.ay + 20) - bh); }
      else if (which === 'o') { x = P.r ? P.r.l + P.r.w * 0.82 : P.ax + 30; y = Math.max(19, P.r ? P.r.t + P.r.h * 0.2 - bh : 19); }
      else { x = P.ax - bw / 2; y = Math.max(26, P.ay - bh - 6); }
      x = Math.max(4, Math.min(P.W - bw - 4, x));
      b.style.left = x + 'px'; b.style.top = y + 'px';
      const tx = Math.max(6, Math.min(bw - 18, P.ax - x - 6));
      b.style.setProperty('--tx', tx + 'px'); b.style.setProperty('--ox', (tx + 6) + 'px');
      b.classList.remove('on'); void b.offsetWidth; b.classList.add('on');
      if (o.ms) S.bubT[which] = later(() => b.classList.remove('on'), o.ms);
      if (which === 'f' && o.voice !== false) voice(3);
    }
    function voice(n) {
      const f = Fx(), vo = enemy.voice; if (!f || !vo || !f.soundOn()) return;
      for (let i = 0; i < n; i++) later(() => f.blip(vo.freq, vo.wave, vo.jitter || 0), i * 70);
    }
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
    function bubbleForHand(v) {
      const it = v.intent; if (!it) return;
      if (it.ult) {
        const w = pickLine('ultWarn');
        say('f', `<b>殺氣騰騰：品味輾壓・${ZH[it.attr]} ${it.dmg}</b>${w ? '<br>' + esc(w) : ''}`, { tone: 'red' });
        return;
      }
      const recd = it.record || {};
      const line = recd.tier && lines.aceOut ? pickLine('aceOut') : pickLine('bubble');
      say('f', `${line ? esc(line) : ''}<span class="call ${it.bubble}">${ZH[it.bubble]}！</span>`);
    }

    // ---------------- hints (owner bubble) ----------------
    // 這幾個提示是「這一手不看懂就會吃虧」的，可以蓋掉正在顯示的一般提示（例：序章變臉那手同時接成 2 連）
    const HINT_PRIORITY = { h_face: 1, h_eult: 1, h_reflect: 1 };
    function hint(id) {
      const text = content.hints && content.hints[id];
      if (!text || (S.hintOn && !HINT_PRIORITY[id])) return false;
      let ok = false;
      if (hooks.hint) { try { ok = !!hooks.hint(id); } catch (e) { console.error(e); } }
      else if (!S.seenLocal[id]) { S.seenLocal[id] = true; ok = true; }
      if (!ok) return false;
      S.hintOn = true;
      say('o', esc(text), { ms: 3500 });
      clearTimeout(S.hintTimer);
      S.hintTimer = later(() => { S.hintOn = false; }, 3500);
      S.debug.log.push('hint:' + id);
      return true;
    }
    function hideHint() { if (S.hintOn) { say('o', null); S.hintOn = false; } }
    function firstHint(ids) { for (const id of ids) if (id && hint(id)) return id; return null; }
    function glyphHints(v) {
      const out = [];
      const sl = v.intent && !v.intent.ult ? v.intent.slices : [];
      ['copy', 'grudge', 'eye'].forEach(g => { if (sl.some(s => s.glyph === g)) out.push('h_' + g); });
      if (sl.some(s => s.glyph === 'hidden')) out.push('h_hidden');
      return out;
    }

    // ---------------- render ----------------
    function hpBar(bar, hp, max, notches, crossed) {
      const pct = x => Math.max(0, Math.min(100, x / max * 100));
      bar.querySelector('.fl').style.width = pct(hp) + '%';
      const gh = bar.querySelector('.gh'); gh.classList.remove('red'); gh.style.width = pct(hp) + '%';
      bar.querySelectorAll('.nt').forEach(n => n.remove());
      (notches || []).forEach((n, i) => {
        const t = document.createElement('i'); t.className = 'nt' + (crossed && crossed[i] ? ' crack' : ''); t.style.left = pct(n) + '%';
        t.title = '變臉刻度 ' + n; bar.appendChild(t);
      });
    }
    function hpAnim(bar, from, to, max) {
      const pct = x => Math.max(0, Math.min(100, x / max * 100));
      const fl = bar.querySelector('.fl'), gh = bar.querySelector('.gh');
      if (to < from) {
        gh.classList.remove('red'); gh.style.width = pct(from) + '%'; fl.style.transition = 'none'; fl.style.width = pct(to) + '%';
        void fl.offsetWidth; fl.style.transition = '';
        later(() => { gh.style.transitionDuration = (400 / S.speed) + 'ms'; gh.classList.add('red'); gh.style.width = pct(to) + '%'; }, 250 / S.speed);
      } else { gh.style.width = pct(to) + '%'; fl.style.width = pct(to) + '%'; }
    }
    function renderTop(v) {
      els.time.textContent = (node && node.time) || (v.prologue ? '21:30' : '');
      els.tname.textContent = enemy.name || v.e.name || '';
      const hasHid = v.e.hasHidden;
      els.hid.textContent = hasHid ? (v.e.hiddenGlyph ? GL[v.e.hiddenGlyph] : '？') : '';
      els.hid.classList.toggle('known', !!v.e.hiddenGlyph);
      els.hid.title = v.e.hiddenGlyph ? '發現過的習慣：' + GL[v.e.hiddenGlyph] : '他還藏一個習慣';
      els.stake.innerHTML = `賭注×<b>${v.K}</b>`;
    }
    function renderEnemy(v) {
      els.nm.textContent = enemy.name || v.e.name;
      els.tt.textContent = enemy.title || '';
      const labels = enemy.phaseLabels;
      els.phase.textContent = labels && labels[v.e.phase] && v.e.notches.length ? labels[v.e.phase] : '';
      hpBar(els.ehp, v.e.hp, v.e.maxHp, v.e.notches, v.e.notches.map((n, i) => i < v.e.phase));
      els.ehpn.textContent = Math.max(0, v.e.hp);
      eqi(v.e.qi, v);
    }
    function eqi(q, v) {
      v = v || S.v;
      els.segs.querySelectorAll('i').forEach((s, i) => s.classList.toggle('on', i < q));
      const ul = els.segs.querySelector('.ul');
      if (v.e.ultAt <= 10) { ul.style.display = ''; ul.style.left = (v.e.ultAt * 11 - 2) + 'px'; } else ul.style.display = 'none';
      els.eqn.textContent = q;
      const it = v.intent;
      els.eqi.classList.toggle('ult', !!(it && it.ult));
      if (v.e.ultAt > 10) els.uat.innerHTML = '<span style="color:var(--gray)">不輾壓</span>';
      else { const ua = it && it.ult ? it.attr : v.e.ultAttr; els.uat.innerHTML = `${v.e.ultAt}⚡<span class="ut ${ua}">${ZH[ua] || ''}</span>`; }
    }
    function discSlices(v) {
      const it = v.intent;
      if (it && !it.ult && it.slices) return it.slices.map(s => ({ i: s.i, glyph: s.glyph, attr: s.attr }));
      const d = duel.e.disc || [];
      return d.map((g, i) => ({ i, glyph: g === 'hidden' ? (duel.e.habitKnown && duel.e.hidden ? duel.e.hidden : 'hidden') : g, attr: null }));
    }
    function tint(a) { return a === 'c' ? 'var(--tc)' : a === 'o' ? 'var(--to)' : a === 'h' ? 'var(--th)' : 'var(--tn)'; }
    function renderDisc(v) {
      const selfRead = settings().selfRead && !v.prologue;
      const sl = discSlices(v), ult = !!(v.intent && v.intent.ult);
      const stops = sl.map((s, i) => `${selfRead || ult ? 'var(--paper)' : tint(s.attr)} ${i * 60}deg ${i * 60 + 59}deg, rgba(0,0,0,.35) ${i * 60 + 59}deg ${i * 60 + 60}deg`).join(',');
      els.lbl.style.background = `conic-gradient(${stops})`;
      const rot = S.rot;
      const strong = a => a === 'c' ? 'var(--c)' : a === 'o' ? 'var(--o)' : a === 'h' ? 'var(--h)' : '#a8a8a8';
      const showDot = !selfRead && !ult;
      const inr = sl.map((s, i) => `${showDot ? strong(s.attr) : '#d8d0bc'} ${i * 60}deg ${i * 60 + 58}deg, #f4ecd8 ${i * 60 + 58}deg ${i * 60 + 60}deg`).join(',');
      let h = `<div class="dl-inr" style="background:conic-gradient(${inr})"></div><div class="dl-hl"></div>`;
      sl.forEach((s, i) => {
        const a = i * 60 + 30;
        const pos = r => `transform:rotate(${a}deg) translateY(-${r}px) rotate(${-a}deg)`;
        const al = s.glyph === 'hidden' ? '？：還沒看過的習慣' : `${GL[s.glyph]}：${glyphWhy(s.glyph, v)}${s.attr ? '（' + ZH[s.attr] + '）' : ''}`;
        h += `<div class="dl-sl gl" data-i="${i}" style="${pos(33)}" aria-label="${esc(al)}"><div class="in" style="transform:rotate(${-rot}deg)"><span class="g key">${GL[s.glyph] || "？"}</span></div></div>`;
        if (showDot && s.attr) h += `<div class="dl-sl d" data-i="${i}" style="${pos(16)}"><div class="in" style="transform:rotate(${-rot}deg)">${ZH1[s.attr]}</div></div>`;
      });
      h += '<div class="dl-hole"></div>';
      els.lbl.innerHTML = h;
      els.plate.style.transform = `rotate(${rot}deg)`;
      els.disc.classList.toggle('ult', ult);
      els.kill.innerHTML = ult ? `殺氣騰騰<br>輾壓・${ZH[v.intent.attr]} <b>${v.intent.dmg}</b>` : '';
      els.disc.setAttribute('aria-label', ult ? `殺氣騰騰：品味輾壓・${ZH[v.intent.attr]} ${v.intent.dmg}` : '氣場唱盤：' + sl.map(s => GL[s.glyph] + (s.attr ? ZH1[s.attr] : '')).join('、'));
    }
    function glyphWhy(g, v) {
      const last = v.p.lastAttr;
      switch (g) {
        case 'true': return '照喊的出';
        case 'feint': return '出剋你剋招的';
        case 'copy': return last ? '你上一手' + ZH[last] : '出你上一手';
        case 'grudge': return last ? '剋你上一手' + ZH[last] : '剋你上一手';
        case 'eye': return '剋你最大張';
      }
      return '';
    }
    function renderRecord(v) {
      const it = v.intent, rc = it && it.record;
      if (!rc) { els.recCv.innerHTML = ''; els.stars.innerHTML = ''; return; }
      const plus = rc.tier ? 0 : (v.e.starPlus || 0);
      const call = it.ult ? `<span class="call" style="background:var(--red)">輾壓 ${ZH[it.attr]}</span>` : `<span class="call ${it.bubble}">喊 ${ZH[it.bubble]}</span>`;
      els.recCv.innerHTML = coverHTML(rc) + call + (plus ? `<span class="plus">＋${plus}</span>` : '') + (rc.tier ? `<span class="acetag dl-tier ${rc.tier}">${TIER_ZH[rc.tier]}</span>` : '');
      els.recCv.className = 'cv' + (rc.tier ? ' dl-shine ' + rc.tier : '');
      els.stars.innerHTML = starsOf(rc, plus);
      els.stars.classList.toggle('boost', !!plus);
      els.rec.setAttribute('aria-label', `他擺上唱盤：${rc.artist}《${rc.album}》 經${(rc.c | 0) + plus} 冷${(rc.o | 0) + plus} 硬${(rc.h | 0) + plus}，喊${ZH[it.bubble] || ''}`);
    }
    function renderSide(v) {
      const ch = [];
      if (v.request) ch.push(`<span class="dl-chip req">點播：${esc((content.requests && content.requests[v.request]) || v.request)}</span>`);
      if (v.e.quirk && v.e.quirk.type === 'skip') ch.push(`<span class="dl-chip skip">跳針 +${v.e.quirk.val}</span>`);
      if (v.p.aceCanReflect) ch.push('<span class="dl-chip reflect">王牌接得住</span>');
      if (v.e.starPlus) ch.push(`<span class="dl-chip bside">唱片 ＋${v.e.starPlus} 星</span>`);
      els.chips.innerHTML = ch.join('');
      els.board.textContent = v.request ? '今晚點播：' + ((content.requests && content.requests[v.request]) || v.request) : '';
    }
    function renderHist(v) {
      const h = (v.history || []).slice(-3);
      if (!h.length) { els.hist.innerHTML = '<span class="lab">史冊</span><span class="lab">（還沒出過手）</span>'; return; }
      els.hist.innerHTML = '<span class="lab">史冊</span>' + h.map(x => {
        const mk = x.toE > x.toP ? '<b class="ok">✔</b>' : x.toP > x.toE ? '<b class="ng">✘</b>' : '<b class="eq">＝</b>';
        const pa = x.pAct === 'ult' ? '<b class="h">輾</b>' : `<b class="${x.pAttr}">${ZH1[x.pAttr]}</b>`;
        const ea = x.eUlt ? '<b class="h">輾</b>' : `<b class="${x.eAttr}">${ZH1[x.eAttr]}</b>${x.glyph === 'feint' ? '晃' : ''}`;
        return `<span>${pa}vs${ea}${mk}</span>`;
      }).join('');
    }
    function renderMe(v, qOverride) {
      hpBar(els.php, v.p.hp, v.p.maxHp, [], null);
      els.phpn.textContent = Math.max(0, v.p.hp);
      vu(qOverride != null ? qOverride : v.p.qi);
      const n = v.p.chainLen | 0;
      els.chain.querySelectorAll('i').forEach((d, i) => d.classList.toggle('on', i < n));
      els.chain.querySelector('.nx').innerHTML = v.p.chainLast ? `→<span class="${NEXT[v.p.chainLast]}">${ZH1[NEXT[v.p.chainLast]]}</span>` : '';
      renderUlt(v);
    }
    function vu(q) {
      els.vu.querySelectorAll('i').forEach((d, i) => d.classList.toggle('on', i < q));
      els.pqn.textContent = q;
      els.peak.classList.toggle('on', q >= 6);
    }
    function ultForecast(v) {
      if (v.p.qi < 6 || v.over) return null;
      let fc = null; try { fc = E.forecast(duel, { type: 'ult' }); } catch (_) { return null; }
      if (!fc) return null;
      if (fc.ult) return fc.outcome;
      const s = fc.slices.find(x => x.outcome); return s ? s.outcome : null;
    }
    function renderUlt(v) {
      const o = ultForecast(v), b = els.ult;
      b.classList.toggle('ready', !!o); b.classList.toggle('armed', !!(o && S.armed));
      b.disabled = !o;
      if (!o) { S.armed = false; b.innerHTML = `品味輾壓<small>氣勢 6 起</small>`; b.setAttribute('aria-label', '品味輾壓（氣勢 6 起）'); return; }
      const eUlt = v.intent && v.intent.ult;
      const main = eUlt ? `對轟` : `品味輾壓 ${o.toE}`;
      const sub = eUlt ? `他−${o.toE} 你−${o.toP}` : '保證命中';
      b.innerHTML = S.armed ? `放！<small>${main}${eUlt ? ' ' + sub : ''}</small>` : `${main}<small>${sub}</small>`;
      b.setAttribute('aria-label', S.armed ? '再點一次放出品味輾壓' : (eUlt ? `對轟：他扣 ${o.toE}、你扣 ${o.toP}` : `品味輾壓：他扣 ${o.toE}`));
    }
    function cardTile(card, i, v) {
      const req = v.request && (card.tags || []).includes(v.request);
      const mod = card.washed ? '洗過' : card.worn ? '九成新' : '';
      return `<button type="button" class="dl-card${S.sel === i ? ' sel' : ''}" data-i="${i}" aria-pressed="${S.sel === i}"
        aria-label="${esc(`${card.artist}《${card.album}》 經${card.c} 冷${card.o} 硬${card.h}${req ? '，點播' : ''}`)}">
        <div class="cvw">${coverHTML(card)}</div>
        <div class="nums key">${ATTRS.map(a => `<span class="${a}">${ZH1[a]}<b>${card[a] | 0}</b></span>`).join('')}</div>
        ${req ? '<span class="req">點播✓</span>' : ''}${mod ? `<span class="mod">${mod}</span>` : ''}<span class="inf" data-info="${i}" aria-label="唱片資訊">ⓘ</span></button>`;
    }
    function renderHand(v) {
      const ace = v.p.ace;
      let h = '';
      if (ace) {
        const ax = TIER_AXIS[ace.tier] || 'c';
        h += `<button type="button" class="dl-card dl-ace ${ace.tier}${v.p.aceUsed ? ' used' : ''}${S.sel === 'ace' ? ' sel' : ''}" data-i="ace" ${v.p.aceUsed ? 'aria-disabled="true"' : ''}
          aria-label="${esc(`王牌 ${TIER_ZH[ace.tier]} ${ace.artist}《${ace.album}》 ${ZH[ax]} 7${v.p.aceUsed ? '，本場已用' : ''}`)}">
          <div class="cvw dl-shine ${ace.tier}">${coverHTML(ace)}<span class="tier ${ace.tier}">王牌</span></div>
          <div class="at">${TIER_ZH[ace.tier]}<span class="${ax}">${ZH1[ax]}7</span></div>
          <div class="at2">${v.p.aceUsed ? '本場已用' : '每場一次'}</div><span class="inf" data-info="ace" aria-label="唱片資訊">ⓘ</span></button>`;
      }
      v.p.hand.forEach((c, i) => { h += cardTile(c, i, v); });
      els.hand.innerHTML = h;
    }
    function renderAttrs(v) {
      const sel = S.sel;
      const selfRead = settings().selfRead && !v.prologue;
      if (v.over) { els.attrs.innerHTML = '<div class="ph">對決結束</div>'; return; }
      if (sel == null) {
        els.attrs.innerHTML = `<div class="ph">${v.intent && v.intent.ult ? '他要品味輾壓：挑一張剋得到它的盤擋下來' : '先挑一張盤'}</div>`;
        S.debug.rows = null; return;
      }
      const acts = sel === 'ace' ? [{ type: 'ace' }] : ATTRS.map(a => ({ type: 'card', i: sel, attr: a }));
      const card = sel === 'ace' ? v.p.ace : v.p.hand[sel];
      const dbg = {};
      let h = '';
      acts.forEach(act => {
        const attr = act.type === 'ace' ? (TIER_AXIS[card.tier] || 'c') : act.attr;
        let fc = null; try { fc = E.forecast(duel, act); } catch (e) { console.error(e); }
        const rows = groupRows(fc, selfRead);
        dbg[attr] = rows.map(r => ({ label: rowLabel(r, selfRead), res: r.res, attr: r.attr, feint: !!r.feint, hidden: !!r.hidden, n: r.n, cells: r.cells || null, ult: !!r.ult }));
        const reqB = act.type === 'card' && v.request && (card.tags || []).includes(v.request) ? '<span class="bn">＋點播 2</span>' : '';
        const star = attr && card ? (card[attr] | 0) : 0;
        const isRec = S.recAttr && S.recAttr === attr;
        const ultHand = fc && fc.ult;
        const rowsH = rows.map(r => {
          if (r.ult) return `<div class="rw"><span class="${r.cls}">${esc(r.res)}</span></div>`;
          const bar = r.hidden ? 'n' : (selfRead ? 'n' : r.attr);
          const lab = rowLabel(r, selfRead);
          return `<div class="rw"><i class="${bar}"></i><span class="gx">${r.feint && !selfRead ? lab.replace('晃', '<span class="fe">晃</span>') : esc(lab)}</span><span class="${r.cls}">${esc(r.res)}</span></div>`;
        }).join('');
        const al = `出${ZH[attr]}：` + rows.map(rowLong).join('、');
        h += `<button type="button" class="dl-ab key ${attr}${act.type === 'ace' ? ' wide' : ''}${ultHand ? ' ultrow' : ''}${isRec ? ' rec' : ''}" data-act='${JSON.stringify(act)}' data-attr="${attr}" aria-label="${esc(al)}">
          <span class="hd"><span class="${attr}">${ZH[attr]}</span> ${star}${reqB}${act.type === 'ace' ? '<span class="k">王牌</span>' : `<span class="k">${'QWE'[ATTRS.indexOf(attr)]}</span>`}</span>${rowsH}</button>`;
      });
      els.attrs.innerHTML = h;
      S.debug.rows = dbg;
    }
    function renderBanner(info, opt) {
      opt = opt || {};
      if (!info) { els.bs.textContent = ''; els.bs.className = 'bs'; els.bt.innerHTML = opt.text ? `<span class="dim">${esc(opt.text)}</span>` : ''; els.ban.className = 'dl-ban'; return; }
      els.bs.textContent = opt.noStamp ? '' : (info.stamp || '');
      els.bs.className = 'bs ' + (info.cls || '') + (opt.pop ? ' pop' : '');
      els.bt.innerHTML = esc(info.text) + (info.found ? `<span class="fd">${esc(info.found)}</span>` : '');
      els.ban.className = 'dl-ban' + (info.tone ? ' ' + info.tone : '') + (info.found || info.text.length > 40 ? ' dense' : '') + (opt.flash ? ' flash' : '');
      S.debug.banner = info.text + (info.found ? ' ' + info.found : '');
    }
    function renderTurntable() {
      const f = Fx(); const c = f && f.music ? f.music.current() : null;
      const src = c ? coverSrc(c) : '';
      els.ttLb.style.backgroundImage = src ? `url("${src.replace(/"/g, '%22')}")` : '';
      els.tt2.setAttribute('aria-label', c ? `正在播：${c.artist}《${c.album}》` : '唱盤');
      els.tt2.dataset.has = c ? '1' : '';
    }
    function renderAll() {
      const v = S.v;
      renderTop(v); renderEnemy(v); renderRecord(v); renderDisc(v); renderSide(v); renderHist(v); renderMe(v); renderHand(v); renderAttrs(v);
      els.table.classList.remove('on');
    }

    // ---------------- input ----------------
    function select(i) {
      if (S.busy || S.v.over || S.ending) return;
      const v = S.v;
      if (i === 'ace' && (!v.p.ace || v.p.aceUsed)) { sfx('tick'); return; }
      if (i !== 'ace' && (i < 0 || i >= v.p.hand.length)) return;
      S.armed = false;
      S.sel = S.sel === i ? null : i;
      sfx(S.sel == null ? 'tick' : 'select');
      if (S.sel != null) hint('h_forecast');
      renderHand(v); renderAttrs(v); renderUlt(v);
    }
    function infoCard(which) {
      const v = S.v; const card = which === 'ace' ? v.p.ace : which === 'rec' ? (v.intent && v.intent.record) : which === 'tt' ? (Fx() && Fx().music.current()) : v.p.hand[which];
      if (card && hooks.info) { try { hooks.info(card); } catch (e) { console.error(e); } }
    }
    function tapUlt() {
      if (S.busy || S.v.over || S.ending) return;
      const o = ultForecast(S.v); if (!o) return;
      if (!S.armed) { S.armed = true; sfx('ultCharge'); renderUlt(S.v); return; }
      S.armed = false; play({ type: 'ult' });
    }
    // 長按 450 ms ＝唱片資訊；一般點擊＝選取
    let lp = null;
    root.addEventListener('pointerdown', ev => {
      if (S.busy) { if (S.speed < 4) setSpeed(4); return; }
      const t = ev.target.closest('.dl-card, .dl-rec, .dl-tt');
      if (!t) return;
      const key = t.classList.contains('dl-rec') ? 'rec' : t.classList.contains('dl-tt') ? 'tt' : (t.dataset.i === 'ace' ? 'ace' : +t.dataset.i);
      lp = { key, fired: false, x: ev.clientX, y: ev.clientY, timer: later(() => { if (lp) { lp.fired = true; infoCard(lp.key); } }, 450) };
    });
    const cancelLp = () => { if (lp) { clearTimeout(lp.timer); } };
    root.addEventListener('pointermove', ev => { if (lp && (Math.abs(ev.clientX - lp.x) > 10 || Math.abs(ev.clientY - lp.y) > 10)) { cancelLp(); lp = null; } });
    root.addEventListener('pointerup', cancelLp);
    root.addEventListener('pointercancel', () => { cancelLp(); lp = null; });
    root.addEventListener('contextmenu', ev => { if (ev.target.closest('.dl-card, .dl-rec')) ev.preventDefault(); });
    root.addEventListener('click', ev => {
      const t = ev.target;
      if (lp && lp.fired) { lp = null; ev.preventDefault(); return; }
      lp = null;
      if (t.closest('.dl-pause')) { if (hooks.pause) hooks.pause(); return; }
      if (t.closest('.dl-help')) { if (hooks.help) hooks.help(); return; }
      if (S.busy) return;
      const inf = t.closest('[data-info]');
      if (inf) { infoCard(inf.dataset.info === 'ace' ? 'ace' : +inf.dataset.info); return; }
      const card = t.closest('.dl-card');
      if (card) { select(card.dataset.i === 'ace' ? 'ace' : +card.dataset.i); return; }
      const ab = t.closest('.dl-ab');
      if (ab) { let act = null; try { act = JSON.parse(ab.dataset.act); } catch (_) {} if (act) play(act); return; }
      if (t.closest('.dl-ult')) { tapUlt(); return; }
      if (t.closest('.dl-rec')) { infoCard('rec'); return; }
      if (t.closest('.dl-tt')) { infoCard('tt'); return; }
      if (S.armed) { S.armed = false; renderUlt(S.v); }
    });
    S.keyH = ev => {
      if (!root.isConnected || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      const tg = ev.target; if (tg && (tg.tagName === 'INPUT' || tg.tagName === 'TEXTAREA')) return;
      if (S.busy) { if (S.speed < 4) setSpeed(4); return; }
      const k = ev.key.toLowerCase();
      if (k >= '1' && k <= '4') { select(+k - 1); ev.preventDefault(); return; }
      if (k === '5' || k === 'a') { select('ace'); ev.preventDefault(); return; }
      if (k === 'q' || k === 'w' || k === 'e') {
        const attr = { q: 'c', w: 'o', e: 'h' }[k];
        if (S.sel === 'ace') { const ax = TIER_AXIS[S.v.p.ace.tier]; if (ax === attr) play({ type: 'ace' }); }
        else if (S.sel != null) play({ type: 'card', i: S.sel, attr });
        ev.preventDefault(); return;
      }
      if (k === 'u') { tapUlt(); ev.preventDefault(); return; }
      if (k === 'escape') { S.sel = null; S.armed = false; renderHand(S.v); renderAttrs(S.v); renderUlt(S.v); }
    };
    document.addEventListener('keydown', S.keyH);

    // ---------------- music ----------------
    function cardById(id) { return id && content.cards ? content.cards[id] || null : null; }
    function bigMusic(card, force) {
      const f = Fx(); if (!f || !card || !card.previewUrl) return;
      const hand = duel.hand;
      if (!force && hand - S.musicHand < 2) return;
      S.musicHand = hand;
      f.music.play(card).catch(() => {});
    }

    // ================================================================ 動畫佇列
    function emit(ev) { if (hooks.onEvent) { try { hooks.onEvent(ev, duel); } catch (e) { console.error(e); } } }
    function anchorOf(target) {
      const a = actor(target === 'e' ? 'f' : 'p');
      if (a && a.getBoundingClientRect().width) return a;
      return target === 'e' ? els.ehp : els.php;
    }
    function floatDmg(target, amount, sub, big) {
      const f = Fx(); if (!f) return;
      const a = anchorOf(target);
      f.floatText(a, '−' + amount, sub, (target === 'e' ? 'toE' : 'toP') + (amount >= 6 || big ? ' big' : ''), { dy: 8 });
    }
    function floatSmall(anchor, text, cls) { const f = Fx(); if (f) f.floatText(anchor, text, null, 'small ' + (cls || ''), { ms: 520, rise: 20 }); }

    async function flyCard(srcEl, card, attr, isUlt) {
      const tgt = els.table;
      els.tableC.innerHTML = coverHTML(card) + (attr ? `<span class="tg ${attr}">${ZH[attr]} ${card[attr] | 0}</span>` : '');
      tgt.classList.add('on'); tgt.style.visibility = 'hidden';
      if (!srcEl || rm()) { tgt.style.visibility = ''; A(tgt, [{ opacity: 0 }, { opacity: 1 }], { duration: 150 }); return; }
      const r0 = srcEl.getBoundingClientRect(), r1 = tgt.getBoundingClientRect();
      const fly = document.createElement('div');
      fly.style.cssText = `position:fixed;left:${r0.left}px;top:${r0.top}px;width:${r0.width}px;height:${r0.height}px;z-index:2147480100;pointer-events:none;border:1px solid #111;background:#fff;overflow:hidden;transform-origin:0 0;box-shadow:0 8px 22px rgba(0,0,0,.25)`;
      fly.innerHTML = coverHTML(card);
      document.body.appendChild(fly);
      const sc = r1.width / Math.max(1, r0.width);
      const a = A(fly, [{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${r1.left - r0.left}px,${r1.top - r0.top}px) scale(${sc})` }], { duration: 220, easing: 'ease-out', fill: 'forwards' });
      await wait(220);
      fly.remove(); if (a) a.cancel();
      tgt.style.visibility = '';
    }
    async function spinTo(cellIdx) {
      const R0 = S.rot, base = R0 + 540, target = NEEDLE_DEG - (cellIdx * 60 + 30);
      const R1 = base + (((target - base) % 360) + 360) % 360;
      const ins = Array.from(els.lbl.querySelectorAll('.dl-sl .in'));
      if (rm()) {
        S.rot = R1; els.plate.style.transform = `rotate(${R1}deg)`; ins.forEach(n => { n.style.transform = `rotate(${-R1}deg)`; });
        els.arm.style.transform = 'rotate(101deg)';
        await wait(150);
      } else {
        const o = { duration: 560, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' };
        const aa = [A(els.plate, [{ transform: `rotate(${R0}deg)` }, { transform: `rotate(${R1}deg)` }], o)];
        ins.forEach(n => aa.push(A(n, [{ transform: `rotate(${-R0}deg)` }, { transform: `rotate(${-R1}deg)` }], o)));
        await wait(450);
        const arm = A(els.arm, [{ transform: 'rotate(88deg)' }, { transform: 'rotate(103deg)', offset: 0.7 }, { transform: 'rotate(101deg)' }], { duration: 230, easing: 'ease-in', fill: 'forwards' });
        await wait(230);
        S.rot = R1;
        els.plate.style.transform = `rotate(${R1}deg)`; ins.forEach(n => { n.style.transform = `rotate(${-R1}deg)`; });
        els.arm.style.transform = 'rotate(101deg)';
        aa.forEach(a => a && a.cancel()); if (arm) arm.cancel();
      }
      sfx('needle');
    }
    function lightSlice(cellIdx, attr, glyph) {
      const hl = els.lbl.querySelector('.dl-hl');
      const col = attr === 'c' ? 'rgba(31,95,174,.9)' : attr === 'o' ? 'rgba(106,63,160,.9)' : attr === 'h' ? 'rgba(193,22,40,.9)' : 'rgba(80,80,80,.8)';
      if (hl) {
        hl.style.background = `conic-gradient(from ${cellIdx * 60}deg, ${col} 0deg 60deg, transparent 60deg 360deg)`;
        hl.style.boxShadow = '';
        A(hl, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
      }
      els.lbl.querySelectorAll(`.dl-sl[data-i="${cellIdx}"]`).forEach(n => n.classList.add('hit'));
    }
    async function resetDisc() {
      const R0 = S.rot; if (!R0) return;
      const R1 = Math.ceil(R0 / 360) * 360;
      const ins = Array.from(els.lbl.querySelectorAll('.dl-sl .in'));
      if (!rm() && R1 !== R0) {
        const o = { duration: 300, easing: 'ease-in-out', fill: 'forwards' };
        const aa = [A(els.plate, [{ transform: `rotate(${R0}deg)` }, { transform: `rotate(${R1}deg)` }], o)];
        ins.forEach(n => aa.push(A(n, [{ transform: `rotate(${-R0}deg)` }, { transform: `rotate(${-R1}deg)` }], o)));
        const hl = els.lbl.querySelector('.dl-hl'); if (hl) A(hl, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
        A(els.arm, [{ transform: 'rotate(101deg)' }, { transform: 'rotate(88deg)' }], { duration: 260, easing: 'ease-out', fill: 'forwards' });
        await wait(300);
        aa.forEach(a => a && a.cancel());
      }
      S.rot = 0; els.plate.style.transform = 'rotate(0deg)'; els.arm.style.transform = '';
      els.arm.getAnimations && els.arm.getAnimations().forEach(a => a.cancel());
    }
    async function flipSlices(newSl, onlyIdx, per) {
      const v = S.v;
      for (let i = 0; i < newSl.length; i++) {
        if (onlyIdx && !onlyIdx.includes(i)) continue;
        const g = els.lbl.querySelector(`.dl-sl.gl[data-i="${i}"]`); if (!g) continue;
        const inner = g.querySelector('.in'); const sp = g.querySelector('.g');
        A(inner, [{ transform: `rotate(${-S.rot}deg) scaleX(1)` }, { transform: `rotate(${-S.rot}deg) scaleX(0.05)`, offset: 0.5 }, { transform: `rotate(${-S.rot}deg) scaleX(1)` }], { duration: per * 2 });
        later(() => { if (sp) sp.textContent = GL[newSl[i].glyph] || '？'; }, per / S.speed);
        sfx('tick');
        await wait(per);
      }
      void v;
    }
    async function ultFx(qi, who, dmg) {
      const f = Fx();
      sfx('ultCharge');
      if (f) f.flash(who === 'p' ? '#c11628' : '#4a0a13', 120);
      const ov = document.createElement('div'); ov.className = 'dl-ov dl-ultfx' + (who === 'e' ? ' e' : '');
      const art = typeof window.pixArtHTML === 'function' ? window.pixArtHTML(HEAVY180, 120) : '<div style="width:120px;height:120px;border-radius:50%;background:#111"></div>';
      ov.innerHTML = `<div class="vin">${art}</div><div class="tx">${who === 'p' ? '品味輾壓 ' + dmg : '他的品味輾壓 ' + dmg}</div>`;
      document.body.appendChild(ov);
      const turns = 1.2 + (Math.max(6, Math.min(10, qi || 6)) - 6) / 4 * 1.3;
      if (!rm()) {
        A(ov.querySelector('.vin'), [{ transform: 'scale(.2) rotate(0deg)', opacity: 0 }, { transform: `scale(1) rotate(${turns * 360}deg)`, opacity: 1 }], { duration: 500, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' });
        A(ov.querySelector('.tx'), [{ transform: 'scale(2.2)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 300, delay: 250, easing: 'cubic-bezier(.2,1.4,.4,1)', fill: 'both' });
      } else A(ov, [{ opacity: 0 }, { opacity: 1 }], { duration: 150, fill: 'forwards' });
      await wait(560);
      sfx('ult');
      if (f) f.shake(root, 10, 300 / S.speed);
      await wait(260);
      A(ov, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
      later(() => ov.remove(), 220 / S.speed + 20);
    }
    async function reflectFx(K, aceCard) {
      const f = Fx();
      sfx('reflect');
      bigMusic(aceCard, true);
      // 凍結 → 反相 → 王牌框放大 → 大字＋震 → 收回（≤1.6 s）
      await wait(220);
      if (!rm()) { root.classList.add('invert'); await wait(130); root.classList.remove('invert'); }
      const aceEl = els.hand.querySelector('.dl-ace .cvw') || els.table;
      const r = aceEl.getBoundingClientRect();
      const ov = document.createElement('div'); ov.className = 'dl-ov dl-refx';
      const tier = aceCard && aceCard.tier || 'hall';
      ov.innerHTML = `<div class="dim"></div><div class="fr dl-shine ${tier}" style="left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px"></div>
        <div class="big"><b>七星回擊</b><span>7＋賭注 ${K}</span></div>`;
      document.body.appendChild(ov);
      const fr = ov.querySelector('.fr');
      const W = window.innerWidth, H = window.innerHeight;
      A(ov.querySelector('.dim'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      A(fr, [{ left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' }, { left: '6px', top: '6px', width: (W - 12) + 'px', height: (H - 12) + 'px' }], { duration: 350, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
      A(ov.querySelector('.big'), [{ transform: 'scale(3)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 300, delay: 250, easing: 'cubic-bezier(.2,1.4,.4,1)', fill: 'both' });
      await wait(480);
      if (f) { f.shake(document.body, 12, 300 / S.speed); f.vibrate(30); }
      await wait(280);
      A(ov, [{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' });
      later(() => ov.remove(), 260 / S.speed + 20);
    }

    async function play(act) {
      if (S.busy || S.ending || S.v.over) return;
      if (!E.isLegal(duel, act)) return;
      const before = S.v;
      S.busy = true; root.classList.add('busy'); S.armed = false; hideHint();
      els.ult.classList.remove('armed', 'ready'); els.ult.disabled = true;
      S.speed = baseSpeed(); setSpeed(S.speed);
      const selKey = act.type === 'ace' ? 'ace' : act.type === 'card' ? act.i : null;
      const srcEl = selKey == null ? null : (els.hand.querySelector(`.dl-card[data-i="${selKey}"] .cvw`));
      const pCard = act.type === 'card' ? before.p.hand[act.i] : act.type === 'ace' ? before.p.ace : null;
      S.debug.act = act; S.debug.shownRows = S.debug.rows;
      let events;
      try { events = E.resolveTurn(duel, act); } catch (e) { console.error(e); S.busy = false; root.classList.remove('busy'); return; }
      try { if (opts.onSave) opts.onSave(duel); } catch (e) { console.error(e); }
      const after = E.view(duel);
      S.debug.events = events; S.debug.t0 = performance.now();
      if (pCard) S.lastPlayed = pCard;
      S.sel = null;
      S.recAttr = null;   // h_counter 的金框只給序章第 1 手；之後（尤其變臉後）再框冷門會誤導
      try { await playEvents(events, { before, after, act, srcEl, pCard }); }
      catch (e) { console.error(e); }
      S.debug.t1 = performance.now();
      if (S.destroyed) return;
      S.v = after;
      renderAll();
      S.busy = false; root.classList.remove('busy');
      S.speed = baseSpeed(); setSpeed(S.speed);
      if (after.over) finish(after.over);
      else afterHandHints(after);
    }

    async function playEvents(evs, ctx) {
      const { before, after, act, srcEl, pCard } = ctx;
      const f = Fx();
      const clash = evs.find(e => e.t === 'clash'), reveal = evs.find(e => e.t === 'reveal'), habit = evs.find(e => e.t === 'habitRevealed');
      const hp = { p: before.p.hp, e: before.e.hp };
      const hsEv = evs.find(e => e.t === 'handStart');
      const qiGain = (hsEv && hsEv.qiGain) || { p: 0, e: 0 };
      let bannerInfo = null, faceSeen = false;
      // hand cards: hide the played one
      if (act.type === 'card' || act.type === 'ace') {
        const el = els.hand.querySelector(`.dl-card[data-i="${act.type === 'ace' ? 'ace' : act.i}"]`);
        if (el) { el.classList.remove('sel'); if (act.type === 'card') el.classList.add('gone'); }
      }
      els.attrs.innerHTML = '<div class="ph">　</div>';
      say('o', null);
      const t0 = performance.now(), base = S.speed;
      const guard = () => { const el = (performance.now() - t0) * (S.speed / base); if (el > 1350 && S.speed < base * 2) setSpeed(base * 2); };   // 1350：連 KO 那手也壓在 2.2 s 內
      for (const ev of evs) {
        if (S.destroyed) return;
        emit(ev);
        if (ev.t === 'damage' || ev.t === 'faceChange' || ev.t === 'handStart' || ev.t === 'ko') guard();
        switch (ev.t) {
          case 'reveal': {
            const ps = [];
            if (ev.pAct === 'ult') ps.push(ultFx(before.p.qi, 'p', clash ? clash.toE : before.p.qi));
            else ps.push(flyCard(srcEl, ev.pCard, ev.pAttr));
            // 他的唱片原地翻面閃一下
            els.rec.classList.remove('flip'); void els.rec.offsetWidth; els.rec.classList.add('flip');
            if (!ev.eUlt && ev.cellIdx >= 0) ps.push(spinTo(ev.cellIdx));
            await Promise.all(ps);
            if (ev.pAct !== 'ult') {
              sfx('slam');
              els.table.classList.remove('slam'); els.rec.classList.remove('slam'); void els.table.offsetWidth;
              els.table.classList.add('slam'); els.rec.classList.add('slam');
            }
            if (!ev.eUlt && ev.cellIdx >= 0) {
              lightSlice(ev.cellIdx, ev.eAttr, ev.glyph);
              await wait(200);
              if (ev.glyph === 'feint') hint('h_feint');
            } else await wait(80);
            break;
          }
          case 'habitRevealed': {
            const idx = []; discSlices(before).forEach((s, i) => { if (s.glyph === 'hidden') idx.push(i); });
            const ns = discSlices(before).map(s => s.glyph === 'hidden' ? { glyph: ev.glyph } : s);
            sfx('flip');
            await flipSlices(ns, idx, 80);
            // 蓋在他的唱片上（不蓋橫幅：橫幅的「🔍 發現：…」那行要馬上讀得到）
            if (f) f.stamp(els.rec || els.disc, '🔍 發現', 'green', 600);
            break;
          }
          case 'acePassive': {
            floatSmall(els.segs, `${ev.name} 他氣勢${ev.qi}`, 'qi');
            eqi(Math.max(0, before.e.qi + (ev.qi || 0)), before);
            break;
          }
          case 'chain': {
            const dots = els.chain.querySelectorAll('i');
            for (let i = 0; i < ev.len; i++) { if (dots[i]) { dots[i].classList.add('on'); } sfx('qiUp', { n: 3 + i * 2 }); }
            floatSmall(els.chain, `${ev.skill} ${ev.len} 連 ＋${ev.qi} 氣勢${ev.dmg ? ' ＋' + ev.dmg + ' 傷害' : ''}`, 'qi');
            if (ev.len >= 3) { els.chain.classList.remove('sweep'); void els.chain.offsetWidth; els.chain.classList.add('sweep'); }
            if (ev.len === 2) hint('h_chain');
            break;
          }
          case 'clash': {
            bannerInfo = banner(ev, { habit, prevLast: before.p.lastAttr });
            const k = ev.kind;
            // 小人出手
            if (ev.toE > 0) sprAnim('p', 'atk', 520);
            if (ev.toP > 0) sprAnim('f', 'atk', 520);
            // 音效＋章
            if (k === 'reflect') {
              renderBanner(bannerInfo, { noStamp: true });
              await reflectFx(ev.K, before.p.ace);
            } else {
              const st = bannerInfo.stamp, big = { 讀中: 'gold', 看穿: 'gold', 虛晃: 'red', 霸權: 'grey', 割捨防禦: 'blue' }[st];
              if (k === 'counter') sfx(ev.stamp === 'seeThrough' ? 'seeThrough' : 'readHit');
              else if (k === 'countered') sfx(ev.stamp === 'feintHit' ? 'feintHit' : 'hurt');
              else if (k === 'mirrorWin' || k === 'mirrorLose' || k === 'tie') sfx(ev.glyph === 'feint' && k === 'mirrorLose' ? 'feintHit' : 'mirror');
              else if (k === 'block') sfx('mirror');
              else if (k === 'eultHit' || k === 'trade') { await ultFx(before.e.qi, 'e', ev.toP); }
              if (big && f) {
                const sub = ev.counterName ? ev.counterName : null;
                const subCls = k === 'counter' ? ev.pAttr : k === 'countered' ? ev.eAttr : null;
                f.stamp(els.disc, st + '！', big, 900, sub, subCls);
                if (st === '看穿') f.sparks(els.disc, 14);
              }
              renderBanner(bannerInfo, { pop: true, flash: true });
              if (k === 'hegemonyE' || k === 'hegemonyP') hint('h_hegemony');
            }
            // 台詞
            if (k === 'counter' || k === 'reflect' || k === 'mirrorWin') { const l = pickLine('countered'); if (l) say('f', esc(l), { ms: 1600 }); }
            else if (ev.toP > 0) { const l = pickLine('hit'); if (l) say('f', esc(l), { ms: 1600 }); }
            // 音樂大時刻
            if (k === 'counter' && ev.stamp === 'seeThrough' && ev.toE >= 6 && pCard) bigMusic(pCard);
            if (k === 'ult' && ev.toE >= 6) bigMusic(S.lastPlayed || before.p.ace);
            // 氣勢條：先到「這手結束」的值（下一手的漲勢在 handStart 才加）
            later(() => {
              eqi(Math.max(0, after.e.qi - (qiGain.e || 0)), before);
              qiTo(before.p.qi, Math.max(0, after.p.qi - (qiGain.p || 0)));
            }, 120);
            await wait(k === 'reflect' ? 60 : 240);
            break;
          }
          case 'attrFx': {
            const isP = ev.who === 'p';
            if (ev.hp) { hp[ev.who] = Math.min(isP ? before.p.maxHp : before.e.maxHp, hp[ev.who] + ev.hp); floatSmall(isP ? els.php : els.ehp, `＋${ev.hp} 聲望`, ''); if (isP) { els.phpn.textContent = hp.p; } else els.ehpn.textContent = hp.e; }
            if (ev.qi) floatSmall(isP ? els.vu : els.segs, `＋${ev.qi} 氣勢`, 'qi');
            if (ev.oppQi) floatSmall(isP ? els.segs : els.vu, `${isP ? '他' : '你'}氣勢 ${ev.oppQi}`, 'neg');
            break;
          }
          case 'damage': {
            const tgt = ev.target, amt = ev.amount;
            const from = hp[tgt]; hp[tgt] = from - amt;
            const glyphFe = clash && clash.glyph === 'feint';
            const isUlt = clash && (clash.kind === 'ult' || clash.kind === 'trade' || clash.kind === 'eultHit' || clash.kind === 'reflect');
            if (f) {
              floatDmg(tgt, amt, clash ? subLine(clash, tgt) : '', isUlt);
              if (clash && clash.kind !== 'reflect') await (f.hitStop ? f.hitStop(90) : wait(90));
              if (!isUlt) f.shake(root, glyphFe ? 6 : 4, (glyphFe ? 160 : 120) / S.speed);
              f.vibrate(15);
            }
            if (tgt === 'e') {
              hpAnim(els.ehp, from, hp.e, before.e.maxHp); els.ehpn.textContent = Math.max(0, hp.e);
              // 變臉刻度裂開
              (before.e.notches || []).forEach((n, i) => {
                if (from > n && hp.e <= n) { const nt = els.ehp.querySelectorAll('.nt')[i]; if (nt) { nt.classList.add('crack'); cssDur(nt, 180); } }
              });
              sprAnim('f', 'hurt', 550);
            } else {
              hpAnim(els.php, from, hp.p, before.p.maxHp); els.phpn.textContent = Math.max(0, hp.p);
              sprAnim('p', 'hurt', 550);
              if (!f || clash.kind !== 'countered') sfx('hurt');
            }
            await wait(220);
            break;
          }
          case 'revive': {
            hpAnim(els.php, 0, ev.hp, before.p.maxHp); els.phpn.textContent = ev.hp; hp.p = ev.hp;
            if (f) { f.stamp(els.php, '神秘見本盤', 'green', 700); f.flash('#ffffff', 150); }
            const l = (content.lines && content.lines.player && content.lines.player.revive) || '還沒完。';
            say('p', esc(l), { ms: 1800 });
            sfx('win');
            await wait(500);
            break;
          }
          case 'ko': {
            const pWin = ev.winner === 'p';
            sfx('ko');
            const a = actor(pWin ? 'f' : 'p'); if (a) { a.classList.remove('atk', 'hurt', 'bob'); a.classList.add('ko'); cssDur(a, 700); }
            // 藏家輸的那句「……這張，送你。」留給打烊那一幕講，這裡只說「有意思。」免得連講兩次
            const l = (pWin && enemy.boss) ? pickLine('countered') : pickLine(pWin ? 'lose' : 'win');
            if (l) say('f', esc(l), { voice: true });
            if (f) f.stamp(els.disc, pWin ? '勝出！' : '倒下', pWin ? 'gold' : 'red', 700, ev.timeout ? '時間到' : null);
            bigMusic(pWin ? (S.lastPlayed || before.p.ace) : before.intent && before.intent.record, true);
            later(() => sfx(pWin ? 'win' : 'lose'), 380);
            await wait(750);
            break;
          }
          case 'faceChange': {
            faceSeen = true;
            sfx('faceChange');
            const st = S.stage;
            showAnger(true); later(() => showAnger(false), 1600);
            const fa = actor('f'); if (fa) { fa.classList.add('warn', 'rage'); later(() => fa.classList.remove('warn', 'rage'), 1600); }
            const l = pickLine('faceChange', ZH[duel.p.lastAttr] || ZH[after.p.lastAttr] || '');
            if (l) say('f', esc(l), { tone: 'bold', ms: 2200 });
            // 唱盤一格一格翻面
            const ns = discSlices(after);
            await flipSlices(ns, null, 45);
            if (ev.aceIn && f) f.stamp(els.disc, '翻面', 'ink', 500, '王牌洗進他的牌庫');
            // h_face 的字（四格是「晃」）只對序章男子成立：只在序章提示
            if (duel.prologue) hint('h_face');
            void st;
            break;
          }
          case 'handStart': {
            await resetDisc();
            S.v = after;
            renderTop(after); renderSide(after); renderHist(after);
            renderRecord(after); renderDisc(after);
            els.rec.classList.remove('flip'); void els.rec.offsetWidth; els.rec.classList.add('flip');
            A(els.rec, [{ transform: 'translateX(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 220, easing: 'ease-out' });
            sfx('flip');
            if (before.K !== after.K) { els.stake.classList.remove('bump'); void els.stake.offsetWidth; els.stake.classList.add('bump'); }
            eqi(after.e.qi, after);
            if (qiGain.p) qiTo(+els.pqn.textContent || 0, after.p.qi);
            if (after.e.quirk && before.e.quirk && after.e.quirk.val > before.e.quirk.val) { const sk = els.chips.querySelector('.skip'); if (sk) sk.classList.add('up'); }
            els.table.classList.remove('on');
            if (after.intent && after.intent.ult) { sfx('eUltWarn'); bubbleForHand(after); }
            else if (!faceSeen) later(() => bubbleForHand(after), 200);
            else later(() => bubbleForHand(after), 1400);
            await wait(240);
            break;
          }
        }
      }
      // ult hand with no handStart (ko) → keep banner
      if (bannerInfo) S.debug.bannerInfo = bannerInfo;
    }
    function qiTo(from, to) {
      if (to === from) { vu(to); return; }
      if (to < from) { vu(to); return; }
      let q = from;
      const step = () => {
        if (S.destroyed) return;
        q++; vu(q);
        const led = els.vu.querySelectorAll('i')[q - 1]; if (led) { led.classList.remove('pop'); void led.offsetWidth; led.classList.add('pop'); }
        sfx('qiUp', { n: q });
        if (q === 6) { els.peak.classList.remove('on'); void els.peak.offsetWidth; els.peak.classList.add('on'); sfx('qiUp', { n: 10 }); }
        if (q < to) later(step, 55 / S.speed);
      };
      step();
    }
    function showAnger(on) {
      const a = actor('f'), sr = els.stageWrap.getBoundingClientRect();
      if (on && a) { const r = a.getBoundingClientRect(); els.anger.style.left = (r.left - sr.left + r.width * 0.02) + 'px'; els.anger.style.top = Math.max(2, r.top - sr.top - 2) + 'px'; }
      els.anger.classList.toggle('on', !!on);
    }
    function afterHandHints(v) {
      const it = v.intent;
      const ids = [];
      // 序章第 2 手起（第 2 手常被前一個提示佔住，就順延；王牌已用就不講了）
      if (v.prologue && v.hand >= 2 && !v.p.aceUsed) ids.push('h_ace');
      if (it && it.ult) ids.push('h_eult');
      if (v.p.aceCanReflect && it && it.ult) ids.push('h_reflect');
      if (v.p.qi >= 6) ids.push('h_ult');
      ids.push(...glyphHints(v));
      if (v.p.aceCanReflect) ids.push('h_reflect');
      later(() => firstHint(ids), 400);
    }
    function finish(over) {
      if (S.ending) return; S.ending = true;
      renderAttrs(S.v);
      later(() => { try { if (opts.onEnd) opts.onEnd({ over, duel }); } catch (e) { console.error(e); } }, 300);
    }

    // ---------------- intro ----------------
    async function intro(evs) {
      // 等遇敵黑幕／Boss 蓋章退場（Boss 蓋章是 mount 之後才加上的，先讓一拍）
      await wait(80);
      for (let i = 0; i < 120 && document.querySelector('.enc-ov, .bossmask'); i++) await wait(50);
      if (S.destroyed) return;
      const v = S.v;
      (evs || []).forEach(emit);
      const resumed = v.hand > 1 || (v.history && v.history.length);
      const f = Fx();
      if (f && f.music) {
        const pre = [];
        if (node && node.stakeId) pre.push(cardById(node.stakeId));
        if (v.p.ace) pre.push(v.p.ace);
        if (node && node.enemyAceId) pre.push(cardById(node.enemyAceId));
        f.music.preload(pre.filter(Boolean));
        if (enemy.boss && v.intent && v.intent.record && !resumed) bigMusic(v.intent.record, true);
      }
      if (!resumed && lines.intro) { say('f', esc(lines.intro), {}); await wait(1700); }
      if (S.destroyed) return;
      S.introDone = true;
      bubbleForHand(S.v);
      const ids = [];
      if (v.prologue && v.hand === 1) {
        ids.push('h_counter');
      }
      if (v.request) ids.push('h_request');
      if (v.e.quirk && v.e.quirk.type === 'skip') ids.push('h_skip');
      if (v.intent && v.intent.ult) ids.push('h_eult');
      if (v.p.aceCanReflect) ids.push('h_reflect');
      ids.push(...glyphHints(v));
      const shown = firstHint(ids);
      if (shown === 'h_counter' && v.intent && !v.intent.ult) { S.recAttr = BEATER[v.intent.bubble]; renderAttrs(S.v); }
    }

    // ---------------- boot ----------------
    setupStage();
    const f0 = Fx();
    if (f0) {
      try { S.toggle = f0.mountToggle(els.snd); } catch (e) { console.error(e); }
      // 換歌：迷你唱盤先減速 300 ms 再換圈標
      if (f0.music && f0.music.onChange) S.offMusic = f0.music.onChange(() => { els.tt2.classList.add('slow'); later(() => { els.tt2.classList.remove('slow'); renderTurntable(); }, 300); });
      f0.setSpeed(S.speed);
    }
    renderAll();
    renderTurntable();
    renderBanner(null, { text: S.v.hand > 1 ? '接著上次的對決。挑一張盤。' : '他把唱片擺上唱盤了。挑一張盤，再選屬性。' });
    if (S.v.over) later(() => finish(S.v.over), 50);
    else intro(opts.events);

    // ---------------- 自動遊玩（__lab.autoplay(policy,{animated:true}) 用；走真的 UI 與動畫）----------------
    async function autoplay(policy) {
      const pols = E.policies || {};
      const pol = pols[policy || 'ev'] || pols.ev;
      if (!pol || S.auto) return false;
      const rnd = E.makeRng(((duel.rng | 0) ^ 0x5bd1e995) >>> 0 || 1);
      S.auto = true;
      while (!S.destroyed && S.auto && !duel.over) {
        while (!S.destroyed && (!S.introDone || S.busy)) await wait(50);
        if (S.destroyed || !S.auto || duel.over) break;
        let act = null; try { act = pol(duel, rnd); } catch (e) { console.error(e); break; }
        if (!act || !E.isLegal(duel, act)) break;
        if (act.type === 'card') S.sel = act.i; else if (act.type === 'ace') S.sel = 'ace';
        await play(act);
      }
      S.auto = false;
      return true;
    }

    // ---------------- api ----------------
    function destroy() {
      S.destroyed = true;
      S.timers.forEach(h => clearTimeout(h)); S.timers.clear();
      S.anims.forEach(a => { try { a.cancel(); } catch (_) {} });
      document.removeEventListener('keydown', S.keyH);
      if (S.offMusic) S.offMusic();
      if (S.toggle && S.toggle.destroy) { try { S.toggle.destroy(); } catch (_) {} }
      if (S.stage && typeof S.stage.unmount === 'function') { try { S.stage.unmount(); } catch (_) {} }
      document.querySelectorAll('.dl-ov').forEach(n => n.remove());
      root.remove();
    }
    const api = {
      el: root,
      view: () => S.v,
      duel: () => duel,
      busy: () => S.busy,
      play: act => play(act),
      select: i => select(i),
      autoplay: p => autoplay(p),
      stopAuto: () => { S.auto = false; },
      debug: () => ({ view: S.v, busy: S.busy, sel: S.sel, events: S.debug.events, banner: S.debug.banner, bannerInfo: S.debug.bannerInfo || null,
        rows: S.debug.rows, shownRows: S.debug.shownRows || null, act: S.debug.act, ms: S.debug.t1 && S.debug.t0 ? S.debug.t1 - S.debug.t0 : null, log: S.debug.log.slice(), introDone: S.introDone }),
    };
    return { api, destroy };
  }

  const DipLabDuel = {
    mount, unmount,
    debug: () => (CUR ? CUR.api.debug() : null),
    api: () => (CUR ? CUR.api : null),
    autoplay: policy => (CUR ? CUR.api.autoplay(policy) : false),
    stopAuto: () => { if (CUR) CUR.api.stopAuto(); },
    _fmt: { banner, groupRows, resText, subLine, rowLabel },
  };
  window.DipLabDuel = DipLabDuel;
  if (qs.get('debug') === '1') window.__dl = DipLabDuel;
})();
