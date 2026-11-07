// game-lab/test/shop.test.mjs — 像素店 layout 與舞台純邏輯的測試（SPEC-v2 §5、§9.3）。
//   node game-lab/test/shop.test.mjs        # 有失敗 exit 1
// 測：layout schema、熱點 id 唯一、spots／熱點／鏡頭在畫布內、舊 POS 別名表齊全、tools/check-shops.mjs 全綠、
//     矮螢幕鏡頭規則（fitCamera）、對決鏡頭自動換 stripS、像素字寬度（箱子標籤放得下）、比例（唱片箱不高過小人）。
import path from 'path';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const CS = await import(pathToFileURL(path.join(LAB, 'tools/check-shops.mjs')).href);

let pass = 0, fail = 0; const fails = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); ok(A === B, name, A + ' !== ' + B); }
function section(name, fn) { const f0 = fail; try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name); }

const lib = CS.loadLib();
const cards = CS.loadCards();
const content = CS.loadContent();
const read = (f) => JSON.parse(fs.readFileSync(path.join(LAB, 'shops', f), 'utf8'));
const dip = read('dip.json'), taipei = read('taipei.json'), basement = read('basement.json'), index = read('index.json');

section('check-shops 全綠（schema、熱點、spots、別名、卡池、圖釘、比例）', () => {
  const r = CS.runChecks();
  eq(r.problems, [], 'check-shops problems');
});

section('schema：必要欄位', () => {
  for (const L of [dip, basement]) {
    eq(L.kind, 'shop', L.id + ' kind');
    for (const c of CS.SHOP_CAMERAS) ok(L.cameras[c], L.id + ' camera ' + c);
    for (const s of CS.SHOP_SPOTS) ok(Array.isArray(L.spots[s]), L.id + ' spot ' + s);
    ok(L.meta && L.meta.crates && Object.keys(L.meta.crates).length === 3, L.id + ' 三個箱子');
  }
  eq(taipei.kind, 'map', 'taipei kind');
  eq(dip.size, [144, 144], 'dip 畫布 144×144');
  eq(dip.safe, [10, 134], 'dip 安全區');
  // SPEC-v2 §2 鏡頭表
  eq([dip.cameras.full.y, dip.cameras.full.h], [0, 144], 'full');
  eq([dip.cameras.reward.y, dip.cameras.reward.h], [22, 112], 'reward');
  eq([dip.cameras.strip.y, dip.cameras.strip.h], [74, 40], 'strip');
  eq([dip.cameras.stripS.y, dip.cameras.stripS.h], [86, 28], 'stripS');
  eq(dip.cameras.full.anchor, 'bottom', 'full 從牆頂裁');
});

section('熱點 id 唯一、動作對得上', () => {
  for (const [f, L] of [['dip.json', dip], ['basement.json', basement], ['taipei.json', taipei]]) {
    const r = CS.checkLayout(L, 'shops/' + f, lib, cards, content);
    const ids = r.hotIds;
    eq(ids.length, new Set(ids).size, f + ' 熱點 id 唯一');
    eq(r.problems, [], f + ' layout 問題');
  }
  const r = CS.checkLayout(dip, 'shops/dip.json', lib, cards, content);
  for (const id of ['door', 'now', 'poster-event', 'booth', 'counter', 'cat', 'owner', 'crate-jazz', 'crate-tw', 'crate-noise']) ok(r.hotIds.includes(id), 'dip 有熱點 ' + id);
  eq(r.hotIds.filter(h => h.startsWith('rack:')).length, 18, '牆上 18 張唱片都是熱點');
  // 故意做壞：重複 id、超出畫布的 spot 要被抓到
  const broken = JSON.parse(JSON.stringify(dip));
  broken.hotspots.push({ id: 'cat', rect: [1, 1, 2, 2], label: '重複', action: 'cat' });
  broken.spots.duelP = [150, 112];
  const rb = CS.checkLayout(broken, 'shops/dip.json', lib, cards, content);
  ok(rb.problems.some(p => /重複/.test(p)), '抓得到重複熱點 id', rb.problems);
  ok(rb.problems.some(p => /duelP.*畫布外/.test(p)), '抓得到畫布外的 spot', rb.problems);
});

