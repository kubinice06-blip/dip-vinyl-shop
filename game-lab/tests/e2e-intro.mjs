// game-lab/tests/e2e-intro.mjs：開頭旁白＋玻璃倒影捏人（店主 11-10 定稿；v5 第五項的前半）
//   第一次推門：黑幕 I1 → I2 → 捏人（玻璃門上的倒影，標題「玻璃上的你」、略過鈕「先隨便」）→ 序章從 O2 接下去（原本的 O1 不會出現）
//   捏過人、序章中途放棄又推門：只念 I1 就接 O2，不再捏人。?debug=1 預設不演（既有 e2e 從 O2 開始），&intro=1 才演。
//   node tests/e2e-intro.mjs（LAB_SIZES 換尺寸；OUT=資料夾 另存 2 倍截圖給店主看）
import fs from 'fs';
import path from 'path';
import { launch, newPage, openTitle, Q, SIZES, record, results, sleep, noScroll, scrollOk } from './e2e-lib.mjs';

const OUT = process.env.OUT || '';
const I1 = '雨下個不停。巷子深處，有人輕輕推開那扇半掩的門，門上的鈴鐺清脆一響，隨即被雨聲吞沒。';
const I2 = '玻璃門晃了晃，映出推門的人。';
const O1 = '下著雨。你推開';

const lineOf = page => page.evaluate(() => { const v = document.querySelector('.lb-intro'); return v ? { id: v.getAttribute('data-line'), text: (v.querySelector('.tx') || {}).textContent || '', edit: v.classList.contains('edit') } : null; });
const waitLine = (page, id, ms = 4000) => page.waitForFunction(i => { const v = document.querySelector('.lb-intro'); return v && v.getAttribute('data-line') === i && !v.classList.contains('edit'); }, id, { timeout: ms }).then(() => true, () => false);
const waitBeat = (page, id, ms = 8000) => page.waitForFunction(i => window.__lab && window.__lab.screen() === 'scene' && window.__lab.beat === i, id, { timeout: ms }).then(() => true, () => false);
const inView = (page, sel) => page.evaluate(s => { const e = document.querySelector(s); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.top >= 0 && r.left >= 0 && r.bottom <= innerHeight + 0.5 && r.right <= innerWidth + 0.5; }, sel);
// 整段都不准出現原本的 O1（店主 11-10：內容已經在旁白裡）
const watchO1 = page => page.evaluate(o1 => { window.__sawO1 = false; new MutationObserver(() => { if ((document.body.textContent || '').includes(o1)) window.__sawO1 = true; }).observe(document.body, { subtree: true, childList: true, characterData: true }); }, O1);
const shot = async (page, name, w, h) => { if (!OUT) return; fs.mkdirSync(OUT, { recursive: true }); await page.screenshot({ path: path.join(OUT, name + '-' + w + 'x' + h + '.png') }); };

async function oneSize(browser, w, h) {
  const tag = w + 'x' + h;
  const { ctx, page } = await newPage(browser, w, h, { dpr: OUT ? 2 : 1 });
  await openTitle(page, Q('&fast=1&intro=1'));
  await watchO1(page);
  // 1. 推門 → 黑幕 I1
  await page.click('[data-a=push]');
  const ok1 = await waitLine(page, 'I1', 3000);
  const l1 = await lineOf(page);
  record('I1 黑幕旁白', tag, ok1 && l1.text === I1, l1 ? l1.text.slice(0, 16) + '…' : '沒有黑幕');
  await sleep(900); await shot(page, 'intro-1', w, h);
  // 2. 點一下 → I2
  await page.click('.lb-intro');
  const ok2 = await waitLine(page, 'I2', 3000);
  const l2 = await lineOf(page);
  record('I2 玻璃門晃了晃', tag, ok2 && l2.text === I2, l2 ? l2.text : '沒有 I2');
  await sleep(500);
  // 3. 點一下 → 玻璃倒影捏人
  await page.click('.lb-intro');
  const edOk = await page.waitForSelector('.lb-intro .ce.ce-glass', { state: 'visible', timeout: 3000 }).then(() => true, () => false);
  const ed = await page.evaluate(() => ({ ttl: (document.querySelector('.ce-ttl') || {}).textContent, skip: (document.querySelector('.ce-skip') || {}).textContent, tabs: document.querySelectorAll('.ce-tab').length }));
  record('捏人＝玻璃上的你', tag, edOk && ed.ttl === '玻璃上的你' && ed.skip === '先隨便' && ed.tabs === 7, JSON.stringify(ed));
  await sleep(700); await shot(page, 'intro-glass', w, h);
  const sc = await noScroll(page);
  const vis = (await inView(page, '.ce-skip')) && (await inView(page, '.ce-done')) && (await inView(page, '.ce-rand'));
  record('捏人不捲、鈕都在畫面裡', tag, scrollOk(sc) && vis, JSON.stringify(sc) + ' 鈕 ' + vis);
  // 倒影真的有畫（舞台不是全黑／全白）
  const px = await page.evaluate(() => { const c = document.querySelector('.ce-cv'); if (!c) return null; const g = c.getContext('2d'), d = g.getImageData(0, 0, c.width, c.height).data; let n = 0, s = 0; for (let i = 0; i < d.length; i += 400) { s += d[i] + d[i + 1] + d[i + 2]; n++; } return Math.round(s / n / 3); });
  record('玻璃舞台有畫', tag, px != null && px > 20 && px < 200, '平均亮度 ' + px);
  // 4. 換一款再「完成」→ 黑幕淡出 → 序章 O2
  await page.click('.ce-tab[data-tab=hat]'); await sleep(150);
  await page.evaluate(() => { const b = [...document.querySelectorAll('.ce-opt')].find(x => !x.classList.contains('on')); if (b) b.click(); });
  const want = await page.evaluate(() => JSON.stringify(window.__lab.save.player && window.__lab.save.player.avatar));
  await page.click('.ce-done');
  const o2 = await waitBeat(page, 'O2', 8000);
  await sleep(900);
  const after = await page.evaluate(() => ({ veil: !!document.querySelector('.lb-intro'), glass: !!window.__lab.save.seen.glass, av: JSON.stringify(window.__lab.save.player.avatar), o1: window.__sawO1 }));
  record('完成 → 序章 O2（沒有 O1）', tag, o2 && !after.veil && after.glass && !after.o1 && after.av !== want, JSON.stringify({ o2, ...after, av: undefined, changed: after.av !== want }));
  await shot(page, 'intro-o2', w, h);
  // 5. 重新整理再推門（序章還沒打完）：只念 I1，不再捏人
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-a=push]', { state: 'visible', timeout: 8000 });
  await sleep(600); await watchO1(page);
  await page.click('[data-a=quiet]');
  const r1 = await waitLine(page, 'I1', 3000);
  await sleep(800); await page.click('.lb-intro');
  const r2 = await waitBeat(page, 'O2', 8000);
  const again = await page.evaluate(() => ({ ce: !!document.querySelector('.ce'), o1: window.__sawO1 }));
  record('再推門只念 I1、不捏人', tag, r1 && r2 && !again.ce && !again.o1, JSON.stringify({ r1, r2, ...again }));
  const errs = page._errors.filter(e => !/Failed to load resource/.test(e));
  record('主控台 0 錯誤', tag, !errs.length, errs.slice(0, 3).join(' | ') || '0');
  await ctx.close();
}

