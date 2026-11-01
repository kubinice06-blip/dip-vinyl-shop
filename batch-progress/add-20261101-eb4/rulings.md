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

## 研究 a 組（蘇聯 8 張；條號 51401–51410）
- **51401** Чижик《Reminiscences》：Discogs 1981 Melodiya C 60—16155-8 是**雙黑膠現場錄音**（1980 年莫斯科「Warsaw」音樂廳與列寧格勒 Capella），非錄音室專輯；建議開 `releaseException`（先例 Ganelin）。年份俄文維基寫 1979、英文維基與 Discogs 寫 1981，採 1981。是否純獨奏僅有「只署名鋼琴」。
- **51402** Вайнштейн《Ленинградский джаз-оркестр》：**重發／彙編性質**。Discogs 內頁寫錄音 1959 年，但曲目含 1963 年電影歌曲，自相矛盾；俄文維基稱 C60 11007-08 是 1967 年第二張盤（D 19159-60）的 1978 年重發，Голощёкин 條目稱 1962 年錄音收進 1979 年 LP。有歷史定位（蘇聯 swing 大樂團代表），建議保留，寫作層不可寫成 1978 新錄，錄音年不下定論。
- **51403** Бриль《Утро Земли》：年份 Discogs 1978、俄文維基 1979（兩處），暫採 1978，請主線決定；實際陣容、錄音日期查無，thin；moodGuess 存疑（無法確認整張有鼓與電聲、是否民謠旋律）。
- **51404** Кузнецов／Громин《Джанго》：推翻策展層「向 Django Reinhardt 致敬的吉普賽爵士」——盤名取自 John Lewis 曲〈Django〉，曲目含 Waller、Corea、Jobim，是雙吉他標準曲盤；1978-05-24~26 錄音室。moodGuess「原音吉他搖擺」存疑（Corea、Jobim 曲目，acoustic 未證實）。
- **51405** Tiit Paulus：推翻策展層「大提琴／貝斯手」——Discogs 與 MB 皆為**吉他手**（1945-06-14 生於塔林），Toivo Unt 才是貝斯。錄音室，1980 錄、1981 發。
- **51406** Каданс《Иванушка-дурачок》：推翻策展層「整張改編 Coltrane」——只有 A1〈Naima〉是 Coltrane，其餘五首為 Lukyanov 原創。1982 發行、1981 錄音。電聲／鼓組細節未證實。
- **51407** Džässkvartett «Tallinn»：Saarsalu 領軍的塔林爵士四重奏，與 Paulus 盤同班底；「唯一專輯」未證實故不寫。與 Paulus 早期另一個塔林四重奏（Aniko／Unt／Rull）不同組，勿混。
- **51408** Саарсалу／Винцкевич《Джаз вдвоем》：雙人（薩克斯風＋鋼琴），錄音地點日期查無，thin；一則俄文來源稱 1986 年首批登 North Sea Jazz，與 Kadans 1984 年已赴 North Sea 的記載衝突，未採用。
- **51409** 技術：維基 API 對代理端 429，改用 WebFetch 讀維基；WebSearch 用 3 次（Chizhik、Saarsalu、Paulus）。俄文專名在 facts 一律以〈〉包起，來源網址已百分號編碼，避免 QA 非拉丁亂碼警示。
- **51410** 英文曲名（如 Honeysuckle Rose、Moonbeams）Discogs 未登錄，屬推定，facts 與 notes 已標，寫作層請用原文曲名。
- 51476：研究 a 組：Леонид Чижик《Reminiscences》是 1980 年莫斯科與列寧格勒音樂會的雙 LP，Чижик 的獨奏即興代表作本來就是音樂會錄音，照 Ganelin 先例收、`exceptionReason` 寫明，年份取 Discogs／英文維基 1981。Джаз-оркестр Иосифа Вайнштейна《Ленинградский джаз-оркестр》研究證實是早年錄音的 1978 重發（錄音年互相矛盾），不是正規新錄錄音室專輯，**汰**（卡單、研究 a 稿同步刪）。Бриль《Утро Земли》年份維持 Discogs 1978。eb4 定案 **38 張**（蘇聯 18、東德 20）。
- **51448**　主線汰 Krug／Modern Soul Band／Für Fenz 後，e 組補 3 張：Wroblewsky《Swinging Pool》（年份 de.wikipedia＋MB 1986、Discogs 1987，卡單 1986 留）、Modern Jazz Big Band 65 同名盤、Brüning 1982 個人盤。研究稿已刪舊 3 張，key 順序照卡單。
- **51449**　Modern Jazz Big Band 65 同名盤**是現場錄音**（Discogs 備註 recorded live 1965-01-22 Berlin，單聲道，Amiga 8 50 054），與 Krug 合作盤是同一場演出的兩半。建議開 `releaseException`；年份 Discogs／MB 1966、de.wikipedia 1965，卡單 1966 留。
- **51450**　Brüning 1982 個人盤：錄音室盤（Discogs 無錄音日期），13 首標準曲／流行歌配 Studio-Orchester 與弦樂，Petrowsky 客串長笛、上低音薩克斯風並寫說明；爵士濃度中等。
- 51477：研究 e 組補研究：Modern Jazz Big Band 65 同名盤與已汰的 Krug 盤是 1965-01-22 同一場現場的兩半。此團唱片紀錄只有這場，照「代表作本來就是現場」收、寫 `exceptionReason`（Krug 盤汰的理由是 Krug 是歌手／演員，那張不是他的代表作）。研究 d 稿刪 Manfred Ludwig-Sextett 殘留，key 與卡單一致。

