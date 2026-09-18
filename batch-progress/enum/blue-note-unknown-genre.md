# Blue Note 列舉檔 97 張 `genre==='unknown'` 的逐筆分流

生成日期：2026-09-18　｜　來源：`batch-progress/enum/blue-note.json`（1,812 列，`genre` 分 jazz 1,671／unknown 97／non-jazz 44）

## 為什麼有這份檔

切 c-148～c-167（1985 年後那 871 張）時**只取了 `genre` 等於 `jazz` 的**，
這 97 張 `unknown` 因此**從頭到尾沒有進過任何批次清單**。它們的 `note` 全部是「待人工判曲風」——
**是沒有人判過，不是判過不收。**本檔把 97 張逐筆判完。

## ⚠ 根因：這 97 張不是「MB 沒資料」，是列舉腳本判錯了層級

**這是本批最該讓主線知道的一件事。**

逐筆回問 MB 之後發現：

| 看哪一層 | 97 張裡的狀況 |
| --- | ---: |
| **release-group 層** 的 `genres`／`tags` 含 jazz 或 bop 系 | **54 張** |
| release-group 層兩欄全空 | 31 張 |
| release-group 層有標籤但非爵士 | 12 張 |
| **artist 層** 的 `genres`＋`tags` **全空** | **92 張** |
| artist 層有標籤（全是 `composer`／`greek`／`french`／`double bass & voice` 這類非曲風標籤） | 5 張 |

也就是說：**54 張的 release-group 端點就直接寫著 `jazz`／`hard bop`／`post-bop`，卻還是被判成 `unknown`；
而 artist 層有 92 張是空的。**兩個數字合起來只有一個解釋——

> **列舉腳本是拿 `artist` 層的 tags／genres 在判曲風，不是拿 `release-group` 層的。**

`blue-note.json` 的 `generated` 是 **2026-09-15**（三天前），不是陳年資料，所以不能用「MB 後來才補標籤」解釋。

**給主線的建議**：`blue-note.json` 以外的列舉檔（其他廠牌線）若是同一支腳本產的，
**同樣的 97 張規模的漏可能到處都是**。修法是把曲風判定改成
`release-group?inc=genres+tags` 為主、artist 層為輔，並且**對既有列舉檔的 `unknown` 列重跑一次**。

## 四個 tier 的數字

| tier | 張數 | 意思 |
| --- | ---: | --- |
| `jazz-missing` | 75 | 是爵士、不在池中也不在任何現有批次清單裡 → **要補進管線** |
| `non-jazz` | 18 | 不是爵士（或廠牌不屬 Blue Note 家族）→ 不進管線 |
| `jazz-dup` | 2 | 是爵士，但與已在清單／池中的 RG 是同一張碟 → 不補 |
| `unclear` | 2 | 查過仍判不出來 → 留給主線複核 |
| **合計** | **97** | 75 ＋ 18 ＋ 2 ＋ 2 ＝ 97 ✓ |

`jazz-missing` 之中：**1985–1999 有 17 張**（已切成 `batch-progress/c168/slice.json`，一組，全部 `g: "a"`），
**2000 年以後有 58 張**（依交辦不建 slice，列在本檔第四節交給主線）。

## 年代分布

| 五年段 | 全部 97 | 其中 jazz-missing |
| --- | ---: | ---: |
| 1985–1989 | 8 | 6 |
| 1990–1994 | 7 | 6 |
| 1995–1999 | 7 | 5 |
| 2000–2004 | 11 | 9 |
| 2005–2009 | 17 | 13 |
| 2010–2014 | 12 | 8 |
| 2015–2019 | 15 | 13 |
| 2020–2024 | 13 | 8 |
| 2025–2029 | 7 | 7 |

兩個峰：**1985–1994 那 15 張幾乎全是 Blue Note 復興期自組的新秀團**（OTB、Superblue、Ralph Peterson、Bobby Watson），
**2000 年後那 58 張則集中在歐洲與芬蘭分支、以及 2014 年後的現代 Blue Note 陣容**。

