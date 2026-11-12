// game-lab/sim.mjs — v5 無限試煉 balance simulation + thresholds（SPEC 無限試煉 §4 第三棒）。Runs on the REAL engine.js / content.js / cards.js / bins.js.
//   每一趟照 run API 跑到輸（newRun → 特價箱挑三張 → 序章男子 → 第 1 位 → … 最多 --cap 位）；規則、曲線、升級、商店、獎勵一行都不在這裡重寫，
//   選擇全用引擎自己的 bargainPolicy／runPolicy（獎勵、升級＝harness MIX、說情）／shopPolicy('smart')。
// Usage: node game-lab/sim.mjs [--n 2000] [--mode all|runs|man] [--flows smart,none,bare] [--gate smart] [--cap 300] [--json out.json]
//                              [--policies thoughtful,novice,random,high,formula,mirrorHint,oracle] [--tier k]
//                              [--set mercy=false] [--patch '{"trial":{"curve":{"atk":{"add":1}}}}'] [--data <dir with cards.js and bins.js>]
//   --n      趟數／格（序章男子 S5 也是 N 場）　--cap 一趟最多打到第幾位（打完還沒輸＝censored，深度記成 cap）
//   --flows  smart＝真的玩法：獎勵照 runPolicy（挑唱片／配件）、每位客人前照 shopPolicy('smart') 買；none＝同上但不買；
//            bare＝最像 ../curve V3 模擬（curvesim.cjs）：不打序章、包包＝老闆四張＋特價箱三張＋男子那張、整趟不換（不拿獎勵、不買、沒有配件）；
//            cards／relics＝none 但只拿唱片／只拿配件（拆解用，要自己點）。每個流程都有升級（runPolicy）與每輪一次說情
//   --gate   門檻看哪個流程（預設 smart＝真的玩法）　--set 改 engine CFG　--patch deep-merge 進 content（例：C.trial.curve 旋鈕）　--tier C.trial.tiers 第 k 階
// 新帳號＝不帶配件進來（relics []、等級 1）；新手＝novice（永遠剋提示）、會讀的＝thoughtful、亂出＝random。同一個 i 不管策略／流程都是同一批客人（common random numbers）。
// 名詞（照 ../curve/results.md）：深度＝這一趟輸在第幾位（打完 cap 位還沒輸記 cap）；到第 N 位＝深度 ≥ N；不說情＝同一趟在第一次輸的地方切斷；
//   單位死亡率＝到了這一位的趟裡有幾成在這一位結束；首戰＝這一位的第一場（說情重打不算）；懸崖＝相鄰兩個非藏家位（都 ≥200 趟到過）首戰勝率掉最多的地方。
//
// 門檻（SPEC §4 第三棒；全部看 --gate 流程。2026-11-12 先跑一次 --n 2000 再定數字。任一條沒過 process.exitCode = 1）：
//   T1 新手 第 1–3 位死亡 ≤5%（V3 2%）
//   T2 照規劃書 #s3 的目標（主線 11-12 裁定：SPEC 原本照 V3 bare 寫的 8–20 不含獎勵與商店，改回店主的目標）：
//      T2a 一般玩家（新手）深度中位數 10–30；T2b 讀得準的高手（會讀的）有機會破 100 位：到第 100 位 10–70%
//   T3 會讀的 藏家位死亡率是非藏家位的 2–4 倍：第 4–60 位、到過 ≥200 趟的位置合併算（暖身第 1–3 位設計上不死，不算進來；V3 13–20% 對 5–7%）
//   T4 相鄰非藏家位首戰勝率掉 ≤20 點（新手、會讀的各一條；V3 新手第 4→6 位 19 點、會讀的 14 點）
//   T5 一場平均手數：新手 3–4.5（舊版試玩表 3–4 招）；會讀的 2.5–4.5（後段包包變強、一場變短；之後用 C.trial.tiers 難度階梯給高手加難度，店主 11-12 參考 Monster Train）
//   T6 亂出 到第 5 位 ≤5%：第一次跑出 smart 1.5%、none 0.5%、bare 0.05%（亂出第 1 位首戰只贏 2 成，97% 死在第 1–3 位）；留 3 倍餘裕（舊 S3 也是 ≤5%）
//   T7 會讀的比亂出走得遠：深度中位數 ≥ 亂出的 2 倍且至少多 5 位（第一次跑出 smart 90 對 1、bare 14 對 1）
//   S5 序章男子（保留 v4 §5.2）：會讀的 ≥97%、平均 ≤4 手；只出最大星 ≥90%；新手（永遠剋提示）≥90%
//   M6 最多 6 手（CFG.maxRounds）；HP 聲望單調 C.trial.guestHp 一般 ≤ 菁英 ≤ 藏家（不靠模擬）
// 第一次跑（2026-11-12，--n 2000，171 秒）：smart 13/15，沒過的是 T2 會讀的中位 90（平均 103.9）、T5 會讀的 2.57 手。T1／T3–T7 的 SPEC 數字照用、不放寬。
//   會讀的 深度中位／平均（新手）拆解：V3 12／15.8（6／6.6）→ bare 但放水唬人 0（--patch '{"trial":{"curve":{"mercyFeint":0}}}'）12／15.5（6／6.6，逐位對得上 V3）
//   → bare 14／17.1（6／7.1；＋放水唬人）→ relics 18／21.7（8／8.6；＋序章、菁英、藏家給的配件）→ cards 61／67.2（15／14.8；＋客人丟的唱片）
//   → none 68／74.8（15／15.7）→ smart 90／103.9（16／18.8；＋買，幾乎都是櫃檯的屬性加成配件：每趟買唱片 0.2 張、配件 0.96 件，賺 $220,057 只花 $3,113）。
//   主因是獎勵唱片：後段客人的牌經過下限替換（第 14 位起總星 ≥13），拿回來包包平均總星 9.1→13.2，V3 的 harness 包包整趟不換。要改曲線還是改獎勵由主線定。
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const EN = require(path.join(HERE, 'engine.js'));
const C = require(path.join(HERE, 'content.js'));
const { CFG, TIERS } = EN;

