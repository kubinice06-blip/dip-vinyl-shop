// game-lab/tests/e2e-room.mjs：你家（聆聽室，v5 第六項第三期第一步）的端對端測試。
//   需要靜態伺服器（repo 根）：python3 -m http.server 8765
//   node game-lab/tests/e2e-room.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_URL 或 LAB_BASE、LAB_SIZES（預設四個驗收尺寸）；
//     LAB_SHOTS＝資料夾：存給店主看的截圖（deviceScaleFactor 2；台北地圖、房間全景、唱片架、唱盤播放中、控制台星圖、收藏 0 張）；LAB_SHOT_PREFIX＝檔名開頭（預設 room）
//     ROOM_PERF＝1：印第一次開控制台下載了多少、幀率（房間／星圖開著）
//
// 每個尺寸：
//   1. 唱片櫃種 14 張擁有（分頁要兩頁）→ 標題頂欄「台北」→ 真點地圖上的小房子（pin-home）→ 畫面 home、舞台換成 home、你站在房間裡
//   2. 唱片架：店景上 14 格有封面（rack:*）；真點唱片架 → 走到 atShelf、分頁面板 12 張、1／2 → 下一頁 2 張 → 點封面開唱片資訊 → 「放唱盤」＝唱盤換那張、music.play
//   3. 唱盤：真點唱盤 → 走到 atDeck、面板列擁有的（有試聽的）→ 放這張 → 唱盤上那張＝它；放完接下一張收藏（照唱片架順序）
//   4. 控制台：真點控制台 → 推近、全螢幕星圖載得起來（DipTune built、收藏亮＝只看唱片櫃開著、符合張數＝14）、店景迴圈停了；
//      隨機一張＋就這張（是你的）→ onResult 回遊戲卡 id → 收回、唱盤換那張；再開、關掉收藏開關、挑一張不是你的 → 想要清單多一筆、還在星圖上；↩ 收回
//   5. 收回後店景照常（迴圈在跑、熱點點得到、面板開得起來）；門 → 標題、舞台回本店
//   7. 收藏 0 張（全新存檔、另開一頁）：房間說明、唱盤空著、唱片架沒有封面、唱片架面板寫空的、唱盤吐司
//   每一步：#app 與頁面不捲動；最後主控台 0 錯誤、本機檔案 0 個 404、localStorage 只寫允許的鍵
// 每一項印 PASS／FAIL；任何 FAIL → exit 1。
import fs from 'fs';
import path from 'path';
import { launch, newPage, openTitle, Q, SIZES, record, results, sleep, jsClick, waitScreen, tapHot, noScroll, scrollOk, ALLOWED_LS, infoOpen, closeInfo } from './e2e-lib.mjs';

const SHOTS = process.env.LAB_SHOTS || '';
const PREFIX = process.env.LAB_SHOT_PREFIX || 'room';
const PERF = process.env.ROOM_PERF === '1';
const LS_OK = new Set([...ALLOWED_LS, 'dipTuneMine', 'dipTuneHolo']);   // 頻率光譜的「只看我的唱片櫃」開關、全像鈕（主站同一個鍵；這台裝置的偏好）
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
const shot = async (page, name, w, h) => { if (SHOTS) await page.screenshot({ path: path.join(SHOTS, `${PREFIX}-${name}-${w}x${h}.png`) }); };

