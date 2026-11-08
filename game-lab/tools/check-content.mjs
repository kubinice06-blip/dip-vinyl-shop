// check-content.mjs：content.js／cards.js／bins.js 結構自檢（品味對決 v4；SPEC-v4 §2.2、§4、§5.1）。改了客人、牌組、經濟、教學資料或重烘 cards.js 之後跑一次。
//
//   node game-lab/tools/check-content.mjs     # 有問題 exit 1
//
// 檢查：
//   卡片：欄位、星數（一般卡 ≤5、王牌那軸 7）、封面、試聽、region ∈ tw／jp／zh／xx；所有引用的卡 id 都存在（王牌、禮物、特價箱、牌單、掉牌、教學、箱子）。
//   王牌、禮物（§4.2：三軸都有 ≥4 星、殿堂有冷門 ≥4、王牌那軸 ≥4 至少 2 張）、特價箱（§4.3：9 張、topAttr 3／3／3、峰值 ≤3、冷門 ≤3）。
//   客人（§2.2.3、§4.1）：名字（FIXLIST 6 的身分、沒有 title）、誠實度（男子老實、一般偶爾唬人、菁英愛唬人、藏家老江湖；只有 q）、聲望（男子 10、其他 12–40）、張數（男子 6、一般與菁英 7、藏家 6）；
//     牌組限制（deckMain、嚴格峰值 ≥4、唬人色 ≥4 星 ≥2 張、剋他用色 ≥4 星 ≥1 張；男子只要一張副屬性 ≥4；經典客人 ≤4 位不含藏家；
//     藏家三色各 ≥2 張峰值、每色都有 ≥4 星）；牌組／禮物／特價箱彼此不重複且不含王牌。
//   提示句（§2.2.4：每色 5 句、key 必為 text 的子字串、不寫屬性名）、誠實度表、出招難度表、經濟（FIXLIST 8 台幣行情：稀有度價、特價箱每張、配件 3000；start／win 的範圍）、
//   發燒配件 9 件（§2.2.6）、規則卡六行逐字＝tools/owner-lines-v4.json、頁尾聲望數字、教學規則資料（§2.2.10）、小提示、盤面字、店內字、經濟介面字。
//   C.bins 的鍵＝bins.js；bins.js 是 X／Y 契約形狀（有 feature）時再跑 binsProblems（十四區、名牌、分類、FEATURE 稀有度、30 晚上貨夠不夠）。
//   v4 教學步驟（§2.5.5，B2；匯出 tutorialProblems(C)）：六手各一個「丟」、做的步驟只有「點那顆（allow.pick＋'tile:pick'／point 'pick'）」或「丟（allow.throw＋point throw）」、
//     每手的 pick 在 script 裡指得到（禮物的那張那色／blocked:o／ace）、結算時講的步驟（target result）只在丟之後、小卡 L1–L6 各學一次而且照課表順序、
//     第 1 手前一句指提示（e-hint）、第 1 手結算後點破第 1 手提示句的關鍵字一次、依王牌分句的 text 三張都有、三角邊合法、ui 鍵齊全。
//   v4 劇本（§2.5.3、§2.5.4，B2；匯出 scriptProblems(C, layout)）：序章 O1–O21、收尾 E1–E11 的 id 與順序；D §2 店主改的句子逐字；
//     步驟（do／人物／站位都在 shops/dip.json）；翻箱（pose dig）之前同一串步驟裡一定先走路；序章與收尾藏熟客；O11 停音樂、O14 才入袋；
//     兩顆接受對決；E4 他走到門口才晃門、地上留一張盤、撿起面板；選完才走到唱盤（C.blocking.toDuel 三人終點）；v3 墊片都刪了。
//
// 匯出 shapeProblems(C, E)：只看星數的形狀檢查（engine.test #14 也跑這一份；不檢查封面／試聽等烘焙欄位）。
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';

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
      for (const x of ATTRS) ok(cs.some(c => c[x] >= 4), 'gifts.' + t + '：' + ZH[x] + '要有 ≥4 星的卡（§4.2）');
      ok(cs.filter(c => c[E.TIER_AXIS[t]] >= 4).length >= 2, 'gifts.' + t + '：王牌那軸 ≥4 的至少 2 張');
      if (t === 'hall') ok(cs.some(c => c.o >= 4), 'gifts.hall：至少一張冷門 ≥4（D §5）');
      cs.forEach(c => ok(!c.tier && peak(c) <= 5, 'gifts.' + t + ': ' + c.id + ' 是王牌／頂點卡'));
    }
  }
  const BP = (C.bargain && C.bargain.pool) || [];
  ok(BP.length === 9 && new Set(BP).size === 9, '特價箱要 9 張不重複，現在 ' + BP.length);
  const bcs = BP.map(id => card(id, 'bargain')).filter(Boolean);
  if (bcs.length === 9) {
    const n = { c: 0, o: 0, h: 0 }; bcs.forEach(c => n[topAttr(c)]++);
    ok(n.c === 3 && n.o === 3 && n.h === 3, '特價箱 topAttr 要 經／冷／硬各 3，現在 ' + JSON.stringify(n));
    bcs.forEach(c => { ok(peak(c) <= 3, '特價箱 ' + c.id + ' 峰值要 ≤3'); ok(c.o <= 3, '特價箱 ' + c.id + ' 冷門要 ≤3（教學第 5 手）'); ok(!c.tier, '特價箱 ' + c.id + ' 是王牌'); });
  }

  // ---- 誠實度（只有機率 q；FIXLIST 6：畫面不寫誠實度，沒有 zh）、難度 ----
  const HK = ['honest', 'sometimes', 'often', 'veteran'];
  ok(C.honesty && sameSet(Object.keys(C.honesty), HK), 'honesty 要剛好是 ' + HK.join(' '));
  for (const k of HK) { const h = (C.honesty || {})[k]; ok(h && h.q > 0 && h.q <= 1 && !('zh' in h), 'honesty.' + k + ': 只有 q（0–1），不寫 zh（FIXLIST 6）'); }
  ok(!('honestyTag' in C), 'honestyTag 要拿掉（FIXLIST 6）');
  if (C.honesty && C.honesty.honest) ok(C.honesty.honest.q === 1, 'honesty.honest.q 要 1');
  ok(C.planners && sameSet(Object.keys(C.planners), ['easy', 'normal', 'hard']), 'planners 要剛好是 easy normal hard');
  for (const [k, p] of Object.entries(C.planners || {})) ok(p && p.w > 0 && p.nz >= 0 && typeof p.mercy === 'boolean', 'planners.' + k + ': w／nz／mercy');
  ok(Array.isArray(C.plannerByDepth) && C.plannerByDepth.length === 5 && C.plannerByDepth.every(x => C.planners && C.planners[x]), 'plannerByDepth 要 5 個、都在 planners 裡');

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
  ok(drop && !seen.has(drop) && !aceIds.has(drop), '男子掉的那張（' + drop + '）不能跟牌組／禮物／特價箱重複');

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

  // ---- 經濟（FIXLIST 8 台幣行情＋X／Y 契約：價格是店主定的、不校準；只有 start／win 是 sim 校準的旋鈕） ----
  const EC = C.economy || {};
  ok(Number.isInteger(EC.start) && EC.start >= 0 && EC.start <= 3000 && EC.start % 100 === 0, 'economy.start 0–3000、整百（校準旋鈕）');
  const W = EC.win || {};
  ok(['prologue', 'normal', 'elite', 'boss'].every(k => Number.isInteger(W[k]) && W[k] % 100 === 0), 'economy.win 四級、整百');
  ok(W.prologue >= 0 && W.prologue <= 3000, 'economy.win.prologue 0–3000');
  ok(W.normal >= 500 && W.normal <= 4000, 'economy.win.normal 500–4000（校準旋鈕；店主例：一般 $1,500 左右）');
  ok(W.elite >= W.normal && W.elite <= 6000, 'economy.win.elite ≥ normal、≤6000（店主例：菁英 $2,500 左右）');
  ok(W.boss === 0, 'economy.win.boss 要 0（打贏藏家＝通關）');
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
    const span = ids => { const hs = ids.map(id => C.enemies[id] && C.enemies[id].hp); const lo = Math.min(...hs), hi = Math.max(...hs); return lo === hi ? String(lo) : lo + '–' + hi; };
    const want = { normal: span(C.normals), elite: span(C.elites), boss: span([C.boss]) };
    ok(JSON.stringify(C.rules.hpText) === JSON.stringify(want), 'rules.hpText 要＝實際聲望 ' + JSON.stringify(want));
    ok((C.rules.foot || []).join('').includes('你 ' + E.CFG.playerHp + ' 聲望') && /\{normal\}.*\{elite\}.*\{boss\}/.test((C.rules.foot || []).join('')), 'rules.foot：你 10 聲望＋{normal}／{elite}／{boss}');
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
    ok(Array.isArray(s.hand) && s.hand.length === 3 && Array.isArray(s.draw) && sameSet([...s.hand, ...s.draw], (C.gifts || {})[t] || []), w + '：起手 3＋抽牌＝老闆四張');
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
// 全部檢查（含烘焙欄位、bins.js、字的鍵）
// ================================================================================================
export function contentProblems(C, E) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const CARDS = C.cards || {};
  const ids = Object.keys(CARDS);
  for (const id of ids) {
    const c = CARDS[id];
    ok(c.id === id, id + ': id 不一致');
    for (const k of ['artist', 'album']) ok(typeof c[k] === 'string' && c[k], id + ': 缺 ' + k);
    for (const k of ATTRS) ok(Number.isInteger(c[k]) && c[k] >= 1 && c[k] <= 7, id + ': 星數 ' + k + '=' + c[k]);
    ok(c.coverUrl || c.localCover, id + ': 沒有封面');
    ok(typeof c.previewUrl === 'string' && /^https:\/\//.test(c.previewUrl), id + ': 沒有試聽');
    ok(['tw', 'jp', 'zh', 'xx'].includes(c.region), id + ': region ' + c.region);
    ok(Array.isArray(c.tags) && Array.isArray(c.genres), id + ': tags/genres');
    ok(c.tier == null || TIERS.includes(c.tier), id + ': tier ' + c.tier);
    if (c.tier) ok(Math.max(c.c, c.o, c.h) === 7, id + ': 王牌要有 7 星那軸');
    else ok(Math.max(c.c, c.o, c.h) <= 5, id + ': 一般卡最高 5 星');
  }
  bad.push(...shapeProblems(C, E));
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
  ok(C.coachTips && sameSet(Object.keys(C.coachTips), ['tip_mirror', 'tip_bluff', 'tip_block', 'tip_ace', 'tip_rounds']), 'coachTips 要剛好是 tip_mirror tip_bluff tip_block tip_ace tip_rounds');
  for (const k of Object.keys(C.coachTips || {})) ok(C.coachTipTags && C.coachTipTags[k], 'coachTipTags.' + k);
  // §2.2.7 那一份，扣掉 aceYou／aceHim（FIXLIST 2：王牌沒有「不會被剋」，不會再有 blocked:'ace'）
  const DT = ['pickHint', 'picked', 'again', 'throwBtn', 'waiting', 'hintLabel', 'sleeve', 'rounds', 'hp', 'aceSlot', 'aceUsed', 'aceWord', 'he', 'you', 'slotE', 'slotP',
    'lastPrefix', 'pileLeft', 'counter', 'countered', 'blockedYou', 'blockedHim', 'mirror', 'tie', 'hitE', 'hitP', 'bluff', 'honest',
    'bluffNoKey', 'honestNoKey', 'koWin', 'koWinSub', 'koLose', 'roundsOut', 'roundsScore', 'roundsEven'];
  ok(C.duelText && sameSet(Object.keys(C.duelText), DT), 'duelText 的鍵要剛好是 §2.2.7 那一份（沒有 aceYou／aceHim）');
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
  const SL = C.shopLines || {};
  for (const k of ['poster', 'cat', 'locked', 'binBusy', 'titleHint', 'taipeiHere', 'taipeiNote', 'taipeiLink', 'backToShop', 'bin', 'booth', 'boothEmpty']) ok(typeof SL[k] === 'string' && SL[k], 'shopLines.' + k);
  ok(SL.binBusy === '打完再翻。', 'shopLines.binBusy＝「打完再翻。」（D §6）');
  ok(SL.ownerHint && ['title', 'scene', 'night', 'duel', 'reward'].every(k => typeof SL.ownerHint[k] === 'string'), 'shopLines.ownerHint 五個畫面');
  ok(Array.isArray(SL.nightIntro) && SL.nightIntro.length === 2, 'shopLines.nightIntro 兩句');
  const SU = ['money', 'binTitle', 'buy', 'noMoney', 'bagFull', 'sellPick', 'bought', 'sold', 'relicTitle', 'relicFull', 'relicBought', 'bargainTitle', 'bargainPrompt',
    'bargainTake', 'bargainBuy', 'bargainEmpty', 'close', 'earned',
    'bag', 'binEmpty', 'owned', 'bagFullN', 'moneyShort', 'sellFirst', 'relicSell', 'relicSold', 'relicEmpty', 'relicMoneyShort', 'relicSellFirst', 'prev', 'next', 'infoAria'];
  ok(C.shopUi && SU.every(k => typeof C.shopUi[k] === 'string' && C.shopUi[k]), 'shopUi 的鍵（§2.2.8）');
  ok(C.night && C.night.times.length === 5 && C.night.normals === 3 && C.night.retry === 1 && C.night.label, 'night：5 個時間、一般 3 位、說情 1 次');
  ok(C.summary && C.summary.reached && C.summary.wins && C.summary.taken && C.summary.again, 'summary 結算三件事＋再來一夜');
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
//   十四區 { key, label, zh, pool, front }；分類箱的 pool 都是那一類（第一個曲風＝genre-tree 頂層、台灣地區＝tw）；FEATURE 只有史詩／傳奇；
//   沒有頂點卡；front 的卡都在；30 晚 newRun 每區都上得到 4–6 張（FEATURE 2–3）、全店不重複
// ================================================================================================
export const BIN_LABELS = { jazz: ['JAZZ', '爵士'], tw: ['TW', '台灣'], rock: ['ROCK', '搖滾'], elec: ['ELEC', '電子'], soul: ['SOUL', '靈魂放克'],
  hiphop: ['HIP-HOP', '嘻哈 R&B'], pop: ['POP', '流行'], classical: ['CLASSICAL', '古典'], world: ['WORLD', '世界'], folk: ['FOLK', '民謠'], blues: ['BLUES', '藍調'],
  new: ['NEW', '新進'], feature: ['FEATURE', '店長推薦精選'], picks: [null, '店長推薦'] };
export function binsProblems(C, E) {
  const bad = [];
  const ok = (cond, msg) => { if (!cond) bad.push(msg); return !!cond; };
  const B = C.bins || {}, CARDS = C.cards || {};
  let tops = null; try { tops = JSON.parse(fs.readFileSync(path.join(ROOT, 'genre-tree.json'), 'utf8')).genres.map(g => g.id); } catch (_) { tops = null; }
  ok(sameSet(Object.keys(B), Object.keys(BIN_LABELS)), 'bins 的鍵要剛好是契約的 14 區：' + Object.keys(BIN_LABELS).join(' ') + '（現在 ' + Object.keys(B).join(' ') + '）');
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
  // 30 晚上貨：每區都上得滿下限（全店不重複之後）
  const short = {};
  for (let s = 1; s <= 30; s++) {
    const run = E.newRun(C, { seedKey: 'bins-check-' + s, nightNo: 1 + (s % 3), ace: TIERS[s % 3] });
    const all = Object.values(run.shop.bins).flat();
    ok(new Set(all).size === all.length, '第 ' + s + ' 晚：全店有重複的唱片');
    for (const [k, st] of Object.entries(run.shop.bins)) if (st.length < (k === 'feature' ? 2 : 4)) short[k] = Math.min(short[k] == null ? 99 : short[k], st.length);
  }
  for (const [k, n] of Object.entries(short)) bad.push('bins.' + k + '：有幾晚只上得到 ' + n + ' 張（扣掉王牌、包包、特價箱、別區先拿的、稀有度不對的之後不夠；pool 要再多一點）');
  return bad;
}

// ================================================================================================
// v4 劇本（SPEC-v4 §2.5.3、§2.5.4；D §2、§3）
// ================================================================================================
const STEP_DO = ['walk', 'pose', 'emote', 'wait', 'door', 'face', 'hold', 'hide', 'give', 'floor', 'sfx', 'par', 'seq'];
const ACTORS = ['p', 'o', 'f', 'r1', 'q1', 'q2'];
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
  ok(sameSet(Object.keys(S), ['prologue', 'epilogueWin', 'bossEnter', 'clear', 'dead', 'again']), 'C.script 要剛好是 prologue／epilogueWin／bossEnter／clear／dead／again（quietPrologue、afterPrologue 刪掉）');
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
  ok(ids === 'O1 O2 O3 O4 O5a O5b O6 O7 O8r O8w O9 O10 O11 O12 O13 O14 O15 O16 O17 O18 O19 O20 O21', 'script.prologue 的 id 與順序：' + ids);
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
  // 熟客：序章與收尾藏起來
  ok(by('O1').set && by('O1').set.hide && by('O1').set.hide.r1 === true && by('E1').set && by('E1').set.hide && by('E1').set.hide.r1 === true, '熟客 r1：O1、E1 藏起來');
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
  ok(!(S.clear || []).some(b => /有空再來這邊走走/.test(b.text)), 'clear：「年輕人，有空再來…」回到序章收尾 E8，通關不再說');
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
  const LEARN = { L1: '同色比星數', L2: '冷門剋經典', L3: '經典剋硬蕊', L4: '硬蕊剋冷門', L5: '差 2 星剋不動', L6: '王牌 7 星，一場用一次' };   // L6：FIXLIST 2
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
    if (s.kind === 'do') {
      const al = s.allow || {};
      if (al.throw) {
        ok(!al.pick && s.point === 'throw' && (s.target || []).includes('throw') && (s.target || []).includes('pick'), w + '：丟的那步 allow {throw}、point throw、target 含 pick 與 throw');
        thrown = true; hand++;
      } else ok(al.pick === true && s.point === 'pick' && JSON.stringify(s.target) === JSON.stringify(['tile:pick']), w + '：點的那步 allow {pick}、point pick、target [tile:pick]');
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
const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  const C = require(path.join(LAB, 'content.js'));
  const E = require(path.join(LAB, 'engine.js'));
  const bad = contentProblems(C, E);
  if (bad.length) { console.log('content 自檢沒過（' + bad.length + '）：'); bad.forEach(b => console.log('  ✗ ' + b)); process.exitCode = 1; }
  else {
    const decks = Object.values(C.enemies).map(e => e.id + ' ' + e.deck.length + '／' + e.hp + '／' + E.deckMain(e.deck.map(id => C.cards[id]), e.taste)).join('、');
    if (!(C.bins && C.bins.feature)) console.log('（bins.js 還是舊形狀、沒有 feature 區：契約檢查 binsProblems 等 Y 的 bins.js 進來才跑；engine.test 用 fixture 驗）');
    console.log('content 自檢通過：卡 ' + Object.keys(C.cards).length + ' 張；客人 10 位（唱片／聲望／主屬性 ' + decks + '）；發燒配件 ' + Object.keys(C.relics).length + ' 件；箱子 ' + Object.keys(C.bins).length + ' 區。');
  }
}
