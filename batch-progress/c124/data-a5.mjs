const POOL = '實掃 seed_cards.json 全 14,424 列';
const NOTE = '行文界線（本批硬規則，逐張提醒下游研究層與寫作層）：why／risk／mbNote 與日後的簡介一律只寫可查證的事實——發行年、廠牌、盤面編號、曲目、編制、藝人在哪一年離開伊朗；不得寫政治立場、宗教評價、對體制的價值判斷，也不得把「流亡」「被禁」寫成敘事化描述。';
export default [
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Golhaye Rangarang；Golha؛ Akbar Golpaygani؛ Golpayegani؛ Golpa؛ Elaheh؛ Hayedeh؛ Mahmoodi Khansari؛ گلهای رنگارنگ؛ اکبر گلپایگانی',
 reissuedBy:'MB 轄下 1 筆 release：1976-04-16 XW Official Digital Media×5',
 g:'a',
 artist:'Akbar Golpaygani, Elaheh, Mahmoodi Khansari & Hayedeh',
 album:'Golhaye Rangarang 539 & 540',
 year:1976,
 genres:['classical','world'],
 label:'1976-04-16 XW Official Digital Media 5 軌（原為伊朗國家廣播「گلهای رنگارنگ」節目第 539 與 540 輯，MB 未填 label-info）',
 why:`「Golhaye Rangarang」（繽紛之花）是 Golha 系列裡最長壽的一支，本張把第 539、540 兩輯併成一盤，一次帶進 Akbar Golpaygani、Elaheh、Mahmoodi Khansari、Hayedeh 四個掛名。${POOL}，Golpayegani／Golpaygani／Golpa／گلپایگانی 三種轉寫各 0 張，Hayedeh／Haydeh／هایده 三種轉寫也是 0 張。這是 a 組單張帶進最多掛名的一筆。`,
 risk:`撞卡：${POOL}，四個掛名的三種轉寫全部 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Akbar Golpayegani」回 89 筆，目標 6d4173d2-… 排第 1，但 **MB 主名是波斯文「اکبر گلپایگانی」**、disambiguation「Iranian singer」、area Iran、begin 1934-01-30；第 2 名是同姓的 Farzad Golpayegani（score 52）。⚠ 本 RG 的 artist-credit 用的是「Akbar Golpaygani」（少一個 e），與搜尋鍵「Golpayegani」不同拼法——卡片掛名照 artist-credit 取，其餘拼法寫進 queryAlias。查「Hayedeh」只回 1 筆、目標 da616429-… score 100。 ⚠ 年份與載體：first-release-date 1976-04-16，但 release 記為 Digital Media，那是後來數位上架的 release，不是 1976 年的原盤載體；5 軌也明顯少於一輯 Golha 節目的實際曲目數（裁定 251：軌數隨載體變動，不是識別鍵）。 封面：CAA release-group/d15afb23/front 實測回 200。 店面：Apple search「Golhaye Rangarang 539」在 fr 對到 collectionId 6793091280「Akbar Golpaygani (Golpa), Elaheh, Mahmoodi Khansari & Hayedeh — Golhaye Rangarang 539 & 540」，掛名與盤名同時對得上；us／gb／de／nl 則對到同系列別輯（Golhaye Rangarang 524，collectionId 511619521／6793092597），**不是本張**，上架時要辨輯號。 ${NOTE}`,
 mbNote:'釘 release-group d15afb23-fc0e-4706-9959-f00bd54afb34，identitySource pinned。回問確認 title「Golhaye Rangarang 539 & 540」、artist-credit「Akbar Golpaygani, Elaheh, Mahmoodi Khansari & Hayedeh」（Golpaygani MBID 6d4173d2-…，MB 主名為波斯文「اکبر گلپایگانی」，名下 5 個 release-group；Hayedeh MBID da616429-…，名下 34 個 release-group、其中 30 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1976-04-16；轄下 release 1 筆：1976-04-16 XW Official Digital Media×5。刻意不釘：a77086a5-d885-40a2-97a4-ba78833908be《Golhaye Rangarang Dele Bigharar》(1989-05-24)、106a1acb-b30c-499b-a047-80bc81eaa2d9《Golhaye Rangarang Az Dideh Baaram》(1989-06-05)、7fdc6e0a-211c-493a-8c04-8f793e633b4d《Golhaye Rangarang Darigha》(1989-05-30)、e8001341-1eba-47f6-9dfc-a3ab30bf8762《Golhaye Rangarang No. 541 & 267》(1995-02-14)——同系列別輯，first-release-date 皆落在 1979 之後。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Jalil Shahnaz；Abdolvahhab Shahidi؛ Faramarz Payvar؛ Hoseyn Tehrani؛ Asqar Bahari؛ Musique Persane؛ Iran Musique persane؛ جلیل شهناز',
 reissuedBy:'1987-10 FR Official CD×2（release title 改作「Iran: Musique persane」）',
 g:'a',
 artist:'Jalil Shahnaz, Abdolvahhab Shahidi, Asqar Bahari, Faramarz Payvar, Hasan Nahid & Hoseyn Tehrani',
 album:'Musique Persane',
 year:1971,
 genres:['classical','world'],
 label:'1971 FR Official 12" 黑膠 2 軌（MB 該 release 未填 label-info）；1987-10 FR CD 再發改名「Iran: Musique persane」',
 why:`本批 a 組唯一一張 MB 直接記為「12 吋黑膠、法國、1971」的實體原盤，六位演奏者是伊朗傳統器樂在歐洲留下的最早一批錄音之一（tar：Jalil Shahnaz；santur：Faramarz Payvar；kamancheh：Asqar Bahari；ney：Hasan Nahid；tombak：Hoseyn Tehrani；聲樂：Abdolvahhab Shahidi）。${POOL}，六個掛名各 0 張。`,
 risk:`撞卡：${POOL}，六個掛名各 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Jalil Shahnaz」回 55 筆，目標 89040d46-… 排第 1（area Iran、begin 1921-05-22）；⚠ 但單查「Jalil」時第 1 名是 The Last Poets 的 Jalal Nuriddin（f9f6fb86，score 100），目標不在前四——短掛名的 score 排序不可用。 ⚠ 掛名極長（六位並列），這是 MB 的 artist-credit 原文；卡片依裁定 6／70／120 照 MB 實體文字取，不自行縮短。 ⚠ 再發改名（裁定 45）：1987 年 CD 再發的 release title 是「Iran: Musique persane」，與 RG 標題不同；本批取 RG 標題「Musique Persane」，再發名寫進 queryAlias。 年份：MB first-release-date 1971，release country FR、載體 12" Vinyl，是本批年份最可信的一筆。 ⚠ 軌數 2 是黑膠一面一軌的記法（裁定 251），不是曲目數。 封面：CAA release-group/b4e1e362/front 實測回 200。 店面：本批未跑本張的 Apple search（Apple 端點在本批後段回 429／403，已記入 rulings）；封面與試聽由研究層另跑。 ${NOTE}`,
 mbNote:'釘 release-group b4e1e362-12a6-4a9b-bd78-bab84b1c81c0，identitySource pinned。回問確認 title「Musique Persane」、artist-credit「Jalil Shahnaz, Abdolvahhab Shahidi, Asqar Bahari, Faramarz Payvar, Hasan Nahid & Hoseyn Tehrani」、primary-type Album、secondary-types 空、first-release-date 1971；轄下 release 2 筆：1971 FR Official 12" Vinyl×2、1987-10 FR Official CD×2（title「Iran: Musique persane」）。Jalil Shahnaz artist MBID 89040d46-…，名下 3 個 release-group。刻意不釘：7e25f3b5-215a-48ea-b275-d591cf1702ee《Daftare Tar》(2006)、afd03621《Golhaye Tazeh No. 23: Abu Ata》(1975，同批另收、掛名不同)。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Pari Zanganeh；Pari Zangeneh；The Series of Music for Young Adults；Iranian Folk Songs；پری زنگنه',
 reissuedBy:'Pharaway Sounds（PHS-075，2009-01-19 ES CD×11）；另有一筆 IR Official Digital Media×11、無日期',
 g:'a',
 artist:'Pari Zanganeh',
 album:'The Series of Music for Young Adults: Iranian Folk Songs',
 year:1976,
 genres:['folk','world'],
 label:'原盤 1976（伊朗國內發行）；MB 所釘 release 為 Pharaway Sounds 2009-01-19 ES CD 11 軌的復刻',
 why:`Pari Zanganeh 1976 年為青少年錄的伊朗各地民謠選，Pharaway Sounds 以 PHS-075 復刻（HHV 的商品頁把它記為「1976 - EU - Reissue」）。${POOL}，Pari Zanganeh／Zangeneh／زنگنه 三種寫法各 0 張。這是 a 組唯一一張民謠取向的碟，與 funk／psych 那幾張互補。`,
 risk:`撞卡：${POOL}，三種寫法各 0 命中。 ⚠ 短掛名回問（裁定 179／250）：MB artist 搜尋「Pari Zanganeh」回 **1,849 筆**，目標 cd831379-… 排第 1（area Iran、begin 1939）但 **disambiguation 是空的**——依本批硬規則第 7 條，連 disambiguation 都沒填的掛名**不得背書本名**，下游寫作層不要宣稱這位是誰、不要補生平；只能寫盤面可查的事實。第 2 名起是 Pari Pari、PARI$、PARI 等無關實體（score 38–40）。 ⚠ 年份分歧（裁定 220）：MB first-release-date 是 2009-01-19（Pharaway 復刻），MB 沒有 1976 年的 release；原盤年 1976 取自 HHV 的商品頁與 Forced Exposure 的 PHS-075 條目，year 取 1976，復刻年寫進 label 與 mbNote。**這是本批「MB 只有復刻年、原盤年靠店面商品頁」的典型一筆，研究層要再驗一次。** ⚠ 第一筆 release 的 status 欄是空的（不是 Official）。 封面：CAA release-group/1bfdef1f/front 實測回 200。 店面：Apple search「Pari Zanganeh Iranian Folk Songs」在 us／gb／de／fr／nl 五店各回 0 筆可對得上的條目（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group 1bfdef1f-2f22-4d61-b275-769f8acc3182，identitySource pinned。回問確認 title「The Series of Music for Young Adults: Iranian Folk Songs」、artist-credit「Pari Zanganeh」（artist MBID cd831379-…，area Iran，begin 1939，**disambiguation 空白**，名下 10 個 release-group、其中 10 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 2009-01-19；轄下 release 2 筆：2009-01-19 ES（status 空）CD×11、無日期 IR Official Digital Media×11。⚠ MB 沒有 1976 年的 release，原盤年 1976 來自 Pharaway Sounds PHS-075 的店面商品頁（HHV 標「1976 - EU - Reissue」、Forced Exposure PHS.075LP）；不得把 2009 當原盤年。波斯文原文：پری زنگنه。刻意不釘：3234e594-c795-407e-9849-ace6af06074b《Boz Boze Ghandi》(1987-01-01，Fariborz Lachini 合掛)、91afb062-ed42-412f-89d0-dd4498eac0d0《Ahang\'haye Mahalli-1》(2015-01-18)、dc9c840d-d04b-4231-b795-5350d15a79f1《Ahang\'haye Mahalli-2》(2015-01-19)。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Zia；Zia Atabay؛ Atabay؛ Helel Yos؛ Helelyos؛ ضیا؛ ضیا اتابای',
 reissuedBy:'MB 轄下 1 筆 release：1996-01-01 XW Official Digital Media×8',
 g:'a',
 artist:'Zia',
 album:'Helel Yos',
 year:1996,
 genres:['rock','pop'],
 label:'1996-01-01 XW Official Digital Media 8 軌（MB 該 release 未填 label-info）',
 why:`〈Helelyos〉是 Finders Keepers《Pomegranates》的開場曲，也是這條線在英語樂評裡被引用最多的一首。${POOL}，Zia／Zia Atabay／ضیا 三種寫法各 0 張（「zia」字串的 8 筆命中全是 Urszula、Luzia、Lucrezia 這類假陽性）。他名下 MB 只有這一個 release-group，沒有第二個選項。`,
 risk:`⚠ 短掛名回問（裁定 179／250）：MB artist 搜尋「Zia」回 **1,647 筆**，第 1 名是波士頓／紐約的 Zia（score 100）、第 2 是南非搖滾團（99）、第 3 是韓國歌手 지아（98），目標 59baeaed-… 排到第 4、score 97（disambiguation「Iranian Singer」、area United States、begin 1942-03-30）——**score 排序完全不可用**，只有 disambiguation 分得出來。改查「Zia Atabay」時目標才排第 1（score 100）。 撞卡：${POOL}，「zia」8 筆命中逐筆檢視全為假陽性，伊朗的 Zia 0 張。 ⚠ 原盤年不可考（本批硬規則第 9 條）：MB first-release-date 是 1996-01-01、載體是 Digital Media，這**不是**〈Helelyos〉的原盤年；1970 年代的原盤（伊朗國內 45 轉單曲）MB 沒有建 release，Discogs 與廠牌頁也查不到明確年份。year 欄填的 1996 **是 MB 上唯一可得的年份、不是原盤年**，這一點必須寫進日後的簡介與備註，不得以 1996 冒充原盤年。 ⚠ 同名別碟：MB release-group 搜尋「Zia」回一串《Zia》同名盤（833229f0 1986 Album、c67227c3 2007 Compilation、a92e833e《Zia v1.2》1992、17938c99《Zia v1.5》1994），皆為別的 Zia，已寫進刻意不釘。 封面：CAA release-group/13099331/front 實測回 200。 店面：Apple search「Zia Helel Yos」在 us／gb／de／fr／nl 五店都對到 collectionId 492511877「ZiA — Helel Yos」（⚠ 掛名大小寫作 ZiA，上架時要確認是同一位）。 ${NOTE}`,
 mbNote:'釘 release-group 13099331-38a3-4958-ad79-a595ddc6b5fe，identitySource pinned。回問確認 title「Helel Yos」、artist-credit「Zia」（artist MBID 59baeaed-…，disambiguation「Iranian Singer」，area United States，begin 1942-03-30，名下只有 1 個 release-group）、primary-type Album、secondary-types 空、first-release-date 1996-01-01；轄下 release 1 筆：1996-01-01 XW Official Digital Media×8。⚠ **本張只有 1996 這個年份可得，1970 年代原盤年查無來源**；〈Helelyos〉另以單曲形態收在 Finders Keepers《Pomegranates》(2009)。波斯文原文：ضیا اتابای。刻意不釘：833229f0-8893-4a2d-a988-eaa4c773977f《Zia》(1986)、c67227c3-f048-4bd6-8a50-d276a4ee2cde《Zia》(2007，Compilation)、a92e833e-a844-4a69-b1e6-dba2acbd433e《Zia v1.2》(1992)、17938c99-97ca-46a6-aeb9-a885d9de73a3《Zia v1.5》(1994)——同名不同實體的碟。'
}
];
