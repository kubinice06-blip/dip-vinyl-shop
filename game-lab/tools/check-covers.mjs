// check-covers.mjs：店裡看得到的封面＝那一區的貨、整家店不重複（SPEC-v4 §5.1、§2.2.1、§2.3.5；D §6；FIXLIST 4／5／8 與 X／Y 契約）。A3 → Y。
//
//   node game-lab/tools/check-covers.mjs          # 有問題 exit 1；--quiet 只印結論；--json 印明細
//
// 分區（FIXLIST 4／5，X／Y 契約）：十大類（genre-tree.json 頂層：rock jazz electronic→elec soul hiphop classical folk pop world blues）＋台灣 tw（地區優先）
//   ＋新進 new（不限分類）＋門口牆 feature（店長推薦精選：史詩＋傳奇）／picks（店長推薦：不限分類）＋特價箱 sale（C.bargain）。
//   v5 店面改版（店主 11-13）：pop 那一區改 citypop（CITY POP 城市流行）、門口長櫃拆 indierock（INDIE ROCK）／indiepop（INDIE POP），三區用子曲風規則 sub；
//   blues 搬到窗下矮櫃（winbin）。
// 查：
//   1. 每個看得到的封面（箱子 front、有 bin 的牆架 cards、section 道具：高櫃 cards、試聽桌 stack）都在 cards.js、整家店不重複；
//   2. 每個看得到的封面符合它那一區的 rule、在那一區的 pool；counter.now 除外；
//   3. bins.js 每一區：key／label／zh＝deck-lists _bins、pool 每張符合 rule、front＝店裡那一區看得到的封面（照道具順序）、front ⊂ pool、
//      pool 夠大（每晚 4–6 張＋看得到的；feature 2–3 張＋看得到的）；店裡每個 bin.key 都有 bins.js 那一區、bins.js 每一區店裡都有；
//   4. 各區 pool 兩兩不交集，也不跟牌組／禮物／特價箱／王牌／掉牌交集（deck-lists.json；content.js 是 v4 時也比 C.enemies／gifts／bargain／aces）；
//   5. 名牌：道具上畫的英文（中島 tabs[0]、木箱／矮櫃 label、牆架 plate）＝bins.js label；bin.label（點了掛的字）＝zh；dip.json 不准有 lean 鍵；
//   6. 宇多田ヒカル《First Love》在店長推薦（picks）的卡池、不在搖滾（rock／indierock）（D §6 點名：不准出現在搖滾；v5 店面改版 POP 改 CITY POP 之後從 POP 移到 picks）。
// rule（bake-cards.mjs 直接 import 這裡的 ruleMisses，同一份）：cat（契約的分類：地區 tw → tw，否則第一個曲風標籤對到十大類）、rarity（稀有度清單）、
//   first（genres[0] 要在裡面）、regions、minYear、minTop:{attr,star}、notGenres、ost:true、sub（子曲風路徑清單：卡的 subs 有一項等於其中一項或在它底下；
//   v5 店面改版的 INDIE ROCK／INDIE POP／CITY POP 用）。
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const require = createRequire(import.meta.url);

