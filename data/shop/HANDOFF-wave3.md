# 店內販售區 第三波交接（2026-10-06）

前一個工作階段已完成：Notion「唱片庫存售價表（販售中）」第三波 26 張入庫
（`data/shop/notion-snapshot.json` 68 列、`data/shop/inventory.json`：in_stock 42、pending_card 26）。

## 本工作階段要做的兩件事

### A. 14 張新卡建卡（走 `dip-card-create`，完整遵守 `ALBUM_ONBOARDING.md`）
批次名建議 `add-20261006-shop`，比照 `batch-progress/add-20261005-shop/` 的先例
（rulings.md、onboarding-manifest.json、handoff.json；雲端不碰 seed／KV／Firestore／PROJECT_MEMORY.md）。

| Notion 頁面 id | 演出者 | 專輯（Notion 寫法） | 備註 |
|---|---|---|---|
| 3f10ad0255ff8058842fd9ecdd571873 | O.M.Y. | 弱気なぼくら | 身分待查 |
| 3f10ad0255ff80b49db3f5bb0ec296b6 | Red Mitchell | Rejoice! | |
| 3f10ad0255ff80679cdff9a5e6f69470 | Carmen Maki | 真夜中詩集 －ろうそくの消えるまで | 1969；池中有 カルメン・マキ&OZ，藝人名照池中慣例 |
| 3f10ad0255ff802fab77e511d729ac00 | あがた森魚 | 噫無情 | 1974 |
| 3f10ad0255ff800fa960ff764af0dc23 | 桃井かおり | おもしろ遊戯 | 1982 |
| 3f10ad0255ff806888eaca9373bcb06a | 矢野顕子 | オーエス オーエス | Notion 原本演出者／品名寫反，已更正 |
| 3f10ad0255ff80a9aa62ed1aa5a9b602 | Kai Winding | Rainy Day | |
| 3f10ad0255ff80cf8ee0e417a5784dde | 明田川荘之 | This Here´ Is Aketa Vol. 2 | 正式盤名待查 |
| 3f10ad0255ff80e7bd17edee59a4221e | Miles Davis | Miles Davis and Horns | Prestige 早期場次合輯，§5.6 判斷 |
| 3f10ad0255ff8059aa49da71d0df331f | Barry Harris Trio | Breakin' It Up | 1975（應為再版年，原盤 1958 Argo） |
| 3f10ad0255ff8040af83fca5d008b0f0 | 宮本典子 & 鈴木勲 | Push | 身分待查 |
| 3f10ad0255ff802683fae74b2aee59e8 | 梅津和時 | 竹の村 | |
| 3f10ad0255ff8067a895d536274aee16 | Mal Waldron / 梅津和時 | Another Step | |
| 3f10ad0255ff804ba972c1e0fb194f4f | 宮沢昭 | Bull Trout | |

建卡完成後：Notion 這 14 列補「卡池鍵」、`scripts/sync-shop-inventory.mjs` 的 PENDING_NEW 由本機上架後清掉。
相關藝人介紹缺的補跑 `dip-artist-intro`（比照 ar-d-117／118）。

### B. 26 張門市版介紹（12 張卡池已有＋14 張新卡）
規則：`data/shop/SHOP_DESC_RULES.md`（寫給完全不懂音樂的客人；禁樂器解說、禁「也就是」注解、禁「據…」轉述）。
產線：研究層（`data/shop/research/DISPATCH.md`，每張 8–12 條附 https 的 facts）→ 寫作層（`data/shop/research/WRITER.md`，只根據 facts）→ 主線逐句審 → `node scripts/build-shop-descs.mjs <草稿>` 合併進 `data/shop/descs.json`。
14 張新卡可直接沿用建卡研究稿（`desc-tools/batches/research/add-20261006-shop-*.json`），不必重查。
卡池已有的 12 張：あがた森魚《乙女の儚夢》、ELP《Pictures at an Exhibition》、Erroll Garner《Erroll Garner Plays Misty》、
Neil Young & Crazy Horse《Everybody Knows This Is Nowhere》、浅川マキ《Cat Nap》、Horace Silver And The Jazz Messengers、
菊地雅章《But Not For Me》、佐藤允彦トリオ《Palladium》、De La Soul《Art Official Intelligence: Mosaic Thump》、
Keith Jarrett《Luminessence》、秋吉敏子トリオ & Flute Quartet《Tuttie Flutie》、Portishead《Portishead》。

## 店主偏好（務必遵守）
- 只用台灣繁體中文回覆，絕不用英文。回報短：結果、數字、要店主決定的事。
- 門市版只給實體店，與卡牌遊戲簡介完全分開，不進卡池。
- 事實一律先研究、附出處；查不到就不寫，不憑記憶補。店主確認過的事照寫（記進 rulings）。
- 中途不回報，整條線做完再回；裁定自己決定、寫進 rulings.md。
