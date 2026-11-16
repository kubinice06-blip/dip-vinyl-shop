// game-lab/test/engine.test.mjs — v4 engine unit / property tests (SPEC-v4 §5.1 A1 列 #1–#14)＋無限試煉（v5 SPEC 無限試煉 §0–§2：#2 #3 #4 #8 #9 #10 改成整趟、#16 曲線與升級）.  Plain node script:
//   node game-lab/test/engine.test.mjs [--quick]
// Exits 1 on any failure.  Uses the real content.js (cards.js, bins.js).
//   第一波：A3 還沒烘 v4 的新卡（cards.js 沒有的卡）時，用下面 STUB 表的星數補一張只有星數的假卡（只在測試裡）；
//   烘好之後 STUB 用不到，#14 會順便比對 STUB 跟真卡的星數一致。
//   箱子（FIXLIST 4／5／8＋X／Y 契約）：bins.js 還不是契約形狀（沒有 feature 那一區；Y 還沒交）時，用 contractBins() 做一份契約形狀的假箱子
//   （十個分類＋三個子曲風區 citypop／indierock／indiepop＋new＋picks＋feature；真卡照第一個曲風／台灣分區，不夠的補 fx-* 假卡），#8 #15 照契約驗上貨。
//   v5 店面改版（店主 11-13）：POP 改 CITY POP、門口長櫃拆 INDIE ROCK／INDIE POP；這三區看子曲風（卡的 subs，規則 sub），不看第一個曲風。
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { shapeProblems, binsProblems, apexProblems } from '../tools/check-content.mjs';
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
function section(name, fn) { const f0 = fail; const t0 = Date.now(); try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name + ' (' + (Date.now() - t0) + ' ms)'); }

