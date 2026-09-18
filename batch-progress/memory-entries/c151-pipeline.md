## 2026-09-18 — dip-vinyl-shop — c-151 走完雲端段（Blue Note 1992–94，38 張）

- **改動摘要**：切片 45 張**收 38 退 7**。**退掉的七張全是舊號段的 CD 化再發／重編，
  `chk-prop` 一個燈都沒亮**——抓出來靠 Discogs 的 `format`／`notes` 欄與東芝 EMI 復刻的號段特徵。
  **封面 28/38、試聽 27/38（11 張固定無來源狀態）。**
- **主要檔案**：`batch-progress/c151/`（prop-{a,b}、chk-prop.mjs、slice.json、caa.json、rulings.md、
  apple-candidates.md、HANDOFF.md）、`desc-tools/batches/research/c151-{a,b}.json`、
  `hooks/c151-hooks-{a,b}.json`、`input/c151-writer-{1,2}.json`、`output/c151-out-{1,2}.json`。
- **驗證結果**：`chk-prop c151 a b` 38 張 28 位標記 0；`qa-batch out c151` 38 張與卡單相符、全部通過
  （out-1 190–239／out-2 209–239）；hooks 兩支全過（加權 17–35、note 254–350）；`fix-spacing` 待補 0。
  **發行年逐筆比對 38/38 相符。**
- **⚠ 這一段已經不是黑膠時代**：38 張裡只有兩張有同期黑膠，**而且方向相反**
  ——《3-D Lifestyles》以黑膠十軌為準（CD 多一軌隱藏加軌）、**《Hand Jive》以 CD 十軌為準
  （黑膠只有 6 軌、曲序全重排，是刪節版）**。**第 1135 條：後批不得預設「黑膠＝原盤＝完整版」。**
- **⚠ 六張的首發在日本**（TOCJ-5562／5563／5564 是連號三張），**六張都已補 `queryAlias`**；
  另《Play》的日本題名是《Play - スペイン》。**「先查 TOCJ 再下首發地結論」在這一段已是固定動作。**
- **⚠ 研究層擋下策展層八處正文錯**，最嚴重的是**《Nighttown》被寫成雙次中音六重奏**
  ——實為七重奏、只有一支次中音，**策展層把它與 c-149《Weaver of Dreams》的班底混了**。
- **⚠ 第 1134 條（給所有後批）**：策展層判《Michel Petrucciani (Live)》「兩刊零命中」是錯的，
  **Cash Box 1994-11-19 p16 有整則評介**——漏查成因是 **OCR 把人名打成「PETRUCCIAN1」**。
  **`I`↔`1`、`l`↔`1`、`O`↔`0` 是固定錯法，「紙本零命中」在試過變體之前只是待證的宣稱。**
- **⚠ 第 1136 條（管線補洞）**：研究層採信的串流 id 先前**沒有回寫 `previews.json`**，
  鉤子層才發現兩邊對不起來。主線補做了 c-148～c-152 五批共 22 個 id 的回寫，
  並記下兩個實作坑：**研究層寫法不統一**（「串流採信」與「採信」兩種）、
  **合訂版要用 `discNumber` 選片**（Lagrène 採信的是三片合訂版的第 2 片）。
- **⚠ 掛名裁定（第 1131 條）**：`The Benny Green Trio`（Group）與 `Benny Green`（Person）
  **是兩個不同的 MB 實體，兩個字串都留**——這不是第 307 條的分裂。
- **缺的**：封面 10 張（替代來源 10/10 全部查實，⚠ 兩張要避開只有 240×240 或 secondary 的條目）、
  試聽 11 張走固定無來源狀態。
