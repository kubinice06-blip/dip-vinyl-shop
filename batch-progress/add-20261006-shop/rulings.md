# add-20261006-shop 裁定（店內販售區第三波：Notion 2026-10-06 新進 26 張中缺卡的 14 張）

> 來源：2026-10-06 Notion「唱片庫存售價表（販售中）」新增 26 列，12 列卡池已有（卡池鍵已回寫），14 列缺卡。交接見 `data/shop/HANDOFF-wave3.md`。
> 本檔由主線建立。各層只 append 自己的條號區間。

> **預留（2026-10-06）：策展 a 8701–8710、策展 b 8711–8720、研究 a 8721–8732、研究 b 8733–8744、鉤子 8745–8754、寫作 8755–8770。**
---

## 主線策展（不佔條號）
- 分組：a＝爵士（美國／日本）7 張；b＝日本流行／民謠／爵士歌唱 7 張。
- 矢野顕子那列 Notion 原本演出者／品名寫反（演出者寫「オーエス オーエス」），主線已在 Notion 更正。
- Barry Harris《Breakin' It Up》Notion 年份 1975 應是店內實物的再版年；卡片年份取原盤首發年。
- Miles Davis《Miles Davis and Horns》是 Prestige 把早期場次併成的 LP，判斷是否走 ALBUM_ONBOARDING §5.6 合輯例外。
- 明田川荘之 Notion 寫「This Here´ Is Aketa Vol. 2」，正式盤名待查（池中已有明田川四張）。
- 卡池已有同藝人：あがた森魚（乙女の儚夢、日本少年、乗物図鑑）、矢野顕子（Japanese Girl、ごはんができたよ）、宮沢昭（いわな、山女魚…）、鈴木勲（多張，皆掛鈴木勲＋編制）、カルメン・マキ&OZ（團名）、Mal Waldron（多張）、Red Mitchell（聯名兩張）、J.J. Johnson & Kai Winding。掛名照池中先例。

