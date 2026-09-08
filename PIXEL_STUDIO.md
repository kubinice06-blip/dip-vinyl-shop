# 像素工坊（pixel-studio.html）— 線上像素繪圖器＋場景合成＋劇本，與 Claude Code 共用的資料格式

> 2026-09-08 起。目的：店主自己在後台畫像素物件、把物件排成場景、寫成一段段對白，
> 然後跟 Claude Code 合作把場景與故事接進遊戲。**人畫的跟 Claude 改的是同一份 JSON**，
> 不用互相翻譯。

## 0. 一句話

`dip-character.js` 早就把小人存成「一列一個字串、一個字元一個像素」的文字格式（`sprRows`）。
像素工坊把這個格式擴成完整的物件／場景／劇本三層，加一個 GUI 讓人畫，
存成 `art/pixel/**/*.json`。Claude 讀 JSON 就看得懂整個場景，改 rows 字串就等於在畫圖；
店主開編輯器就看得到 Claude 改了什麼。

## 1. 怎麼開

- **後台**：`admin.html` → 🎮 遊戲設定 → **🎨 像素工坊**（內嵌整頁；右上「另開新視窗」比較好畫）。
- **直接開**：`https://<站台>/pixel-studio.html`。分頁：`?mode=obj|scene|story|io`。
- **本機**：repo 根目錄 `python -m http.server 8080` 再開 `http://localhost:8080/pixel-studio.html`
  （用 `file://` 開會讀不到 `art/` 底下的圖）。

畫的東西先存在**這個瀏覽器的 localStorage**（`dipPixelStudio_v1`），每次改動 0.4 秒後自動存。
換瀏覽器、清資料就沒了——所以做完一段就走第 4 節的交接流程進 repo。
預覽站（`<分支>.dip-vinyl-shop.pages.dev`）不受 `dip-character.js` 的「新分頁重置」影響，
像素工坊沒有載入那支檔案。

## 2. 三個分頁

### 🖌 物件
- 像素畫布 1–256 px，工具：筆（B）、擦（E）、填色（G）、線（L）、框（R）、實心框（F）、
  圓（O）、吸色（I）、整格位移（M）、腳點（⌖）。`[` `]` 筆寬、`X` 左右對稱、`+` `-` 縮放、`Ctrl+Z` 復原。
- **色盤是每個物件自己的**，預設就是 `dip-character.js` 的 `PIX_PAL` 17 色（k g r b w e d n p o y s c t u v m），
  所以畫小人可以直接沿用既有的配色字元。「＋」加色會自動配一個沒用過的字元；右鍵換色。
- **格（frames）**：同一物件多格＝動畫或狀態（門的關／半開／全開、走路兩格）。洋蔥皮看上一格。
- **腳點（anchor）**：物件座標裡「要對到地面站位」的那一點。小人是鞋底 (8,15)，家具預設底邊中央。
  場景的深度排序跟劇本的站位都靠它。
- **參考圖**：載入一張圖墊在畫布下描（不會存進資料）。**PNG → 像素**：把一張圖依色盤量化進畫布，
  差太多的顏色會自動加進色盤（門檻可調）。
- 匯出：PNG（×1–16）、SVG、整份 JSON、只有 rows。

圖檔物件（`kind:image`，例如 `art/props/table.png`、`art/shop2-fg-back.png`）不能在瀏覽器裡逐像素改，
但可以當物件放進場景、多格切換。要改它們還是走 `scripts/trace-shop-art.py` 那條線。

### 🏞 場景
- 邏輯尺寸（預設 448×492 ＝ 唱片行舞台）＋ 背景圖 ＋ 一堆物件實例（items）＋ 站位（anchors）。
- **深度規則**（跟 `stage-preview.html` 的 `zOf` 同一個意思）：`layer:auto` 的物件照**腳底 y** 排，
  y 大的在前面；`depth` 填數字就不看幾何、直接用它當腳底 y（整張前景圖用這個：後層 401.5、前層 457.5）；
  `back` 永遠最後、`front` 永遠最前。選取時畫面上會畫出腳底線，一眼看得出誰擋誰。
- 拖曳移動、方向鍵微調（Shift ×8）、Delete、Ctrl+D 複製。「腳點對到站位」把物件精準放到某個站位。
- **站位**＝(cx, footY)。分 p（玩家）／o（老闆）／f（對手）三組，跟 roguelike 的 `RPG_POS` 同構。
  「複製 POS」直接輸出 `stage-preview.html` 那種格式。
