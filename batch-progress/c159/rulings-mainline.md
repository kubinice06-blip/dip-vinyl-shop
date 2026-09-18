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

## 第 1613 條（主線）：**c-159 研究 a 組交件——18 張全 full、年份改判 0、facts 133 條 src 全過、QA 零警告**

**六層證據命中**：① 紙本 **13／18**（街頭日 7、評介 8、榜位 9、專訪 1、整版廣告 1；零命中 5 張，與策展層一致）｜
② **Discogs 原壓群 18／18（地基）**，⚠ **其中兩張是靠「換一個 Discogs 條目」翻案的**｜
③ 廠牌官網 0，**但藝人官網 1**（Ayşe Tütüncü 那張唯一的背景來源）｜④ 店面當 src 1｜
⑤ **AllMusic 0（連續第五組；且 allmusic／allaboutjazz／jazztimes 三站本次全部回 403）**｜
⑥ **維基 7／18——本組是它最有用的一次**｜
**新增一層：專業樂評／曲目資料庫 4**（SuomiJazz、Jazz Finland、SecondHandSongs、fr.wikipedia）。

⚠ **主線自糾**：第 1611 條把未 ready 名單按組拆錯了——**5 張在 a 組**
（Anita Baker／Perko／Monk Carnegie／Tania Maria／Töykeät），**不是我派工詞寫的 3 張**；
b 組那份也因此多寫了 Monk 與 Tania Maria。**a 組五張全查了，b 組的重複勞動是我造成的。**
**這與第 1496 條同族：派工詞給某一組的名單要先按組拆開再寫。**

## 第 1614 條（主線）：**串流再救回 1 張，c-159 ready 28／34；並新立一條探測層的固定步驟**

✅ **Jukka Perko《Kuunnelmia》→ `724203490`**（主線已覆核回寫）：
**`lookup?upc=724387524828` 在 gb/de/fr/nl/it/es/au/se/no/dk/fi/br/mx/tr/ru/pl/kr/tw/hk/ie/be/ch/at
共 23 個店面都回得到，唯獨 us／jp／ca 沒有。** 逐軌 **13／13** 都有 `previewUrl`，第 646 條零重複。

⚠⚠ **這一張把第 1560-C 條又推進一層**：**不是「清單缺 fi」也不是「盤名是芬蘭文」**
（這張的盤名本來就在各店面通用），**而是「這張碟在美日加三個大市場被抽掉、在其他 23 個市場都在」。**
**探測層的十五市場清單裡有 fi，照樣沒救到它**——因為 `search` 用盤名查在那些店面也不一定命中，**要靠 UPC。**

**→ 新立（建議本機寫進探測層）**：**未 ready 的卡一律跑一輪「UPC × 23+ 店面」的 `lookup?upc=`，
這一步要當固定步驟，不是救援手段。**

❌ **另 4 張維持 unavailable，全部是逐市場實查後的確定結論**，而且**三張都是同一個新形狀**：
- **Anita Baker《My Everything》**：UPC×26 店面全 0、`search`×23 店面 0；
  **她的 Apple 藝人目錄（162340）在 us/gb/jp/de/fr/ca 都只有 11 張，同廠牌的《Christmas Fantasy》(2005)
  與〈Lately〉單曲(2012) 都在，唯獨缺 2004 這張**——**是這一張被單獨抽掉，不是目錄沒進店面。**
- **Trio Töykeät《Wake》**：同形。藝人目錄在七個市場共 9 張，
  **前後兩張 EMI Finland 盤《High Standards》(2003) 與《One Night In Tampere》(2007) 都在，只缺 2005 這張。**
  （第 1560-G 條的英文盤名查核：**盤名本來就是英文，無第二組字串可試。**）
- **Tania Maria《Intimidade》**：UPC×26 全 0；**fi 目錄有 31 張（含 1990 Blue Note《Bela Vista》與 2011 Blue Note 精選），沒有本張。**
- **Monk/Coltrane《At Carnegie Hall》**：UPC×26 全 0；Monk 藝人目錄 96–116 張、`Thelonious Monk Quartet` 9–14 張，**零 Carnegie 條目**。

**→ 這個形狀值得單獨命名：「藝人目錄完整、前後作都在，唯獨這一張缺」。**
**它與「整個目錄沒進店面」在 `unavailable` 這個值上長得一樣，但成因是版權下架，救不回來。**
**研究層判定這一類時，要把「前後作都在」這件事寫進 notes**，免得後續有人再掃一輪。

