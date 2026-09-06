# c-117 交接（2026-09-06）：英國 1970s folk-rock 私壓與小廠，43 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

`EXPANSION-PLAN-c89plus.md` F 線，`lineType: 深掘`。

**43 張、34 位掛名、零 §1 人工身分、零跨批撞卡、43/43 釘住 release-group MBID。年份 1968–1978。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | acid folk／psych folk 私壓與 singer-songwriter | 22 |
| b | electric folk 與 traditional 系 | 21 |

**曲風**：folk 43（全批同一類）。**§5.6 合輯 0 張**
（實掃 43 位、535 個 RG，逐筆回問 50 個，裁定 167 第六次應驗）。
**與 c-68（prog／psych）／c-71（爵士）逐筆讀完 90 張，重複 0。**
**轉出 §1 候選 0 張**——英國 1970s 民謠私壓的 MB 建檔率意外高（第 226 條）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **43/43（100%）**——CAA 40 張 ＋ Apple 補 3 張 | `c117/caa.json` 與研究稿 `notes` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **43 張全部寫完並過機器 QA** | `desc-tools/batches/output/c117-out-{1,2}.json` |
| 5. 固定試聽 | **28/43（65%）**，命中 `gb 27｜de 1` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**缺封面 3 張全部由 Apple 救回**（第 219 條）：Wizz Jones《The Legendary Me》`496142391`、
《Right Now》`324112956`、Principal Edwards《Soundtrack》`1601296749`
——**CAA 在 2026-09-06 複查仍是 404**。

**簡介的機器 QA**：`qa-batch.mjs out c117` 全過
（out-1 22 張 178–231、out-2 21 張 182–232、>260 零筆）；`fix-spacing` 兩檔已 `--write`、補 0；
`qa-batch research/hooks c117` 與 `chk-hook-crossgroup c117` 皆 0 標記（hook 加權 21–32.5、note 239–332）。
主線一次性複驗：**43 張 `desc` 開頭與 `hook` 逐字相符**、**四位中文數字年 0 筆**；
兩支寫作層各自掃過資料庫名、榜單評分、四位中文數字年、彎撇，**四類都是 0 次**。

## 三、**裁定 220 在這批抓到 0 張**——策展層排除的 4 張確實是全部

第 220 條（英國私壓在 MB 上有「成類」的以再發日期建檔的 RG）就是這條線發現的，
但**研究層 43 張全部逐張回問 `inc=releases` 比對「轄下最早 release」與 `first-release-date`，
43/43 一致**（含 8 張連月份都相同）。**策展層事前排除的 4 張就是全部。**

另記三個相關形狀：**Sallyangie 最早那筆是 `Promotion`**（年份仍取 1969）、
**Jan Dukes de Grey 轄下 7 筆有 5 筆 Bootleg**（不得採為背書）、
Bread Love and Dreams 與 Andy Roberts 的 RG **各只有 1 筆 release**（最早即唯一）。

## 四、⚠ 探測層的配對錯誤 3 張（本批最重要的一條）

| 卡 | 問題 | 處置 |
|---|---|---|
| **Bridget St John《Jumblequeen》** | 線上 11 軌裡第 4／8／10／11 軌與原盤不符，**連同名曲〈Jumble Queen〉都缺** | **已撤下試聽**，簡介不提線上版 |
| **Shirley & Dolly Collins《For as Many as Will》** | 是 **10 軌再發、多一首〈The Blacksmith Courted Me〉**，店面長度欄自相矛盾 | **已撤下試聽** |
| **Heron《Twice as Nice & Half the Price》** | 曲名全同但**兩邊長度整整錯開一位** | 保留試聽，**簡介不引單軌長度** |

**回撈候選另駁回 5 個**（Dulcimer→《Room for Thought》、Andy Roberts→《Urban Cowboy》、
Martin Carthy《Shearwater》→四筆同藝人別碟、Peter Bellamy→《The Fox Jumps over the Parson's Gate》、
Spirogyra《Bells》→《Old Boot Wine》）。

**新補 2 筆**：
- **Martin Carthy & Dave Swarbrick《But Two Came By》gb `1620641866`**（11 軌＝原盤，逐軌差 ≤1 秒）
  ——**探測層八個店面全回 0**，因為店面把它掛在 `Martin Carthy` 一人名下、
  **Swarbrick 塞進 `(feat.)` 後綴**（第 218 條的形狀），走藝人目錄 lookup 才找到。
- **The Sallyangie《Children of the Sun》gb `1439693983`**（**2002 兩片裝，第 1 片 1–13 軌才是原壓**）。

**⚠ Mr. Fox《The Gipsy》維持無來源**——它只存在於 `1436337340《Join Us in Our Game》`
這個「兩張碟併一條目」的項目裡（第 11–17 軌），依策展層第八條同形狀判定不可用。

## 五、策展層被推翻的 6 處與年份修正 5 張

**序數／極值不成立 6 處**：Comus「最後一張／解散重組」、Heron「最有名的一例」、
Dulcimer「唯一的一張原盤」與「價目最高的幾張之一」、Andy Roberts「長期擔任伴奏」、
Sallyangie「Oldfield 姊弟十五／十九歲」、Dando Shaft《Lantaloon》「最後一張」的條件。

**年份修正 5 張**（照研究稿的值）：Bill Fay **1970**（店面記 1969）、C.O.B. **1970**（條目記 1971）、
Martin Carthy《Sweet Wivelsfield》**1974**（店面記 1971）、《Coppers & Brass》**1977**（條目記 1975）、
《Rout of the Blues》**1970**（條目記 1971）。

## 六、⚠ `chk-prop` 的 `&`／`and` 盲點是這批發現的（第 217 條）

原本的正規化**刪 `&` 卻留 `and`**，於是 `Shirley & Dolly Collins` 與
`Shirley and Dolly Collins` 摺出兩個不同的鍵——**這道檢查從來沒抓到過任何一組 `&`／`and` 撞卡**。
**19 份 `chk-prop`（c-100～c-118）已全部補上 `.replace(/[&＆]/g, 'and')`**，
修完重跑十五批標記仍全是 0（這一輪沒有實際漏掉的撞卡），
但**本機合池時值得用新的正規化重掃一次全池**。

**第 218 條同批**：以掛名子字串實掃**會整組漏掉合掛形態**
（掃 `shirley collins` 漏掉池中的 `Shirley & Dolly Collins` 兩張）——**要掃掛名與盤名兩個鍵**。

## 七、字數：**兩組初稿超標合計只有 1 張**

writer-1 **22 張初稿超標 0 張**、writer-2 **21 張只有 1 張（250）**。
做法是「**一律整格捨，未逐句削字**」——這是第 230／242 條在專名密度最高的批上收到的最好結果。
