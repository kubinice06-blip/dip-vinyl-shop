// game-lab/test/shop.test.mjs — 像素店 layout 與舞台純邏輯的測試。
//   node game-lab/test/shop.test.mjs        # 有失敗 exit 1
// 本店 dip＝斜俯視 3/4（店主選的路線 P2，layout.projection 'oblique34'）：292×322 美術格、人＝16×16 小人 ×3（48 格）。
// 測：check-shops 全綠、schema、熱點（id 唯一、本店該有的都有、牆上唱片）、spots（畫布內、門外的人在門洞裡、他左你右、橫條看得到全身）、
//     走位（繞過家具、每個 spot 從門口與櫃檯都走得到）、舊 POS 別名、矮螢幕鏡頭規則（fitCamera 細格子版）、對決鏡頭自動換 stripS、
//     像素字寬度（箱子標籤放得下）、比例（人明顯比箱子桌、櫃檯、唱盤台高；耳機在桌面高度）、唱盤區幾何、index.json 與台北地圖。
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
const DS = lib.DipShop, KS = dip.spriteScale, PERSON = 16 * KS;
const propById = id => dip.props.find(p => p.id === id);

section('check-shops 全綠（schema、熱點、spots、別名、卡池、圖釘、比例、走位）', () => {
  const r = CS.runChecks();
  eq(r.problems, [], 'check-shops problems');
});

section('schema：本店＝斜俯視 3/4（P2）', () => {
  eq(dip.kind, 'shop', 'kind');
  eq(dip.projection, 'oblique34', 'projection');
  eq(dip.size, [292, 322], '畫布 292×322 美術格');
  eq(KS, 3, '小人 ×3（16×16 → 48 格）');
  eq(PERSON, 48, '人 48 格高（1.70 m）');
  ok(Math.abs(PERSON / dip.pxPerM - 1.7) < 0.01, '48 格＝1.70 m', PERSON / dip.pxPerM);
  for (const c of CS.O34_CAMERAS) ok(dip.cameras[c], 'camera ' + c);
  for (const s of CS.SHOP_SPOTS) ok(Array.isArray(dip.spots[s]), 'spot ' + s);
  eq([dip.cameras.full.y, dip.cameras.full.h], [0, 322], 'full＝整間店');
  eq([dip.cameras.strip.y, dip.cameras.strip.h], [228, 90], 'strip＝唱盤區橫條');
  eq([dip.cameras.stripS.y, dip.cameras.stripS.h], [256, 62], 'stripS＝矮螢幕橫條（375 寬 ≤ 80 CSS px，跟 v3 一樣高）');
  ok(Math.round(dip.cameras.stripS.h * 375 / 292) <= 80, 'stripS 在 375 寬不比舊版高（挑唱片面板不被擠出捲動）');
  eq(dip.cameras.full.anchor, 'bottom', 'full 從牆頂裁（唱盤區留著）');
  ok(dip.meta && dip.meta.crates && Object.keys(dip.meta.crates).length === 3, '三個箱子');
  ok(!dip.props.some(p => /rug/i.test(p.type)), '沒有地毯（店主）');
  ok(!dip.bg, '沒有背景圖：全部是程式畫的');
  // 地下室（格子版）照舊
  eq(basement.kind, 'shop', 'basement kind');
  for (const c of CS.SHOP_CAMERAS) ok(basement.cameras[c], 'basement camera ' + c);
});

