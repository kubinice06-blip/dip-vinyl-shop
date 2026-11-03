# 方案 C 套用報告（2026-11-03）

店主看完全池稽核報告回「1 c」。本工作階段照 `APPLY-C.md` 第 1–8 步套用 `apply-c.json`（2,713 張）。
套用前重跑 `build-apply-c.js`，產出與 repo 版本逐字相同。

## 1. tier 前後

| | 殿堂 | 流亡 | 異端 |
|---|---:|---:|---:|
| 套用前 | 692 | 109 | 116 |
| 套用後 | **170** | **232** | **54** |

變動：殿堂→一般 548、流亡→一般 103、異端→一般 71、異端→流亡 1、一般→殿堂 26、一般→流亡 225、一般→異端 10（合計 984）。

## 2. 全池等級分布（22,506 張，總數不變）

| | 殿堂 | 流亡 | 異端 | 傳奇 | 史詩 | 獨特 | 稀有 | 普通 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 套用前 | 692 | 109 | 116 | 735 | 1,655 | 3,811 | 6,312 | 9,076 |
| 套用後 | 170 | 232 | 54 | **471** | **1,612** | **3,943** | **6,587** | **9,437** |

與 `APPLY-C.md` 目標完全一致。頂點三級都少於傳奇，金字塔成立。

## 3. 三軸前後（2,713 張；分布為 1/2/3/4/5 星張數）

| 軸 | 套用前 | 套用後 | 有變 |
|---|---|---|---:|
| 經典度 | 14/192/539/855/1113 | 2/145/657/1187/722 | 1,230 |
| 冷門度 | 276/474/599/440/924 | 258/770/904/389/392 | 1,282 |
| 硬蕊度 | 493/971/464/353/432 | 550/974/570/433/186 | 882 |

三軸任一有變 2,245 張；一般卡稀有度有變 1,214 張。組別：A 802、H 687、P 528、S 359、X 337。

## 4. 寫入

| 位置 | 結果 |
|---|---|
| `seed_cards.json` | 2,713 列（三軸欄＋tier 欄）。三道防呆：總筆數 22,506 不變、命中＝2,713、逐列只動三軸與 tier。降級列照 `pool.mjs` 慣例去掉 tier（無作曲家的連尾端 null 一起去掉，長 7）；升級列補到 8 欄再加 tier。重跑 0 變動。 |
| manifest | 根目錄＋`batch-progress/add-*/` 副本 330 檔、1,800 筆＋第二遍 714 筆。`ratings.source`＝`manual:audit-20261102`、`previous` 留舊值；`apexAssessment` 改新判定、舊判定留在 `previous`；`rarity` 依公式（頂點卡照慣例存公式值）。`published.seedCards／apexPool` 跟著 tier 翻轉（gate 依它找卡池列）。新流亡 225 張的 `evidenceUrls` 補 Last.fm 本盤頁＋MusicBrainz／Discogs 本盤頁。排版逐字保留，重跑 0 變動。apply-c 中有 manifest 的卡 1,495／2,713，其餘是早期沒有 manifest 的卡。 |
| `card_catalog` | 推 **2,713／2,713、失敗 0**。四欄＋tier／apex：升級 341 張寫 `tier`＋`apex:true`；降級 722 張刪 `tier`／`apex`、補 `seed:true`（與一般卡一致）。整份重列（22,796 文件）比對 0 不符；抽 15 張讀回 15/15。 |
| 新手禮 `WELCOME_HALL_ALBUMS` | 18 張全數仍是殿堂，**0 張要換**。`NEOCLASSIC_LIST`（Dark Side of the Moon、Kind of Blue）仍是殿堂。 |
| 其他寫死名單 | `battle.html`／`roguelike.html` 備援王牌、教學牌組、Po 牌組裡的流亡卡換成現役流亡：Bobb Trimble《Iron Curtain Innocence》（本次降級）→ Deerfield《Nil Desperandum》；高田みどり、Connie Converse、Pauline Anna Strom（原本就不是流亡）→ Dada《Jyo》、Deerfield、Jemeel Moondoc & Muntu《The Evening of the Blue Men》。admin `DA_FALLBACK` 只是封面樣本，不涉 tier。 |
| 店內印刷卡 | 在售 116 張中 tier 變 4 張（殿堂→一般：Horace Silver and the Jazz Messengers、Built to Spill、Neil Young & Crazy Horse；一般→流亡：真芽正恵）、只三軸變 5 張。A6／A7／A7-A4 的 html＋jsx、A4 PDF 重出。 |

