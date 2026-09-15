## 第 400 條（2026-09-15，c-133 a 組）：**實收 23／23——五位全滿，其中 9 張是從 c-131 第 356 條 E／F 的未收清單直接撿回來的**

| 掛名 | 池中**實際**現有 | 簡報名額 | **實收** | 其中撿自 c-131 第 356 條 |
|---|---:|---:|---:|---:|
| 原信夫とシャープス・アンド・フラッツ | **0**（c-131《Sharps & Flats In Newport》1967 未上架） | 5 | **5** | **4**（F 類） |
| 高橋達也と東京ユニオン | **0**（c-131《Got The Spirit》1976 未上架） | 5 | **5** | **3**（E 類） |
| 宮間利之とニューハード | **3**（《New Herd》1974／《Sunday Thing》1976／《Take The "A" Train》1975，全部已上架） | 4 | **4** | 0 |
| 猪俣猛（含 猪俣猛とサウンド・リミテッド） | **0**（c-131《サウンド・オブ・サウンド・リミテッド》1970 未上架） | 5 | **5** | **1**（E 類） |
| 鈴木宏昌（含 鈴木宏昌トリオ） | **0**（c-131《ロック・ジョイント琵琶》1972 未上架） | 4 | **4** | **1**（E 類） |

⚠ **簡報第五節寫的「池中現有」五個數字（1／1／3／1／1）裡，只有宮間利之的 3 是真的**——
其餘四位的「1」都是 c-131 尚未上架的卡。本組逐位實掃 `seed_cards.json` 全 16,450 列確認：
**線上池裡日本第一世代大樂團這一塊，實際上只有宮間利之とニューハード 三張。**

**撿回來的 9 張**（rgMbid 全在 c-131 第 356 條裡，本組逐張用 `release-group` ＋ `release` 端點覆核過掛名、年份、廠牌、catno、載體）：
- **F 類（被 `CAA 404` 擋掉的）4 張**：原信夫《Operation Glenn Miller》1963／《Western Dynamics》1964／《LITTLE GIANT》1969／《エレクトロニクス！》1970。
  依 c-132 第 382 條照收，**每張的 `risk` 都寫了封面可走的具體路徑**（四張全部是 apple-verified-collection，collectionId 與軌數逐張列出）。
- **E 類（額度未收、CAA 200）5 張**：高橋達也《Soul Porter》1978／《Black Pearl》1980／《Up In The Blues》1981、
  猪俣猛とサウンド・リミテッド《Innocent Canon》1971、鈴木宏昌《High-Flying》1976（另《Primrose》1978 也在 E 類，合計 6 張，見下）。

**第 356 條 F 的原信夫第五張《Big Band Dynamics》本組改用別張，理由見第 401 條。**

---

## 第 401 條（同批，本批立）：**原信夫的第五張改收《Oliver Nelson In Tokyo》（年取 1970），不收第 356 條 F 列的《Big Band Dynamics》——原盤年查不到就不要硬收**

`6f1b266c`《Big Band Dynamics》的實情：**MB 轄下只有 2008-10-29 的 KING KICJ-2231 CD 一筆**，
first-release-date 就是 2008，**CAA 404**。走過的路（全部實測）：

1. Apple jp 盤名搜尋「ビッグ・バンド・ダイナミックス」0 筆、「Big Band Dynamics Sharps Flats」只回《TANGO DYNAMICS》與《Western Dynamics》兩張別碟。
2. **Apple jp 藝人目錄 `lookup?id=351331901&entity=album` 拉完 64 張，裡面沒有任何一張叫 Big Band Dynamics**
   （同批 King 2008 年 KICJ-22xx 復刻的《ビッグ・バンド・スコープ第1集／第2集》《ビッグ・バンド作戦》《ビッグ・バンドの挑戦》《ミュージカル・スペクタクラー》**都在**，就是缺這一張）。
3. King Records 官方 2024-01 的數位化新聞稿逐張列出十張的錄音年與原盤編號
   （マーチング 1961／SKC-6、タンゴ・ダイナミックス 1962／SDS-3・SKJ-7003、ウェスターン・ダイナミックス 1964／SKJ-7015、
   ALL IN LOVE IS FAIR 1977／SKA-3013、ジャイアント・ステップス 1978／SKA-3016 …）——**本張不在那十張裡**。

**結論：原盤年、原盤編號都查不到，只能取 2008。** 依簡報第四節第 1 型雖然「取 MB 值並在 risk 寫明可能是再發」是合法的，
但**一張 1960 年代的大樂團碟在卡面上寫 2008，對池子沒有意義**——判準 2（可逆：改的是卡單值不是卡池結構）當場改收別張。

**改收 `c9353f6e`《Oliver Nelson In Tokyo》，年取 1970**，因為它同時滿足三件事：
(1) MB 的 RG artist-credit 是**單一元素**「Nobuo Hara & His Sharps & Flats」，不是第 321／385 條要擋的合掛；
(2) **CAA 200**，不必走例外路線；
(3) 原盤年有三條同向證據——Apple jp 官方條目 `1579015484`（℗ 1970 Nippon Columbia、日期 1970-12-25、**10 軌與 MB 一致**）、
Discogs master `1082416`（轄下有 1970 Columbia 原盤與 1976 再發 `r7177266`）、以及公開一致記載的錄音日 1970-09-04／09-07（日本コロムビア第一スタジオ）。

⚠ **代價與風險都寫進卡了**：這張的**實體盤面掛名是「Oliver Nelson, Nobuo Hara and His Sharps & Flats」兩人平列**，
而**池中已有 Oliver Nelson 五張**——這是 c-132 第 386 條那個形狀，`chk-prop` 抓不到，見第 405 條。
**《Big Band Dynamics》的 rgMbid 留在這裡供主線翻案**：若本機願意接受「年取 2008、risk 標明是 King 2008 復刻」，可以直接建卡。

---

## 第 402 條（同批）：**年份逐張判——兩張改判、一張錄音年與發行年分離、十四張無分歧，另有五張是「MB 只有年份、店面有精確日期」**

| 卡 | MB first-release-date | 取 | 型（第 352／364／383 條） | 證據 |
|---|---|---:|---|---|
| 原信夫《Oliver Nelson In Tokyo》 | **2013-11-20**（只建 Columbia COCB-54079 CD） | **1970** | 第一型 | Apple jp `1579015484` ℗ 1970、10 軌與 MB 一致；Discogs master 1082416 有 1970 原盤；錄音日 1970-09-04／07 |
| 猪俣猛《The Dialogue》 | **2012-07-25**（只建 AUDIO LAB OVGL-00024 單層 SACD） | **1977** | 第一型 | Discogs release `7192321` 條目題「Vinyl (LP, Album), 1977」；錄音日 1977-11-28／29 有 Octavia 自家商店頁與多家二手條目同向 |
| 原信夫《Operation Glenn Miller》 | 1963 | **1963** | 第二型的反向 | King 官方數位條目副標自寫「〈1962年録音〉」——**錄音 1962、發行 1963**，`year` 取發行年、錄音年寫進 risk |

**⚠《The Dialogue》的殘餘風險本組沒有消掉，已寫在卡上**：錄音在 1977 年 11 月 28／29 日，
**原盤若壓到跨年就會是 1978**；catno 三說並存（ALJ-1047／ALJ-1059／ALJ-HG1），
Discogs release 頁在本環境回 **403**、拿不到盤面欄位。**研究層必須拿一手盤面或廠牌目錄覆核年份與 catno。**
Octavia 商店頁另有一句編碼破損的「first released in 1970」，與錄音年直接矛盾，本層判為亂碼、不採用。

**MB 只到年或只到月、但店面有廠牌自家上架的精確日期的五張**（依 c-132 第 383 條的通則，**年份都不變**，精確日期記在卡上供研究層用）：
高橋達也《Soul Porter》MB 1978-11 → Apple 1978-11-25；鈴木宏昌《High-Flying》MB 1976-08 → Apple 1976-08-25；
宮間利之《Perspective》MB 1969 → Apple 1969-07-01；《土の音》MB 1973 → Apple 1973-11-25；《Nio & Pigeon》MB 1972 → Apple 1972-09-25。
**第 383 條要求的旁證在宮間利之這位掛名上是成立的**：他另外兩張（《Perspective》《Orchestrane》）兩邊年份完全一致。

**兩個獨立來源逐日相符的三張**（最乾淨）：猪俣猛《Drum Shot》MB 1971-07-10 ＝ Apple 1971-07-10；
《Drummer Man》MB 1975-05-25 ＝ Apple 1975-05-25；原信夫《Western Dynamics》MB 1964 ＋ Apple 1964-10-20 ＋ King 官方新聞稿「1964 録音／SKJ-7015」。

**一筆日期分歧、年份不變**：猪俣猛とサウンド・リミテッド《Innocent Canon》MB 1971-02-27 vs Apple 1971-07-01。

---

## 第 403 條（同批）：**額度外、已查證、rgMbid 已備妥、可直接進下一批的清單**

**宮間利之とニューハード**（名額 4 已滿，這是第五、六張，**兩張都是單一 credit、CAA 200**）：
- `7c1ca8b7`《Eternity? ・Epos》1972（Polydor GR-1001，JP Official，12" Vinyl **4 軌**；credit「Toshiyuki Miyama & His New Herd Orchestra」單一元素）。
  ⚠ Apple 兩種查法皆 0 筆——**Polydor 日本的爵士目錄在 Apple 上幾乎全空**，與 c-131 第 359 條那條規律同向。
- `9c4a116b`《Orchestrane New Herd Plays John Coltrane》1977（DENON JAZZ YX-7566-ND，JP Official，12" Vinyl 7 軌；
  Apple jp `1474202840` 7 軌、℗ 1977 Nippon Columbia／DENON、日期 1977-07-17，**軌數與 MB 一致**）。見 `enum/jp-denon.json`。

**鈴木宏昌**（名額 4 已滿，這是第五張）：`54d583d9`《Colgen World》1996-02-28（Toshiba Records TOCT-9365 CD 6 軌 Official，
另有 2008-07-04 Think! Records THCD-080 復刻；**CAA 404** → 依 c-132 第 382 條不構成排除理由，封面走 Discogs 或 Apple）。見 `enum/jp-toshiba.json`。

**原信夫とシャープス・アンド・フラッツ**（名額 5 已滿）：
`6f1b266c`《Big Band Dynamics》2008-10-29（KING KICJ-2231 CD 12 軌，CAA 404，**原盤年查不到，見第 401 條**）、
`e0bedb46`《Sharps & Flats '67》2009-02-25（Columbia Music Entertainment COCB-53798 CD 10 軌，CAA 404；
Apple jp `351372005`《シャープス・アンド・フラッツ'67/ロジャース作品集》10 軌但 ℗ 2009，**原盤年同樣拿不到**）、
`6c0eb992`《LAST FOREVER》2008-12-12（ewe records，**SACD 雙層各 13 軌，release status 空**，CAA 404；
Apple jp `1121585499` 13 軌但日期 2016-06-22／℗ 2016 Nippon Columbia，**與 MB 的 2008 分歧未解**）。
**這三張都卡在同一個問題上：年份沒有可信來源。**

