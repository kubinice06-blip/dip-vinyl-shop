/* game-lab/econ.js：經濟介面（SPEC-v4 §2.5.6；D §6）。B3。
 *
 * window.DipLabEcon = {
 *   configure({ content, engine, stage, run:()=>save.run, choose:(ch)=>res, info:(card)=>Promise, sfx, toast, app:()=>#app,
 *               coverBase?, relicIcon?(id,size) })   // ui.js boot 呼叫（B2，§2.5.2）；沒 configure 就呼叫別的方法 → console.error 並 resolve，不丟例外
 *   openBin(key)      → Promise<void>     // 走過去翻 → 抽屜（一張大封面翻著看）→ 關掉才 resolve；key==='sale' 轉 openBargain
 *   openBargain()     → Promise<void>     // 之後買特價箱（$100、最多三張）；還沒挑過開局三張（canBargainPick）→ 轉 bargainPick
 *   bargainPick(o)    → Promise<ids|null> // 開局挑三張（免費）；o = { prompt }；被外部 close() 收掉時回 null
 *   openRelicShop()   → Promise<void>     // 櫃檯的配件（2–3 件），滿 3 件先半價賣一件
 *   moneyHTML(n)      → string            // 「$300」
 *   isOpen() → bool ; close()
 * }
 *
 * 規則（D §6、SPEC-v4 §2.5.6）：
 *   - 點箱子：你的人物照路線走到那一箱的 stand（1.5 倍速，走路途中點一下＝直接走到），到了才翻（pose dig）、才開抽屜；那一箱一直描框。
 *   - 抽屜＝#app 底部的面板，最高 #app 的 50%（內容照可用高度縮放，不捲動）；開的同時 stage.focus(那一箱, {panelMin: 抽屜高})，箱子整個留在畫面上。
 *   - 點抽屜外面（或 ✕、Esc）關掉：stage.highlight([])、stage.unfocus()、pose null。開局挑三張不能關（一定要挑）。
 *   - 序章／對決中（run.duel、prologue 'pending'、等你收獎勵）點箱子：老闆說 C.shopLines.binBusy（「打完再翻。」），不開抽屜。
 *   - 沒有 run（標題畫面、已打烊）：抽屜列那一區卡池的前 6 張，只能翻、看唱片資訊；有 run 但 !canShop：列今晚的貨，一樣不能買。
 *   - 價格、賣回、能不能買全部問引擎（priceOf／relicPrice／sellValue／canShop／canBargainPick），交易一律走 configure 給的 choose。
 * 前綴 ec-；樣式在 econ.css。只掛 window.DipLabEcon；不碰 localStorage。
 */
