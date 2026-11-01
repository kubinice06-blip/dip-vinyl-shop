# add-20261101-eb5 裁定（鐵幕爵士＋MPS 策展線・eb5：MPS／SABA 西德廠牌 60–70 年代＋東歐移民西方錄音）

> 店主 2026-11-01：「Yancy Körössy* - Identification 收錄 並且擴展相關專輯」→「擴張到 200 張」。交接 `batch-progress/eastbloc-jazz-20261101/PLAN.md`。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-eb5a.json`（MPS／SABA 24）＋`curation-eb5b.json`（東歐移民 24）→ 主線汰 8（`master-override-eb5aeb5b.json`）→ `master-eb5aeb5b.json`（40 張：MB 釘住 38、§1 人工 2）→ `pick.json`（40）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261101-eb5-cards.json`（40 張；研究 a–e 各 8）。
> **預留：研究 a 43501–43510、b 43511–43520、c 43521–43530、d 43531–43540、e 43541–43550、鉤子 43551–43560、寫作 43561–43570、主線 43571–43580。**（eb 線條號：ebN → 43000＋N×100 起，每批 80 條。）
---

## 主線策展（不佔條號）
- 兩組合計 48，汰 8 留 40：
  - 現場盤（不是該藝人最重要的作品，不開 releaseException）：Sun Ra《It's After the End of the World》（Donaueschingen／柏林實況）、《Violin Summit》（巴塞爾實況，多人合掛）。
  - 池中同藝人已多：Freddie Hubbard《The Hub of Hubbard》（池中 22 張）。
  - 每位藝人 1–3 張的總量控制：Michał Urbaniak 在 eb3（`curation-eb3b.json`）已提波蘭期《Paratyphus B》《Inactin》，本批只留美國期《Fusion》，汰《Atma》《Body English》；Dusko Goykovich 汰《After Hours》（留《Swinging Macedonia》《Slavic Mood》）；Gábor Szabó 池中已 2 張，只留《Jazz Raga》，汰《Wind, Sky and Diamonds》；Joachim Kühn 汰 Atlantic 期《Springfever》（留 MPS《Cinemascope》《Hip Elegy》）。
- 掛名：Dusko Goykovich 統一用 MB／國際發行寫法（《Slavic Mood》封面 Gojkovic，卡池不分裂）；Valery Ponomarev 實為蘇聯移民，派系改「蘇聯移民（美國）」。
- 年份：Vitouš《Infinite Search》1969 錄、Embryo 1970 發行，取 1970（MB）；Goykovich《Swinging Macedonia》Philips 1966（Discogs／iTunes；MB 1967），取 1966 交研究層核；Bacsik《The Electric Guitar of the Eclectic Elek Bacsik》MB 日期是 1998 重發，原盤 Fontana 1962。
- 交研究層把關：Gulda《Music for 4 Soloists and Band No. 1》首發廠牌（Amadeo 1965？MPS 是否重發）；Kriegel《Inside: Missing Link》1972／1973；Monty Alexander《Love & Sunshine》1975／1976；Vitouš《First Meeting》樂手名單；Kühn《Hip Elegy》樂手；Bacsik《Bird and Dizzy》樂手與弓拉吉他說法；Leviev《Blues for the Fisherman》錄音地與掛名（Milcho Leviev Quartet feat. Art Pepper？）；《We'll Remember Komeda》署名與廠牌。
- 跨工作階段：本批與 eb1（Goykovich、Leviev 在其場景名單）可能重疊，寫入前對 origin 所有 `claude/*` 分支 seed 再去重一次。

