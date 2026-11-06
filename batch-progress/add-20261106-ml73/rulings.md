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

## 研究 d 組
- 24151 Krusseldorf《From Soil to Space》：Igloo 樂評證實低速到中速、厚次低頻、dub、鋼琴旋律；首發 2011-10（Aleph Zero）屬實，Bandcamp 2018 為重發。moodGuess 存疑：x 偏邊界（〈The Cell〉急促次低頻擊點、〈Soe Doe〉中速繁複打擊，約 2.6–2.9），y、z 貼邊（部分曲目轉陰）。邊緣卡，full（10 條）。
- 24152 Lapa《Meeting of the Waters》：作者為 Ilya Goldberg，首張專輯，Loci Records；文案取 trip-hop 與 groove house，有鼓組與打擊領頭。moodGuess 存疑：x 偏躁（約 2.8–3.2）、y 貼邊（弦樂顫音琴偏輕）。聲音證據單源（作者文案＋聽眾評論），full（9 條）。
- 24153 monde ufo《Flamingo Tower》：MB 正規寫法 Monde UFO；Fire Records FIRE777，2025-03-07。森巴搖擺、陰鬱氛圍、旋律不明確的前衛取向。moodGuess 存疑：z 偏冷（−0.5 至 0.3）、x 可能 2.3–3.0；高風險，建議優先考慮汰換。full（9 條）。
- 24154 Fennec《Free Us of This Feeling》：⚠ 推翻策展層：卡單說 Ultimae 系 ambient，實為取樣 house 製作人（Magnetic Magazine「strong grooves、dancefloor」）。moodGuess 存疑：x 應 ≥ 3.0（方向：躁），不會落恍惚，強烈建議汰換。Bandcamp 自訂網域迴圈讀不到。full（9 條）。
- 24155 Charlie North《The Spaces In Between》：身分走 §1 人工；Wayback 取得 Bandcamp ld+json，確認 2008 年自發第二張、8 首、約 53 分、生成式音樂程式創作。聲音只有作者文案與 Digital Chill 一句引文。moodGuess 存疑：y 0.5 可能偏輕（空氣感氛圍，−0.3 至 0.6），若偏輕則落放鬆。full（9 條）。
- 24156 Macroblank《絶望に負けた》：MB 首發 2020-06-23、Bandcamp 官方頁 2020-09-17（Aloe City Wrld，NU-ACR060）；頁面無文案，僅標籤與留言，聲音（速度、鼓型）查無來源。moodGuess 存疑：x 可能偏躁（barber beats 含節拍成分，未能查證）。thin（8 條）。
- 24157 Zoungla《Entwine》：Costa Damoulianos（蒙特婁）首張專輯；只有作者文案可用，無樂評。moodGuess 存疑：x 約 2.3–3.0（文案寫 groovy）、z 偏冷（spooky／dark to bright）。thin（8 條）。
- 24158 本組 WebSearch 用 3 次（Krusseldorf、Lapa、Fennec）；Charlie North 透過 Wayback 讀得 Bandcamp，Fennec／Lapa 的聲音證據各僅一至兩個來源。

