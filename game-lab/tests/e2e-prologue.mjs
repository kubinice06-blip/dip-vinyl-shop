// game-lab/tests/e2e-prologue.mjs：序章時間軸（SPEC-v4 §5.4，B2；R-x1 的時間軸驗收＋D §3 走位）。
//
//   LAB_BASE=http://localhost:8782 node game-lab/tests/e2e-prologue.mjs      # 預設 390×664、速度 1（不加 fast=1）、?strict=1
//
// 三輪：
//   C「點一下／⏩」：O11 老闆走去 dig1 的途中點一下 → 50 ms 內那一步到終點、下一步（翻箱）才開始；⏩ 依序快轉、停在 O12（P5）
//   A「一直點」：有聲音、每 100 ms 點一下對話框、猜中；推門 → O21 選單 ≤35 秒（P10）、音樂（P12）
//   B「完全不點」：安靜推門、只在選擇的 ▼ 亮時點一下打開面板、猜錯；位移不瞬移（P7）
// A、B 都：每 40 ms 取樣（對話框字數、▼、三人位置、.lb-fly、包包條格數、門、遇敵特效、老闆姿勢）＋逐句執行器的 UI.timeline＋舞台呼叫紀錄；
//   打到男子那場就 __lab.forceWin()，接著演收尾 E1–E11，到今晚來客為止。斷言 P1–P4、P6–P9、P11、P13（§5.4 表）。
// 經濟介面用替身（tests/econ-stub.js：bargainPick 直接挑前三張）；試聽一律換成 20 秒的無聲 WAV（不靠網路，P12 才測得準）。
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { launch, newPage, sleep, URL0 } from './e2e-lib.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const LAB = path.resolve(HERE, '..');
const require = createRequire(import.meta.url);
const C = require(path.join(LAB, 'content.js'));
const E = require(path.join(LAB, 'engine.js'));
const L = JSON.parse(fs.readFileSync(path.join(LAB, 'shops', 'dip.json'), 'utf8'));
const STUB = fs.readFileSync(path.join(HERE, 'econ-stub.js'), 'utf8');
const SEED = process.env.LAB_SEED || '20261106';
const [W, H] = (process.env.LAB_SIZE || '390x664').split('x').map(Number);
const TIERS = ['hall', 'pearl', 'heresy'];
const TONIGHT_TIER = TIERS[E.fnv1a32(SEED + '#tonight') % 3];
const TONIGHT = C.aces[TONIGHT_TIER];
const SP = L.spots;
const ONLY = (process.env.LAB_RUNS || 'C,A,B').split(',');

let fails = 0, passes = 0;
const check = (id, ok, detail) => { if (ok) passes++; else fails++; console.log((ok ? 'PASS' : 'FAIL') + '  ' + id + '  ' + detail); return ok; };
const dist = (a, b) => Math.hypot(a.x - b[0], a.y - b[1]);

// 無聲 WAV（8 kHz、單聲道、16 bit；試聽一律換成它）
function silentWav(sec = 1, rate = 8000) {
  const n = sec * rate, b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVE', 8); b.write('fmt ', 12); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(rate, 24); b.writeUInt32LE(rate * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40);
  return b;
}
const WAV = silentWav(20);   // 20 秒：比序章到 O11 的時間長（短的話放完會被外殼「接著放」再 play 一次，雖然是同一張）

