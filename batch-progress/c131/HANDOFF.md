# c-131 交接（2026-09-15）：爵士深掘第一批，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主 2026-09-15「**廣度應該足了 研究深度 再深挖爵士 還有好多都沒有建檔 秋吉敏子竟然都沒有**」。
**從這批起是深掘線**（`lineType: 深掘`）：問的不是「這個場景池中有沒有」，而是「**這位名家的目錄補齊了沒**」。

**45 張、27 位掛名、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID、全部 Album（零 EP、零合輯）。年份 1954–1994。**

| 組 | 場景 | 張 |
|---|---|---:|
| a | 秋吉敏子全目錄（13）＋ 日本爵士第一世代（10） | 23 |
| b | 池中爵士名家的目錄深度 | 22 |

**a 組是店主點名的那一位**：實掃前她自己名下**零張**，池中唯一一筆是
`Toshiko Akiyoshi-Lew Tabackin Big Band`（英文字串，1973 年後的大樂團）。
這批把她 1954–1985 的 trio／quartet／quintet／solo 補了 13 張，四種編制掛名分立。
第一世代十位（本田竹広、白木秀雄、宮沢昭、ジョージ大塚、鈴木宏昌、高橋達也、石川晶、猪俣猛、原信夫、稲垣次郎）**各補一張、池中原本全是零**。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **45/45，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **44 full／1 partial**，out-1 176–238／out-2 190–226 |
| 封面 | **44/45**（缺 Ahmad Jamal《at the Blackhawk》） |
| 固定試聽／無來源狀態 | **38/45**（探測 21 ＋ 研究層第三種查法 **14**＋修正 1），無來源 **7 張** |
| §5.5／§5.6 例外欄位 | **不適用**——45 張全是純 Album |
| published gate | 本機端 |

**驗證**：`qa-batch out c131` 45 張與卡單相符、**全部通過**；`chk-hook-crossgroup c131` 全過
（hook 加權 24–35.5、note 241–350）；`fix-spacing --field desc` 兩檔待補 0；`chk-prop` 標記 0。
主線複驗：45 張 `desc` 開頭與 `hook` 逐字相符、四位中文數字年 0、資料庫與商店名 0、
**簡體 0**、跨組開頭四字零重複、**被擋下的五句「第一／唯一」逐句 grep 零命中**。

## 三、⚠ 年份：改了五張，兩張兩說

**改卡單**（裁定 366／367，全是第 364 條那三種失真）：

| 盤 | 原 | 改 | 依據 |
|---|---:|---:|---|
| Ahmad Jamal《at the Blackhawk》 | 1961 | **1962** | Argo LP-703 主版本 1962-11；MB 的 1961 出自一筆廠牌空白的荷蘭 release |
| Hank Mobley《Another Workout》 | 1986 | **1985** | 美日加法版全 1985 |
| Don Cherry《Symphony for Improvisers》 | 1966 | **1967** | 主版本 1967-08、無 1966 壓片；MB 把錄音日當發行年 |
| Chet Baker & Art Pepper《Playboys》 | 1956 | **1958** | 主線加查 MB release 列表：1956 那筆登記「World Pacific **PJ-1234**」，**廠名與 catno 前綴矛盾**（World Pacific 1958 才存在），1956 是錄音年 |
| 《Meditation》catno | VC-7513 | **VC-6001** | VC-7513 是 1976 再發編號 |

**兩說維持、正文不斷言精確月**：McCoy Tyner《Expansions》1969、Archie Shepp《The Magic of Ju-Ju》1967。

## 四、⚠ 研究層擋下策展層的「第一／唯一」句（五處）

Toshiko's Piano「日本樂手在美廠第一張」、Candid「唯一日本樂手領銜作」、
Strayhorn「唯一單一作曲家專輯」、TBM「第一張」、Sound Ltd.「系列頭號」——**全部無來源**。
另擋下：《Dedications》受獻者不是八位鋼琴手、**Inner City IC 6046 是《Dedications (II)》的美版不是第一集的**、
《Salaam Salaam》是鋼琴三重奏不是電鋼琴四重奏、高橋達也 1964 入團 1966 才接任團長、
George Wein 那張錄音地是紐約不是波士頓、Top of the Gate 是七月不是秋。

## 五、⚠ 這批在下一批被推翻的一條：CAA 404 當排除理由

**第 356 條 F 用 `CAA 404` 把一批碟擋在名額外**（松本英彦整位 0 張、宮沢昭《山女魚》、
ジョージ大塚兩張、原信夫五張、白木秀雄三張）。
**c-132 第 382 條查明這個門檻不成立**：`ALBUM_ONBOARDING.md` §4 在 2026-09-10 已核定
「釘住 MBID 的卡也適用 `apple-verified-collection`」並新增 discogs 來源。
**那 15 張 rgMbid 全在第 356 條 F 裡，已排進 c-133／c-134 回頭補。**
另一個新形狀：**同一張碟的兩個 RG，CAA 狀態常常相反**——補圖前先查有沒有重複 RG。

## 六、缺的

- **封面 1 張**：Ahmad Jamal《at the Blackhawk》（MB 兩筆 release 都無圖；
  Discogs master 310249 有 Argo 原盤封面、Apple 1442841156 有數位封面，寫在研究 notes）。
- **試聽 7 張無來源**：秋吉敏子トリオ四張（Dedications、Dedications (II)、Toshiko Plays Billy Strayhorn、Time Stream）、
  秋吉敏子カルテット《Meditation》、高橋達也《Got The Spirit》、Ahmad Jamal《Jamal Plays Jamal》。
  **DAN／Discomate／EASTWORLD／TBM 的目錄在店面整批是空的**（第 359 條），不是查法問題。
- **《ウガンダ》的試聽附條件**：官方版 7 軌（前三首各拆 I/II），與卡單 4 軌秒數合計相符——
  **正文按曲名配、不寫軌數**。本機端若要求軌數一致要另判。

## 七、下一批

- **c-132／c-133／c-134 已排**（日本第一世代各補到 7–8 張，見 `CURATION-BRIEF-c132-c134.md`）。
- **b 組那 25 位名家的實掃表在第 360 條**，池中 5–23 張、MB 目錄遠多於此，**還能再開好幾批**。
- **既有卡的五處錯誤留給本機**（第 362 條）：Spiritual Unity 重複卡、Waltz for Debby 年份、
  Heliocentric Vol.1 年份 1992（應 1965）、Extensions 年份、Shepp 的 `&`／`and` 掛名分裂。
