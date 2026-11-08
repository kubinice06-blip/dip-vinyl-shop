// game-lab/tests/e2e-duel.mjs：對決盤面 v4 的端對端（SPEC-v4 §5.5「e2e-duel」；B1）。
//   跑在 B1 的 dev/duel-harness.html（harness 自己提供 __lab.force／__lab.stage，跟 ui.js 的 __lab 同介面）；index.html 版由 C 整合後接。
//   需要靜態伺服器：cd <repo 根> && python3 -m http.server 8781
//   node game-lab/tests/e2e-duel.mjs
// 環境變數：LAB_DUEL_URL（harness 的整個網址）；或 LAB_URL（網址裡有 duel-harness 才用）；或 LAB_BASE（伺服器根，預設 http://localhost:8781）；
//          LAB_SIZES（預設四個驗收尺寸 390x664,375x548,430x932,360x640）；
//          LAB_SHOTS＝目錄 → 另存段 3「對戰畫面」截圖（deviceScaleFactor 2）：出牌前、命中／剋不動／唬人（揭曉浮框出現後停格）、最後一手 KO、（另加）王牌擋下。
//
// 每個尺寸：
//   1 版面：手牌三張＋王牌＋星鈕＋丟！下緣 ≤ innerHeight、盤面與文件都不捲動、星鈕本體 ≥28×44、其他鈕 ≥44×44；誠實度名牌看不到（D §5）
//   2 點封面＝選這張、屬性＝engine.topAttr；3 點別的星＝換；4 再點已選的星鈕（與已選的封面）不出手
//   5 丟（剋中）：280 ms 前 slot-e 是「蓋著」、之後才翻成他的牌；他還有 N 張丟出就少一；浮框三行＝_fmt.clashText(事件)；第 n／6 手加一；提示句換字
//   6 剋不動（gap）／7 唬人（被剋，「他唬你！」）／8 平手（舞台 sfx('chime',{attr:null})、唱盤空）／9 王牌擋下（「王牌不會被剋」）：浮框＝clashText
//  10 __lab.force：counter 之後 1.6 s clashState().deck.by==='p'；tie 時 deck===null
//  11 長按手牌封面 450 ms＝唱片資訊（不選牌）
//  12 六手比聲望：最後一手他贏、你靠聲望贏整場 → 大章 roundsOut／roundsScore、勝利曲只叫一次而且是你最後丟的那張；tip_rounds；
//     每手的提示句：有字、不寫「經典／冷門／硬蕊」、跟上一手不同、＝C.hints 那句
//  13 最後一手 KO：你 KO 他 → 「品味勝出」、勝利曲＝你那張；他 KO 你 → 「聲望歸零」、勝利曲＝他那張
//  14 autoplay('thoughtful') 打完一場（走正常點擊流程）
//  15 主控台 0 錯誤
// 只跑一次（不分尺寸）：0 合成事件逐字（D 的三個例句、key 為 null 的退路句、其他規則句）。
// 每一項印 PASS／FAIL；任何 FAIL → exit 1。
import fs from 'fs';
import { launch, newPage, SIZES, record, results, sleep } from './e2e-lib.mjs';

const HARNESS = process.env.LAB_DUEL_URL
  || (process.env.LAB_URL && /duel-harness/.test(process.env.LAB_URL) ? process.env.LAB_URL.split('?')[0] : null)
  || (process.env.LAB_BASE || 'http://localhost:8781').replace(/\/+$/, '') + '/game-lab/dev/duel-harness.html';
const SHOTS = process.env.LAB_SHOTS ? process.env.LAB_SHOTS.replace(/\/+$/, '') + '/' : null;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
const ENEMY = process.env.LAB_DUEL_ENEMY || 'copycat';
const ATTR_WORDS = /經典|冷門|硬蕊/;

