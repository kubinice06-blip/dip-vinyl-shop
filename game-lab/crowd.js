/* game-lab/crowd.js — 活店的導演（SPEC-H 棒 4；§3 出現時機、§4 路線、§10 效能）：熟客與路人推門進來、在不同停留點翻挖（換箱、停下來挖、偶爾試聽、
 *   拿著翻到的那張去櫃檯前結帳）、推門離開；佔位與讓位、門事件保證、借過。純函式（誰進門、停哪一格、路上擋到誰）在 crowd-core.js（DipCrowdCore）。
 *   點人聊天（§5，棒 4 後半）：configure 的 host.chat 有給才加跟著人走的熱點（沒有聊天的熱點只會吃掉封面那一下）；泡泡、停多久、一次幾段、說話的人停下來在這裡，
 *   挑哪一句與存檔（save.regulars）在 ui.js（host.chat）。第一次的提示（§3.2）也在這裡排時機（host.hint／quiet）。
 *
 * 用法（ui.js）：
 *   DipLabCrowd.configure({ stage()→Stage, content:C, speed()→倍速, paused()→bool, seqTag()→'seedKey#runNo#pos'|null, titleTag()→'title#…',
 *                           ownerFree()→bool, shelfCard(binKey, u)→卡 id|null, reduced()→bool, on:bool,
 *                           chat?(who, info)→{bubbles:[{text,quote?,src?}], cat}|Promise, chatEnd?(who), fastK()→?fast=1 的 4｜1, hint?(kind, dry), quiet?()→bool })
 *   start('live'|'calm'|'still', o?)   o.duel：對決畫面（開打清對戰區＋鏡頭收完還被切頭的先藏）；o.reserve：[stop id]（攤位：c-pay 給站主）
 *   stop(o?)                           o.keep：藏起來、記住誰在哪（去你家／台北，舞台重掛回來照記憶放回去）；沒給＝店裡清空
 *   redraw() ; pause(on) ; yield([x,y]|spot) ; clearSpot([x,y]|spot, o?) ; clearRoute(points, o?) ; clearDuel() → Promise
 *   state() ; clear() ; doorLog()
 *   clearRoute 的 o：{ who:'f'|'o'|'p'（這個人走到路線終點前，這條路上不准有人停）, door:true（主線客人推門：門晃一下＋到站＋1.2 秒前門不給路人用）}
 *   聊天：talk(who, hot)＝點人 ; ownerTalk(bubbles?)＝老闆講一段 ; chatClose() ; chatTill()→Date.now 基準 ; chatState() ; chatNext()
 *   第二階段（切磋）的介面先留空殼：handOff、takeBack、encActive、encDecline（見 build2/CROWD-API.md）
 *
 * 規則（§10）：自己一個 setInterval 250 ms＋遊戲時鐘（真時間×speed()，暫停不走）；不用 UI.timers／later()（ui.js 換畫面會清掉）；不另開 rAF；
 *   document.hidden 時整個停；走動槽 w1 w2 w3（不准 p／o／f／q 開頭，stage spotName 會當別名組）；⏩ 不快轉走動槽（stage finishAll 只收 p o f q1 q2）。
 *   亂數不碰 Math.random 與 run.rng：一律 DipCrowdCore.hash01(標籤)（同一趟同一位、重新整理後進來的人與順序一樣；時間點照牆上時鐘）。
 *   只掛 window.DipLabCrowd。
 */