## 研究 b 組
- **51411**　Allegro《Sphinx》：蘇聯 Melodiya C60 24695 003（1986，錄於 1986，印量 9920）為原版；Discogs 原盤為五段（Sphinx／三段 Triptych／Portraits of Friends），英文維基九段是後來西方版分段，facts 採原盤。moodGuess 存疑：來源顯示編制含一位合成器手，風格被歸 post-bop／現代主流，無證據是明確電聲 fusion。curatorWhy「Mobile Fidelity 日版」查無日版證據，不採用。
- **51412**　ВИА Севиль《Севиль》：阿塞拜疆（巴庫）作品、阿塞拜疆語演唱；策展層 scene 寫「愛沙尼亞民謠」是誤植，與愛沙尼亞無關。Discogs 稱 Sevil 1977 解散而盤 1978 出版，推測是編輯既有錄音，錄音年查無來源故不寫。Mustafazadeh 是否親自彈奏僅 Discogs 單一來源（uncertain）。聲音事實不足，標 thin。
- **51413**　Saarsalu《2 x Labajalg》：首發年 1980 成立（印刷標示 1980，印量 3000），MB 的 1981 是後續壓次。團名 kvartett 但盤上樂手含小提琴與人聲共七人，facts 寫實際編制。非現場、非合輯。
- **51414**　Tarasov《Atto》：1986 LP（錄於 1984）是 Atto 系列第一張。Discogs 側邊標 A「Atto I」B「Atto II」，與 mic.lt（Atto II 副題 Monotypes 為 1987 另一張）衝突，疑 Discogs 將兩面當兩個編號，兩種記載並列；卡片仍為《Atto》1986。curatorRisk「Atto II 在池外」成立。全盤僅 Tarasov 一人、無電子。
- **51415**　Архангельск《Призраки старого города》：1990 發行、1987 錄、版權頁 1989 成立。盤背只寫「愛沙尼亞電台錄音」，是棚錄或現場音樂會錄音查無，不寫；已在報告列出。aonb.ru 書目頁（503）只取得搜尋摘要，視為旁證。標 thin。
- **51416**　Day Dream：MB／Discogs 一致，1986，錄於 1984–85，英語演唱。姓名 Datevik Hovanesian／Tatevik Oganesyan／Hovhannisyan 為同一人。伴奏為 Igor Bril 爵士樂團，部分愛沙尼亞樂手與錄音師，但錄音地無直接來源。
- **51417**　Chekasin《Prisiminimai》：1986 LP（錄於 1985，40 分 27 秒五段組曲），非現場。推測即立陶宛爵士史所述 Chekasin 四重奏《Nostalgia》電子版（人員完全相同、1986、Vilnius Recording Studio），但兩名稱是否同一作品無直接來源，標 uncertain。moodGuess 存疑：「突兀不協和」無來源佐證，「自由爵士與拼貼」亦查無，不採用。
- **51418**　Концерт для голоса и оркестра：策展層「2 曲長篇」不對，實為一部作品跨 A／B 面（B 面為「終章」）。作曲年 1985（立陶宛爵士史）／1986（Petrossian 作品表）並列，卡片年份以發行 1986 為準。棚錄（Vilnius Recording Studio），非現場。歌手與池中 Day Dream 為同一人。
- **51419**　b 組全部 8 張皆為 Melodiya 原版首發，未發現合輯、EP 長度或現場錄音；唯 Arkhangelsk 一張錄音性質（棚／播出／現場）未證實。
- **51420**　WebSearch 本組用 8 次（每張 1 次內，另有 0 次再查）；Wikipedia API 被代理 429，改用 WebFetch 與 Discogs API。
- 51478：研究 b 組推翻照辦：ВИА Севиль 是亞塞拜然（巴庫）團、亞塞拜然語演唱，不是愛沙尼亞；《Концерт для голоса и оркестра》是一部跨 A／B 面的協奏曲，正文不寫「兩首」；掛名維持 MB／Discogs 原文三方署名。研究稿西里爾專名進 `desc-tools/nonlatin-proper-names.json` 白名單，兩處被曲名切斷的長專名改用〈〉包起；`qa-batch research` 兩批全部通過。

