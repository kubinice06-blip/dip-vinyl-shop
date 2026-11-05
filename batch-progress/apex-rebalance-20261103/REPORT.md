# 頂點重整套用報告（2026-11-03）

店主：「頂點卡每個藝人各取一張最重要的就好 其他備選的補上」「流亡跟異端太少了」；更正「跨等級不用只留一張」「濁水溪公社 台客的復仇 殿堂」。
本工作階段合併 `decisions-q1.json`（111）＋`decisions-q2.json`（91）＝ **202 筆**（key 不重複），照 `audit-20261102/APPLY-C.md` 的做法套用。工具：`apply-r.mjs`（`--build／--seed／--manifest／--catalog／--overrides`，全部可重跑）、`push-catalog.mjs`（推送／`--verify N`／`--relist`）。

## 1. 三級前後

| | 殿堂 | 流亡 | 異端 |
|---|---:|---:|---:|
| 套用前（含《台客的復仇》） | 171 | 232 | 54 |
| 套用後 | **170** | **254** | **85** |

- 同級內每位藝人最多 1 張：違規 **0**（`--build` 斷言）。
- 套用前驗證：202 筆的 `from` 全部等於 seed 第 9 欄現值（0 不符）。
- 變動：殿堂→一般 37、流亡→一般 25、異端→一般 13、一般→殿堂 36、一般→異端 44、一般→流亡 47。
- 只動 tier，三軸未改；降級卡稀有度依公式落在：傳奇 17、史詩 11、獨特 26、稀有 19、普通 2。

### 升降摘要

- **同級去重拿掉 74 張**（54 位藝人，清單見 `decisions-q1.summary.md` 第一節）：例如 Beatles 只留 Abbey Road（拿掉 5 張）、Dylan 只留 Highway 61 Revisited（拿掉 4）、Merzbow 只留 Pulse Demon（拿掉 4）。跨級照更正保留（Coltrane 殿堂 A Love Supreme＋異端 Ascension）。
- **濁水溪公社**：《鬼島社會檔案》流亡→一般；《台客的復仇》殿堂（PR #333 已上架）。
- **殿堂補位 36 張**：Pearl Jam《Ten》、Green Day《Dookie》、Adele《21》、RATM、Neutral Milk Hotel、NIN《The Downward Spiral》、RHCP、OutKast《Aquemini》、Beyoncé《Lemonade》、Arctic Monkeys、White Stripes《Elephant》、Björk《Homogenic》、Beck《Odelay》、Pulp、Nick Drake《Pink Moon》、Soundgarden、Madvillainy、Elliott Smith《Either/Or》、Blur《Parklife》、Erykah Badu、Chet Baker Sings、Siamese Dream、Hotel California、The Band、Layla、Parallel Lines、Buena Vista Social Club、Saxophone Colossus、Music for 18 Musicians、Tago Mago、3 Feet High and Rising、Music Has the Right to Children、Cosmo's Factory、Melody Nelson、So、Heaven or Las Vegas。
- **異端補 44 張**：Napalm Death《Scum》、Gorguts《Obscura》、Penderecki《Threnody》、Lucier《I Am Sitting in a Room》、Yoko Ono／Plastic Ono Band、Last Exit、Painkiller、Prurient、Pharmakon、Wolf Eyes《Burned Mind》、Khanate、不失者、阿部薫、Incapacitants《Quietus》、Maurizio Bianchi 等（全表 `decisions-q2.json`）。
- **流亡補 47 張**：한대수《고무신》、김두수《자유혼》、高柳昌行《Eclipse／侵蝕》、のいづんずり《抱擁》、灰野敬二《滲有無》、Keith Tippett's Ark、Black Artists Group、Harry Roesli 等。

## 2. 全池等級分布（22,507 張，總數不變）

| | 殿堂 | 流亡 | 異端 | 傳奇 | 史詩 | 獨特 | 稀有 | 普通 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 套用前 | 171 | 232 | 54 | 467 | 1,691 | 4,069 | 6,866 | 8,957 |
| 套用後 | 170 | 254 | 85 | **424** | 1,679 | 4,072 | 6,864 | 8,959 |

三級都少於傳奇（424），金字塔成立。傳奇少 43：新頂點多半原是傳奇卡。

## 3. 寫入

