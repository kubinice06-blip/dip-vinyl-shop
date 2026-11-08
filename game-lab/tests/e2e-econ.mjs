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
//   6  買（錢夠、包包沒滿）→ 錢減價格、包包 +1、那張從抽屜消失、吐司「進包包」
//   7  包包滿 → 先賣一張：賣回子面板（半價）→ 選一張 →「賣這張」→ 錢＝原本＋半價－價格、包包仍 8、賣掉那張不在、買的那張在
//   8  錢不夠、賣一張也不夠 → 鈕停用（「錢不夠」）
//   9  櫃檯配件：走到櫃檯前、買一件（錢減、配件 +1）；滿 3 件 → 先賣一件（半價）再買
//   10 特價箱開局模式（舞台上真點特價箱）：6 張、恰好挑 3 張「收下這三張」才能按（第 4 張換掉最早挑的那張）；長按封面＝唱片資訊；點外面不會關；收下 → 包包 +3、bargainPicked
//   11 特價箱之後模式：挑 1 張 → $100 → 錢 −100、包包 +1；包包滿時先賣（需要幾張就賣幾張）
//   12 序章、對決中點箱子 → 老闆說「打完再翻。」、不開抽屜
//   13 沒有 run（標題）：抽屜只能翻、沒有買的鈕
//   15 包包沒滿、錢不夠但賣一張就夠（SPEC §2.5.6 第 3 點）：鈕可按（「買 $400／先賣一張」）→ 子面板「錢不夠：先賣一張」、賣了也不夠的那張不給選 → 賣一張買到、包包張數不變；
//      櫃檯配件同理（「先賣一件」，配件沒滿 3 件）
//   14 所有面板（箱子、賣回、特價兩種、櫃檯、配件賣回、錢不夠先賣）不捲出畫面、鈕 ≥44 高；主控台 0 錯誤（最後跑）
// 每一項印 PASS／FAIL；任何 FAIL → exit 1。
import { launch, newPage, SIZES, record, results, sleep } from './e2e-lib.mjs';

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
    const st = window.H.stage, hb = st.host.getBoundingClientRect(), q = st.shop.hotPoints().find(x => x.id === id);
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
    const btns = [...el.querySelectorAll('button')].filter(b => b.offsetParent).map(b => { const q = b.getBoundingClientRect(); return { a: b.dataset.a || b.className, w: Math.round(q.width), h: Math.round(q.height), top: q.top, bottom: q.bottom, left: q.left, right: q.right }; });
    return { top: r.top, bottom: r.bottom, h: r.height, appH: ar.height, appTop: ar.top, scrollH: el.scrollHeight, clientH: el.clientHeight, vw: innerWidth, vh: innerHeight, left: r.left, right: r.right, btns };
  });
}
// 那一箱（或櫃檯）整個在舞台的鏡頭裡、而且在抽屜上緣之上（沒被抽屜蓋到）；等鏡頭推完
async function shown(page, hotId) {
  await sleep(450);
  return page.evaluate(id => {
    const st = window.H.stage, v = st.view(), hot = st.hotspots().find(x => x.id === id), el = document.querySelector('.ec-drawer');
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
      await reset(page, { mode: 'night', money: 800, bag: 5, relics: 2 });
      await openAndWait(page, 'bin:hiphop');
      const r0 = await run(page), d0 = await dbg(page);
      const id = d0.ids[d0.idx];
      const price = await page.evaluate(id => window.DipLabEngine.priceOf(window.DipLabContent, id), id);
      const lab = await page.locator('.ec-drawer [data-a=buy]').innerText();
      await tapSel(page, '.ec-drawer [data-a=buy]'); await sleep(350);
      const r1 = await run(page), d1 = await dbg(page), toasts = await page.evaluate(() => window.H.toasts.slice());
      const ok = r1.money === r0.money - price && r1.bag.length === r0.bag.length + 1 && r1.bag.includes(id) && !d1.ids.includes(id) && d1.ids.length === d0.ids.length - 1 && /進包包/.test(toasts.join()) && lab.replace(/\s/g, '') === ('買$' + price);
      record(6, size, ok, `「${lab.replace(/\s+/g, ' ')}」：$${r0.money} → $${r1.money}（價 ${price}）；包包 ${r0.bag.length} → ${r1.bag.length}；抽屜 ${d0.ids.length} → ${d1.ids.length} 張；吐司「${toasts.slice(-1)[0]}」`);
      panels.push(['箱子（買完）', await measure(page)]);
    });
    // ---------------- 7：包包滿 → 先賣一張 ----------------
    await T(7, async () => {
      await reset(page, { mode: 'night', money: 800, bag: 8, relics: 2 });
      await openAndWait(page, 'bin:hiphop');
      const r0 = await run(page), d0 = await dbg(page), id = d0.ids[d0.idx];
      const price = await page.evaluate(id => window.DipLabEngine.priceOf(window.DipLabContent, id), id);
      await tapSel(page, '.ec-drawer [data-a=buy]'); await sleep(300);
      const ds = await dbg(page), msg = await page.locator('.ec-drawer .ec-msg').innerText();
      panels.push(['賣回（唱片）', await measure(page)]);
      const vis7 = await shown(page, 'bin:hiphop');
      const sellDis0 = await page.locator('.ec-drawer [data-a=sell]').isDisabled();
      const sellId = r0.bag[2];
      const sv = await page.evaluate(id => window.DipLabEngine.sellValue(window.DipLabContent, window.DipLabContent.cards[id]), sellId);
      await tapSel(page, `.ec-drawer .ec-spick[data-cid="${sellId}"]`); await sleep(200);
      const sellDis1 = await page.locator('.ec-drawer [data-a=sell]').isDisabled();
      const pv = await page.evaluate(id => window.DipLabEngine.priceOf(window.DipLabContent, id), sellId);
      await tapSel(page, '.ec-drawer [data-a=sell]'); await sleep(350);
      const r1 = await run(page), d1 = await dbg(page), toasts = await page.evaluate(() => window.H.toasts.slice());
      const ok = vis7.ok && ds.sub && ds.sub.kind === 'card' && ds.sub.need === 1 && /包包滿了/.test(msg) && sellDis0 && !sellDis1 && sv === Math.floor(pv / 2) &&
        r1.money === r0.money + sv - price && r1.bag.length === 8 && !r1.bag.includes(sellId) && r1.bag.includes(id) && !d1.ids.includes(id) && !d1.sub && /賣掉/.test(toasts.slice(-1)[0] || '');
      record(7, size, ok, `子面板「${msg}」（箱子沒被蓋到 ${vis7.ok}${vis7.ok ? '' : '：' + vis7.why}）；沒選時鈕停用 ${sellDis0}、選了 ${!sellDis1}；賣 ${sellId}（${pv} 的半價 ${sv}）；$${r0.money} → $${r1.money}（＋${sv}－${price}）；包包 ${r1.bag.length}；吐司「${toasts.slice(-1)[0]}」`);
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
      await reset(page, { mode: 'night', money: 2500, bag: 5, relics: 2 });
      await page.evaluate(() => { window.H.open('relic'); }); await sleep(150); await skipWalk(page); await waitOpen(page);
      const pos = await page.evaluate(() => { const a = window.H.stage.pos('p'), s = window.H.stage.spot('pay'); return [Math.round(a.x), Math.round(a.y), s]; });
      panels.push(['櫃檯', await measure(page)]);
      const vis9 = await shown(page, 'counter');
      const r0 = await run(page), rid = r0.shop.relics[0];
      const price = await page.evaluate(id => window.DipLabEngine.relicPrice(window.DipLabContent, id), rid);
      await tapSel(page, `.ec-drawer [data-a=rbuy][data-r="${rid}"]`); await sleep(300);
      const r1 = await run(page);
      const ok1 = r1.money === r0.money - price && r1.relics.length === 3 && r1.relics.includes(rid) && !r1.shop.relics.includes(rid);
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
      const priceShown = await page.evaluate(() => /\$/.test(document.querySelector('.ec-drawer').innerText));
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
      const ok = vis10.ok && ids.length === 6 && !priceShown && dis.join() === 'true,true,true,false' && disOff && JSON.stringify(sel4) === JSON.stringify(want) && lpOk && still && closed && r1.bag.length === r0.bag.length + 3 &&
        want.every(id => r1.bag.includes(id)) && r1.shop.bargainPicked && r1.shop.bargain.length === 3;
      record(10, size, ok, `特價箱沒被蓋到 ${vis10.ok}${vis10.ok ? '' : '（' + vis10.why + '）'}；${ids.length} 張、沒有價格 ${!priceShown}；挑 0/1/2/3 張時鈕停用 ${dis.join('/')}；取消一張又停用 ${disOff}；第 4 張換掉最早那張 ${JSON.stringify(sel4) === JSON.stringify(want)}；長按＝唱片資訊（有補送 click ${lp1.open}、沒有 ${lp2.open}，不會選到 ${JSON.stringify(lp2.sel) === JSON.stringify(want)}）；點外面不關 ${still}；收下 → 包包 ${r0.bag.length} → ${r1.bag.length}、特價剩 ${r1.shop.bargain.length}`);
    });
    // ---------------- 11：特價箱之後模式 ----------------
    await T(11, async () => {
      await reset(page, { mode: 'night', money: 800, bag: 5, relics: 2 });
      await openAndWait(page, 'bargain');
      panels.push(['特價（$100）', await measure(page)]);
      const d0 = await dbg(page), r0 = await run(page), buy = page.locator('.ec-drawer [data-a=bbuy]');
      const dis0 = await buy.isDisabled(), lab = (await buy.innerText()).replace(/\s+/g, '');
      await tapSel(page, `.ec-drawer .ec-tile[data-cid="${d0.ids[0]}"]`); await sleep(150);
      const dis1 = await buy.isDisabled();
      await tapSel(page, '.ec-drawer [data-a=bbuy]'); await sleep(350);
      const r1 = await run(page), d1 = await dbg(page);
      const ok1 = dis0 && !dis1 && lab === '$100：最多挑三張' && r1.money === r0.money - 100 && r1.bag.length === r0.bag.length + 1 && r1.bag.includes(d0.ids[0]) && !d1.ids.includes(d0.ids[0]);
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(250);
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(250);
      // 包包滿 8：挑 2 張 → 要先賣 2 張
      await reset(page, { mode: 'night', money: 50, bag: 8, relics: 2 });
      await openAndWait(page, 'bargain');
      const e0 = await dbg(page), q0 = await run(page);
      for (const id of e0.ids.slice(0, 2)) { await tapSel(page, `.ec-drawer .ec-tile[data-cid="${id}"]`); await sleep(120); }
      await tapSel(page, '.ec-drawer [data-a=bbuy]'); await sleep(250);
      const es = await dbg(page), msg = await page.locator('.ec-drawer .ec-msg').innerText();
      for (const id of q0.bag.slice(0, 2)) { await tapSel(page, `.ec-drawer .ec-spick[data-cid="${id}"]`); await sleep(120); }
      const sv = await page.evaluate(ids => ids.reduce((s, id) => s + window.DipLabEngine.sellValue(window.DipLabContent, window.DipLabContent.cards[id]), 0), q0.bag.slice(0, 2));
      await tapSel(page, '.ec-drawer [data-a=sell]'); await sleep(350);
      const q1 = await run(page);
      const ok3 = es.sub && es.sub.need === 2 && /先賣 2 張/.test(msg) && q1.bag.length === 8 && q1.money === q0.money + sv - 100 && e0.ids.slice(0, 2).every(id => q1.bag.includes(id)) && q0.bag.slice(0, 2).every(id => !q1.bag.includes(id));
      record(11, size, ok1 && ok3, `「${lab}」沒挑停用 ${dis0}、挑 1 張可按 ${!dis1}；$${r0.money} → $${r1.money}、包包 ${r0.bag.length} → ${r1.bag.length}；包包滿挑 2 張 →「${msg}」→ 賣 2 張（+${sv}）：$${q0.money} → $${q1.money}、包包 ${q1.bag.length}`);
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
        const price = E.priceOf(C, id), sv = r.bag.map(b => [b, E.sellValue(C, C.cards[b])]), max = Math.max(...sv.map(x => x[1]));
        r.money = Math.max(0, price - max);
        return { id, price, sv, max, money: r.money };
      });
      await openAndWait(page, 'bin:hiphop');
      const r0 = await run(page), d0 = await dbg(page), b = page.locator('.ec-drawer [data-a=buy]');
      const dis = await b.isDisabled(), txt = (await b.innerText()).replace(/\s+/g, '');
      await tapSel(page, '.ec-drawer [data-a=buy]'); await sleep(300);
      const ds = await dbg(page), msg = await page.locator('.ec-drawer .ec-msg').innerText();
      panels.push(['錢不夠先賣（唱片）', await measure(page)]);
      const vis = await shown(page, 'bin:hiphop');
      const tiles = await page.evaluate(() => [...document.querySelectorAll('.ec-drawer .ec-spick')].map(t => [t.dataset.cid, t.disabled]));
      const want = setup.sv.map(([id, v]) => [id, setup.money + v < setup.price]);
      const sell = setup.sv.find(x => x[1] === setup.max)[0];
      await tapSel(page, `.ec-drawer .ec-spick[data-cid="${sell}"]`); await sleep(200);
      await tapSel(page, '.ec-drawer [data-a=sell]'); await sleep(350);
      const r1 = await run(page), d1 = await dbg(page), toasts = await page.evaluate(() => window.H.toasts.slice());
      const okCard = d0.ids[d0.idx] === setup.id && setup.money < setup.price && !dis && txt === '買$' + setup.price + '先賣一張' && ds.sub && ds.sub.kind === 'card' && ds.sub.why === 'money' && ds.sub.need === 1 &&
        /^錢不夠：先賣一張/.test(msg) && JSON.stringify(tiles) === JSON.stringify(want) && vis.ok &&
        r1.money === setup.money + setup.max - setup.price && r1.bag.length === r0.bag.length && !r1.bag.includes(sell) && r1.bag.includes(setup.id) && !d1.ids.includes(setup.id) && !d1.sub && /賣掉/.test(toasts.slice(-1)[0] || '');
      const sCard = `$${setup.money}、《${setup.id}》$${setup.price}：鈕「${txt}」可按 ${!dis}；子面板「${msg}」（箱子沒被蓋到 ${vis.ok}）；不給選 ${tiles.filter(t => t[1]).length}/${tiles.length} 張（照賣回價算 ${JSON.stringify(tiles) === JSON.stringify(want)}）；賣 ${sell}（+${setup.max}）→ $${r1.money}、包包 ${r0.bag.length} → ${r1.bag.length}`;
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
      const okRelic = rs.money < rs.price && !rdis && rtxt === '買$' + rs.price + '先賣一件' && rds.sub && rds.sub.kind === 'relic' && rds.sub.why === 'money' && /^錢不夠：先賣一件/.test(rmsg) &&
        q1.relics.length === 2 && !q1.relics.includes(rsell) && q1.relics.includes(rs.rid) && q1.money === rs.money + rs.max - rs.price;
      const sRelic = `配件 $${rs.money}、「${rs.rid}」$${rs.price}：鈕「${rtxt}」可按 ${!rdis}；「${rmsg}」；賣 ${rsell}（+${rs.max}）→ $${q1.money}、配件 ${q1.relics.join(',')}`;
      record(15, size, okCard && okRelic, sCard + '；' + sRelic);
      await page.evaluate(() => window.DipLabEcon.close()); await sleep(300);
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

const browser = await launch();
try {
  for (const [w, h] of SIZES) await runSize(browser, w, h);
} finally {
  await browser.close();
}
const fail = results.filter(r => !r.ok);
console.log(`\n${results.length - fail.length}/${results.length} PASS` + (fail.length ? `；FAIL：${fail.map(r => '#' + r.n + ' ' + r.size).join(', ')}` : ''));
process.exit(fail.length ? 1 : 0);