## 主線研究汰換（不佔條號；2026-11-06）
研究層交件後照各組「moodGuess 存疑」汰 26 → 剩 9；被汰卡移到 `dropped-cards.json`／`dropped-research.json`。**不補位**（卡單即策展結果）。分類：有拍推進 10、判冷 7、無聲音來源 3、判輕 5、身分／版本 1（一張多項時歸第一項）。
- Emancipator《Baralku》：有拍推進＋判輕：真鼓打擊、貝斯律動，小提琴長笛亮（研究 a）
- Alpha《The Sky Is Mine》：有拍推進：歌曲式 trip-hop、女聲主導，z 貼邊（研究 a）
- Nym《Lilac Chaser》：有拍推進：藝人自述 beat-driven，資料 thin（研究 a）
- AES Dana《Leylines》：判冷：自述 luminous darkness、cinematic，z 恐 <0.3（研究 a）
- Edamame《Bask》：雙軸貼邊＋thin：x 2.4–2.8、y 0.5–0.9（研究 a）
- Halina Rice《UNREALITY》：有拍推進：藝人自述與樂評皆指舞曲節拍驅動（研究 e）
- Dday One《Manu Propria》：資料極薄＋beat tape 鼓拍 x 恐 >2.7，聲音無來源（研究 e）
- Donovan Hikaru《Selected Moods》：判輕：vaporwave／lounge 乾淨質感、3 分鐘短曲，無厚霧證據（研究 e）
- Tryphème《Slowride》：有拍推進：trip-hop loop 鼓拍＋bass 吉他 riff，x 恐 2.8–3.0（研究 e）
- Swim Surreal《In the Half Light》：判輕：Zero 7 製作的人聲歌曲，y 約 0–0.4（研究 b）
- Helios《Domicile》：判輕：文案直述平靜合成器質地、無鼓，y 約 0.2–0.5；池中同人亦判輕（研究 b）
- Saafi Brothers《Mystic Cigarettes》：有拍推進：文案直述 bopping drums、bassy beats（研究 b）
- Circular《Substans》：判冷＋有拍：uplifting grooves、industrial clunks，z 恐 <0（研究 b）
- Hinkstep《A Generation Lost in Space》：判冷＋無聲音來源：太空音景加朗讀詩（研究 b）
- Koan《When the Silence Is…》：版本存疑＋判躁：2013 版 18 首 157 分含大量混音，MB 掛 progressive trance（研究 b）
- Evil Needle《Cirrostratus》：有拍推進：15 首 2.5 分鐘 beat tape，曲名 Disco Inferno 等（研究 b）
- Lab's Cloud《Connecting on a Deeper Level》：有拍推進：文案直述 driving mid-tempo beat、舞池段、psytrance 出身（研究 c）
- AK《Branches》：判輕：唯一來源稱 spacious and aerial，頁面讀不到（研究 c）
- Dreamstate Logic《Era3.I》：判冷：space ambient／psybient 太空意象（研究 c）
- PALLADIAN《Indaco》：判冷＋x 貼邊：melancholic／hypnotic 歌式 downtempo（研究 c）
- Dr. Toast《The Wave Function》：聲音無任何來源（頁面轉址迴圈），廠牌無佐證（研究 c）
- Fennec《Free Us of This Feeling》：有拍推進：實為取樣 house 製作人，樂評 strong grooves、舞池面向（研究 d 推翻卡單）
- monde ufo《Flamingo Tower》：判冷＋x 貼邊：森巴搖擺、陰鬱、旋律不明確（研究 d）
- Lapa《Meeting of the Waters》：有拍推進＋判輕：trip-hop／groove house、鼓組打擊領頭，弦樂顫音琴偏輕（研究 d）
- Zoungla《Entwine》：有拍＋判冷：文案 groovy、spooky（研究 d）
- Charlie North《The Spaces In Between》：判輕：y 估 −0.3–0.6，無鼓也無厚度證據（研究 d）
- 留下（9）：Carbon Based Lifeforms《Hydroponic Garden》、Delerium《Karma》、Photon《Image of Imagination》、MindSpring Memories《The Binary Ocean》、Krusseldorf《From Soil to Space》、Macroblank《絶望に負けた》、VANITAS命死《心の泉》、Veryan《One Universal Breath》、Ian Hawgood《Well, Here We Are》。其中聲音仍貼邊、交評分層判的：Carbon Based Lifeforms（z 約 0.3）、Krusseldorf（x 2.6–2.9）、Macroblank（無鼓型資料）、VANITAS命死（z 未決）、Ian Hawgood（y 略低）、Veryan（x 貼 2.7）。

