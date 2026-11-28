// game-lab/tests/e2e-bgm.mjs：第 I 波 I-4 背景音樂（SPEC-I §4.6）。沒對戰時輪流放包包裡的歌、收音機旁「正在播放」、⏸ 背景音樂三行。
//   需要靜態伺服器（repo 根）：python3 -m http.server 8765
//   LAB_BASE=http://localhost:8779 node game-lab/tests/e2e-bgm.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_URL 或 LAB_BASE、LAB_SIZES（本檔預設 390x664,375x548）；LAB_BGM＝只跑這幾項（例 1,5）；
//     LAB_SHOTS＝資料夾：存給店主看的截圖（deviceScaleFactor 2；來客畫面收音機旁「正在播放」、⏸ 背景音樂三行）
//
// 假播放器：fx.js 讀 window.__dipFakeAudio（只有這支測試設）＝照真的抓檔（window.fetch 換成記帳的替身：試聽網址只回 64 bytes、可設定「這首抓不到」）、
//   不解碼、假 source；fx music._end()＝這首自然放完；calls＝每次 music.play 的紀錄（id、session、當下有沒有聲音）。時間用 page.clock（照常走，fastForward 跳）。
//   navigator.audioSession、navigator.connection 也換成替身（看 'ambient'／'playback'、行動網路）。網址 ?crowd 沒給＝活店關（自動化瀏覽器預設），#13 才開。
//
// 每個尺寸：
//   1  輪播：有聲音進來客 → play 收到包包裡有試聽的一張（session ambient）；送 ended → 下一張不同；連 n 首（n＝包包可放的張數）每張剛好一次；第二輪第一首不是剛放完那張；
//      佇列＝測試自己從 run.bag 算的（有試聽、不是王牌／頂點卡）
//   2  快取跟佇列：fx 快取上限＝max(6, min(12, n))；連放兩輪，第二輪 fetch 0 次
//   3  收一張新的（run.bag 多一張有試聽的）→ 下一首就是它
//   3b 賣掉的跳過：佇列下一首那張從包包拿掉 → 之後一整輪都不放；王牌（三派預設王牌）塞進包包也不放
//   4  泡泡：第一首展開（♪ 正在播放＋藝人《專輯》）、6 秒後收（假時鐘）；第二首（30 秒後）不展開；隔 2 分鐘換歌才再展開；點 ♪ 展開；泡泡不擋點擊（只是字卡）；泡泡開著再點 ♪＝唱片資訊；
//      位置：整個在鏡頭裡、不蓋底部面板、名牌、封面熱點（小熱點）、泡泡；寬 ≤160 px、藝人《專輯》一行截斷
//   5  抓不到：那首回 false → 1 秒內換下一首、那首不出泡泡；連三首 false → 停、60 秒（假時鐘）後再試一次；抓不到的那幾首從頭到尾沒上過泡泡
//   6  對決：點下一位進對決 → 停（current 空、♪ 收）；打贏（盤面真的打完：force＋animated autoplay，duel.js 勝利曲）→ 領獎畫面勝利曲在放時輪播不插播 → 勝利曲 ended → 接回輪播（佇列接著）
//   7  試聽機：輪播時 audioSession 'playback'（v6-6 起不跟靜音鍵；原本 'ambient'）；點一張＝session 'playback'、輪播讓位；ended → 接回輪播（play 記號 'ambient'）；maxMs 淡出（試聽 15 秒那種）→ 1.5 秒後接回輪播
//   8  背景音樂關：進來客不呼叫 play（輪播）、♪ 灰、沒有字；櫃檯唱盤＝dip.json 那張；試聽機照放
//   9  沒解鎖（不經點擊直接進來客）：只換唱盤上那張（沒出聲）、收音機旁「點我放歌」→ 真點 → unlockFromGesture(true)、開始出聲、泡泡展開
//   10 行動網路：一首都沒下載過＝不輪播、不出泡泡、fetch 0；放過幾首後切行動網路＝只放快取裡的、fetch 不再增加；Wi-Fi 但 effectiveType 3g＝也算行動網路
//   11 櫃檯唱盤＝正在放的那張（stage.nowKey、熱點「正在放」的 action）；對決中不換
//   12 閒置 10 分鐘（假時鐘）→ 淡出、不再預抓；點一下接著放
//   13 活店（?crowd=1）：店裡沒人時泡泡擺的位置 → 熟客站上去（那個位置蓋到人）＝泡泡換位置；都擺不下＝點 ♪ 放寬（可以蓋到人，但不擋點擊、不蓋名牌／聊天泡泡／面板）；
//      熟客站別處＝泡泡展開、不蓋熟客人物矩形、聊天泡泡、名牌、底部面板；
//      熟客聊天泡泡出來＝收成小圖示（375×548 也要真的展開過再收）
//   14 ⏸：背景音樂 開／關、音樂音量 小中大（fx 音量跟著換）、樂歷 Lv5 起「背景音樂放 包包／包包＋唱片櫃」（Lv1 沒有這行）；包包＋唱片櫃＝包包放完一輪多一張唱片櫃的；
//      背景音樂關＝櫃檯唱盤回 dip.json 那張
//   15 主控台 0 錯誤、#app 不捲動；♪ 不蓋收音機熱點的中心（真點收音機照舊開轉頻率面板；e2e-econ #28 375×548 抓到過）
//   16 只在來客、領獎、說情輪播：有 run 的標題不放（0 次 play、沒有 ♪）；輸了進說情（場景 bgm）＝接著輪播；回標題＝♪ 收、不接下一首（v6-6 起正在放的那首 0.8 秒淡出停，見 #40）
//   17 一次造訪輪播新抓上限 30 首：包包多 30 張沒下載過的 → 網路 fetch 總數 ≤30，之後照樣放（只放快取裡的）
//   18 saveData（省流量）：背景音樂沒設過＝預設關（不輪播、♪ 灰、⏸ 寫「關」）；⏸ 打開 → 開始輪播
//   19 背景分頁（visibilitychange）：切走＝停、切走期間（70 秒）不接下一首；切回來點一下＝同一首從頭放、session 'ambient'
//   20 唱片資訊試聽（玩家點的）：'playback'、輪播不插播（2 分鐘也不）；放完 → 1.5 秒內接回輪播、佇列位置不變（'ambient'）、唱片資訊開著不展開泡泡；
//      試聽中關掉唱片資訊＝原本那首輪播接著放，還是 'ambient'（跟著靜音鍵）
//   21 攤位「店裡唱盤」：放上去那張馬上放（插播）、佇列原本的順序接著
//   22 舊 iOS（iPhone UA、沒有 navigator.audioSession）：開店那一下開了循環靜音 <audio>；v6-6 起輪播換首不收（原本收掉＝跟著靜音鍵）、試聽機、接回輪播都一路開著
//   審查修正（I-4 修正棒）：
//   23 背景分頁 × 排著的計時器：換畫面後 4 秒內切走、連三首抓不到等 60 秒時切走 → 背景期間 0 次 play、AudioContext 不被拉回；回前景點一下＝接上 1 次
//   24 離開輪播畫面時還在抓（4 秒）的那首作廢：進對決後抓完也不響、那張回佇列最前面；對決 audioSession 'playback'
//   25 抓檔中 ⏸ 關背景音樂：抓完不響、不多預抓、♪ 灰
//   26 切背景 11 分鐘回來點一下：只 play 1 次、佇列沒被白拿、輪播認得這首（⏸ 關得掉）
//   27 慢網路（每首 2.7 秒）：30 首都放、不停 60 秒；網路 fetch ≤ 輪播記的新抓 ≤ 30
//   28 連三首抓不到的空檔：♪ 不是「有歌」、點了不出「正在播放」
//   29 活店：點 ♪ 8 次都有泡泡、每個熱點點擊點最上層都不是泡泡；聊天中點 ♪ 泡泡一下都不出；第一首擺不下不吃額度
//   30 鏡頭移動中 ♪ 跟著收音機（每格距離差 ≤3 px）、泡泡等鏡頭停了才展開；「點我放歌」膠囊在鏡頭裡；⏸ Lv1／Lv5 不用捲、字不擠出按鈕
//   第三輪審查（main 上，活店切磋合併後）：
//   35 新開頁第一首還在抓（唱盤上還沒有任何一張）就 ⏸ 關聲音 → 進對決 → 對決裡開聲音：輪播那首不在對決裡響、audioSession 不是 'ambient'、那張回到佇列最前面（F1）
//   36 ?apex=1＋Lv5「包包＋唱片櫃」：唱片櫃裡擁有的頂點卡、這一趟的王牌不放；一般的唱片櫃那張照放（F2）
//   37 活店切磋邀請（&enc=force）：第一首字卡不在挑戰者走過來、嗆聲時出，出了停滿 5 秒以上、不被聊天／換位收、不疊泡泡（F4／F5）；
//      打贏切磋的戰利品列：牆上封面、海報、櫃檯「正在放」的點擊點最上層不是 ♪／字卡（F3）
//   v6-6（店主 11-28「店內自由活動時沒有播出背包內的唱片；收音機那邊正在播放但沒有背景音樂；確保背景音樂可以淡入淡出」）：
//   38 來客畫面：包包那張真的在放（context running、在響、audioSession playback）、泡泡「正在播放 藝人《專輯》」＝唱盤上那張；context 卡住 1.7 秒＝不寫正在播放、♪「點我放歌」；真點 ♪＝同一首接著響
//   39 淡入：換下一首時音量從 ≤35% 起、0.5 秒在中間、1.35 秒到設定值、只升不降；減少動態效果（reduced motion）照樣淡入
//   40 淡出（約 0.8 秒）：試聽機換一張（換曲）、⏸ 關聲音、回標題——被收掉那首的音量 0.3 秒時在中間、1 秒時到 0；回標題後沒在放（原本放完才停）
//   41 包包全是精選新卡、cards-media.json 晚到：到之前不放、不出泡泡；一到就接著輪播（原本要等下一次換畫面）
// 每一項印 PASS／FAIL；任何 FAIL → exit 1。
import fs from 'fs';
import path from 'path';
import { launch, newPage, openTitle, Q, record, results, sleep, jsClick, waitScreen, tapHot, tapReady, seedRun, infoOpen, closeInfo, noScroll, scrollOk, duelReady, lootReady, marketOpen } from './e2e-lib.mjs';

const SIZES = (process.env.LAB_SIZES || '390x664,375x548').split(',').filter(Boolean).map(s => s.split('x').map(Number));
const ONLY = process.env.LAB_BGM ? new Set(process.env.LAB_BGM.split(',').map(s => s.trim())) : null;
const want = n => !ONLY || ONLY.has(String(n));
const SHOTS = process.env.LAB_SHOTS || '';
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });

