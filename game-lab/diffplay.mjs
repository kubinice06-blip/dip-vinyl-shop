// game-lab/diffplay.mjs — 第 D 波棒二：打法真的不同（SPEC-D §7.3、§8.1 F7；原型 scratchpad v5/wave-d/proto/d-lab2/diffplay.mjs）。Runs on the REAL engine.js / content.js。
//   同一個對決局面（同一手牌、同一個提示、同一個亂數種子），把 duel.p.fac／fx 換成三派各算一次策略（只開被動＝本派選項不算），看三派出的牌一不一樣。
//   局面怎麼來：每一趟照 smart 流程（newRun fac:true、不打序章、三派輪流 TIERS[i % 3]；獎勵／攤位／選秀＝cPolicy、升級＝runPolicy、每位前 shopPolicy('smart')），
//   實際出牌照那一趟自己的派（含拿到的本派選項；--nofacpick＝整趟只有被動）。
// Usage: node game-lab/diffplay.mjs [--n 300] [--pols thoughtful,humanRead] [--cap 120] [--nofacpick] [--facfx '{"heresy":{"critPre":2}}'] [--json out.json]
//   --facfx：跟 sim.mjs 同一個（Object.assign 疊進那派的被動 fx；調數字時三派打法差異跟著重量、或跟原型第一版數字對照）
// 印：三派出的不全一樣的手占幾成（門檻 F7 ≥25%）、兩兩不同、依位數段（第 1–4／5–10／11–30／31 位起）。「出的牌」＝色＋是不是丟王牌（A 前綴）
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const EN = require(path.join(HERE, 'engine.js'));
const C = require(path.join(HERE, 'content.js'));
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 && argv[i + 1] != null ? argv[i + 1] : d; };
const N = +arg('n', 300), CAP = +arg('cap', 120), POLS = arg('pols', arg('pol', 'thoughtful,humanRead')).split(',').filter(Boolean), JSON_OUT = arg('json', null);
const NOFACPICK = argv.includes('--nofacpick');
const TIERS = EN.TIERS;
if (!EN.facCfg(C)) { console.error('content 沒有 C.factions（或 on:false）'); process.exit(2); }
for (const p of POLS) if (!EN.policies[p]) { console.error('unknown policy ' + p); process.exit(2); }
if (!(Number.isInteger(N) && N > 0 && CAP >= 5)) { console.error('--n 正整數、--cap ≥5'); process.exit(2); }
if (NOFACPICK) C.factions.levelEvery = 0;
const FACFX = arg('facfx', null) ? JSON.parse(arg('facfx')) : null;
if (FACFX) for (const t of Object.keys(FACFX)) {
  if (!TIERS.includes(t) || !FACFX[t] || typeof FACFX[t] !== 'object') { console.error('--facfx 的鍵要是 ' + TIERS.join('|') + '，值是物件'); process.exit(2); }
  C.factions[t].fx = Object.assign({}, C.factions[t].fx, FACFX[t]);
}
const LABEL = { thoughtful: '會讀的', humanRead: '一般玩家', novice: '新手（剋提示）', oldReader: '舊腦袋', high: '只出最大星', mirrorHint: '跟提示同色', formula: '兩步公式', random: '亂出' };
const ok = (r, w) => { if (!r || !r.ok) throw new Error(w + ' ' + (r && r.error)); };
const FX0 = Object.fromEntries(TIERS.map(t => [t, EN.facFxOf(C, { fac: { picks: {} } }, t)]));   // 只開被動（picks 空）
const PAIRS = [['hall', 'pearl'], ['hall', 'heresy'], ['pearl', 'heresy']];
const SEGS = ['1–4', '5–10', '11–30', '31+'];
const segOf = d => d <= 4 ? '1–4' : d <= 10 ? '5–10' : d <= 30 ? '11–30' : '31+';
const t0 = Date.now();

