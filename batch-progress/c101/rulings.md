# c-101 遊戲原聲正典：策展層裁定（2026-09-05）

批次：**c-101 遊戲原聲正典（a＝日本廠牌世代、b＝獨立遊戲與西方大作）**，`lineType: 廣度`。
依 `CLAUDE.md`「裁定權下放」（2026-09-02 店主指示），以下皆為策展層當場裁定，未上呈店主。
判準沿用三條：有先例照先例、可逆就直接定、卡住整條線就當場定。

---

## 1. 派工信說「Christopher Larkin 池中已 3 張」——實掃是 0，那個數字錯了

派工信與 `CURATION-BRIEF-c93plus.md` 第六節都寫「Christopher Larkin（Hollow Knight，**池中已 3 張**）」。

**實掃 `seed_cards.json` 全 14,424 列，`Christopher Larkin`、`Larkin`、`Hollow Knight` 三種查法：**

| 查法 | 命中 |
|---|---|
| `Christopher Larkin` | **0** |
| `Hollow Knight` | **0** |
| `Larkin`（寬鬆） | 5，全部無關：XTC《Skylarking》、Kenny Larkin ×2、Larkin Poe、Horace Andy《Skylarking》 |

**裁定：那三張不存在，Larkin 在池中是 0。** 這與第 27 條（取樣只能用來排除，不能用來確認數量）是同一個形狀的
**反面**——這次是簡報**高估**了。本卡照收，並在 `why` 明寫實掃結果。

**順帶把全批的實掃結果記下來，供 c-102 與日後的補遺批引用**（日文／羅馬拼音兩種寫法都查過）：
`植松伸夫`/`Nobuo Uematsu`、`近藤浩治`/`Koji Kondo`、`下村陽子`/`Yoko Shimomura`、
`光田康典`/`Yasunori Mitsuda`、`崎元仁`/`Hitoshi Sakimoto`、`古代祐三`/`Yuzo Koshiro`、
`岡部啓一`/`Keiichi Okabe`/`MONACA`、`目黒将司`/`Shoji Meguro`/`Syouji Meguro`、`伊藤賢治`/`Kenji Ito`、
`菊田裕樹`/`Hiroki Kikuta`、`山根ミチル`/`Michiru Yamane`、`山岡晃`/`Akira Yamaoka`、
`Toby Fox`、`C418`、`Lena Raine`、`Austin Wintory`、`Mick Gordon`、`Jesper Kyd`、`Darren Korb`、
`Grant Kirkhope`、`David Wise`、`Christopher Larkin`、`Gareth Coker`、`Christopher Tin`
——**26 個名字，26 個零**。池中唯一沾到「遊戲」的兩筆其實都不是遊戲：
第 11778 列 `Disasterpeace`《It Follows: Original Motion Picture Soundtrack》(2015) 是電影配樂，
第 9813 列 `すぎやまこういち`《伝説巨神イデオン 総音楽集》(2009) 是動畫。

## 2. 全批 45 張一律 `releaseType: "Album"`、例外欄位留空——§5.6 一次都沒用到

逐張回問 `release-group/<id>?fmt=json&inc=artist-credits+releases`，45 張的型別分佈：

| primary-type / secondary-types | 張數 |
|---|---|
| Album / [Soundtrack] | **44** |
| Album / [] | **1**（Christopher Tin《Calling All Dawns: A Song Cycle》） |
| **primary-type = Compilation** | **0** |

**裁定：45 張全部 `releaseType: "Album"`、`exceptionReason` 與 `exceptionEvidenceUrls` 留空。**
依據 §5.6 明文與 c-90 裁定第 3 條、c-95 裁定第 1 條：`secondary-types` 含 Soundtrack 不是拒收理由、
也不觸發 §5.6；填了例外欄位反而會被 `chk-prop` 判「非合輯卻帶例外欄位」。
**合輯張數 0**（以 §5.6 的定義計）。

這條與 c-95 第 1 條「先掃型別分佈再決定要不要開 §5.6」完全一致：遊戲原聲在 MusicBrainz 上
一律建成 `Album + [Soundtrack]`，**整個品類不會用到 §5.6**。這條要往後傳給 c-102（動畫原聲）。

