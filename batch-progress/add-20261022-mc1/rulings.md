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
- **11051**　骨架歸屬表（a–c 15 張 15 條，先寫給 d–e 看；只有擁有者 note 寫「這條骨架全批只走本張」）：a1 Try Out＝**法國冷浪潮**（南錫二人組、替 Marquis de Sade 暖場）；a2 By Pass＝遠赴他城錄音（飛紐約 Sorcerer Sound）；a3 Ego Eye＝幕後成員開口唱（Spatsz 掛名人聲與原音樂器；初稿「離開大廠」與 d2 換廠牌同構，交件前改）；a4 Nice Mover＝獻詞單曲跨洋走紅、後輩翻唱（單曲流傳）；b1 Voyeur＝最後一張且不發單曲（真人定音鼓與鑼進冷調合成器盤）；b2 Rheingold＝場景第一首打進主流榜；b3 R.＝電影配樂（主唱演電影）；b4 Görl＝**鼓手把鼓交給鼓機**；b5 Electric Cafe＝延宕與改名（工作名宣傳已印）；b6 Tour de France＝**Kraftwerk 晚期**（為紀念事件而做、隔 17 年）；c1 Units＝表演藝術團體出身；c2 Rational Youth＝**鼓機與合成器取代樂團**（先買器材再寫歌、國內第一張全合成器流行）；c3 Alas＝樂團自創廠牌；c4 Tesis＝早期數位混音（錄音師兼寫鼓電腦程式）；c5 Sentinelle＝類比八軌現場錄（2009 後復興的錄音法）。**「杜塞道夫／科隆電子圈」「廠牌第一張」「卡帶交換網路」「復興浪潮」a–c 不領**，留給 d–e。Xeno & Oaklander 分軸：c5 帶錄音（八軌、類比、三年、一個夏天排練）＋兩人身分（布魯克林二人組、Wendelbo 法挪裔概念藝術家）；Wierd 派對由來、McBride 的 Martial Canterel 前身、Pitchfork 那句評語、轉 Ghostly，c5 都不指派，留 d。日期「日」後一字 a–c 定稿：日由（b4）、日上（b6）、日首（b3）；c3 的 Simposium Tecno 一格壓預算整格捨去，「日的」不再使用；其餘 12 張只寫到月或年。
- **11052**　交件：`desc-tools/batches/hooks/add-20261022-mc1-hooks-a.json`（4）、`-hooks-b.json`（6）、`-hooks-c.json`（5），key 逐字照研究稿、順序不變，欄位只有 key／hook／note。預算＝`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`（只扣這四樣，第二句指派句與（標時序）全計入）。上限 full 230、thin 170（a3 Ego Eye，研究稿 status thin）。逐筆〔預算／hook 加權／hook 原始字元〕：a1 Try Out 224/19/19、a2 By Pass 211/16/16、a3 Ego Eye 169/18/22、a4 Nice Mover 218/20.5/28；b1 Voyeur 223/19/19、b2 Rheingold 215/27/29、b3 R. 228/18.5/20、b4 Görl 228/21/23、b5 Electric Cafe 227/22/27、b6 Tour de France 227/22/22；c1 Units 220/23.5/26、c2 Rational Youth 226/12/12、c3 Alas 213/19/19、c4 Tesis 228/17/17、c5 Sentinelle 219/21/21。初稿 15 張有 13 張超標（最高 c2 291），一律整格捨去：Try Out 的曲數曲長與 Soyoc 出生州；By Pass 的工程師；Ego Eye 的轉簽 Disc'AZ 與工程師；Nice Mover 的 Kikoine 分工、Mini Moog 與鼓手（鼓手給 b1）；Voyeur 的 Held 分工與 Kikoine 封面；Rheingold 的 Brigitte Kunz 與 Staiger 分工；R. 的 Can Studio、單曲名次與片評；Görl 的 Jacob's Studio、序列器細節；Electric Cafe 的紐約混音與類比母帶；Tour de France 的 Fritz Hilpert；Units 的錄音室與製作掛名；Rational Youth 的 Komoda 與魁北克前十；Alas 的 Simposium Tecno（一句）；Tesis 的歌詞主題與盒裝全名；Sentinelle 的兩處錄音室。壓完回核 hook 依賴：a2、a3、b1、b4（g2）、b5、c2、c4 在 g1／g2；a1、a4、b2、b3、b6、c1、c3、c5 的依賴事實只留在 hook 本身（facts 皆有 src，為守「hook 與 note 不逐字重複」不再進 note）。hook 事實自驗：a4 拿掉「英國」（研究稿只寫作家）、b2 盤名歸屬改「出自他們的首張」、c4 曲長改寫成「約 4 到 6 分鐘」（實為 3:57–5:43）。
- **11053**　同藝人分軸與「他／她／他們」引入法：**KaS Product 三張**——a1 帶生平（南錫、Spatsz 精神病院、Soyoc 爵士俱樂部、暖場 Marquis de Sade、瑞士錄音），第二句「X 是年月在地成立的極簡電子搭檔」；a2 帶錄音細節（紐約 Sorcerer Sound、全由二人演奏、曲長），第二句「評論說 X 這組二人…RCA 這回照樣發行」（外人之口）；a3 帶分工轉變（Spatsz 開口唱、原音樂器、全數自製、1988 散團標時序），第二句「國籍搭檔 X 的這張，年月由廠牌發行」。Spatsz 2019 辭世三張都不指派（與作品無直接綁定）。**Gina X Performance 兩張**——a4 帶生平（Held 的 Birth Control 六年、1978 科隆錄音、獻詞單曲、Erasure 翻唱標時序），第二句「演唱者是地的樂種計畫 X」；b1 帶錄音細節（真鼓＋定音鼓與鑼、1981 年 3–4 月混音、不發單曲），第二句「X 以團名發表的作品到此為止，前後共出三張」（序數＋終點）。**Rheingold 兩張**——b2 帶成績與身分，第二句「來自地一帶的 X 做樂種，詞由 A 寫」；b3 帶電影與錄音（Terstappen 真鼓、〈Stahlherz〉），第二句「演 R 的正是 X 主唱 A」（角色→本人）。**Kraftwerk 兩張**——b5 帶製作延宕與數位化，第二句「年份出版，樂種團 X 錄音室作品到這張是第九張」；b6 帶晚期成績與 Florian 最後一張，第二句「A 與 B 替 X 製作了這張，日期上市」（掛名欄）。**El Aviador Dro 兩張**——c3 帶生平（馬德里、團名典故、自組 DRO），第二句「X 年在地組成，名字借自…」；c4 帶錄音細節（MXR、PCM F-1），第二句「唱片署名全名…」（掛名欄）。Xeno & Oaklander c5 照 11051，與 d–e 11058 相容。
- **11054**　第二句句型（a–c 15 種，已排 d–e 11058 七種）：a1 X 是…成立的搭檔／a2 評論說／a3 國籍搭檔 X 的這張／a4 演唱者是／b1 X 以團名發表的作品到此為止／b2 來自…的 X 做／b3 演 R 的正是／b4 人名生年生於…組成／b5 年份出版，X 錄音室作品到這張是／b6 A 與 B 替 X 製作了這張／c1 樂種團 X 的首張就是它／c2 地的 X 錄成常被稱為／c3 X 年在地組成，名字借自／c4 唱片署名全名／c5 A 與 B 年在地組成 X。另掃 `batches/output/` 中 add-20261021／22 已交 22 檔的頭兩句，拆掉與已上架卡同形的殘片：電子二人組、的第二張、被形容為、國二人組、首歌出自、最後一張、樂團名義、位主唱是、張錄音室專輯、製作掛名、第一張全、年成立於、團名取自、這家廠牌、是第三張；剩 b2 hook「他們的首張」一條（序數通用語，保留）。hook 四型：懸疑 a4 b5 b6 c3／斷言 a3 b2 c2 c4／場景 a2 b1 b3 c5／人物定調 a1 b4 c1。
- **11055**　自查與腳本：hook 開頭前四字 22 張互異；hook 對 hook 中文 4-gram 0 條；hook 對全批 note 只剩地名「布魯克林」（d1 hook × c5 第二句，專名）；hook 對自身 note 的逐字重疊已拆（a1 精神病院、a4 俱樂部、c1 表演藝術團體、c4 鼓電腦的程式）。第二句互掃只剩地名「杜塞道夫」（b2 × b4）。媒體名與媒體榜單名次不進 note：Télérama、Electronic Sound、Far Out、The Fader、NME、AllMusic、Smash Hits、Observer、Rock de Lux 一律未指派（Units 的速度評語寫「樂評形容」）；官方排行榜照寫（德國單曲／專輯榜、Billboard 舞曲俱樂部榜）。無分數星等。`node qa-batch.mjs hooks add-20261022-mc1`：全部通過；`node chk-hook-crossgroup.mjs add-20261022-mc1`：5 組 22 張全部通過（只報不擋：b1「沒有發行單曲」是內容）。

