// game-lab/sim.mjs — v3 balance simulation + thresholds (SPEC-v3 §11.2, §12; Agent R).  Port of v3/final/sim.js onto the REAL engine.
// Usage: node game-lab/sim.mjs [--n 1500] [--mode all|fights|nights|tut] [--relics typical|none|max] [--json out.json]
//                              [--set habitP=0.45,playerHp=11] [--hp '{"copycat":14}'] [--policies novice,random]
// Uses engine.js (startDuel / resolveTurn / policies / newRun / startFight / finishFight / choose / runPolicy) and content.js (real cards).
// 發燒配件 are ON in every table that has thresholds (loadout 'typical'): one prologue relic in every fight, a second one for the boss
// (the relic taken after the elite).  '--relics max' (three relics, every combination) and 'none' are reported too.
// Any failed threshold sets process.exitCode = 1.
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const EN = require(path.join(HERE, 'engine.js'));
const C = require(path.join(HERE, 'content.js'));
const { CFG, TIERS, FORMULAS } = EN;

// ---------------- args ----------------
const argv = process.argv.slice(2);
const arg = (name, def) => { const i = argv.indexOf('--' + name); return i >= 0 && argv[i + 1] != null ? argv[i + 1] : def; };
const N = +arg('n', 1500);
const MODE = arg('mode', 'all');
const LOADOUT = arg('relics', 'typical');
const JSON_OUT = arg('json', null);
if (arg('set', null)) for (const kv of arg('set').split(',')) { const [k, v] = kv.split('='); if (!(k in CFG)) throw new Error('unknown CFG ' + k); CFG[k] = +v; }
if (arg('hp', null)) { const o = JSON.parse(arg('hp')); for (const k in o) C.enemies[k].hp = o[k]; }
const ALL_POLS = ['random', ...FORMULAS, 'sloppy', 'novice', 'learner', 'veteran', 'oracle'];
const POLS = arg('policies', ALL_POLS.join(',')).split(',').filter(Boolean);
for (const p of POLS) if (!EN.policies[p]) { console.error('unknown policy ' + p); process.exit(2); }
const LABEL = { random: '亂丟', strongest: '永遠丟最大顆', counterTop: '剋他最大的星', mirrorTop: '跟他最大的星同色', counterLast: '剋他上一手',
  dodgeMine: '剋自己上一手', beatMine: '丟自己上一手剋得到的', mirrorLast: '丟他上一手', beatLast: '丟他上一手剋得到的', counterSecond: '剋他第二大的星',
  sloppy: '粗心新手', novice: '照名牌', learner: '不看名牌（對照）', veteran: '老手（照名牌＋避險）', oracle: '先知' };

const NORMALS = C.normals, ELITES = C.elites, BOSS = C.boss, MAN = C.prologueEnemy;
const ROSTER = [MAN, ...NORMALS, ...ELITES, BOSS];
const MID_WINS = ['fishmans-long-season', 'beach-house-teen-dream', 'duster-stratosphere'];   // 「打過三位的包」（SPEC-v3 §12.1）
const card = id => { const c = C.cards[id]; if (!c) throw new Error('missing card ' + id); return c; };
const pct = x => (100 * x).toFixed(0) + '%';
const t0 = Date.now();

// ---------------- relic loadouts ----------------
const PRO = C.rewards.prologueRelics.slice(), POOL = C.rewards.relicPool.slice();
if (LOADOUT === 'none') { C.rewards.prologueRelics = []; C.rewards.relicPool = []; }   // nights without relics too
const COMBOS3 = []; for (let a = 0; a < POOL.length; a++) for (let b = a + 1; b < POOL.length; b++) for (let c = b + 1; c < POOL.length; c++) COMBOS3.push([POOL[a], POOL[b], POOL[c]]);
function loadout(kind, eKey, i) {
  if (kind === 'none' || eKey === MAN) return [];
  if (kind === 'max') return COMBOS3[i % COMBOS3.length];
  const first = PRO[i % PRO.length];
  if (eKey !== BOSS) return [first];
  const rest = POOL.filter(r => r !== first);
  return [first, rest[Math.floor(i / PRO.length) % rest.length]];
}

