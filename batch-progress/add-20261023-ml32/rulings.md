# add-20261023-ml32 裁定（情緒薄格策展線・恍惚：拉丁 bolero／慢板浪漫＋ml25 80s 慢板 reggae 歌）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 6 輪，本工作階段負責 ml32、mc28。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml32 列，可擴寫 ml25），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml32.json`（31 張）→ `master-ml32.json`（MB 回查 31/31 釘住）→ 主線汰 0 → `pick.json`（31）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml32-cards.json`（31 張；研究 a–d 各 7、e 3）。身分：MB 釘住 31、§1 人工 0。
> **預留：研究 a 16481–16490、b 16491–16500、c 16501–16510、d 16511–16520、e 16521–16530、鉤子 16531–16540、寫作 16541–16550、主線 16551–16560。**
---

## 主線策展（不佔條號）
- 策展 31 張（主場景 18：Chicano／lowrider sweet soul 復興 7、夢幻／迷幻化 bolero 與拉丁慢板浪漫 7、拉丁 dub 4；擴寫 ml25 80s 類比濕混音 roots 人聲 13）。挖不到 54，照實交、不湊數。
- **主場景見底的原因**：池中拉丁卡 193 張只有 2 張落恍惚（Adrian Quesada《Boleros psicodélicos》I／II）；經典 bolero（Luis Miguel《Romance》、Omara《Flor de Amor》、Los Ángeles Negros 三張）全判輕落放鬆。經典三重唱、吉他小編制、70s 迷幻 bolero 一律不提，只收殘響厚的當代復興盤。
- **主線汰 0**：池中同藝人三軸查核——Bobby Oroza、Kali Uchis、Quesada、Quantic 池中落恍惚；roots 人聲 9 位（Horace Andy、Don Carlos、Junior Delgado、Sugar Minott、Linval Thompson、Wailing Souls、Misty in Roots、Johnny Osbourne）池中多數盤落恍惚（y 0.7–1.3、z 0.4–1.2）。同藝人跨批（ml1／ml5／ml9 已收其他盤）不影響：規則是「同一藝人沒有張數上限」，只去重同一張盤。
- 跨分支去重：對 origin 65 個 `claude/*` 分支與 main 的 seed 與卡單 0 撞。
- 研究層重點查：sweet soul 復興盤的乾淨度（The Altons、Thee Marloes）、Buscabulla／Chancha 的中速曲比重（x）、Don Carlos／Johnny Osbourne《Nightfall》的混音濕度（y）、Junior Delgado 1986 是否數位。

## 研究 e 組（條號 16521–16530）
- 16521：Misty in Roots《Wise and Foolish》moodGuess 存疑——「厚低頻與殘響」查無來源，唯二聲音描述（killyourpetpuppy、Brighton 場地介紹）稱比早期更 mellow／jazzy／soulful，y 可能偏低；status thin，主線聽試聽再判。發行年 Discogs／Wikipedia／MB 為 1981，Apple／roots-archives 為 1982，沿用 1981。
- 16522：Lacksley Castell《Morning Glory》moodGuess 輕度存疑——dub 版是另一張（Sly & Robbie《Dub Rockers Delight》），原盤為人聲版，濕度可能略低；速度與殘響無樂評可引，status thin。死亡年份來源不一（1983／1984），facts 不寫年份。
- 16523：Johnny Osbourne《Nightfall》moodGuess 成立——unitedreggae 與 Apple Music 樂評一致指低音突出、最重、Scientist dub 混音、rub-a-dub 空曠節奏；curatorRisk「y 貼邊」解除。King Tubby's 混音地點為 Discogs 單一來源，facts 標「Discogs 登記」。status full。
- 推翻策展層：0 處（身分、年份、廠牌全數吻合）。

