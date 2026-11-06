# add-20261106-md41 裁定（情緒薄格線・頹靡：Bandcamp downtempo 候選 md41）

> 店主 2026-11-06：協調端從 Bandcamp downtempo 等標籤抓 1,901 張、依 Last.fm 收聽排序、便宜模型粗估落格；店主選「先做最遠的」——預估離邊界遠的 289 張分六批，三個工作階段並行。本工作階段做 md40＋md41（並行：ml68＋ml69、ml70＋md39）。卡單 `batch-progress/bandcamp-dt-20261105/pick-md41.json`（47 張）即策展結果，不派策展代理；說明見同目錄 `README.md`。
> 目標格：**頹靡＝靜（x<3.0）＋重（y≥0.5）＋冷（z<0）**；評分照 `batch-progress/mood-axes/score500/BRIEF.md`（10-23 店主體感標準）。卡單的 moodGuess 是只看 Bandcamp 標籤的粗估、把握多半 low，**研究層要照聲音再判一次**：判輕、有拍子推進、判暖的汰掉，不補人。
> 流程：卡單 47 → 主線初篩（身分、去重、資格、文案直述聲音）→ `curation-md41.json`（29）→ `master-md41.json`（MB 釘住 29、§1 人工 0）→ `build-cards.mjs` → 研究 3 組（a 10、b 10、c 9；組數由五組併成三組，壓尖峰代理數）。
> **預留：研究 a 23881–23890、b 23891–23900、c 23901–23910（d、e 不用）、鉤子 23931–23940、寫作 23941–23950、主線 23951–23960。**
---

## 主線初篩（不佔條號；2026-11-06）
- 身分：Bandcamp 專輯頁 ld+json（發行日、曲數、總長、發行者）＋ MB release-group 查詢（score 100、primary Album、無 secondary）逐張比對；留下的全數 MB 釘得住。
- 去重：`dedup-md37.mjs`（seed、所有 manifest、`data/pool-removed.json`、所有卡單、所有 curation）0 撞。
- **主線初篩汰 18**（卡單 47 → 29）：
  - 資格：Pulshar《Mask》（MB EP）、Sau Poler《A Soundless Echo》（MB EP、28 分）、imminent starvation《human relocation》（29 分、含 remix；technoid industrial）、All India Radio《Liminal Space》（以《The Unified Field》曲目重新詮釋，近 remix 盤）。
  - 線別：Daily Bread《Invisible Cinema》（器樂嘻哈；店主 11-04「嘻哈太多」；MB 查無）、Deadbeat《Journeyman's Annual》（dancehall／dub；池中同人一張落恍惚）。
  - 池中同人錨點判輕或判暖：Carbon Based Lifeforms《Derelicts》（同人《World of Sleepers》落平靜 y 0.3）、Arms and Sleepers《SAFE AREA EARTH》（同人落平靜 y 0.2）、Funki Porcini《Drift To This》（同人落恍惚 z +0.2）。
  - 能量（文案直述有拍推進或攻擊性）：Just Mustard《WE WERE JUST HERE》（第三張轉向較明亮、舞曲化）、worriedaboutsatan《Bloodsport》（「gnarled, aggressive energy… angry」）、Gi Gi《In Lieu》（「nearer the dance floor… pulsing」）、Snakes Of Russia《True Surrender》（「Death Beats、pulsating basslines」）、PROFONDITA《Dracarys》（「fat kicks… emotive vocals」downtempo-trance）、Azu Tiwaline《The Fifth Dream》（polyrhythmic dub techno）。
  - 判暖判輕：36《A Warm Static Sphere》（標題與文案皆暖）、Area 3《Amb》（「relaxation, meditation」new age）。
  - 同人同聲音保留兩張：Sync24《Source》（MB 查無、須人工身分；同人《Comfortable Void》《Omnious》保留）。
- 年份以原盤首發為準：Lund Quartet 2011、Sync24《Comfortable Void》2012、CASHFORGOLD 2021、Muslimgauze《Satyajit Eye》1993（Staalplaat DAT-only，2020 Bandcamp 數位首發）。
- 同人多張：worriedaboutsatan 2、HEXSYSTEM 2、State Azure 2、Sync24 2；Lauge《Latitudes》與 md40 的《Echoes》分兩批。


