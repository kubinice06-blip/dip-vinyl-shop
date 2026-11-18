/* game-lab/loot.js：第 C 波 戰利品列＋藏家寶箱（scratchpad v5/wave-c SPEC-C §4.1、§4.2；介面代理 A）。
 *
 * window.DipLabLoot = {
 *   configure(host)   // ui.js boot 接一次（host 見下）；沒接就呼叫 lootFlow／chestFlow → console.error、什麼都不做
 *   lootFlow(o)       // 打贏一般／菁英：pending reward kind 'loot'。o = { p, out, finish(res) }
 *                     //   out（剛打完才有；重新整理回來＝null）：{ earn, packetCash, money, xp:{gain, from, to, need, up}|null }
 *   chestFlow(o)      // 打贏藏家：pending reward kind 'chest'。o = { p, out, finish(res) }；out：{ dareCash, money, pity }
 *   redraw()          // 配件滿了按「算了」回來：同一列照目前翻開的樣子重畫
 *   flipAll()         // 還蓋著的直接翻開（自動玩、測試）
 *   state() → { kind, flipped:[bool…], open, busy } | null   // 測試用
 * }
 *
 * host（ui.js 給；交易一律走 ui 的 doChoose：take／relic／skip）：
 *   content, engine, run(), alive()（還在領獎畫面）, overlay(node)（掛在 #app、top 釘在舞台下緣；換畫面收掉）, sheet(html, cls) → el, fit(el), after(fn, ms)（換畫面就清掉；ms 不再除速度）,
 *   sfx(n, o), say(id, text, ms) → 泡泡 el, unsay(id), stageRect(), emote(id, k, ms), toast(text, cls), cashRise(from, to), cashAfter(from, to), xpRise(o),
 *   coverHTML(c, o), starsHTML(c, o), relicButtonsHTML(ids, attr), bagText(n), bagGain(id), rewardNote(),
 *   take(id) → Promise<res|null>, relic(id, autoDrop) → Promise<res|null>, skip() → res,
 *   shelfAdd(id), shelfHas(id), seen(k), markSeen(k), fly(c, fromEl, toRect) → Promise, wallRect(), bagRect(), topRect(),
 *   auto(fn, ms)（自動玩登記）, policy() → choice, anim() → { fast（動畫加速）, k（?fast=1 的倍率）, rm（減少動態） }, floor(card|null),
 *   log(k)（save.wcLog 計數；這裡只記 'ground'：這一列玩家自己點了蓋牌／木箱，一列最多算一次）
 *
 * 時間線（SPEC-C §4.1；「動畫加速」開著：自己翻 1.5→0.6 秒、其他減半；?fast=1 再除 4）：
 *   0 秒 他轉身走（ui.js）、字幕「對方似乎掉落了什麼……」（C.script.drop G1，店主句；不用點、1.8 秒淡掉）
 *   0.3 秒 面板頂邊跳出錢袋、音符（有紅包多一包）、三張蓋牌，每樣一聲「啵」（一次比一次高）
 *   0.9 秒 點哪張翻哪張（金邊盤蓋著就有金邊；翻開多一聲「叮」、冒火花）
 *   1.35 秒 錢、經驗飛進頂上（cashRise、xpRise）；紅包：酬勞那筆再演一段 cashRise／樂歷 +15 一顆吐司
 *   1.5 秒起 沒翻的自己翻
 *   必點：每張下面「收這張」（翻開才能按）；底下「不收（+$400）」一開始就能按；菁英多一行「或改拿一件發燒配件」
 * 寶箱（§4.2）：面板裡一只木箱（點一下或 1.2 秒自己掀）→ 三張（踢館帖撐完四張）每 0.35 秒翻一張；保底：掀蓋前老闆驚嘆號＋「這箱有好東西。」；
 *   踢館帖撐完：掀蓋前「踢館帖撐完 +$5,000」（cashRise）。鎮店盤格（src 'apex'）C 波畫成金邊盤。
 * 減少動態：不飛不彈、直接淡進、三張一開始就翻開；重新整理回來（out null）也直接翻開（同一列同三張，存在 pending）。
 * 前綴 lt-；樣式在 loot.css。只掛 window.DipLabLoot；不碰 localStorage。
 */