## 3. 掛名一律取 MB 藝人實體的寫法，即使該張碟的 artist-credit 是另一種文字

日本組有四張的 artist-credit 與同一位藝人其他碟的寫法不一致：

| 卡 | 該 RG 的 artist-credit | MB 藝人實體名 | 卡片採用 |
|---|---|---|---|
| 光田康典《Xenogears Original Soundtrack》 | `Yasunori Mitsuda`（拉丁） | 光田康典 | **光田康典** |
| 古代祐三《Bare Knuckle》 | `Yuzo Koshiro`（拉丁） | 古代祐三 | **古代祐三** |
| Akira Yamaoka《SILENT HILL 2 ORIGINAL SOUNDTRACKS》 | `AKIRA YAMAOKA`（全大寫拉丁） | Akira Yamaoka | **Akira Yamaoka** |
| 下村陽子（Street Fighter II 那幾筆） | `Yoko Shimomura`（拉丁） | 下村陽子 | 見第 5 條，不收 |

**裁定：依裁定第 6／70／120 條，掛名取 MB 藝人實體實際使用的那一種寫法，另一種進 `queryAlias`。**
理由與第 120 條（印度批用拉丁、希臘批用希臘文）完全同構——**規則沒變，答案不同**：
光田、古代的 MB 實體是日文，山岡晃的 MB 實體是**拉丁**（`Akira Yamaoka`），所以他那張掛拉丁。
不這樣做就會在池中造出 `光田康典` 與 `Yasunori Mitsuda` 兩個鍵（裁定第 49 條要防的東西）。

**Apple 的掛名不參與這個決定**：Apple `jp` 店面幾乎全部用日文／片假名（`植松伸夫`、`山岡晃`、
`トビー・フォックス`、`オースティン・ウィントリー`、`イェスパー・キッド`、`グラント・カークホープ`、
`クリストファー・ティン`），`us` 店面用拉丁——**同一個 `collectionId` 在兩個店面顯示不同語言的掛名**，
它反映的是店面在地化，不是身分。

## 4. 兩張改掉 MB 的連字號，一張改掉 MB 的 credit 順序

- **C418《Minecraft - Volume Alpha》《Minecraft - Volume Beta》**：MB 標題用 **en dash（U+2013）**，
  Apple 與 Ghostly International 的廠牌頁都用 ASCII 連字號。**裁定：取 ASCII 版。**
  依第 117 條的分界——MB 的 en dash 是資料庫排版慣例，不是「另一種有人這樣印的寫法」；
  而且 `chk-prop.mjs` 明文擋非 ASCII 連字號（c-50 反模式）。MB 版進 `queryAlias`。
- **Grant Kirkhope《Banjo-Kazooie》**：MB 標題用 **U+2010**（`Banjo‐Kazooie`），同上處理。
- **崎元仁 / 岩田匡治《FINAL FANTASY TACTICS Original Sound Track》**：MB artist-credit 的順序是
  「岩田匡治 & 崎元仁」，Apple（jp／us 同一 collectionId 255190011）掛的是「崎元仁 & 岩田匡治」，
  且崎元是本案音樂總監。**裁定：卡片取 `崎元仁 / 岩田匡治`**，依 c-95 裁定第 3 條的先例
  （MB 的 credit 順序是建檔偏差、有獨立證據支持另一個順序時，採後者），分隔符依裁定第 16 條用 ` / `。
  MB 原順序已寫進 `mbNote`，`fix-rgmbid` 不得以「掛名對不上」換掉這個 MBID。

## 5. Street Fighter II 不收——MB 上三個候選沒有一個釘得住

派工信的骨幹名單點名「下村陽子（Kingdom Hearts、**Street Fighter II**）」。實查三個候選：

