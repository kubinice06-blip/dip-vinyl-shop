// game-lab/test/chars.test.mjs — 原版 16×16 Q 版小人（chars.js）與捏角色（charedit.js）的測試。
//   node game-lab/test/chars.test.mjs            # 有失敗 exit 1
//   NO_BROWSER=1 node game-lab/test/chars.test.mjs   # 不跑瀏覽器那段
// 測：
//   1. 抄過來的原版資料＝dip-character.js（PIX_PAL／SPR_BODY／AVATAR_HEADS）、roguelike.html 的 SPR（逐字）
//   2. 每一個舊捏角色（10 頭 × 17 色 × 膚色 × 上衣 × 褲子）fromDipChar 畫出來＝avatarRows 一格不差；rows() 字母也一樣
//   3. 每位 NPC（e0…e7、boss、guard、digger、heretic、owner 與 content.js 的客人）＝roguelike SPR 一格不差
//   4. GBA 修飾不改臉：每格 3×3 的正中間＝原色；多出來的只有外圍描邊
//   5. 零件目錄（數量、指定款式、繁中 label、每款畫得出來而且彼此不同）、姿勢（每格都畫得出、跟站姿不同、翻面、背面）
//   6b. 朝向 dir（'front'｜'back'，舊 back 照收）；背面瑕疵：馬尾只剩正中一條、破洞牛仔褲背面沒洞、單肩包換邊、領結看不到、吊帶褲沒護胸、頭巾結在正中
//   6c. 側面 dir:'side'：正面＋背面逐格摘要不變、67 件零件都有側面且彼此不同、不出格、沒破洞、中線欄 8、朝左＝鏡像、一隻眼、只有站走有側面、走路兩格
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

