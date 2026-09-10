const POOL = '實掃 seed_cards.json 全 14,424 列';
const NOTE = '行文界線（本批硬規則，逐張提醒下游研究層與寫作層）：why／risk／mbNote 與日後的簡介一律只寫可查證的事實——發行年、廠牌、盤面編號、曲目、編制、藝人在哪一年離開伊朗；不得寫政治立場、宗教評價、對體制的價值判斷，也不得把「流亡」「被禁」寫成敘事化描述。';
export default [
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Habib；Habib Mohebian；Salame Hamsayeh；حبیب محبیان؛ سلام همسایه',
 reissuedBy:'MB 轄下 1 筆 release：1978，status 與載體欄皆空、10 軌',
 g:'a',
 artist:'Habib Mohebian',
 album:'Salame Hamsayeh',
 year:1978,
 genres:['pop','folk'],
 label:'1978（MB 該 release 未填 label-info、country 與 status，10 軌）',
 why:`Habib Mohebian 名下 16 個 release-group 中唯一一個 first-release-date 早於 1979 的條目，也是本批 a 組年份最晚的原盤（1978）。${POOL}，Habib／Habib Mohebian／حبیب 三種寫法各 0 張（「habib」字串的 3 筆命中是 Drake《HABIBTI》、Habib Koité、Sabri Brothers《Ya Habib》，全為假陽性）。`,
 risk:`⚠ 短掛名回問（裁定 179／250）：MB artist 搜尋「Habib」回 164 筆，第 1 名是突尼西亞婚禮歌手 Habib（score 100）、第 2 名是 electro experimental 的 Habib（99），目標 c7a21981-… 排到第 3、score 96，disambiguation「Iranian Singer」、area Iran、begin 1947-09-26，MB 主名是「Habib Mohebian」不是「Habib」——**score 排序在這個掛名上失效**，只有 disambiguation 分得出來；第 4、5 名還有 Habib Wahid（孟加拉）與 Habib Koité（馬利），後者池中已有 8654 列《Ma Ya》。 撞卡：${POOL}，「habib」3 筆命中逐筆檢視全為假陽性，伊朗的 Habib 0 張。 ⚠ 該 release 的 status 欄是空的（不是 Official 也不是 Bootleg），country 與 label-info 也空白，媒體 format 未填——研究層要另尋來源核對這一版的來歷。 年份：MB first-release-date 1978，無其他年份來源。 封面：CAA release-group/0a650cdc/front 實測回 404。 店面：Apple search「Habib Salame Hamsayeh」在 us／gb／de／fr／nl 五店各回 0 筆可對得上的條目（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group 0a650cdc-7d45-4c0f-a2d6-6d2befa1bfc4，identitySource pinned。回問確認 title「Salame Hamsayeh」、artist-credit「Habib Mohebian」（artist MBID c7a21981-…，disambiguation「Iranian Singer」，名下 16 個 release-group、其中 14 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1978；轄下 release 1 筆：1978，status／country／label-info 皆空、media format 未填、10 軌。波斯文原文：حبیب محبیان。刻意不釘：ad87b28f-8629-433a-aa38-2e367733fc61《Aftab Mahtab》(1984)、6e515d6d-4f24-4d27-9b11-41d19f5fe43b《Mardeh Tanhayeh Shab》(1985-07-11)、4dfe5517-9dec-4dc6-9474-259aa969813b《Kavir Bavar》(1999)——1979 年之後的碟，依本批分組規則不屬 a 組。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Soli；Persian Music Hits 8；سولی',
 reissuedBy:'MB 轄下 1 筆 release：1976-05-25 US Official CD×10',
 g:'a',
 artist:'Soli',
 album:'Persian Music Hits 8',
 year:1976,
 genres:['pop','rock'],
 label:'1976-05-25 US Official CD 10 軌（MB 該 release 未填 label-info）',
 why:`Soli 的〈Miravi〉是 Finders Keepers《Pomegranates》十六軌之一。他名下 MB 只有這一個 release-group，是這個掛名唯一可釘的條目。${POOL}，Soli／سولی 0 張（「soli」字串的 10 筆命中全是 Solid Air、Solid Gold、Solitude Standing 這類假陽性）。`,
 risk:`⚠ 短掛名回問（裁定 179／250）：MB artist 搜尋「Soli」回 **1,440 筆**同名實體，目標 13649d23-… 排第 1（disambiguation「Iranian Singer」、area Toronto、begin 1946），第 2 名是「african drum」的 Soli（score 99）、第 3 是 House music producer（99）、第 4 是里約的 DJ（98）——score 只差 1–2 分，**完全不可用**，只有 disambiguation 分得出來。 撞卡：${POOL}，「soli」10 筆命中逐筆檢視全為假陽性（John Martyn《Solid Air》、Gang of Four《Solid Gold》、YMO《Solid State Survivor》、Nurse With Wound《Soliloquy for Lilith》等），伊朗的 Soli 0 張。 ⚠ 載體與年份不一致：first-release-date 1976-05-25 但媒體記為 CD——1976 年不可能有 CD，這個日期比較可能是後來灌檔時填的原盤日期而載體填了再發版。研究層要另尋來源核對；**不得把它當成已驗證的原盤發行日**。 封面：CAA release-group/877dc00f/front 實測回 404。 店面：Apple search「Soli Persian Music Hits 8」在 us／gb／de 各 0 筆、fr／nl 各 1 筆但無一筆對得上（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group 877dc00f-f793-46e2-89ea-a8b2dc1cbe10，identitySource pinned。回問確認 title「Persian Music Hits 8」、artist-credit「Soli」（artist MBID 13649d23-…，disambiguation「Iranian Singer」，area Toronto，begin 1946，名下只有 1 個 release-group）、primary-type Album、secondary-types 空、first-release-date 1976-05-25；轄下 release 1 筆：1976-05-25 US Official CD×10（見 risk：1976 與 CD 載體互相矛盾）。波斯文原文：سولی。刻意不釘：無同藝人對照組（名下僅此一個 RG）。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Faramarz Aslani；Delmashghooliha；Del Mashghooliha；Age Ye Rooz；فرامرز اصلانی؛ دلمشغولی‌ها؛ اگه یه روز',
 reissuedBy:'1993 US Official CD×10（release title 改作「اگه یه روز」）；2008-07-11 Digital Media×10 為 Withdrawn，不得取',
 g:'a',
 artist:'Faramarz Aslani',
 album:'دلمشغولی‌ها',
 year:1977,
 genres:['folk','pop','rock'],
 label:'1977 IR Official 卡帶 10 軌（MB 該 release 未填 label-info）；1993 US CD 再發改名「اگه یه روز」',
 why:`本批 a 組少數幾張 MB 直接記為「1977 伊朗發行、Official、卡帶」的原盤之一——載體與國別都對得上巴列維末期的實際流通形態。${POOL}，Faramarz Aslani／اصلانی 兩種寫法各 0 張。`,
 risk:`撞卡：${POOL}，Faramarz Aslani／فرامرز اصلانی 0 命中。 掛名回問（裁定 179／250）：MB artist 搜尋「Faramarz Aslani」回 26 筆，目標 3ef9da0a-… 排第 1、score 100，但 **MB 主名是波斯文「فرامرز اصلانی」**、disambiguation「Iranian singer」、area United States、begin 1954-07-13；第 2 名是拼法極近的 Faramarz Assef（score 45），只有 disambiguation 分得出來。 ⚠ 盤名與掛名都是波斯文：掛名依本批裁定取羅馬轉寫 Faramarz Aslani，盤名照 MB 實體文字「دلمشغولی‌ها」（羅馬轉寫 Delmashghooliha）。跨文字系統的撞卡字串去重看不見（裁定 49），兩種寫法都要查。 ⚠ 再發改名（裁定 45）：1993 US CD 的 release title 是「اگه یه روز」（Age Ye Rooz），與 RG 標題不同；本批取 RG 標題。 ⚠ 第三筆 release（2008-07-11 Digital Media×10）status 是 **Withdrawn**，不得取。 年份：MB first-release-date 1977，release country IR、載體 Cassette，year 取 1977。 封面：CAA release-group/0a422a5b/front 實測回 200。 店面：Apple search「Faramarz Aslani Delmashghooliha」在 us／gb／de／fr／nl 五店各回 0 筆可對得上的條目（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group 0a422a5b-9d44-38a1-9beb-a7cce4a07221，identitySource pinned。回問確認 title「دلمشغولی‌ها」、artist-credit「فرامرز اصلانی」（artist MBID 3ef9da0a-…，disambiguation「Iranian singer」，名下 13 個 release-group、其中 5 個 primary-type Album）、primary-type Album、secondary-types 空、first-release-date 1977；轄下 release 3 筆：1977 IR Official Cassette×10、1993 US Official CD×10（title「اگه یه روز」）、2008-07-11 **Withdrawn** Digital Media×10。羅馬轉寫：Faramarz Aslani《Delmashghooliha》，收錄曲〈Age Ye Rooz〉。刻意不釘：8dcb678f-4ec9-3aee-a670-655233f95dce《بیاد حافظ》(1994)、6689abd5-c0a4-3771-be8c-e06c8cd245ff《Days Of Song & Sorrow》(1999-08-04)、3d233f5b-edd2-4cc0-97d7-543011acc9df《Khate Sevom》(2010-07-13)——1979 年之後的碟。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Elaheh；Elahe؛ Aref؛ Aref Arefkia؛ Emad Raam؛ الهه؛ عارف؛ عماد رام',
 reissuedBy:'MB 轄下 1 筆 release：1972-08-01 XW Official Digital Media×14',
 g:'a',
 artist:'Elaheh, Aref & Emad Raam',
 album:'Elaheh, Vol 5',
 year:1972,
 genres:['pop','world'],
 label:'1972-08-01 XW Official Digital Media 14 軌（MB 該 release 未填 label-info）',
 why:`一張同時帶進 Elaheh 與 Aref（Aref Arefkia）兩個骨幹掛名的革命前碟，編曲掛 Emad Raam。${POOL}，Elaheh／الهه 0 張、Aref／عارف 0 張。Aref 名下 15 個 release-group 只有這一個 first-release-date 早於 1979，是他革命前唯一可釘的條目。`,
 risk:`⚠ 短掛名回問（裁定 179／250）：MB artist 搜尋「Aref」回 184 筆，目標 a40ea636-… 排第 1（disambiguation「Iranian Singer [Aref Arefkia]」、area United States、begin 1941-08-15），第 2 名是澳洲攝影師 Aref（score 93）；查「Elaheh」只回 2 筆，目標 9b642ebf-… 排第 1（disambiguation「Iranian singer」、area Iran、begin 1934-04-22）。 撞卡：${POOL}，Elaheh／Aref 兩個掛名各 0 命中（「aref」字串命中的 Michel Polnareff《Polnareff's》為假陽性）。 ⚠ 年份可疑：Elaheh 名下 Vol 1–6 加《Best Of》七個 RG 的 first-release-date **全是 1972-08-01 同一天**，這是灌檔日的形狀而不是七張碟真的同日發行；本張 year 取 1972 但只能算「MB 唯一可得的年份」，原盤逐張年份不可考，不得對外宣稱已驗證。 ⚠ 載體：1972 年的碟卻記為 Digital Media，那是後來數位上架的 release，不是原盤。 封面：CAA release-group/91f3fc31/front 實測回 200。 店面：Apple search「Elaheh Aref Vol 5」在 us／gb／de／fr／nl 五店都對到 collectionId 6793102336「Elaheh, Aref & Emad Raam — Elaheh, Vol 5」，掛名與盤名同時對得上。 ${NOTE}`,
 mbNote:'釘 release-group 91f3fc31-40b5-440f-8e89-dcfd5d55b722，identitySource pinned。回問確認 title「Elaheh, Vol 5」、artist-credit「Elaheh, Aref & Emad Raam」（Elaheh MBID 9b642ebf-…、Aref MBID a40ea636-…）、primary-type Album、secondary-types 空、first-release-date 1972-08-01；轄下 release 1 筆：1972-08-01 XW Official Digital Media×14。波斯文原文：الهه／عارف。⚠ Elaheh 名下 c20448b4《Elaheh, Vol 1》、a8403e7c《Vol 2》、f2ad0434《Vol 3》、afbfe390《Vol 4》、873356a4《Vol 6》、3939892a《Best Of》六個 RG 的 first-release-date 同為 1972-08-01，明顯是灌檔日；本批只取 Vol 5（因其 artist-credit 帶 Aref），其餘**刻意不釘**。另刻意不釘：639a6438-c67c-46ee-9193-06ea544a8b8b《Persian Golden Music, Vol 3》(1976-08-20，Elaheh 單掛名，記入未收清單餘量)。'
},
{
 releaseType:'Album',
 selfTitled:false,
 queryAlias:'Golhaye Tazeh；Golha؛ Abu Ata؛ Mohammad-Reza Shajarian؛ Shadjarian؛ Jalil Shahnaz؛ Elaheh؛ گلهای تازه؛ ابوعطا',
 reissuedBy:'MB 轄下 1 筆 release：1975 XW Official Digital Media×10',
 g:'a',
 artist:'Elaheh, Mohammad-Reza Shajarian & Jalil Shahnaz',
 album:'Golhaye Tazeh No. 23: Abu Ata',
 year:1975,
 genres:['classical','world'],
 label:'1975 XW Official Digital Media 10 軌（原為伊朗國家廣播「گلهای تازه」節目第 23 輯，MB 未填 label-info）',
 why:`「Golha」（گلها）是伊朗國家廣播從 1956 年做到 1979 年的古典聲樂節目系列，本輯是「Golhaye Tazeh」（新歌之花）第 23 輯，唱段走 Abu Ata 調式，唱者 Elaheh 與 Mohammad-Reza Shajarian、tar 由 Jalil Shahnaz 擔任。${POOL}，Shajarian 三種轉寫（Shajarian／Shadjarian／شجریان）在池中只有 2 張（8910《Night Silence Desert》、8911《Bidad》），**都是 1985 年之後的碟**，他 1979 年之前的錄音 0 張。這張是本批唯一一筆把他放回革命前的條目。`,
 risk:`撞卡：${POOL}，Shajarian 三種轉寫命中 2 筆（8910、8911），皆非本張；Elaheh 與 Jalil Shahnaz 各 0 張。 掛名回問（裁定 179／250）：MB artist 搜尋「Mohammad Reza Shajarian」回 792 筆，目標 1e6c8164-… 排第 1、score 100，但 **MB 主名是波斯文「محمدرضا شجريان」**、disambiguation「Persian singer」；第 4 名是 Mohammad Reza Pahlavi（score 40，非音樂人），只有 disambiguation 分得出來。「Jalil Shahnaz」回 55 筆、目標 89040d46-… 排第 1（area Iran、begin 1921-05-22）。 ⚠ 掛名寫法：MB 的 artist-credit 是「Elaheh, Mohammad-Reza Shajarian & Jalil Shahnaz」（Shajarian 中間帶連字號），與池中既有的「Mohammad Reza Shajarian」（無連字號）不同寫法；跨寫法的撞卡字串去重看不見（裁定 49），研究層與上架前都要兩種寫法一起查。 ⚠ 載體：1975 年的碟記為 Digital Media，那是後來數位上架的 release。 年份：MB first-release-date 1975。 封面：CAA release-group/afd03621/front 實測回 200。 店面：Apple search「Golhaye Tazeh Abu Ata」在 us／gb／de／fr／nl 五店各回 0 筆可對得上的條目（僅 search 一種查法的觀察）。 ${NOTE}`,
 mbNote:'釘 release-group afd03621-6898-4603-bef6-c517db1cb8e6，identitySource pinned。回問確認 title「Golhaye Tazeh No. 23: Abu Ata」、artist-credit「Elaheh, Mohammad-Reza Shajarian & Jalil Shahnaz」（Shajarian MBID 1e6c8164-…，MB 主名為波斯文「محمدرضا شجريان」，名下 39 個 release-group、其中 26 個 primary-type Album；Jalil Shahnaz MBID 89040d46-…，名下 3 個 RG）、primary-type Album、secondary-types 空、first-release-date 1975；轄下 release 1 筆：1975 XW Official Digital Media×10。刻意不釘：b4e1e362-12a6-4a9b-bd78-bab84b1c81c0《Musique Persane》（同批另收，1971 法國 12" 黑膠）、7e25f3b5-215a-48ea-b275-d591cf1702ee《Daftare Tar》(2006，Jalil Shahnaz 名下的 2000 年代碟)。'
}
];
