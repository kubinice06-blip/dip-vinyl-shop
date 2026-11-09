# notes-F1 — 第二波開工前的修正：走位不准跨過中島（FIXLIST 第 1 項）

分支 `claude/card-game-fun-lab`（直接在 /home/user/dip-vinyl-shop 工作）。主線待修清單 FIXLIST 第 1 項；店主：「不要跨過中島唱片區」。

## 問題
A2 路線圖 counter→mid（4）、pay→leaving（6）、sale→pay（13）在美術格 y≈112–128 橫越中島最上排（R&B／OST）。
原因：避障與 check-shops 用的「腳下範圍 foot」＝道具的地面那塊 `[x, y−d, w, d]`；斜俯視裡人的腳＝畫面上那一格，
腳落在箱子「畫出來的範圍」裡（地面那塊的後面、箱身與唱片那一段 y104–128）就是被箱子蓋住腳＝看起來走在箱子裡。
（A2 的 mid [96,112]、leaving [150,110] 本身也站在最上排畫出來的範圍裡。）

## 做法（決定，可逆）
- **腳下範圍＝量道具實際畫出來的範圍**（`shop.js` `drawnExtent`／`propFoot`：用 OPainter 畫進遮罩，只算不透明、不算地上半透明影子）：
  左右＝畫出來的最左到最右；上緣＝最上面一列連續 ≥3 格不透明的那列（1–2 格寬的細柱：箱子兩側的鉻管、燈桿、耳機線不算——
  鉻管頂到 y95，算進去後走道就只剩 1 格寬）；下緣＝地板前緣 o.y 與畫出來的最下緣取大的；再跟 foot 取聯集。
- **中島 10 箱（isl-0a…crate-tw）合成一塊多邊形**：`dip.json` `footprints.groups.island`；`rectsPoly` 把成員矩形合成階梯形多邊形（欄間 2 格的縫補起來）。
  量出來：x 97–185、上緣 R&B 欄 y106／OST 欄 y104、下緣 y262。
- **櫃檯、唱盤台留「口袋」`footprints.behind`**（{道具: [xa, xb]}）：老闆站在它們後面（spots.counter [244,176]、ref [146,304]，被擋住腳是規格要的）。
  口袋＝地面那塊後面、x 在 xa–xb 的那一條；口袋以外照畫出來的整塊擋。櫃檯 [212,284]＝整個寬（老闆在櫃檯後面走動；後面是高櫃，口袋是死巷）；
  唱盤台 [134,158]＝轉盤那一段（盤面 rx11、中心 146），兩側照擋——第一版整個唱盤台都只算地面那塊時，有 70 多條左右兩邊的路線（door→duelP、dig3→duelP…）
  從唱盤台後面斜穿（人走在唱盤台上），這版全部改走唱盤台後面的走道（島前緣 y262 與唱盤台上緣 y289 之間）。
  check-shops：兩端都不在口袋裡的路線不准經過口袋；口袋裡一定要有 spot、不能是空的、不能在群組裡。
- **避障（navObstacles）＝同一份腳下範圍加 navMargin**（[5,2]），`footprints.margin.island` [8,2]：中島兩側走道多留 3 格
  （人的手臂比腳寬；5 格時左側走道的人右手被 ROCK 箱邊切掉一塊，截圖看得出來）。
- navClear／inObs／segHitsObs 收多邊形 `{id, poly, box}`（也還收舊矩形 [x,y,w,h]）；`segHitsPoly`：線段碰邊的參數排序、相鄰中點嚴格在內才算穿過（沿邊、擦角不算，跟 segHitsRect 一樣）。
- **check-shops、shop.test、stage-harness 路線圖都用 `DipShop.footprints`**（不加邊、端點不豁免），1406 條全配對路線逐段查。
- **站位移到後走道**（後牆矮櫃前緣 y90／窗下矮櫃 y89 與中島上緣 y104 之間）：mid [96,112]→**[96,100]**、leaving [150,110]→**[170,95]**。
  leaving 往右移 20：放 x150 時 leaving→duelP（要先沿後走道走到右側走道再下來）261 格＝3.63 s，超過 3.5 s；x170 是 241 格＝3.34 s。
  y95／100 錯開：老闆 O20 從右側走道上來沿 y100 走到 mid 時，從你（leaving）前面經過，不是穿過你。
- **visit [168,292]→[180,292]、near [120,292]→[112,292]**：原本站在唱盤台畫出來的範圍裡（v4 把唱盤台放到 y316 之後）；visit 移到唱盤台右邊（E5／E8 老闆走到這裡看著你 duelP）。
  map [150,300]、ref／between 在唱盤台的口袋裡，不動。
- nav：刪 [146,110]（在 OST 箱上）；[52,158]→[62,156]（試聽桌畫出來到 x53，耳機掛在桌邊）；[192,124]→[196,124]、[90,124]→[86,124]（中島加邊 8）；
  新增 [90,100]（後走道左端）、[194,100]（後走道右端）、[62,127]（試聽桌右上）、[62,180]、[203,212]（櫃檯左前角）、[41,98]（特價箱右上，門口那條）、
  [139,286]、[153,286]（唱盤台口袋的兩個入口）、[177,285]（唱盤台右後角）、[87,104]（中島左上角）。

## 跟規格不一樣的地方（給主線／C）
- §2.3.1 的 `leaving [150,110]`、`mid [96,112]` → [170,95]、[96,100]；`visit`、`near` 也移了（理由見上；shop.test 的斷言跟著改，註明 FIXLIST 1）。
- §2.3.5「特價箱的腳下範圍不擋 door→atdoor→nav[30,100]→nav[72,110]」：特價箱畫出來的後排唱片頂到 y102，[30,100] 剛好在它上緣，
  從那裡往右下走會擦過箱子。shop.test 改驗進店的路 door→atdoor→[72,110] 沒擋、[30,100] 不在家具裡且 door／atdoor 走得到。