## 研究 a 組
- 43501：Mangelsdorff《And His Friends》推翻策展層。搭檔是 Don Cherry、Elvin Jones、Karl Berger、Attila Zoller、Lee Konitz、Dauner（MPS 官方頁），沒有 Wild Bill Davis；六首全是無伴奏二重奏，不是「團體互動」。moodGuess 存疑：無貝斯無鼓（與 Jones 那首除外）、空間感大，偏靜偏薄，預估 x 3.5 偏高。
- 43502：Koller《Exclusiv》是兩段錄音拼成（1959-02-19 Baden-Baden 四重奏＋1963-11-26 Villingen 九重奏），仍是原創專輯；單聲道原版 11 首，立體聲版少〈Chordless〉〈Stalag〉。聲音條無樂評可引，status thin；moodGuess（cool、偏靜偏輕）無來源佐證，列存疑，建議主線試聽或接受不確定。Pettiford 1960 過世，只可能在 1959 段。
- 43503：Kühn《Devil in Paradise》聲音條僅 Discogs 風格與編制（free jazz／fusion；電鋼琴＋鋼琴雙鍵盤＋Oxley），status thin；moodGuess 存疑：單簧管音色溫暖（MPS 官網），預估偏冷偏重無來源。MPS 官網查無此專輯頁。
- 43504：Mangelsdorff Quartet《Never Let It End》無專輯樂評，聲音條由 Discogs 風格與編制組成，status thin；錄音日 1970-03-23 單一來源（Discogs）。與 And His Friends、池中另四張的取捨留主線。
- 43505：Kriegel《Missing Link》年份 1972 定案（MPS 官方、Discogs 首版、錄音 1972-03），Apple 1973 為後版；不翻案。
- 43506：Dauner《Oimels》1969 定案（MPS 官網、Discogs、MB；NTS、AllMusic 寫 1970 初）。Free Action 以 SABA 原盤 1967 為準（Villingen 1967-05-02，掛名標籤印 Septett）。
- 43507：Gruntz《Noon in Tunisia》Discogs 組曲名《Maghreb Cantata》，de.wikipedia 寫 Maghreb Suite；突尼西亞演出反應為單一來源，寫作層略。
- 本組無疑為「推翻年份」者；推翻策展層僅 43501 一處，另 43502 補出拼盤性質。

## 研究 c 組
- 43521：Leviev《Blues for the Fisherman》推翻策展層三處。(1) 是現場專輯（1980 年 6 月倫敦 Ronnie Scott's，Discogs 內頁），非洛杉磯錄音；(2) Art Pepper 才是實際主角（Discogs 掛 Milcho Leviev Quartet，樂手 Pepper／Leviev／Dumas／Burnett），主線先前汰過現場盤，本張留不留請主線裁；(3) 內容是原音後咆勃／藍調長曲（17／7／10.5／11 分鐘），沒有奇數拍來源，moodGuess 存疑。Pepper 與 Galaxy 合約之說與錄音日期差異（Discogs 27–29、其他 27–28／28–29）僅搜尋摘要可見，未入 facts。
- 43522：Mariano《Helen 12 Trees》推翻 curatorWhy 的 Jasper van't Hof：實際為 Jan Hammer、Zbigniew Seifert、Jack Bruce、John Marshall、Nippy Noya（Discogs；樂評一致）。聲音是有鼓有 Moog 的爵士搖滾，moodGuess（邊緣靜）存疑。
- 43523：Goykovich《Swinging Macedonia》年份：錄音 1966-08-30／31 科隆，Philips 外盒印 1967 年 1 月，Discogs master 與 MB 皆 1967，卡單 1966 是錄音年（Apple、維基 1966）。建議卡取 1967，主線裁。「馬其頓出身」不成立（生於 Jajce、讀貝爾格勒音樂學院）。status thin（無獨立樂評）。
- 43524：Goykovich《Slavic Mood》掛名 Gojkovic（封面、MB）與卡池統一 Goykovich；Vista 廠牌屬 RCA 義大利，錄於羅馬 RCA 1974-10-24／25，發行 1975-05。status thin。
- 43525：All Smiles 年份 MB 1968、Discogs 1969，錄音 1968-05，卡取 1968。MPS 官方頁稱質地細緻而非厚重聲牆，moodGuess（躁重暖）存疑。樂團成立年英維基（1960 巴黎）與德維基（1961 科隆）不一，facts 採德維基。
- 43526：Murphy《Midnight Mood》伴奏是 Clarke-Boland 的八名成員小編制，非完整大樂隊；錄音 1967-12-18，發行 1968，原版 SABA SB 15 151 ST，MPS 頁是後續目錄歸屬。
- 43527：Alexander／Ranglin《Rass!》錄於京斯敦 Dynamic Sounds（Discogs），身分無疑；聲音有鼓有打擊，雷鬼與 calypso 切分。Singers Unlimited《Feeling Free》人聲 1975-05 錄於 Villingen、管弦樂 1975-04-11 錄於好萊塢 A&M，與 a cappella 系列定位不同，可收。
- 43528：本組推翻策展層：43521（三處）、43522、43523（年份與出身）；moodGuess 存疑：Leviev、Mariano、All Smiles。