// ---------------------------------------------------------------- 頁面裡的小工具（addInitScript）
function pageTools() {
  window.__e2e = {
    hints: [], marks: [],
    // 找這一手「你怎麼出＋他怎麼出」會得到 want 的組合（他那邊用 harness 的 forcedPlay；你那邊走真點）
    find(want) {
      const E = window.DipLabEngine, d = window.__lab && window.__lab.rawDuel();
      if (!E || !d || !d.plan || d.over) return null;
      const v = E.view(d), hintA = d.plan.hint.attr, A = ['c', 'o', 'h'];
      for (const act of E.legalActions(d)) {
        const pa = act.ace ? v.aceAxis : act.attr;
        for (let i = 0; i < d.e.hand.length; i++) for (const a of A) {
          const c = d.e.hand[i]; if (!c) continue;
          const isAce = !!c.tier; if (isAce && a !== E.aceAxis(c)) continue;
          const bluff = a !== hintA;
          let r = null; try { r = E.preview(d, act, { i, attr: a }); } catch (_) { r = null; }
          if (!r) continue;
          const plain = !act.ace && !isAce;
          const ok = want === 'counter' ? plain && !bluff && r.kind === 'counter' && !r.notes.length
            : want === 'blocked' ? plain && !bluff && r.blocked === 'gap' && r.by === 'p'
            : want === 'bluff' ? plain && a === E.BEATS[hintA] && pa === E.COUNTER_OF[hintA] && r.kind === 'countered'
            : want === 'tie' ? plain && !bluff && r.kind === 'tie'
            : want === 'ace' ? act.ace && !isAce && r.blocked === 'ace'
            : want === 'kill' ? plain && !bluff && r.kind === 'counter' && r.toE >= v.eHp
            : want === 'any' ? plain
            : false;
          if (ok) return { act, pa, e: { i, attr: a }, r: { kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked, by: r.by }, bluff };
        }
      }
      return null;
    },
    ready() {
      const D = window.DipLabDuel, H = window.__h;
      if (!H || !H.ready || !D || !D.api()) return false;
      const x = D.debug(); return !!(x && x.enterDone && x.phase === 'choose' && !D.api().busy() && !x.held && document.querySelector('.dl [data-tut=hand] .tile'));
    },
    // 盯住 slot-e 與 rec：丟出那一刻起每一格記一筆（相對「丟！」被點的時間）
    watchThrow() {
      const se = document.querySelector('.dl [data-tut="slot-e"]'), pile = document.querySelector('.dl .pile small');
      const out = window.__e2e.marks = [];
      let t0 = null;
      const btn = document.querySelector('.dl [data-tut="throw"]');
      const onClick = () => { if (t0 == null) t0 = performance.now(); };
      btn.addEventListener('click', onClick, { capture: true, once: true });
      const snap = () => ({ t: t0 == null ? null : performance.now() - t0, back: se.classList.contains('back'), card: se.dataset.card || null, who: se.textContent.replace(/\s+/g, ' ').trim(), pile: pile ? pile.textContent : '' });
      const mo = new MutationObserver(() => out.push(snap()));
      mo.observe(se, { attributes: true, childList: true, subtree: true });
      if (pile) mo.observe(pile, { childList: true, characterData: true, subtree: true });
      setTimeout(() => mo.disconnect(), 3000);
      return snap();
    },
    callout() {
      const q = s => { const e = document.querySelector('.dl .callout ' + s); return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; };
      return { on: !!document.querySelector('.dl .callout.on'), l1: q('.l1'), l2: q('.l2 .v'), l3: q('.l3') };
    },
    // 這一手的事件組出來的三行（_fmt.clashText 用 content 的字與 C.hints）
    expect() {
      const D = window.DipLabDuel, last = D.debug().last; if (!last) return null;
      const cl = last.evs.find(e => e.t === 'clash'); if (!cl) return null;
      const C = window.DipLabContent, ct = D._fmt.clashText(cl, D._fmt.text(C), C.hints);
      return { l1: ct.l1, l2: ct.l2, l3: ct.l3, kind: cl.kind, blocked: cl.blocked, by: cl.by, bluff: cl.bluff, eCard: cl.eCard && cl.eCard.id, pCard: cl.pCard && cl.pCard.id, toE: cl.toE, toP: cl.toP };
    },
    hintNow() {
      const C = window.DipLabContent, v = window.DipLabEngine.view(window.__lab.rawDuel());
      const tx = (document.querySelector('.dl [data-tut="e-hint"] .tx') || {}).textContent || '';
      const want = v.hint ? ((C.hints[v.hint.attr] || []).find(x => x.id === v.hint.line) || {}).text : null;
      return { n: v.n, tx, want, rounds: (document.querySelector('.dl [data-tut="rounds"]') || {}).textContent || '' };
    },
  };
}