## 鉤子層（d、e）（51456–51460）
- **51456**　骨架預配（開工即寫，供 a–c 對齊；定稿見 51457）：d1 Bauer《Flüchtiges Glück》＝特殊錄音空間（科隆地下蓄水池、45 秒殘響、Riskant 西德廠）；d2 BBQ＝東西德成員以住地拼團名；d3 Schulze《Viertens》＝以音名寫主題的純吹管作曲（FMP 只當發行資料、不當骨架）；d4 Studio 4＝獲准出國登上蒙特勒（「出國受限」骨架歸本張）；d5《Solarius》＝東西德兄弟同台＋弟弟出走後唱片絕版（「出走」骨架歸本張，Lenz《Aufbruch》不寫 1977 遷西德）；d6 Schönfeld 1978＝一人輪吹三件木管＋大提琴入編制；d7 Schönfeld & Katzenbeier＝廣播舞蹈管弦樂團舊同事合掛名；e1 Lenz Modern Soul Big Band＝兩團合併；e2《Aufbruch》＝同名盤之後的下一張＋鍵盤電聲擴張；e3《Kombination》＝電影配樂作曲家的器樂 fusion；e4 Brüning & Fischer＝歌手與首巡樂團的德語歌曲盤；e5《Kontraste》＝夫妻二重奏＋廣播劇音效素材；e6 Wroblewsky＝首張即拿 Goldene Amiga（「首張」骨架歸本張）；e7 MJBB65＝一場演出分給兩張唱片＋「日後成為東德自由爵士代表」的大樂團早年班底（「大樂團」骨架歸本張；「柏林現場」骨架讓給 c 組 Hörmusik，本張只寫「一場演出」）；e8 Brüning 1982＝跨曲風翻唱配錄音室樂團。**d–e 全不取**：國營廠、審查、柏林現場、電台錄製、FMP 發行、Synopsis／Zentralquartett、Bauer 的多聲部泛音與循環呼吸（歸 c 組 Bauer Amiga 盤）。
- **51457**　交件 `desc-tools/batches/hooks/add-20261101-eb4-hooks-d.json`（7）、`-hooks-e.json`（8），key 逐字照研究稿、順序不變。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`（全張 full，上限 230）。逐筆（預算／hook 加權／hook 原始）：d1 Flüchtiges Glück 209／25／27；d2 BBQ 209／25／25；d3 Viertens 193／20／20；d4 Studio 4 228／26.5／29；d5 Solarius 227／27／27；d6 Schönfeld 1978 202／24／24；d7 Schönfeld & Katzenbeier 221／25／27；e1 Lenz Modern Soul Big Band 230／21.5／23；e2 Aufbruch 219／22.5／29；e3 Kombination 224／20／21；e4 Brüning & Fischer 225／27／27；e5 Kontraste 220／24／24；e6 Swinging Pool 228／24／28；e7 MJBB65 222／19／19；e8 Brüning 1982 230／25.5／30。初稿 15 張全超（235–333），整格捨去：Bauer 曲長、BBQ 羅斯托克首演與後段手風琴／鳥叫、Schulze 的 Reichelt 評語、Studio 4 的 Geißler 合寫名與 Petrowsky 生年地、Solarius 曲目作者分配、Schönfeld 1978 的伴奏者姓名與音樂觀、Schönfeld & Katzenbeier 的發行年與 Schramm 名、Lenz 合併盤的 Laartz 創團、Fischer 的〈Kombination〉曲長、Brüning & Fischer 的 Beck 弦樂名、Kontraste 的錄音日與 Brüning 自作曲、Wroblewsky 的音樂學校、MJBB65 的曲目作者、Brüning 1982 的 Stevie Wonder 曲與編曲三人。壓完回核 hook 依賴格：d2 補「勃蘭登堡一帶」、d4 補「廣播界」、d5 把兄弟樂器移進 g1、e2 把「16 人全器樂」移進 g1、e3 hook 改成不靠曲長、e4／e6 把首巡與東柏林出身放進第二句指派。
- **51458**　骨架定稿（照 51456，改動兩處）：e7 MJBB65 改寫「一場演出」不寫城市（避開 c 組 Hörmusik 的柏林現場）；d3 不寫「西柏林」（避開 c 組 Gumpert Workshop Band 的西柏林錄音地）。另：Lenz《Aufbruch》「東德最後一張、1977 遷西德」整格不指派（「出走」骨架歸《Solarius》）；「日後成為東德自由爵士代表」只在 MJBB65（Lenz 合併盤與 Schönfeld & Katzenbeier 的 Bauer、Sommer 不帶後來地位）；Bauer 的多聲部泛音、循環呼吸、生年、Synopsis 一律留給 c 組 Bauer Amiga 盤，本張只帶「吉他改長號」與蓄水池；Brüning「1982 結婚」只在 Kontraste。事實降級：Schulze〈Choral Für Dr. Martin Luther King〉研究稿寫「合唱曲」，五支吹管無人聲，改寫「題給金恩博士的曲子」；Lenz 合併盤「17 人」改為「17 人裡十位管樂手」（研究稿 3＋3＋4）；Studio 4 的錄音日只寫「4 至 5 月分三次」；Lenz 合併盤錄音地照研究稿只寫地點、不稱現場。
- **51459**　同人跨卡引入法配表：Petrowsky——BBQ 住地法（住東柏林）／Studio 4 出國身分法（少數獲准赴西方）／Kontraste 親屬法（1982 結婚）／MJBB65 日後地位法／Brüning 1982 外人之口（寫唱片說明＋客串）。Brüning——Lenz 合併盤只具名演唱／與 Fischer 盤職業起點法（成為職業歌手後的首巡）／Kontraste 親屬法／1982 盤身分法（東德爵士歌手）。Lenz——合併盤樂器法（小號手帶團）／Aufbruch 作曲編曲欄法（團長與 Müller 分擔）／MJBB65 生年出生地法（1940 柏林）。Schönfeld——1978 盤生年出生地法（1938 Zehrensdorf）／與 Katzenbeier 盤樂器＋職場法（吹簧管、廣播舞蹈管弦樂團）。Fischer——Kombination 作品欄法（《Eolomea》配樂）／與 Brüning 盤作曲欄法（Steineckert 填詞、Fischer 作曲）。Katzenbeier——Studio 4 不具名／與 Schönfeld 盤自學法／MJBB65 不具名。Schulze——Viertens 創團年法／MJBB65 日後地位法。Sommer——與 Schönfeld 盤只列鼓手／MJBB65 日後地位法。第二句句型逐張：d1「原本…的 X」、d2「它是」、d3「X 在東德吹…」、d4「X 帶隊，他是」、d5「X 是生於…」、d6「X 生年生於」、d7「X 自學」、e1「由」、e2「作曲與編曲多由」、e3「身分名詞＋X」、e4「X 成為…後的」、e5「這對」、e6「她叫」、e7「X 吹小號領隊，他」、e8「主唱 X 是」；並與 a–c 已交件的第二句逐條比過前四字（d1 原「吹奏的是」撞 a 組「吹奏的」、d4 原「領隊的」撞 a 組「領銜的」、e2 原「帶這支大樂團的」撞 b 組「帶團的」、d2 原句與 c 組 Synopsis 共用「自由爵士四」、e7 原「生於…的」撞 c 組「生在…的」、d1 與 c 組 Bauer 同以「Conrad Bauer」起句，全部改掉）。
- **51460**　「日」後一字（全批 15 處逐一互異）：d1 替、d2 這、d3 進、d4 登、d5 兩、d6 分、e1 那、e3 到／之、e7 一；d7、e2、e4、e5、e6、e8 只寫到月或年。hook 開頭前四字 38 張互異；hook 間 CJK 4-gram 只剩樂器名「薩克斯風」（a×2、b、c、d6、e5，專名不算），d5 原「再加兩位」撞 c 組 Bril 已改；另避開 eb3 已交件 hook 的「團名縮寫」形（d2 改以地名起句）與「A 面一首 20 分鐘」形（Schönfeld 1978 不以長曲起 hook）。hook 與自己 note 無 8 字以上逐字重複（e2 原「電鋼琴、合成器、」已改）。`node qa-batch.mjs hooks add-20261101-eb4`：d、e 兩組 0 標記（全批唯一標記是 b 組的西里爾字元掃描）；`node chk-hook-crossgroup.mjs add-20261101-eb4`：5 組 38 張全部通過，note 無一般否定句報告。

## 鉤子層（a、b、c）（51451–51455）
- **51451**　交件：`desc-tools/batches/hooks/add-20261101-eb4-hooks-a.json`（7）、`-b.json`（8）、`-c.json`（8），key 逐字照研究稿、順序不變。公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆預算／hook 加權：a1 207／21.5、a2 165（thin）／20、a3 208／19、a4 225／23、a5 223／17、a6 226／25.5、a7 163（thin）／21；b1 211／22、b2 151（thin）／20、b3 219／16、b4 228／19、b5 170（thin）／20、b6 230／21.5、b7 209／25.5、b8 225／21；c1 214／19.5、c2 226／22、c3 204／20.5、c4 230／22、c5 220／17、c6 154（thin）／20、c7 230／21、c8 221／21。full 上限 230、thin 上限 170，全部在內；hook 原始字元 16–30。初稿 11 張超標，整格捨去：Чижик 的 Ellington 變奏與 A 面三首自作、Джанго 的 Jobim 與錄音室名、Paulus 的阿蘭費斯選段、Tallinn 的曲名中譯、Labajalg 的〈Ringtants〉、Atto 的「無電子音色」、Архангельск 兩面時長、Synopsis 逐首曲名與錄音日、Workshop Band 的國營廠全名與錄音日、Hörmusik 的 III 集、Vyšniauskas 的 B 面〈Balkan Sun〉。壓完回核 hook 依賴：補回 Джаз вдвоем「庫爾斯克」、Архангельск「近北極」、Day Dream 外號（改寫成「Lady Jazz」「爵士女王」，不與 hook 逐字重複）；Atto 的 Ganelin 三重奏挪到 g1。
- **51452**　骨架歸屬（23 張 23 條；只有擁有者 note 寫歸屬句）：a1 老歌拆成長篇變奏（兩城音樂會雙 LP）；a2 跨地雙人搭檔（愛沙尼亞×庫爾斯克）；a3 七重奏以管樂音色近似大樂團；a4 盤名借自他人曲名（John Lewis〈Django〉）；a5 前輩父子作品同面並列；a6 曲名＝電視紀錄片片名；a7 作曲分工（首席獨奏寫開場）；b1 年輕團員日後成名（Бутман）；b2 **審查**（嫌太前衛→改帶人聲器樂團）；b3 團名與實際編制落差（四重奏七人）＋民間舞拍子；b4 名團鼓手的打擊獨奏系列起點；b5 **地方場景**（近北極的「俄羅斯紐奧良」）；b6 歌手外號＋全英語標準曲；b7 組曲＝回憶錄、合成器化四重奏；b8 他團婉拒、作品轉往立陶宛（聖詠＋大樂團）；c1 民謠旋律撐起長篇；c2 十一聲部人聲合唱團（唯一一張＋2024 重發）；c3 低音號＋電鋼琴＋拉丁打擊的編制；c4 四人各供曲＋**Synopsis→Zentralquartett** 延續；c5 **國營廠×西方廠合製**（東德樂團在西柏林錄，FMP 只歸本張當骨架）；c6 **電台錄製**、兩年後才出版；c7 **柏林現場**＋「聽的音樂」系列首張；c8 曲名全是人名＋Bauer 多聲部泛音／循環換氣。與 d–e 預配（51456）對齊：出國受限、出走、首張、大樂團、特殊錄音空間全讓給 d–e；Vyšniauskas 的「首張專輯」因此整格刪除；Kadans 1984 赴 Jazz Jamboree／North Sea、Saarsalu 1978 第比利斯爵士節、Vyšniauskas 的 Birštonas 大獎三格「音樂節」全部不指派。**本批 a–c 不寫媒體名**（Jazzword、AllMusic、Stamp The Wax、Hetq、Discogs／維基、Howard Mandel 評語、Starr《Red and Hot》皆不進 note）。
- **51453**　同人分軸與「他／她」引入法（第二句句型逐張配死）：Saarsalu×4——a2 綽號（『薩克斯風之王』）、a6 由…帶領（團長）、b3 自學、a5 不指派；Paulus×3——a5「領銜的…是塔林的爵士吉他手」、a6 作曲欄（〈Melanhoolne valss〉）、b6 樂團裡的愛沙尼亞吉他手；Джазовый ансамбль Игоря Бриля×2（＋b6 伴奏）——a7 學歷與出生地（Gnessin、莫斯科），c3 只寫錄音編制與作曲掛名，b6 不點名；Чекасин×2——b7「1971 年起住在立陶宛的…」＋組曲人員，b8 只寫他指揮學院爵士樂團；Оганесян×2——b6 出身亞美尼亞＋外號，b8 只寫「作品為她而寫」；Gumpert×3——c4 作曲（A 面首曲）、c5「彈鋼琴，開場〈Hahnenkopf〉是他寫的」、c6「生在東德 Jena 的…是自由爵士鋼琴手」；Bauer——c4 作曲、c5〈Blau Blusen Blues〉、c8「是長號手 Johannes Bauer 的哥哥」（d1 的改學長號生平不在 a–c 出現）；Sommer——c4 作曲、c5〈Hilferuf einer Schnecke〉、c7 暱稱 Baby。其餘第二句：a1 生年＋出生地、a3 樂器（富魯格號＋鋼琴）、a4 器物（Framus 吉他）、b1 作曲欄、b2 以…為基地、b4 身兼、b5 創辦人、b8「作曲兼彈鋼琴的是…」、c1 自述（Coltrane 的回聲）、c2 成軍、c3「這支莫斯科的爵士合奏團走…」、c4「是…成團的四人組」。23 句前四字互異。
- **51454**　「日」後一字（`/[年月]\s*\d{1,2}\s*日(.)/`，並把「1、2、4 日」「25 至 27 日」形一起看）：a5 日，、c2 日重、c6 日由、c7 日的；c8「25 至 27 日連續三天」；其餘只寫到年或月（Workshop Band 改成「1979 年 3 月」，避開 d2 的「日於」；Synopsis 錄音日整格刪）。與 d–e 的 替／於／進／登／錄／到／柏 全不重複。hook 開頭前四字 23 張互異，並與 repo 內全部既有 hooks 檔開頭比對過（避開 c95「Fats」、c194「A 面整」、c155「十一個人」、c142「六首裡五」、mc22「電台錄下」）；c53 已上架的 Chizhik《Лента Мёбиуса》、Архангельск《Portrait》、Каданс《Какая снежная весна》、Аллегро 兩張的切入面（獨奏雙 LP、樂器清單、團名雙關、Левиновский 生平、貝斯換位）本批不重用。hook 間中文 4-gram 自查：只剩樂器名「薩克斯風」與西里爾人名，無其他共用；hook 與 note 無逐字重複句（a6、b5、b6 改寫過）。
- **51455**　腳本：`node qa-batch.mjs hooks add-20261101-eb4` 只剩 1 標記＝hooks-b「非拉丁亂碼」，是 Игорь Бутман（b1）、Вагиф Мустафазаде（b2）、Владимир Резицкий（b5）三個原文人名不在 `nonlatin-proper-names.json` 白名單（本層無權改該檔）——**請主線把這三個名字 append 進白名單**（Николай Левиновский 已被既有片段涵蓋）；事實對照 0 筆。`node chk-hook-crossgroup.mjs add-20261101-eb4`（5 組 38 張）✓ 全部通過。專名：俄語人名照西里爾原文、愛沙尼亞／立陶宛／德語照原文；名單外又非核心的俄籍樂手（Oseychuk、Batkhin、Kurochkin、Molokoedov、Kadans 管樂手）改寫成職務，不點名，避免無來源的西里爾拼寫。