## 策展 a 組（8701–8710）
- **8701** 本組收 6 退 1：卡單 `desc-tools/batches/cards/add-20261006-shop-a-cards.json` 6 張（pinned 3、§1 人工 3）；宮沢昭《Bull Trout》撞池退件（見 8707）。未用 WebSearch，全走 MB／Discogs API 與英文維基 API。
- **8702** Red Mitchell《Rejoice!》走 §1 人工：MB 只有 2016 Fresh Sound 三合一 CD 的 RG 32eefcf7（Album＋Compilation，Rejoice! + Good Friday Blues + Jazz Guitar），不能釘 1961 原盤；以 Discogs master 552734／原版 4540470（Pacific Jazz PJ-22，1961）為證。掛 `Red Mitchell` 單名（封面如此；池中兩張是不同作品的聯名，非分裂）。本盤 Mitchell 拉大提琴、貝斯是 Jimmy Bond，寫作層不得寫成他拉貝斯。
- **8703** Kai Winding《Rainy Day》釘 RG 3b659363（1965，Verve V-8620／V6-8620，Creed Taylor 製作）。掛 `Kai Winding` 單名。12 首雨主題短曲＋和聲人聲 The Prevailing Winds，屬 Verve 輕爵士／流行取向，寫作層不寫成硬派長號演奏；同名 7 吋單曲（master 3153309）不收。
- **8704** Miles Davis《Miles Davis and Horns》走 §5.6 收錄：釘 RG 12dbaae5（MB Album＋Compilation，1956，Prestige PRLP 7025）。理由：1951-01-17（Rollins、Bennie Green）與 1953-02-19（Al Cohn、Zoot Sims）兩場原本散在 10 吋 PRLP 154、多人合輯 PRLP 113 與 78 轉 Prestige 734，7025 是它們第一次集中、也是此後 PRLP 7168（Early Miles 1951 & 1953）、OJC-053 沿用的標準形態；池中無這兩場，非重複包裝。releaseType 照上一批《Directions》《More Lasting Than Bronze》先例填 Compilation 並附 4 個證據網址。維基與 Discogs 對〈Blue Room〉／〈Morpheus〉單曲出處說法不一，寫作層不逐首對出處。
- **8705** Barry Harris《Breakin' It Up》年份 1958（MB、Discogs master 547647、維基一致；Argo LP-644）。Notion 的 1975 是日本 Cadet MJ-1012 限定再版年（Discogs 6984763，該 master 1975 年唯一版本），店內實物多半是它。掛名依 8641 先例與池中 Barry Harris 四張收攏為 `Barry Harris`，Barry Harris Trio 進 queryAlias。MB 另一筆 2007 RG 33396cce 是非官方歐洲 CD，排除。
- **8706** 明田川荘之那張的正式盤名就是 **《This Here´ Is Aketa Vol. 2》**（Discogs master 3401536／release 3955896，Offbeat Records ORLP-1004，1975；日文副題 ディズ ヒア' イズ アケタ），´ 是盤面原字元，卡面保留、queryAlias 收直引號與無符號寫法；若前端正規化出問題主線可改 '（可逆）。內容是 1975-07-10 東京 Bridgestone 美術館的鋼琴獨奏現場。MB 查無，走 §1 人工。與池中《Aketa's Erotical Piano Solo & Grotesque Piano Trio》（1975-03 アケタの店錄音，AD-1）同有一首〈Theme For Tomosan〉但為不同錄音，非撞卡。Vol. 1（ORLP-1003，三重奏）是另一張碟，店內沒有，不出卡。
- **8707** ⚠ **宮沢昭《Bull Trout》退件：撞池**。Bull Trout 就是池中已有的 `宮沢昭《いわな》`（1969）——Discogs master 644576 標題「Bull Trout = いわな」、原版 6408475 目錄號 SMJX-10068，與 c131 卡單 `desc4:宮沢昭|いわな`（RG 9bd1426e，VICTOR WORLD GROUP SMJX-10068）同一張碟（英文盤名是封面副題）。**主線處理**：Notion 這列卡池鍵回寫 `desc4:宮沢昭|いわな`；池卡 queryAlias 補 `Bull Trout`（目前只有 Iwana 等，沒有 Bull Trout）；這張改列「卡池已有」，門市版介紹沿用池卡研究。
- **8708** Mal Waldron／梅津和時《Another Step》掛名裁為 **`梅津和時 & Mal Waldron`**：依 c175《Reminicent Suite》先例「次序照盤面、外國人一方用池中既有羅馬字 Mal Waldron、日本人一方用漢字本名、用 & 連接」；Discogs 四個版本盤面皆梅津在前（Kazutoki Umezu / Mal Waldron），梅津也是製作人，Notion 的 Waldron 在前不採，收進 queryAlias。key `desc4:`。MB 有兩位藝人但無本盤，走 §1 人工（Discogs master 1653300／release 7262688，Union Jazz ULP-5004，1982-08-21，錄音 1982-04-21／22）。**b 組《竹の村》須用同一字串 `梅津和時`**。
- **8709** 人名漢字：Discogs 只登羅馬字的樂手（明田川 Vol. 1／Vol. 2 的 Koichi Yamazaki、Takashi Miyasaka、Makoto Shiraishi；《Another Step》的 Takeharu Hayakawa、Takashi Kikuchi）卡單一律寫羅馬字，研究／寫作層不得自行轉成漢字，除非另有來源。
- **8710** 封面：三張人工身分卡（Rejoice! 4540470、Aketa Vol. 2 3955896、Another Step 7262688）走 §4 discogs，目錄號／年份／廠牌三項皆可對，須登錄 discogs-cover-registry 並看圖；三張 pinned 卡 CAA 待本機，備援 Discogs（Rainy Day 2837082、Horns 2811539、Breakin' It Up 4166328）。試聽全部待本機。

