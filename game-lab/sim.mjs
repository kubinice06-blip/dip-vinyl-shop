// game-lab/sim.mjs — balance simulation + thresholds (SPEC §7.7, §8.2).  Agent A.
// Usage: node game-lab/sim.mjs [--n 1500] [--mode all|fights|prologue|night] [--policies random,highest,...]
//                              [--content path/to/content.js] [--cfg '{"playerHp":20}'] [--enemy '{"boss":{"hp":22}}'] [--json out.json]
// Uses the REAL rules (engine.js policies) and REAL content (game-lab/content.js, which loads cards.js).
// Nights go through newRun → generateNight → choose/startNodeDuel/finishDuel with routePolicy (requests, relics and events all on).
// Any failed threshold sets process.exitCode = 1.
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const EN = require(path.join(HERE, 'engine.js'));
const { ATTRS, CFG, TIERS } = EN;

// ---------------- args ----------------
const argv = process.argv.slice(2);
const arg = (name, def) => { const i = argv.indexOf('--' + name); return i >= 0 && argv[i + 1] != null ? argv[i + 1] : def; };
const N = +arg('n', 1500);
const MODE = arg('mode', argv[0] && !argv[0].startsWith('--') ? argv[0] : 'all');
const ALL_POLS = ['random', 'highest', 'counterBubble', 'oldFormula', 'mostLikely', 'ev', 'ev2', 'oracle'];
const POLS = arg('policies', ALL_POLS.join(',')).split(',').filter(Boolean);
const contentPath = path.resolve(arg('content', path.join(HERE, 'content.js')));
const C = require(contentPath);
const cfgOver = arg('cfg', process.env.CFG || null);
if (cfgOver) Object.assign(CFG, JSON.parse(cfgOver));
const enemyOver = arg('enemy', process.env.ENEMY || null);
if (enemyOver) { const o = JSON.parse(enemyOver); for (const k in o) Object.assign(C.enemies[k], o[k]); }
const JSON_OUT = arg('json', null);
const LABEL = { random: '亂點', highest: '最高星', counterBubble: '剋氣場', oldFormula: '舊公式', mostLikely: '讀盤', ev: '期望值', ev2: '期望值＋前瞻', oracle: '知道真招' };
for (const p of POLS) if (!EN.policies[p]) { console.error('unknown policy ' + p); process.exit(2); }

const card = id => { const c = C.cards[id]; if (!c) throw new Error('missing card ' + id); return c; };
const otherTier = (tier, k) => TIERS.filter(t => t !== tier)[k % 2];
const pct = x => (100 * x).toFixed(0).padStart(3) + '%';
const t0 = Date.now();

// ---------------- single fight ----------------
function fight(pol, tier, eKey, seed, hp, o = {}) {
  const E = C.enemies[eKey];
  const r = EN.makeRng(seed * 7 + 3);
  const pDef = { hp, maxHp: o.maxHp || hp, deck: [...C.gifts[tier], ...C.junk].map(card), ace: card(C.aces[tier]), ear: tier, relics: o.relics || [], startQi: o.startQi || 0 };
  const prologue = eKey === (C.prologueEnemy || 'man');
  const request = prologue || !(E.requests && E.requests.length) ? null : E.requests[seed % E.requests.length];
  const { duel: st } = EN.startDuel(pDef, { ...E, deck: E.deck.map(card) }, { seed, ultAttr: EN.resolveUltAttr(E.ultAttr, tier), request, prologue,
    enemyAce: E.boss ? card(C.aces[otherTier(tier, seed)]) : null });
  let faceAt = -1, feintAfterFace = 0;
  while (!st.over) {
    const ev = EN.resolveTurn(st, EN.policies[pol](st, r));
    const cl = ev.find(e => e.t === 'clash');
    if (faceAt > 0 && cl && cl.glyph === 'feint') feintAfterFace++;      // a 晃 revealed in a hand AFTER the face change
    if (faceAt < 0 && ev.some(e => e.t === 'faceChange')) faceAt = st.hand;
  }
  return { win: st.over === 'win', hands: st.hand, lost: hp - Math.max(0, st.p.hp), stats: st.stats, face: faceAt > 0, feintAfterFace };
}

