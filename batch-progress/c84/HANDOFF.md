# c-84 交接（2026-09-04）：美國 1990 年代 lo-fi 卡帶與微廠，44 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`）。**44 張、41 位藝人、零 §1 人工身分、零跨批撞卡、
44/44 釘住 release-group MBID、合輯 1 張（過 §5.6）。**

| 組 | 場景 | 張數 | 年份 |
|---|---|---:|---|
| a | 卡帶廠與 4-track 側 | 22 | 1992–1998 |
| b | 七吋／LP 微廠側 | 22 | 1992–1996 |

**廠牌**：Simple Machines 10、Shrimper 7、Siltbreeze 6、Teenbeat 4、Harriet 4、
Slumberland 2、Ajax 2，其餘 Feel Good All Over／Holy Kiss Rex／Scat／Catsup Plate／
Omphalos／Sing, Eunuchs!／Shimmy Disc／4AD／The Bus Stop Label 各 1。
**Shrimper／Teenbeat／Simple Machines／Harriet／Siltbreeze／Slumberland 六家在本批之前池中零張。**

`fix-rgmbid` **修正 0**（依第 28 條附錄跑兩輪取聯集：兩輪失敗集合不相交，39+5 = 42+2 = 44）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **30/44（68%）**，14 張要掃圖 | `c84/caa.json`、`caa.log` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **44 張全部寫完並過機器 QA** | `desc-tools/batches/output/c84-out-{1,2}.json` |
| 5. 固定試聽 | **28/44（64%）**，命中 27 個在 `us`、1 個在 `gb` | `c84/previews.json`、`previews.log` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

## 三、這批的核心風險：**原盤是卡帶**

lo-fi 線大量作品原盤是自製卡帶。**年份照第 1 條：`year` 填該作品原始問世年，磁帶原盤即算原盤**
（不是第一次有廠牌把它變成 CD／LP 的那年）。策展層對三張採卡帶／黑膠原盤年蓋過 MB 首發日、
兩張標年份爭議，研究層逐張複核過，`yearVerified` 寫明哪個年份是哪一件事的年份。

## 四、**第 140 條最典型的一張就在這批**

**Crayon《Brick Factory》**：2014 HHBTM 版「**也是 14 軌**」，
卻**抽掉〈Jenny Don't Be Sad〉換上〈All the Stars〉**，MB 那筆底下還多掛一片 21 軌附碟。
**軌數相同不代表曲目相同**——只比軌數會直接放行。

**軌數兩說、兩個都不填（第 141 條）**：
- **Lorelei《Everyone Must Touch the Stove》**：同年同廠牌**同編號 SLR 44**，
  **黑膠 8 軌／CD 10 軌**，兩庫都同時記著兩個數字 → **只能按載體分開講、不得給總數**。
- 另四張同形（Versus 12／11、Tsunami 13／12、Air Miami 12／13、Danielle Howle 18／16）
  ——寫作層一律按載體寫進 hook 或 note。

**兩張補標 `expandedReissue`**：Linda Smith《Nothing Else Matters》原盤 12（Apple 13）、
East River Pipe《Shining Hours in a Can》原盤 15（Apple 17）。

## 五、探測層被研究層補正兩處年份

| 卡 | 探測層 | 實際 |
|---|---|---|
| Tullycraft《Old Traditions, New Standards》 | ready、`yearDrift: 4` | collectionId 299714823 是 **2000 Darla 再發**，逐軌與 1996 原盤同序 → **試聽與軌數（12）可用、年份不可用**。`yearDrift` 標對了 |
| Allen Clapp《One Hundred Percent Chance of Rain》 | ready、**沒標 `yearDrift`** | collectionId 1511658028 的 copyright 是 **℗ 2020 Mystery Lawn Music** ——**是 2020 數位再發**。**探測層漏標** |

**Allen Clapp 那張的年份另有實質爭議，而爭議的形狀值得記**：
Discogs 的 CD 與 LP 條目與 MB 都記 **1993**；AllMusic 記 1994，
**而英文維基那句的引註正是同一個 AllMusic 頁——不是獨立來源。**
**「兩個來源都說 1994」其實是同一個來源說了兩次。**
裁定：卡單 1993 不動、行文只能寫到年、必須帶出處。

**另兩處 Apple 年份欄不可採**：Strapping Fieldhands《Discus》的 1993、
Simon Joyner 那筆的 ℗ BB*ISLAND（Simon Joyner 另有**兩個資料庫曲序不同**，行文只點首尾兩軌）。

## 六、兩張 `unavailable` 是真的沒有——**而排除的過程本身有價值**

**Crayon《Brick Factory》**：兩條路徑——純 ASCII 掛名＋盤名重搜、原盤獨有曲名反查——皆空。
**Henry's Dress《Bust 'em Green》**：**這張正是同形異碼的形狀**（MB 用 U+2019、卡單用 ASCII 直撇號），
但拆到純 ASCII 重搜 us／gb／jp／fr 仍是 0；掛名反查找到的唯一同名者是
2026 年上架的同名十吋 EP。**這次不是編碼問題。**
——**「查過而且確認沒有」與「沒查」在資料上長得一樣，但前者才是結論。**

