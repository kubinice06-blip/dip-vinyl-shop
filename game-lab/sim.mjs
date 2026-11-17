// game-lab/sim.mjs — v5 無限試煉 balance simulation + thresholds（SPEC 無限試煉 §4 第三棒）。Runs on the REAL engine.js / content.js / cards.js / bins.js.
//   每一趟照 run API 跑到輸（newRun → 特價箱挑三張 → 序章男子 → 第 1 位 → … 最多 --cap 位）；規則、曲線、升級、商店、獎勵一行都不在這裡重寫，
//   選擇全用引擎自己的 bargainPolicy／runPolicy（獎勵、升級＝harness MIX、說情）／shopPolicy('smart')。
// Usage: node game-lab/sim.mjs [--n 2000] [--mode all|runs|man] [--flows smart,none,bare] [--gate smart] [--cap 300] [--json out.json]
//                              [--lot off] [--browse 16] [--seeds k:rarity] [--want N]
//                              [--policies thoughtful,novice,random,high,formula,mirrorHint,oracle] [--tier k]
//                              [--set mercy=false] [--patch '{"trial":{"curve":{"atk":{"add":1}}}}'] [--data <dir with cards.js and bins.js>]
//                              [--apex [--apex-ace <頂點卡 id>] [--apex-params '{"<能力 id>":{"n":3}}']] [--ace hall|pearl|heresy]
//   --apex   頂點卡純輔助卡試做（＝遊戲網址 ?apex=1；scratchpad v5/apextrial）：startFight 傳 {apex:true}（序章照舊 7 星）；王牌＝各派預設那張（C.aces），
//            策略自己決定什麼時候發動（engine policies 的頂點卡分支）。--apex-ace＝每一趟都帶這張（流派跟著它；用來量單張能力，跟沒給時的三派輪流不是同一批客人組成）
//            --apex-params＝試調參數（只在這次模擬裡蓋掉 C.apexTrial 那幾張的 params；{"<id>":{"hold":{…}}} 蓋留著的小效果；@檔名＝從 JSON 檔讀；不改 content.js）
//              兩個原語合一（combo）：{"ops":[…]} 整組換；{"mirrorPlus":{"n":2}} 只改那個原語；平的 {"n":2} 蓋到組裡有 n 的每個原語（都沒有＝報錯）
//            旗標下多印一張「頂點卡發動」表（發動率、第幾手、發動那手的勝負、作用幾手）；不開 --apex 時輸出跟以前一字不差
//   --ace    每一趟都用這一派（沒給＝三派輪流 TIERS[i % 3]）；不開 --apex 也能用＝現行 7 星王牌的分派基準（跟 --apex-ace 同一批客人組成）
//   --unlock 流派與頂點卡靠遊戲解鎖（店主 11-16；scratchpad v5/unlock）：每一趟都當新玩家（只解鎖這一趟的派；--apex 時擁有的頂點卡只有那派預設那張，
//            --apex-ace 給的那張也算擁有），藏家照被剋鏈帶卡（engine bossCardFor）。多印一張「頂點卡收集」表；不開時輸出跟以前一字不差（模擬照舊三派都能用、藏家照 run.bossAce）
//   包包不限張數（店主 11-16；engine CFG.bagMax＝Infinity）：獎勵照 runPolicy（收這張 bagScore 漲才拿，見 engine 檔頭）、買照 shopPolicy（要漲才買、不用賣）＋瘦身（thinPolicy：
//            賣掉每一軸都排不進包包前 5 名的牌）；收音機那張也要漲才買。--no-thin＝不瘦身（只靠「不拿」控制牌組大小）。
//            --set bagMax=8＝舊規則對照（choose／策略走舊路、收音機包包滿賣最弱的；JSON 跟改版前逐字相同）。不限時 JSON 的 end 多 bagN（最後幾張）、bagMaxN（最多幾張）、sold（賣掉幾張）
//   第 A 波（店主 11-16）：賣牌只走櫃檯（engine choose sell；收獎勵、買唱片不能順手丟／賣）＝shopPolicy 的 thinPolicy；老闆送的、種子也會交還（$0）。
//            客人主屬性（engine roundMains／mainAt）：收音機挑格照 guestDef（換牌、加星後、照主屬性組的牌）。多印一張「客人出牌三色、放水、交還老闆」表（JSON 每格多 eplay）
//   第 B 波（SPEC-B §3.8、§5.4、§7）：架上唱片＝一檔貨（engine drawLot／shelve；C.lot.on，預設開）。開著時多印一張「一檔貨」表（smart 流程：每輪看到幾張不同的、
//            每位架上幾張、架上剋下一位主屬性那軸 ≥4 星幾張〔中位／最小／0 張的比例〕、每趟從架上買幾張、架上稀有度），JSON 的 smart 格多 lot、report 多 lot（C.lot）
//   --lot off  ＝--patch '{"lot":{"on":false}}'（今天的每輪補貨＋新卡池；對照組、緊急關閉）。關著時不印一檔貨表、JSON 不多欄位＝跟一檔貨之前的 sim 逐字相同
//   --browse k 一檔貨每位換貨，真人要每位都打開抽屜：smart 每位客人前只「打開」k 箱（FEATURE＋其他箱裡 hash01(seedKey#runNo#pos#browse#箱) 最小的 k−1 箱）；
//              shopPolicy 只看得到那幾箱、買的動作照常做在真的 run 上。預設 16＝全看（＝舊定義，輸出不變）；k=4＝一檔貨效益的下緣（SPEC-B §7.3 D25）
//   --seeds k:rarity  每一趟開局帶 k 張種子（CFG.seedMax 以內）＝稀有度 rarity 的非頂點、非特價、非王牌卡裡 peak 最高、同分 hash01('seeds#'+趟+'#'+id) 最小的 k 張
//              （主站帶卡／今日推薦獎勵的上限；只量、不是門檻）。種子只在不打序章的那一趟有效（engine 裁定 2）→ 這個旗標下每一趟都不打序章；
//              對照組＝--seeds 0:<rarity>（同樣不打序章、沒有種子）
//   --want N   每一趟的想要清單（run.want）＝有箱子的非頂點卡裡 hash01('want#'+趟+'#'+id) 最小的 N 張（固定、跟策略無關）；多印「想要清單」表
//              （第 1 檔／第 2 檔起分開：每檔進來幾張、每張每檔進來的機率〔÷N、÷那一檔來源裡合規的〕、每趟架上看到幾次、每趟從架上買到幾張）
//   --data     換完 C.cards／C.bins 後叫 C.deriveAll(C)（箱子的 all）；箱子沒有 all → 第 2 檔起退回策展池，結尾印警告（engine lotWarn）
//   --n      趟數／格（序章男子 S5 也是 N 場）　--cap 一趟最多打到第幾位（打完還沒輸＝censored，深度記成 cap）
//   --flows  smart＝真的玩法：獎勵照 runPolicy（挑唱片／配件）、每位客人前照 shopPolicy('smart') 買；
//            ＋收音機（v5 第六項第二期）：每輪第一次能買東西時轉一次（radioSmart：挑抽卡池裡「剋下一位主屬性那軸」平均星最高的那格），買得起就買（照原價；
//            包包滿就賣掉能賣的最弱那張，但電台那張要比它強）；none＝同上但不買、不轉；
//            bare＝最像 ../curve V3 模擬（curvesim.cjs）：不打序章、包包＝老闆四張＋特價箱三張＋男子那張、整趟不換（不拿獎勵、不買、沒有配件）；
//            cards／relics＝none 但只拿唱片／只拿配件（拆解用，要自己點）。每個流程都有升級（runPolicy）與每輪一次說情
//   --gate   門檻看哪個流程（預設 smart＝真的玩法）　--set 改 engine CFG　--patch deep-merge 進 content（例：C.trial.curve 旋鈕）　--tier C.trial.tiers 第 k 階
// 新帳號＝不帶配件進來（relics []、等級 1）；新手＝novice（永遠剋提示）、會讀的＝thoughtful、亂出＝random。同一個 i 不管策略／流程都是同一批客人（common random numbers）。
// 名詞（照 ../curve/results.md）：深度＝這一趟輸在第幾位（打完 cap 位還沒輸記 cap）；到第 N 位＝深度 ≥ N；不說情＝同一趟在第一次輸的地方切斷；
//   單位死亡率＝到了這一位的趟裡有幾成在這一位結束；首戰＝這一位的第一場（說情重打不算）；懸崖＝相鄰兩個非藏家位（都 ≥200 趟到過）首戰勝率掉最多的地方。
//
// 門檻（SPEC §4 第三棒；全部看 --gate 流程。2026-11-12 先跑一次 --n 2000 再定數字。任一條沒過 process.exitCode = 1）：
//   T1 新手 第 1–3 位死亡 8–15%（2026-11-16 店主「前期太簡單了，沒有挑戰性」；原本 ≤5%＝刻意的暖身，V3 2%、smart 1.5%）：
//      C.trial.curve 第 1–4 位加難（第 1 位就會唬人）後 smart n=2000 9.8%；第 A 波合併（客人第 1 位起照主屬性組牌、easy 也吃放水唬人）掉到 6.8%，
//      q.easy 0.8→0.75 拉回：smart n=1000／2000／4000＝10.4／8.6／9.4%（scratchpad v5/wave-a/merge/FIX.md）。下限 8% 擋退回送分（q.easy 0.9 只有 4.1%、0.85 也只 5.0%）；
//      上限 15% 擋把只會照提示剋的新手卡死在前三位（掃描裡有一組 18.7%）。scratchpad v5/early/PICK.md
//   T1b 會讀的 第 1–3 位死亡 ≤3%（11-16 新增：加的難度要「讀得出唬人就過得去」，不是全面變難；選定組 1.0%）
//   T2 照規劃書 #s3 的目標（主線 11-12 裁定：SPEC 原本照 V3 bare 寫的 8–20 不含獎勵與商店，改回店主的目標）：
//      T2a 一般玩家（新手）深度中位數 10–30；T2b 讀得準的高手（會讀的）有機會破 100 位：到第 100 位 10–70%
//   T3 會讀的 藏家位死亡率是非藏家位的 2–4 倍：第 4–60 位、到過 ≥200 趟的位置合併算（第 1–3 位是前期、另有 T1／T1b 看，不算進來；V3 13–20% 對 5–7%）
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
const APEX = argv.includes('--apex');
const NO_THIN = argv.includes('--no-thin');
const APEX_ACE = arg('apex-ace', null);
if (APEX_ACE && !(C.cards[APEX_ACE] && EN.apexList(C, C.cards[APEX_ACE].tier).some(x => x.card === APEX_ACE))) { console.error('--apex-ace 要是 C.apexTrial 名單裡的頂點卡 id'); process.exit(2); }
if (APEX_ACE && !APEX) { console.error('--apex-ace 要跟 --apex 一起用'); process.exit(2); }
const ACE_T = arg('ace', null);
if (ACE_T && !TIERS.includes(ACE_T)) { console.error('--ace ' + TIERS.join('|')); process.exit(2); }
if (ACE_T && APEX_ACE && C.cards[APEX_ACE].tier !== ACE_T) { console.error('--ace 跟 --apex-ace 那張的派不同'); process.exit(2); }
const UNLOCK = argv.includes('--unlock');
const APEX_PARAMS = arg('apex-params', null) ? JSON.parse(arg('apex-params').startsWith('@') ? fs.readFileSync(arg('apex-params').slice(1), 'utf8') : arg('apex-params')) : null;   // @檔名＝從檔案讀
if (APEX_PARAMS && !APEX) { console.error('--apex-params 要跟 --apex 一起用'); process.exit(2); }
if (APEX_PARAMS) for (const id of Object.keys(APEX_PARAMS)) {
  const e = TIERS.flatMap(t => EN.apexList(C, t)).find(x => x.id === id);
  if (!e) { console.error('--apex-params：沒有能力 ' + id); process.exit(2); }
  const o = APEX_PARAMS[id];
  if (o.hold) { if (!e.hold) { console.error('--apex-params：' + id + ' 不是留著型'); process.exit(2); } e.hold = Object.assign({}, e.hold, { params: Object.assign({}, e.hold.params, o.hold) }); }
  const pp = Object.assign({}, o); delete pp.hold;
  if (e.op === 'combo' && Object.keys(pp).length) {                     // 兩個原語合一：{"ops":[…]}＝整組換掉；平的鍵（{"n":2}）＝蓋到組裡有這個參數的原語（沒有任何原語有它＝報錯，不默默不改）
    const ops = Array.isArray(pp.ops) ? pp.ops.map(x => ({ op: x.op, params: Object.assign({}, x.params) })) : (e.params.ops || []).map(x => ({ op: x.op, params: Object.assign({}, x.params) }));
    for (const [k, v] of Object.entries(pp)) {
      if (k === 'ops') continue;
      const byOp = ops.filter(x => x.op === k);                           // {"mirrorPlus":{"n":2}}＝只改組裡那個原語
      if (byOp.length && v && typeof v === 'object') { for (const x of byOp) Object.assign(x.params, v); continue; }
      const hit = ops.filter(x => k in (x.params || {}));
      if (!hit.length) { console.error('--apex-params：' + id + ' 是 combo（' + ops.map(x => x.op).join('＋') + '），沒有參數 ' + k + '；整組換用 {"ops":[…]}'); process.exit(2); }
      for (const x of hit) x.params[k] = v;
    }
    e.params = { ops };
  } else if (Object.keys(pp).length) e.params = Object.assign({}, e.params, pp);
}
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
  C.deriveAll(C);                                                         // 箱子的 all（第 2 檔起的來源）照換過的卡重推；推不出來＝engine 退回 pool＋lotWarn（結尾印警告）
  console.log('--data ' + dir + '：卡 ' + Object.keys(C.cards).length + ' 張、箱子 ' + Object.keys(C.bins).join(' '));
}
const deepMerge = (t, s) => { for (const k in s) { if (s[k] && typeof s[k] === 'object' && !Array.isArray(s[k]) && t[k] && typeof t[k] === 'object') deepMerge(t[k], s[k]); else t[k] = s[k]; } return t; };
// 第 B 波旗標（見檔頭）：--lot off＝--patch '{"lot":{"on":false}}'（先套，--patch 可以再蓋）
const LOT_ARG = arg('lot', null);
if (LOT_ARG != null && !['on', 'off'].includes(LOT_ARG)) { console.error('--lot on|off'); process.exit(2); }
if (LOT_ARG) deepMerge(C, { lot: { on: LOT_ARG === 'on' } });
if (arg('patch', null)) deepMerge(C, JSON.parse(arg('patch')));
const LOT_ON = !!EN.lotCfg(C).on;
const BROWSE = +arg('browse', 16);
if (!(Number.isInteger(BROWSE) && BROWSE >= 1)) { console.error('--browse k（1–16 的整數；16＝全看）'); process.exit(2); }
const SEEDS_ARG = arg('seeds', null);
let SEEDS = null;
if (SEEDS_ARG != null) {
  const m = /^(\d+):([a-z]+)$/.exec(SEEDS_ARG);
  if (!m || !EN.RARITY.includes(m[2]) || m[2] === 'apex' || +m[1] > CFG.seedMax) { console.error('--seeds k:rarity（k 0–' + CFG.seedMax + '、rarity ' + EN.RARITY.filter(r => r !== 'apex').join('|') + '）'); process.exit(2); }
  SEEDS = { k: +m[1], rarity: m[2] };
}
const WANT_N = +arg('want', 0);
if (!(Number.isInteger(WANT_N) && WANT_N >= 0)) { console.error('--want N（非負整數）'); process.exit(2); }

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
  duel._mN = 0; duel._mOn = 0;
  while (!duel.over) {
    if (++g > 20) throw new Error('runaway duel');
    if (duel.e.mercyP != null && duel.plan) { duel._mN++; if (duel.plan.mercy) duel._mOn++; }   // 第 11 位起：這手有沒有放水（plan.mercy；只記不讀）
    const act = fn(duel, R, mem, C);
    if (!EN.isLegal(duel, act)) throw new Error('illegal act from ' + pol + ': ' + JSON.stringify(act));
    const ev = EN.resolveTurn(duel, act);
    if (act.apex) {                                                     // 頂點卡試做：記發動那手（只有 --apex 會走到）
      const a = ev.find(e => e.t === 'apex'), c = ev.find(e => e.t === 'clash');
      duel._apexHand = { n: c.n, toE: c.toE, toP: c.toP, kind: c.kind, heal: (a && a.heal) | 0, reveal: a ? a.reveal || null : null, d: c.apex ? c.apex.d : 0, hit: !!(c.apex && c.apex.hit) };
    }
  }
  return duel;
}
const bagPower = run => run.bag.reduce((s, id) => s + EN.power(C.cards[id]), 0) / Math.max(1, run.bag.length);
// 收音機（smart 流程）：每輪一次。轉哪格＝抽卡池裡「剋下一位主屬性（換牌、加星後的牌單＋他帶的王牌）那軸」平均星最高的那格（抽到哪張不偷看；壓力測試：比隨便轉更強）；
//   轉到就看買不買得起（engine.bargainPriceIn＝原價）：包包有空位、錢夠就買；包包滿＝賣掉能賣的最弱那張（不是送的、不是種子）換，電台那張要比它強、錢加賣回的要夠
//   包包不限（預設）：不會滿；收進包包 bagScore 要漲（engine.bagGain > 0.005）才買，不然不買（牌組變大會稀釋）
function radioSmart(run, R) {
  if (!EN.canRadio || !EN.canRadio(run)) return;
  const id = run.order[run.idx], E = C.enemies[id]; if (!E) return;
  const g = EN.guestDef(run, C, id, run.pos);                         // 換牌、加星、照主屬性組的那副（＝startFight 會打到的）
  const deck = g.deck.slice(); if (g.ace) deck.push(g.ace);
  const T = EN.COUNTER_OF[EN.deckMain(deck, E.taste)];
  let best = null, bv = -1;
  for (const cell of C.tunes.order) {
    const pool = EN.radioPool(run, C, cell); if (!pool.length) continue;
    const v = pool.reduce((s, x) => s + EN.star(C.cards[x], T), 0) / pool.length;
    if (v > bv) { bv = v; best = cell; }
  }
  if (!best) return;
  ok(EN.choose(run, C, { type: 'radio', cell: best }), 'radio', best); R.spins++;
  const rid = run.shop.radio.id, price = EN.bargainPriceIn(run, C, rid), ch = { type: 'buyBargain', ids: [rid] };
  if (EN.bagFull(run)) {                                             // 有上限而且滿了才賣（bagMax null／0／負數＝不限，跟 Infinity 一樣）
    const weak = run.bag.filter(x => !EN.isGift(run, C, x) && !EN.isSeed(run, C, x)).sort((a, b) => EN.power(C.cards[a]) - EN.power(C.cards[b]))[0];
    if (weak == null || EN.power(C.cards[weak]) >= EN.power(C.cards[rid])) return;
    ch.sellIds = [weak];
  } else if (!EN.bagLimited() && EN.bagGain(run, C, rid) <= 0.005) return;
  const earn = (ch.sellIds || []).reduce((s, x) => s + EN.sellValue(C, C.cards[x]), 0);
  if (run.money + earn < price) return;
  ok(EN.choose(run, C, ch), 'radio buy', ch); R.bought++; R.spent += price;
}

