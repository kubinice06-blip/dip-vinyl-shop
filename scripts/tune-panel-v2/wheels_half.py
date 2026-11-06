#!/usr/bin/env python3
"""頻率光譜主機面板 v2 —— 設計方向 D1「照草圖直譯」設計稿（只產圖，不動 repo）。

照店主紅圈直譯：
  * FREQUENCY 區外框高度不變；滾筒窗砍成上半（181px，原 364px），滾筒只露目前那一格。
  * 滾筒窗下面空出來的長條（從內面板左緣到 SCAN/RADIO 撥桿槽）→「類別」橫向滾筒（左右滑）。
  * 三顆輪子模組砍成下半（外殼 542→274px，輪子 441→190px），上半空出來的一整排 →
    「等級」「分級」兩個直向滾筒＋「符合張數／歸零」，對齊原稿三欄。
  * 右欄就這張凹槽拆成上下兩顆黃銅鍵（btn-v.png 抽掉中段 158px）：上＝就這張、下＝隨機。

所有外觀都從原稿剪貼／翻面／延伸，或照原稿配色在像素格上逐格畫（跟搜尋列同一套）；
不用任何漸層、圓角、模糊。滾筒的明暗是把原稿滾筒的亮暗剖面「整格」重新取樣（cellmap），
不是重新內插。文字在實作時改成 HTML（DotGothic16），這裡用 Unifont 16px 點陣字整數倍放大示意。

用法（cwd = repo 根目錄）：python3 <this>/mockup.py
輸出：同資料夾 mockup.png（1438×1413）、preview.png（寬 720）、hotspots.png（活件熱區示意）、layout.json（各區座標）
"""
import json
import math
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out')
os.makedirs(HERE, exist_ok=True)
SRC_DIR = os.path.dirname(os.path.abspath(__file__))
REPO = os.getcwd()
def rp(p): return os.path.join(REPO, p)

WH = Image.open(rp('tune/panel-wheels.jpg')).convert('RGB')
FQ0 = Image.open(rp('tune/panel-freq.jpg')).convert('RGB')
SCREW = Image.open(rp('tune/screw.png'))
BTN = Image.open(rp('tune/btn-v.png')).convert('RGB')
SWITCH = Image.open(rp('tune/switch.png')).convert('RGBA')
TILES = {k: np.array(Image.open(rp(f'tune/tile-{k}.png')).convert('RGB')).astype(float) for k in 'xyz'}
SPANS = json.load(open(os.path.join(SRC_DIR, 'wheel-spans-full.json')))   # 原尺寸輪廓（tune/wheel-spans.json 已換成半高版）
UNI = ImageFont.truetype('/usr/share/fonts/opentype/unifont/unifont.otf', 16)

W = WH.width                               # 1438
P = W / 260                                # 原稿一格 ≈ 5.53px
LAYOUT = {}                                # name -> [x0, y0, x1, y1]（整張原圖 px）
def mark(name, x0, y0, x1, y1): LAYOUT[name] = [int(x0), int(y0), int(x1), int(y1)]

# ── 版面（整張 y）：外框、搜尋列、FREQUENCY、輪子區的總高都跟現版一樣 ──────────
TOP, SEARCH_H, GROOVE, BOTTOM = 45, 105, 12, 45
FQ_X0, FQ_X1, FQ_Y0, FQ_Y1 = 114, 1325, 36, 540
CUT0, CUT1 = 630, 825
WH_Y0, WH_Y1 = 45, 735
y_search = TOP; y_g1 = y_search + SEARCH_H; y_fq = y_g1 + GROOVE
FQ_H = FQ_Y1 - FQ_Y0                       # 504
y_g2 = y_fq + FQ_H; y_wh = y_g2 + GROOVE
WH_H = WH_Y1 - WH_Y0                       # 690
y_bot = y_wh + WH_H; H = y_bot + BOTTOM    # 1413
L_RAIL, R_RAIL = 106, 1332
INNER_X0, INNER_X1 = 112, 1326

# 原稿配色（同 build-tune-panel.py）
OUT = (10, 10, 18)
WIN_OUT = (0, 2, 7); WIN_HI = (67, 70, 75); WIN_IN = (8, 8, 10); WIN_SH = (21, 20, 26)
PLATE = (189, 160, 116); PLATE_HI = (214, 186, 140); PLATE_LO = (150, 121, 84); PLATE_OUT = (26, 11, 0)
BRASS = (175, 137, 62); BRASS_HI = (224, 200, 136); BRASS_LO = (101, 72, 35); INK = (42, 30, 7)
# 文字色（實作時是 HTML 字色；全部取自 dip-tune.js 現有色票）
AMBER = (255, 211, 77)      # SCAN 亮燈色：篩選「生效中」
CREAM = (233, 226, 200)     # 「全部」＝沒篩
DIM = (141, 148, 120)       # #8d9478 鄰格
DIM2 = (78, 82, 66)         # 再外一格
TAN = (190, 169, 138)       # FREQUENCY 字色（取自原稿）
ARROW = (124, 117, 90)      # 撥桿旁 ▲▼ 的顏色（取自原稿）
AX = {'x': (242, 179, 65), 'y': (143, 224, 160), 'z': (255, 122, 107)}
LANGUID = (232, 87, 143)

