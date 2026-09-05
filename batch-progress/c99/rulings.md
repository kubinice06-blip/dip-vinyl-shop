# c-99 世界音樂目錄深度：策展層裁定（2026-09-05）

依 2026-09-02 店主下放，本批所有策展／管線裁定由策展層自決，決定後記在本檔。
判準沿用三條：有先例照先例、可逆就直接定、卡住整條線就當場定。

---

## 1. Apple 沒有古巴店面——WLD 店面序裡的 `cu` 一律回 HTTP 400

本批的店面序 `us gb fr ng za ci sn jm eg in cu mx co br de ca` 裡，
**`cu` 在 45 張的每一次查詢上都回 HTTP 400**（不是 403、不是 0 筆，是請求本身被拒）。
Apple Music 沒有古巴店面。

**裁定：`cu` 從 WLD 序移除，不再當成「查無」的一個資料點。**
這與裁定第 163 條同族——「這個店面不存在」與「這個店面查到 0 筆」在日誌裡長得一樣，
本批因為 400 這個明確狀態碼才看得出來。**`ng`／`ci`／`sn`／`jm`／`eg` 都真的回得了結果
（0–25 筆不等），只有 `cu` 是不存在。** 各卡的 `risk` 都已寫明。

諷刺的是這一格最痛的正好是 Celia Cruz——本批唯一的古巴籍藝人，她的碟只能在 `us` 命中。

---

## 2. 掛名分裂：一律沿用池中既有寫法，不因 MB 主名不同而製造新分裂

本批有六組掛名，MB 實體名與池中通行寫法不一致。**全部採池中寫法**，
MB 的寫法進 `queryAlias`、並在 `risk` 逐一列出查過的每一種：

| 卡片掛名（＝池中寫法） | MB 實體／artist-credit | 其他查過的寫法 |
|---|---|---|
| U-Roy | **U‐Roy**（MB 用 U+2010 連字號） | U Roy、Ewart Beckford、Daddy U-Roy、U. Roy |
| Yabby You | **Yabby U**；本張 credit 是「Vivian (Yabby U) Jackson & Prophets」 | Vivian Jackson、Yabby You & The Prophets、Yabby You aka Jesus Dread |
| Dr Alimantado | **Dr. Alimantado**（帶點） | Doctor Alimantado、Winston James Thompson |
| Orchestra Baobab | **Baobab - Gouye - Gui de Dakar**（1980 那張）、Orchestre baobab Gouye Guy de Dakar（1983 那張） | Orchestre Baobab |
| Franco & le TPOK Jazz | Franco et son tout puissant T.P. O.K. Jazz／Franco & le OK Jazz | Franco、Franco Luambo、Franco Luambo Makiadi、OK Jazz、Orchestre T.P.O.K. Jazz |
| Umm Kulthum | **أم كلثوم**（MB 主名是阿拉伯文） | Oum Kalthoum、Om Kalthoum、Om Kalthom、Oum Kaltsoum、Oum Koulsoum、Om Kalsoum |
| Juan Luis Guerra y 440 | **Juan Luis Guerra 4.40** | Juan Luis Guerra、Juan Luis Guerra 440 |
| A.R. Rahman | **A. R. Rahman**（帶空格） | AR Rahman、Allah Rakha Rahman |
| R.D. Burman | **Rahul Dev Burman** | R. D. Burman、RD Burman、Pancham |

**理由**：`audits/pool-artist-name-splits.md` 已經記著七組待修的分裂，本批不新增第八組。
改掛名是卡單欄位、可逆；改完再讓池裡多一種寫法則會擴散到下游每一支比對腳本。

**U-Roy 那一筆要單獨提**：MB 藝人實體的名字用的是 **U+2010 HYPHEN**，
池中與 Apple 都用 ASCII `-`。這是裁定第 49 條在**同一書寫系統內**的變形——
兩個字串在螢幕上一模一樣、在 `===` 下不相等。

---

## 3. Umm Kulthum 的年份取「歌曲首演年」，不取 MB 的 first-release-date

MB 上她的碟幾乎都是 Sono Cairo 1990 年代重新編目的 CD，`first-release-date` 記 1973／1997／1999。
**池中既有三張已經定了先例**：《Enta Omri》記 1965（MB 記 1964）、《Al Atlal》記 1966、
《Alf Leila wa Leila》記 1969——全部是歌曲首演年。

