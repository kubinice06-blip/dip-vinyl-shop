// game-lab/sim.mjs — v4 balance simulation + thresholds (SPEC-v4 §5.2; Agent A1).  Runs on the REAL engine.js / content.js / cards.js / bins.js.
// Usage: node game-lab/sim.mjs [--n 3000] [--mode all|nights|fights] [--econ both|none|smart] [--json out.json]
//                              [--set mercy=false,threshold=2] [--hp '{"copycat":15}'] [--patch '{"economy":{"win":{"normal":250}}}']
//                              [--policies thoughtful,high,...] [--data <dir with cards.js and bins.js>]
//   --n       nights per cell (night tables) and fights per cell (single-fight tables)
//   --econ    which shopPolicy mode(s) the night tables use; 'both' (default) is needed for S6
//   --set     engine CFG overrides (numbers or true/false); --hp per-guest starting 聲望; --patch deep-merges into content (calibration trials)
//   --data    use another cards.js／bins.js（e.g. Y's worktree game-lab/）for the shop stock — calibrate against the bins before they are merged
// Model (§5.2): first night = prologue man (no tutorial; bargain pick "one per colour, highest peak") → Fishmans + one of three prologue
// relics (runPolicy) → 3 normals → 1 elite → boss, the owner pleads once (retry); shopPolicy(mode) before every guest.
// FIXLIST 10（平衡 R1）加兩條：S9＝會讀的＋smart 一晚裡的客人場（一般／菁英／藏家）由 KO 結束（任一方聲望歸零）≥35%；
//   HP＝聲望單調：一般客人的最大值 ≤ 菁英的最小值、菁英的最大值 ≤ 藏家（同一級可以不一樣，跨級不准倒掛；規則卡頁尾照級寫範圍）。
//   報表另列 KO 分「你 KO 他／他 KO 你」與「第 6 手比聲望條」結束的比例，一晚裡分一般／菁英／藏家，單場表每位客人也列。
// Any failed threshold sets process.exitCode = 1.
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const EN = require(path.join(HERE, 'engine.js'));
const C = require(path.join(HERE, 'content.js'));
const { CFG, TIERS, COUNTER_OF } = EN;

// ---------------- args ----------------
const argv = process.argv.slice(2);
const arg = (name, def) => { const i = argv.indexOf('--' + name); return i >= 0 && argv[i + 1] != null ? argv[i + 1] : def; };
const N = +arg('n', 3000);
const MODE = arg('mode', 'all');
const ECON = arg('econ', 'both');
const JSON_OUT = arg('json', null);
if (!['both', 'none', 'smart'].includes(ECON)) { console.error('--econ both|none|smart'); process.exit(2); }
if (arg('set', null)) for (const kv of arg('set').split(',')) {
  const [k, v] = kv.split('=');
  if (!(k in CFG)) throw new Error('unknown CFG ' + k);
  CFG[k] = v === 'true' ? true : v === 'false' ? false : +v;
}
if (arg('hp', null)) { const o = JSON.parse(arg('hp')); for (const k in o) { if (!C.enemies[k]) throw new Error('unknown guest ' + k); C.enemies[k].hp = o[k]; } }
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

const ALL_POLS = ['thoughtful', 'high', 'counterHint', 'formula', 'mirrorHint', 'random', 'oracle'];
const POLS = arg('policies', ALL_POLS.join(',')).split(',').filter(Boolean);
for (const p of POLS) if (!EN.policies[p]) { console.error('unknown policy ' + p); process.exit(2); }
const LABEL = { thoughtful: '會讀的', high: '只出最大星', counterHint: '永遠剋提示', formula: '兩步公式', mirrorHint: '跟提示同色（對照）',
  random: '亂出', oracle: '先知', novice: '新手（＝剋提示）' };
const NORMALS = C.normals, ELITES = C.elites, BOSS = C.boss, MAN = C.prologueEnemy;
const GUESTS = [...NORMALS, ...ELITES, BOSS];
const nameOf = id => C.enemies[id].name;
const CLASSES = ['normal', 'elite', 'boss'], CLASS_ZH = { normal: '一般', elite: '菁英', boss: '藏家' };
const classOf = id => ELITES.includes(id) ? 'elite' : id === BOSS ? 'boss' : 'normal';
const PLAN = C.plannerByDepth || EN.PLANNER_BY_DEPTH;   // S7 單場跟一晚用同一張表：一般客人 depth 0／1／2 各 1/3、菁英 3、藏家 4
const pct = x => (100 * x).toFixed(1) + '%';
const pt = x => (100 * x).toFixed(1);
const t0 = Date.now();

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