## 鉤子層（d、e）（條號 11056–11060）
- **11056**　交件：`desc-tools/batches/hooks/add-20261022-mc1-hooks-d.json`（4）、`-hooks-e.json`（3），key 逐字照研究稿、順序不變，欄位只有 key／hook／note。預算＝`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`（只扣這四樣；第二句指派、（標時序）全計入）。上限 full 230（d1、e2）、thin 170（d2、d3、d4、e1、e3，研究稿 status thin）。逐筆〔預算／hook 加權／hook 原始字元〕：d1 Sets & Lights 227/27/27、d2 Par Avion 163/24.5/28、d3 Linea Aspera 169/20/20、d4 Hard to Please 170/27/27、e1 Let Me Go 161/24/24、e2 Moskwa TV 229/24/24、e3 Figures 159/25/25。初稿 7 張全超標（最高 Moskwa 375），一律整格捨去：Sets & Lights 的 X&O Studio 錄音地（c5 已領自家錄音室）、義式迪斯可推進與「沉穩克制」、標題曲男女對唱；Par Avion 的《Movements》委託作、聯覺的定義括號、最短曲長；Linea Aspera 的曲長整齊、阿姆斯特丹最後一場、前作卡帶 EP；Sally Dige 的作曲／攝影／封面自理、300 張黑膠；Body of Light 的 Ascetic House 早期、日後受訪「重新介紹」（單源事後說法）；Moskwa TV 的 Dynaton Studio、CBS 推薦、法蘭克福 techno 俱樂部先紅、Kurt Ader 器材；Figures 的曲長、1983 現場加收曲與 Melsele 日期、The Klinik。壓完回核 hook 依賴：d1 兩種速度＋無拍在 g1；d2 換廠牌在 g1、Serge／聯覺在 g2；d3 巡演簽證在 g2；d4 角色與面具在 g1；e1 Synth Cowboys 在 g1（亞利桑那只在 hook，facts 有 src）；e2 核電廠事故與車諾比在 g1；e3 卡帶交換網路只在 hook（facts 有 src，為守 hook 與 note 不重複不進 note）。
- **11057**　骨架歸屬（d–e 7 張 7 條，與 11051 a–c 15 條無重疊，只有擁有者寫歸屬句）：d1 Sets & Lights＝**全盤兩種速度＋一首無拍**（曲目的速度結構）；d2 Par Avion＝**轉投新廠牌的第一張**（11051 留給 d–e 的「廠牌第一張」）＋器物（Serge）；d3 Linea Aspera＝**首張後巡演卡簽證、隨即散團**（與作品直接綁定，標時序）；d4 Hard to Please＝**舞台角色底下的私人面**；e1 Let Me Go＝**兄弟檔**；e2 Moskwa TV＝**歌詞被事後的事故追上（車諾比）**；e3 Figures＝**卡帶交換網路**（11051 留給 d–e）。「復興浪潮」與「杜塞道夫／科隆電子圈」d–e 不當骨架：復興只在 d2 第二句當身分詞、Moskwa TV 是法蘭克福不碰杜塞道夫。媒體名與媒體榜名次不進 note：Boomkat 寫「唱片行」、jpc 廠方文案寫「廠方」、Pitchfork／Larry Fitzmaurice 評語、I Die, You Die 回顧、Burning Flame EP 榜第一一律未指派；Sally Dige 不寫柏林、Linea Aspera 寫倫敦成立。
- **11058**　同藝人分軸與引入法：**Xeno & Oaklander 三張**（c5 為 a–c 所有）——c5 帶錄音法與兩人身分（11051）；d1 帶曲目速度結構＋內頁只署兩人，第二句「X 是 A 與 B，A 先前以 Martial Canterel 之名做…」（名字＋前身）；d2 帶換廠牌＋Serge／聯覺，第二句「以 Serge 合成器領句，帶出…」（器物）。Wierd 派對、八軌、三年、Wendelbo 法挪裔只在 c5；d1／d2 不寫。「他／她」：Sally Dige 用「她」；Xeno & Oaklander、Linea Aspera、Body of Light 用「兩人」；Moskwa TV、Absolute Body Control 用團名。第二句句型逐張配死：d1「X 是 A 與 B，A 先前以…之名」、d2「以器物領句帶出 X」、d3「X 是年地成立的樂種搭檔，A 唱、B 掌…」、d4「X 是國籍藝術家，創作跨…」、e1「X 是 A 與 B 兄弟，歸在…」、e2「X 是樂種團」、e3「X 是 A 領軍的國籍樂種團」。hook 只帶身分不帶名字的 7 張，第二句都補了名字與地點／樂種。
- **11059**　「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：d2 日換、d3 日面；其餘 5 張只寫到年或月。與 11051 a–c 的日由／日上／日的／日首不撞（初稿 d3「日由」、d4「日首」撞 a–c，已改）。hook 四型：懸疑 d3 e2（收尾：note 寫 2013 年 1 月散團／車諾比與「被當成預言」）／斷言 d2／場景 d1 e3／人物定調 d4 e1。
- **11060**　自查與腳本：hook 開頭前四字 7 張互異，也與已交 a 組及 `batches/hooks/` 歷來 hook 開頭不撞（初稿 d1「布魯克林」撞 nj5 c 組，已改）。hook 對 hook、hook 對全批已交 note 的中文 4-gram 0 條（初稿 e1 hook「上合成器」撞 d2 note「用上」，改「動用」）；hook 對自身 note 的逐字重疊已拆（d3 北美巡演、d4 自製服裝、e2 寫核電廠事故）。note 對 note 清掉「管合成器」（撞 a1）、「年由發行」（撞 a1／a4）、「的第三張」（撞 a3）；剩下全是指派句樣板（第二句寫、主故事年、標時序）。`node qa-batch.mjs hooks add-20261022-mc1`：d、e 無標記（只報缺 b、c 檔）；`node chk-hook-crossgroup.mjs add-20261022-mc1`：全部通過（只報不擋：d1「〈Untitled〉沒有拍子」是聲音內容）。b、c 交件後需再合掃一次 4-gram 與開頭。