// ---------------- one fight ----------------
function fight(pol, tier, eKey, seed, relics, R) {
  const E = C.enemies[eKey];
  const bagIds = (E.elite || E.boss) ? [...C.gifts[tier], C.junk[2], ...MID_WINS] : [...C.gifts[tier], ...C.junk];
  const pDef = { hp: CFG.playerHp, bag: bagIds.map(card), ace: card(C.aces[tier]), relics: relics.map(r => EN.relicObj(r, C)) };
  const eDef = EN.enemyDef(C, eKey);
  const others = TIERS.filter(t => t !== tier);
  const { duel } = EN.startDuel(pDef, eDef, { seed, enemyAce: E.boss ? card(C.aces[others[seed % 2]]) : null });
  const fn = EN.policies[pol]; let guard = 0;
  while (!duel.over) {
    if (++guard > 40) throw new Error('runaway duel ' + eKey);
    const act = fn(duel, R);
    if (!EN.isLegal(duel, act)) throw new Error('illegal act from ' + pol + ': ' + JSON.stringify(act));
    EN.resolveTurn(duel, act);
  }
  return duel;
}
function fightTable(kind, pols, enemies, n) {
  const res = {};
  for (const pol of pols) {
    res[pol] = {};
    for (const eKey of enemies) {
      const R = EN.makeRng(EN.fnv1a32(pol + '|' + eKey + '|' + kind));
      let w = 0, hands = 0, pile = 0, in47 = 0, maxH = 0, reads = 0, ace = 0, decided = 0, notes = 0;
      for (let i = 0; i < n; i++) {
        const tier = TIERS[i % 3];
        const d = fight(pol, tier, eKey, (EN.fnv1a32(eKey + '#' + i) ^ (i * 2654435761)) >>> 0 || 1, loadout(kind, eKey, i), R);
        const h = d.stats.hands;
        if (d.over.win) w++;
        hands += h; if (d.over.by === 'pile') pile++; if (h >= 4 && h <= 7) in47++; maxH = Math.max(maxH, h);
        reads += d.stats.reads; ace += d.stats.ace; decided += d.stats.counter + d.stats.countered; notes += d.stats.relicNotes;
      }
      res[pol][eKey] = { win: w / n, hands: hands / n, pile: pile / n, in47: in47 / n, maxH, reads: reads / n, ace: ace / n, decided: decided / hands, notes: notes / n };
    }
  }
  return res;
}
// 今晚平均：一般客人 3/5、菁英 1/5、藏家 1/5（＝一晚實際遇到的比例）
function nightAvg(res, pol, f = 'win') {
  const n = NORMALS.reduce((a, e) => a + res[pol][e][f], 0) / NORMALS.length;
  const el = ELITES.reduce((a, e) => a + res[pol][e][f], 0) / ELITES.length;
  return 0.6 * n + 0.2 * el + 0.2 * res[pol][BOSS][f];
}
function printTable(res, pols, enemies, title) {
  const habitZh = k => C.habits[k].zh;
  const head = ['策略', ...enemies.map(e => C.enemies[e].name + '（' + habitZh(C.enemies[e].habit) + (C.enemies[e].phase2 ? '→' + habitZh(C.enemies[e].phase2) : '') + '）'), '今晚平均', '手數'];
  console.log('\n### ' + title + '\n');
  console.log('| ' + head.join(' | ') + ' |'); console.log('|' + head.map(() => '---').join('|') + '|');
  for (const p of pols) console.log('| ' + [LABEL[p] || p, ...enemies.map(e => pct(res[p][e].win)), '**' + pct(nightAvg(res, p)) + '**', nightAvg(res, p, 'hands').toFixed(1)].join(' | ') + ' |');
}