// ---------------- a whole first night through the real run API ----------------
function night(pol, mode, i) {
  const seedKey = 'sim4-' + i;                                         // same nights for every policy／mode (common random numbers)
  const run = EN.newRun(C, { seedKey, nightNo: 1, ace: TIERS[i % 3] });
  const R = EN.makeRng(EN.fnv1a32(seedKey + '|' + pol + '|' + mode));
  const mem = {}, fights = [];
  let manTries = 0, lostMan = false;
  for (let guard = 0; guard < 120; guard++) {
    if (run.over && !run.pending) break;
    if (EN.canBargainPick(run) && !run.duel && !run.pending) {
      const r = EN.choose(run, C, EN.bargainPolicy(run, C)); if (!r.ok) throw new Error('bargainPick ' + r.error); continue;
    }
    const step = EN.nextStep(run);
    if (!step) break;
    if (step === 'reward' || step === 'retry') {
      if (step === 'retry' && run.pending.free && manTries >= 30) { lostMan = true; break; }
      const ch = EN.runPolicy(run, C); const r = EN.choose(run, C, ch);
      if (!r.ok) throw new Error('runPolicy ' + r.error + ' ' + JSON.stringify(ch));
      continue;
    }
    if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, C, mode)) { const r = EN.choose(run, C, ch); if (!r.ok) throw new Error('shopPolicy ' + r.error + ' ' + JSON.stringify(ch)); }
    if (run.money < 0) throw new Error('money < 0');
    const f = EN.startFight(run, C, {});
    if (f.enemyId === MAN) manTries++;
    const d = play(f.duel, pol, R, mem);
    fights.push({ id: f.enemyId, idx: run.idx, planner: d.e.planner, win: d.over.win, by: d.over.by, hands: d.stats.hands, eHp: d.e.hp, pHp: d.p.hp,
      bluffs: d.stats.bluffs, caught: d.stats.caught, blocked: d.stats.blocked, ace: d.stats.ace });
    EN.finishFight(run, C, d);
  }
  const cleared = run.over === 'clear' && !lostMan;
  return { cleared, lostAt: cleared ? null : lostMan ? MAN : (run.stats.lostAt || {}).enemyId || '?', fights, run };
}
function nightCell(pol, mode, n) {
  const c = { clear: 0, died: {}, fights: 0, retriesUsed: 0, money: { earned: 0, spent: 0, end: 0 }, bought: 0, relicsBought: 0, boughtNights: 0,
    g: { n: 0, hands: 0, le3: 0, max: 0, hist: [0, 0, 0, 0, 0, 0, 0], win: 0, byRounds: 0, koP: 0, koE: 0, pile: 0 }, cls: {}, man: { n: 0, win: 0, hands: 0 }, per: {} };
  for (let i = 0; i < n; i++) {
    const r = night(pol, mode, i);
    if (r.cleared) c.clear++; else c.died[r.lostAt] = (c.died[r.lostAt] || 0) + 1;
    c.fights += r.fights.length; c.retriesUsed += r.run.stats.retries || 0;
    const S = r.run.stats;
    c.money.earned += S.earned; c.money.spent += S.spent; c.money.end += r.run.money;
    c.bought += S.bought.length; c.relicsBought += S.relicsBought.length; if (S.bought.length + S.relicsBought.length) c.boughtNights++;
    for (const f of r.fights) {
      if (f.id === MAN) { c.man.n++; c.man.hands += f.hands; if (f.win) c.man.win++; continue; }
      const G = c.g; G.n++; G.hands += f.hands; if (f.hands <= 3) G.le3++; G.max = Math.max(G.max, f.hands); G.hist[f.hands]++; if (f.win) G.win++; if (f.by === 'rounds') G.byRounds++;
      if (f.by === 'hp') { if (f.win) G.koP++; else G.koE++; } if (f.by === 'pile') G.pile++;   // KO＝聲望歸零（同一手雙倒照聲望條算勝負，記在贏的那邊）
      const K = c.cls[classOf(f.id)] || (c.cls[classOf(f.id)] = { n: 0, win: 0, hands: 0, koP: 0, koE: 0, rounds: 0 });
      K.n++; K.hands += f.hands; if (f.win) K.win++; if (f.by === 'hp') { if (f.win) K.koP++; else K.koE++; } if (f.by === 'rounds') K.rounds++;
      const P = c.per[f.id] || (c.per[f.id] = { n: 0, win: 0, hands: 0, le3: 0 }); P.n++; P.hands += f.hands; if (f.win) P.win++; if (f.hands <= 3) P.le3++;
    }
  }
  const out = { n, clear: c.clear / n, died: c.died, fights: c.fights / n, retries: c.retriesUsed / n,
    earned: c.money.earned / n, spent: c.money.spent / n, moneyEnd: c.money.end / n, bought: c.bought / n, relicsBought: c.relicsBought / n, boughtNights: c.boughtNights / n,
    guests: { fights: c.g.n, hands: c.g.hands / c.g.n, le3: c.g.le3 / c.g.n, max: c.g.max, hist: c.g.hist.slice(1).map(x => x / c.g.n), win: c.g.win / c.g.n, byRounds: c.g.byRounds / c.g.n,
      ko: (c.g.koP + c.g.koE) / c.g.n, koP: c.g.koP / c.g.n, koE: c.g.koE / c.g.n, pile: c.g.pile / c.g.n },
    cls: Object.fromEntries(CLASSES.filter(k => c.cls[k]).map(k => { const K = c.cls[k];
      return [k, { n: K.n, win: K.win / K.n, hands: K.hands / K.n, ko: (K.koP + K.koE) / K.n, koP: K.koP / K.n, koE: K.koE / K.n, byRounds: K.rounds / K.n }]; })),
    man: { fights: c.man.n, win: c.man.win / c.man.n, hands: c.man.hands / c.man.n }, per: {} };
  for (const id in c.per) out.per[id] = { n: c.per[id].n, win: c.per[id].win / c.per[id].n, hands: c.per[id].hands / c.per[id].n, le3: c.per[id].le3 / c.per[id].n };
  return out;
}