## 寫作層（writer-1）（條號 11061–11065）
- **11061**　交件 `desc-tools/batches/output/add-20261022-mc1-out-1.json`，11 張，key 逐字同序。字數（Array.from）：Try Out 239、By Pass 239、Ego Eye 176（thin）、Nice Mover 224、Voyeur 239、Rheingold 238、R. 238、Night Full of Tension 240、Electric Cafe 228、Tour de France Soundtracks 236、Digital Stimulation 225。初稿 By Pass 246、R. 242、Görl 251、Try Out／Voyeur 241，一律整格或整詞捨去（「擔綱」「親手」「骨幹」、改寫掛名句），未動 note 指派的事實。
- **11062**　第二句一律照鉤子層指派的領句；Ego Eye 為拆跨檔 4-gram「專輯年月」（對 writer-2 Linea Aspera），領句在日期前加一個「在」，其餘不動。寫作層只寫 note 列的項目，facts 有、note 沒列的（Birth Control 的「搖滾團」、曲長、工程師、樂評評語等）不寫；note 無媒體名，正文無媒體名、無轉述引導詞。
- **11063**　Electric Cafe 改名後的盤名照卡池寫《Electric Cafe》（無重音，主線策展裁定照 MB），不照 note 的《Electric Café》，免卡片標題與簡介對不上。
- **11064**　「日」後一字照鉤子層：Görl 改為「日發」（原「日由」，為拆「專輯年月」把句子改成 Mute 領句）、Tour de France「日上」、R.「日首」；其餘只寫到年或月。Voyeur「沒有發行單曲」是 note 指派的內容，照寫。
- **11065**　自掃（han() 4-gram，含 hook，跨 out-1／out-2 兩檔）：本檔 3 張以上 0 條；2 張只剩地名「杜塞道夫」（Rheingold × Görl，兩句皆為鉤子層指派的領句，專名不算）。拆掉的 2 張殘片：負責合成器與、比前兩張、與聲碼器、專輯在德國、用合成器、專輯年月。`qa-batch out`：全部通過（22 張與卡單相符）；`qa-check-research`：標記 0；`fix-spacing`：無需修正。