**裁定：本批五張沿用該先例，年份取歌曲首演年，`rgMbid` 只當身分鍵（裁定第 91 條）。**
五張的年份都有 **Apple 的 `releaseDate` 獨立佐證**（Amal Hayaty 1965、Fakarouni 1966、
Lesa Faker 1960、Ya Msaharny 1972、Hazehi Laylaty 1968），不是單靠推測。

---

## 4. 阿拉伯文與拉丁轉寫的三重去重

裁定第 49 條說跨文字系統的撞卡字串比對看不見。Umm Kulthum 這一組**是三重的**：

1. **原文** أم كلثوم／أمل حياتي
2. **拉丁轉寫**（多套並存）Umm Kulthum／Oum Kalthoum／Om Kalthoum…
3. **同一轉寫的拼寫變體** Amal Hayaty／Amal Hayate／Amal Hayati；
   Ya Msaharny／**Yamsaharny**（Apple 連寫、無空格）；Hazehi Laylaty／Hazehe Lailaty／Hazihi Laylati

**裁定：每張的 `risk` 都要把三層全部列出，`queryAlias` 同時裝阿拉伯原文與所有拉丁拼法。**
Apple 上她的碟**全部是拉丁轉寫掛名、拉丁轉寫盤名**（`us` 店面），
反而 `eg` 店面查不到——這與裁定第 158 條「用原文搜當地店面」的預期相反，
**因為她的數位發行權握在做國際市場的那一方**（第 75 條：storefront 賣的是發行權涵蓋的地區）。
第 158 條沒有錯，錯的是把它當成「一定要用原文搜」；正確的講法仍是**兩種都要交叉試**。

---

## 5. 三張的固定試聽會配到「不同版本」，上架時要在備註標明

| 卡 | Apple 命中 | 差異 |
|---|---|---|
| Umm Kulthum《Amal Hayaty》 | us 922602673「Amal Hayate - Aroh Le Men」 | Apple 那筆是**兩首歌併盤**，MB 是單曲盤 |
| Fania All-Stars《Our Latin Thing (Nuestra cosa)》 | us 1465813337「Our Latin Thing: 40th Anniversary Limited Edition」 | 四十週年版，非 1972 原盤 |
| Juan Gabriel《El alma joven》 | us 404399171「El Alma Joven」(1996) | 1996 年美國再發版，非 1971 墨西哥原盤 |

**裁定：三張照收，但 `risk` 已明寫，下游封面／試聽層要在 manifest 備註版本差異。**
理由是可逆（換 collectionId 是卡單值），而且 §1 的替代方案（人工身分舉證）成本更高。

---

## 6. 再發授權狀態逐筆看：本批抓到兩筆反面證據，兩張都不靠再發舉證

依裁定第 43／57／65／78 條，判定單位是**這一次再發**：

- **Yabby You《Beware Dub》**：2004 年 **Corn-Fed Productions（NL，CF 314）** 那一筆在 MB 上**明標 Bootleg**。
- **Junior Murvin《Bad Man Possee》**：2022 年 **Corn-Fed Productions（CF354）** 那一筆 status 未填——
  依第 78 條，同一家廠牌在本批另一張碟上已有 Bootleg 記錄，**這是反面證據，這一次再發不得單獨當背書**。

**裁定：兩張都收，但兩張的原盤都能釘**（Grove Music GMLP 4 1978／Dread at the Controls D.A.T.C. 007 1982），
**所以不靠再發舉證，Corn-Fed 那兩筆只寫進 `risk` 當警示。**

反面：**Prince Far I《Psalms for I》三筆 release 全部 Official**（Carib Gems 原盤、Fotofon、Pressure Sounds PSCD35），
**Orchestra Baobab《Mouhamadou Bamba》的 2020 年 Stern's Africa 再發標 Official**，
**Dr Alimantado《Sons of Thunder》的 1987 年 Greensleeves CD 版標 Official**——
這三筆是第 57 條的正面例子：授權狀態要逐筆查，不能因為「這條線盜版多」就一概不信。

---

## 7. 合輯 0 張——本批沒有一張走 §5.6

**三張的 MB `secondary-types` 帶 Compilation 或 Soundtrack，但 `primary-type` 全是 Album**，
依 §5.6 明文與 c-90 裁定第 3 條，**照一般 Album 寫、不填例外欄位**：

