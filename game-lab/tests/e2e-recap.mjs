// game-lab/tests/e2e-recap.mjs：上一手細節（店主 11-17「上一場發生了什麼事的細節還是來不及看清楚，一閃就沒了，怎麼辦」；scratchpad v5/recap DESIGN）
//   ① 揭曉後停住等點 ② 點上一手小列＝上一手詳情 ③ 頂欄「紀錄」＝這場每一手一行、打完在結算畫面也看得到。
//   需要靜態伺服器：cd <repo 根> && python3 -m http.server 8765
//   LAB_BASE=http://localhost:8765 LAB_SIZES=390x664,375x548 node game-lab/tests/e2e-recap.mjs
// 每個尺寸（預設 390x664、375x548）：
//   R1 停住（__lab.duelLab.start({hold:true})、不加 fast）：浮框出現後 .wait.hold、l4「點一下繼續 ▼」；3 秒後還停著（同一手、resolve）；
//      停住後 500 ms 內的點擊不算；點盤面（他那一塊）→ 換手（T_GO 約 220 ms＋輪詢）、手數 +1、'settled' 在放行後才發
//   R2 停住中點大格封面＝唱片資訊（slot-e），關掉後照樣停著；點盤面外的舞台＝放行；Enter＝放行
//   R6 上一手詳情：第 4 手點小列他那張＝「第 3 手」面板（蓋住整個盤面）：雙方唱片（aria 的藝人《專輯》＝log 的 eId／pId）、屬性與星＝log、提示原句＝hintOf(log.line)、
//      結果框的字＝那手 clash 事件的 clashText（debug().hands 的 ct）、打完的聲望＝log pHp／eHp；‹ › 走到頭 disabled；面板裡點封面＝唱片資訊（recap-e）；
//      ✕ 關掉、Esc 關掉；打開的手牌照樣打開
//   R8 這場紀錄：頂欄「紀錄」第 1 手揭曉前沒有、揭曉後才有；列數＝已揭曉手數；揭曉前（出牌後 150 ms）打開不含這一手；每列扣分＝log toE／toP；點一列＝那手詳情
//   R10 版面：詳情、紀錄不捲（.rc-bd 不溢出）、面板在畫面裡、列 ≥44 高、按鈕命中區 ≥40；頂欄名字不被「紀錄」擠到截斷；⏸ 選單不捲
//   R5 最後一手也停：KO 那手停住時沒有大章、'over' 沒發；點了才出大章、duelLab.ended 有值
//   R3 ⏸「揭曉後自動換手」：預設關、點了變開、存進存檔（localStorage）；開＝一般手約 2 秒自己換手、不停；停住中打開＝關選單就放行；關回去又會停
//   R4 相容：?fast=1、autoplay、duelLab 預設（沒給 hold）都不停
//   R9 結算（真的一趟：種存檔 autoNext:false）：對決中停住、紀錄 2 列；R11 第 3 手重新整理：小列＝第 2 手、紀錄 2 列跟重整前一字不差；
//      打贏 → 領獎畫面頂欄「紀錄」→ modal 2 列跟對決中一樣、點列＝詳情、點封面＝唱片資訊；重新整理回到領獎畫面還在；下一場打完換成那一場；
//      輸到底（loseNext noRetry）：最後一手照樣停住；說情那段（scene）與結算畫面頂欄都有「紀錄」、modal 列數＝那場手數
// 只跑一次（390x664）：R7 不洩漏（半指、不露那手：面板只有 clashText 的字，不露那手沒有「唬」「照實」「看穿」、沒有籤；不寫他藏起來的計畫色）
// 每一項印 PASS／FAIL；任何 FAIL → exit 1。LAB_SHOTS＝目錄 → 另存截圖（deviceScaleFactor 2）：揭曉後停住、上一手詳情、這場紀錄、結算畫面的紀錄
import fs from 'fs';
import { launch, newPage, record, results, sleep, hitPoint, openTitle, seededContinue, waitScreen, duelReady, jsClick, advanceUntil, URL0 } from './e2e-lib.mjs';

const SIZES = (process.env.LAB_SIZES || '390x664,375x548').split(',').filter(Boolean).map(s => s.split('x').map(Number));
const SHOTS = process.env.LAB_SHOTS ? process.env.LAB_SHOTS.replace(/\/+$/, '') + '/' : null;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
const SEED = '20261117';
const QQ = (extra = '') => `${URL0}?debug=1&seed=${SEED}${extra}`;
const short = s => JSON.stringify(s).slice(0, 260);