section('熱點：id 唯一、本店該有的都有、牆上的唱片可以點', () => {
  for (const [f, L] of [['dip.json', dip], ['basement.json', basement], ['taipei.json', taipei]]) {
    const r = CS.checkLayout(L, 'shops/' + f, lib, cards, content);
    eq(r.hotIds.length, new Set(r.hotIds).size, f + ' 熱點 id 唯一');
    eq(r.problems, [], f + ' layout 問題');
  }
  const r = CS.checkLayout(dip, 'shops/dip.json', lib, cards, content);
  for (const id of CS.O34_HOTS) ok(r.hotIds.includes(id), 'dip 有熱點 ' + id);
  const racks = r.hotIds.filter(h => h.startsWith('rack:'));
  eq(racks.length, 24, '牆上 14＋高櫃 2＋靠牆矮櫃 8 張唱片都是熱點');
  ok(racks.every(h => cards[h.slice(5)]), '每張都在卡池（點了開唱片資訊）');
  // 熱點產生器跟 layout 一樣：牆上第一排的位置
  const ledge = propById('rack-a'), hs = DS.O34.PROPS.ledge.hots(ledge, { card: id => cards[id] });
  eq(hs[0].rect, [47, 17, 12, 12], '牆上第一張的熱點');
  eq(hs[0].action, 'wall-record:' + ledge.cards[0], '牆上唱片＝唱片資訊');
  // 櫃檯上的子熱點：正在放、店貓
  const ct = DS.O34.PROPS.counter.hots(propById('counter'), { card: id => cards[id] });
  eq(ct.map(h => h.id), ['now', 'cat'], '櫃檯上：正在放、店貓');
  ok(ct.every(h => h.pri > 0), '子熱點比櫃檯優先');
  // 故意做壞：重複 id、超出畫布的 spot、站在家具裡要被抓到
  const broken = JSON.parse(JSON.stringify(dip));
  broken.hotspots.push({ id: 'cat', rect: [1, 1, 2, 2], label: '重複', action: 'cat' });
  broken.spots.duelP = [300, 112];
  broken.spots.browse = [120, 140];
  const rb = CS.checkLayout(broken, 'shops/dip.json', lib, cards, content);
  ok(rb.problems.some(p => /重複/.test(p)), '抓得到重複熱點 id', rb.problems);
  ok(rb.problems.some(p => /duelP.*畫布外/.test(p)), '抓得到畫布外的 spot', rb.problems);
  ok(rb.problems.some(p => /browse.*家具裡/.test(p)), '抓得到站在箱子桌裡的 spot', rb.problems);
});

section('spots：門外的人在門洞裡、他左你右、橫條看得到全身', () => {
  const [W, H] = dip.size;
  for (const [k, s] of Object.entries(dip.spots)) ok(s[0] >= 0 && s[0] < W && s[1] >= 0 && s[1] < H, 'spot ' + k + ' 在畫布內', s);
  const door = propById('door');
  for (const k of ['out', 'q1', 'q2']) {
    const s = dip.spots[k];
    ok(s[2] === true, k + ' 在門外');
    ok(s[0] >= door.x && s[0] < door.x + door.w && s[1] <= door.y + door.h, k + ' 站在門洞裡', s);
  }
  ok(dip.spots.duelE[0] < dip.spots.duelP[0], '他在左你在右');
  for (const c of ['strip', 'stripS']) for (const k of ['duelE', 'duelP']) {
    const cam = dip.cameras[c], y = dip.spots[k][1];
    ok(y <= cam.y + cam.h - 1 && y - 15 * KS >= cam.y, c + ' 看得到 ' + k + ' 全身');
  }
  ok(dip.spots.ref[1] - 15 * KS >= dip.cameras.strip.y, 'strip 看得到老闆裁判全身');
  // 唱盤台在兩人內側（朝對手那側），人不擋到台
  const dE = propById('deck-e'), dP = propById('deck-p');
  ok(dE.side === 'e' && dP.side === 'p' && dE.x < dP.x, '他左白台、你右黑台');
  ok(dip.spots.duelE[0] + 5 * KS <= dE.x + 1, '他在白台左邊', [dip.spots.duelE, dE.x]);
  ok(dip.spots.duelP[0] - 5 * KS >= dP.x + dP.w - 1, '你在黑台右邊', [dip.spots.duelP, dP.x + dP.w]);
  // 挖箱：站在箱子前面、x 在箱子範圍內
  const jazz = propById('crate-jazz'), tw = propById('crate-tw');
  for (const k of ['dig1', 'crateP']) ok(dip.spots[k][1] > jazz.y && dip.spots[k][0] >= jazz.x && dip.spots[k][0] <= tw.x + 42, k + ' 在爵士／台灣箱前面', dip.spots[k]);
  ok(dip.spots.dig2[1] > tw.y && dip.spots.dig2[0] >= tw.x, 'dig2 在台灣箱前面');
  // 老闆在櫃檯後面（腳比櫃檯前緣後面）
  const ct = propById('counter');
  ok(dip.spots.counter[1] < ct.y - ct.d && dip.spots.counter[0] > ct.x && dip.spots.counter[0] < ct.x + ct.w, '老闆站在櫃檯後面', dip.spots.counter);
});