// ---------------- 第 B 波：--want／--seeds／--browse 的輸入（每一趟固定、跟策略與流程無關＝同一批客人） ----------------
// --want N：有箱子的非頂點卡裡 hash01('want#'+趟+'#'+id) 最小的 N 張（照雜湊由小到大＝清單順序；engine 每檔自己重洗擲的順序）
const WANT_SRC = WANT_N ? Object.keys(C.cards).filter(id => { const c = C.cards[id]; return c && c.bin && C.bins[c.bin] && !c.tier; }) : [];
const WANT_MEMO = new Map();
function wantFor(i) {
  if (WANT_MEMO.has(i)) return WANT_MEMO.get(i);
  const w = WANT_SRC.map(id => ({ id, h: EN.hash01('want#' + i + '#' + id) })).sort((a, b) => a.h - b.h || (a.id < b.id ? -1 : 1)).slice(0, WANT_N).map(x => x.id);
  WANT_MEMO.set(i, w); return w;
}
// --seeds k:rarity：稀有度＝rarity 的非頂點、非特價（新舊）、非王牌卡裡 peak 最高、同分 hash01('seeds#'+趟+'#'+id) 最小的 k 張（engine canSeed 也要過）
const SEED_SRC = SEEDS ? (() => {
  const bg = new Set([].concat((C.bargain || {}).pool || [], (C.bargain || {}).retired || [])), aces = new Set(Object.values(C.aces || {}));
  return Object.keys(C.cards).filter(id => { const c = C.cards[id]; return c && !c.tier && !bg.has(id) && !aces.has(id) && EN.rarity(c) === SEEDS.rarity && EN.canSeed(C, id); })
    .map(id => ({ id, p: EN.peak(C.cards[id]) }));
})() : [];
const SEED_MEMO = new Map();
function seedsFor(i) {
  if (!SEEDS || !SEEDS.k) return [];
  if (SEED_MEMO.has(i)) return SEED_MEMO.get(i);
  const s = SEED_SRC.map(x => ({ id: x.id, p: x.p, h: EN.hash01('seeds#' + i + '#' + x.id) })).sort((a, b) => b.p - a.p || a.h - b.h || (a.id < b.id ? -1 : 1)).slice(0, SEEDS.k).map(x => x.id);
  SEED_MEMO.set(i, s); return s;
}
// --browse k：這一位只「打開」FEATURE＋其他箱裡 hash01(seedKey#runNo#pos#browse#箱) 最小的 k−1 箱。回 run 的淺複本（shop 也淺複製、bins 只留那幾箱、照原本箱子順序）；
//   shopPolicy 自己會 clone，不改真的 run。打開的箱 ≥ 全部＝回原 run（k=16 不走這裡＝輸出跟沒有這個旗標逐字相同）
function browseKeys(run) {
  const keys = Object.keys(run.shop.bins), rest = keys.filter(k => k !== 'feature');
  const open = new Set(rest.map(k => ({ k, h: EN.hash01(run.seedKey + '#' + run.runNo + '#' + run.pos + '#browse#' + k) })).sort((a, b) => a.h - b.h || (a.k < b.k ? -1 : 1)).slice(0, Math.max(0, BROWSE - 1)).map(x => x.k));
  if (keys.includes('feature')) open.add('feature');
  return keys.filter(k => open.has(k));
}
function browseView(run) {
  const keys = browseKeys(run);
  if (keys.length >= Object.keys(run.shop.bins).length) return run;
  const bins = {}; for (const k of keys) bins[k] = run.shop.bins[k];
  return Object.assign({}, run, { shop: Object.assign({}, run.shop, { bins }) });
}
// 一檔貨表（smart 流程）：這一位架上的統計。T＝剋下一位主屬性那軸（＝shopPolicy 的算法：換牌、加星後的牌單＋他帶的王牌、deckMain）
const SHELF_RAR = ['common', 'rare', 'uncommon', 'epic', 'legendary'];
function shelfAxis(run) {
  const id = run.order[run.idx], E = C.enemies[id]; if (!E) return null;
  const g = EN.guestDef(run, C, id, run.pos);
  const deck = g.deck.slice(); if (g.ace) deck.push(g.ace);
  return EN.COUNTER_OF[EN.deckMain(deck, E.taste)];
}
// 想要清單：這一檔這張想要的卡合不合規（在這一檔的來源、稀有度對、不是特價、不在包包、不是王牌）＝engine drawLot 擲得到的
const SRC_SET = new WeakMap();
const srcSet = arr => { let s = SRC_SET.get(arr); if (!s) { s = new Set(arr); SRC_SET.set(arr, s); } return s; };
const BARGAIN_ALL = new Set([].concat((C.bargain || {}).pool || [], (C.bargain || {}).retired || []));
function wantEligible(run, lot, id) {
  const c = C.cards[id]; if (!c || !c.bin || c.tier) return false;
  const b = C.bins[c.bin]; if (!b || b.display) return false;
  const arr = lot.src === 'cur' || (lot.fb || []).includes(c.bin) ? (b.pool || []) : (b.all || []);
  if (!srcSet(arr).has(id)) return false;
  if (!(c.bin === 'feature' ? EN.FEATURE_RARITY : EN.SHELF_RARITY).includes(EN.rarity(c))) return false;
  if (BARGAIN_ALL.has(id) || run.bag.includes(id) || id === (C.aces || {})[run.ace] || id === run.aceId) return false;
  return true;
}