**猪俣猛**（名額 5 已滿）：`7b7ae972`《New Rock In Europe: Sound Ltd. 2》2016-12-14（Universal Music UPCY-9548 CD 8 軌）——
⚠ **`primary-type` 是 `null`，不過 `ALBUM_ONBOARDING.md` 的 Album 門檻，本批不收**；
它與宮間利之《四つのジャズ・コンポジション》(UPCY-9546)、山本邦山《Beautiful Bamboo-Flute》(UPCY-9547) 同屬 2016 年環球日本的 UPCY-954x 復刻段，
**原盤是 1970 年代 Philips／東芝時期的錄音，MB 端的 primary-type 一填就能收。**

---

## 第 404 條（同批，本批立）⚠ **推翻 c-131 第 356 條 F 的第二道自造門檻：「MB 轄下只有數位 release」不是排除理由——猪俣猛 兩張因此收回**

c-131 第 356 條 F 的原文：「**猪俣猛個人**：《Drum Shot》1971、《Drummer Man》1975 **只有數位 release**」。

**這道門檻與 c-132 第 382 條推翻的 `CAA 404` 是同一個家族**（用一個看得見的表面特徵當判準，而那個特徵與真正的成因只是相關、不等同——第 253 條記過四次的形狀）：

1. **`ALBUM_ONBOARDING.md` 的門檻是 `primary-type=Album`**，全文沒有任何一條要求「轄下必須有實體 release」。
2. **簡報第二節第 2 點明文**：「MB 有 RG 但沒掛廠牌的照收——`label` 寫實體盤面的廠牌，`risk` 註明資料庫端未登記」。
   「只有數位 release」比「沒掛廠牌」還輕，**舉重明輕**。
3. 本批已經有同形先例照收：原信夫《LITTLE GIANT》1969（`1e261c1e`）**也只有 Victor 的數位 release、也沒有 catno**，
   而它是 `enum/jp-victor.json` 主線列舉時就標成「可收缺口」的一筆。
4. **這兩張的年份反而是全批最乾淨的**：MB 的 1971-07-10／1975-05-25 與 Apple 官方條目的日期**逐日相符**（第 402 條）。

**處置**：兩張照收，`label` 寫「日本コロムビア」並在 `risk` 與 `mbNote` 註明
「MB 轄下只有 NIPPONOPHONE 數位 release、目錄編號資料庫端未登記」（第 259 條：這是 `release` 端點回來的實情，不是「MB 未填」的推測）。

**⚠ 但 c-131 擋《ドラム・メソード》的理由本組維持**：那是教則唱片，與本張不同。
本組另外用 Apple 直查曲目（第 254 條的第三種查法）把 **《Drummer Man》24 軌裡有 7 軌是日語獨白**這件事查出來並寫進卡——
**那不是不收的理由（MB primary-type 是 Album、有編曲、有伴奏樂團），但研究層引軌數時不知道會失真（第 251 條）。**
同理 `6f0bfdd6`《This Is Rhythm》**56 軌**、`41b2dbbc`《Rhythm Is Fun》39 軌、`8ff5a693`《Rhythm Is Fun 2》32 軌
本組判定為節奏示範集，**不收**——判準是曲目形態，不是載體或軌數本身。

依判準 1（c-132 第 382 條就是先例）＋判準 3（不決定就少兩張）當場定。

---

## 第 405 條（同批）⚠ **跨組與跨批的撞卡風險：五筆「另一位掛名在別批名單上」，`chk-prop` 一筆都抓不到**

`chk-prop` 的折疊鍵是 `掛名＋盤名`（c-132 第 386 條、c-130 第 322 條講過同一個限制）。以下五筆**本組刻意不收或已收但要標**：

| 碟 | 本組的處置 | 另一個可能的掛名 | 在哪一批 |
|---|---|---|---|
| **原信夫《Oliver Nelson In Tokyo》1970（`c9353f6e`）** | **已收**，掛 MB 的單一 credit「原信夫とシャープス・アンド・フラッツ」 | **Oliver Nelson**（Discogs master 1082416 與實體盤面是兩人平列） | **池中已有 Oliver Nelson 五張**（《The Blues and the Abstract Truth》《Stolen Moments》《Screamin' the Blues》《Afro/American Sketches》《More Blues and the Abstract Truth》） |
| 高橋達也と東京ユニオン《Montreux The Best '78》（`cb3b1d7a`，Live） | 不收（合掛） | **中本マリ** | **c-134 b 組**（中本マリ 4 張） |
| 猪俣猛《Jazz Rock 琴／日本の民謡》1973（`dc858c5c`，RCA JRS-7234，**CAA 200**，2020 年 Mr Bongo 在英國復刻過） | 不收（**五實體平列**） | **前田憲男**／山本邦山／沢井忠夫／沢井一恵 | **c-134 a 組**（前田憲男 5 張） |
| 鈴木宏昌《By the Red Stream》（`0af5ae13`） | 不收（合掛） | **稲垣次郎とソウル・メディア** | **c-133 b 組**（稲垣次郎 5 張） |
| 鈴木宏昌《Pianic Pianism》1977／《Pianic Pianism Volume II》1978（**MB 查無 RG**，只有 Apple `1714569821`／`1714569923`） | 不收（MB 無 RG，見第 406 條） | **前田憲男**（c-134 a）／**佐藤允彦**（c-132 a） | c-134 a 組、c-132 a 組 |

**另外兩筆是別批已經處理過、本組只是再確認**：
`809303fb`《Modern Ameriachi For You》1966 牽 **猪俣猛（本組）與 白木秀雄（c-132 b）**——c-132 第 385 條已擋；
`bc6cfc57`《牡牛座の詩》1971 牽 **宮間利之（本組）與 富樫雅彦（池中已有八張）**——本組擋。

**給 c-133 b 組與 c-134 的提醒**：上表四張若被你們以另一位的名義收走，**`chk-prop` 不會替你們擋**，要先看這裡。

---

## 第 406 條（同批）：**§1 候選清單——MB 完全查無 release-group、但唱片實體確鑿的碟（不得自造 rgMbid）**

依簡報第二節第 3 點，這份清單交給本機走 §1 人工身分。**每一筆都附查過的關鍵字。**
本組五位的 MB 建檔品質**比 c-132 那四位好得多**（五位全滿、一張缺額都沒有），所以這份清單比第 381 條短。

| 掛名 | 盤名（日／英） | 年 | 廠牌／catno | 查過的關鍵字 |
|---|---|---:|---|---|
| **鈴木宏昌**（＋前田憲男・佐藤允彦） | 《ピアニック・ピアニズム》／《Pianic Pianism - Super Solo Piano》 | **1977-04-25** | 日本コロムビア（catno 待查） | `release-group?artist=e2ece9b8`（9 個 RG 全數列出，無此筆）、`artist:"鈴木宏昌"`、`artist:"Hiromasa Suzuki"`（**全域 0 筆**）、`コルゲン` — **MB 零筆；Apple jp 有 `1714569821`，9 軌、℗ 1977 Nippon Columbia／NIPPONOPHONE** |
| 同上 | 《ピアニック・ピアニズム Vol. II》／《Pianic Pianism Volume II - Super Tri Piano》 | **1978-02-25** | 日本コロムビア（catno 待查） | 同上 — MB 零筆；**Apple jp `1714569923`，7 軌、℗ 1978** |
| **猪俣猛** | 《Sound of Elepian》 | **1976-06-01** | 日本コロムビア（catno 待查） | `release-group?artist=aff0a177`（11 個 RG 全列，無此筆）、`artist:"猪俣猛"`、`artist:"Takeshi Inomata"` — MB 零筆；**Apple jp `1575831080`，12 軌、℗ 1976 Nippon Columbia／NIPPONOPHONE** |
| **猪俣猛** | 《The Dialogue》**1977 Audio Lab 原盤** | **1977** | Audio Lab. Record（**catno 三說：ALJ-1047／ALJ-1059／ALJ-HG1**） | 本批已用 2012 SACD 的 RG `4d9753a9` 收下（第 402 條），但**原盤 release 仍未建檔**，本機補建後可把 release 掛進同一個 RG |
| **原信夫とシャープス・アンド・フラッツ** | 《ビッグ・バンド・ダイナミックス》原盤 | **1960 年代，年不詳** | King（SDS／SKJ 段，catno 待查） | 見第 401 條的三步實測 — MB 只有 2008 KICJ-2231 的 RG，Apple 64 張目錄裡無此筆，King 官方 2024 新聞稿的十張裡也沒有 |
| **猪俣猛とサウンド・リミテッド** | 《ニュー・ロック・イン・ヨーロッパ》原盤 | 1970 年代初 | Philips／日本ビクター（catno 待查） | MB 有 `7b7ae972` 但 **primary-type 是 null**（2016 Universal UPCY-9548 復刻），**1970 年代原盤未建檔** |
| **Takeshi Inomata Quintet + 5 Brass** 名下全部 | — | 1960s | 待查 | MB 實體 `1914c40d-76b0-47d3-88fd-8829943a16df`（Group／JP）**存在、名下 0 個 RG**——與第 381 條 A 的四個空殼實體同形，**空殼本身就是證據** |

**重複 RG（第 387 條的形狀，本批出現一組）**：
`235be27e`《Rock Joint Biwa – Kumikyoku Fulukotofumi》2022 **與 c-131 已收的 `09b2e416`《ロック・ジョイント琵琶〜組曲 ふることふみ》1972 是同一張碟**——
前者掛個人實體 `e2ece9b8`、後者掛群組實體 `817512f5`。**兩個 RG 分屬兩個 artist 實體，`chk-prop` 完全看不到。**
本組釘的是 c-131 已用的那一個（轄下有 1972 原盤），**`235be27e` 不釘**。
另一組是 `751d2e0a`《Innocent Canon》轄下**同一張 2007 CD 建了兩筆 release**（KICS-2534，一筆掛 KING、一筆 `[no label]`），
與第 262 條記的 `[no label]` 形狀相同。

---

## 第 407 條（同批）：**掛名處置總表——七個字串、對應 MB 七個實體，本批一個新分裂都沒造**

| 卡片用的掛名 | 張 | MB 實體 | 池中既有 | 處置 |
|---|---:|---|---|---|
| `原信夫とシャープス・アンド・フラッツ` | 5 | e18d9179（Group／JP／1951） | 0（c-131 一張未上架） | 與 c-131 同字串。MB 的 RG credit 有五種寫法（Nobuo Hara And His Sharps & Flats／Nobuo Hara and Sharps & Flats／Nobuo Hara & His Sharps & Flats／原信夫とシャープス・アンド・フラッツ／**原信夫とシャープス＆フラッツ＋1**），依第 355 條一律取實體主名漢字 |
| `高橋達也と東京ユニオン` | 5 | aa55bb8c（Group／JP） | 0（c-131 一張未上架） | MB 的 RG credit 全部就是這個漢字字串。⚠ **Apple 有兩個 artistId，其中一個叫「高橋達也と東京ユニオン・オーケストラ」** |
| `宮間利之とニューハード` | 4 | 11c13132（Group／JP） | **3 張，已上架** | 與池中三張同字串。⚠ **Apple 寫「宮間利之とニュー・ハード」（多一個中黑點）、另一個 id 拼成「Newherd」**，兩邊配對要注意 |
| `猪俣猛とサウンド・リミテッド` | 1 | 397912f7（Group） | 0（c-131 一張未上架） | 與 c-131 同字串。MB credit 是「Takesi Inomata and Sound Limited」（**Takesi 少一個 h**） |
| `猪俣猛` | 4 | aff0a177（Person／JP／1936-02-06） | 0 | ⚠ **Apple 寫「猪俣 猛」（中間半形空白）** |
| `鈴木宏昌` | 3 | e2ece9b8（Person／JP／1940-05-26） | 0 | — |
| `鈴木宏昌トリオ` | 1 | 817512f5（Group／JP） | 0（c-131 一張未上架） | 與 c-131 同字串，照池中先例的漢字＋片假名編制（鈴木勲トリオ／山下洋輔トリオ／今田勝トリオ 同形） |

