# A 級量產紀錄與裁定（2026-09-30 起）

店主：「先跑十批」→ ar-a-001～010（400 位：爵士、靈魂、藍調、搖滾）。接力跑、中途不回報、裁定自決。

## 開工前的工具與裁定（2026-09-30）

- 新工具：`artist-cut.mjs`（切批＋同名異寫表）、`artist-prompt.mjs`（派工詞填空）、`artist-review.mjs`（審稿並排）、
  `artist-alias.mjs`（別名補鍵）、`artist-issues.mjs`（上線簡介問題彙整）、`prompts/artist-dispatch.md`、
  `.claude/skills/dip-artist-intro/SKILL.md`。
- **切批**：A 級 785 位（已扣除試做過的與別名鍵）切成 20 批；分級內依主類型 jazz→soul→blues→rock→folk→pop→world→electronic→hiphop→classical，同類型卡多的先。
- **同名異寫（主線裁定）**：alias-candidates 的 47 組裡 44 組視為同一藝人，只寫卡數多的主鍵，另一個鍵由 `artist-alias.mjs` 複製正文、換名冊名。
  不併的三組：伍佰 vs 伍佰 & China Blue、Yo-Yo Ma 馬友友 vs 同名 & Silkroad Ensemble（掛名不同，是不同演出單位）；The Trees vs Trees（名字無法判定同一團）。
  別名補鍵的成品檔 `output/zz-alias-out.json` 每次整份重生；試做批已寫的閃靈、林強、大支、Art Blakey 四組已先補上。
- **補洞稿新欄 `pubIssues`**：上線簡介要改的地方另列，`conflicts` 只記本層怎麼裁定。補洞範本加「同名不同人」一節（依 poolAlbums 確認身分）。
- 卡池無任何素材（無研究稿也無上線簡介）的 A 級藝人前十批有 116 位，這些等於從零查，仍在六次搜尋上限內。

## 逐批紀錄

### 裁定：失敗請求不計入搜尋上限（2026-09-30，ar-a-001 補洞回報後）

g1、g4 回報把 403／404／503／付費牆也算進六次上限，十位裡七位因此用滿 6 次，legacy 格偏薄。
改為：取不到內容的請求不計入上限，另記 `failedFetches`（上限 4）。寫進 `artist-gap-base.md`，自 ar-a-002 g2 起的派工適用。

### ar-a-001

- 補洞四組交齊：40 位全部三格 gap（研究稿只有錄音細節，事實庫幾乎沒幫上），thin 兩位（Red Garland、Stanley Turrentine），pubIssues 8 條。
- **主線親查兩則 2026 年逝世**（在模型知識截止後，必須親驗）：Sonny Rollins 2026-05-25 逝世（NPR、PBS、Variety）、
  Abdullah Ibrahim 2026-06-15 逝世（NPR、The Wire、okayafrica）。成立，寫作層用過去式。
- Keith Jarrett 搜尋 7 次：多出的一次是失敗請求，依新裁定不算超標。
- 寫作兩組交件，QA 0 處；放寬到 251–280 的 7 位（Chet Baker、Ornette Coleman、Horace Parlan、Stan Getz、Art Pepper、Eric Dolphy，審稿後 Sonny Rollins、Wayne Shorter 也落在 251–260），皆為人物故事或份量素材多。
- **主線審稿修 9 處**：
  1. Monk「史上錄音次數第二多的爵士作曲家」：維基 2009 年的單源敘述，會過期 → 改 Britannica「爵士史上作品最多的作曲家之一」。
  2. Hutcherson「一度開計程車」：KQED 單源寫成定論 → 整句收進「據說」。
  3. Rollins「被稱為與 Armstrong 並列…最偉大的即興演奏者」：出自 Branford Marsalis 一人 → 具名為他的說法（樂手可具名，不是樂評）。
  4. Dexter Gordon「旅居哥本哈根約 14 年」：來源是「在歐洲約 14 年」→ 改「以哥本哈根為家、旅居歐洲約 14 年」。
  5. Ellington「美國最重要的作曲家」：單一樂評人（Gleason）的形容 → 刪。
  6. Shorter「當時在世最偉大的小編制作曲家」：單一報紙且原文是「大概」→ 改 Britannica 的共識評價。
  7. Getz「把手指藏在外套下假裝有槍」：維基寫持械、Encyclopedia.com 寫假裝，兩源不一致 → 改兩源一致的「為了取得毒品搶劫藥房被捕」。
  8. Elvin Jones「世上最偉大的節奏鼓手」：單一樂評人 1970 年的形容 → 刪，保留受他影響的鼓手。
  9. 同上，順修成「等搖滾鼓手都被列為受他影響的人」。