async function bootLab(page, o, extra = '') {
  await page.goto(QQ(extra), { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__lab && window.__lab.duelLab && !document.body.classList.contains('stage-wait'), null, { timeout: 20000 });
  await page.evaluate(() => { try { localStorage.removeItem('dipGameLab_v1'); } catch (_) {} });
  await page.evaluate(o => window.__lab.duelLab.start(o), o);
  await ready(page);
  await page.evaluate(() => {
    const D = window.DipLabDuel; window.__ev = [];
    if (!window.__evOn) { window.__evOn = true; for (const k of ['waitTap', 'settled', 'resolved', 'over', 'info', 'recap', 'recapClosed']) D.on(k, v => window.__ev.push([k, k === 'info' || k === 'waitTap' ? v : (v && v.view) || null, performance.now()])); }
  });
  await sleep(250);
}
const ready = (page, ms = 30000) => page.waitForFunction(() => { const D = window.DipLabDuel; if (!D || !D.api()) return false; const d = D.debug(); return d.enterDone && !D.api().busy() && d.phase === 'choose' && !d.held; }, null, { timeout: ms }).then(() => true, () => false);
const waiting = (page, ms = 8000) => page.waitForFunction(() => window.DipLabDuel.api().waiting(), null, { timeout: ms }).then(() => true, () => false);
// 他這手照 thoughtful 出（不等 play 的 Promise：停住時它要等放行）
const playOne = (page, seed = 99) => page.evaluate(s => { const E = window.DipLabEngine, C = window.DipLabContent, d = window.__lab.rawDuel(); window.DipLabDuel.api().play(E.policies.thoughtful(d, E.makeRng(s), {}, C)); }, seed);
async function tapSel(page, sel) { const p = await hitPoint(page, sel); if (!p) return false; await page.touchscreen.tap(p.x, p.y); return true; }
const dbg = page => page.evaluate(() => { const d = window.DipLabDuel.debug(); return { n: d.n, phase: d.phase, hold: d.hold, busy: d.busy, shown: d.shown, recap: d.recap, open: d.open }; });
const infoOpen = (page, ms = 3000) => page.waitForSelector('#cardInfoMask', { timeout: ms }).then(() => true, () => false);
async function closeInfo(page) { await page.evaluate(() => { const b = document.querySelector('#ciClose'); if (b) b.click(); }); await page.waitForSelector('#cardInfoMask', { state: 'detached', timeout: 2000 }).catch(() => {}); await sleep(200); }
async function shot(page, name) { if (SHOTS) await page.screenshot({ path: SHOTS + name }); }
// 面板的內容（.dl-rc：盤面裡或 modal 裡）
const panelOf = (page, root = '.dl') => page.evaluate(root => {
  const el = document.querySelector(root + ' .dl-rc'); if (!el) return null;
  const tx = q => { const e = el.querySelector(q); return e ? e.textContent.replace(/\s+/g, ' ').trim() : null; };
  const bd = el.querySelector('.rc-bd'), r = el.getBoundingClientRect(), host = el.parentElement.getBoundingClientRect();
  return { view: el.dataset.view, n: el.dataset.n ? +el.dataset.n : null, title: tx('.rc-t'), hint: tx('.rc-hint .tx'), v1: tx('.rc-res .v1'), v2: tx('.rc-res .v2'), d: tx('.rc-res .v2 .d'), v3: tx('.rc-res .v3'),
    notes: [...el.querySelectorAll('.rc-res .nts li')].map(x => x.textContent), hp: tx('.rc-hp'), whoE: tx('.rc-cd.e .who'), whoP: tx('.rc-cd.p .who'),
    ariaE: (el.querySelector('[data-rc-card=e]') || { getAttribute: () => null }).getAttribute('aria-label'), ariaP: (el.querySelector('[data-rc-card=p]') || { getAttribute: () => null }).getAttribute('aria-label'),
    prevDis: !!(el.querySelector('[data-rc=prev]') || {}).disabled, nextDis: !!(el.querySelector('[data-rc=next]') || {}).disabled,
    rows: [...el.querySelectorAll('.rc-row')].map(b => ({ n: +b.dataset.rcN, text: b.textContent.replace(/\s+/g, ' ').trim(), d: (b.querySelector('.out .d') || {}).textContent || '', tag: (b.querySelector('.tg') || {}).textContent || '', h: Math.round(b.getBoundingClientRect().height), sw: b.scrollWidth - b.clientWidth })),
    scroll: bd ? [bd.scrollHeight, bd.clientHeight] : null, rect: { t: Math.round(r.top), b: Math.round(r.bottom), l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width) },
    host: { t: Math.round(host.top), b: Math.round(host.bottom), w: Math.round(host.width) }, vh: innerHeight, vw: innerWidth, html: el.innerHTML };
}, root);
// 那手該有的字（log＋clashText；跟 recap.js handHTML 同一套排法）
const expectHand = (page, n) => page.evaluate(n => {
  const D = window.DipLabDuel, C = window.DipLabContent, d = window.__lab.rawDuel() || window.__lab.duelLab.duel, L = d.log.find(x => x.n === n), F = D._fmt, T = F.text(C), ZH = { c: '經典', o: '冷門', h: '硬蕊' };
  const H = D.debug().hands.find(h => h.n === n), ct0 = H ? H.ct : null;
  const row = D.api().recapRows().find(r => r.n === n);
  const hx = F.hintOf(C.hints, { attr: L.hint, line: L.line, kind: L.hk, not: L.not }, C.hintLines);
  const card = id => C.cards[id] || null, ttl = c => c ? `${c.artist || ''}《${c.album || ''}》` : '';
  return { L, ct0, ct: row ? row.ct : null, hint: hx ? hx.text : '', whoE: `他・${ZH[L.eAttr]} ${L.eStar}`, whoP: `你・${ZH[L.pAttr]} ${L.pStar}`,
    ariaE: `${ttl(card(L.eId))}，點一下看唱片資訊`, ariaP: `${ttl(card(L.pId))}，點一下看唱片資訊`, hp: `打完　你 ${Math.max(0, L.pHp)}／${d.p.max}　他 ${Math.max(0, L.eHp)}／${d.e.max}`.replace(/\s+/g, ' ') };
}, n);
function checkHand(P, X) {
  const w = [];
  if (!P || P.view !== 'hand') return ['面板不是詳情：' + short(P && { view: P.view, n: P.n })];
  const same = (a, b) => a && b && a.l1 === b.l1 && a.l2 === b.l2 && a.l3 === b.l3 && JSON.stringify(a.notes) === JSON.stringify(b.notes);
  if (!same(X.ct, X.ct0)) w.push('log 組回的字 ≠ 那手 clash 的 clashText：' + short([X.ct, X.ct0]));
  const ct = X.ct0;
  if ((P.hint || '') !== X.hint) w.push(`提示「${P.hint}」≠「${X.hint}」`);
  if (P.whoE !== X.whoE || P.whoP !== X.whoP) w.push(`屬性星 ${P.whoE}／${P.whoP} ≠ ${X.whoE}／${X.whoP}`);
  if (P.ariaE !== X.ariaE || P.ariaP !== X.ariaP) w.push(`封面 ${P.ariaE}／${P.ariaP} ≠ ${X.ariaE}／${X.ariaP}`);
  if (P.hp !== X.hp) w.push(`聲望「${P.hp}」≠「${X.hp}」`);
  if (ct) {
    const verdict = ct.l1 !== ct.rule && ct.l1.indexOf(ct.rule) < 0, rule = verdict ? ct.rule : ct.l1;
    if (verdict ? P.v1 !== ct.l1 : P.v1 != null) w.push(`判讀句「${P.v1}」（要 ${verdict ? ct.l1 : '沒有'}）`);
    if (P.v2 !== (rule + ct.l2).replace(/\s+/g, ' ').trim() && P.v2 !== (rule + ' ' + ct.l2).replace(/\s+/g, ' ').trim()) w.push(`規則句「${P.v2}」≠「${rule}${ct.l2}」`);
    if (P.d !== ct.l2) w.push(`扣分「${P.d}」≠「${ct.l2}」`);
    const l3 = ct.l3 && ct.l3 !== ct.rule.replace(/[，,]\s*$/, '。') ? ct.l3 : null;
    if ((P.v3 || null) !== l3) w.push(`l3「${P.v3}」≠「${l3}」`);
    if (JSON.stringify(P.notes) !== JSON.stringify(ct.notes)) w.push('小字 ' + short([P.notes, ct.notes]));
  }
  return w;
}