| MBID | 盤名 | 年 | 轄下 release |
|---|---|---|---|
| `dc1c2d02` | Street Fighter II: The World Warrior | 1992-01-13 | **只有 1 筆，GB／Promotion** |
| `897a988b` | Street Fighter II: The World Warrior (SNES) | 1992-06-10 | **只有 1 筆，JP／Bootleg** |
| `3adaab96` | Street Fighter II The Definitive Soundtrack | 2015-11-24 | 2 筆 Official，但是 2015 年 Laced Records 的後世整編 |

日本原盤《ストリートファイターII G.S.M. CAPCOM 4》(1991, Alfa) 在 MB 上查無；
唯一相近的 `42e38696`《ストリートファイターII COMPLETE FILE》(1992) 的 artist-credit 是
「カプコンサウンドチーム & アルフ ライラ」——**掛的是團隊不是作曲家**（派工信第 2 點明文要作曲家掛名）。
2015 年那筆掛三位作曲家（下村陽子／阿部功／西垣俊），走裁定第 16 條會變成三人斜線鍵，
下游 Apple 命中率極低。

**裁定：本批不收，記進未收清單並註明「可進 §1 補遺批」。** 依第 73 條（釘不住就不收）。
下村陽子改以《LIVE A LIVE》(1994)、《聖剣伝説 Legend of Mana》(1999)、《Kingdom Hearts》(2002) 三張進池。

## 6. 骨幹名單外自行補進的五位，以及沒補的三位

派工信允許「名單外的同型作曲家可以自己加，在 `why` 說明實掃結果」。補進 **5 位**：

| 補進 | 卡 | 為什麼算同型 |
|---|---|---|
| **菊田裕樹** | 聖剣伝説2 Original Sound Version (1993) | 聖剣伝説這條線在三位作曲家之間交棒，伊藤賢治→菊田→下村陽子，池中三段都空 |
| **山根ミチル** | 悪魔城ドラキュラX〜月下の夜想曲〜 (1997) | 派工信「名單外可加」明列的 Michiru Yamane |
| **Akira Yamaoka** | SILENT HILL 2 ORIGINAL SOUNDTRACKS (2001) | 日本大廠內部作曲家、MB 轄下 18 個 release、2019 年 Mondo 黑膠，形狀與名單內各位一致 |
| **Gareth Coker** | Ori and the Blind Forest (2015) | 派工信「名單外可加」明列 |
| **Christopher Tin** | Calling All Dawns: A Song Cycle (2009) | 派工信「名單外可加」明列 Baba Yetu 的 Christopher Tin，見第 7 條 |

**沒補的三位，理由記下來免得日後重查**：
- **Motoi Sakuraba（桜庭統）**：MB 藝人實體 `ea809832` 存在，但名下目錄以 Tales／Star Ocean 系列為主，
  單張的正典地位不如已收的 26 張；本批額度已滿，留給補遺批。
- **Olivier Deriviere／Jessica Curry**：MB 有條目，但兩人的代表作在 MB 上多為單筆數位 release，
  再發脈絡薄，`why` 寫不出「後來誰把它做成黑膠」那一段；不勉強收。
- **すぎやまこういち（Dragon Quest）**：池中已有他一張（第 9813 列《伝説巨神イデオン 総音楽集》2009），
  但那是動畫。**Dragon Quest 這條線歸 c-102 或補遺批比較乾淨**——他的 DQ 目錄在 MB 上以
  「交響組曲」形態為主（管弦編曲盤），照派工信第 1 點要釘原聲盤的話得另做一輪判斷，本批不開。

## 7. Christopher Tin《Calling All Dawns》收——但它不是原聲盤，理由要寫清楚

這是本批 45 張裡**唯一一張 `secondary-types` 為空**的卡。它是一張十二首的聯篇歌集，
開場曲〈Baba Yetu〉原是 2005 年《Sid Meier's Civilization IV》的主題曲，
2011 年以本輯的錄音拿下葛萊美最佳器樂編曲伴唱獎——**遊戲音樂第一次拿葛萊美**。

**裁定：收，但在 `risk` 明寫「這不是一張遊戲原聲盤」。**
理由是這批的場景定義是「遊戲原聲正典」而不是「原聲盤這種商品」，而這張碟本身就是
「遊戲主題曲進到唱片工業」這件事的節點。他純遊戲原聲的兩張（《Civilization VII》2025、
《Offworld Trading Company》2016）本批不取，留給日後補遺。
這條可逆（改的是卡單一列，不是卡池結構），依下放判準第 2 條直接定。