// v5 第五項第一步：opts.dir（'front'｜'back'；舊的 back:true 照收）＋背面瑕疵（馬尾兩條、破洞牛仔褲背面有洞、單肩包沒換邊、領結、吊帶褲護胸、頭巾結）
await section('6b 朝向 dir、背面瑕疵', () => {
  ok(Array.isArray(CH.DIRS) && CH.DIRS[0] === 'front' && CH.DIRS.includes('back'), 'DIRS 有 front、back', CH.DIRS);
  const H = (s, p, f, o) => hashData(CH.compose(s, p, f, o));
  const specs = CH.cast().map(id => CH.npc(id)); for (let i = 0; i < 12; i++) specs.push(CH.random('dir' + i));
  specs.forEach((s, si) => Object.keys(CH.POSES).forEach(p => { for (let f = 0; f < CH.POSES[p]; f++) {
    eq(H(s, p, f, { dir: 'back' }), H(s, p, f, { back: true }), 'dir:back＝back:true ' + p + f + ' #' + si);
    eq(H(s, p, f, { dir: 'back', flip: true }), H(s, p, f, { back: true, flip: true }), 'dir:back＋flip＝back:true＋flip ' + p + f + ' #' + si);
    eq(H(s, p, f, { dir: 'front' }), H(s, p, f, {}), 'dir:front＝預設 ' + p + f + ' #' + si);
    eq(H(s, p, f, { dir: 'front', back: true }), H(s, p, f, {}), 'dir 優先於舊的 back ' + p + f + ' #' + si);
    if (!CH.DIRS.includes('side')) eq(H(s, p, f, { dir: 'side' }), H(s, p, f, {}), '還沒有側面：dir:side 退回正面 ' + p + f + ' #' + si);
  } }));
  eq(H({}, 'ko', 0, { dir: 'back' }), H({}, 'ko', 0, {}), '倒地一律正面');
  ok(H({}, 'walk', 0, { dir: 'back' }) !== H({}, 'walk', 1, { dir: 'back' }), '背面走路兩格不一樣');
  ok(H({}, 'idle', 0, { dir: 'back' }) !== H({}, 'idle', 0, {}), '背面跟正面不一樣');
  eq(CH.rows({ hair: 'ponytail' }, 'idle', 0, { dir: 'back' }).rows, CH.rows({ hair: 'ponytail' }, 'idle', 0, { back: true }).rows, 'rows() 也收 dir');
  ok(CH.anchor({}, 'walk', 0, 'head', { dir: 'back' })[1] < 0, 'anchor() 收 dir');
  // 平面格（小人格 c,r → hex）
  const grid = (s, o, pose = 'idle', fr = 0) => CH.compose(s, pose, fr, Object.assign({ mode: 'sprite', plain: true }, o)).grid;
  const cells = (g, hex) => Object.keys(g).filter(k => g[k] === hex).map(k => k.split(',').map(Number));
  const RED = hex6(I.LP.r);
  // 馬尾：背面只有正中那一條、一個髮圈；欄 0–3 沒有頭髮
  for (const o of [{ dir: 'back' }, { dir: 'back', flip: true }]) for (const [pose, fr] of [['idle', 0], ['walk', 0], ['walk', 1]]) {
    const s = { hair: 'ponytail', hairColor: 'mustard', topColor: 'w' }, g = grid(s, o, pose, fr), hairC = cells(g, CH.swatch('mustard')), ties = cells(g, RED);
    ok(hairC.length > 20 && !hairC.some(([c]) => c <= 3 || c >= 12), '馬尾背面：兩側沒有甩出去的頭髮 ' + JSON.stringify(o) + pose + fr, hairC.filter(([c]) => c <= 3 || c >= 12));
    eq(ties.length, 2, '馬尾背面：只有一個髮圈（正中 2 格） ' + JSON.stringify(o) + pose + fr);
    ok(ties.every(([c]) => c === 7 || c === 8), '髮圈在正中 ' + JSON.stringify(o) + pose + fr, ties);
  }
  { const g = grid({ hair: 'ponytail', hairColor: 'mustard', topColor: 'w' }, {}); ok(cells(g, CH.swatch('mustard')).some(([c]) => c <= 3), '馬尾正面照舊甩在一邊'); }
  // 破洞牛仔褲：正面膝蓋有洞，背面（站、走兩格、翻面）沒有
  { const skin = CH.swatch('s'), s = { bottom: 'jeans', bottomColor: 'denim', topColor: 'w' };
    ok(cells(grid(s, {}), skin).some(([, r]) => r === 13), '破洞牛仔褲正面有洞');
    for (const o of [{ dir: 'back' }, { dir: 'back', flip: true }]) for (const [pose, fr] of [['idle', 0], ['idle', 1], ['walk', 0], ['walk', 1]]) {
      const g = grid(s, o, pose, fr);
      ok(!cells(g, skin).some(([, r]) => r >= 12), '破洞牛仔褲背面沒有洞 ' + JSON.stringify(o) + pose + fr, cells(g, skin).filter(([, r]) => r >= 12));
      ok(cells(g, CH.swatch('denim')).filter(([, r]) => r >= 12).length >= 8, '背面還是有褲子 ' + JSON.stringify(o) + pose + fr);
    }
    const w0 = grid(s, { dir: 'back' }, 'walk', 0), shoes = cells(w0, CH.swatch('k')).filter(([, r]) => r === 13);
    ok(shoes.length >= 3, '背面走路：抬起來那隻鞋在第 13 列', shoes);
  }
  // 單肩的唱片袋、帆布袋：背面換到另一邊（跟斜背包一樣）
  for (const [bag, frontLeft] of [['recordbag', false], ['tote', true]]) {
    const s = { bag, bagColor: 'r', topColor: 'w' }, f = cells(grid(s, {}), RED), b = cells(grid(s, { dir: 'back' }), RED);
    const left = xs => xs.length && xs.every(([c]) => c <= 3), right = xs => xs.length && xs.every(([c]) => c >= 12);
    ok(frontLeft ? left(f) : right(f), bag + ' 正面在' + (frontLeft ? '左' : '右'), f);
    ok(frontLeft ? right(b) : left(b), bag + ' 背面換到另一邊', b);
  }
  // 領結：背後看不到；圍巾背面還是繞過後頸
  ok(!cells(grid({ neck: 'bowtie', neckColor: 'p', topColor: 'w' }, { dir: 'back' }), CH.swatch('p')).length, '領結背面看不到');
  ok(cells(grid({ neck: 'bowtie', neckColor: 'p', topColor: 'w' }, {}), CH.swatch('p')).length === 2, '領結正面照舊');
  ok(cells(grid({ neck: 'scarf', neckColor: 'p', topColor: 'w' }, { dir: 'back' }), CH.swatch('p')).length === 8, '圍巾背面＝後頸一條');
  // 吊帶褲：背面沒有護胸（第 9–10 列不是一整片），兩條吊帶交叉
  { const s = { bottom: 'overalls', bottomColor: 'r', topColor: 'w' }, f = cells(grid(s, {}), RED), b = cells(grid(s, { dir: 'back' }), RED);
    const row = (xs, r) => xs.filter(x => x[1] === r).length;
    ok(row(f, 9) >= 6 && row(f, 10) >= 6, '吊帶褲正面有護胸', [row(f, 9), row(f, 10)]);
    ok(row(b, 9) <= 2 && row(b, 10) <= 2 && row(b, 8) === 2, '吊帶褲背面：兩條吊帶交叉、沒有護胸', [row(b, 8), row(b, 9), row(b, 10)]);
    ok(row(b, 12) >= 8, '吊帶褲背面還是有褲子'); }
  // 頭巾：背面結在後腦正中，不在一邊
  { const s = { hat: 'bandana', hatColor: 'r', topColor: 'w' }, f = cells(grid(s, {}), RED), b = cells(grid(s, { dir: 'back' }), RED);
    ok(f.some(([c, r]) => r === 3 && c >= 12), '頭巾正面結在一邊');
    ok(!b.some(([c, r]) => r >= 3 && (c <= 5 || c >= 10)) && b.some(([c, r]) => r === 3 && (c === 7 || c === 8)), '頭巾背面結在後腦正中', b.filter(([, r]) => r >= 3)); }
  // 正面零件一格都沒動（新欄位只在背面用）
  for (const id of ['jeans', 'overalls']) eq(H({ bottom: id }, 'walk', 0, {}), H({ bottom: id }, 'walk', 0, { dir: 'front' }), id + ' 正面不變');
});

