# 像素繪圖器與像素工坊 — 與 Claude Code 共用的資料格式

> 2026-09-08 起，2026-09-10 拆成兩頁。目的：店主自己在後台一格一格畫像素、把物件排成場景、
> 寫成一段段對白，然後跟 Claude Code 合作把場景與故事接進遊戲。
> **人畫的跟 Claude 改的是同一份 JSON**，不用互相翻譯。
>
> | 頁 | 做什麼 |
> |---|---|
> | **`pixel-editor.html` 繪圖器** | Aseprite 式的像素繪圖軟體：一格一格畫、圖層、動畫格、選取剪貼、色盤 |
> | **`pixel-studio.html` 工坊** | 把畫好的物件排成場景、寫成一句句對白、跟 Claude 交接 |
>
> 兩頁共用同一份素材庫（IndexedDB `dipPixelStudio`），存檔走「讀→只換自己那筆→寫回」，
> 兩個分頁同時開也不會互相蓋掉。

## 0. 一句話

`dip-character.js` 早就把小人存成「一列一個字串、一個字元一個像素」的文字格式（`sprRows`）。
把這個格式擴成完整的物件／場景／劇本三層，加兩個 GUI：繪圖器負責畫、工坊負責排，
資料一律存成 `art/pixel/**/*.json`。Claude 讀 JSON 就看得懂整個場景，改 rows 字串就等於在畫圖；
店主開繪圖器就看得到 Claude 改了什麼。

## 1. 怎麼開

- **後台**：`admin.html` → 🎮 遊戲設定 → 🎨 像素工坊 → 上方兩顆鈕：**開繪圖器**／**開工坊**（都另開新視窗）。
- **直接開**：`https://<站台>/pixel-editor.html`（可加 `?id=<物件 id>` 直接開某一個）、
  `https://<站台>/pixel-studio.html`（分頁 `?mode=scene|story|io`）。
- **本機**：repo 根目錄 `python -m http.server 8080` 再開 `http://localhost:8080/pixel-editor.html`
  （用 `file://` 開會讀不到 `art/` 底下的圖）。
- 工坊左欄的物件清單**點一下就在繪圖器打開**；繪圖器「檔案 → 回像素工坊」回去。

畫的東西先存在**這個瀏覽器的 IndexedDB**（`dipPixelStudio`；舊的 localStorage 草稿第一次開會自動搬過去），
改動後約半秒自動存。換瀏覽器、清資料就沒了——所以做完一段就走第 4 節的交接流程進 repo。
預覽站（`<分支>.dip-vinyl-shop.pages.dev`）不受 `dip-character.js` 的「新分頁重置」影響，這兩頁都沒載入那支檔案。

## 2. 繪圖器（`pixel-editor.html`）

版面照 Aseprite：上方選單列與工具選項列、左邊前景／背景色與色盤、中間畫布、右邊工具、下方時間軸、底部狀態列。
畫布 1–1024 px；內部用索引陣列（一格一個色盤編號），大圖也不卡。

- **顏色**：左鍵畫前景色、右鍵畫背景色、<kbd>X</kbd> 互換、<kbd>Alt</kbd>＋點暫時吸色。
  色盤格左鍵設前景、右鍵設背景、雙擊開取色視窗（hex／RGB／HSV 滑桿）。
- **工具**：鉛筆 B、橡皮擦 E、油漆桶 G（相連／全圖、容差）、吸管 I、直線 L、矩形 U、橢圓 Shift+U、
  框選 M（連按循環 框選／橢圓／套索／多邊形）、魔術棒 W、移動 V、平移 H、縮放 Z、腳點。
- **筆刷**：1–64 寬、方／圓、網點（棋盤 50%／25%／75%／橫線／直線）、像素完美線、<kbd>Shift</kbd> 拖＝45°／正方／正圓。
- **對稱**：Shift+X 左右、Shift+Y 上下，可同時；油漆桶也跟著對稱。
- **選取**：Shift 加選、Alt 減選、Shift+Alt 交集；全選 Ctrl+A、取消 Ctrl+D、反選 Ctrl+Shift+I、擴張／收縮一像素。
  **懸浮選取**：移動或貼上之後內容浮著，可以一直拖，<kbd>Enter</kbd> 才落地、<kbd>Esc</kbd> 取消。
