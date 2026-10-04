### 2026-09-19｜dip-vinyl-shop｜c-170（Blue Note 2016–2026，列舉漏切補批之二）五層管線走完，15 張

**改動摘要**：切片 16 張走完五層，**收 15 退 1**（退的是 EP）。
身分 15/15 pinned、簡介 15/15 全 full（196–220）、**封面 15/15、串流 15/15——本線第二個雙滿批**
（4 張靠人工回撈救回）。本批 apex 0 張、無合輯、例外欄全空。
⚠ **本批 15 張專輯本身 0 獎項，正文實掃 `獎`／`葛萊美`／`Grammy` 全部 0 命中。**

**主要檔案**：`desc-tools/batches/{cards,research,hooks,input,output}/c170-*.json`、
`batch-progress/c170/{prop-a,prop-b,slice,caa,apple-candidates,rulings,HANDOFF}`、`batch-progress/probe/previews.json`。

**驗證結果**：`chk-prop a b` 標記 0、`qa-batch research/hooks/out c170` 全清、
`chk-hook-crossgroup c170` 15 張全過、`qa-check-research` 兩組標記 0、`fix-spacing` 兩檔待補 0、
**首句與 hook 逐字相符 15/15**；八個刻意不寫的字串全批實掃 0 命中。

**三條值得記住的**：
1. ⚠ **年份不是狀態。** 我把「2026 年的碟」當成「尚未發行」，**實際兩張都已上市 71 天與 232 天**
   （`FATHERS` 2026-07-10、`Gospel Music` 2026-01-30）。**`year` 等於今年時，狀態要逐張用官方日期判。**
2. ⚠ ⚠ **180 下限沒有任何機器在看**：`qa-batch out` 驗 >260、`qa-check-research` 驗 <80||>280、
   `thin` 那段只在有 thin 卡時才驗 180。**兩組寫作層的初稿（175／167）都是合法 JSON、三支自檢全過。**
   **與鉤子層的字元預算同型（第 1834-B 條）——腳本驗不到的東西，只能靠代理回報的那一行數字，主線一律自己重算。**
3. **兩組寫作層的偏差方向一致：單向高估，撞的是下限不是上限。**
   **根因：鉤子層整格砍完後 note 鏈只剩 3–4 格，照 base 的預算表列必然高估。**
   **→ 鉤子層砍得越乾淨，寫作層越容易撞下限。** 補格的來源立了新裁定：**取 `sound` 欄，不從 `facts` 撈已砍掉的格。**