## 鉤子層（a、c、d、e；24171–24180）
- **24171** 交件：`desc-tools/batches/hooks/add-20261106-ml73-hooks-a.json`（2）、`-c`（2）、`-d`（2）、`-e`（3），共 9 張，key 與順序照主線汰換後的研究稿；b 組研究稿 0 張，寫空陣列 `-hooks-b.json`（`[]`）讓 qa 不報缺檔。公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。thin 卡（Photon、MindSpring、Macroblank、VANITAS）上限 170，其餘 230。
- **24172** 逐筆預算／hook 加權（原始字元）：CBL 212／24（30）、Delerium 227／24（26）、Photon 162／18（18）、MindSpring 166／21（23）、Krusseldorf 201／21（21）、Macroblank 152／24（24）、VANITAS 170／22（25）、Veryan 213／15.5（17）、Ian Hawgood 199／24（24）。初稿 CBL 298、Delerium 292 等全數超標，整格捨去：CBL 的 Notch 團名、Protracker、里昂、曲長區間；Delerium 第九張、Lisa Gerrard、1994 邀女聲、影集配樂；MindSpring 雙卡帶、總長；Krusseldorf 第五張、自稱最受好評、Carolin Heath；Veryan 打擊推進、Cue Dot 之後的廠牌、義賣；Photon 地區、曲長。壓完回核：9 張 hook 依賴格全在 g1（MindSpring 的「占七成」曾被砍掉，已補回 g1）。
- **24173** 骨架歸屬（9 張 9 條）：CBL＝別人的一張唱片讓兩人轉向；Delerium＝為省授權費自錄合唱（錄音條件）；Photon＝曲名意象串成夜空；MindSpring＝兩首超長曲撐起全盤；Krusseldorf＝低頻重心＋古典鋼琴旋律（聲音構造）；Macroblank＝外語盤名的字面意思；VANITAS＝做完多年才放出的「遺失」專輯；Veryan＝喪親記憶化成曲名概念（太極）；Hawgood＝停擺與復健期間的創作。quiet details 兩張分面向：Veryan 只寫發行，Hawgood 寫「廠方稱最私人的一張」。hook 四型：懸疑（VANITAS、Hawgood）／斷言（Delerium、MindSpring、Veryan）／場景（CBL、Photon、Krusseldorf）／人物定調（Macroblank）。
- **24174** 同藝人舊卡避開（掃 `output/`、`hooks/`）：Photon《Escapism》用「曲長並排」骨架＋第二句「Photon 落腳賓州」→本張改曲名意象、第二句「在 Bandcamp 累積 39 張作品的 Photon」，不寫賓州。MindSpring《% 2 0》用「曲名語言＋取樣來源」＋第二句樂種領句＋芝加哥→本張走長曲，第二句改廠牌領句（No Problema Tapes）。Krusseldorf《Cloud Songs》用「經營暗氛圍廠牌的瑞典人另一名號」＋第二句「1977 年生於斯德哥爾摩」→本張不提 Cryo Chamber、不帶生年出生地，第二句用掛名欄（製作、演奏到封面）。Macroblank《Tales of the Cypher》用「卡帶廠牌＋日文失戀曲名」＋第二句「封面自己設計，他做 vaporwave 與 barber beats」→本張走盤名字義，第二句改廠牌關係（Aloe City 系）。CBL 池中舊卡《World of Sleepers》簡介不在 repo（只在 KV），已避 md41 Sync24「他也是 CBL 的一半／Leftfield 目錄號」與 ml69 Kalpataru Tree 的點名式提及；本張不帶 Leftfield。
- **24175** 第二句句型配表：CBL「X 與 Y 組成的瑞典雙人組」領句；Delerium「由…製作」；Photon「在 Bandcamp 累積…的」；MindSpring「替…發行的是…」；Krusseldorf「從…到…都掛…」；Macroblank「作品多交給…的」；VANITAS「地區標比利時的…自己發行」；Veryan「蘇格蘭音樂人 Veryan 某年在…推出」；Hawgood「經營 Home Normal 廠牌的英國環境音樂人」。「他／她」引入：Hawgood hook 只用「他」→第二句具名＋身分；Veryan note 首格用「她」→第二句具名；其餘名字或樂種直接領句。
- **24176** 「日」後一字：CBL 日首、Delerium 日由、Photon 日自、MindSpring 日編、VANITAS 日放、Veryan 日在、Hawgood 日交；Krusseldorf 只寫到月、Macroblank 只寫年（MB 與 Bandcamp 日期不一，發行年寫 2020）。開頭前四字 9 張互異，也與 ml68–72、md39–43 已有 hook 不同。
- **24177** n-gram 自查：本批 hook 間中文 4-gram 0；對 ml68–72／md39–43 已交 hook 掃到一條「撐起一整」（MindSpring 初稿對 md42 Melanie De Biasio），已改寫，複掃 0。hook 與 note 無逐字重複句。媒體名與榜名一律不進 hook／note（Krusseldorf 寫「樂評說」）。
- **24178** 正面表述：Hawgood「而非完全痊癒」被 crossgroup 標校對痕跡風險，改成只寫「抵達與接納」。逝者／健康題材：Veryan 父親過世、Hawgood PTSD 復健皆標「語氣克制」，屬與作品綁定的背景。時序：Delerium〈Silence〉1999 單曲、Krusseldorf 2018 重發皆標時序（作品流傳）。VANITAS 的 slushwave 慣例格（研究稿標推論）只指派「屬 vaporwave 分支」這一句。
- **24179** 腳本：`node qa-batch.mjs hooks add-20261106-ml73` 全部通過；`node chk-hook-crossgroup.mjs add-20261106-ml73` 全部通過（hook 加權 15.5–24，note 154–228）。