- E.T. Mensah & the Tempos《King of Highlife Anthology》（Album / [Compilation]）
- R.D. Burman 四張與 A.R. Rahman 三張（Album / [Soundtrack]）
- Fania All-Stars《Our Latin Thing》（Album / [Soundtrack]）、《Latin-Soul-Rock》（Album / [Live]）

**裁定：`releaseType` 全部填 `Album`、`exceptionReason` 與 `exceptionEvidenceUrls` 全部留空。**
填了會被 `chk-prop` 判「非合輯卻帶例外欄位」。

原本規劃要走 §5.6 的 **Tabu Ley《The Voice of Lightness, Volume 2》**（Sterns 2010 考古選輯）
在 Apple 十六個店面全部查無，**改收《Africa Worldwide: 35th Anniversary Album》**（1996 Rounder，us 有）。
理由：同樣是補 Tabu Ley 的深度，但一張有封面與試聽鏈、一張沒有；池中已有 Voice of Lightness 第一集。

---

## 8. 「Shankar」在池中是四個不同的人——本批只動其中一個

| 實體 | MB MBID | 池中張數 |
|---|---|---|
| **Shankar（L. Shankar，小提琴）** | 64c98753-d570-47ec-b5f6-0c0ac0f23811（名下 18 RG） | **1**（《Pancha Nadai Pallavi》1990） |
| Ravi Shankar（西塔琴） | 獨立實體 | 10 |
| Ananda Shankar | 獨立實體 | 2 |
| Shankar Jaikishan（作曲搭檔） | 獨立實體 | 3 |

**裁定：本批的兩張《Who's to Know》《Vision》釘的是 L. Shankar（64c98753），
掛名沿用池中的「Shankar」，並在兩張的 `risk` 與 `mbNote` 明寫另外三位是誰。**
Ravi Shankar 池中 10 張已經夠深，本批不動。

**《Vision》這個盤名是全批最危險的一個**：池中有 DOUBLE《Vision》（不同藝人、不算撞卡），
`chk-prop` 的鍵是 `artist|album` 所以過得了，但上架時只能靠 `rgMbid` 分辨。

---

## 9. 盤名的「一碟多名」與「子字串包覆」：本批七處

第 162 條說盤名被縮短過的卡，子字串比對是反的。本批同型的有七處，全部寫進 `mbNote` 的「刻意不釘」：

| 卡 | 形狀 |
|---|---|
| Franco《Mario 2》 | 池中已有《Mario》——**短的在池中，長的是新卡**，子字串比對會把新卡配到舊卡 |
| Franco《20ème Anniversaire… Volume 2》 | MB 另有 Volume 1（1976），兩者互為子字串 |
| King Tubby《The Roots of Dub》 | 池中已有《Dub from the Roots》——**同一組詞倒裝**，token 排序不敏感的比對會判同 |
| Dr Alimantado《Sons of Thunder》 | 同一張碟 1987 年 CD 改名《Born for a Purpose》，Apple 併寫成「Born for a Purpose (Aka Sons of Thunder)」 |
| Fania《Latin-Soul-Rock》 | **一碟三名**：MB 德國盤叫《Salsa》、XW 盤叫《Featuring Jan Hammer》，而 MB 名下另有一張真的叫《Salsa》 |
| Juan Gabriel《El alma joven》 | MB 另有《…, II》與《…, volumen III》，兩者完整包含本張 |
| A.R. Rahman《Taal》 | 四個字母，MB 轄下另有長標題《Taal: A Subhash Ghai Film》 |

**裁定：這七處一律寫成 `刻意不釘：<id>《盤名》（理由）、…` 的固定格式，標記寫在 MBID 前面（第 162 條第 3 點）。**

---

## 10. 兩張的 Apple 查詢要換字串才命中——第 152／158 條的兩個形狀

- **A.R. Rahman《Slumdog Millionaire: Music From the Motion Picture》**：
  用完整長標題搜，十六個店面**每一個都回 14–25 筆、無一相符**；改用短名「Slumdog Millionaire」才命中。
  這是**第 152 條「盤名太長搜不到」的原樣重現**。
