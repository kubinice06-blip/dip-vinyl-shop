## 2026-09-04 — dip-vinyl-shop — c-75 策展提案（深掘：美國黑人福音小廠二線 1955–80）

- **改動摘要**：新增 `batch-progress/c75/prop-a.json`（17 張）與 `batch-progress/c75/prop-b.json`（20 張），
  合計 **37 張、31 位藝人**，`lineType: 深掘`，合輯 **0 張**。
  - a 組＝1957–72 的四重唱與傳統群唱線（Apollo 1、Andex 1、Savoy 3、Vee-Jay 3、Peacock 1、
    Atlantic Religious Series 1、Gospel Record Co. 1、Checker 1、Jewel 1、Westbound 1、HOB 1、
    另 Peacock 1）。
  - b 組＝1972–80 的合唱團與 soul gospel 線（Gospel Truth／Stax 3、Peacock 3、Jewel 3、
    Sound of Gospel 4、Savoy 3、Nashboro 2、Birthright 1、Checker→Nashboro 1）。
  - 曲風一律 `soul`（依派工：福音標 soul，不標 classical、不硬標 world）。
- **主要檔案**：`batch-progress/c75/prop-a.json`、`batch-progress/c75/prop-b.json`、
  `batch-progress/memory-entries/c75-curation.md`（本檔）。**未動 git。**
- **驗證結果**：`node batch-progress/c75/chk-prop.mjs a b` → 37 張、31 位、**標記 0**；
  跨批去重覆蓋 27 批、1,373 張，跨批撞卡 0。另手跑一次全庫比對（46 個 `prop-*.json` ＋
  `desc-tools/batches/cards/`，共 1,618 張）確認撞卡 0。
  37 張全部釘住 release-group MBID，並逐個回問 `release-group/<id>` 與
  `release?release-group=<id>&inc=labels` 確認 `primary-type=Album`、標題、artist-credit、
  轄下 release 的年份／國別／status／廠牌編號。
  藝人張數已對 `seed_cards.json` 全 13,913 列實掃：**The Clark Sisters 池中已有 1 張
  （1981《You Brought the Sunshine》）＋本批 2 張＝3，達上限**，其餘 30 位皆 ≤2。

### 未收清單（一）池中已有／派工指定排除的核心線

實掃 `seed_cards.json` 全 13,913 列，黑人福音既有卡：The Staple Singers 16、Mahalia Jackson 4、
Mavis Staples 3、Sister Rosetta Tharpe 3、The Soul Stirrers 2，以及 The Swan Silvertones、
The Dixie Hummingbirds、The Blind Boys of Alabama、The Five Blind Boys of Mississippi、
Mighty Clouds of Joy、The Sensational Nightingales、The Caravans、Dorothy Love Coates &
The Original Gospel Harmonettes、The Edwin Hawkins Singers、James Cleveland and the Angelic Choir、
The Rance Allen Group、Andraé Crouch & the Disciples、The Golden Gate Quartet、Marion Williams、
The Fairfield Four、Walter Hawkins、Pastor T.L. Barrett & The Youth for Christ Choir 各 1 張。

其中 **MB 上有 1955–80 的 primary-type Album、但因核心線排除而未收**（日後若開廣度批可直接用）：
The Swan Silvertones《I Found the Answer》(1973 Peacock)、
The Dixie Hummingbirds《We Love You Like a Rock》(1973)／《Wonderful to Be Alive》(1976)、
Five Blind Boys of Mississippi《My Desire》(1974 Peacock)、
Mighty Clouds of Joy《Family Circle》(1963 Peacock)、
The Blind Boys of Alabama《The Original Blind Boys of Alabama》(1961 Savoy)／
《Can I Get A Witness》(1965 Vee-Jay)、
The Soul Stirrers《The Gospel Truth》(1967 Checker)／《Strength, Power, and Love》(1973 Jewel)／
《Heritage, Vol. I》(1974)／《Vol. II》(1976)、
Edwin Hawkins《Wonderful!》(1976 Birthright)／《The Comforter》(1977 Birthright)、
Rev. James Cleveland 在 Savoy 的六筆（1962／1964／1971／1973／1975／1978／1979）。