## 寫作層（writer-2）（條號 11066–11070）
- **11066**　交件：`desc-tools/batches/output/add-20261022-mc1-out-2.json` 11 張，key 逐字同序。full 6 張 216–237（Rational Youth 237、Alas 216、Tesis 228、Sentinelle 217、Sets & Lights 233、Moskwa TV 230）；thin 5 張 137–174（Par Avion 157、Linea Aspera 166、Hard to Please 137、Let Me Go 174、Figures 167）。無超標、無掉下限，未整格捨去。`qa-batch out`（22 張全部通過）、`qa-check-research`（標記 0）、`fix-spacing`（待補 0）。
- **11067**　第二句全照鉤子層 11054／11058 指派領句。代稱收尾：Tesis 的「錄音師」第三句具名 Jesús N. Gómez（只補藝術製作，不重提鼓電腦）；Moskwa TV 的「一首歌」具名〈Generator 7/8〉，hook 已寫的核電廠事故不重述，只補車諾比與「被當成預言」；Linea Aspera 不重提北美與簽證，只寫巡演取消與 2013 年 1 月散團（標時序）；Par Avion 的聯覺不重述。
- **11068**　轉述與媒體：Sets & Lights 的唱片行說法、Hard to Please 的廠方文案一律改直述（不寫「唱片行說／廠方說」）；Sentinelle 的 Wendelbo 引語轉間接（「Wendelbo 說它是…」，當事人自述非轉述引導詞）；無媒體名、無榜單名次、無「據說／據傳」；rulings「主線：研究後汰換」未進正文。Figures 第二句的「比利時」與 hook 重一詞，屬指派原文，保留。
- **11069**　日期語序與「日」後一字：Par Avion 日換、Linea Aspera 日面（照 11059）；其餘只寫到年或月，領頭名詞逐張不同（時間是年月／年月掛牌的／年月八首歌在／在年接下發行／年月第三張仍落在／首作年月日／年交給／年落腳／首張年交到／在年把）。為避開近批已上架常見殘片，初稿改掉：年月推出、年月樂團、在年發行、合計約分鐘、片年月日、錄音混音、製作人是、專輯發行、一路走到。
- **11070**　自掃（han() 4-gram，含 hook，跨 out-1／out-2）：本檔涉及的跨張殘片只剩 2 張的「的錄音室」與樂器名「合成器節奏機」，3 張的只有地名「布魯克林」（Xeno & Oaklander 三張，其中一處在 d1 hook）；3 張以上通用殘片 0 條。