export const OST_RE = /(original (motion picture )?(soundtrack|score))|soundtrack from|music from the (motion picture|film|original|soundtrack)|サウンドトラック|原聲帶|原聲專輯/i;
// 十大類（genre-tree.json 頂層 id → 箱子 key；electronic 的箱子叫 elec）
export const GENRE_CAT = { rock: 'rock', jazz: 'jazz', electronic: 'elec', soul: 'soul', hiphop: 'hiphop', classical: 'classical', folk: 'folk', pop: 'pop', world: 'world', blues: 'blues' };
// 卡的分類（契約）：地區台灣 → tw（地區優先）；否則第一個曲風標籤對到十大類；對不到回 null
export function catOf(c) { if (c.region === 'tw') return 'tw'; return GENRE_CAT[(c.genres || [])[0]] || null; }
// 稀有度（CARD_GAME_DESIGN §5）：score＝經典＋硬蕊＋(冷門＝5 ? 1 : 0)；≤5 普通、6 稀有、7 獨特、8 史詩、≥9 傳奇；有 tier（殿堂／流亡／異端）＝頂點
export const RARITIES = ['common', 'rare', 'uncommon', 'epic', 'legendary', 'apex'];
export const RARITY_ZH = { common: '普通', rare: '稀有', uncommon: '獨特', epic: '史詩', legendary: '傳奇', apex: '頂點' };
export function rarityScore(c) { return (c.c | 0) + (c.h | 0) + (c.o === 5 ? 1 : 0); }
export function rarityOf(c) { if (c.tier) return 'apex'; const s = rarityScore(c); return s <= 5 ? 'common' : s === 6 ? 'rare' : s === 7 ? 'uncommon' : s === 8 ? 'epic' : 'legendary'; }
// 子曲風（v5 店面改版）：卡的 subs（card-subgenres.json 的路徑，bake 烘進 cards.js）有一項＝rule.sub 的某一項、或是它底下的子路徑
export function subMatch(want, subs) { return (subs || []).some(s => want.some(w => s === w || s.startsWith(w + '/'))); }
export function ruleMisses(rule, c, ostIds) {
  const why = [];
  if (!rule) return ['no-rule'];
  if (rule.cat && catOf(c) !== rule.cat) why.push('cat=' + catOf(c));
  if (rule.rarity && !rule.rarity.includes(rarityOf(c))) why.push('rarity=' + rarityOf(c));
  if (rule.first && !rule.first.includes((c.genres || [])[0])) why.push('first=' + (c.genres || [])[0]);
  if (rule.regions && !rule.regions.includes(c.region)) why.push('region=' + c.region);
  if (rule.minYear != null && !(c.year >= rule.minYear)) why.push('year=' + c.year);
  if (rule.minTop) { const v = c[rule.minTop.attr]; if (!(v >= rule.minTop.star && v === Math.max(c.c, c.o, c.h))) why.push('minTop ' + rule.minTop.attr + '=' + v); }
  if (rule.notGenres && (c.genres || []).some(g => rule.notGenres.includes(g))) why.push('notGenres');
  if (rule.ost && !(OST_RE.test(c.album || '') || (ostIds || []).includes(c.id))) why.push('not-ost');
  if (rule.sub && !subMatch(rule.sub, c.subs)) why.push('sub');
  return why;
}
// 特價箱（§4.3）：峰值 ≤3、冷門 ≤3
export function bargainMisses(c) { const why = []; if (Math.max(c.c, c.o, c.h) > 3) why.push('peak>3'); if (c.o > 3) why.push('o>3'); return why; }
// 每晚上貨（契約）：各區 4–6 張、feature 2–3 張 → pool 至少要「看得到的＋每晚最多」
export const STOCK_MAX = { feature: 3 }, STOCK_MAX_DEFAULT = 6;
const NOT_EXCLUSIVE = new Set(['gold', 'listen', 'stake']);   // v3 唱片櫃／試聽機用的組，可以跟箱子重疊（bake-cards 同一張表）
// 道具上畫的名牌英文：中島 tabs[0]、木箱／矮櫃 label、牆架 plate（沒有就 null）
export function plateOf(o) { if (o.type === 'ledge') return o.plate || null; if (o.tabs && o.tabs[0]) return o.tabs[0]; return o.label || null; }

// 看得到的封面：[{ id, prop, slot, section }]；section＝那一區的 key（'jazz'…'picks'、'sale'）｜'now'｜null（沒標區）
//   有 bin 的箱子＝front；有 bin 的牆架＝cards；沒有 bin、有 section 的道具（高櫃 cards、試聽桌 stack）＝section；櫃檯 now＝'now'
export function visibleCovers(L) {
  const out = [];
  for (const o of L.props || []) {
    if (o.hidden) continue;
    const sec = o.bin && o.bin.key ? o.bin.key : (o.section || null);
    if (Array.isArray(o.front)) o.front.forEach((id, i) => out.push({ id, prop: o.id, slot: 'front[' + i + ']', section: sec }));
    if ((o.type === 'ledge' || o.type === 'shelving') && Array.isArray(o.cards)) o.cards.forEach((id, i) => { if (id) out.push({ id, prop: o.id, slot: 'cards[' + i + ']', section: sec }); });
    if (o.type === 'listenDesk' && o.stack) out.push({ id: o.stack, prop: o.id, slot: 'stack', section: sec });
    if (o.type === 'counter' && o.now) out.push({ id: o.now, prop: o.id, slot: 'now', section: 'now' });
  }
  return out;
}
// 每一區看得到的封面（照道具順序；bake-cards 用它寫 bins.js 的 front）：{ key: [ids] }（不含 now、sale 照收）
export function sectionFronts(L) {
  const out = {};
  for (const v of visibleCovers(L)) if (v.section && v.section !== 'now' && v.id) (out[v.section] = out[v.section] || []).push(v.id);
  return out;
}

