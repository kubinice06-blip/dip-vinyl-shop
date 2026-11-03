# 殿堂擴充到 303＋重複卡合併 套用報告（2026-11-03）

店主審過兩輪後定案（`HALL-EXPANSION.md`、`hall-expansion.json`），同意合併池中重複卡（「3 好」）。本工作階段負責套用。

- 工具：
  - `apply-h.mjs`：由 `apply-r.mjs` 改出，`--build／--seed／--manifest／--catalog／--overrides`，全部可重跑。
  - `push-catalog-h.mjs`：推送、`--verify N`、`--relist`。
  - `dedupe.mjs`：`--local／--kv／--catalog／--verify`，可重跑；被刪資料備份在 `dedupe-backup/`。

## 1. 殿堂前後

| | 殿堂 | 流亡 | 異端 |
|---|---:|---:|---:|
| 套用前 | 170 | 254 | 85 |
| 套用後 | **303** | **254** | **85** |

- `add` 133 張，全為 null → hall。
- 套用前驗證：133 張都在 seed，第 9 欄都是空的（0 不符）。
- 同級內一藝人一張：違規 0。唯一例外是 Miles Davis，殿堂兩張：《Kind of Blue》＋《In a Silent Way》（`--build` 斷言恰為 2）。
- 升殿堂的 133 張原本的稀有度：獨特 58、稀有 33、史詩 30、普通 7、傳奇 5。
- **經典度補正（主線裁定）**：133 張中有 16 張 classic<5，published gate 擋下「hall 候選必須 classic=5」（`ALBUM_ONBOARDING.md`：殿堂的最低門檻是 classic=5）。
  - 照《台客的復仇》由店主指定殿堂時定 5/5/3 的先例，16 張的經典度改為 5，冷門度、硬蕊度不動。工具 `classic5-h.mjs`。
  - 16 張：Donna Summer《Love to Love You Baby》、Nina Simone《I Put a Spell on You》、Bessie Smith《The Essential Bessie Smith》、Dizzy Gillespie《Afro》、Jimmy Smith《Back at the Chicken Shack》、Django Reinhardt《Djangology》、Coleman Hawkins《Body and Soul》、Slum Village《Fan-Tas-Tic, Volume 1》、Guru《Jazzmatazz, Vol. 1》、張雨生《口是心非》、林強《娛樂世界》、張國榮《Leslie》、達明一派《石頭記》、陳綺貞《讓我想一想》、李泰祥《鄉土．民謠 第一輯》（原本 3）、新寶島康樂隊《新寶島康樂隊》。其餘 15 張原本都是 4。
  - 寫入：seed 第 3 欄 16 列（三道防呆，重跑 0 變動）；manifest 8 筆（`ratings.source` 為 `manual:hall-expansion-20261103`，舊值存 `previous`）；card_catalog `classic`＋`rarity` 16／16，讀回 16/16。
  - 店內印刷卡重出：0 差異，在售品不含這 16 張。
  - 店主若不同意，改回只要動這 16 張的單一欄位。

## 2. 全池等級分布

| | 總數 | 殿堂 | 流亡 | 異端 | 傳奇 | 史詩 | 獨特 | 稀有 | 普通 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 套用前 | 22,507 | 170 | 254 | 85 | 424 | 1,679 | 4,072 | 6,864 | 8,959 |
| 套用後 | **22,505** | **303** | 254 | 85 | 419 | 1,649 | 4,013 | 6,831 | 8,951 |

- 總數少 2：重複卡合併刪了 2 列。
  - 白色專輯 2000 那筆是獨特。
  - Jazzmatazz Volume 1 是普通。
- 殿堂 303 仍少於傳奇 419。

## 3. 殿堂擴充寫入