## 5. 玩家收藏

**前台是讀卡匣旗標，不會自動跟著變。**

- 唱片櫃（`index.html` loadCollection）：頂點判定順序是 `album_overrides.tier` → **卡匣存的 `hall／pearl／heresy` 旗標** → 神作名單；三軸取 Worker `/album-rating` 再疊 `album_overrides`，不讀 `card_catalog`。
- 對戰（`battle.html` buildPlayerDeck）：**卡匣旗標最優先**，其次 `album_overrides.tier`。
- 影響：
  - **降級的 722 張**：玩家抽到時卡匣已存 `hall:true` 等旗標，唱片櫃照樣顯示殿堂、對戰照樣 7 星王牌。清掉 `album_overrides.tier` 也蓋不過卡匣旗標。
  - **升級的 262 張**：玩家卡匣沒有旗標，要等本機同步 `album_overrides.tier` 之後，唱片櫃與對戰才會當頂點。
  - 新抽到的卡照 seed 第 9 欄，自動是新 tier。
- 人數與張數查不到：`collections/{uid}/cards` 需登入本人才能讀，公開 key 做 collection group 查詢回 403。
- **玩家資料一律沒動。** 交店主決定，選項：
  1. 舊卡保留（老玩家手上的殿堂照舊），只影響新抽的卡。
  2. 改前台：卡池有這張時以 seed 第 9 欄為準、卡匣旗標只當卡池沒這張時的備援。不改玩家資料，唱片櫃與對戰都會跟著新 tier。
  3. 批次改玩家卡匣旗標（要管理員身分，雲端做不到）。

## 6. published gate

跑本次改到的根目錄 manifest 243 份（`--published`）：共 2,908 個 error，**與本次套用相關的類別 0 error**——三軸、稀有度、tier、卡池列（seed／王牌入口）、card_catalog 評分欄、album_overrides.tier 全過。

- 落在 apply-c 2,713 張上的 error 367 個，全是既有的兩類：`/album-desc` 與 manifest 不一致 308（簡介改寫後沒回寫 manifest）、`card_catalog.coverUrl` 不一致 59。
- 其餘是同檔其他卡的既有問題：album-desc 落後 KV（多數）、coverUrl（9 月前的舊 manifest 為主）、已不在卡池的 24 張（崔健、窦唯、萬能青年旅店、Ghost、Placebo 等；第二輪報告已列過，卡名改過或已移出）、CAA／網址 HTTP、試聽靜態地圖缺 11 張。都與本次無關，沒順手修。
- 日誌：`publish-stage/gates-audit-c/`（不進版控）。

## 7. 待本機處理

1. **`album_overrides.tier`**：管理員集合，雲端寫不了。清單在 `publish-stage/audit-20261102/album-overrides-tier.json`（版控副本 `batch-progress/audit-20261102/album-overrides-tier.json`）：要設 263、要清 704。
   **需本機後台匯入**：後台「頂級牌管理」新加了「⇄ 依卡池同步頂點旗標」，以 seed 第 9 欄為準，一鍵補寫／清除 `album_overrides.tier`，並同步 `apex_pool` 的 tier／demoted。合併部署後按一次即可，可重按。
2. **玩家收藏**：見第 5 節，等店主選 1／2／3。
3. 不在卡池、卻在 `card_catalog`／`album_overrides` 帶 tier 的孤兒 13／17 筆（Big Brother《Cheap Thrills》、The Police《Regatta de Blanc》、非常階段《Viva Angel》等，卡名寫法與卡池不同），是舊資料，沒動。

## 檔案

- `apply-c.mjs`：`--seed`／`--manifest`／`--catalog` 三段，可重跑。
- `push-catalog.mjs`：推 card_catalog；`--verify N` 抽 N 張讀回。
- `card-catalog-patches.json`、`album-overrides-tier.json`、`touched-manifests.json`。
