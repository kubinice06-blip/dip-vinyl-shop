// game-lab/test/hit.test.mjs — 店內命中與走位加固（SPEC-v4 §2.4、§5.1 A3）。A3。
//   node game-lab/test/hit.test.mjs        # 有失敗 exit 1
// 測：DipShop.buildHotList(dip.json) 的形狀＋深度（主熱點、子熱點、跟著人走、遮擋物）；hitPick：每箱可見區的每一格都命中自己、
//     R-x0 probe3 的誤觸（中島最後一排 世界／民謠 的下緣不會被前排爵士／台灣吃掉）、後牆三個櫃子（門口長櫃 INDIE ROCK／INDIE POP、窗下藍調櫃 BLUES；v5 店面改版）
//     封面＝rack:<id>、櫃身＝bin:<key>、門口牆 FEATURE／PICKS 整面＝bin:feature／bin:picks、容錯只在沒命中時、
//     點在植物上＝null、停用的前排不會讓點擊穿到後面、老闆熱點的深度跟著他的 y；navRoute 走不到回 null、api.route 回 []；
//     DipShop.strict 時 walk 到走不到的點會 reject、非嚴格時不瞬移（每格位移 ≤ 速度＋1）；hotPoints 每一點都點得到自己；按下就描框。
// 掛載用的是一個很小的假 DOM（canvas 只記不畫），跑的是 shop.js 本體，不是複製的邏輯。
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const CS = await import(pathToFileURL(path.join(LAB, 'tools/check-shops.mjs')).href);

let pass = 0, fail = 0; const fails = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); ok(A === B, name, A + ' !== ' + B); }
async function section(name, fn) { const f0 = fail; try { await fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name); }

const lib = CS.loadLib();
const cards = CS.loadCards();
const dip = CS.readJSON('shops/dip.json');
const DS = lib.DipShop, PROPS = DS.O34.PROPS;
const S0 = { card: id => cards[id] || null };
const H = () => DS.buildHotList(JSON.parse(JSON.stringify(dip)), PROPS, S0);
const byId = (hots, id) => hots.find(h => h.id === id);
const FULL = [0, 0, dip.size[0], dip.size[1]];
const R390 = Math.max(dip.fat || 6, Math.ceil(22 / (390 / 292)));   // 390 寬的容錯半徑（美術格）
const pick = (hots, x, y, o) => DS.hitPick(hots, x, y, Object.assign({ r: R390 }, o || {}));
const idOf = h => (h ? h.id : null);
const BINS = dip.props.filter(o => o.bin).map(o => ({ o, id: 'bin:' + o.bin.key }));

await section('buildHotList：主熱點、子熱點、跟著人走、遮擋物、深度', () => {
  const hots = H();
  for (const { o, id } of BINS) {
    const h = byId(hots, id);
    ok(h, id + ' 存在'); if (!h) continue;
    eq([h.action, h.label, h.depth], ['crate:' + o.bin.key, o.bin.label, o.layer === 'wall' ? -1 : o.y], id + ' 動作、名牌＝中文全名、深度＝o.y（牆架＝牆層 −1）');
    eq(h.shape, [PROPS[o.type].box(o)], id + ' 形狀＝道具 box');
    ok(!o.hot, id + ' 道具本身沒有 hot（箱子的主熱點由 bin 產生）');
  }
  const subs = hots.filter(h => h.sub && h.prop);
  ok(subs.length >= 15 + 2 + 2, '子熱點：後牆三櫃 4＋4＋7＋高櫃 2＋櫃檯 now／cat（門口牆整面＝一區，沒有單張子熱點）', subs.length);
  eq(subs.filter(h => h.prop.type === 'ledge').length, 0, '門口牆（有 bin）沒有單張子熱點');
  for (const s of subs) ok(Math.abs(s.depth - ((s.prop.layer === 'wall' ? -1 : s.prop.y) + 0.01)) < 1e-9, s.id + ' 深度＝父道具＋0.01', s.depth);
  eq(['indierock', 'indiepop', 'blues'].map(k => hots.filter(h => /^rack:/.test(h.id) && h.parent === 'bin:' + k).length), [4, 4, 7], '後牆三櫃的封面（4＋4＋7）父熱點＝bin:indierock／bin:indiepop／bin:blues');
  eq([byId(hots, 'now').parent, byId(hots, 'cat').parent], ['counter', 'counter'], '櫃檯 now／cat 的父熱點＝counter');
  const occ = hots.filter(h => h.occluder).map(h => h.prop.type).sort();
  eq(occ, ['duelDeck', 'plant', 'plant', 'shelving', 'stool'], '遮擋物＝沒有主熱點的站立道具（植物、凳子、高櫃、唱盤台；窗下矮櫃改成藍調櫃了）');
  ok(hots.filter(h => h.occluder).every(h => h.enabled === false && h.depth === h.prop.y), '遮擋物不能點、深度＝o.y');
  eq(byId(hots, 'poster-event').depth, -1, '沒有 follow 的 layout 熱點（公告）＝牆層 −1');
  eq(byId(hots, 'door').depth, -1, '門（牆層）＝−1');
  const ow = byId(hots, 'owner'), at = dip.spots[dip.actors.find(a => a.id === 'o').at];
  eq(ow.depth, at[1] + 0.5, '老闆熱點的深度＝他的 y＋0.5（一開始在櫃檯）');
  const ids = hots.filter(h => !h.occluder).map(h => h.id);
  eq(ids.length, new Set(ids).size, '熱點 id 不重複');
  for (const id of CS.o34HotIds(dip)) ok(ids.includes(id), 'check-shops 的必有熱點 ' + id + ' 在 buildHotList 裡（交叉比對）');
});

