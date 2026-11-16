// game-lab/tests/e2e-econ.mjs：經濟介面端對端測試（SPEC-v4 §5.5 e2e-econ；D §6）。B3。跑在 dev/econ-harness.html（只掛舞台＋假的 run）。
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   node game-lab/tests/e2e-econ.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE（伺服器根，例 http://localhost:8783）或 LAB_URL（index.html 或 econ-harness 的網址）、LAB_SIZES（預設四個驗收尺寸）
//
// 每個尺寸（真點：page.touchscreen.tap；網址帶 strict，走不到就丟錯）：
//   1  點箱子（舞台上真點 bin:hiphop）→ 玩家照路線走到 stand（1.5 倍速），到了才 dig、才開抽屜；途中沒有抽屜
//   2  抽屜高 ≤ #app 50%，內容不溢出（scrollHeight ≤ clientHeight），整個在畫面裡
//   3  那一箱的形狀整個在舞台可見範圍內（hotspots 的 rect ⊂ 鏡頭），而且在抽屜上緣之上（沒被抽屜蓋到）；賣回子面板（#7）、櫃檯（#9）、特價箱（#10）也照查
//   4  一張大封面翻著看：› ‹、縮圖、左右滑都會換張；點封面＝唱片資訊（關掉回到抽屜）
//   5  點抽屜外面關掉：抽屜不見、描框清掉、不再 dig、鏡頭回到開之前；人已在箱子前再點同一箱＝不走路直接開、不會被放開後的 click 關掉
//   6  買（錢夠、包包沒滿）→ 錢減價格（稀有度價，鈕「買 $1,000」千分位）、包包 +1、那張從抽屜消失、吐司「進包包」；抽屜標題＝名牌英文＋中文、標稀有度
//   7  包包不限張數（店主 11-16）：包包 8 張、24 張、錢夠 → 鈕照樣「買 $n」、按了直接買（沒有先賣子面板）、包包 +1；抽屜標題列「包包 n 張」（不寫上限）
//   8  錢不夠、賣一張也不夠 → 鈕停用（「錢不夠」）
//   9  櫃檯配件：走到櫃檯前、買一件（錢減、配件 +1）；滿 3 件 → 先賣一件（半價）再買
//   10 特價箱開局模式（舞台上真點特價箱）：6 張、每格的特價劃掉＋標題「這次免費」（FIXLIST 8）、恰好挑 3 張「收下這三張」才能按（第 4 張換掉最早挑的那張）；長按封面＝唱片資訊；點外面不會關；收下 → 包包 +3、bargainPicked
//   11 特價箱之後模式（FIXLIST 8）：每格標價 $100／200／300；沒挑「挑一到三張」停用；挑 1 張 →「買下 $那張」→ 錢 −那張、包包 +1；包包 8 張挑 2 張 → 直接買（不用先賣）、付兩張的總和、包包 10
//   12 序章、對決中點箱子 → 老闆說「打完再翻。」、不開抽屜
//   13 沒有 run（標題）：抽屜只能翻、沒有買的鈕
//   15 錢不夠但賣一張就夠（SPEC §2.5.6 第 3 點；包包不限張數之後唯一的「先賣」，自願）：鈕可按（「買 $400／先賣一張」）→ 子面板「錢不夠：先賣一張」、賣了也不夠的那張不給選、
//      老闆送的標「老闆送的」不給選 → 賣一張買到、包包張數不變；包包 24 張：封面縮到 36 px 還放不下 → 封面放回 56 px、格子那一區自己捲（.ec-scroll）、抽屜 ≤50% 不溢出、
//      捲到最後一張選得到、賣了買到；櫃檯配件同理（「先賣一件」，配件沒滿 3 件）
//   16 走路朝向（v5 第五項，三向）：browse → 爵士箱、爵士箱 → 櫃檯逐格取樣 pos('p').dir／flip：往上（約 60°）那段背面、往下正面、
//      橫走側面（往左朝左＝flip、往右朝右）；到箱子前翻箱、到櫃檯 faceTo 都回正面
//   14 所有面板（箱子、包包 24 張的箱子、特價兩種、櫃檯、配件賣回、錢不夠先賣、包包 24 張的先賣）不捲出畫面、鈕 ≥44 高（格子那一區捲的：捲出去的格子不算）；主控台 0 錯誤（最後跑）
//
// index.html（整合後：ui.js 已經 configure 經濟介面、載入 econ.css／econ.js；沒接上就印 SKIP、不算失敗；ECON_INDEX=0 不跑）：
//   21 來客：錢那一格＝econ 的 moneyHTML、跟 run.money 一樣（千分位 $5,000）；DipLabEcon 已 configure；econ.css 有載入
//   22 真點舞台上的箱子 → 你走到那一箱的 stand 才開抽屜；抽屜 ≤50%、不溢出、鈕 ≥44；那一箱沒被抽屜蓋到
//   23 買一張 → run.money 減價格；點抽屜外面關掉 → 來客重畫：錢那一格、「包包 n 張」跟著變；存檔（localStorage）也是新的錢
//   24 真點櫃檯 → 走到櫃檯前、配件面板（2–3 件）；✕ 關掉
//   25 真點特價箱（已挑過）→ 買的模式（每格 $100–300、鈕「挑一到三張」）；✕ 關掉；整段主控台 0 錯誤、本機檔案沒有 4xx
//   26 舊存檔（v5 店面改版前：這一輪的貨有 pop、沒有 citypop／indierock／indiepop）→ 載入時只補缺的區、丟掉 pop（engine.fixBins）；
//      真點 INDIE ROCK → 抽屜有貨（不是「這一箱賣完了」）；其他區的貨原樣
//   27 到站朝向（v5 第五項審查修正）：你站在對決位 duelP → 回來客（go('night')）往上走回 browse：途中有背面、到了 0.5 秒內轉正面、之後一直正面；
//      第一位客人在 wait → 回來客走回門邊 atdoor（最後一段往上）：到了轉正面；接連走兩段往上（walk().then(walk)）中間那站不閃正面；
//      點試聽機 → 走到試聽桌 listen：到了是背面（面向桌子、戴耳機）
//   28 收音機轉頻率（v5 第六項第二期）：存一份這一輪特價箱 6 張的存檔 → 真點舞台上的收音機 → 你走到收音機站位、面板八格（色點＋名字；抽不到的反灰＝engine.radioPool 空）、
//      面板在畫面裡不溢出、格子 ≥44 高 → 點一格 → run.shop.radio＝那格、轉到的那張出現在面板 →「去特價箱看看」→ 特價箱 7 張、四欄（.ec-g4）、
//      第一格＝電台那張（左上「電台」＋那格色點）、價＝原價（engine.priceOf，不是特價）、抽屜不溢出 → 買它：錢扣原價 → 再點收音機＝「這一輪已經轉過了」、八格都停用
//   29 包包面板（包包不限張數，店主 11-16）：包包 24 張 → 包包條「包包 24 張」→ 點開：標題「包包 24 張」＋錢、王牌＋24 張、面板在畫面裡、沒有橫向溢出、面板自己捲；
//      老闆送的標「老闆送的」、沒有「賣」鈕，其他每張「賣 $半價」（≥36 高）→ 捲到底：標題列還在最上面、最後一張的「賣」鈕點得到 → 底下那條「賣掉《…》？」
//      （那張沒被蓋到、兩顆鈕 ≥44 高）→「賣掉 +$n」：錢 +半價、包包 23、標題與包包條都變、吐司「《…》賣掉，+$n」；包包剩 6 張賣一張 → 5 張：「賣」鈕全停用、
//      說明那行變紅「包包至少留 5 張，手牌才補得滿。」、引擎再賣 → bagMin；主控台 0 錯誤
// 每一項印 PASS／FAIL；任何 FAIL → exit 1。
import { launch, newPage, SIZES, record, results, sleep, URL0, jsClick, waitScreen } from './e2e-lib.mjs';

const HURL = (() => {
  const u = process.env.LAB_URL;
  if (u && /econ-harness/.test(u)) return u;
  if (u) return new URL('dev/econ-harness.html', u.replace(/[^/]*$/, '')).href;
  return (process.env.LAB_BASE ? process.env.LAB_BASE.replace(/\/+$/, '') : 'http://localhost:8765') + '/game-lab/dev/econ-harness.html';
})();

const dbg = page => page.evaluate(() => window.DipLabEcon.debug());
const run = page => page.evaluate(() => { const r = window.H.run; return r ? { money: r.money, bag: r.bag.slice(), relics: r.relics.slice(), shop: JSON.parse(JSON.stringify(r.shop)) } : null; });
async function openHarness(page, qs = '') {
  await page.goto(HURL + '?strict=1' + (qs ? '&' + qs : ''));
  await page.waitForFunction(() => window.H && window.H.ready, null, { timeout: 20000 });
  await sleep(400);
}
async function reset(page, o) { await page.evaluate(o => { window.H.reset(o); }, o); await sleep(350); }
async function tapXY(page, x, y) { await page.touchscreen.tap(Math.round(x), Math.round(y)); }
async function tapSel(page, sel) {
  const b = await page.locator(sel).first().boundingBox();
  if (!b) throw new Error('看不到 ' + sel);
  await tapXY(page, b.x + b.width / 2, b.y + b.height / 2);
}
// 舞台上真點某個熱點（shop.hotPoints 給的「一定點得到」那一點）
async function tapHot(page, id) {
  const p = await page.evaluate(id => {
    const st = window.H ? window.H.stage : window.__lab.stage, hb = st.host.getBoundingClientRect(), q = st.shop.hotPoints().find(x => x.id === id);
    return q ? [hb.left + q.x, hb.top + q.y] : null;
  }, id);
  if (!p) throw new Error('沒有熱點 ' + id);
  await tapXY(page, p[0], p[1]);
}
async function waitOpen(page, ms = 9000) { await page.waitForFunction(() => window.DipLabEcon.debug().open && document.querySelector('.ec-drawer'), null, { timeout: ms }); await sleep(380); }
async function waitClosed(page, ms = 4000) { await page.waitForFunction(() => !window.DipLabEcon.isOpen() && !document.querySelector('.ec-drawer'), null, { timeout: ms }); }
// 走路途中點一下＝直接走到（抽屜外面的 veil）
async function skipWalk(page) {
  for (let i = 0; i < 20; i++) {
    const d = await dbg(page);
    if (d.open) return;
    if (d.walking) { await tapXY(page, 20, 60); }
    await sleep(120);
  }
}
async function openAndWait(page, k) { await page.evaluate(k => { window.H.open(k); }, k); await sleep(150); await skipWalk(page); await waitOpen(page); }
// 抽屜的量測：高、溢出、在畫面裡、每個鈕的大小
async function measure(page) {
  return page.evaluate(() => {
    const el = document.querySelector('.ec-drawer'), app = document.getElementById('app');
    if (!el) return null;
    const r = el.getBoundingClientRect(), ar = app.getBoundingClientRect();
    // 先賣子面板包包太長（.ec-scroll）：格子那一區自己捲，捲出去（不在格子可見範圍）的格子不算
    const sg = el.classList.contains('ec-scroll') ? el.querySelector('.ec-grid') : null, gr = sg && sg.getBoundingClientRect();
    const btns = [...el.querySelectorAll('button')].filter(b => b.offsetParent).filter(b => { if (!sg || !sg.contains(b)) return true; const q = b.getBoundingClientRect(); return q.top >= gr.top - 1 && q.bottom <= gr.bottom + 1; })
      .map(b => { const q = b.getBoundingClientRect(); return { a: b.dataset.a || b.className, w: Math.round(q.width), h: Math.round(q.height), top: q.top, bottom: q.bottom, left: q.left, right: q.right }; });
    return { top: r.top, bottom: r.bottom, h: r.height, appH: ar.height, appTop: ar.top, scrollH: el.scrollHeight, clientH: el.clientHeight, vw: innerWidth, vh: innerHeight, left: r.left, right: r.right, btns,
      grid: sg ? { sh: sg.scrollHeight, ch: sg.clientHeight, top: gr.top, bottom: gr.bottom } : null };
  });
}
// 那一箱（或櫃檯）整個在舞台的鏡頭裡、而且在抽屜上緣之上（沒被抽屜蓋到）；等鏡頭推完
async function shown(page, hotId) {
  await sleep(450);
  return page.evaluate(id => {
    const st = window.H ? window.H.stage : window.__lab.stage, v = st.view(), hot = st.hotspots().find(x => x.id === id), el = document.querySelector('.ec-drawer');
    if (!hot || !el) return { ok: false, why: !hot ? '沒有熱點' : '沒有抽屜' };
    const dr = el.getBoundingClientRect(), full = st.shop.rectOf(hot.rect), host = st.host.getBoundingClientRect();
    const inView = hot.rect[1] >= v.y && hot.rect[1] + hot.rect[3] <= v.y + v.h;
    const ok = inView && full.bottom <= dr.top + 0.5 && full.top >= host.top - 0.5;
    return { ok, why: `${id} y ${hot.rect[1]}–${hot.rect[1] + hot.rect[3]} 在鏡頭 ${v.y}–${v.y + v.h}：${inView}；CSS 下緣 ${Math.round(full.bottom)} ≤ 抽屜上緣 ${Math.round(dr.top)}：${full.bottom <= dr.top + 0.5}` };
  }, hotId);
}
function panelOk(m, name) {
  if (!m) return [false, name + '：沒有抽屜'];
  const bad = [];
  if (m.h > m.appH * 0.5 + 1) bad.push('高 ' + Math.round(m.h) + ' > 50% (' + Math.round(m.appH / 2) + ')');
  if (m.scrollH > m.clientH + 1) bad.push('溢出 ' + m.scrollH + '>' + m.clientH);
  if (m.top < 0 || m.bottom > m.vh + 1 || m.left < -1 || m.right > m.vw + 1) bad.push('出畫面');
  const small = m.btns.filter(b => b.h < 44 - 0.5 || (b.w < 44 - 0.5 && b.a !== 'go'));   // 縮圖（go）寬可以小一點：主要的翻是 ‹ ›、左右滑
  if (small.length) bad.push('鈕太小 ' + small.map(b => b.a + ' ' + b.w + '×' + b.h).join(','));
  const out = m.btns.filter(b => b.top < m.top - 1 || b.bottom > m.bottom + 1 || b.left < m.left - 1 || b.right > m.right + 1);
  if (out.length) bad.push('鈕在抽屜外 ' + out.map(b => b.a).join(','));
  return [!bad.length, name + ' h=' + Math.round(m.h) + '/' + Math.round(m.appH) + (bad.length ? '：' + bad.join('；') : '')];
}

