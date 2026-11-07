// game-lab/test/chars.test.mjs — 高精度像素人物（chars.js）的測試，不需要 DOM。
//   node game-lab/test/chars.test.mjs        # 有失敗 exit 1
// 測：零件目錄完整（數量、id 唯一、繁中 label）、必要姿勢與格數、每位客人每個姿勢都畫得出來（假 canvas）、
//     客人的辨識點、舊 dip-character.js 捏角色的每個值都對得到新零件、random 同 seed 同結果、render／grid／anchor、
//     身高比例、只掛 window.DipLabChars 一個全域、charedit.js 的純邏輯。
import path from 'path';
import fs from 'fs';
import vm from 'vm';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const ROOT = path.resolve(LAB, '..');
const require = createRequire(import.meta.url);
const CH = require(path.join(LAB, 'chars.js'));

let pass = 0, fail = 0; const fails = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); ok(A === B, name, A + ' !== ' + B); }
function section(name, fn) { const f0 = fail; try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name); }
const CJK = /[㐀-鿿]/;

// 假 canvas：記下 fillRect，量得出畫了多少格、外框在哪
function fakeCtx() {
  const calls = []; let fs = '#000';
  return {
    calls, globalAlpha: 1, imageSmoothingEnabled: true,
    set fillStyle(v) { fs = v; }, get fillStyle() { return fs; },
    fillRect(x, y, w, h) { calls.push([x, y, w, h, fs]); },
    save() {}, restore() {}, translate() {}, scale() {}
  };
}
function bbox(calls) { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; calls.forEach(([x, y, w, h]) => { a = Math.min(a, x); b = Math.min(b, y); c = Math.max(c, x + w); d = Math.max(d, y + h); }); return [a, b, c, d]; }
function opaque(f) { let n = 0; for (let i = 3; i < f.data.length; i += 4) if (f.data[i]) n++; return n; }
function hash(f) { let h = 2166136261; for (let i = 0; i < f.data.length; i++) h = Math.imul(h ^ f.data[i], 16777619); return (h >>> 0).toString(16) + ':' + f.w + 'x' + f.h; }
// 實際人高（不含外框、不含帽子以上的東西就不管了）：最上一列不透明到最下一列
function heightOf(f) { let top = -1, bot = -1; for (let y = 0; y < f.h; y++) for (let x = 0; x < f.w; x++) if (f.data[(y * f.w + x) * 4 + 3]) { if (top < 0) top = y; bot = y; } return bot - top + 1; }

const P = CH.parts;

section('零件目錄：數量下限、id 唯一、繁中 label', () => {
  const min = { skin: 6, hair: 14, hairColor: 10, hat: 9, top: 11, bottom: 6, shoes: 4, acc: 5, eyes: 4, brows: 3, mouth: 4, glasses: 5, facial: 5, cheeks: 3, color: 16, build: 3, height: 3 };
  for (const k of Object.keys(min)) {
    ok(Array.isArray(P[k]), 'parts.' + k + ' 存在');
    ok(P[k].length >= min[k], 'parts.' + k + ' 至少 ' + min[k], P[k].length);
    const ids = P[k].map(x => x.id);
    eq(ids.length, new Set(ids).size, 'parts.' + k + ' id 唯一');
    P[k].forEach(x => { ok(typeof x.id === 'string' && /^[a-z0-9]+$/i.test(x.id), k + ' id 格式 ' + x.id); ok(typeof x.label === 'string' && x.label.length > 0 && x.label.length <= 8, k + ' label 長度 ' + x.id, x.label); });
  }
  // label 要是繁中（顏色、零件名都中文；T 恤之類允許夾英文字母）
  for (const k of Object.keys(P)) P[k].forEach(x => ok(CJK.test(x.label), 'label 有中文 ' + k + '.' + x.id, x.label));
  const need = {
    hair: ['short', 'buzz', 'bob', 'long', 'wavy', 'curly', 'afro', 'ponytail', 'bun', 'mohawk', 'mullet', 'sidepart', 'bangs', 'bald', 'longbangs'],
    hat: ['none', 'beanie', 'cap', 'bucket', 'fedora', 'beret', 'tophat', 'headphones', 'bandana'],
    top: ['tee', 'bandtee', 'stripe', 'hoodie', 'flannel', 'denim', 'leather', 'turtleneck', 'cardigan', 'suit', 'apron'],
    bottom: ['jeans', 'blackjeans', 'chinos', 'shorts', 'skirt', 'cargo'],
    glasses: ['none', 'round', 'square', 'sunglasses'],
    facial: ['none', 'stubble', 'moustache', 'beard', 'goatee'],
    cheeks: ['blush', 'freckles'],
    acc: ['recordbag', 'tote', 'necklace', 'scarf', 'wristband']
  };
  for (const k of Object.keys(need)) for (const id of need[k]) ok(P[k].some(x => x.id === id), k + ' 有 ' + id);
  // 每個色票都有 5 階、是合法色碼
  const hex = /^#[0-9a-f]{6}$/i;
  CH._internal.SKINS.concat(CH._internal.HAIRC, CH._internal.CLOTH).forEach(c => { eq(c.ramp.length, 5, '色階 5 階 ' + c.id); c.ramp.forEach(h => ok(hex.test(h), '色碼 ' + c.id, h)); });
  // swatch 給得出顏色
  ok(hex.test(CH.swatch('skin', 'tan')) && hex.test(CH.swatch('hair', 'ginger')) && hex.test(CH.swatch('cloth', 'denim')), 'swatch');
});