**「同一位兩個字串」的兩組（猪俣猛／猪俣猛とサウンド・リミテッド、鈴木宏昌／鈴木宏昌トリオ）不是分裂的重複**——
它們對應 MB 兩個不同實體，依第 354／355 條與 c-132 第 388 條（白木秀雄三字串一案）各取實體主名。
**已逐張核過：同一張碟沒有被兩種寫法各收一次。**

**第 307 條反查（同字串不同人）全部做過**：
池中「原信夫」「シャープス」「Sharps」零命中（`Cannonball's Sharpshooters` 是盤名的假陽性）；
「高橋達也」「東京ユニオン」「Tokyo Union」零命中；「宮間」「ニューハード」「New Herd」只命中同一支團
（MB 另有 `Woody Herman's Big New Herd` 與 `Woody Herman And The New Herd` 兩個實體，是別人，**池中零張**）；
「猪俣」「Inomata」零命中；「鈴木宏昌」「Hiromasa」零命中（`Suzukiski` 兩張、`鈴木雅明` 等是假陽性，逐筆核過整個掛名字串）。
**五位都沒有合併風險，本批也沒有新增任何英文字串。**

⚠ **一個要防的合併**：MB 另有 `Takeshi Inomata & Westliners`（`2666607c`）與 `Takeshi Inomata & His Friends`（`6fd1111f`），
**任何以「Inomata」為鍵的比對都會把三個實體混在一起**；`artist?query=artist:"猪俣猛"` **只回兩個實體**，
另外三個要用 `artist:"Takeshi Inomata"` 才查得到——**同一位的實體分散在兩種文字系統，一種查法一定漏**（c-131 第 358 條的 ジョージ大塚 同形，本批第二次應驗）。
**鈴木宏昌 更極端**：`artist:"Hiromasa Suzuki"` **全域回 0 筆**，兩個實體都只有漢字查得到——**第 309 條又應驗一次**。

---

## 第 408 條（同批）：**封面與店面的觀察（只寫觀察不下結論——第 254 條）**

- **CAA**：本組逐張探測 `release-group` 端點，候選 41 個 RG（原信夫 9 ＋高橋達也 9 ＋宮間利之 9 ＋猪俣猛 8 ＋鈴木宏昌 6），
  **5xx 為 0**，404 都是真的沒圖。**入選 23 張裡 CAA 200 的 18、404 的 5。**
- **404 的五張與可走的路（逐張已寫在卡上）**：
  | 卡 | 可走的路 |
  |---|---|
  | 原信夫《Operation Glenn Miller》1963 | **Apple jp `1581401373`（King 官方 2021 數位，12 軌與 MB 一致）** → apple-verified-collection |
  | 原信夫《Western Dynamics》1964 | **Apple jp `1725117671`（King 官方，12 軌一致）** → apple-verified-collection |
  | 原信夫《LITTLE GIANT》1969 | **Apple jp `1773905462`（8 軌一致，℗ 1969 Victor）** → apple-verified-collection |
  | 原信夫《エレクトロニクス！》1970 | **Apple jp `1579014905`（10 軌一致）** → apple-verified-collection |
  | 猪俣猛《If I Were a Bell》1991 | **Apple 三種寫法全部 0 筆 → 只剩 Discogs**（catno TOCZ-9173／年 1991／廠牌 Toshiba 三項都對得上，超過 §4 來源四要求的兩項） |
- **404 的分布**：**四張集中在原信夫一位身上**（1963／1964／1969／1970），另一張是 1991 年的東芝 CD。
  **這再一次證實 c-132 第 389 條的話：CAA 的覆蓋與年代無關，與「有沒有人去傳那張圖」有關**——
  本批 1969 年的《Perspective》、1971 年的《Innocent Canon》《Drum Shot》都有圖，1991 年的 CD 反而沒有。
- **Apple（jp 為主、us 對照，三種查法都跑過）**：23 張裡 **12 張有命中且軌數與 MB 一致**
  （原信夫 4、高橋達也 1、宮間利之 4、猪俣猛 2、鈴木宏昌 1），明細在各卡 `risk`。
  **兩種查法結果不同的有三張**——這是本批最值得記的一條：
  1. 原信夫《エレクトロニクス！》：掛在 **Apple 的另一個藝人 id `1578261324`「Nobuo Hara and His Sharps & Flats + 1」**（名下只有這一張），主 id `351331901` 的 64 張目錄裡查不到，**盤名搜尋才命中**。
  2. 高橋達也《Soul Porter》：掛在 `1687413345`「Tatsuya Takahashi & Tokyo Union Orchestra」，主 id `584187095`（名下只有 2 張）查不到。
  3. 宮間利之《四つのジャズ・コンポジション》：掛在 `449271034`「Toshiyuki Miyama and His **Newherd** Orchestra」（連寫），主 id `366757704`（37 張）查不到。
  **同一位藝人在 Apple 上有兩到三個 artistId、名字拼法還不一樣——第 254 條的坑本批踩到三次。**
- **完全未命中的 11 張**：The Rock Seasons、You're So Vain、Black Pearl、Up In The Blues、Skip Step Colgen、Primrose、The Dialogue、If I Were a Bell，
  以及三張只在 c-131 已收或本批額度外的。**廠牌集中在 EXPRESS／Zen／Polydor 日本／Toshiba LF 段／Union Records／Audio Lab**
  ——c-116 第 6 條、c-121 第 5.2 節、c-131 第 359 條、c-132 第 389 條那條規律的**第五次應驗**。
- ⚠ **c-132 第 391 條點名的 King 2024 年數位化號段在本批應驗一次**：猪俣猛とサウンド・リミテッド《Innocent Canon》的
  Apple jp collectionId 是 **`1777010047`**，落在 1777007028〜1777021265 之間，**7 軌與 MB 一致**。
  同號段還撈到 宮間利之《ORIENTAL BOSSA SOUNDS》`1777009403`（1968-07-10，10 軌）。
  **那個店面對「原盤是 King、但樂團出身別家」的碟一樣有覆蓋**，往後日本爵士老盤仍值得先查。
- ⚠ **列舉檔的覆蓋率在本組是一半**：23 張裡 **12 張**在 `batch-progress/enum/` 十四個檔裡找得到
  （jp-columbia 5、jp-toshiba 4、jp-king 1、jp-victor 1、jp-union 1），
  **另外 11 張只能從 MB 藝人目錄撈**——**廠牌是 Zen、Polydor 日本、Warner 日本、RCA、Audio Lab、Denon 的都漏了**。
  這對主線評估「先撿現成的」能省多少 1 req/s 有用：**本組真正省下的大約是一半。**

---

## 第 409 條（同批，本批立）⚠ **`chk-prop` 的非 ASCII 連字號檢查漏掉 U+30FC；本批兩張盤名做過正規化**

`chk-prop` 的 regex 是 `/[‐‑‒–—―－]/`（U+2010／2011／2012／2013／2014／2015／FF0D）。

| 卡 | MB RG 原題 | 卡面 | 工具會不會亮燈 |
|---|---|---|---|
| 鈴木宏昌《Rock Joint Cither - Silk Road》 | `Rock Joint Cither ー Silk Road`（中間是 **U+30FC 片假名長音記號**） | 改 ASCII 連字號 | **不會**——U+30FC 不在 regex 裡 |
| 鈴木宏昌《High-Flying》 | `High‐Flying`（中間是 **U+2010 HYPHEN**） | 改 ASCII 連字號 | **會**，不改就擋下 |

**兩張都依 c-121 第 3 條與 c-131 第 1 張卡的先例處理**（U+2019 撇號一案）：**卡面改 ASCII、MB 原題進 `queryAlias`**。
《High-Flying》的正規化還有旁證：**Apple jp／us 官方條目 `1557393220` 用的也是 ASCII 連字號**。

**給主線的建議（本條的重點）**：**把 U+30FC 加進 `chk-prop` 的檢查集**。
日本盤的盤名用長音記號當破折號是常態（本批一張、c-131《ロック・ジョイント琵琶〜組曲 ふることふみ》的波浪號 U+301C 是另一種），
**這些字元一樣會讓標題比對整組失準，但目前一個都不會亮燈**。
同理 `宮間利之とニューハード《土の音 ～日本伝説の中の詩情～》` 用的是全形波浪號 U+FF5E——
本組判定**不正規化**（那是日文標題排版的一部分、不是連字號的替代），但**卡上已標明下游必須鎖 rgMbid，因為 Apple 用的是羅馬字題「Tsuchi No Ne」、完全對不上**。

依判準 2（可逆：改的是卡單的盤名值）＋判準 1（有先例）當場定。

---

---

## 第 409a 條（主線 2026-09-15，a 組交件後）：**U+30FC 的檢查不能整個字元擋——只擋「兩側都是空白或 ASCII 英數」的用法**

a 組第 409 條建議把片假名長音記號 `ー`（U+30FC）加進 `chk-prop` 的非 ASCII 連字號檢查集。
**主線實作後立刻退回**：整個字元一律擋會誤傷 `シャープス`、`ニューハード`、`ブルー` 這類合法長音——
同一支代理自己那 23 張就被誤標了 9 筆。

**改成兩側條件**：`/[ A-Za-z0-9]ー[ A-Za-z0-9]/`。長音記號前面一定是假名，所以這個條件不會誤傷；
`Rock Joint Cither ー Silk Road` 與 `Citherー Silk` 都抓得到，`スーパー Jazz` 不會被標。
**84 份 `chk-prop.mjs` 已同步。**

**這一條本身是個教訓**：「加進既有的字元集」看起來是最省事的修法，但那個字元集的成員
（`‐‑‒–—―－`）**全部只有破折號一種用途**，`ー` 不是——**混進去就是把一個精確的檢查變成雜訊產生器**。
與第 344 條同族：**放寬或收緊比對規則之前，一定要拿現有資料跑一次回歸**。

## 第 409b 條（同日）：**主線派工詞的「池中現有」數字是錯的——那是 c-131 的卡，還沒上架**

a 組實掃 `seed_cards.json` 16,450 列：**原信夫／高橋達也／猪俣猛／鈴木宏昌線上池都是零張**，
簡報第五節給的「1」是 c-131 新建的卡（**還在雲端、沒上架**）。只有宮間利之的 3 是真的。
**第 253 條家族第七次。** 名額不受影響（本來就是要補到 7–8 張），但
**往後寫策展簡報的「池中現有」一欄，必須註明是「線上池」還是「線上池＋未上架批次」。**

