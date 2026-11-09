// game-lab/tests/e2e-duel.mjs：對決盤面 v4 的端對端（SPEC-v4 §5.5「e2e-duel」；B1）。
//   預設跑 index.html 的真對決畫面（C 整合：ui.js ?debug=1 的 __lab.duelLab 開場、打完停在大章；這裡的 indexShim 做出跟 harness 同介面的 window.__h）；
//   LAB_DUEL_PAGE=harness 跑 B1 的 dev/duel-harness.html（harness 自己提供 __lab.force／__lab.stage／__h）。
//   需要靜態伺服器：cd <repo 根> && python3 -m http.server 8765
//   node game-lab/tests/e2e-duel.mjs                        # index.html（LAB_BASE 預設 http://localhost:8765）
//   LAB_DUEL_PAGE=harness node game-lab/tests/e2e-duel.mjs  # harness（LAB_BASE 預設 http://localhost:8781）
// 環境變數：LAB_DUEL_URL（harness 的整個網址）；或 LAB_URL（網址裡有 duel-harness 才用）；或 LAB_BASE（伺服器根，預設 http://localhost:8781）；
//          LAB_SIZES（預設四個驗收尺寸 390x664,375x548,430x932,360x640）；
//          LAB_SHOTS＝目錄 → 另存段 3「對戰畫面」截圖（deviceScaleFactor 2）：出牌前、命中／剋不動／唬人（揭曉浮框出現後停格）、最後一手 KO、（另加）王牌擋下。
//
// 每個尺寸（v5 手風琴：手牌疊成水平一排（錯開，像新接龍；店主 17:1x 不要扇形）、封面同一個大小；點一張＝在那張打開（右邊的往右滑開、它整張露出來並浮起）、正上方三顆屬性鈕；點屬性鈕＝丟）：
//   1 版面：疊著（手牌 5 張＋王牌，同一條水平線、不轉角，每張露出左邊約 3 成、都在畫面裡、封面一樣大）；
//     打開中間那張（1b）、最左那張（1c）、王牌（1f）：封面跟疊著一樣大、打開那張整張露出來而且在畫面裡、其他照樣疊著（露出 22–35%）、
//     屬性鈕（三顆 ≥44×44、最高那顆 .top；王牌一顆）在那張上面、不蓋提示句；盤面與文件都不捲動；沒有超過 24 px 的空帶（FIXLIST 9）；
//     名牌只有新名字（沒有副標、沒有誠實度，FIXLIST 6）
//   2 點一張（疊著）＝在那張打開、預覽屬性＝engine.topAttr、「你丟的」半透明預覽；3 點別張＝換那張打開；4 再點打開那張＝收回（不出手）、點手牌外面＝收回；
//     4b 雙擊的第二下（同一點 120 ms 後）不算「再點＝收回」
//   5 丟（剋中）：280 ms 前 slot-e 是「蓋著」、之後才翻成他的牌；他還有 N 張丟出就少一；浮框三行＝_fmt.clashText(事件)；第 n／6 手加一；提示句換字
//   6 剋不動（gap）／7 唬人（被剋，「他唬你！」）／8 平手（舞台 sfx('chime',{attr:null})、唱盤空）／9 王牌被 ≤5 星剋＝剋不動（gap；FIXLIST 2 沒有「不會被剋」）＋tip_ace：浮框＝clashText
//  10 __lab.force：counter 之後 1.6 s clashState().deck.by==='p'；tie 時 deck===null
//  11 長按手牌封面 450 ms＝唱片資訊（不選牌）
//  12 六手比聲望條剩幾成（FIXLIST 3）：最後一手他贏、你靠聲望贏整場 → 大章 roundsOut／roundsScore（%＝E.pctPair）、勝利曲只叫一次而且是你最後丟的那張；tip_rounds；
//     每手的提示句：有字、不寫「經典／冷門／硬蕊」、跟上一手不同、＝C.hints 那句
//  13 最後一手 KO：你 KO 他 → 「品味勝出」、勝利曲＝你那張；他 KO 你 → 「聲望歸零」、勝利曲＝他那張
//  14 autoplay('thoughtful') 打完一場（走正常點擊流程）
//  15 主控台 0 錯誤
// 只跑一次（不分尺寸）：0 合成事件逐字（D 的三個例句、key 為 null 的退路句、其他規則句）。
// 每一項印 PASS／FAIL；任何 FAIL → exit 1。
import fs from 'fs';
import { launch, newPage, SIZES, record, results, sleep, hitPoint } from './e2e-lib.mjs';