section('spots 都在畫布內、門外的人在門口開口裡', () => {
  for (const L of [dip, basement, taipei]) {
    const [W, H] = L.size;
    for (const [k, s] of Object.entries(L.spots)) ok(s[0] >= 0 && s[0] < W && s[1] >= 0 && s[1] < H, L.id + ' spot ' + k + ' 在畫布內', s);
  }
  const door = dip.props.find(p => p.id === 'door');
  for (const k of ['out', 'q1', 'q2']) {
    const s = dip.spots[k];
    ok(s[2] === true, k + ' 在門外');
    ok(s[0] >= door.x && s[0] < door.x + door.w && s[1] <= door.y + door.h, k + ' 站在門的開口裡', s);
  }
  // 他＝左、你＝右；兩人的腳都在對決橫條裡
  ok(dip.spots.duelE[0] < dip.spots.duelP[0], '他在左你在右');
  for (const c of ['strip', 'stripS']) for (const k of ['duelE', 'duelP']) {
    const cam = dip.cameras[c], y = dip.spots[k][1];
    ok(y <= cam.y + cam.h - 1 && y - 12 >= cam.y, c + ' 看得到 ' + k + ' 全身');
  }
  // 挖箱（B12）：crateP 在箱子後面（箱子正面比腳底低，腿被擋住），而且就在三個箱子的 x 範圍內
  const crates = dip.props.filter(p => p.type === 'crate');
  const x0 = Math.min(...crates.map(c => c.x)), x1 = Math.max(...crates.map(c => c.x + c.w));
  const cp = dip.spots.crateP;
  ok(cp[0] > x0 && cp[0] < x1, 'crateP 在箱子前後的 x 範圍', [cp, x0, x1]);
  ok(crates.every(c => c.y > cp[1]), 'crateP 的腳在箱子正面後面', cp);
  // 對決時你不會被箱子擋住
  ok(dip.spots.duelP[0] + 5 < x0, 'duelP 不跟箱子重疊');
});

section('舊 POS 別名表齊全（SPEC-v2 §5.2）', () => {
  const want = {
    'p.door': 'door', 'p.browse': 'browse', 'p.pay': 'pay', 'p.leaving': 'leave', 'p.atdoor': 'atdoor', 'p.duel': 'duelP', 'p.map': 'map',
    'o.counter': 'counter', 'o.aisle': 'aisle', 'o.frontleft': 'frontleft', 'o.dig1': 'dig1', 'o.dig2': 'dig2', 'o.dig3': 'dig3', 'o.between': 'between',
    'f.out': 'out', 'f.door': 'door', 'f.in': 'in', 'f.duel': 'duelE', 'f.near': 'near', 'f.visit': 'visit', 'q.q1': 'q1', 'q.q2': 'q2'
  };
  for (const [k, v] of Object.entries(want)) eq(lib.ALIAS[k], v, 'alias ' + k);
  for (const [k, v] of Object.entries(lib.ALIAS)) { ok(dip.spots[v], 'dip 有 ' + v + '（' + k + '）'); ok(basement.spots[v], 'basement 有 ' + v + '（' + k + '）'); }
  // ui.js v1 用過的每個 POS 名稱都對得到（從 ui.js 的 POS 表抓）
  const ui = fs.readFileSync(path.join(LAB, 'ui.js'), 'utf8');
  const m = /var POS = \{([\s\S]*?)\n  \};/.exec(ui);
  if (m) {
    const groups = [...m[1].matchAll(/(\w):\s*\{([^}]*)\}/g)];
    for (const g of groups) for (const k of [...g[2].matchAll(/'?(\w+)'?:\s*\[/g)].map(x => x[1])) ok(lib.ALIAS[g[1] + '.' + k] || dip.spots[k], 'v1 POS ' + g[1] + '.' + k + ' 有對應');
  }
});