// ---------------- args ----------------
const argv = process.argv.slice(2);
const arg = (name, def) => { const i = argv.indexOf('--' + name); return i >= 0 && argv[i + 1] != null ? argv[i + 1] : def; };
const N = +arg('n', 2000);
const MODE = arg('mode', 'all');
const CAP = +arg('cap', 300);
const TIER = +arg('tier', 0);
const JSON_OUT = arg('json', null);
const ALL_FLOWS = ['smart', 'none', 'bare', 'cards', 'relics'];
const FLOWS = arg('flows', 'smart,none,bare').split(',').filter(Boolean);
const GATE = arg('gate', 'smart');
for (const f of FLOWS) if (!ALL_FLOWS.includes(f)) { console.error('--flows ' + ALL_FLOWS.join('|')); process.exit(2); }
if (!ALL_FLOWS.includes(GATE)) { console.error('--gate ' + ALL_FLOWS.join('|')); process.exit(2); }
if (!['all', 'runs', 'man'].includes(MODE)) { console.error('--mode all|runs|man'); process.exit(2); }
if (!(CAP >= 5)) { console.error('--cap ≥ 5'); process.exit(2); }
if (arg('set', null)) for (const kv of arg('set').split(',')) {
  const [k, v] = kv.split('=');
  if (!(k in CFG)) throw new Error('unknown CFG ' + k);
  CFG[k] = v === 'true' ? true : v === 'false' ? false : +v;
}
if (arg('data', null)) {
  const dir = path.resolve(arg('data'));
  const cards = require(path.join(dir, 'cards.js')), bins = require(path.join(dir, 'bins.js'));
  const B = (bins.shops && bins.shops.dip) || bins.bins || {};
  for (const id of Object.keys(C.cards)) if (!cards[id]) console.error('--data: cards.js 沒有 ' + id + '（沿用本地的）');
  C.cards = Object.assign({}, C.cards, cards);
  C.bins = {}; for (const k of Object.keys(B)) if (B[k] && Array.isArray(B[k].pool)) C.bins[k] = Object.assign({}, B[k]);
  console.log('--data ' + dir + '：卡 ' + Object.keys(C.cards).length + ' 張、箱子 ' + Object.keys(C.bins).join(' '));
}
const deepMerge = (t, s) => { for (const k in s) { if (s[k] && typeof s[k] === 'object' && !Array.isArray(s[k]) && t[k] && typeof t[k] === 'object') deepMerge(t[k], s[k]); else t[k] = s[k]; } return t; };
if (arg('patch', null)) deepMerge(C, JSON.parse(arg('patch')));