## 研究 b 組（23891–23900）
- 23891 Kenopsia：moodVerdict borderline（z 旋律導向 post-rock、有人聲長笛，傾向恍惚）；第二來源只談同計畫早期專輯，單源 thin；MB 國別 AU 與卡單 gb 不一致，維持 gb。
- 23892 Meridian：keep（Berlin School／dark ambient／space music、無鼓）；廠牌 Synphaera SYN02 相符；單源 thin。
- 23893 Ten：borderline（無文案，x／y／z 全憑標籤）；label 欄是藝人名，應為自行發行；單源 thin。
- 23894 Phantoms：borderline（IDM／downtempo 無文字依據）；label 欄是藝人名，Discogs 為 Not On Label；單源 thin。
- 23895 A Sparkle On The Dark Water：borderline 傾向汰（post-punk.com 直述 warm、honey-sweet、無冷漠疏離，落恍惚）；label 應更正為 Fruits de Mer Records（Discogs cat 78）；雙源 full（post-punk.com＋Non Solo Prog Rock）。
- 23896 Spiritual Paralysis：keep（作者自述創作停滯、dark ambient、鼓只在第 2、7 首）；label 欄是藝人名，自行發行；單源 thin。
- 23897 The Fall and Rise：borderline（dubstep／trip hop 標籤，x 無依據）；label 欄是藝人名，自行發行；單源 thin。
- 23898 Imperial Dunes：borderline（有吉他貝斯鼓，shoegaze 與 dream pop 往暖／往重皆有可能）；label 應更正為 Mojave Beach Records（黑膠，Discogs）；單源 thin。
- 23899 Shyness：keep（文案直述 sub-aquatic、殘響、低頻震房間；pulsing low end 判脈動非舞池拍）；label co:clear 可保留，補 Theory Therapy；單源 thin。
- 23900 Apex：borderline（無鼓，但作者簡介自稱 warm／euphoric，旋律為重心）；label 應更正為 A Strangely Isolated Place（ASIPV005）；MB 首發 2016-06-10 與 Bandcamp／Discogs 2016-07-29 不同，只寫 2016；單源 thin。
- 本組 WebSearch 3 次用完（GWAFAA 1、PINHDAR 1、CHANTSSSS 1，後者無結果）；其餘二手來源經 WebFetch 與 curl 取得。

## 研究 a 組（23881–23890）
- 23881 Halou《Wiser》：thin／borderline。聲音僅標籤（trip hop、dream pop、electrogaze、breakbeat），無樂評；label 欄 Halou 是帳號名，維基指實際廠牌 Nettwerk（單源），建議更正。
- 23882 Hong Kong Express《2047》：full／keep。Bandcamp 文案＋聽眾留言＋維基 Dreampunk；30:02 恰在 30 分線上。country gb 僅依 Dream Catalogue 倫敦，建議不寫國別。
- 23883 Lund Quartet《Lund Quartet》：full／borderline。The Skinny 評「too smooth and comfortable」、旋律性轉盤，y 預估 0.8 存疑（宜 0.3–0.5）；年份 MB 2011-12／Skinny 2012／Bandcamp 2013-09 三說不一，卡單取 2011 未推翻也未證實。
- 23884 Sync24《Comfortable Void》：full／borderline。L'altromondo 稱有可舞段落、Segerstad 原意做中快速，x 預估 1.8 偏低；推翻卡單 label：2012 原版是 Ultimae Records，Leftfield 是後來 Bandcamp 重發版。
- 23885 CASHFORGOLD《manic pixie nightmare》：thin／borderline。單源（無文案、無樂評），有人聲旋律的暗流行；label 欄是藝人名，Bandcamp 無廠牌。
- 23886 Lulu Rouge《The Song Is In The Drum》：thin／borderline。單源；聽眾留言「lighter、sometimes poppy」＋五位客座歌手，z 存疑；label 欄是團名。
- 23887 Sync24《Omnious》：thin／borderline。僅 Bandcamp 頁，聲音無任何評述，無鼓預估未證實；身分與廠牌 Leftfield（LFTFLD19）相符。
- 23888 Lauge《Latitudes》：thin（近單源）／keep。現場 drone、8 軌無後製、標籤 dark ambient＋noise；推翻卡單 label：Lauge & Baba Gnohm 是帳號名，出版方 Fallen Metropolis。
- 23889 ASKII《Obscura》：thin／borderline。單源；D&D 地牢配樂、管弦旋律，z 存疑；曲目 17 首＋一條連播檔。
- 23890 worriedaboutsatan《Blank Tape》：full／borderline。維基：樂團自述融合 glitch、techno、rock、metal，同人《Bloodsport》已因 aggressive 被汰，x 預估 2.1 存疑，建議降權或汰換。
- 本組 WebSearch 3 次（Lund Quartet、Sync24、CASHFORGOLD〔無結果〕）；其餘經 WebFetch／curl（Bandcamp ld+json、MB API、維基、Sonic Immersion、The Skinny）。維基 REST API 被限流，改走 WebFetch。
