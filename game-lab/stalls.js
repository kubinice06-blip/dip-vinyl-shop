/* game-lab/stalls.js：第 C 波 店內攤位二選一＋中繼點開局（scratchpad v5/wave-c SPEC-C §4.3–§4.7；介面代理 B）。
 *
 * window.DipLabStalls = {
 *   configure(host)   // ui.js boot 接一次（host 見下）
 *   night(o)          // SCREENS.night 遇到 pending stall：o = { r, slot（「第 n 輪」底下那格）, box }。底部換成「今天的攤位」兩列；選完走到站、開各站面板；逛完 host.done()
 *   busy(action)      // 攤位中點了箱子／收音機／櫃檯／對戰台：回 true＝這裡處理掉了（現在都回 false，ui.js 出「先逛完今天的攤位。」）
 *   cpPick()          // 開店「從哪裡開始？」→ Promise<N>（只有第 1 位＝直接 1，不出面板）
 *   draft(o)          // 中繼點開局快速選秀（pending draft）→ Promise（選完＝pending 不是 draft）。o = { sc }（場景：撿盤後重畫包包條）
 *   state()           // 測試用：{ phase:'pick'|'walk'|'station'|'leave'|'studio'|null, sel, kind, flipped }
 * }
 *
 * host（ui.js 給；交易一律走 ui 的 doChoose）：
 *   content, engine, run(), persist(), choose(ch) → res, alive()（還在來客畫面）, stg(...) / stgP(...)（舞台）, cam(name, screen, ms, panelMin),
 *   sheet(html, cls) → el, closeSheet(el), naturalH(el), vh(), say(id, text, ms), toast(text, cls), sfx(n, o), cashRise(from, to),
 *   after(fn, ms)（換畫面清掉；ms 不再除速度）, anim() → { fast, k, rm }, auto(fn, ms)（自動玩登記）, autoOn(), policy() → choice（engine.cPolicy）,
 *   coverHTML(c, o), starsHTML(c, o), tileHTML(c, o), relicButtonsHTML(ids, attr), relicName(id), relicOf(id), relicIcon(id, size), pix(rows, size, cls),
 *   relicPanel(choices, opts) → Promise<id|null>, levelPanel(r, { title, offer }) → Promise<pick>, play(c)（試聽）,
 *   refresh()（錢、包包那條重畫）, done()（逛完：回來客畫面）, setSpot(name)（你站的位置，來客畫面重畫時不走回去）,
 *   enemySpr(id), log(k)（save.wcLog 計數）, checkpoints() → [N…], renderStrip(sc)
 *
 * 擺法（SPEC-C §4.3、§4.5；定稿：店裡不加家具、不動走道）：選組在底部面板（兩列，每列 ≥44 px、整列可點）；點一列＝預覽（那列亮、另一列暗、店裡兩站的角落亮），
 *   再點一次（或「就這組」）＝選定；小人沿既有走道走到站的角落（spots），站主用 f；小面板（lb-sheet）從底部升起，鏡頭對焦那個角落。錄音室不出面板（0.8 秒自動 ok）。
 *   「今天不逛了」選組前、選組後、市集裡都在，按了先確認。重新整理：pick null＝回選組；有 cur＝人直接站在那一站、面板打開（不重走）。
 * 前綴 st-；樣式在 stalls.css。只掛 window.DipLabStalls；不碰 localStorage。
 */
