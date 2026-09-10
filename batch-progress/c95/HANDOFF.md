# c-95 交接（2026-09-05）：爵士與藍調目錄深度，44 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

`lineType: 廣度`——把已經在池裡、卻只有一兩張的正典藝人補到該有的深度。
**這批的藝人數是十批裡最高的：44 張、41 位藝人**（幾乎一人一張）。
零 §1 人工身分、零跨批撞卡、44/44 釘住 release-group MBID、**合輯 0 張**。年份 1953–1994。

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 戰前藍調與芝加哥電藍調 | 23 |
| b | 爵士正典：搖擺到自由 | 21 |

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **43/44（98%）**，**1 張要掃圖** | `c95/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **44 張全部寫完並過機器 QA** | `desc-tools/batches/output/c95-out-{1,2}.json` |
| 5. 固定試聽 | **37/44（84%）**，命中 `us 34｜gb 3` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**要掃的 1 張**：James P. Johnson《Carolina Shout》——策展層已在 `risk` 記下 Apple 備援 collectionId 203053431。
（另一筆 CAA 首輪回 HTTP 500 的 Art Tatum《God Is in the House》**已補回**，第 28 條：查詢失敗不是查無。）

## 三、⚠ 這批最重要的一條：**錄音年 ≠ 出版年，44 張裡有 30 張兩者不同**

- **a 組 23 張裡 16 張、b 組 21 張裡 14 張**，每張的 `yearVerified` 各自附源。
- **另有七張的錄音年查無來源**——a 組的 Victoria Spivey、Lonnie Johnson、Willie Dixon，
  b 組的 Kid Ory、Jelly Roll Morton《The Pearls》、Sidney Bechet、Django。
  **這七張的正文一個數字都沒填。**
- ⚠ **先前一版派工單把 Victoria Spivey、Lonnie Johnson、Willie Dixon 列進「錄音＝出版同年」，
  那是錯的**——hook 層 a 組回頭更正的。錄音／出版確實同年的只有 Sippie Wallace、Ida Cox、
  Earl Hooker（a 組）與 Spirits Rejoice、Teddy Wilson（b 組）。

## 四、⚠ 試聽：**七張要換綁或改判，五張推翻 unavailable**

**配錯碟／配錯版本（研究層逐張回 lookup 才抓到的）**：

| 卡 | 原綁 | 處置 |
|---|---|---|
| **Robert Johnson《King of the Delta Blues Singers, Vol. II》** | 157432232 ＝ **1961 年的第一輯** | 換綁 us 193895743。**第 168 條那個卷號被吃掉的形狀**（這筆是修法之前探測的） |
| **Earl Hooker《Sweet Black Angel》** | gb 1283483865 ＝ ℗2017 AP Digital 同名整編，**11 軌沒一軌對得上** | **改判 unavailable，collectionId 列黑名單**（十個店面全掃過，Apple 沒有本盤） |
| **Jelly Roll Morton《The Pearls》** | gb 504543940 ＝ ℗2012 Bold As Brass 20 軌，**曲目表與 MB 完全不同** | 換綁 us 302055819（23 軌逐軌全同）。**策展層的 `risk` 本來就指名 us 那一筆，是被探測層的 gb 命中覆蓋掉的** |
| **Victoria Spivey《Woman Blues!》** | gb 1446883888 ＝ 2009 Remastered、盤名少驚嘆號 | 換綁 us 1770109928（1962、合掛 Lonnie Johnson） |
| **Albert Ayler《My Name Is Albert Ayler》** | us 152606352 ＝ **cleaned**，us 藝人頁無雙胞胎 | **改用 gb 652749380**（notExplicit、6 軌逐軌全同）。**第 166 條的變形——雙胞胎不一定在同一個店面** |

**推翻 unavailable 五張**：Bessie Smith《The Complete Recordings, Volume 1》（Apple 寫「Vol. 1」、
卡單寫「Volume 1」）、Bix Beiderbecke《Singin' the Blues》、Roy Eldridge & Dizzy Gillespie《Roy & Diz》
（後兩張都是第 166 條的 search 漏碟，走藝人頁 lookup 找到）。

**⚠ 一張鎖軌**：**Roy & Diz** 的 Apple 條目是 **Vol.1＋Vol.2 合併的 9 軌 CD**，
**預設第 1 軌〈Sometimes I'm Happy〉是 Vol. 2 的曲子**——
**固定試聽已鎖第 6 軌〈I've Found a New Baby〉（原盤 A1），並記 `lockedTrack: 6`。
軌數與曲目不得引這個條目。**

**⚠ 一張禁寫曲目**：**Fletcher Henderson《Tidal Wave》** 的 **MB 與 Apple 曲目表打架**
（兩邊都 21 軌但只有中段重疊，且 MB 那筆 release 的廠牌登記成
「Squirrel Thing Recordings / B01IOLFDCG」，可疑）。
**那個條目只當試聽來源，本張禁寫任何曲目與軌數**——正文已做到零曲目、零軌數、零曲序。

**六張版本／曲序偏差，軌數以原盤為準**：Blind Lemon Jefferson（Apple 25／MB 32）、
J.B. Lenoir（16／12）、Elmore James（17／14）、Zodiac Suite（17／12）、Teddy Wilson（20／14）、
Roy & Diz；曲序偏差三張（Jimmy Rushing 第 4 軌起重排、Sidney Bechet 1、2 軌互換、Django 開場不同）
——**正文不得寫第幾軌是什麼**。

## 五、七處年份／盤名兩說的裁定（`c95/rulings.md` 第 10–12 條）

判準：**第 91／95 條（卡片年份取 `first-release-date`，rgMbid 是身分鍵不是年份來源）
＋「兩個獨立資料庫 > 單一維基條目」。**

| 卡 | 衝突 | 裁定 |
|---|---|---|
| Elmore James《Whose Muddy Shoes》 | 卡片 year 1968 對應的 release 標題是《Tough》 | 年份維持 1968，**但正文不得把年份與盤名綁成一句**——正文最後寫成「1960 年代末由 Chess 問世」 |
| Gus Cannon | MB／Apple 1962 vs 維基 1963 | 取 1962；**策展層的「七十八歲」是錯的，維基寫 79 歲** |
| J.B. Lenoir《Alabama Blues》 | MB 1966 vs 維基 1965 | 取 1966；**〈Born Dead〉不得當原盤曲目**（只在 ℗1979 L+R 擴充版上） |
| Sippie Wallace | MB／Apple《Women Be Wise》vs 維基《Sings the Blues》 | 取《Women Be Wise》 |
| Ida Cox | MB 1990（再版年）vs 卡片 1961 | 維持 1961 |
| **Sidney Bechet《The Fabulous Sidney Bechet》** | RG 的 `first-release-date` 是 **2001-01-09**、轄下只有 2001 Blue Note CD，**沒有 1958 的 BLP 1207** | **rgMbid 沒有釘錯**——MB 上以這盤名為題的 RG 只有兩個，另一個是 1952 年的別張碟。**年份維持 1958，正文不得引 MB 的 2001**。1958 目前只有 Apple 一個外部背書，**本機拿到實體應覆核** |
| Big Bill Broonzy | 癌別兩說（Shore Fire 稿肺癌／維基喉癌） | **只寫「因癌症過世」** |

## 六、研究層擋下的東西：**時序與序數類幾乎全軍覆沒**

**a 組六處、b 組八處，全部沒有直述來源**：
「第一位靠唱片賣座的男性鄉村藍調歌手」（Blind Lemon）、「classic blues 的起點」（Bessie Smith）、
「戰後幾乎銷聲匿跡／這是第一張」（Tampa Red）、「之後四十年只在教會彈風琴／復出的第一張」（Sippie Wallace）、
「生涯唯一的 LP／最後錄音」（Ida Cox）、「Stax 的第二張 LP／唯一一次錄戰前 jug band」（Gus Cannon）、
Kid Ory 的「第一張由黑人紐奧良樂團發行的唱片」（**維基原話限定「在西岸錄下的第一批爵士錄音」**）、
King Oliver 的「最後嘗試」「最少被整編」、Django 的「他生前最後幾次錄音室工作」
（**維基那段沒有指名這個盤名**）、Bunk Johnson 的「直接催生紐奧良復興運動」、
Fletcher Henderson 的「大樂團編曲法的發明者」、Sidney Bechet 的「十餘年關係的總結」。

**兩處與來源相反**：
- **Roscoe Mitchell《Old / Quartet》不是「1975 年的重聚錄音」**——維基三個錄音日全在 1967；
  連帶「雙 LP」也不成立（MB 單 medium 4 軌）。
- **Albert Ayler《My Name Is Albert Ayler》不是「他的首張錄音室專輯」**——
  維基引 Schwartz 明講前一張是《Something Different!!!!!》。

**四處事實就地更正**：Blind Lemon 那兩筆 Apple 的版權欄是 **Milestone 與 Black Swan**
（不是策展層說的 Riverside）；Albert Ayler《Spirits Rejoice》維基定性是 **live album**；
Zodiac Suite 的「市政廳＋管弦」是把 Town Hall（室內爵士團，1945-12-31）與卡內基
（70 人交響，1946-06）**混成一場**；Teddy Wilson 的 Goodman 三重奏是 **1935** 年、
且維基主詞是 **Wilson 本人**不是「名團」。

## 七、hook 層攔下的東西：**一半是算術**

a 組 23 張、b 組 21 張，兩組合計攔下 34 處候選，**其中十七處是年差或數量換算**
（「隔了九年」「死後四十五年」「已經走了一年半」「三年半錄六十八首」「在架上躺了十五年」
「三十多年前寫的曲子」「二十一年後的 CD 版」「編曲者還沒滿二十二歲」
「十一年後才靠假牙重新錄音」「得獎的人已經去世十七年」…）。

**另有兩處是逐項核對推翻的數字**：
- **Sippie Wallace** 的候選寫「1923 年在 Okeh 錄的歌，1966 年才第一次變成一張專輯」——
  **與 `yearVerified` 直接衝突**（本盤錄音＝發行皆 1966），是實質事實錯誤。
- **Kid Ory** 的候選寫「六首曲名帶 Blues」——**逐名核對七軌，七首都含 Blues**。裁定一律不寫數字。

## 八、機器 QA 結果

```
node desc-tools/qa-batch.mjs research c95        key 與卡單完全一致 ✓｜全部通過 ✓
node desc-tools/qa-batch.mjs hooks c95           全部通過 ✓
node desc-tools/chk-hook-crossgroup.mjs c95      2 組｜44 張｜hook 加權 19–46.5｜note 313–350｜✓ 全部通過
node desc-tools/qa-batch.mjs out c95             out-1｜23 張｜字數 176–235｜>260: 0
                                                 out-2｜21 張｜字數 218–235｜>260: 0
                                                 thin 卡 1 張，全部 ≤180 ✓
                                                 out 合計 44 張，與卡單相符 ✓
                                                 **未具名出處 0 盞**（兩組都未做規避改寫，是動筆時就避開的）