## 主線審稿（11071–11080）
- **11071**　2026-10-22 雲端主線逐張審 22 張，逐句對回研究稿。改 2 張，其餘未改字。
- **11072**　`desc2:KaS Product|By Pass`：「評論說 KaS Product 這組二人把冷浪潮推得更冰冷，RCA 這回照樣發行。」→「法國冷浪潮二人組 KaS Product 的這張續作，1983 年 2 月由 Mona Soyoc 與 Spatsz 帶進紐約 Sorcerer Sound…」。依據：原句是 James Greene 對樂團整體的單源評價（研究 b 第 10 條，出自維基 Cold wave 條目轉引），不是對本盤，照審稿規則刪；「RCA 照樣發行」與末句重複一併刪。只刪不增事實，研究／鉤子層不用同步。
- **11073**　`desc2:Xeno & Oaklander|Par Avion`：第二句「Serge 合成器的音色，出自復興冷浪潮的布魯克林二人組 Xeno & Oaklander 之手。」→「Xeno & Oaklander 是復興冷浪潮的布魯克林二人組，成員 Sean McBride 與 Liz Wendelbo。」依據：原句與 hook 重複 Serge 合成器、語意不通；成員名見研究 d 第 9 條。
- **11074**　其餘逐張核過的點：Try Out「la vague froide」出處（研究 a 第 10 條，維基 Cold wave）、Voyeur「沒有發行單曲／歐洲幾城宣傳演出」（研究 b 第 3 條）、Rheingold 西德前 20 首例（德文維基）、Görl 與 Annie Lennox 相識經過（Electricity Club）、Tour de France 未趕上賽事與德國首張冠軍（研究 b）、Units「安非他命般的速度」為聲音描述保留、Tesis「節奏簡單、旋律好記」（西文維基）。Electric Cafe 盤名照卡池不帶重音。