section('捏人欄位表 SLOTS：每欄都指到存在的目錄與 spec 鍵', () => {
  const keys = Object.keys(CH.normalize({}));
  CH.SLOTS.forEach(t => { ok(CJK.test(t.label), 'tab label ' + t.tab); t.fields.forEach(f => { ok(P[f.list], 'list ' + f.key, f.list); ok(keys.includes(f.key) || ['scarfColor', 'bagColor'].includes(f.key), 'spec 鍵 ' + f.key); ok(CJK.test(f.label), 'field label ' + f.key); }); });
});

section('姿勢：必要姿勢與格數、shop.js 手臂姿勢對照', () => {
  const need = { idle: 2, walk: 4, walkFront: 4, throw: 2, hold: 1, hurt: 1, ko: 1, dig: 1, sit: 1, cheer: 1 };
  for (const k of Object.keys(need)) ok((CH.POSES[k] || 0) >= need[k], 'pose ' + k + ' ≥ ' + need[k], CH.POSES[k]);
  for (const k of ['wind', 'throw', 'show', 'up', 'shield', 'flag', 'shrug', 'none']) { const a = CH.ARM[k]; ok(a && CH.POSES[a[0]] > a[1], 'ARM ' + k, a); }
});

section('每位客人 × 每個姿勢 × 每一格：假 canvas 畫得出來、錨點齊全', () => {
  const ids = CH.NPC_IDS;
  ok(ids.length >= 12, 'NPC 數', ids.length);
  for (const id of ['owner', 'man', 'copycat', 'already', 'needle', 'skip', 'broke', 'buyer', 'label', 'critic', 'boss']) ok(ids.includes(id), '有 ' + id);
  for (const id of ids) {
    const sp = CH.npc(id);
    ok(sp && typeof sp.name === 'string' && CJK.test(sp.name), 'npc 名字 ' + id);
    for (const pose of Object.keys(CH.POSES)) for (let fr = 0; fr < CH.POSES[pose]; fr++) {
      const ctx = fakeCtx();
      const r = CH.render(ctx, sp, pose, fr, 100, 200, {});
      ok(ctx.calls.length > 30, `畫了東西 ${id}/${pose}/${fr}`, ctx.calls.length);
      const [x0, y0, x1, y1] = bbox(ctx.calls);
      ok(x0 >= r.x - 0.01 && y0 >= r.y - 0.01 && x1 <= r.x + r.w + 0.01 && y1 <= r.y + r.h + 0.01, `外框正確 ${id}/${pose}/${fr}`);
      ok(Math.abs(y1 - 200) <= (pose === 'cheer' && fr === 1 ? 8 : 1), `腳底貼地 ${id}/${pose}/${fr}`, y1);
      for (const a of ['foot', 'head', 'chest', 'handN', 'handF']) ok(Array.isArray(r.anchors[a]), `錨點 ${a} ${id}/${pose}/${fr}`);
      ok(ctx.calls.every(c => /^rgb\(\d+,\d+,\d+\)$/.test(c[4])), `顏色都是實色 ${id}/${pose}/${fr}`);
    }
  }
});

