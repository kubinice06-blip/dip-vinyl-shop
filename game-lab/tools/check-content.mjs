// check-content.mjs：content.js／cards.js／bins.js 結構自檢（品味對決 v4；SPEC-v4 §2.2、§4、§5.1）。改了客人、牌組、經濟、教學資料或重烘 cards.js 之後跑一次。
//
//   node game-lab/tools/check-content.mjs     # 有問題 exit 1
//
// 檢查：
//   卡片：欄位、星數（一般卡 ≤5、王牌那軸 7）、封面、試聽、region ∈ tw／jp／zh／xx；所有引用的卡 id 都存在（王牌、禮物、特價箱、牌單、掉牌、教學、箱子）。
//   王牌、禮物（§4.2：三軸都有 ≥4 星、殿堂有冷門 ≥4、王牌那軸 ≥4 至少 2 張）、特價箱（店主 11-16：12–15 張、每張最高星 ≤3 且三軸加起來 ≤5、
//   bargainLane（峰值那軸、並列取後面那軸）每色 ≥3 張且有一張 topAttr 純色、每輪擺 6 張每色 2、冷門 ≤3；retired 換下的照特價算價）。
//   客人（§2.2.3、§4.1）：名字（FIXLIST 6 的身分、沒有 title）、誠實度（男子老實、一般偶爾唬人、菁英愛唬人、藏家老江湖；只有 q）、聲望（男子 10、其他 12–40）、張數（男子 6、一般與菁英 7、藏家 6）；
//     牌組限制（deckMain、嚴格峰值 ≥4、唬人色 ≥4 星 ≥2 張、剋他用色 ≥4 星 ≥1 張；男子只要一張副屬性 ≥4；經典客人 ≤4 位不含藏家；
//     藏家三色各 ≥2 張峰值、每色都有 ≥4 星）；牌組／禮物／特價箱彼此不重複且不含王牌。
//   提示句（§2.2.4：每色 5 句、key 必為 text 的子字串、不寫屬性名）、誠實度表、出招難度表、經濟（FIXLIST 8 台幣行情：稀有度價、特價箱每張、配件 3000；start／win 的範圍）、
//   無限試煉 C.trial（SPEC 無限試煉 §0：一輪 5 位的類別＝engine、你 12＝CFG.playerHp、回 3、客人 12／藏家 14、經驗與升級、三選一的字跟數字一致、中繼點、曲線旋鈕齊全）、
//   發燒配件 9 件（§2.2.6）、規則卡六行逐字＝tools/owner-lines-v4.json、頁尾聲望數字（你 12、回 3、客人＝C.trial.guestHp）、教學規則資料（§2.2.10）、小提示、盤面字、店內字、經濟介面字、
//   無限試煉的畫面字（C.trial.ui／levelUp／notes、C.summary 結算）。
//   第 I 波 I-0（SPEC-I §7.2、§7.3）：trial.firstNeed／firstHp（＝engine TRIAL、xpNeed）、升級章與第一次升級的字；樂歷 career.curve.table（只增不減、Lv8 位置不變）、
//     lexp.firstLv、新畫面字（＝engine CAREER）。
//   頻率（v5 第六項第二期）：C.tunes 八格齊全（order／names／colors／label）、每張卡都有 tune 而且在八格內、10 位客人各一個 tune（八格內、每格最多 2 位）、C.radio 的字；
//     跟主站比（tuneWarnings，走鐘只警告、不擋）：C.tunes 的名字＝data/mood/card-moods.json names、顏色＝dip-tune.js CELL_COLOR、順序＝dip-tune.js ORDER；
//     每張卡的 tune＝現在的 card-moods.json 判的格（主站每批上架都會重建這份，遊戲是烘焙快照；不一樣就用 bake-cards.mjs --covers-only --no-verify 重烘）。
//   頂點卡純輔助卡試做（?apex=1；匯出 apexProblems(C, E)）：C.apexTrial 三派各 10–20 張（試做 15）、第 1 張＝C.aces、卡存在而且 tier 對、不重複；
//     每張 id 全表唯一、name ≤8、text ≤25、timing hand／duel／hold、op 在 engine APEX_OPS（combo＝2 個以上原語）、params 在範圍內、時機准用、hold 只有 timing hold 才有（而且是准當「留著」的原語）；
//     禁區字（不會被剋、必中、免疫、無視）；winHeal 整數；notes 每個用到的 op 都有一句（≤25 字）；C.apexTrialOnly＝名單扣 C.aces；
//     名單裡的新卡（C.apexTrialOnly）可以沒有試聽（主站沒有固定試聽＝「無來源」，烘成 previewUrl ''）。
//   活店（SPEC-H；匯出 crowdProblems(C, E)、crowdNotes(C)）：LD1 熟客名冊與 C.crowd／C.encounter／C.crowdUi、LD2 撞造型（帽子分族）、LD3 台詞 C.chat／C.ownerChat（形狀、防編造、句數）、
//     LD4 熟客牌組；LD5 劇本與 ACTORS 不再有 r1（scriptProblems）。
//   第 D 波棒二三流派（?fac=1；匯出 factionProblems(C, E)）：C.factions 三派 name／icon＝C.aceTitle／C.aceIcon、fx 鍵、picks 5 項（id 唯一、op 在 engine FAC_OPS、第 5 項 second）、
//     priority＝picks 的排列、notes 每個鍵都有 {n}、apexSwap（op 在 APEX_OPS、params 範圍、時機、卡在那派名單、留著型字樣、結果句）、畫面字齊全、factionsTag。
//   卡片 id（第 B 波 SPEC-B §1.1）：每張卡的鍵＝id＝catalogId(藝人, 專輯)；舊 id 對照表（匯出 legacyProblems(C)）：C.legacyIds()＋C.legacyExtra＝tools/legacy-ids.json。
//   卡池（第 B 波 SPEC-B §1.2–§1.5；匯出 poolProblems(C)）：C.cards＝核心 cards.js＋精選新卡 cards-pool.js 展開（C.poolLoaded、張數＝核心＋n）；
//     require('cards.js') 仍只有核心、C.cards 不是同一個物件；新卡都 pool: true、有 bin／tune、沒有 tier、不撞核心；
//     每箱 all（C.deriveAll）⊇ pool、各箱互斥；C.attachMedia 套了 cards-media.json（版本＝C.poolVersion、每張新卡有封面試聽）、冪等；C.lot 欄位齊全。
//   遊戲卡池索引（v5 第六項第一期；第 B 波 v2）：game-lab/pool-index.json＝整池 C.cards 非頂點、非傳奇卡（帶得進遊戲的；主線 M2）的 fnv1a32(catalogId) 排序陣列
//     （tools/build-pool-index.mjs 產生；0 撞號、每張 catalogId 主站卡池找得到）。
//   C.bins 的鍵＝bins.js；bins.js 是 X／Y 契約形狀（有 feature）時再跑 binsProblems（十六區、名牌、分類、FEATURE 稀有度、30 晚上貨夠不夠）。
//   v4 教學步驟（§2.5.5，B2；匯出 tutorialProblems(C)）：六手各一個「丟」、做的步驟只有「點那張（allow.pick＋'card:pick'）」或「點那個屬性＝丟（allow.pick＋throw＋point 'pick'）」（FIXLIST 11）、
//     每手的 pick 在 script 裡指得到（禮物的那張那色／blocked:o／ace）、結算時講的步驟（target result）只在丟之後、小卡 L1–L6 各學一次而且照課表順序、
//     第 1 手前一句指提示（e-hint）、第 1 手結算後點破第 1 手提示句的關鍵字一次、依王牌分句的 text 三張都有、三角邊合法、ui 鍵齊全。
//   v4 劇本（§2.5.3、§2.5.4，B2；匯出 scriptProblems(C, layout)）：序章 O1–O21、收尾 E1–E11 的 id 與順序；D §2 店主改的句子逐字；
//     步驟（do／人物／站位都在 shops/dip.json）；翻箱（pose dig）之前同一串步驟裡一定先走路；r1 退役、劇本不再提熟客（SPEC-H LD5）；O11 停音樂、O14 才入袋；
//     兩顆接受對決；E4 他走到門口才晃門、地上留一張盤、撿起面板；選完才走到唱盤（C.blocking.toDuel 三人終點）；v3 墊片都刪了；
//     無限試煉沒有打烊：script 的鍵是 prologue／epilogueWin／bossEnter／bossDown（每輪打倒藏家）／dead／again／drop（掉落旁白，店主 11-13），沒有 clear 與第二夜預告。
//
// 匯出 shapeProblems(C, E)：只看星數的形狀檢查（engine.test #14 也跑這一份；不檢查封面／試聽等烘焙欄位）。
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';
import { poolIndexProblems, catalogId } from './build-pool-index.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const ROOT = path.resolve(LAB, '..');
const require = createRequire(import.meta.url);
const TIERS = ['hall', 'pearl', 'heresy'];
const ATTRS = ['c', 'o', 'h'];
const ZH = { c: '經典', o: '冷門', h: '硬蕊' };
const sameSet = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
const ownerLines = () => { try { return JSON.parse(fs.readFileSync(path.join(HERE, 'owner-lines-v4.json'), 'utf8')); } catch (_) { return null; } };
const strictPeak = c => ATTRS.find(a => ATTRS.every(b => b === a || c[a] > c[b])) || null;

// ================================================================================================
// 形狀檢查（只要星數）：牌組、禮物、特價箱、提示、誠實度、難度、經濟、配件、規則卡、教學資料
// ================================================================================================
export function shapeProblems(C, E) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const CARDS = C.cards || {};
  const card = (id, where) => { const c = CARDS[id]; ok(!!c, where + ': 找不到卡 ' + id); return c || null; };
  const { BEATS, COUNTER_OF, deckMain, topAttr, peak } = E;

  // ---- 王牌、禮物、特價箱 ----
  for (const t of TIERS) {
    const a = card(C.aces[t], 'aces.' + t);
    ok(C.aceAxis && C.aceAxis[t] === E.TIER_AXIS[t], 'aceAxis.' + t + ' 要＝engine TIER_AXIS');
    if (a) ok(a.tier === t && a[E.TIER_AXIS[t]] === 7 && ATTRS.filter(x => x !== E.TIER_AXIS[t]).every(x => a[x] < 7), 'aces.' + t + ': tier／7 星軸不對');
    const g = (C.gifts && C.gifts[t]) || [];
    ok(g.length === 4 && new Set(g).size === 4, 'gifts.' + t + ' 要 4 張不重複');
    const cs = g.map(id => card(id, 'gifts.' + t)).filter(Boolean);
    if (cs.length === 4) {
      // 店主 11-13：經典那組要有名一點（有名的經典本來就不冷門、也不硬）→ 殿堂不套「三色都要 ≥4」與 D §5「至少一張冷門 ≥4」；
      //   改成：三色都至少 2 星（第 2 手冷剋經剋得動：他經典 3、你冷門 ≥2）、硬蕊至少 3 星（第 4 手硬剋冷：他冷門 4、你硬蕊 ≥3 才剋得動）
      if (t === 'hall') {
        for (const x of ATTRS) ok(cs.some(c => c[x] >= (x === 'h' ? 3 : 2)), 'gifts.hall：' + ZH[x] + '要有 ≥' + (x === 'h' ? 3 : 2) + ' 星的卡（教學第 2／4 手剋得動）');
      } else for (const x of ATTRS) ok(cs.some(c => c[x] >= 4), 'gifts.' + t + '：' + ZH[x] + '要有 ≥4 星的卡（§4.2）');
      ok(cs.filter(c => c[E.TIER_AXIS[t]] >= 4).length >= 2, 'gifts.' + t + '：王牌那軸 ≥4 的至少 2 張');
      cs.forEach(c => ok(!c.tier && peak(c) <= 5, 'gifts.' + t + ': ' + c.id + ' 是王牌／頂點卡'));
    }
  }
  // 特價箱（店主 11-16「三張特價，星星最高三，加起來不高於五」）：12–15 張，每張最高星 ≤3、三軸加起來 ≤5；
  //   「色」＝engine.bargainLane（峰值那軸、並列取後面那軸）：每色 ≥3 張、每色至少一張 topAttr 純色（重看教學 replayBag、對決試玩照 topAttr 找三色）；
  //   每輪擺 6 張＝每色 2 張（engine.restock，抽 60 個種子驗）；retired（換下的舊特價箱）卡要在、不在池子裡、照特價算價
  const BP = (C.bargain && C.bargain.pool) || [];
  ok(BP.length >= 12 && BP.length <= 15 && new Set(BP).size === BP.length, '特價箱要 12–15 張不重複，現在 ' + BP.length);
  const bcs = BP.map(id => card(id, 'bargain')).filter(Boolean);
  bcs.forEach(c => {
    ok(peak(c) <= 3, '特價箱 ' + c.id + ' 最高星要 ≤3（店主 11-16），現在 ' + peak(c));
    ok(c.c + c.o + c.h <= 5, '特價箱 ' + c.id + ' 三軸加起來要 ≤5（店主 11-16），現在 ' + (c.c + c.o + c.h));
    ok(c.o <= 3, '特價箱 ' + c.id + ' 冷門要 ≤3（教學第 5 手）'); ok(!c.tier, '特價箱 ' + c.id + ' 是王牌');
  });
  for (const a of ATTRS) {
    ok(bcs.filter(c => E.bargainLane(c) === a).length >= 3, '特價箱 ' + ZH[a] + '（bargainLane：峰值那軸、並列取後面那軸）要 ≥3 張');
    ok(bcs.some(c => topAttr(c) === a && E.topAxes(c).length === 1), '特價箱要有一張 topAttr 純' + ZH[a] + '（重看教學、對決試玩照 topAttr 挑三色）');
  }
  if (bcs.length === BP.length) for (let k = 0; k < 60; k++) {
    const r = E.newRun(C, { seedKey: 'cc-bargain-' + k, runNo: 1 + (k % 3), ace: TIERS[k % 3], prologue: k % 2 === 0 });
    const lanes = r.shop.bargain.map(id => E.bargainLane(CARDS[id]));
    const cover = ATTRS.every(a => lanes.filter(l => l === a).length === 2);
    if (!ok(r.shop.bargain.length === 6 && cover, '特價箱每輪擺 6 張、每色 ≥2（種子 cc-bargain-' + k + '）：' + r.shop.bargain.join(','))) break;
  }
  const RET = (C.bargain && C.bargain.retired) || [];
  for (const id of RET) {
    const c = card(id, 'bargain.retired');
    ok(!BP.includes(id), 'bargain.retired ' + id + ' 不能也在 pool');
    if (c) ok(E.priceOf(C, id) === (((C.economy || {}).bargain) || { 1: 100, 2: 200, 3: 300 })[Math.min(3, peak(c))], 'bargain.retired ' + id + ' 照特價算價（舊存檔賣回不套利）');
  }

  // ---- 誠實度（只有機率 q；FIXLIST 6：畫面不寫誠實度，沒有 zh）、難度 ----
  const HK = ['honest', 'sometimes', 'often', 'veteran'];
  ok(C.honesty && sameSet(Object.keys(C.honesty), HK), 'honesty 要剛好是 ' + HK.join(' '));
  for (const k of HK) { const h = (C.honesty || {})[k]; ok(h && h.q > 0 && h.q <= 1 && !('zh' in h), 'honesty.' + k + ': 只有 q（0–1），不寫 zh（FIXLIST 6）'); }
  ok(!('honestyTag' in C), 'honestyTag 要拿掉（FIXLIST 6）');
  if (C.honesty && C.honesty.honest) ok(C.honesty.honest.q === 1, 'honesty.honest.q 要 1');
  ok(C.planners && sameSet(Object.keys(C.planners), ['easy', 'normal', 'hard']), 'planners 要剛好是 easy normal hard');
  for (const [k, p] of Object.entries(C.planners || {})) ok(p && p.w > 0 && p.nz >= 0 && typeof p.mercy === 'boolean', 'planners.' + k + ': w／nz／mercy');
  ok(!('plannerByDepth' in C), 'plannerByDepth 拿掉了（無限試煉的出招難度照位數，C.trial.curve.planner）');
  shapeTrial(C, E, ok);

  // ---- 客人與牌組限制（§4 開頭） ----
  const EIDS = ['man', 'copycat', 'already', 'needle', 'skip', 'broke', 'buyer', 'label', 'critic', 'boss'];
  ok(JSON.stringify(Object.keys(C.enemies || {})) === JSON.stringify(EIDS), '客人 id 要是 ' + EIDS.join(' '));
  ok(JSON.stringify(C.normals) === JSON.stringify(['copycat', 'already', 'needle', 'skip', 'broke', 'buyer']), 'normals 6 位');
  ok(JSON.stringify(C.elites) === JSON.stringify(['label', 'critic']), 'elites 2 位');
  ok(C.boss === 'boss' && C.prologueEnemy === 'man', 'boss／prologueEnemy');
  const kindOf = e => e.prologue ? 'man' : e.boss ? 'boss' : e.elite ? 'elite' : 'normal';
  const WANT_H = { man: 'honest', normal: 'sometimes', elite: 'often', boss: 'veteran' };
  let classic = 0;
  const allDeck = [];
  // FIXLIST 6（店主 2026-11-08 06:03）：名字＝一看就知道是誰、偏好什麼的身分；原本的副標（title）併掉
  const NAME = { man: '男子', copycat: '文青同好', already: '社團學長', needle: '音響發燒友', skip: '二手店老闆', broke: '地下樂團吉他手',
    buyer: '前衛樂迷', label: '地下廠牌主理人', critic: '資深樂評', boss: '傳說藏家' };
  for (const id of EIDS) {
    const e = (C.enemies || {})[id]; const w = 'enemies.' + id;
    if (!e) continue;
    const kind = kindOf(e);
    ok(e.id === id && e.name === NAME[id], w + ': id／name 要是「' + NAME[id] + '」（FIXLIST 6），現在 ' + e.name);
    ok(!('title' in e) && !('sub' in e), w + ': 副標併進名字了，拿掉 title／sub（FIXLIST 6）');
    ok(e.honesty === WANT_H[kind], w + ': 誠實度要 ' + WANT_H[kind] + '，現在 ' + e.honesty);
    for (const k of ['habit', 'phase2', 'phase2Label', 'habitLabel', 'p', 'planner']) ok(!(k in e), w + ': v4 拿掉的欄位 ' + k);
    if (kind === 'man') ok(e.hp === 10, w + ': 男子聲望固定 10');
    // FIXLIST 3（比聲望條剩幾成）之後 12–20 太好打，sim 校準到 20–34；上限放到 40（校準旋鈕的範圍，不是門檻）
    else ok(Number.isInteger(e.hp) && e.hp >= 12 && e.hp <= 40, w + ': 聲望要在 12–40，現在 ' + e.hp);
    ok(/^[coh]{3}$/.test(e.taste) && new Set(e.taste).size === 3, w + ': taste');
    const want = kind === 'normal' || kind === 'elite' ? 7 : 6;
    ok(Array.isArray(e.deck) && e.deck.length === want && new Set(e.deck).size === want, w + ': 唱片要 ' + want + ' 張不重複，現在 ' + (e.deck || []).length);
    allDeck.push(...(e.deck || []));
    const cs = (e.deck || []).map(cid => card(cid, w + '.deck')).filter(Boolean);
    cs.forEach(c => ok(!c.tier, w + ': ' + c.id + ' 是王牌／頂點卡'));
    if (cs.length !== (e.deck || []).length) continue;
    const M = deckMain(cs, e.taste);
    if (kind === 'boss') {
      for (const a of ATTRS) {
        ok(cs.filter(c => c[a] === peak(c)).length >= 2, w + '：藏家每色要有 ≥2 張峰值落在' + ZH[a]);
        ok(cs.some(c => c[a] >= 4), w + '：藏家每色都要有 ≥4 星（' + ZH[a] + '）');
      }
      continue;
    }
    if (M === 'c') classic++;
    ok(cs.filter(c => strictPeak(c) === M).length >= 4, w + '：嚴格峰值落在主屬性（' + ZH[M] + '）的要 ≥4 張');
    if (kind === 'man') ok(cs.some(c => ATTRS.some(a => a !== M && c[a] >= 4)), w + '：男子要有一張副屬性 ≥4');
    else {
      ok(cs.filter(c => c[BEATS[M]] >= 4).length >= 2, w + '：唬人色（' + ZH[BEATS[M]] + '）≥4 星要 ≥2 張');
      ok(cs.filter(c => c[COUNTER_OF[M]] >= 4).length >= 1, w + '：剋他用色（' + ZH[COUNTER_OF[M]] + '）≥4 星要 ≥1 張');
    }
  }
  ok(classic <= 4, '主屬性是經典的客人（不含藏家）要 ≤4 位，現在 ' + classic);
  ok(Object.values(C.aces || {}).every(a => !((C.enemies || {}).boss || { deck: [] }).deck.includes(a)), '藏家的 6 張不含王牌（你沒選的那張由 engine 加）');
  // 彼此不重複、不含王牌
  const groups = [['牌組', allDeck], ['禮物', Object.values(C.gifts || {}).flat()], ['特價箱', BP]];
  const aceIds = new Set(Object.values(C.aces || {}));
  const seen = new Map();
  for (const [g, ids] of groups) for (const id of ids) {
    ok(!aceIds.has(id), g + ' 不能含王牌 ' + id);
    ok(!seen.has(id), id + ' 重複（' + seen.get(id) + '／' + g + '）');
    seen.set(id, g);
  }
  const drop = (C.enemies && C.enemies.man && C.enemies.man.drop) || null;
  // 店主 11-13：掉落的必須是他牌組裡的專輯（男子掉 Eminem，sig 第 2 手打出來）
  ok(drop && (C.enemies.man.deck || []).includes(drop) && seen.get(drop) === '牌組' && !aceIds.has(drop), '男子掉的那張（' + drop + '）要在他自己的牌組裡、不跟禮物／特價箱重複');
  ok(C.enemies.man.sig && C.enemies.man.sig.id === drop && Number.isInteger(C.enemies.man.sig.n), '男子的招牌（sig）＝掉的那張'); 

  // ---- 提示句（§2.2.4） ----
  ok(C.hintKeywords && ATTRS.every(a => Array.isArray(C.hintKeywords[a]) && C.hintKeywords[a].length === 3), 'hintKeywords 每色 3 個詞');
  const hintIds = new Set();
  for (const a of ATTRS) {
    const hs = (C.hints || {})[a];
    if (!ok(Array.isArray(hs) && hs.length === 5, 'hints.' + a + ' 要 5 句')) continue;
    hs.forEach((h, k) => {
      const w = 'hints.' + a + '[' + k + ']';
      ok(h && new RegExp('^' + a + '[1-9]$').test(h.id) && !hintIds.has(h.id), w + ': id 要是 ' + a + '1… 而且不重複');
      if (h) hintIds.add(h.id);
      ok(h && typeof h.text === 'string' && h.text, w + ': text');
      ok(h && typeof h.key === 'string' && h.key && h.text.includes(h.key), w + ': key 必填、而且是 text 的子字串（主線裁定）');
      ok(h && h.tag, w + ': tag');
      ok(h && !/經典|冷門|硬蕊/.test(h.text), w + ': 提示句不得寫出屬性名');
    });
  }
  // 提示句庫（11-17 讀牌加難，scratchpad v5/harder DESIGN §3）：one 明指／half 半指（鍵＝他不出那色）／none 不露；id 全域唯一（不跟 C.hints 撞）、voice＝客人的鍵；
  //   數量下限照第一波：明指通用每色 ≥35（加上 C.hints 5 句＝40）、半指每色 ≥12、不露 ≥20；每位客人（序章男子除外）明指每色至少 1 句自己的
  if (C.hintLines) {
    const HL = C.hintLines, guests = Object.keys(C.enemies || {}).filter(k => !C.enemies[k].prologue);
    const seenId = new Set(hintIds), each = (arr, w) => (Array.isArray(arr) ? arr : []).forEach((h, k) => {
      const ww = w + '[' + k + ']';
      ok(h && typeof h.id === 'string' && h.id && !seenId.has(h.id), ww + ': id 必填、全域唯一（也不跟 C.hints 撞）');
      if (h && h.id) seenId.add(h.id);
      ok(h && typeof h.text === 'string' && h.text && !/經典|冷門|硬蕊/.test(h.text), ww + ': text 必填、不寫屬性名');
      ok(h && h.tag, ww + ': tag');
      ok(!h || h.voice == null || guests.includes(h.voice), ww + ': voice 要是客人的鍵（不是序章男子）');
    });
    for (const kind of ['one', 'half']) for (const a of ATTRS) each((HL[kind] || {})[a], 'hintLines.' + kind + '.' + a);
    each(HL.none, 'hintLines.none');
    const gen = arr => (Array.isArray(arr) ? arr : []).filter(h => h && !h.voice).length;
    ok(ATTRS.every(a => gen((HL.one || {})[a]) >= 35), 'hintLines.one：通用每色 ≥35 句（＋C.hints 5 句＝40）', ATTRS.map(a => gen((HL.one || {})[a])));
    ok(ATTRS.every(a => Array.isArray((HL.half || {})[a]) && HL.half[a].length >= 12), 'hintLines.half：每色 ≥12 句');
    ok(Array.isArray(HL.none) && HL.none.length >= 20, 'hintLines.none：≥20 句');
    for (const g of guests) ok(ATTRS.every(a => ((HL.one || {})[a] || []).some(h => h && h.voice === g)), 'hintLines.one：' + g + ' 每色至少一句自己的口吻');
  }

  // ---- 經濟（FIXLIST 8 台幣行情＋X／Y 契約：價格是店主定的、不校準；只有 start／win 是 sim 校準的旋鈕） ----
  const EC = C.economy || {};
  ok(Number.isInteger(EC.start) && EC.start >= 0 && EC.start <= 3000 && EC.start % 100 === 0, 'economy.start 0–3000、整百（校準旋鈕）');
  const W = EC.win || {};
  ok(['prologue', 'normal', 'elite', 'boss'].every(k => Number.isInteger(W[k]) && W[k] % 50 === 0), 'economy.win 四級、整 50（藏家＝菁英 ×1.5＝3750，主線裁定 3）');
  ok(W.prologue >= 0 && W.prologue <= 3000, 'economy.win.prologue 0–3000');
  ok(W.normal >= 500 && W.normal <= 4000, 'economy.win.normal 500–4000（校準旋鈕；店主例：一般 $1,500 左右）');
  ok(W.elite >= W.normal && W.elite <= 6000, 'economy.win.elite ≥ normal、≤6000（店主例：菁英 $2,500 左右）');
  ok(W.boss >= W.elite && W.boss <= 10000, 'economy.win.boss ≥ 菁英、≤10000（無限試煉：打贏藏家不再打烊，接下一輪）');
  const PR = EC.price || {};
  ok(JSON.stringify(PR) === JSON.stringify({ common: 800, rare: 1000, uncommon: 1200, epic: 3000, legendary: 4000, apex: 8000 }),
    'economy.price 要＝店主的稀有度價（普通 800、稀有 1000、獨特 1200、史詩 3000、傳奇 4000、頂點 8000）');
  ok(sameSet(Object.keys(PR), E.RARITY), 'economy.price 的鍵＝engine RARITY');
  ok(JSON.stringify(EC.bargain) === JSON.stringify({ 1: 100, 2: 200, 3: 300 }), 'economy.bargain 要＝每張照最高星 1→100、2→200、3→300');
  ok(!('bargainPrice' in EC), 'economy.bargainPrice（一次 $100 三張）拿掉了，改每張照星（FIXLIST 8）');
  ok(EC.relicPrice === 3000, 'economy.relicPrice 要 3000（櫃檯配件一件）');
  ok(EC.sellRate === 0.5, 'economy.sellRate 0.5（半價賣回）');
  ok(JSON.stringify(EC.stock) === '[4,6]' && JSON.stringify(EC.featureStock) === '[2,3]' && JSON.stringify(EC.relicStock) === '[2,3]', 'economy.stock [4,6]、featureStock [2,3]、relicStock [2,3]');
  ok(C.rarityZh && JSON.stringify(C.rarityZh) === JSON.stringify({ common: '普通', rare: '稀有', uncommon: '獨特', epic: '史詩', legendary: '傳奇', apex: '頂點' }), 'rarityZh（CARD_GAME_DESIGN §5 的名字）');
  // 稀有度公式抽查（CARD_GAME_DESIGN §5）
  const RC = (c, o, h, tier) => E.rarity({ c, o, h, tier: tier || null });
  ok(RC(3, 4, 2) === 'common' && RC(4, 2, 2) === 'rare' && RC(5, 5, 1) === 'uncommon' && RC(5, 1, 3) === 'epic' && RC(5, 5, 4) === 'legendary' && RC(5, 4, 4) === 'legendary' && RC(7, 1, 1, 'hall') === 'apex',
    'engine.rarity：score＝經典＋硬蕊＋(冷門 5 ? 1 : 0)；≤5 普通、6 稀有、7 獨特、8 史詩、≥9 傳奇；頂點卡＝頂點');
  for (const id of BP) if (CARDS[id]) ok(E.priceOf(C, id) === EC.bargain[Math.min(3, peak(CARDS[id]))], '特價箱 ' + id + ' 的價照最高星');

  // ---- 發燒配件（§2.2.6） ----
  const RIDS = ['dustcover', 'stylus', 'cleaner', 'obi', 'testpress', 'headphone', 'boost_c', 'boost_o', 'boost_h'];
  ok(C.relics && sameSet(Object.keys(C.relics), RIDS), '發燒配件要剛好 9 件：' + RIDS.join(' '));
  for (const [id, r] of Object.entries(C.relics || {})) {
    ok(r.id === id && r.name && r.icon && r.desc && r.note && r.tag, 'relics.' + id + ': id／name／icon／desc／note／tag');
    ok(!('price' in r), 'relics.' + id + ': 不個別定價，一律 economy.relicPrice（$3,000）');
    ok(E.relicPrice(C, id) === EC.relicPrice, 'relics.' + id + ': relicPrice＝economy.relicPrice');
    if (/^boost_/.test(id)) ok(r.boost === id.slice(6), 'relics.' + id + ': boost 要是 ' + id.slice(6));
    else ok(!r.boost, 'relics.' + id + ': 只有 boost_* 有 boost');
  }
  ok(C.relics && C.relics.headphone && C.relics.headphone.v4 === false, 'relics.headphone.v4 要 false（〔補〕⚠規則，等店主決定）');
  ok(EC.relicPrice > Math.max(PR.common, PR.rare, PR.uncommon), '配件比箱子裡的唱片貴（' + EC.relicPrice + ' > ' + Math.max(PR.common, PR.rare, PR.uncommon) + '）');
  ok(C.relicShop && Array.isArray(C.relicShop.pool) && C.relicShop.pool.length && C.relicShop.pool.every(id => /^boost_[coh]$/.test(id) && C.relics[id]), 'relicShop.pool ⊂ boost_*');
  ok(C.rewards && sameSet(C.rewards.prologueRelics || [], ['dustcover', 'stylus', 'cleaner']), '序章三選一＝防塵套／黑膠唱針／洗碟水');
  ok(C.rewards && (C.rewards.relicPool || []).every(id => C.relics[id] && C.relics[id].v4 !== false), 'rewards.relicPool ⊂ relics 而且沒有 v4:false 的');
  ok(C.relicMax === 3 && E.CFG.relicMax === 3, '發燒配件最多 3 件');

  // ---- 規則卡（逐字＝owner-lines 的六行） ----
  const OL = ownerLines();
  ok(OL && Array.isArray(OL.rules) && OL.rules.length === 6, 'tools/owner-lines-v4.json 沒有規則卡六行');
  ok(C.rules && Array.isArray(C.rules.lines) && C.rules.lines.length === 6, 'rules：恰好 6 行');
  if (OL && C.rules) ok(JSON.stringify(C.rules.lines) === JSON.stringify(OL.rules), 'rules.lines 要逐字＝D §5 規則卡六行（不含編號與「←」註記）');
  if (C.rules) {
    const GH = (C.trial && C.trial.guestHp) || {};
    const want = { normal: String(GH.normal), elite: String(GH.elite), boss: String(GH.boss) };
    ok(JSON.stringify(C.rules.hpText) === JSON.stringify(want), 'rules.hpText 要＝無限試煉的客人聲望 C.trial.guestHp ' + JSON.stringify(want));
    const foot = (C.rules.foot || []).join('');
    ok(foot.includes('你開局 ' + E.CFG.playerHp + ' 聲望（升級會加）') && foot.includes('回 ' + ((C.trial || {}).heal)) && /\{normal\}.*\{boss\}/.test(foot),
      'rules.foot：你開局 ' + E.CFG.playerHp + ' 聲望（升級會加；＝CFG.playerHp）、打贏回 ' + ((C.trial || {}).heal) + '（＝C.trial.heal）＋{normal}／{boss}');
    ok(/品味/.test(foot) && /底氣/.test(foot) && /最多擋一半/.test(foot), 'rules.foot：要說明品味／底氣（對決名字列的「品」「底」小籤；審查 #11）');
  }

  // ---- 教學的規則資料（§2.2.10） ----
  const T = C.tutorial || {};
  ok(T.hp === 18, 'tutorial.hp 要 18');
  const manDeck = ((C.enemies || {}).man || {}).deck || [];
  ok(Array.isArray(T.plays) && T.plays.length === 6 && T.plays.every(p => manDeck.includes(p.id) && ATTRS.includes(p.attr)), 'tutorial.plays：6 手、卡都在男子牌單');
  if (Array.isArray(T.plays)) ok(new Set(T.plays.map(p => p.id)).size === T.plays.length, 'tutorial.plays 不重複');
  ok(Array.isArray(T.hints) && T.hints.length === 6 && T.hints.every(id => hintIds.has(id)), 'tutorial.hints：6 句、id 都在 C.hints');
  if (Array.isArray(T.hints) && Array.isArray(T.plays)) T.hints.forEach((id, k) => ok(id && T.plays[k] && id[0] === T.plays[k].attr, 'tutorial 第 ' + (k + 1) + ' 手：提示句的色要＝他出的色'));
  ok(JSON.stringify(T.lessons) === JSON.stringify(['mirror', 'oc', 'ch', 'ho', 'block', 'ace']), 'tutorial.lessons 六課');
  for (const t of TIERS) {
    const s = (T.script || {})[t], w = 'tutorial.script.' + t;
    if (!ok(!!s, w)) continue;
    ok(JSON.stringify(s.plays) === JSON.stringify(T.plays) && JSON.stringify(s.hints) === JSON.stringify(T.hints), w + '：plays／hints＝C.tutorial');
    ok(Array.isArray(s.hand) && Array.isArray(s.draw) && sameSet([...s.hand, ...s.draw], (C.gifts || {})[t] || []), w + '：起手＋抽牌＝老闆四張');
    // 手牌 5 張（FIXLIST 11）：老闆四張照出牌順序排在前（第 k 手出第 k 格），第 5 張＝特價箱挑的第 1 張；這樣第 5 手最左那張一定是特價箱的（剋不動那課）
    ok(s.hand.length + s.draw.length === E.CFG.handSize - 1, w + '：劇本四張＝手牌 ' + E.CFG.handSize + ' 張少一張（第 5 張留給特價箱挑的第 1 張）');
    if (Array.isArray(s.pick)) ok(JSON.stringify(s.pick.slice(0, 4).map(p => p && p.id)) === JSON.stringify([...s.hand, ...s.draw]), w + '：四張照出牌順序排（pick[0..3] 的 id）');
    ok(Array.isArray(s.pick) && s.pick.length === 6 && s.pick[4] === 'blocked:o' && s.pick[5] === 'ace', w + '：pick 6 手，第 5 手 blocked:o、第 6 手 ace');
    if (Array.isArray(s.pick)) s.pick.slice(0, 4).forEach((p, k) => ok(p && ((C.gifts || {})[t] || []).includes(p.id) && ATTRS.includes(p.attr), w + '.pick[' + k + ']：老闆四張之一＋屬性'));
    const ex = (T.expect || {})[t];
    if (!ok(Array.isArray(ex) && ex.length === 6, 'tutorial.expect.' + t + ' 要 6 手')) continue;
    ok(ex[4].kind === 'mirrorLose' && ex[4].blocked === 'gap', 'tutorial.expect.' + t + '[4]：剋不動');
    const four = ex.slice(0, 4).reduce((s2, x) => s2 + (x.toE | 0), 0);
    ok(four < T.hp && four + (ex[5].toE | 0) >= T.hp, 'tutorial.expect.' + t + '：前四手 ' + four + ' < ' + T.hp + ' ≤ 加上第六手');
  }
  return bad;
}