const ALL_POLS = ['thoughtful', 'novice', 'random', 'high', 'formula', 'mirrorHint', 'oracle'];
const POLS = arg('policies', ALL_POLS.join(',')).split(',').filter(Boolean);
for (const p of POLS) if (!EN.policies[p]) { console.error('unknown policy ' + p); process.exit(2); }
const CORE = ['thoughtful', 'novice', 'random'];                 // 每個流程都跑；其他策略只跑門檻流程
const LABEL = { thoughtful: '會讀的', novice: '新手（剋提示）', random: '亂出', high: '只出最大星', counterHint: '永遠剋提示', formula: '兩步公式',
  mirrorHint: '跟提示同色（對照）', oracle: '先知' };
const FLOW_ZH = { smart: 'smart（獎勵＋買）', none: 'none（獎勵、不買）', bare: 'bare（＝V3）', cards: 'cards（只拿唱片）', relics: 'relics（只拿配件）' };
const MAN = C.prologueEnemy;
const pct = x => x == null ? '—' : (100 * x).toFixed(1) + '%';
const pt = x => x == null ? '—' : (100 * x).toFixed(1);
const p0 = x => x == null ? '—' : String(Math.round(100 * x));
const r3 = x => (x == null || Number.isNaN(x) ? null : Math.round(x * 1000) / 1000);
const f2 = x => x == null ? '—' : x.toFixed(2);
const t0 = Date.now();
const ok = (r, who, ch) => { if (!r || !r.ok) throw new Error(who + ' ' + (r && r.error) + ' ' + JSON.stringify(ch)); };

// V3（../curve/results.md 三、與「每一位」表；新帳號、每格 4,000 趟、harness 的包包整趟不換、沒有放水唬人）——只拿來對照，不是門檻
const V3 = {
  novice: { median: 6, mean: 6.6, nrMean: 5.4, reach: [0.89, 0.16, 0, 0, 0], hands: 3.7, r6: 0.15, byBar: 0.05, die13: 0.02,
    pos: '99/0 99/0 92/2 79/10 43/42 60/27 68/20 62/23 62/31 34/55 48/34 33/51' },
  thoughtful: { median: 12, mean: 15.8, nrMean: 8.9, reach: [1, 0.69, 0.28, 0.02, 0], hands: 3.9, r6: 0.24, byBar: 0.29, die13: 0,
    pos: '100/0 100/0 99/0 96/1 70/13 82/6 87/5 87/6 86/6 69/20 81/5 82/7 88/5 87/6 71/20 87/3' },
};

// ---------------- play one duel to the end ----------------
function play(duel, pol, R, mem) {
  const fn = EN.policies[pol]; let g = 0;
  while (!duel.over) {
    if (++g > 20) throw new Error('runaway duel');
    const act = fn(duel, R, mem, C);
    if (!EN.isLegal(duel, act)) throw new Error('illegal act from ' + pol + ': ' + JSON.stringify(act));
    EN.resolveTurn(duel, act);
  }
  return duel;
}
const bagPower = run => run.bag.reduce((s, id) => s + EN.power(C.cards[id]), 0) / Math.max(1, run.bag.length);