const R = { meta: { n: N, content: contentPath, cfg: { ...CFG }, policies: POLS }, fights: {}, prologue: {}, night: {} };

function runFights() {
  const keys = [...C.normals, ...C.elites, C.boss || 'boss'];
  console.log(`\nSingle fights at full HP ${CFG.playerHp} — start deck (gifts+junk), no relics, request from his pool  N=${N}`);
  console.log('    win% / avg hands / avg HP lost / reflects per fight');
  console.log('enemy'.padEnd(10) + POLS.map(p => (p + ' ' + LABEL[p]).slice(0, 22).padStart(26)).join(''));
  for (const k of keys) {
    let line = k.padEnd(10); R.fights[k] = {};
    for (const pol of POLS) {
      let w = 0, h = 0, l = 0, rf = 0;
      for (let i = 0; i < N; i++) { const f = fight(pol, TIERS[i % 3], k, 1000 + i, CFG.playerHp); w += f.win; h += f.hands; l += f.lost; rf += f.stats.reflect; }
      R.fights[k][pol] = { win: w / N, hands: h / N, lost: l / N, reflect: rf / N };
      line += `${pct(w / N)} ${(h / N).toFixed(1).padStart(4)}h -${(l / N).toFixed(1).padStart(4)} r${(rf / N).toFixed(2)}`.padStart(26);
    }
    console.log(line);
  }
}

function runPrologue() {
  const man = C.prologueEnemy || 'man';
  console.log(`\nPrologue (player HP ${CFG.prologueHp}, no good-ear qi): win% / hands / 變臉 reached / ≥1 晃 revealed after 變臉 (of fights that reached it)`);
  for (const pol of POLS) {
    let w = 0, h = 0, fc = 0, fa = 0;
    for (let i = 0; i < N; i++) { const f = fight(pol, TIERS[i % 3], man, 500 + i, CFG.prologueHp); w += f.win; h += f.hands; fc += f.face; fa += (f.face && f.feintAfterFace > 0); }
    R.prologue[pol] = { win: w / N, hands: h / N, face: fc / N, feintAfterFace: fa / Math.max(1, fc) };
    console.log((pol + ' ' + LABEL[pol]).padEnd(22), pct(w / N), (h / N).toFixed(1) + 'h', 'face ' + pct(fc / N), 'feint ' + pct(fa / Math.max(1, fc)));
  }
}