// ---------------- single fights ----------------
// S5：序章男子（新包包 7 張＝禮物 4＋特價箱三色各一，沒有配件）
function manFight(pol, i) {
  const run = EN.newRun(C, { seedKey: 'sim4-man-' + i, nightNo: 1, ace: TIERS[i % 3] });
  const r = EN.choose(run, C, EN.bargainPolicy(run, C)); if (!r.ok) throw new Error('bargainPick ' + r.error);
  const f = EN.startFight(run, C, {});
  return play(f.duel, pol, EN.makeRng(EN.fnv1a32('man|' + pol + '|' + i)), {});
}
// S7：包包＝禮物 4＋特價箱 3（三色各一）＋Fishmans；序章配件 1 件（輪流）；出招照 C.plannerByDepth：一般客人 depth 0／1／2 各 1/3、菁英 depth 3、藏家 depth 4
const PRO = C.rewards.prologueRelics.slice();
function guestFight(pol, eKey, i) {
  const tier = TIERS[i % 3];
  const run = EN.newRun(C, { seedKey: 'sim4-g-' + eKey + '-' + i, nightNo: 1, ace: tier });
  const r = EN.choose(run, C, EN.bargainPolicy(run, C)); if (!r.ok) throw new Error('bargainPick ' + r.error);
  const bag = run.bag.concat(C.enemies[MAN].drop ? [C.enemies[MAN].drop] : []);
  const E = C.enemies[eKey];
  const depth = E.boss ? 4 : E.elite ? 3 : [0, 1, 2][Math.floor(i / 3) % 3];
  const eDef = EN.enemyDef(C, eKey, { depth });
  const pDef = EN.playerDef(C, { bag, ace: tier, relics: [PRO[Math.floor(i / 9) % PRO.length]] });
  const opts = { seed: (EN.fnv1a32(eKey + '#' + i) ^ Math.imul(i + 1, 2654435761)) >>> 0 || 1 };
  if (E.boss) opts.enemyAce = C.cards[C.aces[run.bossAce]];
  const { duel } = EN.startDuel(pDef, eDef, opts);
  return play(duel, pol, EN.makeRng(EN.fnv1a32('g|' + pol + '|' + eKey + '|' + i)), {});
}
function fightCell(fn, n) {
  let w = 0, h = 0, le3 = 0, le3w = 0, rounds = 0, koP = 0, koE = 0;
  for (let i = 0; i < n; i++) {
    const d = fn(i); if (d.over.win) w++; h += d.stats.hands; if (d.stats.hands <= 3) { le3++; if (d.over.win) le3w++; } if (d.over.by === 'rounds') rounds++;
    if (d.over.by === 'hp') { if (d.over.win) koP++; else koE++; }
  }
  return { n, win: w / n, hands: h / n, le3: le3 / n, le3win: le3w / n, rounds: rounds / n, ko: (koP + koE) / n, koP: koP / n, koE: koE / n };
}

