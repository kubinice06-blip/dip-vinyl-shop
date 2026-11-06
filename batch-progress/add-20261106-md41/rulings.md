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

## 研究 c 組（23901–23910）
- 23901 Muslimgauze《Satyajit Eye》：thin／borderline。Bandcamp 文案自述 desert-like 節奏、warm、sun-covered dunes，且三首為《Vote Hezbollah》重混（有拍）；重／冷無支撐，傾向汰換。DAT 換封套故事單源。年份 1993／Staalplaat 成立（維基列表）。
- 23902 worriedaboutsatan《Glass Infinites》：thin／borderline。靜成立（文案「drifty beatless」，Minibrute 2）；重、冷無直述。卡單 label 欄是藝人名，MB 廠牌為 This Is It Forever，建議更正。
- 23903 HEXSYSTEM《Amanita Ocreata》：thin／borderline。文案主角是鋼琴與合成器，鼓與電吉他僅「briefly」；y 有判輕風險。label 欄是藝人名，MB／Bandcamp 為 Stereokroma。單源。
- 23904 S1gns Of L1fe《The Age of Cymatics》：thin／borderline。八首 7–9 分鐘長曲，但文案無聲音直述，psybient／space music 有判暖判輕風險；廠牌 Synphaera（SYN18）成立。
- 23905 defrag《drown》：thin／drop。文案自述 exciting, fast-paced structures、analogue warmth、cinematic strings，標籤 breakcore／dubstep／IDM；建議汰換。卡單 country us，Bandcamp 地點 Lappersdorf、MB 發行國 DE，建議改 de。
- 23906 State Azure《Pale Light of a Hollow Moon》：thin／keep（低信心）。長曲＋Blade Runner／cyberpunk＋雨聲；總長 206 分含 1 小時 50 分混音版（單曲約 96 分）。單源。
- 23907 Leandro Fresco & Rafael Anton Irisarri《La Equidistancia》：full／borderline。失真和聲、磁帶循環、crushing depths 成立靜重；文案反覆 warm，z 疑偏中性至暖。label 欄是藝人名，MB／維基為 A Strangely Isolated Place（ASIPV008），建議更正。
- 23908 Appleblim《Liminal Tides》：full／drop。廠牌與藝術家文案皆「warm harmonic analogue chords」「buoyant」、曲名 Warmth；靜重成立但落恍惚，建議移作 ml 格候選。
- 23909 Sphäre Sechs《Extradimension》：full／keep。Sonic Immersion：non-rhythmic、darker shaded、hypnotizing drone；label 欄『Martin Stürtzer』是人名，Echo Elberfeld 為廠牌，建議更正。
- 23910 本組方法：WebSearch 3 次（worriedaboutsatan〔無結果〕、Sphäre Sechs、Appleblim）；其餘 curl／WebFetch（Bandcamp ld+json、MB、維基、synphaera.com、Sonic Immersion、Turner 電子報）。MB 的 Muslimgauze 廠牌查詢連線失敗；AllMusic／Discogs 403、DuckDuckGo 要驗證，未繞過。共用 scratchpad 目錄曾與他組撞檔名，已改用 md41c-own 自有目錄重抓。

## 主線研究後汰換（不佔條號；2026-11-06）
- 判準照 md37 先例：研究稿以來源直述**有拍推進／舞曲感**、**判輕（乾淨、smooth）**、**判暖（warm、euphoric、buoyant）**的汰；只是「聲音只有標籤、邊距未知」的留給評分驗收。單源 thin 不汰（本線卡是依收聽人數挑的，故事薄照實寫短稿）。
- **汰 11 張**（存 `dropped-cards.json`／`dropped-research.json`）：
  - 能量：Sync24《Comfortable Void》（研究 a：L'altromondo 稱有可舞段落、作者原意中到快速）、worriedaboutsatan《Blank Tape》（研究 a：樂團自述融合 techno 與 metal）、defrag《drown》（研究 c：文案 fast-paced、breakcore／dubstep，另含 analogue warmth）、Muslimgauze《Satyajit Eye》（研究 c：三首為《Vote Hezbollah》重混有拍，文案寫 warm 沙丘）。
  - 判輕：Lund Quartet《Lund Quartet》（研究 a：The Skinny「too smooth and comfortable」）。
  - 判暖：Lulu Rouge《The Song Is In The Drum》（研究 a：lighter、poppy，五位客座歌手）、Good Weather For An Airstrike《Kenopsia》（研究 b：旋律導向、人聲長笛）、PINHDAR《A Sparkle On The Dark Water》（研究 b：post-punk.com「warm electronic elements」「steering clear of cold detachment」）、Merrin Karras《Apex》（研究 b：作者自述 warm、euphoric）、Leandro Fresco & Rafael Anton Irisarri《La Equidistancia》（研究 c：文案反覆寫 warm、Fresco 的暖色旋律）、Appleblim《Liminal Tides》（研究 c：warm harmonic analogue chords、buoyant，曲名〈Warmth〉）。