## 一、`jazz-missing`／1985–1999（17 張，已切 c-168 a）

⚠ **批號確認**：`ls batch-progress/ | grep c16` 只回 c160–c167，**c168 未被用掉**，故本批號可用。

| # | 年 | 掛名 | 盤名 | 目錄號 | 為什麼先前被判 unknown |
| ---: | ---: | --- | --- | --- | --- |
| 1 | 1985 | Out of the Blue | O.T.B. | BT 85118；CDP 7 46290 2 | MB 有 genres（jazz），但列舉腳本未把它映進 jazz |
| 3 | 1986 | Out of the Blue | Inside Track | CDP 7 46395 2 | MB 有 genres（jazz），但列舉腳本未把它映進 jazz |
| 4 | 1987 | Out of the Blue | Live at Mt. Fuji | BT-85-141；BT85141 | MB 有 genres（jazz, post-bop），但列舉腳本未把它映進 jazz |
| 5 | 1988 | Ralph Peterson Quintet | V | B1-91730 | MB 有 genres（jazz, post-bop），但列舉腳本未把它映進 jazz |
| 7 | 1989 | Out of the Blue | Spiral Staircase | 93006 | MB 有 genres（hard bop, jazz），但列舉腳本未把它映進 jazz |
| 8 | 1989 | Superblue | Superblue | CDP 7 91731 2 | MB 有 genres（jazz），但列舉腳本未把它映進 jazz |
| 9 | 1990 | Ralph Peterson Quintet | Volition | CDP 7 93894 2 | MB 有 genres（hard bop, jazz），但列舉腳本未把它映進 jazz |
| 10 | 1990 | Superblue | Superblue 2 | CDP 7 92997 2 | MB 有 genres（hard bop, jazz, post-bop），但列舉腳本未把它映進 jazz |
| 11 | 1990 | The Manhattan Project | The Manhattan Project | CDP 79 4204 2 | MB 有 genres（jazz, jazz fusion），但列舉腳本未把它映進 jazz |
| 12 | 1991 | Bobby Watson & Horizon | Post-Motown Bop | （列舉檔無） | MB 的 tags 與 genres **兩欄全空**，列舉腳本無從判起 |
| 13 | 1991 | Ralph Peterson Fo'tet | Ornettology | CDP 7 98290 2 | MB 的 tags 與 genres **兩欄全空**，列舉腳本無從判起 |
| 14 | 1992 | Stan Tracey Octet | Portraits Plus | BLT1006；CDP7-780696-2 | MB 的 tags 與 genres **兩欄全空**，列舉腳本無從判起 |
| 17 | 1996 | The Blue Note All Stars | Blue Spirit | CDP 7243 8 36747 2 5 | MB 的 tags 與 genres **兩欄全空**，列舉腳本無從判起 |
| 18 | 1997 | Ray Barretto & New World Spirit | Contact! | 85697402 | MB 的 tags 與 genres **兩欄全空**，列舉腳本無從判起 |
| 20 | 1998 | Ray Barretto & New World Spirit | My Summertime | CDP 7243 8 35830 2 7 | MB 有 genres（jazz, latin jazz），但列舉腳本未把它映進 jazz |
| 21 | 1998 | Ron Carter Trio | So What | CDP 7243 4 94976 2 7 | MB 有 genres（jazz），但列舉腳本未把它映進 jazz |
| 22 | 1999 | Frank Emilio Flynn | Reflejos Ancestrales | 7243 4 98918 21 | MB 的 tags 與 genres **兩欄全空**，列舉腳本無從判起 |

**逐筆判定理由與來源網址（每筆至少兩個獨立來源）見 `blue-note-unknown-genre.json` 同編號的 `why`／`src` 欄。**

### 這 17 張的重點