## 寫作層（writer-1；24181–24190）
- **24181** 交件：`desc-tools/batches/output/add-20261106-ml73-out-1.json` 9 張（full 5：CBL 217、Delerium 232、Krusseldorf 223、Veryan 223、Hawgood 181；thin 4：Photon 175、MindSpring 157、Macroblank 156、VANITAS 152）。初稿超標 3 張（CBL 253、Delerium 245、Krusseldorf 242），整格捨去：CBL 第二句的團名（卡片標題已顯示）與「一起／正式」、Delerium「兩年後的」、Krusseldorf 第二句改以「Krusseldorf 這張」領句；Hawgood 初稿 179 掉出 full 下限，把「抵達與接納」拆成兩個短句補回。
- **24182** 腳本：`qa-batch out` 全部通過、標記 0；`qa-check-research` 通過；`fix-spacing` 只報 VANITAS命死 一處（要在「VANITAS」與「命死」之間補空格）——那是本卡藝人欄原文，照 writer-base「本卡藝人名照卡單逐字」不套用 `--write`。轉述引導詞（據）grep 0；媒體名與榜名 0。
- **24183** 第二句領句全照鉤子層 24175；「日」後一字照 24176（CBL 日首、Delerium 日由、Photon 日自、MindSpring 日編、VANITAS 日放、Veryan 日在、Hawgood 日交；Krusseldorf 只到月、Macroblank 只寫年）。
- **24184** 自掃 han() 4-gram（本檔＋ml68–72、md40–42 已交 out）：本檔內 2 次以上 0 條。途中拆掉：`環境音樂`×2（CBL 改「改做 ambient」，Hawgood 的「環境音樂人」是指派句型照留）、`專輯年月日`×2（Delerium 日期句改由「教堂。」接、Veryan 改「整張」領頭）、`的合成器`×2（Photon 改「這類合成器」）、`這張專輯`×2（Macroblank 改「這一張走 vaporwave」）、`發行廠方`×2（Hawgood 去掉「發行」）。跨批另拆：`首加起來`、`長約分鐘`、`長達分秒`、`在年月日`、`作品年月`。剩 `與組成的`（CBL 指派句型「X 與 Y 組成的」，對 md40 2814、ml70 Desert Dwellers）與跨批日期殘片（`年月日由／自／在／放／交／首`，日後字由鉤子層配死、各批互撞屬結構性）未動。
- **24185** 第二句不複述 hook：CBL 原稿第二句重寫「姊姊帶回」，改成點名那張唱片是《Orgship》；Delerium 不重寫「比買授權便宜」，只補錄音地點西溫哥華；VANITAS 不重寫「2019 年初完成的遺失專輯」，改寫附詩；Veryan 不重寫「12 首」，只寫全盤約 65 分鐘；Hawgood 不重寫賣設備，接「當時正在接受 PTSD 的復健與諮商」。
- **24186** 性別：Photon、Macroblank 研究稿無性別，正文不用「他／她」（Photon 用「整張想捕捉」）；Veryan 依 facts 用「她」；Hawgood、Krusseldorf（Simon Heath）用「他」。
- **24187** Macroblank 的「留言者說它輕鬆」寫成「聽眾留言裡，它被形容成輕鬆、適合雨天開車的音樂」（被動，不具名）；desc4 兩張日文盤名、曲名照原文（〈寒い夏の夜〉〈悲嘆〉〈夜の森の湖〉）。

