const POOL = '實掃 seed_cards.json 全 14,424 列';
const NOTE = '行文界線（本批硬規則，逐張提醒下游研究層與寫作層）：why／risk／mbNote 與日後的簡介一律只寫可查證的事實——發行年、廠牌、盤面編號、曲目、編制、MB artist 的 area 欄記到哪個國家；不得寫政治立場、宗教評價、對體制的價值判斷，也不得把「流亡」「被禁」寫成敘事化描述。';
const POOLIR = '池中伊朗這一區只有 6 張、全在 8910–8915 列（Shajarian 兩張、Alizadeh、Kalhor、Ghazal、Masters of Persian Music），全是古典與跨界。';
export default [
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Parissa；Parisa؛ Fatemeh Vaezi؛ Ensemble Dastan؛ Shoorideh؛ پریسا؛ شوریده',
 reissuedBy:'MB 轄下 1 筆 release：2003-08-12 Official CD×8+CD×7（country 欄為空）',
 g:'b',
 artist:'Parissa & Ensemble Dastan',
 album:'Shoorideh',
 year:2003,
 genres:['classical','world'],
 label:'2003-08-12 Official 2CD 8+7 軌（MB 該 release 未填 label-info 與 country）',
 why:`${POOL}，Parissa／Parisa／پریسا 三種寫法各 0 張。${POOLIR}女性古典聲樂在池中完全沒有，這張是最直接的第一張。與 Ensemble Dastan 合作的雙 CD，是她名下 MB 唯一的 release-group。`,
 risk:`⚠ 短掛名回問（裁定 179／250）：MB artist 搜尋「Parisa」回 24 筆，前四名是 TWS 的 PARISA、psytrance 的 Parisa、巴黎的 feat. 藝人 Parisa、法伊混血 DJ Parisa（score 88–100），**目標完全不在其中**；改查本名「Fatemeh Vaezi」才撈到——而且 MB 上有**兩個重複實體**：dfca4221-8342-4ef1-badf-57c303be1ce8「Parissa」（disambiguation「Iranian Fatemeh Vaezi」、area Tehran、名下 1 個 RG）與 2bde9c6d-6ec0-4f37-806a-7a2bad2b1d21「Fatemer Vaezi Parisa」（disambiguation「Persian classical singer」、begin 1950-03-15、名下 **0 個 RG**）。本批釘有 RG 的那一個（dfca4221）。**score 排序在這個掛名上完全失效。** 撞卡：${POOL}，三種寫法各 0 命中。 ⚠ 掛名拼法：MB 主名是雙 s 的「Parissa」，一般文獻多寫單 s 的「Parisa」；卡片照 MB artist-credit 取 Parissa，另一種寫法進 queryAlias。 年份：MB first-release-date 2003-08-12。 封面：CAA release-group/544c4a8e/front 實測回 200。 店面：Apple search「Parissa Ensemble Dastan Shoorideh」只在 gb 對到 collectionId 511196488「Parissa & Ensemble Dastan — Shoorideh」，us／de／fr／nl 回 0 筆可對得上（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group 544c4a8e-cb57-4001-bf9c-0644c80046c8，identitySource pinned。回問確認 title「Shoorideh」、artist-credit「Parissa & Ensemble Dastan」（Parissa MBID dfca4221-8342-4ef1-badf-57c303be1ce8，disambiguation「Iranian Fatemeh Vaezi」，area Tehran，名下只有 1 個 release-group）、primary-type Album、secondary-types 空、first-release-date 2003-08-12；轄下 release 1 筆：2003-08-12 Official CD×8+CD×7，country 欄為空。⚠ MB 有第二個同人重複實體 2bde9c6d-6ec0-4f37-806a-7a2bad2b1d21「Fatemer Vaezi Parisa」（disambiguation「Persian classical singer」、begin 1950-03-15），名下 0 個 release-group，**刻意不釘**；兩個實體應合併，但那是 MB 端的編輯問題，本批不處理。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Sima Bina；Simabina؛ Iran Musique du Sud du Khorassan؛ South Khorasan؛ سیما بینا',
 reissuedBy:'MB 轄下 1 筆 release：1994-06-17 FR Official CD×5',
 g:'b',
 artist:'Sima Bina',
 album:'Iran: Musique du Sud du Khorassan',
 year:1994,
 genres:['folk','world'],
 label:'1994-06-17 FR Official CD 5 軌（MB 該 release 未填 label-info；法國田野錄音系列）',
 why:`Sima Bina 的〈Naz Kardanet Vaveyla〉是 Finders Keepers《Pomegranates》十六軌之一，a 組已由該輯帶進她 1970 年代的錄音；本張是她 1990 年代在法國錄的呼羅珊南部民謠選，把同一個掛名的兩端接起來。${POOL}，Sima Bina／سیما بینا 兩種寫法各 0 張。${POOLIR}`,
 risk:`撞卡：${POOL}，兩種寫法各 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Sima Bina」回 1,235 筆，目標 a3708eff-… 排第 1、score 100，但 **MB 主名是波斯文「سیما بینا」**、area Iran、begin 1945-01-04，**disambiguation 空白**——依硬規則第 7 條不得背書本名；第 2 名起是南韓的 Sima、斯洛伐克的 SIMA、Bina Nkwazi（score 42–43）。 撞卡另注意：a 組的《Pomegranates》收有她的曲目，但那是合輯掛 Various Artists，與本張不構成撞卡。 ⚠ 軌數 5：田野錄音長篇，軌數不是識別鍵（裁定 174）。 年份：MB first-release-date 1994-06-17。 封面：CAA release-group/ab31d530/front 實測回 200。 店面：Apple search「Sima Bina Khorassan」只在 nl 對到 collectionId 111045892「Sima Bina — The Music of **North** Khorassan」——⚠ 那是北呼羅珊、**不是本張的南呼羅珊**，是同系列別碟，上架時要辨；us／gb／de／fr 回 0 筆可對得上（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group ab31d530-5aa3-427b-911d-f0d0ffdf461f，identitySource pinned。回問確認 title「Iran: Musique du Sud du Khorassan」、artist-credit「Sima Bina」（artist MBID a3708eff-…，MB 主名為波斯文「سیما بینا」，area Iran，begin 1945-01-04，disambiguation 空白，名下 6 個 release-group、其中 5 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1994-06-17；轄下 release 1 筆：1994-06-17 FR Official CD×5。刻意不釘：3678d22b-8bd0-35d6-b92b-0876b433e871《Iran: Musique du Nord du Khorassan》(1995，同系列的北呼羅珊卷，Apple nl 對到的是這一張)、16817a79-5d09-407a-8948-51f2b6d4cdbe《Sounds From The Plain》(1997)、83e2cb40-cad9-40b1-8bfd-b19940e0b0e4《عشق گل》(2000)。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'The Kamkars；Kamkars؛ The Kâmkârs؛ Kamkar؛ Nightingale With a Broken Wing؛ کامکارها',
 reissuedBy:'MB 轄下 1 筆 release：1997，status 與 country 欄皆空、CD×8',
 g:'b',
 artist:'The Kamkars',
 album:'Nightingale With a Broken Wing',
 year:1997,
 genres:['folk','world','classical'],
 label:'1997（MB 該 release 未填 label-info、country 與 status，CD 8 軌）',
 why:`Kamkar 家族樂團是伊朗庫德語系音樂在國際上流通最廣的一支。${POOL}，Kamkar／Kâmkâr／کامکار 三種寫法各 0 張。${POOLIR}庫德語系那一塊完全空白，這張是進入點。`,
 risk:`撞卡：${POOL}，三種寫法各 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Kamkars」只回 1 筆，目標 d71550ac-… score 100（area Kordestān、begin 1965），**disambiguation 空白**——依硬規則第 7 條不得背書本名。⚠ 但改查「The Kamkars」時回 **193,908 筆**，第 2 名起是 The Beatles、Various Artists、Bruce Springsteen（score 53–54）——冠詞會把 score 排序整組打壞，只有第一種查法可用。 ⚠ 掛名寫法：MB 主名帶長音符「The Kâmkârs」，卡片依 c-123plus 第五節把變音符號拉平為「The Kamkars」，MB 原寫法進 queryAlias 與 mbNote。 ⚠ 該 release 的 status 與 country 欄都是空的。 年份：MB first-release-date 1997。 封面：CAA release-group/cc94a8b0/front 實測回 200。 店面：Apple search「Kamkars Nightingale With a Broken Wing」只在 us 對到 collectionId 1577132839「Kamkars Ensemble — Xoş E Hewreman (Nightingale With a Broken Wing)」——⚠ 掛名寫作 Kamkars Ensemble、盤名前面多了庫德語主標，上架時要確認是同一張；gb／de／fr／nl 回 0 筆可對得上。 ${NOTE}`,
 mbNote:'釘 release-group cc94a8b0-5196-494c-a61a-743c1e8d8127，identitySource pinned。回問確認 title「Nightingale With a Broken Wing」、artist-credit「The Kâmkârs」（artist MBID d71550ac-…，area Kordestān，begin 1965，disambiguation 空白，名下 8 個 release-group、其中 7 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1997；轄下 release 1 筆：1997，status／country／label-info 皆空、CD×8。卡片掛名已拉平變音符號作「The Kamkars」。刻意不釘：f69965ac-f882-4133-8397-515299f72d16《The Living Fire: Music From Kurdistan, Live in Paris》(1998-06)、db4479b5-5a79-4942-8df7-5370edeb89ee《Chant of Drums》(2001)、63bd6b69-11b8-43f5-b0d0-43168fff10d1《Tonight》(無日期，Compilation)。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Hayedeh；Haydeh؛ Sogand؛ هایده؛ سوگند',
 reissuedBy:'MB 轄下 1 筆 release：1988 US Official Digital Media×5',
 g:'b',
 artist:'Hayedeh',
 album:'Sogand',
 year:1988,
 genres:['pop','world'],
 label:'1988 US Official Digital Media 5 軌（MB 該 release 未填 label-info）',
 why:`${POOL}，Hayedeh／Haydeh／هایده 三種寫法各 0 張。a 組已由 1976 年的《Golhaye Rangarang 539 & 540》帶進她革命前的一段錄音，本張是她 1988 年在美國發行的碟，兩張跨過 1979 這條界線。MB 的 artist area 欄記為 Iran、begin 1942-04-10。`,
 risk:`撞卡：${POOL}，三種寫法各 0 命中；a 組的《Golhaye Rangarang 539 & 540》artist-credit 含 Hayedeh，但那是四人合掛的別張 release-group，不構成撞卡。 掛名回問（裁定 179／250）：MB artist 搜尋「Hayedeh」只回 1 筆，目標 da616429-… score 100、disambiguation「iranian Singer」，是本批少數不需要靠 disambiguation 排除同名的掛名。 ⚠ 她名下 34 個 release-group 裡有 10 個沒有 first-release-date、9 個盤名只有波斯文，跨文字系統的撞卡字串去重看不見（裁定 49），研究層要兩種文字都查。 ⚠ 軌數 5 偏少，且載體記為 Digital Media，1988 年的原始載體不是這個。 年份：MB first-release-date 1988。 封面：CAA release-group/a706461b/front 實測回 200。 店面：Apple search「Hayedeh Sogand」在 gb／de／nl 對到 collectionId 285927245「Sogand」（⚠ gb 那筆的掛名顯示為波斯文「هایده」、de／nl 顯示為 Hayedeh，同一個 collectionId 在不同店面掛名文字不同）；us／fr 回 HTTP 429／403，本批未取得結果（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group a706461b-9316-421b-b148-b14bd290513e，identitySource pinned。回問確認 title「Sogand」、artist-credit「Hayedeh」（artist MBID da616429-d71b-4869-8b4e-cd279d94301c，disambiguation「iranian Singer」，area Iran，begin 1942-04-10，名下 34 個 release-group、其中 30 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1988；轄下 release 1 筆：1988 US Official Digital Media×5。刻意不釘：d15afb23-fc0e-4706-9959-f00bd54afb34《Golhaye Rangarang 539 & 540》(1976，**同批 a 組另收**)、79822943-277f-422a-a7d8-b3d3c3e7ab67《Padeshaheh Khooban》(1992-04-07)、6ebf447e-a76c-44a2-8c83-cd071af371ce《Concerte Bozorge Hayedeh - Elaheh - Morteza Hananeh》(2004-04-02)、454e072b-e1af-40e9-9d2b-f6b168b33600《40 Golden Hits of Hayedeh》(2008-07-18，Compilation，§5.6 明文排除的重複包裝)。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Mahasti；Mahasty؛ Bigane؛ Bigane؛ مهستی؛ بیگانه',
 reissuedBy:'MB 轄下 1 筆 release：1993 Official Digital Media×16（country 欄為空）',
 g:'b',
 artist:'Mahasti',
 album:'Bigane',
 year:1993,
 genres:['pop','world'],
 label:'1993 Official Digital Media 16 軌（MB 該 release 未填 label-info 與 country）',
 why:`Mahasti 是 Hayedeh 的妹妹，兩人同屬 1980–90 年代美國伊朗語流行唱片的核心掛名。${POOL}，Mahasti／Mahasty／مهستی 三種寫法各 0 張。本張是她名下 19 個 release-group 裡少數盤名為拉丁轉寫、年份明確的一筆。`,
 risk:`撞卡：${POOL}，三種寫法各 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Mahasti」只回 2 筆，目標 e0668079-… 排第 1（area Iran、begin 1946-11-16），**disambiguation 空白**——依硬規則第 7 條不得背書本名；第 2 名是德國的 Mahasti Kamdar（score 80）。 ⚠ 她名下有三個 release-group 是與 Hayedeh 合掛的（92778714《زندگی》、a7e8f32d《ترانه سال》、1e87ae23《آلبوم هایده و مهستی و حمیرا》、7692cd46《ترانه هائی از: مهستی, هایده, ایرج》），盤名全為波斯文，跨文字系統去重看不見（裁定 49）。 ⚠ 載體記為 Digital Media，1993 年的原始載體不是這個。 年份：MB first-release-date 1993。 封面：CAA release-group/ca032641/front 實測回 **404**——本批 CAA 404 的六張之一，封面要靠其他來源。 店面：Apple search「Mahasti Bigane」在 gb／de／nl 各回 0 筆可對得上，us／fr 回 HTTP 403／429 未取得結果（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group ca032641-a87c-4435-93f9-1e1f1e4e698a，identitySource pinned。回問確認 title「Bigane」、artist-credit「Mahasti」（artist MBID e0668079-…，area Iran，begin 1946-11-16，disambiguation 空白，名下 19 個 release-group、其中 14 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1993；轄下 release 1 筆：1993 Official Digital Media×16，country 欄為空。刻意不釘：aed36dd3-9209-4199-bedb-319097b75bc8《Nameh》(1994)、9a168382-cc35-4712-90ed-0b245b97ace3《Havay-e Asheghi》(1998-03-30)、36c7b646-0462-455d-b5b2-31e34a3877be《40 Golden Hits of Mahasti》(2008-10-02，Compilation，§5.6 明文排除)、7b31c3ad-ac5f-4d48-a9b7-b9ec0527ef69《Sepideh Dam》(1991，Soundtrack)。'
}
];
