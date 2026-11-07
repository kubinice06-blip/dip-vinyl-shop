#!/usr/bin/env python3
"""D2「篩選滾筒組」設計稿：頻率光譜主機面板改版（1438×1413，同一個像素格 P = 1438/260 ≈ 5.53px）。

只讀 repo 的 tune/ 原稿，輸出都寫在本檔同層：
  mockup.png      整張設計稿（含示意文字；實作時文字改 HTML 像素字 DotGothic16）
  preview.png     縮成寬 720 給評審快速看
  annotated.png   設計稿＋HTML 活件框（紅＝可點／可拖，青＝只顯示）
  panel-bg.png    實作用的底圖候選（不含任何文字與活件，等同新版 tune/panel-all.png）
  sprites/        活件貼圖候選：兩顆直鍵、全部鍵、滾筒明暗罩、LED 亮／暗
並印出各活件佔整張的百分比（照 scripts/build-tune-panel.py 的格式）。

取材原則（2026-11-06 店主：完全只用像素呈現，不要假的網頁程式碼繪圖）：
  · 窗框、滾筒、輪子、刻度、撥桿、LED、直鍵 ← 一律從原稿剪貼、翻面、九宮格延伸，或抽掉整列像素格（不縮放）
  · 名牌、液晶窗、全部鍵、骰子、讀數指標 ← 照原稿配色在像素格上逐格畫（同搜尋列的做法）
  · 滾筒明暗 ← 空白滾筒取自原稿（把字抹掉、每格一階量化），文字上方另疊一張每格一階的黑色半透明罩
  · 輪子 ← 原稿輪窗抽掉一半像素列，wheel-spans 依同一組列重算；銅帶照現行 canvas 演算法畫，明暗改成每格一階

用法：cd /home/user/dip-vinyl-shop && python3 <本檔路徑>
"""
import json
import math
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

SRC_DIR = os.path.dirname(os.path.abspath(__file__))
HERE = os.path.join(SRC_DIR, 'out')
SPR = 'tune'   # 活件貼圖直接輸出到 tune/
os.makedirs(SPR, exist_ok=True)

WH = Image.open('tune/panel-wheels.jpg').convert('RGB')
FQ = Image.open('tune/panel-freq.jpg').convert('RGB')
BTN = Image.open('tune/btn-v.png').convert('RGB')
SCREW = Image.open('tune/screw.png')
SPANS = json.load(open(os.path.join(SRC_DIR, 'wheel-spans-full.json')))
TILES = {k: Image.open(f'tune/tile-{k}.png').convert('RGB') for k in 'xyz'}
W = WH.width                                   # 1438
P = W / 260                                    # 一個像素格 ≈ 5.53px
H = 1413                                       # 整台外寬高不變

UNI = ImageFont.truetype('/usr/share/fonts/opentype/unifont/unifont.otf', 16)   # 16 點陣字，放大當 DotGothic16 的替身


