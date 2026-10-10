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

## 現況（2026-10-07）

68 筆全部 `in_stock`、全部由 Notion「卡池鍵」對上卡池（`PENDING_NEW` 已清空）。
三波缺卡共 28 張都已上架：add-20261004-shop 3 張、add-20261005-shop 12 張、add-20261006-shop 13 張。
`OVERRIDES` 裡的幾筆現在都被卡池鍵蓋過，留著只是備援。
後台「↻ 從 Notion 重新整理」要等 Worker 設好 `NOTION_TOKEN` 並部署才能用（本機部署被自動模式擋下，要店主自己跑）。

## 門市版介紹（2026-10-06 店主定案；2026-10-07 修訂）

- **2026-10-07 店主修訂：卡池沒有的店內專輯，建卡時卡片簡介直接用門市版**，不另外做卡牌版的研究與寫作。
  新卡批的雲端段因此只要做身分、封面、試聽、三軸與門市版；本機段用 `batch-progress/shop-localize.mjs <批> <stamp>`
  把門市版填進 manifest（撞到卡片禁語時在 `local-<stamp>.json` 的 `descReplace` 只改卡片那一份）。
  卡池原本就有的卡，卡牌版簡介照舊、不被門市版取代。
- 門市版本身仍然**給實體店用**（後台「🏪 實體店庫存」分頁、日後印出來給客人看）；店主在後台改過的版本只影響門市，不會回寫卡片。
- 寫作規則：`SHOP_DESC_RULES.md`（給完全不懂音樂的人看；禁樂器解說、禁「也就是」式注解、禁「據…」轉述）。
- 預設稿：`descs.json`（`node scripts/build-shop-descs.mjs <草稿.json>` 合併，會擋禁語與字數）。
  每筆 `key` = 卡池鍵正規化；待上架的另有 `ids`（Notion 頁面 id）讓後台對得上。
- 店主在後台按「編輯」改過的版本存 Firestore `settings/shopDescs.byKey[key]`，優先於預設稿；
  按「還原預設稿」或存成和預設稿一樣的內容就會刪掉改過的版本。
- 新進庫存：照規則寫門市版、跑合併腳本，跟卡池上架是兩條線。

## 第二、三波（2026-10-05／06 進貨，2026-10-07 本機上架完成）
- 第二波 12 張（add-20261005-shop）、第三波 13 張（add-20261006-shop）已上架，published gate 0 error；Notion 25 列卡池鍵已填。
- 宮沢昭《Bull Trout》＝池中《いわな》（卡池鍵已在 Notion）。卡池列沒有別名欄，「queryAlias 補 Bull Trout」沒有地方可寫，未做。
- 門市版介紹：在售 68 張全數有預設稿（`descs.json`）。
- 藝人介紹 ar-d-119 上架 7 位（桃井かおり 素材不足略過），分片 3087 位。
- 以上各項已補記 `PROJECT_MEMORY.md`（2026-10-07 那一筆）。

## 曲風分區（2026-10-07）
- 曲風以 Notion「曲風」多選欄為準（Jazz、Soul、R&B、Hip-Hop、Rock、Folk、City Pop、Pop、Electronic、Soundtrack；Hip-Hop／R&B／Pop 為 2026-10-07 新增）。
- 快照與 inventory.json 帶 `genres`；Worker /shop-inventory 回傳 `genres`（需本機重新部署 Worker 才生效）。
- 後台「實體店庫存」依第一個曲風分區，每張卡下方顯示曲風標籤；Firestore 舊存檔沒有曲風時先用 repo 快照補，按「從 Notion 重新整理 → 套用並存檔」後改用 Notion 的值。

## 店內挖寶（選片遊戲，2026-10-07）

入口 `shop.html`（首頁 hub「店內挖寶」），四張卡連到 `/?shop=1#quiz|genre|artist|random`。
`index.html` 看到 `?shop=1` 就把抽卡範圍換成店內在售（`loadShopPool()`：Firestore `settings/shopInventory` 的 `in_stock`，讀不到退本目錄 `inventory.json`），四個遊戲的規則不變。

- **直接來一張／猜你喜歡**：從店內卡抽；猜你喜歡的口味畫像仍查完整卡池（錨點藝人多半不在店裡），類型選單只列店裡有貨的類型、附張數。
- **類型挑片**：只選大類（店主：細分不用），大類只列有貨的、附張數；某類抽光自動重來。
- **心情選歌**：題目與心情判定照舊；卡從店內挑「接得住這個心情」的，對照表是 `mood-map.json`（cardKey → 心情）。
  結果頁放「今天的你：…」一句＋門市版專輯簡介（心情段落是逐張人工寫的，店內卡沒有）。
- 王牌（殿堂／流亡／異端）在店內模式併進一般抽卡，結果頁照 tier 顯示王牌樣式。
- 結果頁多一行「店內在售・售價・品相・壓片年」；不做「我要這張」按鈕（店主 2026-10-07）。

**新進貨要做的**：上架（`dip-card-create`）→ 後台從 Notion 重新整理 → **在 `mood-map.json` 補這張的心情**。
`node scripts/sync-shop-inventory.mjs` 會列出「⚠ 心情未配」的卡；沒補也能玩（前端用三軸＋曲風粗估成 balance／drift 等），只是心情選歌比較不準。

> 待本機補記 PROJECT_MEMORY：2026-10-07｜dip-vinyl-shop｜店內挖寶：`shop.html`＋`index.html` 的 `?shop=1` 模式（四個選片遊戲只抽店內在售）、
> `dip-genre-tree.js` 加 `topOnly`／`backHref`（v=2）、`data/shop/mood-map.json` 68 張配心情、同步腳本提醒心情未配。
> 驗證：Playwright（正式網域攔截本機檔）四個遊戲店內模式各抽多次全在店內清單、售價行正確、類型抽光自動重來；一般模式四個遊戲回歸正常。
