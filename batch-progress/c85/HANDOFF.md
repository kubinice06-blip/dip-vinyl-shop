# c-85 交接（2026-09-04）：英國 lovers rock／UK roots 與 1990s dub 小廠，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`）。**45 張、43 位藝人、零 §1 人工身分、零跨批撞卡、
45/45 釘住 release-group MBID、`releaseType` 全部 Album、零合輯（無 §5.6 案例）、零例外條款。**

| 組 | 場景 | 張數 | 年份 |
|---|---|---:|---|
| a | 英國 lovers rock 與 UK roots 小廠 | 22 | 1975–1988 |
| b | 英國 1990s dub 小廠 | 23 | 1990–1998 |

**廠牌**：Burning Sounds 5、Conscious Sounds 4、Dubhead 4、Cha Cha 3、Third World 3、
Third Eye Music 3、Universal Egg 3、Ariwa 2、Studio 16 2、Ballistic Records 2、
Jah Warrior Records 2、On-U Sound 2、Jah Shaka Music 2，其餘 Body Music／Vista Sounds／
ADE.J／Special Request／Venture Records／Alpha & Omega Records／Nubian Records／
Youth Sound Records 各 1。

`fix-rgmbid` **修正 0**（原本就對 45、無 RG 0）。
**32 張帶 `queryAlias`、21 張帶 `reissuedBy`**——這條線的盤名與廠牌歸屬普遍不穩，
策展層事前就把別名與再發歸屬填好，是後面探測層命中率的主因。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **32/45（71%）**，13 張要掃圖，來源全部 CAA | `c85/caa.json`、`caa.log` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c85-out-{1,2}.json` |
| 5. 固定試聽 | **23/45（51%）**，**命中的 23 個全部在 `gb`** | `c85/previews.json`、`previews.log` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**「23 個全部命中在 gb」本身是一條可用的結論**：這是純英國線，
`probe-previews.mjs` 的 `UKB` 店面順序把 gb 排在 us 之前，
23 次命中零次落在別的店面。**線的地域與店面順序對上，命中率就是這樣來的。**

## 三、這批的核心風險：**Apple 上「找到了」幾乎都不是這張碟**

reggae／dub 的再發生態極亂。探測層 45 張裡 23 張判 ready，**研究層逐張回查後推翻或加限定的就有 11 張**——
比例之高是本線之最。形狀分五類，**每一類本機上架前都要看 `previews.json` 的 `note`**：

**（1）二合一——三張，全部沒有任何標記（第 140 條）**
- Al Campbell《Diamonds + Rainy Days》：19 軌＝原盤 10 ＋ 別張 9。**策展層已在 `risk` 預判，探測層漏標。**
- Dread & Fred《Iron Works Pt. 2》：Apple 603573327 二十軌，**第 11–20 軌正是本張 SHAKA 915 的十軌全部、曲序逐項相同**，前十軌是 1989 年 SHAKA 875《Iron Works》。
- Lidj Incorporated Meets Sound Iration《Dub Liberation》：Apple 419657355 二十軌，**第 11–20 軌是本張十軌全部**（曲長與 MB 2020 數位版相符到毫秒，末軌差 13ms）。

  後兩張維持 `unavailable`，**但理由要寫成「查到的是二合一那版」，不得寫成「這些服務上查不到」。**

**（2）別人的同名碟／後世合輯——兩張**
- Mystic Eyes《Mysterious》：Apple 302866738 掛名是「Mystic Eyes & Hell & Fire」、14 軌、℗ 2009，**前 4 軌不在原盤曲目表且無 Bonus 標記**。
- Jah Stitch《No Dread Can't Dead》：Apple 1800033922 是 16 軌合輯（℗ 2021 Gorgon Music），**16 軌裡 12 軌不在原盤、曲序全異**。

**（3）曲名全對、曲長全對、曲序全錯——第 157 條就是這批立的**
**The Disciples《Infinite Density of Dub》**：Apple 592187720 的 **15 個曲名一一對應、曲長逐軌相符**，
看起來完全正確——**但只有第 2、14 軌在原位，其餘十三軌全部錯位**。Apple 第 1 軌是〈Absolute Motion〉，
**原盤第 1 軌是〈Higher Dimensions〉**。
**碟是對的、試聽可用，但本機取固定試聽時不能取 Apple 的第 1 軌，要按曲名取原盤的開場曲。**
另一張同族：The Force Of Music《Freedom Fighters Dub》，**曲名與曲長整體錯開一格**
（與 c-83 Tånk 同族），且把原盤第 7、8 軌換成兩個原盤沒有的曲名。

**（4）標題自稱原版、其實不是**
**audio active《Happy Happer (Original Version)》**：標題掛著「(Original Version)」，
但 12 軌的曲長對上的是 **2003 日本 Beat Records BRC-86 重製版**
（第 1 軌 3:27 對 1995 的 2:41、第 3 軌 5:32 對 6:40、第 8 軌 4:57 對 5:06），℗ 欄掛 Beat Records。
**「Original Version」不得寫進盤名。**

**（5）ready 但整份曲目被後世改寫過**
- The Royals《Israel Be Wise》：Apple 那筆是 ℗ 2025「Roots Rockers Archive」，
  **多軌曲長與原盤差到近一分鐘、曲名全部改寫**。行文只引 1978 原盤。
- Zion Train《Passage to Indica》：Apple 112517808 那 14 軌是 **2005 重製版 WWLP001R**，
  且**六軌在 1993 曲目表上根本不存在**。

## 四、**第 152 條最典型的一張也在這批**

**Winston Edwards & Blackbeard《At 10 Downing Street - Dub Conference》**：
探測層八個 storefront **全判 unavailable，其實 Apple 上就有**。
**成因是盤名的兩截被倒置、而且把掛名也塞進了括號裡**——
Apple 作《Dub Conference (Winston Edwards & Blackbeard at 10 Downing Street)》。
主線用 collectionId 576239322 直查覆核：**10 軌、曲名與曲序與原盤完全相同**，十軌都有預覽。

**兩個限定**：Apple 的 2012-11-16 是上架日、不得寫成發行年；
第 1 軌 Apple 回 299547 毫秒，**換算會溢位成不合法的「4:60」，該軌曲長不得寫成分秒**。

## 五、一張碟有幾首歌，沒有唯一答案

**Zion Train《Passage to Indica》三份紀錄三個軌數**：1993 黑膠 8／1993 CD 5（每軌是串成的一段）／
2005 雙黑膠 8+6。**依第 141 條，行文禁止給總數**，只能按載體分開講。
寫作 b 組全批因此**一句軌數總數都沒寫**，差異一律寫成結構
（「黑膠曲目表停在〈Super Nova〉」「CD 那側再往後多出哪幾軌」「黑膠條目的曲目表只排到 B4」）。

## 六、下游層層攔下的東西

**hook a 組**（22 張，加權 18–48.5、note 248–346）：
- 兩則數錯（第 154 條）：「九首曲名全是人名」其中兩首不是；「credit 欄上有五條掛同一個名字」實為**四條、五個角色**。
- 一則違第 110 條的母帶推論；一則逼近身分禁令、且拿「封面」當欄位來源。
- 八張的封套／圓標／刻紋／轉速類 hook 補上欄位歸屬（第 128／136 條），不寫成實物狀態。
- **一處刻意不做減法**：註記原文是「10 首、每面 5 首、B 面圓標少 2 首」，
  照抄三個數字、不寫成「圓標只印八首」（第 64／112 條）。
- 本批 facts 沒有任何署名樂評，樂評型依第 138 條閒置。

**hook b 組**（23 張，加權 19.5–49.5、note 301–350）：
攔下兩則數錯（「三個資料庫三種拼法」實為兩種——MB 與 Apple 相同；
「末尾五軌全部帶括號」有一軌是逗號不是括號），並把自己的初稿收回重寫一次。

**寫作 a 組**：回頭改掉自己已落檔的四張（卡 6 的計數句、卡 8 重複的製作人與重複的 B4、
卡 9 的「他自己」改為具名 Prince Jazzbo、卡 15 壓字數），
並**攔下一處研究稿的錯**：卡 11 的 note 寫「貝斯、鼓、吉他、風琴、鋼琴、打擊各兩到三人」，
回 facts 數過**主奏吉他只有一人**（Earl "Chinna" Smith）；改寫成可驗證的單一事實
「光鋼琴一格就填了三個名字」。

**寫作 b 組**：四處計數句逐項回數過才寫（卡 5「credit 欄七條」、卡 17「八個子廠牌」、
卡 23「有名字的那八個曲位」、卡 11「二十一個曲位、二十一個地名」），
並**自己再退掉兩處**：卡 19 原寫「盤名兩說」→ 研究稿實為**三說**，改成「盤名也不一致」；
卡 22 原照抄研究稿的「簡介欄只有四個字」→ 該計數不可靠，改成「只有一句話」。
另外刻紋欄那兩串字含全形星號，改寫後仍佔字，**整段捨去**（第 138 條）。

## 七、機器 QA 結果

```
node desc-tools/qa-batch.mjs hooks c85          全部通過 ✓
node desc-tools/chk-hook-crossgroup.mjs c85     2 組｜45 張｜✓ 全部通過（跨組開頭無一撞線）
node desc-tools/qa-batch.mjs out c85            out-1｜22 張｜字數 217–239
                                                out-2｜23 張｜字數 221–239
                                                合計 45 張，與卡單相符 ✓，>260: 0
                                                全部通過 ✓