// ---------------------------------------------------------------- 共用步驟
async function boot(page, extra = '', seed = 7) {
  await page.goto(`${HARNESS}?enemy=${ENEMY}&seed=${seed}&noend=1&debug=1${SHOTS ? '&shot=1' : ''}${extra}`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__e2e && window.__e2e.ready(), null, { timeout: 25000 });
  await sleep(250);
}
async function remount(page, seed) {
  await page.evaluate(s => { window.__h.next = null; window.__lab.force(null); window.__h.remount(s); }, seed);
  await page.waitForFunction(() => window.__e2e.ready(), null, { timeout: 15000 });
  await sleep(150);
}
const waitChoose = (page, ms = 15000) => page.waitForFunction(() => window.__e2e.ready(), null, { timeout: ms }).then(() => true, () => false);
const waitOver = (page, ms = 20000) => page.waitForFunction(() => window.__h.ended != null, null, { timeout: ms }).then(() => true, () => false);
const dbg = page => page.evaluate(() => { const x = window.DipLabDuel.debug(); return { phase: x.phase, n: x.n, sel: x.sel, busy: x.busy }; });
async function tapName(page, name) {
  const r = await page.evaluate(n => { const el = window.DipLabDuel.el(n); if (!el) return null; const b = el.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2, w: b.width, h: b.height }; }, name);
  if (!r) throw new Error('no element ' + name);
  await page.touchscreen.tap(r.x, r.y);
  return r;
}
// 找得到 want 的這一手（找不到就換種子重開），回 find() 的結果
async function setup(page, want, seed0 = 7) {
  for (let k = 0; k < 40; k++) {
    const f = await page.evaluate(w => window.__e2e.find(w), want);
    if (f) return f;
    await remount(page, seed0 + 1 + k);
  }
  return null;
}
// 照 find() 的結果真點：封面 →（屬性不同再點星鈕）→ 他那邊排好 → 「丟！」
async function selectPlay(page, f) {
  const i = f.act.ace ? 'ace' : f.act.i;
  await tapName(page, i === 'ace' ? 'card-ace' : `card-${i}`); await sleep(120);
  const sel = (await dbg(page)).sel;
  if (!sel || sel.attr !== f.pa) { await tapName(page, i === 'ace' ? 'chip-ace' : `chip-${i}-${f.pa}`); await sleep(120); }
  await page.evaluate(e => window.__h.setNext(e), f.e);
  return (await dbg(page)).sel;
}
async function throwIt(page) { await tapName(page, 'throw'); }
const waitCallout = page => page.waitForFunction(() => window.__e2e.callout().on, null, { timeout: 8000 }).then(() => true, () => false);
// 浮框完整出現後停格截圖（hold：盤面動畫、計時與舞台一起停）
async function shot(page, name) {
  if (!SHOTS) return;
  await page.evaluate(() => window.DipLabDuel.hold(true));
  await sleep(120);
  await page.screenshot({ path: SHOTS + name });
  await page.evaluate(() => window.DipLabDuel.hold(false));
}
const sameLines = (a, b) => a && b && a.l1 === b.l1 && a.l2 === b.l2 && a.l3 === b.l3;
const short = s => JSON.stringify(s).slice(0, 220);