(function () {
  'use strict';
  var W = window, D = document;
  var H = null;           // host
  var S = null;           // 這一場攤位的畫面狀態（同時只有一場）

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function fill(s, o) { return String(s == null ? '' : s).replace(/\{(\w+)\}/g, function (m, k) { return o && o[k] != null ? o[k] : m; }); }
  function C() { return H.content; }
  function E() { return H.engine; }
  function WC() { return (C().waveC) || {}; }
  function U(k, o) { var u = WC().ui || {}; return fill(u[k] == null ? '' : u[k], o); }
  function NM(kind) { return (WC().stations || {})[kind] || kind; }
  function LN(kind) { return (WC().stationLines || {})[kind] || ''; }
  function CFG() { return E().wcCfg ? E().wcCfg(C()) : WC(); }
  function ST() { return CFG().stall || {}; }
  function card(id) { return (C().cards && C().cards[id]) || null; }
  function mt(n) { return E().moneyText ? E().moneyText(n) : String(n); }
  function money(n) { return fill((C().shopUi && C().shopUi.money) || '${n}', { n: mt(n) }); }
  function run() { try { return H.run(); } catch (_) { return null; } }
  function P() { var r = run(); return r && r.pending && r.pending.type === 'stall' ? r.pending : null; }
  function stg() { try { return H.stg.apply(null, arguments); } catch (e) { console.error(e); return null; } }
  function stgP() { var a = arguments; return Promise.resolve().then(function () { return H.stgP.apply(null, a); }).catch(function (e) { console.error(e); }); }
  function sfx(n, o) { try { H.sfx(n, o); } catch (e) { console.error(e); } }
  function A() { var a = {}; try { a = H.anim() || {}; } catch (_) {} return { fast: !!a.fast, k: a.k > 0 ? a.k : 1, rm: !!a.rm }; }
  // 時間（毫秒，正常速度）：動畫加速＝自己翻 1.5→0.6 秒、站之間 0.6→0.3 秒；?fast=1 再除 k
  var T0 = { autoflip: 1500, between: 600, studio: 800, flipGap: 150, turn: 110 };
  function ms(key) { var a = A(), v = T0[key]; if (a.fast) v = key === 'autoflip' ? 600 : v / 2; return Math.round(v / a.k); }
  function after(fn, t) { var tok = S; return H.after(function () { if (S !== tok || !S) return; fn(); }, t); }
  function qs(sel, root) { return (root || D).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || D).querySelectorAll(sel)); }
  function ok(fn) { if (H && H.content && H.engine) return true; console.error('[stalls] ' + fn + '：先呼叫 DipLabStalls.configure()'); return false; }

  // ------------------------------------------------------------------ 站牌圖示（12×12 像素；dip-character PIX_PAL 的色）
  var ICON = {
    dig: ['............', '............', '..tttttttt..', '.tuuuuuuuut.', '.tkkkkkkkkt.', '.tkwwkkwwkt.', '.tttttttttt.', '.tuuuuuuuut.', '.tuuuuuuuut.', '.tttttttttt.', '............', '............'],
    trade: ['............', '..kkk..kkk..', '.kyyyk.kwwk.', '.kyyyk.kwwk.', '.kyyyk.kwwk.', '..kkk..kkk..', '............', '..k.....k...', '.kkkkkkkkk..', '..k.....k...', '............', '............'],
    gear: ['............', '.........kk.', '........kk..', '.......kk...', '......kk....', '.....kk.....', '....kk......', '...kk.......', '..kk........', '.kkk........', '.kkd........', '............'],
    snack: ['....d..d....', '.....d..d...', '....d..d....', '............', '.kkkkkkkkkk.', '.kyyyyyyyyk.', '.kyoyyoyyyk.', '..kyyyyyyk..', '...kkkkkk...', '....kkkk....', '............', '............'],
    gig: ['............', '.kkkkkkkkkk.', '.kmmmmmmmmk.', '.kmwwmmwwmk.', '..kmmmmmmk..', '..kmmmmmmk..', '.kmwwmmwwmk.', '.kmmmmmmmmk.', '.kkkkkkkkkk.', '............', '............', '............'],
    promo: ['.........k..', '........k...', '.kkkkkkkkkk.', '.kwwwwkdddk.', '.kwkkwkdkdk.', '.kwwwwkdddk.', '.kwkkwkdkdk.', '.kwwwwkdddk.', '.kkkkkkkkkk.', '..k......k..', '............', '............'],
    fortune: ['............', '....kkkk....', '...kccwck...', '..kccccwck..', '..kcccccck..', '..kcccccck..', '...kcccck...', '....kkkk....', '...kppppk...', '..kppppppk..', '..kkkkkkkk..', '............'],
    consign: ['............', '..kkkkkkkk..', '..kwwwwwwk..', '..kwkkkkwk..', '..kwwwwwwk..', '..kwkkkwwk..', '..kwwwwwwk..', '..kwkkkkwk..', '..kwwwwwwk..', '..kkkkkkkk..', '............', '............'],
    home: ['............', '.kkkkkkkkkk.', '.kdddddddkk.', '.kdkkkkkdkk.', '.kdkkwkkdkk.', '.kdkkkkkdkk.', '.kdddddddkk.', '.kkkkkkkkkk.', '.k........k.', '............', '............', '............'],
    dare: ['............', '.kkkkkkkkkk.', '.kkwwwwwwkk.', '.kwkwwwwkwk.', '.kwwkwwkwwk.', '.kwwwkkwwwk.', '.kwwwwwwwwk.', '.kwwwwwwwwk.', '.kkkkkkkkkk.', '.....rr.....', '............', '............'],
    warehouse: ['............', '.kkkkkkkkkk.', '.kttttttttk.', '.kkkkkkkkkk.', '.kuuuuuuuuk.', '.kuuukkuuuk.', '.kuuukkuuuk.', '.kuuuuuuuuk.', '.kkkkkkkkkk.', '............', '............', '............'],
    market: ['............', '.rwrwrwrwrw.', '.rwrwrwrwrw.', '.kkkkkkkkkk.', '.k........k.', '.k.kk..kk.k.', '.k.kk..kk.k.', '.kkkkkkkkkk.', '.k........k.', '.k........k.', '............', '............'],
    studio: ['....kkkk....', '...kddddk...', '...kdwddk...', '...kddddk...', '...kddddk...', '....kkkk....', '..k..kk..k..', '...kkkkkk...', '.....kk.....', '...kkkkkk...', '............', '............']
  };
  ICON.consignGet = ICON.consign;
  function icon(kind, size) { var rows = ICON[kind]; var h = ''; try { h = rows ? H.pix(rows, size || 16, 'st-ic') : ''; } catch (_) {} return h || '<span class="st-ic tx" aria-hidden="true"></span>'; }

  // ------------------------------------------------------------------ 店裡對應（SPEC-C §4.5）：亮哪裡（熱點 id）、小人走到哪（spot 名或 [x,y]）、站主
  var SPOT = { trade: 'pay', gear: 'radio', snack: 'listen', gig: 'mid', promo: 'radio', fortune: 'leaving', consign: 'pay', consignGet: 'pay',
    home: 'pay', dare: 'atdoor', warehouse: 'pay', market: 'browse', studio: 'listen' };
  var HOT = { trade: ['counter'], gear: ['radio'], snack: ['booth'], gig: ['bin:picks'], promo: ['radio'], fortune: ['bin:blues'], consign: ['counter'],
    consignGet: ['counter'], home: ['counter', 'now'], dare: ['door'], warehouse: ['counter'], studio: ['booth'],
    market: ['bin:rock', 'bin:elec', 'bin:soul', 'bin:hiphop', 'bin:citypop', 'bin:classical', 'bin:world', 'bin:folk', 'bin:jazz', 'bin:tw'] };
  var DIG_PREVIEW = ['bin:jazz', 'bin:tw'];
  function binsOf() { var b = stg('bins'); return Array.isArray(b) ? b : []; }
  // 挖寶攤：攤名對到的箱（content digNames.lit 的 prop id）→ 熱點；前排爵士／台灣站 dig1／dig2，島台照那一箱的 stand
  function digPlace(cur) {
    var lit = (cur && cur.lit) || [], bs = binsOf(), hots = [], stand = null;
    lit.forEach(function (pid) { var b = bs.filter(function (x) { return x.propId === pid; })[0]; if (b) { hots.push(b.hotId); if (!stand) stand = pid === 'crate-jazz' ? 'dig1' : pid === 'crate-tw' ? 'dig2' : (b.stand ? b.stand.slice(0, 2) : null); } });
    if (!hots.length) hots = ['bin:new'];
    return { hots: hots, spot: stand || 'dig1' };
  }
  function placeOf(kind, cur) {
    if (kind === 'dig') return cur ? digPlace(cur) : { hots: DIG_PREVIEW, spot: 'dig1' };
    return { hots: HOT[kind] || [], spot: SPOT[kind] || 'browse' };
  }
  function lightUp(hots) { stg('highlight', hots && hots.length ? [{ ids: hots }] : []); }

  // ------------------------------------------------------------------ 價位（站牌第三行；SPEC-C §4.3-1：免費／$n 起／樂歷）
  function priceTag(kind) {
    var st = ST(), pr = (C().economy && C().economy.price) || {};
    if (kind === 'trade') { var lo = Math.min.apply(null, ['common', 'rare', 'uncommon', 'epic', 'legendary'].map(function (k) { return pr[k] || 1e9; })); return U('priceFrom', { n: mt(lo < 1e9 ? lo : 800) }); }
    if (kind === 'gear') return U('priceFrom', { n: mt(st.gearPrice || 3000) });
    if (kind === 'gig') { var r = run(); return U('priceFrom', { n: mt(r && E().gigPrice ? E().gigPrice(r, C(), 1) : ((st.gig || {}).base || 3000)) }); }
    if (kind === 'promo' || kind === 'home') return U('priceLexp');
    if (kind === 'snack') { var rs = run(); if (rs && rs.hp >= rs.maxHp) return U('snackFullTag'); }   // 聲望滿了：選之前就看得出今天去宵夜沒用
    return U('priceFree');
  }
  function isBlue(kind) { return (ST().blue || []).indexOf(kind) >= 0; }

  // ------------------------------------------------------------------ 選組（底部兩列）
  function rowHTML(g, kinds, i) {
    var sel = S.sel === i, dim = S.sel != null && S.sel !== i;
    return '<button type="button" class="st-row' + (sel ? ' on' : '') + (dim ? ' dim' : '') + '" data-g="' + i + '" aria-pressed="' + (sel ? 'true' : 'false') + '">' +
      '<span class="sd">' + esc(U(i ? 'right' : 'left')) + '</span>' +
      kinds.map(function (k) {
        return '<span class="st-tile' + (isBlue(k) ? ' blue' : '') + (k === 'dare' ? ' dare' : '') + '">' + icon(k, 16) + '<span class="nm">' + esc(NM(k)) + '</span><span class="pr">' + esc(priceTag(k)) + '</span></span>';
      }).join('') +
      '<span class="go" aria-hidden="' + (sel ? 'false' : 'true') + '">' + esc(U('pickThis')) + '</span></button>';
  }
  function leaveBtn() { return '<button type="button" class="st-leave" data-a="leave">' + esc(U('leave', { n: mt(ST().leaveCash || 1000) })) + '</button>'; }
  function postLine(p) {
    var post = (p.post || []).map(NM);
    return post.length ? '<span class="st-post">' + esc(U('then', { list: post.join('・') })) + '</span>' : '';
  }
  function renderPick() {
    var p = P(); if (!p || !S.slot) return;
    S.phase = 'pick';
    var h = '<div class="st-pick" role="group" aria-label="' + esc(U('stallTitle')) + '">' +
      '<div class="st-hd"><b>' + esc(U('stallTitle')) + '</b>' + postLine(p) + '</div>' +
      p.groups.map(function (g, i) { return rowHTML(p, g, i); }).join('') + leaveBtn() + '</div>';
    S.slot.innerHTML = h;
    fitPick();
  }
  // 選組那塊量出來多高，舞台就讓出多高（full 鏡頭：矮螢幕從牆頂往下裁，門、窗、收音機那排照樣看得到）
  function fitPick() {
    if (!S || !S.box) return;
    var need = Math.max(170, Math.ceil(H.naturalH(S.box) + 6));
    try { H.cam('full', 'map', S.camMs != null ? S.camMs : 600, need); } catch (e) { console.error(e); }
    S.camMs = 300;
  }
  function preview(i) {
    var p = P(); if (!p || !p.groups[i]) return;
    S.sel = i;
    renderPick();
    var hots = [];
    p.groups[i].forEach(function (k) { placeOf(k, null).hots.forEach(function (h) { if (hots.indexOf(h) < 0) hots.push(h); }); });
    lightUp(hots);
  }
  function pickGroup(i) {
    var p = P(); if (!p || p.pick != null) return;
    var res = H.choose({ type: 'stallPick', group: i });
    if (!res || !res.ok) { console.warn('[stalls] stallPick', res && res.error); return; }
    sfx('select');
    S.sel = null;
    next(true);
  }

  // ------------------------------------------------------------------ 進行中那一行（走路、站與站之間）
  function renderProgress() {
    var p = P(); if (!p || !S.slot) return;
    var steps = p.q.map(function (k, i) { return '<span class="' + (i < p.k ? 'done' : i === p.k ? 'cur' : '') + '">' + esc(NM(k)) + '</span>'; }).join('<i aria-hidden="true">›</i>');
    S.slot.innerHTML = '<div class="st-pick st-prog"><div class="st-hd"><b>' + esc(U('stallTitle')) + '</b></div><p class="st-steps">' + steps + '</p>' +
      (p.cur && p.cur.kind === 'studio' ? '' : leaveBtn()) + '</div>';
  }

  // ------------------------------------------------------------------ 流程
  //   next(walk)：照 pending 決定下一步——逛完＝收尾；選組前（寄賣領完）＝回選組；有 cur＝走過去（walk）或直接站好（重新整理）、開面板
  function next(walk) {
    if (!S) return;
    var r = run(), p = P();
    closeStation();
    if (!p) return finish();
    if (!p.cur && p.k < p.q.length && E().stallResume) { try { E().stallResume(r, C()); H.persist(); } catch (e) { console.error(e); } p = P(); if (!p) return finish(); }
    if (!p.cur) {
      if (p.pick == null) { S.phase = 'pick'; restoreNpc(); lightUp([]); renderPick(); stallHint(); autoPick(); return; }
      return finish();
    }
    goStation(p.cur, walk);
  }
  function stallHint() {
    if (S.hinted) return;
    S.hinted = true;
    after(function () { try { H.say('o', U('stallHint'), 2600); } catch (e) { console.error(e); } }, 350);
  }
  function autoPick() {
    H.auto(function () {
      var ch = null; try { ch = H.policy(); } catch (_) {}
      if (ch && ch.type === 'stallPick') pickGroup(ch.group);
      else if (ch && ch.type) act(ch);
    }, 260);
  }
  function finish() {
    if (!S) return;
    var spot = S.spot;
    closeStation(); restoreNpc(); lightUp([]);
    if (spot) try { H.setSpot(spot); } catch (_) {}
    S.phase = null;
    var tok = S; S = null;
    try { H.done(tok); } catch (e) { console.error(e); }
  }
  // 走到站（SPEC-C §4.3-3）：小人沿既有走道走到那一站的角落；站主出現；到了開面板。走路途中點底部＝直接走到
  function goStation(cur, walk) {
    var kind = cur.kind, pl = placeOf(kind, cur), tok = S;
    S.kind = kind; S.spot = typeof pl.spot === 'string' ? pl.spot : null; S.phase = 'walk';
    renderProgress();
    lightUp(pl.hots);
    var arrive = function () {
      if (S !== tok || !S) return;
      var pc = P(); if (!pc || pc.cur !== cur) return;
      faceTo(pl.hots[0]);
      npcFor(cur);
      if (kind === 'studio') return studio(cur);
      openStation(cur);
    };
    var p = stg('pos', 'p'), sp = typeof pl.spot === 'string' ? stg('spot', pl.spot) : pl.spot;
    if (sp) crowd('yield', sp);                                 // 活店（SPEC-H §4.3）：停在那一站的客人先讓開
    if (!walk || A().rm || !p || p.hidden || p.outside || !sp || H.autoOn()) {
      if (sp) stg('put', 'p', pl.spot); stg('hide', 'p', false);
      return after(arrive, walk ? 120 : 0);
    }
    if (Math.round(p.x) === Math.round(sp[0]) && Math.round(p.y) === Math.round(sp[1])) return after(arrive, ms('between'));
    stg('pose', 'p', null);
    after(function () { stgP('walk', 'p', [pl.spot], 110).then(arrive); }, S.walked ? ms('between') : 0);
    S.walked = true;
  }
  function centerOf(hid) {
    var hs = stg('hotspots') || [];
    for (var i = 0; i < hs.length; i++) if (hs[i].id === hid) { var r = hs[i].rect; return [r[0] + r[2] / 2, r[1] + r[3] / 2]; }
    return null;
  }
  function faceTo(hid) { var c = hid && centerOf(hid); if (c) stg('faceTo', 'p', c); }
  // 站主（f；這時客人還在門外）：同業老闆站櫃檯前（spots.regular＝活店結帳點 c-pay）、算命阿姨站窗邊、遞帖的（這一輪帶頭那位）站門口；宵夜＝老闆端麵線過來
  //   活店（SPEC-H §3.1）：店裡的客人原地照翻（導演 still）；站主要站的那格、老闆要走的路先讓開（Crowd.clearSpot／clearRoute）
  function crowd(m) {
    var K = W.DipLabCrowd; if (!K || typeof K[m] !== 'function') return null;
    try { return K[m].apply(K, Array.prototype.slice.call(arguments, 1)); } catch (e) { console.error(e); return null; }
  }
  var FORTUNE_AV = { head: 'long', hair: 'p', shirt: 'p', pants: 'k', skin: 'v' };
  function npcFor(cur) {
    var k = cur.kind;
    restoreNpc();
    if (k === 'trade') { crowd('clearSpot', 'regular'); stg('put', 'f', 'regular', 'e4'); show('f'); S.npc = true; }
    else if (k === 'fortune') { stg('put', 'f', 'stFortune', FORTUNE_AV); show('f'); stg('faceTo', 'f', 'p'); S.npc = true; }
    else if (k === 'dare' && cur.lead) { var sp = null; try { sp = H.enemySpr(cur.lead); } catch (_) {} stg('door', 'open', { quiet: true }); stg('put', 'f', 'door', sp || 'e0'); show('f'); stg('faceTo', 'f', 'p'); S.npc = true; }
    else if (k === 'snack') { crowd('clearRoute', stg('route', 'o', 'stSnack'), { who: 'o' }); crowd('clearSpot', 'stSnack'); stgP('walk', 'o', ['stSnack'], 90).then(function () { stg('faceTo', 'o', 'p'); }); S.ownerOut = true; }
  }
  function show(id) { stg('hide', id, false); stg('sil', id, false); }
  function restoreNpc() {
    if (!S) return;
    if (S.npc) { stg('hide', 'f', true); stg('door', 'close'); S.npc = false; }
    if (S.ownerOut) { crowd('clearRoute', stg('route', 'o', 'counter'), { who: 'o' }); stgP('walk', 'o', ['counter'], 90).then(function () { stg('pose', 'o', 'busy'); }); S.ownerOut = false; }
  }
  // 錄音室（C 波）：不出面板，浮一行「錄了一段 demo。樂歷 +15」（第 D 波：入帳了，不寫之後開放）0.8 秒後自己送 ok（SPEC-C §4.3-4、CRITIQUE 6.3）
  function studio(cur) {
    S.phase = 'studio';
    var n = ST().demoLexp || 15;
    try { H.toast(U('demo', { n: n }), 'gold'); } catch (e) { console.error(e); }
    sfx('pocket');
    after(function () {
      var pc = P(); if (!pc || pc.cur !== cur) return;
      act({ type: 'stallAct', act: 'ok' });
    }, ms('studio'));
  }

  // ------------------------------------------------------------------ 各站面板（SPEC-C §4.4）
  function closeStation() {
    if (S && S.sheet) { try { H.closeSheet(S.sheet); } catch (_) {} S.sheet = null; }
    if (S) S.confirm = false;
  }
  function headHTML(cur) {
    var r = run(), kind = cur.kind, sub = cur.kind === 'dig' && cur.name ? ((WC().digTitles || {})[cur.name] || '') : '';
    // 標題列右邊＝「今天不逛了」小字鈕（面板底那條只放一兩顆大鈕：375×548 面板只有 290 px 高）；錢放在站主那句的右邊
    return '<div class="hd st-shd"><h3>' + icon(kind, 18) + '<span>' + esc(NM(kind)) + '</span>' + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</h3>' +
      (S.confirm || bagOpen(cur) ? '' : leaveBtn()) + '</div>' +
      '<p class="st-line"><span>' + (LN(kind) ? '「' + esc(LN(kind)) + '」' : '') + '</span><span class="mn">' + esc(money(r.money)) + '</span></p>';
  }
  // 市集的福袋開了還沒挑：要挑一張才能走（不然 $2,500 白花）
  function bagOpen(cur) { var r = run(); return !!(cur && cur.kind === 'market' && cur.bag && r && cur.bag.some(function (id) { return card(id) && r.bag.indexOf(id) < 0; })); }
  function lexpLine(n) { return '<p class="note st-lx">' + esc(U('lexpLater', { n: n })) + '</p>'; }
  // 演唱會（第 D 波 SPEC-D §2.1、§2.8；CONTRACT §3.1-9）：買票當下就寫「這一趟還能算幾張」（照現在的基本樂歷算＝下限，越往後走越多）；0＝已到上限、買票只算聽歌
  function gigRoomLine() {
    var U2 = (C().career && C().career.ui) || {}, r = run();
    if (!r || !E().gigRoom || !U2.gigRoom) return null;
    var n = 0; try { n = E().gigRoom(r, C()); } catch (_) { return null; }
    var per = ((ST().gig || {}).lexp) || 20;
    return '<p class="note st-lx' + (n > 0 ? '' : ' full') + '">' + esc(n > 0 ? fill(U2.gigRoom, { per: per, n: n }) : U2.gigFull) + '</p>';
  }
  var GAIN_ATTR = { 'data-take': 1, 'data-buy': 1, 'data-bagtake': 1, 'data-dpick': 1 };
  function ownedLabel() { return (C().shopUi && C().shopUi.owned) || '包包裡有了'; }
  function cardBtn(id, attr, label, o) {
    var c = card(id); if (!c) return '';
    o = o || {};
    // 收／買進包包的鈕：包包裡已經有這張（舊存檔的貨、買過了）＝寫「包包裡有了」、按不下去（不讓鈕變成按了沒反應的死鈕）
    if (GAIN_ATTR[attr]) { var r = run(); if (r && Array.isArray(r.bag) && r.bag.indexOf(id) >= 0) { label = ownedLabel(); o = Object.assign({}, o, { disabled: true }); } }
    return H.tileHTML(c, { cls: 'st-c' + (o.cls ? ' ' + o.cls : ''), extra: (o.tag ? '<span class="st-tag">' + esc(o.tag) + '</span>' : '') +
      '<button type="button" class="lb-pickb key" ' + attr + '="' + esc(id) + '"' + (o.disabled ? ' disabled' : '') + '>' + esc(label) + '</button>' });
  }
  function gridHTML(inner, n) { return '<div class="lb-rgrid st-grid n' + Math.max(2, Math.min(4, n)) + '">' + inner + '</div>'; }
  // 面板底那條（黏在底）：一兩顆鈕（「今天不逛了」在標題列右邊）
  function footHTML(btns) {
    return '<div class="foot st-foot"><div class="st-btns' + (btns.length > 1 ? ' two' : '') + '">' + btns.join('') + '</div></div>';
  }
  function btn(attr, label, o) { o = o || {}; return '<button type="button" class="lb-btn' + (o.pri ? ' pri' : '') + (o.cls ? ' ' + o.cls : '') + '" ' + attr + (o.disabled ? ' disabled' : '') + '>' + esc(label) + '</button>'; }
  function canAfford(n) { var r = run(); return !!r && r.money >= n; }
  function buyLabel(id) { var pr = E().priceOf(C(), id); return fill((C().shopUi && C().shopUi.buy) || '買 ${n}', { n: mt(pr) }); }

  // 挖寶攤：三張蓋牌、背面露顏色（經／冷／硬各一）；點翻，1.5 秒沒點自己翻；有金邊那張先有金邊
  function digTile(cur, i) {
    var id = cur.cards[i], c = card(id); if (!c) return '';
    var gold = cur.gold === id, up = !!S.flipped[i];
    if (!up) return '<div class="lb-ct st-c st-down ax-' + E().topAttr(c) + (gold ? ' gold' : '') + '" data-k="' + i + '"><button type="button" class="st-back" data-flip="' + i + '" aria-label="' + esc(U('lootFlip')) + '"><i class="rec" aria-hidden="true"></i></button>' +
      '<div class="ar">&nbsp;</div><div class="al">&nbsp;</div><span class="stars">&nbsp;</span><button type="button" class="lb-pickb key" disabled>' + esc(U('take')) + '</button></div>';
    var r = run();
    return cardBtn(id, 'data-take', U('take'), { cls: (gold ? 'gold' : ''), disabled: r.bag.indexOf(id) >= 0 });
  }
  function digBody(cur) {
    var j = cur.rolls + 1, cost = (ST().reroll || 500) * j;
    return gridHTML(cur.cards.map(function (_, i) { return digTile(cur, i); }).join(''), cur.cards.length) +
      footHTML([btn('data-a="reroll"', U('reroll', { n: mt(cost) }), { disabled: !canAfford(cost) }), btn('data-a="skip"', U('skip', { n: mt(ST().skipCash || 400) }))]);
  }
  function digArm(cur) {
    if (A().rm || S.resumed) { S.flipped = cur.cards.map(function () { return true; }); return; }
    after(function () { autoFlip(cur); }, ms('autoflip'));
  }
  function autoFlip(cur) {
    var k = 0;
    cur.cards.forEach(function (_, i) { if (!S.flipped[i]) { k++; after(function () { flipOne(cur, i); }, (k - 1) * ms('flipGap')); } });
  }
  function flipOne(cur, i) {
    if (!S || S.flipped[i] || !S.sheet) return;
    var pc = P(); if (!pc || pc.cur !== cur) return;
    S.flipped[i] = true;
    sfx(cur.gold === cur.cards[i] ? 'ding' : 'flip');
    var t = qs('.st-c[data-k="' + i + '"]', S.sheet);
    if (t) { var d = D.createElement('div'); d.innerHTML = digTile(cur, i); var n = d.firstChild; if (n) { if (!A().rm) n.classList.add('st-turn'); t.parentNode.replaceChild(n, t); } }
  }

  // 同業調貨、市集的唱片：三（六）張好貨＋價；「賣一張給他」＝櫃檯同一套（sellCore）
  function buyGrid(cur, ids) {
    var r = run();
    return gridHTML(ids.map(function (id) {
      var have = r.bag.indexOf(id) >= 0, pr = E().priceOf(C(), id);
      return cardBtn(id, 'data-buy', have ? ownedLabel() : buyLabel(id), { tag: cur.rare === id ? U('rareTag') : '', disabled: have || r.money < pr });
    }).join(''), ids.length > 4 ? 3 : ids.length);
  }
  function sellGrid() {
    var r = run(), ids = r.bag.slice();
    var tiles = ids.map(function (id) {
      var q = E().sellCore(r, C(), id);
      if (!q.ok && q.error !== 'bagMin') return '';
      var label = !q.ok ? U('sellFor', { n: mt(0) }) : q.reclaim ? ((C().shopUi && C().shopUi.reclaimGo) || '交還老闆') : U('sellFor', { n: mt(q.earn) });
      return cardBtn(id, 'data-sell', label, { tag: q.ok && q.found ? U('foundTag') : '', disabled: !q.ok });
    }).join('');
    var min = (E().CFG && E().CFG.bagMin) || 5;
    return '<p class="note">' + esc(fill((C().shopUi && C().shopUi.bagSellMin) || '', { n: min })) + '</p>' + gridHTML(tiles, 4) +
      footHTML([btn('data-a="sellBack"', (C().shopUi && C().shopUi.sellNo) || '算了')]);
  }
  function tradeBody(cur) {
    if (S.sub === 'sell') return sellGrid();
    return buyGrid(cur, cur.cards || []) + footHTML([btn('data-a="sell"', U('sellOne')), btn('data-a="done"', U('done'), { pri: true })]);
  }
  // 器材行：兩件配件 $3,000；配件滿 3 件先選一件半價賣掉（relicPanel）
  //   price＝買的（器材行、市集器材）：每件一列（圖示、名字、說明）＋一顆明寫價錢的「買 $3,000」鈕，錢不夠變灰（跟櫃檯配件櫃同一種做法）；
  //   滿 3 件時算上半價賣掉最貴那件的錢（按了先問賣哪件）。沒有 price（老闆的倉庫，免費）＝照舊整張是鈕
  function relicGrid(ids, attr, price) {
    if (!ids.length) return '';
    if (!price) return '<div class="lb-opts st-relics">' + H.relicButtonsHTML(ids, attr) + '</div>';
    var r = run(), full = r.relics.length >= ((E().CFG && E().CFG.relicMax) || 3), back = 0;
    if (full) r.relics.forEach(function (x) { var v = E().sellValue ? E().sellValue(C(), x) : 0; if (v > back) back = v; });
    var can = r.money + back >= price, lbl = fill((C().shopUi && C().shopUi.buy) || '買 ${n}', { n: mt(price) });
    return '<div class="st-rrows">' + ids.map(function (id) {
      var x = null; try { x = H.relicOf(id); } catch (_) {} if (!x) return '';
      var ic = ''; try { ic = H.relicIcon(id, 30); } catch (_) {}
      return '<div class="st-rrow"><span class="pix">' + ic + '</span><span class="tx"><b class="nm">' + esc(x.name) + '</b><span class="ds">' + esc(x.desc) + '</span></span>' +
        '<button type="button" class="lb-btn pri" ' + attr + '="' + esc(id) + '"' + (can ? '' : ' disabled') + '>' + esc(lbl) + '</button></div>';
    }).join('') + '</div>';
  }
  function gearBody(cur) {
    return relicGrid(cur.relics || [], 'data-relic', ST().gearPrice || 3000) + footHTML([btn('data-a="done"', U('done'), { pri: true })]);
  }
  function warehouseBody(cur) {
    var inner = (cur.relics || []).length ? relicGrid(cur.relics, 'data-wrelic') : gridHTML((cur.cards || []).map(function (id) { return cardBtn(id, 'data-take', U('take')); }).join(''), (cur.cards || []).length);
    return inner + footHTML([btn('data-a="pass"', U('pass'))]);
  }
  function snackBody() {
    var r = run(), n = Math.max(0, Math.min(ST().snackHp || 3, r.maxHp - r.hp));
    return '<p class="note">' + esc(fill(((C().trial || {}).ui || {}).hp || '聲望 {n}/{max}', { n: r.hp, max: r.maxHp })) + '</p>' +
      footHTML([btn('data-a="ok"', n > 0 ? U('snackBtn', { n: n }) : U('snackFull'), { pri: true })]);
  }
  // 演唱會：「買 N 張」步進器、總價；第 D 波：「每張樂歷 +20・這一趟還能算 n 張」（gigRoomLine）；價錢梯整趟累計；多一顆「買到剩 $4,000」（0 張不畫）
  function gigBody(market) {
    var r = run(), G = ST().gig || {}, n = Math.max(1, S.gigN || 1), pr = E().gigPrice(r, C(), n), keep = E().gigKeepN(r, C());
    var h = '<div class="st-gig"><button type="button" class="lb-btn st-step" data-a="gigMinus" aria-label="−"' + (n <= 1 ? ' disabled' : '') + '>−</button>' +
      '<button type="button" class="lb-btn pri st-gigbuy" data-a="gigBuy"' + (r.money < pr ? ' disabled' : '') + '>' + esc(U('gigBuy', { k: n, n: mt(pr) })) + '</button>' +
      '<button type="button" class="lb-btn st-step" data-a="gigPlus" aria-label="+">+</button></div>' + (gigRoomLine() || lexpLine((G.lexp || 20) * n));
    if (keep > 0) h += '<div class="st-keep">' + btn('data-a="gigKeep"', U('gigKeepN', { n: mt(G.keep || 4000), k: keep })) + '</div>';
    return h + (market ? '' : footHTML([btn('data-a="gigNone"', U('gigNone'))]));
  }
  function promoBody(cur) {
    return gridHTML((cur.cards || []).map(function (id) { var c = card(id); return c ? H.tileHTML(c, { cls: 'st-c' }) : ''; }).join(''), (cur.cards || []).length) +
      '<p class="note">' + esc(U('promoNote')) + '</p>' + lexpLine(ST().promoLexp || 10) + footHTML([btn('data-a="ok"', U('promoOk'), { pri: true })]);
  }
  function fortuneBody(cur) {
    var b = cur.boss, ace = b && card(b.ace);
    var h = b ? '<div class="st-fortune">' + (ace ? '<div class="ace">' + H.coverHTML(ace) + '<span class="cap">' + esc(U('fortuneAce')) + '</span></div>' : '') +
      '<p class="ratio">' + esc(U('fortuneRatio', { c: b.ratio.c | 0, o: b.ratio.o | 0, h: b.ratio.h | 0 })) + '</p></div>' : '';
    return h + footHTML([btn('data-a="ok"', U('fortuneOk'), { pri: true })]);
  }
  // 寄賣：從包包挑一張（送的、種子不行；包包留 ≥5 張）；兩輪後的攤位開頭先領
  function consignBody() {
    var r = run(), min = (E().CFG && E().CFG.bagMin) || 5;
    var ids = r.bag.filter(function (id) { return !E().isGift(r, C(), id) && !E().isSeed(r, C(), id); });
    var full = r.bag.length - 1 < min;
    return '<p class="note">' + esc(U('consignPick')) + '</p>' + gridHTML(ids.map(function (id) { return cardBtn(id, 'data-consign', NM('consign'), { disabled: full }); }).join(''), 4) +
      footHTML([btn('data-a="pass"', U('consignNone'))]);
  }
  function consignGetBody(cur) {
    return '<p class="note">' + esc(U('consignBack')) + '</p>' + gridHTML((cur.cards || []).map(function (id) { return cardBtn(id, 'data-take', U('take'), { cls: 'gold' }); }).join(''), 3) +
      footHTML([btn('data-a="pass"', U('pass'))]);
  }
  function homeBody() {
    var r = run();
    return '<p class="note">' + esc(U('homePick')) + '</p>' + lexpLine(ST().homeLexp || 30) + gridHTML(r.bag.map(function (id) { return cardBtn(id, 'data-home', U('homePut')); }).join(''), 4) +
      footHTML([btn('data-a="ok"', U('homeNone'))]);
  }
  function dareBody() {
    var D0 = ST().dare || {}, X = CFG().chest || {};
    return '<p class="note st-dnote">' + esc(U('dareReward', { k: X.dareN || 4, n: mt(X.dareCash || 5000) })) + '</p>' +
      '<div class="lb-opts st-dare">' + btn('data-dare="tough"', U('dareTough', { n: (D0.tough || {}).atk || 1 }), { pri: true, cls: 'big' }) + btn('data-dare="tank"', U('dareTank', { n: (D0.tank || {}).hp || 4 }), { cls: 'big' }) + '</div>' +
      footHTML([btn('data-a="decline"', U('dareNo'))]);
  }
  // 黑膠市集：一頁四分頁（唱片／器材／門票／福袋）；可出清（賣一張給他）
  function marketBody(cur) {
    if (S.sub === 'sell') return sellGrid();
    var tabs = U('marketTabs'); tabs = (WC().ui || {}).marketTabs || ['唱片', '器材', '門票', '福袋'];
    var t = S.tab || 0, B = (ST().market || {}).bag || {};
    var h = '<div class="lb-filters st-tabs" role="tablist">' + tabs.map(function (x, i) { return '<button type="button" class="lb-btn' + (i === t ? ' on' : '') + '" role="tab" aria-selected="' + (i === t) + '" data-tab="' + i + '">' + esc(x) + '</button>'; }).join('') + '</div>';
    if (t === 0) h += buyGrid(cur, cur.cards || []);
    else if (t === 1) h += relicGrid(cur.relics || [], 'data-relic', ST().gearPrice || 3000) || '<p class="note">—</p>';
    else if (t === 2) h += gigBody(true);
    else if (cur.bag && cur.bag.length) h += '<p class="note st-bagnote">' + esc(U('bagPick')) + '</p>' + gridHTML(cur.bag.map(function (id) { return cardBtn(id, 'data-bagtake', U('take'), { cls: cur.bagApex === id ? 'gold' : '' }); }).join(''), cur.bag.length);
    else h += '<div class="st-bag"><p class="note">' + esc(U('bagNote', { k: B.n || 3, m: B.max || 1 })) + '</p>' +
      btn('data-a="bag"', (cur.bags | 0) >= (B.max || 1) ? U('bagSold') : U('bagBuy', { n: mt(B.price || 2500) }), { pri: true, disabled: (cur.bags | 0) >= (B.max || 1) || !canAfford(B.price || 2500) }) + '</div>';
    var open = bagOpen(cur);
    return h + footHTML([btn('data-a="sell"', U('sellOne'), { disabled: open }), btn('data-a="done"', open ? U('bagFirst') : U('done'), { pri: true, disabled: open })]);
  }
  function bodyHTML(cur) {
    switch (cur.kind) {
      case 'dig': return digBody(cur);
      case 'trade': return tradeBody(cur);
      case 'gear': return gearBody(cur);
      case 'warehouse': return warehouseBody(cur);
      case 'snack': return snackBody(cur);
      case 'gig': return gigBody(false);
      case 'promo': return promoBody(cur);
      case 'fortune': return fortuneBody(cur);
      case 'consign': return consignBody(cur);
      case 'consignGet': return consignGetBody(cur);
      case 'home': return homeBody(cur);
      case 'dare': return dareBody(cur);
      case 'market': return marketBody(cur);
    }
    return footHTML([btn('data-a="ok"', U('done'), { pri: true })]);
  }
  function confirmHTML() {
    return '<div class="st-ask" role="alertdialog" aria-label="' + esc(U('leaveYes')) + '"><p>' + esc(U('leaveAsk', { n: mt(ST().leaveCash || 1000) })) + '</p>' +
      '<div class="foot two">' + btn('data-a="leaveNo"', U('leaveNo')) + btn('data-a="leaveYes"', U('leaveYes'), { pri: true }) + '</div></div>';
  }
  function openStation(cur) {
    S.phase = 'station'; S.cur = cur;
    if (S.curKey !== cur.key) { S.curKey = cur.key; S.flipped = (cur.cards || []).map(function () { return false; }); S.sub = null; S.tab = 0; S.gigN = 1; if (cur.kind === 'dig') digArm(cur); }
    renderStation(true);
    S.resumed = false;                                   // 重新整理回來那一站：挖寶攤直接翻開（只這一次）
    try { if (cur.kind === 'promo' && cur.cards && cur.cards[0]) H.play(card(cur.cards[0])); } catch (e) { console.error(e); }
    H.auto(function () { var ch = null; try { ch = H.policy(); } catch (_) {} if (ch && ch.type) act(ch); }, 260);
  }
  function renderStation(first) {
    var cur = S && S.cur; if (!cur) return;
    var html = headHTML(cur) + (S.confirm ? confirmHTML() : bodyHTML(cur));
    if (S.sheet && S.sheet.isConnected && !first) { S.sheet.innerHTML = html; }
    else {
      S.sheet = H.sheet(html, 'stall st-k-' + cur.kind);
      S.sheet.addEventListener('click', onSheetClick);
    }
    if (cur.kind === 'dig' && (A().rm || S.resumed)) S.flipped = cur.cards.map(function () { return true; });
    fitStation(first);
  }
  // 面板量出來要多高，鏡頭就對焦那個角落、讓出放得下的高（econ 抽屜同一招：stage.focus）
  function fitStation(first) {
    if (!S || !S.sheet) return;
    var vh = H.vh(), nat = Math.ceil(H.naturalH(S.sheet) + 4), need = Math.min(Math.round(vh * 0.72), Math.max(200, nat));
    if (!first && S.need != null && Math.abs(need - S.need) < 2) return;
    S.need = need;
    var hot = (placeOf(S.cur.kind, S.cur).hots || [])[0];
    if (hot && S.cur.kind !== 'market') stg('focus', hot, { panelMin: need, ms: first ? 300 : 150 });
    else try { H.cam('full', 'map', 300, need); } catch (e) { console.error(e); }
  }

  // ------------------------------------------------------------------ 點擊
  function onSheetClick(e) {
    if (!S || !S.cur) return;
    var t = e.target.closest && e.target.closest('button'); if (!t || t.disabled) return;
    var cur = S.cur, a = t.getAttribute('data-a');
    if (t.hasAttribute('data-flip')) { flipOne(cur, +t.getAttribute('data-flip')); return; }
    if (a === 'leave') { askLeave(); return; }
    if (a === 'leaveNo') { sfx('tick'); S.confirm = false; renderStation(); return; }
    if (a === 'leaveYes') { doLeave(); return; }
    if (a === 'sell') { sfx('tick'); S.sub = 'sell'; renderStation(); return; }
    if (a === 'sellBack') { sfx('tick'); S.sub = null; renderStation(); return; }
    if (t.hasAttribute('data-tab')) { sfx('tick'); S.tab = +t.getAttribute('data-tab'); renderStation(); return; }
    if (a === 'gigMinus') { S.gigN = Math.max(1, (S.gigN || 1) - 1); sfx('tick'); renderStation(); return; }
    if (a === 'gigPlus') { S.gigN = (S.gigN || 1) + 1; sfx('tick'); renderStation(); return; }
    var X = function (o) { return Object.assign({ type: 'stallAct' }, o); };
    if (t.hasAttribute('data-take')) return act(X({ act: 'take', cardId: t.getAttribute('data-take') }));
    if (t.hasAttribute('data-buy')) return act(X({ act: 'buy', cardId: t.getAttribute('data-buy') }));
    if (t.hasAttribute('data-sell')) return act(X({ act: 'sell', cardId: t.getAttribute('data-sell') }));
    if (t.hasAttribute('data-bagtake')) return act(X({ act: 'bagTake', cardId: t.getAttribute('data-bagtake') }));
    if (t.hasAttribute('data-consign')) return act(X({ act: 'consign', cardId: t.getAttribute('data-consign') }));
    if (t.hasAttribute('data-home')) return act(X({ act: 'ok', cardId: t.getAttribute('data-home') }));
    if (t.hasAttribute('data-dare')) return act(X({ act: 'accept', mode: t.getAttribute('data-dare') }));
    if (t.hasAttribute('data-wrelic')) return act(X({ act: 'relic', relicId: t.getAttribute('data-wrelic') }));
    if (t.hasAttribute('data-relic')) return buyRelic(t.getAttribute('data-relic'));
    if (a === 'gigBuy') return act(X({ act: 'tickets', n: Math.max(1, S.gigN || 1) }));
    if (a === 'gigKeep') return act(X({ act: 'tickets', n: E().gigKeepN(run(), C()) }));
    if (a === 'gigNone') return act(X({ act: 'tickets', n: 0 }));
    if (a === 'reroll') return act(X({ act: 'reroll' }));
    if (a === 'bag') return act(X({ act: 'bag' }));
    if (a === 'skip') return act(X({ act: 'skip' }));
    if (a === 'pass') return act(X({ act: cur.kind === 'consign' || cur.kind === 'consignGet' || cur.kind === 'warehouse' ? 'skip' : 'ok' }));
    if (a === 'decline') return act(X({ act: 'decline' }));
    if (a === 'done') return act(X({ act: 'done' }));
    if (a === 'ok') return act(X({ act: 'ok' }));
  }
  // 器材（器材行、市集）：滿 3 件先選一件半價賣掉（ui relicPanel，「算了」＝不買）
  function buyRelic(id) {
    var r = run(), max = (E().CFG && E().CFG.relicMax) || 3;
    if (r.relics.length < max) return act({ type: 'stallAct', act: 'buyRelic', relicId: id });
    var cur = S.cur;
    S.busy = true;
    H.relicPanel(r.relics.slice(), { prompt: U('relicFull'), cancel: (C().shopUi && C().shopUi.sellNo) || '算了' }).then(function (drop) {
      if (!S) return; S.busy = false; S.sheet = null;
      var pc = P(); if (!pc || pc.cur !== cur) return;
      if (drop) act({ type: 'stallAct', act: 'buyRelic', relicId: id, dropRelicId: drop });
      else renderStation(true);
    });
  }
  // 做一個動作：成功＝錢跳數字；做完這一站（cur 換了）＝收面板、0.6 秒後走到下一站；沒做完（重翻、買、賣、福袋）＝面板重畫
  function act(ch) {
    if (!S || S.busy) return;
    var r = run(), p = P(); if (!p) return;
    var cur0 = p.cur, k0 = p.k, m0 = r.money;
    var res = H.choose(ch);
    if (!res || !res.ok) {
      var er = res && res.error;
      if (er === 'money') H.toast(((C().shopUi || {}).noMoney) || '錢不夠。');
      else if (er === 'bagMin') H.toast(fill((C().shopUi || {}).bagSellMin || '', { n: (E().CFG && E().CFG.bagMin) || 5 }));
      else if (er === 'bagOpen') H.toast(U('bagFirst'));
      else console.warn('[stalls] choose', er, ch);
      return;
    }
    sfx(ch.act === 'take' || ch.act === 'bagTake' ? 'pocket' : 'select');
    if (r.money !== m0) { try { H.cashRise(m0, r.money); } catch (e) { console.error(e); } }
    (res.effects || []).forEach(function (f) {
      if (f.hp > 0) H.toast(fill(((C().trial || {}).ui || {}).heal || '聲望 +{n}', { n: f.hp }), 'gold');
      else if (f.hp === 0 && cur0 && cur0.kind === 'snack') H.toast(U('snackFullToast'));
      if (f.gainRelic) H.toast(fill('拿到「{n}」', { n: H.relicName(f.gainRelic) }));
      if (f.nowPlaying) { try { H.play(card(f.nowPlaying)); } catch (e) { console.error(e); } }
      if (f.dare) H.toast(f.dare === 'tough' ? U('dareToughOn', { n: ((ST().dare || {}).tough || {}).atk || 1 }) : U('dareTankOn', { n: ((ST().dare || {}).tank || {}).hp || 4 }), 'gold');
    });
    if (ch.act === 'sell') S.sub = null;
    try { H.refresh(); } catch (_) {}
    var p2 = P();
    if (!p2 || p2.k !== k0 || p2.cur !== cur0) { S.cur = null; closeStation(); lightUp([]); restoreNpc(); return next(true); }
    if (ch.act === 'reroll') { S.flipped = cur0.cards.map(function () { return false; }); S.curKey = cur0.key; digArm(cur0); }
    renderStation();
  }

  // ------------------------------------------------------------------ 今天不逛了（SPEC-C §4.3-5；CRITIQUE 1.7）：先確認；確定＝stallLeave（錄音室照走、寄賣領取照領）
  function askLeave() {
    sfx('tick');
    if (S.phase === 'station' && S.sheet) { S.confirm = true; renderStation(); return; }
    if (!S.slot) return;
    S.phase = 'leave';
    S.slot.innerHTML = '<div class="st-pick">' + confirmHTML() + '</div>';
    fitPick();
  }
  function doLeave() {
    var r = run(), m0 = r ? r.money : 0;
    var res = H.choose({ type: 'stallLeave' });
    if (!res || !res.ok) { console.warn('[stalls] stallLeave', res && res.error); return; }
    try { H.log('leave'); } catch (_) {}
    sfx('select');
    if (r && r.money !== m0) { try { H.cashRise(m0, r.money); } catch (e) { console.error(e); } }
    try { H.refresh(); } catch (_) {}
    S.confirm = false; S.sel = null;
    var p = P();
    if (p && p.cur && S.cur && p.cur === S.cur) { renderStation(); return; }   // 寄賣領取那站正開著：照原貨留著
    S.cur = null; closeStation(); lightUp([]); restoreNpc();
    next(true);
  }

  // ------------------------------------------------------------------ 底部（選組那塊）的點擊
  function onSlotClick(e) {
    if (!S) return;
    var t = e.target.closest && e.target.closest('button'); if (!t || t.disabled) return;
    if (S.phase === 'walk') { stg('finish', 'p'); return; }       // 走路途中點一下＝直接走到
    var a = t.getAttribute('data-a');
    if (a === 'leave') { askLeave(); return; }
    if (a === 'leaveNo') { sfx('tick'); S.phase = 'pick'; renderPick(); if (S.sel != null) preview(S.sel); return; }
    if (a === 'leaveYes') { doLeave(); return; }
    if (t.hasAttribute('data-g') && S.phase === 'pick') {
      var g = +t.getAttribute('data-g');
      if (S.sel === g) pickGroup(g);
      else { sfx('tick'); preview(g); }
    }
  }

  // ------------------------------------------------------------------ 入口
  function night(o) {
    if (!ok('night')) return;
    var p = P(); if (!p) { H.done(); return; }
    S = { r: o.r, slot: o.slot, box: o.box, sel: null, phase: null, sheet: null, cur: null, curKey: null, flipped: [], camMs: 600, resumed: !!p.cur, walked: false };
    // wcLog 的 sessions（攤位開出來那一下）、resumeInStall（標題「繼續試煉」回到攤位）在 ui.js 記；這裡重畫幾次都不算
    if (S.slot) S.slot.addEventListener('click', onSlotClick);
    // 重新整理回來、有 cur：人直接站在那一站（不重走）；選組前：站在平常的位置
    if (p.cur) { var pl = placeOf(p.cur.kind, p.cur); if (pl.spot) { stg('put', 'p', pl.spot); stg('hide', 'p', false); } }
    next(!p.cur);
  }
  function busy() { return false; }
  function state() {
    if (!S) return null;
    return { phase: S.phase, sel: S.sel, kind: S.cur ? S.cur.kind : (S.kind || null), flipped: (S.flipped || []).slice(), sub: S.sub || null, confirm: !!S.confirm };
  }

  // ------------------------------------------------------------------ 中繼點開局（SPEC-C §4.7）
  //   「從哪裡開始？」：第 1 位＋打到過的中繼點（打到就永久開）；只有第 1 位時不出現
  function cpPick() {
    if (!ok('cpPick')) return Promise.resolve(1);
    var cps = []; try { cps = (H.checkpoints() || []).filter(function (x) { return x > 1; }); } catch (_) {}
    if (!cps.length) return Promise.resolve(1);
    return new Promise(function (res) {
      var html = '<div class="hd"><h3>' + esc(U('cpTitle')) + '</h3></div><div class="lb-opts st-cps">' +
        [1].concat(cps).map(function (n) { return btn('data-cp="' + n + '"', n === 1 ? U('cpFirst') : U('cpAt', { n: n }), { pri: n === 1, cls: 'big' }); }).join('') + '</div>';
      var s = H.sheet(html, 'st-cp');
      try { H.room(s); } catch (_) {}
      var done = false;
      s.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-cp]'); if (!b || done) return;
        done = true; sfx('select'); H.closeSheet(s); res(+b.getAttribute('data-cp') || 1);
      });
      H.auto(function () { var b = qs('[data-cp="1"]', s); if (b) b.click(); }, 260);
    });
  }
  // 快速選秀：撿盤 k 次（兩張二選一，戰力池）、升級 m 次（levelPanel 換標題「補到第 N 位：升級 i/m」）；每題做完就存（重新整理照存好的那一題）
  function draft(o) {
    if (!ok('draft')) return Promise.resolve();
    o = o || {};
    var step = function () {
      var r = run(), p = r && r.pending;
      if (!p || p.type !== 'draft' || !p.offer) return Promise.resolve();
      var N = r.cpFrom || 1, of = p.offer;
      if (of.kind === 'level') {
        return H.levelPanel(r, { title: U('draftLevel', { n: N, i: (p.cm | 0) + 1, m: p.m }), offer: of.offer || [] }).then(function (pick) {
          var res = H.choose({ type: 'draft', pick: pick });
          if (res && res.ok) H.toast(((C().trial || {}).levelUp || {})[pick] || '', 'gold');
          return step();
        });
      }
      return draftCard(r, p, N).then(function (id) {
        var res = H.choose({ type: 'draft', cardId: id });
        if (res && res.ok && o.sc) { try { H.renderStrip(o.sc); } catch (_) {} }
        return step();
      });
    };
    return step();
  }
  function draftCard(r, p, N) {
    return new Promise(function (res) {
      var ids = (p.offer.cards || []).filter(card);
      var html = '<div class="hd"><h3>' + esc(U('draftCard', { n: N, i: (p.ck | 0) + 1, k: p.k })) + '</h3></div>' +
        gridHTML(ids.map(function (id) { return cardBtn(id, 'data-dpick', U('take')); }).join(''), 2);
      var s = H.sheet(html, 'st-draft');
      try { H.room(s); } catch (_) {}
      var done = false;
      s.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-dpick]'); if (!b || done) return;
        done = true; sfx('pocket'); H.closeSheet(s); res(b.getAttribute('data-dpick'));
      });
      H.auto(function () { var ch = null; try { ch = H.policy(); } catch (_) {} var b = (ch && ch.cardId && qs('[data-dpick="' + ch.cardId + '"]', s)) || qs('[data-dpick]', s); if (b) b.click(); }, 260);
    });
  }

  W.DipLabStalls = {
    configure: function (host) { H = host || null; },
    night: night, busy: busy, state: state, cpPick: cpPick, draft: draft,
    // 測試：底部那塊的鈕（e2e 用真點；這裡只給測試讀狀態）
    _icons: ICON
  };
})();