## 主線審稿（24191；2026-11-06）
- **24191** 逐張審 9 張（全文印出，逐句對研究稿 a／c／d／e；抽核 CBL 的 Solar Quest《Orgship》與 Hedberg 姊姊、Delerium 30 人合唱團進西溫哥華教堂比取樣授權便宜（維基引 Drop-D 訪談）、Krusseldorf 第一張交給以色列 Aleph Zero（Igloo）、Ian Hawgood PTSD 復健期（quiet details 藝人自述）、Veryan 太極招式曲名與父親過世（廠牌頁），皆有出處）。改 1 張 1 處（`desc-override.json`），研究／hooks／input 不需同步（只動措辭）：
  - `Macroblank|絶望に負けた`：「作品多交給 Aloe City 系廠牌的 Macroblank，」→「Macroblank 的作品多交給 Aloe City 系廠牌，」（原句主詞錯置，讀成廠牌名叫 Macroblank）。
- 媒體名、榜單名次、「據說／據傳」全批 0。`fix-spacing` 只報 VANITAS命死 藝人名內部，照卡池掛名不動。

## 主線試聽／封面／三軸（不佔條號；2026-11-06）
- 試聽：自動配對＋override 1（Photon §1 人工身分無 MB 曲目表，取 Apple us 1573411551，盤名、藝人、10 軌、日期與 Bandcamp 一致）→ ready 8／unavailable 1（Macroblank，Apple 查無）；`popular-preview manifest` 換成最紅那首 8 張。
- 封面：CAA release-group front 8；Photon（人工身分無 CAA）用 Bandcamp og:image 1200px（`covers.json`）。全批 HTTP 200，主線縮圖表目視與盤名相符。
- 三軸：機器基線（worker /album-rating，Last.fm listeners）；CBL《Hydroponic Garden》、Delerium《Karma》為藝人代表作，經典度上調 4（`ratings-override.json`，Karma 硬蕊 2）；冷門度照 §0.8.1 下限表無需上調。頂點 0（無殿堂共識、listeners 皆 ≥772 非遺珠、無異端證據）。

## 上線（2026-11-06，主線）（條號 24192）
- **24192**：上線 9 張：card_catalog 9／9、KV 11 鍵（含兩張 desc4 的 desc2 別名鍵）回讀逐字一致（stamp 20261106ml73）、seed +9、prepare／published gate 0 error（warning 皆 UPC 盡力而為與 Photon 人工身分）。寫入前 `git fetch` 確認 origin/main 無新提交；藝人介紹 ar-d-529（寫 3、不寫 VANITAS命死）同 PR 上線（`batch-progress/artist-intro/ar-d-rulings-ml73.md`）。

## 評分與落格（2026-11-06，主線）（條號 24193）
- **24193**：Opus 1 支照 `score500/BRIEF.md`（10-23 體感標準）打 9 張（`batch-progress/mood-axes/score-ml73/`，聲音依據讀研究稿），主線看過未改值。`build-priors` → `build-scale v0`（錨點 104/104）→ `build-card-moods`；`warm-batch` 7/9 有標籤，`build-genre-tree --pull --write`、`build-draw-covers --pull --write` 重建。
- **落格率 8/9**。出格：VANITAS命死《心の泉》z −0.1 落頹靡（研究稿無聲音描述，評分貼 0 猜）。
