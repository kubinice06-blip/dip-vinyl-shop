// game-lab/test/engine.test.mjs — v4 engine unit / property tests (SPEC-v4 §5.1 A1 列 #1–#14)＋無限試煉（v5 SPEC 無限試煉 §0–§2：#2 #3 #4 #8 #9 #10 改成整趟、#16 曲線與升級）.  Plain node script:
//   node game-lab/test/engine.test.mjs [--quick]
// Exits 1 on any failure.  Uses the real content.js (cards.js, bins.js).
//   第一波：A3 還沒烘 v4 的新卡（cards.js 沒有的卡）時，用下面 STUB 表的星數補一張只有星數的假卡（只在測試裡）；
//   烘好之後 STUB 用不到，#14 會順便比對 STUB 跟真卡的星數一致。
//   箱子（FIXLIST 4／5／8＋X／Y 契約）：bins.js 還不是契約形狀（沒有 feature 那一區；Y 還沒交）時，用 contractBins() 做一份契約形狀的假箱子
//   （十個分類＋三個子曲風區 citypop／indierock／indiepop＋new＋picks＋feature；真卡照第一個曲風／台灣分區，不夠的補 fx-* 假卡），#8 #15 照契約驗上貨。
//   v5 店面改版（店主 11-13）：POP 改 CITY POP、門口長櫃拆 INDIE ROCK／INDIE POP；這三區看子曲風（卡的 subs，規則 sub），不看第一個曲風。
//   第 I 波 I-0（SPEC-I §7）：舊段落的 C 關掉第一位升級（firstNeed 0），黃金照舊；#29–#31 的黃金改在 I0OFF(content) 上比、出貨 content 上比變體彼此一致；新規則在 #32。
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { shapeProblems, binsProblems, apexProblems, factionProblems } from '../tools/check-content.mjs';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const EN = require(path.join(HERE, '../engine.js'));
const C0 = require(path.join(HERE, '../content.js'));
const { ATTRS, BEATS, COUNTER_OF, CFG, TIERS } = EN;
const QUICK = process.argv.includes('--quick');

// ---------------- tiny harness ----------------
let pass = 0, fail = 0; const fails = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; if (fails.length < 60) fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } return !!cond; }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); return ok(A === B, name, A + ' !== ' + B); }
const ONLY = process.env.ENGINE_ONLY || null;   // ENGINE_ONLY=29 node game-lab/test/engine.test.mjs＝只跑名字以 29 開頭的那一節（改單一節時用）
function section(name, fn) { if (ONLY && !name.startsWith(ONLY)) return; const f0 = fail; const t0 = Date.now(); try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name + ' (' + (Date.now() - t0) + ' ms)'); }

// ---------------- test content（STUB 星數＝SPEC-v4 §4.1–§4.3 的表；already／skip 各 2 張是 A3-M2 換上的新卡） ----------------
const STUB = {
  "limp bizkit|results may vary": [1, 1, 3], "eminem|the eminem show": [5, 1, 2], "low|double negative": [5, 3, 4],
  "sophie|oil of every pearl's un-insides": [5, 2, 4], "don slepian|sea of bliss": [3, 4, 2], "harold budd|abandoned cities": [3, 4, 3],
  "demetrio stratos|metrodora": [3, 5, 4], "étron fou leloublan|les trois fou's perdégagnent (au pays des...)": [4, 5, 4],
  "nocturnal emissions|fruiting body": [4, 5, 4], "eivind aarset|électronique noire": [4, 5, 3], "yezda urfa|boris": [4, 5, 3], "roberto goyeneche|cantor de mi barrio": [3, 4, 2],
  "amália rodrigues|gostava de ser quem era": [4, 5, 2], "king sunny adé|aura": [3, 4, 2],
  "washington phillips|the key to the kingdom": [4, 5, 4], "otha turner & the rising star fife & drum band|everybody hollerin' goat": [4, 5, 3],
  "血肉果汁機 flesh juicer|golden太子bro": [3, 3, 4], "血肉果汁機 flesh juicer|深海童話": [3, 3, 4], "閃靈|失竊千年": [3, 3, 4], "血肉果汁機 flesh juicer|血肉宮建宮蓋廟演唱會": [2, 3, 4],
  "閃靈|永劫輪迴": [4, 3, 4], "閃靈|醒靈寺大決戰": [3, 4, 4], "林強|驚蟄": [4, 4, 3], "venetian snares|making orange things": [4, 4, 5],
  "nurse with wound|homotopy to marie": [4, 4, 5], "ryoji ikeda|mort aux vaches": [3, 4, 5], "harry roesli gang|philosophy gang": [5, 5, 3],
  "c.o.b.|moyshe mcstiff and the tartan lancers of the sacred heart": [4, 5, 3], "pholas dactylus|concerto delle menti": [4, 5, 4],
  "the plastic people of the universe|egon bondy's happy hearts club banned": [5, 4, 4], "ganelin trio|ancora da capo": [5, 4, 4],
  "luis russell|the luis russell story 1929-1934": [4, 5, 4], "raw material|time is...": [4, 5, 3], "alexander von schlippenbach|globe unity": [5, 4, 5],
  "裸のラリーズ|the oz tapes": [4, 4, 5], "beverly glenn-copeland|...keyboard fantasies...": [5, 4, 2], "charles brackeen|rhythm x": [4, 5, 4],
  "magma|mëkanïk dëstruktïw kömmandöh": [5, 4, 4], "blur|the great escape": [3, 2, 1], "oasis|dig out your soul": [3, 1, 1],
  "the velvet underground|squeeze": [2, 3, 1], "stevie wonder|eivets rednow": [2, 3, 1], "the kinks|preservation act 1": [2, 3, 1],
  "metallica|reload": [2, 1, 3], "weezer|van weezer": [2, 2, 3], "ramones|halfway to sanity": [2, 2, 3],
};
const CARDS = Object.assign({}, C0.cards);
let stubbed = 0;
for (const [id, s] of Object.entries(STUB)) if (!CARDS[id]) { stubbed++; CARDS[id] = { id, artist: id, album: id, c: s[0], o: s[1], h: s[2], tier: null, genres: [], region: 'xx', stub: true }; }
// 引用到的卡（箱子以外）
const USED = new Set([...Object.values(C0.aces), ...Object.values(C0.gifts).flat(), ...C0.bargain.pool,
  ...Object.values(C0.enemies).flatMap(e => e.deck.concat(e.drop ? [e.drop] : []))]);
// X／Y 契約的箱子：鍵、英文名牌、中文名
const CATS = ['jazz', 'tw', 'rock', 'elec', 'soul', 'hiphop', 'classical', 'world', 'folk', 'blues'];
// 子曲風區（規則 sub＝card-subgenres.json 的路徑；卡的 subs 有一項等於它或在它底下）
const SUB = { citypop: ['pop/jp-pop/city-pop'], indierock: ['rock/indie-alt/indie-rock', 'rock/indie-alt/alt-rock', 'rock/indie-alt/lo-fi', 'rock/dream-post/slowcore'],
  indiepop: ['pop/indie-pop', 'rock/indie-alt/indie-pop', 'pop/pop-rock/power-pop'] };
const subOk = (k, c) => (c.subs || []).some(s => SUB[k].some(w => s === w || s.startsWith(w + '/')));
const LABEL = { jazz: ['JAZZ', '爵士'], tw: ['TW', '台灣'], rock: ['ROCK', '搖滾'], elec: ['ELEC', '電子'], soul: ['SOUL', '靈魂放克'], hiphop: ['HIP-HOP', '嘻哈 R&B'],
  citypop: ['CITY POP', '城市流行'], classical: ['CLASSICAL', '古典'], world: ['WORLD', '世界'], folk: ['FOLK', '民謠'], indierock: ['INDIE ROCK', '獨立搖滾'],
  indiepop: ['INDIE POP', '獨立流行'], blues: ['BLUES', '藍調'], new: ['NEW', '新進'], feature: ['FEATURE', '店長推薦精選'], picks: ['PICKS', '店長推薦'] };
const BIN_KEYS = [...CATS, ...Object.keys(SUB), 'new', 'feature', 'picks'];
function contractBins() {
  const B = {}; for (const k of BIN_KEYS) B[k] = { key: k, label: LABEL[k][0], zh: LABEL[k][1], pool: [], front: [] };
  const GENRE = { elec: 'electronic' };
  const shelf = [], top = [];
  for (const id of Object.keys(CARDS).sort()) {
    const c = CARDS[id];
    if (c.tier || c.stub || C0.bargain.pool.includes(id)) continue;
    const r = EN.rarity(c), k = EN.categoryOf(c);
    if (r === 'epic' || r === 'legendary') { top.push(id); continue; }
    if (k && B[k]) B[k].pool.push(id);
    shelf.push(id);
  }
  // 每個分類補到 ≥7 張（fx-* 假卡；三軸輪流當主軸、普通／稀有／獨特都有）
  const STARS = [[1, 5, 1], [5, 1, 1], [1, 1, 5], [2, 4, 3], [4, 2, 1], [1, 3, 5], [3, 5, 3]];
  let n = 0;
  const mk = (genre, region, st, sub) => { const id = 'fx-' + (n++); CARDS[id] = { id, artist: id, album: id, c: st[0], o: st[1], h: st[2], tier: null, genres: [genre], region, fixture: true, subs: sub ? [sub] : [] }; return id; };
  for (const k of CATS) for (let i = 0; B[k].pool.length < 7; i++) B[k].pool.push(mk(k === 'tw' ? 'rock' : (GENRE[k] || k), k === 'tw' ? 'tw' : 'xx', STARS[i % STARS.length]));
  for (const k of Object.keys(SUB)) for (let i = 0; B[k].pool.length < 7; i++) B[k].pool.push(mk(k === 'indierock' ? 'rock' : 'pop', 'xx', STARS[i % STARS.length], SUB[k][0]));
  // 新進、店長推薦：不限曲風（跟分類箱的 pool 有重疊，上貨時全店不重複）；FEATURE：史詩＋傳奇
  B.new.pool = shelf.filter((id, k) => k % 3 === 0).concat([mk('pop', 'xx', [5, 2, 1]), mk('rock', 'xx', [1, 4, 4])]);
  B.picks.pool = shelf.filter((id, k) => k % 3 === 1).concat([mk('jazz', 'xx', [2, 5, 2]), mk('folk', 'xx', [1, 2, 5])]);
  B.feature.pool = top.slice();
  for (const k of BIN_KEYS) B[k].front = B[k].pool.slice(0, 4);
  return B;
}
let BINS = C0.bins, fakeBins = false;
if (!BINS.feature) { fakeBins = true; BINS = contractBins(); }
// 第 C 波（SPEC-C §11.0，CRITIQUE 1.3）：舊段落用全關的 content（C.waveC 每件 on:false、客人補償 guestHpSteps []）＝第 C 波以前的行為，舊斷言一條都不改；
//   新段落（§11.1）用 CW＝出貨設定（content.js 的 C.waveC 全開、guestHpSteps [[31,1]]）
const WC_OFF = { loot: { on: false }, chest: { on: false }, stall: { on: false }, safety: { on: false } };
//   第 I 波 I-0（SPEC-I §7.2）同一個做法：舊段落的 C 關掉「第一位升級」（firstNeed 0、firstHp＝levelHp＝升級要 等級＋3、每級 +1）；新規則在 CW 與 #32 驗
const C = Object.assign({}, C0, { cards: CARDS, bins: BINS, waveC: WC_OFF, trial: Object.assign({}, C0.trial, { guestHpSteps: [], firstNeed: 0, firstHp: C0.trial.levelHp }) });
const CW = Object.assign({}, C0, { cards: CARDS, bins: BINS });
// 第 I 波 I-0：關掉第一位升級（firstNeed 0、firstHp＝levelHp）＝I-0 以前的局內升級（黃金比對用）
const I0OFF = c => Object.assign({}, c, { trial: Object.assign({}, c.trial || {}, { firstNeed: 0, firstHp: c.trial && Number.isInteger(c.trial.levelHp) ? c.trial.levelHp : 1 }) });
const SKIP$ = EN.wcCfg(CW).loot.skipCash, CSKIP$ = EN.wcCfg(CW).chest.skipCash, PACKET = EN.wcCfg(CW).loot.packet;   // 出貨的「不收」錢、紅包機率（驗收修正：$200、6%）
const COFF = Object.assign({}, C, { lot: Object.assign({}, C.lot, { on: false }) });   // 一檔貨關（第 B 波 SPEC-B §3.2 on:false＝舊補貨原封不動）

// ---------------- helpers ----------------
const card = id => { const c = C.cards[id]; if (!c) throw new Error('missing card ' + id); return c; };
const ENEMY_IDS = ['man', ...C.normals, ...C.elites, C.boss];
const RELIC_IDS = Object.keys(C.relics);
const HINTS = { c: C.hints.c.map(h => h.id), o: C.hints.o.map(h => h.id), h: C.hints.h.map(h => h.id) };
const otherTier = (tier, k) => TIERS.filter(t => t !== tier)[k % 2];
// 每色一張（topAttr 純色；店主 11-16 特價箱換牌後池子是 經 4／冷 4／硬 4 照順序排，原本 [0][3][6] 是舊的 3／3／3 排法）
const BP3 = ATTRS.map(a => C.bargain.pool.find(id => EN.topAttr(C.cards[id]) === a && EN.topAxes(C.cards[id]).length === 1));
const relicObjs = rs => rs.map(r => typeof r === 'string' ? EN.relicObj(r, C) : r);
const HEADPHONE_ON = Object.assign({}, C.relics.headphone, { v4: true });
function pDefFor(tier, o = {}) {
  return { hp: o.hp, maxHp: o.maxHp, atk: o.atk | 0, def: o.def | 0, noteText: C.trial.notes,
    bag: (o.bag || [...C.gifts[tier], ...BP3]).map(card), ace: o.noAce ? null : card(C.aces[tier]), relics: relicObjs(o.relics || []) };
}
// 無限試煉：讓 id 站在類別對得上的位數（一般第 1–3 位、菁英第 4、藏家第 5，往後再推 0–7 輪）；序章男子沒有位數
function posFor(id, s) { const e = C.enemies[id]; if (!e || e.prologue) return undefined; const k = s % 8; return 5 * k + (e.boss ? 5 : e.elite ? 4 : 1 + (s % 3)); }
// o.pos：無限試煉那位（曲線的聲望／品味／底氣／難度／說真話、trialDeck 的牌、他帶的王牌）；沒給＝直接開打（content 的聲望與牌單、藏家帶王牌）
function startFor(id, tier, seed, o = {}) {
  const trial = o.pos != null;
  const eDef = Object.assign(EN.enemyDef(C, id, trial ? { pos: o.pos, seedKey: o.seedKey || ('tst-' + seed), runNo: o.runNo || 1, playerAce: tier, bossAce: o.bossAce || otherTier(tier, seed) } : { tutorial: !!o.tutorial }), o.eOver || {});
  const enemyAce = eDef.ace || (eDef.boss && !trial ? card(C.aces[otherTier(tier, seed)]) : null);
  return EN.startDuel(pDefFor(tier, o), eDef, { seed, enemyAce, script: o.script || null, hintTable: HINTS });
}
// cards are never mutated by the rules → a structural clone that shares card objects is enough (fast)
function fastClone(st) {
  const P = st.p, E = st.e;
  return { ...st, over: st.over ? { ...st.over } : null, plan: st.plan ? { ...st.plan, hint: { ...st.plan.hint } } : null, stats: { ...st.stats }, log: st.log.slice(),
    p: { ...P, draw: P.draw.slice(), hand: P.hand.slice(), disc: P.disc.slice(), relics: P.relics.slice() },
    e: { ...E, pile: E.pile.slice(), hand: E.hand.slice(), thrown: E.thrown.slice(), deckIds: E.deckIds.slice() } };
}
const clashOf = evs => evs.find(e => e.t === 'clash');
const sameSet = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
const sig = r => r && { kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked, by: r.by, notes: r.notes || [] };
function lcg(s) { s = s >>> 0; return () => (s = (Math.imul(s, 1103515245) + 12345) >>> 0) / 4294967296; }
function play(d, pol, R, mem = {}, max = 40) { const evs = []; let g = 0; while (!d.over && g++ < max) { const act = EN.policies[pol](d, R, mem, C); ok(EN.isLegal(d, act), 'policy ' + pol + ' legal', act); evs.push(...EN.resolveTurn(d, act)); } return evs; }
function mkCard(id, c, o, h, tier) { return { id, artist: id, album: id, c, o, h, tier: tier || null }; }
// RNG 取用次數：mulberry32 每次 state += 0x6D2B79F5（mod 2^32）→ 次數＝差 × 逆元
const M32 = 1n << 32n;
function modInv(a, m) { let [r0, r1, s0, s1] = [a, m, 1n, 0n]; while (r1) { const q = r0 / r1; [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return ((s0 % m) + m) % m; }
const INV = modInv(0x6D2B79F5n, M32);
const rngCalls = (before, after) => Number(((((BigInt(after) - BigInt(before)) % M32) + M32) % M32) * INV % M32);
const relicSet = s => {
  if (s % 5 === 0) return [];
  if (s % 5 === 1) return [RELIC_IDS[s % RELIC_IDS.length]];
  const boost = ['boost_c', 'boost_o', 'boost_h'][s % 3], rest = RELIC_IDS.filter(r => r !== boost && r !== 'headphone');
  const out = [boost, rest[(s * 7) % rest.length], rest[(s * 13 + 3) % rest.length]].filter((x, k, a) => a.indexOf(x) === k);
  return s % 7 === 0 ? out.slice(0, 2).concat([HEADPHONE_ON]) : out;
};

// =====================================================================================================
section('1 preview === resolve（10 客人 × 3 王牌 × 400 種子；每一手每一個合法動作；配件組合；無限試煉的品味／底氣兩邊都有）', () => {
  const seeds = QUICK ? 40 : 400;
  let checked = 0, statNotes = 0;
  for (const id of ENEMY_IDS) for (const tier of TIERS) for (let s = 1; s <= seeds; s++) {
    const { duel } = startFor(id, tier, s * 7919 + 13, { relics: relicSet(s), pos: s % 4 ? posFor(id, s) : undefined, atk: s % 3, def: (s >> 2) % 3 });
    const R = lcg(s);
    let g = 0;
    while (!duel.over && g++ < 12) {
      const before = JSON.stringify(duel);
      const acts = EN.legalActions(duel), eSide = { i: duel.plan.idx, attr: duel.plan.attr };
      for (const act of acts) {
        const pv = EN.preview(duel, act, eSide);
        const c2 = fastClone(duel);
        const cl = clashOf(EN.resolveTurn(c2, act));
        if (!ok(!!pv && !!cl, 'preview/resolve exist', { id, tier, s })) continue;
        if (JSON.stringify(sig(pv)) !== JSON.stringify(sig(cl))) ok(false, 'preview === clash', { id, tier, s, n: duel.n, act, want: sig(pv), got: sig(cl) });
        else pass++;
        if (pv && pv.notes.some(n => n.stat)) statNotes++;
        checked++;
      }
      ok(JSON.stringify(duel) === before, 'preview is pure (state unchanged)', { id, tier, s, n: duel.n });
      EN.resolveTurn(duel, acts[Math.floor(R() * acts.length)]);
    }
    ok(!!duel.over && duel.n <= CFG.maxRounds, 'duel ends within 6 hands', { id, tier, s, n: duel.n });
  }
  ok(statNotes > 1000, 'previews with 品味／底氣 notes exercised', statNotes);
  console.log('     ' + checked + ' action previews checked (' + statNotes + ' with 品味／底氣 notes)');
});

// 無限試煉的說真話機率（SPEC §0：舊版虛晃率 oldQ；第 13 位起封底 0.45）——測試自己照 curves.cjs 寫一份，不讀 engine
const oldQ = d => (d < 3 ? 1 : d < 5 ? 0.85 : 1 - Math.min(0.55, 0.18 + 0.05 * Math.max(0, d - 5)));
// 放水照位數機率（第 A 波 2，店主 11-16 選 C）：第 1–10 位每手放水；第 11 位起 max(0.2, 0.9 − 0.1×⌊(位−11)/5⌋)——測試自己寫一份
const mercyPT = d => (d < 11 ? 1 : Math.max(0.2, 0.9 - 0.1 * Math.floor((d - 11) / 5)));
// 現在的曲線 q：店主 11-16「前期太簡單」——第 1–2 位 0.75（easy，會唬人；主線 11-16 起 easy 也放水唬人；第 A 波合併 0.8→0.75）、第 3–4 位 0.75（normal）；第 5 位起＝oldQ
//   11-17 讀牌加難（scratchpad v5/harder DESIGN §2.2）：第 3–4 位 0.72；第 5 位起 1−min(0.40, 0.25＋0.05×(位−5))（第 5 位 0.75、第 8 位起封底 0.60）
const newQ = d => 1 - Math.min(0.40, 0.25 + 0.05 * Math.max(0, d - 5));
const curQ = d => (d < 3 ? 0.75 : d < 5 ? 0.72 : newQ(d));
const mercyOfT = st => { const P = st.p, E = st.e, pR = Math.max(0, P.hp) / (P.max || 1), eR = Math.max(0, E.hp) / (E.max || 1); let m = Math.max(0, eR - pR) * 1.3; if (P.hp <= 3) m += 0.35; return Math.min(1, m); };
const idsAt = pos => { const c = EN.classAt(pos); return c === 'boss' ? [C.boss] : c === 'elite' ? C.elites : C.normals; };
section('2 誠實度：無限試煉每一位 q＝曲線 q（舊版虛晃率＋11-16 前期加難；mercy 關 ±0.01）；放水：照實率＝Σ qNow（±0.01）；直接開打照 C.honesty；ace／script／headphone 100% 照實；唬人出 BEATS[提示]；王牌不變式', () => {
  const POS = QUICK ? [1, 4, 6, 13] : [1, 2, 3, 4, 5, 6, 8, 10, 12, 13, 20];
  const target = QUICK ? 12000 : 30000;
  const whyN = {};
  // (a) mercy 關：照實比例＝trialGuest(pos).q＝curQ(pos)（第 1–2 位 easy 也會唬：q 0.75）
  try {
    CFG.mercy = false;
    for (const pos of POS) {
      const ids = idsAt(pos), q = curQ(pos);
      ok(Math.abs(EN.trialGuest(C, pos, EN.classAt(pos)).q - q) < 1e-9, 'trialGuest q = curQ at ' + pos);
      let hands = 0, honest = 0;
      for (let s = 1; hands < target; s++) {
        const id = ids[s % ids.length], tier = TIERS[s % 3];
        const { duel } = startFor(id, tier, s * 31 + 7 + pos, { pos, atk: s % 2, def: s % 3 === 0 ? 1 : 0 });
        ok(Math.abs(duel.e.q - q) < 1e-9, 'duel q = curve q');
        const R = lcg(s * 3 + 1);
        while (!duel.over) {
          const pl = duel.plan, eCard = duel.e.hand[pl.idx];
          whyN[pl.why] = (whyN[pl.why] || 0) + 1;
          if (pl.why === 'honest' || pl.why === 'bluff') { hands++; if (pl.why === 'honest') honest++; }
          // 11-17：唬人分兩種（第 3 位起 e.beta < 1：BEATS[提示]＝剋你剋法、COUNTER_OF[提示]＝剋提示色本身）；讀你（why read／readHonest）出 COUNTER_OF[預測]
          const bOk = pl.attr === BEATS[pl.hint.attr] || (duel.e.beta != null && duel.e.beta < 1 && pl.attr === COUNTER_OF[pl.hint.attr]);
          if (pl.why === 'bluff') { if (!bOk || pl.bluff !== true || eCard.tier) ok(false, 'bluff plays BEATS[hint] (or COUNTER_OF[hint] from pos 3) and never the ace', pl); else pass++; }
          else if (pl.why === 'read' || pl.why === 'readHonest') {
            const pred = pl.rel === 'counter' ? COUNTER_OF[pl.hint.attr] : pl.rel === 'mirror' ? pl.hint.attr : BEATS[pl.hint.attr];
            if (pos < 3 || !pl.rel || pl.attr !== COUNTER_OF[pred] || (pl.why === 'readHonest') !== (pl.attr === pl.hint.attr) || pl.bluff !== (pl.attr !== pl.hint.attr) || eCard.tier) ok(false, 'read plays COUNTER_OF[predicted] (pos ≥3), never the ace', pl); else pass++;
          }
          else if (pl.attr !== pl.hint.attr || pl.bluff) ok(false, pl.why + ' → honest', pl);
          if (pl.why === 'ace' && !(eCard.tier && pl.hint.attr === EN.aceAxis(eCard))) ok(false, 'why ace → plays the ace on its axis', pl);
          const cl = clashOf(EN.resolveTurn(duel, EN.policies.random(duel, R)));
          if (cl.eCard !== eCard || cl.eAttr !== pl.attr || cl.bluff !== pl.bluff) ok(false, 'clash shows the planned play', { pl, eAttr: cl.eAttr });
          if (cl.eCard.tier && (cl.hint.attr !== EN.aceAxis(cl.eCard) || cl.bluff)) ok(false, 'ace thrown → hint is its axis, no bluff', cl.hint);
        }
      }
      const f = honest / hands;
      ok(Math.abs(f - q) <= 0.01, 'honest rate (mercy off) at pos ' + pos + ' = ' + q + ' ± 0.01', f.toFixed(4));
      console.log('     pos ' + pos + ' (' + EN.classAt(pos) + '): honest ' + f.toFixed(4) + ' (q ' + q + ') over ' + hands + ' hands, mercy off');
    }
    // (c) 直接開打（沒有位數）：照 C.honesty（mercy 關）
    const LV = { honest: ['man'], sometimes: C.normals, often: C.elites, veteran: [C.boss] };
    for (const [lv, ids] of Object.entries(LV)) {
      let hands = 0, honest = 0;
      for (let s = 1; hands < target; s++) {
        const { duel } = startFor(ids[s % ids.length], TIERS[s % 3], s * 37 + lv.length);
        const R = lcg(s * 5 + 2);
        while (!duel.over) { const w = duel.plan.why; if (w === 'honest' || w === 'bluff') { hands++; if (w === 'honest') honest++; } EN.resolveTurn(duel, EN.policies.random(duel, R)); }
      }
      ok(Math.abs(honest / hands - C.honesty[lv].q) <= 0.012, 'direct duel honest rate ' + lv + ' = ' + C.honesty[lv].q, (honest / hands).toFixed(4));
    }
  } finally { CFG.mercy = true; }
  // (b) 放水（mercy 開）：這手的 qNow＝1−(1−q)(1−0.8·mercy·p)（p＝第 11 位起每手放水的機率，第 1–10 位 1）；照實手數＝Σ qNow（±0.01）；你落後時他確實少唬
  //   主線 11-16「放水前期保留」：第 1–2 位 easy（q 0.75）也吃放水唬人——跟 normal／hard 同一條式子（原本只有 normal／hard，easy 落後時照樣 20% 唬）
  //   第 A 波 2：qNow 是期望值（策略不知道這手有沒有放水）；第 11 位起再看這手真的放水（plan.mercy）的比例 ≈ p，沒放水的手照實率 ≈ q
  for (const pos of POS) {
    const ids = idsAt(pos), q = curQ(pos), pm = mercyPT(pos);
    let hands = 0, honest = 0, sumQ = 0, behind = 0, on = 0, offH = 0, offHonest = 0, dec = 0, decOn = 0;
    for (let s = 1; hands < target / 2; s++) {
      const { duel } = startFor(ids[s % ids.length], TIERS[s % 3], s * 41 + 3 + pos, { pos, hp: 4 + (s % 9), maxHp: 12 });
      ok(pm < 1 ? duel.e.mercyP === pm && Number.isInteger(duel.e.mercyKey) : !('mercyP' in duel.e) && !('mercyKey' in duel.e), 'duel.e.mercyP only from pos 11 (' + pos + ')');
      const R = lcg(s * 7 + 5);
      while (!duel.over) {
        const pl = duel.plan, v = EN.view(duel), m = mercyOfT(duel), want = 1 - (1 - q) * (1 - C.trial.curve.mercyFeint * m * pm);
        if (Math.abs(v.honesty.qNow - want) > 1e-9) ok(false, 'view.honesty.qNow = 1−(1−q)(1−0.8·mercy·p)', { qNow: v.honesty.qNow, want, m, pm }); else pass++;
        // 11-17：第 3 位起先看讀不讀你（放水那手讀心 ×(1−0.7m)），照實／唬人只在沒讀你的手。第 11 位起沒讀你的手裡放水手會偏多，
        //   所以照實率對的是這手實際有沒有放水（pl.mercy；第 1–10 位每手都放水＝qNow 本身），放水手的比例改看全部會讀／照實／唬人的手
        if (['honest', 'bluff', 'read', 'readHonest'].includes(pl.why)) { dec++; if (pl.mercy) decOn++; }
        if (pl.why === 'honest' || pl.why === 'bluff') {
          hands++; sumQ += pm >= 1 ? want : pl.mercy ? 1 - (1 - q) * (1 - C.trial.curve.mercyFeint * m) : q; if (pl.why === 'honest') honest++; if (m > 0) behind++;
          if (pl.mercy) on++; else { offH++; if (pl.why === 'honest') offHonest++; }
        }
        if (pm >= 1 && pl.mercy !== true) ok(false, 'pos ≤10: every hand is a mercy hand', pl);
        EN.resolveTurn(duel, EN.policies.random(duel, R));
      }
    }
    ok(Math.abs(honest - sumQ) / hands <= 0.01, 'honest rate (mercy on) at pos ' + pos + ' = mean qNow ± 0.01', { f: (honest / hands).toFixed(4), qNow: (sumQ / hands).toFixed(4) });
    ok(q === 1 || (sumQ / hands > q + 0.01 && behind > hands / 4), 'mercy on: he bluffs less when you are behind (pos ' + pos + ')', { qNow: (sumQ / hands).toFixed(4), q, behind, hands });
    if (pm < 1) {
      ok(Math.abs(decOn / dec - pm) <= 0.02, 'pos ' + pos + ': share of mercy hands ≈ ' + pm + ' ± 0.02', (decOn / dec).toFixed(4));
      ok(offH > 200 && Math.abs(offHonest / offH - q) <= 3.5 * Math.sqrt(q * (1 - q) / offH) + 0.005, 'pos ' + pos + ': hands without mercy → honest rate ≈ q (' + q + ', ±3.5σ)', { f: (offHonest / offH).toFixed(4), offH });
      console.log('     pos ' + pos + ': mercy hands ' + (decOn / dec).toFixed(3) + ' (p ' + pm + '), honest without mercy ' + (offHonest / offH).toFixed(3) + ' (q ' + q + ')');
    }
  }
  // 王牌不變式：藏家（第 5、10、15 位）× 3 王牌
  const games = QUICK ? 1500 : 12000;
  let aceHands = 0, bluffHands = 0;
  for (const tier of TIERS) for (let s = 1; s <= games; s++) {
    const pos = 5 * (1 + (s % 3));
    const { duel } = startFor('boss', tier, s * 911 + 3, { pos });
    ok(duel.e.deckIds.length === 7 && duel.e.deckIds.includes(C.aces[otherTier(tier, s * 911 + 3)]), 'trial boss: 6 + the ace you did not pick');
    const R = lcg(s + 17);
    while (!duel.over) {
      const cl = clashOf(EN.resolveTurn(duel, EN.policies.random(duel, R)));
      if (cl.eCard.tier) { aceHands++; if (cl.hint.attr !== EN.aceAxis(cl.eCard) || cl.bluff) ok(false, 'boss ace invariant', cl.hint); }
      if (cl.bluff) { bluffHands++; if (cl.eCard.tier) ok(false, 'bluff never throws the ace'); }
    }
  }
  ok(aceHands > 0 && bluffHands > 0, 'boss threw his ace and bluffed', { aceHands, bluffHands });
  console.log('     boss × 3 × ' + games + ': ace thrown ' + aceHands + ', bluffs ' + bluffHands + '; why ' + JSON.stringify(whyN));
  // script：100% 照實（教學）；headphone（v4 打開）：第一手照實
  for (const tier of TIERS) for (let s = 1; s <= 30; s++) {
    const { duel } = startFor('man', tier, s, { tutorial: true, script: C.tutorial.script[tier] });
    while (!duel.over) { ok(duel.plan.why === 'script' && !duel.plan.bluff, 'script → honest'); EN.resolveTurn(duel, EN.policies.random(duel, lcg(s))); }
  }
  let hp1 = 0, hpLater = 0;
  for (let s = 1; s <= 400; s++) {
    const { duel } = startFor('copycat', TIERS[s % 3], s, { relics: [HEADPHONE_ON], eOver: { q: 0, qMercy: 0 } });
    ok(duel.plan.why === 'headphone' && !duel.plan.bluff, 'headphone (v4 on) → first hand honest', duel.plan);
    if (duel.plan.why === 'headphone') hp1++;
    EN.resolveTurn(duel, EN.legalActions(duel)[0]);
    if (!duel.over) { if (duel.plan.why === 'bluff') hpLater++; ok(duel.plan.why !== 'headphone', 'headphone only on hand 1'); }
    const off = startFor('copycat', TIERS[s % 3], s, { relics: ['headphone'], eOver: { q: 0, qMercy: 0 } }).duel;
    ok(off.plan.why === 'bluff', 'headphone (v4 off) does nothing', off.plan.why);
  }
  ok(hp1 === 400 && hpLater > 300, 'headphone counts', { hp1, hpLater });
});

section('3 決定性：同種子同動作 → 同事件；每手 RNG 固定 8 次（無限試煉的換牌／加星／客人王牌不碰對決亂數）；mercy=false 次數不變、結果不同；客人照 seedKey#runNo#pos', () => {
  for (let s = 1; s <= 120; s++) {
    const id = ENEMY_IDS[s % 10], tier = TIERS[s % 3], o = { pos: posFor(id, s), atk: s % 2, def: s % 3 ? 0 : 1 };
    const a = startFor(id, tier, s * 101, o), b = startFor(id, tier, s * 101, o);
    eq(a.events, b.events, 'start events equal');
    const ea = play(a.duel, 'thoughtful', lcg(s)), eb = play(b.duel, 'thoughtful', lcg(s));
    eq(ea, eb, 'event streams equal ' + id);
    eq(a.duel, b.duel, 'final state equal');
  }
  const r1 = EN.newRun(C, { seedKey: '2026-11-07', runNo: 1, ace: 'hall' }), r2 = EN.newRun(C, { seedKey: '2026-11-07', runNo: 1, ace: 'pearl' });
  eq(r1.order, r2.order, 'same date → same guests whatever the ace');
  for (let rd = 2; rd <= 12; rd++) eq(EN.jumpTo(r1, C, 5 * rd - 4).order, EN.jumpTo(r2, C, 5 * rd - 4).order, 'round ' + rd + ': same guests whatever the ace');
  // jumpTo（roundOrder 沒給 prev）＝一輪一輪 advance 算出來的；跳到很深也不爆堆疊（審查 #6）
  { const w = EN.newRun(C, { seedKey: 'deep', runNo: 4, ace: 'hall' }), j = EN.newRun(C, { seedKey: 'deep', runNo: 4, ace: 'hall' }); let same = 0;
    for (let rd = 2; rd <= 60; rd++) { const prev = w.order; EN.jumpTo(w, C, 5 * rd - 4); w.order = EN.jumpTo(EN.newRun(C, { seedKey: 'deep', runNo: 4, ace: 'hall' }), C, 5 * rd - 4).order; if (JSON.stringify(EN.jumpTo(j, C, 5 * rd - 4).order) === JSON.stringify(w.order) && !w.order.slice(0, 3).some(x => prev.slice(0, 3).includes(x))) same++; }
    eq(same, 59, 'jumpTo order = walked order, new faces every round (rounds 2–60)');
    let deep = null; try { deep = EN.jumpTo(EN.newRun(C, { seedKey: 'deep', runNo: 4, ace: 'hall' }), C, 100000); } catch (e) { deep = e; }
    ok(deep && !(deep instanceof Error) && deep.pos === 100000 && deep.order.length === 5, 'jumpTo(100000) does not blow the stack', deep instanceof Error ? deep.message : null); }
  // 客人（牌、加星、王牌）＝seedKey#runNo#pos 的雜湊：同樣三個 → 一模一樣；跟對決種子、run.rng 走到哪無關
  let diffPos = 0, diffRun = 0;
  for (let s = 1; s <= 200; s++) {
    const id = [...C.normals, ...C.elites, C.boss][s % 9], pos = posFor(id, s) + 20, o = { seedKey: 'det-' + (s % 7), runNo: 1 + (s % 3), playerAce: TIERS[s % 3], bossAce: otherTier(TIERS[s % 3], s) };
    const a = EN.trialDeck(C, id, pos, o), b = EN.trialDeck(C, id, pos, Object.assign({}, o));
    eq(a, b, 'trialDeck deterministic ' + id + '@' + pos);
    if (JSON.stringify(EN.trialDeck(C, id, pos + 5, o).deck.map(c => c.id)) !== JSON.stringify(a.deck.map(c => c.id))) diffPos++;
    if (JSON.stringify(EN.trialDeck(C, id, pos, Object.assign({}, o, { runNo: o.runNo + 1 })).deck.map(c => c.id)) !== JSON.stringify(a.deck.map(c => c.id))) diffRun++;
    const po = { pos, seedKey: o.seedKey, runNo: o.runNo, bossAce: o.bossAce };
    const d1 = startFor(id, o.playerAce, s * 3, po).duel, d2 = startFor(id, o.playerAce, s * 3 + 999, po).duel;
    eq(d1.e.deckIds.slice().sort(), a.deck.map(c => c.id).concat(a.ace ? [a.ace.id] : []).sort(), 'duel deck = trialDeck (+ his ace)');
    eq(d1.e.deckIds.slice().sort(), d2.e.deckIds.slice().sort(), 'his deck does not depend on the duel seed');
  }
  ok(diffPos > 50 && diffRun > 50, 'another position／another run → other replacements', { diffPos, diffRun });
  { const ra = EN.newRun(C, { seedKey: 'rng-free', runNo: 2, ace: 'heresy' }), rb = JSON.parse(JSON.stringify(ra));
    for (const r of [ra, rb]) { EN.choose(r, C, EN.bargainPolicy(r, C)); EN.jumpTo(r, C, 17); }
    rb.rng = (rb.rng + 12345) | 0;                                   // run.rng 走到別處（多打了幾場、說情…）
    const fa = EN.startFight(ra, C, {}), fb = EN.startFight(rb, C, {});
    eq([fa.enemyId, fa.duel.e.deckIds.slice().sort(), fa.duel.e.hp, fa.duel.e.atk, fa.duel.e.def, fa.duel.e.q], [fb.enemyId, fb.duel.e.deckIds.slice().sort(), fb.duel.e.hp, fb.duel.e.atk, fb.duel.e.def, fb.duel.e.q], 'same seedKey#runNo#pos → same guest whatever run.rng');
    ok(JSON.stringify(fa.duel.e.pile) !== JSON.stringify(fb.duel.e.pile) || fa.duel.rng !== fb.duel.rng, 'the duel itself still uses run.rng'); }
  // RNG：beginHand 每手 8 次；resolveTurn 沒洗牌時＝8 次（男子、客人、教學）
  const count = (d) => { const c = JSON.parse(JSON.stringify(d)); c.plan = null; c.n--; const b = c.rng; EN.beginHand(c, []); return rngCalls(b, c.rng); };
  let measured = 0;
  const kinds = [['man', {}], ['copycat', { pos: 1 }], ['label', { pos: 4 }], ['boss', { pos: 5 }], ['skip', { pos: 12, atk: 2, def: 1 }], ['critic', { pos: 29 }], ['boss', { pos: 40, atk: 3 }],
    ['buyer', {}], ['man', { tutorial: true, script: C.tutorial.script.hall }]];
  for (const [id, o] of kinds) for (let s = 1; s <= 60; s++) {
    const { duel } = startFor(id, o.script ? 'hall' : TIERS[s % 3], s * 13, o);
    const R = lcg(s);
    while (!duel.over) {
      if (count(duel) !== 8) ok(false, 'beginHand takes 8 RNG ' + id, count(duel)); else pass++;
      const b = duel.rng, evs = EN.resolveTurn(duel, EN.policies.random(duel, R));
      const dr = evs.find(e => e.t === 'draw');
      if (!duel.over && !(dr && dr.reshuffled)) { if (rngCalls(b, duel.rng) !== 8) ok(false, 'resolveTurn takes 8 RNG (no reshuffle)', rngCalls(b, duel.rng)); else pass++; }
      measured++;
    }
  }
  console.log('     RNG counted on ' + measured + ' hands');
  // mercy=false：次數不變、計畫會不同
  let diff = 0;
  try {
    for (let s = 1; s <= 300; s++) {
      CFG.mercy = true; const a = startFor('critic', TIERS[s % 3], s * 5, { pos: 9 }).duel;
      CFG.mercy = false; const b = startFor('critic', TIERS[s % 3], s * 5, { pos: 9 }).duel;
      const Ra = lcg(s), Rb = lcg(s);
      while (!a.over && !b.over) {
        if (a.plan.hint.attr !== b.plan.hint.attr) diff++;
        CFG.mercy = false; if (count(b) !== 8) ok(false, 'mercy=false still 8 RNG');
        const actA = EN.legalActions(a)[Math.floor(Ra() * EN.legalActions(a).length)], actB = EN.legalActions(b)[Math.floor(Rb() * EN.legalActions(b).length)];
        CFG.mercy = true; EN.resolveTurn(a, actA);
        CFG.mercy = false; EN.resolveTurn(b, actB);
      }
    }
  } finally { CFG.mercy = true; }
  ok(diff > 0, 'mercy=false changes some plans', diff);
});

// 一趟的推進器（整趟測試共用）：bargainPick → (shop → fight → finish → reward → level…)；maxPos：打到第幾位就停（無限試煉不會自己結束）
function runStep(run, pol, mode, R, log, mem, maxPos = 1e9) {
  if (run.over && !run.pending) return false;
  if (EN.canBargainPick(run) && !run.duel && !run.pending) { const ch = EN.bargainPolicy(run, C); const r = EN.choose(run, C, ch); ok(r.ok, 'bargainPick ok', r.error); log.push(['bp', ch.ids]); return true; }
  const step = EN.nextStep(run);
  if (step === 'reward' || step === 'retry' || step === 'level') { const ch = EN.runPolicy(run, C); const r = EN.choose(run, C, ch); ok(r.ok, 'runPolicy choice ok', { ch, err: r.error }); log.push([step, ch, r.ok]); return true; }
  if (!step || run.pos > maxPos) return false;
  if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, C, mode)) { ok(ch.sellId == null || !EN.isGift(run, C, ch.sellId), 'shopPolicy never sells a gift', ch); const r = EN.choose(run, C, ch); ok(r.ok, 'shopPolicy choice ok', { ch, err: r.error }); log.push(['shop', ch]); }
  ok(run.money >= 0, 'money ≥ 0', run.money);
  const f = EN.startFight(run, C, {});
  const evs = play(f.duel, pol, R, mem);
  log.push(['duel', f.enemyId, evs.length]);
  const res = EN.finishFight(run, C);
  log.push(['finish', res.win, res.earn, run.money]);
  ok(run.money >= 0, 'money ≥ 0', run.money);
  return true;
}
function playRun(run, pol, mode, R, log = [], maxPos = 25, max = 2000) { let g = 0; const mem = {}; while (g++ < max && runStep(run, pol, mode, R, log, mem, maxPos)); return log; }

section('4 存讀檔：對決打到一半、run 打到一半（含 money、shop、聲望、等級、位數）JSON 存讀後接著打，事件一模一樣', () => {
  for (let s = 1; s <= 150; s++) {
    const id = ENEMY_IDS[s % 10], tier = TIERS[s % 3];
    const { duel } = startFor(id, tier, s * 977, { relics: relicSet(s), pos: posFor(id, s), atk: s % 2, def: s % 3 ? 1 : 0, hp: 8 + (s % 5), maxHp: 14 });
    const R = lcg(s);
    for (let k = 0; k < 2 && !duel.over; k++) EN.resolveTurn(duel, EN.policies.novice(duel, R, {}, C));
    if (duel.over) continue;
    const saved = JSON.parse(JSON.stringify(duel));
    const ea = play(duel, 'thoughtful', lcg(s + 99)), eb = play(saved, 'thoughtful', lcg(s + 99));
    eq(ea, eb, 'resumed duel events equal ' + id);
    eq(EN.view(duel), EN.view(saved), 'resumed view equal');
  }
  for (let s = 1; s <= (QUICK ? 10 : 40); s++) {
    const run = EN.newRun(C, { seedKey: 'save-' + s, runNo: 1 + (s % 2), ace: TIERS[s % 3] });
    const R = lcg(s), log = [];
    for (let k = 0; k < 6 + (s % 9) * 3; k++) runStep(run, 'thoughtful', 'smart', R, log, {});
    const saved = JSON.parse(JSON.stringify(run));
    ok(saved.v === 5 && typeof saved.money === 'number' && saved.shop && saved.shop.bins && Number.isInteger(saved.pos) && Number.isInteger(saved.hp) && Number.isInteger(saved.level), 'run JSON has v5 money, shop, pos, hp, level');
    const la = playRun(run, 'thoughtful', 'smart', lcg(s + 5), [], 16), lb = playRun(saved, 'thoughtful', 'smart', lcg(s + 5), [], 16);
    eq(la, lb, 'resumed run log equal');
    eq(run, saved, 'resumed run end state equal');
  }
});

section('5 規則抽查', () => {
  const X = (pa, ps, ea, es, pace, eace) => EN.clash({ attr: pa, star: ps, ace: !!pace }, { attr: ea, star: es, ace: !!eace });
  eq(X('o', 4, 'c', 5), { kind: 'counter', toE: 4, toP: 0, blocked: null, by: 'p' }, '冷 4 剋經 5 → counter 4');
  eq(X('o', 3, 'c', 5), { kind: 'mirrorLose', toE: 0, toP: 2, blocked: 'gap', by: 'p' }, '冷 3 剋經 5 → 剋不動、比星你 −2');
  eq(X('o', 3, 'c', 4), { kind: 'counter', toE: 3, toP: 0, blocked: null, by: 'p' }, '冷 3 剋經 4 → counter 3');
  eq(X('c', 5, 'c', 3), { kind: 'mirrorWin', toE: 2, toP: 0, blocked: null, by: null }, '同色 5 比 3 → 他 −2');
  eq(X('h', 3, 'h', 3), { kind: 'tie', toE: 0, toP: 0, blocked: null, by: null }, '同色同星 → tie');
  // FIXLIST 2：王牌沒有「不會被剋」，只是 7 星：照三相剋＋差 2 星門檻
  eq(X('o', 5, 'c', 7, false, true), { kind: 'mirrorLose', toE: 0, toP: 2, blocked: 'gap', by: 'p' }, '他王牌經 7 被你冷 5 剋 → 差 2 星剋不動、你 −2');
  eq(X('o', 6, 'c', 7, false, true), { kind: 'counter', toE: 6, toP: 0, blocked: null, by: 'p' }, '他王牌經 7 被你冷 6（加成）剋 → 差 1 星剋得動、他 −6');
  eq(X('h', 7, 'c', 2, true, false), { kind: 'mirrorWin', toE: 5, toP: 0, blocked: 'gap', by: 'e' }, '你王牌硬 7 被他經 2 剋 → 他剋不動、他 −5');
  eq(X('h', 7, 'c', 6, true, false), { kind: 'countered', toE: 0, toP: 6, blocked: null, by: 'e' }, '你王牌硬 7 被他經 6 剋 → 被剋 6');
  eq(X('c', 7, 'o', 7, true, true), { kind: 'countered', toE: 0, toP: 7, blocked: null, by: 'e' }, '王牌對王牌：他冷 7 剋你經 7 → 被剋 7');
  eq(X('o', 7, 'c', 7, true, true), { kind: 'counter', toE: 7, toP: 0, blocked: null, by: 'p' }, '王牌對王牌：你冷 7 剋他經 7 → 他 −7');
  eq(X('h', 7, 'h', 7, true, true).kind, 'tie', '王牌對王牌同色 → tie');
  for (let a = 1; a <= 7; a++) for (let b = 1; b <= 7; b++) for (const pa of ATTRS) for (const ea of ATTRS) for (const fl of [[false, false], [true, false], [false, true], [true, true]]) {
    const r1 = X(pa, a, ea, b, fl[0], fl[1]), r0 = X(pa, a, ea, b);
    if (JSON.stringify(r1) !== JSON.stringify(r0)) ok(false, 'ace flag never changes the clash', { pa, a, ea, b, fl }); else pass++;
    if (r1.blocked === 'ace') ok(false, 'no blocked:ace');
  }
  eq(X('c', 5, 'o', 3), { kind: 'mirrorWin', toE: 2, toP: 0, blocked: 'gap', by: 'e' }, '他冷 3 剋你經 5 → 他剋不動、比星他 −2');
  eq(X('c', 4, 'o', 3), { kind: 'countered', toE: 0, toP: 3, blocked: null, by: 'e' }, '他冷 3 剋你經 4 → 被剋 3');
  eq(X('o', 2, 'c', 4).blocked, 'gap', '差剛好 2 → 剋不動');
  eq(EN.clash({ attr: 'o', star: 2 }, { attr: 'c', star: 4 }, { threshold: 3 }).kind, 'counter', 'threshold 3 → 差 2 剋得動');
  eq(EN.clash(4, 'o', 5, 'c').kind, 'counter', 'v3 墊片：clash(pStar, pAttr, eStar, eAttr)');
  for (const x of ATTRS) { ok(EN.beats(x, BEATS[x]) && !EN.beats(BEATS[x], x), 'beats ' + x); ok(BEATS[COUNTER_OF[x]] === x, 'COUNTER_OF ' + x); }
  // boost_o 冷 3→4 對經 5 → 不再 blocked
  const d = rig(['boost_o'], [mkCard('p-o3', 1, 3, 1)], [mkCard('e1', 5, 1, 1)]);
  const r = EN.preview(d, { i: 0, attr: 'o' }, { attr: 'c', star: 5, ace: false });
  eq([r.kind, r.toE, r.blocked], ['counter', 4, null], 'boost_o 冷 3→4 對經 5 → counter 4');
  const d0 = rig([], [mkCard('p-o3', 1, 3, 1)], [mkCard('e1', 5, 1, 1)]);
  eq(EN.preview(d0, { i: 0, attr: 'o' }, { attr: 'c', star: 5 }).blocked, 'gap', '沒加成 → 剋不動');
  // topAttr／peak／deckMain
  eq([EN.topAttr(mkCard('a', 2, 2, 1)), EN.topAttr(mkCard('b', 1, 3, 3)), EN.topAttr(mkCard('c', 1, 2, 4))], ['c', 'o', 'h'], 'topAttr 並列 c→o→h');
  eq(EN.peak(mkCard('a', 2, 5, 3)), 5, 'peak');
  eq(EN.deckMain([mkCard('a', 5, 5, 1), mkCard('b', 1, 4, 1)], 'coh'), 'o', 'deckMain：並列峰值各算一票');
  eq(EN.deckMain([mkCard('a', 5, 1, 1), mkCard('b', 1, 1, 4)], 'hco'), 'h', 'deckMain：票數並列照 taste');
  // 王牌：一場一次、只能出 7 星那軸、不補牌
  for (const tier of TIERS) {
    const { duel } = startFor('copycat', tier, 5);
    const acts = EN.legalActions(duel), aces = acts.filter(a => a.ace);
    ok(aces.length === 1 && aces[0].attr === C.aceAxis[tier] && acts.length === 3 * CFG.handSize + 1, 'one ace action on the 7 axis (hand ' + CFG.handSize + ' × 3 colours + ace)', { aces, n: acts.length });
    eq(duel.p.hand.length, CFG.handSize, 'your hand ' + CFG.handSize + ' (FIXLIST 11)');
    ok(!EN.isLegal(duel, { ace: true, attr: ATTRS.find(a => a !== C.aceAxis[tier]) }), 'ace on another axis is illegal');
    const hand0 = duel.p.hand.map(c => c.id);
    const cl = clashOf(EN.resolveTurn(duel, { ace: true }));
    ok(cl.ace && cl.pStar === 7 && cl.pAttr === C.aceAxis[tier], 'ace throws 7 on its axis', cl);
    if (!duel.over) {
      ok(!EN.legalActions(duel).some(a => a.ace) && !EN.isLegal(duel, { ace: true }), 'ace only once per duel');
      eq(duel.p.hand.map(c => c.id), hand0, 'ace does not draw');
      const v = EN.view(duel);
      ok(v.ace === null && v.aceUsed && v.aceCard.id === C.aces[tier], 'view after the ace');
      const before = JSON.stringify(duel);
      eq(EN.resolveTurn(duel, { ace: true }), [], 'illegal act → no events');
      ok(JSON.stringify(duel) === before, 'illegal act changes nothing');
    }
  }
  // 他的手牌 3 張、不洗回；公開牌單＝牌單＋王牌
  const bd = startFor('boss', 'hall', 9).duel;
  ok(bd.e.hand.length === 3 && bd.e.deckIds.length === 7 && bd.e.deckIds.includes(C.aces[otherTier('hall', 9)]), 'boss: hand 3, public list 6 + ace');
});

// 擺好的對決：你的手牌、他的牌照順序（script），配件
function rig(relics, pCards, eCards, o = {}) {
  const eAttrs = o.eAttrs || eCards.map(() => 'c');
  const pDef = { hp: o.pHp, bag: pCards, ace: o.ace || null, relics: relicObjs(relics) };
  const eDef = { id: 'rig', name: 'rig', hp: o.eHp || 30, deck: eCards, honesty: 'honest', q: 1, planner: 'normal', coef: { w: 0.6, nz: 1.4, mercy: true }, taste: 'coh' };
  return EN.startDuel(pDef, eDef, { seed: 7, script: { plays: eCards.map((c, k) => ({ id: c.id, attr: eAttrs[k] })), hints: eAttrs.map(a => a + '1'), hand: pCards.slice(0, 3).map(c => c.id), draw: pCards.slice(3).map(c => c.id) } }).duel;
}

// 六手比的是聲望條剩幾成（FIXLIST 3：hp÷max，一樣算你贏；engine.playerAhead 一個函式）
section('6 六手上限：比聲望條剩幾成（一樣算你贏）；落後一手再 tie → 你輸；牌出完 → pile；兩邊都 ≤0 也照比例', () => {
  // playerAhead：交叉相乘、一樣算你贏
  ok(EN.playerAhead(10, 10, 18, 18) && EN.playerAhead(5, 10, 9, 18) && EN.playerAhead(6, 10, 9, 18) && !EN.playerAhead(4, 10, 9, 18), 'playerAhead: 比例、一樣算你贏');
  ok(!EN.playerAhead(9, 10, 19, 20) && EN.playerAhead(19, 20, 9, 10) && EN.playerAhead(-1, 3, -2, 3) && !EN.playerAhead(-2, 3, -1, 3), 'playerAhead: 0.9<0.95、負數也照比例');
  eq([EN.hpPct(6, 10), EN.hpPct(9, 18), EN.hpPct(-3, 10), EN.hpPct(7, 15)], [60, 50, 0, 47], 'hpPct');
  eq([EN.pctPair(6, 10, 9, 18), EN.pctPair(9, 10, 28, 31), EN.pctPair(5, 10, 15, 30), EN.pctPair(-1, 10, 3, 30)],
    [{ p: '60', e: '50' }, { p: '90.0', e: '90.3' }, { p: '50', e: '50' }, { p: '0', e: '10' }], 'pctPair: integers unless they would hide the winner');
  // 你 9–30（無限試煉：12 起、升級加上限）、客人 12–40：pctPair 顯示的大小永遠跟 playerAhead 一致（一樣大 ⇔ 真的一樣大）
  for (const P of [9, 10, 12, 13, 15, 18, 21, 30]) for (let E = 12; E <= 40; E++) for (let e = 0; e <= E; e++) for (let p = 0; p <= P; p++) {
    const t = EN.pctPair(p, P, e, E), a = EN.playerAhead(p, P, e, E), b = EN.playerAhead(e, E, p, P);
    const shown = +t.p > +t.e ? 'p' : +t.p < +t.e ? 'e' : 'tie', real = a && b ? 'tie' : a ? 'p' : 'e';
    if (shown !== real) ok(false, 'pctPair consistent', { p, e, E, t }); else pass++;
  }
  // 這一段的比例照「你 10」寫（6/10 vs 9/18…）：明確給你 10，跟 CFG.playerHp（現在 12）無關；最後一個 g 才用 CFG.playerHp
  const T = { debugOutcome: { kind: 'tie', toE: 0, toP: 0 } }, E10 = { hp: 10, eOver: { hp: 10 } }, Y10 = { hp: 10 };
  for (let s = 1; s <= 30; s++) {
    const { duel } = startFor('copycat', TIERS[s % 3], s, E10);
    const evs = [];
    for (let k = 0; k < 6; k++) { ok(!duel.over, 'not over before hand ' + (k + 1)); evs.push(...EN.resolveTurn(duel, EN.legalActions(duel)[0], T)); }
    ok(duel.over && duel.over.by === 'rounds' && duel.over.win === true && duel.n === 6, 'six ties → rounds, you win', duel.over);
    eq(evs.filter(e => e.t === 'over').length, 1, 'one over event');
    const b = startFor('copycat', TIERS[s % 3], s, E10).duel;
    EN.resolveTurn(b, EN.legalActions(b)[0], { debugOutcome: { kind: 'mirrorLose', toE: 0, toP: 1 } });
    for (let k = 0; k < 5; k++) EN.resolveTurn(b, EN.legalActions(b)[0], T);
    ok(b.over && b.over.by === 'rounds' && b.over.win === false, 'behind one → rounds, you lose', b.over);
    const c = startFor('copycat', TIERS[s % 3], s, E10).duel;
    EN.resolveTurn(c, EN.legalActions(c)[0], { debugOutcome: { kind: 'mirrorWin', toE: 1, toP: 0 } });
    EN.resolveTurn(c, EN.legalActions(c)[0], { debugOutcome: { kind: 'mirrorLose', toE: 0, toP: 1 } });
    for (let k = 0; k < 4; k++) EN.resolveTurn(c, EN.legalActions(c)[0], T);
    ok(c.over && c.over.win === true, 'level after 6 → you win', c.over);
    const g = startFor('copycat', TIERS[s % 3], s).duel;     // 直接開打：客人聲望 25 > 你 12：六手都 tie → 兩邊都滿條（100%＝100%）→ 你贏（舊規則比絕對值是他贏）
    const ge = []; for (let k = 0; k < 6; k++) ge.push(...EN.resolveTurn(g, EN.legalActions(g)[0], T));
    ok(g.over && g.over.by === 'rounds' && g.over.win === true, 'rounds compare the bar (12/12 = 25/25 → you win)', g.over);
    const ov = ge.find(e => e.t === 'over');
    ok(ov && ov.pPct === 100 && ov.ePct === 100 && ov.pMax === CFG.playerHp && ov.eMax === C.enemies.copycat.hp && ov.pct.p === '100' && ov.pct.e === '100', 'over event has pMax／eMax／pPct／ePct／pct', ov);
    // 你 6/10（60%）、他 9/18（50%）→ 你贏（舊規則 6 < 9 是你輸）；你 4/10、他 9/18 → 你輸
    const h = startFor('copycat', TIERS[s % 3], s, { ...Y10, eOver: { hp: 18 } }).duel;
    EN.resolveTurn(h, EN.legalActions(h)[0], { debugOutcome: { kind: 'counter', toE: 9, toP: 4 } });
    for (let k = 0; k < 5; k++) EN.resolveTurn(h, EN.legalActions(h)[0], T);
    ok(h.over && h.over.by === 'rounds' && h.over.win === true && h.p.hp === 6 && h.e.hp === 9, '60% vs 50% → you win', h.over);
    const i2 = startFor('copycat', TIERS[s % 3], s, { ...Y10, eOver: { hp: 18 } }).duel;
    EN.resolveTurn(i2, EN.legalActions(i2)[0], { debugOutcome: { kind: 'counter', toE: 9, toP: 6 } });
    for (let k = 0; k < 5; k++) EN.resolveTurn(i2, EN.legalActions(i2)[0], T);
    ok(i2.over && i2.over.win === false && i2.p.hp === 4, '40% vs 50% → you lose', i2.over);
  }
  const save = CFG.maxRounds;
  try {
    CFG.maxRounds = 99;
    const { duel } = startFor('copycat', 'hall', 3, E10);
    let g = 0; while (!duel.over && g++ < 20) EN.resolveTurn(duel, EN.legalActions(duel)[0], T);
    ok(duel.over && duel.over.by === 'pile' && duel.n === 7 && duel.over.win, 'his 7 records run out → pile', { over: duel.over, n: duel.n });
  } finally { CFG.maxRounds = save; }
  // 兩邊同一手都 ≤0 → 同一個 playerAhead（負數也照比例）
  const both = startFor('copycat', 'hall', 4, { hp: 3 }).duel;
  both.e.hp = 3; both.e.max = 3;
  EN.resolveTurn(both, EN.legalActions(both)[0], { debugOutcome: { kind: 'counter', toE: 5, toP: 4 } });
  ok(both.over && both.over.by === 'hp' && both.over.win === true, 'both ≤0 → you −1/3 ≥ him −2/3 → you win', both.over);
  const both2 = startFor('copycat', 'hall', 4, { hp: 3 }).duel;
  both2.e.hp = 3; both2.e.max = 3;
  EN.resolveTurn(both2, EN.legalActions(both2)[0], { debugOutcome: { kind: 'counter', toE: 4, toP: 5 } });
  ok(both2.over && both2.over.win === false, 'both ≤0 → you −2/3 < him −1/3 → you lose', both2.over);
  const both3 = startFor('copycat', 'hall', 4, { hp: 10 }).duel;     // 你 −2/10、他 −3/18：比例他高 → 你輸（絕對值會是你贏）
  both3.e.hp = 15; both3.e.max = 18; both3.p.hp = 2;
  EN.resolveTurn(both3, EN.legalActions(both3)[0], { debugOutcome: { kind: 'counter', toE: 18, toP: 4 } });
  ok(both3.over && both3.over.win === false && both3.p.hp === -2 && both3.e.hp === -3, 'both ≤0 → −2/10 < −3/18 → you lose', { over: both3.over, p: both3.p.hp, e: both3.e.hp });
});

section('7 每一件發燒配件（9 件）', () => {
  const pv = (d, act, e) => EN.preview(d, act, e);
  const P1 = [mkCard('pc3', 3, 1, 1), mkCard('po3', 1, 3, 1), mkCard('ph3', 1, 1, 3)];
  const E1 = [mkCard('e1', 2, 2, 2), mkCard('e2', 2, 2, 2), mkCard('e3', 2, 2, 2), mkCard('e4', 2, 2, 2)];
  // stylus／obi／testpress：那色剋中多扣 1
  for (const [rid, a, e] of [['stylus', 'h', 'o'], ['obi', 'c', 'h'], ['testpress', 'o', 'c']]) {
    const d = rig([rid], P1, E1), i = P1.findIndex(c => c[a] === 3);
    const r = pv(d, { i, attr: a }, { attr: e, star: 2 });
    eq([r.kind, r.toE, r.notes.map(n => n.relic)], ['counter', 4, [rid]], rid + '：剋中多扣 1');
    const other = ATTRS.find(x => x !== a), r2 = pv(d, { i: P1.findIndex(c => c[other] === 3), attr: other }, { attr: BEATS[other], star: 2 });
    eq([r2.kind, r2.toE, r2.notes.length], ['counter', 3, 0], rid + '：別色不加');
  }
  // cleaner：tie 你扣他 1
  { const d = rig(['cleaner'], P1, E1); const r = pv(d, { i: 0, attr: 'c' }, { attr: 'c', star: 3 }); eq([r.kind, r.toE, r.toP], ['tie', 1, 0], 'cleaner：tie → 他 −1'); }
  // dustcover：每場第一次被剋少扣 1（commit 才記）
  {
    const P = [mkCard('p1', 1, 1, 1), mkCard('p2', 1, 1, 1), mkCard('p3', 1, 1, 1), mkCard('p4', 1, 1, 1)];
    const d = rig(['dustcover'], P, [mkCard('e1', 1, 5, 1), mkCard('e2', 1, 5, 1), mkCard('e3', 1, 5, 1), mkCard('e4', 1, 5, 1)], { eAttrs: ['o', 'o', 'o', 'o'], pHp: 20 });
    const a = pv(d, { i: 0, attr: 'c' }, { i: d.plan.idx, attr: 'o' });
    eq([a.kind, a.toP], ['countered', 4], 'dustcover preview：5 → 4');
    ok(!d.p.dustUsed, 'preview does not use the dustcover');
    const c1 = clashOf(EN.resolveTurn(d, { i: 0, attr: 'c' }));
    eq([c1.kind, c1.toP, d.p.dustUsed], ['countered', 4, true], 'dustcover：first countered −1');
    const c2 = clashOf(EN.resolveTurn(d, { i: 0, attr: 'c' }));
    eq([c2.kind, c2.toP], ['countered', 5], 'dustcover：only once per duel');
  }
  // boost_c／o／h：那色出招 +1 星（王牌不加）
  {
    const d = rig(['boost_c', 'boost_o', 'boost_h'], P1, E1, { ace: card(C.aces.hall) });
    for (const a of ATTRS) {
      const i = P1.findIndex(c => c[a] === 3);
      const r = pv(d, { i, attr: a }, { attr: a, star: 3 });
      eq([r.kind, r.toE, r.notes.map(n => n.relic)], ['mirrorWin', 1, ['boost_' + a]], 'boost_' + a + '：+1 星');
    }
    const ra = pv(d, { ace: true }, { attr: 'c', star: 5 });
    eq([ra.kind, ra.toE, ra.notes.length], ['mirrorWin', 2, 0], '王牌不加 boost');
    const cl = clashOf(EN.resolveTurn(d, { i: 1, attr: 'o' }));
    eq([cl.pBase, cl.pStar], [3, 4], 'clash event: pBase 3, pStar 4');
  }
  // headphone：預設不上架（v4:false），newRun 濾掉；打開時第一手不唬人（#2 有測）
  ok(C.relics.headphone.v4 === false, 'headphone v4 off by default');
  eq(EN.newRun(C, { seedKey: 'hp', nightNo: 2, ace: 'hall', relics: ['headphone', 'dustcover', 'nope'] }).relics, ['dustcover'], 'newRun filters v4:false and unknown relics');
  ok(!C.rewards.relicPool.includes('headphone') && !C.relicShop.pool.includes('headphone'), 'headphone in no pool');
  // 三件同時：最多 3 件
  const many = rig(RELIC_IDS, P1, E1);
  eq(many.p.relics.length, 3, 'relicMax 3 in a duel');
});

section('8 newRun：500 種子 × 3 王牌（第 1 輪來客、這一輪的貨〔契約：lot 關每區 4–6、FEATURE 2–3；一檔貨每區 3、FEATURE 2——史詩／傳奇、全店不重複〕、特價箱、包包、時機、v5 欄位）', () => {
  const seeds = QUICK ? 100 : 500;
  const seenBargain = { c: new Set(), o: new Set(), h: new Set() };
  const shopKeys = Object.keys(C.bins).filter(k => !C.bins[k].display);
  const seenStock = {}; for (const k of shopKeys) seenStock[k] = new Set();
  // 第 B 波一檔貨（SPEC-B §3）：C.lot.on（預設）＝第 1 位架上每箱 show 3、FEATURE featureShow 2（從第 1 檔＝策展池）；lot 關＝舊補貨（每區 4–6、FEATURE 2–3）。兩條路都驗
  for (const CC of [C, COFF]) {
  const LON = EN.lotCfg(CC).on;
  for (let s = 1; s <= seeds; s++) for (const ace of TIERS) {
    const night = 1 + (s % 3);
    const run = EN.newRun(CC, s % 2 ? { seedKey: 'nr-' + s, runNo: night, ace } : { seedKey: 'nr-' + s, nightNo: night, ace });   // nightNo＝舊名照收
    ok(run.v === 5 && run.runNo === night && run.prologue === (night === 1 ? 'pending' : null), 'v5, runNo, prologue only on run 1');
    ok(run.order.length === 5 && new Set(run.order.slice(0, 3)).size === 3 && run.order.slice(0, 3).every(x => C.normals.includes(x)) && C.elites.includes(run.order[3]) && run.order[4] === C.boss, 'order: 3 normals, 1 elite, boss', run.order);
    eq([run.pos, run.round, run.idx, run.hp, run.maxHp, run.hpIn, run.level, run.xp, run.atk, run.def, run.levelUps, run.streak, run.bestStreak, run.checkpoints, run.taken, run.retryLeft],
      [1, 1, 0, C.trial.youHp, C.trial.youHp, C.trial.youHp, 1, 0, 0, 0, 0, 0, 0, [], 4, C.trial.retry], 'v5 run fields start: 第 1 位、第 1 輪、12/12、Lv 1、收了 4 張（老闆送的）');
    ok(!('times' in run) && !('nightNo' in run), 'no times／nightNo (no clock in the endless trial)');
    ok(run.bossAce !== ace && TIERS.includes(run.bossAce), 'boss ace is one you did not pick');
    eq(run.bag, C.gifts[ace], 'bag starts as the 4 gifts');
    ok(run.money === C.economy.start && run.shop.bargainPicked === false && !EN.canShop(run) && EN.canBargainPick(run), 'start: money, not picked, cannot shop, can pick');
    eq(Object.keys(run.shop.bins).sort(), shopKeys.slice().sort(), 'shop bins = non-display bins');
    const all = [];
    for (const k of shopKeys) {
      const st = run.shop.bins[k], pool = C.bins[k].pool, feat = k === 'feature';
      const lo = LON ? (feat ? 2 : 3) : feat ? 2 : 4, hi = LON ? lo : feat ? 3 : 6;
      if (!(st.length >= lo && st.length <= hi && st.every(id => pool.includes(id)) && new Set(st).size === st.length)) ok(false, 'bin ' + k + ' ' + lo + '–' + hi + ' ⊂ pool', st.length); else pass++;
      if (st.some(id => run.bag.includes(id) || id === C.aces[ace] || C.bargain.pool.includes(id))) ok(false, 'bin ' + k + ' excludes owned／bargain'); else pass++;
      const rs = st.map(id => EN.rarity(card(id)));
      if (!rs.every(r => feat ? (r === 'epic' || r === 'legendary') : ['common', 'rare', 'uncommon'].includes(r))) ok(false, 'bin ' + k + ' rarity', rs); else pass++;
      if (CATS.includes(k) && !st.every(id => EN.categoryOf(card(id)) === k)) ok(false, 'bin ' + k + ' only its category', st); else pass++;
      if (SUB[k] && !st.every(id => subOk(k, card(id)))) ok(false, 'bin ' + k + ' only its subgenres', st); else pass++;
      all.push(...st); st.forEach(id => seenStock[k].add(id));
    }
    if (new Set(all).size !== all.length) ok(false, 'nothing repeats across the shop', all.filter((x, k2) => all.indexOf(x) !== k2)); else pass++;
    ok(run.shop.relics.length >= 2 && run.shop.relics.length <= 3 && run.shop.relics.every(id => /^boost_/.test(id)) && new Set(run.shop.relics).size === run.shop.relics.length, 'counter 2–3 boost relics', run.shop.relics);
    // 店主 11-16 換牌：「色」＝bargainLane（峰值那軸、並列取後面那軸；舊 9 張沒有並列＝舊的 topAttr 數法）
    const n = { c: 0, o: 0, h: 0 }; run.shop.bargain.forEach(id => { const L = EN.bargainLane(card(id)); n[L]++; seenBargain[L].add(id); });
    ok(run.shop.bargain.length === 6 && n.c === 2 && n.o === 2 && n.h === 2, 'bargain 6 = 2 per color', n);
    const ch = EN.bargainPolicy(run, CC), r = EN.choose(run, CC, ch);
    ok(r.ok && run.bag.length === 7 && run.shop.bargain.length === 3 && run.shop.bargainPicked && run.taken === 7, 'bargainPick → bag 7, 3 left, 收了 7', r.error);
    ok(EN.canShop(run) === (night !== 1), 'can shop after the pick (prologue night: after the prologue)');
    ok(!EN.canBargainPick(run), 'pick only once');
    if (night === 1) { run.prologue = 'done'; ok(EN.canShop(run), 'prologue done → can shop'); }
  }
  }
  for (const a of ATTRS) ok(seenBargain[a].size === C.bargain.pool.filter(id => EN.bargainLane(card(id)) === a).length, 'bargain color ' + a + ' shows every card of that color across seeds (舊 3／新 4)', [...seenBargain[a]]);
  if (fakeBins) {
    eq(shopKeys.slice().sort(), BIN_KEYS.slice().sort(), 'contract bins: 10 categories + 3 subgenre bins + new + feature + picks, all for sale');
    for (const k of shopKeys) ok(seenStock[k].size >= 4, 'bin ' + k + ' rotates across nights', seenStock[k].size);
  }
  // 同一趟（同一個 seedKey＋runNo）的貨一樣；換一趟會換；每輪開頭補貨（換一批、特價箱補回池子扣掉包包的）
  { const a = EN.newRun(C, { seedKey: 'same', runNo: 2, ace: 'hall' }), b = EN.newRun(C, { seedKey: 'same', runNo: 2, ace: 'hall' }), c2 = EN.newRun(C, { seedKey: 'same', runNo: 3, ace: 'hall' });
    eq(a.shop, b.shop, 'same run → same stock'); ok(JSON.stringify(a.shop.bins) !== JSON.stringify(c2.shop.bins), 'next run → new stock');
    EN.choose(a, C, EN.bargainPolicy(a, C));
    const before = JSON.stringify(a.shop.bins);
    EN.jumpTo(a, C, 6);
    ok(JSON.stringify(a.shop.bins) !== before, 'round 2 → restocked');
    const want = C.bargain.pool.filter(id => !a.bag.includes(id));
    ok(a.shop.bargain.length === Math.min(6, want.length) && a.shop.bargain.every(id => want.includes(id)) && a.shop.bargainPicked && !EN.canBargainPick(a), 'round 2 bargain crate = pool minus bag (2 per color), no free pick', a.shop.bargain);
    for (const k of Object.keys(a.shop.bins)) if (a.shop.bins[k].some(id => a.bag.includes(id))) ok(false, 'restock excludes the bag'); }
  // 舊存檔（v5 店面改版前：有 pop、沒有 citypop／indierock／indiepop）→ fixBins 只補缺的區（＝這一輪 restock 本來會上的、扣掉別區有的與包包裡的）、丟掉 pop、其他區不動
  { const fresh = EN.newRun(C, { seedKey: 'old-save', runNo: 2, ace: 'hall' }); EN.choose(fresh, C, EN.bargainPolicy(fresh, C));
    const old = JSON.parse(JSON.stringify(fresh)), B = old.shop.bins;
    B.pop = (B.citypop || []).slice(); delete B.citypop; delete B.indierock; delete B.indiepop;
    if (B.jazz && B.jazz.length) B.jazz.pop();                       // 這一輪已經買走一張爵士：不能被補回來
    const jazz0 = B.jazz.slice(), rock0 = B.rock.slice();
    const twin = JSON.parse(JSON.stringify(old));
    ok(EN.fixBins(old, C) === true, 'fixBins: old save → changed');
    eq(Object.keys(old.shop.bins), Object.keys(fresh.shop.bins), 'fixBins: keys = current bins in SHOP_ORDER (pop dropped, citypop／indierock／indiepop back)');
    ok(!('pop' in old.shop.bins), 'fixBins: stale pop dropped');
    for (const k of ['citypop', 'indierock', 'indiepop']) ok(old.shop.bins[k].length > 0 && old.shop.bins[k].every(id => fresh.shop.bins[k].includes(id)), 'fixBins: ' + k + ' restocked from this round\'s restock', old.shop.bins[k]);
    eq([old.shop.bins.jazz, old.shop.bins.rock], [jazz0, rock0], 'fixBins: bins that were already there are untouched (bought stays bought)');
    const all = Object.values(old.shop.bins).flat();
    ok(new Set(all).size === all.length && !all.some(id => old.bag.includes(id)), 'fixBins: no duplicates across bins, nothing from the bag');
    EN.fixBins(twin, C); eq(twin.shop.bins, old.shop.bins, 'fixBins: deterministic (same save → same fill)');
    eq([old.rng, old.shop.relics, old.shop.bargain], [fresh.rng, fresh.shop.relics, fresh.shop.bargain], 'fixBins: run.rng, counter, bargain crate untouched');
    ok(EN.fixBins(old, C) === false && EN.fixBins(fresh, C) === false, 'fixBins: current save → no change'); }
  // 免費挑三張只在第 1 位之前（裁定 4）：沒挑就跳到第 2 位 → 不能挑
  { const r = EN.newRun(C, { seedKey: 'bp1', runNo: 2, ace: 'pearl' }); ok(EN.canBargainPick(r), 'pos 1 → can pick'); r.pos = 2; r.idx = 1; ok(!EN.canBargainPick(r), 'pos 2 → cannot pick (even if never picked)'); }
  for (let s = 1; s <= 50; s++) {
    const run = EN.newRun(C, { seedKey: 'rl-' + s, runNo: 2, ace: 'hall', relics: ['boost_c', 'boost_o'] });
    eq(run.shop.relics, ['boost_h'], 'two boosts owned → counter has 1');
    eq(run.relics, ['boost_c', 'boost_o'], 'relics carried over');
  }
  ok(fakeBins || !!C.bins.feature || Object.keys(C.bins).some(k => C.bins[k].display), 'feature (contract) or old display areas exist');
});

section('9 整趟（thoughtful／high／random × shopPolicy none／smart，打到輸或第 30 位）：沒有非法選擇、錢 ≥0；位數／輪／說情／聲望／經驗／升級／中繼點／連勝／藏家王牌的不變式', () => {
  const runs = QUICK ? 12 : 60, CAP = 30, T = C.trial;
  const tally = {};
  for (const pol of ['thoughtful', 'high', 'random']) for (const mode of ['none', 'smart']) {
    let dead = 0, bought = 0, reach = 0, picks = 0, bossWins = 0, retries = 0;
    for (let s = 1; s <= runs; s++) {
      const run = EN.newRun(C, { seedKey: 'trial-' + s, runNo: 1, ace: TIERS[s % 3] });
      const R = lcg(s), mem = {};
      let g = 0, xpTot = 0, lastOrder = null, lastRound = 1, lastWinPos = 0, retryAt = null;
      while (g++ < 4000) {
        if (run.over && !run.pending) break;
        if (EN.canBargainPick(run)) { ok(run.pos === 1, 'free pick only at pos 1'); ok(EN.choose(run, C, EN.bargainPolicy(run, C)).ok, 'bargainPick ok'); continue; }
        const step = EN.nextStep(run);
        if (step === 'level') {
          const p = run.pending, offer = p.offer || [];
          ok(offer.length === 3 && offer.map(x => x.pick).join() === 'atk,def,hp' && offer.every(x => x.n === T.picks[x.pick]), 'level offer: 3, fixed order 品味→底氣→聲望 (owner 11-20)', offer);
          eq(EN.levelOffer(run, C), offer, 'levelOffer(run) = pending offer');
          const b = { atk: run.atk, def: run.def, hp: run.hp, maxHp: run.maxHp, ups: run.levelUps, pos: run.pos };
          const ch = EN.runPolicy(run, C); const r = EN.choose(run, C, ch);
          ok(r.ok, 'level choice ok', r.error);
          const n = T.picks[ch.pick];
          ok(ch.pick === 'atk' ? run.atk === b.atk + n : ch.pick === 'def' ? run.def === b.def + n : (run.maxHp === b.maxHp + n && run.hp === b.hp + n), 'level pick applied ' + ch.pick);
          ok(run.levelUps === b.ups - 1 && (run.levelUps > 0 ? EN.nextStep(run) === 'level' : run.pos === b.pos + 1), 'chained level-ups, then the next guest');
          picks++; continue;
        }
        if (step === 'reward' || step === 'retry') {
          const ch = EN.runPolicy(run, C), r = EN.choose(run, C, ch);
          ok(r.ok, 'runPolicy choice ok', { ch, err: r.error });
          if (step === 'retry' && ch.type === 'retry') { ok(run.hp === run.hpIn, 'retry: 聲望 back to before the fight'); retries++; }
          continue;
        }
        if (!step || run.pos > CAP) break;
        if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, C, mode)) { const r = EN.choose(run, C, ch); ok(r.ok, 'shopPolicy choice ok', { ch, err: r.error }); }
        ok(run.money >= 0 && run.bag.length <= CFG.bagMax && run.relics.length <= CFG.relicMax, 'limits hold');
        // 位數、輪、這一輪的 5 位
        const prologue = run.prologue === 'pending';
        ok(run.round === EN.roundOf(run.pos) && run.idx === (run.pos - 1) % 5 && run.order.length === 5 && run.order[4] === C.boss && C.elites.includes(run.order[3]), 'pos／round／idx／order consistent', { pos: run.pos, round: run.round, idx: run.idx });
        if (!prologue && run.round !== lastRound) {
          ok(run.round === lastRound + 1 && run.idx === 0 && run.retryLeft === T.retry, 'new round: idx 0, 說情 reset');
          if (lastOrder) ok(!run.order.slice(0, 3).some(x => lastOrder.slice(0, 3).includes(x)) && run.order[3] !== lastOrder[3], 'new round: new faces (no normal and no elite from the last round)', [lastOrder, run.order]);
          lastRound = run.round;
        }
        lastOrder = run.order.slice();
        if (!prologue && lastWinPos && retryAt !== run.pos) ok(run.pos === lastWinPos + 1, 'won → next position', { pos: run.pos, lastWinPos });
        ok(run.hp >= 1 && run.hp <= run.maxHp, '1 ≤ 聲望 ≤ 上限 before a fight', { hp: run.hp, max: run.maxHp });
        const b = { pos: run.pos, hp: run.hp, maxHp: run.maxHp, streak: run.streak, retryLeft: run.retryLeft, cls: EN.classAt(run.pos), level: run.level };
        // 中繼點：走到就記（SPEC §0；第 1 位不算）；離下個中繼點＝只數在前面的
        if (!prologue) {
          const cpHere = b.pos > 1 && EN.nextCheckpoint(b.pos, C) === b.pos;
          ok(run.checkpoints.includes(b.pos) === cpHere && run.checkpoints.every(x => x <= b.pos && EN.nextCheckpoint(x, C) === x), 'checkpoint recorded on arriving (走到就記)', { pos: b.pos, cps: run.checkpoints });
          const tc = EN.toCheckpoint(run, C);
          ok(tc >= 1 && tc === EN.nextCheckpoint(b.pos + 1, C) - b.pos && (!cpHere || tc > 1), 'toCheckpoint counts to the next one strictly ahead', { pos: b.pos, tc });
        }
        const f = EN.startFight(run, C, {});
        ok(run.hpIn === b.hp && f.duel.p.hp === b.hp && f.duel.p.max === b.maxHp && f.duel.p.atk === run.atk && f.duel.p.def === run.def, 'duel starts with the run 聲望／上限／品味／底氣');
        if (!prologue) {
          const gst = EN.trialGuest(C, b.pos, b.cls);
          ok(f.duel.e.max === gst.hp && f.duel.e.atk === gst.atk && f.duel.e.def === gst.def && f.duel.e.q === gst.q && f.duel.e.planner === gst.planner, 'guest = curve at pos ' + b.pos, { e: [f.duel.e.max, f.duel.e.atk, f.duel.e.def, f.duel.e.q, f.duel.e.planner], gst });
          if (b.cls === 'boss') ok(f.duel.e.deckIds.includes(C.aces[run.bossAce]), 'boss carries the ace you did not pick');
        }
        play(f.duel, pol, R, mem);
        const res = EN.finishFight(run, C), pEnd = f.duel.p.hp;
        ok(res.pos === b.pos && res.cls === (prologue ? 'prologue' : b.cls), 'finishFight reports pos／cls');
        if (prologue) { if (res.win) ok(run.hp === run.maxHp && run.pos === 1, 'prologue won → 聲望 back to full, still pos 1'); continue; }
        if (res.win) {
          xpTot += T.xp[b.cls]; lastWinPos = b.pos; retryAt = null;
          // 第 I 波 I-0（SPEC-I §7.2）：Lv1→2 要 firstNeed（2）、那一級自動加 firstHp（0）；之後照舊 等級＋levelNeed、+levelHp（獨立寫一份，不呼叫 EN.xpNeed）
          const needAt = l => l === 1 && T.firstNeed > 0 ? T.firstNeed : l + T.levelNeed, hpAt = l => l === 1 ? T.firstHp : T.levelHp;
          let L = 1, x = xpTot; while (x >= needAt(L)) { x -= needAt(L); L++; }
          ok(run.level === L && run.xp === x, 'level／xp = cumulative XP (' + xpTot + ')', { level: run.level, xp: run.xp, L, x });
          const ups = L - b.level, healed = Math.min(b.maxHp, Math.max(1, pEnd) + T.heal); let upHp = 0; for (let l = b.level; l < L; l++) upHp += hpAt(l);
          ok(res.levelUps === ups && run.maxHp === b.maxHp + upHp && run.hp === healed + upHp, '回 3（不超過上限）＋每升一級 上限／聲望 +1（Lv1→2 +firstHp）', { hp: run.hp, healed, ups, upHp });
          if (b.level === 1 && T.firstNeed > 0 && T.firstNeed <= T.xp.normal) ok(L === 2 && b.pos === 1, 'I-0：打贏第 1 位就升 Lv2', { pos: b.pos, L });
          ok(res.heal === healed - Math.max(1, pEnd), 'finishFight.heal');
          ok(run.streak === b.streak + 1 && run.bestStreak >= run.streak, 'streak +1');
          ok(!('checkpoint' in res) && !run.checkpoints.includes(b.pos + 1), 'checkpoint not recorded on beating (only on arriving)', { pos: b.pos, cps: run.checkpoints });
          if (b.cls === 'boss') { bossWins++; ok(res.aceWon === C.aces[run.bossAce] && !run.over, 'boss beaten → his ace (shelf), the run goes on'); }
          else ok(res.aceWon == null, 'aceWon only for the boss');
        } else {
          ok(run.streak === 0 && run.hp === b.hp, 'lost → streak 0, 聲望 not written back');
          if (b.retryLeft > 0) { ok(run.pending && run.pending.type === 'retry' && !run.over, 'lost with 說情 left → retry offer'); retryAt = b.pos; }
          else { ok(run.over === 'dead' && run.stats.lostAt && run.stats.lostAt.pos === b.pos, 'lost without 說情 → dead at pos', run.stats.lostAt); }
        }
      }
      ok(run.over === 'dead' || run.pos > CAP, 'run ends dead or reaches the cap ' + pol + '/' + mode, { over: run.over, pos: run.pos });
      ok(run.over !== 'clear', 'no clear in the endless trial');
      const sm = EN.runSummary(run);
      ok(sm.reached === run.pos && sm.wins === run.stats.beaten && sm.bestStreak === run.bestStreak && sm.taken === run.taken && sm.taken >= run.stats.taken.length + 7 && sameSet(sm.checkpoints, run.checkpoints), 'runSummary', sm);
      if (run.over === 'dead') dead++;
      reach += run.pos;
      bought += run.stats.bought.length + run.stats.relicsBought.length;
    }
    if (mode === 'none') ok(bought === 0, 'none buys nothing');
    tally[pol + '/' + mode] = { dead, meanPos: +(reach / runs).toFixed(1), bought, picks, bossWins, retries };
  }
  ok(tally['thoughtful/smart'].meanPos > tally['random/none'].meanPos, 'thoughtful goes further than random');
  console.log('     ' + JSON.stringify(tally));
});

section('10 choose：每一種（含每個錯誤碼）；錯的選擇完全不改 run（包包有上限 8 的舊規則：sim --set bagMax=8 對照那條路；不限的見 #21）', () => {
  const BAG0 = CFG.bagMax; CFG.bagMax = 8;
  try { section10(); } finally { CFG.bagMax = BAG0; }
});
function section10() {
  const err = (run, ch, code, name) => { const b = JSON.stringify(run); const r = EN.choose(run, C, ch); ok(!r.ok && r.error === code, name + ' → ' + code, r); ok(JSON.stringify(run) === b, name + ': run unchanged'); };
  const fresh = (night = 2) => EN.newRun(C, { seedKey: 'ch-' + night, nightNo: night, ace: 'hall' });
  const extra = Object.keys(C.cards).filter(id => !C.cards[id].tier && !run0Used(id)).slice(0, 12);
  function run0Used(id) { return USED.has(id) || Object.values(C.bins).some(b => b.pool.includes(id)); }
  // bargainPick
  let run = fresh();
  const B = run.shop.bargain.slice();
  err(run, { type: 'buy', key: Object.keys(run.shop.bins)[0], cardId: 'x' }, 'notNow', 'buy before the bargain pick');
  err(run, { type: 'bargainPick', ids: B.slice(0, 2) }, 'badCount', 'bargainPick 2');
  err(run, { type: 'bargainPick', ids: [B[0], B[0], B[1]] }, 'badCount', 'bargainPick dup');
  err(run, { type: 'bargainPick', ids: [B[0], B[1], 'nope'] }, 'notInStock', 'bargainPick not in stock');
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.push(B[0]); err(r2, { type: 'bargainPick', ids: B.slice(0, 3) }, 'owned', 'bargainPick owned'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.push(extra[0], extra[1]); err(r2, { type: 'bargainPick', ids: B.slice(0, 3) }, 'bagFull', 'bargainPick bag full'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.duel = {}; err(r2, { type: 'bargainPick', ids: B.slice(0, 3) }, 'notNow', 'bargainPick during a duel'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.pos = 2; r2.idx = 1; err(r2, { type: 'bargainPick', ids: B.slice(0, 3) }, 'notNow', 'bargainPick after the first guest'); }
  { const r2 = JSON.parse(JSON.stringify(run)); EN.jumpTo(r2, C, 6); r2.shop.bargainPicked = false; err(r2, { type: 'bargainPick', ids: r2.shop.bargain.slice(0, 3) }, 'notNow', 'bargainPick at the start of round 2 (pos 6)'); }
  const ok1 = EN.choose(run, C, { type: 'bargainPick', ids: [B[1], B[0], B[2]] });
  ok(ok1.ok && JSON.stringify(run.bag.slice(4)) === JSON.stringify([B[1], B[0], B[2]]) && ok1.effects.length === 3, 'bargainPick in tap order', ok1);
  err(run, { type: 'bargainPick', ids: B.slice(3, 6) }, 'notNow', 'bargainPick twice');
  // buy
  const key = Object.keys(run.shop.bins).find(k => k !== 'feature' && run.shop.bins[k].length), cid = run.shop.bins[key][0], price = EN.priceOf(C, card(cid));
  ok(price === C.economy.price[EN.rarity(card(cid))] && price >= 800 && price <= 1200, 'priceOf = price[rarity] (shelf 800–1200)', price);
  ok(EN.priceOf(C, card(C.aces.hall)) === 8000 && !Object.values(run.shop.bins).flat().includes(C.aces.hall), 'apex priced 8000 but never stocked');
  eq(EN.sellValue(C, card(cid)), Math.floor(price * 0.5), 'sellValue card = half');
  const RP = C.economy.relicPrice;
  eq(EN.sellValue(C, 'boost_c'), Math.floor(RP * C.economy.sellRate), 'sellValue relic = half');
  eq(EN.relicPrice(C, 'boost_c'), RP, 'relicPrice');
  { const r2 = JSON.parse(JSON.stringify(run)); r2.money = 0; err(r2, { type: 'buy', key, cardId: cid }, 'noMoney', 'buy with $0'); }
  run.money = 20000;
  err(run, { type: 'buy', key: 'nope', cardId: cid }, 'notInStock', 'buy wrong bin');
  err(run, { type: 'buy', key, cardId: 'nope' }, 'notInStock', 'buy wrong card');
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.push(cid); err(r2, { type: 'buy', key, cardId: cid }, 'owned', 'buy owned'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.push(extra[0]); err(r2, { type: 'buy', key, cardId: cid }, 'bagFull', 'buy with 8 and no sell'); err(r2, { type: 'buy', key, cardId: cid, sellId: 'nope' }, 'badSell', 'buy sell not in bag'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.pending = { type: 'retry' }; err(r2, { type: 'buy', key, cardId: cid }, 'notNow', 'buy while pending'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.prologue = 'pending'; err(r2, { type: 'buy', key, cardId: cid }, 'notNow', 'buy during the prologue'); }
  const m0 = run.money, rb = EN.choose(run, C, { type: 'buy', key, cardId: cid });
  ok(rb.ok && run.money === m0 - price && run.bag.includes(cid) && !run.shop.bins[key].includes(cid) && run.stats.bought.includes(cid), 'buy ok', rb);
  eq(rb.effects, [{ gainCard: cid, spend: price }], 'buy effects');
  ok(run.bag.length === 8, 'bag full now');
  const key2 = Object.keys(run.shop.bins).find(k => run.shop.bins[k].length), cid2 = run.shop.bins[key2][0], sell = run.bag.find(id => !EN.isGift(run, C, id));
  // 老闆送的（王牌那組四張＋王牌）不能賣回（FIXLIST 11 追加）；客人丟的、買的、特價箱的照舊半價
  ok(C.gifts.hall.every(id => EN.isGift(run, C, id)) && EN.isGift(run, C, C.aces.hall) && EN.isGift(run, C, card(C.gifts.hall[0])), 'isGift: the four gifts + the ace (id or card)');
  ok(!EN.isGift(run, C, sell) && !EN.isGift(run, C, cid) && !EN.isGift(run, C, C.gifts.pearl[0]) && !EN.isGift(run, C, C.aces.pearl) && !EN.isGift(null, C, C.gifts.hall[0]), 'isGift: bargain／bought／another tier\'s gifts are not');
  eq(run.bag.slice(0, 4), C.gifts.hall, 'gifts are the first four in the bag');
  for (const g of C.gifts.hall) err(run, { type: 'buy', key: key2, cardId: cid2, sellId: g }, 'giftNoSell', 'buy selling a gift ' + g);
  err(run, { type: 'buy', key: key2, cardId: cid2, sellId: C.aces.hall }, 'badSell', 'buy selling the ace (not in the bag)');
  { const r2 = JSON.parse(JSON.stringify(run)); r2.money = EN.priceOf(C, card(cid2)) - EN.sellValue(C, card(sell)) - 1; err(r2, { type: 'buy', key: key2, cardId: cid2, sellId: sell }, 'noMoney', 'buy+sell short by 1'); }
  const rs = EN.choose(run, C, { type: 'buy', key: key2, cardId: cid2, sellId: sell });
  ok(rs.ok && !run.bag.includes(sell) && run.bag.includes(cid2) && run.bag.length === 8, 'sell then buy', rs);
  eq(rs.effects[0], { loseCard: sell, earn: EN.sellValue(C, card(sell)) }, 'sell effect first');
  // buyBargain
  const BL = run.shop.bargain.slice();
  err(run, { type: 'buyBargain', ids: [] }, 'badCount', 'buyBargain 0');
  err(run, { type: 'buyBargain', ids: [BL[0], BL[0]] }, 'badCount', 'buyBargain dup');
  err(run, { type: 'buyBargain', ids: [BL[0], BL[1], BL[2], BL[0]] }, 'badCount', 'buyBargain 4');
  err(run, { type: 'buyBargain', ids: ['nope'] }, 'notInStock', 'buyBargain not in stock');
  err(run, { type: 'buyBargain', ids: [BL[0], BL[1]], sellIds: [run.bag[0]] }, 'bagFull', 'buyBargain 2 into a full bag with 1 sell');
  err(run, { type: 'buyBargain', ids: [BL[0]], sellIds: [run.bag[0], run.bag[1]] }, 'badSell', 'buyBargain too many sells');
  err(run, { type: 'buyBargain', ids: [BL[0]], sellIds: ['nope'] }, 'badSell', 'buyBargain sell not in bag');
  err(run, { type: 'buyBargain', ids: [BL[0]], sellIds: [C.gifts.hall[1]] }, 'giftNoSell', 'buyBargain selling a gift');
  { const r2 = JSON.parse(JSON.stringify(run)), g = C.gifts.hall[2], ng = r2.bag.filter(id => !EN.isGift(r2, C, id));
    eq(r2.bag.length, 8, 'bag full (8) before buying two from the bargain crate');
    err(r2, { type: 'buyBargain', ids: [BL[0], BL[1]], sellIds: [ng[0], g] }, 'giftNoSell', 'buyBargain 2 sells, one a gift');
    const m = r2.money, r = EN.choose(r2, C, { type: 'buyBargain', ids: [BL[0], BL[1]], sellIds: [ng[0], ng[ng.length - 1]] });
    const sv = EN.sellValue(C, card(ng[0])) + EN.sellValue(C, card(ng[ng.length - 1]));
    ok(r.ok && !r2.bag.includes(ng[0]) && C.gifts.hall.every(id => r2.bag.includes(id)) && r2.money === m + sv - EN.bargainPriceOf(C, BL[0]) - EN.bargainPriceOf(C, BL[1]), 'buyBargain selling bargain／bought records: still half', r); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.push(BL[0]); r2.bag.shift(); err(r2, { type: 'buyBargain', ids: [BL[0]], sellIds: [] }, 'owned', 'buyBargain owned'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.money = EN.bargainPriceOf(C, BL[0]) - 1; r2.bag.shift(); err(r2, { type: 'buyBargain', ids: [BL[0]] }, 'noMoney', 'buyBargain no money'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.splice(0, 2); r2.money = EN.bargainPriceOf(C, BL[0]) + EN.bargainPriceOf(C, BL[1]) - 1; err(r2, { type: 'buyBargain', ids: [BL[0], BL[1]] }, 'noMoney', 'buyBargain 2 short by 1'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.bag.splice(0, 3); const m = r2.money, each = BL.slice(0, 3).map(id => EN.bargainPriceOf(C, id));
    const r = EN.choose(r2, C, { type: 'buyBargain', ids: BL.slice(0, 3) });
    ok(r.ok && r2.money === m - each.reduce((a, b) => a + b, 0) && r2.bag.length === 8 && r2.shop.bargain.length === 0, 'buyBargain 3 = sum of per-card prices', { r, each });
    eq(r.effects.map(e => e.spend), each, 'buyBargain effects: each card its own spend');
    ok(each.every((p, k) => p === C.economy.bargain[EN.peak(card(BL[k]))]), 'bargain price by highest star', each);
    ok(EN.sellValue(C, card(BL[0])) === Math.floor(each[0] / 2), 'bargain card sells back at half its bargain price (no buy-sell profit)'); }
  // buyRelic
  const RL = run.shop.relics.slice();
  err(run, { type: 'buyRelic', relicId: 'obi' }, 'notInStock', 'buyRelic not on the counter');
  { const r2 = JSON.parse(JSON.stringify(run)); r2.relics.push(RL[0]); err(r2, { type: 'buyRelic', relicId: RL[0] }, 'owned', 'buyRelic owned'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.relics = ['dustcover', 'stylus', 'cleaner']; err(r2, { type: 'buyRelic', relicId: RL[0] }, 'relicsFull', 'buyRelic 3 relics, no sell'); err(r2, { type: 'buyRelic', relicId: RL[0], sellRelicId: 'obi' }, 'badSell', 'buyRelic sell not owned');
    const m = r2.money, r = EN.choose(r2, C, { type: 'buyRelic', relicId: RL[0], sellRelicId: 'stylus' });
    ok(r.ok && r2.relics.includes(RL[0]) && !r2.relics.includes('stylus') && r2.money === m + EN.sellValue(C, 'stylus') - EN.relicPrice(C, RL[0]), 'buyRelic with sell', { r, money: r2.money }); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.money = EN.relicPrice(C, RL[0]) - 1; err(r2, { type: 'buyRelic', relicId: RL[0] }, 'noMoney', 'buyRelic short'); }
  { const r2 = JSON.parse(JSON.stringify(run)); r2.over = 'dead'; err(r2, { type: 'buyRelic', relicId: RL[0] }, 'notNow', 'buyRelic after closing'); }
  const rr = EN.choose(run, C, { type: 'buyRelic', relicId: RL[0] });
  ok(rr.ok && run.relics.includes(RL[0]) && !run.shop.relics.includes(RL[0]), 'buyRelic ok', rr);
  // v3 choices still there
  err(run, { type: 'take', cardId: 'x' }, 'noCardOffer', 'take without an offer');
  err(run, { type: 'retry' }, 'noRetry', 'retry without pending');
  err(run, { type: 'nope' }, 'badChoice', 'unknown type');
  err(run, null, 'badChoice', 'null choice');
  // during a fight: no shopping
  const f = EN.startFight(run, C, {});
  ok(!!f && !!run.duel && !EN.canShop(run), 'no shopping during a fight');
  err(run, { type: 'buyRelic', relicId: RL[1] || RL[0] }, 'notNow', 'buyRelic during a fight');
  // level（升級三選一）：沒有待選 → noLevel；不在選項裡 → notOffered；選了照數字加、選完才到下一位
  err(run, { type: 'level', pick: 'atk' }, 'noLevel', 'level without a level-up');
  { const r2 = EN.newRun(C, { seedKey: 'lv', runNo: 2, ace: 'pearl' });
    EN.choose(r2, C, EN.bargainPolicy(r2, C));
    const fx = EN.startFight(r2, C, {}); let g = 0;
    while (!fx.duel.over && g++ < 12) EN.resolveTurn(fx.duel, EN.legalActions(fx.duel)[0], { debugOutcome: { kind: 'counter', toE: 30, toP: 0 } });
    r2.xp = 3;                                                          // 第 1 位一般 +2 → 5 ≥ 1＋3：升 Lv 2（C＝舊段落 content，第一位升級關；新規則見 #32）
    const res = EN.finishFight(r2, C);
    ok(res.win && res.levelUps === 1 && r2.level === 2 && r2.xp === 1 && r2.maxHp === C.trial.youHp + 1, 'xp 3 + 2 → Lv 2 (need level + 3), 上限 +1', { level: r2.level, xp: r2.xp, max: r2.maxHp });
    while (EN.nextStep(r2) === 'reward') EN.choose(r2, C, { type: 'skip' });
    ok(EN.nextStep(r2) === 'level' && r2.pos === 1 && r2.pending.level === 2, 'reward done → level pending (still pos 1)', r2.pending);
    err(r2, { type: 'level', pick: 'nope' }, 'notOffered', 'level pick not offered');
    err(r2, { type: 'level' }, 'notOffered', 'level without pick');
    err(r2, { type: 'buy', key: Object.keys(r2.shop.bins)[0], cardId: 'x' }, 'notNow', 'no shopping while a level pick waits');
    const h0 = r2.hp, r = EN.choose(r2, C, { type: 'level', pick: 'hp' });
    ok(r.ok && r2.maxHp === C.trial.youHp + 1 + C.trial.picks.hp && r2.hp === h0 + C.trial.picks.hp && r2.pos === 2 && !r2.pending, '聲望上限 +2 (current too) → pos 2', { r, max: r2.maxHp, hp: r2.hp });
    eq(r.effects, [{ level: 'hp', n: C.trial.picks.hp }], 'level effects');
    eq(r2.picks, ['hp'], 'picks recorded'); }
  // retry／end：說情一輪一次、聲望回到開打前；end → dead、lostAt 記位數
  { const r3 = EN.newRun(C, { seedKey: 'rt', runNo: 2, ace: 'hall' });
    EN.choose(r3, C, EN.bargainPolicy(r3, C)); EN.jumpTo(r3, C, 7); r3.hp = 9;
    const lose = () => { const fx = EN.startFight(r3, C, {}); let g = 0; while (!fx.duel.over && g++ < 12) EN.resolveTurn(fx.duel, EN.legalActions(fx.duel)[0], { debugOutcome: { kind: 'countered', toE: 0, toP: 3 } }); return EN.finishFight(r3, C); };
    const a = lose();
    ok(!a.win && r3.pending.type === 'retry' && !r3.pending.free && r3.hp === 9 && r3.streak === 0, 'lost at pos 7 → retry offer, 聲望 9 kept');
    ok(EN.choose(r3, C, { type: 'retry' }).ok && r3.retryLeft === 0 && r3.hp === 9 && r3.hpIn === 9 && r3.pos === 7, 'retry → same pos, 聲望 back to 9, 說情 used');
    const b2 = lose();
    ok(!b2.win && r3.over === 'dead' && r3.stats.lostAt.pos === 7 && r3.stats.lostAt.round === 2, 'lost again (no 說情 left) → dead at pos 7', r3.stats.lostAt);
    const r4 = EN.newRun(C, { seedKey: 'rt', runNo: 3, ace: 'hall' }); EN.choose(r4, C, EN.bargainPolicy(r4, C)); EN.jumpTo(r4, C, 12);
    const fx = EN.startFight(r4, C, {}); let g = 0; while (!fx.duel.over && g++ < 12) EN.resolveTurn(fx.duel, EN.legalActions(fx.duel)[0], { debugOutcome: { kind: 'countered', toE: 0, toP: 5 } });
    EN.finishFight(r4, C);
    ok(EN.choose(r4, C, { type: 'end' }).ok && r4.over === 'dead' && r4.stats.lostAt.pos === 12 && EN.runSummary(r4).reached === 12, 'end at the retry menu → dead at pos 12', r4.stats.lostAt); }
}

section('11 policies：§2.1.7 每個都有、都合法、同 R 同結果；只有 oracle 讀 plan／e.hand／e.pile', () => {
  const NAMES = ['random', 'high', 'counterHint', 'formula', 'mirrorHint', 'thoughtful', 'oracle', 'novice'];
  for (const n of NAMES) ok(typeof EN.policies[n] === 'function', 'policy exists ' + n);
  for (const old of ['strongest', 'counterTop', 'learner', 'veteran', 'sloppy', 'reader']) ok(!EN.policies[old], 'old policy removed ' + old);
  function spy(st) {
    const hits = new Set();
    const planP = st.plan ? new Proxy(st.plan, { get(t, k) { if (['attr', 'idx', 'bluff', 'why'].includes(k)) hits.add('plan.' + String(k)); return t[k]; } }) : st.plan;
    const arrP = (arr, name) => new Proxy(arr, { get(t, k) { if (k !== 'length') hits.add(name + '.' + String(k)); return t[k]; } });
    const eP = new Proxy(st.e, { get(t, k) { if (k === 'hand') return arrP(t.hand, 'e.hand'); if (k === 'pile') return arrP(t.pile, 'e.pile'); return t[k]; } });
    return { sp: new Proxy(st, { get(t, k) { if (k === 'plan') return planP; if (k === 'e') return eP; return t[k]; } }), hits };
  }
  let states = 0;
  for (let s = 1; s <= (QUICK ? 30 : 120); s++) {
    const id = ENEMY_IDS[s % 10], tier = TIERS[s % 3];
    const { duel } = startFor(id, tier, s * 53, { relics: relicSet(s), pos: posFor(id, s), atk: s % 2 });
    const R = lcg(s);
    while (!duel.over) {
      states++;
      for (const n of NAMES) {
        const before = JSON.stringify(duel);
        const a1 = EN.policies[n](duel, lcg(s * 9 + duel.n), {}, C), a2 = EN.policies[n](duel, lcg(s * 9 + duel.n), {}, C);
        ok(EN.isLegal(duel, a1), n + ' legal', a1);
        eq(a1, a2, n + ' same R → same act');
        ok(JSON.stringify(duel) === before, n + ' does not change the duel');
        const { sp, hits } = spy(duel);
        EN.policies[n](sp, lcg(1), {}, C);
        if (n === 'oracle') ok(hits.has('plan.idx') && hits.has('plan.attr'), 'oracle reads the plan', [...hits]);
        else ok(hits.size === 0, n + ' reads only the public view', [...hits]);
      }
      EN.resolveTurn(duel, EN.policies.random(duel, R));
    }
  }
  console.log('     ' + states + ' states × ' + NAMES.length + ' policies');
  // runPolicy／shopPolicy／bargainPolicy 形狀
  const run = EN.newRun(C, { seedKey: 'pol', nightNo: 2, ace: 'pearl' });
  ok(EN.shopPolicy(run, C, 'smart').length === 0, 'shopPolicy before the pick → []');
  EN.choose(run, C, EN.bargainPolicy(run, C));
  run.money = 3000;
  const chs = EN.shopPolicy(run, C, 'smart');
  ok(Array.isArray(chs) && EN.shopPolicy(run, C, 'none').length === 0, 'shopPolicy returns a list', chs);
  const r2 = JSON.parse(JSON.stringify(run));
  for (const ch of chs) ok(EN.choose(r2, C, ch).ok, 'shopPolicy choice valid', ch);
  eq(run.money, 3000, 'shopPolicy does not change the run');
  // runPolicy 的升級照 harness MIX（A D A H D A X D A H；X→聲望上限）
  const lr = JSON.parse(JSON.stringify(run)); lr.pending = { type: 'level', offer: [{ pick: 'def', n: 1 }, { pick: 'atk', n: 1 }, { pick: 'hp', n: 2 }] };
  const MIX = ['atk', 'def', 'atk', 'hp', 'def', 'atk', 'hp', 'def', 'atk', 'hp'];
  for (let k = 0; k < 12; k++) { lr.picks = MIX.slice(0, k % 10).concat([]); while (lr.picks.length < k) lr.picks.push('atk'); eq(EN.runPolicy(lr, C), { type: 'level', pick: MIX[k % 10] }, 'runPolicy level pick #' + (k + 1)); }
});

section('12 view() 不洩漏：沒有 plan／他的 attr／idx／bluff，也沒有他手牌的卡', () => {
  for (let s = 1; s <= (QUICK ? 60 : 300); s++) {
    const { duel } = startFor(ENEMY_IDS[s % 10], TIERS[s % 3], s * 3, { pos: posFor(ENEMY_IDS[s % 10], s) });
    const R = lcg(s);
    while (!duel.over) {
      const v = EN.view(duel);
      ok(['plan', 'attr', 'idx', 'bluff', 'why', 'eCard', 'eHand'].every(k => !(k in v)), 'no hidden keys at the top', Object.keys(v));
      eq(v.eDeck.map(x => x.id), v.eDeckIds, 'eDeck = the public list (stars after the buff)');
      ok(v.eDeck.every(x => { const c = [...duel.e.pile, ...duel.e.hand, ...duel.e.thrown].find(y => y.id === x.id); return c && c.c === x.c && c.o === x.o && c.h === x.h; }), 'eDeck stars = his real cards');
      ok(['pAtk', 'pDef', 'eAtk', 'eDef'].every(k => Number.isInteger(v[k])) && v.eAtk === duel.e.atk && v.eDef === duel.e.def, 'view 品味／底氣 both sides');
      // 11-17 提示分級：hint＝{attr, line, kind, not, set}；明指 attr＝計畫色、set＝[attr]；半指／不露 attr＝null（不洩漏計畫色），set＝他可能出的那幾色
      eq(Object.keys(v.hint).sort(), ['attr', 'kind', 'line', 'not', 'set'], 'hint = {attr, line, kind, not, set}');
      const ph = duel.plan.hint, hk = ph.kind || 'one';
      ok(v.hint.line === ph.line && v.hint.kind === hk, 'hint is the plan hint (line, kind)');
      if (hk === 'one') ok(v.hint.attr === ph.attr && sameSet(v.hint.set, [ph.attr]) && v.hint.not === null, 'one: attr = plan, set = [attr]', v.hint);
      else if (hk === 'half') ok(v.hint.attr === null && v.hint.not === ph.not && ph.not !== ph.attr && sameSet(v.hint.set, ATTRS.filter(a => a !== ph.not)) && v.hint.set.includes(ph.attr), 'half: attr null, set = the other two (plan inside)', v.hint);
      else ok(v.hint.attr === null && v.hint.not === null && sameSet(v.hint.set, ATTRS), 'none: attr null, set = all three', v.hint);
      ok(!('rho' in v.honesty) || typeof v.honesty.rho === 'number', 'honesty.rho is a number');
      const hand = new Set(duel.e.hand);
      const walk = o => { if (!o || typeof o !== 'object') return false; if (hand.has(o)) return true; return Object.values(o).some(walk); };
      ok(!walk(v), 'no card of his hand in the view');
      ok(v.eHandN === duel.e.hand.length && v.pile === duel.e.pile.length && v.eDeckIds.length === duel.e.deckSize, 'counts are public');
      EN.resolveTurn(duel, EN.policies.random(duel, R));
    }
    ok(EN.view(duel).hint === null, 'no hint after the end');
  }
});

section('13 教學：3 王牌 × 特價箱 C(n,3) 種挑法（店主 11-16 換牌：12 張＝220 種；原本 9 張 84 種），照 pick 出 → 每手＝expect、第 6 手 KO、前 5 手不 KO', () => {
  const P = C.bargain.pool, N = P.length, combos = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) for (let k = j + 1; k < N; k++) combos.push([P[i], P[j], P[k]]);
  ok(N >= 12 && N <= 15 && combos.length === N * (N - 1) * (N - 2) / 6, 'C(' + N + ',3) combos');
  let n = 0;
  for (const tier of TIERS) {
    const sc = C.tutorial.script[tier], ex = C.tutorial.expect[tier];
    combos.forEach((cb, ci) => {
      const bag = [...C.gifts[tier], ...(ci % 2 ? cb.slice().reverse() : cb)];
      const eDef = EN.enemyDef(C, 'man', { tutorial: true });
      ok(eDef.hp === 18 && eDef.planner === 'easy' && eDef.q === 1, 'tutorial man: 18, easy, honest');
      const { duel } = EN.startDuel(pDefFor(tier, { bag }), eDef, { seed: ci * 31 + 1, script: sc, hintTable: HINTS });
      for (let h = 0; h < 6; h++) {
        ok(!duel.over, 'not over before hand ' + (h + 1), { tier, cb });
        if (duel.over) break;
        ok(duel.plan.why === 'script' && duel.plan.hint.line === sc.hints[h] && duel.plan.hint.attr === sc.plays[h].attr, 'hand ' + (h + 1) + ' follows the script');
        const p = sc.pick[h];
        let act;
        if (p === 'ace') act = { ace: true };
        else if (p === 'blocked:o') act = EN.blockedChoice(duel, 'o');
        else act = { i: duel.p.hand.findIndex(c => c && c.id === p.id), attr: p.attr };
        if (!ok(act && EN.isLegal(duel, act), 'pick legal ' + tier + ' hand ' + (h + 1), { p, act })) break;
        const played = act.ace ? duel.p.ace : duel.p.hand[act.i];
        if (p === 'blocked:o') ok(cb.includes(played.id), 'hand 5 plays a bargain card', played.id);
        const cl = clashOf(EN.resolveTurn(duel, act));
        const want = Object.assign({}, ex[h]);
        if (h === 4) { want.toE = 0; want.toP = 5 - played.o; }
        const got = {}; for (const k of Object.keys(want)) got[k] = cl[k];
        if (JSON.stringify(got) !== JSON.stringify(want)) ok(false, 'expect ' + tier + ' hand ' + (h + 1), { want, got, cb }); else pass++;
        ok(cl.eCard.id === sc.plays[h].id && !cl.bluff, 'he plays the scripted record');
      }
      ok(duel.over && duel.over.win && duel.over.by === 'hp' && duel.n === 6, 'KO on hand 6', { over: duel.over, n: duel.n });
      n++;
    });
  }
  console.log('     ' + n + ' tutorial runs');
  // 走 run 的路：newRun（序章）→ 特價箱挑三張 → startFight({tutorial}) → 照 pick 打 → 贏了收 Eminem＋配件三選一
  for (const tier of TIERS) {
    const run = EN.newRun(C, { seedKey: 'tut-' + tier, nightNo: 1, ace: tier });
    ok(EN.choose(run, C, EN.bargainPolicy(run, C)).ok, 'tutorial run: pick');
    const f = EN.startFight(run, C, { tutorial: true });
    const sc = C.tutorial.script[tier];
    for (let h = 0; h < 6 && !f.duel.over; h++) {
      const p = sc.pick[h];
      const act = p === 'ace' ? { ace: true } : p === 'blocked:o' ? EN.blockedChoice(f.duel, 'o') : { i: f.duel.p.hand.findIndex(c => c && c.id === p.id), attr: p.attr };
      EN.resolveTurn(f.duel, act);
    }
    ok(f.duel.over && f.duel.over.win && f.duel.n === 6, 'run tutorial KO on 6 ' + tier);
    const res = EN.finishFight(run, C);
    ok(res.win && res.earn === C.economy.win.prologue && run.prologue === 'done' && run.pending && run.pending.prologue && run.pending.cards[0] === C.enemies.man.drop, 'prologue reward offer', res);
  }
});

section('14 content 形狀（§4 牌組限制、§4.2 禮物、§4.3 特價箱、提示、誠實度、經濟、配件、教學資料）', () => {
  const probs = shapeProblems(C, EN);
  ok(probs.length === 0, 'shapeProblems empty', probs.slice(0, 12));
  // STUB 跟真卡一致（A3 烘好之後）
  let real = 0;
  for (const [id, s] of Object.entries(STUB)) if (C0.cards[id]) { real++; eq([C0.cards[id].c, C0.cards[id].o, C0.cards[id].h], s, 'stub stars = baked ' + id); }
  // 主屬性分布：經典 4（男子、那張我有、針壓、名盤守門員）、冷門 3、硬蕊 2
  const main = {}; for (const id of ['man', ...C.normals, ...C.elites]) main[id] = EN.deckMain(C.enemies[id].deck.map(card), C.enemies[id].taste);
  eq(main, { man: 'c', copycat: 'c', already: 'o', needle: 'c', skip: 'o', broke: 'h', buyer: 'h', label: 'o', critic: 'c' }, 'deckMain per guest (§4.1)');
  ok(C.version === 'lab-4' && EN.VERSION === 'lab-4', 'version lab-4');
  for (const k of ['habits', 'habitLabels']) ok(!(k in C), 'v3 shim ' + k + ' removed');
  ok(!('phase2Lines' in C) && !('example' in C.rules) && !('sub' in C.rules), 'v3 rule-card example / phase2 removed');
  for (const id of ENEMY_IDS) ok(!('title' in C.enemies[id]) && !('zh' in C.honesty[C.enemies[id].honesty]), 'FIXLIST 6: no subtitle, no honesty label ' + id);
  eq(ENEMY_IDS.map(id => C.enemies[id].name), ['男子', '文青同好', '社團學長', '音響發燒友', '二手店老闆', '地下樂團吉他手', '前衛樂迷', '地下廠牌主理人', '資深樂評', '傳說藏家'], 'FIXLIST 6 names');
  ok(C.rules.lines[5] === '提示會暗示他這手的打算，但有些人會唬你。王牌 7 星，一場用一次。六手內沒分出勝負，比誰的聲望條剩得多。', 'rule card line 6 (FIXLIST 2／3)');
  const FORBID = /氣勢|輾壓|賭注|相生|割捨|七星回擊|霸權|點播/;
  const scan = (o, p) => { if (typeof o === 'string') ok(!FORBID.test(o), 'no removed mechanic words in ' + p, o); else if (o && typeof o === 'object') for (const k in o) if (k !== 'cards') scan(o[k], p + '.' + k); };
  scan({ relics: C.relics, coachTips: C.coachTips, rules: C.rules, hints: C.hints, duelText: C.duelText, lines: C.lines, shopLines: C.shopLines, shopUi: C.shopUi }, 'C');
  console.log('     stubbed cards: ' + stubbed + ' (baked & checked: ' + real + ')' + (fakeBins ? '; fake bins (no bins.js yet)' : ''));
});

section('15 台幣行情（FIXLIST 8）：稀有度、價格、特價箱每張、配件 3000、賣回半價、千分位；分類（契約）；view 不帶誠實度字', () => {
  const R = (c, o, h, tier) => EN.rarity(mkCard('r', c, o, h, tier));
  // score＝c＋h＋(o===5?1:0)：≤5 普通、6 稀有、7 獨特、8 史詩、≥9 傳奇；頂點卡＝頂點
  eq([R(1, 5, 1), R(3, 4, 2), R(4, 1, 2), R(5, 5, 1), R(5, 4, 2), R(4, 5, 3), R(5, 1, 3), R(5, 5, 3), R(5, 1, 4), R(5, 5, 5), R(7, 3, 3, 'hall'), R(1, 7, 1, 'pearl')],
    ['common', 'common', 'rare', 'uncommon', 'uncommon', 'epic', 'epic', 'legendary', 'legendary', 'legendary', 'apex', 'apex'], 'rarity table');
  eq(EN.rarityScore(mkCard('s', 4, 5, 3)), 8, 'rarityScore o=5 → +1');
  eq(EN.RARITY, ['common', 'rare', 'uncommon', 'epic', 'legendary', 'apex'], 'RARITY order');
  const P = r => EN.priceOf(C, Object.assign(mkCard('p-' + r, 1, 1, 1), r === 'apex' ? { tier: 'hall', c: 7 } : {
    common: { c: 1, o: 4, h: 1 }, rare: { c: 5, o: 1, h: 1 }, uncommon: { c: 5, o: 1, h: 2 }, epic: { c: 5, o: 1, h: 3 }, legendary: { c: 5, o: 1, h: 4 } }[r]));
  eq(EN.RARITY.map(P), [800, 1000, 1200, 3000, 4000, 8000], 'priceOf by rarity');
  for (const id of C.bargain.pool) eq(EN.priceOf(C, id), [0, 100, 200, 300][EN.peak(card(id))], 'bargain ' + id + ' by highest star');
  eq([EN.bargainPriceOf(C, mkCard('b1', 1, 1, 1)), EN.bargainPriceOf(C, mkCard('b2', 2, 1, 1)), EN.bargainPriceOf(C, mkCard('b3', 1, 3, 2)), EN.bargainPriceOf(C, mkCard('b4', 4, 1, 1))], [100, 200, 300, 300], 'bargainPriceOf 1/2/3/(4→3)');
  for (const id of Object.keys(C.relics)) { eq(EN.relicPrice(C, id), 3000, 'relic ' + id + ' $3,000'); eq(EN.sellValue(C, id), 1500, 'relic ' + id + ' sells for half'); }
  eq(EN.sellValue(C, mkCard('sv', 5, 1, 3)), 1500, 'epic sells for half');
  eq([EN.moneyText(0), EN.moneyText(800), EN.moneyText(1200), EN.moneyText(12000), EN.moneyText(1234567)], ['0', '800', '1,200', '12,000', '1,234,567'], 'moneyText');
  // 分類：第一個曲風（electronic → elec）、台灣地區優先
  const K = (genres, region) => EN.categoryOf({ genres, region });
  eq([K(['rock', 'jazz'], 'xx'), K(['electronic'], 'jp'), K(['jazz'], 'tw'), K(['hiphop'], 'xx'), K(['blues', 'folk'], 'xx'), K(['nope'], 'xx'), K([], 'tw')],
    ['rock', 'elec', 'tw', 'hiphop', 'blues', null, 'tw'], 'categoryOf');
  // 契約形狀的箱子（bins.js 交了用真的；沒交用 fixture）
  for (const k of BIN_KEYS) {
    const b = C.bins[k];
    if (!ok(!!b, 'bin ' + k + ' exists')) continue;
    ok(b.key === k && b.zh === LABEL[k][1] && (k === 'picks' ? !!b.label : b.label === LABEL[k][0]) && Array.isArray(b.pool) && Array.isArray(b.front), 'bin ' + k + ' {key,label,zh,pool,front}', { key: b.key, label: b.label, zh: b.zh });
    if (CATS.includes(k)) ok(b.pool.every(id => EN.categoryOf(card(id)) === k), 'bin ' + k + ' pool = its category');
    if (SUB[k]) ok(b.pool.every(id => subOk(k, card(id))), 'bin ' + k + ' pool = its subgenres');
    if (k === 'feature') ok(b.pool.every(id => ['epic', 'legendary'].includes(EN.rarity(card(id)))), 'feature pool = epic + legendary');
  }
  { const bp = binsProblems(C, EN); ok(bp.length === 0, 'binsProblems (check-content) empty on ' + (fakeBins ? 'the fixture' : 'bins.js'), bp.slice(0, 8)); }
  // view：沒有誠實度的字（只有 key 與 q，給策略）；客人沒有副標
  const v = EN.view(startFor('label', 'hall', 3).duel);
  // 11-17 讀牌加難：多 rho／rhoNow（讀你的機率）、streak、rel（你上一手的應對）、beta（兩種唬法的比例）、hit（被唬到多扣）——策略用，畫面不寫
  eq(Object.keys(v.honesty).sort(), ['beta', 'hit', 'key', 'q', 'qNow', 'rel', 'rho', 'rhoNow', 'streak'], 'view.honesty = {key, q, qNow, rho, rhoNow, streak, rel, beta, hit}（策略用；畫面不寫）');
  ok(!Object.values(v.honesty).some(x => typeof x === 'string' && /[一-鿿]/.test(x)), 'view.honesty has no Chinese text');
  ok(v.eTitle === null && v.eName === '地下廠牌主理人', 'view: name only, no title', { n: v.eName, t: v.eTitle });
});

// 無限試煉 V3 曲線（../curve/curves.cjs atkV3f／defV3f／oldQ／oldDiff；SPEC §0）——測試自己寫一份；CUR＝V3＋11-16 前期加難，對 engine 的預設（TRIAL）與 content 的旋鈕
const lateT = d => Math.max(0, d - 3);
const V3 = {
  atk: (d, boss) => Math.min(2, Math.round(0.75 * lateT(d))) + Math.floor(Math.max(0, d - 6) / 5) + (boss ? 1 : 0),
  def: (d, boss) => Math.min(1, Math.round(0.45 * lateT(d))) + (boss ? 1 : 0),
  planner: d => (d < 3 ? 'easy' : d < 5 ? 'normal' : 'hard'),
  q: d => (d < 3 ? 1 : d < 5 ? 0.85 : 1 - Math.min(0.55, 0.18 + 0.05 * Math.max(0, d - 5))),
  floor: d => Math.min(13, 3 + Math.floor(0.7 * d)), buff: d => Math.floor(Math.max(0, d - 3) / 3), aceP: d => (d >= 5 ? Math.min(0.6, 0.15 * (d - 4)) : 0),
};
// 現在的曲線（engine 預設＝content）：V3＋店主 11-16「前期太簡單」——只動第 1–4 位：q.easy 0.75（第 A 波合併；原本 0.8）、q.normal 0.75、atk／def.lateFrom 3→1；第 5 位起＝V3
const late1 = d => Math.max(0, d - 1);
const CUR = Object.assign({}, V3, {
  atk: (d, boss) => Math.min(2, Math.round(0.75 * late1(d))) + Math.floor(Math.max(0, d - 6) / 5) + (boss ? 1 : 0),
  def: (d, boss) => Math.min(1, Math.round(0.45 * late1(d))) + (boss ? 1 : 0),
  q: d => curQ(d),                                   // 11-17 讀牌加難：第 3–4 位 0.72、第 5 位起 newQ（封底 0.60）
});
// 第 I 波 I-0（SPEC-I §7.2）：first＝Lv1→2 要幾經驗（trial.firstNeed；沒給／0＝照 1＋need）
const levelAtT = (d, XP, need, first) => { let xp = 0; for (let k = 1; k < d; k++) xp += XP[EN.classAt(k)]; let L = 1; const nd = l => l === 1 && first > 0 ? first : l + need; while (xp >= nd(L)) { xp -= nd(L); L++; } return { L, xp }; };
const forceWin = (run) => { const f = EN.startFight(run, C, {}); let g = 0; while (!f.duel.over && g++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } }); return EN.finishFight(run, C); };
const settleAll = run => { let g = 0; while (run.pending && g++ < 40) { const ch = EN.runPolicy(run, C); if (!EN.choose(run, C, ch).ok) break; } };

section('16 無限試煉：V3 曲線（攻／底氣／難度／q／聲望）、難度階梯覆寫、trialDeck（下限、加星上限 5、王牌機率）、品味／底氣傷害、經驗與升級、中繼點、來客那排、結算', () => {
  // (a) 位數 → 類別、輪；engine 預設＝CUR（逐位 1–300）＝content 的旋鈕；第 5 位起＝V3（店主 11/12），第 1–4 位＝11-16 前期加難；驗算值（map-engine §E）；改難度時這條跟著改
  eq([1, 2, 3, 4, 5, 6, 10, 11, 25].map(EN.classAt), ['normal', 'normal', 'normal', 'elite', 'boss', 'normal', 'boss', 'normal', 'boss'], 'classAt');
  eq([1, 5, 6, 10, 11, 100].map(EN.roundOf), [1, 1, 2, 2, 3, 20], 'roundOf');
  const NOC = Object.assign({}, C, { trial: undefined });
  let bad = 0, early = 0;
  // 11-17 讀牌加難（DESIGN §2.2 逐位表）：讀你 ρ（第 3–4 位 .30、第 5 位 .45 每位 +.02 封頂 .55）、beta .65（第 3 位起）、半指（3–4 位 .15、第 5 位 .20 每位 +.01 封頂 .30）、
  //   不露（第 6 位 .05 每位 +.02 封頂 .15）、被唬到多扣 1（第 5 位起）；rhoMul 2、rhoCap .9、rMercy .7 一律帶。測試自己寫一份
  const r6 = x => Math.round(x * 1e6) / 1e6;
  const READ = d => ({ rho: r6(d < 3 ? 0 : d < 5 ? 0.30 : Math.min(0.55, 0.45 + 0.02 * (d - 5))), rhoMul: 2, rhoCap: 0.9, rMercy: 0.7, beta: d < 3 ? 1 : 0.65,
    half: r6(d < 3 ? 0 : d < 5 ? 0.15 : Math.min(0.30, 0.20 + 0.01 * (d - 5))), none: r6(d < 6 ? 0 : Math.min(0.15, 0.05 + 0.02 * (d - 6))), hit: d >= 5 ? 1 : 0 });
  const wantOf = (K, d, b) => Object.assign({ hp: b ? 14 : 12, atk: K.atk(d, b), def: K.def(d, b), planner: K.planner(d), q: Math.round(K.q(d) * 1e6) / 1e6 }, K === CUR ? READ(d) : {});
  const noQ = g => { const o = Object.assign({}, g); for (const k of ['q', 'rho', 'rhoMul', 'rhoCap', 'rMercy', 'beta', 'half', 'none', 'hit']) delete o[k]; return o; };
  for (let d = 1; d <= 300; d++) for (const cls of ['normal', 'elite', 'boss']) {
    const g = EN.trialGuest(NOC, d, cls), b = cls === 'boss';
    const want = wantOf(CUR, d, b), v3 = wantOf(V3, d, b);
    if (JSON.stringify(g) !== JSON.stringify(want)) { if (bad++ < 5) ok(false, 'engine default = CUR at ' + d + ' ' + cls, { g, want }); } else pass++;
    if (JSON.stringify(EN.trialGuest(C, d, cls)) !== JSON.stringify(g)) { if (bad++ < 5) ok(false, 'content.trial.curve = engine default at ' + d + ' ' + cls); } else pass++;
    // 第 5 位起攻／底氣／出招難度／聲望＝V3（q 與讀牌那幾欄 11-17 起另算）
    if (d >= 5) { if (JSON.stringify(noQ(g)) !== JSON.stringify(noQ(v3))) { if (bad++ < 5) ok(false, 'pos ≥5 = V3 (atk/def/planner/hp) at ' + d + ' ' + cls, { g, v3 }); } else pass++; }
    else if (JSON.stringify(noQ(g)) !== JSON.stringify(noQ(v3)) || g.q !== v3.q) early++;
  }
  ok(early > 0, '第 1–4 位跟 V3 不同（前期加難有生效）', early);
  const G = (d, c) => EN.trialGuest(C, d, c || EN.classAt(d));
  ok(G(1).q === 0.75 && G(1).atk === 0 && G(1).def === 0 && G(2).q === 0.75 && G(2).atk === 1 && G(2).def === 0 && G(3).q === 0.72 && G(3).atk === 2 && G(3).def === 1 && G(4).q === 0.72 && G(4).atk === 2 && G(4).def === 1,
    '前期加難驗算值（11-16；q.easy 第 A 波合併 .8→.75；11-17 q.normal .75→.72）：第 1 位 q .75 攻 0 底 0、第 2 位 q .75 攻 1、第 3 位 q .72 攻 2 底 1、第 4 位菁英 q .72 攻 2 底 1');
  ok(G(5).atk === 3 && G(5).def === 2 && G(5).q === 0.75 && G(6).atk === 2 && G(6).def === 1 && G(6).q === 0.7 && G(7).q === 0.65 && G(11).atk === 3 && G(20).atk === 5 && G(8).q === 0.6 && G(12).q === 0.6 && G(60).q === 0.6,
    'V3 驗算值（第 5 位起攻／底氣不變）＋11-17 q：第 5 位藏家攻 3 底 2 q .75、第 6 位攻 2 底 1 q .70、第 7 位 .65、第 8 位起封底 .60、第 11 位攻 3、第 20 位藏家攻 5');
  ok(G(1).rho === 0 && G(2).beta === 1 && G(2).half === 0 && G(3).rho === 0.3 && G(3).beta === 0.65 && G(3).half === 0.15 && G(3).hit === 0 && G(5).rho === 0.45 && G(5).half === 0.2 && G(5).hit === 1 && G(5).none === 0
    && G(6).none === 0.05 && G(10).rho === 0.55 && G(10).half === 0.25 && G(10).none === 0.13 && G(40).rho === 0.55 && G(40).half === 0.3 && G(40).none === 0.15,
    '11-17 讀牌加難驗算值（DESIGN §2.2）：第 1–2 位不讀、一種唬法；第 3 位 ρ .30 beta .65 半指 .15；第 5 位 ρ .45 半指 .20 多扣 1；第 6 位不露 .05；第 10 位 ρ .55 半指 .25 不露 .13；封頂 .55／.30／.15');
  { const OFF = Object.assign({}, C, { trial: Object.assign({}, C.trial, { curve: Object.assign({}, C.trial.curve, { read: { from: 0 }, hintMix: { half: { from: 0 }, none: { from: 0 } } }) }) });
    const g = EN.trialGuest(OFF, 20, 'boss');
    ok(g.rho === 0 && g.beta === 1 && g.half === 0 && g.none === 0 && g.hit === 0, 'read.from 0／hintMix from 0 → 整條關（＝改版前）', g); }
  ok(G(1).planner === 'easy' && G(2).planner === 'easy' && G(3).planner === 'normal' && G(4).planner === 'normal' && G(5).planner === 'hard' && G(5).hp === 14 && G(4).hp === 12, '出招難度 1–2 easy、3–4 normal、5 起 hard；客人 12、藏家 14');
  // (b) 難度階梯（之後 Monster Train 式）：tiers[k−1] 是部分覆寫，只改資料
  { const C2 = Object.assign({}, C, { trial: Object.assign({}, C.trial, { tiers: [{ curve: { atk: { add: 1 }, q: { feintMax: 0.6 } }, guestHp: { boss: 16 } }] }) });
    const t0 = EN.trialGuest(C2, 20, 'boss', 0), t1 = EN.trialGuest(C2, 20, 'boss', 1);
    ok(t1.atk === t0.atk + 1 && t1.hp === 16 && t0.hp === 14 && t1.q === 0.4 && t1.def === t0.def, 'tier 1 = partial override (攻 +1、藏家 16、q 封底 .4)', { t0, t1 });
    const r = EN.newRun(C2, { seedKey: 'tier', runNo: 2, ace: 'hall', tier: 1 }); EN.choose(r, C2, EN.bargainPolicy(r, C2)); EN.jumpTo(r, C2, 20);
    const f = EN.startFight(r, C2, {}); ok(f.duel.e.max === 16 && f.duel.e.atk === t1.atk, 'run.tier → startFight uses the tier'); }
  // (c) trialDeck：下限、加星（上限 5、保留原 id、plus）、藏家王牌、一般客人王牌機率；content.cards 不被改
  const snap = JSON.stringify(Object.keys(C.cards).map(id => [C.cards[id].c, C.cards[id].o, C.cards[id].h]));
  const aceN = {}, aceTot = {};
  for (let s = 1; s <= (QUICK ? 400 : 2000); s++) {
    const id = [...C.normals, ...C.elites, C.boss][s % 9], ce = C.enemies[id], d = 1 + (s * 7) % 60, cls = ce.boss ? 'boss' : EN.classAt(d) === 'boss' ? 'normal' : EN.classAt(d);
    const tier = TIERS[s % 3], o = { seedKey: 'td-' + s, runNo: 1 + (s % 4), playerAce: tier, bossAce: otherTier(tier, s), cls };
    const td = EN.trialDeck(C, id, d, o), fl = V3.floor(d), bf = V3.buff(d);
    ok(td.deck.length === ce.deck.length && new Set(td.deck.map(c => c.id)).size === ce.deck.length && td.floor === fl && td.buff === bf, 'deck size, unique, floor, buff', { id, d });
    for (const c of td.deck) {
      const orig = C.cards[c.id];
      if (!orig || orig.tier) { ok(false, 'deck card is a pool card (no ace)', c.id); continue; }
      const m = EN.topAttr(orig), want = Math.min(5, Math.max(orig[m], orig[m] + bf));
      if (EN.power(orig) < fl || c[m] !== want || ATTRS.some(a => a !== m && c[a] !== orig[a]) || (want !== orig[m]) !== !!c.plus || (c.plus && (c.plus.attr !== m || c.plus.n !== want - orig[m]))) { ok(false, 'floor／buff per card', { id: c.id, d, fl, bf, orig: [orig.c, orig.o, orig.h], got: [c.c, c.o, c.h], plus: c.plus }); }
      else pass++;
      ok(ce.deck.includes(c.id) === (EN.power(orig) >= fl ? ce.deck.includes(c.id) : false), 'only below-floor cards are replaced');
    }
    for (const x of ce.deck) if (EN.power(C.cards[x]) >= fl && !td.deck.some(c => c.id === x)) ok(false, 'a guest keeps his own cards that meet the floor', { id, x, d });
    if (cls === 'boss') ok(td.ace && td.ace.id === C.aces[o.bossAce], 'boss → the ace you did not pick');
    else {
      aceTot[d] = (aceTot[d] || 0) + 1;
      if (td.ace) { aceN[d] = (aceN[d] || 0) + 1; ok(td.ace.tier && td.ace.id !== C.aces[tier], 'guest ace is one you did not pick'); }
      if (d < 5) ok(!td.ace, 'no guest ace before pos 5');
    }
  }
  ok(JSON.stringify(Object.keys(C.cards).map(id => [C.cards[id].c, C.cards[id].o, C.cards[id].h])) === snap, 'content.cards untouched by the buff');
  { let n = 0, a = 0, e = 0; for (const d of Object.keys(aceTot)) { if (+d < 5) continue; n += aceTot[d]; a += aceN[d] || 0; e += aceTot[d] * V3.aceP(+d); }
    ok(Math.abs(a - e) / n <= Math.max(0.02, 3 * Math.sqrt(0.25 / n)), 'guest ace rate ≈ min(60%, 15%×(pos−4)) (±3σ)', { got: (a / n).toFixed(3), want: (e / n).toFixed(3), n }); }
  for (const d of [20, 40, 80]) { const td = EN.trialDeck(C, 'boss', d, { seedKey: 'cap', runNo: 1, playerAce: 'hall', bossAce: 'pearl' }); ok(td.deck.every(c => Math.max(c.c, c.o, c.h) <= 5), '加星上限 5 at ' + d); }
  // (d) 品味／底氣：half(x, D)＝max(⌈x/2⌉, x−D)；你的品味只加在剋中；他的品味只在他扣到你時加；notes 帶 C.trial.notes 的字
  eq([EN.half(6, 1), EN.half(8, 2), EN.half(8, 10), EN.half(1, 5), EN.half(5, 0)], [5, 6, 4, 1, 5], 'half: at most half is blocked');
  const S3 = [mkCard('s1', 1, 4, 1), mkCard('s2', 4, 1, 1), mkCard('s3', 1, 1, 4)];
  const E5 = [mkCard('f1', 5, 1, 1), mkCard('f2', 5, 1, 1), mkCard('f3', 5, 1, 1), mkCard('f4', 5, 1, 1)];
  const stat = (o) => { const d = rig(o.relics || [], S3, E5, { pHp: 20 }); d.p.atk = o.pa | 0; d.p.def = o.pd | 0; d.e.atk = o.ea | 0; d.e.def = o.ed | 0; d.noteText = C.trial.notes; return d; };
  { const d = stat({ pa: 2, ed: 1 }), r = EN.preview(d, { i: 0, attr: 'o' }, { attr: 'c', star: 4 });
    eq([r.kind, r.toE, r.notes.map(n => [n.stat, n.n, n.text])], ['counter', 5, [['atk', 2, '品味：多扣 2'], ['eDef', 1, '他的底氣：少扣 1']]], '冷 4 剋經 4、品味 2、他底氣 1 → 4＋2＝6 → 擋 1 → 5');
    const cl = clashOf(EN.resolveTurn(d, { i: 0, attr: 'o' })); eq([cl.toE, cl.notes.length, d.e.hp], [5, 2, 25], 'resolve = preview'); }
  { const d = stat({ pa: 3, ed: 2 }), r = EN.preview(d, { i: 1, attr: 'c' }, { attr: 'c', star: 2 });
    eq([r.kind, r.toE, r.notes.map(n => n.stat)], ['mirrorWin', 1, ['eDef']], '同色比星不加品味；他底氣 2 擋 2 → 最多擋一半 ⌈2/2⌉＝1'); }
  { const d = stat({ ea: 3, pd: 2 }), r = EN.preview(d, { i: 2, attr: 'h' }, { attr: 'c', star: 5 });
    eq([r.kind, r.toP, r.notes.map(n => [n.stat, n.n])], ['countered', 6, [['eAtk', 3], ['def', 2]]], '經 5 剋硬：5＋他的品味 3＝8 → 你的底氣 2 → 6'); }
  { const d = stat({ ea: 1, pd: 9 }), r = EN.preview(d, { i: 2, attr: 'h' }, { attr: 'c', star: 5 });
    eq([r.toP, r.notes.map(n => [n.stat, n.n])], [3, [['eAtk', 1], ['def', 3]]], '底氣再高也最多擋一半：6 → 3'); }
  { const d = stat({ ea: 2, pd: 1, relics: ['dustcover'] }), r = EN.preview(d, { i: 2, attr: 'h' }, { attr: 'c', star: 5 });
    eq([r.toP, r.notes.map(n => n.relic || n.stat)], [5, ['dustcover', 'eAtk', 'def']], '配件先算（防塵套 5→4）、再加他的品味（6）、再套底氣（5）'); }
  { const d = stat({ pa: 4, ea: 4, pd: 4, ed: 4 }), r = EN.preview(d, { i: 1, attr: 'c' }, { attr: 'c', star: 4 }); eq([r.kind, r.toE, r.toP, r.notes.length], ['tie', 0, 0, 0], 'tie: nobody hits, no notes'); }
  // (e) 經驗與升級（harness levelAt）：連贏到第 41 位，每一位的等級＝levelAt(位)；上限＝12＋(等級−1)＋聲望上限選項；打贏回 3；藏家獎金
  { const run = EN.newRun(C, { seedKey: 'lv-path', runNo: 2, ace: 'heresy' }); EN.choose(run, C, EN.bargainPolicy(run, C));
    let hpPicks = 0;
    for (let d = 1; d <= 40; d++) {
      const w = levelAtT(d, C.trial.xp, C.trial.levelNeed, C.trial.firstNeed);
      ok(run.pos === d && run.level === w.L && run.xp === w.xp, 'level at pos ' + d + ' = harness levelAt', { pos: run.pos, level: run.level, xp: run.xp, w });
      ok(run.maxHp === C.trial.youHp + (run.level > 1 ? C.trial.firstHp + (run.level - 2) * C.trial.levelHp : 0) + hpPicks * C.trial.picks.hp, '上限 = 12 + firstHp（Lv2）+ (Lv−2) + 2×選聲望上限');
      const m0 = run.money, res = forceWin(run);
      ok(res.earn === C.economy.win[EN.classAt(d)] && run.money === m0 + res.earn, 'earn by class at ' + d);
      settleAll(run);
      hpPicks = run.picks.filter(x => x === 'hp').length;
    }
    ok(C.economy.win.boss === C.economy.win.elite * 1.5, 'economy.win.boss = elite × 1.5 (裁定 3)');
    eq(run.picks.slice(0, 6), ['atk', 'def', 'atk', 'hp', 'def', 'atk'], 'runPolicy picks follow MIX');
    eq(run.checkpoints, [10, 20, 30], 'checkpoints 10／20／30 recorded on arriving there (走到就記)');
    eq([run.streak, run.bestStreak, EN.runSummary(run).wins, EN.runSummary(run).reached], [40, 40, 40, 41], 'streak 40, reached 41');
    eq(EN.toCheckpoint(run, C), 9, 'pos 41 → 離第 50 位還有 9 位'); }
  // (f) 中繼點
  eq([1, 9, 10, 11, 30, 31, 50, 51, 75, 76, 100, 101, 150, 151, 199, 200, 201].map(d => EN.nextCheckpoint(d, C)), [10, 10, 10, 20, 30, 50, 50, 75, 75, 100, 100, 150, 150, 200, 200, 200, 250], 'nextCheckpoint: 10 20 30 50 75 100, then every 50');
  eq([1, 7, 9, 10, 11, 49, 50, 100, 101].map(pos => EN.toCheckpoint({ pos }, C)), [9, 3, 1, 10, 9, 1, 25, 50, 49], 'toCheckpoint: from here to the next checkpoint strictly ahead (at 10 → 20)');
  { const r = EN.newRun(C, { seedKey: 'cpj', runNo: 2, ace: 'hall' }); EN.choose(r, C, EN.bargainPolicy(r, C)); EN.jumpTo(r, C, 10);
    eq(r.checkpoints, [], 'jumpTo does not record a checkpoint (not walked)');
    EN.jumpTo(r, C, 9); const fr = forceWin(r);
    ok(fr.win && r.checkpoints.length === 0 && r.pos === 9, 'beating 9: not yet'); settleAll(r);
    eq([r.pos, r.checkpoints], [10, [10]], 'arriving at 10 records it'); }
  // (g) 來客那排（這一輪 5 位）
  { const run = EN.newRun(C, { seedKey: 'rg', runNo: 2, ace: 'pearl' }); EN.choose(run, C, EN.bargainPolicy(run, C)); EN.jumpTo(run, C, 12);
    const rg = EN.roundGuests(run, C);
    eq(rg.map(x => x.pos), [11, 12, 13, 14, 15], 'roundGuests: positions of this round');
    eq(rg.map(x => x.id), run.order, 'roundGuests: ids = run.order');
    ok(rg.every(x => { const g = EN.trialGuest(C, x.pos, x.cls); return x.cls === EN.classAt(x.pos) && x.hp === g.hp && x.atk === g.atk && x.def === g.def; }), 'roundGuests: curve numbers');
    eq(rg.map(x => [x.done, x.cur]), [[true, false], [false, true], [false, false], [false, false], [false, false]], 'roundGuests: done／cur');
    ok(rg[4].hasAce === true, 'the boss always carries an ace');
    for (const x of rg.slice(0, 4)) ok(x.hasAce === !!EN.trialDeck(C, x.id, x.pos, { seedKey: 'rg', runNo: 2, playerAce: 'pearl', bossAce: run.bossAce, cls: x.cls }).ace, 'hasAce = trialDeck ace');
    forceWin(run);
    ok(EN.roundGuests(run, C)[1].done && run.pos === 12, 'won, reward pending → this guest shows done (pos not advanced yet)');
    settleAll(run); ok(run.pos === 13 && EN.roundGuests(run, C)[2].cur, 'next guest is current');
    // 打到第 15 位（藏家）：新一輪、新面孔、說情重設、補貨
    run.retryLeft = 0; const o1 = run.order.slice(), sh1 = JSON.stringify(run.shop.bins);
    for (let k = 0; k < 3; k++) { const res = forceWin(run); if (k === 2) ok(res.cls === 'boss' && res.aceWon === C.aces[run.bossAce], 'boss → aceWon'); settleAll(run); }
    ok(run.pos === 16 && run.round === 4 && run.idx === 0 && run.retryLeft === C.trial.retry && JSON.stringify(run.order) !== JSON.stringify(o1) && JSON.stringify(run.shop.bins) !== sh1, 'after the boss: round 4, new faces, 說情 reset, restocked');
    const t0 = run.taken; forceWin(run); settleAll(run); for (let k = 0; k < 4; k++) { forceWin(run); settleAll(run); }
    ok(run.taken >= t0 && run.aceWon, 'the boss ace counts once in 收了'); }
  // (h) 序章：打完聲望回滿、還是第 1 位；序章不給經驗
  { const run = EN.newRun(C, { seedKey: 'pro', runNo: 1, ace: 'hall' }); EN.choose(run, C, EN.bargainPolicy(run, C)); run.hp = 5;
    const f = EN.startFight(run, C, {}); ok(f.duel.p.hp === 5 && f.duel.e.id === 'man' && f.duel.e.atk === 0, 'prologue fight uses the run 聲望, no guest 品味');
    let g = 0; while (!f.duel.over && g++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 2 } });
    const res = EN.finishFight(run, C);
    ok(res.win && run.hp === run.maxHp && run.xp === 0 && run.streak === 0 && run.pos === 1 && res.cls === 'prologue', 'prologue won → full 聲望, no XP, still pos 1'); }
});

section('17 從唱片櫃挑牌開局：種子（包包組成、序章不收、頂點卡／重複擋掉）、不能賣回、這一趟進過包包／客人掉落的記錄、掉落＝他這一場的實際牌單、一趟留一張', () => {
  const G = C.gifts, NON = Object.keys(C.cards).filter(id => !C.cards[id].tier).sort();
  const others = t => NON.filter(id => !Object.values(G).flat().includes(id) && !C.bargain.pool.includes(id));
  const free = others();
  // (a) 包包＝種子＋老闆送的補到 4 張；種子跟送的重複：送的往下補；頂點卡、不存在、重複的丟掉；最多 3 張
  for (const ace of TIERS) {
    const r0 = EN.newRun(C, { seedKey: 'sd', runNo: 2, ace });
    eq([r0.bag, r0.seeds, r0.gifts, r0.entered, r0.drops, r0.kept], [G[ace], [], G[ace], [], [], null], ace + ' no seeds → the 4 gifts, empty records');
    for (let n = 0; n <= 3; n++) {
      const sd = free.slice(n * 7, n * 7 + n);
      const r = EN.newRun(C, { seedKey: 'sd' + n, runNo: 2, ace, seeds: sd });
      eq(r.bag, sd.concat(G[ace].slice(0, 4 - n)), ace + ' ' + n + ' seeds + gifts fill to 4');
      eq(r.seeds, sd, 'run.seeds'); eq(r.gifts, G[ace].slice(0, 4 - n), 'run.gifts = gifts actually placed');
      ok(r.taken === 4, '收了 4 張 at start', r.taken);
      const b = EN.bargainPolicy(r, C); ok(EN.choose(r, C, b).ok && r.bag.length === 7, 'bargain pick → 7 cards');
      eq(r.entered, b.ids, 'bargain picks entered the bag'); 
      ok(!r.bag.includes(C.aces[ace]) && r.shop.bins && Object.values(r.shop.bins).flat().every(id => !sd.includes(id)), 'seeds are not in the shop');
    }
    // 種子跟送的重複
    const dup = [G[ace][0], G[ace][2], free[40]];
    const rd = EN.newRun(C, { seedKey: 'dup', runNo: 3, ace, seeds: dup });
    eq(rd.bag, dup.concat([G[ace][1]]), ace + ' duplicate gift → next gift fills');
    ok(new Set(rd.bag).size === 4, 'no duplicate cards in the bag');
    // 擋掉：頂點卡、不存在的卡、重複、第 4 張
    const rb = EN.newRun(C, { seedKey: 'bad', runNo: 2, ace, seeds: [C.aces.hall, 'no-such-card', free[1], free[1], free[2], free[3], free[4], 7, null] });
    eq(rb.seeds, [free[1], free[2], free[3]], 'apex / missing / duplicate dropped, max 3');
    // 序章那一趟不挑
    const rp = EN.newRun(C, { seedKey: 'pro', runNo: 1, ace, seeds: [free[1]] });
    eq([rp.bag, rp.seeds], [G[ace], []], 'prologue run ignores seeds');
    const rp2 = EN.newRun(C, { seedKey: 'pro', runNo: 3, ace, prologue: true, seeds: [free[1]] });
    eq(rp2.seeds, [], 'prologue:true ignores seeds');
  }
  ok(!EN.canSeed(C, C.aces.hall) && !EN.canSeed(C, 'nope') && EN.canSeed(C, free[0]) && !EN.canSeed(C, null), 'canSeed');
  // (b) 不能賣回換錢（第 A 波 5 起：移出包包只走櫃檯 sell）：buy／buyBargain 順手賣 → counterOnly，run 不動（種子、送的、一般的都一樣）；
  //     櫃檯 sell 種子＝交還老闆 $0（拿掉就不是種子）；收獎勵時不能順手拿掉（dropId → counterOnly）
  { const sd = [free[3], free[11], free[19]];
    const run = EN.newRun(C, { seedKey: 'sell', runNo: 2, ace: 'pearl', seeds: sd });
    EN.choose(run, C, EN.bargainPolicy(run, C)); run.money = 99999;
    ok(sd.every(id => EN.isSeed(run, C, id)) && !EN.isSeed(run, C, G.pearl[0]) && !EN.isSeed(null, C, sd[0]) && EN.isSeed(run, C, card(sd[0])), 'isSeed');
    ok(EN.isGift(run, C, G.pearl[0]) && !EN.isGift(run, C, G.pearl[1]), 'isGift = gifts actually placed (+ ace)');
    const key = Object.keys(run.shop.bins).find(k => run.shop.bins[k].length), cid = run.shop.bins[key][0];
    while (run.bag.length < 8) run.bag.push(free.find(id => !run.bag.includes(id) && !Object.values(run.shop.bins).flat().includes(id)));   // 包包 8 張（不限之後照樣：賣種子／送的照擋）
    for (const id of sd) { const before = JSON.stringify(run), r = EN.choose(run, C, { type: 'buy', key, cardId: cid, sellId: id }); ok(!r.ok && r.error === 'counterOnly' && JSON.stringify(run) === before, 'buy selling a seed → counterOnly (sell at the counter), run untouched', r.error); }
    { const before = JSON.stringify(run), r = EN.choose(run, C, { type: 'buy', key, cardId: cid, sellId: G.pearl[0] }); ok(!r.ok && r.error === 'counterOnly' && JSON.stringify(run) === before, 'buy selling a gift → counterOnly'); }
    const BL = run.shop.bargain.slice();
    if (BL.length) { const before = JSON.stringify(run), r = EN.choose(run, C, { type: 'buyBargain', ids: [BL[0]], sellIds: [sd[1]] }); ok(!r.ok && r.error === 'counterOnly' && JSON.stringify(run) === before, 'buyBargain selling a seed → counterOnly'); }
    const plain = run.bag.find(id => !EN.isSeed(run, C, id) && !EN.isGift(run, C, id));
    { const before = JSON.stringify(run), r = EN.choose(run, C, { type: 'buy', key, cardId: cid, sellId: plain }); ok(!r.ok && r.error === 'counterOnly' && JSON.stringify(run) === before, 'buy selling a normal card → counterOnly too', r.error); }
    { const m = run.money, r = EN.choose(run, C, { type: 'buy', key, cardId: cid }); ok(r.ok && run.entered.includes(cid) && run.money === m - EN.priceOf(C, cid), 'buy without selling works; bought card entered', r.error); }
    for (const pol of ['none', 'smart']) { const r2 = JSON.parse(JSON.stringify(run)); for (const ch of EN.shopPolicy(r2, C, pol)) ok(ch.sellId == null && ch.sellIds == null, 'shopPolicy never sells while buying'); }
    // 櫃檯交還一張種子：$0、不再是種子
    { const m = run.money, q = EN.sellQuote(run, C, sd[2]), r = EN.choose(run, C, { type: 'sell', cardId: sd[2] });
      ok(q.ok && q.earn === 0 && q.reclaim === 'seed' && r.ok && run.money === m && !run.bag.includes(sd[2]) && !run.seeds.includes(sd[2]) && !EN.isSeed(run, C, sd[2]), 'sell a seed at the counter: $0, reclaimed, no longer a seed', { q, r });
      eq(r.effects, [{ loseCard: sd[2], earn: 0, reclaim: 'seed' }], 'sell a seed: effects say reclaim'); }
    // 拿獎勵：不能順手拿掉種子（第 A 波 5：移出包包只能去櫃檯）
    run.pending = { type: 'reward', enemyId: 'copycat', prologue: false, pos: 1, cls: 'normal', cards: [free[60]], relics: [], need: 'card', cardDone: false, relicDone: true };
    { const before = JSON.stringify(run), r = EN.choose(run, C, { type: 'take', cardId: free[60], dropId: sd[0] }); ok(!r.ok && r.error === 'counterOnly' && JSON.stringify(run) === before, 'take dropping a seed → counterOnly, run untouched', r.error); }
    const r = EN.choose(run, C, { type: 'take', cardId: free[60] });
    ok(r.ok && run.bag.includes(sd[0]) && run.seeds.includes(sd[0]) && run.seeds.length === 2 && run.entered.includes(free[60]), 'take without dropping: seeds stay', r.error); }
  // (c) 掉落＝他這一場的實際牌單（trialDeck 換牌、加星後；王牌不掉）；run.drops 記獎勵候選（沒拿的也算）；序章男子那張不算
  { let checked = 0;
    for (let s = 1; s <= (QUICK ? 6 : 20); s++) {
      const run = EN.newRun(C, { seedKey: 'drop-' + s, runNo: 2, ace: TIERS[s % 3] });
      EN.choose(run, C, EN.bargainPolicy(run, C));
      const offered = [];
      for (let g = 0; g < 12 && !run.over; g++) {
        const id = run.order[run.idx], pos = run.pos;
        const td = EN.trialDeck(C, id, pos, { seedKey: run.seedKey, runNo: run.runNo, playerAce: run.ace, bossAce: run.bossAce, tier: run.tier, main: EN.mainAt(run, C, pos) });   // 第 A 波 6：照主屬性組的那副
        const deckIds = td.deck.map(c => c.id);
        const res = forceWin(run);
        ok(res.win, 'won');
        const cards = res.offer && res.offer.type === 'reward' ? res.offer.cards : [];   // 沒有能收的（全在包包裡）：獎勵直接結掉
        for (const cid of cards) { ok(deckIds.includes(cid) && !C.cards[cid].tier, 'drop ∈ his actual deck this fight (no ace)', { id, pos, cid }); checked++; }
        ok(cards.every(cid => res.met.includes(cid)), 'drops are cards he threw');
        offered.push(...cards);
        settleAll(run);
      }
      ok(offered.every(id => run.drops.includes(id)) && run.drops.every(id => offered.includes(id)), 'run.drops = every reward card offered (taken or not)');
      ok(run.entered.every(id => !G[run.ace].includes(id)), 'gifts never count as entered');
    }
    ok(checked > 20, 'checked enough drops', checked);
    const pr = EN.newRun(C, { seedKey: 'pd', runNo: 1, ace: 'hall' }); EN.choose(pr, C, EN.bargainPolicy(pr, C));
    const f = EN.startFight(pr, C, {}); let g = 0; while (!f.duel.over && g++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } });
    const res = EN.finishFight(pr, C);
    ok(res.win && res.offer.prologue && pr.drops.length === 1 && pr.drops[0] === C.enemies.man.drop, 'prologue man drop (in his deck since 11-13) is a customer drop', pr.drops);
    const t = EN.choose(pr, C, { type: 'take', cardId: res.offer.cards[0] });
    ok(t.ok && pr.entered.includes(res.offer.cards[0]), 'but taking it = entered the bag'); }
  // (d) 一趟留一張：候選＝entered＋drops，擁有的、頂點卡不列；只在結束後、只能一次；owned 三種形狀
  { const run = EN.newRun(C, { seedKey: 'keep', runNo: 2, ace: 'heresy', seeds: [free[5]] });
    EN.choose(run, C, EN.bargainPolicy(run, C));
    for (let k = 0; k < 6; k++) { forceWin(run); settleAll(run); }
    run.drops.push(C.aces.hall);                                  // 頂點卡不列（理論上不會進來；保險）
    const all = EN.keepCandidates(run, C, null);
    ok(all.length >= 3 && all.every(id => (run.entered.includes(id) || run.drops.includes(id)) && !C.cards[id].tier) && new Set(all).size === all.length, 'candidates = entered ∪ drops, no apex, no dupes', all);
    ok(!all.includes(free[5]) || run.entered.includes(free[5]) || run.drops.includes(free[5]), 'seed not a candidate unless it re-entered');
    ok(G.heresy.every(id => !all.includes(id) || run.drops.includes(id)), 'gifts are not candidates (unless dropped)');
    const own = [all[0]];
    eq(EN.keepCandidates(run, C, own), all.slice(1), 'owned (array) not listed');
    eq(EN.keepCandidates(run, C, id => id === all[0]), all.slice(1), 'owned (fn) not listed');
    eq(EN.keepCandidates(run, C, { [all[0]]: { own: true }, [all[1]]: { own: false, at: 'x' } }), all.slice(1), 'owned (shelf map: .own) not listed');
    ok(EN.keepOne(run, C, all[1], own).error === 'notOver', 'keepOne only after the run is over');
    run.over = 'dead';
    ok(EN.keepOne(run, C, all[0], own).error === 'notOffered', 'owned → notOffered');
    ok(EN.keepOne(run, C, C.aces.hall, own).error === 'notOffered', 'apex → notOffered');
    ok(EN.keepOne(run, C, 'nope', own).error === 'notOffered', 'unknown → notOffered');
    const k1 = EN.keepOne(run, C, all[1], own);
    ok(k1.ok && run.kept === all[1] && EN.runSummary(run).kept === all[1], 'keepOne → run.kept', k1);
    ok(EN.keepOne(run, C, all[2], own).error === 'kept' && run.kept === all[1], 'only once');
    const js = JSON.parse(JSON.stringify(run)); ok(js.kept === all[1] && Array.isArray(js.entered) && Array.isArray(js.drops), 'records survive JSON'); }
  // (e) 舊的 run（沒有 seeds／gifts／entered／drops）照舊能玩：isGift 看那組四張、記錄自己補
  { const run = EN.newRun(C, { seedKey: 'old', runNo: 2, ace: 'hall' }); delete run.seeds; delete run.gifts; delete run.entered; delete run.drops; delete run.kept;
    EN.choose(run, C, EN.bargainPolicy(run, C));
    ok(G.hall.every(id => EN.isGift(run, C, id)) && !EN.isSeed(run, C, G.hall[0]) && Array.isArray(run.entered) && run.entered.length === 3, 'old run: gifts by content, entered created on the fly');
    forceWin(run); ok(Array.isArray(run.drops), 'old run: drops created on the fly'); settleAll(run);
    eq(EN.keepCandidates(run, C, []).length > 0, true, 'old run has candidates'); }
  // (f) 自動遊玩挑種子：照最高星（峰值），同星看總星、再看 id；頂點卡不挑
  { const pool = free.slice(0, 40).concat([C.aces.pearl]);
    const want = pool.filter(id => !C.cards[id].tier).sort((a, b) => EN.peak(C.cards[b]) - EN.peak(C.cards[a]) || EN.power(C.cards[b]) - EN.power(C.cards[a]) || (a < b ? -1 : 1)).slice(0, 3);
    eq(EN.seedPolicy(C, pool), want, 'seedPolicy = top 3 by peak');
    eq(EN.seedPolicy(C, pool, 1), want.slice(0, 1), 'seedPolicy n');
    eq(EN.seedPolicy(C, [free[0]]), [free[0]], 'fewer than 3 owned → fewer seeds');
    eq(EN.seedPolicy(C, [C.aces.hall]), [], 'apex only → none'); }
  // (g) bossAceFor ＝ newRun 的藏家王牌（存檔遷移用）
  { let bad = 0; for (let s = 0; s < 300; s++) for (const ace of TIERS) { const k = 'ba' + s, n = 1 + s % 5; if (EN.newRun(C, { seedKey: k, runNo: n, ace }).bossAce !== EN.bossAceFor(k, n, ace)) bad++; }
    ok(bad === 0, 'bossAceFor matches newRun', bad); }
});

section('18 換王牌（店主 11-13：開局沿用上次那張、跟老闆說才換）：時機（第 1 位開打前；序章那一趟＝序章打完後）、包包組成（原位換、跳過已有的、不夠就少）、藏家王牌重抽、錯的不改 run', () => {
  const G = C.gifts, NON = Object.keys(C.cards).filter(id => !C.cards[id].tier).sort();
  const free = NON.filter(id => !Object.values(G).flat().includes(id) && !C.bargain.pool.includes(id));
  const forceLose = run => { const f = EN.startFight(run, C, {}); let g = 0; while (!f.duel.over && g++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'countered', toE: 0, toP: 99 } }); return EN.finishFight(run, C); };
  const untouched = (run, fn, err, name) => { const before = JSON.stringify(run), r = fn(); ok(!r.ok && r.error === err && JSON.stringify(run) === before && Array.isArray(r.effects) && !r.effects.length, name, r); };
  // (a) 第二趟起（沒有序章）：開局就能換；特價箱挑完也能換；包包裡送的四張原位換成新那組、特價箱三張不動；收了幾張不變；王牌本身算送的
  for (const from of TIERS) for (const to of TIERS) {
    if (from === to) continue;
    const run = EN.newRun(C, { seedKey: 'sw-' + from + to, runNo: 2, ace: from });
    ok(EN.canSwitchAce(run, C), from + '→' + to + ': can switch before the bargain pick');
    EN.choose(run, C, EN.bargainPolicy(run, C));
    const bp = run.bag.slice(4), taken = run.taken, rng0 = run.rng, money = run.money;
    ok(EN.canSwitchAce(run, C) && EN.canSwitchAce(run), from + '→' + to + ': can switch after the bargain pick (content optional)');
    const r = EN.switchAce(run, C, to);
    ok(r.ok && run.ace === to, from + '→' + to + ': ok', r);
    eq(run.bag, G[to].concat(bp), from + '→' + to + ': bag = new gifts (same slots) + bargain 3');
    eq(run.gifts, G[to], from + '→' + to + ': run.gifts = new set');
    ok(run.taken === taken && run.rng === rng0 && run.money === money && run.pos === 1 && !run.pending && !run.duel, from + '→' + to + ': taken / rng / money / pos untouched');
    eq(r.effects[0], { ace: to, from }, from + '→' + to + ': first effect {ace, from}');
    ok(r.effects.filter(e => e.loseCard).length === 4 && r.effects.filter(e => e.gainCard).length === 4, from + '→' + to + ': 4 lose + 4 gain effects');
    ok(G[to].every(id => EN.isGift(run, C, id)) && EN.isGift(run, C, C.aces[to]) && !EN.isGift(run, C, C.aces[from]) && G[from].every(id => !EN.isGift(run, C, id)), from + '→' + to + ': isGift follows the new set');
    ok(run.bossAce !== run.ace && TIERS.includes(run.bossAce), from + '→' + to + ': boss ace differs from yours');
    ok(Object.values(run.shop.bins).flat().every(id => !run.bag.includes(id)) && run.shop.bargain.every(id => !run.bag.includes(id)), from + '→' + to + ': shop does not sell what is in the bag');
    const back = EN.switchAce(run, C, from);
    ok(back.ok && run.ace === from, from + '→' + to + '→' + from + ': switching back is allowed');
    eq(run.bag, G[from].concat(bp), from + '→' + to + '→' + from + ': original bag again');
    const js = JSON.parse(JSON.stringify(run)); ok(EN.canSwitchAce(js, C) && js.ace === from, 'state survives JSON');
  }
  // (b) 種子：種子不動、送的那幾格換；新那組跟包包裡已有的（種子、買的）重複就跳過，往下補；不夠就少（包包變小、收了幾張跟著少）
  { const sd = [free[2], free[9]];
    const run = EN.newRun(C, { seedKey: 'sw-seed', runNo: 3, ace: 'hall', seeds: sd });
    EN.choose(run, C, EN.bargainPolicy(run, C));
    const bp = run.bag.slice(4);
    ok(EN.switchAce(run, C, 'heresy').ok, 'seeded run: switch ok');
    eq(run.bag, sd.concat(G.heresy.slice(0, 2), bp), 'seeded run: seeds stay, the 2 gift slots get the first 2 of the new set');
    eq([run.seeds, run.gifts], [sd, G.heresy.slice(0, 2)], 'seeded run: run.seeds untouched, run.gifts = placed ones'); }
  { const run = EN.newRun(C, { seedKey: 'sw-dup', runNo: 3, ace: 'hall', seeds: [G.pearl[0]] });   // 拿 pearl 那組的第一張當種子
    EN.choose(run, C, EN.bargainPolicy(run, C));
    const bp = run.bag.slice(4);
    ok(EN.switchAce(run, C, 'pearl').ok, 'dup: switch ok');
    eq(run.bag, [G.pearl[0], G.pearl[1], G.pearl[2], G.pearl[3]].concat(bp), 'dup: the seed already holds pearl[0] → gifts skip it and fill the rest');
    eq(run.gifts, G.pearl.slice(1), 'dup: run.gifts excludes the seed');
    ok(EN.isSeed(run, C, G.pearl[0]), 'dup: the seed is still a seed'); }
  { const run = EN.newRun(C, { seedKey: 'sw-few', runNo: 3, ace: 'hall', seeds: [G.pearl[0]] });
    EN.choose(run, C, EN.bargainPolicy(run, C));
    run.bag.push(G.pearl[1]); run.bag.push(G.pearl[2]); run.taken += 2;            // 像是買來的
    const taken = run.taken, n0 = run.bag.length;
    ok(EN.switchAce(run, C, 'pearl').ok, 'few: switch ok');
    ok(run.bag.length === n0 - 2 && run.bag.filter(id => G.pearl.includes(id)).length === 4 && new Set(run.bag).size === run.bag.length, 'few: only pearl[3] is new → 3 gift slots become 1, no duplicates', run.bag);
    eq(run.gifts, [G.pearl[3]], 'few: run.gifts = the one placed');
    ok(run.taken === taken - 2, 'few: taken shrinks with the bag');
    ok(EN.switchAce(run, C, 'hall').ok && run.bag.filter(id => G.hall.includes(id)).length === 1, 'few: switching back only fills the slots that are left'); }
  // (c) 店裡擺著的新禮物下架（不會再買到包包裡已有的）
  { const run = EN.newRun(C, { seedKey: 'sw-shop', runNo: 2, ace: 'hall' });
    EN.choose(run, C, EN.bargainPolicy(run, C));
    const key = Object.keys(run.shop.bins).find(k => run.shop.bins[k].length);
    run.shop.bins[key].push(G.heresy[2]);
    ok(EN.switchAce(run, C, 'heresy').ok && !run.shop.bins[key].includes(G.heresy[2]) && run.bag.includes(G.heresy[2]), 'new gift on the shelf is taken off'); }
  // (d) 藏家王牌撞到新王牌：照 bossAceFor 重抽（雜湊，不碰 run.rng）；沒撞到就不動
  { let hit = 0, miss = 0;
    for (let s = 0; s < 60; s++) for (const ace of TIERS) {
      const run = EN.newRun(C, { seedKey: 'sw-boss' + s, runNo: 2, ace }), boss = run.bossAce, rng0 = run.rng;
      const to = s % 2 ? boss : TIERS.find(t => t !== ace && t !== boss);
      ok(EN.switchAce(run, C, to).ok, 'boss: switch ok');
      if (to === boss) { hit++; ok(run.bossAce === EN.bossAceFor(run.seedKey, run.runNo, to) && run.bossAce !== to && run.rng === rng0, 'boss = new ace → re-drawn by hash', [boss, to, run.bossAce]); }
      else { miss++; ok(run.bossAce === boss, 'boss ≠ new ace → unchanged'); }
    }
    ok(hit > 0 && miss > 0, 'boss: both branches covered', [hit, miss]); }
  // (e) 序章那一趟：序章還沒打 → 不行；打完、撿到的那張收好之後（第 1 位開打前）→ 可以；撿到的那張（男子掉的）不動
  { const run = EN.newRun(C, { seedKey: 'sw-pro', runNo: 1, ace: 'pearl' });
    ok(run.prologue === 'pending' && !EN.canSwitchAce(run, C), 'prologue pending → cannot switch');
    untouched(run, () => EN.switchAce(run, C, 'hall'), 'notNow', 'prologue pending → notNow, run untouched');
    EN.choose(run, C, EN.bargainPolicy(run, C));
    forceWin(run);
    ok(run.pending && run.pending.prologue && !EN.canSwitchAce(run, C), 'prologue reward pending → cannot switch');
    settleAll(run);
    const drop = C.enemies.man.drop, extra = run.bag.slice(4);
    ok(run.prologue === 'done' && run.pos === 1 && EN.canSwitchAce(run, C), 'prologue done, before guest 1 → can switch');
    ok(EN.switchAce(run, C, 'hall').ok, 'prologue run: switch ok');
    eq(run.bag, G.hall.concat(extra), 'prologue run: gifts swapped; bargain + the dropped card stay');
    ok(!drop || run.bag.includes(drop) || !extra.includes(drop), 'the dropped card stays in the bag'); }
  // (f) 不合法：同一張、不存在的王牌、對決中、打過第 1 位（贏了、輸了說情、說情後回到第 1 位、舊存檔沒有 fought）、這一趟結束 → 失敗、run 不動
  { const run = EN.newRun(C, { seedKey: 'sw-bad', runNo: 2, ace: 'hall' });
    EN.choose(run, C, EN.bargainPolicy(run, C));
    untouched(run, () => EN.switchAce(run, C, 'hall'), 'same', 'same ace → same');
    untouched(run, () => EN.switchAce(run, C, 'nope'), 'badAce', 'unknown tier → badAce');
    untouched(run, () => EN.switchAce(run, C, null), 'badAce', 'null tier → badAce');
    ok(EN.switchAce(null, C, 'pearl').error === 'badAce' && !EN.canSwitchAce(null, C), 'no run');
    EN.startFight(run, C, {});
    ok(run.fought === true && !EN.canSwitchAce(run, C), 'duel in progress → cannot switch');
    untouched(run, () => EN.switchAce(run, C, 'pearl'), 'notNow', 'duel in progress → notNow');
    run.duel = null; run.duelEnemy = null;
    ok(!EN.canSwitchAce(run, C), 'fight started at pos 1 (fought) → cannot switch even with no duel'); }
  { const run = EN.newRun(C, { seedKey: 'sw-lose', runNo: 2, ace: 'pearl' });
    EN.choose(run, C, EN.bargainPolicy(run, C));
    const r = forceLose(run);
    ok(!r.win && run.pending && run.pending.type === 'retry', 'lost guest 1 → retry pending');
    untouched(run, () => EN.switchAce(run, C, 'hall'), 'notNow', 'retry pending → notNow');
    EN.choose(run, C, { type: 'retry' });
    ok(run.pos === 1 && !run.pending && !run.duel && !EN.canSwitchAce(run, C), 'after 說情, back at pos 1 → still cannot switch');
    delete run.fought;
    ok(!EN.canSwitchAce(run, C) && EN.switchAce(run, C, 'hall').error === 'notNow', 'old save without fought: 說情 used → cannot switch'); }
  { const run = EN.newRun(C, { seedKey: 'sw-win', runNo: 2, ace: 'heresy' });
    EN.choose(run, C, EN.bargainPolicy(run, C));
    forceWin(run);
    untouched(run, () => EN.switchAce(run, C, 'hall'), 'notNow', 'won guest 1, reward pending → notNow');
    settleAll(run);
    ok(run.pos === 2 && !EN.canSwitchAce(run, C), 'pos 2 → cannot switch');
    untouched(run, () => EN.switchAce(run, C, 'hall'), 'notNow', 'pos 2 → notNow');
    run.over = 'dead'; run.pos = 1;
    ok(!EN.canSwitchAce(run, C), 'run over → cannot switch'); }
  // (g) 自動遊玩不換：runPolicy／shopPolicy 從不給 switchAce（choose 不認得這個 type）
  { const run = EN.newRun(C, { seedKey: 'sw-auto', runNo: 2, ace: 'hall' });
    ok(EN.choose(run, C, { type: 'switchAce', tier: 'pearl' }).error === 'badChoice' && run.ace === 'hall', 'choose has no switchAce (autoplay never switches)'); }
});

section('19 收音機轉頻率（v5 第六項第二期）：時機（canShop、每輪一次）、抽卡池（非頂點∩那格∩普通／稀有／獨特−包包−這輪已上架−特價箱）、獨立種子、抽不到、電台那張照原價（沒有套利）、存檔遷移、頻率不進規則', () => {
  const cells = C.tunes.order;
  const untouched = (run, fn, err, name) => { const before = JSON.stringify(run), r = fn(); ok(!r.ok && r.error === err && JSON.stringify(run) === before && Array.isArray(r.effects) && !r.effects.length, name, r); };
  const fresh = (seedKey, ace) => { const run = EN.newRun(C, { seedKey, runNo: 2, ace: ace || 'hall' }); EN.choose(run, C, EN.bargainPolicy(run, C)); return run; };
  const SHELF = new Set(EN.SHELF_RARITY);
  const expectPool = (run, cell) => {
    const SH = run.shop, shelf = new Set([].concat(...Object.values(SH.bins), SH.bargain, C.bargain.pool, C.bargain.retired || []));   // 店主 11-16：換下的舊特價箱（retired）也不抽
    return Object.keys(C.cards).sort().filter(id => { const c = C.cards[id]; return !c.tier && c.tune === cell && SHELF.has(EN.rarity(c)) && !run.bag.includes(id) && !shelf.has(id); });
  };
  // (a) 時機：第 1 位之前還沒挑特價箱 → notNow；挑完 → 可以轉；對決中、等領獎、這一趟結束 → notNow
  { const run = EN.newRun(C, { seedKey: 'rd-time', runNo: 2, ace: 'hall' });
    ok(!EN.canShop(run) && !EN.canRadio(run), 'before the bargain pick → cannot spin');
    untouched(run, () => EN.choose(run, C, { type: 'radio', cell: 'calm' }), 'notNow', 'radio before the bargain pick → notNow');
    EN.choose(run, C, EN.bargainPolicy(run, C));
    ok(EN.canShop(run) && EN.canRadio(run) && run.shop.radio === null, 'after the pick: canRadio, shop.radio null');
    untouched(run, () => EN.choose(run, C, { type: 'radio', cell: 'nope' }), 'badCell', 'unknown cell → badCell');
    untouched(run, () => EN.choose(run, C, { type: 'radio' }), 'badCell', 'no cell → badCell');
    EN.startFight(run, C, {});
    untouched(run, () => EN.choose(run, C, { type: 'radio', cell: 'calm' }), 'notNow', 'duel in progress → notNow');
    run.duel = null; run.duelEnemy = null;
    const r2 = fresh('rd-time2'); forceWin(r2);
    ok(r2.pending && !EN.canRadio(r2), 'reward pending → cannot spin');
    untouched(r2, () => EN.choose(r2, C, { type: 'radio', cell: 'calm' }), 'notNow', 'reward pending → notNow');
    const r3 = fresh('rd-time3'); r3.over = 'dead';
    untouched(r3, () => EN.choose(r3, C, { type: 'radio', cell: 'calm' }), 'notNow', 'run over → notNow'); }
  // (b) 抽卡池＝契約（200 種子 × 八格）；轉一次：放進特價箱第一格、記 shop.radio、其他都不動、不碰 run.rng；同種子同格＝同一張
  let spins = 0, sizes = {};
  for (let i = 0; i < (QUICK ? 40 : 200); i++) {
    const run = fresh('rd-' + i, TIERS[i % 3]);
    for (const cell of cells) {
      const pool = EN.radioPool(run, C, cell);
      eq(pool, expectPool(run, cell), 'radioPool contract ' + cell + ' #' + i);
      sizes[cell] = Math.min(sizes[cell] == null ? 1e9 : sizes[cell], pool.length);
    }
    const cell = cells[i % cells.length], pool = EN.radioPool(run, C, cell);
    if (!pool.length) continue;
    const before = JSON.parse(JSON.stringify(run)), twin = JSON.parse(JSON.stringify(run));
    const res = EN.choose(run, C, { type: 'radio', cell });
    ok(res.ok && res.effects.length === 1 && res.effects[0].radio === cell && pool.includes(res.effects[0].card), 'radio ok, effect {radio, card} from the pool', res);
    const id = res.effects[0].card;
    ok(run.shop.radio && run.shop.radio.cell === cell && run.shop.radio.id === id, 'shop.radio = {cell, id}');
    eq(run.shop.bargain, [id].concat(before.shop.bargain), 'radio card goes first into the bargain bin');
    eq([run.rng, run.bag, run.money, run.shop.bins, run.shop.relics, run.pos, run.taken], [before.rng, before.bag, before.money, before.shop.bins, before.shop.relics, before.pos, before.taken], 'radio changes nothing else (run.rng untouched)');
    ok(C.cards[id].tune === cell && !C.cards[id].tier && SHELF.has(EN.rarity(C.cards[id])), 'radio card: that cell, not apex, shelf rarity');
    twin.rng = (twin.rng + 12345) >>> 0;
    ok(EN.choose(twin, C, { type: 'radio', cell }).effects[0].card === id, 'independent seed: same card whatever run.rng is');
    ok(!EN.canRadio(run), 'spun → canRadio false');
    for (const c2 of cells) untouched(run, () => EN.choose(run, C, { type: 'radio', cell: c2 }), 'used', 'second spin this round (' + c2 + ') → used');
    spins++;
  }
  ok(spins > 100 || QUICK, 'spun in most seeds', spins);
  ok(cells.every(c => sizes[c] > 0), 'every cell has at least one card to draw on a fresh run', sizes);
  // (c) 電台那張照原價：bargainPriceIn＝priceOf（稀有度價 800–1,200）；其他照特價；買進再賣回一定虧（沒有套利）
  { let arb = 0, checked = 0;
    for (const id of Object.keys(C.cards)) { const c = C.cards[id]; if (c.tier || !SHELF.has(EN.rarity(c))) continue; checked++; if (EN.sellValue(C, c) > EN.bargainPriceOf(C, c)) arb++; }
    ok(arb > 0, 'why: with the bargain price (≤$300) some radio cards would sell back for more', arb + '/' + checked);
    const run = fresh('rd-price'), cell = cells.find(k => EN.radioPool(run, C, k).length);
    EN.choose(run, C, { type: 'radio', cell });
    const id = run.shop.radio.id, other = run.shop.bargain.find(x => x !== id), P = EN.priceOf(C, id);
    ok(P === C.economy.price[EN.rarity(C.cards[id])] && P >= 800 && P <= 1200, 'radio card price = price[rarity]', P);
    eq([EN.bargainPriceIn(run, C, id), EN.bargainPriceIn(run, C, other)], [P, EN.bargainPriceOf(C, other)], 'bargainPriceIn: radio card full price, others bargain price');
    ok(EN.sellValue(C, C.cards[id]) < P, 'sell back < buy (no arbitrage)', [EN.sellValue(C, C.cards[id]), P]);
    // 買：錢不夠一塊 → noMoney；剛好夠 → 扣原價；連同特價箱的另一張一起買 → 兩個價分開算
    { const r2 = JSON.parse(JSON.stringify(run)); r2.bag = r2.bag.slice(0, 4); r2.money = P - 1; untouched(r2, () => EN.choose(r2, C, { type: 'buyBargain', ids: [id] }), 'noMoney', 'radio card short by 1 → noMoney'); }
    { const r2 = JSON.parse(JSON.stringify(run)); r2.bag = r2.bag.slice(0, 4); r2.money = P; const res = EN.choose(r2, C, { type: 'buyBargain', ids: [id] });
      ok(res.ok && r2.money === 0 && r2.bag.includes(id) && !r2.shop.bargain.includes(id) && res.effects[0].spend === P, 'buy radio card at full price', res);
      // 賣回（第 A 波 5：去櫃檯賣給老闆）：拿回半價
      r2.money = 5000; while (r2.bag.length < 8) r2.bag.push(Object.keys(C.cards).find(x => !C.cards[x].tier && !r2.bag.includes(x) && x !== id));
      const m = r2.money, rs = EN.choose(r2, C, { type: 'sell', cardId: id });
      ok(rs.ok && r2.money === m + P / 2 && rs.effects[0].earn === P / 2 && !rs.effects[0].reclaim, 'radio card sells back at half (P/2) at the counter', rs); }
    { const r2 = JSON.parse(JSON.stringify(run)); r2.bag = r2.bag.slice(0, 4); r2.money = 99999; const each = [P, EN.bargainPriceOf(C, other)];
      const res = EN.choose(r2, C, { type: 'buyBargain', ids: [id, other] });
      ok(res.ok && r2.money === 99999 - each[0] - each[1] && res.effects.map(f => f.spend).join() === each.join(), 'radio + bargain card: each priced on its own', res); } }
  // (d) 抽不到：那格能抽的都已經上架 → empty，什麼都不改、不算轉過
  { const run = fresh('rd-empty'), cell = cells.slice().sort((a, b) => EN.radioPool(run, C, a).length - EN.radioPool(run, C, b).length)[0];
    run.shop.bins.jazz = (run.shop.bins.jazz || []).concat(EN.radioPool(run, C, cell));
    ok(EN.radioPool(run, C, cell).length === 0, 'all of ' + cell + ' shelved → empty pool');
    untouched(run, () => EN.choose(run, C, { type: 'radio', cell }), 'empty', 'empty cell → empty');
    ok(EN.canRadio(run), 'an empty cell does not use up this round');
    const c2 = cells.find(k => EN.radioPool(run, C, k).length);
    ok(EN.choose(run, C, { type: 'radio', cell: c2 }).ok, 'another cell still works'); }
  // (e) 每輪一次：同一輪打下一位還是 used；新一輪（restock）清掉、電台那張跟特價箱一起換掉、又可以轉
  { const run = fresh('rd-round'), cell = cells.find(k => EN.radioPool(run, C, k).length);
    EN.choose(run, C, { type: 'radio', cell }); const id = run.shop.radio.id;
    forceWin(run); settleAll(run);
    ok(run.pos === 2 && run.round === 1 && EN.canShop(run) && !EN.canRadio(run), 'pos 2 same round → still used');
    untouched(run, () => EN.choose(run, C, { type: 'radio', cell }), 'used', 'pos 2 same round → used');
    let g = 0; while (run.round === 1 && !run.over && g++ < 20) { forceWin(run); settleAll(run); }
    ok(run.round === 2 && run.idx === 0, 'reached round 2', [run.round, run.idx]);
    ok(run.shop.radio === null && EN.canRadio(run) && !run.shop.bargain.includes(id), 'new round: radio cleared, last radio card gone with the bargain restock');
    ok(EN.choose(run, C, { type: 'radio', cell }).ok, 'new round → can spin again'); }
  // (f) 存檔：JSON 存讀（轉過的）一樣；舊存檔沒有 shop.radio＝這輪還沒轉；fixBins 補的區不上電台那張
  { const run = fresh('rd-save'), cell = cells.find(k => EN.radioPool(run, C, k).length);
    const old = JSON.parse(JSON.stringify(run)); delete old.shop.radio;
    ok(EN.canRadio(old) && EN.bargainPriceIn(old, C, old.shop.bargain[0]) === EN.bargainPriceOf(C, old.shop.bargain[0]), 'old save without shop.radio → not spun yet, bargain prices unchanged');
    const r1 = EN.choose(old, C, { type: 'radio', cell }), r0 = EN.choose(run, C, { type: 'radio', cell });
    ok(r1.ok && r0.ok && r1.effects[0].card === r0.effects[0].card, 'old save spins the same card');
    const back = JSON.parse(JSON.stringify(run));
    ok(!EN.canRadio(back) && EN.choose(back, C, { type: 'radio', cell }).error === 'used' && EN.bargainPriceIn(back, C, back.shop.radio.id) === EN.priceOf(C, back.shop.radio.id), 'JSON round trip keeps the spin and the full price');
    const fx = JSON.parse(JSON.stringify(run)), id = fx.shop.radio.id, key = Object.keys(fx.shop.bins).find(k => C.bins[k] && (C.bins[k].pool || []).includes(id));
    if (key) { delete fx.shop.bins[key]; EN.fixBins(fx, C); ok(Array.isArray(fx.shop.bins[key]) && !fx.shop.bins[key].includes(id), 'fixBins refill never re-shelves the radio card'); }
    else ok(true, 'radio card is in no bin pool (fixBins n/a)'); }
  // (g) 頻率不進戰鬥規則：對決／勝負／星數的函式不讀 tune；自動遊玩（shopPolicy）不轉收音機
  for (const fn of [EN.clash, EN.preview, EN.resolveTurn, EN.startDuel, EN.enemyDef, EN.playerDef, EN.view, EN.trialDeck, EN.finishFight, EN.startFight])
    ok(!/tune/.test(String(fn)), 'no tune in ' + fn.name);
  { const run = fresh('rd-pol'); ok(EN.shopPolicy(run, C, 'smart').every(ch => ch.type !== 'radio'), 'shopPolicy never spins the radio'); }
});

section('20 頂點卡純輔助卡試做（?apex=1）：名單與能力、旗標關＝舊行為、每個原語的數字、時機（這手／整場／留著）、一場一次、發動不取亂數、preview＝resolve、存讀檔、run.aceId／換王牌、打贏回 4、策略', () => {
  const AT = C.apexTrial, NOTES = { notes: AT.notes, holdNotes: AT.holdNotes };
  // (a) 名單：三派各 15 張、第 1 張＝C.aces、卡存在而且 tier 對、能力 id 全表唯一；abilityOf／apexList；C.apexTrialOnly＝42 張
  const seen = new Set();
  for (const t of TIERS) {
    const L = EN.apexList(C, t);
    ok(L.length === 15 && L[0].card === C.aces[t], t + ': 15 cards, first = C.aces', L.length);
    for (const x of L) {
      ok(C.cards[x.card] && C.cards[x.card].tier === t, t + ': ' + x.card + ' exists with tier');
      ok(!seen.has(x.id), 'ability id unique ' + x.id); seen.add(x.id);
      const A = EN.abilityOf(C, x.card);
      ok(A && A.id === x.id && A.tier === t && A.op === x.op && A.timing === x.timing && JSON.stringify(A.params) === JSON.stringify(x.params), 'abilityOf ' + x.card);
      ok(!EN.canSeed(C, x.card) && EN.rarity(C.cards[x.card]) === 'apex', x.card + ': not a seed, rarity apex');
    }
  }
  ok(C.apexTrialOnly.length === 42 && C.apexTrialOnly.every(id => !Object.values(C.aces).includes(id)), 'apexTrialOnly = 42 non-default');
  const pool = new Set(Object.values(C.bins).flatMap(b => b.pool || []));
  ok(C.apexTrialOnly.every(id => !pool.has(id)) && Object.values(C.enemies).every(e => C.apexTrialOnly.every(id => !e.deck.includes(id))), 'new apex cards are in no bin, no guest deck');
  eq(apexProblems(C, EN), [], 'check-content apexProblems clean');
  const mut = f => { const D = JSON.parse(JSON.stringify(AT)); f(D); return apexProblems(Object.assign({}, C, { apexTrial: D }), EN).length; };
  ok(mut(D => { D.hall[7].params.n = 2; }) && mut(D => { D.hall[1].params.n = 2; }) && mut(D => { D.hall[5].timing = 'duel'; }) && mut(D => { D.heresy[3].text = '這場必中。'; })
    && mut(D => { D.pearl[0].card = C.aces.heresy; }) && mut(D => { D.hall[8].hold = { op: 'eStar', params: { n: 1 } }; }) && mut(D => { delete D.notes.bounce; }) && mut(D => { D.hall[2].hold = { op: 'shield', params: { n: 1 } }; }),
    'apexProblems catches +2 星／整場比星多算 2／整場他少 1 星／禁區字／換掉預設那張／留著用大效果／少結果句／非留著型帶 hold');
  ok(EN.abilityOf(C, 'no-such-card') === null && EN.apexList(C, 'nope').length === 0 && EN.apexList(Object.assign({}, C, { apexTrial: undefined }), 'hall').length === 0, 'abilityOf/apexList of nothing');

  // (b) 旗標關＝舊行為：run 有 aceId 也不讀；duel 沒有 apexMode 等欄位；王牌照舊能丟、7 星；同一趟有沒有 aceId 事件一模一樣；playerDef 沒有 ability
  for (const t of TIERS) {
    const id2 = EN.apexList(C, t)[3].card;
    const ra = EN.newRun(C, { seedKey: 'apx-off-' + t, runNo: 2, ace: t, prologue: false, aceId: id2 }), rb = EN.newRun(C, { seedKey: 'apx-off-' + t, runNo: 2, ace: t, prologue: false });
    ok(ra.aceId === id2 && !('aceId' in rb), t + ': newRun keeps a valid aceId (only when given)');
    const pa = EN.playerDef(C, ra), pb = EN.playerDef(C, rb);
    ok(!('ability' in pa) && !('apexText' in pa) && pa.ace.id === C.aces[t] && JSON.stringify(pa) === JSON.stringify(pb), t + ': playerDef without the flag ignores aceId');
    EN.choose(ra, C, EN.bargainPolicy(ra, C)); EN.choose(rb, C, EN.bargainPolicy(rb, C));
    const fa = EN.startFight(ra, C, {}), fb = EN.startFight(rb, C, { apex: false });
    ok(!('apexMode' in fa.duel) && !('ability' in fa.duel.p) && !('apexOn' in fa.duel.p) && !('apexAt' in fa.duel.stats), t + ': flag off → no apex keys in the duel');
    ok(EN.legalActions(fa.duel).some(a => a.ace) && EN.view(fa.duel).ace && EN.view(fa.duel).ace.id === C.aces[t] && !('apex' in EN.view(fa.duel)), t + ': flag off → ace is playable, view has no apex');
    const ea = play(fa.duel, 'thoughtful', lcg(5)), eb = play(fb.duel, 'thoughtful', lcg(5));
    ok(JSON.stringify(ea) === JSON.stringify(eb) && ea.filter(e => e.t === 'clash').every(e => !('apex' in e)), t + ': same events with or without run.aceId (flag off)');
    const wa = EN.finishFight(ra, C), wb = EN.finishFight(rb, C);
    ok(JSON.stringify(wa) === JSON.stringify(wb) && (!wa.win || wa.heal <= C.trial.heal), t + ': finishFight identical, heal = C.trial.heal');
  }
  ok(EN.playerDef(Object.assign({}, C, { apexTrial: undefined }), { bag: [], ace: 'hall' }, { apex: true }).ability === undefined, 'no content.apexTrial → flag does nothing');

  // 控制好的一場：預設王牌、能力換成要測的；兩邊品味／底氣、配件歸零；他的手牌／提示由測試擺
  const ab = (op, params, timing, hold) => ({ id: 't-' + op, card: C.aces.hall, tier: 'hall', name: '測' + op, text: 'x', timing: timing || 'hand', op, params: params || {}, hold: hold || null });
  function duelWith(A, o = {}) {
    const pDef = EN.playerDef(C, { bag: C.gifts.hall.concat(BP3), ace: 'hall' }, { apex: true });
    if (A) pDef.ability = A;
    const { duel } = EN.startDuel(pDef, EN.enemyDef(C, 'copycat', {}), { apex: true, seed: o.seed || 11, hintTable: HINTS });
    duel.p.atk = o.atk | 0; duel.p.def = o.def | 0; duel.e.atk = o.eAtk | 0; duel.e.def = o.eDef | 0; duel.p.relics = [];
    if (o.hp != null) duel.p.hp = o.hp; if (o.eHp != null) duel.e.hp = o.eHp;
    return duel;
  }
  const fx = (c, o, h) => mkCard('ax-' + c + o + h, c, o, h);
  // 預告：你手牌第 0 格放 card、用 attr 出；他 e＝{attr, star, ace}；hint＝提示那色（拆穿要用）；apex＝假設這手發動
  function pv(d, card, attr, e, o = {}) { d.p.hand[0] = card; if (o.hint) d.plan.hint.attr = o.hint; return EN.preview(d, o.apex ? { i: 0, attr, apex: true } : { i: 0, attr }, e); }
  const kv = r => [r.kind, r.toE, r.toP];
  const apexNote = r => (r.notes || []).find(n => n.apex);

  // (c) 每個原語（數字精確；先看沒發動、再看假設發動）
  { const d = duelWith(ab('star', { n: 1 }));                                    // ① 這手 +1 星：同色、剋不動門檻兩邊都動
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 3 })), ['tie', 0, 0], 'star: base tie');
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 3 }, { apex: true })), ['mirrorWin', 1, 0], 'star: +1 → mirrorWin 1');
    eq(kv(pv(d, fx(1, 1, 3), 'h', { attr: 'o', star: 5 })), ['mirrorLose', 0, 2], 'star: base h3 vs o5 blocked');
    const r = pv(d, fx(1, 1, 3), 'h', { attr: 'o', star: 5 }, { apex: true });
    eq(kv(r), ['counter', 4, 0], 'star: h4 vs o5 → counter 4');
    eq([r.apex.d, r.apex.pStar, apexNote(r).text], [6, 4, '王牌：你 +1 星，多賺 6'], 'star: d = 4 + 2, note');
    eq(kv(pv(d, fx(4, 1, 1), 'c', { attr: 'o', star: 3 }, { apex: true })), ['mirrorWin', 2, 0], 'star: c5 vs o3 → he can no longer counter you'); }
  { const d = duelWith(ab('eStar', { n: 1 }));                                   // ② 他 −1 星（他的王牌 7 也減）
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 4 }, { apex: true })), ['tie', 0, 0], 'eStar: c3 vs c4 → tie');
    eq(kv(pv(d, fx(1, 5, 1), 'o', { attr: 'c', star: 7, ace: true })), ['mirrorLose', 0, 2], 'eStar: base o5 vs his ace c7 blocked');
    const r = pv(d, fx(1, 5, 1), 'o', { attr: 'c', star: 7, ace: true }, { apex: true });
    eq([...kv(r), r.apex.eStar], ['counter', 5, 0, 6], 'eStar: his ace 6 → counter 5');
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 0 }, { apex: true })), ['mirrorWin', 3, 0], 'eStar: never below 0'); }
  { const d = duelWith(ab('pThr', { n: 3 }));                                     // ③ 剋得動門檻 3（只改你剋他）
    eq(kv(pv(d, fx(1, 1, 2), 'h', { attr: 'o', star: 4 })), ['mirrorLose', 0, 2], 'pThr: base h2 vs o4 blocked');
    eq(kv(pv(d, fx(1, 1, 2), 'h', { attr: 'o', star: 4 }, { apex: true })), ['counter', 2, 0], 'pThr: gap 2 < 3 → counter 2');
    eq(kv(pv(d, fx(1, 1, 2), 'h', { attr: 'o', star: 5 }, { apex: true })), ['mirrorLose', 0, 3], 'pThr: gap 3 → still blocked');
    eq(kv(pv(d, fx(4, 1, 1), 'c', { attr: 'o', star: 2 }, { apex: true })), ['mirrorWin', 2, 0], 'pThr: his side unchanged (you 2 higher → he cannot counter)'); }
  { const d = duelWith(ab('theirStar'));                                           // ③ 以小搏大：一律剋得動，扣較大的星
    eq(kv(pv(d, fx(1, 1, 2), 'h', { attr: 'o', star: 5 }, { apex: true })), ['counter', 5, 0], 'theirStar: h2 vs o5 → counter 5');
    eq(kv(pv(d, fx(1, 1, 1), 'c', { attr: 'h', star: 7, ace: true }, { apex: true })), ['counter', 7, 0], 'theirStar: vs his ace 7 → 7');
    eq(kv(pv(d, fx(1, 1, 4), 'h', { attr: 'o', star: 3 }, { apex: true })), ['counter', 4, 0], 'theirStar: your 4 > his 3 → 4');
    const r = pv(d, fx(1, 1, 4), 'h', { attr: 'o', star: 3 }, { apex: true });
    eq([r.apex.hit, apexNote(r).text], [false, '王牌：這手沒碰到，沒作用'], 'theirStar: no gain → none note on the first hand'); }
  { const d = duelWith(ab('mirrorPlus', { n: 2 }));                               // ④ 比星多算 2（含剋不動改比星）
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 4 }, { apex: true })), ['mirrorWin', 1, 0], 'mirrorPlus: c3+2 vs c4');
    const r = pv(d, fx(1, 1, 2), 'h', { attr: 'o', star: 5 }, { apex: true });
    eq([...kv(r), r.blocked, r.apex.d], ['mirrorLose', 0, 1, 'gap', 2], 'mirrorPlus: blocked mirror counts too');
    eq(kv(pv(d, fx(1, 1, 4), 'h', { attr: 'o', star: 3 }, { apex: true })), ['counter', 4, 0], 'mirrorPlus: counter untouched'); }
  { const d = duelWith(ab('loseZero'));                                            // ④ 比星輸了不扣；被剋照扣
    const r = pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 5 }, { apex: true });
    eq([...kv(r), apexNote(r).text], ['mirrorLose', 0, 0, '王牌：比星輸了不扣，少扣 2'], 'loseZero: mirrorLose 2 → 0');
    d.e.atk = 3; eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 5 }, { apex: true })), ['mirrorLose', 0, 0], 'loseZero: his 品味 not added'); d.e.atk = 0;
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'o', star: 4 }, { apex: true })), ['countered', 0, 4], 'loseZero: countered still hurts'); }
  { const d = duelWith(ab('combo', { ops: [{ op: 'counterPlus', params: { n: 1 } }, { op: 'counterMult', params: { mult: 2 } }] }), { atk: 1 });   // ⑥⑦ 品味 → 多扣 → 加倍
    eq(kv(pv(d, fx(1, 1, 4), 'h', { attr: 'o', star: 3 })), ['counter', 5, 0], 'combo base: 4 + 品味 1');
    const r = pv(d, fx(1, 1, 4), 'h', { attr: 'o', star: 3 }, { apex: true });
    eq([...kv(r), r.apex.op, apexNote(r).text], ['counter', 12, 0, 'combo', '王牌：測combo，多賺 7'], 'counterPlus then ×2: (4+1+1)×2 = 12'); }
  { const d = duelWith(ab('counterMult', { mult: 2 }), { eDef: 1 });             // ⑦ 加倍在他的底氣之前
    eq(kv(pv(d, fx(1, 1, 4), 'h', { attr: 'o', star: 3 }, { apex: true })), ['counter', 7, 0], 'counterMult: 8 → half(8, 1) = 7'); }
  { const d = duelWith(ab('crit', { mult: 2 }), { atk: 2 });                      // ⑦ 拆穿：提示 o、他唬你出 c、你出 o 剋中
    let r = pv(d, fx(1, 4, 1), 'o', { attr: 'c', star: 3 }, { hint: 'o', apex: true });
    eq([...kv(r), r.apex.caught, apexNote(r).text], ['counter', 12, 0, true, '王牌：拆穿！多扣 6'], 'crit: (4+2)×2 = 12');
    r = pv(d, fx(1, 1, 4), 'h', { attr: 'o', star: 3 }, { hint: 'o', apex: true });
    eq([...kv(r), r.apex.caught, apexNote(r).text], ['counter', 6, 0, false, '王牌：他這手沒唬你，沒作用'], 'crit: honest counter → no ×2, noneHonest');
    r = pv(d, fx(1, 1, 4), 'h', { attr: 'c', star: 3 }, { hint: 'o', apex: true });
    eq([r.kind, apexNote(r).text], ['countered', '王牌：這手沒碰到，沒作用'], 'crit: he bluffed but you were countered → none'); }
  // 11-17 拆穿＝結果句「你看穿了！」同一個判準（feintOf：看得出來的唬＋剋中），不看藏起來的計畫色
  { const d = duelWith(ab('crit', { mult: 2 }));
    d.plan.hint.kind = 'one'; d.plan.hint.not = null;                                    // 明指 o、第二種唬法（出 COUNTER_OF[o]＝h）、你出 BEATS[o]＝c 剋中
    let r = pv(d, fx(4, 1, 1), 'c', { attr: 'h', star: 3 }, { hint: 'o', apex: true });
    eq([r.kind, r.apex.caught, apexNote(r).text], ['counter', true, '王牌：拆穿！多扣 4'], 'crit: beta bluff (COUNTER_OF[hint]) caught when you counter it');
    d.plan.hint.kind = 'half'; d.plan.hint.not = 'h';                                    // 半指（計畫 o、說不出 h）：他出 c、你出 o 剋中＝他沒說謊（結果句「他照實出」）
    r = pv(d, fx(1, 4, 1), 'o', { attr: 'c', star: 3 }, { hint: 'o', apex: true });
    eq([r.kind, r.toE, r.apex.caught, apexNote(r).text], ['counter', 4, false, '王牌：他這手沒唬你，沒作用'], 'crit: half, he plays a color he did not rule out → not caught');
    d.plan.hint.not = 'c';                                                               // 半指（說不出 c）：他正好出 c、你出 o 剋中＝拆穿
    r = pv(d, fx(1, 4, 1), 'o', { attr: 'c', star: 3 }, { hint: 'o', apex: true });
    eq([r.kind, r.toE, r.apex.caught, apexNote(r).text], ['counter', 8, true, '王牌：拆穿！多扣 4'], 'crit: half, he plays the color he ruled out → caught');
    d.plan.hint.kind = 'none'; d.plan.hint.not = null;                                   // 不露：沒說什麼，剋中也不算拆穿
    r = pv(d, fx(1, 4, 1), 'o', { attr: 'c', star: 3 }, { hint: 'o', apex: true });
    eq([r.kind, r.toE, r.apex.caught, apexNote(r).text], ['counter', 4, false, '王牌：他這手沒唬你，沒作用'], 'crit: none → never caught'); }
  { const d = duelWith(ab('critLeech', { mult: 2 }), { hp: 6, eHp: 12 });         // ⑦⑬ 拆穿回血
    const r = pv(d, fx(1, 4, 1), 'o', { attr: 'c', star: 3 }, { hint: 'o', apex: true });
    eq([...kv(r), r.heal, apexNote(r).text], ['counter', 8, 0, 4, '王牌：拆穿！多扣 4，回 4 聲望'], 'critLeech ×2: 8, heal ⌈8/2⌉ = 4');
    d.e.hp = 3; eq(pv(d, fx(1, 4, 1), 'o', { attr: 'c', star: 3 }, { hint: 'o', apex: true }).heal, 2, 'critLeech: heal counts only what he had (⌈3/2⌉)');
    d.e.hp = 12; d.p.hp = 11; eq(pv(d, fx(1, 4, 1), 'o', { attr: 'c', star: 3 }, { hint: 'o', apex: true }).heal, 1, 'critLeech: heal capped at max'); }
  { const d = duelWith(ab('critLeech', { mult: 1 }), { hp: 6 });
    const r = pv(d, fx(1, 4, 1), 'o', { attr: 'c', star: 3 }, { hint: 'o', apex: true });
    eq([...kv(r), r.heal, apexNote(r).text], ['counter', 4, 0, 2, '王牌：拆穿！回 2 聲望'], 'critLeech ×1: no multiplier, heal 2'); }
  { const d = duelWith(ab('critLeech', { mult: 1 }, 'duel'));                     // 滿聲望（審查 11-16）
    let r = pv(d, fx(1, 4, 1), 'o', { attr: 'c', star: 3 }, { hint: 'o', apex: true }), n = apexNote(r);
    eq([...kv(r), r.heal | 0, r.apex.caught, r.apex.hit, n.text, n.full, n.hit], ['counter', 4, 0, 0, true, false, '王牌：拆穿！聲望是滿的，沒回到', true, false], 'critLeech ×1 at full: caught, no heal, leechFull (not "回 0")');
    const d2 = duelWith(ab('critLeech', { mult: 2 }, 'duel'));
    r = pv(d2, fx(1, 4, 1), 'o', { attr: 'c', star: 3 }, { hint: 'o', apex: true }); n = apexNote(r);
    eq([...kv(r), r.heal | 0, r.apex.hit, n.text, !!n.full], ['counter', 8, 0, 0, true, '王牌：拆穿！多扣 4', false], 'critLeech ×2 at full: crit line without "回 0 聲望"'); }
  { const d = duelWith(ab('bounce', {}), { eAtk: 2 });                             // ⑧ 彈回一半（他品味前）
    let r = pv(d, fx(3, 1, 1), 'c', { attr: 'o', star: 5 }, { apex: true });
    eq([...kv(r), r.apex.d, apexNote(r).text], ['countered', 2, 5, 2, '王牌：彈回去 2'], 'bounce: 5 → he 2, you 3 + 品味 2');
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 5 }, { apex: true })), ['mirrorLose', 0, 4], 'bounce: no lose flag → mirrorLose not bounced');
    d.e.def = 1; r = pv(d, fx(3, 1, 1), 'c', { attr: 'o', star: 5 }, { apex: true }); eq(kv(r), ['countered', 1, 5], 'bounce: his 底氣 still blocks (half(2,1) = 1)'); }
  { const d = duelWith(ab('bounce', { lose: true }, 'duel'));
    eq(kv(pv(d, fx(2, 1, 1), 'c', { attr: 'c', star: 5 }, { apex: true })), ['mirrorLose', 1, 2], 'bounce lose: mirrorLose 3 → he 1, you 2');
    eq(kv(pv(d, fx(1, 1, 1), 'c', { attr: 'o', star: 3 }, { apex: true })), ['countered', 1, 2], 'bounce lose: countered 3 → 1／2'); }
  { const d = duelWith(ab('shield', { n: 2 }), { def: 1 });                       // ⑫ 被剋少扣（底氣之後、最少扣 1）
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'o', star: 5 }, { apex: true })), ['countered', 0, 2], 'shield 2: half(5,1)=4 → 2');
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'o', star: 2 }, { apex: true })), ['countered', 0, 1], 'shield 2: 2 → 1 (min 1)');
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 5 }, { apex: true })), ['mirrorLose', 0, 1], 'shield: mirrorLose untouched (half(2,1) = 1)'); }
  { const d = duelWith(ab('halfIn'));
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'o', star: 5 }, { apex: true })), ['countered', 0, 3], 'halfIn: ⌈5/2⌉ = 3'); }
  { const d = duelWith(ab('tieWin', { n: 1 }));
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 3 }, { apex: true })), ['tie', 1, 0], 'tieWin: same colour same stars → he −1'); }
  // FRAME 1.4 跟配件交錯的順序（審查 11-16：duelWith 把配件清掉了，這幾條原本沒鎖住）
  const withRelics = (d, ids) => { d.p.relics = ids.map(id => EN.relicObj(id, C)); d.p.dustUsed = false; return d; };
  const relicNote = (r, id) => (r.notes || []).some(n => n.relic === id);
  { const d = withRelics(duelWith(ab('bounce', {}, 'duel')), ['dustcover']);            // ⑤ 防塵套先（5→4），⑧ 再彈回一半（2／2）
    const r = pv(d, fx(3, 1, 1), 'c', { attr: 'o', star: 5 }, { apex: true });
    eq([...kv(r), r.apex.d, relicNote(r, 'dustcover'), apexNote(r).text], ['countered', 2, 2, 2, true, '王牌：彈回去 2'], 'dustcover then bounce: 5 → 4 → he 2／you 2');
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'o', star: 5 })), ['countered', 0, 4], 'dustcover alone: 4 (control)');
    const r4 = pv(d, fx(3, 1, 1), 'c', { attr: 'o', star: 4 }, { apex: true });   // 4：防塵套先＝3 → 彈 1／扣你 2（彈回先就會變成 2／1）
    eq([...kv(r4), r4.apex.d], ['countered', 1, 2, 1], 'dustcover then bounce: 4 → 3 → he 1／you 2 (order matters)'); }
  { const d = withRelics(duelWith(ab('mirrorPlus', { n: 3 }, 'hold', { op: 'tieWin', params: { n: 1 } })), ['cleaner']);   // ④ 留著平手扣他 1＋⑤ 洗碟水 1＝他 −2（兩個都算、不互相蓋掉）
    const r = pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 3 });
    eq([...kv(r), relicNote(r, 'cleaner'), r.apex.src, r.apex.d, apexNote(r).text], ['tie', 2, 0, true, 'hold', 1, '王牌（留著）：同色同星，他 −1'], 'cleaner + tieWin (hold): he −2');
    eq(kv(pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 3 }, { apex: true })), ['mirrorWin', 3, 0], 'hold fired: mirrorPlus 3 replaces tieWin, cleaner gone (not a tie)'); }
  { const d = withRelics(duelWith(ab('crit', { mult: 2 }, 'duel')), ['testpress']);       // ⑤ 見本盤（冷剋多 1）→ ⑦ 拆穿 ×2：(4+1)×2
    const r = pv(d, fx(1, 4, 1), 'o', { attr: 'c', star: 3 }, { hint: 'o', apex: true });
    eq([...kv(r), relicNote(r, 'testpress'), r.apex.caught, apexNote(r).text], ['counter', 10, 0, true, true, '王牌：拆穿！多扣 5'], 'side label then crit: (4+1)×2 = 10'); }
  { const d = withRelics(duelWith(ab('crit', { mult: 2 }, 'duel')), ['obi']);             // 側標（經剋多 1）＋品味 1 → 拆穿：(4+1+1)×2
    d.p.atk = 1;
    const r = pv(d, fx(4, 1, 1), 'c', { attr: 'h', star: 3 }, { hint: 'c', apex: true });
    eq([...kv(r), relicNote(r, 'obi'), apexNote(r).text], ['counter', 12, 0, true, '王牌：拆穿！多扣 6'], 'obi + 品味 then crit: (4+1+1)×2 = 12'); }
  { const d = withRelics(duelWith(ab('star', { n: 1 })), ['boost_c']);                   // 重量盤 +1 星＋① 王牌 +1 星：c3 → 5
    const r = pv(d, fx(3, 1, 1), 'c', { attr: 'c', star: 3 }, { apex: true });
    eq([...kv(r), r.apex.pStar, relicNote(r, 'boost_c'), r.apex.d], ['mirrorWin', 2, 0, 5, true, 1], 'boost + star: 3+1+1 = 5 vs 3');
    eq(kv(pv(d, fx(1, 1, 3), 'h', { attr: 'c', star: 4 }, { apex: true })), ['countered', 0, 4], 'boost is per colour: h3+1 (no boost_h) vs c4 → countered');
    eq(kv(pv(d, fx(2, 1, 1), 'c', { attr: 'h', star: 5 })), ['mirrorLose', 0, 2], 'boost alone: c2+1 vs h5 → gap 2, blocked');
    eq(kv(pv(d, fx(2, 1, 1), 'c', { attr: 'h', star: 5 }, { apex: true })), ['counter', 4, 0], 'boost + star: c2+1+1 vs h5 → gap 1, counter 4'); }
  // 發動當下：回聲望（不超過上限）、看穿（真話／唬人；不取亂數）
  { const d = duelWith(ab('heal', { n: 2 }), { hp: 7 }), rng0 = d.rng;
    const ev = EN.activateApex(d);
    eq([ev.length, ev[0].t, ev[0].heal, ev[0].pHp, d.p.hp, d.p.aceUsed, d.p.apexOn.n, d.rng === rng0, d.n], [1, 'apex', 2, 9, 9, true, 1, true, 1], 'heal: +2, no RNG, same hand');
    ok(EN.activateApex(d).length === 0 && !EN.canApex(d), 'heal: only once a duel');
    const evs = EN.resolveTurn(d, { i: 0, attr: 'c' }), cl = clashOf(evs);
    ok(cl.apex && cl.apex.op === 'heal' && cl.apex.hit && apexNote(cl) && apexNote(cl).text === '王牌：回 2 聲望', 'heal: result line', cl.notes);
    const d2 = duelWith(ab('heal', { n: 2 }), { hp: 11 }); eq(EN.activateApex(d2)[0].heal, 1, 'heal: capped at max'); }
  { const d = duelWith(ab('heal', { n: 2 })), v = EN.view(d), before = JSON.stringify(d);           // 只會回聲望＋聲望滿＝不能發動（不白白用掉）；畫面看 view.apex.full
    ok(d.p.hp === d.p.max && !EN.canApex(d) && !v.apex.can && v.apex.full === true && !v.apex.used, 'heal at full: cannot fire, view.apex.full', v.apex);
    ok(EN.activateApex(d).length === 0 && !EN.isLegal(d, { i: 0, attr: 'c', apex: true }) && EN.resolveTurn(d, { i: 0, attr: 'c', apex: true }).length === 0 && JSON.stringify(d) === before, 'heal at full: activate／act.apex illegal, nothing changes');
    ok(EN.preview(d, { i: 0, attr: 'c', apex: true }, { attr: 'c', star: 3 }) === null, 'heal at full: preview with apex = null');
    d.p.hp -= 1; ok(EN.canApex(d) && EN.view(d).apex.can && EN.view(d).apex.full === false, 'heal one below max: can fire (回 1)');
    const v0 = EN.view(duelWith(ab('mirrorPlus', { n: 1 }, 'duel'))); ok(v0.apex.can && v0.apex.full === false, 'non-heal ability at full HP: can fire'); }
  { const d = duelWith(ab('combo', { ops: [{ op: 'heal', params: { n: 2 } }, { op: 'mirrorPlus', params: { n: 1 } }] }));
    ok(EN.canApex(d), 'heal + something else at full HP: can fire (not heal-only)'); }
  // 看穿的章＝結果句的唬（feintOf）：明指＝出的不是提示那色；半指＝正好出他說不出那色（出另一色＝真話）；不露一律真話
  //   [提示分級, 計畫 o 之外他說不出那色, 他出的色, 章]
  for (const [kind, not, he, want] of [['one', null, 'o', 'honest'], ['one', null, 'c', 'bluff'], ['one', null, 'h', 'bluff'],
    ['half', 'c', 'h', 'honest'], ['half', 'c', 'c', 'bluff'], ['half', 'h', 'o', 'honest'], ['none', null, 'c', 'honest'], ['none', null, 'o', 'honest']]) {
    const d = duelWith(ab('reveal')), pl = d.plan;
    pl.hint.attr = 'o'; pl.hint.kind = kind; pl.hint.not = not; pl.attr = he; pl.bluff = he !== 'o';
    pl.idx = d.e.hand.findIndex(Boolean); const rng0 = d.rng;
    const ev = EN.activateApex(d)[0];
    eq([ev.reveal, EN.view(d).apexReveal, d.rng === rng0], [want, want, true], `reveal: ${kind}${not ? ' not ' + not : ''}, he plays ${he} → ${want}`);
    const cl = clashOf(EN.resolveTurn(d, { i: 0, attr: 'c' }));
    ok(cl.apex && cl.apex.op === 'reveal' && !apexNote(cl), 'reveal: no result line');
    ok(EN.view(d).apexReveal === null, 'reveal: gone after the hand');
  }

  // (d) 時機：這手＝只有發動那手；整場＝發動那手起每手；留著＝沒發動前每手小效果，發動＝換大效果、小效果沒了
  const E3 = { attr: 'c', star: 3 };
  { const d = duelWith(ab('mirrorPlus', { n: 2 }, 'hand'));
    EN.resolveTurn(d, { i: 0, attr: 'c', apex: true });
    ok(!d.over && d.n === 2 && EN.view(d).apex.live === null && EN.view(d).apex.used && EN.view(d).apex.on === 1, 'hand: over after its hand');
    eq(kv(pv(d, fx(3, 1, 1), 'c', E3)), ['tie', 0, 0], 'hand: hand 2 no effect'); }
  { const d = duelWith(ab('mirrorPlus', { n: 1 }, 'duel'));
    ok(EN.view(d).apex.live === null && EN.view(d).apex.can, 'duel: nothing before');
    EN.resolveTurn(d, { i: 0, attr: 'c', apex: true });
    ok(!d.over && EN.view(d).apex.live === 'on', 'duel: still on at hand 2');
    const r = pv(d, fx(3, 1, 1), 'c', E3);
    eq([...kv(r), r.apex.first, apexNote(r).text], ['mirrorWin', 1, 0, false, '王牌：比星多算，多賺 1'], 'duel: hand 2 still +1');
    eq(apexNote(pv(d, fx(1, 1, 4), 'h', { attr: 'o', star: 3 })), undefined, 'duel: later hand without effect → no line'); }
  { const d = duelWith(ab('mirrorPlus', { n: 2 }, 'hold', { op: 'tieWin', params: { n: 1 } }));
    ok(EN.view(d).apex.live === 'hold', 'hold: small effect live before firing');
    let r = pv(d, fx(3, 1, 1), 'c', E3);
    eq([...kv(r), r.apex.src, apexNote(r).text], ['tie', 1, 0, 'hold', '王牌（留著）：同色同星，他 −1'], 'hold: tie → he −1');
    r = pv(d, fx(3, 1, 1), 'c', E3, { apex: true });
    eq([...kv(r), r.apex.src], ['mirrorWin', 2, 0, 'on'], 'hold: firing = big effect only (no tieWin on top)');
    EN.resolveTurn(d, { i: 0, attr: 'c', apex: true });
    ok(!d.over && EN.view(d).apex.live === null, 'hold: small effect gone after firing');
    eq(kv(pv(d, fx(3, 1, 1), 'c', E3)), ['tie', 0, 0], 'hold: hand 2 nothing'); }

  // (e) 王牌不能當唱片丟；一場一次；act.apex 不合法時整個不合法、什麼都不改；view／bestChip
  { const d = duelWith(null, { hp: 5 }), v = EN.view(d);
    ok(!EN.legalActions(d).some(a => a.ace) && !EN.isLegal(d, { ace: true }) && !EN.isLegal(d, { ace: true, attr: 'c' }), 'apex: ace is not a card to play');
    ok(v.ace === null && v.aceCard && v.aceCard.id === C.aces.hall && v.apex.id === 'okc-airbag' && v.apex.can && !v.apex.used && v.apex.on === null, 'view.apex', v.apex);
    eq(EN.bestChip(d, 'c', { ace: true }) && EN.bestChip(d, 'c', { ace: true }).ace, undefined, 'bestChip never returns the ace');
    ok(EN.isLegal(d, { i: 0, attr: 'c', apex: true }), 'act.apex legal before firing');
    d.p.hp = 5; const before = JSON.stringify(d);
    const evs = EN.resolveTurn(d, { i: 0, attr: 'c', apex: true });
    ok(evs[0].t === 'apex' && evs[1].t === 'clash' && evs.some(e => e.t === 'draw'), 'resolve order: apex → clash → draw');
    ok(!EN.isLegal(d, { i: 0, attr: 'c', apex: true }) && EN.preview(d, { i: 0, attr: 'c', apex: true }, E3) === null, 'second firing illegal');
    const b2 = JSON.stringify(d); ok(EN.resolveTurn(d, { i: 0, attr: 'c', apex: true }).length === 0 && JSON.stringify(d) === b2, 'illegal apex act changes nothing');
    ok(before !== b2, 'first resolve did change the duel'); }
  { const d = duelWith(null); ok(EN.legalActions(d).length === d.p.hand.filter(Boolean).length * 3, 'legalActions = hand × 3 (no ace)'); }

  // (f) 不變式：45 張 × 一場打到完：preview（帶 act.apex 或不帶）＝resolve 的 clash；preview 不改狀態；發動不取亂數（同一手不發動、亂數走得一模一樣）；存讀檔接著打一樣
  let fired = 0, hits = 0;
  for (const t of TIERS) for (const x of EN.apexList(C, t)) for (let s = 1; s <= (QUICK ? 1 : 3); s++) {
    const id = ENEMY_IDS[1 + (s % 9)], pos = posFor(id, s + 7);
    const pDef = EN.playerDef(C, { bag: C.gifts[t].concat(BP3), ace: t, aceId: x.card, hp: 9, maxHp: 13, atk: s % 2, def: s % 3 === 0 ? 1 : 0 }, { apex: true });
    ok(pDef.ace.id === x.card && pDef.ability.id === x.id, x.id + ': playerDef picks run.aceId');
    const eDef = EN.enemyDef(C, id, { pos, seedKey: 'apx-' + s, runNo: 1, playerAce: t, bossAce: otherTier(t, s) });
    const { duel } = EN.startDuel(pDef, eDef, { seed: s * 977 + x.id.length, enemyAce: eDef.ace || (eDef.boss ? card(C.aces[otherTier(t, s)]) : null), hintTable: HINTS, apex: true });
    ok(duel.apexMode && duel.p.ability.id === x.id, x.id + ': apexMode');
    const R = lcg(s * 31 + x.id.length);
    let k = 0, saved = null, savedEvs = null;
    const tail = [];
    while (!duel.over) {
      const acts = EN.legalActions(duel), a0 = acts[Math.floor(R() * acts.length)];
      const fireAt = x.timing === 'duel' ? 1 : 1 + (s % 3);
      const act = EN.canApex(duel) && duel.n === fireAt ? Object.assign({}, a0, { apex: true }) : a0;
      const plan = duel.plan, side = { i: plan.idx, attr: plan.attr }, before = JSON.stringify(duel);
      const pr = EN.preview(duel, act, side);
      ok(JSON.stringify(duel) === before, x.id + ': preview does not change the duel');
      if (k === 1 && !saved) { saved = JSON.parse(JSON.stringify(duel)); savedEvs = []; }
      const twin = act.apex ? JSON.parse(before) : null;
      const evs = EN.resolveTurn(duel, act), cl = clashOf(evs);
      if (act.apex) { fired++; ok(evs[0].t === 'apex' && evs[0].id === x.id, x.id + ': apex event first'); }
      eq(sig(pr), sig(cl), x.id + ': preview = resolve' + (act.apex ? ' (firing)' : ''));
      eq(pr.apex, cl.apex, x.id + ': preview apex = clash apex');
      if (cl.apex && cl.apex.op !== 'heal') ok((pr.heal | 0) === (cl.apex.h | 0), x.id + ': preview heal = clash heal', [pr.heal, cl.apex.h]);
      if (cl.apex && cl.apex.hit) hits++;
      if (twin) { EN.resolveTurn(twin, a0); if (!duel.over && !twin.over) ok(twin.rng === duel.rng && twin.n === duel.n, x.id + ': firing draws no RNG (same RNG as not firing)'); }
      if (savedEvs) { savedEvs.push(act); tail.push(...evs); }
      k++;
    }
    if (saved) {   // 存讀檔：從第 2 手的存檔照同樣動作打完，事件一樣
      const d2 = saved, evs2 = [];
      for (const act of savedEvs) evs2.push(...EN.resolveTurn(d2, act));
      ok(JSON.stringify(evs2) === JSON.stringify(tail) && d2.apexMode, x.id + ': JSON round trip mid-duel → same events');
    }
  }
  console.log('     45 abilities × duels: fired ' + fired + ', hit ' + hits);
  ok(fired >= (QUICK ? 30 : 100) && hits >= (QUICK ? 15 : 60), 'abilities fire and hit', [fired, hits]);

  // (g) 結果句：notes 照 content 的樣板代入（{d}／{h}／{name}）；每個 op 有一句、≤25 字
  for (const [k, v] of Object.entries(AT.notes)) ok(typeof v === 'string' && [...v.replace(/\{[dhn]\w*\}/g, '12')].length <= 25, 'notes.' + k + ' ≤ 25 chars');
  for (const op of Object.keys(EN.APEX_OPS)) if (op !== 'reveal') ok(EN.APEX_OPS[op].swapOnly ? ((C0.factions || {}).apexSwap || {}).notes[op] && !AT.notes[op] : AT.notes[op], 'notes for op ' + op);   // 第 D 波棒二：swapOnly（critAdd）只給 ?fac=1&apex=1 換一格，結果句在 C.factions.apexSwap.notes、C.apexTrial 不動

  // (h) run：startFight 旗標下開 apexMode（序章那場不開）；打贏回 winHeal；舊存檔沒有 aceId＝預設那張；aceId 不在這派＝預設那張；存檔接著打照開打時的旗標
  { const run = EN.newRun(C, { seedKey: 'apx-run', runNo: 1, ace: 'pearl' });
    EN.choose(run, C, EN.bargainPolicy(run, C));
    const f0 = EN.startFight(run, C, { apex: true });
    ok(f0.enemyId === C.prologueEnemy && !('apexMode' in f0.duel) && EN.legalActions(f0.duel).some(a => a.ace), 'prologue under the flag = 7-star tutorial');
    play(f0.duel, 'thoughtful', lcg(3)); const r0 = EN.finishFight(run, C);
    ok(r0.win, 'prologue won'); while (run.pending) EN.choose(run, C, EN.runPolicy(run, C));
    const f1 = EN.startFight(run, C, { apex: true });
    ok(f1.duel.apexMode && f1.duel.p.ace.id === C.aces.pearl && f1.duel.p.ability.id === 'zodiac-borrow', 'first guest under the flag: default ability (no aceId = old save)');
    const resumed = EN.startFight(run, C, {});   // 存檔裡那場照開打時的規則
    ok(resumed.resumed && resumed.duel.apexMode, 'resumed duel keeps apexMode without the flag');
    f1.duel.p.hp = 3; let g = 0;
    while (!f1.duel.over && g++ < 12) EN.resolveTurn(f1.duel, EN.legalActions(f1.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } });
    const w = EN.finishFight(run, C);
    eq([w.win, w.heal, run.hp], [true, AT.winHeal, 3 + AT.winHeal], 'win under the flag heals winHeal (' + AT.winHeal + ')');
    const run2 = EN.newRun(C, { seedKey: 'apx-run', runNo: 1, ace: 'pearl' }); run2.prologue = 'done';
    run2.aceId = EN.apexList(C, 'hall')[2].card; ok(EN.apexAceId(run2, C) === C.aces.pearl, 'aceId of another tier → default');
    run2.aceId = 'no-such'; ok(EN.apexAceId(run2, C) === C.aces.pearl, 'unknown aceId → default');
    run2.aceId = EN.apexList(C, 'pearl')[5].card; ok(EN.apexAceId(run2, C) === run2.aceId, 'valid aceId');
    const nr = EN.newRun(C, { seedKey: 'x', runNo: 2, ace: 'hall', aceId: EN.apexList(C, 'heresy')[1].card }); ok(!('aceId' in nr), 'newRun drops an aceId of another tier'); }

  // (i) 換王牌：同一派換卡只改 run.aceId（送的不動）；換派帶 aceId；換派不帶 aceId＝清掉舊的；錯的不改 run
  { const run = EN.newRun(C, { seedKey: 'apx-sw', runNo: 2, ace: 'hall' });
    EN.choose(run, C, EN.bargainPolicy(run, C));
    const bag = run.bag.slice(), hall3 = EN.apexList(C, 'hall')[3].card, her5 = EN.apexList(C, 'heresy')[5].card;
    let r = EN.switchAce(run, C, 'hall', { aceId: hall3 });
    eq([r.ok, r.effects, run.aceId, run.ace], [true, [{ ace: 'hall', from: 'hall', aceId: hall3, fromId: C.aces.hall }], hall3, 'hall'], 'same tier, new card');
    eq(run.bag, bag, 'same tier: bag untouched');
    r = EN.switchAce(run, C, 'hall', { aceId: hall3 }); ok(!r.ok && r.error === 'same', 'same card → same');
    let before = JSON.stringify(run);
    r = EN.switchAce(run, C, 'hall', { aceId: her5 }); ok(!r.ok && r.error === 'badAce' && JSON.stringify(run) === before, 'card of another tier → badAce, untouched');
    r = EN.switchAce(run, C, 'hall', { aceId: C.bargain.pool[0] }); ok(!r.ok && r.error === 'badAce' && JSON.stringify(run) === before, 'non-apex card → badAce');
    r = EN.switchAce(run, C, 'heresy', { aceId: her5 });
    ok(r.ok && run.ace === 'heresy' && run.aceId === her5 && JSON.stringify(r.effects[0]) === JSON.stringify({ ace: 'heresy', from: 'hall', aceId: her5, fromId: hall3 }), 'tier switch with aceId', r.effects[0]);
    ok(C.gifts.heresy.every(id => run.bag.includes(id)), 'tier switch: gifts follow');
    r = EN.switchAce(run, C, 'pearl');
    ok(r.ok && !('aceId' in run) && JSON.stringify(r.effects[0]) === JSON.stringify({ ace: 'pearl', from: 'heresy' }), 'tier switch without aceId clears the old one (old effect shape)');
    const f = EN.startFight(run, C, { apex: true });
    ok(f.duel.p.ace.id === C.aces.pearl, 'after clearing: default card');
    ok(EN.switchAce(run, C, 'hall', { aceId: hall3 }).error === 'notNow', 'after the first fight: notNow'); }

  // (j) 藏家／客人帶的王牌照舊 7 星、沒有能力
  { const run = EN.newRun(C, { seedKey: 'apx-boss', runNo: 2, ace: 'hall', prologue: false });
    EN.choose(run, C, EN.bargainPolicy(run, C)); EN.jumpTo(run, C, 5);
    const f = EN.startFight(run, C, { apex: true });
    const ace = [...f.duel.e.pile, ...f.duel.e.hand].find(c => c.tier);
    ok(f.duel.apexMode && f.duel.e.boss && ace && ace.id === C.aces[run.bossAce] && !('ability' in f.duel.e), 'boss carries the 7-star default ace, no ability');
    const ax = EN.TIER_AXIS[ace.tier]; ok(EN.preview(f.duel, { i: 0, attr: ax }, { attr: ax, star: 7, ace: true }).kind !== undefined, 'his ace previews as 7'); }

  // (k) 策略：旗標下每個策略都合法、會發動；會讀的不會一開場就把留到後面才划算的「這手」型丟掉（第 1 手門檻 2.5）；新手第 1 手就發動；回聲望不浪費
  const NAMES = ['random', 'high', 'counterHint', 'formula', 'mirrorHint', 'thoughtful', 'oracle', 'novice'];
  const used = {};
  for (const n of NAMES) used[n] = { fights: 0, fired: 0, at1: 0, healWaste: 0 };
  for (let s = 1; s <= (QUICK ? 6 : 24); s++) for (const n of NAMES) {
    const t = TIERS[s % 3], x = EN.apexList(C, t)[s % 15];
    const run = EN.newRun(C, { seedKey: 'apx-pol-' + s, runNo: 2, ace: t, prologue: false, aceId: x.card });
    EN.choose(run, C, EN.bargainPolicy(run, C)); EN.jumpTo(run, C, 1 + (s % 12));
    const f = EN.startFight(run, C, { apex: true }), d = f.duel, R = lcg(s);
    used[n].fights++;
    while (!d.over) {
      const can = EN.canApex(d), hp0 = d.p.hp, before = JSON.stringify(d);
      const a1 = EN.policies[n](d, lcg(s * 7 + d.n), {}, C), a2 = EN.policies[n](d, lcg(s * 7 + d.n), {}, C);
      ok(EN.isLegal(d, a1) && JSON.stringify(a1) === JSON.stringify(a2) && JSON.stringify(d) === before, n + ': legal, deterministic, pure', a1);
      if (a1.apex) { used[n].fired++; if (d.n === 1) used[n].at1++; if (x.op === 'heal' && hp0 > d.p.max - x.params.n) used[n].healWaste++; }
      ok(!a1.apex || can, n + ': fires only when it can');
      EN.resolveTurn(d, a1);
    }
  }
  for (const n of NAMES) ok(used[n].fired > 0 && used[n].healWaste === 0, n + ' fires (and never wastes 回聲望)', used[n]);
  ok(used.novice.at1 >= used.novice.fired * 0.6, 'novice fires early', used.novice);
  console.log('     policies under the flag: ' + NAMES.map(n => n + ' ' + used[n].fired + '/' + used[n].fights).join('、'));

  // (l) 會讀的「這手」型門檻 APEX_TAU（審查 11-16：(k) 的標題寫了但沒有斷言）：同一批第 1 手的局面——照現在的門檻會發動的 ⊆ 門檻歸零會發動的，而且門檻真的擋掉一些；
  //   門檻無限大＝第 1 手一次都不發動；整場型第 1 手一律發動（不看門檻）
  { const TAU = EN.APEX_TAU, keep = TAU.slice();
    ok(TAU[1] === 2.5 && TAU[2] === 1.5 && TAU[6] === 0 && TAU.every((x, k) => k < 2 || x <= TAU[k - 1]), 'APEX_TAU: 2.5 at hand 1, non-increasing, 0 at hand 6', TAU);
    const hands = TIERS.flatMap(t => EN.apexList(C, t)).filter(x => x.timing !== 'duel' && x.op !== 'heal' && x.op !== 'reveal');
    let real = 0, zero = 0, inf = 0, sub = true, dFire = 0, dN = 0;
    try {
      for (let s = 1; s <= (QUICK ? 30 : 90); s++) {                     // 真的一場（無限試煉第 1–30 位、三派），能力換成這手型那張
        const x = hands[s % hands.length], t = TIERS[s % 3];
        const run = EN.newRun(C, { seedKey: 'apx-tau-' + s, runNo: 2, ace: t, prologue: false });
        EN.choose(run, C, EN.bargainPolicy(run, C)); EN.jumpTo(run, C, 1 + (s * 7) % 30);
        const d = EN.startFight(run, C, { apex: true }).duel; d.p.ability = EN.abilityOf(C, x.card); d.p.hp = Math.min(d.p.hp, d.p.max - 2);
        ok(d.n === 1 && EN.canApex(d), 'tau: hand 1, can fire');
        const ask = tau => { TAU[1] = tau; const a = EN.policies.thoughtful(d, lcg(s), {}, C); return !!(a && a.apex); };
        const a = ask(keep[1]), b = ask(0), c = ask(Infinity);
        TAU[1] = keep[1];
        real += a; zero += b; inf += c; if (a && !b) sub = false;
        const dd = duelWith(ab('mirrorPlus', { n: 1 }, 'duel'), { seed: s * 13 + 5 }); dN++;
        const ad = EN.policies.thoughtful(dd, lcg(s), {}, C); if (ad && ad.apex) dFire++;
      }
    } finally { TAU.splice(0, TAU.length, ...keep); }
    console.log('     thoughtful hand-type at hand 1: fires ' + real + ' (τ=2.5) / ' + zero + ' (τ=0) / ' + inf + ' (τ=∞)；duel-type ' + dFire + '/' + dN);
    ok(sub && zero > real && real > 0 && inf === 0, 'thoughtful: hand-1 threshold 2.5 actually holds back some firings (τ=2.5 ⊆ τ=0, strictly fewer; τ=∞ never)', [real, zero, inf]);
    ok(dFire === dN, 'thoughtful: duel-type fires on hand 1 regardless of τ', [dFire, dN]);
    ok(JSON.stringify(EN.APEX_TAU) === JSON.stringify(keep), 'APEX_TAU restored'); }

  // (m) 11-17 看穿章、拆穿＝結果句的唬（審查 11-17）：第 12 位真的對決（有半指／不露、兩種唬法、讀你），每手：
  //   看穿章 'bluff' ⇔ 看得出來的唬（明指出的不是提示那色／半指正好出他說不出那色／不露不算）；拆穿 caught ⇔ 看得出來的唬＋剋中
  { const lie = (h, e) => (h.kind || 'one') === 'one' ? e !== h.attr : h.kind === 'half' ? e === h.not : false;
    let bad = 0, rv = { one: 0, half: 0, none: 0 }, ct = { one: 0, half: 0, beta: 0 }, hidden = 0;
    const RALL = "les rallizes dénudés|'77 live", SWANS = 'swans|filth', HT = EN.hintTableOf(C);   // 合併 11-17：#480 寫的舊 slug 換成 catalogId（第 B 波）
    for (let s = 1; s <= (QUICK ? 60 : 240); s++) for (const aceId of [RALL, SWANS]) {
      const pDef = EN.playerDef(C, { bag: (C.gifts.heresy || []).slice(), ace: 'heresy', aceId, relics: [] }, { apex: true });
      const eid = ['copycat', 'already', 'needle', 'skip', 'broke', 'buyer'][s % 6];
      const eDef = EN.enemyDef(C, eid, { pos: 12, seedKey: 'apx-lie', runNo: 1, playerAce: 'heresy' });
      const d = EN.startDuel(pDef, eDef, { seed: s, hintTable: HT, apex: true, enemyAce: eDef.ace || null }).duel;
      if (aceId === SWANS && EN.canApex(d)) EN.activateApex(d);
      const fireAt = 1 + s % 4;
      while (!d.over) {
        const pl = d.plan, h = pl.hint, k = h.kind || 'one';
        if (aceId === RALL && d.n === fireAt && EN.canApex(d)) {
          const r = (EN.activateApex(d).find(e => e.t === 'apex') || {}).reveal;
          rv[k]++; if (pl.bluff && !lie(h, pl.attr)) hidden++;
          if (r !== (lie(h, pl.attr) ? 'bluff' : 'honest') || EN.view(d).apexReveal !== r) { if (bad++ < 5) ok(false, 'reveal stamp = visible bluff', { s, h, he: pl.attr, r }); }
        }
        const acts = EN.legalActions(d).filter(a => !a.ace);
        const act = acts[(s * 7 + d.n * 3) % acts.length] || EN.legalActions(d)[0];
        const cl = clashOf(EN.resolveTurn(d, act)); if (!cl) break;
        if (aceId === SWANS && cl.apex) {
          const want = cl.kind === 'counter' && cl.toE > 0 && lie(cl.hint, cl.eAttr);
          if (!!cl.apex.caught !== want) { if (bad++ < 5) ok(false, 'crit caught = visible bluff + counter', { s, hint: cl.hint, he: cl.eAttr, you: cl.pAttr, kind: cl.kind, caught: cl.apex.caught }); }
          if (want) { if (cl.hint.kind === 'half') ct.half++; else ct.one++; if (cl.why === 'bluff' && cl.eAttr === EN.COUNTER_OF[cl.hint.attr]) ct.beta++; }
        }
      }
    }
    ok(bad === 0, 'apex reveal／crit follow the result line (feintOf)', bad);
    ok(rv.one > 0 && rv.half > 0 && rv.none > 0 && hidden > 0 && ct.one > 0 && ct.half > 0 && ct.beta > 0, 'apex lie checks covered one／half／none, hidden-plan bluffs, half and beta catches', { rv, ct, hidden }); }
});

section('21 包包不限張數（店主 11-16）：收第 9／20 張不用丟、買東西不用賣、賣回仍可（sell）、最少留 5 張、不跨趟、舊存檔照玩（開局特價箱還沒挑的重擺）；特價箱（最高 ≤3、加總 ≤5、每色）；策略判斷值不值得收', () => {
  const untouched = (run, ch, code, name) => { const b = JSON.stringify(run), r = EN.choose(run, C, ch); ok(!r.ok && r.error === code && JSON.stringify(run) === b, name + ' → ' + code, r); };
  const NONB = Object.keys(C.cards).filter(id => !C.cards[id].tier && !C.bargain.pool.includes(id) && !(C.bargain.retired || []).includes(id) && !Object.values(C.gifts).flat().includes(id)).sort();
  const picked = (seedKey, ace = 'hall', o = {}) => { const r = EN.newRun(C, Object.assign({ seedKey, runNo: 2, ace }, o)); ok(EN.choose(r, C, EN.bargainPolicy(r, C)).ok, 'bargainPick ok'); return r; };
  const offer = (run, ids) => { run.pending = { type: 'reward', enemyId: run.order[run.idx], prologue: false, pos: run.pos, cls: 'normal', cards: ids.slice(), relics: [], need: 'card', cardDone: false, relicDone: true }; };
  ok(NONB.length >= 290, 'enough plain cards for this section', NONB.length);
  // (a) 上限
  ok(CFG.bagMax === Infinity && EN.bagCap() === Infinity && !EN.bagLimited(), 'CFG.bagMax = Infinity（不限）');
  { const r = picked('b21-a'); r.bag = r.bag.concat(NONB.slice(0, 50)); ok(!EN.bagFull(r), 'bagFull false with ' + r.bag.length + ' cards'); }
  { const B0 = CFG.bagMax;
    try {
      CFG.bagMax = 8; const r = picked('b21-a8'); r.bag.push(NONB[0]); ok(EN.bagCap() === 8 && EN.bagLimited() && EN.bagFull(r), '--set bagMax=8：有上限、8 張＝滿');
      for (const v of [null, 0, -1, undefined]) { CFG.bagMax = v; ok(EN.bagCap() === Infinity && !EN.bagLimited(), 'bagMax ' + v + ' 也當不限'); }
    } finally { CFG.bagMax = B0; }
    // null／0／負數＝不限：shopPolicy、runPolicy 跟 Infinity 逐字相同（審查：shopPolicy 直接比 bag.length >= CFG.bagMax，0／null 時每筆買都被附上 sellId）
    const shopAll = () => { let out = ''; for (let s = 0; s < (QUICK ? 30 : 120); s++) { const r = picked('b21-bm-' + s, TIERS[s % 3]); r.money = 20000; if (s % 2) r.bag = r.bag.concat(NONB.slice(300 + s % 7, 303 + s % 7)); out += JSON.stringify(EN.shopPolicy(r, C, 'smart', { thin: s % 3 !== 0 })); offer(r, [NONB[s], NONB[s + 1]]); out += JSON.stringify(EN.runPolicy(r, C)); } return out; };
    const REF = shopAll();
    ok(!/"sellId"/.test(REF), 'unlimited shopPolicy never attaches sellId');
    try { for (const v of [null, 0, -1, undefined]) { CFG.bagMax = v; ok(shopAll() === REF, 'bagMax ' + v + '：shopPolicy／runPolicy ＝ Infinity（不強迫賣）'); } }
    finally { CFG.bagMax = B0; } }
  // (b) 收第 9、第 20 張不用丟；dropId 不收了（第 A 波 5：收獎勵時不能順手丟，移出包包只能去櫃檯 → 'counterOnly'）
  { const run = picked('b21-take'); let n = run.bag.length, taken = run.taken;
    eq(n, 7, 'start: 4 gifts + 3 bargain');
    for (let k = 0; n < 21 && k < 60; k++) {
      const id = NONB[k]; offer(run, [id]);
      const r = EN.choose(run, C, { type: 'take', cardId: id });
      ok(r.ok && run.bag.length === n + 1 && run.bag.includes(id) && !r.effects.some(e => e.loseCard) && run.taken === taken + 1 && run.entered.includes(id), 'take #' + (n + 1) + ' without dropping', r);
      if (n + 1 === 9 || n + 1 === 20) ok(r.ok, 'the ' + (n + 1) + 'th card fits');
      n = run.bag.length; taken = run.taken;
    }
    offer(run, [NONB[40]]);
    untouched(run, { type: 'take', cardId: NONB[40], dropId: 'nope' }, 'counterOnly', 'take with a dropId not in the bag');
    untouched(run, { type: 'take', cardId: NONB[40], dropId: NONB[40] }, 'counterOnly', 'take dropping the card itself');
    untouched(run, { type: 'take', cardId: NONB[40], dropId: run.bag[6] }, 'counterOnly', 'take with a dropId in the bag (no dropping while taking a reward)');
    const r = EN.choose(run, C, { type: 'take', cardId: NONB[40] });
    ok(r.ok && run.bag.length === n + 1 && run.bag.includes(NONB[40]) && !r.effects.some(e => e.loseCard), 'take without dropId still works', r); }
  // (c) 買唱片／特價箱不用賣；第 A 波 5：順手賣（sellId／sellIds）→ 'counterOnly'（錢不夠＝'noMoney'，去櫃檯賣）；櫃檯賣完不能少於 5 張
  { const run = picked('b21-buy'); run.money = 99999; run.bag = run.bag.concat(NONB.slice(100, 110));
    const key = Object.keys(run.shop.bins).find(k => run.shop.bins[k].length), cid = run.shop.bins[key][0], n = run.bag.length, m = run.money;
    const r = EN.choose(run, C, { type: 'buy', key, cardId: cid });
    ok(r.ok && run.bag.length === n + 1 && run.money === m - EN.priceOf(C, cid) && r.effects.length === 1, 'buy into a ' + n + '-card bag without selling', r);
    const key2 = Object.keys(run.shop.bins).find(k => run.shop.bins[k].length), cid2 = run.shop.bins[key2][0], sell = NONB[100];
    untouched(run, { type: 'buy', key: key2, cardId: cid2, sellId: sell }, 'counterOnly', 'buy with a sellId (sell at the counter instead)');
    { const r2 = JSON.parse(JSON.stringify(run)); r2.money = EN.priceOf(C, cid2) - 1; untouched(r2, { type: 'buy', key: key2, cardId: cid2, sellId: sell }, 'counterOnly', 'buy short of money with a sellId → counterOnly (not a way to sell)');
      untouched(r2, { type: 'buy', key: key2, cardId: cid2 }, 'noMoney', 'buy short of money → noMoney (go sell at the counter)');
      const v = EN.sellValue(C, card(sell)); ok(EN.choose(r2, C, { type: 'sell', cardId: sell }).ok && r2.money === EN.priceOf(C, cid2) - 1 + v, 'sell at the counter first');
      ok(EN.choose(r2, C, { type: 'buy', key: key2, cardId: cid2 }).ok && r2.money === v - 1, 'then buy (two separate actions)'); }
    const BL = run.shop.bargain.slice(), n3 = run.bag.length, m3 = run.money;
    const r3 = EN.choose(run, C, { type: 'buyBargain', ids: BL.slice(0, 2) });
    ok(r3.ok && run.bag.length === n3 + 2 && run.money === m3 - EN.bargainPriceOf(C, BL[0]) - EN.bargainPriceOf(C, BL[1]), 'buyBargain 2 into a big bag, no sells', r3);
    const sells = [NONB[101], NONB[102], NONB[103]], n4 = run.bag.length, m4 = run.money;
    untouched(run, { type: 'buyBargain', ids: [BL[2]], sellIds: [NONB[101], NONB[101]] }, 'counterOnly', 'buyBargain duplicate sells');
    untouched(run, { type: 'buyBargain', ids: [BL[2]], sellIds: [NONB[101], C.gifts.hall[0]] }, 'counterOnly', 'buyBargain selling a gift');
    untouched(run, { type: 'buyBargain', ids: [BL[2]], sellIds: sells }, 'counterOnly', 'buyBargain with 3 sells');
    const r4 = EN.choose(run, C, { type: 'buyBargain', ids: [BL[2]], sellIds: [] });
    ok(r4.ok && run.bag.length === n4 + 1 && run.money === m4 - EN.bargainPriceOf(C, BL[2]), 'buyBargain with sellIds [] is fine (nothing sold)', r4);
    // 櫃檯賣完不能少於 5 張（送的現在也能交還）：2 張送的＋4 張一般＝6 張 → 賣 1 張剩 5 → 再賣 → bagMin（送的、一般的都一樣）
    const small = picked('b21-min'); small.money = 99999;
    const plain = NONB.slice(190, 194);
    small.bag = small.gifts.slice(0, 2).concat(plain);
    ok(EN.choose(small, C, { type: 'sell', cardId: plain[0] }).ok && small.bag.length === 5, 'sell 1 of 6 → 5 left → ok');
    untouched(small, { type: 'sell', cardId: plain[1] }, 'bagMin', 'sell at 5 → bagMin');
    untouched(small, { type: 'sell', cardId: small.gifts[0] }, 'bagMin', 'hand back a gift at 5 → bagMin');
    eq(EN.sellQuote(small, C, plain[1]), { ok: false, error: 'bagMin' }, 'sellQuote says bagMin too'); }
  // (d) sell {cardId}：櫃檯賣給老闆（第 A 波 5：送的、種子也能交還，$0）
  { const run = EN.newRun(C, { seedKey: 'b21-sell', runNo: 2, ace: 'pearl', seeds: [NONB[210]] });
    untouched(run, { type: 'sell', cardId: run.bag[0] }, 'notNow', 'sell before the bargain pick');
    EN.choose(run, C, EN.bargainPolicy(run, C));
    run.bag.push(NONB[211], NONB[212]);
    const ret = C.bargain.retired[0]; run.bag.push(ret);
    untouched(run, { type: 'sell', cardId: 'nope' }, 'badSell', 'sell unknown card');
    untouched(run, { type: 'sell', cardId: NONB[213] }, 'badSell', 'sell a card not in the bag');
    untouched(run, { type: 'sell', cardId: C.aces.pearl }, 'badSell', 'sell the ace (not in the bag)');
    { const r2 = JSON.parse(JSON.stringify(run)), g = r2.gifts[0], m = r2.money, q = EN.sellQuote(r2, C, g), r = EN.choose(r2, C, { type: 'sell', cardId: g });
      ok(q.ok && q.earn === 0 && q.reclaim === 'gift' && r.ok && r2.money === m && !r2.bag.includes(g) && !r2.gifts.includes(g) && !EN.isGift(r2, C, g) && r2.stats.sold.includes(g), 'hand a gift back: $0, no longer a gift', { q, r });
      eq(r.effects, [{ loseCard: g, earn: 0, reclaim: 'gift' }], 'hand a gift back: effects'); }
    { const r2 = JSON.parse(JSON.stringify(run)), m = r2.money, r = EN.choose(r2, C, { type: 'sell', cardId: NONB[210] });
      ok(r.ok && r2.money === m && !r2.seeds.includes(NONB[210]) && !r2.bag.includes(NONB[210]), 'hand a seed back: $0, no longer a seed', r);
      eq(r.effects, [{ loseCard: NONB[210], earn: 0, reclaim: 'seed' }], 'hand a seed back: effects'); }
    { const r2 = JSON.parse(JSON.stringify(run)); r2.pending = { type: 'retry', enemyId: 'copycat', free: false }; untouched(r2, { type: 'sell', cardId: NONB[211] }, 'notNow', 'sell while a choice is pending'); }
    { const r2 = JSON.parse(JSON.stringify(run)); offer(r2, [NONB[214]]); untouched(r2, { type: 'sell', cardId: NONB[211] }, 'notNow', 'sell while taking a reward (no dropping on the way)'); eq(EN.sellQuote(r2, C, NONB[211]), { ok: false, error: 'notNow' }, 'sellQuote notNow while a reward waits'); }
    { const r2 = JSON.parse(JSON.stringify(run)); r2.duel = {}; untouched(r2, { type: 'sell', cardId: NONB[211] }, 'notNow', 'sell during a duel'); }
    const m = run.money, n = run.bag.length, ent = run.entered.slice(), r = EN.choose(run, C, { type: 'sell', cardId: NONB[211] });
    ok(r.ok && run.money === m + EN.sellValue(C, card(NONB[211])) && run.bag.length === n - 1 && run.stats.sold.includes(NONB[211]) && JSON.stringify(run.entered) === JSON.stringify(ent), 'sell: half price, bag −1, stats.sold, entered untouched', r);
    eq(r.effects, [{ loseCard: NONB[211], earn: EN.sellValue(C, card(NONB[211])) }], 'sell effects');
    const m2 = run.money; ok(EN.choose(run, C, { type: 'sell', cardId: ret }).ok && run.money === m2 + Math.floor(EN.bargainPriceOf(C, ret) / 2), 'retired bargain card sells at half its bargain price (no profit for old saves)');
    for (let g = 0; g < 40 && run.bag.length > CFG.handSize; g++) {
      const x = run.bag[run.bag.length - 1], q = EN.sellQuote(run, C, x), m = run.money, r = EN.choose(run, C, { type: 'sell', cardId: x });
      ok(q.ok && r.ok && run.money === m + q.earn, 'sell down (sellQuote = what you get)', { x, q });
    }
    eq(run.bag.length, CFG.handSize, 'sold down to 5 (hand size)');
    for (const last of run.bag) untouched(run, { type: 'sell', cardId: last }, 'bagMin', 'sell at 5 → bagMin (keep ≥5 for a full hand)'); }
  // (e) 開局挑三張、收音機：包包再大都不會 bagFull
  { const r = EN.newRun(C, { seedKey: 'b21-pick', runNo: 2, ace: 'heresy' }); r.bag = r.bag.concat(NONB.slice(150, 180));
    ok(EN.choose(r, C, EN.bargainPolicy(r, C)).ok && r.bag.length === 37, 'bargainPick into a 34-card bag');
    r.money = 99999; const cell = C.tunes.order.find(c => EN.radioPool(r, C, c).length);
    ok(EN.choose(r, C, { type: 'radio', cell }).ok && EN.choose(r, C, { type: 'buyBargain', ids: [r.shop.radio.id] }).ok && r.bag.length === 38, 'radio card bought into a big bag without selling'); }
  // (f) 不跨趟：一趟收到 20 張、結束；下一趟 newRun 包包＝老闆送的（＋種子），上一趟的一張都沒帶
  { const run = picked('b21-next', 'hall');
    for (let k = 0; run.bag.length < 20 && k < 60; k++) { offer(run, [NONB[60 + k]]); EN.choose(run, C, { type: 'take', cardId: NONB[60 + k] }); }
    run.over = 'dead';
    const nx = EN.newRun(C, { seedKey: 'b21-next', runNo: 3, ace: 'hall' });
    eq(nx.bag, C.gifts.hall, 'next run: bag = the 4 gifts again (nothing carried over)');
    const nx2 = EN.newRun(C, { seedKey: 'b21-next', runNo: 4, ace: 'hall', seeds: [run.bag[10], run.bag[11]] });
    eq(nx2.bag.length, 4, 'next run with 2 seeds: still 4 (seeds take gift slots)');
    ok(nx2.bag.filter(id => run.bag.includes(id) && !C.gifts.hall.includes(id)).length === 2, 'only the seeds you pick come back'); }
  // (g) 舊存檔：包包 8 張（含換下的舊特價箱）、這一輪特價箱還擺著舊的 → 照玩；下一輪補貨換成新的
  { const run = picked('b21-old', 'pearl'), RET = C.bargain.retired;
    run.bag = run.bag.slice(0, 4).concat(RET.slice(0, 3), [NONB[230]]);
    run.shop.bargain = RET.slice(3, 6);
    const old = JSON.parse(JSON.stringify(run));
    eq(old.bag.length, 8, 'old save: 8-card bag');
    for (const id of RET) { eq(EN.priceOf(C, id), EN.bargainPriceOf(C, id), 'retired ' + id + ' still priced as bargain'); eq(EN.sellValue(C, card(id)), Math.floor(EN.bargainPriceOf(C, id) / 2), 'retired sells at half its bargain price'); }
    old.money = 99999;
    const r = EN.choose(old, C, { type: 'buyBargain', ids: [RET[3]] });
    ok(r.ok && old.bag.length === 9 && r.effects[0].spend === EN.bargainPriceOf(C, RET[3]), 'old save: buy a retired card still on the crate at its bargain price, bag 9', r);
    offer(old, [NONB[231]]); ok(EN.choose(old, C, { type: 'take', cardId: NONB[231] }).ok && old.bag.length === 10, 'old save: take a reward without dropping');
    for (const c of C.tunes.order) ok(!EN.radioPool(old, C, c).some(id => RET.includes(id) || C.bargain.pool.includes(id)), 'radio never draws bargain／retired (' + c + ')');
    EN.jumpTo(old, C, 6);
    ok(old.shop.bargain.length && old.shop.bargain.every(id => C.bargain.pool.includes(id)), 'next round: crate restocked from the new pool only', old.shop.bargain);
    ok(!Object.values(old.shop.bins).flat().some(id => RET.includes(id) || C.bargain.pool.includes(id)), 'bins never stock bargain／retired'); }
  // (g2) 舊存檔停在「開局特價箱還沒挑」、箱子還擺換下來的舊牌（審查：免費挑三張照樣是三軸加起來 6–7 的舊牌）→ fixBargain 用現在的池子重擺
  //   ＝同種子 newRun 本來會擺的那 6 張；run 其他欄位不動；再呼叫一次不改；挑過了、或已經是新池子的不動
  { const RET = C.bargain.retired, P = C.bargain.pool;
    for (let s = 0; s < (QUICK ? 40 : 200); s++) {
      const o = { seedKey: 'b21-oldpick-' + s, runNo: 1 + (s % 3), ace: TIERS[s % 3] };
      const run = EN.newRun(C, o), ref = EN.newRun(C, o);
      run.shop.bargain = RET.slice(s % 4, s % 4 + 4).concat(P.slice(0, 2));
      const rest = x => JSON.stringify(Object.assign({}, x, { shop: Object.assign({}, x.shop, { bargain: null }) }));
      const before = rest(run), changed = EN.fixBargain(run, C);
      if (!(changed && JSON.stringify(run.shop.bargain) === JSON.stringify(ref.shop.bargain) && rest(run) === before && !EN.fixBargain(run, C))) { ok(false, 'fixBargain re-lays the crate like newRun', { s, got: run.shop.bargain, want: ref.shop.bargain }); break; } else pass++;
      const r = EN.choose(run, C, EN.bargainPolicy(run, C));
      if (!(r.ok && run.bag.slice(-3).every(id => P.includes(id) && EN.peak(card(id)) <= 3 && card(id).c + card(id).o + card(id).h <= 5))) { ok(false, 'after fixBargain: the free three are from the new pool (max ≤3, sum ≤5)', { s, bag: run.bag }); break; } else pass++;
    }
    const done = picked('b21-oldpick-done'); done.shop.bargain = RET.slice(0, 3); const b = JSON.stringify(done);
    ok(!EN.fixBargain(done, C) && JSON.stringify(done) === b, 'fixBargain: already picked → untouched (retired ones sell at their bargain price until next round)');
    const fresh = EN.newRun(C, { seedKey: 'b21-oldpick-fresh', runNo: 1, ace: 'pearl' }), fb = JSON.stringify(fresh);
    ok(!EN.fixBargain(fresh, C) && JSON.stringify(fresh) === fb, 'fixBargain: crate already from the new pool → untouched');
    ok(!EN.fixBargain(null, C) && !EN.fixBargain({}, C) && !EN.fixBargain({ shop: {} }, C), 'fixBargain: junk → false'); }
  // (h) 特價箱：每張最高 ≤3、加總 ≤5；每色（bargainLane）≥3；每輪 6 張＝每色 2；開局挑法三色各一
  { const P = C.bargain.pool;
    for (const id of P) { const c = card(id); ok(EN.peak(c) <= 3 && c.c + c.o + c.h <= 5 && !c.tier, 'bargain ' + id + ': max ≤3, sum ≤5', [c.c, c.o, c.h]); }
    for (const a of ATTRS) ok(P.filter(id => EN.bargainLane(card(id)) === a).length >= 3, 'bargain lane ' + a + ' ≥3');
    eq([EN.bargainLane({ c: 2, o: 2, h: 1 }), EN.bargainLane({ c: 2, o: 1, h: 2 }), EN.bargainLane({ c: 1, o: 1, h: 1 }), EN.bargainLane({ c: 3, o: 1, h: 1 }), EN.bargainLane({ c: 1, o: 3, h: 1 })], ['o', 'h', 'h', 'c', 'o'], 'bargainLane: peak axis, ties → the later axis');
    for (let s = 0; s < 300; s++) {
      const r = EN.newRun(C, { seedKey: 'b21-crate-' + s, runNo: 1 + (s % 4), ace: TIERS[s % 3] });
      const n = { c: 0, o: 0, h: 0 }; r.shop.bargain.forEach(id => n[EN.bargainLane(card(id))]++);
      if (!(r.shop.bargain.length === 6 && n.c === 2 && n.o === 2 && n.h === 2)) { ok(false, 'crate 2 per lane', { s, n }); break; } else pass++;
      const ch = EN.bargainPolicy(r, C);
      if (!(ch && sameSet(ch.ids.map(id => EN.bargainLane(card(id))), ATTRS))) { ok(false, 'bargainPolicy: one per lane', ch); break; } else pass++;
    } }
  // (i) 包包強度：精確解＝窮舉 5 張手牌；≤5 張＝每軸最大值；加一張被壓過的牌會掉分
  { const R = lcg(21);
    for (let t = 0; t < 30; t++) {
      const N = 6 + Math.floor(R() * 4), ids = NONB.filter(() => R() < 0.05).slice(0, N);
      if (ids.length < 6) continue;
      let tot = 0, cnt = 0; const M = ids.length;
      for (let a = 0; a < M; a++) for (let b = a + 1; b < M; b++) for (let c = b + 1; c < M; c++) for (let d = c + 1; d < M; d++) for (let e = d + 1; e < M; e++) {
        const h = [a, b, c, d, e].map(i => card(ids[i])); tot += ATTRS.reduce((t2, x) => t2 + Math.max(...h.map(q => q[x])), 0); cnt++; }
      ok(Math.abs(EN.bagScore(C, ids) - tot / cnt) < 1e-9, 'bagScore = brute force over all ' + cnt + ' hands', [EN.bagScore(C, ids), tot / cnt]);
    }
    const five = NONB.slice(240, 245); eq(EN.bagScore(C, five), ATTRS.reduce((t, a) => t + Math.max(...five.map(id => card(id)[a])), 0), '≤5 cards: sum of per-axis max');
    const run = picked('b21-score'); const weak = C.bargain.pool.find(id => !run.bag.includes(id) && EN.power(card(id)) === 4);
    run.bag = run.bag.concat(NONB.filter(id => EN.peak(card(id)) >= 5 && EN.power(card(id)) >= 12).slice(0, 8));
    ok(EN.bagGain(run, C, weak) < 0, 'adding a weak bargain card to a strong bag dilutes it', EN.bagGain(run, C, weak)); }
  // (j) 策略：runPolicy 不給 dropId、只拿會漲的、拿漲最多的；shopPolicy 不賣（買的時候）；thinPolicy 只賣排不進前 5 的、剩 5 張停；
  //     第 A 波 5：送的／種子也會交還（$0），但先賣有錢拿的
  { let takes = 0, skips = 0;
    for (let s = 0; s < 40; s++) {
      const run = picked('b21-pol-' + s, TIERS[s % 3]); run.bag = run.bag.concat(NONB.filter((id, k) => (k * 7 + s) % 41 === 0).slice(0, s % 12));
      const cands = NONB.filter((id, k) => (k * 13 + s) % 37 === 0 && !run.bag.includes(id)).slice(0, 3);
      offer(run, cands);
      const ch = EN.runPolicy(run, C);
      ok(ch && ch.dropId == null, 'runPolicy never gives a dropId when unlimited', ch);
      const gains = cands.map(id => EN.bagGain(run, C, id)), best = Math.max(...gains);
      if (ch.type === 'take') { takes++; ok(EN.bagGain(run, C, ch.cardId) === best && best > 0.005, 'runPolicy takes the biggest gain', { ch, gains }); }
      else { skips++; ok(ch.type === 'skip' && best <= 0.005, 'runPolicy skips only when nothing helps', { ch, gains }); }
    }
    ok(takes > 0 && skips > 0, 'runPolicy both takes and skips', [takes, skips]);
    let sold = 0, shops = 0, reclaimed = 0;
    for (let s = 0; s < 40; s++) {
      const run = picked('b21-shop-' + s, TIERS[s % 3], { seeds: s % 2 ? [NONB[250 + s]] : [] }); run.money = 50000;
      run.bag = run.bag.concat(NONB.filter((id, k) => (k * 11 + s) % 23 === 0 && !run.bag.includes(id)).slice(0, 10));
      const chs = EN.shopPolicy(run, C, 'smart'); shops++;
      for (const ch of chs) {
        if (ch.type === 'buy' || ch.type === 'buyBargain') ok(ch.sellId == null && ch.sellIds == null, 'shopPolicy buys without selling when unlimited', ch);
        const b = run.bag.slice(), free = ch.type === 'sell' && (EN.isGift(run, C, ch.cardId) || EN.isSeed(run, C, ch.cardId));
        if (ch.type === 'sell') { sold++; if (free) { reclaimed++; const dead = x => ATTRS.every(a => b.filter(y => y !== x && card(y)[a] >= card(x)[a]).length >= CFG.handSize);
          ok(!b.some(x => x !== ch.cardId && !EN.isGift(run, C, x) && !EN.isSeed(run, C, x) && dead(x)), 'thin hands back a gift／seed only after the paid dead weight is gone', ch); } }
        const r = EN.choose(run, C, ch); ok(r.ok, 'shopPolicy choice ok', { ch, err: r.error });
        if (ch.type === 'sell') { const c = card(ch.cardId); ok(ATTRS.every(a => b.filter(x => x !== ch.cardId && card(x)[a] >= c[a]).length >= CFG.handSize), 'thin sells only dead weight (≥5 others ≥ it on every axis)', ch);
          ok(!!r.effects[0].reclaim === free && (free ? r.effects[0].earn === 0 : r.effects[0].earn > 0), 'thin: gifts／seeds go back for $0, others for money', r.effects); }
      }
      ok(run.bag.length >= CFG.handSize, 'bag ≥ 5 after the shop');
      const r2 = picked('b21-shop-' + s, TIERS[s % 3]); r2.money = 50000; r2.bag = run.bag.slice();
      ok(!EN.shopPolicy(r2, C, 'smart', { thin: false }).some(ch => ch.type === 'sell'), 'shopPolicy {thin:false} never sells');
    }
    ok(sold > 0, 'thinPolicy sold something across 40 shops', sold);
    console.log('     thinPolicy over 40 shops: sold ' + sold + ' (handed back ' + reclaimed + ' gifts／seeds)');
    // 有上限（--set bagMax=8）：runPolicy 照舊，滿了換掉最弱那張
    const B0 = CFG.bagMax;
    try { CFG.bagMax = 8; const run = picked('b21-lim'); run.bag.push(NONB[0]); const strong = NONB.find(id => EN.power(card(id)) >= 13 && EN.peak(card(id)) === 5); offer(run, [strong]);
      const ch = EN.runPolicy(run, C); ok(ch.type === 'take' && ch.cardId === strong && run.bag.includes(ch.dropId), 'limited: full bag → take with dropId (old rule)', ch);
      eq(EN.thinPolicy(run, C).length >= 0 && EN.shopPolicy(run, C, 'smart').filter(c => c.type === 'sell').length, 0, 'limited: shopPolicy never thins'); }
    finally { CFG.bagMax = B0; } }
  // (k) 整趟（不限）：包包真的會長過 8 張、不會掉到 5 張以下
  { let maxBag = 0;
    for (let s = 1; s <= (QUICK ? 6 : 24); s++) {
      const run = EN.newRun(C, { seedKey: 'b21-run-' + s, runNo: 1, ace: TIERS[s % 3] }), R = lcg(s), mem = {};
      for (let g = 0; g < 3000 && !run.over; g++) {
        if (EN.canBargainPick(run)) { EN.choose(run, C, EN.bargainPolicy(run, C)); continue; }
        const step = EN.nextStep(run);
        if (step === 'reward' || step === 'level' || step === 'retry') { ok(EN.choose(run, C, EN.runPolicy(run, C)).ok, 'runPolicy ok'); continue; }
        if (!step || run.pos > 40) break;
        if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, C, 'smart', { thin: s % 2 === 0 })) ok(EN.choose(run, C, ch).ok, 'shop ok');
        if (run.bag.length < CFG.handSize && run.shop.bargainPicked) ok(false, 'bag < 5', run.bag.length);
        maxBag = Math.max(maxBag, run.bag.length);
        const f = EN.startFight(run, C, {}); let h = 0;
        while (!f.duel.over && h++ < 12) EN.resolveTurn(f.duel, EN.policies.thoughtful(f.duel, R, mem, C));
        EN.finishFight(run, C);
      }
    }
    ok(maxBag > 8, 'unlimited bag actually grows past 8 in real runs', maxBag);
    console.log('     biggest bag in 24 runs: ' + maxBag); }
});

section('22 流派與頂點卡靠遊戲解鎖（店主 11-16）：被剋鏈（三種初始流派）、藏家每輪帶的卡、旗標開收試做卡（每張一次、可重現）、換派限制、舊存檔遷移與舊 run 補快照、不碰 run.rng', () => {
  const A = C.aces, TB = EN.TIER_BEATS, ALL = EN.apexCards(C), DEF = TIERS.map(t => A[t]);
  const shelfOf = (ids, src) => { const o = {}; for (const id of ids) o[id] = { at: '', seen: true, own: true, src: src || 'boss' }; return o; };
  // 打到第 pos 位（序章、特價箱照做；每位都硬贏；領獎照 runPolicy）；回每一位的 finishFight
  const winTo = (run, pos, o = {}) => {
    const out = [];
    if (EN.canBargainPick(run)) EN.choose(run, C, EN.bargainPolicy(run, C));
    for (let g = 0; g < 400 && !run.over && run.pos <= pos; g++) {
      if (run.pos === pos && !run.pending && run.prologue !== 'pending') break;
      const f = EN.startFight(run, C, o.apex ? { apex: true } : {}); let h = 0;
      if (o.onFight) o.onFight(run, f);
      while (!f.duel.over && h++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } });
      out.push(EN.finishFight(run, C)); settleAll(run);
    }
    return out;
  };
  // (a) 常數與純函式
  for (const t of TIERS) ok(EN.BEATS[EN.TIER_AXIS[t]] === EN.TIER_AXIS[TB[t]], t + ' beats ' + TB[t] + '（冷剋經、經剋硬、硬剋冷）');
  eq([TB.pearl, TB.hall, TB.heresy], ['hall', 'heresy', 'pearl'], '流亡→殿堂、殿堂→異端、異端→流亡');
  eq(EN.unlockChain('pearl'), ['pearl', 'hall', 'heresy'], 'chain from 流亡'); eq(EN.unlockChain('hall'), ['hall', 'heresy', 'pearl'], 'chain from 殿堂'); eq(EN.unlockChain('heresy'), ['heresy', 'pearl', 'hall'], 'chain from 異端');
  for (const t of TIERS) { const ch = EN.unlockChain(t); ok(EN.nextUnlock([t]) === ch[1] && EN.nextUnlock([t, ch[1]]) === ch[2] && EN.nextUnlock([ch[1], t]) === ch[2], 'nextUnlock follows the chain from ' + t); }
  ok(EN.nextUnlock([]) === null && EN.nextUnlock(TIERS) === null && EN.nextUnlock(['pearl', 'heresy']) === 'hall' && EN.nextUnlock(['x']) === null, 'nextUnlock: none / all / off-chain pair → the one left');
  ok(ALL.length === 45 && new Set(ALL).size === 45 && TIERS.every(t => EN.apexCards(C, t)[0] === A[t] && EN.apexCards(C, t).length === 15 && EN.apexCards(C, t).every(id => EN.tierOfApex(C, id) === t)), 'apexCards: 3 × 15, default first, tier right', ALL.length);
  ok(EN.tierOfApex(C, A.hall) === 'hall' && EN.tierOfApex(C, C.gifts.hall[0]) === null && EN.tierOfApex(C, 'nope') === null && EN.tierOfApex(C, null) === null, 'tierOfApex');
  const tr = t => EN.apexList(C, t)[5].card;   // 一張試做卡
  for (const owned of [[A.hall, tr('heresy')], id => id === A.hall || id === tr('heresy'), { [A.hall]: true, [tr('heresy')]: { own: true } }, shelfOf([A.hall, tr('heresy')])])
    eq(EN.unlockedTiers(C, owned), ['hall', 'heresy'], 'unlockedTiers: any apex card owned (array / fn / map / shelf)');
  eq(EN.unlockedTiers(C, { [A.pearl]: { at: '', seen: true } }), [], 'known only (not owned) does not unlock');
  eq(EN.unlockedTiers(C, [], { start: 'pearl' }), ['pearl'], 'start always unlocked'); eq(EN.unlockedTiers(C, [C.gifts.hall[0]]), [], 'gifts do not unlock');
  eq(EN.ownedApex(C, [tr('heresy')], { start: 'pearl' }), [A.pearl, A.heresy, tr('heresy')], 'ownedApex: owned + defaults of unlocked tiers, in TIERS/list order');
  ok(!EN.ownedApex(C, [], { start: 'pearl' }).includes(tr('pearl')) && EN.ownedApex(C, [], { tiers: [] }).length === 0, 'ownedApex: trial cards only when owned');

  // (b) 被剋鏈（旗標關）：三種初始流派、新玩家第一趟：第 1 輪藏家帶初始派剋的那派預設那張、第 2 輪下一派、三派都開後照舊 content.aces[run.bossAce]
  for (const start of TIERS) {
    const ch = EN.unlockChain(start);
    const run = EN.newRun(C, { seedKey: 'ul-' + start, runNo: 1, ace: start, unlocked: [], start });
    const legacy = EN.newRun(C, { seedKey: 'ul-' + start, runNo: 1, ace: start });
    eq(run.unlock, { tiers: [start], start, apex: null }, start + ': new player → only the start tier');
    ok(run.bossCard === A[ch[1]] && run.rng === legacy.rng && run.bossAce === legacy.bossAce && JSON.stringify(run.shop) === JSON.stringify(legacy.shop) && JSON.stringify(run.order) === JSON.stringify(legacy.order),
      start + ': round 1 boss carries ' + ch[1] + '; run.rng／bossAce／shop／order same as the old run', [run.bossCard, run.rng, legacy.rng]);
    ok(!('unlock' in legacy) && !('acesWon' in legacy) && !('bossCard' in legacy), 'no unlocked → no new fields');
    ok(EN.roundGuests(run, C)[4].hasAce, 'boss shows hasAce');
    let deckAce = null; const res = winTo(run, 16, { onFight: (r, f) => { if (f.duel.e.boss) deckAce = (deckAce || []).concat([f.duel.e.deckIds.filter(id => EN.tierOfApex(C, id))]); } });
    const boss = res.filter(x => x.cls === 'boss');
    ok(boss.length === 3 && run.pos === 16, start + ': beat 3 bosses', [boss.length, run.pos]);
    eq(deckAce, [[A[ch[1]]], [A[ch[2]]], [A[legacy.bossAce]]], start + ': the boss deck holds exactly that one apex card each round');
    eq(boss.map(x => [x.aceWon, x.aceFirst, x.aceNew, x.aceUnlock]), [[A[ch[1]], true, true, ch[1]], [A[ch[2]], true, true, ch[2]], [A[legacy.bossAce], false, false, null]],
      start + ': aceWon chain ' + ch.join('→') + ', then the old pick (already collected)');
    eq(run.acesWon, [A[ch[1]], A[ch[2]]], start + ': acesWon'); eq(EN.runSummary(run).aces, [A[ch[1]], A[ch[2]]], 'runSummary.aces');
    eq(EN.unlockTiersOf(run, C), TIERS, 'all unlocked by the end'); ok(run.bossCard === A[legacy.bossAce], 'round 4: old behaviour');
    ok(res.filter(x => x.cls !== 'boss').every(x => x.aceWon == null && !x.aceFirst && x.aceUnlock == null), 'only the boss gives an apex card');
  }
  // 「收了幾張」：每張新卡 +1（舊行為：一趟只算一次）
  { const run = EN.newRun(C, { seedKey: 'ul-taken', runNo: 2, ace: 'hall', prologue: false, unlocked: [] }); winTo(run, 1); const t0 = run.taken;
    winTo(run, 6); const t1 = run.taken; const r5 = run.stats.taken.length; winTo(run, 11); const t2 = run.taken, r10 = run.stats.taken.length; winTo(run, 16);
    ok(t1 - t0 - r5 === 1 && t2 - t1 - (r10 - r5) === 1 && run.taken - t2 - (run.stats.taken.length - r10) === 0, 'taken: +1 per new apex card (2 new, then a repeat)', [t0, t1, t2, run.taken]); }
  // 跨趟（存檔裡的「擁有」帶到下一趟）：第二趟從已解鎖的接著鏈
  for (const start of TIERS) {
    const ch = EN.unlockChain(start);
    const r2 = EN.newRun(C, { seedKey: 'ul2-' + start, runNo: 2, ace: start, prologue: false, unlocked: [start, ch[1]] });
    ok(r2.bossCard === A[ch[2]], start + ': next run with 2 tiers → the boss carries the last one');
    const r2b = EN.newRun(C, { seedKey: 'ul2-' + start, runNo: 2, ace: ch[1], prologue: false, unlocked: [start, ch[1]] });
    ok(r2b.bossCard === A[ch[2]], start + ': playing the 2nd tier → still the last one');
    const r3 = EN.newRun(C, { seedKey: 'ul3-' + start, runNo: 2, ace: start, prologue: false, unlocked: TIERS });
    ok(r3.bossCard === A[r3.bossAce] && r3.bossAce !== start, start + ': all unlocked, flag off → old pick');
    const off = EN.newRun(C, { seedKey: 'ul4-' + start, runNo: 2, ace: start, prologue: false, unlocked: ['pearl', 'heresy'].includes(start) ? ['pearl', 'heresy'] : ['hall', 'pearl'] });
    ok(off.bossCard === A[EN.nextUnlock(off.unlock.tiers)], 'off-chain pair (old saves) → the one left');
  }

  // (c) 旗標開（apexOwned）：先照鏈解鎖新派（那派預設那張），三派都開後每輪帶一張還沒擁有的試做卡（先別派、別派收齊才你這派）；每張一次；可重現
  for (const start of TIERS) {
    const mk = () => EN.newRun(C, { seedKey: 'ulx-' + start, runNo: 2, ace: start, prologue: false, unlocked: [], start, apexOwned: [] });
    const run = mk(), ch = EN.unlockChain(start);
    eq(run.unlock.apex, [], 'flag on, new player: owns nothing but the start default'); eq(EN.ownedApexOf(run, C), [A[start]], 'ownedApexOf = start default');
    const res = winTo(run, 5 * 12 + 1).filter(x => x.cls === 'boss');
    ok(res.length === 12, 'flag on: 12 bosses', res.length);
    ok(res[0].aceWon === A[ch[1]] && res[1].aceWon === A[ch[2]] && res[0].aceUnlock === ch[1] && res[1].aceUnlock === ch[2], start + ': chain first (defaults)');
    const trial = res.slice(2).map(x => x.aceWon);
    ok(trial.every(id => id && !DEF.includes(id)) && new Set(trial).size === 10, start + ': then 10 different trial cards', trial);
    ok(res.every(x => x.aceFirst && x.aceNew) && res.slice(2).every(x => x.aceUnlock == null), 'each new, collected once');
    ok(trial.every(id => EN.tierOfApex(C, id) !== start), start + ': other tiers first (28 left there)');
    eq(run.acesWon, res.map(x => x.aceWon), 'acesWon = every card, in order');
    const again = mk(); winTo(again, 5 * 12 + 1); eq(again.acesWon, run.acesWon, start + ': reproducible (same seed → same cards)');
    // 別派收齊 → 你這派
    const others = ALL.filter(id => EN.tierOfApex(C, id) !== start);
    const late = EN.newRun(C, { seedKey: 'ulx-own-' + start, runNo: 2, ace: start, prologue: false, unlocked: TIERS, apexOwned: others });
    ok(late.bossCard && EN.tierOfApex(C, late.bossCard) === start && !DEF.includes(late.bossCard), start + ': other tiers done → a card of your own tier', late.bossCard);
    const full = EN.newRun(C, { seedKey: 'ulx-full-' + start, runNo: 2, ace: start, prologue: false, unlocked: TIERS, apexOwned: ALL });
    ok(full.bossCard === A[full.bossAce], start + ': all 45 owned → old pick');
  }
  // 不同輪抽不同張（雜湊照輪）；不碰 run.rng
  { const a = EN.newRun(C, { seedKey: 'ulx-h', runNo: 3, ace: 'pearl', prologue: false, unlocked: TIERS, apexOwned: [] }), rng0 = a.rng, seen = new Set();
    for (let r = 1; r <= 8; r++) { a.round = r; seen.add(EN.bossCardFor(a, C)); }
    ok(seen.size >= 6 && a.rng === rng0, 'different rounds → different cards (hash per round), rng untouched', seen.size); }
  // newRun 的 aceId：旗標開要擁有才收
  { const own = tr('pearl'), not = EN.apexList(C, 'pearl')[7].card;
    const r1 = EN.newRun(C, { seedKey: 'ulx-id', runNo: 2, ace: 'pearl', prologue: false, unlocked: ['pearl'], apexOwned: [own], aceId: own });
    const r2 = EN.newRun(C, { seedKey: 'ulx-id', runNo: 2, ace: 'pearl', prologue: false, unlocked: ['pearl'], apexOwned: [own], aceId: not });
    const r3 = EN.newRun(C, { seedKey: 'ulx-id', runNo: 2, ace: 'pearl', prologue: false, unlocked: ['pearl'], aceId: not });
    ok(r1.aceId === own && !('aceId' in r2) && r3.aceId === not, 'aceId: owned kept / unowned dropped (flag on) / flag off not checked'); }

  // (d) 換派：只在一趟開頭；只能換到解鎖的派、擁有的卡；錯的不改 run
  { const untouched = (run, fn, err, name) => { const b = JSON.stringify(run), r = fn(); ok(!r.ok && r.error === err && JSON.stringify(run) === b, name, r); };
    const run = EN.newRun(C, { seedKey: 'ul-sw', runNo: 2, ace: 'pearl', prologue: false, unlocked: [] });
    eq(EN.aceChoices(run, C), { tiers: ['pearl'], apex: null }, 'aceChoices: new player, flag off');
    untouched(run, () => EN.switchAce(run, C, 'hall'), 'locked', 'switch to a locked tier → locked');
    untouched(run, () => EN.switchAce(run, C, 'heresy'), 'locked', 'switch to a locked tier → locked (2)');
    untouched(run, () => EN.switchAce(run, C, 'pearl'), 'same', 'same tier → same');
    const r2 = EN.newRun(C, { seedKey: 'ul-sw2', runNo: 2, ace: 'pearl', prologue: false, unlocked: ['pearl', 'hall'] });
    ok(EN.switchAce(r2, C, 'hall').ok && r2.ace === 'hall' && r2.bossCard === A.heresy, 'switch to an unlocked tier → ok, boss still carries the last locked one');
    untouched(r2, () => EN.switchAce(r2, C, 'heresy'), 'locked', 'still locked after switching');
    const own = tr('hall'), not = EN.apexList(C, 'hall')[9].card;
    const r3 = EN.newRun(C, { seedKey: 'ul-sw3', runNo: 2, ace: 'pearl', prologue: false, unlocked: ['pearl', 'hall'], apexOwned: [own] });
    eq(EN.aceChoices(r3, C), { tiers: ['hall', 'pearl'], apex: [A.hall, own, A.pearl] }, 'aceChoices: flag on');
    untouched(r3, () => EN.switchAce(r3, C, 'hall', { aceId: not }), 'notOwned', 'unowned card → notOwned');
    untouched(r3, () => EN.switchAce(r3, C, 'pearl', { aceId: EN.apexList(C, 'pearl')[3].card }), 'notOwned', 'unowned card in your own tier → notOwned');
    untouched(r3, () => EN.switchAce(r3, C, 'heresy', { aceId: A.heresy }), 'locked', 'locked tier with its default → locked');
    ok(EN.switchAce(r3, C, 'hall', { aceId: own }).ok && r3.aceId === own, 'owned card of an unlocked tier → ok');
    ok(EN.switchAce(r3, C, 'hall', { aceId: A.hall }).ok && r3.aceId === A.hall, 'back to the default of that tier → ok');
    // 時機：只在第 1 位開打前（序章那一趟＝序章打完後）；notNow 先於 locked
    const p = EN.newRun(C, { seedKey: 'ul-sw4', runNo: 1, ace: 'heresy', unlocked: ['heresy', 'pearl'] });
    ok(!EN.canSwitchAce(p, C), 'prologue pending → cannot switch');
    winTo(p, 1); ok(EN.canSwitchAce(p, C) && p.pos === 1 && p.prologue === 'done', 'prologue done, pos 1 → can switch');
    const f = EN.startFight(p, C, {}); ok(!EN.canSwitchAce(p, C), 'first fight started → cannot');
    while (!f.duel.over) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } }); EN.finishFight(p, C); settleAll(p);
    untouched(p, () => EN.switchAce(p, C, 'pearl'), 'notNow', 'mid-run, unlocked tier → notNow');
    untouched(p, () => EN.switchAce(p, C, 'hall'), 'notNow', 'mid-run, locked tier → notNow first');
    ok(!EN.canSwitchAce(p, C) && p.pos === 2, 'pos 2 → cannot'); }

  // (e) 舊存檔遷移（BRIEF 第 6 條）：已解鎖＝lastAce ∪ 擁有頂點卡的派；擁有的試做卡＝唱片櫃擁有的；lastAce 那派預設補記擁有
  { const sh = Object.assign(shelfOf([A.heresy], 'boss'), { [A.pearl]: { at: 'x#1', seen: true }, [tr('hall')]: { at: 'x#1', seen: true }, [tr('heresy')]: { at: '', seen: true, own: true, src: 'boss' } });
    const m = EN.unlockMigrate(C, sh, 'pearl');
    eq(m, { tiers: ['pearl', 'heresy'], apex: [A.pearl, A.heresy, tr('heresy')], own: [A.pearl] }, 'migrate: lastAce + boss tiers; known-only trial not owned; own lastAce default');
    eq(EN.unlockMigrate(C, Object.assign({}, sh, { [A.pearl]: { own: true, src: 'start' } }), 'pearl').own, [], 'already owned → nothing to add (runs every load)');
    eq(EN.unlockMigrate(C, sh, null), { tiers: ['heresy'], apex: [A.heresy, tr('heresy')], own: [] }, 'no lastAce → only owned tiers');
    eq(EN.unlockMigrate(C, {}, 'bogus'), { tiers: [], apex: [], own: [] }, 'brand new save → nothing');
    // v5 → v6 遷移過的（藏家王牌 src 'boss'）＋lastAce：照樣接著鏈
    const t = EN.unlockMigrate(C, shelfOf([A.hall], 'boss'), 'heresy');
    ok(EN.nextUnlock(t.tiers) === 'pearl', 'old save (heresy + boss hall) → next is pearl'); }
  // 舊的進行中 run（沒有 run.unlock）：fixUnlock 補快照
  { // 第 2 輪、打過第 1 輪藏家（他帶 content.aces[run.bossAce]）
    const run = EN.newRun(C, { seedKey: 'ul-fix', runNo: 2, ace: 'hall', prologue: false }); winTo(run, 7);
    ok(run.aceWon && !run.unlock, 'legacy run in round 2');
    const won = A[run.bossAce], ok1 = EN.fixUnlock(run, C, { unlocked: EN.unlockedTiers(C, [won], { start: 'hall' }) });
    ok(ok1 && run.unlock && JSON.stringify(run.acesWon) === JSON.stringify([won]) && run.unlock.start === 'hall', 'fixUnlock: snapshot, the boss card counts as won this run', run.unlock);
    ok(run.bossCard === A[EN.nextUnlock(['hall', run.bossAce])] && !EN.fixUnlock(run, C, { unlocked: EN.unlockedTiers(C, [won], { start: 'hall' }) }), 'fixUnlock: chain boss card; second call → no change');
    ok(!EN.fixUnlock(run, C, {}) && !EN.fixUnlock(null, C, { unlocked: [] }), 'fixUnlock: needs o.unlocked');
    // 還在第 1 位、王牌是沒擁有的試做卡（旗標開）→ 回預設；擁有的 → 留著
    const x = EN.apexList(C, 'pearl')[4].card;
    const a = EN.newRun(C, { seedKey: 'ul-fix2', runNo: 2, ace: 'pearl', prologue: false, aceId: x });
    EN.fixUnlock(a, C, { unlocked: ['pearl'], apexOwned: [] }); ok(!('aceId' in a), 'unowned trial ace at pos 1 → default');
    const b = EN.newRun(C, { seedKey: 'ul-fix2', runNo: 2, ace: 'pearl', prologue: false, aceId: x });
    EN.fixUnlock(b, C, { unlocked: ['pearl'], apexOwned: [x] }); ok(b.aceId === x, 'owned trial ace kept');
    // 藏家那場打到一半：這一輪的卡＝他牌單裡那張；打完收的就是它
    const c2 = EN.newRun(C, { seedKey: 'ul-fix3', runNo: 2, ace: 'heresy', prologue: false }); winTo(c2, 5);
    const f = EN.startFight(c2, C, {}), had = f.duel.e.deckIds.find(id => EN.tierOfApex(C, id));
    EN.fixUnlock(c2, C, { unlocked: ['heresy'] });
    ok(c2.bossCard === had && had === A[c2.bossAce], 'mid boss duel → bossCard = his deck card');
    while (!f.duel.over) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } });
    const out = EN.finishFight(c2, C); ok(out.aceWon === had && out.aceFirst && out.aceNew && out.aceUnlock === c2.bossAce, 'finishing it → aceWon = that card (unlocks his tier)', out);
    settleAll(c2); ok(c2.pos === 6 && c2.bossCard === A[EN.nextUnlock(EN.unlockTiersOf(c2, C))], 'next round → chain again', [c2.bossCard, EN.unlockTiersOf(c2, C)]);
    // 剛打完藏家在領獎：不動
    const d2 = EN.newRun(C, { seedKey: 'ul-fix4', runNo: 2, ace: 'hall', prologue: false }); winTo(d2, 5); forceWin(d2);
    ok(d2.pending && d2.pending.cls === 'boss', 'pending boss reward');
    EN.fixUnlock(d2, C, { unlocked: ['hall'] }); ok(d2.bossCard === A[d2.bossAce] && JSON.stringify(d2.acesWon) === JSON.stringify([A[d2.bossAce]]), 'pending boss reward → bossCard = what he carried'); }
  // 輸給藏家、說情重打還沒按（pending retry）：這一輪的卡不動——重打＝同一位、同一副牌（審查 11-16：原本會重算成被剋鏈那張）
  { const loseBoss = (run, o = {}) => {
      const f = EN.startFight(run, C, o), had = f.duel.e.deckIds.find(id => EN.tierOfApex(C, id)), ids = f.duel.e.deckIds.slice().sort(); let h = 0;
      while (!f.duel.over && h++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'countered', toE: 0, toP: 99 } });
      EN.finishFight(run, C); return { had, ids };
    };
    const again = (run, o = {}) => { EN.choose(run, C, { type: 'retry' }); const f = EN.startFight(run, C, o); return { had: f.duel.e.deckIds.find(id => EN.tierOfApex(C, id)), ids: f.duel.e.deckIds.slice().sort() }; };
    // 舊 run（解鎖制以前存的）：補快照時藏家的卡＝content.aces[run.bossAce]（他剛才那場帶的），不是被剋鏈那張
    let hit = 0;
    for (let k = 1; k < 40 && hit < 2; k++) {
      const e2 = EN.newRun(C, { seedKey: 'ul-retry' + k, runNo: 2, ace: 'hall', prologue: false }); winTo(e2, 5);
      if (EN.nextUnlock(['hall']) === e2.bossAce) continue;                        // 要他帶的那派跟被剋鏈那派不同，才測得出來
      hit++;
      const l1 = loseBoss(e2);
      ok(e2.pending && e2.pending.type === 'retry' && e2.pending.pos === 5 && !e2.unlock && l1.had === A[e2.bossAce], 'legacy run lost to the boss → pending retry', [e2.pending, l1.had]);
      ok(EN.fixUnlock(e2, C, { unlocked: ['hall'], start: 'hall' }) && e2.bossCard === l1.had && JSON.stringify(e2.acesWon) === '[]', 'legacy pending retry → bossCard = what he carried (not the chain card)', [e2.bossCard, l1.had]);
      ok(!EN.fixUnlock(e2, C, { unlocked: ['hall'], start: 'hall' }), 'second load → no change');
      const l2 = again(e2);
      ok(l2.had === l1.had && JSON.stringify(l2.ids) === JSON.stringify(l1.ids), 'retry → same boss, same deck', [l1.had, l2.had]);
    }
    ok(hit === 2, 'found legacy runs where his tier ≠ the chain tier', hit);
    // 新規則的 run（旗標開、三派都開＝藏家帶試做卡）：輸了之後不開旗標重新整理，重打照樣是剛才那張
    const n2 = EN.newRun(C, { seedKey: 'ul-retry-new', runNo: 2, ace: 'hall', prologue: false, unlocked: TIERS, apexOwned: [] }); winTo(n2, 5, { apex: true });
    const m1 = loseBoss(n2, { apex: true });
    ok(n2.pending && n2.pending.type === 'retry' && !DEF.includes(m1.had) && n2.bossCard === m1.had, 'flag on: lost to a boss carrying a trial card', m1.had);
    ok(!EN.fixUnlock(n2, C, { unlocked: TIERS, apexOwned: [] }), 'same save, same flag → no change');
    EN.fixUnlock(n2, C, { unlocked: TIERS }); ok(n2.bossCard === m1.had && n2.unlock.apex === null, 'reopened without the flag mid-retry → his card stays', [n2.bossCard, m1.had]);
    const m2 = again(n2);
    ok(m2.had === m1.had && JSON.stringify(m2.ids) === JSON.stringify(m1.ids), 'retry → same trial card, same deck');
    // 序章輸了（free retry、沒有 pos）：照舊重算（第 1 位不是藏家）
    const pr = EN.newRun(C, { seedKey: 'ul-retry-pro', runNo: 1, ace: 'pearl', unlocked: [], start: 'pearl' });
    const fp = EN.startFight(pr, C, { tutorial: true }); let hp = 0;
    while (!fp.duel.over && hp++ < 12) EN.resolveTurn(fp.duel, EN.legalActions(fp.duel)[0], { debugOutcome: { kind: 'countered', toE: 0, toP: 99 } });
    EN.finishFight(pr, C); const bc = pr.bossCard; pr.bossCard = null;
    EN.fixUnlock(pr, C, { unlocked: ['pearl'], start: 'pearl' });
    ok(pr.pending && pr.pending.type === 'retry' && pr.pending.free && pr.bossCard === bc && bc === A.hall, 'prologue retry → recomputed (chain card)', [pr.pending, bc]); }
  // 旗標只看網址：同一份存檔開關 ?apex=1，三派都開後藏家帶試做卡或照舊跟著變
  { const run = EN.newRun(C, { seedKey: 'ul-flag', runNo: 2, ace: 'hall', prologue: false, unlocked: TIERS, apexOwned: [] }), c1 = run.bossCard;
    ok(!DEF.includes(c1), 'flag on → trial card');
    ok(EN.fixUnlock(run, C, { unlocked: TIERS }) && run.unlock.apex === null && run.bossCard === A[run.bossAce], 'reopened without the flag → old pick');
    ok(EN.fixUnlock(run, C, { unlocked: TIERS, apexOwned: [] }) && run.bossCard === c1, 'flag back on → same trial card'); }

  // (f) 整條線（存檔＝唱片櫃的「擁有」，畫面照 CONTRACT 的做法跨趟帶）：第一次選流亡 → 第一次打倒藏家掉殿堂 → 下一次掉異端 → 旗標開再收試做卡直到 45 張
  for (const start of TIERS) {
    const shelf = {}; let last = start, firstPick = true, n = 0, order = [];
    for (let k = 1; k <= 30 && Object.keys(shelf).filter(id => shelf[id].own && EN.tierOfApex(C, id)).length < 45; k++) {
      const un = EN.unlockedTiers(C, shelf, { start: firstPick ? null : last });
      const ace = un.length ? last : start;
      const run = EN.newRun(C, { seedKey: 'ul-life-' + start, runNo: k, ace, prologue: false, unlocked: un, start: ace, apexOwned: EN.ownedApex(C, shelf, { tiers: un.length ? un : [ace] }) });
      if (firstPick) { shelf[A[ace]] = { own: true, src: 'start' }; firstPick = false; }
      for (const x of winTo(run, 11).filter(x => x.aceWon && x.aceFirst)) { if (!shelf[x.aceWon] || !shelf[x.aceWon].own) { shelf[x.aceWon] = { own: true, src: 'boss' }; order.push(x.aceWon); } n++; }
      last = ace;
    }
    ok(order[0] === A[TB[start]] && order[1] === A[TB[TB[start]]], start + ': first boss drops the tier it beats, then the next', order.slice(0, 2));
    ok(Object.keys(shelf).filter(id => shelf[id].own).length === 45 && n === 44, start + ': all 45 collected, each once', [Object.keys(shelf).length, n]);
  }
});

section('23 第 A 波（店主 11-16）：放水照位數機率（可重現、不碰對決亂數）、稱號每 2 位、客人主屬性（一輪三色、牌組照主屬性、出牌比例）、櫃檯賣給老闆（送的／種子 $0、sellQuote、counterOnly）', () => {
  const untouched = (run, ch, code, name) => { const b = JSON.stringify(run), r = EN.choose(run, C, ch); ok(!r.ok && r.error === code && JSON.stringify(run) === b, name + ' → ' + code, r); };
  // (a) 放水機率：第 1–10 位 1；第 11–15 位 .9、16–20 位 .8 … 第 46 位起 .2；content＝engine 預設；難度階梯可以覆寫
  { const NOC = Object.assign({}, C, { trial: undefined });
    let bad = 0;
    for (let d = 1; d <= 200; d++) { const w = mercyPT(d); if (Math.abs(EN.mercyPAt(C, d) - w) > 1e-9 || Math.abs(EN.mercyPAt(NOC, d) - w) > 1e-9) { if (bad++ < 5) ok(false, 'mercyPAt(' + d + ') = ' + w, [EN.mercyPAt(C, d), EN.mercyPAt(NOC, d)]); } else pass++; }
    eq([10, 11, 15, 16, 20, 21, 41, 45, 46, 300].map(d => EN.mercyPAt(C, d)), [1, 0.9, 0.9, 0.8, 0.8, 0.7, 0.3, 0.3, 0.2, 0.2], 'mercyPAt: 10→1, 11–15 .9, 16–20 .8, 21 .7, 41–45 .3, 46+ .2');
    const C2 = Object.assign({}, C, { trial: Object.assign({}, C.trial, { tiers: [{ curve: { mercyP: { from: 6, p0: 0.5 } } }] }) });
    eq([EN.mercyPAt(C2, 5, 1), EN.mercyPAt(C2, 6, 1), EN.mercyPAt(C2, 11, 1), EN.mercyPAt(C2, 6, 0)], [1, 0.5, 0.4, 1], 'tier override of mercyP (partial)');
    for (let d = 1; d <= 30; d++) { const e = EN.enemyDef(C, 'skip', { pos: d, seedKey: 'mp', runNo: 1, playerAce: 'hall', bossAce: 'pearl' }); ok(d < 11 ? !('mercyP' in e) : e.mercyP === mercyPT(d), 'enemyDef.mercyP only from pos 11 (' + d + ')'); }
    ok(!('mercyP' in EN.enemyDef(C, 'skip', {})) && !('mercyP' in EN.enemyDef(C, 'man', { tutorial: true })), 'no mercyP for direct duels／the prologue'); }
  // (b) 放水的判斷：雜湊（對決種子＋第幾手），同種子同結果；不取 duel.rng；mercyP 0＝CFG.mercy false、mercyP 1＝沒有這欄（舊行為）
  { let same = 0, diffSeed = 0;
    const count = d => { const c = JSON.parse(JSON.stringify(d)); c.plan = null; c.n--; const b = c.rng; EN.beginHand(c, []); return rngCalls(b, c.rng); };
    for (let s = 1; s <= 120; s++) {
      const o = { pos: 11 + (s % 40), eOver: { mercyP: 0.5 } };
      const a = startFor('critic', TIERS[s % 3], s * 17, o).duel, b = startFor('critic', TIERS[s % 3], s * 17, o).duel, c = startFor('critic', TIERS[s % 3], s * 17 + 1, o).duel;
      ok(a.e.mercyP === 0.5 && a.e.mercyKey === ((s * 17) >>> 0), 'e.mercyKey = the duel seed');
      const R1 = lcg(s), R2 = lcg(s), seqA = [], seqB = [];
      while (!a.over) { if (count(a) !== 8) ok(false, 'mercy gate takes no RNG (8 per hand)'); else pass++; seqA.push(a.plan.mercy); EN.resolveTurn(a, EN.policies.random(a, R1)); }
      while (!b.over) { seqB.push(b.plan.mercy); EN.resolveTurn(b, EN.policies.random(b, R2)); }
      if (JSON.stringify(seqA) === JSON.stringify(seqB)) same++;
      if (c.plan.mercy !== seqA[0]) diffSeed++;                    // 第 1 手：換一個種子，有沒有放水跟著變（p .5）
    }
    eq(same, 120, 'same seed → same mercy hands');
    ok(diffSeed > 20, 'another seed → other mercy hands', diffSeed);
    // mercyP 0 ≡ CFG.mercy false；mercyP 1 ≡ 舊的（沒有這兩欄）
    let eq0 = 0, eq1 = 0;
    for (let s = 1; s <= 150; s++) {
      const pos = 12 + (s % 30), id = ['skip', 'critic', 'boss'][s % 3], tier = TIERS[s % 3];
      const z = startFor(id, tier, s * 29, { pos: posFor(id, s) + 15, eOver: { mercyP: 0 } }).duel;
      let off; try { CFG.mercy = false; off = startFor(id, tier, s * 29, { pos: posFor(id, s) + 15 }).duel; } finally { CFG.mercy = true; }
      const R1 = lcg(s), R2 = lcg(s); let g = 0;
      while (!z.over && g++ < 12) { const act = EN.policies.random(z, R1); EN.resolveTurn(z, act); }
      try { CFG.mercy = false; g = 0; while (!off.over && g++ < 12) EN.resolveTurn(off, EN.policies.random(off, R2)); } finally { CFG.mercy = true; }
      if (JSON.stringify(z.log) === JSON.stringify(off.log)) eq0++;
      const one = startFor(id, tier, s * 31, { pos: 7, eOver: { mercyP: 1 } }).duel, old = startFor(id, tier, s * 31, { pos: 7 }).duel;
      ok(!('mercyP' in one.e) && !('mercyKey' in one.e), 'mercyP 1 → no fields on the duel');
      if (JSON.stringify(play(one, 'thoughtful', lcg(s))) === JSON.stringify(play(old, 'thoughtful', lcg(s)))) eq1++;
    }
    eq([eq0, eq1], [150, 150], 'mercyP 0 ≡ CFG.mercy=false；mercyP 1 ≡ old behaviour');
    // 存讀檔：第 11 位起打到一半存起來，接著打一模一樣
    for (let s = 1; s <= 40; s++) {
      const { duel } = startFor('label', TIERS[s % 3], s * 7, { pos: 14 + 5 * (s % 6) });
      EN.resolveTurn(duel, EN.policies.random(duel, lcg(s)));
      if (duel.over) continue;
      const saved = JSON.parse(JSON.stringify(duel));
      eq(play(duel, 'thoughtful', lcg(s + 1)), play(saved, 'thoughtful', lcg(s + 1)), 'resumed duel (pos ≥11) same events');
    } }
  // (c) 稱號：每 2 位換一次、第 15 位起品味之神；藏家不掛、跟名字一樣不掛；來客那排、對決 view.eTitle
  { const T = C.trial.titles;
    eq(T, ['音樂小白', '文青同好', '社團學長', '資深樂評', '二手店老闆', '地下廠牌主理人', '品味行家', '品味之神'], 'titles = old enemyForDepth titles');
    eq(Array.from({ length: 18 }, (_, k) => EN.titleAt(C, k + 1)), [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 7].map(k => T[k]), 'titleAt: every 2 positions, stays at 品味之神 from 15');
    eq([EN.titleAt(C, 300), EN.titleAt(Object.assign({}, C, { trial: undefined }), 7)], [T[7], T[3]], 'titleAt far out / engine default');
    ok(EN.guestTitle(C, 5, 'boss') === null && EN.guestTitle(C, 15, 'boss') === null, 'the collector has no title');
    ok(EN.guestTitle(C, 3, 'copycat') === null && EN.guestTitle(C, 3, 'skip') === '文青同好' && EN.guestTitle(C, 5, 'skip', 'normal') === '社團學長' && EN.guestTitle(C, 5, 'already', 'normal') === null && EN.guestTitle(C, 6, 'already') === null, 'same as his name → null');
    ok(EN.guestTitle(C, 4, 'label') === '文青同好' && EN.guestTitle(C, 14, 'critic') === '品味行家' && EN.guestTitle(C, 9, 'skip') === null && EN.guestTitle(C, 10, 'skip', 'normal') === null, 'elites carry the position title too');
    for (let s = 0; s < 40; s++) {
      const run = EN.newRun(C, { seedKey: 'ttl-' + s, runNo: 2, ace: TIERS[s % 3] }); EN.choose(run, C, EN.bargainPolicy(run, C)); EN.jumpTo(run, C, 1 + (s * 3) % 40);
      const rg = EN.roundGuests(run, C);
      ok(rg.every(x => x.title === EN.guestTitle(C, x.pos, x.id)), 'roundGuests title = guestTitle');
      const f = EN.startFight(run, C, {}), v = EN.view(f.duel);
      ok(v.eTitle === rg[run.idx].title && v.eName === C.enemies[f.enemyId].name, 'view.eTitle = this guest title', { t: v.eTitle, g: rg[run.idx].title });
    } }
  // (d) 主屬性：每一輪一般 3 位三色各一（對上原本牌組主屬性最多的排列）、菁英／藏家照種子輪（同輪不同色、每三輪各一次）；跟王牌無關、可重現
  { const PER = ['c', 'o', 'h'], nat = id => EN.deckMain(C.enemies[id].deck.map(x => C.cards[x]), C.enemies[id].taste);
    eq(['copycat', 'already', 'needle', 'skip', 'broke', 'buyer', 'label', 'critic', 'boss'].map(nat), ['c', 'o', 'c', 'o', 'h', 'h', 'o', 'c', 'c'], 'natural mains (the decks in content)');
    let bad = 0, count = { c: 0, o: 0, h: 0 };
    for (let s = 0; s < (QUICK ? 120 : 600); s++) {
      const sk = 'mn-' + s, rn = 1 + (s % 4), rot = [];
      for (let r = 1; r <= 9; r++) {
        const order = EN.jumpTo(EN.newRun(C, { seedKey: sk, runNo: rn, ace: 'hall' }), C, 5 * r - 4).order, M = EN.roundMains(C, sk, rn, r, order);
        const n3 = M.slice(0, 3), hits = order.slice(0, 3).reduce((t, id, k) => t + (nat(id) === n3[k] ? 1 : 0), 0);
        const best = Math.max(...[['c', 'o', 'h'], ['c', 'h', 'o'], ['o', 'c', 'h'], ['o', 'h', 'c'], ['h', 'c', 'o'], ['h', 'o', 'c']].map(p => order.slice(0, 3).reduce((t, id, k) => t + (nat(id) === p[k] ? 1 : 0), 0)));
        if (!(sameSet(n3, PER) && hits === best && M[3] !== M[4] && PER.includes(M[3]) && PER.includes(M[4]))) { if (bad++ < 5) ok(false, 'round mains', { s, r, order, M, hits, best }); } else pass++;
        eq(EN.roundMains(C, sk, rn, r), M, 'roundMains without order = with the walked order');
        rot.push(M[3] + M[4]); for (const a of M) count[a]++;
        const r2 = EN.jumpTo(EN.newRun(C, { seedKey: sk, runNo: rn, ace: 'heresy' }), C, 5 * r - 2);
        ok(JSON.stringify([2, 3, 4].map(k => EN.mainAt(r2, C, 5 * r - 4 + k))) === JSON.stringify(M.slice(2)), 'mainAt = roundMains (whatever the ace)');
      }
      ok(sameSet(rot.slice(0, 3).map(x => x[0]), PER) && sameSet(rot.slice(0, 3).map(x => x[1]), PER), 'elite／collector rotate through all three every 3 rounds', rot);
    }
    ok(['c', 'o', 'h'].every(a => count[a] === count.c), 'each colour equally often over whole 3-round blocks', count); }
  // (e) trialDeck(main)：張數、不重複、主屬性那軸最高的牌 ≥ round(0.7×張數)、他自己夠下限的主屬性牌全留、加星加在主屬性那軸；mainShare 0／沒給＝舊規則
  { const need = n => Math.round(C.trial.curve.deck.mainShare * n);
    let bad = 0;
    for (let s = 1; s <= (QUICK ? 600 : 3000); s++) {
      const id = [...C.normals, ...C.elites, C.boss][s % 9], ce = C.enemies[id], d = 1 + (s * 7) % 80, M = ATTRS[s % 3];
      const o = { seedKey: 'tdm-' + s, runNo: 1 + (s % 3), playerAce: TIERS[s % 3], bossAce: otherTier(TIERS[s % 3], s), cls: ce.boss ? 'boss' : EN.classAt(d) === 'boss' ? 'normal' : EN.classAt(d), main: M };
      const td = EN.trialDeck(C, id, d, o), old = EN.trialDeck(C, id, d, Object.assign({}, o, { main: undefined }));
      const orig = td.deck.map(c => C.cards[c.id]), isM = c => c[M] === Math.max(c.c, c.o, c.h), b = td.buff;
      const okDeck = td.main === M && td.deck.length === ce.deck.length && new Set(td.deck.map(c => c.id)).size === td.deck.length && orig.every(c => c && !c.tier)
        && orig.filter(isM).length >= need(ce.deck.length) && orig.every(c => EN.power(c) >= td.floor)
        && ce.deck.every(x => !(EN.power(C.cards[x]) >= td.floor && isM(C.cards[x])) || td.deck.some(c => c.id === x))
        && td.deck.every((c, k) => { const g = orig[k], ax = isM(g) ? M : EN.topAttr(g), w = Math.min(5, Math.max(g[ax], g[ax] + b)); return c[ax] === w && ATTRS.every(a => a === ax || c[a] === g[a]) && (!!c.plus === (w !== g[ax])); })
        && JSON.stringify(td.ace) === JSON.stringify(old.ace) && td.floor === old.floor && td.buff === old.buff;
      if (!okDeck) { if (bad++ < 5) ok(false, 'trialDeck with a main', { id, d, M, deck: td.deck.map(c => [c.id, c.c, c.o, c.h]), floor: td.floor }); } else pass++;
    }
    const C0s = Object.assign({}, C, { trial: Object.assign({}, C.trial, { curve: Object.assign({}, C.trial.curve, { deck: Object.assign({}, C.trial.curve.deck, { mainShare: 0 }) }) }) });
    for (let s = 1; s <= 200; s++) { const id = C.normals[s % 6], o = { seedKey: 'z-' + s, runNo: 1, playerAce: 'hall', bossAce: 'pearl', main: ATTRS[s % 3] };
      const a = EN.trialDeck(C0s, id, 1 + s % 50, o), z = EN.trialDeck(C, id, 1 + s % 50, Object.assign({}, o, { main: null }));
      if (!(JSON.stringify(a.deck) === JSON.stringify(z.deck) && a.main === o.main && !('main' in z))) { ok(false, 'mainShare 0 = old deck, still labelled', { id }); break; } else pass++; } }
  // (f) 整趟：對決的牌＝照主屬性組的那副；view.eMain＝來客那排的 main＝mainAt
  for (let s = 0; s < 30; s++) {
    const run = EN.newRun(C, { seedKey: 'mrun-' + s, runNo: 2, ace: TIERS[s % 3] }); EN.choose(run, C, EN.bargainPolicy(run, C)); EN.jumpTo(run, C, 1 + (s * 7) % 60);
    const id = run.order[run.idx], m = EN.mainAt(run, C, run.pos), rg = EN.roundGuests(run, C);
    const td = EN.trialDeck(C, id, run.pos, { seedKey: run.seedKey, runNo: run.runNo, playerAce: run.ace, bossAce: run.bossAce, tier: run.tier, cls: EN.classAt(run.pos), main: m });
    const f = EN.startFight(run, C, {}), v = EN.view(f.duel);
    ok(ATTRS.includes(m) && v.eMain === m && rg[run.idx].main === m && f.duel.e.main === m, 'eMain = roundGuests main = mainAt', { m, e: v.eMain });
    eq(f.duel.e.deckIds.slice().sort(), td.deck.map(c => c.id).concat(td.ace ? [td.ace.id] : []).sort(), 'duel deck = trialDeck(main) (+ his ace)');
    ok(sameSet(rg.slice(0, 3).map(x => x.main), ATTRS), 'this round: the three regulars are one of each colour');
  }
  ok(EN.view(startFor('copycat', 'hall', 5).duel).eMain === null && EN.view(startFor('man', 'hall', 5, { tutorial: true }).duel).eMain === null, 'direct duels／prologue: no main');
  // (g) 出牌比例（店主「為何對手都打經典」）：新手打到第 12 位、smart：三色各 25–40%；第 4–12 位（出招偏主屬性 mainBias 起算）三色各 30–36%
  //     （改版前 39／30／31；只照主屬性組牌、出招不偏＝37／31／32，這條擋得住；這版約 34／33／32。第 1–3 位不偏，約 40／32／28：見 content.js mainBias）、
  //     每種主屬性的客人提示最多的是主屬性那色、出主屬性那色 > 剋它的那色
  { const play3 = { c: 0, o: 0, h: 0 }, late3 = { c: 0, o: 0, h: 0 }, byM = {}, hintM = {};
    for (let s = 0; s < (QUICK ? 80 : 300); s++) {
      const run = EN.newRun(C, { seedKey: 'share-' + s, runNo: 1, ace: TIERS[s % 3], prologue: false }); EN.choose(run, C, EN.bargainPolicy(run, C));
      const R = lcg(s), mem = {};
      for (let g = 0; g < 200 && !run.over; g++) {
        const st = EN.nextStep(run);
        if (st === 'reward' || st === 'level' || st === 'retry') { EN.choose(run, C, EN.runPolicy(run, C)); continue; }
        if (st !== 'fight' || run.pos > 12) break;
        for (const ch of EN.shopPolicy(run, C, 'smart')) EN.choose(run, C, ch);
        const pos = run.pos, f = EN.startFight(run, C, {}), mn = f.duel.e.main;
        play(f.duel, 'novice', R, mem);
        for (const l of f.duel.log) { play3[l.eAttr]++; if (pos >= 4) late3[l.eAttr]++; byM[mn] = byM[mn] || { c: 0, o: 0, h: 0 }; byM[mn][l.eAttr]++; hintM[mn] = hintM[mn] || { c: 0, o: 0, h: 0 }; hintM[mn][l.hint]++; }
        EN.finishFight(run, C);
      }
    }
    const tot = play3.c + play3.o + play3.h, sh = a => play3[a] / tot;
    ok(ATTRS.every(a => sh(a) >= 0.25 && sh(a) <= 0.40), 'he plays each colour 25–40% of the time', ATTRS.map(a => (100 * sh(a)).toFixed(1)));
    const lt = late3.c + late3.o + late3.h, sl = a => late3[a] / lt;
    ok(ATTRS.every(a => sl(a) >= 0.30 && sl(a) <= 0.36), 'positions 4–12 (mainBias): he plays each colour 30–36% of the time', ATTRS.map(a => (100 * sl(a)).toFixed(1)));
    for (const M of ATTRS) { const H = hintM[M], P = byM[M]; ok(H && ATTRS.every(a => a === M || H[M] > H[a]) && P[M] > P[COUNTER_OF[M]], 'main ' + M + ': hints it most, plays it more than its counter', { H, P }); }
    console.log('     guests play 經／冷／硬 ' + ATTRS.map(a => (100 * sh(a)).toFixed(1)).join('／') + '%（novice smart to pos 12；pos 4–12 ' + ATTRS.map(a => (100 * sl(a)).toFixed(1)).join('／') + '%）；main share of plays ' + ATTRS.map(M => M + ' ' + (100 * byM[M][M] / (byM[M].c + byM[M].o + byM[M].h)).toFixed(0) + '%').join('、')); }
  // (h) 櫃檯：sellQuote＝choose sell（每張、每個時機）；舊的 run 沒有 gifts 欄也能交還；交還的禮物買回來＝買的（半價）
  { let n = 0;
    for (let s = 0; s < 30; s++) {
      const run = EN.newRun(C, { seedKey: 'sq-' + s, runNo: 2, ace: TIERS[s % 3], seeds: s % 2 ? [Object.keys(C.cards).filter(id => !C.cards[id].tier && !C.bargain.pool.includes(id)).sort()[20 + s]] : [] });
      if (s % 5) EN.choose(run, C, EN.bargainPolicy(run, C));
      if (s % 7 === 3) run.pending = { type: 'retry', enemyId: run.order[0], free: false };
      for (const id of run.bag.concat(['nope', C.aces[run.ace]])) {
        const r2 = JSON.parse(JSON.stringify(run)), q = EN.sellQuote(r2, C, id), m = r2.money, r = EN.choose(r2, C, { type: 'sell', cardId: id });
        if (q.ok !== r.ok || (!q.ok && q.error !== r.error) || (q.ok && (r2.money !== m + q.earn || !!r.effects[0].reclaim !== !!q.reclaim))) ok(false, 'sellQuote = choose sell', { s, id, q, r }); else pass++;
        n++;
      }
    }
    ok(n > 200, 'sellQuote parity cases', n);
    const run = EN.newRun(C, { seedKey: 'oldgift', runNo: 2, ace: 'pearl' }); EN.choose(run, C, EN.bargainPolicy(run, C)); delete run.gifts;
    const g = C.gifts.pearl[1], r = EN.choose(run, C, { type: 'sell', cardId: g });
    ok(r.ok && r.effects[0].reclaim === 'gift' && Array.isArray(run.gifts) && !run.gifts.includes(g) && run.gifts.length === 3 && !EN.isGift(run, C, g), 'old run without run.gifts: hand back a gift (gifts list rebuilt)', run.gifts);
    const key = Object.keys(run.shop.bins).find(k => run.shop.bins[k].length); run.shop.bins[key].push(g); run.money = 9999;
    ok(EN.choose(run, C, { type: 'buy', key, cardId: g }).ok && !EN.isGift(run, C, g) && EN.sellQuote(run, C, g).earn === EN.sellValue(C, card(g)) && EN.sellQuote(run, C, g).reclaim === null, 'a handed-back gift bought again = a bought card (half price)');
    // 有上限（--set bagMax=8 舊規則對照）：take dropId、buy sellId 照舊（不回 counterOnly）
    const B0 = CFG.bagMax;
    try { CFG.bagMax = 8; const r8 = EN.newRun(C, { seedKey: 'lim8', runNo: 2, ace: 'hall' }); EN.choose(r8, C, EN.bargainPolicy(r8, C)); r8.bag.push(Object.keys(C.cards).find(id => !C.cards[id].tier && !r8.bag.includes(id)));
      ok(EN.bagFull(r8), 'bagMax=8: bag of 8 is full');
      r8.pending = { type: 'reward', enemyId: 'copycat', prologue: false, pos: 1, cls: 'normal', cards: [Object.keys(C.cards).find(id => !C.cards[id].tier && !r8.bag.includes(id) && C.cards[id].c === 5)], relics: [], need: 'card', cardDone: false, relicDone: true };
      const rt = EN.choose(r8, C, { type: 'take', cardId: r8.pending.cards[0], dropId: r8.bag[5] });
      ok(rt.ok && rt.effects[0].loseCard, 'bagMax=8: take with dropId still the old rule', rt); }
    finally { CFG.bagMax = B0; } }
  // (i) 主屬性以前存的進行中 run（沒有 run.mainFrom；合併審查 11-16）：fixMain＝這一輪開打過就照舊牌組打完這一輪（說情重打＝同一副牌）、下一輪第 1 位起才帶；
  //     還沒人上場＝馬上帶；打到一半那場已經帶 e.main＝馬上帶；newRun＝1、fixMain 不改
  { const noMain = (run, id, pos) => EN.enemyDef(C, id, { pos, cls: EN.classAt(pos), seedKey: run.seedKey, runNo: run.runNo, playerAce: run.ace, bossAce: run.bossAce, bossCard: run.bossCard, tier: run.tier });
    let n = 0;
    for (let s = 0; s < 24; s++) for (const pos of [1, 3, 5, 7]) {
      const run = EN.newRun(C, { seedKey: 'fm-' + s, runNo: 2, ace: TIERS[s % 3], prologue: false, relics: [] });
      if (s === 0 && pos === 1) ok(run.mainFrom === 1 && EN.fixMain(run) === false && run.mainFrom === 1, 'newRun: mainFrom 1, fixMain leaves it');
      EN.choose(run, C, EN.bargainPolicy(run, C)); if (pos > 1) EN.jumpTo(run, C, pos);
      const fresh = JSON.parse(JSON.stringify(run)); delete fresh.mainFrom;
      if (!(EN.fixMain(fresh) && fresh.mainFrom === (pos % 5 === 1 ? 1 : Math.ceil(pos / 5) * 5 + 1))) ok(false, 'fixMain: before anyone of this round played → 1; mid-round (idx>0) → next round', { pos, mf: fresh.mainFrom }); else pass++;
      EN.startFight(run, C, {});
      const old = JSON.parse(JSON.stringify(run)); delete old.mainFrom; delete old.duel.e.main;   // 舊版的對決狀態沒有 e.main
      const cur = JSON.parse(JSON.stringify(run)); delete cur.mainFrom;                         // 主屬性以後開打的（有 e.main）
      EN.fixMain(old); EN.fixMain(cur);
      const nxt = Math.ceil(pos / 5) * 5 + 1;
      if (old.mainFrom !== nxt || cur.mainFrom !== 1) ok(false, 'fixMain mid-duel: old duel → next round; duel with e.main → 1', { pos, old: old.mainFrom, cur: cur.mainFrom }); else pass++;
      const d = old.duel; d.p.hp = 0; d.over = { win: false, by: 'hp', pHp: 0, eHp: d.e.hp }; EN.finishFight(old, C, d);
      if (old.pending && old.pending.type === 'retry') {
        const id = old.pending.enemyId;
        if (EN.guestDef(old, C, id, pos).main !== null || !EN.roundGuests(old, C).every(g => g.main == null)) ok(false, 'old run: no main this round (guestDef, roundGuests)', { pos }); else pass++;
        EN.choose(old, C, { type: 'retry' }); EN.startFight(old, C, {});
        const nd = noMain(old, id, pos).deck.map(c => c.id);
        eq(old.duel.e.deckIds.slice(0, nd.length), nd, 'old run retry = same deck as before main (pos ' + pos + ')');
        EN.jumpTo(old, C, nxt);
        if (!EN.guestDef(old, C, old.order[0], nxt).main || !EN.roundGuests(old, C).every(g => g.main)) ok(false, 'old run: main from the next round', { pos, nxt }); else pass++;
        n++;
      }
    }
    ok(n >= 60, 'fixMain retry cases', n); }
});

section('24 讀牌加難（11-17，scratchpad v5/harder DESIGN §2–§3）：改版前黃金、每手 8 次亂數、relOf／streakOf、讀你落點、放水讀心、被唬到多扣、提示分級、舊存檔、選句不重複（H1）', () => {
  const NT = EN.hintTableOf(C);
  ok(NT && NT.one && NT.half && Array.isArray(NT.none) && NT.voice, 'hintTableOf(C) = new shape {one, half, none, voice}');
  ok(ATTRS.every(a => NT.one[a].slice(0, 5).join() === HINTS[a].join() && NT.one[a].length >= 45 && NT.half[a].length >= 12) && NT.none.length >= 30, 'one[a] = C.hints 5 + hintLines; half ≥12 each; none ≥30',
    ATTRS.map(a => [NT.one[a].length, NT.half[a].length]).concat([NT.none.length]));
  ok(EN.hintTableOf(Object.assign({}, C, { hintLines: undefined })).c.join() === HINTS.c.join(), 'no hintLines → old shape {c,o,h}');
  const startNT = (id, tier, seed, o = {}) => {
    const eDef = Object.assign(EN.enemyDef(C, id, o.pos != null ? { pos: o.pos, seedKey: 'nt-' + seed, runNo: 1, playerAce: tier, bossAce: otherTier(tier, seed) } : {}), o.eOver || {});
    return EN.startDuel(pDefFor(tier, o), eDef, { seed, enemyAce: eDef.ace || null, hintTable: NT, hintSeen: o.hintSeen });
  };
  // (1) 改版前黃金：直接開打（假卡、舊形狀提示表、沒有讀牌欄位）事件序列一字不差（雜湊＝改版前 engine 跑的；scratchpad v5/harder/build/golden.mjs）
  { const GOLD = ['14b2a32b', '26256553', '196cd7eb', 'c6ef82e7', '33b6b8a8', 'a3cb20c6', 'b6b48e73', '781a409c', 'fc17bfca', 'de439844', '4f4a7aa6', '6e692525', 'dc5c547a', '7e3661bf', 'e417d8a4', '4aa8f278',
      '76c975c4', '96a92f50', '8614b0d2', '9fe12af3', '49663be9', '47922c27', '9d6fd28d', 'f772e1e6', '9acb1db3', 'd30c175', '7bc9ff36', '141ce2bf', '758fd3cf', '43374581', 'c0349f2a', 'dac26d91',
      '757630cc', 'f83d8453', '439b9f09', 'bce0378d', 'b641324e', '457483cb', 'e5eb20df', 'b66056b7', '852f1d2b', 'f25075b3', '91d2a202', '5a5dba04', 'bda6d3a0', 'e00553eb', '7650a7d2', '2c167f27'];
    const PROJ = e => { const o = Object.assign({}, e); delete o.why; delete o.rel; delete o.script; if (o.hint) o.hint = { attr: o.hint.attr, line: o.hint.line }; return o; };
    const OLDH = { c: ['c1', 'c2', 'c3', 'c4', 'c5'], o: ['o1', 'o2', 'o3', 'o4', 'o5'], h: ['h1', 'h2', 'h3', 'h4', 'h5'] };
    const STARS = [[1, 5, 1], [5, 1, 1], [1, 1, 5], [2, 4, 3], [4, 2, 1], [1, 3, 5], [3, 5, 3], [5, 3, 2], [2, 2, 4], [4, 4, 1], [3, 1, 4], [2, 5, 5]];
    let same = 0;
    for (let s = 1; s <= 48; s++) {
      const pBag = []; for (let i = 0; i < 8; i++) { const t = STARS[(s + i * 5) % STARS.length]; pBag.push(mkCard('p' + i, t[0], t[1], t[2])); }
      const eDeck = []; for (let i = 0; i < 9; i++) { const t = STARS[(s * 3 + i * 7) % STARS.length]; eDeck.push(mkCard('e' + i, t[0], t[1], t[2])); }
      const planner = ['easy', 'normal', 'hard'][s % 3];
      const co = { easy: { w: 0.45, nz: 2.4, mercy: false }, normal: { w: 0.6, nz: 1.4, mercy: true }, hard: { w: 0.7, nz: 0.8, mercy: true } }[planner];
      const pDef = { hp: 12, maxHp: 12, atk: s % 3, def: s % 2, noteText: null, bag: pBag, ace: s % 4 ? mkCard('ace', 3, 2, 6, 'heresy') : null, relics: [] };
      const eDef = { id: 'g' + s, name: 'g', hp: 12 + (s % 3), taste: ['coh', 'och', 'hco'][s % 3], deck: eDeck, honesty: 'sometimes', q: [1, 0.8, 0.6, 0.45][s % 4], planner, coef: co,
        qMercy: s % 5 ? 0.8 : 0, atk: s % 3, def: (s >> 1) % 2, elite: false, boss: s % 6 === 0, main: s % 2 ? ['c', 'o', 'h'][s % 3] : null };
      if (eDef.main && s % 3) eDef.mainBias = 1.5;
      if (s % 4 === 1) eDef.mercyP = 0.5;
      const { duel, events } = EN.startDuel(pDef, eDef, { seed: s * 7919, enemyAce: s % 6 === 0 ? mkCard('eace', 6, 2, 3, 'hall') : null, hintTable: OLDH });
      const evs = events.slice(); let g = 0;
      while (!duel.over && g++ < 20) { const L = EN.legalActions(duel); evs.push(...EN.resolveTurn(duel, L[(duel.n * 7 + s) % L.length])); }
      if (EN.fnv1a32(JSON.stringify(evs.map(PROJ))).toString(16) === GOLD[s - 1]) same++;
    }
    eq(same, 48, 'no read／hintMix → event streams = pre-change engine (48 golden duels)'); }
  // (2) 每手亂數照樣 8 次（讀心、兩種唬法、提示分級、選句都用雜湊）；新形狀的表、第 3–40 位
  { const count = d => { const c = JSON.parse(JSON.stringify(d)); c.plan = null; c.n--; const b = c.rng; EN.beginHand(c, []); return rngCalls(b, c.rng); };
    let bad = 0, n = 0, kinds = { one: 0, half: 0, none: 0 }, whys = {};
    for (let s = 1; s <= (QUICK ? 60 : 240); s++) {
      const id = ENEMY_IDS[1 + (s % 9)], { duel } = startNT(id, TIERS[s % 3], s * 13 + 1, { pos: posFor(id, s % 3) + 5 * (s % 4) });
      const R = lcg(s);
      while (!duel.over) {
        if (count(duel) !== 8) bad++; n++;
        kinds[duel.plan.hint.kind]++; whys[duel.plan.why] = (whys[duel.plan.why] || 0) + 1;
        EN.resolveTurn(duel, EN.policies.random(duel, R));
      }
    }
    ok(bad === 0 && n > (QUICK ? 100 : 500), 'beginHand takes 8 RNG with read／hintMix on', { bad, n });
    ok(kinds.half > 0 && kinds.none > 0 && kinds.one > kinds.half && whys.read > 0 && whys.readHonest > 0 && whys.bluff > 0, 'all hint kinds and why read／readHonest／bluff happen', { kinds, whys }); }
  // (3) relOf／streakOf：手造 st（只看明指那手；半指／不露斷開；第 1 手沒有）
  { const L = (pAttr, h, hk) => ({ pAttr, hint: h, hk: hk || 'one' });
    const st = (log, lastHk) => { const l = log[log.length - 1]; return { e: { rho: 0.5, rhoMul: 2, rhoCap: 0.9, rMercy: 0.7 }, p: {}, log, last: l ? { pAttr: l.pAttr, hint: { attr: l.hint, kind: lastHk || l.hk } } : null }; };
    eq(EN.relOf(st([])), null, 'relOf: hand 1 → null');
    eq([EN.relOf(st([L(COUNTER_OF.c, 'c')])), EN.relOf(st([L('c', 'c')])), EN.relOf(st([L(BEATS.c, 'c')]))], ['counter', 'mirror', 'third'], 'relOf counter／mirror／third');
    eq(EN.relOf(st([L(COUNTER_OF.c, 'c', 'half')])), null, 'relOf: last hand half → null');
    eq(EN.relOf(st([L(COUNTER_OF.c, 'c', 'none')])), null, 'relOf: last hand none → null');
    eq(EN.streakOf(st([L(COUNTER_OF.o, 'o'), L(COUNTER_OF.h, 'h'), L(COUNTER_OF.c, 'c')])), 3, 'streakOf: 3 counters in a row');
    eq(EN.streakOf(st([L(COUNTER_OF.o, 'o', 'half'), L(COUNTER_OF.h, 'h'), L(COUNTER_OF.c, 'c')])), 2, 'streakOf: half breaks the streak');
    eq(EN.streakOf(st([L('o', 'o'), L(COUNTER_OF.h, 'h'), L(COUNTER_OF.c, 'c')])), 2, 'streakOf: another answer breaks the streak');
    eq(EN.streakOf(st([L(BEATS.o, 'o'), L('h', 'h')])), 1, 'streakOf: one mirror'); }
  // (4)(5)(6)(7)：無限試煉第 3–40 位、新形狀的表，每手檢查讀你落點、王牌／耳機不讀、放水讀心、被唬到多扣（preview＝resolve）
  { let reads = 0, honestReads = 0, feints = 0, bad = 0, mercyChecked = 0;
    for (let s = 1; s <= (QUICK ? 80 : 600); s++) {
      const id = ENEMY_IDS[1 + (s % 9)], pos = posFor(id, s % 3) + 5 * (s % 4), { duel } = startNT(id, TIERS[s % 3], s * 17 + 3, { pos, hp: 5 + (s % 6), maxHp: 12, atk: 1 + (s % 3), def: s % 2 });
      const R = lcg(s * 3);
      while (!duel.over) {
        const pl = duel.plan, v = EN.view(duel), rel = EN.relOf(duel);
        if (pl.why === 'read' || pl.why === 'readHonest') {
          reads++; if (pl.why === 'readHonest') honestReads++;
          const pred = pl.rel === 'counter' ? COUNTER_OF[pl.hint.attr] : pl.rel === 'mirror' ? pl.hint.attr : BEATS[pl.hint.attr];
          if (!rel || pl.rel !== rel || pos < 3 || pl.attr !== COUNTER_OF[pred] || duel.e.hand[pl.idx].tier) { if (bad++ < 5) ok(false, 'read: COUNTER_OF[predicted], only with a rel, never the ace', { pl, rel, pos }); }
        }
        if ((pl.why === 'ace' || pl.why === 'headphone') && pl.attr !== pl.hint.attr) { if (bad++ < 5) ok(false, 'ace／headphone hand → honest', pl); }
        // 放水讀心：rhoNow＝ρ'×(1−0.7×m×p)；ρ'＝ρ（連兩手同一種應對 ×2，最多 .9）
        if (rel && duel.e.rho > 0) {
          const base = EN.streakOf(duel) >= 2 ? Math.min(0.9, duel.e.rho * 2) : duel.e.rho, m = mercyOfT(duel), pm = mercyPT(pos), want = base * (1 - 0.7 * m * pm);
          if (Math.abs(v.honesty.rhoNow - want) > 1e-9) { if (bad++ < 5) ok(false, 'view.honesty.rhoNow = ρ\'×(1−0.7·m·p)', { got: v.honesty.rhoNow, want, m, pm }); } else mercyChecked++;
        } else if (v.honesty.rhoNow !== 0) { if (bad++ < 5) ok(false, 'no rel → rhoNow 0', v.honesty); }
        // 被唬到多扣：每個合法動作 preview＝resolve；feint 那句只在「看得出來的唬（明指出的不是那色／半指出他說不出那色）＋被剋」
        const acts = EN.legalActions(duel), act = acts[Math.floor(R() * acts.length)], pv = EN.preview(duel, act, { i: pl.idx, attr: pl.attr });
        const h = pl.hint, look = (h.kind || 'one') === 'one' ? pl.attr !== h.attr : h.kind === 'half' ? pl.attr === h.not : false;
        const cl = clashOf(EN.resolveTurn(duel, act));
        const hasF = (cl.notes || []).some(x => x && x.stat === 'feint'), want = !!duel.e.hit && look && cl.kind === 'countered';
        if (hasF) feints++;
        if (hasF !== want || JSON.stringify(sig(pv)) !== JSON.stringify(sig(cl))) { if (bad++ < 5) ok(false, 'feint note iff visible bluff + countered (hit ' + duel.e.hit + '); preview = resolve', { hasF, want, look, kind: cl.kind, pv: sig(pv), cl: sig(cl) }); }
      }
    }
    ok(bad === 0, 'read／mercy／feint checks', bad);
    ok(reads > (QUICK ? 5 : 40) && honestReads > 0 && feints > (QUICK ? 3 : 20) && mercyChecked > (QUICK ? 20 : 150), 'read, readHonest, feint and mercy-read all happened', { reads, honestReads, feints, mercyChecked }); }
  // (8) 序章男子、直接開打（沒有位數）：讀心、分級全關（hand 1–6 都明指、why 沒有 read）
  { let bad = 0;
    for (let s = 1; s <= 60; s++) {
      const { duel } = startNT(s % 2 ? 'man' : ENEMY_IDS[1 + (s % 9)], TIERS[s % 3], s);
      ok(!(duel.e.rho > 0) && !(duel.e.half > 0) && !(duel.e.none > 0) && !(duel.e.hit > 0) && !(duel.e.beta < 1), 'no pos → no read fields', duel.e);
      const R = lcg(s);
      while (!duel.over) { if (duel.plan.hint.kind !== 'one' || /^read/.test(duel.plan.why)) bad++; EN.resolveTurn(duel, EN.policies.random(duel, R)); }
    }
    eq(bad, 0, 'prologue／direct duel: always one, never read'); }
  // (9) 舊存檔：進行中的對決沒有新欄位（e.rho…hit、hkey、hintSeen；plan.hint 沒有 kind）→ 載入續打不壞、不讀心
  { let bad = 0, done = 0;
    for (let s = 1; s <= 80; s++) {
      const id = ENEMY_IDS[1 + (s % 9)], { duel } = startNT(id, TIERS[s % 3], s * 7, { pos: 12 + (s % 20) });
      const old = JSON.parse(JSON.stringify(duel));
      for (const k of ['rho', 'rhoMul', 'rhoCap', 'rMercy', 'beta', 'half', 'none', 'hit', 'hkey']) delete old.e[k];
      delete old.hintSeen; old.hintTable = JSON.parse(JSON.stringify(HINTS)); old.plan.hint = { attr: old.plan.hint.attr || old.plan.attr, line: 'c1' };
      const R = lcg(s);
      try { while (!old.over) { const cl = clashOf(EN.resolveTurn(old, EN.policies.random(old, R))); if (!cl || /^read/.test(cl.why) || (old.plan && old.plan.hint.kind !== 'one')) bad++; } done++; } catch (e) { bad++; if (bad < 3) ok(false, 'old duel threw', e.message); }
    }
    ok(bad === 0 && done === 80, 'old in-progress duel JSON: plays on, no read, all one', { bad, done }); }
  // (10) 選句 H1：100 趟打到第 10 位，同一句 0 次重複、同一場 0 次；打到第 30 位重複率 ≤10%；個性句只出現在那位客人；半指的句子＝他不出那色（not）
  { const owner = {}; for (const [lid, who] of Object.entries(NT.voice)) owner[lid] = who;
    const halfOf = {}; for (const a of ATTRS) for (const lid of NT.half[a]) halfOf[lid] = a;
    const oneOf = {}; for (const a of ATTRS) for (const lid of NT.one[a]) oneOf[lid] = a;
    const noneSet = new Set(NT.none);
    let rep10 = 0, repDuel = 0, n10 = 0, n30 = 0, rep30 = 0, badVoice = 0, badKind = 0, runs10 = 0;
    const RUNS = QUICK ? 30 : 100;
    for (let i = 0; i < RUNS; i++) {
      const run = EN.newRun(C, { seedKey: 'h1-' + i, runNo: 1, ace: TIERS[i % 3], prologue: false });
      const seen = new Set(); let reached10 = false;
      for (let g = 0; g < 400; g++) {
        if (run.over && !run.pending) break;
        if (EN.canBargainPick(run)) { EN.choose(run, C, EN.bargainPolicy(run, C)); continue; }
        const step = EN.nextStep(run);
        if (step === 'level' || step === 'reward' || step === 'retry') { const ch = EN.runPolicy(run, C); if (!EN.choose(run, C, ch).ok) break; continue; }
        if (step !== 'fight' || run.pos > 30) break;
        const pos = run.pos, f = EN.startFight(run, C, {}), d = f.duel, inDuel = new Set();
        let k = 0;
        while (!d.over && k++ < 12) {
          const h = d.plan.hint, lid = h.line;
          if (owner[lid] && owner[lid] !== d.e.id) badVoice++;
          if ((h.kind === 'one' && oneOf[lid] !== h.attr) || (h.kind === 'half' && (halfOf[lid] !== h.not || h.not === h.attr)) || (h.kind === 'none' && !noneSet.has(lid))) badKind++;
          if (inDuel.has(lid)) repDuel++; inDuel.add(lid);
          if (pos <= 10) { n10++; if (seen.has(lid)) rep10++; } else { n30++; if (seen.has(lid)) rep30++; }
          seen.add(lid);
          EN.resolveTurn(d, EN.policies.thoughtful(d, lcg(i * 31 + k), {}, C));
        }
        if (pos >= 10 && d.over && d.over.win) reached10 = true;
        EN.finishFight(run, C);
      }
      if (reached10) runs10++;
      ok(Array.isArray(run.hintSeen) && run.hintSeen.length <= 200 && new Set(run.hintSeen).size === run.hintSeen.length, 'run.hintSeen ≤200 ids, no duplicates', run.hintSeen && run.hintSeen.length);
    }
    ok(rep10 === 0 && repDuel === 0, 'H1: to pos 10 no line twice in a run; never twice in a duel', { rep10, repDuel, n10 });
    ok(n30 > 500 && rep30 / n30 <= 0.10, 'H1: pos 11–30 repeat rate ≤10%', { rep30, n30, rate: n30 ? (rep30 / n30).toFixed(3) : null });
    ok(badVoice === 0 && badKind === 0, 'voice lines only from that guest; line kind/color = hint kind/attr/not', { badVoice, badKind });
    ok(runs10 > RUNS / 2, 'most runs reach pos 10 (thoughtful)', runs10);
    console.log('     H1: to pos 10 ' + n10 + ' hands, repeats ' + rep10 + '; pos 11–30 ' + n30 + ' hands, repeats ' + rep30 + ' (' + (n30 ? (100 * rep30 / n30).toFixed(1) : '—') + '%); runs to pos 10 ' + runs10 + '/' + RUNS); }
});

// 11-17 本場紀錄（scratchpad v5/recap DESIGN §D）：duel.log 每手多記的欄位＝那一手 clash 事件（recap.js 把一筆組回 clash 形狀給 clashText），舊欄位不變、不取亂數
section('25 本場紀錄（11-17）：duel.log 新欄位＝clash 事件（卡、星、王牌、by、not、rel、notes、script、apex）；舊欄位照舊；每手照樣 8 次亂數；存讀檔一樣', () => {
  const OLD = ['n', 'pAttr', 'eAttr', 'hint', 'hk', 'line', 'bluff', 'why', 'kind', 'toE', 'toP', 'blocked', 'pHp', 'eHp'];
  const NEW = ['pId', 'eId', 'pStar', 'eStar', 'by', 'not', 'rel', 'notes'];
  const OPT = ['heal', 'ace', 'eAce', 'script', 'apex'];
  let hands = 0, withNotes = 0, aces = 0, eAces = 0, halves = 0, rels = 0, rngOk = 0, rngN = 0;
  const NT = EN.hintTableOf(C);
  for (let s = 1; s <= (QUICK ? 60 : 240); s++) {
    const id = ENEMY_IDS[s % ENEMY_IDS.length], tier = TIERS[s % 3], trial = s % 4 !== 0;
    const eDef = EN.enemyDef(C, id, trial && !C.enemies[id].prologue ? { pos: posFor(id, s) + 5 * (s % 5), seedKey: 'rc-' + s, runNo: 1, playerAce: tier, bossAce: otherTier(tier, s) } : {});
    const { duel } = EN.startDuel(pDefFor(tier, { relics: relicSet(s) }), eDef, { seed: s * 131, enemyAce: eDef.ace || (eDef.boss ? card(C.aces[otherTier(tier, s)]) : null), hintTable: NT });
    const R = lcg(s);
    let g = 0;
    while (!duel.over && g++ < 12) {
      const act = EN.policies[['thoughtful', 'random', 'high'][s % 3]](duel, R, {}, C);
      const r0 = duel.rng;
      const evs = EN.resolveTurn(duel, act), cl = clashOf(evs), L = duel.log[duel.log.length - 1], dr = evs.find(e => e.t === 'draw');
      if (!duel.over && !(dr && dr.reshuffled)) { rngN++; if (rngCalls(r0, duel.rng) === 8) rngOk++; }
      hands++;
      ok(Object.keys(L).every(k => OLD.includes(k) || NEW.includes(k) || OPT.includes(k)) && OLD.concat(NEW).every(k => k in L), 'log keys = old + new (+ optional)', Object.keys(L));
      ok(L.pId === cl.pCard.id && L.eId === cl.eCard.id && L.pStar === cl.pStar && L.eStar === cl.eStar && L.by === (cl.by == null ? null : cl.by)
        && L.not === cl.hint.not && L.rel === cl.rel && !!L.ace === !!cl.ace && !!L.eAce === !!cl.eAce, 'log card / star / by / not / rel = clash', { L, cl: { p: cl.pCard.id, e: cl.eCard.id, ps: cl.pStar, es: cl.eStar, by: cl.by, not: cl.hint.not, rel: cl.rel } });
      ok(JSON.stringify(L.notes) === JSON.stringify(cl.notes) && L.notes !== cl.notes, 'log notes = clash notes (a copy)', [L.notes, cl.notes]);
      ok(L.hint === cl.hint.attr && L.hk === cl.hint.kind && L.line === cl.hint.line && L.bluff === cl.bluff && L.why === cl.why && L.kind === cl.kind && L.toE === cl.toE && L.toP === cl.toP
        && L.blocked === cl.blocked && L.pHp === cl.pHp && L.eHp === cl.eHp, 'old log fields unchanged (= clash)');
      ok(!('apex' in L) && !('script' in L), 'flag off: no apex / script keys');
      if (L.notes.length) withNotes++; if (L.ace) aces++; if (L.eAce) eAces++; if (L.hk === 'half') halves++; if (L.rel) rels++;
    }
    // 存讀檔：log 照樣 JSON 存得起來，讀回來接著打一樣
    if (!duel.over) {
      const a = JSON.parse(JSON.stringify(duel)), b = JSON.parse(JSON.stringify(duel));
      const R1 = lcg(s + 7), R2 = lcg(s + 7);
      while (!a.over) EN.resolveTurn(a, EN.policies.random(a, R1));
      while (!b.over) EN.resolveTurn(b, EN.policies.random(b, R2));
      eq(a.log, b.log, 'saved duel → same log');
    }
  }
  ok(hands > (QUICK ? 150 : 600) && withNotes > 10 && aces > 5 && halves > 5 && rels > 5, 'covered notes / ace / half / rel', { hands, withNotes, aces, eAces, halves, rels });
  ok(rngN > 100 && rngOk === rngN, 'still 8 RNG calls per hand', { rngOk, rngN });
  // 教學那場（script）：log 記 script；頂點卡試做（apex）：log 記 apex（同 clash 的 apex 欄）
  { const t = startFor('man', 'hall', 7, { tutorial: true, script: C.tutorial.script.hall }).duel;
    const cl = clashOf(EN.resolveTurn(t, EN.legalActions(t)[0]));
    ok(t.log[0].script === true && cl.script === true, 'tutorial duel: log.script = clash.script'); }
  { let apx = 0;
    for (let s = 1; s <= 30; s++) {
      const tier = TIERS[s % 3], L0 = EN.apexList ? EN.apexList(C, tier) : [], aceId = L0.length ? L0[s % L0.length].card : null;
      if (!aceId) break;
      const pDef = EN.playerDef(C, { bag: [...C.gifts[tier], ...BP3], ace: tier, aceId, relics: [] }, { apex: true });
      const eDef = EN.enemyDef(C, 'critic', { pos: 4, seedKey: 'rca-' + s, runNo: 1, playerAce: tier });
      const { duel } = EN.startDuel(pDef, eDef, { seed: s * 17, apex: true, hintTable: NT });
      if (!duel.apexMode) break;
      const R = lcg(s);
      while (!duel.over) {
        let act = EN.policies.thoughtful(duel, R, {}, C);
        if (s % 2 && EN.canApex(duel)) act = Object.assign({}, act, { apex: true });
        if (!EN.isLegal(duel, act)) { const b = Object.assign({}, act); delete b.apex; act = b; }
        const cl = clashOf(EN.resolveTurn(duel, act)), L = duel.log[duel.log.length - 1];
        ok('apex' in L && JSON.stringify(L.apex) === JSON.stringify(cl.apex), 'apex flag: log.apex = clash.apex', [L.apex, cl.apex]);
        if (L.apex) apx++;
      }
    }
    ok(apx > 0 || !C.apexTrial, 'apex hands seen', apx); }
});

section('26 組牌快取（第 B 波 WP2-0；SPEC-B §6.2、定稿 C5）：EN._noCache 開／關 → guestDef／trialDeck／radioPool 結果 JSON 相同（200 個 seed × 第 1–15 位）；記住的不共用物件；換卡池物件、換 trial 設定都對', () => {
  const S = QUICK ? 40 : 200, CELLS = (C.tunes && C.tunes.order) || [];
  ok(EN._noCache === false, '_noCache defaults to false', EN._noCache);
  // 同一個呼叫：快取關（原本的寫法）、快取開（第一次算、第二次吃記住的）三次結果 JSON 相同
  const both = (f, name) => {
    let a, b, c;
    try { EN._noCache = true; a = JSON.stringify(f()); } finally { EN._noCache = false; }
    b = JSON.stringify(f()); c = JSON.stringify(f());
    if (a === b && b === c) pass++; else ok(false, name, { off: a && a.slice(0, 160), on: b && b.slice(0, 160), again: c === b });
  };
  let n = 0;
  for (let s = 0; s < S; s++) {
    const run = EN.newRun(C, { seedKey: 'nocache-' + s, runNo: 1 + (s % 3), ace: TIERS[s % 3] });
    for (let rd = 1; rd <= 3; rd++) {
      EN.jumpTo(run, C, 5 * rd - 4);
      run.order.forEach((id, i) => {
        const pos = 5 * (rd - 1) + 1 + i;
        both(() => EN.guestDef(run, C, id, pos), 'guestDef same with/without cache (seed ' + s + ', pos ' + pos + ')');
        both(() => EN.trialDeck(C, id, pos, { seedKey: run.seedKey, runNo: run.runNo }), 'trialDeck (no main) same with/without cache (seed ' + s + ', pos ' + pos + ')');
        n += 2;
      });
      if (CELLS.length) { const cell = CELLS[(s + rd) % CELLS.length]; both(() => EN.radioPool(run, C, cell), 'radioPool same with/without cache (seed ' + s + ', ' + cell + ')'); n++; }
    }
  }
  ok(n >= S * 33, 'compared calls', n);
  // 記住的牌單不外流：改了回傳的牌組（加星的複本、陣列），下一次同一組輸入照樣是原本的結果
  { const run = EN.jumpTo(EN.newRun(C, { seedKey: 'nocache-mut', runNo: 1, ace: 'hall' }), C, 11);
    const id = run.order[0], g1 = EN.guestDef(run, C, id, 11), j1 = JSON.stringify(g1);
    const c0 = g1.deck[0], keep = C.cards[c0.id].c;
    c0.c = 99; g1.deck.push(c0); g1.deck.reverse();
    eq(JSON.stringify(EN.guestDef(run, C, id, 11)), j1, 'cached deck: mutating a returned deck does not leak into the next call');
    ok(C.cards[c0.id].c === keep, 'returned cards are copies (content card untouched)'); }
  // 換 trial 設定（同一個卡池物件：mainShare 0、minPool 大、難度階梯）、換卡池物件（只有核心＋客人牌單）：開／關一樣
  const deckOf = (base, patch) => Object.assign({}, base, { trial: Object.assign({}, base.trial, { curve: Object.assign({}, base.trial.curve, { deck: Object.assign({}, base.trial.curve.deck, patch) }) }) });
  const CORE = {}; for (const id of Object.keys(C.cards)) if (!C.cards[id].pool) CORE[id] = C.cards[id];
  const VAR = [['mainShare 0', deckOf(C, { mainShare: 0 })], ['minPool 4000', deckOf(C, { minPool: 4000 })], ['minPool 1', deckOf(C, { minPool: 1 })],
    ['tier 1', Object.assign({}, C, { trial: Object.assign({}, C.trial, { tiers: [{ curve: { deck: { floorBase: 6, mainShare: 1 } } }] }) })],
    ['core cards only', Object.assign({}, C, { cards: CORE })], ['core cards, minPool 300', deckOf(Object.assign({}, C, { cards: CORE }), { minPool: 300 })]];
  for (const [name, CV] of VAR) for (let s = 0; s < (QUICK ? 6 : 20); s++) for (const pos of [1, 4, 9, 15, 40, 120]) {
    const id = ENEMY_IDS.filter(x => x !== 'man')[(s + pos) % (ENEMY_IDS.length - 1)];
    for (const main of [undefined, 'c', 'o', 'h']) both(() => EN.trialDeck(CV, id, pos, { seedKey: 'nocache-v' + s, runNo: 1, main, tier: name === 'tier 1' ? 1 : 0 }), name + ': trialDeck same with/without cache (seed ' + s + ', pos ' + pos + ', main ' + main + ')');
  }
});

section('27 第 B 波 WP2（SPEC-B §1、§2.2、§3、§4.3／4.5、§5.2、§6.3）：卡池 5,045 張與 catalogId、mapIds、一檔貨（配額、抽檔、輪流上架、買走、換輪、說情、序章、fixLot、jumpTo、lot on／off 配件特價箱相同、沒有 all 的退路）、想要清單加權、今日推薦 dailyPick／dailyReward', () => {
  const sortObj = o => Object.keys(o).sort().reduce((m, k) => (m[k] = o[k], m), {});
  const clone = o => JSON.parse(JSON.stringify(o));
  const keysOf = CC => EN.SHOP_ORDER.filter(k => CC.bins[k] && !CC.bins[k].display);
  const KEYS = keysOf(C), LT = EN.lotCfg(C), QT = EN.lotQuota(C), BG = new Set([].concat(C.bargain.pool, C.bargain.retired || []));
  const showOf = k => k === 'feature' ? LT.featureShow : LT.show;
  const overlap = (a, b) => a.filter(x => b.includes(x)).length;
  const forceLose = run => { const f = EN.startFight(run, C, {}); let g = 0; while (!f.duel.over && g++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'countered', toE: 0, toP: 99 } }); return EN.finishFight(run, C); };
  // (a) 卡池（資料面；check-content poolProblems 也守）
  { const CJ = require(path.join(HERE, '../cards.js')), LEG = require(path.join(HERE, '../tools/legacy-ids.json'));
    const ids = Object.keys(C0.cards);
    eq(ids.length, 5045, 'C.cards has 5,045 cards');
    eq(ids.filter(id => { const c = C0.cards[id]; return !(c && c.id === id && id === C0.catalogId(c.artist, c.album)); }), [], 'every key === card.id === catalogId(artist, album)');
    const core = ids.filter(id => !C0.cards[id].pool), pool = ids.filter(id => C0.cards[id].pool === true);
    eq([core.length, pool.length], [368, 4677], 'core 368 + pool:true 4,677');
    eq(pool.filter(id => { const c = C0.cards[id]; return !(c.bin && C0.bins[c.bin] && c.tune && !c.tier); }), [], 'pool cards: bin (a real bin), tune, no tier');
    eq(Object.keys(CJ).length, 368, "require('cards.js') is still the core 368 (A4)"); ok(C0.cards !== CJ, 'C.cards is a new object, not the cards.js export');
    ok(C0.poolLoaded === true, 'C.poolLoaded');
    eq(sortObj(C0.legacyIds()), sortObj(LEG), 'C.legacyIds() = tools/legacy-ids.json'); eq(Object.keys(LEG).length, 368, 'legacy-ids 368');
    let sub = [], tot = 0; const seen = new Set(), dup = [];
    for (const k of Object.keys(C0.bins)) { const b = C0.bins[k]; if (!b.pool.every(id => b.all.includes(id))) sub.push(k); tot += b.all.length; for (const id of b.all) { if (seen.has(id)) dup.push(id); seen.add(id); } }
    eq(sub, [], 'bins[k].pool ⊂ bins[k].all'); eq(dup, [], 'bins all are disjoint'); eq(tot, 4893, 'bins all total 4,893');
    const fake = { cards: { 'x|1': { id: 'x|1' } }, bins: { jazz: { key: 'jazz', pool: ['x|1'] } } }; C0.deriveAll(fake);
    eq(fake.bins.jazz.all, [], 'deriveAll: cards without bin → empty all (drawLot falls back to pool)'); }
  // (b) mapIds（§2.2）：舊 slug 換掉（鍵與值、深走訪、對決狀態裡的卡複本）、含 | 的不動、查不到原樣、撞鍵用 merge、跑兩次一樣、不改傳進來的
  { const L = C0.legacyIds(), olds = Object.keys(L), [o1, o2, o3] = olds, n1 = L[o1], n2 = L[o2];
    const src = { v: 6, shelf: { [o1]: { own: true, src: 'run', at: 5 }, [n1]: { seen: true, at: 3 }, [o2]: { seen: true, at: 9 }, 'gone-card-x': { seen: true } },
      want: [o2, n1, 'gone-card-x', 'boost_c', o3], bring: o1, lastAceId: o1, runs: [{ seeds: [o1], kept: o2, aces: [] }],
      run: { bag: [o1, n2, 'fx-1'], shop: { bins: { jazz: [o1], [o2]: [] }, lot: { gone: [o3], cur: { jazz: 2 } } }, duel: { p: { draw: [{ id: o2, c: 1, o: 2, h: 3 }] }, e: { deckIds: [o1], sig: { id: o3 } } }, pos: 7, flag: true, none: null } };
    const frozen = JSON.stringify(src);
    const merge = (a, b) => ({ own: !!(a.own || b.own), src: a.own ? a.src : b.src, at: Math.min(a.at == null ? Infinity : a.at, b.at == null ? Infinity : b.at), seen: !!(a.seen || b.seen) });
    const out = EN.mapIds(src, L, merge);
    eq(JSON.stringify(src), frozen, 'mapIds does not mutate its input');
    const str = JSON.stringify(out);
    eq(olds.filter(o => str.includes('"' + o + '"')), [], 'no old slug left (keys and values, deep: run, duel, lot, runs)');
    eq(out.shelf[n1], { own: true, src: 'run', at: 3, seen: true }, 'old + new key of the same card → merged (own, src of the owned, earliest at)');
    eq([out.want, out.bring, out.lastAceId, out.runs[0].seeds, out.runs[0].kept, out.run.bag, out.run.duel.p.draw[0].id, out.run.duel.e.deckIds, out.run.duel.e.sig.id, out.run.shop.lot.gone],
      [[n2, n1, 'gone-card-x', 'boost_c', L[o3]], n1, n1, [n1], n2, [n1, n2, 'fx-1'], n2, [n1], L[o3], [L[o3]]], 'values replaced everywhere; unknown ids／relic ids left alone');
    ok(n2 in out.run.shop.bins && out.shelf['gone-card-x'] && out.run.pos === 7 && out.run.flag === true && out.run.none === null && out.v === 6, 'object keys replaced; unknown keys, numbers, booleans, null kept');
    eq(EN.mapIds(out, L, merge), out, 'running it twice = once (re-entrant)');
    eq(EN.mapIds({ a: [o1] }, L), { a: [n1] }, 'no merge given: works');
    eq(EN.mapIds({ [o1]: 1, [n1]: 2 }, L), { [n1]: 2 }, 'no merge given: the later key wins');
    eq([EN.mapIds('a|b', { 'a|b': 'x' }), EN.mapIds(o1, null), EN.mapIds([o1, 3, null], L)], ['a|b', o1, [n1, 3, null]], 'strings with | never mapped; no map → unchanged');
    const pj = JSON.parse('{"__proto__": ["' + o1 + '"]}'), pm = EN.mapIds(pj, L);
    ok(Object.getPrototypeOf(pm) === Object.prototype && JSON.stringify(pm) === '{"__proto__":["' + n1 + '"]}', 'a "__proto__" key stays a plain key'); }
  // (b2) 併入 #480 讀牌加難（合併 11-17）：提示句 id／個性句的客人鍵都不是舊 slug → mapIds 不換；v6 存檔裡打到一半的 run（run.hintSeen、對決的 hintTable／hintSeen／
  //   plan.hint、log 的 line）走過 mapIds 一字不變；run.hintSeen 壞掉（不是陣列、混了非字串）startFight 照開、只留字串
  { const L = C0.legacyIds(), NT = EN.hintTableOf(C0), ids = new Set(), own = Object.prototype.hasOwnProperty;
    const walk = x => { if (Array.isArray(x)) x.forEach(walk); else if (x && typeof x === 'object') for (const k of Object.keys(x)) { ids.add(k); walk(x[k]); } else if (typeof x === 'string') ids.add(x); };
    walk(NT); walk(C0.hintLines); walk(C0.hints);
    ok(ids.size > 600, 'hint ids collected', ids.size);
    eq([...ids].filter(x => own.call(L, x)), [], 'no hint line id／voice key is an old slug (mapIds leaves them alone)');
    let mid = null;
    for (let i = 0; i < 20 && !mid; i++) {
      const run = EN.newRun(C, { seedKey: 'mg480-' + i, runNo: 1, ace: TIERS[i % 3], prologue: false });
      for (let g = 0; g < 200 && !mid; g++) {
        if (run.over && !run.pending) break;
        if (EN.canBargainPick(run)) { EN.choose(run, C, EN.bargainPolicy(run, C)); continue; }
        const step = EN.nextStep(run);
        if (step === 'level' || step === 'reward' || step === 'retry') { if (!EN.choose(run, C, EN.runPolicy(run, C)).ok) break; continue; }
        if (step !== 'fight') break;
        const d = EN.startFight(run, C, {}).duel;
        if (run.pos >= 6 && run.hintSeen.length) { for (let k = 0; k < 2 && !d.over; k++) EN.resolveTurn(d, EN.policies.thoughtful(d, lcg(i * 7 + k), {}, C)); if (!d.over) { mid = run; break; } }
        while (!d.over) EN.resolveTurn(d, EN.policies.thoughtful(d, lcg(i * 13 + d.n), {}, C));
        EN.finishFight(run, C);
      }
    }
    ok(!!mid && mid.duel && !mid.duel.over && mid.duel.hintTable.own && mid.duel.log.length >= 2, 'got a #480 run mid-duel (pos ≥6, hintSeen, new-shape hint table)', mid && { pos: mid.pos, n: mid.duel.n });
    if (mid) {
      const sv = JSON.parse(JSON.stringify({ v: 6, run: mid })), out = EN.mapIds(sv, L), D0 = sv.run.duel, D1 = out.run.duel;
      eq([out.run.hintSeen, D1.hintTable, D1.hintSeen, D1.plan.hint, D1.log.map(l => [l.line, l.hk, l.hint])], [sv.run.hintSeen, D0.hintTable, D0.hintSeen, D0.plan.hint, D0.log.map(l => [l.line, l.hk, l.hint])],
        'mapIds: run.hintSeen, duel hintTable／hintSeen／plan.hint／log lines unchanged');
      eq(out, sv, 'mapIds on a new-id #480 run mid-duel = no change at all');
      const r2 = JSON.parse(JSON.stringify(mid)); r2.duel = null; r2.hintSeen = 'bad';
      ok(EN.nextStep(r2) === 'fight' && Array.isArray(EN.startFight(r2, C, {}).duel.hintSeen) && JSON.stringify(r2.duel.hintSeen) === JSON.stringify([r2.duel.plan.hint.line]),
        'run.hintSeen not an array → startFight ok, duel.hintSeen = [first hand line]', r2.duel.hintSeen);
      const r3 = JSON.parse(JSON.stringify(mid)); r3.duel = null; r3.hintSeen = [3, null, 'c06', { x: 1 }];
      EN.startFight(r3, C, {}); eq(r3.duel.hintSeen, ['c06', r3.duel.plan.hint.line], 'run.hintSeen with junk → only strings kept (+ first hand line)');
    } }
  // (c) 配額（§3.2 表；D5 用 engine 的 SHOP_ORDER 重算）
  { const T = { feature: 6, jazz: 9, tw: 6, rock: 8, elec: 7, soul: 6, hiphop: 6, citypop: 5, classical: 6, world: 6, folk: 6, indierock: 6, indiepop: 6, blues: 5, new: 6, picks: 6 };
    eq(sortObj(QT), sortObj(T), 'lotQuota = SPEC-B §3.2 table');
    eq(Object.values(QT).reduce((a, b) => a + b, 0), 100, 'quota total 100');
    const size = k => C.bins[k].all.length, others = KEYS.filter(k => k !== 'feature'), q = { feature: Math.min(LT.feature, size('feature')) };
    let rest = LT.size - q.feature; for (const k of others) { q[k] = Math.min(LT.floor, size(k)); rest -= q[k]; }
    const tot = others.reduce((a, k) => a + size(k), 0), sh = others.map((k, i) => ({ k, i, x: rest * size(k) / tot }));
    let left = rest; for (const x of sh) { q[x.k] += Math.floor(x.x); left -= Math.floor(x.x); }
    sh.sort((a, b) => (b.x % 1) - (a.x % 1) || a.i - b.i); for (const x of sh) if (left > 0) { q[x.k]++; left--; }
    eq(sortObj(QT), sortObj(q), 'lotQuota = largest remainder in engine SHOP_ORDER (test recomputes)'); }
  // (d) 第 1 檔＝策展池、第 2 檔起＝全卡池；全檔不重複；不含包包／王牌／特價（新舊）／頂點；稀有度合規；每位 47 張；相鄰兩位（沒買東西）
  { const S = QUICK ? 60 : 300; let bad = 0, outside = 0, adjBad = 0, q5Bad = 0, seenAll = 0, firstBad = 0, n47 = 0;
    for (let s = 1; s <= S; s++) {
      const ace = TIERS[s % 3], run = EN.newRun(C, { seedKey: 'lot-' + s, runNo: 2, ace }), L1 = run.shop.lot;
      if (s <= 20) eq(EN.newRun(C, { seedKey: 'lot-' + s, runNo: 2, ace }).shop, run.shop, 'same seed → same lot and shelf');
      const check = (r, lot, srcK) => {
        const all = Object.values(lot.bins).flat(), deny = new Set([C.aces[r.ace], ...r.bag]);
        if (new Set(all).size !== all.length) { bad++; ok(false, 'lot has duplicates', s); }
        for (const k of KEYS) { const st = lot.bins[k] || [], src = C.bins[k][srcK], feat = k === 'feature';
          if (st.length !== Math.min(QT[k], st.length) || !st.every(id => src.includes(id) && !deny.has(id) && !BG.has(id) && !card(id).tier && (feat ? EN.FEATURE_RARITY : EN.SHELF_RARITY).includes(EN.rarity(card(id))))) { bad++; ok(false, 'lot bin ' + k + ' ⊂ ' + srcK + ', no bag／ace／bargain／apex, rarity ok', { s, k, st }); } }
      };
      ok(L1.no === 1 && L1.src === 'cur' && L1.gone.length === 0 && L1.want.length === 0 && L1.told.length === 0 && !L1.fb, 'round 1 lot: no 1, src cur, empty gone／want／told', { no: L1.no, src: L1.src });
      check(run, L1, 'pool');
      if (!KEYS.every(k => L1.bins[k].length === QT[k])) { firstBad++; ok(false, 'first lot fills every quota (curated pool is big enough)', s); }
      // 第 1 位架上＝每箱前 show 張
      const shelves = [clone(run.shop.bins)];
      if (Object.values(run.shop.bins).flat().length === 47) n47++;
      if (!KEYS.every(k => JSON.stringify(run.shop.bins[k]) === JSON.stringify(L1.bins[k].slice(0, showOf(k))))) ok(false, 'guest 1 shelf = first show cards of each bin', s);
      for (let g = 2; g <= 5; g++) { EN.shelve(run, C); shelves.push(clone(run.shop.bins)); if (Object.values(run.shop.bins).flat().length === 47) n47++; }
      for (const k of KEYS) {
        for (let g = 1; g < 5; g++) { const o = overlap(shelves[g - 1][k], shelves[g][k]); if (QT[k] >= 2 * showOf(k) ? o !== 0 : o > 1) { (QT[k] >= 6 ? adjBad++ : q5Bad++); ok(false, 'adjacent guests overlap (bin ' + k + ', quota ' + QT[k] + ')', { s, g, o }); } }
        if (new Set(shelves.flatMap(x => x[k])).size === QT[k]) seenAll++;
      }
      // 第 2 檔（jumpTo 第 6 位）：全卡池
      const r2 = EN.jumpTo(clone(run), C, 6), L2 = r2.shop.lot;
      ok(L2.no === 2 && L2.src === 'all' && L2.cur && L2.gone.length === 0, 'round 2 lot: no 2, src all', { no: L2.no, src: L2.src });
      check(r2, L2, 'all');
      if (Object.values(L2.bins).flat().some(id => !Object.values(C.bins).some(b => b.pool.includes(id)))) outside++;
      ok(JSON.stringify(L2.bins) !== JSON.stringify(L1.bins), 'new round → new lot', s);
    }
    eq([bad, firstBad, adjBad, q5Bad], [0, 0, 0, 0], 'lot contents ok; adjacent guests 0 overlap (quota ≥ 6), ≤ 1 (quota 5)');
    eq(n47, S * 5, 'every guest shelf = 47 records (bins 3, FEATURE 2)');
    eq(seenAll, S * KEYS.length, 'five guests see the whole lot (every bin)');
    ok(outside >= S * 0.95, 'round-2 lots carry cards outside the curated pool', outside); }
  // (e) 買走 → gone、之後幾位都不再上架；lotLeft；advance：非輪首換架、輪首換檔、說情重打不換、序章打完＝newRun 那批
  { let n = 0;
    for (let s = 1; s <= (QUICK ? 10 : 40); s++) {
      const run = EN.newRun(C, { seedKey: 'gone-' + s, runNo: 2, ace: TIERS[s % 3] }); EN.choose(run, C, EN.bargainPolicy(run, C)); run.money = 999999;
      const key = KEYS[1 + (s % (KEYS.length - 1))], cid = run.shop.bins[key][0], left0 = EN.lotLeft(run, key);
      const r = EN.choose(run, C, { type: 'buy', key, cardId: cid });
      ok(r.ok && run.shop.lot.gone.includes(cid) && EN.lotLeft(run, key) === left0 - 1, 'buy → lot.gone, lotLeft −1', { e: r.error, key });
      for (let g = 0; g < 6; g++) { EN.shelve(run, C); if (Object.values(run.shop.bins).flat().includes(cid)) ok(false, 'bought card never shelved again this lot', { s, g }); else n++; }
      const before = clone(run.shop.bins), lot0 = clone(run.shop.lot);
      ok(EN.lotLeft(run, key) === run.shop.lot.bins[key].filter(id => id !== cid && !run.bag.includes(id)).length, 'lotLeft = lot bin minus bag／gone');
      // 說情重打：同一位、架子不動
      const fl = forceLose(run);
      if (run.pending && run.pending.type === 'retry') { EN.choose(run, C, { type: 'retry' }); eq(run.shop.bins, before, 'retry (same guest) → same shelf'); }
      // 非輪首：換下一批、同一檔
      const pos0 = run.pos, fw = forceWin(run); settleAll(run);
      ok(run.pos === pos0 + 1 && run.idx === pos0 % 5 && JSON.stringify(run.shop.bins) !== JSON.stringify(before) && run.shop.lot.no === lot0.no && JSON.stringify(run.shop.lot.bins) === JSON.stringify(lot0.bins) && run.shop.lot.gone.includes(cid), 'next guest (not a new round) → next batch from the same lot', { pos: run.pos, fl: !!fl });
      // 輪首（打完藏家）：新的一檔
      EN.jumpTo(run, C, 5); forceWin(run); settleAll(run);
      ok(run.pos === 6 && run.shop.lot.no === 2 && run.shop.lot.src === 'all' && run.shop.lot.gone.length === 0, 'after the boss → new lot (no 2, all, gone cleared)', { pos: run.pos, no: run.shop.lot.no });
    }
    ok(n >= (QUICK ? 60 : 240), 'gone checks', n);
    // 序章那一趟：男子打完（advance 直接 return）第 1 位的架子＝newRun 那批
    for (let s = 1; s <= 10; s++) {
      const run = EN.newRun(C, { seedKey: 'prolot-' + s, runNo: 1, ace: TIERS[s % 3] }), sh0 = clone(run.shop.bins), lot0 = clone(run.shop.lot);
      EN.choose(run, C, EN.bargainPolicy(run, C)); forceWin(run); settleAll(run);
      ok(run.prologue !== 'pending' && run.pos === 1, 'prologue done, still guest 1', { p: run.prologue, pos: run.pos });
      eq([run.shop.bins, run.shop.lot], [sh0, lot0], 'after the prologue: guest 1 shelf and the lot = the newRun batch (advance returns early)');
    } }
  // (f) fixLot：舊 run（沒有 lot）同一份重跑兩次一樣、這一位的 bins 不動、下一位不重上（配額 ≥6）；fixBins＋fixLot 同跑（缺 citypop、沒有 lot；B3、F3）
  { let adj = 0;
    for (let s = 1; s <= (QUICK ? 20 : 80); s++) {
      // 舊補貨的 run（lot 關的 restock＝B 波以前的店）、存檔前可能已經買走一張；citypop 缺一半的存檔另外 delete 整箱
      const old = EN.newRun(COFF, { seedKey: 'fixlot-' + s, runNo: 2 + (s % 2), ace: TIERS[s % 3] }); EN.choose(old, COFF, EN.bargainPolicy(old, COFF));
      if (s % 3 === 0) EN.jumpTo(old, COFF, 6 + (s % 4));
      if (s % 2) delete old.shop.bins.citypop;
      ok(!old.shop.lot, 'lot-off run has no lot');
      const twin = clone(old), pre = clone(old.shop.bins);
      const fb = EN.fixBins(old, C), mid = clone(old.shop.bins), fl = EN.fixLot(old, C), now = clone(old.shop.bins);
      ok(fb === !!(s % 2) && fl === true && old.shop.lot && old.shop.lot.no === old.round, 'fixBins (missing citypop) + fixLot (no lot) → changed', { fb, fl });
      EN.fixBins(twin, C); EN.fixLot(twin, C); eq(twin, old, 'fixBins + fixLot deterministic (same save → same lot)');
      ok(EN.fixLot(old, C) === false && EN.lotOk(old, C), 'fixLot on a fixed run → no change');
      eq(now, mid, 'fixLot leaves this guest\'s shelf alone'); if (s % 2 === 0) eq(now, pre, 'no missing bin → shelf exactly as saved');
      const lotAll = Object.values(old.shop.lot.bins).flat();
      ok(new Set(lotAll).size === lotAll.length, 'fixLot: whole lot has no duplicates (shelf included)');
      for (const k of KEYS) if (!old.shop.lot.bins[k].slice(0, now[k].length).every((id, i) => id === now[k][i]) || old.shop.lot.cur[k] !== now[k].length % Math.max(1, old.shop.lot.bins[k].length)) ok(false, 'fixLot: this guest\'s shelf goes first, cursor right after it', k);
      EN.shelve(old, C);
      for (const k of KEYS) { const o = overlap(now[k], old.shop.bins[k]); if (o !== 0 || old.shop.bins[k].length !== Math.min(showOf(k), old.shop.lot.bins[k].length - now[k].length)) ok(false, 'after fixLot the next guest gets records that were not on this guest\'s shelf', { s, k, o, q: QT[k], n: old.shop.bins[k].length }); else adj++; }
    }
    ok(adj >= (QUICK ? 300 : 1200), 'fixLot next-guest checks', adj);
    // 形狀壞／不是這一輪的檔 → 重抽；want／told 不是陣列 → 補 []
    const r = EN.newRun(C, { seedKey: 'fixlot-bad', runNo: 2, ace: 'hall' });
    for (const [name, f] of [['no cur', L => { delete L.cur; }], ['gone not array', L => { L.gone = 'x'; }], ['other round', L => { L.no = 9; }], ['bin missing', L => { delete L.bins.jazz; }], ['cur negative', L => { L.cur.rock = -1; }]]) {
      const x = clone(r); f(x.shop.lot); ok(!EN.lotOk(x, C) && EN.fixLot(x, C) === true && EN.lotOk(x, C), 'fixLot redraws a broken lot: ' + name); }
    { const x = clone(r); delete x.shop.lot.want; x.shop.lot.told = null; ok(EN.lotOk(x, C) && EN.fixLot(x, C) === true && Array.isArray(x.shop.lot.want) && Array.isArray(x.shop.lot.told) && JSON.stringify(x.shop.lot.bins) === JSON.stringify(r.shop.lot.bins), 'fixLot: missing want／told → [] (lot kept)'); }
    ok(EN.fixLot(clone(r), COFF) === false, 'fixLot does nothing with the lot off'); }
  // (g) jumpTo 第 3 位＝正常走到第 3 位的架子（沒買東西時）；firstShow 旋鈕；lot 關＝舊補貨（每輪 62–93 張、平均約 78、沒有 lot）
  { for (let s = 1; s <= 30; s++) {
      const a = EN.newRun(C, { seedKey: 'jmp-' + s, runNo: 2, ace: TIERS[s % 3] }); EN.choose(a, C, EN.bargainPolicy(a, C));
      const b = clone(a); EN.shelve(a, C); EN.shelve(a, C); EN.jumpTo(b, C, 3);
      eq([b.shop.bins, b.shop.lot.cur], [a.shop.bins, a.shop.lot.cur], 'jumpTo(3) shelf = walked to guest 3');
      const c = clone(a); EN.jumpTo(c, C, 13); const d = EN.jumpTo(clone(a), C, 11); EN.shelve(d, C); EN.shelve(d, C); eq(c.shop.bins, d.shop.bins, 'jumpTo(13) = jumpTo(11) + 2 guests');
    }
    const CFS = Object.assign({}, C, { lot: Object.assign({}, C.lot, { firstShow: 4 }) });
    const f1 = EN.newRun(CFS, { seedKey: 'fs', runNo: 2, ace: 'hall' });
    ok(KEYS.every(k => f1.shop.bins[k].length === (k === 'feature' ? 2 : 4)), 'firstShow 4: round 1 shelves 4 per bin (FEATURE 2)', Object.values(f1.shop.bins).map(x => x.length));
    EN.jumpTo(f1, CFS, 6); ok(KEYS.every(k => f1.shop.bins[k].length === showOf(k)), 'firstShow: round 2 back to show');
    let sum = 0, lo = 1e9, hi = 0; const S = 300;
    for (let s = 1; s <= S; s++) { const r = EN.newRun(COFF, { seedKey: 'off-' + s, runNo: 2, ace: TIERS[s % 3] }); EN.jumpTo(r, COFF, 1 + 5 * (s % 3)); const n = Object.values(r.shop.bins).flat().length; sum += n; lo = Math.min(lo, n); hi = Math.max(hi, n); if (r.shop.lot) ok(false, 'lot off → no run.shop.lot'); }
    ok(lo >= 62 && hi <= 93 && Math.abs(sum / S - 77.5) < 1.5, 'lot off: old restock, 62–93 records a round (mean ≈ 78)', { lo, hi, mean: sum / S });
    { const r = EN.newRun(COFF, { seedKey: 'off-adv', runNo: 2, ace: 'hall' }); EN.choose(r, COFF, EN.bargainPolicy(r, COFF)); const b0 = clone(r.shop.bins);
      const f = EN.startFight(r, COFF, {}); let g = 0; while (!f.duel.over && g++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } }); EN.finishFight(r, COFF);
      let h = 0; while (r.pending && h++ < 40) { if (!EN.choose(r, COFF, EN.runPolicy(r, COFF)).ok) break; }
      ok(r.pos === 2, 'lot off: walked to guest 2'); eq(r.shop.bins, b0, 'lot off: same shelf all round (old behaviour)'); } }
  // (h) 定稿 E2：lot on／off 同 seed 的配件、特價箱逐字相同（200 seed × 第 1–3 輪）；stockBins＝原本的箱子迴圈（測試自己寫一份）
  { const oldStock = (run, CC) => {
      const st = { rng: EN.fnv1a32(run.seedKey + '#' + run.runNo + '#shop#' + (run.round || 1)) || 1 }, E0 = CC.economy;
      const taken = new Set([CC.aces[run.ace], ...run.bag, ...C.bargain.pool, ...(C.bargain.retired || [])].filter(Boolean)), out = {};
      const span = lohi => lohi[0] + Math.floor(EN.rng(st) * (lohi[1] - lohi[0] + 1));
      for (const k of keysOf(CC)) { const feat = k === 'feature', okR = feat ? EN.FEATURE_RARITY : EN.SHELF_RARITY;
        const pool = CC.bins[k].pool.filter((id, i, a) => a.indexOf(id) === i && !taken.has(id) && CC.cards[id] && okR.includes(EN.rarity(CC.cards[id])));
        EN.shuffle(pool, st); out[k] = pool.slice(0, Math.min(span(feat ? E0.featureStock : E0.stock), pool.length)); out[k].forEach(id => taken.add(id)); }
      return out; };
    let same = 0, sb = 0;
    for (let s = 1; s <= (QUICK ? 50 : 200); s++) for (let rd = 1; rd <= 3; rd++) {
      const o = { seedKey: 'e2-' + s, runNo: 1 + (s % 3), ace: TIERS[s % 3] };
      const a = EN.jumpTo(EN.newRun(C, o), C, 5 * rd - 4), b = EN.jumpTo(EN.newRun(COFF, o), COFF, 5 * rd - 4);
      if (JSON.stringify([a.shop.relics, a.shop.bargain, a.rng]) === JSON.stringify([b.shop.relics, b.shop.bargain, b.rng])) same++; else ok(false, 'lot on／off: same counter relics, bargain crate, run.rng', { s, rd });
      if (JSON.stringify(b.shop.bins) === JSON.stringify(oldStock(b, COFF))) sb++; else ok(false, 'lot off: shop.bins = the old bins loop', { s, rd });
      if (rd === 1 && JSON.stringify(EN.stockBins(a, C, { rng: EN.fnv1a32(a.seedKey + '#' + a.runNo + '#shop#1') || 1 })) !== JSON.stringify(b.shop.bins)) ok(false, 'stockBins (exported) = lot-off shelf', s);
    }
    eq([same, sb], [(QUICK ? 50 : 200) * 3, (QUICK ? 50 : 200) * 3], 'lot on／off: relics + bargain identical; lot off bins = old loop'); }
  // (i) 定稿 E1／G3-1：箱子沒有 all → 第 2 檔起退回 pool（不空、lotWarn、lot.fb）；假箱子有重疊時全檔照樣不重複
  { for (const k of Object.keys(EN.lotWarn)) delete EN.lotWarn[k];
    const BJ = Object.assign({}, C.bins, { jazz: Object.assign({}, C.bins.jazz) }); delete BJ.jazz.all;
    const CJ = Object.assign({}, C, { bins: BJ });
    const r = EN.jumpTo(EN.newRun(CJ, { seedKey: 'nofull', runNo: 2, ace: 'hall' }), CJ, 6), L2 = r.shop.lot;
    ok(L2.no === 2 && L2.src === 'all' && L2.bins.jazz.length === EN.lotQuota(CJ).jazz && EN.lotQuota(CJ).jazz >= LT.floor && L2.bins.jazz.every(id => C.bins.jazz.pool.includes(id)) && EN.lotWarn.jazz === true && JSON.stringify(L2.fb) === '["jazz"]', 'no jazz.all → round-2 jazz falls back to pool (not empty), lotWarn.jazz, lot.fb', { n: L2.bins.jazz.length, fb: L2.fb, w: EN.lotWarn });
    ok(r.shop.bins.jazz.length === showOf('jazz') && L2.bins.rock.some(id => !C.bins.rock.pool.includes(id)), 'other bins still draw from all');
    ok(Object.keys(EN.lotWarn).length === 1, 'only jazz warned', EN.lotWarn);
    const BF = {}; for (const k of Object.keys(C.bins)) { BF[k] = Object.assign({}, C.bins[k]); delete BF[k].all; }
    BF.new.pool = BF.new.pool.concat(C.bins.jazz.pool.slice(0, 6), C.bins.rock.pool.slice(0, 6));   // 新進跟分類箱重疊（engine.test 假箱子的形狀）
    const CF = Object.assign({}, C, { bins: BF }); C0.deriveAll({ cards: {}, bins: BF });
    ok(KEYS.every(k => Array.isArray(BF[k].all) && BF[k].all.length === 0), 'deriveAll on cards without bin → every all empty');
    for (let s = 1; s <= 30; s++) { const x = EN.jumpTo(EN.newRun(CF, { seedKey: 'fbk-' + s, runNo: 2, ace: TIERS[s % 3] }), CF, 6), all = Object.values(x.shop.lot.bins).flat();
      if (!(new Set(all).size === all.length && KEYS.every(k => x.shop.lot.bins[k].length > 0 && x.shop.lot.bins[k].every(id => BF[k].pool.includes(id))) && x.shop.lot.fb.length === KEYS.length)) ok(false, 'all bins without all: fall back to pool, nothing empty, no duplicates across overlapping bins', s); else pass++; }
    for (const k of Object.keys(EN.lotWarn)) delete EN.lotWarn[k]; }
  // (j) 想要清單（§5.2；定稿 D6）
  { const elig = k => C.bins[k].all.filter(id => !BG.has(id) && !card(id).tier && (k === 'feature' ? EN.FEATURE_RARITY : EN.SHELF_RARITY).includes(EN.rarity(card(id))) && !Object.values(C.aces).includes(id));
    const lotOf = (sk, rn, rd, want, bag) => EN.drawLot({ seedKey: sk, runNo: rn, round: rd, ace: 'hall', bag: bag || [], want }, C);
    // 單張：每檔進來 ≈ 35%；中了排在那一箱第一張
    const X = elig('rock')[17], S1 = 2000; let hit = 0, firstOk = 0;   // 抽檔很便宜（部分洗牌），--quick 也照 SPEC 的 2,000／400 檔
    for (let s = 1; s <= S1; s++) { const L = lotOf('want1-' + s, 1 + (s % 3), 2 + (s % 4), [X]); if (L.want.includes(X)) { hit++; if (L.bins.rock[0] === X) firstOk++; } }
    ok(Math.abs(hit / S1 - LT.wantP) <= 0.03, 'one wanted card: in the lot ' + (100 * hit / S1).toFixed(1) + '% of lots (wantP 35% ± 3)', hit / S1);
    eq(firstOk, hit, 'a wanted card that hits goes first in its bin (next guest sees it)');
    // 清單 30 張（全在來源池、每箱 2 張）、400 檔：每張比例在平均 ±5 點（不偏任何位置）、平均 ≈ 10%、一檔最多 3 張
    const W30 = KEYS.filter(k => k !== 'feature').flatMap(k => elig(k).filter((id, i) => i % 37 === 5).slice(0, 2));
    eq(W30.length, 30, '30 wanted cards (2 per bin)');
    const cnt = Object.fromEntries(W30.map(id => [id, 0])), S2 = 400; let over = 0;
    for (let s = 1; s <= S2; s++) { const L = lotOf('want30-' + s, 1 + (s % 2), 2 + (s % 5), W30); if (L.want.length > LT.wantMax) over++; for (const id of L.want) cnt[id]++; }
    const rates = W30.map(id => cnt[id] / S2), mean = rates.reduce((a, b) => a + b, 0) / rates.length;
    eq(over, 0, 'at most wantMax (3) wanted cards per lot');
    ok(Math.abs(mean - 0.10) <= 0.012, '30-card list: mean ' + (100 * mean).toFixed(1) + '% per card per lot (≈ 10%)', mean);
    ok(rates.every(x => Math.abs(x - mean) <= 0.05), '30-card list: every card within mean ± 5 points (order reshuffled every lot; not biased to the newest)', rates.map(x => +(100 * x).toFixed(1)));
    ok(Math.abs(rates.slice(0, 10).reduce((a, b) => a + b, 0) / 10 - rates.slice(20).reduce((a, b) => a + b, 0) / 10) <= 0.03, 'oldest 10 vs newest 10 of the list get the same share');
    console.log('     want list: 1 card ' + (100 * hit / S1).toFixed(1) + '% of ' + S1 + ' lots; 30 cards ' + (100 * mean).toFixed(1) + '% each (min ' + (100 * Math.min(...rates)).toFixed(1) + '、max ' + (100 * Math.max(...rates)).toFixed(1) + '%) over ' + S2 + ' lots');
    // 頂點、包包裡的、特價箱的、不在任何箱的：不擲、不上
    const APX = Object.keys(C.cards).filter(id => C.cards[id].tier).slice(0, 3), BAGW = elig('jazz').slice(0, 3);
    for (let s = 1; s <= 200; s++) { const L = lotOf('wantx-' + s, 2, 2, APX.concat(BAGW, C.bargain.pool.slice(0, 3), ['nope|nope']), BAGW);
      if (L.want.length || Object.values(L.bins).flat().some(id => APX.includes(id) || BAGW.includes(id))) ok(false, 'apex／bag／bargain／unknown in the want list never enter the lot', s); else pass++; }
    // 想要清單不影響洗牌：有清單的檔＝中了的排前面＋沒清單那檔扣掉它們（每一箱）
    let shuf = 0;
    for (let s = 1; s <= 200; s++) { const a = lotOf('wsh-' + s, 2, 3, W30), b = lotOf('wsh-' + s, 2, 3, []);
      for (const k of KEYS) { const mine = a.bins[k].filter(id => a.want.includes(id)), exp = mine.concat(b.bins[k].filter(id => !mine.includes(id)).slice(0, b.bins[k].length - mine.length));
        if (JSON.stringify(a.bins[k]) === JSON.stringify(exp)) shuf++; else ok(false, 'want list does not reshuffle the bin', { s, k }); } }
    eq(shuf, 200 * KEYS.length, 'want list leaves every bin\'s shuffle as it was');
    // newRun 收 o.want（字串、去重、留最後 200）；中了 → 第 1 位就上架
    const nr = EN.newRun(C, { seedKey: 'wnr', runNo: 2, ace: 'hall', want: [3, 'a', 'a', null].concat(Array.from({ length: 250 }, (_, i) => 'w' + i)) });
    ok(nr.want.length === 200 && nr.want[199] === 'w249' && !nr.want.includes(3) && new Set(nr.want).size === 200, 'newRun o.want: strings, dedup, last 200', nr.want.slice(0, 3));
    eq(EN.newRun(C, { seedKey: 'wnr', runNo: 2, ace: 'hall' }).want, [], 'newRun without want → []');
    let shown = 0, tot = 0;
    for (let s = 1; s <= 200; s++) { const r = EN.jumpTo(EN.newRun(C, { seedKey: 'wshow-' + s, runNo: 2, ace: 'hall', want: W30 }), C, 6 + (s % 2) * 0); for (const id of r.shop.lot.want) { tot++; if (Object.values(r.shop.bins).flat().includes(id)) shown++; } }
    ok(tot > 0 && shown === tot, 'wanted cards that hit are on the very next shelf', { shown, tot }); }
  // (k) 今日推薦 dailyPick（§4.3）
  { const ids = Object.keys(C0.cards).sort(), NON = ids.filter(id => !C0.cards[id].tier), ACES = new Set(Object.values(C0.aces));
    const known = new Set(NON.filter((id, i) => i % 3 === 0)), owned = new Set([...known].filter((id, i) => i % 2 === 0));
    const base = { known: id => known.has(id), owned: id => owned.has(id), want: [], tunes: [] };
    const days = Array.from({ length: QUICK ? 60 : 200 }, (_, i) => '2026-' + String(1 + Math.floor(i / 28)).padStart(2, '0') + '-' + String(1 + (i % 28)).padStart(2, '0'));
    const picks = days.map(day => EN.dailyPick(C0, Object.assign({ day }, base)));
    eq(days.slice(0, 20).map(day => EN.dailyPick(C0, Object.assign({ day }, base))), picks.slice(0, 20), 'same day, same input → same pick');
    ok(new Set(picks).size >= days.length * 0.9, 'different days → different picks', new Set(picks).size);
    eq(picks.filter(id => !id || C0.cards[id].tier || BG.has(id) || ACES.has(id) || known.has(id)), [], 'never apex／bargain／ace／known');
    ok(EN.dailyPick(C0, { day: '2026-11-16', known: ids, owned: [], want: [] }) === null, 'no candidate → null');
    const K1 = [...known].find(id => !owned.has(id) && !BG.has(id) && !ACES.has(id)), O1 = [...owned].find(id => !BG.has(id) && !ACES.has(id));
    eq(EN.dailyPick(C0, { day: '2026-11-16', known: () => true, owned: id => owned.has(id), want: [K1] }), K1, 'a wanted card you know but do not own can be picked');
    eq(EN.dailyPick(C0, { day: '2026-11-16', known: () => true, owned: id => owned.has(id), want: [O1] }), null, 'a wanted card you own is never picked');
    eq(EN.dailyPick(C0, { day: '2026-11-16', known: { [NON[0]]: { seen: true } }, owned: {}, want: [] }) !== NON[0], true, 'known／owned also take {id: entry} and arrays');
    // 權重：想要 ×5、頻率 ×3（統計上明顯偏高）
    const W50 = NON.filter(id => !known.has(id) && !BG.has(id) && !ACES.has(id)).filter((id, i) => i % 61 === 7).slice(0, 50);
    const cand = NON.filter(id => !known.has(id) && !BG.has(id) && !ACES.has(id));
    const wp = days.map(day => EN.dailyPick(C0, Object.assign({}, base, { day, want: W50 }))), wHit = wp.filter(id => W50.includes(id)).length / days.length;
    const wExp = 5 * W50.length / (cand.length + 4 * W50.length);
    ok(wHit >= wExp * 0.5 && wHit > 2.5 * W50.length / cand.length, 'want ×5: wanted cards picked ' + (100 * wHit).toFixed(1) + '% of days (×5 ≈ ' + (100 * wExp).toFixed(1) + '%, ×1 ≈ ' + (100 * W50.length / cand.length).toFixed(1) + '%)', wHit);
    const TU = ['calm', 'boil'], share = cand.filter(id => TU.includes(C0.cards[id].tune)).length / cand.length;
    const tp = days.map(day => EN.dailyPick(C0, Object.assign({}, base, { day, tunes: TU }))), tHit = tp.filter(id => TU.includes(C0.cards[id].tune)).length / days.length;
    console.log('     dailyPick: want ×5 ' + (100 * wHit).toFixed(1) + '% (×1 ' + (100 * W50.length / cand.length).toFixed(1) + '%)；tunes ×3 ' + (100 * tHit).toFixed(1) + '% (×1 ' + (100 * share).toFixed(1) + '%) over ' + days.length + ' days');
    ok(tHit > Math.min(0.95, 1.6 * share), 'tunes ×3: picks in the 2 tunes ' + (100 * tHit).toFixed(1) + '% (×1 ≈ ' + (100 * share).toFixed(1) + '%, ×3 ≈ ' + (100 * 3 * share / (1 + 2 * share)).toFixed(1) + '%)', tHit); }
  // (l) dailyReward（§4.5；驗收改：只給史詩——傳奇帶上場太好打，主線 M2）：3 張不同、經冷硬各一（topAttr）、史詩、沒擁有、非頂點／特價／王牌、同 n 同結果、跟日期無關
  { const ACES = new Set(Object.values(C0.aces)); let okN = 0;
    for (let n = 0; n < (QUICK ? 20 : 100); n++) {
      const own = new Set(Object.keys(C0.cards).filter((id, i) => i % (3 + (n % 5)) === 0)), out = EN.dailyReward(C0, { n, owned: id => own.has(id) });
      const a = out.map(id => EN.topAttr(C0.cards[id])).sort().join('');
      if (out.length === 3 && new Set(out).size === 3 && a === 'cho' && out.every(id => !own.has(id) && !C0.cards[id].tier && !BG.has(id) && !ACES.has(id) && EN.rarity(C0.cards[id]) === 'epic')) okN++;
      else ok(false, 'dailyReward: 3 different, one per colour, epic only, not owned', { n, out, a });
      eq(EN.dailyReward(C0, { n, owned: [...own] }), out, 'dailyReward: same n → same three (owned as array too)');
    }
    ok(okN === (QUICK ? 20 : 100), 'dailyReward ok', okN);
    ok(JSON.stringify(EN.dailyReward(C0, { n: 0 })) !== JSON.stringify(EN.dailyReward(C0, { n: 1 })), 'different n → different three');
    const onlyH = Object.assign({}, C0, { cards: Object.fromEntries(Object.entries(C0.cards).filter(([id, c]) => EN.topAttr(c) === 'h')) });
    const oh = EN.dailyReward(onlyH, { n: 3 });
    ok(oh.length === 3 && oh.every(id => EN.topAttr(C0.cards[id]) === 'h'), 'a colour with no cards → filled from the others', oh); }
});

section('28 第 B 波升版的舊 run（驗收 F1）：待說情／打到一半的對決 → 說情重打＝原本那副牌（legacyView 舊卡池 → oldDeckIds 跟 main 6aafd0e7d 的 guestDef 逐張相同；pinOldDeck 釘 run.retryDeck、換位就拿掉）', () => {
  const L = C0.legacyIds();
  // (a) 20 seed × 3 王牌 × 9 個位數：舊碼（main 6aafd0e7d，323 張、舊 slug）guestDef 選出的牌（換成 catalogId）串起來的 fnv1a32
  let h = '', moved = 0;
  for (let s = 1; s <= 20; s++) for (const ace of ['hall', 'exile', 'heresy']) for (const pos of [1, 2, 3, 4, 5, 8, 15, 23, 40]) {
    const r = EN.newRun(C0, { seedKey: '202611' + String(s).padStart(2, '0'), runNo: 2, ace, prologue: false }); EN.jumpTo(r, C0, pos);
    const id = r.order[r.idx], ids = EN.oldDeckIds(r, C0, L, id, pos) || [];
    h += id + ':' + ids.join(',') + ';';
    if (EN.guestDef(r, C0, id, pos).deck.map(c => c.id).join(',') !== ids.join(',')) moved++;
  }
  eq(EN.fnv1a32(h), 1220471490, 'oldDeckIds = main guestDef (540 decks, fnv of the joined lists)');
  ok(moved > 100, 'the new pool really moves decks (else this section proves nothing)', moved);
  // (b) 驗收實例：20261107 第 2 趟、殿堂、第 4 位 label
  const OLD = ['harry roesli gang|philosophy gang', '廢五金|廢五金', '明田川荘之|yamazaki blues', 'modest mouse|the moon & antarctica', 'einstürzende neubauten|halber mensch', 'mogwai|come on die young', 'lady gaga|artpop'];
  const mk = () => { const r = EN.newRun(C0, { seedKey: '20261107', runNo: 2, ace: 'hall', prologue: false }); EN.jumpTo(r, C0, 4); return r; };
  const r = mk(); eq(r.order[r.idx], 'label', 'pos 4 is label');
  eq(EN.oldDeckIds(r, C0, L, 'label', 4), OLD, 'old deck of label');
  // (c) 待說情：輸了 → pinOldDeck → 說情 → 開打的牌單＝原本那副；加星照位數
  const f = EN.startFight(r, C0, {}); r.duel.p.hp = 0; r.duel.over = { win: false, by: 'hp', pHp: 0, eHp: r.duel.e.hp }; EN.finishFight(r, C0);
  eq(r.pending && r.pending.type, 'retry', 'lost → pending retry');
  ok(EN.pinOldDeck(r, C0, L) === true, 'pinOldDeck pins', r.retryDeck);
  eq(r.retryDeck, { pos: 4, id: 'label', ids: OLD }, 'run.retryDeck');
  const j = JSON.parse(JSON.stringify(r)); ok(EN.choose(j, C0, { type: 'retry' }).ok, 'retry');
  const g = EN.startFight(j, C0, {});
  eq(g.duel.e.deckIds.slice(0, OLD.length), OLD, 'retry fights the old deck (save/load round trip)');
  const pin = EN.guestDef(j, C0, 'label', 4), slow = EN.trialDeck(C0, 'label', 4, { seedKey: '20261107', runNo: 2, playerAce: 'hall', bossAce: j.bossAce, cls: 'elite', main: pin.main, deckIds: OLD });
  eq(pin.deck, slow.deck, 'buff applied on the pinned list like any deck');
  ok(f.duel.e.deckIds.slice(0, 7).join() !== OLD.join(), 'without the pin the new pool gives another deck', f.duel.e.deckIds);
  // (d) 打到一半的對決也釘；序章、沒在打也沒待說情＝不釘；換位（advance）、jumpTo 拿掉；壞的 retryDeck 不用
  const m = mk(); EN.startFight(m, C0, {}); ok(EN.pinOldDeck(m, C0, L) && m.retryDeck.id === 'label' && m.retryDeck.pos === 4, 'mid-duel pins', m.retryDeck);
  const n0 = mk(); ok(EN.pinOldDeck(n0, C0, L) === false && n0.retryDeck === undefined, 'nothing to pin', n0.retryDeck);
  const pr = EN.newRun(C0, { seedKey: '20261107', runNo: 1, ace: 'hall', prologue: true }); ok(EN.pinOldDeck(pr, C0, L) === false, 'prologue: no pin');
  const w = mk(); EN.startFight(w, C0, {}); EN.pinOldDeck(w, C0, L);
  w.duel.e.hp = 0; w.duel.over = { win: true, by: 'hp', pHp: w.duel.p.hp, eHp: 0 }; EN.finishFight(w, C0);
  for (let k = 0; k < 6 && w.pending; k++) { const ch = w.pending.type === 'level' ? { type: 'level', pick: 'hp' } : { type: 'skip' }; if (!EN.choose(w, C0, ch).ok) break; }
  ok(w.pos === 5 && w.retryDeck === undefined, 'advance drops retryDeck', { pos: w.pos, rd: w.retryDeck });
  const jj = mk(); EN.startFight(jj, C0, {}); EN.pinOldDeck(jj, C0, L); EN.jumpTo(jj, C0, 4); ok(jj.retryDeck === undefined, 'jumpTo drops retryDeck');
  const bad = mk(); bad.retryDeck = { pos: 4, id: 'label', ids: ['nope|nope'] };
  eq(EN.guestDef(bad, C0, 'label', 4).deck.map(c => c.id), EN.guestDef(mk(), C0, 'label', 4).deck.map(c => c.id), 'unknown ids → ignored (normal deck)');
  const other = mk(); other.retryDeck = { pos: 3, id: 'label', ids: OLD };
  eq(EN.guestDef(other, C0, 'label', 4).deck.map(c => c.id), EN.guestDef(mk(), C0, 'label', 4).deck.map(c => c.id), 'another pos → ignored');
});

// ============================================================================================================================
// 第 C 波（SPEC-C §11.1；scratchpad v5/wave-c）：戰利品列、寶箱、店內攤位、踢館帖、客人補償、新手保底、中繼點開局、賣回、一趟留一張、setCtx、樂歷記帳、公關片。
//   用 CW（出貨設定：content.js 的 C.waveC 全開、guestHpSteps [[31,1]]）；C（全關）只在 29-1 對照
// ============================================================================================================================
const WCK = ['far0', 'road', 'lexp', 'tickets', 'chestDry', 'dare', 'dareLast', 'consign', 'fortune', 'safety', 'found'];
const fwin = (run, content) => { const f = EN.startFight(run, content, {}); let g = 0; while (!f.duel.over && g++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } }); return EN.finishFight(run, content); };
const flose = (run, content) => { EN.startFight(run, content, {}); run.duel.p.hp = 0; run.duel.over = { win: false, by: 'hp', pHp: 0, eHp: run.duel.e.hp }; return EN.finishFight(run, content); };
const autoW = (run, content, o) => { let g = 0; while (run.pending && g++ < 200) { const ch = EN.runPolicy(run, content, o); const r = EN.choose(run, content, ch); if (!ok(r.ok, 'auto choice ok', { ch, err: r.error, p: run.pending && run.pending.type })) break; } };
// 打到第 pos 位（站在他面前、沒有 pending）；攤位、獎勵、升級都照 runPolicy／cPolicy
const winToW = (run, content, pos, o) => {
  if (EN.canBargainPick(run) && !run.pending) EN.choose(run, content, EN.bargainPolicy(run, content));
  for (let g = 0; g < 600 && !run.over; g++) {
    if (run.pending) { autoW(run, content, o); continue; }
    if (EN.canBargainPick(run)) { EN.choose(run, content, EN.bargainPolicy(run, content)); continue; }
    if (run.pos >= pos) break;
    fwin(run, content);
  }
  return run;
};
const newW = (sk, o) => EN.newRun(CW, Object.assign({ seedKey: sk, runNo: 2, ace: 'hall', prologue: false }, o || {}));
// 攤位手做：塞一場只有這幾站的攤位（pending 是純資料，跟 stallSession 產生的同形狀）
const fakeStall = (run, groups, o) => { run.pending = Object.assign({ type: 'stall', after: run.pos - 1, pos: run.pos, cp: false, first: false, groups, pick: null, q: [], k: 0, post: [], cur: null, done: [] }, o || {}); return run.pending; };
const pickG = (run, g) => { const r = EN.choose(run, CW, { type: 'stallPick', group: g }); ok(r.ok, 'stallPick ok', r.error); return r; };
const act = (run, a, x) => EN.choose(run, CW, Object.assign({ type: 'stallAct', act: a }, x || {}));
// 全關一趟 50 位（29-1；跟第 C 波以前的引擎逐字相同：scratchpad v5/wave-c/build/src/offdigest.cjs 用 HEAD 的 engine.js 量的摘要）
function driveOff(content, seedKey, runNo, ace, maxPos) {
  const run = EN.newRun(content, { seedKey, runNo, ace }), R = lcg(EN.fnv1a32(seedKey + runNo)), mem = {};
  for (let g = 0; g < 4000; g++) {
    if (run.over && !run.pending) break;
    if (EN.canBargainPick(run) && !run.duel && !run.pending) { EN.choose(run, content, EN.bargainPolicy(run, content)); continue; }
    const st = EN.nextStep(run);
    if (st === 'reward' || st === 'retry' || st === 'level') { EN.choose(run, content, EN.runPolicy(run, content)); continue; }
    if (!st || run.pos > maxPos) break;
    if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, content, 'smart')) EN.choose(run, content, ch);
    const f = EN.startFight(run, content, {});
    let k = 0; while (!f.duel.over && k++ < 40) EN.resolveTurn(f.duel, EN.policies.thoughtful(f.duel, R, mem, content));
    EN.finishFight(run, content);
  }
  return run;
}

section('29 第 C 波（SPEC-C §11.1）：全關＝舊行為、戰利品列、寶箱、攤位（抽站規則、踢館帖、中繼點）、各站動作、做完就存、踢館帖、客人補償、新手保底、中繼點開局、賣回、一趟留一張、setCtx、樂歷、公關片、舊 run', () => {
  EN.setCtx(null);
  // ---- 1 功能全關：一趟 50 位 run JSON（扣第 C 波欄位）跟現行逐字相同；第 C 波欄位停在初值、沒有 stats.c ----
  { let s = ''; const reached = [];
    const CNONE = Object.assign({}, C); delete CNONE.waveC;           // content 沒有 waveC＝引擎預設（也是全關）
    for (const [sk, rn, ace] of [['wcoff1', 1, 'hall'], ['wcoff2', 2, 'pearl'], ['wcoff3', 3, 'heresy'], ['wcoff4', 2, 'hall'], ['wcoff5', 4, 'pearl'], ['wcoff6', 5, 'heresy']]) {
      const run = driveOff(C, sk, rn, ace, 50), o = JSON.parse(JSON.stringify(run));
      ok(o.road.length === 0 && o.found.length === 0 && o.tickets === 0 && o.dare === null && o.consign === null && o.fortune === null && o.safety === false && JSON.stringify(o.lexp) === '{}' && !o.stats.c && o.chestDry === 0, 'off: wave C fields stay at their initial values', sk);
      eq(JSON.stringify(driveOff(CNONE, sk, rn, ace, 50)), JSON.stringify(run), 'off (content waveC on:false) = engine defaults (no content.waveC) ' + sk);
      for (const k of WCK) delete o[k];
      reached.push(o.pos); s += JSON.stringify(o) + '\n';
    }
    eq(reached, [37, 29, 41, 3, 18, 51], 'off: reached the same positions as before wave C');
    eq(EN.fnv1a32(s), 4066452980, 'off: run JSON (minus wave C fields) = engine before wave C (fnv of 6 runs)');
    eq(EN.trialGuest(C, 31, 'normal').hp, 12, 'off: no guest hp step'); }

  // ---- 2／3 戰利品列 ----
  { let rows = 0, withUnplayed = 0, golds = 0, packets = 0;
    for (let s = 1; s <= 60; s++) {
      const run = newW('loot-' + s); EN.choose(run, CW, EN.bargainPolicy(run, CW));
      for (let pos = 1; pos <= 4; pos++) {
        const pre = JSON.stringify(run), m0 = run.money;
        const res = fwin(run, CW), p = run.pending;
        if (!ok(p && p.type === 'reward' && p.kind === 'loot', 'loot pending', p)) break;
        rows++;
        ok(p.cards.length === 3 && new Set(p.cards).size === 3 && p.cards.every(id => !run.bag.includes(id) && CW.cards[id] && !CW.cards[id].tier), 'loot: 3 distinct, not in bag, no apex', p.cards);
        ok(p.src.length === 3 && p.skipCash === SKIP$ && p.need === (pos === 4 ? 'cardOrRelic' : 'card'), 'loot: src, skipCash, need (elite = cardOrRelic)', p);
        if (p.src.includes('unplayed')) withUnplayed++;
        if (p.gold.length) { golds++; const th = EN.wcTh(CW, pos, 'gold'); ok(p.gold.every(id => EN.power(CW.cards[id]) >= th && p.cards.includes(id)), 'gold card from the gold pool', { th, g: p.gold }); }
        ok(p.cards.every(id => run.drops.includes(id)), 'loot cards are the drops (keep-one candidates)');
        if (p.packet) { packets++; if (p.packet.kind === 'cash') ok(res.packetCash === res.earn && run.money === m0 + 2 * res.earn, 'cash packet: paid now, out.packetCash', { m0, m: run.money, res }); else ok(res.packetCash === 0 && run.lexp.packet >= 15, 'lexp packet: lexp.packet +15', run.lexp); }
        else ok(res.packetCash === 0 && run.money === m0 + res.earn, 'no packet: only the win money', res);
        // 同一 met、同一狀態 → 同一列；JSON 來回照存好的
        const a = JSON.parse(pre), b = JSON.parse(pre);
        const fa = fwin(a, CW), fb = fwin(b, CW);
        eq([a.pending.cards, a.pending.src, a.pending.packet], [b.pending.cards, b.pending.src, b.pending.packet], 'same state & met → same row');
        if (JSON.stringify(fa.met) === JSON.stringify(res.met)) eq(a.pending.cards, p.cards, 'same met → same row as the real one');
        const j = JSON.parse(JSON.stringify(run)); eq(j.pending, run.pending, 'row survives JSON');
        // 3：不收 +$400（stats.earned 也加）；收下的進 found
        if (pos % 2) {
          const m1 = run.money, e1 = run.stats.earned, r = EN.choose(run, CW, pos === 4 ? { type: 'skip' } : { type: 'skip' });
          ok(r.ok && run.money === m1 + SKIP$ && run.stats.earned === e1 + SKIP$ && r.effects.some(x => x.cash === SKIP$), 'skip: +skipCash (money and stats.earned)', r);
        } else {
          const id = p.cards[0], r = EN.choose(run, CW, { type: 'take', cardId: id });
          ok(r.ok && run.bag.includes(id) && run.found.includes(id), 'take: into the bag and run.found', r);
        }
        autoW(run, CW);
      }
    }
    ok(rows >= 200, 'enough loot rows', rows);
    ok(withUnplayed / rows >= 0.99, 'loot: ≥99% rows have an unplayed card', withUnplayed + '/' + rows);
    ok(golds > 10 && golds < rows * 0.3, 'loot: some gold rows (15%)', golds + '/' + rows);
    ok(packets > 2 && packets < rows * Math.min(0.25, PACKET * 2.5), 'loot: some packets (' + Math.round(PACKET * 100) + '%)', packets + '/' + rows);
    // 菁英改拿配件：relic → 不給錢、cardDone
    const run = newW('loot-elite'); winToW(run, CW, 4); fwin(run, CW);
    const p = run.pending, m = run.money, r = EN.choose(run, CW, { type: 'relic', relicId: p.relics[0] });
    ok(p.need === 'cardOrRelic' && r.ok && run.relics.includes(p.relics[0]) && run.money === m, 'elite: or take a relic (no cash)', r); }

  // ---- 4 寶箱 ----
  { let n = 0, gold = 0;
    for (let s = 1; s <= 40; s++) {
      const run = newW('chest-' + s, { unlocked: ['hall'] }); winToW(run, CW, 5);
      if (s === 1) run.chestDry = 5;
      const res = fwin(run, CW), p = run.pending;
      if (!ok(p && p.kind === 'chest', 'boss → chest', p)) continue;
      n++;
      ok(p.cards.length === 3 && new Set(p.cards).size === 3 && p.cards.every(id => !CW.cards[id].tier), 'chest: 3 cards, no apex card', p.cards);
      ok(p.relics.length === 1 && p.need === 'cardOrRelic' && p.skipCash === CSKIP$, 'chest: one relic, cardOrRelic, +skipCash', p);
      ok(res.aceWon && run.acesWon.includes(res.aceWon) && !p.cards.includes(res.aceWon), 'boss apex card still goes to acesWon (#465), not into the chest', res.aceWon);
      if (p.gold.length) gold++;
      if (s === 1) ok(p.src[0] === 'apex' && p.apexSlot.length >= 1 && run.chestDry === 0, 'pity: chestDry 5 → apex slot, then 0', { src: p.src, dry: run.chestDry });
      else ok(run.chestDry === (p.apexSlot.length ? 0 : 1), 'chestDry +1 or 0', run.chestDry);
    }
    ok(n === 40 && gold >= 10, 'chests with gold (8%+30% each card)', gold);
    // 踢館帖撐完：4 張、保證金邊、+$5,000
    const run = newW('chest-dare'); winToW(run, CW, 5); run.dare = { round: run.round, mode: 'tough' };
    const m0 = run.money, res = fwin(run, CW), p = run.pending;
    ok(p.cards.length === 4 && p.dare === true && p.src.some(x => x === 'gold' || x === 'apex'), 'dare chest: 4 cards with gold', p);
    ok(run.money === m0 + res.earn + 5000 && res.dareCash === 5000 && run.stats.c.income.dare === 5000, 'dare done: +$5,000', { m0, m: run.money, res }); }

  // ---- 5 攤位 ----
  { const run = newW('stall-a');
    winToW(run, CW, 5); ok(!run.pending && run.pos === 5, 'no stall inside a round');
    fwin(run, CW); autoW(run, CW, { pickFirst: true });           // pickFirst：停在…不，autoW 會逛完；改用手走
    ok(run.pos === 6 && !run.pending, 'first session walked through (auto)');
    const r2 = newW('stall-b'); winToW(r2, CW, 5); fwin(r2, CW);
    for (let g = 0; g < 10 && r2.pending && r2.pending.type !== 'stall'; g++) EN.choose(r2, CW, EN.runPolicy(r2, CW));
    const p = r2.pending;
    ok(p && p.type === 'stall' && p.after === 5 && p.first && !p.cp, 'after the round (pos 5 won) → stall session', p);
    eq(p.groups, [['dig', 'fortune'], ['warehouse', 'home']], 'first session: fixed groups');
    eq(p.post, ['studio'], 'first session: studio after');
    ok(EN.nextStep(r2) === 'stall' && !EN.canShop(r2), 'stall pending: nextStep stall, cannot shop');
    // 中繼點（打完第 10 位）：市集＋錄音室
    autoW(r2, CW); winToW(r2, CW, 10); fwin(r2, CW);
    for (let g = 0; g < 10 && r2.pending && r2.pending.type !== 'stall'; g++) EN.choose(r2, CW, EN.runPolicy(r2, CW));
    ok(r2.pending && r2.pending.cp && r2.pending.after === 10 && !r2.pending.first, 'checkpoint session after 10', r2.pending);
    eq(r2.pending.post, ['market', 'studio'], 'checkpoint: market then studio');
    ok(!r2.pending.groups.flat().includes('dare'), 'no dare at a checkpoint'); }
  { // 抽站規則（CRITIQUE 3.1）：1 萬場、花錢站每組 ≤1、四站至少一個藍框（含換上踢館帖之後）；同組不重複；未解鎖的不出；踢館帖只在第 ② 站
    const W = EN.wcCfg(CW), PAID = W.stall.paid, BLUE = W.stall.blue;
    let bad = 0, dares = 0, n = 0, promoEarly = 0, consignEarly = 0, dareAt1 = 0;
    for (let i = 0; i < 10000; i++) {
      const after = [6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 21, 26, 31, 36, 41, 46, 51, 56][i % 18] * 5 / 5 | 0;
      const a = [10, 15, 20, 25, 35, 40, 45, 55, 60, 65][i % 10];   // 打完第幾位（不是中繼點：中繼點另驗）
      const run = newW('draw-' + i, { bestFar: i % 3 ? 0 : 40 }); run.pos = a + 1; run.round = EN.roundOf(a + 1); run.idx = 0;
      if (EN.isCheckpoint(a, CW)) continue;
      EN.stallSession(run, CW); const p = run.pending; n++;
      const all = p.groups.flat();
      if (p.groups.some(g => g.filter(k => PAID.includes(k)).length > 1) || !all.some(k => BLUE.includes(k)) || new Set(all).size !== all.length || p.groups.length !== 2) bad++;
      if (all.includes('dare')) { dares++; if (p.groups.some(g => g[0] === 'dare')) dareAt1++; }
      if (run.far0 === 0 && a < 10 && all.includes('promo')) promoEarly++;
      if (run.far0 === 0 && a < 15 && all.includes('consign')) consignEarly++;
    }
    ok(n > 7000 && bad === 0, 'draw rules hold in every session (paid ≤1 per group, ≥1 blue, distinct, 2 groups)', { n, bad });
    ok(dares > 0 && dareAt1 === 0, 'dare only as station ②', { dares, dareAt1 });
    ok(promoEarly === 0 && consignEarly === 0, 'locked stations never show', { promoEarly, consignEarly });
    // 解鎖看 max(最遠紀錄, 剛打完)：最遠 40 的老玩家打完第 10 位前 promo 可以出
    let promoOld = 0; for (let i = 0; i < 400; i++) { const run = newW('drawp-' + i, { bestFar: 40 }); run.pos = 16; run.round = 4; EN.stallSession(run, CW); if (run.pending.groups.flat().includes('promo')) promoOld++; }
    ok(promoOld > 0, 'far ≥10 → promo can show at after 15', promoOld); }
  { // 踢館帖（CRITIQUE 3.2）：最遠 30 的老玩家第 16–29 位 0 次；第 30 位起（非中繼點）35%；不連兩輪
    let early = 0, at35 = 0, N35 = 2000, consec = 0;
    for (let i = 0; i < 2000; i++) for (const a of [15, 20, 25]) { const run = newW('dare-e' + i, { bestFar: 30 }); run.pos = a + 1; run.round = EN.roundOf(a + 1); EN.stallSession(run, CW); if (run.pending.groups.flat().includes('dare')) early++; }
    for (let i = 0; i < N35; i++) { const run = newW('dare-l' + i, { bestFar: 30 }); run.pos = 36; run.round = 8; EN.stallSession(run, CW); if (run.pending.groups.flat().includes('dare')) at35++; }
    ok(early === 0, 'dare: none before this run reaches 30 (even with best 30)', early);
    ok(Math.abs(at35 / N35 - 0.35) < 0.04, 'dare: ~35% from 30 on', at35 / N35);
    for (let i = 0; i < 400; i++) { const run = newW('dare-c' + i); let last = false; for (let a = 35; a <= 95; a += 5) { if (EN.isCheckpoint(a, CW)) { last = false; continue; } run.pos = a + 1; run.round = EN.roundOf(a + 1); EN.stallSession(run, CW); const d = run.pending.groups.flat().includes('dare'); if (d && last) consec++; last = d; } }
    ok(consec === 0, 'dare never two rounds in a row', consec);
    // 中繼點開局那一位打完的攤位不是中繼點攤位（CRITIQUE 4.5）；下一個中繼點起照常
    const cp = newW('cp-sess'); cp.cpFrom = 10; cp.pos = 11; cp.round = 3; EN.stallSession(cp, CW);
    ok(!cp.pending.cp && !cp.pending.post.length && !cp.pending.first, 'cp start: the session after N is a normal one', cp.pending);
    cp.pos = 21; cp.round = 5; cp.pending = null; EN.stallSession(cp, CW); ok(cp.pending.cp && cp.pending.post.join() === 'market,studio', 'next checkpoint as usual'); }

  // ---- 6 每一站動作 ----
  { // 挖寶攤：錢不夠擋、重翻價錢梯、不收 +$400、收下＝撿來的
    const run = newW('st-dig'); winToW(run, CW, 6); run.pos = 7; fakeStall(run, [['dig', 'snack'], ['home', 'gig']]); pickG(run, 0);
    const cur = run.pending.cur; ok(cur.kind === 'dig' && cur.cards.length === 3 && cur.name, 'dig: 3 cards and a name', cur);
    ok(new Set(cur.cards.map(id => EN.topAttr(CW.cards[id]))).size === 3 || !!cur.gold, 'dig: one of each colour (unless gold took the last)', cur.cards.map(id => EN.topAttr(CW.cards[id])));
    run.money = 400; const s0 = JSON.stringify(run); ok(act(run, 'reroll').error === 'money' && JSON.stringify(run) === s0, 'reroll: not enough money → unchanged');
    run.money = 5000; const c0 = cur.cards.slice(); ok(act(run, 'reroll').ok && run.money === 4500 && run.pending.cur.rolls === 1, 'reroll 1 = $500');
    ok(JSON.stringify(run.pending.cur.cards) !== JSON.stringify(c0), 'reroll: new cards'); ok(act(run, 'reroll').ok && run.money === 3500, 'reroll 2 = $1,000');
    const id = run.pending.cur.cards[0]; ok(act(run, 'take', { cardId: id }).ok && run.bag.includes(id) && run.found.includes(id) && run.pending.cur.kind === 'snack', 'take → bag, found, next station');
    const h0 = run.hp; run.hp = Math.max(1, run.maxHp - 5); const h1 = run.hp; ok(act(run, 'ok').ok && run.hp === Math.min(run.maxHp, h1 + 3), 'snack +3 (cap)', { h0, h1, hp: run.hp });
    ok(run.pending === null, 'group of two done → pending cleared (no post)'); }
  { // 演唱會：門票價錢梯整趟累計（演唱會 → 市集）、gigKeepN
    const run = newW('st-gig'); winToW(run, CW, 11); run.money = 20000; run.tickets = 0; const lx0 = Object.assign({}, run.lexp);
    eq([EN.gigPrice(run, CW, 1), EN.gigPrice(run, CW, 3)], [3000, 12000], 'gigPrice: 3000, 3000+4000+5000');
    eq(EN.gigKeepN(run, CW), 3, 'gigKeepN: keep $4,000 → 3 tickets ($12,000 of $16,000)');
    fakeStall(run, [['gig', 'snack'], ['dig', 'home']], { cp: true, post: ['market', 'studio'] }); pickG(run, 0);
    ok(act(run, 'tickets', { n: 2 }).ok && run.money === 13000 && run.tickets === 2 && run.lexp.gig === (lx0.gig | 0) + 40, 'gig: 2 tickets $7,000, lexp +40', { m: run.money, t: run.tickets });
    act(run, 'ok');                                                // 宵夜
    ok(run.pending.cur.kind === 'market', 'then the market');
    eq(EN.gigPrice(run, CW, 1), 5000, 'ladder carries across stations: next is $5,000');
    ok(act(run, 'tickets', { n: 1 }).ok && run.money === 8000 && run.tickets === 3, 'market tickets use the same ladder');
    run.money = 100; ok(act(run, 'tickets', { n: 1 }).error === 'money', 'market tickets: money');
    ok(act(run, 'tickets', { n: -1 }).error === 'badN', 'tickets: bad n');
    ok(act(run, 'done').ok && run.pending.cur.kind === 'studio', 'market done → studio');
    ok(act(run, 'ok').ok && run.pending === null && run.lexp.demo === (lx0.demo | 0) + 15, 'studio: lexp demo +15, done', run.lexp); }
  { // 器材行：配件滿 3 件要丟（半價賣掉）；不扣這一輪櫃檯在賣的
    const run = newW('st-gear', { relics: ['dustcover', 'stylus', 'cleaner'] }); winToW(run, CW, 6); run.money = 10000;
    fakeStall(run, [['gear', 'snack'], ['dig', 'home']]); pickG(run, 0);
    const cur = run.pending.cur; ok(cur.relics.length >= 1 && cur.relics.every(id => !run.relics.includes(id) && !(run.shop.relics || []).includes(id)), 'gear: not owned, not on the counter this round', { cur: cur.relics, shop: run.shop.relics });
    ok(act(run, 'buyRelic', { relicId: cur.relics[0] }).error === 'relicsFull', 'relics full → need a drop');
    const half = EN.sellValue(CW, 'stylus'), m = run.money;
    ok(act(run, 'buyRelic', { relicId: cur.relics[0], dropRelicId: 'stylus' }).ok && run.money === m - 3000 + half && !run.relics.includes('stylus') && run.relics.length === 3, 'drop stylus (half price), pay $3,000', run.money); }
  { // 寄賣：放 1 張、兩輪後的攤位開頭先領（三張金邊挑一）；領完 pending 還在、能選組；中繼點還有市集和錄音室（CRITIQUE 1.2）
    const run = newW('st-con'); winToW(run, CW, 16); fakeStall(run, [['consign', 'snack'], ['dig', 'home']]); pickG(run, 0);
    const gift = run.gifts[0]; ok(act(run, 'consign', { cardId: gift }).error === 'badConsign', 'cannot consign a gift');
    const x = run.bag.find(id => !run.gifts.includes(id) && !(run.seeds || []).includes(id));
    ok(act(run, 'consign', { cardId: x }).ok && !run.bag.includes(x) && run.consign.card === x && run.consign.due === run.round + 2, 'consign: out of the bag, due in two rounds', run.consign);
    act(run, 'ok'); ok(run.pending === null, 'done');
    // 一輪後：還沒到
    run.round += 1; run.pos += 5; EN.stallSession(run, CW); ok(run.pending.q.length === 0 && !run.pending.cur, 'not due yet');
    // 兩輪後、而且剛好是中繼點（打完第 30 位）
    run.round = 7; run.pos = 31; run.pending = null; EN.stallSession(run, CW);
    const p = run.pending; ok(p.cp && p.cur && p.cur.kind === 'consignGet' && p.cur.cards.length === 3, 'due: consignGet first, 3 gold cards', p);
    const s1 = JSON.stringify(p.cur.cards); ok(EN.choose(run, CW, { type: 'stallPick', group: 0 }).error === 'noStallPick', 'cannot pick a group before the consign book');
    const take = p.cur.cards[1]; ok(act(run, 'take', { cardId: take }).ok && run.bag.includes(take) && run.found.includes(take) && run.consign === null, 'take one of three → found, consign cleared');
    ok(run.pending && run.pending.type === 'stall' && run.pending.pick === null && !run.pending.cur, 'pending stays, waiting for a group (CRITIQUE 1.2)');
    pickG(run, 1); ok(run.pending.q.slice(-2).join() === 'market,studio', 'checkpoint still has market and studio', run.pending.q);
    // 不拿也一樣留著（沒有 +$400）
    const r2 = newW('st-con2'); winToW(r2, CW, 16); r2.consign = { card: 'x', due: r2.round }; r2.pos = 21; r2.round = 5; EN.stallSession(r2, CW);
    const m2 = r2.money; ok(act(r2, 'skip').ok && r2.money === m2 && r2.pending && r2.pending.pick === null && r2.consign === null, 'skip the consign book: no cash, pending stays'); void s1; }
  { // 今天不逛了（CRITIQUE 1.7）：選組前（一般 +$2,000、中繼點 +$3,000）、選組後、市集裡
    const a = newW('lv-a'); winToW(a, CW, 6); fakeStall(a, [['dig', 'snack'], ['home', 'gig']]);
    let m = a.money, r = EN.choose(a, CW, { type: 'stallLeave' }); ok(r.ok && a.money === m + 2000 && a.pending === null && r.effects.some(x => x.cash === 2000), 'leave before picking: +$2,000', r);
    const b = newW('lv-b'); winToW(b, CW, 11); fakeStall(b, [['dig', 'snack'], ['home', 'gig']], { cp: true, post: ['market', 'studio'] });
    m = b.money; r = EN.choose(b, CW, { type: 'stallLeave' }); ok(r.ok && b.money === m + 3000 && b.pending.cur.kind === 'studio' && b.pending.pick === -1, 'checkpoint, before picking: +$3,000, studio stays', b.pending);
    ok(act(b, 'ok').ok && b.pending === null, 'studio done');
    const c = newW('lv-c'); winToW(c, CW, 6); fakeStall(c, [['dig', 'snack'], ['home', 'gig']]); pickG(c, 0); act(c, 'skip');
    m = c.money; r = EN.choose(c, CW, { type: 'stallLeave' }); ok(r.ok && c.money === m + 1000 && c.pending === null, 'after picking, one station left: +$1,000');
    const d = newW('lv-d'); winToW(d, CW, 11); fakeStall(d, [['snack', 'home'], ['dig', 'gig']], { cp: true, post: ['market', 'studio'] }); pickG(d, 0); act(d, 'ok'); act(d, 'ok');
    ok(d.pending.cur.kind === 'market', 'in the market'); m = d.money; r = EN.choose(d, CW, { type: 'stallLeave' }); ok(r.ok && d.money === m + 1000 && d.pending.cur.kind === 'studio', 'leave in the market: +$1,000, studio stays');
    // 寄賣領取那站照留
    const e = newW('lv-e'); winToW(e, CW, 16); e.consign = { card: 'x', due: 6 }; e.round = 6; e.pos = 26; EN.stallSession(e, CW);   // 打完第 25 位（不是中繼點）
    const g0 = JSON.stringify(e.pending.cur); m = e.money; r = EN.choose(e, CW, { type: 'stallLeave' });
    ok(r.ok && e.money === m + 2000 && e.pending.cur && e.pending.cur.kind === 'consignGet' && JSON.stringify(e.pending.cur) === g0, 'leave at the consign book: +$2,000, the book stays (same cards)'); }

  // ---- 7 做完就存：JSON 來回 pending.cur 一樣、照樣做完；同一 seed 同一場攤位同一批貨 ----
  { const mk = () => { const r = newW('save-st'); winToW(r, CW, 5); fwin(r, CW); for (let g = 0; g < 10 && r.pending && r.pending.type !== 'stall'; g++) EN.choose(r, CW, EN.runPolicy(r, CW)); return r; };
    const a = mk(), b = mk(); eq(a.pending, b.pending, 'same seed → same session'); pickG(a, 0); pickG(b, 0);
    eq(a.pending.cur, b.pending.cur, 'same seed → same goods'); const j = JSON.parse(JSON.stringify(a)); eq(j.pending.cur, a.pending.cur, 'cur survives JSON');
    const id = j.pending.cur.cards[0]; ok(EN.choose(j, CW, { type: 'stallAct', act: 'take', cardId: id }).ok && j.bag.includes(id), 'finish the station after a reload');
    // cur 沒了（舊版存在 cur 產生前）→ stallResume 重進同一站、同一批貨
    // cur 沒了（保險路徑，§2.4）→ stallResume 重進同一站；這時 road 已經扣過那一批，貨可以不同（SPEC 明文「無所謂」）
    const k = JSON.parse(JSON.stringify(a)); k.pending.cur = null; EN.stallResume(k, CW);
    ok(k.pending.cur && k.pending.cur.kind === a.pending.cur.kind && k.pending.cur.cards.length === 3 && k.pending.k === a.pending.k, 'stallResume: same station again', k.pending.cur); }

  // ---- 8 踢館帖：那一輪 guestDef 加上、roundGuests 帶 dare、下一輪清掉 ----
  { const run = newW('dare-g'); winToW(run, CW, 36); const id = run.order[run.idx];
    const g0 = EN.guestDef(run, CW, id, 36); run.dare = { round: run.round, mode: 'tough' };
    const g1 = EN.guestDef(run, CW, id, 36); ok(g1.atk === g0.atk + 1 && g1.hp === g0.hp && g1.dare === 'tough', 'tough: atk +1', { g0: g0.atk, g1: g1.atk });
    run.dare.mode = 'tank'; const g2 = EN.guestDef(run, CW, id, 36); ok(g2.hp === g0.hp + 4 && g2.atk === g0.atk && g2.dare === 'tank', 'tank: hp +4');
    ok(EN.roundGuests(run, CW).every(x => x.dare === 'tank'), 'roundGuests carry dare');
    ok(!('dare' in EN.roundGuests(newW('dare-n'), CW)[0]), 'no dare → no key');
    winToW(run, CW, 41); ok(run.dare === null && !EN.guestDef(run, CW, run.order[run.idx], 41).dare, 'next round: cleared'); }

  // ---- 9 客人補償 guestHpSteps [[31,1]]（第 D 波 V3 在第 51 位以後再加：見 #30）----
  eq([EN.trialGuest(CW, 30, 'normal').hp, EN.trialGuest(CW, 31, 'normal').hp, EN.trialGuest(CW, 30, 'boss').hp, EN.trialGuest(CW, 35, 'boss').hp, EN.trialGuest(CW, 50, 'elite').hp], [12, 13, 14, 15, 13], 'guestHpSteps: 30 → 12, 31 → 13, boss 30 → 14, 35 → 15, then no more until 50');
  { const C31 = Object.assign({}, CW, { trial: Object.assign({}, CW.trial, { guestHpSteps: [[31, 1]] }) }); eq(EN.trialGuest(C31, 99, 'elite').hp, 13, 'wave C step alone: no more after 31'); }
  eq(EN.trialGuest(Object.assign({}, CW, { trial: Object.assign({}, CW.trial, { guestHpSteps: [[11, 1], [31, 2]] }) }), 40, 'normal').hp, 15, 'steps add up');

  // ---- 10 新手保底 ----
  { const run = newW('safe', { safety: true }); ok(run.safety === true, 'safety on'); EN.choose(run, CW, EN.bargainPolicy(run, CW));
    const r0 = run.retryLeft; flose(run, CW); const p = run.pending;
    ok(p && p.type === 'retry' && p.free && p.safety && p.pos === 1 && run.safety === false && run.retryLeft === r0, 'lose at 1 → free retry (no plea used), only once', p);
    const r = EN.choose(run, CW, { type: 'retry' }); ok(r.ok && run.retryLeft === r0 && r.effects[0].safety === true, 'retry: retryLeft unchanged', r);
    flose(run, CW); ok(run.pending.type === 'retry' && !run.pending.free && !run.pending.safety, 'second loss at 1 → normal plea');
    const s2 = newW('safe2', { safety: true }); winToW(s2, CW, 2); flose(s2, CW); ok(!s2.pending.safety && !s2.pending.free, 'lose at 2 → normal plea');
    ok(newW('safe3', { safety: true, from: 10 }).safety === false && newW('safe4').safety === false, 'no safety for a checkpoint start or without o.safety');
    ok(EN.newRun(C, { seedKey: 's5', runNo: 2, ace: 'hall', prologue: false, safety: true }).safety === false, 'content safety off → none'); }

  // ---- 11 中繼點開局 ----
  { // 第 I 波 I-0：選秀 m／k 維持封閉式（逐位累計量過 C1 第 30 位出界，見 engine expLevel 註解）；出貨 content 跟舊段落 content 一樣
    eq([10, 20, 30, 50, 75, 100].map(N => EN.draftPlan(CW, N)), [{ k: 2, m: 4 }, { k: 3, m: 6 }, { k: 4, m: 8 }, { k: 5, m: 12 }, { k: 5, m: 16 }, { k: 5, m: 19 }], 'draftPlan table (§5.6；驗收修正 m＝round(L−2))');
    eq([10, 20, 30, 50, 75, 100].map(N => EN.draftPlan(C, N)), [10, 20, 30, 50, 75, 100].map(N => EN.draftPlan(CW, N)), 'draftPlan does not depend on firstNeed');
    ok([10, 20, 30, 50, 75, 100].every(N => Math.round(EN.expLevel(N, C) - 2) === Math.round(EN.expLevel(N) - 2)), 'expLevel(N, firstNeed 0) rounds like the closed form');
    const run = newW('cp10', { from: 10, relics: ['dustcover'] });
    ok(run.cpFrom === 10 && run.pos === 1 && run.prologue === null && run.pending.type === 'draft' && run.pending.k === 2 && run.pending.m === 4 && EN.nextStep(run) === 'draft', 'from 10 → draft, pos stays 1', run.pending);
    ok(!EN.canBargainPick(run) && !EN.canSwitchAce(run, CW), 'no bargain pick / ace switch during the draft');
    const j = JSON.parse(JSON.stringify(run)); eq(j.pending, run.pending, 'draft survives JSON');
    const of = run.pending.offer; ok(of.kind === 'card' && of.cards.length === 2, 'card offer: 2 cards');
    const r = EN.choose(run, CW, { type: 'draft', cardId: of.cards[0] });
    ok(r.ok && r.effects.some(x => x.gainCard === of.cards[0]) && run.entered.includes(of.cards[0]) && run.stats.taken.includes(of.cards[0]) && run.found.includes(of.cards[0]), 'draft card: gainCard effect, entered, stats.taken, found (CRITIQUE 1.6)');
    ok(EN.choose(run, CW, { type: 'draft', cardId: 'nope' }).error === 'notOffered', 'draft: not offered');
    const L0 = run.level; autoW(run, CW);
    ok(!run.pending && run.pos === 10 && run.round === 2 && run.idx === 4 && run.level === L0 + 4 && run.retryLeft === 1, 'draft done → at 10, 4 level-ups', { pos: run.pos, lv: run.level });
    ok(EN.canBargainPick(run), 'bargain pick before 10'); EN.choose(run, CW, EN.bargainPolicy(run, CW));
    ok(EN.canSwitchAce(run, CW) && EN.switchAce(run, CW, 'pearl').ok, 'can switch ace before the first fight (CRITIQUE 1.6)');
    ok(EN.classAt(10) === 'boss', 'first guest is the boss');
    fwin(run, CW); for (let g = 0; g < 10 && run.pending && run.pending.type !== 'stall'; g++) EN.choose(run, CW, EN.runPolicy(run, CW));
    ok(run.pending && run.pending.type === 'stall' && !run.pending.cp && !run.pending.post.length, 'session after N is not a checkpoint session (CRITIQUE 4.5)', run.pending);
    // 選秀 0 題：直接跳
    const z = EN.newRun(Object.assign({}, CW, { waveC: Object.assign({}, CW.waveC, { draft: { k: 0, m: 0 } }) }), { seedKey: 'cpz', runNo: 2, ace: 'hall', from: 20 });
    ok(!z.pending && z.pos === 20, 'k 0 m 0 → straight to N'); }

  // ---- 12 賣（CRITIQUE 1.5／2.1）：櫃檯、同業調貨、市集三處都走 sellCore ----
  { const run = newW('sell', { seeds: [] }); winToW(run, CW, 6); run.money = 50000;
    fakeStall(run, [['trade', 'snack'], ['dig', 'home']]); pickG(run, 0);
    const plain = run.bag.find(id => !run.gifts.includes(id)), half = EN.sellValue(CW, CW.cards[plain]);
    eq(EN.sellQuote(run, CW, plain), { ok: false, error: 'notNow' }, 'counter sellQuote during the stall → notNow');
    const g = run.gifts[0]; let m = run.money, r = act(run, 'sell', { cardId: g });
    ok(r.ok && run.money === m && !run.gifts.includes(g) && !run.bag.includes(g) && r.effects[0].reclaim === 'gift', 'trade: a gift goes back for $0 and is not a gift any more', r);
    const id = run.pending.cur.cards[1], pr = EN.priceOf(CW, id); m = run.money;
    ok(act(run, 'buy', { cardId: id }).ok && run.money === m - pr && run.stats.bought.includes(id) && !run.found.includes(id), 'trade: buy (bought, not found)');
    m = run.money; ok(act(run, 'sell', { cardId: id }).ok && run.money === m + EN.sellValue(CW, CW.cards[id]), 'trade: sell a bought one = half');
    const f = run.bag.find(x => !run.gifts.includes(x)); run.found.push(f); m = run.money;
    ok(act(run, 'sell', { cardId: f }).ok && run.money === m + Math.min(EN.sellValue(CW, CW.cards[f]), SKIP$) && !run.found.includes(f), 'trade: a found one = skipCash, out of found');
    run.bag.push(f); eq(EN.sellCore(run, CW, f).earn, EN.sellValue(CW, CW.cards[f]), 'bought back later → half again');
    act(run, 'done'); act(run, 'ok'); ok(!run.pending && EN.canShop(run), 'stall over → counter open');
    const f2 = run.bag.find(x => !run.gifts.includes(x) && x !== f); run.found.push(f2);
    const q = EN.sellQuote(run, CW, f2); ok(q.ok && q.found === true && q.earn === Math.min(EN.sellValue(CW, CW.cards[f2]), SKIP$), 'counter: found → skipCash (q.found)', q);
    m = run.money; r = EN.choose(run, CW, { type: 'sell', cardId: f2 }); ok(r.ok && run.money === m + q.earn && r.effects[0].found === true && !run.found.includes(f2), 'counter sell found', r);
    // 種子
    const sd = newW('sell-sd', { seeds: [EN.seedPolicy(CW, Object.keys(CW.cards), 1)[0]] }); winToW(sd, CW, 2); const s0 = sd.seeds[0];
    m = sd.money; r = EN.choose(sd, CW, { type: 'sell', cardId: s0 }); ok(r.ok && sd.money === m && !sd.seeds.includes(s0) && r.effects[0].reclaim === 'seed', 'counter: seed → $0, not a seed any more', r);
    // 市集
    const mk = newW('sell-mk'); winToW(mk, CW, 11); fakeStall(mk, [['snack', 'home'], ['dig', 'gig']], { cp: true, post: ['market', 'studio'] }); pickG(mk, 0); act(mk, 'ok'); act(mk, 'ok');
    const fm = mk.bag.find(x => !mk.gifts.includes(x)); mk.found.push(fm); m = mk.money;
    ok(mk.pending.cur.kind === 'market' && act(mk, 'sell', { cardId: fm }).ok && mk.money === m + Math.min(EN.sellValue(CW, CW.cards[fm]), SKIP$), 'market sell = sellCore');
    ok(act(mk, 'sell', { cardId: 'nope' }).error === 'badSell', 'market sell: not in the bag'); }

  // ---- 13 一趟留一張：不含買的；含撿來的、他掉的 ----
  { const run = newW('keep-w'); winToW(run, CW, 6); run.money = 50000; fakeStall(run, [['trade', 'snack'], ['dig', 'home']]); pickG(run, 0);
    const b = run.pending.cur.cards[0]; act(run, 'buy', { cardId: b }); act(run, 'done'); act(run, 'ok');
    fwin(run, CW); const row = run.pending.cards.slice(); EN.choose(run, CW, { type: 'take', cardId: row[0] }); autoW(run, CW);
    const k = EN.keepCandidates(run, CW, null);
    ok(!k.includes(b) && k.includes(row[0]) && row.every(id => k.includes(id) || CW.cards[id].tier), 'keep: not the bought one; the taken and the shown ones are in', { b, k: k.length }); }

  // ---- 14 setCtx（CRITIQUE 1.8）：設了 owned → 金邊、公關片不出擁有的；清掉 → 跟沒設一樣 ----
  { let tested = 0;
    for (let s = 1; s <= 80 && tested < 3; s++) {
      const run = newW('ctx-' + s); EN.choose(run, CW, EN.bargainPolicy(run, CW)); const pre = JSON.stringify(run);
      fwin(run, CW); const g = run.pending.gold[0]; if (!g) continue; tested++;
      const a = JSON.parse(pre); EN.setCtx({ owned: id => id === g }); fwin(a, CW); EN.setCtx(null);
      ok(a.pending.gold.length === 1 && a.pending.gold[0] !== g, 'owned gold card is not offered', [g, a.pending.gold]);
      const b = JSON.parse(pre); fwin(b, CW); eq(b.pending.cards, run.pending.cards, 'setCtx(null) = never set');
    }
    ok(tested === 3, 'found gold rows to test', tested);
    const run = newW('ctx-promo'); winToW(run, CW, 11); const pre = JSON.stringify(run);
    fakeStall(run, [['promo', 'snack'], ['dig', 'home']]); pickG(run, 0); const c0 = run.pending.cur.cards.slice();
    const a = JSON.parse(pre); EN.setCtx({ owned: c0 }); fakeStall(a, [['promo', 'snack'], ['dig', 'home']]); pickG(a, 0); EN.setCtx(null);
    ok(a.pending.cur.cards.every(id => !c0.includes(id)), 'promo: owned ones skipped (array form)', a.pending.cur.cards);
    let hit0 = 0, hit1 = 0; const T2 = ['night', 'drive'].filter(Boolean), cells = (CW.tunes && CW.tunes.order) || [];
    const two = cells.slice(0, 2);
    for (let s = 0; s < 150; s++) {
      const x = newW('ctx-t' + s); x.pos = 21; fakeStall(x, [['promo', 'snack'], ['dig', 'home']]); pickG(x, 0); hit0 += x.pending.cur.cards.filter(id => two.includes(CW.cards[id].tune)).length;
      const y = newW('ctx-t' + s); y.pos = 21; EN.setCtx({ tunes: () => two }); fakeStall(y, [['promo', 'snack'], ['dig', 'home']]); pickG(y, 0); EN.setCtx(null); hit1 += y.pending.cur.cards.filter(id => two.includes(CW.cards[id].tune)).length;
    }
    ok(two.length === 2 && hit1 > hit0 * 1.5, 'promo: your two tunes ×3', { two, hit0, hit1 }); void T2; }

  // ---- 15 樂歷基本／runSummary（CRITIQUE 3.4） ----
  { const r = newW('lx', { from: 10 }); autoW(r, CW); r.pos = 14; r.bestStreak = 3; r.lexp = { gig: 40 };
    eq(EN.lexpBase(r), 15 * 5 + 8 * 3, 'lexpBase from 10: 15×(14−10+1)+8×3');
    const sm = EN.runSummary(r); ok(sm.from === 10 && sm.lexp.base === 99 && sm.lexp.gig === 40, 'runSummary.from, lexp with base', sm);
    const n = newW('lx2'); n.pos = 7; n.bestStreak = 6; eq([EN.lexpBase(n), EN.runSummary(n).from], [15 * 7 + 48, 1], 'lexpBase from 1'); }

  // ---- 16 公關片：effects 是「認識」（shelf），不是 own、不進包包 ----
  { const run = newW('promo'); winToW(run, CW, 11); fakeStall(run, [['promo', 'snack'], ['dig', 'home']]); pickG(run, 0);
    const cards = run.pending.cur.cards.slice(), bag = run.bag.slice(), p0 = run.lexp.promo | 0, r = act(run, 'ok');
    ok(r.ok && r.effects.some(x => JSON.stringify(x.shelf) === JSON.stringify(cards)) && !r.effects.some(x => x.gainCard || x.own) && JSON.stringify(run.bag) === JSON.stringify(bag) && run.lexp.promo === p0 + 10, 'promo: shelf effect (met), not owned, not in the bag, lexp +10', r.effects); }

  // ---- 其他：站點錯誤不動 run、算命、倉庫、home、解鎖階梯、舊 run（fixWaveC）、整趟自動玩 ----
  { const run = newW('misc'); winToW(run, CW, 6);
    ok(EN.choose(run, CW, { type: 'stallAct', act: 'ok' }).error === 'noStation' && EN.choose(run, CW, { type: 'stallPick', group: 0 }).error === 'noStallPick' && EN.choose(run, CW, { type: 'draft', pick: 'atk' }).error === 'noDraft', 'no stall/draft → errors');
    fakeStall(run, [['fortune', 'home'], ['dig', 'snack']]); ok(EN.choose(run, CW, { type: 'stallPick', group: 5 }).error === 'badGroup', 'bad group'); pickG(run, 0);
    const fb = run.pending.cur.boss; ok(fb && fb.pos === 10 && fb.id === run.order[4] && fb.ratio.c + fb.ratio.o + fb.ratio.h === EN.guestDef(run, CW, fb.id, 10).deck.length && run.fortune === fb, 'fortune: this round boss ratio', fb);
    ok(EN.roundGuests(run, CW)[4].fortune === fb && !('fortune' in EN.roundGuests(run, CW)[0]), 'roundGuests: fortune on the boss slot');
    const s0 = JSON.stringify(run); ok(act(run, 'take').error === 'badAct' && JSON.stringify(run) === s0, 'wrong act → unchanged'); act(run, 'ok');
    ok(act(run, 'ok', { cardId: 'nope' }).error === 'notOffered', 'home: card must be in the bag');
    const r = act(run, 'ok', { cardId: run.bag[0] }); ok(r.ok && r.effects.some(x => x.nowPlaying === run.bag[0]) && run.lexp.home === 30 && !run.pending, 'home: now playing + lexp 30');
    const w = newW('wh', { relics: ['dustcover', 'stylus', 'cleaner'] }); winToW(w, CW, 6); fakeStall(w, [['warehouse', 'home'], ['dig', 'snack']]); pickG(w, 0);
    ok(!w.pending.cur.relics.length && w.pending.cur.cards.length === 2, 'warehouse with 3 relics → two records instead');
    const L0 = EN.stallLadder(CW, 0), L5 = EN.stallLadder(CW, 12);
    ok(L0.n === 2 && L0.total === 6 && L0.next.id === 'studio' && L0.next.left === 5 && L5.n === 4 && L5.next.id === 'consign' && L5.next.left === 3 && EN.stallLadder(CW, 30).next === null, 'stall ladder', { L0, L5 }); }
  { // 舊 run（第 C 波以前存的）：fixWaveC 補欄位；不在卡池的 id 濾掉、各有退路
    const old = newW('fix'); winToW(old, CW, 2); for (const k of WCK) delete old[k];
    ok(EN.fixWaveC(old, CW, { bestFar: 23, chestDry: 2 }) && old.far0 === 23 && old.chestDry === 2 && Array.isArray(old.road) && Array.isArray(old.found) && old.safety === false, 'old run: fields filled');
    ok(EN.fixWaveC(old, CW, {}) === false, 'second call: no change');
    const r = newW('fix2'); winToW(r, CW, 2); fwin(r, CW); r.pending.cards[1] = 'gone|gone'; r.found.push('gone|x'); r.road.push('gone|y');
    EN.fixWaveC(r, CW); ok(r.pending.cards.length === 2 && r.pending.src.length === 2 && !r.found.includes('gone|x') && !r.road.includes('gone|y'), 'unknown ids dropped (cards and src together)', r.pending);
    const z = newW('fix3'); winToW(z, CW, 2); fwin(z, CW); z.pending.cards = ['gone|1']; z.pending.src = ['played']; EN.fixWaveC(z, CW);
    const m = z.money, k = EN.choose(z, CW, { type: 'skip' }); ok(k.ok && z.money === m + SKIP$, 'all filtered → skip still gives skipCash');
    const st = newW('fix4'); winToW(st, CW, 6); fakeStall(st, [['dig', 'snack'], ['home', 'gig']]); pickG(st, 0); const c0 = st.pending.cur.cards.slice();
    st.pending.cur.cards = ['gone|a', 'gone|b', 'gone|c']; EN.fixWaveC(st, CW);
    ok(st.pending.cur && st.pending.cur.kind === 'dig' && st.pending.cur.cards.length === 3 && st.pending.cur.cards.every(id => CW.cards[id] && !c0.includes(id)), 'station goods all gone → re-enter the station (fresh goods)', st.pending.cur);
    const dr = newW('fix5', { from: 10 }); dr.pending.offer.cards = ['gone|a', dr.pending.offer.cards[0]]; EN.fixWaveC(dr, CW); ok(dr.pending.offer.cards.length === 2 && dr.pending.offer.cards.every(id => CW.cards[id]), 'draft card question re-asked'); }
  { // 整趟自動玩（cPolicy）：每一步都合法、錢不會負、pending 種類對；同一 seed 兩次一樣
    const play1 = sk => { const run = EN.newRun(CW, { seedKey: sk, runNo: 2, ace: 'pearl', prologue: false }), R = lcg(EN.fnv1a32(sk)), mem = {}; const kinds = new Set();
      for (let g = 0; g < 6000; g++) {
        if (run.over && !run.pending) break;
        if (EN.canBargainPick(run) && !run.duel && !run.pending) { EN.choose(run, CW, EN.bargainPolicy(run, CW)); continue; }
        const st = EN.nextStep(run);
        if (['reward', 'retry', 'level', 'stall', 'draft'].includes(st)) { kinds.add(st === 'stall' ? 'stall:' + (run.pending.cur ? run.pending.cur.kind : 'pick') : st); const ch = EN.runPolicy(run, CW); const r = EN.choose(run, CW, ch); if (!ok(r.ok, 'auto play ok', { st, ch, e: r.error })) break; ok(run.money >= 0, 'money ≥ 0'); continue; }
        if (!st || run.pos > 60) break;
        if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, CW, 'smart')) EN.choose(run, CW, ch);
        const f = EN.startFight(run, CW, {}); let k = 0; while (!f.duel.over && k++ < 40) EN.resolveTurn(f.duel, EN.policies.thoughtful(f.duel, R, mem, CW));
        EN.finishFight(run, CW);
      }
      return { run, kinds }; };
    let deep = 0; const seen = new Set();
    for (let s = 1; s <= 8; s++) { const { run, kinds } = play1('auto-' + s); for (const k of kinds) seen.add(k); if (run.pos >= 11) deep++; ok(run.stats.c && run.stats.c.sess >= Math.floor((run.pos - 1) / 5) - 1, 'sessions counted', run.stats.c && run.stats.c.sess); }
    ok(deep >= 3 && seen.has('stall:pick') && seen.has('stall:studio') && seen.has('reward'), 'auto runs went deep and through stalls', [...seen].sort());
    eq(JSON.stringify(play1('auto-1').run), JSON.stringify(play1('auto-1').run), 'same seed → same run (with wave C on)'); }
  EN.setCtx(null);
});

// ---------------- 第 D 波 棒一：樂歷（SPEC-D §2、§4.1、§4.3、§3.1；§10.1 的 1／2／3／7） ----------------
// smart 流程打到第 maxPos 位（決策序列也記）；黃金＝改之前的 engine／content 跑的（scratchpad v5/wave-d/build1/golden.cjs，HEAD 9ca4e47bb）
function driveD(content, o, maxPos) {
  const run = EN.newRun(content, o), R = lcg(EN.fnv1a32(o.seedKey + o.runNo)), mem = {}, seq = [];
  for (let g = 0; g < 6000; g++) {
    if (run.over && !run.pending) break;
    if (EN.canBargainPick(run) && !run.duel && !run.pending) { const ch = EN.bargainPolicy(run, content); seq.push(ch); EN.choose(run, content, ch); continue; }
    const st = EN.nextStep(run);
    if (['reward', 'retry', 'level', 'stall', 'draft'].includes(st)) { const ch = EN.runPolicy(run, content); seq.push(ch); EN.choose(run, content, ch); continue; }
    if (!st || run.pos > maxPos) break;
    if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, content, 'smart')) { seq.push(ch); EN.choose(run, content, ch); }
    const f = EN.startFight(run, content, {});
    let k = 0; while (!f.duel.over && k++ < 40) EN.resolveTurn(f.duel, EN.policies.thoughtful(f.duel, R, mem, content));
    EN.finishFight(run, content);
  }
  return { run, seq };
}
section('30 第 D 波棒一 樂歷（SPEC-D §2）：Lv8 前／關樂歷＝逐字現況（黃金）、careerGain、等級曲線、天賦價與買賣、talentArgs、進局（品味／底氣／聲望／經驗零頭／說情順序／酬勞／金邊／配件三選一／種子格 4）、gigRoom、階梯、抽盤、熟練度、入帳、讀檔整理、V3、流派改名', () => {
  EN.setCtx(null);
  const K = C0, X = EN.careerCfg(K), xpAt = lv => EN.careerXpAt(K, lv), car = (lv, spent, o) => Object.assign({ key: 'k', xp: xpAt(lv), spent: spent || {} }, o || {});
  // ---- 1 沒給新參數／Lv8 前／關樂歷＝逐字現況（smart 決策序列＋run JSON 到第 20 位；黃金＝改之前的引擎） ----
  //   第 I 波 I-0：黃金在 K0（關掉第一位升級＝I-0 以前）上比；K（出貨）上每個變體都＝沒給參數那一份
  { const GOLD = [3936987495, 671311097, 230554544, 1581489111], POS = [12, 21, 21, 21], K0 = I0OFF(K), ON = [];
    const seeds = EN.seedPolicy(K, Object.keys(K.cards).sort().filter(id => EN.canSeed(K, id)).slice(0, 300));
    const CASES = [{ seedKey: 'dgold1', runNo: 1, ace: 'hall' }, { seedKey: 'dgold2', runNo: 2, ace: 'pearl', prologue: false, seeds, safety: true, bestFar: 12 },
      { seedKey: 'dgold3', runNo: 3, ace: 'heresy', prologue: false, relics: ['dustcover', 'stylus'] }, { seedKey: 'dgold4', runNo: 4, ace: 'hall', prologue: false, from: 10 }];
    const lv7 = car(7, { atk: 3, def: 1, rare: 2, xp: 1, plea: 1 });         // 點不到的戰力（讀檔留下的）也不給
    const extras = [{}, EN.talentArgs(K, car(7)), EN.talentArgs(K, lv7), EN.talentArgs(K, car(30, { atk: 4, money: 2 }, { off: true })),
      { talent: { atk: 0, def: 0, hp: 0, xp: 0, plea: 0, money: 0, pay: 0, rare: 0 }, relicPick: 1, goldAdd: 0 }, { talent: {}, seedMax: 0 }];
    eq(extras.slice(1, 4), [{}, {}, {}], 'talentArgs: Lv7 nothing／Lv7 locked power／off → {}');
    extras.forEach((ex, j) => CASES.forEach((o, i) => {
      const { run, seq } = driveD(K0, Object.assign({}, o, ex), 20);
      ok(EN.fnv1a32(JSON.stringify(run) + '|' + JSON.stringify(seq)) === GOLD[i] && run.pos === POS[i], 'no career args (variant ' + j + ') = engine before wave D, case ' + o.seedKey, { pos: run.pos });
      const on = driveD(K, Object.assign({}, o, ex), 20), h = EN.fnv1a32(JSON.stringify(on.run) + '|' + JSON.stringify(on.seq));
      if (!j) ON[i] = h; else ok(h === ON[i], 'I-0 on: no career args (variant ' + j + ') = variant 0, case ' + o.seedKey);
    }));
    for (const sk of ['dn1', 'dn2', 'dn3']) {
      const o = { seedKey: sk, runNo: 2, ace: 'pearl', prologue: false };
      const a = JSON.stringify(EN.newRun(K, o));
      for (const ex of extras) eq(JSON.stringify(EN.newRun(K, Object.assign({}, o, ex))), a, 'newRun JSON same with ' + JSON.stringify(ex));
      ok(!/"(talent|plea|xpMul|xpFrac|payMul|goldAdd|relicPick)"/.test(a), 'no wave D run fields without args');
    }
    const m2 = EN.talentArgs(K, car(7, { money: 2, pay: 1 })); eq(m2, { talent: { money: 2, pay: 1 } }, 'Lv7: only money talents');
    const rm = EN.newRun(K, Object.assign({ seedKey: 'dn1', runNo: 2, ace: 'pearl', prologue: false }, m2)), r0 = EN.newRun(K, { seedKey: 'dn1', runNo: 2, ace: 'pearl', prologue: false });
    ok(rm.money === r0.money + 1000 && rm.payMul === 1.1 && rm.atk === r0.atk && rm.maxHp === r0.maxHp && JSON.stringify(rm.bag) === JSON.stringify(r0.bag), 'money talents only move money'); }

  // ---- 2 careerGain（位數、連贏、破紀錄只在最遠 >0、演唱會／路線截斷、試煉倍率、沒到第 10 位 ×2、中繼點開局） ----
  { const G = (sum, o) => EN.careerGain(K, sum, o);
    const a = G({ reached: 12, bestStreak: 5, from: 1, lexp: { gig: 60, home: 30, promo: 10, packet: 15, demo: 15 } }, { best: 10 });
    eq([a.base, a.record, a.parts.gig, a.route, a.cut, a.mul, a.low, a.total], [220, 30, 60, 88, 42, 1, 1, 338], 'gain: base 15×12+8×5, record 30, gig ≤55, route ≤88');
    const a2 = G({ reached: 12, bestStreak: 5, lexp: { gig: 20, home: 30 } }, { best: 0 }); eq([a2.record, a2.route, a2.cut, a2.total], [0, 50, 0, 270], 'first run (best 0): no record; under the caps');
    const g2 = G({ reached: 12, bestStreak: 5, lexp: { gig: 90 } }, { best: 12 }); eq([g2.record, g2.route, g2.cut], [0, 55, 35], 'equal to best: no record; gig cut at 25% of base');
    const b = G({ reached: 9, bestStreak: 5, lexp: {} }, { best: 0 }); eq([b.base, b.low, b.mul, b.total], [175, 2, 2, 350], 'did not reach 10: ×2');
    const b10 = G({ reached: 10, bestStreak: 0, lexp: {} }); eq([b10.low, b10.total], [1, 150], 'reached 10: no subsidy');
    const t = G({ reached: 20, bestStreak: 10, lexp: {} }, { best: 25, tier: 3 }); eq([t.base, t.tierMul, t.mul, t.total], [380, 1.3, 1.3, 494], 'tier 3: ×1.3 rounded');
    const tl = G({ reached: 3, bestStreak: 2, lexp: {} }, { tier: 1 }); eq([tl.mul, tl.total], [2.2, Math.round(61 * 2.2)], 'tier × subsidy multiply');
    const cp = G({ reached: 55, from: 50, bestStreak: 5, lexp: {} }); eq([cp.base, cp.total], [130, 130], 'checkpoint start: only the positions played');
    const nb = G({ lexp: { base: 200, gig: 100 } }); eq([nb.base, nb.route], [200, 50], 'no reached → lexp.base');
    const off = EN.careerGain(Object.assign({}, K, { career: { lexp: { lowMul: 1 } } }), { reached: 3, bestStreak: 0, lexp: {} }); eq([off.low, off.total], [1, 45], 'lowMul 1 = subsidy off');
    // 棒一審查（放棄刷樂歷）：×2 只給還沒走到過第 10 位的帳號（best < 10）、不是放棄的那一趟；放棄時站著那一位沒打完＝少算那一位
    const hb = G({ reached: 9, bestStreak: 5, lexp: {} }, { best: 10 }); eq([hb.base, hb.low, hb.total], [175, 1, 175], 'best ≥10 (account reached 10 before): no ×2');
    const h9 = G({ reached: 9, bestStreak: 5, lexp: {} }, { best: 9 }); eq([h9.low, h9.total], [2, 350], 'best 9: still ×2');
    const q = G({ reached: 9, bestStreak: 8, lexp: {} }, { best: 0, quit: true, open: true }); eq([q.fought, q.base, q.low, q.total], [8, 15 * 8 + 64, 1, 184], 'quit at pos 9 before fighting it: 8 positions, no ×2');
    const qd = G({ reached: 9, bestStreak: 9, lexp: {} }, { best: 0, quit: true }); eq([qd.fought, qd.base, qd.low], [9, 15 * 9 + 72, 1], 'quit after pos 9 was fought (reward pending): 9 positions, still no ×2');
    const q1 = G({ reached: 1, bestStreak: 0, lexp: { home: 30 } }, { best: 0, quit: true, open: true }); eq([q1.fought, q1.base, q1.route, q1.total], [0, 0, 0, 0], 'quit at pos 1 with 0 fights: 0 (route capped at 40% of 0)');
    const qc = G({ reached: 50, from: 50, bestStreak: 0, lexp: {} }, { best: 60, quit: true, open: true }); eq([qc.fought, qc.total], [0, 0], 'checkpoint start, quit before the first fight: 0');
    eq([G({ reached: 12, bestStreak: 5, lexp: {} }).fought, G({ lexp: { base: 200 } }).fought], [12, null], 'fought: positions counted (null when only lexp.base)');
    // posFought：站著那一位打完了沒（放棄時 o.open＝!posFought）
    { const r = driveD(K, { seedKey: 'pf1', runNo: 2, ace: 'hall', prologue: false }, 3).run, P = x => EN.posFought(Object.assign(JSON.parse(JSON.stringify(r)), x));
      eq([P({ pending: null, over: null }), P({ pending: { type: 'reward', pos: r.pos } }), P({ pending: { type: 'level', pos: r.pos } }), P({ pending: { type: 'retry', pos: r.pos } }),
        P({ pending: { type: 'retry', enemyId: 'man', free: true } }), P({ pending: { type: 'reward', pos: r.pos, prologue: true } }), P({ pending: { type: 'draft', pos: r.pos } }), P({ pending: null, over: 'dead' }), EN.posFought(null)],
        [false, true, true, true, false, false, false, true, false], 'posFought: reward／level／retry of this pos or over = fought; route／draft／prologue = not'); }
    // 真的一趟：base＝runSummary 的 lexp.base（C 波 lexpBase）
    for (const sk of ['cg1', 'cg2']) { const r = driveD(K, { seedKey: sk, runNo: 2, ace: 'hall', prologue: false }, 14).run, s = EN.runSummary(r); eq(G(s).base, s.lexp.base, 'base = lexpBase ' + sk); } }

  // ---- 2b 等級曲線、點數、天賦價、買賣、重配 ----
  { const L = xp => EN.careerLevel(K, xp).level;
    // 第 I 波 I-0（SPEC-I §7.3 c）：前 7 級 100／150／250／350／500／650／800（累計 Lv3 250、Lv5 850、Lv7 2,000）；Lv8 2,800、Lv10 4,500 起不變。舊曲線（table: null）照舊
    eq([0, 99, 100, 249, 250, 499, 500, 849, 850, 1349, 1350, 1999, 2000, 2799, 2800, 3599, 3600, 4499, 4500, 5499, 5500, 14499, 14500].map(L),
      [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 19, 20], 'careerLevel boundaries (I-0 curve)');
    eq([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 20].map(xpAt), [100, 250, 500, 850, 1350, 2000, 2800, 3600, 4500, 5500, 14500], 'careerXpAt (I-0 curve)');
    const needs = Array.from({ length: 14 }, (_, i) => EN.careerNeed(K, i + 1));
    eq(needs, [100, 150, 250, 350, 500, 650, 800, 800, 900, 1000, 1000, 1000, 1000, 1000], 'careerNeed per level');
    ok(needs.every((x, i) => !i || x >= needs[i - 1]), 'each level needs at least as much as the one before (no cliff)');
    eq(EN.careerLevel(K, 320), { level: 3, into: 70, need: 250, total: 320 }, 'into／need'); eq(EN.careerLevel(K, 6100), { level: 11, into: 600, need: 1000, total: 6100 }, 'after Lv10: 1,000 per level');
    { const KO = Object.assign({}, K, { career: Object.assign({}, K.career, { curve: Object.assign({}, K.career.curve, { table: [] }) }) }), LO = xp => EN.careerLevel(KO, xp).level;   // []＝沒有表（null 會被 careerCfg 合併回預設）
      eq([0, 99, 100, 299, 300, 999, 1000, 4499, 4500, 5499, 5500, 14499, 14500].map(LO), [1, 1, 2, 2, 3, 4, 5, 9, 10, 10, 11, 19, 20], 'old curve (table []): careerLevel boundaries');
      eq([2, 3, 5, 10, 11, 20].map(lv => EN.careerXpAt(KO, lv)), [100, 300, 1000, 4500, 5500, 14500], 'old curve: careerXpAt');
      eq(EN.careerLevel(KO, 320), { level: 3, into: 20, need: 300, total: 320 }, 'old curve: into／need');
      for (let x = 0; x <= 30000; x += 37) ok(L(x) >= LO(x) && L(x) <= LO(x) + 1, 'new curve: same xp → same level or one higher (' + x + ')'); }
    eq(EN.careerLevel(K, -5).level, 1, 'bad xp → Lv1');
    const cost = (id, n) => Array.from({ length: n }, (_, i) => EN.talentCost(K, id, i + 1));
    eq([cost('atk', 3), cost('def', 2), cost('hp', 2), cost('xp', 2), cost('plea', 1), cost('money', 3), cost('pay', 3), cost('rare', 3), cost('piggy', 1), cost('reroll', 1), cost('ban', 1), cost('intel', 2)],
      [[6, 12, 18], [6, 12], [6, 12], [3, 6], [15], [1, 1, 1], [1, 1, 1], [2, 2, 2], [1], [2], [2], [2, 3]], 'talentCost table (§2.3a)');
    ok(EN.talentCost(K, 'nope', 1) === Infinity, 'unknown talent: Infinity');
    const buy = (c, id) => EN.talentBuy(K, c, id);
    eq(buy(car(1), 'money').error, 'locked', 'Lv1: money locked (Lv2)');
    let c = car(2); const c0 = JSON.stringify(c), r1 = buy(c, 'money'); ok(r1.ok && r1.career.spent.money === 1 && JSON.stringify(c) === c0, 'Lv2 money ok; original untouched');
    eq(buy(r1.career, 'money').error, 'points', 'Lv2: 1 point only');
    c = car(7); for (const id of ['atk', 'def', 'hp', 'xp', 'rare', 'plea']) eq(buy(c, id).error, 'locked', 'Lv7: ' + id + ' locked');
    for (let i = 0; i < 3; i++) c = buy(c, 'money').career; eq(buy(c, 'money').error, 'max', 'money max 3');
    for (const id of ['piggy', 'reroll', 'ban', 'intel', 'zzz']) eq(buy(car(60), id).error, 'locked', 'soon／unknown: locked ' + id);
    c = car(8); const r8 = buy(c, 'atk'); ok(r8.ok && EN.careerPoints(K, r8.career).left === 1, 'Lv8: atk for 6 of 7 points'); eq(buy(r8.career, 'atk').error, 'points', 'second atk costs 12');
    eq(buy(car(19), 'plea').error, 'locked', 'plea Lv20'); const rp = buy(car(20), 'plea'); ok(rp.ok, 'Lv20 plea for 15'); eq(buy(rp.career, 'plea').error, 'max', 'plea max 1');
    eq(EN.careerPoints(K, car(20, { atk: 2, money: 1 })), { level: 20, total: 19, spent: 19, left: 0 }, 'careerPoints');
    const s1 = EN.talentSell(K, car(20, { atk: 2 }), 'atk'); ok(s1.ok && s1.career.spent.atk === 1, 'sell one level');
    const s2 = EN.talentSell(K, s1.career, 'atk'); ok(s2.ok && !('atk' in s2.career.spent), 'sell last level removes the key'); eq(EN.talentSell(K, s2.career, 'atk').error, 'none', 'nothing to sell');
    const rs = car(20, { atk: 2, money: 1 }), rs0 = JSON.stringify(rs), rr = EN.careerRespec(K, rs); ok(rr.ok && JSON.stringify(rr.career.spent) === '{}' && JSON.stringify(rs) === rs0 && EN.careerPoints(K, rr.career).left === 19, 'respec: all points back; original untouched');
    ok(EN.talentOpen(K, 'atk', 8) && !EN.talentOpen(K, 'atk', 7) && !EN.talentOpen(K, 'piggy', 99), 'talentOpen'); }

  // ---- 2c talentArgs（Lv7＝只有錢類；Lv10 配件三選一；Lv12 種子格 4；Lv15 金邊；上限截；off＝{}） ----
  { const A = (lv, sp, o) => EN.talentArgs(K, car(lv, sp, o));
    eq(A(10), { relicPick: 3 }, 'Lv10: relic 3'); eq(A(12), { relicPick: 3, seedMax: 4 }, 'Lv12: seedMax 4'); eq(A(15), { relicPick: 3, seedMax: 4, goldAdd: 0.01 }, 'Lv15: gold +1 point');
    eq(A(20, { atk: 2, money: 9, plea: 1 }), { talent: { atk: 2, plea: 1, money: 3 }, relicPick: 3, seedMax: 4, goldAdd: 0.01 }, 'Lv20: talents (money capped at 3)');
    eq(A(20, { atk: 2 }, { off: true }), {}, 'off: nothing'); eq(EN.talentArgs(K, null), {}, 'no career: nothing'); }

  // ---- 3 進局：品味／底氣／聲望／經驗零頭／說情順序／酬勞／金邊／配件三選一／種子格 ----
  { const o = { seedKey: 'tal1', runNo: 2, ace: 'hall', prologue: false }, r0 = EN.newRun(K, o);
    const r = EN.newRun(K, Object.assign({}, o, { talent: { atk: 2, def: 1, hp: 3, xp: 2, plea: 1, money: 2, pay: 1, rare: 3 }, relicPick: 3, goldAdd: 0.01 }));
    eq([r.atk, r.def, r.maxHp - r0.maxHp, r.hp - r0.hp, r.hpIn, r.xpMul, r.plea, r.money - r0.money, r.payMul, r.goldAdd, r.relicPick],
      [2, 1, 6, 6, r.hp, 1.2, 1, 1000, 1.1, 0.07, 3], 'applyTalent: every talent');
    eq(r.talent, { atk: 2, def: 1, hp: 3, xp: 2, plea: 1, money: 2, pay: 1, rare: 3 }, 'run.talent = the levels');
    eq(JSON.stringify(Object.assign({}, r, { atk: 0, def: 0, maxHp: r0.maxHp, hp: r0.hp, hpIn: r0.hpIn, money: r0.money, talent: undefined, xpMul: undefined, plea: undefined, payMul: undefined, goldAdd: undefined, relicPick: undefined })),
      JSON.stringify(Object.assign({}, r0, { talent: undefined, xpMul: undefined, plea: undefined, payMul: undefined, goldAdd: undefined, relicPick: undefined })), 'nothing else changes (same rng, bag, shop)');
    // 經驗零頭：10 場 2 經驗 ×1.2＝24
    const T = EN.trialCfg(K, 0), x = EN.newRun(K, Object.assign({}, o, { talent: { xp: 2 } })); x.level = 1000;
    for (let i = 0; i < 10; i++) EN.gainXp(x, T, 2); ok(x.xp === 24 && x.xpFrac < 1e-6, 'xp ×1.2: 10 × 2 = 24', { xp: x.xp, f: x.xpFrac });
    const y = EN.newRun(K, o); y.level = 1000; for (let i = 0; i < 10; i++) EN.gainXp(y, T, 2); ok(y.xp === 20 && !('xpFrac' in y), 'no xp talent: 20, no xpFrac');
    // 酬勞：打贏的錢 ×1.1
    const p0 = newW('pay1'), p1 = newW('pay1', { talent: { pay: 1 } }); winToW(p0, CW, 2); winToW(p1, CW, 2);
    const m0 = p0.money, m1 = p1.money, w0 = fwin(p0, CW), w1 = fwin(p1, CW); ok(w1.earn === Math.round(w0.earn * 1.1) && w0.earn > 0 && p1.money - m1 >= w1.earn && p0.money - m0 >= w0.earn, 'pay +10%', [w0.earn, w1.earn]);
    // 說情順序：新手保底（第 1 位）→ 這一輪的說情 → 備用說情 → 死；備用說情不每輪補
    { const run = newW('plea1', { safety: true, talent: { plea: 1 } }); EN.choose(run, CW, EN.bargainPolicy(run, CW));
      const seq = []; for (let i = 0; i < 4; i++) { flose(run, CW); const p = run.pending; seq.push(p ? (p.safety ? 'safety' : p.plea ? 'plea' : 'retry') : run.over); if (p) { const e = EN.choose(run, CW, { type: 'retry' }); ok(e.ok, 'retry ok'); if (p.plea) ok(e.effects.some(z => z.plea && z.free === false), 'plea effect'); } }
      eq(seq, ['safety', 'retry', 'plea', 'dead'], 'loss order: safety → retry → plea → dead');
      const q = newW('plea2', { talent: { plea: 1 } }); winToW(q, CW, 2); flose(q, CW); EN.choose(q, CW, { type: 'retry' }); ok(q.retryLeft === 0 && q.plea === 1, 'round retry first');
      flose(q, CW); ok(q.pending && q.pending.plea === true, 'then plea'); EN.choose(q, CW, { type: 'retry' }); ok(q.plea === 0 && q.retryLeft === 0, 'plea used');
      winToW(q, CW, 6); ok(q.retryLeft === 1 && q.plea === 0, 'new round: retry back, plea not');
      const n0 = newW('plea3'); winToW(n0, CW, 2); flose(n0, CW); EN.choose(n0, CW, { type: 'retry' }); flose(n0, CW); ok(n0.over === 'dead' && !n0.pending, 'no plea: dead as before');
      const e2 = newW('plea4', { talent: { plea: 1 } }); winToW(e2, CW, 2); flose(e2, CW); EN.choose(e2, CW, { type: 'retry' }); flose(e2, CW); const ee = EN.choose(e2, CW, { type: 'end' }); ok(ee.ok && e2.over === 'dead' && e2.plea === 1, 'decline the plea: dead, plea kept'); }
    // 配件三選一：同一個 run.rng 位置，第一件＝原本那一件；三件不重複、沒有身上的
    { let same = 0, three = 0;
      for (let s = 1; s <= 12; s++) {
        const a1 = newW('rp' + s), a3 = newW('rp' + s, { relicPick: 3, relics: ['dustcover'] }), a1b = newW('rp' + s, { relics: ['dustcover'] });
        for (const z of [a1, a3, a1b]) { winToW(z, CW, 4); fwin(z, CW); }
        const p1 = a1b.pending, p3 = a3.pending;
        if (p1 && p3 && p1.relics.length === 1) { if (p3.relics[0] === p1.relics[0]) same++; if (p3.relics.length === 3 && new Set(p3.relics).size === 3 && !p3.relics.includes('dustcover')) three++; }
        if (s === 1) { const ch = EN.runPolicy(a3, CW); ok(ch.type === 'relic' && p3.relics.includes(ch.relicId), 'runPolicy picks one of the three', ch); ok(EN.choose(a3, CW, ch).ok, 'choose one of three'); }
      }
      ok(same === 12 && three === 12, 'relicPick 3: first = the single pick, 3 distinct, not owned', { same, three }); }
    // 金邊：goldAdd 1 → 每一列都有金邊；沒給＝原本機率
    { let rows = 0, gold = 0; for (let s = 1; s <= 10; s++) { const z = newW('ga' + s, { goldAdd: 1 }); winToW(z, CW, 2); const w = fwin(z, CW); if (z.pending && z.pending.kind === 'loot' && z.pending.cards.length) { rows++; if (z.pending.gold.length) gold++; } }
      ok(rows >= 8 && gold === rows, 'goldAdd 1: every loot row has a gold card', { rows, gold }); }
    // 種子格 4：送的全換掉、包包 4 張；seedsOf／seedPolicy 吃 max
    { const ids = Object.keys(K.cards).sort().filter(id => EN.canSeed(K, id)).slice(0, 80), s4 = EN.seedPolicy(K, ids, null, 4), s3 = EN.seedPolicy(K, ids);
      ok(s4.length === 4 && s3.length === 3 && JSON.stringify(s4.slice(0, 3)) === JSON.stringify(s3), 'seedPolicy max 4');
      eq(EN.seedPolicy(K, ids, 9, 4).length, 4, 'seedPolicy n capped by max'); eq(EN.seedsOf(K, s4).length, 3, 'seedsOf default 3'); eq(EN.seedsOf(K, s4, 4).length, 4, 'seedsOf max 4');
      const a = EN.newRun(K, { seedKey: 'sd4', runNo: 2, ace: 'pearl', prologue: false, seeds: s4, seedMax: 4 }), b = EN.newRun(K, { seedKey: 'sd4', runNo: 2, ace: 'pearl', prologue: false, seeds: s4 });
      ok(a.bag.length === 4 && a.gifts.length === 0 && JSON.stringify(a.seeds) === JSON.stringify(s4), 'seedMax 4: 4 seeds, no gifts', a.bag);
      ok(b.seeds.length === 3 && b.gifts.length === 1 && b.bag.length === 4, 'no seedMax: 3 seeds + 1 gift'); } }

  // ---- 3b gigRoom（照現在的基本樂歷；越往後只會變多）、階梯 ----
  { const g = newW('gig1'); g.pos = 10; g.bestStreak = 4; g.lexp = {};
    eq(EN.gigRoom(g, CW), 2, 'gigRoom: ⌊0.25×182⌋=45 → 2 tickets'); g.lexp.gig = 20; eq(EN.gigRoom(g, CW), 1, 'after one ticket: 1'); g.lexp.gig = 40; eq(EN.gigRoom(g, CW), 0, 'full: 0');
    let prev = 0, mono = true; g.lexp.gig = 20; for (let p = 1; p <= 120; p++) { g.pos = p; g.bestStreak = Math.min(p, 9); const n = EN.gigRoom(g, CW); if (n < prev) mono = false; prev = n; }
    ok(mono, 'gigRoom never shrinks as base grows'); g.cpFrom = 50; g.pos = 52; g.bestStreak = 2; g.lexp = {}; eq(EN.gigRoom(g, CW), 0, 'checkpoint start: base counts played positions only (61 → 15 → 0)');
    eq(EN.ladderNext(K, 1).key, 'talents', 'next at Lv1: talents'); eq(EN.ladderNext(K, 7).lv, 8, 'next at Lv7: Lv8 power'); eq(EN.ladderNext(K, 8).key, 'relic3', 'next at Lv8: Lv10 relic3');
    eq(EN.ladderNext(K, 20), null, 'nothing after Lv20 (seed5 etc. soon)'); eq(EN.ladderAt(K, 10).map(x => x.key), ['relic3', 'off'], 'opened at Lv10'); eq(EN.ladderAt(K, 11), [], 'nothing at Lv11');
    const LL = EN.ladderList(K, 12); ok(LL.find(x => x.key === 'seed4').open && !LL.find(x => x.key === 'gold').open && !LL.find(x => x.key === 'seed5').open, 'ladderList open flags'); }

  // ---- 3c 升級抽盤 ----
  { const ri = id => EN.rarity(K.cards[id]), bg = new Set([].concat(K.bargain.pool || [], K.bargain.retired || []));
    let okAll = true; const seen = new Set();
    for (let lv = 2; lv <= 40; lv++) { const id = EN.careerDraw(K, 'drawkey', lv, null), want = lv >= 10 && lv % 5 === 0 ? 'epic' : null;
      if (!id || !EN.canSeed(K, id) || bg.has(id) || (want ? ri(id) !== want : !['rare', 'uncommon'].includes(ri(id)))) okAll = false; seen.add(id); }
    ok(okAll, 'careerDraw: epic at Lv10／15／20…, rare／uncommon otherwise (Lv5 too); non-apex, non-bargain'); ok(seen.size >= 35, 'draws differ by level', seen.size);
    eq(EN.careerDraw(K, 'drawkey', 7, null), EN.careerDraw(K, 'drawkey', 7, []), 'deterministic');
    const d5 = EN.careerDraw(K, 'drawkey', 5, null); ok(EN.careerDraw(K, 'drawkey', 5, [d5]) !== d5, 'owned is skipped');
    ok(EN.careerDrawRarity(K, 'x', 5) !== 'epic' && EN.careerDrawRarity(K, 'x', 10) === 'epic' && EN.careerDrawRarity(K, 'x', 12) !== 'epic', 'rarity by level');
    const tiny = Object.assign({}, K, { cards: { a: { id: 'a', c: 1, o: 1, h: 1, tier: null } } }); eq(EN.careerDraw(tiny, 'k', 5, null), null, 'nothing to draw → null'); }

  // ---- 7 熟練度：落後 ×2、Lv 邊界、第一次解鎖 +300 ----
  { const pg = EN.profGain(K, { hall: 1000, pearl: 400, heresy: 0 }, 'pearl', 100); ok(pg.lag && pg.add === 200 && pg.prof.pearl === 600 && pg.prof.hall === 1000, 'lagging (<half of the top) ×2', pg);
    const ph = EN.profGain(K, { hall: 1000, pearl: 400 }, 'hall', 100); ok(!ph.lag && ph.add === 100 && ph.prof.heresy === 0, 'top: ×1');
    const pe = EN.profGain(K, { hall: 1000, pearl: 500 }, 'pearl', 100); ok(!pe.lag, 'exactly half: not lagging');
    ok(!EN.profGain(K, {}, 'heresy', 50).lag, 'all zero: not lagging');
    const pu = EN.profGain(K, { hall: 1450 }, 'hall', 100); ok(pu.stamps === 1 && pu.levelUps === 1, 'crossing 1,500: one stamp, one level', pu);
    eq(EN.profGain(K, { hall: 10 }, 'nope', 100).add, 0, 'unknown ace: nothing');
    eq([EN.profLevel(K, 0), EN.profLevel(K, 1499), EN.profLevel(K, 1500), EN.profLevel(K, 22500)].map(x => [x.level, x.stamps, x.into]), [[1, 0, 0], [1, 9, 149], [2, 0, 0], [16, 0, 0]], 'profLevel boundaries');
    const pf = EN.profFirst(K, { hall: 300 }, 'pearl'); ok(pf.add === 300 && pf.prof.pearl === 300, 'first unlock: two stamps');
    eq(EN.profFirst(K, pf.prof, 'pearl').add, 0, 'only once (already has stamps)'); }

  // ---- 2d careerDeposit（三種組合；照總額截的餘數 ≥0、給 lastAce；歸零後再跑＝null；退版期間又有＝再入一次） ----
  { eq(EN.careerDeposit(K, { lexpBank: { base: 0, gig: 0, home: 0, promo: 0, packet: 0, demo: 0, runs: 3 }, runs: [] }), null, 'empty bank → null (runs count ignored)');
    eq(EN.careerDeposit(K, {}), null, 'no bank → null');
    const runs = [{ ace: 'pearl', lexp: { base: 600, gig: 300, home: 30 } }, { ace: 'heresy', lexp: { base: 400, gig: 100, promo: 10, packet: 15, demo: 15 } }, { ace: 'hall', reached: 3 }, null];
    const sv = { lexpBank: { base: 1000, gig: 400, home: 30, promo: 10, packet: 15, demo: 15, runs: 2 }, runs, lastAce: 'hall', career: { xp: 50, prof: { hall: 7 } } };
    const d = EN.careerDeposit(K, sv);
    eq([d.total, d.xp, d.per, d.prof, d.runs, d.from, d.to, d.first], [1320, 1370, { hall: 0, pearl: 780, heresy: 540 }, { hall: 7, pearl: 780, heresy: 540 }, [0, 1], 1, 6, true], 'deposit: total capped, per run by ace (1,370 xp → Lv6 on the I-0 curve)');
    ok(sv.career.xp === 50 && !sv.runs[0].banked, 'deposit does not touch the save');
    const d2 = EN.careerDeposit(K, Object.assign({}, sv, { lexpBank: { base: 2000, gig: 0 }, lastAce: 'pearl' })); eq([d2.total, d2.per.pearl, d2.per.heresy], [2000, 780 + 680, 540], 'rest goes to lastAce');
    const d3 = EN.careerDeposit(K, Object.assign({}, sv, { lastAce: null, runs: [] })); eq(d3.per, { hall: 1320, pearl: 0, heresy: 0 }, 'no runs, no lastAce → hall');
    const later = { lexpBank: { base: 300, gig: 0, home: 30 }, lastAce: 'heresy', career: { xp: 1370, banked: true },
      runs: [Object.assign({ banked: 1 }, runs[0]), Object.assign({ banked: 1 }, runs[1]), { ace: 'hall', lexp: { base: 150 }, gain: { total: 150 } }, { ace: 'pearl', lexp: { base: 300, home: 30 } }] };
    const d4 = EN.careerDeposit(K, later); eq([d4.total, d4.runs, d4.per, d4.first, d4.xp], [330, [3], { hall: 0, pearl: 330, heresy: 0 }, false, 1700], 'downgrade period: only the new C runs (banked／gain skipped)');
    // 性質：lexpBank＝各趟加總（C 版頁面就是這樣記的）→ 逐趟截的合計 ≤ 總額截（餘數 ≥0，不靠夾）
    let neg = 0; const R = lcg(4242);
    for (let i = 0; i < 300; i++) {
      const rs = [], bank = { base: 0, gig: 0, home: 0, promo: 0, packet: 0, demo: 0 };
      for (let k = 0; k < 1 + Math.floor(R() * 6); k++) { const L = { base: Math.floor(R() * 900) }; for (const x of EN.LEXP_ROUTE) L[x] = R() < 0.5 ? Math.floor(R() * 300) : 0; for (const x of Object.keys(bank)) bank[x] += L[x]; rs.push({ ace: TIERS[k % 3], lexp: L }); }
      const dd = EN.careerDeposit(K, { lexpBank: bank, runs: rs, career: {} }); if (!dd) continue;
      const raw = rs.reduce((t, r) => { const B = r.lexp.base, rt = Math.min(Math.min(r.lexp.gig, Math.floor(0.25 * B)) + r.lexp.home + r.lexp.promo + r.lexp.packet + r.lexp.demo, Math.floor(0.4 * B)); return t + B + rt; }, 0);
      if (raw > dd.total || TIERS.reduce((t, x) => t + dd.per[x], 0) !== dd.total) neg++;
    }
    eq(neg, 0, 'per-run caps sum ≤ total cap; shares add up to total'); }

  // ---- 2e careerFix（讀檔整理） ----
  { const f = EN.careerFix(K, { key: 7, xp: -3, spent: { atk: 2, money: 9, piggy: 1, zzz: 4 }, off: 1, prof: { hall: 'x', pearl: 30.7 }, tree: { hall: { a: 2, b: -1 }, pearl: [] }, drawn: [3, 3, 1, 2.5, 5, 2], extra: 'kept' });
    eq([f.key, f.xp, f.spent, f.off, f.prof, f.tree, f.drawn, f.banked, f.lastGain, f.extra], ['', 0, {}, true, { hall: 0, pearl: 30, heresy: 0 }, { hall: { a: 2 }, pearl: {}, heresy: {} }, [2, 3, 5], false, null, 'kept'], 'careerFix: types; not enough points → spent cleared');
    const g = EN.careerFix(K, { xp: xpAt(22), spent: { atk: 2, money: 9, piggy: 1 } }); eq(g.spent, { atk: 2, money: 3 }, 'careerFix: capped, soon dropped, points ok (21 of 21)');
    eq(EN.careerFix(K, { xp: xpAt(21), spent: { atk: 2, money: 3 } }).spent, {}, 'careerFix: 21 points needed at Lv21 (20) → all back');
    eq(EN.careerFix(K, null).spent, {}, 'careerFix(null)');
    const ids = Object.keys(K.cards).sort().slice(0, 2);
    eq([EN.careerFix(K, { got: [ids[0], ids[0], 'nope', 3, 'constructor', ids[1]] }).got, EN.careerFix(K, {}).got, EN.careerFix(K, { got: 'x' }).got], [ids, [], []], 'careerFix: got = drawn card ids (known, unique)'); }

  // ---- 4.3 V3：第 51 位起每 5 位聲望 +1 ----
  { const S = K.trial.guestHpSteps, hp = (p, c) => EN.trialGuest(K, p, c || 'normal').hp;
    eq(S[0], [31, 1], 'first step: 31'); ok(S.length === 51 && S.slice(1).every((x, i) => x[0] === 51 + 5 * i && x[1] === 1), 'then 51, 56, … 296 (+1 each)');
    ok(S.every((x, i) => i === 0 || x[0] > S[i - 1][0]), 'ascending');
    eq([hp(30), hp(31), hp(50), hp(51), hp(55), hp(56), hp(100), hp(150), hp(100, 'boss'), hp(300), hp(400)], [12, 13, 13, 14, 14, 15, 23, 33, 25, 63, 63], 'V3 guest hp (last step 296)'); }

  // ---- 3.1 流派改名、C.career 跟引擎預設一致、畫面字齊全 ----
  { eq(K.aceTitle, { hall: '經典流', pearl: '冷門流', heresy: '異端流' }, 'aceTitle'); eq(K.aceIcon, { hall: '比', pearl: '借', heresy: '拆' }, 'aceIcon');
    eq(K.apexTierName, { hall: '殿堂', pearl: '流亡', heresy: '異端' }, 'apex tier names kept for apex cards'); eq(K.aceNewbie, { pearl: '新手推薦', hall: '前期較難' }, 'newbie tags');
    const U = K.trial.ui; for (const k of ['unlocked', 'aceLockedNote', 'lockHint', 'unlockNext', 'bossUnlock']) ok(U[k].includes('{title}') && !U[k].includes('{title}派') && !U[k].includes('{axis}'), 'template ' + k, U[k]);
    const src = fs.readFileSync(path.join(HERE, '../content.js'), 'utf8'); ok(!['殿堂派', '流亡派', '異端派', '{title}派'].some(w => src.includes(w)), 'no 殿堂派／流亡派／異端派／{title}派 in content.js');
    ok(!/之後開放/.test(JSON.stringify(K.waveC.ui)), 'wave C lexp strings no longer say 之後開放');
    const KC = Object.assign({}, K.career); delete KC.ui; eq(EN.careerCfg(Object.assign({}, K, { career: undefined })), KC, 'content.career = engine CAREER (minus ui)');
    const CU = K.career.ui; ok(X.talents.every(t => CU.names[t.id] && CU.fx[t.id]), 'every talent has a name and an effect line');
    ok(X.ladder.every(L => CU.ladder[L.key]), 'every ladder row has a name'); ok(X.talents.every(t => CU.groups.some(g => g.cats.includes(t.cat))), 'every talent cat is in a group');
    ok(K.lines.owner.retryPlea && K.lines.owner.profFirst, 'owner lines for plea／first stamps'); ok(K.careerTag === '新', 'careerTag'); }
});

section('31 第 D 波棒二 三流派（SPEC-D §3.3–§3.5、§6-3；§10.1 第 1、4、5、8 條）：旗標關＝逐字現況（黃金）、三派 outcome 表、代價、第二招上限、preview＝resolve、序章沒有、R-F9、本派格（第 4 格、佔屬性、連升兩級、選秀 guard、存讀檔）、結果行 {n}、換一格', () => {
  EN.setCtx(null);
  const K = C0, F = K.factions;
  // ---- 1 旗標關＝逐字現況：沒給 fac／fac:false／content 沒有 factions（或 on:false）＝改之前的引擎（smart＋thoughtful 每手決策序列＋run JSON 到第 20 位；黃金＝棒二改之前 HEAD 的 engine／content，
  //      build2/tools/golden2.cjs）；有 fac 的 run 才多 run.fac ----
  { const GOLD = [1464705395, 2818197883, 771687597, 3935375095, 1591152419], POS = [21, 21, 21, 15, 21];
    const CASES = [[{ seedKey: 'dfo1', runNo: 1, ace: 'pearl' }, {}], [{ seedKey: 'dfo2', runNo: 2, ace: 'heresy', prologue: false, talent: { atk: 1, def: 1 } }, {}],
      [{ seedKey: 'dfo3', runNo: 3, ace: 'hall', prologue: false, from: 20 }, {}], [{ seedKey: 'dfo4', runNo: 2, ace: 'pearl', prologue: false }, { apex: true }],
      [{ seedKey: 'dfo5', runNo: 2, ace: 'heresy', prologue: false }, { apex: true }]];
    const drive = (content, o, fo) => {
      const run = EN.newRun(content, o), R = lcg(EN.fnv1a32(o.seedKey + o.runNo)), mem = {}, seq = [];
      for (let g = 0; g < 6000; g++) {
        if (run.over && !run.pending) break;
        if (EN.canBargainPick(run) && !run.duel && !run.pending) { const ch = EN.bargainPolicy(run, content); seq.push(ch); EN.choose(run, content, ch); continue; }
        const st = EN.nextStep(run);
        if (['reward', 'retry', 'level', 'stall', 'draft'].includes(st)) { const ch = EN.runPolicy(run, content); seq.push(ch); EN.choose(run, content, ch); continue; }
        if (!st || run.pos > 20) break;
        if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, content, 'smart')) { seq.push(ch); EN.choose(run, content, ch); }
        const f = EN.startFight(run, content, fo || {});
        let k = 0; while (!f.duel.over && k++ < 40) { const a = EN.policies.thoughtful(f.duel, R, mem, content); seq.push(a); EN.resolveTurn(f.duel, a); }
        EN.finishFight(run, content);
      }
      return { run, seq };
    };
    // 第 I 波 I-0：黃金在關掉第一位升級的 content 上比（I0OFF）；出貨的 content 上每個變體都＝變體 0
    const VAR = [[K, {}], [K, { fac: false }], [Object.assign({}, K, { factions: undefined }), { fac: true }], [Object.assign({}, K, { factions: Object.assign({}, F, { on: false }) }), { fac: true }]], ON = [];
    VAR.forEach(([content, ex], j) => CASES.forEach(([o, fo], i) => {
      if (QUICK && j > 0 && i > 1) return;
      const { run, seq } = drive(I0OFF(content), Object.assign({}, o, ex), fo);
      ok(EN.fnv1a32(JSON.stringify(run) + '|' + JSON.stringify(seq)) === GOLD[i] && run.pos === POS[i] && !('fac' in run), 'flag off (variant ' + j + ') = engine before 棒二, ' + o.seedKey, { pos: run.pos });
      const on = drive(content, Object.assign({}, o, ex), fo), h = EN.fnv1a32(JSON.stringify(on.run) + '|' + JSON.stringify(on.seq));
      if (!j) ON[i] = h; else ok(h === ON[i] && !('fac' in on.run), 'I-0 on: flag off (variant ' + j + ') = variant 0, ' + o.seedKey);
    }));
    const r0 = EN.newRun(K, { seedKey: 'nf1', runNo: 2, ace: 'hall', prologue: false }), r1 = EN.newRun(K, { seedKey: 'nf1', runNo: 2, ace: 'hall', prologue: false, fac: true });
    ok(!/"fac"/.test(JSON.stringify(r0)), 'no fac key without the flag');
    eq(r1.fac, { picks: {}, tal: {}, trialNodes: {} }, 'newRun fac:true → run.fac {picks, tal, trialNodes}');
    const r1b = JSON.parse(JSON.stringify(r1)); delete r1b.fac; eq(JSON.stringify(r1b), JSON.stringify(r0), 'run.fac is the only difference (no rng used)');
    const pd = EN.playerDef(K, r0, { fac: true }); ok(!('fac' in pd) && !('fx' in pd), 'playerDef {fac} on a run without run.fac → nothing');
    const pd1 = EN.playerDef(K, r1); ok(!('fac' in pd1), 'playerDef without o.fac → nothing (startFight decides)'); }

  // ---- 4 三派 outcome 表（同一手、同一提示；數字精確）----
  const mk = (c, o, h) => mkCard('fx-' + c + o + h, c, o, h);
  function facDuel(tier, o = {}) {
    const src = { bag: K.gifts[tier].concat(BP3), ace: tier, relics: [], fac: { picks: o.picks || {}, tal: {}, trialNodes: {} } };
    const pDef = EN.playerDef(K, src, Object.assign({ fac: true }, o.apex ? { apex: true } : {}));
    if (o.ability) pDef.ability = o.ability;
    const { duel } = EN.startDuel(pDef, EN.enemyDef(K, 'copycat', {}), Object.assign({ seed: o.seed || 13, hintTable: HINTS }, o.apex ? { apex: true } : {}));
    duel.p.atk = o.atk | 0; duel.p.def = o.def | 0; duel.e.atk = o.eAtk | 0; duel.e.def = o.eDef | 0; duel.p.relics = []; duel.e.hit = o.hit | 0;
    duel.p.hp = o.hp != null ? o.hp : 6; duel.e.hp = o.eHp != null ? o.eHp : 99; duel.e.max = Math.max(duel.e.max, duel.e.hp);
    return duel;
  }
  const hint = (d, h) => { d.plan.hint = typeof h === 'string' ? { attr: h, line: d.plan.hint.line, kind: 'one', not: null } : Object.assign({ line: d.plan.hint.line, not: null }, h); };
  function pv(d, card, attr, e, o = {}) { d.p.hand[0] = card; if (o.hint) hint(d, o.hint); return EN.preview(d, o.ace ? { ace: true } : o.apex ? { i: 0, attr, apex: true } : { i: 0, attr }, e); }
  const kv = r => [r.kind, r.toE, r.toP, r.heal | 0];
  const fn = r => (r.notes || []).filter(n => n.fac).map(n => n.kind + ':' + n.n + ':' + n.text);
  const NT = F.notes, T = (k, n) => k + ':' + n + ':' + NT[k].replace('{n}', n);
  // 經典：同色大 2 星以上扣整張、大 1 星照差額、同色平手扣 1（不吃底氣、不加他的品味）；不同色的「剋不動改比星」不算
  { const d = facDuel('hall');
    eq([kv(pv(d, mk(5, 1, 1), 'c', { attr: 'c', star: 3 }, { hint: 'c' })), fn(pv(d, mk(5, 1, 1), 'c', { attr: 'c', star: 3 }))], [['mirrorWin', 5, 0, 0], [T('full', 5)]], 'hall: same color +2 → full 5');
    eq([kv(pv(d, mk(4, 1, 1), 'c', { attr: 'c', star: 3 })), fn(pv(d, mk(4, 1, 1), 'c', { attr: 'c', star: 3 }))], [['mirrorWin', 1, 0, 0], []], 'hall: +1 → difference 1');
    eq([kv(pv(d, mk(3, 1, 1), 'c', { attr: 'c', star: 3 })), fn(pv(d, mk(3, 1, 1), 'c', { attr: 'c', star: 3 }))], [['tie', 0, 1, 0], [T('tieCost', 1)]], 'hall: same color tie → you −1');
    eq(kv(pv(d, mk(5, 1, 1), 'c', { attr: 'o', star: 2 })), ['mirrorWin', 3, 0, 0], 'hall: blocked counter (different colors) → difference, not full');
    eq([kv(pv(d, mk(3, 1, 1), 'c', { attr: 'h', star: 2 })), kv(pv(d, mk(3, 1, 1), 'c', { attr: 'o', star: 3 })), kv(pv(d, mk(2, 1, 1), 'c', { attr: 'c', star: 4 }))], [['counter', 3, 0, 0], ['countered', 0, 3, 0], ['mirrorLose', 0, 2, 0]], 'hall: counter／countered／mirrorLose unchanged');
    d.p.def = 3; d.e.atk = 2; eq(kv(pv(d, mk(3, 1, 1), 'c', { attr: 'c', star: 3 })), ['tie', 0, 1, 0], 'hall: tie cost ignores your 底氣 and his 品味');
    d.p.def = 0; d.e.atk = 0; d.e.def = 2; const r = pv(d, mk(5, 1, 1), 'c', { attr: 'c', star: 3 }); eq([kv(r), fn(r)], [['mirrorWin', 3, 0, 0], [T('full', 3)]], 'hall: full then his 底氣 (half(5,2)=3); {n}＝this hand total'); }
  { const d = facDuel('hall', { picks: { h_first: 1 } }); eq(kv(pv(d, mk(5, 1, 1), 'c', { attr: 'c', star: 3 })), ['mirrorWin', 6, 0, 0], '初版: full +1'); }
  { const d = facDuel('hall', { picks: { h_eye: 1 } });
    eq([kv(pv(d, mk(4, 1, 1), 'c', { attr: 'c', star: 3 })), kv(pv(d, mk(1, 4, 1), 'o', { attr: 'o', star: 3 }))], [['mirrorWin', 5, 0, 0], ['mirrorWin', 1, 0, 0]], '識貨: classic +1 star (only c)');
    d.p.aceUsed = false; eq(kv(pv(d, mk(1, 1, 1), 'c', { attr: 'c', star: 5 }, { ace: true })), ['mirrorWin', 7, 0, 0], '識貨: ace not +1 (7 vs 5 → full 7)'); }
  { const d = facDuel('hall', { picks: { h_old: 1 } }); eq(kv(pv(d, mk(3, 1, 1), 'c', { attr: 'c', star: 3 })), ['tie', 0, 0, 0], '老派: first tie free'); d.p.facN.tie = 1; eq(kv(pv(d, mk(3, 1, 1), 'c', { attr: 'c', star: 3 })), ['tie', 0, 1, 0], '老派: second tie costs 1'); }
  { const d = facDuel('hall', { picks: { h_seen: 1 } });
    eq([kv(pv(d, mk(3, 1, 1), 'c', { attr: 'o', star: 4 })), kv(pv(d, mk(3, 1, 1), 'c', { attr: 'o', star: 2 }))], [['countered', 0, 2, 0], ['countered', 0, 1, 0]], '見過世面: first countered −2 (min 1)');
    d.p.facN.countered = 1; eq(kv(pv(d, mk(3, 1, 1), 'c', { attr: 'o', star: 4 })), ['countered', 0, 4, 0], '見過世面: only the first'); }
  { const d = facDuel('hall', { picks: { h_leech: 1 } });
    const r = pv(d, mk(5, 1, 1), 'c', { attr: 'c', star: 3 }); eq([kv(r), fn(r)], [['mirrorWin', 5, 0, 2], [T('full', 5), T('leech', 2)]], '吸血: half of 5 → 3, capped at 2 per duel');
    d.p.facN.leech = 1; eq(kv(pv(d, mk(5, 1, 1), 'c', { attr: 'c', star: 3 })), ['mirrorWin', 5, 0, 1], '吸血: 1 left'); d.p.facN.leech = 2; const r2 = pv(d, mk(5, 1, 1), 'c', { attr: 'c', star: 3 }); eq([kv(r2), fn(r2)], [['mirrorWin', 5, 0, 0], [T('full', 5)]], '吸血: used up → no heal, no note');
    d.p.facN.leech = 0; d.p.hp = d.p.max; eq(fn(pv(d, mk(5, 1, 1), 'c', { attr: 'c', star: 3 })), [T('full', 5)], '吸血: full 聲望 → no heal note'); d.p.hp = 6;
    d.e.hp = 1; eq(kv(pv(d, mk(5, 1, 1), 'c', { attr: 'c', star: 3 })), ['mirrorWin', 5, 0, 1], '吸血: counts only what he had (1 → 1)');
    eq(kv(pv(d, mk(1, 3, 1), 'o', { attr: 'h', star: 3 })), ['countered', 0, 3, 0], '吸血: not on other hands'); }
  // 冷門：剋他永遠剋得動、扣他那張的星（丟王牌照扣 7）、以小搏大那手不加品味；被剋多扣 1（他的品味、被唬到多扣之後，你的底氣之前）
  { const d = facDuel('pearl');
    let r = pv(d, mk(1, 2, 1), 'o', { attr: 'c', star: 5 }); eq([kv(r), fn(r)], [['counter', 5, 0, 0], [T('underdog', 5)]], 'pearl: o2 vs c5 → counter anyway, 5 (underdog)');
    r = pv(d, mk(1, 4, 1), 'o', { attr: 'c', star: 3 }); eq([kv(r), fn(r)], [['counter', 3, 0, 0], [T('borrow', 3)]], 'pearl: o4 vs c3 → his 3 (borrow)');
    eq(kv(pv(d, mk(1, 5, 1), 'o', { attr: 'c', star: 1 })), ['counter', 1, 0, 0], 'pearl: his card even when smaller');
    d.p.aceUsed = false; eq(kv(pv(d, mk(1, 1, 1), 'o', { attr: 'c', star: 3 }, { ace: true })), ['counter', 7, 0, 0], 'pearl: ace still 7');
    d.p.atk = 2; r = pv(d, mk(1, 2, 1), 'o', { attr: 'c', star: 5 }); eq([kv(r), r.notes.some(n => n.stat === 'atk')], [['counter', 5, 0, 0], false], 'pearl: underdog hand gets no 品味');
    r = pv(d, mk(1, 4, 1), 'o', { attr: 'c', star: 3 }); eq([kv(r), fn(r)], [['counter', 5, 0, 0], [T('borrow', 5)]], 'pearl: borrow + 品味 2 = 5 ({n}＝total)'); d.p.atk = 0;
    r = pv(d, mk(1, 3, 1), 'o', { attr: 'h', star: 3 }); eq([kv(r), fn(r)], [['countered', 0, 4, 0], [T('cCost', 1)]], 'pearl: countered 3 + 1');
    d.p.def = 2; eq([kv(pv(d, mk(1, 3, 1), 'o', { attr: 'h', star: 3 })), fn(pv(d, mk(1, 3, 1), 'o', { attr: 'h', star: 3 }))], [['countered', 0, 2, 0], [T('cCost', 1)]], 'pearl: cost before your 底氣 (half(4,2)=2); {n} stays 1'); d.p.def = 0;
    d.hit = 0; d.e.hit = 1; eq(kv(pv(d, mk(1, 3, 1), 'o', { attr: 'h', star: 3 }, { hint: 'c' })), ['countered', 0, 5, 0], 'pearl: fooled (+1) and cost (+1)'); d.e.hit = 0;
    eq([kv(pv(d, mk(1, 2, 1), 'o', { attr: 'o', star: 4 })), kv(pv(d, mk(1, 3, 1), 'o', { attr: 'o', star: 3 }))], [['mirrorLose', 0, 2, 0], ['tie', 0, 0, 0]], 'pearl: mirror unchanged, no tie cost'); }
  { const d = facDuel('pearl', { picks: { p_remember: 1 } }); eq([kv(pv(d, mk(1, 3, 1), 'o', { attr: 'h', star: 3 })), fn(pv(d, mk(1, 3, 1), 'o', { attr: 'h', star: 3 }))], [['countered', 0, 3, 0], []], '有人記得: no cost'); }
  { const d = facDuel('pearl', { picks: { p_bench: 1 } }); eq(kv(pv(d, mk(1, 3, 1), 'o', { attr: 'h', star: 3 })), ['countered', 0, 2, 0], '冷板凳: first countered (3+1)−2'); d.p.facN.countered = 1; eq(kv(pv(d, mk(1, 3, 1), 'o', { attr: 'h', star: 3 })), ['countered', 0, 4, 0], '冷板凳: only the first'); }
  { const d = facDuel('pearl', { picks: { p_thorn: 1 }, eDef: 3 });
    let r = pv(d, mk(1, 3, 1), 'o', { attr: 'h', star: 3 }); eq([kv(r), fn(r)], [['countered', 2, 4, 0], [T('cCost', 1), T('thorn', 2)]], '反傷: he −2 too (ignores his 底氣)');
    d.p.facN.thorn = 2; r = pv(d, mk(1, 3, 1), 'o', { attr: 'h', star: 3 }); eq([kv(r), fn(r)], [['countered', 0, 4, 0], [T('cCost', 1)]], '反傷: max 2 per duel'); }
  // 異端：拆穿（看得出來的唬＝明指出別色、半指出他說不出那色；不露不算）多扣 1、回 2；看穿那手不算；比星輸多扣 1
  { const d = facDuel('heresy');
    let r = pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }, { hint: 'c' }); eq([kv(r), fn(r)], [['counter', 4, 0, 2], [T('crit', 1), T('heal', 2)]], 'heresy: caught (one: says c, plays o) → +1, heal 2');
    eq(kv(pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }, { hint: 'o' })), ['counter', 3, 0, 0], 'heresy: honest → nothing');
    eq(kv(pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }, { hint: { attr: 'h', kind: 'half', not: 'o' } })), ['counter', 4, 0, 2], 'heresy: half, plays the color he could not say → caught');
    eq(kv(pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }, { hint: { attr: 'o', kind: 'half', not: 'c' } })), ['counter', 3, 0, 0], 'heresy: half, plays another color → not a lie');
    eq(kv(pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }, { hint: { attr: 'c', kind: 'none' } })), ['counter', 3, 0, 0], 'heresy: none → never caught');
    hint(d, 'c'); d.p.hp = d.p.max; r = pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }); eq([kv(r), fn(r)], [['counter', 4, 0, 0], [T('crit', 1)]], 'heresy: full 聲望 → crit, no heal note'); d.p.hp = 6;
    d.p.atk = 2; d.e.def = 2; r = pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }); eq([kv(r), fn(r)], [['counter', 4, 0, 2], [T('crit', 1), T('heal', 2)]], 'heresy: 3+品味 2+1=6 → his 底氣 half(6,2)=4; crit {n} stays 1'); d.p.atk = 0; d.e.def = 0;
    r = pv(d, mk(1, 1, 2), 'h', { attr: 'h', star: 4 }); eq([kv(r), fn(r)], [['mirrorLose', 0, 3, 0], [T('loseCost', 1)]], 'heresy: mirror lose +1');
    d.e.atk = 1; d.p.def = 2; eq(kv(pv(d, mk(1, 1, 2), 'h', { attr: 'h', star: 4 })), ['mirrorLose', 0, 2, 0], 'heresy: lose cost before his 品味 and your 底氣 (2+1+1=4 → half 2)'); d.e.atk = 0; d.p.def = 0;
    eq(kv(pv(d, mk(1, 1, 1), 'h', { attr: 'o', star: 4 })), ['mirrorLose', 0, 4, 0], 'heresy: blocked counter = mirror lose 3 → +1');
    eq([kv(pv(d, mk(1, 1, 3), 'h', { attr: 'c', star: 3 })), kv(pv(d, mk(1, 1, 3), 'h', { attr: 'h', star: 3 }))], [['countered', 0, 3, 0], ['tie', 0, 0, 0]], 'heresy: countered／tie unchanged'); }
  { const d = facDuel('heresy', { picks: { x_crack: 1 } }); eq(fn(pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }, { hint: 'c' })), [T('crit', 2), T('heal', 2)], '破音: +2, {n}=2'); }
  { const d = facDuel('heresy', { picks: { x_echo: 1 } }); eq(kv(pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }, { hint: 'c' })), ['counter', 4, 0, 3], '回音: heal 3'); }
  { const d = facDuel('heresy', { picks: { x_thick: 1 } }); eq(kv(pv(d, mk(1, 1, 2), 'h', { attr: 'h', star: 4 })), ['mirrorLose', 0, 2, 0], '臉皮厚: first lose no cost'); d.p.facN.lose = 1; eq(kv(pv(d, mk(1, 1, 2), 'h', { attr: 'h', star: 4 })), ['mirrorLose', 0, 3, 0], '臉皮厚: only the first'); }
  { const d = facDuel('heresy', { picks: { x_dist: 1 } }); eq([kv(pv(d, mk(1, 1, 3), 'h', { attr: 'h', star: 3 })), kv(pv(d, mk(3, 1, 1), 'c', { attr: 'c', star: 3 }))], [['mirrorWin', 1, 0, 0], ['tie', 0, 0, 0]], '失真: hardcore +1 only'); }
  { const d = facDuel('heresy', { picks: { x_crit: 1 } }); let r = pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }, { hint: 'c' }); eq([kv(r), fn(r)], [['counter', 5, 0, 2], [T('crit2', 2), T('heal', 2)]], '爆擊: crit +2 (note crit2 {n}=2)');
    eq([kv(pv(d, mk(1, 1, 2), 'h', { attr: 'h', star: 4 })), fn(pv(d, mk(1, 1, 2), 'h', { attr: 'h', star: 4 }))], [['mirrorLose', 0, 2, 0], []], '爆擊: losing on stars costs nothing extra'); }
  { const d = facDuel('heresy', { picks: { x_crit: 1, x_crack: 1 } }); eq(fn(pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }, { hint: 'c' })), [T('crit2', 3), T('heal', 2)], '爆擊＋破音: +3'); }
  // ?apex 同開：倍數取大、回聲望取大（不相加）、看穿確認過的那手不多扣不回；換一格的 critAdd 跟異端被動同一步取大
  { const ab = (op, params, timing) => ({ id: 't-' + op, card: K.aces.heresy, tier: 'heresy', name: '測', text: 'x', timing: timing || 'duel', op, params: params || {}, hold: null });
    let d = facDuel('heresy', { apex: true, ability: ab('reveal', {}, 'hand') }); hint(d, 'c'); d.p.aceUsed = true; d.p.apexOn = { n: d.n, reveal: 'bluff' };
    eq(kv(pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 })), ['counter', 3, 0, 0], 'peeked (看穿) hand: no heresy crit／heal');
    d = facDuel('heresy', { apex: true, ability: ab('crit', { mult: 2 }) }); hint(d, 'c'); d.p.aceUsed = true; d.p.apexOn = { n: 1 };
    eq(kv(pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 })), ['counter', 8, 0, 2], 'crit ×2 with heresy +1: (3+1)×2 = 8 (one multiplier)');
    d = facDuel('heresy', { apex: true, ability: ab('critLeech', { mult: 1 }), atk: 5 }); hint(d, 'c'); d.p.aceUsed = true; d.p.apexOn = { n: 1 }; d.p.hp = 2;
    let r = pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }); eq([kv(r), fn(r)], [['counter', 9, 0, 5], [T('crit', 1)]], 'critLeech 5 vs heresy 2 → heal 5 (max, not 7), no heresy heal note');
    d = facDuel('heresy', { apex: true, ability: ab('critAdd', { n: 2 }) }); hint(d, 'c'); d.p.aceUsed = true; d.p.apexOn = { n: 1 };
    r = pv(d, mk(1, 1, 3), 'h', { attr: 'o', star: 2 }); eq([kv(r), fn(r)], [['counter', 5, 0, 2], [T('heal', 2)]], 'critAdd 2 vs heresy critPre 1 → +2 (max, not +3); heal still 2');
    // 審查 棒二：preview 假設這手發動看穿（act.apex、P.apexOn 還沒寫）＝resolve（activateApex 先寫 P.apexOn.reveal）：異端不多扣、不回；真卡兩張＋測試卡
    const reveals = [ab('reveal', {}, 'hand')].concat(EN.apexList(K, 'heresy').map(x => EN.abilityOf(K, x.card)).filter(A => A.op === 'reveal'));
    ok(reveals.length === 3, 'heresy has two real reveal cards (rallizes, ikeda)', reveals.map(A => A.id));
    for (const A of reveals) {
      d = facDuel('heresy', { apex: true, ability: A }); hint(d, 'c'); d.p.hand[0] = mk(1, 1, 3); d.e.hand[0] = mk(1, 2, 1);
      ok(EN.canApex(d), A.id + ': can activate');
      const p = EN.preview(d, { i: 0, attr: 'h', apex: true }, { i: 0, attr: 'o' });
      const cl = EN.resolveTurn(d, { i: 0, attr: 'h', apex: true }, { forcedPlay: { i: 0, attr: 'o' } }).find(e => e.t === 'clash');
      eq([kv(p), p.fac, JSON.stringify(p.apex)], [['counter', 3, 0, 0], {}, JSON.stringify(cl.apex)], A.id + ': preview with activation = resolve (no heresy crit／heal on the revealed hand)');
      eq([kv(cl), cl.fac], [['counter', 3, 0, 0], {}], A.id + ': resolve no heresy crit／heal');
    }
    // 審查 棒二：拆穿回血（critLeech）×異端被動回 2：取大；流派那份比較多＝這張沒回到（h 0、不算 hit、結果句 leechFac，不再兩邊各寫一次回 2）；這張比較多＝照舊
    { const SN = F.apexSwap.notes;
      d = facDuel('heresy', { apex: true, ability: ab('critLeech', { mult: 1 }) }); d.apexText.notes = Object.assign({}, d.apexText.notes, SN); hint(d, 'c'); d.p.aceUsed = true; d.p.apexOn = { n: 1 }; d.p.hp = 6;
      r = pv(d, mk(1, 1, 1), 'h', { attr: 'o', star: 2 });
      eq([kv(r), fn(r), r.apex.hit, r.apex.h, (r.notes.find(n => n.apex) || {}).text], [['counter', 2, 0, 2], [T('crit', 1), T('heal', 2)], false, 0, SN.leechFac], 'critLeech 1 < heresy heal 2 → heal 2 is the passive\'s; card: no hit, h 0, note leechFac');
      d.p.hp = 11; r = pv(d, mk(1, 1, 1), 'h', { attr: 'o', star: 2 });
      eq([kv(r), fn(r), r.apex.hit, r.apex.h], [['counter', 2, 0, 1], [T('crit', 1)], true, 1], 'room 1: card heal 1 wins the tie (max, card first) → card hit, no passive heal note'); } }

  // ---- preview＝resolveTurn（三派 × 本派選項全拿／一般 × 有沒有 ?apex；每一手每一個合法動作；thoughtful／random 照實打）；計數照上限；序章沒有 fac ----
  { let hands = 0, fnotes = 0;
    const ids = ['copycat', 'already', 'critic', 'label', 'boss'];
    for (const tier of TIERS) for (let s = 1; s <= (QUICK ? 8 : 30); s++) {
      const allPicks = s % 2 ? Object.fromEntries(F[tier].picks.map(p => [p.id, 1])) : {}, apex = s % 3 === 0;
      const src = { bag: K.gifts[tier].concat(BP3), ace: tier, relics: s % 4 === 0 ? ['dustcover', 'cleaner', 'boost_' + EN.TIER_AXIS[tier]] : [], atk: s % 5, def: s % 3, hp: 12, maxHp: 15, fac: { picks: allPicks, tal: {}, trialNodes: {} } };
      if (apex) src.aceId = EN.apexList(K, tier)[((s / 3) * 4 + 3) % 15].card;   // 審查 棒二：原本 s % 15（s 是 3 的倍數）永遠挑不到第 7、8 張（異端兩張看穿）；QUICK 7、11，全量 7、11、0、4、8…
      const pos = 3 + (s % 40), id = ids[s % ids.length];
      const eDef = EN.enemyDef(K, id, { pos, seedKey: 'pv31', runNo: s, playerAce: tier, bossAce: TIERS.filter(t => t !== tier)[0] });
      const { duel } = EN.startDuel(EN.playerDef(K, src, apex ? { apex: true, fac: true } : { fac: true }), eDef, Object.assign({ seed: 900 + s, hintTable: EN.hintTableOf(K) }, apex ? { apex: true } : {}));
      const R = lcg(s), mem = {}, pol = s % 2 ? 'thoughtful' : 'random';
      let g = 0;
      while (!duel.over && g++ < 12) {
        const eS = { i: duel.plan.idx, attr: duel.plan.attr }, before = JSON.stringify(duel);
        const acts = EN.legalActions(duel).concat(EN.canApex(duel) ? EN.legalActions(duel).map(a => Object.assign({ apex: true }, a)) : []);
        const pvs = acts.map(a => EN.preview(duel, a, eS));
        ok(JSON.stringify(duel) === before, 'preview does not change the duel');
        const act = EN.policies[pol](duel, R, mem, K), k = acts.findIndex(a => JSON.stringify(a) === JSON.stringify(act));
        const cl = EN.resolveTurn(duel, act).find(e => e.t === 'clash'); hands++;
        if (k >= 0 && cl) { const p = pvs[k]; eq([sig(p), p.heal | 0, p.fac], [sig(cl), cl.heal | 0, cl.fac], tier + ' s' + s + ': preview = resolve'); }
        if (cl) fnotes += cl.notes.filter(n => n.fac).length;
        const N = duel.p.facN, fx = duel.p.fx;
        ok((N.thorn | 0) <= (fx.thornMax | 0) && (N.leech | 0) <= (fx.leechMax | 0), tier + ': second move within its cap', N);
      }
      ok(duel.p.fac === tier && duel.stats.fac && typeof duel.stats.fac === 'object', tier + ': duel carries fac');
    }
    ok(fnotes >= TIERS.length * (QUICK ? 8 : 30), 'faction notes show up (≥1 per duel on average)', fnotes);
    // resolve 真的累計：吸血一場最多回 2；反傷第 3 次不扣（同一場、照實打）
    const facRig = (tier, picks, o = {}) => { const d = facDuel(tier, Object.assign({ picks }, o)); return d; };
    const swing = (d, pc, pa, ec, ea, h) => { d.p.hand[0] = pc; d.e.hand[0] = ec; if (h) hint(d, h); const p = EN.preview(d, { i: 0, attr: pa }, { i: 0, attr: ea }); const cl = EN.resolveTurn(d, { i: 0, attr: pa }, { forcedPlay: { i: 0, attr: ea } }).find(e => e.t === 'clash'); eq([sig(p), p.heal | 0], [sig(cl), cl.heal | 0], 'forced hand: preview = resolve'); return cl; };
    { const d = facRig('hall', { h_leech: 1 }, { hp: 3 }); const hs = [];
      for (let i = 0; i < 3; i++) hs.push(swing(d, mk(5, 1, 1), 'c', mk(3, 1, 1), 'c', 'c').heal | 0);
      eq([hs, d.p.facN.leech, d.p.hp], [[2, 0, 0], 2, 5], 'leech: 2 then 0 (cap 2 per duel)'); }
    { const d = facRig('pearl', { p_thorn: 1 }, { hp: 40 }); d.p.max = 40; const ts = [];
      for (let i = 0; i < 3; i++) ts.push(swing(d, mk(1, 3, 1), 'o', mk(1, 1, 3), 'h', 'h').toE);
      eq([ts, d.p.facN.thorn, d.p.facN.countered], [[2, 2, 0], 2, 3], 'thorn: 2, 2, then 0 (max 2 times)'); }
    { const d = facRig('hall', { h_old: 1 }, { hp: 20 }); d.p.max = 20; const tp = [];
      for (let i = 0; i < 2; i++) tp.push(swing(d, mk(3, 1, 1), 'c', mk(3, 1, 1), 'c', 'c').toP);
      eq(tp, [0, 1], '老派: first tie free, second costs 1 (resolve counts)'); } }

  // ---- run：序章那場沒有 fac、第 1 位起有；R-F9 沒旗標的頁面續玩照樣生效；換派清空本派選項；view.fac；熟客；地下串連 ----
  { const run = EN.newRun(K, { seedKey: 'pro31', runNo: 1, ace: 'hall', fac: true });
    EN.choose(run, K, EN.bargainPolicy(run, K));
    const f0 = EN.startFight(run, K, { apex: true });
    ok(run.prologue === 'pending' && !('fac' in f0.duel.p) && !('fx' in f0.duel.p) && !f0.duel.apexMode, 'prologue duel: no fac (and no apex)');
    let g = 0; while (!f0.duel.over && g++ < 12) EN.resolveTurn(f0.duel, EN.legalActions(f0.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } });
    EN.finishFight(run, K); let h = 0; while (run.pending && h++ < 10) EN.choose(run, K, EN.runPolicy(run, K));
    const saved = JSON.parse(JSON.stringify(run));
    const f1 = EN.startFight(saved, K, {});
    ok(f1.duel.p.fac === 'hall' && f1.duel.p.fx.mirrorWinFull === 1 && f1.duel.facNotes.full === F.notes.full, 'first guest: fac on; reloaded run without any page flag keeps it (R-F9)');
    const v = EN.view(f1.duel); eq([v.fac.tier, v.fac.icon, v.fac.left], ['hall', '比', { leech: null, thorn: null }], 'view.fac: tier, icon, second move left (none yet)'); }
  { const run = EN.newRun(K, { seedKey: 'sw31', runNo: 2, ace: 'hall', prologue: false, fac: true, unlocked: ['hall', 'pearl', 'heresy'] }); run.fac.picks = { h_eye: 1 };
    const res = EN.switchAce(run, K, 'pearl'); ok(res.ok && run.ace === 'pearl' && JSON.stringify(run.fac.picks) === '{}' && run.fac.trialNodes, 'switchAce clears picks'); }
  { const mkRun = picks => { const r = EN.newRun(K, { seedKey: 'lh31', runNo: 2, ace: 'pearl', prologue: false, fac: true }); r.fac.picks = picks; EN.choose(r, K, EN.bargainPolicy(r, K)); r.maxHp = 20; r.hp = 20; return r; };
    const heals = [{}, { p_regular: 1 }].map(picks => { const r = mkRun(picks); const f = EN.startFight(r, K, {}); f.duel.p.hp = 4; let g = 0; while (!f.duel.over && g++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } }); const o = EN.finishFight(r, K); return [o.heal, o.lowHeal | 0, (r.stats.fac || {}).fights]; });
    eq(heals, [[3, 0, 1], [5, 2, 1]], '熟客: under half → +2 after a win (out.lowHeal); run.stats.fac counts fights');
    const r2 = mkRun({ p_regular: 1 }); const f2 = EN.startFight(r2, K, {}); f2.duel.p.hp = 10; let g = 0; while (!f2.duel.over && g++ < 12) EN.resolveTurn(f2.duel, EN.legalActions(f2.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } });
    eq(EN.finishFight(r2, K).heal, 3, '熟客: half or more → normal heal'); }

  // ---- 5 本派選項：第 4 格（Lv5／10／15…）、拿過不再出、佔屬性、連升兩級、地下串連、錯的不改 run、選秀 guard、存讀檔、runPolicy ----
  { const base = () => { const r = EN.newRun(K, { seedKey: 'lv31', runNo: 2, ace: 'hall', prologue: false, fac: true }); EN.choose(r, K, EN.bargainPolicy(r, K)); return r; };
    const at = (r, level, ups) => { r.level = level; r.levelUps = ups; r.pending = null; return EN.levelOffer(r, K); };
    const r = base();
    eq([2, 3, 4, 5, 6, 9, 10, 11, 15, 20].map(L => at(r, L, 1).length), [3, 3, 3, 4, 3, 3, 4, 3, 4, 4], 'fourth slot only at Lv5／10／15／20');
    const o5 = at(r, 5, 1), ord = F.hall.picks.map(p => p.id).sort((a, b) => EN.hash01('lv31#2#fac5#' + a) - EN.hash01('lv31#2#fac5#' + b));
    eq(o5[3], { pick: 'fac', id: ord[0] }, 'Lv5 slot = hash-smallest pick');
    eq(at(r, 6, 2).length, 4, 'two level-ups 4→6: first offer (Lv5) has it');
    const r0 = base(); delete r0.fac; eq(at(r0, 5, 1).length, 3, 'no run.fac → 3');
    eq(at(r, 5, 1).slice(0, 3), at(r0, 5, 1), 'first three = the old offer');
    // 實際走：Lv5 拿本派 → 屬性不動、聲望上限照 +1；下一級照常三格；拿過的不再出
    const r1 = base(); r1.level = 4; r1.xp = 0; r1.levelUps = 0;
    const atk0 = r1.atk, def0 = r1.def, mx0 = r1.maxHp;
    const ups = EN.gainXp(r1, EN.trialCfg(K, 0), 4 + EN.trialCfg(K, 0).levelNeed + 5 + EN.trialCfg(K, 0).levelNeed);   // 4→5→6
    ok(ups === 2 && r1.level === 6, 'gainXp 4→6', [ups, r1.level]);
    r1.pending = { type: 'level', enemyId: 'copycat', pos: r1.pos, level: 5, offer: EN.levelOffer(r1, K) };
    const fo = r1.pending.offer.find(x => x.pick === 'fac');
    const snap = JSON.stringify(r1);
    for (const bad of [{ type: 'level', pick: 'fac' }, { type: 'level', pick: 'fac', id: 'h_nope' }, { type: 'level', pick: 'fac', id: F.hall.picks.map(p => p.id).find(id => id !== fo.id) }])
      ok(EN.choose(r1, K, bad).error === 'notOffered' && JSON.stringify(r1) === snap, 'wrong fac choice rejected, run unchanged: ' + JSON.stringify(bad));
    const saved = JSON.parse(JSON.stringify(r1));                                 // 存讀檔中途（pending.offer 裡有 fac）照續
    const res = EN.choose(r1, K, { type: 'level', pick: 'fac', id: fo.id });
    ok(res.ok && r1.fac.picks[fo.id] === 1 && r1.atk === atk0 && r1.def === def0 && r1.maxHp === mx0 + 2 * EN.trialCfg(K, 0).levelHp && r1.picks.slice(-1)[0] === 'fac:' + fo.id, 'fac pick: no stat, max +1 per level kept');
    eq(res.effects, [{ level: 'fac', id: fo.id, n: 0 }], 'effects');
    ok(r1.pending && r1.pending.type === 'level' && r1.pending.level === 6 && r1.pending.offer.length === 3, 'Lv6 next: 3 slots');
    ok(EN.fixFac(saved, K) === false && EN.choose(saved, K, { type: 'level', pick: 'fac', id: fo.id }).ok && JSON.stringify(saved) === JSON.stringify(r1), 'JSON round trip mid level-up → same');
    r1.pending = null; ok(at(r1, 10, 1)[3].id !== fo.id, 'taken pick not offered again');
    const r5 = base(); r5.fac.picks = Object.fromEntries(F.hall.picks.map(p => [p.id, 1])); eq(at(r5, 10, 1).length, 3, 'all five taken → no slot');
    const rh = EN.newRun(K, { seedKey: 'lv31', runNo: 2, ace: 'pearl', prologue: false, fac: true }); rh.fac.picks = { p_remember: 1, p_bench: 1, p_regular: 1, p_thorn: 1 };
    rh.level = 5; rh.levelUps = 1; rh.pending = { type: 'level', enemyId: 'copycat', pos: 1, level: 5, offer: EN.levelOffer(rh, K) }; const hp0 = rh.hp, m0 = rh.maxHp;
    ok(rh.pending.offer[3].id === 'p_hp' && EN.choose(rh, K, { type: 'level', pick: 'fac', id: 'p_hp' }).ok && rh.maxHp === m0 + 3 && rh.hp === hp0 + 3, '地下串連: max +3, hp +3');
    // runPolicy：本派格出了就拿；facPick false 照 MIX；MIX 不數本派格
    const r6 = base(); r6.level = 5; r6.levelUps = 1; r6.pending = { type: 'level', enemyId: 'copycat', pos: 1, level: 5, offer: EN.levelOffer(r6, K) };
    eq(EN.runPolicy(r6, K), { type: 'level', pick: 'fac', id: r6.pending.offer[3].id }, 'runPolicy takes the fac slot');
    r6.picks = ['atk', 'fac:h_eye']; eq(EN.runPolicy(r6, K, { facPick: false }), { type: 'level', pick: 'def' }, 'runPolicy facPick:false → MIX counts only stat picks (2nd = def)');
    // 中繼點選秀：沒有本派格、送 fac 被拒（'bad'）、跳過的不補發；Lv20 照出
    for (const from of [20, 50]) {
      const rd = EN.newRun(K, { seedKey: 'dr31-' + from, runNo: 2, ace: 'heresy', prologue: false, fac: true, from });
      let g = 0, lv5 = false;
      while (rd.pending && rd.pending.type === 'draft' && g++ < 60) {
        const of = rd.pending.offer;
        if (of.kind === 'level') {
          ok(of.offer.length === 3 && of.offer.every(x => x.pick !== 'fac'), 'draft level offer: 3, no fac (Lv' + (rd.level + 1) + ')');
          if (rd.level === 4) lv5 = true;
          const s0 = JSON.stringify(rd); const bad = EN.choose(rd, K, { type: 'draft', pick: 'fac', id: 'x_crit' });
          ok(bad.ok === false && bad.error === 'bad' && JSON.stringify(rd) === s0, 'choose draft fac → bad, run unchanged');
        }
        EN.choose(rd, K, EN.cPolicy(rd, K));
      }
      ok(lv5 && !rd.pending && rd.pos === from && JSON.stringify(rd.fac.picks) === '{}' && !rd.picks.some(x => String(x).startsWith('fac:')), 'draft done from ' + from + ': went through Lv4→5, no fac picks (not made up later)');
      const nx = Math.ceil((rd.level + 1) / 5) * 5; rd.level = nx; rd.levelUps = 1;
      eq(EN.levelOffer(rd, K).length, 4, 'after the draft: Lv' + nx + ' has the slot');
    }
    // 整趟（smart＋thoughtful 到第 25 位）：每逢 5 級那一次拿的是本派（runPolicy），其他照 MIX
    for (const tier of TIERS) {
      const { run } = driveD(K, { seedKey: 'tr31-' + tier, runNo: 2, ace: tier, prologue: false, fac: true }, QUICK ? 15 : 25);
      const want = run.picks.map((x, k) => (k + 2) % 5 === 0);
      ok(run.picks.length >= 4 && run.picks.every((x, k) => String(x).startsWith('fac:') === want[k]), tier + ': fac picks exactly at Lv5／10／15…', run.picks);
      eq(Object.keys(run.fac.picks).sort(), run.picks.filter(x => String(x).startsWith('fac:')).map(x => x.slice(4)).sort(), tier + ': run.fac.picks = picks');
      ok(run.stats.fac && run.stats.fac.fights > 0, tier + ': run.stats.fac counted');
    }
    // fixFac：不認得的 id、壞形狀、offer 裡不認得或拿過的本派格
    const rf = base(); rf.fac = { picks: { h_eye: 1, zzz: 1, h_old: 0 } }; rf.pending = { type: 'level', enemyId: 'copycat', pos: 1, level: 5, offer: [{ pick: 'atk', n: 1 }, { pick: 'def', n: 1 }, { pick: 'hp', n: 2 }, { pick: 'fac', id: 'h_eye' }] };
    ok(EN.fixFac(rf, K) && JSON.stringify(rf.fac) === JSON.stringify({ picks: { h_eye: 1 }, tal: {}, trialNodes: {} }) && rf.pending.offer.length === 3, 'fixFac: drops unknown ids, fills shape, drops taken slot');
    const rb = base(); rb.fac = 'x'; ok(EN.fixFac(rb, K) && !('fac' in rb), 'fixFac: bad fac removed'); ok(EN.fixFac(base(), K) === false, 'fixFac: no fac → false'); }

  // ---- 8 ?fac=1&apex=1 換一格：只在 run.fac＋apexMode；只開 ?apex=1 時 C.apexTrial 逐字照舊；冷門 theirStar／pThr（含預設那張 Zodiac）→ critAdd 2、異端 crit／critLeech → mirrorPlus 2 ----
  //   棒二審查定案：on true、Zodiac 不另外指定（照家族）。對照表用 on true 的複本 KS 測；真 content 照 on 判（false＝一張都不換＝只標示）
  { const KS = Object.assign({}, K, { factions: Object.assign({}, F, { apexSwap: Object.assign({}, F.apexSwap, { on: true }) }) });
    const before = JSON.stringify(K.apexTrial), S = KS.factions.apexSwap, R0 = { fac: { picks: {} } };
    for (const t of TIERS) for (const x of EN.apexList(K, t)) {
      const A = EN.abilityOf(K, x.card), A0 = EN.apexAbilityOf(KS, x.card, null), A1 = EN.apexAbilityOf(KS, x.card, { ace: t }), B = EN.apexAbilityOf(KS, x.card, R0), BR = EN.apexAbilityOf(K, x.card, R0);
      if (F.apexSwap.on === false) eq(BR, A, x.id + ': real content apexSwap.on false → not swapped (only label)');
      else eq(BR, B, x.id + ': real content apexSwap.on → same as the table');
      eq([A0, A1], [A, A], x.id + ': without run.fac = abilityOf');
      const sw = (S[t] && ((S[t].cards || {})[x.id] || (S[t].ops || {})[x.op])) || null;
      if (!sw) { eq(B, A, x.id + ': not swapped'); continue; }
      ok(B.op === sw.op && JSON.stringify(B.params) === JSON.stringify(sw.params) && B.text === sw.text && B.name === A.name && B.card === A.card && B.id === A.id && B.timing === (A.timing === 'hold' ? 'hold' : sw.timing) && JSON.stringify(B.hold) === JSON.stringify(A.hold), x.id + ': swapped');
      eq(B.swapped, { op: A.op, params: A.params, timing: A.timing, text: A.text }, x.id + ': swapped keeps the original');
    }
    const cnt = t => EN.apexList(K, t).filter(x => EN.apexAbilityOf(KS, x.card, R0).swapped).length;
    eq([cnt('hall'), cnt('pearl'), cnt('heresy')], [0, 11, 10], 'swapped: hall 0, pearl 11 (theirStar 6＋pThr 5), heresy 10 (crit 7＋critLeech 3)');
    eq([EN.apexAbilityOf(KS, K.aces.pearl, R0).op, EN.apexAbilityOf(KS, K.aces.pearl, R0).params, EN.apexAbilityOf(KS, K.aces.heresy, R0).op, EN.apexAbilityOf(KS, K.aces.heresy, R0).params], ['critAdd', { n: 2 }, 'mirrorPlus', { n: 2 }], 'Zodiac → critAdd 2 (its family, no card override); Filth → mirrorPlus 2');
    ok(JSON.stringify(K.apexTrial) === before, 'C.apexTrial untouched');
    ok(EN.apexAbilityOf(Object.assign({}, K, { factions: Object.assign({}, F, { apexSwap: Object.assign({}, S, { on: false }) }) }), K.aces.pearl, R0).op === 'theirStar', 'apexSwap.on false → only label (no swap)');
    // startFight：run.fac＋apex → 換；沒有 run.fac＋apex → 照舊；run.fac 沒 apex → 沒有 apexMode
    const go = (fac, apex, KK) => { KK = KK || KS; const r = EN.newRun(KK, { seedKey: 'as31', runNo: 2, ace: 'pearl', prologue: false, fac }); EN.choose(r, KK, EN.bargainPolicy(r, KK)); return EN.startFight(r, KK, { apex }).duel; };
    const d1 = go(true, true), d2 = go(false, true), d3 = go(true, false);
    { const dR = go(true, true, K); ok(dR.apexMode && dR.p.fac === 'pearl' && dR.p.ability.op === (F.apexSwap.on === false ? 'theirStar' : 'critAdd') && !!dR.p.ability.swapped === (F.apexSwap.on !== false), '?fac=1&apex=1 real content: apexSwap.on ' + F.apexSwap.on + ' → ' + (F.apexSwap.on === false ? 'only label (Zodiac stays theirStar)' : 'swapped')); }
    ok(d1.apexMode && d1.p.ability.op === 'critAdd' && d1.p.fac === 'pearl' && d1.apexText.notes.critAdd === S.notes.critAdd, '?fac=1&apex=1: swapped in the duel (notes have critAdd)');
    ok(d2.apexMode && d2.p.ability.op === 'theirStar' && !('fac' in d2.p) && !('critAdd' in d2.apexText.notes), '?apex=1 only: C.apexTrial as is');
    ok(!d3.apexMode && d3.p.fac === 'pearl', '?fac=1 only: no apexMode');
    // critAdd：抓到他唬你那手多扣 2（冷門借他的星之後、他的底氣之前）；沒抓到＝沒作用
    const bailey = EN.apexAbilityOf(KS, 'derek bailey|solo guitar volume 1', R0);
    const d = facDuel('pearl', { apex: true, ability: bailey });
    let r = pv(d, mk(1, 3, 1), 'o', { attr: 'c', star: 4 }, { apex: true, hint: 'h' });
    eq([kv(r), r.apex && r.apex.op, r.apex && r.apex.d, (r.notes.find(n => n.apex) || {}).text], [['counter', 6, 0, 0], 'critAdd', 2, S.notes.critAdd.replace('{d}', 2)], 'critAdd: caught → 4 + 2');
    r = pv(d, mk(1, 3, 1), 'o', { attr: 'c', star: 4 }, { apex: true, hint: 'c' }); eq([kv(r), r.apex.hit], [['counter', 4, 0, 0], false], 'critAdd: honest → no effect');
    // 他沒唬（第 1 手照實）：沒作用的結果句＝noneHonest（拆穿類）
    eq((r.notes.find(n => n.apex) || {}).text, K.apexTrial.notes.noneHonest, 'critAdd: honest hand note = noneHonest'); }

  // ---- check-content factionProblems：乾淨；改壞抓得到 ----
  { eq(factionProblems(K, EN), [], 'check-content factionProblems clean');
    const mut = f => { const D = JSON.parse(JSON.stringify(F)); f(D); return factionProblems(Object.assign({}, K, { factions: D }), EN).length; };
    ok(mut(D => { delete D.notes.cCost; }) && mut(D => { D.notes.crit = '拆穿！加倍'; }) && mut(D => { D.hall.picks[0].op = 'zzz'; }) && mut(D => { D.pearl.priority.pop(); }) && mut(D => { D.heresy.picks[4].second = false; })
      && mut(D => { D.apexSwap.heresy.ops.crit.params.n = 4; }) && mut(D => { D.apexSwap.heresy.cards['brotzmann-machine-gun'].text = '這手比星多算 2。'; }) && mut(D => { delete D.apexSwap.heresy.cards['brotzmann-machine-gun']; })
      && mut(D => { (D.apexSwap.pearl.cards = D.apexSwap.pearl.cards || {}).nope = { op: 'eStar', params: { n: 1 }, timing: 'hand', text: 'x' }; }) && mut(D => { D.hall.name = '殿堂派'; }) && mut(D => { D.occupy = false; }) && mut(D => { delete D.ui.badge; }),
      'factionProblems catches: missing note, note without {n}, unknown op, priority, second move, swap param range, hold text, hold card not covered, unknown card, name, occupy, ui');
    eq(Object.keys(F.notes).sort(), EN.FAC_NOTE_ORDER.slice().sort(), 'notes keys = FAC_NOTE_ORDER');
    ok(!/加倍/.test(JSON.stringify(F.notes)) && F.notes.cCost && F.factionsTag === undefined && K.factionsTag === '新', 'notes final: no 加倍, has cCost; factionsTag 新'); }
});

// ---------------- #32 第 I 波 I-0（scratchpad v5/wave-i SPEC-I §7.2、§7.3、§7.5；契約 wave-i/build0/CONTRACT.md） ----------------
section('32 第 I 波 I-0 成長曲線：打完第 1 位就升級（第一輪 3 次、第一級不加聲望上限）、選秀照 firstHp（m／k 照舊封閉式）、樂歷曲線 100／150／250…、第一趟保底、一趟裡的細條、曲線改了補抽、G1′', () => {
  EN.setCtx(null);
  const TW = EN.trialCfg(CW, 0), T0 = EN.trialCfg(C, 0);
  // CI＝舊段落 content（C 波全關、沒有攤位）但第一位升級照出貨（CW 的 firstNeed／firstHp）
  const CI = Object.assign({}, C, { trial: Object.assign({}, C.trial, { firstNeed: C0.trial.firstNeed, firstHp: C0.trial.firstHp }) });
  const TI = EN.trialCfg(CI, 0);
  const winC = (run, K) => { const f = EN.startFight(run, K, {}); let g = 0; while (!f.duel.over && g++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } }); return EN.finishFight(run, K); };
  const settleC = (run, K) => { let g = 0; while (run.pending && g++ < 60) { const ch = EN.runPolicy(run, K); if (!EN.choose(run, K, ch).ok) break; } };

  // ---- 1 xpNeed／levelHpAt ----
  eq([TW.firstNeed, TW.firstHp, C0.trial.firstNeed, C0.trial.firstHp, EN.TRIAL.firstNeed, EN.TRIAL.firstHp], [2, 0, 2, 0, 2, 0], 'firstNeed 2／firstHp 0 (content = engine TRIAL)');
  eq([1, 2, 3, 4, 10].map(l => EN.xpNeed(TW, l)), [2, 5, 6, 7, 13], 'xpNeed: Lv1→2 = 2, then level + 3');
  eq([1, 2, 3, 10].map(l => EN.levelHpAt(TW, l)), [0, 1, 1, 1], 'levelHpAt: Lv1→2 +0, then +1');
  eq([1, 2].map(l => EN.xpNeed(T0, l)).concat([1, 2].map(l => EN.levelHpAt(T0, l))), [4, 5, 1, 1], 'firstNeed 0／firstHp = levelHp → the old rule');
  { const T = Object.assign({}, TW); delete T.firstNeed; delete T.firstHp; eq([EN.xpNeed(T, 1), EN.levelHpAt(T, 1)], [4, 1], 'no firstNeed／firstHp keys → old rule');
    eq(EN.levelHpAt(Object.assign({}, TW, { firstHp: -1 }), 1), 1, 'bad firstHp → levelHp'); }

  // ---- 2 全贏時間表：Lv2 第 1 位、Lv3 第 4 位、Lv4 第 5 位（第一輪升 3 次）、Lv5 第 8 位；第一級聲望上限不加；三格固定 ----
  { const run = EN.newRun(CI, { seedKey: 'i0-path', runNo: 2, ace: 'hall' }); EN.choose(run, CI, EN.bargainPolicy(run, CI));
    const hp0 = run.hp, max0 = run.maxHp;
    const res = winC(run, CI);
    ok(res.win && res.levelUps === 1 && run.level === 2 && run.xp === 0 && run.maxHp === max0 && run.hp === Math.min(max0, hp0 + TI.heal), 'beat pos 1 → Lv2, max 聲望 unchanged (firstHp 0)', { lv: run.level, xp: run.xp, max: run.maxHp, hp: run.hp });
    while (EN.nextStep(run) === 'reward') EN.choose(run, CI, { type: 'skip' });
    ok(EN.nextStep(run) === 'level' && run.pending.level === 2 && run.pos === 1, 'reward → level pending (Lv2) at pos 1');
    eq(run.pending.offer.map(o => o.pick), ['atk', 'def', 'hp'], 'Lv2 offer: 品味、底氣、聲望 (fixed order)');
    const at = {}; at[1] = run.level; let hpPicks = 0;
    EN.choose(run, CI, { type: 'level', pick: 'atk' });
    for (let d = 2; d <= 40; d++) {
      const w = levelAtT(d, TI.xp, TI.levelNeed, TI.firstNeed);
      ok(run.pos === d && run.level === w.L && run.xp === w.xp, 'I-0 level at pos ' + d + ' = harness', { pos: run.pos, level: run.level, xp: run.xp, w });
      ok(run.maxHp === TI.youHp + (run.level > 1 ? TI.firstHp + (run.level - 2) * TI.levelHp : 0) + hpPicks * TI.picks.hp, 'I-0 上限 = 12 + 0（Lv2）+ (Lv−2) + 2×聲望上限 at ' + d);
      winC(run, CI); at[d] = run.level; settleC(run, CI); hpPicks = run.picks.filter(x => x === 'hp').length;
    }
    // SPEC-I §7.2 寫「Lv5 第 8 位」：第 8 位累計 19 經驗、Lv5 要 2＋5＋6＋7＝20 → 第 9 位（舊規則第 10 位）
    eq([at[1], at[3], at[4], at[5], at[8], at[9]], [2, 2, 3, 4, 4, 5], 'all wins: Lv2 after pos 1, Lv3 after 4, Lv4 after 5 (3 level-ups in round 1), Lv5 after 9'); }
  // 序章 0 經驗：序章打完還是 Lv1
  { const run = EN.newRun(CI, { seedKey: 'i0-pro', runNo: 1, ace: 'pearl' }); ok(run.prologue === 'pending', 'prologue run');
    let g = 0; while (run.prologue === 'pending' && g++ < 10) { if (EN.canBargainPick(run) && !run.pending) { EN.choose(run, CI, EN.bargainPolicy(run, CI)); continue; } if (run.pending) { settleC(run, CI); continue; } winC(run, CI); }
    ok(run.level === 1 && run.xp === 0 && run.pos === 1, 'prologue gives no xp (still Lv1 at pos 1)', { lv: run.level, xp: run.xp, pos: run.pos }); }

  // ---- 3 整趟（出貨 CW、smart＋thoughtful）：每場結束 等級／經驗＝累計經驗照新規則；聲望上限只在 Lv3 起自動 +1 ----
  { let checked = 0, firstUps = 0;
    for (const [sk, rn, ace] of [['i0r1', 2, 'hall'], ['i0r2', 3, 'pearl'], ['i0r3', 4, 'heresy'], ['i0r4', 5, 'hall']]) {
      const run = EN.newRun(CW, { seedKey: sk, runNo: rn, ace, prologue: false }), R = lcg(EN.fnv1a32(sk)), mem = {};
      let xpTot = 0;
      for (let g = 0; g < 3000; g++) {
        if (run.over) break;
        if (EN.canBargainPick(run) && !run.duel && !run.pending) { EN.choose(run, CW, EN.bargainPolicy(run, CW)); continue; }
        const st = EN.nextStep(run);
        if (['reward', 'retry', 'level', 'stall', 'draft'].includes(st)) { EN.choose(run, CW, EN.runPolicy(run, CW)); continue; }
        if (!st || run.pos > 30) break;
        if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, CW, 'smart')) EN.choose(run, CW, ch);
        const b = { level: run.level, maxHp: run.maxHp, pos: run.pos, cls: EN.classAt(run.pos) }, f = EN.startFight(run, CW, {});
        let k = 0; while (!f.duel.over && k++ < 40) EN.resolveTurn(f.duel, EN.policies.thoughtful(f.duel, R, mem, CW));
        const res = EN.finishFight(run, CW);
        if (!res.win) continue;
        xpTot += TW.xp[b.cls];
        let L = 1, x = xpTot; while (x >= EN.xpNeed(TW, L)) { x -= EN.xpNeed(TW, L); L++; }
        ok(run.level === L && run.xp === x && res.levelUps === L - b.level, 'CW run: level／xp = cumulative ' + sk + '@' + b.pos, { level: run.level, xp: run.xp, L, x });
        if (b.level === 1) { firstUps++; ok(b.pos === 1 && L === 2, 'CW run: first level-up on beating pos 1 ' + sk); }
        checked++;
      }
    }
    ok(checked > 40 && firstUps === 4, 'CW runs checked', { checked, firstUps }); }

  // ---- 4 中繼點選秀：Lv1→2 那次照 firstHp；期望等級逐位累計 ----
  { const run = newW('i0cp', { from: 10 }); ok(run.pending.type === 'draft' && run.pending.m === 4, 'from 10: 4 level picks');
    const mx0 = run.maxHp; let g = 0, n1 = null;
    while (run.pending && run.pending.type === 'draft' && g++ < 20) {
      const of = run.pending.offer;
      if (of.kind === 'card') { EN.choose(run, CW, { type: 'draft', cardId: of.cards[0] }); continue; }
      const lv = run.level, m = run.maxHp; EN.choose(run, CW, { type: 'draft', pick: 'atk' });
      if (lv === 1) n1 = run.maxHp - m; else ok(run.maxHp - m === TW.levelHp, 'draft Lv' + lv + '→' + (lv + 1) + ': +levelHp');
    }
    ok(n1 === TW.firstHp && run.level === 5 && run.maxHp === mx0 + TW.firstHp + 3 * TW.levelHp && run.atk === 4, 'draft from 10: Lv1→2 +firstHp (0), Lv5, 4 atk picks', { n1, lv: run.level, max: run.maxHp }); }
  { const cum = (N, T) => { let L = 1, x = 0; for (let p = 1; p <= N; p++) { x += T.xp[EN.classAt(p)]; while (x >= EN.xpNeed(T, L)) { x -= EN.xpNeed(T, L); L++; } } return L + x / EN.xpNeed(T, L); };
    for (const N of [1, 5, 10, 17, 30, 50, 100]) { ok(Math.abs(EN.expLevel(N, CW) - cum(N, TW)) < 1e-9, 'expLevel(N, content) = cumulative gainXp at ' + N); ok(Math.abs(EN.expLevel(N, C) - EN.expLevel(N)) < 0.25, 'firstNeed 0: close to the closed form at ' + N); }
    eq(EN.expLevel(10, CW), 5.75, 'expLevel(10): 26 xp → Lv5 + 6/8');
    ok(EN.expLevel(10, CW) - EN.expLevel(10, C) > 0.2 && EN.expLevel(100, CW) - EN.expLevel(100, C) < 0.1, 'first level needs 2 less: about +0.1–0.25 level (measurement only)');
    eq(EN.draftPlan(CW, 30), { k: 4, m: 8 }, 'draftPlan keeps the closed form (cumulative would give m 9 at 30: C1 +3.7)'); }

  // ---- 5 樂歷曲線 ----
  { const K = C0, xpAt = lv => EN.careerXpAt(K, lv);
    eq([2, 3, 4, 5, 6, 7, 8].map(lv => xpAt(lv) - xpAt(lv - 1)), [100, 150, 250, 350, 500, 650, 800], 'curve: 100／150／250／350／500／650／800');
    ok(xpAt(8) === 2800 && EN.careerPoints(K, { xp: 2800, spent: {} }).total === 7 && EN.talentOpen(K, 'atk', EN.careerLevel(K, 2800).level) && !EN.talentOpen(K, 'atk', EN.careerLevel(K, 2799).level),
      'Lv8 (power talents) still at 2,800 xp with 7 points');
    eq([600, 1000, 2000].map(x => EN.careerLevel(K, x).level), [4, 5, 7], 'old accounts: 600 → Lv4, 1,000 → Lv5, 2,000 → Lv7 (§7.5)');
    eq(EN.careerCfg(K).curve, EN.CAREER.curve, 'content curve = engine CAREER'); }

  // ---- 6 第一趟保底（careerGain o.first）＋lowMul 覆寫 ----
  { const K = C0, G = (sum, o) => EN.careerGain(K, sum, o), floor = EN.careerXpAt(K, EN.careerCfg(K).lexp.firstLv);
    eq(floor, 100, 'firstLv 2 → floor 100');
    const a = G({ reached: 1, bestStreak: 0, lexp: {} }, { best: 0, first: true }); eq([a.base, a.low, a.total, a.first], [15, 2, 100, 70], 'first run lost at pos 1: 15×2＝30 → floor 100 (first +70)');
    const a0 = G({ reached: 1, bestStreak: 0, lexp: {} }, { best: 0 }); eq([a0.total, a0.first], [30, 0], 'not first: no floor');
    const b = G({ reached: 12, bestStreak: 5, lexp: {} }, { best: 0, first: true }); eq([b.total, b.first], [220, 0], 'first run above the floor: unchanged');
    const q = G({ reached: 1, bestStreak: 0, lexp: {} }, { best: 0, first: true, quit: true, open: true }); eq([q.total, q.first], [100, 100], 'first run abandoned before fighting: still floor (once per account)');
    const t = G({ reached: 2, bestStreak: 1, lexp: {} }, { best: 0, first: true, tier: 2 }); eq([t.total, t.first], [100, 100 - Math.round(38 * 1.2 * 2)], 'tier × subsidy first, then the floor');
    ok(EN.careerLevel(K, a.total).level >= 2 && EN.careerLevel(K, q.total).level >= 2, 'first run always reaches Lv2 (GI1)');
    const off = EN.careerGain(Object.assign({}, K, { career: { lexp: { firstLv: 0 } } }), { reached: 1, bestStreak: 0, lexp: {} }, { first: true }); eq([off.total, off.first], [30, 0], 'firstLv 0 = no floor');
    const lm = G({ reached: 9, bestStreak: 5, lexp: {} }, { best: 0, lowMul: 1 }); eq([lm.low, lm.total], [1, 175], 'lowMul 1 overrides the subsidy (display)');
    eq(G({ reached: 9, bestStreak: 5, lexp: {} }, { best: 0 }).total, 350, 'without lowMul: ×2 as before'); }

  // ---- 7 一趟裡的細條（careerLive）：只會越來越多、＝careerGain(lowMul 1)、等級照 xp＋n ----
  { const run = EN.newRun(CW, { seedKey: 'i0live', runNo: 1, ace: 'hall', prologue: false }), R = lcg(7), mem = {};
    let prev = -1, mono = true, n6 = null, steps = 0;
    for (let g = 0; g < 3000; g++) {
      if (run.over) break;
      const L = EN.careerLive(CW, run, { best: 0, xp: 0 });
      if (L.n < prev) mono = false; prev = L.n; steps++;
      const want = EN.careerGain(CW, EN.runSummary(run), { best: 0, tier: run.tier, lowMul: 1 }).total;
      if (!ok(L.n === want && L.level === EN.careerLevel(CW, L.n).level && L.from === 1 && L.up === L.level - 1, 'careerLive = careerGain(lowMul 1) & careerLevel(xp + n)', { L, want })) break;
      if (run.pending && run.pending.type === 'stall' && run.pos === 6 && n6 == null) n6 = L;
      if (EN.canBargainPick(run) && !run.duel && !run.pending) { EN.choose(run, CW, EN.bargainPolicy(run, CW)); continue; }
      const st = EN.nextStep(run);
      if (['reward', 'retry', 'level', 'stall', 'draft'].includes(st)) { EN.choose(run, CW, EN.runPolicy(run, CW)); continue; }
      if (!st || run.pos > 25) break;
      if (EN.canShop(run)) for (const ch of EN.shopPolicy(run, CW, 'smart')) EN.choose(run, CW, ch);
      const f = EN.startFight(run, CW, {}); let k = 0; while (!f.duel.over && k++ < 40) EN.resolveTurn(f.duel, EN.policies.thoughtful(f.duel, R, mem, CW));
      EN.finishFight(run, CW);
    }
    ok(mono && steps > 20, 'careerLive.n never goes down during a run', { steps });
    ok(n6 && n6.n >= 90 && n6.level >= 1, 'first stall (pos 6): at least 6 positions counted', n6);
    const L2 = EN.careerLive(CW, run, { best: 0, xp: 2700 }); ok(L2.from === 7 && L2.level === EN.careerLevel(CW, 2700 + L2.n).level, 'careerLive with xp: from = level at xp');
    const r0 = EN.newRun(CW, { seedKey: 'i0live0', runNo: 2, ace: 'hall', prologue: false }); eq(EN.careerLive(CW, r0, {}).n, EN.careerGain(CW, EN.runSummary(r0), { lowMul: 1 }).total, 'careerLive at pos 1 (not fought): same formula');
    const rcp = newW('i0livecp', { from: 20 }); eq(EN.careerLive(CW, rcp, { xp: 0 }).n, 0, 'checkpoint draft: 0'); }

  // ---- 8 曲線改了補抽（careerRecurve；§7.5） ----
  { const K = C0, RC = (xp, drawn) => EN.careerRecurve(K, { xp, drawn });
    eq(RC(2000, [2, 3, 4, 5, 6]), { from: 6, to: 7, missing: [7] }, '2,000 xp: old Lv6 → Lv7, draw Lv7');
    eq(RC(850, [2, 3, 4]), { from: 4, to: 5, missing: [5] }, '850: old Lv4 → Lv5');
    eq(RC(850, [2, 3, 4, 5]), { from: 4, to: 5, missing: [] }, 'already drawn (new account on the new curve): nothing');
    eq(RC(600, [2, 3, 4]), { from: 4, to: 4, missing: [] }, '600: Lv4 both');
    eq(RC(0, []), { from: 1, to: 1, missing: [] }, 'new account: nothing');
    eq(EN.careerRecurve(K, null), { from: 1, to: 1, missing: [] }, 'no career: nothing');
    let ok1 = true; for (let x = 0; x <= 20000; x += 25) { const r = RC(x, []); if (!(r.from <= r.to && r.to - r.from <= 1)) ok1 = false; } ok(ok1, 'recurve: at most one level higher, never lower');
    const KO = Object.assign({}, K, { career: Object.assign({}, K.career, { curve: Object.assign({}, K.career.curve, { table: [] }) }) });
    eq(EN.careerRecurve(KO, { xp: 2000, drawn: [2, 3, 4, 5, 6] }), { from: 6, to: 6, missing: [] }, 'no table: nothing to make up');
    // 補抽之後再跑一次＝沒有（不用旗標）
    const c = { key: 'k', xp: 2000, drawn: [2, 3, 4, 5, 6] }, m = EN.careerRecurve(K, c).missing; c.drawn = c.drawn.concat(m); eq(EN.careerRecurve(K, c).missing, [], 'after drawing: idempotent');
    // careerFix：新曲線點數只多不少 → 點過的不會被退回
    const cf = EN.careerFix(K, { key: 'k', xp: 2000, spent: { money: 3, pay: 3 }, drawn: [2, 3, 4, 5, 6] }); eq([cf.spent, EN.careerPoints(K, cf).left], [{ money: 3, pay: 3 }, 0], 'careerFix keeps spent (Lv7 = 6 points)'); }

  // ---- 9 G1′：Lv8 以前 newRun 收到的 等於沒給（品味／底氣／聲望／經驗倍率／說情／稀有率／種子格／配件三選一／金邊；錢類只動錢）；階梯 Lv3–7 沒有戰力鍵 ----
  { const K = C0, sp = { atk: 3, def: 2, hp: 2, xp: 2, plea: 1, rare: 3, money: 3, pay: 3 }, o = { seedKey: 'g1p', runNo: 2, ace: 'pearl', prologue: false };
    const r0 = EN.newRun(K, o);
    for (let lv = 1; lv <= 7; lv++) {
      const args = EN.talentArgs(K, { key: 'k', xp: EN.careerXpAt(K, lv), spent: sp });
      ok(!('seedMax' in args) && !('relicPick' in args) && !('goldAdd' in args) && Object.keys(args.talent || {}).every(k => k === 'money' || k === 'pay'), 'G1′ Lv' + lv + ': only money talents', args);
      const r = EN.newRun(K, Object.assign({}, o, args));
      ok(r.atk === r0.atk && r.def === r0.def && r.maxHp === r0.maxHp && r.hp === r0.hp && !r.xpMul && !r.plea && !r.goldAdd && !r.relicPick && JSON.stringify(r.bag) === JSON.stringify(r0.bag), 'G1′ Lv' + lv + ': run stats = no args');
    }
    const POWERK = ['talent', 'seedMax', 'relicPick', 'goldAdd', 'atk', 'def', 'hp', 'xp', 'xpMul'];
    ok(EN.careerCfg(K).ladder.filter(L => L && !L.soon && L.lv >= 3 && L.lv <= 7).every(L => !POWERK.some(k => k in L)), 'G1′: ladder Lv3–7 gives no power keys');
    ok(EN.careerCfg(K).ladder.filter(L => L && !L.soon && L.lv >= 3 && L.lv <= 7).length === 0, 'I-0: no new ladder cells for Lv3–7 yet (each ships with its own baton; SPEC-I §7.3 d)'); }
});

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { console.log(fails.join('\n')); process.exit(1); }