def hexc(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


# ── 配色（全部取自原稿或現行 dip-tune.js）────────────────────────────
OUT = (10, 10, 18)
WIN_OUT = (0, 2, 7); WIN_HI = (67, 70, 75); WIN_IN = (8, 8, 10); WIN_SH = (21, 20, 26)
PLATE = (189, 160, 116); PLATE_HI = (214, 186, 140); PLATE_LO = (150, 121, 84); PLATE_OUT = (26, 11, 0)
BRASS = (175, 137, 62); BRASS_HI = (224, 200, 136); BRASS_LO = (101, 72, 35); INK = (42, 30, 7)
STEEL = (44, 48, 53); STEEL_HI = (65, 70, 76); STEEL_LO = (24, 26, 30)          # 原稿滾筒窗框三階
AMBER = hexc('#ffd34d'); DIM = hexc('#8d9478'); BEIGE = hexc('#e9e2c8')
AX = {k: hexc(v) for k, v in {'x': '#f2b341', 'y': '#8fe0a0', 'z': '#ff7a6b', 'cold': '#a08cff'}.items()}
CELLC = {k: hexc(v) for k, v in {'still': '#5ee6f0', 'languid': '#e8578f', 'decay': '#9b6bff'}.items()}

# ── 版面（整張 y）──────────────────────────────────────────────────
TOP, SEARCH_H, GROOVE, BOTTOM = 45, 105, 12, 45
INNER_X0, INNER_X1 = 112, 1326
L_RAIL, R_RAIL = 106, 1332
y_search = TOP
y_g1 = y_search + SEARCH_H                     # 150
y_fq = y_g1 + GROOVE                           # 162

# FREQUENCY：標題區照舊（原稿 36..175 列），滾筒窗高度砍半
FQ_X0, CUT0, CUT1, FQ_X1 = 114, 630, 825, 1325
TITLE_Y0, TITLE_Y1 = 36, 175
WIN_SRC = (178, 175, 1106, 544)                # 原稿滾筒窗外框（含黑描邊）
FR_L, FR_T, FR_R, FR_B = 29, 30, 24, 29        # 窗框厚
GP_L, GP_T, GP_R, GP_B = 10, 11, 10, 9         # 框內黑縫
FQ_DRUM_H = 145                                # 原稿滾筒 290 → 145
y_fqwin = y_fq + (TITLE_Y1 - TITLE_Y0)         # 301
FQ_WIN_H = FR_T + GP_T + FQ_DRUM_H + GP_B + FR_B
y_fq_end = y_fqwin + FQ_WIN_H                  # 525
fx = INNER_X0


def fq_x(sx):                                  # FREQUENCY 原稿 x → 整張 x（中段抽掉 195px，同現行）
    return sx - FQ_X0 + fx if sx < CUT0 else sx - CUT1 + fx + (CUT0 - FQ_X0)


fq_x_end = fq_x(FQ_X1)                         # 1128
y_g2 = y_fq_end                                # 525
y_flt = y_g2 + GROOVE                          # 537

# 輪子區：標籤列照舊，輪窗內部抽掉一半像素列
WH_LAB0, WIN_T0, WIN_I0, WIN_I1, WIN_B1, WH_END = 45, 141, 168, 648, 683, 735


def cell_keep(n, target, start=0):
    """把 n 列（從 start 起算）依像素格整格整格地抽掉，留下約 target 列；回傳留下的列號。"""
    bounds = []
    i = 0
    while True:
        b = round(i * P)
        if b >= n:
            break
        bounds.append(b)
        i += 1
    bounds.append(n)
    cells = list(zip(bounds[:-1], bounds[1:]))
    want = target / n
    keep = []
    for i, (a, b) in enumerate(cells):
        if math.floor((i + 1) * want + 1e-9) > math.floor(i * want + 1e-9):
            keep.extend(range(a, b))
    while len(keep) > target:                  # 收尾：多的從中間拿掉、少的從中間補一列
        keep.pop(len(keep) // 2)
    while len(keep) < target:
        m = len(keep) // 2
        keep.insert(m, keep[m])
    return [start + r for r in keep]


SEC_ROWS = list(range(WH_LAB0, WIN_I0)) + cell_keep(WIN_I1 - WIN_I0, (WIN_I1 - WIN_I0) // 2, WIN_I0) + list(range(WIN_I1, WH_END))
NH = len(SEC_ROWS)                             # 450
y_wh = H - BOTTOM - NH                         # 918
y_g3 = y_wh - GROOVE                           # 906
# 評審合併版：輪子模組改用 D1 的分帶砍列，篩選列在上面。
# 2026-11-07 店主：「讓最下排的旋鈕往上擴充，上面的旋鈕縮小」——輪子模組 946–1368 → 848–1368，篩選列 537–934 → 537–836
y_wh = 848; y_g3 = 836

out = Image.new('RGB', (W, H))
d = ImageDraw.Draw(out)

# ── 底：外框、內面板、底緣 ─────────────────────────────────────────
out.paste(WH.crop((0, 0, W, TOP)), (0, 0))
row = WH.crop((0, 52, W, 53))
for y in range(TOP, H - BOTTOM):
    out.paste(row, (0, y))
out.paste(WH.crop((0, 0, W, BOTTOM)).transpose(Image.FLIP_TOP_BOTTOM), (0, H - BOTTOM))

groove_cols = [WH.getpixel((x, 300)) for x in range(506, 506 + GROOVE)]


def hgroove(y, x0=INNER_X0, x1=INNER_X1):
    for i, c in enumerate(groove_cols):
        d.line((x0, y + i, x1 - 1, y + i), fill=c)


def vgroove(x, y0, y1):
    for i, c in enumerate(groove_cols):
        d.line((x + i, y0, x + i, y1 - 1), fill=c)


class Grid:
    """在像素格上畫方塊：座標以格計，原點 (x0, y0)。"""
    def __init__(self, x0, y0, img=None):
        self.x0, self.y0 = x0, y0
        self.d = ImageDraw.Draw(img or out)

    def gx(self, a): return round(self.x0 + a * P)
    def gy(self, b): return round(self.y0 + b * P)

    def box(self, a0, b0, a1, b1, c):
        self.d.rectangle((self.gx(a0), self.gy(b0), self.gx(a1) - 1, self.gy(b1) - 1), fill=c)

    def rect(self, a0, b0, a1, b1):
        return (self.gx(a0), self.gy(b0), self.gx(a1), self.gy(b1))


def plate(g, a0, b0, a1, b1):                  # 名牌（同搜尋列名牌的畫法）
    g.box(a0, b0, a1, b1, PLATE_OUT); g.box(a0 + 1, b0 + 1, a1 - 1, b1 - 1, PLATE)
    g.box(a0 + 1, b0 + 1, a1 - 1, b0 + 2, PLATE_HI); g.box(a0 + 1, b1 - 2, a1 - 1, b1 - 1, PLATE_LO); g.box(a1 - 2, b0 + 1, a1 - 1, b1 - 1, PLATE_LO)
    for a, b in ((a1 - 6, b1 - 3), (a1 - 5, b1 - 4), (a0 + 3, b1 - 3), (a0 + 4, b1 - 3)):
        g.box(a, b, a + 1, b + 1, PLATE_HI)


def lcd(g, a0, b0, a1, b1):                    # 液晶窗（同搜尋列）
    g.box(a0, b0, a1, b1, WIN_HI); g.box(a0, b0, a1 - 1, b1 - 1, WIN_OUT)
    g.box(a0 + 1, b0 + 1, a1 - 1, b1 - 1, WIN_IN); g.box(a0 + 1, b0 + 1, a1 - 1, b0 + 2, WIN_SH)


def recess(x0, y0, x1, y1):                    # 按鍵凹槽（同現行就這張凹槽）
    d.rectangle((x0 - 8, y0 - 8, x1 + 7, y1 + 7), fill=(67, 70, 75))
    d.rectangle((x0 - 8, y0 - 8, x1 + 1, y1 + 1), fill=(0, 2, 7))
    d.rectangle((x0 - 3, y0 - 3, x1 + 2, y1 + 2), fill=(21, 20, 26))


# ── 原稿零件：九宮格窗框、空白滾筒 ─────────────────────────────────
def nine(box, w, h, c=32, fill=(4, 4, 6), mx=640, my=350):
    """原稿滾筒窗的九宮格：四角照剪，四邊取一列／一欄延伸，中間黑底。"""
    x0, y0, x1, y1 = box
    im = Image.new('RGB', (w, h), fill)
    im.paste(FQ.crop((x0, y0, x0 + c, y0 + c)), (0, 0)); im.paste(FQ.crop((x1 - c, y0, x1, y0 + c)), (w - c, 0))
    im.paste(FQ.crop((x0, y1 - c, x0 + c, y1)), (0, h - c)); im.paste(FQ.crop((x1 - c, y1 - c, x1, y1)), (w - c, h - c))
    top, bot = FQ.crop((mx, y0, mx + 1, y0 + c)), FQ.crop((mx, y1 - c, mx + 1, y1))
    for x in range(c, w - c):
        im.paste(top, (x, 0)); im.paste(bot, (x, h - c))
    lef, rig = FQ.crop((x0, my, x0 + c, my + 1)), FQ.crop((x1 - c, my, x1, my + 1))
    for y in range(c, h - c):
        im.paste(lef, (0, y)); im.paste(rig, (w - c, y))
    return im


def blank_drum_src():
    """原稿第一顆滾筒（躁／靜／躁）把字抹掉：每列取無字的 x=240 那欄、每欄取無字的 y=310 那列，相乘還原底色。"""
    X0, X1, Y0, Y1 = 217, 372, 216, 506
    f = np.asarray(FQ).astype(float)
    D = f[Y0:Y1, X0:X1].copy()
    R = D[:, 240 - X0][:, None, :]
    C = D[310 - Y0, :][None, :, :]
    C0 = D[310 - Y0, 300 - X0][None, None, :]
    B = np.clip(R * C / np.maximum(C0, 1), 0, 255)
    diff = np.abs(D - B).sum(axis=2)
    m = np.zeros(diff.shape, bool)
    m[:, 246 - X0:352 - X0] = diff[:, 246 - X0:352 - X0] > 15
    m = np.asarray(Image.fromarray((m * 255).astype('uint8')).filter(ImageFilter.MaxFilter(9))) > 0
    m[:, :246 - X0] = False; m[:, 352 - X0:] = False
    D[m] = B[m]
    return D                                    # 290×155


DRUM = blank_drum_src()


def make_drum(w, h):
    """空白滾筒 w×h：左右邊照剪、中段取一欄延伸；高度抽掉整格（上下圓角各留 14 列），再每格一階量化成像素明暗。"""
    L, Rr, MID = 33, 27, 83
    src = DRUM
    cols = list(range(L)) + [MID] * (w - L - Rr) + list(range(src.shape[1] - Rr, src.shape[1]))
    a = src[:, cols]
    cap = 14
    rows = list(range(cap)) + cell_keep(src.shape[0] - 2 * cap, h - 2 * cap, cap) + list(range(src.shape[0] - cap, src.shape[0]))
    a = a[rows].copy()
    # 每格一階：中段每個像素格內各欄取平均（圓角那幾列不動）
    y = cap
    while y < h - cap:
        y2 = min(h - cap, y + round(P))
        a[y:y2] = a[y:y2].mean(axis=0, keepdims=True)
        y = y2
    return Image.fromarray(np.clip(a, 0, 255).astype('uint8'))


def shade_overlay(h, w=1):
    """滾筒明暗罩：每格一階的黑色半透明（圓柱公式 (1-c)×1.15，上限 .9，取 0.1 一階）。"""
    im = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    px = im.load()
    y = 0
    while y < h:
        y2 = min(h, y + round(P))
        yc = (y + y2) / 2
        k = (yc - h / 2) / (h / 2)
        c = math.sqrt(max(0.0, 1 - k * k))
        a = min(.9, (1 - c) * 1.15)
        a = round(a * 10) / 10
        for yy in range(y, y2):
            for xx in range(w):
                px[xx, yy] = (0, 0, 0, round(a * 255))
        y = y2
    return im


# ── 搜尋列（照現行）──────────────────────────────────────────────
g = Grid(INNER_X0, y_search)
GW = (INNER_X1 - INNER_X0) / P
PA0, PA1, PB0, PB1 = 3, 46, 3, 16
plate(g, PA0, PB0, PA1, PB1)
KA1 = int(GW) - 3; KA0 = KA1 - 20; KB0, KB1 = 2, 17
g.box(KA0, KB0, KA1, KB1, OUT); g.box(KA0 + 1, KB0 + 1, KA1 - 1, KB1 - 1, BRASS)
g.box(KA0 + 1, KB0 + 1, KA1 - 1, KB0 + 2, BRASS_HI); g.box(KA0 + 1, KB0 + 1, KA0 + 2, KB1 - 1, BRASS_HI)
g.box(KA0 + 1, KB1 - 2, KA1 - 1, KB1 - 1, BRASS_LO); g.box(KA1 - 2, KB0 + 1, KA1 - 1, KB1 - 1, BRASS_LO)
cx, cy = (KA0 + KA1) // 2 - 2, (KB0 + KB1) // 2 - 2
for a, b in ((0, -3), (1, -3), (-1, -3), (2, -2), (-2, -2), (3, -1), (3, 0), (3, 1), (-3, -1), (-3, 0), (-3, 1), (2, 2), (-2, 2), (0, 3), (1, 3), (-1, 3), (3, 3), (4, 4), (5, 5), (4, 5), (5, 4)):
    g.box(cx + a, cy + b, cx + a + 1, cy + b + 1, INK)
LA0, LA1, LB0, LB1 = PA1 + 3, KA0 - 3, 3, 16
lcd(g, LA0, LB0, LA1, LB1)
R_SEARCH = dict(plate=g.rect(PA0, PB0, PA1, PB1), input=g.rect(LA0 + 1, LB0 + 1, LA1 - 1, LB1 - 1), go=g.rect(KA0, KB0, KA1, KB1))

# ── FREQUENCY：標題區＋砍半的滾筒窗＋SCAN/RADIO 撥桿欄 ────────────────
left = FQ.crop((FQ_X0, TITLE_Y0, CUT0, TITLE_Y1)); right = FQ.crop((CUT1, TITLE_Y0, FQ_X1, TITLE_Y1))
out.paste(left, (fx, y_fq)); out.paste(right, (fx + left.width, y_fq))
bgrow = Image.new('RGB', (fq_x_end - fx, 1))
bgrow.paste(FQ.crop((FQ_X0, 160, CUT0, 161)), (0, 0)); bgrow.paste(FQ.crop((CUT1, 160, FQ_X1, 161)), (CUT0 - FQ_X0, 0))
for y in range(y_fqwin, y_fq_end):
    out.paste(bgrow, (fx, y))

WIN_FQ = (fq_x(WIN_SRC[0]), y_fqwin, fq_x(WIN_SRC[2]), y_fq_end)      # 176,301 – 909,525
out.paste(nine(WIN_SRC, WIN_FQ[2] - WIN_FQ[0], WIN_FQ[3] - WIN_FQ[1]), WIN_FQ[:2])
# 四顆滾筒：三顆窄（能量／質地／溫暖）＋一顆寬（情緒格），寬度比照現行 flex 1:1:1:2.3
fd_y0 = y_fqwin + FR_T + GP_T
fd_x = WIN_FQ[0] + FR_L + GP_L
FQ_DRUMS = []
for name, w in (('dx', 112), ('dy', 112), ('dz', 112), ('dcell', 270)):
    out.paste(make_drum(w, FQ_DRUM_H), (fd_x, fd_y0))
    FQ_DRUMS.append((name, (fd_x, fd_y0, fd_x + w, fd_y0 + FQ_DRUM_H)))
    fd_x += w + 18
assert fd_x - 18 + GP_R + FR_R == WIN_FQ[2], (fd_x, WIN_FQ)

# 撥桿欄（原稿 x 1106..1325）：名牌下面依序疊 暗底、上 LED、撥桿槽（含暗／橄欖綠交界）、下 LED、橄欖綠底
SW_SX0 = 1106
swx = fq_x(SW_SX0)                              # 909
y = 236                                         # 調頻名牌下緣
PIECES = [('fill', 220, 10), ('crop', (233, 266)), ('crop', (270, 466)), ('crop', (469, 502)), ('fill', 530, None)]
SW_MAP = {}
for kind, a, *rest in PIECES:
    if kind == 'fill':
        n = rest[0] if rest[0] is not None else y_fq_end - y
        strip = FQ.crop((SW_SX0, a, FQ_X1, a + 1))
        for yy in range(y, y + n):
            out.paste(strip, (swx, yy))
        y += n
    else:
        s0, s1 = a
        out.paste(FQ.crop((SW_SX0, s0, FQ_X1, s1)), (swx, y))
        SW_MAP[(s0, s1)] = y
        y += s1 - s0
assert y == y_fq_end, y
sw_y = lambda sy: (SW_MAP[(233, 266)] + sy - 233) if sy < 266 else (SW_MAP[(270, 466)] + sy - 270) if sy < 466 else (SW_MAP[(469, 502)] + sy - 469)
R_SW = dict(
    led_top=(fq_x(1198), sw_y(241), fq_x(1198) + 26, sw_y(241) + 16),
    led_bot=(fq_x(1198), sw_y(477), fq_x(1198) + 26, sw_y(477) + 16),
    lever=(fq_x(1182), sw_y(299), fq_x(1241), sw_y(436)),
)
R_SW['lab_top'] = (R_SW['led_top'][2] + 8, R_SW['led_top'][1] - 10, fq_x_end - 4, R_SW['led_top'][3] + 10)
R_SW['lab_bot'] = (R_SW['led_bot'][2] + 8, R_SW['led_bot'][1] - 10, fq_x_end - 4, R_SW['led_bot'][3] + 10)
R_SW['sw'] = (swx + 12, R_SW['led_top'][1] - 10, fq_x_end - 4, R_SW['led_bot'][3] + 10)

hgroove(y_g1)
vgroove(fq_x_end, y_fq, y_fq_end)
# 名牌「調頻 / DATA TUNING」照舊掛在分隔槽上
out.paste(FQ.crop((828, 14, 1310, 110)), (fq_x(828), 14 - TITLE_Y0 + y_fq))

# ── 右欄：就這張＋隨機（原本一顆 168×358 直鍵 → 上長下短兩顆）────────
# 2026-11-06 店主：「就這張溢出按鈕了」「隨機只需要留骰子」「就這張也要有一個圖示可以代表」——
# 兩顆鍵都只放像素圖示（就這張＝黑膠唱片、隨機＝骰子），字拿掉，回到上下等高
KEY_W, KEY_GAP = 168, 11
KEY_H_DRAW = KEY_H_RAND = 160
kx0 = fq_x_end + GROOVE + ((INNER_X1 - fq_x_end - GROOVE) - KEY_W) // 2
ky_a = y_fq + 16
ky_b = ky_a + KEY_H_DRAW + KEY_GAP
recess(kx0, ky_a, kx0 + KEY_W, ky_b + KEY_H_RAND)
d.rectangle((kx0 - 3, ky_a + KEY_H_DRAW + 3, kx0 + KEY_W + 2, ky_b - 4), fill=(0, 2, 7))   # 兩顆之間一條暗縫
R_KEYS = dict(draw=(kx0, ky_a, kx0 + KEY_W, ky_a + KEY_H_DRAW), rand=(kx0, ky_b, kx0 + KEY_W, ky_b + KEY_H_RAND))


def short_key(src, h):                          # 直鍵剪短：上半截＋下半截，中段抽掉
    top = src.crop((0, 0, src.width, h // 2)); bot = src.crop((0, src.height - (h - h // 2), src.width, src.height))
    im = Image.new('RGB', (src.width, h)); im.paste(top, (0, 0)); im.paste(bot, (0, h // 2))
    return im


def copper_lut():                               # 銅色：照能量輪銅帶（tile-x）的顏色依亮度對照
    t = np.asarray(TILES['x']).reshape(-1, 3).astype(float)
    lum = t @ np.array([.299, .587, .114])
    lut = np.zeros((256, 3))
    for L in range(256):
        sel = t[np.abs(lum - L * 0.86) <= 6]
        if len(sel) < 4:
            sel = t[np.argsort(np.abs(lum - L * 0.86))[:8]]
        lut[L] = np.median(sel, axis=0)
    return lut


key_draw = short_key(BTN, KEY_H_DRAW)
kr = np.asarray(short_key(BTN, KEY_H_RAND)).astype(float)
lum = np.clip(kr @ np.array([.299, .587, .114]), 0, 255).astype(int)
key_rand = Image.fromarray(np.clip(copper_lut()[lum], 0, 255).astype('uint8'))
# 骰子（9×9 格，三點）畫在隨機鍵上
gk = Grid(round((KEY_W - 9 * P) / 2), round((KEY_H_RAND - 9 * P) / 2) - 3, key_rand)   # 置中（略往上，鍵的下緣比較厚）
DIE_HI = tuple(int(v) for v in copper_lut()[230])
for a in range(9):
    for b in range(9):
        edge = a in (0, 8) or b in (0, 8)
        corner = (a in (0, 8)) and (b in (0, 8))
        if corner:
            continue
        gk.box(a, b, a + 1, b + 1, INK if edge else DIE_HI)
for a, b in ((2, 2), (4, 4), (6, 6)):
    gk.box(a, b, a + 1, b + 1, INK)
# 黑膠唱片（13×13 格）畫在就這張鍵上：黑盤、兩圈溝紋、左上一道反光、中間標籤＋軸孔
VINYL_N = 13
gv = Grid(round((KEY_W - VINYL_N * P) / 2), round((KEY_H_DRAW - VINYL_N * P) / 2) - 3, key_draw)
DISC, GROOVE_C, SHEEN, LABEL, LABEL_HI = (16, 13, 10), (52, 45, 36), (150, 132, 96), (196, 64, 44), (232, 112, 72)
VINYL = [                                         # 手點的 13×13：D 黑盤、g 溝紋、s 反光、L 標籤、l 標籤亮面、o 軸孔
    '....DDDDD....',
    '..DDDDDDDDD..',
    '.DDsDDDDDDDD.',
    '.DsDDggggDDD.',
    'DsDgDDDDDgDDD',
    'DDgDDlLLDDgDD',
    'DDgDDLoLDDgDD',
    'DDgDDLLLDDgDD',
    'DDDgDDDDDgDDD',
    '.DDDggggDDDD.',
    '.DDDDDDDDDDD.',
    '..DDDDDDDDD..',
    '....DDDDD....',
]
VC = {'D': DISC, 'g': GROOVE_C, 's': SHEEN, 'L': LABEL, 'l': LABEL_HI, 'o': DISC}
for b, row in enumerate(VINYL):
    for a, ch in enumerate(row):
        if ch in VC:
            gv.box(a, b, a + 1, b + 1, VC[ch])
key_draw.save(os.path.join(SPR, 'key-draw.png')); key_rand.save(os.path.join(SPR, 'key-rand.png'))

# ── 篩選列（FILTER）：三顆篩選滾筒＋名牌，右邊液晶計數＋全部鍵 ─────────
hgroove(y_g2); hgroove(y_g3)
gf = Grid(INNER_X0, y_flt)
FL_DRUMS_CELLS = [('genre', 12, 50), ('grade', 53, 104), ('tier', 107, 145)]   # 各滾筒 x 範圍（格）
FW_A0, FW_A1, FW_B0, FW_B1 = 5, 151, 15, 52                                  # 窗框（格）
PL_B0, PL_B1 = 2, 13                                                        # 名牌（格）
fw = gf.rect(FW_A0, FW_B0, FW_A1, FW_B1)
out.paste(nine(WIN_SRC, fw[2] - fw[0], fw[3] - fw[1]), fw[:2])
FL_DRUM_H = (fw[3] - fw[1]) - (FR_T + GP_T + GP_B + FR_B)
fl_y0 = fw[1] + FR_T + GP_T
FL_DRUMS = []
for key, a0, a1 in FL_DRUMS_CELLS:
    x0, x1 = gf.gx(a0), gf.gx(a1)
    out.paste(make_drum(x1 - x0, FL_DRUM_H), (x0, fl_y0))
    FL_DRUMS.append((key, (x0, fl_y0, x1, fl_y0 + FL_DRUM_H)))
    plate(gf, a0, PL_B0, a1, PL_B1)
# 讀數指標：窗框左右各一個琥珀色三角，對準滾筒中線（顏色取自能量輪刻度）
TICK = WH.getpixel((450, 414))
mid_b = ((fl_y0 + FL_DRUM_H / 2) - y_flt) / P
mb = round(mid_b - 1.5)
for a, b0, b1 in ((FW_A0 + 1.5, mb, mb + 3), (FW_A0 + 2.5, mb + 1, mb + 2)):
    gf.box(a, b0, a + 1, b1, TICK)
for a, b0, b1 in ((FW_A1 - 2.5, mb, mb + 3), (FW_A1 - 3.5, mb + 1, mb + 2)):
    gf.box(a, b0, a + 1, b1, TICK)
# 各滾筒的指示燈：從原稿 SCAN／RADIO 旁剪亮／暗兩顆（去掉原底色），嵌在窗框上緣、對準每顆滾筒中央
def led_sprite(box):
    im = FQ.crop(box).convert('RGBA'); a = np.asarray(im).astype(int)
    bgc = a[0, 0, :3]
    a[..., 3] = np.where(np.abs(a[..., :3] - bgc).sum(axis=2) < 30, 0, 255)
    return Image.fromarray(a.astype('uint8'))


LED_ON = led_sprite((1194, 238, 1228, 260)); LED_OFF = led_sprite((1194, 474, 1228, 496))
LED_ON.save(os.path.join(SPR, 'led-on.png')); LED_OFF.save(os.path.join(SPR, 'led-off.png'))
R_PLATES = {}
R_LEDS = {}
for key, a0, a1 in FL_DRUMS_CELLS:
    r = gf.rect(a0, PL_B0, a1, PL_B1)
    R_PLATES[key] = r
    lx = (gf.gx(a0) + gf.gx(a1)) // 2 - LED_ON.width // 2
    ly = fw[1] + 5
    R_LEDS[key] = (lx, ly, lx + LED_ON.width, ly + LED_ON.height)
# 右塊：液晶計數器＋全部鍵
RB_A0, RB_A1 = 156, 214
lcd(gf, RB_A0, PL_B0, RB_A1, 26)
R_LCD = gf.rect(RB_A0 + 1, PL_B0 + 1, RB_A1 - 1, 25)
# 2026-11-07 店主：符合張數不要中文，改成水表那種數字滾輪——五顆數字滾筒（同篩選滾筒的畫法），左右各一個琥珀色指標對準中線
ODO_N, ODO_W, ODO_GAP, ODO_A0, ODO_B0, ODO_B1 = 5, 9, 1, 160, 5, 23
ODO = []
for i in range(ODO_N):
    a0 = ODO_A0 + i * (ODO_W + ODO_GAP)
    r = gf.rect(a0, ODO_B0, a0 + ODO_W, ODO_B1)
    out.paste(make_drum(r[2] - r[0], r[3] - r[1]), r[:2])
    ODO.append(r)
ODO_H = ODO[0][3] - ODO[0][1]
om = round((ODO_B0 + ODO_B1) / 2 - 1.5)
for a, b0, b1 in ((ODO_A0 - 2.5, om, om + 3), (ODO_A0 - 1.5, om + 1, om + 2)):
    gf.box(a, b0, a + 1, b1, TICK)
oa1 = ODO_A0 + ODO_N * (ODO_W + ODO_GAP) - ODO_GAP
for a, b0, b1 in ((oa1 + 1.5, om, om + 3), (oa1 + 0.5, om + 1, om + 2)):
    gf.box(a, b0, a + 1, b1, TICK)
ALL = gf.rect(RB_A0, 29, RB_A1, FW_B1)
recess(ALL[0], ALL[1], ALL[2], ALL[3])
key_all = Image.new('RGB', (ALL[2] - ALL[0], ALL[3] - ALL[1]))
gka = Grid(0, 0, key_all)
na, nb = (key_all.width) / P, (key_all.height) / P
gka.box(0, 0, na + 1, nb + 1, OUT); gka.box(1, 1, na - 1, nb - 1, STEEL)
gka.box(1, 1, na - 1, 2, STEEL_HI); gka.box(1, 1, 2, nb - 1, STEEL_HI)
gka.box(1, nb - 2, na - 1, nb - 1, STEEL_LO); gka.box(na - 2, 1, na - 1, nb - 1, STEEL_LO)
for a, b in ((3, 3), (na - 4, 3), (3, nb - 4), (na - 4, nb - 4)):          # 四角鉚釘
    gka.box(a, b, a + 1, b + 1, STEEL_LO); gka.box(a, b, a + 1, b + 0.5, STEEL_HI)
key_all.save(os.path.join(SPR, 'key-all.png'))

# ── 輪子區：輪窗內部抽掉一半像素列，再把字、刻度、讀數指標原樣貼回 ──────────
sec = Image.fromarray(np.asarray(WH)[SEC_ROWS])
new_of = lambda s: int(np.argmin(np.abs(np.array(SEC_ROWS) - s)))
bg_wh = WH.crop((0, 52, W, 53))
MODS = {'x': dict(cv=224, win=(229, 410), glyph=(118, 228), scale=(420, 500)),
        'y': dict(cv=644, win=(640, 823), glyph=(530, 640), scale=(832, 915)),
        'z': dict(cv=1060, win=(1052, 1237), glyph=(944, 1052), scale=(1245, 1322))}
whf = np.asarray(WH).astype(int)


def colored_bbox(x0, x1, y0, y1, lum=95):
    reg = whf[y0:y1, x0:x1]
    m = reg.max(axis=2) > lum
    ys, xs = np.where(m)
    return (x0 + xs.min(), y0 + ys.min(), x0 + xs.max() + 1, y0 + ys.max() + 1)


def clean_row(x0, x1, cands):
    """一列乾淨底色：在候選列裡逐欄取中位數（刻線、字都是離群值，不會被拉成一條直線）。"""
    a = np.median(whf[list(cands), x0:x1], axis=0)
    return Image.fromarray(a[None].astype('uint8'))


win_top_new = new_of(WIN_T0)
win_bot_new = new_of(WIN_B1 - 1) + 1
for ax, m in MODS.items():
    gx0, gx1 = m['glyph']
    top = colored_bbox(gx0, gx1, 150, 400)
    bot = colored_bbox(gx0, gx1, 400, 680)
    strip = clean_row(gx0, gx1, range(260, 560))
    for yy in range(win_top_new, win_bot_new):
        sec.paste(strip, (gx0, yy))
    pad = 6
    sec.paste(WH.crop((top[0] - pad, top[1] - pad, top[2] + pad, top[3] + pad)), (top[0] - pad, win_top_new + (top[1] - WIN_T0) - pad))
    sec.paste(WH.crop((bot[0] - pad, bot[1] - pad, bot[2] + pad, bot[3] + pad)), (bot[0] - pad, win_bot_new - (WIN_B1 - bot[3]) - (bot[3] - bot[1]) - pad))
    # 刻度：找出每一條刻線，清空後依新位置貼回（兩端長線、四分之一中線、中央發光那條全留，短線隔一條留一條）
    sx0, sx1 = m['scale']
    reg = whf[180:650, sx0:sx1]
    lit = (reg.max(axis=2) > 120).any(axis=1)
    runs = []
    yy = 0
    while yy < len(lit):
        if lit[yy]:
            y2 = yy
            while y2 < len(lit) and lit[y2]:
                y2 += 1
            if y2 - yy >= 2:
                xs = np.where((reg[yy:y2].max(axis=2) > 120).any(axis=0))[0]
                runs.append((180 + yy, 180 + y2, xs.max() - xs.min() + 1))
            yy = y2
        else:
            yy += 1
    gap0 = m['win'][1] + 1                       # 輪窗右框外到刻度之間（中央光暈會漫到這裡）
    strip = clean_row(gap0, sx1, list(range(150, 186)) + list(range(645, 681)))
    for yy in range(win_top_new, win_bot_new):
        sec.paste(strip, (gap0, yy))
    centre = max(runs, key=lambda r: (r[1] - r[0]) * r[2])
    cm = (centre[0] + centre[1]) // 2
    # 中央那條＋◀指標＋整圈光暈：剪 ±34 列整塊貼回；塊裡其他短刻線先用上下列內插抹掉
    BAND = 34
    band = whf[cm - BAND:cm + BAND, m['win'][1] - 34:sx1].copy()
    for r in runs:
        if r is centre or r[1] <= cm - BAND or r[0] >= cm + BAND:
            continue
        a0, a1 = max(0, r[0] - 2 - (cm - BAND)), min(2 * BAND - 1, r[1] + 1 - (cm - BAND))
        c0 = sx0 - (m['win'][1] - 34)
        for yy in range(a0 + 1, a1):
            t = (yy - a0) / (a1 - a0)
            band[yy, c0:] = band[a0, c0:] * (1 - t) + band[a1, c0:] * t
    sec.paste(Image.fromarray(band.astype('uint8')), (m['win'][1] - 34, new_of(cm) - BAND))
    # 其他刻線：只貼刻線本身的像素（最亮通道 > 95），兩端長線、四分之一中線全留，短線隔一條留一條
    wide = sorted(r[2] for r in runs)[-5] if len(runs) > 5 else 30
    short_i = 0
    for r in runs:
        if r is centre:
            continue
        if r[2] < wide - 4:
            short_i += 1
            if short_i % 2 == 0:
                continue
        crop = whf[r[0] - 1:r[1] + 1, sx0:sx1]
        msk = crop.max(axis=2) > 95
        tgt = np.asarray(sec)[new_of(r[0]) - 1:new_of(r[0]) - 1 + crop.shape[0], sx0:sx1].copy()
        tgt[msk] = crop[msk]
        sec.paste(Image.fromarray(tgt.astype('uint8')), (sx0, new_of(r[0]) - 1))
    m['centre_new'] = new_of(cm)

# 輪子 canvas：wheel-spans 照同一組留下的列重算，銅帶照現行演算法畫（1 原圖 px＝1 canvas px，明暗每格一階）
NEW_SPANS = {}
for ax, m in MODS.items():
    sp = SPANS[ax]
    cv_rows = [j for j, s in enumerate(SEC_ROWS) if 151 <= s < 151 + sp['h']]
    jt, jb = cv_rows[0], cv_rows[-1] + 1
    rows_new, ys = [], []
    for j in range(jt, jb):
        oc = SEC_ROWS[j] - 151
        if sp['y0'] <= oc < sp['y1']:
            ys.append(j - jt)
            rows_new.append(sp['rows'][oc - sp['y0']])
    y0n, y1n = ys[0], ys[-1] + 1
    rows_new = rows_new[:y1n - y0n]
    NEW_SPANS[ax] = dict(w=sp['w'], h=jb - jt, y0=y0n, y1=y1n, rows=rows_new)
    m['cv_rect'] = (m['cv'], jt, m['cv'] + sp['w'], jb)

VALS = {'x': 25, 'y': 50, 'z': 50}


def render_wheel(ax):
    sp = NEW_SPANS[ax]; tile = TILES[ax]; th = tile.height
    im = Image.new('RGBA', (sp['w'], sp['h']), (0, 0, 0, 0))
    y0, y1 = sp['y0'], sp['y1']; cyy = (y0 + y1) / 2; R = (y1 - y0) / 2
    off = VALS[ax] * 4.2
    for y in range(y0, y1):
        k = (cyy - y) / R
        if k <= -1 or k >= 1:
            continue
        row = sp['rows'][y - y0]
        if not row:
            continue
        u = R * math.asin(k)
        t = int(((u + off) % th + th) % th)
        seg = tile.crop((0, t, tile.width, t + 1)).resize((row[1] - row[0], 1), Image.NEAREST).convert('RGBA')
        # 明暗：以像素格為單位取圓柱角度
        ci = math.floor((y - y0) / P)
        kc = (cyy - (y0 + (ci + .5) * P)) / R
        kc = max(-.999, min(.999, kc))
        c = math.sqrt(1 - kc * kc)
        dark = round(min(.85, (1 - c) ** 1.2 * .95) * 10) / 10
        hi = round(max(0, (c - .92) * 1.2) * 20) / 20
        a = np.asarray(seg).astype(float)
        a[..., :3] = a[..., :3] * (1 - dark)
        a[..., :3] = a[..., :3] * (1 - hi) + np.array([255, 240, 200]) * hi
        im.paste(Image.fromarray(a.astype('uint8')), (row[0], y))
    return im


out.paste(sec, (0, y_wh))
WHEEL_IMG = {}
for ax, m in MODS.items():
    WHEEL_IMG[ax] = render_wheel(ax)
R_WHEEL = {ax: (m['cv_rect'][0], m['cv_rect'][1] + y_wh, m['cv_rect'][2], m['cv_rect'][3] + y_wh) for ax, m in MODS.items()}

# ── 側軌與螺絲（照現行）──────────────────────────────────────────
rail_row_l, rail_row_r = WH.crop((0, 400, L_RAIL, 401)), WH.crop((R_RAIL, 400, W, 401))
for y in range(160, H - BOTTOM):
    out.paste(rail_row_l, (0, y)); out.paste(rail_row_r, (R_RAIL, y))
out.paste(WH.crop((0, 0, L_RAIL, 160)), (0, 0)); out.paste(WH.crop((R_RAIL, 0, W, 160)), (R_RAIL, 0))
for x0, x1 in ((0, L_RAIL), (R_RAIL, W)):
    out.paste(WH.crop((x0, 0, x1, BOTTOM)).transpose(Image.FLIP_TOP_BOTTOM), (x0, H - BOTTOM))
for cxx in (54, W - 54):
    out.paste(SCREW, (cxx - 35, H - 62 - 35), SCREW)

out.paste(Image.open(os.path.join(HERE, 'panel-only.png')).convert('RGB').crop((0, y_g3, W, H)), (0, y_g3))

# 色溫輪名牌「溫暖 / WARMTH」→「溫度 / TEMP」（2026-11-07 店主：溫度的英文太長就用縮寫）。
# 原稿字是 Noto Sans TC／Noto Sans Regular 一路的黑體：原字清掉，用同字型（fonts/ 裡只含這幾個字的子集）4 倍超取樣畫回。
def relabel_temp(img):
    dy = y_wh - 946                                   # 原稿量到的座標是舊版（輪子模組從 946 起）
    a = np.asarray(img).astype(int)
    FG = (208, 144, 138)
    for x0, x1 in ((950, 1090), (1092, 1316)):        # 清掉「溫暖」與「/ WARMTH」，每列用該列非字的中位色補
        for y in range(955 + dy, 1032 + dy):
            row = a[y, x0:x1]; bg = row[(row[:, 0] - row[:, 1]) < 15]
            if len(bg):
                a[y, x0:x1] = np.median(bg, axis=0)
    im = Image.fromarray(a.astype('uint8'))
    def draw(text, font, left, top=None, bottom=None):
        SS = 4
        f = ImageFont.truetype(os.path.join(SRC_DIR, 'fonts', font), font_size[font] * SS)
        bb = f.getbbox(text)
        L = Image.new('L', (bb[2] - bb[0] + 8 * SS, bb[3] - bb[1] + 8 * SS), 0)
        ImageDraw.Draw(L).text((4 * SS - bb[0], 4 * SS - bb[1]), text, font=f, fill=255)
        L = L.resize((L.width // SS, L.height // SS), Image.LANCZOS)
        y = top - 4 if top is not None else bottom - (L.height - 4)
        im.paste(Image.new('RGB', L.size, FG), (left - 4, y), L)
    font_size = {'noto-sans-tc-400-subset.ttf': 64, 'noto-sans-400-subset.ttf': 45}
    draw('溫度', 'noto-sans-tc-400-subset.ttf', 957, top=963 + dy)
    draw('/ TEMP', 'noto-sans-400-subset.ttf', 1100, bottom=1022 + dy)
    return im


out.paste(relabel_temp(out), (0, 0))              # 原地改（各 Grid 綁著 out 這個物件）
bg = out.copy()                                 # 實作用底圖（無文字、無活件）
bg.save(os.path.join(HERE, 'panel-bg.png'), optimize=True); bg.save('tune/panel-all.png', optimize=True)

# 明暗罩貼圖
SH_FQ = shade_overlay(FQ_DRUM_H); SH_FL = shade_overlay(FL_DRUM_H); SH_ODO = shade_overlay(ODO_H)
SH_FQ.save(os.path.join(SPR, f'drum-shade-{FQ_DRUM_H}.png')); SH_FL.save(os.path.join(SPR, f'drum-shade-{FL_DRUM_H}.png')); SH_ODO.save(os.path.join(SPR, f'drum-shade-{ODO_H}.png'))

# ════════ 以下是 HTML 活件的示意（實作時是 HTML 疊在底圖上）════════════════
mock = out.convert('RGBA')


def text_img(s, k, color, shadow=None):
    """16 點陣字放大 k 倍（DotGothic16 的替身）。shadow=(dx,dy,rgba) 硬邊位移陰影。"""
    tmp = Image.new('L', (len(s) * 16 + 4, 18), 0)
    dd = ImageDraw.Draw(tmp); dd.fontmode = '1'
    dd.text((0, 0), s, font=UNI, fill=255)
    bb = tmp.getbbox() or (0, 0, 1, 1)
    w = round(UNI.getlength(s))
    tmp = tmp.crop((0, 0, max(w, bb[2]), 16)).resize((max(w, bb[2]) * k, 16 * k), Image.NEAREST)
    im = Image.new('RGBA', tmp.size, color + (0,))
    im.putalpha(tmp)
    solid = Image.new('RGBA', tmp.size, color + (255,))
    im = Image.composite(solid, Image.new('RGBA', tmp.size, (0, 0, 0, 0)), tmp)
    if shadow:
        dx, dy, sc = shadow
        base = Image.new('RGBA', (im.width + abs(dx), im.height + abs(dy)), (0, 0, 0, 0))
        sh = Image.composite(Image.new('RGBA', tmp.size, sc), Image.new('RGBA', tmp.size, (0, 0, 0, 0)), tmp)
        base.alpha_composite(sh, (max(dx, 0), max(dy, 0)))
        base.alpha_composite(im, (max(-dx, 0), max(-dy, 0)))
        im = base
    return im


def put(img, im, cx, cy):
    img.alpha_composite(im, (round(cx - im.width / 2), round(cy - im.height / 2)))


def put_l(img, im, x, cy):
    img.alpha_composite(im, (round(x), round(cy - im.height / 2)))


def drum_text(rect, items, k, pitch, shade):
    """滾筒文字：中間那格是目前值，上下各露半格；最後疊每格一階的明暗罩。"""
    x0, y0, x1, y1 = rect
    layer = Image.new('RGBA', (x1 - x0, y1 - y0), (0, 0, 0, 0))
    hcy = (y1 - y0) / 2
    for i, (s, col) in enumerate(items):
        put(layer, text_img(s, k, col), (x1 - x0) / 2, hcy + (i - 1) * pitch)
    layer.alpha_composite(shade.resize(layer.size, Image.NEAREST))
    mask = Image.new('L', layer.size, 0)
    ImageDraw.Draw(mask).rectangle((6, 3, layer.width - 7, layer.height - 4), fill=255)   # 圓角內
    keep = Image.new('RGBA', layer.size, (0, 0, 0, 0)); keep.paste(layer, (0, 0), mask)
    mock.alpha_composite(keep, (x0, y0))


# 搜尋列
pl = R_SEARCH['plate']
put(mock, text_img('搜尋/SEARCH', 2, INK), (pl[0] + pl[2]) / 2, (pl[1] + pl[3]) / 2)
inp = R_SEARCH['input']
put_l(mock, text_img('藝人或專輯', 3, (109, 100, 64)), inp[0] + 20, (inp[1] + inp[3]) / 2)
# FREQUENCY 四顆滾筒
for (name, rect), items, k, pitch in zip(FQ_DRUMS, (
        [('靜', AX['x']), ('躁', AX['x']), ('靜', AX['x'])],
        [('輕', AX['y']), ('重', AX['y']), ('輕', AX['y'])],
        [('冷', AX['cold']), ('暖', AX['z']), ('冷', AX['cold'])],
        [('平靜', CELLC['still']), ('恍惚', CELLC['languid']), ('頹靡', CELLC['decay'])]), (4, 4, 4, 3), (90, 90, 90, 76)):
    drum_text(rect, items, k, pitch, SH_FQ)
# SCAN／RADIO 撥桿（三格貼圖；示意停在上＝SCAN）
lever = Image.open('tune/switch.png').convert('RGB')
lw = lever.width // 3
lr = R_SW['lever']
mock.paste(lever.crop((0, 0, lw, lever.height)), lr[:2])
mock.paste(FQ.crop((1198, 241, 1224, 257)), R_SW['led_top'][:2])
put_l(mock, text_img('SCAN', 2, AMBER), R_SW['lab_top'][0], (R_SW['led_top'][1] + R_SW['led_top'][3]) / 2)
put_l(mock, text_img('RADIO', 2, DIM), R_SW['lab_bot'][0], (R_SW['led_bot'][1] + R_SW['led_bot'][3]) / 2)
# 兩顆直鍵
hl = (255, 236, 170, 140)
mock.paste(key_draw, R_KEYS['draw'][:2]); mock.paste(key_rand, R_KEYS['rand'][:2])
rk = R_KEYS['draw']
# 兩顆鍵只有圖示（畫在零件圖上），不疊字
# 篩選滾筒
FL_ITEMS = {
    'genre': [('搖滾', DIM), ('爵士', AMBER), ('電子', DIM)],
    'grade': [('全部', DIM), ('經典4★+', AMBER), ('經典5★', DIM)],
    'tier': [('普通', DIM), ('全部', BEIGE), ('殿堂', DIM)],
}
for key, rect in FL_DRUMS:
    drum_text(rect, FL_ITEMS[key], 3, 80, SH_FL)
for key, lab in (('genre', '類別 GENRE'), ('grade', '等級 RATING'), ('tier', '分級 TIER')):
    r = R_PLATES[key]
    put(mock, text_img(lab, 2, INK), (r[0] + r[2]) / 2, (r[1] + r[3]) / 2 - 2)
    mock.alpha_composite(LED_ON if key in ('genre', 'grade') else LED_OFF, R_LEDS[key][:2])
# 液晶計數器
for i, r in enumerate(ODO):                    # 水表滾輪 02886
    dgt = '02886'[i]
    drum_text(r, [(str((int(dgt) + 9) % 10), DIM), (dgt, BEIGE), (str((int(dgt) + 1) % 10), DIM)], 4, 76, SH_ODO)
# 全部鍵
mock.paste(key_all, ALL[:2])
put(mock, text_img('全部', 3, BEIGE, (0, 3, (0, 0, 0, 255))), (ALL[0] + ALL[2]) / 2, (ALL[1] + ALL[3]) / 2 - 18)
put(mock, text_img('RESET', 2, DIM), (ALL[0] + ALL[2]) / 2, (ALL[1] + ALL[3]) / 2 + 34)
# 輪子
for ax in 'xyz':
    r = R_WHEEL[ax]
    mock.alpha_composite(WHEEL_IMG[ax], r[:2])

mock.paste(Image.open(os.path.join(HERE, 'mockup.png')).convert('RGBA').crop((0, 934, W, H)), (0, 934))
mock = mock.convert('RGB')
mock.save(os.path.join(HERE, 'mockup.png'), optimize=True)
mock.resize((720, round(H * 720 / W)), Image.LANCZOS).save(os.path.join(HERE, 'preview.png'), optimize=True)

# ── 活件框（annotated.png）與百分比 ───────────────────────────────
ann = mock.copy()
da = ImageDraw.Draw(ann)
ACTIVE = []


def reg(name, r, live=True):
    ACTIVE.append((name, r, live))


reg('search.plate', R_SEARCH['plate'], False); reg('search.input', R_SEARCH['input']); reg('search.go', R_SEARCH['go'])
for name, r in FQ_DRUMS:
    reg('fq.' + name, r, False)
reg('sw (SCAN/RADIO)', R_SW['sw']); reg('sw.lever', R_SW['lever'], False)
reg('sw.led.top', R_SW['led_top'], False); reg('sw.led.bot', R_SW['led_bot'], False)
reg('sw.lab.top', R_SW['lab_top'], False); reg('sw.lab.bot', R_SW['lab_bot'], False)
reg('key.draw 就這張', R_KEYS['draw']); reg('key.rand 隨機', R_KEYS['rand'])
for key, r in FL_DRUMS:
    reg('flt.drum.' + key, r, False)                                    # 滾筒本體（字條容器）
    reg('flt.hit.' + key, (r[0], R_PLATES[key][1], r[2], fw[3]))        # 熱區：名牌＋窗框＋滾筒整欄
for key, r in R_PLATES.items():
    reg('flt.plate.' + key, r, False)
    reg('flt.led.' + key, R_LEDS[key], False)
reg('flt.lcd', R_LCD, False)
for i, r in enumerate(ODO):
    reg(f'odo.{i}', r, False)
reg('flt.all 全部', ALL)
for ax, r in R_WHEEL.items():
    reg('wheel.' + ax, r)
for name, r, live in sorted(ACTIVE, key=lambda t: t[2]):
    da.rectangle((r[0], r[1], r[2] - 1, r[3] - 1), outline=(255, 60, 60) if live else (60, 220, 230), width=3)
ann.save(os.path.join(HERE, 'annotated.png'), optimize=True)

json.dump(NEW_SPANS, open(os.path.join(HERE, 'wheel-spans-d2.json'), 'w'))   # D2 版不用；輪廓用 wheels_half.py 的半高表
import shutil; shutil.copy(os.path.join(HERE, 'wheel-spans-half.json'), 'tune/wheel-spans.json')

pc = lambda v, t: round(v / t * 100, 3)
print('mockup.png', W, H, '寬高比', f'{W}/{H}')
print(f'y：搜尋 {y_search}–{y_g1}｜FREQUENCY {y_fq}–{y_fq_end}（滾筒窗 {y_fqwin}–{y_fq_end}）｜篩選 {y_flt}–{y_g3}｜輪子 {y_wh}–{H - BOTTOM}')
for name, r, live in ACTIVE:
    x0, y0, x1, y1 = r
    print(f'{name:18s} {"活" if live else "顯"} px({x0},{y0},{x1},{y1})  left:{pc(x0, W)}%;top:{pc(y0, H)}%;width:{pc(x1 - x0, W)}%;height:{pc(y1 - y0, H)}%')
print('FQ drum h', FQ_DRUM_H, 'FILTER drum h', FL_DRUM_H, 'wheel spans', {k: (v['h'], v['y0'], v['y1']) for k, v in NEW_SPANS.items()})