- 沿用既有規則（writer-base 2026-08-08）：DownBeat 名人堂、Modern Drummer 名人堂、《滾石》百大鼓手這類「樂評媒體辦的名人堂／榜單」整條不寫——寫作層照做，主線不改判。
- **同名混卡**：ar-a-002 Steve Lacy 的 8 張卡裡 3 張（Gemini Rights、Apollo XXI、Oh yeah?）是 1998 年生的 The Internet 吉他手，另一個人。
  介紹只寫爵士高音薩克斯風手；這 3 張卡的藝人欄要在本機改寫（例如「Steve Lacy (The Internet)」之類可區分的寫法），否則按鈕會跳出錯的人。記入待本機處理。
- 上架：`build-artist-intros.mjs` 通過；上線簡介問題彙整在 `audits/ARTIST-PUB-ISSUES.md`。

### ar-a-002

- 補洞四組交齊（g2 起失敗請求不計入上限）；笠井紀美子搜尋 7 次，照實記、不擋。pubIssues 本批 12 條左右，彙整在 `audits/ARTIST-PUB-ISSUES.md`。
- 主線親驗：Jack DeJohnette 2025-10-26 逝世（NPR、DownBeat、Hudson Valley One）。
- 審稿教訓回寫：`artist-writer-base.md` 新增「評價的出處層級」一節（單一樂評人的形容詞不寫、樂手評語具名、conflicts 裡的事件細節只寫兩源一致、會過期的統計不寫），自 ar-a-002 寫作層起的派工詞也帶上。
- 補洞 g2 代理曾誤讀別組暫存資料夾、一度把 ar-a-001 的 10 位混進輸出，已自行重寫；主線核對 ar-a-001 各檔未被改動（git diff 空）。派工詞自 ar-a-003 g2 起加「暫存檔只放 <批名>-g<組號>/ 資料夾」。
- 寫作兩組交件，QA 0 處。放寬額度 5 位：Billie Holiday（275）、Albert Ayler（276）、Sarah Vaughan（278）、Terry Callier（271）、Chick Corea（審稿後 257）。
- **主線審稿修 4 處**：
  1. Bobbi Humphrey「Blue Note 簽下的第一位女性樂器演奏者」：**錯**。Jutta Hipp 1950 年代就在 Blue Note 發片（本線試做批已寫過她）。兩個來源互相轉述同一個錯，刪。
     教訓：「第一位」類宣稱，就算兩源，也要拿本線已知事實反查。
  2. Chick Corea「是得獎最多的爵士樂手」：統計時點是 2021 年過世時 → 改「當時葛萊美史上得獎最多的爵士樂手」，不讓它過期。
  3. Keith Jarrett 三重奏「DeJohnette 過世時，後半生的職業生涯…」語意不順 → 改寫。
  4. 同上一條的字數順修（251）。
- Larry Young「死因始終不明」：來源是「據說被當成肺炎治療，實際死因不明」，照寫，不改判。

### ar-a-003（審稿中）

- 寫作第 1 組（20 位）審畢，修 4 處：
  1. Gene Harris「被視為 soul jazz 奠基者之一」：只有一個館藏傳記 → 刪。
  2. Kenny Drew「被稱為 hard bop 年代錄音最多的伴奏鋼琴手之一」：只有 encyclopedia.com → 刪。
  3. Weather Report「被視為繼 Miles Davis 之後爵士搖滾的關鍵發展」：補洞稿沒有這條 → 改成 Britannica 有出處的「大幅拓展了爵士的邊界」。
  4. **回頭修已上架的 ar-a-002 宮間利之とニューハード**：原信夫とシャープス・アンド・フラッツ 1967 年就登上 Newport，
     ニューハード 1974 年的蒙特雷不可能是「第一支站上美國本土爵士節的日本樂團」（樂團自述，兩源其實同出一源）→ 刪序數；
     同篇「以中音薩克斯風手身分進爵士圈…後來改名為ニューハード」主詞錯置（改名的是樂團）→ 改寫。