// ================================================================== 每個尺寸
async function runSize(browser, w, h) {
  const size = `${w}x${h}`;
  const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
  try {
    await bootLab(page, { enemy: 'copycat', seed: 11, pos: 9, hold: true });
    const link0 = await page.evaluate(() => { const b = document.querySelector('#top [data-a=recap]'); return b ? { hidden: b.hidden, vis: !!b.offsetWidth } : null; });
    // ---- R1 停住
    {
      await page.evaluate(() => { window.__guard = null; const D = window.DipLabDuel; const off = D.on('waitTap', v => { if (!v) return; off(); setTimeout(() => { window.__guard = performance.now(); document.querySelector('.dl .dl-e').click(); }, 150); }); });
      await playOne(page);
      const okW = await waiting(page);
      const C0 = await page.evaluate(() => { const c = document.querySelector('.dl .callout'); return { cls: c.className, l4: c.querySelector('.l4').textContent.trim(), l4vis: getComputedStyle(c.querySelector('.l4')).display !== 'none', on: c.classList.contains('on') }; });
      await sleep(3000);
      const S3 = await dbg(page);
      const settledEarly = await page.evaluate(() => window.__ev.filter(e => e[0] === 'settled').length);
      await shot(page, `${size}-1-hold.png`);
      const t0 = Date.now();
      await tapSel(page, '.dl .dl-e .nmrow');
      const okC = await ready(page, 3000), ms = Date.now() - t0;
      const S4 = await dbg(page);
      const ev = await page.evaluate(() => window.__ev.map(e => e[0] + (e[0] === 'waitTap' ? ':' + e[1] : '')));
      const relIdx = ev.indexOf('waitTap:false'), setIdx = ev.indexOf('settled');
      const ok = okW && /\bwait\b/.test(C0.cls) && /\bhold\b/.test(C0.cls) && C0.l4 === '點一下繼續 ▼' && C0.l4vis && C0.on && S3.hold === 'tap' && S3.n === 1 && S3.phase === 'resolve' && settledEarly === 0
        && okC && ms <= 700 && S4.n === 2 && relIdx >= 0 && setIdx > relIdx;
      record('R1', size, ok, `停住 ${okW}（${C0.cls}；l4「${C0.l4}」）；3 秒後 ${S3.hold}、第 ${S3.n} 手 ${S3.phase}、settled ${settledEarly}；150 ms 的點擊不算（還停著 ${S3.hold === 'tap'}）；點盤面 → ${ms} ms 換到第 ${S4.n} 手；事件 ${ev.join(',')}`);
    }
    // ---- R8a 頂欄「紀錄」：第 1 手揭曉前沒有、之後有
    const link1 = await page.evaluate(() => { const b = document.querySelector('#top [data-a=recap]'); return b ? { hidden: b.hidden, vis: !!b.offsetWidth, text: b.textContent } : null; });
    // ---- R2 停住中點大格封面＝唱片資訊、舞台＝放行、Enter＝放行
    {
      await sleep(300);
      await playOne(page, 7);
      const okW = await waiting(page);
      await sleep(650);
      await page.evaluate(() => { window.__ev.length = 0; });
      await tapSel(page, '.dl .slot.e .cv');
      const okI = await infoOpen(page);
      await sleep(200);
      await closeInfo(page);
      await sleep(400);
      const S1 = await dbg(page);
      const evI = await page.evaluate(() => window.__ev.filter(e => e[0] === 'info').map(e => e[1]));
      // 舞台（盤面外）
      const st = await page.evaluate(() => { const s = document.querySelector('#stage'), b = s.getBoundingClientRect();
        for (const fy of [0.5, 0.3, 0.7, 0.15, 0.85]) for (const fx of [0.12, 0.88, 0.3, 0.7, 0.5]) { const x = b.left + b.width * fx, y = b.top + b.height * fy, t = document.elementFromPoint(x, y); if (t && s.contains(t)) return { x, y }; }
        return { x: b.left + b.width * 0.12, y: b.top + b.height * 0.5 }; });
      await page.touchscreen.tap(st.x, st.y);
      const okS = await ready(page, 3000);
      const S2 = await dbg(page);
      // Enter
      await sleep(300);
      await playOne(page, 5);
      const okW3 = await waiting(page);
      await sleep(650);
      await page.evaluate(() => { if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); });
      await page.keyboard.press('Enter');
      const okE = await ready(page, 3000);
      const S3 = await dbg(page);
      const ok = okW && okI && evI.includes('slot-e') && S1.hold === 'tap' && okS && S2.n === 3 && okW3 && okE && S3.n === 4;
      record('R2', size, ok, `停住中點他那格封面 → 唱片資訊 ${okI}（${evI.join(',')}）、關掉後 ${S1.hold}；點舞台 → 放行 ${okS}（第 ${S2.n} 手）；Enter → 放行 ${okE}（第 ${S3.n} 手）`);
    }
    // ---- R6 上一手詳情（第 4 手：小列＝第 3 手）
    {
      await sleep(400);
      await page.evaluate(() => window.DipLabDuel.select(1));
      await sleep(350);
      const open0 = (await dbg(page)).open;
      await page.evaluate(() => { window.__ev.length = 0; });
      await tapSel(page, '.dl .lastplay .lp.e');
      await page.waitForSelector('.dl .dl-rc', { timeout: 3000 }).catch(() => {});
      await sleep(300);
      const P3 = await panelOf(page), X3 = await expectHand(page, 3);
      await shot(page, `${size}-2-detail.png`);
      const w6 = checkHand(P3, X3);
      if (P3 && (P3.n !== 3 || !/^第 3 手／6/.test(P3.title))) w6.push(`標題「${P3.title}」第 ${P3.n} 手`);
      if (P3 && !(P3.rect.t === P3.host.t && P3.rect.b === P3.host.b && P3.rect.w === P3.host.w)) w6.push('沒蓋住整個盤面 ' + short([P3.rect, P3.host]));
      // 唱片資訊（面板裡點他那張）
      await tapSel(page, '.dl .dl-rc [data-rc-card=e]');
      const okI = await infoOpen(page);
      const evI = await page.evaluate(() => window.__ev.filter(e => e[0] === 'info').map(e => e[1]));
      if (okI) await closeInfo(page);
      if (!okI || evI.join() !== 'recap-e') w6.push('點封面沒開唱片資訊（' + evI.join(',') + '）');
      if (!(await page.$('.dl .dl-rc'))) w6.push('關掉唱片資訊後面板不見了');
      // ‹ ›
      const nav = [];
      for (const a of ['prev', 'prev', 'next', 'next']) { await page.evaluate(a => document.querySelector(`.dl .dl-rc [data-rc=${a}]`).click(), a); await sleep(120); const p = await panelOf(page); nav.push([p.n, p.prevDis, p.nextDis]); }
      if (JSON.stringify(nav) !== JSON.stringify([[2, false, false], [1, true, false], [2, false, false], [3, false, true]])) w6.push('‹ › ' + short(nav));
      await page.evaluate(() => { document.querySelector('.dl .dl-rc [data-rc=prev]').click(); document.querySelector('.dl .dl-rc [data-rc=prev]').click(); });
      const P1 = await panelOf(page);
      const w61 = checkHand(P1, await expectHand(page, 1)); if (w61.length) w6.push('第 1 手：' + w61.join('；'));
      // ✕
      await page.evaluate(() => document.querySelector('.dl .dl-rc [data-rc=x]').click()); await sleep(200);
      const x1 = await dbg(page);
      // Esc（點小列你那張開、Esc 關）
      await tapSel(page, '.dl .lastplay .lp.p');
      await page.waitForSelector('.dl .dl-rc', { timeout: 3000 }).catch(() => {});
      const P3p = await panelOf(page);
      await page.keyboard.press('Escape'); await sleep(250);
      const x2 = await dbg(page);
      if (x1.recap || x2.recap || !P3p || P3p.n !== 3) w6.push('✕／Esc 沒關（' + short([x1.recap, x2.recap, P3p && P3p.n]) + '）');
      if (open0 !== 1 || x1.open !== 1 || x2.open !== 1) w6.push(`手牌 ${open0} → ${x1.open} → ${x2.open}`);
      record('R6', size, !w6.length, `${w6.join('；') || 'ok'}；第 3 手：提示「${P3 && P3.hint}」｜${P3 && P3.whoE}｜${P3 && P3.whoP}｜${P3 && P3.v1 || ''}｜${P3 && P3.v2}｜${P3 && (P3.v3 || '')}｜${P3 && P3.notes.join('・')}｜${P3 && P3.hp}`);
      // R10 詳情的版面
      const L6 = await page.evaluate(() => {
        const out = [];
        for (const n of [1, 2, 3]) {
          window.DipLabDuel.recap('hand', n);
          const el = document.querySelector('.dl .dl-rc'), bd = el.querySelector('.rc-bd'), r = el.getBoundingClientRect();
          const btn = [...el.querySelectorAll('.rc-hd button')].map(b => { const q = b.getBoundingClientRect(); const hit = y => { const t = document.elementFromPoint(q.left + q.width / 2, y); return !!t && (t === b || b.contains(t)); }; return { k: b.dataset.rc, h: Math.round(q.height), hit40: hit(q.top + q.height / 2 - 20 + 1) && hit(q.top + q.height / 2 + 20 - 1) }; });
          out.push({ n, sh: bd.scrollHeight, ch: bd.clientHeight, bottom: Math.round(r.bottom), vh: innerHeight, btn });
        }
        window.DipLabDuel.recap(false);
        return out;
      });
      page._L6 = L6;
    }
    await page.evaluate(() => window.DipLabDuel.select(null));
    await sleep(300);
    // ---- R8 這場紀錄
    {
      const w8 = [];
      if (!link0 || !link0.hidden || link0.vis) w8.push('第 1 手揭曉前就有「紀錄」：' + short(link0));
      if (!link1 || link1.hidden || !link1.vis || link1.text !== '紀錄') w8.push('第 1 手揭曉後沒有「紀錄」：' + short(link1));
      await jsClick(page, '#top [data-a=recap]');
      await page.waitForSelector('.dl .dl-rc', { timeout: 3000 }).catch(() => {});
      await sleep(250);
      const PL = await panelOf(page);
      await shot(page, `${size}-3-list.png`);
      const logD = await page.evaluate(() => { const T = window.DipLabDuel._fmt.text(window.DipLabContent); return window.__lab.rawDuel().log.map(L => window.DipLabRecap.dOf(L, T).t); });
      if (!PL || PL.view !== 'list' || PL.rows.length !== 3) w8.push('列數 ' + (PL && PL.rows.length));
      else {
        if (PL.rows.map(r => r.d).join('|') !== logD.slice(0, 3).join('|')) w8.push('扣分 ' + short([PL.rows.map(r => r.d), logD]));
        if (PL.rows.some(r => r.h < 44 || r.sw > 1)) w8.push('列高／爆寬 ' + short(PL.rows.map(r => [r.h, r.sw])));
        if (!(PL.scroll[0] <= PL.scroll[1] + 1)) w8.push('列表捲動 ' + PL.scroll.join('/'));
      }
      // 點第 2 列＝第 2 手詳情
      await page.evaluate(() => document.querySelector('.dl .dl-rc .rc-row[data-rc-n="2"]').click()); await sleep(200);
      const P2 = await panelOf(page);
      const w82 = checkHand(P2, await expectHand(page, 2)); if (w82.length || !P2 || P2.n !== 2) w8.push('點列：' + (w82.join('；') || 'n=' + (P2 && P2.n)));
      // 全部 → 列表
      await page.evaluate(() => document.querySelector('.dl .dl-rc [data-rc=list]').click()); await sleep(150);
      const PL2 = await panelOf(page);
      if (!PL2 || PL2.view !== 'list') w8.push('［全部］沒回到列表');
      await page.evaluate(() => document.querySelector('.dl .dl-rc [data-rc=x]').click()); await sleep(200);
      // 揭曉前打開不含這一手：出牌後 150 ms 開紀錄
      await playOne(page, 3);
      await sleep(150);
      await jsClick(page, '#top [data-a=recap]');
      await sleep(250);
      const PB = await panelOf(page), SB = await dbg(page);
      if (!PB || PB.rows.length !== 3 || SB.n !== 4 || SB.phase !== 'resolve') w8.push(`揭曉前開紀錄：${PB && PB.rows.length} 列（第 ${SB.n} 手 ${SB.phase}）`);
      await page.evaluate(() => document.querySelector('.dl .dl-rc [data-rc=x]').click());
      const okW = await waiting(page);
      await jsClick(page, '#top [data-a=recap]'); await sleep(250);
      const PA = await panelOf(page), SA = await dbg(page);
      if (!PA || PA.rows.length !== 4 || SA.hold !== 'tap') w8.push(`停住時開紀錄：${PA && PA.rows.length} 列、${SA.hold}`);
      await page.evaluate(() => document.querySelector('.dl .dl-rc [data-rc=x]').click()); await sleep(250);
      const SC = await dbg(page);
      if (SC.hold !== 'tap') w8.push('關掉紀錄後沒回到停住');
      await shot(page, `${size}-1b-hold.png`);
      await tapSel(page, '.dl .dl-e .nmrow');
      await ready(page, 4000);
      record('R8', size, !w8.length && okW, `${w8.join('；') || 'ok'}；揭曉前「紀錄」hidden ${link0 && link0.hidden}、揭曉後看得到 ${link1 && link1.vis}；列表 ${PL && PL.rows.map(r => r.text).join(' ／ ')}`);
    }
    // ---- R10 版面
    {
      const w10 = [];
      for (const x of page._L6 || []) {
        if (x.sh > x.ch + 1) w10.push(`第 ${x.n} 手詳情捲動 ${x.sh}/${x.ch}`);
        if (x.bottom > x.vh) w10.push(`第 ${x.n} 手面板超出畫面`);
        const bad = x.btn.filter(b => !b.hit40); if (bad.length) w10.push('按鈕命中區不到 40：' + bad.map(b => b.k + ' ' + b.h).join('、'));
      }
      const top = await page.evaluate(() => { const t = document.querySelector('#top .tt'), b = document.querySelector('#top [data-a=recap]'), r = b.getBoundingClientRect(), q = t.getBoundingClientRect(); return { cut: t.scrollWidth > t.clientWidth + 1, tw: Math.round(q.width), text: t.textContent, lw: Math.round(r.width), right: Math.round(r.right), vw: innerWidth }; });
      if (top.cut) w10.push(`頂欄名字被截斷（${top.text}，寬 ${top.tw}）`);
      // ⏸ 選單
      await jsClick(page, '#top [data-a=pause]');
      await page.waitForSelector('.lb-modal [data-a=autonext]', { timeout: 3000 }).catch(() => {});
      await sleep(350);
      const pm = await page.evaluate(() => { const m = document.querySelector('.lb-modal'), p = m.querySelector('.pane').getBoundingClientRect(); return { sh: m.scrollHeight, ch: m.clientHeight, bottom: Math.round(p.bottom), vh: innerHeight }; });
      if (pm.sh > pm.ch + 1 || pm.bottom > pm.vh) w10.push('⏸ 選單捲動／超出 ' + short(pm));
      await shot(page, `${size}-6-pause.png`);
      await page.evaluate(() => { const b = document.querySelector('.lb-modal [data-a=resume]'); if (b) b.click(); });
      await sleep(300);
      record('R10', size, !w10.length, `${w10.join('；') || 'ok'}；詳情 ${(page._L6 || []).map(x => x.sh + '/' + x.ch).join('、')}；頂欄「${top.text}」寬 ${top.tw}、紀錄 ${top.lw}；⏸ 底 ${pm.bottom}/${pm.vh}`);
    }
  } catch (e) { record('R1', size, false, 'error ' + (e && e.stack || e)); }
  await ctx.close();

  // ---- R5 最後一手也停
  {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await bootLab(page, { enemy: 'copycat', seed: 3, pos: 4, hold: true });
      await page.evaluate(() => window.__lab.force({ kind: 'counter', toE: 99, toP: 0, by: 'p' }));
      await playOne(page);
      const okW = await waiting(page);
      await sleep(2000);
      const S = await page.evaluate(() => ({ kost: !!document.querySelector('.dl .kost.on'), over: window.__ev.filter(e => e[0] === 'over').length, ended: window.__lab.duelLab.ended, hold: window.DipLabDuel.debug().hold }));
      await page.evaluate(() => window.__lab.force(null));
      const t0 = Date.now();
      await tapSel(page, '.dl .dl-e .nmrow');
      const okK = await page.waitForFunction(() => !!document.querySelector('.dl .kost.on'), null, { timeout: 4000 }).then(() => true, () => false);
      const ms = Date.now() - t0;
      const okE = await page.waitForFunction(() => !!window.__lab.duelLab.ended, null, { timeout: 15000 }).then(() => true, () => false);
      const ok = okW && !S.kost && S.over === 0 && !S.ended && S.hold === 'tap' && okK && okE;
      record('R5', size, ok, `KO 那手停住 ${okW}：2 秒後大章 ${S.kost}、over ${S.over}、ended ${!!S.ended}；點了 ${ms} ms 出大章 ${okK}、打完 ${okE}`);
    } catch (e) { record('R5', size, false, 'error ' + e.message); }
    await ctx.close();
  }
  // ---- R3 ⏸「揭曉後自動換手」
  {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await bootLab(page, { enemy: 'copycat', seed: 5, pos: 6, hold: true });
      const menu = async () => { await jsClick(page, '#top [data-a=pause]'); await page.waitForSelector('.lb-modal [data-a=autonext]', { timeout: 3000 }); await sleep(300); return page.evaluate(() => document.querySelector('.lb-modal [data-a=autonext]').textContent.replace(/\s+/g, ' ').trim()); };
      const resume = async () => { await page.evaluate(() => document.querySelector('.lb-modal [data-a=resume]').click()); await sleep(300); };
      const t0 = await menu();
      await page.evaluate(() => document.querySelector('.lb-modal [data-a=autonext]').click()); await sleep(150);
      const t1 = await page.evaluate(() => document.querySelector('.lb-modal [data-a=autonext]').textContent.replace(/\s+/g, ' ').trim());
      const saved1 = await page.evaluate(() => { try { return JSON.parse(localStorage.getItem('dipGameLab_v1')).settings.autoNext; } catch (_) { return null; } });
      await resume();
      // 開：一般手自己換手、不停
      await page.evaluate(() => { window.__ev.length = 0; });
      const a0 = Date.now();
      await playOne(page);
      await page.waitForFunction(() => window.DipLabDuel.debug().busy, null, { timeout: 3000 }).catch(() => {});
      const okA = await ready(page, 8000), msA = Date.now() - a0;
      const wtA = await page.evaluate(() => window.__ev.filter(e => e[0] === 'waitTap' && e[1]).length);
      // 關回去 → 停住；停住中打開 → 關選單就放行
      await menu(); await page.evaluate(() => document.querySelector('.lb-modal [data-a=autonext]').click()); await resume();
      await playOne(page, 7);
      const okW = await waiting(page);
      await sleep(300);
      const t2 = await menu();
      await page.evaluate(() => document.querySelector('.lb-modal [data-a=autonext]').click()); await sleep(100);
      const held = (await dbg(page)).hold;
      const r0 = Date.now();
      await resume();
      const okR = await ready(page, 4000), msR = Date.now() - r0;
      const saved2 = await page.evaluate(() => { try { return JSON.parse(localStorage.getItem('dipGameLab_v1')).settings.autoNext; } catch (_) { return null; } });
      const ok = t0 === '揭曉後自動換手 關' && t1 === '揭曉後自動換手 開' && saved1 === true && okA && wtA === 0 && msA > 1500 && msA < 5000 && okW && t2 === '揭曉後自動換手 關' && held === 'tap' && okR && saved2 === true;
      record('R3', size, ok, `⏸「${t0}」→「${t1}」（存檔 ${saved1}）；開：${msA} ms 自己換手、停 ${wtA} 次；關回去停住 ${okW}；停住中打開（${held}）→ 關選單 ${msR} ms 放行 ${okR}（存檔 ${saved2}）`);
    } catch (e) { record('R3', size, false, 'error ' + e.message); }
    await ctx.close();
  }
  // ---- R4 相容：?fast=1、autoplay、duelLab 預設都不停
  {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      const out = {};
      await bootLab(page, { enemy: 'copycat', seed: 9, pos: 6, hold: true }, '&fast=1');
      await playOne(page); out.fast = await ready(page, 6000) && (await page.evaluate(() => window.__ev.filter(e => e[0] === 'waitTap').length)) === 0;
      await bootLab(page, { enemy: 'copycat', seed: 9, pos: 6 });
      await playOne(page); out.lab = await ready(page, 8000) && (await page.evaluate(() => window.__ev.filter(e => e[0] === 'waitTap').length)) === 0;
      await bootLab(page, { enemy: 'copycat', seed: 9, pos: 6, hold: true });
      await page.evaluate(() => { window.DipLabDuel.autoplay('thoughtful'); });
      out.auto = await page.waitForFunction(() => !!window.__lab.duelLab.ended, null, { timeout: 40000 }).then(() => true, () => false) && (await page.evaluate(() => window.__ev.filter(e => e[0] === 'waitTap').length)) === 0;
      record('R4', size, out.fast && out.lab && out.auto, `?fast=1 不停 ${out.fast}；duelLab 預設不停 ${out.lab}；autoplay 打完不停 ${out.auto}`);
    } catch (e) { record('R4', size, false, 'error ' + e.message); }
    await ctx.close();
  }
  // ---- R9／R11 結算（真的一趟）
  await runReal(browser, w, h);
}

