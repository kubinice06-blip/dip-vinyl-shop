// game-lab/crowd-core.js — 活店的純函式（SPEC-H 棒 2a）：誰推門進來、停哪一格、路上擋到誰、聊天挑哪一句。
//   UMD：瀏覽器掛 window.DipCrowdCore；node 用 require。沒有 DOM、沒有 Math.random、沒有 Date；同輸入＝同輸出。
//   亂數一律 hash01(標籤)（跟 engine.js 的 hash01 同一個算法、同一個值），不吃 run.rng（不動主線亂數）。
//
// 介面（SPEC-H §11.3「人流與聊天純函式」）：
//   chatPick({ who, pool, seen, n, ctx }) → { cat, ids:[…], seen, recent, lines, mode?, quoteAt? } | null      §5.5、§6.4
//   crowdSeq(seedTag, C, k, ctx)          → { kind:'regular', who } | { kind:'passer', look, li } | null       §2.5
//   pickStop(stops, occupied, reserved, avoid, likes, rnd) → stop id | null                                   §4.1、§4.3
//   onRoute(points, xy, box)              → bool（停在 xy 的人，身體框有沒有被這條路線碰到）                    §4.3
// 另外給導演（棒 4）用的小工具：hash01、seqTag／titleTag／tripTag／titleDayTag、clash、exclusive、needOk、usable、
//   ringLen、noteChat、pickTable、pickRange、weighted、DEF（附錄 A 的預設數字；content.js 的 C.crowd 有就用 C.crowd 的）。
//
// ---------------------------------------------------------------------------------------------------------------------
// chatPick 的輸入（全部可省；省了就當「沒有／不成立」）
//   who   熟客 id（xiaoyu…）｜'passer'｜'owner'
//   pool  台詞陣列（C.chat 或 C.ownerChat 整包；這裡照 line.who === who 篩）。line＝{ id, who, cat, text:'…'|['…','…'], need?, tag }
//   seen  這個人每一類最近講過的 id：{ <cat>:[id…] }（save.regulars.met[id].seen、save.regulars.seen.owner）；
//         傳陣列＝全部分類共用一個環（路人：save.regulars.seen.passer，環長＝floor(0.75×他全部句數)＝22），回傳也是陣列
//   n     save.regulars.n（這份存檔總共聊過幾段；挑法雜湊 hash01(n#who#cat)）
//   ctx   {
//     met:     熟客見過了沒（save.regulars.met[id] 在不在）；沒見過 → hello（一輩子一次）。owner／passer 不看
//     talks:   met[id].talks（close 要 ≥ talk.closeAt、mem 要 ≥ talk.memAt）
//     againAt, runTag: met[id].againAt 跟這一趟的標籤（tripTag(run)；標題回訪用 titleDayTag(seedKey)）；不一樣＝這一趟第一次遇到 → again
//     visit:   這次來（進門到出門）已經講過的分類，照順序（同一分類不連兩段；trip 一次來只講一次）
//     at:      他現在停的停留點 id（need.at 用）；走路中＝null
//     shelf:   他停的那箱架上有沒有卡（陣列或數字；shelf 分類要有）
//     runs:    save.runs.length（mem 要 ≥1）
//     trip:    這一趟的事實（標題回訪沒有 run＝null → trip 不出）：
//              { pos（第幾位，跟畫面上 {pos} 同一個數）, streak, hpHalf, retried, dare, bag, ace, firstRun, newFar, encWon, encLost }
//     metIds:  見過的熟客 id 陣列（老闆句 need.met 用）
//     card:    周姐講知識用的那張卡：{ o, h, c, onShelf, lore（有摘句）, vars:{ artist, album, year, decade, genre, bin, region, tune, axis } }；
//              沒有＝know 不出
//     vars:    填空格的值（{title}{pos}{last}{far}{name}{cash}、shelf 那張卡的 {album}…）；有給就檢查「每個空格都填得到」，填不到的句子不出；
//              沒給（也沒有 card.vars）就不檢查空格。{name} 另外：句子帶 need.met（指定熟客）就算填得到（導演用那位的名字）
//     recent:  這個人最近幾段講過的 id（段的陣列 [[id…],…]，記憶體就好）；有給就保證「同一位連續 recentN＋1 段沒有同一句」；回傳更新後的
//     cat:     硬指定分類（busy、again…；或周姐知識段拆開用 fact／loreIn／loreOut）；count：硬指定幾句
//     expert:  是不是行家（省略＝who === 'zhoujie'）
//     talk:    C.crowd.talk（權重、環長係數…；省略＝DEF.talk）
//   }
// 輸出：cat＝這一段的分類（導演記進 visit）；ids＝依序要講的句子 id（每句可能 1–2 泡）；seen／recent＝更新後的（導演存回去）；
//   mode 'lore'＋quoteAt：周姐摘句段，摘句泡泡插在 ids[quoteAt] 前面；mode 'fact'：樣板段。
//   講完導演做：save.regulars.n += 1；熟客 met[id] = noteChat(met[id], 結果, runTag)。
//
// need（台詞出場條件；未知的鍵＝不成立，寧可不講也不亂講）
//   at:[stop id…]｜'stop'           他現在停在這幾格才講（「這箱的鼓…」這種綁站位的句子）
//   onShelf:true                     那張卡真的在架上（說「在哪一箱」的樣板）
//   o／h／c: 4｜'>=4'｜'<=2'｜[lo,hi]  三軸（數字＝至少）
//   posGte／posLte／streakGte／bagGte: 數字；hpHalf／retried／dare／firstRun／newFar／encWon／encLost: true（false＝要不成立）
//   ace: 'pearl'｜['hall','heresy']；met: 'zhoujie'｜['a','b']（都見過）｜true（見過任何一位）
//   以上 trip 類的鍵（at、onShelf、三軸、met 以外）都要有 ctx.trip（標題回訪沒有 run → 不成立）
// ---------------------------------------------------------------------------------------------------------------------
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DipCrowdCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ---------- 亂數：跟 engine.js hash01 同一個算法（fnv1a32＋fmix），值一模一樣 ----------
  function fnv1a32(str) { let h = 0x811c9dc5; str = String(str); for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; }
  function hash01(str) { let h = fnv1a32(str); h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return (h >>> 0) / 4294967296; }

  // ---------- 附錄 A 的預設（content.js C.crowd 有就用那份） ----------
  const DEF = {
    kinds: { regular: 0.65, passer: 0.35 },
    recent: 60000,                        // 離開不到 60 秒的人不再抽
    likeW: 3, otherSide: 2,               // 愛停的點 ×3、第二三位挑另一排 ×2
    talk: { trip: 0.35, ringK: 0.75, closeAt: 8, memAt: 12, loreP: 0.8, recentN: 9,
            w: { chat: 40, dig: 25, shelf: 15, close: 10, mem: 10 }, expert: { know: 55, chat: 25, trip: 10, mem: 10 } }
  };
  const EXPERT = 'zhoujie';
  const ROOM = [38, 44];                  // 兩個站著的人 |dx|<38 且 |dy|<44 算撞（ui.js ROOM_DX/DY、check-shops STATIC_DX/DY）
  const BODY = [20, 14];                  // 身體疊在一起 |dx|<20 且 |dy|<14（路線清路用）

  const isArr = Array.isArray;
  const num = v => typeof v === 'number' && isFinite(v);
  const clamp01 = u => (num(u) ? Math.min(Math.max(u, 0), 0.999999999) : 0);
  const textsOf = line => (line == null ? [] : isArr(line.text) ? line.text.map(String) : [String(line.text == null ? '' : line.text)]);

  // ---------- 標籤（雜湊的種子字串） ----------
  // 來客畫面：seedKey#runNo#pos（crowdSeq 再接 #crowd#k）；標題回訪（沒有 run）：title#runs.length#當天種子鍵（不用 save.runSeq，它是物件）
  function seqTag(run) { return (run && run.seedKey) + '#' + (run && run.runNo) + '#' + (run && run.pos); }
  function titleTag(runsLength, seedKey) { return 'title#' + (runsLength | 0) + '#' + seedKey; }
  // again 用的「這一趟」標籤（met[id].againAt）：一趟＝seedKey#runNo；標題回訪＝同一天（title#seedKey）
  function tripTag(run) { return (run && run.seedKey) + '#' + (run && run.runNo); }
  function titleDayTag(seedKey) { return 'title#' + seedKey; }

  // ---------- 加權挑一個（照陣列順序累加；u∈[0,1)） ----------
  function weighted(items, wOf, u) {
    let tot = 0; const w = items.map(x => { const v = Math.max(0, +wOf(x) || 0); tot += v; return v; });
    if (!(tot > 0)) return null;
    let t = clamp01(u) * tot;
    for (let i = 0; i < items.length; i++) { if (w[i] <= 0) continue; if (t < w[i]) return items[i]; t -= w[i]; }
    for (let i = items.length - 1; i >= 0; i--) if (w[i] > 0) return items[i];
    return null;
  }
  // [[值, 權重], …] 挑一個（startInside、stops.n 這種表）
  function pickTable(pairs, u) { const r = weighted(pairs || [], p => p[1], u); return r ? r[0] : null; }
  // [a, b] 之間（停多久、間隔多久）
  function pickRange(ab, u) { return isArr(ab) ? ab[0] + (ab[1] - ab[0]) * clamp01(u) : +ab || 0; }

  // =====================================================================================================================
  // 停留點、互斥、路線（§4.1、§4.3）
  // stops＝Stage.crowdStops() 的形狀：[{ id, x, y, side:'left'|'right', pose, kind, back, short, guestClear, hotPri }]
  // =====================================================================================================================
  function xyOf(p, stops) {
    if (p == null) return null;
    if (typeof p === 'string') { const s = (stops || []).find(t => t.id === p); return s ? [s.x, s.y] : null; }
    if (isArr(p)) return p.length >= 2 && num(+p[0]) && num(+p[1]) ? [+p[0], +p[1]] : null;
    if (num(p.x) && num(p.y)) return [p.x, p.y];
    if (isArr(p.at)) return xyOf(p.at, stops);
    return null;
  }
  // 兩個站著的人撞不撞（預設 38×44；dims 可傳 [dx, dy]）
  function clash(a, b, dims) {
    const A = xyOf(a), B = xyOf(b); if (!A || !B) return false;
    const d = dims || ROOM;
    return Math.abs(A[0] - B[0]) < d[0] && Math.abs(A[1] - B[1]) < d[1];
  }
  // 停留點互斥表：{ id:[跟它撞的其他停留點 id…] }（照座標算；§4.3 的表）
  function exclusive(stops, dims) {
    const out = {};
    for (const s of stops || []) out[s.id] = (stops || []).filter(t => t.id !== s.id && clash(s, t, dims)).map(t => t.id);
    return out;
  }

  // 路線（點列）的身體框有沒有碰到停在 xy 的人：線段跟開區間矩形 (x±bw, y±bh) 有沒有交集（精確，不取樣）
  function segHits(a, b, x, y, bw, bh) {
    let lo = -Infinity, hi = Infinity;
    const ax = a[0], ay = a[1], dx = b[0] - ax, dy = b[1] - ay;
    if (dx === 0) { if (!(Math.abs(ax - x) < bw)) return false; }
    else { let t0 = (x - bw - ax) / dx, t1 = (x + bw - ax) / dx; if (t0 > t1) { const t = t0; t0 = t1; t1 = t; } lo = Math.max(lo, t0); hi = Math.min(hi, t1); }
    if (dy === 0) { if (!(Math.abs(ay - y) < bh)) return false; }
    else { let t0 = (y - bh - ay) / dy, t1 = (y + bh - ay) / dy; if (t0 > t1) { const t = t0; t0 = t1; t1 = t; } lo = Math.max(lo, t0); hi = Math.min(hi, t1); }
    return lo < hi && lo < 1 && hi > 0;
  }
  function onRoute(points, xy, box) {
    const P = xyOf(xy); if (!P || !isArr(points) || !points.length) return false;
    const bx = box ? (isArr(box) ? box : [box.dx != null ? box.dx : box.w, box.dy != null ? box.dy : box.h]) : BODY;
    const bw = +bx[0] || BODY[0], bh = +bx[1] || BODY[1];
    const pts = points.map(p => xyOf(p)).filter(Boolean);
    if (pts.length === 1) return Math.abs(pts[0][0] - P[0]) < bw && Math.abs(pts[0][1] - P[1]) < bh;
    for (let i = 1; i < pts.length; i++) if (segHits(pts[i - 1], pts[i], P[0], P[1], bw, bh)) return true;
    return false;
  }

  // avoid 可以是：函式 stop → true＝不要這格｜一條路線（點列）｜多條路線｜{ routes, box, fn }
  function avoidFn(avoid) {
    if (!avoid) return () => false;
    if (typeof avoid === 'function') return avoid;
    let routes = [], box = null, fn = null;
    if (isArr(avoid)) routes = avoid.length && isArr(avoid[0]) && !isArr(avoid[0][0]) && num(+avoid[0][0]) ? [avoid] : avoid;
    else { routes = avoid.routes || (avoid.route ? [avoid.route] : []); box = avoid.box || null; fn = typeof avoid.fn === 'function' ? avoid.fn : null; }
    return s => (fn && fn(s)) || routes.some(r => onRoute(r, [s.x, s.y], box));
  }

  // 挑一個停留點（§4.3）
  //   occupied：要閃開的人（停留點 id｜[x,y]｜{x,y}）：你 p（現在位置與目的地）、老闆 o、f（現在與目的地）、其他走動的人已佔或已預約的格。跟它們撞（38×44）的格不挑
  //   reserved：只排除那幾格本身的 id（主線客人走路時的 c-listen、攤位時的 c-pay、他自己現在站的那格（換箱要換一箱））
  //   avoid：清路時「不碰這條路」（見 avoidFn）；clearDuel 要另外排除「頭會被切」的格就傳函式
  //   likes：[stop id…]（愛停的點 ×likeW）｜{ ids, side:'left'|'right'（第二三位優先另一排）, likeW, sideW }
  //   rnd：[0,1) 的數，或回傳這種數的函式
  function pickStop(stops, occupied, reserved, avoid, likes, rnd) {
    const S = isArr(stops) ? stops.filter(s => s && s.id != null && num(s.x) && num(s.y)) : [];
    const occ = (occupied || []).map(p => xyOf(p, S)).filter(Boolean);
    const res = new Set((reserved || []).map(String));
    const av = avoidFn(avoid);
    const L = likes ? (isArr(likes) ? { ids: likes } : likes) : {};
    const likeIds = new Set((L.ids || []).map(String));
    const likeW = num(L.likeW) ? L.likeW : DEF.likeW, sideW = num(L.sideW) ? L.sideW : DEF.otherSide;
    const cand = S.filter(s => !res.has(String(s.id)) && !occ.some(p => clash(p, [s.x, s.y])) && !av(s));
    if (!cand.length) return null;
    const u = typeof rnd === 'function' ? rnd() : rnd;
    const got = weighted(cand, s => (likeIds.has(String(s.id)) ? likeW : 1) * (L.side && s.side === L.side ? sideW : 1), u);
    return got ? got.id : null;
  }

  // =====================================================================================================================
  // 誰推門進來（§2.5）
  //   seedTag：seqTag(run)（來客畫面）或 titleTag(runs.length, seedKey)（標題回訪）；k＝這個空檔第幾次推門
  //   ctx：{ inside:[已在店裡的熟客 id], left:{ id: 離開時間 ms }, now: ms, enc: 這一位的切磋邀請者 id（或陣列）,
  //          looks:[店裡路人正在用的外觀序號], boost:{ id: 倍數 }（店裡空著開場時小魚 ×2） }
  //   回傳 { kind:'regular', who } ｜ { kind:'passer', look: C.crowd.passers[li], li } ｜ null（沒有人能來）
  // =====================================================================================================================
  function crowdSeq(seedTag, C, k, ctx) {
    ctx = ctx || {};
    const cfg = (C && C.crowd) || {};
    const kinds = cfg.kinds || DEF.kinds;
    const pr = (+kinds.regular || 0) / Math.max(1e-9, (+kinds.regular || 0) + (+kinds.passer || 0));
    const recentMs = num(cfg.recent) ? cfg.recent : DEF.recent;
    const base = String(seedTag) + '#crowd#' + (k | 0);
    const inside = new Set((ctx.inside || []).map(String));
    const enc = new Set((isArr(ctx.enc) ? ctx.enc : ctx.enc ? [ctx.enc] : []).map(String));
    const left = ctx.left || {}, now = num(ctx.now) ? ctx.now : null, boost = ctx.boost || {};
    const R = (C && C.regulars) || {};
    const regs = Object.keys(R).filter(id => {
      if (inside.has(id) || enc.has(id)) return false;
      const t = left[id];
      if (num(t) && (now == null || now - t < recentMs)) return false;   // 剛走的人（不知道現在幾點＝當剛走）
      return (+(R[id] && R[id].weight) || 0) > 0;
    });
    const P = isArr(cfg.passers) ? cfg.passers : [];
    const used = new Set((ctx.looks || []).map(Number));
    const looks = P.map((look, li) => ({ look, li })).filter(x => x.look && !used.has(x.li));
    const regular = () => { const id = weighted(regs, id => (+R[id].weight || 0) * (num(boost[id]) ? boost[id] : 1), hash01(base + '#who')); return id ? { kind: 'regular', who: id } : null; };
    const passer = () => { if (!looks.length) return null; const x = looks[Math.floor(clamp01(hash01(base + '#look')) * looks.length)]; return { kind: 'passer', look: x.look, li: x.li }; };
    return hash01(base + '#kind') < pr ? (regular() || passer()) : (passer() || regular());
  }

  // =====================================================================================================================
  // 聊天挑句（§5.5、§6.4）
  // =====================================================================================================================
  const TRIP_KEYS = { posGte: 1, posLte: 1, streakGte: 1, bagGte: 1, hpHalf: 1, retried: 1, dare: 1, firstRun: 1, newFar: 1, encWon: 1, encLost: 1, ace: 1 };
  const TRIP_FIELD = { posGte: 'pos', posLte: 'pos', streakGte: 'streak', bagGte: 'bag' };
  function cmpAxis(v, spec) {
    if (!num(v)) return false;
    if (num(spec)) return v >= spec;
    if (isArr(spec)) return (spec[0] == null || v >= spec[0]) && (spec[1] == null || v <= spec[1]);
    const m = /^\s*(>=|<=|>|<|=|==)?\s*(-?\d+(?:\.\d+)?)\s*$/.exec(String(spec));
    if (!m) return false;
    const x = +m[2];
    switch (m[1]) { case '<=': return v <= x; case '>': return v > x; case '<': return v < x; case '=': case '==': return v === x; default: return v >= x; }
  }
  // 這句的 need 成不成立
  function needOk(line, ctx) {
    const need = line && line.need; if (!need) return true;
    ctx = ctx || {};
    for (const key of Object.keys(need)) {
      const v = need[key];
      if (key === 'at') { const at = isArr(v) ? v : [v]; if (!ctx.at || at.indexOf(ctx.at) < 0) return false; continue; }
      if (key === 'onShelf') { if (!!(ctx.card && ctx.card.onShelf) !== !!v) return false; continue; }
      if (key === 'o' || key === 'h' || key === 'c') { if (!ctx.card || !cmpAxis(ctx.card[key], v)) return false; continue; }
      if (key === 'met') {
        const M = new Set((ctx.metIds || []).map(String));
        if (v === true) { if (!M.size) return false; } else if (v === false) { if (M.size) return false; }
        else if (!(isArr(v) ? v : [v]).every(id => M.has(String(id)))) return false;
        continue;
      }
      if (!TRIP_KEYS[key]) return false;            // 不認得的鍵：不講
      const T = ctx.trip; if (!T) return false;     // 標題回訪沒有 run：trip 類不出
      if (TRIP_FIELD[key]) { const x = T[TRIP_FIELD[key]]; if (!num(x) || !num(+v)) return false; if (key === 'posLte' ? x > +v : x < +v) return false; continue; }
      if (key === 'ace') { if (!(isArr(v) ? v : [v]).some(a => a === T.ace)) return false; continue; }
      if (!!T[key] !== !!v) return false;
    }
    return true;
  }
  // 空格填不填得到（有給 vars 才檢查）
  function holesOk(line, vars) {
    if (!vars) return true;
    for (const t of textsOf(line)) {
      const re = /\{([a-zA-Z]+)\}/g; let m;
      while ((m = re.exec(t))) {
        const k = m[1], v = vars[k];
        if (k === 'name' && line.need && line.need.met && line.need.met !== true && !isArr(line.need.met)) continue;
        if (v == null || v === '' || (typeof v === 'number' && !isFinite(v))) return false;
      }
    }
    return true;
  }
  function varsOf(ctx) {
    const a = ctx && ctx.vars, b = ctx && ctx.card && ctx.card.vars;
    if (!a && !b) return null;
    return Object.assign({}, b || {}, a || {});
  }
  function usable(line, ctx) { return needOk(line, ctx) && holesOk(line, varsOf(ctx)); }
  function ringLen(count, k) { return Math.max(1, Math.floor((num(k) ? k : DEF.talk.ringK) * (count | 0))); }

  // 一段講完，熟客的 met 紀錄怎麼更新（導演存回 save.regulars.met[id]）：talks+1、hello／again 記這一趟、seen 換成新的
  function noteChat(rec, res, runTag) {
    const r = rec && typeof rec === 'object' ? rec : {};
    const cat = res && res.cat;
    return {
      talks: (Math.max(0, r.talks | 0)) + 1,
      againAt: (cat === 'hello' || cat === 'again') && runTag != null ? String(runTag) : (typeof r.againAt === 'string' ? r.againAt : ''),
      seen: res && res.seen && !isArr(res.seen) ? res.seen : (r.seen || {})
    };
  }

  // 周姐樣板講的是哪件事（同一段兩泡不講同一件）：{year}{decade}＝發行時間、{genre}{region}{tune}{axis}、{bin}＝在架上；need 的三軸各算一件
  const TOPIC_HOLES = { year: 'time', decade: 'time', genre: 'genre', region: 'region', tune: 'tune', axis: 'axis', bin: 'shelf' };
  function topicsOf(line) {
    const out = [];
    textsOf(line).join('').replace(/\{(\w+)\}/g, (m, k) => { if (TOPIC_HOLES[k] && out.indexOf(TOPIC_HOLES[k]) < 0) out.push(TOPIC_HOLES[k]); return m; });
    const nd = (line && line.need) || {};
    ['o', 'h', 'c'].forEach(k => { if (nd[k] != null && out.indexOf(k) < 0) out.push(k); });
    if (nd.onShelf && out.indexOf('shelf') < 0) out.push('shelf');
    if (out.indexOf('axis') >= 0) ['o', 'h', 'c'].forEach(k => { if (out.indexOf(k) < 0) out.push(k); });   // {axis}＝最高的那一軸：跟任何一軸的評價都算同一件
    return out;
  }
  // 這一句有沒有說出是哪張（{album} 或 {artist}）
  function namesCard(line) { return /\{(album|artist)\}/.test(textsOf(line).join('')); }

  function chatPick(o) {
    o = o || {};
    const who = String(o.who == null ? '' : o.who);
    const ctx = o.ctx || {};
    const T = Object.assign({}, DEF.talk, ctx.talk || {});
    const n = o.n | 0;
    const mine = (isArr(o.pool) ? o.pool : []).filter(l => l && l.id != null && String(l.who) === who);
    if (!mine.length) return null;
    const regular = who !== 'owner' && who !== 'passer';
    const expert = ctx.expert != null ? !!ctx.expert : who === EXPERT;

    // seen：物件（按類）或陣列（共用環）
    const shared = isArr(o.seen);
    const seen0 = shared ? { '*': o.seen.map(String) } : {};
    if (!shared && o.seen && typeof o.seen === 'object') for (const c of Object.keys(o.seen)) if (isArr(o.seen[c])) seen0[c] = o.seen[c].map(String);
    const seen = Object.assign({}, seen0);
    const keyOf = cat => (shared ? '*' : cat);
    const linesIn = cat => (shared && cat === '*' ? mine : mine.filter(l => l.cat === cat));
    const totalOf = cat => (shared ? mine.length : linesIn(cat).length);

    const recentN = Math.max(0, num(T.recentN) ? T.recentN | 0 : DEF.talk.recentN);
    const recent = (isArr(ctx.recent) ? ctx.recent : []).map(s => (isArr(s) ? s.map(String) : [String(s)])).slice(-recentN);
    const recentSet = new Set([].concat.apply([], recent));
    const taken = new Set();   // 這一段已經挑的（同一段不講同一句兩次）

    // 某一類的候選：level 0＝排掉 seen 視窗與 recent；1＝只排 seen 視窗；2＝seen 砍掉較舊的一半再挑（挑到為止）
    //   dry＝只問有沒有（挑分類時），level 2 不真的砍 seen
    function cands(cat, level, dry) {
      const U = linesIn(cat).filter(l => !taken.has(String(l.id)) && usable(l, ctx));
      if (!U.length) return [];
      const key = keyOf(cat), uid = new Set(U.map(l => String(l.id)));
      let list = (seen[key] || []).filter(id => uid.has(id));
      if (level >= 2) {
        let s = (seen[key] || []).slice();
        for (;;) {
          const win = s.filter(id => uid.has(id)).slice(-ringLen(U.length, T.ringK));
          const c = U.filter(l => win.indexOf(String(l.id)) < 0);
          if (c.length || !s.length) { if (!dry) seen[key] = s; return c.length ? c : U; }
          s = s.slice(Math.ceil(s.length / 2));        // 砍掉較舊的一半
        }
      }
      const win = new Set(list.slice(-ringLen(U.length, T.ringK)));
      return U.filter(l => !win.has(String(l.id)) && (level >= 1 || !recentSet.has(String(l.id))));
    }
    function candsAny(cat) { for (let lv = 0; lv <= 2; lv++) { const c = cands(cat, lv); if (c.length) return c; } return []; }
    function take(cat, list, salt) {
      if (!list.length) return null;
      const line = list[Math.floor(clamp01(hash01(n + '#' + who + '#' + cat + (salt ? '#' + salt : ''))) * list.length)];
      const id = String(line.id), key = keyOf(cat);
      const s = (seen[key] || []).filter(x => x !== id); s.push(id);
      seen[key] = s.slice(-ringLen(totalOf(shared ? '*' : cat), T.ringK));
      taken.add(id);
      return line;
    }
    function finish(cat, lines, extra) {
      lines = lines.filter(Boolean);
      if (!lines.length) return null;
      const ids = lines.map(l => String(l.id));
      const rec = recent.concat([ids]).slice(-recentN);
      let outSeen;
      if (shared) outSeen = (seen['*'] || []).slice();
      else { outSeen = {}; for (const c of Object.keys(seen)) outSeen[c] = seen[c].slice(); }
      return Object.assign({ cat, ids, seen: outSeen, recent: recentN ? rec : [], lines }, extra || {});
    }
    function oneOf(cat, level) {
      const c = level == null ? candsAny(cat) : cands(cat, level);
      return c.length ? finish(cat, [take(cat, c)]) : null;
    }

    // 周姐知識段（§6.4）：摘句段＝引子 →〔摘句〕→（在架上）「那張就在{bin}那箱」｜收尾；樣板段＝1–2 句欄位樣板
    function knowCan(level) {
      const card = ctx.card; if (!card) return false;
      if (card.lore && cands('loreIn', level, true).length) return true;
      return cands('fact', level, true).length > 0;
    }
    function know(level) {
      const card = ctx.card; if (!card) return null;
      const lore = card.lore && cands('loreIn', level, true).length && hash01(n + '#' + who + '#lore') < (num(T.loreP) ? T.loreP : DEF.talk.loreP);
      if (lore) {
        const a = take('loreIn', cands('loreIn', level));
        let b = null;
        // 收尾可有可無：只挑最近沒講過的（cands level 0）；都講過了就讓摘句當最後一泡（同一位連續 10 段沒有同一句）
        if (card.onShelf) { const f = cands('fact', 0).filter(l => l.need && l.need.onShelf); if (f.length) b = take('fact', f, 'close'); }
        if (!b) { const c = cands('loreOut', 0); if (c.length) b = take('loreOut', c); }
        return finish('know', [a, b], { mode: 'lore', quoteAt: 1 });
      }
      const c = cands('fact', level, true).length ? cands('fact', level) : candsAny('fact');
      if (!c.length) return null;
      // 第一泡一定點名（帶 {album} 或 {artist}；build2 審查：「我看這張標冷冽…」整段沒說是哪張），沒有點名的樣板只當第二泡
      const off = c.filter(l => !(l.need && l.need.onShelf)), pool1 = off.length ? off : c, named1 = pool1.filter(namesCard);
      if (!named1.length) return null;
      const first = take('fact', named1);
      const want2 = num(ctx.count) ? ctx.count >= 2 : hash01(n + '#' + who + '#fact2') < 0.5;
      let second = null;
      // 第二泡不跟第一泡講同一件事（年份／年代算同一件、同一個軸算同一件；build2 審查：12.5% 的兩泡段講兩次年份）
      if (want2) { const t1 = topicsOf(first), c2 = cands('fact', 0).filter(l => !topicsOf(l).some(x => t1.indexOf(x) >= 0)); if (c2.length) second = take('fact', c2, '2'); }
      return finish('know', [first, second], { mode: 'fact' });
    }

    // ---------- 硬指定分類 ----------
    if (ctx.cat) {
      if (ctx.cat === 'know') return know(0) || know(1) || know(2);
      const want = num(ctx.count) ? Math.max(1, ctx.count | 0) : 1, got = [];
      for (let i = 0; i < want; i++) { const c = candsAny(ctx.cat); if (!c.length) break; got.push(take(ctx.cat, c, i ? String(i) : '')); }
      return got.length ? finish(ctx.cat, got) : null;
    }

    // ---------- 1. 先挑分類 ----------
    // 沒見過 → hello（一段：照台詞表順序取到 2 泡為止）
    if (regular && !ctx.met) {
      const H = linesIn('hello').filter(l => usable(l, ctx));
      if (H.length) {
        const got = []; let bubbles = 0;
        for (const l of H) { got.push(l); taken.add(String(l.id)); bubbles += textsOf(l).length; if (bubbles >= 2) break; }
        for (const l of got) { const key = keyOf('hello'), s = (seen[key] || []).filter(x => x !== String(l.id)); s.push(String(l.id)); seen[key] = s.slice(-ringLen(totalOf(shared ? '*' : 'hello'), T.ringK)); }
        return finish('hello', got);
      }
    }
    // 這一趟第一次遇到他的第一段 → again。同一次來（進門到出門）已經打過招呼的不再講（標題認識了他、按繼續他還在店裡＝同一次來；build2 審查）
    const greeted = isArr(ctx.visit) && (ctx.visit.indexOf('hello') >= 0 || ctx.visit.indexOf('again') >= 0);
    if (regular && ctx.met && !greeted && ctx.runTag != null && String(ctx.againAt == null ? '' : ctx.againAt) !== String(ctx.runTag)) {
      const r = oneOf('again');
      if (r) return r;
    }
    const W = Object.assign({}, expert ? T.expert : T.w);
    const visit = isArr(ctx.visit) ? ctx.visit : [];
    const talks = Math.max(0, ctx.talks | 0);
    const gate = {
      shelf: () => (isArr(ctx.shelf) ? ctx.shelf.length > 0 : num(ctx.shelf) ? ctx.shelf > 0 : !!ctx.shelf),
      close: () => talks >= (num(T.closeAt) ? T.closeAt : DEF.talk.closeAt),
      mem: () => (ctx.runs | 0) >= 1 && talks >= (num(T.memAt) ? T.memAt : DEF.talk.memAt),
      trip: () => !!ctx.trip && visit.indexOf('trip') < 0
    };
    const can = (cat, level) => (gate[cat] ? gate[cat]() : true) && (cat === 'know' ? knowCan(level) : cands(cat, level, true).length > 0);
    for (let level = 0; level <= 2; level++) {
      // trip：權重表沒有它（熟客、老闆）→ 有條件成立而且這次來還沒講過 → 35%
      if (!('trip' in W) && can('trip', level) && hash01(n + '#' + who + '#trip') < (num(T.trip) ? T.trip : DEF.talk.trip)) return oneOf('trip', level);
      let avail = Object.keys(W).filter(cat => (+W[cat] || 0) > 0 && can(cat, level));
      const last = visit.length ? visit[visit.length - 1] : null;
      if (last && avail.length > 1) avail = avail.filter(c => c !== last);   // 同一次來不連兩段同類（只剩一類除外）
      if (!avail.length) continue;
      const cat = weighted(avail, c => W[c], hash01(n + '#' + who + '#cat'));
      if (!cat) continue;
      if (cat === 'know') { const r = know(level); if (r) return r; continue; }
      return oneOf(cat, level);
    }
    return null;
  }

  return {
    VERSION: 'crowd-core-1', DEF, ROOM, BODY, EXPERT,
    hash01, weighted, pickTable, pickRange,
    seqTag, titleTag, tripTag, titleDayTag,
    clash, exclusive, onRoute, pickStop,
    crowdSeq,
    needOk, usable, ringLen, noteChat, chatPick, topicsOf, namesCard
  };
});