---

# b 組（日本爵士第一世代・和製ファンクとグルーヴ，22 張／8 個掛名／5 位）

## 第 410 條（2026-09-15，c-133 b 組）：**實收 22／22——但分佈與簡報不同：稲垣次郎 只到 4，缺的一張用 石川晶 第六張補回**

| 掛名（人） | 池中現有 | 簡報名額 | **實收** | 差 |
|---|---:|---:|---:|---:|
| **石川晶**（`石川晶とカウント・バッファローズ` 5 ＋ `石川晶` 1） | 1（c-131《ウガンダ》1972，未上架） | 5 | **6** | **+1** |
| **稲垣次郎**（`稲垣次郎とソウル・メディア` 4） | 3（`Jiro Inagaki and Soul Media`《Head Rock》《Funky Stuff》＋ c-131《Dosojin》） | 5 | **4** | **−1** |
| **ジョージ大塚**（`ジョージ大塚トリオ` 2 ＋ `ジョージ大塚クインテット` 3） | 1（c-131《Loving You George》1975，未上架） | 5 | **5** | 0 |
| **大野雄二**（`大野雄二` 3 ＋ `大野雄二トリオ` 1） | 2（**兩張都是原聲帶**，已上架） | 4 | **4** | 0 |
| **村岡建** | 0 | 3 | **3** | 0 |

補後各位在池中的總數：石川晶 **7**、稲垣次郎 **7**、ジョージ大塚 **6**、大野雄二 **6**（其中爵士盤 4）、村岡建 **3**
——**五位全部落在店主「重點專輯 5–10 張」的區間內**，只有 村岡建 在下限之下，而那是 MB 可得量的全部（第 413 條）。

**±1 的調度依 c-132 第 391 條的先例**（主線當時裁定「店主的標準是每位 5–10 張，所以**超過原名額沒問題**」）
＋判準 1（有先例）＋判準 2（可逆：改的是卡單的一列）當場定。
補上來的那一張是 `75c81ed9`《Okinawa》1976（石川晶とカウント・バッファローズ，CAA 200、單一 credit、King 原盤）。
**稲垣次郎 的缺額不是查法問題**——詳見第 414 條。

---

## 第 411 條（同批，本批立）：**ジョージ大塚 五張裡有四張是被 c-131 自造的門檻擋掉的；除了 CAA 404，`status=Promotion` 也不是排除理由**

派工信指名「ジョージ大塚有 3 張被錯誤的門檻擋掉、rgMbid 已在」。**實際撿回四張**：

| 卡 | rgMbid | c-131 第 356 條 F 的擋法 | 本批的處置 |
|---|---|---|---|
| ジョージ大塚トリオ《Page 1》1967 | `de5ffd98` | **CAA 404** | 收（c-132 第 382 條已推翻該門檻） |
| ジョージ大塚クインテット《Go On'》1972 | `d93860bf` | **CAA 404** | 收 |
| ジョージ大塚クインテット《Sea Breeze》1971 | `f1f64d5b` | **CAA 404** ＋「只有 2014 RG」 | 收（年份處置見第 415 條，**風險最高的一張**） |
| **ジョージ大塚トリオ《Page 2》1968** | `8dbfa30b` | **「1968 原盤 status 是 Promotion、只有 2014 CD Official」** | **收——本條推翻這第三道自造門檻** |

第五張 `6be3e9a9`《Physical Structure》1976 來自第 356 條 **E**（額度未收、CAA 200、原盤 Official）。

### `status=Promotion` 不是排除理由，三條理由

1. **有先例**：c-132 第 384 條處理《祭りの幻想》時明文採用簡報第二節第 2 點「**MB 有 RG 就照收，資料庫端的欄位缺陷寫進 `risk`**」；
   `status` 與 `label-info` 是同一類的 release 層欄位缺陷。**a 組第 404 條同日也推翻了「只有數位 release」這第二道自造門檻**——
   **三道門檻（CAA 404／只有數位／status 非 Official）是同一個家族**，都是第 253 條講的
   「拿一個看得見的欄位當判準，而那個欄位剛好與真正的成因相關但不等同」。
2. **這個 RG 自己有 Official release**（2014-04-23 Columbia COCB-54088，CD 6 軌），不是整張碟從未正式發行。
3. **`Promotion` 反映的是建檔者怎麼標那一筆 release**，不是這張碟有沒有正式發行過——與第 227／253 條同族。

**`year` 仍取 1968**（RG first-release-date），2014 只是復刻；**⚠ 兩版軌數不同（原盤 5、2014 CD 6），已寫進卡的 `risk`。**

**代價量化（給主線）**：c-131 第 356 條 F 對這五位共擋掉 8 張，本批收回 4 張；
其餘 4 張是《Last Summer - Page 3》（2014 RG、盤名帶「 - 」，見第 421 條）、《Maracaibo Cornpone》（**無日期**，見下）、
石川晶《Drums Method》1972（教材盤）、稲垣次郎 的三張合掛（第 414 條）。
⚠ **`ba19a978`《Maracaibo Cornpone》依 a 組第 404 條本來可以收**（「只有數位 release」已不是理由），
**但它的 RG 完全沒有日期**——`year` 是必填欄，**無法建卡**。這是「數位門檻推翻之後仍收不到」的第一個實例。

---

## 第 412 條（同批）：**大野雄二 只收爵士盤——判掉 83 張，依據分兩種欄位，其中 16 張不是靠 `secondary-types` 判的**

簡報第五節明令「大野雄二要只收爵士盤，電影與動畫原聲帶不收；《ルパン三世》系列若 MB 標 `Soundtrack` 一律不收，`rulings` 記一筆」。

| 依據 | 張數 | 說明 |
|---|---:|---|
| **MB `secondary-types` 含 `Soundtrack`** | **67** | 個人實體 `49b6b461` 的 86 個 RG 裡 **66** 個、`大野雄二トリオ` `335ac3db` 的 17 個 RG 裡 **1** 個（`f957ff96`《ルパン三世 アルカトラズコネクション エンディング・テーマ》） |
| **MB 沒標 Soundtrack、但盤名本身就是影視／動畫作品** | **16** | 個人實體 6：`36f5af12`《Proof Of The Wild = 野性の証明》1978-09-25（1978 年角川電影《野性の証明》配樂）、`2fa8846c`《LUPIN TROIS》2004、`83b4f244`《ルパン三世 1978 MUSIC FILE》、`ddab67de`《ルパン三世 1979 MUSIC FILE》、`7705a06d`《ルパン三世 TIME TRIP CD》（primary-type 是 **Single**）、`d1d54988`《LUPIN THE THIRD JAZZ 〜Bossa & Fusion〜》2002；トリオ 10：`a1744aa4`／`763736d1`／`3f45d477`／`0036a21d`／`374bcb4e`／`6951ec01`／`a149cd2c`／`395b77da`／`e6fb4c00`／`1b8b7e47` 的 LUPIN THE THIRD「JAZZ」系列 |
| **合計判掉** | **83** | |

**⚠ 這 16 張是本條的重點**：`secondary-types` 空**不代表**不是原聲帶（第 227 條），
**所以不能只跑欄位篩**——`36f5af12` 盤名裡直接有「野性の証明」、`83b4f244`／`ddab67de` 直接是「ルパン三世 MUSIC FILE」，
**靠盤名與內容判，不靠欄位**。這是第 253 條那條紀律的兩個方向同時用上。

**另外判掉的（非原聲帶理由）**：
`926c9e0a`《Spiced With Brazil》1974（credit「Sonia Rosa & Yuji Ohno」，兩人平列合掛，第 321／385 條；`enum/jp-cbs-sony.json` 列在他名下）、
`2abc8e4f`《サイレント・ダイアローグ》1979（credit「松田昌/大野雄二」，合掛且帶斜線）、
`403b2454`《As Well Be Spring》1975（credit「Ann Young & Yuji Ohno Trio」；Apple jp `1693327310` 同樣掛「アン・ヤング & 大野雄二トリオ」，1975-09-25、8 軌）、
Compilation 三張（`7084d180`《NHK 小さな旅 音楽集》1996、`9ccc5e78`《TOUCH - The Sublime Sound of Yuji Ohno》2023、`13108972`《LUPIN THE BEST "JAZZ"》2015）、
`e0f0abd3`《NAKAURA》（Single、無日期）、`fa8637ea`《Y.O. Connection》2009（額度外，見第 421 條）。

**收的四張全部是 1975–82 年的純爵士／フュージョン 領銜盤**：
《Sound Adventure Act.1》1975（CBS/Sony Special Products YFSC-29）、《My Little Angel》1976（RCA RVL-5505，三重奏掛名）、
《Space Kid》1978（CBS/Sony 25AH 501）、《Lifetide》1982（INVITATION VIH-28104）。
**⚠ 池中他名下原本的兩張都是原聲帶**（`ルパン三世 カリオストロの城 オリジナル・サウンドトラック`、`Original Soundtrack from Lupin III`，皆已上架）
——**本批是他第一次以爵士盤進池**，這正是簡報要補的缺口。

**⚠ 一個暗線寫進卡裡了**：**RCA RVL-5505 是《My Little Angel》(1976)、RVL-5510 是 石川晶《Get Up!》(1975)**
——同一個號段、相隔五號，本批一次收了 1975–76 年 RCA 日本這條和製ジャズ／ファンク 線的兩端。

---

## 第 413 條（同批，本批立）⚠ **村岡建 的主名取「建」不取 MB 主名「健」；而《Takeru》的編制 credit 與 c-132 第 391 條**同形不同判**——因為 MB 沒有另立群組實體**

### 一、「村岡建」vs「村岡健」

MB 實體 `d9e29a7c-390d-4aea-ae4a-c320b6994f27`（Person／JP／1941-01-12）的**主名寫「村岡健」**，
alias 只有兩個：`Takeru Muraoka`（en，primary）與 **`村岡建`**。
兩個都是漢字，2026-08-11 東亞藝人名裁定（有漢字照漢字）分不出來；第 355 條（取實體主名）照字面會得到「村岡健」。

**裁定：取「村岡建」。依據是店面的一手印法，六筆全部一致：**

| Apple jp collectionId | 掛名字串 | 日期／℗ |
|---|---|---|
| `1628447859`《Takeru》 | **村岡建** | 1970-01-01／℗ 1970 UNIVERSAL |
| `1441951865`《Rock Joy in Sax》 | **村岡建** | 2018-11-28／℗ Victor Entertainment |
| `1782229173`《SOFT LANDING》 | **村岡建**とヒズ・ニュー・グループ | 1979-02-05／℗ 1979 King |
| `1681940387`《Ride And Tie》 | **村岡建** & 植松孝夫 | ℗ 2023 UNIVERSAL |
| `1834346786`《Those Were the Days》 | **村岡建** & ビート・ポップス | ℗ 1969 King |
| `1795602449`《Dance Senka》 | …**村岡建** & 津々美洋とオールスターズワゴン | ℗ 1967 King |

**六筆都是「建」，沒有一筆是「健」。** 這與 c-131 第 350 條（秋吉／穐吉：主名取她日本盤與店面的印法、不取 MB 主名「穐吉敏子」）**完全同形，有先例**。
「村岡健」「Takeru Muraoka」「Muraoka Takeru」全部進三張卡的 queryAlias，`risk` 標明 **MB 主名待本機覆核**。

