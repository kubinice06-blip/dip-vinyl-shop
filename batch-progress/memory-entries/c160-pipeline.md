### 2026-09-19｜dip-vinyl-shop｜c-160（Blue Note 2006–2007）五層管線走完，38 張

**改動摘要**：切片 45 張走完五層，**收 38 退 7（b 組退貨率 9.1%，1985 後十六批最低）**。
身分 38/38 pinned、簡介 37 full ＋ 1 thin（full 211–240／thin 158）、封面 32/38（替代 6/6 查實且目視核過版式）、
串流 36/38（2 張走固定無來源狀態）。本批 apex 0 張、無合輯、例外欄全空。

**主要檔案**：`desc-tools/batches/{cards,research,hooks,input,output}/c160-*.json`、
`batch-progress/c160/{prop-a,prop-b,slice,caa,apple-candidates,rulings,rulings-mainline,HANDOFF}`、
`batch-progress/probe/previews.json`。

**驗證結果**：`chk-prop` 四道全過、`qa-batch research/hooks/out c160` 全清
（`out` 一筆已載明的誤報：`DownBeat 樂評人票選` 撞到裸字串規則，但主辦者就緊貼在前面）、
`chk-hook-crossgroup c160` 38 張跨組全過、`fix-spacing` 兩檔各跑一次待補 0。

**三條值得記住的**：
1. **第 1681 條**——**四張卡上同一屆葛萊美、兩組各佔兩張**（Blanchard 得獎、Tolliver 輸給同批的 Blanchard、
   Charlap 與 a 組的 Lovano／Hank Jones 同屆同項一起入圍）。**四份派工詞都帶互指，零張寫成「唯一入圍」。**
   ⚠ **a 組把否定式排除改寫成「入圍者之一」的正面表述，比我派工詞的寫法乾淨。**
2. **第 1678 條**——⚠ **我自己的第 1637 條一條裡錯了三處**：它把策展層的「完全查不到」直接寫成裁定，
   但 Norah Jones 的樂手名單在維基上是完整的、Dave Koz 的 track-level credit 有六筆、Herbert 的製作人查得到。
   **主線自律：策展層說「完全查不到」不可直接寫進裁定，要寫成「在 X、Y 查不到，請換 Z 再查」。**
3. **第 1675 條**——**Apple 的 artwork 永遠是「店面現在在賣的那一版」。**
   卡片走 (丙)／(丁) 而 `year` 取他廠原壓那年時，**Apple 的圖有很高機率是後來再發的版式**
   （Gwyneth Herbert 那張就是）。**封面來源優先序在這類卡上要改成「與 `year` 同一版的實體條目 ＞ Apple」
   ——版式錯不可接受，畫質差可以接受。**
