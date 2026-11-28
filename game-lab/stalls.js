/* game-lab/stalls.js：第 C 波 店內攤位二選一＋中繼點開局（scratchpad v5/wave-c SPEC-C §4.3–§4.7；介面代理 B）。
 *
 * window.DipLabStalls = {
 *   configure(host)   // ui.js boot 接一次（host 見下）
 *   night(o)          // SCREENS.night 遇到 pending stall：o = { r, slot（「第 n 輪」底下那格）, box }。底部換成「今天的攤位」兩列；選完走到站、開各站面板；逛完 host.done()
 *   busy(action)      // 攤位中點了箱子／收音機／櫃檯／對戰台：回 true＝這裡處理掉了（C 波都回 false，ui.js 出「先逛完今天的攤位。」；市集：點島台對到攤位格那一箱＝進那一攤）
 *   cpPick()          // 開店「從哪裡開始？」→ Promise<N>（只有第 1 位＝直接 1，不出面板）
 *   draft(o)          // 中繼點開局快速選秀（pending draft）→ Promise（選完＝pending 不是 draft）。o = { sc }（場景：撿盤後重畫包包條）
 *   state()           // 測試用：{ phase:'pick'|'walk'|'station'|'leave'|'studio'|null, sel, kind, flipped }；市集多 mode:'market'、phase 'grid'|'station'|'hold'|'leave'、hold
 *   isle()            // 第 I 波 I-3a：市集攤位格 ↔ 島台那一格（[{kind, hot, went}]；舞台小道具、導演 market 模式用）
 *   station(kind)     // 第 I 波 I-3a：進市集的某一攤（＝點攤位格；攤位格以外的入口、測試用）；回 true＝進了
 * }
 *   state() 第 I 波 I-3b 多：doc {id（清潔墊上那張）, ax（選軸中）, msg, fx}、gacha {phase 'idle'|'spin'|'egg'|'open', cell, n, fx}、ask（算命攤打開前那一題）、moodQ（現在問的題目 id）、
 *     mood {mood, id, want}（翻滿三張的心情結果）、moodSt（題庫：0 沒抓、1 抓中、2 好了、-1 抓不到、'off'＝?mood=0）
 *
 * 第 I 波 I-3a 市集（pending.mode === 'market'；SPEC-I §6.2–§6.4；引擎契約 scratchpad v5/wave-i/build3/CONTRACT.md）：分流一律看 pending.mode（不看 content），
 *   'pick'（C 波二選一）下面每一行照舊。市集＝底部攤位格（頂列月亮＋錢＋樂歷細條；一列 3 格 ≥100×64；收攤鈕是格子最後一格）＋點一攤升起攤位面板（≤55%、只放鈕與數字）；
 *   進攤 choose stallEnter（不扣）、那攤第一個動作扣 1 個時段（月亮少一顆）、做完自動回攤位格；算命翻滿 3 張引擎自動關 → 畫面停住等點「記下了」（hold）；
 * 第 I 波 I-3b（引擎契約 wave-i/build3b/CONTRACT.md；檔尾那一段）：?newstalls=1＝唱片醫生、飲料攤三杯、小物攤轉蛋機；算命攤接主站心情選歌題庫（不看開關；?mood=0＝不接）。
 *   挖寶攤不自己翻（等點）；錄音室沒有試錄格＝進去就錄 demo（C 波那句吐司）。小人只走一次到島台（browse）。施工期間 ?market=1 開（configure 時改 content）。
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
  function NM(kind) { return (S && S.mk && (WC().fairStations || {})[kind]) || (WC().stations || {})[kind] || kind; }   // 市集模式：算命攤、飲料攤、小物攤、黑膠特賣（fairStations）
  function LN(kind) { return (S && S.mk && (WC().fairLines || {})[kind]) || (WC().stationLines || {})[kind] || ''; }
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
  var T0 = { autoflip: 1500, between: 600, studio: 800, flipGap: 150, turn: 110, digShow: 1400 };   // digShow：C 波二選一（緊急退回）盲挑挑完翻開那張停多久再走
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
  // 第 I 波 I-3a 市集模式：算命攤（籤）、飲料攤（冬瓜茶）換新圖示（shop-props.js MK_ICON；島台小道具、來客條同一張）；C 波一行不變
  //   第 I 波 I-3b：唱片醫生（MK_ICON.doctor）、小物攤有轉蛋機（newStalls 開著）＝轉蛋機圖示（MK_ICON.gacha）
  function icon(kind, size) { if (kind === 'gear' && S && S.mk && NS()) kind = 'gacha'; var MK = S && S.mk && W.DipPropsO && W.DipPropsO.MK_ICON, rows = (MK && MK[kind]) || ICON[kind]; var h = ''; try { h = rows ? H.pix(rows, size || 16, 'st-ic') : ''; } catch (_) {} return h || '<span class="st-ic tx" aria-hidden="true"></span>'; }

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
    if (kind === 'trade' || (kind === 'market' && S && S.mk)) { var lo = Math.min.apply(null, ['common', 'rare', 'uncommon', 'epic', 'legendary'].map(function (k) { return pr[k] || 1e9; })); return U('priceFrom', { n: mt(lo < 1e9 ? lo : 800) }); }
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
  //   cn＝鏡頭名（市集＝'market'：dip.json 還沒有這個鏡頭時舞台照 full）
  function fitPick(cn) {
    if (!S || !S.box) return;
    var need = Math.max(170, Math.ceil(H.naturalH(S.box) + 6));
    try { H.cam(cn || 'full', 'map', S.camMs != null ? S.camMs : 600, need); } catch (e) { console.error(e); }
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
    if (S.mk) crowd('market', false);                            // 第 I 波 I-3a：活店導演收起 market 模式（導演有這個入口才叫）
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
  // v6 第 7 條 挖寶攤盲挑（店主 11-28「只能抽一張，選定後才揭曉」；cur.blind＝引擎發牌時 content waveC.stall.blind 開著）：
  //   三張蓋著、背面露顏色＋那色星數（金邊那張有金邊），點背面或「挑這張」＝收那張（不能反悔、不能再翻）；挑完只翻那張（got），其他留在箱底不翻（st-left，沒有鈕）
  function blindTile(cur, i, got) {
    var id = cur.cards[i], c = card(id); if (!c) return '';
    var gold = cur.gold === id, a = E().topAttr(c), lab = U('digBack', { attr: ZHA(a), n: c[a] | 0 }), cls = 'lb-ct st-c st-down ax-' + a + (gold ? ' gold' : '');
    if (got === i) return H.tileHTML(c, { cls: 'st-c st-got' + (gold ? ' gold' : '') + (A().rm ? '' : ' st-turn'), data: 'data-k="' + i + '"', extra: '<span class="st-tag">' + esc(U('digGot')) + '</span>' });
    if (got != null) return '<div class="' + cls + ' st-left" data-k="' + i + '"><span class="st-back" aria-hidden="true"><i class="rec"></i></span><div class="ar st-dcol">' + esc(lab) + '</div></div>';
    return '<div class="' + cls + '" data-k="' + i + '"><button type="button" class="st-back" data-dig="' + i + '" aria-label="' + esc(U('digPickAria', { attr: ZHA(a), n: c[a] | 0 })) + '"><i class="rec" aria-hidden="true"></i></button>' +
      '<div class="ar st-dcol">' + esc(lab) + '</div><div class="al">&nbsp;</div><button type="button" class="lb-pickb key" data-dig="' + i + '">' + esc(U('digPickBtn')) + '</button></div>';
  }
  function blindGrid(cur, got) { return gridHTML(cur.cards.map(function (_, i) { return blindTile(cur, i, got); }).join(''), cur.cards.length); }
  function blindNote(t) { return '<p class="note st-dtap">' + esc(t) + '</p>'; }
  function digBody(cur) {
    if (cur.blind) return S.digShow ? blindGrid(cur, S.digGot) + blindNote(U('digLeft', { n: cur.cards.length - 1 }))   // C 波二選一：挑完翻開那張、停一下就走（act）
      : blindGrid(cur, null) + blindNote(U('digPick')) + footHTML([btn('data-a="skip"', U('skip', { n: mt(ST().skipCash || 400) }))]);
    var j = cur.rolls + 1, cost = (ST().reroll || 500) * j;
    return gridHTML(cur.cards.map(function (_, i) { return digTile(cur, i); }).join(''), cur.cards.length) +
      footHTML([btn('data-a="reroll"', U('reroll', { n: mt(cost) }), { disabled: !canAfford(cost) }), btn('data-a="skip"', U('skip', { n: mt(ST().skipCash || 400) }))]);
  }
  function digArm(cur) {
    if (cur.blind) return;                                                     // v6 盲挑：不自己翻、重新整理回來也不翻
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
    var tip = qs('.st-dtap', S.sheet); if (tip) tip.hidden = true;  // 市集挖寶「點一張翻開」：翻了一張就收掉
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
    // 第 I 波 I-2 修正棒：唱片袋側袋（slot）不佔配件格＝買它不用先賣（relicFull／isSlotRelic；上場制關著沒有側袋＝照舊）
    var r = run(), slot = function (x) { return !!(E().isSlotRelic && E().isSlotRelic(C(), x)); }, full = r.relics.filter(function (x) { return !slot(x); }).length >= ((E().CFG && E().CFG.relicMax) || 3), back = 0;
    if (full) r.relics.forEach(function (x) { var v = !slot(x) && E().sellValue ? E().sellValue(C(), x) : 0; if (v > back) back = v; });
    var lbl = fill((C().shopUi && C().shopUi.buy) || '買 ${n}', { n: mt(price) });
    return '<div class="st-rrows">' + ids.map(function (id) {
      var can = r.money + (full && !slot(id) ? back : 0) >= price;
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
  // 黑膠市集：一頁四分頁（唱片／器材／門票／福袋）；可出清（賣一張給他）。doneLabel＝市集模式的黑膠特賣寫「回攤位」（沒給＝C 波「逛完了」）
  function marketBody(cur, doneLabel) {
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
    return h + footHTML([btn('data-a="sell"', U('sellOne'), { disabled: open }), btn('data-a="done"', open ? U('bagFirst') : (doneLabel || U('done')), { pri: true, disabled: open })]);
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
    if (S && S.mk) return mkSheetClick(e);                     // 第 I 波 I-3a 市集（下面 C 波逐字）
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
    if (t.hasAttribute('data-dig')) return act(X({ act: 'take', cardId: (cur.cards || [])[+t.getAttribute('data-dig')] }));   // v6 盲挑：點背面＝收那張
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
    var go = S && S.mk ? mkAct : act;                          // 第 I 波 I-3a：市集模式走 mkAct
    if (!(E().relicFull ? E().relicFull(r, C(), id) : r.relics.length >= max)) return go({ type: 'stallAct', act: 'buyRelic', relicId: id });   // 側袋不佔格（修正棒 11-22）
    var cur = S.cur;
    S.busy = true;
    H.relicPanel(r.relics.filter(function (x) { return !(E().isSlotRelic && E().isSlotRelic(C(), x)); }), { prompt: U('relicFull'), cancel: (C().shopUi && C().shopUi.sellNo) || '算了' }).then(function (drop) {
      if (!S) return; S.busy = false; S.sheet = null;
      var pc = P(); if (!pc || pc.cur !== cur) return;
      if (drop) go({ type: 'stallAct', act: 'buyRelic', relicId: id, dropRelicId: drop });
      else if (S.mk) mkRenderStation(true); else renderStation(true);
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
      if (f.nowPlaying) { try { if (H.bgmFront) H.bgmFront(f.nowPlaying); else H.play(card(f.nowPlaying)); } catch (e) { console.error(e); } }   // 第 I 波：插到背景音樂佇列最前面、馬上放
      if (f.dare) H.toast(f.dare === 'tough' ? U('dareToughOn', { n: ((ST().dare || {}).tough || {}).atk || 1 }) : U('dareTankOn', { n: ((ST().dare || {}).tank || {}).hp || 4 }), 'gold');
    });
    if (ch.act === 'sell') S.sub = null;
    try { H.refresh(); } catch (_) {}
    var p2 = P();
    if (cur0 && cur0.kind === 'dig' && cur0.blind && ch.act === 'take' && S.sheet && S.sheet.isConnected) {   // v6 盲挑：先翻開挑的那張（其他留在箱底），停一下才走
      S.digShow = true; S.digGot = cur0.cards.indexOf(ch.cardId); S.busy = true;
      if (cur0.gold === ch.cardId) sfx('ding');
      S.sheet.innerHTML = headHTML(cur0) + digBody(cur0);
      var lb = qs('[data-a=leave]', S.sheet); if (lb) lb.parentNode.removeChild(lb);
      after(function () { S.busy = false; S.digShow = false; S.digGot = null; S.cur = null; closeStation(); lightUp([]); restoreNpc(); next(true); }, ms('digShow'));
      return;
    }
    if (!p2 || p2.k !== k0 || p2.cur !== cur0) { S.cur = null; closeStation(); lightUp([]); restoreNpc(); return next(true); }
    if (ch.act === 'reroll') { S.flipped = cur0.cards.map(function () { return false; }); S.curKey = cur0.key; digArm(cur0); }
    renderStation();
  }

  // ------------------------------------------------------------------ 今天不逛了（SPEC-C §4.3-5；CRITIQUE 1.7）：先確認；確定＝stallLeave（錄音室照走、寄賣領取照領）
  function askLeave() {
    sfx('tick');
    // 第 I 波 I-2 修正棒（11-22）：上場制開著的一趟，確認框只在這一趟第一次收攤出（SPEC-I §6.2-5／CRITIQUE 6-4 提前到這裡）——
    //   收攤之後還要按一下「就這五張」，每輪都確認＝一般輪必點 3 下（L3／P3 ≤2）。上場制關著＝逐字照舊（每次都確認）
    var r = run();
    if (r && E().lineupOn && E().lineupOn(r) && ((((r.stats || {}).c) || {}).leave | 0) > 0) { doLeave(); return; }
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
    if (S.mk) return mkSlotClick(e);                           // 第 I 波 I-3a 市集
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
    if (p.mode === 'market') return mkNight(o, p);              // 第 I 波 I-3a 市集（看 pending，不看 content：舊存檔的 pick pending 照 C 波跑完那一輪）
    S = { r: o.r, slot: o.slot, box: o.box, sel: null, phase: null, sheet: null, cur: null, curKey: null, flipped: [], camMs: 600, resumed: !!p.cur, walked: false };
    // wcLog 的 sessions（攤位開出來那一下）、resumeInStall（標題「繼續試煉」回到攤位）在 ui.js 記；這裡重畫幾次都不算
    if (S.slot) S.slot.addEventListener('click', onSlotClick);
    // 重新整理回來、有 cur：人直接站在那一站（不重走）；選組前：站在平常的位置
    if (p.cur) { var pl = placeOf(p.cur.kind, p.cur); if (pl.spot) { stg('put', 'p', pl.spot); stg('hide', 'p', false); } }
    next(!p.cur);
  }
  // 攤位中點了店裡的東西（ui 只轉來箱子／收音機、櫃檯、對戰台）：C 波一律 false（ui 出「先逛完今天的攤位。」）。
  //   市集（第 I 波 I-3a）：點島台上對到攤位格的那一箱＝進那一攤（跟點格子一樣；攤開著＝不理）；其他照 false
  function busy(action) {
    if (!S || !S.mk) return false;
    var m = /^(?:crate|bin):(.+)$/.exec(action || ''), p = P();
    if (!m || !p || !Array.isArray(p.tiles)) return false;
    var i = ISLE.indexOf('bin:' + m[1]); if (i < 0 || i >= p.tiles.length) return false;
    if (S.phase === 'grid') station(p.tiles[i]);
    return true;
  }
  // 進市集的某一攤（＝點攤位格；給舞台熱點、測試用）：去過了＝「去過了」、時段用完＝「今晚的時段用完了。」
  function station(kind) {
    var p = P(); if (!S || !S.mk || S.phase !== 'grid' || !p || p.tiles.indexOf(kind) < 0) return false;
    if (p.went[kind]) { sfx('tick'); T(U('mkWent')); return false; }
    enterTile(kind);
    return true;
  }
  function state() {
    if (!S) return null;
    var o = { phase: S.phase, sel: S.sel, kind: S.cur ? S.cur.kind : (S.kind || null), flipped: (S.flipped || []).slice(), sub: S.sub || null, confirm: !!S.confirm };
    if (S.digShow || (S.hold && S.hold.kind === 'dig')) o.digGot = S.digGot;   // v6 盲挑：挑完翻開的是第幾張（C 波停一下／市集停住等點）
    if (S.mk) { o.mode = 'market'; o.hold = !!S.hold; if (S.hold) o.kind = S.hold.kind; o.pour = S.pour || null;
      // 第 I 波 I-3b：清潔墊上那張（doc）、轉蛋機（gacha）、算命心情題（ask：還沒進攤的那一題；moodQ：現在問的題目 id；mood：結果）
      var dc = S.hold && S.hold.kind === 'doctor' ? S.hold : S.cur && S.cur.kind === 'doctor' ? S.cur : null;
      if (dc) o.doc = { id: S.hold ? (S.docLast || docSel(dc)) : docSel(dc), ax: S.docAx || null, msg: S.docMsg || null, fx: S.docFx || null };
      var gc = S.hold && S.hold.kind === 'gear' ? S.hold : S.cur && S.cur.kind === 'gear' ? S.cur : null;
      if (gc && gc.gacha) { var gu = S.gacha && S.gacha.key === gc.key ? S.gacha : null; o.gacha = { phase: gu ? gu.phase : 'idle', cell: gu && gu.eff ? gu.eff.cell : null, n: gc.gacha.n | 0, fx: S.gFx || null }; }
      if (S.ask) { o.ask = true; o.kind = 'fortune'; }
      if (S.moodQ) o.moodQ = S.moodQ.id;
      if (S.moodR && S.moodR.res) o.mood = { mood: S.moodR.res.mood, id: S.moodR.res.id, want: S.moodR.want };
      o.moodSt = MOOD.off ? 'off' : MOOD.st; }
    return o;
  }

  // ================================================================== 第 I 波 I-3a 市集（pending.mode 'market'；SPEC-I §6.2–§6.4；引擎契約 wave-i/build3/CONTRACT.md）
  //   店主 11-20：「中間的市集什麼的 不要分兩邊跑 然後不要只有選項 要有現場可以互動的」
  //   底部攤位格（來客畫面「第 n 輪」底下那塊）：頂列＝月亮（時段）＋錢＋樂歷細條（ui 畫的 .cx-live 搬進來，月亮那列右邊、不另起一行）；
  //     攤位格一列 3 格（≥100×64：圖示、攤名、價錢起點；藍框＝樂歷攤；免費攤右上角「免費」；去過的灰、打勾）；收攤鈕＝格子最後一格（那一列剩幾格就佔幾格，整列滿就另起一列 ≥44 px）
  //   點一攤＝choose stallEnter（不扣時段）→ 攤位面板（lb-sheet，≤ 可視高 55%：只放鈕與數字；標題右邊月亮）；那攤第一個動作扣 1 個時段（月亮暗一顆）；
  //     做完自動回攤位格；「回攤位」＝act back（還沒做動作＝不扣、還能再進）。算命翻滿 3 張引擎自動關 → 畫面停住（hold）等點「記下了」
  //   收攤：這一趟第一次而且剩 ≥2 個時段才問一次（run.stats.c.leave；C 波攤位每次都問），其他直接收；收完 → host.done()（上場制那幾輪 ui 開上場面板）
  //   島台：每一格對到島台一個箱（ISLE；照 tiles 的順序）。攤位格時亮還沒去的那幾格、開一攤只亮那一格。小人只走一次到 browse，之後不走
  //   活店：導演有 market(on) 入口就叫（下一棒做；沒有＝不叫）
  var ISLE = ['bin:rock', 'bin:elec', 'bin:soul', 'bin:hiphop', 'bin:citypop', 'bin:classical', 'bin:world', 'bin:folk', 'bin:jazz', 'bin:tw'];
  ICON.tea = ['............', '............', '..k.k.k.....', '...k.k.k....', '............', '.kkkkkkkkk..', '.kyyyyyyykkk', '.kyyyyyyyk.k', '.kyyyyyyykkk', '..kyyyyyk...', '...kkkkk....', '............'];
  function FAIR() { return (E().fairCfg ? E().fairCfg(C()) : ST().fair) || {}; }
  function isleOf(kind) { var p = P(), i = p && p.tiles ? p.tiles.indexOf(kind) : -1; return i >= 0 ? ISLE[i % ISLE.length] : null; }
  function isleLit() {                                             // 還能去的攤才亮（去過的、時段用完的扣時段攤不亮；修正棒：原本只看去過沒，跟攤位格的灰不一致）
    var p = P(); if (!p || !p.tiles) return [];
    var free = p.free || [];
    return p.tiles.map(function (k, i) { return p.went[k] || (free.indexOf(k) < 0 && !(p.left > 0)) ? null : ISLE[i % ISLE.length]; }).filter(Boolean);
  }
  // 市集裡的吐司靠右上（跟錢那顆一樣，不蓋島台；style.css .lb-toast.mk）
  function T(text, cls) { try { H.toast(text, (cls ? cls + ' ' : '') + 'mk'); } catch (e) { console.error(e); } }
  // 月亮（時段）：亮的＝還剩、暗的＝用掉；drop＝剛用掉那顆（暗下去的動畫一次）
  var MOON = ['...kkkkk....', '.kkyyyyyk...', '.kyyyyyk....', 'kyyyyyk.....', 'kyyyyk......', 'kyyyyk......', 'kyyyyk......', 'kyyyyk......', 'kyyyyyk.....', '.kyyyyyk....', '.kkyyyyyk...', '...kkkkk....'];
  var MOON_OFF = MOON.map(function (r) { return r.replace(/k/g, 'd').replace(/y/g, 'e'); });
  function moonsHTML(p) {
    var n = Math.max(0, p.slots | 0), left = Math.max(0, p.left | 0), h = '';
    for (var i = 0; i < n; i++) {
      var px = ''; try { px = H.pix(i < left ? MOON : MOON_OFF, 16, 'st-mpx') || ''; } catch (_) {}
      h += '<i class="st-moon' + (i < left ? '' : ' off') + (S.drop === i ? ' drop' : '') + (px ? ' px' : '') + '" aria-hidden="true">' + px + '</i>';
    }
    return '<span class="st-moons" role="img" aria-label="' + esc(U('mkSlots', { n: left, m: n })) + '">' + h + '</span>';
  }
  // 攤位格第二行（市集）：算命＝打開就翻一張；扣時段但不花錢的＝「不花錢」（「免費」只留給不用時段的攤）；飲料攤聲望滿了＝聲望已滿
  function mkPrice(k) {
    if (k === 'fortune') return U('mkFortuneTile');
    // 第 I 波 I-3b（newStalls）：唱片醫生＝洗的價錢起；小物攤＝轉蛋第一顆起；飲料攤有熱美式／高粱（第 2 個市集起）、聲望滿了＝熱美式的價錢起
    if (k === 'doctor') return U('priceFrom', { n: mt(((FAIR().doctor || {}).wash) || 800) });
    if (k === 'gear' && NS()) { var gp = ((FAIR().gacha || {}).price || [])[0]; return U('priceFrom', { n: mt(Math.min(gp > 0 ? gp : 1e9, ST().gearPrice || 3000)) }); }
    if (k === 'snack') { var r = run(), pp = P(), cf = NS() && pp && !pp.first ? ((FAIR().drinks || {}).coffee || {}).price : 0; return r && r.hp >= r.maxHp ? (cf > 0 ? U('priceFrom', { n: mt(cf) }) : U('mkHpFull')) : U('mkNoCost'); }
    var t = priceTag(k); return t === U('priceFree') ? U('mkNoCost') : t;
  }
  function mkTileHTML(t) {
    var k = t.kind, off = !t.went && !t.can;
    var pr = t.went ? U('mkWent') : t.free ? U('mkFreeNote') : mkPrice(k);
    // 扣時段的攤：右上角一顆小月亮（＝用 1 個時段；時段用完＝灰）；不用時段的攤：右上角「免費」
    var mo = ''; if (!t.free && !t.went) { try { mo = H.pix(off ? MOON_OFF : MOON, 11, 'st-mpx') || ''; } catch (_) {} mo = '<span class="mo' + (off ? ' off' : '') + '" role="img" aria-label="' + esc(U('mkSlotCost')) + '">' + mo + '</span>'; }
    return '<button type="button" class="st-mt' + (t.blue ? ' blue' : '') + (k === 'dare' ? ' dare' : '') + (t.free ? ' free' : '') + (t.went ? ' went' : '') + (off ? ' off' : '') + '" data-k="' + esc(k) + '"' +
      (t.went ? ' disabled' : '') + (off ? ' aria-disabled="true"' : '') + '>' + icon(k, 16) + '<span class="nm">' + esc(NM(k)) + '</span><span class="pr">' + esc(pr) + '</span>' +
      (t.free && !t.went ? '<span class="fr">' + esc(U('priceFree')) + '</span>' : '') + mo + (t.went ? '<span class="ck" aria-hidden="true">✓</span>' : '') + '</button>';
  }
  function renderMarket() {
    var p = P(), v = p && E().marketView ? E().marketView(run(), C()) : null;
    if (!p || !v || !S.slot) return;
    S.phase = 'grid'; S.cur = null; S.hold = null;
    if (S.live && S.live.parentNode) S.live.parentNode.removeChild(S.live);
    var rest = 3 - (v.tiles.length % 3);                             // 收攤鈕佔那一列剩下的格（整列滿＝另起一列）
    var h = '<div class="st-pick st-mk" role="group" aria-label="' + esc(U('mkTitle')) + '"><div class="st-mtop"><span class="st-sw" aria-hidden="true">' + esc(U('mkSlotWord')) + '</span>' + moonsHTML(p) +
      '<span class="mn">' + esc(money(run().money)) + '</span><span class="st-lxs"></span></div>' +
      '<div class="st-mgrid">' + v.tiles.map(mkTileHTML).join('') +
      '<button type="button" class="st-mleave' + (v.left > 0 ? '' : ' pri') + (rest === 3 ? ' row' : '') + '" data-a="leave" style="grid-column:span ' + rest + '">' +
      esc(v.left > 0 ? U('mkLeave', { n: mt(v.leaveCash) }) : U('mkLeaveNone')) + '</button></div></div>';
    S.slot.innerHTML = h;
    S.drop = null;
    var lx = qs('.st-lxs', S.slot); if (S.live && lx) lx.appendChild(S.live);
    // 跨過一級那一刻的字在頂列放不下（中繼點 4 顆月亮＋錢）：市集頂列換短的（照樣寫「樂歷」；點了收回原本那行照 ui）
    if (S.live && S.live.classList.contains('up') && U('mkLiveUp')) { var lt = qs('.t', S.live); if (lt) lt.textContent = U('mkLiveUp', { n: S.live.getAttribute('data-lv') }); }
    lightUp(isleLit());
    fitPick('market');
    H.auto(function () {
      if (!S || S.phase !== 'grid') return;
      var ch = null; try { ch = H.policy(); } catch (_) {}
      if (!ch) return;
      if (ch.type === 'stallEnter') enterTile(ch.kind);
      else if (ch.type === 'stallLeave') mkLeave();
      else if (ch.type === 'stallAct') mkAct(ch);
    }, 260);
  }
  function mkHint() {
    if (S.hinted) return;
    S.hinted = true;
    after(function () { try { H.say('o', U('mkHint'), 2600); } catch (e) { console.error(e); } }, 350);
  }
  // 小人只走一次到島台（browse）；走路途中照樣可以點攤位格。活店：browse 上的客人先讓開
  function mkWalkIn() {
    var p = stg('pos', 'p'), sp = stg('spot', 'browse');
    if (sp) crowd('yield', sp);
    var face = function () { if (S && S.mk) faceTo('bin:classical'); };
    if (A().rm || !p || p.hidden || p.outside || !sp || H.autoOn()) { if (sp) stg('put', 'p', 'browse'); stg('hide', 'p', false); return face(); }
    if (Math.round(p.x) === Math.round(sp[0]) && Math.round(p.y) === Math.round(sp[1])) return face();
    stg('pose', 'p', null);
    stgP('walk', 'p', ['browse'], 110).then(face);
  }
  function mkNight(o, p) {
    S = { r: o.r, slot: o.slot, box: o.box, mk: true, sel: null, phase: null, sheet: null, cur: null, curKey: null, flipped: [], flipMem: {}, camMs: 600, resumed: !!p.cur,
      walked: false, spot: 'browse', hold: null, drop: null, fresh: null, live: o.box ? qs('.cx-live', o.box) : null };
    if (S.slot) { S.slot.addEventListener('click', onSlotClick); var nb = S.slot.closest && S.slot.closest('.st-night'); if (nb) nb.classList.add('mk'); }   // .mk：市集那塊收窄上下邊（stalls.css）
    crowd('market', true);                                         // 活店導演 market 模式（下一棒；沒有這個入口＝不叫）
    if (p.cur) { stg('put', 'p', 'browse'); stg('hide', 'p', false); faceTo('bin:classical'); }   // 重新整理回來、攤開著：人直接站在島台、面板打開
    else mkWalkIn();
    renderMarket();
    if (p.cur) openMk(p.cur); else if (p.first) mkHint();          // 老闆那句只在這一趟第一個市集說（修正棒：每個市集都說＝9 格時泡泡蓋住島台上排 2.6 秒）
  }
  function enterTile(kind, o) {
    if (!S || S.busy || S.phase !== 'grid') return;
    o = o || {};
    // 第 I 波 I-3b 店主 11-23：算命攤先問一題（題庫抓到才問；自動玩不問）；選了＝帶 ans 打開（翻第一張）
    if (kind === 'fortune' && !o.direct && !H.autoOn() && P() && !(P().seen || {}).fortune && moodOpen()) return;
    var r = run(), m0 = r.money;
    var res = H.choose(o.ans ? { type: 'stallEnter', kind: kind, ans: o.ans } : { type: 'stallEnter', kind: kind });
    if (!res || !res.ok) { S.keepSheet = false; if (S.sheet) closeStation(); if (res && res.error === 'noSlot') T(U('mkNoSlot')); else console.warn('[stalls] stallEnter', res && res.error, kind); return; }
    sfx('select');
    var p = P(); if (!p) return finish();
    S.fresh = null;
    mkEffects(res.effects, p.cur);                                 // 算命：打開就翻第一張（扣時段）
    if (r.money !== m0) { try { H.cashRise(m0, r.money); } catch (e) { console.error(e); } }
    try { H.refresh(); } catch (_) {}
    if (!p.cur) return renderMarket();
    openMk(p.cur);
  }
  function openMk(cur) {
    S.phase = 'station'; S.cur = cur; S.hold = null; S.kind = cur.kind;
    if (cur.kind === 'studio' && !(cur.nodes || []).length) return mkAct({ type: 'stallAct', act: 'ok' });   // 沒有試錄格＝C 波錄 demo（一行吐司，不出面板）
    if (S.curKey !== cur.key) {
      S.curKey = cur.key; S.sub = null; S.tab = 0; S.gigN = 1;
      S.doc = null; S.docAx = null; S.docMsg = null; S.docLast = null; S.moodR = null; S.moodWait = false;   // 第 I 波 I-3b（醫生的清潔墊、心情結果：每一攤重來）
      S.flipped = S.flipMem[cur.key] || (S.flipMem[cur.key] = (cur.cards || []).map(function () { return !!S.resumed; }));   // 挖寶不自己翻；重新整理回來＝直接翻開
    }
    lightUp([isleOf(cur.kind)].filter(Boolean));
    mkRenderStation(true);
    S.resumed = false;
    if (cur.kind === 'fortune' && !moodReady() && !MOOD.off && MOOD.st >= 0 && (cur.n | 0) < (cur.order || []).length) { var tk = S; moodLoad().then(function () { if (S === tk && S.cur === cur && moodReady()) mkRenderStation(); }); }   // 重新整理回到算命攤：題庫抓到就換成問題
    try { if (cur.kind === 'promo' && cur.cards && cur.cards[0]) H.play(card(cur.cards[0])); } catch (e) { console.error(e); }
  }
  function backBtn(pri) { return btn('data-a="back"', U('mkBack'), { pri: !!pri }); }
  function mkHeadHTML(cur) {
    var r = run(), p = P(), kind = cur.kind, sub = kind === 'dig' && cur.name ? ((WC().digTitles || {})[cur.name] || '') : '';
    // 標題列：攤名（挖寶攤名）＋錢＋月亮；站主一句另一行（矮螢幕收掉：面板 ≤55%，鈕與數字優先）
    return '<div class="hd st-shd"><h3>' + icon(kind, 18) + '<span>' + esc(NM(kind)) + '</span>' + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</h3>' +
      '<span class="mn">' + esc(money(r.money - (S.moneyHide | 0))) + '</span>' + (p ? moonsHTML(p) : '') + '</div>' +
      (LN(kind) ? '<p class="st-line st-mq"><span>「' + esc(LN(kind)) + '」</span></p>' : '');
  }
  // 算命攤翻籤（SPEC-I §6.3）：三張封套（一列一張）；翻開的照實寫籤、停住；下一張＝封套＋「翻下一張（$n）」；第 3 張先寫「可能是凶籤」
  function slipHTML(sl, fresh) {
    var vis = '', tx = '', ex = '', omen = sl.slip === 'omen';
    if (omen) { vis = '<span class="st-sleeve omen" aria-hidden="true">' + esc(U('mkOmenTag')) + '</span>'; tx = U('mkOmen', { pos: sl.pos, n: sl.atk }); }
    else if (sl.slip === 'boss' || sl.slip === 'elite') {
      var q = sl.ratio || {}, a = sl.ace ? card(sl.ace) : null;
      tx = U(sl.slip === 'boss' ? 'mkSlipBoss' : 'mkSlipElite', { c: q.c | 0, o: q.o | 0, h: q.h | 0 });
      if (a) { vis = '<span class="st-sleeve cv">' + H.coverHTML(a) + '</span>'; ex = '<small>' + esc(U('fortuneAce')) + '</small>'; }
    } else if (sl.slip === 'aces') {
      var L = sl.list || [], Z = E().ZH || {};
      tx = L.length ? U('mkSlipAces', { list: L.map(function (x) { return U('mkSlipAce', { pos: x.pos, attr: Z[x.attr] || '' }); }).join('、') }) : U('mkSlipAcesNone');
    } else if (sl.slip === 'top') {
      var c = sl.card ? card(sl.card) : null;
      tx = U('mkSlipTop');
      if (c) { vis = '<span class="st-sleeve cv">' + H.coverHTML(c) + '</span>'; ex = H.starsHTML({ c: sl.c | 0, o: sl.o | 0, h: sl.h | 0 }, { cls: 'st-slst' }); }
    }
    if (!vis) vis = '<span class="st-sleeve up" aria-hidden="true">' + icon('fortune', 16) + '</span>';
    return '<div class="st-slip up' + (omen ? ' omen' : '') + (fresh && !A().rm ? ' st-turn' : '') + '">' + vis + '<div class="tx"><span>' + esc(tx) + '</span>' + ex + '</div></div>';
  }
  function fortuneMkBody(cur, hold) {
    var r = run(), n = cur.n | 0, h = '<div class="st-slips">';
    for (var i = 0; i < (cur.order || []).length; i++) {
      var sl = (cur.slips || [])[i];
      if (sl) { h += slipHTML(sl, S.fresh === i); continue; }
      var warn = i === 2 ? '<small class="warn">' + esc(U('mkOmenWarn')) + '</small>' : '';
      if (!hold && i === n) {
        var pr = ((cur.price || [])[i]) | 0, can = r.money >= pr;
        h += '<div class="st-slip next"><button type="button" class="st-sleeve back" data-a="flip" aria-label="' + esc(U('mkFlipTap')) + '"' + (can ? '' : ' disabled') + '><i class="rec" aria-hidden="true"></i></button>' +
          '<div class="tx">' + btn('data-a="flip"', pr > 0 ? U('mkFlip', { n: mt(pr) }) : U('mkFlipFree'), { pri: true, disabled: !can }) + warn + '</div></div>';
      } else h += '<div class="st-slip down"><span class="st-sleeve back" aria-hidden="true"><i class="rec"></i></span><div class="tx"><span class="q">？</span>' + warn + '</div></div>';
    }
    if (hold && mkNothingLeft()) return h + '</div>' + footHTML([btn('data-a="notedLeave"', U('mkNotedLeave'), { pri: true })]);   // 時段用完、沒別的攤能逛：記下了就收攤（少按一下；M5）
    return h + '</div>' + footHTML([btn(hold ? 'data-a="noted"' : 'data-a="back"', U('fortuneOk'), { pri: hold || n >= (cur.order || []).length })]);
  }
  // 攤位格上已經沒有能進的攤（去過的、時段用完的扣時段攤；免費攤也都去過了）
  function mkNothingLeft() {
    var v = E().marketView ? E().marketView(run(), C()) : null; if (!v) return false;
    return v.tiles.every(function (t) { return t.went || (!t.free && !(v.left > 0)); });
  }
  // 飲料攤（I-3a 只有冬瓜茶：聲望 +fair.drinks.tea.hp〔sim 棒定 2〕、免費、只花時段）；按了島台倒一杯（S.pour → ui isleNow → shop-props teaCup）
  function snackMkBody(cur) {
    var r = run();
    if ((cur.drinks || []).length > 1) return snackCupsBody(cur);   // 第 I 波 I-3b：一排三杯（冬瓜茶、熱美式、高粱）；只有冬瓜茶＝下面 I-3a 逐字
    var cups = (cur.drinks || []).map(function (d) {
      var n = Math.max(0, Math.min(d.hp | 0, r.maxHp - r.hp));
      var label = d.kind === 'tea' ? (n > 0 ? U('mkTea', { n: n }) : U('mkTeaFull')) : d.kind;
      return '<button type="button" class="lb-btn pri big st-cup" data-drink="' + esc(d.kind) + '"' + (r.money < (d.price | 0) ? ' disabled' : '') + '>' + icon('snack', 16) + '<span>' + esc(label) + '</span></button>';   // 圖示＝攤位格那個冬瓜茶手搖杯（MK_ICON.snack；修正棒：原本反白成藍色熱飲杯）
    }).join('');
    return '<p class="note">' + esc(fill(((C().trial || {}).ui || {}).hp || '聲望 {n}/{max}', { n: r.hp, max: r.maxHp })) + '</p><div class="lb-opts st-cups">' + cups + '</div>' + footHTML([backBtn()]);
  }
  // 錄音室試錄（SPEC-D §3.8；?fac=1 有得試）：三條路線各自的下一格，挑一格這一趟有效；也可以照舊錄 demo
  function studioMkBody(cur) {
    var r = run(), tn = (r.fac && r.fac.trialNodes) || {}, used = Object.keys(tn).filter(function (k) { return tn[k] > 0; }).length;
    var left = Math.max(0, (FAIR().studioMax | 0) - used), LV = ['', 'I', 'II', 'III'];
    return '<p class="note">' + esc(U('mkStudio')) + '</p><p class="note st-lx">' + esc(U('mkStudioLeft', { n: left })) + '</p><div class="lb-opts st-nodes">' +
      (cur.nodes || []).map(function (N) {
        return '<button type="button" class="lb-btn st-node" data-node="' + esc(N.id) + '"><b>' + (LV[N.layer] ? '<i>' + LV[N.layer] + '</i>' : '') + esc(N.name) + '</b><span>' + esc(N.text) + '</span></button>';
      }).join('') + '</div>' + footHTML([btn('data-a="ok"', U('mkStudioDemo', { n: ST().demoLexp || 15 })), backBtn()]);   // 回攤位（修正棒：先看看、不錄也能走，不用時段）
  }
  function mkBodyHTML(cur) {
    var r = run();
    switch (cur.kind) {
      case 'dig': { if (cur.blind) return blindGrid(cur, null) + blindNote(U('digPick')) + footHTML([backBtn()]);   // v6 盲挑：只能挑一張、沒有再翻
        var cost = (ST().reroll || 500) * (cur.rolls + 1), none = !(S.flipped || []).some(Boolean);
        return gridHTML(cur.cards.map(function (_, i) { return digTile(cur, i); }).join(''), cur.cards.length) +
          '<p class="note st-dtap"' + (none ? '' : ' hidden') + '>' + esc(U('mkDigTap')) + '</p>' +   // 挖寶不自己翻：還沒翻＝寫出來要點（修正棒）
          footHTML([btn('data-a="reroll"', U('reroll', { n: mt(cost) }), { disabled: !canAfford(cost) }), backBtn()]); }
      case 'trade': return S.sub === 'sell' ? sellGrid() : buyGrid(cur, cur.cards || []) + footHTML([btn('data-a="sell"', U('sellOne')), backBtn(true)]);
      case 'gear': if (cur.gacha) return gearGachaBody(cur, false);   // 第 I 波 I-3b：小物攤右半轉蛋機（newStalls）
        return (relicGrid(cur.relics || [], 'data-relic', ST().gearPrice || 3000) || '<p class="note">—</p>') + footHTML([backBtn()]);
      case 'doctor': return doctorBody(cur, false);                  // 第 I 波 I-3b：唱片醫生（清潔墊）
      case 'warehouse': return ((cur.relics || []).length ? relicGrid(cur.relics, 'data-wrelic') : gridHTML((cur.cards || []).map(function (id) { return cardBtn(id, 'data-take', U('take')); }).join(''), (cur.cards || []).length)) + footHTML([backBtn()]);
      case 'snack': return snackMkBody(cur);
      case 'gig': return gigBody(true) + footHTML([backBtn()]);
      case 'promo': return gridHTML((cur.cards || []).map(function (id) { var c = card(id); return c ? H.tileHTML(c, { cls: 'st-c' }) : ''; }).join(''), (cur.cards || []).length) +
        '<p class="note">' + esc(U('promoNote')) + '</p>' + lexpLine(ST().promoLexp || 10) + footHTML([btn('data-a="ok"', U('promoOk'), { pri: true }), backBtn()]);
      case 'fortune': return moodReady() && (cur.n | 0) < (cur.order || []).length ? moodAskBody(cur, cur.n | 0) : fortuneMkBody(cur, false);   // I-3b：每翻一張先問一題（題庫抓到才問）
      case 'consign': {
        var min = (E().CFG && E().CFG.bagMin) || 5, ids = r.bag.filter(function (id) { return !E().isGift(r, C(), id) && !E().isSeed(r, C(), id); }), full = r.bag.length - 1 < min || !!r.consign;   // 上一張還沒領回＝寄不了（修正棒）
        return '<p class="note">' + esc(r.consign ? U('mkConsignBusy') : U('consignPick')) + '</p>' + gridHTML(ids.map(function (id) { return cardBtn(id, 'data-consign', NM('consign'), { disabled: full }); }).join(''), 4) + footHTML([backBtn()]);
      }
      case 'consignGet': return '<p class="note">' + esc(U('consignBack')) + '</p>' + gridHTML((cur.cards || []).map(function (id) { return cardBtn(id, 'data-take', U('take'), { cls: 'gold' }); }).join(''), 3) + footHTML([backBtn()]);
      case 'home': return '<p class="note">' + esc(U('homePick')) + '</p>' + lexpLine(E().mkHomeLexp ? E().mkHomeLexp(C()) : ST().homeLexp || 30) + gridHTML(r.bag.map(function (id) { return cardBtn(id, 'data-home', U('homePut')); }).join(''), 4) + footHTML([backBtn()]);
      case 'dare': {                                                  // 踢館帖面板一行不動（SPEC-H §7.8）；市集多一顆「回攤位」（修正棒：先看看、翻完籤再回來接）
        var dh = dareBody(), di = dh.lastIndexOf('<div class="foot st-foot">');
        return (di >= 0 ? dh.slice(0, di) : dh) + footHTML([btn('data-a="decline"', U('dareNo')), backBtn()]);
      }
      case 'market': return marketBody(cur, U('mkBack'));
      case 'studio': return studioMkBody(cur);
    }
    return footHTML([backBtn(true)]);
  }
  function mkRenderStation(first) {
    var cur = S && (S.ask || S.hold || S.cur); if (!cur) return;
    var html = mkHeadHTML(cur) + (S.ask ? moodAskBody(null, 0) : S.hold ? holdBody(cur) : mkBodyHTML(cur));
    if (S.sheet && S.sheet.isConnected && (!first || S.keepSheet)) S.sheet.innerHTML = html;
    else { S.sheet = H.sheet(html, 'stall st-mk st-k-' + cur.kind); S.sheet.addEventListener('click', onSheetClick); }
    S.keepSheet = false;
    S.drop = null; S.fresh = null;
    // 面板 ≤55%（放不下面板自己捲）；至少跟底下攤位格那塊一樣高（修正棒：面板比攤位格矮＝底下那塊被擠出畫面、整個店溢出；e2e-market #10）
    var vh = H.vh(), nat = Math.ceil(H.naturalH(S.sheet) + 4), grid = S.box ? Math.ceil(H.naturalH(S.box) + 6) : 0, need = Math.min(Math.round(vh * 0.55), Math.max(200, nat, grid));
    if (first || S.need == null || Math.abs(need - S.need) >= 2) { S.need = need; try { H.cam('market', 'map', first ? 300 : 150, need); } catch (e) { console.error(e); } }
    H.auto(function () {
      if (!S) return;
      if (S.ask) { var mo = S.sheet && qs('[data-mo]', S.sheet); if (mo) mo.click(); return; }   // I-3b 心情題（自動玩：選第一個）
      if (S.hold) { var b = S.sheet && qs('[data-a=egg],[data-a=noted],[data-a=notedLeave]', S.sheet); if (b) b.click(); return; }   // I-3b：轉蛋停住＝先點蛋
      var ch = null; try { ch = H.policy(); } catch (_) {}
      if (ch && ch.type === 'stallAct') mkAct(ch);
    }, 260);
  }
  // 效果 → 畫面（月亮、翻籤、吐司）；回 { close, flip }
  function mkEffects(list, cur0) {
    var o = { close: false, flip: false };
    (list || []).forEach(function (f) {
      if (f.gacha != null) {                                         // 第 I 波 I-3b 轉蛋：結果先不畫（蛋打開才揭曉；聲望、錢、進包包都等那一下）
        S.gacha = { key: cur0 ? cur0.key : '', phase: A().rm || A().fast ? 'egg' : 'spin', eff: f, n: (f.gacha | 0) + 1, fresh: true };
        S.moneyHide = f.cash | 0; S.gFx = { n: ((S.gFx || {}).n | 0) + 1, kind: 'spin' }; o.gacha = true; sfx('coin');
        if (f.slot != null) { S.drop = f.slot; sfx('pop'); }
        return;
      }
      if (f.hp > 0) T(fill(((C().trial || {}).ui || {}).heal || '聲望 +{n}', { n: f.hp }), 'gold');
      else if (f.hp === 0 && cur0 && cur0.kind === 'snack') T(U('snackFullToast'));
      if (f.drink) S.pour = { n: (S.pour ? S.pour.n : 0) + 1, kind: f.drink };   // 島台倒一杯（ui isleNow → stage → shop-props isleDraw）
      if (f.drink && f.drink !== 'tea') {                            // 第 I 波 I-3b 熱美式／高粱：吐司一句（接下來幾位）；來客條頭像下會畫杯子＋剩幾位
        var DD = (FAIR().drinks || {})[f.drink] || {};
        T(DN(f.drink) + '：' + (f.drink === 'coffee' ? U('mkCoffeeHint', { n: f.left | 0, d: DD.def | 0 }) : U('mkSorghumHint', { n: f.left | 0, a: DD.atk | 0, pen: DD.pen | 0 })), 'gold');
      }
      if (f.wash) { S.docMsg = U('mkWashed'); S.docLast = f.wash; S.doc = null; S.docAx = null; S.docFx = { n: ((S.docFx || {}).n | 0) + 1, kind: 'wash', id: f.wash }; o.doc = true; sfx('pocket'); }   // 唱片醫生（停住：字留在面板上）
      if (f.press) { S.docMsg = U('mkPressed', { attr: ZHA(f.attr), n: f.n | 0 }); S.docLast = f.press; S.doc = f.press; S.docAx = null; S.docFx = { n: ((S.docFx || {}).n | 0) + 1, kind: 'press', id: f.press, attr: f.attr }; o.doc = true; sfx('ding'); }
      if (f.gainRelic) T(fill('拿到「{n}」', { n: H.relicName(f.gainRelic) }));
      if (f.nowPlaying) { try { if (H.bgmFront) H.bgmFront(f.nowPlaying); else H.play(card(f.nowPlaying)); } catch (e) { console.error(e); } }
      if (f.dare) T(f.dare === 'tough' ? U('dareToughOn', { n: ((ST().dare || {}).tough || {}).atk || 1 }) : U('dareTankOn', { n: ((ST().dare || {}).tank || {}).hp || 4 }), 'gold');
      // 收攤自動錄 demo：接著就換畫面，吐司帶 keep（修正棒：原本換畫面那一下就被清掉＝玩家看不到）
      if (f.lexp > 0) { if (f.demo) H.toast(U('mkDemoAuto', { n: f.lexp }), 'gold keep'); else T(cur0 && cur0.kind === 'studio' ? U('demo', { n: f.lexp }) : U('lexpLater', { n: f.lexp }), 'gold'); }
      if (f.record) { var N = ((cur0 && cur0.nodes) || []).filter(function (x) { return x.id === f.record; })[0]; T(U('mkRecord', { name: N ? N.name : f.record }), 'gold'); }
      if (f.slot != null) { S.drop = f.slot; sfx('pop'); }
      if (f.flip != null) { S.fresh = f.flip; o.flip = true; sfx(f.slip && f.slip.slip === 'omen' ? 'hurt' : 'flip'); }
      if (f.close) o.close = true;
    });
    return o;
  }
  function mkAct(ch) {
    if (!S || S.busy) return;
    var r = run(), p = P(); if (!p) return;
    var cur0 = p.cur, m0 = r.money;
    var res = H.choose(ch);
    if (!res || !res.ok) {
      var er = res && res.error;
      if (er === 'money') T(((C().shopUi || {}).noMoney) || '錢不夠。');
      else if (er === 'bagMin') T(fill((C().shopUi || {}).bagSellMin || '', { n: (E().CFG && E().CFG.bagMin) || 5 }));
      else if (er === 'bagOpen') T(U('bagFirst'));
      else if (er === 'noSlot') T(U('mkNoSlot'));
      else if (er === 'consignBusy') T(U('mkConsignBusy'));
      else console.warn('[stalls] choose', er, ch);
      return;
    }
    if (ch.act !== 'flip' && ch.act !== 'gacha' && ch.act !== 'wash' && ch.act !== 'press') sfx(ch.act === 'take' || ch.act === 'bagTake' ? 'pocket' : ch.act === 'back' ? 'tick' : 'select');
    var gx = (res.effects || []).filter(function (f) { return f && f.gacha != null; })[0], m1 = gx ? m0 - (gx.spend | 0) : r.money;   // 轉蛋：錢只跳扣的那一下（塞的錢等蛋打開）
    if (m1 !== m0) { try { H.cashRise(m0, m1); } catch (e) { console.error(e); } }
    var o = mkEffects(res.effects, cur0);
    if (ch.act === 'sell') S.sub = null;
    try { H.refresh(); } catch (_) {}
    var p2 = P();
    if (!p2) return finish();
    if (o.close || !p2.cur) {
      if (cur0 && cur0.kind === 'dig' && cur0.blind && ch.act === 'take') { S.hold = cur0; S.cur = null; S.phase = 'hold'; S.digGot = cur0.cards.indexOf(ch.cardId); if (cur0.gold === ch.cardId) sfx('ding'); return mkRenderStation(); }   // v6 盲挑：翻開挑的那張、停住等點
      if (cur0 && cur0.kind === 'fortune' && o.flip) { S.hold = cur0; S.cur = null; S.phase = 'hold'; return mkRenderStation(); }   // 第 3 張：停住等點「記下了」
      if (cur0 && ((cur0.kind === 'doctor' && o.doc) || (cur0.kind === 'gear' && o.gacha))) { S.hold = cur0; S.cur = null; S.phase = 'hold'; gachaArm(); return mkRenderStation(); }   // I-3b：洗／壓完、轉完，停住等點
      return mkBackToGrid();
    }
    if (ch.act === 'reroll') { S.flipped = cur0.cards.map(function () { return false; }); S.flipMem[cur0.key] = S.flipped; S.curKey = cur0.key; }
    if (o.gacha) gachaArm();
    mkRenderStation();
  }
  // 轉蛋機晃完（約 0.65 秒）蛋掉出來：等點（動畫加速／減少動態＝直接掉出來）
  function gachaArm() {
    var gs = S && S.gacha; if (!gs || gs.phase !== 'spin') return;
    after(function () { if (S && S.gacha === gs && gs.phase === 'spin') { gs.phase = 'egg'; mkRenderStation(); } }, 650);
  }
  function mkBackToGrid() { S.cur = null; S.hold = null; S.ask = null; S.moodQ = null; S.need = null; S.moneyHide = 0; closeStation(); renderMarket(); }
  function mkSheetClick(e) {
    if (!S) return;
    var t = e.target.closest && e.target.closest('button'); if (!t || t.disabled) return;
    var a = t.getAttribute('data-a');
    if (S.ask) {                                                     // 第 I 波 I-3b：打開算命攤之前那一題（還沒進攤、不扣時段）
      if (t.hasAttribute('data-mo')) return moodPick(+t.getAttribute('data-mo'));
      if (a === 'back') { sfx('tick'); mkBackToGrid(); }
      return;
    }
    if (S.hold) {
      if (a === 'egg') { eggOpen(); return; }                        // 轉完攤子關了：蛋還沒開＝先開
      if (a === 'noted') { sfx('tick'); mkBackToGrid(); }
      else if (a === 'notedLeave') { S.hold = null; S.cur = null; closeStation(); mkLeave(); }   // 記下了，收攤（時段用完、沒別的攤；不用確認：剩 0 個時段）
      return;
    }
    var cur = S.cur; if (!cur) return;
    var X = function (o) { return Object.assign({ type: 'stallAct' }, o); };
    if (t.hasAttribute('data-dig')) return mkAct(X({ act: 'take', cardId: (cur.cards || [])[+t.getAttribute('data-dig')] }));   // v6 盲挑：點背面＝收那張（選了才翻）
    if (t.hasAttribute('data-flip')) { flipOne(cur, +t.getAttribute('data-flip')); return; }    // 挖寶攤：點一張翻一張（不自己翻）
    if (a === 'sell') { sfx('tick'); S.sub = 'sell'; mkRenderStation(); return; }
    if (a === 'sellBack') { sfx('tick'); S.sub = null; mkRenderStation(); return; }
    if (t.hasAttribute('data-tab')) { sfx('tick'); S.tab = +t.getAttribute('data-tab'); mkRenderStation(); return; }
    if (a === 'gigMinus') { S.gigN = Math.max(1, (S.gigN || 1) - 1); sfx('tick'); mkRenderStation(); return; }
    if (a === 'gigPlus') { S.gigN = (S.gigN || 1) + 1; sfx('tick'); mkRenderStation(); return; }
    if (t.hasAttribute('data-take')) return mkAct(X({ act: 'take', cardId: t.getAttribute('data-take') }));
    if (t.hasAttribute('data-buy')) return mkAct(X({ act: 'buy', cardId: t.getAttribute('data-buy') }));
    if (t.hasAttribute('data-sell')) return mkAct(X({ act: 'sell', cardId: t.getAttribute('data-sell') }));
    if (t.hasAttribute('data-bagtake')) return mkAct(X({ act: 'bagTake', cardId: t.getAttribute('data-bagtake') }));
    if (t.hasAttribute('data-consign')) return mkAct(X({ act: 'consign', cardId: t.getAttribute('data-consign') }));
    if (t.hasAttribute('data-home')) return mkAct(X({ act: 'ok', cardId: t.getAttribute('data-home') }));
    if (t.hasAttribute('data-dare')) return mkAct(X({ act: 'accept', mode: t.getAttribute('data-dare') }));
    if (t.hasAttribute('data-wrelic')) return mkAct(X({ act: 'relic', relicId: t.getAttribute('data-wrelic') }));
    if (t.hasAttribute('data-relic')) return buyRelic(t.getAttribute('data-relic'));
    if (t.hasAttribute('data-drink')) return mkAct(X({ act: 'drink', kind: t.getAttribute('data-drink') }));
    if (t.hasAttribute('data-node')) return mkAct(X({ act: 'record', node: t.getAttribute('data-node') }));
    // 第 I 波 I-3b：唱片醫生（換清潔墊上那張、洗、重壓先選軸）、轉蛋機（搖桿、蛋）、算命心情題（選一個＝翻那張）
    if (t.hasAttribute('data-doc')) { sfx('tick'); S.doc = t.getAttribute('data-doc'); S.docAx = docPressOnly(cur, S.doc) ? S.doc : null; S.docMsg = null; mkRenderStation(); return; }   // 只能壓的那張（新到、沒聽膩、壓得了）＝點了直接挑軸（M5：少按「重壓」那一下）
    if (a === 'wash') return mkAct(X({ act: 'wash', cardId: docSel(cur) }));
    if (a === 'press') { sfx('tick'); S.docAx = docSel(cur); S.docMsg = null; mkRenderStation(); return; }
    if (a === 'axNo') { sfx('tick'); S.docAx = null; mkRenderStation(); return; }
    if (t.hasAttribute('data-ax')) return mkAct(X({ act: 'press', cardId: S.docAx || docSel(cur), attr: t.getAttribute('data-ax') }));
    if (a === 'gacha') return gachaSpin(cur);
    if (a === 'egg') return eggOpen();
    if (t.hasAttribute('data-mo')) return moodPick(+t.getAttribute('data-mo'));
    if (a === 'flip') return mkAct(X({ act: 'flip' }));
    if (a === 'gigBuy') return mkAct(X({ act: 'tickets', n: Math.max(1, S.gigN || 1) }));
    if (a === 'gigKeep') return mkAct(X({ act: 'tickets', n: E().gigKeepN(run(), C()) }));
    if (a === 'reroll') return mkAct(X({ act: 'reroll' }));
    if (a === 'bag') return mkAct(X({ act: 'bag' }));
    if (a === 'decline') return mkAct(X({ act: 'decline' }));
    if (a === 'done') return mkAct(X({ act: 'done' }));
    if (a === 'ok') return mkAct(X({ act: 'ok' }));
    if (a === 'back') return mkAct(X({ act: 'back' }));
  }
  // 收攤：這一趟第一次而且剩 ≥2 個時段才問（SPEC-I §6.2-5；CRITIQUE 6-4），其他直接收
  function mkAskLeave() {
    sfx('tick');
    var r = run(), p = P(); if (!p || !S.slot) return;
    var left = p.left | 0;
    if (left < 2 || ((((r.stats || {}).c) || {}).leave | 0) > 0) return mkLeave();
    S.phase = 'leave';
    if (S.live && S.live.parentNode) S.live.parentNode.removeChild(S.live);
    S.slot.innerHTML = '<div class="st-pick st-mk"><div class="st-ask" role="alertdialog" aria-label="' + esc(U('mkLeaveYes')) + '"><p>' + esc(U('mkLeaveAsk', { k: left, n: mt(FAIR().slotCash || 300) })) + '</p>' +
      '<div class="foot two">' + btn('data-a="leaveNo"', U('mkLeaveNo')) + btn('data-a="leaveYes"', U('mkLeaveYes'), { pri: true }) + '</div></div></div>';
    fitPick('market');
    H.auto(function () { var b = S && S.slot && qs('[data-a=leaveYes]', S.slot); if (b) b.click(); }, 260);
  }
  function mkLeave() {
    if (!S || S.busy) return;
    var r = run(), m0 = r ? r.money : 0, cur0 = (P() || {}).cur || null;
    var res = H.choose({ type: 'stallLeave' });
    if (!res || !res.ok) { console.warn('[stalls] stallLeave', res && res.error); return; }
    try { H.log('leave'); } catch (_) {}
    sfx('coin');
    if (r && r.money !== m0) { try { H.cashRise(m0, r.money); } catch (e) { console.error(e); } }
    mkEffects(res.effects, cur0);                                  // 錄音室沒去：收攤前順手錄了 demo（樂歷 +15）
    try { H.refresh(); } catch (_) {}
    S.cur = null; S.hold = null;
    finish();
  }
  function mkSlotClick(e) {
    var lx = e.target.closest && e.target.closest('.st-lxs .cx-live');   // 樂歷細條放不下會截：點一下吐司寫整句（修正棒）
    if (lx && !lx.classList.contains('up')) { var tx = qs('.t', lx), lv = qs('.lv', lx); if (tx) { sfx('tick'); T(tx.textContent + (lv && lv.textContent ? '・' + lv.textContent : '')); } return; }
    var t = e.target.closest && e.target.closest('button'); if (!t || t.disabled) return;
    var a = t.getAttribute('data-a');
    if (a === 'leave' && S.phase === 'grid') { mkAskLeave(); return; }
    if (a === 'leaveNo') { sfx('tick'); renderMarket(); return; }
    if (a === 'leaveYes') { mkLeave(); return; }
    if (t.hasAttribute('data-k') && S.phase === 'grid') {
      if (t.getAttribute('aria-disabled') === 'true') { sfx('tick'); T(U('mkNoSlot')); return; }
      enterTile(t.getAttribute('data-k'));
    }
  }
  // ================================================================== 第 I 波 I-3b 市集新攤（SPEC-I §6.3、§6.4-5；引擎契約 wave-i/build3b/CONTRACT.md）
  //   開關＝content fair.newStalls（E.nsOn；?newstalls=1 試玩）：唱片醫生（清潔墊：洗／重壓）、飲料攤一排三杯（冬瓜茶、熱美式、高粱）、小物攤右半轉蛋機。
  //   關著＝這一段的函式都不會被叫（攤子不會抽到醫生、cur 沒有 gacha、drinks 只有冬瓜茶）＝I-3a 逐字。
  //   算命攤心情題（店主 11-23；不看開關）：進算命攤才抓 ../mood-quiz.json（快取）、翻滿三張前抓 ../mood-bank.json；抓不到＝照 I-3a 翻籤。
  //   每翻一張先問一題（E.moodAsk；點選項＝翻那張，choose 帶 ans）；翻滿三張＝第 3 張那一行＋阿姨講心情、唸一段（E.moodResult，原文一字不改）、那張進想要清單（host.want）。
  //   翻籤、轉蛋、洗唱片一律停住等點：做完攤子自動關的那一下＝hold（面板留著、點「回攤位」才回攤位格）。
  function NS() { try { return !!(E().nsOn && E().nsOn(C())); } catch (_) { return false; } }
  function DN(k) { return ((WC().ui || {}).drinkNames || {})[k] || k; }
  function ZHA(a) { return (E().ZH || {})[a] || a; }
  function noMoney() { return ((C().shopUi || {}).noMoney) || '錢不夠'; }
  function plusOf(id) { var r = run(); try { return r && E().plusOf ? E().plusOf(r, id) : null; } catch (_) { return null; } }
  function effOf(id) { var r = run(); try { return (r && E().effCard && E().effCard(C(), r, id)) || card(id); } catch (_) { return card(id); } }
  function pressTagHTML() { return '<span class="st-ptag" aria-hidden="true">' + esc(U('mkPressTag')) + '</span>'; }
  // 做完攤子自動關（醫生做滿、轉蛋轉滿）停住那一下的鈕：還有別的攤＝回攤位；什麼都不能逛了＝收攤回店（少按一下）
  function holdBtn() { return mkNothingLeft() ? btn('data-a="notedLeave"', U('mkLeaveNone'), { pri: true }) : btn('data-a="noted"', U('mkBack'), { pri: true }); }
  function holdBody(cur) {
    if (cur.kind === 'dig') return blindGrid(cur, S.digGot != null ? S.digGot : -1) + blindNote(U('digLeft', { n: cur.cards.length - 1 })) + footHTML([holdBtn()]);   // v6 盲挑：只翻挑的那張
    if (cur.kind === 'doctor') return doctorBody(cur, true);
    if (cur.kind === 'gear' && cur.gacha) return gearGachaBody(cur, true);
    if (cur.kind === 'fortune') { var mr = moodRes(cur); if (mr) return moodResultBody(cur, mr); }
    return fortuneMkBody(cur, true);
  }

  // ---------------- 唱片醫生（清潔墊）：預設放最膩那張（cur.pick）；上方一列可換（聽膩／耐聽用過的＋這一輪新到的）；洗／重壓（重壓先選軸）；一次最多 cur.max 個動作
  function docIds(cur) { var a = (cur.worn || []).filter(card); (cur.fresh || []).forEach(function (id) { if (a.indexOf(id) < 0 && card(id)) a.push(id); }); return a; }
  function docPressOnly(cur, id) {
    var r = run(), full = (cur.n | 0) >= (cur.max | 0);
    return (cur.worn || []).indexOf(id) < 0 && (cur.fresh || []).indexOf(id) >= 0 && !plusOf(id) && (cur.pressLeft | 0) > 0 && !full && r.money >= (cur.press | 0);
  }
  function docSel(cur) { var ids = docIds(cur); if (S.doc && ids.indexOf(S.doc) >= 0) return S.doc; return cur.pick && ids.indexOf(cur.pick) >= 0 ? cur.pick : ids[0] || null; }
  function wearTx(id) {
    var r = run(), w = r && r.wear && r.wear[id], WU = ((C().wear || {}).ui) || {}, WC0 = (E().wearCfg ? E().wearCfg(C()) : C().wear) || {}, G = Math.max(1, WC0.grooves | 0 || 5);
    if (!w || !((w.g | 0) > 0 || (w.n | 0) > 0)) return '';
    var out = [fill(WU.ear || '', { n: Math.max(0, G - (w.g | 0)), max: G })];
    if ((w.n | 0) > 0) out.push(fill(WU.worn || '', { n: w.n | 0 }));
    return out.join('・');
  }
  function docMini(cur, id, on) {
    var c = card(id), r = run(), w = r.wear && r.wear[id], fresh = (cur.fresh || []).indexOf(id) >= 0;
    var tag = w && (w.n | 0) > 0 ? '<b class="wn">' + esc('−' + (w.n | 0)) + '</b>' : fresh ? '<b class="nw">' + esc(U('mkFreshTag')) + '</b>' : '';
    return '<button type="button" class="st-dmini' + (on ? ' on' : '') + '" data-doc="' + esc(id) + '" aria-pressed="' + (on ? 'true' : 'false') + '" aria-label="' + esc(c.artist + '《' + c.album + '》') + '">' +
      H.coverHTML(c, { info: false, badge: false }) + tag + (plusOf(id) ? pressTagHTML() : '') + '</button>';
  }
  function matHTML(cur, id) {
    var c = card(id); if (!c) return '';
    var e = effOf(id) || c, pl = plusOf(id), fresh = (cur.fresh || []).indexOf(id) >= 0;
    var st = [wearTx(id), pl ? U('mkPressDone') : fresh ? U('mkDocFresh') : ''].filter(Boolean).join('・');
    return '<div class="st-mat"><span class="cvw">' + H.coverHTML(c, { badge: false }) + (pl ? pressTagHTML() : '') + '</span><div class="tx"><b>' + esc(c.album) + '</b>' +
      H.starsHTML(e, { cls: 'st-dst', worn: e.wornAxis, pressed: e.pressed }) + (st ? '<small>' + esc(st) + '</small>' : '') + '</div></div>';
  }
  function dbtn(a, label, sub, o) { o = o || {}; return '<button type="button" class="lb-btn st-dbtn' + (o.pri ? ' pri' : '') + '" data-a="' + a + '"' + (o.disabled ? ' disabled' : '') + '><b>' + esc(label) + '</b><small>' + esc(sub) + '</small></button>'; }
  function doctorBody(cur, hold) {
    var r = run(), D = FAIR().doctor || {}, ids = docIds(cur), full0 = (cur.n | 0) >= (cur.max | 0);
    var lft = !hold && (cur.n | 0) > 0 && !full0 ? '<small>' + esc(U('mkDocLeft', { n: (cur.max | 0) - (cur.n | 0) })) + '</small>' : '';   // 這一次還能做幾件（跟在做完那句後面）
    var msg = S.docMsg ? '<p class="st-dmsg">' + esc(S.docMsg) + lft + '</p>' : lft ? '<p class="st-dmsg">' + lft + '</p>' : '';
    if (hold) { var last = S.docLast && card(S.docLast) ? S.docLast : docSel(cur); return msg + (last ? matHTML(cur, last) : '') + footHTML([holdBtn()]); }
    var sel = docSel(cur);
    if (!sel) return msg + '<p class="note">' + esc(U('mkDocNone')) + '</p>' + footHTML([backBtn(true)]);
    var row = ids.length > 1 ? '<div class="st-drow" role="group">' + ids.map(function (id) { return docMini(cur, id, id === sel); }).join('') + '</div>' : '';
    var full = (cur.n | 0) >= (cur.max | 0), c = card(sel);
    if (S.docAx === sel) {                                           // 重壓：先選軸（那軸已經 cap 星＝灰）
      var cap = D.cap || 5, k = D.star || 1;
      return matHTML(cur, sel) + '<p class="st-dq">' + esc(U('mkPressAxis')) + '</p><div class="lb-opts st-dax">' +
        ['c', 'o', 'h'].map(function (a) { var s0 = c[a] | 0; return btn('data-ax="' + a + '"', U('mkPressTo', { attr: ZHA(a), a: s0, b: Math.min(cap, s0 + k) }), { cls: 'ax-' + a, disabled: s0 >= cap }); }).join('') + '</div>' +
        footHTML([btn('data-a="axNo"', (C().shopUi || {}).sellNo || '算了'), backBtn()]);
    }
    var inW = (cur.worn || []).indexOf(sel) >= 0, inF = (cur.fresh || []).indexOf(sel) >= 0, pl = plusOf(sel);
    var wOk = inW && !full && r.money >= (cur.wash | 0), pOk = !pl && inF && (cur.pressLeft | 0) > 0 && !full && r.money >= (cur.press | 0);
    var wWhy = !inW ? U('mkNotWorn') : r.money < (cur.wash | 0) ? noMoney() : U('mkWashHint');
    var pWhy = pl ? U('mkPressDone') : !inF ? U('mkPressOnlyNew') : !((cur.pressLeft | 0) > 0) ? U('mkPressMax', { n: D.pressMax | 0 || 3 }) : r.money < (cur.press | 0) ? noMoney() : U('mkPressHint', { k: D.star || 1 });
    return msg + row + matHTML(cur, sel) + '<div class="st-dact">' + dbtn('wash', U('mkWash', { n: mt(cur.wash | 0) }), wWhy, { pri: inW, disabled: !wOk }) +
      dbtn('press', U('mkPress', { n: mt(cur.press | 0) }), pWhy, { pri: !inW && inF, disabled: !pOk }) + '</div>' + footHTML([backBtn()]);
  }

  // ---------------- 飲料攤一排三杯（冬瓜茶免費回聲望；熱美式／高粱＝接下來幾位；同時只有一杯在作用，新點的換掉舊的）
  function cupIcon(kind, size) { var MK = W.DipPropsO && W.DipPropsO.MK_ICON, rows = MK && MK[kind === 'tea' ? 'snack' : kind]; var h = ''; try { h = rows ? H.pix(rows, size || 16, 'st-ic') : ''; } catch (_) {} return h || icon('snack', size); }
  function snackCupsBody(cur) {
    var r = run(), dk = E().drinkOf ? E().drinkOf(r, C()) : null, hpU = ((C().trial || {}).ui || {}).hp || '聲望 {n}/{max}';
    var now = fill(hpU, { n: r.hp, max: r.maxHp }) + (dk ? '・' + U('mkDrinkNow', { name: DN(dk.kind), left: U('mkDrinkLeft', { n: dk.left }) }) : '');
    var cups = (cur.drinks || []).map(function (d) {
      var pr = d.price | 0, can = r.money >= pr, sub, sw = '';
      if (d.kind === 'tea') { var n = Math.max(0, Math.min(d.hp | 0, r.maxHp - r.hp)); sub = n > 0 ? fill(((C().trial || {}).ui || {}).heal || '聲望 +{n}', { n: n }) : U('mkHpFull'); }
      else if (d.kind === 'coffee') sub = U('mkCoffeeHint', { n: d.n | 0, d: d.def | 0 });
      else sub = U('mkSorghumHint', { n: d.n | 0, a: d.atk | 0, pen: d.pen | 0 });
      if (dk && d.kind !== 'tea') sw = '<small class="sw">' + esc(U('mkDrinkSwap', { name: DN(dk.kind) })) + '</small>';
      return '<button type="button" class="lb-btn st-cup3 k-' + esc(d.kind) + '" data-drink="' + esc(d.kind) + '"' + (can ? '' : ' disabled') + '>' + '<span class="ic">' + cupIcon(d.kind, 18) + '</span>' +
        '<b>' + esc(DN(d.kind)) + '</b><span class="pr">' + esc(pr > 0 ? money(pr) : U('priceFree')) + '</span><small>' + esc(can ? sub : noMoney()) + '</small>' + sw + '</button>';
    }).join('');
    return '<p class="note">' + esc(now) + '</p><div class="st-cups3">' + cups + '</div>' + footHTML([backBtn()]);
  }

  // ---------------- 小物攤：左＝兩件配件（照 I-3a）、右＝轉蛋機（投幣：點搖桿轉一顆 → 蛋掉出來 → 點蛋打開，停住等點）
  //   引擎在點搖桿那一下就決定、扣錢、生效（cur.gacha.last）；畫面先不畫結果：錢的跳字只跳扣的那一下、蛋打開才跳進帳（S.moneyHide＝頂列先扣掉還沒揭曉的錢）
  var GACHA_EGG = ['r', 'b', 'y', 'n', 'm', 'c'];
  function gachaUi(cur) {
    var g = cur.gacha || {};
    if (!S.gacha || S.gacha.key !== cur.key) S.gacha = { key: cur.key, phase: g.last ? 'open' : 'idle', eff: g.last || null, n: (g.n | 0) };   // 重新整理回來：上一顆照開好的畫
    return S.gacha;
  }
  function gachaResHTML(f) {
    if (!f) return '';
    var t = '', vis = '';
    if (f.cell === 'gold' && f.card && card(f.card)) { t = U('mkGachaGold'); vis = H.coverHTML(card(f.card), { badge: false }); }
    else if (f.cell === 'gold' || f.cell === 'cash') t = U('mkGachaCash', { n: mt(f.cash | 0) });
    else if (f.cell === 'heal') t = U('mkGachaHeal');
    else if (f.cell === 'relic' && f.relic) { var x = null; try { x = H.relicOf(f.relic); } catch (_) {} t = U('mkGachaRelic') + (x ? '「' + x.name + '」' : ''); try { vis = H.relicIcon(f.relic, 28); } catch (_) {} }
    else if (f.cell === 'relic') t = U('mkGachaRelicCash', { n: mt(f.cash | 0) });
    else if (f.cell === 'bump' && f.bump) t = U('mkGachaBump', { pos: f.bump.pos, n: f.bump.atk });
    else if (f.cell === 'ouch') t = U('mkGachaOuch', { n: Math.abs(f.hp | 0) });
    return '<div class="st-gres c-' + esc(f.cell) + '">' + (vis ? '<span class="v">' + vis + '</span>' : '') + '<span class="t">' + esc(t) + '</span></div>';
  }
  function gachaHTML(cur, gs, hold) {
    var g = cur.gacha, i = g.n | 0, n = (g.price || []).length, pr = (g.price || [])[i] | 0, r = run();
    var egg = GACHA_EGG[Math.floor((E().hash01 ? E().hash01(cur.key + '#egg#' + Math.max(0, (gs.eff ? gs.eff.gacha : i))) : 0) * GACHA_EGG.length) % GACHA_EGG.length];
    var MKI = W.DipPropsO && W.DipPropsO.GACHA_ROWS, px = ''; try { px = MKI ? H.pix(MKI, 56, 'st-gpx') : ''; } catch (_) {}
    var showEgg = gs.phase === 'egg';
    var m = '<div class="st-gm' + (gs.phase === 'spin' ? ' spin' : '') + '">' + (px || '<span class="st-gbox" aria-hidden="true"></span>') + (gs.phase === 'spin' ? '<i class="st-coin" aria-hidden="true"></i>' : '') +
      (showEgg ? '<button type="button" class="st-egg e-' + egg + (gs.fresh && !A().rm ? ' drop' : '') + '" data-a="egg" aria-label="' + esc(U('mkEggTap')) + '"><i aria-hidden="true"></i></button>' : '') + '</div>';
    var ctl;
    if (gs.phase === 'spin' || gs.phase === 'egg') ctl = '<p class="st-gtip on">' + esc(gs.phase === 'egg' ? U('mkEggTap') : '…') + '</p>';
    else {
      ctl = gs.phase === 'open' ? gachaResHTML(gs.eff) : '';
      if (hold || i >= n) ctl += hold ? '' : '<p class="st-gtip">' + esc(U('mkGachaMax')) + '</p>';
      else ctl += '<button type="button" class="lb-btn pri st-lever" data-a="gacha"' + (r.money < pr ? ' disabled' : '') + '><span class="kn" aria-hidden="true"></span><span>' + esc(U('mkGacha', { n: mt(pr) })) + '</span></button>' +
        '<p class="st-gtip">' + esc(r.money < pr ? noMoney() : i > 0 ? U('mkGachaLeft', { n: n - i }) : U('mkGachaTap')) + '</p>';
    }
    return m + '<div class="st-gc">' + ctl + '</div>';
  }
  function gearGachaBody(cur, hold) {
    var gs = gachaUi(cur), wait = gs.phase === 'spin' || gs.phase === 'egg';
    if (hold) return '<div class="st-gacha solo">' + gachaHTML(cur, gs, true) + '</div>' + (wait ? '' : footHTML([holdBtn()]));
    var rl = relicGrid(cur.relics || [], 'data-relic', ST().gearPrice || 3000);
    if (cur.bought && rl) rl = rl.replace(/<button type="button" class="lb-btn pri" data-relic=/g, '<button type="button" class="lb-btn pri" disabled data-relic=');   // 一次進攤只買一件（引擎 relicOnce）
    return '<div class="st-gear2"><div class="st-gl">' + (rl || '<p class="note">—</p>') + '</div><div class="st-gacha">' + gachaHTML(cur, gs, false) + '</div></div>' + footHTML([btn('data-a="back"', U('mkBack'), { disabled: wait })]);
  }
  // 點搖桿：投幣（扣錢那一下）→ 機器晃 → 蛋掉出來（等點）
  function gachaSpin(cur) {
    var gs = gachaUi(cur); if (gs.phase === 'spin' || gs.phase === 'egg') return;
    mkAct({ type: 'stallAct', act: 'gacha' });
  }
  function eggOpen() {
    var gs = S && S.gacha; if (!gs || gs.phase !== 'egg') return;
    gs.phase = 'open'; gs.fresh = false;
    var f = gs.eff || {}, r = run(), hide = S.moneyHide | 0;
    sfx(f.cell === 'ouch' ? 'hurt' : f.cell === 'gold' || f.cell === 'relic' ? 'ding' : 'pocket');
    S.moneyHide = 0;
    if (hide && r) { try { H.cashRise(r.money - hide, r.money); } catch (e) { console.error(e); } }
    try { H.refresh(); } catch (_) {}
    S.gFx = { n: ((S.gFx || {}).n | 0) + 1, kind: 'open', cell: f.cell };
    mkRenderStation();
  }

  // ---------------- 算命攤心情題（店主 11-23）：題庫在 repo 根目錄（主站心情選歌）；進算命攤才抓、快取；抓不到＝照 I-3a
  var MOOD = { off: false, st: 0, quiz: null, bank: null, p: null, pb: null };
  function moodGet(u) { return fetch(u).then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); }); }
  function moodLoad() {
    if (MOOD.off) return Promise.resolve(null);
    if (MOOD.p) return MOOD.p;
    MOOD.st = 1;
    var to = new Promise(function (_, rej) { setTimeout(function () { rej(new Error('timeout')); }, 5000); });
    MOOD.p = Promise.race([moodGet('../mood-quiz.json'), to]).then(function (q) {
      if (!(E().moodPrep && E().moodPrep(q) && E().moodPrep(q).rows.length)) throw new Error('quiz shape');
      MOOD.quiz = q; MOOD.st = 2;
      MOOD.pb = moodGet('../mood-bank.json').then(function (b) { MOOD.bank = b && b.passages && typeof b.passages === 'object' ? b : null; return MOOD.bank; })
        .catch(function (e) { console.warn('[stalls] mood-bank', e && e.message); return null; });
      return q;
    }).catch(function (e) { console.warn('[stalls] mood-quiz', e && e.message); MOOD.st = -1; return null; });
    return MOOD.p;
  }
  function moodReady() { return !MOOD.off && MOOD.st === 2 && !!MOOD.quiz && !!E().moodAsk; }
  // 問第 i 張（0 起）之前那一題。cur＝null：還沒進攤（打開算命攤之前問第一題；不扣時段）
  function moodAskBody(cur, i) {
    var r = run(), q = null; try { q = E().moodAsk(r, MOOD.quiz, i); } catch (e) { console.error(e); }
    S.moodQ = q || null;
    if (!q) return cur ? fortuneMkBody(cur, false) : '<p class="note">' + esc(U('mkMoodLoad')) + '</p>' + footHTML([backBtn()]);
    var pr = cur ? ((cur.price || [])[i]) | 0 : 0, can = r.money >= pr, h = '';
    if (cur && i > 0) { var sl = (cur.slips || [])[i - 1]; if (sl) h += '<div class="st-slips one">' + slipHTML(sl, S.fresh === i - 1) + '</div>'; }
    var lead = !cur ? U('mkMoodAsk') : pr > 0 ? U('mkMoodFlip', { i: i + 1, n: mt(pr) }) : U('mkMoodFlipFree', { i: i + 1 });
    h += '<div class="st-mood"><p class="ld"><span>' + esc(lead) + '</span>' + (i === 2 ? '<small class="warn">' + esc(U('mkOmenWarn')) + '</small>' : '') + '</p><p class="qq">' + esc(q.q) + '</p>' +
      '<div class="st-mopts">' + (q.o || []).map(function (t, k) { return '<button type="button" class="lb-btn st-mo" data-mo="' + k + '"' + (can ? '' : ' disabled') + '>' + esc(t) + '</button>'; }).join('') + '</div>' +
      (can ? '' : '<p class="note warn">' + esc(noMoney()) + '</p>') + '</div>';
    return h + footHTML([cur ? btn('data-a="back"', U('fortuneOk')) : backBtn()]);
  }
  // 點算命攤格子：題庫好了＝先問第一題（還沒進攤）；在抓＝面板先寫「阿姨在洗籤」，抓到就換成題目；抓不到／?mood=0＝照 I-3a 直接打開（翻第一張）
  function moodOpen() {
    if (MOOD.off || MOOD.st < 0) return false;
    S.ask = { kind: 'fortune', key: 'ask' }; S.phase = 'station'; S.cur = null; S.kind = 'fortune'; S.moodQ = null;
    lightUp([isleOf('fortune')].filter(Boolean));
    mkRenderStation(true);
    if (!moodReady()) {
      var tok = S;
      moodLoad().then(function () {
        if (S !== tok || !S.ask) return;
        if (moodReady()) return mkRenderStation();
        S.ask = null; closeStation(); S.phase = 'grid'; enterTile('fortune', { direct: true });   // 抓不到：照 I-3a
      });
    }
    return true;
  }
  function moodPick(k) {
    var q = S.moodQ; if (!q || S.busy) return;
    var ans = { q: q.id, o: k };
    sfx('tick');
    if (S.ask) { S.ask = null; S.moodQ = null; S.phase = 'grid'; S.keepSheet = true; return enterTile('fortune', { direct: true, ans: ans }); }
    S.moodQ = null;
    mkAct({ type: 'stallAct', act: 'flip', ans: ans });
  }
  // 三題答完（翻滿三張）：心情＋一張專輯＋一段原文（每一場算命攤算一次、存在 S.moodR；那張進想要清單只加一次）
  function moodRes(cur) {
    if (!moodReady()) return null;
    if (S.moodR && S.moodR.key === cur.key) return S.moodR.res ? S.moodR : null;
    if (!MOOD.bank) {
      if (MOOD.pb && !S.moodWait) { S.moodWait = true; var tok = S; MOOD.pb.then(function () { if (S === tok && S.hold === cur && MOOD.bank) mkRenderStation(); }); }
      return null;
    }
    var r = run(), res = null;
    try { res = E().moodResult(r, C(), MOOD.quiz, MOOD.bank, { owned: function (id) { try { return !!H.owned(id); } catch (_) { return false; } }, want: (H.wantList ? H.wantList() : []) }); } catch (e) { console.error(e); }
    var w = null; if (res && res.id && card(res.id)) { try { w = H.want ? H.want(res.id) : null; } catch (e) { console.error(e); } }
    S.moodR = { key: cur.key, res: res && res.id && card(res.id) ? res : null, want: w };
    return S.moodR.res ? S.moodR : null;
  }
  function moodResultBody(cur, M) {
    var R = M.res, c = card(R.id), sl = (cur.slips || [])[2];
    var wt = M.want === 'had' ? U('mkMoodWantHad') : M.want === 'full' ? U('mkMoodWantFull') : M.want === 'add' ? U('mkMoodWant') : '';
    var h = sl ? '<div class="st-slips one cmp">' + slipHTML(sl, S.fresh === 2) + '</div>' : '';   // 第 3 張那一行收成一行（整句在來客條頭像上看得到）
    h += '<div class="st-moodr"><p class="is">' + esc(U('mkMoodIs', { name: R.name })) + '</p><div class="pk">' + H.coverHTML(c, { badge: false }) +
      '<span class="tx"><b>' + esc(U('mkMoodPick', { album: c.album })) + '</b>' + (wt ? '<small>' + esc(wt) + '</small>' : '') + '</span></div><p class="ps">' + esc(R.passage) + '</p></div>';
    var leave = mkNothingLeft();
    return h + footHTML([btn(leave ? 'data-a="notedLeave"' : 'data-a="noted"', leave ? U('mkNotedLeave') : U('fortuneOk'), { pri: true })]);
  }

  function isle() {
    var p = P(); if (!p || p.mode !== 'market' || !Array.isArray(p.tiles)) return [];
    return p.tiles.map(function (k, i) { return { kind: k, hot: ISLE[i % ISLE.length], went: !!(p.went || {})[k] }; });
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
    configure: function (host) {
      H = host || null;
      // 第 I 波 I-3a 施工期間：?market=1＝市集模式試玩、?market=0＝C 波二選一（＝sim --market on|off；只改 content 的開關，之後一切照 pending.mode）
      try { var m = /[?&]market=([01])(?:&|$)/.exec(W.location.search || ''), st = H && H.content && H.content.waveC && H.content.waveC.stall; if (m && st) st.mode = m[1] === '1' ? 'market' : 'pick'; } catch (_) {}
      // 第 I 波 I-3b 施工期間：?newstalls=1＝唱片醫生、熱美式／高粱、轉蛋機一起開（＝sim --newstalls on；只改 content 的開關 fair.newStalls）；?newstalls=0＝關。
      //   ?mood=0＝算命攤不接心情題庫（＝題庫抓不到：照 I-3a 翻籤；e2e 測 I-3a 那條路用）
      try { var ns = /[?&]newstalls=([01])(?:&|$)/.exec(W.location.search || ''), fa = H && H.content && H.content.waveC && H.content.waveC.stall && H.content.waveC.stall.fair; if (ns && fa) fa.newStalls = ns[1] === '1'; } catch (_) {}
      try { if (/[?&]mood=0(?:&|$)/.test(W.location.search || '')) MOOD.off = true; } catch (_) {}
    },
    night: night, busy: busy, state: state, cpPick: cpPick, draft: draft, isle: isle, station: station,
    // 測試：底部那塊的鈕（e2e 用真點；這裡只給測試讀狀態）
    _icons: ICON
  };
})();