⚠ **合併風險（第 307 條）**：池中「村岡」「Muraoka」**零命中**，但 **MB 上有 `a900bd7e`「村岡実」（Minoru Muraoka，尺八，`enum/jp-1.md` 提到的《Shakuhachi Rock》三張是他）**
——**任何以「Muraoka」為鍵的比對都會把兩位混在一起**，已寫進三張卡的 `risk`。另有 `1c035c7d`「Ju Muraoka」等十餘個同姓實體。

### 二、《Takeru》的 credit：**與 c-132 第 391 條同形，但判法相反**

`52694bfc`《Takeru》1970 的 artist-credit 名字寫「**Takeru Muraoka Quartet**」，**指向的 artist 實體卻是個人 `d9e29a7c`**
——這正是 c-132 第 391 條第二節記的「隱蔽形狀」。**但本批判的結果不同，理由只有一條：**

> **MB 上沒有另立一個同名的群組實體。**（`artist?query="Takeru Muraoka Quartet"` 查無；`Muraoka` 的十餘個同姓實體裡也沒有。）

第 391 條當時之所以要改掛「宮沢昭カルテット」，是因為 MB **另有**群組實體 `281b012b`「Miyazawa Akira Quartet」名下掛著《Kiso》，
照第 355 條字面走會「把四重奏盤併進個人掛名、又與 `281b012b` 名下的碟分家」——**兩邊都不對**。
**這裡沒有第二個實體，分家的問題不存在**，所以回到第 355 條的字面：**取實體主名（經店面校正為「村岡建」）**，
credit 原文「Takeru Muraoka Quartet」與可能的「村岡建カルテット」進 queryAlias。
**附帶好處**：不會在池中造出一個只有一張卡的編制字串。

⚠ **同一位的第三種 credit**：`a363100a`《SOFT LANDING》在 Apple 上掛「**村岡建とヒズ・ニュー・グループ**」（Apple 藝人實體 `1782229174`），
MB 的 credit 則是個人「村岡健」——**同一位在 MB／Apple 兩邊共四種寫法**（村岡健／村岡建／Takeru Muraoka Quartet／村岡建とヒズ・ニュー・グループ），全部進 queryAlias。

### 三、可得量：**他在 MB 上就是 6 個 RG，本組收了可收的全部 3 張**

`release-group?artist=d9e29a7c` 分頁拉完 = **6 個**：收 3（`52694bfc`《Takeru》1970 Philips FX-8502／`8c08d4e7`《Rock Joy In Sax》1971 MCA JMC-5033／`a363100a`《SOFT LANDING》1978 SEVEN SEAS SKS-3005），
不收 3（全是合掛，第 321／385 條）：`0e997400`《Jam In Yokota》1973-06-25（**七人平列，c-132 第 385 條已以 松本英彦 的名義擋過同一張；日野元彦 是 c-134 b 組的掛名**）、
`997a37fa`《Something / Freedom Unity First》2011（Freedom Unity +，盤名還帶斜線）、`5d3ab2d3`《Ride And Tie》2011（+ Takao Uematsu）。
**第 309 條的四種查法並行**（`村岡建`／`Muraoka Takeru`／`Takeshi Muraoka`／`村岡`）＋三種 RG 反查（`artist:"村岡建"` **0 筆**／`artist:"村岡健"` 2 筆／`artist:"Takeru Muraoka"` 4 筆），
**聯集與 `release-group?artist=` 的 6 筆完全相同，沒有漏掉的實體**。
⚠ **他 1960 年代在 King（ビート・ポップス 系）的碟 Apple 上有、MB 上沒有領銜 RG**——列進第 418 條的 §1 候選清單。

依判準 1（第 350／355 條都是先例）＋判準 2（可逆：改的是卡單的掛名值）當場定。

---

## 第 414 條（同批）：**稲垣次郎 只收到 4 張——不是查法問題，是「合掛六張＋池中已有兩張」把可收的碟吃掉了**

他在 MB 上的四個實體共 **19 個 RG**（群組 `ad4be255` 14 ＋個人 `96cb4aa2` 3 ＋オールスターズ `745a98c5` 2；另 `29fd3a16` 稲垣次郎Section、`1f935875`、`7c08c485` 三個實體 **各 0 個 RG**）。逐張分類：

| 分類 | 張 | 明細 |
|---|---:|---|
| **本批收** | **4** | `99c3f630`《Woodstock Generation》1970（Union ULP-1007）、`9938ac9f`《Jazz & Rock "Out"》1970-11-25（Columbia JPS-5215）、`667ea191`《Wandering Birds》1971（Columbia NCB-7013）、`6863111f`《In the Groove》1973（Columbia NCB-7021） |
| **池中已有（英文掛名）** | 2 | `e78be364`《Head Rock》1970、`ab4904ad`《Funky Stuff》1975（`Jiro Inagaki and Soul Media`，後者是 apex `pearl`）——**不得以漢字掛名重收，`chk-prop` 不會亮燈**（第 386 條） |
| **c-131 已收** | 1 | `031550de`《Dosojin》1972 |
| **合掛不收（第 321／385 條）** | **6** | `6e05fed3`《Bridge Over Troubled Water》1971-07-25（**佐藤允彦 & — c-132 a 組掛名**）、`b7502b91`《Something》1971-01（Steve Marcus +）、`da430ecc`《Dock of My Mind》1972-10-25（沢田靖司 &）、`86824bad`《Woman, Robinson Crusoe / Rock Steady》1972-10-25（サミー &，盤名帶斜線）、`0af5ae13`《By the Red Stream》2012（**鈴木宏昌 — c-133 a 組掛名，a 組第 405 條同日也擋下**）、`5a4b6ac8`《決定盤!これぞジャズ・ロック》1968（**前田憲男 — c-134 a 組掛名**） |
| **Compilation，不走 §5.6** | 2 | `7cb80bcc`《WaJazz Legends: Jiro Inagaki》2023、`b93c6bcb`《Jazz Rock Legend》2013 |
| **其餘不收** | 4 | `8710ade8`《Shirisugitanone》1968（オールスターズ，CAA 404、唯一 release 無國別無 status）、`27198e81`《Yottsu No Onegai - Anata Nara Dosuru》1970-04（**歌謡曲翻奏盤，盤名是兩首歌名相接**）、`9401e3d6`《Minatomachi Blues - Ikina Uwasa》1969（**primary-type 是 `null`**，過不了 Album 門檻）、`89d77927`《不滅のスタンダード BALLADS IN JAZZ》2022 |

**依簡報「湊不滿不要硬湊」交出 4 張，不動那兩張邊緣品。**
⚠ **如果主線判定「歌謡曲翻奏盤也算重點專輯」，`27198e81`《Yottsu No Onegai - Anata Nara Dosuru》1970-04 可以立刻建卡**
（credit 是單掛「稲垣次郎」、`enum/jp-columbia.json` 有列、CAA 404 但依第 382 條不構成排除）——**代價與 rgMbid 留在這裡供主線翻案**（做法照 c-132 第 385 條的「代價要講清楚」）。

**⚠ 順帶一筆給主線覆核 c-131**：Apple jp `1508948865`《Dosojin》1972-06-25 掛的是「**沢田靖司 & 稲垣次郎とソウル・メディア**」，
而 MB `031550de` 的 credit 是單掛「稲垣次郎とソウル・メディア」——**c-131 已建的那張卡若照 Apple 會變成合掛**。
本組不動 c-131 的卡，照 MB 的 credit（第 355 條）處理本組的四張。

---

## 第 415 條（同批）：**年份逐張判——19 張無分歧、2 張兩說取 MB、1 張沒有一手來源（最高風險）**

| 卡 | MB first-release-date | 卡面取 | 判 |
|---|---|---:|---|
| **ジョージ大塚クインテット《Sea Breeze》** | **2014-09-24**（Think! THCD-330，**MB 轄下只有這一筆，1971 原盤未建檔**） | **1971** | ⚠⚠ **最高風險**：唯一依據是 **c-131 第 356 條 F 自己的記載**「1971 原盤 MB 未建檔」，**本組沒有取得一手舉證**（Apple `1879753290` 的日期與 ℗ 都是 2014／TEICHIKU；三種寫法搜 jp／us 只回這一筆）。處置照 c-132 第 384 條（MB 只建復刻 → 取原盤年並寫明出處），**卡上已寫死「研究層必須覆核，覆核不成立就改取 2014」** |
| **村岡建《SOFT LANDING》** | 1978（原盤 SEVEN SEAS SKS-3005，**Official**，8 軌） | **1978** | 兩說。Apple jp King 官方條目 `1782229173` 記 **1979-02-05**、℗ 1979 King（8 軌，與 MB 一致）。**不依第 383 條改判**，因為那條通則的前提（同一位藝人其他碟兩邊年份一致）在這裡不成立——見第 417 條 |
| **石川晶とカウント・バッファローズ《Okinawa》** | 1976（只有年份） | **1976** | Apple jp King 官方條目 `1782228406` 記 1976-11-21、℗ 1976 King。**同年，`year` 不受影響**；精確日期寫進 `risk` 供研究層用 |
| 其餘 **19** 張 | 與原盤 release 同年或逐日相符 | 照 MB | 無分歧 |

**19 張無分歧的明細**：石川晶 5（1970／1970／**1971**／1975-03-06／1975）、稲垣次郎 4（1970／**1970-11-25**／1971／1973）、
ジョージ大塚 4（1967／1968／**1972-11-29**／1976）、大野雄二 4（1975／1976／1978／1982）、村岡建 2（1970／1971）。
**其中最乾淨的是《Jazz & Rock "Out"》**：MB `1970-11-25`、Columbia JPS-5215 原盤同日、Apple `1508947302` 同日、℗ 1970 Nippon Columbia、8 軌，**四者逐日相符**。

**「MB 只有年份、店面有精確日期、但同年」的有 5 張**（African Rock 1971-01-01／Get Up! 的 Apple 無命中除外／Back To Rhythm 1975-06-25／
In the Groove 1973-07-25／Okinawa 1976-11-21／Space Kid 1978-01-01）——**`year` 都不受影響，精確日期只寫進 `risk`**。
⚠ **Apple 的「01-01」是月日缺值的占位寫法，不是精確日期**（African Rock、Space Kid、Takeru 三筆都是），**不足以依第 383 條改判**。

---

## 第 416 條（同批）：**重複 RG 一組、同盤名不同掛名三組——後者 `chk-prop` 一個都不會亮燈**

### 一、重複 RG（第 387 條的形狀）

| 同一張碟 | **本卡釘的** | 不釘的 | CAA |
|---|---|---|---|
| 石川晶とカウント・バッファローズ《African Rock》 | **`94fdf242`（1971，轄下有 DAN VC-5003 原盤）** | `1955da79`（**1972**，只有一筆 1972 release） | **200** ／ 404 |