async function runSize(browser, w, h) {
  const size = `${w}x${h}`;
  const { ctx, page } = await newPage(browser, w, h);
  const panels = [];
  const T = async (n, fn) => { try { await fn(); } catch (e) { record(n, size, false, 'exception: ' + e.message.split('\n')[0]); } };
  try {
    await openHarness(page);
    // ---------------- 1–3：點箱子 → 走過去 → 到了才翻 → 抽屜 ----------------
    await T(1, async () => {
      await page.evaluate(() => {
        const st = window.H.stage; window.__smp = [];
        const f = () => { const a = st.pos('p'); window.__smp.push({ x: a.x, y: a.y, drawer: !!document.querySelector('.ec-drawer'), t: performance.now() }); if (!window.DipLabEcon.debug().open || window.__smp.length < 3) window.__raf = requestAnimationFrame(f); };
        window.__view0 = st.view(); window.__raf = requestAnimationFrame(f);
      });
      await tapHot(page, 'bin:hiphop');
      await waitOpen(page, 9000);
      const r = await page.evaluate(() => {
        cancelAnimationFrame(window.__raf);
        const st = window.H.stage, b = st.bins().find(x => x.key === 'hiphop');
        const digs = window.H.poses.filter(p => p.id === 'p' && p.name === 'dig');
        const walks = window.H.walks.filter(x => x.id === 'p');
        const away = window.__smp.filter(s => Math.hypot(s.x - b.stand[0], s.y - b.stand[1]) > 1.5);
        return { stand: b.stand, digs, walks, moved: window.__smp.length && Math.hypot(window.__smp[0].x - b.stand[0], window.__smp[0].y - b.stand[1]), drawerAway: away.filter(s => s.drawer).length, samples: window.__smp.length };
      });
      const dig0 = r.digs[0];
      const ok = r.walks.length >= 1 && r.walks[0].spd === 54 && r.moved > 10 && dig0 && Math.abs(dig0.x - r.stand[0]) <= 1 && Math.abs(dig0.y - r.stand[1]) <= 1 && r.drawerAway === 0;
      record(1, size, ok, `walk ${JSON.stringify(r.walks.map(x => x.to))} spd ${r.walks[0] && r.walks[0].spd}；起點離 stand ${Math.round(r.moved)} 格；第一次 dig 在 [${dig0 && [dig0.x, dig0.y]}]（stand ${r.stand}）；還沒到就有抽屜 ${r.drawerAway} 格（${r.samples} 個取樣）`);
    });
    await T(2, async () => { const m = await measure(page); panels.push(['箱子', m]); const [ok, s] = panelOk(m, '箱子抽屜'); record(2, size, ok, s); });
    await T(3, async () => {
      const r = await shown(page, 'bin:hiphop');
      const hi = await page.evaluate(() => (window.H.stage.shop.state.hi || []).map(g => g.hots.map(h => h.id)));
      record(3, size, r.ok && JSON.stringify(hi) === '[["bin:hiphop"]]', `${r.why}；描框 ${JSON.stringify(hi)}`);
    });
    // ---------------- 4：翻、唱片資訊 ----------------
    await T(4, async () => {
      const d0 = await dbg(page);
      await tapSel(page, '.ec-drawer [data-a=next]'); await sleep(250);
      const d1 = await dbg(page);
      await tapSel(page, '.ec-drawer .ec-th[data-i="0"]'); await sleep(250);
      const d2 = await dbg(page);
      const cv = await page.locator('.ec-drawer .ec-cv').boundingBox();
      await page.evaluate(([x, y, w]) => {   // 左滑（pointer 事件；觸控的 swipe 在 headless 裡用 pointer 模擬）
        const el = document.querySelector('.ec-drawer .ec-cv');
        const ev = (t, cx) => el.dispatchEvent(new PointerEvent(t, { bubbles: true, clientX: cx, clientY: y, pointerId: 7, pointerType: 'touch', isPrimary: true }));
        ev('pointerdown', x + w * 0.8); ev('pointermove', x + w * 0.5); ev('pointerup', x + w * 0.1);
        el.click();   // 滑完瀏覽器還會送一個 click：不能被當成「點封面」
      }, [cv.x, cv.y + cv.height / 2, cv.width]);
      await sleep(250);
      const d3 = await dbg(page);
      const infoOpen0 = await page.evaluate(() => window.DipLabCardInfo.isOpen());
      await tapSel(page, '.ec-drawer .ec-cv'); await sleep(400);
      const info = await page.evaluate(() => ({ open: window.DipLabCardInfo.isOpen(), id: window.DipLabCardInfo.current() && window.DipLabCardInfo.current().id }));
      await tapSel(page, '#ciClose'); await sleep(350);
      const d4 = await dbg(page), info2 = await page.evaluate(() => window.DipLabCardInfo.isOpen());
      const n = d0.ids.length;
      const ok = n >= 4 && d1.idx === 1 && d2.idx === 0 && d3.idx === 1 && !infoOpen0 && info.open && info.id === d3.ids[1] && !info2 && d4.open;
      record(4, size, ok, `${n} 張；› → ${d1.idx}；縮圖 0 → ${d2.idx}；左滑 → ${d3.idx}（滑完的 click 不開資訊：${!infoOpen0}）；點封面開唱片資訊 ${info.open}（${info.id}）；關掉後抽屜還在 ${d4.open}`);
    });
    // ---------------- 5：點外面關掉 ----------------
    await T(5, async () => {
      const top = await page.evaluate(() => document.querySelector('.ec-drawer').getBoundingClientRect().top);
      await tapXY(page, w / 2, Math.max(60, top - 60));
      await waitClosed(page);
      await sleep(500);
      const r = await page.evaluate(() => {
        const st = window.H.stage, v = st.view(), v0 = window.__view0, last = window.H.poses.filter(p => p.id === 'p').slice(-1)[0];
        return { hi: (st.shop.state.hi || []).length, pose: last && last.name, same: v.y === v0.y && v.h === v0.h && Math.abs(v.scale - v0.scale) < 1e-6, v: [v.y, v.h], v0: [v0.y, v0.h] };
      });
      // 人已經站在箱子前：再點同一箱＝不用走、直接開；放開後補送的 click 不能把剛開的抽屜當成「點外面」關掉
      await page.evaluate(() => { window.H.walks.length = 0; });
      await tapHot(page, 'bin:hiphop'); await sleep(700);
      const again = await page.evaluate(() => ({ open: window.DipLabEcon.debug().open, walks: window.H.walks.length }));
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(450);
      const ok = r.hi === 0 && r.pose === null && r.same && again.open && again.walks === 0;
      record(5, size, ok, `關了；描框 ${r.hi}；姿勢 ${r.pose}；鏡頭 ${r.v} ＝ 開之前 ${r.v0}：${r.same}；站在箱子前再點一次：不走路 ${again.walks === 0}、抽屜開著 ${again.open}`);
    });
    // ---------------- 6：買（錢夠、包包沒滿） ----------------
    await T(6, async () => {
      await reset(page, { mode: 'night', money: 1500, bag: 5, relics: 2 });
      await openAndWait(page, 'bin:hiphop');
      const r0 = await run(page), d0 = await dbg(page);
      const id = d0.ids[d0.idx];
      const price = await page.evaluate(id => window.DipLabEngine.priceOf(window.DipLabContent, id), id);
      const pt = await page.evaluate(id => { const C = window.DipLabContent, E = window.DipLabEngine, k = E.rarity(C.cards[id]); return { mt: E.moneyText(E.priceOf(C, id)), rz: C.rarityZh[k], want: C.economy.price[k], ttl: (document.querySelector('.ec-drawer .ec-ttl') || {}).textContent || '', rar: (document.querySelector('.ec-drawer .ec-meta .ec-rar') || {}).textContent || '' }; }, id);
      const lab = await page.locator('.ec-drawer [data-a=buy]').innerText();
      await tapSel(page, '.ec-drawer [data-a=buy]'); await sleep(350);
      const r1 = await run(page), d1 = await dbg(page), toasts = await page.evaluate(() => window.H.toasts.slice());
      const ok = r1.money === r0.money - price && r1.bag.length === r0.bag.length + 1 && r1.bag.includes(id) && !d1.ids.includes(id) && d1.ids.length === d0.ids.length - 1 && /進包包/.test(toasts.join()) && lab.replace(/\s/g, '') === ('買$' + pt.mt) && price === pt.want && price >= 800 && price <= 1200 && pt.ttl === 'HIP-HOP嘻哈 R&B' && pt.rar === pt.rz;
      record(6, size, ok, `標題「${pt.ttl}」稀有度「${pt.rar}」（${pt.rz}＝$${pt.want}）；「${lab.replace(/\s+/g, ' ')}」：$${r0.money} → $${r1.money}（價 ${price}）；包包 ${r0.bag.length} → ${r1.bag.length}；抽屜 ${d0.ids.length} → ${d1.ids.length} 張；吐司「${toasts.slice(-1)[0]}」`);
      panels.push(['箱子（買完）', await measure(page)]);
    });
    // ---------------- 7：包包不限張數（店主 11-16）：包包 8 張、24 張，錢夠 → 直接買（不用先賣一張） ----------------
    await T(7, async () => {
      const out = [];
      for (const n of [8, 24]) {
        await reset(page, { mode: 'night', money: 5000, bag: n, relics: 2 });
        await openAndWait(page, 'bin:hiphop');
        const r0 = await run(page), d0 = await dbg(page), id = d0.ids[d0.idx];
        const price = await page.evaluate(id => window.DipLabEngine.priceOf(window.DipLabContent, id), id);
        const mt = await page.evaluate(p => window.DipLabEngine.moneyText(p), price);
        const lab = (await page.locator('.ec-drawer [data-a=buy]').innerText()).replace(/\s+/g, '');
        const bag0 = (await page.locator('.ec-drawer .ec-bag').innerText()).trim();
        if (n === 24) panels.push(['箱子（包包 24 張）', await measure(page)]);
        await tapSel(page, '.ec-drawer [data-a=buy]'); await sleep(350);
        const r1 = await run(page), d1 = await dbg(page), toasts = await page.evaluate(() => window.H.toasts.slice());
        const bag1 = (await page.locator('.ec-drawer .ec-bag').innerText()).trim();
        out.push({ ok: r0.bag.length === n && lab === '買$' + mt && bag0 === '包包 ' + n + ' 張' && !d1.sub && r1.money === r0.money - price && r1.bag.length === n + 1 && r1.bag.includes(id) && !d1.ids.includes(id) &&
            /進包包/.test(toasts.slice(-1)[0] || '') && bag1 === '包包 ' + (n + 1) + ' 張',
          s: `包包 ${r0.bag.length}：標題列「${bag0}」、鈕「${lab}」→ 先賣子面板 ${!!d1.sub}、$${r0.money} → $${r1.money}（價 ${price}）、包包 ${r1.bag.length}（「${bag1}」）、吐司「${toasts.slice(-1)[0]}」` });
        await page.evaluate(() => window.DipLabEcon.close()); await sleep(300);
      }
      record(7, size, out.every(x => x.ok), out.map(x => x.s).join('；'));
    });
    // ---------------- 8：錢不夠 ----------------
    await T(8, async () => {
      await reset(page, { mode: 'night', money: 0, bag: 0, relics: 2 });   // 包包空：賣一張也湊不到（湊得到的情況見 #15）
      await openAndWait(page, 'bin:jazz');
      const b = page.locator('.ec-drawer [data-a=buy]');
      const dis = await b.isDisabled(), txt = (await b.innerText()).replace(/\s+/g, ' ');
      const m0 = (await run(page)).money;
      await tapSel(page, '.ec-drawer [data-a=buy]'); await sleep(200);
      const m1 = (await run(page)).money, ch = await page.evaluate(() => window.H.chooses.length);
      record(8, size, dis && /錢不夠/.test(txt) && m1 === m0 && ch === 0, `鈕停用 ${dis}、字「${txt}」；點了也沒交易（choose ${ch} 次）`);
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(300);
    });
    // ---------------- 9：櫃檯配件 ----------------
    await T(9, async () => {
      await reset(page, { mode: 'night', money: 6500, bag: 5, relics: 2 });   // 配件一件 $3,000（FIXLIST 8）：買一件剩 3,500，滿 3 件再買要先賣一件（+1,500）
      await page.evaluate(() => { window.H.open('relic'); }); await sleep(150); await skipWalk(page); await waitOpen(page);
      const pos = await page.evaluate(() => { const a = window.H.stage.pos('p'), s = window.H.stage.spot('pay'); return [Math.round(a.x), Math.round(a.y), s]; });
      panels.push(['櫃檯', await measure(page)]);
      const vis9 = await shown(page, 'counter');
      const r0 = await run(page), rid = r0.shop.relics[0];
      const price = await page.evaluate(id => window.DipLabEngine.relicPrice(window.DipLabContent, id), rid);
      await tapSel(page, `.ec-drawer [data-a=rbuy][data-r="${rid}"]`); await sleep(600);   // 買完 450 ms 內再點不算（RT-2 防連點）：等過了才點下一件
      const r1 = await run(page);
      const ok1 = price === 3000 && r1.money === r0.money - price && r1.relics.length === 3 && r1.relics.includes(rid) && !r1.shop.relics.includes(rid);
      // 滿 3 件：再買一件 → 先賣一件
      const rid2 = r1.shop.relics[0];
      let ok2 = false, s2 = '櫃檯只剩 0 件';
      if (rid2) {
        const price2 = await page.evaluate(id => window.DipLabEngine.relicPrice(window.DipLabContent, id), rid2);
        await tapSel(page, `.ec-drawer [data-a=rbuy][data-r="${rid2}"]`); await sleep(300);
        const ds = await dbg(page), msg = await page.locator('.ec-drawer .ec-msg').innerText();
        panels.push(['賣回（配件）', await measure(page)]);
        const sell = r1.relics[0], sv = await page.evaluate(id => window.DipLabEngine.sellValue(window.DipLabContent, id), sell);
        await tapSel(page, `.ec-drawer .ec-spick[data-r="${sell}"]`); await sleep(200);
        await tapSel(page, '.ec-drawer [data-a=sell]'); await sleep(350);
        const r2 = await run(page);
        ok2 = ds.sub && ds.sub.kind === 'relic' && /最多三件/.test(msg) && r2.relics.length === 3 && !r2.relics.includes(sell) && r2.relics.includes(rid2) && r2.money === r1.money + sv - price2;
        s2 = `滿 3 件「${msg}」→ 賣 ${sell}（+${sv}）買 ${rid2}（${price2}）：$${r1.money} → $${r2.money}、配件 ${r2.relics.join(',')}`;
      }
      const atPay = Math.abs(pos[0] - pos[2][0]) <= 1 && Math.abs(pos[1] - pos[2][1]) <= 1;
      record(9, size, ok1 && ok2 && atPay && vis9.ok, `走到櫃檯前 ${atPay}；櫃檯沒被蓋到 ${vis9.ok}${vis9.ok ? '' : '（' + vis9.why + '）'}；買 ${rid}（${price}）：$${r0.money} → $${r1.money}、配件 ${r1.relics.length}；${s2}`);
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(300);
    });
    // ---------------- 10：特價箱開局模式（真點特價箱） ----------------
    await T(10, async () => {
      await reset(page, { mode: 'pick', money: 300, bag: 4, relics: 0 });
      await tapHot(page, 'bin:sale');
      await sleep(150); await skipWalk(page); await waitOpen(page);
      panels.push(['特價（挑三張）', await measure(page)]);
      const vis10 = await shown(page, 'bin:sale');
      const d0 = await dbg(page), r0 = await run(page);
      const take = page.locator('.ec-drawer [data-a=take]');
      const ids = d0.ids;
      // 每格標特價、劃掉（這次免費；FIXLIST 8）：價＝engine.bargainPriceOf（最高星 1／2／3 → $100／200／300）
      const pr = await page.evaluate(() => { const C = window.DipLabContent, E = window.DipLabEngine;
        return { free: /這次免費/.test((document.querySelector('.ec-drawer .ec-hd') || {}).textContent || ''),
          tiles: [...document.querySelectorAll('.ec-drawer .ec-tile')].map(t => { const s = t.querySelector('.ec-pt.free s'); return { s: s ? s.textContent : null, want: '$' + E.moneyText(E.bargainPriceOf(C, t.dataset.cid)) }; }) }; });
      const priceShown = pr.free && pr.tiles.length === 6 && pr.tiles.every(t => t.s && t.s === t.want && /^\$[123]00$/.test(t.s));
      const dis = [];
      dis.push(await take.isDisabled());
      for (let i = 0; i < 3; i++) { await tapSel(page, `.ec-drawer .ec-tile[data-cid="${ids[i]}"]`); await sleep(150); dis.push(await take.isDisabled()); }
      await tapSel(page, `.ec-drawer .ec-tile[data-cid="${ids[1]}"]`); await sleep(150); const disOff = await take.isDisabled();
      await tapSel(page, `.ec-drawer .ec-tile[data-cid="${ids[4]}"]`); await sleep(150);
      await tapSel(page, `.ec-drawer .ec-tile[data-cid="${ids[5]}"]`); await sleep(150);   // 已經三張：第 4 張換掉最早挑的那張
      const sel4 = (await dbg(page)).sel;
      const want = [ids[2], ids[4], ids[5]];
      // 長按封面＝唱片資訊（不會選它）：放開後補送 click 的瀏覽器、跟不送 click 的瀏覽器都要開得出來、而且不被那個 click 關掉
      const lp = async (id, withClick) => {
        await page.evaluate(id => {
          const el = document.querySelector(`.ec-drawer .ec-tile[data-cid="${id}"]`), r = el.getBoundingClientRect();
          el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: r.left + 10, clientY: r.top + 10, pointerId: 9, pointerType: 'touch', isPrimary: true }));
        }, id);
        await sleep(600);
        await page.evaluate(([id, withClick]) => {
          const el = document.querySelector(`.ec-drawer .ec-tile[data-cid="${id}"]`), r = el.getBoundingClientRect();
          el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: r.left + 10, clientY: r.top + 10, pointerId: 9, pointerType: 'touch', isPrimary: true }));
          if (withClick) el.click();
        }, [id, withClick]);
        await sleep(700);
        const r = await page.evaluate(() => ({ open: window.DipLabCardInfo.isOpen(), id: window.DipLabCardInfo.current() && window.DipLabCardInfo.current().id, sel: window.DipLabEcon.debug().sel }));
        if (r.open) { await tapSel(page, '#ciClose'); await sleep(350); }
        return r;
      };
      const lp1 = await lp(ids[1], true), lp2 = await lp(ids[3], false);
      const lpOk = lp1.open && lp1.id === ids[1] && lp2.open && lp2.id === ids[3] && JSON.stringify(lp2.sel) === JSON.stringify(want);
      // 點外面不會關
      const top = await page.evaluate(() => document.querySelector('.ec-drawer').getBoundingClientRect().top);
      await tapXY(page, w / 2, Math.max(60, top - 60)); await sleep(300);
      const still = (await dbg(page)).open;
      await tapSel(page, '.ec-drawer [data-a=take]'); await sleep(400);
      const r1 = await run(page), closed = !(await dbg(page)).open;
      const ok = vis10.ok && ids.length === 6 && priceShown && dis.join() === 'true,true,true,false' && disOff && JSON.stringify(sel4) === JSON.stringify(want) && lpOk && still && closed && r1.bag.length === r0.bag.length + 3 &&
        want.every(id => r1.bag.includes(id)) && r1.shop.bargainPicked && r1.shop.bargain.length === 3;
      record(10, size, ok, `特價箱沒被蓋到 ${vis10.ok}${vis10.ok ? '' : '（' + vis10.why + '）'}；${ids.length} 張、特價劃掉＋這次免費 ${priceShown}（${pr.tiles.map(t => t.s).join(' ')}）；挑 0/1/2/3 張時鈕停用 ${dis.join('/')}；取消一張又停用 ${disOff}；第 4 張換掉最早那張 ${JSON.stringify(sel4) === JSON.stringify(want)}；長按＝唱片資訊（有補送 click ${lp1.open}、沒有 ${lp2.open}，不會選到 ${JSON.stringify(lp2.sel) === JSON.stringify(want)}）；點外面不關 ${still}；收下 → 包包 ${r0.bag.length} → ${r1.bag.length}、特價剩 ${r1.shop.bargain.length}`);
    });
    // ---------------- 11：特價箱之後模式 ----------------
    await T(11, async () => {
      await reset(page, { mode: 'night', money: 800, bag: 5, relics: 2 });
      await openAndWait(page, 'bargain');
      panels.push(['特價（$100）', await measure(page)]);
      const d0 = await dbg(page), r0 = await run(page), buy = page.locator('.ec-drawer [data-a=bbuy]');
      const dis0 = await buy.isDisabled(), lab = (await buy.innerText()).replace(/\s+/g, '');
      const each = await page.evaluate(() => [...document.querySelectorAll('.ec-drawer .ec-tile')].map(t => { const C = window.DipLabContent, E = window.DipLabEngine; return [(t.querySelector('.ec-pt') || {}).textContent || '', '$' + E.moneyText(E.bargainPriceOf(C, t.dataset.cid)), !!t.querySelector('.ec-pt.free')]; }));
      const p0 = await page.evaluate(id => window.DipLabEngine.bargainPriceOf(window.DipLabContent, id), d0.ids[0]);
      await tapSel(page, `.ec-drawer .ec-tile[data-cid="${d0.ids[0]}"]`); await sleep(150);
      const dis1 = await buy.isDisabled(), lab1 = (await buy.innerText()).replace(/\s+/g, '');
      await tapSel(page, '.ec-drawer [data-a=bbuy]'); await sleep(350);
      const r1 = await run(page), d1 = await dbg(page);
      const okEach = each.length > 0 && each.every(([a, b, free]) => a === b && !free && /^\$[123]00$/.test(a));
      const ok1 = dis0 && !dis1 && lab === '挑一到三張' && lab1 === '買下$' + p0 && okEach && r1.money === r0.money - p0 && r1.bag.length === r0.bag.length + 1 && r1.bag.includes(d0.ids[0]) && !d1.ids.includes(d0.ids[0]);
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(250);
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(250);
      // 包包 8 張（以前的上限）：挑 2 張 → 直接買（包包不限張數，店主 11-16：不用先賣）、付兩張的總和、包包 10
      await reset(page, { mode: 'night', money: 800, bag: 8, relics: 2 });
      await openAndWait(page, 'bargain');
      const e0 = await dbg(page), q0 = await run(page);
      for (const id of e0.ids.slice(0, 2)) { await tapSel(page, `.ec-drawer .ec-tile[data-cid="${id}"]`); await sleep(120); }
      const lab2 = (await page.locator('.ec-drawer [data-a=bbuy]').innerText()).replace(/\s+/g, '');
      await tapSel(page, '.ec-drawer [data-a=bbuy]'); await sleep(350);
      const es = await dbg(page), q1 = await run(page);
      const p2 = await page.evaluate(ids => ids.reduce((s, id) => s + window.DipLabEngine.bargainPriceOf(window.DipLabContent, id), 0), e0.ids.slice(0, 2));
      const ok3 = !es.sub && lab2 === '買下$' + p2 && q0.bag.length === 8 && q1.bag.length === 10 && q1.money === q0.money - p2 && e0.ids.slice(0, 2).every(id => q1.bag.includes(id));
      record(11, size, ok1 && ok3, `每格標價 ${okEach}（${each.map(x => x[0]).join(' ')}）；「${lab}」沒挑停用 ${dis0}、挑 1 張「${lab1}」可按 ${!dis1}；$${r0.money} → $${r1.money}、包包 ${r0.bag.length} → ${r1.bag.length}；包包 ${q0.bag.length} 挑 2 張「${lab2}」→ 先賣子面板 ${!!es.sub}、$${q0.money} → $${q1.money}（付 $${p2}）、包包 ${q1.bag.length}`);
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(300);
    });
    // ---------------- 12：序章、對決中點箱子 ----------------
    await T(12, async () => {
      const out = [];
      for (const mode of ['prologue', 'duel']) {
        await reset(page, { mode, money: 800, bag: 5, relics: 2 });
        await page.evaluate(() => { window.H.says.length = 0; });
        await tapHot(page, 'bin:rock'); await sleep(500);
        const r = await page.evaluate(() => ({ says: window.H.says.slice(), open: window.DipLabEcon.isOpen(), drawer: !!document.querySelector('.ec-drawer'), bubble: [...document.querySelectorAll('.ds-say')].map(e => e.textContent).join('|') }));
        out.push({ mode, ok: r.says.some(s => s.id === 'o' && s.text === '打完再翻。') && !r.open && !r.drawer && /打完再翻。/.test(r.bubble), bubble: r.bubble });
      }
      record(12, size, out.every(x => x.ok), out.map(x => `${x.mode}：泡泡「${x.bubble}」${x.ok ? '' : '（不對）'}`).join('；'));
    });
    // ---------------- 13：沒有 run（標題） ----------------
    await T(13, async () => {
      await reset(page, { mode: 'title' });
      await openAndWait(page, 'bin:elec');
      const d = await dbg(page), nb = await page.locator('.ec-drawer [data-a=buy]').count();
      const pool = await page.evaluate(() => window.DipLabContent.bins.elec.pool.slice(0, 6));
      panels.push(['箱子（標題，只能看）', await measure(page)]);
      await tapSel(page, '.ec-drawer [data-a=next]'); await sleep(200);
      const d1 = await dbg(page);
      record(13, size, d.mode === 'view' && nb === 0 && JSON.stringify(d.ids) === JSON.stringify(pool) && d1.idx === 1, `只能看 ${d.mode}；沒有買的鈕 ${nb === 0}；列卡池前 ${d.ids.length} 張（照 bins.js 順序）；能翻 ${d1.idx === 1}`);
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(250);
    });
    // ---------------- 15：包包沒滿、錢不夠但賣一張就夠 → 先賣一張；配件同理 ----------------
    await T(15, async () => {
      await reset(page, { mode: 'night', money: 0, bag: 5, relics: 2 });
      // 錢＝價格 − 包包裡最高的賣回價：只有賣回價最高的那（幾）張湊得到
      const setup = await page.evaluate(() => {
        const C = window.DipLabContent, E = window.DipLabEngine, r = window.H.run, id = r.shop.bins.hiphop[0];
        const price = E.priceOf(C, id), all = r.bag.map(b => [b, E.sellValue(C, C.cards[b]), E.isGift(r, C, b)]);
        const sv = all.filter(x => !x[2]).map(x => [x[0], x[1]]), max = Math.max(...sv.map(x => x[1]));   // 老闆送的不能賣：只算能賣的
        r.money = Math.max(0, price - max);
        return { id, price, all, sv, max, money: r.money };
      });
      await openAndWait(page, 'bin:hiphop');
      const r0 = await run(page), d0 = await dbg(page), b = page.locator('.ec-drawer [data-a=buy]');
      const dis = await b.isDisabled(), txt = (await b.innerText()).replace(/\s+/g, '');
      await tapSel(page, '.ec-drawer [data-a=buy]'); await sleep(300);
      const ds = await dbg(page), msg = await page.locator('.ec-drawer .ec-msg').innerText();
      panels.push(['錢不夠先賣（唱片）', await measure(page)]);
      const vis = await shown(page, 'bin:hiphop');
      const tiles = await page.evaluate(() => [...document.querySelectorAll('.ec-drawer .ec-spick')].map(t => [t.dataset.cid, t.disabled]));
      const gtiles = await page.evaluate(() => [...document.querySelectorAll('.ec-drawer .ec-spick.gift')].map(t => [t.dataset.cid, t.disabled, (t.querySelector('.ec-gift') || {}).textContent || '']));
      const okGift = gtiles.length === setup.all.filter(x => x[2]).length && gtiles.length > 0 && gtiles.every(([, dis, tx]) => dis && tx === '老闆送的');
      const want = setup.all.map(([id, v, gift]) => [id, gift || setup.money + v < setup.price]);   // 老闆送的：一律不給選
      const sell = setup.sv.find(x => x[1] === setup.max)[0];
      await tapSel(page, `.ec-drawer .ec-spick[data-cid="${sell}"]`); await sleep(200);
      await tapSel(page, '.ec-drawer [data-a=sell]'); await sleep(350);
      const r1 = await run(page), d1 = await dbg(page), toasts = await page.evaluate(() => window.H.toasts.slice());
      const okCard = d0.ids[d0.idx] === setup.id && setup.money < setup.price && !dis && txt === '買$' + setup.price.toLocaleString('en-US') + '先賣一張' && ds.sub && ds.sub.kind === 'card' && ds.sub.why === 'money' && ds.sub.need === 1 &&
        /^錢不夠：先賣一張/.test(msg) && JSON.stringify(tiles) === JSON.stringify(want) && vis.ok && okGift && !ds.scroll &&
        r1.money === setup.money + setup.max - setup.price && r1.bag.length === r0.bag.length && !r1.bag.includes(sell) && r1.bag.includes(setup.id) && !d1.ids.includes(setup.id) && !d1.sub && /賣掉/.test(toasts.slice(-1)[0] || '');
      const sCard = `$${setup.money}、《${setup.id}》$${setup.price}：鈕「${txt}」可按 ${!dis}；子面板「${msg}」（箱子沒被蓋到 ${vis.ok}）；不給選 ${tiles.filter(t => t[1]).length}/${tiles.length} 張（照賣回價算 ${JSON.stringify(tiles) === JSON.stringify(want)}；老闆送的 ${gtiles.length} 張標「${(gtiles[0] || [])[2]}」${okGift}）；賣 ${sell}（+${setup.max}）→ $${r1.money}、包包 ${r0.bag.length} → ${r1.bag.length}`;
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(300);
      // 包包 24 張（不限張數，店主 11-16）：先賣子面板列整個包包 → 格子那一區自己捲；捲到最後一張、選它、賣了買到
      await reset(page, { mode: 'night', money: 0, bag: 24, relics: 2 });
      const big = await page.evaluate(() => {
        const C = window.DipLabContent, E = window.DipLabEngine, r = window.H.run, id = r.shop.bins.hiphop[0];
        const price = E.priceOf(C, id), sellable = r.bag.filter(b => !E.isGift(r, C, b));
        const last = sellable.slice().sort((x, y) => E.sellValue(C, C.cards[y]) - E.sellValue(C, C.cards[x]))[0], v = E.sellValue(C, C.cards[last]);
        r.bag.splice(r.bag.indexOf(last), 1); r.bag.push(last);   // 賣回價最高那張擺到包包最後（子面板最後一格：要捲才看得到）
        r.money = Math.max(0, price - v);                           // 錢不夠；賣最後那張就買得起
        return { id, price, last, v, money: r.money, enough: r.money + v >= price, n: r.bag.length };
      });
      await openAndWait(page, 'bin:hiphop');
      await tapSel(page, '.ec-drawer [data-a=buy]'); await sleep(350);
      const bd = await dbg(page), bm = await measure(page);
      panels.push(['錢不夠先賣（包包 24 張，格子捲）', bm]);
      // 格子自己捲時列高照內容：第二列的格子在第一列封面的下面（不疊在一起）
      const ov = await page.evaluate(() => { const t = [...document.querySelectorAll('.ec-drawer .ec-spick')], a = t[0] && t[0].querySelector('.ec-tcv').getBoundingClientRect(), b = t[4] && t[4].getBoundingClientRect();
        return a && b ? { ok: b.top >= a.bottom - 0.5, a: Math.round(a.bottom), b: Math.round(b.top) } : { ok: false }; });
      const bvis = await shown(page, 'bin:hiphop');
      await page.evaluate(() => { const g = document.querySelector('.ec-drawer .ec-grid'); if (g) g.scrollTop = g.scrollHeight; }); await sleep(200);
      const lastIn = await page.evaluate(id => { const g = document.querySelector('.ec-drawer .ec-grid'), t = document.querySelector(`.ec-drawer .ec-spick[data-cid="${id}"]`); if (!g || !t) return false;
        const a = g.getBoundingClientRect(), b = t.getBoundingClientRect(); return b.top >= a.top - 1 && b.bottom <= a.bottom + 1; }, big.last);
      let bigOk = false, sBig = '';
      if (big.enough) {
        await tapSel(page, `.ec-drawer .ec-spick[data-cid="${big.last}"]`); await sleep(200);
        const picked = (await dbg(page)).sub.picks.slice();
        await tapSel(page, '.ec-drawer [data-a=sell]'); await sleep(350);
        const b1 = await run(page), bd1 = await dbg(page);
        bigOk = big.n === 24 && bd.sub && bd.scroll && bm.grid && bm.grid.sh > bm.grid.ch + 4 && bvis.ok && lastIn && ov.ok && picked.join() === big.last &&
          b1.money === big.money + big.v - big.price && b1.bag.length === 24 && !b1.bag.includes(big.last) && b1.bag.includes(big.id) && !bd1.sub;
        sBig = `包包 ${big.n}：子面板格子捲 ${bd.scroll}（格子 ${bm.grid && bm.grid.sh}/${bm.grid && bm.grid.ch}；第二列 ${ov.b} ≥ 第一列封面下緣 ${ov.a}）、箱子沒被蓋到 ${bvis.ok}；捲到底最後一張看得到 ${lastIn}、選了 ${picked.join()}；賣 +${big.v} 買 $${big.price}：$${big.money} → $${b1.money}、包包 ${b1.bag.length}`;
      } else {
        bigOk = big.n === 24 && bd.sub && bd.scroll && bm.grid && bm.grid.sh > bm.grid.ch + 4 && bvis.ok && lastIn && ov.ok;
        sBig = `包包 ${big.n}：子面板格子捲 ${bd.scroll}（格子 ${bm.grid && bm.grid.sh}/${bm.grid && bm.grid.ch}）、箱子沒被蓋到 ${bvis.ok}；捲到底最後一張看得到 ${lastIn}（最後一張賣回價不夠買，不賣）`;
      }
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(300);
      // 配件：沒滿 3 件、錢不夠但賣一件就夠
      await reset(page, { mode: 'night', money: 0, bag: 5, relics: 2 });
      const rs = await page.evaluate(() => {
        const C = window.DipLabContent, E = window.DipLabEngine, r = window.H.run, rid = r.shop.relics[0];
        const price = E.relicPrice(C, rid), sv = r.relics.map(x => [x, E.sellValue(C, x)]), max = Math.max(...sv.map(x => x[1]));
        r.money = Math.max(0, price - max);
        return { rid, price, sv, max, money: r.money };
      });
      await page.evaluate(() => { window.H.open('relic'); }); await sleep(150); await skipWalk(page); await waitOpen(page);
      const rb = page.locator(`.ec-drawer [data-a=rbuy][data-r="${rs.rid}"]`);
      const rdis = await rb.isDisabled(), rtxt = (await rb.innerText()).replace(/\s+/g, '');
      await tapSel(page, `.ec-drawer [data-a=rbuy][data-r="${rs.rid}"]`); await sleep(300);
      const rds = await dbg(page), rmsg = await page.locator('.ec-drawer .ec-msg').innerText();
      panels.push(['錢不夠先賣（配件）', await measure(page)]);
      const rsell = rs.sv.find(x => x[1] === rs.max)[0];
      await tapSel(page, `.ec-drawer .ec-spick[data-r="${rsell}"]`); await sleep(200);
      await tapSel(page, '.ec-drawer [data-a=sell]'); await sleep(350);
      const q1 = await run(page);
      const okRelic = rs.money < rs.price && !rdis && rtxt === '買$' + rs.price.toLocaleString('en-US') + '先賣一件' && rds.sub && rds.sub.kind === 'relic' && rds.sub.why === 'money' && /^錢不夠：先賣一件/.test(rmsg) &&
        q1.relics.length === 2 && !q1.relics.includes(rsell) && q1.relics.includes(rs.rid) && q1.money === rs.money + rs.max - rs.price;
      const sRelic = `配件 $${rs.money}、「${rs.rid}」$${rs.price}：鈕「${rtxt}」可按 ${!rdis}；「${rmsg}」；賣 ${rsell}（+${rs.max}）→ $${q1.money}、配件 ${q1.relics.join(',')}`;
      record(15, size, okCard && bigOk && okRelic, sCard + '；' + sBig + '；' + sRelic);
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(300);
    });
    // ---------------- 16：走路朝向（v5 第五項，三向）：往上走那段畫背面、往下正面、橫走側面；到箱子前翻箱、到櫃檯 faceTo 都回正面 ----------------
    await T(16, async () => {
      await reset(page, { mode: 'night', money: 5000, bag: 2, relics: 2 });
      const walkSample = k => page.evaluate(k => {
        const st = window.H.stage; window.__fd = [];
        const f = () => { const a = st.pos('p'); window.__fd.push({ x: a.x, y: a.y, dir: a.dir, flip: a.flip, open: !!document.querySelector('.ec-drawer') }); if (window.__fd.length < 3000 && !(window.__fd.length > 3 && document.querySelector('.ec-drawer'))) window.__fdr = requestAnimationFrame(f); };
        window.__fdr = requestAnimationFrame(f); window.H.open(k);
      }, k);
      const moves = smp => { const out = []; for (let i = 1; i < smp.length; i++) { const dx = smp[i].x - smp[i - 1].x, dy = smp[i].y - smp[i - 1].y; if (Math.hypot(dx, dy) > 0.5) out.push({ dx, dy, dir: smp[i].dir, flip: smp[i].flip, th: Math.atan2(Math.abs(dy), Math.abs(dx)) * 180 / Math.PI }); } return out; };
      // browse → 爵士箱（往下、往左）：一路正面；到了翻箱＝正面
      await walkSample('bin:jazz'); await waitOpen(page, 15000);
      const s1 = await page.evaluate(() => { cancelAnimationFrame(window.__fdr); return { smp: window.__fd, at: window.H.stage.pos('p') }; });
      const m1 = moves(s1.smp);
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(500);
      // 爵士箱 → 櫃檯（最後一段往右上約 60°）：那段要畫背面
      await walkSample('relic'); await waitOpen(page, 15000);
      const s2 = await page.evaluate(() => { cancelAnimationFrame(window.__fdr); return { smp: window.__fd, at: window.H.stage.pos('p') }; });
      const m2 = moves(s2.smp), up = m2.filter(m => m.dy < 0 && m.th >= 60), backs = m2.filter(m => m.dir === 'back');
      const down = m1.concat(m2).filter(m => m.dy > 0.5 && m.th >= 55), flat = m1.concat(m2).filter(m => m.th <= 30);
      const sumUp = backs.reduce((a, m) => a + m.dy, 0), sumX = backs.reduce((a, m) => a + Math.abs(m.dx), 0);
      const okBack = up.length >= 2 && up.filter(m => m.dir === 'back').length >= up.length - 1 && sumUp < 0 && -sumUp > sumX;
      const okFront = down.every(m => m.dir === 'front') && flat.filter(m => m.dir === 'back').length <= 1 && m1.length > 3;
      // 橫走＝側面（換向後 0.12 秒內不換，轉角後頭一兩步可能還是上一個方向）、朝向跟著走的左右
      const sides = flat.filter(m => m.dir === 'side'), flipOk = sides.every(m => m.flip === (m.dx < 0)), lefts = sides.filter(m => m.flip).length;
      const okSide = flat.length >= 3 && sides.length >= flat.length - 2 && flipOk && !m1.concat(m2).some(m => m.dir === 'side' && m.th >= 55);
      const okStop = s1.at.dir === 'front' && s2.at.dir === 'front';
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(300);
      record(16, size, okBack && okFront && okSide && okStop, `往上 ${up.length} 步（背面 ${up.filter(m => m.dir === 'back').length}）；背面那幾步 Σdy ${Math.round(sumUp)}、Σ|dx| ${Math.round(sumX)}；往下 ${down.length} 步全正面 ${down.every(m => m.dir === 'front')}；橫走 ${flat.length} 步、側面 ${sides.length}（朝左 ${lefts}、左右對 ${flipOk}）、背面 ${flat.filter(m => m.dir === 'back').length}；到箱子前 ${s1.at.dir}、到櫃檯 ${s2.at.dir}`);
    });
    // ---------------- 14：所有面板不捲出畫面、主控台 0 錯誤 ----------------
    await T(14, async () => {
      const lines = panels.map(([n, m]) => panelOk(m, n));
      const errs = page._errors.concat(await page.evaluate(() => window.H.errors));
      const ok = lines.every(x => x[0]) && !errs.length && panels.length >= 10;
      record(14, size, ok, lines.map(x => x[1]).join('；') + `；主控台錯誤 ${errs.length}${errs.length ? '：' + errs.slice(0, 3).join(' / ') : ''}`);
    });
  } finally {
    await ctx.close();
  }
}