## 第 1615 條（主線）：**封面 3／3，其中一張推翻了 Discogs 優先的慣例**

| 卡 | 來源 | 備註 |
| --- | --- | --- |
| Trijntje Oosterhuis《Strange Fruit》 | Discogs **1516384** primary 600×600 | 紅底橫幅＋`STEREO 97756 BLUE NOTE` 方框，荷蘭首發 CD 版式 |
| Trio Töykeät《Wake》 | Discogs **574399** primary 600×593 | |
| **Jukka Perko《Kuunnelmia》** | **Apple artwork 600×600**（`00724387524859.jpg/600x600bb.jpg`） | ⚠ **Discogs 942370 的 primary 只有 253×247，不能用** |

## 第 1616 條（主線，**獎項：策展層 18 張一張都沒查，實際有 5 項**）

| 卡 | 獎項 | 結果 | 得主 |
| --- | --- | --- | --- |
| **Don Byron《Ivey-Divey》** | 第 47 屆葛萊美最佳爵士器樂獨奏（〈I Want to Be Happy〉，開場曲） | **入圍未得** | Herbie Hancock〈Speak Like a Child〉 |
| **Anita Baker《My Everything》** | 第 47 屆最佳傳統節奏藍調人聲演唱（〈You're My Everything〉） | **入圍未得** | Prince〈Musicology〉 |
| **Anita Baker《My Everything》** | 第 47 屆最佳節奏藍調專輯 | **入圍未得** | Alicia Keys《The Diary of Alicia Keys》 |
| **Dr. John《N'Awlinz》** | 第 47 屆最佳福音演唱（〈Lay My Burden Down〉，與 Mavis Staples） | **入圍未得** | Ray Charles & Gladys Knight |
| ✅ **Erik Truffaz《Saloua》** | 2005 年法國 **Victoires du jazz「Prix du public」** | **得獎**（本組唯一） | — |

**入圍名單 src＝BB-2004-12-18 p56–57；得獎名單 src＝BB-2005-02-26 p58，兩層分開引。**

⚠ **三個「不得併計」的陷阱已就地寫進 notes**：
- **Wynton Marsalis** 第 48 屆入圍的是**《Live at the House of Tribes》**，不是《The Magic Hour》。
- **Stefon Harris** 第 46 屆入圍的是**《The Grand Unification Theory》(2003)**，不是《Evolution》。
- **Gianluca Petrella** 的 Django d'Or（2001）、Musica Jazz 最佳新秀（2001）、Down Beat 最佳新進長號手（2006–07）
  **都是頒給他這個人、而且都在本碟之外的年份**，**絕不可寫成《Indigo 4》的獎。**
- ⚠ **Monk/Coltrane《At Carnegie Hall》查無任何葛萊美入圍或得獎的來源**
  （第 48 屆最佳歷史專輯與最佳內頁文字都由 Jelly Roll Morton 的國會圖書館錄音全集拿下）——**正文不得加獎。**

## 第 1617 條（主線，**黑膠店的卡**）：**同期黑膠 4 筆，策展層 18 張零提及**

- ✅ **MMW《End of the World Party》**：**2004 年美版 Blue Note 對開雙 LP `BTE 95633`＋英版 `7243 5 95633 1 2`**。
  ⚠⚠ **黑膠比 CD 多一軌**，D4 逐字標 `vinyl only bonus track`
  ——**那首就是策展層問的「日版多出的那一軌」〈Whiney Bitches〉**（MB 日版軌目逐字標 bonus track）。
  **策展層只提了 2015 年 75 週年再發。**
- ✅ **Patricia Barber《Live: A Fortnight in France》**：**2004 年 Blue Note 美加版雙 LP `jp 5007`。**
- ✅ **Erik Truffaz《Saloua》**：**2005 年 Blue Note 歐版雙 LP `7243 5639771 2`**，
  ⚠ **黑膠曲序與 CD 不同**（A1 是〈Big Wheel〉不是同名曲）。
- ✅ **Monk/Coltrane《At Carnegie Hall》**：2005 年 **Mosaic Records MQ1-231** 單聲道 LP
  ——⚠ **不是 Blue Note 發的，正文提黑膠必須寫明廠牌。**
- 其餘 14 張逐張查 master versions，**確實只有 CD／SACD**。