// ---------------- one whole run through the real run API ----------------
//   A＝這一格的每一位累計（到過、死、場次、勝、首戰、手數、打到第 6 手、比聲望條、KO）
function runOnce(pol, flow, i, A) {
  const seedKey = 'sim5-' + i;
  const o0 = Object.assign({ seedKey, runNo: 1, ace: ACE_T || TIERS[i % 3], prologue: flow !== 'bare', tier: TIER }, APEX_ACE ? { ace: C.cards[APEX_ACE].tier, aceId: APEX_ACE } : {});
  if (UNLOCK) Object.assign(o0, { unlocked: [], start: o0.ace }, APEX ? { apexOwned: APEX_ACE ? [APEX_ACE] : [] } : {});   // --unlock：新玩家（只解鎖這一派）
  if (WANT_N) o0.want = wantFor(i);
  if (SEEDS) { o0.prologue = false; o0.seeds = seedsFor(i); }           // 種子只在不打序章的那一趟有效
  const run = EN.newRun(C, o0);
  const LS = A.lt || null, WS = A.wt || null, wantSet = WS ? new Set(run.want) : null;
  let lotRef = null, lotRec = null, shelfPos = 0;
  const closeLot = () => { if (LS && lotRec) { LS.rounds.push({ no: lotRec.no, seen: lotRec.seen.size, seenF: lotRec.seenF.size, guests: lotRec.guests }); } lotRec = null; };
  const R = EN.makeRng(EN.fnv1a32(seedKey + '|' + pol + '|' + flow)), mem = {};
  let manTries = 0, lostMan = false, cens = false, lastReached = 0, retryAt = 0, firstLoss = null, fatal = null, bag0 = null, maxHands = 0, bagMaxN = 0;
  const RADIO = { spins: 0, bought: 0, spent: 0 };
  const EP = A.ep;                                                      // 客人出牌三色、提示三色、出主屬性那色的手、放水、交還老闆（第 A 波）
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
    if ((LS || WS) && step === 'fight' && run.shop && run.shop.lot) {     // 一檔貨表／想要清單表（smart、lot 開）：每一位第一次走到時記架子（說情重打不重記）
      const lot = run.shop.lot;
      if (lot !== lotRef) {                                             // 新的一檔（newRun、每輪開頭 restock）
        closeLot(); lotRef = lot;
        lotRec = { no: lot.no, seen: new Set(), seenF: new Set(), guests: 0 };
        if (WS) {
          const first = lot.no === 1, k = first ? 'l1' : 'l2', got = new Set(lot.want || []);
          WS[k].lots++; WS[k].in += got.size;
          for (const id of run.want) { if (wantEligible(run, lot, id)) { WS[k].elig++; if (got.has(id)) WS[k].inElig++; } }
        }
      }
      if (shelfPos !== run.pos) {
        shelfPos = run.pos; lotRec.guests++;
        const bins = run.shop.bins, T = LS ? shelfAxis(run) : null, open = LS && BROWSE < 16 ? new Set(browseKeys(run)) : null;
        let n = 0, good = 0, goodOpen = 0, wn = 0;
        for (const key of Object.keys(bins)) for (const id of bins[key]) {
          n++; lotRec.seen.add(id); if (key === 'feature') lotRec.seenF.add(id);
          if (wantSet && wantSet.has(id)) wn++;
          if (!LS) continue;
          const c = C.cards[id], r = EN.rarity(c);
          if (r in LS.rar) LS.rar[r]++;
          if (T && EN.star(c, T) >= 4) { good++; if (open && open.has(key)) goodOpen++; }
        }
        if (LS) { LS.shelf.push(n); LS.good.push(good); if (lot.no === 1) LS.good1.push(good); if (open) LS.goodOpen.push(goodOpen);
          if (run.pos === 10 || run.pos === 20) LS['bag' + run.pos].push(EN.bagScore(C, run.bag)); }   // 包包強度（bagScore；走到第 10／20 位、買之前）
        if (WS) WS.onShelf += wn;
      }
    }
    if (flow === 'smart' && EN.canShop(run)) for (const ch of EN.shopPolicy(BROWSE < 16 ? browseView(run) : run, C, 'smart', NO_THIN ? { thin: false } : undefined)) {
      const r = EN.choose(run, C, ch); ok(r, 'shopPolicy', ch);
      for (const e of r.effects) if (e.reclaim) EP.reclaim[e.reclaim]++;
      if (ch.type === 'buy') { if (LS) { LS.buy++; if (ch.key === 'feature') LS.buyF++; } if (WS && wantSet.has(ch.cardId)) WS.bought++; }
    }
    if (flow === 'smart' && EN.canShop(run)) radioSmart(run, RADIO);
    if (run.money < 0) throw new Error('money < 0');
    const prologue = step === 'prologue', d = run.pos, att = retryAt === d ? 1 : 0;
    if (!prologue && bag0 == null) bag0 = bagPower(run);
    if (run.bag.length > bagMaxN) bagMaxN = run.bag.length;
    if (!prologue && lastReached < d) { A.reached[d]++; lastReached = d; }
    const f = EN.startFight(run, C, APEX ? { apex: true } : {});
    if (!f) throw new Error('startFight null at ' + d);
    const duel = play(f.duel, pol, R, mem), hands = duel.stats.hands, by = duel.over.by;
    if (!prologue) {
      const mn = duel.e.main;
      for (const l of duel.log) { EP.play[l.eAttr]++; EP.hint[l.hint]++; EP.hands++; if (mn) { EP.mHands++; if (l.eAttr === mn) EP.mPlay++; if (l.hint === mn) EP.mHint++; } }
      EP.mercyN += duel._mN | 0; EP.mercyOn += duel._mOn | 0;
    }
    const res = EN.finishFight(run, C);
    if (prologue) { manTries++; continue; }
    maxHands = Math.max(maxHands, hands);
    A.att[d]++; A.hands[d] += hands; if (hands >= CFG.maxRounds) A.r6[d]++;
    if (by === 'rounds') A.bar[d]++; else if (by === 'hp') A.ko[d]++;
    if (res.win) A.win[d]++;
    if (att === 0) { A.att1[d]++; if (res.win) A.win1[d]++; }
    if (A.ax) {                                                         // 頂點卡發動統計（--apex）
      const X = A.ax, h = duel._apexHand, hits = duel.stats.apexHits | 0;
      X.fights++; X.hits += hits;
      if (h) {
        X.used++; X.nSum += h.n; X.nHist[Math.min(6, h.n)]++; X.dSum += h.d; X.healSum += h.heal; if (h.hit) X.hitHand++;
        if (h.toE > h.toP) X.hw++; else if (h.toE < h.toP) X.hl++; else X.ht++;
        X.netSum += h.toE - h.toP; if (h.reveal) X.rev[h.reveal]++;
        X.fUsed++; if (res.win) X.wUsed++;
      } else { X.fUnused++; if (res.win) X.wUnused++; }
    }
    if (!res.win) {
      if (firstLoss == null) firstLoss = d;
      if (run.pending && run.pending.type === 'retry') retryAt = d;
      else { A.deaths[d]++; fatal = { by, cls: res.cls, hands }; }
    }
  }
  closeLot();
  if (LS) LS.runs++;
  if (WS) WS.runs++;
  const end = lostMan ? 0 : cens ? CAP : run.pos;
  if (firstLoss == null) firstLoss = cens ? CAP + 1 : end;
  const S = run.stats, sum = EN.runSummary(run);
  return { end, cens, lostMan, firstLoss, fatal, maxHands, level: run.level, atk: run.atk, def: run.def, maxHp: run.maxHp, relics: run.relics.length,
    taken: sum.taken, rewardCards: S.taken.length, bought: S.bought.length, relicsBought: S.relicsBought.length, relicsGot: S.relicsGot.length,
    earned: S.earned, spent: S.spent, money: run.money, checkpoints: sum.checkpoints.length, bestStreak: sum.bestStreak,
    bag0: bag0 == null ? bagPower(run) : bag0, bag1: bagPower(run), radioSpins: RADIO.spins, radioBought: RADIO.bought, radioSpent: RADIO.spent,
    bagN: run.bag.length, bagMaxN: Math.max(bagMaxN, run.bag.length), sold: S.sold.length,
    ...(UNLOCK ? { aces: (run.acesWon || []).length, unlocks: (run.acesWon || []).filter(id => !(run.unlock.tiers || []).includes(EN.tierOfApex(C, id))).length,
    trialAces: (run.acesWon || []).filter(id => !Object.values(C.aces).includes(id)).length } : {}) };
}

