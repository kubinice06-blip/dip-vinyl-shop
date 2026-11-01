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
