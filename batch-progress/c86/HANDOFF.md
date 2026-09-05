# c-86 交接（2026-09-04）：美國自主爵士廠牌 1969–82，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`），場景「美國自主爵士廠牌 1969–82」。
**45 張、45 位藝人（零重複）、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID、
`releaseType` 全部 Album、零合輯、零例外條款。**

| 組 | 張數 | 年份 |
|---|---:|---|
| a | 22 | 1973–1981 |
| b | 23 | 1972–1979 |

**廠牌**：Black Jazz Records 9、Strata-East 9、Nimbus West Records 4、Survival Records 4、
Nessa Records 4、Tribe 3、Strata Records 3、Black Fire 3、India Navigation 3、
Improvising Artists Inc. 1、Muntu Records 1、Adelphi Records 1。
**十二家廠牌、45 張碟、45 位藝人——這是本線分佈最均勻的一批。**

`fix-rgmbid` 依第 28 條附錄跑兩輪取聯集：**兩輪的失敗集合不相交**（44+1 = 43+2 = 45），
聯集覆蓋全部 45 張，每一張都至少被確認過一次。**暫時性失敗不是查無。**

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **42/45（93%）**，3 張要掃圖，來源全部 CAA | `c86/caa.json`、`caa.log` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c86-out-{1,2}.json` |
| 5. 固定試聽 | **31/45（69%）**，命中 30 個在 `us`、1 個在 `gb` | `c86/previews.json`、`previews.log` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**無封面三張**：Henry Franklin《The Skipper at Home》、
The Contemporary Jazz Quintet《Location》、Joe Lee Wilson《What Would It Be Without You》。

## 三、這批的核心風險：**加曲版特別多，而且加的軌不一定在末尾**

**45 張裡有 6 張是加曲版**（原盤軌數 < Apple 軌數，研究層逐項做過第 140 條的兩項檢查、
判為加曲版而非二合一）：Pan Afrikan Peoples Arkestra《Flight 17》5→7、
Harold McKinney《Voices and Rhythms》7→9、Sphere《Inside Ourselves》5→7、
Oneness of Juju《Space Jungle Luv》6→8、Horace Tapscott《Live at I.U.C.C.》7→8、
Chico Freeman《Spirit Sensitive》6→10。**六張的多出軌一律不得當原盤曲目。**

**其中兩張坐實了第 140 條附二「加曲不一定排在後面」**：
- **Horace Tapscott**：多出的〈McKowsky's First Fifth〉**插在第 4 軌**。
- **Chico Freeman**：多出的四軌**插在第 4、5、6 與第 9 軌——全在中段**。
  **逐軌比對整份曲目表才看得出來；只比頭尾或只比軌數會直接放行。**

**另兩張曲長對的是再發版，不是原盤，一律禁引 Apple 曲長**：
Creative Arts Ensemble《One Step Out》（四軌全部比兩庫登的原盤長 25–49 秒，
**兩庫都沒有登過與它相符的曲長**）、Phil Ranelin《The Time Is Now!》（13:33 vs 原盤 14:31，對的是 2001 再發）。

## 四、探測層的 `unavailable` 有三張是誤判、兩張是配錯碟

**誤判（第 152 條，三張）**
- **Horace Tapscott《Live at I.U.C.C.》**：**盤名前被串上系列名、掛名整段塞進盤名字串**
  （Apple 作《Soul Jazz Records Presents Horace Tapscott with the Pan-Afrikan Peoples Arkestra: Live at I.U.C.C.》）。
  拆成核心 ASCII「Horace Tapscott Live at IUCC」第一筆即命中。
- **Michael Smith & Steve Lacy《Sidelines》**：`tried` 記 `1→0`／`2→0`——**搜到了卻一筆都沒配上**，
  原因是 **Apple 把掛名的兩截倒置**。逐軌 7 軌全同。
- **Rashied Ali & Frank Lowe《Duo Exchange》**：**標題多了「: Complete Sessions」與「- EP」**。
  命中的 1494390584 是同 release-group 的 Official **2020 年兩軌數位版**（非 18 軌套裝）——
  **試聽可用，但軌數、曲名與曲長一律不得取自它。**

**還推翻了策展層一次**：Joe Lee Wilson《What Would It Be Without You》，
策展層寫「Apple 四個 storefront 全空」，**實有 collectionId 158224221，6 軌全同。**

**配錯碟（兩張，都改判不採用）**
- **Air《Air Time》**：探測層配到的 792998267 掛名是**愛爾蘭傳統歌手 Fiodhna Gardiner**，
  11 軌、**無一軌與本張相同**。三條回補路徑全落空；對照組確認 Apple 上有這個團的
  《Air Lore》(RCA)，**但沒有這張 Nessa 盤**。
- **Dick Griffin《The Eighth Wonder》**：`tried` 記 `2→0`，命中的兩筆是 10 軌的
  《The Eighth Wonder & More》——**二合一**（本張＋1979 Trident TRS-504《Now Is the Time》），
  Konnex credit 欄第 7–10 軌是完全不同的班底。依第 129 條不採。
  **維持 `unavailable`，但理由不得寫成「這些服務上查不到」。**

**一張看起來像配錯、其實沒有**：Experience Unlimited《Free Yourself》，
**Apple 把掛名改成合作名「Experience Unlimited & E.U.」**，但逐軌核過 7/7 相同——`ready` 成立。

**還有一組同名不同演出不可混判**：本批 Horace Tapscott 那張的〈Village Dance〉
與同批另一張的〈Village Dance〉是**兩段不同演出**（26:13 vs 10:59、不同 release-group）。

## 五、這批最值得記的：**同一個錯的多份拷貝，改一處等於沒改**

**hook b 層先抓到六處 facts 自算錯，我修進了輸入檔並在派工時明說「同型的錯很可能還有殘留」。
下一輪寫作兩組在同一批檔案裡又數出七處。**

hook 層抓到的六處：卡 20〈Nonaah〉「四位客座」實為四個曲位共七位、
卡 8 的地址「出現在三張」實為四張、卡 9「四筆版本」實為三筆、
卡 16 公司欄「八條」實為七條、卡 19 公司欄「八條」實為九條、
卡 21 的錄音室清單漏了兩個。

寫作層又抓到的七處：
- 卡 1《The Skipper at Home》`sound`「管樂三支」，同句列的是四支。
- 卡 1 researchNotes「Henry Franklin 在本組出現三次」，括號列了四處。
- 卡 5《The Second Coming》researchNotes「Kirk Lightsey 在本組出現三次」，同樣列了四處。
- 卡 3《Talk to My Lady》facts「公司欄十一條」，逐項是十二條。
- **卡 15《Voices and Rhythms》：facts 我先前已更正為「八條人聲」，
  但同一張卡的 `sound` 與 researchNotes 禁令仍寫「九條」。**
- **卡 20〈Nonaah〉`sound`「另有四位客座分別掛在四個曲位上」——
  與 hook 層抓到的 facts 是同一個錯的另一份拷貝。**

**教訓**：`facts`／`sound`／`researchNotes` 是同一個數字的三份拷貝。
**只改 `facts` 那一份，寫作層照樣會從 `sound` 或 `researchNotes` 讀到舊的數字。**
七處在寫作層都沒有寫成計數句（兩組都回 facts 逐項數過才寫），**無事實損失**——
但那是靠下游又數了一次，不是靠上游修對了。

## 六、兩處寫作層自行裁定，主線覆核後維持（第 160 條）

- **a 組**：卡 9《Plenty Good Eaton》與卡 22《Free Yourself》的 `researchNotes` 要求寫成
  「維基〈某某〉條目**引 AllMusic** 這樣說」，但 `writer-base` 禁止平台名進正文。
  代理**只具名到維基、事實一字未刪**。
- **b 組**：卡 20〈Nonaah〉的 note 要求寫兩則帶引註的評價，但那兩則的內容
  **就是 4.5／5 與 4／5 兩個分數**，刪掉分數只剩媒體名 → **整條捨去**，
  改用錄音場次與客座編制收尾。

**兩邊都對，是同一條規則的兩端**：拿掉被禁的平台名之後，
**剩得下一個有具名出處且自身成立的句子就改具名照留，剩不下就整條捨去。**

**b 組另一處自定**：卡 5 的 Konnex 年份只寫 1994（Discogs 兩欄都是 1994、維基寫 1995），
維基那句只用來說明「& More」的內容組成、不帶年份，兩說不並列。

## 七、**一張已裁定的例外：卡 4 是 thin 卡但寫到 234 字（第 161 條）**

Muriel Winston《A Fresh Viewpoint》標 `status: thin`，`writer-base` 給 thin 卡 120–180，
**但我的派工詞與 `qa-batch` 都只寫 180–240**，代理照派工詞寫到 234。

回查發現這不是單一事件：**35 張 thin 卡裡，c-53–c-56 的 13 張全部守住 180，
c-67 之後的 22 張全部超出**——雲端派工模板從第一封起就漏了 thin 那一句，
而 `qa-batch` 從來不看 `status`。**規則沒被違反，是沒有人把規則交到寫作層手上。**

**處置**：`qa-batch.mjs` 已補上 thin 帶檢查（回測 c-55 七張全 ≤180 ✓）。
**本卡維持 `thin` 標記與 234 字的稿子，不改 `status` 讓檢查變綠**——
那盞燈本來就該亮。稿子本身全是欄位值、無填充，不重寫。
**`qa-batch out c86` 因此會固定標出這一筆，是已知且已裁定的。**

## 八、機器 QA 結果

```
node desc-tools/qa-batch.mjs hooks c86          全部通過 ✓
node desc-tools/chk-hook-crossgroup.mjs c86     2 組｜45 張｜hook 加權 25–41.5｜note 274–350｜✓ 全部通過
node desc-tools/qa-batch.mjs out c86            out-1｜22 張｜字數 216–237
                                                out-2｜23 張｜字數 217–238
                                                合計 45 張，與卡單相符 ✓，>260: 0
                                                ⚠ thin 卡超過 180 字 1/1（見第七節，已裁定）
