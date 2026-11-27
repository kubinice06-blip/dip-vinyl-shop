// game-lab/test/sides-golden.mjs — 第 E 波番外盤「旗標關＝逐字不變」的黃金比對（SPEC-E §6.2；engine.test #39 用）
//   sideGolden(EN, C) -> 一串 JSON 字串：同一份輸入（固定種子、固定位數）跑 newRun（含 restock／一檔貨／特價箱）、lootRow（多種子、多位數、含金邊）、
//   chestRow、drawLot、bagScore、shopPolicy、thinPolicy、lineupPolicy，再照 runPolicy／cPolicy／shopPolicy＋會讀的出牌腦整趟打到第 22 位（戰利品列、攤位、市集、
//   上場制、每一場對決的 log 全進去）。E-1 施工時拿改版前的 engine.js（main 7f855cf77）跑出這串的 fnv1a32，寫死在 engine.test；
//   之後 C.sides.on false（或 run 沒有 sides）時，新引擎跑出來要一模一樣＝LE5「lootRow 原始碼雜湊」原本要守的意義（不准碰主線戰利品列）改由這裡守。
export function sideGolden(EN, C) {
  const out = [];
  const J = x => JSON.stringify(x);
  const lcg = s => { s = s >>> 0; return () => (s = (Math.imul(s, 1103515245) + 12345) >>> 0) / 4294967296; };
  // 1) newRun（第 1 輪 restock：箱子、特價箱、一檔貨）×3 派×4 種子
  for (const ace of EN.TIERS) for (let i = 0; i < 4; i++) out.push(J(EN.newRun(C, { seedKey: 'sg' + i, runNo: 2 + i, ace, prologue: false })));
  // 2) lootRow／chestRow：多個位數、有沒有金邊加成
  for (let i = 0; i < 12; i++) for (const pos of [3, 6, 13, 20, 33]) {
    const run = EN.newRun(C, { seedKey: 'sl' + i, runNo: 1 + i, ace: EN.TIERS[i % 3], prologue: false });
    run.pos = pos; run.round = EN.roundOf(pos); if (i % 2) run.goldAdd = 0.35;
    const id = C.normals[i % C.normals.length], g = EN.guestDef(run, C, id, pos);
    const deck = g.deck.map(c => c.id).concat(g.ace ? [g.ace.id] : []), met = deck.slice(0, 2);
    const duel = { e: { deckIds: deck } };
    out.push(J(EN.lootRow(run, C, duel, met, pos, 'normal', 1000)), J(EN.chestRow(run, C, duel, met, pos, i % 4 === 3)), J(run.road), J(run.stats.c));
    run.round = 2; out.push(J(EN.drawLot(run, C)));
    out.push(J([EN.bagScore(C, run.bag.concat(deck.slice(0, 3)), run), EN.bagScore(C, run.bag), EN.bagGain(run, C, deck[0])]));
  }
  // 3) 整趟：會讀的＋smart（特價箱挑三張、獎勵、攤位／市集、櫃檯買與瘦身、上場）打到第 22 位
  for (let i = 0; i < 3; i++) {
    const ace = EN.TIERS[i], run = EN.newRun(C, { seedKey: 'sd' + i, runNo: 3 + i, ace, prologue: false }), R = lcg(EN.fnv1a32('sd' + i)), mem = {};
    for (let g = 0; g < 3000; g++) {
      if (run.over && !run.pending) break;
      if (EN.canBargainPick(run) && !run.duel && !run.pending) { const ch = EN.bargainPolicy(run, C); out.push(J(ch)); EN.choose(run, C, ch); continue; }
      const st = EN.nextStep(run);
      if (st === 'reward' || st === 'retry' || st === 'level' || (run.pending && run.pending.type === 'stall')) { const ch = EN.runPolicy(run, C); out.push(J(ch)); if (!ch || !EN.choose(run, C, ch).ok) break; continue; }
      if (!run.pending) { const ch = EN.runPolicy(run, C); if (ch && ch.type === 'lineup') { out.push(J(ch), J(EN.lineupPolicy(run, C))); EN.choose(run, C, ch); continue; } }
      if (!st || run.pos > 22) break;
      if (EN.canShop(run)) { const sp = EN.shopPolicy(run, C, 'smart'); out.push(J(sp), J(EN.thinPolicy(run, C))); for (const ch of sp) EN.choose(run, C, ch); }
      const f = EN.startFight(run, C, {});
      let k = 0; while (!f.duel.over && k++ < 40) EN.resolveTurn(f.duel, EN.policies.thoughtful(f.duel, R, mem, C));
      out.push(J(f.duel.log), J(f.duel.stats), J(EN.view(f.duel)));
      out.push(J(EN.finishFight(run, C)));
    }
    out.push(J(run));
  }
  return out.join('\n');
}
