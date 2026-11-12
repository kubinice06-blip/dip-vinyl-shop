// game-lab/tests/e2e-taps.mjs：店內真點測試（SPEC-v4 §5.5 第一項；R-x0 第六項「唱片櫃點不到」的驗收）。A3。
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   node game-lab/tests/e2e-taps.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_URL 或 LAB_BASE、LAB_SIZES（預設四個驗收尺寸）；LAB_SCREENS＝title（預設）或 title,night（來客：seedRun 一份 v5 存檔、標題「繼續試煉」進去；C 整合後加跑）
//
// 每個尺寸、每個畫面（全開）：
//   1. __lab.stage.shop.hotPoints() 的每一點用 page.touchscreen.tap 真點；__lab.stage.onAction 先換成只記 hot.id 的函式（不開面板），觸發的 id＝自己；
//   2. 每箱沿可見帶再點左、中、右 3 點，都觸發自己；
//   3. x=118、162 從 y=200 到 212（美術格）每 2 格點一次：落在中島最後一排（isl-3a／isl-3b 的 bin，FIXLIST 4 起＝世界／民謠）可見區的點不得觸發前排 bin:jazz／bin:tw；
//   4. 每個有外框的站立家具（植物、凳子、矮櫃、高櫃、唱盤台、箱子、櫃檯、試聽桌）可見區中心：觸發它自己的熱點或什麼都沒有，不能觸發別人；
//   5. 按下 50 ms 時畫面上已經有金色描框（截圖數金色像素）；放開後 300 ms 內出現名牌，箱子的名牌字＝bin.label；
//   另外：網址帶 ?strict=1（走不到就丟錯）；主控台 0 錯誤；橫條鏡頭裡男子／你說話時泡泡不碰老闆頭部（老闆 x±16 格，SPEC-v4 §2.3.7）。
// 每一項印 PASS／FAIL；任何 FAIL → exit 1。
import { launch, newPage, openTitle, Q, SIZES, record, results, sleep, seedRun, jsClick } from './e2e-lib.mjs';

const SCREENS = (process.env.LAB_SCREENS || 'title').split(',').filter(Boolean);
const GOLD = [255, 207, 58];   // shop.js 按下描框的顏色 #ffcf3a

async function install(page) {
  return page.evaluate(() => {
    const st = window.__lab.stage;
    window.__taps = [];
    st.onAction = (action, hot) => { window.__taps.push(hot && hot.id); };
    return true;
  });
}
// 舞台資訊：host 在頁面上的位置、鏡頭、可以點的熱點、每個點的頁面座標
async function stageInfo(page) {
  return page.evaluate(() => {
    const st = window.__lab.stage, sh = st.shop, v = sh.view(), hb = st.host.getBoundingClientRect();
    const hl = sh.hotList();
    return { host: [hb.left, hb.top, hb.width, hb.height], view: v, hots: hl.filter(h => !h.occluder).map(h => ({ id: h.id, label: h.label, enabled: h.enabled, gone: !!h.gone, bin: h.bin ? h.bin.key : null })),
      pts: sh.hotPoints() };
  });
}
// 在頁面上這一點最上層的元素是不是舞台的畫布（DOM 蓋住就點不到）
const topIsCanvas = (page, x, y) => page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y), sh = window.__lab.stage.shop; return e === sh.canvas ? true : (e ? (e.tagName + '.' + e.className).slice(0, 60) : 'none'); }, [x, y]);
async function tapGet(page, x, y) {
  await page.evaluate(() => { window.__taps = []; });
  await page.touchscreen.tap(x, y);
  await sleep(40);
  return page.evaluate(() => window.__taps.slice());
}
// 美術格 → 頁面座標（格子中心）
const artToPage = (page, x, y) => page.evaluate(([x, y]) => { const st = window.__lab.stage, q = st.shop.hostCss(x + 0.5, y + 0.5), hb = st.host.getBoundingClientRect(); return [hb.left + q.x, hb.top + q.y]; }, [x, y]);

