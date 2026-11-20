// game-lab/career.mjs — 第 D 波棒一：多趟成長（樂歷 → 等級 → 天賦點／階梯／升級抽盤 → 下一趟開局帶上）。scratchpad v5/wave-d SPEC-D §7.2、§8.2（G 門檻）。
//   真引擎、真 Career API（careerGain／careerLevel／talentBuy／talentArgs／careerDraw／seedPolicy／keepCandidates）；每一趟跟 sim.mjs 的 smart 流程一樣
//   （特價箱 bargainPolicy、獎勵／攤位／選秀 cPolicy、升級 runPolicy、每位客人前 shopPolicy('smart')＋收音機 radioSmart、說情）。規則一行都不在這裡重寫。
// Usage: node game-lab/career.mjs [--careers 200] [--runs 30] [--policies thoughtful,humanRead,novice,high] [--ace hall|pearl|heresy]
//          [--gate 999] [--spend even|atk] [--money on|off] [--seeds on|off] [--keep on|off] [--lowmul m] [--lowbelow 10] [--tier k]
//          [--fac] [--patch '{"career":{…}}'] [--cap 300] [--json out.json] [--ctl ctl.json]
//   --fac（第 D 波棒二；SPEC-D §7.2）：每一趟 newRun 多 fac:true（?fac=1 三流派：被動＋代價＋本派選項，runPolicy 出了就拿）。G3 帶流派重判用；
//     沒給 --fac 時一字不差（newRun 不收 fac 鍵）
//   一個 career＝一個新帳號（ui createRun／recordRun 的跨趟規則）：
//     第 1 趟打序章（沒有天賦、沒有種子、沒有配件）；之後不打。上一趟沒到第 10 位（含第 1 趟）＝新手保底（safety）。
//     配件跨趟帶（save.relics＝上一趟最後 3 件）、最遠紀錄（bestFar：攤位解鎖、破紀錄）、寶箱保底計數（chestDry）跨趟帶。
//     唱片櫃（擁有）＝挑過的流派送的四張（gift）＋每趟結算「帶走一張」（keepCandidates 裡 peak 最高的；--keep off 不帶）＋升級抽到的（careerDraw）。
//       今日推薦、主站帶來的那張不算（sim 沒有日子）。第 2 趟起帶唱片櫃裡 peak 最高的 seedMax 張當種子（seedPolicy；--seeds off 不帶）。
//     每趟結束：careerGain(runSummary, {best: 開局前最遠, tier})＝基本＋破紀錄＋路線（截過）×(1＋0.1×階級)×(這一趟沒到第 10 位、開局前最遠也 <10 ×lowMul；sim 不放棄)；升級抽盤；照花點策略花點。
//     下一趟開局：talentArgs（天賦＋階梯 seedMax／relicPick／goldAdd；Lv8 前只有錢類）。
//   --gate 999（或 --control）：對照組＝天賦、階梯、升級抽盤全不開（talentArgs 永遠 {}）＝現況的跨趟成長（配件、保底、種子 3 格、帶走一張）。
//     其他 --gate N＝戰力類（品味／底氣／聲望／局內經驗／稀有率）改成 Lv N 開（試算）
//   花點策略（--spend even，SPEC-D §7.2「平均分配」）：戰力開了以後依序——說情開了（Lv20）、戰力三項合計 ≥3 級、還沒點＝備用說情（15 點；不夠就存）；
//     戰力合計 ≥3、稀有率 <3＝稀有率；戰力合計 ≥6、局內經驗 <2＝局內經驗；其他＝品味／底氣／聲望裡等級最低的（同級 品味→底氣→聲望）。點不起就存著。
//     戰力開之前（Lv2–7）的點先點錢類（開局錢、酬勞各 3 級；--money off 不點），一到 Lv8 全部重配（免費）再照上面點。--spend atk＝戰力只點品味（對照）
//   試煉選法（--tierpol climb）是棒三（試煉階級）的事，這裡只有固定 --tier k。
//   印：第 1、2、3、4、5、6、8、10、12、15、20、25、30 趟的深度中位／平均、到第 10／20／50／100 位、開局樂歷 Lv、已花點、主幹各級、階梯（種子格／三選一）、有戰力的帳號、
//     那趟樂歷（基本＋路線，未截的路線、×2 的趟）。--ctl <對照組 JSON>：多印 G2／G3／G4（SPEC-D §8.2；同 careers、runs、policies 才比）
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const EN = require(path.join(HERE, 'engine.js'));
const C = require(path.join(HERE, 'content.js'));
const { TIERS, CFG } = EN;
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 && argv[i + 1] != null ? argv[i + 1] : d; };
const onOff = (k, d) => { const v = arg(k, d); if (!['on', 'off'].includes(v)) { console.error('--' + k + ' on|off'); process.exit(2); } return v === 'on'; };
const NC = +arg('careers', 200), NR = +arg('runs', 30), CAP = +arg('cap', 300), TIER = +arg('tier', 0);
const POLS = arg('policies', 'thoughtful,humanRead,novice,high').split(',').filter(Boolean);
for (const p of POLS) if (!EN.policies[p]) { console.error('unknown policy ' + p); process.exit(2); }
const ACE = arg('ace', null);
if (ACE && !TIERS.includes(ACE)) { console.error('--ace ' + TIERS.join('|')); process.exit(2); }
const CONTROL = argv.includes('--control') || +arg('gate', 0) >= 999;
const GATE = !CONTROL && arg('gate', null) != null ? +arg('gate') : null;
const SPEND = arg('spend', 'even');
if (!['even', 'atk'].includes(SPEND)) { console.error('--spend even|atk'); process.exit(2); }
const MONEY = onOff('money', 'on'), SEEDS = onOff('seeds', 'on'), KEEP = onOff('keep', 'on');
const FAC = argv.includes('--fac');
if (FAC && !(C.factions && C.factions.on !== false)) { console.error('--fac：content 沒有 factions'); process.exit(2); }
if (argv.includes('--tierpol')) { console.error('--tierpol 是棒三（試煉階級）的事；棒一只有固定 --tier k'); process.exit(2); }
const deepMerge = (t, s) => { for (const k in s) { if (s[k] && typeof s[k] === 'object' && !Array.isArray(s[k]) && t[k] && typeof t[k] === 'object') deepMerge(t[k], s[k]); else t[k] = s[k]; } return t; };
C.career = C.career || {};
if (arg('lowmul', null) != null) deepMerge(C, { career: { lexp: { lowMul: +arg('lowmul') } } });
if (arg('lowbelow', null) != null) deepMerge(C, { career: { lexp: { lowBelow: +arg('lowbelow') } } });
if (arg('patch', null)) deepMerge(C, JSON.parse(arg('patch')));
if (GATE != null) {                                                   // 試算：戰力類改成 Lv GATE 開（talents 陣列整個換）
  const K = EN.careerCfg(C);
  C.career.talents = K.talents.map(T => ['atk', 'def', 'hp', 'xp', 'rare'].includes(T.id) ? Object.assign({}, T, { open: GATE }) : T);
}
const K = EN.careerCfg(C);
const POWER = ['atk', 'def', 'hp'];
const ok = (r, who, ch) => { if (!r || !r.ok) throw new Error(who + ' ' + (r && r.error) + ' ' + JSON.stringify(ch)); };
const lvOf = cr => EN.careerLevel(C, cr.xp).level;
const powerOpen = cr => EN.talentOpen(C, 'atk', lvOf(cr));