- **Umm Kulthum《Ya Msaharny》**：用「Umm Kulthum Ya Msaharny」搜十六個店面全落空；
  改用藝人名整批列 `us` 目錄才撈到 —— Apple 那筆盤名是**連寫的「Yamsaharny」**。
  這是**第 158 條「搜尋字串與店面要交叉試」的另一面：字串本身的切詞方式也是一個變數。**

**裁定：往後派工單要把「先用短名／先用藝人名列目錄」寫成明示的第二輪，不要只寫「拆到只剩 ASCII」。**

---

## 11. 未收的四張與理由（可進 §1 補遺批 c-113～c-115）

| 藝人 | 專輯 | 年 | 情況 |
|---|---|---|---|
| Tabu Ley Rochereau | The Voice of Lightness, Volume 2 | 2010 | MB `f1344adc` 釘得住（Stern's Africa STCD3056-57，GB／Official），但 **Apple 十六店面全部 0 筆**，封面與試聽兩條鏈都沒有來源。**可進 §1**。 |
| Orchestra Baobab | Ken Dou Werente | 1983 | MB `bcd3ba55` 釘得住（MCA MCA 307，FR／Official），**Apple 十六店面全部 0 筆**。**可進 §1**。 |
| Yabby You | Jah Jah Way | 1980 | MB `32a27203` 釘得住（Island ILPS 9615，GB／Official），**Apple 十六店面全部 0 筆**。**可進 §1**。 |
| Ali Akbar Khan | The Forty Minute Raga: Raga Marwa | 1968 | MB 有**兩筆重複建檔**（`bcb21028` US Connoisseur Society／`94e6a2e1` FR Barclay《Raga Marwa》），Apple 十六店面查無。**先解 MB 重複再談**。 |

另有兩筆是**資料本身有問題、不是查無**，記在這裡供本機參考：

- **Max Romeo《Let the Power Fall》**：MB 兩筆重複建檔（`b262d399` 1971 GB Pama PMP 2010，status 未填；
  `decc932f` 1972 JM Official），**同一張碟兩個 release-group、年份還差一年**。本批改收《Reconstruction》。
- **Junior Murvin《Muggers in the Street》**：MB `19bc34e5` 的 `first-release-date` 記 **2007-11-13**
  （Greensleeves GREWCD70 的 CD 版），實際原盤是 1984 年。年份與 MB 脫鉤太遠，本批改收《Bad Man Possee》(1982)。

---

## （主線追加，2026-09-05）第 1 條：**九張誤記 unavailable、兩張 ready 是錯配** —— 試聽 35/45 → 44/45

**九張救回**（全部以 `lookup?id=<collectionId>&entity=song` 覆核過曲目列攤得開且每軌有 previewUrl）：

| 卡 | 正解 | 探測落空的原因 |
|---|---|---|
| Franco《20ème Anniversaire…Volume 2》 | fr 981590446（5 軌） | **三處變形同時發生**：拿掉「6 Juin」、破折號改冒號、Volume→Vol. |
| Ali Farka Touré & Toumani Diabaté《Ali and Toumani》 | us 1716601796（12 軌） | Apple 作《Ali **&** Toumani》——**c-98 Pete Seeger 那筆的鏡像** |
| The Mighty Diamonds《Stand Up to Your Judgment》 | us 1734234201（10 軌） | 英式拼法「Judg**e**ment」，**只差一個字母** |
| Dr Alimantado《Sons of Thunder》 | us 1251027239（11 軌） | 1987 年 CD 化整張改名《Born for a Purpose (Aka Sons of Thunder)》 |
| Umm Kulthum《Amal Hayaty》 | us 922602673（1 軌 38:22） | 羅馬轉寫不同，作「Amal Hayate - Aroh Le Men」 |
| Umm Kulthum《Fakarouni》 | us 922813005（1 軌 59:38） | 作「Fakarony (Remastered)」 |
| Umm Kulthum《Hazehi Laylaty》 | us 920509422（1 軌 32:06） | 作「Hazehe Lailaty (Remastered)」 |
| A.R. Rahman《Slumdog Millionaire》 | us 1443884661（13 軌） | 盤名過長，且 **Apple 的 artistName 是「Various Artists」——藝人閘必擋** |
| Fania All-Stars《Our Latin Thing》 | us 1465813337（13 軌） | 全店只有 40 週年版那一筆，盤名帶副標 |

**五張 Umm Kulthum 的 `trackCount=1` 不是「只上架了一段」**——MB 那幾筆 CD 也都是單軌，時長逐秒或差幾秒相同。

