# add-20261023-ml45 裁定（情緒薄格策展線・恍惚：rocksteady／early reggae 慢歌＋lovers rock 剩餘）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 9 輪，本工作階段負責 ml42、ml45；店主同日「恍惚可以多增加一點 downtempo 與 dub 這類的」。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml45 列），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml45.json`（25 張）→ `master-ml45.json`（MB 回查 24 釘住、人工 1、flag 4）→ 主線全收 → `pick.json`（25）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml45-cards.json`（25 張；研究 a–e 各 5）。身分：MB 釘住 24、§1 人工 1（Delroy Wilson《Worth Your Weight in Gold》，MB 只有 1978 同名單曲）。
> **預留：研究 a 19561–19570、b 19571–19580、c 19581–19590、d 19591–19600、e 19601–19610、鉤子 19611–19620、寫作 19621–19630、主線 19631–19640。**
---

## 主線策展（不佔條號）
- **主場景是半個死池**：主線先查池中三軸——rocksteady／60s–70s 初 reggae 與 lovers rock 幾乎全落放鬆（Alton Ellis 三張 y −0.4～−0.6、Ken Boothe −0.6／−0.8、Phyllis Dillon −0.8、John Holt《1000 Volts》−0.8、Paragons、Melodians、Heptones 同名、Bob Andy、Hopeton Lewis、Marcia Griffiths、Carroll Thompson、Janet Kay 全負）；落恍惚的只有低頻厚、濕混音的（Heptones《Party Time》y 1.2、Gregory《Cool Ruler》0.8、John Holt《Police in Helicopter》0.8、Horace Andy 70s 末–80s 0.9–1.5）。策展照此只收 rocksteady 歌手**後期的濕混音慢板盤**（Junjo／Roots Radics、Channel One、Tubby／Jammy、showcase／disco mix）與 rocksteady 復興盤，乾淨明亮的 60 年代 Treasure Isle／Studio One 原錄音一張不收。
- 策展 25 張（目標 54，主場景見底照實交）：rocksteady-wet 16（John Holt 7、Delroy Wilson 2、Horace Andy 2、Justin Hinds、Johnny Osbourne、Wailing Souls、Cornell Campbell、Alton Ellis）、rocksteady-revival 7（The Frightnrs 3、Cornell Campbell 2、Jah Wobble 合作盤 2）、lovers-dub 2（Hollie Cook dub 版 2）。moodGuess x 2.3–2.6、y 0.9–1.3、z 0.8–1.3。
- **flag 4 張裁定**：Johnny Osbourne《Never Stop Fighting》（MB 首發日 2010、原盤 1982 Greensleeves）、Wailing Souls《On the Rocks》（MB 1997、原盤 1983）——MB release-group 只掛了再版，年份照原盤首發年，收。Hollie Cook《Prince Fatty Presents Hollie Cook in Dub》《Happy Hour in Dub》MB 為 Album＋Remix：原製作人做的 dub 版伴奏專輯是 reggae 的正規專輯形式（池中 In Dub Conference、Bob Andy's Dub Book 先例；Remix 次類型先例 mc11 Kraftwerk《The Mix》），收。
- 去重：seed 0 撞；ml1 提過被汰的盤未重提；對 origin 前 60 個 `claude/*` 分支 seed 與卡單、本工作階段 ml42 卡單 0 撞。
- 研究層重點查 y：Alton Ellis《A New Day》、Delroy《Go Away Dream》、John Holt《My Desire》只有製作證據；The John Holt Showcase 是否 flying cymbal 輕快鼓型；Frightnrs《Nothing More to Say》仿 Studio One 可能偏乾；Jah Wobble 兩張 Cleopatra 企劃盤只有廠牌文案。

## 研究 d 組
- 19591：Alton Ellis《A New Day》查無聲音樂評，只有 Discogs 製作證據（Channel One 錄、Roots Radics、長笛）；notes 標 moodGuess 存疑（y 無證據）。〈Why Birds Follow Spring〉為 1960s 舊歌重錄（6:04）。
- 19592：Cornell Campbell《Rock My Soul》身分一致；9 首中 5 首 dub，聲音僅憑名單與曲目，標 moodGuess 存疑（現代英國錄音厚度未知）。
- 19593：Cornell Campbell meets Soothsayers《Nothing Can Stop Us》PBS FM 評「開闊明亮、upbeat、Afrobeat 銅管」，只有結尾一首 dub outro；標 moodGuess 存疑，建議主線考慮汰換。
- 19594：Horace Andy & Jah Wobble《Timeless Roots》發行日來源衝突（Discogs／MB 2024-09-27，Soundshelter 8-8），年份 2024 不變；翻唱含輕快曲，標 moodGuess 存疑。
- 19595：Ken Boothe & Jah Wobble《Old Fashioned Ways》僅廠牌文案，Rough Trade 頁被 Cloudflare 擋；status thin，12 首多為 3 分鐘上下，標 moodGuess 存疑。