- **研究層更正已改進卡單（label）**：worriedaboutsatan《Glass Infinites》→ This Is It Forever、HEXSYSTEM《Amanita Ocreata》→ Stereokroma、Sphäre Sechs → Echo Elberfeld、Lauge《Latitudes》→ Fallen Metropolis、Halou《Wiser》→ Nettwerk（維基單源）、LANDROID → Mojave Beach Records（黑膠）、CHANTSSSS → co:clear／Theory Therapy；Cinephile、State Azure 兩張、Moth Equals、CASHFORGOLD、HEXSYSTEM《Spiritual Paralysis》→ self-released。
- 不補位。定案 **18 張**。留給評分驗收的邊距風險：ASKII《Obscura》（管弦旋律、z）、HEXSYSTEM《Amanita Ocreata》（鋼琴、y）、LANDROID（有鼓、x）、CASHFORGOLD（witch house 拍）、Moth Equals（dubstep 拍）、Hong Kong Express《2047》（30:02 剛好過線）。

## 鉤子層（c）（23936–23940）
- **23936** 交件：`desc-tools/batches/hooks/add-20261106-md41-hooks-c.json`（5 張，張數以研究稿為準）。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；上限 thin 170、full 230。逐筆（預算／hook 原始字元／加權）：Glass Infinites 167／28／28（thin）；Amanita Ocreata 163／15／15（thin）；The Age of Cymatics 165／21／21（thin）；Pale Light of a Hollow Moon 166／25／21.5（thin）；Extradimension 226／25／25（full）。初稿 5 張全超標（225–277），整格捨去：Glass 的 Sophie Green 小提琴、This Is It Forever 廠牌名、11 首 40 分鐘、「頭要炸開」；Amanita 的 Turgeon／Studio Pierre Marchand、Mycelium、12 首 42 分鐘；Cymatics 的 2015 創立與 Don Tyler（歸 b 組 Meridian）、曲名、63 分鐘；Pale Light 的〈A Memento for Blade Runners〉、Cameron Straatsma 署名、轉場新做；Extradimension 的 Wuppertal、曲長、Don Tyler 母帶。壓完回核：hook 依賴格全在 g1／g2（Glass 燒灼＋感冒＋Minibrute 錄音併進 g2；Amanita 蕈類／宇宙曲名在 g2，hook 原寫「菌絲」踩空〈Mycelium〉已捨，改「蕈類」；Pale Light 懸疑收尾＝作者指定連續混音、多出 30 多分鐘，前移到 g2；Extradimension 特雷門琴現場錄製在 g2）。hook 自驗：Glass 的感冒研究稿是「大概」，hook 寫「八成」、note 寫「大概」。label 依卡單現值；State Azure 是 self-released，note 只寫自行發行。
- **23937** 骨架歸屬（本組 5 條，各張只寫自己的歸屬句）：Glass Infinites＝病中唯一受得了的素材做成專輯；Amanita Ocreata＝標題概念（曲名在蕈類與宇宙間擺盪）；The Age of Cymatics＝廠牌創辦人的個人回歸作；Pale Light of a Hollow Moon＝直播中做出、連續混音才是指定聽法；Extradimension＝特雷門琴領軍的現場即興錄音。與 a、b 組已交 13 條（夫妻組團、短篇劇情文案、witch house 歌名、自家廠牌編號、聲道限制、地城路線、科幻世界觀、同名十、一句自介、創作停滯、取樣版權欄、沙漠小鎮、低頻私密）不撞。
- **23938** 同人／同廠牌分軸：HEXSYSTEM——b《Spiritual Paralysis》帶生平（創作停滯、第八張、又名 u m a m i、弦樂編制），c《Amanita Ocreata》帶標題與編制比例（鋼琴＋合成器為主，提琴、鼓、電吉他短暫）；Alan Whelan／Solitaire Studio 只留 b。State Azure——b《Phantoms》帶身分（一人英國計畫、一句自介），c 帶錄製（直播、連續混音、雨聲）。Synphaera——b《Meridian》帶 2015 創立、兩位創辦人、SYN02、Tyler 母帶；c《Cymatics》只帶 Bryant 個人回歸與 SYN18。Don Tyler 母帶三張皆有，只留 b。hook 四型：場景（Glass）／斷言（Amanita、Extradimension）／人物定調（Cymatics）／懸疑（Pale Light，收尾見 23936）。
- **23939** 引入法與第二句句型配表（c 組；a、b 組句型見其 note）：Gavin Miller＝「他是…創立」；Tomchuk＝掛名欄「作曲與混音都掛…也就是」（避開 b 的「…是蒙特婁的…」）；Bryant＝「背後是」；State Azure＝「以…為題」（避開 b 的「是一人…的英國…計畫」）；Sphäre Sechs＝「自…起合作」。避開 md37 用過的「以…之名」「這個名字屬於」。「日」後一字：Glass 釋、Cymatics 編、Pale Light 先、Extradimension 經；Amanita 只寫到年。與 a 組（交、在、首、由、推、上）、b 組（問、發、放、自、面）不撞（Glass 原寫「問世」撞 b 的 Meridian，已改）。
- **23940** 自查：c 組 5 個 hook 對全批 18 張 hook＋a、b 組 note、md36–md38 全部 hooks 中文 4-gram 0 撞；hook 與自己 note 無逐字重複句（Glass「只聽得下」已從 note 改掉；Extradimension 只剩樂器名「特雷門琴」）。`node qa-batch.mjs hooks add-20261106-md41` 全部通過；`node chk-hook-crossgroup.mjs add-20261106-md41` 全部通過（3 組 18 張；只報不擋：Extradimension「沒有節奏」是聲音內容，非校對痕跡）。本段先於 a、b 組的鉤子裁定寫入，寫作層以兩段合讀為準。