## 策展 b 組（8711–8720）
- **8711** O.M.Y.《弱気なぼくら》身分已釘：MB RG `8c7fa870`（Album，2001-06-06，Scitron SCDC-00081），盤名原盤為『弱気なぼくら / ナーヴァス』（前五軌「弱気なぼくら」＋後七軌「Nervous」兩段，皆 2001 首度發表，非舊作合併，不走 §5.6）；店內實物多半是 2024 Cassetron CTN-40 首度黑膠化，年份取原盤 2001。掛名裁為 MB／Discogs 實體正名 **`Oriental Magnetic Yellow`**（Apple 2024 再版藝人欄同），盤面縮寫 O.M.Y. 進 queryAlias——理由：該團 1995–1997 作品皆掛全名，用縮寫會讓同團日後分裂成兩串（照 8641「credit 收攏到實體名」先例）。key 含假名走 `desc4:`。
- **8712** Carmen Maki《真夜中詩集》掛名裁為個人名 **`カルメン・マキ`**：MB 實體 eba9a947 正名カルメン・マキ（個人，非 OZ 團）；照 §0.5 日文名、照池中「個人名義與團名／編制串並存、不合併」先例（`今田勝` vs `今田勝トリオ`、`鈴木勲` vs `鈴木勲トリオ`），不併入 `カルメン・マキ&OZ`、不用羅馬字。釘 RG `35eadca6`（MB 以英譯『Poems in the Midnight (’Til the Candle Goes Out)』建題），盤名取原盤 Discogs 寫法『真夜中詩集 －ろうそくの消えるまで－』，MB 1991 形〈〜〉、Apple 形、英譯全進 queryAlias（可逆）。1969，CBS/Sony SOND 66010。
- **8713** あがた森魚《噫無情》釘 RG `9e91e6a6`，盤名照 MB／Discogs 原盤『噫無情（レ・ミゼラブル）』（全形括號），1974-03-25，Bellwood OFL-22。Discogs 原版 credits 僅設計一項，伴奏與製作人寫作層不得寫，除非研究層另有來源。
- **8714** 桃井かおり《おもしろ遊戯》走 §1 人工：MB 有藝人實體 a485d750 但 RG 表只有 2003 年後 5 筆，盤名／目錄號 28AH 1401／羅馬字＋年份皆 0（中途一次 503 已重試）；證據 Discogs release 7633932＋master 3435347＋Apple jp 1536986860（10 軌逐首相符、℗1982）。1982-02-25，Momoi Kaori 28AH 1401。credits 只有羅馬字（Ryudo Uzaki、Kyohei Tsutsumi、Yoko Aki、Tadanori Yokoo…），照 8709 不轉漢字。`coverSourceHint: discogs`。
- **8715** 矢野顕子《オーエス オーエス》釘 RG `564ca909`，1984-06-25，Japan Record 28JAL-10（LP＋附贈 7 吋 28JALS-10）。版本差：LP 本體 9 軌＋7 吋 2 軌，CD 38JC-101 為 10 軌、無〈Assemblée〉，寫作層寫曲數須指明版本。共同製作 Ryuichi Sakamoto，genres 取 pop＋electronic（池中矢野另兩張為 pop＋jazz，可逆）。
- **8716** 宮本典子 & 鈴木勲《Push》身分已釘：MB RG `44a1a0ca`（credit『宮本ノリコ & 鈴木勲』＝實體 宮本典子 5f96637e ＋ 鈴木勲 cf594e51，後者即池中鈴木勲），Discogs master 866074 掛『Noriko Miyamoto With Isao Suzuki』、藝人頁正名宮本典子；1978，Yupiteru YJ25-7002，宮本典子首張專輯，2022 BBE 再版。掛名照 c-179 第 4641／3874 條（兩位日本個人、皆無中黑 → `・`）裁為 **`宮本典子・鈴木勲`**，與池中 `富樫雅彦・鈴木勲`、`鈴木勲・山本剛` 同形；不用 MB 片假名 credit 名ノリコ。B2〈Cadillac Woman〉與池中 `鈴木勲`《Cadillac Woman》(1977) 同名曲、不同專輯，非撞卡。
- **8717** 年份全部取原盤首發：O.M.Y. 2001（非 2024 黑膠）、カルメン・マキ 1969、あがた 1974、桃井 1982、矢野 1984、Push 1978、梅津 1980；與 MB first-release-date 及 Discogs 原版皆一致，本組無「資料庫只有再發」的情形。
- **8718** 梅津和時《竹の村》釘 RG `e63df681`（MB 題『Bamboo Village』，credit『Kazutoki "Kappo" Umezu』→ 實體 梅津和時 a0becf99）；掛名照 a 組 8708 同字串 **`梅津和時`**。盤名取 MB RG 純拉丁題 **`Bamboo Village`**（Discogs 原版『Bamboo Village = 竹の村』英文在前），『竹の村』進 queryAlias；主線若要改日文題屬可逆。Next Wave 25PJ-1003，1980-03-21／22 Onkio Haus 錄音，三重奏（Umezu／David Friesen／Masahiko Togashi）；Togashi 是否即池中富樫雅彦交研究層確認後才寫漢字。
- **8719** 撞池掃描：seed 唯讀比對 7 張盤名與等價形（噫無情／Les Misérable、真夜中詩集／Poems in the Midnight、オーエス／Oh Hisse、Push、竹の村／Bamboo Village、弱気なぼくら／Nancy Boys、おもしろ遊戯）全無命中；同藝人池中盤皆不同碟。本組 **收 7、退 0**，無合輯、無 §5.6。
- **8720** 封面／試聽皆待本機：pinned 6 張 CAA 待測，備援 Discogs（O.M.Y. 2562059、カルメン・マキ 3955729、あがた 5416259、矢野 3248498、Push 1263679、梅津 8381375）；桃井走 §4 discogs 7633932。Apple jp 候選：カルメン・マキ 1537211393（12 軌，較原盤多 1 軌）、あがた 1642726952、桃井 1536986860、矢野 1405887205、Push 1622901354、O.M.Y. 6807276757／1774686480（2024 再版）；梅津 iTunes 查無，預期 unavailable。本組未用 WebSearch（MB／Discogs／iTunes／維基 API）。