- **OTB（Out of the Blue）整條線四張全在這裡**（#1 O.T.B. 1985／#3 Inside Track 1986／#4 Live at Mt. Fuji 1987／#7 Spiral Staircase 1989）。
  這是 Blue Note 1984 年為了重啟廠牌自己組的新秀六重奏；實掃 c46–c167 全部 slice／prop 與 seed_cards.json 17,248 列，`Out of the Blue` 與 `OTB` 皆零命中。
- **Ralph Peterson 三張**（#5 V／#9 Volition／#13 Ornettology）。池中 `Ralph Peterson` 個人零張，
  desc-tools 只有 c-149 a 的《Triangular》與 c-150 的《Presents The Fo'tet》。
- **Superblue 兩張**（#8／#10）、**Ray Barretto & New World Spirit 兩張**（#18／#20）——後者池中 7 張全是 Fania 時期，Blue Note 線整條缺。
- **#12 Bobby Watson & Horizon《Post-Motown Bop》、#13 Ornettology、#14 Stan Tracey Octet《Portraits Plus》、#17 Blue Spirit、#18 Contact!、#22 Reflejos Ancestrales 的 MB tags/genres 兩欄全空**，
  全靠 Discogs 的 style 欄（Modal, Hard Bop／Contemporary Jazz／Post Bop／Latin Jazz／Afro-Cuban Jazz）才判得出來。
- **#11 The Manhattan Project 盤名撞 c-159**，已逐欄比對排除：c-159 那筆是 2005 年的 **DVD 現場品**（rgMbid 8b4f60a5、`live: true`、catno 724354430190），本筆是 1990 年美國 **CD 錄音室盤**。

## 二、`jazz-dup`（2 張，不補）

### #6　1989　Milt Jackson Quintet —《Milt Jackson (1948)》

**與池中與 c-147 的同一張碟。** 本筆目錄號 `CDP 7 81509 2` ＋ 廠牌 Blue Note，反查命中 `batch-progress/c147/slice.json` 的 `Milt Jackson /《Milt Jackson With John Lewis, Percy Heath, Kenny Clarke, Lou Donaldson and the Thelonious Monk Quintet》`，**同目錄號同廠牌**；seed_cards.json 亦已有同名同碟（1956）。Discogs 該目錄號回的全部是同一張 The Blue Note Collection CD（BLP 1509 的 CD 化），genre Jazz、style Bop。MB 把這張 CD 另開一個 RG 叫「Milt Jackson (1948)」、掛名 `Milt Jackson Quintet`，是第 1294 條那種「同一張碟兩個 RG」的形狀。**不補。**

來源：<https://musicbrainz.org/release-group/8da3c304-1a45-41c0-946e-60038a37e59b>　<https://www.discogs.com/release/28469518-Milt-Jackson-With-John-Lewis-2-Percy-Heath-Kenny-Clarke-Lou-Donaldson-And-The-Thelonious-Monk-Quinte>

### #19　1998　Don Byron and Existential Dred —《Nu Blaxploitation》

**與 c-155 a 已在清單上的是同一張碟。** c-155 a 的 `batch-progress/c155/slice.json` 有 `Don Byron —《Nu Blaxploitation (Clean Version)》`，rgMbid **29d70318-f1cd-49de-a169-0cefd1b0f206**、catno `CD 7087 6 10178 2 3`——那是 Capitol/EMI 的**宣傳用潔淨版**序號。本筆 RG 6aab4e1b 才是真盤：轄下兩個 release 都是 14 軌、同 barcode `724349371125`（1998-06-22 FR Blue Note `7243 4 93711 2 5` ＋ 1998 US Capitol Records `CDP 7243 4 93711 2 5`）。MB genres jazz, post-bop；Discogs release 3030564 廠牌 Blue Note、目錄號 7243 4 93711 2 5。**MB 為同一張碟建了兩個 RG，管線拿到的是宣傳版那個。主線若要修，應把 c-155 a 的 rgMbid 換成 6aab4e1b，而不是另補一張卡。**

來源：<https://musicbrainz.org/release-group/6aab4e1b-5c96-32e8-a3ba-328fcd8f1c50>　<https://www.discogs.com/release/3030564-Don-Byron-Nu-Blaxploitation>

