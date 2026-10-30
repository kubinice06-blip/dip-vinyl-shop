# add-20261030-sf01 裁定（店主 Spotify 追蹤藝人補卡池・favoriteAlbums 38 張指定盤）

> 店主 2026-10-30 `/dip-card-create`：先上 Spotify 收藏專輯中藝人不在卡池的 38 張，**指定盤就是那張**。交接 `batch-progress/spotify-follow-20261030/PLAN.md`；流程沿用 `batch-progress/HANDOFF-mood-cells-line.md` §二（不做 moodGuess 邊距檢查，情緒評分照 `batch-progress/mood-axes/RULES.md`、不算落格率）。本工作階段負責 sf01、sf02。
> 策展：`curation-sf01a.json`（索引 0–18：收 18、不收 1）＋`curation-sf01b.json`（索引 19–37：收 18、跳過 1）→ 主線改 3（`master-override-sf01asf01b.json`）→ `master-sf01asf01b.json`（MB 釘住 28、§1 人工 8）→ `pick.json`（36）→ `build-cards.mjs`，再依 `release-types.json` 改 release type／例外欄、補古典作曲家欄、人工身分 `mbAbsenceProof` 改成驗證器格式（直接改卡單，**不要重跑 build-cards**）。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf01-cards.json`（36 張；研究 a–d 各 8、e 4）。
> **預留：研究 a 30101–30110、b 30111–30120、c 30121–30130、d 30131–30140、e 30141–30150、鉤子 30151–30160、寫作 30161–30170、主線 30171–30180。**（spotify-follow 線條號＝30000＋批號×100。）
---

## 主線策展（不佔條號）
- **sf01 去重以「這張盤」為單位**（指定盤；藝人已在池照收）：38 張中**跳過 1**（椎名林檎《無罪モラトリアム》池中已有同盤）、**不收 1**（Vayda《Dont Lose The Groove》：MB、Discogs、iTunes 皆查無此盤，只見 SoundCloud 同名單曲，無封面來源）→ 收 36。主線對 origin/main 與 146 條 `claude/*` 分支的 seed 與 10-30 卡單再跑盤層去重：0 撞（藝人層命中 Ghostface Killah、Albert Mangelsdorff、Richie Beirach、John McLaughlin、İdil Biret、椎名林檎、陳奕迅皆為同人他盤，照收）。
- 身分還原：
  - 古典照池中慣例掛演奏者：Spotify「Frédéric Chopin｜Chopin: Etudes, Op. 10…」＝**Dezső Ránki**（Hungaroton 1971，iTunes 同名盤＋Discogs 12754253）；「György Ligeti｜Ligeti, G.: Etudes, Books 1 and 2」是 Naxos 命名，Naxos 此曲目只有 **İdil Biret** 2003 錄音（MB 釘住）；Meiko Miyazawa＝**宮沢明子**（Audio Lab 1974《Sonatinen》）；Manfred Reuthe《Klavier Solo I》（Bella Musica）。作曲家欄：Ránki→Frédéric Chopin、Biret→György Ligeti；宮沢明子（庫勞、克萊門蒂、杜塞克）與 Reuthe（多位浪漫派）為選輯型，留空。
  - 原聲帶：Original Soundtrack《Clerks》→ Various Artists《Clerks: Music from the Motion Picture》。
  - 合作掛名照 MB：Czarface & Ghostface Killah；Toshinori Kondo, Eraldo Bernocchi & Bill Laswell《Charged》；Arthur Flink & Son of Chi；John McLaughlin & The One Truth Band；Bardo Pond, Acid Mothers Temple & Guru Guru《Acid Guru Pond》（Spotify 掛 Bardo Pond）；Juzzy Orange & GoodieK（汁橙音樂，MB 盤名《A Soulless Engineer》＝《沒有靈魂的工程師》）。
  - Patrick Holland《Hope You're Well》＝**Project Pablo**（Patrick Holland 的製作名義，MB 釘住 2017 EP），掛 MB 名義，queryAlias 帶 Patrick Holland。
  - Zhang Zhen Yue＝張震嶽《遠走高飛》（2019，5 首）；Young David＝青春大衛《第一到六天》；Elva Hsiao「蕭亞軒--」推定為 1999 首張同名專輯《蕭亞軒》（MB 題名「蕭亞軒同名專輯」；Spotify 的「--」應是同名專輯的佔位寫法）；Eason Chan「陳奕迅2011 "?" 國語專輯」＝《？》（全形，queryAlias 帶半形 ?）；Richard Beirach＝Richie Beirach（池中慣用寫法）；Dome「2」＝《Dome 2》。
- release type（`release-types.json`；全部註明「店主 Spotify 收藏指定盤」）：
  - EP＋`electronic`：Corporate《A5 EP》（3 首）、Project Pablo《Hope You're Well》。Single＋`electronic`：Smasher《So High》（英國 grime／UK garage 數位單曲，Discogs 16198751）——**例外白名單的精選門檻原本要歷史地位，本線以店主明確指定收藏盤為依據放行**（可逆：日後店主不要就下架這一張）。
  - EP＋`asia-mini-album`：張震嶽《遠走高飛》、烏賊紳士《狗》（7 首）——白名單原文寫日本ミニアルバム與韓國 EP，台灣迷你專輯同形狀（市場上當新作發行宣傳），本線依店主指定盤延用，記此。
  - Compilation（§5.6）：Clerks 原聲合輯、Bardo Pond《Selections: Volumes I-IV》。
  - 照 Album：椎名林檎《唄ひ手冥利〜其ノ壱〜》（翻唱輯，MB Album）、《Acid Guru Pond》（三團合作錄音室盤）、Arthur Flink《The Fifth World Recordings》（iTunes 標 EP、MB 標 Album，取 MB）。
- 待研究層核對：Ligeti 演奏者為推定；宮沢明子年份與 Spotify 版是否同錄音；冠宇《單飛》只有 iTunes HK 一個來源；Smasher 身分（英國 grime）為推定；Kay Hoffman 國籍（瑞士巴塞爾）；Dome 2 首發 1980。