## 8. 「刻意不釘」共 167 個對照組 MBID（分佈在 43 張卡上）——編曲盤與重製盤是這批最大的假陽性來源

依派工信第 1 點與裁定第 162 條，全部寫成 `刻意不釘：<id>《盤名》（理由）、…` 的固定格式，
與正面的「釘 release-group」宣告分屬不同句子，中間不插入正面字樣。分成四類：

| 類 | 例 |
|---|---|
| **編曲盤**（`Piano Collections`／`Orchestral`／`Arrangement`／`JAZZ`／`Remix`／`Symphonic`） | Piano Collections: Final Fantasy IV／VI／VII／IX／XII、Final Fantasy VI: Grand Finale、Final Fantasy IV: Celtic Moon、Chrono Trigger: The Brink of Time、CREID、Myth: The Xenogears Orchestral Album、CHRONO CROSS Orchestral Arrangement、Symphonic suite from ACTRAISER、ハイラル・シンフォニー、ムジュラの仮面 オーケストレーションズ、NieR Orchestral Arrangement、Undertale - A Piano Collection、Banjo Kazooie: Re-Jiggyed |
| **後世重製／復刻盤**（`PIXEL REMASTER`／`REVIVAL DISC`／`HD`／`Remastered`／`-2024-`） | FINAL FANTASY I〜VI PIXEL REMASTER 各張、FF IV／VI／VII／VIII／IX ORIGINAL SOUNDTRACK REVIVAL DISC、LIVE A LIVE HD-2D Remake、聖剣伝説2 SECRET of MANA (2018)、Legend of Mana Remastered、FFXII THE ZODIAC AGE、ゼルダの伝説 時のオカリナ 3D、SILENT HILL 2 Original Game Soundtrack (2024)、Chrono Trigger Original Soundtrack (1999／2009 兩筆) |
| **黑膠選輯與盒裝**（是後製商品不是原盤） | FINAL FANTASY VINYLS、Final Fantasy VII Compilation Vinyl、FF IX 25th Anniversary Vinyl、FINAL FANTASY TACTICS Best Selection - Vinyl Soundtrack、KINGDOM HEARTS 20TH ANNIVERSARY VINYL LP BOX、NieR…Vinyl Box Set |
| **同名／近名假陽性** | FF IX Original Soundtrack **PLUS**、Transistor: Original Soundtrack **Extended**、Hades: **Singles**、DELTARUNE Chapter 2／3+4、Minecraft Volume Alpha↔Beta、DOOM↔DOOM Eternal、Celeste **B-Sides**、Majora's Mask 的兩筆選輯 |

**特別點名兩組給下游**：
1. **光田康典《クロノ・トリガー》**：正確釘位是 1995 年的日文 RG `9e5bbb98`，
   MB 上另有兩筆英文標題的《Chrono Trigger Original Soundtrack》（`335a2416` 1999 DigiCube 重製、
   `c19cb7ee` 2009 DS 版）——**卡片盤名是日文、對照組標題是英文，兩者零重疊，
   標題比對分數會反過來**（裁定第 162 條那個「盤名被縮短過就會配到別人」的鏡像）。
2. **Darren Korb《Hades》**：`bc728e2f`《Hades: Singles》(2018) 與 `dc4818c3`《Hades: Original Soundtrack》(2020)
   是同一部作品的兩個 release-group，兩筆都掛 Darren Korb、盤名都以 Hades 開頭。
   能舉證挑哪一個（軌數 30 對上 2020 年 CD 的 16＋14），所以照第 73 條可以收；釘 `dc4818c3`。

## 9. 店面：日本組 `jp`、西方組 `us`，但兩邊都試過了

派工信的 GAME 店面序（`jp` 第一，其次 `us gb de fr ca au`）**兩組都逐張試過 jp 與 us**。結果分成三種：

