/* chars.js — DipLabChars：原版 16×16 Q 版小人（dip-character.js 捏角色＋roguelike.html 的 SPR），加姿勢、加零件、照原樣畫。
 *
 * 店主 2026-11-07：「人物維持原本的可愛q版風格 類似寶可夢黃版的人 但細節更多」「寧可原本的人物還比較可愛」
 *                  「可自訂的人物造型也可以多增加更豐富」「整體風格要接近老gba像素風」
 *   → 臉、比例、每一格都跟原版一樣（16×16 格、大頭短身、兩顆豆豆眼）；放進 P2 店裡一律整數 ×3＝48 美術格高，跟 P2 的人同高。
 *     GBA 修飾（可關）：外圍 1 美術格深色描邊＋每塊顏色一階陰影（只動 3×3 的右緣／下緣那一條，正中間那一格永遠是原色）。
 *
 * 座標：小人格（sprite px）＝原版 16×16 的一格；×3 後 1 小人格＝3 美術格（art px）。腳底中點＝原版第 8 欄左緣、第 15 列上緣。
 *       預設朝右（flip＝朝左）。帽沿、單邊的包、丟唱片那隻手（畫面右邊那隻）都跟著翻。
 *
 * API（window.DipLabChars；Node 用 require 也拿得到）
 *   render(ctx, spec, pose, frame, x, y, opts) → { x, y, w, h, anchors }
 *       (x, y)＝腳底中點（ctx 座標）。opts：
 *         scale   ctx px／小人格，預設 3（ctx 以美術格為單位時）；P2 裝置解析度就給 3*k。3 的倍數或 ≥6 → 美術格模式（含 GBA 修飾），
 *                 其他（1、2、4、5）→ 原版平面像素（沒有描邊）。
 *         flip    朝左；back 背面；outline／shade（預設 true）；plain:true＝兩個都關（＝原版一模一樣）
 *         tint    受傷閃色：'#ff3030' 或 { color, a }；sil 剪影色（整個人塗成一色）；alpha；shadow（預設 true，地上的橢圓影子）
 *         wear    臨時穿戴（例：{ hat:'phones' } 試聽機戴上耳機），不改 spec
 *       anchors（ctx 座標）：foot 腳底、head 頭頂（含帽子；名牌、泡泡貼這）、face 臉、chest 胸口（被打中的點）、
 *                            hand 前手（丟唱片那隻）、handB 後手、held 手上東西的中心（丟、舉、拿著）、seat 坐姿屁股
 *   compose(spec, pose, frame, opts) → { w, h, data(RGBA Uint8ClampedArray), ax, ay, anchors, unit:'art'|'sprite' }（Node 也能跑；anchors 為相對腳底的美術格）
 *   toCanvas(spec, pose, frame, opts) → canvas（1:1；.ax .ay）；toDataURL(...)
 *   runs(spec, pose, frame, opts) → [[列, x0, x1, 'rgb()']…]（同色一段一段；自己用 fillRect 畫，例如 P2 的 P.r）
 *   rows(spec, pose, frame, { flip, back }) → { rows:[16 字串…], pal:{字:色}, ax, ay }（小人格平面圖，舊 P.sprite／pixArtHTML 用得上）
 *   svg(spec, size, { pose, frame, crop:'full'|'head'|'bust', flip }) → '<svg …>'（HTML 頭像；原版平面）
 *   anchor(spec, pose, frame, name, { flip, back, scale }) → [dx, dy]（相對腳底，ctx 單位）
 *   npc(id) → spec：男子 man／copycat／already／needle／skip／broke／buyer／label／critic／boss／owner，
 *                   舊 SPR 鍵 e0…e7／boss／guard／digger／heretic／owner，店裡閒逛的客人 girl／cust2／dude／regular
 *   fromDipChar(avatar) → spec（dip-character.js 的 {head,hair,shirt,pants,skin}，畫出來跟 avatarRows 一格不差）
 *   toDipChar(spec) → avatar | null（舊格式表達得了才回傳）
 *   random(seed, { base }) → spec（同 seed 同一個人）；normalize(spec)；isSpec(x)
 *   parts → 零件目錄 { skin, hair, hairColor, hat, glasses, facial, top, bottom, neck, bag, color, shoesColor, glassesColor }，每項 { id, label[, hex] }
 *   SECOND → { hat, top, bag }：哪幾款有第二色；DEFAULT → 預設 spec（＝原版預設小人）；DEFAULTS → 每款的招牌色
 *   spec 參數也可以直接給：npc id 字串（'e0'、'owner'…）、舊捏角色物件、roguelike SPR 的字母圖陣列（認得出來的話）
 *   POSES → { idle:2, walk:2, throw:2, hurt:2, ko:1, cheer:2, dig:2, hold:1, point:1, sit:1, talk:2 }
 *       idle 呼吸（第 2 格上身沉 1 美術格）、walk 兩步（抬一隻腳、另一邊手前擺）、throw 0 舉到臉旁蓄力／1 手伸直丟出、
 *       hurt 往後仰（0／1 抖）、ko 倒地、cheer 雙手舉高（1 跳起來）、dig 彎腰翻箱（1 抽出一張）、hold 雙手拿在胸前、
 *       point 手伸直指（老闆舉旗）、sit 坐著、talk 說話比手勢
 *   ARM／P2POSE → 舊 shop.js 的手勢、P2 原型的 pose 名稱對到 [pose, frame]
 *   cast() → 全部 npc id；legacyParity() → 瀏覽器裡有 dip-character.js 時，核對抄過來的資料跟原檔一致
 *
 * spec（缺的補預設；顏色值＝調色盤 id，舊的單字母 k g r b w e d n p o y c t u v m s 都照原色；'auto'＝那一款的預設色）
 *   { skin, hair, hairColor, hat, hatColor, hat2Color, glasses, glassesColor, facial, facialColor,
 *     top, topColor, top2Color, bottom, bottomColor, shoesColor, neck, neckColor, bag, bagColor, bag2Color }
 *
 * 規則：只掛 window.DipLabChars；dip-character.js 的 PIX_PAL／SPR_BODY／AVATAR_HEADS 是另一支 classic script 的頂層 const，
 *       這裡只用 typeof 讀（legacyParity），自己的資料另外取名（LP／LBODY／LHEADS），不重複宣告。
 */
