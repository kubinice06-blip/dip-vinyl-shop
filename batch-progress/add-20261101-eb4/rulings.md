# add-20261101-eb4 裁定（鐵幕爵士＋MPS 策展線・蘇聯 Melodiya 爵士＋東德 Amiga 爵士）

> 店主 2026-11-01：「Yancy Körössy* - Identification 收錄 並且擴展相關專輯」→「擴張到 200 張」（交接 `batch-progress/eastbloc-jazz-20261101/PLAN.md`）。本工作階段負責 eb3、eb4。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-eb4a.json`（蘇聯，24 → 主線退回改名與汰 5 → 19）＋`curation-eb4b.json`（東德 24）→ `master-eb4aeb4b.json`（43：MB 25、§1 人工 18）→ 主線汰 3 → `pick.json`（40）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261101-eb4-cards.json`（40 張；研究 a–e 各 8）。
> **預留：研究 a 51401–51410、b 51411–51420、c 51421–51430、d 51431–51440、e 51441–51450、鉤子 51451–51460、寫作 51461–51470、主線 51471–51480。**
---

## 主線策展（不佔條號）
- **池中蘇聯卡用西里爾原文掛名**（Леонид Чижик、Каданс、Аллегро、Вагиф Мустафазаде、Владимир Чекасин、Архангельск、Сергей Курёхин、Арсенал…）。eb4a 初稿用英譯名，自報有 9 張其實已在池（拉丁轉寫去重抓不到）並已換補；主線退回把 artist／album 改成原盤原文（俄語盤西里爾、愛沙尼亞／立陶宛盤用原盤主標題語言），英譯名進 `queryAlias`。改名後同一藝人掛名與池中一致。
- **eb4a 主線汰 5**：Каданс《The Way to Olympus》（池中已有《Какая снежная весна》，本批留《Иванушка-дурачок》）、Мустафазаде《Tofig Guliyev 主題爵士曲》（池中已有 1979《Джазовые Композиции》＋本批《Севиль》）、Вайнштейн 1968《Where Is the Love》（1978 盤重錄同曲目）、Vyšniauskas《Jazz Compositions》（同人第二張）、Rosner 1964 estrada 樂團盤（偏流行）。
- **eb4b 主線汰 3**：Modern Jazz Big Band 65 同名盤（同團留 Manfred Krug 合作盤）、Uschi Brüning 1982 個人盤（她已有與 Günther Fischer-Quintett、與 Petrowsky 兩張）、Pascal von Wroblewsky《Swinging Pool》（1986 swing 人聲，分量弱）。
- **待研究層核對**：Günter Sommer《Hörmusik》MB 標 Album＋Live——若確為現場錄音，照「最重要作品本來就是現場」開 `releaseException`（Sommer 東德鼓獨奏代表作）；Rolf Kühn Quintett《Solarius》領銜是 Rolf，收為 Joachim Kühn 東德期錄音（1965 Amiga）；Bergisch-Brandenburgisches Quartett 年份 1982／1984。
- 對 seed 與 origin 全部 `claude/*` 分支 seed／eb 卡單去重 40/40 為 0。


## 研究 e 組
- **51441**　Krug《Manfred Krug und die Modern Jazz Big Band 65》是**現場錄音**（Discogs：1965-01-22 柏林 Theater der Freundschaft，單聲道）。建議開 `releaseException`（Krug 爵士盤本就是現場、Lenz 大樂團最早 Amiga 紀錄、Petrowsky／Sommer／Schulze 同台，有歷史定位，保留）。年份 Discogs master／MB 1966，de.wikipedia 寫 1965，卡單 1966 暫留，未驗到 Amiga 原始日期。
- **51442**　Brüning／Petrowsky《Kontraste》：MB 1987 是錄音年（1987-11-18～24 Amiga-Studio），原盤發行 1988（Discogs master、de.wikipedia 兩處）。建議卡單 year 改 1988。非現場，是錄音室盤。
- **51443**　Klaus Lenz《Für Fenz》（1970）與 Modern Soul Band 同名盤（1976）實為德語歌詞的流行／soul 取向（Für Fenz 12 首短曲含 Frank Schöbel 主唱，Discogs 風格 Lounge／Easy Listening；Modern Soul Band 9 首 2～4 分鐘德語歌，廣播製作），moodGuess 存疑，爵士純度低；兩張建議主線再評估是否收。
- **51444**　卡單 curatorWhy「Modern Soul Band＝Lenz 弟子們組成」不準：樂團 1968 年由 Gerhard Laartz 獨立創立，1972 年才與 Klaus-Lenz-Band 合併（de.wikipedia）。已推翻。
- **51445**　Klaus Lenz Modern Soul Big Band（1974）：Discogs 註記錄音於 1973-04-05 德勒斯登衛生博物館，但是否現場無第二來源，facts 只寫註記不寫「現場」；僅 5 首長曲，可能是音樂會式錄音（推測）。
- **51446**　Uschi Brüning & Fischer-Quintett：原盤 1973（Discogs、MB），錄音 1972-06／07；網路另有 1971／1972 說法，不採。是歌曲取向的爵士搖滾（歌詞、弦樂、合唱），非純爵士。
- **51447**　Günther Fischer 出生年由 Berliner Kurier「80 歲」報導反推（約 1944），文章未直接寫；facts 已照此措辭。