| 形狀 | 張數 | 例 |
|---|---|---|
| jp 與 us 都命中、可用 | 31 | 植松四張、光田《Xenogears》《Chrono Cross》、崎元《FFT》《FFXII》、古代兩張、岡部兩張、菊田、伊藤、Akira Yamaoka、下村《LIVE A LIVE》《Legend of Mana》（此二張只有 jp 命中）、b 組除 DOOM Eternal、Banjo、DKC2 之外的 16 張 |
| jp 與 us 是**兩個不同的 `collectionId`** | 2 | 植松伸夫《FF IX》（jp 75003561／us 62444522）、Toby Fox《DELTARUNE Chapter 1》（jp 1443724416／us 1443475587） |
| **兩個店面都沒有可用的官方條目** | 12 | 近藤浩治 3 張、目黒将司 2 張、下村陽子《Kingdom Hearts》、崎元仁《VAGRANTSTORY》、山根ミチル、Grant Kirkhope、David Wise、Mick Gordon《DOOM Eternal》，以及光田康典《クロノ・トリガー》（Apple 只有 2008 年 DS 重製版 324080907，不是 1995 原盤，不得當本卡的固定試聽） |

**查無的那 12 張有共同結構**：任天堂（近藤、Kirkhope、Wise）、Atlus（目黒）、Disney 版權（Kingdom Hearts）、
Konami 舊作（月下の夜想曲）、Bethesda 數位獨佔（DOOM Eternal）——**都是版權方沒有把碟放上串流**，
不是比對擋掉（裁定第 152 條的分界：這些是「搜到 0 筆」或「搜到了但目錄裡沒有這張」，
不是「搜到了卻配不上」）。這 12 張的固定試聽預估 `unavailable`。

## 10. 封面：45 張 CAA release-group 端點全部 200

逐張實測 `https://coverartarchive.org/release-group/<id>`，**45/45 回 HTTP 200**。
封面這一關本批零風險，包括 Apple 完全查無的那 12 張。這與非拉丁線的既往經驗相反
（c-91 的台灣線有多張 CAA 404），原因是遊戲原聲的 MB 編輯社群把封面補得很齊。

---

## （主線追加，2026-09-05）第 1 條：**b 組五張誤記 unavailable 全部救回、一張 ready 是錯配**

**五張救回**（都以 `lookup?id=<collectionId>&entity=song` 覆核過曲目列攤得開且每軌有 previewUrl）：

| 卡 | 正解 | 探測落空的原因 |
|---|---|---|
| Toby Fox《DELTARUNE Chapter 1 OST》 | us 1443475587（40 軌） | 卡片用「OST」、Apple 用「(Original Game Soundtrack)」 |
| Austin Wintory《Journey》 | us 1553230092（18 軌） | **卡片盤名只有一個單字**，被 Apple 的長副標吃掉 |
| Jesper Kyd《Assassin's Creed II》 | us 1640108379（35 軌） | 羅馬數字 II 對阿拉伯數字 2 ＋ **彎撇號對直撇號** |
| Disasterpeace《FEZ》 | us 1765770688（26 軌） | ⚠ **七店的 search 端點全回 0、目錄端點有**——裁定 173 的實例 |
| Christopher Tin《Calling All Dawns》 | us 1526759916（12 軌） | Apple 沒有「A Song Cycle」那個副標 |

**一張 ready 是錯配，已改判 unavailable**：Grant Kirkhope《Banjo-Kazooie》原記
jp 1592541500「Banjo Kazooie: **Re - Jiggyed**」——**那是 2021 年的 10 軌重編曲盤**，
不是 1998 年那張 17 軌原盤。**而且策展層的 mbNote 早就把它寫成「刻意不釘」**
（裁定 153 附錄那個形狀第二次：**策展層已經指名不要的東西，探測層又把它配了回來**）。
Kirkhope 六店完整目錄（各 44–46 筆）逐筆看過，**Apple 上沒有原盤**。⚠ 下游不得改配該 id。