(function (root, factory) {
  var api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.DipLabChars = api;
})(typeof self !== 'undefined' ? self : (typeof globalThis !== 'undefined' ? globalThis : this), function (root) {
  'use strict';

  // ===================================================================== 原版資料（抄自 dip-character.js；legacyParity() 會對照原檔）
  var LP = { k: '#111', g: '#b8860b', r: '#c11628', b: '#1f5fae', w: '#fff', e: '#d8d8d8', d: '#888', n: '#2e7d52', p: '#6a3fa0', o: '#e0851c', y: '#f0c75e', s: '#e8b48c', c: '#3fb6c9', t: '#c68642', u: '#8d5524', v: '#f6dcc4', m: '#e75480' };
  var LBODY = ['....TTTTTTTT....', '...TTTTTTTTTT...', '...sTTTTTTTTs...', '...sTTTTTTTTs...', '....TTTTTTTT....', '....LLLLLLLL....', '....LLL..LLL....', '....kkk..kkk....', '................'];
  var LHEADS = {
    neat: ['................', '.....HHHHHH.....', '....HHHHHHHH....', '....HssssssH....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'],
    bob: ['................', '.....HHHHHH.....', '....HHHHHHHH....', '....HHHHHHHH....', '....HskssksH....', '....HssssssH....', '.....ssssss.....'],
    spike: ['....H.H..H.H....', '....HHHHHHHH....', '....HHHHHHHH....', '....HssssssH....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'],
    long: ['................', '.....HHHHHH.....', '....HHHHHHHH....', '...HHssssssHH...', '...HHskssksHH...', '...HssssssssH...', '.....ssssss.....'],
    cap: ['................', '.....HHHHHH.....', '..HHHHHHHHHH....', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'],
    ballcap: ['................', '.....HHHHHH.....', '....HHHHHHHHHH..', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'],
    beanie: ['................', '.....HHHHHH.....', '....HHHHHHHH....', '....HssssssH....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'],
    beret: ['................', '......HHHH......', '....HHHHHHHH....', '....kssssssk....', '....ekkeekke....', '....ssssssss....', '.....ssssss.....'],
    fedora: ['................', '.....HHHHHH.....', '.....HHHHHH.....', '...HHHHHHHHHH...', '....ssksskss....', '....ssssssss....', '.....ssssss.....'],
    phones: ['.....gggggg.....', '.....HHHHHH.....', '....HHHHHHHH....', '...gHssssssHg...', '...gssksskssg...', '....ssssssss....', '.....ssssss.....']
  };
  var LDEFAULT = { head: 'neat', hair: 'k', shirt: 'b', pants: 'k', skin: 's' };
  function legacyRows(av) {   // = dip-character.js avatarRows（測試用、也給 legacyParity 比對）
    av = Object.assign({}, LDEFAULT, av || {});
    var h = LHEADS[av.head] || LHEADS.neat;
    function ok(v, d) { return (typeof v === 'string' && LP[v]) ? v : d; }
    var hr = ok(av.hair, 'k'), sk = ok(av.skin, 's'), sh = ok(av.shirt, 'b'), pt = ok(av.pants, 'k');
    var rows = h.map(function (r) { return r.replace(/H/g, hr); }).concat(LBODY.map(function (r) { return r.replace(/T/g, sh).replace(/L/g, pt); }));
    return rows.map(function (r) { return r.replace(/s/g, sk); });
  }
  // roguelike.html 的 SPR（~L1378–1426）原樣抄過來（sprRows 的結果），測試逐格對照 npc() 畫出來的
  function sprRows(head, shirt, pants, patch) {
    var rows = head.concat(LBODY.map(function (r) { return r.replace(/T/g, shirt).replace(/L/g, pants); }));
    if (patch) Object.keys(patch).forEach(function (i) { rows[+i] = patch[i]; });
    return rows;
  }
  var LSPR = {
    e0: sprRows(['.....gggggg.....', '.....kkkkkk.....', '....kkkkkkkk....', '...gksssssskg...', '...gssksskssg...', '....ssssssss....', '.....ssssss.....'], 'w', 'b'),
    e1: sprRows(['................', '.....nnnnnn.....', '....nnnnnnnn....', '....nssssssn....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'e', 'k', { 7: '....rrrrrrrr....' }),
    e2: sprRows(['................', '.....bbbbbb.....', '....bbbbbbbbbb..', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'w', 'k'),
    e3: sprRows(['................', '......pppp......', '....pppppppp....', '....kssssssk....', '....ekkeekke....', '....ssssssss....', '.....ssssss.....'], 'e', 'k'),
    e4: sprRows(['................', '................', '.....ssssss.....', '....ssssssss....', '....ssksskss....', '....sdssssds....', '.....dddddd.....'], 'w', 'd', { 8: '...wggggggggw...', 9: '...sggggggggs...', 10: '...sggggggggs...', 11: '....gggggggg....' }),
    e5: sprRows(['................', '.....kkkkkk.....', '....kkkkkkkk....', '...kksssssskk...', '...kksksskskk...', '...kssssssssk...', '.....ssssss.....'], 'k', 'k'),
    e6: sprRows(['................', '.....oooooo.....', '.....oooooo.....', '...oooooooooo...', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'p', 'k'),
    e7: sprRows(['....y.y..y.y....', '....yyyyyyyy....', '....kkkkkkkk....', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'p', 'p'),
    boss: sprRows(['.....kkkkkk.....', '.....kkkkkk.....', '.....kkkkkk.....', '...kkkkkkkkkk...', '....ssssssss....', '....sskssyys....', '.....ssssss.....'], 'k', 'k', { 7: '....kkwrrwkk....', 8: '...kkkwrrwkkk...' }),
    guard: sprRows(['................', '.....kkkkkk.....', '....kkkkkkkk....', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'b', 'k'),
    digger: sprRows(['................', '.....nnnnnn.....', '..nnnnnnnnnn....', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'n', 'd'),
    heretic: sprRows(['....k.k..k.k....', '....kkkkkkkk....', '....kkkkkkkk....', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'r', 'k'),
    owner: sprRows(['................', '.....dddddd.....', '....dddddddd....', '....dssssssd....', '....ekkeekke....', '....sdssssds....', '.....dddddd.....'], 'w', 'd', { 8: '...wnnnnnnnnw...', 9: '...snnnnnnnns...', 10: '...snnnnnnnns...', 11: '....nnnnnnnn....' })
  };

  // ===================================================================== 調色盤（原版 17 色＋新色；id → hex）
  var PAL = {};
  Object.keys(LP).forEach(function (k) { PAL[k] = LP[k]; });
  var EXTRA = {
    // 膚色
    rose: '#f9d9cb', honey: '#dc9f68', deep: '#5c3a25',
    // 髮色
    choco: '#3b2418', auburn: '#8e3524', plat: '#efe6c6', ash: '#a39e94', lilac: '#b9a4dc',
    // 布料
    cream: '#efe5cb', char: '#3a3a43', wine: '#7a1d31', brick: '#b5532f', mustard: '#d4a93a', khaki: '#c3aa7b', moss: '#6c7337',
    forest: '#24583b', mint: '#9ad6b9', sky: '#8fc2e8', denim: '#4a6d9c', navy: '#25335c', lavender: '#b8a3dd', pink: '#f4a7bf'
  };
  Object.keys(EXTRA).forEach(function (k) { PAL[k] = EXTRA[k]; });
  var LABEL = {
    k: '黑', g: '金', r: '紅', b: '藍', w: '白', e: '淺灰', d: '灰', n: '綠', p: '紫', o: '橘', y: '黃', s: '小麥', c: '水藍', t: '焦糖', u: '咖啡', v: '白皙', m: '桃紅',
    rose: '粉嫩', honey: '蜜糖', deep: '深褐', choco: '深棕', auburn: '紅棕', plat: '白金', ash: '灰褐', lilac: '淡紫',
    cream: '米白', char: '炭灰', wine: '酒紅', brick: '磚紅', mustard: '芥末黃', khaki: '卡其', moss: '橄欖綠', forest: '墨綠', mint: '薄荷',
    sky: '天藍', denim: '丹寧', navy: '海軍藍', lavender: '薰衣草', pink: '粉紅'
  };
  var SKIN_LABEL = { rose: '粉嫩', v: '白皙', s: '小麥', honey: '蜜糖', t: '焦糖', u: '咖啡', deep: '深褐' };
  var HAIR_LABEL = { w: '銀白', y: '金', d: '灰', u: '棕', o: '橘', b: '藍', c: '水藍', n: '綠', m: '桃紅', r: '紅', p: '紫' };
  var SKINS = ['rose', 'v', 's', 'honey', 't', 'u', 'deep'];
  var HAIRCOLS = ['k', 'choco', 'u', 'auburn', 'o', 'y', 'plat', 'ash', 'd', 'w', 'r', 'm', 'p', 'lilac', 'b', 'c', 'n'];
  var CLOTHS = ['w', 'cream', 'e', 'd', 'char', 'k', 'r', 'wine', 'brick', 'o', 'mustard', 'y', 'g', 'khaki', 't', 'u', 'moss', 'n', 'forest', 'mint', 'c', 'sky', 'b', 'denim', 'navy', 'p', 'lavender', 'm', 'pink'];
  var SHOECOLS = ['k', 'w', 'u', 'r', 'b', 'e', 'y', 'n'];
  var GLASSCOLS = ['k', 'e', 'd', 'g', 'u', 'r', 'b', 'c', 'm'];
  var OUTLINE = '#1d1712';   // P2 的描邊色

  // 色彩小工具
  function hex6(h) { h = String(h).replace('#', ''); if (h.length === 3) h = h.replace(/./g, '$&$&'); return '#' + h.toLowerCase(); }
  function rgb(h) { h = hex6(h).slice(1); var n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function hexOf(r, g, b) { function c(v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); } return '#' + c(r) + c(g) + c(b); }
  function mix(a, b, t) { var A = rgb(a), B = rgb(b); return hexOf(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t); }
  function lum(h) { var c = rgb(h); return (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255; }
  var shadeCache = {};
  // 一階陰影：往暗紫偏（像素畫的冷影）；很亮的白／米色壓多一點才看得出來
  function shadeOf(h) { if (shadeCache[h]) return shadeCache[h]; var L = lum(h); return (shadeCache[h] = mix(h, '#2a1838', L > 0.85 ? 0.2 : 0.3)); }
  function colorHex(id) { if (!id) return null; if (PAL[id]) return hex6(PAL[id]); if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(id)) return hex6(id); return null; }

  // ===================================================================== 零件
  // 每一層：{ y:起始列, rows:[16 字串] }（欄 0–15 對原版；'.'＝不畫）。字母：
  //   角色色：H 頭髮、s 皮膚、A 帽、a 帽的暗面、B 帽第二色、G 鏡框、F 鬍子、f 鬍渣／剃邊（膚＋髮混色）、T 上衣、U 上衣第二色、L 褲裙、S 鞋、N 頸飾、M 包、Q 包第二色
  //   固定色：k g r b w e d n p o y c t u v m（原版調色盤）
  function L(y, rows) { return { y: y, rows: rows }; }

  // 頭（光頭＋臉）：原版每種頭在這底下都長一樣（眼睛在第 4 列第 6、9 欄）
  var HEAD_BASE = L(2, ['.....ssssss.....', '....ssssssss....', '....ssksskss....', '....ssssssss....', '.....ssssss.....']);

  // 髮型：f＝臉前面那層、b＝身體後面那層（長髮垂到肩後）、bk＝背面時頭髮蓋到第幾列（-1＝光頭）、bb＝背面多畫的（馬尾）
  var HAIR = [
    { id: 'neat', label: '西裝頭', legacy: 1, f: L(1, ['.....HHHHHH.....', '....HHHHHHHH....', '....H......H....']), bk: 5 },
    { id: 'bob', label: '妹妹頭', legacy: 1, f: L(1, ['.....HHHHHH.....', '....HHHHHHHH....', '....HHHHHHHH....', '....H......H....', '....H......H....']), bk: 5 },
    { id: 'spike', label: '刺蝟頭', legacy: 1, f: L(0, ['....H.H..H.H....', '....HHHHHHHH....', '....HHHHHHHH....', '....H......H....']), bk: 5 },
    { id: 'long', label: '長髮', legacy: 1, f: L(1, ['.....HHHHHH.....', '....HHHHHHHH....', '...HH......HH...', '...HH......HH...', '...H........H...']), bk: 7 },
    { id: 'sidepart', label: '旁分', f: L(1, ['.....HHHHHHH....', '....HHHHHHHHH...', '....HHHH...H....']), bk: 5 },
    { id: 'curtain', label: '中分', f: L(1, ['.....HHHHHH.....', '....HHHHHHHH....', '....HHH..HHH....', '....H......H....', '....H......H....']), bk: 5 },
    { id: 'buzz', label: '平頭', f: L(2, ['.....HHHHHH.....', '....H......H....']), bk: 5 },
    { id: 'mohawk', label: '龐克頭', f: L(-1, ['.......HH.......', '......HHHH......', '......HHHH......', '.....fHHHHf.....', '....f......f....']), bk: -1, bb: L(-1, ['.......HH.......', '......HHHH......', '......HHHH......', '.....fHHHHf.....', '....ffHHHHff....', '....ffffffff....']) },
    { id: 'bald', label: '光頭', f: null, bk: -1 },
    { id: 'mullet', label: '鯔魚頭', f: L(1, ['.....HHHHHH.....', '....HHHHHHHH....', '....H......H....']), b: L(5, ['...HH......HH...', '...HH......HH...', '...HH......HH...']), bk: 7 },
    { id: 'bun', label: '包包頭', f: L(-1, ['.......HH.......', '......HHHH......', '.....HHHHHH.....', '....HHHHHHHH....', '....H......H....']), bk: 5 },
    { id: 'ponytail', label: '馬尾', f: L(1, ['.....HHHHHH.....', '....HHHHHHHH....', '....H......H....']), b: L(1, ['................', '..rHH...........', '.HH.............', '.HH.............', '.H..............', '..H.............']), bk: 5, bb: L(2, ['.......rr.......', '.......HH.......', '.......HH.......', '.......HH.......', '.......HH.......', '........H.......']) },
    { id: 'twintails', label: '雙馬尾', f: L(1, ['.....HHHHHH.....', '....HHHHHHHH....', '...rH......Hr...']), b: L(3, ['..HH........HH..', '.HH..........HH.', '.HH..........HH.', '.HH..........HH.', '..H..........H..', '..H..........H..']), bk: 5 },
    { id: 'bangs', label: '公主切', f: L(1, ['.....HHHHHH.....', '....HHHHHHHH....', '...HHHHHHHHHH...', '...HH......HH...', '...HH......HH...', '...HH......HH...']), b: L(7, ['...HH......HH...', '...HH......HH...', '...H........H...']), bk: 9 },
    { id: 'wavy', label: '大波浪', f: L(1, ['.....HHHHHH.....', '....HHHHHHHH....', '...HHH....HHH...', '...HH......HH...', '..HHH......HHH..', '..HH........HH..']), b: L(7, ['..HHH......HHH..', '...HH......HH...', '...H........H...']), bk: 9 },
    { id: 'afro', label: '爆炸頭', f: L(-1, ['.....HHHHHH.....', '...HHHHHHHHHH...', '..HHHHHHHHHHHH..', '..HHHHHHHHHHHH..', '..HHH......HHH..', '..HH........HH..', '...H........H...']), bk: 6 },
    { id: 'curly', label: '捲髮', f: L(0, ['.....HH..HH.....', '....HHHHHHHH....', '...HHHHHHHHHH...', '...HHH....HHH...', '...H........H...']), bk: 5 }
  ];
  // 帽子：cut＝第幾列（含）以上的頭髮被帽子蓋掉；dc／dc2＝這一款的預設色（hatColor 沒指定時、捏人換款時）；back＝背面圖
  var HATS = [
    { id: 'none', label: '不戴' },
    { id: 'cap', label: '棒球帽', legacy: 1, dc: 'r', f: L(1, ['.....AAAAAA.....', '....AAAAAAAAAA..']), cut: 2, back: L(1, ['.....AAAAAA.....', '....AAAAAAAA....']) },
    { id: 'capback', label: '反戴帽', legacy: 1, dc: 'n', f: L(1, ['.....AAAAAA.....', '..AAAAAAAAAA....']), cut: 2, back: L(1, ['.....AAAAAA.....', '....AAAAAAAA....', '......AAAA......']) },
    { id: 'trucker', label: '卡車帽', dc: 'navy', dc2: 'w', f: L(1, ['.....ABBBBA.....', '....AAAAAAAAAA..']), cut: 2, back: L(1, ['.....AAAAAA.....', '....AAAAAAAA....']) },
    { id: 'beanie', label: '毛帽', legacy: 1, dc: 'n', f: L(1, ['.....AAAAAA.....', '....AAAAAAAA....', '....A......A....']), cut: 3 },
    { id: 'pompom', label: '毛球帽', dc: 'mustard', dc2: 'w', f: L(-1, ['.......BB.......', '.....AAAAAA.....', '....AAAAAAAA....', '....aaaaaaaa....']), cut: 2 },
    { id: 'bucket', label: '漁夫帽', dc: 'khaki', f: L(0, ['.....AAAAAA.....', '.....AAAAAA.....', '...AAAAAAAAAA...', '...A........A...']), cut: 2 },
    { id: 'beret', label: '貝雷帽', legacy: 1, dc: 'p', f: L(1, ['......AAAA......', '....AAAAAAAA....']), cut: 2 },
    { id: 'fedora', label: '紳士帽', legacy: 1, dc: 'o', f: L(1, ['.....AAAAAA.....', '.....AAAAAA.....', '...AAAAAAAAAA...']), cut: 3 },
    { id: 'tophat', label: '高禮帽', dc: 'k', dc2: 'r', f: L(-2, ['.....AAAAAA.....', '.....AAAAAA.....', '.....AAAAAA.....', '.....BBBBBB.....', '...AAAAAAAAAA...']), cut: 2 },
    { id: 'bandana', label: '頭巾', dc: 'r', dc2: 'w', f: L(1, ['.....AABAAA.....', '....ABAAABAAA...', '............AA..']), cut: 2 },
    { id: 'phones', label: '耳機', legacy: 1, dc: 'g', f: L(0, ['.....AAAAAA.....', '................', '................', '...A........A...', '...A........A...']), cut: -9 },
    { id: 'bigphones', label: '大耳罩', dc: 'k', dc2: 'r', f: L(0, ['.....AAAAAA.....', '....A......A....', '...A........A...', '..BB........BB..', '..BB........BB..']), cut: -9 },
    { id: 'neckphones', label: '掛脖耳機', dc: 'k', dc2: 'r', f: L(6, ['....A......A....', '....BB....BB....']), cut: -9, neck: 1 },
    { id: 'crown', label: '小皇冠', dc: 'y', f: L(0, ['....A.A..A.A....', '....AAAAAAAA....']), cut: 1 }
  ];
  // 眼鏡（眼睛在第 4 列第 6、9 欄）
  var GLASSES = [
    { id: 'none', label: '不戴' },
    { id: 'classic', label: '老派眼鏡', legacy: 1, dc: 'e', f: L(4, ['....GkkGGkkG....']) },
    { id: 'round', label: '細框', dc: 'g', f: L(4, ['....GekGGkeG....']) },
    { id: 'square', label: '方框', dc: 'u', f: L(3, ['.....GG..GG.....', '....GekGGkeG....', '.....GG..GG.....']) },
    { id: 'browline', label: '眉框', dc: 'k', f: L(3, ['.....GG..GG.....', '....GekGGkeG....']) },
    { id: 'sunglasses', label: '墨鏡', dc: 'k', f: L(3, ['.....GG..GG.....', '....GwkGGwkG....']) },
    { id: 'monocle', label: '單片眼鏡', dc: 'y', f: L(3, ['........GGG.....', '........G.G.....', '........GGGG....', '...........G....']) }
  ];
  var FACIAL = [
    { id: 'none', label: '沒有' },
    { id: 'beard', label: '落腮鬍', legacy: 1, f: L(5, ['.....F....F.....', '.....FFFFFF.....']) },
    { id: 'mustache', label: '八字鬍', f: L(5, ['......FFFF......']) },
    { id: 'goatee', label: '山羊鬍', f: L(5, ['......FFFF......', '.......FF.......']) },
    { id: 'stubble', label: '鬍渣', f: L(5, ['.....f....f.....', '.....ffffff.....']) },
    { id: 'sideburns', label: '鬢角', f: L(4, ['....F......F....', '....F......F....']) }
  ];
  // 上衣（第 7–11 列；sl＝袖子幾格：0 背心、1 短袖＝原版、2 長袖）；hood＝第 6 列頭後面露出來的帽子；back＝背面
  var TOPS = [
    { id: 'tee', label: 'T 恤', legacy: 1, dc: 'b', sl: 1, f: L(7, ['....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....']) },
    { id: 'graphic', label: '印花 T', dc: 'w', dc2: 'k', sl: 1, f: L(7, ['....TTTTTTTT....', '....TTTUUTTT....', '....TTUrrUTT....', '....TTTUUTTT....', '....TTTTTTTT....']), back: 'plain' },
    { id: 'tank', label: '背心', dc: 'w', sl: 0, f: L(7, ['....sTTTTTTs....', '....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....']) },
    { id: 'stripe', label: '條紋衫', dc: 'navy', dc2: 'w', sl: 1, f: L(7, ['....TTTTTTTT....', '....UUUUUUUU....', '....TTTTTTTT....', '....UUUUUUUU....', '....TTTTTTTT....']) },
    { id: 'hoodie', label: '帽 T', dc: 'd', dc2: '~', sl: 2, hood: L(6, ['....T......T....']), f: L(7, ['....TTwTTwTT....', '....TTwTTwTT....', '....TTTTTTTT....', '....TUUUUUUT....', '....TTTTTTTT....']), back: L(7, ['....TUUUUUUT....', '....TTUUUUTT....', '....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....']) },
    { id: 'sweater', label: '毛衣', dc: 'mustard', dc2: '~', sl: 2, f: L(7, ['....TTUUUUTT....', '....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....', '....UUUUUUUU....']), back: L(7, ['....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....', '....UUUUUUUU....']) },
    { id: 'flannel', label: '格紋襯衫', dc: 'r', dc2: 'k', sl: 2, f: L(7, ['....TTUTTUTT....', '....TTUTTUTT....', '....UUUUUUUU....', '....TTUTTUTT....', '....TTUTTUTT....']) },
    { id: 'jacket', label: '外套', dc: 'denim', dc2: 'w', sl: 2, f: L(7, ['....TTUUUUTT....', '....TTTUUTTT....', '....TTTUUTTT....', '....TTTUUTTT....', '....TTTUUTTT....']), back: 'plain' },
    { id: 'suit', label: '西裝', legacy: 1, dc: 'k', dc2: 'r', sl: 1, f: L(7, ['....TTwUUwTT....', '....TTwUUwTT....', '....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....']), back: 'plain' },
    { id: 'apron', label: '圍裙', legacy: 1, dc: 'w', dc2: 'g', sl: 1, f: L(7, ['....TTTTTTTT....', '....UUUUUUUU....', '....UUUUUUUU....', '....UUUUUUUU....', '....UUUUUUUU....']), back: L(7, ['....TTTTTTTT....', '....TTTTTTTT....', '....TTTUUTTT....', '....UUUTTUUU....', '....TTTTTTTT....']) }
  ];
  // 褲裙（第 12–13 列；裙子會蓋到 14）。skirt＝走路時腳不抬（裙子遮著）；over＝畫在上衣上面的（吊帶）
  var BOTTOMS = [
    { id: 'pants', label: '長褲', legacy: 1, dc: 'k', f: L(12, ['....LLLLLLLL....', '....LLL..LLL....']) },
    { id: 'jeans', label: '破洞牛仔褲', dc: 'denim', f: L(12, ['....LLLLLLLL....', '....LsL..LsL....']) },
    { id: 'slim', label: '窄管褲', dc: 'k', f: L(12, ['....LLLLLLLL....', '.....LL..LL.....']) },
    { id: 'shorts', label: '短褲', dc: 'khaki', f: L(12, ['....LLLLLLLL....', '....sss..sss....']) },
    { id: 'skirt', label: '短裙', dc: 'navy', skirt: 1, f: L(12, ['....LLLLLLLL....', '...LLLLLLLLLL...']) },
    { id: 'longskirt', label: '長裙', dc: 'wine', skirt: 1, f: L(12, ['....LLLLLLLL....', '...LLLLLLLLLL...', '...LSSLLLLSSL...']) },
    { id: 'overalls', label: '吊帶褲', dc: 'denim', f: L(12, ['....LLLLLLLL....', '....LLL..LLL....']), over: L(7, ['.....L....L.....', '.....L....L.....', '.....LLLLLL.....', '.....LLLLLL.....', '....LLLLLLLL....']) }
  ];
  var NECKS = [
    { id: 'none', label: '沒有' },
    { id: 'scarf', label: '圍巾', legacy: 1, dc: 'r', f: L(7, ['....NNNNNNNN....']) },
    { id: 'longscarf', label: '長圍巾', dc: 'mustard', f: L(7, ['....NNNNNNNN....', '.........N......', '.........N......', '.........N......']) },
    { id: 'bowtie', label: '領結', dc: 'r', f: L(7, ['......NkkN......']) },
    { id: 'necklace', label: '項鍊', dc: 'g', f: L(7, ['.....N....N.....', '......NNNN......', '.......NN.......']) }
  ];
  // 包：f 正面、back 背面
  var BAGS = [
    { id: 'none', label: '沒有' },
    { id: 'recordbag', label: '唱片袋', dc: 'w', dc2: 'k', f: L(7, ['............Q...', '.............kk.', '.............MMM', '.............MQM', '.............MMM', '.............MMM']) },
    { id: 'tote', label: '帆布袋', dc: 'cream', dc2: 'r', f: L(7, ['...Q............', '..Q.............', 'MMM.............', 'MQM.............', 'MMM.............', 'MMM.............']) },
    { id: 'crossbag', label: '斜背包', dc: 'u', dc2: 'k', f: L(7, ['..........Q.....', '.........Q......', '........Q.......', '...MMMMQ........', '...MMMM.........']), back: L(7, ['.....Q..........', '......Q.........', '.......Q........', '........QMMMM...', '.........MMMM...']) },
    { id: 'backpack', label: '後背包', dc: 'o', dc2: 'k', f: L(7, ['.....M....M.....', '.....M....M.....', '.....M....M.....']), back: L(6, ['.....MMMMMM.....', '....MMMMMMMM....', '....MMMMMMMM....', '....MMMMMMMM....', '....MQQQQQQM....', '....MMMMMMMM....']) }
  ];
  function byId(list) { var o = {}; list.forEach(function (x) { o[x.id] = x; }); return o; }
  var HAIR_ = byId(HAIR), HATS_ = byId(HATS), GLASSES_ = byId(GLASSES), FACIAL_ = byId(FACIAL), TOPS_ = byId(TOPS), BOTTOMS_ = byId(BOTTOMS), NECKS_ = byId(NECKS), BAGS_ = byId(BAGS);

  // 只給 NPC 的整顆頭（原版就長這樣、零件拼不出來的）：傳說藏家（高禮帽壓低、臉長一格、單片眼鏡）
  var HEADS = {
    boss: { f: L(0, ['.....kkkkkk.....', '.....kkkkkk.....', '.....kkkkkk.....', '...kkkkkkkkkk...', '....ssssssss....', '....sskssyys....', '.....ssssss.....']),
      back: L(0, ['.....kkkkkk.....', '.....kkkkkk.....', '.....kkkkkk.....', '...kkkkkkkkkk...', '....kkkkkkkk....', '....kkkkkkkk....', '.....ssssss.....']) }
  };

  // ===================================================================== spec
  var DEFAULT = { skin: 's', hair: 'neat', hairColor: 'k', hat: 'none', hatColor: 'auto', hat2Color: 'auto', glasses: 'none', glassesColor: 'auto',
    facial: 'none', facialColor: 'auto', top: 'tee', topColor: 'b', top2Color: 'auto', bottom: 'pants', bottomColor: 'k', shoesColor: 'k',
    neck: 'none', neckColor: 'auto', bag: 'none', bagColor: 'auto', bag2Color: 'auto' };
  var FIELDS = Object.keys(DEFAULT);
  var PARTF = { hair: HAIR_, hat: HATS_, glasses: GLASSES_, facial: FACIAL_, top: TOPS_, bottom: BOTTOMS_, neck: NECKS_, bag: BAGS_ };
  function isLegacyAvatar(x) { return !!(x && typeof x === 'object' && !Array.isArray(x) && x.v !== 2 && x.top == null && x.hairColor == null && ('head' in x || 'shirt' in x || 'pants' in x)); }
  function isSpec(x) { return !!(x && typeof x === 'object' && !Array.isArray(x) && (x.v === 2 || x.top != null || x.hairColor != null || x.hair != null && PARTF.hair[x.hair] && !('shirt' in x))); }
  function okColor(v) { return v === 'auto' || !!colorHex(v); }
  function normalize(x) {
    if (typeof x === 'string') return npc(x);
    if (Array.isArray(x)) {   // 舊 shop.js 給的字母圖：認得出是哪一位 SPR 就換成那位
      var j = x.join('|'), hit = Object.keys(LSPR).filter(function (k) { return LSPR[k].join('|') === j; })[0];
      return hit ? npc(hit) : normalize({});
    }
    if (isLegacyAvatar(x)) return fromDipChar(x);
    x = (x && typeof x === 'object') ? x : {};
    var s = { v: 2 };
    FIELDS.forEach(function (k) {
      var v = x[k], d = DEFAULT[k];
      if (PARTF[k]) s[k] = (typeof v === 'string' && PARTF[k][v]) ? v : d;
      else s[k] = (typeof v === 'string' && okColor(v)) ? v : d;
    });
    if (typeof x.head === 'string' && HEADS[x.head]) s.head = x.head;
    if (!colorHex(s.skin)) s.skin = 's';
    if (!colorHex(s.hairColor)) s.hairColor = 'k';
    if (!colorHex(s.topColor)) s.topColor = 'b';
    if (!colorHex(s.bottomColor)) s.bottomColor = 'k';
    if (!colorHex(s.shoesColor)) s.shoesColor = 'k';
    return s;
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function S(o) { return normalize(Object.assign({}, o, { v: 2 })); }

  // 舊捏角色 → spec（畫出來跟 avatarRows 一格不差：avatarRows 先把 H 換髮色、最後把所有 s 換膚色，所以「顏色選 s」＝跟著膚色）
  var LEG_HEAD = {
    neat: { hair: 'neat' }, bob: { hair: 'bob' }, spike: { hair: 'spike' }, long: { hair: 'long' },
    cap: { hair: 'neat', hairK: 1, hat: 'capback' }, ballcap: { hair: 'neat', hairK: 1, hat: 'cap' },
    beanie: { hair: 'neat', hat: 'beanie' }, beret: { hair: 'neat', hairK: 1, hat: 'beret', glasses: 'classic' },
    fedora: { hair: 'neat', hat: 'fedora' }, phones: { hair: 'neat', hat: 'phones', hatG: 1 }
  };
  function fromDipChar(av) {
    av = Object.assign({}, LDEFAULT, (av && typeof av === 'object') ? av : {});
    function ok(v, d) { return (typeof v === 'string' && LP[v]) ? v : d; }
    var sk = ok(av.skin, 's');
    function c(v, d) { v = ok(v, d); return v === 's' ? sk : v; }
    var hr = c(av.hair, 'k'), m = LEG_HEAD[av.head] || LEG_HEAD.neat;
    var s = Object.assign({}, DEFAULT, { v: 2, skin: sk, hair: m.hair, hairColor: m.hairK ? 'k' : hr, topColor: c(av.shirt, 'b'), bottomColor: c(av.pants, 'k') });
    if (m.hat) { s.hat = m.hat; s.hatColor = m.hatG ? 'g' : hr; }
    if (m.glasses) { s.glasses = m.glasses; s.glassesColor = 'e'; }
    return s;
  }
  function toDipChar(spec) {
    var s = normalize(spec), heads = Object.keys(LHEADS);
    var ok = function (v) { return typeof v === 'string' && LP[v] && v !== 's'; };
    if (!ok(s.topColor) || !ok(s.bottomColor) || !(s.skin in LP)) return null;
    for (var i = 0; i < heads.length; i++) {
      var m = LEG_HEAD[heads[i]], hair = m.hat ? (m.hatG ? s.hairColor : s.hatColor) : s.hairColor;
      if (!ok(hair)) continue;
      var av = { head: heads[i], hair: hair, shirt: s.topColor, pants: s.bottomColor, skin: s.skin };
      if (sameRows(rows(s).rows, rows(fromDipChar(av)).rows) && JSON.stringify(rows(s).pal) === JSON.stringify(rows(fromDipChar(av)).pal)) return av;
    }
    return null;
  }
  function sameRows(a, b) { return a.join('|') === b.join('|'); }

  // ===================================================================== NPC（臉跟原版 SPR 一格不差；測試逐格比）
  var NPCS = {
    e0: { hair: 'neat', hairColor: 'k', hat: 'phones', hatColor: 'g', topColor: 'w', bottomColor: 'b' },                       // 音樂小白：耳機
    e1: { hair: 'neat', hairColor: 'k', hat: 'beanie', hatColor: 'n', neck: 'scarf', neckColor: 'r', topColor: 'e', bottomColor: 'k' }, // 文青同好：毛帽＋圍巾
    e2: { hair: 'neat', hairColor: 'k', hat: 'cap', hatColor: 'b', topColor: 'w', bottomColor: 'k' },                          // 社團學長：棒球帽
    e3: { hair: 'neat', hairColor: 'k', hat: 'beret', hatColor: 'p', glasses: 'classic', glassesColor: 'e', topColor: 'e', bottomColor: 'k' }, // 資深樂評：貝雷帽＋眼鏡
    e4: { hair: 'bald', hairColor: 'd', facial: 'beard', facialColor: 'd', top: 'apron', topColor: 'w', top2Color: 'g', bottomColor: 'd' }, // 二手店老闆
    e5: { hair: 'long', hairColor: 'k', topColor: 'k', bottomColor: 'k' },                                                     // 地下廠牌主理人：長髮全黑
    e6: { hair: 'neat', hairColor: 'k', hat: 'fedora', hatColor: 'o', topColor: 'p', bottomColor: 'k' },                       // 品味行家：紳士帽
    e7: { hair: 'neat', hairColor: 'k', hat: 'crown', hatColor: 'y', topColor: 'p', bottomColor: 'p' },                        // 品味之神：皇冠
    boss: { head: 'boss', hair: 'neat', hairColor: 'k', top: 'suit', topColor: 'k', top2Color: 'r', bottomColor: 'k' },       // 傳說藏家
    guard: { hair: 'neat', hairColor: 'k', topColor: 'b', bottomColor: 'k' },
    digger: { hair: 'neat', hairColor: 'k', hat: 'capback', hatColor: 'n', topColor: 'n', bottomColor: 'd' },
    heretic: { hair: 'spike', hairColor: 'k', topColor: 'r', bottomColor: 'k' },
    owner: { hair: 'neat', hairColor: 'd', glasses: 'classic', glassesColor: 'e', facial: 'beard', facialColor: 'd', top: 'apron', topColor: 'w', top2Color: 'n', bottomColor: 'd' }, // 唱片行老闆
    // 店裡閒逛的客人（P2 原型 girl／cust2／dude 的配色，原版畫法）
    girl: { skin: 'v', hair: 'long', hairColor: 'choco', top: 'tee', topColor: 'moss', bottom: 'pants', bottomColor: 'char', bag: 'tote', bagColor: 'cream', bag2Color: 'r' },
    cust2: { skin: 's', hair: 'neat', hairColor: 'choco', hat: 'cap', hatColor: 'forest', top: 'tee', topColor: 'navy', bottom: 'pants', bottomColor: 'khaki', shoesColor: 'k' },
    dude: { skin: 'honey', hair: 'neat', hairColor: 'k', hat: 'beanie', hatColor: 'char', top: 'flannel', topColor: 'brick', top2Color: 'k', bottom: 'pants', bottomColor: 'denim', shoesColor: 'w' },
    regular: { skin: 'v', hair: 'bun', hairColor: 'k', glasses: 'round', glassesColor: 'auto', top: 'stripe', topColor: 'navy', top2Color: 'w', bottom: 'skirt', bottomColor: 'k', bag: 'recordbag' }
  };
  var NPC_ALIAS = { man: 'e0', copycat: 'e1', already: 'e2', needle: 'e6', skip: 'e4', label: 'e5', critic: 'e3', god: 'e7', you: null };
  var NPC_AV = { broke: { head: 'cap', hair: 'u', shirt: 'r', pants: 'd', skin: 's' }, buyer: { head: 'fedora', hair: 'k', shirt: 'g', pants: 'k', skin: 't' } };
  function npc(id) {
    if (NPC_AV[id]) return fromDipChar(NPC_AV[id]);
    var k = NPC_ALIAS[id] || id, d = NPCS[k];
    return d ? S(d) : normalize({});
  }
  function cast() { return ['owner', 'man', 'copycat', 'already', 'needle', 'skip', 'broke', 'buyer', 'label', 'critic', 'boss', 'e7', 'guard', 'digger', 'heretic', 'girl', 'cust2', 'dude', 'regular']; }

  // ===================================================================== 顏色解析
  function resolver(s) {
    var tp = TOPS_[s.top] || TOPS_.tee, ht = HATS_[s.hat] || HATS_.none, gl = GLASSES_[s.glasses], nk = NECKS_[s.neck], bg = BAGS_[s.bag];
    function pick(v, dflt) { return colorHex(v === 'auto' ? dflt : v); }
    var C = {
      s: colorHex(s.skin) || LP.s,
      H: colorHex(s.hairColor) || LP.k,
      T: colorHex(s.topColor) || LP.b,
      L: colorHex(s.bottomColor) || LP.k,
      S: colorHex(s.shoesColor) || LP.k
    };
    C.F = pick(s.facialColor, s.hairColor) || C.H;
    C.f = mix(C.s, C.F, 0.38);
    C.A = pick(s.hatColor, ht.dc || 'b') || LP.b;
    C.a = mix(C.A, '#2a1838', lum(C.A) > 0.85 ? 0.18 : 0.26);
    C.B = pick(s.hat2Color, ht.dc2 || 'w') || LP.w;
    C.G = pick(s.glassesColor, (gl && gl.dc) || 'k') || LP.k;
    var u = s.top2Color === 'auto' ? (tp.dc2 || '~') : s.top2Color;
    C.U = u === '~' ? mix(C.T, '#2a1838', lum(C.T) > 0.85 ? 0.16 : 0.26) : (colorHex(u) || LP.w);
    C.N = pick(s.neckColor, (nk && nk.dc) || 'r') || LP.r;
    C.M = pick(s.bagColor, (bg && bg.dc) || 'cream') || LP.w;
    C.Q = pick(s.bag2Color, (bg && bg.dc2) || 'k') || LP.k;
    return function (ch) { return C[ch] || (LP[ch] ? hex6(LP[ch]) : null); };
  }
  // 陰影規則用的分類：0 不打陰影（深色、細節）、1 皮膚、2 頭髮、3 布料
  function clsOf(ch, hex) {
    if (!hex || lum(hex) < 0.13) return 0;
    if (ch === 's') return 1;
    if (ch === 'H' || ch === 'F' || ch === 'f') return 2;
    if (ch === 'G' || ch === 'e' && false) return 0;
    if ('TULASNMQBa'.indexOf(ch) >= 0) return 3;
    return ch === 'G' ? 0 : 4;   // 固定色小細節（皇冠、耳機、領帶、印花）：只在外緣打
  }

  // ===================================================================== 姿勢
  // 手（畫面右邊那隻＝前手；後手鏡射 c → 15−c）：從肩膀到手掌的格子。前 sl 格是袖子，其餘是皮膚，最後一格是手。
  var ARMS = {
    down: [[12, 8], [12, 9], [12, 10]],          // 原版
    swing: [[12, 8], [12, 9]],                   // 走路往前擺（手看起來縮短一格）
    out: [[12, 8], [13, 8], [14, 8]],            // 伸直（丟出、指）
    wind: [[12, 8], [13, 7], [13, 6], [13, 5]],  // 舉到臉旁蓄力（拿著唱片）
    up: [[12, 8], [13, 7], [13, 6], [14, 5]],    // 歡呼（往外上舉）
    flail: [[12, 8], [13, 9], [13, 10]],         // 被打中，手往外甩
    hold: [[12, 8], [12, 9], [11, 10]],          // 雙手拿在胸前
    dig: [[12, 8], [12, 9], [11, 10], [11, 11]], // 彎腰往前下伸
    digUp: [[12, 8], [12, 9], [11, 8]],          // 抽出一張舉起來
    gesture: [[12, 8], [13, 9], [13, 8]],        // 說話時比手勢（小臂舉起）
    wave: [[12, 8], [13, 7], [14, 6]]
  };
  var POSES = { idle: 2, walk: 2, throw: 2, hurt: 2, ko: 1, cheer: 2, dig: 2, hold: 1, point: 1, sit: 1, talk: 2 };
  var ARM = { wind: ['throw', 0], throw: ['throw', 1], show: ['hold', 0], up: ['cheer', 0], shield: ['hurt', 0], flag: ['point', 0], shrug: ['talk', 1], none: ['idle', 0] };
  var P2POSE = { stand: ['idle', 0], wind: ['throw', 0], throw: ['throw', 1], flag: ['point', 0], browse: ['dig', 0], hurt: ['hurt', 0] };
  function poseSetup(pose, frame) {
    var P = { R: 'down', Lf: 'down', legs: 'stand', up: [0, 0], head: [0, 0], hop: 0, ko: false, held: null };
    switch (pose) {
      case 'idle': if (frame === 1) P.up = [0, 1]; break;
      case 'walk': P.legs = frame ? 'stepR' : 'stepL'; if (frame) P.Lf = 'swing'; else P.R = 'swing'; break;
      case 'throw': P.R = frame ? 'out' : 'wind'; P.held = 'hand'; if (frame) P.up = [1, 0]; else P.up = [-1, 0]; break;
      case 'hurt': P.R = 'flail'; P.Lf = 'flail'; P.head = frame ? [-2, 0] : [-3, 0]; P.up = frame ? [-1, 0] : [-2, 0]; break;
      case 'ko': P.ko = true; break;
      case 'cheer': P.R = 'up'; P.Lf = 'up'; if (frame) P.hop = 3; break;
      case 'dig': P.head = [0, 3]; P.R = frame ? 'digUp' : 'dig'; P.Lf = 'dig'; P.held = frame ? 'hand' : null; break;
      case 'hold': P.R = 'hold'; P.Lf = 'hold'; P.held = 'chest'; break;
      case 'point': P.R = 'out'; P.held = 'hand'; break;
      case 'sit': P.up = [0, 3]; P.legs = 'sit'; break;
      case 'talk': P.R = frame ? 'wave' : 'gesture'; break;
    }
    return P;
  }

  // ===================================================================== 組合（小人格層）
  // op＝{ cells:[[c, r, ch]], dx, dy }（dx, dy 美術格）。回傳 { ops, pts:{ 名稱:[c+0.5, r+0.5] } }（pts 在小人格、未翻面）
  function layerCells(layer, out, filt) {
    if (!layer) return out;
    for (var i = 0; i < layer.rows.length; i++) {
      var row = layer.rows[i], r = layer.y + i;
      for (var c = 0; c < row.length; c++) { var ch = row[c]; if (ch !== '.' && ch !== ' ' && (!filt || filt(c, r, ch))) out.push([c, r, ch]); }
    }
    return out;
  }
  function build(s, pose, frame, back) {
    var P = poseSetup(pose, frame);
    var hair = HAIR_[s.hair] || HAIR_.neat, hat = HATS_[s.hat] || HATS_.none, top = TOPS_[s.top] || TOPS_.tee, bot = BOTTOMS_[s.bottom] || BOTTOMS_.pants;
    var gl = GLASSES_[s.glasses], fc = FACIAL_[s.facial], nk = NECKS_[s.neck], bg = BAGS_[s.bag], preset = s.head && HEADS[s.head];
    var cut = (hat && hat.f) ? hat.cut : -99, ops = [], pts = {};
    var up = P.up, hd = [P.up[0] + P.head[0], P.up[1] + P.head[1]];
    function op(cells, d) { if (cells.length) ops.push({ cells: cells, dx: d[0], dy: d[1] - P.hop }); }
    var noCut = function (c, r) { return r > cut; };
    // 1 頭髮後層（正面：在身體後面）＋帽 T 的帽子
    if (!back && hair.b && !preset) op(layerCells(hair.b, [], noCut), hd);
    if (!back && top.hood) op(layerCells(top.hood, []), up);
    // 2 腿＋鞋
    var lo = [], shoeRow = 14;
    function shoe(cs, row) { for (var c = cs; c < cs + 3; c++) lo.push([c, row, 'S']); }
    if (P.legs === 'sit') {
      shoe(4, 14); shoe(9, 14);
      if (bot.skirt) layerCells(L(13, [bot.f.rows[1]]), lo); else lo.push.apply(lo, [4, 5, 6, 7, 8, 9, 10, 11].map(function (c) { return [c, 13, 'L']; }));
    } else {
      var liftL = P.legs === 'stepL', liftR = P.legs === 'stepR';
      shoe(4, liftL ? 13 : shoeRow); shoe(9, liftR ? 13 : shoeRow);
      var bc = layerCells(bot.f, []);
      if (!bot.skirt && (liftL || liftR)) bc = bc.filter(function (x) { return !(x[1] === 13 && (liftL ? x[0] <= 7 : x[0] >= 8)); });
      lo = lo.concat(bot.skirt ? bc : bc);
      if (!bot.skirt) {   // 抬起來那隻：鞋子要在褲管前面（把那一列的鞋子再補一次在最上層）
        var lifted = lo.filter(function (x) { return x[2] === 'S' && x[1] === 13; }); lo = lo.filter(function (x) { return !(x[2] === 'S' && x[1] === 13); }).concat(lifted);
      }
    }
    // 鞋要在褲子後面（原版鞋在 14 列、褲子不到）；裙子長的會蓋過鞋（長裙自己畫鞋尖）
    var shoes = lo.filter(function (x) { return x[2] === 'S'; }), rest = lo.filter(function (x) { return x[2] !== 'S'; });
    if (bot.skirt) op(shoes.concat(rest), [0, 0]); else op(rest.concat(shoes), [0, 0]);
    // 3 上衣
    var torso = layerCells(back && top.back && top.back !== 'plain' ? top.back : (back && top.back === 'plain' ? L(7, ['....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....', '....TTTTTTTT....']) : top.f), []);
    if (P.legs === 'sit') { /* 坐下：上衣原樣，整個上身往下一格 */ }
    op(torso, up);
    if (bot.over) op(layerCells(bot.over, []), up);
    // 4 包、頸飾
    var bagL = bg && (back && bg.back ? bg.back : bg.f);
    if (bagL && !(back && bg.id === 'backpack')) op(layerCells(bagL, []), up);
    if (nk && nk.f) op(layerCells(back ? L(7, [nk.f.rows[0]]) : nk.f, []), up);
    // 5 手
    function arm(name, mirror) {
      var chain = ARMS[name] || ARMS.down, cells = [];
      for (var i = 0; i < chain.length; i++) {
        var c = mirror ? 15 - chain[i][0] : chain[i][0], r = chain[i][1];
        cells.push([c, r, i < top.sl ? 'T' : 's']);
      }
      var h = chain[chain.length - 1]; pts[mirror ? 'handB' : 'hand'] = [(mirror ? 15 - h[0] : h[0]) + 0.5, h[1] + 0.5, up];
      return cells;
    }
    op(arm(P.Lf, true), up); op(arm(P.R, false), up);
    if (back && bg && bg.id === 'backpack') op(layerCells(bg.back, []), up);
    // 6 頭
    var headC = [];
    if (preset) layerCells(back ? preset.back : preset.f, headC);
    else {
      layerCells(HEAD_BASE, headC, back ? null : null);
      if (back) headC = headC.map(function (x) { return x[2] === 'k' ? [x[0], x[1], 's'] : x; });
    }
    op(headC, hd);
    if (!preset) {
      if (back) {
        // 背面：頭髮蓋住後腦（光頭、龐克頭除外），長髮再往下蓋到背上
        var fill = [];
        if (hair.bk >= 0) {
          HEAD_BASE.rows.forEach(function (row, i) { var r = HEAD_BASE.y + i; if (r > hair.bk || r <= cut) return; for (var c = 0; c < 16; c++) if (row[c] !== '.') fill.push([c, r, 'H']); });
          for (var r2 = 7; r2 <= hair.bk; r2++) for (var c2 = 4; c2 <= 11; c2++) fill.push([c2, r2, 'H']);
        }
        op(fill, hd);
        if (hair.b) op(layerCells(hair.b, [], noCut), hd);
        op(layerCells(hair.f, [], noCut), hd);
        if (hair.bb) op(layerCells(hair.bb, [], noCut), hd);
      } else {
        if (fc && fc.f) op(layerCells(fc.f, []), hd);
        op(layerCells(hair.f, [], noCut), hd);
        if (gl && gl.f) op(layerCells(gl.f, []), hd);
      }
      if (hat && hat.f) op(layerCells(back && hat.back ? hat.back : hat.f, []), hat.neck ? up : hd);
    }
    // 錨點（小人格中心、未翻面；第三個值＝那一層的美術格位移）
    pts.face = [8, 4.5, hd]; pts.chest = [8, 9.5, up]; pts.foot = [8, 15, [0, 0]];
    pts.seat = [8, P.legs === 'sit' ? 13 : 12, [0, 0]];
    pts.held = P.held === 'chest' ? [8, 10, up] : P.held === 'hand' ? pts.hand : null;
    return { ops: ops, pts: pts, P: P };
  }

  // ===================================================================== 光柵化（美術格：1 小人格＝3×3）
  var C0 = -6, R0 = -6, GC = 28, GR = 25;          // 格子範圍：欄 −6…21、列 −6…18
  var BW = GC * 3 + 2, BH = GR * 3 + 2;            // 外框留 1 格給描邊
  function ax0(c) { return 1 + (c - C0) * 3; }
  function ay0(r) { return 1 + (r - R0) * 3; }
  var memo = {}, memoN = 0, MEMO_MAX = 600;
  function keyOf(s, pose, frame, o) { return JSON.stringify(s) + '|' + pose + '|' + frame + '|' + (o.flip ? 1 : 0) + (o.back ? 1 : 0) + (o.outline ? 1 : 0) + (o.shade ? 1 : 0) + '|' + (o.tint || '') + '|' + (o.sil || '') + '|' + o.mode; }
  function compose(spec, pose, frame, opts) {
    opts = opts || {};
    var s = normalize(opts.wear ? Object.assign({}, normalize(spec), opts.wear) : spec);
    pose = POSES[pose] ? pose : (ARM[pose] ? ARM[pose][0] : (P2POSE[pose] ? P2POSE[pose][0] : 'idle'));
    frame = ((frame | 0) % POSES[pose] + POSES[pose]) % POSES[pose];
    var plain = !!opts.plain, mode = opts.mode === 'sprite' ? 'sprite' : 'art';
    var tint = opts.tint ? (typeof opts.tint === 'string' ? opts.tint + '@0.45' : opts.tint.color + '@' + (opts.tint.a == null ? 0.45 : opts.tint.a)) : '';
    var o = { flip: !!opts.flip, back: !!opts.back && pose !== 'ko', outline: !plain && opts.outline !== false && mode === 'art', shade: !plain && opts.shade !== false && mode === 'art', tint: tint, sil: opts.sil || '', mode: mode };
    var key = keyOf(s, pose, frame, o);
    if (memo[key]) return memo[key];
    var res = mode === 'sprite' ? composeSprite(s, pose, frame, o) : composeArt(s, pose, frame, o);
    if (memoN > MEMO_MAX) { memo = {}; memoN = 0; }
    memo[key] = res; memoN++;
    return res;
  }
  // 小人格層 → 一張格子圖（倒地＝整張轉 90°）
  function cellsOf(s, pose, frame, o) {
    var B = build(s, pose === 'ko' ? 'idle' : pose, pose === 'ko' ? 0 : frame, o.back), col = resolver(s);
    var ops = B.ops.map(function (op) { return { dx: op.dx, dy: op.dy, cells: op.cells.map(function (x) { return [x[0], x[1], x[2], col(x[2])]; }) }; });
    var pts = {}; Object.keys(B.pts).forEach(function (k) { var p = B.pts[k]; if (p) pts[k] = [p[0], p[1], p[2] ? p[2][0] : 0, (p[2] ? p[2][1] : 0) - B.P.hop]; });
    if (pose === 'ko') {
      // 倒地：往後倒（頭朝背後＝左），整張格子逆時針轉 90°，躺在地上（最低一列＝第 14 列）
      var flat = [];
      ops.forEach(function (op) { op.cells.forEach(function (x) { flat.push(x); }); });
      var rot = function (c, r) { return [r + 1, (15 - c) + 2]; };
      ops = [{ dx: 0, dy: 0, cells: flat.map(function (x) { var q = rot(x[0], x[1]); return [q[0], q[1], x[2], x[3]]; }) }];
      var P2 = {}; Object.keys(pts).forEach(function (k) { var q = rot(pts[k][0] - 0.5, pts[k][1] - 0.5); P2[k] = [q[0] + 0.5, q[1] + 0.5, 0, 0]; });
      P2.foot = [8, 15, 0, 0]; P2.seat = [8, 13, 0, 0]; pts = P2;
    }
    if (o.flip) {
      ops.forEach(function (op) { op.dx = -op.dx; op.cells.forEach(function (x) { x[0] = 15 - x[0]; }); });
      Object.keys(pts).forEach(function (k) { pts[k][0] = 16 - pts[k][0]; pts[k][2] = -pts[k][2]; });
    }
    return { ops: ops, pts: pts };
  }
  function finishColor(hex, o) {
    if (o.sil) return hex6(o.sil);
    if (o.tint) { var t = o.tint.split('@'); return mix(hex, t[0], +t[1]); }
    return hex;
  }
  function composeArt(s, pose, frame, o) {
    var G = cellsOf(s, pose, frame, o), N = BW * BH;
    var colr = new Array(N), cls = new Uint8Array(N), ox = new Int16Array(N), oy = new Int16Array(N), chs = new Array(N);
    G.ops.forEach(function (op) {
      op.cells.forEach(function (x) {
        if (!x[3]) return;
        var X0 = ax0(x[0]) + op.dx, Y0 = ay0(x[1]) + op.dy, k = clsOf(x[2], x[3]);
        for (var yy = 0; yy < 3; yy++) for (var xx = 0; xx < 3; xx++) {
          var X = X0 + xx, Y = Y0 + yy; if (X < 0 || Y < 0 || X >= BW || Y >= BH) continue;
          var i = Y * BW + X; colr[i] = x[3]; cls[i] = k; ox[i] = X0; oy[i] = Y0; chs[i] = x[2];
        }
      });
    });
    var out = colr.slice();
    if (o.shade) {
      for (var Y = 0; Y < BH; Y++) for (var X = 0; X < BW; X++) {
        var i = Y * BW + X, c = colr[i], k = cls[i]; if (!c || !k) continue;
        var sx = X - ox[i], sy = Y - oy[i], hit = false;
        if (sx === 2) { var rc = X + 1 < BW ? colr[i + 1] : null; if (!rc) hit = true; }
        if (!hit && sy === 2) {
          var bi = i + BW, bc = Y + 1 < BH ? colr[bi] : null, bk = bc ? cls[bi] : 0;
          if (!bc) hit = k !== 4 || true;
          else if (bc !== c && bk !== 0) {
            if (k === 1) hit = bk === 3;                    // 下巴、手：只在落到衣服上時
            else if (k === 2) hit = bk === 1 || bk === 3;   // 頭髮：落到臉、衣服
            else if (k === 3) hit = bk !== 4 && !(chs[i] === 'T' && chs[bi] === 'U') && !(chs[i] === 'U' && chs[bi] === 'T'); // 布料：換塊的地方（同件衣服的花紋不打）
          }
        }
        if (hit) out[i] = shadeOf(c);
      }
    }
    if (o.outline) {
      var ol = out.slice();
      for (var Y2 = 0; Y2 < BH; Y2++) for (var X2 = 0; X2 < BW; X2++) {
        var j = Y2 * BW + X2; if (out[j]) continue;
        if ((X2 > 0 && out[j - 1]) || (X2 < BW - 1 && out[j + 1]) || (Y2 > 0 && out[j - BW]) || (Y2 < BH - 1 && out[j + BW])) ol[j] = OUTLINE;
      }
      out = ol;
    }
    // 裁到不透明的範圍
    var x0 = BW, y0 = BH, x1 = -1, y1 = -1;
    for (var q = 0; q < N; q++) if (out[q]) { var qx = q % BW, qy = (q / BW) | 0; if (qx < x0) x0 = qx; if (qx > x1) x1 = qx; if (qy < y0) y0 = qy; if (qy > y1) y1 = qy; }
    if (x1 < 0) { x0 = y0 = 0; x1 = y1 = 0; }
    var w = x1 - x0 + 1, h = y1 - y0 + 1, data = new Uint8ClampedArray(w * h * 4), hexes = [];
    for (var yy2 = 0; yy2 < h; yy2++) for (var xx2 = 0; xx2 < w; xx2++) {
      var src = out[(yy2 + y0) * BW + xx2 + x0]; if (!src) continue;
      var fcol = finishColor(src, o), cc = rgb(fcol), d = (yy2 * w + xx2) * 4;
      data[d] = cc[0]; data[d + 1] = cc[1]; data[d + 2] = cc[2]; data[d + 3] = 255;
    }
    var AX = ax0(8) - x0, AY = ay0(15) - y0;   // 腳底中點在這張圖裡的位置
    var anchors = {};
    Object.keys(G.pts).forEach(function (k) { var p = G.pts[k]; anchors[k] = [(ax0(0) + p[0] * 3 + p[2]) - x0 - AX, (ay0(0) + p[1] * 3 + p[3]) - y0 - AY]; });
    anchors.head = [0, -AY];
    anchors.foot = [0, 0];
    return { w: w, h: h, data: data, ax: AX, ay: AY, anchors: anchors, unit: 'art', px: function (x, y) { var v = out[(y + y0) * BW + x + x0]; return v ? finishColor(v, o) : null; } };
  }
  // 原版平面：1 小人格＝1 px，沒有描邊、陰影；姿勢的美術格位移四捨五入到格
  function composeSprite(s, pose, frame, o) {
    var G = cellsOf(s, pose, frame, o), grid = {}, minC = 99, minR = 99, maxC = -99, maxR = -99;
    G.ops.forEach(function (op) {
      var dc = Math.round(op.dx / 3), dr = Math.round(op.dy / 3);
      op.cells.forEach(function (x) { if (!x[3]) return; var c = x[0] + dc, r = x[1] + dr; grid[c + ',' + r] = x[3]; if (c < minC) minC = c; if (c > maxC) maxC = c; if (r < minR) minR = r; if (r > maxR) maxR = r; });
    });
    if (maxC < minC) { minC = maxC = minR = maxR = 0; }
    var w = maxC - minC + 1, h = maxR - minR + 1, data = new Uint8ClampedArray(w * h * 4);
    for (var r = minR; r <= maxR; r++) for (var c = minC; c <= maxC; c++) {
      var v = grid[c + ',' + r]; if (!v) continue; var cc = rgb(finishColor(v, o)), d = ((r - minR) * w + c - minC) * 4;
      data[d] = cc[0]; data[d + 1] = cc[1]; data[d + 2] = cc[2]; data[d + 3] = 255;
    }
    var AX = 8 - minC, AY = 15 - minR, anchors = {};
    Object.keys(G.pts).forEach(function (k) { var p = G.pts[k]; anchors[k] = [p[0] - 8 + p[2] / 3, p[1] - 15 + p[3] / 3]; });
    anchors.head = [0, -AY]; anchors.foot = [0, 0];
    return { w: w, h: h, data: data, ax: AX, ay: AY, anchors: anchors, unit: 'sprite', grid: grid, minC: minC, minR: minR };
  }

  // 原版 16×16 字母圖（每格一個字、配色表）：給 HTML 頭像、舊 P.sprite
  function rows(spec, pose, frame, opts) {
    opts = opts || {};
    var R = compose(spec, pose || 'idle', frame || 0, { mode: 'sprite', flip: opts.flip, back: opts.back, plain: true }), s = normalize(spec);
    var pal = {}, inv = {}, letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', n = 0, out = [];
    // 固定 16×16 框（原版的欄列），姿勢超出去的另外加寬
    var c0 = Math.min(0, R.minC), r0 = Math.min(0, R.minR), c1 = Math.max(15, R.minC + R.w - 1), r1 = Math.max(15, R.minR + R.h - 1);
    for (var r = r0; r <= r1; r++) {
      var line = '';
      for (var c = c0; c <= c1; c++) {
        var v = R.grid[c + ',' + r];
        if (!v) { line += '.'; continue; }
        if (!inv[v]) { var L0 = null; Object.keys(LP).some(function (k) { if (hex6(LP[k]) === v && !pal[k]) { L0 = k; return true; } return false; }); var ch = L0 || letters[n++]; while (pal[ch] && pal[ch] !== v) ch = letters[n++]; inv[v] = ch; pal[ch] = v; }
        line += inv[v];
      }
      out.push(line);
    }
    return { rows: out, pal: pal, ax: 8 - c0, ay: 15 - r0, spec: s };
  }
  function svg(spec, size, opts) {
    opts = opts || {};
    var R = rows(spec, opts.pose, opts.frame, opts), rs = R.rows;
    var top = opts.crop === 'head' ? 0 : 0, bot = opts.crop === 'head' ? 10 - (0) : (opts.crop === 'bust' ? 12 : rs.length);
    var r0 = Math.max(0, R.ay - 15 + top), r1 = Math.min(rs.length, R.ay - 15 + bot);
    if (opts.crop !== 'head' && opts.crop !== 'bust') { r0 = 0; r1 = rs.length; }
    var sub = rs.slice(r0, r1), w = sub[0] ? sub[0].length : 16, h = sub.length, rects = '';
    sub.forEach(function (row, y) {
      for (var x = 0; x < row.length;) {
        var ch = row[x]; if (ch === '.') { x++; continue; }
        var x2 = x; while (x2 < row.length && row[x2] === ch) x2++;
        rects += '<rect x="' + x + '" y="' + y + '" width="' + (x2 - x) + '" height="1" fill="' + R.pal[ch] + '"/>';
        x = x2;
      }
    });
    size = size || 32;
    return '<svg class="pixicon ' + (opts.cls || '') + '" width="' + size + '" height="' + Math.round(size * h / w) + '" viewBox="0 0 ' + w + ' ' + h + '" shape-rendering="crispEdges" aria-hidden="true">' + rects + '</svg>';
  }

  // ===================================================================== 畫到 canvas
  var hasDOM = typeof document !== 'undefined' && document.createElement;
  var cvCache = {}, cvN = 0;
  function toCanvas(spec, pose, frame, opts) {
    opts = opts || {};
    var R = compose(spec, pose, frame, opts);
    if (!hasDOM) return null;
    var key = R.__cvKey || (R.__cvKey = 'c' + (++cvN));
    var cv = cvCache[key];
    if (!cv) {
      cv = document.createElement('canvas'); cv.width = R.w; cv.height = R.h;
      var g = cv.getContext('2d'), id = g.createImageData(R.w, R.h); id.data.set(R.data); g.putImageData(id, 0, 0);
      cv.ax = R.ax; cv.ay = R.ay; cv.anchors = R.anchors;
      if (cvN > 900) { cvCache = {}; }
      cvCache[key] = cv;
    }
    var sc = opts.scale && opts.scale !== 1 ? opts.scale : 0;
    if (!sc) return cv;
    var big = document.createElement('canvas'); big.width = R.w * sc; big.height = R.h * sc;
    var g2 = big.getContext('2d'); g2.imageSmoothingEnabled = false; g2.drawImage(cv, 0, 0, big.width, big.height);
    big.ax = R.ax * sc; big.ay = R.ay * sc; return big;
  }
  // 同色連續的一段：[列, 起, 迄, 'rgb()']（快取在 compose 結果上）
  function runsOf(R) {
    if (R.__runs) return R.__runs;
    var out = [], d = R.data, w = R.w;
    for (var py = 0; py < R.h; py++) for (var px = 0; px < w;) {
      var i = (py * w + px) * 4; if (!d[i + 3]) { px++; continue; }
      var px2 = px + 1; while (px2 < w && d[(py * w + px2) * 4 + 3] && d[(py * w + px2) * 4] === d[i] && d[(py * w + px2) * 4 + 1] === d[i + 1] && d[(py * w + px2) * 4 + 2] === d[i + 2]) px2++;
      out.push([py, px, px2, 'rgb(' + d[i] + ',' + d[i + 1] + ',' + d[i + 2] + ')']); px = px2;
    }
    return (R.__runs = out);
  }
  function toDataURL(spec, pose, frame, opts) { var cv = toCanvas(spec, pose, frame, opts); return cv ? cv.toDataURL('image/png') : null; }
  function modeFor(scale) { return (scale % 3 === 0 || scale >= 6) ? 'art' : 'sprite'; }
  function render(ctx, spec, pose, frame, x, y, opts) {
    opts = opts || {};
    var scale = opts.scale == null ? 3 : +opts.scale;
    var mode = opts.mode || modeFor(scale);
    var unit = mode === 'art' ? scale / 3 : scale;
    if (Math.abs(unit - Math.round(unit)) < 0.02 * unit && unit >= 1) unit = Math.round(unit);   // 4.007 → 4：每格一樣粗
    var o = Object.assign({}, opts, { mode: mode });
    var R = compose(spec, pose, frame, o);
    var sx = Math.round(x - R.ax * unit), sy = Math.round(y - R.ay * unit), w = R.w * unit, h = R.h * unit;
    var ga = ctx.globalAlpha;
    if (opts.alpha != null) ctx.globalAlpha = (ga == null ? 1 : ga) * opts.alpha;
    if (opts.shadow !== false && pose !== 'ko' && !opts.sil) {
      // 地上的影子：像素橢圓（寬約身體 1.4 倍、高 2 美術格）
      var su = mode === 'art' ? unit : unit / 3, rx = 11, ry = 2.5;
      var pa = ctx.globalAlpha; ctx.globalAlpha = (pa == null ? 1 : pa) * 0.32; ctx.fillStyle = '#140a04';
      for (var yy = -2; yy <= 2; yy++) { var dy = (yy + 0.5) / ry; if (Math.abs(dy) > 1) continue; var hw = Math.round(rx * Math.sqrt(1 - dy * dy)); ctx.fillRect(Math.round(x - hw * su), Math.round(y + (yy - 0.5) * su), Math.round(2 * hw * su), Math.max(1, Math.round(su))); }
      ctx.globalAlpha = pa;
    }
    var whole = unit === Math.round(unit);
    var cv = hasDOM && whole ? toCanvas(spec, pose, frame, o) : null;
    if (cv && ctx.drawImage) {
      var se = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false;
      ctx.drawImage(cv, sx, sy, w, h);
      ctx.imageSmoothingEnabled = se;
    } else {
      // 沒有 DOM（Node、測試），或每格不是整數 px（P2 在 DPR 2 時 1 美術格≈2.67 px）：一段一段 fillRect，
      // 邊界跟 P2 的 P.r 一樣各自四捨五入，所以跟店景的像素格對齊、不會有一格粗一格細的糊
      var ox = x - R.ax * unit, oy = y - R.ay * unit, RU = runsOf(R);
      for (var q = 0; q < RU.length; q++) {
        var ru = RU[q], X0 = Math.round(ox + ru[1] * unit), Y0 = Math.round(oy + ru[0] * unit);
        ctx.fillStyle = ru[3];
        ctx.fillRect(X0, Y0, Math.round(ox + ru[2] * unit) - X0, Math.round(oy + (ru[0] + 1) * unit) - Y0);
      }
    }
    ctx.globalAlpha = ga;
    var an = {};
    Object.keys(R.anchors).forEach(function (k) { an[k] = { x: x + R.anchors[k][0] * unit, y: y + R.anchors[k][1] * unit }; });
    return { x: sx, y: sy, w: w, h: h, anchors: an };
  }
  function anchor(spec, pose, frame, name, opts) {
    opts = opts || {};
    var scale = opts.scale == null ? 3 : +opts.scale, mode = opts.mode || modeFor(scale), unit = mode === 'art' ? scale / 3 : scale;
    var R = compose(spec, pose, frame, Object.assign({}, opts, { mode: mode })), a = R.anchors[name] || R.anchors.foot;
    return [a[0] * unit, a[1] * unit];
  }

  // ===================================================================== 隨機
  function rng(seed) {
    var h = 1779033703 ^ String(seed).length;
    String(seed).split('').forEach(function (ch) { h = Math.imul(h ^ ch.charCodeAt(0), 3432918353); h = h << 13 | h >>> 19; });
    var a = h >>> 0;
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function random(seed, opt) {
    var R = rng(seed == null ? Date.now() + ':' + Math.random() : seed), base = (opt && opt.base) || {};
    function pick(a) { return a[Math.floor(R() * a.length)]; }
    function chance(p) { return R() < p; }
    function wpick(list) { var tot = 0; list.forEach(function (x) { tot += x[1]; }); var v = R() * tot; for (var i = 0; i < list.length; i++) { v -= list[i][1]; if (v < 0) return list[i][0]; } return list[0][0]; }
    var natural = ['k', 'k', 'choco', 'choco', 'u', 'auburn', 'y', 'plat', 'ash', 'd', 'o'];
    var fun = ['r', 'm', 'p', 'lilac', 'b', 'c', 'n', 'w'];
    var s = { v: 2 };
    s.skin = pick(SKINS);
    s.hair = wpick(HAIR.map(function (h) { return [h.id, h.id === 'bald' ? 0.5 : h.id === 'mohawk' || h.id === 'afro' ? 0.7 : 1]; }));
    s.hairColor = chance(0.78) ? pick(natural) : pick(fun);
    s.hat = chance(0.42) ? pick(HATS.slice(1).filter(function (h) { return h.id !== 'crown'; })).id : 'none';
    var nice = ['w', 'cream', 'e', 'd', 'char', 'k', 'r', 'wine', 'brick', 'o', 'mustard', 'y', 'khaki', 'moss', 'n', 'forest', 'mint', 'c', 'sky', 'b', 'denim', 'navy', 'p', 'lavender', 'm', 'pink'];
    s.hatColor = chance(0.5) ? 'auto' : pick(nice);
    s.hat2Color = 'auto';
    s.glasses = chance(0.3) ? pick(GLASSES.slice(1)).id : 'none';
    s.glassesColor = chance(0.6) ? 'auto' : pick(GLASSCOLS);
    s.facial = chance(0.22) ? pick(FACIAL.slice(1)).id : 'none';
    s.facialColor = 'auto';
    s.top = pick(TOPS).id;
    s.topColor = pick(nice);
    s.top2Color = chance(0.65) ? 'auto' : pick(nice);
    s.bottom = wpick(BOTTOMS.map(function (b) { return [b.id, b.id === 'pants' || b.id === 'jeans' || b.id === 'slim' ? 2 : 1]; }));
    var lows = ['k', 'denim', 'navy', 'char', 'khaki', 'd', 'u', 'moss', 'cream', 'wine', 'forest', 'brick'];
    s.bottomColor = pick(lows);
    var guard = 0; while (s.bottomColor === s.topColor && guard++ < 6) s.bottomColor = pick(lows);
    s.shoesColor = pick(SHOECOLS);
    s.neck = chance(0.18) ? pick(NECKS.slice(1)).id : 'none';
    s.neckColor = chance(0.5) ? 'auto' : pick(nice);
    s.bag = chance(0.3) ? pick(BAGS.slice(1)).id : 'none';
    s.bagColor = chance(0.6) ? 'auto' : pick(nice);
    s.bag2Color = 'auto';
    Object.keys(base).forEach(function (k) { s[k] = base[k]; });
    return normalize(s);
  }

  // ===================================================================== 目錄（繁中 label）
  function plist(list) { return list.map(function (x) { return { id: x.id, label: x.label }; }); }
  function clist(ids, labels) { return ids.map(function (id) { return { id: id, label: (labels && labels[id]) || LABEL[id] || id, hex: colorHex(id) }; }); }
  var parts = {
    skin: clist(SKINS, SKIN_LABEL),
    hair: plist(HAIR), hairColor: clist(HAIRCOLS, HAIR_LABEL),
    hat: plist(HATS), glasses: plist(GLASSES), glassesColor: clist(GLASSCOLS), facial: plist(FACIAL),
    top: plist(TOPS), bottom: plist(BOTTOMS), neck: plist(NECKS), bag: plist(BAGS),
    color: clist(CLOTHS), shoesColor: clist(SHOECOLS)
  };
  // 每一款的預設色（換款式時捏人畫面帶上招牌色用）
  var DEFAULTS = {};
  [['hat', HATS], ['top', TOPS], ['bottom', BOTTOMS], ['neck', NECKS], ['bag', BAGS], ['glasses', GLASSES]].forEach(function (p) { DEFAULTS[p[0]] = {}; p[1].forEach(function (x) { DEFAULTS[p[0]][x.id] = { c: x.dc || null, c2: x.dc2 && x.dc2 !== '~' ? x.dc2 : null }; }); });
  function swatch(id) { return colorHex(id); }
  // 哪幾款有第二色（捏人畫面決定要不要出第二排色票）
  function uses(list, letter) { var o = {}; list.forEach(function (x) { var L0 = [x.f, x.b, x.back && x.back.rows ? x.back : null, x.hood, x.over].filter(Boolean); o[x.id] = L0.some(function (l) { return l.rows.some(function (r) { return r.indexOf(letter) >= 0; }); }); }); return o; }
  var SECOND = { hat: uses(HATS, 'B'), top: uses(TOPS, 'U'), bag: uses(BAGS, 'Q') };
  function legacyParity() {
    var out = { checked: false, ok: true, diffs: [] };
    try {
      /* global PIX_PAL, AVATAR_HEADS, SPR_BODY */
      if (typeof PIX_PAL === 'undefined' || typeof AVATAR_HEADS === 'undefined' || typeof SPR_BODY === 'undefined') return out;
      out.checked = true;
      Object.keys(PIX_PAL).forEach(function (k) { if (PIX_PAL[k] !== LP[k]) { out.ok = false; out.diffs.push('PIX_PAL.' + k); } });
      Object.keys(LP).forEach(function (k) { if (!(k in PIX_PAL)) { out.ok = false; out.diffs.push('extra ' + k); } });
      if (SPR_BODY.join('|') !== LBODY.join('|')) { out.ok = false; out.diffs.push('SPR_BODY'); }
      Object.keys(AVATAR_HEADS).forEach(function (k) { if (!LHEADS[k] || AVATAR_HEADS[k].rows.join('|') !== LHEADS[k].join('|')) { out.ok = false; out.diffs.push('AVATAR_HEADS.' + k); } });
    } catch (e) { out.ok = false; out.diffs.push(String(e)); }
    return out;
  }

  return {
    render: render, compose: compose, runs: function (spec, pose, frame, opts) { return runsOf(compose(spec, pose, frame, opts)); }, toCanvas: toCanvas, toDataURL: toDataURL, rows: rows, svg: svg, anchor: anchor,
    npc: npc, cast: cast, fromDipChar: fromDipChar, toDipChar: toDipChar, random: random, normalize: normalize, isSpec: isSpec,
    parts: parts, DEFAULTS: DEFAULTS, SECOND: SECOND, DEFAULT: DEFAULT, POSES: POSES, ARM: ARM, P2POSE: P2POSE, swatch: swatch, legacyParity: legacyParity,
    SCALE: { sprite: 16, art: 48, x: 3 }, OUTLINE: OUTLINE,
    _internal: { LP: LP, LHEADS: LHEADS, LBODY: LBODY, LSPR: LSPR, legacyRows: legacyRows, HAIR: HAIR, HATS: HATS, GLASSES: GLASSES, FACIAL: FACIAL, TOPS: TOPS, BOTTOMS: BOTTOMS, NECKS: NECKS, BAGS: BAGS, NPCS: NPCS, PAL: PAL, build: build, resolver: resolver, clear: function () { memo = {}; memoN = 0; cvCache = {}; } },
    version: '4.0'
  };
});
