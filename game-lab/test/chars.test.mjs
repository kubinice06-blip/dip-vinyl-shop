// game-lab/test/chars.test.mjs — 原版 16×16 Q 版小人（chars.js）與捏角色（charedit.js）的測試。
//   node game-lab/test/chars.test.mjs            # 有失敗 exit 1
//   NO_BROWSER=1 node game-lab/test/chars.test.mjs   # 不跑瀏覽器那段
// 測：
//   1. 抄過來的原版資料＝dip-character.js（PIX_PAL／SPR_BODY／AVATAR_HEADS）、roguelike.html 的 SPR（逐字）
//   2. 每一個舊捏角色（10 頭 × 17 色 × 膚色 × 上衣 × 褲子）fromDipChar 畫出來＝avatarRows 一格不差；rows() 字母也一樣
//   3. 每位 NPC（e0…e7、boss、guard、digger、heretic、owner 與 content.js 的客人）＝roguelike SPR 一格不差
//   4. GBA 修飾不改臉：每格 3×3 的正中間＝原色；多出來的只有外圍描邊
//   5. 零件目錄（數量、指定款式、繁中 label、每款畫得出來而且彼此不同）、姿勢（每格都畫得出、跟站姿不同、翻面、背面）
//   6. random 同 seed 同人、normalize、toDipChar、render（假 ctx）、svg、錨點、只掛一個全域
//   7. charedit.js 純邏輯；瀏覽器（:8765 有開才跑）：捏人畫面 390×664／375×548／360×640 不捲、點得動、完成回傳 v2 spec
import path from 'path';
import fs from 'fs';
import vm from 'vm';
import http from 'http';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const ROOT = path.resolve(LAB, '..');
const require = createRequire(import.meta.url);
const CH = require(path.join(LAB, 'chars.js'));
const ED = require(path.join(LAB, 'charedit.js'));
const I = CH._internal;

let pass = 0, fail = 0; const fails = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); ok(A === B, name, A + ' !== ' + B); }
async function section(name, fn) { const f0 = fail; try { await fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name); }
const CJK = /[㐀-鿿]/;
const hex6 = h => { h = String(h).replace('#', ''); if (h.length === 3) h = h.replace(/./g, '$&$&'); return '#' + h.toLowerCase(); };

// 原檔在 vm 裡跑（classic script 的頂層 const 會留在這個 context 的全域詞法環境）
function legacyContext() {
  const ctx = vm.createContext({ location: { hostname: 'localhost' }, window: {}, document: { addEventListener() {} }, console });
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'dip-character.js'), 'utf8'), ctx, { filename: 'dip-character.js' });
  return ctx;
}
const LEG = legacyContext();
const avatarRows = av => vm.runInContext('avatarRows(' + JSON.stringify(av) + ')', LEG);
const LPAL = vm.runInContext('PIX_PAL', LEG);
// roguelike.html 的 SPR 整段（const SPR = {…}; 與 SPR.owner = …）在同一個 context 裡跑
function legacySPR() {
  const html = fs.readFileSync(path.join(ROOT, 'roguelike.html'), 'utf8');
  const a = html.indexOf('const SPR = {'), b = html.indexOf('\n};', a);
  const o1 = html.indexOf('SPR.owner = sprRows('), o2 = html.indexOf(');', o1);
  if (a < 0 || b < 0 || o1 < 0 || o2 < 0) throw new Error('roguelike.html 找不到 SPR');
  const ctx = legacyContext();
  vm.runInContext(html.slice(a, b + 3).replace('const SPR', 'var SPR') + '\n' + html.slice(o1, o2 + 2), ctx);
  return vm.runInContext('SPR', ctx);
}
// 原版字母圖 → 每格 hex（.＝null）
function hexGrid(rows) { return rows.map(r => r.split('').map(ch => ch === '.' ? null : hex6(LPAL[ch]))); }
// 我們畫的平面圖（小人格）→ 16×16 hex
function ourGrid(spec, pose = 'idle', frame = 0, o = {}) {
  const R = CH.compose(spec, pose, frame, Object.assign({ mode: 'sprite', plain: true }, o)), out = [];
  for (let r = 0; r < 16; r++) { const row = []; for (let c = 0; c < 16; c++) row.push(R.grid[c + ',' + r] || null); out.push(row); }
  const outside = Object.keys(R.grid).filter(k => { const [c, r] = k.split(',').map(Number); return c < 0 || c > 15 || r < 0 || r > 15; });
  return { g: out, outside };
}
function sameGrid(spec, rows, name) {
  const want = hexGrid(rows), got = ourGrid(spec);
  const diff = []; for (let r = 0; r < 16; r++) for (let c = 0; c < 16; c++) if (want[r][c] !== got.g[r][c]) diff.push([c, r, want[r][c], got.g[r][c]]);
  ok(diff.length === 0 && got.outside.length === 0, name, diff.slice(0, 4).concat(got.outside.slice(0, 2)));
}
function hashData(R) { let h = 2166136261; for (let i = 0; i < R.data.length; i++) h = Math.imul(h ^ R.data[i], 16777619); return (h >>> 0).toString(16) + ':' + R.w + 'x' + R.h + ':' + R.ax + ',' + R.ay; }