**Pastor T.L. Barrett** 另記一筆：MB 有《I Found The Answer》(1973 Gospel Truth，db989057) 與
《Do Not Pass Me By Vol. I》(1976 Gospel Roots，c0bb108b) 兩張可釘的 Album，但池中掛名是
「Pastor T.L. Barrett & The Youth for Christ Choir」，MB 兩筆的 credit 分別是
「Rev. T. L. Barrett & The Youth For Christ Choir」與「Pastor T.L. Barrett」——
收進去會製造第三種變體鍵（裁定第 49／121 條），本批不收。**要收得先統一掛名。**

### 未收清單（二）MB 釘不住，可進補遺批（§1 人工身分路線）

以下全部走過完整流程才判查無：artist search（score ≥90）→
`release-group?artist=<MBID>&limit=100&offset=` 分頁 browse（第 116 條）→
再以廠牌 `release?label=<MBID>` 反向掃一次（第 94 條）。503／403 皆退避重試六次，探測錯誤 0。

| 對象 | 症狀 | Discogs 上實際存在的 1955–80 LP |
|---|---|---|
| The Gospel Keynotes | 藝人實體在，RG **0** | Nashboro 7109／7130／7147／7159／7202／7205／7210 等 ≥7 張 |
| The Supreme Angels／Slim & The Supreme Angels | RG **0**（兩個實體皆是） | Nashboro 7052／7072／7110／7141／7195／7226 等 6 張 |
| The Consolers | 只有 1998 Album 與 2014 合輯 | Nashboro 7105／7131／7146／7158／7211 等 5 張 |
| The Swanee Quintet | 4 RG：3 筆 `primary-type` 為 **null**、1 筆 2016 合輯 | Creed 3037／3050／3062／3088／3099 等 5 張 |
| Prof. Harold Boggs | RG **0** | Nashboro 7044／7076／7090／7106／7134 等 5 張 |
| The Angelic Gospel Singers | 7 RG 全為 1995 年後 | Nashboro 7088／7150／7196／7207 等 4 張 |
| Rev. Isaac Douglas | RG **0** | Creed 3047／3090 等 |
| Rev. Milton Brunson | RG **0** | Creed 3091《To All Generations》(1979) |
| The Pilgrim Jubilees | RG **0** | Nashboro 7198《Singing In The Street》(1978) |
| Brother Joe May | 只有 1992／1994 兩張後世合輯 | Nashboro 7057《I've Been Dipped In The Water》(1968) 等 |
| Edna Gallmon Cooke | RG **0** | Nashboro 7068／7154 |
| Willie Mae Ford Smith | RG **0** | Nashboro 7148《Going On With The Spirit》(1975) |
| Alex Bradford | 只有 1992／1993 合輯與 1976 百老匯原聲 | Nashboro 7046／7066／7085 |
| The Jackson Southernaires | 《Down Home》(1975) `primary-type` **null** | Malaco／Song Bird 系列 |
| The Barrett Sisters／The Voices of Tabernacle／The Salem Travelers／The Sallie Martin Singers／The Gospel Clefs／Institutional Radio Choir／Rev. Maceo Woods | 藝人實體在，RG **0** | 各有地方廠牌 LP |
| The Williams Brothers（Jackson, MS 實體 d22ab174） | RG **0**（本批改收「The Sensational Williams Brothers」實體） | — |
| The Spirit of Memphis Quartet | RG 2，皆非 1955–80 Album | — |
| The Canton Spirituals／Albertina Walker | RG 全為 1990 年後 | — |
| The Gospelaires of Dayton, Ohio | RG 2，皆非 1955–80 Album | Nashboro／Creed |
| The Brooklyn Allstars | **MB 用「The Brooklyn All Stars」查會命中サザンオールスターズ**（第 122 條「假查無」第四型：回了完全不相干的東西）；本團無對應實體 | Nashboro 7073／7079／7092／7114 等 4 張 |
| The Harmonizing Four《What A Morning》 | MB 無此 RG | Nashboro 7122 (1973) |
| Inez Andrews（另三筆） | `primary-type` null 或無日期 | — |

**這批的量體很大**（光 Nashboro／Creed 一家就有 30 張以上釘不住的 LP），
若要補，補遺批的舉證成本相對低——Discogs 的原盤條目、編號、年份都齊全，
`mbAbsenceProof` 的兩個方向（藝人 browse ＋ 廠牌 `release?label=` 反掃）本批已經跑過一次。