// ================================================================================================
// 無限試煉 C.trial 的形狀（SPEC 無限試煉 §0；數字是旋鈕，這裡只查型別、範圍、跟 engine 的契約；曲線的值由 engine.test #16 對）
// ================================================================================================
const TRIAL_CURVE = {
  planner: ['easyTo', 'normalTo'], q: ['easy', 'normal', 'feintBase', 'feintStep', 'feintFrom', 'feintMax'],
  atk: ['lateFrom', 'rate', 'cap', 'slopeFrom', 'slopeEvery', 'boss', 'add'], def: ['lateFrom', 'rate', 'cap', 'boss', 'add'],
  deck: ['floorBase', 'floorRate', 'floorMax', 'minPool', 'buffFrom', 'buffEvery', 'buffCap', 'aceFrom', 'aceRate', 'aceMax', 'mainShare'],
  mercyP: ['from', 'p0', 'step', 'every', 'min']                    // 第 A 波 2：放水前期保留、第 11 位起照機率
};
const len = s => [...String(s)].length;
function shapeTrial(C, E, ok) {
  const T = C.trial;
  if (!ok(T && typeof T === 'object', 'C.trial（無限試煉）沒有')) return;
  const int = (x, lo) => Number.isInteger(x) && x >= (lo == null ? 0 : lo);
  ok(!('night' in C) && !('secondNight' in C), 'C.night／C.secondNight（一晚版、第二夜預告）拿掉了');
  ok(JSON.stringify(T.classes) === JSON.stringify(['normal', 'normal', 'normal', 'elite', 'boss']) && (!E.TRIAL || JSON.stringify(T.classes) === JSON.stringify(E.TRIAL.classes)),
    'trial.classes：一輪 5 位＝一般 3、菁英、藏家（店主定；＝engine TRIAL.classes）');
  ok(int(T.retry, 0), 'trial.retry：每輪說情次數（整數 ≥0）');
  ok(T.youHp === E.CFG.playerHp, 'trial.youHp 要＝engine CFG.playerHp（' + E.CFG.playerHp + '）');
  ok(int(T.heal, 0) && T.heal <= T.youHp, 'trial.heal：打贏回幾點（整數）');
  const GH = T.guestHp || {};
  ok(['normal', 'elite', 'boss'].every(k => int(GH[k], 1)) && GH.boss >= GH.normal && GH.elite >= GH.normal, 'trial.guestHp：一般／菁英／藏家（整數、藏家 ≥ 一般）');
  ok(['normal', 'elite', 'boss'].every(k => int((T.xp || {})[k], 0)), 'trial.xp：贏一般／菁英／藏家的經驗');
  ok(int(T.levelNeed, 1) && int(T.levelHp, 0), 'trial.levelNeed（升下一級＝目前等級＋它）、levelHp（每級上限 +幾）');
  const PK = T.picks || {};
  ok(['atk', 'def', 'hp'].every(k => int(PK[k], 1)), 'trial.picks：品味／底氣／聲望上限 各加幾');
  const LU = T.levelUp || {};
  ok(['title', 'sub', 'atk', 'def', 'hp', 'atkSub', 'defSub', 'hpSub'].every(k => typeof LU[k] === 'string' && LU[k]), 'trial.levelUp 的字（標題、小字、三個選項＋說明）');
  ok(LU.atk === '品味 +' + PK.atk && LU.def === '底氣 +' + PK.def && LU.hp === '聲望上限 +' + PK.hp, 'trial.levelUp 三個選項的數字要＝trial.picks（' + [LU.atk, LU.def, LU.hp].join('／') + '）');
  ok(String(LU.sub || '').includes('+' + T.levelHp), 'trial.levelUp.sub 的數字要＝trial.levelHp');
  // 第 I 波 I-0（SPEC-I §7.2）：Lv1→2 只要 firstNeed（0＝舊規則）、那一級自動加 firstHp（抵銷用：≤ levelHp）；engine TRIAL 同值；升級章、第一次升級老闆句
  ok(int(T.firstNeed, 0) && T.firstNeed <= 1 + T.levelNeed && int(T.firstHp, 0) && T.firstHp <= T.levelHp,
    'trial.firstNeed（Lv1→2 要幾經驗，≤ 1＋levelNeed；0＝照舊）、firstHp（那一級自動加的聲望上限，≤ levelHp）');
  ok(String(LU.title || '').includes('{n}') && String(LU.chapter || '').includes('{n}'), 'trial.levelUp.title／chapter 要有 {n}（升到幾級）');
  ok(typeof LU.first === 'string' && LU.first && len(LU.first) <= 25, 'trial.levelUp.first（第一次升級老闆的泡泡）≤25 字');
  ok(Array.isArray(T.checkpoints) && T.checkpoints.length && T.checkpoints.every((x, k) => int(x, 1) && (!k || x > T.checkpoints[k - 1])) && int(T.checkpointEvery, 1), 'trial.checkpoints 遞增、checkpointEvery ≥1');
  const CV = T.curve || {};
  for (const [g, ks] of Object.entries(TRIAL_CURVE)) ok(CV[g] && ks.every(k => typeof CV[g][k] === 'number' && isFinite(CV[g][k])), 'trial.curve.' + g + ' 要有 ' + ks.join(' '));
  ok(typeof CV.mercyFeint === 'number' && CV.mercyFeint >= 0 && CV.mercyFeint <= 1, 'trial.curve.mercyFeint 0–1');
  if (CV.planner) ok(CV.planner.easyTo <= CV.planner.normalTo, 'trial.curve.planner：easyTo ≤ normalTo');
  if (CV.q) ok(CV.q.easy > 0 && CV.q.easy <= 1 && CV.q.normal > 0 && CV.q.normal <= 1 && CV.q.feintMax >= 0 && CV.q.feintMax < 1, 'trial.curve.q：機率在 0–1');
  if (CV.deck) ok(CV.deck.buffCap <= 5 && CV.deck.aceMax <= 1 && CV.deck.floorMax <= 15, 'trial.curve.deck：加星上限 ≤5（一般卡最高 5 星）、王牌機率 ≤1');
  if (CV.deck) ok(CV.deck.mainShare >= 0 && CV.deck.mainShare <= 1, 'trial.curve.deck.mainShare（客人主屬性那軸最高的牌至少幾成）0–1');
  if (CV.mercyP) ok(int(CV.mercyP.from, 1) && int(CV.mercyP.every, 1) && [CV.mercyP.p0, CV.mercyP.step, CV.mercyP.min].every(x => x >= 0 && x <= 1) && CV.mercyP.min <= CV.mercyP.p0,
    'trial.curve.mercyP：第 from 位起每手放水機率 p0、每 every 位 −step、最低 min（機率在 0–1、min ≤ p0）');
  // 主線 11-16「放水前期保留」：前期加難後第 1–2 位 easy 也會唬（q.easy < 1）→ easy 也吃放水唬人（engine qNowOf 不看出招難度），
  //   而且 easy／normal 那幾位每手都放水（mercyP 從 hard 之後才照機率）
  if (CV.q) ok(CV.q.easy >= 1 || CV.mercyFeint > 0, 'trial.curve：easy 會唬人（q.easy < 1）就要有放水唬人（mercyFeint > 0；easy 也吃放水）');
  if (CV.mercyP && CV.planner) ok(CV.mercyP.from > CV.planner.normalTo, 'trial.curve.mercyP.from 要在 planner.normalTo 之後（easy／normal 那幾位每手都放水，放水前期保留）');
  // 客人稱號（第 A 波 3；舊版 enemyForDepth）：8 個、每 2 位換一次，字照舊版
  ok(Array.isArray(T.titles) && T.titles.length >= 2 && T.titles.every(x => typeof x === 'string' && x && [...x].length <= 8) && new Set(T.titles).size === T.titles.length && int(T.titleEvery, 1),
    'trial.titles：稱號（字串、≤8 字、不重複）＋titleEvery（每幾位換一次）');
  ok(Array.isArray(T.tiers), 'trial.tiers（之後的難度階梯）要是陣列');
  trialTierShape(C, E, ok);
  shapeCareer(C, E, ok);
}
// 試煉階級（第 D 波棒三；SPEC-D §5.2、§5.3）：每階 name（1–4 字）、text（≤24 字）、只准 curve／guestHp／guestHpSteps／add 四種覆寫；curve 的鍵要是 engine 有的；
//   數字一律相對值（{add:n}；hintMix 那種機率另外夾在 0–1）；add 只准 healAdd（打贏少回，≤0）；逐階疊出來（engine trialCfg）客人聲望 一般 ≤ 菁英、一般 ≤ 藏家、機率在 0–1；
//   第 0 階＝沒有疊（trialCfg(C, 0) 沒有 healAdd 鍵）；推門那列、過場卡的字
function trialTierShape(C, E, ok) {
  const L = (C.trial || {}).tiers || [], base = E.trialCfg(C, 0), CK = Object.keys(base.curve || {});
  const isObj = x => !!x && typeof x === 'object' && !Array.isArray(x);
  const relOnly = (v, where) => { if (isObj(v)) { if ('add' in v && Object.keys(v).length === 1) return ok(Number.isFinite(v.add), where + '：{add} 要是數字'); for (const k of Object.keys(v)) relOnly(v[k], where + '.' + k); return true; }
    return ok(false, where + '：階表要寫相對值 {add:n}（SPEC-D §5.2：基準改了字就錯）'); };
  L.forEach((x, i) => {
    const w = 'trial.tiers[' + i + ']（第 ' + (i + 1) + ' 階）';
    if (!ok(isObj(x), w + ' 要是物件')) return;
    ok(typeof x.name === 'string' && clen(x.name) >= 1 && clen(x.name) <= 4, w + '.name 1–4 字');
    ok(typeof x.text === 'string' && x.text && clen(x.text) <= 24, w + '.text ≤24 字：' + x.text);
    const keys = Object.keys(x).filter(k => !['name', 'text'].includes(k));
    ok(keys.length >= 1 && keys.every(k => ['curve', 'guestHp', 'guestHpSteps', 'add'].includes(k)), w + '：只准 curve／guestHp／guestHpSteps／add（有：' + keys.join('、') + '）');
    if (x.curve) { ok(isObj(x.curve) && Object.keys(x.curve).every(k => CK.includes(k)), w + '.curve 的鍵要是 engine TRIAL.curve 有的'); for (const k of Object.keys(x.curve || {})) relOnly(x.curve[k], w + '.curve.' + k); }
    if (x.guestHp) { ok(Object.keys(x.guestHp).every(k => ['normal', 'elite', 'boss'].includes(k)), w + '.guestHp 只有 normal／elite／boss'); relOnly(x.guestHp, w + '.guestHp'); }
    if (x.guestHpSteps) ok(Array.isArray(x.guestHpSteps) && x.guestHpSteps.every(p => Array.isArray(p) && Number.isInteger(p[0]) && p[0] >= 1 && Number.isInteger(p[1]) && p[1] >= 1), w + '.guestHpSteps＝[[第幾位起, +n]…]');
    if (x.add) ok(isObj(x.add) && Object.keys(x.add).length >= 1 && Object.keys(x.add).every(k => ['healAdd', 'healAddNormal'].includes(k) && Number.isInteger(x.add[k]) && x.add[k] < 0), w + '.add 只准 healAdd／healAddNormal（負整數：打贏少回；Normal＝只有一般客人，§14-5 備案）');
  });
  ok(!('healAdd' in base) && !('healAddNormal' in base), 'trialCfg(C, 0) 不能有 healAdd／healAddNormal（第 0 階＝逐字現況）');
  for (let k = 1; k <= L.length; k++) {
    const T = E.trialCfg(C, k), G = T.guestHp, K = T.curve, pr = v => Number.isFinite(v) && v >= 0 && v <= 1;
    ok(G.normal <= G.elite && G.normal <= G.boss, '第 ' + k + ' 階疊完 客人聲望 一般 ≤ 菁英、一般 ≤ 藏家（' + [G.normal, G.elite, G.boss].join('／') + '；第 4 階菁英先 +3、第 5 階藏家才 +3，中間那階菁英比藏家高是照定稿順序）');
    ok([K.hintMix.none.base, K.hintMix.none.max, K.hintMix.half.normal, K.hintMix.half.hard, K.hintMix.half.max, K.q.feintBase, K.q.feintMax].every(pr), '第 ' + k + ' 階疊完 機率要在 0–1');
    ok(K.deck.buffEvery >= 1 && T.heal + (T.healAdd | 0) + (T.healAddNormal | 0) >= 1, '第 ' + k + ' 階疊完 加星間隔 ≥1、打贏至少回 1');
  }
  const U = (C.trial || {}).ui || {};
  for (const k of ['tierRow', 'tierN', 'tierZero', 'tierNew', 'tierMore', 'tierTag', 'tierOpen', 'tierLadder', 'tierHow', 'tierReward']) ok(typeof U[k] === 'string' && U[k], 'trial.ui.' + k + '（試煉階級的畫面字）');
  ok(E.TRIAL_PASS === 21, 'engine TRIAL_PASS＝21（過關＝打倒第 20 位藏家：SPEC-D R-T4）');
}
// 樂歷（第 D 波棒一；第 I 波 I-0 SPEC-I §7.3）：曲線 table（正整數、每級只增不減、接得上表外那段、Lv8 戰力位置不變＝表的合計＝舊曲線同幾級）、
//   第一趟保底 firstLv、新畫面字。engine CAREER 同值
function shapeCareer(C, E, ok) {
  const K = C.career; if (!K) return;
  const int = (x, lo) => Number.isInteger(x) && x >= (lo == null ? 0 : lo);
  const V = K.curve || {}, t = V.table, X = K.lexp || {};
  ok(int(V.tri, 1) && int(V.triTo, 1) && int(V.after, 1), 'career.curve：tri、triTo、after 正整數');
  if (t != null) {
    ok(Array.isArray(t) && t.length < V.triTo && t.every(x => int(x, 1)), 'career.curve.table：正整數陣列（[]＝沒有表）、長度 < triTo（表外照 tri×n）');
    if (Array.isArray(t) && t.length) {
      const nx = t.length + 1 < V.triTo ? V.tri * (t.length + 1) : V.after;
      ok(t.every((x, k) => !k || x >= t[k - 1]) && t[t.length - 1] <= nx, 'career.curve.table 每級要的量只增不減（接表外那一級 ' + nx + '）：' + t.join('／'));
      const sum = t.reduce((a, b) => a + b, 0), old = V.tri * t.length * (t.length + 1) / 2;
      ok(sum === old, 'career.curve.table 合計＝舊曲線同幾級（' + old + '；Lv' + (t.length + 1) + ' 的位置不變＝戰力天賦開放時間不變）：' + sum);
    }
  }
  ok(int(X.firstLv, 0), 'career.lexp.firstLv（新帳號第一趟保底到幾級；0＝關）');
  if (E.CAREER) ok(JSON.stringify(E.CAREER.curve) === JSON.stringify(V) && E.CAREER.lexp.firstLv === X.firstLv, 'career.curve／lexp.firstLv 要＝engine CAREER');
  const U = K.ui || {};
  ok(['partFirst', 'live', 'liveUp', 'recurve', 'lvList', 'lvNew'].every(k => typeof U[k] === 'string' && U[k]), 'career.ui 第 I 波 I-0 的字（partFirst live liveUp recurve lvList lvNew）');
  ok(['partFirst', 'live', 'liveUp', 'recurve', 'lvList'].every(k => String(U[k] || '').includes('{n}')) && String(U.lvNew || '').includes('{list}'), 'career.ui：partFirst live liveUp recurve lvList 有 {n}、lvNew 有 {list}');
}

