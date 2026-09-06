# c-114 交接（2026-09-06）：美國福音 Nashboro §1 補遺，40 張走完雲端段

**這批可以接本機上傳了，但封面幾乎全部要本機處理**（見第二節）。

## 一、這批是什麼

`EXPANSION-PLAN-c89plus.md` E 線，`lineType: 廣度`。**這是 §1 人工身分批。**

**40 張、17 位掛名、40 張全部 §1（`rgMbid` 空、`identitySource: "manual"`）、
零跨批撞卡。年份 1960–1980。曲風全部 `soul`（34 張 `["soul"]`、6 張 `["soul","blues"]`）。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | Nashboro 本家 1960–68 | 20 |
| b | 後期／Creed／Gospel Roots／ABC Peacock 1968–80 | 20 |

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **39 張 `manual-scan` ＋ 1 張 `apple-verified-collection`** ⚠ | `c114/prop-{a,b}.json` 的 `coverSourceHint` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **40 張全部寫完並過機器 QA** | `desc-tools/batches/output/c114-out-{1,2}.json` |
| 5. 固定試聽 | **7/40（18%）**，全部命中 `us` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**⚠ 封面是這批最大的工作量**：39 張要從 Discogs 掃圖（**40 張的 Discogs 條目都附實體掃圖，
27 張有 4 張圖**）。策展層已逐張把掃圖數記在 `risk` 欄。
**唯一的 `apple-verified-collection` 原本有兩張，研究層撤掉一張**（見第五節）。

**⚠ 試聽 7/40 不是探測失誤。** 福音 §1 線在 Apple 上幾乎不存在；
回撈只找到 3 個候選，研究層又查一輪、**駁回 4 個零軌重合的候選**、補回 3 個。

**簡介的機器 QA**：`qa-batch.mjs out c114` 全過
（out-1 20 張 139–180、out-2 20 張 161–239、thin 卡 3 張全部 ≤180、>260 零筆）；
`fix-spacing` 兩檔待補 0；`qa-batch research/hooks c114` 與 `chk-hook-crossgroup c114` 皆 0 標記
（hook 加權 15.5–28、note 224–350）。
主線一次性複驗：**40 張 `desc` 開頭與 `hook` 逐字相符**、
**四位中文數字年 0 筆**（第 243 條的體例檢查）；
兩支寫作層各自掃過資料庫名與榜單評分，**兩類都是 0 次**，
並各自確認**沒有任何一筆寫進 `note`／`facts` 以外的內容**。

## 三、§1 舉證：**第二來源全靠 bsnpubs**（第 202 條）

**Both Sides Now Publications 的廠牌專輯目錄**三頁（Nashboro/Crescent/Creed、Gospel Roots、Peacock）
——逐張列編號、盤名、掛名、年份與完整曲目。**40 張全靠它，沒有一張只靠 Discogs。**

**⚠ 這三個來源不要再試**（策展層已實測）：**45worlds／45cat 整站 Cloudflare 403**、
**Library of Congress 的 `fo=json` 回非 JSON**、**Internet Archive 只有 78 轉單面**。

**§1 資格覆核不是抽驗**：研究層把 **17 位藝人的 22 個 MB 實體全部 browse 過**
（含 Dorothy Love Coates 三實體、Alex Bradford 四實體、Troy Ramey 個人／團體），
**40 張全部確認查無**。
**裁定 204 實測復現**：`The Brooklyn All Stars` **分寫與帶連字號的 score 100 都回サザンオールスターズ**。

## 四、⚠ 年份：**11 張拿不到兩票一致**（比策展層記的多）

策展層的分布是「一致 23／帶問號 7／無年份 9／不同 1」，
**研究層修正為：兩來源主張不同年的有 2 張，不是 1 張**——
除 Bradford 7046 外，**Mitty Collier GR-5020 廠牌目錄記 [1977]、原盤記 1978**，
被策展層歸進「一致」那 23 張。另 7148 與 7146 帶問號且差一年；7140 的第三來源（傳記）與兩票直接矛盾。

**簡介這 11 張一律不寫確切年份**（寫作層的做法是改寫成「廠牌專輯編號的第三張」這類）。
**⚠ 裁定 205**：福音線的同名先行 7 吋單曲是常態（本批五組），**年份一律取 LP**。

## 五、⚠ 一筆舉證指錯碟（第 235 條的第二個實例）

**Supreme Angels《Shame On You》的第三條 Apple 舉證 `1443663637` 是 1996 年生涯精選**，
14 軌只有 2 軌與 1974 原盤重合——策展層寫的「14 軌＝原盤 10＋同期單曲 4」**不成立**。
**主線已把 `coverSourceHint` 由 `apple-verified-collection` 改回 `manual-scan`。**
另一張 WMFS `453948545` 逐軌核過，成立。

**⚠ 三筆新補試聽的線上版都是後世合輯**（Morgan Babb `1443476493` 21 軌／
The Consolers `933939727` 37 軌／The Swanee Quintet `1443999129` 24 軌）
——**簡介只引原盤的軌數與曲序**。

## 六、策展層被推翻的 40 處（29 張卡），硬錯 14 項

**目錄數量全錯 5 處**
| 卡／藝人 | 策展層寫的 | 實際 |
|---|---|---|
| Brooklyn Allstars 7092 | 第三張也是最後一張 | **第四張正規 LP，之後還有兩張** |
| Brother Joe May | 六張 LP | **九張** |
| Edna Gallmon Cooke | 生前十張＋兩張紀念盤 | **目錄十行中兩行就是紀念盤，生前六張** |
| Dorothy Love Coates | 三張 | **六張** |
| Troy Ramey | 五張 | **六張** |

**傳記事實錯 5 處**：Supreme Angels 起源地是 **Milwaukee**（不是 Rock Hill）；
**「1974 年起改掛 Slim &」不成立——LP-7110 就改了**；Gospel Keynotes **1964** 成軍（不是 1963）；
Sister Lucille Pope 傳記記 **1960 年代**（不是「1949 成軍／二十五週年」）；
Harold Boggs「Ohio 歌手兼鋼琴手」無來源，**可查證的是「他失明」**。

## 七、字數的偏差方向

**兩組都是上限吃緊**（第 242 條）：writer-1 初稿超過 180 的有 9 張、掉到 120 以下 0 張；
writer-2 20 張裡 11 張超上限（full 3/5 超 240、partial 8/13 超 180），**無一張掉下限**。
**英文曲名一個吃掉 20–35 字元**，兩支的處置都是「曲名列舉整格捨去或只取三首」。