await section('每箱可見區的每一格都命中自己（含後排島箱：R-x0 第六項）', () => {
  const hots = H();
  for (const { id } of BINS) {
    const h = byId(hots, id), R = DS.hotRegion(hots, h, FULL);
    ok(R && R.n > 0, id + ' 有看得到的一塊'); if (!R) continue;
    let bad = 0, first = null;
    for (let j = 0; j < R.box[3]; j++) for (let i = 0; i < R.box[2]; i++) {
      if (!R.m[j * R.box[2] + i]) continue;
      const x = R.box[0] + i, y = R.box[1] + j, got = pick(hots, x, y);
      const want = got && got.sub && got.parent === id ? got.id : id;   // 後牆三櫃的封面帶是子熱點（另外測）
      if (idOf(got) !== want) { bad++; if (!first) first = [x, y, idOf(got)]; }
    }
    eq(bad, 0, id + ' 可見區 ' + R.n + ' 格全部命中自己' + (first ? ' 第一個錯 ' + JSON.stringify(first) : ''));
    ok(R.n >= 26 * 40 || id === 'bin:sale', id + ' 可見區夠大（≥26×40 格）', R.n);
  }
  // 中島後排：露出來的那一條（26–27 格高）整條都點得到
  for (const id of ['bin:rock', 'bin:elec', 'bin:soul', 'bin:hiphop', 'bin:citypop', 'bin:classical', 'bin:world', 'bin:folk']) {
    const R = DS.hotRegion(hots, byId(hots, id), FULL);
    let y0 = 1e9, y1 = -1; for (let j = 0; j < R.box[3]; j++) for (let i = 0; i < R.box[2]; i++) if (R.m[j * R.box[2] + i]) { y0 = Math.min(y0, j); y1 = Math.max(y1, j); }
    eq([y1 - y0 + 1, R.n], [27, 27 * 44], id + ' 露出的那一條 44×27 格');
  }
});

await section('R-x0 probe3：中島最後一排（世界／民謠）的下緣不會被前排爵士／台灣吃掉', () => {
  const hots = H();
  const pair = { 118: ['bin:world', 'bin:jazz'], 162: ['bin:folk', 'bin:tw'] };
  let checked = 0;
  for (const x of [118, 162]) for (let y = 200; y <= 212; y++) {
    const [back, front] = pair[x], top = DS.hitPick(hots, x, y, { raw: true }), got = idOf(pick(hots, x, y));
    if (idOf(top) === back) { checked++; ok(got === back, `(${x},${y}) 在 ${back} 可見區 → 命中 ${back}`, got); ok(got !== front, `(${x},${y}) 不會命中 ${front}`); }
    else ok(got === front && y >= 211, `(${x},${y}) 在前排木箱的 box 裡（y≥211）→ 命中 ${front}`, got);
  }
  eq(checked, 22, 'y 200–210 共 22 格在後排可見區');
});