## 研究 e 組
- 43541：Bacsik《Bird and Dizzy》推翻策展層：拉的是小提琴／電小提琴／Violectra，不是弓拉吉他；編制是 Oliver Nelson 編曲的大編制（Brashear、Flory、Warne Marsh、Wofford、Domanico／Clark、Shelly Manne），非二重奏。樂手名單單一來源（部落格）加檢索摘要，jazzmusicarchives 抓取 403 未核。moodGuess 存疑（預估抒情吉他慢暖，實為咆勃曲目＋小提琴領奏）。身分、1975、Flying Dutchman 無誤。
- 43542：Bacsik《Electric Guitar of the Eclectic…》1962 Fontana 巴黎錄音成立（Discogs 錄於 1962-02～06）；Gaudry 已核，另有 Michelot／Clarke／Humair；MB 1998 為重發。
- 43543：Szabó《Jazz Raga》錄音 1966-08-04／17 Van Gelder；Wikipedia 1967-01、Discogs 美版 1967-03、MB 1966，卡年由主線裁。拼法池內 Gabor Szabo。moodGuess 存疑（有 Purdie 鼓、曲短、含 Paint It Black／Caravan，偏律動而非靜飄；未實聽）。
- 43544：Zoller Koller Solal 錄音 1965-01 Villingen、SABA 1966 發行；Wikipedia（Solal 條）稱 MPS 與 Discogs 的 SABA 型號不符，取 Discogs。無鼓無貝斯三人編制。Zoller 實為 1948 年出走（非 1956）。與 eb5a Koller 《Exclusiv》不同張，無撞。
- 43545：《We'll Remember Komeda》錄音 1972-06-22／23 Walldorf、1973 MPS；八人帶鼓編制，兩把小提琴分左右聲道。moodGuess 輕度存疑（Free／Fusion＋電小提琴，可能比追思慢中速躁）。署名建議簡化，主線定。seed 與 eb3 curation 未見重複。
- 43546：Kühn《Cinemascope》1974-05 Conny Plank 工作室錄、Rolf Kühn 編弦樂，聲音事實取自 Discogs 單一來源，無第二來源評論。
- 43547：Kühn《Hip Elegy》年份 1976（MB／Discogs 德版）成立，AllMusic／Presto 1977 為重發；iTunes 為 Most Perfect Sound 重發版。錄音 1975-11 Ludwigsburg 僅檢索摘要，未核故不寫，status thin。
- 43548：Ponomarev《Means of Identification》錄音 1985-04-14 Van Gelder、1987 Reservoir RSR 101（目錄最前，不寫「廠牌第一張」）。出走細節與 Blakey 年份無可靠來源，只寫 1973 年起定居美國，status thin。Discogs 鋼琴手「Takao Hideki」姓名順序未核。
- 本組 moodGuess 存疑：Bacsik《Bird and Dizzy》（重）、Szabó《Jazz Raga》、《We'll Remember Komeda》（輕）。推翻策展層：43541（兩處）。WebSearch 共用 3 次（Bacsik 兩次、Kühn 一次）。