**判準照第 387 條「取轄下有原盤 release 的那一個 RG」。**
⚠ **這一組比 c-132 白木秀雄 那四組更危險：兩個 RG 的年份不同（1971／1972）**，
**下游若以盤名比對會抓到錯的那一個，必須鎖 rgMbid**（已寫進卡的 `risk`）。
**兩個 RG 的 CAA 狀態同樣相反**（原盤 RG 200、另一個 404）——第 382／387 條那條「補圖前先查有沒有重複 RG」再一次應驗，但**方向與 c-132 相反**（那批是原盤 RG 404、復刻 RG 200）。

**本組其餘刻意不釘的重複 RG**：石川晶《Soul & Rock》`56173bc0`（1969-07-25，Columbia）與《ソウル・アンド・ロック》`92ed0cc8`（1969，XW）是同碟兩個 RG；
大野雄二《コスモス》`58122a02`（1981-02-25，CAA 200）與《cosmos》`7f2d0d04`（2007-04-25，CAA 404）是同碟兩個 RG。**兩組本批都不收。**

### 二、同盤名不同掛名（`chk-prop` 的折疊鍵是掛名＋盤名，**一個都不會亮燈**）

| 本批的卡 | 線上池已有的同盤名卡 |
|---|---|
| 石川晶とカウント・バッファローズ《**Get Up!**》1975 | `Ben Harper & Charlie Musselwhite — Get Up!`、`NewJeans — Get Up` |
| 稲垣次郎とソウル・メディア《**In the Groove**》1973 | `Marvin Gaye — In the Groove` |
| ジョージ大塚クインテット《**Sea Breeze**》1971 | `角松敏生 — Sea Breeze` |

**三筆都已分別寫進那三張卡的 `risk`**（依 c-132 第 391 條第七節的做法），提醒下游**不得用盤名比對**。
⚠ **`Marvin Gaye` 這位正是第 391 條第七節點名的兩個實例之一**（那次是《What's Going On》）——**同一位藝人第二次撞上**。

### 三、跨批（第 386 條／a 組第 405 條）

- **《Four Wings》1994（`d19cb142`）本組沒有收**——c-132 第 391 條明文提醒「c-133 b 組（ジョージ大塚）挑碟時要先看這裡」，已照做。
- **《By the Red Stream》（`0af5ae13`）本組沒有收**——a 組第 405 條同日也擋下（它牽 鈴木宏昌 與 稲垣次郎，**兩位分屬 c-133 a／b 兩組**）。
- 本組刻意不釘的合掛裡，**《Bridge Over Troubled Water》牽 佐藤允彦（c-132 a）、《決定盤!これぞジャズ・ロック》牽 前田憲男（c-134 a）、
  《Jam In Yokota》牽 日野元彦（c-134 b）與 松本英彦（c-132 b 已擋）、《Now's The Time》牽 鈴木勲／山本剛トリオ（池中已有）**
  ——**這五張若被別組以另一位的名義收走，`chk-prop` 不會替他們擋。**
- 交件時跑 `chk-prop a b`：**45 張、15 位、跨批撞卡 0、同 rgMbid 不同掛名 0**（96 批、3,996 張）；
  另人工比對 `desc-tools/batches/cards/` 全部卡單檔與線上池 16,450 列，**撞卡 0**。

---

## 第 417 條（同批，本批立）⚠ **第 383 條「King 店面的精確日期優先」有一個反例：`Loving You George` 的 MB 1975 ／ King 官方 1976-12-21——那段號段不能無條件當成比 MB 可信**

c-132 第 389 條記下「**King Records 2024 年起把 1958–85 的日本爵士目錄整批數位化上 Apple jp**
（collectionId 1777007028〜1777021265 那一段），**年份與封面先查這個店面**」，第 383 條並據此立了通則：
「**MB 的 date 只有年份、而店面有廠牌自家上架的精確日期時，精確日期那一方優先**——但要先確認同一位藝人的其他碟兩邊年份一致」。

**本批在同一段 King 數位化（號段延伸到 1782228xxx）裡查到三筆，其中一筆與 MB 分歧：**

| Apple collectionId | 碟 | Apple（King 官方） | MB | 一致？ |
|---|---|---|---|---|
| `1782228406` | 石川晶とカウント・バッファロー《OKINAWA》 | 1976-11-21／℗ 1976 King／8 軌 | 1976（無月日）／8 軌 | ✅ 同年 |
| `1782229173` | 村岡建とヒズ・ニュー・グループ《SOFT LANDING》 | **1979-02-05**／℗ **1979** King／8 軌 | **1978**（原盤 SEVEN SEAS SKS-3005，**Official**）／8 軌 | ❌ **差一年** |
| `1782228228` | ジョージ大塚クインテット《Loving You George》 | **1976-12-21**／℗ **1976** King／4 軌 | **1975**（**c-131 已據此建卡**）／4 軌；us `1552028548` 也記 1975-01-01／℗ Wewantsounds | ❌ **差一年，而且 Apple 的 jp 與 us 兩個店面自己就不一致** |

**裁定（本批立）：第 383 條的通則仍然成立，但它的前提必須逐位檢查，而且「這一段 King 號段」本身不是前提的替代品。**
本批因此**不依 Apple 改判《SOFT LANDING》**，照第 364 條取 MB 的 1978、兩說都寫進卡的 `risk`。
成因與 c-132 第 391 條第四節記的是同一個家族：**「同一段號段／同一家廠牌的資料品質一致」是一個看得見但不成立的表面特徵**（第 253 條那個家族）。

**⚠ 要交給主線的第二件事**：**c-131 已建的 `ジョージ大塚クインテット《Loving You George》1975` 那張卡，年份有 King 官方的反證（1976-12-21）。**
本組**不動別批的卡**，把 rgMbid（`d237615a`）、兩個 collectionId（jp `1782228228`／us `1552028548`）與四軌的軌數一致留在這裡供主線覆核。
（MB 的 `d237615a` 轄下三筆 release：1975/JP/Official、2018-12-05/JP/Official、2021-03-26/XW/Official。）

依判準 1（第 383 條本身就寫了前提）＋判準 3（不決定就 `SOFT LANDING` 的年份卡住）當場定。

---

## 第 418 條（同批）：**§1 候選清單——MB 完全查無 release-group、但唱片實體確鑿的碟（不得自造 rgMbid）**

依簡報第二節第 3 點，這份清單交給本機走 §1 人工身分。**每一筆都附查過的關鍵字。**
**本組五位的 MB 建檔品質遠好於 c-132 那四位**（22 張全滿、只有 稲垣次郎 差一張，而且原因是合掛不是查無），所以這份清單很短。

| 掛名 | 盤名（日／英） | 年 | 廠牌／catno | 查過的關鍵字 |
|---|---|---:|---|---|
| **村岡建**（1960 年代 King 期） | 《Those Were the Days ゴールデン・ビート・ポップス Vol.2》 | **1969-03-10** | King（catno 待查） | `release-group?artist=d9e29a7c`（**6 個 RG 全數列出，無此筆**）、`artist:"村岡建"`（RG 0 筆）、`artist:"村岡健"`（2 筆）、`artist:"Takeru Muraoka"`（4 筆）、`Muraoka Takeru`、`Takeshi Muraoka` — **MB 零筆；Apple jp `1834346786`「村岡建 & ビート・ポップス」14 軌、℗ 1969 King Record Co.,Ltd** |
| **村岡建**（同上） | 《ダンス専科 ゴーゴー編》／《Dance Senka -Go Go Hen-》 | **1967-11-20** | King（catno 待查） | 同上 — MB 零筆；**Apple jp `1795602449`，14 軌、℗ 1967 King**；⚠ **掛名是四人平列（鈴木邦彦とビート・ポップス・メン, 鈴木邦彦, 村岡建 & 津々美洋とオールスターズワゴン），本機補建後仍是合掛，未必能收** |
| **ジョージ大塚クインテット** | 《Sea Breeze》**1971 原盤** | **1971** | **廠牌與 catno 待查**（MB 只有 2014 Think! THCD-330；Apple `1879753290` 的 ℗ 歸 TEICHIKU ENTERTAINMENT，**Union Records 是テイチク 的爵士副廠**，方向可查） | `release-group?artist=60110097`（5 個 RG 全列）、`artist:"George Otsuka"`、`artist:"ジョージ大塚"`、Apple 三種寫法搜 jp／us — **原盤零筆**。⚠ **本批已用 2014 復刻的 RG 收下並取年 1971（第 415 條），原盤 release 仍待本機補建** |
| **ジョージ大塚トリオ** | 《Last Summer》／《Page 3》**原盤** | 1970 年代初 | 日本コロムビア（catno 待查） | 同上 — MB 只有 `024accd0`（2014-03-24 Columbia）、Apple jp `1742233046`《Last Summer / Page 3》2014-04-23、6 軌、℗ 2014 Nippon Columbia，**原盤兩邊都沒有** |
| **ジョージ・大塚カルテット** 名下全部 | — | 1960s–70s | 待查 | MB 實體 `5e73770e-16fe-4ef8-8e0d-e1d719929ea0`（disambiguation「George Otsuka Quartet」，**帶中黑**）**存在、名下 0 個 RG**（c-131 第 356 條 F 已記過同一筆） |
| **石川晶とザ・ゲンチャーズ** 名下全部 | 《Golden Drum》1969-10-25／《Beat Pops / Drum Hits》1970-01-25／《Rock, Rock '70》1970-05-25 | 1969–70 | 日本コロムビア（catno 待查） | MB 實體 `6d2c4e53-1756-465d-8945-16ec5735b991`（alias「Akira Ishikawa and the Gentures」）**存在、名下 0 個 RG**；**Apple jp 藝人實體 `1679734386`「Akira Ishikawa & The Gentures」名下有三張、每張 14 軌、℗ 1969／1970 Nippon Columbia** — **空殼實體＋店面有三張碟，這組合本身就是證據** |
| **Akira Ishikawa & All Stars** 名下全部 | — | 待查 | 待查 | MB 實體 `f28f86cf-726e-400e-aee4-34f6ecbae551`（Group／JP）**存在、0 個 RG** |
| **稲垣次郎Section** 名下全部 | — | 1970s | 待查 | MB 實體 `29fd3a16-cb7a-4908-829c-1b394a118b67` **存在、0 個 RG**（c-131 第 356 條 F 已記過）；另 `1f935875`（Jiro Inagaki & Golden Poppers）與 `7c08c485`（Jiro Inagaki & His Rhythm Machine）同樣 **0 個 RG**，而 **Apple 上另有 `1671576269`「Jiro Inagaki & His Black Rhythm Machine」、`1610142388`「& Just Friends」、`1599141807`「& His Friends」、`1671575843`「& His All Stars」四個實體** |
| **稲垣次郎とソウル・メディア** | 《New Hits Explosion》1972-08-25／《Let It Be》1972-07-25／《Jiro / Sammy & Soul Media Play New Hits》1972-03-10／《Quad Dimension / Rock'n Latin》1971-06-25／《A Sunflower in Greece》1973-05-25 | 1971–73 | 日本コロムビア（catno 待查） | `release-group?artist=ad4be255`（**14 個 RG 全列，這五筆都不在**）；**Apple jp 藝人目錄 `1506558105` 有這五筆、℗ 全是 Nippon Columbia**。⚠ **其中三筆的 Apple credit 是合掛（サミー／岡沢章）、盤名兩筆帶斜線，本機補建後未必能收** |