// ---------------- a whole night through the real run API ----------------
// first night: prologue man (same policy; ≤30 tries) → Fishmans + one of the three prologue relics → 3 normals → elite → boss.
// 'carried': a later night (no prologue) that starts with three relics.
function night(pol, seedKey, retries, flavour) {
  const tier = TIERS[EN.fnv1a32(seedKey) % 3];
  const carried = flavour === 'carried' ? COMBOS3[EN.fnv1a32(seedKey + '#c') % COMBOS3.length] : [];
  const run = EN.newRun(C, { seedKey, nightNo: flavour === 'carried' ? 2 : 1, ace: tier, relics: carried });
  run.retryLeft = retries;
  const R = EN.makeRng(EN.fnv1a32(seedKey + '|' + pol));
  const fn = EN.policies[pol];
  let manTries = 0, fights = 0;
  for (let guard = 0; guard < 200; guard++) {
    const step = EN.nextStep(run);
    if (step === null) break;
    if (step === 'reward' || step === 'retry') {
      if (step === 'retry' && run.pending.free && manTries >= 30) return { cleared: false, at: MAN, fights, run };
      const ch = EN.runPolicy(run, C);
      const r = EN.choose(run, C, ch);
      if (!r.ok) throw new Error('runPolicy made an invalid choice: ' + r.error + ' ' + JSON.stringify(ch));
      continue;
    }
    const f = EN.startFight(run, C);
    if (f.enemyId === MAN) manTries++;
    fights++;
    const d = f.duel; let g = 0;
    while (!d.over) { if (++g > 40) throw new Error('runaway'); EN.resolveTurn(d, fn(d, R)); }
    EN.finishFight(run, C, d);
  }
  return { cleared: run.over === 'clear', at: run.over === 'dead' ? (run.stats.lostAt || {}).enemyId : null, fights, run };
}
function nightTable(pols, n, flavour) {
  const out = {};
  for (const pol of pols) {
    out[pol] = {};
    for (const retries of [0, 1]) {
      let clr = 0, fights = 0, relicEnd = 0, bagEnd = 0; const died = {};
      for (let i = 0; i < n; i++) {
        const r = night(pol, 'sim-' + flavour + '-' + i, retries, flavour);
        if (r.cleared) clr++; else died[r.at] = (died[r.at] || 0) + 1;
        fights += r.fights; relicEnd += r.run.relics.length; bagEnd += r.run.bag.length;
      }
      out[pol][retries] = { clear: clr / n, fights: fights / n, died, relics: relicEnd / n, bag: bagEnd / n };
    }
  }
  return out;
}

// ---------------- the tutorial (SPEC-v3 §8): three aces, follow the finger, novice on hand 4 ----------------
function tutorialCheck() {
  const out = {};
  for (const tier of TIERS) {
    const run = EN.newRun(C, { seedKey: 'tut', ace: tier });
    const { duel } = EN.startFight(run, C, { tutorial: true });
    const dmg = [];
    for (const a of ['o', 'c', 'h']) { const ev = EN.resolveTurn(duel, EN.bestChip(duel, a)); const cl = ev.find(e => e.t === 'clash'); dmg.push(cl.kind === 'counter' && cl.toP === 0 ? cl.toE : -99); }
    while (!duel.over && duel.n <= 4) EN.resolveTurn(duel, EN.policies.novice(duel));
    out[tier] = { dmg, hands: duel.stats.hands, win: !!(duel.over && duel.over.win), pHp: duel.p.hp };
  }
  return out;
}

// ---------------- thresholds ----------------
const checks = [];
const check = (name, ok, info) => { checks.push({ name, ok: !!ok, info }); };
const report = {};