section('客人的辨識點（照舊 16 格 SPR／content.js）', () => {
  const n = (id) => CH.normalize(CH.npc(id));
  const o = n('owner'); eq([o.hairColor, o.top, o.topColor, o.facial, o.facialColor], ['grey', 'apron', 'green', 'beard', 'grey'], '老闆：灰髮、綠圍裙、灰鬍'); ok(o.glasses !== 'none', '老闆戴眼鏡');
  const m = n('man'); eq([m.hat, m.hatColor, m.hairColor, m.top, m.topColor], ['headphones', 'gold', 'ginger', 'tee', 'green'], '男子：金耳機、橘髮、綠 T');
  const c = n('copycat'); eq([c.hat, c.hatColor], ['beanie', 'green'], '那張我有：綠毛帽'); ok(c.acc.includes('scarf') && c.scarfColor === 'red', '紅圍巾');
  const a = n('already'); eq([a.hat, a.hatColor], ['cap', 'blue'], '我早就聽過：藍棒球帽');
  const nd = n('needle'); ok(['bowler', 'fedora'].includes(nd.hat) && nd.hatColor === 'orange', '針壓強迫症：橘紳士帽');
  const s = n('skip'); eq([s.hair, s.top, s.topColor], ['bald', 'apron', 'mustard'], '跳針王：光頭、金圍裙');
  const b = n('buyer'); eq(b.hat, 'fedora', '剁手黨：紳士帽');
  const l = n('label'); eq([l.hair, l.hairColor, l.topColor, l.bottomColor], ['long', 'black', 'black', 'black'], '冷門仙人：黑長髮、全黑');
  const cr = n('critic'); eq([cr.hat, cr.hatColor], ['beret', 'purple'], '名盤守門員：紫貝雷帽');
  const bs = n('boss'); eq([bs.hat, bs.glasses], ['tophat', 'monocle'], '傳說藏家：高禮帽、單片眼鏡');
  // 舊 SPR 鍵也認得
  eq(CH.npc('e0').id, 'man', 'e0→man'); eq(CH.npc('e4').id, 'skip', 'e4→skip'); eq(CH.npc('boss').id, 'boss', 'boss'); eq(CH.npc('nobody'), null, '不認得→null');
  // npc() 回傳的是複本，改了不影響下一次
  const x = CH.npc('owner'); x.hat = 'tophat'; eq(CH.npc('owner').hat, undefined, 'npc 回傳複本');
});