- 物件的 **role** 設成 p／o／f，它就是劇本的演員。
- 讀數列會顯示 stage-preview 式的 `left% / bottom% / width%`，要手搬回舊頁面也不用算。

### 🎬 劇本
- 指定一個場景；每一句＝`{who, text, stage}`，**跟 `roguelike.html` 的 `RPG_BEATS` 同一套語彙**：
  `stage` 只寫這一句有變化的，其餘沿用上一句。表單直接編的有：p／o／f 站位、`oPath` 多段路線
  （逗號分隔站位名，每段 0.78 秒，跟 `rpgWalk` 一樣）、門 open／swing／shut、♪、💢、老闆翻片（`oDig`）；
  其他（`pPath`／`fPath`／`oBusy`／`hide`／`set`）走「其他 stage JSON」欄。`f` 設成 `out` ＝ 對手不在場。
- 點任一句就播到那一句（演員補間走位）；▶▶ 自動播放整段。門要能動：場景裡顯示名叫「門」的物件要有三格。
- `ui`／`prompt` 這類遊戲面板掛點欄位編輯器不顯示（只標一個 🎛）但會原樣保留。
- 「複製 beats」＝可以直接貼回 `RPG_BEATS` 的 JSON；反過來把 `RPG_BEATS` 貼進交接分頁也能直接播。

## 3. 資料格式（`art/pixel/`）

```
art/pixel/index.json            ← 目錄；scripts/pixel-index.mjs 重建
art/pixel/objects/<id>.json
art/pixel/scenes/<id>.json
art/pixel/stories/<id>.json
```

### 物件
```jsonc
{ "id":"owner", "name":"老闆", "kind":"pixel", "w":16, "h":16,
  "palette": { "k":"#111", "d":"#888", "s":"#e8b48c", "n":"#2e7d52", "w":"#fff", "e":"#d8d8d8" },
  "frames": [ [ "................", ".....dddddd.....", "....dddddddd....", "…共 h 列，每列 w 個字元…" ] ],
  "anchor": { "x":8, "y":15 },          // 腳點（物件座標）
  "tags": ["小人"], "notes": "給人跟 Claude 看的說明", "updatedAt": 1757300000000 }
```
- `'.'`（或空白）＝透明，其他字元查 `palette`。字元只能一個字，不能是 `.` 或空白。
- `kind:"image"` 時 `frames` 是圖檔路徑陣列，`w`／`h` 是圖檔像素。

### 場景
```jsonc
{ "id":"shop2", "name":"巷子裡的唱片行", "w":448, "h":492, "bg":{ "src":"art/shop2-bg.jpg" },
  "items":[ { "iid":"owner", "obj":"owner", "name":"老闆", "x":135, "y":251.9, "scale":4.875,
              "flip":false, "layer":"auto", "depth":null, "role":"o", "frame":0, "hidden":false, "lock":false } ],
  "anchors":[ { "name":"counter", "group":"o", "x":174, "y":325 } ],
  "notes":"座標契約、動線、哪裡不能站", "updatedAt": 0 }
```
- `x`,`y` 是物件左上角（邏輯座標）；腳點位置 ＝ `(x + anchor.x×scale, y + anchor.y×scale)`。
- `name` 是劇本 `set` 找物件用的顯示名，同場景內不要重複。

### 劇本
```jsonc
{ "id":"prologue", "name":"序章", "scene":"shop2",
  "beats":[ { "who":"", "text":"下著雨。……", "stage":{ "p":"door", "o":"counter", "f":"out", "door":"swing" } },
            { "who":"", "text":"老闆走出櫃檯……", "stage":{ "oPath":["aisle","dig1","dig2","dig3"], "oDig":true } },
            { "who":"老闆", "text":"「……」", "ui":"aces" } ] }
```
`stage` 的鍵：`p`／`o`／`f`（站位名；`f:"out"`＝不在場）、`pPath`／`oPath`／`fPath`（站位名陣列，依序走）、
`door`（open／swing／shut）、`oDig`、`oBusy`、`notes`、`anger`；工坊延伸：`hide:{role:bool}`、`set:{物件名:{frame,hidden}}`。

## 4. 跟 Claude Code 的協作流程

資料要在 repo 裡 Claude 才碰得到。三條路，都在編輯器的 **🔁 交接** 分頁：