// 真的一趟：種存檔 autoNext:false（照真玩家）→ 對決中停住、紀錄 → 第 3 手重新整理 → 打贏 → 領獎畫面的紀錄 → 重新整理 → 下一場換掉；輸到底 → 說情那段／結算畫面的紀錄
async function runReal(browser, w, h) {
  const size = `${w}x${h}`;
  const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
  try {
    await seededContinue(page, { ace: 'pearl', idx: 0, autoNext: false }, QQ(''));
    await waitScreen(page, 'night'); await sleep(500);
    await jsClick(page, '[data-a=go]');
    await duelReady(page, 25000);
    await page.waitForFunction(() => !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
    await sleep(400);
    const holdOn = await page.evaluate(() => window.DipLabDuel.debug().holdOn);
    let held = 0;
    for (let k = 0; k < 2; k++) {
      await playOne(page, 11 + k);
      if (await waiting(page)) held++;
      await sleep(600);
      await tapSel(page, '.dl .dl-e .nmrow');
      await duelReady(page, 8000);
      await sleep(250);
    }
    // 對決中的紀錄（2 列）
    const listIn = async () => { await jsClick(page, '#top [data-a=recap]'); await page.waitForSelector('.dl .dl-rc', { timeout: 3000 }).catch(() => {}); await sleep(200); const P = await panelOf(page); await page.evaluate(() => { const b = document.querySelector('.dl .dl-rc [data-rc=x]'); if (b) b.click(); }); await sleep(200); return P; };
    const PA = await listIn();
    // R11 第 3 手重新整理：小列＝第 2 手、紀錄一樣
    await openTitle(page, QQ(''));
    await jsClick(page, '[data-a=cont]');
    await duelReady(page, 25000); await sleep(500);
    const strip = await page.evaluate(() => { const d = window.__lab.rawDuel(), L = d.log[d.log.length - 1], lp = document.querySelector('.dl .lastplay'); return { n: window.DipLabDuel.debug().n, e: (lp.querySelector('.lp.e') || { dataset: {} }).dataset.card, p: (lp.querySelector('.lp.p') || { dataset: {} }).dataset.card, want: [L.eId, L.pId], hidden: lp.hidden }; });
    const linkR = await page.evaluate(() => { const b = document.querySelector('#top [data-a=recap]'); return !!b && !b.hidden; });
    const PR = await listIn();
    await tapSel(page, '.dl .lastplay .lp.e'); await sleep(300);
    const PD = await panelOf(page);
    await page.evaluate(() => { const b = document.querySelector('.dl .dl-rc [data-rc=x]'); if (b) b.click(); }); await sleep(200);
    const rowsT = P => P ? P.rows.map(r => r.text).join(' ／ ') : null;
    const ok11 = !!PA && PA.rows.length === 2 && strip.n === 3 && !strip.hidden && strip.e === strip.want[0] && strip.p === strip.want[1] && linkR && rowsT(PR) === rowsT(PA) && PD && PD.n === 2;
    record('R11', size, ok11, `第 3 手重新整理：第 ${strip.n} 手、小列 ${strip.e}／${strip.p}（log 第 2 手 ${strip.want.join('／')}）；「紀錄」${linkR}；重整前後列表一樣 ${rowsT(PR) === rowsT(PA)}（${rowsT(PA)}）；點小列 → 第 ${PD && PD.n} 手`);
    // 打贏 → 領獎畫面
    const fid1 = await page.evaluate(() => window.__lab.rawDuel().e.id);
    await page.evaluate(() => window.__lab.forceWin());
    await waitScreen(page, 'reward', 15000); await sleep(1500);
    const w9 = [];
    if (!holdOn || held !== 2) w9.push(`真玩家沒停住（holdOn ${holdOn}、停 ${held}／2）`);
    const LF = await page.evaluate(() => { const F = window.__lab.run.lastFight; return F ? { n: F.log.length, eid: F.eid, cards: Object.keys(F.cards).length } : null; });
    if (!LF || LF.n !== 2 || LF.eid !== fid1) w9.push('lastFight ' + short(LF));
    const openModal = async () => { const ok = await jsClick(page, '#top [data-a=recap]'); await page.waitForSelector('.lb-modal .dl-rc', { timeout: 3000 }).catch(() => {}); await sleep(300); return ok ? panelOf(page, '.lb-modal') : null; };
    const PM = await openModal();
    if (!PM || rowsT(PM) !== rowsT(PA)) w9.push('領獎畫面的紀錄跟對決中不一樣：' + short([rowsT(PM), rowsT(PA)]));
    if (PM && (PM.scroll[0] > PM.scroll[1] + 1 || PM.rect.b > PM.vh || PM.rect.r > PM.vw)) w9.push('modal 版面 ' + short([PM.scroll, PM.rect, PM.vh]));
    await shot(page, `${size}-4-reward-list.png`);
    // 點第 1 列＝詳情；點封面＝唱片資訊
    await page.evaluate(() => document.querySelector('.lb-modal .rc-row[data-rc-n="1"]').click()); await sleep(250);
    const PMd = await panelOf(page, '.lb-modal');
    if (!PMd || PMd.view !== 'hand' || PMd.n !== 1 || !PMd.v2) w9.push('modal 點列 ' + short(PMd && { v: PMd.view, n: PMd.n }));
    await shot(page, `${size}-5-reward-detail.png`);
    await page.evaluate(() => document.querySelector('.lb-modal [data-rc-card=p]').click());
    const okI = await infoOpen(page);
    if (okI) await closeInfo(page); else w9.push('modal 點封面沒開唱片資訊');
    if (!(await page.$('.lb-modal .dl-rc'))) w9.push('關掉唱片資訊後 modal 不見了');
    await page.evaluate(() => document.querySelector('.lb-modal .dl-rc [data-rc=x]').click()); await sleep(250);
    if (await page.$('.lb-modal')) w9.push('✕ 沒關 modal');
    // 重新整理回到領獎畫面：還在
    await openTitle(page, QQ(''));
    await jsClick(page, '[data-a=cont]');
    await waitScreen(page, 'reward', 15000); await sleep(1200);
    const PM2 = await openModal();
    if (!PM2 || rowsT(PM2) !== rowsT(PA)) w9.push('重新整理後的紀錄 ' + short(rowsT(PM2)));
    await page.evaluate(() => { const b = document.querySelector('.lb-modal .dl-rc [data-rc=x]'); if (b) b.click(); }); await sleep(250);
    // 下一場打完換掉：領完獎、升級 → 來客 → 打一手 → 打贏
    await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-a=skip]'); if (b) b.click(); });
    for (let g = 0; g < 40 && (await page.evaluate(() => window.__lab.screen())) !== 'night'; g++) { await page.evaluate(() => { const b = document.querySelector('.lb-sheet.level [data-lv]'); if (b && !document.querySelector('.lb-sheet.level.arming')) b.click(); const s = document.querySelector('.lb-sheet.reward [data-a=skip]'); if (s) s.click(); }); await sleep(500); }
    await waitScreen(page, 'night'); await sleep(600);
    await jsClick(page, '[data-a=go]');
    await duelReady(page, 25000); await sleep(400);
    await playOne(page, 21);
    await waiting(page); await sleep(600);
    await tapSel(page, '.dl .dl-e .nmrow');
    await duelReady(page, 8000);
    const fid2 = await page.evaluate(() => window.__lab.rawDuel().e.id);
    await page.evaluate(() => window.__lab.forceWin());
    await waitScreen(page, 'reward', 15000); await sleep(1200);
    const LF2 = await page.evaluate(() => { const F = window.__lab.run.lastFight; return F ? { n: F.log.length, eid: F.eid } : null; });
    const PM3 = await openModal();
    if (!LF2 || LF2.n !== 1 || LF2.eid !== fid2 || !PM3 || PM3.rows.length !== 1) w9.push('下一場沒換掉：' + short([LF2, PM3 && PM3.rows.length]));
    await page.evaluate(() => { const b = document.querySelector('.lb-modal .dl-rc [data-rc=x]'); if (b) b.click(); }); await sleep(200);
    record('R9', size, !w9.length, `${w9.join('；') || 'ok'}；真玩家停住 ${held}／2；領獎畫面紀錄「${rowsT(PM)}」；下一場（${fid2}）換成 ${LF2 && LF2.n} 手`);
  } catch (e) { record('R9', size, false, 'error ' + (e && e.stack || e)); }
  await ctx.close();
  // 輸到底：最後一手照樣停住；說情那段（scene）與結算畫面頂欄都有「紀錄」
  {
    const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
    try {
      await seededContinue(page, { ace: 'hall', idx: 1, autoNext: false }, QQ(''));
      await waitScreen(page, 'night'); await sleep(500);
      await page.evaluate(() => window.__lab.loseNext(1, { noRetry: true }));
      await jsClick(page, '[data-a=go]');
      await duelReady(page, 25000); await sleep(400);
      await playOne(page, 4);
      const okW = await waiting(page);
      await sleep(800);
      const kost0 = await page.evaluate(() => !!document.querySelector('.dl .kost.on'));
      await tapSel(page, '.dl .dl-e .nmrow');
      const okSc = await waitScreen(page, 'scene', 20000);
      await sleep(600);
      const scLink = await page.evaluate(() => !!document.querySelector('#top [data-a=recap]'));
      const okEnd = await advanceUntil(page, () => window.__lab.screen() === 'end', null, 40000);
      await sleep(1200);
      const endLink = await page.evaluate(() => { const b = document.querySelector('#top [data-a=recap]'), t = document.querySelector('#top .tt'); return { has: !!b, cut: t ? t.scrollWidth > t.clientWidth + 1 : null }; });
      const ok1 = await jsClick(page, '#top [data-a=recap]');
      await page.waitForSelector('.lb-modal .dl-rc', { timeout: 3000 }).catch(() => {});
      await sleep(300);
      const PE = await panelOf(page, '.lb-modal');
      await shot(page, `${size}-7-end-list.png`);
      const ok = okW && !kost0 && okSc && scLink && okEnd && endLink.has && !endLink.cut && ok1 && PE && PE.view === 'list' && PE.rows.length === 1 && /你 −/.test(PE.rows[0].text);
      record('R9b', size, ok, `輸那手停住 ${okW}（大章 ${kost0}）→ 說情那段「紀錄」${scLink} → 結算畫面「紀錄」${endLink.has}（頂欄截斷 ${endLink.cut}）→ modal ${PE && PE.rows.map(r => r.text).join(' ／ ')}`);
    } catch (e) { record('R9b', size, false, 'error ' + e.message); }
    await ctx.close();
  }
}

