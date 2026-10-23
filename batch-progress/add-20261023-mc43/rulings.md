# add-20261023-mc43 裁定（情緒薄格策展線・冷冽：現代室內樂尖細二線＋mc4 續集）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 13 輪，本工作階段負責 mc43、md31。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc43 列，可擴寫 mc4 當代古典快而冷、現代獨奏作品），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x≥3.3、y≤0.2、z≤−0.3。
> 策展：`curation-mc43.json`（54 張）→ `master-mc43.json`（MB 回查 54/54 釘住、8 flag 皆為 artist credit 多掛作曲家，非撞）→ 主線汰 9（`master-override-mc43.json`）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-mc43-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。古典卡照 §0.7（mc32 先例）：artist＝演奏者／團體，盤名＝「作曲家: MB 正規名」，另帶 composer 欄；MB 只掛作曲家的盤（Dillon、Poppe《Interzone》、Nancarrow Vol.4）artist 照 MB 填作曲家。
> **預留：研究 a 21481–21490、b 21491–21500、c 21501–21510、d 21511–21520、e 21521–21530、鉤子 21531–21540、寫作 21541–21550、主線 21551–21560。**
---

## 主線策展（不佔條號）
- 策展 54 張（室內樂團 18、弦樂四重奏 14、獨奏與二重奏 13、鋼琴獨奏 6、人聲劇場 2、即時電子 1）全數 MB 釘住；moodGuess x 3.4–4.2、y −0.9～−0.2、z −1.9～−0.9。WebSearch 0 次。照 mc32 評分回饋優先收密集刮擦型（Lachenmann、Ferneyhough 系、Carter、Xenakis 系），少收極弱點描型。
- 去重：對 seed、全部 curation（含 mc32／mc4／mc40）0 撞；主線另對 origin 近 3 天所有 `claude/*` 分支 seed 與 10-22／10-23 卡單 0 撞；作曲家關鍵字對池再掃一次，無同演奏者同作品。Irvine Arditti《Caprices》mc40 已提，策展自撤。
- **主線汰 9**：
  - 同作品池中已有（mc32 同作品去重先例）：Berio Sequenza 兩套（Naxos《Sequenzas I-XIV》、Mode《The Complete Sequenzas…》；池有 EIC DG 版）、Ullén《Ligeti: The Complete Piano Music, Volume I》（池有 Aimard、Driver 的練習曲）、Pacifica《Carter: String Quartets nos. 2, 3 and 4》（池有 Arditti／Juilliard；留含第 5 號的《nos. 1 and 5》）、Nancarrow《Player Piano 5, Volume 3》（池有 1969 原錄音、MB 無日期；留 Vol.4）。
  - 能量貼邊（x 估 3.4，極弱／稀疏型評分常判靜）：Kwan《Haas: Trois Hommages》（微分音雙鋼琴偏催眠）、Arditti《Birtwistle: Complete String Quartets》、Diotima《Gervasoni / Pesson / Poppe》。
  - 色溫貼邊：Ensemble Recherche《Grisey: Vortex temporum / Taléa》（光譜派包覆，z −0.9）。
  - Saariaho 兩張（Descharmes 大提琴、Meta4 弦樂）x 估 3.4 貼邊，但是場景點名作曲家，留。

## 研究 b 組
- 21491　Aperghis《Works for Piano》（Hodges）：年份取 2009（Discogs／Europadisc／AllMusic 2009，錄音 2008-01；MB 2010-03-23 疑為 CD 上市日），yearVerified 2009。moodGuess 部分存疑：作曲家要求〈Les secrets élémentaires〉『不要彈得歇斯底里』，廠商文案強調『赤裸誠實、凝練』。
- 21492　Holliger《Lieder ohne Worte》：身分無誤（ECM 1618，1996-06 蘇黎世 Radio DRS 錄，1997-10-01 發行）。moodGuess 存疑：19 軌中 10 軌短於 3 分鐘，多為極弱短章；密集刮擦只有〈Trema〉（約 13 分鐘）。
- 21493　《The spectacular Heinz Holliger…》：編制與長度取自 NYPL 館藏紀錄（單一來源，Discogs 403）；並非全盤獨奏，有 Ursula Holliger 豎琴、Serge Collot 中提琴、Jürg Wyttenbach 大鍵琴／鋼琴參與的二、三重奏。年份 1970（MB／Discogs），NYPL 記荷蘭版 1971。聲音證據 thin，moodGuess『尖嘯、循環換氣』無來源。
- 21494　Holliger／Carter／Yun《Lauds and Lamentations》：ECM 1848/49 雙 CD（2001–02 蘇黎世）。moodGuess 一半成立：Carter 一碟機智尖細；尹伊桑〈Piri〉約 15 分鐘與慢樂章『幾乎飄浮』偏連綿，建議視為混合型。
- 21495　Diotima《Liturgia fractal》：Kairos 2009-06，2009-01-27～29 柏林錄音（錄音日期來源為搜尋摘要所引 Paladino PDF，我未能直接開啟，單一來源）。聲音證據僅〈Arborescencias〉一首現場樂評（開頭極弱、能量堆疊、安靜收尾），Kairos 頁面把曲名拼成 Aborescencias（誤）。moodGuess 部分存疑。
- 21496　Diotima《Simaku: Con-Ri-Sonanza》：無任何樂評或廠牌聲音描述（BIS 頁面不可開啟），只有樂章速度標示（Furioso、Vigoroso brutale 與 Adagio doloroso desolato、Calmo 交替）；moodGuess『一路高張力、無旋律』無法證實，status thin。
- 21497　Poppe《Chamber Music》：卡單 curatorRisk『取 ensemble mosaik』只部分成立：〈Tier〉是 Kairos Quartett、〈Rad〉是 Kobler／Surberg 兩位鋼琴家，mosaik 只演〈Holz〉〈Gelöschte Lieder〉。聲音查無第三方描述，『微分音、碎拍』無來源，thin。
- 21498　Poppe《Schrank》：編制混雜（虛擬 Hammond 電風琴、人聲獨唱 Wespe、鋼琴三重奏 Trauben、九人團體十一個極短樂章 Schrank、長曲 Salz），與『密集合奏、尖銳木管』預估有落差。發行年 MB 2012-06 對 Kairos 官網 2013-06，暫取 2012，uncertain。
- 21499　Michel-Dansac《14 Récitations》：**現場錄音**（Wien Modern 2001-11-16 首次完整演出，col legno 2006 出版，Discogs 明載 live recording），違反『只收錄音室正規專輯』，建議移除；若留，有『首度完整演出實況、Wien Modern Edition 第 1 號』的歷史定位，或改釘 Michel-Dansac 2016 Umlaut 錄音室版（未查 MB）。
- 21500　本組 WebSearch 用 3 次（Hodges、Posadas、Holliger 1970）；其餘靠 MB／Discogs API 與 WebFetch。Simaku、Poppe 兩張的聲音因額度用盡而 thin，如需補強請另派。