// ---------------- one whole run through the real run API ----------------
//   A＝這一格的每一位累計（到過、死、場次、勝、首戰、手數、打到第 6 手、比聲望條、KO）
function runOnce(pol, flow, i, A) {
  const seedKey = 'sim5-' + i;
  const run = EN.newRun(C, { seedKey, runNo: 1, ace: TIERS[i % 3], prologue: flow !== 'bare', tier: TIER });
  const R = EN.makeRng(EN.fnv1a32(seedKey + '|' + pol + '|' + flow)), mem = {};
  let manTries = 0, lostMan = false, cens = false, lastReached = 0, retryAt = 0, firstLoss = null, fatal = null, bag0 = null, maxHands = 0;
  for (let guard = 0; ; guard++) {
    if (guard > 40 * CAP + 400) throw new Error('runaway run ' + seedKey + ' ' + pol + ' ' + flow);
    if (run.over) break;
    if (!run.pending && !run.duel && run.pos > CAP) { cens = true; break; }
    if (EN.canBargainPick(run) && !run.pending) {
      const ch = EN.bargainPolicy(run, C); ok(EN.choose(run, C, ch), 'bargainPick', ch);
      if (flow === 'bare') { const drop = C.enemies[MAN].drop; if (drop && !run.bag.includes(drop)) run.bag.push(drop); }   // bare：包包＝禮物 4＋特價 3＋男子那張
      continue;
    }
    const step = EN.nextStep(run);
    if (step === 'reward') {
      let ch = flow === 'bare' ? { type: 'skip' } : EN.runPolicy(run, C);
      const p = run.pending;
      if (flow === 'cards' && ch.type === 'relic') ch = !p.cardDone && p.cards.length ? EN.runPolicy(run, C, { preferRelic: false }) : { type: 'skip' };
      if (flow === 'cards' && ch.type === 'relic') ch = { type: 'skip' };
      if (flow === 'relics' && ch.type === 'take') ch = p.need === 'cardOrRelic' && !p.relicDone ? (EN.runPolicy(run, C, { preferRelic: true })) : { type: 'skip' };
      if (flow === 'relics' && ch.type === 'take') ch = { type: 'skip' };
      ok(EN.choose(run, C, ch), 'runPolicy', ch); continue;
    }
    if (step === 'level' || step === 'retry') {
      if (step === 'retry' && run.pending.free && manTries >= 30) { lostMan = true; break; }
      const ch = EN.runPolicy(run, C); ok(EN.choose(run, C, ch), 'runPolicy', ch); continue;
    }
    if (step !== 'fight' && step !== 'prologue') throw new Error('unexpected step ' + step);
    if (flow === 'smart' && EN.canShop(run)) for (const ch of EN.shopPolicy(run, C, 'smart')) ok(EN.choose(run, C, ch), 'shopPolicy', ch);
    if (run.money < 0) throw new Error('money < 0');
    const prologue = step === 'prologue', d = run.pos, att = retryAt === d ? 1 : 0;
    if (!prologue && bag0 == null) bag0 = bagPower(run);
    if (!prologue && lastReached < d) { A.reached[d]++; lastReached = d; }
    const f = EN.startFight(run, C, {});
    if (!f) throw new Error('startFight null at ' + d);
    const duel = play(f.duel, pol, R, mem), hands = duel.stats.hands, by = duel.over.by;
    const res = EN.finishFight(run, C);
    if (prologue) { manTries++; continue; }
    maxHands = Math.max(maxHands, hands);
    A.att[d]++; A.hands[d] += hands; if (hands >= CFG.maxRounds) A.r6[d]++;
    if (by === 'rounds') A.bar[d]++; else if (by === 'hp') A.ko[d]++;
    if (res.win) A.win[d]++;
    if (att === 0) { A.att1[d]++; if (res.win) A.win1[d]++; }
    if (!res.win) {
      if (firstLoss == null) firstLoss = d;
      if (run.pending && run.pending.type === 'retry') retryAt = d;
      else { A.deaths[d]++; fatal = { by, cls: res.cls, hands }; }
    }
  }
  const end = lostMan ? 0 : cens ? CAP : run.pos;
  if (firstLoss == null) firstLoss = cens ? CAP + 1 : end;
  const S = run.stats, sum = EN.runSummary(run);
  return { end, cens, lostMan, firstLoss, fatal, maxHands, level: run.level, atk: run.atk, def: run.def, maxHp: run.maxHp, relics: run.relics.length,
    taken: sum.taken, rewardCards: S.taken.length, bought: S.bought.length, relicsBought: S.relicsBought.length, relicsGot: S.relicsGot.length,
    earned: S.earned, spent: S.spent, money: run.money, checkpoints: sum.checkpoints.length, bestStreak: sum.bestStreak,
    bag0: bag0 == null ? bagPower(run) : bag0, bag1: bagPower(run) };
}