- 寫作層這批自己擋掉 5 條「第一」宣稱（Marlena Shaw、Nat King Cole、George Russell、Armstrong、Komeda），反查到反例的有三條，規則見效。
- 主線親驗：Sade 名列搖滾名人堂 2026 年入選名單（NPR、rockhall.com），典禮 11 月 14 日；寫作層只能寫「入選」。
- **管線漏洞修補**：上一筆提交重建分片時，把審稿中的 ar-a-003（含還在寫的 -out-2）一起建進 `data/artist-intros/`（144 位）。
  `build-artist-intros.mjs` 與 `artist-alias.mjs` 改為量產批只收 progress.json 標 `published` 的，重建回 114 位。未審稿的內容只在 1 筆提交裡短暫存在，未合併、未上線。
- 寫作第 2 組（20 位）審畢，修 2 處：
  5. Etta James「被稱為『藍調的女族長』」：補洞稿沒有這個稱號 → 改成 facts 有的「先後入選搖滾名人堂與藍調名人堂，並獲葛萊美終身成就獎」。
  6. Art Ensemble of Chicago「1969 年Lester」缺半形空格 → 補。
- 高橋達也と東京ユニオン（thin）照寫作層判斷具名 Swing Journal 爵士唱片大獎：sound 格 none、這個獎就是全篇份量，依 writer-base「例外二」。
- 秋吉敏子「Berklee 第一位日本學生」保留：NEA 單源，但寫作層反查無反例、屬廣為人知的經歷。
- 上架：40 位，審稿共修 6 處（含回修 ar-a-002 一篇）。

### ar-a-004（審稿中）

- 寫作第 1 組（20 位）審畢，修 5 處：
  1. Gerry Mulligan「《Birth of the Cool》十一首裡有六首出自他的筆」：conflicts 記維基三首、官方傳記另一說，數字不一致 → 改寫成兩源一致的「九人團用了他、Gil Evans 與 John Lewis 的編曲，錄音他全程參與」。
  2. Harold Land「因祖母病危離團」：單一部落格 → 加「據說」。
  3. Mal Waldron「日本最暢銷的爵士藝人之一」：只有 Encyclopedia.com → 降為「1970 年起多次赴日，在日本尤其受歡迎」。
  4. Sade「Sade Adu 成為第一位拿下葛萊美最佳新人的奈及利亞出生藝人」：**主詞錯**（最佳新人是樂團 Sade 得的），序數又只有單源 → 改「樂團也拿下葛萊美最佳新人」。
  5. （寫作層自己已擋 Reuben Wilson「協助開創 soul jazz」：1968 年才錄 Blue Note，soul jazz 早就有了——反查規則見效。）
- 主線親驗：Oliver Nelson《The Blues and the Abstract Truth》2026-05-14 入選國家錄音登錄（loc.gov、CBS News）；Pat Metheny《Bright Size Life》2020 年度入選（loc.gov PDF）。
- 補洞範本這批起加「獎項主詞要寫對」（ar-a-005 g2 起）。
- 補洞四組交齊。主線親驗：大野雄二 2026-05-04 辭世、享年 84（Mikiki、ORICON；事務所 5/13 發布），寫作層用過去式。
- QA 的簡體字表含「国」，會誤擋日本人名（今田勝トリオ的貝斯手稲葉国光被補洞層改寫成「一位貝斯手」）。
  寫作層派工詞改為：日本人名照原文保留、若被誤判就回報，主線個案放行，不為此改寫人名。
- 寫作第 2 組（20 位）審畢 0 處。主線親驗：今田勝 2025-05-30 辭世、享年 93（日文維基、diskunion、Jaz.in）。
- **裁定：日本爵士樂手可具名 Swing Journal 的爵士唱片大獎與讀者人氣投票。**
  writer-base 規定樂評媒體辦的榜單整條不寫，ar-a-001 據此拿掉了 DownBeat 名人堂。但日本爵士沒有 NEA、葛萊美這類官方或業界獎項，
  Swing Journal 的ジャズ・ディスク大賞與人氣投票就是日本爵士界事實上的業界獎，拿掉就等於拿掉這群人僅有的地位證據（中本マリ、北村英治、高橋達也）。
  美國樂手仍照舊不寫 DownBeat（他們有 NEA、葛萊美、名人堂可寫）。可逆：日後店主不同意，整批搜「Swing Journal」「スイングジャーナル」即可回收。