## 三、`unclear`（2 張，留給主線複核）

### #2　1985　Out of the Blue —《Out of the Blue》

MB RG cccc585a 掛在 Blue Note 那個爵士團 21d3d54e 名下、廠牌欄填 Blue Note，但轄下唯一 release 859121e8 **無目錄號、無 barcode**，十一軌（13th Generation／Only Fool／Chameleon Sky／Whether the Storm／The Stand／Downward Back／First／Swept／Mr. Plixx／Fear Itself／Innocence）**與 BT 85118《O.T.B.》的七軌完全不重疊**，曲長也全在 3–7 分的流行歌形狀。Discogs 用 artist+title 查回來的三筆同名盤分別是 Mirth Promotions（1990，Alternative Rock）、Not On Label OB 001（1989，Pub Rock）與 Toshiba EMI 的日本盤，都對不上這十一軌；`13th Generation` 這個曲名只在 ReverbNation 的獨立樂團 officialoutoftheblue 頁上命中。判定為 **MB 登錄錯誤或同名樂團混入**，身分無法坐實，不進管線。

來源：<https://musicbrainz.org/release-group/cccc585a-7be7-31ba-8ddc-fee4d67176b2>　<https://www.discogs.com/release/6361608-Out-Of-The-Blue-Out-Of-The-Blue>　<https://www.reverbnation.com/officialoutoftheblue/song/11800439-13th-generation>　<https://en.wikipedia.org/wiki/Out_of_the_Blue_(American_band)>

### #86　2021　Sasha Miller —《Musique De La Vie》

**廠牌坐實不了。** MB release a9c28d47 的 label-info 指向 Blue Note 正規 imprint 713c4a95，但 **barcode 196292214703 不屬 EMI 724／Capitol 077／Universal 602 任何一段**（196292 是獨立配銷商的區段），**Discogs 用 artist+title 與 q= 兩路查皆零命中**（本批唯一一張連 Discogs 條目都沒有的）；第三方站點對廠牌的說法互相矛盾——有寫 Blue Note、也有寫 Patanegra Label。專輯十軌總長僅 26 分 45 秒、曲名全法語（Du Jazz Dans Mes Veines／Dans Les Rues De Toulouse…），形狀更接近串流 lo-fi jazz 歌單專輯而非 Blue Note 的簽約盤。**查過仍判不出，不進管線，留給主線複核。**

來源：<https://musicbrainz.org/release-group/81bbac19-3ade-49eb-bf7c-46bae5dd81ee>　<https://www.qobuz.com/us-en/interpreter/sasha-miller/7902803>　<https://jazznblues.club/viewtopic.php?t=59073>

## 四、`jazz-missing`／2000 年以後（58 張，**不建 slice**，交給主線日後併進 c-156 以後的批次）