## 研究 d 組
- **51431**　Conrad Bauer《Flüchtiges Glück》三處推翻：(1) 廠牌是 Riskant 4017（西德科隆，Eigelstein Musikproduktion，混音 Soundexpress Studio Köln），不是 Amiga；(2) 全盤是長號獨奏，不是四重奏／重疊錄音；(3) 1984-12-17 在科隆地下蓄水池（Severin，殘響 45 秒）現場錄成、無疊錄（De Campo 重發頁註記），Riskant LP 發行年 1986。年份卡單 1986 沿用。country dd 是否保留（藝人東德、製作西德）請主線定。
- **51432**　Bergisch-Brandenburgisches Quartett：年份採 Amiga 8 56 031 的 1984（盤面刻字 A84）；MB 1982-12-12 疑為資料誤植，Discogs 錄音日 1982-03-01 東柏林青年才俊之家。2022 年 Black Truffle《Live ’82》是 Moers 音樂節另一份現場錄音，不是本盤。
- **51433**　Manfred Schulze《Viertens》：藝人名 Discogs 作 Bläserquintett（一字）；FMP 1230 是西柏林廠牌、1986-07-19 FMP 錄音室錄音，非現場；《Nummer 12》（1986 現場）是另一張。「巴赫式對位」無來源未採，只寫〈B-A-C-H〉曲名。
- **51434**　Manfred Ludwig-Sextett《Jazz》**是 7 吋 EP（4 首，Amiga 5 50 204，1963）**，Discogs master 與 release 唯一。有歷史定位（樂團第一張 Amiga 唱片），但不是專輯長度，交主線裁定留或汰。
- **51435**　Ensemble Studio 4：錄音室，1969-04/05 柏林三次錄成；陣容 Petrowsky 領隊、Graswurm、Katzenbeier、Weise、Koch、Winkler。無推翻。
- **51436**　Rolf Kühn《Solarius》：原盤 1965（MB 2012 是重發）；1964-11-29/30 柏林錄音室；Urbaniak、Bartkowski 兩位波蘭樂手參與。Joachim 1966 出走與未再壓的關聯只來自 Discogs 備註，單一來源，facts 已用「很可能」措辭。
- **51437**　Friedhelm Schönfeld 1978 自題名盤**不是鋼琴三重奏**：長笛／次中音單簧管／薩克斯風、低音提琴、大提琴、鼓，無鋼琴；Bill Evans 比擬無來源。moodGuess 的 why 失準，建議重估。
- **51438**　Schönfeld & Katzenbeier《Jazz》（1973）**不是二重奏**：兩位領銜者加 6 位樂手（多管、鋼琴 Schramm、雙貝斯、雙鼓含 Günter Sommer），Katzenbeier 是長號手；錄音 1972-10/11 Amiga-Studio。moodGuess 建議重估。