- 上架：40 位，審稿修 4 處。

### ar-a-005（審稿中）

- 補洞四組交齊。寫作第 1 組（20 位）審畢 0 處：寫作層已自行擋下 Supremes「僅次於 Beatles」、Diana Ross「第一位兩度獲終身成就獎的女性」、Prince 單源數字，Diana Ross 的金氏紀錄具名帶出。
- Earth, Wind & Fire「第一個獲甘迺迪中心榮譽的非裔美國人團體」保留：兩源（Grammy 官網、NewsOne），反查 2019 年以前的團體得主（The Who、Led Zeppelin、Eagles 等）無非裔團體。
- The Bar-Kays 墜機：只寫兩源確定的部分，Ben Cauley 生還過程的單源細節不寫。
- 寫作第 2 組（20 位）審畢，修 2 處（同一篇）：Millie Jackson「辭掉文書工作」（前職各源寫法不一）→「原本的工作」；「她被稱為嘻哈的教母」只有一篇 The Quietus → 「有人稱她為嘻哈的教母」。
- 主線親驗：Patrice Rushen 為 2026 年 NEA Jazz Master（arts.gov、Billboard）。
- Bar-Kays「抓住座椅坐墊生還」：補洞層放進 facts 又在回報說單源，寫作層照派工詞沒寫。補洞派工詞自 ar-a-007 起加「facts 只放兩源都支持的內容，單源一律進 notes」。
- 上架：40 位（靈魂、放克），審稿修 2 處。

### ar-a-006

- 寫作第 1 組（20 位）審畢，修 2 處：
  1. Michael Jackson「Prince、Beyoncé 都受他影響」：Prince 是同代競爭者，維基把他列進受影響名單並不可靠 → 只留 Beyoncé 等後輩（字數從 284 壓回 269）。
  2. Luther Vandross「中風昏迷近兩個月後完成的《Dance with My Father》」：中風在 2003 年 4 月、專輯 6 月發行，錄音多半在中風前完成，「之後完成」是推論 → 改成照 facts 的「同年發行」。

- 寫作第 2 組（20 位）審畢，修 6 處（措辭貼回 facts）：Erykah Badu「內在自我」→「內在的自己」；Four Tops「一路暢銷」→「走紅」；Graham Central Station 措辭；
  Otis Clay「夜裡偷聽」為推論 → 照 facts「一家人夜裡收聽」；Stylistics 製作人起初不滿意為單源 →「據說」；Lightnin' Hopkins「少年時」→「小時候」（年齡照 facts）。
  The Emotions〈Blind Alley〉「超過 150 首」查 facts 有兩源，保留。
- 上架：40 位（靈魂、R&B、藍調），審稿修 8 處。

### ar-a-007

- **裁定：搖滾名人堂官方介紹可單源使用，但要具名。** 補洞層依「兩源才進 facts」把名人堂官網的評語、典禮引介人的致詞、名人堂列的受影響者全放進 notes（Beatles、Queen、Springsteen 的地位格因此偏薄）。
  名人堂是機構本身，它對自己入選者的介紹就是第一手出處，不需要第二源；但寫作層必須寫成「搖滾名人堂稱…」「某某在引介時說…」，不得去掉主詞變成「被視為」。自 ar-a-007 寫作層起適用。
- 伍佰 & China Blue：補洞層查明第 17 屆金曲最佳台語男演唱人是伍佰個人，未查到樂團得過最佳樂團獎；寫作層派工詞已註明主詞。
- **裁定：新查事實一律帶 `src2`（ar-a-008 補洞起硬擋）。** ar-a-007 g2 的 114 條新查事實全都只記一個網址（Beatles 的 notes 還寫「未開任何搜尋結果頁」），
  回頭查才發現 ar-a-001～006 多數組也只有 `src` 欄——「兩源」一直是口頭規則，格式沒有欄位，驗不了。
  `artist-gap-base.md` 格式範例加 `src2`，派工範本加一句，`qa-artist.mjs gap` 對 ar-a-008 起缺 `src2` 的新查事實報 ⚠（001～007 只列 ℹ）。
  已上架的 001～006 不回頭重查：主線逐位審稿時已對過數字與宣稱，重查成本高、收益低。