| # | 年 | 掛名 | 盤名 | 判定曲風 | 備註 |
| ---: | ---: | --- | --- | --- | --- |
| 23 | 2000 | Supergenerous | Supergenerous | contemporary jazz |  |
| 24 | 2000 | Thierry Lang | Guide Me Home | jazz piano trio（easy listening 傾向） |  |
| 25 | 2001 | Booster | Loop in Release | acid jazz／nu-jazz（soul-jazz、free jazz） |  |
| 27 | 2001 | Trio Focan feat. Mika Mylläri & Mikko Helevä | standard a'la Turc | jazz（標準曲三重奏） |  |
| 29 | 2002 | U-Street All Stars | Helsinki Sessions | bop |  |
| 30 | 2003 | Scolohofo | Oh! | contemporary jazz／post-bop | ⚠ Sco/Lo/Ho/Fo 四人團，另有 Tone Poet 重發 |
| 31 | 2003 | Θάνος Μικρούτσικος | Music Stories | contemporary jazz（跨古典） |  |
| 32 | 2004 | Jackie Allen | Tangled | vocal jazz（folk-rock 曲目） | ⚠ 邊界張，可逆 |
| 33 | 2004 | U-Street All Stars | Bowling | bop／swing |  |
| 34 | 2005 | Anna-Mari Kähärän Orkesteri | Anna-Mari Kähärän Orkesteri | jazz／北歐民謠跨界 | ⚠ 邊界張，可逆 |
| 35 | 2005 | Brisa Roché | The Chase | jazz-rock／cool jazz（歌手作品） |  |
| 36 | 2005 | Dr. John and the Lower 911 | Sippiana Hericane | New Orleans R&B／blues rock | 依先例（同藝人其他盤已在 c-156～c-161） |
| 37 | 2005 | Paolo Fresu 5et Plays the music of Roberto Cipelli | Kosmopolites | contemporary jazz | 依先例（同藝人其他盤已在 c-156～c-161） |
| 39 | 2006 | Joona Toivanen Trio | Frost | contemporary jazz（北歐鋼琴三重奏） |  |
| 41 | 2006 | Paolo Fresu 5et Plays the music of Ettore Fioravanti | Thinking | contemporary jazz |  |
| 43 | 2008 | Alice Ricciardi | Comes Love | vocal jazz |  |
| 44 | 2008 | Franco D’Andrea Quartet | The Siena Concert | contemporary jazz（現場） |  |
| 45 | 2008 | High Five Quintet | Five for Fun | latin jazz／hard bop |  |
| 46 | 2008 | Musica Nuda | 55/21 | vocal jazz（人聲＋低音提琴二重奏） |  |
| 47 | 2009 | Juliano Rossi | Free Runner | vocal jazz |  |
| 48 | 2009 | Kitty Hoff & Forêt-Noire | Zuhause | 德語 chanson-jazz／vocal jazz | ⚠ 邊界張，可逆 |
| 50 | 2009 | The Blue Note 7 | Mosaic: A Celebration Of Blue Note Records | hard bop／post-bop |  |
| 51 | 2010 | Ruben Hein | Loose Fit | vocal jazz／jazz pop |  |
| 52 | 2011 | Emma Salokoski & UMO | Rytmihyrrä / Rytmyra | big band jazz（兒童歌曲企劃） | ⚠ 邊界張，可逆 |
| 54 | 2011 | Musica Nuda | Complici | vocal jazz |  |
| 56 | 2012 | Erik Truffaz Quartet | El tiempo de la revolución | contemporary jazz／electronic | 依先例（同藝人其他盤已在 c-156～c-161） |
| 57 | 2012 | The Northern Governors | This Is the Northern Governors | jazz-funk |  |
| 59 | 2013 | Jon Cowherd | Mercy | contemporary jazz |  |
| 60 | 2013 | Musica Nuda | Banda larga | vocal jazz |  |
| 61 | 2014 | Otis Brown III | The Thought of You | contemporary jazz／post-bop |  |
| 63 | 2015 | Kendrick Scott Oracle | We Are the Drum | contemporary jazz／post-bop |  |
| 64 | 2015 | Sunaga t Experience | STE | jazzdance／contemporary jazz（DJ 企劃） | ⚠ 邊界張，可逆 |
| 66 | 2016 | Kandace Springs | Soul Eyes | soul-jazz／vocal jazz |  |
| 67 | 2016 | Logan Richardson | Shift | contemporary jazz |  |
| 68 | 2017 | Aron Ottignon | Team Aquatic | future jazz |  |
| 69 | 2017 | Blue Note All‐Stars | Our Point of View | contemporary jazz |  |
| 70 | 2018 | Chris Dave and The Drumhedz | Chris Dave and The Drumhedz | jazz／hip-hop 融合 |  |
| 71 | 2018 | Kandace Springs | Indigo | cool jazz／soul-jazz |  |
| 72 | 2018 | Kenny Barron Quintet | Concentric Circles | post-bop／bop |  |
| 73 | 2018 | R+R=NOW | Collagically Speaking | contemporary jazz／hip-hop |  |
| 74 | 2018 | The Charles Lloyd New Quartet | Passin’ Thru | contemporary jazz（現場） |  |
| 75 | 2019 | Sarah McCoy | Blood Siren | contemporary jazz／blues／gospel |  |
| 76 | 2019 | The James Carter Organ Trio | Live From Newport Jazz | soul jazz／post-bop（現場） |  |
| 80 | 2020 | Joel Ross | Who Are You? | contemporary jazz／post-bop |  |
| 81 | 2020 | Kandace Springs | The Women Who Raised Me | vocal jazz |  |
| 83 | 2020 | _BY.ALEXANDER | 000 CHANNEL BLACK | modern jazz／electronic |  |
| 85 | 2021 | R+R=NOW | R+R=NOW Live | contemporary jazz／hip-hop（現場） |  |
| 87 | 2022 | Joel Ross | The Parable of the Poet | post-bop |  |
| 88 | 2023 | lophiile | The Good Days Between | jazz／hip-hop／R&B（8 軌 EP，17 分鐘） | ⚠ 8 軌 17 分鐘的 EP，主線需決定收不收 EP |
| 89 | 2024 | Joel Ross | nublues | post-bop |  |
| 90 | 2024 | Out Of/Into | Motion I | contemporary jazz |  |
| 91 | 2025 | Maya Delilah | The Long Way Round | soul-jazz／neo-soul | ⚠ 邊界張，可逆 |
| 92 | 2025 | Nate Mercereau, Josh Johnson & Carlos Niño | Openness Trio | avant-garde jazz／contemporary jazz |  |
| 93 | 2025 | Out Of/Into | Motion II | contemporary jazz |  |
| 94 | 2025 | Paul Cornish | You’re Exaggerating! | contemporary jazz |  |
| 95 | 2026 | FATHERS | FATHERS | jazz-funk |  |
| 96 | 2026 | Immanuel Wilkins Quartet | Live at the Village Vanguard Vol. 1 | contemporary jazz／free jazz（現場） | ⚠ **c-167 已有 Vol. 2 與 Vol. 3，唯獨缺 Vol. 1** |
| 97 | 2026 | Joel Ross | Gospel Music | post-bop |  |