// v5 店面改版：門口長櫃拆成 INDIE ROCK（backbin-ir）／INDIE POP（backbin-ip）兩個 4 欄櫃、窗下矮櫃換成 BLUES 藍調櫃（winbin，7 欄）
await section('後牆三櫃（INDIE ROCK／INDIE POP／BLUES）：封面＝rack:<id>（唱片資訊＋試聽），其他看得到的地方＝bin:<key>（開抽屜）', () => {
  const hots = H();
  const body = { 'backbin-ir': [[60, 52], [60, 85], [90, 80]], 'backbin-ip': [[110, 52], [140, 75], [150, 85]], winbin: [[200, 80], [240, 85], [170, 58]] };
  for (const [pid, n] of [['backbin-ir', 4], ['backbin-ip', 4], ['winbin', 7]]) {
    const o = dip.props.find(p => p.id === pid), key = 'bin:' + o.bin.key;
    const covers = hots.filter(h => h.parent === key);
    eq(covers.map(h => h.id), o.front.map(id => 'rack:' + id), pid + '：' + n + ' 張封面熱點照 front 順序');
    for (const c of covers) {
      const r = c.shape[0];
      eq(idOf(pick(hots, r[0] + 6, r[1] + 5)), c.id, c.id + ' 封面中心');
      eq(c.action, 'wall-record:' + c.id.slice(5), c.id + ' 動作＝wall-record');
    }
    const box = PROPS[o.type].box(o);
    for (const [x, y] of [[box[0] + 4, box[1] + 3], [box[0] + box[2] - 4, box[1] + box[3] - 2]].concat(body[pid]))
      eq(idOf(pick(hots, x, y)), key, `${pid} 櫃身 (${x},${y}) → ${key}`);
  }
});

await section('門口牆（FIXLIST 4／5）：FEATURE（靠門 2×2＋名牌）、PICKS（其餘 5×2＋名牌）整面都是那一區', () => {
  const hots = H();
  for (const [pid, key] of [['wall-feature', 'feature'], ['wall-picks', 'picks']]) {
    const o = dip.props.find(p => p.id === pid), box = PROPS.ledge.box(o), id = 'bin:' + key;
    const cells = []; for (let r = 0; r < o.rows; r++) for (let i = 0; i < o.n; i++) cells.push([o.x + 3 + i * 14 + 6, o.y + r * 16 - 12 + 6]);
    for (const [x, y] of cells) eq(idOf(pick(hots, x, y)), id, pid + ' 封面 (' + x + ',' + y + ') → ' + id);
    eq(idOf(pick(hots, box[0] + Math.floor(box[2] / 2), box[1] + 4)), id, pid + ' 名牌 → ' + id);
    eq(idOf(pick(hots, o.x + 4, o.y + 1)), id, pid + ' 層板 → ' + id);
    const R = DS.hotRegion(hots, byId(hots, id), FULL);
    ok(R && R.n >= o.n * o.rows * 144, pid + ' 看得到的一塊夠大（每格 12×12 都在）', R && R.n);
  }
  eq(idOf(pick(hots, 60, 46)), 'bin:feature', 'FEATURE 下排層板（後牆矮櫃上緣 y47 之上）→ bin:feature');
  eq(idOf(pick(hots, 60, 52)), 'bin:indierock', '再往下（門口長櫃 INDIE ROCK 在牆前面）→ bin:indierock');
});