// 跑哪一頁（C 整合後）：LAB_DUEL_PAGE＝index（預設；index.html 的真對決畫面，?debug=1 的 __lab.duelLab 開場）｜harness（dev/duel-harness.html）
const PAGE = process.env.LAB_DUEL_PAGE || (process.env.LAB_DUEL_URL && /duel-harness/.test(process.env.LAB_DUEL_URL) ? 'harness' : 'index');
const INDEX = PAGE === 'index';
const BASE = (process.env.LAB_BASE || (INDEX ? 'http://localhost:8765' : 'http://localhost:8781')).replace(/\/+$/, '');
const HARNESS = INDEX ? (process.env.LAB_DUEL_URL || BASE + '/game-lab/index.html')
  : (process.env.LAB_DUEL_URL
  || (process.env.LAB_URL && /duel-harness/.test(process.env.LAB_URL) ? process.env.LAB_URL.split('?')[0] : null)
  || BASE + '/game-lab/dev/duel-harness.html');
// 唱片資訊：harness 是自己的 .hx-ov；index.html 是 cardinfo.js 的 #cardInfoMask
const INFO_SEL = INDEX ? '#cardInfoMask' : '.hx-ov', INFO_CLOSE = INDEX ? '#ciClose' : '.hx-ov button';
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
            : want === 'ace' ? act.ace && !isAce && E.BEATS[a] === pa && r.blocked === 'gap' && r.by === 'e'
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
    // 盯住 slot-e 與 rec：丟出那一刻起每一格記一筆（相對屬性鈕被點的時間）
    watchThrow() {
      const se = document.querySelector('.dl [data-tut="slot-e"]'), pile = document.querySelector('.dl .pile small');
      const out = window.__e2e.marks = [];
      let t0 = null;
      const root = document.querySelector('.dl');
      const onClick = ev => { if (t0 == null && ev.target.closest && ev.target.closest('.pop .ab')) { t0 = performance.now(); root.removeEventListener('click', onClick, true); } };
      root.addEventListener('click', onClick, true);
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
    // 盤面裡最大的空帶（FIXLIST 9：沒有超過約 24 px 的）：看得到的東西的上下範圍聯集，找最大的縫（含盤面上緣、下緣到畫面底）
    bands() {
      const dl = document.querySelector('.dl'), R = dl.getBoundingClientRect(), bot = Math.min(R.bottom, innerHeight);
      const iv = [];
      const vis = el => { const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || el.hidden || el.closest('[hidden]')) return false; const b = el.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
      for (const q of ['.dl-e .nmrow', '.dl-e .hp', '.slot.e', '.slot.p', '.slot .who', '.rounds', '.tri', '.hint', '.callout.on', '.lastline', '.dl-p .nmrow', '.dl-p .hp', '.tile:not(.gone)', '.pop .ab'])
        dl.querySelectorAll(q).forEach(el => { if (!vis(el)) return; const b = el.getBoundingClientRect(); iv.push([b.top, b.bottom]); });
      const e = dl.querySelector('.dl-e').getBoundingClientRect(), p = dl.querySelector('.dl-p').getBoundingClientRect();
      iv.push([e.bottom - 1, e.bottom], [p.top, p.top + 1]);
      iv.sort((a, b) => a[0] - b[0]);
      let y = R.top, max = 0, at = null;
      for (const [t, b] of iv) { if (t > y && t - y > max) { max = t - y; at = Math.round(y); } y = Math.max(y, b); }
      if (bot - y > max) { max = bot - y; at = Math.round(y); }
      return { max: Math.round(max), at };
    },
    hintNow() {
      const C = window.DipLabContent, v = window.DipLabEngine.view(window.__lab.rawDuel());
      const tx = (document.querySelector('.dl [data-tut="e-hint"] .tx') || {}).textContent || '';
      const want = v.hint ? ((C.hints[v.hint.attr] || []).find(x => x.id === v.hint.line) || {}).text : null;
      return { n: v.n, tx, want, rounds: (document.querySelector('.dl [data-tut="rounds"]') || {}).textContent || '' };
    },
  };
}

