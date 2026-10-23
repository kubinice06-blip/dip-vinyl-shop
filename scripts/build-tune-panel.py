"""頻率選歌的主機面板：把搜尋列、FREQUENCY、就這張、三顆輪子併成一整塊像素面板（2026-10-23 店主：
「下面的面板整合起來變成一個像素面板」，拿掉最下面那排抽屜，讓星圖往下長）。

全部取材自店主的像素稿，同一個比例（原稿 1438px 寬＝整台寬，像素格約 5.5px），不縮放、不重畫：
  外框、左右側軌、內面板底 ← tune/panel-wheels.jpg（側軌上下各一顆螺絲；底邊是頂邊翻面）
  FREQUENCY 區             ← tune/panel-freq.jpg 的內容（滾筒窗中段被 HTML 滾筒蓋住，抽掉 195px 讓出就這張的位置）
  分隔槽                   ← 輪子模組欄與欄之間那條溝，轉成橫的
  搜尋列                   ← 照原稿配色在像素格上畫：名牌、液晶窗、黃銅鍵
輸出 tune/panel-all.png，並印出各活件（滾筒、開關、輪子、輸入框⋯⋯）佔整張的百分比，貼進 dip-tune.js 的 CSS。

用法：python3 scripts/build-tune-panel.py
"""
from PIL import Image, ImageDraw

WH = Image.open('tune/panel-wheels.jpg').convert('RGB')
FQ = Image.open('tune/panel-freq.jpg').convert('RGB')
SCREW = Image.open('tune/screw.png')      # scripts/build-tune-sprites.py 產生
W = WH.width                               # 1438
P = W / 260                                # 原稿一個像素格 ≈ 5.53px

# ── 版面（整張的 y 座標）──────────────────────────────────────
TOP = 45                                   # 外框＋內面板上緣（輪子稿 0..45）
SEARCH_H = 105
GROOVE = 12
FQ_X0, FQ_X1, FQ_Y0, FQ_Y1 = 114, 1325, 36, 540   # FREQUENCY 內容（不含它自己的外框）
CUT0, CUT1 = 630, 825                      # 從滾筒窗中段抽掉的一段（上方 FREQUENCY 字與名牌之間是空的）
WH_Y0, WH_Y1 = 45, 735                     # 輪子區（不含最下面的抽屜）
BOTTOM = 45

y_search = TOP
y_g1 = y_search + SEARCH_H
y_fq = y_g1 + GROOVE
FQ_H = FQ_Y1 - FQ_Y0
y_g2 = y_fq + FQ_H
y_wh = y_g2 + GROOVE
y_bot = y_wh + (WH_Y1 - WH_Y0)
H = y_bot + BOTTOM

L_RAIL, R_RAIL = 106, 1332                 # 內面板 x 範圍（含兩側淺色斜邊）
INNER_X0, INNER_X1 = 112, 1326             # 內面板本體

out = Image.new('RGB', (W, H))

# 內面板：上緣、空白底（取輪子稿第 52 列整列往下鋪）、輪子區、底緣（上緣翻面）
out.paste(WH.crop((0, 0, W, TOP)), (0, 0))
row = WH.crop((0, 52, W, 53))
for y in range(TOP, y_wh):
    out.paste(row, (0, y))
out.paste(WH.crop((0, WH_Y0, W, WH_Y1)), (0, y_wh))
out.paste(WH.crop((0, 0, W, BOTTOM)).transpose(Image.FLIP_TOP_BOTTOM), (0, y_bot))

# 側軌：上段（螺絲＋鏽）照原稿，其餘鋪素面側軌；底端補一顆螺絲
rail_row_l, rail_row_r = WH.crop((0, 400, L_RAIL, 401)), WH.crop((R_RAIL, 400, W, 401))
for y in range(160, H - BOTTOM):
    out.paste(rail_row_l, (0, y)); out.paste(rail_row_r, (R_RAIL, y))
out.paste(WH.crop((0, 0, L_RAIL, 160)), (0, 0)); out.paste(WH.crop((R_RAIL, 0, W, 160)), (R_RAIL, 0))
for x0, x1 in ((0, L_RAIL), (R_RAIL, W)):
    out.paste(WH.crop((x0, 0, x1, BOTTOM)).transpose(Image.FLIP_TOP_BOTTOM), (x0, H - BOTTOM))