# ── 工具 ─────────────────────────────────────────────────────
def cellmap(n_dst, n_src):
    """把一段像素藝術沿一個方向「整格」伸縮：目標每一格（P px）取來源最近的一格，不內插。"""
    nd, ns = n_dst / P, n_src / P
    out = []
    for d in range(n_dst):
        j = int(d / P)
        s = int((j + 0.5) * ns / nd)
        out.append(min(n_src - 1, int((s + 0.5) * P)))
    return np.array(out)

def glyphs(s):
    """Unifont 16px 點陣字 → 0/1 遮罩（實作時換 DotGothic16 HTML 字）。"""
    w = max(1, int(math.ceil(UNI.getlength(s))))
    m = Image.new('L', (w, 16), 0); d = ImageDraw.Draw(m); d.fontmode = '1'
    d.text((0, 0), s, font=UNI, fill=255)
    return m

def text_layer(s, k, color, vertical=False, gap=0):
    if vertical:
        parts = [glyphs(ch) for ch in s]
        w = max(p.width for p in parts); h = 16 * len(parts) + gap * (len(parts) - 1) // k
        m = Image.new('L', (w, 16 * len(parts) + (len(parts) - 1) * max(0, gap // k)), 0)
        y = 0
        for p in parts:
            m.paste(p, ((w - p.width) // 2, y)); y += 16 + max(0, gap // k)
    else:
        m = glyphs(s)
    m = m.resize((m.width * k, m.height * k), Image.NEAREST)
    lay = Image.new('RGBA', m.size, color + (0,)); lay.putalpha(m)
    return lay

def put_text(img, s, cx, cy, k, color, vertical=False, gap=0, anchor='c'):
    lay = text_layer(s, k, color, vertical, gap)
    x = cx - lay.width // 2 if anchor == 'c' else cx
    y = cy - lay.height // 2
    img.paste(lay, (int(x), int(y)), lay)
    return lay.size

# ── 原稿滾筒去字：每列用滾筒左側無字處的顏色把筒身補滿（滾筒邊亮線保留）──────────
ROLLERS = [(217, 372), (388, 537), (553, 700), (717, 867), (884, 1074)]
ROLL_Y0, ROLL_Y1 = 217, 506
def clean_rollers(im):
    a = np.array(im).astype(np.int16)
    for x0, x1 in ROLLERS:
        for y in range(ROLL_Y0 - 2, ROLL_Y1 + 2):
            c = np.median(a[y, x0 + 13:x0 + 21], axis=0)
            a[y, x0 + 12:x1 - 14] = c
    return Image.fromarray(a.clip(0, 255).astype(np.uint8))

FQC = clean_rollers(FQ0)
FQA = np.array(FQC)
# 滾筒窗左下角原稿露出一角橄欖色底板：補成方角（底框身往左延伸、左外框往下延伸、框外補素面）
FQA[528:544, 183:196] = FQA[528:544, 236:237]
FQA[515:544, 179:183] = FQA[400, 179:183]
FQA[528:544, 150:179] = FQA[165, 150:179]
WHA = np.array(WH)
ROLL_BLK = FQA[ROLL_Y0:ROLL_Y1, 884:1074]          # 最寬那支滾筒（亢奮／放鬆／平靜那支）去字後：289×190
ROLL_RIM_COLS = list(range(0, 12)), list(range(178, 190))

def roller_vertical(w, h):
    """直向滾筒（上下滾）：長度方向用原稿亮暗剖面整格取樣，寬度方向保留兩側亮邊、中段延伸。"""
    rows = cellmap(h, ROLL_BLK.shape[0])
    cols = ROLL_RIM_COLS[0] + [95] * (w - 24) + ROLL_RIM_COLS[1]
    return ROLL_BLK[np.ix_(rows, cols)].copy()

def roller_horizontal(w, h):
    """橫向滾筒（左右滾）：把直向滾筒轉 90°——原稿的上下亮暗剖面變成左右，兩側亮邊變成上下亮邊。"""
    rows = cellmap(w, ROLL_BLK.shape[0])
    cols = ROLL_RIM_COLS[0] + [95] * (h - 24) + ROLL_RIM_COLS[1]
    return ROLL_BLK[np.ix_(rows, cols)].transpose(1, 0, 2).copy()

# 原稿滾筒窗外框的九宮格（細框版：抽掉框身中段幾列／幾行）
FR_TOP = list(range(176, 187)) + list(range(197, 205))       # 19 列
FR_BOT = list(range(515, 524)) + list(range(534, 544))       # 19 列（544 起是框外的橄欖色）
FR_LEFT = list(range(179, 191)) + list(range(195, 207))      # 24 行
FR_RIGHT = list(range(1081, 1087)) + list(range(1091, 1105)) # 20 行（1105 起是撥桿槽的橄欖色）
WIN_FILL = (3, 3, 6)
def frame9(w, h):
    rows = FR_TOP + [360] * (h - len(FR_TOP) - len(FR_BOT)) + FR_BOT
    cols = FR_LEFT + [640] * (w - len(FR_LEFT) - len(FR_RIGHT)) + FR_RIGHT
    a = FQA[np.ix_(rows, cols)].copy()
    a[len(FR_TOP):h - len(FR_BOT), len(FR_LEFT):w - len(FR_RIGHT)] = WIN_FILL
    return a

def interior(x0, y0, x1, y1):
    return x0 + len(FR_LEFT), y0 + len(FR_TOP), x1 - len(FR_RIGHT), y1 - len(FR_BOT)

# ── 底：外框、內面板、側軌（同 build-tune-panel.py）─────────────────────────
out = Image.new('RGB', (W, H))
out.paste(WH.crop((0, 0, W, TOP)), (0, 0))
row = WH.crop((0, 52, W, 53))
for y in range(TOP, y_bot):
    out.paste(row, (0, y))
out.paste(WH.crop((0, 0, W, BOTTOM)).transpose(Image.FLIP_TOP_BOTTOM), (0, y_bot))

groove_cols = [WH.getpixel((x, 300)) for x in range(506, 506 + GROOVE)]
def hgroove(img, y, x0=INNER_X0, x1=INNER_X1):
    d = ImageDraw.Draw(img)
    for i, c in enumerate(groove_cols):
        d.line((x0, y + i, x1 - 1, y + i), fill=c)
def vgroove(img, x, y0, y1):
    d = ImageDraw.Draw(img)
    for i, c in enumerate(groove_cols):
        d.line((x + i, y0, x + i, y1 - 1), fill=c)

# ── FREQUENCY ────────────────────────────────────────────────
# 欄位對照：整張 x → 原稿 x（中段 630..825 照舊抽掉）
LEFT_W = CUT0 - FQ_X0                      # 516
FQ_W = LEFT_W + (FQ_X1 - CUT1)             # 1016
colmap_fq = np.array([FQ_X0 + i if i < LEFT_W else CUT1 + (i - LEFT_W) for i in range(FQ_W)])
fx = INNER_X0
fq_x_end = fx + FQ_W                        # 1128
def fq_map(x, y):
    nx = x - FQ_X0 + fx if x < CUT0 else x - CUT1 + fx + LEFT_W
    return nx, y - FQ_Y0 + y_fq

# 滾筒窗砍半：框上緣＋內黑 41 列、滾筒 289→102 列（整格取樣，亮暗剖面完整）、框下緣 38 列 → 181 列（現版露出 364）
DRUM_ROLL_H = 102
drum_rows = list(range(176, 217)) + list(ROLL_Y0 + cellmap(DRUM_ROLL_H, ROLL_Y1 - ROLL_Y0)) + list(range(506, 544))
STRIP_ROWS = FQ_H - (176 - FQ_Y0) - len(drum_rows)   # 滾筒窗下空出來的列數
rowmap_drum = list(range(FQ_Y0, 176)) + drum_rows + [165] * STRIP_ROWS   # 165＝原稿素面列
rowmap_full = list(range(FQ_Y0, FQ_Y1))
SPLIT = int(np.searchsorted(colmap_fq, 1106))      # 原稿 x1106 起是 SCAN/RADIO 撥桿槽，整段照原稿不動
fq = np.zeros((FQ_H, FQ_W, 3), np.uint8)
fq[:, :SPLIT] = FQA[np.ix_(rowmap_drum, colmap_fq[:SPLIT])]
fq[:, SPLIT:] = FQA[np.ix_(rowmap_full, colmap_fq[SPLIT:])]
out.paste(Image.fromarray(fq), (fx, y_fq))
SW_X0 = fx + SPLIT                                   # 909：撥桿槽左緣
drum_y0 = y_fq + (176 - FQ_Y0)                       # 302
drum_y1 = drum_y0 + len(drum_rows)                   # 484
roll_y0 = drum_y0 + 41; roll_y1 = roll_y0 + DRUM_ROLL_H
mark('drum.window', fq_map(179, 0)[0], drum_y0, SW_X0, drum_y1)
mark('drum.rollers', fq_map(217, 0)[0], roll_y0, fq_map(1074, 0)[0], roll_y1)
for n, (a, b) in enumerate(((217, 372), (388, 537), (553, 867), (884, 1074)), 1):   # 第三支＝原稿 553..630 接 825..867
    mark(f'drum.r{n}', fq_map(a, 0)[0], roll_y0, fq_map(b, 0)[0], roll_y1)

hgroove(out, y_g1); hgroove(out, y_g2)
vgroove(out, fq_x_end, y_fq, y_g2)
px0, py0 = fq_map(828, 14)
out.paste(FQ0.crop((828, 14, 1310, 110)), (px0, py0))

# ── 類別：滾筒窗下那條長條，橫向滾筒 ───────────────────────────────
A_X0, A_X1 = fq_map(179, 0)[0], SW_X0               # 177..909，跟滾筒窗同寬、左右對齊
A_Y0, A_Y1 = drum_y1 + 6, y_g2 - 4                   # 490..662
oa = np.array(out)
oa[A_Y0:A_Y1, A_X0:A_X1] = frame9(A_X1 - A_X0, A_Y1 - A_Y0)
ix0, iy0, ix1, iy1 = interior(A_X0, A_Y0, A_X1, A_Y1)
RA = (ix0 + 6, iy0 + 5, ix1 - 6, iy1 - 5)
oa[RA[1]:RA[3], RA[0]:RA[2]] = roller_horizontal(RA[2] - RA[0], RA[3] - RA[1])
out = Image.fromarray(oa)
mark('genre.window', A_X0, A_Y0, A_X1, A_Y1); mark('genre.roller', *RA)
mark('genre.label', INNER_X0 + 4, A_Y0, A_X0 - 4, A_Y1)

# ── 右欄：就這張／隨機 兩顆半高黃銅鍵（btn-v.png 抽掉中段 158 列）────────────────
bk = np.array(BTN)
KEY_H = 200
half_key = Image.fromarray(np.concatenate([bk[:KEY_H // 2], bk[-KEY_H // 2:]], axis=0))
BTN_W = BTN.width
bx0 = fq_x_end + GROOVE + ((INNER_X1 - fq_x_end - GROOVE) - BTN_W) // 2   # 1149
gap = 40
ky_a = y_fq + (FQ_H - (2 * KEY_H + gap)) // 2       # 194
ky_b = ky_a + KEY_H + gap                           # 434
d = ImageDraw.Draw(out)
for ky in (ky_a, ky_b):
    d.rectangle((bx0 - 8, ky - 8, bx0 + BTN_W + 7, ky + KEY_H + 7), fill=(67, 70, 75))
    d.rectangle((bx0 - 8, ky - 8, bx0 + BTN_W + 1, ky + KEY_H + 1), fill=(0, 2, 7))
    d.rectangle((bx0 - 3, ky - 3, bx0 + BTN_W + 2, ky + KEY_H + 2), fill=(21, 20, 26))
mark('key.draw', bx0, ky_a, bx0 + BTN_W, ky_a + KEY_H)
mark('key.random', bx0, ky_b, bx0 + BTN_W, ky_b + KEY_H)

# ── 搜尋列（同 build-tune-panel.py）────────────────────────────────
gx = lambda a: round(INNER_X0 + a * P)
def box_g(dr, oy, a0, b0, a1, b1, c):
    gy = lambda b: round(oy + b * P)
    dr.rectangle((gx(a0), gy(b0), gx(a1) - 1, gy(b1) - 1), fill=c)
GW = (INNER_X1 - INNER_X0) / P
def box(a0, b0, a1, b1, c): box_g(d, y_search, a0, b0, a1, b1, c)
PA0, PA1, PB0, PB1 = 3, 46, 3, 16
box(PA0, PB0, PA1, PB1, PLATE_OUT); box(PA0 + 1, PB0 + 1, PA1 - 1, PB1 - 1, PLATE)
box(PA0 + 1, PB0 + 1, PA1 - 1, PB0 + 2, PLATE_HI); box(PA0 + 1, PB1 - 2, PA1 - 1, PB1 - 1, PLATE_LO); box(PA1 - 2, PB0 + 1, PA1 - 1, PB1 - 1, PLATE_LO)
for a, b in ((PA1 - 6, PB1 - 3), (PA1 - 5, PB1 - 4), (PA0 + 3, PB1 - 3), (PA0 + 4, PB1 - 3)):
    box(a, b, a + 1, b + 1, PLATE_HI)
def brass_key(dr, oy, a0, b0, a1, b1):
    def bx(*r): box_g(dr, oy, *r)
    bx(a0, b0, a1, b1, OUT); bx(a0 + 1, b0 + 1, a1 - 1, b1 - 1, BRASS)
    bx(a0 + 1, b0 + 1, a1 - 1, b0 + 2, BRASS_HI); bx(a0 + 1, b0 + 1, a0 + 2, b1 - 1, BRASS_HI)
    bx(a0 + 1, b1 - 2, a1 - 1, b1 - 1, BRASS_LO); bx(a1 - 2, b0 + 1, a1 - 1, b1 - 1, BRASS_LO)
def lcd(dr, oy, a0, b0, a1, b1):
    def bx(*r): box_g(dr, oy, *r)
    bx(a0, b0, a1, b1, WIN_HI); bx(a0, b0, a1 - 1, b1 - 1, WIN_OUT)
    bx(a0 + 1, b0 + 1, a1 - 1, b1 - 1, WIN_IN); bx(a0 + 1, b0 + 1, a1 - 1, b0 + 2, WIN_SH)
KA1 = int(GW) - 3; KA0 = KA1 - 20; KB0, KB1 = 2, 17
brass_key(d, y_search, KA0, KB0, KA1, KB1)
cx, cy = (KA0 + KA1) // 2 - 2, (KB0 + KB1) // 2 - 2
for a, b in ((0, -3), (1, -3), (-1, -3), (2, -2), (-2, -2), (3, -1), (3, 0), (3, 1), (-3, -1), (-3, 0), (-3, 1), (2, 2), (-2, 2), (0, 3), (1, 3), (-1, 3), (3, 3), (4, 4), (5, 5), (4, 5), (5, 4)):
    box(cx + a, cy + b, cx + a + 1, cy + b + 1, INK)
LA0, LA1, LB0, LB1 = PA1 + 3, KA0 - 3, 3, 16
lcd(d, y_search, LA0, LB0, LA1, LB1)

# ── 輪子區：上半＝篩選排（等級｜分級｜符合），下半＝砍半的三顆輪子 ─────────────────
B_Y0 = y_wh                     # 678
B_H = 256
B_Y1 = B_Y0 + B_H               # 934
y_g3 = B_Y1                     # 934..946 新增的橫溝
y_wm = y_g3 + GROOVE            # 946：輪子模組（原稿 45..735 砍掉 268 列）
CUTN = WH_H - B_H - GROOVE      # 422
REMOVE = WH_H - CUTN            # 268
# 分帶砍列：每一條直帶各自從「沒東西的地方」抽掉 268 列，讓標籤、外殼、刻度尺都保持完整
LABEL_CUT = [(250, 518)]                                   # 躁／靜 兩字之間的素面
HOUSING_CUT = [(279, 547)]                                 # 外殼直邊中段（輪子本身會重畫）
LADDER_CUT = [(140, 160), (234, 350), (440, 551), (645, 666)]  # 刻度尺：上下各抽一段，中間亮刻度留著
MODS = [  # (模組左, 外殼左, 刻度帶左, 模組右, 輪子元素左, 外殼內左, 外殼內右, 軸)
    (112, 230, 412, 508, 224, 255, 382, 'x'),
    (521, 640, 822, 920, 644, 664, 789, 'y'),
    (933, 1052, 1236, 1326, 1060, 1075, 1203, 'z'),
]
bands = [(0, 112, LABEL_CUT), (508, 521, LABEL_CUT), (920, 933, LABEL_CUT), (1326, W, LABEL_CUT)]
for m0, h0, l0, m1, *_ in MODS:
    bands += [(m0, h0, LABEL_CUT), (h0, l0, HOUSING_CUT), (l0, m1, LADDER_CUT)]
wm = np.zeros((CUTN, W, 3), np.uint8)
for x0, x1, cuts in bands:
    keep = [y for y in range(WH_Y0, WH_Y1) if not any(a <= y < b for a, b in cuts)]
    assert len(keep) == CUTN, (x0, x1, len(keep))
    wm[:, x0:x1] = WHA[keep][:, x0:x1]
# 新座標：wm 第 r 列 ↔ 原稿第 r+45 列（砍點以上），以下各帶都上移 268
def wm_y(src_y): return src_y - WH_Y0                        # 砍點以上的原稿列 → wm 列
HOUSING_TOP = 141; HOUSING_BOT = 683 - REMOVE                 # 原稿外殼 141..683 → 141..415（原稿列號系）
CENTER = (HOUSING_TOP + HOUSING_BOT) // 2                     # 278：刻度尺中央亮刻度也剛好落在這
WHEEL_H = 190                                                 # 原稿輪子 441 列 → 190 列（整格取樣）
CURVE = 0.5                                                   # 輪廓弧度收斂比例
HALF_SPANS = {}
for m0, h0, l0, m1, ex0, in0, in1, ax in MODS:
    # 外殼內清空（實作時輪子是 canvas 畫在上面，底圖不留舊輪子）
    for sy in range(175, 641 - REMOVE):
        wm[wm_y(sy), in0:in1] = wm[wm_y(sy), in1 - 4]
    # ◀ 指針：原稿 384..434 列那塊整塊搬到新中心（刻度尺上移 136 列，指針跟著上移 136）
    # 只搬比底色亮的像素（指針本體＋光暈），光暈邊緣才不會切出一塊方框
    ax0, ax1 = in1 - 12, in1 + 22
    patch = WHA[372:446, ax0:ax1].astype(int); base = wm[wm_y(372 - 136):wm_y(446 - 136), ax0:ax1].astype(int)
    m = (patch.sum(-1) > base.sum(-1) + 9)[..., None]
    wm[wm_y(372 - 136):wm_y(446 - 136), ax0:ax1] = np.where(m, patch, base).astype(np.uint8)
    # 半高輪子：輪廓（wheel-spans）整格取樣成 190 列，貼圖照 dip-tune.js 的圓柱投影畫
    sp = SPANS[ax]; rows = [list(r) if r else None for r in sp['rows']]
    # 原稿輪廓在 ◀ 指針那幾列右緣多抓了 10px（指針光暈），先壓回去
    ref = rows[190][1]
    for i in range(195, 263):
        if rows[i]: rows[i][1] = min(rows[i][1], ref)
    # 高度砍半，弧度也收一半，不然半高輪子會彎成弓形
    lmin, rmin = rows[220]                       # 以輪子正中那列為準往兩端收
    src_idx = cellmap(WHEEL_H, sp['y1'] - sp['y0'])
    half_rows = [None if not rows[i] else [round(lmin + (rows[i][0] - lmin) * CURVE), round(rmin + (rows[i][1] - rmin) * CURVE)] for i in src_idx]
    LAYOUT[f'wheel.{ax}.rows'] = half_rows
    wy0 = CENTER - WHEEL_H // 2                      # 原稿列號系
    tile = TILES[ax]; th, tw = tile.shape[:2]
    cyw = WHEEL_H / 2; Rw = WHEEL_H / 2
    v = {'x': 25, 'y': 50, 'z': 50}[ax]
    off = v * 4.2
    for j in range(WHEEL_H):
        k = (cyw - j) / Rw
        if abs(k) >= 1: continue
        r = half_rows[j]
        if not r: continue
        u = Rw * math.asin(k); t = int(((u + off) % th + th) % th)
        span = r[1] - r[0]
        xs = np.minimum(tw - 1, ((np.arange(span) + 0.5) * tw / span).astype(int))
        line = tile[t, xs]
        c = math.sqrt(1 - k * k); dark = min(.85, (1 - c) ** 1.2 * .95)
        line = line * (1 - dark)
        if c > .92:
            a = (c - .92) * 1.2; line = line * (1 - a) + np.array([255, 240, 200]) * a
        wm[wm_y(wy0 + j), ex0 + r[0]:ex0 + r[1]] = line.clip(0, 255).astype(np.uint8)
    half_spans = {'w': sp['w'], 'h': 268, 'ref': 536, 'y0': wy0 - 151, 'y1': wy0 - 151 + WHEEL_H, 'rows': half_rows}
    mark(f'wheel.{ax}', ex0, y_wm + wm_y(151), ex0 + sp['w'], y_wm + wm_y(151) + 268)
    LAYOUT.pop(f'wheel.{ax}.rows'); HALF_SPANS[ax] = half_spans
out.paste(Image.fromarray(wm), (0, y_wm))
hgroove(out, y_g3)

# 篩選排的欄間直溝：照原稿模組分欄的那條槽（上下端頭也從原稿取）
oa = np.array(out)
for dx0 in (508, 920):
    cap_t = WHA[62:72, dx0:dx0 + 13]; body = WHA[300:301, dx0:dx0 + 13]; cap_b = WHA[678:690, dx0:dx0 + 13]
    yy0, yy1 = B_Y0 + 8, B_Y1 - 8
    oa[yy0:yy0 + 10, dx0:dx0 + 13] = cap_t
    oa[yy0 + 10:yy1 - 12, dx0:dx0 + 13] = np.repeat(body, yy1 - 12 - yy0 - 10, axis=0)
    oa[yy1 - 12:yy1, dx0:dx0 + 13] = cap_b

# 等級、分級：直向滾筒窗（同一套細框）＋右側 ▲ ◀ ▼
COLS = [(INNER_X0, 508), (521, 920), (933, INNER_X1)]
TITLE_Y = B_Y0 + 12
WIN_Y0, WIN_Y1 = B_Y0 + 66, B_Y1 - 8                 # 744..926
reels = {}
for i, name in ((0, 'rating'), (1, 'tier')):
    c0, c1 = COLS[i]
    wx0, wx1 = c0 + 14, c1 - 40
    oa[WIN_Y0:WIN_Y1, wx0:wx1] = frame9(wx1 - wx0, WIN_Y1 - WIN_Y0)
    ix0, iy0, ix1, iy1 = interior(wx0, WIN_Y0, wx1, WIN_Y1)
    rr = (ix0 + 6, iy0 + 5, ix1 - 6, iy1 - 5)
    oa[rr[1]:rr[3], rr[0]:rr[2]] = roller_vertical(rr[2] - rr[0], rr[3] - rr[1])
    reels[name] = rr
    mark(f'{name}.window', wx0, WIN_Y0, wx1, WIN_Y1); mark(f'{name}.roller', *rr)
    mark(f'{name}.title', c0 + 14, TITLE_Y, c1 - 14, TITLE_Y + 48)
    mark(f'{name}.arrows', wx1, WIN_Y0, c1 - 6, WIN_Y1)
out = Image.fromarray(oa)
d = ImageDraw.Draw(out)

def cells(dr, ox, oy, pts, color):
    for a, b in pts:
        dr.rectangle((round(ox + a * P), round(oy + b * P), round(ox + (a + 1) * P) - 1, round(oy + (b + 1) * P) - 1), fill=color)
UP = [(1, 0), (0, 1), (1, 1), (2, 1)]
DOWN = [(0, 0), (1, 0), (2, 0), (1, 1)]
LEFT = [(1, 0), (0, 1), (1, 1), (1, 2)]
for name in ('rating', 'tier'):
    x0, y0, x1, y1 = LAYOUT[f'{name}.arrows']
    ax_ = x0 + (x1 - x0) / 2 - 1.5 * P
    cells(d, ax_, y0 + 24, UP, ARROW)
    cells(d, ax_ + P * 0.5, (y0 + y1) / 2 - 1.5 * P, LEFT, AMBER)
    cells(d, ax_, y1 - 24 - 2 * P, DOWN, ARROW)

# 符合：液晶窗（同搜尋列畫法）＋「篩選中」指示燈（原稿 SCAN 燈）＋ 歸零黃銅鍵（同搜尋鍵畫法）
c0, c1 = COLS[2]
ga0 = math.ceil((c0 + 14 - INNER_X0) / P); ga1 = int((c1 - 14 - INNER_X0) / P)
lcd(d, B_Y0, ga0, 12, ga1, 27)
brass_key(d, B_Y0, ga0, 29, ga1, 45)
mark('match.lcd', gx(ga0), round(B_Y0 + 12 * P), gx(ga1), round(B_Y0 + 27 * P))
mark('match.reset', gx(ga0), round(B_Y0 + 29 * P), gx(ga1), round(B_Y0 + 45 * P))
mark('match.title', c0 + 14, TITLE_Y, c1 - 60, TITLE_Y + 48)
led = FQ0.crop((1190, 234, 1232, 266))
mark('match.led', c1 - 14 - led.width, TITLE_Y + 8, c1 - 14, TITLE_Y + 8 + led.height)
out.paste(led, (c1 - 14 - led.width, TITLE_Y + 8))

# ── 側軌、底端螺絲（最後鋪，同 build-tune-panel.py）────────────────────────
rail_row_l, rail_row_r = WH.crop((0, 400, L_RAIL, 401)), WH.crop((R_RAIL, 400, W, 401))
for y in range(160, H - BOTTOM):
    out.paste(rail_row_l, (0, y)); out.paste(rail_row_r, (R_RAIL, y))
out.paste(WH.crop((0, 0, L_RAIL, 160)), (0, 0)); out.paste(WH.crop((R_RAIL, 0, W, 160)), (R_RAIL, 0))
for x0, x1 in ((0, L_RAIL), (R_RAIL, W)):
    out.paste(WH.crop((x0, 0, x1, BOTTOM)).transpose(Image.FLIP_TOP_BOTTOM), (x0, H - BOTTOM))
for cxs in (54, W - 54):
    out.paste(SCREW, (cxs - 35, H - 62 - 35), SCREW)

# 類別窗上下框正中的 ▼▲ 對位記號（底圖的一部分）
gw = LAYOUT['genre.window']; gr_ = LAYOUT['genre.roller']
cells(d, (gr_[0] + gr_[2]) / 2 - 1.5 * P, gw[1] + 2, DOWN, AMBER)
cells(d, (gr_[0] + gr_[2]) / 2 - 1.5 * P, gw[3] - 2 - 2 * P, UP, AMBER)

panel_only = out.copy()      # 不含任何 HTML 示意文字的底圖（＝實作時的 tune/panel-all.png）

# ══ 以下是「HTML 活件」的示意（實作時是 DotGothic16 文字／按鍵，不在底圖裡）═══════════════
mark('search.plate', gx(PA0), round(y_search + PB0 * P), gx(PA1), round(y_search + PB1 * P))
mark('search.input', gx(LA0 + 1), round(y_search + (LB0 + 1) * P), gx(LA1 - 1), round(y_search + (LB1 - 1) * P))
mark('search.go', gx(KA0), round(y_search + KB0 * P), gx(KA1), round(y_search + KB1 * P))
x0, y0, x1, y1 = LAYOUT['search.plate']; put_text(out, '搜尋 / SEARCH', (x0 + x1) // 2, (y0 + y1) // 2, 2, INK)
x0, y0, x1, y1 = LAYOUT['search.input']; put_text(out, '藝人或專輯', x0 + 24, (y0 + y1) // 2, 3, (109, 100, 64), anchor='l')

# 滾筒：每支只露目前那一格
drum_centers = [fq_map(294, 0)[0], fq_map(462, 0)[0], (fq_map(553, 0)[0] + fq_map(867, 0)[0]) // 2, fq_map(979, 0)[0]]
ry = (roll_y0 + roll_y1) // 2
for cxd, s, col in zip(drum_centers, ['靜', '重', '暖', '恍惚'], [AX['x'], AX['y'], AX['z'], LANGUID]):
    put_text(out, s, cxd, ry, 4, col, gap=8)

# SCAN／RADIO 撥桿與字（現版活件，位置不變）
lx0, ly0 = fq_map(1182, 299)
out.paste(SWITCH.crop((0, 0, 59, 137)), (lx0, ly0), SWITCH.crop((0, 0, 59, 137)))
sx0 = fq_map(1107, 0)[0]
put_text(out, 'SCAN', sx0 + 108, fq_map(0, 164)[1] + 12, 2, AMBER)
put_text(out, 'RADIO', sx0 + 108, y_g2 - 16, 2, DIM)
mark('switch', *fq_map(1160, 230), *fq_map(1269, 505))

# 類別（橫）：目前那格置中、亮琥珀；兩側鄰格變暗，最外兩格被窗框切掉一半
GENRES = ['全部', '搖滾', '爵士', '電子', '流行', '靈魂', '民謠', '嘻哈', '世界', '古典', '藍調']
cur = 2; PITCH_A = 168
x0, y0, x1, y1 = LAYOUT['genre.roller']
layer = Image.new('RGBA', (x1 - x0, y1 - y0), (0, 0, 0, 0))
mid = (x1 - x0) // 2
for off_i, col in ((-2, DIM2), (-1, DIM), (0, AMBER if cur else CREAM), (1, DIM), (2, DIM2)):
    s = GENRES[(cur + off_i) % len(GENRES)]
    put_text(layer, s, mid + off_i * PITCH_A, (y1 - y0) // 2, 4, col)
out.paste(layer, (x0, y0), layer)
gl = LAYOUT['genre.label']; put_text(out, '類別', (gl[0] + gl[2]) // 2, (gl[1] + gl[3]) // 2, 3, TAN, vertical=True, gap=6)

# 等級、分級（直）
RATING = ['全部', '經典4★+', '經典5★', '冷門4★+', '冷門5★', '硬蕊4★+', '硬蕊5★', '總分10+', '總分12+']
TIER = ['全部', '殿堂', '流亡', '異端', '傳奇', '史詩', '獨特', '稀有', '普通']
PITCH_B = 78
for name, items, cur_i, title in (('rating', RATING, 1, '等級 / RATING'), ('tier', TIER, 0, '分級 / TIER')):
    x0, y0, x1, y1 = reels[name]
    layer = Image.new('RGBA', (x1 - x0, y1 - y0), (0, 0, 0, 0))
    for off_i, col in ((-1, DIM), (0, AMBER if cur_i else CREAM), (1, DIM)):
        put_text(layer, items[(cur_i + off_i) % len(items)], (x1 - x0) // 2, (y1 - y0) // 2 + off_i * PITCH_B, 4, col)
    out.paste(layer, (x0, y0), layer)
    t = LAYOUT[f'{name}.title']; put_text(out, title, t[0] + 12, (t[1] + t[3]) // 2, 3, TAN, anchor='l')
t = LAYOUT['match.title']; put_text(out, '符合 / MATCH', t[0] + 12, (t[1] + t[3]) // 2, 3, TAN, anchor='l')
x0, y0, x1, y1 = LAYOUT['match.lcd']
put_text(out, '186', (x0 + x1) // 2 - 30, (y0 + y1) // 2 + 2, 4, AMBER)
put_text(out, '張', (x0 + x1) // 2 + 80, (y0 + y1) // 2 + 6, 3, (109, 100, 64))
x0, y0, x1, y1 = LAYOUT['match.reset']; put_text(out, '歸零 / RESET', (x0 + x1) // 2, (y0 + y1) // 2 - 2, 3, INK)

# 兩顆鍵（底圖是 HTML 按鍵的背景圖 half-key.png；字是 HTML）
for ky, label, extra in ((ky_a, '就這張', None), (ky_b, '隨機', 'dice')):
    out.paste(half_key, (bx0, ky))
    if extra == 'dice':
        # 骰子：照原稿墨色在像素格上畫 7×7 格（五點面）
        ox = bx0 + BTN_W / 2 - 3.5 * P; oy = ky + 22
        ring = [(a, b) for a in range(7) for b in range(7) if a in (0, 6) or b in (0, 6)]
        ring = [p for p in ring if p not in ((0, 0), (6, 0), (0, 6), (6, 6))]
        cells(d, ox, oy, ring + [(2, 2), (4, 2), (3, 3), (2, 4), (4, 4)], INK)
        put_text(out, label, bx0 + BTN_W // 2, ky + 22 + 7 * P + 12 + 52, 3, INK, vertical=True, gap=6)
    else:
        put_text(out, label, bx0 + BTN_W // 2, ky + KEY_H // 2, 3, INK, vertical=True, gap=6)

dice_key = half_key.copy(); dd = ImageDraw.Draw(dice_key)
ring = [(a, b) for a in range(7) for b in range(7) if (a in (0, 6) or b in (0, 6)) and (a, b) not in ((0, 0), (6, 0), (0, 6), (6, 6))]
cells(dd, BTN_W / 2 - 3.5 * P, 22, ring + [(2, 2), (4, 2), (3, 3), (2, 4), (4, 4)], INK)
dice_key.save(os.path.join(HERE, 'btn-half-dice.png'))
out.save(os.path.join(HERE, 'mockup.png'), optimize=True)
panel_only.save(os.path.join(HERE, 'panel-only.png'), optimize=True)
half_key.save(os.path.join(HERE, 'btn-half.png'))
pv = out.resize((720, round(H * 720 / W)), Image.LANCZOS)
pv.save(os.path.join(HERE, 'preview.png'), optimize=True)

# 活件熱區示意（給評審看哪裡能點／能拖）
hs = out.convert('RGBA'); ov = Image.new('RGBA', hs.size, (0, 0, 0, 0)); od = ImageDraw.Draw(ov)
HOT = {'genre.window': (255, 80, 200), 'rating.window': (80, 200, 255), 'tier.window': (80, 255, 140),
       'match.reset': (255, 160, 40), 'key.draw': (255, 255, 80), 'key.random': (255, 120, 60),
       'wheel.x': (200, 200, 200), 'wheel.y': (200, 200, 200), 'wheel.z': (200, 200, 200), 'switch': (160, 160, 255),
       'search.input': (160, 160, 255), 'search.go': (160, 160, 255)}
for k, c in HOT.items():
    x0, y0, x1, y1 = LAYOUT[k]
    od.rectangle((x0, y0, x1 - 1, y1 - 1), fill=c + (46,), outline=c + (255,), width=4)
hs = Image.alpha_composite(hs, ov).convert('RGB')
hs.resize((720, round(H * 720 / W)), Image.LANCZOS).save(os.path.join(HERE, 'hotspots.png'), optimize=True)

with open(os.path.join(HERE, 'wheel-spans-half.json'), 'w') as f:
    json.dump(HALF_SPANS, f, separators=(',', ':'))
with open(os.path.join(HERE, 'layout.json'), 'w') as f:
    json.dump({'size': [W, H], 'P': P, 'rects': LAYOUT}, f, ensure_ascii=False, indent=1)
print('mockup.png', W, H)
pc = lambda v, t: round(v / t * 100, 3)
for k, v in LAYOUT.items():
    if isinstance(v, list):
        x0, y0, x1, y1 = v
        print(f'{k:16s} ({x0},{y0},{x1},{y1})  left:{pc(x0, W)}%;top:{pc(y0, H)}%;width:{pc(x1 - x0, W)}%;height:{pc(y1 - y0, H)}%')
    else:
        print(f'{k:16s} {v}')