// ================================================================================================
// 全部檢查（含烘焙欄位、bins.js、字的鍵）
// ================================================================================================
export function contentProblems(C, E) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const CARDS = C.cards || {};
  const ids = Object.keys(CARDS);
  const APEX_ONLY = new Set(C.apexTrialOnly || []);   // 頂點卡試做的新卡：主站沒有固定試聽的照「無來源」（previewUrl ''）
  for (const id of ids) {
    const c = CARDS[id];
    ok(c.id === id, id + ': id 不一致');
    for (const k of ['artist', 'album']) ok(typeof c[k] === 'string' && c[k], id + ': 缺 ' + k);
    ok(id === catalogId(c.artist, c.album), id + ': 卡片 id 要等於主站 catalogId(藝人, 專輯)＝' + catalogId(c.artist, c.album) + '（第 B 波 SPEC-B §1.1；重烘 bake-cards.mjs）');
    for (const k of ATTRS) ok(Number.isInteger(c[k]) && c[k] >= 1 && c[k] <= 7, id + ': 星數 ' + k + '=' + c[k]);
    ok(c.coverUrl || c.localCover, id + ': 沒有封面');
    ok(typeof c.previewUrl === 'string' && (/^https:\/\//.test(c.previewUrl) || (c.previewUrl === '' && APEX_ONLY.has(id))), id + ': 沒有試聽');
    ok(['tw', 'jp', 'zh', 'xx'].includes(c.region), id + ': region ' + c.region);
    ok(Array.isArray(c.tags) && Array.isArray(c.genres), id + ': tags/genres');
    ok(c.tier == null || TIERS.includes(c.tier), id + ': tier ' + c.tier);
    if (c.tier) ok(Math.max(c.c, c.o, c.h) === 7, id + ': 王牌要有 7 星那軸');
    else ok(Math.max(c.c, c.o, c.h) <= 5, id + ': 一般卡最高 5 星');
  }
  bad.push(...shapeProblems(C, E));
  // 第 I 波 I-0（SPEC-I §7.2）：出貨的 trial.firstNeed／firstHp＝engine TRIAL（形狀檢查不比：engine.test 舊段落的 content 故意關掉第一位升級）
  ok(!E.TRIAL || (E.TRIAL.firstNeed === C.trial.firstNeed && E.TRIAL.firstHp === C.trial.firstHp), 'trial.firstNeed／firstHp 要＝engine TRIAL');
  ok(typeof E.xpNeed !== 'function' || (E.xpNeed(E.trialCfg(C, 0), 1) === (C.trial.firstNeed > 0 ? C.trial.firstNeed : 1 + C.trial.levelNeed) && E.xpNeed(E.trialCfg(C, 0), 2) === 2 + C.trial.levelNeed),
    'engine xpNeed：Lv1→2＝firstNeed、Lv2→3＝2＋levelNeed');
  bad.push(...tuneProblems(C));
  bad.push(...bgmProblems(C));        // 第 I 波 §4 背景音樂
  bad.push(...apexProblems(C, E));
  bad.push(...encoreProblems(C, E));
  bad.push(...crowdProblems(C, E));   // 活店（SPEC-H LD1–LD4）
  bad.push(...factionProblems(C, E));
  const has = (id, where) => ok(CARDS[id], where + ': 找不到卡 ' + id);
  for (const id of [...Object.values(C.aces), ...Object.values(C.gifts).flat(), ...C.bargain.pool]) if (CARDS[id]) ok(CARDS[id].pitch, id + ': 缺推薦語（王牌、老闆四張、特價箱）');
  has(C.enemies.man.drop, 'enemies.man.drop');
  for (const t of TIERS) ok(C.aceTitle && C.aceTitle[t], 'aceTitle.' + t);

  // 客人的外觀與聲音、台詞
  const dc = fs.readFileSync(path.join(ROOT, 'dip-character.js'), 'utf8');
  const HEADS = [...dc.slice(dc.indexOf('const AVATAR_HEADS'), dc.indexOf('const AVATAR_COLORS')).matchAll(/\n\s*([a-z]+)\s*:\s*\{/g)].map(m => m[1]);
  const PAL = [...(dc.match(/const PIX_PAL = \{([^}]*)\}/) || ['', ''])[1].matchAll(/([a-z]):'#/g)].map(m => m[1]);
  const avatarOk = (a, where) => {
    ok(a && HEADS.includes(a.head), where + ': head ' + (a && a.head) + ' 不在 AVATAR_HEADS');
    for (const k of ['hair', 'shirt', 'pants', 'skin']) ok(a && PAL.includes(a[k]), where + ': ' + k + '=' + (a && a[k]) + ' 不在 PIX_PAL');
  };
  for (const [id, e] of Object.entries(C.enemies)) {
    ok(e.spr ? /^(e[0-7]|boss)$/.test(e.spr) : !!e.avatar, 'enemies.' + id + ': 要有 spr 或 avatar');
    if (e.avatar) avatarOk(e.avatar, 'enemies.' + id + '.avatar');
    ok(e.voice && e.voice.freq > 0, 'enemies.' + id + ': voice');
    const l = (C.lines || {})[id];
    if (e.prologue) ok(l && l.intro && l.lose && !('line' in l) && !('win' in l), 'lines.' + id + '（序章男子）：只有 intro／lose，沒有試做版加的 line／win（D §2、COPY-01）');
    else ok(l && l.line && l.intro && l.lose && l.win, 'lines.' + id + '：line／intro／lose／win');
    ok(!l || !('switch' in l), 'lines.' + id + '：v4 拿掉 switch（急了／翻面）');
  }
  ok(C.lines && C.lines.boss && C.lines.boss.intro === '讓我看看你的品味有幾兩重。', 'lines.boss.intro＝BOSS_LINES[0]（去掉引號）');

  // 箱子＝bins.js
  let BJ = null; try { BJ = require(path.join(LAB, 'bins.js')); } catch (_) { BJ = null; }
  const binsSrc = BJ && ((BJ.shops && BJ.shops.dip) || BJ.bins);
  if (ok(!!binsSrc, '沒有 bins.js（由 tools/bake-cards.mjs 產生）')) {
    ok(sameSet(Object.keys(C.bins || {}), Object.keys(binsSrc)), 'C.bins 的鍵要＝bins.js');
    for (const [k, b] of Object.entries(binsSrc)) for (const id of b.pool || []) has(id, 'bins.' + k);
    if (C.bins && C.bins.feature) bad.push(...binsProblems(C, E));
  }

  // 小提示、盤面字、店內字、經濟介面字
  ok(C.coachTips && sameSet(Object.keys(C.coachTips), ['tip_mirror', 'tip_bluff', 'tip_block', 'tip_ace', 'tip_rounds', 'tip_lastplay', 'tip_read', 'tip_half', 'tip_none', 'tip_hit']),
    'coachTips 要剛好是 tip_mirror tip_bluff tip_block tip_ace tip_rounds tip_lastplay＋11-17 讀牌加難 tip_read tip_half tip_none tip_hit');
  for (const k of Object.keys(C.coachTips || {})) ok(C.coachTipTags && C.coachTipTags[k], 'coachTipTags.' + k);
  // §2.2.7 那一份，扣掉 aceYou／aceHim（FIXLIST 2：王牌沒有「不會被剋」，不會再有 blocked:'ace'），
  //   再扣掉 picked／again／throwBtn／waiting／aceUsed（FIXLIST 11：沒有「丟！」列；用過的王牌不留在手牌裡）、pickHint（v5 手風琴：沒有整排攤開的「點一張專輯」框）
  const DT = ['hintLabel', 'sleeve', 'rounds', 'hp', 'aceSlot', 'aceWord', 'he', 'you', 'slotE', 'slotP',
    'lastPrefix', 'pileLeft', 'counter', 'countered', 'blockedYou', 'blockedHim', 'mirror', 'tie', 'hitE', 'hitP', 'bluff', 'honest',
    'bluffNoKey', 'honestNoKey', 'koWin', 'koWinSub', 'koLose', 'roundsOut', 'roundsScore', 'roundsEven', 'tapOn',   // tapOn：唬你／剋不動的結果框停住（店主 11-12）
    'readRight', 'seeThrough', 'seeThroughNoKey',   // 第 A 波 4：讀對了就說出來（剋中前加「讀對了。」；看穿唬人＝「你看穿了！」）
    'lpAria',   // lpAria：上一手小列的讀屏字（店主 11-16）
    'honestPlain', 'bluffPlain', 'seeThroughPlain', 'readHit', 'readCounter', 'readMirror', 'readThird',   // 11-17 讀牌加難：正式對局結果句不念關鍵字、他讀到你
    // 11-17 上一手細節（scratchpad v5/recap）：教學那場小列的讀屏字、上一手詳情／這場紀錄面板的框字（結果字一律是上面的結果句）
    'lpAriaInfo', 'rcLink', 'rcList', 'rcListDone', 'rcCount', 'rcAll', 'rcEmpty', 'rcHand', 'rcOf', 'rcAfter', 'rcVs', 'rcNone',
    'rcCounter', 'rcCountered', 'rcGapYou', 'rcGapHim', 'rcMirrorWin', 'rcMirrorLose', 'rcTie', 'rcBluff', 'rcSaw', 'rcRead', 'rcPrev', 'rcNext', 'rcClose', 'rcCover'];
  ok(C.duelText && sameSet(Object.keys(C.duelText), DT), 'duelText 的鍵要剛好是 §2.2.7 那一份（沒有 aceYou／aceHim；第 A 波加 readRight／seeThrough／seeThroughNoKey；上一手小列加 lpAria；11-17 加 honestPlain…readThird、上一手細節 lpAriaInfo／rc*）');
  // 11-17 上一手細節：recap.js 的備用字（content 沒載到時用）＝content 那一份（同一套字）
  { const RC = fs.readFileSync(path.join(LAB, 'recap.js'), 'utf8'), m = /const RT0 = \{([\s\S]*?)\n  \};/.exec(RC);
    const bad = m ? [...m[1].matchAll(/(\w+): '([^']*)'/g)].filter(([, k, v]) => C.duelText[k] != null && C.duelText[k] !== v).map(([, k]) => k) : ['（找不到 RT0）'];
    ok(!bad.length, 'recap.js RT0 的備用字＝content.duelText：' + bad.join('、')); }
  ok(C.duelText && ['seeThrough'].every(k => ['{key}', '{hint}', '{e}'].every(x => String(C.duelText[k]).includes(x))) && ['{hint}', '{e}'].every(x => String(C.duelText.seeThroughNoKey).includes(x)) && /^你看穿了/.test(C.duelText.seeThrough) && /讀對了/.test(C.duelText.readRight),
    'duelText.readRight「讀對了」、seeThrough／seeThroughNoKey「你看穿了！」＋{key}{hint}{e} 的佔位（第 A 波 4）');
  ok(C.duelText && Object.values(C.duelText).every(t => !/不會被剋/.test(t)), 'duelText 不准有「不會被剋」（FIXLIST 2）');
  // D §5 的三個例句要組得出來
  if (C.duelText) {
    const f = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
    const T = C.duelText;
    ok(f(T.counter, { a: '冷門', b: '經典' }) + f(T.hitE, { n: 4 }) === '冷門剋經典，命中！他 −4', 'duelText：組不出「冷門剋經典，命中！他 −4」');
    ok(f(T.blockedYou, { a: '冷門', b: '經典' }) + f(T.hitP, { n: 3 }) === '冷門剋經典，但他高你 2 星以上，剋不動。比星數，你 −3', 'duelText：組不出剋不動那句');
    ok(f(T.bluff, { key: '紀念版', hint: '經典', e: '硬蕊' }) + f(T.hitP, { n: 4 }) === '他唬你！『紀念版』是經典，他出的是硬蕊。你 −4', 'duelText：組不出唬人那句');
    ok(f(T.roundsScore, { p: 60, e: 50, who: '你' }) === '你剩 60%，他剩 50%：你贏', 'duelText.roundsScore：比聲望條剩幾 %（FIXLIST 3）');
    ok(f(T.roundsEven, { p: 50, e: 50 }) === '你剩 50%，他剩 50%：一樣，算你贏', 'duelText.roundsEven：比例一樣算你贏（FIXLIST 3）');
  }
  // 選屬性時相剋圖旁那一行（v5 第二項小尾巴；duel.js legHTML 照 EDGES 代入）：冷門→「冷門：剋經典｜怕硬蕊」
  {
    const f = (s, o) => String(s || '').replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
    ok(f(C.triLegend, { a: '冷門', b: '經典', c: '硬蕊' }) === '冷門：剋經典｜怕硬蕊', 'triLegend：組不出「冷門：剋經典｜怕硬蕊」');
  }
  const SL = C.shopLines || {};
  for (const k of ['poster', 'cat', 'locked', 'binBusy', 'titleHint', 'taipeiHere', 'taipeiNote', 'taipeiLink', 'backToShop', 'bin', 'booth', 'boothEmpty']) ok(typeof SL[k] === 'string' && SL[k], 'shopLines.' + k);
  // 你家（聆聽室，v5 第六項第三期）：ui.js 的房間段讀這些鍵；{album}／{n} 要留著給 UI 代入
  for (const k of ['homeBtn', 'homeTitle', 'homeSub', 'homeNote', 'homeEmpty', 'homeShelf', 'homeDeck', 'homeConsole', 'homeShelfSub', 'homeDeckSub', 'homeDeckEmpty',
    'homePut', 'homeOnDeck', 'homeStop', 'homeNow', 'homeIdle', 'homeWantN', 'homeWant', 'homeWantAgain', 'homeTuneFail', 'homeTuneLoading', 'homeTuneBack']) ok(typeof SL[k] === 'string' && SL[k], 'shopLines.' + k + '（你家）');
  for (const k of ['homeOnDeck', 'homeWant', 'homeWantAgain']) ok(String(SL[k] || '').includes('{album}'), 'shopLines.' + k + ' 要有 {album}');
  ok(String(SL.homeWantN || '').includes('{n}'), 'shopLines.homeWantN 要有 {n}');
  ok(String(SL.homePut || '').length <= 4, 'shopLines.homePut（唱片架每張下面的小鈕）≤4 字');
  ok(SL.binBusy === '打完再翻。', 'shopLines.binBusy＝「打完再翻。」（D §6）');
  ok(SL.ownerHint && ['title', 'scene', 'night', 'duel', 'reward'].every(k => typeof SL.ownerHint[k] === 'string'), 'shopLines.ownerHint 五個畫面');
  ok(Array.isArray(SL.nightIntro) && SL.nightIntro.length === 4, 'shopLines.nightIntro 四句（第 2 句「客人跟剛才那位不一樣」店主 11-12；第 4 句講去櫃檯賣給老闆，第 A 波 5）');
  ok(String((SL.nightIntro || [])[1] || '').startsWith('客人跟剛才那位不一樣'), 'shopLines.nightIntro 第 2 句「客人跟剛才那位不一樣」（店主 11-12）');
  ok(/櫃檯/.test(String((SL.nightIntro || [])[3] || '')) && /半價/.test(String((SL.nightIntro || [])[3] || '')), 'shopLines.nightIntro 第 4 句講「櫃檯」「半價」（第 A 波 5：移出包包只走櫃檯；老闆自己講，不說「賣給老闆」）');
  ok(/對戰台/.test(String((SL.nightIntro || [])[0] || '')), 'shopLines.nightIntro 第 1 句講「對戰台」（第 A 波 1：客人在對戰台等你）');
  ok(['closeWin', 'reclaimGift', 'reclaimSeed'].every(k => typeof SL[k] === 'string' && SL[k] && C.shopLineTags[k] === '新' && C.shopLineWho[k] === '老闆'), 'shopLines.closeWin／reclaimGift／reclaimSeed（老闆說的，第 A 波 4、5）');
  const SU = ['money', 'binTitle', 'buy', 'noMoney', 'bought', 'sold', 'relicTitle', 'relicFull', 'relicBought', 'bargainTitle', 'bargainPrompt',
    'bargainTake', 'bargainBuy', 'bargainEmpty', 'close', 'earned',
    'bag', 'binEmpty', 'owned', 'relicSell', 'relicSold', 'relicEmpty', 'relicMoneyShort', 'relicSellFirst', 'prev', 'next', 'infoAria',
    'relicTab', 'sellTab', 'sellTitle', 'sellNote', 'sellAsk', 'sellGo', 'reclaimAsk', 'reclaimGo', 'reclaimTag', 'reclaimed', 'sellNo', 'bagSellMin', 'goCounter', 'bagNote', 'bagSellHint'];
  ok(C.shopUi && SU.every(k => typeof C.shopUi[k] === 'string' && C.shopUi[k]), 'shopUi 的鍵（§2.2.8；第 A 波 5 櫃檯賣給老闆）');
  // 第 A 波 5：唱片的「先賣一張」子面板、包包面板的賣鈕拿掉了（移出包包只走櫃檯）；「從唱片櫃帶來的不能賣」不再成立（可以交還老闆）
  ok(C.shopUi && !['sellPick', 'moneyShort', 'sellFirst', 'bagSellNote', 'bagSellBtn', 'bagSellAsk', 'bagSellGo', 'bagSellNo', 'seedNoSell'].some(k => k in C.shopUi),
    'shopUi 拿掉唱片先賣／包包賣鈕／種子不能賣的字（第 A 波 5）');
  ok(C.shopUi && /櫃檯/.test(C.shopUi.bagSellHint) && /賣給老闆/.test(C.shopUi.bagSellHint) && /櫃檯/.test(C.shopUi.bagNote) && /櫃檯/.test(C.shopUi.goCounter), 'shopUi.bagSellHint／bagNote／goCounter 指去櫃檯（第 A 波 5）');
  // 包包不限張數（店主 11-16）：包包只寫張數（不寫上限）；「包包滿要先賣／先丟」的字拿掉了（強迫的流程沒有了）
  ok(C.shopUi && /\{n\}/.test(C.shopUi.bag) && !/\{max\}|\//.test(C.shopUi.bag), 'shopUi.bag 只寫張數（「包包 {n} 張」，不寫上限）');
  ok(C.shopUi && !['bagFull', 'bagFullN', 'sellPickN'].some(k => k in C.shopUi) && !('bagFull' in (((C.lines || {}).owner) || {})) && !('bagOutMsg' in (((C.seeds || {}).ui) || {})),
    '包包滿的字（shopUi.bagFull／bagFullN／sellPickN、老闆 bagFull、seeds.ui.bagOutMsg）拿掉了');
  ok(C.shopUi && /\{n\}/.test(C.shopUi.sellGo) && /\{album\}/.test(C.shopUi.sellAsk) && /\{album\}/.test(C.shopUi.reclaimAsk) && /\{album\}/.test(C.shopUi.reclaimed) && /\{n\}/.test(C.shopUi.bagSellMin),
    'shopUi 櫃檯賣給老闆：{n}／{album} 的佔位');
  // 從唱片櫃挑牌開局（店主 11-13）：種子不能賣的字、挑種子／帶走一張／唱片櫃頁的畫面字（ui.js 用；{x} 的佔位要在）
  ok(C.shopUi && C.shopUi.seedTag && C.shopUi.giftTag, 'shopUi.seedTag／giftTag（包包面板、賣給老闆的小籤）');
  { const SD = ((C.seeds || {}).ui) || {};
    const need = { pickTitle: [], pickSub: ['max'], pickCount: ['n', 'max'], pickTake: [], picked: [], pickGo: [], pickNone: [], pickAll: [], pickEmpty: [], pickFull: ['max'],
      keepTitle: [], keepSub: [], keepPick: [], keepCount: ['n'], keepLater: [], keepDone: ['album'], keepNone: [], fromBag: [], fromDrop: [],
      shelfOwn: ['n'], shelfOwnSub: [], shelfOwnEmpty: [], shelfKnown: ['n', 'total'], shelfKnownSub: [], storeTag: [] };
    for (const [k, ph] of Object.entries(need)) ok(typeof SD[k] === 'string' && SD[k] && ph.every(x => SD[k].includes('{' + x + '}')), 'seeds.ui.' + k + (ph.length ? '（要有 ' + ph.map(x => '{' + x + '}').join('') + '）' : ''));
    ok(C.seedsTag === '新', 'C.seedsTag'); }
  // 無限試煉的畫面字（第二棒 ui.js 用）：{x} 的佔位要在
  const TU = (C.trial || {}).ui || {};
  const NEED_UI = { prologue: [], pos: ['{n}'], round: ['{r}'], elite: [], boss: [], toCheckpoint: ['{n}'], checkpoint: ['{n}'], retryLeft: ['{n}'], next: ['{n}', '{name}'],
    guestDone: [], guestCur: [], guestLater: [], hasAce: [], hp: ['{n}', '{max}'], heal: ['{n}'], level: ['{n}'], xp: ['{n}', '{need}'], atk: ['{n}'], def: ['{n}'], maxHp: ['{n}'],
    atkShort: ['{n}'], defShort: ['{n}'], cont: [], abandon: [], abandonWarn: ['{where}'], lastSummary: [], shelfNew: [],
    game: [], atkHelp: ['{n}'], defHelp: ['{n}', '最多擋一半'], eAtkHelp: ['{n}'], mainAttr: ['{attr}'],
    toRecord: ['{n}', '破紀錄'], streak: ['{n}'], closeWin: ['險勝'] };   // 第 A 波 4：再贏 N 位破紀錄、連勝小章、險勝章
  for (const [k, ph] of Object.entries(NEED_UI)) ok(typeof TU[k] === 'string' && TU[k] && ph.every(x => TU[k].includes(x)), 'trial.ui.' + k + ' 要是字串' + (ph.length ? '、含 ' + ph.join(' ') : ''));
  ok(Array.isArray(TU.retryMenu) && TU.retryMenu.length === 2 && TU.retryMenu.every(x => typeof x === 'string' && x), 'trial.ui.retryMenu：說情兩顆（再一場／到這裡就好）');
  ok(TU.pos === '第 {n} 位', 'trial.ui.pos＝「第 {n} 位」（店主：頂欄只寫第 n 位）');
  const NT = (C.trial || {}).notes || {};
  ok(['atk', 'def', 'eAtk', 'eDef'].every(k => typeof NT[k] === 'string' && NT[k].includes('{n}')), 'trial.notes：atk／def／eAtk／eDef 結果行那句（含 {n}）');
  const SM = C.summary || {};
  const NEED_SM = { title: [], reached: ['{n}'], streak: ['{n}'], taken: ['{n}'], wins: ['{n}'], none: [], best: ['{n}'], newRecord: [], checkpoints: ['{list}'], again: [], more: ['{n}'],
    toBreak: ['{n}', '破紀錄'], closeHp: ['{n}'], flipBy: ['{k}', '{e}', '{p}', '翻盤'], flipAt: ['{k}', '翻盤'] };   // 第 A 波 4：差一點摘要
  const LU = (C.trial || {}).levelUp || {};
  ok(['atkSub', 'defSub', 'hpSub'].every(k => typeof LU[k] === 'string' && LU[k].includes('{n}')) && /剋中/.test(LU.atkSub) && /最多擋一半/.test(LU.defSub),
    'trial.levelUp：atkSub／defSub／hpSub 含 {n}，說清楚加的是什麼（剋中時多扣他、被扣時少扣、最多擋一半；審查 #11）');
  for (const [k, ph] of Object.entries(NEED_SM)) ok(typeof SM[k] === 'string' && SM[k] && ph.every(x => SM[k].includes(x)), 'summary.' + k + ' 要是字串' + (ph.length ? '、含 ' + ph.join(' ') : ''));
  ok(SM.reached === '走到第 {n} 位' && SM.streak === '最多連贏 {n} 位' && SM.taken === '收了 {n} 張' && SM.best === '最遠：第 {n} 位', 'summary：店主的「走到第 23 位・最多連贏 12 位・收了 9 張」「最遠：第 23 位」');
  let L = null; try { L = JSON.parse(fs.readFileSync(path.join(LAB, 'shops', 'dip.json'), 'utf8')); } catch (_) { L = null; }
  for (const m of scriptProblems(C, L)) bad.push(m);
  for (const m of tutorialProblems(C)) bad.push(m);
  const enemyNames = Object.values(C.enemies).map(e => e.name);
  ok(C.names.length >= 20 && C.names.every(n => !enemyNames.includes(n) && [...n].length <= 8), 'names：不能用客人的名字、≤8 字');
  ok(C.avatarsFallback.length === 6, 'avatarsFallback 要 6 組'); C.avatarsFallback.forEach((a, k) => avatarOk(a, 'avatarsFallback[' + k + ']'));
  return bad;
}

// ================================================================================================
// 箱子（FIXLIST 4／5／8＋X／Y 契約；bins.js 是契約形狀＝有 feature 那一區時才查）。匯出給 engine.test 查 fixture
//   十六區 { key, label, zh, pool, front }（v5 店面改版：POP 改 CITY POP、加 INDIE ROCK／INDIE POP）；分類箱的 pool 都是那一類（第一個曲風＝genre-tree 頂層、台灣地區＝tw）；FEATURE 只有史詩／傳奇；
//   沒有頂點卡；front 的卡都在；30 晚 newRun 每區都上得到 4–6 張（FEATURE 2–3）、全店不重複（lot 關）；一檔貨開著時第 1 檔每箱抽得滿配額
// ================================================================================================
export const BIN_LABELS = { jazz: ['JAZZ', '爵士'], tw: ['TW', '台灣'], rock: ['ROCK', '搖滾'], elec: ['ELEC', '電子'], soul: ['SOUL', '靈魂放克'],
  hiphop: ['HIP-HOP', '嘻哈 R&B'], citypop: ['CITY POP', '城市流行'], classical: ['CLASSICAL', '古典'], world: ['WORLD', '世界'], folk: ['FOLK', '民謠'],
  indierock: ['INDIE ROCK', '獨立搖滾'], indiepop: ['INDIE POP', '獨立流行'], blues: ['BLUES', '藍調'],
  new: ['NEW', '新進'], feature: ['FEATURE', '店長推薦精選'], picks: [null, '店長推薦'] };
export function binsProblems(C, E) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const B = C.bins || {}, CARDS = C.cards || {};
  let tops = null; try { tops = JSON.parse(fs.readFileSync(path.join(ROOT, 'genre-tree.json'), 'utf8')).genres.map(g => g.id); } catch (_) { tops = null; }
  ok(sameSet(Object.keys(B), Object.keys(BIN_LABELS)), 'bins 的鍵要剛好是契約的 16 區：' + Object.keys(BIN_LABELS).join(' ') + '（現在 ' + Object.keys(B).join(' ') + '）');
  if (tops) ok(sameSet(Object.keys(E.GENRE_BIN), tops), 'engine GENRE_BIN 的鍵＝genre-tree.json 頂層十類');
  const CATS = Object.values(E.GENRE_BIN).concat(['tw']);
  for (const [k, [label, zh]] of Object.entries(BIN_LABELS)) {
    const b = B[k], w = 'bins.' + k;
    if (!ok(b, w + '：沒有這一區')) continue;
    ok(b.key === k && b.zh === zh && typeof b.label === 'string' && b.label && (label == null || b.label === label), w + '：key／label／zh 要是 ' + k + '／' + (label || '（英文）') + '／' + zh);
    ok(Array.isArray(b.pool) && b.pool.length && new Set(b.pool).size === b.pool.length, w + '：pool 要有卡、不重複');
    ok(Array.isArray(b.front) && b.front.every(id => CARDS[id]), w + '：front 的卡都要在 cards.js');
    for (const id of b.pool || []) {
      const c = CARDS[id];
      if (!ok(c, w + '：找不到卡 ' + id)) continue;
      ok(!c.tier, w + '：' + id + ' 是頂點卡（v4 不上架）');
      if (CATS.includes(k)) ok(E.categoryOf(c) === k, w + '：' + id + ' 的分類是 ' + E.categoryOf(c) + '（第一個曲風 ' + (c.genres || [])[0] + '、地區 ' + c.region + '）');
      if (k === 'feature') ok(['epic', 'legendary'].includes(E.rarity(c)), w + '：' + id + ' 是 ' + E.rarity(c) + '（FEATURE 只放史詩／傳奇）');
      if (tops && c.region !== 'tw') ok(tops.includes((c.genres || [])[0]), w + '：' + id + ' 的第一個曲風 ' + (c.genres || [])[0] + ' 不是 genre-tree 頂層');
    }
  }
  // 30 晚上貨：每區都上得滿下限（全店不重複之後）。舊補貨（每輪 4–6、FEATURE 2–3）用 lot 關驗——一檔貨（第 B 波）關掉時退回的就是這條路
  const short = {}, Coff = Object.assign({}, C, { lot: Object.assign({}, C.lot || {}, { on: false }) });
  for (let s = 1; s <= 30; s++) {
    const run = E.newRun(Coff, { seedKey: 'bins-check-' + s, nightNo: 1 + (s % 3), ace: TIERS[s % 3] });
    const all = Object.values(run.shop.bins).flat();
    ok(new Set(all).size === all.length, '第 ' + s + ' 晚：全店有重複的唱片');
    for (const [k, st] of Object.entries(run.shop.bins)) if (st.length < (k === 'feature' ? 2 : 4)) short[k] = Math.min(short[k] == null ? 99 : short[k], st.length);
  }
  for (const [k, n] of Object.entries(short)) bad.push('bins.' + k + '：有幾晚只上得到 ' + n + ' 張（扣掉王牌、包包、特價箱、別區先拿的、稀有度不對的之後不夠；pool 要再多一點）');
  // 一檔貨（第 B 波 SPEC-B §3；C.lot.on）：30 趟的第 1 檔（策展池）每箱都抽得滿配額（engine.lotQuota）、全檔不重複；第 1 位架上每箱 show 張（FEATURE featureShow）
  if (E.lotQuota && (C.lot || {}).on !== false) {
    const L = Object.assign({}, E.LOT || {}, C.lot || {}), Q = E.lotQuota(C), lshort = {};
    for (let s = 1; s <= 30; s++) {
      const run = E.newRun(C, { seedKey: 'bins-check-' + s, nightNo: 1 + (s % 3), ace: TIERS[s % 3] }), lot = run.shop.lot;
      if (!ok(lot && lot.bins, '第 ' + s + ' 趟：一檔貨開著卻沒有 run.shop.lot')) continue;
      const all = Object.values(lot.bins).flat();
      ok(new Set(all).size === all.length, '第 ' + s + ' 趟：第 1 檔有重複的唱片');
      for (const [k, st] of Object.entries(lot.bins)) if (st.length < (Q[k] | 0)) lshort[k] = Math.min(lshort[k] == null ? 99 : lshort[k], st.length);
      for (const [k, st] of Object.entries(run.shop.bins)) ok(st.length === Math.min(k === 'feature' ? L.featureShow : L.show, (lot.bins[k] || []).length), '第 ' + s + ' 趟：' + k + ' 第 1 位架上 ' + st.length + ' 張');
    }
    for (const [k, n] of Object.entries(lshort)) bad.push('bins.' + k + '：第 1 檔（策展池）有幾趟只抽得到 ' + n + ' 張、配額 ' + Q[k] + '（pool 要再多一點，或調 C.lot）');
  }
  return bad;
}

// ================================================================================================
// 活店（SPEC-H §2、§5.7、§5.8、§6.2、§7.4、附錄 A；匯出 crowdProblems(C, E)、crowdNotes(C)）：LD1–LD4（LD5＝scriptProblems 的 r1 退役）
//   LD1 名冊：C.regulars 6 位、名字、外觀合法、聲音、likes 是 dip.json crowd.stops 的 id、weight／encW 合法、行家只有周姐；C.crowd（附錄 A 的形狀、路人 4 套、
//       熱點＝dip.json crowd.hot）、C.encounter（第一階段 on:false、reward shelf｜bag、不另設拿錢數字）、C.crowdUi 第一階段三句＋第二階段切磋 14 句（enc*：空格、唱片櫃／包包兩版）。
//   LD2 撞造型：帽子分族比（挑戰者用到哪幾族由 C.enemies 的外觀算出來，皇冠族一律禁），上衣不准 apron／suit，不跟任何挑戰者、老闆、玩家預設外觀完全相同；
//       熟客 6＋路人 4 彼此也不准完全相同。
//   LD3 台詞 C.chat／C.ownerChat：id 全域唯一、who／cat／need 合法、空格白名單、防編造（手寫句沒有拉丁字母、阿拉伯數字、《》、兩個以上中文數字＋年、事實字、
//       寫死流派名；「這箱＋聲音描述」要 need.at；樣板拿掉空格後沒有數字與拉丁字母、《》只包 {album}、{year}／{decade} 後 3 字內沒有盤／壓、
//       評價字跟 need 的軸對得上、說「在哪一箱」的知識樣板要 onShelf）、每泡字數；每類句數 ≥ §5.7 第一階段表（棒 3b 搬句後一律驗）；
//       第二階段切磋（棒 3d）：每位 嗆 encDare 3、接了 encYes 1、改天 encNo 2、沒理他 encLapse 1、他輸了 encLose 2、他贏了 encWin 2、作廢 encVoid 1（§5.7）；
//       切磋類單泡、沒有空格、不帶 need（導演硬指定 ctx.cat；encView 把字原樣交給 duel.js，空格不會被填）；trip 的 need.encWon／encLost 只准 true、只用在熟客的 trip、
//       一句只帶一個，五位各 encWon 1＋encLost 1、周姐合計 ≥1（§5.7「6＋2」「3＋1」），這兩類不算進第一階段 trip 的 6／3 句；draft 佔位不准了（棒 3d 已搬齊）。
//       C.crowdFact（卡片空格怎麼填）：十類曲風中文＝主站 genre-tree.json 頂層 zh、卡池每張的 genres[0]／region／tune 都對得到、樣板只用表上有的空格、
//       發行年下限、三軸字＝經典／冷門／硬蕊（填不出來＝null 由導演給、chatPick usable 判掉，不准預設字）。
//       收藏通則字（首版、音質、最好…）的警告清單歸 lint-copy（棒 3b），這裡不重複。
//   LD4 熟客牌組：7 張不重複、都是核心卡（有封面、試聽、藝人介紹）、非頂點卡、不跟主線客人／老闆四張／特價箱／王牌／其他熟客重複；
//       主屬性 deckMain＝main、嚴格峰值落在主屬性 ≥4 張、≥4 張在他愛停那幾箱；taste／honesty／tune／off 合法。
// ================================================================================================
const REG_IDS = ['xiaoyu', 'akai', 'datou', 'afang', 'laochen', 'zhoujie'];
const EXPERT_ID = 'zhoujie';
const CROWD_STOPS = ['c-rock', 'c-soul', 'c-citypop', 'c-world', 'c-elec', 'c-hiphop', 'c-classical', 'c-folk', 'c-listen', 'c-pay'];   // dip.json 沒有 crowd 段時的退路（§4.1）
const HAT_FAMILY = { phones: '耳機族', bigphones: '耳機族', neckphones: '耳機族', beanie: '毛帽族', pompom: '毛帽族', cap: '鴨舌帽族', capback: '鴨舌帽族', trucker: '鴨舌帽族',
  beret: '貝雷帽', fedora: '紳士帽族', tophat: '紳士帽族', crown: '皇冠' };
const HAT_ALWAYS_BANNED = ['皇冠'];      // e7 品味之神保留（random 也不出）
const TOP_BANNED = ['apron', 'suit'];    // 老闆、二手店老闆／傳說藏家
const WAVES = ['sine', 'square', 'sawtooth', 'triangle'];
const CHAT_CATS = {
  regular: ['hello', 'again', 'chat', 'dig', 'shelf', 'trip', 'close', 'mem', 'busy'],
  expert: ['hello', 'again', 'chat', 'trip', 'close', 'mem', 'busy', 'loreIn', 'loreOut', 'fact'],
  enc: ['encDare', 'encYes', 'encNo', 'encLapse', 'encLose', 'encWin', 'encVoid'],   // 第二階段（棒 3d）
  passer: ['chat'], owner: ['chat', 'trip']
};
// §5.7 第一階段句數（hello 算泡泡數，其他算句數）；老闆 chat 22＝閒聊 12（沒有 need.met）＋店裡的事 10（need.met）
//   第二階段（棒 3d）：enc＝每位熟客（含周姐）切磋七類；tripEnc＝trip 的切磋輸贏（regular 各 1＋1；expert 兩類合計 ≥1，鍵 any）
export const CHAT_TARGET = {
  regular: { hello: 2, again: 6, chat: 12, dig: 8, shelf: 4, trip: 6, close: 3, mem: 3, busy: 2 },
  expert: { hello: 2, again: 6, chat: 8, trip: 3, close: 3, mem: 3, busy: 2, loreIn: 10, loreOut: 4, fact: 20 },
  passer: { chat: 30 }, owner: { chat: 22, trip: 8 }, ownerMet: 10,
  enc: { encDare: 3, encYes: 1, encNo: 2, encLapse: 1, encLose: 2, encWin: 2, encVoid: 1 },
  tripEnc: { regular: { encWon: 1, encLost: 1 }, expert: { any: 1 } }
};
const SPAR_NEED = ['encWon', 'encLost'];   // trip 的切磋輸贏（第二階段）
// C.crowdUi 第二階段切磋字：鍵 → 要有的空格（其他空格不准；邀請面板、對決頂欄、戰利品列、唱片櫃小籤）
const SPAR_UI = { encTitle: ['name'], encRisk: [], encRewardShelf: ['name', 'cash'], encRewardBag: ['name', 'cash'], encBtnYes: [], encBtnNo: [], encTop: ['name'],
  encSkip: ['cash'], encLootShelf: ['name'], encLootBag: ['name'], encShelfToast: [], encVoidNote: [], encWait: [], encSrc: [],
  // 審查修正 p2b：他的唱片你大多收過了（卡池補）的兩版、短局一行、第一次老闆提示、對決頂欄小字
  encRewardShelfAny: ['cash'], encRewardBagAny: ['cash'], encLootShelfAny: ['name'], encLootBagAny: ['name'], encShort: [], encHint: ['name'], encTopSub: [], encLootNote: ['name'] };
const TRIP_NEED = { posGte: 'int', posLte: 'int', streakGte: 'int', bagGte: 'int', hpHalf: 'bool', retried: 'bool', dare: 'bool', firstRun: 'bool', newFar: 'bool', encWon: 'bool', encLost: 'bool', ace: 'ace' };
const HOLES_HAND = ['title', 'pos', 'last', 'far', 'name'];
const HOLES_CARD = ['artist', 'album', 'year', 'decade', 'genre', 'bin', 'region', 'tune', 'axis'];
const TEMPLATE_CATS = ['shelf', 'fact', 'loreIn', 'loreOut'];
const FACT_HAND = /年代|得獎|葛萊美|金曲|銷量|賣了.*張|排行|榜|出道|解散|團員|製作人|廠牌|首張|最後一張|遺作|影響了/;
const FACT_TEMPLATE = /首張|最後一張|得獎|葛萊美|金曲|銷量|賣了.*張|排行|榜|出道|解散|團員|製作人|廠牌|遺作|影響了|名盤|首版|原版|壓片|音質/;
const FLOW_NAMES = /經典流|冷門流|異端流|殿堂|流亡/;
const ZH_YEAR = /[〇零一二三四五六七八九十]{2,}年/;
const THIS_BIN = /這箱|這區|這排|這邊的/;
const SOUND = /鼓|貝斯|吉他|人聲|唱腔|節奏|旋律|編曲|合成器|弦樂|取樣|鋼琴|管樂|和聲/;
const EVAL = { o: /冷門|知道的人不多|少人知道/, h: /硬蕊|入耳|門檻|難入口|慢慢聽/, c: /經典|很多人|大家都/ };
const clen2 = s => [...String(s)].length;
const holesOf = s => [...String(s).matchAll(/\{([a-zA-Z]+)\}/g)].map(m => m[1]);
const noHoles = s => String(s).replace(/\{[a-zA-Z]+\}/g, '');
const normKey = s => String(s || '').normalize('NFC').trim().toLowerCase();
function introShardOf(key) { let h = 0x811c9dc5; for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h % 64; }   // ＝dip-artist-intro.js shardOf
function artistIntro() {
  const dir = path.join(ROOT, 'data', 'artist-intros'), cache = {};
  if (!fs.existsSync(path.join(dir, 'manifest.json'))) return null;
  return artist => {
    const k = normKey(artist), s = introShardOf(k);
    if (!(s in cache)) { try { cache[s] = JSON.parse(fs.readFileSync(path.join(dir, String(s).padStart(2, '0') + '.json'), 'utf8')).entries || {}; } catch (_) { cache[s] = {}; } }
    return !!cache[s][k];
  };
}
function crowdLayout() { try { return JSON.parse(fs.readFileSync(path.join(LAB, 'shops', 'dip.json'), 'utf8')).crowd || null; } catch (_) { return null; } }

export function crowdProblems(C, E) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const R = C.regulars, CARDS = C.cards || {};
  if (!ok(R && typeof R === 'object', 'LD1：C.regulars（活店熟客名冊）沒有')) return bad;
  const Ch = require(path.join(LAB, 'chars.js'));
  const LC = crowdLayout();
  const stops = LC && Array.isArray(LC.stops) ? LC.stops : null;
  const stopIds = stops ? stops.map(s => s && s.id) : CROWD_STOPS;
  const stopBin = {}; (stops || []).forEach(s => { if (s && s.bin) stopBin[s.id] = s.bin; });

  // ---- LD1 名冊 ----
  ok(JSON.stringify(Object.keys(R)) === JSON.stringify(REG_IDS), 'LD1：C.regulars 要剛好是 ' + REG_IDS.join(' ') + '（照這個順序），現在 ' + Object.keys(R).join(' '));
  const names = new Set();
  const lookOk = (look, w) => {
    if (typeof look === 'string') return ok(Ch.cast().includes(look), w + '：look「' + look + '」不是 chars.js 的 npc id');
    if (!ok(look && typeof look === 'object' && !Array.isArray(look), w + '：look 要是 npc id 或 spec 物件')) return false;
    ok(!('head' in look) && !('shirt' in look) && !('pants' in look), w + '：look 要寫新 spec（不是舊捏角色的 head／shirt／pants）');
    const n = Ch.normalize(look), FIELDS = Object.keys(Ch.DEFAULT).filter(k => k !== 'v');
    let good = true;
    for (const [k, v] of Object.entries(look)) {
      if (!ok(FIELDS.includes(k), w + '：look.' + k + ' 不是 chars.js 的欄位')) { good = false; continue; }
      if (!ok(n[k] === v, w + '：look.' + k + '＝' + v + ' chars.js 不認得（normalize 換成 ' + n[k] + '）')) good = false;
    }
    return good;
  };
  const voiceOk = (v, w) => ok(v && Number.isFinite(v.freq) && v.freq >= 80 && v.freq <= 2000 && WAVES.includes(v.wave) && (v.jitter == null || (Number.isFinite(v.jitter) && v.jitter >= 0)),
    w + '：voice 要 { freq 80–2000, wave ' + WAVES.join('／') + '（jitter 可省） }');
  for (const id of REG_IDS) {
    const r = R[id], w = 'LD1 regulars.' + id;
    if (!ok(r, w + '：沒有')) continue;
    ok(typeof r.name === 'string' && clen2(r.name) >= 1 && clen2(r.name) <= 4 && !names.has(r.name) && !/[A-Za-z0-9]/.test(r.name), w + '：name（1–4 字、不重複）');
    names.add(r.name);
    lookOk(r.look, w);
    voiceOk(r.voice, w);
    ok(Array.isArray(r.likes) && r.likes.length >= 1 && r.likes.length <= 4 && new Set(r.likes).size === r.likes.length && r.likes.every(s => stopIds.includes(s)),
      w + '：likes 要是 1–4 個不重複的 crowd.stops id（' + stopIds.join(' ') + '），現在 ' + JSON.stringify(r.likes));
    ok(Number.isFinite(r.weight) && r.weight > 0 && r.weight <= 3, w + '：weight（推門抽人的權重）要 >0、≤3');
    ok(Number.isInteger(r.encW) && r.encW >= 1 && r.encW <= 5, w + '：encW（切磋「嗆」的權重）要是 1–5 的整數');
    ok(!('expert' in r) || (id === EXPERT_ID && r.expert === true), w + '：expert 只准周姐（crowd-core EXPERT＝' + EXPERT_ID + '）');
    const en = r.enc || {};
    if (!ok(r.enc && typeof r.enc === 'object', w + '：enc 沒有')) continue;
    ok(Number.isInteger(en.off) && en.off >= -12 && en.off <= 12, w + '：enc.off（棋力）要是 −12～+12 的整數（p2b：照 sim 量到的勝率排個性順序，牌組強弱不同要補）');
    ok(ATTRS.includes(en.main), w + '：enc.main 要是 c／o／h');
    ok(/^[coh]{3}$/.test(en.taste || '') && new Set(en.taste).size === 3 && en.taste[0] === en.main, w + '：enc.taste 要是 coh 的排列、主屬性開頭');
    ok(C.honesty && Object.prototype.hasOwnProperty.call(C.honesty, en.honesty), w + '：enc.honesty 要是 C.honesty 的鍵');
    ok(TUNE_CELLS.includes(en.tune), w + '：enc.tune 要是 C.tunes 八格之一');
  }
  ok(R[EXPERT_ID] && R[EXPERT_ID].expert === true, 'LD1：周姐要標 expert:true（行家）');
  // C.crowd（附錄 A）
  const CR = C.crowd || {};
  const rng = (a, lo) => Array.isArray(a) && a.length === 2 && a.every(Number.isFinite) && a[0] <= a[1] && a[0] >= (lo == null ? 0 : lo);
  ok(typeof CR.on === 'boolean', 'LD1：C.crowd.on 要是 true／false');
  ok(Number.isInteger(CR.max) && CR.max >= 1 && CR.max <= 3, 'LD1：C.crowd.max（同時走動）1–3');
  ok(Number.isInteger(CR.firstRunFrom) && CR.firstRunFrom >= 1, 'LD1：C.crowd.firstRunFrom');
  ok(Array.isArray(CR.startInside) && CR.startInside.every(x => Array.isArray(x) && Number.isInteger(x[0]) && x[0] >= 0 && x[0] <= (CR.max || 3) && x[1] >= 0)
    && Math.abs(CR.startInside.reduce((t, x) => t + x[1], 0) - 1) < 1e-9, 'LD1：C.crowd.startInside 機率加起來要 1、人數 ≤ max');
  ok(CR.doorEvent && rng(CR.doorEvent.after) && CR.doorEvent.earlyLeave > 0 && CR.doorEvent.earlyLeave < 1, 'LD1：C.crowd.doorEvent');
  ok(rng(CR.gap, 1) && rng(CR.refill, 1), 'LD1：C.crowd.gap／refill 是 [min,max] 毫秒');
  ok(CR.doorLock && ['afterGuest', 'afterSwing', 'swing'].every(k => Number.isFinite(CR.doorLock[k]) && CR.doorLock[k] > 0), 'LD1：C.crowd.doorLock');
  ok(CR.kinds && CR.kinds.regular > 0 && CR.kinds.passer > 0, 'LD1：C.crowd.kinds（熟客／路人）');
  ok(Number.isFinite(CR.recent) && CR.recent >= 0, 'LD1：C.crowd.recent');
  const ST = CR.stops || {};
  ok(Array.isArray(ST.n) && ST.n.every(x => Number.isInteger(x[0]) && x[0] >= 1 && x[0] <= 3 && x[1] > 0) && rng(ST.dig, 1) && rng(ST.listen, 1) && rng(ST.pay, 1), 'LD1：C.crowd.stops（站數權重、各種停留毫秒）');
  ok(CR.likeW > 0 && CR.otherSide > 0 && CR.payP >= 0 && CR.payP <= 1 && CR.speed > 0 && CR.yieldSpeed >= CR.speed, 'LD1：C.crowd.likeW／otherSide／payP／speed／yieldSpeed');
  const TK = CR.talk || {};
  ok(Number.isInteger(TK.beatsPerVisit) && TK.beatsPerVisit >= 1 && Number.isInteger(TK.passerBeats) && TK.ringK > 0 && TK.ringK <= 1 && TK.trip >= 0 && TK.trip <= 1 && TK.loreP >= 0 && TK.loreP <= 1
    && Number.isInteger(TK.closeAt) && Number.isInteger(TK.memAt), 'LD1：C.crowd.talk 的數字');
  ok(TK.w && Object.keys(TK.w).every(k => CHAT_CATS.regular.includes(k)) && TK.expert && Object.keys(TK.expert).every(k => k === 'know' || CHAT_CATS.expert.includes(k)), 'LD1：C.crowd.talk.w／expert 的鍵要是台詞分類（周姐另有 know）');
  const BB = CR.bubble || {};
  ok(BB.min > 0 && BB.max >= BB.min && BB.holdMore > 0 && BB.narrowW > 0 && BB.quoteW >= BB.narrowW && BB.sideIfCover > 0 && BB.sideIfCover <= 1, 'LD1：C.crowd.bubble');
  ok(CR.hot && Array.isArray(CR.hot.rel) && CR.hot.rel.length === 4 && Number.isFinite(CR.hot.minY), 'LD1：C.crowd.hot');
  if (LC && LC.hot) ok(JSON.stringify(LC.hot) === JSON.stringify(CR.hot), 'LD1：C.crowd.hot 要＝shops/dip.json crowd.hot（一份數字兩處寫，改一邊要改另一邊）：' + JSON.stringify(LC.hot) + ' vs ' + JSON.stringify(CR.hot));
  ok(CR.title && CR.title.max >= 0 && CR.title.max <= 1 && Number.isFinite(CR.title.minY) && rng(CR.title.move, 1), 'LD1：C.crowd.title（標題回訪最多 1 位）');
  ok(CR.warm && CR.warm.batchMs > 0 && CR.warm.maxWait > 0, 'LD1：C.crowd.warm');
  ok(Array.isArray(CR.passers) && CR.passers.length === 4, 'LD1：C.crowd.passers 要 4 套凍結外觀（§2.3）');
  (CR.passers || []).forEach((p, k) => ok(p && typeof p === 'object', 'LD1：C.crowd.passers[' + k + '] 要是 spec 物件（凍結，不在執行期隨機）') && lookOk(p, 'LD1 crowd.passers[' + k + ']'));
  // C.encounter（附錄 A；第二階段才開）
  const EN = C.encounter || {};
  ok(typeof EN.on === 'boolean', 'LD1：C.encounter.on 要是 true／false（第一階段 false）');
  ok(['shelf', 'bag'].includes(EN.reward), 'LD1：C.encounter.reward 要是 shelf｜bag（§15 拍板題）');
  ok(Number.isInteger(EN.from) && EN.from >= 1 && EN.p > 0 && EN.p <= 1 && Number.isInteger(EN.perRound) && EN.perRound >= 1, 'LD1：C.encounter.from／p／perRound');
  ok(Array.isArray(EN.slots) && EN.slots.length && EN.slots.every(i => [0, 1, 2].includes(i)), 'LD1：C.encounter.slots 只准一般客人位 0–2（菁英、藏家位不出）');
  ok(EN.lapse > 0 && EN.short > 0 && EN.short <= 1, 'LD1：C.encounter.lapse／short');
  // 下半（主線 11-21 裁定：牌組身分跟強度分開）：強度＝等效位數（pos＋熟客 off＋posAdd）的客人參數＋短局；熟客一律出自己那 7 張（engine sparDeck 只補星）
  // posAdd：0–60 的整數（全程同一個位移）或照位數走的折線 [[第幾位, 位移], …]（第幾位 1–200 遞增、位移 0–60、2–12 個點；p2b 審查修正：全程 +31 前期太難後段太好打）
  const PA = EN.posAdd, paOk = !('posAdd' in EN) || (Number.isInteger(PA) && PA >= 0 && PA <= 60) ||
    (Array.isArray(PA) && PA.length >= 2 && PA.length <= 12 && PA.every((k, i) => Array.isArray(k) && k.length === 2 && Number.isInteger(k[0]) && k[0] >= 1 && k[0] <= 200 && Number.isInteger(k[1]) && k[1] >= 0 && k[1] <= 60 && (i === 0 || k[0] > PA[i - 1][0])));
  ok(paOk, 'LD1：C.encounter.posAdd（切磋強度的位移）要是 0–60 的整數，或 [[第幾位, 位移], …] 折線（第幾位遞增、位移 0–60）：' + JSON.stringify(PA));
  // tierAdd（合併審查 F2）：試煉第 k 階切磋客人再多幾位等效位數（第 0 階一律 0）——0–60 的整數（第 1 階起都一樣）或 [[第幾階, 位移], …] 折線（第幾階 1–試煉階數、遞增、位移 0–60、2–12 個點）
  const TA = EN.tierAdd, nT = ((C.trial || {}).tiers || []).length, taOk = !('tierAdd' in EN) || (Number.isInteger(TA) && TA >= 0 && TA <= 60) ||
    (Array.isArray(TA) && TA.length >= 2 && TA.length <= 12 && TA.every((k, i) => Array.isArray(k) && k.length === 2 && Number.isInteger(k[0]) && k[0] >= 1 && k[0] <= nT && Number.isInteger(k[1]) && k[1] >= 0 && k[1] <= 60 && (i === 0 || k[0] > TA[i - 1][0])));
  ok(taOk, 'LD1：C.encounter.tierAdd（試煉階級的切磋位移）要是 0–60 的整數，或 [[第幾階, 位移], …] 折線（第幾階 1–' + nT + ' 遞增、位移 0–60）：' + JSON.stringify(TA));
  ok(!('tierFrom' in EN) || (Number.isInteger(EN.tierFrom) && EN.tierFrom >= 1 && EN.tierFrom <= 200), 'LD1：C.encounter.tierFrom（第幾位起加試煉階級的切磋位移）要是 1–200 的整數：' + EN.tierFrom);
  ok(EN.short >= 0.5 && EN.short <= 0.9, 'LD1：C.encounter.short（短局比例）要在 0.5–0.9（太短一兩手就打完、1＝不是短局）：' + EN.short);
  ok(!('ace' in EN) || typeof EN.ace === 'boolean', 'LD1：C.encounter.ace（試調旗標：照一般客人機率帶王牌）要是 true／false');
  const ENC_KEYS = ['on', 'reward', 'from', 'p', 'perRound', 'slots', 'lapse', 'short', 'noDareRound', 'noStall', 'posAdd', 'tierAdd', 'tierFrom', 'ace', 'deckAt'];
  ok(Object.keys(EN).every(k => ENC_KEYS.includes(k)), 'LD1：C.encounter 有不認得的鍵（engine sparCfg 不讀）：' + Object.keys(EN).filter(k => !ENC_KEYS.includes(k)).join(' '));
  ok(!('cash' in EN) && !('skipCash' in EN) && ((C.waveC || {}).loot || {}).skipCash > 0, 'LD1：切磋不收改拿的錢＝C.waveC.loot.skipCash（不另設）');
  // C.crowdUi 第一階段三句
  const CU = C.crowdUi || {};
  ok(['intro', 'expertIntro', 'src'].every(k => typeof CU[k] === 'string' && CU[k]), 'LD1：C.crowdUi.intro／expertIntro／src');
  ok(/熟客/.test(CU.intro || '') && /周姐/.test(CU.expertIntro || '') && /\{artist\}/.test(CU.src || ''), 'LD1：crowdUi.intro 講「熟客」、expertIntro 講周姐、src 有 {artist}');
  ok(typeof CU.passer === 'string' && CU.passer, 'LD1：C.crowdUi.passer（路人泡泡第一行）');
  ok(['新', '店主', '原句'].includes(C.crowdUiTag), 'LD1：crowdUiTag');
  // C.crowdUi 第二階段切磋 14 句（棒 3d）：齊全、空格剛好是表上那幾個、唱片櫃／包包兩版各講各的去處
  for (const [k, want] of Object.entries(SPAR_UI)) {
    const v = CU[k], w = 'LD1：C.crowdUi.' + k + '（切磋）';
    if (!ok(typeof v === 'string' && v.trim(), w + ' 要是字串')) continue;
    const hs = holesOf(v);
    ok(hs.length === want.length && want.every(h => hs.includes(h)), w + ' 的空格要剛好是 ' + (want.map(h => '{' + h + '}').join('') || '（沒有）') + '，現在 ' + (hs.map(h => '{' + h + '}').join('') || '（沒有）') + '：' + v);
    if (want.includes('cash')) ok(/\$\{cash\}/.test(v), w + '：錢寫成「${cash}」（「$」字面＋{cash}，照「${n}」的寫法）：' + v);
  }
  ok(['', 'Any'].every(a => /唱片櫃/.test(CU['encRewardShelf' + a] || '') && /唱片櫃/.test(CU['encLootShelf' + a] || '') && /包包/.test(CU['encRewardBag' + a] || '') && /包包/.test(CU['encLootBag' + a] || '')),
    'LD1：crowdUi 切磋獎勵字：Shelf 版講唱片櫃、Bag 版講包包（C.encounter.reward 兩種模式）');
  ok(Object.keys(CU).filter(k => /^enc[A-Z]/.test(k)).every(k => k in SPAR_UI), 'LD1：C.crowdUi 有不認得的切磋鍵：' + Object.keys(CU).filter(k => /^enc[A-Z]/.test(k) && !(k in SPAR_UI)).join(' '));

  // ---- LD2 撞造型 ----
  const specOf = x => typeof x === 'string' ? Ch.npc(x) : x && typeof x === 'object' && ('head' in x || 'shirt' in x) ? Ch.fromDipChar(x) : Ch.normalize(x || {});
  const key = s => JSON.stringify(Ch.normalize(s));
  const chal = Object.entries(C.enemies || {}).map(([id, e]) => [id, specOf(e.avatar || e.spr || 'e0')]);
  const fams = new Set(HAT_ALWAYS_BANNED);
  chal.forEach(([, s]) => { if (HAT_FAMILY[s.hat]) fams.add(HAT_FAMILY[s.hat]); });
  const others = [['老闆', Ch.npc('owner')], ['玩家預設', Ch.DEFAULT]].concat((C.avatarsFallback || []).map((a, k) => ['玩家備用造型 ' + k, Ch.fromDipChar(a)]));
  const looks = REG_IDS.filter(id => R[id]).map(id => ['熟客 ' + id, R[id].look]).concat((CR.passers || []).map((p, k) => ['路人 ' + k, p]));
  const seenLook = new Map();
  for (const [w, look] of looks) {
    const s = specOf(look), f = HAT_FAMILY[s.hat];
    ok(!f || !fams.has(f), 'LD2 ' + w + '：帽子 ' + s.hat + '（' + f + '）跟挑戰者同族（挑戰者用到：' + [...fams].join('、') + '；只剩不在這幾族的帽子）');
    ok(!TOP_BANNED.includes(s.top), 'LD2 ' + w + '：上衣不准 ' + TOP_BANNED.join('／') + '（老闆、二手店老闆、藏家）');
    for (const [eid, cs] of chal) ok(key(cs) !== key(s), 'LD2 ' + w + '：外觀跟挑戰者 ' + eid + ' 完全相同');
    for (const [ow, os] of others) ok(key(os) !== key(s), 'LD2 ' + w + '：外觀跟' + ow + '完全相同');
    ok(!seenLook.has(key(s)), 'LD2 ' + w + '：外觀跟' + seenLook.get(key(s)) + ' 完全相同');
    seenLook.set(key(s), w);
  }

  // ---- LD3 台詞 ----
  const chat = C.chat, own = C.ownerChat;
  if (ok(Array.isArray(chat), 'LD3：C.chat 要是陣列') & ok(Array.isArray(own), 'LD3：C.ownerChat 要是陣列')) {
    const ids = new Set(), count = {};
    const lineOk = (l, w, isOwner) => {
      if (!ok(l && typeof l === 'object', w + '：不是物件')) return;
      ok(typeof l.id === 'string' && /^[A-Za-z0-9_-]+$/.test(l.id) && !ids.has(l.id), w + '：id 必填、只用英數 - _、全域唯一（' + l.id + '）');
      ids.add(l.id);
      const who = l.who, regular = REG_IDS.includes(who), expert = who === EXPERT_ID;
      ok(isOwner ? who === 'owner' : (regular || who === 'passer'), w + '：who 要是' + (isOwner ? ' owner' : ' C.regulars 的鍵或 passer') + '，現在 ' + who);
      const cats = isOwner ? CHAT_CATS.owner : who === 'passer' ? CHAT_CATS.passer : (expert ? CHAT_CATS.expert : CHAT_CATS.regular).concat(CHAT_CATS.enc);
      ok(cats.includes(l.cat), w + '：' + who + ' 的 cat 只准 ' + cats.join('／') + '，現在 ' + l.cat);
      ok(l.tag === '新', w + '：tag 要是「新」（全部進 LINES-REVIEW）');
      ok(l.draft == null, w + '：draft 佔位不准了（第一階段棒 3b、第二階段切磋棒 3d 都已搬齊）');
      const texts = typeof l.text === 'string' ? [l.text] : l.text;
      if (!ok(Array.isArray(texts) && texts.length >= 1 && texts.length <= 3 && texts.every(t => typeof t === 'string' && t.trim()), w + '：text 要是字串或 1–3 個字串（一個＝一個泡泡）')) return;
      const encCat = CHAT_CATS.enc.includes(l.cat);
      const sparTrip = l.cat === 'trip' && l.need && typeof l.need === 'object' && SPAR_NEED.filter(x => x in l.need);   // trip 的切磋輸贏
      ok(l.own == null || (l.own === true && l.cat === 'encLose'), w + '：own 只准 true、只用在 encLose（講「我的唱片」那句；審查修正 p2b）');
      ok(l.out == null || (l.out === true && ['encNo', 'encLapse', 'encWin', 'encVoid'].includes(l.cat)), w + '：out 只准 true、只用在 encNo／encLapse／encWin／encVoid（講要走了那句：說完直接出門）');
      if (encCat) {   // 切磋七類：導演硬指定 ctx.cat、encView 把字原樣給 duel.js（line／intro／lose／win）
        ok(typeof l.text === 'string', w + '：切磋句要單泡（text 是一個字串；對決畫面的 line／intro／lose／win 是單一字串）');
        ok(l.need == null, w + '：切磋句不帶 need（導演硬指定分類；need 不成立就挑不到句子）');
        ok(!holesOf(texts.join('')).length, w + '：切磋句不准有空格（encView 原樣交給 duel.js，不會填）：' + texts.join('／'));
      }
      const k = (isOwner ? 'owner' : who) + '.' + l.cat + (sparTrip && sparTrip.length ? '.' + sparTrip.join('+') : '');
      count[k] = (count[k] || 0) + (l.cat === 'hello' ? texts.length : 1);
      if (isOwner && l.cat === 'chat' && l.need && l.need.met) count['owner.met'] = (count['owner.met'] || 0) + 1;
      // need
      const need = l.need, tpl = !isOwner && TEMPLATE_CATS.includes(l.cat);   // 樣板＝架上樣板 shelf、周姐的 fact／loreIn／loreOut（卡片欄位空格只准用在這幾類）
      if (need != null && ok(need && typeof need === 'object' && !Array.isArray(need) && Object.keys(need).length, w + '：need 要是非空物件')) {
        for (const [nk, nv] of Object.entries(need)) {
          if (nk === 'at') { const at = Array.isArray(nv) ? nv : [nv]; ok(at.length && at.every(s => stopIds.includes(s)), w + '：need.at 要是 crowd.stops 的 id'); continue; }
          if (nk === 'onShelf') { ok(nv === true && l.cat === 'fact', w + '：need.onShelf 只准 true、只用在周姐的知識樣板（fact）'); continue; }
          if (ATTRS.includes(nk)) {
            ok(l.cat === 'fact', w + '：need.' + nk + '（三軸）只用在知識樣板（fact）');
            ok((Number.isInteger(nv) && nv >= 1 && nv <= 7) || /^\s*(>=|<=|>|<|=|==)?\s*[1-7]\s*$/.test(String(nv)) || (Array.isArray(nv) && nv.length === 2), w + '：need.' + nk + ' 要是 1–7、「>=4」或 [lo,hi]');
            continue;
          }
          if (nk === 'met') {
            ok(isOwner, w + '：need.met 只用在老闆句（見過某位熟客）');
            ok(nv === true || (typeof nv === 'string' && REG_IDS.includes(nv)) || (Array.isArray(nv) && nv.length && nv.every(x => REG_IDS.includes(x))), w + '：need.met 要是熟客 id、id 陣列或 true');
            continue;
          }
          if (SPAR_NEED.includes(nk)) {   // 第二階段：trip 的切磋輸贏
            ok(!isOwner && regular && l.cat === 'trip', w + '：need.' + nk + ' 只用在熟客的 trip（切磋輸贏）');
            ok(nv === true, w + '：need.' + nk + ' 只准 true（句子寫成「切磋贏了／輸了」）');
            ok(!(SPAR_NEED.every(x => x in need)), w + '：need.encWon／encLost 一句只帶一個');
            continue;
          }
          const tk = TRIP_NEED[nk];
          if (!ok(tk, w + '：need.' + nk + ' 不認得（只准 ' + Object.keys(TRIP_NEED).concat(['at', 'onShelf', 'o', 'h', 'c', 'met']).join('、') + '）')) continue;
          if (tk === 'int') ok(Number.isInteger(nv) && nv >= 1, w + '：need.' + nk + ' 要是正整數');
          if (tk === 'bool') ok(typeof nv === 'boolean', w + '：need.' + nk + ' 要是 true／false');
          if (tk === 'ace') ok((Array.isArray(nv) ? nv : [nv]).every(t => TIERS.includes(t)), w + '：need.ace 要是 hall／pearl／heresy');
        }
      }
      const N = need || {};
      // 空格白名單
      const allowed = isOwner || !tpl ? HOLES_HAND : HOLES_HAND.concat(HOLES_CARD);
      for (const t of texts) for (const h of holesOf(t)) {
        ok(allowed.includes(h), w + '：空格 {' + h + '} 不准（' + (tpl ? '樣板' : '手寫句') + '只准 ' + allowed.map(x => '{' + x + '}').join('') + '）');
        if (h === 'name') ok(typeof N.met === 'string', w + '：{name} 要配 need.met（指定哪一位熟客）');
      }
      ok(!/\{(?![a-zA-Z]+\})|(?<!\{[a-zA-Z]*)\}/.test(texts.join('')), w + '：大括號沒配對');
      // 防編造
      for (const t of texts) {
        const bare = noHoles(t), n = clen2(bare);
        ok(!FLOW_NAMES.test(t), w + '：不准寫死流派名（用 {title}）：' + t);
        ok(!/——/.test(t), w + '：不准破折號：' + t);
        if (tpl) {
          ok(!/[A-Za-z0-9０-９Ａ-Ｚａ-ｚ]/.test(bare), w + '：樣板拿掉空格後不准有數字、拉丁字母：' + t);
          ok(!/[《》]/.test(String(t).replace(/《\{album\}》/g, '')), w + '：樣板的《》只准包 {album}：' + t);
          ok(!FACT_TEMPLATE.test(t), w + '：樣板不准有事實字／收藏通則（首張、得獎、銷量、團員、製作人、廠牌、排行、影響了、名盤、首版、原版、壓片、音質…）：' + t);
          ok(!/\{(year|decade)\}.{0,3}[盤壓]/.test(t), w + '：{year}／{decade} 後面 3 字內不准有「盤」「壓」（卡池沒有壓片年份，只准說發行）：' + t);
          const has = ATTRS.filter(a => EVAL[a].test(t)), axes = ATTRS.filter(a => a in N);
          ok(has.every(a => axes.includes(a)), w + '：評價字（' + has.map(a => ZH[a]).join('、') + '）要配同一軸的 need（冷門＝o、硬蕊＝h、經典＝c）：' + t);
          if (l.cat === 'fact' && (/\{bin\}/.test(t) || THIS_BIN.test(t))) ok(N.onShelf === true, w + '：說「在哪一箱」的知識樣板要 need.onShelf（那張真的在架上）：' + t);
          ok(n <= 28, w + '：樣板拿掉空格後 ≤28 字，現在 ' + n + '：' + t);
        } else {
          ok(!/[A-Za-z0-9０-９Ａ-Ｚａ-ｚ]/.test(bare), w + '：手寫句不准有拉丁字母、阿拉伯數字（真的藝人、專輯、年份只能從樣板空格來）：' + t);
          ok(!/[《》]/.test(t), w + '：手寫句不准有《》：' + t);
          ok(!ZH_YEAR.test(t), w + '：手寫句不准兩個以上中文數字接「年」（七二年、八〇年代…）：' + t);
          ok(!FACT_HAND.test(t), w + '：手寫句不准有事實字（年代、得獎、銷量、排行、出道、團員、製作人、廠牌、首張、遺作、影響了…）：' + t);
          ok(n <= (who === 'passer' ? 20 : 28), w + '：每泡 ≤' + (who === 'passer' ? 20 : 28) + ' 字，現在 ' + n + '：' + t);
        }
        if (THIS_BIN.test(t) && SOUND.test(t)) ok(Array.isArray(N.at) ? N.at.length : !!N.at, w + '：「這箱」＋聲音描述要綁站位 need.at（換箱就假）：' + t);
      }
    };
    chat.forEach((l, k) => lineOk(l, 'LD3 chat[' + k + '] ' + (l && l.id), false));
    own.forEach((l, k) => lineOk(l, 'LD3 ownerChat[' + k + '] ' + (l && l.id), true));
    // 每類句數 ≥ §5.7 第一階段表（棒 3b 搬句後一律驗；hello 算泡泡數）。老闆講到的熟客要每位都有（need.met 的 id 涵蓋 6 位）
    for (const id of REG_IDS) for (const [cat, want] of Object.entries(id === EXPERT_ID ? CHAT_TARGET.expert : CHAT_TARGET.regular))
      ok((count[id + '.' + cat] | 0) >= want, 'LD3：' + id + ' 的 ' + cat + ' 要 ≥' + want + ' 句（§5.7 第一階段' + (cat === 'trip' ? '；不算切磋輸贏那兩類' : '') + '），現在 ' + (count[id + '.' + cat] | 0));
    // 第二階段切磋（§5.7：每位 12 句＝嗆 3、接了 1、改天 2、沒理他 1、他輸了 2、他贏了 2、作廢 1；trip 切磋輸贏 五位 1＋1、周姐 1）
    for (const id of REG_IDS) {
      for (const [cat, want] of Object.entries(CHAT_TARGET.enc))
        ok((count[id + '.' + cat] | 0) >= want, 'LD3：' + id + ' 的切磋 ' + cat + ' 要 ≥' + want + ' 句（§5.7 第二階段），現在 ' + (count[id + '.' + cat] | 0));
      const won = count[id + '.trip.encWon'] | 0, lost = count[id + '.trip.encLost'] | 0;
      if (id === EXPERT_ID) ok(won + lost >= CHAT_TARGET.tripEnc.expert.any, 'LD3：' + id + ' 的 trip 切磋輸贏（need.encWon／encLost）合計要 ≥' + CHAT_TARGET.tripEnc.expert.any + ' 句（§5.7「3＋1」），現在 ' + (won + lost));
      else for (const [nk, want] of Object.entries(CHAT_TARGET.tripEnc.regular))
        ok((count[id + '.trip.' + nk] | 0) >= want, 'LD3：' + id + ' 的 trip need.' + nk + ' 要 ≥' + want + ' 句（§5.7「6＋2」），現在 ' + (count[id + '.trip.' + nk] | 0));
    }
    for (const [who, T] of [['passer', CHAT_TARGET.passer], ['owner', CHAT_TARGET.owner]]) for (const [cat, want] of Object.entries(T))
      ok((count[who + '.' + cat] | 0) >= want, 'LD3：' + who + ' 的 ' + cat + ' 要 ≥' + want + ' 句（§5.7 第一階段），現在 ' + (count[who + '.' + cat] | 0));
    ok((count['owner.met'] | 0) >= CHAT_TARGET.ownerMet, 'LD3：老闆「店裡的事」（chat＋need.met）要 ≥' + CHAT_TARGET.ownerMet + ' 句，現在 ' + (count['owner.met'] | 0));
    const metWho = new Set(own.filter(l => l && l.need && l.need.met).flatMap(l => [].concat(l.need.met)));
    ok(REG_IDS.every(id => metWho.has(id)), 'LD3：老闆「店裡的事」要每位熟客都有（need.met），缺 ' + REG_IDS.filter(id => !metWho.has(id)).join(' '));
    // 老闆句講到某位熟客的名字，就要 need.met 那位（沒見過的人不能先被講）
    for (const l of own) for (const t of [].concat(l && l.text || [])) for (const id of REG_IDS) {
      const nm = (R[id] || {}).name;
      if (nm && String(t).includes(nm)) ok(l.need && [].concat(l.need.met).includes(id), 'LD3 ownerChat ' + l.id + '：講到「' + nm + '」要 need.met 含 ' + id + '：' + t);
    }
    // 樣板用到的卡片空格都要在 C.crowdFact 的填法表裡（填法見 content.js 註解）
    const usedHoles = new Set(chat.filter(l => l && TEMPLATE_CATS.includes(l.cat)).flatMap(l => [].concat(l.text || []).flatMap(holesOf)).filter(h => HOLES_CARD.includes(h)));
    crowdFactProblems(C, usedHoles).forEach(m => bad.push(m));
  }

  // ---- LD4 熟客牌組 ----
  const hasIntro = artistIntro();
  const taken = new Map();
  Object.entries(C.enemies || {}).forEach(([eid, e]) => (e.deck || []).forEach(id => taken.set(id, '客人 ' + eid)));
  Object.entries(C.gifts || {}).forEach(([t, g]) => (g || []).forEach(id => taken.set(id, '老闆四張 ' + t)));
  ((C.bargain || {}).pool || []).forEach(id => taken.set(id, '特價箱'));
  Object.entries(C.aces || {}).forEach(([t, id]) => taken.set(id, '王牌 ' + t));
  const binAll = k => new Set(((C.bins || {})[k] || {}).all || []);
  for (const id of REG_IDS) {
    const en = (R[id] || {}).enc || {}, w = 'LD4 regulars.' + id + '.enc.deck';
    const deck = en.deck;
    if (!ok(Array.isArray(deck) && deck.length === 7 && new Set(deck).size === 7, w + '：要 7 張不重複，現在 ' + (deck || []).length)) continue;
    const cs = [];
    for (const cid of deck) {
      const c = CARDS[cid];
      if (!ok(c, w + '：找不到卡 ' + cid)) continue;
      cs.push(c);
      ok(!c.pool, w + '：' + cid + ' 要是核心卡（cards.js；有介紹、封面、試聽），不是精選新卡');
      ok(!c.tier, w + '：' + cid + ' 是王牌／頂點卡');
      ok(!taken.has(cid), w + '：' + cid + ' 跟' + taken.get(cid) + '重複');
      if (hasIntro) ok(hasIntro(c.artist), w + '：' + cid + ' 的藝人（' + c.artist + '）在 data/artist-intros 沒有介紹');
      taken.set(cid, '熟客 ' + id);
    }
    if (cs.length !== 7 || !ATTRS.includes(en.main)) continue;
    ok(E.deckMain(cs, en.taste) === en.main, w + '：主屬性（deckMain）要＝enc.main ' + en.main + '，現在 ' + E.deckMain(cs, en.taste));
    const sp = cs.filter(c => strictPeak(c) === en.main).length;
    ok(sp >= 4, w + '：嚴格峰值落在主屬性（' + ZH[en.main] + '）的要 ≥4 張，現在 ' + sp);
    const likeBins = ((R[id] || {}).likes || []).map(s => stopBin[s]).filter(Boolean);
    if (likeBins.length) { const n = cs.filter(c => likeBins.some(b => binAll(b).has(c.id))).length; ok(n >= 4, w + '：≥4 張要在他愛停那幾箱（' + likeBins.join('／') + '），現在 ' + n); }
  }
  return bad;
}
// C.crowdFact（卡片空格怎麼填；§6.2，棒 3b）：導演照這張表組 ctx.card.vars，填不出來給 null（chatPick usable 判掉那句）。這裡驗表本身跟卡池、主站對得上
const FACT_GENRES = ['rock', 'jazz', 'electronic', 'soul', 'hiphop', 'classical', 'folk', 'pop', 'world', 'blues'];
export function crowdFactProblems(C, usedHoles) {
  const bad = [], F = C.crowdFact;
  const ok = (cond, msg) => { if (!cond) bad.push('LD3 crowdFact：' + msg); return !!cond; };
  if (!ok(F && typeof F === 'object', 'C.crowdFact（卡片空格的填法表）沒有')) return bad;
  ok(Number.isInteger(F.minYear) && F.minYear >= 1900 && F.minYear <= 1960, 'minYear（比它早的 year／decade 給 null）要是 1900–1960 的整數');
  ok(Number.isInteger(F.axisMin) && F.axisMin >= 3 && F.axisMin <= 5, 'axisMin 要是 3–5');
  ok(Number.isInteger(F.maxFilled) && F.maxFilled >= 28 && F.maxFilled <= 48, 'maxFilled（樣板填完的字數上限，§5.4 是 40）');
  ok(JSON.stringify(F.axis) === JSON.stringify(ZH), 'axis 要剛好是 ' + JSON.stringify(ZH) + '（三軸只准經典／冷門／硬蕊）');
  ok(F.region && JSON.stringify(Object.keys(F.region).sort()) === JSON.stringify(['jp', 'tw', 'zh']) && Object.values(F.region).every(v => typeof v === 'string' && v && !/[A-Za-z0-9]/.test(v)),
    'region 只准 tw／jp／zh 三個中文名（xx 其他地區不填，§6.2）');
  ok(F.genre && JSON.stringify(Object.keys(F.genre).sort()) === JSON.stringify(FACT_GENRES.slice().sort()), 'genre 要剛好是十類（' + FACT_GENRES.join(' ') + '）');
  // 十類中文＝主站 genre-tree.json 頂層的 zh（主站改名要一起改）
  let tree = null; try { tree = JSON.parse(fs.readFileSync(path.join(ROOT, 'genre-tree.json'), 'utf8')); } catch (_) {}
  if (tree && Array.isArray(tree.genres)) for (const g of tree.genres) if (FACT_GENRES.includes(g.id)) ok(F.genre && F.genre[g.id] === g.zh, 'genre.' + g.id + '＝「' + (F.genre || {})[g.id] + '」，主站 genre-tree.json 是「' + g.zh + '」');
  // 卡池每張都對得到（曲風、頻率）；地區只出現 tw／jp／zh／xx
  const CARDS = C.cards || {}, names = (C.tunes || {}).names || {};
  let gBad = 0, tBad = 0, rBad = 0;
  for (const c of Object.values(CARDS)) {
    if (!(F.genre || {})[((c.genres || [])[0]) || '']) gBad++;
    if (!names[c.tune]) tBad++;
    if (!['tw', 'jp', 'zh', 'xx'].includes(c.region)) rBad++;
  }
  ok(!gBad, gBad + ' 張卡的 genres[0] 在 genre 表找不到中文');
  ok(!tBad, tBad + ' 張卡的 tune 在 C.tunes.names 找不到');
  ok(!rBad, rBad + ' 張卡的 region 不是 tw／jp／zh／xx（表要補，或改成 null）');
  for (const h of usedHoles || []) ok(HOLES_CARD.includes(h), '樣板用到 {' + h + '}，填法表沒有這個空格');
  return bad;
}
// 提醒（不擋）：第二階段的切磋類佔位；C.crowdFact 每個空格在卡池填得到幾張（填不到＝那句對那張不出）
export function crowdNotes(C) {
  const all = [].concat(Array.isArray(C.chat) ? C.chat : [], Array.isArray(C.ownerChat) ? C.ownerChat : []);
  const d = all.filter(l => l && l.draft).length;
  const out = d ? ['切磋類還有 ' + d + ' 句佔位（draft；第二階段棒 3d 搬句）'] : [];
  const F = C.crowdFact, cards = Object.values(C.cards || {});
  if (F && cards.length) {
    const n = { year: 0, region: 0, axis: 0 };
    for (const c of cards) {
      if (c.year >= F.minYear) n.year++;
      if ((F.region || {})[c.region]) n.region++;
      const ax = ATTRS.map(a => c[a]).sort((x, y) => y - x);
      if (ax[0] >= F.axisMin && ax[0] > ax[1]) n.axis++;
    }
    out.push('卡片空格填得到的張數（全池 ' + cards.length + '）：{year}{decade} ' + n.year + '、{region} ' + n.region + '、{axis} ' + n.axis + '；{artist}{album}{genre}{tune} 全部；{bin} 只在那張真的在架上');
  }
  return out;
}

// ================================================================================================
// v4 劇本（SPEC-v4 §2.5.3、§2.5.4；D §2、§3）
// ================================================================================================
const STEP_DO = ['walk', 'pose', 'emote', 'wait', 'door', 'face', 'hold', 'hide', 'give', 'floor', 'sfx', 'par', 'seq'];
const ACTORS = ['p', 'o', 'f', 'q1', 'q2'];   // r1（站樁熟客）退役（SPEC-H §2.4、LD5）：活店的人用走動槽 w1–w3，導演 crowd.js 管，不進劇本
const SET_KEYS = ['put', 'door', 'notes', 'sprite', 'hide', 'sil', 'pose', 'emote', 'stamp'];
const UIS = ['guess', 'acePick', 'recs', 'bargain', 'duel', 'stake', 'relic', 'map'];
export function scriptProblems(C, L) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const S = C.script || {};
  const spots = (L && L.spots) || null;
  const spotOk = (x, w) => {
    if (Array.isArray(x)) return ok(x.length >= 2 && x.every(n => typeof n === 'number' || typeof n === 'boolean'), w + '：座標 ' + JSON.stringify(x));
    if (typeof x === 'string' && x[0] === '@') return true;
    if (ACTORS.includes(x)) return true;
    return ok(!spots || (typeof x === 'string' && spots[x]), w + '：站位 ' + x + ' 不在 shops/dip.json');
  };
  // 一串步驟：檢查形狀；回傳這串裡依序出現的 [do, id, name] 給順序檢查
  const steps = (list, w) => {
    if (list == null) return;
    if (!ok(Array.isArray(list), w + '：步驟要是陣列')) return;
    const walked = new Set();
    list.forEach((st, k) => {
      const ww = w + '[' + k + ']';
      if (!ok(st && STEP_DO.includes(st.do), ww + '：do 不合法 ' + (st && st.do))) return;
      if (st.do === 'par' || st.do === 'seq') { ok(Array.isArray(st.steps) && st.steps.length, ww + '：' + st.do + ' 沒有 steps'); (st.steps || []).forEach((x, j) => steps([x], ww + '.steps[' + j + ']')); if (st.do === 'seq') (st.steps || []).forEach(x => { if (x && x.do === 'walk') walked.add(x.id); }); return; }
      if (['walk', 'pose', 'emote', 'face', 'hold', 'hide'].includes(st.do)) ok(ACTORS.includes(st.id), ww + '：人物 ' + st.id);
      if (st.do === 'walk') { ok(Array.isArray(st.to) && st.to.length, ww + '：walk 沒有 to'); (st.to || []).forEach(x => spotOk(x, ww)); ok(st.speed == null || st.speed > 0, ww + '：speed'); walked.add(st.id); }
      if (st.do === 'pose') {
        ok(st.name === null || typeof st.name === 'string', ww + '：pose name');
        // D §3：翻箱姿勢在箱子前（劇本一定先 walk 完才 pose dig，shop.js 的 dig 會蓋過走路）
        if (st.name === 'dig') ok(walked.has(st.id), ww + '：pose dig 之前，同一串步驟裡要先 walk（翻箱在箱子前，不是邊走邊翻）');
      }
      if (st.do === 'face') spotOk(st.to, ww);
      if (st.do === 'wait') ok(st.ms > 0, ww + '：wait ms');
      if (st.do === 'door') ok(['open', 'swing', 'close', 'shut'].includes(st.mode), ww + '：door mode');
      if (st.do === 'floor') spotOk(st.at, ww);
    });
  };
  const flat = list => { const out = []; const go = l => (l || []).forEach(x => { if (!x) return; if (x.do === 'par' || x.do === 'seq') go(x.steps); else out.push(x); }); go(list); return out; };
  ok(!('retorts' in C) && !('junk' in C) && !('junkLabel' in C) && !('habits' in C) && !('habitLabels' in C), 'v3 外殼墊片（retorts／junk／junkLabel／habits／habitLabels）要刪掉');
  ok(Object.values(C.bins || {}).every(b => !('ids' in b)), 'C.bins[*].ids（v3 墊片）要刪掉');
  ok(sameSet(Object.keys(S), ['prologue', 'epilogueWin', 'bossEnter', 'bossDown', 'dead', 'again', 'drop']), 'C.script 要剛好是 prologue／epilogueWin／bossEnter／bossDown／dead／again／drop（無限試煉沒有打烊：clear 換成每輪打倒藏家的 bossDown；quietPrologue、afterPrologue 刪掉；drop＝打贏客人領獎前的掉落旁白，店主 11-13）');
  // 掉落旁白（店主 11-13 §0）：旁白一句、店主句、逐字
  { const Dr = S.drop || [];
    ok(Dr.length === 1 && Dr[0].id === 'G1' && Dr[0].who === '' && Dr[0].tag === '店主' && Dr[0].text === '對方似乎掉落了什麼……' && !Dr[0].ui, 'script.drop：旁白「對方似乎掉落了什麼……」一句（店主）'); }
  for (const [key, beats] of Object.entries(S)) {
    if (!ok(Array.isArray(beats) && beats.length, 'script.' + key + '：不是陣列')) continue;
    beats.forEach((b, k) => {
      const w = 'script.' + key + '[' + k + '] ' + (b && b.id);
      if (!ok(b && b.id, 'script.' + key + '[' + k + ']：沒有 id')) return;
      if (b.set) { for (const sk of Object.keys(b.set)) ok(SET_KEYS.includes(sk), w + '：set.' + sk + ' 不認得');
        for (const sk of ['put', 'sprite', 'hide', 'sil', 'pose', 'emote']) if (b.set[sk]) for (const id of Object.keys(b.set[sk])) ok(ACTORS.includes(id), w + '：set.' + sk + ' 人物 ' + id);
        if (b.set.put) for (const x of Object.values(b.set.put)) spotOk(x, w + ' set.put'); }
      steps(b.pre, w + ' pre'); steps(b.act, w + ' act');
      ok(!b.ui || UIS.includes(b.ui), w + '：ui ' + b.ui);
      ok(!b.stage && !b.give, w + '：v3 的 stage／give 欄位要拿掉');
      if (b.music && typeof b.music === 'object') ok(b.music.stop > 0, w + '：music.stop 要淡出毫秒數');
    });
  }
  const P = S.prologue || [], Ep = S.epilogueWin || [];
  const ids = P.map(b => b.id).join(' ');
  ok(ids === 'O2 O3 O4 O5a O5b O6 O7 O8r O8w O9 O10 O11 O12 O13 O14 O15 O16 O17 O18 O19 O20 O21', 'script.prologue 的 id 與順序（O1 拿掉、內容在開頭旁白 C.intro；店主 11-10）：' + ids);
  // 開頭旁白＋玻璃倒影捏人（店主 11-10 定稿，逐字）
  const IN = C.intro || {}, INL = IN.lines || [];
  ok(INL.map(x => x.id).join(' ') === 'I1 I2' && INL[0].text === '雨下個不停。巷子深處，有人輕輕推開那扇半掩的門，門上的鈴鐺清脆一響，隨即被雨聲吞沒。' && INL[1].text === '玻璃門晃了晃，映出推門的人。' && INL.every(x => x.tag === '店主'), 'C.intro.lines：I1、I2 逐字（店主）');
  ok(IN.title === '玻璃上的你' && IN.skip === '先隨便', 'C.intro：捏人標題「玻璃上的你」、略過鈕「先隨便」');
  ok(!P.some(b => /下著雨。你推開/.test(typeof b.text === 'string' ? b.text : '')), '原本的 O1「下著雨。你推開……」不准回來（已在開頭旁白）');
  ok(Ep.map(b => b.id).join(' ') === 'E1 E2 E3 E4 E5 E6 E7 E8 E9 E10 E11', 'script.epilogueWin 的 id 與順序：' + Ep.map(b => b.id).join(' '));
  const by = id => P.concat(Ep).find(b => b.id === id) || {};
  // D §2 店主改的句子（逐字）
  const TL = C.tonightLines || {};
  for (const t of TIERS) ok(Array.isArray(TL[t]) && TL[t].length === 2 && TL[t].every(x => typeof x === 'string' && x), 'tonightLines.' + t + '：兩句');
  ok(JSON.stringify(by('O5a').text) === JSON.stringify({ hall: TL.hall && TL.hall[0], pearl: TL.pearl && TL.pearl[0], heresy: TL.heresy && TL.heresy[0] }), 'O5a＝今晚那張的第一句描述');
  ok(JSON.stringify(by('O5b').text) === JSON.stringify({ hall: TL.hall && TL.hall[1], pearl: TL.pearl && TL.pearl[1], heresy: TL.heresy && TL.heresy[1] }), 'O5b＝今晚那張的第二句描述');
  const D2 = { O7: '「這三張，是我這裡最貴的三張。」他沒抬頭。「你覺得，現在播的是哪張？」', O8r: '「……你眼光真不錯。」老闆終於抬起頭來，看著你。', O8w: '「可惜啊。」老闆終於抬起頭來，看著你。',
    O9: '「跟你很有緣，挑一張送你。」', O10: '「這張是我的私人收藏。今天讓給你。」', O12: '「這四張也很適合你。收下吧。」', O13: '「特價區那邊，隨便挑三張。」',
    O14: '你把八張唱片放到櫃檯上。老闆一張一張看過，替你收進紙袋。', E8: '「年輕人，有空再來這邊走走，與大家交流音樂。」', E10: '「聽說這裡有個新來的，品味不錯？」' };
  for (const [id, t] of Object.entries(D2)) ok(by(id).text === t, id + ' 要逐字是「' + t + '」');
  ok(by('O7').ui === 'guess' && by('O9').ui === 'acePick' && by('O12').ui === 'recs' && by('O13').ui === 'bargain' && by('O21').ui === 'duel', '序章的面板：O7 猜歌、O9 挑王牌、O12 四張、O13 特價區、O21 接受對決');
  ok(by('O8r').if === 'guessRight' && by('O8w').if === 'guessWrong', 'O8r／O8w：猜中／猜錯');
  ok(by('O9').prompt === '（挑一張。）' && by('O12').prompt === '（老闆把四張盤遞給你。）' && by('O12').button === '收下這四張', 'O9／O12 的面板字（原句）');
  ok(JSON.stringify(by('O21').prompts) === JSON.stringify(['▶ 接受對決（看向老闆）', '▶ 接受對決（手伸進袋子，準備出招）']), 'O21：兩顆接受對決（D §2，沒有轉身離開）');
  ok(by('E10').who === '？？？' && by('E11').ui === 'map' && by('E4').ui === 'stake' && by('E7').ui === 'relic', 'E4 撿起面板、E7 配件、E10 ？？？、E11 今晚來客');
  // 音樂：O4 開始播今晚那張、O10 說完才停（O11 淡出 1.5 秒）
  ok(by('O4').music === 'tonight' && !by('O10').music && by('O11').music && by('O11').music.stop === 1500 && by('O11').set && by('O11').set.notes === false, '音樂：O4 開始、O11 才淡出 1500 ms（私人收藏那句說完之後）');
  // O2 接手原本 O1 的站位（你在門口、門晃、門口那位先藏）；r1 退役（SPEC-H LD5）：劇本裡任何地方都不准再出現 r1（序章與收尾藏人改由導演 crowd.js 的 off 模式管）
  ok(by('O2').set && by('O2').set.hide && by('O2').set.hide.f === true && by('O2').set.door === 'swing' && by('O2').set.put && by('O2').set.put.p === 'door', 'O2：你在門口、門晃、f 藏起來（接手原本 O1 的站位）');
  ok(!JSON.stringify(S).includes('"r1"') && !JSON.stringify((C.blocking || {})).includes('"r1"'), 'LD5：劇本與 C.blocking 不准再有 r1（站樁熟客退役，SPEC-H §2.4）');
  ok(!ACTORS.includes('r1'), 'LD5：ACTORS 不准有 r1');
  // 走位（D §3）
  const fl = id => flat((by(id).pre || []).concat(by(id).act || []));
  const o11 = fl('O11').map(x => x.do + ':' + (x.id || '') + ':' + (x.name || (x.to || []).join('>')));
  ok(o11.join(' ') === 'walk:o:dig1 pose:o:dig walk:o:dig2 pose:o:dig hold:o:', 'O11：老闆走到 dig1 翻 → dig2 翻 → 拿著唱片（' + o11.join(' ') + '）');
  const o14pre = flat(by('O14').pre), o14act = flat(by('O14').act);
  ok(o14pre.some(x => x.do === 'walk' && x.id === 'o' && x.to.includes('counter')) && o14pre.some(x => x.do === 'walk' && x.id === 'p' && x.to.includes('pay')), 'O14 pre：老闆走回櫃檯、你走到 pay');
  ok(o14act.map(x => x.do).join(' ') === 'pose give pose' && o14act[0].name === 'busy', 'O14 act：老闆看過（busy）→ 封面飛進包包 → 收手');
  ok(P.slice(0, P.indexOf(by('O14'))).every(b => !flat((b.pre || []).concat(b.act || [])).some(x => x.do === 'give')), 'O14 之前沒有任何 give（包包條一律空）');
  ok(fl('O20').some(x => x.do === 'walk' && x.id === 'o' && x.to.includes('mid') && x.speed === 36), 'O20：老闆緩步（36）走到兩人之間（mid）');
  const pre21 = P.slice(P.indexOf(by('O15')), P.indexOf(by('O21')) + 1).map(fl).flat();
  ok(!pre21.some(x => x.do === 'walk' && (x.to || []).some(t => ['duelE', 'duelP', 'ref'].includes(t))), 'O15–O21：誰都還不去唱盤（嗆聲在後走道）');
  const e4 = fl('E4').map(x => x.do + ':' + (x.id || x.at || x.mode || '') + ':' + ((x.to || []).join('>')));
  ok(e4[0] === 'floor:duelE:' && e4.indexOf('walk:f:door') >= 0 && e4.indexOf('door:swing:') === e4.indexOf('walk:f:door') + 1 && e4[e4.length - 1] === 'hide:f:', 'E4：地上留一張盤 → 他走到門口 → 門才晃 → 藏起來（' + e4.join(' ') + '）');
  const td = flat((C.blocking || {}).toDuel), last = {};
  td.forEach(x => { if (x.do === 'walk') last[x.id] = x.to[x.to.length - 1]; });
  ok(last.o === 'ref' && last.f === 'duelE' && last.p === 'duelP', 'C.blocking.toDuel：老闆 ref、他 duelE、你 duelP（' + JSON.stringify(last) + '）');
  steps((C.blocking || {}).toDuel, 'blocking.toDuel'); steps((C.blocking || {}).toSale, 'blocking.toSale');
  ok((C.blocking || {}).speed > 0, 'C.blocking.speed');
  ok((S.bossEnter || []).some(b => b.text === '「讓我看看你的品味有幾兩重。」'), 'bossEnter：藏家進門用原版 BOSS_LINES[0]');
  ok(!(S.bossDown || []).some(b => /有空再來這邊走走/.test(b.text)), 'bossDown：「年輕人，有空再來…」回到序章收尾 E8，打倒藏家不再說');
  ok((S.bossDown || []).length && (S.bossDown || []).every(b => !b.if) && (S.bossDown || []).some(b => b.ui === 'stake'), 'bossDown：每輪都播（沒有 if）、有翻開王牌的面板（ui stake）');
  ok(!Object.values(S).flat().some(b => b && (b.if === 'firstClear' || /第二夜|打烊|今晚就到這/.test(typeof b.text === 'string' ? b.text : JSON.stringify(b.text || '')) || /第二夜/.test(JSON.stringify(b.set || {})))), 'script：沒有打烊、第二夜預告、「今晚就到這」（無限試煉）');
  return bad;
}

// ================================================================================================
// v4 教學步驟（SPEC-v4 §2.5.5；C.tutorial.steps／learned／ui，B2）
// ================================================================================================
export function tutorialProblems(C) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const T = C.tutorial || {};
  const steps = T.steps || [];
  if (!ok(steps.length > 0, 'tutorial.steps：沒有步驟')) return bad;
  ok(new Set(steps.map(s => s.id)).size === steps.length, 'tutorial.steps：id 重複');
  const LEARN = { L1: '同色比星數', L2: '冷門剋經典：大家都聽過的不稀奇', L3: '經典剋硬蕊：比不過名盤', L4: '硬蕊剋冷門：稀有不等於有料', L5: '差 2 星以上：剋不動', L6: '王牌 7 星，一場用一次' };   // L6：FIXLIST 2；L2–L5 店主 11-12（v5 教學）
  ok(JSON.stringify(T.learned) === JSON.stringify(LEARN), 'tutorial.learned 要＝§2.5.5 的 L1–L6');
  ok(T.ui && ['who', 'learnedPrefix', 'wrong', 'skipTut', 'replay', 'learnedTitle'].every(k => typeof T.ui[k] === 'string' && T.ui[k]), 'tutorial.ui 的鍵');
  let hand = 1, thrown = false;
  const handOf = [], learnOrder = [];
  steps.forEach((s, k) => {
    const w = 'tutorial.steps.' + s.id;
    ok(['say', 'do'].includes(s.kind), w + '：kind 只有 say／do');
    const res = s.kind === 'say' && (s.target || []).includes('result');
    ok(!res || thrown, w + '：結算時講的步驟（target result）要在「丟」之後');
    if (!res) thrown = false;
    handOf.push(res ? hand - 1 : hand);
    const texts = s.text && typeof s.text === 'object' ? s.text : null;
    if (texts) ok(TIERS.every(t => typeof texts[t] === 'string' && texts[t]), w + '：依王牌分句要三張都有');
    else ok(typeof s.text === 'string' && s.text, w + '：沒有台詞');
    if (s.tri) ok(Array.isArray(s.tri) && s.tri.every(x => ['oc', 'ch', 'ho'].includes(x)), w + '：tri 只能是 oc／ch／ho');
    if (s.learn) { ok(LEARN[s.learn], w + '：learn ' + s.learn + ' 不在 learned'); learnOrder.push(s.learn); }
    // FIXLIST 11：每手「點那張（allow {pick}、point／target card:pick）→ 點那個屬性＝丟（allow {pick, throw}、point／target pick、look card:pick）」
    if (s.kind === 'do') {
      const al = s.allow || {};
      if (al.throw) {
        ok(al.pick === true && s.point === 'pick' && JSON.stringify(s.target) === JSON.stringify(['pick']) && (s.look || []).includes('card:pick'), w + '：點屬性（丟）那步 allow {pick,throw}、point pick、target [pick]、look 含 card:pick');
        thrown = true; hand++;
      } else ok(al.pick === true && s.point === 'card:pick' && JSON.stringify(s.target) === JSON.stringify(['card:pick']), w + '：點那張的那步 allow {pick}、point card:pick、target [card:pick]');
      ok(s.spread == null, w + '：沒有 spread（v5 手風琴：沒有「點牌堆攤開」那一步）');
    }
  });
  ok(hand - 1 === 6, 'tutorial.steps：六手各一個「丟」（現在 ' + (hand - 1) + '）');
  ok(JSON.stringify(learnOrder) === JSON.stringify(['L1', 'L2', 'L3', 'L4', 'L5', 'L6']), 'tutorial.steps：小卡 L1–L6 各學一次、照課表順序（' + learnOrder.join(',') + '）');
  // 每手：先點、再丟（點的那步在同一手的丟之前）
  for (let h = 1; h <= 6; h++) {
    const ks = steps.map((s, k) => k).filter(k => handOf[k] === h && steps[k].kind === 'do');
    ok(ks.length === 2 && !steps[ks[0]].allow.throw && steps[ks[1]].allow.throw, 'tutorial 第 ' + h + ' 手：先點那顆、再丟');
  }
  const first = steps[0];
  ok(first.kind === 'say' && (first.target || []).includes('e-hint'), 'tutorial：第 1 手前一句說明提示（target e-hint）');
  ok(!steps.some(s => /攤開/.test(typeof s.text === 'string' ? s.text : JSON.stringify(s.text || ''))), 'tutorial：泡泡不再說「攤開」（v5 手風琴：點一張就打開那張）');
  const hint1 = ((C.hints || {})[(T.hints || [])[0] && T.hints[0][0]] || []).find(h => h.id === (T.hints || [])[0]);
  const after1 = steps.filter((s, k) => handOf[k] === 1 && s.kind === 'say' && (s.target || []).includes('result'));
  const callouts = steps.filter(s => hint1 && typeof s.text === 'string' && s.text.includes('『' + hint1.key + '』就是'));
  ok(hint1 && callouts.length === 1 && after1.includes(callouts[0]), 'tutorial：第 1 手結算後老闆點破關鍵字『' + (hint1 && hint1.key) + '』一次');
  for (const t of TIERS) {
    const pick = (((T.script || {})[t]) || {}).pick || [];
    ok(pick.length === 6, 'tutorial.script.' + t + '.pick：6 手');
    pick.forEach((p, k) => ok(p === 'ace' || p === 'blocked:o' || (p && (C.gifts[t] || []).includes(p.id) && ATTRS.includes(p.attr)), 'tutorial.script.' + t + '.pick[' + k + ']：' + JSON.stringify(p)));
  }
  return bad;
}