| 位置 | 結果 |
|---|---|
| `seed_cards.json` | 第 9 欄 202 列。三道防呆：總筆數不變、命中＝202、逐列只動 tier（降級列無作曲家連尾端 null 去掉、長 7；升級列補到 8 欄再加 tier）。重跑 0 變動。 |
| manifest | 根目錄＋`batch-progress/add-*/` 副本 67 檔、135 筆（202 張中有 manifest 的 107 張）。`apexAssessment` 改新判定（`source` manual:apex-rebalance-20261103、舊判定存 `previous`、升級卡證據用決定清單的 evidence）、`rarity` 依公式、`published.seedCards／apexPool` 跟 tier 翻轉。三軸與 seed 一致（0 漂移）、未動。重跑 0 變動。 |
| `card_catalog` | 推 **202／202、失敗 0**：升級 127 寫 `tier`＋`apex:true`；降級 75 刪 `tier`／`apex`、補 `seed:true`；`rarity` 一併寫。整份重列 22,797 文件：202 張 0 不符；**全池 seed 第 9 欄 ↔ catalog tier 0 不符**（重列時發現既有落差 1 筆：モア《モア》seed 是流亡、catalog 沒 tier，已補）。抽 15 張讀回 15/15。 |
| 新手禮 `WELCOME_HALL_ALBUMS` | 18 張全數仍是殿堂（每位藝人都是留下的那張），**0 張要換**。 |
| `NEOCLASSIC_LIST`（index／battle／roguelike） | Dark Side of the Moon、Kind of Blue 仍是殿堂，不用換。 |
| 其他寫死王牌 | `battle.html` 備援 `ACES`：The Beatles《Revolver》（降級）→《Abbey Road》。`roguelike.html` 教學「accessibility」關王牌：Swans《Cop》（降級）→《Filth》。其餘（OK Computer、Dada、Deerfield、Pulse Demon、Metal Machine Music、Jemeel Moondoc）仍是現役。 |
| 店內印刷卡 | 在售 116 張無 tier 變動；A6／A7／A7-A4 重出 0 差異，不用重印。 |

## 4. published gate

跑本次改到的根目錄 manifest 54 份（`--published`，3,351 張）：共 1,109 個 error，**與本次套用相關的類別 0 error**——tier、卡池列（seed／王牌入口）、card_catalog tier／rarity、pearl listeners 全過。

- 第一輪抓到 4 張新流亡（한대수《고무신》、김두수《자유혼》、Barney Wilen《Zodiac》、浜瀬元彦《Reminiscence》）manifest `ratings.listeners` 是 null，gate 要求整數 → 補 Q2 從 worker 取回的值（55／148／191／15），重跑通過。
- `album_overrides.tier 不一致` 2 張（不失者《不失者 (Double Live)》、零與聲音解放組織《Z.S.L.O.》）：已有 override 文件、等本機同步（第 5 節第 1 項），預期中。
- 其餘全是既有類別：`/album-desc` 與 manifest 不一致（簡介改寫後沒回寫 manifest，佔絕大多數）、`card_catalog.coverUrl` 不一致、已不在卡池的舊 manifest 列（Ghost、崔健、窦唯、Air、Wings 等）、John Coltrane Quartet《Ballads》（manifest 藝人名與卡池 `John Coltrane` 不同的舊列）、封面 HTTP 500／404。與本次無關，沒順手修。
- 日誌：`publish-stage/gates-apex-rebal/`（不進版控）。

## 5. 待本機處理

1. **`album_overrides.tier`**（管理員集合，雲端寫不了）：清單 `album-overrides-tier.json`（`publish-stage/apex-rebalance-20261103/` 也有一份）——**要設 127、要清 75**。合併部署後到後台「頂級牌管理」按「⇄ 依卡池同步頂點旗標」（以 seed 第 9 欄為準，含 apex_pool），可重按。《台客的復仇》也一併被同步。
2. **玩家收藏**：與方案 C 同一問題（`audit-20261102/REPORT.md` §5）——唱片櫃與對戰先讀卡匣旗標，降級的 75 張老玩家手上仍顯示頂點；升級的 127 張要等第 1 項同步後才生效。玩家資料沒動，仍待店主選 1／2／3。
3. 方案 C 留下、仍未處理的：Beatles White Album 池中重複兩筆（`The Beatles` 與 `The Beatles (White Album)`，兩筆本次都降為一般卡），待另案合併。
