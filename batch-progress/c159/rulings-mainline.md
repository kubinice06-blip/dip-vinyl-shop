# c-159 主線裁定（探測層）

號段承接 c-160 之後另行編定；本檔的條號用 **1610 系列**（c-159 b 組留白的 1610–1619）。

## 第 1610 條（主線，**重要；本線至今最大的一個系統性 bug，兩層**）：**探測層把 c-159 的 12／34 判成 unavailable，兩層原因都不是「碟不存在」**

### 第一層：`queryAlias` 是散文，被整串當成查詢字串送進 Apple `search`

Blue Note 1985 年後線的策展層把 `queryAlias` 寫成**多個別名用「；」隔開、每個別名後面再跟括號說明**，例如
`Wynton Marsalis《The Magic Hour》（Apple 與 Billboard 榜欄形）；The Magic Hour（2006 Blue Note CD，8 軌）；ウィントン・マルサリス`。
`termsFor()` 把**整串**當成一個查詢字串，於是四個 term 裡有三個是垃圾，**只有第一個 `${artist} ${album}` 是乾淨的**。
掛名帶了「Quartet」之類的擴充形時那一個也會落空——**整張因此判成 unavailable，
而 `tried` 記的是乾淨的 `us:0→0`，與「這張碟真的不在店面」長得一模一樣。**

**→ 已修 `batch-progress/probe/match-lib.mjs`**：新增 `aliasParts()`，先把 alias 拆成一個個乾淨的候選字串
（split `；`／`;`、去掉全半形括號說明、去掉書名號、破折號連接的掛名＋盤名拆開），再組 term。
**重探 c-159 之後救回 2 張**（Wynton Marsalis《The Magic Hour》、Joe Lovano《I'm All for You》）。

### 第二層：`titleOk` 的長度差上限擋掉「副標的有無」這一整類

`titleOk` 最後一關是 `(a.includes(b) || b.includes(a)) && Math.abs(a.length - b.length) <= 8`。
**主線實查三張，全部是同一張碟、逐軌都回得到 preview，卻全被這一關擋掉**：

| 卡片盤名 | Apple 盤名 | 為什麼擋掉 |
| --- | --- | --- |
| Remember: A Tribute to Wes Montgomery | Remember - Tribute to Wes Montgomery | **兩邊互不包含**（冒號版多一個 `A`），長度只差 1 也過不了 `includes` |
| African Tarantella: Dances With Duke | African Tarantella | 長度差 **17** |
| Do the Boomerang | Do the Boomerang: The Music of Junior Walker | 長度差 **23** |

⚠ **主線寫了一條「副標基底相同就放行」的分支，測過之後決定撤回，不進 repo。** 理由：
**那條分支會讓《Live in Chicago》配到《Live in Chicago - Out Takes》**
——**正是第 1433 條那張、我在 c-156 花了一輪才抓出來的錯碟**（兩張卡共用同一個 `collectionId`，
同時觸犯第 1067 與第 646 條）。
**「…: The Music of Junior Walker」（同一張碟）與「… - Out Takes」（不同的碟）在字面上沒有任何可靠的分界**，
卷號閘（`volToken`）也擋不到。

**→ 裁定：`titleOk` 維持原狀。副標這一類改由「未 ready 名單的人工覆核」處理**
——那一步本來就要逐筆比對盤名、年份、軌數與 `copyright`（第 1560-C 條），**放在那裡是對的位置。**
**這是「放寬比對」與「錯碟」的取捨：錯碟會靜靜地把錯的試聽上架，漏抓只是少一個試聽，而且救得回來。**

## 第 1611 條（主線）：**c-159 串流最終 ready 27／34**

- 探測層原判 **22／34**（12 張 unavailable）。
- **第 1610 條第一層修好後重探，救回 2 張**：Wynton Marsalis《The Magic Hour》、Joe Lovano《I'm All for You》。
- **主線逐筆覆核未 ready 名單，再救回 3 張**（三張都逐軌確認有 `previewUrl`、且卡池無第二張卡用同一個 id）：
  - **Pat Martino《Remember: A Tribute to Wes Montgomery》→ `723654607`**（us，10 軌全有 preview）。
  - **Stefon Harris《African Tarantella: Dances With Duke》→ `715742698`**（ca，8 軌全有 preview；
    ⚠ **MB 轄下兩筆 release 是 8 軌與 9 軌，與 Apple 的 8 軌相符**，第 1067 條的錯碟關已過）。
  - **Don Byron《Do the Boomerang》→ `715758776`**（us，12 軌全有 preview，第 3 軌就是同名曲）。
- **仍未 ready 7 張**，交研究層再查（**十六個店面 × 三種查詢字串已全跑過，建議改走 UPC 與藝人目錄**）：
  Anita Baker《My Everything》／Jukka Perko《Kuunnelmia》／
  Thelonious Monk Quartet with John Coltrane《At Carnegie Hall》／Tania Maria《Intimidade》／
  Trio Töykeät《Wake》／Jane Bunnett《Radio Guantánamo…》／Al Green《Everything's OK》。
  ⚠ **Anita Baker 與 Al Green 兩張是美國主流廠牌盤、藝人目錄在 Apple 上很完整，卻查不到這兩張專輯**
  ——**這個形狀值得研究層特別追**（可能是版權下架，也可能是盤名在店面被改寫）。
  ⚠ **Perko《Kuunnelmia》與 Töykeät《Wake》是芬蘭盤**——**照第 1560-G 條，要多試一組英文盤名。**

## 第 1612 條（主線）：**c-159 封面 CAA 有圖 30／34，4 張要研究層找替代來源**

`fix-rgmbid` 原本就對 34、修正 0、無 RG 0。**CAA 有圖 30／34、探測錯誤 0。**
`recover-unavailable` 的候選寫在 `batch-progress/c159/apple-candidates.md`
（⚠ **是候選不是結論，且是在第 1610 條修好之前跑的，名單會偏多**）。