async function runScreen(browser, w, h, screenName) {
  const size = `${w}x${h}${screenName === 'title' ? '' : ' ' + screenName}`;
  const { ctx, page } = await newPage(browser, w, h);
  try {
    await openTitle(page, Q('&fast=1&strict=1'));
    if (screenName === 'night') {
      // 來客要有 run：存一份 v5 存檔（特價箱已挑、第 2 位客人前），重開標題「繼續試煉」（C 整合後加跑，§3.3）
      await seedRun(page, { idx: 1, money: 600 });
      await openTitle(page, Q('&fast=1&strict=1'));
      await jsClick(page, '[data-a=cont]');
      await page.waitForFunction(() => window.__lab.screen() === 'night', null, { timeout: 15000 }).catch(() => {});
      await sleep(1200);
      const scr = await page.evaluate(() => window.__lab.screen());
      if (scr !== 'night') throw new Error('沒進到來客（畫面＝' + scr + '）');
    }
    await page.waitForFunction(() => window.__lab && window.__lab.stage && window.__lab.stage.shop && window.__lab.stage.shop.hotPoints, null, { timeout: 10000 });
    await install(page);
    const S = await stageInfo(page);
    const [hx, hy] = S.host;

    // ---- 1. 每個熱點的一定點得到的點
    const enabledIds = S.hots.filter(x => x.enabled && !x.gone).map(x => x.id);
    const ptIds = new Set(S.pts.map(p => p.id));
    const noPt = enabledIds.filter(id => !ptIds.has(id));
    let bad1 = [], covered = [];
    for (const p of S.pts) {
      const X = hx + p.x, Y = hy + p.y;
      const top = await topIsCanvas(page, X, Y);
      if (top !== true) { covered.push(p.id + '←' + top); continue; }
      const got = await tapGet(page, X, Y);
      if (got.length !== 1 || got[0] !== p.id) bad1.push(p.id + '→' + JSON.stringify(got));
    }
    // 鏡頭外（矮螢幕從牆頂裁掉）的熱點沒有點：只列出來，不算錯；但畫面裡露出一部分的一定要有點
    const outOfView = await page.evaluate(ids => { const sh = window.__lab.stage.shop; return ids.filter(id => !sh.hotRegion(id)); }, noPt);
    const lost = noPt.filter(id => !outOfView.includes(id));
    // 至少 30 個熱點：真點過的＋整個在鏡頭外的（矮螢幕的來客，面板讓鏡頭從牆頂裁掉兩排牆上唱片與海報；箱子與家具一定在畫面裡，見 #2／#4）
    record(1, size, !bad1.length && !covered.length && !lost.length && S.pts.length + outOfView.length >= 30,
      `hotPoints ${S.pts.length} 點真點、觸發自己 ${S.pts.length - bad1.length - covered.length}/${S.pts.length}` + (bad1.length ? ' 錯：' + bad1.join('、') : '') +
      (covered.length ? ' 被 DOM 蓋住：' + covered.join('、') : '') + (lost.length ? ' 看得到卻沒點：' + lost.join('、') : '') + (outOfView.length ? '（鏡頭外：' + outOfView.join('、') + '）' : ''));

    // ---- 2. 每箱沿可見帶左、中、右
    const bandPts = await page.evaluate(() => {
      const sh = window.__lab.stage.shop, out = [];
      sh.hotList().filter(h => h.bin && h.enabled).forEach(h => {
        const R = sh.hotRegion(h.id); if (!R) return;
        const w = R.box[2], hh = R.box[3]; let y0 = 1e9, y1 = -1;
        for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) if (R.m[j * w + i]) { y0 = Math.min(y0, j); y1 = Math.max(y1, j); }
        const row = Math.round((y0 + y1) / 2); let x0 = 1e9, x1 = -1;
        for (let i = 0; i < w; i++) if (R.m[row * w + i]) { x0 = Math.min(x0, i); x1 = Math.max(x1, i); }
        [x0 + 2, Math.round((x0 + x1) / 2), x1 - 2].forEach((i, k) => {
          const ax = R.box[0] + i, ay = R.box[1] + row, q = sh.hostCss(ax + 0.5, ay + 0.5);
          out.push({ id: h.id, k: ['左', '中', '右'][k], art: [ax, ay], x: q.x, y: q.y });
        });
      });
      return out;
    });
    let bad2 = [];
    for (const p of bandPts) {
      const X = hx + p.x, Y = hy + p.y, top = await topIsCanvas(page, X, Y);
      if (top !== true) { bad2.push(p.id + p.k + ' 被蓋住 ' + top); continue; }
      const got = await tapGet(page, X, Y);
      if (got.length !== 1 || got[0] !== p.id) bad2.push(p.id + p.k + JSON.stringify(p.art) + '→' + JSON.stringify(got));
    }
    const nBins = new Set(bandPts.map(p => p.id)).size;
    record(2, size, !bad2.length && nBins >= 12, `${nBins} 箱 × 左中右 ${bandPts.length} 點` + (bad2.length ? ' 錯：' + bad2.join('、') : ' 全部觸發自己'));

    // ---- 3. R-x0 probe3：x=118／162、y=200–212 每 2 格
    let n3 = 0, bad3 = [], front3 = [];
    // 中島最後一排的箱子（從 layout 讀，不寫死 key：FIXLIST 4 改分類後是 world／folk）
    const back3 = await page.evaluate(() => (window.__lab.stage.layout.props || []).filter(o => (o.id === 'isl-3a' || o.id === 'isl-3b') && o.bin).map(o => 'bin:' + o.bin.key));
    for (const x of [118, 162]) for (let y = 200; y <= 212; y += 2) {
      const top = await page.evaluate(([x, y]) => { const t = window.__lab.stage.shop.pick(x, y, { raw: true }); return t ? t.id : null; }, [x, y]);
      const [X, Y] = await artToPage(page, x, y);
      const got = await tapGet(page, X, Y);
      if (back3.includes(top)) {
        n3++;
        if (got.includes('bin:jazz') || got.includes('bin:tw') || got[0] !== top) bad3.push(`(${x},${y}) 在 ${top} → ${JSON.stringify(got)}`);
      } else front3.push(`(${x},${y})${top}→${got.join('')}`);
    }
    record(3, size, !bad3.length && n3 >= 10 && back3.length === 2, `中島最後一排（${back3.join('／')}）可見區 ${n3} 點不會開成爵士／台灣` + (bad3.length ? ' 錯：' + bad3.join('、') : '') + `（前排木箱範圍內 ${front3.length} 點：${front3.join(' ')}）`);

    // ---- 4. 每個站立家具的可見區中心：自己的熱點或什麼都沒有
    const furn = await page.evaluate(() => {
      const sh = window.__lab.stage.shop, DS = window.DipShop, hl = sh.hotList(), v = sh.view(), out = [];
      const props = []; hl.forEach(h => { if (h.prop && h.depth >= 0 && props.indexOf(h.prop) < 0) props.push(h.prop); });
      props.forEach(o => {
        const mine = hl.filter(h => h.prop === o);
        // 這個家具露出來的格子＝屬於它的熱點／遮擋物在最上面的格子
        let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        mine.forEach(h => h.shape.forEach(r => { x0 = Math.min(x0, r[0]); y0 = Math.min(y0, r[1]); x1 = Math.max(x1, r[0] + r[2]); y1 = Math.max(y1, r[1] + r[3]); }));
        y0 = Math.max(y0, v.y); y1 = Math.min(y1, v.y + v.h); x0 = Math.max(0, x0); x1 = Math.min(v.w, x1);
        if (x1 <= x0 || y1 <= y0) return;
        const w = x1 - x0, hh = y1 - y0, m = new Uint8Array(w * hh); let n = 0;
        for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const t = DS.hitTop(hl, x, y); if (t && t.prop === o) { m[(y - y0) * w + (x - x0)] = 1; n++; } }
        if (!n) return;
        const c = DS.regionCenter({ box: [x0, y0, w, hh], m, n }), q = sh.hostCss(c.x + 0.5, c.y + 0.5);
        out.push({ name: o.id || o.type, type: o.type, own: mine.filter(h => !h.occluder).map(h => h.id), art: [c.x, c.y], x: q.x, y: q.y });
      });
      return out;
    });
    let bad4 = [], nNone = 0, coveredF = [];
    for (const f of furn) {
      const X = hx + f.x, Y = hy + f.y, top = await topIsCanvas(page, X, Y);
      if (top !== true) { coveredF.push(f.name + '←' + top); continue; }
      const got = await tapGet(page, X, Y);
      if (!got.length) nNone++;
      if (got.some(id => !f.own.includes(id))) bad4.push(f.name + JSON.stringify(f.art) + '→' + JSON.stringify(got));
      if (!f.own.length && got.length) bad4.push(f.name + '（不能點的家具）→' + JSON.stringify(got));
    }
    const occN = furn.filter(f => !f.own.length).length;
    record(4, size, !bad4.length && furn.length >= 15, `${furn.length} 件家具（其中 ${occN} 件不能點、${coveredF.length} 件被 DOM 蓋住${coveredF.length ? '：' + coveredF.join('、') : ''}）：只觸發自己或什麼都沒有` + (bad4.length ? ' 錯：' + bad4.join('、') : ''));

    // ---- 5. 按下 50 ms 有金框；放開 300 ms 內名牌＝bin.label
    const cdp = await ctx.newCDPSession(page);
    const pressIds = S.pts.filter(p => /^bin:/.test(p.id) || ['counter', 'booth', 'door'].includes(p.id)).map(p => p.id);
    let bad5 = [], gold = [];
    for (const id of pressIds) {
      const p = S.pts.find(q => q.id === id);
      const X = Math.round(hx + p.x), Y = Math.round(hy + p.y);
      if (await topIsCanvas(page, X, Y) !== true) continue;
      const clip = await page.evaluate(id => { const sh = window.__lab.stage.shop, R = sh.hotRegion(id), st = window.__lab.stage, hb = st.host.getBoundingClientRect();
        const a = sh.hostCss(R.box[0] - 2, R.box[1] - 2), b = sh.hostCss(R.box[0] + R.box[2] + 2, R.box[1] + R.box[3] + 2);
        return { x: Math.max(0, hb.left + a.x), y: Math.max(0, hb.top + a.y), width: b.x - a.x, height: b.y - a.y }; }, id);
      clip.width = Math.min(clip.width, w - clip.x); clip.height = Math.min(clip.height, h - clip.y);
      await page.evaluate(() => { window.__taps = []; document.querySelectorAll('.ds-label.tap').forEach(e => e.remove()); });
      await sleep(950);   // 上一個的放開框（0.9 s）收掉
      const before = countGold(await page.screenshot({ clip }));
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: X, y: Y }] });
      await sleep(50);
      const during = countGold(await page.screenshot({ clip }));
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      const t0 = Date.now();
      const lbl = await page.waitForFunction(() => { const e = document.querySelector('.ds-label.tap'); return e && e.textContent; }, null, { timeout: 300 }).then(hd => hd.jsonValue(), () => null);
      const dt = Date.now() - t0;
      const want = S.hots.find(x => x.id === id).label;
      const minGold = Math.max(20, Math.round((clip.width + clip.height) * 0.5));
      gold.push(id.replace('bin:', '') + ' ' + before + '→' + during);
      if (during - before < minGold) bad5.push(id + ' 按下 50 ms 金色像素 ' + before + '→' + during + '（要多 ≥' + minGold + '）');
      if (lbl !== want) bad5.push(id + ' 放開名牌「' + lbl + '」≠「' + want + '」（' + dt + ' ms）');
      const taps = await page.evaluate(() => window.__taps.slice());
      if (taps.length !== 1 || taps[0] !== id) bad5.push(id + ' 放開觸發 ' + JSON.stringify(taps));
    }
    record(5, size, !bad5.length && pressIds.length >= 15, `${pressIds.length} 個熱點按下有金框、放開掛名牌` + (bad5.length ? ' 錯：' + bad5.join('、') : '') + '（金色像素 前→中：' + gold.slice(0, 4).join('；') + '…）');

    // ---- 泡泡避開中間（橫條鏡頭；SPEC-v4 §2.3.7）
    const bub = await page.evaluate(async () => {
      const st = window.__lab.stage, sh = st.shop;
      await st.camera('strip', { ms: 0, screen: 'duel' });
      st.put('f', 'duelE', 'owner'); st.put('p', 'duelP', 'owner'); st.put('o', 'ref', 'owner');
      const out = { cam: st.cameraName() };
      const v = sh.view(), hb = st.host.getBoundingClientRect(), mid = sh.hostCss(146, 0).x, oh = 16 * v.scale;
      for (const id of ['f', 'p']) {
        const el = sh.say(id, '「這張你一定沒聽過吧？我跑了三家店、翻了兩個禮拜的箱子才找到的。」', { ms: 0 });
        sh.tick();
        const r = el.getBoundingClientRect();
        out[id] = { left: r.left - hb.left, right: r.right - hb.left, top: r.top - hb.top, bottom: r.bottom - hb.top };
        sh.say(id, '');
      }
      out.ownerL = mid - oh; out.ownerR = mid + oh;
      return out;
    });
    const bubOk = bub.f.right <= bub.ownerL + 0.5 && bub.p.left >= bub.ownerR - 0.5;
    record(6, size, bubOk, `橫條（${bub.cam}）泡泡不碰老闆 x±16 格：男子 右緣 ${bub.f.right.toFixed(1)} ≤ ${bub.ownerL.toFixed(1)}；你 左緣 ${bub.p.left.toFixed(1)} ≥ ${bub.ownerR.toFixed(1)}`);

    // ---- 主控台 0 錯誤（含嚴格模式的 [shop] no route）
    const errs = page._errors.concat(page._badLocal);
    record(7, size, !errs.length, errs.length ? '主控台錯誤：' + errs.slice(0, 3).join(' | ') : '主控台 0 錯誤（?strict=1）');
  } catch (e) {
    record(0, size, false, 'threw: ' + (e && e.stack || e));
  } finally { await ctx.close(); }
}