## 研究 c 組
- **51421**　Hörmusik（Günter Sommer）**確為現場盤**：Discogs 771039 notes「Recorded live during Jazz Now / Jazz aus der DDR, 11 Aug 1979, Akademie der Künste Berlin」；MB 亦標 Live。建議開 releaseException（東德鼓獨奏代表作）。**年份建議改 1980**（FMP 0790 首發 1980-10-30；Amiga 8 55 870 為 1981；卡單 1979 是錄音年／MB 日期）。待主線裁定。
- **51422**　Ulrich Gumpert Workshop Band（Amiga 8 55 753，1980）**疑似現場**：錄音 1979-03-01/02/04 西柏林 Akademie der Künste，東德廠與 FMP 合製；但無來源明寫 live。facts 只寫地點與日期，未稱棚錄或現場；上線前建議再查。編制 Discogs 列八人，非策展層『七重奏』。
- **51423**　Conrad Bauer（Amiga 8 55 783）：Discogs／MB 1981；de／en 維基 Bauer 頁列 1980；錄音 1980-08-25/26/27。不推翻卡單 1981。
- **51424**　Synopsis（Amiga 8 55 395，1974）：棚錄，rec. 1974-04-22/23 Amiga-Studio Berlin；與同年 FMP《Auf der Elbe schwimmt ein rosa Krokodil》是不同專輯。
- **51425**　『N Tango für Gitti：聲音層面查無樂評，status thin；錄音 1982-02-10 Rundfunk der DDR，1984 發行。moodGuess『諷刺』無來源。
- **51426**　Игорь Бриль《Оркестр приехал》：MB 釘正確；calend.ru 寫 1981，其餘 1980，採 1980。編制含 Elka 電鋼琴／合成器／電貝斯／拉丁打擊／低音號（電聲確定）。
- **51427**　Vyšniauskas Quartet：1983 年維爾紐斯棚錄，三段約 35 分鐘；樂團成形年 jazzhistory.lt 1980、其他 1982，facts 採 1980 成形／1982 陣容底定。
- **51428**　Kiladze Jazz Choral：1987 Melodiya 唯一盤，成軍 1985；錄音地未取得；2024 Tbilisi Records 重發（含額外曲）。Tuxedo Junction 對 B5 為推斷。
- **51429**　全組 8 張皆正規專輯長度，無合輯／EP；Hörmusik 為 Live（見 51421）。
- **51430**　WebSearch 本組實用 4 次（略超 3 次上限）。

## 主線（研究層推翻後）（51471–）
- 51471：研究 e 組：Manfred Krug & Modern Jazz Big Band 65 同名盤是 1965-01-22 柏林 Theater der Freundschaft 現場錄音，不是 Krug 或該團「本來就是現場」的代表作，**汰**；Modern Soul Band 1976 同名盤是 9 首 2–4 分鐘德語歌、《Für Fenz》是 12 首短曲且兩首 Frank Schöbel 主唱、Discogs 標 Lounge／Easy Listening，爵士代表性不足，**汰**。《Kontraste》年份改 1988（MB 1987 是錄音年；Discogs master＋de.wikipedia 原盤 1988）。
- 51472：補位 3 張（從主線策展汰換區收回，併入研究 e 組）：Pascal von Wroblewsky《Swinging Pool》、Modern Jazz Big Band 65 同名盤、Uschi Brüning 1982 同名盤。由研究 e 組代理補研究，append 進 `add-20261101-eb4-e.json`。
- 51473：研究 d 組：Manfred Ludwig-Sextett《Jazz》（Amiga 5 50 204）實為 4 曲 7 吋 EP，**汰**，不補（池子照實交）。Conrad Bauer《Flüchtiges Glück》廠牌改 Riskant（西德科隆，1986），1984-12-17 科隆地下蓄水池無聽眾的長號獨奏錄音，非音樂會現場，照收；藝人是東德樂手，country 維持 dd。Manfred Schulze 掛名照 Discogs 改「Manfred Schulze Bläserquintett」（卡單、研究 d 稿 key 同步）。
- 51474：eb4 定案 **39 張**（蘇聯 19、東德 20）。
- 51475：研究 c 組：Günter Sommer《Hörmusik》確為 1979-08-11 柏林藝術學院現場（MB 主類型 Album＋Live），照 Ganelin 先例收、`exceptionReason` 寫明；年份改 FMP 首發 1980（1979 是錄音年）。Ulrich Gumpert Workshop Band 錄於西柏林藝術學院、無來源明寫現場，照錄音室盤收，正文不稱現場也不稱棚錄。