## 主線驗收策展（不佔條號）
- 收 13、退 1：宮沢昭《Bull Trout》＝池中《いわな》（同目錄號 SMJX-10068，8708 前後 a 組裁定）。Notion 卡池鍵回寫 `宮沢昭|いわな`、從 PENDING_NEW 移除；池卡 queryAlias 補 `Bull Trout` 交本機（seed 單行壓縮檔，雲端不碰）。
- 梅津和時《竹の村》：盤名取日文《竹の村》（與店內品名、日本原盤一致），MB 英文題 Bamboo Village 進 queryAlias。可逆。
- O.M.Y. 掛 `Oriental Magnetic Yellow`、カルメン・マキ 個人名義與團名分開、`宮本典子・鈴木勲`、`梅津和時 & Mal Waldron`：照策展層，均有池中先例。
- 曲風照策展層（矢野 pop+electronic、Push jazz+soul），可逆。
- 桃井かおり／梅津兩張羅馬字人名（Togashi 等）漢字形由研究層確認，未確認前不寫漢字。

## 研究 a 組（8721–8732）
- **8721** 研究 a 組 6 張全數 full、facts 10–12 條、全 https。未推翻策展層的身分與掛名裁定；**補了策展層缺的資料**：Red Mitchell《Rejoice!》錄音 1960 年 10 月（Fresh Sound 頁）、Kai Winding 錄音場次（jazzdisco：1965-01-14 Webster Hall、02-27／03-22 A&R Studios；維基另載 1964-12-14）、Barry Harris 錄音 1958-07-31 芝加哥。
- **8722** ⚠ Barry Harris《Breakin' It Up》**年份疑義**：MB RG first-release-date 與 Discogs master／原版皆 1958，英文維基與 Stryker 筆記（Iverson 網站轉引）寫 released 1959；錄音 1958-07-31 確定。卡單 year 1958 保留，寫作層寫『1958 年錄音』；是否改 1959 請主線決定（可逆，改 year 欄即可）。
- **8723** Barry Harris 曲目作者：〈Bluesy〉〈S R O〉是否 Harris 自作，Discogs 無作者欄、維基摘要未列，facts 不寫作者（策展層寫自作，未獲第二來源）；寫作層勿寫『Harris 自作』。Parker 兩首（Ornithology、Passport）有維基支撐。
- **8724** Red Mitchell 樂器：Discogs 與 Fresh Sound 皆標 Mitchell 在本盤拉 cello；維基稱他 1966 年才把貝斯改成大提琴調弦，兩者不衝突。facts 只寫 cello；Discogs 掛名製作的 Jim Dickson 是否即日後 Byrds 經理那位未證實，facts 只寫掛名。
- **8725** Miles Davis《Miles Davis and Horns》§5.6 研究層查證支持收錄：PRLP 154（10 吋 Al Cohn 專輯，僅四首）、PRLP 113（多人合輯）、Prestige 734（78 轉）皆對得上，7025 為首度集中。曲數取 Discogs 8 首（維基頁面摘要寫 9 首未採）。〈Blue Room〉最初出處維基（Blue Period）與 Discogs（PRLP 113 不含此曲、734 為 78 轉）不一致，facts 只寫 Discogs 能對到者，寫作層不逐首對出處。
- **8726** Miles 時序：1953 場落在海洛因成癮加深期、1954-02 戒除、1954-04《Walkin'》，列為『與錄音同期的背景』可寫；1954 以後不寫。『1951 簽約因 Weinstock 迷上九重奏』單一來源（維基 Miles Davis 條），寫作層寫『1951 年起在 Prestige 錄音』即可。
- **8727** Kai Winding《Rainy Day》：Hot 100 第 8 名（1963《Mondo Cane》主題曲，唯一上榜）寫進生平 facts，屬他與 Creed Taylor 在 Verve 同期。〈The Umbrellas Of Cherbourg〉facts 使用台灣常見片名『秋水伊人』，未另查證譯名，寫作層可改寫英文原題。鼓手／吉他未分軌，不得對到某首。
- **8728** 明田川荘之 Vol. 2：確認為純鋼琴獨奏（Discogs 只列 Aketagawa 鋼琴）；1975 年一年三張（3 月 AD-1 アケタの店、6 月 Vol. 1 赤坂錄音室、7 月 Vol. 2 美術館）。『Bridgestone 美術館』錄音地為 Discogs 備註單一來源；美術館沿革取維基 Artizon，不寫美術館辦過音樂會。人名依 8709 只用羅馬字。
- **8729** 明田川：Offbeat 目錄脈絡只寫『Discogs 登錄的』，不寫『廠牌最早的幾張／第一張』（廠牌沿革未另查，依第一張反查規則退一層）。〈Theme For Tomosan〉與池中 AD-1 版為不同錄音，撞池檢查維持策展層 8706 結論。藝人 2024 年辭世屬單一來源且與作品無綁定，不寫。
- **8730** 梅津和時 & Mal Waldron《Another Step》：本盤細節全部單一來源（Discogs 原版），維基無條目、jazzmusicarchives／forcedexposure 403；合作緣由查無，寫作層不編。Hayakawa／Kikuchi 無生平可查，不寫背景。人的故事以兩位主角背景承擔（梅津：1949 仙台、國立音樂大學、生活向上委員會 1980 出道；Waldron：Billie Holiday 伴奏 1957–59、1963 成癮事件、長居歐洲、1970 起常赴日）。
- **8731** 梅津和時漢字：ja 維基頁面摘要稱『Kokuritsu College of Music』，寫作層寫『國立音樂大學』即可；b 組《竹の村》中 Togashi 是否即富樫雅彦本研究未涉（a 組沒有 Togashi），交 b 組研究層。
- **8732** Waldron『每年兩個月日本巡演』出自維基且無年代起點，寫作層寫『後來』，不寫成 1982 年當年事實；2002 年辭世屬發行後生平不寫。本組未用 Discogs 以外的 MB 新查（Barry Harris RG 2 筆再版確認）；WebSearch 使用 6 次。
- （主線）8722 Barry Harris《Breakin' It Up》年份維持 1958（MB、Discogs 兩庫一致；維基 1959 為單源發行年說法），正文寫「1958 年錄音」即可、不寫發行月。可逆。