- 美術小瑕疵（沒改，不是這次的事）：後牆矮櫃（8 欄）的彩色分隔標籤 `cx + c*3` 第 8 欄畫到 x158–163（櫃子外，y50 牆上）；量出來的範圍照實包進去，對走位沒影響。

## 進度
- [x] shop.js：量畫出來的範圍、footprints、多邊形避障（f3cf30110）
- [x] dip.json：footprints、nav、mid／leaving（f3cf30110、1897ae708）；唱盤台口袋、visit／near（8352552b2）
- [x] check-shops、shop.test（f3cf30110、1897ae708、8352552b2）；hit.test 不用改（照樣過）
- [x] stage-harness 路線圖畫完整腳下範圍（1897ae708）
- [x] 路線圖、走到一半的截圖、後走道對峙截圖（看過，見下）
- [x] 測試全跑
- [x] `git branch -f v4/base-B HEAD`（指到這筆 notes 提交）

## 路線時間（1 倍速 72 格/秒；改前→改後）
| 路線 | 改前 | 改後 | 上限 |
|---|---|---|---|
| counter→dig1／dig2／dig2→counter | 2.76／2.00／2.00 | 2.76／2.00／2.00 | 3.2 |
| counter→mid | 2.37（斜切中島） | 2.68（右側走道→後走道） | 3.5 |
| mid→ref | 3.13（斜切中島） | 3.43（左側走道→從左上進唱盤台口袋） | 3.5 |
| pay→leaving | 2.43（斜切中島） | 2.21（右側走道→後走道） | 3.5 |
| atdoor→duelE | 3.08 | 3.14 | 3.5 |
| leaving→duelP | 3.29（斜切中島） | 3.34（後走道→右側走道） | 3.5 |
| ref→visit／visit→dig1 | 0.35／0.82 | 0.71／1.02（visit 移到唱盤台右邊；走唱盤台後面的走道） | 3.5 |
| duelE→door | 3.31 | 3.41 | 3.5 |
| browse→sale | 3.67（斜切中島） | 4.07 | 4.5 |
| sale→pay | 3.88（斜切中島） | 4.07（後走道） | 4.5 |
| 箱子 stand＋browse 兩兩最慢 | ost↔noise 3.75 | browse↔sale 4.07 | 4.5 |

## 測試結果（最後一次）
- `node game-lab/test/shop.test.mjs`：**1058 passed, 0 failed**（新段「FIXLIST 1」：自己的假畫布重量每件道具，畫出來的每一格都在腳下範圍裡（口袋除外）；
  口袋位置、唱盤台兩側擋；mid／leaving 在後走道；往後走道的路線經過右側／左側走道與後走道、不碰中島外框；A2 的舊站位、舊路點 [146,110]、
  舊路線那段 [90,124]→[192,124] 都抓得到（對照：舊 foot 抓不到那段）；拿掉櫃檯口袋、唱盤台整個寬當口袋、口袋／群組／margin 寫壞都抓得到）
- `node game-lab/tools/check-shops.mjs`：**OK（3 份 layout）**（1406 條全配對路線：不穿腳下範圍、不經過別人的口袋）
- `node game-lab/test/hit.test.mjs`：**330 passed, 0 failed**（含嚴格模式序章路線照走）
- `LAB_SIZES=390x664,375x548,430x932,360x640 node game-lab/tests/e2e-taps.mjs`：**28/28 PASS**
- `node game-lab/test/engine.test.mjs`：**1404457 passed, 0 failed**
- stage-harness（嚴格模式）「走進唱盤區」從 mid／leaving／counter 出發：四個尺寸都走到、主控台 0 錯誤

## 截圖（deviceScaleFactor 2；不提交；腳本在 scratchpad `F1/`：routes-shot.cjs、walk-shots.cjs、standoff.cjs）
- 路線圖：`game-lab/dev/shots/F1/390x664-routes.png`（紅框＝腳下範圍、淡紅點線＝避障框、藍點線＝後走道、白點線＝右側走道；13／13 沒穿過、沒超時）；
  改前對照 `390x664-routes-before.png`
- 走到一半（真的 walk，30%／55%／80%／95%）：`390x664-walk-counter-mid-*.png`、`-pay-leaving-*`、`-sale-pay-*`、`-mid-ref-*`、`-ref-visit-*`、`-dig3-duelP-*`——
  人都在右側走道、後走道（腳在中島上緣之上）、左側走道或唱盤台後面的走道，沒有站在箱子或唱盤台上
- 後走道對峙（他 atdoor、你 leaving、老闆 mid）：`390x664-standoff.png`、`375x548-standoff.png`

## 請求
- **B2**：O17–O21 的後走道站位改了（leaving [170,95]、mid [96,100]，比原本高 12–15 格）；375×548 截圖驗「後走道的人頭沒被裁掉」時以新的 y 為準。
  O20 老闆從右側走道上來、沿後走道走到 mid，會從你前面經過（你在 y95、他走 y100）。
- **C**：新的 API：`DipShop.footprints(L, PR?, margin?)`、`propFoot`、`drawnExtent`、`segHitsPoly`、`inPoly`、`inObs`、`segHitsObs`、`rectsPoly`、`rectPoly`；
  `pocketRect`；`navObstacles` 回 `{id, poly, box}`（舊矩形 [x,y,w,h] navClear 照收）。
- **B2**：E5／E8 的 visit 移到 [180,292]（唱盤台右邊，看著 duelP 的你）；`near` [112,292]（v4 劇本沒用到）。
