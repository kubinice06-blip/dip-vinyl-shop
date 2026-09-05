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