## 研究 b 組（8733–8744）
- **8733** 本組 7 張全交件：`desc-tools/batches/research/add-20261006-shop-b.json`，facts 條數 12／12／12／12／12／12／11，status full 5、thin 2（O.M.Y.、桃井かおり：專輯本身的製作緣由、樂手、評價查無，人與樂團的故事完整）。WebSearch 8 次（另門市版 shop-r7 用 2 次），其餘走 Discogs／MB API、日文維基原文與 WebFetch。QA `node qa-batch.mjs research add-20261006-shop` 通過。
- **8734** 推翻策展層：あがた森魚《噫無情》製作人是松本隆。策展層寫『Discogs 無製作人、寫作層不得寫』——Discogs 確實未登錄，但日文維基あがた森魚條目的原創專輯一覽與 Bellwood 再版商品文（Billboard JAPAN）兩個獨立來源皆寫松本隆プロデュース，已寫入 facts。伴奏樂團仍查無，不寫。電影《僕は天使ぢゃないよ》只寫成他 1974 年的處境（自費製作、商業失敗負債），維基沒把它與專輯連起來，寫作層不得寫成因果。
- **8735** 推翻／補強策展層：O.M.Y. 四位成員是當時 Namco 的遊戲音樂作曲家，成軍起因是 1993 年重組 YMO 演唱會讓他們失望（日文維基）；成員漢字（細江慎治、佐野信義、相原隆行、佐々木宏人）日文維基有載，細江慎治另有獨立條目互證，其餘三人單源標 uncertain；化名（細野江晴臣等）寫作層仍避開。『仿《浮気なぼくら》』『Nancy Boys 仿 Naughty Boys』查無任何來源，不寫。『最後一張專輯』Tower 專文與維基兩源成立。
- **8736** 矢野顕子《オーエス オーエス》：〈Simon Smith…〉作者 Randy Newman、翻唱參照 Harpers Bizarre 版（日文維基專輯條目）；〈終わりの季節〉是細野晴臣作品、原曲在《HOSONO HOUSE》；〈素顔〉詞取自井坂洋子詩集。〈Greenfields〉維基標矢野自作，與常識不合，單源 uncertain，facts 與寫作層都不寫作者。專輯 Oricon 名次查無穩定來源，不寫（維基藝人條目只有〈春咲小紅〉第 5 名）。
- **8737** 桃井かおり《おもしろ遊戯》：專輯本身（製作緣由、錄音、樂手、評價）日文維基、Apple、Discogs 皆無，3 次 WebSearch 也無，標 thin。阿木燿子的〈口説いてくれて〉〈うんと年下の彼〉日文維基列為給桃井的作詞；宇崎竜童與阿木燿子夫婦由維基互證。推翻策展層『Momoi Kaori 廠牌名義第一張專輯』——查無證據，不寫；廠牌只寫『印為 Momoi Kaori、屬 CBS/Sony 體系』。丸山圭子、筒美京平、Tadanori Yokoo 的漢字未獨立證實，facts 不寫其漢字（作曲署名清單照 Discogs 的羅馬字與谷口雅洋）。
- **8738** 桃井かおり單曲 07SH 1115 的 B 面曲名 Discogs 與日文維基都印成〈○あぬきいじょう物語〉，羅馬字 Aijyo Monogatari 與專輯 B2〈あいじょう物語〉相符，視為同曲異寫；寫作層寫 B2 的曲名一律用專輯寫法。
- **8739** カルメン・マキ《真夜中詩集》：寺山修司的角色維持 Discogs 的 Lyrics By／構成；確認作詞的只有〈時には母のない子のように〉〈戦争は知らない〉〈かもめ〉三首（日文維基寺山條目作品表），寫作層不可寫成全盤寺山作詞。『寺山替她編了天涯孤獨少女的身世』單源（日文維基藝人條目，原文為『とされる』），寫作層用平實口氣。1970 年轉搖滾一句屬發行後直接相關的生涯轉折，只可一句帶過、不寫 OZ 之後。
- **8740** 宮本典子・鈴木勲《Push》：日文維基條目名為『Mimi (歌手)』，宮本典子是舊名。曲目作者 Discogs 逐曲有載（〈Stella By Starlight〉Victor Young、〈Everything I Have Is Yours〉Burton Lane／Harold Adamson、〈Monologue〉〈Cadillac Woman〉鈴木勲與 Shihoko Suzuki）。本盤〈Cadillac Woman〉與池中鈴木勲 1977《Cadillac Woman》同名，兩曲是否同一首作品未查證，寫作層不得寫成同一錄音。BBE 官網只確認 2LP，45 轉不寫。
- **8741** 梅津和時《竹の村》：Discogs 逐曲標作曲者——A1、A2、B2 梅津和時，B1〈How Are You〉富樫雅彦，策展層描述成立。Masahiko Togashi＝富樫雅彦（生卒年與日文維基完全一致）已確認，facts 寫漢字。Kiyoshi Koyama 是否即《Swing Journal》前總編輯児山紀芳，在這張專輯上無法證實，facts 與寫作層寫羅馬字。David Friesen 是否為這張專輯特地來日查無，只用同廠牌同年另一張合作盤（Next Wave 25PJ-1002）作旁證，不寫行程。這張串流與 CD 化皆無，試聽預期 unavailable。
- **8742** 梅津和時《竹の村》的盤名：facts 曲名用英文（Discogs 英日並列），盤名依主線驗收取日文《竹の村》，英文題 Bamboo Village 進 queryAlias；若前端要統一，屬可逆。
- **8743** 時序處理一覽：O.M.Y. 2024 年再發與重啟只寫成『再發版本』一句；矢野〈ラーメンたべたい〉1994 年入教科書、桃井 1981 年紐約與 1982 年報知獎、宮本典子 1980 年東京音樂祭與 1990 年赴美、梅津與富樫的後續生平——前三類與作品同期或直接相關者保留並標時序，其餘（桃井 2005 年後、富樫 2007 年逝世、矢野 1990 年移居）一律不寫。
- **8744** 門市版 `data/shop/research/shop-r7.json`（宮沢昭《いわな》）：現行簡介逐句查證——『四首魚名』『愛釣魚』『Victor SMJX-10068 1969』成立；『專輯名多半取自魚名』推翻（維基領銜作十張中只有《山女魚》《いわな》兩張魚名）；『五人全部兼打擊樂器、每首留一段純節奏段』『開場是調式長篇』『收尾回 bebop 快板』三句查無來源，標在 notes 供主線審稿刪除，若店主手上封套有寫則為店家聲音。錄音日期 Discogs 為 1969-06-30／07-14，日文維基富樫條目寫 4、6 月，對不上，寫作層只寫『1969 年夏天』。