// ---------------- run ----------------
const checks = [];
const check = (id, name, ok, info) => { checks.push({ id, name, ok: !!ok, info }); };
const report = { N, ECON, CFG: Object.assign({}, CFG), hp: Object.fromEntries([MAN, ...GUESTS].map(k => [k, C.enemies[k].hp])), economy: C.economy,
  relicPrices: Object.fromEntries(Object.keys(C.relics).map(k => [k, EN.relicPrice(C, k)])),
  bins: Object.fromEntries(Object.keys(C.bins).map(k => [k, (C.bins[k].pool || []).length])),
  decks: Object.fromEntries([MAN, ...GUESTS].map(k => [k, C.enemies[k].deck.slice()])) };
const MODES = ECON === 'both' ? ['smart', 'none'] : [ECON];

if (MODE === 'all' || MODE === 'nights') {
  const nt = {};
  for (const mode of MODES) {
    nt[mode] = {};
    const pols = mode === 'smart' ? POLS : POLS.filter(p => p === 'thoughtful');
    for (const pol of pols) nt[mode][pol] = nightCell(pol, mode, N);
  }
  report.nights = nt;
  console.log(`\n### 一整晚（第一晚：序章男子 → Fishmans＋配件三選一 → 3 位一般 → 1 位菁英 → 藏家；老闆說情一次；N=${N} 晚／格；mercy ${CFG.mercy ? '開' : '關'}）\n`);
  console.log('| 策略 | 買東西 | 一晚通關 | 死在哪（男子／一般 1–3／菁英／藏家） | 打幾場 | 客人場平均手數 | ≤3 手 | 賺／花 | 買唱片／配件 |');
  console.log('|---|---|---|---|---|---|---|---|---|');
  for (const mode of MODES) for (const pol of Object.keys(nt[mode])) {
    const x = nt[mode][pol];
    const diedAt = id => (x.died[id] || 0) / x.n;
    const dn = NORMALS.reduce((s, e) => s + diedAt(e), 0), de = ELITES.reduce((s, e) => s + diedAt(e), 0);
    console.log(`| ${LABEL[pol] || pol} | ${mode} | **${pct(x.clear)}** | ${pt(diedAt(MAN))}／${pt(dn)}／${pt(de)}／${pt(diedAt(BOSS))} | ${x.fights.toFixed(2)} | ${x.guests.hands.toFixed(2)} | ${pct(x.guests.le3)} | $${Math.round(x.earned)}／$${Math.round(x.spent)} | ${x.bought.toFixed(2)}／${x.relicsBought.toFixed(2)} |`);
  }
  const TS = nt.smart && nt.smart.thoughtful, TN = nt.none && nt.none.thoughtful;
  if (TS) {
    console.log(`\n會讀的＋smart：客人場手數分布 1–6 手 ${TS.guests.hist.map(pct).join('／')}，第 6 手比聲望結束 ${pct(TS.guests.byRounds)}；每位客人（夜裡遇到時）勝率：` +
      GUESTS.map(e => `${nameOf(e)} ${TS.per[e] ? pct(TS.per[e].win) + '（≤3 手 ' + pct(TS.per[e].le3) + '）' : '—'}`).join('、'));
    const G = TS.guests;
    console.log(`\n會讀的＋smart 客人場怎麼結束：KO ${pct(G.ko)}（你 KO 他 ${pct(G.koP)}／他 KO 你 ${pct(G.koE)}）、第 6 手比聲望條 ${pct(G.byRounds)}` +
      (G.pile ? `、他牌出完 ${pct(G.pile)}` : '') + '；' +
      CLASSES.filter(k => TS.cls[k]).map(k => { const K = TS.cls[k];
        return `${CLASS_ZH[k]} 勝 ${pct(K.win)}、KO ${pct(K.ko)}（你 ${pct(K.koP)}／他 ${pct(K.koE)}）、比聲望條 ${pct(K.byRounds)}、${K.hands.toFixed(2)} 手`; }).join('；'));
    check('S1', '會讀的＋smart 一晚通關 70–85%', TS.clear >= 0.70 && TS.clear <= 0.85, pct(TS.clear));
    for (const p of ['high', 'counterHint', 'formula', 'mirrorHint']) if (nt.smart[p]) check('S2', `${LABEL[p]}＋smart 一晚通關 ≤ S1 − 15 點（≤${pct(TS.clear - 0.15)}）`, nt.smart[p].clear <= TS.clear - 0.15 + 1e-9, pct(nt.smart[p].clear));
    if (nt.smart.random) check('S3', '亂出 一晚通關 ≤5%', nt.smart.random.clear <= 0.05, pct(nt.smart.random.clear));
    check('S4', '會讀的 客人場（一般／菁英／藏家）平均 4.0–6.0 手', TS.guests.hands >= 4.0 && TS.guests.hands <= 6.0, TS.guests.hands.toFixed(2));
    check('S4', '會讀的 客人場 ≤3 手就結束 ≤5%', TS.guests.le3 <= 0.05, pct(TS.guests.le3));
    check('S4', '最多 6 手', Math.max(...Object.values(nt).flatMap(m => Object.values(m).map(x => x.guests.max))) <= CFG.maxRounds,
      Math.max(...Object.values(nt).flatMap(m => Object.values(m).map(x => x.guests.max))));
    if (nt.smart.oracle) check('S8', '先知 一晚通關 ≥97%', nt.smart.oracle.clear >= 0.97, pct(nt.smart.oracle.clear));
    check('S9', '會讀的＋smart 客人場由 KO 結束（任一方聲望歸零）≥35%', G.ko >= 0.35 - 1e-9,
      `${pct(G.ko)}（你 KO 他 ${pct(G.koP)}／他 KO 你 ${pct(G.koE)}；比聲望條 ${pct(G.byRounds)}）`);
  }
  if (TS && TN) {
    check('S6', '會讀的 smart − none ≥ 5 點', TS.clear - TN.clear >= 0.05 - 1e-9, `${pt(TS.clear)} − ${pt(TN.clear)} = ${pt(TS.clear - TN.clear)} 點`);
    check('S6', '會讀的＋none 一晚通關 ≥50%', TN.clear >= 0.50, pct(TN.clear));
  }
}

