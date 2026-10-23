# add-20261023-mc36 裁定（情緒薄格策展線・冷冽：no wave／薄而尖的 noise rock＋Downtown 即興／skronk）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 9 輪，本工作階段負責 ml43、mc36（評分照 10-23 體感標準）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc36 列；可擴寫：Downtown NYC 即興／skronk、尖細 no wave 後裔、EAI 尖細型最多 8 張），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x≥3.3、y≤0.2、z≤−0.3。
> 策展：`curation-mc36.json`（39）→ 主線汰 7（`master-override-mc36.json`）→ `master-mc36.json`（MB 回查 32/32 釘住、人工 0；flag 1 見下）→ `pick.json`（32）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-mc36-cards.json`（32 張；研究 a–d 各 7、e 4）。身分：MB 釘住 32、§1 人工 0。
> **預留：研究 a 19641–19650、b 19651–19660、c 19661–19670、d 19671–19680、e 19681–19690、鉤子 19691–19700、寫作 19701–19710、主線 19711–19720。**
---

## 主線策展（不佔條號）
- 策展 39（no wave 本體＋東京 6、Downtown 即興／skronk 19、尖細 no wave 後裔 14）；EAI 0（留給 mc37）。moodGuess 全過邊距（x 3.4–4.3、y −1.2～+0.2、z −1.9～−0.9）。
- **no wave 本體幾乎沒有正規專輯**：DNA、Teenage Jesus、Theoretical Girls、Branca 早期、Sonic Youth 首作都是 EP 或彙編；Mars 只有《John Gavanti》。池中 no wave 多判重落暴躁（Branca《The Ascension》y 2.0、SY《Confusion Is Sex》y 2.0、Contortions《Buy》y 0.6），落冷冽的只有 Phew《Phew》、Erase Errata《Other Animals》→ 策展改以乾、尖、原聲或乾淨吉他的 Downtown 即興與後裔為主。
- **主線汰 7**：Ut《In Gut's House》（y 0.2 貼邊、雙吉他破音）、The Scissor Girls ×2 與 Lake of Dracula（破音吉他＋鼓，y 貼邊，同 mc2 判重先例）、Storm and Stress《Under Thunder and Fluorescent Light》（留白多，x 貼邊）、Christian Marclay《More Encores》（可辨旋律片段，z 恐回暖）、Ahleuchatistas《On the Culture Industry》（同人三張勻量）。
- 掛名：《Yankees》主名 Derek Bailey, George Lewis & John Zorn（Bailey 為 mc28 藝人）、《Attention Span》主名 Ostertag（Frith 為 mc33 藝人），都是三人共同署名作、池中無，收。
- **MB flag**：Mars & DNA《John Gavanti: An Operetta》MB release-group 無日期與廠牌；年份照維基 1980（Trouser Press 記 1981），研究層核對。
- 跨工作階段去重：對 origin 近三天 60 個 `claude/*` 分支的 seed＋卡單＋curation 去重 0 撞。

## 研究 e 組
- 19681 Fresques sur les parois secrètes du crâne 的 label／country 推翻：Sickroom（2004）重發的是同名首作，Fresques 首發是法國 Ruminance RUM018（2003-01-21，Discogs），MB 另記美國 Frenetic FR016；建議 label 改 Ruminance、country fr。
- 19682 Ahleuchatistas《The Same and the Other》label 推翻：Cuneiform 不成立，首發 Noreaster Failed Industries nfi-007（2004），Tzadik TZ 8047 為 2008 重發。
- 19683 Ahleuchatistas 兩張都是吉他／貝斯／鼓三人團（Discogs 演奏名單），Discogs 標 Noise／Punk，吉他音色無來源：moodGuess 存疑（重／躁風險），建議試聽。Cheval de Frise 兩張無貝斯，樂評提「黑暗金屬」但無失真牆證據，Fresques 僅標弱存疑。
- 19684 Cheval de Frise 首作卡單 label 空白，可填 Sonore（SON-10，2000，法國）。
