// check-covers.mjs：店裡看得到的封面＝那一區的曲風、整家店不重複（SPEC-v4 §5.1 A3、§2.2.1、§2.3.5、§4.5；D §6）。A3。
//
//   node game-lab/tools/check-covers.mjs          # 有問題 exit 1；--quiet 只印結論；--json 印明細
//
// 查：
//   1. 每個看得到的封面（箱子 front——含島上原本 lean 的那一格 front[1]——、牆 cards、高櫃 cards、試聽桌 stack）都在 cards.js、整家店不重複；
//   2. 每個看得到的封面都符合它所屬那一區的 rule（12 箱看 bin.key；特價箱＝C.bargain 的卡（deck-lists.json bargain）；
//      rack-a／listenDesk＝wallA、rack-b／shelving＝wallB，看道具的 section）；counter.now 除外；
//   3. 每箱 front ⊂ 該箱 pool（bins.js）；每箱 pool 每張符合該箱 rule（first 看 genres[0]、ost 看專輯名或 _ost）；
//   4. 12 箱 pool 兩兩不交集，也不跟牌組／禮物／特價箱／王牌／掉牌／牆交集（deck-lists.json；content.js 是 v4 時也比 C.enemies／gifts／bargain／aces／m2Swaps）；
//   5. dip.json 不准有 lean 鍵；宇多田ヒカル《First Love》在日本／CITY 的 front、不在其他地方。
// rule 的判斷跟 tools/bake-cards.mjs 的 ruleMisses 一模一樣（改一邊要改另一邊）。
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const require = createRequire(import.meta.url);

export const OST_RE = /(original (motion picture )?(soundtrack|score))|soundtrack from|music from the (motion picture|film|original|soundtrack)|サウンドトラック|原聲帶|原聲專輯/i;
// 同 bake-cards.mjs：first（genres[0] 要在裡面）、regions、minYear、minTop:{attr,star}（該軸 ≥star 且是峰值，可並列）、notGenres、ost:true
export function ruleMisses(rule, c, ostIds) {
  const why = [];
  if (!rule) return ['no-rule'];
  if (rule.first && !rule.first.includes((c.genres || [])[0])) why.push('first=' + (c.genres || [])[0]);
  if (rule.regions && !rule.regions.includes(c.region)) why.push('region=' + c.region);
  if (rule.minYear != null && !(c.year >= rule.minYear)) why.push('year=' + c.year);
  if (rule.minTop) { const v = c[rule.minTop.attr]; if (!(v >= rule.minTop.star && v === Math.max(c.c, c.o, c.h))) why.push('minTop ' + rule.minTop.attr + '=' + v); }
  if (rule.notGenres && (c.genres || []).some(g => rule.notGenres.includes(g))) why.push('notGenres');
  if (rule.ost && !(OST_RE.test(c.album || '') || (ostIds || []).includes(c.id))) why.push('not-ost');
  return why;
}
// 特價箱（§4.3）：峰值 ≤3、冷門 ≤3
export function bargainMisses(c) { const why = []; if (Math.max(c.c, c.o, c.h) > 3) why.push('peak>3'); if (c.o > 3) why.push('o>3'); return why; }

const BIN_GROUP = g => g.startsWith('bin_') ? g.slice(4) : g === 'wall_a' ? 'wallA' : g === 'wall_b' ? 'wallB' : null;
const NOT_EXCLUSIVE = new Set(['gold', 'listen', 'stake']);   // v3 唱片櫃／試聽機用的組，可以跟箱子重疊（bake-cards 同一張表）
const SECTION_OF_TYPE = { ledge: null, shelving: null, listenDesk: null };   // 牆上的區看道具的 section