if (MODE === 'all' || MODE === 'fights') {
  // S5 男子
  const manPols = POLS.filter(p => ['thoughtful', 'high', 'counterHint', 'formula', 'mirrorHint', 'random', 'oracle'].includes(p));
  const mt = {};
  for (const pol of manPols) mt[pol] = fightCell(i => manFight(pol, i), N);
  report.man = mt;
  console.log(`\n### 序章男子（聲望 ${C.enemies[MAN].hp}、包包 7 張＝禮物 4＋特價箱三色各一、planner easy、老實；N=${N}）\n`);
  console.log('| 策略 | 勝率 | 平均手數 |'); console.log('|---|---|---|');
  for (const pol of manPols) console.log(`| ${LABEL[pol] || pol} | ${pct(mt[pol].win)} | ${mt[pol].hands.toFixed(2)} |`);
  if (mt.thoughtful) { check('S5', '男子：會讀的 ≥97%', mt.thoughtful.win >= 0.97, pct(mt.thoughtful.win)); check('S5', '男子：會讀的 平均 ≤4 手', mt.thoughtful.hands <= 4, mt.thoughtful.hands.toFixed(2)); }
  if (mt.high) check('S5', '男子：只出最大星 ≥90%', mt.high.win >= 0.90, pct(mt.high.win));
  if (mt.counterHint) check('S5', '男子：永遠剋提示 ≥90%', mt.counterHint.win >= 0.90, pct(mt.counterHint.win));

  // S7 單場
  const gPols = POLS.filter(p => ['thoughtful', 'high', 'counterHint', 'random', 'oracle'].includes(p));
  const gt = {};
  for (const pol of gPols) { gt[pol] = {}; for (const e of GUESTS) gt[pol][e] = fightCell(i => guestFight(pol, e, i), N); }
  report.fights = gt;
  console.log(`\n### 單場（包包 8＝禮物 4＋特價箱 3＋Fishmans；序章配件 1 件；一般客人 planner ${PLAN.slice(0, 3).join('／')} 各 1/3、菁英 ${PLAN[3]}、藏家 ${PLAN[4]}；N=${N}／格）\n`);
  const head = ['策略', ...GUESTS.map(e => `${nameOf(e)}（${C.enemies[e].hp}）`)];
  console.log('| ' + head.join(' | ') + ' |'); console.log('|' + head.map(() => '---').join('|') + '|');
  for (const pol of gPols) console.log('| ' + [LABEL[pol] || pol, ...GUESTS.map(e => pct(gt[pol][e].win))].join(' | ') + ' |');
  if (gt.thoughtful) {
    console.log('| 會讀的：平均手數 | ' + GUESTS.map(e => gt.thoughtful[e].hands.toFixed(2)).join(' | ') + ' |');
    console.log('| 會讀的：≤3 手（其中你贏） | ' + GUESTS.map(e => `${pct(gt.thoughtful[e].le3)}（${pct(gt.thoughtful[e].le3win)}）`).join(' | ') + ' |');
    console.log('| 會讀的：第 6 手比聲望 | ' + GUESTS.map(e => pct(gt.thoughtful[e].rounds)).join(' | ') + ' |');
    console.log('| 會讀的：KO（你 KO 他／他 KO 你） | ' + GUESTS.map(e => `${pct(gt.thoughtful[e].ko)}（${pct(gt.thoughtful[e].koP)}／${pct(gt.thoughtful[e].koE)}）`).join(' | ') + ' |');
    const ws = NORMALS.map(e => gt.thoughtful[e].win), spread = Math.max(...ws) - Math.min(...ws);
    check('S7', '單場 會讀的：6 位一般客人最高減最低 ≤20 點', spread <= 0.20 + 1e-9, `${pt(Math.min(...ws))}–${pt(Math.max(...ws))}（${pt(spread)} 點）`);
    for (const e of ELITES) check('S7', `單場 會讀的：菁英 ${nameOf(e)} 60–95%`, gt.thoughtful[e].win >= 0.60 && gt.thoughtful[e].win <= 0.95, pct(gt.thoughtful[e].win));
    check('S7', `單場 會讀的：藏家 45–85%`, gt.thoughtful[BOSS].win >= 0.45 && gt.thoughtful[BOSS].win <= 0.85, pct(gt.thoughtful[BOSS].win));
  }
}