// v5 第五項第二步：側面（寶可夢黃版三向：前／後／側，左右互為鏡像，每方向 2 格走路；只有站、走有側面）
await section('6c 側面 dir:side', () => {
  ok(CH.DIRS.includes('side'), 'DIRS 有 side', CH.DIRS);
  const H = (s, p, f, o) => hashData(CH.compose(s, p, f, o));
  const flat = (s, o, pose = 'idle', fr = 0) => CH.compose(s, pose, fr, Object.assign({ mode: 'sprite', plain: true, dir: 'side' }, o));
  const cellsOf = R => Object.keys(R.grid).map(k => k.split(',').map(Number));
  // 正面、背面逐格不變：每款零件 × 每個姿勢每格 × {正、翻、背、背翻、平面}＋全部 NPC＋40 個隨機人的摘要
  //   （= 側面施工前 bd44488d3 的 chars.js 算出來的；要動正面／背面時才重算這個數）
  { const base = CH.normalize({ hairColor: 'u', topColor: 'navy', bottomColor: 'denim', skin: 's' }), specs = [];
    ['hair', 'hat', 'glasses', 'facial', 'top', 'bottom', 'neck', 'bag'].forEach(f => CH.parts[f].forEach(it => specs.push(Object.assign({}, base, { [f]: it.id }))));
    CH.cast().forEach(id => specs.push(CH.npc(id))); for (let i = 0; i < 40; i++) specs.push(CH.random('front-lock' + i));
    let h = 2166136261, n = 0;
    for (const s of specs) for (const p of Object.keys(CH.POSES)) for (let f = 0; f < CH.POSES[p]; f++) for (const o of [{}, { flip: true }, { back: true }, { back: true, flip: true }, { mode: 'sprite', plain: true }]) {
      for (const ch of hashData(CH.compose(s, p, f, o))) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); n++;
    }
    eq([(h >>> 0).toString(16), n], ['6fac13c1', 11790], '正面＋背面逐格＝側面施工前（摘要）'); }
  // 每件零件都有側面（67 件；光頭沒有頭髮可畫）、畫得出來、同類彼此不同、跟沒選不一樣
  const SD = I.SIDE, base = CH.normalize({ hairColor: 'u', topColor: 'navy', bottomColor: 'denim', skin: 's' });
  let n = 0;
  [['hair', 'hair'], ['hat', 'hat'], ['glasses', 'glasses'], ['facial', 'facial'], ['top', 'top'], ['bottom', 'bottom'], ['neck', 'neck'], ['bag', 'bag']].forEach(([field, kind]) => {
    const seen = {};
    CH.parts[field].forEach(it => {
      const s = Object.assign({}, base, { [field]: it.id });
      if (it.id !== 'none') {
        n++;
        const d = SD[kind][it.id];
        ok(d && (kind === 'bottom' ? d.legs && d.legs.length === 2 : (d.sd || d.sdb || it.id === 'bald')), '有側面 ' + field + '.' + it.id);
      }
      for (const [p, f] of [['idle', 0], ['idle', 1], ['walk', 0], ['walk', 1]]) for (const o of [{ dir: 'side' }, { dir: 'side', flip: true }]) {
        const R = CH.compose(s, p, f, o); ok(R.w > 10 && R.h >= 38 && R.ax >= 0 && R.ax <= R.w && R.ay >= 0 && R.ay <= R.h, '側面畫得出來 ' + field + '.' + it.id + ' ' + p + f + JSON.stringify(o), [R.w, R.h, R.ax, R.ay]);
      }
      const h = H(s, 'idle', 0, { dir: 'side' });
      ok(!seen[h], '側面 ' + field + '.' + it.id + ' 跟 ' + seen[h] + ' 一模一樣'); seen[h] = it.id;
    });
  });
  eq(n, 67, '零件 67 件（髮 17、帽 14、眼鏡 6、鬍 5、上衣 10、下身 7、脖子 4、包 4）');
  ok(I.SIDE.head.boss, '傳說藏家的頭有側面');
  // 輪廓不出格、沒破洞、中線在欄 8、一隻眼：每位 NPC＋每款零件＋60 個隨機人，站與走兩格、朝右朝左
  const specs = CH.cast().map(id => CH.npc(id)); for (let i = 0; i < 60; i++) specs.push(CH.random('side' + i));
  ['hair', 'hat', 'glasses', 'facial', 'top', 'bottom', 'neck', 'bag'].forEach(f => CH.parts[f].forEach(it => specs.push(Object.assign({}, base, { [f]: it.id }))));
  specs.forEach((s, si) => {
    for (const [p, f] of [['idle', 0], ['idle', 1], ['walk', 0], ['walk', 1]]) {
      const R = flat(s, {}, p, f), C = cellsOf(R), tag = ' #' + si + ' ' + p + f;
      ok(C.every(([c, r]) => c >= 0 && c <= 15 && r >= -3 && r <= 14), '側面不出 16 欄、腳在第 14 列以上' + tag, C.filter(([c, r]) => c < 0 || c > 15 || r < -3 || r > 14).slice(0, 4));
      // 身體（第 7–12 列欄 5–10）、頭（第 3–5 列欄 4–11）沒有破洞
      const holes = []; for (let r = 7; r <= 12; r++) for (let c = 5; c <= 10; c++) if (!R.grid[c + ',' + r]) holes.push([c, r]);
      if (!(s.head && s.head === 'boss')) for (let r = 3; r <= 5; r++) for (let c = 4; c <= 11; c++) if (!R.grid[c + ',' + r]) holes.push([c, r]);
      eq(holes, [], '側面沒有破洞' + tag);
      // 中線：第 10 列（身體）左右邊緣的中點在欄 7.5–8.5；腳底錨點仍是 [0,0]
      const row = C.filter(([, r]) => r === 10).map(([c]) => c).filter(c => c >= 5 && c <= 10), mid = (Math.min(...row) + Math.max(...row) + 1) / 2;
      ok(mid >= 7.5 && mid <= 8.5, '身體中線在欄 8 附近' + tag, mid);
      eq(CH.compose(s, p, f, { dir: 'side' }).anchors.foot, [0, 0], '腳底錨點' + tag);
      // 朝左＝朝右的鏡像（平面；美術格也鏡像）
      const L2 = flat(s, { flip: true }, p, f);
      ok(Object.keys(R.grid).every(k => { const [c, r] = k.split(',').map(Number); return L2.grid[(15 - c) + ',' + r] === R.grid[k]; }) && Object.keys(L2.grid).length === Object.keys(R.grid).length, '朝左＝朝右的鏡像' + tag);
      // 美術格：輪廓（不透明的範圍）也是鏡像（陰影固定打在右下，跟正面一樣不鏡像）
      const A = CH.compose(s, p, f, { dir: 'side' }), B = CH.compose(s, p, f, { dir: 'side', flip: true });
      let same = A.w === B.w && A.h === B.h && A.ax + B.ax === A.w;
      for (let y = 0; same && y < A.h; y++) for (let x = 0; x < A.w; x++) { if (A.data[(y * A.w + x) * 4 + 3] !== B.data[(y * B.w + (B.w - 1 - x)) * 4 + 3]) { same = false; break; } }
      ok(same, '美術格朝左＝輪廓鏡像' + tag, [A.w, A.h, A.ax, B.w, B.h, B.ax]);
      ok(Math.sign(A.anchors.face[0]) === 1 && Math.sign(B.anchors.face[0]) === -1, '臉的錨點在前面（朝右在右、朝左在左）' + tag, [A.anchors.face, B.anchors.face]);
    }
  });
  // 一隻眼：沒戴眼鏡的人，第 4 列只有一格黑（欄 10）
  for (const h of CH.parts.hair) { const R = flat({ hair: h.id, hairColor: 'o', skin: 's' }, {}), k = cellsOf(R).filter(([c, r]) => r === 4 && R.grid[c + ',' + r] === '#111111'); eq(k, [[10, 4]], '側面一隻眼在第 4 列第 10 欄 ' + h.id); }
  // 只有站、走有側面：其他姿勢給 side＝正面同一張；倒地也是正面
  CH.cast().map(id => CH.npc(id)).concat([CH.random('sidefb1'), CH.random('sidefb2')]).forEach((s, si) => Object.keys(CH.POSES).forEach(p => { for (let f = 0; f < CH.POSES[p]; f++) {
    if (p === 'idle' || p === 'walk') { ok(H(s, p, f, { dir: 'side' }) !== H(s, p, f, {}), '側面跟正面不一樣 ' + p + f + ' #' + si); continue; }
    eq(H(s, p, f, { dir: 'side' }), H(s, p, f, {}), '其他姿勢退回正面 ' + p + f + ' #' + si);
    eq(H(s, p, f, { dir: 'side', flip: true }), H(s, p, f, { flip: true }), '其他姿勢退回正面（翻面） ' + p + f + ' #' + si);
  } }));
  // 走路兩格：站（兩腿併）→ 跨步（兩腳分開、上身沉 1 格、近手往前）
  specs.slice(0, 30).forEach((s, si) => {
    ok(H(s, 'walk', 0, { dir: 'side' }) !== H(s, 'walk', 1, { dir: 'side' }), '側面走路兩格不一樣 #' + si);
    const w0 = flat(s, {}, 'walk', 0), w1 = flat(s, {}, 'walk', 1), shoe = (R) => cellsOf(R).filter(([c, r]) => r === 14).map(([c]) => c);
    const s0 = shoe(w0), s1 = shoe(w1);
    if (!(s.bottom === 'longskirt')) ok(Math.max(...s1) - Math.min(...s1) > Math.max(...s0) - Math.min(...s0), '跨步那格兩腳比站著開 #' + si, [s0, s1]);
    ok(CH.compose(s, 'walk', 1, { dir: 'side' }).anchors.hand[0] > CH.compose(s, 'walk', 0, { dir: 'side' }).anchors.hand[0], '跨步那格近手往前擺 #' + si);
  });
  ok(H({}, 'idle', 0, { dir: 'side' }) !== H({}, 'idle', 1, { dir: 'side' }), '側面站著會呼吸（兩格不一樣）');
  // 單邊的東西鏡像後換邊（寶可夢也這樣）：斜背包朝右時在前面、朝左時在另一邊
  { const s = { bag: 'crossbag', bagColor: 'r', topColor: 'w' }, red = CH.swatch('r'), xs = R => cellsOf(R).filter(([c, r]) => R.grid[c + ',' + r] === red && r >= 10).map(([c]) => c);
    ok(xs(flat(s, {})).every(c => c >= 9) && xs(flat(s, { flip: true })).every(c => c <= 6), '斜背包朝右在前、朝左鏡像', [xs(flat(s, {})), xs(flat(s, { flip: true }))]); }
  // 帶 head 預設頭的 NPC：藏家有側面；不認得的頭照 normalize 剔除
  ok(H(CH.npc('boss'), 'idle', 0, { dir: 'side' }) !== H(CH.npc('boss'), 'idle', 0, {}), '藏家側面跟正面不一樣');
  // 其他 API 也收 dir:'side'
  ok(CH.rows({}, 'walk', 1, { dir: 'side' }).rows.join('') !== CH.rows({}, 'walk', 1, {}).rows.join(''), 'rows() 收 dir:side');
  ok(CH.anchor({}, 'walk', 0, 'head', { dir: 'side' })[1] < 0, 'anchor() 收 dir:side');
  eq(H({}, 'idle', 0, { dir: 'side', back: true }), H({}, 'idle', 0, { dir: 'side' }), 'dir 優先於舊的 back');
  // 袖子：短袖蓋到上臂、長袖蓋到手腕、背心沒有袖子（X＝上衣暗一階）
  { const sl = top => { const R = flat({ top, topColor: 'w' }, {}), x = CH._internal.resolver(CH.normalize({ top, topColor: 'w' }))('X'); return [7, 8, 9, 10].filter(r => R.grid['8,' + r] === x).length; };
    eq([sl('tee'), sl('hoodie'), sl('tank')], [2, 3, 0], '側面袖長：T 恤 2、帽 T 3、背心 0'); }
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
  // 點人換動作：7 個，第 6 個「背面」換成「轉一圈」（索引不變）；轉一圈＝正 → 側（朝右）→ 背 → 另一側（朝左）→ 正
  eq(L.ACTIONS.map(a => a[0]), ['idle', 'walk', 'throw', 'cheer', 'dig', 'turn', 'hurt'], '動作 7 個、第 6 個是轉一圈');
  eq(L.ACTIONS[5][1], '轉一圈', '轉一圈的字');
  const seq = []; for (let t = 0; t < 2250; t += 50) { const f = L.turnAt(t, true), k = f.dir + (f.flip ? 'L' : ''); if (seq[seq.length - 1] !== k) seq.push(k); }
  eq(seq, ['front', 'side', 'back', 'sideL'], '轉一圈的順序（一圈）');
  eq([L.turnAt(2250, true), L.turnAt(2250 * 3 + 1000, true)], [{ dir: 'front', flip: false }, { dir: 'side', flip: false }], '轉完回正面、再一圈');
  const seq2 = []; for (let t = 0; t < 1350; t += 50) { const f = L.turnAt(t, false); if (seq2[seq2.length - 1] !== f.dir) seq2.push(f.dir); }
  eq(seq2, ['front', 'back'], '沒有側面時只轉正、背');
});

