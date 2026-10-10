# 首頁「店內挖寶」唱片箱像素圖（index.html HUB_PIX.shopcrate）生成器：python3 gen-shopcrate.py 印出 32 列，貼回 index.html。
# 顏色代碼對應 index.html hubPixSvg 的 pal（o/b/n/m 是木色）。
import json, math
W = H = 32
X0, Y0 = 3, 22
LU, LV, HZ = 7, 6, 8
def P(u, v, z): return (X0 + 2*u + 2*v, Y0 + u - v - z)
grid = [['.']*W for _ in range(H)]
def fill(poly, c):
    for y in range(H):
        for x in range(W):
            px, py = x + 0.5, y + 0.5
            inside = False
            for i in range(len(poly)):
                (x1, y1), (x2, y2) = poly[i], poly[i-1]
                if (y1 > py) != (y2 > py):
                    if px < x1 + (py - y1) * (x2 - x1) / (y2 - y1): inside = not inside
            if inside: grid[y][x] = c
def line(a, b, c, only=None):
    (x1, y1), (x2, y2) = P(*a), P(*b)
    n = int(max(abs(x2-x1), abs(y2-y1)) * 4) + 1
    for i in range(n + 1):
        t = i / n
        xi, yi = int(math.floor(x1 + (x2-x1)*t + 0.001)), int(math.floor(y1 + (y2-y1)*t + 0.001))
        if 0 <= xi < W and 0 <= yi < H and (only is None or grid[yi][xi] in only): grid[yi][xi] = c
def F(*pts): return [P(*p) for p in pts]

# 調色：o 木頭（亮面）、b 木頭高光、n 木頭暗面、m 深木（輪廓／縫）
# 唱片：封套正面實心，頂邊與書背用灰 d 分隔；一張金 g、一張紅 r 當點綴
u0, u1 = 0.6, LU - 0.6
recs = [(5.0, 11.5, 'k'), (4.0, 12.5, 'r'), (3.0, 11.5, 'k'), (2.0, 13.0, 'g'), (1.0, 11.0, 'k')]
T = 0.5
for v, top, c in recs:
    fill(F((u0, v+T, top), (u1, v+T, top), (u1, v, top), (u0, v, top)), 'd')   # 頂邊
    fill(F((u1, v, 0), (u1, v+T, 0), (u1, v+T, top), (u1, v, top)), 'd')       # 書背
    fill(F((u0, v, 0), (u1, v, 0), (u1, v, top), (u0, v, top)), c)            # 封套正面
    line((u0, v, top), (u1, v, top), 'k' if c != 'k' else 'k', only='dgr')     # 彩色封套頂緣收一條黑線，比較精緻

# 箱子
fill(F((0,0,0), (LU,0,0), (LU,0,HZ), (0,0,HZ)), 'o')           # 長牆（亮面）
fill(F((LU,0,0), (LU,LV,0), (LU,LV,HZ), (LU,0,HZ)), 'n')       # 短牆（暗面）
# 木板接縫：長牆兩道、短牆一道
line((0, 0, HZ/2), (LU, 0, HZ/2), 'n')
line((LU, 0, HZ/2), (LU, LV, HZ/2), 'm')
# 提把孔（短牆上緣）
fill(F((LU, 1.8, HZ-2.6), (LU, 4.2, HZ-2.6), (LU, 4.2, HZ-1.4), (LU, 1.8, HZ-1.4)), 'm')
# 箱口上緣高光
line((0, 0, HZ), (LU, 0, HZ), 'b')
line((LU, 0, HZ), (LU, LV, HZ), 'o')
# 外輪廓（深木）
for a, b in [((0,0,0),(LU,0,0)), ((LU,0,0),(LU,LV,0)), ((0,0,0),(0,0,HZ)),
             ((LU,LV,0),(LU,LV,HZ)), ((LU,0,0),(LU,0,HZ))]:
    line(a, b, 'm')
# 箱口後緣（唱片沒擋住的部分）
line((0,0,HZ),(0,LV,HZ),'m', only='.'); line((0,LV,HZ),(LU,LV,HZ),'m', only='.')
line((0,0,HZ),(0,0,HZ),'m')
rows = [''.join(r) for r in grid]
json.dump(rows, open('shopcrate-rows.json', 'w'))
print('\n'.join(rows))
