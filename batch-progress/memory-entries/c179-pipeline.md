### 2026-09-22｜dip-vinyl-shop｜c-179（日本爵士四大廠 jp-1 線第七批）五層管線走完，27 張

**改動摘要**：1981–1983 年段，**37 張收 27 退 10（73%）**，
身分 **27/27 pinned、零 §1 人工**、簡介 **27/27 全 full（212–240）**、
**封面 22/27、串流 19/27**。apex 0 張、例外欄全空。

**主要檔案**：`batch-progress/c179/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c179-*.json`、
`desc-tools/prompts/{writer-base,hook-base}.md`、`batch-progress/probe/previews.json`。

**驗證結果**：`chk-prop` 兩組標記 0、`dedup-crossbatch c179` 撞卡 0、
`qa-batch research/hooks/out c179` 三階段全過、`chk-hook-crossgroup c179` 27 張全過、
`qa-check-research` 兩組標記 0、`fix-spacing` 兩檔待補 0；
**鉤子預算 217–230 與 desc 212–240 都是我自己逐筆重算複核的**；
跨兩組 27 張的 4-gram 我自己重掃，**≥3 張的 15 條全是廠牌名／樂器名／人名、0 條句型同構**；
**首句照抄 hook 27/27**。

**五條值得記住的**：
1. ⚠ ⚠ **研究層推翻策展層 46 處、36 處是人名，本線單批最高**；
   **第 4677 條「查不到漢字」整條翻案**——失效原因是**只讀 `namevariations` 沒讀 `realname`**，
   以及**來源順序少了「日文維基的個人條目」**。那是查漢字名的第五條路。
2. ⚠ ⚠ **一筆誤配往下追三層才到根因**（第 1935-B → 1942-B → 1943-B → 1946-B）：
   回撈層報一筆誤配 → 查出四道防呆的缺口 → 查出防呆自己寫的順序不對（退掉就整批放棄）
   → 查出**整條線十批的店面順序從來沒登記**。**前兩層在當下都看起來像已經修好了。**
3. ⚠ **jp 優先重跑之後，97 筆 us 命中變成 163 筆 jp 命中，ready 總數幾乎沒變**
   ——**變的不是數量是配到哪一張。** 兩張人工退件也被機器自己修好。
4. ⚠ **本線第一次改判學名**（封面蝴蝶 `Graphium sarpedon`），
   以及**同一個漢字串在同批兩張卡上一對一錯**（`天野清継`）——**兩種自查腳本都抓不到。**
5. ⚠ **我的派工信第十二次出錯（同一個病第三次）**：把序數爭議掛到《Samba Club》，
   逐字是《Shining》的。**`dispatch-stats.mjs` 擋數字，擋不到「憑記憶打卡名」。**
   **派工信點名某張卡時，掛名與盤名一律從卡單複製貼上。**
