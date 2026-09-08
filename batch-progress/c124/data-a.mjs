// c-124 a 組：革命前（巴列維末期）的流行、funk、psych。
// ⚠ 全批共通：why／risk／mbNote 只寫可查證的事實（發行年、廠牌、盤面編號、曲目、編制、
//   藝人在哪一年離開伊朗這種有來源的事實），不寫政治立場、宗教評價或體制的價值判斷。
const POOL = '實掃 seed_cards.json 全 14,424 列';
const NOTE = '行文界線（本批硬規則，逐張提醒下游研究層與寫作層）：why／risk／mbNote 與日後的簡介一律只寫可查證的事實——發行年、廠牌、盤面編號、曲目、編制、藝人在哪一年離開伊朗；不得寫政治立場、宗教評價、對體制的價值判斷，也不得把「流亡」「被禁」寫成敘事化描述。';

export default [
{
 releaseType:'Compilation',
 exceptionReason:'Finders Keepers 2009 年編的十六軌選輯，是英語世界第一份把 1960–70 年代伊朗流行、funk、民謠與 psych 放在同一張盤上流通的文獻，Zia〈Helelyos〉、Googoosh〈Talagh〉、Marjan〈Kavir-e Del〉、Ramesh〈Sharm-e Boos-e〉、Soli〈Miravi〉、Dariush〈Cheshm-e Man〉、Sima Bina〈Naz Kardanet Vaveyla〉、Mohammad Nouri〈Biya Bar-e Safar Bandim〉都在其中；這批錄音的原盤多為伊朗國內 45 轉單曲，成輯形態只有這一種。',
 exceptionEvidenceUrls:['https://musicbrainz.org/release-group/8b0d08f0-9f10-4c70-b4e7-fb819619adf7','https://www.finderskeepersrecords.com/shop/pomegranates/','https://www.discogs.com/master/235056-Various-Pomegranates-Persian-Pop-Funk-Folk-And-Psych-Of-The-60s-And-70s'],
 selfTitled:false,
 queryAlias:'Pomegranates Persian Pop Funk Folk and Psych of the 60s and 70s；Finders Keepers FKR029LP；انار',
 reissuedBy:'Finders Keepers（2009 GB CD 16 軌、2010 US CD 16 軌，另有 2×LP）',
 g:'a',
 artist:'Various Artists',
 album:'Pomegranates',
 year:2009,
 genres:['rock','pop','folk'],
 label:'Finders Keepers Records（FKR029，GB 2009；US 版 2010）',
 why:`這條線在池中的入口。${POOL}，伊朗這一區只有 6 張、全在 8910–8915 列（Shajarian《Bidad》、Shajarian＋Alizadeh＋Kalhor＋Homayoun《Night Silence Desert》、Alizadeh & Gasparyan《Endless Vision》、Kalhor《Scattering Stars Like Dust》、Ghazal《The Rain》、Masters of Persian Music《Without You》），全部是 1979 年之後的古典與跨界，革命前的流行與 funk 是 0 張。Pomegranates 一張同時帶進 Zia、Googoosh、Marjan、Ramesh、Soli、Dariush、Sima Bina、Mohammad Nouri 八個掛名的錄音，是補這一區最省的第一張。`,
 risk:`撞卡：${POOL}，Various Artists 名下無同名盤；「Pomegranates」字串在池中 0 命中。 §5.6：MB primary-type Album、secondary-types Compilation，依既有 108 筆合輯提案的寫法填 releaseType Compilation ＋ exceptionReason ＋ 3 個 HTTPS 證據。 年份：MB first-release-date 2009，合輯首次出版年即 2009，無原盤年爭議。 封面：CAA release-group/8b0d08f0/front 實測回 200。 店面：Apple search 以「Pomegranates Persian Pop Funk Folk Psych」在 us／gb／de／fr／nl 五店各回 0 筆可對得上的條目（僅記錄這次 search 的觀察，尚未跑藝人目錄端與 collectionId 直查兩種查法）。 ${NOTE}`,
 mbNote:'釘 release-group 8b0d08f0-9f10-4c70-b4e7-fb819619adf7，identitySource pinned。回問 release-group?fmt=json&inc=artist-credits+releases+media 確認 title「Pomegranates」、artist-credit「Various Artists」、primary-type Album、secondary-types [Compilation]、first-release-date 2009；轄下 release 2 筆：2009 GB Official CD×16、2010 US Official CD×16。刻意不釘：1e8a32f2-daf4-4e23-8e6f-d46463d85070《Sedayeh Del》（Pharaway 同系列第四輯，§5.6「同一批錄音只挑最權威的一種」）、22cd342d-67e8-4fbc-9840-3658588e3a90《Persian Funk》（2011 US 11 軌，選曲與本輯重疊）。'
},
{
 releaseType:'Compilation',
 exceptionReason:'Pharaway Sounds 目錄第一號（PHS-001，2012），是西班牙 Guerssen 系統挖伊朗革命前錄音的開山之作，十九軌 CD／兩張 LP 收 1970 年代伊朗的 funk、psych 與流行編曲，之後的 Khana Khana、Sedayeh Del 都以本輯的副標「Funk, Psychedelia and Pop from the Iranian Pre-Revolution Generation」為系列名。',
 exceptionEvidenceUrls:['https://musicbrainz.org/release-group/3d286ee7-f401-49ed-a032-6261fd0ef7c1','https://www.forcedexposure.com/Catalog/va-zendooni-cd/PHS.001CD.html','https://soundsoftheuniverse.com/product/zendooni-funk-psychedelia-and-pop-from-the-iranian-pre-revolution-generation'],
 selfTitled:false,
 queryAlias:'Zendooni；Zendooni Funk Psychedelia and Pop from the Iranian Pre-Revolution Generation；Pharaway Sounds PHS-001；زندونی',
 reissuedBy:'Pharaway Sounds／Guerssen（2012-08-07 ES：2×12" 黑膠 9+9 軌與 CD 19 軌各一）',
 g:'a',
 artist:'Various Artists',
 album:'Zendooni: Funk, Psychedelia and Pop from the Iranian Pre-Revolution Generation',
 year:2012,
 genres:['rock','soul','pop'],
 label:'Pharaway Sounds（PHS-001，ES 2012-08-07；CD 19 軌／2×12" 9+9 軌）',
 why:`Pomegranates 之後最重要的第二份文獻，也是 Pharaway 這條伊朗復刻線的目錄第一號。${POOL}，池中沒有任何一張以「革命前伊朗流行／funk」為題的合輯。與 Pomegranates 選曲不同（本輯十九軌、以編曲厚的 funk 與 psych 為主），兩張並收才把這一段的兩個面向都補齊。`,
 risk:`撞卡：${POOL}，「Zendooni」字串 0 命中。⚠ 注意 Dariush 名下另有一張 1991 年的 RG 95eac07e《Zendouni》（Soundtrack），拼法只差一個字母，不是同一張，已寫進 mbNote 的刻意不釘。 §5.6：primary-type Album、secondary-types Compilation，填 releaseType Compilation ＋ exceptionReason ＋ 3 個 HTTPS 證據。 年份：MB first-release-date 2012-08-07，合輯首次出版年 2012。 封面：CAA release-group/3d286ee7/front 實測回 200。 店面：Apple search「Zendooni Iranian Pre-Revolution」在 us／gb／de／fr／nl 五店各回 0 筆可對得上的條目（只是 search 這一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group 3d286ee7-f401-49ed-a032-6261fd0ef7c1，identitySource pinned。回問確認 title「Zendooni: Funk, Psychedelia and Pop from the Iranian Pre-Revolution Generation」、artist-credit「Various Artists」、primary-type Album、secondary-types [Compilation]、first-release-date 2012-08-07；轄下 release 2 筆，皆 2012-08-07 ES Official：12" Vinyl×9+12" Vinyl×9 與 CD×19。刻意不釘：95eac07e-9d23-457f-8ef9-d6ff4e928816《Zendouni》（Dariush 1991，Soundtrack，拼法近似的別碟）、1e8a32f2《Sedayeh Del》（同系列第四輯）。'
},
{
 releaseType:'Compilation',
 exceptionReason:'Pharaway Sounds PHS-003（2012-10-08），Zendooni 的續編，十九軌 CD／兩張 LP，另挖一批 1970 年代伊朗 psych、funk 與流行的 45 轉單曲，曲目與 Zendooni 不重疊，是這條復刻線第二份可獨立成立的文獻。',
 exceptionEvidenceUrls:['https://musicbrainz.org/release-group/35c7406f-2345-4570-8802-7cbfaaa4b99d','https://soundsoftheuniverse.com/product/khana-khana-funk-psychedelia-and-pop-from-the-iranian-pre-revolution-generation','https://bentcrayonrecords.com/product/various-khana-khana-funk-psychedelia-and-pop-from-the-iranian-pre-revolution-generation-2lp-pharaway-sounds'],
 selfTitled:false,
 queryAlias:'Khana Khana；Khana Khana Funk Psychedelia And Pop From The Iranian Pre-Revolution Generation；Pharaway Sounds PHS-003',
 reissuedBy:'Pharaway Sounds／Guerssen（2012-10-08 CD 19 軌；2012 2×12" 黑膠 9+10 軌）',
 g:'a',
 artist:'Various Artists',
 album:'Khana Khana: Funk, Psychedelia and Pop from the Iranian Pre-Revolution Generation',
 year:2012,
 genres:['rock','soul','pop'],
 label:'Pharaway Sounds（PHS-003，2012-10-08；CD 19 軌／2×12" 9+10 軌）',
 why:`Pharaway 伊朗系列的第二輯，曲目與 Zendooni 不重疊。${POOL}，這一區 0 張。本批對這個系列的裁定是：同副標的四輯只收前兩輯（Zendooni PHS-001 與 Khana Khana PHS-003），第四輯 Sedayeh Del（PHS-010）以 §5.6「同一批錄音只挑最權威的一種」擋下，寫進未收清單。`,
 risk:`撞卡：${POOL}，「Khana Khana」字串 0 命中。 §5.6：primary-type Album、secondary-types Compilation。 年份：MB first-release-date 2012-10-08，合輯首次出版年 2012。 封面：CAA release-group/35c7406f/front 實測回 200。 店面：Apple search「Khana Khana Iranian Pre-Revolution」在 us／gb／de／fr／nl 五店各回 0 筆可對得上的條目（僅 search 一種查法的觀察）。 ⚠ 兩筆 release 的 country 欄在 MB 都是空的，出版地要看 label-info 而不是 country。 ${NOTE}`,
 mbNote:'釘 release-group 35c7406f-2345-4570-8802-7cbfaaa4b99d，identitySource pinned。回問確認 title「Khana Khana: Funk, Psychedelia and Pop from the Iranian Pre-Revolution Generation」、artist-credit「Various Artists」、primary-type Album、secondary-types [Compilation]、first-release-date 2012-10-08；轄下 release 2 筆：2012-10-08 Official CD×19、2012 Official 12" Vinyl×9+12" Vinyl×10，兩筆 country 皆為空。刻意不釘：1e8a32f2《Sedayeh Del》（同系列第四輯 PHS-010，2013 ES CD×16）。'
},
{
 releaseType:'Compilation',
 exceptionReason:'Pharaway Sounds 2009 年的二十七軌選輯，鎖定 1960 年代德黑蘭的 garage 與 beat 樂團（不是 1970 年代的 funk 世代），是這一段唯一成輯流通的文獻；原盤全為伊朗國內 45 轉單曲，多數樂團名下從未有過 LP。',
 exceptionEvidenceUrls:['https://musicbrainz.org/release-group/98c023a6-888d-4614-a7f8-57347e9bf247','https://rateyourmusic.com/label/pharaway_sounds/','https://honestjons.com/shop/label/Pharaway_Sounds'],
 selfTitled:false,
 queryAlias:'Raks Raks Raks；Raks Raks Raks 27 Golden Garage Psych Nuggets From The Iranian 60s Scene；رقص رقص رقص',
 reissuedBy:'Pharaway Sounds（2009 NL Official CD×27）',
 g:'a',
 artist:'Various Artists',
 album:'Raks Raks Raks: 27 Golden Garage Psych Nuggets From The Iranian 60s Scene',
 year:2009,
 genres:['rock','pop'],
 label:'Pharaway Sounds（2009，NL Official CD 27 軌）',
 why:`Pomegranates 與 Zendooni 收的是 1970 年代，這張補的是更早的 1960 年代 garage／beat 那一段，兩段在 MB 上幾乎沒有樂團級的 release-group 可釘，成輯只有本輯這一種形態。${POOL}，池中 1960 年代伊朗 0 張。`,
 risk:`撞卡：${POOL}，「Raks」字串 0 命中；注意土耳其與埃及有大量以 Raks 為名的碟（MB release-group 搜尋回 122 筆，第 2 名起全是土耳其與埃及的 Raks Sharki 系），釘 MBID 時只能看 artist-credit 是不是 Various Artists ＋ 副標是不是 Iranian 60s Scene。 §5.6：primary-type Album、secondary-types Compilation。 年份：MB first-release-date 2009。 封面：CAA release-group/98c023a6/front 實測回 200。 店面：Apple search「Raks Raks Raks Iranian」五店各 0 筆可對得上（僅 search 觀察）。 ${NOTE}`,
 mbNote:'釘 release-group 98c023a6-888d-4614-a7f8-57347e9bf247，identitySource pinned。回問確認 title「Raks Raks Raks: 27 Golden Garage Psych Nuggets From The Iranian 60s Scene」、artist-credit「Various Artists」、primary-type Album、secondary-types [Compilation]、first-release-date 2009；轄下 release 1 筆：2009 NL Official CD×27。刻意不釘：ad1c5e4d-d4b3-4aae-8994-7e4328ba2024《Raks Sharki, Vol. 4》(Jalilah 1997)、e2ee23e7-eb54-421f-9b55-a23e198194f3《Raks-ı Şahane 4》(Burçin Orhon 1993)、27ae4cbb-ca8c-319f-a6e2-c179b7993ed4《Raks Sharki》(Mokhtar Al Said)——三張同字根的埃及與土耳其舞曲盤，與伊朗無關。'
},
{
 releaseType:'Compilation',
 exceptionReason:'Now-Again 2011 年以 Kourosh Yaghmaei 本人保存的母帶修復的二十一軌選輯，涵蓋 1973–1979 年他在伊朗發行的單曲與專輯錄音，是這批錄音唯一經授權的完整成輯形態，附精裝書；發行形態有 2CD 精裝書、3LP 六面書冊版與 4×7 吋盒裝。',
 exceptionEvidenceUrls:['https://musicbrainz.org/release-group/9d14a076-e862-4271-bb1f-be7d1c85c004','https://www.nowagainrecords.com/kourosh-back-from-the-brink-2/','https://en.wikipedia.org/wiki/Back_from_the_Brink:_Pre-Revolution_Psychedelic_Rock_from_Iran:_1973%E2%80%931979'],
 selfTitled:false,
 queryAlias:'Kourosh Yaghmaei；Kurosh Yaghmaei；Koroush Yaghmai；Back From The Brink Pre-Revolution Psychedelic Rock From Iran 1973-1979；کورش یغمایی',
 reissuedBy:'Now-Again Records（2011-06-15 US Official，CD×16+CD×14）',
 g:'a',
 artist:'Kourosh Yaghmaei',
 album:'Back From the Brink',
 year:2011,
 genres:['rock','pop'],
 label:'Now-Again Records（2011-06-15 US Official，2CD 16+14 軌，另有 3LP 與 4×7" 盒裝）',
 why:`${POOL}，Kourosh Yaghmaei 三種轉寫（Kourosh／Kurosh／Koroush）全部 0 張。他 1973–1979 年的錄音以單曲為主，成輯只有本輯這一種授權形態，Now-Again 用他自己留下的母帶修復。與同批釘的 1973 年《Gol-e Yakh》原盤互為表裡：一張是原盤起點，一張是整段錄音的總整理。`,
 risk:`撞卡：${POOL}，Kourosh／Kurosh／Koroush 三種寫法各 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Kourosh Yaghmaei」回 21 筆，所釘 1c11fabc-c4e2-4228-b37e-92e0a4dff840 排第 1、disambiguation「Iranian singer-songwriter, composer and producer」、area Iran、begin 1946-12-03；同姓的 Kaveh／Kamil／Kambiz／Mehdi Yaghmaei 四人 score 35–37，只有 disambiguation 分得出來。搜「Kourosh」單名時目標掉到第 2、第 1 名是荷蘭的 Iranian／Dutch rapper（dcaafccd），score 排序不可用。 §5.6：primary-type Album、secondary-types Compilation。 年份：MB first-release-date 2011-06-15，取合輯首次出版年 2011；所收錄音為 1973–1979，寫在 label 與 mbNote。 封面：CAA release-group/9d14a076/front 實測回 200。 店面：Apple search 在 us／gb／de／fr／nl 五店都對到同一筆 collectionId 1705353375「Kourosh Yaghmaei — Back From The Brink (Pre-Revolution Psychedelic Rock From Iran: 1973-1979)」。 ${NOTE}`,
 mbNote:'釘 release-group 9d14a076-e862-4271-bb1f-be7d1c85c004，identitySource pinned。回問確認 title「Back From the Brink」、artist-credit「Kourosh Yaghmaei」（artist MBID 1c11fabc-c4e2-4228-b37e-92e0a4dff840，名下 32 個 release-group、其中 17 個 primary-type Album）、primary-type Album、secondary-types [Compilation]、first-release-date 2011-06-15；轄下 release 1 筆：2011-06-15 US Official CD×16+CD×14。波斯文原文掛名：کورش یغمایی。刻意不釘：1d42ec40-f75d-3dfc-9b90-f4a2ad52424d《Gol-e Yakh》（同批另收的 1973 原盤，不是本輯）、153f70dd-2621-47b9-98d2-19144ba57e53《50 Golden Songs of Giti, Afshin, Kourosh Yaghmaee & Fereydoon Farrokhzad》（2004 四人拼盤，屬 §5.6 明文排除的重複包裝）。'
}
];