// ---------------- 花點 ----------------
function buy(cr, id) { const r = EN.talentBuy(C, cr, id); if (!r.ok) return r.error; Object.assign(cr, { spent: r.career.spent }); return null; }
function spend(cr) {
  if (CONTROL) return;
  if (!powerOpen(cr)) {                                                // Lv2–7：錢類（只多錢；Lv8 一到全部重配）
    if (!MONEY) return;
    for (const id of ['money', 'pay']) while (!buy(cr, id));
    return;
  }
  if (!cr.respecced) { cr.spent = {}; cr.respecced = true; }           // 戰力開了：錢類退回，照戰力策略重配（免費）
  for (let g = 0; g < 500; g++) {
    const sp = cr.spent, lv = k => sp[k] | 0, core = POWER.reduce((s, k) => s + lv(k), 0);
    let id;
    if (EN.talentOpen(C, 'plea', lvOf(cr)) && core >= 3 && !lv('plea')) id = 'plea';
    else if (core >= 3 && lv('rare') < 3 && EN.talentOpen(C, 'rare', lvOf(cr))) id = 'rare';
    else if (core >= 6 && lv('xp') < 2 && EN.talentOpen(C, 'xp', lvOf(cr))) id = 'xp';
    else if (SPEND === 'atk') id = 'atk';
    else id = POWER.reduce((m, k) => lv(k) < lv(m) ? k : m, 'atk');
    if (buy(cr, id)) return;                                           // 點不起（points）／還沒開（locked）＝存著
  }
}