await section('容錯只在沒命中時；點在植物上＝null；停用的前排不會穿到後面', () => {
  const hots = H();
  let inside = 0, slopUsed = 0;
  for (let y = 0; y < dip.size[1]; y++) for (let x = 0; x < dip.size[0]; x++) {
    const top = DS.hitPick(hots, x, y, { raw: true });
    const a = pick(hots, x, y), b = DS.hitPick(hots, x, y, { r: 0 });
    if (top) { inside++; if (idOf(a) !== idOf(b)) { ok(false, `(${x},${y}) 有形狀包含卻用了容錯`, [idOf(a), idOf(b)]); } }
    else if (a) {
      slopUsed++;
      const d = Math.min(...a.shape.map(r => Math.hypot(Math.max(r[0] - x, 0, x - (r[0] + r[2] - 1)), Math.max(r[1] - y, 0, y - (r[1] + r[3] - 1)))));
      if (!(d <= R390 + 1e-9)) ok(false, `(${x},${y}) 容錯距離 ${d} > ${R390}`);
    }
  }
  ok(inside > 20000 && slopUsed > 0, '有形狀的格子一律不容錯；空地才容錯', { inside, slopUsed });
  for (const occ of hots.filter(h => h.occluder && h.prop.type === 'plant')) {
    const c = DS.regionCenter(DS.hotRegion(hots, occ, FULL));
    eq(pick(hots, c.x, c.y), null, '點在植物上（' + occ.id + ' ' + c.x + ',' + c.y + '）→ null（不容錯、不穿過去）');
  }
  const deck = hots.find(h => h.occluder && h.prop.type === 'duelDeck'), dc = DS.regionCenter(DS.hotRegion(hots, deck, FULL));
  eq(pick(hots, dc.x, dc.y), null, '點在唱盤台上 → null');
  // 停用前排（爵士）：(118,215) 在爵士與新進的形狀裡，爵士在前 → null，不會變成新進
  const noJazz = h => h.id !== 'bin:jazz';
  eq(idOf(pick(hots, 118, 215, { enabled: noJazz })), null, '爵士停用：點爵士（壓在新進上那塊）→ null，不往後穿到新進');
  eq(idOf(pick(hots, 118, 205, { enabled: noJazz })), 'bin:world', '爵士停用：世界（中島最後一排）自己的可見區照常');
  eq(idOf(pick(hots, 118, 240, { enabled: noJazz })), null, '爵士停用：爵士本體 → null（也不容錯到別人）');
  // 主熱點停用、子熱點啟用（序章／對決只開 rack:*）：封面點得到，櫃身 → null
  const onlyRack = h => /^rack:/.test(h.id) || h.id === 'now';
  eq(idOf(pick(hots, 51, 62, { enabled: onlyRack })), 'rack:' + dip.props.find(p => p.id === 'backbin-ir').front[0], '只開 rack:*：門口長櫃封面點得到');
  eq(idOf(pick(hots, 97, 80, { enabled: onlyRack })), null, '只開 rack:*：門口長櫃櫃身 → null');
  eq(idOf(pick(hots, 170, 69, { enabled: onlyRack })), 'rack:' + dip.props.find(p => p.id === 'winbin').front[0], '只開 rack:*：窗下藍調櫃封面點得到');
  eq(idOf(pick(hots, 200, 80, { enabled: onlyRack })), null, '只開 rack:*：窗下藍調櫃櫃身 → null');
  eq(idOf(pick(hots, 221, 163, { enabled: onlyRack })), 'now', '只開 rack:*／now：櫃檯正在放點得到');
  eq(idOf(pick(hots, 247, 195, { enabled: onlyRack })), null, '只開 rack:*／now：櫃檯正面 → null');
});

await section('老闆熱點的深度跟著他的 y（站到箱子前面就擋住箱子）', () => {
  const at = { x: dip.spots.dig1[0], y: dip.spots.dig1[1] };
  const hots = DS.buildHotList(JSON.parse(JSON.stringify(dip)), PROPS, Object.assign({}, S0, { actor: id => id === 'o' ? at : null }));
  const ow = byId(hots, 'owner');
  eq(ow.depth, at.y + 0.5, '老闆在 dig1：深度＝274.5');
  const r = ow.shape[0], cx = r[0] + 12, cy = r[1] + 12;
  ok(DS.hitPick(hots, cx, cy, { raw: true, enabled: () => true }) === ow, '他的頭在爵士箱前面：點他＝老闆', [cx, cy]);
  eq(idOf(pick(hots, cx, cy)), 'owner', '…而且命中老闆不是爵士');
  DS.followHot(ow, { x: dip.spots.counter[0], y: dip.spots.counter[1] }, dip.spriteScale);
  eq(ow.depth, dip.spots.counter[1] + 0.5, 'followHot：走回櫃檯，深度跟著改');
  eq(idOf(pick(hots, cx, cy)), 'bin:jazz', '他走開之後同一點＝爵士');
  DS.followHot(ow, { x: 0, y: 0, hidden: true }, 3);
  ok(ow.gone && pick(hots, ow.rect[0] + 12, ow.rect[1] + 12) !== ow, '藏起來＝gone，點不到');
});

