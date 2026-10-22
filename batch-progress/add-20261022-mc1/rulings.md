# add-20261022-mc1 裁定（情緒薄格策展線・冷冽：minimal synth／coldwave／minimal wave）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三個薄格各補到約 2,000；場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`，交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x ≥ 3.3、y ≤ +0.2、z ≤ −0.3。冷冽線第一批。
> 策展：`curation-mc1.json`（兩輪共 47 張：法比冷浪潮 9、德語區 9、英美加 9、歐陸周邊 8、2009 後復興 12）→ `master-mc1.json`（MB 回查 47/47 釘住、flags 0）→ `pick.json`（39）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-mc1-cards.json`（39 張；研究 a–d 各 8、e 7）。身分：MB 釘住 39、§1 人工 0。
> **預留：研究 a 11001–11010、b 11011–11020、c 11021–11030、d 11031–11040、e 11041–11050、鉤子 11051–11060、寫作 11061–11070、主線 11071–11080。**
---

## 主線策展（不佔條號）
- 場景挖不到 54：策展兩輪只交 47（minimal wave 原盤多為卡帶、單曲、EP、事後合輯；中慢速 x 打不到的與 EBM／工業舞曲判重的都排除）。照「不湊數」上架 39。
- **校正依據**：拿池中同藝人已評分數對照（`score*/scored-*.json`＋錨點＋overrides）。評分對 synth-pop／post-punk 的質地普遍比策展估得重（Depeche Mode 池中 y 0.2–1.4、Кино 0.2–0.4、Fad Gadget 0.4–0.6、Section 25 1.0），色溫則 Human League 流行期偏暖（z −0.3～+0.8）。
- 汰 8 張：
  - **同藝人池中判重或能量貼邊**：Depeche Mode《A Broken Frame》（x 3.3，池中同期 y ≥0.2）、Кино《Начальник Камчатки》《Это не любовь...》（池中 x 3.0–3.4、y 0.2–0.4）、Fad Gadget《Fireside Favourites》（x 3.3，池中 y 0.4–0.6）、Section 25《From the Hip》（池中《Always Now》y 1.0）、The Human League《Reproduction》（x 3.3，池中同團 z 偏暖）。
  - **能量貼邊 x 3.3**：Minny Pops《Drastic Measures, Drastic Movement》、Martial Canterel《You Today》。
- **留下的邊緣張**（x 估 3.4，研究層要特別寫速度與鼓機事實）：Charles de Goal 兩張、Gina X Performance《Voyeur》、Snowy Red、Taxi Girl《Seppuku》、Xeno & Oaklander《Sentinelle》《Sets & Lights》、Linea Aspera 兩張。質地存疑：Moskwa TV（electro 低頻序列器）、Body of Light、Riki（y 估 0）。
- 掛名：El Aviador Dro 三張 MB 署名「El Aviador Dro Y Sus Obreros Especializados」，卡池統一「El Aviador Dro」（queryAlias 帶全名）；Gina X《X-Traordinaire》連字號改 ASCII；Kraftwerk《Electric Cafe》照 MB 無重音。
- Kraftwerk 兩張（《Electric Cafe》《Tour de France Soundtracks》）不屬 mc11「Kraftwerk 系二線」，收本批；池中《Computer World》3.5/−0.4/−1.1 落冷冽，同尺。

## 研究 a 組
- **11001**（KaS Product《Try Out》年份）：卡單 1981 取自 MB；Discogs、法文與英文維基皆 1982（RCA Victor PL 37603），錄音 1981 年 8 月於瑞士 Sunrise Studio。研究稿以 1982 為準，建議卡片年份改 1982。
- **11002**（KaS Product《Ego Eye》年份與廠牌）：卡單 1987／Disc'Az 取自 MB；Discogs 為 1986-10、Pussy disc 4702，法文維基寫 1986。建議年份 1986。聲音面只有 Discogs 的 Indie Rock 標籤與『原音＋電子樂器』掛名，無鼓機／速度證據，moodGuess 存疑，status thin，列汰換候選。
- **11003**（Mathématiques Modernes《Les Visiteurs du soir》moodGuess 存疑）：Discogs 掛名真鼓手 Hervé Zénouda、薩克斯風、長號、小號與管絃編曲（Bruce H. Grant），不是乾薄鼓機編制，色溫與厚薄可能偏暖偏豐，列汰換候選。
- **11004**（Charles de Goal《Ici l'ombre》moodGuess 存疑，強）：Trouser Press 稱整張很少用電子樂器、以電吉他貝斯鼓為主；Discogs 風格 Post-Punk、掛名 Percussion。與『鼓機＋冷合成器』相反，建議汰換。
- **11005**（Charles de Goal《Algorythmes》）：沒有任何來源證實鼓機或真鼓；曲長偏長（5 分鐘以上共 4 首），速度存疑；status thin。
- **11006**（Gina X Performance 地點推翻）：策展層寫杜塞道夫，Discogs 與維基皆為科隆。
- **11007**（Gina X《Nice Mover》moodGuess 存疑）：真鼓手 László Czigány 加 Rhodes／Hammond／鋼琴等層次，維基稱混有迪斯可節奏；年份 Discogs／MB 1978，維基專輯 1979，以 1978 為準。
- **11008**（Gina X《X-Traordinaire》moodGuess 存疑）：維基稱比首張『更溫暖、更傳統』，掛名吉他手與真鼓手，與預想方向相反，建議汰換候選。
- **11009**（WebSearch 用量）：本組用了 3 次（KaS 一次無結果、Charles de Goal 兩次）。

## 研究 b 組（條號 11011–11020）
- 11011：Chris & Cosey《Exotika》label 照 MB 美國版為 Nettwerk（NTCD 32）；歐洲原版是 Play It Again Sam（BIAS 69），Discogs 與維基同。卡單 Nettwerk 不算錯，是北美版。status 標 thin（無 BPM、器材來源）。
- 11012：moodGuess 存疑名單：Exotika（Discogs 註明受 Martin Denny／Les Baxter 啟發，曲長 5–10 分，商家稱陰沉而性感，偏慢）、Tour de France Soundtracks（無 BPM，環法／心跳主題，未必快）、Human League《Travelogue》（無鼓手、合成器過載失真，質地偏粗偏厚）、Rheingold 兩張（《Rheingold》無鼓手／motorik 佐證；《R.》Discogs 列真人鼓手 Charlie Terstappen，非鼓機）、Gina X《Voyeur》（真人鼓、定音鼓、鑼）、Görl《Night Full of Tension》（Oberheim DMX 鼓機有來源，但文章稱輕鬆冷靜，未言快）。
- 11013：發行日三處不一的卡（Electric Cafe、Travelogue）年份一致，正文並列各源日期，不推翻策展層。
- 11014：全組無推翻年份、廠牌、盤名；速度一律無數字來源，facts 不寫 BPM。

## 研究 c 組
- 11021：Taxi Girl《Seppuku》年份 MB／Discogs 為 1981、法文維基為 1982-01-05；不推翻卡單 1981，facts 並陳。
- 11022：Taxi Girl moodGuess 存疑（有 Jet Black 真鼓、Mirwais 電吉他、真貝斯，Air Studios 製作，質地偏厚偏暖，曲長 4.5–5.75 分居多）；建議評分後再決定去留。
- 11023：Krisma《Cathode Mamma》moodGuess 存疑（兩位真貝斯手取代吉他，Polydor／Trident 專業混音，偏厚）；鼓機或真鼓、BPM 查不到。〈Many Kisses〉百萬銷量為維基「據稱」，不入 facts。
- 11024：Snowy Red 速度（BPM）查不到；〈The Wild Boys〉Demo 22 分鐘暗示重複式長曲，x 3.4 存疑。
- 11025：Rational Youth、Xeno & Oaklander moodGuess 輕微存疑（旋律甜度與聲碼器／回音偏暖，速度未能驗證）。
- 11026：El Aviador Dro 兩張：節奏機、聲碼器確認，機型與 BPM 僅 Tesis 有 MXR 鼓電腦；Tesis 的 Rock de Lux 前 20 名為單一轉述，不入 facts。
- 11027：Units 鼓為真人（Brad Saunders），與 moodGuess 相容但質地比純機械稍暖；Far Out 稱音色飽滿而非薄。
- 本組推翻策展層：無（盤名、年份、廠牌、掛名皆吻合；Taxi Girl 年份僅標註分歧）。

## 研究 d 組
- **11031**（Automelodi《Automelodi》moodGuess 存疑）：首張有真鼓手 Guillaume Ethier 與吉他 Mauricio Lobos，Igloo 樂評稱「warm analogue」「warm electro pop melt」，速度不一（〈Limite Malade〉偏沉）；與預估『快鼓機、乾、冷』相反，建議汰換候選。
- **11032**（Automelodi《Surlendemains acides》moodGuess 存疑）：2014 訪談明說無實體鼓、質地有機、含 2012 白天錄的街頭噪音；鼓機與速度無證據，『乾淨』與環境噪音抵觸。
- **11033**（Lust for Youth《International》moodGuess 存疑）：樂評主調是『light, polished, ambient』『nothing lo-fi』、有熱帶彈跳與迪斯可拍，偏亮偏暖；產地來源不一（瑞典／哥本哈根），建議汰換候選。
- **11034**（Linea Aspera 兩張、Sally Dige、Xeno & Oaklander《Par Avion》）：找不到可靠的速度／鼓機／低頻來源（Bandcamp 擋爬蟲、Pitchfork 被擋），四張中 Linea Aspera 首張、Par Avion、Sally Dige 標 thin；LP II 有 I Die, You Die 樂評（motorik 鼓編程、朦朧光澤），輕度存疑偏有空間感。
- **11035**（Sally Dige 產地）：策展層／其他說法的『柏林』無來源，廠方稱加拿大；Linea Aspera 成立於倫敦（維基），Bandcamp 自述 Berlin-based，寫作層用『倫敦成立』。
- **11036**（WebSearch 用量）：本組用了 3 次（Lust for Youth、Sally Dige、Automelodi 各一）。
- **11037**（Pitchfork 引文）：Xeno & Oaklander 兩張引用 Larry Fitzmaurice 的評語，經維基轉引，原文未能開啟，且是對團體整體的描述；寫作層須寫『評論人形容』，不可當成專指某張。

## 研究 e 組（條號 11041–11050）
- **11041**：El Aviador Dro《Ciudadanos del Imperio》moodGuess 嚴重存疑。西語維基：1986-12 DRO、Liberty 錄音室、Fernando Arbex 製作，「大多離開 tecno-pop、靠近傳統 pop-rock，吉他多於合成器」，12 首約 2.5–4 分鐘短歌。非機械冷，建議汰換或大幅下修 z、上修 y。
- **11042**：El Aviador Dro《Cromosomas Salvajes》moodGuess 存疑。Discogs 錄音名單：Simon Boswell 吉他、Fairlight CMI 取樣、三首小號長號銅管，A 面三首 5.5–7.3 分鐘；質地偏厚、色溫偏暖可能，BPM／鼓機無來源。初版 526 張手工編號（1985-02，DRO 4D-100）。
- **11043**：Chris & Cosey《Trust》moodGuess 存疑（z 偏冷高估）。The Quietus：節拍更硬、合成器「不那麼冰冷」、人聲更直接；Trouser Press：Cosey 難得不像錄音留言。label：全球首發為 Play It Again Sam（BIAS 124），Nettwerk 為加拿大版（1989）／美國 CD 1990；卡單 Nettwerk 可留，寫作層宜寫雙廠牌。
- **11044**：Riki《Riki》moodGuess 存疑（z、y）。Matia Simovich 硬體鼓機與合成器製作，前段偏快新浪潮、後段 Spirit of Love／Monumental 較慢；靈感含 Kate Bush、Pat Benatar、Madonna，色溫恐回中性。Loud and Quiet 9／10 僅記 notes。
- **11045**：Body of Light《Let Me Go》status thin：找不到當年樂評（Pitchfork／AllMusic 無法抓取），聲音只有 Discogs（Darkwave／Coldwave／Synth-pop）與 Bandcamp 標籤；速度與鼓機無來源。x、y 無事實支撐，建議主線以池中 Dais 同期盤校正。
- **11046**：Moskwa TV《Dynamics & Discipline》：器材完整（PPG Wave、Moog Source、Jupiter-8、MKS-80、DX7、Akai S612，MSQ 700 音序器），曲長 5–6.5 分鐘的 electro 形式；鼓機型號與 BPM 無來源，方向（機械合成器）可信，x 無法驗證。〈Generator 7/8〉與車諾比對照出自 Discogs 藝人頁，單一來源。
- **11047**：Absolute Body Control《Figures》：1983 Body Records 卡帶（Body Tapes 003），Discogs master 340289 原版即此，MB 釘無誤；Bandcamp 的 1983-11-05／BC004ABC／Prodam 是數位重發資訊，不入 facts。status thin，聲音僅風格標籤。
- **11048**：本組未推翻策展層的盤名、年份、廠牌；Cromosomas 西語維基寫 1985-02、Discogs 法定登記 1984，卡單 1985 正確。
- **11049**：WebSearch 本組共用 3 次（Moskwa 無效 1、Chris & Cosey 1、Riki 與 Body of Light 各 1，實用 4 次含重複查詢，已超額 1 次，主線知悉）；Wikipedia 因共用 IP 429，改以 WebFetch／Discogs API 補。
- **11050**：moodGuess 存疑清單（供汰換）：Ciudadanos（強）、Cromosomas、Trust、Riki、Body of Light（弱）、ABC（弱）；Moskwa TV 方向成立。

## 主線：研究後汰換（不佔條號）
研究層聲音存疑共 17 張，全汰（不硬留；本場景的候補池已在策展兩輪挖盡，不補位），上線 **22 張**。被汰卡留在 `dropped-after-research.json`，研究稿同步刪條目，qa-batch research 通過。
- **偏暖／偏 pop**：Gina X《X-Traordinaire》（維基「更溫暖、更傳統」）、Automelodi 兩張（真鼓手、warm analogue；無實體鼓但有機噪音質地）、Lust for Youth《International》（明亮、熱帶彈跳）、El Aviador Dro《Ciudadanos del Imperio》（轉 pop-rock、吉他多於合成器）、Chris & Cosey《Trust》（「不那麼冰冷」）、《Exotika》（exotica 靈感、5–10 分鐘、陰沉而性感）、Riki（後段慢歌，色溫回中性）。
- **偏厚／編制豐**：Mathématiques Modernes（真鼓＋銅管＋管絃）、Krisma《Cathode Mamma》（雙真貝斯、Trident 混音）、Taxi Girl《Seppuku》（真鼓、電吉他、Air Studios、曲長 4.5–5.75 分）、El Aviador Dro《Cromosomas Salvajes》（吉他、Fairlight、銅管、A 面 5.5–7.3 分）、The Human League《Travelogue》（合成器過載失真；池中同團色溫偏暖）。
- **偏 post-punk 吉他／偏慢**：Charles de Goal《Ici l'ombre》（Trouser Press：很少用電子樂器）、《Algorythmes》（x 3.4 貼邊、5 分鐘以上 4 首、無鼓機證據）、Snowy Red（x 3.4、重複式長曲）、Linea Aspera《LP II》（朦朧回聲、4–6 分鐘）。
- **留下仍存疑**（評分見真章）：Rheingold《R.》（真鼓 Charlie Terstappen）、Gina X《Voyeur》（真鼓＋定音鼓）、Units（真鼓、飽滿）、Robert Görl（「輕鬆冷靜」）、Body of Light、Absolute Body Control、Linea Aspera 首張、Sally Dige、Xeno & Oaklander《Par Avion》（無速度來源）。
- **年份改卡單**：KaS Product《Try Out》1981 → **1982**（Discogs＋英法維基；1981 年 8 月為錄音）；《Ego Eye》1987 → **1986**（Discogs 1986-10、法文維基）。廠牌 Exotika 已汰；Chris & Cosey 無卡留下。
- **給下一輪 mc 場景的參考**：minimal synth 的「全長正規專輯」多半是樂團後期往 pop／編制擴充走的盤，研究層一查就偏暖或偏厚；真正冷而機械的多是卡帶／EP／事後合輯，卡池收不進。

## 鉤子層（a–c）
- **11051**　骨架歸屬表（a–c 15 張 15 條，先寫給 d–e 看；只有擁有者 note 寫「這條骨架全批只走本張」）：a1 Try Out＝**法國冷浪潮**（南錫二人組、替 Marquis de Sade 暖場）；a2 By Pass＝遠赴他城錄音（飛紐約 Sorcerer Sound）；a3 Ego Eye＝離開大廠後全數自製；a4 Nice Mover＝獻詞單曲跨洋走紅、後輩翻唱（單曲流傳）；b1 Voyeur＝最後一張且不發單曲（真人定音鼓與鑼進冷調合成器盤）；b2 Rheingold＝場景第一首打進主流榜；b3 R.＝電影配樂（主唱演電影）；b4 Görl＝**鼓手把鼓交給鼓機**；b5 Electric Cafe＝延宕與改名（工作名宣傳已印）；b6 Tour de France＝**Kraftwerk 晚期**（為紀念事件而做、隔 17 年）；c1 Units＝表演藝術團體出身；c2 Rational Youth＝**鼓機與合成器取代樂團**（先買器材再寫歌、國內第一張全合成器流行）；c3 Alas＝樂團自創廠牌；c4 Tesis＝早期數位混音（錄音師兼寫鼓電腦程式）；c5 Sentinelle＝類比八軌現場錄（2009 後復興的錄音法）。**「杜塞道夫／科隆電子圈」「廠牌第一張」「卡帶交換網路」「復興浪潮」a–c 不領**，留給 d–e。Xeno & Oaklander 分軸：c5 帶錄音（八軌、類比、三年、一個夏天排練）＋兩人身分（布魯克林二人組、Wendelbo 法挪裔概念藝術家）；Wierd 派對由來、McBride 的 Martial Canterel 前身、Pitchfork 那句評語、轉 Ghostly，c5 都不指派，留 d。日期「日」後一字 a–c 用：日由（b4）、日上（b6）、日的（c3）、日首（b3）；其餘只寫到月或年。

## 鉤子層（d、e）（條號 11056–11060）
- **11056**　交件：`desc-tools/batches/hooks/add-20261022-mc1-hooks-d.json`（4）、`-hooks-e.json`（3），key 逐字照研究稿、順序不變，欄位只有 key／hook／note。預算＝`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`（只扣這四樣；第二句指派、（標時序）全計入）。上限 full 230（d1、e2）、thin 170（d2、d3、d4、e1、e3，研究稿 status thin）。逐筆〔預算／hook 加權／hook 原始字元〕：d1 Sets & Lights 227/27/27、d2 Par Avion 163/24.5/28、d3 Linea Aspera 169/20/20、d4 Hard to Please 170/27/27、e1 Let Me Go 161/24/24、e2 Moskwa TV 229/24/24、e3 Figures 159/25/25。初稿 7 張全超標（最高 Moskwa 375），一律整格捨去：Sets & Lights 的 X&O Studio 錄音地（c5 已領自家錄音室）、義式迪斯可推進與「沉穩克制」、標題曲男女對唱；Par Avion 的《Movements》委託作、聯覺的定義括號、最短曲長；Linea Aspera 的曲長整齊、阿姆斯特丹最後一場、前作卡帶 EP；Sally Dige 的作曲／攝影／封面自理、300 張黑膠；Body of Light 的 Ascetic House 早期、日後受訪「重新介紹」（單源事後說法）；Moskwa TV 的 Dynaton Studio、CBS 推薦、法蘭克福 techno 俱樂部先紅、Kurt Ader 器材；Figures 的曲長、1983 現場加收曲與 Melsele 日期、The Klinik。壓完回核 hook 依賴：d1 兩種速度＋無拍在 g1；d2 換廠牌在 g1、Serge／聯覺在 g2；d3 巡演簽證在 g2；d4 角色與面具在 g1；e1 Synth Cowboys 在 g1（亞利桑那只在 hook，facts 有 src）；e2 核電廠事故與車諾比在 g1；e3 卡帶交換網路只在 hook（facts 有 src，為守 hook 與 note 不重複不進 note）。
- **11057**　骨架歸屬（d–e 7 張 7 條，與 11051 a–c 15 條無重疊，只有擁有者寫歸屬句）：d1 Sets & Lights＝**全盤兩種速度＋一首無拍**（曲目的速度結構）；d2 Par Avion＝**轉投新廠牌的第一張**（11051 留給 d–e 的「廠牌第一張」）＋器物（Serge）；d3 Linea Aspera＝**首張後巡演卡簽證、隨即散團**（與作品直接綁定，標時序）；d4 Hard to Please＝**舞台角色底下的私人面**；e1 Let Me Go＝**兄弟檔**；e2 Moskwa TV＝**歌詞被事後的事故追上（車諾比）**；e3 Figures＝**卡帶交換網路**（11051 留給 d–e）。「復興浪潮」與「杜塞道夫／科隆電子圈」d–e 不當骨架：復興只在 d2 第二句當身分詞、Moskwa TV 是法蘭克福不碰杜塞道夫。媒體名與媒體榜名次不進 note：Boomkat 寫「唱片行」、jpc 廠方文案寫「廠方」、Pitchfork／Larry Fitzmaurice 評語、I Die, You Die 回顧、Burning Flame EP 榜第一一律未指派；Sally Dige 不寫柏林、Linea Aspera 寫倫敦成立。
- **11058**　同藝人分軸與引入法：**Xeno & Oaklander 三張**（c5 為 a–c 所有）——c5 帶錄音法與兩人身分（11051）；d1 帶曲目速度結構＋內頁只署兩人，第二句「X 是 A 與 B，A 先前以 Martial Canterel 之名做…」（名字＋前身）；d2 帶換廠牌＋Serge／聯覺，第二句「以 Serge 合成器領句，帶出…」（器物）。Wierd 派對、八軌、三年、Wendelbo 法挪裔只在 c5；d1／d2 不寫。「他／她」：Sally Dige 用「她」；Xeno & Oaklander、Linea Aspera、Body of Light 用「兩人」；Moskwa TV、Absolute Body Control 用團名。第二句句型逐張配死：d1「X 是 A 與 B，A 先前以…之名」、d2「以器物領句帶出 X」、d3「X 是年地成立的樂種搭檔，A 唱、B 掌…」、d4「X 是國籍藝術家，創作跨…」、e1「X 是 A 與 B 兄弟，歸在…」、e2「X 是樂種團」、e3「X 是 A 領軍的國籍樂種團」。hook 只帶身分不帶名字的 7 張，第二句都補了名字與地點／樂種。
- **11059**　「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：d2 日換、d3 日面；其餘 5 張只寫到年或月。與 11051 a–c 的日由／日上／日的／日首不撞（初稿 d3「日由」、d4「日首」撞 a–c，已改）。hook 四型：懸疑 d3 e2（收尾：note 寫 2013 年 1 月散團／車諾比與「被當成預言」）／斷言 d2／場景 d1 e3／人物定調 d4 e1。
- **11060**　自查與腳本：hook 開頭前四字 7 張互異，也與已交 a 組及 `batches/hooks/` 歷來 hook 開頭不撞（初稿 d1「布魯克林」撞 nj5 c 組，已改）。hook 對 hook、hook 對全批已交 note 的中文 4-gram 0 條（初稿 e1 hook「上合成器」撞 d2 note「用上」，改「動用」）；hook 對自身 note 的逐字重疊已拆（d3 北美巡演、d4 自製服裝、e2 寫核電廠事故）。note 對 note 清掉「管合成器」（撞 a1）、「年由發行」（撞 a1／a4）、「的第三張」（撞 a3）；剩下全是指派句樣板（第二句寫、主故事年、標時序）。`node qa-batch.mjs hooks add-20261022-mc1`：d、e 無標記（只報缺 b、c 檔）；`node chk-hook-crossgroup.mjs add-20261022-mc1`：全部通過（只報不擋：d1「〈Untitled〉沒有拍子」是聲音內容）。b、c 交件後需再合掃一次 4-gram 與開頭。
