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
//   1  輪播：有聲音進來客 → play 收到包包裡有試聽的一張（session ambient）；送 ended → 下一張不同；連 n 首（n＝包包可放的張數）每張剛好一次；第二輪第一首不是剛放完那張
//   2  快取跟佇列：fx 快取上限＝max(6, min(12, n))；連放兩輪，第二輪 fetch 0 次
//   3  收一張新的（run.bag 多一張有試聽的）→ 下一首就是它
//   4  泡泡：第一首展開（♪ 正在播放＋藝人《專輯》）、6 秒後收（假時鐘）；第二首不展開；隔 2 分鐘換歌才再展開；點 ♪ 展開；點泡泡＝唱片資訊
//   5  抓不到：那首回 false → 1 秒內換下一首、那首不出泡泡；連三首 false → 停、60 秒（假時鐘）後再試一次
//   6  對決：點下一位進對決 → 停（current 空、♪ 收）；打贏 → 領獎畫面勝利曲在放時輪播不插播 → 勝利曲 ended → 接回輪播（佇列接著）
//   7  試聽機：點一張＝session 'playback'、輪播讓位；ended → 接回輪播、'ambient'；maxMs 淡出（試聽 15 秒那種）→ 1.5 秒後接回輪播
//   8  背景音樂關：進來客不呼叫 play（輪播）、♪ 灰、沒有字；試聽機照放
//   9  沒解鎖（不經點擊直接進來客）：只換唱盤上那張（沒出聲）、收音機旁「點我放歌」→ 真點 → unlockFromGesture(true)、開始出聲、泡泡展開
//   10 行動網路：一首都沒下載過＝不輪播、不出泡泡、fetch 0；放過幾首後切行動網路＝只放快取裡的、fetch 不再增加
//   11 櫃檯唱盤＝正在放的那張（stage.nowKey、熱點「正在放」的 action）；對決中不換
//   12 閒置 10 分鐘（假時鐘）→ 淡出、不再預抓；點一下接著放
//   13 活店（?crowd=1）：熟客站在店裡時展開的泡泡不蓋熟客人物矩形、聊天泡泡、名牌、底部面板；熟客聊天泡泡出來＝收成小圖示
//   14 ⏸：背景音樂 開／關、音樂音量 小中大（fx 音量跟著換）、樂歷 Lv5 起「背景音樂放 包包／包包＋唱片櫃」（Lv1 沒有這行）；包包＋唱片櫃＝包包放完一輪多一張唱片櫃的
//   15 主控台 0 錯誤、#app 不捲動
// 每一項印 PASS／FAIL；任何 FAIL → exit 1。
import fs from 'fs';
import path from 'path';
import { launch, newPage, openTitle, Q, record, results, sleep, jsClick, waitScreen, tapHot, tapReady, seedRun, infoOpen, closeInfo, noScroll, scrollOk } from './e2e-lib.mjs';

const SIZES = (process.env.LAB_SIZES || '390x664,375x548').split(',').filter(Boolean).map(s => s.split('x').map(Number));
const ONLY = process.env.LAB_BGM ? new Set(process.env.LAB_BGM.split(',').map(s => s.trim())) : null;
const want = n => !ONLY || ONLY.has(String(n));
const SHOTS = process.env.LAB_SHOTS || '';
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });

// ---- 頁面裡的替身（addInitScript）
function fakeInit() {
  window.__dipFakeAudio = { calls: [] };
  window.__fetchLog = []; window.__bgmFail = {}; window.__failAll = false;
  let conn = 'wifi'; try { conn = localStorage.getItem('__e2eConn') || 'wifi'; } catch (_) {}
  window.__conn = { type: conn, effectiveType: '4g', saveData: false };
  const of = window.fetch;
  window.fetch = function (u, o) {
    const s = String((u && u.url) || u);
    if (/itunes-assets\//.test(s)) {
      window.__fetchLog.push(s);
      if (window.__failAll || window.__bgmFail[s]) return Promise.reject(new TypeError('Failed to fetch'));
      return Promise.resolve(new Response(new ArrayBuffer(64), { status: 200 }));
    }
    return of.apply(this, arguments);
  };
  Object.defineProperty(navigator, 'audioSession', { value: { type: 'auto' }, configurable: true });
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
    ic: vis(ic) ? { cls: ic.className, text: ic.textContent, r: rr(ic) } : null, B, sess: navigator.audioSession.type, nowKey: window.__lab.stage.nowKey(), nowAct: nowHot ? nowHot.action : null,
    lru: m._lru(), vol: m.volume(), screen: window.__lab.screen() };
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