// 頁面裡的量測：舞台呼叫紀錄（pose／hold／door／walk／finish／put／floorRecord／hide）、音樂呼叫、取樣器、對話框字的變化
function instrument() {
  window.__log = []; window.__pose = {}; window.__hold = {}; window.__S = []; window.__txt = []; window.__music = [];
  const t0 = () => Date.now();
  const pos = id => { try { const p = window.__lab.stage.pos(id); return p ? { x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10, h: !!p.hidden, out: !!p.outside } : null; } catch (_) { return null; } };
  const wrapStage = () => {
    const st = window.__lab && window.__lab.stage; if (!st || st.__wrapped) return !!st;
    st.__wrapped = true;
    ['pose', 'hold', 'door', 'walk', 'finish', 'put', 'floorRecord', 'hide'].forEach(m => {
      const f = st[m]; if (typeof f !== 'function') return;
      st[m] = function () {
        const a = [].slice.call(arguments);
        if (m === 'pose') window.__pose[a[0]] = a[1] || null;
        if (m === 'finish') window.__pose[a[0]] = null;
        if (m === 'hold') window.__hold[a[0]] = a[1] || null;
        window.__log.push({ t: t0(), m, a: JSON.parse(JSON.stringify(a.map(x => typeof x === 'function' ? 'fn' : x))), f: pos('f'), o: pos('o'), p: pos('p'), beat: window.__lab.beat });
        return f.apply(this, arguments);
      };
    });
    return true;
  };
  const wrapMusic = () => {
    const M = window.DipLabFx && window.DipLabFx.music; if (!M || M.__wrapped) return !!M;
    M.__wrapped = true;
    const play = M.play, stop = M.stop;
    M.play = function (c, o) { window.__music.push({ t: t0(), m: 'play', id: c && c.id, o: o || null, beat: window.__lab && window.__lab.beat }); return play.apply(this, arguments); };
    M.stop = function (o) { window.__music.push({ t: t0(), m: 'stop', o: o || null, beat: window.__lab && window.__lab.beat }); return stop.apply(this, arguments); };
    return true;
  };
  let lastTxt = null;
  const sample = () => {
    if (!window.__lab) return;
    wrapStage(); wrapMusic();
    const dq = document.querySelector('.lb-dq'), tx = dq && dq.querySelector('.tx'), nx = dq && dq.querySelector('.nx');
    const shop = window.__lab.stage && window.__lab.stage.shop;
    const M = window.DipLabFx && window.DipLabFx.music, cur = M && M.current && M.current();
    const sheet = document.querySelector('#panel > .lb-sheet');
    window.__S.push({
      t: t0(), scr: window.__lab.screen(), beat: window.__lab.beat, txt: tx ? tx.textContent.length : -1,
      nx: !!(nx && nx.classList.contains('on')), choice: !!(nx && nx.classList.contains('choice')),
      p: pos('p'), o: pos('o'), f: pos('f'), r1: pos('r1'),
      fly: document.querySelectorAll('.lb-fly').length, strip: document.querySelectorAll('.lb-strip .slot.filled').length,
      door: shop && shop.state ? shop.state.door : null, enc: !!document.querySelector('.enc2,.enc-ov,.rpg-excl'),
      sheet: sheet ? sheet.className : null, menu: document.querySelectorAll('.lb-dq .lb-dqopt').length,
      oPose: window.__pose.o || null, oHold: window.__hold.o ? 1 : 0, music: cur ? cur.id : null
    });
    const t = tx ? tx.textContent : null;
    if (t !== lastTxt) { lastTxt = t; window.__txt.push({ t: t0(), beat: window.__lab.beat, text: t }); }
  };
  window.__sampler = setInterval(sample, 40);
  document.addEventListener('DOMContentLoaded', () => {
    const mo = new MutationObserver(sample);
    const hook = () => { const p = document.getElementById('panel'); if (p) mo.observe(p, { subtree: true, childList: true, characterData: true }); else setTimeout(hook, 50); };
    hook();
  });
}

// 頁面裡的駕駛：答面板、點選擇的 ▼（或一直點）、對決 forceWin、到今晚來客就停
function driver(o) {
  window.__drv = { done: false, tapped: 0, pushAt: 0, menuAt: 0, guessed: null, won: false, steps: [] };
  const D = window.__drv, seen = {};
  const q = s => document.querySelector(s);
  const after = (key, ms) => { if (!seen[key]) seen[key] = Date.now(); return Date.now() - seen[key] >= ms; };
  const clear = key => { delete seen[key]; };
  const click = (sel, why) => { const e = q(sel); if (!e) return false; e.click(); D.steps.push([Date.now(), why || sel]); return true; };
  setInterval(() => {
    if (D.done || !window.__lab) return;
    const scr = window.__lab.screen();
    if (scr === 'night') { if (!D.nightAt) D.nightAt = Date.now(); if (Date.now() - D.nightAt > 2500) D.done = true; return; }
    if (scr === 'duel') {
      if (!D.won && window.__lab.rawDuel() && !window.__lab.going() && after('duel', 600)) { D.won = true; D.steps.push([Date.now(), 'forceWin']); window.__lab.forceWin(); }
      return;
    }
    if (scr !== 'scene') return;
    const sheet = q('#panel > .lb-sheet');
    if (sheet) {
      const k = sheet.className;
      if (!after('sheet:' + k, o.answerMs)) return;
      clear('sheet:' + k);
      if (/\bguess\b/.test(k)) {
        const right = o.guess === 'right';
        const tiles = [...sheet.querySelectorAll('.lb-ct')];
        const t = tiles.find(x => (x.getAttribute('data-cid') === o.tonight) === right);
        D.guessed = t && t.getAttribute('data-cid');
        if (t) { t.querySelector('[data-pick]').click(); D.steps.push([Date.now(), 'guess ' + D.guessed]); }
      } else if (/\bacepick\b/.test(k)) click('#panel > .lb-sheet [data-a=ok]', 'acePick');
      else if (/\brecs\b/.test(k)) click('#panel > .lb-sheet [data-a=ok]', 'recs');
      else if (/\bone\b/.test(k)) click('#panel > .lb-sheet [data-i="0"]', 'stake');
      else if (/\brelics\b/.test(k)) click('#panel > .lb-sheet [data-r]', 'relic');
      return;
    }
    const menu = document.querySelectorAll('.lb-dq .lb-dqopt');
    if (menu.length) {
      if (!D.menuAt) D.menuAt = Date.now();
      if (after('menu', o.answerMs)) { clear('menu'); click('.lb-dq .lb-dqopt[data-i="' + (menu.length > 1 ? o.duelBtn : 0) + '"]', 'duel menu'); }
      return;
    }
    const nx = q('.lb-dq .nx');
    if (o.tapEvery) {
      if (Date.now() - (D.lastTap || 0) >= o.tapEvery) { D.lastTap = Date.now(); D.tapped++; q('.lb-dq') && q('.lb-dq').click(); }
    } else if (nx && nx.classList.contains('on') && nx.classList.contains('choice')) {
      if (after('choice', o.answerMs)) { clear('choice'); D.tapped++; click('.lb-dq', 'open ui'); }
    } else clear('choice');
  }, 20);
}