### 這 58 張裡最該優先處理的

1. **#96 Immanuel Wilkins Quartet《Live at the Village Vanguard Vol. 1》（2026）**——
   `batch-progress/c167/slice.json` **已經有 Vol. 2 與 Vol. 3**，只有 Vol. 1 掉進 unknown（MB genres 空、tags 只有一個 `live`）。
   不補會出現只有 2、3 沒有 1 的斷號。
2. **#30 Scolohofo《Oh!》（2003）**——John **Sco**field／Joe **Lo**vano／Dave **Ho**lland／Al **Fo**ster 四人團，2024 年進了 Blue Note Tone Poet Series。四位都是池中重點藝人。
3. **#36 Dr. John《Sippiana Hericane》（2005）**——c-156《Duke Elegant》、c-157《Creole Moon》、c-159《N'Awlinz》與《Mercernary》已在，這張夾在中間卻落單。
4. **#37／#41 Paolo Fresu 5et 兩張（2005／2006）**——c-160／c-161 已收同系列四張，缺的是系列裡最早的兩張。
5. **#56 Erik Truffaz Quartet《El tiempo de la revolución》（2012）**——c-155／c-157／c-158／c-159／c-160 已收六張。
6. **#66／#71／#81 Kandace Springs 三張、#80／#87／#89／#97 Joel Ross 四張**——兩位的 Blue Note 線各自**一張都沒進過批次**。
7. **#50 The Blue Note 7《Mosaic》（2009）**——Blue Note 七十週年全明星七重奏翻自家曲目，策展價值高。

## 五、`non-jazz`（18 張，不進管線）

