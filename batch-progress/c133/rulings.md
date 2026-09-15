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