async function openPage(browser, extra) {
  const { ctx, page } = await newPage(browser, W, H);
  await page.route(/\/game-lab\/econ\.js(\?|$)/, r => r.fulfill({ contentType: 'application/javascript', body: STUB }));
  await page.route(/\/game-lab\/econ\.css(\?|$)/, r => r.fulfill({ contentType: 'text/css', body: '' }));
  await page.route(/^https:\/\/audio-ssl\.itunes\.apple\.com\//, r => r.fulfill({ status: 200, contentType: 'audio/wav', headers: { 'access-control-allow-origin': '*' }, body: WAV }));
  await page.addInitScript(instrument);
  await page.goto(URL0 + '?debug=1&strict=1&seed=' + SEED + (extra || ''), { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-a=push]', { state: 'visible', timeout: 10000 });
  await page.waitForFunction(() => !document.body.classList.contains('stage-wait') && window.__lab && window.__lab.stage, null, { timeout: 8000 }).catch(() => {});
  await sleep(600);
  return { ctx, page };
}
const errorsOf = page => page._errors.filter(e => !/Failed to load resource/.test(e));

// 依 C.script 展開「應該出現的字」（套猜中／猜錯分支、今晚那張的兩句描述）
function expectedTexts(guess) {
  const flags = { guessRight: guess === 'right', guessWrong: guess !== 'right' };
  return C.script.prologue.concat(C.script.epilogueWin).filter(b => !b.if || flags[b.if]).map(b => ({ id: b.id, text: typeof b.text === 'object' ? b.text[TONIGHT_TIER] : b.text }));
}

// ---------------------------------------------------------------------------------------------- 一輪 A／B
async function fullRun(browser, mode) {
  const tap = mode === 'A';
  const label = tap ? 'A 一直點' : 'B 完全不點';
  const { ctx, page } = await openPage(browser);
  const opt = { tapEvery: tap ? 100 : 0, answerMs: 350, guess: tap ? 'right' : 'wrong', tonight: TONIGHT, duelBtn: 1 };
  await page.evaluate(driver, opt);
  const t0 = Date.now();
  await page.click(tap ? '[data-a=push]' : '[data-a=quiet]');
  const pushAt = Date.now();
  const ok = await page.waitForFunction(() => window.__drv && window.__drv.done, null, { timeout: tap ? 120000 : 420000, polling: 250 }).then(() => true, () => false);
  const data = await page.evaluate(() => ({ S: window.__S, log: window.__log, tl: window.__lab.timeline(), txt: window.__txt, music: window.__music, drv: window.__drv, run: window.__lab.run && { bag: window.__lab.run.bag.length, inside: window.__lab.run.shop.firstGuestInside } }));
  const errs = errorsOf(page);
  await ctx.close();
  console.log('--- ' + label + '：' + (ok ? '跑到今晚來客' : '沒跑完') + '（' + Math.round((Date.now() - t0) / 1000) + ' 秒；取樣 ' + data.S.length + '、時間軸 ' + data.tl.length + '、舞台呼叫 ' + data.log.length + '、點了 ' + data.drv.tapped + ' 下）');
  check(label + ' 跑完', ok, '推門 → 序章 → 男子 → 收尾 → 今晚來客');
  check(label + ' 主控台', !errs.length, errs.length ? errs.slice(0, 5).join(' | ') : '0 錯誤（含 [shop] no route；?strict=1）');
  if (!ok) return;
  const S = data.S, TL = data.tl, LOG = data.log;
  const ev = (beat, e) => TL.find(x => x.beat === beat && x.ev === e);
  const evAll = (beat, e) => TL.filter(x => x.beat === beat && x.ev === e);

  // P1：O14 的 act 開始前（＝pre 做完）包包條一律 0 格
  const o14pre = ev('O14', 'pre');
  const beforeGive = S.filter(s => s.t < o14pre.t);
  check('P1 ' + label, o14pre && beforeGive.every(s => s.strip === 0 || s.scr !== 'scene'), 'O14 act 前包包條 0 格（最多 ' + Math.max(0, ...beforeGive.map(s => s.strip)) + ' 格，取樣 ' + beforeGive.length + '）');
  // P2：第一張封面起飛時老闆離 counter ≤4、你離 pay ≤4；最後一張落位前 ▼ 不亮
  const fly0 = S.find(s => s.fly > 0);
  if (fly0) check('P2 ' + label + ' 起飛位置', dist(fly0.o, SP.counter) <= 4 && dist(fly0.p, SP.pay) <= 4, '老闆離 counter ' + dist(fly0.o, SP.counter).toFixed(1) + '、你離 pay ' + dist(fly0.p, SP.pay).toFixed(1));
  else check('P2 ' + label + ' 起飛位置', tap, tap ? '一直點：封面飛的那一下就被點到終點（取樣沒抓到飛行中，改看 ▼）' : '完全不點卻沒看到任何 .lb-fly');
  const o14 = S.filter(s => s.beat === 'O14');
  const badNext = o14.filter(s => s.nx && s.strip < 8);
  check('P2 ' + label + ' ▼', o14.length && !badNext.length, 'O14 的 ▼ 只在 8 格都落位後才亮（違反 ' + badNext.length + '）');
  if (!tap) {
    let jump = 0; for (let i = 1; i < o14.length; i++) jump = Math.max(jump, o14[i].strip - o14[i - 1].strip);
    check('P2 ' + label + ' 一張一張', jump <= 2, '包包條每次取樣最多多 ' + jump + ' 格（不會一次亮 8 格）');
  }
  // P3：O17 開始到 O21 選單出現，p、f 都不在 duelP／duelE 40 格內
  const t17 = ev('O17', 'start').t, t21 = (S.find(s => s.menu > 0) || {}).t;
  const mid = S.filter(s => s.t >= t17 && s.t <= t21);
  const near = mid.filter(s => ['p', 'f'].some(k => s[k] && !s[k].h && (dist(s[k], SP.duelP) < 40 || dist(s[k], SP.duelE) < 40)));
  check('P3 ' + label, t21 && mid.length > 3 && !near.length, '嗆聲在後走道：O17→O21 選單 ' + mid.length + ' 個取樣，靠近唱盤的 ' + near.length);
  // P4：每一句 ▼ 亮的時間 ≥ 那句所有 walk 的結束時間
  let p4bad = [];
  for (const nx of TL.filter(x => x.ev === 'next')) {
    const walks = TL.filter(x => x.beat === nx.beat && x.ev === 'step' && /^walk/.test(x.step) && x.t <= nx.t + 5000);
    const lastWalk = Math.max(0, ...walks.filter(w => w.t <= nx.t + 1000).map(w => w.t));
    if (lastWalk > nx.t) p4bad.push(nx.beat);
    // 走路在 ▼ 之後才結束的不准有
    if (TL.some(x => x.beat === nx.beat && x.ev === 'step' && /^walk/.test(x.step) && x.t > nx.t && x.t < nx.t + 20000 && TL.indexOf(x) > TL.indexOf(nx) && !TL.slice(TL.indexOf(nx) + 1, TL.indexOf(x)).some(y => y.ev === 'start'))) p4bad.push(nx.beat + '（▼ 之後還在走）');
  }
  check('P4 ' + label, !p4bad.length, '▼ 一律在 walk 做完之後（' + TL.filter(x => x.ev === 'next').length + ' 句）' + (p4bad.length ? '；不對：' + p4bad.join('、') : ''));
  // P6：三人到 duelE／duelP／ref（±1）之後，遇敵特效才出現
  const enc0 = S.find(s => s.enc);
  check('P6 ' + label, enc0 && dist(enc0.p, SP.duelP) <= 1 && dist(enc0.f, SP.duelE) <= 1 && dist(enc0.o, SP.ref) <= 1,
    enc0 ? '特效出現時：你離 duelP ' + dist(enc0.p, SP.duelP).toFixed(1) + '、他離 duelE ' + dist(enc0.f, SP.duelE).toFixed(1) + '、老闆離 ref ' + dist(enc0.o, SP.ref).toFixed(1) : '沒看到遇敵特效');
  // P7：位置不在家具腳下範圍內；完全不點時，相鄰取樣位移 ≤ 速度×dt＋1（put 那一刻除外）
  const inFurn = await (async () => {
    const b = await launch(); const { ctx: c2, page: p2 } = await newPage(b, 200, 200);
    await p2.goto(URL0.replace(/index\.html.*$/, 'mock.html')).catch(() => {});
    await p2.addScriptTag({ url: URL0.replace(/index\.html.*$/, 'shop.js') }); await p2.addScriptTag({ url: URL0.replace(/index\.html.*$/, 'shop-props.js') });
    const pts = []; for (const s of S) for (const k of ['p', 'o', 'f']) if (s[k] && !s[k].h && !s[k].out) pts.push([s[k].x, s[k].y, k, s.beat, s.t]);
    const r = await p2.evaluate(([L, pts]) => { const fp = window.DipShop.footprints(L); return pts.filter(q => fp.some(f => window.DipShop.inObs([q[0], q[1]], f))).slice(0, 8); }, [L, pts]);
    await c2.close(); await b.close(); return r;
  })();
  check('P7 ' + label + ' 不在家具裡', !inFurn.length, inFurn.length ? '站在家具裡：' + inFurn.map(q => q[2] + '@' + q[0] + ',' + q[1] + '（' + q[3] + '）').join(' ') : '每個取樣的人都不在家具腳下範圍裡');
  if (!tap) {
    const puts = LOG.filter(x => x.m === 'put').map(x => x.t);
    const VMAX = 54 * (L.walkK || 2) / 1000;   // 格／毫秒（序章 1.5 倍速；duelIn 不走，prewalked）
    let worst = null;
    for (let i = 1; i < S.length; i++) for (const k of ['p', 'o', 'f']) {
      const a = S[i - 1][k], b = S[i][k]; if (!a || !b || a.h || b.h || a.out !== b.out || b.out) continue;
      if (puts.some(t => t > S[i - 1].t - 5 && t <= S[i].t + 5)) continue;
      if (S[i].scr !== S[i - 1].scr) continue;
      // 像素店約 10 fps 才更新一次位置（shop.js loop：兩格之間 ≥95 ms，一格最多算 0.2 秒），所以取樣看到的是一格一格的跳：
      // 上限＝走路速度 ×（取樣間隔＋一格最長 200 ms）＋1 格。真的瞬移（put 到別的站位）遠大於這個
      const d = Math.hypot(b.x - a.x, b.y - a.y), lim = VMAX * (S[i].t - S[i - 1].t + 200) + 1;
      if (d > lim && (!worst || d - lim > worst.over)) worst = { k, d: d.toFixed(1), lim: lim.toFixed(1), over: d - lim, beat: S[i].beat, scr: S[i].scr };
    }
    check('P7 ' + label + ' 沒有瞬移', !worst, worst ? '瞬移：' + JSON.stringify(worst) : '相鄰取樣位移都 ≤ 走路速度×dt＋1 格');
  }
  // P8：老闆 dig 的取樣，位置跟前一次取樣相同
  let digMoves = 0, digN = 0;
  for (let i = 1; i < S.length; i++) if (S[i].oPose === 'dig' && S[i - 1].oPose === 'dig') { digN++; if (dist(S[i].o, [S[i - 1].o.x, S[i - 1].o.y]) > 0.5) digMoves++; }
  check('P8 ' + label, digN > (tap ? 0 : 10) && !digMoves, '老闆翻箱時不動（dig 取樣 ' + digN + '，有移動的 ' + digMoves + '）');
  // P9：E4 門第一次 swing 的那一刻，男子在 door ±2 格；之後他藏起來，duelE 上有地上的唱片直到撿起面板關掉
  const e4s = ev('E4', 'start'), e5s = ev('E5', 'start');
  const swing = LOG.find(x => x.m === 'door' && x.a[0] === 'swing' && x.t >= e4s.t);
  const floorOn = LOG.find(x => x.m === 'floorRecord' && x.a[0] === 'duelE' && x.t >= e4s.t);
  const floorOff = LOG.find(x => x.m === 'floorRecord' && x.a[0] === null && x.t >= e4s.t);
  const stakeOpen = S.find(s => s.t >= e4s.t && s.sheet && /\bone\b/.test(s.sheet)), stakeClose = stakeOpen && S.find(s => s.t > stakeOpen.t && !s.sheet);
  check('P9 ' + label + ' 門', swing && dist(swing.f, SP.door) <= 2, swing ? '門晃的時候他離門口 ' + dist(swing.f, SP.door).toFixed(1) + ' 格' : '沒有 door swing');
  check('P9 ' + label + ' 地上的唱片', floorOn && swing && floorOn.t <= swing.t && stakeOpen && floorOff && floorOff.t >= stakeOpen.t && floorOff.t <= e5s.t && stakeClose && Math.abs(floorOff.t - stakeClose.t) < 200,
    '地上的盤：E4 一開始放上 duelE、撿起面板關掉才收（' + (floorOff && stakeClose ? (floorOff.t - stakeClose.t) + ' ms' : '缺') + '）');
  const afterE4 = S.filter(s => s.t > (stakeOpen ? stakeOpen.t : Infinity) && s.t < ev('E9', 'start').t);
  check('P9 ' + label + ' 他走了', afterE4.length && afterE4.every(s => !s.f || s.f.h), '撿起面板打開後到 E9，他一直是藏著的');
  const stakeHd = await Promise.resolve(S.find(s => s.sheet && /\bone\b/.test(s.sheet)));
  check('P9 ' + label + ' 面板沒有標題', stakeHd && /\bnotitle\b/.test(stakeHd.sheet), '撿起面板沒有敘述標題（' + (stakeHd && stakeHd.sheet) + '）');
  // P11：熟客 r1 在序章與收尾一直是隱藏；今晚來客畫面出現
  const pro = S.filter(s => s.scr === 'scene' || s.scr === 'duel'), night = S.filter(s => s.scr === 'night');
  check('P11 ' + label, pro.length && pro.every(s => !s.r1 || s.r1.h) && night.length && night[night.length - 1].r1 && !night[night.length - 1].r1.h, '序章與收尾藏著（' + pro.filter(s => s.r1 && !s.r1.h).length + ' 個取樣露出來）、今晚來客出現');
  // 今晚來客：第一位客人已經在店裡（門邊、不剪影）、包包 8 張
  const last = night[night.length - 1];
  check(label + ' 今晚來客', data.run && data.run.inside && last.f && !last.f.h && dist(last.f, SP.atdoor) <= 1 && data.run.bag === 8, '第一位在 atdoor、包包 ' + (data.run && data.run.bag) + ' 張');
  // P13：劇本逐字（讀 .lb-dq .tx 打完的字；順序＝依 C.script 展開）
  const want = expectedTexts(opt.guess);
  const shown = [];
  for (const x of data.txt) { if (!x.text) continue; const lastS = shown[shown.length - 1]; if (lastS && x.text.startsWith(lastS.text)) { lastS.text = x.text; lastS.beat = lastS.beat || x.beat; } else if (!lastS || !lastS.text.startsWith(x.text)) shown.push({ beat: x.beat, text: x.text }); }
  const gotT = shown.map(x => x.text);
  let p13 = want.length === gotT.length ? -1 : Math.min(want.length, gotT.length);
  for (let i = 0; i < Math.min(want.length, gotT.length); i++) if (want[i].text !== gotT[i]) { p13 = i; break; }
  check('P13 ' + label + '（' + (opt.guess === 'right' ? '猜中' : '猜錯') + '）', p13 < 0, p13 < 0 ? '序章＋收尾 ' + want.length + ' 句逐字一致（今晚那張：' + TONIGHT_TIER + '）' :
    '第 ' + (p13 + 1) + ' 句不一樣：要「' + (want[p13] || {}).text + '」，是「' + gotT[p13] + '」（共 ' + gotT.length + '／' + want.length + '）');
  if (tap) {
    // P10：推門到 O21 選單 ≤35 秒；▼ 亮著但點了沒反應的空檔每一段 ≤0.3 秒
    const menuAt = data.drv.menuAt;
    check('P10 一直點 時間', menuAt && menuAt - pushAt <= 35000, '推門到 O21 選單 ' + ((menuAt - pushAt) / 1000).toFixed(1) + ' 秒（≤35）');
    let run = 0, worst = 0;
    for (let i = 1; i < S.length; i++) { if (S[i].nx && S[i - 1].nx && S[i].scr === 'scene' && S[i].beat === S[i - 1].beat) { run += S[i].t - S[i - 1].t; worst = Math.max(worst, run); } else run = 0; }
    check('P10 一直點 ▼ 空檔', worst <= 300, '▼ 亮著、一直點卻沒反應的最長一段 ' + worst + ' ms（≤300）');
    // P12：音樂（有聲）
    const M = data.music, o4 = ev('O4', 'start'), o10next = ev('O10', 'next'), o11 = ev('O11', 'start');
    const play0 = M.find(x => x.m === 'play');
    check('P12 O4 開始播', play0 && play0.id === TONIGHT && play0.t - o4.t < 2500 && S.some(s => s.t >= o4.t && s.t <= o4.t + 2500 && s.music === TONIGHT), 'O4 開始 ' + (play0 ? (play0.t - o4.t) + ' ms 後播 ' + play0.id : '沒播') + '，2.5 秒內 current() 是今晚那張');
    const playsBefore11 = M.filter(x => x.m === 'play' && x.t < o11.t);
    const other = playsBefore11.filter(x => x.id !== TONIGHT);
    check('P12 不換歌', playsBefore11.length >= 1 && !other.length && S.filter(s => s.t >= play0.t + 2500 && s.t < o11.t).every(s => s.music === TONIGHT),
      '猜歌面板、挑王牌都不換歌（O11 之前 play ' + playsBefore11.length + ' 次、別張 ' + other.length + ' 次；current() 一直是今晚那張）');
    const at10 = S.filter(s => s.beat === 'O10' && s.nx);
    check('P12 O10 還在播', o10next && at10.length && at10.every(s => s.music === TONIGHT), '「私人收藏」那句打完、▼ 亮著的時候還在播（' + at10.length + ' 個取樣）');
    const stop = M.find(x => x.m === 'stop' && x.t >= o11.t - 5);
    check('P12 O11 淡出', stop && stop.t - o11.t < 60 && stop.o && stop.o.fadeMs === 1500, 'O11 開始那一刻 music.stop(' + JSON.stringify(stop && stop.o) + ')，晚 ' + (stop ? stop.t - o11.t : '?') + ' ms');
    const nul = S.find(s => s.t >= o11.t && s.music === null);
    check('P12 O11 後停了', nul && nul.t - o11.t <= 2000, 'O11 開始後 ' + (nul ? nul.t - o11.t : '?') + ' ms current() 變 null（≤2000）');
  }
}

// ---------------------------------------------------------------------------------------------- 一輪 C：點一下只快轉正在做的那一步；⏩
async function tapRun(browser) {
  const label = 'C 點一下／⏩';
  const { ctx, page } = await openPage(browser);
  await page.click('[data-a=quiet]');
  const skip = () => page.evaluate(() => { const b = document.querySelector('#top .skip'); if (b) b.click(); return !!b; });
  const state = () => page.evaluate(() => ({ beat: window.__lab.beat, sheet: (document.querySelector('#panel > .lb-sheet') || {}).className || null, choice: !!document.querySelector('.lb-dq .nx.on.choice'), nx: !!document.querySelector('.lb-dq .nx.on') }));
  const waitFor = async (fn, ms = 15000) => { const t = Date.now(); while (Date.now() - t < ms) { const s = await state(); if (fn(s)) return s; await sleep(30); } return null; };
  // ⏩ → 停在 O7（猜歌）；點開、作答；⏩ → 停在 O9（挑王牌）；點開、就這張
  await sleep(400); await skip();
  let s = await waitFor(x => x.beat === 'O7' && x.choice);
  check(label + ' ⏩ 停在 O7', !!s, '⏩ 停在下一個有 ui 的句子（O7 猜歌）');
  await page.evaluate(() => document.querySelector('.lb-dq').click());
  await waitFor(x => /guess/.test(x.sheet || '')); await sleep(450);
  await page.evaluate(() => document.querySelector('#panel > .lb-sheet [data-pick]').click());
  await waitFor(x => !x.sheet, 4000); await sleep(200); await skip();
  s = await waitFor(x => x.beat === 'O9' && x.choice);
  check(label + ' ⏩ 停在 O9', !!s, '⏩ 停在 O9（挑王牌）');
  await page.evaluate(() => document.querySelector('.lb-dq').click());
  await waitFor(x => /acepick/.test(x.sheet || '')); await sleep(450);
  await page.evaluate(() => document.querySelector('#panel > .lb-sheet [data-a=ok]').click());
  // O10：點兩下（補完字、換句）→ O11
  await waitFor(x => x.beat === 'O10' && x.nx, 8000);
  await page.evaluate(() => document.querySelector('.lb-dq').click());
  await waitFor(x => x.beat === 'O11', 4000);
  // O11：老闆走去 dig1 的途中
  await page.waitForFunction(() => { const l = window.__log.filter(x => x.m === 'walk' && x.a[0] === 'o'); return l.length && l[l.length - 1].a[1].includes('dig1'); }, null, { timeout: 4000 }).catch(() => {});
  await sleep(450);
  const before = await page.evaluate(() => window.__lab.stage.pos('o'));
  const tTap = await page.evaluate(() => { const t = Date.now(); document.querySelector('.lb-dq').click(); return t; });
  await sleep(50);
  const at50 = await page.evaluate(() => ({ o: window.__lab.stage.pos('o'), pose: window.__pose.o || null, hold: window.__hold.o || null, log: window.__log.filter(x => x.beat === 'O11').map(x => [x.t, x.m, JSON.stringify(x.a)]) }));
  const dig1 = SP.dig1, dig2 = SP.dig2;
  check('P5 點一下 → 那一步到終點', dist(before, dig1) > 4 && dist(at50.o, dig1) <= 1, '點之前老闆離 dig1 ' + dist(before, dig1).toFixed(1) + ' 格，點完 50 ms 內 ' + dist(at50.o, dig1).toFixed(1) + ' 格');
  const afterTap = at50.log.filter(x => x[0] >= tTap);
  const poseDig = afterTap.find(x => x[1] === 'pose' && /"o","dig"/.test(x[2]));
  check('P5 下一步才開始', poseDig && poseDig[0] - tTap <= 50 && at50.pose === 'dig' && !afterTap.some(x => x[1] === 'walk' && /dig2/.test(x[2])) && !at50.hold,
    '接著翻箱（pose dig，點完 ' + (poseDig ? poseDig[0] - tTap : '?') + ' ms），沒跳到 dig2、沒拿著唱片');
  await sleep(300);
  const at350 = await page.evaluate(() => ({ o: window.__lab.stage.pos('o'), pose: window.__pose.o || null, nx: !!document.querySelector('.lb-dq .nx.on') }));
  check('P5 翻箱照常速度', dist(at350.o, dig1) <= 1 && at350.pose === 'dig' && !at350.nx, '300 ms 後還在 dig1 翻（沒有連帶快轉），▼ 沒亮（act 還沒做完）');
  // ⏩：依序快轉，停在 O12；每一步的終點狀態都出現過
  const tSkip = Date.now();
  await skip();
  s = await waitFor(x => x.beat === 'O12' && x.choice, 6000);
  const fin = await page.evaluate(() => ({ tl: window.__lab.timeline().filter(x => x.beat === 'O11' && x.ev === 'step'), log: window.__log.filter(x => x.beat === 'O11' || x.beat === 'O12').map(x => [x.m, x.a]), o: window.__lab.stage.pos('o'), hold: window.__hold.o, txt: document.querySelector('.lb-dq .tx').textContent }));
  check('P5 ⏩ 停在 O12', s && fin.txt === C.script.prologue.find(b => b.id === 'O12').text, '⏩ 停在下一個有 ui 的句子（O12），字完整顯示');
  const steps = fin.tl.map(x => x.step + '/' + x.how);
  check('P5 ⏩ 每一步都收尾', steps.join(' ') === 'walk o dig1/tap pose o dig 1000ms/ff walk o dig2/ff pose o dig 1000ms/ff hold o/done',
    'O11 每一步的終點都記在時間軸：' + steps.join('、'));
  const seq = fin.log.map(x => x[0] + ':' + (x[1][1] === undefined ? '' : JSON.stringify(x[1][1]))).join(' ');
  check('P5 ⏩ 終點狀態依序出現', /pose:"dig".*pose:null.*walk:\["dig2"\].*finish.*pose:"dig".*pose:null.*hold:\{"sleeve"/.test(seq) && dist(fin.o, dig2) <= 1 && fin.hold && fin.hold.sleeve === C.gifts[await page.evaluate(() => window.__lab.run.ace)][0],
    '翻 → 收手 → 走到 dig2 → 翻 → 收手 → 拿著第一張禮物（老闆在 dig2）');
  const errs = errorsOf(page);
  check(label + ' 主控台', !errs.length, errs.length ? errs.slice(0, 5).join(' | ') : '0 錯誤');
  await ctx.close();
}

const browser = await launch();
try {
  if (ONLY.includes('C')) await tapRun(browser);
  if (ONLY.includes('A')) await fullRun(browser, 'A');
  if (ONLY.includes('B')) await fullRun(browser, 'B');
} finally { await browser.close(); }
console.log('\n' + passes + ' passed, ' + fails + ' failed');
process.exit(fails ? 1 : 0);
