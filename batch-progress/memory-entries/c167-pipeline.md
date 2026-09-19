### 2026-09-19｜dip-vinyl-shop｜c-167（Blue Note 2025–2026）五層管線走完，14 張

**改動摘要**：切片 14 張走完五層，**收 14 退 0**（a 7／b 7）。
身分 14/14 pinned、簡介 14/14 全 full（197–233）、**封面 14/14、串流 14/14——本線第一個雙滿批**
（5 張靠人工回撈救回）。本批 apex 0 張、無合輯、例外欄全空。
⚠ **兩張交件時尚未發行**（`Kiefer《Memory Bomb》` 9/25、`Meshell《Synonym》` 10/2），正文寫成「定在⋯發行」。

**主要檔案**：`desc-tools/batches/{cards,research,hooks,input,output}/c167-*.json`、
`batch-progress/c167/{prop-a,prop-b,slice,caa,apple-candidates,rulings,HANDOFF}`、
`batch-progress/probe/previews.json`。

**驗證結果**：`chk-prop` 兩組全過、`qa-batch research/hooks/out c167` 全清、
`chk-hook-crossgroup c167` 14 張全過、`qa-check-research` 兩組標記 0、`fix-spacing` 兩檔待補 0、
**首句與 hook 逐字相符 14/14**；全批實掃 `第一晚`／`Isfahan`／`葛萊美`／`公有領域` 四處刻意不寫皆 0 命中。

**三條值得記住的**：
1. **第 1813-B 條**——⚠ ⚠ **廠牌官網自己把「入圍作」寫成「得獎作」**：
   bluenote.com 的 Kiefer 藝人頁逐字 `A Grammy Award–winning producer for his contributions to Malibu`，
   **但《Malibu》在第 59 屆只入圍**。**廠牌官網是敘事來源，不是獎項與年份的一手依據**
   （同一天另外兩次：c-166 的官網只有入圍稿而該作實際得獎、c-170 的藝人頁年份差整整一年）。
   **處置是沉默封口，不是寫成否定句**——否定句會被寫作層照抄成校對痕跡。
2. **第 1816-B 條**——**讓出骨架之前，讓出方要先確認那條不是自己 `hook` 的本體。**
   我把一條骨架列進讓出清單，但那條逐字就是讓出方的 hook；b 組判退回不用、改走別的切角。
   **另外：「同一句型三次以上也是同構」機器一次都不會亮**——草稿一度四張帶「N 軌裡有 M 軌」，壓到 2 次。
3. **第 1813-B 條的另一半**——⚠ **我為了小批省事，要研究層交單一檔 `c167.json`，與同一封信的 QA 要求互斥**
   （`qa-batch` 與 `merge-writer-input` 都只讀 `<批>-<組>.json`，只交單檔會報 6 個旗標、合併直接 `exit(1)`）。
   **批次再小也照管線的形狀交件。**
