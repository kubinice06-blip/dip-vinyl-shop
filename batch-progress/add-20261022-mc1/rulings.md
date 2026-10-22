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