section('走位：繞過家具，從門口、櫃檯到每個 spot 都走得到', () => {
  const obs = DS.navObstacles(dip);
  ok(obs.length >= 15, '家具都有地面範圍', obs.length);
  const inside = (p, r) => p[0] > r[0] && p[0] < r[0] + r[2] && p[1] > r[1] && p[1] < r[1] + r[3];
  const clear = (a, b) => !obs.some(r => !inside(a, r) && !inside(b, r) && DS.segHitsRect(a, b, r));
  const route = (from, to) => [from].concat(DS.navRoute(dip, from, to, obs));
  const okRoute = (pts) => pts.every((p, i) => i === 0 || clear(pts[i - 1], p));
  // 直線會穿過中島的兩條：門口 → 你的唱盤區、櫃檯 → 裁判
  const a = dip.spots.door.slice(0, 2), b = dip.spots.duelP.slice(0, 2);
  ok(!clear(a, b), '門口到 duelP 的直線會穿過中島（要繞）');
  const r1 = route(a, b); ok(r1.length > 2 && okRoute(r1), '門口 → duelP 繞過中島', r1);
  const c = dip.spots.counter.slice(0, 2), d = dip.spots.ref.slice(0, 2);
  const r2 = route(c, d); ok(r2.length > 2 && okRoute(r2), '櫃檯 → 裁判 從櫃檯左端繞出來', r2);
  for (const [k, s] of Object.entries(dip.spots)) if (!s[2]) { ok(okRoute(route(a, s.slice(0, 2))), '門口 → ' + k); ok(okRoute(route(c, s.slice(0, 2))), '櫃檯 → ' + k); }
  // 線段與矩形
  ok(DS.segHitsRect([0, 5], [10, 5], [4, 0, 2, 10]), '穿過');
  ok(!DS.segHitsRect([0, 5], [3, 5], [4, 0, 2, 10]), '沒碰到');
});

section('舊 POS 別名表齊全（SPEC-v2 §5.2）', () => {
  const want = {
    'p.door': 'door', 'p.browse': 'browse', 'p.pay': 'pay', 'p.leaving': 'leave', 'p.atdoor': 'atdoor', 'p.duel': 'duelP', 'p.map': 'map',
    'o.counter': 'counter', 'o.aisle': 'aisle', 'o.frontleft': 'frontleft', 'o.dig1': 'dig1', 'o.dig2': 'dig2', 'o.dig3': 'dig3', 'o.between': 'between',
    'f.out': 'out', 'f.door': 'door', 'f.in': 'in', 'f.duel': 'duelE', 'f.near': 'near', 'f.visit': 'visit', 'q.q1': 'q1', 'q.q2': 'q2'
  };
  for (const [k, v] of Object.entries(want)) eq(lib.ALIAS[k], v, 'alias ' + k);
  for (const [k, v] of Object.entries(lib.ALIAS)) { ok(dip.spots[v], 'dip 有 ' + v + '（' + k + '）'); ok(basement.spots[v], 'basement 有 ' + v + '（' + k + '）'); }
});

