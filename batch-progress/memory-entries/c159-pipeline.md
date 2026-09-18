### 2026-09-18｜dip-vinyl-shop｜c-159（Blue Note 2004–2006）五層管線走完，34 張

**改動摘要**：切片 45 張走完五層，**收 34 退 11（b 組退貨率 27.3%，1985 後十四批最高）**。
身分 34/34 pinned、簡介 34/34 全 full（201–240 字）、封面 30/34（替代來源 4/4 查實）、
串流 28/34（6 張走固定無來源狀態）。本批 apex 0 張、無合輯、例外欄全空。

**主要檔案**：`desc-tools/batches/{cards,research,hooks,input,output}/c159-*.json`、
`batch-progress/c159/{prop-a,prop-b,slice,caa,apple-candidates,rulings,rulings-mainline,HANDOFF}`、
`batch-progress/probe/previews.json`、`batch-progress/probe/match-lib.mjs`。

**驗證結果**：`chk-prop` 四道全過、`qa-batch research/hooks/out c159` 全清（`out` 一筆誤報：
把已具名主辦者的「Victoires du jazz 公眾票選獎」掃成不具名出處）、
`chk-hook-crossgroup c159` 34 張跨組全過、`fix-spacing` 兩檔各跑一次待補 0。

**三條值得記住的**：
1. **第 1610 條**——**探測層把 12／34 誤判成 unavailable，兩層原因。**
   第一層已修：**策展層把 `queryAlias` 寫成散文（多別名用「；」隔開、各帶括號說明），
   `termsFor()` 整串當查詢字串**，四個 term 有三個是垃圾 → 新增 `aliasParts()` 先拆乾淨。
   第二層**刻意不修**：`titleOk` 的長度差上限擋掉「副標的有無」，但放寬會讓
   **《Live in Chicago》配到《Live in Chicago - Out Takes》**（第 1433 條那張錯碟）
   ——**錯碟會靜靜把錯的試聽上架，漏抓只是少一個試聽而且救得回來。**
2. **第 1614／1620-D 條**——**兩種「查不到」要分清**：
   「只在某些市場被抽掉」（Perko 那張在 23 個店面都有、唯獨 us/jp/ca 沒有，**靠 UPC 救回**）
   vs **「藝人目錄完整、前後作都在、缺的都是同一家廠牌直屬的那幾張」＝廠牌層級版權缺口，救不回**。
   **建議本機把「UPC × 23+ 店面」寫成探測層固定步驟。**
3. **第 1620-I／M／Q 條**——**主線本批派工詞寫錯四處，全部由代理接住駁回、零流入正文**：
   把兩張 Dr. John 混成一張、把好料指派給沒有該 fact 的卡、更正裁定時同一句的數字沒一起重算。
   **主線自律三條**：派工詞的名單要按組拆開；代理回報裡的卡名要先在該組研究稿 grep 一次；
   **派工詞引用 key 一律從輸入檔複製**（彎引號／直引號會讓集合比對出事）。