qa-check-research（兩檔各一次）                   各 0 標記
fix-spacing（兩檔各一次）                          待補 0
```

**「未具名出處」四層都是零**——本批沒有出現榜單、獎項、名人堂、百大這類字面。

## 八、本機還要做的事

1. **掃 13 張封面**（`c85/caa.log` 的「無圖」列）：Leroy Smart《Impressions of Leroy Smart》、
   Owen Gray《Forward on the Scene》、Jah Stitch《No Dread Can't Dead》、The Royals《Israel Be Wise》、
   Jean Adebambo《Feelings》、Victor Romero Evans《Première》、
   The Well Pack Band《The Workers Speak To Their Slave Masters With Strike》、
   The Bush Chemists《Strictly Dubwise》、Centry《Thunder Mountain》、
   The Disciples《Infinite Density of Dub》、Jah Warrior《African Tribes Dub》、
   Dread & Fred《Iron Works Pt. 2》、Lidj Incorporated Meets Sound Iration《Dub Liberation》。
2. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。
3. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
4. **上架前逐張讀 `previews.json` 的 `note`**——第三、四節那 11 張都有限定語。
   **The Disciples 那張特別要注意：固定試聽不能取 Apple 第 1 軌，要按曲名取原盤開場曲（第 157 條）。**
5. **`node scripts/build-genre-tree.mjs --write`**（第 147 條）——**要排在 seed 上架之後**。
   **這一步雲端做不到**（重建快取要碰 KV，且 `data/rawgenres-cache.json` 不在版控內，需先 `--pull`）。
6. **清掉本批的暫存腳本**：
   `batch-progress/c85/` 下的 `apl-c85.mjs`、`art-c85.mjs`、`caa-c85.mjs`、`dg-c85.mjs`、
   `dgb-c85.mjs`、`dgs-c85.mjs`、`ent-c85.mjs`、`lab-c85.mjs`、`labs-c85.mjs`、`lbl-c85.mjs`、
   `lblrel-c85.mjs`、`mb-c85.mjs`、`pool-c85.mjs`、`scan-c85.mjs`、`ver-c85.mjs`；
   `desc-tools/` 下的 `apl-c85a.mjs`、`aps-c85a.mjs`、`dg-c85a.mjs`、`fetch-c85a.mjs`、
   `harv-c85a.mjs`、`mb-c85a.mjs`、`mrg-c85a.mjs`、`wk-c85a.mjs`。
   （`batch-progress/c85/chk-prop.mjs` 是共用的，**不要刪**。）