// ---------------- 一場、一趟 ----------------
function play(duel, pol, R, mem) {
  const fn = EN.policies[pol]; let g = 0;
  while (!duel.over) { if (++g > 20) throw new Error('runaway duel'); const act = fn(duel, R, mem, C); if (!EN.isLegal(duel, act)) throw new Error('illegal ' + pol); EN.resolveTurn(duel, act); }
  return duel;
}
// 收音機（＝sim.mjs radioSmart：每輪一次，轉剋下一位主屬性那軸平均星最高的那格，bagScore 有漲、錢夠才買）
function radioSmart(run) {
  if (!EN.canRadio || !EN.canRadio(run)) return;
  const id = run.order[run.idx], E = C.enemies[id]; if (!E) return;
  const g = EN.guestDef(run, C, id, run.pos), deck = g.deck.slice(); if (g.ace) deck.push(g.ace);
  const T = EN.COUNTER_OF[EN.deckMain(deck, E.taste)];
  let best = null, bv = -1;
  for (const cell of C.tunes.order) { const pool = EN.radioPool(run, C, cell); if (!pool.length) continue; const v = pool.reduce((s, x) => s + EN.star(C.cards[x], T), 0) / pool.length; if (v > bv) { bv = v; best = cell; } }
  if (!best) return;
  ok(EN.choose(run, C, { type: 'radio', cell: best }), 'radio', best);
  const rid = run.shop.radio.id, price = EN.bargainPriceIn(run, C, rid), ch = { type: 'buyBargain', ids: [rid] };
  if (EN.bagFull(run)) {
    const weak = run.bag.filter(x => !EN.isGift(run, C, x) && !EN.isSeed(run, C, x)).sort((a, b) => EN.power(C.cards[a]) - EN.power(C.cards[b]))[0];
    if (weak == null || EN.power(C.cards[weak]) >= EN.power(C.cards[rid])) return;
    ch.sellIds = [weak];
  } else if (!EN.bagLimited() && EN.bagGain(run, C, rid) <= 0.005) return;
  const earn = (ch.sellIds || []).reduce((s, x) => s + EN.sellValue(C, C.cards[x]), 0);
  if (run.money + earn < price) return;
  ok(EN.choose(run, C, ch), 'radio buy', ch);
}
function oneRun(pol, c, r, cr) {
  const ace = ACE || TIERS[c % 3], prologue = r === 1;
  const o = { seedKey: 'car-' + c, runNo: r, ace, prologue, tier: TIER, relics: prologue ? [] : cr.relics.slice(0, 3),
    bestFar: cr.best, chestDry: cr.chestDry, safety: r === 1 || cr.prevEnd < 10 };
  if (FAC) o.fac = true;                                                // ?fac=1（序章那場引擎自己不給）
  const args = prologue || CONTROL ? {} : EN.talentArgs(C, cr);       // ui createRun：序章那一趟不給
  Object.assign(o, args);
  const smax = args.seedMax || CFG.seedMax;
  if (!prologue && SEEDS) o.seeds = EN.seedPolicy(C, [...cr.owned], smax, smax);
  const run = EN.newRun(C, o);
  for (const id of (C.gifts[ace] || [])) cr.owned.add(id);              // 挑過這個流派：送的四張算擁有（ui createRun shelfOwn gift）
  const R = EN.makeRng(EN.fnv1a32('car-' + c + '#' + r + '|' + pol)), mem = {};
  let man = 0;
  for (let guard = 0; ; guard++) {
    if (guard > 40 * CAP + 400) throw new Error('runaway run');
    if (run.over) break;
    if (!run.pending && !run.duel && run.pos > CAP) break;
    if (EN.canBargainPick(run) && !run.pending) { const ch = EN.bargainPolicy(run, C); ok(EN.choose(run, C, ch), 'bargain', ch); continue; }
    const step = EN.nextStep(run);
    if (step === 'stall' || step === 'draft' || step === 'reward') { const ch = EN.cPolicy(run, C, {}); ok(EN.choose(run, C, ch), step, ch); continue; }
    if (step === 'level' || step === 'retry') {
      if (step === 'retry' && run.pending.free && man >= 30) break;
      const ch = EN.runPolicy(run, C); ok(EN.choose(run, C, ch), step, ch); continue;
    }
    if (step !== 'fight' && step !== 'prologue') throw new Error('unexpected step ' + step);
    if (EN.canShop(run)) { for (const ch of EN.shopPolicy(run, C, 'smart')) ok(EN.choose(run, C, ch), 'shop', ch); radioSmart(run); }
    const f = EN.startFight(run, C, {}); if (!f) throw new Error('no fight');
    play(f.duel, pol, R, mem);
    EN.finishFight(run, C);
    if (step === 'prologue') man++;
  }
  const end = run.over ? run.pos : Math.min(run.pos, CAP);
  const sum = EN.runSummary(run), g = EN.careerGain(C, sum, { best: cr.best, tier: TIER });
  if (KEEP && run.over) {                                               // 結算「帶走一張」：候選裡 peak 最高的（同 seedPolicy 的排法）
    const kc = EN.keepCandidates(run, C, id => cr.owned.has(id)), pick = EN.seedPolicy(C, kc, 1, 1)[0];
    if (pick) cr.owned.add(pick);
  }
  return { end, g, relics: run.relics.slice(0, 3), chestDry: run.chestDry | 0, seeds: (run.seeds || []).length, relicPick: run.relicPick | 0, talent: run.talent || null, hp0: o.prologue ? null : run.maxHp };
}