// dip-character.js 的實際零件表（從原檔讀，原檔新增值時這裡會抓到）
function oldAvatarTables() {
  const src = fs.readFileSync(path.join(ROOT, 'dip-character.js'), 'utf8');
  const heads = [...src.matchAll(/^\s{2}(\w+):\s*\{ name:'/gm)].map(m => m[1]);
  const colors = JSON.parse(src.match(/const AVATAR_COLORS = (\{[\s\S]*?\});/)[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"').replace(/,\s*\}/, '}'));
  return { heads, colors };
}
section('fromDipChar：舊捏角色每個值都對得到新零件', () => {
  const { heads, colors } = oldAvatarTables();
  ok(heads.length >= 10, '讀到舊頭型', heads);
  ok(colors.hair.length >= 10 && colors.skin.length >= 4 && colors.shirt.length >= 10 && colors.pants.length >= 6, '讀到舊色表');
  const valid = (k, v) => P[k === 'hatColor' || k === 'topColor' || k === 'bottomColor' || k === 'shoesColor' ? 'color' : k].some(x => x.id === v);
  let n = 0;
  for (const head of heads) for (const hair of colors.hair) for (const skin of colors.skin) {
    const sp = CH.fromDipChar({ head, hair, skin, shirt: colors.shirt[n % colors.shirt.length], pants: colors.pants[n % colors.pants.length] }); n++;
    for (const k of ['skin', 'hair', 'hairColor', 'top', 'topColor', 'bottom', 'bottomColor', 'hat']) ok(valid(k, sp[k]), `fromDipChar ${head}/${hair}/${skin} ${k}`, sp[k]);
    ok(CH._internal.OLD_HEAD[head], '頭型有對照 ' + head);
  }
  for (const c of colors.hair) ok(CH._internal.OLD_HAIR[c] && CH._internal.OLD_COLOR[c], '髮／帽色有對照 ' + c);
  for (const c of colors.skin) ok(CH._internal.OLD_SKIN[c], '膚色有對照 ' + c);
  for (const c of colors.shirt) ok(CH._internal.OLD_COLOR[c], '上衣色有對照 ' + c);
  for (const c of colors.pants) ok(CH._internal.OLD_PANTS[c], '褲色有對照 ' + c);
  // 幾個看得出來的對應
  eq(CH.fromDipChar({ head: 'phones', hair: 'm' }).hat, 'headphones', 'phones→耳機');
  eq(CH.fromDipChar({ head: 'phones', hair: 'm' }).hairColor, 'pink', 'phones 的 H＝髮色');
  eq([CH.fromDipChar({ head: 'beanie', hair: 'c' }).hat, CH.fromDipChar({ head: 'beanie', hair: 'c' }).hatColor], ['beanie', 'teal'], 'beanie 的 H＝帽色');
  eq(CH.fromDipChar({ head: 'beret', hair: 'p' }).glasses, 'round', 'beret 附眼鏡');
  eq(CH.fromDipChar({ head: 'cap' }).hat, 'capback', 'cap＝反戴帽');
  eq(CH.fromDipChar({ head: 'ballcap' }).hat, 'cap', 'ballcap＝棒球帽');
  eq(CH.fromDipChar({ head: 'spike', hair: 'o' }).hair, 'spiky', 'spike→刺蝟頭');
  eq(CH.fromDipChar({ skin: 'u' }).skin, 'brown', 'u→古銅');
  eq(CH.fromDipChar({ shirt: 'n', pants: 'b' }).topColor, 'green', '綠上衣');
  eq(CH.fromDipChar({ shirt: 'n', pants: 'b' }).bottom, 'jeans', 'b 褲＝牛仔褲');
  eq(CH.fromDipChar(null).hair, 'sidepart', '空的→預設西裝頭');
  // content.js 的 avatarsFallback 與兩位 avatar 客人都畫得出來
  const C = require(path.join(LAB, 'content.js'));
  (C.avatarsFallback || []).concat([C.enemies.broke.avatar, C.enemies.buyer.avatar]).forEach((av, i) => { const f = CH.compose(CH.fromDipChar(av), 'idle', 0); ok(opaque(f) > 400, 'content avatar ' + i); });
});

section('random：同 seed 同結果、不同 seed 有變化、都合法', () => {
  const a = CH.random(42), b = CH.random(42), c = CH.random(43);
  eq(a, b, '同 seed 同人'); ok(JSON.stringify(a) !== JSON.stringify(c), '不同 seed 不同人');
  eq(CH.random('dip'), CH.random('dip'), '字串 seed');
  const seen = new Set();
  for (let i = 0; i < 200; i++) {
    const s = CH.random(i); seen.add(JSON.stringify(s));
    eq(CH.normalize(s), s, 'random 已正規化 ' + i);
    ok(s.acc.length <= 2 && !(s.acc.includes('tote') && s.acc.includes('recordbag')), '配件數 ' + i, s.acc);
  }
  ok(seen.size >= 195, '200 個 seed 幾乎都不同', seen.size);
  eq(CH.random(7, { base: { hat: 'tophat' } }).hat, 'tophat', 'base 覆寫');
  // 同 spec 畫兩次一模一樣（沒有隨機殘留）
  CH.clearCache(); const h1 = hash(CH.compose(CH.random(5), 'walk', 2)); CH.clearCache(); eq(hash(CH.compose(CH.random(5), 'walk', 2)), h1, '畫面確定性');
});

section('normalize：未知值退回預設、欄位齊全', () => {
  const n = CH.normalize({ skin: 'alien', hair: 'nope', hat: 'helmet', top: 'robe', acc: ['scarf', 'scarf', 'jetpack'], topColor: '#123456' });
  eq([n.skin, n.hair, n.hat, n.top], ['light', 'short', 'none', 'tee'], '退回預設');
  eq(n.acc, ['scarf'], '配件去重、去未知');
  ok(CH.parts.color.some(c => c.id === n.topColor), '顏色退回色票');
  eq(Object.keys(CH.normalize({})).sort(), Object.keys(CH.normalize(CH.npc('boss'))).filter(k => !['tieColor', 'hatBandColor', 'scarfColor', 'bagColor', 'name'].includes(k)).sort(), '欄位齊全');
  eq(CH.normalize({ acc: 'scarf' }).acc, ['scarf'], '單一字串配件');
});

section('身高比例（1 px ≈ 3.6 cm）：矮 < 中 < 高；中等成人約 47–50 格（含 1 格外框）', () => {
  const h = (height) => heightOf(CH.compose({ height, hair: 'buzz' }, 'idle', 0));
  const s = h('short'), m = h('mid'), t = h('tall');
  ok(s < m && m < t, '矮中高', [s, m, t]);
  ok(m >= 47 && m <= 51, '中等身高', m);
  ok(t - s >= 4, '高矮差距看得出來', t - s);
  // 帽子不會讓人變矮；高禮帽要高出頭頂
  ok(heightOf(CH.compose({ hat: 'tophat' }, 'idle', 0)) > m + 6, '高禮帽');
  // 坐下比站著矮、倒地是橫的
  const sit = CH.compose({}, 'sit', 0), ko = CH.compose({}, 'ko', 0), st = CH.compose({}, 'idle', 0);
  ok(heightOf(sit) < heightOf(st) - 6, '坐下變矮');
  ok(ko.w > ko.h * 1.6, '倒地是橫的', [ko.w, ko.h]);
  ok(Array.isArray(sit.anchors.seat), '坐姿有 seat 錨點');
});

section('render：flip、scale、alpha、剪影、錨點跟著翻', () => {
  const sp = CH.npc('man');
  const c1 = fakeCtx(), r1 = CH.render(c1, sp, 'throw', 1, 50, 80, {});
  const c2 = fakeCtx(), r2 = CH.render(c2, sp, 'throw', 1, 50, 80, { flip: true });
  ok(r1.anchors.handN[0] > 50 && r2.anchors.handN[0] < 50, '出手的手朝面向（翻了就朝左）', [r1.anchors.handN, r2.anchors.handN]);
  eq(r1.anchors.handN[1], r2.anchors.handN[1], '翻面不動 y');
  const b1 = bbox(c1.calls), b2 = bbox(c2.calls);
  ok(Math.abs((b1[0] + b1[2]) / 2 - 50 - (50 - (b2[0] + b2[2]) / 2)) < 1.01, '左右鏡射對稱');
  const c3 = fakeCtx(), r3 = CH.render(c3, sp, 'idle', 0, 0, 0, { scale: 3 });
  const f = CH.compose(sp, 'idle', 0);
  eq([r3.w, r3.h], [f.w * 3, f.h * 3], 'scale 3 外框');
  ok(c3.calls.every(c => c[3] === 3), '每格 3×3');
  const c4 = fakeCtx(); CH.render(c4, sp, 'idle', 0, 0, 0, { sil: '#123456' });
  ok(c4.calls.every(c => c[4] === '#123456'), '剪影單色');
  const c5 = fakeCtx(); c5.globalAlpha = 1; CH.render(c5, sp, 'idle', 0, 0, 0, { alpha: 0.5 }); eq(c5.globalAlpha, 1, 'alpha 畫完還原');
  const an = CH.anchor(sp, 'throw', 1, 'handN', { flip: true, scale: 2 }), an0 = CH.anchor(sp, 'throw', 1, 'handN');
  eq(an, [-an0[0] * 2, an0[1] * 2], 'anchor() flip+scale');
  ok(Array.isArray(CH.compose(sp, 'throw', 0).anchors.held), '蓄力時手上有唱片（held 錨點）');
  ok(!CH.compose(sp, 'throw', 1).anchors.held, '出手後手上沒唱片（飛出去的由舞台畫）');
  ok(opaque(CH.compose(sp, 'throw', 1, { held: 'record' })) > opaque(CH.compose(sp, 'throw', 1)), 'opts.held 可以硬加');
  const red = CH.compose(sp, 'hold', 0, { labelColor: 'h' }), blue = CH.compose(sp, 'hold', 0, { labelColor: 'c' });
  ok(hash(red) !== hash(blue), 'labelColor 換唱片圓標色');
  eq(CH.toCanvas(sp, 'idle', 0), null, '沒有 DOM 時 toCanvas 回 null');
  eq(CH.toDataURL(sp, 'idle', 0), null, '沒有 DOM 時 toDataURL 回 null');
});

section('grid：shop.js P.sprite 相容（字母列＋色盤）', () => {
  const g = CH.grid(CH.npc('boss'), 'idle', 0);
  const w = g.rows[0].length;
  ok(g.rows.every(r => r.length === w), '每列等寬');
  ok(g.rows.every(r => [...r].every(ch => ch === '.' || g.pal[ch])), '字母都在色盤');
  ok(Object.keys(g.pal).length <= 62 && Object.keys(g.pal).length > 12, '色數', Object.keys(g.pal).length);
  ok(g.ay === g.rows.length, '腳底在最下面那列之下');
});

section('細節：每個零件真的有畫出不同的東西', () => {
  const base = { hair: 'short', top: 'tee', bottom: 'jeans' };
  const diff = (k, list) => { const hs = new Set(list.map(id => hash(CH.compose(Object.assign({}, base, { [k]: id }), 'idle', 0)))); eq(hs.size, list.length, k + ' 每一款都不一樣'); };
  diff('hair', P.hair.map(x => x.id)); diff('hat', P.hat.map(x => x.id)); diff('top', P.top.map(x => x.id)); diff('bottom', P.bottom.map(x => x.id));
  diff('shoes', P.shoes.map(x => x.id)); diff('glasses', P.glasses.map(x => x.id)); diff('facial', P.facial.map(x => x.id)); diff('eyes', P.eyes.map(x => x.id));
  diff('mouth', P.mouth.map(x => x.id)); diff('skin', P.skin.map(x => x.id)); diff('hairColor', P.hairColor.map(x => x.id)); diff('build', P.build.map(x => x.id));
  P.acc.forEach(a => ok(hash(CH.compose(Object.assign({}, base, { acc: [a] }), 'idle', 0)) !== hash(CH.compose(base, 'idle', 0)), '配件看得到 ' + a));
  P.cheeks.filter(x => x.id !== 'none').forEach(a => ok(hash(CH.compose(Object.assign({}, base, { cheeks: a.id }), 'idle', 0)) !== hash(CH.compose(base, 'idle', 0)), '臉頰 ' + a.id));
});

section('只掛 window.DipLabChars（不宣告 PIX_PAL／SPR_BODY／AVATAR_*）', () => {
  const src = fs.readFileSync(path.join(LAB, 'chars.js'), 'utf8');
  const sb = { self: {} }; sb.self.self = sb.self; vm.createContext(sb); vm.runInContext(src, sb);
  eq(Object.keys(sb.self).filter(k => k !== 'self'), ['DipLabChars'], '全域只有 DipLabChars');
  ok(!/\b(var|let|const)\s+(PIX_PAL|SPR_BODY|AVATAR_HEADS|AVATAR_COLORS|AVATAR_DEFAULT)\b/.test(src), '沒宣告 dip-character.js 的名字');
  const ed = path.join(LAB, 'charedit.js');
  if (fs.existsSync(ed)) {
    const s2 = fs.readFileSync(ed, 'utf8'); const sb2 = { self: { DipLabChars: CH } }; sb2.self.self = sb2.self; vm.createContext(sb2); vm.runInContext(s2, sb2);
    eq(Object.keys(sb2.self).filter(k => k !== 'self').sort(), ['DipLabCharEdit', 'DipLabChars'], 'charedit 只加 DipLabCharEdit');
  }
});

section('charedit.js 純邏輯（沒有 DOM 也能測）', () => {
  const ed = path.join(LAB, 'charedit.js'); if (!fs.existsSync(ed)) { ok(false, 'charedit.js 存在'); return; }
  const E = require(ed);
  ok(typeof E.mount === 'function', 'mount');
  const L = E._logic;
  let s = CH.normalize({});
  s = L.apply(s, 'hair', 'afro'); eq(s.hair, 'afro', 'apply 單選');
  s = L.apply(s, 'acc', 'scarf'); s = L.apply(s, 'acc', 'tote'); eq(s.acc, ['scarf', 'tote'], 'apply 複選加');
  s = L.apply(s, 'acc', 'scarf'); eq(s.acc, ['tote'], 'apply 複選再點＝拿掉');
  s = L.apply(s, 'acc', 'recordbag'); ok(!(s.acc.includes('tote') && s.acc.includes('recordbag')), '唱片袋與帆布袋只能背一個', s.acc);
  const n1 = L.cycle(CH.normalize({ hair: 'short' }), 'hair', 1).hair, n0 = L.cycle(CH.normalize({ hair: 'short' }), 'hair', -1).hair;
  ok(n1 !== 'short' && n0 !== 'short' && n1 !== n0, 'cycle 前後', [n0, n1]);
  const r = L.shuffle(CH.normalize({}), 'abc'); eq(r, L.shuffle(CH.normalize({}), 'abc'), 'shuffle 確定性');
  eq(L.summary(CH.npc('owner')).length > 3, true, 'summary 有字');
  ok(CJK.test(L.summary(CH.npc('owner'))), 'summary 繁中');
});

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) { console.log(fails.slice(0, 60).join('\n')); process.exit(1); }