// PNG 數金色像素（不靠外部套件：解 PNG 用 zlib）
import zlib from 'zlib';
function countGold(buf) {
  const px = decodePNG(buf); let n = 0;
  for (let i = 0; i < px.data.length; i += 4) {
    const r = px.data[i], g = px.data[i + 1], b = px.data[i + 2];
    if (Math.abs(r - GOLD[0]) < 30 && Math.abs(g - GOLD[1]) < 30 && Math.abs(b - GOLD[2]) < 45) n++;
  }
  return n;
}
function decodePNG(buf) {
  let p = 8, w = 0, h = 0, ct = 0, bd = 8; const idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p), type = buf.toString('ascii', p + 4, p + 8), data = buf.subarray(p + 8, p + 8 + len);
    if (type === 'IHDR') { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bd = data[8]; ct = data[9]; }
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    p += 12 + len;
  }
  if (bd !== 8 || (ct !== 6 && ct !== 2)) throw new Error('PNG 格式不支援 ct=' + ct + ' bd=' + bd);
  const bpp = ct === 6 ? 4 : 3, raw = zlib.inflateSync(Buffer.concat(idat)), stride = w * bpp, out = new Uint8Array(w * h * 4);
  let prev = new Uint8Array(stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)), cur = new Uint8Array(stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0, b = prev[i], c = i >= bpp ? prev[i - bpp] : 0, x = line[i];
      let v;
      if (f === 0) v = x; else if (f === 1) v = x + a; else if (f === 2) v = x + b; else if (f === 3) v = x + ((a + b) >> 1);
      else { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); }
      cur[i] = v & 255;
    }
    for (let x = 0; x < w; x++) { out[(y * w + x) * 4] = cur[x * bpp]; out[(y * w + x) * 4 + 1] = cur[x * bpp + 1]; out[(y * w + x) * 4 + 2] = cur[x * bpp + 2]; out[(y * w + x) * 4 + 3] = bpp === 4 ? cur[x * bpp + 3] : 255; }
    prev = cur;
  }
  return { w, h, data: out };
}

const browser = await launch();
try {
  for (const [w, h] of SIZES) for (const s of SCREENS) await runScreen(browser, w, h, s);
} finally { await browser.close(); }
const failed = results.filter(r => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} PASS` + (failed.length ? `，FAIL：${failed.map(r => '#' + r.n + '[' + r.size + ']').join(' ')}` : ''));
process.exit(failed.length ? 1 : 0);
