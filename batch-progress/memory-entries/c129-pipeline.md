## 2026-09-15 — dip-vinyl-shop — c-129 走完雲端段（東南亞軍政府時期，45 張）

- **改動摘要**：店主 2026-09-15「台灣獨立 緬甸 波蘭 做」，點名緬甸，實作時擴成東南亞體制線，
  `lineType: 廣度`。**45 張、35 位掛名**（a 緬甸 16／寮國 7；b 印尼 12／泰國 10），年份 1968–2013。
  **零 §1、零跨批撞卡、45/45 釘住 MBID、§5.6 十張。**
- **主要檔案**：`batch-progress/c129/`（prop-{a,b}、chk-prop.mjs、caa.json、rulings.md、
  HANDOFF.md、apple-candidates.md）、`desc-tools/batches/research/c129-{a,b}.json`、
  `hooks/c129-hooks-{a,b}.json`、`input/c129-writer-{1,2}.json`、`output/c129-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**補 14 筆、撤回 1 筆**）、
  **`batch-progress/probe/match-lib.mjs`（改了 `artistOk`，見下）**、
  `label-lines.mjs` 與 `probe/probe-previews.mjs`（登錄 c129）。
- **驗證結果**：`qa-batch out c129` 45 張與卡單相符、全部通過；`chk-hook-crossgroup` 全過
  （hook 加權 20–35.5、note 239–349）；`fix-spacing --field desc` 兩檔待補 0；`chk-prop` 標記 0。
  desc 160–240（37 full／8 partial）。主線複驗：desc 開頭與 hook 逐字相符 45/45、
  四位中文數字年 0、資料庫與商店名 0、**簡體 0**、跨組開頭四字零重複。
  **封面 37/45；試聽 3 → 23/45（研究層第三種查法找回 14 張）。**
- **⚠ 裁定 330／309：緬甸在 MB 上不是「沒建檔」，是全部建成緬文原文主名。**
  主線開工前用 20 個拉丁轉寫掛名查只回 3 筆，據此下結論「不是查法問題，是 MB 沒建檔」——**錯的**。
  改用 `artist?query=country:MM&limit=100` 列舉後：စိုင်းထီးဆိုင် 名下 40＋ 個 RG、
  ခင်မောင်တိုး 34、ထူးအိမ်သင် 21、ဇော်ဝင်းထွဋ် 9、လေးဖြူ 7，緬甸最後收了 16 張。
  **通則：判斷某國在 MB 上有沒有建檔，一定要先打 `artist?query=country:<ISO>` 列舉實體；
  「N 個關鍵字回 M 筆」在非拉丁文字圈一律不可信。** 這是第 179／250 條的鏡像變形。
- **⚠ 裁定 344：探測層的短掛名假陽性——`match-lib.mjs` 的 `artistOk` 已改。**
  `AKA`《Reflection》1971 被配到 `Nordton a.k.a Nomad`（2017），摺疊後 `aka` 落在
  `nordtonakanomad` 裡就算過，`yearDrift: 46` 也沒擋住，`status` 照樣給 `ready`。
  新規則：只靠 `includes` 成立時，**短的那一邊 ≤6 字元且是純拉丁英數，就必須在長的那一邊整詞出現**；
  **非拉丁不套此規則**（否則 `秋吉敏子` vs `秋吉敏子トリオ` 會被誤擋）。
  `test-match.mjs` 33/33 過，**拿全部 previews.json 跑新舊對照，舊過新擋的只有那一筆**。
- **⚠ 裁定 346：hook 層把 facts 裡的樂評榜單搬進 note，與 `writer-base.md` 的榜單條款打架。**
  寫作層依「以 writer-base 為準」判不寫，正確。**這是第 305 條的鏡像**——
  305 漏出去的是禁寫的人名，346 漏出去的是禁寫的榜單。
- **⚠ 裁定 347／348**：hook 說「三種曲序」但 facts 只有兩種——以 facts 為準、不湊；
  78 轉蟲膠盤不得寫成「母帶」（載體名詞不互換，第 262 條同族）。
- **⚠ 裁定 303 又中兩次**：研究 a 組與寫作 a 組**都在收工回報時被 API 內容過濾／額度砍掉**，
  但**兩份輸出檔都是完整的**（研究 23/23、寫作 23/23 且逐張過驗）。**被擋掉的是回報，不是工作。**
- **研究層擋下策展層多處**：§5.6 兩張的「參與者沒有個人專輯」實查為錯（§5.6 資格不受影響，
  但正文不得沿用那句）；《Laos: Lam Saravane》1978 雙 LP 首版、卡片 1989 是 CD 版；
  《Laos: Musique de l'ancienne cour…》實體 CD 存在但條碼屬數位那筆、不得配到 CD 上；
  Caravan 三張資料庫端記 CD 是後版誤登；Black Brothers 唯一登記 release 是馬來西亞壓片。
- **缺的**：封面 8 張、試聽 22 張無來源（Sublime Frequencies 在店面只有 2016 年後的數位系列、
  沒有任何一張緬甸輯）。ခင်မောင်တိုး《LIVE 94》採的是同場前半的 Vol.1，本機若要求整張涵蓋要退成無來源。
- **下一批**：緬甸還有量（五位緬文掛名名下合計 110＋ 個 RG，這批只取 8 張）；**寮國見底**。
