# add-20261023-ml55 裁定（情緒薄格策展線・恍惚：90s–00s 女聲 R&B ballad＋女聲 quiet storm、女聲慢板 neo-soul、女聲 downtempo）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 12 輪，本工作階段負責 ml55、mc41（評分照 10-23 體感標準；店主 10-23「恍惚可以多增加一點 downtempo 與 dub」）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml55 列；可擴寫：女聲 quiet storm 成人抒情、女聲慢板 neo-soul／暖 R&B 2000s–20s、女聲 downtempo／lovers dub），交接 `batch-progress/HANDOFF-mood-cells-line.md`。
> 策展：`curation-ml55.json`（39）→ 主線汰 2（`master-override-ml55.json`）→ `master-ml55.json`（MB 回查 37/37 釘住、人工 0；flag 2 見下）→ `pick.json`（全收 37）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml55-cards.json`（37 張；研究 a–d 各 8、e 5）。身分：MB 釘住 37、§1 人工 0。
> **預留：研究 a 20921–20930、b 20931–20940、c 20941–20950、d 20951–20960、e 20961–20970、鉤子 20971–20980、寫作 20981–20990、主線 20991–21000。**
---

## 主線策展（不佔條號）
- 策展 39（90s–00s 女聲 R&B 二線慢盤 6、女聲 quiet storm 13、女聲慢板 neo-soul 17、女聲 downtempo 3）；moodGuess 全過邊距（x 2.0–2.6、y 0.8–1.2、z 0.6–1.5），y 多數正好 0.8。主場景見底：池中 Toni Braxton、SWV、Brandy、Monica、Tamia、Faith Evans 後期、Aaliyah、MJB 多數判輕（y ≤ 0.4），頭牌不提。
- 主線汰 2：Hollie Cook《Happy Hour》（ml50 先例：自稱 happiest、研究汰過）；Syd《Broken Hearts Club》（池中前作《Fin》偏冷、z 0.7 貼邊，且藝人名「Syd」與池中 Syd Barrett 子字串撞名）。
- 池中同人錨點（pool-axes）：Kelly Price、Miki Howard、Phyllis Hyman 後期、Chanté Moore、Lalah Hathaway、Marsha Ambrosius、Goapele、Raveena、Sabrina Claudio、Syleena Johnson 全落恍惚（y 0.6–1.0）。
- **MB flag**：Syleena Johnson《Chapter 1》MB 首發 2002-03-18 為他國版，美國原版 2001；Aisha《High Priestess》MB 1988 為德版，Discogs master 1987（UK Ariwa）——研究層核對。Quadron 年份 2009／2010 研究層核。藝人名 Aisha（池中 Maisha）、Celeste（池中 Celeste Legaspi）子字串撞名，seed 去重 0，介紹鍵上線前再查。
- 去重：seed、所有 curation-*.json、origin 各 `claude/*` 分支 seed＋卡單 0 撞。

## 研究 c 組
- 20941：Chanté Moore《Exposed》moodGuess 存疑——Jermaine Dupri 執行製作的 R&B／嘻哈混合、〈Take Care of Me〉為 Da Brat 客串單曲、〈Straight Up〉快歌主打；建議主線汰換。廠牌首發 Silas／MCA（MB 標 Geffen 為後世目錄），卡單 MCA 不改。
- 20942：Chanté Moore《Moore Is More》存疑——AllMusic 稱有喧鬧舞曲〈On and On〉（Da Brat 客串）、Moore 自稱「aggressive, happy, bubbly」；僅簡約慢歌（〈Cry Me a River〉翻唱）合恍惚。
- 20943：Lalah Hathaway《Honestly》存疑——28 分鐘 9 首、trap 式鼓點與 16 位元合成器、SoulTracks 稱暗沉；暖在人聲，製作偏乾淨數位。維基獨立榜日期（2015）矛盾，不採。
- 20944：Mica Paris《Whisper a Prayer》部分存疑——維基／BBC 轉述為九〇年代鼓機與合成器編曲，弦樂墊無來源；速度分布未能查。
- 20945：Marsha Ambrosius《Nyla》存疑——前半有 trap 鼓點與銅管快歌，慢板集中後半，慢歌約半數。
- 20946：Marsha Ambrosius《Casablanco》部分存疑——27 人管弦樂團與電影感有證，但含 Dre 嘻哈鼓與取樣，非純慢歌；MB／維基日期 6-28 為準。
- 20947：Leela James《Loving You More…》部分存疑——樂評只講現代重編，管弦厚無來源；曲目含中速／放克的 Etta 名曲。
- 20948：Leela James《Fall for You》存疑——九〇年代式節奏曲＋鋼琴抒情，部分製作過度光滑；風琴／厚貝斯無來源。
- 無推翻年份、廠牌、盤名；各卡 WebSearch 共用 3 次（Casablanco／Nyla／Honestly 樂評），其餘走 MB API 與維基。AllMusic、SoulTracks、BBC、Discogs 403 或不可開，內容經維基轉述處已於 notes 註明。