// HP：聲望單調（FIXLIST 10）——一般的最大 ≤ 菁英的最小、菁英的最大 ≤ 藏家；不靠模擬，每種 --mode 都檢查
{
  const hs = ids => ids.map(id => C.enemies[id].hp), hn = hs(NORMALS), he = hs(ELITES), hb = C.enemies[BOSS].hp;
  const span = a => Math.min(...a) === Math.max(...a) ? String(a[0]) : Math.min(...a) + '–' + Math.max(...a);
  report.hpOrder = { normal: [Math.min(...hn), Math.max(...hn)], elite: [Math.min(...he), Math.max(...he)], boss: hb };
  check('HP', '聲望單調：一般最大 ≤ 菁英最小、菁英最大 ≤ 藏家', Math.max(...hn) <= Math.min(...he) && Math.max(...he) <= hb,
    `一般 ${span(hn)}／菁英 ${span(he)}／藏家 ${hb}（你 ${CFG.playerHp}）`);
}

console.log('\n### 門檻（SPEC-v4 §5.2＋FIXLIST 10 的 S9／HP）');
for (const c of checks) console.log((c.ok ? '  ok   ' : '  FAIL ') + c.id + ' ' + c.name + (c.info !== undefined ? '：' + c.info : ''));
const failed = checks.filter(c => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} 通過（${((Date.now() - t0) / 1000).toFixed(1)} 秒）`);
report.checks = checks;
if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 1));
if (failed.length) process.exitCode = 1;
