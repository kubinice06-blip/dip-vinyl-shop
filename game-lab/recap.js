// game-lab/recap.js — 上一手詳情／這場紀錄（店主 11-17「上一場發生了什麼事的細節還是來不及看清楚，一閃就沒了」；scratchpad v5/recap DESIGN §B §C）
//
// 資料一律來自引擎的 duel.log（engine.js resolveTurn 每手多記 pId eId pStar eStar ace eAce by not rel notes script apex）：
//   clashOf(log 一筆) 組回 clash 事件的形狀 → DipLabDuel._fmt.clashText（＝當時浮框那幾行字）。這裡不另外造字、不重算數字：
//   扣分＝log 的 toE／toP、打完的聲望＝log 的 pHp／eHp；真假只看 clashText 的 bluff／saw／gotRead（log.hint／log.bluff 在半指、不露那手是他藏起來的計畫色，
//   不拿來判、不寫進畫面——提示只寫原句）。
//
// DipLabRecap
//   clashOf(L, hintLines) → clash 形狀（只放 clashText 看的欄；舊存檔沒有 by／not 的手：by 照三相剋推回、not 查句庫，見下）
//   rowsOf(log, ctx) → [{ n, L, ct, hint, e:{card,attr,star,ace}, p:{…}, hp:{p,e,pm,em} }]
//     ctx：{ T(字), hints, hintLines, cardOf(id), pMax, eMax, shown（只列到第幾手：揭曉前那手不列）, U（頂點卡試做的畫面字，可省） }
//   handHTML(row, o) · listHTML(rows, o)（o：{ T, max }）
//   mount(host, o) → { el, view(), k(), set(view, k), update(rows), close() }
//     o：{ rows, view:'hand'|'list', k（第幾手）, max（一場幾手）, T, title（列表標題）, onCard(side 'e'|'p', row), onClose(), cls }
//     掛在 host 最後面一個 .dl-rc（對決中 host＝.dl 盤面；打完 host＝ui.js 的 modal 面板）。面板自己的點擊不往外冒（不會變成「點牌桌＝繼續」或收回手牌）。
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  const BASE = (function () {
    try { const s = document.currentScript && document.currentScript.src; if (s) return new URL('.', s).href; } catch (_) {}
    try { return new URL('.', location.href).href; } catch (_) { return ''; }
  })();
  const ZH = { c: '經典', o: '冷門', h: '硬蕊' }, ZH1 = { c: '經', o: '冷', h: '硬' }, ATTRS = ['c', 'o', 'h'];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const fill = (t, o) => String(t).replace(/\{(\w+)\}/g, (m, k) => (o && o[k] != null ? o[k] : ''));
  // 字：content.duelText 的 rc*（lint 掃 content.js）；沒有就用這份（同一套字）
  const RT0 = {
    he: '他・', you: '你・', aceWord: '王牌', hintLabel: '提示', hitE: '他 −{n}', hitP: '你 −{n}',
    rcHand: '第 {n} 手', rcOf: '／{max}', rcList: '這場紀錄', rcCount: '{n} 手', rcAll: '全部', rcEmpty: '第 1 手揭曉後才有紀錄。',
    rcAfter: '這手打完　你 {p}／{pm}　他 {e}／{em}', rcVs: '對', rcNone: '不扣',
    rcCounter: '你剋中', rcCountered: '被他剋', rcGapYou: '剋不動', rcGapHim: '他剋不動', rcMirrorWin: '比星贏', rcMirrorLose: '比星輸', rcTie: '平手',
    rcBluff: '被唬', rcSaw: '看穿', rcRead: '被讀到',
    rcPrev: '前一手', rcNext: '後一手', rcClose: '關閉', rcCover: '{t}，點一下看唱片資訊',
  };
  const KIND_KEY = { counter: 'rcCounter', countered: 'rcCountered', mirrorWin: 'rcMirrorWin', mirrorLose: 'rcMirrorLose', tie: 'rcTie' };
  function tOf(T) {
    return (k, v) => {
      let s = typeof T === 'function' ? T(k, v) : null;
      if (s == null || s === k) s = RT0[k] != null ? fill(RT0[k], v) : k;
      return s;
    };
  }
  // ---------------- 資料 ----------------
  // 改版前的舊存檔（部署當下正在打的那一場、續玩、打完複製進 r.lastFight 的那份）：log 沒有 by、not 這些新欄位。
  //   by（誰剋誰）照三相剋從雙方屬性推回來（＝engine clash：同色 null、你剋他 'p'、其餘 'e'）——不推的話「他剋不動」會寫成反方向的「經典剋冷門…剋不動」（審查 11-17）。
  //   not（半指那句說他不是哪色）＝那句提示在句庫 hintLines.half 裡歸哪一色（提示原句本來就講明了，不是洩漏）；查不到就當不露（不判照實／唬人、不造「他照實出」）
  const BEATS_OF = { o: 'c', c: 'h', h: 'o' };          // x 剋 BEATS_OF[x]（＝engine BEATS）
  const byOf = L => ('by' in L ? (L.by == null ? null : L.by) : !L.pAttr || !L.eAttr || L.pAttr === L.eAttr ? null : BEATS_OF[L.pAttr] === L.eAttr ? 'p' : 'e');
  function notOf(L, lines) {
    if ('not' in L) return L.not || null;
    const H = lines && lines.half;
    if (H) for (const a of ATTRS) if (Array.isArray(H[a]) && H[a].some(x => x && (x.id || x) === L.line)) return a;
    return undefined;                                     // 查不到
  }
  // log 一筆 → clashText 吃的形狀。hint.attr＝log.hint：明指時是公開的提示色（clashText 用它判「他照實／唬你」）；半指、不露 clashText 不拿它判真假
  //   hintLines：舊存檔半指那手查 not 用（rowsOf 會帶 ctx.hintLines）
  function clashOf(L, hintLines) {
    let hk = L.hk || 'one', not = null;
    if (hk === 'half') { const x = notOf(L, hintLines); if (x === undefined) hk = 'none'; else not = x; }
    const c = { n: L.n, pAttr: L.pAttr, eAttr: L.eAttr, pStar: L.pStar, eStar: L.eStar, ace: !!L.ace, eAce: !!L.eAce, kind: L.kind, toE: L.toE | 0, toP: L.toP | 0,
      blocked: L.blocked || null, by: byOf(L),
      hint: L.line ? { attr: L.hint, line: L.line, kind: hk, not } : null, bluff: !!L.bluff, why: L.why, rel: L.rel || null, notes: Array.isArray(L.notes) ? L.notes : [] };
    if (L.script) c.script = true;
    if ('apex' in L) c.apex = L.apex;
    if (L.enc && typeof L.enc === 'object') c.enc = { give: L.enc.give, mode: L.enc.mode || (L.apex !== undefined ? 'apex' : 'ace'), src: L.enc.src, heal: L.enc.heal, carry: !!L.enc.carry };   // 第 I 波翻面：成立那手（clashText 多一行「翻面！…」）
    return c;
  }
  function rowsOf(log, ctx) {
    ctx = ctx || {};
    const D = window.DipLabDuel, F = D && D._fmt;
    if (!F) return [];
    const cardOf = typeof ctx.cardOf === 'function' ? ctx.cardOf : () => null;
    return (Array.isArray(log) ? log : []).filter(L => L && typeof L === 'object' && L.pAttr && L.eAttr && (ctx.shown == null || L.n <= ctx.shown)).map(L => {
      const c = clashOf(L, ctx.hintLines), ct = F.clashText(c, ctx.T, ctx.hints, 'apex' in c ? ctx.U : undefined);
      const hx = c.hint ? F.hintOf(ctx.hints, c.hint, ctx.hintLines) : null;
      return { n: L.n, L, ct, hint: hx && hx.text ? hx.text : '',
        e: { card: L.eId ? cardOf(L.eId) : null, attr: L.eAttr, star: L.eStar, ace: !!L.eAce },
        p: { card: L.pId ? cardOf(L.pId) : null, attr: L.pAttr, star: L.pStar, ace: !!L.ace },
        hp: { p: L.pHp, e: L.eHp, pm: ctx.pMax, em: ctx.eMax } };
    });
  }
  // ---------------- 畫 ----------------
  function coverSrc(c) {
    if (!c) return '';
    if (c.localCover) { try { return new URL(c.localCover, BASE).href; } catch (_) {} }
    return c.coverUrl || '';
  }
  function cover(c) {
    const src = coverSrc(c);
    if (!src) return '<span class="cv noimg" aria-hidden="true"></span>';
    const fb = c.localCover && c.coverUrl ? ` data-fb="${esc(c.coverUrl)}"` : '';
    return `<img class="cv" src="${esc(src)}"${fb} alt="" draggable="false" decoding="async">`;
  }
  const num = v => (typeof v === 'number' && isFinite(v) ? String(v) : '');
  const title = c => c ? `${c.artist || ''}《${c.album || ''}》` : '';
  // 扣分（log 的 toE／toP）：他 −n 綠、你 −n 紅、兩邊都扣（顏色看誰扣得多）、不扣
  function dOf(L, t) {
    const e = L.toE | 0, p = L.toP | 0;
    if (e > 0 && p > 0) return { t: `${t('hitP', { n: p })} ${t('hitE', { n: e })}`, c: p > e ? 'r' : e > p ? 'g' : 'z' };
    if (e > 0) return { t: t('hitE', { n: e }), c: 'g' };
    if (p > 0) return { t: t('hitP', { n: p }), c: 'r' };
    return { t: t('rcNone'), c: 'z' };
  }
  function kindWord(L, t) { if (L.blocked === 'gap') return t(byOf(L) === 'e' ? 'rcGapHim' : 'rcGapYou'); return KIND_KEY[L.kind] ? t(KIND_KEY[L.kind]) : ''; }
  // 籤：被唬（紅）／看穿（綠）／被讀到（紅）——只看 clashText 的判讀（＝當時浮框講了什麼）
  //   class 用 saw 不用 sw：style.css 有全域 .sw（⏸ 開關鈕：黑框、min-width 36），會套到這裡（審查 11-17）
  function tagOf(ct, t) { return ct.saw ? { t: t('rcSaw'), c: 'saw' } : ct.gotRead ? { t: t('rcRead'), c: '' } : ct.bluff ? { t: t('rcBluff'), c: '' } : null; }
  // 第 I 波翻面：成立那手多一個金章「翻面」（字＝content.encore.ui.recap；沒有就不畫）
  function encTag(L) {
    const Cn = window.DipLabContent, w = Cn && Cn.encore && Cn.encore.ui && Cn.encore.ui.recap;
    return L && L.enc && w ? `<span class="tg enc">${esc(w)}</span>` : '';
  }
  // 詳情：v1＝判讀句（唬你／看穿／讀到：l1 不是規則句時）；v2＝規則句＋扣分；v3＝l3（跟規則句重複就不放）；小字＝notes 逐條
  function handHTML(r, o) {
    const t = tOf(o && o.T), ct = r.ct;
    const verdict = !!ct.l1 && ct.l1 !== ct.rule && ct.l1.indexOf(ct.rule) < 0;
    const ruleLine = verdict ? ct.rule : ct.l1;
    const l3 = ct.l3 && ct.l3 !== String(ct.rule || '').replace(/[，,]\s*$/, '。') ? ct.l3 : '';
    const side = (s, d) => {
      const lab = d.card ? t('rcCover', { t: title(d.card) }) : '';
      const cv = `<span class="cvb${d.card ? '' : ' none'}">${cover(d.card)}${d.ace ? `<span class="acetag">${esc(t('aceWord'))}</span>` : ''}</span>`;
      return `<div class="rc-cd ${s}">${d.card ? `<button type="button" class="cvbtn" data-rc-card="${s}" aria-label="${esc(lab)}">${cv}</button>` : cv}`
        + `<div class="ct"><span class="who">${esc(t(s === 'e' ? 'he' : 'you'))}<span class="${d.attr}">${ZH[d.attr] || ''} <span class="num">${esc(num(d.star))}</span></span></span>`
        + (d.card ? `<span class="al">${esc(d.card.album || '')}</span><span class="ar">${esc(d.card.artist || '')}</span>` : '') + `</div></div>`;
    };
    const hp = r.hp || {};
    return (r.hint ? `<div class="rc-hint"><span class="lb">${esc(t('hintLabel'))}</span><span class="tx">${esc(r.hint)}</span></div>` : '')
      + `<div class="rc-cards">${side('e', r.e)}${side('p', r.p)}</div>`
      + `<div class="rc-res">${verdict ? `<div class="v1${ct.saw ? ' saw' : ct.bluff ? ' bl' : ''}">${esc(ct.l1)}</div>` : ''}`
      + `<div class="v2">${esc(ruleLine)}<span class="d ${ct.cls}">${esc(ct.l2)}</span></div>`
      + (l3 ? `<div class="v3">${esc(l3)}</div>` : '')
      + (ct.notes.length ? `<ul class="nts">${ct.notes.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '') + `</div>`
      + (typeof hp.p === 'number' && typeof hp.e === 'number' ? `<div class="rc-hp">${afterHTML(hp, t)}</div>` : '');
  }
  // 「這手打完　你 p／pm　他 e／em」（不寫「打完」兩字開頭：遊戲裡「打完」多指整場；審查 11-17）：聲望數字加粗（log 的 pHp／eHp；負數照畫面寫 0）
  function afterHTML(hp, t) {
    const PH = { '\u0001': `<b>${Math.max(0, hp.p)}</b>`, '\u0002': esc(num(hp.pm)), '\u0003': `<b>${Math.max(0, hp.e)}</b>`, '\u0004': esc(num(hp.em)) };
    return esc(t('rcAfter', { p: '\u0001', pm: '\u0002', e: '\u0003', em: '\u0004' })).replace(/[\u0001-\u0004]/g, ch => PH[ch]);
  }
  function listHTML(rows, o) {
    const t = tOf(o && o.T);
    if (!rows.length) return `<p class="rc-ft">${esc(t('rcEmpty'))}</p>`;
    return `<ul class="rc-list">${rows.map(r => {
      const d = dOf(r.L, t), tg = tagOf(r.ct, t);
      const sd = (s, x) => `<span class="sd ${s}">${cover(x.card)}<span><span class="${x.attr}">${ZH1[x.attr] || ''}</span> <span class="num">${esc(num(x.star))}</span></span></span>`;
      return `<li><button type="button" class="rc-row" data-rc-n="${r.n}"><span class="n">${r.n}</span>${sd('e', r.e)}<span class="vs">${esc(t('rcVs'))}</span>${sd('p', r.p)}`
        + `<span class="out"><span class="k">${encTag(r.L)}${tg ? `<span class="tg ${tg.c}">${esc(tg.t)}</span>` : ''}${esc(kindWord(r.L, t))}</span><span class="d ${d.c}">${esc(d.t)}</span></span><span class="chev" aria-hidden="true">›</span></button></li>`;
    }).join('')}</ul>`;
  }
  // ---------------- 面板 ----------------
  function mount(host, o) {
    o = o || {};
    const t = tOf(o.T);
    let rows = o.rows || [], view = o.view === 'hand' ? 'hand' : 'list', k = o.k, closed = false;
    const el = document.createElement('div');
    el.className = 'dl-rc' + (o.cls ? ' ' + o.cls : '');
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    host.appendChild(el);
    // 封面載入失敗：本機 → 遠端 → 空框
    el.addEventListener('error', ev => {
      const x = ev.target; if (!x || x.tagName !== 'IMG') return;
      if (x.dataset.fb && x.src !== x.dataset.fb) { const fb = x.dataset.fb; x.removeAttribute('data-fb'); x.src = fb; return; }
      const sp = document.createElement('span'); sp.className = 'cv noimg'; x.replaceWith(sp);
    }, true);
    const max = () => o.max || rows.length || 6;
    function draw() {
      const i = rows.findIndex(r => r.n === k), r = rows[i];
      if (view === 'hand' && r) {
        el.setAttribute('aria-label', t('rcHand', { n: r.n }));
        el.dataset.view = 'hand'; el.dataset.n = String(r.n);
        el.innerHTML = `<div class="rc-hd"><button type="button" class="rc-nav" data-rc="prev" aria-label="${esc(t('rcPrev'))}"${i <= 0 ? ' disabled' : ''}>‹</button>`
          + `<div class="rc-t">${esc(t('rcHand', { n: r.n }))}<small>${esc(t('rcOf', { max: max() }))}</small></div>`
          + `<button type="button" class="rc-nav" data-rc="next" aria-label="${esc(t('rcNext'))}"${i >= rows.length - 1 ? ' disabled' : ''}>›</button>`
          + `<button type="button" class="rc-all" data-rc="list">${esc(t('rcAll'))}</button><button type="button" class="rc-x" data-rc="x" aria-label="${esc(t('rcClose'))}">✕</button></div>`
          + `<div class="rc-bd">${handHTML(r, o)}</div>`;
      } else {
        view = 'list';
        const ttl = o.title || t('rcList');
        el.setAttribute('aria-label', ttl);
        el.dataset.view = 'list'; delete el.dataset.n;
        el.innerHTML = `<div class="rc-hd"><div class="rc-t lf">${esc(ttl)}<small>${esc(t('rcCount', { n: rows.length }))}</small></div><button type="button" class="rc-x" data-rc="x" aria-label="${esc(t('rcClose'))}">✕</button></div>`
          + `<div class="rc-bd">${listHTML(rows, o)}</div>`;
      }
    }
    function set(v, kk) { if (closed) return; view = v === 'hand' ? 'hand' : 'list'; if (kk != null) k = kk; draw(); }
    function close() { if (closed) return; closed = true; el.remove(); if (typeof o.onClose === 'function') try { o.onClose(); } catch (e) { console.error(e); } }
    el.addEventListener('click', ev => {
      ev.stopPropagation();                         // 面板裡的點擊不往外冒：不會變成「點牌桌＝繼續」、不收回手牌、不關 modal
      const x = ev.target.closest && ev.target.closest('[data-rc], [data-rc-n], [data-rc-card]');
      if (!x || x.disabled) return;
      if (x.dataset.rcN) { set('hand', +x.dataset.rcN); return; }
      if (x.dataset.rcCard) { const r = rows.find(z => z.n === k); if (r && typeof o.onCard === 'function') o.onCard(x.dataset.rcCard, r); return; }
      const a = x.dataset.rc, i = rows.findIndex(r => r.n === k);
      if (a === 'x') close();
      else if (a === 'list') set('list');
      else if (a === 'prev' && i > 0) set('hand', rows[i - 1].n);
      else if (a === 'next' && i >= 0 && i < rows.length - 1) set('hand', rows[i + 1].n);
    });
    draw();
    try { const b = el.querySelector('.rc-x'); if (b && b.focus) b.focus({ preventScroll: true }); } catch (_) {}
    return { el, view: () => view, k: () => k, set, update(nr) { rows = nr || []; if (!closed) draw(); }, close, closed: () => closed };
  }
  window.DipLabRecap = { clashOf, rowsOf, handHTML, listHTML, mount, kindWord: (L, T) => kindWord(L, tOf(T)), dOf: (L, T) => dOf(L, tOf(T)), RT0 };
})();