section('矮螢幕鏡頭規則（fitCamera 細格子版：先從牆頂裁到 minH，再不夠才把倍率每次降 8%）', () => {
  const F = lib.Stage.fitCamera, full = dip.cameras.full, reward = dip.cameras.reward;
  const at = (vh, pm, w = 390, dpr = 3) => ({ dpr, dev: Math.min(1.5 * dpr, w * dpr / 292), avail: vh - 32 - pm, fine: true });
  eq(F(full, at(664, 130)), { y: 0, h: 322, dev: null }, '390×664 title：整間店');
  eq(F(full, at(664, 200)), { y: 0, h: 322, dev: null }, '390×664 今晚來客：整間店');
  eq(F(full, at(664, 260)), { y: 44, h: 278, dev: null }, '390×664 面板高：從牆頂裁');
  eq(F(full, at(548, 130, 375)), { y: 22, h: 300, dev: null }, '375×548 title：裁 22 列');
  const m = F(full, at(548, 200, 375));
  ok(m.y + m.h === 322 && m.h >= full.minH && m.dev && m.dev < at(548, 200, 375).dev, '375×548 今晚來客：裁到 minH 再降倍率', m);
  eq(F(reward, at(664, 260)), { y: 44, h: 278, dev: null }, '390×664 reward');
  eq(F(dip.cameras.strip, at(548, 0)), { y: 228, h: 90, dev: null }, 'strip 沒有裁切規則');
  for (const vh of [480, 520, 548, 600, 640, 664, 700, 844]) for (const pm of [130, 150, 200, 260]) for (const w of [360, 375, 390]) {
    const r = F(full, at(vh, pm, w));
    ok(r.y + r.h === 322 && r.h >= full.minH, 'full ' + w + '×' + vh + '/' + pm + ' 唱盤區與腳都在', r);
  }
  eq(lib.Stage.pickCamera('strip', dip.cameras, 548), 'stripS', '548 高自動換 stripS');
  eq(lib.Stage.pickCamera('strip', dip.cameras, 664), 'strip', '664 高用 strip');
  eq(lib.Stage.pickCamera('full', dip.cameras, 400), 'full', 'full 不換');
});

section('像素字與標籤放得下（斜俯視 3×5 字）', () => {
  const P = DS.OPainter({ ctx: null, k: 1, cx: 0, cy: 0, meas: null });
  eq(P.pwidth('NOISE'), 20, 'NOISE 20 格（N 用 4 格寬，不會讀成 MOISE）');
  eq(P.pwidth('JAZZ'), 15, 'JAZZ 15 格');
  for (const c of dip.props.filter(p => p.type === 'binTable' && p.label && !/[^\x00-\x7f]/.test(p.label))) ok(P.pwidth(c.label) + 4 <= c.cols * 13 + 3, c.id + ' 標籤放得進箱子正面', [P.pwidth(c.label), c.cols]);
  for (const ch of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') ok(DS.O34.FONT[ch], '字 ' + ch);
});

section('比例：人明顯比家具高；耳機掛在桌面高度', () => {
  const r = CS.runChecks(), s = r.stats['dip.json'];
  eq(s.charH, PERSON, '人 48 格');
  for (const c of s.crates) ok(c.h < PERSON * 0.8, c.id + ' 高 ' + c.h + ' < 人的 0.8');
  const ct = propById('counter'); ok(ct.h + ct.d < PERSON, '櫃檯到人的胸口');
  for (const id of ['deck-e', 'deck-p']) { const d = propById(id); ok(d.h + d.d < PERSON, id + ' 比人矮'); }
  const desk = propById('booth'), hookM = (desk.h - 1) / dip.pxPerM;
  ok(hookM > 0.55 && hookM < 0.9, '耳機掛勾離地 ' + hookM.toFixed(2) + ' m（桌面高度）');
  ok(dip.maxScale >= 1.3, '390 寬 1 格≈1.336 CSS px 不被上限擋住');
});

section('唱盤區幾何', () => {
  const D = dip.duel;
  ok(D.deckE[0] < D.clash[0] && D.clash[0] < D.deckP[0], '相撞點在兩座台中間');
  ok(D.rug[1] > D.clash[1], '落點在相撞點下面（地板上）');
  const dE = propById('deck-e'), dP = propById('deck-p'), cE = DS.O34.PROPS.deckStand.center(dE), cP = DS.O34.PROPS.deckStand.center(dP);
  ok(Math.abs(cE[0] - D.deckE[0]) <= 1 && Math.abs(cE[1] - D.deckE[1]) <= 1, 'duel.deckE＝白台轉盤中心', [cE, D.deckE]);
  ok(Math.abs(cP[0] - D.deckP[0]) <= 1 && Math.abs(cP[1] - D.deckP[1]) <= 1, 'duel.deckP＝黑台轉盤中心', [cP, D.deckP]);
  ok(D.arc && D.arc.low < D.arc.high, '弧高：低弧丟、高弧回家');
  ok(dip.props.some(p => p.type === 'duelfx' && p.layer === 'fx'), '特效層');
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
