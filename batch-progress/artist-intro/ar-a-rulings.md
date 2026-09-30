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