// index.html 版：用 ui.js 的 __lab.duelLab 開場，做一份跟 harness 同介面的 window.__h（setNext／remount／ended／music／sfx／log）
function indexShim(o) {
  const L = window.__lab, F = window.DipLabFx;
  const H = window.__h = window.__h || { log: [], sfx: [], music: [], next: null, ready: false };
  if (!H.wrapped) {
    H.wrapped = true;
    const s0 = F.sfx; F.sfx = function (n, x) { H.sfx.push([n, x == null ? null : JSON.parse(JSON.stringify(x))]); if (H.sfx.length > 400) H.sfx.splice(0, 200); return s0.apply(this, arguments); };
    const m0 = F.music.play; F.music.play = function (card) { H.music.push(card && card.id); return m0.apply(this, arguments); };
    const CI = window.DipLabCardInfo;
    if (CI && CI.open) { const o0 = CI.open; CI.open = function (c) { H.log.push('info ' + (typeof c === 'string' ? c : c && c.id)); return o0.apply(this, arguments); }; }
    const T = window.DipLabTut;
    if (T && T.hintHook) { const h0 = T.hintHook; T.hintHook = function (id, targets) { H.log.push('hint ' + id + ' ' + (targets || []).join('|')); return h0.apply(this, arguments); }; }
    H.setNext = spec => { H.next = spec; return L.duelLab.setNext(spec); };
    H.remount = s => { H.next = null; L.duelLab.setNext(null); return L.duelLab.start(Object.assign({}, H.opts, { seed: s })); };
    Object.defineProperty(H, 'ended', { get: () => L.duelLab.ended, set: v => { L.duelLab.ended = v; }, configurable: true });
  }
  H.opts = o;
  L.duelLab.start(o);
  H.ready = true;
  return true;
}
// ---------------------------------------------------------------- 共用步驟
async function boot(page, extra = '', seed = 7) {
  if (INDEX) {
    const num = k => { const m = new RegExp('[&?]' + k + '=(\\d+)').exec(extra); return m ? +m[1] : null; };
    const rest = extra.replace(/&(hp|ehp)=\d+/g, '');
    await page.goto(`${HARNESS}?debug=1&seed=${seed}${rest}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-a=push],[data-a=cont]', { state: 'visible', timeout: 10000 });
    await page.waitForFunction(() => !document.body.classList.contains('stage-wait') && window.__lab && window.__lab.stage && window.__lab.duelLab, null, { timeout: 10000 });
    await page.evaluate(indexShim, { enemy: ENEMY, seed, hp: num('hp'), ehp: num('ehp') });
  } else await page.goto(`${HARNESS}?enemy=${ENEMY}&seed=${seed}&noend=1&debug=1${SHOTS ? '&shot=1' : ''}${extra}`, { waitUntil: 'domcontentloaded' });
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
  const r = await hitPoint(page, 'dt:' + name);   // 疊著時每張只露出左邊一條：點真的點得到的那一點
  if (!r) throw new Error('no element ' + name);
  await page.touchscreen.tap(r.x, r.y);
  return r;
}
// 點那張（＝在那張打開；已經打開就不再點：再點＝收回）
async function liftIt(page, i) {
  if ((await page.evaluate(() => window.DipLabDuel.debug().open)) === i) return;
  await tapName(page, i === 'ace' ? 'card-ace' : `card-${i}`); await sleep(260);
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
// 照 find() 的結果真點：點那張（打開）→ 他那邊排好；throwIt＝點那個屬性鈕（＝丟）
async function selectPlay(page, f) {
  const i = f.act.ace ? 'ace' : f.act.i;
  await liftIt(page, i);
  await page.evaluate(e => window.__h.setNext(e), f.e);
  page._next = i === 'ace' ? 'chip-ace' : `chip-${i}-${f.pa}`;
  return (await dbg(page)).sel;
}
async function throwIt(page, name) { await tapName(page, name || page._next); page._next = null; }
// 點第 i 張（打開）→ 點最高那顆（.top）丟出；回丟的那張 id
async function quickPlay(page, i) {
  await liftIt(page, i);
  const r = await page.evaluate(() => { const b = document.querySelector('.dl .pop .ab.top'); const x = window.DipLabDuel.debug(); return { tut: b && b.dataset.tut, id: window.DipLabEngine.view(window.__lab.rawDuel()).hand[x.sel.i].id }; });
  await tapName(page, r.tut);
  return r.id;
}
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
      // 王牌沒有「不會被剋」（FIXLIST 2）：被 ≤5 星剋＝差 2 星剋不動（gap）
      out.aceGap = line(F.clashText(ev({ pAttr: 'h', eAttr: 'c', kind: 'mirrorWin', toE: 5, blocked: 'gap', by: 'e', ace: true }), T, C.hints));
      out.aceText = Object.values(C.duelText || {}).some(t => /不會被剋/.test(t)) || /不會被剋/.test(F.text(null)('aceYou') + F.text(null)('aceHim'));
      out.aceCounter = line(F.clashText(ev({ pAttr: 'o', eAttr: 'c', kind: 'counter', toE: 7, by: 'p', ace: true }), T, C.hints));
      out.mirror = line(F.clashText(ev({ pAttr: 'c', eAttr: 'c', kind: 'mirrorWin', toE: 1 }), T, C.hints));
      out.tie = line(F.clashText(ev({ pAttr: 'c', eAttr: 'c', kind: 'tie' }), T, C.hints));
      out.countered = line(F.clashText(ev({ pAttr: 'c', eAttr: 'o', kind: 'countered', toP: 5, by: 'e' }), T, C.hints));
      out.rs = [T('roundsOut'), T('roundsScore', { p: '90', e: '70', who: '你' }), T('roundsEven', { p: '50', e: '50' })];
      return out;
    });
    const want = {
      d1: '冷門剋經典，命中！他 −4', d2: '冷門剋經典，但他高你 2 星以上，剋不動。比星數，你 −3', d3: '他唬你！『紀念版』是經典，他出的是硬蕊。你 −4',
      nkB: '他唬你！提示是經典，他出的是硬蕊。', nkH: '提示是冷門，他照實出。', hon: '『白版』是冷門，他照實出。',
      bb: ['他唬你！『白版』是冷門，他出的是經典。', '他 −2', '經典剋硬蕊，但你高他 2 星以上，他剋不動。比星數。'],
      him: '冷門剋經典，但你高他 2 星以上，他剋不動。比星數，他 −2', aceGap: '經典剋王牌硬蕊，但你高他 2 星以上，他剋不動。比星數，他 −5', aceText: false,
      aceCounter: '王牌冷門剋經典，命中！他 −7',
      mirror: '同樣是經典，比星數，他 −1', tie: '同樣是經典，比星數，一樣大，不扣。', countered: '冷門剋經典，被剋了。你 −5',
      rs: ['六手打完，比聲望條', '你剩 90%，他剩 70%：你贏', '你剩 50%，他剩 50%：一樣，算你贏'],
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
    // ---- 1 版面（v5 手風琴：疊著 → 打開中間那張 → 最左那張 → 王牌；封面同一個大小）
    const snapHand = () => page.evaluate(() => {
      const D = window.DipLabDuel, rect = el => { if (!el) return null; const b = el.getBoundingClientRect(); return { l: b.left, t: b.top, r: b.right, b: b.bottom, w: b.width, h: b.height }; };
      const root = document.querySelector('.dl');
      const rot = t => { const m = getComputedStyle(t).transform; if (!m || m === 'none') return 0; const d = new DOMMatrix(m); return Math.round(Math.atan2(d.b, d.a) * 1800 / Math.PI) / 10; };
      const tiles = [...document.querySelectorAll('.dl [data-tut=hand] .tile:not(.gone)')].map(t => ({ tut: t.dataset.tut, r: rect(t), cv: rect(t.querySelector('.cvw')), up: t.classList.contains('up'), rot: rot(t) }));
      // 每張露出來的寬：從這張左緣到下一張（蓋在上面那張）左緣
      const strips = tiles.map((t, k) => k < tiles.length - 1 ? tiles[k + 1].r.l - t.r.l : t.r.w);
      const abs = [...document.querySelectorAll('.dl .pop .ab')].map(b => ({ tut: b.dataset.tut, top: b.classList.contains('top'), r: rect(b) }));
      const x = D.debug(), v = window.DipLabEngine.view(window.__lab.rawDuel());
      return { vh: innerHeight, vw: innerWidth, scroll: [root.scrollHeight, root.clientHeight], doc: [document.documentElement.scrollHeight, document.documentElement.scrollWidth],
        tiles, strips, abs, open: x.open, sel: x.sel, n: x.n, hand: rect(D.el('hand')), hint: rect(D.el('e-hint')), cls: root.className, bands: window.__e2e.bands(),
        topAttr: x.sel && x.sel.i !== 'ace' ? window.DipLabEngine.topAttr(v.hand[x.sel.i]) : null, slotP: (document.querySelector('.dl .slot.p') || {}).className || '',
        hon: !!D.el('e-honesty'), nm: ((document.querySelector('.dl .dl-e .nm') || {}).textContent || '').trim(),
        sub: (document.querySelector('.dl .dl-e .nmrow .sub') || {}).textContent || '',
        want: ((window.DipLabContent.enemies || {})[(window.__lab.rawDuel() || { e: {} }).e.id] || {}).name || '',
        sleeve: (D.el('e-sleeve') || {}).textContent || '', slotE: (D.el('slot-e') || {}).textContent || '', thr: !!document.querySelector('.dl [data-tut=throw]'), chipRow: document.querySelectorAll('.dl .tile .chip').length,
        oldUi: document.querySelectorAll('.dl .hprompt, .dl .hand.spread').length };
    });
    const inView = (L, list) => list.every(x => x.r.l >= -0.5 && x.r.r <= L.vw + 0.5 && x.r.t >= -0.5 && x.r.b <= L.vh + 0.5);
    const noScroll = L => L.scroll[0] <= L.scroll[1] + 1 && L.doc[0] <= L.vh + 1 && L.doc[1] <= L.vw + 1;
    // 打開第 k 張（tiles 的索引）：封面跟疊著（F0）一樣大；那張整張露出來（右邊那張的左緣不在它裡面）、浮起、在畫面裡；
    //   其他照樣疊著（露出 22–35%）；屬性鈕在那張上面、橫向跟那張重疊、不蓋提示句；不捲動；空帶 ≤24
    const openCheck = (O, k, F0, nChips) => {
      const up = O.tiles[k], n = O.tiles.length, why = [];
      if (!up || !up.up || O.tiles.filter(t => t.up).length !== 1) why.push('浮起的不是第 ' + k + ' 張');
      if (!O.tiles.every(t => Math.abs(t.r.w - F0) < 0.6 && Math.abs(t.r.h - F0) < 0.6)) why.push('封面大小 ' + O.tiles.map(t => Math.round(t.r.w)).join('/') + ' ≠ ' + Math.round(F0));
      if (k < n - 1 && O.tiles[k + 1].r.l < up.r.r - 0.5) why.push('右邊那張蓋到打開那張 ' + Math.round(up.r.r - O.tiles[k + 1].r.l) + ' px');
      if (up && !(up.r.t < Math.min(...O.tiles.filter((t, j) => j !== k).map(t => t.r.t)) - 3)) why.push('沒浮起');
      if (!inView(O, O.tiles)) why.push('有封面在畫面外');
      O.strips.forEach((d, j) => { if (j === k || j === n - 1) return; if (d < 0.22 * F0 - 0.6 || d > 0.35 * F0 + 0.6) why.push('第 ' + j + ' 張露出 ' + Math.round(d) + ' px（' + Math.round(d / F0 * 100) + '%）'); });
      if (O.abs.length !== nChips) why.push('屬性鈕 ' + O.abs.length + ' 顆');
      if (!O.abs.every(b => b.r.w >= 44 && b.r.h >= 44)) why.push('屬性鈕小於 44');
      if (!inView(O, O.abs)) why.push('屬性鈕在畫面外');
      if (up && O.abs.length && Math.max(...O.abs.map(b => b.r.b)) > up.r.t + 0.5) why.push('屬性鈕不在那張上面');
      if (up && O.abs.length && !(Math.min(...O.abs.map(b => b.r.l)) < up.r.r && Math.max(...O.abs.map(b => b.r.r)) > up.r.l)) why.push('屬性鈕沒對著那張');
      if (O.hint && O.abs.some(b => b.r.t < O.hint.b - 0.5 && b.r.b > O.hint.t && b.r.l < O.hint.r && b.r.r > O.hint.l)) why.push('屬性鈕蓋到提示句');
      if (!noScroll(O)) why.push('捲動');
      if (O.bands.max > 24) why.push('空帶 ' + O.bands.max + ' px（y=' + O.bands.at + '）');
      if (O.oldUi) why.push('還有攤開／虛線框');
      return why;
    };
    const desc = O => `封面 ${O.tiles.map(t => Math.round(t.r.w)).join('/')} px、露出 ${O.strips.map(Math.round).join('/')} px、上緣 ${O.tiles.map(t => Math.round(t.r.t)).join('/')}；屬性鈕 ${O.abs.map(b => b.tut + (b.top ? '*' : '') + ' ' + Math.round(b.r.w) + '×' + Math.round(b.r.h) + '@' + Math.round(b.r.l) + ',' + Math.round(b.r.t)).join('、')}；最大空帶 ${O.bands.max} px`;
    {
      const F = await snapHand();
      // 店主 17:1x：水平直線（像舊版新接龍）——每張同一個上緣、不轉角；露出左邊約 3 成寬（25–35%）；封面一樣大
      const tops0 = F.tiles.map(t => Math.round(t.r.t)), flat = Math.max(...tops0) - Math.min(...tops0) <= 1 && F.tiles.every(t => !t.rot);
      const ratio = F.strips.slice(0, -1).map((d, k) => d / F.tiles[k].r.w), okR = ratio.every(x => x >= 0.25 && x <= 0.35);
      const F0 = F.tiles[0].r.w, same = F.tiles.every(t => Math.abs(t.r.w - F0) < 0.6 && Math.abs(t.r.h - F0) < 0.6);
      const okF = F.open == null && !F.sel && F.tiles.length === 6 && F.tiles[5].tut === 'hand-ace' && same && inView(F, F.tiles) && noScroll(F) && flat && okR && Math.min(...F.strips) >= 14 && !F.thr && !F.chipRow && !F.oldUi && F.bands.max <= 24;
      record('1a', size, okF, `疊著：${F.tiles.map(t => t.tut).join(',')}；上緣 ${[...new Set(tops0)].join('/')}、轉角 ${[...new Set(F.tiles.map(t => t.rot))].join('/')}°；封面 ${F.tiles.map(t => Math.round(t.r.w)).join('/')} px，每張露出 ${F.strips.map(Math.round).join('/')} px（${ratio.map(x => Math.round(x * 100)).join('/')}%）；都在畫面裡 ${inView(F, F.tiles)}；最大空帶 ${F.bands.max} px（y=${F.bands.at}）；丟！${F.thr ? '還在' : '沒有'}、星鈕列 ${F.chipRow}（${F.cls}）`);
      await shot(page, `${size}-0-stack.png`);
      await tapName(page, 'card-2'); await sleep(320);
      const O = await snapHand(), w2 = openCheck(O, 2, F0, 3);
      const okO = !w2.length && O.open === 2 && O.sel && O.sel.attr === O.topAttr && O.abs.filter(b => b.top).map(b => b.tut).join() === `chip-2-${O.topAttr}` && / pre/.test(O.slotP);
      record('1b', size, okO, `打開 card-2：${w2.join('；') || 'ok'}；${desc(O)}；sel ${short(O.sel)}（topAttr ${O.topAttr}）；你丟的「${O.slotP}」`);
      await shot(page, `${size}-0-open2.png`);
      await tapName(page, 'card-0'); await sleep(320);
      const U = await snapHand(), w0 = openCheck(U, 0, F0, 3);
      const okU = !w0.length && U.open === 0 && U.sel && U.sel.attr === U.topAttr && U.abs.filter(b => b.top).map(b => b.tut).join() === `chip-0-${U.topAttr}` && / pre/.test(U.slotP);
      record('1c', size, okU, `打開 card-0（最左）：${w0.join('；') || 'ok'}；${desc(U)}；sel ${short(U.sel)}`);
      await shot(page, `${size}-0-open0.png`);
      record('1d', size, !U.hon && !U.sub && U.nm === U.want && U.want, `名牌「${U.nm}」（要＝content 的新名字「${U.want}」）；副標 ${U.sub ? '「' + U.sub + '」' : '沒有'}；誠實度 ${U.hon ? '還在 DOM' : '沒有'}（FIXLIST 6）`);
      record('1e', size, /蓋著/.test(U.sleeve), `他的封套：「${U.sleeve.trim()}」；牌桌他那格：「${U.slotE.trim()}」`);
      await tapName(page, 'card-ace'); await sleep(320);
      const A = await snapHand(), wa = openCheck(A, 5, F0, 1);
      const stay = A.tiles.every((t, j) => j === 5 || (Math.abs(t.r.l - F.tiles[j].r.l) < 0.6 && Math.abs(t.r.t - F.tiles[j].r.t) < 0.6));
      const okA = !wa.length && A.open === 'ace' && A.abs.length === 1 && A.abs[0].tut === 'chip-ace' && stay;
      record('1f', size, okA, `打開王牌（最右）：${wa.join('；') || 'ok'}；其他 5 張跟疊著時同一個位置 ${stay}；${desc(A)}`);
      await shot(page, `${size}-0-openace.png`);
    }
    // ---- 2 點一張＝在那張打開；3 點別張＝換；4 再點打開那張＝收回、點外面＝收回；4b 雙擊的第二下不收回
    {
      await page.evaluate(() => window.DipLabDuel.select(null)); await sleep(250);
      const n0 = (await dbg(page)).n;
      await tapName(page, 'card-1'); await sleep(260);
      const r = await page.evaluate(() => {
        const D = window.DipLabDuel, E = window.DipLabEngine, v = E.view(window.__lab.rawDuel()), x = D.debug();
        return { sel: x.sel, open: x.open, top: E.topAttr(v.hand[1]), ab: [...document.querySelectorAll('.dl .pop .ab')].map(b => b.dataset.tut + (b.classList.contains('top') ? '*' : '')), n: x.n, slotP: (D.el('slot-p') || {}).className };
      });
      const ok2 = r.open === 1 && r.sel && r.sel.i === 1 && r.sel.attr === r.top && r.ab.join() === ['c', 'o', 'h'].map(a => `chip-1-${a}${a === r.top ? '*' : ''}`).join() && / pre/.test(r.slotP);
      record(2, size, ok2, `疊著點 card-1 → 打開 ${r.open}、${short(r.sel)}（topAttr ${r.top}）；屬性鈕 ${r.ab.join(',')}；你丟的「${r.slotP}」`);
      await tapName(page, 'card-2'); await sleep(320);
      const s3 = await snapHand();
      const ov3 = s3.strips[1] < s3.tiles[1].r.w - 0.5 && s3.tiles[3].r.l >= s3.tiles[2].r.r - 0.5;
      record(3, size, s3.open === 2 && s3.sel && s3.sel.i === 2 && s3.abs.length === 3 && s3.abs.every(b => /^chip-2-/.test(b.tut)) && ov3, `點 card-2 → 換成 ${short(s3.sel)}；屬性鈕 ${s3.abs.map(b => b.tut).join(',')}；card-1 又被蓋回去、card-2 整張露出來 ${ov3}`);
      await tapName(page, 'card-2'); await sleep(400);
      const s4 = await page.evaluate(() => { const x = window.DipLabDuel.debug(); return { phase: x.phase, n: x.n, busy: x.busy, open: x.open, sel: x.sel, ab: document.querySelectorAll('.dl .pop .ab').length }; });
      await tapName(page, 'card-2'); await sleep(400);
      const s4a = await dbg(page);
      await tapName(page, 'slot-e'); await sleep(350);
      const s4b = await page.evaluate(() => ({ open: window.DipLabDuel.debug().open, sel: window.DipLabDuel.debug().sel, n: window.DipLabDuel.debug().n, ab: document.querySelectorAll('.dl .pop .ab').length }));
      const ok4 = s4.phase === 'choose' && s4.n === n0 && !s4.busy && s4.open == null && !s4.sel && !s4.ab && s4a.sel && s4a.sel.i === 2 && s4b.open == null && !s4b.sel && s4b.n === n0 && !s4b.ab;
      record(4, size, ok4, `再點打開那張 → 收回：第 ${s4.n} 手、${s4.phase}、打開 ${s4.open}、屬性鈕 ${s4.ab}；再點 → 打開 ${short(s4a.sel)}；點牌桌（手牌外面）→ 打開 ${s4b.open}、屬性鈕 ${s4b.ab}`);
      const p3 = await hitPoint(page, 'dt:card-3');
      await page.touchscreen.tap(p3.x, p3.y); await sleep(120); await page.touchscreen.tap(p3.x, p3.y); await sleep(400);
      const s4c = await page.evaluate(() => window.DipLabDuel.debug().open);
      await page.touchscreen.tap(p3.x, p3.y); await sleep(400);
      const s4d = await page.evaluate(() => window.DipLabDuel.debug().open);
      record('4b', size, s4c === 3 && s4d == null, `雙擊 card-3（120 ms）→ 還開著 ${s4c}；停一下再點同一點 → 收回 ${s4d == null}`);
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
      [9, 'ace', u => u.blocked === 'gap' && u.by === 'e' && /剋王牌.{2}，但你高他 2 星以上，他剋不動。比星數[，。]$/.test(u.bluff ? u.ui.l3 : u.ui.l1) && !/不會被剋/.test(u.ui.l1 + u.ui.l3) && u.tipAce, `${size}-6-ace.png`],   // 他唬人時規則句在 l3
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
      const u = Object.assign({}, ex, { ui, deck: st.deck, chime0: st.sfx.some(([k, o]) => k === 'chime' && o && o.attr === null), tip: st.log.some(s => /^hint tip_bluff/.test(s)), tipAce: st.log.some(s => /^hint tip_ace/.test(s)) });
      const ok = okC && sameLines(ui, ex) && test(u);
      record(n, size, ok, `${want}：浮框 ${short([ui.l1, ui.l2, ui.l3])}${n === 8 ? `；chime(null) ${u.chime0 ? '有' : '沒有'}；唱盤 ${JSON.stringify(st.deck)}` : ''}${n === 7 ? `；tip_bluff ${u.tip ? '有' : '沒有'}` : ''}${n === 9 ? `；tip_ace ${u.tipAce ? '有' : '沒有'}` : ''}`);
      await waitChoose(page);
    }
    // ---- 10 __lab.force：counter → 1.6 s 唱盤上是你的（by p）；tie → 空盤
    for (const [k, o, test] of [['counter', { kind: 'counter', toE: 1, toP: 0 }, d => d && d.by === 'p'], ['tie', { kind: 'tie', toE: 0, toP: 0 }, d => d === null]]) {
      await remount(page, 300);
      await page.evaluate(o => window.__lab.force(o), o);
      await quickPlay(page, 0);
      await sleep(1600);
      const d = await page.evaluate(() => window.__lab.stage.clashState().deck);
      record('10-' + k, size, test(d), `force ${k} → 1.6 s clashState().deck＝${JSON.stringify(d)}`);
      await page.evaluate(() => window.__lab.force(null));
      await waitChoose(page);
    }
    // ---- 11 長按手牌封面＝唱片資訊（不選牌）
    {
      await page.evaluate(() => window.DipLabDuel.select(null));
      await page.evaluate(() => window.DipLabDuel.select(null)); await sleep(250);   // 疊著：card-2 只露出左邊一條，長按那一條
      const r = Object.assign(await hitPoint(page, 'dt:card-2'), await page.evaluate(() => ({ id: window.DipLabDuel.el('card-2').closest('.tile').dataset.card })));
      const n0 = await page.evaluate(() => window.__h.log.length);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: r.x, y: r.y }] });
      await sleep(650);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await sleep(300);
      const st = await page.evaluate(([n0, q]) => ({ log: window.__h.log.slice(n0), modal: !!document.querySelector(q), sel: window.DipLabDuel.debug().sel, open: window.DipLabDuel.debug().open }), [n0, INFO_SEL]);
      const ok = st.log.includes('info ' + r.id) && st.modal && !st.sel && st.open == null;
      record(11, size, ok, `疊著長按 card-2 → ${st.log.join(',') || '沒有'}；唱片資訊${st.modal ? '開著' : '沒開'}；選牌 ${short(st.sel)}、打開 ${st.open}`);
      await page.evaluate(q => { const b = document.querySelector(q); if (b) b.click(); }, INFO_CLOSE);
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
        lastP = await quickPlay(page, 0);
        await page.waitForFunction(k => { const x = window.DipLabDuel.debug(); return x.busy || x.n > k + 1 || window.__h.ended; }, k, { timeout: 5000 }).catch(() => {});
      }
      const okO = ok6 && await waitOver(page);
      await sleep(400);
      const R = await page.evaluate(() => ({ ended: window.__h.ended && { by: window.__h.ended.by, win: window.__h.ended.win, pHp: window.__h.ended.pHp, eHp: window.__h.ended.eHp },
        pct: (() => { const d = window.__lab.rawDuel(); return d && window.DipLabEngine.pctPair(d.p.hp, d.p.max, d.e.hp, d.e.max); })(),
        stamp: [((document.querySelector('.dl .kost b') || {}).textContent || ''), ((document.querySelector('.dl .kost small') || {}).textContent || '')],
        music: window.__h.music.slice(), last: window.__e2e.expect(), tip: window.__h.log.some(s => /^hint tip_rounds/.test(s)) }));
      const ok = okO && R.ended && R.ended.by === 'rounds' && R.ended.win && R.last.kind === 'countered' && R.stamp[0] === '六手打完，比聲望條' && R.pct && R.stamp[1] === `你剩 ${R.pct.p}%，他剩 ${R.pct.e}%：你贏` && R.stamp[1] === '你剩 90%，他剩 70%：你贏';
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
      await quickPlay(page, 0);
      const okO = await waitOver(page);
      await sleep(500);
      const R = await page.evaluate(() => ({ ended: window.__h.ended && { by: window.__h.ended.by, win: window.__h.ended.win }, stamp: ((document.querySelector('.dl .kost b') || {}).textContent || ''), music: window.__h.music.slice(), last: window.__e2e.expect() }));
      record('13b', size, okO && R.ended.by === 'hp' && !R.ended.win && R.stamp === '聲望歸零' && R.music.length === 1 && R.music[0] === R.last.eCard, `他 KO 你：${short(R.ended)}「${R.stamp}」勝利曲 ${JSON.stringify(R.music)}（他丟的 ${R.last.eCard}）`);
      await page.evaluate(() => window.__lab.force(null));
    }
    // ---- 14 autoplay（走正常點擊流程）打完一場
    {
      await boot(page, '&fast=1', 31);
      await page.evaluate(() => { window.__lab.autoplay('thoughtful', { animated: true }); });   // index.html：animated＝走盤面的點擊流程（harness 不看第二個參數）
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