| 位置 | 結果 |
|---|---|
| `seed_cards.json` | 第 9 欄改 133 列（長 7 補到 8 欄再加 `"hall"`）。三道防呆：總筆數不變、命中＝133、逐列只動 tier。重跑 0 變動。 |
| manifest | 133 張中有 manifest 的 55 張，分布在根目錄 20 檔（清單見 `touched-manifests-h.json`）。`apexAssessment` 的 `reason` 寫「店主 2026-11-03 定案殿堂擴充（hall-expansion-20261103）：升為殿堂」，`source` 為 `manual:hall-expansion-20261103`，舊判定存 `previous`。`evidenceUrls` 用 Last.fm＋MB／Discogs 頁。`rarity` 依公式；`published.seedCards／apexPool` 跟著翻。三軸與 seed 0 漂移。重跑 0 變動。 |
| `card_catalog` | 推 **133／133，失敗 0**（寫 `tier: hall`、`apex: true`，`rarity` 照公式）。整份重列 22,797 文件：133 張 0 不符；**全池 seed 第 9 欄 ↔ catalog tier 0 不符**，catalog 池內殿堂 303、流亡 254、異端 85。抽 15 張讀回 15/15。 |
| `album_overrides.tier` | 雲端寫不了。要設 133 張，清單 `album-overrides-tier-h.json`（`publish-stage/hall-expansion-20261103/` 也有一份），見第 6 節。 |
| 店內印刷卡 | 在售 116 張中，Art Blakey《Moanin'》升殿堂。A6／A7／A7-A4 html＋jsx、A4 PDF 已重出。 |

## 4. 重複卡合併

### 4.1 比對（刪除前）

**The Beatles**：保留《The Beatles》（1968），刪《The Beatles (White Album)》（2000）。

| 項目 | 保留那筆 | 被刪那筆 | 處理 |
|---|---|---|---|
| seed | 5/1/2，1968 | 5/1/2，2000 | 刪被刪那筆 |
| 簡介 KV `desc2` | 有，新版 | 有 | 保留那筆較好，不併 |
| 封面 `cover6` | CAA 原盤圖，無 `spotifyUrl` | Spotify 圖＋`spotifyUrl` | **把 `spotifyUrl` 併到保留那筆**，圖不換 |
| 試聽 | `unavailable` | `matched`（TW 1436905161） | **配對併到保留那筆**，並重建 runtime |
| 其他 KV | `mapgenre3`、`rating4` 都有 | 有 | 不併 |
| card_catalog | 有（mzstatic 封面） | 有 | 刪被刪那筆 |
| manifest | 無 | 無 | — |

**Guru**：保留《Jazzmatazz, Vol. 1》（本批升殿堂），刪《Jazzmatazz Volume 1》。

| 項目 | 保留那筆 | 被刪那筆 | 處理 |
|---|---|---|---|
| seed | 4/2/1 | 4/3/1 | 刪被刪那筆 |
| 簡介 KV `desc2` | 有，新版 | 有 | 不併 |
| 封面 `cover6` | 有，含 `spotifyUrl` | 有 | 不併 |
| 試聽 | `matched`，同一個 collectionId 723627224 | `matched` | 不併 |
| card_catalog | 有，但無 `upc`／`rgMbid` | 有 `upc` 094632199829、`rgMbid` cb4db891… | **把 `upc`＋`rgMbid` 併到保留那筆** |
| manifest | 無 | `onboarding-manifest-c36-reels-20260822.json` | 刪那一列 |

### 4.2 移除範圍

