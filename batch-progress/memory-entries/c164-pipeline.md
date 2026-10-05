### 2026-09-19｜dip-vinyl-shop｜c-164（Blue Note 2016–2020）五層管線走完，41 張

**改動摘要**：切片 45 張走完五層，**收 41 退 4**（a 22、b 19）。
身分 41/41 pinned、**簡介 41 張全 full 且字數 193–239**、封面 40/41、
⚠ **串流 41/41、零張走無來源狀態（3 張人工回收）——本線第二批滿分**。
**年份改判 1 筆**：`Rick Margitza《Hope》` 2020→1991（紙本新片欄＋樂評欄＋榜單六期三重釘死）。
本批 apex 0 張、無合輯、例外欄全空。

**主要檔案**：`desc-tools/batches/{cards,research,hooks,input,output}/c164-*.json`、
`batch-progress/c164/{prop-a,prop-b,slice,caa,apple-candidates,rulings,evidence-a,HANDOFF}`、
`batch-progress/probe/previews.json`。

**驗證結果**：`chk-prop` 標記 0、`qa-batch research/hooks/out c164` 三層全清、
`chk-hook-crossgroup` 41 張全過且開頭四字互異、`qa-check-research` 兩檔標記 0 且 **hook 原封開頭 41/41**、
`fix-spacing` 兩檔待補 0。

**五條值得記住的**：
1. ⚠ ⚠ **第 1775-B 條：`0→0` 的第五種成因——碟在店面裡、`lookup` 命中，但搜尋索引整個撈不到它。**
   `Akinmusire《Origami Harvest》` 十五個市場 `lookup` 全回同一筆，而裸名 `/search` 回 27 筆就是沒有這張、UPC 三種寫法全 0。
   **處理順序因此改成：先看 `apple-candidates.md` 有沒有候選 id 直接 lookup → 再裸名多市場反查 → 再 UPC。**
   **「`/search` 回 0」對「這張碟在不在架上」幾乎沒有證據力。**
2. ⚠ **第 1784-B 條：`0→0` 也可能只是那一輪被 Apple 節流了**（`tried` 欄會留 `ratelimited-after-retries`）。
   **判斷成因之前先看同一輪其他卡有沒有那個字樣。** ⚠ **觸發者是主線自己**——誤判探測鏈已死、重啟一支，一度兩支同時打 Apple。
3. **第 1779-B 條：反同構限制的是「骨架」不是「題材」。** 本批有三張現場錄音，骨架鎖一張、另兩張換主結構，
   **三張的現場事實都沒有因此被省略。**
4. **第 1780-B 條：字元預算要逐項 `Array.from` 實測，係數不可繼承**——三批實測方向會翻轉
   （c-163 高估、c-164 a 低估 15%、c-164 b 低估 12–30%，有一張手算 213／實測 276）。
5. **第 1789-B 條：兩個「規則死路」要在上游處理**——「某媒體年終榜第一名」在寫作層無解
   （媒體名不得進正文，拿掉又變成 QA 要掃的不具名清單），研究層要直接標成不可用；
   逐字引語含第二人稱會踩禁語表，鉤子層應先轉成間接引語。