## 第 1618 條（主線，**事實硬錯誤九處，下游會直接抄錯**）

1. ⚠⚠ **Stefon Harris《Evolution》：〈Nothing Personal〉是 Don Grolnick 寫的，不是 Kenny Kirkland**
   （1987 年 Michael Brecker 首張專輯首錄）。
2. ⚠⚠ **Jason Moran《Same Mother》：「Moran 自己寫六首」是錯的**——他獨力五首＋與 Andrew Hill 合寫〈Aubade〉，
   **〈The Field〉的作者是妻子 Alicia Hall Moran**。
   **→ 這是第 1560-AB／AK 那種「標題數字與自身清單對不上」的第三例，而且這次出在策展層。**
3. ⚠ **《Same Mother》〈I'll Play the Blues for You〉的作者是 Jerry Beach**，不是 Albert King
   ——正文要寫「Albert King 唱紅的那首」。撞陳列的結論仍成立。
4. ⚠ **Don Byron 在《Ivey-Divey》上不只吹單簧管**：Discogs credit 逐字 `Clarinet, Bass Clarinet, Tenor Saxophone`
   ——**而葛萊美入圍的就是這一軌的獨奏。** 另〈In a Silent Way〉作者欄同時掛 **Joe Zawinul** 與 Miles Davis，
   **不可只寫 Miles**；**製作人是 Hans Wendl**，策展層沒寫。
5. ⚠ **Joe Lovano《I'm All for You》：Hank Jones 錄音時是八十四歲不是八十五歲**
   （1918-07-31 生、錄音 2003-06；2004 年 5 月發行時才 85）——**正文寫年齡必須指明是錄音時還是發行時。**
6. ⚠ **Dr. John《N'Awlinz》：Cyril Neville 在第 4、7、18 三軌**，不是「第 4 軌」。
   **另漏了兩個大名字：第 8 軌小號是 Dave Bartholomew、第 13 軌中提琴是 Clarence「Gatemouth」Brown。**
7. ⚠ **Trijntje Oosterhuis：Hoorweg＋Delfos 合編的是七軌不是八軌。**
8. ⚠ **Trio Töykeät《Wake》：PlayRoom（赫爾辛基）在 Discogs 上是 `Edited At` 不是錄音室**；
   錄音地點是 Järvenpää 的 **Kallio-Kuninkala**，母帶在 **Chartmakers**。
9. ⚠ **Anita Baker 的貝斯手是七位不是六位。**

## 第 1619 條（主線）：**策展層說「查不到」但查得到的五件，以及一處推翻外部來源**

1. ⚠⚠ **Tania Maria《Intimidade》的「編制完全查不到」不成立**：策展層只看了三筆 Discogs 條目，
   **美版 1237298 的 credit 欄是滿的**（三位貝斯、兩位鼓、兩位打擊、製作、母帶），
   **還連帶查到巴黎 Studio Acousti、2004 年 1／2／4 月錄、2005 年 4 月 26–28 與 5 月 11–13 混音。**
2. ⚠⚠ **同一張的「MB 目錄號 `0946 3 51935 2 7` 查不到對應實體」也不成立**
   ——**那就是 Discogs 美版 1237298 的目錄號。MB 沒記錯，它記的是美版、策展層看的是歐版。**
3. ⚠ **Rubalcaba《Paseo》的第 9 軌找到了：是第 6 軌〈Meanwhile〉**（Apple 724853041 逐軌可核，Discogs 軌目漏列）
   ——**正文現在可以寫「九首」。**
4. ⚠ **Trio Töykeät《Wake》的榜位查得到**：**芬蘭專輯榜首週第 15 名、共掛六週**。
   策展層寫「不得引用任何榜位」**是因為只查了 Billboard**。
   **Perko《Kuunnelmia》也有一篇 2005 年 3 月的芬蘭樂評**（SuomiJazz，Pentti Ronkanen，3.5 星），**並非全無評介。**
5. ⚠ **Ayşe Tütüncü Trio《Panayır》的背景查得到**（她本人官網）：2004 年組的新團、當年 3 月起演出、
   曲目是她專為「兩管一鋼琴」寫的。