(function () {
  'use strict';
  var W = window, D = document;
  var H = null;           // host
  var S = null;           // 這一列的狀態（同時只有一列）

  // 時間線（毫秒，正常速度）
  var T0 = { cap: 1800, pop: 300, popGap: 110, arm: 900, fly: 1350, autoflip: 1500, flipGap: 150, lid: 1200, chestGap: 350, turn: 110 };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function fill(s, o) { return String(s == null ? '' : s).replace(/\{(\w+)\}/g, function (m, k) { return o && o[k] != null ? o[k] : m; }); }
  function C() { return H.content; }
  function E() { return H.engine; }
  function U(k, o) { var u = (C().waveC && C().waveC.ui) || {}; return fill(u[k] == null ? '' : u[k], o); }
  function card(id) { return (C().cards && C().cards[id]) || null; }
  function mt(n) { return E().moneyText ? E().moneyText(n) : String(n); }
  function money(n) { return fill((C().shopUi && C().shopUi.money) || '${n}', { n: mt(n) }); }
  function ok(fn) { if (H && H.content && H.engine) return true; console.error('[loot] ' + fn + '：先呼叫 DipLabLoot.configure()'); return false; }
  function A() { var a = {}; try { a = H.anim() || {}; } catch (_) {} return { fast: !!a.fast, k: a.k > 0 ? a.k : 1, rm: !!a.rm }; }
  // 時間：動畫加速＝減半（自己翻 1.5→0.6 秒）；?fast=1 再除 k
  function ms(key) { var a = A(), v = T0[key]; if (a.fast) v = key === 'autoflip' ? 600 : key === 'chestGap' ? 150 : v / 2; return Math.round(v / a.k); }
  function sfx(n, o) { try { H.sfx(n, o); } catch (e) { console.error(e); } }
  function after(fn, t) { var tok = S; return H.after(function () { if (S !== tok || !S || !S.el || !S.el.isConnected) return; fn(); }, t); }
  function qs(sel, root) { return (root || D).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || D).querySelectorAll(sel)); }
  function isGoldSrc(s) { return s === 'gold' || s === 'apex'; }

  // ------------------------------------------------------------------ 卡片格
  // 蓋著：卡背（黑膠）＋金邊盤先有一圈金邊；字與鈕的位置照翻開的留著（翻開時面板不跳）
  function tileDown(i) {
    var g = isGoldSrc(S.p.src && S.p.src[i]);
    return '<div class="lb-ct lt-c down' + (g ? ' gold' : '') + '" data-k="' + i + '">' +
      '<button type="button" class="lt-face lt-back" data-flip="' + i + '" aria-label="' + esc(U('lootFlip')) + '"><i class="rec" aria-hidden="true"></i></button>' +
      '<div class="ar">&nbsp;</div><div class="al">&nbsp;</div><span class="stars lt-st">&nbsp;</span>' +
      '<button type="button" class="lb-pickb key" disabled>' + esc(U('take')) + '</button></div>';
  }
  function tileUpInner(i) {
    var id = S.p.cards[i], c = card(id); if (!c) return '';
    var gain = 0;
    try { gain = +H.bagGain(id) || 0; } catch (_) {}
    // 包包裡已經有這張（舊存檔的列、引擎退路沒擋到）：鈕寫「包包裡有了」、按不下去（不讓「收這張」變成死鈕）
    var r = H.run(), have = !!r && Array.isArray(r.bag) && r.bag.indexOf(id) >= 0;
    var up = !have && gain > 0.005 ? '<span class="lt-up" role="img" aria-label="' + esc(U('upHint')) + '" title="' + esc(U('upHint')) + '">↑</span>' : '';
    return '<span class="lt-face">' + H.coverHTML(c) + up + '</span>' +
      '<div class="ar">' + esc(c.artist) + '</div><div class="al">' + esc(c.album) + '</div>' + H.starsHTML(c) +
      (have ? '<button type="button" class="lb-pickb key" disabled>' + esc((C().shopUi && C().shopUi.owned) || '包包裡有了') + '</button>'
        : '<button type="button" class="lb-pickb key" data-pick="' + esc(id) + '">' + esc(U('take')) + '</button>');
  }
  function tileUp(i) {
    var g = isGoldSrc(S.p.src && S.p.src[i]);
    return '<div class="lb-ct lt-c up' + (g ? ' gold' : '') + '" data-k="' + i + '" data-cid="' + esc(S.p.cards[i]) + '">' + tileUpInner(i) + '</div>';
  }
  function tileEl(i) { return S && S.el ? qs('.lt-c[data-k="' + i + '"]', S.el) : null; }
  // 翻開第 i 張：2D 翻（scaleX 收起 → 換封面 → 打開；WebKit 不用 3D）；減少動態＝直接亮
  function flip(i, quiet) {
    if (!S || S.flipped[i]) return;
    S.flipped[i] = true;
    var t = tileEl(i); if (!t) return;
    var g = isGoldSrc(S.p.src && S.p.src[i]);
    var swap = function () {
      if (!t.isConnected) return;
      t.classList.remove('down', 'turn'); t.classList.add('up');
      t.setAttribute('data-cid', S.p.cards[i]);
      t.innerHTML = tileUpInner(i);
      if (g && !A().rm) { t.classList.add('spark'); after(function () { t.classList.remove('spark'); }, 900); }
    };
    if (!quiet) sfx(g ? 'ding' : 'flip');
    if (A().rm || quiet) return swap();
    t.classList.add('turn');
    after(swap, ms('turn'));
  }
  function flipAll(quiet) { if (!S) return; for (var i = 0; i < S.p.cards.length; i++) flip(i, quiet); }
  function allFlipped() { return !!S && S.flipped.every(Boolean); }
  // 三張自己翻（每張隔 flipGap）
  function autoFlip(gap) {
    var k = 0;
    for (var i = 0; i < S.p.cards.length; i++) (function (j) {
      if (S.flipped[j]) return;
      after(function () { flip(j); if (allFlipped()) whenAllUp(); }, k++ * gap);
    })(i);
  }
  // 全部翻開之後：第一次出戰利品列，老闆提醒一次（save.seen.firstLoot；真的說了才記）。
  //   錢、經驗那兩條（頂上，約 3 秒）收掉才說：泡泡在店景右上，會被錢那條蓋住
  function whenAllUp() {
    if (!S || S.kind !== 'loot' || S.saidFirst) return;
    S.saidFirst = true;
    //   減少動態也一樣等（錢那條照樣在 1.35 秒出、停約 2 秒；而且一開始鏡頭還沒定，量泡泡出不出界會量錯）
    var wait = S.out ? Math.max(0, (S.t0 || 0) + ms('fly') + Math.round(3000 / A().k) - Date.now()) : 0;
    after(function () {
      try { if (!H.seen('firstLoot')) { H.markSeen('firstLoot'); ownerLine(U('firstLoot', { n: mt(S.p.skipCash || 400) }), 3800); } } catch (e) { console.error(e); }
    }, wait);
  }
  // 老闆說一句：店景泡泡；泡泡被舞台邊切掉（375 寬的領獎鏡頭，老闆在右上、泡泡只能往右放）就改成一顆吐司（整句看得到）。
  //   鏡頭可能還在動（重新整理回來、減少動態直接換鏡頭）：泡泡還在就多量幾次，哪一次出界就改吐司
  function ownerLine(text, ms) {
    var b = null; try { b = H.say('o', text, ms); } catch (e) { console.error(e); }
    var moved = false;
    var chk = function () {
      if (moved || !b || !b.isConnected) return;
      var r = b.getBoundingClientRect(), st = null; try { st = H.stageRect(); } catch (_) {}
      if (st && (r.left < st.left - 1 || r.right > st.right + 1 || r.top < st.top - 1)) { moved = true; try { H.unsay('o'); H.toast(text, 'keep long'); } catch (e) { console.error(e); } }
    };
    if (W.requestAnimationFrame) requestAnimationFrame(function () { requestAnimationFrame(chk); }); else setTimeout(chk, 32);
    [250, 700, 1400].forEach(function (t) { setTimeout(chk, t); });
  }

  // ------------------------------------------------------------------ 面板
  function gridHTML() {
    var n = S.p.cards.length, h = '';
    for (var i = 0; i < n; i++) h += S.flipped[i] ? tileUp(i) : tileDown(i);
    return '<div class="lb-rgrid lt-row n' + Math.max(3, Math.min(4, n)) + (S.popped ? '' : ' hold') + '" role="group">' + h + '</div>';
  }
  function footHTML() {
    var p = S.p, relics = (p.relics || []).filter(function (id) { return (C().relics || {})[id]; });
    var skipTx = esc(U('skip', { n: mt(p.skipCash || 0) }));
    if (p.relicDone || !relics.length) return '<div class="foot"><button type="button" class="lb-btn wide lt-skip" data-a="skip">' + skipTx + '</button></div>';
    var skip = '<button type="button" class="lb-btn lt-skip" data-a="skip">' + skipTx + '</button>';
    var cap = S.kind === 'chest' ? U('chestRelic') : U('orRelic');
    // 第 D 波（SPEC-D §2.8-6）：樂歷 Lv10 起菁英／藏家的配件三選一＝三件排成一列三格，「不收 +$200」移到下一行的小字鈕（站面板照捲，三格在第一屏）
    if (relics.length > 1) return '<div class="lt-rel3"><span class="cap">' + esc(cap) + '</span><div class="row3">' + H.relicButtonsHTML(relics, 'data-r', { cell: true }) + '</div></div>' +
      '<div class="foot"><button type="button" class="lb-btn wide lt-skip sm" data-a="skip">' + skipTx + '</button></div>';
    return '<div class="foot two rel"><div class="orr"><span class="cap">' + esc(cap) + '</span>' + H.relicButtonsHTML(relics, 'data-r') + '</div>' + skip + '</div>';
  }
  // 木箱（保底那箱：箱子底下也寫老闆那句，店景右上的泡泡常被頂上錢那條蓋住）
  function crateHTML() {
    var pity = S.out && S.out.pity;
    return '<button type="button" class="lt-crate' + (pity ? ' pity' : '') + '" data-a="lid" aria-label="' + esc(U('chestOpen')) + '"><span class="box" aria-hidden="true"><i class="lid"></i><i class="body"></i></span>' +
      (pity ? '<span class="pt">' + esc(U('chestPity')) + '</span>' : '') + '<span class="cap">' + esc(U('chestOpen')) + '</span></button>';
  }
  function sheetHTML() {
    var p = S.p, r = H.run(), title = S.kind === 'chest' ? U('chestTitle') : U('lootTitle');
    var bag = r && Array.isArray(r.bag) ? H.bagText(r.bag.length) : '';
    var cards = p.cards && p.cards.length;
    return '<div class="hd"><h3>' + esc(title) + '</h3><span class="sub">' + esc(bag) + '</span></div>' +
      (cards ? '<div class="lt-area' + (S.kind === 'chest' && !S.open ? ' shut' : '') + '">' + gridHTML() + (S.kind === 'chest' && !S.open ? crateHTML() : '') + '</div>' +
        '<p class="note">' + esc(H.rewardNote()) + '</p>' : '') +
      footHTML();
  }
  function render() {
    var s = H.sheet(sheetHTML(), 'reward lt-sheet ' + S.kind);
    S.el = s;
    s.addEventListener('click', onClick);
    H.fit(s);
    return s;
  }

  // ------------------------------------------------------------------ 點擊
  function onClick(e) {
    if (!S || S.busy) return;
    var t = e.target, el;
    if ((el = t.closest && t.closest('[data-flip]'))) {
      if (!S.armed) return;
      var i = +el.getAttribute('data-flip');
      groundTap();
      flip(i); if (allFlipped()) whenAllUp();
      return;
    }
    if ((el = t.closest && t.closest('[data-a=lid]'))) { if (!S.open) groundTap(); openLid(); return; }
    if ((el = t.closest && t.closest('[data-pick]'))) { if (!el.disabled) takeIt(el.getAttribute('data-pick'), el); return; }
    if ((el = t.closest && t.closest('[data-r]'))) { relicIt(el.getAttribute('data-r')); return; }
    if ((el = t.closest && t.closest('[data-a=skip]'))) { skipIt(); return; }
  }
  // 上線後記（SPEC-C §15「點地上東西的比例」）：這一列玩家自己點了蓋牌／木箱（不是等它自己翻）；一列最多算一次，÷ lootRows 就是比例
  function groundTap() { if (!S || S.tapped) return; S.tapped = true; try { if (H.log) H.log('ground'); } catch (e) { console.error(e); } }
  // 錢還沒飛（玩家很快就選了）：剩下的幾段併成一段，排到下一個畫面才跳（ui.js cashAfter）
  function flushMoney(extra) {
    if (!S) return;
    var segs = S.money.filter(function (x) { return !x.shown; });
    S.money.forEach(function (x) { x.shown = true; });
    var r = H.run(), now = r ? r.money | 0 : 0;
    var from = segs.length ? segs[0].from : now - (extra | 0);
    if (now > from) H.cashAfter(from, now);
  }
  // 這一列的唱片全部算「認識」（rewardNote「沒收的也都算認識了」）；回新認識的張數
  function shelveAll() {
    var n = 0;
    (S.p.cards || []).forEach(function (id) { if (!card(id)) return; var had = false; try { had = !!H.shelfHas(id); } catch (_) {} if (!had) n++; try { H.shelfAdd(id); } catch (e) { console.error(e); } });
    return n;
  }
  function done(res) {
    var fin = S.finish;
    S.busy = true;
    lexpToast();                                  // 紅包是樂歷那種、還沒演到就選了：吐司照出（.keep，換畫面也留著）
    fin(res);
  }
  function lexpToast() {
    var pk = S && S.out && S.p.packet;
    if (!pk || pk.kind !== 'lexp' || S.lexpShown) return;
    S.lexpShown = true;
    try { H.toast(U('packetLexp', { n: pk.n }), 'gold keep'); } catch (e) { console.error(e); }
  }
  function takeIt(id, btn) {
    S.busy = true; sfx('pocket');
    var tile = btn && btn.closest('.lt-c'), cv = tile && qs('.lb-cv', tile), c = card(id);
    shelveAll();
    try { if (cv && c) H.fly(c, cv, H.bagRect()); } catch (e) { console.error(e); }
    H.take(id).then(function (res) {
      if (!res) { S.busy = false; return; }
      flushMoney(0);
      done(res);
    });
  }
  function relicIt(rid) {
    S.busy = true; sfx('select');
    H.relic(rid).then(function (res) {
      var r = H.run();
      if (!res || (r && r.pending === S.p && !S.p.relicDone)) { S.busy = false; if (H.alive()) redraw(); return; }   // 配件滿了按「算了」：同一列放回來
      shelveAll();
      flushMoney(0);
      done(res);
    });
  }
  function skipIt() {
    S.busy = true;
    flipAll(true);
    var n = shelveAll();
    var res = H.skip();
    var cash = 0; ((res && res.effects) || []).forEach(function (f) { if (f.cash) cash += f.cash; });
    if (n > 0) {
      sfx('select');
      try { H.toast(U('shelfPlus', { n: n }), 'keep'); } catch (e) { console.error(e); }
      if (!A().rm) qsa('.lt-c .lb-cv', S.el).forEach(function (cv, j) { var c = card(S.p.cards[j]); try { if (c) H.fly(c, cv, H.wallRect()); } catch (e) { console.error(e); } });
    }
    flushMoney(cash);
    done(res);
  }

  // ------------------------------------------------------------------ 面板頂邊的演出（字幕、錢袋、音符、紅包）
  //   掛在 #app、壓在舞台上（舞台 z 3 比面板高）：ui.js overlay() 把它的 top 釘在舞台下緣＝面板頂邊（鏡頭收放時 ResizeObserver 跟著走）；換畫面 cleanup 收掉
  function fxLayer() {
    qsa('.lt-fx').forEach(function (x) { x.remove(); });
    var f = D.createElement('div'); f.className = 'lt-fx';
    try { H.overlay(f); } catch (e) { console.error(e); return null; }
    return f;
  }
  function caption(fx) {
    var beats = (C().script && C().script.drop) || [], b = beats[0];
    if (!b || !b.text || !fx) return;
    var cap = D.createElement('div'); cap.className = 'lt-cap'; cap.textContent = b.text;
    cap.setAttribute('role', 'status'); cap.setAttribute('aria-live', 'polite');
    fx.appendChild(cap);
    after(function () { cap.classList.add('out'); after(function () { cap.remove(); }, 400); }, ms('cap'));
  }
  function itemHTML(cls, label) { return '<span class="lt-it pre ' + cls + '"><i class="ic" aria-hidden="true"></i><b>' + esc(label) + '</b></span>'; }
  // 錢、經驗飛向頂欄（WAAPI；減少動態＝淡掉）
  function flyUp(node, then) {
    if (!node) { if (then) then(); return; }
    var top = null; try { top = H.topRect(); } catch (_) {}
    var r = node.getBoundingClientRect();
    if (A().rm || !top || !node.animate) { node.classList.add('gone'); if (then) then(); return; }
    var dx = top.left + top.width / 2 - (r.left + r.width / 2), dy = top.top + top.height / 2 - (r.top + r.height / 2);
    var a = node.animate([{ transform: 'none', opacity: 1 }, { transform: 'translate(' + Math.round(dx) + 'px,' + Math.round(dy) + 'px) scale(.55)', opacity: 0.2 }],
      { duration: Math.round(420 / A().k), easing: 'cubic-bezier(.4,0,.8,.6)', fill: 'forwards' });
    a.onfinish = function () { node.classList.add('gone'); if (then) then(); };
  }
  function drops(fx, out) {
    if (!fx || !out) return [];
    var row = D.createElement('div'); row.className = 'lt-drops'; fx.appendChild(row);
    var items = [];
    if (out.earn > 0) items.push(['bag', '+' + money(out.earn)]);
    if (out.xp && out.xp.gain > 0) items.push(['note', U('xpGain', { n: out.xp.gain })]);
    var pk = S.p.packet;
    if (pk && pk.kind === 'cash' && out.packetCash > 0) items.push(['pk', U('packetCash') + ' +' + money(out.packetCash)]);
    else if (pk && pk.kind === 'lexp') items.push(['pk lexp', U('packetLexp', { n: pk.n })]);
    row.innerHTML = items.map(function (x) { return itemHTML(x[0], x[1]); }).join('');
    return qsa('.lt-it', row);
  }

  // ------------------------------------------------------------------ 戰利品列
  function lootFlow(o) {
    if (!ok('lootFlow')) return;
    o = o || {};
    var p = o.p, out = o.out || null, a = A();
    S = { kind: 'loot', p: p, out: out, finish: o.finish || function () {}, el: null, busy: false, armed: false, popped: false, open: true, t0: Date.now(),
      flipped: (p.cards || []).map(function () { return !out || a.rm; }), money: [] };
    // 錢：先酬勞（起點扣掉紅包那筆，CRITIQUE 1.9b）、再紅包那一段
    if (out) {
      var m = out.money | 0, pk = out.packetCash | 0;
      if (out.earn > 0) S.money.push({ from: m - pk - out.earn, to: m - pk });
      if (pk > 0) S.money.push({ from: m - pk, to: m, packet: true });
    }
    if (!out || a.rm) { S.popped = true; S.armed = true; }
    render();
    if (p.cards && p.cards.length) try { H.floor(p.cards[0]); } catch (e) { console.error(e); }
    policyHook();
    if (!out) { if (allFlipped()) whenAllUp(); return; }
    var fx = fxLayer();
    caption(fx);
    var its = drops(fx, out);
    // 0.3 秒：錢袋、音符、紅包、三張蓋牌一樣一樣跳出來（每樣一聲啵，一次比一次高）
    after(function () {
      var grid = qs('.lt-row', S.el), tiles = qsa('.lt-c', S.el), k = 0;
      if (grid) grid.classList.remove('hold');
      S.popped = true;
      its.concat(tiles).forEach(function (node, j) {
        if (a.rm) { node.classList.remove('pre'); node.classList.add('in'); return; }   // 減少動態：直接淡進（不彈）
        node.classList.add('pre');
        after(function () { node.classList.remove('pre'); node.classList.add('in'); sfx('pop', { k: Math.min(6, k++) }); }, j * ms('popGap'));
      });
    }, a.rm ? 0 : ms('pop'));
    after(function () { S.armed = true; }, a.rm ? 0 : ms('arm'));
    // 1.35 秒：錢、經驗飛進頂上那條
    after(function () {
      var bag = qs('.lt-it.bag', fx), note = qs('.lt-it.note', fx), pkEl = qs('.lt-it.pk', fx);
      flyUp(bag, function () { var s0 = S.money[0]; if (s0 && !s0.shown && !s0.packet) { s0.shown = true; H.cashRise(s0.from, s0.to); } });
      if (note) after(function () { flyUp(note, function () { try { H.xpRise(out.xp); } catch (e) { console.error(e); } }); }, 120);
      if (pkEl) after(function () {
        flyUp(pkEl, function () {
          var s1 = S.money.filter(function (x) { return x.packet; })[0];
          if (s1 && !s1.shown) { s1.shown = true; sfx('coin', { k: 4 }); H.cashRise(s1.from, s1.to); }
          else lexpToast();
        });
      }, 900);
    }, ms('fly'));                                   // 減少動態也等到 1.35 秒（錢袋、音符先停在面板頂邊看得到，時間到直接收、不飛）
    // 1.5 秒起：沒翻的自己翻
    if (!a.rm) after(function () { autoFlip(ms('flipGap')); }, ms('autoflip'));
    else whenAllUp();
  }

  // ------------------------------------------------------------------ 藏家寶箱
  function chestFlow(o) {
    if (!ok('chestFlow')) return;
    o = o || {};
    var p = o.p, out = o.out || null, a = A();
    var instant = !out || a.rm;
    S = { kind: 'chest', p: p, out: out, finish: o.finish || function () {}, el: null, busy: false, armed: true, popped: true, open: instant,
      flipped: (p.cards || []).map(function () { return instant; }), money: [] };
    if (out && out.dareCash > 0) S.money.push({ from: (out.money | 0) - out.dareCash, to: out.money | 0, dare: true });
    render();
    sfx('crate');
    policyHook();
    if (instant) {
      if (out && out.dareCash > 0) { S.money[0].shown = true; H.toast(U('dareDone', { n: mt(out.dareCash) }), 'gold keep'); H.cashRise(S.money[0].from, S.money[0].to); }
      return;
    }
    // 掀蓋前：保底（這箱一定有鎮店盤格）＝老闆驚嘆號＋泡泡；踢館帖撐完＝+$5,000
    after(function () {
      if (out.pity) { try { H.emote('o', 'excl', 1600); H.say('o', U('chestPity'), 2200); } catch (e) { console.error(e); } }
      var d = S.money.filter(function (x) { return x.dare; })[0];
      if (d && !d.shown) { d.shown = true; H.toast(U('dareDone', { n: mt(out.dareCash) }), 'gold keep'); H.cashRise(d.from, d.to); }
    }, ms('pop'));
    after(openLid, ms('lid'));
  }
  function openLid() {
    if (!S || S.kind !== 'chest' || S.open) return;
    S.open = true;
    var area = qs('.lt-area', S.el), crate = qs('.lt-crate', S.el);
    sfx('crate');
    if (crate) { crate.classList.add('open'); after(function () { crate.remove(); }, A().rm ? 0 : 320); }
    if (area) area.classList.remove('shut');
    autoFlip(ms('chestGap'));
  }

  // ------------------------------------------------------------------ 自動玩（__lab.autoplay）：先全部翻開，再照引擎策略收／換配件／不收
  function policyHook() {
    try {
      H.auto(function () {
        if (!S || S.busy) return;
        if (S.kind === 'chest' && !S.open) { S.open = true; var cr = qs('.lt-crate', S.el); if (cr) cr.remove(); var ar = qs('.lt-area', S.el); if (ar) ar.classList.remove('shut'); }
        flipAll(true);
        var ch = H.policy() || { type: 'skip' };
        if (ch.type === 'take' && S.p.cards.indexOf(ch.cardId) >= 0) takeIt(ch.cardId, qs('[data-pick="' + (W.CSS && CSS.escape ? CSS.escape(ch.cardId) : ch.cardId) + '"]', S.el));
        else if (ch.type === 'relic') { S.busy = true; H.relic(ch.relicId, ch.dropRelicId).then(function (res) { if (!res) { S.busy = false; skipIt(); return; } shelveAll(); flushMoney(0); done(res); }); }
        else skipIt();
      }, 300);
    } catch (e) { console.error(e); }
  }

  function redraw() {
    if (!S || !H || !H.alive()) return;
    S.busy = false; S.armed = true; S.popped = true;
    if (S.kind === 'chest' && !S.open) S.open = true;
    for (var i = 0; i < S.flipped.length; i++) S.flipped[i] = true;
    render();
    policyHook();
  }

  W.DipLabLoot = {
    configure: function (host) { H = host || null; },
    lootFlow: lootFlow,
    chestFlow: chestFlow,
    redraw: redraw,
    flipAll: function () { flipAll(true); if (S && S.kind === 'chest' && !S.open) { S.open = true; var cr = S.el && qs('.lt-crate', S.el); if (cr) cr.remove(); var ar = S.el && qs('.lt-area', S.el); if (ar) ar.classList.remove('shut'); } },
    state: function () { return S ? { kind: S.kind, flipped: S.flipped.slice(), open: S.open, busy: S.busy, armed: S.armed } : null; }
  };
})();