// 開一頁：o.sound（預設 true）、o.bgm（undefined＝預設）、o.gesture（false＝不經點擊直接進來客）、o.crowd、o.conn、o.dpr
async function boot(browser, w, h, o = {}) {
  const { ctx, page } = await newPage(browser, w, h, { dpr: o.dpr || 1 });
  await page.addInitScript(fakeInit);
  await page.clock.install();
  const q = Q('&fast=1' + (o.crowd ? '&crowd=1' : ''));
  await openTitle(page, q);
  await seedRun(page, Object.assign({ idx: 0 }, o.crowd ? { idx: 1, seen: { crowdIntro: true, expertIntro: true } } : {}));   // 活店：老闆的第一次提示都算看過（不搶聊天）
  await C(page, o => {
    const s = JSON.parse(localStorage.getItem('dipGameLab_v1'));
    s.settings.sound = o.sound !== false; if (o.bgm != null) s.settings.bgm = o.bgm;
    localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
    if (o.conn) localStorage.setItem('__e2eConn', o.conn); else localStorage.removeItem('__e2eConn');
  }, o);
  await openTitle(page, q);
  if (o.gesture === false) await C(page, () => window.__lab.go('night'));
  else await jsClick(page, '[data-a=cont]');
  await waitScreen(page, 'night');
  await sleep(1200);
  return { ctx, page };
}
// 真點一個 DOM 元素的正中間（最上層要是它）
async function tapEl(page, sel) {
  const p = await C(page, sel => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2; const t = document.elementFromPoint(x, y); return { x, y, top: !!t && (t === e || e.contains(t)) }; }, sel);
  if (!p) return null;
  await page.touchscreen.tap(p.x, p.y);
  return p;
}
const shot = async (page, name, w, h) => { if (SHOTS) await page.screenshot({ path: path.join(SHOTS, `${name}-${w}.png`) }); };

