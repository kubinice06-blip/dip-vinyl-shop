# c-94 交接（2026-09-05）：搖滾正典目錄深度 II（金屬／龐克／另類），43 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

`lineType: 廣度`——把已經在池裡、卻只有一兩張的正典藝人補到該有的深度。

**43 張、34 位藝人、零 §1 人工身分、零跨批撞卡、43/43 釘住 release-group MBID、
合輯 0 張。年份 1967–2019。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 金屬與硬蕊 | 23 |
| b | 龐克、emo、60–70s 美國另類與日本另類 | 20 |

各 2 張的九位：Voivod、Accept、Deafheaven、Eyehategod、Deathspell Omega、
At the Drive-In、The Microphones、Gene Clark、Flower Travellin' Band；其餘 25 位各 1。

**策展層實掃後主動不收的三處**：はっぴいえんど 三張正規盤池中全在（**本批零收**）、
Bikini Kill 兩張在池中、Big Brother《Cheap Thrills》在池中。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **43/43（100%）** | `c94/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **43 張全部寫完並過機器 QA** | `desc-tools/batches/output/c94-out-{1,2}.json` |
| 5. 固定試聽 | **41/43（95%）**，命中 `us 37｜jp 3｜gb 1` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**只有兩張 Apple 上真的沒有**（藝人頁目錄全掃過）：
Flower Travellin' Band《Anywhere》、Bikini Kill / Huggy Bear split。

**封面 43/43 的其中一筆是補回來的**：King Diamond《"Them"》首輪 CAA 回 HTTP 500 且 `probed:false`——
**依第 28 條那是查詢失敗不是查無**，重打一次即回 200。

## 三、⚠ 這批最重要的一節：**六張的 Apple 條目不是原盤，軌數一律以原盤為準**

**探測層的 a 組 23 張全判 `ready`，逐張回 lookup 卻抓到四筆配錯版本**——
這是「`ready` 只代表配到了某一筆，不代表配對正確」在本輪的第一次現形，
也直接催生了探測層排序的改動（**素面版本優先**，`DECO` 進第一排序鍵）。

**已換綁三張**：

| 卡 | 原綁 | 改綁 |
|---|---|---|
| Voivod《War and Pain》 | 250139410（**31 軌 Box Set**） | 211032923（9 軌、1984-08-10） |
| Killswitch Engage《The End of Heartache》 | 305684330（**Bonus Track Version 18 軌**） | 214628864（12 軌、2004-05-11） |
| Isis《Celestial》 | 665741313（**Remastered、曲名全帶尾綴**） | 368094228（11 軌，與 MB 逐項相同） |

**三張標 `expandedReissue`**（Apple 上沒有原盤軌數的條目，依第 140 條與 c-88《Dances With Wolves》先例採用）：
King Diamond《"Them"》Apple 12／**原盤 11**、Neurosis《Souls at Zero》13／**10**、
Uriah Heep《Look at Yourself》24／**7**。**多出來的那幾軌不得當原盤曲目。**

**b 組另有六張的 Apple 條目是加曲版**（Big Brother、Gene Clark 兩張、Love、ザ・スターリン、Jawbreaker）——
**行文提軌數必須指明版本**（第 157 條），正文已逐張照做。

**一張因授權換綁**：**Flower Travellin' Band《Make Up》** 原綁 415948199 的逐軌曲長
與 MB 上那筆 **Bootleg**（2010 GB Phoenix ASH2CD3033）相差不到一秒、與 1973 原盤每軌都差更多，
℗ 行寫「2011 Start Entertainments Limited」（Phoenix 的英國母公司）。
**依第 43／57／65／78 條，Bootleg 血統的數位版不得當固定試聽來源**——
改綁 jp 290811124（℗ 1998 WARNER MUSIC JAPAN、10 軌、盤名素面）。
另兩個候選刻意不取：324577240（jp 取不到曲目列）、1214407154（標題帶「2017 Remaster」）。

**一張日期欄不可信**：Cult of Luna《Vertikal》配對正確（9 軌相符），
但 **Apple 的 `releaseDate` 記 2012-01-01、MB 是 2013-01-25**——**年份寫 2013**，
已註記免得日後自動複檢誤報 `yearDrift`。

## 四、日文掛名：**第 49 條在這批有四種不同的形狀**

研究層 b 組逐一實測，結果值得記下來：

- **ゆらゆら帝国**：**同一個 collectionId（1405920029）在 jp 渲染成日文、在 us 渲染成羅馬拼音**
  （Yura Yura Teikoku／Wakatte Hoshii…），**軌數曲序曲長逐項相同——不是兩張碟**。純英文寫法不存在。
- **ザ・スターリン**：MB 三筆 Official 全日文，**羅馬拼音「Mushi」只出現在 Pseudo-Release 標題上**；
  英文「The Stalin」在這個 RG 不存在。**正文用《虫》。**
- **RCサクセション**：**最分裂**——RG 標題與四筆 Official 是片假名、1976 那兩筆是羅馬拼音
  《Single Man》、Apple 是掛名日文＋盤名羅馬拼音混用。**卡片與正文用片假名。**
  （試聽 jp 1443335331 就是靠羅馬拼音那一路才找到的。）
- **Flower Travellin' Band 與 FRICTION**：**MB 與 Apple 都沒有假名實體**——
  FRICTION 的 MB artist-credit 甚至是「**2nd Friction**」，Apple 寫 Friction，卡片與池中寫 FRICTION。
  **正文照卡片的 FRICTION。**

## 五、授權與無來源

**Bootleg 4 張**：Burzum《Det som engang var》（8 筆中 1 筆 Bootleg、2 筆空白）、
Enslaved《Frost》（25 筆中 1 筆 Bootleg、1 筆 Promotion）、Big Brother 首張（49431a24，25 軌）、
FTB《Make Up》的 2010 GB Phoenix。
**status 空白 10 處**（Accept 兩張、Eyehategod、Khanate、Uriah Heep、ATDI 兩張、FRICTION、RC 兩筆），
另 ゆらゆら帝国／ザ・スターリン 各一筆 Pseudo-Release。
**曲目全部取自 status Official 的 release，Bootleg 的曲目表一項未引。**

**無來源、已留白**：十餘處再發目錄號（release-group 端點回不到，只寫研究層逐筆回問到的九組）、
Deathspell Omega 的「刻意不公開成員與訪談」（改寫成有來源的「十五年來第一次正式受訪」）、
FTB「編號 -4A 正是雙碟的形制」、ATDI《Acrobatic Tenement》的「首張專輯」
（**英文維基記為 second studio album，兩說相衝，不得斷言第幾張**）、
策展層說「ゆらゆら帝国 us 店面不必試」（**探測層正是從 us 命中**）。

**三處策展層的軌數疑慮經回問排除**：Microphones《Don't Wake Me Up》原盤就是 15 軌、
Aphrodite's Child 原盤就是 9 軌、FTB《Make Up》原盤就是 10 軌分四面——**都沒被刪節。**

## 六、⚠ 題材界線：Burzum 那張

來源事實含 Vikernes 1993 年殺人與縱火判刑。**研究層、hook 層、寫作層三層一致避開**——
不當賣點、不進正文。正文只寫錄音、發行、限量 950 張、封面繪者。

## 七、寫作層的一次自我更正，值得記

**FTB《Make Up》〈Hiroshima〉的曲長兩源相衝**：MB 的 1973 Atlantic 日本原盤是 1489 秒，
英文維基寫 23:56（≈1436 秒），hook 層的 note 轉述成「二十三分多」。
寫作層初稿照 note 寫了「二十三分五十六秒」，**複核時自己改回 1489 秒**——
理由是同一張卡的其他曲長（702／182／579）全取日本原盤，**混用兩套數字會自相矛盾**。
Bootleg 與 Apple 那組曲長（1492／704／…）一項都沒引。

## 八、機器 QA 結果

```
node desc-tools/qa-batch.mjs research c94        key 與卡單完全一致 ✓｜全部通過 ✓
node desc-tools/qa-batch.mjs hooks c94           全部通過 ✓
node desc-tools/chk-hook-crossgroup.mjs c94      2 組｜43 張｜hook 加權 21–37.5｜note 273–350｜✓ 全部通過
node desc-tools/qa-batch.mjs out c94             out-1｜23 張｜字數 225–235｜>260: 0
                                                 out-2｜20 張｜字數 177–235｜>260: 0
                                                 thin 卡 1 張，全部 ≤180 ✓
                                                 out 合計 43 張，與卡單相符 ✓
                                                 **未具名出處 0 盞**