| # | 年 | 掛名 | 盤名 | 實際曲風 | 判準 |
| ---: | ---: | --- | --- | --- | --- |
| 15 | 1994 | Dao Dezi | Dao Dezi | celtic／electronic（downtempo、tribal、eurodance） | 曲風 |
| 16 | 1995 | Slawek | La baignoire pleine d'histoires | electric blues／chanson（廠牌亦不符） | **廠牌＋曲風都不符**：`Blue Note Compagnie` 是法國同名獨立小廠 |
| 26 | 2001 | EDC | Passport | lounge／jazzdance（electronic） | 曲風 |
| 28 | 2002 | Slowhill | Finndisc | downtempo／trip hop | 曲風 |
| 38 | 2005 | Raining Pleasure | Reflections | alternative rock／希臘獨立流行 | 曲風 |
| 40 | 2006 | Louise Setara | Still Waters | soul／R&B | 曲風 |
| 42 | 2007 | Elisabeth Withers | It Can Happen to Anyone | neo-soul／R&B | 曲風；⚠ 邊界張，可逆 |
| 49 | 2009 | Kristina Train | Spilt Milk | soul／pop rock | 曲風 |
| 53 | 2011 | Jeff Bridges | Jeff Bridges | country／americana（country blues） | 曲風 |
| 55 | 2011 | Sandra Carrasco | Sandra Carrasco | flamenco | 曲風 |
| 58 | 2012 | Vesa ja Tytöt | Huomenna on jo toisin | pop rock／soft rock（芬蘭流行） | 曲風 |
| 62 | 2014 | Puss N Boots | No Fools, No Fun | americana／country（folk rock） | 曲風 |
| 65 | 2016 | Aufgang | Turbulences | electro／neo-classical | 曲風 |
| 77 | 2019 | Tiwayo | The Gypsy Soul of Tiwayo | soul／blues rock（法國） | 曲風；⚠ 邊界張，可逆 |
| 78 | 2020 | Béesau | Station balnéaire | electro-pop（古巴靈魂＋小號） | 曲風；⚠ 邊界張，可逆 |
| 79 | 2020 | Dante Fire | Night Bass | jazz-funk／fusion（曲風其實是爵士，但廠牌不符） | **廠牌問題**（曲風其實是爵士）：`Blue Note Digital` 是另一個 label 實體 |
| 82 | 2020 | Puss N Boots | Sister | americana／country | 曲風 |
| 84 | 2021 | Gad Elmaleh | Dansez sur moi | chanson（Nougaro 致敬） | 曲風 |

### 本批採用的 jazz／non-jazz 判準（寫下來給後批沿用）

⚠ **MB 的 tags／genres 常常是空的——空的不等於不是爵士，那正是這 97 張被列 unknown 的原因。**
97 張裡有 **31 張 MB 兩欄全空**，只能靠 Discogs 判。

1. **Discogs `style` 欄出現任何爵士子類**（Hard Bop／Post Bop／Contemporary Jazz／Soul-Jazz／Latin Jazz／Future Jazz／Jazzdance…）→ **jazz**。
2. **Discogs `genre` 欄沒有 Jazz** → **non-jazz**（#38 #40 #49 #53 #55 #58 #65 #82 全走這條）。
3. **`genre` 有 Jazz 但 `style` 欄全是非爵士子類**（Lounge／Chanson／Flamenco／Electro／Pop Rock／Folk）→ **non-jazz**（#26 #28 #42 #77 #84）。
   理由：**Blue Note 發行本身會讓 Discogs 的 genre 欄自動掛上 Jazz**，genre 欄不具鑑別力，style 欄才有。
4. **例外——先例優先（`CLAUDE.md` 裁定判準第 1 條）**：同一位藝人的其他 Blue Note 盤若已被主線以 `genre` 等於 `jazz` 切進 c-156～c-161，
   本批同藝人的漏網盤**照先例收**（#36 Dr. John、#37／#41 Paolo Fresu、#56 Erik Truffaz）。
5. **廠牌與曲風分開寫**：廠牌不屬 Blue Note 家族的歸 `non-jazz`，但 `why` 要寫明「是廠牌問題不是曲風問題」，`genre` 欄仍填實際曲風（#16、#79）。

