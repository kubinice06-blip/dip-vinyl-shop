### 2026-09-22｜dip-vinyl-shop｜c-176（日本爵士四大廠 jp-1 線第四批）五層管線走完，27 張

**改動摘要**：1975–1977 年段，**37 張收 27 退 10（73%）**，
身分 **27/27 pinned、零 §1 人工**、簡介 **27/27 全 full（203–238）**、
**封面 22/27、串流 19/27**（探測 13/27，人工回撈 14 張救回 6 張）。apex 0 張、例外欄全空。
退件的 7 張非爵士裡**有 5 張是走「人工判」才退得掉的**——曲風判準三次修訂之後才有的結果。

**主要檔案**：`batch-progress/c176/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c176-*.json`、
`batch-progress/probe/probe-previews.mjs`、`desc-tools/fix-spacing.mjs`、`desc-tools/jp-proper-names.json`、
`batch-progress/CURATION-BRIEF-jp1.md`。

**驗證結果**：`chk-prop` 兩組標記 0、`dedup-crossbatch c176` 撞卡 0、
`qa-batch research/hooks/out c176` 全清（**互指 0 行**）、`chk-hook-crossgroup c176` 27 張全過、
`qa-check-research` 兩組標記 0、`fix-spacing` 兩檔待補 0、**首句與 hook 逐字相符 27/27**；
鉤子預算 **219–230**、desc **203–238**（兩項都是我自己重算複核的）；
跨兩組 27 張的 4-gram 我自己重跑過，**0 條句型同構**。

**五條值得記住的**：
1. ⚠ ⚠ **再發數低估的根因確定了：是「有沒有跑版本表」，不是 Discogs 的問題。**
   本批策展層自己跑完 `masters/<id>/versions`，研究層 12 筆重跑**改判 0 筆**，本線五批以來第一次。
   **前四批 71%／75%／47%／54% 的低估到此歸因完畢。**
   ⚠ **但「數字對不等於內容全」**——研究層仍抓到 **Discogs 版本表自己是舊的**
   （ビクター 通販 `miqqe.jp` 上有 2026 年的黑膠，Discogs 沒建）。
2. ⚠ ⚠ **`probe-previews.mjs` 把整串 `queryAlias` 當成一個候選名**塞進 `titleOk()`，
   而那是用 `；` 串起來的多個別名——**查得到卻在比對那關被自己擋掉**。
   改成用 `aliasParts()` 切開後逐段比對。**下一批（c-177）的探測層未 ready 由 12–14 張降到 2 張。**
   ⚠ **代理的診斷（「沒當查詢字串送出去」）是錯的，照它改會什麼都不改變而且看起來像修好了。**
3. **撤回「成因第 16 種」**：`いしだかつのり` 是石田勝範 本人用過的名義，不是店面寫錯。
   **「成因」清單只該收「店面與實物不一致」，不該收「實物本來就有多種寫法」。**
4. ⚠ **`fix-spacing` 同一天誤報三次，三次都是「知道要保護什麼、但不知道去哪裡找」**：
   漏了還沒進池的本批卡 → 漏了 `jp-proper-names.json` → 漏了 `「」` 裡的逐字引用。
   **第三次的解法不是再補一份名單，是補一種括號**（`spacer()` 本來就豁免 `《》〈〉`）。
5. ⚠ **反向禁令的判準是「與這張碟綁不綁定」，不是「事情有多聳動」**：
   花柳幻舟 1980 年刺傷家元（發行五年後）**不寫**；
   富樫雅彦 1970 年被刺傷導致下半身麻痺（**改走打擊樂的直接原因**）**寫**。