// ================================================================================================
// 頻率（v5 第六項第二期）：只上色、不進戰鬥規則。形狀有錯＝擋；跟主站走鐘＝tuneWarnings 只警告
// ================================================================================================
const TUNE_CELLS = ['calm', 'still', 'languid', 'decay', 'lift', 'crisp', 'boil', 'charge'];
export function tuneProblems(C) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const T = C.tunes || {};
  ok(Array.isArray(T.order) && T.order.length === 8 && sameSet(T.order, TUNE_CELLS), 'tunes.order 要剛好是八格（' + TUNE_CELLS.join(' ') + '）');
  for (const k of TUNE_CELLS) {
    ok(T.names && typeof T.names[k] === 'string' && T.names[k], 'tunes.names.' + k);
    ok(T.colors && /^#[0-9a-f]{6}$/i.test(String(T.colors[k] || '')), 'tunes.colors.' + k + ' 要是 #rrggbb');
  }
  ok(T.names && Object.keys(T.names).length === 8 && T.colors && Object.keys(T.colors).length === 8, 'tunes.names／colors 只能有八格');
  ok(typeof T.label === 'string' && T.label && typeof T.guest === 'string' && T.guest && /\{name\}/.test(T.guestAria || ''), 'tunes.label／guest／guestAria（含 {name}）');
  ok(C.tunesTag === '新', 'C.tunesTag');
  // 每張卡都有 tune（bake-cards.mjs 的 NO-TUNE 也擋）
  const CARDS = C.cards || {};
  const noTune = Object.keys(CARDS).filter(id => !TUNE_CELLS.includes(CARDS[id].tune));
  ok(!noTune.length, '卡沒有 tune 或不在八格內（' + noTune.length + ' 張，例 ' + noTune.slice(0, 3).join('、') + '）：重跑 bake-cards.mjs --covers-only --no-verify');
  // 客人常聽頻率：10 位都有、八格內、每格最多 2 位（主線 11-15 裁定）
  const per = {};
  for (const [id, e] of Object.entries(C.enemies || {})) {
    if (ok(TUNE_CELLS.includes(e.tune), 'enemies.' + id + '.tune 要是八格之一（現在 ' + e.tune + '）')) (per[e.tune] = per[e.tune] || []).push(id);
  }
  for (const [k, ids] of Object.entries(per)) ok(ids.length <= 2, '客人常聽頻率每格最多 2 位：' + k + ' 有 ' + ids.join('、'));
  // 收音機的字（ui.js openRadio、econ.js 特價箱那格）：{x} 的佔位要在
  const R = C.radio || {};
  const need = { title: [], prompt: [], price: [], got: ['album'], used: [], usedSub: ['name', 'album'], empty: [], later: [], tag: [], toBargain: [], bagged: [], gone: [] };
  for (const [k, ph] of Object.entries(need)) ok(typeof R[k] === 'string' && R[k] && ph.every(x => R[k].includes('{' + x + '}')), 'radio.' + k + (ph.length ? '（要有 ' + ph.map(x => '{' + x + '}').join('') + '）' : ''));
  ok(C.radioTag === '新', 'C.radioTag');
  ok(!/今晚/.test(Object.values(R).join('')), 'radio 的字寫「這一輪」，不寫「今晚」（11-12 拿掉時間）');
  return bad;
}
// 第 I 波 §4 背景音樂（C.bgm）：數字在合理範圍（泡泡至少停 6 秒＝活店 §5.3、隔 ≥2 分鐘才再展開、連試 ≤3 首、新抓上限 ≤30）、音量三段遞增、字齊全、bgmTag；
//   樂歷階梯 Lv5 那一格 bgmShelf 有名字（ui.js bgmShelfOpen 靠 key 找）
export function bgmProblems(C) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const B = C.bgm || {};
  if (!ok(C.bgm && typeof C.bgm === 'object', '沒有 C.bgm')) return bad;
  const num = (k, lo, hi) => ok(typeof B[k] === 'number' && B[k] >= lo && B[k] <= hi, 'bgm.' + k + ' 要在 ' + lo + '–' + hi + '（現在 ' + B[k] + '）');
  num('popMs', 6000, 10000); num('popGap', 120000, 600000); num('tries', 1, 3); num('retryMs', 30000, 300000); num('idleMs', 300000, 1800000);
  num('fetchMax', 1, 30); num('resumeMs', 500, 3000); num('fadeIn', 0, 3000);
  num('giveUpMs', 2500, 30000); num('popWait', 2000, 15000); num('popTapWait', 2000, 15000);   // 第 I 波修正：輪播抓檔等多久、泡泡等鏡頭停／聊天完多久
  num('popChatGap', 0, 3000); num('popHoldMax', 0, 30000);   // 第 I 波第三輪審查：聊天剛收再等一拍、為了等人開口最多多等多久
  num('mqDelay', 300, 2500); num('mqPxS', 20, 120); num('mqMaxS', 1, 4);                         // 第 I 波 post：第二行捲動（開始＋最久捲完要在 popMs 裡，停在尾巴給人看）
  ok(B.mqDelay + B.mqMaxS * 1000 <= B.popMs - 1000, 'bgm.mqDelay＋mqMaxS 要比 popMs 少 1 秒以上（捲完要停在尾巴給人看）');
  const V = B.vols;
  ok(Array.isArray(V) && V.length === 3 && V.every(v => typeof v === 'number' && v > 0 && v <= 1) && V[0] < V[1] && V[1] < V[2] && V[1] === 0.5, 'bgm.vols 要三段遞增、中＝0.5（fx MUSIC_VOL）');
  const U = B.ui || {};
  for (const k of ['np', 'tapPlay', 'icon', 'bgm', 'vol', 'src', 'srcBag', 'srcBoth', 'note']) ok(typeof U[k] === 'string' && U[k], 'bgm.ui.' + k);
  ok(Array.isArray(U.volNames) && U.volNames.length === 3 && U.volNames.every(x => typeof x === 'string' && x), 'bgm.ui.volNames 三個');
  ok(!/曲|歌名/.test([U.np, U.tapPlay].join('')), 'bgm.ui 收音機旁的字不提曲名（沒有資料）');
  ok(C.bgmTag === '新', 'C.bgmTag');
  const K = C.career || {}, lad = (K.ladder || []).find(L => L && L.key === 'bgmShelf');
  ok(lad && lad.lv === 5 && !lad.soon, 'career.ladder 要有 Lv5 bgmShelf（第 I 波 §7.3 d）');
  ok(((K.ui || {}).ladder || {}).bgmShelf, 'career.ui.ladder.bgmShelf 名字');
  return bad;
}
// 跟主站比（走鐘只警告）：回傳警告字串陣列；讀不到主站檔也只警告
export function tuneWarnings(C) {
  const w = [];
  const T = C.tunes || {};
  let moods = null, tuneJs = null;
  try { moods = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/mood/card-moods.json'), 'utf8')); } catch (e) { w.push('讀不到 ../data/mood/card-moods.json：' + e.message); }
  try { tuneJs = fs.readFileSync(path.join(ROOT, 'dip-tune.js'), 'utf8'); } catch (e) { w.push('讀不到 ../dip-tune.js：' + e.message); }
  if (moods && moods.names) for (const k of TUNE_CELLS) if ((T.names || {})[k] !== moods.names[k]) w.push('tunes.names.' + k + '＝' + (T.names || {})[k] + '，主站 card-moods.json 是 ' + moods.names[k]);
  if (tuneJs) {
    const cc = /const CELL_COLOR = \{([^}]*)\}/.exec(tuneJs), od = /const ORDER = \[([^\]]*)\]/.exec(tuneJs);
    if (!cc) w.push('dip-tune.js 找不到 CELL_COLOR（格式變了？）');
    else for (const [, k, v] of cc[1].matchAll(/(\w+):\s*'(#[0-9a-fA-F]{6})'/g)) if (String((T.colors || {})[k] || '').toLowerCase() !== v.toLowerCase()) w.push('tunes.colors.' + k + '＝' + (T.colors || {})[k] + '，主站 dip-tune.js CELL_COLOR 是 ' + v);
    if (!od) w.push('dip-tune.js 找不到 ORDER（格式變了？）');
    else { const o = [...od[1].matchAll(/'(\w+)'/g)].map(m => m[1]); if (JSON.stringify(o) !== JSON.stringify(T.order || [])) w.push('tunes.order＝' + (T.order || []).join(' ') + '，主站 dip-tune.js ORDER 是 ' + o.join(' ')); }
  }
  // 每張卡的 tune 跟現在的 card-moods.json 判的格（跟 bake-cards.mjs 同一套：fnv1a32(catalogId)、檔內 thresholds）
  if (moods && Array.isArray(moods._h) && moods.thresholds) {
    const fnv = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
    const M = moods.thresholds, by = new Map(); moods._h.forEach((h, i) => { if (moods.cards[i]) by.set(h, moods.cards[i]); });
    const cellOf = (x, y, z) => (x >= M.x ? (y >= M.y ? (z >= M.z ? 'boil' : 'charge') : (z >= M.z ? 'lift' : 'crisp')) : (y >= M.y ? (z >= M.z ? 'languid' : 'decay') : (z >= M.z ? 'calm' : 'still')));
    const drift = [], miss = [];
    for (const c of Object.values(C.cards || {})) {
      const m = by.get(fnv((c.artist + '|' + c.album).toLowerCase().replace(/\//g, '-').trim()));
      if (!m) { miss.push(c.id); continue; }
      const now = cellOf(m[0], m[1], m[2]); if (now !== c.tune) drift.push(c.id + '（遊戲 ' + c.tune + '、主站現在 ' + now + '）');
    }
    if (miss.length) w.push('主站 card-moods.json 現在查不到 ' + miss.length + ' 張（例 ' + miss.slice(0, 3).join('、') + '）：主站改了藝人／專輯名？');
    if (drift.length) w.push('卡的頻率跟主站現在不一樣 ' + drift.length + ' 張（例 ' + drift.slice(0, 3).join('、') + '）：bake-cards.mjs --covers-only --no-verify 重烘');
  }
  return w;
}

// ================================================================================================
// 頂點卡純輔助卡試做（?apex=1）：C.apexTrial（見檔頭）
// ================================================================================================
const APEX_BANNED = ['不會被剋', '必中', '免疫', '無視'];
const clen = s => [...String(s)].length;
export function apexProblems(C, E) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const A = C.apexTrial;
  if (A == null) return bad;                                   // 試做拿掉了：不檢查
  if (!ok(A && typeof A === 'object', 'apexTrial 要是物件')) return bad;
  const OPS = E.APEX_OPS || {}, CARDS = C.cards || {};
  ok(Number.isInteger(A.winHeal) && A.winHeal >= 0 && A.winHeal <= 10, 'apexTrial.winHeal 要是 0–10 的整數');
  const seen = new Set(), cardsSeen = new Set(), usedOps = new Set();
  const paramsOk = (op, params, where, cap) => {
    const spec = OPS[op];
    if (!ok(spec, where + '：op ' + op + ' 不在 engine APEX_OPS')) return;
    if (!ok(params && typeof params === 'object' && !Array.isArray(params), where + '：params 要是物件')) return;
    for (const k of Object.keys(params)) ok(k in spec.params, where + '：' + op + ' 沒有參數 ' + k);
    for (const [k, rg] of Object.entries(spec.params)) {
      const v = params[k];
      if (rg === 'bool') { ok(v === undefined || typeof v === 'boolean', where + '：' + op + '.' + k + ' 要是布林'); continue; }
      if (!ok(Number.isInteger(v) && v >= rg[0] && v <= rg[1], where + '：' + op + '.' + k + '＝' + v + ' 不在 ' + rg[0] + '–' + rg[1])) continue;
      if (cap && cap[k] != null) ok(v <= cap[k], where + '：' + op + '.' + k + '＝' + v + ' 超過這個時機的上限 ' + cap[k]);
    }
    usedOps.add(op);
  };
  for (const t of TIERS) {
    const L = A[t], w0 = 'apexTrial.' + t;
    if (!ok(Array.isArray(L) && L.length === 15, w0 + '：要 15 張（店主 11-20 挑定：三派各 15）')) continue;
    ok(L[0] && L[0].card === C.aces[t], w0 + '[0] 要是 C.aces.' + t + '（預設那張）');
    L.forEach((x, k) => {
      const w = w0 + '[' + k + ']（' + (x && x.card) + '）';
      if (!ok(x && typeof x === 'object', w + '：不是物件')) return;
      const c = CARDS[x.card];
      ok(c && c.tier === t, w + '：卡不存在或 tier 不是 ' + t);
      ok(!cardsSeen.has(x.card), w + '：卡重複'); cardsSeen.add(x.card);
      ok(typeof x.id === 'string' && /^[a-z0-9-]+$/.test(x.id) && !seen.has(x.id), w + '：能力 id 要英數短橫線、全表唯一：' + x.id); seen.add(x.id);
      ok(typeof x.name === 'string' && x.name && clen(x.name) <= 8, w + '：name ≤8 字：' + x.name);
      ok(typeof x.text === 'string' && x.text && clen(x.text) <= 25, w + '：text ≤25 字（' + clen(x.text) + '）：' + x.text);
      for (const b of APEX_BANNED) ok(!String(x.text).includes(b) && !String(x.name).includes(b), w + '：禁區字「' + b + '」');
      if (!ok(E.APEX_TIMINGS.includes(x.timing), w + '：timing ' + x.timing)) return;
      const tm = x.timing === 'duel' ? 'duel' : 'hand';               // hold 的大效果＝這手
      if (x.op === 'combo') {
        const ops = x.params && x.params.ops;
        if (ok(Array.isArray(ops) && ops.length >= 2 && Object.keys(x.params).length === 1, w + '：combo 要 params.ops（2 個以上原語）'))
          for (const o of ops) { ok(OPS[o.op] && OPS[o.op].timing.includes(tm), w + '：combo 裡的 ' + o.op + ' 不能用在 ' + tm); paramsOk(o.op, o.params || {}, w, tm === 'duel' ? (OPS[o.op] || {}).duelMax : null); }
        usedOps.add('combo');
      } else {
        ok(OPS[x.op] && OPS[x.op].timing.includes(tm), w + '：' + x.op + ' 不能用在 ' + x.timing);
        ok(!(OPS[x.op] || {}).swapOnly, w + '：' + x.op + ' 只給 ?fac=1&apex=1 換一格用（C.factions.apexSwap），不放 C.apexTrial');
        paramsOk(x.op, x.params, w, tm === 'duel' ? (OPS[x.op] || {}).duelMax : null);
      }
      if (x.timing === 'hold') {
        if (ok(x.hold && typeof x.hold === 'object' && OPS[x.hold.op] && OPS[x.hold.op].small, w + '：hold 要有 {op, params}，而且 op 准當「留著」的小效果')) { paramsOk(x.hold.op, x.hold.params || {}, w + '.hold', OPS[x.hold.op].smallMax); ok(((A.holdNotes || {})[x.hold.op]), w + '：holdNotes 沒有 ' + x.hold.op); }
        ok(clen(x.text) <= 25 && /^留著：.+；發動：/.test(x.text), w + '：留著型的說明要「留著：…；發動：…」');
      } else ok(x.hold === null, w + '：只有 timing hold 才有 hold（其他要 null）');
      ok(typeof x.fact === 'string' && x.fact, w + '：fact（典故出處）');
    });
  }
  ok(Array.isArray(C.apexTrialOnly) && sameSet(C.apexTrialOnly, [...cardsSeen].filter(id => !Object.values(C.aces).includes(id))), 'apexTrialOnly＝名單扣 C.aces');
  const N = A.notes || {};
  for (const op of usedOps) if (op !== 'reveal') ok(typeof N[op] === 'string' && N[op], 'apexTrial.notes 少了 ' + op);
  if (usedOps.has('critLeech')) { ok(N.leech, 'apexTrial.notes 少了 leech（拆穿回血 ×1）'); ok(N.leechFull, 'apexTrial.notes 少了 leechFull（拆穿回血：抓到但聲望是滿的）'); }
  for (const k of ['none', 'noneHonest']) ok(typeof N[k] === 'string' && N[k], 'apexTrial.notes 少了 ' + k);
  for (const [k, v] of Object.entries(N).concat(Object.entries(A.holdNotes || {}))) ok(typeof v === 'string' && clen(v.replace(/\{(d|h)\}/g, '12').replace('{name}', '一二三四五')) <= 25, 'apexTrial 結果句 ' + k + ' 代入後超過 25 字：' + v);
  const U = A.ui || {};
  for (const k of ['slot', 'use', 'used', 'usedNote', 'noStar', 'rule', 'intro', 'pickTitle', 'pickGo', 'infoTitle', 'revealHonest', 'revealBluff', 'fired', 'rulesFoot', 'full', 'hitBoth', 'loseFree', 'eAceNote']) ok(typeof U[k] === 'string' && U[k], 'apexTrial.ui.' + k);
  ok(U.timing && ['hand', 'duel', 'hold'].every(k => typeof U.timing[k] === 'string' && U.timing[k]), 'apexTrial.ui.timing 三種');
  for (const [k, v] of Object.entries(A.tips || {})) ok(typeof v === 'string' && clen(v) <= 20, 'apexTrial.tips.' + k + ' ≤20 字');
  ok(C.apexTrialTag === '新', 'C.apexTrialTag');
  return bad;
}

// ================================================================================================
// 第 I 波 I-1 安可（C.encore；SPEC-I §1.5 五條檢查＋數字、字串）：
//   ①每張頂點卡（三派 15 張、含 ?fac=1&apex=1 換一格後的）算得出安可（自己寫的或家族預設）；②again 只配手型／留著型；③條件只有四種、lowhp 只配只會回聲望的；
//   ④條件跟能力作用的結果種類不能相同（比星多算／同色同星扣他／比星輸不扣／combo 不配同色比贏）；⑤三張 7 星王牌都有安可（含 ?fac=1 異端）。
//   另驗：換下的頂點卡（C.apexRetired）不在 C.cards、不在名單；畫面字齊、說明句 ≤30 字、籤 ≤8 字；C.encoreTag 新
// ================================================================================================
export function encoreProblems(C, E) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  for (const id of C.apexRetired || []) {
    ok(!(C.cards || {})[id], 'C.apexRetired ' + id + '：換下的頂點卡不該還在 C.cards');
    ok(TIERS.every(t => !(((C.apexTrial || {})[t]) || []).some(x => x && x.card === id)), 'C.apexRetired ' + id + '：還在 C.apexTrial');
  }
  const X = C.encore;
  if (X == null) return bad;                                    // 安可拿掉了：不檢查
  if (!ok(X && typeof X === 'object' && typeof E.encoreOf === 'function', 'C.encore 要是物件、engine 要有 encoreOf')) return bad;
  const W = E.ENC_WHEN || [], G = E.ENC_GIVE || [];
  ok(typeof X.on === 'boolean' && typeof X.carry === 'boolean', 'C.encore.on／carry 要是布林');
  ok(Number.isInteger(X.aceStar) && X.aceStar >= 4 && X.aceStar < 7, 'C.encore.aceStar 要是 4–6 的整數（安可盤比 7 星短）');
  for (const k of ['star', 'hit', 'heal']) ok(Number.isInteger(X[k]) && X[k] >= 1 && X[k] <= 3, 'C.encore.' + k + ' 要是 1–3 的整數');
  ok(Number.isInteger(X.lowPct) && X.lowPct >= 10 && X.lowPct <= 50, 'C.encore.lowPct 要是 10–50 的整數');
  ok(W.includes(X.facHeresy) && X.facHeresy !== 'caught', 'C.encore.facHeresy 要是條件之一、不是看穿（異端被動本來就吃拆穿）');
  for (const [k, r] of Object.entries(X.byFamily || {})) {
    ok(/^(\*|[a-zA-Z]+):(hand|duel)$/.test(k), 'C.encore.byFamily 的鍵要是「原語:hand|duel」：' + k);
    ok(r && W.includes(r.when) && (r.heresy == null || W.includes(r.heresy)) && G.includes(r.give), 'C.encore.byFamily.' + k + '：when／heresy／give 不對');
    ok(!(r && r.give === 'again' && /:duel$/.test(k)), 'C.encore.byFamily.' + k + '：整場型不能「再發動」（②）');
  }
  ok(X.byFamily && X.byFamily['*:hand'] && X.byFamily['*:duel'], 'C.encore.byFamily 要有 *:hand、*:duel（沒列到的原語）');
  // ⑤ 三張 7 星王牌
  for (const t of TIERS) for (const fac of [false, true]) {
    const e = E.aceEncoreOf(C, t, fac);
    if (ok(e && W.includes(e.when) && e.give === 'again', '⑤ 7 星王牌 ' + t + (fac ? '（?fac=1）' : '') + ' 沒有安可')) ok(e.when !== 'lowhp', '⑤ 7 星王牌 ' + t + '：背水只給回聲望型');
  }
  ok(E.aceEncoreOf(C, 'heresy', true).when === X.facHeresy, '⑤ ?fac=1 異端 7 星王牌換 facHeresy');
  // ①–④ 每張頂點卡（名單原樣＋換一格後）
  const OPS = A => A.op === 'combo' ? (((A.params || {}).ops) || []).map(o => o.op) : [A.op];
  const MIRROR = ['mirrorPlus', 'tieWin', 'loseZero'];
  const check = (A, t, where) => {
    const e = A.encore || E.encoreOf(C, A, t);
    if (!ok(e && W.includes(e.when) && G.includes(e.give), '① ' + where + '：算不出安可')) return;
    if (A.encore != null) ok(W.includes(A.encore.when) && G.includes(A.encore.give), where + '：自己寫的 encore 要是 {when, give} 四種之一');
    ok(e.give !== 'again' || A.timing === 'hand' || A.timing === 'hold', '② ' + where + '：再發動只配手型／留著型（' + A.timing + '）');
    const ops = OPS(A).concat(A.timing === 'hold' && A.hold ? [A.hold.op] : []);
    ok(e.when !== 'lowhp' || OPS(A).every(o => o === 'heal'), '③ ' + where + '：背水只配回聲望型');
    ok(!(e.when === 'sameWin' && (A.op === 'combo' || ops.some(o => MIRROR.includes(o)))), '④ ' + where + '：比星系的能力不配同色比贏');
    const line = E.encoreLine(C, e), tag = E.encoreTag(C, e);
    ok(line && clen(line) <= 30, where + '：說明句 ≤30 字：' + line);
    ok(tag && clen(tag) <= 8, where + '：籤 ≤8 字：' + tag);
  };
  for (const t of TIERS) for (const x of ((C.apexTrial || {})[t] || [])) {
    if (!x || !x.card) continue;
    check(x, t, 'apexTrial.' + t + '.' + x.id);
    const A = E.abilityOf(C, x.card);
    ok(A && A.encore && JSON.stringify(A.encore) === JSON.stringify(E.encoreOf(C, x, t)), 'apexTrial.' + t + '.' + x.id + '：abilityOf 要帶 encore');
    if (C.factions && C.factions.apexSwap) { const B = E.apexAbilityOf(C, x.card, { ace: t, fac: { picks: {} } }); if (B && B.swapped) check(B, t, 'apexSwap ' + x.id); }
  }
  for (const t of TIERS) { const e = E.aceEncoreOf(C, t, false), l = E.encoreLine(C, e, { ace: true }), g = E.encoreTag(C, e, { ace: true }); ok(l && clen(l) <= 30 && g && clen(g) <= 8, '7 星王牌 ' + t + ' 的說明句 ≤30、籤 ≤8：' + l + '／' + g); }
  // 畫面字
  const U = X.ui || {};
  for (const k of ['name', 'tpl', 'aceTpl', 'tag', 'lit', 'toast', 'verbApex', 'verbAce', 'healToast', 'carry', 'carryTag', 'infoTitle', 'first', 'litCarry', 'ruleApex', 'ruleCarry', 'ruleHead', 'exc', 'tipAce', 'tipApex']) ok(typeof U[k] === 'string' && U[k], 'C.encore.ui.' + k);
  for (const k of W) ok(typeof (U.when || {})[k] === 'string' && typeof (U.tagWhen || {})[k] === 'string', 'C.encore.ui.when／tagWhen 少了 ' + k);
  for (const k of G.concat(['ace'])) ok(typeof (U.give || {})[k] === 'string' && typeof (U.tagGive || {})[k] === 'string', 'C.encore.ui.give／tagGive 少了 ' + k);
  for (const k of ['star', 'hit']) ok(typeof (U.next || {})[k] === 'string' && typeof (U.note || {})[k] === 'string', 'C.encore.ui.next／note 少了 ' + k);
  for (const k of ['tipAce', 'tipApex']) ok(clen(U[k] || '') <= 20, 'C.encore.ui.' + k + '：老闆小提示 ≤20 字');
  ok(C.encoreTag === '新', 'C.encoreTag');
  return bad;
}