// ---------------- whole night through the real night API ----------------
function night(pol, i) {
  const tier = TIERS[i % 3], goodEar = ((i / 3) | 0) % 2 === 1;
  const run = EN.newRun(C, { seedKey: 'sim-' + i, nightNo: 1, aceTier: tier, goodEar });
  const r = EN.makeRng(9000 + i);
  let guard = 0, gaveUp = false, nightFights = 0, hands = 0, bossHp = null;
  while (!run.over && guard++ < 600) {
    const step = EN.nextStep(run);
    if (step === 'duel') {
      const node = EN.findNode(run, run.pending.nodeId);
      if (node.type === 'boss' && bossHp === null) bossHp = run.hp;
      const { duel } = EN.startNodeDuel(run, C, run.pending.nodeId);
      while (!duel.over) EN.resolveTurn(duel, EN.policies[pol](duel, r));
      hands += duel.hand; if (node.type !== 'prologue') nightFights++;
      const { offer, error } = EN.finishDuel(run, C, duel);
      if (error) throw new Error('finishDuel ' + error);
      if (offer.kind === 'retry' && run.stats.retries >= 50) { gaveUp = true; break; }
      continue;
    }
    const ch = EN.routePolicy(run, C, run.pending);
    const res = EN.choose(run, C, ch);
    if (res.error) throw new Error(`choose ${step} ${JSON.stringify(ch)} → ${res.error}`);
  }
  const reach = bossHp !== null;
  return { clear: run.over === 'clear', reach, gaveUp, fights: nightFights, hands, reflect: run.stats.reflect, retries: run.stats.retries,
    died: run.over === 'dead' ? run.stats.lostAt.enemyId : (gaveUp ? 'man' : null), bossHp, score: EN.scoreRun(run).total, relics: run.relics.length, deck: run.deck.length };
}
function runNight() {
  console.log(`\nNight via generateNight + choose + routePolicy (prologue first; HP ${CFG.playerHp} carried, +${CFG.winHeal} per win; requests/relics/events on; good ear on half the nights)  N=${N}`);
  console.log('    reach boss / clear / night fights / hands / reflects per night / P(≥1 reflect) / prologue retries / HP at boss / score / deaths');
  for (const pol of POLS) {
    let reach = 0, clear = 0, fights = 0, hands = 0, refl = 0, refl1 = 0, retr = 0, bhp = 0, bn = 0, score = 0; const deaths = {};
    for (let i = 0; i < N; i++) {
      const o = night(pol, i);
      reach += o.reach; clear += o.clear; fights += o.fights; hands += o.hands; refl += o.reflect; refl1 += o.reflect > 0; retr += o.retries; score += o.score;
      if (o.bossHp !== null) { bhp += o.bossHp; bn++; }
      if (o.died) deaths[o.died] = (deaths[o.died] || 0) + 1;
    }
    const d = Object.entries(deaths).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => k + ' ' + pct(v / N)).join(', ');
    R.night[pol] = { reach: reach / N, clear: clear / N, fights: fights / N, hands: hands / N, reflect: refl / N, reflect1: refl1 / N, retries: retr / N, bossHp: bn ? bhp / bn : null, score: score / N, deaths };
    console.log((pol + ' ' + LABEL[pol]).padEnd(22), 'boss ' + pct(reach / N), 'clear ' + pct(clear / N), (fights / N).toFixed(1) + ' fights', (hands / N).toFixed(1) + ' hands',
      'refl ' + (refl / N).toFixed(2), 'P≥1 ' + pct(refl1 / N), 'retry ' + (retr / N).toFixed(2), 'bossHP ' + (bn ? (bhp / bn).toFixed(1) : '-'), 'score ' + (score / N).toFixed(0), ' died: ' + d);
  }
}

if (MODE === 'all' || MODE === 'fights') runFights();
if (MODE === 'all' || MODE === 'prologue') runPrologue();
if (MODE === 'all' || MODE === 'night') runNight();

