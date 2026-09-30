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
