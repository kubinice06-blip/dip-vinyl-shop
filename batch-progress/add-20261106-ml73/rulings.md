# add-20261106-ml73 裁定（情緒薄格策展線・恍惚 Bandcamp downtempo 候選第二輪）

> 店主 2026-11-06「繼續」：第一輪（ml68–70、md39–41）後，剩下靠近邊界的 612 張先照第一輪教訓過濾掉舞池節拍標籤等 → 232 張，切成 ml71／ml72／ml73、md42／md43，三個工作階段並行（本工作階段 ml73＋md42；另兩個做 ml71＋ml72、md43）。來源見 `batch-progress/bandcamp-dt-20261105/README.md`；卡單 `pick-ml73.json`（51 張）。**卡單即策展結果**，不派策展代理；主線組 `curation-ml73.json` → `build-master.mjs ml73` → `master-ml73.json` → 卡單。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜＋重＋暖，邊距 x≤2.7、y≥0.8、z≥0.3**。
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml73-cards.json`（35 張；研究 a 7、b 7、c 7、d 7、e 7）。身分：MB 釘住 33、§1 人工 2（Photon《Image of Imagination》、Charlie North《The Spaces In Between》）。
> **預留：研究 a 24121–24130、b 24131–24140、c 24141–24150、d 24151–24160、e 24161–24170、鉤子 24171–24180、寫作 24181–24190、主線 24191–24200。**
---

## 主線策展（不佔條號；2026-11-06）
- 卡單 51 張：去重（`dupchk.mjs`：seed、所有 manifest、`data/pool-removed.json`、所有 curation）撞池 0；撞到舊提名 1（Ishmael Ensemble，ml67 研究稿 thin 被汰）。卡單 moodGuess 是只看 Bandcamp 標籤的粗估、多半 low／mid 把握、而且本輪靠近邊界，**聲音交研究層判**。
- 同藝人上限：並行三個工作階段的卡單（ml71／ml72／md43）與第一輪卡單一起查同藝人，凡池中已 ≥2 張或並行卡單另有 ≥2 張者，本線最多收一張；同一位藝人在 ml73 與 md42 兩批也合計不超過兩張。
- MB 逐張回查（search → release-group → releases 的曲數、日期、廠牌）＋ Bandcamp 頁 `ld+json`（Bandcamp 自訂網域的 9 張頁面被網路政策擋，交研究層用 WebFetch 補）。名稱照 MB 正規名（emancipator→Emancipator《Baralku》、AES DANA→AES Dana《Leylines》、The Sky is Mine→Alpha《The Sky Is Mine》、In The Half Light→Swim Surreal《In the Half Light》、CIRCULAR→Circular《Substans》、A Generation Lost In Space→Hinkstep《A Generation Lost in Space》、When The Silence Is...→Koan《When the Silence Is…》、LAB'S CLOUD→Lab's Cloud《Connecting on a Deeper Level》、Meeting Of The Waters→Lapa《Meeting of the Waters》、free us of this feeling→Fennec《Free Us of This Feeling》、ian hawgood；well, here we are→Ian Hawgood《Well, Here We Are》）；池中已有的藝人照池中寫法。年份照 MB first-release-date（AES Dana《Leylines》2009、Hinkstep《A Generation Lost in Space》2016、Krusseldorf《From Soil to Space》2011）。
- **主線汰 16**：
  - Ishmael Ensemble《Visions Of Light》：先例已汰：ml67 研究稿 thin、聲音無來源被汰
  - Delerium《Poem》：同人超量：Delerium 本線收《Karma》一張，並行 ml71／ml72 另有三張
  - Delerium《The Essential Silence (feat. Sarah McLachlan)》：非正規專輯：〈Silence〉單曲的混音合集
  - Carbon Based Lifeforms《The Path》：同人超量：CBL 本線收《Hydroponic Garden》一張，並行 ml71／ml72／md43 另有五張
  - Shpongle《Nothing Lasts...But Nothing Is Lost》：同人超量＋判躁風險：池中 2 張、並行 ml72 再 2 張；池中《Are You Shpongled?》x 3.2
  - AES DANA《Aftermath 2.0 | Archives of peace》：重發改版（2.0／Archives 系列）＋同人超量（AES DANA 本工作階段收兩張）
  - The Saxophones《Eternity Bay》：先例：池中同人《Songs of the Saxophones》y −0.9、ml68 評分判輕落放鬆
  - Krusseldorf《Fractal World》：同人超量：池中 1、並行 ml72 1，本線只收《From Soil to Space》
  - Bluetech《Holotrope》：同人超量：池中 3 張、並行 ml71 再 2 張
  - JAMES MURRAY《Eyes to the Height》：同人（James Murray）本工作階段收 md42《Weeds》；卡單粗估中性偏冷，不合恍惚
  - Tolouse Low Trax《Jumping Dead Leafs》：粗估 x 2.8 出邊距、部落感鼓推進
  - State Azure《Light Span》：同人超量＋池中同人兩張皆判冷（z −0.2／−0.7）；並行三批另有 4 張
  - State Azure《Loom》：同上
  - Solar Fields《ORIGIN - Shaped By Time》：40 軌 309 分鐘的套裝／系列合集，非單張專輯
  - Anthemics《Khemia》：MB Album＋Soundtrack（原聲帶）
  - Good Weather For An Airstrike《suspended animation》：Bandcamp 文案直述 gentle／sleep aid／piano fragments（判輕風險），且 MB 查無

## 研究 a 組
- 24121：Emancipator《Baralku》聲音判為有真鼓與打擊的有機 trip-hop、小提琴長笛為主、質地輕亮，預估 x 約 2.9–3.2、y 約 0.2–0.4，大概率不入恍惚；notes 標「moodGuess 存疑」，建議主線評分後汰換。
- 24122：Alpha《The Sky Is Mine》卡單寫「環境音景」不符，實為歌曲式 trip-hop（有拍子、女聲主導），x 預估 2.5–2.9、z 貼邊 0.2–0.4；年份取 MB 2007（Wikipedia 發行日 09-18，MB 09-03，年不變）。
- 24123：Nym《Lilac Chaser》與 Edamame《Bask》Bandcamp 自訂網域重導迴圈讀不到（nymself↔ratsofnym、gravitasrecordings↔bandcamp），改用 MB、WebSearch 各 1 次（共 2 次）與樂評；兩張 status thin，聲音證據弱。Nym 自述 beat-driven，x 存疑；Edamame 偏暖但 x、y 貼邊。
- 24124：AES Dana《Leylines》自述 luminous darkness、cinematic，z 恐 <0.3（moodGuess 存疑：偏冷）；Carbon Based Lifeforms《Hydroponic Garden》與 Delerium《Karma》大致成立（CBL z 貼邊 0.3，Karma z 偏暖 0.5）。未推翻策展層身分／年份／廠牌。Nym 的 MB 無廠牌（卡單 label 空）。

## 研究 e 組
- 24161：Halina Rice《UNREALITY》：藝人自述與 EDM Junkies、MusicRadar 皆指舞曲節拍驅動、『讓人想動』，聲音屬舞池電子，moodGuess x 1.9 嚴重偏低（應 ≥3.0）。建議主線汰換。
- 24162：Dday One《Manu Propria》：官網頁與 Bandcamp 互相轉址、無法抓取，僅 MB 與零售頁，facts 4 條 thin；卡單類型含 hiphop，『取樣製作人』說法來自未開啟的搜尋摘要不入 facts，路數有鼓拍，x 可能 >2.7。建議汰換或交評分層實聽。發行日 MB 為 2022-02-25，零售摘要為 2022-11-03，採 MB。
- 24163：Donovan Hikaru《Selected Moods》：Bandcamp 地區為多倫多、Tobira 稱加州，facts 與寫作層不寫產地。聲音只有標籤與短曲長，y 0.5 存疑偏輕（vaporwave／filmscore／lounge 乾淨質感）。
- 24164：Veryan《One Universal Breath》：廠方明寫 sub-weight 厚、旋律性、打擊樂『有時』推進；x 存疑偏低（1.2→約 2.3–2.8，貼邊距）。
- 24165：Tryphème《Slowride》：trip-hop loop 鼓拍＋bass 吉他 riff＋MBV 系糊，屬有拍沒攻擊性；x 2.5 可能到 2.8–3.0（偏躁），z 未決。
- 24166：VANITAS命死《心の泉》：無任何聲音描述，只有 slushwave 標籤與 9 首長曲（均長 8 分）；無鼓證據，z（暖冷）未決，曲名一首含『冷』。thin。
- 24167：Ian Hawgood《Well, Here We Are》：廠方與藝人自述一致，電聲＋田野錄音＋drone，無鼓；最合 ml，y 0.6 略低於邊距待評分層確認。

## 研究 b 組
- 24131 Swim Surreal《In the Half Light》：只有標籤與文案，無樂評；Zero 7 製作的有人聲歌曲，推論 y 偏輕（約 0～0.4）、較像放鬆。status thin，moodGuess 存疑（y 偏低）。
- 24132 Helios《Domicile》：廠牌文案直述平靜合成器質地、無結構堆疊、背景音樂；無鼓。判 y 約 0.2～0.5，邊緣放鬆／恍惚，moodGuess 存疑（y 偏輕）。
- 24133 Saafi Brothers《Mystic Cigarettes》：文案直述 bopping drums、bassy beats、drum trills，每首 7–14 分鐘；判 x 約 2.5～3.0，擦邊沸騰，moodGuess 存疑（x 偏躁）。年份 MB 1997-11 對 Bandcamp 1997-01-11，採 MB。
- 24134 Circular《Substans》：文案有 uplifting grooves、industrial clunks，影響來源 Boards of Canada／Biosphere；x 可能 2.0～2.8，z 可能 <0，moodGuess 存疑（偏冷）。status thin。
- 24135 Hinkstep《A Generation Lost in Space》：無聲音描述，太空音景＋朗讀詩，z 可能偏冷，moodGuess 存疑（偏冷）；年份 2016 照 MB，2023 為 Nebulosa 實體版。
- 24136 Koan《When the Silence Is…》：MB／Bandcamp 的 2013 版是 18 首含大量混音、157 分鐘的擴充版，原專輯疑為 2009 年《When the Silence Is Speaking》（PsyNews、Sputnik 標 2009，Apple 標 2010），原始首發年未證實；MB 另掛 progressive trance，x 可能偏躁。建議主線考慮汰換。
- 24137 Evil Needle《Cirrostratus》：15 首平均 2.5 分鐘的 beat tape，曲名暗示鼓點與律動；Cold Busted 網址互相轉址、WebFetch 讀不到；判較像放鬆或雀躍邊緣，建議汰換。

## 研究 c 組
- 24141 Lab's Cloud《Connecting on a Deeper Level》：Bandcamp 文案直述標題曲 driving mid-tempo beat、Mental Vortex 偏舞池、Natural Potential 有 Shpongle 式律動，出身 psytrance；moodGuess 存疑（x 偏躁，約 3.0，出恍惚邊距）。status full（10 條）。
- 24142 Photon《Image of Imagination》：無樂評、只有標籤（chillsynth／dreamwave／downtempo）與一句文案，聲音靠推論（靜、暖可能，重不明）；策展層的「Ultimae 系」Bandcamp 頁無此事，不寫。身分 §1 走 photon2 子網域，發行者 Photon。thin（8 條）。
- 24143 AK《Branches》：自訂網域與 bandcamp.com 互轉址，頁面讀不到（曲目、廠牌皆缺）；唯一聲音來源是單曲樂評「spacious and aerial、Boards of Canada」，moodGuess 存疑（y 偏輕）。Lana Del Rey 事件單一來源不寫。thin（6 條）。
- 24144 MindSpring Memories《The Binary Ocean》：136 分是 Bandcamp 九首正規總和（兩首各約 50 分），非加碟；slushwave 糊濾波屬標籤推論，無樂評；與 moodGuess 相符，不推翻。thin（8 條）。
- 24145 Dreamstate Logic《Era3.I》：七首各約 9.5 分、標 space ambient／psybient；無樂評；moodGuess 存疑（z 偏冷，太空意象；若有穩定拍子 x 也可能偏高）。MB 2020-01-07、Bandcamp 01-11 差四天，寫 2020 年 1 月。thin（8 條）。
- 24146 PALLADIAN《Indaco》：標籤 melancholic／hypnotic，曲短（3–5 分）有兩位客座，傾向歌式 downtempo；moodGuess 存疑（z 偏冷、x 可能 2.3–2.8）。thin（9 條）。
- 24147 Dr. Toast《The Wave Function》：自訂網域轉址迴圈讀不到；聲音資訊完全未取得，卡單 label「False Profit Records」查無佐證不寫；moodGuess 存疑（無從判），建議汰換。thin（4 條）。
- 24148 本組 WebSearch 用 3 次（AK、Dr. Toast、Dreamstate Logic），皆無整張專輯樂評；Photon、PALLADIAN、MindSpring 未搜。
