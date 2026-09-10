# c-96 交接（2026-09-05）：靈魂／放克／嘻哈目錄深度，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主 2026-09-05「接力做完十批」的一批。`lineType: 廣度`——
**把已經在池裡、卻只有一兩張的正典藝人補到該有的深度。**

**45 張、27 位藝人（掛名數）、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID、
合輯 0 張。年份 1959–2022。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 嘻哈正典目錄深度 | 20 |
| b | 靈魂與放克目錄深度 | 25 |

**逐位**：JAY-Z 4，Jill Scott／Dusty Springfield／Martha Reeves & the Vandellas 各 3，
Raekwon／GZA／Bone Thugs-n-Harmony／Lil' Kim／The Miracles／Labelle／Gil Scott-Heron／
Jerry Butler／Boyz II Men 各 2，其餘各 1（含 Rufus 的三種掛名形態）。

**策展層實掃後的三處「補不了是因為目錄已滿，不是查無」**：Dr. Dre（127 個 RG 全列，
正規專輯就是池中那 3 張）、Madvillain（只有 1 張）、Lauryn Hill（除首作外全是 Live／Compilation）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **45/45（100%）** | `c96/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c96-out-{1,2}.json` |
| 5. 固定試聽 | **40/45（89%）**，命中 `us 38｜gb 2` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**五張確認 Apple 上真的沒有**（十個店面的藝人目錄都掃過）：
GZA《Words From the Genius》（維基記兩版皆絕版）、Black Star《No Fear of Time》（Luminary 平台獨家）、
Frank Ocean《Endless》、Gil Scott-Heron & Brian Jackson《The First Minute of a New Day》、
Jerry Butler《He Will Break Your Heart》。

## 三、**這批是第 166 條的發源地：Apple 的 `search` 端點對嘻哈盤系統性騙人**

c-96 策展層回報「Apple `search` 十筆有九筆只回 cleaned」。主線實測複驗，**比回報的還糟**：

| 卡 | `search` 回什麼 | 藝人頁 `lookup` 回什麼 |
|---|---|---|
| N.W.A《Straight Outta Compton》 | 只有 cleaned（13 軌） | **explicit，同 13 軌** |
| JAY-Z《The Blueprint》 | 三張 Blueprint 全是 cleaned | 三張都有 explicit |
| **GZA《Liquid Swords》** | **根本查不到**，回的是《Legend of the Liquid Sword》——**另一張碟** | 13 軌 explicit 好端端地在 |
| B.I.G.《Life After Death》 | 前幾筆全是**別的藝人**的同名碟 | — |

**這就是 `audits/cleaned-previews-hiphop.md` 那 273 張的成因。**
`probe-previews.mjs` 已加兩道藝人頁補救（cleaned 時找同名同軌數的 explicit 雙胞胎；
search 落空時撈整份藝人目錄）。**本批 40 張 ready 裡有 12 張是這兩道換來的**
（6 張本來會拿到淨化版、6 張本來會判查無）；同日跑的 c-93 只救回 1 張，
**證實這個病是嘻哈盤特有的**。

**研究層再逐張覆核，又抓到三張要換、三張要推翻**：

- **Raekwon《Only Built 4 Cuban Linx... Pt. II》配到 1995 年的第一集**（jp、レイクウォン、18 軌、
  yearDrift 14）——**第 168 條就是這張立的**（卷號被子字串比對吃掉，羅馬數字讓「數字殘餘」那道測不到）。
  改綁 us 716639724：24 軌 explicit，**前 22 軌與 MB 原盤逐項相同、末兩軌是 iTunes bonus**。
  **⚠ 軌數以 22 為準。**
- **《Born Again》** 1782256137(cleaned) → **78989263**（18 軌 explicit）。
- **《Iron Flag》** 1762519588(cleaned,12) → **1762519766**（13 軌 explicit）。
  **多的那一軌不是 Deluxe**——是原盤標題曲尾巴的隱藏曲〈Da Glock〉被 Apple 拆出來，維基有直述。
- 推翻 unavailable 三張：**BTNHResurrection**（Apple 盤名全大寫）、
  **Ultramagnetic MC's《The Four Horsemen》**（掛名撇號，artistId 145935593 要帶撇號才搜得到）、
  **Jill Scott《The Light of the Sun》／Gil Scott-Heron《Small Talk》／
  Martha Reeves & the Vandellas《Come and Get These Memories》**
  （最後這張 Apple 條目**少一個 and**，作《Come Get These Memories》）。

**⚠ 一件裁定**：**Bone Thugs-n-Harmony《The Art of War》在 Apple 上被拆成
World War 1（13 軌）與 World War 2（15 軌）兩張**，剛好等於 MB CD 版的兩片。
**主線裁定：試聽取 WW1（1159475968），但該 collectionId 不得作為軌數、曲目或封面的來源**
——原盤是兩片共 28 軌，封面走 CAA。**另一半 1170658006 已記在 `previews.json` 的 note 裡**，
上架時若要補第二片的曲目可直接用。

**三筆旗標修正**：Souls of Mischief《No Man's Land》的 `yearDrift` 5 是假警報（Apple 日期欄寫錯，
**年份寫 1995**）；Snoop Dogg《Tha Last Meal》的 Apple `trackCount` 欄寫 20、**實際 19**；
Grandmaster Flash & The Furious Five《On the Strength》**Apple 10 軌／MB 11 軌**，
缺的那軌是重發時被略去的 bonus track——**寫軌數必須指明是哪一版**。