// ================================================================================================
// 第 D 波棒二：三流派（?fac=1；C.factions，SPEC-D §4.2、§6-3）
// ================================================================================================
const FAC_NOTE_KEYS = ['full', 'tieCost', 'borrow', 'underdog', 'cCost', 'crit', 'crit2', 'heal', 'loseCost', 'leech', 'thorn', 'spine', 'insider'];   // spine／insider：棒三派樹
const FAC_FX_KEYS = { hall: ['mirrorWinFull', 'fullMin', 'tieCost'], pearl: ['counterAlways', 'underdogNoAtk', 'counteredCost'], heresy: ['critMult', 'critPre', 'critHeal', 'loseCost'] };
// 派樹（第 D 波棒三；SPEC-D §3.7a）：九格 a1–c3（路線 a 本派／b 代價／c 收藏 × 三層）；活的節點 op 在 engine TREE_OPS、名 ≤6、說明 ≤24；
//   start＝這派 picks 裡的一項（第二招不上樹：R-F5）、同一項不給兩次；deep cell honest／caught、max 1–3（D 波封頂 3）；pleaHp n 1–5、tieHeal n 1–3；
//   soon（之後開放）＝later／apex／market，不寫 op；丙路線 D 波全鎖（經典丙 I、冷門丙 I 沒內容、丙 II／III 等鎮店盤、異端丙 I 等市集：build3 裁定）
function treeShape(D, w, P, E, ok) {
  const T = D.tree;
  if (!ok(Array.isArray(T) && T.length === 9, w + '.tree 要 9 格（a1–c3）')) return;
  const OPS = E.TREE_OPS || [], seen = new Set(), starts = new Set();
  ok(sameSet(T.map(x => x && x.id), ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3']), w + '.tree 的 id 要剛好 a1–c3');
  for (const x of T) {
    const wn = w + '.tree.' + (x && x.id);
    if (!ok(x && typeof x === 'object', wn + ' 不是物件')) continue;
    ok(typeof x.name === 'string' && x.name && clen(x.name) <= 6, wn + '.name 1–6 字');
    if (x.text != null) ok(typeof x.text === 'string' && x.text && clen(x.text) <= 24, wn + '.text ≤24 字：' + x.text);
    if (x.soon) { ok(['later', 'apex', 'market'].includes(x.soon) && x.op == null, wn + '：之後開放的寫 soon（later／apex／market）、不寫 op'); continue; }
    ok(x.id[0] !== 'c', wn + '：丙路線 D 波全部之後開放');
    ok(OPS.includes(x.op), wn + '.op ' + x.op + ' 不在 engine TREE_OPS');
    ok(typeof x.text === 'string' && x.text, wn + '：活的節點要有說明');
    if (x.op === 'start') {
      const p = P.find(q => q && q.id === x.pick);
      ok(!!p && !p.second, wn + '：start 要是這派的本派選項、不能是第二招（R-F5）：' + x.pick);
      ok(!starts.has(x.pick), wn + '：同一項本派選項不給兩次'); starts.add(x.pick);
    }
    if (x.op === 'deep') {
      const perOk = v => Number.isInteger(v) && v >= 1 && v <= 10;
      ok(['honest', 'caught'].includes(x.cell) && Number.isInteger(x.max) && x.max >= 1 && x.max <= 3 && x.id === 'a3' &&
        (x.per == null || perOk(x.per) || (Array.isArray(x.per) && x.per.length === x.max && x.per.every(perOk) && x.per.every((v, i) => !i || v <= x.per[i - 1]))) && (x.carry == null || typeof x.carry === 'boolean'),
        wn + '：深耕在甲 III、cell honest／caught、max 1–3（D 波封頂 3）、per 1–10 或逐級陣列（長度＝max、不遞增）、carry 布林（跨場累積）');
    }
    if (x.op === 'fx') {   // 棒三審查：派樹自己的小效果（engine TREE_FX_MAX／TREE_FX_ADD 的鍵，1–3）
      const keys = Object.keys(x.fx || {}), KN = (E.TREE_FX_MAX || []).concat(E.TREE_FX_ADD || []);
      ok(keys.length >= 1 && keys.every(k => KN.includes(k) && Number.isInteger(x.fx[k]) && x.fx[k] >= 1 && x.fx[k] <= 3), wn + '：fx 的鍵要在 engine TREE_FX_MAX／TREE_FX_ADD、值 1–3：' + JSON.stringify(x.fx));
      for (const k of keys) { ok(!seen.has('fx:' + k), wn + '：fx 同一個鍵一派只有一格：' + k); seen.add('fx:' + k); }
    }
    if (x.op === 'spine') ok(x.n == null || (Number.isInteger(x.n) && x.n >= 1 && x.n <= 3), wn + '：刺蝟 n 1–3（他的品味少算幾點；沒寫＝整個不加）');
    if (x.op === 'pleaHp') ok(Number.isInteger(x.n) && x.n >= 1 && x.n <= 5, wn + '：pleaHp n 1–5');
    if (x.op === 'tieHeal') ok(Number.isInteger(x.n) && x.n >= 1 && x.n <= 3, wn + '：tieHeal n 1–3');
    if (x.op === 'pick2') ok(x.id === 'a2', wn + '：挑著學在甲 II');
    ok(!seen.has(x.op) || x.op === 'start' || x.op === 'fx', wn + '：同一種效果（start、fx 以外；fx 照鍵算）一派只有一格'); seen.add(x.op);
  }
}
export function factionProblems(C, E) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const F = C.factions;
  if (F == null) return bad;                                    // 試做拿掉了：不檢查
  if (!ok(F && typeof F === 'object', 'factions 要是物件')) return bad;
  const OPS = E.APEX_OPS || {}, FOPS = E.FAC_OPS || [];
  ok(Number.isInteger(F.levelEvery) && F.levelEvery >= 0 && F.levelEvery <= 20, 'factions.levelEvery 要是 0–20 的整數（0＝本派格不出）');
  ok(F.occupy === true, 'factions.occupy 要是 true（定稿只有佔那一級這條路：SPEC-D §3.5）');
  const N = F.notes || {};
  for (const k of FAC_NOTE_KEYS) ok(typeof N[k] === 'string' && N[k].includes('{n}') && clen(N[k].replace('{n}', '12')) <= 16, 'factions.notes.' + k + ' 要有 {n}、代入後 ≤16 字');
  ok(Object.keys(N).every(k => FAC_NOTE_KEYS.includes(k)), 'factions.notes 有不認得的鍵');
  ok(FAC_NOTE_KEYS.every(k => (E.FAC_NOTE_ORDER || []).includes(k)), 'factions.notes 的鍵要都在 engine FAC_NOTE_ORDER');
  for (const t of TIERS) {
    const D = F[t], w = 'factions.' + t;
    if (!ok(D && typeof D === 'object', w + ' 要是物件')) continue;
    ok(D.name === (C.aceTitle || {})[t], w + '.name＝C.aceTitle.' + t);
    ok(D.icon === (C.aceIcon || {})[t], w + '.icon＝C.aceIcon.' + t);
    ok(['honest', 'caught'].includes(D.deepCell), w + '.deepCell 要是 honest／caught');
    for (const k of ['tagline', 'passive', 'cost', 'read', 'first']) ok(typeof D[k] === 'string' && D[k] && clen(D[k]) <= 34, w + '.' + k + ' 要有字（≤34）');
    ok(D.fx && typeof D.fx === 'object' && FAC_FX_KEYS[t].every(k => Number.isFinite(D.fx[k]) && D.fx[k] >= 0), w + '.fx 要有 ' + FAC_FX_KEYS[t].join('／') + '（非負數字）');
    const P = Array.isArray(D.picks) ? D.picks : [];
    ok(P.length === 5, w + '.picks 要 5 項（第 5 項＝第二招）');
    const ids = new Set();
    P.forEach((p, k) => {
      const wp = w + '.picks[' + k + ']';
      if (!ok(p && typeof p === 'object', wp + ' 不是物件')) return;
      ok(typeof p.id === 'string' && /^[a-z]_[a-z]+$/.test(p.id) && !ids.has(p.id), wp + '.id 要 x_xxx、這派唯一：' + p.id); ids.add(p.id);
      ok(typeof p.name === 'string' && p.name && clen(p.name) <= 6, wp + '.name ≤6 字');
      ok(typeof p.text === 'string' && p.text && clen(p.text) <= 24, wp + '.text ≤24 字：' + p.text);
      ok(FOPS.includes(p.op), wp + '.op ' + p.op + ' 不在 engine FAC_OPS');
      if (p.op === 'starPlus') ok(ATTRS.includes(p.axis), wp + '：starPlus 要 axis');
      if (['starPlus', 'fullPlus', 'counteredCut', 'critPrePlus', 'critHealPlus', 'lowHeal', 'maxHp', 'thorn', 'critSafe'].includes(p.op)) ok(Number.isInteger(p.n) && p.n >= 1 && p.n <= 3, wp + '：n 要 1–3');
      if (['leech', 'thorn'].includes(p.op)) ok(Number.isInteger(p.max) && p.max >= 1 && p.max <= 3, wp + '：第二招要有上限 max 1–3（SPEC-D §3.4：三招都有上限）');
      ok(!!p.second === (k === 4), wp + '：只有第 5 項是第二招（second）');
    });
    ok(Array.isArray(D.priority) && D.priority.length === ids.size && sameSet(D.priority, [...ids]), w + '.priority 要是 picks id 的排列');
    treeShape(D, w, P, E, ok);
  }
  ok(F.treeStart == null || ['first', 'start'].includes(F.treeStart), 'factions.treeStart 要是 first（本派格先出）／start（開局就送，規格原意）');
  const G = F.guest;   // 棒三：?fac=1 那一趟的客人（只在 run.fac）：[[第幾位起, +n], …] 位數遞增、n 1–3
  if (G != null && ok(G && typeof G === 'object' && Object.keys(G).every(k => ['hpSteps', 'atkSteps'].includes(k)), 'factions.guest 只有 hpSteps／atkSteps'))
    for (const k of ['hpSteps', 'atkSteps']) if (G[k] != null) ok(Array.isArray(G[k]) && G[k].every((x, i, a) => Array.isArray(x) && Number.isInteger(x[0]) && x[0] >= 2 && Number.isInteger(x[1]) && x[1] >= 1 && x[1] <= 3 && (!i || x[0] > a[i - 1][0])), 'factions.guest.' + k + '＝[[第幾位起（≥2、遞增）, +n（1–3）]…]');
  const TC = F.treeCost || {};
  ok(Array.isArray(TC.layer) && TC.layer.length === 3 && TC.layer.every(x => Number.isInteger(x) && x >= 1 && x <= 5) && Number.isInteger(TC.more) && TC.more >= 1 && TC.more <= 5, 'factions.treeCost：layer 三層各 1–5 點、more（深耕第 2 級起每級）1–5');
  const S = F.apexSwap;
  if (S != null && ok(S && typeof S === 'object', 'factions.apexSwap 要是物件')) {
    const SN = S.notes || {}, AN = (C.apexTrial || {}).notes || {};
    for (const t of ['pearl', 'heresy', 'hall']) {
      const T = S[t]; if (T == null) continue;
      const list = (C.apexTrial || {})[t] || [];
      const one = (x, where, origTiming) => {
        if (!ok(x && typeof x === 'object' && OPS[x.op], where + '：op ' + (x && x.op) + ' 不在 engine APEX_OPS')) return;
        const tm = (x.timing === 'hold' || origTiming === 'hold') ? 'hand' : (x.timing || origTiming) === 'duel' ? 'duel' : 'hand';
        ok(OPS[x.op].timing.includes(tm), where + '：' + x.op + ' 不能用在 ' + tm);
        for (const [k, rg] of Object.entries(OPS[x.op].params)) { const v = (x.params || {})[k]; if (rg !== 'bool') ok(Number.isInteger(v) && v >= rg[0] && v <= rg[1] && (tm !== 'duel' || !(OPS[x.op].duelMax || {})[k] || v <= OPS[x.op].duelMax[k]), where + '：' + x.op + '.' + k + '＝' + v + ' 不在範圍'); }
        ok(typeof x.text === 'string' && x.text && clen(x.text) <= 25, where + '：text ≤25 字');
        if (origTiming === 'hold') ok(/^留著：.+；發動：/.test(x.text), where + '：留著型的說明要「留著：…；發動：…」');
        for (const b of APEX_BANNED) ok(!String(x.text).includes(b), where + '：禁區字「' + b + '」');
        ok(x.op === 'reveal' || typeof (SN[x.op] || AN[x.op]) === 'string', where + '：' + x.op + ' 沒有結果句（apexSwap.notes 或 apexTrial.notes）');
      };
      for (const [op, x] of Object.entries(T.ops || {})) {
        ok(list.some(e => e && e.op === op), 'factions.apexSwap.' + t + '.ops.' + op + '：這派名單沒有這個原語的卡');
        const holds = list.filter(e => e && e.op === op && e.timing === 'hold' && !((T.cards || {})[e.id]));
        ok(!holds.length, 'factions.apexSwap.' + t + '.ops.' + op + '：留著型的卡（' + holds.map(e => e.id).join('、') + '）要在 cards 另寫說明');
        one(x, 'factions.apexSwap.' + t + '.ops.' + op, x.timing);
      }
      for (const [id, x] of Object.entries(T.cards || {})) {
        const e = list.find(z => z && z.id === id);
        if (!ok(e, 'factions.apexSwap.' + t + '.cards.' + id + '：不在 C.apexTrial.' + t)) continue;
        one(x, 'factions.apexSwap.' + t + '.cards.' + id, e.timing === 'hold' ? 'hold' : x.timing);
      }
    }
    for (const [k, v] of Object.entries(SN)) ok(typeof v === 'string' && clen(v.replace(/\{(d|h)\}/g, '12')) <= 25 && !(k in AN), 'factions.apexSwap.notes.' + k + '：≤25 字、不跟 apexTrial.notes 重複');
  }
  const U = F.ui || {};
  for (const k of ['badge', 'badgeBoth', 'passive', 'cost', 'second', 'pickTag', 'pickNote', 'pickFirst', 'mine', 'mineNone', 'infoTitle', 'leftLeech', 'leftThorn', 'firstTip', 'swapped', 'apexMixed', 'costOff',
    'treeTab', 'treePoints', 'treeOf', 'treeCost', 'treeLv', 'treeHave', 'treeNeed', 'treeProf', 'treeNoPts', 'treeSoon', 'treeSoonApex', 'treeSoonMarket', 'treeRespec', 'treeHow', 'treeOffNote', 'treeStart', 'deepWin', 'pleaHp']) ok(typeof U[k] === 'string' && U[k], 'factions.ui.' + k);
  ok(U.treePath && ['a', 'b', 'c'].every(k => typeof U.treePath[k] === 'string' && U.treePath[k] && clen(U.treePath[k]) <= 4), 'factions.ui.treePath：a／b／c 三條路線名（≤4 字）');
  ok(C.factionsTag === '新', 'C.factionsTag');
  return bad;
}

// ================================================================================================
// 舊卡片 id 對照表（第 B 波 SPEC-B §1.1）：content.js C.legacyIds()（執行期從核心卡的藝人／專輯推）＋C.legacyExtra
//   ＝tools/legacy-ids.json（migrate-ids.mjs 換 id 當下凍結的 368 筆）。不一樣＝某張核心卡改了名，老存檔裡那張遷不過去：
//   把 { 舊 slug: catalogId } 補進 C.legacyExtra。另驗：舊 slug 都沒有 |、catalogId 都有 |（遷移靠這個分新舊）、每個 catalogId 都在 C.cards。
export function legacyProblems(C) {
  const bad = [];
  let frozen = null;
  try { frozen = JSON.parse(fs.readFileSync(path.join(HERE, 'legacy-ids.json'), 'utf8')); } catch (e) { return ['tools/legacy-ids.json 讀不到或不是 JSON：' + e.message]; }
  if (typeof C.legacyIds !== 'function') return ['content.js 沒有 C.legacyIds()'];
  const live = C.legacyIds();
  const fk = Object.keys(frozen), lk = Object.keys(live);
  const miss = fk.filter(k => live[k] !== frozen[k]), extra = lk.filter(k => !(k in frozen));
  if (miss.length) bad.push('推不出來或對不上 ' + miss.length + ' 筆（核心卡改名了？補進 C.legacyExtra）：' + miss.slice(0, 5).map(k => k + ' → ' + frozen[k] + '（現在 ' + (live[k] || '無') + '）').join('、'));
  if (extra.length) bad.push('比凍結的多 ' + extra.length + ' 筆（新增核心卡要用 catalogId，不會有舊 slug；或 legacyExtra 寫了凍結表沒有的）：' + extra.slice(0, 5).join('、'));
  for (const k of fk) {
    if (k.indexOf('|') >= 0) bad.push('舊 slug 不該有 |：' + k);
    if (String(frozen[k]).indexOf('|') < 0) bad.push('catalogId 一定有 |：' + frozen[k]);
    if (!(C.cards || {})[frozen[k]] && !(C.apexRetired || []).includes(frozen[k])) bad.push('舊 slug ' + k + ' → ' + frozen[k] + ' 不在 C.cards（離開遊戲的卡要列進 C.apexRetired）');
  }
  return bad;
}

// ================================================================================================
// 卡池（第 B 波 SPEC-B §1.2–§1.5）：核心 368（cards.js）＋精選新卡（cards-pool.js 展開，pool: true）
export function poolProblems(C) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const CARDS = C.cards || {};
  const core = require(path.join(LAB, 'cards.js'));
  let pool = null; try { pool = require(path.join(LAB, 'cards-pool.js')); } catch (e) { return ['cards-pool.js 載不到（node game-lab/tools/bake-cards.mjs --pool-only）：' + e.message]; }
  ok(core !== CARDS, 'C.cards 要是新物件（不改 cards.js 的匯出）');
  ok(!Object.values(core).some(c => c && c.pool), 'cards.js（核心）不該有 pool: true 的卡');
  ok(C.poolLoaded === true, 'C.poolLoaded 要是 true（cards-pool.js 的列數＝n）');
  ok(C.poolVersion === pool.v, 'C.poolVersion＝cards-pool.js 的 v');
  const ids = Object.keys(CARDS), pids = ids.filter(id => CARDS[id] && CARDS[id].pool);
  ok(ids.length === Object.keys(core).length + pool.n && pids.length === pool.n, '張數：C.cards ' + ids.length + '＝核心 ' + Object.keys(core).length + '＋新卡 ' + pool.n + '（pool: true 的 ' + pids.length + '）');
  for (const id of Object.keys(core)) ok(CARDS[id] && !CARDS[id].pool, '核心卡 ' + id + ' 被新卡蓋掉或不見了');
  let noMedia = 0;
  for (const id of pids) {
    const c = CARDS[id];
    ok(!c.tier, id + '：新卡不該有 tier');
    ok(c.bin && C.bins && C.bins[c.bin], id + '：新卡要有 bin（而且是 C.bins 的一區）：' + c.bin);
    ok(c.tune, id + '：新卡要有 tune');
    if (!c.coverUrl || !/^https:\/\//.test(c.previewUrl || '')) noMedia++;
  }
  ok(!noMedia, noMedia + ' 張新卡沒有封面或試聽（cards-media.json 沒套上：版本不合或檔案壞了；重烘 --pool-only）');
  // 每箱 all（C.deriveAll）⊇ pool、互斥；合計＝有 bin 的卡
  const seen = new Map(); let sum = 0;
  for (const [k, b] of Object.entries(C.bins || {})) {
    if (!ok(Array.isArray(b.all), 'bins.' + k + '.all 要是陣列（C.deriveAll）')) continue;
    const all = new Set(b.all); sum += b.all.length;
    for (const id of b.pool || []) ok(all.has(id), 'bins.' + k + '：策展池 ' + id + ' 不在 all（核心卡的 bin 跟 bins.js 對不上；重烘 cards.js）');
    for (const id of b.all) { if (seen.has(id)) bad.push('bins.' + k + ' 與 bins.' + seen.get(id) + ' 的 all 重複：' + id); else seen.set(id, k); ok(CARDS[id] && CARDS[id].bin === k, 'bins.' + k + '.all 的 ' + id + ' 的 bin 不是 ' + k); }
  }
  ok(sum === ids.filter(id => CARDS[id].bin).length, '各箱 all 合計 ' + sum + '＝有 bin 的卡');
  // 媒體套用冪等、版本不合不套
  if (typeof C.attachMedia === 'function') {
    let media = null; try { media = JSON.parse(fs.readFileSync(path.join(LAB, 'cards-media.json'), 'utf8')); } catch (e) { bad.push('cards-media.json 讀不到：' + e.message); }
    if (media) {
      ok(media.v === pool.v, 'cards-media.json 的 v（' + media.v + '）＝cards-pool.js 的 v（' + pool.v + '）');
      const before = JSON.stringify(pids.map(id => [CARDS[id].coverUrl, CARDS[id].previewUrl]));
      ok(C.attachMedia(media) === pool.n, 'C.attachMedia(cards-media.json) 要回 ' + pool.n);
      ok(JSON.stringify(pids.map(id => [CARDS[id].coverUrl, CARDS[id].previewUrl])) === before, 'C.attachMedia 要冪等（套兩次一樣）');
      ok(C.attachMedia(Object.assign({}, media, { v: 'x' + media.v })) === 0, 'C.attachMedia 版本不合要回 0、不套');
    }
  } else bad.push('content.js 沒有 C.attachMedia');
  const L = C.lot || {};
  for (const k of ['size', 'floor', 'feature', 'show', 'featureShow', 'wantMax']) ok(Number.isInteger(L[k]) && L[k] > 0, 'C.lot.' + k + ' 要是正整數');
  ok(typeof L.on === 'boolean' && typeof L.firstCurated === 'boolean' && L.wantP > 0 && L.wantP < 1, 'C.lot.on／firstCurated（布林）、wantP（0–1）');
  return bad;
}

// ================================================================================================
const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  const C = require(path.join(LAB, 'content.js'));
  const E = require(path.join(LAB, 'engine.js'));
  // 遊戲卡池索引（v5 第六項第一期；第 B 波 v2）：game-lab/pool-index.json＝整池 C.cards（明傳；cards.js 只有核心）非頂點、非傳奇卡的雜湊；漂掉主站「帶去店裡對決」會漏出或多出鈕
  const bad = contentProblems(C, E).concat(poolProblems(C).map(x => '卡池：' + x), poolIndexProblems(C.cards).map(x => '遊戲卡池索引：' + x), legacyProblems(C).map(x => '舊 id 對照表：' + x));
  for (const x of tuneWarnings(C)) console.log('  注意（頻率走鐘，只警告）：' + x);
  for (const x of crowdNotes(C)) console.log('  注意（活店）：' + x);
  if (bad.length) { console.log('content 自檢沒過（' + bad.length + '）：'); bad.forEach(b => console.log('  ✗ ' + b)); process.exitCode = 1; }
  else {
    const decks = Object.values(C.enemies).map(e => e.id + ' ' + e.deck.length + '／' + e.hp + '／' + E.deckMain(e.deck.map(id => C.cards[id]), e.taste)).join('、');
    if (!(C.bins && C.bins.feature)) console.log('（bins.js 還是舊形狀、沒有 feature 區：契約檢查 binsProblems 等 Y 的 bins.js 進來才跑；engine.test 用 fixture 驗）');
    console.log('content 自檢通過：卡 ' + Object.keys(C.cards).length + ' 張（核心 ' + Object.values(C.cards).filter(c => !c.pool).length + '＋精選新卡 ' + Object.values(C.cards).filter(c => c.pool).length + '）；客人 10 位（唱片／聲望／主屬性 ' + decks + '）；發燒配件 ' + Object.keys(C.relics).length + ' 件；箱子 ' + Object.keys(C.bins).length + ' 區。');
  }
}