(function () {
  'use strict';
  var W = window, D = document;
  var SLOTS = ['w1', 'w2', 'w3'];
  var TICK = 250;
  var HEAD = 48;                       // 人的高度（美術格；clearDuel 判「頭被對決橫條上緣切到」：y−48 < T < y）
  var DEF = {                          // 附錄 A（content.js C.crowd 有就用那份）
    max: 3, startInside: [[0, 0.15], [1, 0.60], [2, 0.25]], doorEvent: { after: [0, 1500], earlyLeave: 0.6 },
    gap: [16000, 28000], refill: [6000, 12000], doorLock: { afterGuest: 1200, afterSwing: 3000, swing: 1100 },
    recent: 60000, stops: { n: [[1, 15], [2, 50], [3, 35]], dig: [9000, 16000], listen: [12000, 20000], pay: [3000, 5000] },
    likeW: 3, otherSide: 2, payP: 0.4, speed: 30, yieldSpeed: 48, pass: { near: 30, resume: 800 },
    emote: { after: [4000, 8000], record: 0.18, note: 0.08, listenNote: 0.3 }, hot: { rel: [-12, -46, 24, 28], minY: 150 },
    title: { max: 1, minY: 189, move: [20000, 40000] }, warm: { batchMs: 8, maxWait: 3000 },
    talk: { beatsPerVisit: 3, passerBeats: 1, busyMute: 12000, extend: 4000, resume: 2000 },
    bubble: { base: 3000, perChar: 200, min: 6000, max: 12000, holdMore: 20000 }
  };
  var PASSER_VOICE = { freq: 523, wave: 'triangle' };   // 路人共用一組嗶聲（§5.2）
  var SPARK_MS = 4000;                 // 第一次提示：那位熟客頭上閃星 4 秒（§3.2）
  var GUAR_DEADLINE = 10000;           // 門事件保證：回到來客畫面 10 秒內（遊戲時間）一定看得到推門進或出
  var GUAR_GIVEUP = 30000;
  // 路線避人（build2 審查：走道只有一人寬，舊路線直接從翻箱的人身上穿過去、兩個走路的人在後走道與門口對穿）
  var BODY = [20, 14];                 // 身體疊在一起：|dx|<20 且 |dy|<14（§4.3）
  var LOW_Y = 252;                     // 走動的人 y≤250（LC2）：路線不准繞到中島下面（唱盤區）
  var WAIT_NUDGE = 4000;               // 等路等了 4 秒（遊戲 ms）還被停著的人擋住：請擋路的熟客收尾（停留縮到 0.5 秒）
  var WAIT_MAX = 20000;                // 等路最多 20 秒，過了照走（保險；正常不會發生，除非你一直站在右排走道上）
  var SIDE_X = { left: 62, right: 226 };   // 借過：左排往走道外側讓一步（x62，試聽桌、NEW 箱前的地板）；右排下面兩格往櫃檯前讓（x226：離你走的路 ≥20、離 c-pay ≥38）

  var H = {};                          // host
  var S = fresh();
  function fresh() {
    return { mode: 'off', t: 0, last: 0, iv: 0, slots: {}, k: 0, tag: '', door: { swing: -1e9, guestAt: -1e9 }, nextEntry: null, waitRoom: false,
      guarantee: null, screenAt: 0, left: {}, leftLook: {}, log: [], blocks: [], reserve: {}, blockXY: [], pDest: null, pLast: null, emoteUntil: 0,
      manualPause: false, kept: false, stopsCache: null, hideAt: 0, cut: null, warm: null, warmAt: 0, fresh: true,
      navL: null, navObs: null, navNodes: null, rcache: {}, rcacheN: 0, last3: {}, moving: {} };
  }

  // ------------------------------------------------------------------ 小工具
  function core() { return W.DipCrowdCore || null; }
  function st() { try { return typeof H.stage === 'function' ? H.stage() : null; } catch (_) { return null; } }
  function C() { return H.content || W.DipLabContent || {}; }
  function cfg() { var c = C().crowd || {}; return c; }
  function num(v, d) { return typeof v === 'number' && isFinite(v) ? v : d; }
  function cf(k) { var c = cfg(); return c[k] != null ? c[k] : DEF[k]; }
  function cf2(k, k2) { var a = cf(k) || {}; return a[k2] != null ? a[k2] : (DEF[k] || {})[k2]; }
  function speed() { try { var k = typeof H.speed === 'function' ? H.speed() : 1; return k > 0 ? k : 1; } catch (_) { return 1; } }
  function reduced() {
    try { if (typeof H.reduced === 'function') return !!H.reduced(); } catch (_) {}
    try { return !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; }
  }
  function h01(s) { var K = core(); return K ? K.hash01(s) : 0.5; }
  function range(ab, u) { var K = core(); return K ? K.pickRange(ab, u) : (Array.isArray(ab) ? ab[0] : +ab || 0); }
  function enabled() { return !!H.on && !!core() && !!st(); }
  function maxN() { return S.mode === 'calm' ? Math.max(0, num(cf2('title', 'max'), 1)) : (reduced() ? 1 : Math.max(0, num(cf('max'), 3))); }
  function hostPaused() {
    if (S.manualPause || D.hidden) return true;
    try { return typeof H.paused === 'function' ? !!H.paused() : false; } catch (_) { return false; }
  }
  function xyOf(k) {
    if (k == null) return null;
    if (Array.isArray(k)) return [+k[0], +k[1]];
    if (typeof k === 'object' && k.x != null) return [k.x, k.y];
    var s = stopById(k); if (s) return [s.x, s.y];
    var t = st(); if (!t) return null;
    var sp = t.spot && t.spot(k); if (sp) return [sp[0], sp[1]];
    var a = t.pos && t.pos(k); return a ? [a.x, a.y] : null;
  }
  function near(a, b, d) { return a && b && Math.abs(a[0] - b[0]) <= (d || 1.5) && Math.abs(a[1] - b[1]) <= (d || 1.5); }
  function clash(a, b) { var K = core(); return !!(K && a && b && K.clash(a, b)); }
  function onRoute(pts, xy) { var K = core(); return !!(K && pts && xy && K.onRoute(pts, xy)); }
  function segDist(p, a, b) {
    var dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy, t = L2 ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2 : 0;
    t = Math.max(0, Math.min(1, t)); var x = a[0] + dx * t - p[0], y = a[1] + dy * t - p[1];
    return Math.sqrt(x * x + y * y);
  }
  function pathLen(pts) { var n = 0; for (var i = 1; i < (pts || []).length; i++) n += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return n; }
  function walkK() { var t = st(); return (t && t.layout && t.layout.walkK) || 2; }
  function etaMs(pts, spd) { return pathLen(pts) / (spd * walkK()) * 1000; }   // 遊戲時間（shop 走路也×speed()，兩邊抵掉）

  // ------------------------------------------------------------------ 停留點（dip.json crowd.stops，Stage.crowdStops()）
  function stops() {
    if (S.stopsCache) return S.stopsCache;
    var t = st(); var a = t && typeof t.crowdStops === 'function' ? t.crowdStops() : [];
    S.stopsCache = Array.isArray(a) ? a : [];
    return S.stopsCache;
  }
  function stopById(id) { var a = S.stopsCache || stops(); for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i]; return null; }
  function keyOf(s) { return s.at ? s.at : [s.x, s.y]; }               // 試聽桌、櫃檯前走 spot 名（到站朝向照 layout：listen＝背面）；箱子走站位座標
  function sideX(x) { return x < 140 ? 'left' : 'right'; }
  function via() { var t = st(); return (t && t.crowdVia && t.crowdVia()) || { left: 'in', right: 'leaving', cross: ['mid', 'leaving'] }; }
  function doorKey() { var t = st(), c = t && t.crowdConf && t.crowdConf(); return (c && c.door) || 'door'; }

  // ------------------------------------------------------------------ 走動槽
  function slotOn() { return SLOTS.map(function (id) { return S.slots[id]; }).filter(function (s) { return s && s.on; }); }
  function inside() { return slotOn().filter(function (s) { return !s.hiddenDuel; }); }
  function count() { return slotOn().length; }
  function freeSlot() { for (var i = 0; i < SLOTS.length; i++) { var s = S.slots[SLOTS[i]]; if (!s || !s.on) return SLOTS[i]; } return null; }
  function lookOf(who, li) {
    var R = C().regulars || {};
    if (who && R[who]) return R[who].look;
    var P = cfg().passers || []; return P[li] || P[0] || 'girl';
  }
  function posOf(sl) { var t = st(), a = t && t.pos(sl.id); return a && !a.hidden ? [a.x, a.y] : null; }
  // 他現在「佔」的位置：站著＝那一格；走路中＝要去的那一格（到了就站在那裡）；被點住聊天（halted）＝現在站的地方（要去的那格另外算，occupiedFor）
  function holdXY(sl) { return sl.walking && sl.dest ? sl.dest : (posOf(sl) || sl.dest); }

  function hotOn() { return typeof H.chat === 'function'; }   // ui.js 有給聊天（host.chat）才加跟著人走的熱點（沒有 talk 的熱點只會吃掉封面那一下）
  function addHot(sl) {
    if (!hotOn()) return;
    var t = st(); if (!t || !t.addHot) return;
    var hot = cf('hot') || DEF.hot, s = sl.at && stopById(sl.at), R = C().regulars || {};
    t.addHot({ id: 'cw-' + sl.id, follow: sl.id, rel: (hot.rel || DEF.hot.rel).slice(), action: 'talk:' + (sl.who || 'passer'), label: sl.who && R[sl.who] ? R[sl.who].name : ((C().crowdUi || {}).passer || '客人'),
      pri: s && s.hotPri ? s.hotPri : 2, noSparkle: true, minY: num(hot.minY, 150), noLabel: true });
  }
  function dropHot(sl) { var t = st(); if (t && t.removeHot) t.removeHot('cw-' + sl.id); }

  // 走：token 擋掉舊的 resolve（put／新的 walk 都會 resolve 前一個 walk Promise）
  //   pts＝這一趟的點列（planRoute 算的；別人挑路時拿來算「會不會跟他對穿」）；沒給就照舞台的路線
  function walk(sl, keys, spd, onDone, pts) {
    var t = st(); if (!t) return;
    var tok = ++sl.tok, last = keys[keys.length - 1];
    if (S.chat && S.chat.sl === sl) chatEnd(S.chat);           // 被叫去走（讓位、清路、換站）：聊天收掉，不讓泡泡跟著人跑
    sl.talking = false; sl.halted = false; sl.resumeAt = null; sl.side = null; sl.waitT = 0;
    sl.walking = true; sl.dest = xyOf(last); sl.pass = null;
    if (!pts) { try { pts = t.route(sl.id, keys); } catch (_) { pts = null; } }
    sl.path = pts && pts.length ? pts : null;
    t.pose(sl.id, null);
    var pr = null; try { pr = t.walk(sl.id, keys, spd); } catch (e) { console.error(e); }
    face0(sl, sl.path);
    var fin = function () {
      if (sl.tok !== tok || !sl.on) return;
      var p = posOf(sl);
      if (!p || !near(p, sl.dest, 2)) return;            // 半路被接手（put／別的 walk）：不算到站
      sl.walking = false;
      if (onDone) onDone(sl);
    };
    if (pr && typeof pr.then === 'function') pr.then(fin, function () { if (sl.tok === tok && sl.dest) { t.put(sl.id, sl.dest); fin(); } });
    else fin();
  }
  // 出發那一步的朝向（build2 審查：往左上／右上斜著走那段倒退著走）：pose(null) 會把人轉回正面，shop.js faceDir 在 35°–55° 的斜線區間沿用原方向
  //   → 第一段往上（>35°）就先轉背面；往下維持正面；橫走交給 faceDir（側面）
  function face0(sl, pts) {
    var t = st(), sh = t && t.shop, p = posOf(sl); if (!sh || typeof sh.dir !== 'function' || !p || !pts) return;
    for (var i = 0; i < pts.length; i++) {
      var dx = pts[i][0] - p[0], dy = pts[i][1] - p[1];
      if (Math.abs(dx) + Math.abs(dy) < 6) continue;
      if (Math.atan2(Math.abs(dy), Math.abs(dx)) * 180 / Math.PI > 35) { try { sh.dir(sl.id, dy < 0 ? 'back' : 'front'); } catch (_) {} }
      return;
    }
  }
  // 走到一半轉錯面（前一段往下、這一段斜著往上）：每 tick 看實際位移，往上走卻是正面（或往下走卻是背面）就轉過來
  function faceFix(sl) {
    var t = st(), sh = t && t.shop; if (!sh || typeof sh.dir !== 'function') return;
    var a = t.pos(sl.id); if (!a || a.hidden) { S.last3[sl.id] = null; return; }
    var q = S.last3[sl.id]; S.last3[sl.id] = [a.x, a.y];
    if (!q || !sl.walking || sl.halted) return;
    var dx = a.x - q[0], dy = a.y - q[1];
    if (Math.abs(dy) < 2 || Math.abs(dy) < Math.abs(dx) * 0.7) return;
    if (dy < 0 && a.dir === 'front') { try { sh.dir(sl.id, 'back'); } catch (_) {} }
    else if (dy > 0 && a.dir === 'back') { try { sh.dir(sl.id, 'front'); } catch (_) {} }
  }
  function hideSlot(sl) {
    var t = st(); sl.tok++;
    if (S.chat && S.chat.sl === sl) chatEnd(S.chat);
    sl.talking = false; sl.halted = false; sl.resumeAt = null; sl.side = null; sl.walking = false; sl.path = null;
    if (t) { try { t.say(sl.id, null); t.emote(sl.id, null); t.hold(sl.id, null); t.back(sl.id, false); t.pose(sl.id, null); t.hide(sl.id, true); } catch (e) { console.error(e); } }
    dropHot(sl);
  }
  function newSlot(id, who, li, k) {
    return { id: id, on: true, who: who || null, li: li == null ? null : li, kind: who ? 'regular' : 'passer', look: lookOf(who, li), k: k,
      phase: 'walk', at: null, stop: null, dest: null, walking: false, plan: 0, stayLeft: 0, stayTot: 0, stayAt: 0, emAt: null, emDone: false,
      pay: false, holding: null, tok: 0, frozen: false, pass: null, hiddenDuel: false, seed: '', visits: 0,
      // 聊天（§5）：這次來（進門到出門）聊了幾段、講過哪些分類、busy 講過沒；talking＝正在講；halted＝講之前在走路（講完接著走）；resumeAt＝收泡泡後幾時回原本動作
      talkN: 0, cats: [], busySaid: false, talking: false, halted: false, resumeAt: null,
      // 路線（避人）：path＝這一趟的點列；been＝這次來翻過的格（不回頭翻）；side＝借過讓一步中 { stop:[x,y], at, pr }；waitT＝等路等了多久
      path: null, been: [], side: null, waitT: 0 };
  }
  // 正在講、或剛講完還在等 2 秒回原本動作：停留計時、借過、門事件提前出門都不碰他
  function chatting(sl) { return !!(sl && (sl.talking || sl.resumeAt != null)); }

  // ------------------------------------------------------------------ 佔位（§4.3）
  function occupiedFor(sl, extra) {
    var t = st(), out = [];
    slotOn().forEach(function (o) {
      if (o === sl || o.hiddenDuel && !o.dest) return;
      var a = holdXY(o); if (a) out.push(a);
      if (o.walking && o.dest) out.push(o.dest);
      // 被點住聊天的走路客人：他要去的那一格也算佔著（審查 review2 A：聊天時別人挑走同一格，聊完兩人站同一格）
      if (o.halted && o.stop) { var hs = stopById(o.stop); if (hs) out.push([hs.x, hs.y]); }
      if (o.side && o.side.stop) out.push(o.side.stop);                      // 借過讓一步的人：等一下走回原位
    });
    ['p', 'o', 'f'].forEach(function (id) { var a = t && t.pos(id); if (a && !a.hidden && !a.outside && t.has(id)) out.push([a.x, a.y]); });
    if (S.pDest && S.pDest.xy) out.push(S.pDest.xy);
    S.blockXY.forEach(function (b) { out.push(b); });
    return out.concat(extra || []);
  }
  function blocked(stop) { return S.blocks.some(function (b) { return onRoute(b.pts, [stop.x, stop.y]); }); }
  function reservedFor(sl) {
    var r = Object.keys(S.reserve).filter(function (k) { return S.reserve[k]; });
    if (sl && sl.at) r.push(sl.at);
    return r;
  }
  // 挑一格。o：{ side（只挑這一排）, prefer（優先這一排）, avoid(stop)→true 不要, calm, likes, u, extra（多閃開的點）, noShort, noPay, noListen, onlyDig,
  //   fromDoor（剛推門：路線從門口算）, notBeen（這次來翻過的不再回頭翻）, noRoute（不看路上有沒有人：讓位找不到走得通的格才用） }
  //   預設只挑「現在走得過去」的格：路上沒有停著的人、不跟正在走的人對穿（permit）
  function pick(sl, o) {
    o = o || {};
    var K = core(); if (!K) return null;
    var minY = num(cf2('title', 'minY'), 189);
    var from = o.fromDoor ? doorKey() : null;
    var list = stops().filter(function (s) {
      if (o.side && s.side !== o.side) return false;
      if (o.noShort && s.short) return false;
      if (o.noPay && s.kind === 'pay') return false;            // 櫃檯前只有「拿著翻到的那張去結帳」才去（nextMove 的 pay 那條）
      if (o.noListen && s.kind === 'listen') return false;
      if (o.onlyDig && s.kind !== 'dig') return false;
      if (o.calm && (s.y < minY || s.short)) return false;
      return true;
    });
    var avoid = function (s) {
      if (blocked(s) || (o.avoid && o.avoid(s))) return true;
      if (o.notBeen && sl && sl.been && sl.been.indexOf(s.id) >= 0) return true;
      return !o.noRoute && !permit(sl, legsTo(sl, s, o.fromDoor), from);
    };
    var R = C().regulars || {}, likes = { ids: o.likes || (sl && sl.who && R[sl.who] ? R[sl.who].likes : []) || [], likeW: num(cf('likeW'), 3), sideW: num(cf('otherSide'), 2) };
    if (o.prefer) likes.side = o.prefer;
    var id = K.pickStop(list, occupiedFor(sl, o.extra), reservedFor(sl), avoid, likes, o.u == null ? 0.5 : o.u);
    return id ? stopById(id) : null;
  }
  // 第二、第三位優先另一排（權重 2:1）：店裡哪一排人少就偏那一排
  function preferSide(sl) {
    var L = 0, R = 0;
    slotOn().forEach(function (o) { if (o === sl) return; var a = holdXY(o); if (!a) return; if (sideX(a[0]) === 'left') L++; else R++; });
    return L === R ? null : (L < R ? 'left' : 'right');
  }
  // 從現在位置走到某一格：同一排直走；跨排一律走上面（mid／leaving），絕不從中島下面（唱盤區）繞；剛進門＝左排走 in、右排走 leaving
  function legsTo(sl, stop, fromDoor) {
    var V = via(), k = keyOf(stop);
    if (fromDoor) return [stop.side === 'left' ? V.left : V.right, k];
    var p = posOf(sl) || sl.dest || [stop.x, stop.y], from = sideX(p[0]);
    if (from === stop.side) return [k];
    var cross = (V.cross || ['mid', 'leaving']).slice();
    return (from === 'left' ? cross : cross.reverse()).concat([k]);
  }
  function exitLegs(sl) { var V = via(), p = posOf(sl) || sl.dest || [0, 0]; return [sideX(p[0]) === 'left' ? V.left : V.right, doorKey()]; }

  // ------------------------------------------------------------------ 路線避人（build2 審查：每分鐘約一次「鬼穿人」）
  //   左右走道各只有一人寬（右排 x193–212，右邊是櫃檯口袋；左排 x≈54–89），停留點就在走道中線上，舊版換站、結帳、出門照靜態最短路走，
  //   直接從翻箱的人身上穿過；兩個走路的人也會在後走道、門口對穿。現在：
  //   1. 路線的障礙＝家具（navObstacles）＋老闆的口袋（footprints.behind，客人不准進）＋中島下面（y>252）＋每個停著的人的身體框（20×14：
  //      其他停著／被點住聊天的客人、借過讓一步回頭要站回去的那格、沒在走的你／老闆／主線客人、你正要走去的地方）。
  //      先試靜態路線（快取），碰到人才用「家具＋人」重算（nav 點＋人身體框四角當路點；左排會貼著外側 x≈64 繞過去）；
  //   2. 跟正在走的人（其他客人剩下的那段、主線客人／老闆的固定路線剩下那段）身體框會碰到＝現在不走；
  //   3. 走不過去＝等一下（多翻半秒再看）；不穿人。等太久請擋路的熟客收尾（WAIT_NUDGE），再久才照走（WAIT_MAX，保險）。
  function navBase() {
    var t = st(), L = t && t.layout, DS = W.DipShop;
    if (!L || !DS || typeof DS.navObstacles !== 'function' || typeof DS.navClear !== 'function') return null;
    if (S.navL === L && S.navObs) return S.navObs;
    var obs = [];
    try { obs = DS.navObstacles(L).slice(); } catch (_) { return null; }
    try { if (typeof DS.footprints === 'function') DS.footprints(L).forEach(function (f) { if (f.pocket) obs.push(f.pocket.slice()); }); } catch (_) {}
    obs.push([-400, LOW_Y + 1, 1200, 600]);
    S.navL = L; S.navObs = obs; S.rcache = {}; S.rcacheN = 0;
    S.navNodes = (L.nav || []).map(function (n) { return [n[0], n[1]]; }).filter(function (n) { return !inAny(obs, n); });
    return obs;
  }
  function inAny(obs, p) { var DS = W.DipShop; for (var i = 0; i < obs.length; i++) if (DS.inObs(p, obs[i])) return true; return false; }
  function bodyHit(a, b) { return Math.abs(a[0] - b[0]) < BODY[0] && Math.abs(a[1] - b[1]) < BODY[1]; }
  function bodyRect(b) { return [b[0] - BODY[0], b[1] - BODY[1], BODY[0] * 2, BODY[1] * 2]; }
  // 停著的人（路線要繞開的身體）：其他客人（停著、被點住聊天）、借過讓一步要站回去的那格、沒在走的 p／o／f、你正要走去的地方
  function bodiesFor(sl) {
    var t = st(), out = [];
    slotOn().forEach(function (o) {
      if (o === sl || o.hiddenDuel) return;
      if (o.side && o.side.stop) out.push(o.side.stop);
      if (o.walking && !o.halted) return;                         // 走路中的另外算（walkerClash）
      var p = posOf(o); if (p) out.push(p);
    });
    if (t) ['p', 'o', 'f'].forEach(function (id) {
      if (S.moving[id]) return;
      var a = t.pos(id); if (!a || a.hidden || a.outside || !t.has(id)) return;
      out.push([a.x, a.y]);
    });
    if (S.pDest && S.pDest.xy) out.push(S.pDest.xy);
    return out;
  }
  function hitsBodies(pts, bodies) { for (var i = 0; i < bodies.length; i++) if (onRoute(pts, bodies[i])) return true; return false; }
  // 家具＋人：nav 點＋每個人身體框四角（往外 1.5 格）當路點的最短路；走不過去＝null
  function dynRoute(a, b, bodies, base) {
    var DS = W.DipShop, obs = base.concat(bodies.map(bodyRect));
    if (DS.navClear(obs, a, b)) return [b];
    var nodes = (S.navNodes || []).slice(), e = 1.5;
    bodies.forEach(function (q) { var r = bodyRect(q); nodes.push([r[0] - e, r[1] - e], [r[0] + r[2] + e, r[1] - e], [r[0] - e, r[1] + r[3] + e], [r[0] + r[2] + e, r[1] + r[3] + e]); });
    var N = [a].concat(nodes.filter(function (n) { return !inAny(obs, n); }), [b]), n = N.length, dist = [], prev = [], done = [];
    for (var i = 0; i < n; i++) { dist.push(Infinity); prev.push(-1); done.push(false); }
    dist[0] = 0;
    for (;;) {
      var u = -1; for (var j = 0; j < n; j++) if (!done[j] && dist[j] < Infinity && (u < 0 || dist[j] < dist[u])) u = j;
      if (u < 0 || u === n - 1) break; done[u] = true;
      for (var v = 0; v < n; v++) {
        if (done[v] || v === u) continue;
        var d = Math.hypot(N[v][0] - N[u][0], N[v][1] - N[u][1]);
        if (dist[u] + d < dist[v] && DS.navClear(obs, N[u], N[v])) { dist[v] = dist[u] + d; prev[v] = u; }
      }
    }
    if (prev[n - 1] < 0) return null;
    var path = [], c = n - 1; while (c > 0) { path.unshift(N[c]); c = prev[c]; }
    return path;
  }
  function legRoute(a, b, bodies, base) {
    var DS = W.DipShop, t = st(), key = Math.round(a[0]) + ',' + Math.round(a[1]) + '>' + Math.round(b[0]) + ',' + Math.round(b[1]);
    var r = S.rcache[key];
    if (r === undefined) {
      if (++S.rcacheN > 400) { S.rcache = {}; S.rcacheN = 1; }      // 起點多半是停留點；走到一半被叫住的那種點很少，滿了就整個重來
      r = DS.navRoute(t.layout, a, b, base); S.rcache[key] = r;
    }
    if (r && (!bodies.length || !hitsBodies([a].concat(r), bodies))) return r;
    return bodies.length ? dynRoute(a, b, bodies, base) : null;
  }
  // 算一趟路：legs＝[spot 名｜[x,y]…]（照 legsTo／exitLegs 的 via）→ { keys（給 Stage.walk：中間是點、每一段最後一個照原本的名字，到站朝向才對）, pts } | null
  function planRoute(sl, legs, from) {
    var t = st(), base = navBase(); if (!t || !base) return null;
    var cur = from != null ? xyOf(from) : (posOf(sl) || sl.dest); if (!cur) return null;
    cur = [cur[0], cur[1]];
    var bodies = bodiesFor(sl).filter(function (b) { return !bodyHit(b, cur); });   // 已經貼著自己的（剛被擺到旁邊）不算：讓他走得開
    var keys = [], pts = [cur.slice()];
    for (var i = 0; i < legs.length; i++) {
      var k = legs[i], B = xyOf(k); if (!B) return null;
      var r = legRoute(cur, B, bodies, base); if (!r) return null;
      for (var j = 0; j < r.length; j++) { var q = r[j]; keys.push(j === r.length - 1 ? k : [q[0], q[1]]); pts.push([q[0], q[1]]); }
      cur = [B[0], B[1]];
    }
    return { keys: keys, pts: pts };
  }
  function samplePts(pts, step) {
    var out = [];
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(d / step));
      for (var k = (i === 1 ? 0 : 1); k <= n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
    }
    return out;
  }
  // 從現在位置起，這條點列還沒走的那段
  function restOf(P, p) {
    if (!P || P.length < 2) return p ? [p] : [];
    var bi = 1, bd = Infinity;
    for (var i = 1; i < P.length; i++) { var d = segDist(p, P[i - 1], P[i]); if (d < bd - 0.01) { bd = d; bi = i; } }
    return [p].concat(P.slice(bi));
  }
  // 正在走的人（其他客人；主線客人、老闆、你的固定路線）剩下那段：我這趟的身體框碰得到＝現在不走
  function walkerClash(sl, pts) {
    var t = st(), others = [];
    slotOn().forEach(function (o) {
      if (o === sl || !o.walking || o.halted || o.hiddenDuel) return;
      var p = posOf(o); if (!p) return;
      others.push(restOf(o.path || [p, o.dest || p], p));
    });
    S.blocks.forEach(function (b) { var a = t && t.pos(b.who); if (a && !a.hidden && !a.outside) others.push(restOf(b.pts, [a.x, a.y])); });
    if (!others.length) return false;
    var sm = samplePts(pts, 4);
    for (var i = 0; i < others.length; i++) for (var j = 0; j < sm.length; j++) if (onRoute(others[i], sm[j])) return true;
    return false;
  }
  // 這一趟現在能不能走：路上沒有停著的人、不跟正在走的人對穿 → { keys, pts } | null
  function permit(sl, legs, from) {
    if (!sl) return null;
    var r = planRoute(sl, legs, from); if (!r) return null;
    return walkerClash(sl, r.pts) ? null : r;
  }
  // 走不通時照舊（讓位要快：寧可擦身；或等太久的保險）
  function rawPlan(sl, legs, from) {
    var t = st(), pts = null;
    try { pts = from != null ? t.route(from, legs) : t.route(sl.id, legs); } catch (_) { pts = null; }
    return { keys: legs, pts: pts && pts.length ? pts : null };
  }
  // 等路：多翻半秒再看；等了 WAIT_NUDGE 請擋路的熟客收尾；等滿 WAIT_MAX 回 true（呼叫端照走）
  function waitRoute(sl, legs) {
    sl.stayLeft = 500;
    sl.waitT = (sl.waitT || 0) + 500;
    if (sl.waitT >= WAIT_NUDGE && legs) nudge(sl, legs);
    return sl.waitT >= WAIT_MAX;
  }
  function nudge(sl, legs) {
    var pl = planRoute(sl, legs, null);
    var r = rawPlan(sl, legs).pts; if (!r) return;
    slotOn().forEach(function (o) {
      if (o === sl || o.phase !== 'stay' || o.walking || o.frozen || o.hiddenDuel || chatting(o) || o.side) return;
      var p = posOf(o); if (!p || !onRoute(r, p)) return;
      if (!pl) o.stayLeft = Math.min(o.stayLeft, 500);
    });
  }

  // ------------------------------------------------------------------ 到站、停留
  function durOf(stop, u) {
    var T = cf('stops') || DEF.stops;
    return range(stop.kind === 'listen' ? (T.listen || DEF.stops.listen) : stop.kind === 'pay' ? (T.pay || DEF.stops.pay) : (T.dig || DEF.stops.dig), u);
  }
  function stand(sl) {
    var t = st(), s = stopById(sl.at); if (!t || !s) return;
    if (sl.talking) { addHot(sl); return; }                    // 正在講：維持說話的樣子（講完 2 秒後 resume 再擺回去）
    if (sl.side) { t.pose(sl.id, null); addHot(sl); return; }  // 借過讓一步中：站在旁邊等你過去（passCheck 帶他走回原位）
    t.pose(sl.id, null);
    if (s.kind === 'listen') {
      t.back(sl.id, true);                                     // 試聽桌：背對鏡頭、戴桌上的耳機（§4.1；pose/back(false) 會把 shop 到站排好的背面清掉，這裡直接設背面）
    } else if (s.kind === 'pay') {
      t.back(sl.id, true);
      if (sl.holding) t.hold(sl.id, { sleeve: sl.holding });
      if (!sl.frozen && ownerFree()) t.pose('o', 'busy', Math.max(1200, sl.stayLeft || 1200));
    } else {
      t.back(sl.id, false);
      if (s.kind === 'dig' || s.pose === 'dig') t.pose(sl.id, 'dig');
    }
    addHot(sl);
  }
  function arrive(sl, setStay) {
    var s = stopById(sl.stop); if (!s) return leave(sl, null, true);
    sl.at = s.id; sl.phase = 'stay'; sl.stayAt = S.t; sl.emDone = false; sl.visits++; sl.waitT = 0;
    if (sl.been.indexOf(s.id) < 0) sl.been.push(s.id);
    if (setStay !== false) { sl.stayTot = durOf(s, h01(sl.seed + '#dur#' + sl.visits)); sl.stayLeft = sl.stayTot; }
    sl.emAt = range(cf2('emote', 'after') || DEF.emote.after, h01(sl.seed + '#em#' + sl.visits));
    stand(sl);
    sideCheck(sl);
  }
  // 剛走到的這格就在你正在走的路上（被請讓位、你走路時他剛好到站）：馬上讓一步
  function sideCheck(sl) {
    var d = S.pDest, t = st(); if (!d || !d.pr || !t || sl.side) return;
    var a = t.pos('p'); if (!a || a.hidden) return;
    var me = posOf(sl); if (!me || clash(me, d.xy)) return;
    if (onRoute(restOf(d.pr, [a.x, a.y]), me)) sideStep(sl, d.pr, d.xy);
  }
  // 走去一格 → true；路上有人擋著（permit 不過）→ false、人不動（o.force：照走；o.plan：已經算好的路）
  function goStop(sl, stop, o) {
    o = o || {};
    var t = st(); if (!t) return false;
    var legs = legsTo(sl, stop, o.fromDoor), from = o.fromDoor ? doorKey() : null;
    var plan = o.plan || permit(sl, legs, from);
    if (!plan) { if (!o.force) return false; plan = rawPlan(sl, legs, from); }
    t.back(sl.id, false);
    if (!o.keepHold && sl.holding && stop.kind !== 'pay') { t.hold(sl.id, null); sl.holding = null; }
    if (sl.holding && stop.kind === 'pay') t.hold(sl.id, { sleeve: sl.holding, carry: true });   // 隨手拿著走（不強迫正面，走路照轉向）
    sl.at = null; sl.stop = stop.id; sl.phase = 'walk';
    walk(sl, plan.keys, o.spd || num(cf('speed'), 30), function () { arrive(sl, o.keepStay ? false : true); if (o.keepStay) { sl.stayTot = Math.max(sl.stayTot, sl.stayLeft); } }, plan.pts);
    return true;
  }
  // 出門 → true；路上有人擋著、或跟正在走的人對穿 → false、人不動（force：照走）
  function leave(sl, spd, force) {
    var t = st(); if (!t || !sl.on) return false;
    if (S.mode === 'calm') { hideSlot(sl); sl.on = false; return true; }   // 標題回訪不用門（不會走到這裡；保險）
    var legs = exitLegs(sl), plan = permit(sl, legs);
    if (!plan) { if (!force) return false; plan = rawPlan(sl, legs); }
    t.back(sl.id, false); if (sl.holding) { t.hold(sl.id, null); sl.holding = null; }
    sl.at = null; sl.stop = null; sl.phase = 'out'; sl.plan = 0;
    walk(sl, plan.keys, spd || num(cf('speed'), 30), function () { doorOut(sl); }, plan.pts);
    return true;
  }
  function doorOut(sl) {
    var t = st(); if (!t) return;
    try { t.door('swing', { quiet: true }); } catch (e) { console.error(e); }   // 路人進出不響鈴（鈴只留給主線客人與切磋邀請者）
    hideSlot(sl); sl.on = false; sl.phase = 'gone';
    if (sl.who) S.left[sl.who] = S.t; else if (sl.li != null) S.leftLook[sl.li] = S.t;
    S.door.swing = S.t;
    logDoor('out', sl);
    var refill = S.t + range(cf('refill'), h01(S.tag + '#refill#' + S.k));
    if (S.waitRoom && count() < maxN()) { S.waitRoom = false; S.nextEntry = refill; }
    else if (!count() && S.mode === 'live') S.nextEntry = S.nextEntry == null ? refill : Math.min(S.nextEntry, refill);   // 店裡走空了：不等滿 16–28 秒，6–12 秒就有人進來
  }
  function logDoor(kind, sl) {
    S.log.push({ t: Date.now(), g: Math.round(S.t), kind: kind, slot: sl.id, who: sl.who || ('passer' + sl.li), mode: S.mode, tag: S.tag });
    if (S.log.length > 400) S.log.splice(0, S.log.length - 400);
    if (S.guarantee && !S.guarantee.done && (kind === 'in' || kind === 'out')) S.guarantee.done = true;
  }

  // ------------------------------------------------------------------ 門
  function doorLocked() {
    var L = cf('doorLock') || DEF.doorLock;
    if (S.t < S.door.swing + num(L.swing, 1100) + num(L.afterSwing, 3000)) return true;
    if (S.t < S.door.guestAt + num(L.afterGuest, 1200)) return true;
    // 有人正走在出門的路上：門等他用完（build2 審查：一人推門進來、一人正好走到門口出去，在門口對穿）
    if (slotOn().some(function (o) { return o.phase === 'out' && o.walking && !o.hiddenDuel; })) return true;
    return S.blocks.some(function (b) { return b.door; });
  }
  // 誰推門進來（§2.5、§4.2）：熟客 65%／路人 35%；已在店裡的、60 秒內離開的不抽
  function seqCtx(boost) {
    var ins = [], looks = [];
    slotOn().forEach(function (o) { if (o.who) ins.push(o.who); else if (o.li != null) looks.push(o.li); });
    var rec = num(cf('recent'), 60000);                          // 路人也一樣：同一套外觀剛走不到 60 秒不再推門進來（不然像同一個人繞一圈又回來）
    Object.keys(S.leftLook).forEach(function (li) { if (S.t - S.leftLook[li] < rec) looks.push(+li); });
    return { inside: ins, left: S.left, now: S.t, looks: looks, boost: boost || {} };
  }
  function enter(o) {
    o = o || {};
    var K = core(), t = st(); if (!K || !t) return false;
    if (count() >= maxN()) return false;
    var id = freeSlot(); if (!id) return false;
    var k = S.k, seq = K.crowdSeq(S.tag, C(), k, seqCtx());
    if (!seq) return false;
    if (!warmReady(seq.kind === 'regular' ? lookOf(seq.who) : seq.look)) return false;
    S.k++;
    var sl = newSlot(id, seq.kind === 'regular' ? seq.who : null, seq.kind === 'regular' ? null : seq.li, k);
    sl.seed = S.tag + '#crowd#' + k;
    var stop = pick(sl, { prefer: preferSide(sl), noPay: true, fromDoor: true, u: h01(sl.seed + '#stop') });   // 從門口走得過去的格（路上沒人、不跟出門的人對穿）
    if (!stop) return false;
    var plan = permit(sl, legsTo(sl, stop, true), doorKey()); if (!plan) return false;
    S.slots[id] = sl;
    var n = core().pickTable((cf('stops') || DEF.stops).n || DEF.stops.n, h01(sl.seed + '#n')) || 2;
    sl.plan = Math.max(0, n - 1); sl.pay = h01(sl.seed + '#pay') < num(cf('payP'), 0.4);
    try { t.door('swing', { quiet: true }); } catch (e) { console.error(e); }
    t.put(id, doorKey(), sl.look); t.hide(id, false); t.sil(id, false); t.back(id, false); t.hold(id, null);
    S.door.swing = S.t;
    logDoor('in', sl);
    addHot(sl);
    goStop(sl, stop, { fromDoor: true, plan: plan });
    S.nextEntry = S.t + range(cf('gap'), h01(S.tag + '#gap#' + k));
    return true;
  }
  // 店裡空的時候一開畫面就在翻的人（不演推門；不放 c-listen；剩下停留從 30–80% 起算）
  function startInside(tag, calm) {
    var K = core(), t = st(); if (!K || !t) return;
    var n = K.pickTable(cf('startInside') || DEF.startInside, h01(tag + '#start')) | 0;
    n = Math.min(n, maxN());
    for (var i = 0; i < n; i++) {
      var id = freeSlot(); if (!id) break;
      var boost = i === 0 && (C().regulars || {}).xiaoyu ? { xiaoyu: 2 } : {};
      var seq = K.crowdSeq(tag + '#start', C(), i, seqCtx(boost)); if (!seq) break;
      var sl = newSlot(id, seq.kind === 'regular' ? seq.who : null, seq.kind === 'regular' ? null : seq.li, -1 - i);
      sl.seed = tag + '#start#' + i;
      var stop = pick(sl, { prefer: preferSide(sl), noListen: true, calm: calm, onlyDig: calm, noRoute: true, u: h01(sl.seed + '#stop') });   // 直接放在那格（不走路）
      if (!stop) break;
      S.slots[id] = sl;
      var nn = K.pickTable((cf('stops') || DEF.stops).n || DEF.stops.n, h01(sl.seed + '#n')) || 2;
      sl.plan = calm ? 0 : Math.max(0, nn - 1); sl.pay = !calm && h01(sl.seed + '#pay') < num(cf('payP'), 0.4);
      if (stop.kind === 'pay') { sl.plan = 0; sl.holding = shelfCard(stop, sl.seed); }
      t.put(id, keyOf(stop), sl.look); t.hide(id, false); t.sil(id, false); t.hold(id, null); t.back(id, false);
      sl.walking = false; sl.dest = [stop.x, stop.y]; sl.stop = stop.id;
      arrive(sl);
      sl.stayLeft = sl.stayTot * (0.3 + 0.5 * h01(sl.seed + '#left'));
      if (calm) sl.stayLeft = sl.stayTot = range(cf2('title', 'move') || DEF.title.move, h01(sl.seed + '#move'));
    }
  }
  function shelfCard(stop, seed) {
    var bin = stop && stop.bin; if (!bin || typeof H.shelfCard !== 'function') return null;
    try { return H.shelfCard(bin, h01(seed + '#card')) || null; } catch (_) { return null; }
  }
  function ownerFree() { try { return typeof H.ownerFree === 'function' ? !!H.ownerFree() : true; } catch (_) { return false; } }

  // ------------------------------------------------------------------ 停留結束 → 換箱／結帳／出門
  function nextMove(sl) {
    if (S.mode === 'calm') return calmMove(sl);
    var cur = sl.at && stopById(sl.at);
    if (cur && cur.kind === 'pay') { if (doorLocked() || !leave(sl)) { if (waitRoute(sl, exitLegs(sl)) && !doorLocked()) leave(sl, null, true); } return; }
    // 剛回到來客畫面、門事件還沒出現（guarantee 還沒做到）：停留到了、10 秒內走得到門的人就出門，不換箱
    //   （換箱要穿過後走道，會把推門進來、出門的路都擋住；build2 驗：一位換箱、一位在櫃檯前等路，第一次門事件拖到 15 秒）
    var G = S.guarantee;
    if (G && !G.done && S.mode === 'live' && count() >= 2 && !sl.frozen) {
      var gp = permit(sl, exitLegs(sl)), gb = guarBudget();
      if (gp && etaMs(gp.pts, num(cf('speed'), 30)) <= gb) {
        if (doorLocked()) { sl.stayLeft = 500; return; }     // 門一開就走
        if (leave(sl, null, false)) { G.done = true; return; }
      }
    }
    if (sl.plan > 0) {
      // 換一箱：這次來翻過的不再回頭翻（build2 審查：右排兩格來回翻像程式在繞）；路上有人擋著的不挑
      var nx = pick(sl, { u: h01(sl.seed + '#next#' + sl.visits), noPay: true, notBeen: true });
      if (nx && goStop(sl, nx)) { sl.plan--; return; }
      if (!nx) sl.plan = 0;
    }
    var pp = sl.pay && canPay(sl);
    if (pp) {
      var pay = stopById('c-pay');
      sl.pay = false;
      sl.holding = shelfCard(cur, sl.seed);
      emote(sl, 'record', 1500);
      goStop(sl, pay, { keepHold: true, plan: pp });
      return;
    }
    // 門鎖著（不跟主線客人搶門、有人正在出門）或出門的路被人擋著：多翻一下再走
    if (doorLocked() || !leave(sl)) { if (waitRoute(sl, exitLegs(sl)) && !doorLocked()) leave(sl, null, true); }
  }
  // 能不能去結帳 → 走得過去的那趟路（{keys, pts}）| null
  function canPay(sl) {
    if (S.mode !== 'live' || !ownerFree()) return null;
    var pay = stopById('c-pay'); if (!pay || S.reserve['c-pay'] || blocked(pay)) return null;
    var occ = occupiedFor(sl);
    if (occ.some(function (a) { return clash(a, [pay.x, pay.y]); })) return null;
    return permit(sl, legsTo(sl, pay, false), null);
  }
  function calmMove(sl) {
    var cur = sl.at && stopById(sl.at);
    var u = h01(sl.seed + '#calm#' + sl.visits);
    var nx = (cur && pick(sl, { calm: true, onlyDig: true, side: cur.side, u: u })) || pick(sl, { calm: true, onlyDig: true, u: u });   // 偶爾換一箱：先挑同一排
    sl.stayTot = sl.stayLeft = range(cf2('title', 'move') || DEF.title.move, h01(sl.seed + '#cmove#' + sl.visits));
    if (!nx) return;
    goStop(sl, nx, { keepStay: true, force: true });
  }
  function emote(sl, kind, ms) {
    if (reduced() || S.t < S.emoteUntil) return false;       // 全店同時最多一個圖示；reduced-motion 不冒
    var t = st(); if (!t) return false;
    t.emote(sl.id, kind, ms / speed());
    S.emoteUntil = S.t + ms;
    return true;
  }
  function stayTick(sl, dt) {
    if (sl.phase !== 'stay' || sl.walking || sl.frozen || sl.hiddenDuel || sl.pass || sl.side || chatting(sl)) return;   // 聊天、借過期間停留計時暫停（§5.2）
    sl.stayLeft -= dt;
    var s = stopById(sl.at);
    if (s && !sl.emDone && S.mode === 'live' && S.t - sl.stayAt >= sl.emAt) {
      sl.emDone = true;
      var u = h01(sl.seed + '#emk#' + sl.visits), E = cf('emote') || DEF.emote;
      if (s.kind === 'listen') { if (u < num(E.listenNote, 0.3)) emote(sl, 'note', 1500); }
      else if (s.kind === 'dig') { if (u < num(E.record, 0.18)) emote(sl, 'record', 1500); else if (u < num(E.record, 0.18) + num(E.note, 0.08)) emote(sl, 'note', 1500); }
    }
    if (sl.stayLeft <= 0) nextMove(sl);
  }

  // ------------------------------------------------------------------ 讓位（§4.3）：yield、clearSpot、clearRoute、clearDuel
  // 換一格（不碰 avoid、不撞任何人）；沒有就出門（標題回訪：藏起來）
  function relocate(sl, o) {
    o = o || {};
    if (!sl.on || sl.hiddenDuel) return;
    var spd = num(cf('yieldSpeed'), 48);
    if (sl.phase === 'out') {
      // 已經在出門的路上：讓他走完。被點住聊天停在路上的（review2 B）：收掉聊天、接著出門
      if (sl.halted) leave(sl, spd, true);
      return;
    }
    var cur = posOf(sl) || sl.dest || [0, 0];
    var po = { prefer: sideX(cur[0]), avoid: o.avoid, extra: o.extra, noPay: true, calm: S.mode === 'calm', onlyDig: S.mode === 'calm', u: h01(sl.seed + '#yield#' + (++sl.visits)) };
    var keep = Math.max(sl.stayLeft || 0, 4000);
    // 先挑走得過去的格（路上沒人、不跟走路的人對穿）；主線裁定（可逆）：同一排沒空格就從上面繞到另一排，再沒有才出門（剛進門就被你請出去不像店）
    var nx = (o.sameSide ? pick(sl, Object.assign({ side: sideX(cur[0]) }, po)) : null) || pick(sl, po);
    if (nx && goStop(sl, nx, { spd: spd, keepStay: true })) { sl.stayLeft = keep; return; }
    // 你路上的格（yieldTo 的 fallback）：路走得通就去，到了再讓一步（比被請出門像店）
    if (o.fallback) {
      var fp = Object.assign({}, po, { avoid: o.fallback });
      nx = (o.sameSide ? pick(sl, Object.assign({ side: sideX(cur[0]) }, fp)) : null) || pick(sl, fp);
      if (nx && goStop(sl, nx, { spd: spd, keepStay: true })) { sl.stayLeft = keep; return; }
      po = fp;
    }
    if (S.mode !== 'calm' && leave(sl, spd)) return;
    // 被夾在走道裡（往哪走都要穿過停著的人）：先往旁邊讓一步，等擋路的人走開再換格（trapStep；build2 驗：右排 CLASSICAL 被你點 FOLK 請走時穿過 ELEC 的人）
    if (S.mode !== 'calm' && !o.noTrap && trapStep(sl)) return;
    // 走得通的都沒有（窄走道上被人擋著）：讓位要快，照舊挑格（寧可擦身，不擋老闆、主線客人、你的路）
    var np = Object.assign({}, po, { noRoute: true });
    nx = (o.sameSide ? pick(sl, Object.assign({ side: sideX(cur[0]) }, np)) : null) || pick(sl, np);
    if (nx) { goStop(sl, nx, { spd: spd, keepStay: true, force: true }); sl.stayLeft = keep; return; }
    if (S.mode === 'calm') { hideSlot(sl); sl.on = false; return; }
    leave(sl, spd, true);
  }
  function needMove(sl, test) {
    // 正在走出門的讓他走完；被點住聊天停在出門路上的要動（review2 B：老闆 counter→ref 從停著的他身上穿過）
    if (!sl.on || sl.hiddenDuel || (sl.phase === 'out' && !sl.halted)) return false;
    var a = holdXY(sl); if (a && test(a)) return true;
    return !!(sl.side && sl.side.stop && test(sl.side.stop));
  }
  // 你要走去的地方（econ approach、試聽機、收音機、櫃檯、攤位）：停在那裡 38×44 內的人放掉那格，走到同一排另一個空格，沒有就出門
  function yieldTo(to) {
    var xy = xyOf(to); if (!xy || !enabled()) return;
    var t = st(), pr = t && t.route ? t.route('p', xy) : [];
    S.pDest = { xy: xy, until: Date.now() + 8000, pr: pr.length > 1 ? pr : null };
    slotOn().forEach(function (sl) {
      if (!needMove(sl, function (a) { return clash(a, xy); })) return;
      // 讓到另一格：不在你這段路上的（同一排優先、再另一排），沒有就出門；都不行才挑你路上的（到了再讓一步，arrive 的 sideCheck）
      var off = function (s) { return clash([s.x, s.y], xy); };
      var offRoute = function (s) { return off(s) || (pr.length > 1 && onRoute(pr, [s.x, s.y])); };
      relocate(sl, { sameSide: true, extra: [xy], avoid: offRoute, fallback: off });
    });
    // 你這段路會經過的、停著翻箱的人：側身讓一步（借過，§4.3；build2 審查：舊版只原地轉向你，你從他身體正中間穿過去）
    if (pr.length > 1) slotOn().forEach(function (sl) {
      if (sl.phase !== 'stay' || sl.walking || sl.hiddenDuel || sl.side || chatting(sl)) return;
      var me = posOf(sl); if (!me || clash(me, xy) || !onRoute(pr, me)) return;
      sideStep(sl, pr, xy);
    });
  }
  // 借過：左排往走道外側（x62）、右排下面兩格（CLASSICAL、FOLK）往櫃檯前（x226）讓一步，面向你；你過去 0.8 秒後走回原位接著翻（passCheck）。
  //   右排上面兩格（ELEC、HIP-HOP）旁邊是櫃檯口袋、沒地方讓：換到不在你這段路上的格（同 yield），沒有就出門。
  //   讓一步那格在你路上、或被人／家具擋著：照舊原地轉向你（passCheck）
  function sideStep(sl, pr, dest) {
    var t = st(), s = stopById(sl.at); if (!t || !s || s.kind !== 'dig') return;
    var x = s.side === 'left' ? SIDE_X.left : (s.y >= 216 ? SIDE_X.right : null);
    if (x == null) {
      if (sl.frozen) return;
      relocate(sl, { extra: [dest], avoid: function (q) { return onRoute(pr, [q.x, q.y]) || clash([q.x, q.y], dest); } });
      return;
    }
    var spot = [x, s.y], base = navBase();
    if (onRoute(pr, spot) || (base && inAny(base, spot)) || bodiesFor(sl).some(function (b) { return bodyHit(b, spot); })) return;
    var plan = permit(sl, [spot], null); if (!plan) return;
    var stopXY = [s.x, s.y], at = sl.at;
    walk(sl, plan.keys, num(cf('yieldSpeed'), 48), function () { try { t.faceTo(sl.id, 'p'); } catch (_) {} }, plan.pts);
    sl.side = { stop: stopXY, at: at, pr: pr, t0: Date.now() };
    sl.pass = { end: 0 };
  }
  // 讓一步的人：你過去了（不在走、或你剩下的路不再經過他原本那格）0.8 秒後走回原位；10 秒還回不去（你停在他那格旁邊）就換一格
  function sideBack(sl, now, pMoving, pcur) {
    var sd = sl.side; if (!sd || sl.walking) return;
    var s = stopById(sd.at); if (!s) { sl.side = null; sl.pass = null; return; }
    if (sd.trap) {
      // 被夾住讓一步的：原位不再跟你（你站的、你要去的）撞就走回去；還撞就換一格（走得通才走），出門也行；都不行就站著等（擋路的人收尾後就通了）
      var hot = clash(sd.stop, pcur) || (S.pDest && clash(sd.stop, S.pDest.xy));
      if (!hot && !pMoving) { sd.trap = false; sd.ok = 0; sd.pr = sd.pr || [pcur, pcur]; }
      else {
        if (sd.tryAt && now < sd.tryAt) return;
        sd.tryAt = now + 500 / speed();
        var av = function (q) { return clash([q.x, q.y], pcur) || (S.pDest && clash([q.x, q.y], S.pDest.xy)); };
        var nx = pick(sl, { noPay: true, avoid: av, u: h01(sl.seed + '#trap#' + sl.visits) });
        if (nx && goStop(sl, nx, { spd: num(cf('yieldSpeed'), 48), keepStay: true })) return;
        if (leave(sl, num(cf('yieldSpeed'), 48))) return;
        if (now - sd.t0 > 30000 / speed()) { sl.side = null; sl.pass = null; relocate(sl, { noTrap: true, avoid: av }); }
        return;
      }
    }
    var passed = !bodyHit(pcur, sd.stop) && (!pMoving || !onRoute(restOf(sd.pr, pcur), sd.stop));
    if (!passed) { sd.ok = 0; if (now - sd.t0 > 10000 / speed() && !pMoving) relocateSide(sl); return; }
    if (!sd.ok) { sd.ok = now + num((cf('pass') || DEF.pass).resume, 800) / speed(); return; }
    if (now < sd.ok) return;
    var plan = permit(sl, [keyOf(s)], null);
    if (!plan) { if (now - sd.t0 > 10000 / speed()) relocateSide(sl); return; }
    walk(sl, plan.keys, num(cf('yieldSpeed'), 48), function () { sl.pass = null; stand(sl); }, plan.pts);
    sl.side = null; sl.pass = { end: 0 };
  }
  function relocateSide(sl) { sl.side = null; sl.pass = null; relocate(sl, { noTrap: true }); }
  // 讓一步的那格（左排 x62、右排下面兩格 x226）；沒有（右排上面兩格旁邊是櫃檯口袋）→ null
  function sideSpot(sl, s) {
    if (!s || s.kind !== 'dig') return null;
    var x = s.side === 'left' ? SIDE_X.left : (s.y >= 216 ? SIDE_X.right : null);
    if (x == null) return null;
    var spot = [x, s.y], base = navBase();
    if ((base && inAny(base, spot)) || bodiesFor(sl).some(function (b) { return bodyHit(b, spot); })) return null;
    return spot;
  }
  function trapStep(sl) {
    if (sl.phase !== 'stay' || sl.walking || sl.side) return false;
    var s = stopById(sl.at), spot = sideSpot(sl, s); if (!spot) return false;
    var me = posOf(sl); if (me && near(me, spot, 3)) return false;
    var plan = permit(sl, [spot], null); if (!plan) return false;
    var t = st(), stopXY = [s.x, s.y], at = sl.at;
    walk(sl, plan.keys, num(cf('yieldSpeed'), 48), function () { try { t.faceTo(sl.id, 'p'); } catch (_) {} }, plan.pts);
    sl.side = { stop: stopXY, at: at, pr: null, t0: Date.now(), trap: true };
    sl.pass = { end: 0 };
    nudge(sl, exitLegs(sl));                                   // 擋住出路的熟客請他收尾
    return true;
  }
  function clearSpot(at, o) {
    o = o || {};
    var xy = xyOf(at); if (!xy || !enabled()) return Promise.resolve();
    if (o.hold) S.blockXY.push(xy);
    var moved = [];
    slotOn().forEach(function (sl) {
      if (needMove(sl, function (a) { return clash(a, xy); })) { moved.push(sl); relocate(sl, { extra: [xy], avoid: function (s) { return clash([s.x, s.y], xy); } }); }
    });
    return settled(moved, function (p) { return !clash(p, xy); });
  }
  function clearRoute(points, o) {
    o = o || {};
    var pts = (points || []).map(xyOf).filter(Boolean);
    if (!enabled()) return Promise.resolve();
    if (o.who && pts.length) addBlock(pts, o.who, o.door);
    if (pts.length < 2) return Promise.resolve();
    var moved = [];
    slotOn().forEach(function (sl) {
      if (needMove(sl, function (a) { return onRoute(pts, a); })) { moved.push(sl); relocate(sl, { avoid: function (s) { return onRoute(pts, [s.x, s.y]); } }); }
    });
    return settled(moved, function (p) { return !onRoute(pts, p); });
  }
  // 讓路的人都離開了（或 3 秒到了）才 resolve
  function settled(list, ok) {
    if (!list.length) return Promise.resolve();
    return new Promise(function (res) {
      var t0 = Date.now(), iv = setInterval(function () {
        var all = list.every(function (sl) { if (!sl.on) return true; var p = posOf(sl); return !p || ok(p); });
        if (all || Date.now() - t0 > 3000) { clearInterval(iv); res(); }
      }, 100);
    });
  }
  // 開打清對戰區（§3.1）：頭被對決橫條上緣切到的、擋在老闆 counter→ref 或你 →duelP（或主線客人 →duelE）路上的，先走開；整個人在橫條裡、不在路上的留著照翻
  function stripTop() {
    var t = st(); if (!t || !t.camRect) return null;
    try { var r = t.camRect('strip'); return r ? r.y : null; } catch (_) { return null; }
  }
  function cutBy(T, y) { return T != null && y - HEAD < T && T < y; }
  function duelRoutes() {
    var t = st(), out = [];
    if (!t || !t.route) return out;
    var add = function (id, to) {
      var a = t.pos(id), sp = t.spot && t.spot(to);
      if (!a || a.hidden || a.outside || !t.has(id) || !sp) return;
      if (near([a.x, a.y], sp, 1.5)) return;
      var r = t.route(id, to); if (r && r.length > 1) out.push({ id: id, pts: r });
    };
    add('o', (t.layout && t.layout.spots && t.layout.spots.ref) ? 'ref' : 'counter');
    add('p', 'duelP');
    add('f', 'duelE');
    return out;
  }
  function clearDuel() {
    if (!enabled()) return Promise.resolve();
    var T = stripTop(), R = duelRoutes(), moved = [];
    R.forEach(function (r) { addBlock(r.pts, r.id, false); });     // 走到之前這幾條路上不准有人停
    var bad = function (xy) { return cutBy(T, xy[1]) || R.some(function (r) { return onRoute(r.pts, xy); }); };
    slotOn().forEach(function (sl) {
      // 換去的格也不挑試聽桌：打完主線客人輸了要從那裡出門（guestClear），領獎畫面又得讓一次
      if (needMove(sl, bad)) { moved.push(sl); relocate(sl, { avoid: function (s) { return bad([s.x, s.y]) || !!s.guestClear; } }); }
    });
    S.cut = T;
    return settled(moved, function (p) { return !bad(p); });
  }
  // 鏡頭收完（600 ms÷speed）還被切頭的 → 藏起來；導演記著他要去的格，回來客畫面直接 put 在那格
  function hideCut() {
    var T = S.cut == null ? stripTop() : S.cut;
    slotOn().forEach(function (sl) {
      if (sl.hiddenDuel) return;
      var p = posOf(sl); if (!p || !cutBy(T, p[1])) return;
      sl.hiddenDuel = true;
      if (S.chat && S.chat.sl === sl) chatEnd(S.chat);
      sl.talking = false; sl.halted = false; sl.resumeAt = null;
      var t = st(); sl.tok++;
      if (t) { t.say(sl.id, null); t.emote(sl.id, null); t.hide(sl.id, true); }
      dropHot(sl);
      if (sl.phase === 'out') { sl.on = false; sl.phase = 'gone'; if (sl.who) S.left[sl.who] = S.t; }
    });
  }
  function restoreHidden() {
    var t = st(); if (!t) return;
    slotOn().forEach(function (sl) {
      if (!sl.hiddenDuel) return;
      sl.hiddenDuel = false;
      var s = stopById(sl.stop || sl.at);
      if (!s) { sl.on = false; return; }
      t.put(sl.id, keyOf(s), sl.look); t.hide(sl.id, false); t.sil(sl.id, false);
      sl.walking = false; sl.halted = false; sl.side = null; sl.pass = null; sl.path = null; sl.dest = [s.x, s.y]; sl.at = s.id; sl.stop = s.id; sl.phase = 'stay';
      if (!(sl.stayLeft > 0)) sl.stayLeft = 4000;
      stand(sl);
    });
  }

  // ------------------------------------------------------------------ 借過（§4.3）：你走路經過停著的人＝他停手、側身轉向你，你過去 0.8 秒後再接著翻
  function passCheck() {
    var t = st(); if (!t) return;
    var p = t.pos('p');
    if (!p || p.hidden || p.outside || !t.has('p')) { S.pLast = null; return; }
    var cur = [p.x, p.y], last = S.pLast || cur;
    var moving = Math.abs(cur[0] - last[0]) > 0.5 || Math.abs(cur[1] - last[1]) > 0.5;
    S.moving.p = moving;
    var P = cf('pass') || DEF.pass, nr = num(P.near, 30), now = Date.now();
    if (S.pDest && (near(cur, S.pDest.xy, 2) || now > S.pDest.until)) S.pDest = null;
    slotOn().forEach(function (sl) {
      if (sl.side) { if (!sl.hiddenDuel && !chatting(sl)) sideBack(sl, now, moving, cur); return; }   // 讓一步的人：你過去了再走回原位
      if (sl.phase !== 'stay' || sl.walking || sl.hiddenDuel || sl.at === 'c-pay' || chatting(sl)) { sl.pass = null; return; }   // 正在跟你講話的人本來就面向你
      var me = posOf(sl); if (!me) return;
      var d = segDist(me, last, cur);
      if (moving && d < nr) {
        if (!sl.pass) { sl.pass = { end: 0 }; t.pose(sl.id, null); t.faceTo(sl.id, 'p'); }
        sl.pass.end = 0;
      } else if (sl.pass) {
        if (!sl.pass.end) sl.pass.end = now + num(P.resume, 800) / speed();
        else if (now >= sl.pass.end) { sl.pass = null; stand(sl); }
      }
    });
    S.pLast = cur;
    // 你站定的地方跟停著的人撞（被擺到 browse、settle 走回來的那一格，不是點箱子走過去的）：他讓開（同 yield）
    if (!moving) slotOn().forEach(function (sl) {
      if (sl.phase !== 'stay' || sl.walking || sl.hiddenDuel || sl.pass || sl.side || chatting(sl)) return;
      var me = posOf(sl); if (me && clash(me, cur)) yieldTo(cur);
    });
  }

  // ------------------------------------------------------------------ 暖身（§10）：新外觀第一次畫很貴（手機 50–85 ms），站定後用閒置時間分批先算好
  var WARM_POSES = [['idle', 2, ['front', 'back', 'side']], ['walk', 2, ['front', 'back', 'side']], ['dig', 2, ['front']], ['talk', 2, ['front']]];
  function lookKey(look) { return typeof look === 'string' ? look : JSON.stringify(look); }
  function warmStart() {
    if (S.warm) return;
    var CH = W.DipLabChars; if (!CH || typeof CH.toCanvas !== 'function') { S.warm = { done: true, ok: {} }; return; }
    var R = C().regulars || {}, looks = Object.keys(R).map(function (k) { return R[k].look; }).concat(cfg().passers || []);
    var jobs = [];
    looks.forEach(function (look) {
      var spec = null; try { spec = typeof look === 'string' ? (CH.npc ? CH.npc(look) : null) : (CH.normalize ? CH.normalize(look) : look); } catch (_) {}
      if (!spec) return;
      WARM_POSES.forEach(function (P) { P[2].forEach(function (dir) { for (var f = 0; f < P[1]; f++) [false, true].forEach(function (flip) { jobs.push([lookKey(look), spec, P[0], f, { flip: flip, dir: dir, shadow: false }]); }); }); });
      jobs.push([lookKey(look), null]);                          // 這一套做完的記號
    });
    S.warm = { jobs: jobs, ok: {}, done: false };
    S.warmAt = Date.now();
    var idle = W.requestIdleCallback || function (fn) { return setTimeout(function () { fn({ didTimeout: true, timeRemaining: function () { return 8; } }); }, 120); };
    var batch = num(cf2('warm', 'batchMs'), 8);
    var step = function (dl) {
      var w = S.warm; if (!w || w.done) return;
      var t0 = (W.performance && performance.now) ? performance.now() : Date.now();
      while (w.jobs.length) {
        var j = w.jobs.shift();
        if (!j[1]) { w.ok[j[0]] = true; continue; }
        try { CH.toCanvas(j[1], j[2], j[3], j[4]); } catch (_) {}
        var el = ((W.performance && performance.now) ? performance.now() : Date.now()) - t0;
        if (el >= batch || (dl && typeof dl.timeRemaining === 'function' && dl.timeRemaining() < 1)) break;
      }
      if (w.jobs.length) idle(step); else w.done = true;
    };
    idle(step);
  }
  function warmReady(look) {
    var w = S.warm; if (!w || w.done) return true;
    if (w.ok[lookKey(look)]) return true;
    return Date.now() - S.warmAt > num(cf2('warm', 'maxWait'), 3000);   // 最多等 3 秒，還沒暖好就照派（掉一兩格比沒人好）
  }

  // ------------------------------------------------------------------ 主迴圈
  function updateBlocks() {
    var t = st(); if (!t) return;
    S.blocks = S.blocks.filter(function (b) {
      var a = t.pos(b.who);
      var arrived = a && !a.hidden && near([a.x, a.y], b.end, 1.5);
      if (arrived || S.t > b.until || !a || a.hidden) {
        if (b.door) S.door.guestAt = S.t;                        // 主線客人到站：再 1.2 秒門才給路人用（doorLock.afterGuest）
        return false;
      }
      return true;
    });
  }
  // 固定路線（主線客人、老闆、你走去開打）：這個人走到終點前，這條路上不准有人停（pick 的 blocked）
  function addBlock(pts, who, door) {
    S.blocks = S.blocks.filter(function (x) { return x.who !== who; });
    S.blocks.push({ pts: pts, who: who, end: pts[pts.length - 1], door: !!door, until: S.t + 15000 });
    if (door) S.door.swing = S.t;                              // 主線客人推門（門晃一下）：門鎖從這裡算
  }
  function doorFlow() {
    // 門事件保證（批判 1.3）：門鎖一解 0–1.5 秒內排一次：停留過 60% 的人提前出門 → 店裡未滿有人進來 → 滿了停留最短的那位出門
    var G = S.guarantee, locked = doorLocked();
    if (G && !G.done) {
      if (S.t - S.screenAt > GUAR_GIVEUP) G.done = true;
      else if (!locked) {
        if (G.due == null) G.due = S.t + range((cf('doorEvent') || DEF.doorEvent).after || DEF.doorEvent.after, h01(S.tag + '#guar#' + S.k));
        if (S.t >= G.due) guarantee(G);
      } else G.due = null;
    }
    if (locked) return;
    if (S.nextEntry == null) S.nextEntry = S.t + range(cf('gap'), h01(S.tag + '#gap0'));
    if (S.t < S.nextEntry) return;
    if (count() >= maxN()) { S.waitRoom = true; return; }
    if (!enter()) S.nextEntry = S.t + 2000;                    // 沒有空格、外觀還在暖：2 秒後再試
  }
  // 離 10 秒期限還有多少（遊戲 ms）；留 300 ms＋一個 tick（遊戲時鐘一 tick 跳 250 ms×倍速，?fast=1 一跳 1 秒）
  function guarBudget() { return S.screenAt + GUAR_DEADLINE - S.t - 300 - TICK * speed(); }
  function guarantee(G) {
    var budget = guarBudget(), spd = num(cf('speed'), 30);
    // 走到門要多久照「現在走得通的那條路」算（避人繞路會比靜態路線長）；走不通的（窄走道被人擋著、會跟走路的人對穿）不算候選
    var cands = slotOn().filter(function (sl) { return sl.phase === 'stay' && !sl.frozen && !sl.hiddenDuel && !chatting(sl) && !sl.side; }).map(function (sl) {
      var plan = permit(sl, exitLegs(sl));
      return { sl: sl, plan: plan, eta: plan ? etaMs(plan.pts, spd) : Infinity, done: sl.stayTot > 0 ? 1 - sl.stayLeft / sl.stayTot : 0 };
    });
    var early = num((cf('doorEvent') || DEF.doorEvent).earlyLeave, 0.6);
    var byEta = function (a, b) { return a.eta - b.eta; };
    // 主線裁定（可逆）：店裡只剩一位時不叫他提前走（不然門事件一做完店就空了 20 秒）；先讓人進來
    var ok = count() >= 2 ? cands.filter(function (c) { return c.plan && c.done >= early && c.eta <= budget; }).sort(byEta) : [];
    for (var i = 0; i < ok.length; i++) if (leave(ok[i].sl)) { G.done = true; return; }
    if (count() < maxN() && enter()) { G.done = true; return; }
    if (count() >= maxN() && cands.length) {
      // 滿了：10 秒內走得到門的，停留剩最短的先走；都來不及就再等半秒（路可能等一下就通了）；最後 2 秒還沒有才讓最快到門的走
      var fit = cands.filter(function (c) { return c.plan && c.eta <= budget; }).sort(function (a, b) { return a.sl.stayLeft - b.sl.stayLeft; });
      for (var j = 0; j < fit.length; j++) if (leave(fit[j].sl)) { G.done = true; return; }
      if (S.t - S.screenAt > GUAR_DEADLINE - 2000) {
        var any = cands.filter(function (c) { return c.plan; }).sort(byEta);
        for (var k = 0; k < any.length; k++) if (leave(any[k].sl)) { G.done = true; return; }
      }
    }
    G.due = S.t + 500;                                         // 什麼都做不了（外觀還在暖、沒空格、路被擋著）：半秒後再試
  }
  function tick() {
    if (S.mode === 'off' || !enabled()) return;
    if (D.hidden) { S.last = Date.now(); return; }            // 分頁藏到背景：整個停（回來不補時間）
    var now = Date.now(), dt = Math.min(1000, Math.max(0, now - (S.last || now))) * speed();
    S.last = now;
    var paused = hostPaused();
    if (!paused) S.t += dt;
    remount();
    updateBlocks();
    movingPOF();
    slotOn().forEach(faceFix);
    if (paused && S.chat) chatEnd(S.chat);     // 開抽屜、面板、頁面＝聊天收掉（§5.3）
    if (!paused) slotOn().forEach(function (sl) { if (sl.resumeAt != null && S.t >= sl.resumeAt) resumeTalk(sl); });   // 收泡泡 2 秒後回原本動作
    passCheck();
    if (!paused && S.mode === 'live') hintCheck();
    if (paused || S.mode === 'still') return;                  // 暫停＝不排新的進門、停留計時停；正在走的那段 shop 自己走完就站著
    slotOn().forEach(function (sl) { stayTick(sl, dt); });
    if (S.mode === 'live') doorFlow();
  }
  // 老闆、主線客人這一 tick 有沒有在走（停著的才算路上的障礙；你的在 passCheck 算）
  function movingPOF() {
    var t = st(); if (!t) return;
    ['o', 'f'].forEach(function (id) {
      var a = t.pos(id), q = S.last3['_' + id], c = a && !a.hidden ? [a.x, a.y] : null;
      S.moving[id] = !!(c && q && (Math.abs(c[0] - q[0]) > 0.5 || Math.abs(c[1] - q[1]) > 0.5));
      S.last3['_' + id] = c;
    });
  }
  // 舞台被重掛（Stage.load 去台北、你家再回來，actors 清空）：照記憶把還在的人直接 put 回停留點，不演推門
  function remount() {
    var t = st(); if (!t) return;
    if (S.stageRef !== t.shop) { S.stageRef = t.shop; S.stopsCache = null; }
    slotOn().forEach(function (sl) {
      if (sl.hiddenDuel || t.has(sl.id)) return;
      var s = stopById(sl.stop || sl.at);
      if (!s || sl.phase === 'out') { hideSlot(sl); sl.on = false; return; }
      t.put(sl.id, keyOf(s), sl.look); t.hide(sl.id, false); t.sil(sl.id, false);
      sl.walking = false; sl.halted = false; sl.side = null; sl.pass = null; sl.path = null; sl.dest = [s.x, s.y]; sl.at = s.id; sl.stop = s.id; sl.phase = 'stay';
      stand(sl);
    });
  }
  // 老闆打完回櫃檯（對決後場景他站 ref；來客畫面 settle 走回去）：那段路上不准有人停
  function ownerHome() {
    var t = st(); if (!t || !t.route) return;
    var a = t.pos('o'), sp = t.spot && t.spot('counter');
    if (!a || a.hidden || !sp || near([a.x, a.y], sp, 1.5)) return;
    var r = t.route('o', 'counter'); if (r && r.length > 1) clearRoute(r, { who: 'o' });
  }
  function ensureTimer() { if (!S.iv) { S.last = Date.now(); S.iv = setInterval(tick, TICK); } }
  function stopTimer() { if (S.iv) { clearInterval(S.iv); S.iv = 0; } }

  // ------------------------------------------------------------------ 模式
  function start(mode, o) {
    o = o || {};
    if (mode === 'off' || !enabled()) return stop();
    var prev = S.mode;
    S.stopsCache = null;
    if (!stops().length) return stop();                        // 這家店沒有 crowd 段（你家、台北）
    ensureTimer();
    warmStart();
    remount();
    if (!o.duel) restoreHidden();
    S.reserve = {};
    (o.reserve || []).forEach(function (id) { S.reserve[id] = true; });
    if (mode === 'live') {
      var tag = (typeof H.seqTag === 'function' && H.seqTag()) || 'x';
      if (tag !== S.tag) { S.tag = tag; S.k = 0; S.nextEntry = null; }
      if (prev !== 'live') {
        S.blockXY = [];
        S.screenAt = S.t; S.guarantee = { due: null, done: false };
        S.log.push({ t: Date.now(), g: Math.round(S.t), kind: 'screen', mode: 'live', tag: S.tag });
        S.mode = 'live';
        if (!count()) startInside(S.tag, false);
        // 從標題回訪（calm，停留時間是「換箱間隔」）帶進來的人：換回來客的翻箱時間與幾站
        slotOn().forEach(function (sl) { if (sl.calm) { sl.calm = false; sl.plan = 1; sl.stayLeft = Math.min(sl.stayLeft, durOf(stopById(sl.at) || { kind: 'dig' }, h01(sl.seed + '#live'))); } });
        if (S.nextEntry == null) S.nextEntry = S.t + range(cf('gap'), h01(S.tag + '#gap0'));
      }
      S.mode = 'live';
      ownerHome();
    } else if (mode === 'calm') {
      var ttag = (typeof H.titleTag === 'function' && H.titleTag()) || 'title';
      if (prev !== 'calm') {
        // 標題回訪：0–1 位、站在 y≥189 的停留點翻、不用門。帶過來的人超過一位、在走路或不在那幾格＝店裡重新來過（換畫面那一下）
        S.mode = 'calm';
        var okCalm = function (sl) { var s = stopById(sl.at); return !sl.hiddenDuel && sl.phase === 'stay' && !sl.walking && s && s.kind === 'dig' && s.y >= num(cf2('title', 'minY'), 189); };
        if (count() > maxN() || !slotOn().every(okCalm)) clearAll();
        if (!count()) { S.tag = ttag; S.k = 0; startInside(ttag, true); }
        slotOn().forEach(function (sl) { if (!sl.calm) { sl.calm = true; sl.plan = 0; sl.pay = false; sl.stayTot = sl.stayLeft = range(cf2('title', 'move') || DEF.title.move, h01(sl.seed + '#cm')); } });
      }
      S.mode = 'calm';
    } else {
      S.mode = 'still';
      slotOn().forEach(function (sl) { if (S.reserve[sl.at] || ((sl.walking || sl.halted) && sl.stop && S.reserve[sl.stop])) relocate(sl, { avoid: function (s) { return !!S.reserve[s.id]; } }); });
      if (o.duel) {
        clearDuel();
        clearTimeout(S.hideAt);
        S.hideAt = setTimeout(function () { if (S.mode === 'still') hideCut(); }, Math.round((o.camMs == null ? 600 : o.camMs) / speed()) + 60);
      }
    }
    S.kept = false;
    return api;
  }
  function stop(o) {
    o = o || {};
    clearTimeout(S.hideAt);
    chatClose();
    if (o.keep && enabled()) {
      // 去你家／台北：藏起來、記住誰在哪一格（舞台重掛回來 start 時照記憶放回去）；走到一半的直接當作到了
      slotOn().forEach(function (sl) {
        var t = st(); sl.tok++;
        if (sl.phase === 'out') { hideSlot(sl); sl.on = false; return; }
        if (sl.side) { var s0 = stopById(sl.side.at); sl.side = null; sl.pass = null; if (s0) { sl.walking = false; sl.at = s0.id; sl.stop = s0.id; sl.dest = [s0.x, s0.y]; } }
        if ((sl.walking || sl.halted) && sl.stop) { sl.walking = false; sl.halted = false; sl.at = sl.stop; sl.phase = 'stay'; var s = stopById(sl.stop); if (s) sl.dest = [s.x, s.y]; }
        if (t) { try { t.say(sl.id, null); t.emote(sl.id, null); t.hide(sl.id, true); } catch (_) {} }
        dropHot(sl);
        sl.hiddenDuel = false;
        sl.kept = true;
      });
      S.kept = true;
      S.mode = 'off'; stopTimer();
      // 回來時 remount() 看 has()＝false 就照 sl.stop put 回去
      return api;
    }
    clearAll();
    S.mode = 'off'; S.blocks = []; S.blockXY = []; S.reserve = {}; S.guarantee = null; S.nextEntry = null; S.waitRoom = false; S.pDest = null;
    stopTimer();
    return api;
  }
  function clearAll() {
    SLOTS.forEach(function (id) { var sl = S.slots[id]; if (sl && sl.on) { hideSlot(sl); sl.on = false; } else { var t = st(); if (t && t.has && t.has(id)) t.hide(id, true); } });
    S.slots = {};
  }

  // ------------------------------------------------------------------ 聊天（SPEC-H §5）：點人＝一段（1–2 泡；行家 2–3 泡）；有下一句（▼）的泡泡點了才換，
  //   最後一句不吃點擊、停 clamp(3000＋200×字數, 6000, 12000) ms；?fast=1 ÷4（動畫加速不吃）；一次來最多 3 段（路人 1），第 4 下 busy 一句、之後只冒汗。
  //   挑哪一句、記存檔在 ui.js（host.chat(who, info) → Promise<{ bubbles:[{text, quote?, src?}], cat }>）；這裡只管泡泡、時間、說話的人停下來。
  //   同時只有一個人在講：開新的聊天會收掉別人的（含老闆）；舞台任何一下點擊收掉聊天（點同一個人＝下一句或下一段），那一下照常生效。
  function talkCf(k) { var T = cfg().talk || {}; return num(T[k], DEF.talk[k]); }
  function bubCf(k) { var B = cfg().bubble || {}; return num(B[k], DEF.bubble[k]); }
  function fastK() { try { var k = typeof H.fastK === 'function' ? H.fastK() : 1; return k > 0 ? k : 1; } catch (_) { return 1; } }
  function lastMs(b) {
    var n = (Array.from ? Array.from(String(b.text || '')) : String(b.text || '').split('')).length + (b.quote ? 2 : 0);
    return Math.min(bubCf('max'), Math.max(bubCf('min'), bubCf('base') + bubCf('perChar') * n)) / fastK();
  }
  function nameOf(who) {
    var R = C().regulars || {}, U = C().crowdUi || {};
    if (who === 'owner') return U.owner || '老闆';
    return who && R[who] ? R[who].name : (U.passer || '客人');
  }
  function voiceOf(who) {
    var R = C().regulars || {};
    if (who === 'owner') return (C().voices || {}).owner || null;
    return who && R[who] && R[who].voice ? R[who].voice : PASSER_VOICE;
  }
  // 每個泡泡響 3 聲（照音效設定；fx.blip 自己看聲音開關）
  function blips(v) {
    var F = W.DipLabFx; if (!v || !F || typeof F.blip !== 'function') return;
    for (var i = 0; i < 3; i++) setTimeout(function () { try { F.blip(v.freq, v.wave, v.jitter); } catch (_) {} }, i * 70);
  }
  function hook() { var t = st(); if (t && t.onTapAny !== onTapAny) t.onTapAny = onTapAny; }
  // 舞台任何一下點擊（▼ 泡泡自己吃掉、不會到這裡）：點的不是正在講的那個人＝收掉聊天，那一下照常生效（點封面開唱片資訊、點箱子走去翻）
  function onTapAny(x, y, hit) {
    var c = S.chat; if (!c) return;
    if (hit && c.sl && hit.id === 'cw-' + c.sl.id) return;   // 點同一個人：talk() 換下一句／下一段
    chatEnd(c);
  }
  function chatShow(c) {
    var t = st(); if (!t || S.chat !== c) return;
    var b = c.bubbles[c.i], more = c.i < c.bubbles.length - 1;
    var ms = more ? bubCf('holdMore') / fastK() : lastMs(b);   // 有 ▼：不自己換句，20 秒沒點整段收；最後一句停 6–12 秒
    c.more = more; c.until = Date.now() + ms; c.el = null;
    var el = null;
    try {
      el = t.say(c.id, String(b.text), { chat: true, who: c.name, more: more, quote: !!b.quote, src: b.src || '', tone: c.id === 'o' ? 'owner' : null, ms: Math.max(1, Math.round(ms)),
        onTap: function () { if (S.chat === c && c.el === el) chatNext(c); },
        onClose: function (e) { if (S.chat === c && c.el === e) chatEnd(c, true); } });
    } catch (e) { console.error(e); }
    if (!el) { chatEnd(c); return; }
    c.el = el;
    blips(c.voice);
  }
  function chatNext(c) {
    if (S.chat !== c || c.pending) return;
    if (c.i < c.bubbles.length - 1) { c.i++; chatShow(c); } else chatEnd(c);
  }
  function chatEnd(c, dropped) {
    if (!c || S.chat !== c) return;
    S.chat = null;
    var t = st();
    if (!dropped && t) { try { t.say(c.id, null); } catch (_) {} }
    if (c.sl) talkDone(c.sl);
    try { if (typeof H.chatEnd === 'function') H.chatEnd(c.who); } catch (e) { console.error(e); }
  }
  function chatClose() { if (S.chat) chatEnd(S.chat); }
  // 說話的人：正在走就停在原地、面向你、說話的手勢；停留 +4 秒（不會話講到一半走出門）
  function talkBegin(sl) {
    var t = st(); if (!t) return;
    if (sl.walking) {
      sl.tok++; sl.walking = false; sl.halted = true;
      var p = posOf(sl);
      if (p) { try { t.walk(sl.id, [p]); } catch (_) {} sl.dest = p; }
    }
    if (!sl.talking && sl.resumeAt == null && sl.phase === 'stay') sl.stayLeft = (sl.stayLeft || 0) + talkCf('extend');
    sl.talking = true; sl.resumeAt = null; sl.pass = null;
    try { t.emote(sl.id, null); t.back(sl.id, false); t.faceTo(sl.id, 'p'); t.pose(sl.id, 'talk'); } catch (e) { console.error(e); }
  }
  function talkDone(sl) {
    if (!sl.talking) return;
    sl.talking = false;
    sl.resumeAt = S.t + talkCf('resume');
    var t = st(); if (t && sl.on && !sl.hiddenDuel) { try { t.pose(sl.id, null); } catch (_) {} }
  }
  // 收泡泡 2 秒後：本來在翻箱的接著翻、本來在走的接著走（去下一格、去結帳、出門）
  //   被點住的走路客人（halted）：本來要去的那格還空著、路走得通才接著去；被別人佔了（review2 A）就換一格／去結帳／出門；路被擋著就等半秒再看
  function resumeTalk(sl) {
    sl.resumeAt = null;
    if (!sl.on || sl.hiddenDuel || sl.talking) return;
    if (sl.halted) {
      var force = (sl.waitT || 0) >= WAIT_MAX;
      if (sl.phase === 'out') {
        if (!doorLocked() && leave(sl, null, force)) return;
        sl.waitT = (sl.waitT || 0) + 500; sl.resumeAt = S.t + 500; return;
      }
      var s = sl.stop && stopById(sl.stop);
      var free = s && !blocked(s) && !S.reserve[s.id] && !occupiedFor(sl).some(function (a) { return clash(a, [s.x, s.y]); });
      if (free && goStop(sl, s, { keepHold: s.kind === 'pay' })) return;
      if (s && s.kind === 'pay' && sl.holding) { var t = st(); if (t) t.hold(sl.id, null); sl.holding = null; }
      var nx = pick(sl, { u: h01(sl.seed + '#re#' + sl.visits), noPay: true, notBeen: true });
      if (nx && goStop(sl, nx)) return;
      if (!doorLocked() && leave(sl, null, force)) return;
      sl.waitT = (sl.waitT || 0) + 500; sl.resumeAt = S.t + 500;
      return;
    }
    if (sl.phase === 'stay') stand(sl);
  }
  function slotFor(who, hot) {
    var id = hot && (hot.follow || (/^cw-(w\d)$/.exec(hot.id || '') || [])[1]);
    var sl = id && S.slots[id];
    if (sl && sl.on) return sl;
    return slotOn().filter(function (o) { return (o.who || 'passer') === who; })[0] || null;
  }
  // 點人（ui.js onStageAction 的 talk:<who>）
  function talk(who, hot) {
    if (!enabled() || S.mode === 'off' || typeof H.chat !== 'function') return null;
    hook();
    var sl = slotFor(who, hot); if (!sl || sl.hiddenDuel || sl.phase === 'gone') return null;
    var c = S.chat;
    if (c && c.sl === sl) {
      if (c.pending) return true;
      if (c.more) { chatNext(c); return true; }               // 點同一個人＝下一句
    }
    chatClose();
    var max = sl.kind === 'regular' ? talkCf('beatsPerVisit') : talkCf('passerBeats');
    if ((sl.talkN | 0) >= max) {
      if (sl.kind === 'regular' && !sl.busySaid) { sl.busySaid = true; return chatRun(sl, { busy: true }); }   // 第 4 下：「我再翻一下，等等聊。」
      var t = st(); if (t) t.emote(sl.id, 'sweat', talkCf('busyMute') / speed());   // 再點只冒汗、不出字
      return false;
    }
    return chatRun(sl, {});
  }
  function chatRun(sl, o) {
    talkBegin(sl);
    var s = sl.phase === 'stay' && sl.at ? stopById(sl.at) : null;
    var c = { id: sl.id, sl: sl, who: sl.who || 'passer', name: nameOf(sl.who), voice: voiceOf(sl.who), bubbles: [], i: 0, pending: true, until: Date.now() + 2500 };
    S.chat = c;
    var info = { slot: sl.id, at: s ? s.id : null, bin: s && s.bin ? s.bin : null, cats: sl.cats.slice(), busy: !!o.busy, beat: sl.talkN | 0, li: sl.li };
    Promise.resolve().then(function () { return H.chat(c.who, info); }).then(function (res) {
      if (S.chat !== c) return;
      c.pending = false;
      if (!res || !res.bubbles || !res.bubbles.length) { chatEnd(c); return; }
      if (!o.busy) { sl.talkN = (sl.talkN | 0) + 1; if (res.cat) sl.cats.push(res.cat); }
      c.bubbles = res.bubbles; c.cat = res.cat || null;
      chatShow(c);
    }, function (e) { console.error(e); if (S.chat === c) chatEnd(c); });
    return true;
  }
  // 老闆講話（聊聊、第一次提示）：同一套泡泡；bubbles 沒給＝問 host.chat('owner') 挑一段
  function ownerTalk(bubbles) {
    var t = st(); if (!t || !H.on) return null;
    hook();
    chatClose();
    var c = { id: 'o', sl: null, who: 'owner', name: nameOf('owner'), voice: voiceOf('owner'), bubbles: [], i: 0, pending: true, until: Date.now() + 2500 };
    S.chat = c;
    if (bubbles && bubbles.length) { c.pending = false; c.bubbles = bubbles; chatShow(c); return true; }
    if (typeof H.chat !== 'function') { S.chat = null; return null; }
    Promise.resolve().then(function () { return H.chat('owner', {}); }).then(function (res) {
      if (S.chat !== c) return;
      c.pending = false;
      if (!res || !res.bubbles || !res.bubbles.length) { chatEnd(c); return; }
      c.bubbles = res.bubbles; c.cat = res.cat || null;
      chatShow(c);
    }, function (e) { console.error(e); if (S.chat === c) chatEnd(c); });
    return true;
  }
  // 誰在講、講到幾時（ui.js UI.sayTill：挑戰者的開場白等它；有 ▼ 的泡泡＝點了才換，用 20 秒上限算）
  function chatTill() { var c = S.chat; return c ? c.until || 0 : 0; }
  function chatState() {
    var c = S.chat; if (!c) return null;
    return { id: c.id, who: c.who, name: c.name, i: c.i, n: c.bubbles.length, more: !!c.more, pending: !!c.pending, cat: c.cat || null,
      text: c.bubbles[c.i] ? String(c.bubbles[c.i].text) : null, quote: !!(c.bubbles[c.i] && c.bubbles[c.i].quote), until: c.until };
  }
  // 鍵盤 Enter／空白鍵＝下一句（抽屜、面板開著不吃；焦點在按鈕、輸入框上照原本的行為）
  function onKey(ev) {
    var c = S.chat; if (!c || !c.more || c.pending) return;
    if (ev.key !== 'Enter' && ev.key !== ' ' && ev.key !== 'Spacebar') return;
    if (hostPaused()) return;
    var tg = ev.target;
    if (tg && tg !== D.body && tg !== D.documentElement && (/^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(tg.tagName || '') || tg.isContentEditable || (tg.closest && tg.closest('[role=button],[tabindex]') && tg !== c.el))) return;
    if (ev.preventDefault) ev.preventDefault();
    chatNext(c);
  }

  // ------------------------------------------------------------------ 第一次的提示（§3.2，一次性）：熟客都會來翻／周姐來了。老闆其他話講完、沒人在聊天才說；那位熟客頭上閃星 4 秒
  function sparkle(sl) {
    var t = st(); if (!t || !t.anchor) return;                 // reduced-motion：照樣標，只是不閃（style.css）
    var a = null; try { a = t.anchor(sl.id); } catch (_) {}
    if (!a) return;
    var old = a.querySelector && a.querySelector('.cw-spark'); if (old) old.remove();
    var s = D.createElement('i'); s.className = 'cw-spark'; s.setAttribute('aria-hidden', 'true');
    a.appendChild(s);
    setTimeout(function () { if (s.parentNode) s.remove(); }, SPARK_MS / fastK());
  }
  function hintCheck() {
    if (typeof H.hint !== 'function') return;
    // 安靜夠久才講：沒有人在聊天、老闆與挑戰者都沒在講、主線客人與老闆沒在固定路線上走（客人推門走到對戰台、說完開場白之後）
    var q = !S.chat && !S.blocks.length;
    try { if (q && typeof H.quiet === 'function' && !H.quiet()) q = false; } catch (_) { q = false; }
    if (!q) { S.quietAt = null; return; }
    if (S.quietAt == null) S.quietAt = S.t;
    if (S.t - S.quietAt < 1200) return;
    var ready = slotOn().filter(function (sl) {
      if (!sl.who || sl.phase !== 'stay' || sl.walking || sl.hiddenDuel || chatting(sl)) return false;
      var p = posOf(sl); return !!p && p[1] >= num((cf('hot') || DEF.hot).minY, 150);
    });
    var zj = ready.filter(function (sl) { return (C().regulars[sl.who] || {}).expert; })[0];
    var reg = ready[0];
    var kind = reg && H.hint('intro', true) ? 'intro' : (zj && H.hint('expertIntro', true) ? 'expertIntro' : null);
    if (!kind) return;
    var text = H.hint(kind);                                   // ui.js：記 save.seen、存檔、回那句
    if (!text) return;
    ownerTalk([{ text: text }]);
    sparkle(kind === 'intro' ? reg : zj);
  }

  // ------------------------------------------------------------------ 除錯（__lab.crowd，?debug=1）
  function spawn(who, stopId, o) {
    o = o || {};
    var t = st(), s = stopById(stopId); if (!t || !s) return null;
    var id = o.slot || freeSlot(); if (!id) return null;
    var li = null;
    if (/^passer\d$/.test(String(who))) { li = +String(who).slice(6); who = null; }
    else if (!(C().regulars || {})[who]) return null;
    var sl = newSlot(id, who, li, 900 + S.k);
    sl.seed = 'spawn#' + id + '#' + S.k++;
    S.slots[id] = sl;
    sl.frozen = !!o.freeze;
    if (s.kind === 'pay') sl.holding = o.card || shelfCard(stopById('c-rock'), sl.seed) || shelfCard(stopById('c-soul'), sl.seed);
    t.put(id, keyOf(s), sl.look); t.hide(id, false); t.sil(id, false); t.hold(id, null); t.back(id, false);
    sl.walking = false; sl.dest = [s.x, s.y]; sl.stop = s.id;
    arrive(sl);
    if (o.ms != null) sl.stayLeft = sl.stayTot = o.ms;
    addHot(sl);
    return id;
  }
  function stateOf() {
    var t = st();
    return { mode: S.mode, on: enabled(), paused: hostPaused(), t: Math.round(S.t), tag: S.tag, k: S.k, max: maxN(), n: inside().length,
      locked: S.mode === 'off' ? null : doorLocked(), nextEntryIn: S.nextEntry == null ? null : Math.round(S.nextEntry - S.t), waitRoom: S.waitRoom,
      guarantee: S.guarantee ? { done: !!S.guarantee.done, due: S.guarantee.due == null ? null : Math.round(S.guarantee.due - S.t) } : null,
      reserve: Object.keys(S.reserve), blocks: S.blocks.map(function (b) { return { who: b.who, door: b.door }; }), pDest: S.pDest ? S.pDest.xy : null,
      slots: SLOTS.map(function (id) {
        var sl = S.slots[id]; if (!sl || !sl.on) return { slot: id, on: false };
        var p = t && t.pos(id);
        return { slot: id, on: true, who: sl.who || ('passer' + sl.li), kind: sl.kind, phase: sl.phase, at: sl.at, stop: sl.stop, walking: !!sl.walking,
          x: p ? Math.round(p.x) : null, y: p ? Math.round(p.y) : null, hidden: p ? !!p.hidden : true, hiddenDuel: !!sl.hiddenDuel,
          stayLeft: Math.round(sl.stayLeft || 0), plan: sl.plan, pay: !!sl.pay, holding: sl.holding || null, frozen: !!sl.frozen, pass: !!sl.pass };
      }) };
  }

  var api = {
    version: 'crowd-1',
    configure: function (host) {
      H = host || {};
      if (!S.keyOn) { S.keyOn = true; try { D.addEventListener('keydown', onKey); } catch (_) {} }
      return api;
    },
    start: start,
    stop: stop,
    redraw: function () { chatClose(); slotOn().forEach(function (sl) { var t = st(); if (t) t.say(sl.id, null); }); return api; },   // 來客畫面重畫：人與位置照留、聊天泡泡收掉
    pause: function (on) { S.manualPause = on !== false; return api; },
    yield: yieldTo,
    clearSpot: clearSpot,
    clearRoute: clearRoute,
    clearDuel: clearDuel,
    mode: function () { return S.mode; },
    state: stateOf,
    doorLog: function () { return S.log.slice(); },
    clear: function () { clearAll(); S.guarantee = null; return api; },
    spawn: spawn,
    freezeAt: function (ids) {
      clearAll();
      var R = Object.keys(C().regulars || {});
      (ids || []).slice(0, SLOTS.length).forEach(function (sid, i) { spawn(R[i % R.length], sid, { freeze: true }); });
      S.nextEntry = S.t + 1e12; if (S.guarantee) S.guarantee.done = true;   // 凍結：不再排推門（e2e 指定站位用）
      return stateOf();
    },
    // 聊天（§5）：talk＝點人；ownerTalk(bubbles?)＝老闆講一段（聊聊、第一次提示）；chatClose＝收掉；chatTill＝講到幾時（Date.now 基準）；chatState＝現在誰在講
    talk: talk,
    ownerTalk: ownerTalk,
    chatClose: function () { chatClose(); return api; },
    chatTill: chatTill,
    chatState: chatState,
    chatNext: function () { if (S.chat) chatNext(S.chat); return chatState(); },
    // 第二階段（切磋）：先留空殼，介面照 SPEC-H §11.3
    handOff: function () { return null; },
    takeBack: function () { return null; },
    encActive: function () { return false; },
    encDecline: function () { return Promise.resolve(); },
    _S: function () { return S; }
  };
  W.DipLabCrowd = api;
})();