## 鉤子層（a、b）（23931–23935）
- **23931** 交件：`desc-tools/batches/hooks/add-20261106-md41-hooks-a.json`（6）、`-b.json`（7），共 13 張，張數與 key 順序照研究稿。預算公式同 23936：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；上限 thin 170、full 230（僅 Hong Kong Express 為 full）。逐筆（預算／hook 原始字元／加權）：Halou 168／26／21；Hong Kong Express 220／25／21.5（full）；CASHFORGOLD 154／28／22；Sync24 170／22／20；Lauge 161／24／21；ASKII 159／28／28；Ascendant 163／22／22；Cinephile 167／24／19；State Azure《Phantoms》159／17／17；HEXSYSTEM《Spiritual Paralysis》169／21／21；Moth Equals 161／19／19；LANDROID 170／23／23；CHANTSSSS 163／21／21。初稿 13 張全超標（198–343），整格捨去：Halou 的 11 首 54 分、〈Oceanwide〉、dream pop、1997；HKE 的車廂兩端、DREAM_34、回歸五十年期限（聽眾解讀）、dreampunk 名稱由來；CASHFORGOLD 的客座 Mary Mortem／ANGELHEX、13 首；Sync24 的 2007、曲數曲長、acid／drone 標籤、目錄號字串；Lauge 的 Fallen Metropolis、Villuis 母帶；ASKII 的 17 首 66 分、巫妖王首都細節；Ascendant 的發行日、Tyler 母帶、〈Liquid Memory〉、2015 創立；Cinephile 的 Inglis 製作、錄音地點、曲名；HEXSYSTEM 的 u m a m i、Solitaire Studio、曲名；Moth 的曲名；LANDROID 的 Mazzaschi、Mojave Beach 黑膠；CHANTSSSS 的 ambient pop、小寫曲名、Ben Bondy。壓完回核：hook 依賴格全在 g1／g2（HKE 的九龍霧與列車前移到 g2；CASHFORGOLD 歌名前移到 g2；ASKII 地城路線在 g2；CHANTSSSS 低頻震房間前移到 g2；Lauge 補回「現場」；Cinephile 補回 10 首）。hook 自驗事實：CASHFORGOLD 曲名是「多為」小寫，hook 原寫「全小寫」改「小寫」；ASKII 終點是崇拜巫妖王的失落首都，hook 原寫「巫妖王的城」改「巫妖王信眾的失落首都」；Ascendant「星球上」無出處，改「一萬年後、一萬光年外」；LANDROID「輪流佔上風」超出簡介，改「游移在…之間」。label 照卡單現值；self-released 五張（CASHFORGOLD、Cinephile、State Azure、HEXSYSTEM、Moth Equals）與 ASKII（卡單欄是藝人名）note 不寫廠牌。
- **23932** 骨架歸屬（本組 13 條，各張只寫自己的歸屬句）：Halou＝夫妻檔從 shoegaze 團轉 trip hop；HKE＝電影啟發的別名＋文案短篇劇情（dreampunk 源流角色＝源頭廠牌的早期作）；CASHFORGOLD＝witch house 歌名寫執迷；Sync24＝樂團成員的個人名義上自家廠牌；Lauge＝限 8 聲道、一次錄完無後製；ASKII＝為桌遊寫的地城配樂；Ascendant＝廠牌創辦人名下計畫＋廠牌文案的科幻世界；Cinephile＝數字十（日期／曲數／盤名）＋旁白末曲；State Azure《Phantoms》＝一句自介的單人計畫；HEXSYSTEM《Spiritual Paralysis》＝創作停滯成題材；Moth Equals＝取樣拼貼首作（版權欄）；LANDROID＝沙漠小鎮的地方感；CHANTSSSS＝大音量卻私密的首張。與 c 組五條不撞：Lauge 的「聲道限制＋一次錄完」對 Sphäre Sechs 的「特雷門琴領軍即興」分軸；Ascendant 的世界觀對 Cymatics 的振動主題、Pale Light 的《銀翼殺手》分軸。hook 四型：人物定調（Halou、LANDROID、State Azure）／場景（HKE、ASKII、Ascendant）／斷言（CASHFORGOLD、Lauge、Cinephile、HEXSYSTEM、Moth Equals）／懸疑（Sync24 收尾＝曲名與目錄號在 g2；CHANTSSSS 收尾＝廠牌文案的低頻與私密在 g2）。
- **23933** 同人／同廠牌分軸照 23938：HEXSYSTEM b 帶創作停滯＋第 8 張＋編制（u m a m i、Solitaire 已捨，不與 c 爭）；State Azure b 只帶身分與曲風；Synphaera b 帶兩位創辦人與 SYN02（2015 與 Tyler 母帶壓預算時已捨，c 也不寫，該格整格空出）。全批無同人三張以上，不配「他／她」表；性別不明者（Moth Equals、State Azure、CHANTSSSS、LANDROID）note 不用代名詞。
- **23934** 第二句句型配表（a、b）：Halou「這對夫妻…組的團」；HKE「是…的別名」；CASHFORGOLD「在…首發」；Sync24「他也是…的一半」；Lauge「以…為名」；ASKII「…起轉做」；Ascendant「名下的計畫」；Cinephile「這個…計畫」；State Azure「由一人…」；HEXSYSTEM「用…發表」；Moth Equals「來自英國」；LANDROID「住在…小鎮」；CHANTSSSS「這是…首張」。與 c 組（創立／都掛…也就是／背後是／以…為題／自…起合作）不撞。「日」後一字：Halou 交、HKE 在、CASHFORGOLD 首、Sync24 由、Lauge 推、ASKII 上、State Azure 放、Moth 自、CHANTSSSS 面、Cinephile（hook 內）發；Ascendant、HEXSYSTEM、LANDROID 只寫到年；與 c 組（釋、編、先、經）不撞（23939 記的 Ascendant「問」已隨發行日一併捨去）。
- **23935** 自查：13 個 hook 互掃中文 4-gram 0 撞，對 c 組 hook／note 0 撞；對 2026-10、11 月全部既有 hooks 掃出 7 處（自家廠牌、現場錄音、只有一句、一首器樂、全是器樂、那段日子、不出東西），hook 全部改字歸零；hook 與自己 note 無逐字重複句（Sync24「深海冥想」、HEXSYSTEM「創作停滯」、Moth「版權欄寫」已從 note 改掉）。全批 18 張開頭前四字互異，也不與既有 hooks 開頭相同。`node qa-batch.mjs hooks add-20261106-md41` 全部通過；`node chk-hook-crossgroup.mjs add-20261106-md41` 全部通過（3 組 18 張；hook 加權 15–28、note 152–228；只報不擋：CHANTSSSS「並不安靜」是廠牌文案原意、屬內容）。