for cx in (54, W - 54):
    out.paste(SCREW, (cx - 35, H - 62 - 35), SCREW)

# 分隔槽：輪子欄間那條溝（x 506..522 的色帶）轉成橫的
groove_cols = [WH.getpixel((x, 300)) for x in range(506, 506 + GROOVE)]
def hgroove(y, x0=INNER_X0, x1=INNER_X1):
    d = ImageDraw.Draw(out)
    for i, c in enumerate(groove_cols):
        d.line((x0, y + i, x1 - 1, y + i), fill=c)
def vgroove(x, y0, y1):
    d = ImageDraw.Draw(out)
    for i, c in enumerate(groove_cols):
        d.line((x + i, y0, x + i, y1 - 1), fill=c)

# FREQUENCY：抽掉中段後兩半接起來
left = FQ.crop((FQ_X0, FQ_Y0, CUT0, FQ_Y1)); right = FQ.crop((CUT1, FQ_Y0, FQ_X1, FQ_Y1))
fx = INNER_X0
out.paste(left, (fx, y_fq)); out.paste(right, (fx + left.width, y_fq))
fq_x_end = fx + left.width + right.width
def fq_map(x, y):                          # FREQUENCY 原稿座標 → 整張座標
    nx = x - FQ_X0 + fx if x < CUT0 else x - CUT1 + fx + left.width
    return nx, y - FQ_Y0 + y_fq

hgroove(y_g1); hgroove(y_g2)
vgroove(fq_x_end, y_fq, y_g2)              # FREQUENCY 與就這張之間的直溝

# 名牌「調頻 / DATA TUNING」像吊牌一樣掛在分隔槽上
px0, py0 = fq_map(828, 14)
out.paste(FQ.crop((828, 14, 1310, 110)), (px0, py0))

# 就這張：右欄凹槽（按鍵本身是 HTML，按得下去）
BTN_W, BTN_H = 168, 358
bx0 = fq_x_end + GROOVE + ((INNER_X1 - fq_x_end - GROOVE) - BTN_W) // 2
by0 = y_fq + (FQ_H - BTN_H) // 2
d = ImageDraw.Draw(out)
d.rectangle((bx0 - 8, by0 - 8, bx0 + BTN_W + 7, by0 + BTN_H + 7), fill=(67, 70, 75))
d.rectangle((bx0 - 8, by0 - 8, bx0 + BTN_W + 1, by0 + BTN_H + 1), fill=(0, 2, 7))
d.rectangle((bx0 - 3, by0 - 3, bx0 + BTN_W + 2, by0 + BTN_H + 2), fill=(21, 20, 26))

# ── 搜尋列：在像素格上畫（配色取自原稿）────────────────────────
OUT = (10, 10, 18)
WIN_OUT = (0, 2, 7); WIN_HI = (67, 70, 75); WIN_IN = (8, 8, 10); WIN_SH = (21, 20, 26)
PLATE = (189, 160, 116); PLATE_HI = (214, 186, 140); PLATE_LO = (150, 121, 84); PLATE_OUT = (26, 11, 0)
BRASS = (175, 137, 62); BRASS_HI = (224, 200, 136); BRASS_LO = (101, 72, 35); INK = (42, 30, 7)
gx = lambda a: round(INNER_X0 + a * P)    # 以像素格計，從內面板左緣起算
gy = lambda a: round(y_search + a * P)
def box(a0, b0, a1, b1, c): d.rectangle((gx(a0), gy(b0), gx(a1) - 1, gy(b1) - 1), fill=c)
GW = (INNER_X1 - INNER_X0) / P            # 內面板寬（像素格）
# 名牌
PA0, PA1, PB0, PB1 = 3, 46, 3, 16
box(PA0, PB0, PA1, PB1, PLATE_OUT); box(PA0 + 1, PB0 + 1, PA1 - 1, PB1 - 1, PLATE)
box(PA0 + 1, PB0 + 1, PA1 - 1, PB0 + 2, PLATE_HI); box(PA0 + 1, PB1 - 2, PA1 - 1, PB1 - 1, PLATE_LO); box(PA1 - 2, PB0 + 1, PA1 - 1, PB1 - 1, PLATE_LO)
for a, b in ((PA1 - 6, PB1 - 3), (PA1 - 5, PB1 - 4), (PA0 + 3, PB1 - 3), (PA0 + 4, PB1 - 3)):
    box(a, b, a + 1, b + 1, PLATE_HI)