// 擁有的 14 張：從卡池挑有試聽、不是王牌的（固定順序，每次一樣）
async function pickOwn(page, n) {
  return page.evaluate(n => { const C = window.DipLabContent.cards; return Object.keys(C).filter(id => !C[id].tier && C[id].previewUrl).sort().slice(0, n); }, n);
}
const homeReady = page => page.waitForFunction(() => window.__lab.screen() === 'home' && !window.__lab.going() && window.__lab.stage.shopId === 'home', null, { timeout: 15000 }).then(() => true, () => false);
const walkDone = (page, spot) => page.waitForFunction(s => { const st = window.__lab.stage, p = st.pos('p'), q = st.spot(s); return p && q && Math.abs(p.x - q[0]) < 1 && Math.abs(p.y - q[1]) < 1; }, spot, { timeout: 8000 }).then(() => true, () => false);
const sheet = (page, cls, ms = 6000) => page.waitForSelector('.lb-sheet.float.' + cls + ':not(.arming)', { timeout: ms }).then(() => true, () => false);
const closeSheets = page => page.evaluate(() => { document.querySelectorAll('.lb-sheet.float').forEach(s => s.remove()); document.body.classList.remove('lb-float-open'); });
const deckCard = page => page.evaluate(() => { const d = window.__lab.stage.clashState().deck; return d && d.rec ? d.rec.card : null; });
const fps = (page, ms = 2000) => page.evaluate(ms => new Promise(ok => { let n = 0; const t = performance.now(); (function f() { n++; if (performance.now() - t < ms) requestAnimationFrame(f); else ok(Math.round(n / ((performance.now() - t) / 1000))); })(); }), ms);
async function spyPlay(page) {
  await page.evaluate(() => {
    const m = window.DipLabFx.music; if (m.__spy) return; const orig = m.play; window.__plays = [];
    m.play = function (c, o) { window.__plays.push(c && c.id); return orig.call(this, c, o); }; m.__spy = true;
  });
}
const plays = page => page.evaluate(() => (window.__plays || []).slice());
// 台北地圖（格子版，沒有 hotPoints）：圖釘熱點外框的中心，最上層要是舞台畫布才真點
async function tapPin(page, id) {
  const p = await page.evaluate(id => { const r = window.__lab.stage.hotRect(id); if (!r) return null; const x = r.left + r.width / 2, y = r.top + r.height / 2; return document.elementFromPoint(x, y) === window.__lab.stage.canvas ? { x, y, id } : null; }, id);
  if (!p) return null;
  await page.touchscreen.tap(p.x, p.y);
  return p;
}