## 七、下游層層攔下的東西

**hook 層（兩組合計十七則，本線單組最多的一次在 a 組：十四則）**，形狀分六類：
- **數錯**：「同一個曲名有三種拼法」實為兩種；「原盤條目上一個樂手名字都沒有」其實曲目表上就有兩個掛名。
- **整個反了**：「十二首裡有八首在同一間錄音室從頭做完」——**實為四首同地、八首分開**。
- **把團內的人算成團外**：「十四軌裡只有五軌有團外的掛名」——**其中一軌掛的是團內成員，團外實為四軌**。
- **算術**（第 64／112 條）：「二十九年後」「三年後」「十五年後」「二十首四十二分鐘」（實為 42 分 33 秒）。
- **混版**：把黑膠 10 軌與 2004 年 CDr 的 8 個索引的曲長混在同一句。
- **無法逐項驗證**：「十六首裡有八首請了客人」——facts 只列得出 11 條逐軌掛名。

另有**三則誤讀來源**：Discogs **圖片的拍攝說明**被讀成唱片設計；**欄位裡的底線**被讀成
「有一首沒有名字」；**內頁本來就印了 credits** 卻寫成「一張沒有任何掛名的唱片」。
以及一則「四種封面配色」——**原文是 “a variety of … including the following”，列了四種不等於只有四種。**

**上游兩處計數錯誤主線已回頭修**（第 142 條：寫作層會原樣讀到 `researchNotes`，只在 note 下禁令擋不住）：
Tullycraft 的錄混分佈整個反了（`hookCandidates`）、Retsin 把團內的人算成團外（`facts` 與 `sound`）。

**寫作層**：a 組又抓到三處（The Yips 的「十三軌落在 1:47–3:26」實為 **10 軌**、
Linda Smith 的「其餘七軌沒有第二個人」實為 **8**、Tower Recordings 避開標題列造成的 14）；
b 組回數 22 張、**沒再抓到錯的**，並各自重數了主線修過的那兩處、**兩處都成立**。

**一處格式陷阱**：Charalambides 的 runout 原字串**含反引號**，照抄會被 `qa-check` 判成 markdown
→ 改寫成敘述、不指認出處。**b 組全批因此不逐字引任何含反引號的原字串。**

**依第 138 條讓分派閒置五處**（無來源、字數吃不下、或跨卡連結沒有來源支撐）。

## 八、機器 QA 結果

```
node desc-tools/qa-batch.mjs research c84          a 22／b 22，key 與卡單完全一致 ✓
node desc-tools/qa-batch.mjs hooks c84             全部通過 ✓
node desc-tools/chk-hook-crossgroup.mjs c84        2 組｜44 張｜hook 加權 20.5–42｜note 270–348｜✓ 全部通過
node desc-tools/qa-batch.mjs out c84               out-1｜22 張｜字數 181–238（thin 卡 181）
                                                   out-2｜22 張｜字數 215–238
                                                   合計 44 張，與卡單相符 ✓，>260: 0
qa-check-research（兩檔各一次）                      各 0 標記
fix-spacing（兩檔各一次）                             待補 0
```

**「未具名出處」四層都是零。** research 端有三處「千分位逗號」標記，
**都在禁用清單裡的引句、不會進 desc**。b 組跑第一次時亮過一盞「一份不具名的清單／統計」，
觸發字是「同一份清單說」——**那不是榜單，是 Discogs 註記欄那份逐軌錄音地點清單**，屬同形誤報；
改寫成「同一段註記接著寫」，**來源與事實一個字都沒刪**，而且依第 136 條更準確。

## 九、一處 hook 主線事後改過（三檔已同步）

**Wimp Factor 14《Ankle Deep》** 的 hook 原以「Trouser Press 那篇說」開頭，
而 `writer-base` 禁止樂評媒體名進正文。該卡**拿掉樂評後仍有廠牌頁、Spy 編號體系與 credit 欄可寫**，
**例外二的判準不成立**；且那句引的是**封裝的物理事實、不是評價**，不具名不影響它成立。
已改成「這張 CD 是裝在六乘九吋的牛皮紙信封裡出的。」，正文第二處改用「一篇署名的樂評說」，
**與其餘 43 張一致**。三檔（hooks／writer 輸入／out）已同步，四項檢查重跑全過，desc 233→220 字。

## 十、本機還要做的事

1. **掃 14 張封面**（`c84/caa.log` 的「無圖」列）。
2. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。
3. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
4. **上架前逐張讀 `previews.json` 的 `note`**——第四、五節那八張都有限定語。
5. **`node scripts/build-genre-tree.mjs --write`**（第 147 條）——**要排在 seed 上架之後**。
   **這一步雲端做不到**（重建快取要碰 KV）。
6. **清掉本批的暫存腳本**：repo 根目錄的 `add-c84b2.mjs`、`ap-c84b2.mjs`、`dg-c84b2.mjs`、
   `dgs-c84b2.mjs`、`lab-c84b2.mjs`、`mb-c84b2.mjs`；
   `desc-tools/` 下的 `dg-c84a.mjs`、`fetch-c84a.mjs`、`mb-c84a.mjs`、`build-c84a.mjs`、`ap-c84a.mjs`。