export function runCovers(opts = {}) {
  const P = [], W = [];
  const bad = m => P.push(m), warn = m => W.push(m);
  const L = opts.layout || JSON.parse(fs.readFileSync(path.join(LAB, 'shops/dip.json'), 'utf8'));
  const cards = opts.cards || require(path.join(LAB, 'cards.js'));
  let binsAll = opts.bins; if (!binsAll) { try { binsAll = require(path.join(LAB, 'bins.js')); } catch (e) { bad('bins.js 載不到：' + e.message); binsAll = { shops: {} }; } }
  const lists = opts.lists || JSON.parse(fs.readFileSync(path.join(LAB, 'tools/deck-lists.json'), 'utf8'));
  let content = opts.content; if (content === undefined) { try { content = require(path.join(LAB, 'content.js')); } catch (_) { content = null; } }
  const bins = (binsAll.shops && binsAll.shops[L.id || 'dip']) || {};
  const META = lists._bins || {};
  const ostIds = lists._ost || [];
  // deck-lists 的 "藝人|專輯" → 卡 id（用 cards.js 反查，跟 bake 同一份資料）
  const norm = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯]+/g, '');
  const byKey = {}, byNorm = {};
  for (const c of Object.values(cards)) { byKey[(c.artist + '|' + c.album).toLowerCase()] = c.id; byNorm[norm(c.artist) + '|' + norm(c.album)] = c.id; }
  const idOf = s => { const [a, b] = String(s).split('|'); return byKey[String(s).toLowerCase()] || byNorm[norm(a) + '|' + norm(b)] || null; };
  const groups = {};
  for (const [g, arr] of Object.entries(lists)) {
    if (g.startsWith('_') || !Array.isArray(arr)) continue;
    groups[g] = arr.map(s => { const id = idOf(s); if (!id) bad('deck-lists ' + g + '：「' + s + '」不在 cards.js（要重烘）'); return id; }).filter(Boolean);
  }
  const info = { covers: 0, bins: 0, sections: {}, pools: {} };

  // ---- 5a. 沒有 lean
  for (const o of L.props || []) if ('lean' in o) bad('dip.json ' + (o.id || o.type) + '：還有 lean 鍵（v4 那一格＝front[1]，SPEC-v4 §2.3.5）');

  // ---- 1. 看得到的封面：在 cards.js、整家店不重複
  const vis = visibleCovers(L);
  info.covers = vis.filter(v => v.section !== 'now').length;
  const seen = {};
  for (const v of vis) {
    const where = v.prop + '.' + v.slot;
    if (!v.id) { bad(where + '：空的（看得到的格子一定要有封面）'); continue; }
    if (!cards[v.id]) bad(where + '：' + v.id + ' 不在 cards.js');
    if (seen[v.id]) (v.section === 'now' || seen[v.id].section === 'now' ? warn : bad)('封面重複：' + v.id + ' 在 ' + seen[v.id].where + ' 與 ' + where);
    else seen[v.id] = { where, section: v.section };
  }

  // ---- 2. 每個封面符合它那一區的 rule、在那一區的 pool
  for (const v of vis) {
    const c = cards[v.id]; if (!c || v.section === 'now') continue;
    const where = v.prop + '.' + v.slot + ' ' + v.id;
    if (!v.section) { bad(where + '：沒有所屬的區（箱子／牆架要有 bin、高櫃／試聽桌要有 section）'); continue; }
    (info.sections[v.section] = info.sections[v.section] || []).push(v.id);
    if (v.section === 'sale') {
      if (!(groups.bargain || []).includes(v.id)) bad(where + '：特價箱的封面不在 C.bargain（deck-lists bargain）');
      const m = bargainMisses(c); if (m.length) bad(where + '：不符特價箱限制 ' + m.join(','));
      continue;
    }
    const B = bins[v.section];
    if (!B) { bad(where + '：bins.js 沒有「' + v.section + '」這一區'); continue; }
    const m = ruleMisses(B.rule, c, ostIds); if (m.length) bad(where + '：不符「' + v.section + '」的 rule（' + m.join(',') + '）');
    if (!(B.pool || []).includes(v.id)) bad(where + '：不在「' + v.section + '」的 pool');
  }

  // ---- 3. bins.js 每一區
  const binProps = (L.props || []).filter(o => o.bin && o.bin.key);
  const binKeys = binProps.map(o => o.bin.key);
  const fronts = sectionFronts(L);
  for (const k of binKeys) if (k !== 'sale' && !bins[k]) bad('bin.key「' + k + '」在 bins.js 沒有這一區');
  for (const k of Object.keys(META)) if (!bins[k]) bad('deck-lists _bins 有「' + k + '」，bins.js 沒有（要重烘）');
  for (const [k, B] of Object.entries(bins)) {
    if (!Array.isArray(B.pool) || !B.pool.length) { bad('bins.js ' + k + '：pool 是空的'); continue; }
    info.bins++;
    info.pools[k] = B.pool.length;
    if (B.display) bad('bins.js ' + k + '：v4 FIXLIST 4／5 起每一區都賣（不再有 display 只展示的牆）');
    if (B.key !== k) bad('bins.js ' + k + '：key 欄要＝' + k);
    const M = META[k];
    if (!M) bad('bins.js ' + k + '：deck-lists _bins 沒有這一區');
    else {
      if (B.label !== M.label) bad('bins.js ' + k + '：label ' + B.label + ' ≠ deck-lists ' + M.label);
      if (B.zh !== M.zh) bad('bins.js ' + k + '：zh ' + B.zh + ' ≠ deck-lists ' + M.zh);
      if (JSON.stringify(B.rule) !== JSON.stringify(M.rule)) bad('bins.js ' + k + '：rule 跟 deck-lists 不一樣（要重烘）');
    }
    if (new Set(B.pool).size !== B.pool.length) bad('bins.js ' + k + '：pool 自己有重複');
    for (const id of B.pool) {
      const c = cards[id]; if (!c) { bad('bins.js ' + k + '：' + id + ' 不在 cards.js'); continue; }
      const m = ruleMisses(B.rule, c, ostIds); if (m.length) bad('bins.js ' + k + '：' + id + ' 不符 rule（' + m.join(',') + '）');
    }
    const fr = fronts[k] || [];
    if (JSON.stringify(B.front || []) !== JSON.stringify(fr)) bad('bins.js ' + k + '：front ≠ 店裡那一區看得到的封面（要重烘）：' + JSON.stringify(B.front) + ' vs ' + JSON.stringify(fr));
    for (const id of B.front || []) if (!B.pool.includes(id)) bad('bins.js ' + k + '：front ' + id + ' 不在 pool');
    const need = fr.length + (STOCK_MAX[k] || STOCK_MAX_DEFAULT);
    if (B.pool.length < need) bad('bins.js ' + k + '：pool ' + B.pool.length + ' 張，要 ≥ 看得到的 ' + fr.length + '＋每晚最多 ' + (STOCK_MAX[k] || STOCK_MAX_DEFAULT));
    if (!binKeys.includes(k)) bad('bins.js ' + k + '：店裡沒有這一區（dip.json 沒有 bin.key＝' + k + '）');
  }
  // 契約：feature＝史詩＋傳奇（沒有頂點）；其他區＝一般稀有度（普通／稀有／獨特）
  for (const [k, B] of Object.entries(bins)) for (const id of B.pool || []) {
    const c = cards[id]; if (!c) continue;
    const r = rarityOf(c), want = k === 'feature' ? ['epic', 'legendary'] : ['common', 'rare', 'uncommon'];
    if (!want.includes(r)) bad('bins.js ' + k + '：' + id + ' 稀有度 ' + RARITY_ZH[r] + '（' + k + ' 只放 ' + want.map(x => RARITY_ZH[x]).join('／') + '）');
  }

  // ---- 4. 各區 pool 兩兩不交集，也不跟牌組／禮物／特價箱／王牌／掉牌交集
  const owner = {};
  for (const [k, B] of Object.entries(bins)) for (const id of B.pool || []) { if (owner[id]) bad('兩區重複：' + id + ' 在 ' + owner[id] + ' 與 ' + k); else owner[id] = k; }
  const others = [];   // [{ id, from }]
  for (const [g, ids] of Object.entries(groups)) {
    if (NOT_EXCLUSIVE.has(g) || g.startsWith('bin_')) continue;
    ids.forEach(id => others.push({ id, from: 'deck-lists ' + g }));
  }
  if (content && /^lab-4/.test(String(content.version || ''))) {   // v4 content.js：實際上場的牌組
    for (const [eid, e] of Object.entries(content.enemies || {})) { (e.deck || []).forEach(id => others.push({ id, from: 'content.enemies.' + eid })); if (e.drop) others.push({ id: e.drop, from: 'content.enemies.' + eid + '.drop' }); }
    for (const [t, arr] of Object.entries(content.gifts || {})) (arr || []).forEach(id => others.push({ id, from: 'content.gifts.' + t }));
    ((content.bargain && content.bargain.pool) || []).forEach(id => others.push({ id, from: 'content.bargain' }));
    Object.values(content.aces || {}).forEach(id => others.push({ id, from: 'content.aces' }));
  }
  const told = new Set();
  for (const o of others) if (owner[o.id] && !told.has(o.id + o.from)) { told.add(o.id + o.from); bad('箱子的卡也在別處：' + o.id + '（' + owner[o.id] + '）也在 ' + o.from); }

  // ---- 5b. 名牌：道具上的英文＝bins.js label；bin.label＝zh
  for (const o of binProps) {
    const k = o.bin.key, B = bins[k]; if (!B) continue;
    const pl = plateOf(o);
    if (pl !== B.label) bad((o.id || o.type) + '：名牌「' + pl + '」≠ bins.js ' + k + ' 的 label「' + B.label + '」' + (o.type === 'ledge' ? '（牆架寫 plate）' : o.tabs ? '（中島寫 tabs[0]）' : '（木箱／矮櫃寫 label）'));
    if (o.bin.label !== B.zh) bad((o.id || o.type) + '：bin.label（點了掛的字）「' + o.bin.label + '」≠ bins.js ' + k + ' 的 zh「' + B.zh + '」');
  }

  // ---- 6. 宇多田在店長推薦（picks）的卡池、不在搖滾（v5 店面改版：POP 改 CITY POP，它不是城市流行，移到 picks）
  const UTADA = '宇多田ヒカル-first-love';
  if (!((bins.picks || {}).pool || []).includes(UTADA)) bad('宇多田ヒカル《First Love》要在店長推薦（picks）的卡池（v5 店面改版：POP 改 CITY POP 之後移過去）');
  for (const k of ['rock', 'indierock']) if (((bins[k] || {}).pool || []).includes(UTADA)) bad('宇多田ヒカル《First Love》在 bins.js ' + k + ' 的 pool（D §6 點名：不准出現在搖滾）');
  const ut = vis.filter(v => v.id === UTADA);
  if (ut.some(v => v.section !== 'picks')) bad('宇多田ヒカル《First Love》看得到的地方不在店長推薦：' + ut.filter(v => v.section !== 'picks').map(v => v.prop).join(', '));

  return { problems: P, warnings: W, info };
}

const isMain = (() => { try { return import.meta.url === pathToFileURL(process.argv[1]).href; } catch (_) { return false; } })();
if (isMain) {
  const r = runCovers();
  const quiet = process.argv.includes('--quiet');
  if (process.argv.includes('--json')) console.log(JSON.stringify(r, null, 1));
  else if (!quiet) {
    for (const [s, ids] of Object.entries(r.info.sections)) console.log('  ' + s.padEnd(11) + '看得到 ' + String(ids.length).padStart(2) + ' 張' + (r.info.pools[s] ? '、卡池 ' + r.info.pools[s] + ' 張' : ''));
    r.warnings.forEach(w => console.log('WARN ' + w));
    r.problems.forEach(p => console.log('PROBLEM ' + p));
  }
  console.log('check-covers：' + (r.problems.length ? r.problems.length + ' problems' : 'OK') + '（看得到的封面 ' + r.info.covers + ' 張、' + r.info.bins + ' 區' + (r.warnings.length ? '、' + r.warnings.length + ' warnings' : '') + '）');
  process.exit(r.problems.length ? 1 : 0);
}
