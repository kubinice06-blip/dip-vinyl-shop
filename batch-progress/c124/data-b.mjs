// c-124 b 組：1979 之後——流亡、地下與古典。
const POOL = '實掃 seed_cards.json 全 14,424 列';
const NOTE = '行文界線（本批硬規則，逐張提醒下游研究層與寫作層）：why／risk／mbNote 與日後的簡介一律只寫可查證的事實——發行年、廠牌、盤面編號、曲目、編制、MB artist 的 area 欄記到哪個國家；不得寫政治立場、宗教評價、對體制的價值判斷，也不得把「流亡」「被禁」寫成敘事化描述。';
const POOLIR = '池中伊朗這一區只有 6 張、全在 8910–8915 列：Shajarian＋Alizadeh＋Kalhor＋Homayoun《Night Silence Desert》、Shajarian《Bidad》、Alizadeh & Gasparyan《Endless Vision》、Kalhor《Scattering Stars Like Dust》、Ghazal《The Rain》、Masters of Persian Music《Without You》。';
export default [
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Mohammad Reza Shajarian；Mohammad-Reza Shajarian؛ Shadjarian؛ Shajaryan؛ Astan e Janan؛ Astan-e Janan؛ محمدرضا شجريان؛ آستان جانان',
 reissuedBy:'MB 轄下 1 筆 release：1985，status 與 country 欄皆空、CD×11',
 g:'b',
 artist:'Mohammad Reza Shajarian',
 album:'Astan e Janan',
 year:1985,
 genres:['classical','world'],
 label:'1985（MB 該 release 未填 label-info、country 與 status，CD 11 軌）',
 why:`${POOL}，Shajarian 三種轉寫（Shajarian／Shadjarian／شجریان）命中 2 張——8910 列的《Night Silence Desert》(2000，四人合掛) 與 8911 列的《Bidad》(1985)。${POOLIR}《Astan e Janan》與《Bidad》同為 1985 年、同屬他 1980 年代中期最密的那批錄音，是補在《Bidad》旁邊最直接的一張。`,
 risk:`撞卡：${POOL}，三種轉寫命中 2 筆（8910、8911），本張《Astan e Janan》0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Mohammad Reza Shajarian」回 792 筆，目標 1e6c8164-… 排第 1、score 100，但 **MB 主名是波斯文「محمدرضا شجريان」**；卡片掛名依本批裁定取羅馬轉寫「Mohammad Reza Shajarian」，與池中 8910／8911 兩張的既有寫法一致（若改用波斯文主名，撞卡字串去重會看不見池中那兩張——裁定 49）。 ⚠ 該 release 的 status 與 country 欄都是空的，label-info 也空白。 年份：MB first-release-date 1985。 封面：CAA release-group/57fb49d6/front 實測回 200。 店面：Apple search「Shajarian Astan e Janan」在 de／fr／nl 對到 collectionId 1791744034「Mohammadreza Shajarian — Astan E Janan」（⚠ 掛名拼作 Mohammadreza，連寫），us／gb 回 0 筆可對得上（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group 57fb49d6-0617-4766-905e-97b3c8baf940，identitySource pinned。回問確認 title「Astan e Janan」、artist-credit「Mohammad Reza Shajarian」（artist MBID 1e6c8164-…，MB 主名為波斯文「محمدرضا شجريان」，disambiguation「Persian singer」，area Iran，begin 1940-09-23，名下 39 個 release-group、其中 26 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1985；轄下 release 1 筆：1985，status／country／label-info 皆空、CD×11。刻意不釘：760bcc99-1082-4b49-99e3-d3cae8eb31c2《Bidad》(1985，**池中 8911 列已有**)、0823ca06-ee8a-338e-9e90-2020d8d7af1b《Night Silence Desert》(2000，**池中 8910 列已有**)、09d5e7ab-8479-462c-8780-e485e48a9a98《Serre Eshgh》(1986-08-06)、2c5ea796-5a55-49fa-a4d1-ad29e0fa9feb《Jane Oshagh / Gonbade Mina》(1985，Meshkatian 合掛，記入未收清單餘量)、afd03621《Golhaye Tazeh No. 23: Abu Ata》(1975，同批 a 組另收)。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Shahram Nazeri；Shahram Nazery؛ Atashi Dar Neyestan؛ Atash Dar Neyestan؛ شهرام ناظری؛ آتشی در نیستان',
 reissuedBy:'MB 轄下 4 筆 release：1991-12-08 XW Official Digital Media×6、1991 IR Official CD×2、2009-02-03 IR Official CD×6、2009-04-11 XW Official Digital Media×6',
 g:'b',
 artist:'Shahram Nazeri',
 album:'Atashi Dar Neyestan',
 year:1991,
 genres:['classical','world'],
 label:'1991 IR Official CD（MB 該 release 未填 label-info）；2009 另有 IR CD 與數位再發各一',
 why:`Shahram Nazeri 是骨幹名單裡與 Shajarian 並列的兩位古典聲樂大家之一。${POOL}，Nazeri／Nazery／ناظری 三種寫法各 0 張——${POOLIR}裡一張也沒有他。本張的四筆 release 橫跨 1991 與 2009 兩輪發行，是他名下版本鏈最清楚的一個 release-group。`,
 risk:`撞卡：${POOL}，三種寫法各 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Shahram Nazeri」回 29 筆，目標 dc8cab1c-… 排第 1（disambiguation「Iranian tenor」、area Iran、begin 1950-02-18）；第 2 名是 Shahram Shabpareh（score 36）、第 3 是他兒子 Hafez Nazeri（36），只有 disambiguation 分得出來。 ⚠ 本 RG 的 artist-credit 在 MB 是波斯文「شهرام ناظری」，卡片掛名依本批裁定取羅馬轉寫。 ⚠ 版本分歧：四筆 release 的軌數是 6／2／6／6，1991 IR CD 那筆只有 2 軌，另有一筆 release title 拼作「Atash Dar Neyestan」（少一個 i）——軌數與拼法都不是識別鍵（裁定 174／251），要以 rgMbid 為準。 年份：MB first-release-date 1991-12-06。 封面：CAA release-group/2e5ef7bc/front 實測回 200。 店面：Apple search「Shahram Nazeri Atashi Dar Neyestan」在 us／gb／de／fr／nl 五店都對到 collectionId 314871934「Shahram Nazeri — Atashi Dar Neyestan」。 ${NOTE}`,
 mbNote:'釘 release-group 2e5ef7bc-341f-43ca-99cd-e94ef04f0d4e，identitySource pinned。回問確認 title「Atashi Dar Neyestan」、artist-credit「شهرام ناظری」（artist MBID dc8cab1c-207f-4f04-9118-02c753c8a69a，disambiguation「Iranian tenor」，名下 28 個 release-group、其中 28 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1991-12-06；轄下 release 4 筆：1991-12-06 XW Official Digital Media×6（title「Atash Dar Neyestan」）、1991 IR Official CD×2、2009-02-03 IR Official CD×6、2009-04-11 XW Official Digital Media×6。羅馬轉寫：Shahram Nazeri。刻意不釘：010d567f-c08f-4ed2-a4c0-8d6b4f728d97《گل صدبرگ》(1985-01-08，與 Jalal Zolfonoun 合掛，盤名只有波斯文，記入未收清單餘量)、2b07b5f2-9839-4fd4-83f1-8c98d0ff2dd7《Through Eternity》(1999-10-26)、b93f59da-c156-4a13-89a6-9ed20264c41d《The Passion of Rumi》(2007-08-21)。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Hossein Alizadeh；Hossein Alizadeh؛ Hossein Alizâdeh؛ Hossein Omoumi؛ Chahargah؛ Bayat-e Tork؛ حسین علیزاده؛ چهارگاه',
 reissuedBy:'MB 轄下 1 筆 release：1987-04-03 XW Official Digital Media×15',
 g:'b',
 artist:'Hossein Alizadeh & Hossein Omoumi',
 album:'Chahargah & Bayat-e Tork',
 year:1987,
 genres:['classical','world'],
 label:'1987-04-03 XW Official Digital Media 15 軌（MB 該 release 未填 label-info）',
 why:`${POOL}，Alizadeh／Alizade／علیزاده 三種寫法命中 2 張（8910《Night Silence Desert》、8912《Endless Vision》），**都是 2000 年之後的跨界合作**，他 1980–90 年代的 dastgah 錄音池中 0 張。本張是他名下 42 個 release-group 裡年份最早、且以兩個 dastgah（Chahargah、Bayat-e Tork）為題的一筆，補在那兩張跨界盤旁邊剛好交代他的本行。`,
 risk:`撞卡：${POOL}，三種寫法命中 2 筆（8910、8912），本張 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Hossein Alizadeh」回 119 筆，目標 9e167c32-… 排第 1（disambiguation「Iranian musician, composer, and scholar」、area Iran、begin 1951-08-23），但 **MB 主名寫作「Hossein Alizâdeh」（帶 â）**；第 2 名是亞塞拜然的 Akshin Alizadeh（score 40）。 ⚠ **非 ASCII 連字號**：MB 的 RG 標題是「Châhârgâh & Bayât–e Tork」，中間那個是 U+2013 短破折號，本批依 c-123plus 第五節把它換成 ASCII 連字號、並把變音符號一併拉平為「Chahargah & Bayat-e Tork」，MB 原標題寫進 mbNote 與 queryAlias。 ⚠ 載體：1987 年的碟記為 Digital Media，那是後來數位上架的 release。 年份：MB first-release-date 1987-04-03。 封面：CAA release-group/95e32073/front 實測回 200。 店面：Apple search「Hossein Alizadeh Chahargah Bayat-e Tork」在 us／gb／de／fr／nl 五店各回 0 筆可對得上的條目（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group 95e32073-d160-469e-808f-a8726ea51cd3，identitySource pinned。回問確認 MB title「Châhârgâh & Bayât–e Tork」（⚠ 含 U+2013，卡片盤名已改為 ASCII 連字號並拉平變音符號）、artist-credit「Hossein Alizadeh & Hossein Omoumi」（Alizadeh MBID 9e167c32-…，MB 主名「Hossein Alizâdeh」，名下 42 個 release-group、其中 38 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1987-04-03；轄下 release 1 筆：1987-04-03 XW Official Digital Media×15。刻意不釘：3e90e891-3d07-4a9f-a40f-d62185d8fed3《Endless Vision》(2006-02-14，Live，**池中 8912 列已有同名碟**)、0823ca06《Night Silence Desert》(**池中 8910 列已有**)、43dcdef4-6f50-4e7f-83c4-9f304e45fa44《Neynava》(2006-10-11) 與 a294cfae-ded4-3f4c-b7b0-7b9ced184e0e《Ney-Nâva》(1995，Compilation)——同一批《Ney-Nava》錄音的兩個條目，§5.6 明文只挑一種，本批兩個都不取。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Kayhan Kalhor；Kayhan Kalhour؛ Brooklyn Rider؛ Silent City؛ کیهان کلهر',
 reissuedBy:'MB 轄下 1 筆 release：2008-09-09 US Official CD×4',
 g:'b',
 artist:'Kayhan Kalhor, Brooklyn Rider',
 album:'Silent City',
 year:2008,
 genres:['classical','world'],
 label:'2008-09-09 US Official CD 4 軌（MB 該 release 未填 label-info）',
 why:`${POOL}，Kalhor／Kalhour／کلهر 三種寫法命中 2 張（8910《Night Silence Desert》、8913《Scattering Stars Like Dust》），另有 8914《Ghazal — The Rain》與 8915《Masters of Persian Music — Without You》兩張是他參與的合奏團但未以本名掛牌。《Silent City》是他與美國弦樂四重奏 Brooklyn Rider 的合作，四軌長篇，補在那兩張旁邊是他 2000 年代之後的另一條線。`,
 risk:`撞卡：${POOL}，三種寫法命中 2 筆（8910、8913），本張 0 命中；⚠ 池中 8914《Ghazal — The Rain》與 8915《Masters of Persian Music — Without You》也是他參與的錄音，掛名不同、**撞卡字串去重看不見**，深度量測時要一起算。 掛名回問（裁定 179／250）：MB artist 搜尋「Kayhan Kalhor」只回 10 筆，目標 dd2a84cc-… 排第 1（area Iran、begin 1963-11-24），**disambiguation 空白**——依本批硬規則第 7 條，disambiguation 未填的掛名不得背書本名，下游只寫盤面可查的事實。 ⚠ 同名 RG 雙胞胎：他名下另有 52296835 與 9b4a2fb6 兩個都叫《Blue as the Turquoise Night》、first-release-date 都是 2021-11-12 的 release-group，是 MB 的重複條目，本批兩個都不取。 ⚠ 軌數 4：長篇曲式，軌數不是識別鍵（裁定 174）。 年份：MB first-release-date 2008-09-09。 封面：CAA release-group/9d47870f/front 實測回 200。 店面：Apple search「Kayhan Kalhor Brooklyn Rider Silent City」只在 nl 對到 collectionId 586280803「Kayhan Kalhor & Brooklyn Rider — Silent City - **EP**」——⚠ Apple 那筆標為 EP，與本張 Album 不是同一個版本，上架時要辨；us／gb／de／fr 回 0 筆可對得上（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group 9d47870f-55de-49a1-a6eb-6bf3e5c2daa9，identitySource pinned。回問確認 title「Silent City」、artist-credit「Kayhan Kalhor, Brooklyn Rider」（Kalhor MBID dd2a84cc-…，area Iran，begin 1963-11-24，disambiguation 空白，名下 17 個 release-group、其中 16 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 2008-09-09；轄下 release 1 筆：2008-09-09 US Official CD×4。刻意不釘：382c8483-65b7-3757-87ba-9f4f68e23a69《Scattering Stars Like Dust》(1998，**池中 8913 列已有**)、0823ca06《Night Silence Desert》(**池中 8910 列已有**)、94046bc3-b4f4-4514-9916-1232d760a0cf《The Rain (Live in Concert)》(2003-04-22，**池中 8914 列已有 Ghazal 掛名的《The Rain》**)、52296835-1e12-42d4-8663-351af008c035 與 9b4a2fb6-7835-4ab7-8102-57ae4763ee2e《Blue as the Turquoise Night》(2021-11-12，MB 重複條目)。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Homayoun Shajarian；Homayun Shajarian؛ Ali Ghamsari؛ Naghshe Khial؛ Naghsh-e Khial؛ همایون شجریان؛ نقش خیال',
 reissuedBy:'MB 轄下 1 筆 release：2005-05-27 AF Official Digital Media×8',
 g:'b',
 artist:'Homayoun Shajarian & Ali Ghamsari',
 album:'Naghshe Khial',
 year:2005,
 genres:['classical','world'],
 label:'2005-05-27 Official Digital Media 8 軌（MB release country 記為 AF、未填 label-info）',
 why:`${POOL}，Homayoun／Homayun／همایون 三種寫法命中 2 筆——8908 列的 Homayun Sakhi 是阿富汗 rubab 樂手（假陽性），8910 列的《Night Silence Desert》是四人合掛。**他以自己名字掛牌的碟池中 0 張**。本張是他名下 41 個 release-group 裡年份較早、與 tar 手 Ali Ghamsari 對奏的一筆。`,
 risk:`撞卡：${POOL}，三種寫法命中 2 筆，其中 8908 是假陽性（阿富汗的 Homayun Sakhi）、8910 是四人合掛的《Night Silence Desert》，本張 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Homayoun Shajarian」只回 14 筆，目標 a5120e5e-… 排第 1（area Iran、begin 1975-05-21），**disambiguation 空白**——依硬規則第 7 條不得背書本名；第 2 名是他父親的波斯文條目「محمدرضا شجريان」(score 35)，第 3、4 名是同姓的 Mojgan／Ashkan Shajarian。 ⚠ release country 記為 **AF（阿富汗）**，與盤的來歷不合，很可能是 MB 的資料錯誤，研究層要另尋來源核對。 年份：MB first-release-date 2005-05-27。 封面：CAA release-group/bc28d1d3/front 實測回 200。 店面：Apple search「Homayoun Shajarian Naghshe Khial」只在 nl 對到 collectionId 1145687274「Homayoun Shajarian — Naghshe Khial」，us／gb／de／fr 回 0 筆可對得上（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group bc28d1d3-b103-4508-9421-891ad6fc55b1，identitySource pinned。回問確認 title「Naghshe Khial」、artist-credit「Homayoun Shajarian & Ali Ghamsari」（Homayoun MBID a5120e5e-…，area Iran，begin 1975-05-21，disambiguation 空白，名下 41 個 release-group、其中 29 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 2005-05-27；轄下 release 1 筆：2005-05-27 country AF、Official Digital Media×8（country 存疑，見 risk）。刻意不釘：0823ca06《Night Silence Desert》(**池中 8910 列已有**)、837662de-8902-4e23-a0b5-1caede49423c《It\'s Winter》(2001，Live，與 Kalhor、Alizadeh 同掛)、143f254a-77c1-4224-a693-42331ce74598《Nasime Vasl》(2003-11-08)。'
}
];