# 黃銅鍵
KA1 = int(GW) - 3; KA0 = KA1 - 20; KB0, KB1 = 2, 17
box(KA0, KB0, KA1, KB1, OUT); box(KA0 + 1, KB0 + 1, KA1 - 1, KB1 - 1, BRASS)
box(KA0 + 1, KB0 + 1, KA1 - 1, KB0 + 2, BRASS_HI); box(KA0 + 1, KB0 + 1, KA0 + 2, KB1 - 1, BRASS_HI)
box(KA0 + 1, KB1 - 2, KA1 - 1, KB1 - 1, BRASS_LO); box(KA1 - 2, KB0 + 1, KA1 - 1, KB1 - 1, BRASS_LO)
cx, cy = (KA0 + KA1) // 2 - 2, (KB0 + KB1) // 2 - 2
for a, b in ((0, -3), (1, -3), (-1, -3), (2, -2), (-2, -2), (3, -1), (3, 0), (3, 1), (-3, -1), (-3, 0), (-3, 1), (2, 2), (-2, 2), (0, 3), (1, 3), (-1, 3), (3, 3), (4, 4), (5, 5), (4, 5), (5, 4)):
    box(cx + a, cy + b, cx + a + 1, cy + b + 1, INK)
# 液晶窗
LA0, LA1, LB0, LB1 = PA1 + 3, KA0 - 3, 3, 16
box(LA0, LB0, LA1, LB1, WIN_HI); box(LA0, LB0, LA1 - 1, LB1 - 1, WIN_OUT)
box(LA0 + 1, LB0 + 1, LA1 - 1, LB1 - 1, WIN_IN); box(LA0 + 1, LB0 + 1, LA1 - 1, LB0 + 2, WIN_SH)

out.save('tune/panel-all.png', optimize=True)

# ── 活件位置（佔整張 %）──────────────────────────────────────
pc = lambda v, t: round(v / t * 100, 3)
def rect(name, x0, y0, x1, y1):
    print(f'{name:10s} left:{pc(x0, W)}%;top:{pc(y0, H)}%;width:{pc(x1 - x0, W)}%;height:{pc(y1 - y0, H)}%')
print('panel-all.png', W, H, '寬高比', f'{W}/{H}', round(H / W, 4))
rect('plate', gx(PA0), gy(PB0), gx(PA1), gy(PB1))
rect('input', gx(LA0 + 1), gy(LB0 + 1), gx(LA1 - 1), gy(LB1 - 1))
rect('go', gx(KA0), gy(KB0), gx(KA1), gy(KB1))
a = fq_map(205, 205); b = fq_map(1085, 515); rect('drumwin', a[0], a[1], b[0], b[1])
a = fq_map(1107, 164); b = fq_map(1323, 164); rect('swlab.top', a[0], a[1], b[0], a[1] + 20)
a = fq_map(1107, 515); rect('swlab.bot', a[0], a[1], a[0] + 216, a[1] + 20)
a = fq_map(1160, 230); b = fq_map(1269, 505); rect('sw', a[0], a[1], b[0], b[1])
a = fq_map(1198, 241); rect('led.top', a[0], a[1], a[0] + 26, a[1] + 16)
a = fq_map(1198, 477); rect('led.bot', a[0], a[1], a[0] + 26, a[1] + 16)
a = fq_map(1182, 299); b = fq_map(1241, 436); rect('lever', a[0], a[1], b[0], b[1])
rect('draw', bx0, by0, bx0 + BTN_W, by0 + BTN_H)
for ax, x0, x1 in (('x', 224, 406), ('y', 644, 820), ('z', 1060, 1236)):
    rect('wheel.' + ax, x0, 151 - WH_Y0 + y_wh, x1, 151 + 536 - WH_Y0 + y_wh)
