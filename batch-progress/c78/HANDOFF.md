# c-78 交接（2026-09-04）：美國 old-time 與 bluegrass 小廠二線 44 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 美國 old-time 與 bluegrass 小廠二線`）。
**44 張、37 位藝人、1 張 §5.6 合輯、零跨批撞卡、44/44 釘住 release-group MBID。**

| 組 | 場景 | 張數 | 年份 |
|---|---|---:|---|
| a | old-time／string band 與田野採集系小廠 | 25 | 1966–2000 |
| b | bluegrass 獨立廠與樂手自營盤 | 19 | 1962–1981 |

**廠牌**：County 6、June Appal 5、Rounder 老時線 5、Mountain 3（Galax）、
Folkways 2、Heritage 1、Davis Unlimited 1、Flying Fish 1、Cavern Custom Recordings 1；
b 組 Rounder 創業期 8、Rebel SLP 1500 系列 5、Ridge Runner／Old Homestead／Lemco／
Jessup／Grasshound／Folk-Lyric→Arhoolie 各 1。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **40/44（91%）**，4 張要掃圖 | `c78/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **44 張全部寫完並過機器 QA** | `desc-tools/batches/output/c78-out-{1,2}.json` |
| 5. 固定試聽 | **17/44 ready（39%）**，**命中全部在 `us`** | `c78/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

`fix-rgmbid` **修正 0**——策展層 44 張全部原本就對。

### 封面缺 4 張，要本機掃圖
Ola Belle Reed《My Epitaph》《Ola Belle Reed》、
The Red Clay Ramblers《Merchants Lunch》、Bob Carlin《Fiddle Tunes for Clawhammer Banjo》。

### 試聽 17/44，命中全部在 `us`
**June Appal、Davis Unlimited、Ridge Runner、Mountain 四家的整份目錄沒進串流**
——本機不必逐張重試。

**其中 4 張是研究層供的人工核對 collectionId 補回的**（第 137 條附款，
用 `batch-progress/apple-previews-verified.mjs`，四筆都複驗過在 `us` 拿得到試聽）：
Wade Ward《Uncle Wade》155892991（22 軌）、Ola Belle Reed《My Epitaph》155784495（6 軌）、
Buddy Thomas《Kitty Puss》1469308417（16 軌）、
Ray & Ina Patterson《Old Time Ballads and Hymns》272197387（12 軌）。
**試聽因此從 13/44 補到 17/44。**

## 三、逐張複檢：**第 140 條就是從這批立的**

**剔除一張**：**The Red Clay Ramblers《Merchants Lunch》**——
Apple 那筆 25 軌、**軌號從 1 連號到 25、沒有重新開始**，
但**第 2 軌就是〈Twisted Laurel〉**（同團 1976 年另一張專輯的同名曲），
第 14 軌才是本張的同名曲。前 13 軌是《Twisted Laurel》、後 12 軌才是本張，
是 Flying Fish 的 2-on-1 CD、上架時重新連號。
**這就是第 140 條**：判二合一時軌號重新開始只是**其中一個**訊號，
還要看「曲目表裡有沒有別張專輯的同名曲」與「軌數對不對得上原盤」。
（研究層另補：那筆還**漏掉本張的〈Kildare's Fancy…〉**。）

**我判錯一張，研究層更正**：**Lyman Enloe《Fiddle Tunes I Recall》**
——我標成加曲版，但**原盤 Cavern 41308 本來就是二十三軌**（A 面 12＋B 面 11），
1993 年 County CD 也是二十三軌、曲序相同。**不是加軌版。**
（這是第 141 條在四批裡第三次生效，最後促成第 141 條附錄二改流程。）

**兩張原盤軌數兩說、兩個都不寫**：
Del McCoury《Livin' on the Mountain》（MB 13／Discogs 12）、
Joe Val《One Morning in May》（MB 13／Discogs 12；**Apple 16 軌＝1996 年 Rounder CD 0003**）。

## 四、研究層推翻策展層 17 處

**a 組 12 處**，最重要的四處：
1. **County 713 的 2004 年 CD 不是「原廠再版」**——十五軌**只有六首出自 1968 年那張 LP**。
2. **County 741 的 2004 年 CD 不是「多四軌的完整版」**——十六軌有**十首不在原盤上**、
   原盤有六首不在 CD 上，**是另編的碟**。
3. **Mountain 是 1969 年 Bobby Patterson 與 Kyle Creed 共同創立**，
   不是「Patterson 自己開的」；**1974 年 Patterson 離開、Mountain 留給 Creed**，
   **Heritage 是他另開的廠牌**。
4. **Lily May Ledford《Gems》的 §5.6 舉證有兩處硬錯**——
   她生前**確實有 1983 年 Greenhays GR712《Banjo Pickin' Girl》**。
   舉證已改成站得住的版本：**MB 名下 release-group 總數＝1、
   編選者之一是她孫女 Cari Norris、材料全是她本人演出與口述**。