// 看得到的封面：[{ id, prop, slot, section }]；section＝'bin:<key>'｜'wallA'｜'wallB'｜'now'｜null（沒標區）
export function visibleCovers(L) {
  const out = [];
  for (const o of L.props || []) {
    if (o.hidden) continue;
    if (o.bin && Array.isArray(o.front)) o.front.forEach((id, i) => out.push({ id, prop: o.id, slot: 'front[' + i + ']', section: 'bin:' + o.bin.key }));
    else if (Array.isArray(o.front)) o.front.forEach((id, i) => out.push({ id, prop: o.id, slot: 'front[' + i + ']', section: null }));
    if ((o.type === 'ledge' || o.type === 'shelving') && Array.isArray(o.cards)) o.cards.forEach((id, i) => { if (id) out.push({ id, prop: o.id, slot: 'cards[' + i + ']', section: o.section || null }); });
    if (o.type === 'listenDesk' && o.stack) out.push({ id: o.stack, prop: o.id, slot: 'stack', section: o.section || null });
    if (o.type === 'counter' && o.now) out.push({ id: o.now, prop: o.id, slot: 'now', section: 'now' });
  }
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
  const info = { covers: 0, bins: 0, sections: {} };

  // ---- 5. 沒有 lean
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

  // ---- 2. 每個封面符合它那一區的 rule
  for (const v of vis) {
    const c = cards[v.id]; if (!c || v.section === 'now') continue;
    const where = v.prop + '.' + v.slot + ' ' + v.id;
    if (!v.section) { bad(where + '：沒有所屬的區（箱子要有 bin、牆／高櫃／試聽桌要有 section）'); continue; }
    (info.sections[v.section] = info.sections[v.section] || []).push(v.id);
    if (v.section === 'bin:sale') {
      if (!(groups.bargain || []).includes(v.id)) bad(where + '：特價箱的封面不在 C.bargain（deck-lists bargain）');
      const m = bargainMisses(c); if (m.length) bad(where + '：不符特價箱限制 ' + m.join(','));
      continue;
    }
    const key = v.section.startsWith('bin:') ? v.section.slice(4) : v.section;
    const B = bins[key];
    if (!B) { bad(where + '：bins.js 沒有「' + key + '」這一區'); continue; }
    const m = ruleMisses(B.rule, c, ostIds); if (m.length) bad(where + '：不符「' + key + '」的 rule（' + m.join(',') + '）');
    if (!(B.pool || []).includes(v.id)) bad(where + '：不在「' + key + '」的 pool（' + (v.section.startsWith('bin:') ? 'front ⊂ pool' : '牆上的封面要在 bins.js 那一區') + '）');
  }

  // ---- 3. 每箱 pool 每張符合 rule；dip.json 的每個 bin.key 都有 pool
  const binKeys = (L.props || []).filter(o => o.bin && o.bin.key).map(o => o.bin.key);
  for (const k of binKeys) if (k !== 'sale' && !bins[k]) bad('bin.key「' + k + '」在 bins.js 沒有這一區');
  for (const [k, B] of Object.entries(bins)) {
    if (!Array.isArray(B.pool) || !B.pool.length) { bad('bins.js ' + k + '：pool 是空的'); continue; }
    if (!B.display) info.bins++;
    if (new Set(B.pool).size !== B.pool.length) bad('bins.js ' + k + '：pool 自己有重複');
    for (const id of B.pool) {
      const c = cards[id]; if (!c) { bad('bins.js ' + k + '：' + id + ' 不在 cards.js'); continue; }
      const m = ruleMisses(B.rule, c, ostIds); if (m.length) bad('bins.js ' + k + '：' + id + ' 不符 rule（' + m.join(',') + '）');
    }
    if (!B.display && !binKeys.includes(k)) warn('bins.js ' + k + '：店裡沒有這一箱（dip.json 沒有 bin.key＝' + k + '）');
  }

  // ---- 4. 12 箱 pool 兩兩不交集，也不跟牌組／禮物／特價箱／王牌／掉牌／牆交集
  const owner = {};
  for (const [k, B] of Object.entries(bins)) {
    if (B.display) continue;
    for (const id of B.pool || []) { if (owner[id]) bad('兩箱重複：' + id + ' 在 ' + owner[id] + ' 與 ' + k); else owner[id] = k; }
  }
  const others = [];   // [{ id, from }]
  for (const [g, ids] of Object.entries(groups)) {
    const key = BIN_GROUP(g);
    if (NOT_EXCLUSIVE.has(g) || (key && key !== 'wallA' && key !== 'wallB')) continue;
    ids.forEach(id => others.push({ id, from: 'deck-lists ' + g }));
  }
  for (const [k, B] of Object.entries(bins)) if (B.display) (B.pool || []).forEach(id => others.push({ id, from: 'bins.js ' + k }));
  if (content && content.version === 'lab-4') {   // A1 的 v4 content.js：實際上場的牌組（含 A3-M2 換牌表的新卡）
    for (const [eid, e] of Object.entries(content.enemies || {})) { (e.deck || []).forEach(id => others.push({ id, from: 'content.enemies.' + eid })); if (e.drop) others.push({ id: e.drop, from: 'content.enemies.' + eid + '.drop' }); }
    for (const [t, arr] of Object.entries(content.gifts || {})) (arr || []).forEach(id => others.push({ id, from: 'content.gifts.' + t }));
    ((content.bargain && content.bargain.pool) || []).forEach(id => others.push({ id, from: 'content.bargain' }));
    Object.values(content.aces || {}).forEach(id => others.push({ id, from: 'content.aces' }));
    // m2Swaps：{ 客人: [[舊 id, 新 id], …] }（A1）；也收 { 舊: {new} } 的寫法
    const swapNew = sw => Array.isArray(sw) ? (sw.length === 2 && typeof sw[1] === 'string' && typeof sw[0] === 'string' ? [sw[1]] : [].concat(...sw.map(swapNew))) : (sw && typeof sw === 'object') ? [].concat(...Object.values(sw).map(v => typeof v === 'string' ? [v] : v && v.new ? [v.new] : swapNew(v))) : [];
    for (const [eid, sw] of Object.entries(content.m2Swaps || {})) swapNew(sw).forEach(id => others.push({ id, from: 'content.m2Swaps.' + eid }));
  }
  const told = new Set();
  for (const o of others) if (owner[o.id] && !told.has(o.id + o.from)) { told.add(o.id + o.from); bad('箱子的卡也在別處：' + o.id + '（' + owner[o.id] + '）也在 ' + o.from); }

  // ---- 5. 宇多田在日本／CITY 的正面、不在其他地方
  const UTADA = '宇多田ヒカル-first-love';
  const ut = vis.filter(v => v.id === UTADA);
  const jp = (L.props || []).find(o => o.bin && o.bin.key === 'jp');
  if (!jp || !(jp.front || []).includes(UTADA)) bad('宇多田ヒカル《First Love》要在日本／CITY 的 front（D §6 點名）');
  if (ut.some(v => v.section !== 'bin:jp')) bad('宇多田ヒカル《First Love》出現在日本／CITY 以外：' + ut.filter(v => v.section !== 'bin:jp').map(v => v.prop).join(', '));
  for (const [k, B] of Object.entries(bins)) if (k !== 'jp' && (B.pool || []).includes(UTADA)) bad('宇多田ヒカル《First Love》在 bins.js ' + k + ' 的 pool');

  return { problems: P, warnings: W, info };
}

const isMain = (() => { try { return import.meta.url === pathToFileURL(process.argv[1]).href; } catch (_) { return false; } })();
if (isMain) {
  const r = runCovers();
  const quiet = process.argv.includes('--quiet');
  if (process.argv.includes('--json')) console.log(JSON.stringify(r, null, 1));
  else if (!quiet) {
    for (const [s, ids] of Object.entries(r.info.sections)) console.log('  ' + s.padEnd(11) + ids.length + ' 張');
    r.warnings.forEach(w => console.log('WARN ' + w));
    r.problems.forEach(p => console.log('PROBLEM ' + p));
  }
  console.log('check-covers：' + (r.problems.length ? r.problems.length + ' problems' : 'OK') + '（看得到的封面 ' + r.info.covers + ' 張、' + r.info.bins + ' 箱' + (r.warnings.length ? '、' + r.warnings.length + ' warnings' : '') + '）');
  process.exit(r.problems.length ? 1 : 0);
}