await section('navRoute：走不到回 null、自己不丟例外', () => {
  const L = { size: [100, 100], props: [], obstacles: [[40, -5, 10, 110]], nav: [[20, 50], [30, 20]] };
  eq(DS.navRoute(L, [10, 50], [90, 50]), null, '整面牆擋住 → null（不再回 [b] 直線穿過去）');
  eq(DS.navRoute({ size: [100, 100], props: [], nav: [] }, [10, 50], [90, 50]), [[90, 50]], '沒擋 → [b]');
  eq(DS.navRoute(null, [0, 0], [1, 1]), null, '壞資料 → null，不丟例外');
  const fb = DS.navFallback(L, [10, 50], [90, 50]);
  eq(fb.how, 'straight', '退路：最近的路點也走不到 → 直線');
  const L2 = { size: [100, 100], props: [], obstacles: [[40, 30, 10, 75]], nav: [[20, 50]] };
  const fb2 = DS.navFallback(L2, [10, 90], [90, 90]);
  ok(fb2.pts.length >= 1 && fb2.pts[fb2.pts.length - 1][0] === 90, '退路一定走到終點', fb2);
  // 本店：每個 spot 兩兩之間 navRoute 都有路（嚴格模式不會誤報）
  const obs = DS.navObstacles(dip), keys = Object.keys(dip.spots).filter(k => !dip.spots[k][2]);
  const stands = dip.props.filter(o => o.bin && o.bin.stand).map(o => o.bin.stand);
  const pts = keys.map(k => dip.spots[k]).concat(stands);
  let miss = [];
  for (const a of pts) for (const b of pts) if (a !== b && !DS.navRoute(dip, [a[0], a[1]], [b[0], b[1]], obs)) miss.push([a, b]);
  eq(miss.slice(0, 3), [], '本店所有 spot／stand 兩兩都走得到（' + pts.length + ' 點）');
});

// ---------------------------------------------------------------- 假 DOM（只夠 mountOblique 跑起來）
function fakeCtx() {
  const base = {
    measureText: t => ({ width: String(t).length * 7 }), createRadialGradient: () => ({ addColorStop() {} }), createLinearGradient: () => ({ addColorStop() {} }),
    getImageData() { throw new Error('no pixels'); }, isPointInPath: () => false
  };
  return new Proxy(base, { get: (t, k) => (k in t ? t[k] : (typeof k === 'string' && /^[a-z]/.test(k) ? (t[k] = function () {}) : undefined)), set: (t, k, v) => { t[k] = v; return true; } });
}
function fakeEl(tag, W0) {
  const kids = [], cls = new Set(), lis = {};
  const el = {
    tagName: String(tag).toUpperCase(), style: { setProperty() {}, removeProperty() {} }, dataset: {}, children: kids, parent: null, width: 0, height: 0, textContent: '', id: '',
    classList: { add: (...a) => a.forEach(c => cls.add(c)), remove: (...a) => a.forEach(c => cls.delete(c)), toggle: (c, on) => { if (on === undefined ? !cls.has(c) : on) cls.add(c); else cls.delete(c); }, contains: c => cls.has(c) },
    set className(v) { cls.clear(); String(v).split(/\s+/).filter(Boolean).forEach(c => cls.add(c)); }, get className() { return [...cls].join(' '); },
    set innerHTML(v) { kids.length = 0; }, get innerHTML() { return ''; },
    appendChild(c) { kids.push(c); c.parent = el; return c; }, remove() { if (el.parent) { const i = el.parent.children.indexOf(el); if (i >= 0) el.parent.children.splice(i, 1); } },
    setAttribute() {}, getContext: () => fakeCtx(), addEventListener(t, f) { (lis[t] = lis[t] || []).push(f); }, removeEventListener() {},
    dispatch(t, ev) { (lis[t] || []).forEach(f => f(ev)); },
    getBoundingClientRect: () => ({ left: 0, top: 0, x: 0, y: 0, width: W0 || 0, height: 0, right: W0 || 0, bottom: 0 }),
    get clientWidth() { return W0 || 0; }, offsetWidth: 40, offsetHeight: 20, animate: () => ({ cancel() {} })
  };
  return el;
}
let rafQ = [], warns = [], errors = [];
function installDom() {
  globalThis.document = { createElement: t => fakeEl(t), addEventListener() {}, removeEventListener() {}, hidden: false };
  globalThis.window = globalThis.window || {};
  globalThis.Image = function () { this.onload = null; this.onerror = null; this.src = ''; };
  globalThis.requestAnimationFrame = f => { rafQ.push(f); return rafQ.length; };
  globalThis.cancelAnimationFrame = () => {};
  globalThis.devicePixelRatio = 1;
  globalThis.location = globalThis.location || { search: '', href: 'http://localhost/game-lab/' };
}
let TS = 0;
function frames(n, ms = 100) { for (let i = 0; i < n; i++) { TS += ms; const q = rafQ; rafQ = []; q.forEach(f => f(TS)); } }
const ROWS = Array.from({ length: 16 }, (_, j) => (j < 2 ? '.'.repeat(16) : '....kkkkkkkk....'));
function mountL(L, opts) {
  const host = fakeEl('div', 390);
  return DS.mount(host, JSON.parse(JSON.stringify(L)), Object.assign({ cards, sprites: { owner: ROWS, p: ROWS }, sparkle: false }, opts || {}));
}