function measure(pol) {
  const fn = EN.policies[pol];
  const S = { hands: 0, diff: 0, pair: Object.fromEntries(PAIRS.map(p => [p.join('|'), 0])), seg: Object.fromEntries(SEGS.map(k => [k, { n: 0, d: 0 }])), byTier: Object.fromEntries(TIERS.map(t => [t, { n: 0, d: 0 }])) };
  for (let i = 0; i < N; i++) {
    const ace = TIERS[i % 3];
    const run = EN.newRun(C, { seedKey: 'dp-' + i, runNo: 2, ace, prologue: false, fac: true });
    const R = EN.makeRng(EN.fnv1a32('dp' + i)), mem = {};                 // 原型同一個種子（策略之間也是同一批局面起點）
    for (let g = 0; g < 40 * CAP + 400 && !run.over && run.pos <= CAP; g++) {
      if (EN.canBargainPick(run) && !run.pending) { ok(EN.choose(run, C, EN.bargainPolicy(run, C)), 'bargainPick'); continue; }
      const step = EN.nextStep(run);
      if (step === 'stall' || step === 'draft' || step === 'reward') { ok(EN.choose(run, C, EN.cPolicy(run, C, {})), step); continue; }
      if (step === 'level' || step === 'retry') { ok(EN.choose(run, C, EN.runPolicy(run, C)), step); continue; }
      if (step !== 'fight') throw new Error('unexpected step ' + step);
      if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, C, 'smart')) ok(EN.choose(run, C, ch), 'shop');
      const st = EN.startFight(run, C, {}).duel;
      for (let h = 0; !st.over; h++) {
        if (h > 20) throw new Error('runaway duel');
        const seed = (Math.floor(R() * 4294967296) >>> 0) || 1, picks = {};
        for (const t of TIERS) {                                     // 同一局面、同一種子：換成這一派（只開被動）算一次
          const s2 = EN.clone(st);
          s2.p.fac = t; s2.p.fx = EN.clone(FX0[t]); s2.p.facN = Object.assign({}, st.p.facN || {}); s2.facNotes = C.factions.notes; s2.stats.fac = {};
          const a = fn(s2, EN.makeRng(seed), EN.clone(mem), C);
          picks[t] = (a.ace ? 'A' : '') + a.attr;
        }
        const sg = segOf(run.pos), bt = S.byTier[ace], dif = new Set(Object.values(picks)).size > 1;
        S.hands++; S.seg[sg].n++; bt.n++;
        if (dif) { S.diff++; S.seg[sg].d++; bt.d++; }
        for (const [a, b] of PAIRS) if (picks[a] !== picks[b]) S.pair[a + '|' + b]++;
        const act = fn(st, EN.makeRng(seed), mem, C);                 // 實際出牌：照這一趟自己的派
        if (!EN.isLegal(st, act)) throw new Error('illegal act ' + JSON.stringify(act));
        EN.resolveTurn(st, act);
      }
      EN.finishFight(run, C);
    }
  }
  return S;
}

const pc = (a, b) => b ? (100 * a / b).toFixed(1) + '%' : '—';
const out = { N, CAP, nofacpick: NOFACPICK, ...(FACFX ? { facfx: FACFX } : {}), pols: {} };
console.log(`### 打法差異（diffplay；n ${N} 趟／策略、最多打到第 ${CAP} 位、三派輪流、smart；同一局面三派各算一次，只開被動${NOFACPICK ? '；整趟本派選項不出' : '；實際出牌照那一趟的派（含本派選項）'}${FACFX ? '；--facfx ' + JSON.stringify(FACFX) : ''}）\n`);
console.log('| 策略 | 手數 | 三派出的不全一樣（F7 ≥25%） | 兩兩不同 經典｜冷門、經典｜異端、冷門｜異端 | 依位數 ' + SEGS.join('／') + ' | 依那一趟的派 經典／冷門／異端 |');
console.log('|---|---|---|---|---|---|');
for (const pol of POLS) {
  const S = measure(pol); out.pols[pol] = S;
  console.log(`| ${LABEL[pol] || pol} | ${S.hands} | **${pc(S.diff, S.hands)}** | ${PAIRS.map(p => pc(S.pair[p.join('|')], S.hands)).join('、')} | ${SEGS.map(k => pc(S.seg[k].d, S.seg[k].n) + '（' + S.seg[k].n + ' 手）').join('／')} | ${TIERS.map(t => pc(S.byTier[t].d, S.byTier[t].n)).join('／')} |`);
}
const gate = POLS.includes('thoughtful') ? out.pols.thoughtful : null;
if (gate) console.log(`\n${gate.diff / gate.hands >= 0.25 ? '  ok  ' : '  FAIL'} F7 打法真的不同：會讀的 同一局面三派出的不全一樣 ≥25%：${pc(gate.diff, gate.hands)}`);
console.log(`\n（${((Date.now() - t0) / 1000).toFixed(1)} 秒）`);
if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(out, null, 1));
if (gate && gate.diff / gate.hands < 0.25) process.exitCode = 1;
