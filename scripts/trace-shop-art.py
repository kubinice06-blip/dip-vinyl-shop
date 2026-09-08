#!/usr/bin/env python3
"""從店主提供的唱片行參考圖「描」出序章舞台的三個圖層。

為什麼是描圖不是重畫：程式只能拼幾何圖形，畫不出一張人臉、一支小號、一個城市夜景。
參考圖（`art/ref-shop.jpg`，店主用圖像生成模型產的）已經有那些內容，
所以我們不重畫，而是把它拆成可以互動的圖層。

    python3 scripts/trace-shop-art.py

做法三步：
  1. **挖空**：把家具與門板從參考圖上抹掉，補回牆與地板。
     牆是直板 → 用「同一欄、換一列」抄（板縫對得上）；
     地板是橫板 → 用「同一列、換一欄」抄（透視對得上）；
     取樣來源每一列自動找沒被家具擋住的最寬區段。
  2. **取輪廓**：家具遮罩＝「原圖 − 空房」的差集，不是手描的，所以邊緣是像素級精準。
     牆的區域門檻要拉高（補回去的牆跟原本的牆本來就有細微差）。
  3. **重排**：家具是獨立圖層，可以搬、縮、複製。位置全部寫在 LAYOUT 裡。

輸出（art/）：
  shop2-bg.jpg         背景層：牆、封面、地板、門洞（雨夜）
  shop2-fg-back.png    前景後層：櫃檯＋器材、右邊挖寶櫃（下緣 y≤400）
  shop2-fg-front.png   前景前層：挖寶櫃、紙箱（下緣 y≥402）
  shop2-door-0/1/2.png 門板三格：關／半開／全開

座標契約（前台站位要跟這裡對齊；邏輯尺寸 448×492，前台站位用 %）：
  · 牆／地板交界 y=325。門洞 x 12–86、y 156–325。
  · 櫃檯 x 102–307、檯面上緣 y=299、檯身下緣 y=400。
    老闆站櫃檯後面時腳底 y=325（＝貼著牆），會被檯面擋到只露頭肩。
    檯面上緣 y≈291（水平的，不是斜的）。檯面器材：左喇叭挪到 x 105–146、
    唱盤擴大機挪到 x 201–252、右喇叭挪到 x 267–302。
    **老闆站在左喇叭與唱盤之間的空檔（cx≈174、寬 55）**，頭肩才露得出來。
  · 右邊挖寶櫃 x 299–448、y 255–396。
  · **前方右半是折疊長桌**（邏輯 x 247–460、桌面 y 371、桌腳落地 y 467）：
    桌上兩個木箱、桌下三個黑色塑膠籃，全部在 `shop2-fg-front`。
    桌子把右前方整片佔滿，所以**老闆翻片要站在桌子左端**（cx≈205–230、腳底 420–440），
    站到桌子後面會被桌面與木箱整個蓋住。
  · 前方 x 0–245 / y 400–492 淨空留給三人同框與老闆的動線。
  · **前景分兩層**：`shop2-fg-back`（櫃檯／喇叭／右邊挖寶櫃，下緣 y≤400）與
    `shop2-fg-front`（挖寶櫃／紙箱，下緣 y≥402）。小人依腳底 y 夾在兩層之間，
    才能「站在櫃檯前面、但在挖寶櫃後面」。
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(ROOT, 'art')
REF = os.path.join(ART, 'ref-shop.jpg')

ROOM = (0, 0, 1792, 1970)          # 參考圖裡「房間」的範圍（對話框以上）
SCALE = 4                          # 1 邏輯 px = 4 原圖 px（邏輯 448×492）
OUT_W = 1120                       # 輸出寬度（手機 3× DPR 約 1083，夠用）
WALL_Y = 1300                      # 牆／地板交界（原圖座標）
WALL_SRC = (110, 212)              # 乾淨牆：天花板燈之下、封面之上

# ── 要從背景挖掉的東西（原圖座標）────────────────────────────────
PIECES = {                         # 家具：挖掉，並且切成前景圖層
    # 順序＝合成順序：櫃檯要排在器材前面，器材才會疊在檯面上（排錯的話櫃檯會把器材蓋掉）。
    'counter': (408, 1038, 1228, 1600),
    'rbins':   (1196, 1020, 1792, 1562),
    'spkL':    (468, 1032, 634, 1240),   # 左喇叭：往左挪，把老闆站的空檔加寬到 55
    'gear':    (748, 1098, 1008, 1238),  # 唱盤＋擴大機
    'spkR':    (1016, 1052, 1156, 1238), # 右喇叭
    'crate':   (352, 1392, 792, 1970),
    'box1':    (1085, 1572, 1498, 1970),
    'box2':    (1440, 1560, 1792, 1970),
}
HUMAN = (205, 1340, 378, 1592)     # 參考圖自帶的小人：挖掉，不留（前台用自己的像素人）
PANEL = (48, 620, 152, 1302)       # 門板：挖掉，單獨當門圖層
DOORWAY = (36, 600, 358, 1310)     # 門洞：不挖，但不能拿來當地板取樣來源

# 誰擋在誰前面：前面那件的框會咬掉後面那件的遮罩，所以要把它從後面那件扣掉，
# 再用「同一列、換一欄」把被咬掉的地方補回來（家具搬走後那塊才不會是破洞）。
OCCLUDED_BY = {'counter': ['crate', 'spkL', 'gear', 'spkR']}
# 補洞：(y0, y1, sx0, sx1) —— 被前面那件咬掉的地方，用同一列的乾淨欄抄回來。
FILL = {'counter': [(1258, 1600, 800, 1210)]}    # 檯身：挖寶櫃原本擋住的那塊
# 檯面上緣其實是**水平的**（y≈1164），一開始誤以為有透視斜度，
# 是因為偵測器在有器材的欄位讀到的是器材底部（1226），才把檯面補成鋸齒。
# 既然是水平的，直接從乾淨的一段（左喇叭與唱盤之間 x 650–748）橫向鏡射抄過去就好。
TILE_FILL = {'counter': (1156, 1320, 462, 1162, 650, 748)}  # (y0,y1, 洞x0,洞x1, 來源x0,x1)
# 個別調門檻：器材是牆上的深色方塊，門檻低會把牆的細微色差也算進來
# 參考圖裡兩個紙箱的**底部本來就被原圖下緣切掉**（畫到 y=1970 就沒了），
# 所以不管挪到哪都會露出一個平口。這裡把箱身往下接長、再壓一條底緣與接地陰影。
EXTEND = {}                                      # piece: 往下補幾列（目前用不到）
CUT_OPTS = {'gear': dict(wall_thr=150, min_blob=1200),
            'spkL': dict(wall_thr=190, min_blob=1200),
            'spkR': dict(wall_thr=190, min_blob=1200)}

# ── 家具重排（改這裡就好）───────────────────────────────────────
#   piece:  (目的地左上角 x, y, 縮放, 要不要在腳下加陰影)   ── 全部原圖座標
#   None ＝ 維持原位；'drop' ＝ 這件不要了
LAYOUT = {
    'counter': None,                       # 櫃檯貼牆，不動
    'spkL':    (420, 1032, 1.0, False),    # 左喇叭往左挪 48px
    'gear':    (805, 1098, 1.0, False),    # 唱盤＋擴大機往右挪 57px
    'spkR':    (1069, 1052, 1.0, False),   # 右喇叭往右挪 53px，貼到檯面右端
    'rbins':   None,                       # 右邊那組貼右牆，不動
    'crate':   'drop',                     # 前方改放折疊長桌＋木箱＋黑籃（見 PROPS）
    'box1':    'drop',                     # 參考圖裡的紙箱沒有底，改用 PROPS 裡另外畫好的
    'box2':    'drop',                     # 兩個紙箱疊在一起太擠，收掉一個
}


def mirror(v, lo, hi):
    span = hi - lo
    t = (v - lo) % (2 * span)
    return lo + (t if t < span else 2 * span - t - 1)


def build_empty(ref):
    """把家具、小人、門板抹掉，補回牆與地板／門洞。"""
    a = ref.copy()
    H, W, _ = a.shape
    erase = list(PIECES.values()) + [HUMAN]

    def free_run(y):                       # 這一列哪一段沒被家具或門佔住
        blocked = np.zeros(W, bool)
        for x0, y0, x1, y1 in erase + [DOORWAY]:
            if y0 <= y < y1:
                blocked[x0:x1] = True
        runs, s = [], None
        for x in range(W):
            if not blocked[x] and s is None:
                s = x
            elif blocked[x] and s is not None:
                runs.append((s, x)); s = None
        if s is not None:
            runs.append((s, W))
        return max(runs, key=lambda r: r[1] - r[0]) if runs else (0, 40)

    cache = {}
    for x0, y0, x1, y1 in erase:
        for y in range(y0, min(y1, H)):
            if y < WALL_Y:
                a[y, x0:x1] = ref[mirror(y, *WALL_SRC), x0:x1]
            else:
                if y not in cache:
                    lo, hi = free_run(y)
                    cache[y] = (lo, hi) if hi - lo >= 8 else (0, 40)
                lo, hi = cache[y]
                a[y, x0:x1] = ref[y, np.array([mirror(x, lo, hi) for x in range(x0, x1)])]

    # 門板抹掉 → 補成門洞（雨夜）：同一列、抄門板右邊那片雨
    px0, py0, px1, py1 = PANEL
    for y in range(py0, py1):
        a[y, px0:px1] = ref[y, np.array([mirror(x, 175, 330) for x in range(px0, px1)])]
    return a


def cut(ref, empty, box, name=None, wall_thr=105, floor_thr=40, min_blob=3000):
    """遮罩＝原圖與空房的差集，回傳裁好的 RGBA。"""
    x0, y0, x1, y1 = box
    px = ref[y0:y1, x0:x1].copy()
    d = np.abs(px.astype(np.int16) - empty[y0:y1, x0:x1].astype(np.int16)).sum(2)
    thr = np.where(np.arange(y0, y1) < WALL_Y, wall_thr, floor_thr)[:, None]
    m = d > thr
    m = ndi.binary_closing(m, np.ones((7, 7)))
    m = ndi.binary_fill_holes(m)
    lab, n = ndi.label(m)
    if n:
        sizes = ndi.sum(m, lab, range(1, n + 1))
        m = np.isin(lab, 1 + np.where(sizes > min_blob)[0])
    m = ndi.binary_dilation(m, np.ones((3, 3)))
    for other in OCCLUDED_BY.get(name, []):           # 扣掉擋在前面那件
        ox0, oy0, ox1, oy1 = PIECES[other]
        m[max(0, oy0-y0):max(0, oy1-y0), max(0, ox0-x0):max(0, ox1-x0)] = False
    if name in TILE_FILL:                             # 檯面：橫向鏡射抄乾淨的一段
        fy0, fy1, hx0, hx1, sx0, sx1 = TILE_FILL[name]
        cols = np.array([mirror(x, sx0, sx1) for x in range(hx0, hx1)]) - x0
        px[fy0 - y0:fy1 - y0, hx0 - x0:hx1 - x0] = px[fy0 - y0:fy1 - y0, cols]
        m[fy0 - y0:fy1 - y0, hx0 - x0:hx1 - x0] = True
    for fy0, fy1, sx0, sx1 in FILL.get(name, []):     # 被咬掉的部分補回來
        for y in range(max(fy0, y0), min(fy1, y1)):
            row = y - y0
            gap = ~m[row, :]
            if not gap.any():
                continue
            idx = np.arange(x1 - x0)[gap]
            src = np.array([mirror(x0 + i, sx0, sx1) for i in idx]) - x0
            px[row, idx] = px[row, np.clip(src, 0, px.shape[1] - 1)]
            m[row, idx] = True
    a = (m * 255).astype(np.uint8)
    k = EXTEND.get(name)
    if k:                                         # 箱底被原圖切掉 → 往下接長並收一條底緣
        tail_px, tail_a = px[-k:][::-1], a[-k:][::-1]        # 上下翻轉接下去，紋理才不會是拉絲
        px = np.vstack([px, tail_px]); a = np.vstack([a, tail_a])
        for i in range(10):                       # 最後 10 列壓暗＝箱子的下緣
            f = 0.86 - i * 0.055
            px[-10 + i] = np.clip(px[-10 + i] * max(f, 0.30), 0, 255).astype(np.uint8)
        px[-2:] = np.clip(px[-2:] * 0.55, 0, 255).astype(np.uint8)
    return Image.fromarray(np.dstack([px, a]), 'RGBA')


def soft_shadow(img, x, y, w, h):
    sh = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).ellipse([x, y, x + w, y + h], fill=(0, 0, 0, 120))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(14)))


# ── 外掛道具：不是從參考圖描出來的，是店主另外產、已經去背的完整物件 ──────
#   （參考圖裡的紙箱下緣被原圖切掉、沒有底，補出來的總是不對；改用畫好的整個箱子）
#   name: (檔案, 目的地左上角 x, y, 縮放, 疊在哪一層, 要不要影子)   ── 全部原圖座標
#   name: (檔案, x, y, 縮放, 圖層, 影子, 色調)   ── 色調用來壓成店裡的暖暗光
#   **順序＝合成順序**：桌下的先畫，桌子後畫（桌腳才會蓋在前面），桌上的最後畫。
_T = (990, 1352)                    # 桌子左上角
_TOP, _LEG = _T[1] + 132, _T[1] + 516     # 桌面前緣 / 桌腳落地
_DIM, _LIT = (0.76, 0.74, 0.72), (0.94, 0.92, 0.90)
PROPS = {
    'crateB1': ('art/props/crate-black.png',   1052, _LEG - 236, 1.0, 'front', True, _DIM),
    'crateB2': ('art/props/crate-black-2.png', 1307, _LEG - 236, 1.0, 'front', True, _DIM),
    'crateB3': ('art/props/crate-black-3.png', 1562, _LEG - 236, 1.0, 'front', True, _DIM),
    'table':   ('art/props/table.png',         _T[0], _T[1],     1.0, 'front', True,
                (0.84, 0.80, 0.76)),
    'crateW1': ('art/props/crate-wood.png',    1024, _TOP - 240, 1.0, 'front', False, _LIT),
    'crateW2': ('art/props/crate-wood-2.png',  1404, _TOP - 240, 1.0, 'front', False, _LIT),
}


# 前景要分兩層，小人才能「站在櫃檯前面、但在挖寶櫃後面」
FG_BACK  = ['counter', 'rbins', 'spkL', 'gear', 'spkR']   # 下緣在 y=400 以上
FG_FRONT = ['crate', 'box1', 'box2']       # 下緣在 y=402 以下


def main():
    room = Image.open(REF).convert('RGB').crop(ROOM)
    ref = np.asarray(room)
    H, W, _ = ref.shape
    empty = build_empty(ref)

    # ── 前景層：把每一件搬到 LAYOUT 指定的位置，分成前後兩張 ──
    layers = {'back': Image.new('RGBA', (W, H), (0, 0, 0, 0)),
              'front': Image.new('RGBA', (W, H), (0, 0, 0, 0))}
    for name, box in PIECES.items():
        plan = LAYOUT.get(name)
        if plan == 'drop':
            continue
        fg = layers['front' if name in FG_FRONT else 'back']
        piece = cut(ref, empty, box, name, **CUT_OPTS.get(name, {}))
        if plan is None:
            fg.alpha_composite(piece, (box[0], box[1]))
            continue
        dx, dy, sc, shadow = plan
        pw, ph = int(piece.width * sc), int(piece.height * sc)
        piece = piece.resize((pw, ph), Image.LANCZOS)
        if shadow:
            soft_shadow(fg, dx + pw * .04, dy + ph * .80, pw * .92, ph * .26)
        fg.alpha_composite(piece, (dx, dy))

    for name, (path, dx, dy, sc, layer, shadow, tint) in PROPS.items():   # 外掛道具
        prop = Image.open(os.path.join(ROOT, path)).convert('RGBA')
        pw, ph = int(prop.width * sc), int(prop.height * sc)
        if sc != 1.0:
            prop = prop.resize((pw, ph), Image.LANCZOS)
        if tint:
            a = np.asarray(prop).astype(np.float32)
            a[..., :3] *= np.array(tint, np.float32)
            prop = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8), 'RGBA')
        if dy + ph > H:
            print(f'  ⚠ {name} 會超出畫布下緣 {dy + ph - H}px')
        if shadow:
            soft_shadow(layers[layer], dx + pw * .06, dy + ph * .88, pw * .88, ph * .16)
        layers[layer].alpha_composite(prop, (dx, dy))
        print(f'  道具 {name}: {pw}×{ph} @ ({dx},{dy}) → 邏輯 x {dx//SCALE}–{(dx+pw)//SCALE}'
              f'、y {dy//SCALE}–{(dy+ph)//SCALE}')

    # ── 門板三格：全開（原樣）／半開／關（往右拉寬填滿門洞）──
    panel = cut(ref, empty, PANEL, wall_thr=40, min_blob=800)
    open_w = 300                                        # 門洞可用寬度
    frames = [open_w, int(open_w * .58), panel.width]   # 0 關、1 半開、2 全開
    for i, w in enumerate(frames):
        canvas = Image.new('RGBA', (open_w + 8, panel.height), (0, 0, 0, 0))
        canvas.alpha_composite(panel.resize((w, panel.height), Image.LANCZOS), (0, 0))
        canvas.resize((round(canvas.width * OUT_W / W), round(canvas.height * OUT_W / W)),
                      Image.LANCZOS).save(os.path.join(ART, f'shop2-door-{i}.png'))

    oh = round(H * OUT_W / W)
    Image.fromarray(empty).resize((OUT_W, oh), Image.LANCZOS).save(
        os.path.join(ART, 'shop2-bg.jpg'), quality=88, subsampling=0, optimize=True)
    for k, im in layers.items():
        im.resize((OUT_W, oh), Image.LANCZOS).save(
            os.path.join(ART, f'shop2-fg-{k}.png'), optimize=True)

    print(f'邏輯尺寸 {W//SCALE}×{H//SCALE}　輸出 {OUT_W}×{oh}')
    print(f'門板左上角（邏輯）x={PANEL[0]/SCALE:.0f} y={PANEL[1]/SCALE:.0f}'
          f'　寬 {(open_w+8)/SCALE:.0f} 高 {(PANEL[3]-PANEL[1])/SCALE:.0f}')
    for f in ('shop2-bg.jpg', 'shop2-fg-back.png', 'shop2-fg-front.png',
              'shop2-door-0.png', 'shop2-door-1.png', 'shop2-door-2.png'):
        p = os.path.join(ART, f)
        print(f'  {f:20s} {os.path.getsize(p)/1024:7.1f} KB  {Image.open(p).size}')


if __name__ == '__main__':
    main()
