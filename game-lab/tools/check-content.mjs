// check-content.mjs：content.js／cards.js／bins.js 結構自檢（品味對決 v4；SPEC-v4 §2.2、§4、§5.1）。改了客人、牌組、經濟、教學資料或重烘 cards.js 之後跑一次。
//
//   node game-lab/tools/check-content.mjs     # 有問題 exit 1
//
// 檢查：
//   卡片：欄位、星數（一般卡 ≤5、王牌那軸 7）、封面、試聽、region ∈ tw／jp／zh／xx；所有引用的卡 id 都存在（王牌、禮物、特價箱、牌單、掉牌、教學、箱子）。
//   王牌、禮物（§4.2：三軸都有 ≥4 星、殿堂有冷門 ≥4、王牌那軸 ≥4 至少 2 張）、特價箱（§4.3：9 張、topAttr 3／3／3、峰值 ≤3、冷門 ≤3）。
//   客人（§2.2.3、§4.1）：誠實度（男子老實、一般偶爾唬人、菁英愛唬人、藏家老江湖）、聲望（男子 10、其他 12–20）、張數（男子 6、一般與菁英 7、藏家 6）；
//     牌組限制（deckMain、嚴格峰值 ≥4、唬人色 ≥4 星 ≥2 張、剋他用色 ≥4 星 ≥1 張；男子只要一張副屬性 ≥4；經典客人 ≤4 位不含藏家；
//     藏家三色各 ≥2 張峰值、每色都有 ≥4 星）；牌組／禮物／特價箱彼此不重複且不含王牌。
//   提示句（§2.2.4：每色 5 句、key 必為 text 的子字串、不寫屬性名）、誠實度表、出招難度表、經濟（§2.2.5 的旋鈕範圍、配件價 > 唱片最高價）、
//   發燒配件 9 件（§2.2.6）、規則卡六行逐字＝tools/owner-lines-v4.json、頁尾聲望數字、教學規則資料（§2.2.10）、小提示、盤面字、店內字、經濟介面字。
//   C.bins 的鍵＝bins.js（A3 烘）。
//   v3 教學步驟（t1–t10）的檢查已刪；v4 教學步驟的檢查由第二波 B2 補。
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

  // ---- 誠實度、難度 ----
  const HK = ['honest', 'sometimes', 'often', 'veteran'];
  ok(C.honesty && sameSet(Object.keys(C.honesty), HK), 'honesty 要剛好是 ' + HK.join(' '));
  for (const k of HK) { const h = (C.honesty || {})[k]; ok(h && typeof h.zh === 'string' && h.zh && h.q > 0 && h.q <= 1, 'honesty.' + k + ': zh／q'); }
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
  for (const id of EIDS) {
    const e = (C.enemies || {})[id]; const w = 'enemies.' + id;
    if (!e) continue;
    const kind = kindOf(e);
    ok(e.id === id && e.name, w + ': id／name');
    ok(e.honesty === WANT_H[kind], w + ': 誠實度要 ' + WANT_H[kind] + '，現在 ' + e.honesty);
    for (const k of ['habit', 'phase2', 'phase2Label', 'habitLabel', 'p', 'planner']) ok(!(k in e), w + ': v4 拿掉的欄位 ' + k);
    if (kind === 'man') ok(e.hp === 10, w + ': 男子聲望固定 10');
    else ok(Number.isInteger(e.hp) && e.hp >= 12 && e.hp <= 20, w + ': 聲望要在 12–20，現在 ' + e.hp);
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

  // ---- 經濟（§2.2.5 的旋鈕範圍） ----
  const EC = C.economy || {};
  ok(Number.isInteger(EC.start) && EC.start >= 0 && EC.start <= 300, 'economy.start 0–300');
  const W = EC.win || {};
  ok(['prologue', 'normal', 'elite', 'boss'].every(k => Number.isInteger(W[k])), 'economy.win 四級');
  ok(W.prologue >= 0 && W.prologue <= 300, 'economy.win.prologue 0–300');
  ok(W.normal >= 200 && W.normal <= 500, 'economy.win.normal 200–500');
  ok(W.elite >= 300 && W.elite <= 800 && W.elite >= W.normal, 'economy.win.elite 300–800 且 ≥ normal');
  ok(W.boss === 0, 'economy.win.boss 要 0（打贏藏家＝通關）');
  const PR = EC.price || {}, BASE = { 1: 100, 2: 100, 3: 200, 4: 400, 5: 800 };
  for (let s = 1; s <= 5; s++) {
    ok(Number.isInteger(PR[s]) && PR[s] >= BASE[s] * 0.5 && PR[s] <= BASE[s] * 1.5, 'economy.price[' + s + '] 要在起始值 ±50%');
    if (s > 1) ok(PR[s] >= PR[s - 1], 'economy.price 要單調不減（' + (s - 1) + '→' + s + '）');
  }
  ok(PR[5] <= 850, 'economy.price[5] ≤ 850');
  ok(EC.sellRate === 0.5, 'economy.sellRate 0.5（半價賣回）');
  ok(Number.isInteger(EC.bargainPrice) && EC.bargainPrice >= 50 && EC.bargainPrice <= 200, 'economy.bargainPrice 50–200');
  ok(JSON.stringify(EC.stock) === '[4,6]' && JSON.stringify(EC.relicStock) === '[2,3]', 'economy.stock [4,6]、relicStock [2,3]');

  // ---- 發燒配件（§2.2.6） ----
  const RIDS = ['dustcover', 'stylus', 'cleaner', 'obi', 'testpress', 'headphone', 'boost_c', 'boost_o', 'boost_h'];
  ok(C.relics && sameSet(Object.keys(C.relics), RIDS), '發燒配件要剛好 9 件：' + RIDS.join(' '));
  for (const [id, r] of Object.entries(C.relics || {})) {
    ok(r.id === id && r.name && r.icon && r.desc && r.note && r.tag, 'relics.' + id + ': id／name／icon／desc／note／tag');
    ok(Number.isInteger(r.price) && r.price >= 900 && r.price <= 1500, 'relics.' + id + ': 價格 900–1500');
    if (/^boost_/.test(id)) ok(r.boost === id.slice(6), 'relics.' + id + ': boost 要是 ' + id.slice(6));
    else ok(!r.boost, 'relics.' + id + ': 只有 boost_* 有 boost');
  }
  ok(C.relics && C.relics.headphone && C.relics.headphone.v4 === false, 'relics.headphone.v4 要 false（〔補〕⚠規則，等店主決定）');
  const maxPrice = Math.max(...Object.values(PR).filter(Number.isFinite));
  const minRelic = Math.min(...Object.values(C.relics || {}).map(r => r.price).filter(Number.isFinite));
  ok(minRelic > maxPrice, '配件價要全部高於唱片最高價（min 配件 ' + minRelic + ' > max 唱片 ' + maxPrice + '）');
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
    ok(l && l.line && l.intro && l.lose && l.win, 'lines.' + id + '：line／intro／lose／win');
    ok(!l || !('switch' in l), 'lines.' + id + '：v4 拿掉 switch（急了／翻面）');
  }
  ok(C.lines && C.lines.boss && C.lines.boss.intro === '讓我看看你的品味有幾兩重。', 'lines.boss.intro＝BOSS_LINES[0]（去掉引號）');

  // 箱子＝bins.js
  let BJ = null; try { BJ = require(path.join(LAB, 'bins.js')); } catch (_) { BJ = null; }
  const binsSrc = BJ && BJ.shops && BJ.shops.dip;
  if (ok(!!binsSrc, '沒有 bins.js（A3-M1 由 tools/bake-cards.mjs 產生）')) {
    ok(sameSet(Object.keys(C.bins || {}), Object.keys(binsSrc)), 'C.bins 的鍵要＝bins.js');
    for (const [k, b] of Object.entries(binsSrc)) for (const id of b.pool || []) has(id, 'bins.' + k);
  }

  // 小提示、盤面字、店內字、經濟介面字
  ok(C.coachTips && sameSet(Object.keys(C.coachTips), ['tip_mirror', 'tip_bluff', 'tip_block', 'tip_ace', 'tip_rounds']), 'coachTips 要剛好是 tip_mirror tip_bluff tip_block tip_ace tip_rounds');
  for (const k of Object.keys(C.coachTips || {})) ok(C.coachTipTags && C.coachTipTags[k], 'coachTipTags.' + k);
  const DT = ['pickHint', 'picked', 'again', 'throwBtn', 'waiting', 'hintLabel', 'sleeve', 'rounds', 'hp', 'aceSlot', 'aceUsed', 'aceWord', 'he', 'you', 'slotE', 'slotP',
    'lastPrefix', 'pileLeft', 'counter', 'countered', 'blockedYou', 'blockedHim', 'aceYou', 'aceHim', 'mirror', 'tie', 'hitE', 'hitP', 'bluff', 'honest',
    'bluffNoKey', 'honestNoKey', 'koWin', 'koWinSub', 'koLose', 'koLoseRetry', 'roundsOut', 'roundsScore'];
  ok(C.duelText && sameSet(Object.keys(C.duelText), DT), 'duelText 的鍵要剛好是 §2.2.7 那一份');
  // D §5 的三個例句要組得出來
  if (C.duelText) {
    const f = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
    const T = C.duelText;
    ok(f(T.counter, { a: '冷門', b: '經典' }) + f(T.hitE, { n: 4 }) === '冷門剋經典，命中！他 −4', 'duelText：組不出「冷門剋經典，命中！他 −4」');
    ok(f(T.blockedYou, { a: '冷門', b: '經典' }) + f(T.hitP, { n: 3 }) === '冷門剋經典，但他高你 2 星以上，剋不動。比星數，你 −3', 'duelText：組不出剋不動那句');
    ok(f(T.bluff, { key: '紀念版', hint: '經典', e: '硬蕊' }) + f(T.hitP, { n: 4 }) === '他唬你！『紀念版』是經典，他出的是硬蕊。你 −4', 'duelText：組不出唬人那句');
  }
  const SL = C.shopLines || {};
  for (const k of ['poster', 'cat', 'locked', 'binBusy', 'titleHint', 'taipeiHere', 'taipeiNote', 'taipeiLink', 'backToShop', 'bin', 'booth', 'boothEmpty']) ok(typeof SL[k] === 'string' && SL[k], 'shopLines.' + k);
  ok(SL.binBusy === '打完再翻。', 'shopLines.binBusy＝「打完再翻。」（D §6）');
  ok(SL.ownerHint && ['title', 'scene', 'night', 'duel', 'reward'].every(k => typeof SL.ownerHint[k] === 'string'), 'shopLines.ownerHint 五個畫面');
  ok(Array.isArray(SL.nightIntro) && SL.nightIntro.length === 2, 'shopLines.nightIntro 兩句');
  const SU = ['money', 'binTitle', 'buy', 'noMoney', 'bagFull', 'sellPick', 'bought', 'sold', 'relicTitle', 'relicFull', 'relicBought', 'bargainTitle', 'bargainPrompt',
    'bargainTake', 'bargainBuy', 'bargainEmpty', 'close', 'earned'];
  ok(C.shopUi && SU.every(k => typeof C.shopUi[k] === 'string' && C.shopUi[k]), 'shopUi 的鍵（§2.2.8）');
  ok(C.night && C.night.times.length === 5 && C.night.normals === 3 && C.night.retry === 1 && C.night.label, 'night：5 個時間、一般 3 位、說情 1 次');
  ok(C.summary && C.summary.reached && C.summary.wins && C.summary.taken && C.summary.again, 'summary 結算三件事＋再來一夜');
  ok(C.script && Array.isArray(C.script.prologue), 'script.prologue（第一波仍是 v3 墊片，B2 改）');
  const enemyNames = Object.values(C.enemies).map(e => e.name);
  ok(C.names.length >= 20 && C.names.every(n => !enemyNames.includes(n) && [...n].length <= 8), 'names：不能用客人的名字、≤8 字');
  ok(C.avatarsFallback.length === 6, 'avatarsFallback 要 6 組'); C.avatarsFallback.forEach((a, k) => avatarOk(a, 'avatarsFallback[' + k + ']'));
  // A3-M2 換牌表（暫時；整合後刪）：新卡烘進 cards.js 就一定已換上，還沒烘就一定還是舊卡
  for (const g of Object.keys(C.m2Swaps || {})) {
    const E = C.enemies[g];
    if (!E) { ok(false, 'm2Swaps：沒有客人 ' + g); continue; }
    for (const sw of C.m2Swaps[g]) {
      ok(Array.isArray(sw) && sw.length === 2 && typeof sw[0] === 'string' && typeof sw[1] === 'string', 'm2Swaps.' + g + '：每筆是 [舊 id, 新 id]');
      ok(C.cards[sw[1]] ? (E.deck.includes(sw[1]) && !E.deck.includes(sw[0])) : E.deck.includes(sw[0]), 'm2Swaps.' + g + '：' + sw.join(' → ') + ' 沒照「新卡在就換上」');
    }
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
    console.log('content 自檢通過：卡 ' + Object.keys(C.cards).length + ' 張；客人 10 位（唱片／聲望／主屬性 ' + decks + '）；發燒配件 ' + Object.keys(C.relics).length + ' 件；箱子 ' + Object.keys(C.bins).length + ' 區。');
    const pend = Object.keys(C.m2Swaps || {}).flatMap(g => C.m2Swaps[g].filter(sw => !C.cards[sw[1]]).map(sw => g + ' ' + sw[0] + ' → ' + sw[1]));
    if (pend.length) console.log('（待 A3-M2：' + pend.length + ' 張換牌還沒烘進 cards.js，牌單暫用舊卡——' + pend.join('；') + '）');
  }
}