// ---------------- one cell (policy × flow) ----------------
const q = (arr, p) => { const a = arr.slice().sort((x, y) => x - y); return a[Math.min(a.length - 1, Math.max(0, Math.ceil(p * a.length) - 1))]; };
const BANDS = [[1, 3], [4, 5], [6, 10], [11, 20], [21, 50], [51, 100], [101, 1e9]];
const HBANDS = [[1, 3], [4, 6], [8, 12], [18, 22], [48, 52]];
const REACH = [5, 10, 20, 50, 100];
function runCell(pol, flow, n) {
  const NP = CAP + 2, z = () => new Float64Array(NP);
  const A = { reached: z(), deaths: z(), att: z(), win: z(), att1: z(), win1: z(), hands: z(), r6: z(), bar: z(), ko: z() };
  const recs = [];
  for (let i = 0; i < n; i++) recs.push(runOnce(pol, flow, i, A));
  const ends = recs.map(r => r.end), fl = recs.map(r => Math.min(r.firstLoss, CAP));
  const share = (arr, p) => (arr.length ? arr.filter(p).length / arr.length : null);
  const avg = k => recs.reduce((s, r) => s + r[k], 0) / n;
  const sum = (key, a, b) => { let s = 0; for (let d = a; d <= Math.min(b, CAP); d++) s += A[key][d]; return s; };
  const tot = k => sum(k, 1, CAP);
  const dead = recs.filter(r => r.fatal);
  const pos = [];
  for (let d = 1; d <= Math.min(60, CAP); d++) if (A.att[d]) pos.push({ d, cls: EN.classAt(d), reached: A.reached[d], win1: A.att1[d] ? A.win1[d] / A.att1[d] : null,
    win: A.win[d] / A.att[d], hazard: A.deaths[d] / A.reached[d], hands: A.hands[d] / A.att[d] });
  let cliff = { drop: 0, at: null, from: null }, prev = null;
  for (const p of pos) { if (p.cls === 'boss' || p.reached < 200) continue; if (prev && prev.win1 - p.win1 > cliff.drop) cliff = { drop: prev.win1 - p.win1, from: prev.d, at: p.d, w0: prev.win1, w1: p.win1 }; prev = p; }
  let hzMax = { h: 0, at: null }; for (const p of pos) if (p.cls !== 'boss' && p.reached >= 200 && p.hazard > hzMax.h) hzMax = { h: p.hazard, at: p.d };
  // T3：第 4–60 位、到過 ≥200 趟的位置，藏家位合併死亡率 ÷ 非藏家位合併死亡率（暖身第 1–3 位不算）
  let hb = 0, hbn = 0, hn = 0, hnn = 0;
  for (const p of pos) { if (p.d < 4 || p.reached < 200) continue; if (p.cls === 'boss') { hb += A.deaths[p.d]; hbn += p.reached; } else { hn += A.deaths[p.d]; hnn += p.reached; } }
  const hazBoss = hbn ? hb / hbn : null, hazNon = hnn ? hn / hnn : null;
  const handsBand = HBANDS.map(([a, b]) => { const at = sum('att', a, b); return at >= 100 ? sum('hands', a, b) / at : null; });
  return {
    pol, flow, n, cap: CAP,
    median: q(ends, 0.5), mean: avg('end'), p25: q(ends, 0.25), p75: q(ends, 0.75), p90: q(ends, 0.9), censored: share(recs, r => r.cens), lostMan: share(recs, r => r.lostMan),
    noRetry: { median: q(fl, 0.5), mean: fl.reduce((s, x) => s + x, 0) / n },
    reach: REACH.map(d => share(recs, r => r.end >= d)), reach3: share(recs, r => r.end >= 3),
    die13: share(recs, r => !r.cens && r.end <= 3),
    deathBands: BANDS.map(([a, b]) => share(dead, r => r.end >= a && r.end <= b)),
    fights: tot('att'), hands: tot('hands') / Math.max(1, tot('att')), r6: tot('r6') / Math.max(1, tot('att')), barShare: tot('bar') / Math.max(1, tot('att')),
    koShare: tot('ko') / Math.max(1, tot('att')), win: tot('win') / Math.max(1, tot('att')), maxHands: Math.max(0, ...recs.map(r => r.maxHands)), handsBand,
    deaths: { n: dead.length, byBar: share(dead, r => r.fatal.by === 'rounds'), byKO: share(dead, r => r.fatal.by === 'hp'), atBoss: share(dead, r => r.fatal.cls === 'boss') },
    hazBoss, hazNon, bossRatio: hazBoss != null && hazNon ? hazBoss / hazNon : null, cliff, hzMax,
    end: { level: avg('level'), atk: avg('atk'), def: avg('def'), maxHp: avg('maxHp'), relics: avg('relics'), taken: avg('taken'), rewardCards: avg('rewardCards'),
      bought: avg('bought'), relicsBought: avg('relicsBought'), relicsGot: avg('relicsGot'), earned: avg('earned'), spent: avg('spent'), money: avg('money'),
      checkpoints: avg('checkpoints'), bestStreak: avg('bestStreak'), bag0: avg('bag0'), bag1: avg('bag1') },
    pos: pos.map(p => ({ d: p.d, cls: p.cls, reached: p.reached, win1: r3(p.win1), hazard: r3(p.hazard), hands: r3(p.hands) })),
  };
}

// ---------------- S5：序章男子（新包包 7 張＝禮物 4＋特價箱三色各一，沒有配件；你 12 聲望） ----------------
function manFight(pol, i) {
  const run = EN.newRun(C, { seedKey: 'sim5-man-' + i, runNo: 1, ace: TIERS[i % 3] });
  const ch = EN.bargainPolicy(run, C); ok(EN.choose(run, C, ch), 'bargainPick', ch);
  const f = EN.startFight(run, C, {});
  if (f.enemyId !== MAN) throw new Error('prologue guest is ' + f.enemyId);
  return play(f.duel, pol, EN.makeRng(EN.fnv1a32('man|' + pol + '|' + i)), {});
}
function fightCell(fn, n) {
  let w = 0, h = 0;
  for (let i = 0; i < n; i++) { const d = fn(i); if (d.over.win) w++; h += d.stats.hands; }
  return { n, win: w / n, hands: h / n };
}

