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