if (MODE === 'all' || MODE === 'fights') {
  const res = fightTable(LOADOUT, POLS, ROSTER, N);
  report.fights = res;
  printTable(res, POLS, ROSTER, `一場勝率（N=${N}／格；發燒配件 ${LOADOUT}；你 ${CFG.playerHp}；照脾氣 ${CFG.habitP}）`);
  const has = p => POLS.includes(p);
  if (has('novice')) {
    const v = nightAvg(res, 'novice'), h = nightAvg(res, 'novice', 'hands'), in47 = nightAvg(res, 'novice', 'in47');
    console.log(`\n照名牌：手數 ${h.toFixed(1)}，4–7 手 ${pct(in47)}，丟完才結算 ${pct(nightAvg(res, 'novice', 'pile'))}，看穿 ${nightAvg(res, 'novice', 'reads').toFixed(1)} 次，王牌 ${nightAvg(res, 'novice', 'ace').toFixed(2)} 次，相剋決定 ${pct(nightAvg(res, 'novice', 'decided'))} 的手，配件生效 ${nightAvg(res, 'novice', 'notes').toFixed(1)} 次／場`);
    if (LOADOUT !== 'max') {
      check('照名牌 今晚平均 78–88%', v >= 0.78 && v <= 0.88, pct(v));
      check('照名牌 平均 4.5–6.5 手', h >= 4.5 && h <= 6.5, h.toFixed(2));
      check('照名牌 4–7 手的場次 ≥85%', in47 >= 0.85, pct(in47));
      for (const e of NORMALS) check('照名牌 一般 ' + C.enemies[e].name + ' 65–95%', res.novice[e].win >= 0.65 && res.novice[e].win <= 0.95, pct(res.novice[e].win));
      for (const e of [...ELITES, BOSS]) check('照名牌 ' + C.enemies[e].name + ' 70–90%', res.novice[e].win >= 0.70 && res.novice[e].win <= 0.90, pct(res.novice[e].win));
      check('照名牌 男子 100%', res.novice[MAN].win === 1, pct(res.novice[MAN].win));
    } else {
      check('三件配件：照名牌 今晚平均 ≤92%', v <= 0.92, pct(v));
    }
  }
  if (has('random') && LOADOUT !== 'max') {
    const v = nightAvg(res, 'random');
    check('亂丟 今晚平均 22–35%', v >= 0.22 && v <= 0.35, pct(v));
    check('亂丟 男子 ≥70%', res.random[MAN].win >= 0.70, pct(res.random[MAN].win));
  }
  if (has('sloppy') && LOADOUT !== 'max') check('粗心新手 今晚平均 ≥70%', nightAvg(res, 'sloppy') >= 0.70, pct(nightAvg(res, 'sloppy')));
  if (has('oracle')) check('先知 今晚平均 ≥99%', nightAvg(res, 'oracle') >= 0.99, pct(nightAvg(res, 'oracle')));
  const fcap = LOADOUT === 'max' ? 0.58 : 0.55;
  for (const f of FORMULAS.filter(has)) {
    check(`公式「${LABEL[f]}」今晚平均 ≤${pct(fcap)}`, nightAvg(res, f) <= fcap, pct(nightAvg(res, f)));
    if (LOADOUT !== 'max') {
      const low = Math.min(...[...NORMALS, ...ELITES, BOSS].map(e => res[f][e].win));
      check(`公式「${LABEL[f]}」至少在一位客人身上 ≤35%`, low <= 0.35, pct(low));
    }
  }
  const maxH = Math.max(...POLS.flatMap(p => ROSTER.map(e => res[p][e].maxH)));
  check('最多 7 手', maxH <= 7, maxH);
  const fmax = Math.max(...FORMULAS.filter(has).map(f => nightAvg(res, f)));
  if (FORMULAS.some(has)) console.log(`最強固定公式（今晚平均）：${pct(fmax)}`);
  if (LOADOUT === 'typical' && MODE === 'all') {
    // the same table without relics and with three relics (report + the 3-relic sanity caps)
    const pols2 = POLS.filter(p => ['random', 'counterLast', 'strongest', 'sloppy', 'novice', 'oracle'].includes(p));
    const r0 = fightTable('none', pols2, ROSTER, Math.max(300, Math.floor(N / 2)));
    const r3 = fightTable('max', POLS, ROSTER, Math.max(300, Math.floor(N / 2)));
    console.log('\n配件對照（今晚平均）：');
    for (const p of pols2) console.log(`  ${LABEL[p]}：沒有配件 ${pct(nightAvg(r0, p))}／一般帶 1 件、藏家 2 件 ${pct(nightAvg(res, p))}／三件 ${pct(nightAvg(r3, p))}`);
    if (has('novice')) check('三件配件：照名牌 今晚平均 ≤92%', nightAvg(r3, 'novice') <= 0.92, pct(nightAvg(r3, 'novice')));
    for (const f of FORMULAS.filter(has)) check(`三件配件：公式「${LABEL[f]}」今晚平均 ≤58%`, nightAvg(r3, f) <= 0.58, pct(nightAvg(r3, f)));
    report.fightsNoRelic = r0; report.fightsMaxRelic = r3;
  }
}