## 四、⚠ 上架前的數字，錯一個就是硬傷

| 卡 | 正確的 | 不能寫成 |
|---|---|---|
| Raekwon《OB4CL Pt. II》 | 軌數 **22** | 24；**絕不可與 1995 年第一集混寫** |
| Bone Thugs《The Art of War》 | MB CD 版**兩片共 28 軌** | Apple 拆成兩半的軌數 |
| Snoop Dogg《Tha Last Meal》 | 軌數 **19**、Billboard 200 **第 4** | 20；專輯榜冠軍 |
| Grandmaster Flash《On the Strength》 | 指明版本（原始 CD 11／數位 10） | 單一軌數 |
| Souls of Mischief《No Man's Land》 | 年份 **1995** | Apple 欄位的 1990 |
| Wu-Tang《Iron Flag》 | 銷量**第二低** | 最低 |
| Lil' Kim《La Bella Mafia》 | 〈Magic Stick〉Hot 100 **第 2** | 單曲冠軍 |
| Jill Scott《The Real Thing》 | Billboard 200 **第 4**、R&B/Hip-Hop 榜 **第 2** | 「美國專輯榜第二」 |
| Jill Scott《The Light of the Sun》 | 「**第一張**美國冠軍專輯」 | 「生涯**唯一**冠軍」 |
| Rufus《Masterjam》 | R&B 榜**冠軍**、流行榜**第 14** | 「美國專輯榜前十」 |
| Boyz II Men《Evolution》 | **第四張**；製作 Jam & Lewis、Babyface | 第三張；Sean Combs |
| Boyz II Men《NMSW》 | **第五張**；Universal 時期唯一一張；McCary **2003 年**離團 | 第四張；「與 Motown 分手前最後一張」；緊接著退團 |
| 《Born Again》 | **身後合輯** | 「第三張專輯」「未發表 vocal 母帶」 |
| 〈For Your Precious Love〉 | **Brooks 兄弟與 Butler** | Curtis Mayfield |

**兩處與當事人／來源相反**：Gil Scott-Heron《Small Talk at 125th and Lenox》
**不是在夜店當著聽眾錄的**（Scott-Heron 本人反駁，說是錄音室加折疊椅——正文已兩說並陳）；
Jerry Butler《Jerry Butler, Esq.》的「離團後首張個人專輯」是**時序推論、無直述來源**，
**主線裁定不採用**（年份取 MB 的 1959，寫在 `c96/rulings.md` 第 12 條）。

## 五、掛名：15 張與 MB 的 artist-credit 不一致，**都是同一組人的不同寫法**

**a 組**：JAY-Z（MB `Jay‐Z`／4:44 作 `JAY‐Z`，皆 U+2010；Apple 作 `JAŸ-Z`）、
GZA（《Words From the Genius》MB 掛 **The Genius**、《Beneath the Surface》掛 `GZA/Genius`）、
`Lil’ Kim`／`Ultramagnetic MC’s`（U+2019）、`Bone Thugs‐n‐Harmony`／`Wu‐Tang Clan`（U+2010）、`N.W.A.`。

**b 組**：Special Occasion（and／&）、Labelle ×2（MB 作 LaBelle）、
Gil Scott-Heron ×3（U+2010；《First Minute》MB 另含「& The Midnight Band」）、
Masterjam（MB 作「Rufus & Chaka」無 Khan）、Come and Get These Memories
（MB 作「Martha and the Vandellas」、Apple 又少一個 and）。

**正文一律照卡片的寫法，未拆成兩組人。**

## 六、機器 QA 結果

```
node desc-tools/qa-batch.mjs research c96        key 與卡單完全一致 ✓｜全部通過 ✓
node desc-tools/qa-batch.mjs hooks c96           全部通過 ✓
node desc-tools/chk-hook-crossgroup.mjs c96      2 組｜45 張｜hook 加權 19.5–36.5｜note 302–350｜✓ 全部通過
node desc-tools/qa-batch.mjs out c96             out-1｜20 張｜字數 221–235｜>260: 0
                                                 out-2｜25 張｜字數 177–235｜>260: 0
                                                 thin 卡 1 張，全部 ≤180 ✓
                                                 out 合計 45 張，與卡單相符 ✓
                                                 **未具名出處 0 盞**
qa-check-research（兩檔各一次）                    各 0 標記
fix-spacing（兩檔各一次）                           待補 0
node batch-progress/c96/chk-prop.mjs a b         45 張｜27 位｜標記 0（跨批撞卡 0）
```

## 七、交給本機的線上資料問題

**池中一組重複建檔**（字串去重看不見，掛名與盤名互換）：
`Mos Def & Talib Kweli — Black Star` 與 `Black Star — Mos Def & Talib Kweli Are Black Star`
**是同一張 1998 年首作**。策展層未動，交本機處理。

## 八、本機還要做的事

1. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。**封面滿版，沒有掃圖工作。**
2. **合併 Black Star 那組重複建檔**（第七節）。
3. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
4. **上架前逐張讀 `previews.json` 的 `note`**——40 張 ready 裡有 15 張帶換綁說明、
   軌數限制或旗標修正，第三、四節的每一條都在裡面。
5. **`audits/cleaned-previews-hiphop.md` 那 273 張可以回頭重跑了**——
   成因已定位（第 166 條），`probe-previews.mjs` 的兩道藝人頁補救對這一族有效。
6. **`node scripts/build-genre-tree.mjs --write`**（第 147 條）——**排在 seed 上架之後**。