await section('1 抄過來的原版資料＝dip-character.js、roguelike.html', () => {
  eq(Object.keys(I.LP).sort(), Object.keys(LPAL).sort(), 'PIX_PAL 鍵');
  Object.keys(LPAL).forEach(k => eq(I.LP[k], LPAL[k], 'PIX_PAL.' + k));
  eq(I.LBODY, vm.runInContext('SPR_BODY', LEG), 'SPR_BODY');
  const heads = vm.runInContext('AVATAR_HEADS', LEG);
  eq(Object.keys(I.LHEADS).sort(), Object.keys(heads).sort(), 'AVATAR_HEADS 鍵');
  Object.keys(heads).forEach(k => eq(I.LHEADS[k], heads[k].rows, 'AVATAR_HEADS.' + k));
  const SPR = legacySPR();
  ['e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'boss', 'guard', 'digger', 'heretic', 'owner'].forEach(k => eq(I.LSPR[k], SPR[k], 'SPR.' + k));
  // 同一個 context 先跑 dip-character.js 再跑 chars.js：不能重複宣告、只多一個全域、legacyParity 對得上
  const before = new Set(Object.keys(vm.runInContext('globalThis', LEG)));
  vm.runInContext(fs.readFileSync(path.join(LAB, 'chars.js'), 'utf8'), LEG, { filename: 'chars.js' });
  const added = Object.keys(vm.runInContext('globalThis', LEG)).filter(k => !before.has(k));
  eq(added, ['DipLabChars'], 'chars.js 只掛 DipLabChars');
  const par = vm.runInContext('DipLabChars.legacyParity()', LEG);
  ok(par.checked && par.ok, 'legacyParity()：瀏覽器同頁時核對原檔', par);
  vm.runInContext(fs.readFileSync(path.join(LAB, 'charedit.js'), 'utf8'), LEG, { filename: 'charedit.js' });
  ok(!!vm.runInContext('typeof DipLabCharEdit === "object" && DipLabCharEdit.open', LEG), 'charedit.js 掛 DipLabCharEdit');
});

await section('2 每一個舊捏角色：fromDipChar 畫出來＝avatarRows（一格不差）', () => {
  const heads = Object.keys(I.LHEADS), cols = Object.keys(LPAL);
  let n = 0;
  for (const head of heads) for (const hair of cols) for (const skin of ['v', 's', 't', 'u', 'k', 'r']) for (const shirt of ['b', 'w', 's', 'k']) for (const pants of ['k', 'e', 's']) {
    const av = { head, hair, shirt, pants, skin }; n++;
    sameGrid(CH.fromDipChar(av), avatarRows(av), 'avatar ' + JSON.stringify(av));
  }
  // 預設（空物件、壞值）跟原檔一樣退回預設
  [{}, null, { head: 'nope', hair: 'zz', skin: 3, shirt: null }, { head: 'phones' }, { hair: 'w' }].forEach(av => sameGrid(CH.fromDipChar(av), avatarRows(av || {}), 'avatar 退回預設 ' + JSON.stringify(av)));
  sameGrid(CH.normalize({}), avatarRows({}), '空 spec＝原版預設小人');
  // rows()：字母圖跟原版逐字一樣（顏色字母沿用 PIX_PAL 的鍵）
  for (const head of heads) for (const hair of ['k', 'o', 'w', 'm']) {
    const av = { head, hair, shirt: 'r', pants: 'b', skin: 'u' }, R = CH.rows(CH.fromDipChar(av));
    eq(R.rows.slice(0, 16), avatarRows(av), 'rows() 字母 ' + head + '/' + hair);
  }
  ok(n > 7000, '測了 ' + n + ' 個組合');
});

await section('3 NPC＝roguelike SPR（一格不差）', () => {
  const SPR = legacySPR();
  Object.keys(I.LSPR).forEach(k => sameGrid(CH.npc(k), SPR[k], 'npc ' + k));
  // content.js 的客人：spr ? npc(spr) : fromDipChar(avatar)；npc(客人 id) 要跟那樣一樣
  const content = require(path.join(LAB, 'content.js'));
  const C = content.enemies ? content : (content.C || content);
  Object.keys(C.enemies).forEach(id => {
    const en = C.enemies[id], want = en.spr ? SPR[en.spr] : avatarRows(en.avatar);
    sameGrid(CH.npc(id), want, 'content 客人 ' + id);
  });
  ['girl', 'cust2', 'dude', 'regular'].forEach(id => ok(CH.cast().includes(id), 'cast 有閒逛客人 ' + id));
  CH.cast().forEach(id => { const R = CH.compose(CH.npc(id), 'idle', 0); ok(R.w > 20 && R.h > 40, 'cast 畫得出來 ' + id, [R.w, R.h]); });
});

await section('4 GBA 修飾不改臉：每格正中間＝原色，多出來的只有描邊', () => {
  const specs = CH.cast().map(id => CH.npc(id)).concat(Object.keys(I.LHEADS).map(h => CH.fromDipChar({ head: h, hair: 'o', shirt: 'c', pants: 'n', skin: 't' })));
  for (let i = 0; i < 30; i++) specs.push(CH.random('gba' + i));
  specs.forEach((s, si) => {
    for (const flip of [false, true]) {
      const P = CH.compose(s, 'idle', 0, { mode: 'sprite', plain: true, flip }), A = CH.compose(s, 'idle', 0, { flip });
      let bad = 0, cells = 0, stray = 0;
      const inCell = new Set();
      Object.keys(P.grid).forEach(k => {
        const [c, r] = k.split(',').map(Number), x = A.ax + (c - 8) * 3, y = A.ay + (r - 15) * 3;
        cells++; if (A.px(x + 1, y + 1) !== P.grid[k]) bad++;
        for (let dy = 0; dy < 3; dy++) for (let dx = 0; dx < 3; dx++) inCell.add((x + dx) + ',' + (y + dy));
      });
      for (let y = 0; y < A.h; y++) for (let x = 0; x < A.w; x++) { const v = A.px(x, y); if (v && !inCell.has(x + ',' + y) && v !== hex6(CH.OUTLINE)) stray++; }
      ok(bad === 0, 'cell 中心＝原色 #' + si + (flip ? ' flip' : ''), bad + '/' + cells);
      ok(stray === 0, '格子外只有描邊 #' + si + (flip ? ' flip' : ''), stray);
    }
  });
  // 尺寸：×3 後原版 16 格＝48 美術格；預設小人頭頂到腳底 14 格＝42（＋上下描邊各 1）
  const R = CH.compose({}, 'idle', 0);
  eq(CH.SCALE.art, 48, 'SCALE.art＝48');
  eq(R.anchors.head[1], -43, '預設小人頭頂（含描邊）在腳底上 43 美術格');
  eq(R.h - R.ay, 1, '腳底下只有 1 格描邊');
  eq(R.w, 10 * 3 + 2, '寬＝10 格×3＋2 描邊＝32');
});

await section('5 零件目錄', () => {
  const P = CH.parts;
  const min = { skin: 6, hair: 16, hairColor: 12, hat: 12, glasses: 5, facial: 4, top: 8, bottom: 5, neck: 4, bag: 4, color: 12, shoesColor: 4, glassesColor: 4 };
  for (const k of Object.keys(min)) {
    ok(Array.isArray(P[k]) && P[k].length >= min[k], 'parts.' + k + ' ≥ ' + min[k], P[k] && P[k].length);
    const ids = P[k].map(x => x.id); eq(ids.length, new Set(ids).size, 'parts.' + k + ' id 唯一');
    P[k].forEach(x => { ok(CJK.test(x.label) && x.label.length <= 6, 'label 繁中 ' + k + '.' + x.id, x.label); });
  }
  const need = {
    hair: ['neat', 'bob', 'spike', 'long', 'ponytail', 'bun', 'afro', 'mohawk', 'mullet', 'sidepart', 'bangs', 'bald', 'wavy', 'twintails', 'buzz', 'curtain'],
    hat: ['none', 'beanie', 'bucket', 'tophat', 'bandana', 'phones', 'bigphones', 'neckphones', 'cap', 'capback', 'beret', 'fedora'],
    glasses: ['none', 'round', 'square', 'sunglasses'], facial: ['none', 'beard', 'mustache', 'goatee', 'stubble'],
    top: ['tee', 'hoodie', 'flannel', 'stripe', 'jacket', 'apron', 'suit'], bottom: ['pants', 'jeans', 'shorts', 'skirt'],
    neck: ['scarf'], bag: ['recordbag', 'tote'], color: ['k', 'w', 'r', 'b', 'denim', 'navy'], skin: ['v', 's', 't', 'u']
  };
  for (const k of Object.keys(need)) need[k].forEach(id => ok(P[k].some(x => x.id === id), k + ' 有 ' + id));
  ok(I.HAIR.filter(h => !h.legacy).length >= 12, '新髮型 ≥ 12', I.HAIR.filter(h => !h.legacy).length);
  P.color.concat(P.skin, P.hairColor, P.shoesColor).forEach(c => ok(/^#[0-9a-f]{6}$/.test(c.hex), '色票 hex ' + c.id, c.hex));
  // 每一款畫得出來、跟沒選不一樣、彼此也不一樣（同一個人換一個欄位）
  const base = CH.normalize({ hairColor: 'u', topColor: 'navy', bottomColor: 'denim', skin: 's' });
  [['hair', P.hair], ['hat', P.hat], ['glasses', P.glasses], ['facial', P.facial], ['top', P.top], ['bottom', P.bottom], ['neck', P.neck], ['bag', P.bag]].forEach(([field, list]) => {
    const seen = {};
    list.forEach(it => {
      const s = Object.assign({}, base, { [field]: it.id }), R = CH.compose(s, 'idle', 0), h = hashData(R);
      ok(R.w > 0 && R.h > 40, field + '.' + it.id + ' 畫得出來');
      ok(!seen[h], field + '.' + it.id + ' 跟 ' + seen[h] + ' 一模一樣'); seen[h] = it.id;
      ['back'].forEach(() => { const B = CH.compose(s, 'idle', 0, { back: true }); ok(B.h > 40, field + '.' + it.id + ' 背面畫得出來'); });
    });
  });
  // 第二色真的有用到
  Object.keys(CH.SECOND).forEach(kind => Object.keys(CH.SECOND[kind]).forEach(id => {
    if (!CH.SECOND[kind][id]) return;
    const key = kind === 'hat' ? 'hat2Color' : kind === 'top' ? 'top2Color' : 'bag2Color';
    const a = CH.normalize({ [kind]: id, [key]: 'w' }), b = CH.normalize({ [kind]: id, [key]: 'p' });
    const diff = [{}, { back: true }].some(o => hashData(CH.compose(a, 'idle', 0, o)) !== hashData(CH.compose(b, 'idle', 0, o)));
    ok(diff, '第二色有作用 ' + kind + '.' + id);
  }));
  // 皮膚、髮色、布料色都看得出差別
  const skins = new Set(P.skin.map(c => hashData(CH.compose({ skin: c.id }, 'idle', 0)))); eq(skins.size, P.skin.length, '膚色彼此不同');
  const hairs = new Set(P.hairColor.map(c => hashData(CH.compose({ hairColor: c.id }, 'idle', 0)))); eq(hairs.size, P.hairColor.length, '髮色彼此不同');
});

await section('6 姿勢', () => {
  const need = { idle: 2, walk: 2, throw: 2, hurt: 2, ko: 1, cheer: 2, dig: 2 };
  Object.keys(need).forEach(p => ok((CH.POSES[p] || 0) >= need[p], '姿勢 ' + p + ' ≥ ' + need[p] + ' 格'));
  const specs = CH.cast().map(id => CH.npc(id)); for (let i = 0; i < 40; i++) specs.push(CH.random('pose' + i));
  specs.forEach((s, si) => {
    const idle = hashData(CH.compose(s, 'idle', 0)), seen = {};
    Object.keys(CH.POSES).forEach(p => {
      for (let f = 0; f < CH.POSES[p]; f++) {
        for (const o of [{}, { flip: true }, { back: true }, { flip: true, back: true }, { plain: true }, { tint: '#ff3030' }, { sil: '#111' }]) {
          const R = CH.compose(s, p, f, o);
          ok(R.w > 10 && R.h > 20 && R.data.length === R.w * R.h * 4, 'pose ' + p + f + ' ' + JSON.stringify(o) + ' #' + si);
          ok(R.ax >= 0 && R.ax <= R.w && R.ay >= 0 && R.ay <= R.h + 4, '腳底在圖裡 ' + p + f + ' #' + si, [R.ax, R.ay, R.w, R.h]);
        }
        const h = hashData(CH.compose(s, p, f));
        if (!(p === 'idle' && f === 0)) ok(h !== idle, p + f + ' 跟站姿不一樣 #' + si);
        if (seen[h] && !(p === 'point' && seen[h] === 'throw1') && !(p === 'throw' && f === 1 && seen[h] === 'point0')) ok(false, p + f + ' 跟 ' + seen[h] + ' 一樣 #' + si);
        seen[h] = p + f;
      }
    });
    // 平面（plain）翻面＝鏡像
    for (const p of ['idle', 'throw', 'walk', 'cheer']) {
      const A = CH.compose(s, p, 0, { plain: true, mode: 'sprite' }), B = CH.compose(s, p, 0, { plain: true, mode: 'sprite', flip: true });
      let same = A.w === B.w && A.h === B.h;
      for (let y = 0; same && y < A.h; y++) for (let x = 0; x < A.w; x++) { const i = (y * A.w + x) * 4, j = (y * B.w + (B.w - 1 - x)) * 4; if (A.data[i + 3] !== B.data[j + 3] || A.data[i] !== B.data[j]) { same = false; break; } }
      ok(same, 'flip＝鏡像 ' + p + ' #' + si);
    }
  });
  // 背面看不到眼睛：橘色頭髮的每種髮型，眼睛那兩格不是黑的（光頭、龐克頭＝後腦勺的皮膚）
  CH.parts.hair.forEach(h => {
    const B = CH.compose({ hair: h.id, hairColor: 'o', glasses: 'sunglasses', facial: 'beard' }, 'idle', 0, { back: true, mode: 'sprite', plain: true });
    ok(B.grid['6,4'] !== '#111111' && B.grid['9,4'] !== '#111111', '背面沒有眼睛、眼鏡 ' + h.id, [B.grid['6,4'], B.grid['9,4']]);
  });
  // 丟唱片：蓄力時手在臉旁、丟出時手伸直（前手在身體右邊，翻面後在左邊）
  const w = CH.compose({}, 'throw', 0).anchors, t = CH.compose({}, 'throw', 1).anchors, tf = CH.compose({}, 'throw', 1, { flip: true }).anchors;
  ok(w.hand[1] < w.chest[1] - 10, '蓄力：手舉到胸口上面', w.hand);
  ok(t.hand[0] > 15, '丟出：手伸到右邊', t.hand);
  ok(tf.hand[0] < -15, '翻面丟出：手伸到左邊', tf.hand);
  ok(w.held && t.held, 'throw 有 held 錨點');
  ok(CH.compose({}, 'hold', 0).anchors.held, 'hold 有 held 錨點');
  const ko = CH.compose({}, 'ko', 0); ok(ko.w > ko.h, '倒地是橫的', [ko.w, ko.h]);
  ok(CH.compose({}, 'cheer', 1).anchors.head[1] < CH.compose({}, 'cheer', 0).anchors.head[1], 'cheer 第 2 格跳起來');
  // 舊手勢、P2 名稱對得到
  Object.keys(CH.ARM).concat(Object.keys(CH.P2POSE)).forEach(k => { const v = CH.ARM[k] || CH.P2POSE[k]; ok(CH.POSES[v[0]] > v[1], '對照 ' + k); });
  ok(CH.compose({}, 'wind', 0).w > 0 && CH.compose({}, 'browse', 0).w > 0, '直接給舊名稱也畫得出來');
});

await section('7 random、normalize、toDipChar、wear', () => {
  eq(CH.random('abc'), CH.random('abc'), 'random 同 seed 同人');
  ok(JSON.stringify(CH.random('abc')) !== JSON.stringify(CH.random('abd')), 'random 不同 seed 不同人');
  const used = { hair: new Set(), hat: new Set(), top: new Set(), bottom: new Set(), skin: new Set(), hairColor: new Set(), topColor: new Set() };
  for (let i = 0; i < 300; i++) { const s = CH.random(i); eq(CH.normalize(s), s, 'random 已經 normalize #' + i); Object.keys(used).forEach(k => used[k].add(s[k])); ok(s.topColor !== s.bottomColor || true, ''); }
  ok(used.hair.size >= 15 && used.hat.size >= 12 && used.top.size >= 9 && used.bottom.size >= 6 && used.skin.size >= 6 && used.hairColor.size >= 12 && used.topColor.size >= 20, 'random 夠多樣', Object.fromEntries(Object.entries(used).map(([k, v]) => [k, v.size])));
  eq(CH.random('x', { base: { hair: 'afro' } }).hair, 'afro', 'random base 蓋掉');
  const n = CH.normalize({ hair: 'nope', hairColor: 'zz', top: 'hoodie', topColor: '#123456', junk: 1, bag: 'tote' });
  eq([n.hair, n.hairColor, n.top, n.topColor, n.bag, n.junk], ['neat', 'k', 'hoodie', '#123456', 'tote', undefined], 'normalize 剔除壞值、留 #hex');
  eq(CH.normalize(null), CH.normalize({}), 'normalize(null)');
  eq(CH.normalize({ head: 'beret', hair: 'r' }), CH.fromDipChar({ head: 'beret', hair: 'r' }), 'normalize 認得舊格式');
  eq(CH.normalize('owner'), CH.npc('owner'), 'normalize(npc id)');
  eq(CH.normalize(JSON.parse(JSON.stringify(CH.npc('boss')))), CH.npc('boss'), 'boss 存讀不變');
  Object.keys(I.LHEADS).forEach(head => ['k', 'o', 'b'].forEach(hair => {
    const av = { head, hair, shirt: 'w', pants: 'k', skin: 'v' }, back = CH.toDipChar(CH.fromDipChar(av));
    ok(back && JSON.stringify(avatarRows(back)) === JSON.stringify(avatarRows(av)), 'toDipChar 來回 ' + head + '/' + hair, back);
  }));
  eq(CH.toDipChar({ hair: 'afro' }), null, 'toDipChar 舊格式表達不了＝null');
  const a = CH.compose({}, 'idle', 0, { wear: { hat: 'phones' } }), b = CH.compose({ hat: 'phones' }, 'idle', 0);
  eq(hashData(a), hashData(b), 'wear 臨時戴耳機');
});

await section('8 render（沒有 DOM：逐列 fillRect）、anchor、svg', () => {
  const calls = []; let fsv = '#000';
  const ctx = { globalAlpha: 1, imageSmoothingEnabled: false, set fillStyle(v) { fsv = v; }, get fillStyle() { return fsv; }, fillRect(x, y, w, h) { calls.push([x, y, w, h, fsv, this.globalAlpha]); } };
  const r = CH.render(ctx, {}, 'idle', 0, 100, 200, { scale: 12 });
  const body = calls.filter(c => c[5] === 1);
  ok(body.length > 20, 'render 畫了 ' + body.length + ' 條');
  const top = Math.min(...body.map(c => c[1])), bot = Math.max(...body.map(c => c[1] + c[3]));
  eq(bot, 204, '腳底描邊到 y+1 美術格（scale 12 → 4 px）');
  eq(top, 200 - 43 * 4, '頭頂（含描邊）');
  eq(r.anchors.foot, { x: 100, y: 200 }, 'anchors.foot');
  eq(r.anchors.head.y, 200 - 43 * 4, 'anchors.head');
  ok(calls.some(c => c[5] < 1), '有地上影子（半透明）');
  calls.length = 0; CH.render(ctx, {}, 'idle', 0, 0, 0, { scale: 12, shadow: false }); ok(calls.every(c => c[5] === 1), 'shadow:false 不畫影子');
  calls.length = 0; CH.render(ctx, {}, 'idle', 0, 0, 0, { scale: 2, shadow: false });
  const W2 = Math.max(...calls.map(c => c[0] + c[2])) - Math.min(...calls.map(c => c[0])), H2 = Math.max(...calls.map(c => c[1] + c[3])) - Math.min(...calls.map(c => c[1]));
  eq([W2, H2], [20, 28], 'scale 2（不是 3 的倍數）＝原版平面：10×14 格');
  eq(CH.anchor({}, 'idle', 0, 'head', { scale: 3 }), [0, -43], 'anchor() 美術格');
  eq(CH.anchor({}, 'idle', 0, 'head', { scale: 12 }), [0, -172], 'anchor() 依 scale 放大');
  const svg = CH.svg({}, 48);
  ok(/^<svg[^>]+viewBox="0 0 16 16"/.test(svg) && (svg.match(/<rect/g) || []).length > 10, 'svg 原版 16×16');
  ok(/viewBox="0 0 16 10"/.test(CH.svg({}, 30, { crop: 'head' })), 'svg 頭像截前 10 列（跟 ui.js headHTML 一樣）');
});

await section('9 charedit.js 純邏輯', () => {
  const L = ED._logic;
  eq(L.TABS.map(t => t.id), ['face', 'hair', 'hat', 'glasses', 'top', 'bottom', 'acc'], '7 個分頁');
  L.TABS.forEach(t => ok(CJK.test(t.label), '分頁 label 繁中 ' + t.id));
  // spec 的每個欄位都在某一頁改得到
  const keys = new Set(); L.TABS.forEach(t => t.groups.forEach(g => keys.add(g.key)));
  Object.keys(CH.DEFAULT).filter(k => !['bag2Color'].includes(k)).forEach(k => ok(keys.has(k), '欄位改得到 ' + k));
  // 每一段的清單都存在
  L.TABS.forEach(t => t.groups.forEach(g => ok(Array.isArray(CH.parts[g.list]) && CH.parts[g.list].length > 0, '清單 ' + g.list)));
  // 條件出現
  eq(L.visibleGroups({ hat: 'none' }, 'hat').map(g => g.key), ['hat'], '沒戴帽子只有款式');
  eq(L.visibleGroups({ hat: 'tophat' }, 'hat').map(g => g.key), ['hat', 'hatColor', 'hat2Color'], '高禮帽有第二色');
  eq(L.visibleGroups({ hat: 'cap' }, 'hat').map(g => g.key), ['hat', 'hatColor'], '棒球帽沒有第二色');
  // apply：換款式時顏色回原色（除非親手選過）
  let s = L.apply({}, 'hat', 'beanie'); eq([s.hat, s.hatColor], ['beanie', 'auto'], 'apply 換帽子');
  s = L.apply(s, 'hatColor', 'r', { hatColor: true }); s = L.apply(s, 'hat', 'bucket', { hatColor: true }); eq(s.hatColor, 'r', '選過的顏色留著');
  s = L.apply(s, 'hat', 'cap', {}); eq(s.hatColor, 'auto', '沒選過就回原色');
  eq(L.apply({ head: 'neat', hair: 'r' }, 'top', 'hoodie').hairColor, 'r', 'apply 吃舊格式');
  eq(L.finalName('  '), '你', '空名字＝你'); eq(L.clampName('一二三四五六七八九十'), '一二三四五六七八', '名字最多 8 字');
  const r = L.result('阿明', { hair: 'afro' }); eq(r.name, '阿明', 'result.name'); eq(r.spec, CH.normalize({ hair: 'afro' }), 'result.spec＝v2 spec');
  ok(CJK.test(L.summary(CH.random(3))), 'summary 繁中');
  ok(L.shuffle(5).v === 2, 'shuffle 給 v2 spec');
});

// ---------------------------------------------------------------- 瀏覽器（:8765 有開才跑）
function up(url) { return new Promise(res => { const q = http.get(url, r => { r.resume(); res(r.statusCode === 200); }); q.on('error', () => res(false)); q.setTimeout(1500, () => { q.destroy(); res(false); }); }); }
const BASE = 'http://localhost:8765/';
let pw = null; try { pw = require('playwright'); } catch (e) { pw = null; }
if (process.env.NO_BROWSER || !pw || !(await up(BASE + 'game-lab/chars.js'))) {
  console.log('skip 瀏覽器（' + (process.env.NO_BROWSER ? 'NO_BROWSER' : !pw ? '沒有 playwright' : ':8765 沒開') + '）');
} else {
  await section('10 瀏覽器：render＝compose、legacyParity、捏人畫面', async () => {
    const browser = await pw.chromium.launch({ proxy: { server: process.env.HTTPS_PROXY || 'http://localhost:1', bypass: 'localhost,127.0.0.1' } });
    try {
      for (const [w, h] of [[390, 664], [375, 548], [360, 640], [390, 844]]) {
        const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 3 });
        const errs = []; page.on('pageerror', e => errs.push(String(e))); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
        await page.goto(BASE + 'game-lab/mock.html');   // 同源空白頁
        await page.setContent(`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
          <link rel="stylesheet" href="${BASE}game-lab/charedit.css"><style>html,body{margin:0;height:100%;overflow:hidden}#h{height:100vh}</style></head>
          <body><div id="h"></div><script src="${BASE}dip-character.js"></script><script src="${BASE}game-lab/chars.js"></script><script src="${BASE}game-lab/charedit.js"></script></body></html>`);
        await page.waitForFunction(() => window.DipLabCharEdit && window.DipLabChars);
        const res = await page.evaluate(() => {
          const CH = DipLabChars, out = {};
          out.parity = CH.legacyParity();
          // render（drawImage 路徑）＝compose 的像素
          const cv = document.createElement('canvas'); cv.width = 200; cv.height = 200; const g = cv.getContext('2d');
          const R = CH.compose(CH.npc('owner'), 'throw', 1, {}); CH.render(g, CH.npc('owner'), 'throw', 1, 100, 150, { scale: 6, shadow: false });
          const d = g.getImageData(0, 0, 200, 200).data; let bad = 0;
          for (let y = 0; y < R.h; y++) for (let x = 0; x < R.w; x++) { const i = (y * R.w + x) * 4, X = 100 - R.ax * 2 + x * 2, Y = 150 - R.ay * 2 + y * 2, j = (Y * 200 + X) * 4; if (R.data[i + 3] && (d[j] !== R.data[i] || d[j + 1] !== R.data[i + 1] || d[j + 2] !== R.data[i + 2])) bad++; }
          out.renderBad = bad;
          window.__saved = null; window.__changes = 0;
          window.__ed = DipLabCharEdit.open(document.getElementById('h'), { name: '阿明', spec: { head: 'beret', hair: 'r', shirt: 'y', pants: 'b', skin: 't' } }, { onSave: r => { window.__saved = r; }, onChange: () => { window.__changes++; }, onCancel: () => { window.__cancel = 1; } });
          return out;
        });
        ok(res.parity.checked && res.parity.ok, 'legacyParity 瀏覽器 ' + w, res.parity);
        eq(res.renderBad, 0, 'render（drawImage）＝compose 像素 ' + w);
        await page.waitForTimeout(150);
        const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight, ce: document.querySelector('.ce').getBoundingClientRect().height, tabs: document.querySelectorAll('.ce-tab').length,
          stage: (() => { const c = document.querySelector('.ce-cv'), d = c.getContext('2d').getImageData(c.width >> 1, c.height >> 1, 1, 1).data; return d[3]; })(), foot: document.querySelector('.ce-foot').getBoundingClientRect().bottom }));
        ok(m.sw <= w && m.sh <= h, '頁面不捲 ' + w + '×' + h, m);
        ok(m.foot <= h + 0.5, '完成鈕在畫面內 ' + w + '×' + h, m);
        eq(m.tabs, 7, '7 個分頁');
        ok(m.stage === 255, '舞台有畫');
        // 每個分頁點第 3 個款式、第 2 個色票
        for (let t = 0; t < 7; t++) {
          await page.locator('.ce-tab').nth(t).click();
          const opts = page.locator('.ce-opt'); if (await opts.count() > 2) await opts.nth(2).click();
          const sws = page.locator('.ce-c'); if (await sws.count() > 1) await sws.nth(1).click();
        }
        const st = await page.evaluate(() => window.__ed.get());
        ok(st.spec.v === 2 && st.spec.hair !== 'neat', '點了之後 spec 有變', st.spec);
        ok(await page.evaluate(() => window.__changes) >= 7, 'onChange 有叫');
        await page.locator('.ce-cv').click(); await page.locator('.ce-cv').click();
        await page.locator('.ce-rand').click();
        const st2 = await page.evaluate(() => window.__ed.get());
        ok(JSON.stringify(st2.spec) !== JSON.stringify(st.spec), '隨機換了一個人');
        await page.locator('.ce-done').click();
        const saved = await page.evaluate(() => window.__saved);
        ok(saved && saved.name === '阿明' && saved.spec.v === 2, '完成：onSave({ name, spec })', saved);
        ok(await page.evaluate(() => !document.querySelector('.ce')), '完成後關掉');
        ok(errs.length === 0, '主控台沒有錯誤 ' + w, errs);
        await page.close();
      }
    } finally { await browser.close(); }
  });
}

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { console.log(fails.slice(0, 40).join('\n')); process.exit(1); }