⚠ **八個空殼實體**（`5e73770e`／`6d2c4e53`／`f28f86cf`／`29fd3a16`／`1f935875`／`7c08c485`，以及 c-132 第 381 條記的兩個）
——**「MB 有人建了團、卻一張碟都沒掛上去」在日本爵士這條線上是常態，不是例外。**

---

## 第 419 條（同批）：**掛名處置總表——八個字串、對應 MB 八個實體，本批一個新分裂都沒造**

| 卡片用的掛名 | 張 | MB 實體 | 池中既有 | 處置 |
|---|---:|---|---|---|
| **石川晶とカウント・バッファローズ** | 5 | `2acbf5b2`（Group／JP，22 個 RG） | c-131《ウガンダ》1972（同字串，未上架） | 照第 355 條取實體主名。**同實體的 credit 有五種寫法**（石川晶とカウント・バッファローズ／Akira Ishikawa & His Count Buffalos／Count Buffalo & The Jazz Rock Band／カウント・バッファロー／石川晶と彼のグループ），全進 queryAlias。⚠ **Apple 上另有「石川晶とカウント・バッファロー」（無ズ，實體 `1782228407`）與「Akira Ishikawa & Count Buffaloes」（`1571811111`）兩個字串** |
| **石川晶** | 1 | `237e787a`（Person／JP，3 個 RG） | 零 | **編制分工不是分裂**（同 c-132 第 388 條 白木秀雄 三字串）。⚠ Apple 寫「石川 晶」（中間有空格） |
| **稲垣次郎とソウル・メディア** | 4 | `ad4be255`（Group／JP，14 個 RG） | **`Jiro Inagaki and Soul Media`《Head Rock》《Funky Stuff》兩張英文字串卡（已上架，後者是 apex `pearl`）** | 依 c-131 第 357 條：新卡用漢字、**既有兩張待本機統一**；本批不自行合併（第 307 條）。⚠ **Apple 把同一個團散成三個實體**（`1506558105` Soul Media 16 筆／`1506558197` Big Soul Media 2 筆／`1506558247` Soul Big Media 1 筆） |
| **ジョージ大塚トリオ** | 2 | `1a76165d`「George Otsuka Trio」（3 個 RG） | 零 | 依 c-131 第 354 條寫漢字＋片假名、**不加中黑**。⚠ **Apple jp 的藝人實體 `1741463116` 掛的字串正是「ジョージ大塚トリオ」——第 354 條的推論這次有店面直接背書** |
| **ジョージ大塚クインテット** | 3 | `60110097`「George Otsuka Quintet」（5 個 RG） | c-131《Loving You George》1975（同字串，未上架） | 同上；Apple 實體 `456851879` 也是這個字串。⚠ **但 Apple 上還有第三個字串「ジョージ・大塚クィンテット」（帶中黑、寫「クィ」，`1879753290`《シー・ブリーズ》）** |
| **大野雄二** | 3 | `49b6b461`（Person／JP，86 個 RG） | **`大野雄二` 兩張原聲帶（已上架）** | **同一個字串、同一位人，不造新分裂**；本批是他第一次以爵士盤進池 |
| **大野雄二トリオ** | 1 | `335ac3db`（Group／JP，17 個 RG） | 零 | 編制分工。⚠ **Apple 上這位散成至少七個實體**（`73404621`／`1582850243`／`203157232`／`149128510`／`1117261778`／`1586951483`／`510287513`） |
| **村岡建** | 3 | `d9e29a7c`（**MB 主名「村岡健」**，6 個 RG） | 零 | **第 413 條：取店面印法「建」，MB 主名待本機覆核** |

**第 307 條反查（同字串不同人）全部做過**：
池中「石川」命中 石川さゆり ×3 等他人、「Ishikawa」零命中；「稲垣」只命中 `稲垣潤一《246:3AM》`（另一位）、「Inagaki」只命中上述兩張；
「大塚」「Otsuka」零命中（`George` 的 47 筆全是他人）；「大野」只命中那兩張原聲帶、「Ono」命中 Yoko Ono ×3（另一位）；
「村岡」「Muraoka」**零命中**。**五位都沒有合併風險。**

⚠ **三個要防的混淆**：
1. **`村岡実`（Minoru Muraoka，尺八）** —— 任何以「Muraoka」為鍵的比對都會把兩位混在一起（`enum/jp-1.md` 的《Shakuhachi Rock》三張是他）。
2. **`石川晶とザ・ゲンチャーズ`／`Akira Ishikawa & All Stars`** —— 與本批的兩個石川晶掛名是三個不同的 MB 實體。
3. **`大野雄二` 與 `小野雄司`／`Yoko Ono`** —— Apple 的 `Yuji Ono`／`Yoko Ono` 在羅馬字上極近。

---

## 第 420 條（同批）：**封面與店面的觀察（只寫觀察不下結論——第 254 條）**

- **CAA**：本組逐張探測 release-group 端點，候選 **46 個 RG**（石川晶 25＋稲垣次郎 19＋ジョージ大塚 10＋大野雄二 11＋村岡建 6，含重複與不收的）。
  **入選 22 張裡 CAA 200 的 16、404 的 6**（Page 1、Go On'、Sea Breeze、Takeru、Rock Joy In Sax、SOFT LANDING），
  **逐張已在卡的 `risk` 寫明「封面要走哪條非 CAA 路線」**（第 382 條的要求）：能走 apple-verified-collection 的 4 張（Page 1 `1743173023`／Sea Breeze `1879753290`／Takeru `1628447859`／SOFT LANDING `1782229173`，**軌數都與 MB 一致**）、
  **只剩 Discogs 的 2 張**（Go On' TBM-13、Rock Joy In Sax 的 1971 MCA 原盤面）。
- ⚠ **`aee391a1`《Count Buffalo Plays Country Rock》1970-10 的 CAA 回 500，不是 404**——**本組唯一一筆 5xx**（c-131 第 359 條與 c-132 第 389 條那兩批各 0 筆）。那張本批不收，但**主線若要收要先重探**。
- **404 的分布**：three blind mice、Takt 1967、Think! Records 2014 復刻、Philips 1970、MCA 1971、SEVEN SEAS 1978
  ——與 c-132 第 389 條記的方向一致（**與年代無關，與有沒有人去傳那張圖有關**）。
  ⚠ **本批出現一個特別乾淨的反證**：**《Page 1》(1967, CAA 404) 與《Page 2》(1968, CAA 200) 是同一個藝人實體、同一家廠牌、相隔一年**，狀態卻相反。
- **Apple**（jp 為主、us 對照，`search`＋藝人目錄 `lookup?id=<artistId>&entity=album` 兩種查法，必要時跑第三步 `entity=song`）：
  **22 張裡 13 張有命中**（African Rock `1577132931`／Back To Rhythm `1557393105`／Okinawa `1782228406`／Jazz & Rock "Out" `1508947302`／
  In the Groove `1508946305`／Page 1 `1743173023`／Page 2 `1742228931`／Sea Breeze `1879753290`／Space Kid `1539321882`／
  Takeru `1628447859`／Rock Joy In Sax `1441951865`／SOFT LANDING `1782229173`／エレクトラム `1656362828`），
  **其中 11 張的軌數與 MB 某一筆 release 完全一致**；⚠ **另 2 張命中的是再發版本而非原盤**
  （エレクトラム 命中的是 2006 Think! 復刻、Rock Joy In Sax 命中的是 2018 Victor 再發），
  ⚠ **Page 1 命中的 8 軌對應的是 2014 CD，不是 1967 Takt 原盤的 7 軌**——研究層配對時以原盤為準（第 262 條）。
  **完全未命中的 9 張**：バキシンバ、Get Up!、Woodstock Generation、Wandering Birds、Go On'、Physical Structure、Sound Adventure Act.1、My Little Angel、Lifetide
  ——**廠牌集中在 Polydor／RCA／Union／three blind mice／CBS/Sony Special Products／INVITATION**，c-116 第 6 條、c-121 第 5.2 節、c-131 第 359 條、c-132 第 389 條那條規律的**第五次應驗**。
- ⚠ **「盤名搜尋落空、藝人目錄才命中」本批踩到兩次**（第 254 條講的坑）：《Page 1》（jp／us 盤名搜尋皆 0，只有藝人目錄 `1741463116` 有）、
  《Rock Joy In Sax》（盤名搜 0，另兩種查法才命中）。
- ⚠ **本批跑了一次第 254 條第三步**：`lookup?id=1879753290&entity=song` 逐軌核《シー・ブリーズ》——
  5 軌（シー・ブリーズ／フール・オン・ザ・ヒル／キャニヴル／ポテト・チップス／ジャンピング・キャッツ），**與 MB 的 5 軌一致**，用來**確認**而不是否決（與 c-132 第 391 條第五節的用法相反）。
- ⚠ **假陽性逐筆排除**：「石川晶 沖縄」回的是 曹雪晶 的二胡專輯 ×5；「ジョージ大塚 ゴー・オン」回 FLOW《GO!!!》、「George Otsuka Go On」回 Roberta Flack《First Take》；
  「Yuji Ohno Sound Adventure」回一整頁ルパン三世 原聲帶；「大塚 Sea Breeze」回 チック・コリア《Sea Breeze》。**全部逐筆核掛名與盤名後排除。**
- ⚠ **King 2024 數位化那一段的號段本批延伸到 `1782228xxx`／`1782229xxx`**（《OKINAWA》《Loving You George》《SOFT LANDING》三筆），
  **但它的日期不是無條件可信**——見第 417 條。

---

## 第 421 條（同批）：**額度外、已查證、rgMbid 已備妥、可直接進下一批的清單**

**石川晶**（名額已滿，這是第七～十張，全部 CAA 200、單一 credit）：
`56173bc0`《Soul & Rock》1969-07-25（日本コロムビア，**1969 年的出道盤**；⚠ 與 `92ed0cc8`《ソウル・アンド・ロック》1969 是同碟兩個 RG，取前者）、
`d4241b67`《Prayer With Faith And Love》1969-09（日本コロムビア）、
`806f15c2`《Dynamic Latin Exotic Sound》1972、
`aee391a1`《Count Buffalo Plays Country Rock》1970-10（⚠ **CAA 回 500，要重探**；Apple jp `1680848563` 1970-10-25、12 軌、℗ 1970 Nippon Columbia）。
⚠ 不建議收的：`fe3c2812`《EXCITING DRUMS / AFRICAN ROCK PARTY》1969-08（**盤名帶斜線**，第 321 條的形狀）。

**ジョージ大塚**（名額已滿，這是第六張）：
`024accd0`《Last Summer - Page 3》2014-03-24（Columbia，**MB 只建 2014 CD、原盤未建檔，與《Sea Breeze》完全同形**；
Apple jp `1742233046`《Last Summer / Page 3》2014-04-23、6 軌、℗ 2014 Nippon Columbia；**CAA 404**）。
⚠ **盤名兩種寫法不同（MB 用「 - 」、Apple 用「 / 」），要收的話盤名與年份都要照第 384／415 條另判。**