qa-check-research（兩檔各一次）                   各 0 標記
fix-spacing（兩檔各一次）                          待補 0
```

**「未具名出處」四層都是零。** hook 兩組的 `startsWith` 也逐張驗過原封不動
（b 組交件前自查出兩處把 hook 句末的「。」併成「：」，已復原）。

## 九、本機還要做的事

1. **掃 3 張封面**：Henry Franklin《The Skipper at Home》、
   The Contemporary Jazz Quintet《Location》、Joe Lee Wilson《What Would It Be Without You》。
2. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。
3. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
4. **上架前逐張讀 `previews.json` 的 `note`**——**45 張裡有 14 張帶限定語**。
   特別是六張加曲版（**Horace Tapscott 與 Chico Freeman 的多出軌在中段**）、
   兩張禁引 Apple 曲長、Duo Exchange（軌數／曲名／曲長都不得取自 Apple）。
5. **`node scripts/build-genre-tree.mjs --write`**（第 147 條）——**要排在 seed 上架之後**。
   **這一步雲端做不到**（重建快取要碰 KV，且 `data/rawgenres-cache.json` 不在版控內，需先 `--pull`）。
6. **清掉本批的暫存腳本**：`desc-tools/` 下的 `build-hooks-c86hb.mjs`
   （其餘 c-86 專屬暫存腳本兩支寫作代理與 hook 代理都已自行刪除）。
   （`batch-progress/c86/chk-prop.mjs` 是共用的，**不要刪**。）