// ---------------- one cell (policy × flow) ----------------
const q = (arr, p) => { const a = arr.slice().sort((x, y) => x - y); return a[Math.min(a.length - 1, Math.max(0, Math.ceil(p * a.length) - 1))]; };
const BANDS = [[1, 3], [4, 5], [6, 10], [11, 20], [21, 50], [51, 100], [101, 1e9]];
const HBANDS = [[1, 3], [4, 6], [8, 12], [18, 22], [48, 52]];
const REACH = [5, 10, 20, 50, 100];
function runCell(pol, flow, n) {
  const NP = CAP + 2, z = () => new Float64Array(NP);
  const A = { reached: z(), deaths: z(), att: z(), win: z(), att1: z(), win1: z(), hands: z(), r6: z(), bar: z(), ko: z(),
    ep: { play: { c: 0, o: 0, h: 0 }, hint: { c: 0, o: 0, h: 0 }, hands: 0, mHands: 0, mPlay: 0, mHint: 0, mercyN: 0, mercyOn: 0, reclaim: { gift: 0, seed: 0 } } };
  if (APEX) A.ax = { fights: 0, used: 0, nSum: 0, nHist: [0, 0, 0, 0, 0, 0, 0], dSum: 0, healSum: 0, hitHand: 0, hw: 0, hl: 0, ht: 0, netSum: 0, rev: { honest: 0, bluff: 0 },
    hits: 0, fUsed: 0, wUsed: 0, fUnused: 0, wUnused: 0 };
  if (LOT_ON && flow === 'smart') {                                      // 一檔貨表（第 B 波；lot 關＝不記、JSON 不多欄位）
    A.lt = { runs: 0, rounds: [], shelf: [], good: [], good1: [], goodOpen: [], bag10: [], bag20: [], buy: 0, buyF: 0, rar: Object.fromEntries(SHELF_RAR.map(r => [r, 0])) };
    if (WANT_N) A.wt = { runs: 0, l1: { lots: 0, in: 0, elig: 0, inElig: 0 }, l2: { lots: 0, in: 0, elig: 0, inElig: 0 }, onShelf: 0, bought: 0 };
  }
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
  // T3：第 4–60 位、到過 ≥200 趟的位置，藏家位合併死亡率 ÷ 非藏家位合併死亡率（第 1–3 位是前期，看 T1／T1b，不算進來）
  let hb = 0, hbn = 0, hn = 0, hnn = 0;
  for (const p of pos) { if (p.d < 4 || p.reached < 200) continue; if (p.cls === 'boss') { hb += A.deaths[p.d]; hbn += p.reached; } else { hn += A.deaths[p.d]; hnn += p.reached; } }
  const hazBoss = hbn ? hb / hbn : null, hazNon = hnn ? hn / hnn : null;
  const handsBand = HBANDS.map(([a, b]) => { const at = sum('att', a, b); return at >= 100 ? sum('hands', a, b) / at : null; });
  const X = A.ax, apexStats = X ? { fights: X.fights, used: X.used, useRate: X.fights ? X.used / X.fights : null, perRun: X.used / n, n: X.used ? X.nSum / X.used : null,
    nHist: X.nHist.slice(1), handWin: X.used ? X.hw / X.used : null, handLose: X.used ? X.hl / X.used : null, handTie: X.used ? X.ht / X.used : null,
    net: X.used ? X.netSum / X.used : null, d: X.used ? X.dSum / X.used : null, heal: X.used ? X.healSum / X.used : null, hitHand: X.used ? X.hitHand / X.used : null,
    hitsPerFight: X.fights ? X.hits / X.fights : null, rev: X.rev, winUsed: X.fUsed ? X.wUsed / X.fUsed : null, winUnused: X.fUnused ? X.wUnused / X.fUnused : null } : null;
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
      checkpoints: avg('checkpoints'), bestStreak: avg('bestStreak'), bag0: avg('bag0'), bag1: avg('bag1'),
      radioSpins: avg('radioSpins'), radioBought: avg('radioBought'), radioSpent: avg('radioSpent'),
      ...(EN.bagLimited() ? {} : { bagN: avg('bagN'), bagMaxN: avg('bagMaxN'), bagMaxMax: Math.max(...recs.map(r => r.bagMaxN)), sold: avg('sold') }) },   // 包包不限才有（--set bagMax=8 時 JSON 跟改版前一樣）
    pos: pos.map(p => ({ d: p.d, cls: p.cls, reached: p.reached, win1: r3(p.win1), hazard: r3(p.hazard), hands: r3(p.hands) })),
    ...(apexStats ? { apex: apexStats } : {}),
    ...(A.lt ? { lot: lotStats(A.lt, n) } : {}),
    ...(A.wt ? { want: wantStats(A.wt, n) } : {}),
    ...(UNLOCK ? { unlock: { aces: avg('aces'), unlocks: avg('unlocks'), trialAces: avg('trialAces'),          // --unlock：每趟收幾張、解鎖幾派、收到第 k 張的趟（%）
      atLeast: [1, 2, 3, 4].map(k => share(recs, r => r.aces >= k)), unlock2: share(recs, r => r.unlocks >= 1), unlock3: share(recs, r => r.unlocks >= 2) } } : {}),
    eplay: { play: shareOf(A.ep.play), hint: shareOf(A.ep.hint), hands: A.ep.hands, mainPlay: A.ep.mHands ? A.ep.mPlay / A.ep.mHands : null, mainHint: A.ep.mHands ? A.ep.mHint / A.ep.mHands : null,
      mercyOn: A.ep.mercyN ? A.ep.mercyOn / A.ep.mercyN : null, mercyHands: A.ep.mercyN, reclaim: { gift: A.ep.reclaim.gift / n, seed: A.ep.reclaim.seed / n } },
  };
}
const shareOf = o => { const t = o.c + o.o + o.h; return t ? { c: o.c / t, o: o.o / t, h: o.h / t } : null; };
// 一檔貨表的數字：完整一輪（5 位都走到）看到幾張不同的（全部／FEATURE；第 1 輪、第 2 輪起分開）、每位架上幾張、剋下一位主屬性那軸 ≥4 星幾張（中位／最小／0 張的比例；
//   全部、第 1 輪、--browse 時打開的那幾箱）、每趟從架上買幾張（唱片／其中 FEATURE）、架上稀有度（每格）
function lotStats(L, n) {
  const mean = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : null;
  const dist = a => a.length ? { median: q(a, 0.5), min: a.reduce((m, x) => Math.min(m, x), Infinity), zero: a.filter(x => x === 0).length / a.length, mean: mean(a), n: a.length } : null;
  const full = L.rounds.filter(r => r.guests === 5), f1 = full.filter(r => r.no === 1), f2 = full.filter(r => r.no > 1);
  const rt = SHELF_RAR.reduce((s, r) => s + L.rar[r], 0);
  return { rounds: L.rounds.length, fullRounds: full.length, seen: mean(full.map(r => r.seen)), seen1: mean(f1.map(r => r.seen)), seen2: mean(f2.map(r => r.seen)),
    seenF: mean(full.map(r => r.seenF)), seenF1: mean(f1.map(r => r.seenF)), seenF2: mean(f2.map(r => r.seenF)),
    shelf: mean(L.shelf), good: dist(L.good), good1: dist(L.good1), ...(L.goodOpen.length ? { goodOpen: dist(L.goodOpen) } : {}),
    bag10: mean(L.bag10), bag20: mean(L.bag20), buy: L.buy / n, buyF: L.buyF / n, rar: Object.fromEntries(SHELF_RAR.map(r => [r, rt ? L.rar[r] / rt : null])) };
}
// 想要清單表：第 1 檔（策展池）／第 2 檔起（全卡池）分開；每檔進來幾張、每張每檔進來機率（÷N＝清單全部；÷合規＝那一檔來源裡擲得到的）
function wantStats(W, n) {
  const one = x => ({ lots: x.lots, perLot: x.lots ? x.in / x.lots : null, perCard: x.lots ? x.in / (x.lots * WANT_N) : null, eligPerLot: x.lots ? x.elig / x.lots : null, perElig: x.elig ? x.inElig / x.elig : null });
  return { N: WANT_N, l1: one(W.l1), l2: one(W.l2), onShelf: W.onShelf / n, bought: W.bought / n };
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
if (APEX) report.apex = APEX_ACE || 'default';                           // 不開 --apex 時 JSON 跟以前逐字相同（不多 "apex": null）
if (ACE_T) report.ace = ACE_T;
if (UNLOCK) report.unlock = true;                                          // 不開 --unlock 時 JSON 跟以前逐字相同
if (APEX_PARAMS) report.apexParams = APEX_PARAMS;
if (LOT_ON) report.lot = EN.lotCfg(C);                                   // 第 B 波：一檔貨開著才多這些鍵（--lot off 時 JSON 跟一檔貨之前逐字相同）
if (BROWSE < 16) report.browse = BROWSE;
if (SEEDS) report.seeds = Object.assign({}, SEEDS, { example: seedsFor(0) });
if (WANT_N) report.want = WANT_N;
if (SEEDS) console.log('\n開局種子（--seeds ' + SEEDS.k + ':' + SEEDS.rarity + '）：每一趟都不打序章（種子只在不打序章的那一趟有效）' + (SEEDS.k ? '；種子＝' + (C.rarityZh || {})[SEEDS.rarity] + '裡 peak 最高的 ' + SEEDS.k + ' 張（同分照趟雜湊），例：第 0 趟 ' + seedsFor(0).map(id => C.cards[id].album).join('、') : '；沒有種子（對照組）'));
if (WANT_N) console.log('\n想要清單（--want ' + WANT_N + '）：每一趟 ' + WANT_N + ' 張（有箱子的非頂點卡、照趟雜湊取；跟策略無關）');
if (ACE_T) console.log('\n每一趟都用' + (C.aceTitle && C.aceTitle[ACE_T] || ACE_T) + '（--ace ' + ACE_T + '）');
if (APEX_PARAMS) console.log('\n試調參數（--apex-params，不改 content.js）：' + JSON.stringify(APEX_PARAMS));
if (UNLOCK) console.log('\n解鎖制（--unlock）：每一趟都是新玩家，只解鎖這一趟的派' + (APEX ? '；擁有的頂點卡只有那派預設那張' : ''));
if (APEX) console.log('\n頂點卡純輔助卡試做（--apex）：王牌 ' + (APEX_ACE ? C.cards[APEX_ACE].album + '（' + EN.abilityOf(C, APEX_ACE).name + '）' : '各派預設那張') + '；打贏回 ' + ((C.apexTrial && C.apexTrial.winHeal) || EN.trialCfg(C, TIER).heal));
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
  if (BROWSE < 16) console.log(`smart 每位客人前只打開 ${BROWSE} 箱（--browse ${BROWSE}：FEATURE＋其他箱照雜湊挑 ${BROWSE - 1} 箱；門檻照 16 箱定義，這組是一檔貨效益的下緣）\n`);
  console.log('| 策略 | 流程 | 深度 中位／平均 | p25–p75 | 不說情 中位／平均 | 到第 5／10／20／50／100 位（%） | 第 1–3 位死 | 一場幾手 | 打到第 6 手 | 死在比聲望條 | 藏家÷非藏家 死亡率（第 4–60 位） | 懸崖（非藏家首戰勝率最大跌幅） | 最高單位死亡率（非藏家） |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|');
  for (const x of rows) console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | **${x.median}**／${x.mean.toFixed(1)}${x.censored ? `（${pct(x.censored)} 打完 ${CAP} 位）` : ''} | ${x.p25}–${x.p75} | ${x.noRetry.median}／${x.noRetry.mean.toFixed(1)} | ${reachStr(x)} | ${pct(x.die13)} | ${f2(x.hands)} | ${pct(x.r6)} | ${pct(x.deaths.byBar)} | ${pct(x.hazBoss)}÷${pct(x.hazNon)}＝${x.bossRatio == null ? '—' : x.bossRatio.toFixed(2) + ' 倍'} | ${x.cliff.at ? `第 ${x.cliff.from}→${x.cliff.at} 位 ${p0(x.cliff.w0)}→${p0(x.cliff.w1)}（${pt(x.cliff.drop)} 點）` : '—'} | ${x.hzMax.at ? `第 ${x.hzMax.at} 位 ${pct(x.hzMax.h)}` : '—'} |`);

  console.log(`\n平均手數分段、死在哪（死掉的趟裡）：\n`);
  console.log('| 策略 | 流程 | 手數 1–3｜4–6｜8–12｜18–22｜48–52 位 | 死在哪 1–3／4–5／6–10／11–20／21–50／51–100／>100（%） | 死在藏家位 | 輸的那場 KO／比聲望條 | 客人場勝率 |');
  console.log('|---|---|---|---|---|---|---|');
  for (const x of rows) console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${x.handsBand.map(f2).join('｜')} | ${x.deathBands.map(p0).join('／')} | ${pct(x.deaths.atBoss)} | ${pct(x.deaths.byKO)}／${pct(x.deaths.byBar)} | ${pct(x.win)} |`);

  console.log(`\n走到最後時（每趟平均）：成長、包包、錢\n`);
  console.log('| 策略 | 流程 | 等級 | 品味／底氣／聲望上限 | 配件（拿到／買） | 收了 N 張（獎勵唱片／買的） | 包包平均總星 開局→最後 | 賺／花 | 中繼點 | 最多連贏 | 收音機 轉／買（花） |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|');
  for (const x of rows) { const e = x.end;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${e.level.toFixed(1)} | ${e.atk.toFixed(1)}／${e.def.toFixed(1)}／${e.maxHp.toFixed(1)} | ${e.relics.toFixed(2)}（${e.relicsGot.toFixed(2)}／${e.relicsBought.toFixed(2)}） | ${e.taken.toFixed(1)}（${e.rewardCards.toFixed(1)}／${e.bought.toFixed(1)}） | ${e.bag0.toFixed(1)}→${e.bag1.toFixed(1)} | $${Math.round(e.earned).toLocaleString('en')}／$${Math.round(e.spent).toLocaleString('en')} | ${e.checkpoints.toFixed(2)} | ${e.bestStreak.toFixed(1)} | ${e.radioSpins.toFixed(1)}／${e.radioBought.toFixed(1)}（$${Math.round(e.radioSpent).toLocaleString('en')}） |`); }
  if (!EN.bagLimited()) {                                            // 包包不限（店主 11-16）：包包長到幾張、賣掉幾張
    console.log(`\n包包不限張數${NO_THIN ? '（--no-thin：不瘦身）' : '（買完照 thinPolicy 瘦身）'}：每趟平均\n`);
    console.log('| 策略 | 流程 | 最後幾張 | 最多幾張（平均／全部最大） | 賣掉幾張 |');
    console.log('|---|---|---|---|---|');
    for (const x of rows) { const e = x.end; console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${e.bagN.toFixed(1)} | ${e.bagMaxN.toFixed(1)}／${e.bagMaxMax} | ${e.sold.toFixed(2)} |`); }
  }

  console.log(`\n客人出牌（第 A 波：主屬性、放水照位數機率、櫃檯交還；客人場、每手）：\n`);
  console.log('| 策略 | 流程 | 他出 經／冷／硬（%） | 他提示 經／冷／硬（%） | 出主屬性那色／提示主屬性那色 | 第 11 位起這手放水 | 每趟交還老闆 送的／種子 |');
  console.log('|---|---|---|---|---|---|---|');
  for (const x of rows) { const e = x.eplay, s3 = o => o ? [o.c, o.o, o.h].map(p0).join('／') : '—';
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${s3(e.play)} | ${s3(e.hint)} | ${pct(e.mainPlay)}／${pct(e.mainHint)} | ${pct(e.mercyOn)}（${e.mercyHands} 手） | ${e.reclaim.gift.toFixed(2)}／${e.reclaim.seed.toFixed(2)} |`); }

  const PCOLS = 16;
  console.log(`\n每一位：首戰勝率／單位死亡率（%；到過的趟 <200 打括號）\n`);
  console.log('| 策略・流程 | ' + Array.from({ length: PCOLS }, (_, k) => { const d = k + 1, c = EN.classAt(d); return c === 'boss' ? `**${d}藏**` : c === 'elite' ? d + '菁' : String(d); }).join(' | ') + ' |');
  console.log('|---|' + Array.from({ length: PCOLS }, () => '---').join('|') + '|');
  const posRow = x => Array.from({ length: PCOLS }, (_, k) => { const p = x.pos.find(o => o.d === k + 1); if (!p) return '—'; const s = `${p0(p.win1)}／${p0(p.hazard)}`; return p.reached < 200 ? `(${s})` : s; }).join(' | ');
  for (const pol of ['novice', 'thoughtful']) {
    if (V3[pol]) console.log(`| V3・${LABEL[pol]} | ${V3[pol].pos.split(' ').concat(Array(PCOLS).fill('—')).slice(0, PCOLS).join(' | ').replace(/\//g, '／')} |`);
    for (const flow of flows) if (cellOf(flow, pol)) console.log(`| ${LABEL[pol]}・${flow} | ${posRow(cellOf(flow, pol))} |`);
  }

  if (APEX) {                                                            // 頂點卡發動（--apex；只算客人場，序章不開）
    console.log(`\n頂點卡發動（客人場；發動那手的勝負＝那手扣他的 vs 他扣你的，回聲望不算在內）：\n`);
    console.log('| 策略 | 流程 | 發動率（每場） | 平均第幾手 | 第 1／2／3／4／5／6 手（%） | 那手 贏／平／輸 | 那手淨賺（扣他−扣你） | 能力改了幾點 | 那手作用到 | 整場作用手數 | 回聲望 | 看穿 真／唬 | 場勝率 發動／沒發動 |');
    console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|');
    for (const x of rows) { const a = x.apex; if (!a) continue; const u = a.used || 1;
      console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${pct(a.useRate)} | ${f2(a.n)} | ${a.nHist.map(k => p0(k / u)).join('／')} | ${p0(a.handWin)}／${p0(a.handTie)}／${p0(a.handLose)} | ${f2(a.net)} | ${f2(a.d)} | ${pct(a.hitHand)} | ${f2(a.hitsPerFight)} | ${f2(a.heal)} | ${a.rev.honest}／${a.rev.bluff} | ${pct(a.winUsed)}／${pct(a.winUnused)} |`); }
  }

  if (rows.some(x => x.lot)) {                                           // 一檔貨（第 B 波；lot 關不印）
    const L0 = EN.lotCfg(C), dz = d => d ? `${d.median}／${d.min}／${pct(d.zero)}` : '—', f1 = x => x == null ? '—' : x.toFixed(1);
    console.log(`\n一檔貨（每輪抽一檔 ${L0.size} 張、FEATURE ${L0.feature}；每位架上每箱 ${L0.show}、FEATURE ${L0.featureShow}${L0.firstShow ? '、第 1 輪每箱 ' + L0.firstShow : ''}；第 1 檔${L0.firstCurated ? '從策展池' : '從全卡池'}；smart、每位第一次走到時的架子）：\n`);
    console.log('| 策略 | 流程 | 完整一輪看到幾張不同的 全部（第 1 輪／第 2 輪起） | 其中 FEATURE（第 1 輪／第 2 輪起） | 每位架上幾張 | 剋下一位主屬性那軸 ≥4 星 中位／最小／0 張 | 第 1 輪 | ' + (BROWSE < 16 ? `打開的 ${BROWSE} 箱裡 | ` : '') + '每趟從架上買 唱片／其中 FEATURE | 包包強度 第 10／20 位 | 架上稀有度 普通／稀有／獨特／史詩／傳奇（%） |');
    console.log('|---|---|---|---|---|---|---|' + (BROWSE < 16 ? '---|' : '') + '---|---|---|');
    for (const x of rows) { const l = x.lot; if (!l) continue;
      console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${f1(l.seen)}（${f1(l.seen1)}／${f1(l.seen2)}） | ${f1(l.seenF)}（${f1(l.seenF1)}／${f1(l.seenF2)}） | ${f1(l.shelf)} | ${dz(l.good)} | ${dz(l.good1)} | ${BROWSE < 16 ? dz(l.goodOpen) + ' | ' : ''}${f2(l.buy)}／${f2(l.buyF)} | ${f2(l.bag10)}／${f2(l.bag20)} | ${SHELF_RAR.map(r => pt(l.rar[r])).join('／')} |`); }
  }
  if (rows.some(x => x.want)) {                                          // 想要清單（--want N）
    console.log(`\n想要清單（--want ${WANT_N}；每檔每張擲 ${EN.lotCfg(C).wantP}、一檔最多 ${EN.lotCfg(C).wantMax} 張；第 1 檔來源是策展池、第 2 檔起全卡池）：\n`);
    console.log('| 策略 | 流程 | 第 1 檔：檔數／每檔進來幾張／每張每檔（÷N）／合規幾張／每張每檔（÷合規） | 第 2 檔起：檔數／每檔進來幾張／每張每檔（÷N）／合規幾張／每張每檔（÷合規） | 每趟架上看到幾次 | 每趟從架上買到幾張 |');
    console.log('|---|---|---|---|---|---|');
    const w1 = o => `${o.lots}／${f2(o.perLot)}／${pct(o.perCard)}／${f2(o.eligPerLot)}／${pct(o.perElig)}`;
    for (const x of rows) { const w = x.want; if (!w) continue;
      console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${w1(w.l1)} | ${w1(w.l2)} | ${f2(w.onShelf)} | ${f2(w.bought)} |`); }
  }

  if (UNLOCK) {                                                          // 頂點卡收集（--unlock：每趟新玩家，只解鎖這一派）
    console.log(`\n頂點卡收集（--unlock：每一趟都是新玩家、只解鎖這一派；打倒藏家收他帶的那張：被剋鏈${APEX ? '→ 三派都開後收試做卡' : ''}）：\n`);
    console.log('| 策略 | 流程 | 每趟收幾張 | 收到 ≥1／≥2／≥3／≥4 張（%） | 解鎖第 2 派／第 3 派（%） | 其中試做卡 |');
    console.log('|---|---|---|---|---|---|');
    for (const x of rows) { const u = x.unlock; if (!u) continue;
      console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${f2(u.aces)} | ${u.atLeast.map(p0).join('／')} | ${p0(u.unlock2)}／${p0(u.unlock3)} | ${f2(u.trialAces)} |`); }
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
  if (NV) check('T1', `${tag}新手 第 1–3 位死亡 8–15%（前期要有挑戰，見檔頭）`, NV.die13 >= 0.08 - 1e-9 && NV.die13 <= 0.15 + 1e-9, `${pct(NV.die13)}（V3 2%；11-16 前期加難前 smart 1.5%）`);
  if (TH) check('T1b', `${tag}會讀的 第 1–3 位死亡 ≤3%`, TH.die13 <= 0.03 + 1e-9, `${pct(TH.die13)}（V3 0%）`);
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

{ const lw = Object.keys(EN.lotWarn || {}); if (lw.length) { report.lotWarn = lw; console.log('\n警告：箱子 ' + lw.join('、') + ' 沒有 all，第 2 檔起退回策展池（--data 的卡沒有 bin？見 C.deriveAll）'); } }
console.log('\n### 門檻（SPEC 無限試煉 §4 第三棒；數字見檔頭）');
for (const c of checks) console.log((c.ok ? '  ok   ' : '  FAIL ') + c.id + ' ' + c.name + (c.info !== undefined ? '：' + c.info : ''));
const failed = checks.filter(c => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} 通過（${((Date.now() - t0) / 1000).toFixed(1)} 秒）`);
report.checks = checks;
if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 1));
if (failed.length) process.exitCode = 1;