⚠ 走第 3 條與第 4 條的都是**可逆裁定**（改的是 manifest 欄位不是卡池結構），`why` 欄已逐筆標「邊界張，可逆」。

### ⚠ 子廠牌認定（沿用第 1295 條，本批實際用到的）

**算 Blue Note 家族**：Somethin' Else／somethin' else、Blue Note International（EMI 英國）、Metro Blue、Blue Note France、Blue Note Germany、
Blue Note Finland（Oy EMI Finland Ab）、Blue Note Flamenco、Blue Note Lab、Blue Note Label Group、OWL Records（Blue Note 代理）、
ArtistShare/Blue Note 合作號（`ASBN-` 前綴）、日本的 `TOCJ-`／`UCCQ-`／`CJ32-` 序列。

**不算**：Capitol／Manhattan／Pacific Jazz／Capitol Jazz（第 1295 條），以及本批新發現的兩個：

- **`Blue Note Compagnie`**（法國獨立小廠，`BNS-` 目錄號，#16）；
- **`Blue Note Digital`**（MB label `0293ae5c`，barcode 810211 段，#79）——與 Blue Note 正規 imprint `713c4a95` 不是同一個實體。

⚠ 2000 年後 Blue Note 的歐洲與芬蘭分支（SlowHill、U-Street All Stars、Joona Toivanen Trio、The Northern Governors、Emma Salokoski & UMO…）
**廠牌都查到是正規發行**，本批沒有任何一張因為「是歐洲分支」被排除；被排除的全是曲風或另一個同名廠牌的問題。

## 六、給後批的方法論筆記

1. **列舉檔的 `catno` 欄不可直接拿去反查。**本批至少七筆的 `catno` 是被壓過的裸數字或缺空格：
   `93006`（#7，撞 Moroz Records 的俄國搖滾）、`24633`（#23，撞 Giant Records 的 Big Mountain）、
   `45687`（#36，撞 Reprise 的 Gordon Lightfoot）、`85697402`（#18，7243 前綴被吃掉、零命中）、
   `7243 4 98918 21`（#22，少一個空格）、`11`（#55，完全不具唯一性）、`577682-0`（#68，撞 RCA 的 Westlife barcode）。
   **第 1250 條「查目錄號一定要連廠牌看」在本批應驗了七次。**
2. **`api.discogs.com/database/search` 不需 token**（沿用第 531／782 條）。本批 97 張先用 `catno=` 打，87 張一次命中；
   剩下 10 張改用 `artist=`＋`release_title=` 補，7 張命中；最後 3 張（#78／#86／#88）Discogs 完全沒有條目（都是純數位發行），
   靠 `store.bluenote.com`／`bluenote.com` 官方頁與 Apple Music／Qobuz 補第二來源。間隔 2.6 秒，零限流。
3. **判 `jazz-dup` 最有效的是「目錄號＋廠牌」反查**——#6 就是這樣抓到的（`CDP 7 81509 2` 命中 `batch-progress/c147/slice.json`）。
   **盤名反查假陽性極高**：本批 12 筆盤名撞池／撞批次，逐筆核完**真的同碟 0 筆**（Spiral Staircase 撞 Ralph McTell、So What 撞 George Russell、
   The Chase 撞 Garth Brooks、Frost 撞 Enslaved、Mercy 撞 Armand Hammer、Who Are You? 撞 The Who、Sister 撞 Sonic Youth、FATHERS 撞 Nate Smith…）。
4. **`nReleases` 與 `inPool` 欄不足以判重複**：97 張的 `inPool` 全部是 `false`，但其中 2 張實際上與已在清單的 RG 是同一張碟。
5. **MB 為同一張碟建兩個 RG 的形狀（第 1294 條）在本批又出現兩次**（#6、#19），
   而且 **#19 的情況是管線拿到了宣傳版那個 RG、真盤 RG 反而被丟進 unknown**——
   建議主線的反查檢查（第 1274 條那道）**也要對 `genre` 非 jazz 的列跑一次**，否則只掃 jazz 列永遠看不到這種配對。
