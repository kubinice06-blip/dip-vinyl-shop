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
