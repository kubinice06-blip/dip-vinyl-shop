### 2026-09-22｜dip-vinyl-shop｜c-180（日本爵士四大廠 jp-1 線第八批）五層管線走完，19 張

**改動摘要**：1983–1984 年段，**37 張收 19 退 18（51%，本線最低）**，
身分 **19/19 pinned、零 §1 人工**、簡介 **19/19 全 full（205–239）**、
**封面 14/19、串流 10/19**。apex 0 張、例外欄全空。
⚠ **收件率低的原因單一且可歸因**：コロムビア `CX-7xxx` 的動畫翻奏企劃線整個壓進這個號段，
**兩組合計退 7 張、零收。**

**主要檔案**：`batch-progress/c180/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c180-*.json`、
`batch-progress/{dispatch-stats.mjs,jp1-pool-refresh.mjs}`、`batch-progress/probe/dup-collection.mjs`、
`desc-tools/prompts/{writer-base,hook-base}.md`、`desc-tools/qa-batch.mjs`。

**驗證結果**：`chk-prop` 兩組標記 0、`dedup-crossbatch c180` 撞卡 0、
`qa-batch research/hooks/out c180` 三階段全過、`chk-hook-crossgroup c180` 19 張全過、
`qa-check-research` 兩組標記 0、`fix-spacing` 兩檔待補 0；
**鉤子預算 218–230 與 desc 205–239 都是我自己逐筆重算複核的**；
跨兩組 19 張的 4-gram 我自己重掃，**≥3 張的 5 條全是專名、0 條句型同構**；**首句照抄 hook 19/19**。

**五條值得記住的**：
1. ⚠ ⚠ **動畫翻奏企劃線整線退**（第 1934-B 條）：**兩組各自獨立撞到、各自獨立得出同一結論**
   ——**那種一致性本身就是判準成立的證據。** 分界是**曲目來源**，不是編制：
   同一支樂團、同年、同廠、號碼差三號，原創形象盤收、動畫翻奏退。
2. ⚠ **曲風判準的 ⑤ 款補了第三形**（`genres` 含 Jazz 但 `styles` 零爵士），
   ⚠ **但 `styles` 空陣列不在射程內**——**空陣列是「沒有資訊」，不是「沒有爵士」。**
3. ⚠ ⚠ **鉤子層實測：動詞表要連「目錄號怎麼引入句子」一起配**——
   **只配動詞不夠（c-178 配過了仍長出 17 條同構），根因是「字標＋號碼」這個尾巴只有三四種寫法。**
   **兩樣一起配之後 c-180 一輪收斂、定稿 3 張以上 0 條。** 已寫進兩份 prompt。
4. ⚠ **Discogs 藝人頁的新失效形態**：`namevariations` 本身會被污染
   （`Shogo Takeuchi` → 逐字「堀真慈」、與讀音不合）——**漢字要與羅馬字讀音對得上，對不上就退成不寫。**
5. ⚠ **我的派工信第十一次出錯：把卡的掛名寫成別人**（`《フィリップ・マーロウ》` 寫成深町純，
   逐字是 `石川晶とカウント・バッファローズ`，我把兩批的「Roman Trip 判收第二例」記混了）。
   **這與「數字錯」是不同的病，`dispatch-stats.mjs` 擋不到——點名某張卡時一律從卡單複製貼上。**