**一張 ready 是錯配**：Yabby You《Beware Dub》原記 us 1891251455，那是 artistId 1889077333
**「Yabby You aka Jesus Dread」**（同名次要實體）的 ℗2026 拼盤，**原盤十軌缺〈Freedom〉、第一軌來自別張碟**。
正解 us 1165105352（℗2016 Pressure Sounds，原盤十軌全在）。
**這是 c-98 第 1 條的第二個實例**：`artistOk` 的雙向子字串比對擋不住「本名＋後綴」的另一個實體
（前次是 Hank Williams vs Hank Williams III）。

**一張真的沒有**：Franco《Mario 2》——十一個 Franco／OK Jazz 藝人實體的 fr 目錄（合計 277 筆）
＋us／gb＋曲名反查全空。**⚠ 陷阱要記**：us 389199096《Mario》的**第 4 軌就叫〈Mario 2〉**，
長度與原盤差七分鐘、混了兩張碟，**不得取用**。

## 第 2 條：**Taal 的固定試聽不能取首軌** —— 裁定 157 的形狀

A.R. Rahman《Taal》us 1536519242 十二軌曲名時長全對，**曲序卻是英文字母序**：
首軌是 2:51 的片頭器樂〈Beat Of Passion〉，原盤開場是〈Ishq Bina〉（7:45）。
**固定試聽已人工改指〈Ishq Bina〉。** 往後印度原聲帶要預期這種排序。

## 第 3 條：**Max Romeo《Reconstruction》年份改 1978 → 1977**（裁定 127 的直接適用）

Discogs master 260014 的 17 個版本裡 **14 筆直記 1977**（英美加 Mango ILPS/MLPS 9503，含卡帶與八軌帶），
維基專屬條目與 Apple ℗1977 都是 1977；MB 只有一筆無佐證的 GB Mango 1978。
牙買加 Dynamic DY 3378 的 1978 是**晚一年的壓片**，不是另一說。
**Discogs 原盤直記優先於 MB（第 127 條），證據一面倒，直接改值。** `prop-a.json` 與卡單都已改。

**對照**：U-Roy《Rasta Ambassador》卡單 1977 **正確**——MB RG 的 1991-07-26 是資料庫缺 1977 黑膠 release 的結果，
不是另一說（U-Roy 名下 57 個 RG 分頁列完只有這一筆）。**「MB 只有晚年的 release」不等於「有兩說」。**

## 第 4 條：兩張缺封面是 CAA 真的沒有

Tabu Ley Rochereau《Africa Worldwide》的 rg 88f11e11 與其**唯一** release 都 404；
U-Roy《Rasta Ambassador》的 rg c5162767 與其**兩筆** release 全 404。
兩張走 §4 `apple-verified-collection`，依裁定 134 同時當試聽來源：us 1443763479、gb 724913612。
**又兩張落在「放寬 §4」那個待店主裁定的議題上。**

## 第 5 條：**軌數與曲序偏差八處，全部維持配對但鎖原盤值**

Roots of Dub 14 vs 原盤 12、Shalom Dub 18 vs 16、Rasta Ambassador 11 vs 10、
**Psalms for I 11 vs 10 且曲序整個倒過來**、**Sons of Thunder 11 vs 10 且曲序重排**、
Bad Man Possee 原盤軌數 6／9 兩說（`originalTrackCount` 留空）、Hit the Road Jack 兩面對調兩說、
Mouhamadou Bamba 1980／1981 兩說。**行文一律以原盤為準，曲序倒置的兩張不得依 Apple 的順序敘述。**

另：**Kati Patang 18 軌不是二合一**，是 Saregama 2017「歌曲＋對白」版（七首歌各有帶／不帶對白兩版
＋一軌 23 秒純對白＋兩軌 Reprise），**原盤 7 軌**。同型：Amar Prem 9 軌／原盤 6、Yaadon 9 軌／原盤 6。
**這三張行文不得說「這張碟有 N 首歌」。**

**E.T. Mensah 69 軌排除疑慮**：＝四片 17+17+17+18，與 MB 逐軌相同，是同一套。

## 第 6 條：**Latin-Soul-Rock 的錄音地點，Apple 與原盤相反**