## 研究 e 組
- 19601　Frightnrs《Nothing More to Say》：樂評一致是明亮輕快的 sun-splashed rocksteady，無低頻／殘響證據，標 moodGuess 存疑（y 恐為負）；身分與年份（2016-09-02、Daptone）無誤。
- 19602　Frightnrs《More To Say Versions》：Axelrod 自混整張 dub，但無任何評論描述聲音，status thin；限量張數 Discogs 2000／Groovement 3000，兩者並陳。
- 19603　Frightnrs《Always》：年份 2022-05-27（Wikipedia Daptone 條寫 2023 為誤）；GRAMMY.com「sparse quality of dub」為唯一聲音證據。
- 19604　Hollie Cook《…in Dub》：Remix 次類型確認是原製作人 Prince Fatty 自己的 dub 版，收錄成立；DIY 有重低音、強殘響旁證，moodGuess 成立。
- 19605　Hollie Cook《Happy Hour in Dub》：查不到誰混（Discogs 製作名單 Ben McKone、Luke Allwood、Hollie Cook），不寫混音者；聲音僅有宣傳稿，thin，建議實聽。

## 研究 a 組
- 19561　Holt《Sweetie Come Brush Me》：身分與年份（Volcano Vol-001、1982）成立；Channel One 錄混、Junjo 製作、Radics 署名皆有 Discogs 證據；英國 Creole 版《Gold》曲序不同，已寫入 facts。「殘響濕、低頻厚」無樂評證據，moodGuess 存疑（僅製作間接證據）。
- 19562　Holt《For Lovers and Dancers》：Trojan TRLS 223、1984 吻合；Discogs master 年份為 0，以 MB 為準。只有署名（Radics、Sylvan Morris 錄、Blackbeard 混），無樂評，status thin，moodGuess 存疑。Blackbeard 署名為 Rodguel Sinclair，單一來源，不展開。
- 19563　Holt《Just the Two of Us》：Channel One 1982 年 3 月錄配混，製作人是 David White（策展層未提）；Radics 全班署名。無樂評，moodGuess 存疑（速度與低頻為推定）。
- 19564　Holt《A1 Disco Showcase》：Discogs 備註節奏在 Channel One 錄、混音與 dub 在美國 Blank Tapes 由 D. Spear 做（非牙買加 Tubby／Jammy）；全盤 41 分鐘，六首 5:57–8:17。年份採 1980（Wikipedia 1981 不採）。moodGuess 存疑：dub 長度、殘響量與拍子不明，Sly & Robbie 的 rockers 拍恐較輕快。
- 19565　Holt《The John Holt Showcase》：策展層「六首各接 dub 長版」查無證據（Discogs 僅六首、無時長、無 dub 標示）；製作署名 The Now Team，封面 Bunny Lee。moodGuess 存疑：1977 Bunny Lee 製作，flying cymbals 輕快鼓型風險高，建議主線汰換或降先序。

## 研究 c 組
- 19581　Cornell Campbell《Boxing》：身分、年份、廠牌（Starlight SDLP 908、1982）成立；Discogs 盤註 Channel 1 錄、Tubby's 混與配唱，Bunny Lee 製、Jammy 混。聲音無樂評；曲目有 Gorgon 時期標題（〈The Gorgon Is Back〉〈Natty Dread〉），維基稱 Gorgon 期是 Santa Davis flying hi-hat，moodGuess 存疑（可能輕快）。維基說〈Boxing〉熱門單曲是 Joe Gibbs 製，與本盤製作人不同，寫作層勿混。
- 19582　Delroy Wilson《Go Away Dream》：身分成立（Black Music BMLP 803、1982）；reggae.be 證實 1982 年 5 月 Tubby's 剛錄完、Jammy 在場。全盤 12 首情歌，無 dub 段（dub 版在《Dubbing In The Backyard》）；鼓手同列 Sly 與 Santa Davis，Discogs 標 Lovers Rock，moodGuess 存疑；策展層『靈魂翻唱』無來源，不寫。
- 19583　Delroy Wilson《Worth Your Weight in Gold》：人工身分成立（Burning Sounds BS 1060、1984）；Discogs master 備註：原錄音 1969–1978、Gussie Clarke 處理成延長版，六首 6:31–9:55 約 48 分鐘。推翻策展層『1984 Sly & Robbie 偏乾淨』的前提：樂手是 70 年代末錄音的延長，Discogs 標 Dub，但維基稱 Clarke 追求光滑與 discomix，速度與鼓型無來源，moodGuess 存疑。
- 19584　Horace Andy《Sings for You and I》：Discogs 兩個 1978 版（牙買加 Total Sounds《…Yours》、美國 Clocktower《…I》）皆標 Compilation，三位鼓手兩位貝斯手並列，本質是 Bunny Lee × Tubby 彙編；仍保留（1978 同期原版、有定位），status thin。Santa Davis／Benbow 在列，flying cymbals 風險，moodGuess 存疑。維基列的 Striker Lee 1985 版是另一盤。
- 19585　Horace Andy《Showcase》：身分成立（Tad's TRD LP 52880、1980；維基 1984 Vista Sounds 為另版，年份採 1980）。**推翻策展層『人聲接 dub』**：Discogs 三版皆為十首人聲曲，dub 要到後來 Deluxe Edition 才首度出現。Roots Radics 伴奏支持慢重，但速度與殘響無樂評，建議聽感驗證。