// ---------------- 多趟 ----------------
const q = (a, p) => { const s = a.slice().sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.max(0, Math.ceil(p * s.length) - 1))]; };
const mean = a => a.length ? a.reduce((s, v) => s + v, 0) / a.length : null;
const SHOW = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50];
const t0 = Date.now();
const report = { args: argv, NC, NR, CAP, control: CONTROL, gate: GATE, spend: SPEND, money: MONEY, seeds: SEEDS, keep: KEEP, tier: TIER, ace: ACE, fac: FAC,
  career: { lexp: K.lexp, curve: K.curve, talents: K.talents.filter(t => !t.soon), ladder: K.ladder.filter(l => !l.soon) }, guestHpSteps: C.trial.guestHpSteps, pols: {} };
const pf = arg('progress', null);                                       // 進度：每個策略跑完寫一行（容器重啟時看跑到哪）
for (const pol of POLS) {
  const W = Array.from({ length: NR }, () => ({ end: [], gain: [], base: [], route: [], raw: [], low: [], lv: [], spent: [], power: [], t: {}, smax: [], rp: [], seeds: [], drawn: [], owned: [], lv8: [] }));
  const tal = ['atk', 'def', 'hp', 'plea', 'xp', 'rare', 'money', 'pay'];
  for (let c = 0; c < NC; c++) {
    const cr = { key: 'car-' + c, xp: 0, spent: {}, off: false, drawn: [], owned: new Set(), relics: [], best: 0, prevEnd: 99, chestDry: 0, respecced: false };
    for (let r = 1; r <= NR; r++) {
      const w = W[r - 1], lv0 = lvOf(cr), args = r === 1 || CONTROL ? {} : EN.talentArgs(C, cr);
      const x = oneRun(pol, c, r, cr);
      w.end.push(x.end); w.gain.push(x.g.total); w.base.push(x.g.base); w.route.push(x.g.route); w.raw.push(x.g.route + x.g.cut); w.low.push(x.g.low > 1 ? 1 : 0);
      w.lv.push(lv0); w.spent.push(EN.careerPoints(C, cr).spent);
      const t = args.talent || {};
      for (const k of tal) (w.t[k] = w.t[k] || []).push(t[k] | 0);
      w.power.push(POWER.some(k => t[k] > 0) ? 1 : 0); w.lv8.push(lv0 >= 8 ? 1 : 0);
      w.smax.push(args.seedMax || CFG.seedMax); w.rp.push(args.relicPick > 1 ? 1 : 0); w.seeds.push(x.seeds); w.owned.push(cr.owned.size);
      cr.relics = x.relics; cr.chestDry = x.chestDry; cr.prevEnd = x.end; cr.best = Math.max(cr.best, x.end);
      cr.xp += x.g.total;
      const lv1 = lvOf(cr);
      if (!CONTROL) for (let n = Math.max(2, lv0 + 1); n <= lv1; n++) {   // 升級抽盤（ui careerUps：每個新等級抽一次，沒得抽也記）
        if (cr.drawn.includes(n)) continue;
        const id = EN.careerDraw(C, cr.key, n, id2 => cr.owned.has(id2)); if (id) cr.owned.add(id);
        cr.drawn.push(n);
      }
      w.drawn.push(cr.drawn.length);
      spend(cr);
    }
  }
  const out = W.map((w, i) => {
    const share = (a, f) => a.filter(f).length / a.length;
    return { run: i + 1, median: q(w.end, 0.5), mean: +mean(w.end).toFixed(2), p25: q(w.end, 0.25), p75: q(w.end, 0.75),
      r10: share(w.end, e => e >= 10), r20: share(w.end, e => e >= 20), r50: share(w.end, e => e >= 50), r100: share(w.end, e => e >= 100),
      lv: +mean(w.lv).toFixed(2), spent: +mean(w.spent).toFixed(2), power: mean(w.power), lv8: mean(w.lv8),
      t: Object.fromEntries(Object.entries(w.t).map(([k, a]) => [k, +mean(a).toFixed(3)])), smax: +mean(w.smax).toFixed(2), relicPick: mean(w.rp), seeds: +mean(w.seeds).toFixed(2),
      owned: +mean(w.owned).toFixed(1), drawn: +mean(w.drawn).toFixed(1),
      gain: Math.round(mean(w.gain)), base: Math.round(mean(w.base)), route: Math.round(mean(w.route)), raw: Math.round(mean(w.raw)), low: mean(w.low), ends: w.end };
  });
  report.pols[pol] = out;
  console.log(`\n## ${pol}（${NC} 個帳號 × ${NR} 趟；${ACE || '三派輪流（每個帳號固定一派）'}；${CONTROL ? '對照組：天賦、階梯、抽盤永遠不開' : (GATE != null ? '戰力 Lv' + GATE + ' 開、' : '') + '花點 ' + SPEND + (MONEY ? '（Lv8 前點錢類）' : '')}；種子 ${SEEDS ? '帶' : '不帶'}、帶走一張 ${KEEP ? '有' : '沒有'}${TIER ? '、試煉第 ' + TIER + ' 階' : ''}${FAC ? '、流派 ?fac=1' : ''}）\n`);
  console.log('| 趟 | 深度 中位／平均（p25–p75） | 到第 10／20／50／100 位（%） | 開局 Lv（≥8） | 已花點 | 品／底／聲／說情／經驗／稀有（錢／酬） | 有戰力 | 種子格／三選一／帶了幾張種子 | 唱片櫃 | 這趟樂歷（基本＋路線；未截；×2 的趟） |');
  console.log('|---|---|---|---|---|---|---|---|---|---|');
  for (const x of out) if (SHOW.includes(x.run) || x.run === NR) {
    const t = x.t, p = v => (100 * v).toFixed(0);
    console.log(`| ${x.run} | ${x.median}／${x.mean.toFixed(1)}（${x.p25}–${x.p75}） | ${p(x.r10)}／${p(x.r20)}／${(100 * x.r50).toFixed(1)}／${(100 * x.r100).toFixed(1)} | ${x.lv.toFixed(1)}（${p(x.lv8)}%） | ${x.spent.toFixed(1)} | ${['atk', 'def', 'hp', 'plea', 'xp', 'rare'].map(k => (t[k] || 0).toFixed(2)).join('／')}（${(t.money || 0).toFixed(1)}／${(t.pay || 0).toFixed(1)}） | ${p(x.power)}% | ${x.smax.toFixed(2)}／${p(x.relicPick)}%／${x.seeds.toFixed(2)} | ${x.owned.toFixed(0)}（抽 ${x.drawn.toFixed(1)}） | ${x.gain}（${x.base}＋${x.route}；${x.raw}；${p(x.low)}%） |`);
  }
  if (pf) fs.appendFileSync(pf, `${pol} ${((Date.now() - t0) / 1000).toFixed(0)}s\n`);
}