Apple 在八軌全部標「Roberto Clemente Coliseum, San Juan, Nov 1973」；
1974 年 Fania SLP 00470 **原壓說明欄印的是「Recorded Live at Yankee Stadium, Aug. 24, 1973」** ＋紐約 Good Vibrations 錄音室，
**只有〈Soul Makossa〉註明錄於聖胡安（5/31）**。**行文一律以原盤為準。**

## 第 7 條：**掛名亂區的實查結果**（本批最需要下游注意的一項）

- Orchestra Baobab《Mouhamadou Bamba》在 MB／Discogs 掛的是**「Baobab-Gouye-Gui de Dakar」**
  ——與卡片字串零重疊，實體同一個。
- **Yabby You 一張碟五種掛名。**
- King Tubby 兩張的**製作人（Bunny Lee）與掛名要分開寫**。
- Junior Murvin《Bad Man Possee》的製作人是 **Mikey Dread**，四邊的 artist-credit 都沒把他掛進去。
- 印度原聲帶的 artist-credit：MB 常是作曲家、Apple 常是群星或演唱者。

## 第 8 條：**擋下策展層說法 34 處（a 組 20／b 組 14），其中 14 處與來源相反**

a 組九處與來源相反：Mario 2「上下集」（實為〈Mario 2〉〈Mario 3〉兩首續集＋〈La Réponse de Mario〉）、
Hit the Road Jack「第一張自製」（是 1974《Reggae Phenomenon》）、
King Yellowman「首張專輯」（是 1982《Mister Yellowman》；「第一個簽美國大廠的 dancehall 藝人」是 **1981 簽約**不是 1984 發行）、
Sons of Thunder「第一張／Greensleeves 第一張」（1978《Best Dressed Chicken》在前）、
Roots of Dub「Tubby 第一張 dub」（1973《Blackboard Jungle》更早）、
Rasta Ambassador「Front Line 第一張」、Reconstruction 不得寫成成功敘事（維基明寫 did not match its predecessor）、
Africa Worldwide 不得寫「合輯」（Discogs 備註明寫 newly recorded）、
Bad Man Possee 不得拿〈Police and Thieves〉當背書。

b 組五處與來源相反：**Amal Hayaty「與同年的《Enta Omri》」**（Enta Omri 是 1964、本曲 1965）、
**1942: A Love Story「過世前完成的最後一部」**（維基寫他**在音樂完成前就過世**）、
Vision「ECM 這條線上被最多爵士名單收錄的一張」（那個評價屬 1985 年的《Song for Everyone》）、
Siempre en mi mente「從新人變成主流歌手的那一段」（維基明寫這是**第十張**）、
Slumdog「第一次由美國大廠全球發行」（發行廠牌是 **M.I.A. 的 N.E.E.T.**）。

**累計：策展層的時序／序數主張被攻破第八次，與來源相反的累計達十四處。**

**查證通過可以寫的**：Tribute to Ndiouga Dieng 三條、Ali and Toumani「生前最後一張」（Diabaté 原話）、
Isaiah「Front Line 首發」、Psalms for I「首張專輯」＋「獻給不識字、無法自己讀聖經的人」、
Jara《Canto por travesura》「生前最後一張」（限定錄音室專輯）、Neşet Ertaş 那句 tr 維基原話。

## 第 9 條：**Franco《20ème…Volume 2》的 1989 是 CD 年不是曲目年**

Discogs release 2259629 備註「Originally release on LP in 1976」，
而 2382533 就是那張 1976 年 African 360.082/83 雙唱片——**本張五軌就是它的 C／D 兩面**。
卡單值不動（裁定 141），**行文不得斷言「1989 年的專輯」**。

## 第 10 條：兩處資料不採用

- **Lesa Faker 的原盤軌數與歌長都不採**：MB 唯一 release 是 1973 法國盤，把同一首歌拆成 A／B 兩面，
  時長 900+960 秒（整分鐘，形狀像估值）；Apple 那一軌 45:28 比它長十四分半。
  **行文不得寫原盤軌數或歌長。**
- **Fakarouni 的 MB 完全沒有年份**（RG 與 release 都無日期），年份靠 ar 維基的「1966-12-01 首唱」。

**另推翻策展層 risk 一處**：Amal Hayaty 那筆 Apple「是雙曲併盤、與 MB 單曲盤不同版」不成立
——曲目列只攤得出一軌，且與 MB 逐秒相同。
