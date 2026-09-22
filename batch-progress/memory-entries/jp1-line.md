### 2026-09-22｜dip-vinyl-shop｜jp-1 線（日本爵士四大廠）十批走完，合計 242 張

**改動摘要**：c-173…c-182，年段 1961–1989，**377 張提案收 242 張（64%）**。
身分 **242/242 全部 pinned、零 §1 人工**；簡介 **242/242 全 full**；
**串流 172/242、封面 190/242**；apex 0 張、例外欄全空。
十批各自的 `HANDOFF.md` 與 memory entry 都在，總交接在 `batch-progress/HANDOFF-jp1-line.md`。

**主要檔案**：`batch-progress/c17{3..9}`／`c18{0..2}` 各批目錄、
`desc-tools/batches/{cards,research,hooks,input,output}/c17*-*.json`／`c18*-*.json`、
`batch-progress/{dispatch-stats,jp1-pool-refresh}.mjs`、`batch-progress/probe/{probe-previews,recover-unavailable,dup-collection}.mjs`、
`desc-tools/{qa-batch,chk-hook-crossgroup,fix-spacing}.mjs`、`desc-tools/prompts/{hook-base,writer-base}.md`、
`batch-progress/CURATION-BRIEF-jp1.md`、`batch-progress/c163/rulings-mainline.md`（第 1846-B 至 1952-B 條）。

**驗證結果**：十批的 `chk-prop`／`dedup-crossbatch`／`qa-batch`（research・hooks・out）／
`chk-hook-crossgroup`／`qa-check-research`／`fix-spacing` 全部通過；
**每一批的鉤子預算與 desc 字數、以及跨兩組的 4-gram，都是我自己重算重掃複核的，不是照代理的報告抄**。

**五條值得記住的**：
1. ⚠ ⚠ **一筆誤配往下追三層才到根因**：c-179 回撈層報 c-178 一筆誤配 → 查出四道防呆的缺口
   → 查出防呆自己寫的順序不對（退掉就整批放棄）→ **查出整條線十批的店面順序從來沒登記**。
   **前兩層在當下都看起來像已經修好了。** jp 優先重跑之後，**97 筆 us 命中變成 163 筆 jp 命中、
   ready 總數幾乎沒變——變的不是數量是配到哪一張。**
2. ⚠ ⚠ **「查不到」與「查到但錯」是兩種東西**，本線兩者都撞到：
   Discogs `namevariations` 本身會被污染（漢字與羅馬字讀音對不上）；
   廠牌官方頁會寫錯自己盤上的人名；Discogs 會把 A 碟的 credits 整塊複製到 B 碟
   （`Eric Gale` 從吉他變貝斯就是指紋）。**三種都只能靠交叉驗，不能靠單一來源。**
3. ⚠ ⚠ **代理是最後一道防線，不該是唯一一道**：我的派工信在本線出錯十三次，
   **十三次全部是代理抓到的**。三種形狀：模板裡的數字（已用 `dispatch-stats.mjs` 擋掉）、
   憑記憶打卡名、**從代理報告推論出一個它沒說的結論**。後兩種腳本擋不到。
4. ⚠ **同構要在動筆前配死，而且要配三欄**（動詞／目錄號引入法／介詞）：
   只配動詞不夠（c-178 配過了仍長出 17 條）。**三欄配死之後 c-181 廠牌集中度 82% 反而一輪就收斂。**
   ⚠ **壓完預算要回頭看 hook 有沒有踩空**——c-181 一次抓到七處。
5. ⚠ **來源可靠度連年段都不能外推**：1987–89 年段的原廠頁命中率極低、ja 維基反而最有產出，
   **與 1970 年代那幾批完全相反**；`columbia.jp` 八批八個結論；`miqqe.jp` 3/3 之後 0/6。