// ---------------------------------------------------------------- 0 合成事件逐字（只跑一次）
async function synthetic(browser) {
  const { ctx, page } = await newPage(browser, 390, 664);
  await page.addInitScript(pageTools);
  try {
    await boot(page);
    const R = await page.evaluate(() => {
      const F = window.DipLabDuel._fmt, C = window.DipLabContent, T = F.text(C);
      const line = ct => ct.l1 + ct.l2;
      const ev = o => Object.assign({ kind: 'mirrorWin', toE: 0, toP: 0, blocked: null, by: null, bluff: false, hint: null, notes: [] }, o);
      const out = {};
      out.d1 = line(F.clashText(ev({ pAttr: 'o', eAttr: 'c', kind: 'counter', toE: 4, by: 'p' }), T, C.hints));
      out.d2 = line(F.clashText(ev({ pAttr: 'o', eAttr: 'c', kind: 'mirrorLose', toP: 3, blocked: 'gap', by: 'p' }), T, C.hints));
      out.d3 = line(F.clashText(ev({ pAttr: 'o', eAttr: 'h', kind: 'countered', toP: 4, by: 'e', bluff: true, hint: { attr: 'c', line: 'c2' } }), T, C.hints));
      // key 為 null 的提示句 → bluffNoKey／honestNoKey
      const NK = { c: [{ id: 'cx', text: '（測試）', key: null }], o: [{ id: 'ox', text: '（測試）', key: null }], h: [{ id: 'hx', text: '（測試）', key: null }] };
      out.nkB = F.clashText(ev({ pAttr: 'o', eAttr: 'h', kind: 'countered', toP: 4, by: 'e', bluff: true, hint: { attr: 'c', line: 'cx' } }), T, NK).l1;
      out.nkH = F.clashText(ev({ pAttr: 'h', eAttr: 'o', kind: 'counter', toE: 3, by: 'p', hint: { attr: 'o', line: 'ox' } }), T, NK).l3;
      // 照實：l3＝關鍵字那句（族詞＝那句的 key）
      out.hon = F.clashText(ev({ pAttr: 'h', eAttr: 'o', kind: 'counter', toE: 3, by: 'p', hint: { attr: 'o', line: 'o2' } }), T, C.hints).l3;
      // 唬人又剋不動：l3＝規則句（句尾改「。」）
      const bb = F.clashText(ev({ pAttr: 'h', eAttr: 'c', kind: 'mirrorWin', toE: 2, blocked: 'gap', by: 'e', bluff: true, hint: { attr: 'o', line: 'o2' } }), T, C.hints);
      out.bb = [bb.l1, bb.l2, bb.l3];
      out.him = line(F.clashText(ev({ pAttr: 'c', eAttr: 'o', kind: 'mirrorWin', toE: 2, blocked: 'gap', by: 'e' }), T, C.hints));
      out.aceYou = line(F.clashText(ev({ pAttr: 'c', eAttr: 'o', kind: 'mirrorWin', toE: 3, blocked: 'ace', by: 'e', ace: true }), T, C.hints));
      out.aceHim = line(F.clashText(ev({ pAttr: 'o', eAttr: 'c', kind: 'mirrorLose', toP: 3, blocked: 'ace', by: 'p', eAce: true }), T, C.hints));
      out.aceCounter = line(F.clashText(ev({ pAttr: 'o', eAttr: 'c', kind: 'counter', toE: 7, by: 'p', ace: true }), T, C.hints));
      out.mirror = line(F.clashText(ev({ pAttr: 'c', eAttr: 'c', kind: 'mirrorWin', toE: 1 }), T, C.hints));
      out.tie = line(F.clashText(ev({ pAttr: 'c', eAttr: 'c', kind: 'tie' }), T, C.hints));
      out.countered = line(F.clashText(ev({ pAttr: 'c', eAttr: 'o', kind: 'countered', toP: 5, by: 'e' }), T, C.hints));
      out.rs = [T('roundsOut'), T('roundsScore', { p: 9, e: 7, who: '你' })];
      return out;
    });
    const want = {
      d1: '冷門剋經典，命中！他 −4', d2: '冷門剋經典，但他高你 2 星以上，剋不動。比星數，你 −3', d3: '他唬你！『紀念版』是經典，他出的是硬蕊。你 −4',
      nkB: '他唬你！提示是經典，他出的是硬蕊。', nkH: '提示是冷門，他照實出。', hon: '『白版』是冷門，他照實出。',
      bb: ['他唬你！『白版』是冷門，他出的是經典。', '他 −2', '經典剋硬蕊，但你高他 2 星以上，他剋不動。比星數。'],
      him: '冷門剋經典，但你高他 2 星以上，他剋不動。比星數，他 −2', aceYou: '冷門剋經典，但王牌不會被剋。比星數，他 −3',
      aceHim: '冷門剋經典，但他的王牌不會被剋。比星數，你 −3', aceCounter: '王牌冷門剋經典，命中！他 −7',
      mirror: '同樣是經典，比星數，他 −1', tie: '同樣是經典，比星數，一樣大，不扣。', countered: '冷門剋經典，被剋了。你 −5',
      rs: ['六手打完，比聲望', '你 9 比 他 7：你贏'],
    };
    for (const k of Object.keys(want)) {
      const ok = JSON.stringify(R[k]) === JSON.stringify(want[k]);
      record('0-' + k, 'once', ok, ok ? JSON.stringify(R[k]) : `got ${JSON.stringify(R[k])} want ${JSON.stringify(want[k])}`);
    }
    record('0-errors', 'once', page._errors.length === 0, page._errors.join(' | ').slice(0, 300) || '0 錯誤');
  } finally { await ctx.close(); }
}

