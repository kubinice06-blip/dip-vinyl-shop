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