**大野雄二**（名額已滿，這是第五～六張）：
`58122a02`《コスモス》1981-02-25（CBS/Sony，**CAA 200**；Apple us `1539321967` 12 軌、℗ 1981 Sony Music Entertainment (Japan)；
⚠ 與 `7f2d0d04`《cosmos》2007-04-25 是同碟兩個 RG，取前者）、
`fa8637ea`《Y.O. Connection》2009-11-27（**CAA 200**，兩筆同日 release）。

**稲垣次郎**：**只有一張邊緣品**——`27198e81`《Yottsu No Onegai - Anata Nara Dosuru》1970-04（單掛「稲垣次郎」、`enum/jp-columbia.json` 有列、CAA 404）。
**其餘可收的碟本批全收了，缺的一張只能靠第 418 條的 §1 人工身分補**（見第 414 條）。

**村岡建**：**零。** 第 413 條已列盡他 MB 上的全部 6 個 RG，可收的三張本批全收，其餘三張都是合掛。

---

## 第 422 條（同批，本批立）⚠ **`chk-prop` 新加的 U+30FC 檢查過寬——19 個標記全部是假陽性，全部是合法的片假名長音記號**

**交件當下的實況**：`node batch-progress/c133/chk-prop.mjs a b` → **45 張、15 位、標記 19**，
**19 個標記全部是同一條**「掛名含非 ASCII 連字號」，**a 組 9 個、b 組 10 個**：

| 被標的掛名 | 組 | U+30FC 在哪裡 |
|---|---|---|
| `原信夫とシャープス・アンド・フラッツ` ×5 | a | **シャープス**（「ャー」） |
| `宮間利之とニューハード` ×4 | a | **ニューハード**（「ュー」「ハード」） |
| `石川晶とカウント・バッファローズ` ×5 | b | **バッファローズ**（「ロー」） |
| `ジョージ大塚トリオ` ×2、`ジョージ大塚クインテット` ×3 | b | **ジョージ**（「ョー」） |

**這不是資料問題，是規則過寬。** a 組第 409 條建議「把 U+30FC 加進 `chk-prop` 的檢查集」，
主線 2026-09-15 照辦，把 regex 改成 `/[‐‑‒–—―－ー]/`——**但 U+30FC 在日文裡有兩種用法**：

1. **當破折號用**（a 組要防的：`Rock Joint Cither ー Silk Road`，前後都是空格與拉丁字母）——**該亮燈**；
2. **片假名的長音記號**（ジョージ／バッファローズ／ニューハード／シャープス）——**這是字本身的一部分，不能改**。
   改掉會變成「ジョジ大塚」「バッファロズ」，**等於在池中造出全新的分裂字串**，違反第 307／354／355 條。

**⚠ 而且線上池與待上架批次裡早就有這些字串**（c-131 已建 `石川晶とカウント・バッファローズ《ウガンダ》`、
`ジョージ大塚クインテット《Loving You George》`；池中另有 `山下洋輔トリオ`、`峰厚介クインテット` 等）——
**這條規則若不收窄，往後每一張日本爵士的編制掛名都會亮燈，等於把這條線整個判死。**

**本組不自行改工具**（不是我的檔），**給主線一個精確的收窄法，實測可行**：

```js
// 只有「ー 前面不是假名」時才算破折號用法
const dashLike = s => /[‐‑‒–—―－]/.test(s) || /(^|[^぀-・ヽ-ヿ])ー/u.test(s);
if (dashLike(x.album))  say(`專輯名含非 ASCII 連字號：…`);
if (dashLike(x.artist)) say(`掛名含非 ASCII 連字號：…`);
```

**實測**：把 `chk-prop.mjs` 複製一份改成上式再跑 `a b` → **45 張、15 位、標記 0**
（96 批、3,996 張、跨批撞卡 0、同 rgMbid 不同掛名 0）。
`Rock Joint Cither ー Silk Road` 那種前後有空格的用法仍然會亮燈（`ー` 前面是半形空格，不是假名），**a 組第 409 條要防的東西一個都沒漏**。

**所以 b 組交件的實質標記數是 0**，19 個是工具的假陽性。**主線若不收窄規則，a／b 兩組都過不了，而兩組的掛名都是照第 354／355 條與池中先例寫的，沒有一個字該改。**
依判準 3（不決定就整批交不出去）當場定：**卡單不改、規則要改，理由與修法留在這裡。**

### 後記（同日，交件前最後一次覆核）

**主線已把 `ー` 從 regex 拿掉**（現行 `chk-prop.mjs` 第 29／32 行是 `/[‐‑‒–—―－]/`，不含 U+30FC），
**`node batch-progress/c133/chk-prop.mjs a b` → 45 張、15 位、標記 0**，a／b 兩組都過。
**本條仍然留著**，因為第 409 條的建議（把 U+30FC 加進檢查集）**本身沒有錯，錯的是加法**——
往後若要再加，請用上面那個收窄式，**不要直接把 U+30FC 併進字元集**；
否則每一張日本爵士的編制掛名（シャープス・アンド・フラッツ／ニューハード／カウント・バッファローズ／ジョージ大塚…）都會亮燈。

---

## 第 423 條（主線 2026-09-15，b 組交件後）：**b 組三處自判全部追認；《Loving You George》的年份異議記著、不動 c-131 的卡**

1. **第 417 條的反例成立但不動卡**：c-131 已建的 `ジョージ大塚クインテット《Loving You George》` 卡面 1975，
   而 King 自家店面條目 `1782228228` 記 1976-12-21／℗1976（4 軌與 MB 一致）。
   **c-131 研究層當時已看過這個分歧**（他們的 notes 寫「Apple 1976／ja 維基 1974 不取」），取 1975 是有意識的判斷。
   **三說並存、卡片維持 1975**，把兩個 collectionId 留給本機覆核。
   **推論**：c-132 第 383 條的「King 店面精確日期優先」**不是無條件優先**——
   它在「MB 只有年份、店面有精確日」時最強；**當第三方另有說法時只是三說之一**。
2. **第 413 條追認**：村岡建的「建」取自店面六筆官方條目（MB 主名是「健」），照 c-131 第 350 條先例（秋吉／穐吉）。
   《Takeru》的 credit 是編制名但實體是個人、**MB 沒有另立同名群組實體**，故判與《Sea Horse》相反——**判準是有沒有第二個實體，不是 credit 長什麼樣**。
3. **第 415 條**：《Sea Breeze》年份 1971 的唯一依據是 c-131 第 356 條 F 自己的記載（無一手舉證），
   **卡上已寫死「研究層必須覆核，不成立就改取 2014」**——研究層派工要點名這一張。

## 第 424 條（同日）：**大野雄二的原聲帶有 16 張是欄位篩不到的**

b 組判掉 83 張原聲帶，其中 **67 張靠 MB `secondary-types` 含 `Soundtrack`**，
**另 16 張 MB 根本沒標**（《野性の証明》《ルパン三世 MUSIC FILE》《LUPIN THE THIRD「JAZZ」》系列），
是靠盤名判的。**「用欄位篩掉原聲帶」這個做法有三成漏網**——
往後凡收錄動畫／電影配樂大戶（大野雄二、宮川泰、菅野よう子這類）的批，**盤名也要掃一次**。

## 第 425 條（同日）：**主線自己的 U+30FC 修法造成 19 個假陽性，同一輪內改回**

見第 422 條與 `c133/rulings.md` 第 409a 條。**這是今天第二次「工具改動沒先跑回歸」**
（第一次是第 344 條的 `artistOk`，那次有跑、沒出事）。
**通則：改比對或檢查規則，一律先拿現有全部批次跑一次，看新舊差異的名單，再決定要不要進。**

---

## 第 426 條（主線 2026-09-15，研究層 b 組交件後）：**b 組九處擋下全部追認，年份一張不改**

1. **《My Little Angel》維持 1976**——三說（錄音 1971／首發 1973 原題《ミスター・ハピゴン》RCA JRS-7263／1976 RVL-5505 改題再版）。
   **盤名與年份要出自同一筆**（第 262 條）：卡單盤名是 1976 年的改題，年份就取 1976。
   改 1973 就得連盤名一起換，**這輪不換**，三說寫進 risk。
2. **《Get Up!》維持 1975**（原盤 RCA RVH-8501，RVL-5510 是 1976 再版；盤面錄音 1975-08-04／08／20，
   所以資料庫端的 `1975-03-06` 不可能成立）。**《Go On'》維持 1972**（`1972-11-29` 是錄音日不是發行日）。
3. **《Sea Breeze》1971 成立、不改 2014**——策展層第 415 條自己標的最高風險那張，研究層找到兩個一手舉證
   （Union ULP-2002 實體盤條目＋日文百科作品表）。**「最弱的一筆」最後站住了，因為它被指名覆核。**
4. **《SOFT LANDING》維持 1978**（2 對 1 勝過店面的 1979）。**第 411 條、第 413 條（村岡「建」）各多一筆盤面佐證。**
5. **第 416 條的定性要改**：《African Rock》的兩個 RG **不是重複建檔，是兩張不同的碟**
   （1972 那筆是 RCA JRS-7058、12 軌，曲目只有一首沾邊）。卡單釘 1971 那筆仍正確。
6. **第 412 條末的「RVL 號段暗線」是錯的**：RVL-55xx 整段是 1976 年的廉價復刻系列，不是首發編號。
7. **又兩張現場盤資料庫沒標**（《Jazz & Rock "Out"》1970-07-21 日比谷野外音楽堂、
   《Sound Adventure Act.1》1975-08-05 新宿厚生年金会館）——**依 c-132 第 397 條，`releaseType` 不改、正文寫明是現場錄音。**

## 第 427 條（同日）：**《Loving You George》現在是四說——那張卡的正文不得把 1975 當唯一說法**

日文百科的作品表寫 **1974**，加上資料庫與美國店面的 1975、日本店面 King 的 1976-12-21。
**c-131 已建的那張卡維持 1975**（第 423 條），但**四說要寫進 c-131 的本機交接**。

## 第 428 條（同日）：**店面同一筆條目的 collection 層與曲目層可以各給一個日期**

《SPACE KID》`1539321882`：collection 層 1978-01-01、曲目層 1978-06-21。
**往後依第 383 條用店面日期改判年份，必須指明是哪一層。**

## 第 429 條（同日）：**第三種查法的第四種漏查成因：條目掛名是 Various Artists**

《Wandering Birds》的店面條目 collection 層 artistName 是 **Various Artists**、曲目層才掛藝人，
而且日文盤名是《女友達》——**盤名搜尋與十個藝人目錄都撈不到，只有拿曲名跑 `entity=song` 才命中**。
與 c-132 第 400a 條的三種成因（盤名多後綴／盤名是片假名或羅馬字／掛在別的 artistId）合為四種。

## 第 430a 條（同日）：**跨批交集密集——寫作層不得每張都用「同一批錄音室樂手」當主軸**

本組 22 張的盤面上出現了 村岡建、ジョージ大塚、鈴木宏昌（c-133 a）、佐藤允彦、菊地雅章（c-132 a）、
前田憲男（c-134 a）、杉本喜代志、今田勝、菅野邦彦（c-134 b）、白木秀雄、松本英彦（c-132 b）。
**這是 1970 年代東京錄音室的實況，但它不能當四批 180 張的共同主軸。** 各卡的反同構切入面已逐張寫進 notes。