// ================================================================== R7 不洩漏（一次）
async function noLeak(browser) {
  const { ctx, page } = await newPage(browser, 390, 664);
  const found = { none: 0, half: 0 }, bad = [];
  try {
    for (let s = 1; s <= 24 && (found.none < 3 || found.half < 3); s++) {
      await bootLab(page, { enemy: ['critic', 'label', 'copycat', 'skip'][s % 4], seed: s * 7, pos: 12 + (s % 9) }, '&fast=1');
      await page.evaluate(() => { window.DipLabDuel.autoplay('thoughtful'); });
      await page.waitForFunction(() => !!window.__lab.duelLab.ended, null, { timeout: 40000 }).catch(() => {});
      await sleep(200);
      const hs = await page.evaluate(() => {
        const d = window.__lab.duelLab.duel, D = window.DipLabDuel, ZH = { c: '經典', o: '冷門', h: '硬蕊' }, out = [];
        for (const L of d.log) {
          if (L.hk !== 'none' && L.hk !== 'half') continue;
          const plan = ZH[L.hint];
          if (L.hk === 'half' && !(L.bluff && L.eAttr !== L.not)) continue;   // 半指：他出了計畫色以外、又不是他說不出的那色（log.bluff＝true，但看得到的是照實）
          if (L.hk === 'none' && !L.bluff) continue;                          // 不露：他其實沒照計畫出（log.bluff＝true）
          D.recap('hand', L.n);
          const el = document.querySelector('.dl .dl-rc');
          const res = el ? el.querySelector('.rc-res').textContent : '', all = el ? el.textContent : '', html = el ? el.innerHTML : '';
          const ct = D.api().recapRows().find(r => r.n === L.n).ct;
          D.recap('list');
          const row = document.querySelector(`.dl .dl-rc .rc-row[data-rc-n="${L.n}"]`), tag = row && row.querySelector('.tg') ? row.querySelector('.tg').textContent : '';
          D.recap(false);
          // 計畫色名字只准出現在雙方真的出的屬性（規則句、屬性星）裡
          const planShown = plan !== ZH[L.eAttr] && plan !== ZH[L.pAttr] && all.includes(plan);
          out.push({ n: L.n, hk: L.hk, gotRead: ct.gotRead, res, tag, planShown, attrLeak: /data-[a-z-]*="[coh]"/.test(html), noneWords: L.hk === 'none' && !ct.gotRead && /唬|照實|看穿/.test(res), halfBluff: L.hk === 'half' && !ct.gotRead && /唬/.test(res), tagBad: !ct.gotRead && !!tag });
        }
        return out;
      });
      for (const x of hs) {
        found[x.hk]++;
        if (x.planShown || x.attrLeak || x.noneWords || x.halfBluff || x.tagBad) bad.push(x);
      }
    }
  } catch (e) { bad.push({ error: e.message }); }
  record('R7', '390x664', found.none >= 2 && found.half >= 2 && !bad.length, `不露 ${found.none} 手、半指出另一色 ${found.half} 手：${bad.length ? '洩漏 ' + short(bad) : '面板只有 clashText 的字、沒有計畫色、不露沒有唬／照實／看穿、沒有籤'}`);
  await ctx.close();
}

const browser = await launch();
try {
  for (const [w, h] of SIZES) await runSize(browser, w, h);
  if (!process.env.LAB_SKIP_R7) await noLeak(browser);
} finally { await browser.close(); }
const fails = results.filter(r => !r.ok);
console.log(`\n${results.length - fails.length}/${results.length} PASS`);
if (fails.length) { console.log(fails.map(r => `FAIL #${r.n} [${r.size}] ${r.detail}`).join('\n')); process.exit(1); }