## 研究 d 組（16511–16520）
- **16511** Junior Delgado《Raggamuffin Year》：採 1986（Wikipedia／Discogs；AllMusic 1987 無法開頁）。標 moodGuess 存疑：同名單曲被稱「擁抱牙買加新風格」，Discogs 列 Pablo 合成器與三位鼓手，恐偏數位、非慢類比；facts 不寫推測。
- **16512** Milton Henry《Who Do You Think I Am?》：身分核對無誤（1985、Wackie's LP-2450），無獨立樂評，標 thin；聲音只確認 Wackies lo-fi、基礎軌兩地錄（Wackies／Channel One）。
- **16513** Sugar Minott《Sufferer's Choice》：採 1983（Discogs／Christgau 1983 Heartbeat；Wikipedia 誤列 1988）。節奏軌主要是 Sly & Robbie、僅兩首署名 Roots Radics，moodGuess 輕度存疑。
- **16514** Sugar Minott《Bitter Sweet》：推翻策展層「Studio One riddim」：Discogs 與 Wikipedia Prince Jammy 條顯示是 Prince Jammy 在 King Tubby's 製作混音的 1979 新錄音；製作人待驗已驗。
- **16515** Linval Thompson《Six Babylon》：實為美國 Clocktower Records（CTLP0111）版，Discogs 備註「compiled & edited」於 Bullwackie，Channel One 1979 錄音、Scientist 等混音；性質疑為彙整重混 LP，標 thin，建議主線核實，不列移除。卡單 label 空白實為 Clocktower。
- **16516** Wailing Souls《Stranded》：Discogs 列 Sly Dunbar 電子鼓與 Keith Sterling 合成器，moodGuess 存疑（非純類比 rub-a-dub）。
- **16517** The Viceroys《Brethren and Sistren》：curatorRisk 製作人待驗已驗＝Linval Thompson；伴奏名單來自 Discogs，Wikipedia 未證實 Roots Radics 參與本張。
- 研究 d 組合計推翻策展層 1 處（Bitter Sweet 伴奏性質）、存疑 4 張（Raggamuffin Year、Stranded、Sufferer's Choice、Bitter Sweet 輕度）。

## 研究 a 組（16481–16490）
- **16481** Adrian Quesada《Look At My Soul》：推翻年份——首發 2018-10-26 Nacional 黑膠 10 首（Discogs 主版本、維基、KUTX 一致），卡單 2021 取自 MB 2021-12-10 的 12 首數位擴充版；建議卡片年份改 2018、label 補 Nacional Records。性質為 Quesada 掛名的多位客席致敬專輯。moodGuess 存疑：曲名有 Boogaloo en Monterey、Funky Chick，x 風險高。
- **16482** Thee Marloes《Perak》：moodGuess 明顯存疑——Big Crown 說明為『高能量舞池曲與慢板抒情』來回（Midnight Hotline、Mungkin Saja 偏舞曲，Over 鼓重），編制是銅管長笛顫音琴、無弦樂，印尼語與英語混合，不屬 lowrider 譜系。建議主線優先實聽，必要時汰換。
- **16483** Thee Sacred Souls 兩張：樂評只說類比、有機（首作）與類比錄音室、陽光明亮（第二張），無一提殘響厚；y 預估偏濕查無來源，磁帶僅 Jambands 一篇指『類比錄音室』。首作 8/26（MB、Grammy）vs 維基正文 8/27，採 8/26。
- **16484** Bobby Oroza《Get on the Otherside》：2SER 稱『open analogue sound，鼓質地分明』，與預估『糊、殘響深』不符，標存疑；MB 數位 2022-06-10、LP 2022-08-26（deejay.de），年份 2022 不變。樂手名單與『reverb-drenched』只見單一搜尋摘要，未入 facts。
- **16485** Thee Sinseers & Joey Quinones《Sinseerly Yours》：署名實為 Thee Sinseers（Quiñones 為團長兼製作人），不是外部合作；首張全長成立；Bandcamp『Colemine 2023』與 2024 衝突，採 MB／Discogs 2024-03-22。錄於 Rialto 的 Second Hand Sounds（前牙醫診所），現場合奏為主；殘響與速度查無來源，標存疑。
- **16486** The Altons《Heartache in Room 14》：Discogs 登記 Bosco Mann 製作編曲並混音、含 Tape Op；樂評稱『安靜親密中速』『crisp, modern production』，y 風險（策展層已預警）成立一半——磁帶有，濕糊無。Joey Quiñones 同時在 Altons 專輯名單中。
- WebSearch 實際用了 6 次（超出每支 3 次：Sinseers／Altons 的維基與廠牌頁全 404，DuckDuckGo 驗證擋住，只能補搜）；其餘走 MB／Discogs API 與 WebFetch。
- 研究 a 組合計推翻策展層 2 處（Quesada 年份與廠牌、Sinseers 署名性質）、存疑 7 張全列（Marloes 偏高，其餘中度或輕度）。