qa-check-research（兩檔各一次）                    各 0 標記
fix-spacing（兩檔各一次）                           待補 0
node batch-progress/c94/chk-prop.mjs a b         43 張｜34 位｜標記 0（跨批撞卡 0）
```

**未具名出處 0 盞是事前改寫措辭換來的**：Voivod 與 Killswitch 的排名寫成
「《告示牌》二百大榜最高第 114 名／第 21 名」——避開「百大專輯」這個裸字串，
同時保留具名主體與名次。

## 九、交給本機的線上資料問題

**三組重複卡與一組大小寫分裂**（策展層抓到，屬線上資料）：
- `Happy End《Kazemachi Roman》` ＝ `はっぴいえんど《風街ろまん》`
- `Happy End《Happy End》` ＝ `はっぴいえんど《HAPPY END》`
- `Big Brother & The Holding Company《Cheap Thrills》` ＝
  `Big Brother and the Holding Company《Cheap Thrills》`（**兩筆都掛 hall**）
- `BOREDOMS` ／ `Boredoms` 大小寫分裂

## 十、本機還要做的事

1. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。**封面滿版，沒有掃圖工作。**
2. **合併第九節的三組重複卡與一組大小寫分裂**（其中 Big Brother 那組**兩筆都掛 hall**，
   合併時要決定留哪一筆的頂點資格）。
3. **兩張要非 Apple 的試聽來源**：Flower Travellin' Band《Anywhere》、Bikini Kill / Huggy Bear split。
4. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
5. **上架前逐張讀 `previews.json` 的 `note`**——41 張 ready 裡有 10 張帶換綁說明或軌數限制，
   第三節的每一條都在裡面。
6. **`node scripts/build-genre-tree.mjs --write`**（第 147 條）——**排在 seed 上架之後**。

## 十一、策展層對這條線的判斷

**金屬正典其實已滿**（Sabbath 10、Priest 9、Maiden 9…），本批補的是歐陸傳統重金屬第二線
與 2000 年後極端金屬。**真正空著的是紐約硬蕊與 90s straight edge——池中全部 0 張。
那是覆蓋缺口不是深度缺口，要另開一批。**