### 未收清單（三）釘得住，但因身分／年份／盤名歧義或場景不合而剔除

- **The Famous Davis Sisters《Twelve Gates to the City》**（603edc31，Savoy MG 14000，1956-10）：
  Discogs 同編號的原盤標題是**自我同名的《The Famous Davis Sisters》**，
  MB 用的是同期 78／45 轉單曲的曲名當 RG 標題。盤名指涉不明，依第 73 條剔除。
- **The Remarkable Inez Andrews with The True Voices of Christ Concert Ensemble**（f0f3663c，
  Savoy SL-14591，1980）：MB 把封面上的**藝人字串**當成了 release-group 標題，
  Discogs 原盤（master 1187021）的盤名是《Recorded "Live" In Chicago, Illinois》。
  artist／album 分界不明，且 Apple `us`／`gb`／`jp` 三個 storefront 查無，剔除。
- **The New Jerusalem Baptist Church Choir《The Lord Is My Light》**（875b773a）：
  MB 記 **1980-06-30**、Discogs（Savoy SGL 7050，release 7212302）記 **1981**。
  本批年代上限就是 1980，年份直接決定收不收，兩說各一個來源、判不下來，剔除。
- **Gospel Harmonette Specials《Camp Meeting》**（90fb8abe，Vee-Jay 5042）：
  Discogs 三筆版本**全部標 Reissue**、年份記 1965，找不到原盤條目；
  且 TRIP 那筆（release 8408218）的藝人欄登的是 The Original Gospel Harmonettes——
  與池中已有的 Dorothy Love Coates & The Original Gospel Harmonettes 重疊。剔除。
- **Clara Ward Singers《A Little Traveling Music》**（4d981d12）：廠牌是 Columbia 的廉價副牌
  **Harmony（HS 11234）**、掛名含 Dukes of Dixieland，不在小廠場景內。剔除（Ward 家族本批
  改收 Savoy 的兩張）。
- **Bessie Griffin & The Gospel Pearls《Portraits in Bronze》**（7c4176d9）：
  **Liberty** 的 Premier Series（LMM-13002 單聲道／LSS-14002 立體聲）是大廠出版品，場景不合。
  順帶把年份查清楚留給日後：**MB 記 1960，Discogs 六筆原盤（含英法授權盤）一致記 1961**，
  依第 86／127 條該取 1961。
- **The Stars of Faith of Black Nativity《Negro Spirituals and Gospel Songs》**（b3f16b7b）：
  1974-11 法國 **Black and Blue 33.065**，是歐洲巡演錄音，不在美國小廠場景內。剔除。
- **Rev. Oris Mays《The Best of Reverend Oris Mays》**（937f5a43，Song Bird SBLP-227，1973-11）：
  `primary-type Album` ＋ `secondary-type Compilation`，屬 §5.6 明文不收的
  greatest-hits 重複包裝。剔除——**這是 MB 上唯一一筆 Song Bird 條目，
  因此 Song Bird 這條 Peacock 子牌本批交白卷。**
- **The Kelly Brothers《Too Much! Soul》(1966)／《Sweet Soul》(1968)**：MB 釘得住，
  但兩張是 King 的世俗靈魂樂 LP、不是福音碟，與本批場景不符。剔除。
- **藝人張數控制而未收**（全部釘得住，日後要擴編可直接撿）：
  The Clark Sisters 六筆（1973／1974／1977／1979《He Gave Me Nothing to Lose》／1980／1981）、
  The East St. Louis Gospelettes 四筆（1972 Checker CK 10075／1973 Checker CK 10085／
  1975 Nashboro／1977 Birthright）、The Harmonizing Four 兩筆（1970《Tommie, Lonnie & Me》／
  1979《Golden Jubilee》）、Mattie Moss Clark《Because He Lives》(1979，Album/Live)。
- **Bro. Napoleon Brown & The Southern Sisters《When I Get Inside》**（0cde7c76，1977 Savoy）：
  與本批收錄的 1974 Jewel 盤同團，但 MB credit 多了「Bro.」——收兩張會製造分裂鍵，只收 1974 那張。
- **年代外**：Solomon Burke《Lord, I Need a Miracle Right Now》(1981 Savoy)、
  The Truthettes《Child's Prayer》(1981 Malaco)、Twinkie Clark《Ye Shall Receive Power》(1981)。