installDom();
const cw = console.warn, ce = console.error;
console.warn = (...a) => { warns.push(a.join(' ')); };
console.error = (...a) => { errors.push(a.join(' ')); };
try {
  await section('嚴格模式：walk 到走不到的點 reject（[shop] no route），人不動', async () => {
    const L = { id: 't', projection: 'oblique34', size: [100, 100], props: [], obstacles: [[40, -5, 10, 110]], nav: [[20, 50], [30, 20]], spots: { a: [10, 50], b: [90, 50], c: [20, 80] }, cameras: { full: { y: 0, h: 100 } }, light: { off: true } };
    DS.strict = true; errors = [];
    const shop = mountL(L);
    shop.put('p', 'a', 'p');
    let err = null;
    await shop.walk('p', ['b']).catch(e => { err = e; });
    ok(err && /\[shop\] no route p a→b/.test(err.message), 'reject 的訊息含 id 與起訖', err && err.message);
    ok(errors.some(m => /\[shop\] no route p a→b/.test(m)), '主控台有錯誤（e2e #29 會抓到）', errors);
    frames(5);
    eq([shop.pos('p').x, shop.pos('p').y], [10, 50], '人沒動、沒瞬移');
    let ok2 = false; await Promise.race([shop.walk('p', ['c']).then(() => { ok2 = true; }), (async () => { frames(30); })()]);
    frames(30); await Promise.resolve();
    eq([shop.pos('p').x, shop.pos('p').y], [20, 80], '走得到的照常走（嚴格模式不誤報）');
    eq(shop.route('a', 'b'), [], 'api.route 走不到回 []（不回 null）');
    ok(Array.isArray(shop.route('a', 'c')) && shop.route('a', 'c').length, 'api.route 走得到回路線');
    shop.destroy();
  });

  await section('執行期（非嚴格）：走不到也不瞬移、每格位移 ≤ 速度＋1、最後走到、console.warn', async () => {
    const L = { id: 't', projection: 'oblique34', size: [100, 100], walkK: 2, props: [], obstacles: [[40, -5, 10, 110]], nav: [[20, 50], [30, 20]], spots: { a: [10, 50], b: [90, 50] }, cameras: { full: { y: 0, h: 100 } }, light: { off: true } };
    DS.strict = false; warns = []; errors = [];
    const shop = mountL(L);
    shop.put('p', 'a', 'p');
    frames(2);   // 迴圈的上一格時間對齊（之後每格 100 ms）
    let done = false; shop.walk('p', ['b']).then(() => { done = true; });
    ok(warns.some(m => /\[shop\] no route p a→b/.test(m)), 'console.warn 一次（不是錯誤）', warns);
    eq(errors, [], '非嚴格不印錯誤');
    let prev = shop.pos('p'), maxStep = 0, n = 0;
    while (!done && n < 200) { frames(1); await Promise.resolve(); const q = shop.pos('p'); maxStep = Math.max(maxStep, Math.hypot(q.x - prev.x, q.y - prev.y)); prev = q; n++; }
    const lim = 36 * 2 * 0.1 + 1;
    ok(maxStep <= lim, '每格（100 ms）位移 ≤ 速度＋1 格', { maxStep, lim });
    ok(done && shop.pos('p').x === 90 && shop.pos('p').y === 50, '最後走到終點（直線走過去，人一直看得到）', shop.pos('p'));
    ok(n > 5, '是走過去的，不是一格就到', n);
    shop.destroy();
  });

  await section('本店：嚴格模式下所有序章路線照走、不丟錯', async () => {
    DS.strict = true; errors = [];
    const shop = mountL(dip);
    shop.put('o', 'counter', 'owner');
    const legs = ['dig1', 'counter', 'dig2', 'counter', 'mid', 'ref', 'visit', 'dig1', 'sale', 'pay', 'leaving', 'duelP', 'door', 'atdoor', 'duelE', 'browse', 'sale'];
    for (const k of legs) {
      let done = false; const pr = shop.walk('o', [k]).then(() => { done = true; }, e => { ok(false, 'walk ' + k + ' reject', e.message); done = true; });
      for (let i = 0; i < 80 && !done; i++) { frames(1); await Promise.resolve(); }
      await pr;
      const p = shop.pos('o'); ok(p.x === dip.spots[k][0] && p.y === dip.spots[k][1], '走到 ' + k, p);
    }
    eq(errors, [], '主控台 0 錯誤');
    shop.destroy();
    DS.strict = false;
  });

  await section('hotPoints：每一點都在自己的可見區、點下去命中自己（掛在假 DOM 上的真 shop）', () => {
    const shop = mountL(dip);
    shop.put('o', 'counter', 'owner');
    const pts = shop.hotPoints(), v = shop.view();
    const want = shop.hotspots().map(h => h.id);
    eq(pts.map(p => p.id).sort(), want.slice().sort(), '每個啟用熱點都有一點（' + want.length + ' 個）');
    for (const p of pts) {
      const ax = Math.floor(p.x / v.scale), ay = Math.floor(p.y / v.scale) + v.y;   // fromEvent 的換算（host 與畫布同寬、左緣 0）
      eq(idOf(shop.pick(ax, ay)), p.id, 'hotPoints ' + p.id + ' → (' + ax + ',' + ay + ') 命中自己');
    }
    shop.allow(h => h.id !== 'bin:jazz');
    ok(!shop.hotPoints().some(p => p.id === 'bin:jazz'), '停用的熱點不給點');
    shop.allow(null);
    shop.destroy();
  });

  await section('按下就描框（pointerdown 命中 → state.press；放開清掉、命中才 onAction）', () => {
    const got = [];
    const shop = mountL(dip, { onAction: (a, h) => got.push(h.id) });
    const v = shop.view(), pt = shop.hotPoints().find(p => p.id === 'bin:hiphop');
    const ev = { clientX: pt.x, clientY: pt.y, pointerType: 'touch' };
    shop.canvas.dispatch('pointerdown', ev);
    ok(shop.state.press && shop.state.press.h.id === 'bin:hiphop', 'pointerdown 立刻記下按住的熱點（描框）');
    shop.canvas.dispatch('pointerup', ev);
    ok(!shop.state.press, '放開清掉按住的框');
    eq(got, ['bin:hiphop'], '放開＝tapHot → onAction(crate:hiphop)');
    ok(shop.state.flash && shop.state.flash.h.id === 'bin:hiphop', '放開後短暫描框（tap）');
    const lbl = shop.overlay.children.find(c => c.className.includes('ds-label') && c.className.includes('tap'));
    eq(lbl && lbl.textContent, '嘻哈 R&B', '放開掛名牌＝中文全名（名牌上畫的是 HIP-HOP）');
    shop.canvas.dispatch('pointerdown', { clientX: 1, clientY: (316 - v.y) * v.scale - 2, pointerType: 'touch' });
    shop.canvas.dispatch('pointercancel', {});
    ok(!shop.state.press, 'pointercancel 也清掉');
    shop.destroy();
  });
} finally { console.warn = cw; console.error = ce; }

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { fails.slice(0, 60).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