// ---------------- test content（STUB 星數＝SPEC-v4 §4.1–§4.3 的表；already／skip 各 2 張是 A3-M2 換上的新卡） ----------------
const STUB = {
  'limp-bizkit-results-may-vary': [1, 1, 3], 'eminem-the-eminem-show': [5, 1, 2], 'low-double-negative': [5, 3, 4],
  'sophie-oil-of-every-pearl-s-un-insides': [5, 2, 4], 'don-slepian-sea-of-bliss': [3, 4, 2], 'harold-budd-abandoned-cities': [3, 4, 3],
  'demetrio-stratos-metrodora': [3, 5, 4], 'etron-fou-leloublan-les-trois-fou-s-perdegagnent-au-pays-des': [4, 5, 4],
  'nocturnal-emissions-fruiting-body': [4, 5, 4], 'eivind-aarset-electronique-noire': [4, 5, 3], 'yezda-urfa-boris': [4, 5, 3], 'roberto-goyeneche-cantor-de-mi-barrio': [3, 4, 2],
  'amalia-rodrigues-gostava-de-ser-quem-era': [4, 5, 2], 'king-sunny-ade-aura': [3, 4, 2],
  'washington-phillips-the-key-to-the-kingdom': [4, 5, 4], 'otha-turner-the-rising-star-fife-drum-band-everybody-holleri': [4, 5, 3],
  '血肉果汁機-flesh-juicer-golden太子bro': [3, 3, 4], '血肉果汁機-flesh-juicer-深海童話': [3, 3, 4], '閃靈-失竊千年': [3, 3, 4], '血肉果汁機-flesh-juicer-血肉宮建宮蓋廟演唱會': [2, 3, 4],
  '閃靈-永劫輪迴': [4, 3, 4], '閃靈-醒靈寺大決戰': [3, 4, 4], '林強-驚蟄': [4, 4, 3], 'venetian-snares-making-orange-things': [4, 4, 5],
  'nurse-with-wound-homotopy-to-marie': [4, 4, 5], 'ryoji-ikeda-mort-aux-vaches': [3, 4, 5], 'harry-roesli-gang-philosophy-gang': [5, 5, 3],
  'c-o-b-moyshe-mcstiff-and-the-tartan-lancers-of-the-sacred-he': [4, 5, 3], 'pholas-dactylus-concerto-delle-menti': [4, 5, 4],
  'the-plastic-people-of-the-universe-egon-bondy-s-happy-hearts': [5, 4, 4], 'ganelin-trio-ancora-da-capo': [5, 4, 4],
  'luis-russell-the-luis-russell-story-1929-1934': [4, 5, 4], 'raw-material-time-is': [4, 5, 3], 'alexander-von-schlippenbach-globe-unity': [5, 4, 5],
  '裸のラリーズ-the-oz-tapes': [4, 4, 5], 'beverly-glenn-copeland-keyboard-fantasies': [5, 4, 2], 'charles-brackeen-rhythm-x': [4, 5, 4],
  'magma-mekanik-destruktiw-kommandoh': [5, 4, 4], 'blur-the-great-escape': [3, 2, 1], 'oasis-dig-out-your-soul': [3, 1, 1],
  'the-velvet-underground-squeeze': [2, 3, 1], 'stevie-wonder-eivets-rednow': [2, 3, 1], 'the-kinks-preservation-act-1': [2, 3, 1],
  'metallica-reload': [2, 1, 3], 'weezer-van-weezer': [2, 2, 3], 'ramones-halfway-to-sanity': [2, 2, 3],
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
const C = Object.assign({}, C0, { cards: CARDS, bins: BINS });

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
const mercyOfT = st => { const P = st.p, E = st.e, pR = Math.max(0, P.hp) / (P.max || 1), eR = Math.max(0, E.hp) / (E.max || 1); let m = Math.max(0, eR - pR) * 1.3; if (P.hp <= 3) m += 0.35; return Math.min(1, m); };
const idsAt = pos => { const c = EN.classAt(pos); return c === 'boss' ? [C.boss] : c === 'elite' ? C.elites : C.normals; };
section('2 誠實度：無限試煉每一位 q＝舊版虛晃率（mercy 關 ±0.01）；放水：照實率＝Σ qNow（±0.01）；直接開打照 C.honesty；ace／script／headphone 100% 照實；唬人出 BEATS[提示]；王牌不變式', () => {
  const POS = QUICK ? [1, 4, 6, 13] : [1, 2, 3, 4, 5, 6, 8, 10, 12, 13, 20];
  const target = QUICK ? 12000 : 30000;
  const whyN = {};
  // (a) mercy 關：照實比例＝trialGuest(pos).q＝oldQ(pos)
  try {
    CFG.mercy = false;
    for (const pos of POS) {
      const ids = idsAt(pos), q = oldQ(pos);
      ok(Math.abs(EN.trialGuest(C, pos, EN.classAt(pos)).q - q) < 1e-9, 'trialGuest q = oldQ at ' + pos);
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
          if (pl.why === 'bluff') { if (pl.attr !== BEATS[pl.hint.attr] || pl.bluff !== true || eCard.tier) ok(false, 'bluff plays BEATS[hint] and never the ace', pl); else pass++; }
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
  // (b) 放水（mercy 開）：這手的 qNow＝1−(1−q)(1−0.8·mercy)（只有 normal／hard）；照實手數＝Σ qNow（±0.01）；你落後時他確實少唬
  for (const pos of POS.filter(p => p >= 3)) {
    const ids = idsAt(pos), q = oldQ(pos);
    let hands = 0, honest = 0, sumQ = 0, behind = 0;
    for (let s = 1; hands < target / 2; s++) {
      const { duel } = startFor(ids[s % ids.length], TIERS[s % 3], s * 41 + 3 + pos, { pos, hp: 4 + (s % 9), maxHp: 12 });
      const R = lcg(s * 7 + 5);
      while (!duel.over) {
        const pl = duel.plan, v = EN.view(duel), m = mercyOfT(duel), want = 1 - (1 - q) * (1 - C.trial.curve.mercyFeint * m);
        if (Math.abs(v.honesty.qNow - want) > 1e-9) ok(false, 'view.honesty.qNow = 1−(1−q)(1−0.8·mercy)', { qNow: v.honesty.qNow, want, m }); else pass++;
        if (pl.why === 'honest' || pl.why === 'bluff') { hands++; sumQ += want; if (pl.why === 'honest') honest++; if (m > 0) behind++; }
        EN.resolveTurn(duel, EN.policies.random(duel, R));
      }
    }
    ok(Math.abs(honest - sumQ) / hands <= 0.01, 'honest rate (mercy on) at pos ' + pos + ' = mean qNow ± 0.01', { f: (honest / hands).toFixed(4), qNow: (sumQ / hands).toFixed(4) });
    ok(q === 1 || (sumQ / hands > q + 0.01 && behind > hands / 4), 'mercy on: he bluffs less when you are behind (pos ' + pos + ')', { qNow: (sumQ / hands).toFixed(4), q, behind, hands });
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

section('8 newRun：500 種子 × 3 王牌（第 1 輪來客、這一輪的貨〔契約：每區 4–6、FEATURE 2–3 史詩／傳奇、全店不重複〕、特價箱、包包、時機、v5 欄位）', () => {
  const seeds = QUICK ? 100 : 500;
  const seenBargain = { c: new Set(), o: new Set(), h: new Set() };
  const shopKeys = Object.keys(C.bins).filter(k => !C.bins[k].display);
  const seenStock = {}; for (const k of shopKeys) seenStock[k] = new Set();
  for (let s = 1; s <= seeds; s++) for (const ace of TIERS) {
    const night = 1 + (s % 3);
    const run = EN.newRun(C, s % 2 ? { seedKey: 'nr-' + s, runNo: night, ace } : { seedKey: 'nr-' + s, nightNo: night, ace });   // nightNo＝舊名照收
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
      const lo = feat ? 2 : 4, hi = feat ? 3 : 6;
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
    const ch = EN.bargainPolicy(run, C), r = EN.choose(run, C, ch);
    ok(r.ok && run.bag.length === 7 && run.shop.bargain.length === 3 && run.shop.bargainPicked && run.taken === 7, 'bargainPick → bag 7, 3 left, 收了 7', r.error);
    ok(EN.canShop(run) === (night !== 1), 'can shop after the pick (prologue night: after the prologue)');
    ok(!EN.canBargainPick(run), 'pick only once');
    if (night === 1) { run.prologue = 'done'; ok(EN.canShop(run), 'prologue done → can shop'); }
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
          ok(offer.length === 3 && ['atk', 'def'].includes(offer[0].pick) && sameSet(offer.map(x => x.pick), ['atk', 'def', 'hp']) && offer.every(x => x.n === T.picks[x.pick]), 'level offer: 3, first is 品味 or 底氣', offer);
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
          let L = 1, x = xpTot; while (x >= L + T.levelNeed) { x -= L + T.levelNeed; L++; }
          ok(run.level === L && run.xp === x, 'level／xp = cumulative XP (' + xpTot + ')', { level: run.level, xp: run.xp, L, x });
          const ups = L - b.level, healed = Math.min(b.maxHp, Math.max(1, pEnd) + T.heal);
          ok(res.levelUps === ups && run.maxHp === b.maxHp + ups * T.levelHp && run.hp === healed + ups * T.levelHp, '回 3（不超過上限）＋每升一級 上限／聲望 +1', { hp: run.hp, healed, ups });
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
    r2.xp = 3;                                                          // 第 1 位一般 +2 → 5 ≥ 1＋3：升 Lv 2
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
      eq(Object.keys(v.hint).sort(), ['attr', 'line'], 'hint = {attr, line}');
      ok(v.hint.attr === duel.plan.hint.attr && v.hint.line === duel.plan.hint.line, 'hint is the plan hint');
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
  eq(Object.keys(v.honesty).sort(), ['key', 'q', 'qNow'], 'view.honesty = {key, q, qNow}（qNow：放水後的這手，策略用；畫面不寫）');
  ok(v.eTitle === null && v.eName === '地下廠牌主理人', 'view: name only, no title', { n: v.eName, t: v.eTitle });
});

// 無限試煉 V3 曲線（../curve/curves.cjs atkV3f／defV3f／oldQ／oldDiff；SPEC §0）——測試自己寫一份，對 engine 的預設（TRIAL）與 content 的旋鈕
const lateT = d => Math.max(0, d - 3);
const V3 = {
  atk: (d, boss) => Math.min(2, Math.round(0.75 * lateT(d))) + Math.floor(Math.max(0, d - 6) / 5) + (boss ? 1 : 0),
  def: (d, boss) => Math.min(1, Math.round(0.45 * lateT(d))) + (boss ? 1 : 0),
  planner: d => (d < 3 ? 'easy' : d < 5 ? 'normal' : 'hard'),
  q: d => (d < 3 ? 1 : d < 5 ? 0.85 : 1 - Math.min(0.55, 0.18 + 0.05 * Math.max(0, d - 5))),
  floor: d => Math.min(13, 3 + Math.floor(0.7 * d)), buff: d => Math.floor(Math.max(0, d - 3) / 3), aceP: d => (d >= 5 ? Math.min(0.6, 0.15 * (d - 4)) : 0),
};
const levelAtT = (d, XP, need) => { let xp = 0; for (let k = 1; k < d; k++) xp += XP[EN.classAt(k)]; let L = 1; while (xp >= L + need) { xp -= L + need; L++; } return { L, xp }; };
const forceWin = (run) => { const f = EN.startFight(run, C, {}); let g = 0; while (!f.duel.over && g++ < 12) EN.resolveTurn(f.duel, EN.legalActions(f.duel)[0], { debugOutcome: { kind: 'counter', toE: 99, toP: 0 } }); return EN.finishFight(run, C); };
const settleAll = run => { let g = 0; while (run.pending && g++ < 40) { const ch = EN.runPolicy(run, C); if (!EN.choose(run, C, ch).ok) break; } };

section('16 無限試煉：V3 曲線（攻／底氣／難度／q／聲望）、難度階梯覆寫、trialDeck（下限、加星上限 5、王牌機率）、品味／底氣傷害、經驗與升級、中繼點、來客那排、結算', () => {
  // (a) 位數 → 類別、輪；engine 預設＝V3（逐位 1–300）；驗算值（map-engine §E）；content 的旋鈕現在＝V3（店主 11/12；改難度時這條跟著改）
  eq([1, 2, 3, 4, 5, 6, 10, 11, 25].map(EN.classAt), ['normal', 'normal', 'normal', 'elite', 'boss', 'normal', 'boss', 'normal', 'boss'], 'classAt');
  eq([1, 5, 6, 10, 11, 100].map(EN.roundOf), [1, 1, 2, 2, 3, 20], 'roundOf');
  const NOC = Object.assign({}, C, { trial: undefined });
  let bad = 0;
  for (let d = 1; d <= 300; d++) for (const cls of ['normal', 'elite', 'boss']) {
    const g = EN.trialGuest(NOC, d, cls), b = cls === 'boss';
    const want = { hp: b ? 14 : 12, atk: V3.atk(d, b), def: V3.def(d, b), planner: V3.planner(d), q: Math.round(V3.q(d) * 1e6) / 1e6 };
    if (JSON.stringify(g) !== JSON.stringify(want)) { if (bad++ < 5) ok(false, 'engine default = V3 at ' + d + ' ' + cls, { g, want }); } else pass++;
    if (JSON.stringify(EN.trialGuest(C, d, cls)) !== JSON.stringify(g)) { if (bad++ < 5) ok(false, 'content.trial.curve = V3 at ' + d + ' ' + cls); } else pass++;
  }
  const G = (d, c) => EN.trialGuest(C, d, c || EN.classAt(d));
  ok(G(4).atk === 1 && G(4).def === 0 && G(5).atk === 3 && G(5).def === 2 && G(5).q === 0.82 && G(6).atk === 2 && G(6).def === 1 && G(11).atk === 3 && G(20).atk === 5 && G(12).q === 0.47 && G(13).q === 0.45 && G(60).q === 0.45,
    'V3 驗算值：第 4 位攻 1、第 5 位藏家攻 3 底 2 q .82、第 6 位攻 2 底 1、第 11 位攻 3、第 20 位藏家攻 5、第 12 位 q .47、第 13 位起 .45');
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
      const w = levelAtT(d, C.trial.xp, C.trial.levelNeed);
      ok(run.pos === d && run.level === w.L && run.xp === w.xp, 'level at pos ' + d + ' = harness levelAt', { pos: run.pos, level: run.level, xp: run.xp, w });
      ok(run.maxHp === C.trial.youHp + (run.level - 1) * C.trial.levelHp + hpPicks * C.trial.picks.hp, '上限 = 12 + (Lv−1) + 2×選聲望上限');
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
  // (b) 不能賣回：buy／buyBargain 賣種子 → seedNoSell，run 不動；送的照舊 giftNoSell；拿獎勵包包滿可以拿掉種子（拿掉就不是種子）
  { const sd = [free[3], free[11], free[19]];
    const run = EN.newRun(C, { seedKey: 'sell', runNo: 2, ace: 'pearl', seeds: sd });
    EN.choose(run, C, EN.bargainPolicy(run, C)); run.money = 99999;
    ok(sd.every(id => EN.isSeed(run, C, id)) && !EN.isSeed(run, C, G.pearl[0]) && !EN.isSeed(null, C, sd[0]) && EN.isSeed(run, C, card(sd[0])), 'isSeed');
    ok(EN.isGift(run, C, G.pearl[0]) && !EN.isGift(run, C, G.pearl[1]), 'isGift = gifts actually placed (+ ace)');
    const key = Object.keys(run.shop.bins).find(k => run.shop.bins[k].length), cid = run.shop.bins[key][0];
    while (run.bag.length < 8) run.bag.push(free.find(id => !run.bag.includes(id) && !Object.values(run.shop.bins).flat().includes(id)));   // 包包 8 張（不限之後照樣：賣種子／送的照擋）
    for (const id of sd) { const before = JSON.stringify(run), r = EN.choose(run, C, { type: 'buy', key, cardId: cid, sellId: id }); ok(!r.ok && r.error === 'seedNoSell' && JSON.stringify(run) === before, 'buy selling a seed → seedNoSell, run untouched', r.error); }
    { const r = EN.choose(run, C, { type: 'buy', key, cardId: cid, sellId: G.pearl[0] }); ok(!r.ok && r.error === 'giftNoSell', 'gift still giftNoSell'); }
    const BL = run.shop.bargain.slice();
    if (BL.length) { const before = JSON.stringify(run), r = EN.choose(run, C, { type: 'buyBargain', ids: [BL[0]], sellIds: [sd[1]] }); ok(!r.ok && r.error === 'seedNoSell' && JSON.stringify(run) === before, 'buyBargain selling a seed → seedNoSell'); }
    const plain = run.bag.find(id => !EN.isSeed(run, C, id) && !EN.isGift(run, C, id));
    { const r = EN.choose(run, C, { type: 'buy', key, cardId: cid, sellId: plain }); ok(r.ok && run.entered.includes(cid) && !run.bag.includes(plain), 'buy selling a normal card works; bought card entered', r.error); }
    for (const pol of ['none', 'smart']) { const r2 = JSON.parse(JSON.stringify(run)); for (const ch of EN.shopPolicy(r2, C, pol)) ok(!sd.includes(ch.sellId), 'shopPolicy never sells a seed'); }
    // 拿獎勵：包包滿，拿掉一張種子
    run.pending = { type: 'reward', enemyId: 'copycat', prologue: false, pos: 1, cls: 'normal', cards: [free[60]], relics: [], need: 'card', cardDone: false, relicDone: true };
    const r = EN.choose(run, C, { type: 'take', cardId: free[60], dropId: sd[0] });
    ok(r.ok && !run.bag.includes(sd[0]) && !run.seeds.includes(sd[0]) && run.seeds.length === 2 && run.entered.includes(free[60]), 'take dropping a seed: allowed, no longer a seed', r.error); }
  // (c) 掉落＝他這一場的實際牌單（trialDeck 換牌、加星後；王牌不掉）；run.drops 記獎勵候選（沒拿的也算）；序章男子那張不算
  { let checked = 0;
    for (let s = 1; s <= (QUICK ? 6 : 20); s++) {
      const run = EN.newRun(C, { seedKey: 'drop-' + s, runNo: 2, ace: TIERS[s % 3] });
      EN.choose(run, C, EN.bargainPolicy(run, C));
      const offered = [];
      for (let g = 0; g < 12 && !run.over; g++) {
        const id = run.order[run.idx], pos = run.pos;
        const td = EN.trialDeck(C, id, pos, { seedKey: run.seedKey, runNo: run.runNo, playerAce: run.ace, bossAce: run.bossAce, tier: run.tier });
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
      // 賣回（買箱子時順便賣）：拿回半價
      const key = Object.keys(r2.shop.bins).find(k => r2.shop.bins[k].length), cid = r2.shop.bins[key][0]; r2.money = 5000; while (r2.bag.length < 8) r2.bag.push(Object.keys(C.cards).find(x => !C.cards[x].tier && !r2.bag.includes(x) && x !== cid && x !== id));
      const m = r2.money, rs = EN.choose(r2, C, { type: 'buy', key, cardId: cid, sellId: id });
      ok(rs.ok && r2.money === m + P / 2 - EN.priceOf(C, cid), 'radio card sells back at half (P/2)', rs); }
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
  for (const bluff of [false, true]) {
    const d = duelWith(ab('reveal'));
    d.plan.bluff = bluff; const rng0 = d.rng;
    const ev = EN.activateApex(d)[0];
    eq([ev.reveal, EN.view(d).apexReveal, d.rng === rng0], [bluff ? 'bluff' : 'honest', bluff ? 'bluff' : 'honest', true], 'reveal: ' + (bluff ? 'bluff' : 'honest'));
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
  for (const op of Object.keys(EN.APEX_OPS)) if (op !== 'reveal') ok(AT.notes[op], 'notes for op ' + op);

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
  // (b) 收第 9、第 20 張不用丟；dropId 可給可不給
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
    untouched(run, { type: 'take', cardId: NONB[40], dropId: 'nope' }, 'badDrop', 'take with a dropId not in the bag');
    untouched(run, { type: 'take', cardId: NONB[40], dropId: NONB[40] }, 'badDrop', 'take dropping the card itself');
    const drop = run.bag[6], r = EN.choose(run, C, { type: 'take', cardId: NONB[40], dropId: drop });
    ok(r.ok && run.bag.length === n && !run.bag.includes(drop) && run.bag.includes(NONB[40]) && r.effects[0].loseCard === drop, 'take with dropId still drops it (optional; no money)', r); }
  // (c) 買唱片／特價箱不用賣；給了照賣；多賣也行（不限時）；賣完不能少於 5 張
  { const run = picked('b21-buy'); run.money = 99999; run.bag = run.bag.concat(NONB.slice(100, 110));
    const key = Object.keys(run.shop.bins).find(k => run.shop.bins[k].length), cid = run.shop.bins[key][0], n = run.bag.length, m = run.money;
    const r = EN.choose(run, C, { type: 'buy', key, cardId: cid });
    ok(r.ok && run.bag.length === n + 1 && run.money === m - EN.priceOf(C, cid) && r.effects.length === 1, 'buy into a ' + n + '-card bag without selling', r);
    const key2 = Object.keys(run.shop.bins).find(k => run.shop.bins[k].length), cid2 = run.shop.bins[key2][0], sell = NONB[100], m2 = run.money;
    const r2 = EN.choose(run, C, { type: 'buy', key: key2, cardId: cid2, sellId: sell });
    ok(r2.ok && !run.bag.includes(sell) && run.bag.length === n + 1 && run.money === m2 + EN.sellValue(C, card(sell)) - EN.priceOf(C, cid2), 'buy with a voluntary sellId: one for one', r2);
    const BL = run.shop.bargain.slice(), n3 = run.bag.length, m3 = run.money;
    const r3 = EN.choose(run, C, { type: 'buyBargain', ids: BL.slice(0, 2) });
    ok(r3.ok && run.bag.length === n3 + 2 && run.money === m3 - EN.bargainPriceOf(C, BL[0]) - EN.bargainPriceOf(C, BL[1]), 'buyBargain 2 into a big bag, no sells', r3);
    const sells = [NONB[101], NONB[102], NONB[103]], n4 = run.bag.length, m4 = run.money;
    untouched(run, { type: 'buyBargain', ids: [BL[2]], sellIds: [NONB[101], NONB[101]] }, 'badSell', 'buyBargain duplicate sells');
    untouched(run, { type: 'buyBargain', ids: [BL[2]], sellIds: [NONB[101], C.gifts.hall[0]] }, 'giftNoSell', 'buyBargain selling a gift');
    const r4 = EN.choose(run, C, { type: 'buyBargain', ids: [BL[2]], sellIds: sells });
    ok(r4.ok && run.bag.length === n4 + 1 - 3 && sells.every(id => !run.bag.includes(id)) && run.money === m4 - EN.bargainPriceOf(C, BL[2]) + sells.reduce((t, id) => t + EN.sellValue(C, card(id)), 0), 'buyBargain 1 with 3 voluntary sells (bag shrinks by 2)', r4);
    // 賣完不能少於 5 張：送的 4 張不能賣，所以只有送的被拿掉過（舊規則 take 的 dropId 可以拿掉送的）才碰得到。2 張送的＋4 張一般＝6 張
    const small = picked('b21-min'); small.money = 99999;
    const SB = small.shop.bargain.slice(), plain = NONB.slice(190, 194);
    small.bag = small.gifts.slice(0, 2).concat(plain);
    untouched(small, { type: 'buyBargain', ids: [SB[0]], sellIds: plain }, 'bagMin', 'buyBargain 1 selling 4 of 6 → 3 left → bagMin');
    untouched(small, { type: 'buyBargain', ids: [SB[0]], sellIds: plain.slice(0, 3) }, 'bagMin', 'buyBargain 1 selling 3 of 6 → 4 left → bagMin');
    ok(EN.choose(small, C, { type: 'buyBargain', ids: [SB[0]], sellIds: plain.slice(0, 2) }).ok && small.bag.length === 5, 'buyBargain 1 selling 2 of 6 → 5 left → ok'); }
  // (d) sell {cardId}：單獨賣回
  { const run = EN.newRun(C, { seedKey: 'b21-sell', runNo: 2, ace: 'pearl', seeds: [NONB[210]] });
    untouched(run, { type: 'sell', cardId: run.bag[0] }, 'notNow', 'sell before the bargain pick');
    EN.choose(run, C, EN.bargainPolicy(run, C));
    run.bag.push(NONB[211], NONB[212]);
    const ret = C.bargain.retired[0]; run.bag.push(ret);
    untouched(run, { type: 'sell', cardId: 'nope' }, 'badSell', 'sell unknown card');
    untouched(run, { type: 'sell', cardId: NONB[213] }, 'badSell', 'sell a card not in the bag');
    untouched(run, { type: 'sell', cardId: C.aces.pearl }, 'badSell', 'sell the ace (not in the bag)');
    untouched(run, { type: 'sell', cardId: run.gifts[0] }, 'giftNoSell', 'sell a gift');
    untouched(run, { type: 'sell', cardId: NONB[210] }, 'seedNoSell', 'sell a seed');
    { const r2 = JSON.parse(JSON.stringify(run)); r2.pending = { type: 'retry', enemyId: 'copycat', free: false }; untouched(r2, { type: 'sell', cardId: NONB[211] }, 'notNow', 'sell while a choice is pending'); }
    const m = run.money, n = run.bag.length, ent = run.entered.slice(), r = EN.choose(run, C, { type: 'sell', cardId: NONB[211] });
    ok(r.ok && run.money === m + EN.sellValue(C, card(NONB[211])) && run.bag.length === n - 1 && run.stats.sold.includes(NONB[211]) && JSON.stringify(run.entered) === JSON.stringify(ent), 'sell: half price, bag −1, stats.sold, entered untouched', r);
    eq(r.effects, [{ loseCard: NONB[211], earn: EN.sellValue(C, card(NONB[211])) }], 'sell effects');
    const m2 = run.money; ok(EN.choose(run, C, { type: 'sell', cardId: ret }).ok && run.money === m2 + Math.floor(EN.bargainPriceOf(C, ret) / 2), 'retired bargain card sells at half its bargain price (no profit for old saves)');
    for (let g = 0; g < 40 && run.bag.filter(id => !EN.isGift(run, C, id) && !EN.isSeed(run, C, id)).length && run.bag.length > CFG.handSize; g++) {
      const x = run.bag.find(id => !EN.isGift(run, C, id) && !EN.isSeed(run, C, id)); ok(EN.choose(run, C, { type: 'sell', cardId: x }).ok, 'sell down', x);
    }
    eq(run.bag.length, CFG.handSize, 'sold down to 5 (hand size)');
    const last = run.bag.find(id => !EN.isGift(run, C, id) && !EN.isSeed(run, C, id));
    if (last) untouched(run, { type: 'sell', cardId: last }, 'bagMin', 'sell the 6th-to-last → bagMin (keep ≥5 for a full hand)'); else pass++; }
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
  // (j) 策略：runPolicy 不給 dropId、只拿會漲的、拿漲最多的；shopPolicy 不賣（買的時候）；thinPolicy 只賣排不進前 5 的、不賣送的／種子、剩 5 張停
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
    let sold = 0, shops = 0;
    for (let s = 0; s < 40; s++) {
      const run = picked('b21-shop-' + s, TIERS[s % 3], { seeds: s % 2 ? [NONB[250 + s]] : [] }); run.money = 50000;
      run.bag = run.bag.concat(NONB.filter((id, k) => (k * 11 + s) % 23 === 0 && !run.bag.includes(id)).slice(0, 10));
      const chs = EN.shopPolicy(run, C, 'smart'); shops++;
      for (const ch of chs) {
        if (ch.type === 'buy' || ch.type === 'buyBargain') ok(ch.sellId == null && ch.sellIds == null, 'shopPolicy buys without selling when unlimited', ch);
        if (ch.type === 'sell') { sold++; ok(!EN.isGift(run, C, ch.cardId) && !EN.isSeed(run, C, ch.cardId), 'thin never sells gifts／seeds', ch); }
        const b = run.bag.slice(), r = EN.choose(run, C, ch); ok(r.ok, 'shopPolicy choice ok', { ch, err: r.error });
        if (ch.type === 'sell') { const c = card(ch.cardId); ok(ATTRS.every(a => b.filter(x => x !== ch.cardId && card(x)[a] >= c[a]).length >= CFG.handSize), 'thin sells only dead weight (≥5 others ≥ it on every axis)', ch); }
      }
      ok(run.bag.length >= CFG.handSize, 'bag ≥ 5 after the shop');
      const r2 = picked('b21-shop-' + s, TIERS[s % 3]); r2.money = 50000; r2.bag = run.bag.slice();
      ok(!EN.shopPolicy(r2, C, 'smart', { thin: false }).some(ch => ch.type === 'sell'), 'shopPolicy {thin:false} never sells');
    }
    ok(sold > 0, 'thinPolicy sold something across 40 shops', sold);
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

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { console.log(fails.join('\n')); process.exit(1); }