| 路 | 店主做 | Claude 做 | 適合 |
|---|---|---|---|
| **① 本站載入** | 部署後按「從本站載入」 | 改完 JSON、跑 `node scripts/pixel-index.mjs`、commit push | Claude 改了東西要拿回編輯器看 |
| **② 剪貼簿／檔案** | 「複製給 Claude 的交接」貼進對話；或匯出 JSON 丟進 `art/pixel/` | 把貼上的 JSON 寫進 `art/pixel/`、重建 index | 隨時、零設定、最穩 |
| **③ 推到 GitHub** | 填 fine-grained token（只勾這個 repo、Contents 讀寫），按「推到 GitHub」 | `git pull` 就看到 | 一天改很多次、不想下載檔案 |

**典型對話**（貼上交接後接著寫的那一行）：
- 「幫我把 `shop2` 的長桌往右 20 px，桌上兩個木箱一起移，老闆的 dig1–3 站位跟著調。」
- 「畫一個 24×24 的唱盤，色盤用既有的 k/d/e/g，腳點放底邊中央，放到櫃檯左邊、腳底 y=300。」
- 「序章第 10 句後面加兩句老闆翻箱子的旁白，站位輪流 dig1→dig3→dig2。」
- 「把劇本 `prologue` 接進 `roguelike.html` 的序章，取代寫死的 `RPG_POS`／`RPG_BEATS`。」

**Claude 這一頭的規矩**：
1. 改 `art/pixel/**/*.json` 後一定跑 `node scripts/pixel-index.mjs`（驗證形狀＋重建 index）。驗不過不要 commit。
2. 像素物件的圖直接改 `frames` 的字串；要新色先加 `palette`。寬高改了 `w`／`h` 一起改。
3. 不要重排店主畫好的像素（那是美術）；要動的是位置、站位、對白、格數、深度。
4. `updatedAt` 改成當下的毫秒時間戳，編輯器合併時「較新者勝」靠它。
5. 圖檔物件指到的圖不存在 → `pixel-index.mjs` 會擋。

## 5. 接進遊戲（現況與下一步）

- `dip-pixel.js` 是前台與編輯器共用的繪製庫：`toSVG(obj)`（跟 `pixArtHTML` 同形）、`drawScene(ctx, scene, db)`、
  `stageAt(story, i)`（累積 stage 的規則跟 `rpgApplyStage` 一樣）、`placeAt`／`findAnchor`。
- 2026-09-08 起 `roguelike.html` 的序章舞台已經是描圖版（`shop2-bg.jpg` ＋ 門板 ＋ 兩層前景），
  站位 `RPG_POS`、對白 `RPG_BEATS`、`rpgZ`／`rpgWalk`／`rpgDoor` 都在程式裡寫死。
  `art/pixel/scenes/shop2.json` 的站位與 `stories/prologue.json` 的對白跟它們**一字不差**——
  所以現在的協作方式是：工坊裡改好 → 「複製 POS」／「複製 beats」→ Claude 貼進 `roguelike.html`（或後台序章劇本存 Firestore）。
- **還沒做、下一步**：讓 `roguelike.html` 直接 `fetch('art/pixel/scenes/shop2.json')`＋`stories/prologue.json`，
  `RPG_POS` 從場景的 anchors 生、`RPG_BEATS` 從劇本的 beats 生、門與小人的物件從 objects 生（`toSVG`），
  `rpgZ` 改用 `itemZ`。這樣店主在工坊搬一張桌子、加一句對白，推上去就生效，不用再經過 Claude 貼一次。
- 之後 `DUNGEON_DESIGN.md` 的聆聽室、各間唱片行地牢、敵人造型，全都是「一個場景 JSON ＋ 幾個物件 JSON」，
  店主畫、Claude 排。

## 6. 已知限制

- 編輯器沒有圖層（單一物件一張圖）；要疊就拆成多個物件放進場景。
- 沒有選取區複製貼上；有整格位移、翻轉、旋轉、裁切。
- `PNG → 像素` 是最近色量化，不是抽色演算法；照片會爆色盤，適合本來就是像素圖的來源。
- 資料只在本機 localStorage，沒有走 Firestore；跨裝置靠 repo。
- GitHub token 存在瀏覽器 localStorage，用 fine-grained、只給這個 repo 的 Contents 權限，到期就換。