// 「先隨便」：不動就略過＝網站上的小人（這裡塞一個 dip-character 存檔），也會接 O2；不點旁白也會自己走（閱讀時間）
async function skipAndAuto(browser) {
  const [w, h] = SIZES[0], tag = w + 'x' + h + ' 先隨便';
  const { ctx, page } = await newPage(browser, w, h);
  // 網站上捏過的小人（dip-character 的樂歷存檔，舊格式）：捏人預設就是它
  await page.addInitScript(() => { try { if (!localStorage.getItem('dipGameLab_v1')) localStorage.setItem('dipRogueMeta_v2', JSON.stringify({ name: '阿明', avatar: { head: 'beanie', hair: 'long', shirt: 'red', pants: 'jeans', skin: 'tan' } })); } catch (_) {} });
  await openTitle(page, Q('&fast=1&intro=1'));
  const site = await page.evaluate(() => { try { return window.DipChar && window.DipChar.load ? JSON.stringify(window.DipChar.load()) : null; } catch (_) { return null; } });
  await page.click('[data-a=quiet]');
  const t0 = Date.now();
  const auto1 = await waitLine(page, 'I2', 6000);
  const auto2 = await page.waitForSelector('.lb-intro .ce', { state: 'visible', timeout: 6000 }).then(() => true, () => false);
  record('不點也會自己走', tag, auto1 && auto2, '到捏人 ' + Math.round((Date.now() - t0) / 100) / 10 + ' 秒（fast=1）');
  const N = () => { const o = window.DipLabChars.normalize(window.__lab.save.player.avatar); return JSON.stringify(o, Object.keys(o).sort()); };   // 欄位順序不算
  const before = await page.evaluate(N);
  const fromSite = await page.evaluate(() => { const o = window.DipLabChars.normalize(window.DipChar.load().avatar); return JSON.stringify(o, Object.keys(o).sort()); });
  await page.keyboard.press('Escape');                       // Esc＝先隨便
  const o2 = await waitBeat(page, 'O2', 8000);
  const after = await page.evaluate(() => { const o = window.DipLabChars.normalize(window.__lab.save.player.avatar); return { av: JSON.stringify(o, Object.keys(o).sort()), glass: !!window.__lab.save.seen.glass }; });
  record('先隨便 → 網站上的小人、接 O2', tag, o2 && after.glass && after.av === before && before === fromSite, '網站小人 ' + (site ? '有' : '沒有') + '；預設＝網站小人 ' + (before === fromSite) + '；外觀沒變 ' + (after.av === before));
  await ctx.close();
}

// ?debug=1 沒給 intro=1：不演（既有 e2e 的前提）
async function noIntroInDebug(browser) {
  const [w, h] = SIZES[0], tag = w + 'x' + h + ' debug';
  const { ctx, page } = await newPage(browser, w, h);
  await openTitle(page, Q('&fast=1'));
  await page.click('[data-a=quiet]');
  const o2 = await waitBeat(page, 'O2', 6000);
  const veil = await page.evaluate(() => !!document.querySelector('.lb-intro'));
  record('debug 預設不演旁白', tag, o2 && !veil, 'O2 ' + o2 + '、黑幕 ' + veil);
  await ctx.close();
}

const browser = await launch();
try {
  for (const [w, h] of SIZES) await oneSize(browser, w, h);
  await skipAndAuto(browser);
  await noIntroInDebug(browser);
} finally { await browser.close(); }
const bad = results.filter(r => !r.ok);
console.log('\n開頭旁白 e2e：' + (results.length - bad.length) + '／' + results.length + ' 通過');
if (bad.length) { bad.forEach(r => console.log('  ✗ ' + r.n + ' ' + r.size + '：' + r.detail)); process.exit(1); }