// ---------------------------------------------------------------- 每個尺寸
async function runSize(browser, w, h) {
  const size = `${w}x${h}`;
  const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
  await page.addInitScript(pageTools);
  const cdp = await ctx.newCDPSession(page);
  const errors = [];
  try {
    await boot(page);
    // ---- 1 版面
    await tapName(page, 'card-0'); await sleep(250);
    const L = await page.evaluate(() => {
      const D = window.DipLabDuel, rect = el => { if (!el) return null; const b = el.getBoundingClientRect(); return { l: b.left, t: b.top, r: b.right, b: b.bottom, w: b.width, h: b.height }; };
      const root = document.querySelector('.dl');
      const tiles = [...document.querySelectorAll('.dl [data-tut=hand] .tile')].map(t => ({ tut: t.dataset.tut, r: rect(t) }));
      const chips = [...document.querySelectorAll('.dl .chip')].map(c => ({ tut: c.dataset.tut, r: rect(c) }));
      const covers = [...document.querySelectorAll('.dl .tile .cvw')].map(c => ({ tut: c.dataset.tut, r: rect(c) }));
      const hon = D.el('e-honesty');
      return { vh: innerHeight, vw: innerWidth, scroll: [root.scrollHeight, root.clientHeight], doc: [document.documentElement.scrollHeight, document.documentElement.scrollWidth],
        tiles, chips, covers, thr: rect(D.el('throw')), honExists: !!hon, honShown: !!(hon && hon.offsetWidth > 0 && hon.offsetHeight > 0 && getComputedStyle(hon).visibility !== 'hidden'),
        sleeve: (D.el('e-sleeve') || {}).textContent || '', slotE: (D.el('slot-e') || {}).textContent || '', cls: root.className };
    });
    {
      const hand = L.tiles.filter(t => /^hand-(\d|ace)$/.test(t.tut));
      const bottom = Math.max(...L.tiles.map(t => t.r.b), ...L.chips.map(c => c.r.b), L.thr.b);
      const minChip = L.chips.reduce((a, c) => [Math.min(a[0], c.r.w), Math.min(a[1], c.r.h)], [999, 999]);
      const minCover = L.covers.reduce((a, c) => [Math.min(a[0], c.r.w), Math.min(a[1], c.r.h)], [999, 999]);
      const inX = [...L.tiles, ...L.chips].every(x => x.r.l >= -0.5 && x.r.r <= L.vw + 0.5);
      const ok = hand.length === 4 && hand.some(t => t.tut === 'hand-ace') && bottom <= L.vh + 0.5 && L.scroll[0] <= L.scroll[1] + 1 && L.doc[0] <= L.vh + 1 && L.doc[1] <= L.vw + 1
        && minChip[0] >= 28 && minChip[1] >= 44 && L.thr.w >= 44 && L.thr.h >= 44 && minCover[0] >= 44 && minCover[1] >= 44 && inX;
      record(1, size, ok, `手牌 ${hand.map(t => t.tut).join(',')}；下緣 ${Math.round(bottom)}/${L.vh}；盤面 ${L.scroll.join('/')}；文件 ${L.doc.join('×')}；星鈕最小 ${minChip.map(Math.round).join('×')}；封面最小 ${minCover.map(Math.round).join('×')}；丟！${Math.round(L.thr.w)}×${Math.round(L.thr.h)}（${L.cls}）`);
      record('1b', size, L.honExists && !L.honShown, `誠實度名牌：DOM ${L.honExists ? '有' : '沒有'}、畫面上${L.honShown ? '看得到（D §5 要拿掉）' : '看不到（D §5：店主 06:05 拿掉；§5.5「名牌顯示誠實度」照 D 改成看不到）'}`);
      record('1c', size, /蓋著/.test(L.sleeve), `他的封套：「${L.sleeve.trim()}」；牌桌他那格：「${L.slotE.trim()}」`);
    }
    // ---- 2 點封面＝選這張＋topAttr
    {
      await page.evaluate(() => window.DipLabDuel.select(null)); await sleep(100);
      const before = await dbg(page);
      await tapName(page, 'card-1'); await sleep(200);
      const r = await page.evaluate(() => {
        const D = window.DipLabDuel, E = window.DipLabEngine, v = E.view(window.__lab.rawDuel()), x = D.debug();
        const on = [...document.querySelectorAll('.dl .chip.sel')].map(c => c.dataset.tut);
        return { sel: x.sel, top: E.topAttr(v.hand[1]), on, thrOn: !D.el('throw').disabled, n: x.n };
      });
      const ok = !before.sel && r.sel && r.sel.i === 1 && r.sel.attr === r.top && r.on.length === 1 && r.on[0] === `chip-1-${r.top}` && r.thrOn;
      record(2, size, ok, `點 card-1 → 選 ${short(r.sel)}（topAttr ${r.top}）；亮的星鈕 ${r.on.join(',')}；丟！${r.thrOn ? '可按' : '不能按'}`);
      // ---- 3 點別的星＝換
      const other = ['c', 'o', 'h'].find(a => a !== r.top);
      await tapName(page, `chip-1-${other}`); await sleep(200);
      const s3 = await dbg(page);
      record(3, size, s3.sel && s3.sel.i === 1 && s3.sel.attr === other && s3.phase === 'choose', `點 chip-1-${other} → 選 ${short(s3.sel)}`);
      // ---- 4 再點已選的星鈕、再點同一張封面：都不出手（封面也不把屬性改回 topAttr）
      await tapName(page, `chip-1-${other}`); await sleep(200);
      await tapName(page, `chip-1-${other}`); await sleep(500);
      const s4 = await dbg(page);
      await tapName(page, 'card-1'); await sleep(500);
      const s4b = await dbg(page);
      const ok4 = s4.phase === 'choose' && s4.n === r.n && !s4.busy && s4.sel && s4.sel.attr === other && s4b.phase === 'choose' && s4b.n === r.n && s4b.sel && s4b.sel.attr === other;
      record(4, size, ok4, `再點已選星鈕兩下：第 ${s4.n} 手、${s4.phase}、選 ${short(s4.sel)}；再點同一張封面：${s4b.phase}、選 ${short(s4b.sel)}`);
    }
    // ---- 5 剋中：揭曉時序、浮框、下一手
    {
      await page.evaluate(() => window.DipLabDuel.select(null));
      const f = await setup(page, 'counter');
      if (!f) record(5, size, false, '找不到能剋中的一手');
      else {
        const h0 = await page.evaluate(() => window.__e2e.hintNow());
        const p0 = await page.evaluate(() => { const v = window.DipLabEngine.view(window.__lab.rawDuel()); return (v.pile | 0) + (v.eHandN | 0); });
        await selectPlay(page, f);
        await shot(page, `${size}-1-before.png`);
        const s0 = await page.evaluate(() => window.__e2e.watchThrow());
        await throwIt(page);
        const okC = await waitCallout(page);
        const marks = await page.evaluate(() => window.__e2e.marks.slice());
        const ui = await page.evaluate(() => window.__e2e.callout()), ex = await page.evaluate(() => window.__e2e.expect());
        await sleep(400); await shot(page, `${size}-2-counter.png`);
        const backs = marks.filter(m => m.t != null && m.back);
        const firstCard = marks.find(m => m.t != null && m.card);
        const pileAt = marks.find(m => m.t != null && m.t < 250 && /\d/.test(m.pile));
        const ok5a = !s0.back && backs.length > 0 && backs.every(m => m.t < 300 && !m.card && /蓋著/.test(m.who)) && firstCard && firstCard.t >= 260 && firstCard.card === ex.eCard;
        record('5a', size, ok5a, `slot-e：${backs.length ? `${Math.round(backs[0].t)} ms「${backs[0].who}」` : '沒有蓋著'} → ${firstCard ? `${Math.round(firstCard.t)} ms 翻成 ${firstCard.card}（他丟的 ${ex.eCard}）「${firstCard.who}」` : '沒翻'}`);
        const pileN = pileAt ? +(pileAt.pile.match(/\d+/) || [])[0] : null;
        record('5b', size, pileN === p0 - 1, `他還有：丟出前 ${p0} 張，${pileAt ? Math.round(pileAt.t) + ' ms' : '—'}「${pileAt ? pileAt.pile : ''}」`);
        record('5c', size, okC && sameLines(ui, ex) && ex.kind === 'counter' && /命中/.test(ui.l1) && /^他 −\d$/.test(ui.l2) && /照實出/.test(ui.l3), `浮框 ${short(ui)}；clashText ${short([ex.l1, ex.l2, ex.l3])}`);
        const okN = await waitChoose(page);
        const h1 = await page.evaluate(() => window.__e2e.hintNow());
        const ok5d = okN && h0.rounds === '第 1／6 手' && h1.rounds === '第 2／6 手' && h1.tx && h1.tx === h1.want && h1.tx !== h0.tx && !ATTR_WORDS.test(h1.tx) && !ATTR_WORDS.test(h0.tx);
        record('5d', size, ok5d, `${h0.rounds}「${h0.tx}」→ ${h1.rounds}「${h1.tx}」`);
      }
    }
    // ---- 6–9 其他結果（每種先找一手，必要時換種子）
    for (const [n, want, test, shotName] of [
      [6, 'blocked', u => u.blocked === 'gap' && u.by === 'p' && /剋不動。比星數，$/.test(u.ui.l1) && /照實出/.test(u.ui.l3), `${size}-3-blocked.png`],
      [7, 'bluff', u => u.bluff && u.kind === 'countered' && /^他唬你！『.+』是.{2}，他出的是.{2}。$/.test(u.ui.l1) && /^你 −\d$/.test(u.ui.l2) && u.ui.l3 === '' && u.tip, `${size}-4-bluff.png`],
      [8, 'tie', u => u.kind === 'tie' && u.ui.l2 === '一樣大，不扣。' && u.chime0 && u.deck === null, null],
      [9, 'ace', u => u.blocked === 'ace' && /王牌不會被剋。比星數[，。]$/.test(u.bluff ? u.ui.l3 : u.ui.l1), `${size}-6-ace.png`],   // 他唬人時規則句在 l3
    ]) {
      await waitChoose(page);
      await page.evaluate(() => { window.__h.sfx.length = 0; window.DipLabDuel.select(null); });
      const f = await setup(page, want, 100 + n * 10);
      if (!f) { record(n, size, false, `找不到「${want}」的一手`); continue; }
      await selectPlay(page, f);
      await throwIt(page);
      const okC = await waitCallout(page);
      const ui = await page.evaluate(() => window.__e2e.callout()), ex = await page.evaluate(() => window.__e2e.expect());
      await sleep(400); if (shotName) await shot(page, shotName);
      await sleep(1200);   // ≈1.6 s：唱盤上的狀態
      const st = await page.evaluate(() => ({ deck: window.__lab.stage.clashState().deck, sfx: window.__h.sfx.slice(), log: window.__h.log.slice() }));
      const u = Object.assign({}, ex, { ui, deck: st.deck, chime0: st.sfx.some(([k, o]) => k === 'chime' && o && o.attr === null), tip: st.log.some(s => /^hint tip_bluff/.test(s)) });
      const ok = okC && sameLines(ui, ex) && test(u);
      record(n, size, ok, `${want}：浮框 ${short([ui.l1, ui.l2, ui.l3])}${n === 8 ? `；chime(null) ${u.chime0 ? '有' : '沒有'}；唱盤 ${JSON.stringify(st.deck)}` : ''}${n === 7 ? `；tip_bluff ${u.tip ? '有' : '沒有'}` : ''}`);
      await waitChoose(page);
    }
    // ---- 10 __lab.force：counter → 1.6 s 唱盤上是你的（by p）；tie → 空盤
    for (const [k, o, test] of [['counter', { kind: 'counter', toE: 1, toP: 0 }, d => d && d.by === 'p'], ['tie', { kind: 'tie', toE: 0, toP: 0 }, d => d === null]]) {
      await remount(page, 300);
      await page.evaluate(o => window.__lab.force(o), o);
      await tapName(page, 'card-0'); await sleep(150);
      await throwIt(page);
      await sleep(1600);
      const d = await page.evaluate(() => window.__lab.stage.clashState().deck);
      record('10-' + k, size, test(d), `force ${k} → 1.6 s clashState().deck＝${JSON.stringify(d)}`);
      await page.evaluate(() => window.__lab.force(null));
      await waitChoose(page);
    }
    // ---- 11 長按手牌封面＝唱片資訊（不選牌）
    {
      await page.evaluate(() => window.DipLabDuel.select(null));
      const r = await page.evaluate(() => { const el = window.DipLabDuel.el('card-2'), b = el.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2, id: el.closest('.tile').dataset.card }; });
      const n0 = await page.evaluate(() => window.__h.log.length);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: r.x, y: r.y }] });
      await sleep(650);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await sleep(300);
      const st = await page.evaluate(n0 => ({ log: window.__h.log.slice(n0), modal: !!document.querySelector('.hx-ov'), sel: window.DipLabDuel.debug().sel }), n0);
      const ok = st.log.includes('info ' + r.id) && st.modal && !st.sel;
      record(11, size, ok, `長按 card-2 → ${st.log.join(',') || '沒有'}；唱片資訊${st.modal ? '開著' : '沒開'}；選牌 ${short(st.sel)}`);
      await page.evaluate(() => { const b = document.querySelector('.hx-ov button'); if (b) b.click(); });
      await sleep(250);
    }
    // ---- 12 六手比聲望（最後一手他贏、你靠聲望贏整場）＋勝利曲＋提示句每手換
    {
      await boot(page, '&fast=1&hp=10&ehp=10', 11);
      await page.evaluate(() => { window.__h.music.length = 0; window.__e2e.hints = []; });
      const seq = [{ kind: 'counter', toE: 3, toP: 0 }, { kind: 'tie' }, { kind: 'tie' }, { kind: 'tie' }, { kind: 'tie' }, { kind: 'countered', toE: 0, toP: 1 }];
      const hints = [];
      let lastP = null, ok6 = true;
      for (let k = 0; k < 6; k++) {
        if (!(await waitChoose(page))) { ok6 = false; break; }
        hints.push(await page.evaluate(() => window.__e2e.hintNow()));
        await page.evaluate(o => window.__lab.force(o), seq[k]);
        await tapName(page, 'card-0'); await sleep(80);
        lastP = await page.evaluate(() => { const x = window.DipLabDuel.debug(); return window.DipLabEngine.view(window.__lab.rawDuel()).hand[x.sel.i].id; });
        await throwIt(page);
        await page.waitForFunction(k => { const x = window.DipLabDuel.debug(); return x.busy || x.n > k + 1 || window.__h.ended; }, k, { timeout: 5000 }).catch(() => {});
      }
      const okO = ok6 && await waitOver(page);
      await sleep(400);
      const R = await page.evaluate(() => ({ ended: window.__h.ended && { by: window.__h.ended.by, win: window.__h.ended.win, pHp: window.__h.ended.pHp, eHp: window.__h.ended.eHp },
        stamp: [((document.querySelector('.dl .kost b') || {}).textContent || ''), ((document.querySelector('.dl .kost small') || {}).textContent || '')],
        music: window.__h.music.slice(), last: window.__e2e.expect(), tip: window.__h.log.some(s => /^hint tip_rounds/.test(s)) }));
      const ok = okO && R.ended && R.ended.by === 'rounds' && R.ended.win && R.last.kind === 'countered' && R.stamp[0] === '六手打完，比聲望' && R.stamp[1] === `你 ${R.ended.pHp} 比 他 ${R.ended.eHp}：你贏`;
      record('12a', size, ok, `結束 ${short(R.ended)}；最後一手 ${R.last && R.last.kind}；大章「${R.stamp.join('／')}」`);
      record('12b', size, R.music.length === 1 && R.music[0] === lastP && lastP === R.last.pCard, `勝利曲 ${JSON.stringify(R.music)}（你最後丟的 ${lastP}；最後一手他贏、整場你贏）`);
      record('12c', size, R.tip, `tip_rounds ${R.tip ? '有' : '沒有'}`);
      const okH = hints.length === 6 && hints.every((x, k) => x.tx && x.tx === x.want && !ATTR_WORDS.test(x.tx) && x.rounds === `第 ${k + 1}／6 手` && (k === 0 || x.tx !== hints[k - 1].tx));
      record('12d', size, okH, hints.map(x => `${x.rounds}「${x.tx}」`).join(' '));
    }
    // ---- 13 最後一手 KO（你 KO 他；他 KO 你）
    {
      await boot(page, '&ehp=3', 21);
      await page.evaluate(() => { window.__h.music.length = 0; });
      const f = await setup(page, 'kill', 21);
      if (!f) record('13a', size, false, '找不到一手 KO');
      else {
        await selectPlay(page, f);
        await throwIt(page);
        // 大章一出現（盤面還在、還沒淡出）就停格截圖；之後才等 onEnd
        await page.waitForFunction(() => !!document.querySelector('.dl .kost.on'), null, { timeout: 8000 }).catch(() => {});
        await sleep(550);
        await shot(page, `${size}-5-ko.png`);
        const okO = await waitOver(page);
        const R = await page.evaluate(() => ({ ended: window.__h.ended && { by: window.__h.ended.by, win: window.__h.ended.win }, stamp: ((document.querySelector('.dl .kost b') || {}).textContent || ''), music: window.__h.music.slice(), last: window.__e2e.expect() }));
        record('13a', size, okO && R.ended.by === 'hp' && R.ended.win && R.stamp === '品味勝出' && R.music.length === 1 && R.music[0] === R.last.pCard, `你 KO 他：${short(R.ended)}「${R.stamp}」勝利曲 ${JSON.stringify(R.music)}（你丟的 ${R.last.pCard}）`);
      }
      await remount(page, 22);
      await page.evaluate(() => { window.__h.ended = null; window.__h.music.length = 0; window.__lab.force({ kind: 'countered', toE: 0, toP: 99 }); });
      await tapName(page, 'card-0'); await sleep(120);
      await throwIt(page);
      const okO = await waitOver(page);
      await sleep(500);
      const R = await page.evaluate(() => ({ ended: window.__h.ended && { by: window.__h.ended.by, win: window.__h.ended.win }, stamp: ((document.querySelector('.dl .kost b') || {}).textContent || ''), music: window.__h.music.slice(), last: window.__e2e.expect() }));
      record('13b', size, okO && R.ended.by === 'hp' && !R.ended.win && R.stamp === '聲望歸零' && R.music.length === 1 && R.music[0] === R.last.eCard, `他 KO 你：${short(R.ended)}「${R.stamp}」勝利曲 ${JSON.stringify(R.music)}（他丟的 ${R.last.eCard}）`);
      await page.evaluate(() => window.__lab.force(null));
    }
    // ---- 14 autoplay（走正常點擊流程）打完一場
    {
      await boot(page, '&fast=1', 31);
      await page.evaluate(() => { window.__lab.autoplay('thoughtful'); });
      const okO = await waitOver(page, 60000);
      const R = await page.evaluate(() => ({ ended: window.__h.ended && { by: window.__h.ended.by, win: window.__h.ended.win }, hands: window.DipLabDuel.debug().hands.length, calls: window.DipLabDuel.debug().hands.every(x => x.ui && x.ui.call && x.ui.call.on && x.ui.call.l1) }));
      record(14, size, okO && R.hands >= 1 && R.calls, `autoplay thoughtful：${short(R.ended)}、${R.hands} 手、每手浮框 ${R.calls ? '有' : '缺'}`);
    }
  } catch (e) {
    errors.push(String(e && e.stack || e));
    record('x', size, false, '例外：' + String(e && e.message || e).slice(0, 300));
  } finally {
    const errs = page._errors.concat(errors.length ? [] : []);
    record(15, size, errs.length === 0 && page._badLocal.length === 0, (errs.join(' | ') || '0 錯誤') + (page._badLocal.length ? '；本機檔案載不到：' + page._badLocal.join(',') : ''));
    await ctx.close();
  }
}

const browser = await launch();
try {
  await synthetic(browser);
  for (const [w, h] of SIZES) await runSize(browser, w, h);
} finally { await browser.close(); }
const failed = results.filter(r => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} PASS` + (failed.length ? `，FAIL：${failed.map(r => '#' + r.n + '[' + r.size + ']').join(' ')}` : '') + (SHOTS ? `\n截圖：${SHOTS}` : ''));
process.exit(failed.length ? 1 : 0);