## 研究 b 組
- 19571：Osbourne《Never Stop Fighting》年份照原盤 1982 Greensleeves GREL 38（MB 首發 2010 為再版；Discogs master／Roots Archives 皆 1982）。Wailing Souls《On the Rocks》照 1983 GREL 59（MB 1997-12 為美版再版）。
- 19572：推翻策展層『Osbourne 1969 年在 Studio One 以 rocksteady 出道』：Wikipedia 為 1967 年 The Wildcats、Studio One 出道單曲〈All I Have Is Love〉，未載 rocksteady；早年細節（Come Back Darling 年份）Wikipedia 與 United Reggae 兩說不一，facts 只取單一版本。
- 19573：moodGuess 存疑三張請主線汰換或實聽：Osbourne（Greene 樂評寫 brighter／breezy、Discogs 風格含 Dancehall，單曲約 3 分鐘，不像慢板；Torn Light／Forced Exposure 兩頁 WebFetch 被擋，內容取自搜尋摘要）；Wailing Souls（Sly & Robbie 同掛名、Reggae LP Archives 標 Rub-A-Dub，可能偏快；無樂評）；Holt《Introspective》（『Part 1&2 人聲接 dub』無來源明講，Channel One Style 可能偏硬鼓點）。Holt《My Desire》與 Hinds《Just In Time》只有錄混人員可證，無聲音描述；Hinds 含流行翻唱，速度存疑。
- 19574：Holt《Introspective》廠牌兩說並存（Discogs／Roots Archives No Entry DSR 2552；Wikipedia Dynamic Sounds），卡單 No Entry 不改；B 面曲名以 Discogs 註記為準（Brandy、Everybody's Talking，非 Roots Archives 的 Branded／Mr. Fix It）。
- 19575：WebSearch 用滿 3 次；Discogs API、MB API、Wikipedia、Roots Archives 以 curl 取得。My Desire 與 Introspective 標 thin（聲音查無樂評）。

## 主線研究後汰換（不佔條號；2026-10-23）
- 25 張全查不到專輯級樂評，聲音只能靠製作鏈與樂手欄推定；**只憑查無不汰**（池中同人：Wailing Souls 四張、Osbourne 多張、Justin Hinds《Jezebel》、Hollie Cook 兩張、John Holt《Police in Helicopter》都落恍惚），**有反證的一律汰**。
- **汰 8 張**：
  - 輕快鼓型／明亮：John Holt《The John Holt Showcase》（1977 Bunny Lee、flying cymbals 年代、無 dub 證據）、Cornell Campbell《Boxing》（Gorgon 時期 flying hi-hat）、Johnny Osbourne《Never Stop Fighting》（樂評 brighter、breezy，Discogs 標 Dancehall）、The Frightnrs《Nothing More to Say》（樂評「sun-splashed joy」、輕盈 60 年代風）、《Always》（評為 sparse）、Cornell Campbell meets Soothsayers《Nothing Can Stop Us》（樂評「開闊明亮」、Afrobeat 銅管、upbeat）。
  - 非正規專輯：Horace Andy《Sings for You and I》（Discogs 兩個 1978 版都標 Compilation，三組鼓手、不同場次彙編）。
  - 證據最薄且偏輕：Ken Boothe & Jah Wobble《Old Fashioned Ways》（只有廠牌文案、3 分鐘流行翻唱〈My Girl〉〈Reggae Christmas〉；池中 Jah Wobble 盤 z 0.1–0.4 色溫貼邊）。
- 不補位：策展已回報主場景見底。
- 定案 **17 張**（a 4、b 4、c 3、d 3、e 3）：John Holt 6（Sweetie Come Brush Me、For Lovers and Dancers、Just the Two of Us、A1 Disco Showcase、My Desire、Introspective）、Justin Hinds《Just In Time》、Wailing Souls《On the Rocks》、Delroy Wilson 2、Horace Andy《Showcase》、Alton Ellis《A New Day》、Cornell Campbell《Rock My Soul》、Horace Andy & Jah Wobble《Timeless Roots》、Frightnrs《More To Say Versions》、Hollie Cook dub 版 2。汰除卡存 `dropped-cards.json`，研究稿移到 `dropped-research.json`。研究 qa-batch 全過。
- 研究層更正：Horace Andy《Showcase》與 John Holt《A1 Disco Showcase》以外的「人聲接 dub」說法查無（Showcase 三版本皆十首人聲曲）；A1 Disco Showcase 的 dub 混音在美國 Blank Tapes（D. Spear），不是 Tubby／Jammy；Just the Two of Us 製作人 David White。
