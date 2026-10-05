# 店內販售區資料（2026-10-04 建立）

來源：Notion「唱片庫存售價表（販售中）」(`401f0a5c4871448783385c78f6a3ac39`)。

| 檔案 | 用途 |
|---|---|
| `notion-snapshot.json` | Notion 表的公開欄位快照（頁面 id、品名、演出者、年份、品相、售價、卡池鍵）。**成本、利潤、水星抽成、群組不進 repo**——這是公開站。 |
| `inventory.json` | **其他功能讀這份。** 每筆有 `status`（`in_stock`／`pending_card`／`sold`）、`cardKey`（＝`scripts/pool-keys.mjs` 的 `key(artist, album)`）、卡池原字 `artist`／`album`、店內標示名、壓片年、品相、售價。 |

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