### 本批自己下的裁定（依裁定權下放三條判準：有先例、可逆、卡住整條線）

1. **The Sunset Travelers《On Jesus' Program》年份採 1965 不採 MB 的 1964**——
   Discogs 唯一一筆原盤條目（master 1152931／release 9457076）直記 1965，MB 那筆無佐證；
   依第 86／127 條。行文依第 18／46 條不得正面斷言發行年。
2. **Rev. Julius Cheeks 的盤名採原盤封面的《Reverend Julius Cheeks Sings》**，
   不採 MB 把封面拆成 credit＋標題後留下的單字《Sings》——依第 50 條，
   並援引第 91 條（RG 標題與卡片盤名本來就不必相等）。單字盤名在外部服務上必然撈回雜訊。
3. **Spirit of Love 的盤名採《The Power of Your Love》**（Discogs 原盤帶定冠詞），
   MB 標題無定冠詞；同第 50／91 條。
4. **The East St. Louis Gospelettes 兩張統一掛「The East St. Louis Gospelettes」**——
   MB 逐盤的 credit 帶與不帶定冠詞不一致（1970 帶、1972 不帶），照抄會在池中造出兩個鍵，
   依第 49／121 條統一。
5. **Myrna Summers 掛短名**，不用 MB 那串 71 字元的 artist-credit——依第 11／25 條，
   長串掛名在封面與試聽 API 上必然落空；完整 credit 留在 `mbNote`。
6. **Twinkie Clark 掛 MB 實體名**（不是帶彎引號的 credit「Elbernita “Twinkie” Clark」）——依第 120／25 條。
7. **The Famous Ward Singers 掛 Discogs 原盤封面的寫法**，兩張都是（MB 一張 credit 作
   「The Famous Ward Singers」、一張作「The Ward Singers」）——依第 6／50 條，避免同團兩個鍵。

### 封面與試聽預估（2026-09-04 實測，已逐張寫進各卡 `risk`）

- **封面**：以 rgMbid 打 `coverartarchive.org/release-group/<id>/front`，**21/37（57%）回 2xx**，
  16 張 404，**探測錯誤 0**。404 的那 16 張要靠 Bandcamp／Spotify 或人工。
- **固定試聽**：iTunes Search API（`us`→`gb`→`jp`，藝人＋盤名粗形比對，自我同名卡用完全相等），
  **粗估 18/37 命中**；其中 **Spirit of Love 那筆配到的是《The Power of Your Love - Single》，
  依單曲尾綴規則會被擋掉**，所以實際預估約 **17/37（46%）**。探測錯誤 0（未遇到 403）。
  命中全部落在 `us`，只有 Myrna Summers 一張在 `gb`——與第 75 條一致：
  這批的數位再發權在美國（Savoy／Malaco 的 Fuel 2000、Universal 的 ABC-Peacock 目錄）。
  需本機注意的兩筆：Pilgrim Travelers 配到《Look Up! (Remastered 2022)》（帶再版尾綴，`yearDrift`）、
  The Clark Sisters《Unworthy》在 Apple 上只有 2002 年的二合一《You Brought the Sunshine / Unworthy》，
  依第 129 條**不採**。
- **自我同名卡 2 張**（Jessy Dixon、Reverend Bernard Avant），兩張都已實查 Apple 有精確條目
  （collectionId 1541264301／1510815240），不是查無；比對必須用完全相等（第 90 條）。

### 場景飽和度

**這個場景在池中幾乎是空的，但 MB 的建檔深度已經先一步見底。** 池中 20 餘張黑人福音卡全部集中在
四個掛名（Staple 家族 19 張佔了大半），Nashboro／Creed／Jewel／Peacock／Sound of Gospel／
Gospel Truth／Birthright／Checker 這八家廠牌合計 **0 張**；本批一次補進 37 張、31 位藝人，
八家全部開了口。但真正的天花板不在卡池而在 MusicBrainz——
**Nashboro 一家在 Discogs 上有 260 張 1955–81 的 LP，MB 只建了 4 筆**；
上面第二節列的 20 多個團、超過 40 張原盤 LP 全部釘不住。
**這條線還能再出一到兩批，但只能走 §1 人工身分路線**（Discogs 的編號與年份都齊全，舉證成本不高）。
MB 這一側已經挖乾淨了。