qa-check-research（兩檔各一次）                    各 0 標記
fix-spacing（兩檔各一次）                           待補 0
node batch-progress/c95/chk-prop.mjs a b         44 張｜41 位｜標記 0（跨批撞卡 0）
```

## 九、本機還要做的事

1. **掃 1 張封面**：James P. Johnson《Carolina Shout》（策展層已記 Apple 備援 203053431）。
2. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。
   **這批 44 張裡 30 張是後世整編輯，`obscurity` 要看藝人不是看這一版的流通量。**
3. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
4. **上架前逐張讀 `previews.json` 的 `note`**——37 張 ready 裡有 12 張帶換綁說明、
   鎖軌指示或引用限制，第四節每一條都在裡面。**特別是 Roy & Diz 的 `lockedTrack: 6`
   與 Fletcher Henderson 的禁寫曲目。**
5. **覆核 Sidney Bechet《The Fabulous Sidney Bechet》的 1958**（目前只有 Apple 一個外部背書）。
6. **`node scripts/build-genre-tree.mjs --write`**（第 147 條）——**排在 seed 上架之後**。

## 十、策展層對這條線的判斷

**爵士美國正典的主線已經很飽**（Miles 41、Coltrane 34、Monk 20、Bill Evans 23），
**真正空的是它的兩端**——1920–30 年代紐奧良與 stride、以及戰前 classic blues 女歌手與 jug band，
本批補的就是這兩端。**補完後仍明顯偏薄的是戰後 jump blues／R&B 與 boogie-woogie 鋼琴。**