// ---------------- thresholds (SPEC §8.2) ----------------
const checks = [];
function chk(name, val, lo, hi, fmt = 'pct') {
  if (val === undefined || val === null || Number.isNaN(val)) { checks.push({ name, status: 'SKIP', text: 'n/a' }); return; }
  const pass = (lo == null || val >= lo - 1e-9) && (hi == null || val <= hi + 1e-9);
  const f = v => fmt === 'pct' ? (100 * v).toFixed(1) + '%' : v.toFixed(2);
  const range = lo != null && hi != null ? `${f(lo)}–${f(hi)}` : lo != null ? `≥ ${f(lo)}` : `≤ ${f(hi)}`;
  checks.push({ name, status: pass ? 'PASS' : 'FAIL', text: `${f(val)}  (want ${range})` });
}
const g = (o, ...ks) => { for (const k of ks) { if (o == null) return undefined; o = o[k]; } return o; };
if (MODE === 'all' || MODE === 'prologue') {
  chk('序章 亂點勝率', g(R.prologue, 'random', 'win'), 0.75, null);
  chk('序章 讀盤勝率', g(R.prologue, 'mostLikely', 'win'), 0.97, null);
  chk('序章 讀盤平均手數', g(R.prologue, 'mostLikely', 'hands'), 3.5, 5.5, 'num');
  chk('序章 變臉發生（讀盤）', g(R.prologue, 'mostLikely', 'face'), 0.95, null);
  chk('序章 變臉後至少一次晃（讀盤）', g(R.prologue, 'mostLikely', 'feintAfterFace'), 0.75, null);
}
if (MODE === 'all' || MODE === 'fights') {
  let under70 = 0, haveCB = POLS.includes('counterBubble') || POLS.includes('highest');
  for (const k of C.normals) {
    chk(`一般 ${k} 讀盤勝率`, g(R.fights, k, 'mostLikely', 'win'), 0.75, 0.99);
    chk(`一般 ${k} 讀盤平均手數`, g(R.fights, k, 'mostLikely', 'hands'), 4.5, 7.0, 'num');
    chk(`一般 ${k} 期望值勝率`, g(R.fights, k, 'ev', 'win'), 0.95, null);
    chk(`一般 ${k} 亂點勝率`, g(R.fights, k, 'random', 'win'), 0.25, 0.85);
    const cb = g(R.fights, k, 'counterBubble', 'win'), hi = g(R.fights, k, 'highest', 'win');
    if ((cb != null && cb < 0.70) || (hi != null && hi < 0.70)) under70++;
  }
  if (haveCB) chk('至少兩位一般客人對剋氣場或最高星 <70%（位數）', under70, 2, null, 'num'); else checks.push({ name: '至少兩位一般客人對剋氣場或最高星 <70%', status: 'SKIP', text: 'n/a' });
  for (const k of C.elites) {
    chk(`菁英 ${k} 讀盤勝率`, g(R.fights, k, 'mostLikely', 'win'), 0.90, null);
    chk(`菁英 ${k} 讀盤平均手數`, g(R.fights, k, 'mostLikely', 'hands'), 5.5, 7.5, 'num');
    chk(`菁英 ${k} 期望值每場七星回擊`, g(R.fights, k, 'ev', 'reflect'), 0.6, null, 'num');
  }
  const B = C.boss || 'boss';
  chk('Boss 讀盤勝率', g(R.fights, B, 'mostLikely', 'win'), 0.60, 0.88);
  chk('Boss 讀盤平均手數', g(R.fights, B, 'mostLikely', 'hands'), null, 9.5, 'num');
  chk('Boss 期望值勝率', g(R.fights, B, 'ev', 'win'), 0.70, 0.92);
  chk('Boss 知道真招勝率', g(R.fights, B, 'oracle', 'win'), 0.98, null);
}
if (MODE === 'all' || MODE === 'night') {
  chk('整晚 亂點通關', g(R.night, 'random', 'clear'), null, 0.05);
  chk('整晚 最高星通關', g(R.night, 'highest', 'clear'), null, 0.15);
  chk('整晚 剋氣場通關', g(R.night, 'counterBubble', 'clear'), null, 0.15);
  chk('整晚 舊公式通關', g(R.night, 'oldFormula', 'clear'), null, 0.35);
  chk('整晚 讀盤通關', g(R.night, 'mostLikely', 'clear'), 0.45, 0.72);
  const ml = g(R.night, 'mostLikely', 'clear'), ev = g(R.night, 'ev', 'clear');
  chk('整晚 期望值 − 讀盤（百分點）', ml != null && ev != null ? ev - ml : undefined, 0.10, null);
  chk('整晚 知道真招通關', g(R.night, 'oracle', 'clear'), 0.95, null);
  chk('整晚 期望值一晚 ≥1 次七星回擊', g(R.night, 'ev', 'reflect1'), 0.75, null);
}
console.log('\nThresholds (SPEC §8.2)');
for (const c of checks) console.log(`  [${c.status}] ${c.name}: ${c.text}`);
const nFail = checks.filter(c => c.status === 'FAIL').length, nPass = checks.filter(c => c.status === 'PASS').length;
console.log(`\n${nPass} pass, ${nFail} fail, ${checks.length - nPass - nFail} skipped   (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
R.checks = checks;
if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(R, null, 1));
if (nFail) process.exitCode = 1;
