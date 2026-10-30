# add-20261030-sf09 裁定（Spotify 追蹤藝人補卡池・爵士：含日韓爵士、ECM、世界爵士）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf09、sf10。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf09a.json`（26）＋`curation-sf09b.json`（17）→ 跨組去重＋主線汰 2（`master-override-sf09asf09b.json`）→ `master-sf09asf09b.json`（39 張：MB 釘住 37、§1 人工 2）→ `pick.json`（39）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf09-cards.json`（39 張；研究 a–d 各 8、e 7）。
> **預留：研究 a 41801–41810、b 41811–41820、c 41821–41830、d 41831–41840、e 41841–41850、鉤子 41851–41860、寫作 41861–41870、主線 41871–41880。**（sf 線條號：sfNN → 41001＋(NN−1)×100 起，每批 80 條。）
---

## 主線策展（不佔條號）
- **清單 41 個 Spotify 掛名 → 收 32 位、39 張；跳過已在池 4 位；不收 2 位。** 同一人的「X」與「X Trio／X's 樂團」合併挑：Bobo Stenson／Bobo Stenson Trio、Jacques Loussier／Jacques Loussier Trio、Marc Johnson／Marc Johnson's Bass Desires、Marc Ribot／Marc Ribot's Ceramic Dog。
- **跳過（池中已有）**：
  - The Joe Harriott-John Mayer Double Quintet → 池中 Joe Harriott（《Free Form》《Abstract》2 張）。
  - Toshiko Akiyoshi Trio → 池中 秋吉敏子／秋吉敏子トリオ（14 張）＋Toshiko Akiyoshi-Lew Tabackin Big Band（1 張）。
  - 板橋文夫トリオ → 池中 板橋文夫（2 張）＋Fumio Itabashi Trio《濤》。
  - 菊地雅章クインテット → 池中 菊地雅章／Masabumi Kikuchi Quintet（8 張以上）。
- **不收**：
  - Jon Christensen：沒有領銜專輯（MB 只有《Selected Recordings》精選，其餘是 Jarrett、Garbarek、Stenson 的側翼鼓手盤）。
  - Multiverse：策展 b 推定為挪威爵士團《Theory of Anything》，主線用 Spotify 藝人頁（open.spotify.com/embed/artist/0l2z1SB8aaIp8vNhI9i5YL）回查，熱門曲是〈有緣作伙〉〈恨帥潮〉〈狠操俱樂部〉——**是台灣嘻哈廠牌 Multiverse Entertainment 的帳號**（Apple TW《破籠》℗ Multiverse Entertainment CO., LTD.，掛名 Multiverse feat. Macdella、EyeballRay、SheATH）。比照 PLAN.md skipLabels，廠牌／班底帳號不收；挪威那張也不收（身分不符）。
- **Spotify 藝人頁回查（主線全批 41 位）**：`open.spotify.com/embed/artist/<id>` 熱門曲逐位核對身分；除 Multiverse 外皆與策展身分一致。Kazuyoshi Nakamura 熱門曲〈キャノンボール〉〈犬と猫〉〈セブンスター〉＝**中村一義**（分錯場景照收，不搬批）；Swing Slow 熱門曲掛名 Haruomi Hosono、Miharu Koshi＝細野晴臣×越美晴的計畫；Graciela Susana 熱門曲〈百万本のバラ〉〈サバの女王 '91〉＝在日本走紅的阿根廷歌手。
- **Sokratis Votskos with The Giorgos Pappas Trio**：兩組都收了不同張。a 收他名下 Quartet 的《Sketching the Unknown》，b 收唯一同署名的《Impressions of Samos》（2026，MB 署名 Greg Foat & Sokratis Votskos）。**主線取 b**：Spotify 追蹤的是「with The Giorgos Pappas Trio」這個掛名，就收這個掛名的盤，a 那張汰掉。卡池掛名照 b 寫「Greg Foat, Sokratis Votskos & The Giorgos Pappas Trio」。
- **跨組重複**：The Greg Foat Group《Girl and Robot With Flowers》、Tyreek McDole《Open Up Your Senses》兩組都提，`build-master` 留 a 組版本。Greg Foat Group 另收 a 組的《Dark Is the Sun》（2011 首作）。
- **Daniel Ponce《Arawe》年份**：a 組改成 Discogs 主版本 1988，主線回 MB 1987（Antilles New Directions 原版 1987，Discogs 主版本年是美國再壓），用 MB。
- **高木元輝**：池中只有合作名義（高木元輝＝加古隆カルテット《パリ日本館コンサート》、土取利行・高木元輝《Origination》），沒有他個人領銜的卡。照 PLAN 判準「卡池上這個掛名有沒有卡」收《Mosura Freight!》（1975，§1 人工身分：MB 查無，Discogs＋jazzmusicarchives）。
- **Flea**：池中只有 Red Hot Chili Peppers，個人名義沒有卡；他第一張個人錄音室專輯《Honora》（2026，Nonesuch）收進來。**swing slow** 同理：池中有細野晴臣名下的卡，但這個計畫掛名沒有。
- **Fresh Moods**：德國 Elektrolux 廠牌旗下的個人計畫（Discogs artist 10072），不是廠牌或合輯帳號，收同名首作（1997）。
- **2 張的藝人**：Bobo Stenson Trio（《Serenity》《Cantando》）、John Surman（《Westering Home》《Road to Saint Ives》）、Marc Johnson（《Bass Desires》《Shades of Jade》）、Marc Ribot（《Rootless Cosmopolitans》＋Ceramic Dog《Your Turn》）、Mark Guiliana（Jazz Quartet《Family First》《Jersey》）、Nils Landgren Funk Unit（《Paint It Blue》《Fonk da World》）、The Greg Foat Group、Dominique Fils-Aimé（《Nameless》《Three Little Words》）。其餘各 1 張。
- 交研究層把關：Michel Sardaby《Night Cap》、The Greg Foat Group 的廠牌（策展說是憑記憶）；David Becker Tribune 的封面是 2025 再版；Moses Yoofee Trio《MYT》是不是首張正規專輯、年份；Graciela Susana《Adoro, la reine de Saba》原盤廠牌與封面（CAA 無圖）；濱瀬元彦《Reminiscence》1986 原盤與 2018 重錄版分清楚；Spiral Deluxe 成員與國別；Assagai 美版改題《Zimbabwe》。
