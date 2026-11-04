# ax6 策展補充（異端：卡池沒有的藝人；2026-11-04）

先完整讀 `batch-progress/apex-new-20261104/CUR-DISPATCH-AX.md`（格式、去重、身分、證據規矩照它），再照本檔。本檔與它衝突時以本檔為準。

## 這一批要什麼

- 全部是 **異端 heresy 候選**（`apexTier: "heresy"`）。標準照 `batch-progress/apex-new-20261104/RES-APEX.md`「標準」段：**整張**難入耳（尖叫式吹奏、無節拍、集體噪音、無調、反結構、超長篇、不停歇的循環換氣、噪音牆），而且要有**可信資料**（樂評、專書、The Wire、AllMusic／Pitchfork／Quietus／Dusted／Free Jazz Collective／Point of Departure、廠牌說明、有引註的維基）用 harsh／abrasive／extreme／ferocious／relentless／unlistenable／brutal／uncompromising 之類的話描述它，或把它列為該場景最極端的代表作。**聽得下去的作品不收**（有旋律主題、搖擺律動、抒情段落為主的不行）。
- **店主 2026-11-04 撤銷「不收能量型自由爵士」**：自由爵士／自由即興中高強度、無調、噪音化的代表作可以收。
- **只收卡池裡完全沒有任何卡的藝人。** 每位候選先跑：
  ```
  node batch-progress/add-20261104-ax6/chk-artist.mjs "藝人原文名" "別名" "羅馬拼音" "團名"
  ```
  輸出必須是 `0`（或只剩明顯的假陽性，例如 Love 對 Paul Lovens；假陽性寫進 `uncertain`）。有卡就換人——卡池裡的藝人歸另一個工作階段（ax5）。
  **例外（店主點名必收）**：Peter Kowald Quintet《Peter Kowald Quintet》（1972 FMP，ax6a 負責）；姜泰煥／강태환（ax6b 負責，挑卡池沒有的、最能代表他極端吹奏的一張；卡池已有《소리 (Sorefa)》一般卡、《Korean Free Music》流亡卡，這兩張不能再提）。
- **不收美國自由爵士**（ax5 負責）。美國以外的樂手領銜、或跨國團體以歐洲／日本為基地的可以。
- 同一位藝人只提一張；團名與團員個人名義算不同藝人鍵，但如果團名裡含有卡池已有藝人的名字（例：Caspar Brötzmann Massaker、高柳昌行ニュー・ディレクション・ユニット）一律不提。
- ax1／ax2 研究層已判 none 或汰掉的不要再提（看 `batch-progress/mood-cells-20261022/curation-ax1*.json`、`curation-ax2*.json` 與 `batch-progress/add-20261104-ax1/rulings.md`、`-ax2/rulings.md`）。
- 只收正規專輯（MB primary-type Album）；現場盤若是該團最重要、最極端的錄音可以收，寫進 `releaseException`。合輯、EP、單曲不收。

## 分組

| 組 | 方向 | 提名 |
|---|---|---:|
| ax6a | 歐洲自由爵士／自由即興：FMP、Incus、ICP 周邊、Po Torch、Emanem、北歐、東歐、義大利、法國、英國（SME 已在卡池）。**必收 Peter Kowald Quintet**（1972 FMP；MB 版本鎖定照 MB 首發）。可考慮的方向（逐位跑 chk-artist）：Globe Unity Orchestra、Willem Breuker Kollektief 早期、Iskra 1903、Rüdiger Carl、Sven-Åke Johansson、Paul Lovens、Paul Lytton、Gruppo di Improvvisazione Nuova Consonanza、People Band、King Übü Örchestrü、Wolfgang Fuchs、Gunter Christmann、Frode Gjerstad、Paal Nilssen-Love、Peter Brötzmann 周邊的 FMP 名作（但不可是 Brötzmann 掛名） | 18 |
| ax6b | 歐洲以外的自由爵士／即興與聲音實驗：日本（高木元輝、近藤等則、原田依幸、生活向上委員会、翠川敬基、Group Ongaku、小杉武久、タージ・マハル旅行団 這類；阿部薫、高柳昌行、富樫雅彦、沖至、山下洋輔、吉沢元治、豊住芳三郎 已在卡池不可提）、**韓國必收姜泰煥一張**、南非流亡樂手（多數已在卡池，查不到就照實少提）、拉美、中東、大洋洲。onkyo／lowercase 只收有可信資料說它極端（極端靜默、極端音量、極端長度）的 | 16 |
| ax6c | 極端金屬的反結構作與超長篇 drone：war metal／bestial black metal（Blasphemy、Revenge、Conqueror、Beherit、Sarcófago、Bestial Warlust、Black Witchery 這類）、noisegrind（Anal Cunt、Gore Beyond Necropsy、Sete Star Sept 這類）、raw black metal 極端作（Ildjarn 這類）、funeral doom／drone doom 最極端的（單曲一小時級、極慢）、數小時級的 drone 與超長篇（Leif Inge、Bunkur、Organum 這類）。一般碾核、技術死亡金屬、聽得下去的 doom 不收 | 18 |
| ax6d | 激進 musique concrète、聲音詩、極端現代音樂與電子音樂的代表錄音：Åke Hodell、Bernard Heidsieck、Gil J Wolman、Mauricio Kagel《Acustica》、Dieter Schnebel《Maulwerke》、Vinko Globokar、Robert Ashley《The Wolfman》、Brian Ferneyhough、İlhan Mimaroğlu、Gottfried Michael Koenig、Konrad Boehmer、Francisco López 這類（逐位跑 chk-artist）。古典卡照卡池慣例：artist＝演奏者（作曲家自演就寫作曲家），album＝「作曲家: 作品」或原盤名，另填 `composer` 欄 | 16 |

## 規矩

- WebSearch **每組最多 8 次**（整個工作階段共用 200 次）。多用 MB API、Discogs API、維基 raw、WebFetch 讀樂評頁。
- 任何 HTTP 請求的 User-Agent 一律 `dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，不得含 email。
- 照 `batch-progress/apex-new-20261104/RES-RULES-CLOUD.md`：不要 cd 到工作目錄以外，Bash 指令保持單純。
- **每做完 3 張就寫進輸出檔**；輸出檔已有內容就讀進來接續補完，不要重寫。
- `why` 要寫出極端的具體特徵（多長、怎麼吹、有沒有拍、編制）＋可信出處是誰；`apexWhy` 一句話。
- 不要 git add／commit，不改其他檔案。
- 回報 10 行內：張數、MB／人工身分各幾張、哪幾張依據偏薄。