6. ⚠⚠ **推翻外部來源**：**英文維基寫 Trijntje Oosterhuis《Strange Fruit》「released on 22 March 2004」是錯的**
   ——**Billboard 的 Hits of the World 荷蘭專輯榜 2004-02-14 p52 就已經以 `NEW` 掛在第 5 名、02-21 p44 升到第 2 名。**
   `year` 2004 不變，但**同一頁維基給的兩個演出日因此不可信賴、只有單一來源，已標 uncertain，正文不得寫演出日。**
   （維基另有兩筆可用且與紙本互相印證：**荷蘭榜最高第 2 名、年終第 24 名、兩白金認證**。）

## 第 1620-A 條（主線）：**來源本身有錯四處，已標 uncertain；另五件值得帶進下游**

**來源有錯**：
- **Erik Truffaz《Saloua》**：⚠ **Discogs 歐版 2650307 把 Truffaz 寫成 `Trombone`（長號）**；
  同碟黑膠條目 3047105 才寫 `Trumpet`。**以黑膠條目為準，正文絕不可寫長號。**
- **Don Byron**：Discogs notes 自承盤面把 Ballard MacDonald 拼成 McDonald；
  **英文維基把第 6 軌寫成〈The Good Drag〉，盤面是〈The Goon Drag〉。**
- **Trijntje**：第 9 軌把作詞者 Dorothy Heyward 也掛成 `Arranged By`，是 Discogs 資料錯誤。
- **Rubalcaba**：策展層寫「他在 Blue Note 的最後一張領班盤」**找不到可引來源，已標 uncertain，正文不要寫這個序數。**

**值得帶進下游**：
- **Monk/Coltrane**：1957-11-29 那場是替哈林區 **Morningside Community Center** 辦的慈善演出；
  **BET Jazz 買了 BB-2005-08-27 p11 整版廣告**，並由演員 **Kim Fields** 製作兼執導半小時特輯、訪了兩位大師的兒子，9/27 起播出。
  Billboard 評介另給兩件當時處境：**Coltrane 剛戒掉海洛因、Monk 的夜總會演出證剛恢復。**
- **Anita Baker**：**空降 Top R&B/Hip-Hop Albums 冠軍（一週）**（BB-2004-09-25 p41 逐字），策展層只寫了 Billboard 200 第 4 名。
- **Stefon Harris《Evolution》**：〈Until〉是 **Sting** 的曲、〈King Tut's Strut〉是南非鋼琴家 **Hotep Idris Galeta** 的曲；
  紙本逐字寫他當時三十歲（**有 src 的年齡，可寫**）。
- **MMW**：**John King 不只製作，他在十二軌的作者欄全部掛共同作者。**
- **同批交叉**：美術 **Burton Yount** 一人做了本組四張（Same Mother／Fortnight／Magic Hour／At Carnegie Hall）
  ——⚠ **他在 c-158 也做了四張，跨批同一個人**；製作人 **Nicolas Pflug** 同時在 Saloua 與 Intimidade 美版掛名；
  Jason Moran 同時是 Same Mother 的領班與 Ivey-Divey 的鋼琴手（相隔一週、不同場，已互相擋掉）。

## 第 1620-B 條（主線，**給後批的五個坑**）

1. ⚠ **`BB-2004-05-22.pdf` 的合訂陷阱第三次應驗，但這次量出了分界**：
   **低頁碼（p31）確實屬於 5/22 那一期，p124／p126 則屬於 2004-10-23——分界大約在 p73。**
   **低頁碼可以直接引。**
2. ⚠⚠ **`billboard-bn-*-ocr.txt.gz` 是「關鍵字過濾過」的**：只有帶 Blue Note／jazz 關鍵字的頁進了檔。
   **查非爵士類別的獎（例如第 48 屆最佳歷史專輯）那一頁不在裡面，要另走網路。**
   **這一條很重要——「檔裡零命中」不等於「那一期沒有」。**
3. ⚠ **allmusic／allaboutjazz／jazztimes 本次全部回 403**，樂評層只能走小站與維基。
4. ⚠ **Apple `lookup?upc=` 一定要跑北歐與全歐**（見第 1614 條）。
5. ⚠⚠ **Discogs 的「同碟不同條目，credit 有的空有的滿」本組中了兩次**（Intimidade、Same Mother 的歐版才有逐軌作者欄）
   ——**判「編制完全查不到」之前，一定要把該 master 轄下的每個條目都開過一遍，尤其是美版。**
   **這是第 1367／1489／1560-E 條那一族的第 N 次應驗，已經可以當成鐵則。**