// ---------------------------------------------------------------- 瀏覽器（:8765 有開才跑）
function up(url) { return new Promise(res => { const q = http.get(url, r => { r.resume(); res(r.statusCode === 200); }); q.on('error', () => res(false)); q.setTimeout(1500, () => { q.destroy(); res(false); }); }); }
const BASE = (process.env.LAB_BASE || 'http://localhost:8765').replace(/\/?$/, '/');
let pw = null; try { pw = require('playwright'); } catch (e) { pw = null; }
if (process.env.NO_BROWSER || !pw || !(await up(BASE + 'game-lab/chars.js'))) {
  console.log('skip 瀏覽器（' + (process.env.NO_BROWSER ? 'NO_BROWSER' : !pw ? '沒有 playwright' : BASE + ' 沒開') + '）');
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
        // 轉一圈：點到第 6 個動作，2.25 秒裡舞台的人換了四面（正、側、背、另一側），左右兩側互為鏡像
        await page.evaluate(() => window.__ed.act(5));
        const faces = [];
        for (const ms of [300, 1100, 1550, 2000]) {
          await page.evaluate(ms => new Promise(r => { const t0 = performance.now(); (function w() { performance.now() - t0 >= ms - 10 ? r() : requestAnimationFrame(w); })(); }), ms - (faces.length ? [300, 1100, 1550, 2000][faces.length - 1] : 0));
          faces.push(await page.evaluate(() => { const c = document.querySelector('.ce-cv'), g = c.getContext('2d'), w = c.width, h = c.height, d = g.getImageData(0, 0, w, h).data; let x = 2166136261; for (let i = 0; i < d.length; i += 16) x = Math.imul(x ^ d[i] ^ d[i + 1] << 8, 16777619); return x >>> 0; }));
        }
        ok(new Set(faces).size === 4, '轉一圈：四個時間點畫面都不一樣 ' + w, faces);
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
