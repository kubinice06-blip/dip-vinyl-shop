# 店內販售區資料（2026-10-04 建立）

來源：Notion「唱片庫存售價表（販售中）」(`401f0a5c4871448783385c78f6a3ac39`)。

| 檔案 | 用途 |
|---|---|
| `notion-snapshot.json` | Notion 表的公開欄位快照（頁面 id、品名、演出者、年份、品相、售價、卡池鍵）。**成本、利潤、水星抽成、群組不進 repo**——這是公開站。 |
| `inventory.json` | **其他功能讀這份。** 每筆有 `status`（`in_stock`／`pending_card`／`sold`）、`cardKey`（＝`scripts/pool-keys.mjs` 的 `key(artist, album)`）、卡池原字 `artist`／`album`、店內標示名、壓片年、品相、售價。 |

## 即時來源（2026-10-05 起）

**Firestore `settings/shopInventory` 是即時清單**（所有人可讀、只有管理員可寫），格式同 `inventory.json`（`items[]`，含 `status`／`cardKey`）。
後台「🏪 實體店庫存」按「↻ 從 Notion 重新整理」→ Worker `/shop-inventory`（帶 X-Admin-Key、Worker 持有 `NOTION_TOKEN`，只回公開欄位）
→ 列出新增／移除（記 sold）／改價／對不上卡池 → 「套用並存檔」寫回 Firestore。
其他功能要讀店內在售：**先讀 Firestore `settings/shopInventory`，讀不到才退 `data/shop/inventory.json`**（repo 快照，靠 `scripts/sync-shop-inventory.mjs` 更新）。

一次性設定（本機）：Notion 建 internal integration → 把「唱片庫存售價表（販售中）」分享給它 →
`cd dip-vinyl-worker && npx wrangler secret put NOTION_TOKEN` → `npm run deploy`。

## 後台

`admin.html` 的「🏪 實體店庫存」分頁讀這份檔，照前台「我的唱片櫃」的卡片樣式排列（稀有度框色、售價、品相、壓片年）；
點卡片開詳情，介紹優先序同前台：`album_overrides.desc` → `/album-desc`。待上架的卡標「待上架」、不顯示介紹。

## 讀法

```js
const inv = await (await fetch('/data/shop/inventory.json')).json();
const inShop = new Set(inv.items.filter(i => i.status === 'in_stock').map(i => i.cardKey));
// 卡池列 r：inShop.has(key(r[0], r[1]))
```

`pressingYear` 是店內那張的壓片年（常是再版），卡片身分一律用原盤；不為再版另建卡。

## 更新

1. Claude 以 Notion MCP 查表、覆寫 `notion-snapshot.json`（只留上述公開欄位）。
2. `node scripts/sync-shop-inventory.mjs`（乾跑）→ `--write`。
3. 對不上卡池的列會報錯：已在池中但名字寫法不同 → 加進腳本的 `OVERRIDES`；
   卡池沒有 → 走 `dip-card-create` 新建，期間放 `PENDING_NEW`。
4. 從 Notion 消失的列不刪，記為 `sold`＋`soldAt`。

Notion 表有「卡池鍵」欄（`藝人|專輯`，照 `seed_cards.json` 原字），2026-10-04 已填 23 筆；快照存成 `poolKey`，同步時優先採用。
新進貨在 Notion 填好卡池鍵即可；空白的才走自動比對。

## 現況（2026-10-05）

26 筆全部 `in_stock`。缺卡的 3 張（Elmo Hope《Hope Meets Foster》《High Hope!》、ジョージ大塚トリオ《You Are My Sunshine》）已由 add-20261004-shop 上架；
大塚那張封面印的是 The New George Otsuka Trio，對應寫在腳本的 `OVERRIDES`。Notion 這 3 列的「卡池鍵」還沒填，填了之後可以把那筆 override 拿掉。

## 待本機補記 PROJECT_MEMORY（雲端不碰該檔）

> 2026-10-05｜dip-vinyl-shop＋dip-vinyl-worker｜後台「實體店庫存」加「↻ 從 Notion 重新整理」：Worker 新增 `/shop-inventory`（管理員金鑰、NOTION_TOKEN，只回公開欄位），
> 後台比對新增／移除／改價後存 Firestore `settings/shopInventory`。驗證：Worker 路由以模擬 Notion 回應測 200／403／503 與分頁；後台 Playwright 模擬刪 1 增 2 改價 1，差異清單正確。待本機：設 NOTION_TOKEN、部署 Worker。

## 門市版介紹（2026-10-06 店主定案）

- **只給實體店用**（後台「🏪 實體店庫存」分頁、日後印出來給客人看），**不進卡池、不寫 KV、不取代卡牌遊戲版簡介**。
- 寫作規則：`SHOP_DESC_RULES.md`（給完全不懂音樂的人看；禁樂器解說、禁「也就是」式注解、禁「據…」轉述）。
- 預設稿：`descs.json`（`node scripts/build-shop-descs.mjs <草稿.json>` 合併，會擋禁語與字數）。
  每筆 `key` = 卡池鍵正規化；待上架的另有 `ids`（Notion 頁面 id）讓後台對得上。
- 店主在後台按「編輯」改過的版本存 Firestore `settings/shopDescs.byKey[key]`，優先於預設稿；
  按「還原預設稿」或存成和預設稿一樣的內容就會刪掉改過的版本。
- 新進庫存：照規則寫門市版、跑合併腳本，跟卡池上架是兩條線。

## 第三波（2026-10-06）雲端完成、待本機
- Notion 新進 26 張：卡池已有 12 張＋宮沢昭《Bull Trout》＝池中《いわな》（卡池鍵已回寫 Notion）；新建卡 13 張（`batch-progress/add-20261006-shop/`，prepare gate 0 error，交接見 handoff.json）。
- 門市版介紹：在售 68 張全數有預設稿（`descs.json`）。
- 藝人介紹 ar-d-119 上架 7 位（桃井かおり 素材不足略過），分片 3087 位。
- 本機待辦：add-20261006-shop 照 handoff.json 上架（KV／Firestore／album_overrides repaste／seed／published gate）；上架後 Notion 13 列補卡池鍵、PENDING_NEW 清掉、重跑同步腳本；池卡《いわな》queryAlias 補 Bull Trout。
- PROJECT_MEMORY.md 待本機補一筆：2026-10-06 dip-vinyl-shop 店內販售區第三波＋門市版介紹機制（descs.json／SHOP_DESC_RULES.md／後台可編輯，Firestore settings/shopDescs）。

## 曲風分區（2026-10-07）
- 曲風以 Notion「曲風」多選欄為準（Jazz、Soul、R&B、Hip-Hop、Rock、Folk、City Pop、Pop、Electronic、Soundtrack；Hip-Hop／R&B／Pop 為 2026-10-07 新增）。
- 快照與 inventory.json 帶 `genres`；Worker /shop-inventory 回傳 `genres`（需本機重新部署 Worker 才生效）。
- 後台「實體店庫存」依第一個曲風分區，每張卡下方顯示曲風標籤；Firestore 舊存檔沒有曲風時先用 repo 快照補，按「從 Notion 重新整理 → 套用並存檔」後改用 Notion 的值。