// ======================================================================= index.html（整合後）
const IURL = /econ-harness/.test(URL0) ? new URL('../index.html', URL0).href : URL0.replace(/\?.*$/, '');
const IQ = IURL + '?debug=1&seed=20261106';
// 一份 v5 存檔（同 e2e-lib 的 seedRun）：第 1 位之前、特價箱已挑、錢 money
async function seedNight(page, money, bagN) {
  await page.evaluate(([money, bagN]) => {
    const E = window.DipLabEngine, C = window.DipLabContent;
    const r = E.newRun(C, { seedKey: '20261106', runNo: 1, ace: 'pearl', prologue: false, relics: [] });
    r.tut = false;
    const ch = E.bargainPolicy(r, C); if (ch) E.choose(r, C, ch);
    r.money = money;
    if (bagN) {   // 包包補到 bagN 張（包包不限張數，店主 11-16）：不重複、不是這一輪貨架上的、照價能賣的
      const used = new Set([C.aces[r.ace], ...r.bag, ...Object.values(r.shop.bins).flat(), ...r.shop.bargain]);
      r.bag.push(...Object.keys(C.cards).filter(id => !C.cards[id].tier && !used.has(id) && E.priceOf(C, C.cards[id]) != null).slice(0, bagN - r.bag.length));
    }
    const s = { v: 5, seen: { night: true }, learned: {}, settings: { fastAnim: false, sound: false }, player: null, run: r, runs: [],
      best: { far: 0, checkpoints: [], bestStreak: 0 }, shelf: {}, relics: [], tutorialDone: true, prologueDone: true, lastAce: 'pearl', lastBargain: null };
    [C.aces[r.ace]].concat(r.bag).forEach(id => { s.shelf[id] = { at: r.seedKey + '#1', seen: false }; });
    localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
  }, [money, bagN || 0]);
}
async function openTitleI(page) {
  await page.goto(IQ, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-a=push],[data-a=cont]', { state: 'visible', timeout: 10000 });
  await page.waitForFunction(() => !document.body.classList.contains('stage-wait'), null, { timeout: 6000 }).catch(() => {});
  await sleep(500);
}
// 舞台上真點第一個「看得到、最上層是畫布」的熱點（同 e2e.spec 的 tapHot）
async function tapHotWhere(page, pred) {
  const p = await page.evaluate(src => {
    const st = window.__lab.stage, sh = st.shop, hb = st.host.getBoundingClientRect(), f = new Function('h', 'return (' + src + ')(h)');
    const byId = {}; (st.hotspots() || []).forEach(h => { byId[h.id] = h; });
    for (const q of sh.hotPoints()) {
      const h = byId[q.id]; if (!h || !f(h)) continue;
      const x = hb.left + q.x, y = hb.top + q.y;
      if (y < 0 || y > innerHeight || x < 0 || x > innerWidth || document.elementFromPoint(x, y) !== sh.canvas) continue;
      return { x, y, id: h.id, action: h.action };
    }
    return null;
  }, String(pred));
  if (!p) return null;
  await page.touchscreen.tap(p.x, p.y);
  return p;
}
const nightLine = page => page.evaluate(() => ({ money: ((document.querySelector('[data-tut=money]') || {}).textContent || '').trim(), ec: !!document.querySelector('[data-tut=money] .ec-money'),
  bag: ((document.querySelector('.lb-bagline [data-a=bag]') || {}).textContent || '').replace(/\s+/g, ''), run: window.__lab.run && { money: window.__lab.run.money, bag: window.__lab.run.bag.length },
  saved: (() => { try { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); return s && s.run ? s.run.money : null; } catch (_) { return null; } })() }));
