"""頻率選歌面板的活件貼圖（2026-10-23）——都從店主的像素稿 tune/panel-freq.jpg 取材，不另畫一套。

  tune/switch.png       SCAN／FINE 開關的撥桿三格（上｜中｜下）。原稿畫的是撥桿在下；
                        往上那格是整個槽垂直翻面，中間那格是把撥桿塊移到半途。
  tune/screw.png        一顆正常大小的螺絲（圓外透明），scripts/build-tune-panel.py 拼面板時補在側軌底端。

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

# ── 螺絲 ──────────────────────────────────────────────────────
# 從輪子模組左上剪一顆，圓外透明。
wheels = Image.open('tune/panel-wheels.jpg').convert('RGB')
CX, CY, R = 54, 62, 31
sc = wheels.crop((CX - 35, CY - 35, CX + 35, CY + 35)).convert('RGBA')
spx = sc.load()
for y in range(70):
    for x in range(70):
        if (x + .5 - 35) ** 2 + (y + .5 - 35) ** 2 > R * R:
            spx[x, y] = (0, 0, 0, 0)
sc.save('tune/screw.png')