- **剪貼**：Ctrl+C／X／V，跨物件貼會自動把來源顏色補進色盤；也吃系統剪貼簿的圖片。
- **圖層**：新增 Alt+N、複製、刪除、上下移、向下合併、全部壓平、顯示、鎖定；時間軸雙擊圖層名改名。
- **時間軸**：圖層 × 格的矩陣，每一格是一個 cel，點哪裡編哪裡；新增／刪除格、fps、播放、洋蔥皮（前紅後藍）。
- **畫布**：九宮格錨點調整大小、整張 ×2／÷2、翻轉、旋轉 90°、裁到內容、裁到選取。
- **檢視**：滾輪以游標為中心縮放（最高 64 倍）、空白鍵或中鍵平移、<kbd>0</kbd> 縮到剛好、<kbd>1</kbd> 1:1、
  <kbd>Tab</kbd> 格線（粗線間距可調）、平鋪檢視（畫無縫地磚用）。
- **匯入**：圖片依色盤量化（當新圖層或取代整張）、拖圖片進畫布、Ctrl+V 貼圖。**匯出**：PNG ×1–16（此格或每格）、物件 JSON。
- **復原** 100 步。右上「說明 → 快捷鍵」有總表。

**索引色的限制講在前面**：格式是「一字元一色」，所以沒有每像素透明度、沒有圖層不透明度與混合模式。
要 Claude 能直接改像素文字，就沒有 alpha，這是取捨。色盤上限約 100 色。

圖檔物件（`kind:image`，例如 `art/props/table.png`）不能逐像素改；要編輯就用「檔案 → 匯入圖片」轉成像素物件。

## 3. 工坊（`pixel-studio.html`）的兩個分頁

物件的繪圖已經搬到繪圖器，工坊只留場景與劇本，加上跟 Claude 的交接。

### 🏞 場景
- 邏輯尺寸（新建時可選 448×492 舞台、390×600 對戰直式、560×315 橫幅…）＋ 底色 ＋ 背景圖 ＋ 一堆物件實例（items）＋ 站位（anchors）。
  對戰畫面、劇情畫面都是一個場景：背景畫成一個大像素物件（或直接當底圖），角色、UI 框各是物件擺上去。
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

## 4. 資料格式（`art/pixel/`）

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
- 可選 `layers:[{ name, visible, locked, frames:[rows…] }]`（由下往上）。**有 `layers` 時它是來源，`frames` 是壓平結果**；
  前台只讀 `frames`。Claude 改了 `layers` 的 rows 之後跑 `node scripts/pixel-index.mjs` 會自動重壓；
  要直接改 `frames` 就先把 `layers` 拿掉（或把改動寫進對應圖層）。
- 可選 `fps`、`durations:[ms…]`（動畫）。

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

## 5. 跟 Claude Code 的協作流程

資料要在 repo 裡 Claude 才碰得到。三條路，都在工坊的 **🔁 交接** 分頁：

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

## 6. 接進遊戲（現況與下一步）

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

## 7. 已知限制

- **沒有 alpha**：每像素透明度、圖層不透明度、混合模式都做不到，因為格式是一字元一色。色盤上限約 100 色。
- 圖層只有顯示與鎖定。
- 這一批（第 1 批：外殼與手感）**還沒做**：動畫標籤與獨立預覽視窗、漸層與上色墨水、描邊、點陣字、
  色盤明暗階產生器、`.aseprite` 匯入、GIF 匯出、雪碧圖切入、圖片智慧像素化與自動切件。排在第 2 到第 5 批。
- `匯入圖片` 是最近色量化，不是抽色演算法；照片會撐到色盤上限，適合本來就是像素圖的來源。
- 資料在本機 IndexedDB（舊的 localStorage 草稿第一次開會自動搬過去），沒有走 Firestore；跨裝置靠 repo。
- GitHub token 存在瀏覽器 localStorage，用 fine-grained、只給這個 repo 的 Contents 權限，到期就換。