**兩張確認查無**：DOOM Eternal（Mick Gordon 六店目錄無任何 Eternal 專輯，只有第三方翻奏）、
Donkey Kong Country 2（四店搜到的八筆全是翻奏／鋼琴／lofi 改編）。
**這是遊戲原聲特有的陷阱**：查無的那幾張，搜尋結果裡**塞滿了翻奏與改編**，
比「什麼都沒有」更容易讓人配錯。

## 第 2 條：**三個 ready 疑點的結論——軌數看起來不對，其實都對**

- **UNDERTALE 101 軌就是原盤軌數**（MB 兩筆 Materia Collective 數位 release 皆 101 軌；**黑膠才是 41 軌**）。
- **C418 兩張的新 collectionId 是整份目錄重新遞送**（同 artistId 底下 2010／2011／2013 年舊碟全配了新 id），
  24／30 軌與 MB 數位原盤逐數相符。**「id 看起來很新」不等於「是後來的版本」。**
- **DOOM 31 軌與 MB 2016-09-28 Bethesda 數位版逐數相符**（MB 的 `first-release-date` 2016-05-27 是一筆 **Bootleg**）。

## 第 3 條：**數位版與實體版的軌數落差是這條線的常態**

b 組 19 張裡有 **6 張**的黑膠／CD 軌數少於數位：
Minecraft Alpha 24→12、Beta 30→17、Celeste 21→19、DOOM 31→20、Ori 32→24/25、**Undertale 101→41**。
**行文寫軌數時要說清楚是哪一種載體**，或乾脆不寫。

另：**DKC2 美版帳面 55 軌，但真正的樂曲只有前 29 軌**
（第 30–34 軌是 [silence]，之後全是數秒音效）——**不得寫「五十五首」**。

## 第 4 條：**Calling All Dawns 不是遊戲原聲帶**

`secondary-types` 是空的。它是一張獨立的合唱／管弦作品，
其中〈Baba Yetu〉出自《文明帝國 IV》。**型態照實記（裁定 167），不得寫成遊戲原聲。**

## 第 5 條：**擋下策展層 2 處（Undertale 卡），另覆核成立它自己的一處更正**

- **「Toby Fox 名下唯一一張完整長篇原聲」——與來源相反。** Deltarune Chapter 1（40 軌，**本組自己就收了**）、
  Chapter 2（47 軌）、Chapters 3+4（78 軌）都是 Materia Collective 的完整原聲盤。
- **「2010 年代獨立遊戲音樂有形化的起點」——無來源**，且 Minecraft Volume Alpha 2011-03-04 就上架、
  2015 年進 Ghostly 黑膠。
- **覆核成立**：策展層自己更正的「Christopher Larkin 池中是 0 張不是 3 張」屬實
  （規劃書那個數字是錯的）。

**時序主張查證通過、可以寫的**：
Journey 是葛萊美 Best Score Soundtrack for Visual Media **史上第一張入圍**（未得獎）；
〈Baba Yetu〉是**史上第一次葛萊美頒給為電子遊戲寫的作品**（第 53 屆，**得獎的是本輯的錄音不是 2005 遊戲版**）；
Bastion 是 Korb 配樂的**第一款**電玩；
Minecraft Volume Alpha 是 Rosenfeld 的**第一張**商業發行、2025 年入選 National Recording Registry 的**第二件**電玩音樂；
Banjo-Kazooie 是**最早採用垂直重混的遊戲之一**（維基導言原話是「one of the first」，**不得寫「第一款」**）。

## 第 6 條：**遊戲年 vs 原聲年，19 張全部並列進 `yearVerified`**

同日 4 張（Undertale、Celeste、ABZÛ、Transistor）；
**原聲早於遊戲 3 張**（Minecraft Alpha 早 8 個月、Hollow Knight 早 2 週、Hades 早 1 天）；
原聲晚於遊戲 9 張，落差最大的是 DOOM（5/13 → 9/28）與 Minecraft Beta（2011 遊戲 → 2013 原聲）；
Banjo-Kazooie 美版只有年份、日版晚到 1999-02-17；DKC2 美版 1995-10／日版 1996-03。
**「原聲早於遊戲」這件事本身反直覺，行文提年份時要確認講的是哪一個。**
