"""頻率選歌面板的活件貼圖（2026-10-23）——都從店主的像素稿 tune/panel-freq.jpg 取材，不另畫一套。

  tune/switch.png       SCAN／FINE 開關的撥桿三格（上｜中｜下）。原稿畫的是撥桿在下；
                        往上那格是整個槽垂直翻面，中間那格是把撥桿塊移到半途。
  tune/panel-search.png 搜尋列模組：照原稿的配色與邊框結構，以原稿的像素格（約 5.5px）畫，
                        螺絲直接從原稿剪下來貼。文字、輸入框、按鍵是疊在上面的 HTML。

用法：python3 scripts/build-tune-sprites.py
"""
from PIL import Image, ImageDraw

SRC = 'tune/panel-freq.jpg'
src = Image.open(SRC).convert('RGB')

# ── 開關撥桿 ────────────────────────────────────────────────
# 槽內（不含黑框）在原稿的像素座標；上半是空槽，356 起是撥桿塊
SX0, SY0, SX1, SY1 = 1182, 299, 1241, 436
KNOB_Y = 356
slot = src.crop((SX0, SY0, SX1, SY1))
w, h = slot.size
down = slot
up = slot.transpose(Image.FLIP_TOP_BOTTOM)
knob = slot.crop((0, KNOB_Y - SY0, w, h))
empty = slot.crop((0, 0, w, KNOB_Y - SY0))
mid = Image.new('RGB', (w, h))
off = (KNOB_Y - SY0) // 2
mid.paste(empty.crop((0, 0, w, off)), (0, 0))
mid.paste(empty.transpose(Image.FLIP_TOP_BOTTOM).crop((0, 0, w, h - off - knob.size[1])), (0, off + knob.size[1]))
mid.paste(knob, (0, off))
sheet = Image.new('RGB', (w * 3, h))
for i, im in enumerate((up, mid, down)):
    sheet.paste(im, (i * w, 0))
sheet.save('tune/switch.png')
print('switch.png', sheet.size, '槽位（佔原稿 %）', round(SX0 / src.width * 100, 3), round(SY0 / src.height * 100, 3), round(w / src.width * 100, 3), round(h / src.height * 100, 3))

# ── 搜尋列模組 ──────────────────────────────────────────────
P = 6                       # 一個像素格放大成幾個實際像素
W, H = 240, 24              # 以像素格計
OUT = (10, 10, 18); RAIL = (53, 58, 64); RAIL_HI = (79, 84, 90); SEP = (1, 0, 6); SEP_HI = (58, 62, 67)
BODY = (33, 38, 41); BODY_HI = (60, 64, 72); BODY_LO = (20, 22, 26)
WIN_OUT = (0, 2, 7); WIN_HI = (67, 70, 75); WIN_IN = (8, 8, 10); WIN_SH = (21, 20, 26)
PLATE = (189, 160, 116); PLATE_HI = (214, 186, 140); PLATE_LO = (150, 121, 84); PLATE_OUT = (26, 11, 0)
BRASS = (175, 137, 62); BRASS_HI = (224, 200, 136); BRASS_LO = (101, 72, 35); INK = (42, 30, 7)

img = Image.new('RGB', (W, H), BODY)
d = ImageDraw.Draw(img)
def box(x0, y0, x1, y1, c): d.rectangle((x0, y0, x1 - 1, y1 - 1), fill=c)

RW = 15                     # 側軌寬
box(0, 0, W, H, OUT)
box(1, 1, W - 1, H - 1, BODY)
for x0 in (1, W - 1 - RW):  # 左右側軌
    box(x0, 1, x0 + RW, H - 1, RAIL)
    box(x0, 1, x0 + 1, H - 1, RAIL_HI)
    box(x0, 1, x0 + RW, 2, RAIL_HI)
box(1 + RW, 1, 2 + RW, H - 1, SEP); box(2 + RW, 1, 3 + RW, H - 1, SEP_HI)
box(W - 2 - RW, 1, W - 1 - RW, H - 1, SEP); box(W - 3 - RW, 1, W - 2 - RW, H - 1, SEP_HI)
box(3 + RW, 1, W - 3 - RW, 2, BODY_HI)           # 面板上緣受光
box(3 + RW, H - 2, W - 3 - RW, H - 1, BODY_LO)   # 下緣陰影

# 名牌（左）
PX0, PX1, PY0, PY1 = RW + 6, RW + 62, 5, H - 5
box(PX0, PY0, PX1, PY1, PLATE_OUT)
box(PX0 + 1, PY0 + 1, PX1 - 1, PY1 - 1, PLATE)
box(PX0 + 1, PY0 + 1, PX1 - 1, PY0 + 2, PLATE_HI)
box(PX0 + 1, PY1 - 2, PX1 - 1, PY1 - 1, PLATE_LO)
box(PX1 - 2, PY0 + 1, PX1 - 1, PY1 - 1, PLATE_LO)
for x, y in ((PX1 - 6, PY1 - 3), (PX1 - 5, PY1 - 4), (PX1 - 4, PY1 - 5), (PX0 + 3, PY1 - 3), (PX0 + 4, PY1 - 3)):   # 磨損
    box(x, y, x + 1, y + 1, PLATE_HI)