section('矮螢幕鏡頭規則（fitCamera，SPEC-v2 §2）', () => {
  const F = lib.Stage.fitCamera, full = dip.cameras.full, reward = dip.cameras.reward;
  const at = (vh, pm, dpr = 2, dev = 6) => ({ dpr, dev, avail: vh - 32 - pm });
  eq(F(full, at(664, 130)), { y: 0, h: 144, dev: null }, '390×664 title：整張');
  eq(F(full, at(664, 200)), { y: 0, h: 144, dev: null }, '390×664 map：整張（432 剛好）');
  eq(F(full, at(548, 130)), { y: 16, h: 128, dev: null }, '375×548 title：從牆頂裁到 128 列');
  eq(F(full, at(548, 150)), { y: 22, h: 122, dev: null }, '375×548 scene：122 列');
  eq(F(full, at(548, 200)), { y: 18, h: 126, dev: 5 }, '375×548 map：裁不夠就降到 ×2.5');
  eq(F(reward, at(664, 260)), { y: 22, h: 112, dev: null }, '390×664 reward：336 高整段放得下');
  eq(F(reward, at(548, 260)), { y: 32, h: 102, dev: 5 }, '375×548 reward：×2.5 再從牆頂裁');
  const r3 = F(full, at(640, 200, 3, 8));   // 360×640 DPR 3：寬度倍率 ×2.667
  ok(r3.h >= full.minH && r3.y + r3.h === 144, '360×640 map：腳永遠留著', r3);
  eq(F(dip.cameras.strip, at(548, 0)), { y: 74, h: 40, dev: null }, 'strip 沒有裁切規則');
  // 怎麼裁都留著地板與腳（anchor bottom）
  for (const vh of [480, 520, 548, 600, 640, 664, 700, 844]) for (const pm of [130, 150, 200, 260]) {
    const r = F(full, at(vh, pm));
    ok(r.y + r.h === 144 && r.h >= full.minH, 'full ' + vh + '/' + pm + ' 腳在', r);
  }
  eq(lib.Stage.pickCamera('strip', dip.cameras, 548), 'stripS', '548 高自動換 stripS');
  eq(lib.Stage.pickCamera('strip', dip.cameras, 664), 'strip', '664 高用 strip');
  eq(lib.Stage.pickCamera('full', dip.cameras, 400), 'full', 'full 不換');
});

section('像素字與標籤放得下', () => {
  const P = lib.DipShop.Painter({ fillRect() {} }, lib.DipShop.DEFAULT_PAL);
  eq(P.textW('NOISE'), 20, 'NOISE 20 格（N 用 4 格寬，不會讀成 MOISE）');
  eq(P.textW('JAZZ'), 15, 'JAZZ 15 格');
  for (const c of dip.props.filter(p => p.type === 'crate')) ok(P.textW(c.label) <= c.w - 2, c.id + ' 標籤放得進箱子正面', [P.textW(c.label), c.w]);
  for (const ch of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') ok(lib.DipShop.GLYPH[ch] && lib.DipShop.GLYPH[ch].length % 5 === 0, '字 ' + ch);
});

section('比例：所有東西跟小人同一個格子', () => {
  const r = CS.runChecks();
  const s = r.stats['dip.json'];
  for (const c of s.crates) ok(c.h <= CS.CHAR_H, c.id + ' 高 ' + c.h + ' ≤ 小人 ' + CS.CHAR_H);
  const counter = dip.props.find(p => p.type === 'counter');
  ok(counter.h < CS.CHAR_H, '櫃檯到小人胸口');
  const rack = dip.props.find(p => p.type === 'wallRack');
  ok(rack.cell === 10 && rack.records.length === 18, '牆上 18 張、每張 10 格');
  ok(!dip.props.some(p => p.type === 'bench'), '唱片箱直接放地上（不再墊高到比門還高）');
  ok(dip.maxScale === 3, '倍率上限 ×3');
});

section('index.json 與台北地圖預告', () => {
  eq(index.map, 'shops/taipei.json', 'map');
  eq(index.shops.map(s => s.id + ':' + s.status), ['dip:open', 'basement:debug'], '本店開、地下室只在 debug');
  const pins = taipei.props.filter(p => p.type === 'pin');
  eq(pins.filter(p => !p.locked).map(p => p.id), ['pin-dip'], '只有本店圖釘開著');
  ok(pins.filter(p => p.locked).every(p => p.hot.label === '？？？（還沒開）' && p.hot.action === 'locked'), '其他圖釘：？？？（還沒開）');
  ok(taipei.fictional === true, '地圖是示意');
});

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { fails.forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