另有：**Bob Carlin 0132 在 Discogs 上有原盤 release**（策展層說零命中，不成立）；
**Si Kahn《New Wood》原盤本來就是十七軌**；
**Mountain 304 的封底自述「這是我在 Mountain 做的第十二張」與編號 304 矛盾**
（**第 125 條的正面案例——兩個數字並列、不得選邊**）；
**Red Clay Ramblers 的英文維基本文行內引註為 0**，依第 80 條整條不採；
**J. T. Perkins 的「阿拉巴馬提琴手」「DU 33001–33045、四十幾號收攤」查無來源**；
Highwoods 兩張、Red Clay Ramblers、County 720 的「第一張／第二張／第三張」排序禁用。

**b 組 5 處**：**Del McCoury《Livin' on the Mountain》的原盤是
1976 年 Grassound GRS 102、單聲道、盤名《Collector's Special》**（1992 Rebel CD 才改名）
——**Discogs 上沒有 Grasshound 這家廠牌**；
**Ted Lundy 1972 那張同名盤是德國 GHP-909**，Rounder 三張是 0020／0055／0107；
**Country Cooking 選輯年份無定論，禁用 1982**；
**Charlie Moore 的掛名 BGD 四筆全作「Charlie Moore & his Dixie Partners」**。

## 五、年份

**禁斷言五張**：Buddy Thomas《Kitty Puss》1976（Discogs 1976／MB RG 1998／Apple 1973）、
**Lyman Enloe 1973（四說並存**：Discogs 原盤 1973-12／County 1993 CD 內頁自稱
「Originally released as Cavern 41308, 1971」／County 762 黑膠 1979／MB 與 Apple 1993**）**、
Si Kahn《New Wood》1975（Apple 與 Christgau 記 1974）、
**Del McCoury《Livin' on the Mountain》**（卡單 1971 幾乎確定是**錄音年**
——納許維爾 1971-08-09，原盤 1976 發行；**只能用錄音日期當錨點**）、
Jim Eanes 1977（Apple 記 1971；**BGD 的 BU Date 197707 支持 1977**）。

**我否決了研究層把 Del McCoury 改成 1976 的建議**，並因此立了**第 127 條附錄**：
MB 那一側**不是空的**（有一筆具體的 1971 Grasshound release），
與第 127 條「Discogs 有原始壓片年 vs MB 沒有來源」的前提不同
——**兩個資料庫各有具體記載且互相矛盾時，改值只是把一個有爭議的值換成另一個，
爭議沒有變少**。卡單值不動、標註爭議、改用有共識的錨點。

**Ola Belle Reed 0021 錄音在 1972 年秋、發行 1973，不得混寫**；
Ray & Ina 的 Apple 日期 2008 是數位上架日。

## 六、撞名：這批有三組

- **Bobby Patterson**：Galax 的樂手兼廠牌主（出現在三張卡），
  與池中**德州靈魂歌手 Bobby Patterson 無關**；
  **Ray & Ina Patterson 是第三組不相干的人**。
- **Red Allen**：另有一位紐奧良爵士小號手；
  **且 Red Allen 本名就是 Harley Allen，而碟上另有一位同名的兒子**。
- **Alan Munde** 會被池中的 Hugh Mundell **子字串誤報**。
- **《Livin' on the Mountain》另有 Bill Keith & Jim Rooney 1963 年的同名 LP。**

三組在 hook、note 與 desc 都零暗示。

## 七、互斥條款與同構骨架

**Rounder 廠牌史 a 組判給 Ola Belle Reed 0021，並明文延伸禁止 b 組**
——**唯一例外是 Joe Val 保留「這張碟是 Rounder 的第一張藍草專輯」這一句**
（主線裁定：**互斥分派禁的是廠牌沿革，這句是關於這張碟本身**，
且英文維基直接寫出）。

**hook 層第 131 條自檢改掉四條**，因為原稿出現三組同形骨架：
**「白天的正職是⋯」**（County 713 vs Joe Val）、
**「某人身兼兩職」**（Mountain 301／J. T. Perkins／Alan Munde／Jimmy Arnold 四張）、
**「同一張碟上同一首出現兩次」**（County 723 vs Benton Flippen）。
**寫作層兩組再各改三到四處**（三張「後來某廠牌把它做成 CD」收尾、
三張廠牌史放第二句、兩張「目錄號不一樣」收尾、兩張「某某開的廠牌」收尾）。

**依第 138 條閒置的分派四條**：Benton Flippen 的「同一首曲子兩個版本並列」
（與 County 723 的 hook 同形）、Don Stover 的「多年後進了名人堂」、
Ted Lundy《Slipping Away》的製作鏈（與同藝人另一張撞形狀）。**獨占仍然成立。**

**hook 層另做對一件事**：把「Neal Allen 1973 年過世」**直接從 Red Allen 那張的
note 拿掉**，而不是寫一句禁令——**在源頭剝掉，比在下游禁止有效**。