# 液晶窗（中）——與滾筒窗同一套凹槽：外黑框、右下受光、內緣上方陰影
BX1 = W - RW - 6; BX0 = BX1 - 22                 # 按鍵
WX0, WX1, WY0, WY1 = PX1 + 4, BX0 - 3, 4, H - 4
box(WX0, WY0, WX1, WY1, WIN_HI)
box(WX0, WY0, WX1 - 1, WY1 - 1, WIN_OUT)
box(WX0 + 1, WY0 + 1, WX1 - 1, WY1 - 1, WIN_IN)
box(WX0 + 1, WY0 + 1, WX1 - 1, WY0 + 2, WIN_SH)

# 黃銅按鍵（右）＋放大鏡
BY0, BY1 = 4, H - 4
box(BX0, BY0, BX1, BY1, OUT)
box(BX0 + 1, BY0 + 1, BX1 - 1, BY1 - 1, BRASS)
box(BX0 + 1, BY0 + 1, BX1 - 1, BY0 + 2, BRASS_HI); box(BX0 + 1, BY0 + 1, BX0 + 2, BY1 - 1, BRASS_HI)
box(BX0 + 1, BY1 - 2, BX1 - 1, BY1 - 1, BRASS_LO); box(BX1 - 2, BY0 + 1, BX1 - 1, BY1 - 1, BRASS_LO)
cx, cy = (BX0 + BX1) // 2 - 2, (BY0 + BY1) // 2 - 2
for x, y in ((0, -3), (1, -3), (-1, -3), (2, -2), (-2, -2), (3, -1), (3, 0), (3, 1), (-3, -1), (-3, 0), (-3, 1), (2, 2), (-2, 2), (0, 3), (1, 3), (-1, 3), (3, 3), (4, 4), (5, 5), (4, 5), (5, 4)):
    box(cx + x, cy + y, cx + x + 1, cy + y + 1, INK)

big = img.resize((W * P, H * P), Image.NEAREST)
# 螺絲：從原稿左上剪下來，貼在兩側軌正中
screw = src.crop((22, 28, 84, 90))
sw, sh = screw.size
for rx in (1, W - 1 - RW):
    big.paste(screw, (int((rx + RW / 2) * P - sw / 2), int(H * P / 2 - sh / 2)))
big.save('tune/panel-search.png')

pct = lambda a, b: round(a / b * 100, 3)
print('panel-search.png', big.size)
print('名牌', pct(PX0, W), pct(PY0, H), pct(PX1 - PX0, W), pct(PY1 - PY0, H))
print('液晶', pct(WX0 + 1, W), pct(WY0 + 1, H), pct(WX1 - WX0 - 2, W), pct(WY1 - WY0 - 2, H))
print('按鍵', pct(BX0, W), pct(BY0, H), pct(BX1 - BX0, W), pct(BY1 - BY0, H))

# ── 螺絲（FREQUENCY 模組用）────────────────────────────────────
# FREQUENCY 模組顯示時只有 76% 寬、又被壓矮，原稿上的螺絲看起來比別的小、而且扁。
# 從輪子模組（全寬顯示）左上剪一顆正常大小的螺絲，圓外透明，疊在 FREQUENCY 的兩顆螺絲上。
wheels = Image.open('tune/panel-wheels.jpg').convert('RGB')
CX, CY, R = 54, 62, 31
sc = wheels.crop((CX - 35, CY - 35, CX + 35, CY + 35)).convert('RGBA')
spx = sc.load()
for y in range(70):
    for x in range(70):
        if (x + .5 - 35) ** 2 + (y + .5 - 35) ** 2 > R * R:
            spx[x, y] = (0, 0, 0, 0)
sc.save('tune/screw.png')
fw, fh = 1438, 567                     # FREQUENCY 原稿尺寸；顯示時寬 = 0.76 台寬、高 = 寬 × 499/1438
disp_w = 70 / 1438                     # 螺絲該有的顯示寬（台寬比例，與輪子模組同比例）
wp = disp_w / 0.76 * 100
hp = disp_w / (0.76 * 499 / 1438) * 100
for name, (sx, sy) in {'左上': (52, 58), '右上': (1386, 56)}.items():
    print('螺絲', name, 'left', round(sx / fw * 100 - wp / 2, 3), 'top', round(sy / fh * 100 - hp / 2, 3), 'w', round(wp, 3), 'h', round(hp, 3))