async function runSize(browser, w, h) {
  const size = w + 'x' + h;
  // =========================================================== A：輪播、快取、泡泡、抓不到、試聽機、閒置、對決（活店關）
  if (['1', '2', '3', '4', '5', '6', '7', '11', '12', '15'].some(want)) {
    const { ctx, page } = await boot(browser, w, h, { dpr: 2 });
    try {
      await waitCalls(page, 1, 4000); await sleep(200);
      const s0 = await st(page), bag = s0.B.pl ? s0.B.pl.bag : [], n = bag.length, c0 = await card(page, s0.calls[0] && s0.calls[0].id);
      const scrolls = [await noScroll(page)];
      // #4 第一首展開、#11 櫃檯唱盤
      const pop1 = s0.pop && c0 && s0.pop.cid === c0.id && s0.pop.text.indexOf(c0.artist + '《' + c0.album + '》') >= 0 && s0.pop.text.indexOf('正在播放') >= 0;
      await shot(page, 'night-np', w, h);
      const nowOk = s0.nowKey === s0.cur && s0.nowAct === 'wall-record:' + s0.cur;
      await page.clock.fastForward(6100); await sleep(250);
      const s1 = await st(page);
      const ids = [s0.calls[0] && s0.calls[0].id];
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
      if (want(1)) record(1, size, n >= 4 && s0.calls[0].s === 'ambient' && s0.calls[0].snd && one(ids) && id2 !== ids[0] && one(ids2) && ids2[0] !== ids[n - 1] && s0.playing,
        `包包可放 ${n} 張；第一首 ${ids[0]}（${s0.calls[0] && s0.calls[0].s}）；第一輪 ${new Set(ids).size} 張不重複、第二輪 ${new Set(ids2).size} 張不重複；第二輪第一首≠剛放完：${ids2[0] !== ids[n - 1]}`);
      if (want(2)) record(2, size, sA.lru.max === Math.max(6, Math.min(12, n)) && sB.fetch - fetch1 === 0 && fetch1 >= n,
        `快取上限 ${sA.lru.max}（佇列 ${n}）；第一輪 fetch ${fetch1} 次、第二輪 ${sB.fetch - fetch1} 次`);
      // #4 第二首不展開；隔 2 分鐘換歌才展開；點 ♪ 展開；點泡泡＝唱片資訊
      await page.clock.fastForward(120500);
      const id4 = await next(page); const s4 = await st(page);
      await page.clock.fastForward(6100); await sleep(250);
      const s5 = await st(page);
      const tIc = await tapEl(page, '.np-ic'); await sleep(250);
      const s6 = await st(page);
      const tPop = s6.pop ? await tapEl(page, '.np-pop') : null;
      const ciOpen = tPop ? await infoOpen(page, 2500) : false;
      const ciId = ciOpen ? await C(page, () => { const c = window.DipLabCardInfo && window.DipLabCardInfo.current && window.DipLabCardInfo.current(); return c ? c.id : null; }) : null;
      if (ciOpen) await closeInfo(page);
      if (want(4)) record(4, size, pop1 && !s1.pop && s1.ic && /\bon\b/.test(s1.ic.cls) && !s2.pop && s4.pop && s4.pop.cid === id4 && !s5.pop && tIc && tIc.top && s6.pop && tPop && tPop.top && ciOpen && ciId === s6.pop.cid,
        `第一首展開 ${pop1}（${s0.pop && s0.pop.at}）→ 6 秒後收 ${!s1.pop}；第二首不展開 ${!s2.pop}；隔 2 分鐘換歌展開 ${!!s4.pop}；點 ♪ 展開 ${!!s6.pop}（♪ 在最上層 ${tIc && tIc.top}）；點泡泡＝唱片資訊 ${ciOpen}（${ciId}）`);
      if (want(11)) record(11, size, nowOk, `櫃檯唱盤 ${s0.nowKey}＝正在放 ${s0.cur}；熱點 ${s0.nowAct}`);
      // #3 收一張新的 → 下一首就是它
      const [nw] = await spareIds(page, 1);
      await C(page, id => { window.__lab.run.bag.push(id); }, nw);
      const id3 = await next(page);
      if (want(3)) record(3, size, !!nw && id3 === nw, `包包多了 ${nw} → 下一首 ${id3}`);
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
      if (want(5)) record(5, size, skipOk && dt5 < 1000 && ok6 && s8.calls.length === n6 + 3 && s8.B.retry && !s8.playing && s9.calls.length > s8.calls.length && s9.playing && !s9.B.retry,
        `抓不到 ${bad && bad.id} → ${dt5} ms 換 ${c5[1] && c5[1].id}、泡泡 ${s7.pop ? s7.pop.cid : '沒有'}；連三首抓不到＝停（${s8.calls.length - n6} 次、等 60 秒 ${s8.B.retry}）→ 60 秒後再試 ${s9.calls.length - s8.calls.length} 次、在放 ${s9.playing}`);
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
      if (want(7)) record(7, size, booth && cb && cb.s === 'playback' && s10.cur === cb.id && s10.sess === 'playback' && s10b.calls.length === n8 && cr && cr.s === 'ambient' && s11.sess === 'ambient' && s11.playing &&
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
      // 打完那一下勝利曲先響（duel.js winnerSong 同一個呼叫；forceWin 不走盤面的收尾，這裡代放）→ 領獎
      const [vid] = await spareIds(page, 8).then(a => a.slice(7));
      const head6 = (await st(page)).B.pl.queue[0] || null;
      const n13 = await nCalls(page);
      await C(page, id => window.DipLabFx.music.play(window.DipLabContent.cards[id], { fadeMs: 600 }), vid);
      await page.waitForFunction(() => window.DipLabFx.music.playing(), null, { timeout: 2000, polling: 50 }).catch(() => {});
      await C(page, () => window.__lab.forceWin());
      const inRw = await waitScreen(page, 'reward', 15000);
      await sleep(2500);
      const s17 = await st(page);
      const n14 = await nCalls(page);
      await end(page);
      await waitCalls(page, n14 + 1, 2500); await sleep(300);
      const s18 = await st(page), cw = s18.calls[n14];
      if (want(6)) record(6, size, inDuel && !s16.cur && !s16.ic && !s16.pop && !s16.B.zone && inRw && s17.calls.length === n13 + 1 && s17.cur === vid && cw && cw.s === 'ambient' && (!head6 || cw.id === head6) && s18.playing && s18.pop && s18.pop.cid === cw.id,
        `進對決：停 ${!s16.cur}、♪ 收 ${!s16.ic}；領獎勝利曲 ${vid} 在放時沒插播 ${s17.calls.length === n13 + 1}；ended → ${cw && cw.id}（佇列下一首 ${head6}）、領獎畫面第一首展開 ${!!s18.pop}`);
      if (want(11)) record('11b', size, s16.nowKey === nowBefore && s17.nowKey === vid, `對決中櫃檯唱盤不換（${s16.nowKey}）；領獎勝利曲在放＝${s17.nowKey}`);
      const errs = page._errors.concat(page._badLocal);
      if (want(15)) record(15, size, !errs.length && scrolls.every(scrollOk) && lv1.bgm && lv1.vol && !lv1.src, (errs.length ? '主控台錯誤：' + errs.slice(0, 3).join(' | ') : '主控台 0 錯誤') + `；不捲動 ${scrolls.every(scrollOk)}；⏸ Lv1：背景音樂 ${lv1.bgm}、音量 ${lv1.vol}、沒有「背景音樂放」${!lv1.src}`);
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
      record(8, size, s.calls.length === 0 && s.ic && /\boff\b/.test(s.ic.cls) && s.ic.text.trim() === '♪' && !s.pop && booth && s2.calls.length === 1 && s2.calls[0].s === 'playback' && s2.playing && !s2.pop,
        `背景音樂關：輪播 play ${s.calls.length} 次、♪ ${s.ic ? s.ic.cls + '「' + s.ic.text.trim() + '」' : '沒有'}、泡泡 ${s.pop ? '有' : '沒有'}；試聽機照放 ${s2.calls.length === 1 && s2.calls[0].s}`);
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
      record(10, size, s.calls.length === 0 && s.fetch === 0 && !s.pop && cached.length >= 2 && got.every(Boolean) && urls.every(u => cached.indexOf(u) >= 0) && s2.fetch === f0,
        `行動網路沒下載過：play ${s.calls.length}、fetch ${s.fetch}、泡泡 ${s.pop ? '有' : '沒有'}；Wi-Fi 下載 ${cached.length} 首 → 行動網路連 3 首都在快取裡 ${urls.every(u => cached.indexOf(u) >= 0)}、fetch +${s2.fetch - f0}`);
    } catch (e) { record(10, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
  // =========================================================== #13 活店：避開熟客、聊天泡泡優先
  if (want(13)) {
    const { ctx, page } = await boot(browser, w, h, { crowd: true, dpr: 2 });
    try {
      await C(page, () => window.__lab.crowd.freezeAt(['c-elec', 'c-hiphop', 'c-pay']));
      await sleep(800);
      await page.clock.fastForward(6100); await sleep(300);
      await tapEl(page, '.np-ic'); await sleep(350);
      const geo = await C(page, () => {
        const st = window.__lab.stage, rr = r => ({ l: r.left, t: r.top, r: r.right, b: r.bottom });
        const pop = document.querySelector('.np-pop.on'), ic = document.querySelector('.np-ic');
        const people = (window.DipLabCrowd.state().slots || []).filter(s => s.on && !s.hidden).map(s => rr(st.anchor(s.slot).getBoundingClientRect()));
        const says = [...document.querySelectorAll('.ds-say, .ds-tag')].map(e => e.getBoundingClientRect()).filter(r => r.width > 0).map(rr);
        const panel = rr(document.getElementById('panel').getBoundingClientRect()), host = rr(st.host.getBoundingClientRect());
        return { pop: pop ? rr(pop.getBoundingClientRect()) : null, at: pop ? pop.getAttribute('data-at') : null, ic: ic && ic.style.display !== 'none' ? rr(ic.getBoundingClientRect()) : null, people, says, panel, host };
      });
      await shot(page, 'night-np-crowd', w, h);
      const clear = g => !!g && [...geo.people, ...geo.says].every(b => !hit(g, b)) && g.b <= geo.panel.t && g.t >= geo.host.t && g.r <= geo.host.r + 0.5 && g.l >= geo.host.l - 0.5;
      // 點熟客聊天 → 泡泡收成小圖示
      const tp = await tapHot(page, h => /^cw-w/.test(h.id));
      const chat = await page.waitForSelector('.ds-say.chat', { timeout: 3000 }).then(() => true, () => false);
      await sleep(500);
      const s2 = await st(page);
      record(13, size, geo.people.length >= 2 && (!geo.pop || clear(geo.pop)) && geo.ic && geo.ic.b <= geo.panel.t && !!tp && chat && !s2.pop && s2.ic,
        `熟客 ${geo.people.length} 位；泡泡 ${geo.pop ? geo.at + ' 不蓋人／泡泡／名牌／面板 ' + clear(geo.pop) : '擺不下＝只有小圖示'}；點熟客 ${tp && tp.action} → 聊天泡泡 ${chat}、正在播放收起來 ${!s2.pop}、♪ 還在 ${!!s2.ic}`);
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
          /關/.test(off.t) && !off.s.playing && off.s.ic && /\boff\b/.test(off.s.ic.cls) && /開/.test(on.t) && on.s.calls.length > nOn && on.s.playing && shelfHit.length === 1,
        `⏸「${r0.np}」／「${r0.bgm}」「${r0.vol}」「${r0.src}」＋「${r0.note}」；音量 → ${v1.t}（fx ${v1.fx}）→ ${v2.t}（fx ${v2.fx}）；${src2.t}；背景音樂關 → 停 ${!off.s.playing}、♪ 灰；再開 → 接著放 ${on.s.playing}；` +
        `包包 ${n} 張放完多一張唱片櫃的：${shelfHit.join('、') || '沒有'}`);
    } catch (e) { record(14, size, false, 'threw: ' + (e && e.stack || e)); }
    finally { await ctx.close(); }
  }
}

const browser = await launch();
try { for (const [w, h] of SIZES) await runSize(browser, w, h); }
finally { await browser.close(); }
const failed = results.filter(r => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} PASS` + (failed.length ? `，FAIL：${failed.map(r => '#' + r.n + '[' + r.size + ']').join(' ')}` : ''));
process.exit(failed.length ? 1 : 0);