| 位置 | 結果 |
|---|---|
| `seed_cards.json` | 刪 2 列，22,507 → 22,505（防呆：只命中 2 列、保留列恰 1 列）。 |
| manifest | c36 刪 Guru《Jazzmatazz Volume 1》（27 → 26）。白色專輯沒有 manifest。 |
| `card_catalog` | 2 份文件直接 DELETE（API 可刪，照 rename-utada-20261025 的先例刪、不標 retired）。刪除前整份文件備份在 `dedupe-backup/card-catalog-backup.json`。 |
| KV（`kv-token-check` exit 0） | 寫 1 鍵：`cover6:the beatles\|the beatles` 補 `spotifyUrl`，已回讀一致。刪 8 鍵：被刪兩筆的 `desc2`、`rating4`、`mapgenre3`、`cover6`。刪除前已備份到 `dedupe-backup/kv-backup.json`。 |
| 子曲風 `card-subgenres.json` | 刪 2 鍵（保留那筆原本就有）。 |
| 情緒底稿 `data/mood/card-moods-v0.json` | 刪 2 鍵。 |
| 年份 `data/release-years-v1.json` | 刪 1 鍵（白色專輯 2000）。 |
| 試聽 `data/apple-audio-map-v1.json` | 白色專輯的配對併入保留那筆，再刪 2 鍵。重建 `apple-audio-runtime-v1.json`：只有這 3 個 key 有差異。 |
| 頁面寫死名單（index／battle／roguelike／admin） | 都沒有這兩筆。 |

- `dedupe.mjs --verify` 確認終態：
  - seed、manifest、子曲風、情緒、年份、試聽、KV（21 個前綴）、card_catalog 都已沒有被刪那兩筆。
  - 保留那兩筆都在。
- **沒改的歷史清單**：`data/remaining-cards.json`、`years-pending-review.json`、`release-years-pending-source.json`、`discogs-verify-report.json`、`scripts/cover-audit/`、`batch-progress/mood-axes/` 等。這些是當時的工作清單或報告快照，帶有 total 計數，不是 runtime 讀的檔案。

### 4.3 玩家卡匣

- 雲端查不到：`collections/*/cards` 的 collectionGroup 查詢回 403 PERMISSION_DENIED。
- 玩家資料沒動。手上有《The Beatles (White Album)》或《Jazzmatazz Volume 1》的玩家，卡還在卡匣裡，但卡池和 card_catalog 已經沒有這兩張，簡介、封面 KV 也已刪除。
- 請店主在本機後台查有沒有人持有，再決定要不要換成保留那張。兩組的 cardId：
  - `the beatles|the beatles (white album)` → `the beatles|the beatles`
  - `guru|jazzmatazz volume 1` → `guru|jazzmatazz, vol. 1`

## 5. 新手禮名單

- `WELCOME_HALL_ALBUMS` 18 張全部仍是殿堂。這次只有新增、沒有降級，**不用動**。
- 若要把新殿堂放進新手禮，等店主指定。

## 6. published gate

見第 8 節（gate 結果）。

## 7. 待本機事項

1. **`album_overrides`**（管理員集合，雲端寫不了）：合併部署後，到後台「頂級牌管理」按「⇄ 依卡池同步頂點旗標」。
   - 會設 133 張 hall，並清掉 `the beatles|the beatles` 舊的 `tier: hall`：seed 是一般卡，這筆 override 是方案 C 以前留下的。
   - **另外手動刪 `album_overrides/the beatles|the beatles (white album)`**：卡已不在池中，這份文件還寫著 `tier: hall`，同步按鈕以 seed 為準，可能掃不到它。Guru 兩筆都沒有 override 文件。
2. **玩家卡匣**：見 4.3，查持有者後由店主決定。另外，方案 C 和頂點重整留下的卡匣頂點旗標問題仍待店主選 1／2／3；這次升殿堂的 133 張也要等第 1 項同步後才生效。
3. **情緒前台檔 `data/mood/card-moods.json` 沒有重建**。
   - `build-card-moods.mjs` 的 gate 被既有缺口擋下：濁水溪公社《台客的復仇》（PR #333 上架）沒有情緒座標。
   - 前台用 id 雜湊對卡，被刪兩張的座標只是對不到，不影響其他卡。
   - 補完《台客的復仇》的座標後重建即可。
4. **子曲風樹**：`card-subgenres.json` 已直接刪鍵。`build-genre-tree.mjs --pull --write` 在雲端會超過 10 分鐘，沒跑；本機要重建時照常跑（KV `mapgenre3` 舊鍵已刪，重建結果一致）。
