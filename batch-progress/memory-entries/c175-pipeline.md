### 2026-09-21｜dip-vinyl-shop｜c-175（日本爵士四大廠 jp-1 線第三批）五層管線走完，28 張

**改動摘要**：1971–1975 年段，**37 張收 28 退 9（76%，本線目前最高）**，
身分 **28/28 pinned、零 §1 人工**、簡介 **27 張 full（203–238）＋ 1 張 thin（170）**、
**封面 26/28、串流 18/28**（探測 16/28，回撈 12 張只救回 2 張）。apex 0 張、例外欄全空。
⚠ **76% 不是尺放寬**：撞池已被剔乾淨，而這一段正好是コロムビア／King／東芝**三條企劃線同時在跑**的年段。

**主要檔案**：`batch-progress/c175/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c175-*.json`、
`batch-progress/probe/probe-previews.mjs`、`batch-progress/dedup-crossbatch.mjs`、
`desc-tools/fix-spacing.mjs`、`desc-tools/jp-proper-names.json`。

**驗證結果**：`chk-prop` 兩組標記 0、`dedup-crossbatch c175` 撞卡 0、
`qa-batch research/hooks/out c175` 全清（`thin 卡 1 張，全部 ≤180 ✓`）、
`chk-hook-crossgroup c175` 28 張全過、`qa-check-research` 兩組標記 0、`fix-spacing` 兩檔待補 0、
**首句與 hook 逐字相符 28/28**；鉤子預算 **217–230**、desc **full 203–238／thin 170**
（兩項都是我自己重算複核的，腳本驗不到預算與 180 下限）。

**五條值得記住的**：
1. ⚠ ⚠ **同一天抓到三個「官方 ≠ 原盤」的形狀**：Universal 商品頁的「MAKI LIVE」、
   コロムビア商品頁的「ビートでジャンプ」、**`columbia.jp` 復刻企劃頁把 1977 年再發寫成「【オリジナル】」**。
   **官方頁講的是它現在在賣的那個版本，不是那張碟。**
2. ⚠ **`probe-previews.mjs` 把整串 `queryAlias` 當成一個候選名**塞進 `titleOk()`，
   而那是用 `；` 串起來的多個別名——**查得到卻在比對那關被自己擋掉**。
   改成與 `termsFor()` 同樣用 `aliasParts()` 切開後逐段比對，實測三張舊法全 false、新法全 true。
   ⚠ **代理的診斷（「沒當查詢字串送出去」）是錯的，照它改會什麼都不改變而且看起來像修好了。**
   **回報裡的「根因」一律自己驗一次再動手。**
3. ⚠ **同構的「日期＋動詞」是一整族，改掉一個只會擠到隔壁**；**4-gram 掃描會跨句**。
   鉤子層收斂四輪，寫作層開工先配動詞只要兩輪。
4. **Discogs 的作曲欄會錯**（〈Something〉寫成 Lennon-McCartney、〈ガソリン・アレイ〉寫成 Dave Grusin）——
   **它是本線的主力來源，但作曲欄不是它的強項。**
5. ⚠ **我的派工信在本批出錯四次**（作用域過寬／漏寫 thin 的字數帶／層級越位／把 a 組特注貼進 b 組），
   **四次全是代理擋下來的**。其中「層級越位」最值得記：
   **我把研究層的更正抄進寫作層派工信，而鉤子層早就把那一格捨去了**——
   **寫作層的唯一事實來源是 `note`，派工信不該另開一個。**