if (MODE === 'all' || MODE === 'nights') {
  const nN = Math.max(600, Math.floor(N / 1.5));
  const npols = POLS.filter(p => p !== 'veteran' && p !== 'learner' || POLS.length < 4);
  const nt = nightTable(npols, nN, 'first');
  report.nights = nt;
  console.log(`\n### 一整晚（第一晚：序章男子 → Fishmans＋配件三選一 → 3 一般 → 1 菁英（贏了挑唱片或配件）→ 藏家；N=${nN}）\n`);
  console.log('| 策略 | 不重打 | 老闆說情一次 | 平均打幾場 | 收尾配件 |'); console.log('|---|---|---|---|---|');
  for (const p of npols) console.log(`| ${LABEL[p] || p} | ${pct(nt[p][0].clear)} | ${pct(nt[p][1].clear)} | ${nt[p][1].fights.toFixed(1)} | ${nt[p][1].relics.toFixed(1)} |`);
  if (nt.novice) {
    check('一晚 照名牌 不重打 35–60%', nt.novice[0].clear >= 0.35 && nt.novice[0].clear <= 0.60, pct(nt.novice[0].clear));
    check('一晚 照名牌 說情一次 65–90%', nt.novice[1].clear >= 0.65 && nt.novice[1].clear <= 0.90, pct(nt.novice[1].clear));
  }
  if (nt.random) check('一晚 亂丟 ≤3%', nt.random[1].clear <= 0.03, pct(nt.random[1].clear));
  for (const f of FORMULAS.filter(f => nt[f])) {
    check(`一晚 公式「${LABEL[f]}」不重打 ≤10%`, nt[f][0].clear <= 0.10, pct(nt[f][0].clear));
    check(`一晚 公式「${LABEL[f]}」說情一次 ≤20%`, nt[f][1].clear <= 0.20, pct(nt[f][1].clear));
  }
  // a later night that starts with three carried relics (report; loose caps)
  const cp = npols.filter(p => ['random', 'counterLast', 'beatLast', 'strongest', 'sloppy', 'novice', 'oracle'].includes(p));
  const nc = nightTable(cp, Math.max(400, Math.floor(nN / 2)), 'carried');
  report.nightsCarried = nc;
  console.log('\n第二晚起（帶著三件配件、沒有序章）：');
  for (const p of cp) console.log(`  ${LABEL[p]}：不重打 ${pct(nc[p][0].clear)}，說情一次 ${pct(nc[p][1].clear)}`);
  if (nc.novice) check('第二晚（三件配件）照名牌 說情一次 ≤93%', nc.novice[1].clear <= 0.93, pct(nc.novice[1].clear));
  for (const f of FORMULAS.filter(f => nc[f])) check(`第二晚（三件配件）公式「${LABEL[f]}」說情一次 ≤30%`, nc[f][1].clear <= 0.30, pct(nc[f][1].clear));
}

if (MODE === 'all' || MODE === 'tut') {
  const tc = tutorialCheck();
  report.tutorial = tc;
  console.log('\n### 教學（男子 14 聲望，照手指點最大的星，第四手照名牌）');
  for (const t of TIERS) {
    console.log(`  ${C.aceTitle[t]}：前三手 ${tc[t].dmg.join('＋')}，${tc[t].hands} 手收掉，你 ${tc[t].pHp} 聲望`);
    check(`教學 ${C.aceTitle[t]} 前三手＝${C.tutorial.expect[t].join('+')}`, tc[t].dmg.join() === C.tutorial.expect[t].join(), tc[t].dmg.join('+'));
    check(`教學 ${C.aceTitle[t]} 第 4 手以內收掉、不掉血`, tc[t].win && tc[t].hands <= 4 && tc[t].pHp === CFG.playerHp, tc[t]);
  }
}

console.log('\n### 門檻');
for (const c of checks) console.log((c.ok ? '  ok   ' : '  FAIL ') + c.name + (c.info !== undefined ? '：' + (typeof c.info === 'object' ? JSON.stringify(c.info) : c.info) : ''));
const failed = checks.filter(c => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} 通過（${((Date.now() - t0) / 1000).toFixed(1)} 秒）`);
if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify({ N, LOADOUT, CFG, report, checks }, null, 1));
if (failed.length) process.exitCode = 1;