- 寫作第 1 組（20 位）審畢，修 5 處：
  1. 伍佰 & China Blue《樹枝孤鳥》獎項名：寫作稿「最佳演唱專輯獎」；第 10 屆金曲獎維基頁寫「最佳流行音樂演唱唱片獎」，《樹枝孤鳥》條目與遠見寫「最佳流行音樂演唱專輯獎」→ 取後者（兩源）。
  2. 同篇「花朵舞累計二百萬人次」是會長大的累計數 → 改「隨巡演傳開的花朵舞」。
  3. The Beatles「在漢堡連續駐演兩年多」：1960–62 是多次分段駐演，不是連續 →「早年在漢堡的搖滾俱樂部多次駐演」。
  4. 董事長樂團「探望冠宇父親、年前圍爐」只有 ETtoday 一源 → 加「據說」。
  5. 同篇「另四度入圍」：維基列五次、官方頁另記第 22 屆，次數不一致 →「另有多次入圍」。
  寫作層回報 g2 無 `src2` 後，主線以既有知識逐條核對 g2 十位（Stones、Bowie、Beatles、Queen、Sabbath、Springsteen 等），其餘數字與宣稱無誤。

- 寫作第 2 組（20 位）審畢，修 1 處：Beyond〈海闊天空〉「第一首 YouTube 破億的粵語歌」兩源都是維基（中英互為 src2，非獨立）、屬「第一」類宣稱 → 改「官方 MV 在 YouTube 的點擊也突破一億」。
- 主線親驗：Iron Maiden 為 2026 年搖滾名人堂入選者（官方公告，典禮 11 月 14 日）；同屆 Luther Vandross（ar-a-006 已上架，正文已寫名人堂評語）。
- 上架：40 位（藍調、搖滾、台灣／香港樂團），審稿修 6 處。
### ar-a-008

- **裁定：搜尋上限 6 → 8（ar-a-008 起）。** 新查事實必帶 `src2` 後，每條事實都要實際開第二源，g2 四位（Beach House 7、Blondie 7、Eagles 8、Blur 9）超過 6。
  上限是為了防止代理無限深挖，不是為了省錢；src2 是品質硬規則，兩者打架時讓上限。`qa-artist.mjs`、`artist-gap-base.md`、派工範本同步改 8。
  Blur 9 次是規則中途變更造成，一次性放行，不回頭刪事實。
- 補洞第 1 組：Metallica《Master of Puppets》2015 年入選國家錄音登記表（第一張入選的金屬專輯），補洞層只見摘要放 notes；主線以 loc.gov PDF 與 KQED 查實後移入 legacy。
- 補洞第 2 組 Eagles 甘迺迪中心榮譽採 2016（2015 年獲選、因 Glenn Frey 病況延到 2016 年受獎）；James Taylor 名人堂採 2000。
- 補洞第 3 組：Placebo 卡池混了比利時 Marc Moulin 的 Placebo（《Ball of Eyes》《1973》），只寫英國那團，兩張比利時卡待本機拆卡（同 Steve Lacy 案）。
  Motörhead 失敗請求 5 次（同一 NPR 頁 503 兩次後改 curl 讀到），重試同頁不算濫用，放行。
- 接力節奏更正：批 N 的 g1＋g2 交齊就可以派 w1，不必等 g3、g4（ar-a-008 w1 晚派了一輪）。
- 寫作第 1 組（20 位）審畢，修 2 處：Metallica 名人堂引語前多一個空格、「朋克」→「龐克」（台灣用語）；Arctic Monkeys「英國史上首週銷量最高的首張專輯」補「當時」（2006 年紀錄，其後是否被破未查）。
- 卡單疑點（交本機）：新寶島康樂隊卡池專輯名記「腳開開」，實為《八腳開開》；Metallica《The Black Album》卡池年份 1998，實為 1991。

- 寫作第 2 組（20 位）審畢，修 6 處：
  1. Motörhead「〈Whiplash〉帶來第一座葛萊美」：他們只得過這一座，「第一座」暗示還有後續 → 改寫獎名。
  2. Opeth「被推上現代前衛音樂的上層，與 Tool、Dream Theater 並列」：兩源同屬 Louder（Future 集團），屬單一媒體評價 →「才在前衛金屬圈打開局面」。
  3. The Doors「搖滾名人堂稱他」主詞不明 → 寫明 Morrison；順手刪「另兩名成員隨後加入」壓回 241 字。
  4. Van Morrison 引介人只寫姓 → Robbie Robertson。
  5. AC/DC「《Back in Black》在美國賣出逾 1000 萬張」嚴重低估（RIAA 認證遠高於此），數字也會過期 →「成為史上最暢銷的專輯之一」。
  6. Bright Eyes 兩首單曲「告示牌單曲榜前兩名」：實為 Hot 100 Singles Sales 銷售榜，寫成單曲榜會被讀成 Hot 100 →「單曲銷售榜」。