async function runSize(browser, w, h) {
  const size = `${w}x${h}`;
  const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1, watchStorage: true });
  let scrollBad = [];
  const checkScroll = async (where) => { const s = await noScroll(page); if (!scrollOk(s)) scrollBad.push(where + JSON.stringify(s)); };
  try {
    await openTitle(page, Q('&fast=1&strict=1'));
    const own = await pickOwn(page, 14);
    await page.evaluate(ids => { window.__lab.own(ids.slice(0, 10), 'run'); window.__lab.own(ids.slice(10), 'gift'); }, own);
    await spyPlay(page);

    // ---- 1. 台北 → 真點小房子 → 你家
    await jsClick(page, '#top [data-a=taipei]');
    const inTaipei = await waitScreen(page, 'taipei', 8000) && await page.waitForFunction(() => !window.__lab.going() && window.__lab.stage.shopId === 'taipei', null, { timeout: 8000 }).then(() => true, () => false);
    await sleep(300);
    const pinInfo = await page.evaluate(() => { const h = window.__lab.stage.hotspots().find(x => x.id === 'pin-home'); return h ? { label: h.label, action: h.action } : null; });
    await shot(page, 'taipei', w, h);
    await page.evaluate(() => { window.__res0 = performance.getEntriesByType('resource').length; });   // 第一次開控制台的下載量從進房間算（進房間 1.5 秒後會先背景抓 three 與座標）
    const tp = await tapPin(page, 'pin-home');
    const atHome = await homeReady(page);
    await walkDone(page, 'in');
    await sleep(500);
    const st1 = await page.evaluate(() => {
      const st = window.__lab.stage, L = st.layout;
      return { kind: L.kind, racks: st.hotspots().filter(x => /^rack:/.test(x.id)).length, hots: st.hotspots().map(x => x.id).filter(id => !/^rack:/.test(id)).sort(), p: st.has('p'), panel: (document.querySelector('#panel .lb-tp') || {}).textContent || '',
        btns: [...document.querySelectorAll('#panel .lb-homebtns [data-a]')].map(b => b.getAttribute('data-a')), top: (document.querySelector('#top .tt') || {}).textContent || '' };
    });
    await checkScroll('房間');
    await shot(page, 'room', w, h);
    record(1, size, inTaipei && pinInfo && pinInfo.action === 'home' && tp && tp.id === 'pin-home' && atHome && st1.kind === 'room' && st1.p && st1.btns.join() === 'shelf,deck,console' &&
      ['console', 'deck', 'door', 'shelf'].every(id => st1.hots.includes(id)),
      `台北（${inTaipei}）→ 真點 ${tp && tp.id}（${pinInfo && pinInfo.label}）→ home（${atHome}，${st1.kind}，頂欄「${st1.top}」）；熱點 ${st1.hots.join(' ')}；DOM 鈕 ${st1.btns.join('／')}；你在房間 ${st1.p}`);

    // ---- 2. 唱片架：店景 14 張、真點 → 走過去 → 分頁面板
    const tapShelf = await tapHot(page, hh => hh.id === 'shelf');
    const walked2 = await walkDone(page, 'atShelf');
    const sh2 = await sheet(page, 'hshelf');
    await sleep(200);
    const pg1 = await page.evaluate(() => { const s = document.querySelector('.lb-sheet.hshelf'); return { n: s.querySelectorAll('.lb-ct').length, pn: (s.querySelector('.pn') || {}).textContent || '', picks: s.querySelectorAll('[data-pick]').length }; });
    await checkScroll('唱片架');
    await shot(page, 'shelf', w, h);
    await jsClick(page, '.lb-sheet.hshelf [data-pg="1"]');
    await sleep(450);
    const pg2 = await page.evaluate(() => { const s = document.querySelector('.lb-sheet.hshelf'); return { n: s.querySelectorAll('.lb-ct').length, pn: (s.querySelector('.pn') || {}).textContent || '', ids: [...s.querySelectorAll('[data-pick]')].map(b => b.getAttribute('data-pick')) }; });
    const ownOrder = await page.evaluate(() => window.__lab.home.owned());
    // 點封面＝唱片資訊
    await jsClick(page, '.lb-sheet.hshelf .lb-cv[data-info]');
    const info2 = await infoOpen(page);
    if (info2) await closeInfo(page);
    // 放唱盤
    const put = pg2.ids[0];
    await jsClick(page, `.lb-sheet.hshelf [data-pick="${put}"]`);
    await sleep(300);
    const deck2 = await deckCard(page), pl2 = await plays(page);
    record(2, size, st1.racks === 14 && tapShelf && walked2 && sh2 && pg1.n === 12 && pg1.pn === '1／2' && pg2.n === 2 && pg2.pn === '2／2' && JSON.stringify(pg2.ids) === JSON.stringify(ownOrder.slice(12)) && info2 && deck2 === put && pl2.includes(put),
      `店景封面 ${st1.racks}；真點唱片架→走到 atShelf ${walked2}→面板 ${sh2}：第一頁 ${pg1.n} 張（${pg1.pn}）、下一頁 ${pg2.n} 張（${pg2.pn}，照擁有排法 ${JSON.stringify(pg2.ids) === JSON.stringify(ownOrder.slice(12))}）；點封面開唱片資訊 ${info2}；放唱盤 → 唱盤 ${deck2}、music.play ${pl2.includes(put)}`);

    // ---- 3. 唱盤：真點 → 走過去 → 面板 → 放這張；放完接下一張收藏
    await closeSheets(page);
    const tapDeck = await tapHot(page, hh => hh.id === 'deck');
    const walked3 = await walkDone(page, 'atDeck');
    const sh3 = await sheet(page, 'hdeck');
    await sleep(200);
    const n3 = await page.evaluate(() => document.querySelectorAll('.lb-sheet.hdeck [data-pick]').length);
    const pick3 = ownOrder[3];
    await jsClick(page, `.lb-sheet.hdeck [data-pick="${pick3}"]`);
    await sleep(400);
    const deck3 = await deckCard(page);
    const spin3 = await page.evaluate(() => { const d = window.__lab.stage.clashState().deck; return d && d.state; });
    await closeSheets(page);
    await sleep(300);
    await shot(page, 'deck', w, h);
    const next3 = await page.evaluate(id => window.__lab.home.ended(id), pick3);
    await sleep(700);
    const pl3 = await plays(page);
    record(3, size, tapDeck && walked3 && sh3 && n3 === 14 && deck3 === pick3 && next3 === ownOrder[4] && pl3[pl3.length - 1] === ownOrder[4],
      `真點唱盤→走到 atDeck ${walked3}→面板 ${sh3}（${n3} 張）；放這張 → 唱盤 ${deck3 === pick3 ? '對' : deck3}（${spin3}）；放完接下一張收藏 ${next3}（應該 ${ownOrder[4]}，music.play 最後一首 ${pl3[pl3.length - 1]}）`);

    // ---- 4. 控制台：真點 → 推近 → 星圖
    const fpsRoom = PERF ? await fps(page) : 0;
    const t4 = Date.now();
    const tapCon = await tapHot(page, hh => hh.id === 'console');
    const walked4 = await walkDone(page, 'atConsole');
    const built = await page.waitForFunction(() => window.DipTune && window.DipTune.state.built && window.DipTune.state.visible && window.__lab.home.tune() && !document.getElementById('labTune').hidden && window.DipTune.mine.on, null, { timeout: 30000 }).then(() => true, () => false);
    const tBuilt = Date.now() - t4;
    await sleep(1200);
    const s4 = await page.evaluate(() => {
      const f = window.DipTune.filter, st = window.__lab.stage, host = document.getElementById('labTune'), r = host.getBoundingClientRect();
      return { matched: f.matched, mine: window.DipTune.mine, frozen: !!st.shop.frozen, msg: (host.querySelector('#tuneMsg') || {}).hidden, host: [Math.round(r.width), Math.round(r.height)], vw: innerWidth, vh: innerHeight, gl: !!host.querySelector('#tuneGl') };
    });
    await checkScroll('星圖');
    let perf = null;
    if (PERF) {
      const fpsTune = await fps(page);
      perf = await page.evaluate(() => {
        const rs = performance.getEntriesByType('resource').slice(window.__res0).filter(e => /dip-tune\.js|three-r128|card-moods|\/tune\//.test(e.name));
        // 同一個網址抓兩次（進房間的背景預抓＋dip-tune 自己 fetch）只算一次大小；transfer＝真的走網路的位元組（重新驗證 304 只算標頭）
        const by = {}, seenU = new Set(); let net = 0;
        rs.forEach(e => { net += e.transferSize || 0; if (seenU.has(e.name)) return; seenU.add(e.name); const k = /dip-tune\.js/.test(e.name) ? 'dip-tune.js' : /three-r128/.test(e.name) ? 'three' : /card-moods/.test(e.name) ? 'card-moods.json' : 'tune/*'; by[k] = (by[k] || 0) + (e.encodedBodySize || 0); });
        return { kb: Object.fromEntries(Object.entries(by).map(([k, v]) => [k, Math.round(v / 1024)])), total: Math.round(Object.values(by).reduce((a, v) => a + v, 0) / 1024), netKb: Math.round(net / 1024), n: rs.length, files: seenU.size };
      });
      perf.fpsRoom = fpsRoom; perf.fpsTune = fpsTune; perf.tBuilt = tBuilt;
      console.log('PERF ' + size + ' ' + JSON.stringify(perf));
    }
    await shot(page, 'tune', w, h);
    // 隨機一張（收藏亮＝只會抽到你的）＋就這張 → onResult 回遊戲卡 id → 收回、唱盤換那張
    const got = await page.evaluate(async () => {
      const c = window.DipTune.randomPick(); await new Promise(r => setTimeout(r, 1500));
      const pc = window.DipTune.previewCard; const b = document.querySelector('#labTune #tuneDraw'); const dis = b ? b.disabled : null; if (b && !b.disabled) b.click();
      return { gid: pc && pc._gid, dis, rand: c && c.card && c.card._gid };
    });
    const closed4 = await page.waitForFunction(() => !window.__lab.home.tune() && document.getElementById('labTune').hidden, null, { timeout: 6000 }).then(() => true, () => false);
    await sleep(600);
    const last4 = await page.evaluate(() => window.__lab.home.last());   // onResult 收到的那張（就這張可能把停在格子邊上的換成最近那張，不一定是 previewCard）
    const deck4 = await deckCard(page), owned4 = await page.evaluate(id => window.__lab.home.owned().includes(id), last4);
    record(4, size, tapCon && walked4 && built && s4.mine.on && s4.matched === 14 && s4.frozen && s4.host[0] === s4.vw && s4.host[1] === s4.vh && !!last4 && owned4 && closed4 && deck4 === last4,
      `真點控制台→走到 atConsole ${walked4}→星圖 ${built}（${tBuilt} ms）：收藏亮 ${s4.mine.on}（唱片櫃 ${s4.mine.size}、星圖上 ${s4.mine.onMap}）、符合 ${s4.matched}、店景迴圈停 ${s4.frozen}、全螢幕 ${s4.host.join('×')}；` +
      `隨機＋就這張 → onResult 遊戲卡 ${last4}（停的那張 ${got.gid}；是你的 ${owned4}）→ 收回 ${closed4}、唱盤 ${deck4 === last4 ? '換成那張' : deck4}`);

    // 再開（DOM 鈕）→ 關收藏開關 → 挑一張不是你的 → 想要清單 +1、星圖還開著 → ↩ 收回
    await jsClick(page, '#panel .lb-homebtns [data-a=console]');
    const re5 = await page.waitForFunction(() => window.__lab.home.tune() && window.DipTune.state.visible && !document.getElementById('labTune').hidden, null, { timeout: 15000 }).then(() => true, () => false);
    await sleep(900);
    const wantBefore = await page.evaluate(() => window.__lab.home.want().length);
    const w5 = await page.evaluate(async () => {
      document.querySelector('#labTune #tuneMineBtn').click();
      await new Promise(r => setTimeout(r, 500));
      const mineOff = !window.DipTune.mine.on, owned = new Set(window.__lab.home.owned());
      let pc = null;
      for (let k = 0; k < 30; k++) { window.DipTune.randomPick(); await new Promise(r => setTimeout(r, 900)); pc = window.DipTune.previewCard; if (pc && !owned.has(pc._gid)) break; }
      const seen = []; const mo = new MutationObserver(() => document.querySelectorAll('.lb-toast').forEach(t => { if (!seen.includes(t.textContent)) seen.push(t.textContent); })); mo.observe(document.getElementById('app'), { childList: true });
      const b = document.querySelector('#labTune #tuneDraw'); if (b && !b.disabled) b.click();
      await new Promise(r => setTimeout(r, 900)); mo.disconnect();
      const last = window.__lab.home.last(), C = window.DipLabContent.cards;
      return { mineOff, gid: last, owned: last ? owned.has(last) : null, album: last && C[last] ? C[last].album : '', want: window.__lab.home.want(), tune: window.__lab.home.tune(), toast: seen.join('｜') };
    });
    await page.evaluate(() => document.querySelector('#labTune #tuneBack').click());
    const closed5 = await page.waitForFunction(() => !window.__lab.home.tune() && document.getElementById('labTune').hidden, null, { timeout: 6000 }).then(() => true, () => false);
    record(5, size, re5 && w5.mineOff && w5.gid && w5.owned === false && w5.want.length === wantBefore + 1 && w5.want[w5.want.length - 1] === w5.gid && w5.tune && w5.toast.includes('《' + w5.album + '》加進想要清單') && closed5,
      `再開 ${re5}；關收藏開關 ${w5.mineOff}；挑不是你的 ${w5.gid} → 想要清單 ${wantBefore}→${w5.want.length}、星圖還開著 ${w5.tune}、吐司「${w5.toast}」；↩ 收回 ${closed5}`);

    // ---- 6. 收回後店景照常、門回本店
    await sleep(500);
    const s6 = await page.evaluate(async () => {
      const sh = window.__lab.stage.shop, f0 = sh.state.frame; await new Promise(r => setTimeout(r, 700));
      return { frozen: !!sh.frozen, frames: sh.state.frame - f0, hidden: document.getElementById('labTune').hidden, zoom: document.getElementById('stage').className, cls: document.body.classList.contains('lb-tune-open') };
    });
    const tapShelf6 = await tapHot(page, hh => hh.id === 'shelf');
    const sh6 = await sheet(page, 'hshelf');
    await closeSheets(page);
    await checkScroll('收回後');
    const tapDoor = await tapHot(page, hh => hh.id === 'door');
    const back6 = await waitScreen(page, 'title', 10000) && await page.waitForFunction(() => window.__lab.stage.shopId === 'dip' && !window.__lab.going(), null, { timeout: 8000 }).then(() => true, () => false);
    await checkScroll('回本店');
    record(6, size, !s6.frozen && s6.frames >= 3 && s6.hidden && !/zoom/.test(s6.zoom) && !s6.cls && tapShelf6 && sh6 && tapDoor && back6,
      `收回後：迴圈在跑 ${!s6.frozen}（0.7 s ${s6.frames} 格）、星圖藏起 ${s6.hidden}、舞台沒放大 ${!/zoom/.test(s6.zoom)}；再點唱片架面板 ${sh6}；真點門 → 標題、舞台回本店 ${back6}`);

    // ---- 7. 收藏 0 張：空房間（新的分頁、全新存檔；台北頂欄的「你家」進去）
    const { ctx: ctx7, page: p7 } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
    try {
      await openTitle(p7, Q('&fast=1&strict=1'));
      await jsClick(p7, '#top [data-a=taipei]');
      await waitScreen(p7, 'taipei', 8000); await p7.waitForFunction(() => !window.__lab.going() && window.__lab.stage.shopId === 'taipei', null, { timeout: 8000 }).catch(() => {});
      await sleep(450);
      await jsClick(p7, '#top [data-a=home]');
      const atHome7 = await homeReady(p7);
      await walkDone(p7, 'in'); await sleep(500);
      const s7 = await p7.evaluate(() => ({ owned: window.__lab.home.owned().length, racks: window.__lab.stage.hotspots().filter(x => /^rack:/.test(x.id)).length, note: (document.querySelector('#panel .lb-tp') || {}).textContent || '', empty: window.DipLabContent.shopLines.homeEmpty,
        idle: (document.querySelector('#panel .lb-homenp') || {}).textContent || '', idleWant: window.DipLabContent.shopLines.homeIdle, deck: window.__lab.stage.clashState().deck }));
      await shot(p7, 'empty', w, h);
      await jsClick(p7, '#panel .lb-homebtns [data-a=shelf]');
      const sh7 = await sheet(p7, 'hshelf');
      const s7b = await p7.evaluate(() => ({ tiles: document.querySelectorAll('.lb-sheet.hshelf .lb-ct').length, txt: (document.querySelector('.lb-sheet.hshelf') || {}).textContent || '' }));
      await closeSheets(p7);
      await jsClick(p7, '#panel .lb-homebtns [data-a=deck]');
      const toast7 = await p7.waitForFunction(() => [...document.querySelectorAll('.lb-toast')].some(t => t.textContent === window.DipLabContent.shopLines.homeDeckEmpty), null, { timeout: 5000 }).then(() => true, () => false);
      const sc7 = await noScroll(p7); if (!scrollOk(sc7)) scrollBad.push('空房間' + JSON.stringify(sc7));
      const errs7 = p7._errors.concat(p7._badLocal);
      record(7, size, atHome7 && s7.owned === 0 && s7.racks === 0 && s7.note === s7.empty && s7.idle === s7.idleWant && !s7.deck && sh7 && s7b.tiles === 0 && s7b.txt.includes(s7.empty) && toast7 && !errs7.length,
        `全新存檔：台北頂欄「你家」→ home ${atHome7}；店景封面 ${s7.racks}；房間說明「${s7.note}」；唱盤空著「${s7.idle}」；唱片架面板空的 ${s7b.tiles === 0}；唱盤吐司 ${toast7}` + (errs7.length ? '；主控台錯誤：' + errs7.slice(0, 2).join(' | ') : ''));
    } finally { await ctx7.close(); }

    // ---- 主控台、捲動、localStorage
    const errs = page._errors.concat(page._badLocal);
    const ls = await page.evaluate(() => [...new Set(window.__lsKeys || [])]);
    const badLs = ls.filter(k => !LS_OK_LIST.includes(k));
    record(8, size, !errs.length && !scrollBad.length && !badLs.length, (errs.length ? '主控台錯誤：' + errs.slice(0, 3).join(' | ') : '主控台 0 錯誤') + '；' + (scrollBad.length ? '捲動：' + scrollBad.join('、') : '每一步都不捲動') + '；localStorage ' + ls.join('、') + (badLs.length ? '（不該寫：' + badLs.join('、') + '）' : ''));
  } catch (e) {
    record(0, size, false, 'threw: ' + (e && e.stack || e));
  } finally { await ctx.close(); }
}
const LS_OK_LIST = [...LS_OK];

const browser = await launch();
try { for (const [w, h] of SIZES) await runSize(browser, w, h); }
finally { await browser.close(); }
const failed = results.filter(r => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} PASS` + (failed.length ? `，FAIL：${failed.map(r => '#' + r.n + '[' + r.size + ']').join(' ')}` : ''));
process.exit(failed.length ? 1 : 0);
