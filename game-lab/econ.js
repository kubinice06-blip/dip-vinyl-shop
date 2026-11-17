/* game-lab/econ.js：經濟介面（SPEC-v4 §2.5.6；D §6）。B3。
 *
 * window.DipLabEcon = {
 *   configure({ content, engine, stage, run:()=>save.run, choose:(ch)=>res, info:(card)=>Promise, sfx, toast, app:()=>#app,
 *               coverBase?, relicIcon?(id,size), makeRoom?([x,y]), onSellOpen?() })   // onSellOpen：櫃檯「賣給老闆」分頁打開了（ui.js 記 save.seen.counterSell）   // makeRoom：你要走去站的位置旁邊有人時，ui.js 請他讓開   // ui.js boot 呼叫（B2，§2.5.2）；沒 configure 就呼叫別的方法 → console.error 並 resolve，不丟例外
 *   openBin(key)      → Promise<void>     // 走過去翻 → 抽屜（一張大封面翻著看）→ 關掉才 resolve；key==='sale' 轉 openBargain
 *                                         //   標題＝名牌英文＋中文（C.bins[key].label／zh；FEATURE 金色名牌）；每張標稀有度（C.rarityZh）與價（engine.priceOf）
 *   openBargain()     → Promise<void>     // 之後買特價箱（每張 $100／200／300、最多三張，付挑的那幾張的總和）；還沒挑過開局三張（canBargainPick）→ 轉 bargainPick
 *   bargainPick(o)    → Promise<ids|null> // 開局挑三張（免費）；o = { prompt }；被外部 close() 收掉時回 null
 *   openRelicShop(o?) → Promise<void>     // 櫃檯：兩個分頁「配件」（2–3 件，滿 3 件先半價賣一件）／「賣給老闆」（第 A 波 5）；o.tab＝'sell' 直接開賣給老闆
 *   openCounterSell() → Promise<void>     // ＝openRelicShop({tab:'sell'})（來客畫面點老闆選「賣給老闆」）
 *   moneyHTML(n)      → string            // 「$1,200」（千分位＝engine.moneyText；FIXLIST 8）
 *   isOpen() → bool ; close()
 * }
 *
 * 規則（D §6、SPEC-v4 §2.5.6）：
 *   - 點箱子：你的人物照路線走到那一箱的 stand（1.5 倍速，走路途中點一下＝直接走到），到了才翻（pose dig）、才開抽屜；那一箱一直描框。
 *   - 抽屜＝#app 底部的面板，最高 #app 的 50%（內容照可用高度縮放，不捲動）；開的同時 stage.focus(那一箱, {panelMin: 抽屜高})，箱子整個留在畫面上。
 *   - 點抽屜外面（或 ✕、Esc）關掉：stage.highlight([])、stage.unfocus()、pose null。開局挑三張不能關（一定要挑）。
 *   - 序章／對決中（run.duel、prologue 'pending'、等你收獎勵）點箱子：老闆說 C.shopLines.binBusy（「打完再翻。」），不開抽屜。
 *   - 沒有 run（標題畫面、這一趟結束了）：抽屜列那一區卡池的前 6 張，只能翻、看唱片資訊；有 run 但 !canShop：列這一輪的貨，一樣不能買。
 *   - 價格、賣回、能不能買全部問引擎（priceOf／bargainPriceOf／relicPrice／sellValue／rarity／canShop／canBargainPick），交易一律走 configure 給的 choose。
 *   - 台幣行情（FIXLIST 8）：箱子／新進／店長推薦照稀有度 $800／1,000／1,200；FEATURE 史詩 $3,000／傳奇 $4,000；特價箱每張 $100–300（序章挑三張免費：價錢劃掉）；
 *     配件一件 $3,000；賣回半價。畫面上的錢一律千分位（mt＝engine.moneyText）。
 *   - 移出包包只走櫃檯「賣給老闆」（第 A 波 5；店主 11-16「要去櫃檯賣給老闆才能移出包包，這也是在局中備戰時發生，就是 Monster Train 的方式」）：
 *     買唱片、買特價箱都不能順手賣（engine 'counterOnly'）；錢不夠＝鈕停用、小字「去櫃檯賣唱片」（C.shopUi.goCounter；包包有能換錢的才寫）。
 *     櫃檯抽屜的「賣給老闆」分頁：列包包每一張（engine.sellQuote）：一般唱片「+$半價」、老闆送的／櫃裡帶來的「交還老闆」（$0，engine reclaim）；
 *     點一張＝選它，底下那條問「賣掉《…》？」→「賣給老闆 +$n」／「交還老闆」才賣（engine.choose sell）；包包剩 5 張（bagMin）全停用、說明變紅。
 *     包包長了（20、30 張）：格子縮到 36 px 還放不下，就把封面放回 56 px、讓格子那一區自己捲（.ec-scroll），標題、說明、鈕留在原位；點選重畫時捲到哪留在哪。
 *     排法：能換錢的排前面 → 櫃裡帶來的 → 老闆送的（同一類照包包順序）。交還送的／種子：老闆說一句（C.shopLines.reclaimGift／reclaimSeed）。
 *   - 配件的「先賣一件」（滿 3 件、或錢不夠）照舊。
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
    bag: '包包 {n} 張', binEmpty: '這一箱賣完了，下一位客人來之前會換一批。', owned: '包包裡有了',   // 包包不限張數（店主 11-16）：只寫張數
    binEmptyLot: '這一批的這一箱賣完了，打完傳說藏家整批換新。', binEmptyRound: '這一箱賣完了，下一輪再補。', wantTag: '你想要的',   // 一檔貨、想要清單（SPEC-B §3.7、§5.3）
    relicSell: '賣這件', relicSold: '「{name}」賣掉，+${n}', relicEmpty: '櫃檯的配件賣完了，下一輪再補。',   // relic
    prev: '上一張', next: '下一張', infoAria: '唱片資訊、試聽',
    relicMoneyShort: '錢不夠：先賣一件，半價 ${n}', relicSellFirst: '先賣一件',
    bargainHint: '挑一到三張', bargainFree: '這次免費',
    giftTag: '老闆送的', seedTag: '櫃裡帶來',   // 賣給老闆：送的／種子的小籤
    // 櫃檯賣給老闆（第 A 波 5）
    relicTab: '配件', sellTab: '賣給老闆', sellTitle: '賣給老闆', sellNote: '半價收。老闆送的、櫃裡帶來的交還老闆。',
    sellAsk: '賣掉《{album}》？', sellGo: '賣給老闆 +${n}', reclaimAsk: '把《{album}》交還老闆？', reclaimGo: '交還老闆', reclaimTag: '交還老闆',
    reclaimed: '《{album}》交還老闆', sellNo: '算了', bagSellMin: '包包至少留 {n} 張，手牌才補得滿。', goCounter: '去櫃檯賣唱片'
  };
  var RAR_ZH = { common: '普通', rare: '稀有', uncommon: '獨特', epic: '史詩', legendary: '傳奇', apex: '頂點' };

  // 封面失敗：1.5 秒後重試同一個 src，再失敗才移除、露出專輯名字卡（CAA 偶發斷；SPEC-B C7）。ui.js 也用這支
  W.DipCoverErr = function (img) {
    if (!img || !img.getAttribute) return;
    if (img.getAttribute('data-r') === '1') { img.remove(); return; }
    img.setAttribute('data-r', '1');
    setTimeout(function () { if (!img.isConnected) return; var u = img.src; img.removeAttribute('src'); img.src = u; }, 1500);
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
  // 千分位（engine.moneyText；FIXLIST 8：畫面一律寫 $1,200）
  function mt(n) { var e = CFG && CFG.engine; if (e && typeof e.moneyText === 'function') return e.moneyText(n); return String(Math.round(+n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function money(n) { return fill(ui('money') || '${n}', { n: mt(n) }); }
  // 稀有度（engine.rarity；名字 C.rarityZh）：箱子抽屜每張都標，FEATURE 放大
  function rarityOf(c) { try { return E().rarity ? E().rarity(c) : null; } catch (_) { return null; } }
  function rarityZh(k) { var z = C().rarityZh || {}; return z[k] || RAR_ZH[k] || ''; }
  function rarHTML(c, cls) { var k = rarityOf(c); return k ? '<span class="ec-rar r-' + k + (cls ? ' ' + cls : '') + '">' + esc(rarityZh(k)) + '</span>' : ''; }
  // 想要清單（run.want；SPEC-B §5.3）：稀有度籤旁的小籤「你想要的」（箱子、特價箱、收音機那格）
  function wanted(r, id) { return !!(r && id && Array.isArray(r.want) && r.want.indexOf(id) >= 0); }
  function wantHTML() { return '<span class="ec-want">' + esc(ui('wantTag')) + '</span>'; }
  // 空箱的字（SPEC-B §3.7）：一檔貨這一箱還有沒賣的（engine.lotLeft）＝下一位會換一批；這一檔賣光＝打完藏家整批換；lot 關＝舊字
  function emptyText(r, key) {
    if ((C().lot || {}).on === false) return ui('binEmptyRound');
    try { if (r && r.shop && r.shop.lot && E().lotLeft && !E().lotLeft(r, key)) return ui('binEmptyLot'); } catch (e) { console.error(e); }
    return ui('binEmpty');
  }
  // 區名：名牌英文＋中文（C.bins[key]：X／Y 契約）；沒有就用舞台給的中文
  function binTitleHTML(key, fallback) {
    var b = (C().bins || {})[key];
    if (!b || !b.label) return esc(fallback || '');
    return '<span class="ec-plate' + (key === 'feature' ? ' gold' : '') + '">' + esc(b.label) + '</span>' + esc(b.zh || fallback || '');
  }
  // 特價箱每一格的價：收音機抽的那張照原價（engine.bargainPriceIn；v5 第六項第二期），其他照特價（bargainPriceOf）
  function bargainPrice(id) {
    try {
      var r = liveRun();
      if (r && E().bargainPriceIn) return E().bargainPriceIn(r, C(), id);
      return E().bargainPriceOf ? E().bargainPriceOf(C(), id) : 100;
    } catch (_) { return null; }
  }
  // 收音機這一輪抽到、擺在特價箱的那張：{cell, id}｜null
  function radioOf(r) { var x = r && r.shop && r.shop.radio; return x && x.id ? x : null; }
  // 那一格的小籤：「● 電台」（色點＝那格頻率；C.radio.tag、C.tunes.colors）
  function radioTagHTML(cell) {
    var T = C().tunes || {}, R = C().radio || {}, col = (T.colors || {})[cell] || '#ccc';
    return '<span class="ec-radio" title="' + esc(((T.names || {})[cell] || '') + '・' + (R.tag || '')) + '"><i style="--tn:' + esc(col) + '" aria-hidden="true"></i><b>' + esc(R.tag || '') + '</b></span>';
  }
  function moneyHTML(n) { return '<span class="ec-money">' + esc(money(n == null ? 0 : n)) + '</span>'; }
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
      (src ? '<img alt="" src="' + esc(src) + '" draggable="false" loading="lazy" onerror="DipCoverErr(this)">' : '');
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
  //   go：箱子／特價箱的唱片——包包有能換錢的就多寫「・去櫃檯賣唱片」（買的時候不能順手賣，第 A 波 5）
  function poorHTML(price, go) { return '<span class="ec-poor' + (go ? ' ec-go' : '') + '">' + esc(ui('noMoney')) + '<small>' + esc(money(price)) + (go ? '・' + esc(ui('goCounter')) : '') + '</small></span>'; }
  // 錢不夠但賣一件就夠（配件）：鈕照樣寫價格，底下小字「先賣一件」
  function sellFirstHTML(price, k) { return '<span class="ec-poor ec-sf">' + esc(fill(ui('buy'), { n: mt(price) })) + '<small>' + esc(ui(k)) + '</small></span>'; }
  function maxOf(vals) { return Math.max.apply(null, vals.concat([0])); }
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
    return lo === hi ? mt(lo) : mt(lo) + '–' + mt(hi);
  }

  // ------------------------------------------------------------------ run 的狀態
  function liveRun() { var r = null; try { r = CFG.run ? CFG.run() : null; } catch (_) {} return r && !r.over ? r : null; }
  // 老闆送的（王牌那組四張；engine.isGift，沒有就看 C.gifts[run.ace]）：賣給老闆時交還（$0），小籤「老闆送的」
  function isGift(r, id) {
    if (!r || !id) return false;
    try { if (E().isGift) return !!E().isGift(r, C(), id); } catch (_) {}
    return id === ((C().aces || {})[r.ace]) || ((C().gifts || {})[r.ace] || []).indexOf(id) >= 0;
  }
  // 從唱片櫃帶來的種子（engine.isSeed；沒有就看 run.seeds）
  function isSeed(r, id) {
    if (!r || !id) return false;
    try { if (E().isSeed) return !!E().isSeed(r, C(), id); } catch (_) {}
    return Array.isArray(r.seeds) && r.seeds.indexOf(id) >= 0;
  }
  // 櫃檯賣給老闆（engine.sellQuote：跟 choose sell 同一套檢查、不改 run）→ {ok, earn, reclaim} 或 {ok:false, error}
  function quote(r, id) { try { return E().sellQuote ? E().sellQuote(r, C(), id) : { ok: false, error: 'badSell' }; } catch (_) { return { ok: false, error: 'badSell' }; } }
  // 錢不夠時要不要寫「去櫃檯賣唱片」：包包至少留 5 張，最多能賣（張數 − 5）張；挑最值錢的那幾張賣掉，錢加起來夠買這一張（price）才寫——
  //   賣光也不夠就只寫「錢不夠」，不引你去白賣牌（審查 A-10：開局 $1,000、7 張裡 4 張送的，最多湊 $300，原本 FEATURE $3,000 也叫你去賣）
  function raiseMax(r) {
    var k = r ? r.bag.length - handMin() : 0; if (k <= 0) return 0;
    var vals = r.bag.map(function (id) { var q = quote(r, id); return q.ok ? q.earn | 0 : 0; }).filter(function (v) { return v > 0; }).sort(function (a, b) { return b - a; });
    return vals.slice(0, k).reduce(function (s, v) { return s + v; }, 0);
  }
  function canRaise(r, price) { var m = raiseMax(r); return m > 0 && r.money + m >= price; }
  function handMin() { return (E().CFG && E().CFG.handSize) || 5; }
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
    // 站位旁邊有人（門邊等的第一位客人）：先請他讓開，不要兩個人疊在一起（RT-12；ui.js 給的 makeRoom）
    if (CFG && typeof CFG.makeRoom === 'function') try { CFG.makeRoom(stand.slice(0, 2)); } catch (e) { console.error(e); }
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
    app().classList.add('ec-open');          // 抽屜開著：後面的來客藏起來，不會半截露在抽屜上面（V12）
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
  // 抽屜高（開的時候量一次，給 stage.focus 的 panelMin）；高度變了（變高或變矮）就重新對焦——
  //   變矮沒對焦會在店景與抽屜之間露出一條來客（RT-5／V12：櫃檯「先賣一件」）
  function refocus(ms) {
    var st = ST(); if (!st || !st.focus || !S.el || !S.hotId) return Promise.resolve();
    var h = S.el.offsetHeight;
    if (S.focusH != null && Math.abs(h - S.focusH) < 2 && ms !== 0) return Promise.resolve();
    S.focusH = h;
    return Promise.resolve(st.focus(S.hotId, { panelMin: h, ms: ms == null ? 300 : ms })).catch(function (e) { console.error(e); });
  }

  function close() {
    var was = S.open || S.walking;
    S.token++;
    var st = ST();
    if (S.el) { S.el.remove(); S.el = null; }
    app().classList.remove('ec-open');
    veil(false);
    D.removeEventListener('keydown', onKey, true);
    W.removeEventListener('resize', onResize);
    clearTimeout(S.lpT); clearTimeout(S.lpOpenT); S.lpFired = false; S.lpTile = null;
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
    S.kind = kind; S.key = o.key; S.hotId = o.hotId; S.label = o.label; S.titleHTML = o.title || null; S.mode = o.mode; S.items = o.items || null;
    S.idx = 0; S.sel = []; S.sub = null; S.prompt = o.prompt || ''; S.focusId = null; S.result = kind === 'pick' ? null : undefined;
    S.tab = o.tab || 'relic'; S.spick = null;
    var pr = new Promise(function (res) { S.res = res; });
    approach(tok, o.hotId, o.stand, { dig: o.dig, face: o.face }).then(function (arrived) {
      if (tok !== S.token) return;
      mountDrawer('ec-' + kind, o.label);
      render();
      refocus();
      if (csOn()) sellOpened();
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
    return begin('bin', { key: key, hotId: b.hotId, label: b.label, title: binTitleHTML(key, b.label), stand: b.stand, mode: shop ? 'buy' : 'view', items: items });
  }
  function openBargain() {
    if (!ok('openBargain')) return Promise.resolve();
    var r = liveRun();
    if (busy(r)) { sayBusy(); return Promise.resolve(); }   // 序章途中點特價箱也一樣（序章那次由劇本 O13 直接叫 bargainPick）
    if (r && E().canBargainPick(r)) return bargainPick({}).then(function () {});   // 再來一夜還沒挑開局三張
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
  function openRelicShop(o0) {
    if (!ok('openRelicShop')) return Promise.resolve();
    var r = liveRun();
    if (!r) return Promise.resolve();
    if (busy(r)) { sayBusy(); return Promise.resolve(); }
    var st = ST(), stand = st && st.spot ? st.spot('pay') : null;
    var o = st && st.pos ? st.pos('o') : null, shop = canShop(r);
    // 兩位客人之間才有「賣給老闆」分頁（engine.canShop＝sell 的時機）；其他時候只看配件
    return begin('relic', { key: 'counter', hotId: 'counter', label: ui('relicTitle'), stand: stand, mode: shop ? 'buy' : 'view', dig: false, face: o ? [o.x, o.y] : null,
      tab: shop && o0 && o0.tab === 'sell' ? 'sell' : 'relic' });
  }
  function openCounterSell() { return openRelicShop({ tab: 'sell' }); }

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
        (S.kind === 'relic' && S.tab !== 'sell'
          ? '<span class="ec-rl">' + r.relics.map(function (id) { return '<i>' + relicIconHTML(id, 16) + '</i>'; }).join('') + '<small>' + r.relics.length + '/' + relicMax() + '</small></span>'
          : '<span class="ec-bag">' + esc(fill(ui('bag'), { n: r.bag.length })) + '</span>') + '</span>';
    }
    var x = S.kind === 'pick' ? '' : '<button type="button" class="ec-x" data-a="close" aria-label="' + esc(ui('close')) + '">✕</button>';
    var t = S.titleHTML && title === S.label ? S.titleHTML : esc(title);
    // 櫃檯（兩位客人之間）：標題換成兩個分頁「配件／賣給老闆」（第 A 波 5）
    if (S.kind === 'relic' && S.mode === 'buy' && !S.sub) t = '<span class="ec-tabs" role="tablist">' + [['relic', 'relicTab'], ['sell', 'sellTab']].map(function (x2) {
      var on = (S.tab || 'relic') === x2[0];
      return '<button type="button" class="ec-tab' + (on ? ' on' : '') + '" role="tab" aria-selected="' + on + '" data-a="tab" data-t="' + x2[0] + '">' + esc(ui(x2[1])) + '</button>';
    }).join('') + '</span>';
    return '<div class="ec-hd' + (S.key === 'feature' ? ' ec-feat' : '') + (S.kind === 'relic' && S.mode === 'buy' && !S.sub ? ' ec-hdtabs' : '') + '"><b class="ec-ttl">' + t + '</b>' + (extra || '') + w + x + '</div>';
  }
  // 一張大封面翻著看（箱子）
  function binHTML() {
    var ids = binIds(), r = liveRun();
    if (!ids.length) return headHTML(S.label) + '<p class="ec-empty">' + esc(emptyText(r, S.key)) + '</p>';
    if (S.idx >= ids.length) S.idx = ids.length - 1;
    if (S.idx < 0) S.idx = 0;
    var c = card(ids[S.idx]);
    var btn = '';
    if (S.mode === 'buy' && r) {
      var price = E().priceOf(C(), c);
      var owned = r.bag.indexOf(c.id) >= 0;
      var can = price != null && !owned && r.money >= price;   // 買的時候不能順手賣（第 A 波 5：移出包包只走櫃檯）：錢不夠就停用、指去櫃檯
      btn = '<button type="button" class="ec-buy lb-btn pri" data-a="buy" data-cid="' + esc(c.id) + '"' + (can ? '' : ' disabled') + '>' +
        (owned ? esc(ui('owned')) : !can ? poorHTML(price, price != null && canRaise(r, price)) : esc(fill(ui('buy'), { n: mt(price) }))) + '</button>';
    } else {   // 只看（標題畫面、現在還不能買）：照樣標價
      var pv = E().priceOf(C(), c);
      if (pv != null) btn = '<span class="ec-pv">' + esc(money(pv)) + '</span>';
    }
    var feat = S.key === 'feature', rk = rarityOf(c), wt = wanted(r, c.id) ? wantHTML() : '';
    var n = ids.length;
    return headHTML(S.label) +
      '<div class="ec-flip">' +
        '<div class="ec-one">' +
          '<button type="button" class="ec-cv' + (rk ? ' r-' + rk : '') + '" data-a="info" data-cid="' + esc(c.id) + '" aria-label="' + esc(c.artist + '《' + c.album + '》' + (wt ? '・' + ui('wantTag') : '') + '：' + ui('infoAria')) + '">' + coverImg(c) +
            '<span class="ec-play" aria-hidden="true"></span><span class="ec-pos">' + (S.idx + 1) + '／' + n + '</span>' + (feat ? rarHTML(c, 'ec-rbig') : '') + '</button>' +
          '<div class="ec-meta"><div class="ec-ar">' + esc(c.artist) + '</div><div class="ec-al">' + esc(c.album) + '</div><div class="ec-yr">' + esc(c.year || '') + (feat ? '' : rarHTML(c)) + wt + '</div>' +
            starsHTML(c, { peak: S.mode === 'buy' }) + btn + '</div>' +
        '</div>' +
        '<div class="ec-strip">' +
          '<button type="button" class="ec-nav" data-a="prev" aria-label="' + esc(ui('prev')) + '"' + (n < 2 ? ' disabled' : '') + '>‹</button>' +
          '<div class="ec-ths">' + ids.map(function (id, i) {
            var k = card(id);
            var kr = rarityOf(k), kw = wanted(r, id);   // 想要的：縮圖右上一個粉色角
            return '<button type="button" class="ec-th' + (i === S.idx ? ' on' : '') + (kr ? ' r-' + kr : '') + (kw ? ' ec-w' : '') + '" data-a="go" data-i="' + i + '" aria-label="' + esc(k.artist + '《' + k.album + '》' + (kr ? '・' + rarityZh(kr) : '') + (kw ? '・' + ui('wantTag') : '')) + '"><span class="ec-thc">' + coverImg(k) + '</span></button>';
          }).join('') + '</div>' +
          '<button type="button" class="ec-nav" data-a="next" aria-label="' + esc(ui('next')) + '"' + (n < 2 ? ' disabled' : '') + '>›</button>' +
        '</div>' +
      '</div>';
  }
  // 特價箱（挑三張免費／之後每張 $100–300、最多三張／只看）：六格；每格封面下標那張的特價（序章挑三張那次劃掉＝免費）
  function gridHTML() {
    var ids = binIds(), r = liveRun(), pick = S.kind === 'pick', view = S.mode === 'view';
    S.sel = S.sel.filter(function (id) { return ids.indexOf(id) >= 0; });
    var extra = pick ? '<span class="ec-cnt">' + S.sel.length + '／' + pickN() + '</span>' : '';
    var title = pick ? S.label + '　' + S.prompt : S.label;
    if (pick && S.prompt) extra = '<span class="ec-free">' + esc(ui('bargainFree')) + '</span>' + extra;
    var fc = S.focusId && card(S.focusId);
    var rad = radioOf(r);
    var tiles = ids.map(function (id) {
      var c = card(id), on = S.sel.indexOf(id) >= 0, bp = bargainPrice(id), isRad = !!rad && rad.id === id, w = wanted(r, id);
      var pt = bp == null ? '' : '<span class="ec-pt' + (pick ? ' free' : '') + '">' + (pick ? '<s>' + esc(money(bp)) + '</s>' : esc(fill(ui('bargainEach'), { n: mt(bp) }))) + '</span>';
      return '<button type="button" class="ec-tile' + (on ? ' sel' : '') + '" data-a="' + (view ? 'info' : 'tog') + '" data-cid="' + esc(id) + '"' + (bp == null ? '' : ' data-price="' + bp + '"') + (view ? '' : ' aria-pressed="' + on + '"') +
        ' aria-label="' + esc(c.artist + '《' + c.album + '》' + (isRad ? '（' + ((C().radio || {}).tag || '') + '）' : '') + (w ? '・' + ui('wantTag') : '') + (bp == null ? '' : (pick ? '（免費）' : ' ' + money(bp)))) + '"' + (isRad ? ' data-radio="1"' : '') + '><span class="ec-tcv">' + coverImg(c) + (on ? '<span class="ec-chk" aria-hidden="true">✓</span>' : '') + (isRad ? radioTagHTML(rad.cell) : '') + (w ? wantHTML() : '') + pt + '</span>' + starsHTML(c, { col: true }) + '</button>';
    }).join('');
    var foot = '';
    if (pick) foot = '<button type="button" class="lb-btn pri big wide" data-a="take"' + (S.sel.length === pickN() ? '' : ' disabled') + '>' + esc(ui('bargainTake')) + '</button>';
    else if (!view && r) {
      var k = S.sel.length, price = bargainTotal(S.sel);   // 包包不限張數（店主 11-16）：放得下，錢夠就能買
      var can = k >= 1 && k <= pickN() && r.money >= price;
      var cheapest = Math.min.apply(null, ids.map(bargainPrice).filter(function (v) { return v != null; }).concat([Infinity]));
      var poorAll = r.money < cheapest;   // 連最便宜的一張都買不起
      var label = k < 1 ? (poorAll ? esc(ui('noMoney')) : esc(ui('bargainHint'))) : can ? esc(fill(ui('bargainBuy'), { n: mt(price) })) : poorHTML(price, canRaise(r, price));
      foot = '<button type="button" class="lb-btn pri big wide" data-a="bbuy"' + (can ? '' : ' disabled') + ' data-total="' + price + '">' + label + '</button>';
    }
    return headHTML(title, extra) +
      '<div class="ec-grid' + (ids.length > 6 ? ' ec-g4' : '') + '">' + tiles + '</div>' +   // 收音機多一張（7 張）：改四欄兩排（375×548 三欄三排會太擠；店主 11-15 裁定）
      '<p class="ec-line">' + (fc ? esc(fc.artist + '《' + fc.album + '》') : '&nbsp;') + '</p>' +
      (foot ? '<div class="ec-foot">' + foot + '</div>' : '');
  }
  // 櫃檯的配件
  function relicHTML() {
    var r = liveRun();
    var ids = (r && r.shop && r.shop.relics) || [];
    if (!ids.length) return headHTML(S.label) + '<p class="ec-empty">' + esc(ui('relicEmpty')) + '</p>';
    var full = r.relics.length >= relicMax();
    var maxSell = maxOf(r.relics.map(function (id) { return E().sellValue(C(), id); }));
    return headHTML(S.label) + '<div class="ec-rows">' + ids.map(function (id) {
      var x = relicOf(id); if (!x) return '';
      var price = E().relicPrice(C(), id), short = price != null && r.money < price;
      var can = S.mode === 'buy' && price != null && r.money + (full || short ? maxSell : 0) >= price;   // 滿 3 件、或錢不夠：要先賣一件
      return '<div class="ec-row"><span class="ec-pix">' + relicIconHTML(id, 30) + '</span><span class="ec-tx"><b>' + esc(x.name) + '</b><small>' + esc(x.desc) + '</small></span>' +
        (S.mode === 'buy' ? '<button type="button" class="lb-btn pri ec-rbuy" data-a="rbuy" data-r="' + esc(id) + '"' + (can ? '' : ' disabled') + '>' +
          (!can ? poorHTML(price) : short && !full ? sellFirstHTML(price, 'relicSellFirst') : esc(fill(ui('buy'), { n: mt(price) }))) + '</button>' : '') + '</div>';
    }).join('') + '</div>';
  }
  // 先賣（唱片：錢不夠、賣一張就夠；配件：滿 3 件、或錢不夠）
  function sellHTML() {
    var r = liveRun(), sub = S.sub;
    if (sub.kind === 'relic') {
      var vals = r.relics.map(function (id) { return E().sellValue(C(), id); });
      return headHTML(S.label) + '<p class="ec-msg">' + esc(fill(ui(sub.why === 'money' ? 'relicMoneyShort' : 'relicFull'), { n: range(vals) })) + '</p>' +
        '<div class="ec-rows">' + r.relics.map(function (id) {
          var x = relicOf(id) || { name: id, desc: '' }, on = sub.picks.indexOf(id) >= 0, poor = r.money + E().sellValue(C(), id) < sub.price;
          return '<button type="button" class="ec-row ec-spick' + (on ? ' sel' : '') + (poor ? ' poor' : '') + '" data-a="spick" data-r="' + esc(id) + '" aria-pressed="' + on + '"' + (poor ? ' disabled' : '') + '><span class="ec-pix">' + relicIconHTML(id, 30) + '</span>' +
            '<span class="ec-tx"><b>' + esc(x.name) + '</b><small>' + esc(x.desc) + '</small></span><span class="ec-sv">+' + esc(money(E().sellValue(C(), id))) + '</span></button>';
        }).join('') + '</div>' +
        '<div class="ec-foot two"><button type="button" class="lb-btn" data-a="back">' + esc(ui('close')) + '</button>' +
        '<button type="button" class="lb-btn pri col ec-sellb" data-a="sell"' + (sellReady() ? '' : ' disabled') + '><span>' + esc(ui('relicSell')) + '</span>' + tgtHTML(sub) + '</button></div>';
    }
    return '';
  }
  // 櫃檯「賣給老闆」分頁（第 A 波 5）：包包每一張（engine.sellQuote）；點一張＝選，底下那條問一次才賣（engine.choose sell）
  //   排法：能換錢的 → 櫃裡帶來的 → 老闆送的（同一類照包包順序）；包包剩 5 張（bagMin）全停用、說明變紅
  function counterSellHTML() {
    var r = liveRun();
    if (!r) return headHTML(S.label);
    var atMin = r.bag.length <= handMin();
    if (S.spick && r.bag.indexOf(S.spick) < 0) S.spick = null;
    var rank = function (id) { return isGift(r, id) ? 2 : isSeed(r, id) ? 1 : 0; };
    var order = r.bag.map(function (id, i) { return { id: id, i: i, k: rank(id) }; }).sort(function (a, b) { return a.k - b.k || a.i - b.i; }).map(function (x) { return x.id; });
    var tiles = order.map(function (id) {
      var c = card(id); if (!c) return '';
      var q = quote(r, id), gift = isGift(r, id), seed = !gift && isSeed(r, id), back = !!(q.ok && q.reclaim) || gift || seed, on = S.spick === id;
      var lab = back ? '<span class="ec-sv ' + (gift ? 'ec-gift' : 'ec-seed') + '">' + esc(ui('reclaimTag')) + '</span>' : '<span class="ec-sv">+' + esc(money(q.ok ? q.earn : E().sellValue(C(), c))) + '</span>';
      var tag = gift ? ui('giftTag') : seed ? ui('seedTag') : '';
      return '<button type="button" class="ec-tile ec-spick ec-cs' + (on ? ' sel' : '') + (gift ? ' gift' : '') + (seed ? ' seed' : '') + '" data-a="cpick" data-cid="' + esc(id) + '" aria-pressed="' + on + '"' + (q.ok ? '' : ' disabled') +
        (back ? ' data-back="1"' : '') + ' aria-label="' + esc(c.artist + '《' + c.album + '》' + (tag ? '（' + tag + '）' : '') + '：' + (back ? ui('reclaimTag') : '+' + money(q.ok ? q.earn : 0))) + '">' +
        '<span class="ec-tcv">' + coverImg(c) + (on ? '<span class="ec-chk" aria-hidden="true">✓</span>' : '') + '</span>' + lab + starsHTML(c, { col: true }) + '</button>';
    }).join('');
    var pc = S.spick ? card(S.spick) : null, pq = pc ? quote(r, pc.id) : null, pback = !!(pq && pq.ok && pq.reclaim);
    // 選了一張：底下那條問一次，旁邊「唱片資訊」（賣之前看得到是哪張、試聽；格子長按也開，審查 A-8）
    var line = pc ? '<span class="tx">' + esc(fill(ui(pback ? 'reclaimAsk' : 'sellAsk'), { album: pc.album })) + '</span>' +
      '<button type="button" class="ec-inf" data-a="info" data-cid="' + esc(pc.id) + '">' + esc(ui('sellInfo') || ui('infoAria')) + '</button>' : '&nbsp;';
    var go = pc && pq && pq.ok ? (pback ? esc(ui('reclaimGo')) : esc(fill(ui('sellGo'), { n: mt(pq.earn) }))) : esc(ui('sellTitle'));
    return headHTML(S.label) + '<p class="ec-msg ec-cnote' + (atMin ? '' : ' ok') + '">' + esc(atMin ? fill(ui('bagSellMin'), { n: handMin() }) : ui('sellNote')) + '</p>' +
      '<div class="ec-grid ec-g4">' + tiles + '</div>' +
      '<p class="ec-line ec-cl">' + line + '</p>' +
      '<div class="ec-foot two"><button type="button" class="lb-btn" data-a="cno"' + (pc ? '' : ' disabled') + '>' + esc(ui('sellNo')) + '</button>' +
      '<button type="button" class="lb-btn pri ec-sellb" data-a="cgo"' + (pc && pq && pq.ok ? '' : ' disabled') + '>' + go + '</button></div>';
  }
  // 賣這張鈕下面的小字：賣掉之後要買的是什麼（「《Low》買 $400」）
  //   專輯名太長只切專輯名，價錢一定看得到（V5-play-6：「《Come On Die Young》買…」把價錢切掉了）
  function tgtHTML(sub) { return sub.tgt ? '<span class="sub"><span class="t">' + esc(sub.tgt) + '</span><span class="p">' + esc(fill(ui('buy'), { n: mt(sub.price) })) + '</span></span>' : ''; }
  function sellReady() {
    var r = liveRun(), sub = S.sub; if (!r || !sub || sub.picks.length !== sub.need) return false;
    var earn = sub.picks.reduce(function (s, id) { return s + E().sellValue(C(), id); }, 0);   // 只剩配件的先賣（唱片的先賣拿掉了，第 A 波 5）
    return r.money + earn >= sub.price;
  }

  // ------------------------------------------------------------------ 畫＋量（抽屜最高 #app 的 50%，內容縮到放得下，不捲動；只有先賣子面板包包太長時格子那一區自己捲）
  function sellOpened() { if (CFG && typeof CFG.onSellOpen === 'function') try { CFG.onSellOpen(); } catch (e) { console.error(e); } }
  function csOn() { return S.kind === 'relic' && S.mode === 'buy' && S.tab === 'sell' && !S.sub; }   // 櫃檯「賣給老闆」分頁開著
  function render() {
    var el = S.el; if (!el) return;
    // 賣給老闆的格子自己捲（.ec-scroll）：點一張會整個重畫——捲到哪留在哪（審查：跳回頂端，剛選的那張被捲出畫面）。剛切到這一頁（上一畫不是）從頂端開始
    var g0 = csOn() && el.classList.contains('ec-csell') ? el.querySelector('.ec-grid') : null, keep = g0 ? g0.scrollTop : 0;
    var html = S.sub ? sellHTML() : S.kind === 'bin' ? binHTML() : csOn() ? counterSellHTML() : S.kind === 'relic' ? relicHTML() : gridHTML();
    el.innerHTML = html;
    el.classList.toggle('ec-sub', !!S.sub);
    el.classList.toggle('ec-csell', csOn());
    fit();
    if (keep > 0) { var g1 = el.querySelector('.ec-grid'); if (g1) g1.scrollTop = keep; }
    if (S.focusH != null) refocus();   // 高度變了（賣回子面板變高、先賣一件變矮）就重新對焦：箱子不被蓋到、也不露出後面的來客
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
    el.classList.remove('ec-tight', 'ec-scroll');
    if (over() && el.querySelector('.ec-rows')) el.classList.add('ec-tight');   // 矮螢幕：配件列收成一行（說明藏起來）
    if (grid) {
      var cols = grid.classList.contains('ec-g4') ? 4 : 3, gap = 6;
      var side = cols === 3 ? 30 : 0;   // 三欄：封面右邊放三軸星數
      var t = Math.floor(Math.min((w - 24 - gap * (cols - 1)) / cols - side, cols === 3 ? 104 : 88));
      el.style.setProperty('--ec-tile', t + 'px');
      var t0 = t;
      while (over() && t > 36) { t -= 4; el.style.setProperty('--ec-tile', t + 'px'); }
      // 賣給老闆列整個包包（不限張數，店主 11-16）：縮到 36 px 還放不下（包包長了）→ 封面放回 56 px（看得出是哪張），格子那一區自己捲（標題、說明、鈕不動）；
      //   包包不長（放得下）照舊縮到放得下、不捲
      if (csOn() && over()) { t = Math.min(t0, 56); el.style.setProperty('--ec-tile', t + 'px'); el.classList.add('ec-scroll'); }
      // 封面太窄（375×548 四欄 47 px）：電台籤（約 39 px）會碰到右上的選取勾（18 px）→ 只留色點、不寫字（讀屏字在格子的 aria-label）
      grid.classList.toggle('ec-narrow', t < 64);
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
    if (S.lpFired) {   // 長按放開後的那個 click：在這裡開唱片資訊（先開的話，這個 click 會落在資訊遮罩上把它關掉）
      S.lpFired = false; clearTimeout(S.lpOpenT); e.preventDefault(); e.stopPropagation();
      var lt = S.lpTile; S.lpTile = null; if (lt) { lt.classList.remove('ec-lp'); info(card(lt.getAttribute('data-cid'))); }
      return;
    }
    if (S.swiped) { S.swiped = false; e.preventDefault(); e.stopPropagation(); return; }
    e.stopPropagation();
    var b = e.target.closest && e.target.closest('[data-a]'); if (!b || b.disabled || !S.el || !S.el.contains(b)) return;
    var a = b.getAttribute('data-a');
    // 剛買完：抽屜換成下一張、「買」鈕在同一個位置——連點的第二下不算（RT-2：雙擊買到兩張）
    if (S.lockUntil && Date.now() < S.lockUntil && /^(buy|bbuy|rbuy|sell|spick|tog|take|cpick|cgo)$/.test(a)) return;
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
    if (a === 'spick') { sellPick(b.getAttribute('data-r')); return; }
    if (a === 'tab') { var t2 = b.getAttribute('data-t'); if (t2 !== S.tab) { S.tab = t2; S.spick = null; sfx('tick'); render(); if (t2 === 'sell') sellOpened(); } return; }
    if (a === 'cpick') { var cid = b.getAttribute('data-cid'); S.spick = S.spick === cid ? null : cid; sfx(S.spick ? 'select' : 'tick'); render(); return; }
    if (a === 'cno') { S.spick = null; sfx('tick'); render(); return; }
    if (a === 'cgo') { sellToOwner(S.spick); return; }
    if (a === 'back') { S.sub = null; sfx('tick'); render(); return; }
    if (a === 'sell') { var sub = S.sub; if (sub && sellReady()) sub.done(sub.picks.slice()); return; }
  }
  // 大封面左右滑＝翻；格子長按＝唱片資訊
  function onDown(e) {
    S.swiped = false; S.lpFired = false; clearTimeout(S.lpOpenT);
    if (S.lpTile) { S.lpTile.classList.remove('ec-lp'); S.lpTile = null; }
    var t = e.target.closest && e.target.closest('.ec-cv, .ec-tile');
    if (!t) { S.drag = null; return; }
    S.drag = { x: e.clientX, y: e.clientY, el: t, id: e.pointerId, long: false };
    clearTimeout(S.lpT);
    if (t.classList.contains('ec-tile') && /^(tog|cpick)$/.test(t.getAttribute('data-a') || '')) {   // 特價箱挑牌、櫃檯賣給老闆的格子
      // 長按 450 ms：先標起來（看得到按住了），放開才開唱片資訊
      S.lpT = setTimeout(function () { if (!S.drag || S.drag.el !== t) return; S.drag.long = true; t.classList.add('ec-lp'); }, LONG_MS);
    }
  }
  function onMove(e) {
    var d = S.drag; if (!d || e.pointerId !== d.id) return;
    if (Math.abs(e.clientX - d.x) > 10 || Math.abs(e.clientY - d.y) > 10) { clearTimeout(S.lpT); if (d.long) { d.long = false; d.el.classList.remove('ec-lp'); } }
  }
  function onUp(e) {
    var d = S.drag; S.drag = null; clearTimeout(S.lpT);
    if (!d || e.pointerId !== d.id) return;
    if (d.long) {   // 放開：等補送的 click（在 onClick 開）；瀏覽器沒送 click 就 350 ms 後自己開
      S.lpFired = true; S.lpTile = d.el;
      S.lpOpenT = setTimeout(function () { if (!S.lpFired) return; S.lpFired = false; var lt = S.lpTile; S.lpTile = null; if (lt) { lt.classList.remove('ec-lp'); info(card(lt.getAttribute('data-cid'))); } }, 350);
      return;
    }
    var dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (d.el.classList.contains('ec-cv') && Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy) * 1.3) { S.swiped = true; flip(dx < 0 ? 1 : -1); }
  }
  function onCancel() { if (S.drag && S.drag.long) S.drag.el.classList.remove('ec-lp'); S.drag = null; clearTimeout(S.lpT); }

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
      if (f.loseCard) parts.push(fill(ui('sold'), { album: (card(f.loseCard) || {}).album || '', n: mt(f.earn || 0) }));
      if (f.loseRelic) parts.push(fill(ui('relicSold'), { name: (relicOf(f.loseRelic) || {}).name || '', n: mt(f.earn || 0) }));
      if (f.gainCard) { gains.push((card(f.gainCard) || {}).album || ''); spend += f.spend || 0; }
      if (f.gainRelic) parts.push(fill(ui('relicBought'), { name: (relicOf(f.gainRelic) || {}).name || '', n: mt(f.spend || 0) }));
    });
    if (gains.length) parts.push(fill(ui('bought'), { album: gains.join('》《'), n: mt(spend) }));
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
    if (price != null && r.money < price) { toast(ui('goCounter')); return; }   // 錢不夠（鈕本來就停用）：買的時候不能順手賣，去櫃檯（第 A 波 5）
    done(choose({ type: 'buy', key: S.key, cardId: id }));
  }
  // 櫃檯賣給老闆（第 A 波 5）：engine.choose sell；一般唱片 +半價、送的／種子交還老闆（$0）＋老闆一句；包包剩 5 張 → 說明那行（bagMin）
  function sellToOwner(id) {
    var r = liveRun(); if (!r || !id || !csOn()) return;
    var c = card(id) || {}, res = choose({ type: 'sell', cardId: id });
    S.spick = null;
    if (!res) { render(); return; }
    S.lockUntil = Date.now() + LOCK_MS;
    var f = (res.effects || []).filter(function (x) { return x.loseCard; })[0] || {};
    sfx(f.reclaim ? 'select' : 'readHit');
    if (f.reclaim) {
      toast(fill(ui('reclaimed'), { album: c.album || '' }));
      var st = ST(), L = C().shopLines || {}, t = f.reclaim === 'seed' ? L.reclaimSeed : L.reclaimGift;
      if (t && st && st.say) st.say('o', t, { tone: 'owner', ms: 2400 });
    } else toast(fill(ui('sold'), { album: c.album || '', n: mt(f.earn || 0) }));
    render();
  }
  function bargainTotal(ids) { return ids.reduce(function (s, id) { var p = bargainPrice(id); return s + (p == null ? 0 : p); }, 0); }
  function buyBargain() {
    var r = liveRun(); if (!r || !S.sel.length) return;
    done(choose({ type: 'buyBargain', ids: S.sel.slice() }));   // 包包不限張數（店主 11-16）：不用先賣
  }
  function buyRelic(id) {
    var r = liveRun(); if (!r) return;
    var price = E().relicPrice(C(), id), full = r.relics.length >= relicMax();
    if (full || (price != null && r.money < price)) {   // 滿 3 件、或錢不夠：先賣一件
      S.sub = { kind: 'relic', why: full ? 'full' : 'money', need: 1, picks: [], price: price, tgt: '「' + ((relicOf(id) || {}).name || '') + '」', done: function (picks) { done(choose({ type: 'buyRelic', relicId: id, sellRelicId: picks[0] })); } };
      sfx('tick'); render(); return;
    }
    done(choose({ type: 'buyRelic', relicId: id }));
  }
  var LOCK_MS = 450;
  function done(res) {
    S.sub = null;
    if (res) {
      S.lockUntil = Date.now() + LOCK_MS;
      if (S.el) { var el0 = S.el; el0.classList.add('ec-lock'); setTimeout(function () { el0.classList.remove('ec-lock'); }, LOCK_MS); }
      sfx('readHit'); effectsToast(res);
      S.sel = []; S.focusId = null;
      if (S.kind === 'bargain') { var r = liveRun(); if (r && !(r.shop.bargain || []).length) { render(); setTimeout(function () { if (S.kind === 'bargain') { close(); var st = ST(); if (st && st.say) st.say('o', ui('bargainEmpty'), { tone: 'owner', ms: 2200 }); } }, 600); return; } }
    }
    render();
  }
  function sellPick(id) {   // 配件的先賣（滿 3 件、或錢不夠）
    var sub = S.sub; if (!sub) return;
    var i = sub.picks.indexOf(id);
    if (i >= 0) sub.picks.splice(i, 1);
    else if (sub.picks.length < sub.need) sub.picks.push(id);
    else { sub.picks.shift(); sub.picks.push(id); }
    sfx('select'); render();
  }

  // ------------------------------------------------------------------ 給測試看的
  function debug() {
    return { cfg: !!(CFG && CFG.content && CFG.engine), open: S.open, walking: S.walking, kind: S.kind, key: S.key, mode: S.mode, idx: S.idx, ids: S.open ? binIds() : [], sel: (S.sel || []).slice(),
      sub: S.sub ? { kind: S.sub.kind, why: S.sub.why || 'full', need: S.sub.need, picks: S.sub.picks.slice() } : null, height: S.el ? S.el.offsetHeight : 0, focusH: S.focusH,
      scroll: !!(S.el && S.el.classList.contains('ec-scroll')), tab: S.kind === 'relic' ? S.tab : null, spick: S.spick || null };
  }

  // 新卡的封面晚到（ui.js 媒體載入器發 dip:media）：抽屜開著就重畫一次
  D.addEventListener('dip:media', function () { if (S.open && S.el) try { render(); } catch (e) { console.error(e); } });

  W.DipLabEcon = {
    configure: function (o) { CFG = Object.assign({}, o || {}); return W.DipLabEcon; },
    openBin: openBin, openBargain: openBargain, bargainPick: bargainPick, openRelicShop: openRelicShop, openCounterSell: openCounterSell,
    moneyHTML: function (n) { return CFG && CFG.content ? moneyHTML(n) : '<span class="ec-money">$' + esc(mt(n == null ? 0 : n)) + '</span>'; },
    isOpen: function () { return !!(S.open || S.walking); },
    close: close,
    debug: debug
  };
})();