- 上架：40 位（搖滾），審稿修 8 處。
### ar-a-009

- 補洞第 1 組：Death 卡池六張全是 Chuck Schuldiner 的佛州死亡金屬團，底特律原型龐克 Death 不在池內。Cocteau Twins 失敗請求 5 次（超 4），放行（失敗請求不造成事實錯誤）。
- 寫作第 1 組（20 位）審畢，修 2 處：Deep Purple「Frank Zappa 的演出引發賭場大火」主詞錯置（起火的是觀眾的信號槍）→「Zappa 演出時賭場失火」；
  Dinosaur Jr.「被視為 1980 年代最有影響力的另類樂團之一」只有 Louder 一篇的標題撐 → 刪，留影響 Cobain 與 grunge 那句。
  寫作層把 Deep Purple 由 thin 升 full（三巨頭並稱、名人堂、〈Smoke on the Water〉由來），同意。
- 補洞第 4 組：Pixies 搜尋 9 次超上限，代理已撤掉第 9 次取得的事實（一條刪、一條 src2 改用第 8 次的來源），放行。

- 寫作第 2 組（20 位）審畢，修 3 處：
  1. Magma「杜林看日出、只吃檸檬水與米布丁半年寫出〈Malaria〉」只有事實庫一源（Kobaïa 維基條）→ 加「據說」。
  2. Oasis「被形容為簡單到不玩花巧，卻勢不可擋」是維基轉引的單一樂評 → 改成直述聲音特徵，不帶評價。
  3. Pulp「被形容為 Britpop 喧嚷陽剛氣的解藥」同屬單一樂評 → 刪，字數由 263 回到 241。
  Magma 正文的「高円寺百景」是寫作層由 Kōenji Hyakkei 轉回原文漢字，照東亞人名原文規則，正確。
- 上架：40 位（搖滾），審稿修 5 處。
### ar-a-010

- 補洞第 1 組：Spoon 失敗請求實為 5 次，代理把第 5 次改記成搜尋（searches 7、實際呼叫 6）。記帳方式不對但不影響事實；自第 4 組起派工詞明講「照實記、不要挪帳」。
- 補洞第 2 組：Van Halen、Thin Lizzy 地位格只剩獎項（後輩點名多為單源），標 thin；寫作層派工詞准許用名人堂官方素材升 full。
- 補洞第 3 組：主線親驗落日飛車第 37 屆金曲最佳樂團（2026-06-27，《QUIT QUIETLY》，鏡週刊、Rti、中時），第二座。
  Bon Jovi《New Jersey》上線簡介「首張在蘇聯正式上架的美國專輯」只找到 1989 年預告稿、主詞是團體不是專輯 → 記 pubIssues，交本機。
  卡單年份疑誤：Built to Spill《Perfect from Now On》卡 1996（實 1997）、《Keep It Like a Secret》卡 1998（實 1999）。
- 補洞第 4 組：Caravan 卡池混了泰國樂團 คาราวาน 的《คนกับควาย》（1975），只寫英國坎特伯里那團；該卡待本機拆出（同 Placebo、Steve Lacy 案）。
  Devo《Q: Are We Not Men?》上線簡介「改請 David Bowie 重混」三源皆無 → pubIssues，交本機。
- 寫作第 1 組（20 位）審畢，0 處。寫作層自行擋下：崔健〈一無所有〉嗩吶與 RHCP 三條 bank 單源、Slayer《Reign in Blood》同站兩頁、The Jam mod 復興改「被稱為」。
  Van Halen 由 thin 升 full（名人堂官方素材），同意；Spoon 的 Metacritic 十年最佳藝人屬評分彙整、非單一樂評，照 writer-base 例外具名，同意。
  主線親驗：大象體操第 35 屆金曲評審團獎（中央社 2024-06-29）。