// ---------------- run ----------------
const checks = [];
const check = (id, name, ok, info) => { checks.push({ id, name, ok: !!ok, info }); };
const report = { N, CAP, TIER, FLOWS, GATE, CFG: Object.assign({}, CFG), trial: EN.trialCfg(C, TIER), economy: C.economy, patch: arg('patch', null) };
const cells = {};
const cellOf = (flow, pol) => (cells[flow] || {})[pol];

if (MODE === 'all' || MODE === 'runs') {
  const flows = FLOWS.includes(GATE) ? FLOWS : [GATE, ...FLOWS];
  for (const flow of flows) {
    cells[flow] = {};
    const pols = POLS.filter(p => flow === GATE || CORE.includes(p));
    for (const pol of pols) cells[flow][pol] = runCell(pol, flow, N);
  }
  report.runs = cells;
  const rows = []; for (const flow of flows) for (const pol of Object.keys(cells[flow])) rows.push(cells[flow][pol]);
  const reachStr = x => x.reach.map(p0).join('／');

  console.log(`\n### 整趟無限試煉（新帳號；每格 N=${N} 趟、最多打到第 ${CAP} 位；說情每輪一次；mercy ${CFG.mercy ? '開' : '關'}、放水唬人 ${EN.trialCfg(C, TIER).curve.mercyFeint}${TIER ? '、難度階梯 ' + TIER : ''}；門檻看 ${GATE}）\n`);
  console.log('| 策略 | 流程 | 深度 中位／平均 | p25–p75 | 不說情 中位／平均 | 到第 5／10／20／50／100 位（%） | 第 1–3 位死 | 一場幾手 | 打到第 6 手 | 死在比聲望條 | 藏家÷非藏家 死亡率（第 4–60 位） | 懸崖（非藏家首戰勝率最大跌幅） | 最高單位死亡率（非藏家） |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|');
  for (const x of rows) console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | **${x.median}**／${x.mean.toFixed(1)}${x.censored ? `（${pct(x.censored)} 打完 ${CAP} 位）` : ''} | ${x.p25}–${x.p75} | ${x.noRetry.median}／${x.noRetry.mean.toFixed(1)} | ${reachStr(x)} | ${pct(x.die13)} | ${f2(x.hands)} | ${pct(x.r6)} | ${pct(x.deaths.byBar)} | ${pct(x.hazBoss)}÷${pct(x.hazNon)}＝${x.bossRatio == null ? '—' : x.bossRatio.toFixed(2) + ' 倍'} | ${x.cliff.at ? `第 ${x.cliff.from}→${x.cliff.at} 位 ${p0(x.cliff.w0)}→${p0(x.cliff.w1)}（${pt(x.cliff.drop)} 點）` : '—'} | ${x.hzMax.at ? `第 ${x.hzMax.at} 位 ${pct(x.hzMax.h)}` : '—'} |`);

  console.log(`\n平均手數分段、死在哪（死掉的趟裡）：\n`);
  console.log('| 策略 | 流程 | 手數 1–3｜4–6｜8–12｜18–22｜48–52 位 | 死在哪 1–3／4–5／6–10／11–20／21–50／51–100／>100（%） | 死在藏家位 | 輸的那場 KO／比聲望條 | 客人場勝率 |');
  console.log('|---|---|---|---|---|---|---|');
  for (const x of rows) console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${x.handsBand.map(f2).join('｜')} | ${x.deathBands.map(p0).join('／')} | ${pct(x.deaths.atBoss)} | ${pct(x.deaths.byKO)}／${pct(x.deaths.byBar)} | ${pct(x.win)} |`);

  console.log(`\n走到最後時（每趟平均）：成長、包包、錢\n`);
  console.log('| 策略 | 流程 | 等級 | 品味／底氣／聲望上限 | 配件（拿到／買） | 收了 N 張（獎勵唱片／買的） | 包包平均總星 開局→最後 | 賺／花 | 中繼點 | 最多連贏 |');
  console.log('|---|---|---|---|---|---|---|---|---|---|');
  for (const x of rows) { const e = x.end;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${e.level.toFixed(1)} | ${e.atk.toFixed(1)}／${e.def.toFixed(1)}／${e.maxHp.toFixed(1)} | ${e.relics.toFixed(2)}（${e.relicsGot.toFixed(2)}／${e.relicsBought.toFixed(2)}） | ${e.taken.toFixed(1)}（${e.rewardCards.toFixed(1)}／${e.bought.toFixed(1)}） | ${e.bag0.toFixed(1)}→${e.bag1.toFixed(1)} | $${Math.round(e.earned).toLocaleString('en')}／$${Math.round(e.spent).toLocaleString('en')} | ${e.checkpoints.toFixed(2)} | ${e.bestStreak.toFixed(1)} |`); }

  const PCOLS = 16;
  console.log(`\n每一位：首戰勝率／單位死亡率（%；到過的趟 <200 打括號）\n`);
  console.log('| 策略・流程 | ' + Array.from({ length: PCOLS }, (_, k) => { const d = k + 1, c = EN.classAt(d); return c === 'boss' ? `**${d}藏**` : c === 'elite' ? d + '菁' : String(d); }).join(' | ') + ' |');
  console.log('|---|' + Array.from({ length: PCOLS }, () => '---').join('|') + '|');
  const posRow = x => Array.from({ length: PCOLS }, (_, k) => { const p = x.pos.find(o => o.d === k + 1); if (!p) return '—'; const s = `${p0(p.win1)}／${p0(p.hazard)}`; return p.reached < 200 ? `(${s})` : s; }).join(' | ');
  for (const pol of ['novice', 'thoughtful']) {
    if (V3[pol]) console.log(`| V3・${LABEL[pol]} | ${V3[pol].pos.split(' ').concat(Array(PCOLS).fill('—')).slice(0, PCOLS).join(' | ').replace(/\//g, '／')} |`);
    for (const flow of flows) if (cellOf(flow, pol)) console.log(`| ${LABEL[pol]}・${flow} | ${posRow(cellOf(flow, pol))} |`);
  }

  // 跟 ../curve/results.md 的 V3 比（新帳號）
  console.log(`\n跟 V3（../curve/results.md，harness：包包整趟不換、沒有商店／獎勵／配件、沒有放水唬人）比：\n`);
  console.log('| 誰 | 來源 | 深度 中位／平均 | 不說情平均 | 到第 5／10／20／50／100 位（%） | 第 1–3 位死 | 一場幾手 | 打到第 6 手 | 死在比聲望條 |');
  console.log('|---|---|---|---|---|---|---|---|---|');
  for (const pol of ['novice', 'thoughtful']) {
    const v = V3[pol];
    console.log(`| ${LABEL[pol]} | V3 | ${v.median}／${v.mean} | ${v.nrMean} | ${v.reach.map(p0).join('／')} | ${pct(v.die13)} | ${v.hands} | ${pct(v.r6)} | ${pct(v.byBar)} |`);
    for (const flow of flows) { const x = cellOf(flow, pol); if (x) console.log(`| ${LABEL[pol]} | ${flow} | ${x.median}／${x.mean.toFixed(1)} | ${x.noRetry.mean.toFixed(1)} | ${reachStr(x)} | ${pct(x.die13)} | ${f2(x.hands)} | ${pct(x.r6)} | ${pct(x.deaths.byBar)} |`); }
  }

  // ---- 門檻（--gate 流程）----
  const G = cells[GATE], TH = G.thoughtful, NV = G.novice, RD = G.random, tag = `［${GATE}］`;
  if (NV) check('T1', `${tag}新手 第 1–3 位死亡 ≤5%`, NV.die13 <= 0.05 + 1e-9, `${pct(NV.die13)}（V3 2%）`);
  if (NV) check('T2a', `${tag}新手 深度中位數 10–30（一般玩家走到第 10–30 位）`, NV.median >= 10 && NV.median <= 30, `中位 ${NV.median}、平均 ${NV.mean.toFixed(1)}`);
  if (TH) check('T2b', `${tag}會讀的 到第 100 位 10–70%（高手有機會破 100）`, TH.reach[4] >= 0.10 - 1e-9 && TH.reach[4] <= 0.70 + 1e-9, `到第 100 位 ${pct(TH.reach[4])}、中位 ${TH.median}`);
  if (TH) check('T3', `${tag}會讀的 藏家位死亡率是非藏家位的 2–4 倍（第 4–60 位）`, TH.bossRatio != null && TH.bossRatio >= 2 - 1e-9 && TH.bossRatio <= 4 + 1e-9,
    `${pct(TH.hazBoss)} ÷ ${pct(TH.hazNon)} = ${TH.bossRatio == null ? '—' : TH.bossRatio.toFixed(2)} 倍（V3 13–20% 對 5–7%）`);
  for (const x of [NV, TH]) if (x) check('T4', `${tag}${LABEL[x.pol]} 相鄰非藏家位首戰勝率掉 ≤20 點`, x.cliff.drop <= 0.20 + 1e-9,
    x.cliff.at ? `第 ${x.cliff.from}→${x.cliff.at} 位 ${pt(x.cliff.w0)}→${pt(x.cliff.w1)}（${pt(x.cliff.drop)} 點）` : '沒有下跌');
  for (const x of [NV, TH]) if (x) { const lo = x === TH ? 2.5 : 3; check('T5', `${tag}${LABEL[x.pol]} 一場平均 ${lo}–4.5 手`, x.hands >= lo - 1e-9 && x.hands <= 4.5 + 1e-9, `${f2(x.hands)} 手（V3 ${V3[x.pol].hands}）`); }
  if (RD) check('T6', `${tag}亂出 到第 5 位 ≤5%`, RD.reach[0] <= 0.05 + 1e-9, pct(RD.reach[0]));
  if (TH && RD) check('T7', `${tag}會讀的比亂出走得遠（中位 ≥ 亂出 ×2 且 ≥ 亂出 +5）`, TH.median >= 2 * RD.median && TH.median >= RD.median + 5,
    `會讀的 ${TH.median} 對 亂出 ${RD.median}`);
  const mh = Math.max(...rows.map(x => x.maxHands));
  check('M6', '最多 6 手', mh <= CFG.maxRounds, mh);
  if (cells.smart && cells.none && cells.smart.thoughtful && cells.none.thoughtful)
    console.log(`\n會讀的：smart − none 深度中位 ${cells.smart.thoughtful.median - cells.none.thoughtful.median} 位、平均 ${(cells.smart.thoughtful.mean - cells.none.thoughtful.mean).toFixed(1)} 位（買東西有沒有用；只列不檢查）`);
}

if (MODE === 'all' || MODE === 'man') {
  const manPols = POLS.filter(p => p !== 'counterHint');
  const mt = {};
  for (const pol of manPols) mt[pol] = fightCell(i => manFight(pol, i), N);
  report.man = mt;
  console.log(`\n### 序章男子（聲望 ${C.enemies[MAN].hp}、你 ${CFG.playerHp}；包包 7 張＝禮物 4＋特價箱三色各一、planner easy、老實；N=${N}）\n`);
  console.log('| 策略 | 勝率 | 平均手數 |'); console.log('|---|---|---|');
  for (const pol of manPols) console.log(`| ${LABEL[pol] || pol} | ${pct(mt[pol].win)} | ${mt[pol].hands.toFixed(2)} |`);
  if (mt.thoughtful) { check('S5', '男子：會讀的 ≥97%', mt.thoughtful.win >= 0.97, pct(mt.thoughtful.win)); check('S5', '男子：會讀的 平均 ≤4 手', mt.thoughtful.hands <= 4, mt.thoughtful.hands.toFixed(2)); }
  if (mt.high) check('S5', '男子：只出最大星 ≥90%', mt.high.win >= 0.90, pct(mt.high.win));
  if (mt.novice) check('S5', '男子：新手（永遠剋提示）≥90%', mt.novice.win >= 0.90, pct(mt.novice.win));
}

// HP：聲望單調——C.trial.guestHp 一般 ≤ 菁英 ≤ 藏家（不靠模擬，每種 --mode 都檢查）
{
  const H = EN.trialCfg(C, TIER).guestHp;
  report.hpOrder = H;
  check('HP', '聲望單調：一般 ≤ 菁英 ≤ 藏家（C.trial.guestHp）', H.normal <= H.elite && H.elite <= H.boss, `一般 ${H.normal}／菁英 ${H.elite}／藏家 ${H.boss}（你 ${EN.trialCfg(C, TIER).youHp}）`);
}

console.log('\n### 門檻（SPEC 無限試煉 §4 第三棒；數字見檔頭）');
for (const c of checks) console.log((c.ok ? '  ok   ' : '  FAIL ') + c.id + ' ' + c.name + (c.info !== undefined ? '：' + c.info : ''));
const failed = checks.filter(c => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} 通過（${((Date.now() - t0) / 1000).toFixed(1)} 秒）`);
report.checks = checks;
if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 1));
if (failed.length) process.exitCode = 1;