(function () {
  'use strict';
  var W = window, D = document;
  var WALK = 54;          // 1.5 倍速（shop 預設 36＝每秒 72 格）
  var LONG_MS = 450;      // 長按＝唱片資訊（同 duel.js）
  var ZH1 = { c: '經', o: '冷', h: '硬' }, ATTRS = ['c', 'o', 'h'];
  // C.shopUi 沒有的字（新；已請 B2 補進 C.shopUi，見 dev/notes-B3.md「請求」）
  var FALLBACK = {
    bag: '包包 {n}/{max}', binEmpty: '這一箱今晚賣完了。', owned: '包包裡有了',
    bagFullN: '包包放不下：先賣 {k} 張，半價 ${n}',
    relicSell: '賣這件', relicSold: '「{name}」賣掉，+${n}', relicEmpty: '櫃檯今晚的配件賣完了。',   // relic
    prev: '上一張', next: '下一張', infoAria: '唱片資訊、試聽'
  };

  var CFG = null;
  var S = { open: false, kind: null, token: 0, walking: false, el: null, veil: null, res: null, sel: [], sub: null, idx: 0 };

  // ------------------------------------------------------------------ 小工具
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function fill(s, v) { return String(s == null ? '' : s).replace(/\{(\w+)\}/g, function (m, k) { return v && v[k] != null ? v[k] : m; }); }
  function ok(fn) { if (CFG && CFG.content && CFG.engine) return true; console.error('[econ] ' + fn + '：先呼叫 DipLabEcon.configure()'); return false; }
  function C() { return CFG.content; }
  function E() { return CFG.engine; }
  function ST() { try { return typeof CFG.stage === 'function' ? CFG.stage() : CFG.stage; } catch (_) { return null; } }
  function app() { try { return (CFG.app && CFG.app()) || D.getElementById('app') || D.body; } catch (_) { return D.getElementById('app') || D.body; } }
  function ui(k) { var u = C().shopUi || {}; return u[k] != null ? u[k] : FALLBACK[k] != null ? FALLBACK[k] : ''; }
  function card(id) { var K = C().cards || {}; return K[id] || null; }
  function relicOf(id) { return (C().relics || {})[id] || null; }
  function sfx(n, o) { if (CFG && typeof CFG.sfx === 'function') try { CFG.sfx(n, o); } catch (e) { console.error(e); } }
  function money(n) { return fill(ui('money') || '${n}', { n: n }); }
  function moneyHTML(n) { return '<span class="ec-money">' + esc(money(n == null ? 0 : n)) + '</span>'; }
  function bagMax() { return (E().CFG && E().CFG.bagMax) || 8; }
  function relicMax() { return (E().CFG && E().CFG.relicMax) || 3; }
  function pickN() { return (E().CFG && E().CFG.bargainPick) || 3; }
  function reduced() { try { return !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; } }
  function toast(text) {
    if (!text) return;
    if (CFG && typeof CFG.toast === 'function') { try { CFG.toast(text); } catch (e) { console.error(e); } return; }
    var t = D.createElement('div'); t.className = 'lb-toast ec-toast'; t.textContent = text; app().appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 1900);
  }
  function info(c) {
    if (!c) return Promise.resolve();
    sfx('tick');
    try {
      if (CFG && typeof CFG.info === 'function') return Promise.resolve(CFG.info(c));
      if (W.DipLabCardInfo) return W.DipLabCardInfo.open(c, { from: 'econ' });
    } catch (e) { console.error(e); }
    return Promise.resolve();
  }
  function coverSrc(c) {
    if (!c) return '';
    if (c.localCover) return (CFG.coverBase || '') + c.localCover;
    return c.coverUrl || '';
  }
  function coverImg(c) {
    var src = coverSrc(c);
    return '<span class="ec-alt" aria-hidden="true">' + esc(c ? c.album : '') + '</span>' +
      (src ? '<img alt="" src="' + esc(src) + '" draggable="false" loading="lazy" onerror="this.remove()">' : '');
  }
  function peakOf(c) { return Math.max(c.c || 0, c.o || 0, c.h || 0); }
  function starsHTML(c, o) {
    o = o || {};
    var pk = o.peak ? peakOf(c) : -1;
    return '<span class="ec-stars' + (o.col ? ' col' : '') + '">' + ATTRS.map(function (a) {
      return '<b class="' + a + ((c[a] || 0) === pk ? ' pk' : '') + '"><i>' + ZH1[a] + '</i>' + (c[a] || 0) + '</b>';
    }).join('') + '</span>';
  }
  // 錢不夠：鈕停用，字寫「錢不夠」，底下小字標價（看得到差多少）
  function poorHTML(price) { return '<span class="ec-poor">' + esc(ui('noMoney')) + '<small>' + esc(money(price)) + '</small></span>'; }
  function relicIconHTML(id, size) {
    try {
      if (CFG.relicIcon) return CFG.relicIcon(id, size);
      if (W.DipLabUI && W.DipLabUI.relicIcon) return W.DipLabUI.relicIcon(id, size);
    } catch (e) { console.error(e); }
    var r = relicOf(id); return '<span class="ec-ri">' + esc(((r && r.name) || '?').slice(0, 1)) + '</span>';
  }
  function range(vals) {
    if (!vals.length) return '0';
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
    return lo === hi ? String(lo) : lo + '–' + hi;
  }

  // ------------------------------------------------------------------ run 的狀態
  function liveRun() { var r = null; try { r = CFG.run ? CFG.run() : null; } catch (_) {} return r && !r.over ? r : null; }
  // D §6：序章／對決中（含等你收獎勵）點箱子＝老闆「打完再翻。」
  function busy(r) { return !!(r && (r.duel || r.prologue === 'pending' || r.pending)); }
  function canShop(r) { return !!r && E().canShop(r); }
  function sayBusy() {
    var st = ST(), t = (C().shopLines || {}).binBusy || '打完再翻。';
    if (st && st.say) st.say('o', t, { tone: 'owner', ms: 1600 });
  }
  function binInfo(key) {
    var st = ST(), bs = st && st.bins ? st.bins() : [];
    for (var i = 0; i < bs.length; i++) if (bs[i].key === key) return bs[i];
    return null;
  }

  // ------------------------------------------------------------------ 走過去（D §6：走到箱子前才翻）
  function centerOf(hotId) {
    var st = ST(), hs = st && st.hotspots ? st.hotspots() : [];
    for (var i = 0; i < hs.length; i++) if (hs[i].id === hotId) { var r = hs[i].rect; return [r[0] + r[2] / 2, r[1] + r[3] / 2]; }
    return null;
  }
  function approach(tok, hotId, stand, o) {
    o = o || {};
    var st = ST(); if (!st) return Promise.resolve(false);
    if (st.highlight && hotId) st.highlight([{ ids: [hotId] }]);
    var p = st.pos ? st.pos('p') : null, face = o.face || centerOf(hotId);
    var arrive = function () {
      if (tok !== S.token) return false;
      S.walking = false;
      if (face && st.faceTo) st.faceTo('p', face);
      if (o.dig !== false) st.pose('p', 'dig');
      return true;
    };
    if (!p || p.hidden || p.outside || !stand) return Promise.resolve(arrive());
    if (Math.round(p.x) === Math.round(stand[0]) && Math.round(p.y) === Math.round(stand[1])) return Promise.resolve(arrive());
    st.pose('p', null);
    S.walking = true; veil(true);
    var pr;
    try { pr = Promise.resolve(st.walk('p', [stand.slice(0, 2)], WALK)); } catch (e) { console.error(e); pr = Promise.resolve(); }
    return pr.catch(function () { /* 嚴格模式走不到：shop 已經印錯；照樣開 */ }).then(arrive);
  }

  // ------------------------------------------------------------------ 抽屜外框
  function veil(on) {
    if (!on) { if (S.veil) { S.veil.remove(); S.veil = null; } return; }
    if (S.veil) return;
    var v = D.createElement('div'); v.className = 'ec-veil';
    var top = app().querySelector(':scope > .lb-top'); if (top) v.style.top = top.offsetHeight + 'px';
    // 只認「在 veil 上按下」的點擊：點舞台開抽屜的那一下，放開後瀏覽器補送的 click 會落在剛蓋上的 veil，不能當成「點外面」
    v.addEventListener('pointerdown', function (e) { e.preventDefault(); v._down = true; });
    v.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      if (!v._down) return;
      v._down = false;
      if (S.walking) { var st = ST(); if (st && st.finish) st.finish('p'); return; }   // 走路途中點一下＝直接走到
      if (!S.open) return;
      if (S.kind === 'pick') { nudge(); return; }   // 開局挑三張：一定要挑
      close();
    });
    app().appendChild(v); S.veil = v;
  }
  function nudge() {
    var b = S.el && S.el.querySelector('[data-a=take]'); if (!b) return;
    b.classList.remove('ec-nudge'); void b.offsetWidth; b.classList.add('ec-nudge');
  }
  function mountDrawer(cls, label) {
    var el = D.createElement('div');
    el.className = 'ec-drawer ' + cls + (reduced() ? '' : ' ec-in');
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', label || '');
    el.addEventListener('click', onClick);
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onCancel);
    el.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    veil(true);
    app().appendChild(el);
    S.el = el; S.open = true;
    D.addEventListener('keydown', onKey, true);
    W.addEventListener('resize', onResize);
    return el;
  }
  var rzT = 0;
  function onResize() { clearTimeout(rzT); rzT = setTimeout(function () { if (S.open) { render(); refocus(0); } }, 120); }
  function onKey(e) {
    if (!S.open || (W.DipLabCardInfo && W.DipLabCardInfo.isOpen())) return;
    if (e.key === 'Escape' && S.kind !== 'pick') { e.preventDefault(); e.stopPropagation(); if (S.sub) { S.sub = null; render(); } else close(); }
    else if (e.key === 'ArrowLeft' && S.kind === 'bin' && !S.sub) { e.preventDefault(); flip(-1); }
    else if (e.key === 'ArrowRight' && S.kind === 'bin' && !S.sub) { e.preventDefault(); flip(1); }
  }
  // 抽屜高（開的時候量一次，給 stage.focus 的 panelMin）；變高了才重新對焦
  function refocus(ms) {
    var st = ST(); if (!st || !st.focus || !S.el || !S.hotId) return Promise.resolve();
    var h = S.el.offsetHeight;
    if (S.focusH != null && h <= S.focusH && ms !== 0) return Promise.resolve();
    S.focusH = h;
    return Promise.resolve(st.focus(S.hotId, { panelMin: h, ms: ms == null ? 300 : ms })).catch(function (e) { console.error(e); });
  }

  function close() {
    var was = S.open || S.walking;
    S.token++;
    var st = ST();
    if (S.el) { S.el.remove(); S.el = null; }
    veil(false);
    D.removeEventListener('keydown', onKey, true);
    W.removeEventListener('resize', onResize);
    clearTimeout(S.lpT);
    var focused = S.focusH != null, wasWalking = S.walking;
    S.open = false; S.walking = false; S.kind = null; S.sub = null; S.focusH = null; S.hotId = null;
    if (was && st) {
      if (st.highlight) st.highlight([]);
      if (wasWalking && st.finish) st.finish('p');
      if (st.pose) st.pose('p', null);
      if (focused && st.unfocus) Promise.resolve(st.unfocus(300)).catch(function (e) { console.error(e); });
    }
    var r = S.res; S.res = null;
    if (r) r(S.result === undefined ? undefined : S.result);
    S.result = undefined;
  }

  // ------------------------------------------------------------------ 開
  function begin(kind, o) {
    close();
    var tok = ++S.token;
    S.kind = kind; S.key = o.key; S.hotId = o.hotId; S.label = o.label; S.mode = o.mode; S.items = o.items || null;
    S.idx = 0; S.sel = []; S.sub = null; S.prompt = o.prompt || ''; S.focusId = null; S.result = kind === 'pick' ? null : undefined;
    var pr = new Promise(function (res) { S.res = res; });
    approach(tok, o.hotId, o.stand, { dig: o.dig, face: o.face }).then(function (arrived) {
      if (tok !== S.token) return;
      mountDrawer('ec-' + kind, o.label);
      render();
      refocus();
    });
    return pr;
  }

  function openBin(key) {
    if (!ok('openBin')) return Promise.resolve();
    if (key === 'sale') return openBargain();
    var r = liveRun();
    if (busy(r)) { sayBusy(); return Promise.resolve(); }
    var b = binInfo(key);
    if (!b) { console.warn('[econ] 沒有這一箱：' + key); return Promise.resolve(); }
    var shop = !!r && canShop(r);
    var items = null;
    if (!r) items = ((C().bins || {})[key] || {}).pool ? C().bins[key].pool.filter(card).slice(0, 6) : [];
    else if (!shop) items = ((r.shop && r.shop.bins && r.shop.bins[key]) || []).slice();
    return begin('bin', { key: key, hotId: b.hotId, label: b.label, stand: b.stand, mode: shop ? 'buy' : 'view', items: items });
  }
  function openBargain() {
    if (!ok('openBargain')) return Promise.resolve();
    var r = liveRun();
    if (r && E().canBargainPick(r) && !r.duel) return bargainPick({}).then(function () {});
    if (busy(r)) { sayBusy(); return Promise.resolve(); }
    var b = binInfo('sale') || { hotId: 'bin:sale', label: ui('bargainTitle'), stand: null };
    var shop = !!r && canShop(r);
    if (shop && !(r.shop.bargain || []).length) {
      var st = ST(); if (st && st.say) st.say('o', ui('bargainEmpty'), { tone: 'owner', ms: 2200 });
      return Promise.resolve();
    }
    var items = null;
    if (!r) items = (((C().bargain || {}).pool) || []).filter(card).slice(0, 6);
    else if (!shop) items = ((r.shop && r.shop.bargain) || []).slice();
    return begin('bargain', { key: 'sale', hotId: b.hotId, label: ui('bargainTitle') || b.label, stand: b.stand, mode: shop ? 'buy' : 'view', items: items });
  }
  function bargainPick(o) {
    o = o || {};
    if (!ok('bargainPick')) return Promise.resolve(null);
    var r = liveRun();
    if (!r || !E().canBargainPick(r)) { console.warn('[econ] 現在不能挑特價箱'); return Promise.resolve(null); }
    var b = binInfo('sale') || { hotId: 'bin:sale', label: ui('bargainTitle'), stand: null };
    return begin('pick', { key: 'sale', hotId: b.hotId, label: ui('bargainTitle') || b.label, stand: b.stand, mode: 'pick', prompt: o.prompt || ui('bargainPrompt') });
  }
  function openRelicShop() {
    if (!ok('openRelicShop')) return Promise.resolve();
    var r = liveRun();
    if (!r) return Promise.resolve();
    if (busy(r)) { sayBusy(); return Promise.resolve(); }
    var st = ST(), stand = st && st.spot ? st.spot('pay') : null;
    var o = st && st.pos ? st.pos('o') : null;
    return begin('relic', { key: 'counter', hotId: 'counter', label: ui('relicTitle'), stand: stand, mode: canShop(r) ? 'buy' : 'view', dig: false, face: o ? [o.x, o.y] : null });
  }

  // ------------------------------------------------------------------ 每一種抽屜的內容
  function binIds() {
    var r = liveRun();
    if (S.kind === 'bin') return S.mode === 'buy' ? ((r && r.shop.bins[S.key]) || []).filter(card) : (S.items || []);
    if (S.kind === 'bargain' || S.kind === 'pick') return (S.mode === 'view' ? (S.items || []) : ((r && r.shop.bargain) || [])).filter(card);
    return [];
  }
  function headHTML(title, extra) {
    var r = liveRun(), w = '';
    if (S.mode === 'buy' && r) {
      w = '<span class="ec-wallet">' + moneyHTML(r.money) +
        (S.kind === 'relic'
          ? '<span class="ec-rl">' + r.relics.map(function (id) { return '<i>' + relicIconHTML(id, 16) + '</i>'; }).join('') + '<small>' + r.relics.length + '/' + relicMax() + '</small></span>'
          : '<span class="ec-bag">' + esc(fill(ui('bag'), { n: r.bag.length, max: bagMax() })) + '</span>') + '</span>';
    }
    var x = S.kind === 'pick' ? '' : '<button type="button" class="ec-x" data-a="close" aria-label="' + esc(ui('close')) + '">✕</button>';
    return '<div class="ec-hd"><b class="ec-ttl">' + esc(title) + '</b>' + (extra || '') + w + x + '</div>';
  }
  // 一張大封面翻著看（箱子）
  function binHTML() {
    var ids = binIds(), r = liveRun();
    if (!ids.length) return headHTML(S.label) + '<p class="ec-empty">' + esc(ui('binEmpty')) + '</p>';
    if (S.idx >= ids.length) S.idx = ids.length - 1;
    if (S.idx < 0) S.idx = 0;
    var c = card(ids[S.idx]);
    var btn = '';
    if (S.mode === 'buy' && r) {
      var price = E().priceOf(C(), c), full = r.bag.length >= bagMax();
      var maxSell = full ? Math.max.apply(null, r.bag.map(function (id) { return card(id) ? E().sellValue(C(), card(id)) : 0; }).concat([0])) : 0;
      var owned = r.bag.indexOf(c.id) >= 0;
      var can = price != null && !owned && r.money + maxSell >= price;
      btn = '<button type="button" class="ec-buy lb-btn pri" data-a="buy" data-cid="' + esc(c.id) + '"' + (can ? '' : ' disabled') + '>' +
        (owned ? esc(ui('owned')) : can ? esc(fill(ui('buy'), { n: price })) : poorHTML(price)) + '</button>';
    }
    var n = ids.length;
    return headHTML(S.label) +
      '<div class="ec-flip">' +
        '<div class="ec-one">' +
          '<button type="button" class="ec-cv" data-a="info" data-cid="' + esc(c.id) + '" aria-label="' + esc(c.artist + '《' + c.album + '》：' + ui('infoAria')) + '">' + coverImg(c) +
            '<span class="ec-play" aria-hidden="true"></span><span class="ec-pos">' + (S.idx + 1) + '／' + n + '</span></button>' +
          '<div class="ec-meta"><div class="ec-ar">' + esc(c.artist) + '</div><div class="ec-al">' + esc(c.album) + '</div><div class="ec-yr">' + esc(c.year || '') + '</div>' +
            starsHTML(c, { peak: S.mode === 'buy' }) + btn + '</div>' +
        '</div>' +
        '<div class="ec-strip">' +
          '<button type="button" class="ec-nav" data-a="prev" aria-label="' + esc(ui('prev')) + '"' + (n < 2 ? ' disabled' : '') + '>‹</button>' +
          '<div class="ec-ths">' + ids.map(function (id, i) {
            var k = card(id);
            return '<button type="button" class="ec-th' + (i === S.idx ? ' on' : '') + '" data-a="go" data-i="' + i + '" aria-label="' + esc(k.artist + '《' + k.album + '》') + '"><span class="ec-thc">' + coverImg(k) + '</span></button>';
          }).join('') + '</div>' +
          '<button type="button" class="ec-nav" data-a="next" aria-label="' + esc(ui('next')) + '"' + (n < 2 ? ' disabled' : '') + '>›</button>' +
        '</div>' +
      '</div>';
  }
  // 特價箱（挑三張／$100 最多三張／只看）：六格
  function gridHTML() {
    var ids = binIds(), r = liveRun(), pick = S.kind === 'pick', view = S.mode === 'view';
    S.sel = S.sel.filter(function (id) { return ids.indexOf(id) >= 0; });
    var extra = pick ? '<span class="ec-cnt">' + S.sel.length + '／' + pickN() + '</span>' : '';
    var title = pick ? S.label + '　' + S.prompt : S.label;
    var fc = S.focusId && card(S.focusId);
    var tiles = ids.map(function (id) {
      var c = card(id), on = S.sel.indexOf(id) >= 0;
      return '<button type="button" class="ec-tile' + (on ? ' sel' : '') + '" data-a="' + (view ? 'info' : 'tog') + '" data-cid="' + esc(id) + '"' + (view ? '' : ' aria-pressed="' + on + '"') +
        ' aria-label="' + esc(c.artist + '《' + c.album + '》') + '"><span class="ec-tcv">' + coverImg(c) + (on ? '<span class="ec-chk" aria-hidden="true">✓</span>' : '') + '</span>' + starsHTML(c, { col: true }) + '</button>';
    }).join('');
    var foot = '';
    if (pick) foot = '<button type="button" class="lb-btn pri big wide" data-a="take"' + (S.sel.length === pickN() ? '' : ' disabled') + '>' + esc(ui('bargainTake')) + '</button>';
    else if (!view && r) {
      var price = E().bargainPrice != null ? E().bargainPrice : ((C().economy || {}).bargainPrice || 100);
      var k = S.sel.length, need = Math.max(0, r.bag.length + k - bagMax());
      var sells = r.bag.map(function (id) { return card(id) ? E().sellValue(C(), card(id)) : 0; }).sort(function (a, b) { return b - a; }).slice(0, need);
      var can = k >= 1 && k <= pickN() && need <= r.bag.length && r.money + sells.reduce(function (s, v) { return s + v; }, 0) >= price;
      var poor = r.money + r.bag.map(function (id) { return card(id) ? E().sellValue(C(), card(id)) : 0; }).sort(function (a, b) { return b - a; }).slice(0, Math.max(0, r.bag.length + 1 - bagMax())).reduce(function (s, v) { return s + v; }, 0) < price;
      foot = '<button type="button" class="lb-btn pri big wide" data-a="bbuy"' + (can ? '' : ' disabled') + '>' + esc(poor ? ui('noMoney') : ui('bargainBuy')) + '</button>';
    }
    return headHTML(title, extra) +
      '<div class="ec-grid">' + tiles + '</div>' +
      '<p class="ec-line">' + (fc ? esc(fc.artist + '《' + fc.album + '》') : '&nbsp;') + '</p>' +
      (foot ? '<div class="ec-foot">' + foot + '</div>' : '');
  }
  // 櫃檯的配件
  function relicHTML() {
    var r = liveRun();
    var ids = (r && r.shop && r.shop.relics) || [];
    if (!ids.length) return headHTML(S.label) + '<p class="ec-empty">' + esc(ui('relicEmpty')) + '</p>';
    var full = r.relics.length >= relicMax();
    var maxSell = full ? Math.max.apply(null, r.relics.map(function (id) { return E().sellValue(C(), id); }).concat([0])) : 0;
    return headHTML(S.label) + '<div class="ec-rows">' + ids.map(function (id) {
      var x = relicOf(id); if (!x) return '';
      var price = E().relicPrice(C(), id), can = S.mode === 'buy' && price != null && r.money + maxSell >= price;
      return '<div class="ec-row"><span class="ec-pix">' + relicIconHTML(id, 30) + '</span><span class="ec-tx"><b>' + esc(x.name) + '</b><small>' + esc(x.desc) + '</small></span>' +
        (S.mode === 'buy' ? '<button type="button" class="lb-btn pri ec-rbuy" data-a="rbuy" data-r="' + esc(id) + '"' + (can ? '' : ' disabled') + '>' + (can ? esc(fill(ui('buy'), { n: price })) : poorHTML(price)) + '</button>' : '') + '</div>';
    }).join('') + '</div>';
  }
  // 先賣（唱片：包包滿了；配件：滿 3 件）
  function sellHTML() {
    var r = liveRun(), sub = S.sub;
    if (sub.kind === 'relic') {
      var vals = r.relics.map(function (id) { return E().sellValue(C(), id); });
      return headHTML(S.label) + '<p class="ec-msg">' + esc(fill(ui('relicFull'), { n: range(vals) })) + '</p>' +
        '<div class="ec-rows">' + r.relics.map(function (id) {
          var x = relicOf(id) || { name: id, desc: '' }, on = sub.picks.indexOf(id) >= 0;
          return '<button type="button" class="ec-row ec-spick' + (on ? ' sel' : '') + '" data-a="spick" data-r="' + esc(id) + '" aria-pressed="' + on + '"><span class="ec-pix">' + relicIconHTML(id, 30) + '</span>' +
            '<span class="ec-tx"><b>' + esc(x.name) + '</b><small>' + esc(x.desc) + '</small></span><span class="ec-sv">+' + esc(money(E().sellValue(C(), id))) + '</span></button>';
        }).join('') + '</div>' +
        '<div class="ec-foot two"><button type="button" class="lb-btn" data-a="back">' + esc(ui('close')) + '</button>' +
        '<button type="button" class="lb-btn pri" data-a="sell"' + (sellReady() ? '' : ' disabled') + '>' + esc(ui('relicSell')) + '</button></div>';
    }
    var bvals = r.bag.map(function (id) { return card(id) ? E().sellValue(C(), card(id)) : 0; });
    var msg = sub.need > 1 ? fill(ui('bagFullN'), { k: sub.need, n: range(bvals) }) : fill(ui('bagFull'), { n: range(bvals) });
    var fc = sub.picks.length ? card(sub.picks[sub.picks.length - 1]) : null;
    return headHTML(S.label) + '<p class="ec-msg">' + esc(msg) + '</p>' +
      '<div class="ec-grid ec-g4">' + r.bag.map(function (id) {
        var c = card(id); if (!c) return '';
        var on = sub.picks.indexOf(id) >= 0, v = E().sellValue(C(), c);
        return '<button type="button" class="ec-tile ec-spick' + (on ? ' sel' : '') + '" data-a="spick" data-cid="' + esc(id) + '" aria-pressed="' + on + '" aria-label="' + esc(c.artist + '《' + c.album + '》') + '">' +
          '<span class="ec-tcv">' + coverImg(c) + (on ? '<span class="ec-chk" aria-hidden="true">✓</span>' : '') + '</span><span class="ec-sv">+' + esc(money(v)) + '</span></button>';
      }).join('') + '</div>' +
      '<p class="ec-line">' + (fc ? esc(fc.artist + '《' + fc.album + '》') : '&nbsp;') + '</p>' +
      '<div class="ec-foot two"><button type="button" class="lb-btn" data-a="back">' + esc(ui('close')) + '</button>' +
      '<button type="button" class="lb-btn pri" data-a="sell"' + (sellReady() ? '' : ' disabled') + '>' + esc(ui('sellPick')) + '</button></div>';
  }
  function sellReady() {
    var r = liveRun(), sub = S.sub; if (!r || !sub || sub.picks.length !== sub.need) return false;
    var earn = sub.picks.reduce(function (s, id) { return s + (sub.kind === 'relic' ? E().sellValue(C(), id) : E().sellValue(C(), card(id))); }, 0);
    return r.money + earn >= sub.price;
  }

  // ------------------------------------------------------------------ 畫＋量（抽屜最高 #app 的 50%，內容縮到放得下，不捲動）
  function render() {
    var el = S.el; if (!el) return;
    var html = S.sub ? sellHTML() : S.kind === 'bin' ? binHTML() : S.kind === 'relic' ? relicHTML() : gridHTML();
    el.innerHTML = html;
    el.classList.toggle('ec-sub', !!S.sub);
    fit();
  }
  function fit() {
    var el = S.el; if (!el) return;
    var a = app(), maxH = Math.floor(a.clientHeight * 0.5), w = el.clientWidth || a.clientWidth;
    var short = a.clientHeight < 600;
    var flip = el.querySelector('.ec-flip'), grid = el.querySelector('.ec-grid');
    el.style.maxHeight = maxH + 'px';
    var over = function () { return el.scrollHeight > maxH + 0.5; };   // 內容高（抽屜本身被 max-height 夾住，量 scrollHeight）
    if (flip) {
      var cv = Math.round(Math.min(short ? 132 : 172, (w - 24) * 0.44));
      el.style.setProperty('--ec-cv', cv + 'px');
      while (over() && cv > 72) { cv -= 6; el.style.setProperty('--ec-cv', cv + 'px'); }
    }
    el.classList.remove('ec-tight');
    if (over() && el.querySelector('.ec-rows')) el.classList.add('ec-tight');   // 矮螢幕：配件列收成一行（說明藏起來）
    if (grid) {
      var cols = grid.classList.contains('ec-g4') ? 4 : 3, gap = 6;
      var side = cols === 3 ? 30 : 0;   // 三欄：封面右邊放三軸星數
      var t = Math.floor(Math.min((w - 24 - gap * (cols - 1)) / cols - side, cols === 3 ? 104 : 88));
      el.style.setProperty('--ec-tile', t + 'px');
      while (over() && t > 36) { t -= 4; el.style.setProperty('--ec-tile', t + 'px'); }
    }
  }

  // ------------------------------------------------------------------ 點擊
  function flip(d) {
    var n = binIds().length; if (n < 2) return;
    S.idx = (S.idx + d + n) % n; sfx('tick');
    render();
    var cv = S.el && S.el.querySelector('.ec-one');
    if (cv && !reduced()) { cv.classList.add(d < 0 ? 'ec-fl' : 'ec-fr'); }
  }
  function onClick(e) {
    if (S.lpFired) { S.lpFired = false; e.preventDefault(); e.stopPropagation(); return; }
    if (S.swiped) { S.swiped = false; e.preventDefault(); e.stopPropagation(); return; }
    e.stopPropagation();
    var b = e.target.closest && e.target.closest('[data-a]'); if (!b || b.disabled || !S.el || !S.el.contains(b)) return;
    var a = b.getAttribute('data-a'), r = liveRun();
    if (a === 'close') { close(); return; }
    if (a === 'info') { info(card(b.getAttribute('data-cid'))); return; }
    if (a === 'prev') { flip(-1); return; }
    if (a === 'next') { flip(1); return; }
    if (a === 'go') { var i = +b.getAttribute('data-i'); if (i !== S.idx) { var d = i < S.idx ? -1 : 1; S.idx = i; sfx('tick'); render(); var o1 = S.el.querySelector('.ec-one'); if (o1 && !reduced()) o1.classList.add(d < 0 ? 'ec-fl' : 'ec-fr'); } return; }
    if (a === 'tog') { toggle(b.getAttribute('data-cid')); return; }
    if (a === 'take') { takeThree(); return; }
    if (a === 'buy') { buyCard(b.getAttribute('data-cid')); return; }
    if (a === 'bbuy') { buyBargain(); return; }
    if (a === 'rbuy') { buyRelic(b.getAttribute('data-r')); return; }
    if (a === 'spick') { sellPick(b.getAttribute('data-cid') || b.getAttribute('data-r')); return; }
    if (a === 'back') { S.sub = null; sfx('tick'); render(); return; }
    if (a === 'sell') { var sub = S.sub; if (sub && sellReady()) sub.done(sub.picks.slice()); return; }
    void r;
  }
  // 大封面左右滑＝翻；格子長按＝唱片資訊
  function onDown(e) {
    S.swiped = false; S.lpFired = false;
    var t = e.target.closest && e.target.closest('.ec-cv, .ec-tile');
    if (!t) { S.drag = null; return; }
    S.drag = { x: e.clientX, y: e.clientY, el: t, id: e.pointerId };
    clearTimeout(S.lpT);
    if (t.classList.contains('ec-tile') && t.getAttribute('data-a') !== 'info') {
      S.lpT = setTimeout(function () { if (!S.drag || S.drag.el !== t) return; S.lpFired = true; S.drag = null; info(card(t.getAttribute('data-cid'))); }, LONG_MS);
    }
  }
  function onMove(e) {
    var d = S.drag; if (!d || e.pointerId !== d.id) return;
    if (Math.abs(e.clientX - d.x) > 10 || Math.abs(e.clientY - d.y) > 10) clearTimeout(S.lpT);
  }
  function onUp(e) {
    var d = S.drag; S.drag = null; clearTimeout(S.lpT);
    if (!d || e.pointerId !== d.id) return;
    var dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (d.el.classList.contains('ec-cv') && Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy) * 1.3) { S.swiped = true; flip(dx < 0 ? 1 : -1); }
  }
  function onCancel() { S.drag = null; clearTimeout(S.lpT); }

  function toggle(id) {
    var i = S.sel.indexOf(id);
    if (i >= 0) S.sel.splice(i, 1);
    else if (S.sel.length < pickN()) S.sel.push(id);
    else { S.sel.shift(); S.sel.push(id); }   // 已經三張：換掉最早挑的那張
    S.focusId = id; sfx('select'); render();
  }
  function choose(ch) {
    var res;
    try { res = CFG.choose ? CFG.choose(ch) : E().choose(CFG.run(), C(), ch); } catch (e) { console.error(e); res = { ok: false, error: 'exception' }; }
    if (!res || !res.ok) {
      console.warn('[econ] choose 失敗', res && res.error, ch);
      if (res && res.error === 'noMoney') toast(ui('noMoney'));
      return null;
    }
    return res;
  }
  function effectsToast(res) {
    var parts = [], gains = [], spend = 0;
    (res.effects || []).forEach(function (f) {
      if (f.loseCard) parts.push(fill(ui('sold'), { album: (card(f.loseCard) || {}).album || '', n: f.earn || 0 }));
      if (f.loseRelic) parts.push(fill(ui('relicSold'), { name: (relicOf(f.loseRelic) || {}).name || '', n: f.earn || 0 }));
      if (f.gainCard) { gains.push((card(f.gainCard) || {}).album || ''); spend += f.spend || 0; }
      if (f.gainRelic) parts.push(fill(ui('relicBought'), { name: (relicOf(f.gainRelic) || {}).name || '', n: f.spend || 0 }));
    });
    if (gains.length) parts.push(fill(ui('bought'), { album: gains.join('》《'), n: spend }));
    toast(parts.join('・'));
  }
  function takeThree() {
    if (S.sel.length !== pickN()) { nudge(); return; }
    var ids = S.sel.slice(), res = choose({ type: 'bargainPick', ids: ids });
    if (!res) { render(); return; }
    sfx('select');
    S.result = ids; close();
  }
  function buyCard(id) {
    var r = liveRun(); if (!r) return;
    var c = card(id), price = E().priceOf(C(), c);
    if (r.bag.length >= bagMax()) {
      S.sub = { kind: 'card', need: 1, picks: [], price: price, done: function (picks) { done(choose({ type: 'buy', key: S.key, cardId: id, sellId: picks[0] })); } };
      sfx('tick'); render(); return;
    }
    done(choose({ type: 'buy', key: S.key, cardId: id }));
  }
  function buyBargain() {
    var r = liveRun(); if (!r || !S.sel.length) return;
    var ids = S.sel.slice(), need = Math.max(0, r.bag.length + ids.length - bagMax());
    var price = (C().economy || {}).bargainPrice || 100;
    if (need > 0) {
      S.sub = { kind: 'card', need: need, picks: [], price: price, done: function (picks) { done(choose({ type: 'buyBargain', ids: ids, sellIds: picks })); } };
      sfx('tick'); render(); return;
    }
    done(choose({ type: 'buyBargain', ids: ids }));
  }
  function buyRelic(id) {
    var r = liveRun(); if (!r) return;
    if (r.relics.length >= relicMax()) {
      S.sub = { kind: 'relic', need: 1, picks: [], price: E().relicPrice(C(), id), done: function (picks) { done(choose({ type: 'buyRelic', relicId: id, sellRelicId: picks[0] })); } };
      sfx('tick'); render(); return;
    }
    done(choose({ type: 'buyRelic', relicId: id }));
  }
  function done(res) {
    S.sub = null;
    if (res) {
      sfx('readHit'); effectsToast(res);
      S.sel = []; S.focusId = null;
      if (S.kind === 'bargain') { var r = liveRun(); if (r && !(r.shop.bargain || []).length) { render(); setTimeout(function () { if (S.kind === 'bargain') { close(); var st = ST(); if (st && st.say) st.say('o', ui('bargainEmpty'), { tone: 'owner', ms: 2200 }); } }, 600); return; } }
    }
    render();
  }
  function sellPick(id) {
    var sub = S.sub; if (!sub) return;
    var i = sub.picks.indexOf(id);
    if (i >= 0) sub.picks.splice(i, 1);
    else if (sub.picks.length < sub.need) sub.picks.push(id);
    else { sub.picks.shift(); sub.picks.push(id); }
    sfx('select'); render();
  }

  // ------------------------------------------------------------------ 給測試看的
  function debug() {
    return { open: S.open, walking: S.walking, kind: S.kind, key: S.key, mode: S.mode, idx: S.idx, ids: S.open ? binIds() : [], sel: (S.sel || []).slice(),
      sub: S.sub ? { kind: S.sub.kind, need: S.sub.need, picks: S.sub.picks.slice() } : null, height: S.el ? S.el.offsetHeight : 0, focusH: S.focusH };
  }

  W.DipLabEcon = {
    configure: function (o) { CFG = Object.assign({}, o || {}); return W.DipLabEcon; },
    openBin: openBin, openBargain: openBargain, bargainPick: bargainPick, openRelicShop: openRelicShop,
    moneyHTML: function (n) { return CFG && CFG.content ? moneyHTML(n) : '<span class="ec-money">$' + esc(n == null ? 0 : n) + '</span>'; },
    isOpen: function () { return !!(S.open || S.walking); },
    close: close,
    debug: debug
  };
})();
