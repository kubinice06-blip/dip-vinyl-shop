## 2026-09-16 — dip-vinyl-shop — c-138 走完雲端段（Blue Note／UA 1959–63，43 張）

- **改動摘要**：Blue Note 目錄補齊線第四批，**BLP 4000 系列中段**＋經 Liberty／UA 併進來的
  United Artists Jazz／Pacific Jazz／World Pacific／Felsted 原盤。原 slice 45 張、**收 43 退 2**。
  **43 張、30 位掛名、零 §1、全部純 Album。**
- **主要檔案**：`batch-progress/c138/`（prop-{a,b}、chk-prop.mjs、caa.json、slice.json、rulings.md、HANDOFF.md、apple-candidates.md）、
  `desc-tools/batches/research/c138-{a,b}.json`、`hooks/c138-hooks-{a,b}.json`、`input/c138-writer-{1,2}.json`、
  `output/c138-out-{1,2}.json`、**`batch-progress/enum/billboard-bn-1960-62-ocr.txt`＋`cashbox-bn-1960-62-ocr.txt`**（後批共用）。
- **驗證結果**：`qa-batch out c138` 43 張與卡單相符、全部通過；hooks 兩支 QA 全過（加權 30.5–44、note 318–350）；
  `fix-spacing` 待補 0。desc **42 full ＋ 1 partial**（179–240）。**封面 41/43、試聽 43/43（無來源 0 張）。**
- **⚠ 第 526 條（這條線最重要的結構發現）：BLP 號在 4021–4049 這一段完全不等於發行順序**
  ——Cash Box 新片表顯示 4042→1960-11、4048→1961-02、4035→1961-03、**4034《Lee-Way》遲至 1961-04-29**。
  **後續批次一律不得用目錄號回推年份。**
- **⚠ 第 531 條：拆卷盤的時間差比想像中大**。Half Note Vol. 1（1961）／Vol. 2（**1963**）差兩年、
  Minton's Vol. 1（1961）／Vol. 2（**1962**）差一年——**正文不得寫「與 Vol. 1 同年發行」**。
  舉證用的是 **`api.discogs.com/database/search?catno=`（不需 token）**：
  「同一目錄號的美國原壓全部標同一年、且沒有更早年份的壓片」是可重複驗證的實體盤面證據。
  ⚠ 但 c-139 隨即抓到**它會整群繼承同一個錯誤的回填年**（第 550／553 條）——**同期紙本永遠壓過它。**
- **⚠ 第 529／533 條：1961 年的 Billboard PDF 幾乎沒有文字層**（52 期只有兩期可全文搜），
  **Cash Box 是 1961 年唯一可用的替代來源**（每期都有廠牌月度新片列表，週六日期）；**1962 年起 Billboard 也改週六**。
  已寫 `batch-progress/enum/SOURCES-billboard-cashbox.md` 記各掃描檔的**實際**涵蓋範圍——
  **檔名會騙人**（`billboard-bn-1959-61` 實際沒有 1961，c-138 b 為此白跑一輪）。
- **⚠ 第 532 條：合訂盤可以當試聽來源，但那不代表它是同一張碟**。Blakey《Jazz Corner Vol. 1》
  用 2002 年 Vol. 1＋2 合併盤補試聽（取本盤那一軌），**`rgMbid` 不改、正文只講 BLP 4054**。
  第 524 條（算不算同一張碟）與第 472 條（試聽能不能用合訂版）**管的是不同的東西，不衝突**。
- **研究層擋下策展層三處**（《Moods》年份改判被推翻回 1960、Witherspoon 的 Rip Records 說退成「據 Deffaa 的記載」、
  《Ivory Hunters》的 Billboard 引用複驗不到）**＋無出處的「最／第一／唯一」三句**。
- **缺的**：封面 2 張（Soundin' Off、Minton's Vol. 2）。⚠ 兩張試聽版本的軌序與原盤不同（正文按曲名寫）。
- **下一批**：c-135／c-136／c-137 已完成；c-139 鉤子層、c-140 研究層在跑，c-141 待派。