// ---------------- G 門檻（--ctl 對照組 JSON；SPEC-D §8.2） ----------------
const CTL = arg('ctl', null) ? JSON.parse(fs.readFileSync(arg('ctl'), 'utf8')) : null;
if (CTL) {
  const checks = [], chk = (id, name, okv, info) => { checks.push({ id, name, ok: okv, info }); console.log((okv == null ? '  參考 ' : okv ? '  ok   ' : '  FAIL ') + id + ' ' + name + '：' + info); };
  console.log('\n### G 門檻（有天賦 vs 對照組 ' + arg('ctl') + '）');
  if (CTL.NC !== NC || CTL.NR !== NR) console.log('  （警告：對照組 ' + CTL.NC + ' 帳號 × ' + CTL.NR + ' 趟，跟這次不同）');
  const at = (P, pol, r) => P.pols[pol] && P.pols[pol][r - 1];
  const TH = report.pols.thoughtful, TC = CTL.pols.thoughtful;
  if (TH && TC && NR >= 30) { const a = TH[9].mean / TC[9].mean, b = TH[29].mean / TC[29].mean;
    chk('G2', '多玩會變強：會讀的 深度平均 有天賦 ÷ 對照組，第 10 趟 ≥1.05、第 30 趟 ≥1.15', a >= 1.05 - 1e-9 && b >= 1.15 - 1e-9, `第 10 趟 ${TH[9].mean.toFixed(1)}÷${TC[9].mean.toFixed(1)}＝${a.toFixed(2)}、第 30 趟 ${TH[29].mean.toFixed(1)}÷${TC[29].mean.toFixed(1)}＝${b.toFixed(2)}`); }
  for (const pol of ['thoughtful', 'humanRead']) { const X = report.pols[pol]; if (!X || NR < 30) continue;
    const a = X[9].mean / X[0].mean, b = X[29].mean / X[0].mean;
    chk('G3', `不失控（${pol}）：第 10 趟平均 ≤ 第 1 趟 ×1.4、第 30 趟 ≤ ×1.8、第 30 趟中位 ≤ 70`, a <= 1.4 + 1e-9 && b <= 1.8 + 1e-9 && X[29].median <= 70,
      `第 1 趟 ${X[0].mean.toFixed(1)}、第 10 趟 ${X[9].mean.toFixed(1)}（×${a.toFixed(2)}）、第 30 趟 ${X[29].mean.toFixed(1)}（×${b.toFixed(2)}）、中位 ${X[29].median}`); }
  const NV = report.pols.novice, NCt = CTL.pols.novice;
  if (NV && NCt && NR >= 30) chk('G4', '新手也有感：第 30 趟到第 10 位 有天賦 − 對照組 ≥ +3 點', NV[29].r10 - NCt[29].r10 >= 0.03 - 1e-9,
    `${(100 * NV[29].r10).toFixed(1)}% − ${(100 * NCt[29].r10).toFixed(1)}% ＝ ${(100 * (NV[29].r10 - NCt[29].r10)).toFixed(1)} 點（總成長 第 1 趟 ${(100 * NV[0].r10).toFixed(1)}% → 第 30 趟 ${(100 * NV[29].r10).toFixed(1)}%；對照組 ${(100 * NCt[0].r10).toFixed(1)}% → ${(100 * NCt[29].r10).toFixed(1)}%）`);
  for (const pol of Object.keys(report.pols)) { const X = report.pols[pol], first = X.findIndex(x => x.power >= 0.5);
    chk('G1', `${pol}：開始有戰力天賦（只印）`, null, `有戰力的帳號 第 3／4／5／8／10／20 趟 ${[3, 4, 5, 8, 10, 20].filter(r => r <= NR).map(r => (100 * X[r - 1].power).toFixed(0) + '%').join('／')}；過半在第 ${first >= 0 ? first + 1 : '—'} 趟`); }
  report.checks = checks;
}
console.log(`\n(${((Date.now() - t0) / 1000).toFixed(0)} 秒)`);
if (arg('json', null)) fs.writeFileSync(arg('json'), JSON.stringify(report));