// ---- 頁面裡的替身（addInitScript）
function fakeInit() {
  window.__dipFakeAudio = { calls: [] };
  window.__fetchLog = []; window.__bgmFail = {}; window.__failAll = false; window.__delay = 0;   // __delay：試聽網址晚這麼多毫秒才回（慢網路；#24、#25、#27）
  let conn = 'wifi', sd = false; try { conn = localStorage.getItem('__e2eConn') || 'wifi'; sd = localStorage.getItem('__e2eSaveData') === '1'; } catch (_) {}
  window.__conn = { type: conn, effectiveType: '4g', saveData: sd };
  // 泡泡上過哪幾張：.np-pop 有 on 的時候，每次 class／data-cid 變了就記 data-cid（連續同一張只記一次）
  window.__popLog = [];
  new MutationObserver(ms => ms.forEach(m => { const t = m.target; if (!t.classList || !t.classList.contains('np-pop') || !t.classList.contains('on')) return;
    const id = t.getAttribute('data-cid'); if (window.__popLog[window.__popLog.length - 1] !== id) window.__popLog.push(id); }))
    .observe(document, { subtree: true, attributes: true, attributeFilter: ['class', 'data-cid'] });
  const of = window.fetch;
  window.fetch = function (u, o) {
    const s = String((u && u.url) || u);
    if (/itunes-assets\//.test(s)) {
      window.__fetchLog.push(s);
      const go = () => (window.__failAll || window.__bgmFail[s]) ? Promise.reject(new TypeError('Failed to fetch')) : Promise.resolve(new Response(new ArrayBuffer(64), { status: 200 }));
      return window.__delay ? new Promise(r => setTimeout(r, window.__delay)).then(go) : go();
    }
    return of.apply(this, arguments);
  };
  // 舊 iOS（#22）：iPhone 的 UA、沒有 navigator.audioSession → fx 走循環靜音 <audio> 後備；記那個 <audio>（blob、loop）的 play／pause
  let oldIos = false; try { oldIos = localStorage.getItem('__e2eOldIos') === '1'; } catch (_) {}
  if (oldIos) {
    Object.defineProperty(navigator, 'userAgent', { get: () => 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1', configurable: true });
    window.__silent = [];
    const P = HTMLMediaElement.prototype, op = P.play, opa = P.pause;
    const mine = a => a.loop && /^blob:/.test(String(a.src || ''));
    P.play = function () { if (mine(this)) { window.__silentEl = this; window.__silent.push('play'); } return op.apply(this, arguments); };
    P.pause = function () { if (mine(this)) window.__silent.push('pause'); return opa.apply(this, arguments); };
  } else Object.defineProperty(navigator, 'audioSession', { value: { type: 'auto' }, configurable: true });
  Object.defineProperty(navigator, 'connection', { get() { return window.__conn; }, configurable: true });
}
const C = (page, fn, a) => page.evaluate(fn, a);
// 狀態
const st = page => C(page, () => {
  const F = window.DipLabFx, m = F.music, cur = m.current(), B = window.__lab.bgm();
  const pop = document.querySelector('.np-pop'), ic = document.querySelector('.np-ic');
  const vis = e => !!e && e.style.display !== 'none' && e.getBoundingClientRect().width > 0;
  const rr = e => { const r = e.getBoundingClientRect(); return { l: Math.round(r.left), t: Math.round(r.top), r: Math.round(r.right), b: Math.round(r.bottom), w: Math.round(r.width), h: Math.round(r.height) }; };
  const nowHot = (window.__lab.stage.hotspots() || []).find(h => h.id === 'now');
  return { calls: window.__dipFakeAudio.calls.map(c => ({ id: c.id, s: c.session, snd: c.sound, max: c.maxMs })), fetch: window.__fetchLog.length, cur: cur ? cur.id : null, playing: m.playing(),
    pop: vis(pop) && pop.classList.contains('on') ? { cid: pop.getAttribute('data-cid'), text: pop.textContent, at: pop.getAttribute('data-at'), r: rr(pop) } : null,
    ic: vis(ic) ? { cls: ic.className, text: ic.textContent, r: rr(ic) } : null, B, nowKey: window.__lab.stage.nowKey(), nowAct: nowHot ? nowHot.action : null,
    lru: m._lru(), vol: m.volume(), screen: window.__lab.screen(), popLog: window.__popLog.slice(),
    sess: navigator.audioSession ? navigator.audioSession.type : null, silent: window.__silent ? { log: window.__silent.join(','), paused: window.__silentEl ? window.__silentEl.paused : null } : null };
});
const nCalls = page => C(page, () => window.__dipFakeAudio.calls.length);
const waitCalls = (page, n, ms = 3000) => page.waitForFunction(n => window.__dipFakeAudio.calls.length >= n, n, { timeout: ms, polling: 50 }).then(() => true, () => false);
const end = page => C(page, () => window.DipLabFx.music._end());
// 這首放完 → 等下一次 play 真的開始響（回那一筆 id）
async function next(page) {
  const n0 = await nCalls(page);
  await end(page);
  const ok = await waitCalls(page, n0 + 1, 3000);
  await page.waitForFunction(() => window.DipLabFx.music.playing() || !window.__lab.bgm().loading, null, { timeout: 3000, polling: 50 }).catch(() => {});
  await sleep(60);
  const s = await st(page);
  return ok ? s.calls[s.calls.length - 1].id : null;
}
const card = (page, id) => C(page, id => { const c = window.DipLabContent.cards[id]; return c ? { id: c.id, artist: c.artist, album: c.album, url: c.previewUrl } : null; }, id);
// 有試聽、不在包包、不是王牌的卡（固定順序）
const spareIds = (page, n) => C(page, n => { const C = window.DipLabContent.cards, r = window.__lab.run, aces = Object.values(window.DipLabContent.aces);
  return Object.keys(C).filter(id => C[id].previewUrl && !C[id].pool && !C[id].tier && r.bag.indexOf(id) < 0 && aces.indexOf(id) < 0).sort().slice(0, n); }, n);
const hit = (a, b) => a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t;
const r4 = r => r ? [r.l, r.t, r.r, r.b].map(Math.round).join(',') : '-';
// 收音機旁的幾何（全部是畫面座標）：泡泡、♪、鏡頭看得到的那塊（__lab.bgm(true).V 換到畫面）、舞台 host、底部面板上緣、
//   名牌（.ds-tag）、泡泡（.ds-say）、熟客與路人的人物矩形（活店 anchor）、小熱點（牆上封面、海報、櫃檯「正在放」：面積 ≤600 美術格²、收音機本身不算）
const geoNp = page => C(page, () => {
  const st = window.__lab.stage, hb = st.host.getBoundingClientRect(), rr = r => ({ l: r.left, t: r.top, r: r.right, b: r.bottom });
  const pop = document.querySelector('.np-pop.on'), ic = document.querySelector('.np-ic');
  const g = window.__lab.bgm(true), V = g.V ? { l: g.V.l + hb.left, t: g.V.t + hb.top, r: g.V.r + hb.left, b: g.V.b + hb.top } : null;
  const vis = r => r.width > 0 && r.height > 0;
  const tags = [...document.querySelectorAll('.ds-tag')].map(e => e.getBoundingClientRect()).filter(vis).map(rr);
  const says = [...document.querySelectorAll('.ds-say')].map(e => e.getBoundingClientRect()).filter(vis).map(rr);
  const cw = window.DipLabCrowd, people = cw && cw.state ? (cw.state().slots || []).filter(s => s.on && !s.hidden).map(s => st.anchor(s.slot).getBoundingClientRect()).filter(vis).map(rr) : [];
  const hots = (st.hotspots() || []).filter(h => h.rect && h.id !== 'radio' && !h.dyn && h.visible !== false && h.rect[2] * h.rect[3] <= 600).map(h => {
    const a = st.cssOf(h.rect[0], h.rect[1]), b = st.cssOf(h.rect[0] + h.rect[2], h.rect[1] + h.rect[3]); return { id: h.id, l: a.x + hb.left, t: a.y + hb.top, r: b.x + hb.left, b: b.y + hb.top }; });
  const panel = document.getElementById('panel'), pr = panel ? panel.getBoundingClientRect() : null;
  const nb = pop ? pop.querySelector('b') : null, cs = nb ? getComputedStyle(nb) : null;
  const thru = pop ? getComputedStyle(pop).pointerEvents === 'none' : null;
  return { pop: pop ? rr(pop.getBoundingClientRect()) : null, at: pop ? pop.getAttribute('data-at') : null, w: pop ? pop.getBoundingClientRect().width : 0, lvl: window.__lab.bgm().popLvl, thru,
    line: nb ? { nowrap: cs.whiteSpace === 'nowrap', ell: cs.textOverflow === 'ellipsis', h: nb.getBoundingClientRect().height, fs: parseFloat(cs.fontSize) } : null,
    ic: ic && ic.style.display !== 'none' && vis(ic.getBoundingClientRect()) ? rr(ic.getBoundingClientRect()) : null,
    V, host: rr(hb), panelT: pr && pr.height > 0 ? pr.top : 1e9, tags, says, people, hots };
});
// 泡泡擺得乾淨：在鏡頭裡、在 host 裡、不壓底部面板；不蓋名牌、泡泡、人、小熱點。回 '' 或撞到什麼
const npClash = g => {
  const p = g.pop; if (!p) return 'no-pop';
  if (!g.V || p.l < g.V.l - 0.5 || p.t < g.V.t - 0.5 || p.r > g.V.r + 0.5 || p.b > g.V.b + 0.5) return 'out-of-view';
  if (p.l < g.host.l - 0.5 || p.r > g.host.r + 0.5 || p.t < g.host.t - 0.5) return 'out-of-host';
  if (p.b > g.panelT + 0.5) return 'panel';
  for (const [k, L] of [['tag', g.tags], ['say', g.says], ['person', g.people], ['hot', g.hots]]) { const b = L.find(b => hit(p, b)); if (b) return k + (b.id ? ':' + b.id : '') + '@' + r4(b); }
  return '';
};
const popLine = g => !!g.line && g.w <= 160.5 && g.line.nowrap && g.line.ell && g.line.h <= g.line.fs * 1.6;

// 開一頁：o.sound（預設 true）、o.bgm（undefined＝預設）、o.gesture（false＝不經點擊直接進來客）、o.crowd、o.conn、o.saveData、o.stayTitle（停在標題）、o.dpr；
//   o.q（網址多帶的，例 '&apex=1'、'&enc=force'）、o.noFast（不加 &fast=1：活店切磋的時間軸照真的走）、o.before（按「繼續」之前在這頁做的事：async page => …）、o.settle（進來客後等幾毫秒，預設 1200）
async function boot(browser, w, h, o = {}) {
  const { ctx, page } = await newPage(browser, w, h, { dpr: o.dpr || 1 });
  await page.addInitScript(fakeInit);
  await page.clock.install();
  const q = Q((o.noFast ? '' : '&fast=1') + (o.crowd ? '&crowd=1' : '') + (o.q || ''));
  await openTitle(page, q);
  await seedRun(page, Object.assign({ idx: 0 }, o.crowd ? { idx: 1, seen: { crowdIntro: true, expertIntro: true } } : {}));   // 活店：老闆的第一次提示都算看過（不搶聊天）
  await C(page, o => {
    const s = JSON.parse(localStorage.getItem('dipGameLab_v1'));
    s.settings.sound = o.sound !== false; if (o.bgm != null) s.settings.bgm = o.bgm;
    localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
    if (o.conn) localStorage.setItem('__e2eConn', o.conn); else localStorage.removeItem('__e2eConn');
    if (o.saveData) localStorage.setItem('__e2eSaveData', '1'); else localStorage.removeItem('__e2eSaveData');
    if (o.oldIos) localStorage.setItem('__e2eOldIos', '1'); else localStorage.removeItem('__e2eOldIos');
  }, Object.assign({}, o, { before: null }));
  await openTitle(page, q);
  if (o.stayTitle) return { ctx, page };
  if (o.before) await o.before(page);
  if (o.gesture === false) await C(page, () => window.__lab.go('night'));
  else await jsClick(page, '[data-a=cont]');
  await waitScreen(page, 'night');
  await sleep(o.settle != null ? o.settle : 1200);
  return { ctx, page };
}
// 真點一個 DOM 元素的正中間（最上層要是它）
async function tapEl(page, sel) {
  const p = await C(page, sel => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2; const t = document.elementFromPoint(x, y); return { x, y, top: !!t && (t === e || e.contains(t)) }; }, sel);
  if (!p) return null;
  await page.touchscreen.tap(p.x, p.y);
  return p;
}
// 收音機熱點的中心（真點收音機點的那一下；shop.hotPoints）最上層是不是店景畫布（不是 ♪、不是泡泡）
const radioHot = page => C(page, () => {
  const st = window.__lab.stage, sh = st.shop, hb = st.host.getBoundingClientRect(), q = (sh.hotPoints() || []).find(q => q.id === 'radio'), ic = document.querySelector('.np-ic');
  if (!q) return { ok: false, x: null, y: null, ic: ic && ic.className };
  const x = hb.left + q.x, y = hb.top + q.y, r = ic && ic.getBoundingClientRect();
  return { ok: document.elementFromPoint(x, y) === sh.canvas, x: Math.round(x), y: Math.round(y), ic: ic && ic.style.display !== 'none' ? ic.className : null, icR: r ? [r.left, r.top, r.right, r.bottom].map(Math.round).join(',') : '-' };
});
// 櫃檯唱盤的預設（dip.json 寫死的那張）
const defNow = page => C(page, () => fetch('shops/dip.json').then(r => r.json()).then(d => ((d.props || []).filter(o => o.type === 'counter' && o.now)[0] || {}).now || null));
const shot = async (page, name, w, h) => { if (SHOTS) await page.screenshot({ path: path.join(SHOTS, `${name}-${w}.png`) }); };

async function runSize(browser, w, h) {
  const size = w + 'x' + h;
  // =========================================================== A：輪播、快取、泡泡、抓不到、試聽機、閒置、對決（活店關）
  if (['1', '2', '3', '4', '5', '6', '7', '11', '12', '15'].some(want)) {
    const { ctx, page } = await boot(browser, w, h, { dpr: 2 });
    try {
      await waitCalls(page, 1, 4000); await sleep(200);
      // #4 第一首字卡：規則是「鏡頭停了、擺得下才出」（ui npOpen／npTry，等滿 popWait 8 秒為止）——375 主線客人走進來時候選位都撞到他，
      //   要等他站定（night 後 0.5～1.8 秒，看第一首跟他走路的時間差；合併後測試 post/diag）。快照等字卡真的出來（最多 5 秒，比規則的 8 秒嚴），不是固定睡 200 ms
      const t4 = Date.now(), up4 = await page.waitForFunction(() => window.__lab.bgm().popOpen, null, { timeout: 5000, polling: 50 }).then(() => true, () => false);
      const ms4 = Date.now() - t4;
      const s0 = await st(page), bag = s0.B.pl ? s0.B.pl.bag : [], n = bag.length, c0 = await card(page, s0.calls[0] && s0.calls[0].id);
      const g4 = await geoNp(page);                         // 第一首泡泡的位置（#4）
      // 佇列該有的（測試自己算）：包包裡有試聽、不是三派預設王牌、不是這一趟的王牌、不是只在 ?apex=1 才有的試做卡
      const expBag = await C(page, () => { const C = window.DipLabContent, r = window.__lab.run, aces = Object.values(C.aces), only = new Set(C.apexTrialOnly || []), ace = window.__lab.aceId();
        return [...new Set(r.bag)].filter(id => C.cards[id] && C.cards[id].previewUrl && aces.indexOf(id) < 0 && id !== ace && !only.has(id)); });
      const bagOk = expBag.slice().sort().join('|') === bag.slice().sort().join('|');
      const scrolls = [await noScroll(page)];
      // #4 第一首展開、#11 櫃檯唱盤
      const pop1 = s0.pop && c0 && s0.pop.cid === c0.id && s0.pop.text.indexOf(c0.artist + '《' + c0.album + '》') >= 0 && s0.pop.text.indexOf('正在播放') >= 0;
      await shot(page, 'night-np', w, h);
      const nowOk = s0.nowKey === s0.cur && s0.nowAct === 'wall-record:' + s0.cur;
      await page.clock.fastForward(6100); await sleep(250);
      const s1 = await st(page);
      const radioFree = await radioHot(page);              // ♪（有歌、點得到的那種）不蓋收音機熱點的中心：真點收音機照舊開轉頻率面板
      const ids = [s0.calls[0] && s0.calls[0].id];
      await page.clock.fastForward(30000); await sleep(150);   // 第二首：30 秒後換（試聽一首 30 秒）
      const id2 = await next(page); ids.push(id2);
      const s2 = await st(page);
      for (let i = 2; i < n; i++) ids.push(await next(page));
      const sA = await st(page);
      const fetch1 = sA.fetch;
      // 第二輪
      const ids2 = [];
      for (let i = 0; i < n; i++) ids2.push(await next(page));
      const sB = await st(page);
      const one = a => new Set(a).size === n && a.every(id => bag.indexOf(id) >= 0);
      if (want(1)) record(1, size, n >= 4 && bagOk && s0.calls[0].s === 'ambient' && s0.calls[0].snd && one(ids) && id2 !== ids[0] && one(ids2) && ids2[0] !== ids[n - 1] && s0.playing,
        `包包可放 ${n} 張（測試自己算 ${expBag.length} 張、一樣 ${bagOk}）；第一首 ${ids[0]}（${s0.calls[0] && s0.calls[0].s}）；第一輪 ${new Set(ids).size} 張不重複、第二輪 ${new Set(ids2).size} 張不重複；第二輪第一首≠剛放完：${ids2[0] !== ids[n - 1]}`);
      if (want(2)) record(2, size, sA.lru.max === Math.max(6, Math.min(12, n)) && sB.fetch - fetch1 === 0 && fetch1 >= n,
        `快取上限 ${sA.lru.max}（佇列 ${n}）；第一輪 fetch ${fetch1} 次、第二輪 ${sB.fetch - fetch1} 次`);
      // #4 第二首不展開；隔 2 分鐘換歌才展開；點 ♪ 展開；點泡泡＝唱片資訊
      await page.clock.fastForward(120500);
      const id4 = await next(page); const s4 = await st(page);
      await page.clock.fastForward(6100); await sleep(250);
      const s5 = await st(page);
      const tIc = await tapEl(page, '.np-ic'); await sleep(250);
      const s6 = await st(page);
      // 泡泡只是字卡（審查 L11）：泡泡正中間、四角的最上層不是泡泡（底下的挖寶箱照點得到）；唱片資訊＝泡泡開著再點一次 ♪
      const popThru = s6.pop ? await C(page, () => { const p = document.querySelector('.np-pop.on'), r = p.getBoundingClientRect();
        return [[0.5, 0.5], [0.1, 0.2], [0.9, 0.2], [0.1, 0.8], [0.9, 0.8]].every(([a, b]) => { const e = document.elementFromPoint(r.left + r.width * a, r.top + r.height * b); return !!e && e !== p && !p.contains(e); }); }) : false;
      const tPop = s6.pop ? await tapEl(page, '.np-ic') : null;
      const ciOpen = tPop ? await infoOpen(page, 2500) : false;
      const ciId = ciOpen ? await C(page, () => { const c = window.DipLabCardInfo && window.DipLabCardInfo.current && window.DipLabCardInfo.current(); return c ? c.id : null; }) : null;
      if (ciOpen) await closeInfo(page);
      const clash4 = npClash(g4);
      if (want(4)) record(4, size, pop1 && !clash4 && popLine(g4) && !s1.pop && s1.ic && /\bon\b/.test(s1.ic.cls) && !s2.pop && s4.pop && s4.pop.cid === id4 && !s5.pop && tIc && tIc.top && s6.pop && popThru && tPop && tPop.top && ciOpen && ciId === s6.pop.cid,
        `第一首展開 ${pop1}（${up4 ? '等 ' + (200 + ms4) + ' ms' : '5 秒內沒出'}；${s0.pop && s0.pop.at}；${clash4 ? '撞到 ' + clash4 : '在鏡頭裡、不蓋面板／名牌／小熱點 ' + g4.hots.length + ' 個'}；寬 ${Math.round(g4.w)}、一行截斷 ${popLine(g4)}）→ 6 秒後收 ${!s1.pop}；` +
        `第二首（30 秒後）不展開 ${!s2.pop}；隔 2 分鐘換歌展開 ${!!s4.pop}；點 ♪ 展開 ${!!s6.pop}（♪ 在最上層 ${tIc && tIc.top}）；泡泡不擋點擊 ${popThru}；泡泡開著再點 ♪＝唱片資訊 ${ciOpen}（${ciId}）`);
      if (want(11)) record(11, size, nowOk, `櫃檯唱盤 ${s0.nowKey}＝正在放 ${s0.cur}；熱點 ${s0.nowAct}`);
      // #3 收一張新的 → 下一首就是它
      const [nw] = await spareIds(page, 1);
      await C(page, id => { window.__lab.run.bag.push(id); }, nw);
      const id3 = await next(page);
      if (want(3)) record(3, size, !!nw && id3 === nw, `包包多了 ${nw} → 下一首 ${id3}`);
      // #3b 賣掉的跳過（佇列下一首那張拿出包包）；三派預設王牌塞進包包也不放（看完放回原樣）
      {
        const q3 = (await st(page)).B.pl.queue.slice(), sold = q3[0];
        const aceIds = await C(page, () => Object.values(window.DipLabContent.aces));
        await C(page, a => { const r = window.__lab.run; if (r.bag.indexOf(a.sold) >= 0) r.bag.splice(r.bag.indexOf(a.sold), 1); a.aces.forEach(id => r.bag.push(id)); }, { sold, aces: aceIds });
        const got3 = [];
        for (let i = 0; i < q3.length + n; i++) got3.push(await next(page));
        const plBag3 = (await st(page)).B.pl.bag;
        await C(page, a => { const r = window.__lab.run; a.forEach(id => { const k = r.bag.lastIndexOf(id); if (k >= 0) r.bag.splice(k, 1); }); }, aceIds);
        const bad3 = got3.filter(id => id === sold || aceIds.indexOf(id) >= 0);
        if (want(3)) record('3b', size, !!sold && got3.every(Boolean) && !bad3.length && plBag3.indexOf(sold) < 0 && aceIds.every(id => plBag3.indexOf(id) < 0),
          `賣掉 ${sold} → 之後 ${got3.length} 首沒放它；王牌 ${aceIds.join('、')} 塞進包包：佇列沒有、沒放；放到 ${bad3.join('、') || '沒有不該放的'}`);
      }
      // #5 抓不到（快取裡的不會再抓：用剛收進包包、還沒下載過的；剛收的排最前面）
      await page.clock.fastForward(130000);                 // 讓「隔 2 分鐘」成立：看失敗那首不出泡泡、成功那首才出
      const sp5 = await spareIds(page, 5), bad = await card(page, sp5[0]);
      await C(page, a => { window.__bgmFail[a.url] = true; window.__lab.run.bag.push(a.id); }, bad);
      const n5 = await nCalls(page);
      await end(page);
      const t5 = Date.now();
      const ok5 = await waitCalls(page, n5 + 2, 1500); const dt5 = Date.now() - t5;
      await sleep(200);
      const s7 = await st(page), c5 = s7.calls.slice(n5);
      const skipOk = ok5 && bad && c5[0].id === bad.id && c5[1].id !== bad.id && s7.cur === c5[1].id && s7.playing && (!s7.pop || s7.pop.cid !== bad.id) && !!s7.pop;
      await C(page, ids => { window.__failAll = true; ids.forEach(id => window.__lab.run.bag.push(id)); }, sp5.slice(1, 4));   // 三張新收的、都抓不到
      const n6 = await nCalls(page);
      await end(page);
      const ok6 = await waitCalls(page, n6 + 3, 2500); await sleep(1500);
      const s8 = await st(page);
      await C(page, () => { window.__failAll = false; window.__bgmFail = {}; });
      await page.clock.fastForward(60500); await sleep(400);
      const s9 = await st(page);
      const badIds = [bad && bad.id].concat(sp5.slice(1, 4)), popBad = s9.popLog.filter(id => badIds.indexOf(id) >= 0);
      if (want(5)) record(5, size, skipOk && dt5 < 1000 && ok6 && s8.calls.length === n6 + 3 && s8.calls.slice(n6).every(c => sp5.slice(1, 4).indexOf(c.id) >= 0) && s8.B.retry && !s8.playing && (!s8.pop || badIds.indexOf(s8.pop.cid) < 0) &&
          s9.calls.length > s8.calls.length && s9.playing && !s9.B.retry && !popBad.length,
        `抓不到 ${bad && bad.id} → ${dt5} ms 換 ${c5[1] && c5[1].id}、泡泡 ${s7.pop ? s7.pop.cid : '沒有'}；連三首抓不到＝停（${s8.calls.length - n6} 次、等 60 秒 ${s8.B.retry}、泡泡 ${s8.pop ? s8.pop.cid : '沒有'}）→ 60 秒後再試 ${s9.calls.length - s8.calls.length} 次、在放 ${s9.playing}；` +
        `抓不到的上過泡泡：${popBad.join('、') || '沒有'}（泡泡紀錄 ${s9.popLog.length} 筆）`);
      // #7 試聽機：playback；ended 接回 ambient；maxMs 淡出 1.5 秒後接回
      const sess0 = (await st(page)).sess;
      await C(page, () => window.__lab.stageAction('listen'));
      const booth = await page.waitForSelector('.lb-sheet.float.booth [data-pick]', { timeout: 3000 }).then(() => true, () => false);
      await sleep(300);
      const n7 = await nCalls(page);
      const bid = booth ? await C(page, () => { const b = document.querySelector('.lb-sheet.float.booth [data-pick]'); const c = b.closest('[data-cid]'); return c ? c.getAttribute('data-cid') : null; }) : null;
      if (booth) await jsClick(page, '.lb-sheet.float.booth [data-pick]');
      await waitCalls(page, n7 + 1, 2000); await sleep(300);
      const s10 = await st(page), cb = s10.calls[n7];
      await jsClick(page, '.lb-sheet.float.booth [data-a=close]'); await sleep(1800);
      const s10b = await st(page);
      const n8 = await nCalls(page);
      await end(page);
      await waitCalls(page, n8 + 1, 2500); await sleep(200);
      const s11 = await st(page), cr = s11.calls[n8];
      // maxMs：玩家點的 15 秒那種（這裡 2.5 秒）
      const [mx] = await spareIds(page, 1);
      const n9 = await nCalls(page);
      await C(page, id => window.DipLabFx.music.play(window.DipLabContent.cards[id], { maxMs: 2500, fadeMs: 300 }), mx);
      await page.waitForFunction(id => { const c = window.DipLabFx.music.current(); return c && c.id === id && window.DipLabFx.music.playing(); }, mx, { timeout: 2000, polling: 50 }).catch(() => {});
      await page.clock.fastForward(1400);                     // maxMs 到：開始 1.2 秒淡出
      const s12a = await st(page);
      await page.clock.fastForward(2800); await sleep(300);    // 淡出 1.2 秒＋閒置 1.5 秒
      const s12 = await st(page), cm = s12.calls.slice(n9 + 1);
      // v6-6（店主 11-28 聽不到輪播）：背景音樂不再切 'ambient'（跟靜音鍵）＝輪播時 audioSession 也是 'playback'；play 的 session 記號照舊 'ambient'
      if (want(7)) record(7, size, sess0 === 'playback' && booth && cb && cb.s === 'playback' && s10.cur === cb.id && s10.sess === 'playback' && s10b.calls.length === n8 && cr && cr.s === 'ambient' && s11.sess === 'playback' && s11.playing &&
          !s12a.calls.slice(n9 + 1).length && cm.length >= 1 && cm[0].s === 'ambient' && s12.playing,
        `試聽機那張 ${cb && cb.id}（${cb && cb.s}、audioSession ${s10.sess}；開始時 ${sess0}）；關掉面板沒插播 ${s10b.calls.length === n8}；ended → 輪播 ${cr && cr.id}（${cr && cr.s}、${s11.sess}）；` +
        `maxMs 淡出 → 接回 ${cm.length ? cm[0].id + '（' + cm[0].s + '）' : '沒有'}`);
      // #12 閒置 10 分鐘 → 淡出、不再預抓；點一下接著放
      const f12 = (await st(page)).fetch;
      await page.clock.fastForward(601000); await sleep(400);
      const s13 = await st(page);
      await page.clock.fastForward(60000); await sleep(300);
      const s14 = await st(page);
      const n12 = await nCalls(page);
      await tapEl(page, '.lb-night .nh');
      await waitCalls(page, n12 + 1, 2000); await sleep(300);
      const s15 = await st(page);
      if (want(12)) record(12, size, s13.B.idle && !s13.playing && s14.fetch === f12 && s14.calls.length === s13.calls.length && s15.calls.length === n12 + 1 && s15.calls[n12].s === 'ambient' && s15.playing && !s15.B.idle,
        `閒置 10 分鐘：停 ${!s13.playing}（idle ${s13.B.idle}）、再 1 分鐘 fetch ${s14.fetch - f12}、play ${s14.calls.length - s13.calls.length}；點一下 → ${s15.calls[n12] && s15.calls[n12].id}`);
      // ⏸ Lv1：沒有「背景音樂放」那行
      await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=bgm]', { timeout: 3000 }).catch(() => {}); await sleep(250);
      const lv1 = await C(page, () => ({ bgm: !!document.querySelector('.lb-modal [data-a=bgm]'), vol: !!document.querySelector('.lb-modal [data-a=mvol]'), src: !!document.querySelector('.lb-modal [data-a=bsrc]') }));
      await jsClick(page, '.lb-modal [data-a=resume]'); await sleep(300);
      scrolls.push(await noScroll(page));
      // #6 對決：停；領獎勝利曲不插播；ended 接回
      const nowBefore = (await st(page)).nowKey;
      await tapReady(page, '[data-a=go]');
      const inDuel = await waitScreen(page, 'duel', 15000);
      await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
      await sleep(600);
      const s16 = await st(page);
      // 盤面真的打完：這一手剋中、他聲望歸零（__lab.force）→ animated autoplay 照畫面出牌 → duel.js 收尾放勝利曲（你最後丟的那張）→ 領獎
      const head6 = (await st(page)).B.pl.queue[0] || null;
      const n13 = await nCalls(page);
      await C(page, () => { window.__lab.force({ kind: 'counter', toE: 99, toP: 0 }); window.__lab.autoplay('thoughtful', { animated: true, until: 'duelEnd' }); });
      const inRw = await waitScreen(page, 'reward', 25000);
      await C(page, () => { window.__lab.force(null); window.__lab.stop(); });
      const vid = await C(page, n => { const c = window.__dipFakeAudio.calls[n]; return c ? c.id : null; }, n13);
      await sleep(2500);
      const s17 = await st(page);
      const n14 = await nCalls(page);
      await end(page);
      await waitCalls(page, n14 + 1, 2500); await sleep(300);
      const s18 = await st(page), cw = s18.calls[n14];
      if (want(6)) record(6, size, inDuel && !s16.cur && !s16.ic && !s16.pop && !s16.B.zone && s16.sess === 'playback' && inRw && !!vid && s17.calls.length === n13 + 1 && s17.calls[n13].s === 'playback' && s17.cur === vid && cw && cw.s === 'ambient' && (!head6 || cw.id === head6) && s18.playing && s18.pop && s18.pop.cid === cw.id,
        `進對決：停 ${!s16.cur}${s16.cur ? '（' + s16.cur + '）' : ''}、♪ 收 ${!s16.ic}${s16.ic ? '（' + s16.ic.cls + '）' : ''}、輪播 ${s16.B.zone}、audioSession ${s16.sess}（對決音效不跟著靜音鍵）；打完勝利曲 ${vid}（${s17.calls[n13] && s17.calls[n13].s}）在領獎畫面放時沒插播 ${s17.calls.length === n13 + 1}；ended → ${cw && cw.id}（佇列下一首 ${head6}）、領獎畫面第一首展開 ${!!s18.pop}`);
      if (want(11)) record('11b', size, s16.nowKey === nowBefore && s17.nowKey === vid, `對決中櫃檯唱盤不換（${s16.nowKey}）；領獎勝利曲在放＝${s17.nowKey}`);
      const errs = page._errors.concat(page._badLocal);
      if (want(15)) record(15, size, !errs.length && scrolls.every(scrollOk) && lv1.bgm && lv1.vol && !lv1.src && radioFree.ok && /\bon\b/.test(radioFree.ic || ''),
        (errs.length ? '主控台錯誤：' + errs.slice(0, 3).join(' | ') : '主控台 0 錯誤') + `；不捲動 ${scrolls.every(scrollOk)}；⏸ Lv1：背景音樂 ${lv1.bgm}、音量 ${lv1.vol}、沒有「背景音樂放」${!lv1.src}；` +
        `收音機熱點中心 [${radioFree.x},${radioFree.y}] 最上層是店景 ${radioFree.ok}（♪ ${radioFree.ic} 在 ${radioFree.icR}）`);
    } catch (e) { record('A', size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #8 背景音樂關
  if (want(8)) {
    const { ctx, page } = await boot(browser, w, h, { bgm: false });
    try {
      await sleep(2500);
      const s = await st(page);
      await C(page, () => window.__lab.stageAction('listen'));
      const booth = await page.waitForSelector('.lb-sheet.float.booth [data-pick]', { timeout: 3000 }).then(() => true, () => false);
      await sleep(300);
      if (booth) await jsClick(page, '.lb-sheet.float.booth [data-pick]');
      await waitCalls(page, 1, 2000); await sleep(300);
      const s2 = await st(page);
      const def8 = await defNow(page);
      record(8, size, s.calls.length === 0 && s.ic && /\boff\b/.test(s.ic.cls) && s.ic.text.trim() === '♪' && !s.pop && !s.nowKey && s.nowAct === 'wall-record:' + def8 && booth && s2.calls.length === 1 && s2.calls[0].s === 'playback' && s2.playing && !s2.pop,
        `背景音樂關：輪播 play ${s.calls.length} 次、♪ ${s.ic ? s.ic.cls + '「' + s.ic.text.trim() + '」' : '沒有'}、泡泡 ${s.pop ? '有' : '沒有'}、櫃檯唱盤 ${s.nowAct}（dip.json ${def8}）；試聽機照放 ${s2.calls.length === 1 && s2.calls[0].s}`);
    } catch (e) { record(8, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #9 沒解鎖
  if (want(9)) {
    const { ctx, page } = await boot(browser, w, h, { gesture: false });
    try {
      await C(page, () => { const F = window.DipLabFx, o = F.unlockFromGesture; window.__unlock = []; F.unlockFromGesture = function (x) { window.__unlock.push(x); return o.apply(this, arguments); }; });
      await sleep(1500);
      const s = await st(page);
      const t = s.ic ? await tapEl(page, '.np-ic') : null;
      await waitCalls(page, (s.calls.length || 0) + 1, 2500); await sleep(400);
      const s2 = await st(page), un = await C(page, () => window.__unlock.slice());
      const c2 = s2.calls[s.calls.length];
      record(9, size, s.calls.length === 1 && s.calls[0].snd === false && s.cur === s.calls[0].id && !s.playing && s.ic && /\btap\b/.test(s.ic.cls) && s.ic.text.indexOf('點我放歌') >= 0 && !s.pop &&
          t && t.top && un.length === 1 && un[0] === true && c2 && c2.id === s.calls[0].id && c2.snd && c2.s === 'ambient' && s2.playing && s2.pop && s2.ic && /\bon\b/.test(s2.ic.cls),
        `沒點過畫面：唱盤上換成 ${s.cur}（出聲 ${s.playing}）、♪「${s.ic && s.ic.text}」、泡泡 ${s.pop ? '有' : '沒有'}；真點 → unlockFromGesture(${un.join(',')})、開始出聲 ${s2.playing}（${c2 && c2.s}）、泡泡 ${!!s2.pop}`);
    } catch (e) { record(9, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #10 行動網路
  if (want(10)) {
    const { ctx, page } = await boot(browser, w, h, { conn: 'cellular' });
    try {
      await sleep(2000);
      const s = await st(page);
      // 換 Wi-Fi 放兩首（下載進快取）→ 切回行動網路
      await C(page, () => { window.__conn.type = 'wifi'; localStorage.removeItem('__e2eConn'); window.__lab.go('night'); });
      await waitCalls(page, 1, 3000); await sleep(300);
      await next(page);
      const cached = await C(page, () => window.DipLabFx.music._lru().keys.filter(u => window.DipLabFx.music.cached(u)));
      await C(page, () => { window.__conn.type = 'cellular'; });
      const f0 = (await st(page)).fetch, got = [];
      for (let i = 0; i < 3; i++) got.push(await next(page));
      const s2 = await st(page);
      const urls = await C(page, ids => ids.map(id => (window.DipLabContent.cards[id] || {}).previewUrl), got);
      // Wi-Fi 但 effectiveType 3g（慢）＝也算行動網路
      await C(page, () => { window.__conn.type = 'wifi'; window.__conn.effectiveType = '3g'; });
      const f1 = (await st(page)).fetch, got3 = [];
      for (let i = 0; i < 2; i++) got3.push(await next(page));
      const s3 = await st(page), urls3 = await C(page, ids => ids.map(id => (window.DipLabContent.cards[id] || {}).previewUrl), got3);
      record(10, size, s.calls.length === 0 && s.fetch === 0 && !s.pop && !s.B.cur && cached.length >= 2 && got.every(Boolean) && urls.every(u => cached.indexOf(u) >= 0) && s2.fetch === f0 &&
          s3.B.cell && got3.every(Boolean) && urls3.every(u => cached.indexOf(u) >= 0) && s3.fetch === f1,
        `行動網路沒下載過：play ${s.calls.length}、fetch ${s.fetch}、泡泡 ${s.pop ? '有' : '沒有'}；Wi-Fi 下載 ${cached.length} 首 → 行動網路連 3 首都在快取裡 ${urls.every(u => cached.indexOf(u) >= 0)}、fetch +${s2.fetch - f0}；` +
        `Wi-Fi＋3g：算行動網路 ${s3.B.cell}、2 首都在快取裡 ${urls3.every(u => cached.indexOf(u) >= 0)}、fetch +${s3.fetch - f1}`);
    } catch (e) { record(10, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #13 活店：避開熟客、聊天泡泡優先
  //   店裡沒人時點 ♪ 記下泡泡的位置 → 熟客站上去（block 組；那個位置現在蓋到人）→ 再點 ♪：換位置（不蓋人）或只有小圖示
  //   → 熟客站別處（show 組）：泡泡要真的展開、不蓋人／聊天泡泡／名牌／面板 → 點熟客聊天：泡泡收成小圖示
  //   站位（freezeAt）照尺寸挑（e2e 實測：390 一組三位就會把「左下」擠到「正左」；375 牆上封面密，只有「正左」，c-elec 那位一站上去就擺不下）
  if (want(13)) {
    const { ctx, page } = await boot(browser, w, h, { crowd: true, dpr: 2 });
    try {
      const SETS = w >= 390 ? { block: ['c-elec', 'c-hiphop', 'c-pay'], show: null } : { block: ['c-elec'], show: ['c-listen', 'c-pay', 'c-hiphop'] };
      // 收起來 → 點 ♪ 展開（擺不下會在 2 秒內每 300 ms 再試）→ 量
      // 展開中再點 ♪＝唱片資訊（審查 L11 之後）：先等它自己收（6 秒）
      const openNp = async () => {
        if ((await st(page)).pop) { await page.clock.fastForward(6100); await sleep(350); }
        await tapEl(page, '.np-ic'); await sleep(2400);
        return geoNp(page);
      };
      const near = (r, L) => L.find(b => r.l < b.r + 2 && r.r > b.l - 2 && r.t < b.b + 2 && r.b > b.t - 2);
      await C(page, () => window.__lab.crowd.freezeAt([]));
      await sleep(800); await page.clock.fastForward(6100); await sleep(300);
      const g0 = await openNp();                                         // 店裡沒人
      await C(page, s => window.__lab.crowd.freezeAt(s), SETS.block); await sleep(900);
      const gB = await openNp();
      const blockedBy = g0.pop ? near(g0.pop, gB.people.concat(gB.says, gB.tags)) : null;   // 沒人時那個位置，現在蓋到誰
      // 擺得下（lv 0）＝換位置、不蓋人；都擺不下＝點 ♪ 放寬（lv ≥1，審查 M7：點了要有東西）：可以蓋到人，但泡泡不擋點擊、名牌／聊天泡泡／面板照樣不蓋
      const relaxOk = g => !!g.pop && g.lvl >= 1 && g.thru === true && !['out-of-view', 'out-of-host', 'panel'].includes(npClash(g)) && !/^(tag|say)/.test(npClash(g));
      const okB = !!g0.pop && !npClash(g0) && g0.lvl === 0 && gB.people.length >= 1 && !!blockedBy && !!gB.ic &&
        (gB.pop ? (gB.lvl === 0 ? !npClash(gB) && r4(gB.pop) !== r4(g0.pop) : relaxOk(gB)) : true);
      let gS = gB;
      if (SETS.show) { await C(page, s => window.__lab.crowd.freezeAt(s), SETS.show); await sleep(900); gS = await openNp(); }
      const clashS = npClash(gS);
      await shot(page, 'night-np-crowd', w, h);
      const sS = await st(page);
      // 點熟客聊天 → 泡泡收成小圖示
      const tp = await tapHot(page, h => /^cw-w/.test(h.id));
      const chat = await page.waitForSelector('.ds-say.chat', { timeout: 3000 }).then(() => true, () => false);
      await sleep(500);
      const s2 = await st(page);
      record(13, size, okB && gS.people.length >= 2 && !!gS.pop && !clashS && sS.pop && !!tp && chat && !s2.pop && s2.ic && gS.ic && gS.ic.b <= gS.panelT,
        `沒人：泡泡 ${g0.at}@${r4(g0.pop)}（第 ${g0.lvl} 層）${npClash(g0) ? ' 撞到 ' + npClash(g0) : ''}；熟客 ${gB.people.length} 位站上去（那個位置蓋到 ${blockedBy ? r4(blockedBy) : '沒有'}）→ ` +
        `${gB.pop ? '換到 ' + gB.at + '@' + r4(gB.pop) + '（第 ' + gB.lvl + ' 層）' + (npClash(gB) ? ' 撞到 ' + npClash(gB) + '（不擋點擊 ' + gB.thru + '）' : ' 不蓋人') : '只有小圖示 ' + !!gB.ic}；` +
        `熟客 ${gS.people.length} 位站別處：泡泡 ${gS.pop ? gS.at + '（第 ' + gS.lvl + ' 層）' + (clashS ? '撞到 ' + clashS : '不蓋人／泡泡／名牌／面板') : '沒展開'}（${sS.pop ? '還開著' : '收了'}、♪ 在面板上面 ${!!gS.ic && gS.ic.b <= gS.panelT}）；點熟客 ${tp && tp.action} → 聊天泡泡 ${chat}、正在播放收起來 ${!s2.pop}、♪ 還在 ${!!s2.ic}`);
    } catch (e) { record(13, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #14 ⏸ 三行（樂歷 Lv5）＋包包＋唱片櫃
  if (want(14)) {
    const { ctx, page } = await boot(browser, w, h, { dpr: 2 });
    try {
      await waitCalls(page, 1, 4000);
      const own = await spareIds(page, 3);
      await C(page, own => { const s = window.__lab.save; s.career.xp = 1200; own.forEach(id => { s.shelf[id] = { at: 'e2e', seen: true, own: true, src: 'gift' }; }); }, own);
      await page.clock.fastForward(6100); await sleep(200);
      await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=bsrc]', { timeout: 3000 }).catch(() => {}); await sleep(400);
      const txt = sel => C(page, sel => { const e = document.querySelector(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : null; }, sel);
      const r0 = { bgm: await txt('.lb-modal [data-a=bgm]'), vol: await txt('.lb-modal [data-a=mvol]'), src: await txt('.lb-modal [data-a=bsrc]'), note: await txt('.lb-modal .lb-bgmnote'), np: await txt('.lb-modal [data-a=np]') };
      await shot(page, 'pause-bgm', w, h);
      await jsClick(page, '.lb-modal [data-a=mvol]'); await sleep(150);
      const v1 = { t: await txt('.lb-modal [data-a=mvol]'), fx: (await st(page)).vol, sv: await C(page, () => window.__lab.save.settings.musicVol) };
      await jsClick(page, '.lb-modal [data-a=mvol]'); await sleep(150);
      const v2 = { t: await txt('.lb-modal [data-a=mvol]'), fx: (await st(page)).vol };
      await jsClick(page, '.lb-modal [data-a=bsrc]'); await sleep(150);
      const src2 = { t: await txt('.lb-modal [data-a=bsrc]'), sv: await C(page, () => window.__lab.save.settings.bgmSrc) };
      await jsClick(page, '.lb-modal [data-a=bgm]'); await sleep(400);
      const off = { t: await txt('.lb-modal [data-a=bgm]'), s: await st(page) };
      const nOn = await nCalls(page);
      await jsClick(page, '.lb-modal [data-a=bgm]'); await sleep(500);
      const on = { t: await txt('.lb-modal [data-a=bgm]'), s: await st(page) };
      await jsClick(page, '.lb-modal [data-a=resume]'); await sleep(300);
      // 包包＋唱片櫃：包包放完一輪，多一張唱片櫃的
      const n = (await st(page)).B.pl.bag.length, got = [];
      for (let i = 0; i < n + 2; i++) got.push(await next(page));
      const shelfHit = got.filter(id => own.indexOf(id) >= 0);
      record(14, size, /背景音樂.*開/.test(r0.bgm || '') && /音樂音量.*中/.test(r0.vol || '') && /背景音樂放.*包包/.test(r0.src || '') && !!r0.note && !!r0.np &&
          /大/.test(v1.t) && v1.fx === 0.7 && v1.sv === 0.7 && /小/.test(v2.t) && v2.fx === 0.3 && /唱片櫃/.test(src2.t) && src2.sv === 'both' &&
          /關/.test(off.t) && !off.s.playing && off.s.ic && /\boff\b/.test(off.s.ic.cls) && !off.s.nowKey && /開/.test(on.t) && on.s.calls.length > nOn && on.s.playing && shelfHit.length === 1,
        `⏸「${r0.np}」／「${r0.bgm}」「${r0.vol}」「${r0.src}」＋「${r0.note}」；音量 → ${v1.t}（fx ${v1.fx}）→ ${v2.t}（fx ${v2.fx}）；${src2.t}；背景音樂關 → 停 ${!off.s.playing}、♪ 灰、櫃檯唱盤回預設 ${!off.s.nowKey}；再開 → 接著放 ${on.s.playing}；` +
        `包包 ${n} 張放完多一張唱片櫃的：${shelfHit.join('、') || '沒有'}`);
    } catch (e) { record(14, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #16 只在來客、領獎、說情輪播：有 run 的標題不放；說情接著放；回標題放完不接
  if (want(16)) {
    const { ctx, page } = await boot(browser, w, h, { stayTitle: true });
    try {
      await sleep(2500);
      const sT = await st(page);                                       // 有 run 的回訪標題
      await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night');
      await waitCalls(page, 1, 4000); await sleep(300);
      await tapReady(page, '[data-a=go]');
      const inDuel = await waitScreen(page, 'duel', 15000);
      await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
      await sleep(500);
      const nD = await nCalls(page);
      await C(page, () => window.__lab.forceLose());
      const inSc = await waitScreen(page, 'scene', 15000);
      await waitCalls(page, nD + 1, 5000); await sleep(600);
      const sS = await st(page), cS = sS.calls[nD];
      // 回標題：♪ 收；正在放的那首放完不接下一首
      await C(page, () => window.__lab.go('title')); await sleep(600);
      const sT2 = await st(page), nT = sT2.calls.length;
      await end(page); await sleep(2000);
      const sT3 = await st(page);
      record(16, size, sT.calls.length === 0 && !sT.ic && !sT.B.zone && inDuel && inSc && sS.B.zone && !!cS && cS.s === 'ambient' && sS.playing &&
          !sT2.B.zone && !sT2.ic && !sT2.pop && sT3.calls.length === nT && !sT3.playing,
        `有 run 的標題：play ${sT.calls.length} 次、♪ ${sT.ic ? '有' : '沒有'}；輸了進說情（${sS.screen}）：輪播 ${sS.B.zone}、放 ${cS && cS.id}（${cS && cS.s}）在響 ${sS.playing}；` +
        `回標題：♪ ${sT2.ic ? '有' : '沒有'}、那首放完接下一首 ${sT3.calls.length - nT} 次`);
    } catch (e) { record(16, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #17 一次造訪新抓上限 30 首
  if (want(17)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      const extra = await spareIds(page, 30);
      await C(page, ids => ids.forEach(id => window.__lab.run.bag.push(id)), extra);
      const fs = [], got = [];
      for (let i = 0; i < 38; i++) { got.push(await next(page)); fs.push((await st(page)).fetch); }
      const s = await st(page);
      const capAt = fs.findIndex(f => f >= 30), after = capAt >= 0 ? got.slice(capAt + 1) : [];
      record(17, size, extra.length === 30 && s.fetch <= 30 && s.B.fetched >= 30 && capAt >= 0 && after.length >= 5 && after.every(Boolean) && fs.slice(capAt).every(f => f === fs[capAt]) && s.playing && s.lru.max === 12,
        `包包多 ${extra.length} 張沒下載過的、放 ${got.length} 首：網路 fetch 共 ${s.fetch}（輪播記的新抓 ${s.B.fetched}；第 ${capAt + 1} 首到上限）→ 之後 ${after.length} 首都放快取裡的、fetch 不再增加 ${capAt >= 0 && fs.slice(capAt).every(f => f === fs[capAt])}、在響 ${s.playing}；快取上限 ${s.lru.max}`);
    } catch (e) { record(17, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #18 saveData：背景音樂預設關
  if (want(18)) {
    const { ctx, page } = await boot(browser, w, h, { saveData: true });
    try {
      await sleep(2500);
      const s = await st(page);
      await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=bgm]', { timeout: 3000 }).catch(() => {}); await sleep(250);
      const t0 = await C(page, () => { const e = document.querySelector('.lb-modal [data-a=bgm]'); return e ? e.textContent.replace(/\s+/g, ' ').trim() : null; });
      await jsClick(page, '.lb-modal [data-a=bgm]'); await sleep(250);
      const t1 = await C(page, () => { const e = document.querySelector('.lb-modal [data-a=bgm]'); return e ? e.textContent.replace(/\s+/g, ' ').trim() : null; });
      const sv = await C(page, () => window.__lab.save.settings.bgm);
      await jsClick(page, '.lb-modal [data-a=resume]');
      await waitCalls(page, 1, 4000); await sleep(400);
      const s2 = await st(page);
      record(18, size, s.calls.length === 0 && !s.B.on && s.ic && /\boff\b/.test(s.ic.cls) && s.ic.text.trim() === '♪' && !s.pop && /關/.test(t0 || '') && /開/.test(t1 || '') && sv === true &&
          s2.calls.length >= 1 && s2.calls[0].s === 'ambient' && s2.playing,
        `saveData：沒設過＝關（play ${s.calls.length} 次、♪ ${s.ic ? s.ic.cls : '沒有'}、⏸「${t0}」）→ 打開「${t1}」（存 ${sv}）→ 開始輪播 ${s2.calls[0] && s2.calls[0].id}（${s2.calls[0] && s2.calls[0].s}）`);
    } catch (e) { record(18, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #19 背景分頁（B13）：切走停、不接下一首；切回來點一下同一首從頭、ambient
  if (want(19)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(400);
      const s0 = await st(page);
      const vis = v => C(page, v => {
        window.__vis = v;
        if (!window.__visHooked) { window.__visHooked = true; Object.defineProperty(document, 'hidden', { get: () => window.__vis === 'hidden', configurable: true }); Object.defineProperty(document, 'visibilityState', { get: () => window.__vis, configurable: true }); }
        document.dispatchEvent(new Event('visibilitychange'));
      }, v);
      await vis('hidden'); await sleep(300);
      const s1 = await st(page);
      await page.clock.fastForward(70000); await sleep(400);
      const s2 = await st(page);
      await vis('visible'); await sleep(400);
      const s3 = await st(page);
      await tapEl(page, '.lb-night .nh');
      await waitCalls(page, s3.calls.length + 1, 3000); await sleep(400);
      const s4 = await st(page), c4 = s4.calls[s3.calls.length];
      record(19, size, s0.playing && !s1.playing && s2.calls.length === s1.calls.length && !s2.playing && !s3.playing && !!c4 && c4.id === s0.cur && c4.s === 'ambient' && s4.playing && s4.sess === 'playback',   // v6-6：audioSession 一律 'playback'
        `切走：停 ${!s1.playing}、70 秒內 play ${s2.calls.length - s1.calls.length} 次；切回來還沒點 ${!s3.playing ? '不響' : '在響'}；點一下 → ${c4 && c4.id}（原本 ${s0.cur}、${c4 && c4.s}）在響 ${s4.playing}、audioSession ${s4.sess}`);
    } catch (e) { record(19, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #20 唱片資訊試聽（玩家點的）
  if (want(20)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      await page.clock.fastForward(6100); await sleep(200);
      const [x1, x2] = await spareIds(page, 2);
      const s0 = await st(page), head = s0.B.pl.queue[0];
      // ① 打開唱片資訊（有聲音的人一打開就放那張：cardinfo playCard）
      const n1 = await nCalls(page);
      await C(page, id => { window.__lab.info(id); }, x1);       // info() 的 promise 要等唱片資訊關掉才 resolve：不等它
      const open1 = await infoOpen(page, 2500);
      await waitCalls(page, n1 + 1, 2500); await sleep(300);
      const s1 = await st(page), c1 = s1.calls[n1];
      await page.clock.fastForward(121000); await sleep(400);          // 2 分鐘：輪播不插播
      const s2 = await st(page);
      await end(page);                                                   // 玩家點的那首放完
      const tE = Date.now();
      const ok3 = await waitCalls(page, n1 + 2, 2500); const dt = Date.now() - tE; await sleep(300);
      const s3 = await st(page), c3 = s3.calls[n1 + 1];
      await closeInfo(page); await sleep(1800);
      const s4 = await st(page);
      // ② 再開一張、試聽中關掉唱片資訊：原本那首輪播接著放，session 還是 ambient
      const back = s4.cur;
      const n5 = await nCalls(page);
      await C(page, id => { window.__lab.info(id); }, x2);
      await infoOpen(page, 2500);
      await waitCalls(page, n5 + 1, 2500); await sleep(300);
      await closeInfo(page); await sleep(1800);
      const s6 = await st(page), c6 = s6.calls.slice(n5 + 1);
      record(20, size, open1 && !!c1 && c1.id === x1 && c1.s === 'playback' && s1.sess === 'playback' && s2.calls.length === n1 + 1 && s2.cur === x1 &&
          ok3 && dt <= 1500 && c3 && c3.id === head && c3.s === 'ambient' && s3.playing && !s3.pop && s4.calls.length === n1 + 2 && !s4.pop &&
          c6.length >= 1 && c6[0].id === back && c6.every(c => c.s === 'ambient') && s6.playing && s6.sess === 'playback',   // v6-6：audioSession 一律 'playback'
        `唱片資訊試聽 ${c1 && c1.id}（${c1 && c1.s}、audioSession ${s1.sess}）；2 分鐘沒插播 ${s2.calls.length === n1 + 1}；放完 ${dt} ms 接回 ${c3 && c3.id}（佇列下一首 ${head}、${c3 && c3.s}）、唱片資訊開著沒出泡泡 ${!s3.pop}；` +
        `關掉後沒多放 ${s4.calls.length === n1 + 2}；試聽中關掉 → 接著放 ${c6.map(c => c.id + '（' + c.s + '）').join('、') || '沒有'}（原本 ${back}）、audioSession ${s6.sess}`);
    } catch (e) { record(20, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #21 攤位「店裡唱盤」：插播、佇列接著
  if (want(21)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      await C(page, () => {                                               // 打完第 15 位的攤位、第一組先「店裡唱盤」再挖寶攤（e2e-stall stallAt 同一招）
        window.__lab.jump(16);
        const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent;
        E.stallSession(r, Cn);
        // 第 I 波 I-3a（11-23 出貨＝市集）：市集＝攤位格一定有「店裡唱盤」（點那一格進去；不進別攤＝不會放公關片）；C 波（?market=0）照舊排組
        if (r.pending.mode === 'market') { if (!r.pending.tiles.includes('home')) r.pending.tiles[0] = 'home'; }
        else r.pending.groups = [['home', 'dig'], ['gig', 'promo']];   // 下一站不要排公關片（到站會自己放那張公關片）
        window.__lab.money(9000); window.__lab.go('night');
      });
      await page.waitForSelector('.st-pick .st-row, .st-mk .st-mgrid .st-mt', { timeout: 10000 }).catch(() => {}); await sleep(700);
      const sq = await st(page), q = sq.B.pl ? sq.B.pl.queue.slice() : [], pick = q[1] || q[0];
      if (await page.$('.st-mk .st-mgrid .st-mt')) await marketOpen(page, 'home');   // 市集：真點「店裡唱盤」那一格
      else {
        await tapReady(page, '.st-pick .st-row[data-g="0"]'); await sleep(350);
        await tapReady(page, '.st-pick .st-row[data-g="0"]');
      }
      const atHome = await page.waitForFunction(() => { const s = window.DipLabStalls.state(); return !!s && s.phase === 'station' && s.kind === 'home' && !!document.querySelector('.lb-sheet.stall.st-k-home'); }, null, { timeout: 12000 }).then(() => true, () => false);
      await sleep(300);
      const n1 = await nCalls(page), t1 = Date.now();
      await tapReady(page, `.lb-sheet.stall [data-home="${pick}"]`);
      const ok1 = await waitCalls(page, n1 + 1, 1500); const dt = Date.now() - t1; await sleep(400);
      const s1 = await st(page), c1 = s1.calls[n1];
      const rest = q.filter(id => id !== pick), got = [];
      for (let i = 0; i < 2; i++) got.push(await next(page));
      record(21, size, atHome && ok1 && !!c1 && c1.id === pick && s1.cur === pick && s1.playing && s1.nowKey === pick && got[0] === rest[0] && got[1] === rest[1],
        `店裡唱盤放 ${pick}（佇列第 2 首）→ ${dt} ms 插播 ${c1 && c1.id}（${c1 && c1.s}）、櫃檯唱盤 ${s1.nowKey}；放完接 ${got.join('、')}（佇列原本 ${rest.slice(0, 2).join('、')}）`);
    } catch (e) { record(21, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #22 舊 iOS：循環靜音 <audio> 後備只給玩家點的
  if (want(22)) {
    const { ctx, page } = await boot(browser, w, h, { oldIos: true });
    try {
      await waitCalls(page, 1, 4000); await sleep(500);
      const s0 = await st(page);
      await C(page, () => window.__lab.stageAction('listen'));
      const booth = await page.waitForSelector('.lb-sheet.float.booth [data-pick]', { timeout: 3000 }).then(() => true, () => false);
      await sleep(300);
      const n1 = await nCalls(page);
      if (booth) await jsClick(page, '.lb-sheet.float.booth [data-pick]');
      await waitCalls(page, n1 + 1, 2000); await sleep(500);
      const s1 = await st(page), c1 = s1.calls[n1];
      await jsClick(page, '.lb-sheet.float.booth [data-a=close]'); await sleep(300);
      const n2 = await nCalls(page);
      await end(page);
      await waitCalls(page, n2 + 1, 2500); await sleep(500);
      const s2 = await st(page), c2 = s2.calls[n2];
      // v6-6：輪播不再收掉循環靜音 <audio>（收掉＝WebAudio 回到環境音類別、跟著靜音鍵＝店主聽不到）→ 開店開了之後一路開著（輪播、試聽機、接回輪播都沒 pause）
      record(22, size, !s0.sess && !!s0.silent && /^play/.test(s0.silent.log) && s0.calls[0].s === 'ambient' && s0.playing && s0.silent.paused === false &&
          booth && c1 && c1.s === 'playback' && s1.playing && s1.silent.paused === false && c2 && c2.s === 'ambient' && s2.playing && s2.silent.paused === false && !/pause/.test(s2.silent.log),
        `沒有 audioSession：開店開了靜音 <audio>（${s0.silent && s0.silent.log}）→ 輪播 ${s0.calls[0] && s0.calls[0].id}（${s0.calls[0] && s0.calls[0].s}）時還開著 ${s0.silent && s0.silent.paused === false}；` +
        `試聽機 ${c1 && c1.id}（${c1 && c1.s}）開著 ${s1.silent && s1.silent.paused === false}；接回輪播 ${c2 && c2.id}（${c2 && c2.s}）還開著 ${s2.silent && s2.silent.paused === false}（${s2.silent && s2.silent.log}）`);
    } catch (e) { record(22, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== 審查修正（第 I 波 I-4 修正棒）：#23–#30
  const visSet = (page, v) => C(page, v => {
    window.__vis = v;
    if (!window.__visHooked) { window.__visHooked = true; Object.defineProperty(document, 'hidden', { get: () => window.__vis === 'hidden', configurable: true }); Object.defineProperty(document, 'visibilityState', { get: () => window.__vis, configurable: true }); }
    document.dispatchEvent(new Event('visibilitychange'));
  }, v);
  const ctxState = page => C(page, () => { const a = window.DipLabFx.audioContext(); return a && a.state; });
  const tapBg = page => C(page, () => document.querySelector('.lb-night .nh').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
  // #23 背景計時器（審查 H1）：換畫面後排著「4 秒後再看」時切背景 → 背景期間 0 次 play、AudioContext 不被拉回；連三首抓不到排著「60 秒後再試」時切背景也一樣；
  //     回前景點一下：同一首從頭放（1 次）／該接的那首接上（1 次）
  if (want(23)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      await C(page, () => window.__lab.go('night')); await sleep(300);          // 重畫來客＝bgmStart 在放 → 排 4 秒後再看
      await visSet(page, 'hidden'); await sleep(200);
      const n0 = await nCalls(page);
      await page.clock.fastForward(5000); await sleep(400);
      const a1 = await st(page), cs1 = await ctxState(page);
      await visSet(page, 'visible'); await sleep(200);
      await tapBg(page); await sleep(1200);
      const a2 = await st(page);
      // 連三首抓不到 → 60 秒後再試；中間切背景
      const sp = await spareIds(page, 3);
      await C(page, ids => { ids.forEach(id => window.__lab.run.bag.push(id)); window.__failAll = true; window.DipLabFx.music._end(); }, sp);
      await waitCalls(page, a2.calls.length + 3, 3000); await sleep(600);
      const b0 = await st(page);
      await visSet(page, 'hidden'); await sleep(200);
      await C(page, () => { window.__failAll = false; });
      await page.clock.fastForward(61000); await sleep(500);
      const b1 = await st(page), cs2 = await ctxState(page);
      await visSet(page, 'visible'); await sleep(200);
      await tapBg(page); await waitCalls(page, b1.calls.length + 1, 2500); await sleep(800);
      const b2 = await st(page), cb = b2.calls.slice(b1.calls.length);
      record(23, size, a1.calls.length === n0 && cs1 !== 'running' && !a1.playing && a2.calls.length === n0 + 1 && a2.calls[n0].id === a1.cur && a2.playing &&
          b0.B.retry && b1.calls.length === b0.calls.length && cs2 !== 'running' && b1.B.hidPend && cb.length === 1 && cb[0].s === 'ambient' && b2.playing && !b2.B.hidPend,
        `換畫面後 0.5 秒切背景：5 秒內 play ${a1.calls.length - n0} 次、AudioContext ${cs1}；回前景點一下 → ${a2.calls.length - n0} 次（${a2.calls[n0] && a2.calls[n0].id}）；` +
        `連三首抓不到（等 60 秒 ${b0.B.retry}）時切背景：61 秒內 play ${b1.calls.length - b0.calls.length} 次、AudioContext ${cs2}、記著要接 ${b1.B.hidPend}；回前景點一下 → ${cb.length} 次（${cb.map(c => c.id + '／' + c.s).join('、')}）在響 ${b2.playing}`);
    } catch (e) { record(23, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #24 離開輪播畫面時還在抓的那首作廢（審查 H2）＋對決的 audioSession 回 'playback'（審查 M4）：抓檔慢（4 秒），抓的時候點下一位進對決
  if (want(24)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      const [nw] = await spareIds(page, 1);
      const n0 = await nCalls(page);
      await C(page, id => { window.__lab.run.bag.push(id); window.__delay = 4000; window.DipLabFx.music._end(); }, nw);
      await waitCalls(page, n0 + 1, 2000); await sleep(300);
      const s0 = await st(page);
      await tapReady(page, '[data-a=go]');
      const inDuel = await waitScreen(page, 'duel', 15000);
      await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
      await page.clock.fastForward(6000); await sleep(800);
      const s1 = await st(page), head = s1.B.pl ? s1.B.pl.queue[0] : null;
      record(24, size, s0.B.loading && s0.calls[n0].id === nw && inDuel && s1.screen === 'duel' && !s1.playing && s1.cur !== nw && !s1.B.zone && !s1.B.loading && s1.sess === 'playback' && head === nw,
        `抓 ${nw} 抓到一半（loading ${s0.B.loading}）就進對決：抓完 ${s1.playing ? '在對決裡響了' : '沒響'}（fx current ${s1.cur}）、audioSession ${s1.sess}、那張回到佇列最前面 ${head === nw}`);
    } catch (e) { record(24, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #25 抓檔中在 ⏸ 關背景音樂（審查 M3）：抓完也不響、不多預抓；♪ 灰
  if (want(25)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      const [nw] = await spareIds(page, 1);
      const n0 = await nCalls(page);
      await C(page, id => { window.__lab.run.bag.push(id); window.__delay = 1800; window.DipLabFx.music._end(); }, nw);
      await waitCalls(page, n0 + 1, 2000); await sleep(200);
      await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=bgm]', { timeout: 3000 });
      await jsClick(page, '.lb-modal [data-a=bgm]');
      const f0 = (await st(page)).fetch;
      await jsClick(page, '.lb-modal [data-a=resume]');
      await page.clock.fastForward(3000); await sleep(800);
      const s1 = await st(page);
      record(25, size, !s1.B.on && !s1.playing && s1.cur !== nw && s1.fetch === f0 && s1.ic && /\boff\b/.test(s1.ic.cls) && s1.calls.length === n0 + 1,
        `抓 ${nw} 時關背景音樂：抓完響了 ${s1.playing}（fx current ${s1.cur}）、多抓 ${s1.fetch - f0} 次、♪ ${s1.ic && s1.ic.cls}`);
    } catch (e) { record(25, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #26 切背景超過 10 分鐘、回來點一下（審查 M5）：只 play 1 次、佇列沒被白拿；⏸ 關背景音樂停得掉
  if (want(26)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      const s0 = await st(page);
      await visSet(page, 'hidden'); await sleep(200);
      await page.clock.fastForward(11 * 60 * 1000); await sleep(400);
      const s1 = await st(page);
      await visSet(page, 'visible'); await sleep(200);
      await tapBg(page); await sleep(1500);
      const s2 = await st(page), c2 = s2.calls.slice(s1.calls.length);
      await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=bgm]', { timeout: 3000 });
      await jsClick(page, '.lb-modal [data-a=bgm]'); await jsClick(page, '.lb-modal [data-a=resume]'); await sleep(1500);
      const s3 = await st(page);
      record(26, size, s1.B.idle && c2.length === 1 && c2[0].s === 'ambient' && s2.playing && s2.B.mine && s2.B.cur === s2.cur && JSON.stringify(s2.B.pl.queue) === JSON.stringify(s0.B.pl.queue) && !s3.playing && !s3.B.on,
        `切走 11 分鐘（閒置 ${s1.B.idle}）→ 回來點一下 play ${c2.length} 次（${c2.map(c => c.id + '／' + c.s).join('、')}）、輪播認得這首 ${s2.B.mine}、佇列沒被白拿 ${JSON.stringify(s2.B.pl.queue) === JSON.stringify(s0.B.pl.queue)}；⏸ 關背景音樂 → 停 ${!s3.playing}`);
    } catch (e) { record(26, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #27 慢網路（審查 M6）：每首 2.7 秒才抓完（超過 fx 預設 2.5 秒）＝輪播照樣每首都放、不停 60 秒；新抓上限照「下載開始」算（網路 fetch ≤ 記的 ≤ 30）
  if (want(27)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      const extra = await spareIds(page, 16);
      await C(page, ids => { ids.forEach(id => window.__lab.run.bag.push(id)); window.__delay = 2700; }, extra);
      const f0 = (await st(page)).fetch;
      let played = 0, retry = 0;
      for (let i = 0; i < 30; i++) {
        const n0 = await nCalls(page);
        await end(page);
        await waitCalls(page, n0 + 1, 3000);
        await page.clock.fastForward(3000);
        const ok = await page.waitForFunction(() => window.DipLabFx.music.playing(), null, { timeout: 3000, polling: 50 }).then(() => true, () => false);
        const s = await st(page); if (ok && s.playing) played++; if (s.B.retry) retry++;
      }
      const s = await st(page);
      record(27, size, played === 30 && !retry && s.fetch <= 30 && s.fetch <= s.B.fetched && s.B.fetched <= 30,
        `每首晚 2.7 秒才抓完、包包 ${s.B.pl.bag.length} 張：30 首放了 ${played} 首、停下來等 60 秒 ${retry} 次；網路 fetch ${s.fetch}（輪播記的新抓 ${s.B.fetched}）`);
    } catch (e) { record(27, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #28 沒在放的時候 ♪ 不是「有歌」（審查 L9）：連三首抓不到、等 60 秒的空檔 → ♪ 收起來；點不到「正在播放」上一首
  if (want(28)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      await page.clock.fastForward(6500); await sleep(200);
      const sp = await spareIds(page, 3), n0 = await nCalls(page);
      await C(page, ids => { ids.forEach(id => window.__lab.run.bag.push(id)); window.__failAll = true; window.DipLabFx.music._end(); }, sp);
      await waitCalls(page, n0 + 3, 3000); await sleep(400);
      const s1 = await st(page);
      const t = s1.ic ? await tapEl(page, '.np-ic') : null; await sleep(500);
      const s2 = await st(page);
      await C(page, () => { window.__failAll = false; });
      record(28, size, s1.B.retry && !s1.playing && (!s1.ic || !/\bon\b/.test(s1.ic.cls)) && !s2.pop,
        `連三首抓不到、等 60 秒：在響 ${s1.playing}、♪ ${s1.ic ? s1.ic.cls : '收起來'}${t ? '（點了）' : ''}、泡泡 ${s2.pop ? s2.pop.cid : '沒有'}`);
    } catch (e) { record(28, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #29 活店（?crowd=1）點 ♪ 一定有泡泡（審查 M7）、泡泡不擋任何熱點的點擊點（審查 L11）；第一首擺不下＝不吃掉「第一首」的額度；
//   聊天中點 ♪（post 審查：原本只跳一下、等不到聊天結束就放棄）＝避開聊天泡泡展開、不閃（那段聊天不收它）、不蓋聊天泡泡／名牌
  if (want(29)) {
    const { ctx, page } = await boot(browser, w, h, { crowd: true, dpr: 2 });
    try {
      await sleep(800);
      const first = await st(page);
      const firstOk = first.popLog.length ? !first.B.first : first.B.first;   // 展開過＝用掉；還沒展開（擺不下、等鏡頭停）＝額度還在
      await page.clock.fastForward(8500); await sleep(300);
      let ok = 0, thru = 0; const miss = [];
      for (let i = 0; i < 8; i++) {
        if ((await st(page)).pop) { await page.clock.fastForward(6100); await sleep(300); }
        const t = await tapEl(page, '.np-ic'); await sleep(1200);
        const s = await st(page);
        if (t && s.pop) ok++; else miss.push(i);
        if (s.pop && await C(page, () => { const st = window.__lab.stage, hb = st.host.getBoundingClientRect(), p = document.querySelector('.np-pop.on');
          return (st.shop.hotPoints() || []).every(q => { const e = document.elementFromPoint(hb.left + q.x, hb.top + q.y); return !e || (e !== p && !p.contains(e)); }); })) thru++;
        await page.clock.fastForward(6100); await sleep(400 + 300 * (i % 3));
      }
      // 聊天中點 ♪：避開聊天泡泡展開、1.5 秒後還開著（不閃）、聊天泡泡還在
      if ((await st(page)).pop) { await page.clock.fastForward(6100); await sleep(300); }
      const tp = await tapHot(page, h => /^cw-w/.test(h.id));
      const chat = await page.waitForSelector('.ds-say.chat', { timeout: 3000 }).then(() => true, () => false);
      await sleep(300);
      await tapEl(page, '.np-ic'); await sleep(700);
      const gC = await geoNp(page), sC = await st(page);
      await shot(page, 'np-chat', w, h);
      await sleep(800);
      const gC2 = await geoNp(page), chat2 = await C(page, () => !!document.querySelector('.ds-say.chat'));
      const clashC = gC.pop ? npClash(gC) : 'no-pop';
      const chatOk = !!gC.pop && gC.says.length >= 1 && !/^(tag|say|out-of|panel)/.test(clashC) && gC.thru === true && !!gC2.pop && r4(gC2.pop) === r4(gC.pop) && chat2;
      record(29, size, firstOk && ok === 8 && thru === 8 && !!tp && chat && chatOk,
        `第一首 ${first.popLog.length ? '展開過' : '擺不下＝額度留著 ' + first.B.first}；活店點 ♪ 8 次：有泡泡 ${ok} 次${miss.length ? '（沒有：' + miss.join(',') + '）' : ''}、每個熱點點擊點最上層都不是泡泡 ${thru} 次；` +
        `聊天中（${chat}）點 ♪：泡泡 ${gC.pop ? gC.at + '@' + r4(gC.pop) + '（第 ' + gC.lvl + ' 層）' + (clashC ? ' 撞到 ' + clashC : ' 不蓋人／泡泡／名牌／面板') : '沒出'}、1.5 秒後 ${gC2.pop ? (r4(gC2.pop) === r4(gC.pop) ? '還在原位' : '換位 ' + r4(gC2.pop)) : '收了'}、聊天還在 ${chat2}；${sC.B.popTap ? '點 ♪ 開的' : ''}`);
    } catch (e) { record(29, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== 第 I 波 post 審查（合併 I-0 之後）
  // #31 抓檔中被取消（⏸ 背景音樂 關→開、回標題再繼續）之後輪播接得回來（post 審查 A：fx cancel 後 loading() 一直是 true，bgmResume 到點不再排＝整條停到下一次換畫面）
  if (want(31)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      const [nw, nw2] = await spareIds(page, 2);
      const n0 = await nCalls(page);
      await C(page, id => { window.__lab.run.bag.push(id); window.__delay = 9000; window.DipLabFx.music._end(); }, nw);
      await waitCalls(page, n0 + 1, 2000); await sleep(200);
      const s0 = await st(page), fl0 = await C(page, () => window.DipLabFx.music.loading());
      await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=bgm]', { timeout: 3000 });
      await jsClick(page, '.lb-modal [data-a=bgm]'); await sleep(200);
      const fl1 = await C(page, () => window.DipLabFx.music.loading());
      await jsClick(page, '.lb-modal [data-a=bgm]'); await sleep(200);
      await jsClick(page, '.lb-modal [data-a=resume]'); await sleep(300);
      const s1 = await st(page), c1 = s1.calls[n0 + 1];
      await page.clock.fastForward(9500); await sleep(500);
      const s2 = await st(page);
      // 回標題（抓檔中）→ 繼續
      const n2 = s2.calls.length;
      await C(page, id => { window.__lab.run.bag.push(id); window.__delay = 9000; window.DipLabFx.music._end(); }, nw2);
      await waitCalls(page, n2 + 1, 2000); await sleep(200);
      await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=title]', { timeout: 3000 });
      await jsClick(page, '.lb-modal [data-a=title]'); await waitScreen(page, 'title'); await sleep(300);
      await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night'); await sleep(800);
      const s3 = await st(page), c3 = s3.calls[n2 + 1];
      await page.clock.fastForward(9500); await sleep(500);
      const s4 = await st(page);
      record(31, size, s0.B.loading && fl0 && !fl1 && !!c1 && c1.id === nw && c1.s === 'ambient' && s2.playing && s2.cur === nw && s2.B.mine && !!c3 && c3.id === nw2 && s4.playing && s4.cur === nw2,
        `抓 ${nw}（9 秒）中 ⏸ 背景音樂 關 → fx loading ${fl0}→${fl1}；再開 → 重抓 ${c1 ? c1.id + '／' + c1.s : '沒有'}、9.5 秒後在響 ${s2.playing}（${s2.cur}）；` +
        `抓 ${nw2} 中回標題再繼續 → ${c3 ? c3.id : '沒有新 play'}、9.5 秒後在響 ${s4.playing}（${s4.cur}）`);
    } catch (e) { record(31, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #32 這次造訪還沒點過畫面、慢網路（每首 4 秒）點「點我放歌」：照背景音樂的 12 秒等、輪播接管（post 審查 K：fx 接回那首用 2.5 秒就放棄、之後沒人接）；抓不到＝跳下一首
  if (want(32)) {
    const { ctx, page } = await boot(browser, w, h, { gesture: false });
    try {
      await sleep(1500);
      const s0 = await st(page), id0 = s0.cur;
      await C(page, () => { window.__delay = 4000; });
      const t = s0.ic && /\btap\b/.test(s0.ic.cls) ? await tapEl(page, '.np-ic') : null;
      await sleep(400);
      const s1 = await st(page), c1 = s1.calls[s0.calls.length];
      await page.clock.fastForward(3000); await sleep(300);
      const s2 = await st(page);
      await page.clock.fastForward(1500); await sleep(500);
      const s3 = await st(page);
      // 抓不到的那首（輪播接管＝跳下一首）：下一首設成抓不到 → 放完
      const n3 = s3.calls.length;
      await C(page, () => { window.__delay = 0; window.__failAll = true; window.DipLabFx.music._end(); });
      await waitCalls(page, n3 + 3, 4000); await sleep(400);
      const s4 = await st(page);
      await C(page, () => { window.__failAll = false; });
      record(32, size, !!t && t.top && !!c1 && c1.id === id0 && c1.s === 'ambient' && s1.B.loading && s1.B.cur === id0 && !s2.playing && s2.B.loading && s3.playing && s3.cur === id0 && s3.B.mine && s3.sess === 'playback' && s4.B.retry,   // v6-6：audioSession 一律 'playback'
        `點「點我放歌」→ ${c1 ? c1.id + '／' + c1.s : '沒有 play'}、輪播接管 ${s1.B.loading && s1.B.cur === id0}；3 秒還在抓 ${s2.B.loading}（沒放棄）；4.5 秒在響 ${s3.playing}（${s3.cur}、${s3.sess}）；` +
        `之後連三首抓不到 → 等 60 秒 ${s4.B.retry}`);
    } catch (e) { record(32, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #33 換歌空檔（上一首放完、下一首在抓）⏸ 聲音 關→開（post 審查 C）：接回在抓的那首、照 'ambient'（不是把放完那首用 'playback' 從頭再放）；⏸ 背景音樂 關停得掉
  if (want(33)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      const s0 = await st(page), old = s0.cur;
      const [nw] = await spareIds(page, 1);
      const n0 = await nCalls(page);
      await C(page, id => { window.__lab.run.bag.push(id); window.__delay = 3000; window.DipLabFx.music._end(); }, nw);
      await waitCalls(page, n0 + 1, 2000); await sleep(200);
      await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=snd]', { timeout: 3000 });
      await jsClick(page, '.lb-modal [data-a=snd]'); await sleep(200);
      await jsClick(page, '.lb-modal [data-a=snd]'); await sleep(300);
      await jsClick(page, '.lb-modal [data-a=resume]');
      const s1 = await st(page), c1 = s1.calls.slice(n0 + 1);
      await page.clock.fastForward(3500); await sleep(500);
      const s2 = await st(page);
      await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=bgm]', { timeout: 3000 });
      await jsClick(page, '.lb-modal [data-a=bgm]'); await jsClick(page, '.lb-modal [data-a=resume]'); await sleep(1500);
      const s3 = await st(page);
      record(33, size, c1.length === 1 && c1[0].id === nw && c1[0].s === 'ambient' && !c1.some(c => c.id === old) && s2.playing && s2.cur === nw && s2.sess === 'playback' && s2.B.mine && s2.B.cur === nw && !s3.playing,
        `${old} 放完、${nw} 在抓時 聲音 關→開：play ${c1.map(c => c.id + '／' + c.s).join('、') || '沒有'}；抓完在響 ${s2.playing}（${s2.cur}、audioSession ${s2.sess}、輪播認得 ${s2.B.mine}）；⏸ 背景音樂 關 → 停 ${!s3.playing}`);
    } catch (e) { record(33, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #34 展開中被吐司疊到＝淡掉、吐司走了再出來（post 審查：吐司字疊在泡泡字上）；活店熟客走進展開中的泡泡＝不收（post 審查：1.5～3.6 秒就被擠掉）；
  //     熟客聊天把自動展開的擠掉（還沒停滿）＝額度退回（2 分鐘不用再等）；第二行放不下＝慢慢捲到尾巴（post 審查：專輯名被截掉）
  if (want(34)) {
    const { ctx, page } = await boot(browser, w, h, { crowd: true, dpr: 2 });
    try {
      await C(page, () => window.__lab.crowd.freezeAt([]));
      await sleep(800); await page.clock.fastForward(6100); await sleep(300);
      // 換一首長名字的（插到最前面）、等 2 分鐘再換＝自動展開
      const long = await C(page, () => { const C = window.DipLabContent.cards, r = window.__lab.run, aces = Object.values(window.DipLabContent.aces);
        return Object.keys(C).filter(id => C[id].previewUrl && !C[id].pool && !C[id].tier && r.bag.indexOf(id) < 0 && aces.indexOf(id) < 0).sort((a, b) => (C[b].artist + C[b].album).length - (C[a].artist + C[a].album).length)[0]; });
      await C(page, id => window.__lab.run.bag.push(id), long);
      await page.clock.fastForward(120500);
      const idL = await next(page); await sleep(300);
      const g0 = await geoNp(page), s0 = await st(page);
      // 熟客站上去（沒人時那個位置現在蓋到人）：還開著、沒換位置
      const SETS = w >= 390 ? ['c-elec', 'c-hiphop', 'c-pay'] : ['c-elec'];
      await C(page, s => window.__lab.crowd.freezeAt(s), SETS); await sleep(900);
      const g1 = await geoNp(page);
      const overPpl = !!g1.pop && g1.people.some(b => hit(g1.pop, b));
      await shot(page, 'np-crowd-keep', w, h);
      // 吐司疊上去：淡掉、計時停住（假時鐘再走 4 秒還開著）→ 吐司走了：出來、之後照樣收
      await C(page, () => { const p = document.querySelector('.np-pop.on').getBoundingClientRect(), t = document.createElement('div'); t.className = 'lb-toast e2e-toast'; t.textContent = '唱片櫃 +2';
        const ab = document.getElementById('app').getBoundingClientRect(); t.style.cssText = `left:${p.left - ab.left}px;top:${p.top - ab.top}px;transform:none;`; document.getElementById('app').appendChild(t); });
      await sleep(700);
      await shot(page, 'np-toast-duck', w, h);
      const pk = () => C(page, () => { const p = document.querySelector('.np-pop'); return { on: p.classList.contains('on'), duck: p.classList.contains('duck'), op: +getComputedStyle(p).opacity }; });
      const d1 = await pk();
      await page.clock.fastForward(4000); await sleep(200);
      const d2 = await pk();
      await C(page, () => document.querySelector('.e2e-toast').remove()); await sleep(700);
      const d3 = await pk();
      await page.clock.fastForward(6500); await sleep(400);
      const d4 = (await pk()).on;
      // 第二行捲動（點 ♪ 再開）：1.1 秒後開始（假時鐘）、CSS 動畫走真時間
      await C(page, () => window.__lab.crowd.freezeAt([])); await sleep(500);
      await tapEl(page, '.np-ic'); await sleep(400);
      const sT = await st(page);
      await page.clock.fastForward(1200); await sleep(3600);
      const mq = await C(page, () => { const b = document.querySelector('.np-pop.on b'); if (!b) return null; const cs = getComputedStyle(b), t = b.firstChild, rg = document.createRange();
        rg.setStart(t, Math.max(0, t.length - 1)); rg.setEnd(t, t.length); const lr = rg.getBoundingClientRect(), br = b.getBoundingClientRect();
        return { ov: b.scrollWidth - b.clientWidth, ind: parseFloat(cs.textIndent), tailIn: lr.right <= br.right + 0.5 && lr.left >= br.left - 0.5, nowrap: cs.whiteSpace === 'nowrap', ell: cs.textOverflow === 'ellipsis' }; });
      await shot(page, 'np-marquee-end', w, h);
      // 熟客聊天擠掉自動展開的（還沒停滿）：額度退回
      await page.clock.fastForward(6100); await sleep(300);
      await page.clock.fastForward(120500);
      await next(page); await sleep(300);
      const s5 = await st(page), at5 = s5.B.popAt, prev5 = sT.B.popAt;
      await C(page, () => window.__lab.crowd.freezeAt(['c-listen'])); await sleep(900);
      const tp = await tapHot(page, h => /^cw-w/.test(h.id));
      const chat = await page.waitForSelector('.ds-say.chat', { timeout: 3000 }).then(() => true, () => false);
      await sleep(500);
      const s6 = await st(page);
      record(34, size, !!g0.pop && !!s0.pop && s0.pop.cid === idL && !!g1.pop && r4(g1.pop) === r4(g0.pop) && d1.on && d1.duck && d1.op < 0.05 && d2.on && d2.duck && d3.on && !d3.duck && d3.op > 0.95 && !d4 &&
          !!sT.pop && !!mq && mq.ov > 1 && mq.ind <= -mq.ov && mq.tailIn && mq.nowrap && mq.ell &&
          !!s5.pop && chat && !!tp && !s6.pop && s6.B.popAt === prev5 && s6.B.popAt !== at5,
        `長名字 ${idL} 自動展開；熟客 ${g1.people.length} 位站上去（蓋到人 ${overPpl}）：${g1.pop ? (r4(g1.pop) === r4(g0.pop) ? '還在原位' : '換到 ' + r4(g1.pop)) : '收了'}；` +
        `吐司疊上去：淡掉 ${d1.duck}（${d1.op}）、4 秒後還開著 ${d2.on}；吐司走了：出來 ${!d3.duck}（${d3.op}）、之後收 ${!d4}；` +
        `點 ♪ 再開：第二行超出 ${mq && mq.ov} px → 捲到 ${mq && mq.ind}（最後一個字在框裡 ${mq && mq.tailIn}、一行截斷樣式照舊 ${mq && mq.nowrap && mq.ell}）；` +
        `聊天（${chat}）擠掉 2 分鐘後那次：收 ${!s6.pop}、額度退回 ${s6.B.popAt === prev5}`);
    } catch (e) { record(34, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #30 鏡頭移動中 ♪ 跟著收音機、泡泡等鏡頭停了才展開（審查 L13）；「點我放歌」膠囊整個在鏡頭裡（審查 L10）；⏸ 選單 Lv1、Lv5 都不用捲（審查 L12）
  if (want(30)) {
    const { ctx, page } = await boot(browser, w, h, { stayTitle: true });
    try {
      await sleep(600);
      await C(page, () => {
        window.__samp = []; const t0 = performance.now();
        (function f() {
          if (performance.now() - t0 > 3000) return;
          try { if (window.__lab.screen() === 'night') { const g = window.__lab.bgm(true), hb = window.__lab.stage.host.getBoundingClientRect(), ic = document.querySelector('.np-ic'), p = document.querySelector('.np-pop.on');
            const ir = ic && ic.style.display !== 'none' ? ic.getBoundingClientRect() : null;
            if (g.R) window.__samp.push([performance.now() - t0, g.R.l, g.R.t, ir ? ir.left - hb.left : null, ir ? ir.top - hb.top : null, !!p]); } } catch (_) {}
          requestAnimationFrame(f);
        })();
        document.querySelector('[data-a=cont]').click();
      });
      await sleep(3300);
      const S = await C(page, () => window.__samp);
      const withIc = S.filter(x => x[3] != null), dx = withIc.map(x => Math.round(x[3] - x[1])), dy = withIc.map(x => Math.round(x[4] - x[2]));
      const icFollow = withIc.length > 10 && Math.max(...dx) - Math.min(...dx) <= 3 && Math.max(...dy) - Math.min(...dy) <= 3;   // 同一格裡誰先跑（鏡頭的 rAF、♪ 的 rAF、取樣）最多差一格
      let lastMove = 0; for (let i = 1; i < S.length; i++) if (Math.abs(S[i][2] - S[i - 1][2]) > 0.5 || Math.abs(S[i][1] - S[i - 1][1]) > 0.5) lastMove = S[i][0];
      const firstPop = (S.find(x => x[5]) || [null])[0];
      const popAfter = firstPop != null && firstPop >= lastMove + 300;
      await ctx.close();
      // 「點我放歌」膠囊
      const b = await boot(browser, w, h, { gesture: false });
      await sleep(1200);
      const L = await C(b.page, () => { const ic = document.querySelector('.np-ic'), st = window.__lab.stage, hb = st.host.getBoundingClientRect(), g = window.__lab.bgm(true), r = ic.getBoundingClientRect();
        return { cls: ic.className, r: [r.left, r.top, r.right, r.bottom], V: [g.V.l + hb.left, g.V.t + hb.top, g.V.r + hb.left, g.V.b + hb.top], vw: innerWidth }; });
      const pillIn = /\btap\b/.test(L.cls) && L.r[0] >= L.V[0] - 0.5 && L.r[2] <= L.V[2] + 0.5 && L.r[1] >= L.V[1] - 0.5 && L.r[3] <= L.V[3] + 0.5 && L.r[2] <= L.vw;
      await b.ctx.close();
      // ⏸ 選單：Lv1、Lv5（樂歷 1200）都不用捲
      const menu = [];
      for (const lv5 of [false, true]) {
        const m = await boot(browser, w, h, {});
        if (lv5) await C(m.page, () => { window.__lab.save.career.xp = 1200; });
        await jsClick(m.page, '#top [data-a=pause]'); await m.page.waitForSelector('.lb-modal [data-a=bgm]', { timeout: 3000 }); await sleep(400);
        menu.push(await C(m.page, () => { const mo = document.querySelector('.lb-modal'), pane = mo.querySelector('.pane'), rs = document.querySelector('.lb-modal [data-a=reset]').getBoundingClientRect();
          return { sh: mo.scrollHeight, ch: mo.clientHeight, resetB: Math.round(rs.bottom), vh: innerHeight, src: !!document.querySelector('.lb-modal [data-a=bsrc]'), tight: [...pane.querySelectorAll('.lb-btn')].filter(b => b.scrollWidth > b.clientWidth + 1).map(b => b.getAttribute('data-a')) }; }));
        await m.ctx.close();
      }
      const menuOk = menu.every(m => m.sh <= m.ch && m.resetB <= m.vh && !m.tight.length) && !menu[0].src && menu[1].src;
      record(30, size, icFollow && popAfter && pillIn && menuOk,
        `鏡頭移動 ${withIc.length} 格：♪ 跟收音機的距離 dx ${Math.min(...dx)}～${Math.max(...dx)}、dy ${Math.min(...dy)}～${Math.max(...dy)}；鏡頭最後動在 ${Math.round(lastMove)} ms、泡泡 ${firstPop == null ? '沒展開' : Math.round(firstPop) + ' ms'} 才展開；` +
        `「點我放歌」[${L.r.map(Math.round)}] 在鏡頭 [${L.V.map(Math.round)}] 裡 ${pillIn}；⏸ Lv1 ${menu[0].sh}/${menu[0].ch}、Lv5 ${menu[1].sh}/${menu[1].ch}（重置鈕底 ${menu[1].resetB}／${menu[1].vh}；字擠出 ${menu.map(m => m.tight.join(',')).join('|') || '沒有'}）`);
    } catch (e) { record(30, size, false, 'threw: ' + (e && e.stack || e)); }
  }
  // =========================================================== 第三輪審查（main 上）
  const pend = page => C(page, () => { const p = window.DipLabFx.music.pending(); return p ? { id: p.card.id, s: p.session } : null; });
  const pauseSnd = async page => {
    await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=snd]', { timeout: 3000 }); await sleep(150);
    await jsClick(page, '.lb-modal [data-a=snd]'); await sleep(150);
    await jsClick(page, '.lb-modal [data-a=resume]'); await sleep(300);
  };
  // #35 F1：新開頁第一首還在抓（唱盤上還沒有任何一張）就 ⏸ 關聲音 → 進對決 → 在對決裡打開聲音：輪播那首不在對決裡響、audioSession 不被切成 'ambient'
  if (want(35)) {
    const { ctx, page } = await boot(browser, w, h, { before: p => C(p, () => { window.__delay = 5000; }) });
    try {
      const s0 = await st(page);
      await pauseSnd(page);
      const pd0 = await pend(page);
      await tapReady(page, '[data-a=go]');
      const inDuel = await waitScreen(page, 'duel', 15000);
      await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
      await sleep(500);
      const pd1 = await pend(page), n1 = await nCalls(page), q1 = await C(page, () => { const P = window.__lab.bgm().pl; return P ? P.queue[0] : null; });
      await pauseSnd(page);
      await page.clock.fastForward(6000); await sleep(800);
      const s2 = await st(page), c2 = s2.calls.slice(n1);
      record(35, size, s0.B.loading && !s0.cur && !!pd0 && pd0.s === 'ambient' && inDuel && !pd1 && q1 === pd0.id && !c2.some(c => c.s === 'ambient') && s2.sess !== 'ambient' && s2.cur !== pd0.id && !s2.playing,
        `第一首 ${s0.B.cur} 還在抓（唱盤上 ${s0.cur || '沒有'}）時關聲音：fx 記著 ${pd0 ? pd0.id + '／' + pd0.s : '沒有'}；進對決 ${inDuel} 後還記著 ${pd1 ? pd1.id + '／' + pd1.s : '沒有'}、那張回到佇列最前面 ${q1 === (pd0 && pd0.id)}（${q1}）；` +
        `對決裡開聲音 → play ${c2.length} 次（${c2.map(c => c.id + '／' + c.s).join('、') || '—'}）、在響 ${s2.playing}（${s2.cur || '—'}）、audioSession ${s2.sess}`);
    } catch (e) { record(35, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #36 F2：?apex=1、Lv5「包包＋唱片櫃」：唱片櫃裡擁有的頂點卡（打倒藏家拿到的）、這一趟的王牌都不放；一般的唱片櫃那張照放
  if (want(36)) {
    const { ctx, page } = await boot(browser, w, h, { q: '&apex=1' });
    try {
      await waitCalls(page, 1, 4000); await sleep(300);
      const info = await C(page, () => {
        const L = window.__lab, s = L.save, CC = window.DipLabContent, cards = CC.cards, aces = Object.values(CC.aces), r = L.run;
        s.career.xp = 1200; s.settings.bgmSrc = 'both';
        Object.keys(s.shelf).forEach(id => { s.shelf[id].own = false; });
        const free = id => cards[id].previewUrl && aces.indexOf(id) < 0 && r.bag.indexOf(id) < 0;
        const apex = Object.keys(cards).filter(id => cards[id].tier && free(id)).sort().slice(0, 3);
        const plain = Object.keys(cards).filter(id => !cards[id].tier && !cards[id].pool && free(id)).sort()[0];
        apex.forEach(id => { s.shelf[id] = { at: 'e2e', seen: true, own: true, src: 'boss' }; });
        s.shelf[plain] = { at: 'e2e', seen: true, own: true, src: 'gift' };
        return { apex, plain, ace: L.aceId(), open: !!L.bgm().shelfOpen };
      });
      const n = (await st(page)).B.pl.bag.length, got = [];
      for (let i = 0; i < n + 3; i++) got.push(await next(page));
      const bad = got.filter(id => info.apex.indexOf(id) >= 0 || id === info.ace);
      record(36, size, info.apex.length === 3 && info.open && got.every(Boolean) && !bad.length && got.indexOf(info.plain) >= 0,
        `唱片櫃：頂點卡 ${info.apex.length} 張＋一般 1 張（${info.plain}）、王牌 ${info.ace}；包包 ${n} 張、連放 ${got.length} 首：頂點卡／王牌放到 ${bad.join('、') || '0'}、唱片櫃一般那張放到 ${got.indexOf(info.plain) >= 0}`);
    } catch (e) { record(36, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #37 F4／F5／F3：活店切磋邀請（&enc=force）。第一首「正在播放」出了停滿、不被收、不疊泡泡；v6 第 3 條（店主 11-28）起熟客不走到對戰台嗆你（在店裡逛、點他才有切磋）：
  //   邀請開著時字卡照常出、不出在「來一盤」他走過去那段（phase call）；
  //   打贏切磋、戰利品列（照領獎鏡頭收、收音機只露一小截）：♪ 不擋牆上封面、海報、櫃檯「正在放」的點擊點
  if (want(37)) {
    const sampler = p => C(p, () => {
      window.__npS = []; const t0 = performance.now();
      setInterval(() => { try {
        const L = window.__lab; if (!L || L.screen() !== 'night') return;
        const e = L.crowd.enc(), p = document.querySelector('.np-pop'), on = !!p && p.style.display !== 'none' && p.classList.contains('on');
        const says = [...document.querySelectorAll('.ds-say')].map(x => ({ chat: x.classList.contains('chat'), r: x.getBoundingClientRect() })).filter(x => x.r.width > 0);
        const pr = on ? p.getBoundingClientRect() : null, over = !!pr && says.some(q => !(q.r.right <= pr.left || q.r.left >= pr.right || q.r.bottom <= pr.top || q.r.top >= pr.bottom));
        window.__npS.push([Math.round(performance.now() - t0), on ? 1 : 0, e && e.ui ? e.ui.phase : '', says.some(q => q.chat) ? 1 : 0, says.length, over ? 1 : 0, L.bgm().closeWhy || '']);
      } catch (_) {} }, 50);
    });
    const { ctx, page } = await boot(browser, w, h, { crowd: true, q: '&enc=force', noFast: true, settle: 300, before: sampler });   // 照真的速度（&fast=1 把「30 秒沒理他」壓成 7.5 秒，他那句「你好像在忙」會在字卡停滿前出來）
    try {
      await page.waitForFunction(() => { const S = window.__npS || [], i = S.findIndex(x => x[1]); return i >= 0 && S.slice(i).some(x => !x[1]); }, null, { timeout: 45000, polling: 200 }).catch(() => {});
      const S = await C(page, () => window.__npS.slice());
      const i0 = S.findIndex(x => x[1]), i1 = i0 >= 0 ? S.findIndex((x, k) => k > i0 && !x[1]) : -1;
      const span = i0 >= 0 && i1 > 0 ? S[i1][0] - S[i0][0] : null, why = i1 > 0 ? S[i1][6] : '';
      const walkOn = S.filter(x => x[1] && x[2] === 'call').length, chatOn = S.filter(x => x[1] && x[3]).length, overOn = S.filter(x => x[5]).length;
      const roamed = S.some(x => x[2] === 'roam');                            // 邀請真的開著（v6 第 3 條：他在店裡逛，不嗆）
      // 收的原因：停滿 popMs（6 秒）之後才被走過的人擋到收（tick）＝已經停滿，不算被提早收（v6 第 3 條：他在店裡逛，375×548 收音機旁多一個走動的人）
      const fullMs = (await C(page, () => (window.DipLabContent.bgm || {}).popMs)) || 6000;
      const firstOk = i0 >= 0 && roamed && !walkOn && !chatOn && !overOn && span != null && span >= 5000 && (!/chat|tick|cam/.test(why) || (why === 'tick' && span >= fullMs));
      // 打贏切磋 → 戰利品列
      await C(page, () => window.__lab.force({ kind: 'counter', toE: 99, toP: 0 }));
      // 邀請還開著（他在店裡逛）就點他；他已經逛完出門了＝同一位再開一次（__lab.crowd.enc(who)），等他站好再點（他的走動槽熱點 cw-<slot>，最多 10 秒）
      const e0 = await C(page, () => window.__lab.crowd.enc());
      if (!(e0 && e0.ui && e0.ui.phase === 'roam' && e0.pending === 'offer')) {
        await C(page, who => window.__lab.crowd.enc(who), (e0 && e0.ui && e0.ui.who) || 'akai');
        await page.waitForFunction(() => { const e = window.__lab.crowd.enc(); return !!e && !!e.ui && e.ui.phase === 'roam'; }, null, { timeout: 20000, polling: 200 }).catch(() => {});
        await sleep(800);
      }
      let hot = null, sheet = false;
      for (let k = 0; k < 20 && !sheet; k++) {
        const slot = await C(page, () => { const e = window.__lab.crowd.enc(), w = e && e.ui && e.ui.who, q = w && window.__lab.crowd.state().slots.find(x => x.on && x.who === w && !x.hidden && x.phase === 'stay' && !x.walking && x.y >= 150); return q ? q.slot : null; });
        hot = slot ? await tapHot(page, 'h => h.id === "cw-' + slot + '"') : null;
        sheet = !!hot && await page.waitForSelector('.lb-sheet.float.enc', { timeout: 1500 }).then(() => true, () => false);
        if (!sheet) await sleep(500);
      }
      await tapReady(page, '.lb-sheet.float.enc [data-a=encYes]');
      const dr = await duelReady(page, 25000); await sleep(400);
      await C(page, () => window.DipLabDuel.autoplay && window.DipLabDuel.autoplay('thoughtful'));
      const back = await waitScreen(page, 'night', 90000);
      await C(page, () => window.__lab.force(null));
      const lr = await lootReady(page, 15000); await sleep(1200);
      const L = await C(page, () => {
        const st = window.__lab.stage, sh = st.shop, hb = st.host.getBoundingClientRect(), ic = document.querySelector('.np-ic'), pop = document.querySelector('.np-pop');
        const mine = e => !!e && ((ic && (e === ic || ic.contains(e))) || (pop && (e === pop || pop.contains(e))));
        const pts = (sh.hotPoints() || []).filter(q => /^rack:|^poster|^now$|^cat$/.test(q.id)).map(q => ({ id: q.id, x: Math.round(q.x), y: Math.round(q.y), np: mine(document.elementFromPoint(hb.left + q.x, hb.top + q.y)) }));
        const r = ic && ic.style.display !== 'none' ? ic.getBoundingClientRect() : null, g = window.__lab.bgm(true), g0 = window.__lab.bgm();
        return { pts, ic: r && r.width ? [r.left - hb.left, r.top - hb.top, r.right - hb.left, r.bottom - hb.top].map(Math.round) : null, icMode: g0.icMode, R: g.R ? [g.R.t, g.R.b].map(Math.round) : null, V: g.V ? Math.round(g.V.t) : null, loot: !!document.querySelector('#panel .lb-sheet.reward.lt-sheet') };
      });
      const stolen = L.pts.filter(q => q.np);
      const lootOk = !!hot && sheet && dr && back && lr && L.loot && L.pts.length > 0 && !stolen.length;
      await shot(page, 'bgm37-loot', w, h);
      record(37, size, firstOk && lootOk,
        `第一首字卡：${i0 >= 0 ? S[i0][0] + ' ms 出、停 ' + span + ' ms（收的原因 ' + (why || '時間到') + '）' : '沒出'}；邀請開著（他在店裡逛）${roamed}；他走過去時出現 ${walkOn} 格、聊天時出現 ${chatOn} 格、疊到泡泡 ${overOn} 格；` +
        `切磋（點他 ${hot && hot.id}、面板 ${sheet}、對決 ${dr}、回來客 ${back}、戰利品列 ${lr}）：收音機 [${L.R}]／鏡頭上緣 ${L.V}、♪ ${L.ic ? '[' + L.ic + ']' : '藏'}（${L.icMode}）；小熱點點擊點 ${L.pts.length} 個、被 ♪／字卡擋到 ${stolen.map(q => q.id + '@' + q.x + ',' + q.y).join('、') || '0'}`);
    } catch (e) { record(37, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== v6-6（店主 11-28）#38–#40：來客畫面真的在放、狀態字跟實際一致、淡入淡出
  //   音量看 fx music._gain()（GainNode 當下的值；假播放器的 source 是假的，GainNode 跟 AudioContext 是真的，時間用 context 自己的 currentTime）
  // 在頁面裡每 40 ms 取樣：fn() 回 { v, id }；t＝AudioContext.currentTime（真的音訊時鐘，不受 page.clock 影響）；取 ms 毫秒（音訊時間）
  const gainTrace = (page, which, ms, kick) => C(page, ([which, ms, kick]) => new Promise(res => {
    const F = window.DipLabFx, m = F.music, ac = F.audioContext(), out = [], t0 = ac.currentTime;
    if (kick === 'end') m._end();
    else if (kick === 'title') window.__lab.go('title');
    else if (kick === 'booth') document.querySelector('.lb-sheet.float.booth [data-pick]').click();
    else if (kick === 'mute') document.querySelector('.lb-modal [data-a=snd]').click();
    const tick = () => { const g = m._gain(); out.push({ t: +(ac.currentTime - t0).toFixed(3), v: which === 'out' ? g.out : g.cur, id: which === 'out' ? g.outId : g.curId, ms: g.outMs, ctx: g.ctx });
      if (ac.currentTime - t0 < ms / 1000) setTimeout(tick, 40); else res(out); };
    tick();
  }), [which, ms, kick]);
  const fmtTr = tr => tr.filter((x, i) => i % 4 === 0).map(x => x.t.toFixed(2) + ':' + (x.v == null ? '-' : x.v.toFixed(2))).join(' ');
  // #38 來客畫面有包包的唱片＝真的在放（context running、在響、泡泡字＝唱盤上那張＝包包裡的）；context 卡住 1.5 秒＝不寫正在播放、改「點我放歌」；點 ♪＝接著響
  if (want(38)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000);
      const up = await page.waitForFunction(() => window.__lab.bgm().popOpen && window.DipLabFx.music.playing(), null, { timeout: 8000, polling: 50 }).then(() => true, () => false);
      const s0 = await st(page), g0 = await C(page, () => window.DipLabFx.music._gain()), bag = await C(page, () => window.__lab.run.bag.slice()), c0 = await card(page, s0.cur);
      const live = up && s0.screen === 'night' && s0.B.zone && !!s0.cur && bag.indexOf(s0.cur) >= 0 && s0.playing && g0.ctx === 'running' && s0.calls[s0.calls.length - 1].s === 'ambient' &&
        s0.sess === 'playback' && !!s0.pop && s0.pop.cid === s0.cur && !!c0 && s0.pop.text.indexOf('正在播放') >= 0 && s0.pop.text.indexOf(c0.artist + '《' + c0.album + '》') >= 0;
      // context 被系統停住（iOS 被別的音訊打斷、resume 被擋）：source 還在，但沒聲音
      await C(page, () => window.DipLabFx.audioContext().suspend());
      await sleep(300); await page.clock.fastForward(1700); await sleep(400);
      const s1 = await st(page), au1 = await C(page, () => window.DipLabFx.music.audible());
      const honest = !s1.playing && !au1 && s1.B.snd === 'locked' && !s1.pop && !!s1.ic && /\btap\b/.test(s1.ic.cls) && /點我放歌/.test(s1.ic.text) && s1.cur === s0.cur;
      await shot(page, 'bgm38-stuck', w, h);
      // 點「點我放歌」（真的觸控）：在手勢裡 resume → 同一首接著響、♪ 回到「有歌」、泡泡字跟著回來
      const n1 = s1.calls.length;
      const tp = await tapEl(page, '.np-ic');
      const back = await page.waitForFunction(() => window.DipLabFx.music.playing(), null, { timeout: 3000, polling: 50 }).then(() => true, () => false);
      await sleep(400); await page.clock.fastForward(600); await sleep(300);
      const s2 = await st(page), g2 = await C(page, () => window.DipLabFx.music._gain());
      const resumed = !!tp && back && s2.playing && g2.ctx === 'running' && s2.cur === s0.cur && s2.B.snd === 'on' && !!s2.ic && /\bon\b/.test(s2.ic.cls) && !/點我放歌/.test(s2.ic.text) && s2.calls.length === n1;
      record(38, size, live && honest && resumed,
        `來客：放 ${s0.cur}（包包裡 ${bag.indexOf(s0.cur) >= 0}、${s0.calls.length && s0.calls[s0.calls.length - 1].s}）、context ${g0.ctx}、在響 ${s0.playing}、audioSession ${s0.sess}、泡泡「${s0.pop ? s0.pop.text : '沒有'}」；` +
        `context 停住 1.7 秒：在響 ${s1.playing}／audible ${au1}、狀態 ${s1.B.snd}、泡泡 ${s1.pop ? '還在' : '收了'}、♪「${s1.ic ? s1.ic.text : '沒有'}」（${s1.ic && s1.ic.cls}）；` +
        `點 ♪ → context ${g2.ctx}、在響 ${s2.playing}（${s2.cur}）、♪ ${s2.ic && s2.ic.cls}、多 play ${s2.calls.length - n1} 次`);
    } catch (e) { record(38, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #39 淡入：換下一首（自然放完）→ 新那首的音量從很小開始、約 1.2 秒升到設定值（⏸ 音樂音量 中＝0.5）；減少動態效果（reduced motion）照樣淡入
  if (want(39)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(1500);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const rm = await C(page, () => window.DipLabFx.reducedMotion());
      const id0 = (await st(page)).cur, vol = (await st(page)).vol;
      const tr = await gainTrace(page, 'cur', 2200, 'end');
      // 新的 GainNode 還沒算過第一個 render quantum 時 .value 讀到預設 1（不是真的音量）：新那首的第一筆不算
      const mine = tr.filter(x => x.id && x.id !== id0 && x.v != null).slice(1);
      const t1 = mine.length ? mine[0].t : 0, rel = mine.map(x => ({ t: x.t - t1, v: x.v }));
      const first = rel[0], at = s => rel.filter(x => x.t >= s)[0];
      const mid = at(0.5), done = at(1.35);
      const mono = rel.every((x, i) => !i || x.v >= rel[i - 1].v - 0.01);
      record(39, size, rm && mine.length >= 10 && !!first && first.v <= vol * 0.35 && !!mid && mid.v > first.v + 0.05 && mid.v < vol * 0.85 && !!done && Math.abs(done.v - vol) <= 0.03 && mono,
        `減少動態效果 ${rm}；${id0} 放完 → ${mine[0] && mine[0].id}：音量 ${first ? first.v.toFixed(2) : '-'} → 0.5 秒 ${mid ? mid.v.toFixed(2) : '-'} → 1.35 秒 ${done ? done.v.toFixed(2) : '-'}（設定 ${vol}）、只升不降 ${mono}；${fmtTr(rel)}`);
    } catch (e) { record(39, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #40 淡出（約 0.8 秒、不是一刀切）：店裡唱盤換一張（換曲）、⏸ 關聲音、回標題（離開輪播畫面）——被收掉那首的音量慢慢降到 0
  if (want(40)) {
    const { ctx, page } = await boot(browser, w, h, {});
    try {
      await waitCalls(page, 1, 4000); await sleep(1500);
      const okFade = (tr, id) => { const m = tr.filter(x => x.id === id && x.v != null), a = m.filter(x => x.t >= 0.25 && x.t <= 0.45)[0], z = m.filter(x => x.t >= 0.95)[0];
        return { ok: m.length >= 5 && m[0].v >= 0.3 && !!a && a.v > 0.05 && a.v < 0.42 && !!z && z.v <= 0.01 && m[0].ms >= 700 && m[0].ms <= 900, a: a ? a.v.toFixed(2) : '-', z: z ? z.v.toFixed(3) : '-', ms: m[0] ? m[0].ms : null, v0: m[0] ? m[0].v.toFixed(2) : '-' }; };
      // 換曲：試聽機點一張（玩家點的蓋過輪播）→ 輪播那首淡出
      const s0 = await st(page);
      await C(page, () => window.__lab.stageAction('listen'));
      const booth = await page.waitForSelector('.lb-sheet.float.booth [data-pick]', { timeout: 3000 }).then(() => true, () => false);
      await sleep(300);
      const trA = booth ? await gainTrace(page, 'out', 1200, 'booth') : [], A = okFade(trA, s0.cur);
      const fr = (await st(page)).cur;
      await jsClick(page, '.lb-sheet.float.booth [data-a=close]'); await sleep(600);
      // ⏸ 關聲音 → 正在放那首淡出
      const s1 = await st(page);
      await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=snd]', { timeout: 3000 }).catch(() => {}); await sleep(300);
      const trB = await gainTrace(page, 'out', 1200, 'mute'), B = okFade(trB, s1.cur);
      const sB = await st(page);
      await jsClick(page, '.lb-modal [data-a=snd]'); await sleep(300);              // 聲音再開：接著放（試聽機那張）
      await jsClick(page, '.lb-modal [data-a=resume]'); await sleep(500);
      await end(page);                                                               // 試聽機那張放完 → 接回輪播
      await page.waitForFunction(() => window.DipLabFx.music.playing() && window.DipLabFx.music.session() === 'ambient', null, { timeout: 5000, polling: 50 }).catch(() => {});
      await sleep(1500);
      // 回標題（離開輪播畫面）→ 輪播那首淡出、不再放完才停
      const s2 = await st(page);
      const trC = await gainTrace(page, 'out', 1200, 'title'), C3 = okFade(trC, s2.cur);
      await sleep(300);
      const s3 = await st(page);
      record(40, size, A.ok && B.ok && !sB.playing && C3.ok && s2.playing && s2.B.mine && s3.screen === 'title' && !s3.playing && !s3.cur,
        `換曲（試聽機 ${fr}）：${s0.cur} ${A.v0} → 0.3 秒 ${A.a} → 1 秒 ${A.z}（${A.ms} ms）；⏸ 關聲音：${s1.cur} ${B.v0} → ${B.a} → ${B.z}（${B.ms} ms）、停了 ${!sB.playing}；` +
        `回標題：${s2.cur} ${C3.v0} → ${C3.a} → ${C3.z}（${C3.ms} ms）、之後沒在放 ${!s3.playing && !s3.cur}`);
    } catch (e) { record(40, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // #41 包包全是精選新卡、試聽（cards-media.json）比來客畫面晚到：到之前不放、不出「正在播放」；一到就接著輪播（不用等換畫面）
  if (want(41)) {
    const { ctx, page } = await newPage(browser, w, h, {});
    let release = null; const gate = new Promise(r => { release = r; }); let held = 0;
    await page.route('**/cards-media.json*', async route => { held++; await gate; await route.continue(); });
    try {
      await page.addInitScript(fakeInit);
      await page.clock.install();
      const q = Q('&fast=1');
      await openTitle(page, q);
      await seedRun(page, { idx: 0 });
      await C(page, () => {
        const s = JSON.parse(localStorage.getItem('dipGameLab_v1')), Cn = window.DipLabContent;
        const pool = Object.keys(Cn.cards).filter(id => Cn.cards[id].pool && !Cn.cards[id].tier).sort().slice(0, 8);
        s.run.bag = pool; s.settings.sound = true; localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
      });
      await openTitle(page, q);
      await C(page, () => document.querySelector('[data-a=cont]').click());
      await waitScreen(page, 'night'); await sleep(1500);
      const s0 = await st(page), m0 = await C(page, () => !!window.DipLabContent.mediaReady);
      release();
      const got = await page.waitForFunction(() => window.DipLabContent.mediaReady && window.DipLabFx.music.playing(), null, { timeout: 15000, polling: 100 }).then(() => true, () => false);
      await sleep(400);
      const s1 = await st(page), bag = await C(page, () => window.__lab.run.bag.slice()), pool1 = await C(page, id => !!(window.DipLabContent.cards[id] || {}).pool, s1.cur);
      record(41, size, held >= 1 && !m0 && s0.screen === 'night' && s0.calls.length === 0 && !s0.playing && !s0.pop && got && s1.playing && bag.indexOf(s1.cur) >= 0 && pool1 && s1.calls.length >= 1 && s1.calls[0].s === 'ambient',
        `cards-media.json 擋著（${held} 次請求）：來客畫面 play ${s0.calls.length} 次、在響 ${s0.playing}、泡泡 ${s0.pop ? '有' : '沒有'}；放行 → 套上 ${got}、放 ${s1.cur}（精選新卡 ${pool1}、包包裡 ${bag.indexOf(s1.cur) >= 0}、${s1.calls[0] && s1.calls[0].s}）`);
    } catch (e) { record(41, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { try { release(); } catch (_) {} await ctx.close(); }
  }
}

const browser = await launch();
try { for (const [w, h] of SIZES) await runSize(browser, w, h); }
finally { await browser.close(); }
const failed = results.filter(r => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} PASS` + (failed.length ? `，FAIL：${failed.map(r => '#' + r.n + '[' + r.size + ']').join(' ')}` : ''));
process.exit(failed.length ? 1 : 0);