async function runIndex(browser, w, h) {
  const size = `${w}x${h}`;
  const { ctx, page } = await newPage(browser, w, h);
  const T = async (n, fn) => { try { await fn(); } catch (e) { record(n, size, false, 'exception: ' + e.message.split('\n')[0]); } };
  try {
    await openTitleI(page);
    const wired = await page.evaluate(() => !!(window.__lab && window.DipLabEcon && document.querySelector('script[src*="econ.js"]')));
    if (!wired) return false;
    await seedNight(page, 5000);   // FEATURE 那格最貴 $4,000（FIXLIST 8）
    await openTitleI(page);
    await jsClick(page, '[data-a=cont]');
    if (!(await waitScreen(page, 'night', 15000))) throw new Error('進不了來客（' + (await page.evaluate(() => window.__lab.screen())) + '）');
    await sleep(1500);
    await T(21, async () => {
      const r = await nightLine(page), d = await page.evaluate(() => window.DipLabEcon.debug());
      const css = await page.evaluate(() => [...document.styleSheets].some(s => /econ\.css/.test(s.href || '')));
      record(21, size, r.ec && r.money === '$' + r.run.money.toLocaleString('en-US') && r.money === '$5,000' && d.cfg && css, `錢那一格「${r.money}」（run $${r.run.money}；econ 的 moneyHTML ${r.ec}）；DipLabEcon configure ${d.cfg}；econ.css ${css}`);
    });
    let hot = null;
    await T(22, async () => {
      hot = await tapHotWhere(page, h => /^crate:/.test(h.action || '') && h.action !== 'crate:sale');
      if (!hot) throw new Error('來客的舞台上沒有點得到的箱子');
      const key = hot.action.slice(6);
      await page.waitForFunction(() => window.DipLabEcon.debug().open && document.querySelector('.ec-drawer'), null, { timeout: 12000 });
      await sleep(400);
      const r = await page.evaluate(key => { const st = window.__lab.stage, b = st.bins().find(x => x.key === key), a = st.pos('p'); return { stand: b && b.stand, p: [Math.round(a.x), Math.round(a.y)], d: window.DipLabEcon.debug() }; }, key);
      const m = await measure(page), [pok, ps] = panelOk(m, '箱子抽屜'), vis = await shown(page, hot.id);
      const at = r.stand && Math.abs(r.p[0] - r.stand[0]) <= 1 && Math.abs(r.p[1] - r.stand[1]) <= 1;
      record(22, size, r.d.kind === 'bin' && r.d.key === key && r.d.mode === 'buy' && at && pok && vis.ok, `真點 ${hot.id}（${hot.action}）→ 抽屜 ${r.d.kind}/${r.d.key}/${r.d.mode}；你在 [${r.p}]（stand ${r.stand}）；${ps}；${vis.why}`);
    });
    await T(23, async () => {
      if (!hot) throw new Error('#22 沒開成');
      const l0 = await nightLine(page), d0 = await page.evaluate(() => window.DipLabEcon.debug()), id = d0.ids[d0.idx];
      const price = await page.evaluate(id => window.DipLabEngine.priceOf(window.DipLabContent, id), id);
      await tapSel(page, '.ec-drawer [data-a=buy]'); await sleep(400);
      const mid = await page.evaluate(() => ({ money: window.__lab.run.money, bag: window.__lab.run.bag.length, ids: window.DipLabEcon.debug().ids }));
      const top = await page.evaluate(() => document.querySelector('.ec-drawer').getBoundingClientRect().top);
      await tapXY(page, w / 2, Math.max(60, top - 60));
      await page.waitForFunction(() => !window.DipLabEcon.isOpen() && !document.querySelector('.ec-drawer'), null, { timeout: 4000 });
      await sleep(900);
      const l1 = await nightLine(page), scr = await page.evaluate(() => window.__lab.screen());
      const ok = mid.money === l0.run.money - price && mid.bag === l0.run.bag + 1 && !mid.ids.includes(id) && scr === 'night' &&
        l1.money === '$' + mid.money.toLocaleString('en-US') && l1.bag === '包包' + mid.bag + '張' && l1.saved === mid.money;   // 包包條只寫張數（店主 11-16 包包不限張數）
      record(23, size, ok, `買 ${id}（$${price}）：$${l0.run.money} → $${mid.money}、包包 ${l0.run.bag} → ${mid.bag}；點外面關 → ${scr}：錢那一格「${l0.money}」→「${l1.money}」、「${l0.bag}」→「${l1.bag}」、存檔 $${l1.saved}`);
    });
    await T(24, async () => {
      await sleep(600);
      const ht = await tapHotWhere(page, h => h.id === 'counter' || h.action === 'counter');
      if (!ht) throw new Error('點不到櫃檯');
      await page.waitForFunction(() => window.DipLabEcon.debug().open && document.querySelector('.ec-drawer'), null, { timeout: 12000 });
      await sleep(400);
      const r = await page.evaluate(() => { const st = window.__lab.stage, a = st.pos('p'), s = st.spot('pay'); return { p: [Math.round(a.x), Math.round(a.y)], pay: s, d: window.DipLabEcon.debug(), n: document.querySelectorAll('.ec-drawer [data-a=rbuy]').length }; });
      const m = await measure(page), [pok, ps] = panelOk(m, '櫃檯'), vis = await shown(page, ht.id);
      const at = Math.abs(r.p[0] - r.pay[0]) <= 1 && Math.abs(r.p[1] - r.pay[1]) <= 1;
      await tapSel(page, '.ec-drawer [data-a=close]');
      const closed = await page.waitForFunction(() => !window.DipLabEcon.isOpen() && !document.querySelector('.ec-drawer'), null, { timeout: 4000 }).then(() => true, () => false);
      record(24, size, r.d.kind === 'relic' && r.d.mode === 'buy' && r.n >= 2 && r.n <= 3 && at && pok && vis.ok && closed, `真點 ${ht.id} → ${r.d.kind}（${r.n} 件）；你在 [${r.p}]（pay ${r.pay}）；${ps}；${vis.why}；✕ 關掉 ${closed}`);
    });
    await T(25, async () => {
      await sleep(900);
      const hs = await tapHotWhere(page, h => h.action === 'crate:sale');
      if (!hs) throw new Error('點不到特價箱');
      await page.waitForFunction(() => window.DipLabEcon.debug().open && document.querySelector('.ec-drawer'), null, { timeout: 12000 });
      await sleep(400);
      const d = await page.evaluate(() => window.DipLabEcon.debug()), lab = ((await page.locator('.ec-drawer [data-a=bbuy]').innerText().catch(() => '')) || '').replace(/\s+/g, '');
      const m = await measure(page), [pok, ps] = panelOk(m, '特價箱');
      await tapSel(page, '.ec-drawer [data-a=close]');
      const closed = await page.waitForFunction(() => !window.DipLabEcon.isOpen() && !document.querySelector('.ec-drawer'), null, { timeout: 4000 }).then(() => true, () => false);
      await sleep(600);
      const errs = page._errors.slice(), bad = page._badLocal.slice();
      record(25, size, d.kind === 'bargain' && d.mode === 'buy' && lab === '挑一到三張' && pok && closed && !errs.length && !bad.length,
        `真點特價箱 → ${d.kind}/${d.mode}「${lab}」；${ps}；✕ 關掉 ${closed}；主控台錯誤 ${errs.length}${errs.length ? '：' + errs.slice(0, 3).join(' / ') : ''}；本機 4xx ${bad.length}${bad.length ? '：' + bad.slice(0, 3).join(' / ') : ''}`);
    });
    await T(26, async () => {
      // 改版前的存檔：pop 有貨、三個新區沒有；爵士少一張（這一輪買走了，不能被補回來）
      await seedNight(page, 5000);
      const before = await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')), B = s.run.shop.bins;
        B.pop = (B.citypop || []).slice(); delete B.citypop; delete B.indierock; delete B.indiepop; B.jazz = B.jazz.slice(1);
        localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); return { jazz: B.jazz, rock: B.rock }; });
      await openTitleI(page);
      await jsClick(page, '[data-a=cont]');
      if (!(await waitScreen(page, 'night', 15000))) throw new Error('進不了來客');
      await sleep(1500);
      const r0 = await page.evaluate(() => { const b = window.__lab.run.shop.bins, C = window.DipLabContent;
        return { keys: Object.keys(b), want: Object.keys(C.bins).filter(k => !C.bins[k].display), jazz: b.jazz, rock: b.rock, ir: (b.indierock || []).length, ip: (b.indiepop || []).length, cp: (b.citypop || []).length }; });
      const ht = await tapHotWhere(page, h => h.id === 'bin:indierock');
      if (!ht) throw new Error('點不到 INDIE ROCK');
      await page.waitForFunction(() => window.DipLabEcon.debug().open && document.querySelector('.ec-drawer'), null, { timeout: 12000 });
      await sleep(400);
      const d = await page.evaluate(() => ({ dbg: window.DipLabEcon.debug(), empty: ((document.querySelector('.ec-empty') || {}).textContent || '').trim() }));
      await tapSel(page, '.ec-drawer [data-a=close]');
      await page.waitForFunction(() => !window.DipLabEcon.isOpen() && !document.querySelector('.ec-drawer'), null, { timeout: 4000 }).catch(() => {});
      const keysOk = !r0.keys.includes('pop') && JSON.stringify(r0.keys.slice().sort()) === JSON.stringify(r0.want.slice().sort());
      const same = JSON.stringify([r0.jazz, r0.rock]) === JSON.stringify([before.jazz, before.rock]);
      record(26, size, keysOk && same && r0.ir > 0 && r0.ip > 0 && r0.cp > 0 && d.dbg.kind === 'bin' && d.dbg.key === 'indierock' && d.dbg.ids.length === r0.ir && !d.empty,
        `載入後的區 ${r0.keys.length}（pop 丟掉 ${!r0.keys.includes('pop')}、跟 bins.js 一樣 ${keysOk}）；補貨 INDIE ROCK ${r0.ir}／INDIE POP ${r0.ip}／CITY POP ${r0.cp} 張；爵士、搖滾原樣 ${same}；真點 INDIE ROCK → 抽屜 ${d.dbg.kind}/${d.dbg.key} ${d.dbg.ids.length} 張${d.empty ? '「' + d.empty + '」' : ''}`);
    });
    await T(27, async () => {
      // rAF 取樣 id 的位置與朝向，直到 until() 成立後再多取 extraMs（看到站後有沒有轉、轉了有沒有又變回去）
      const sample = (ids, kick, extraMs, maxMs = 12000) => page.evaluate(([ids, kick, extraMs, maxMs]) => new Promise(res => {
        const st = window.__lab.stage, out = [], t0 = performance.now(); let doneAt = 0;
        const f = () => {
          const t = performance.now() - t0, o = { t };
          for (const id of ids) { const a = st.pos(id); o[id] = a ? { x: a.x, y: a.y, dir: a.dir } : null; }
          out.push(o);
          const moving = ids.some(id => { const a = st.shop.pos(id), b = out.length > 1 ? out[out.length - 2][id] : null; return a && b && Math.hypot(a.x - b.x, a.y - b.y) > 0.01; });
          if (!moving && t > 400 && !doneAt) doneAt = t;
          if (moving) doneAt = 0;
          if ((doneAt && t - doneAt > extraMs) || t > maxMs) return res(out);
          requestAnimationFrame(f);
        };
        requestAnimationFrame(f); (new Function(kick))();
      }), [ids, kick, extraMs, maxMs]);
      const last = (smp, id) => smp[smp.length - 1][id];
      // 停下來的那一刻（最後一次移動）之後：多久轉成最後的朝向、之後有沒有再變
      const settleInfo = (smp, id) => {
        let k = smp.length - 1; while (k > 0 && smp[k][id] && smp[k - 1][id] && Math.hypot(smp[k][id].x - smp[k - 1][id].x, smp[k][id].y - smp[k - 1][id].y) < 0.01) k--;
        const stopT = smp[k].t, endDir = last(smp, id).dir; let j = smp.length - 1; while (j > k && smp[j - 1][id].dir === endDir) j--;
        const backs = smp.slice(0, k + 1).filter((s, i) => i && s[id].dir === 'back' && s[id].y < smp[i - 1][id].y - 0.01).length;
        return { stopT, turnMs: Math.round(smp[j].t - stopT), endDir, backs, flips: smp.slice(k).filter((s, i, a) => i && s[id].dir !== a[i - 1][id].dir).length };
      };
      // (1) 打完客人：你在 duelP → 回來客
      await page.evaluate(() => { const st = window.__lab.stage; st.put('p', 'duelP'); });
      await sleep(300);
      const s1 = await sample(['p'], "window.__lab.go('night')", 1200);
      const i1 = settleInfo(s1, 'p'), p1 = last(s1, 'p');
      // (2) 第一位客人在 wait、你在 browse → 回來客：他走回門邊
      await page.evaluate(() => { const st = window.__lab.stage, r = window.__lab.run; r.shop.firstGuestInside = true; st.put('p', 'browse'); window.__lab.go('night'); });   // 先讓他照常進店（有造型）
      await sleep(1500);
      await page.evaluate(() => { window.__lab.stage.put('f', 'wait'); });
      await sleep(300);
      const hasF = await page.evaluate(() => window.__lab.run.idx === 0 && window.__lab.stage.has('f'));
      const s2 = await sample(['f'], "window.__lab.go('night')", 1200);
      const i2 = settleInfo(s2, 'f'), f2 = last(s2, 'f');
      // (3) 接連走：duelP → [202,288] → browse，兩段都往上；中間那站不閃正面
      await page.evaluate(() => { window.__lab.stage.put('p', 'duelP'); });
      await sleep(300);
      const s3 = await sample(['p'], "const st = window.__lab.stage; st.walk('p', [[202, 288]], 54).then(() => st.walk('p', ['browse'], 54));", 800);
      const firstBack = s3.findIndex(s => s.p.dir === 'back'), stop3 = settleInfo(s3, 'p');
      const flash = s3.filter((s, i) => i > firstBack && firstBack >= 0 && s.t < stop3.stopT - 1 && s.p.dir !== 'back').length;
      // (4) 試聽機 → 走到 listen：到了背面（之後一直背面）
      const s4 = await sample(['p'], "window.__lab.stageAction('listen')", 1000);
      const i4 = settleInfo(s4, 'p'), p4 = last(s4, 'p');
      await page.evaluate(() => { const x = document.querySelector('.lb-sheet.booth [data-a=close], .booth [data-a=close]'); if (x) x.click(); });
      await sleep(400);
      const L = await page.evaluate(() => ({ browse: window.__lab.stage.spot('browse'), atdoor: window.__lab.stage.spot('atdoor'), listen: window.__lab.stage.spot('listen') }));
      const at = (q, sp) => q && sp && Math.abs(q.x - sp[0]) <= 1 && Math.abs(q.y - sp[1]) <= 1;
      const ok1 = at(p1, L.browse) && i1.backs >= 2 && i1.endDir === 'front' && i1.turnMs <= 500 && i1.flips === 1;
      const ok2 = hasF && at(f2, L.atdoor) && i2.backs >= 1 && i2.endDir === 'front' && i2.turnMs <= 500 && i2.flips <= 1;
      const ok3 = firstBack >= 0 && flash === 0 && stop3.endDir === 'front';
      const ok4 = at(p4, L.listen) && i4.endDir === 'back' && i4.flips <= 1;
      record(27, size, ok1 && ok2 && ok3 && ok4,
        `duelP→回來客：到 browse ${at(p1, L.browse)}、途中背面 ${i1.backs} 格、停下後 ${i1.turnMs} ms 轉 ${i1.endDir}（之後換向 ${i1.flips} 次）；` +
        `門邊客人 wait→atdoor：有客人 ${hasF}、到了 ${at(f2, L.atdoor)}、途中背面 ${i2.backs} 格、${i2.turnMs} ms 轉 ${i2.endDir}；接連走兩段往上：中間閃正面 ${flash} 格、最後 ${stop3.endDir}；試聽桌：到了 ${at(p4, L.listen)}、${p4 && p4.dir}`);
    });
    await T(28, async () => {
      // 這一輪特價箱 6 張（restock＝新一輪的貨；特價箱已挑過），錢 $5,000
      await seedNight(page, 5000);
      await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')), E = window.DipLabEngine, C = window.DipLabContent;
        E.restock(s.run, C); s.run.shop.bargainPicked = true; s.run.money = 5000; localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); });
      await openTitleI(page);
      await jsClick(page, '[data-a=cont]');
      if (!(await waitScreen(page, 'night', 15000))) throw new Error('進不了來客');
      await sleep(1500);
      const ht = await tapHotWhere(page, h => h.id === 'radio');
      if (!ht) throw new Error('點不到收音機');
      await page.waitForSelector('.lb-sheet.radio .rd-cell', { timeout: 8000 });
      await page.waitForFunction(() => { const st = window.__lab.stage, a = st.pos('p'), sp = st.spot('radio'); return sp && Math.abs(a.x - sp[0]) <= 1 && Math.abs(a.y - sp[1]) <= 1; }, null, { timeout: 6000 }).catch(() => {});
      await sleep(300);
      const p0 = await page.evaluate(() => {
        const s = document.querySelector('.lb-sheet.radio'), r = s.getBoundingClientRect(), E = window.DipLabEngine, C = window.DipLabContent, run = window.__lab.run, st = window.__lab.stage, a = st.pos('p'), sp = st.spot ? st.spot('radio') : null;
        const cells = [...s.querySelectorAll('.rd-cell')].map(b => { const q = b.getBoundingClientRect(), dot = b.querySelector('i'); return { cell: b.dataset.cell, dis: b.disabled, h: Math.round(q.height), w: Math.round(q.width), dot: dot ? getComputedStyle(dot).backgroundColor : '', name: b.textContent.trim(), empty: !E.radioPool(run, C, b.dataset.cell).length }; });
        return { cells, top: r.top, bottom: r.bottom, vh: innerHeight, scrollH: s.scrollHeight, clientH: s.clientHeight, p: [Math.round(a.x), Math.round(a.y)], spot: sp, bargain: run.shop.bargain.length };
      });
      const want = await page.evaluate(() => window.DipLabContent.tunes.order.map(k => [k, window.DipLabContent.tunes.names[k]]));
      const cellsOk = p0.cells.length === 8 && p0.cells.every((c, k) => c.cell === want[k][0] && c.name === want[k][1] && c.h >= 44 && c.dot && c.dis === c.empty);
      const fit0 = p0.top >= 0 && p0.bottom <= p0.vh + 1 && p0.scrollH <= p0.clientH + 1;
      const at = p0.spot && Math.abs(p0.p[0] - p0.spot[0]) <= 1 && Math.abs(p0.p[1] - p0.spot[1]) <= 1;
      const pickCell = p0.cells.find(c => !c.dis);
      if (!pickCell) throw new Error('八格都抽不到');
      await tapSel(page, `.lb-sheet.radio .rd-cell[data-cell=${pickCell.cell}]`);
      await page.waitForSelector('.lb-sheet.radio .rd-got', { timeout: 4000 });
      await sleep(500);
      const g = await page.evaluate(() => { const run = window.__lab.run, s = document.querySelector('.lb-sheet.radio'), r = s.getBoundingClientRect();
        return { radio: run.shop.radio, first: run.shop.bargain[0], n: run.shop.bargain.length, got: (s.querySelector('.rd-got b') || {}).textContent || '', gotId: (s.querySelector('.rd-got [data-cid]') || { dataset: {} }).dataset.cid,
          dis: [...s.querySelectorAll('.rd-cell')].every(b => b.disabled), on: (s.querySelector('.rd-cell.on') || { dataset: {} }).dataset.cell, bottom: r.bottom, vh: innerHeight, scrollH: s.scrollHeight, clientH: s.clientHeight }; });
      const album = await page.evaluate(id => (window.DipLabContent.cards[id] || {}).album, g.radio && g.radio.id);
      const spun = g.radio && g.radio.cell === pickCell.cell && g.first === g.radio.id && g.n === p0.bargain + 1 && g.gotId === g.radio.id && g.got.includes(album) && g.dis && g.on === pickCell.cell && g.bottom <= g.vh + 1 && g.scrollH <= g.clientH + 1;
      await tapSel(page, '.lb-sheet.radio [data-a=toBargain]');
      await skipWalk(page).catch(() => {});
      await page.waitForFunction(() => window.DipLabEcon.debug().open && document.querySelector('.ec-drawer .ec-grid'), null, { timeout: 12000 });
      await sleep(500);
      const b = await page.evaluate(() => { const E = window.DipLabEngine, C = window.DipLabContent, run = window.__lab.run, grid = document.querySelector('.ec-drawer .ec-grid'), tiles = [...grid.querySelectorAll('.ec-tile')];
        const t0 = tiles[0], tag = t0 && t0.querySelector('.ec-radio'), dot = tag && tag.querySelector('i');
        return { n: tiles.length, g4: grid.classList.contains('ec-g4'), id0: t0 && t0.dataset.cid, radio0: t0 && t0.dataset.radio === '1', others: tiles.slice(1).filter(t => t.querySelector('.ec-radio')).length,
          tag: tag ? tag.textContent.trim() : '', dot: dot ? getComputedStyle(dot).backgroundColor : '', price0: +(t0 && t0.dataset.price), want: E.priceOf(C, run.shop.radio.id), sale: E.bargainPriceOf(C, run.shop.radio.id),
          pt: ((t0 && t0.querySelector('.ec-pt')) || {}).textContent || '', mt: E.moneyText(E.priceOf(C, run.shop.radio.id)), money: run.money };
      });
      const m = await measure(page), [pok, ps] = panelOk(m, '特價箱（電台那張）');
      const gridOk = b.n === 7 && b.g4 && b.id0 === g.radio.id && b.radio0 && !b.others && b.tag === '電台' && b.dot && b.price0 === b.want && b.want >= 800 && b.pt.includes(b.mt);
      // 買電台那張：錢扣原價
      await tapSel(page, `.ec-drawer .ec-tile[data-cid="${b.id0}"]`); await sleep(250);
      // 選起來的勾（右上）不被電台籤（左上）蓋住：勾的中心點最上面就是勾；兩塊不重疊（375×548 四欄封面 47 px → 電台籤只留色點）
      const ck = await page.evaluate(id => { const t = document.querySelector(`.ec-drawer .ec-tile[data-cid="${id}"]`), k = t && t.querySelector('.ec-chk'), g = t && t.querySelector('.ec-radio');
        if (!k || !g) return { ok: false, why: '沒有勾或電台籤' };
        const a = k.getBoundingClientRect(), b = g.getBoundingClientRect(), top = document.elementFromPoint(a.left + a.width / 2, a.top + a.height / 2), word = g.querySelector('b');
        return { ok: true, top: !!top && (top === k || k.contains(top)), gap: Math.round(a.left - b.right), tag: Math.round(b.width), tile: Math.round(t.querySelector('.ec-tcv').getBoundingClientRect().width), word: !!word && getComputedStyle(word).display !== 'none' };
      }, b.id0);
      const ckOk = ck.ok && ck.top && ck.gap >= 0;
      await tapSel(page, '.ec-drawer [data-a=bbuy]'); await sleep(500);
      const bought = await page.evaluate(id => ({ money: window.__lab.run.money, has: window.__lab.run.bag.includes(id) }), b.id0);
      await tapSel(page, '.ec-drawer [data-a=close]');
      await page.waitForFunction(() => !window.DipLabEcon.isOpen() && !document.querySelector('.ec-drawer'), null, { timeout: 4000 }).catch(() => {});
      await sleep(900);
      // 再點收音機：這一輪已經轉過了、八格都停用
      const ht2 = await tapHotWhere(page, h => h.id === 'radio');
      await page.waitForSelector('.lb-sheet.radio .rd-cell', { timeout: 8000 }).catch(() => {});
      await sleep(500);
      const u = await page.evaluate(() => { const s = document.querySelector('.lb-sheet.radio'), R = window.DipLabContent.radio;
        return s ? { sub: (s.querySelector('p.sub') || {}).textContent || '', dis: [...s.querySelectorAll('.rd-cell')].every(b => b.disabled), toB: !!s.querySelector('[data-a=toBargain]'),
          gone: ((s.querySelector('.rd-gone') || {}).textContent || '').trim(), want: R.bagged, price: R.price } : null; });
      await jsClick(page, '.lb-sheet.radio [data-a=close]');
      // 電台那張買走了：不再出「去特價箱看看」、改寫「已經收進包包了。」，也不寫「電台那張照原價。」
      const usedOk = !!ht2 && u && u.sub.startsWith('這一輪已經轉過了') && u.dis && !u.toB && u.gone === u.want && !u.sub.includes(u.price);
      const errs = page._errors.slice();
      record(28, size, cellsOk && fit0 && at && spun && gridOk && pok && bought.has && bought.money === b.money - b.want && ckOk && usedOk && !errs.length,
        `真點 ${ht.id} → 你在 [${p0.p}]（radio ${JSON.stringify(p0.spot)}）；八格 ${p0.cells.map(c => c.name + (c.dis ? '×' : '')).join(' ')}（格高 ${Math.min(...p0.cells.map(c => c.h))}）；面板在畫面裡 ${fit0}；` +
        `轉 ${pickCell.cell} → ${g.radio && g.radio.id}（特價箱 ${p0.bargain}→${g.n} 張、第一格 ${g.first === (g.radio && g.radio.id)}、面板「${g.got}」）；` +
        `特價箱 ${b.n} 張 四欄 ${b.g4}、第一格「${b.tag}」色點 ${b.dot}、價 $${b.price0}（原價 $${b.want}，特價會是 $${b.sale}）；${ps}；選取勾在最上面 ${ck.top}（封面 ${ck.tile}px、電台籤 ${ck.tag}px${ck.word ? '「電台」' : ' 只留色點'}、跟勾隔 ${ck.gap}px）；買 → $${b.money} → $${bought.money}；再點收音機「${u && u.sub}」八格停用 ${u && u.dis}、去特價箱鈕 ${u && u.toB}、「${u && u.gone}」；主控台錯誤 ${errs.length}${errs.length ? '：' + errs.slice(0, 3).join(' / ') : ''}`);
    });
    // ---------------- 29：包包面板（包包不限張數，店主 11-16）：24 張、捲動、賣回 ----------------
    await T(29, async () => {
      page._errors.length = 0;
      await seedNight(page, 3000, 24);
      await openTitleI(page);
      await jsClick(page, '[data-a=cont]');
      if (!(await waitScreen(page, 'night', 15000))) throw new Error('進不了來客');
      await sleep(1500);
      const l0 = await nightLine(page);
      await tapSel(page, '.lb-bagline [data-a=bag]');
      await page.waitForSelector('.lb-sheet.float.bag', { timeout: 5000 }); await sleep(700);
      const P = () => page.evaluate(() => {
        const s = document.querySelector('.lb-sheet.float.bag'); if (!s) return null;
        const r = s.getBoundingClientRect(), C = window.DipLabContent, E = window.DipLabEngine, R = window.__lab.run;
        const tiles = [...s.querySelectorAll('.lb-ct')];
        const gifts = tiles.filter(t => E.isGift(R, C, t.dataset.cid) && t.dataset.cid !== C.aces[R.ace]);
        const sells = [...s.querySelectorAll('[data-pick]')].map(b => { const q = b.getBoundingClientRect(); return { id: b.getAttribute('data-pick'), t: b.textContent, h: q.height, w: q.width, dis: b.disabled,
          want: '賣 $' + E.moneyText(E.sellValue(C, C.cards[b.getAttribute('data-pick')])) }; });
        const hd = s.querySelector('.hd').getBoundingClientRect(), h3 = s.querySelector('.hd h3'), hb = h3.getBoundingClientRect(), hit = document.elementFromPoint(hb.left + 4, hb.top + hb.height / 2);
        return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, vw: innerWidth, vh: innerHeight, docW: document.documentElement.scrollWidth, sh: s.scrollHeight, ch: s.clientHeight, st: s.scrollTop,
          h3: h3.textContent, money: ((s.querySelector('.bgmoney') || {}).textContent || '').trim(), note: ((s.querySelector('.bgnote') || {}).textContent || ''), warn: !!s.querySelector('.bgnote.warn'),
          n: tiles.length, gifts: gifts.map(t => [!!t.querySelector('[data-pick]'), (t.querySelector('.sdtag') || {}).textContent || '']), sells,
          hdTop: hd.top, hdOk: !!hit && h3.contains(hit), ask: ((s.querySelector('.foot .ask') || {}).textContent || ''), bag: R.bag.length, runMoney: R.money };
      });
      const p0 = await P();
      const U = await page.evaluate(() => window.DipLabContent.shopUi);
      const ok0 = l0.bag === '包包24張' && p0 && p0.h3 === '包包 24 張' && p0.money === '$3,000' && p0.n === 25 && p0.top >= 0 && p0.bottom <= p0.vh + 1 && p0.left >= -1 && p0.right <= p0.vw + 1 && p0.docW <= p0.vw &&
        p0.note === U.bagSellNote && p0.gifts.length === 4 && p0.gifts.every(g => !g[0] && g[1] === U.giftTag) && p0.sells.length === 20 &&
        p0.sells.every(b => b.t === b.want && b.h >= 36 - 0.5 && b.w >= 44 - 0.5 && !b.dis);
      // 捲到底：標題列還在最上面、最後一張的「賣」鈕點得到
      await page.evaluate(() => { const s = document.querySelector('.lb-sheet.float.bag'); s.scrollTop = s.scrollHeight; }); await sleep(300);
      const p1 = await P();
      const last = p1.sells[p1.sells.length - 1];
      const lastIn = await page.evaluate(id => { const s = document.querySelector('.lb-sheet.float.bag'), b = s.querySelector(`[data-pick="${id}"]`), a = s.getBoundingClientRect(), q = b.getBoundingClientRect(); return q.top >= a.top && q.bottom <= a.bottom; }, last.id);
      await tapSel(page, `.lb-sheet.float.bag [data-pick="${last.id}"]`); await sleep(500);
      const p2 = await P();
      const album = await page.evaluate(id => window.DipLabContent.cards[id].album, last.id);
      const fv = await page.evaluate(id => { const s = document.querySelector('.lb-sheet.float.bag'), f = s.querySelector('.foot'), t = [...s.querySelectorAll('.lb-ct')].find(x => x.dataset.cid === id);
        const fr = f.getBoundingClientRect(), tr = t.getBoundingClientRect(), bs = [...f.querySelectorAll('button')].map(b => { const q = b.getBoundingClientRect(); return { a: b.dataset.a, t: b.textContent, h: q.height }; });
        return { tileBottom: tr.bottom, footTop: fr.top, footBottom: fr.bottom, bs, sel: t.classList.contains('sel') }; }, last.id);
      const v = await page.evaluate(id => window.DipLabEngine.sellValue(window.DipLabContent, window.DipLabContent.cards[id]), last.id);
      const mtv = await page.evaluate(v => window.DipLabEngine.moneyText(v), v);
      const okAsk = p1.hdOk && p1.hdTop >= p1.top - 1 && (p0.sh <= p0.ch + 1 || p1.st > 0) && lastIn   // 放不下就自己捲（430×932 這類高螢幕 24 張差不多放得下） && p2.ask === '賣掉《' + album + '》？' && fv.sel && fv.tileBottom <= fv.footTop + 1 && fv.footBottom <= p2.vh + 1 &&
        fv.bs.length === 2 && fv.bs.every(b => b.h >= 44 - 0.5) && fv.bs[1].t === '賣掉 +$' + mtv && p2.bag === 24;
      await tapSel(page, '.lb-sheet.float.bag [data-a=sgo]'); await sleep(600);
      const p3 = await P(), l3 = await nightLine(page), toasts = await page.evaluate(() => [...document.querySelectorAll('.lb-toast')].map(t => t.textContent));
      const okSold = p3.bag === 23 && p3.runMoney === 3000 + v && p3.h3 === '包包 23 張' && l3.bag === '包包23張' && l3.money === '$' + (3000 + v).toLocaleString('en-US') && !p3.ask &&
        toasts.includes('《' + album + '》賣掉，+$' + mtv) && l3.saved === 3000 + v && !p3.sells.some(b => b.id === last.id);
      // 包包剩 6 張 → 賣一張 → 5 張：「賣」鈕全停用、說明那行變紅；引擎再賣 → bagMin
      await page.evaluate(() => { const R = window.__lab.run, C = window.DipLabContent, E = window.DipLabEngine; const g = R.bag.filter(id => E.isGift(R, C, id)), o = R.bag.filter(id => !E.isGift(R, C, id)); R.bag.splice(0, R.bag.length, ...g, ...o.slice(0, 2)); });
      await tapSel(page, '.lb-sheet.float.bag [data-a=close]'); await sleep(300);
      await tapSel(page, '.lb-bagline [data-a=bag]'); await page.waitForSelector('.lb-sheet.float.bag', { timeout: 5000 }); await sleep(700);
      const p4 = await P();
      await tapSel(page, `.lb-sheet.float.bag [data-pick="${p4.sells[0].id}"]`); await sleep(400);
      await tapSel(page, '.lb-sheet.float.bag [data-a=sgo]'); await sleep(600);
      const p5 = await P();
      const eng = await page.evaluate(() => { const R = window.__lab.run, C = window.DipLabContent, E = window.DipLabEngine, id = R.bag.find(x => !E.isGift(R, C, x)); return E.choose(JSON.parse(JSON.stringify(R)), C, { type: 'sell', cardId: id }).error; });
      const minTxt = U.bagSellMin.replace('{n}', 5);
      const okMin = p4.bag === 6 && p4.sells.length === 2 && p4.sells.every(b => !b.dis) && !p4.warn && p5.bag === 5 && p5.sells.length === 1 && p5.sells.every(b => b.dis) && p5.warn && p5.note === minTxt && minTxt === '包包至少留 5 張，手牌才補得滿。' && eng === 'bagMin';
      await tapSel(page, '.lb-sheet.float.bag [data-a=close]'); await sleep(300);
      const errs = page._errors.slice();
      record(29, size, ok0 && okAsk && okSold && okMin && !errs.length,
        `包包條「${l0.bag}」→ 面板「${p0.h3}」${p0.money}、${p0.n} 格（王牌＋24）、在畫面裡 ${p0.top >= 0 && p0.bottom <= p0.vh + 1}（${Math.round(p0.top)}–${Math.round(p0.bottom)}/${p0.vh}）、橫向 ${p0.docW}/${p0.vw}、自己捲 ${p0.sh}/${p0.ch}；` +
        `送的 ${p0.gifts.length} 張 ${JSON.stringify(p0.gifts[0])}、能賣 ${p0.sells.length} 張（「${p0.sells[0] && p0.sells[0].t}」高 ${p0.sells[0] && Math.round(p0.sells[0].h)}）；捲到 ${p1.st}：標題列還在 ${p1.hdOk}、最後一張的鈕看得到 ${lastIn} → 「${p2.ask}」（那張沒被蓋到 ${fv.tileBottom <= fv.footTop + 1}、鈕 ${fv.bs.map(b => b.t + ' ' + Math.round(b.h)).join('／')}）→ ` +
        `賣：$3,000 → $${p3.runMoney}、包包 ${p3.bag}、「${p3.h3}」、包包條「${l3.bag}」${l3.money}、存檔 $${l3.saved}、吐司 ${JSON.stringify(toasts.slice(-1))}；` +
        `6 張賣一張 → ${p5.bag} 張：鈕停用 ${p5.sells.every(b => b.dis)}、「${p5.note}」紅 ${p5.warn}、引擎 ${eng}；主控台錯誤 ${errs.length}${errs.length ? '：' + errs.slice(0, 3).join(' / ') : ''}`);
    });
    return true;
  } finally {
    await ctx.close();
  }
}

const browser = await launch();
try {
  for (const [w, h] of SIZES) await runSize(browser, w, h);
  if (process.env.ECON_INDEX !== '0') {
    for (const [w, h] of SIZES) {
      if (!(await runIndex(browser, w, h))) { console.log(`SKIP  index.html（${IURL}）還沒接上經濟介面（沒有 econ.js 或 __lab）：#21–#26 等整合後再跑`); break; }
    }
  }
} finally {
  await browser.close();
}
const fail = results.filter(r => !r.ok);
console.log(`\n${results.length - fail.length}/${results.length} PASS` + (fail.length ? `；FAIL：${fail.map(r => '#' + r.n + ' ' + r.size).join(', ')}` : ''));
process.exit(fail.length ? 1 : 0);