## 八、三層都攔到「數數也是算術」（第 64／108 條）

**hook 層**：Marion Sumner 的「五十九歲」（1920 生 → 1979 發行）。
**寫作層 a 組**：捨棄 J. T. Perkins 與 Osborne 的「兼兩職」寫法。
**寫作層 b 組**：Ted Lundy 兩張的「六個人」、Charlie Moore 的「七個人」、
The II Generation 的「兩天」全部改成不帶數字的寫法。

**另攔下三處 `sound`／note 的歸納對不上 facts（第 135 條）**：
**Del McCoury 的「十二首只有一首超過三分半」——facts 逐首時長最長是 3:25，
一首都沒有超過**；Country Cooking 的「六首出自團內」逐軌只數得出五首；
The II Generation 的「六首」同樣數不出。

## 九、資料受限（本機端可補的兩筆）

**Ray & Ina Patterson 是唯一 thin**：兩人無維基、無署名樂評或機構條目，
**708 的 Discogs 條目零演出掛名**——已禁用出生年、出生地、兩人關係、樂器，
**並禁止把 715 那張的樂器掛名搬過來**（第 33 條）。

**Jim Eanes、Chicken Reel、Why Me Ralph?、Carolina Bluegrass 四張的原盤 Discogs
條目沒有登任何樂器掛名**——第 136 條，行文一律寫成「條目上沒有登」。
**Si Kahn 的錄音工程師拼法（Garry Stemp／Gary Slemp）與合作社成員人數兩來源打架**
——行文不得寫人數。**Albert Hash 第 14 軌有〈Alabama Gals〉與〈Buffalo Gals〉兩種登法、
禁止點該軌。** Buddy Thomas 的製作人與錄音地點查無；
J. T. Perkins 與 Lyman Enloe 兩人生平全無可引註來源。

**⚠ 兩筆有來源但沒寫進 desc 的事實**（**本機端要補很容易**）：
**Albert Hash 的 2010 年 Blue Ridge Music Hall of Fame 入選**、
**June Apple 那筆名人堂引用**——寫作層為了避開 `qa-batch` 的
「未具名出處」標記而刻意未寫入。**那道檢查本來就只是標記、由人工複核放行**，
不是關卡；已立**第 143 條**修正往後的派工方式。
**來源在研究稿的 `wilkesheritagemuseum.com`（Blue Ridge Music Hall of Fame）條目。**

**另記**：`archive.org` 在本容器**已可連通**（metadata API 實測 200），
與第 133 條當時記錄的狀態不同；本批未依賴它。
`folkways.si.edu`、`loc.gov`、`tunearch.org`、Discogs 網頁 均為 Cloudflare 403。

## 十、機器 QA

```
qa-batch.mjs research c78     44 張（full 43、thin 1）｜key 與卡單完全一致 ✓
qa-batch.mjs hooks c78        0 標記
chk-hook-crossgroup.mjs c78   44 張｜hook 加權 12–29.5｜note 307–347｜✓ 全部通過
qa-batch.mjs out c78          out-1 25 張 228–238｜out-2 19 張 217–235｜>260: 0｜合計 44 與卡單相符 ✓
qa-check-research.mjs         兩檔各 0 標記
fix-spacing.mjs               兩檔各待補 0
chk-prop.mjs                  44 張、37 位｜標記 0｜跨批撞卡 0
fix-rgmbid.mjs                44/44 原本就對，修正 0
```

## 十一、跨批去重

已過 `dedup-crossbatch.mjs`（32 批、1,529 張，撞卡 0）；
另**以盤名為主鍵掃全池 13,913 列＋其他批次的 prop 檔，撞 0 筆**。
上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。

## 十二、這條線還有多少

**策展層列出 20 餘組 MB 查無的碟**（Camp Creek Boys、Hollow Rock String Band、
Clark Kessinger、Grant Rogers、Benny Jarrell、Norman Edmonds、
W.L. Gregory & Clyde Davenport、Art Stamper、Virgil Anderson、John Ashby ×2、
Ernest East、I.D. Stamper、Nimrod Workman、Guy Carawan、Kenny Hall、
Dillard Chandler、Sarah Ogan Gunning、Melvin Wine、J.P. Fraley、Dellie Norton、
Joe Pancerzewski）——**都只能走 §1 補遺批**（c-87 已證實可行）。

**另有 8 張因 CAA 與 Apple 兩層都無封面而剔除**（Fred Cockerham、Ola Belle & Bud Reed、
Red Clay Ramblers 兩張、Bob Carlin、Hotmud Family 兩張、Luke Smathers）
——**它們釘得住 MB、資料齊全**，本機若解得出封面就能直接補回。

**第 139 條就是從這批立的**：查「Highwoods Stringband」兩個方向都零筆、
改查「Highwoods String Band」回五筆——**差點漏掉整個團的五張碟**。
