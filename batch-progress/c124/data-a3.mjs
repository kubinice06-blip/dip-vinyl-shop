const POOL = '實掃 seed_cards.json 全 14,424 列';
const NOTE = '行文界線（本批硬規則，逐張提醒下游研究層與寫作層）：why／risk／mbNote 與日後的簡介一律只寫可查證的事實——發行年、廠牌、盤面編號、曲目、編制、藝人在哪一年離開伊朗；不得寫政治立場、宗教評價、對體制的價值判斷，也不得把「流亡」「被禁」寫成敘事化描述。';
const GOO = 'Googoosh 的 artist MBID 0d9b88f3-054a-4f53-b447-2f3f503c8290（disambiguation「Iranian singer」、area Iran、begin 1951-02-02），名下 38 個 release-group、其中 29 個 primary-type Album。波斯文原文：گوگوش。';
export default [
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Googoosh；Gougoush；Gugush；Mordaab；Mordab；گوگوش；مرداب',
 reissuedBy:'MB 轄下 1 筆 release：1990 Official CD×14（country 欄為空）',
 g:'a',
 artist:'Googoosh',
 album:'Mordaab',
 year:1971,
 genres:['pop','rock'],
 label:'原盤 1971（伊朗國內發行，廠牌待研究層核）；MB 所釘 release 為 1990 年的 CD 再發，14 軌',
 why:`Googoosh 是這條線最大的掛名，${POOL}，Googoosh／Gougoush／گوگوش 三種寫法各 0 張。《Mordab》（沼澤）是她 1971 年的專輯，作曲 Hassan Shamaizadeh，見英文維基〈Googoosh discography〉的 1970 年代條列。本批替她釘三張革命前的碟（1971 Mordaab、1974 Dou Mahi、1975 Pol），另在 b 組釘一張 2004 年的《Akharin Khabar》。`,
 risk:`撞卡：${POOL}，三種寫法各 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Googoosh」只回 4 筆，目標排第 1、score 100、disambiguation「Iranian singer」；第 3 名是 7c99fab8「Mahmoud Ghorbani」、disambiguation 寫的是「Googoosh's husband」，是靠 disambiguation 才排除的。查「Gougoush」時第 1 名是法國的同名實體 6e7ed251，目標掉到第 2（score 70）——轉寫換一種，score 排序就翻掉。 ⚠ 年份分歧（裁定 220）：MB first-release-date 1990，那是 CD 再發年；原盤年 1971 取自英文維基〈Googoosh discography〉，year 取 1971，再發年寫進 label 與 mbNote。 ⚠ 本 RG 的 artist-credit 在 MB 是波斯文「گوگوش」，卡片掛名依本批裁定取羅馬轉寫 Googoosh（與池中既有波斯語系卡片一致）。 封面：CAA release-group/151ab6a5/front 實測回 200。 店面：Apple search「Googoosh Mordaab」在 us／gb／de 各回 0 筆、fr／nl 各回 5 筆但無一筆盤名對得上（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:`釘 release-group 151ab6a5-a010-483a-abbc-03eb4da5af35，identitySource pinned。回問確認 title「Mordaab」、artist-credit「گوگوش」、primary-type Album、secondary-types 空、first-release-date 1990；轄下 release 1 筆：1990 Official CD×14，country 欄為空。⚠ 裁定 227：secondary-types 為空不代表這是原盤——1971 年的原盤 MB 沒有建 release，這個 RG 只掛得住 1990 年的 CD。${GOO}刻意不釘：51445937-8d99-3215-aced-119885955b96《Kavir》與 7de65317-8c70-303c-b6bc-07cb2e64f445《Kavir》（同名雙胞胎，一筆無日期、一筆 1990-03-02）、e2773937-4d0a-34e2-8ec7-3e570a32b8c0《Googoosh 4, Dou Panjareh: "Persian Music"》（1970 原盤的再發條目，本批只取三張以免同一藝人壓過整組）。`
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Googoosh；Gougoush；Gugush；Pol；پل；گوگوش',
 reissuedBy:'1992 US Official CD×10（release title 為波斯文「پل」）；另有 2018 US Bootleg 12" 黑膠×10',
 g:'a',
 artist:'Googoosh',
 album:'Pol',
 year:1975,
 genres:['pop','rock'],
 label:'原盤 1975（伊朗國內發行，廠牌待研究層核）；MB 所釘 release 為 1992 US CD 10 軌',
 why:`《Pol》（橋）是 Googoosh 1975 年的專輯，見英文維基〈Googoosh discography〉。${POOL}，她三種寫法各 0 張。三張革命前 Googoosh 分別落在 1971、1974、1975，把巴列維末期她最密的那五年蓋住。`,
 risk:`撞卡：${POOL}，Googoosh 三種寫法各 0 命中。 ⚠ 年份分歧（裁定 220）：MB first-release-date 1992，那是 US CD 再發年；原盤年 1975 取自英文維基〈Googoosh discography〉。 ⚠ 版本：轄下第二筆 release 是 2018 US **Bootleg** 12" 黑膠×10，不是 Official，上架不得取這一版。 ⚠ release title 有兩種文字（1992 那筆是波斯文「پل」、2018 那筆是「Pol」），跨文字系統的撞卡字串去重看不見（裁定 49），兩種都要查。 掛名回問：同《Mordaab》那筆。 封面：CAA release-group/b9a1d398/front 實測回 200。 店面：Apple search「Googoosh Pol」在 us／gb／de／fr／nl 五店都對到 collectionId 289302769「Googoosh — Googoosh - Pol」。 ${NOTE}`,
 mbNote:`釘 release-group b9a1d398-8fa0-3116-87dc-4fef6f31853d，identitySource pinned。回問確認 title「Pol」、artist-credit「Googoosh」、primary-type Album、secondary-types 空、first-release-date 1992；轄下 release 2 筆：1992 US Official CD×10（release title「پل」）、2018 US **Bootleg** 12" Vinyl×10（release title「Pol」）。原盤年 1975 來自英文維基〈Googoosh discography〉。${GOO}刻意不釘：1028f52c-61df-4306-83d5-5a2bdab9e87c《Harf》(1992-12-13)、52b70782-12e3-3c77-bed3-9927512b8bc6《Jadeh》(1990-12-13)——同為 1990 年代灌檔的再發條目，原盤年無來源可考。`
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Googoosh；Gougoush；Do Mahi；Dou Mahi；Doe Mahi；دو ماهی；گوگوش',
 reissuedBy:'1990-12-13 XW Official CD×14（release title 作「Do Mahi」）',
 g:'a',
 artist:'Googoosh',
 album:'Persian Music: Googoosh 3, Dou Mahi',
 year:1974,
 genres:['pop','rock'],
 label:'原盤 1974（伊朗國內發行）；MB 所釘 release 為 1990-12-13 的 XW CD 14 軌，盤名改用再發系列名',
 why:`《Do Mahi》（兩條魚）是 Googoosh 1974 年的專輯，作詞 Shahyar Ghanbari、作曲 Varoujan，見英文維基〈Googoosh discography〉。${POOL}，Googoosh 0 張。本張與 1971《Mordaab》、1975《Pol》一起，構成她革命前三張的中段。`,
 risk:`撞卡：${POOL}，Googoosh 三種寫法各 0 命中。 ⚠ 盤名：MB 的 release-group 標題是再發系列名「Persian Music: Googoosh 3, Dou Mahi」，轄下 release 的 title 則是「Do Mahi」；依裁定 45（改過名的碟取再發名）與裁定 95（RG 標題與卡片盤名不必相等），卡片取 RG 標題，原盤名 Do Mahi 寫進 queryAlias。 ⚠ 年份分歧（裁定 220）：MB first-release-date 1990-12-13 是再發灌檔日，原盤年 1974 取自英文維基。 ⚠ 軌數 14 是再發版的軌數，1974 原盤軌數不可考（裁定 251：軌數隨載體變動，不是識別鍵）。 掛名回問：同《Mordaab》那筆。 封面：CAA release-group/83716429/front 實測回 200。 店面：Apple search「Googoosh Dou Mahi」在 us／gb／de／fr／nl 五店都對到 collectionId 89976006「Googoosh — Persian Music: Googoosh 3, Dou Mahi」。 ${NOTE}`,
 mbNote:`釘 release-group 83716429-2319-3451-be18-bbe2aeed64cd，identitySource pinned。回問確認 title「Persian Music: Googoosh 3, Dou Mahi」、artist-credit「Googoosh」、primary-type Album、secondary-types 空、first-release-date 1990-12-13；轄下 release 1 筆：1990-12-13 XW Official CD×14，release title「Do Mahi」。原盤年 1974 來自英文維基〈Googoosh discography〉。${GOO}刻意不釘：e2773937-4d0a-34e2-8ec7-3e570a32b8c0《Googoosh 4, Dou Panjareh: "Persian Music"》（1970 原盤的同系列再發，本批未收，記入未收清單的餘量）、460ca408-8aa7-473c-8cde-1ba02f25cd62《The Best of Googoosh 3 - Doe Mahi》(1997，Compilation，同一批錄音的重複包裝，§5.6 明文排除)。`
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Ebi；Ebrahim Hamedi；Tapesh；ابی؛ ابراهیم حامدی؛ تپش',
 reissuedBy:'MB 轄下 1 筆 release：1973 IR Official，media 欄未記載體、8 軌',
 g:'a',
 artist:'Ebi',
 album:'Tapesh',
 year:1973,
 genres:['pop','rock'],
 label:'1973 IR Official 8 軌（MB 該 release 未填 label-info 與載體）',
 why:`Ebi（本名 Ebrahim Hamedi）名下 30 個 release-group 裡唯一一個 first-release-date 落在 1979 年之前、且 MB 直接記為伊朗發行的條目。${POOL}，Ebi／Ebrahim Hamedi／ابی 三種寫法在池中 0 張（「ebi」字串的 9 筆命中全是 Amebix、Rebirth、Ebiet G. Ade 這類假陽性）。b 組另收他 1990 年的《Khalij》，兩張跨過 1979 這條界線。`,
 risk:`⚠ 短掛名回問（裁定 179／250）：MB artist 搜尋「Ebi」回 **1,462 筆**同名實體，目標 a499bc6f-4add-4aba-aa02-51a55574df76 排第 1（disambiguation「Iranian singer」、area United States、begin 1949-06-19），第 2 名是日本的 Susumu Yokota（score 94）、第 3 名是同人音樂的 EBI（91）、第 4 名是坦米爾民謠歌手（90）——score 差 6–10 分，完全不可用，只有 disambiguation 分得出來。改查本名「Ebrahim Hamedi」時目標仍排第 1、score 100。 撞卡：${POOL}，「ebi」字串 9 筆命中經逐筆檢視全為假陽性（Amebix《Arise!》、Mtume《Rebirth Cycle》、J Dilla《Rebirth of Detroit》、Ebiet G. Ade《Camellia I》等），真正的伊朗 Ebi 0 張。 年份：MB first-release-date 1973，release country IR，無其他年份來源，year 取 1973。 ⚠ 該 release 的 media format 欄是空的（記為「?×8」），載體待研究層核。 封面：CAA release-group/d48fe1a6/front 實測回 200。 店面：Apple search「Ebi Tapesh」在 us／gb／de／fr／nl 五店都對到 collectionId 288939986「Ebi — Tapesh」。 ${NOTE}`,
 mbNote:'釘 release-group d48fe1a6-b91b-4688-8049-403ce1592846，identitySource pinned。回問確認 title「Tapesh」、artist-credit「Ebi」（artist MBID a499bc6f-4add-4aba-aa02-51a55574df76，disambiguation「Iranian singer」，名下 30 個 release-group、其中 25 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1973；轄下 release 1 筆：1973 IR Official，media format 欄空白、8 軌。波斯文原文：ابی（本名 ابراهیم حامدی）。⚠ 同名別碟：Shahram Shabpareh 名下另有一張 a1d31756-9b2a-4a7b-b630-6ccc393eca02《Tapesh》(2008-10-02)，盤名相同、掛名不同，刻意不釘。另刻意不釘：dd4a4c55-7402-4e3e-8258-ae99f658548b《Khalij》(1990，同批 b 組另收)、5e9a5433-39fb-4270-8589-01e738a175fc《Hich Koja Iran Nemesheh》(1993-03-22，Compilation)。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Siavash Ghomayshi；Siavash Ghomeyshi；Farangis；سیاوش قمیشی؛ فرنگیس',
 reissuedBy:'MB 轄下 1 筆 release：1973 Official Cassette×10（country 欄為空）',
 g:'a',
 artist:'Siavash Ghomayshi',
 album:'Farangis',
 year:1973,
 genres:['pop','rock'],
 label:'1973 Official 卡帶 10 軌（MB 該 release 未填 label-info 與 country）',
 why:`Siavash Ghomayshi 名下 20 個 release-group 中唯一一個 first-release-date 早於 1979 的條目，也是本批少數幾張 MB 直接記為卡帶（Cassette）載體的革命前碟——巴列維末期伊朗國內的自主流通大量靠卡帶，這張的載體本身就是那個流通形態的證據。${POOL}，Siavash／Ghomayshi／قمیشی 三種寫法各 0 張。`,
 risk:`撞卡：${POOL}，三種寫法各 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Siavash Ghomayshi」回 25 筆，目標 554b4286-… 排第 1（disambiguation「Iranian Singer」、area United States、begin 1945-06-11）；第 2 名是溫哥華的 DJ Siavash（score 37）、第 4 名是同姓的 Alireza Ghomayshi（36），分差夠大但仍以 disambiguation 為準。 ⚠ 同藝人同名別碟：他名下另有 7db71d78-cbfc-4b23-aa9c-061078d33cbe《Khabe Baroon (Farangis)》(1993)，盤名帶同一個字，不是同一張，已寫進刻意不釘。 年份：MB first-release-date 1973，無其他年份來源。 封面：CAA release-group/0951b560/front 實測回 200。 店面：Apple search「Siavash Ghomayshi Farangis」在 us／gb／de／fr／nl 五店都對到 collectionId 289798759「Siavash Ghomayshi — Farangis」。 ${NOTE}`,
 mbNote:'釘 release-group 0951b560-7aeb-4688-b997-7e72feb3e5f0，identitySource pinned。回問確認 title「Farangis」、artist-credit「Siavash Ghomayshi」（artist MBID 554b4286-…，disambiguation「Iranian Singer」，名下 20 個 release-group、其中 18 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1973；轄下 release 1 筆：1973 Official Cassette×10，country 欄為空。波斯文原文：سیاوش قمیشی。刻意不釘：7db71d78-cbfc-4b23-aa9c-061078d33cbe《Khabe Baroon (Farangis)》(1993，盤名含同字的別碟)、55410a5a-d6bd-4155-b3ad-c7ff4b765350《Hekayat》(1992)、f1b7a7d9-c13b-48b0-91be-7040a43a407f《Taak》(1993)——1990 年代的碟，不屬 a 組年代。'
}
];
