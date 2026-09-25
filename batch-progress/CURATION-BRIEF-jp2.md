# 策展簡報：日本爵士獨立廠牌線 jp-2（c-183…c-191，9 批 338 張）

**這一條線與 jp-1（四大廠）共用全部機制。**
⚠ ⚠ **`batch-progress/CURATION-BRIEF-jp1.md` 要整份讀完**——
**欄位定義、三道池比對、曲風判準、Discogs／MB 的每一種失效、來源結構、交付格式，全部沿用**，
本檔**只寫 jp-2 與 jp-1 不同的地方**，以及開線時就知道的坑。

**主線裁定一律以 `batch-progress/c163/rulings-mainline.md` 為準**（jp-1 線寫到第 1952-B 條）。

## 〇、這條線是什麼

**四大廠（Victor／東芝／コロムビア／King）之外的日本爵士廠牌，十五家**：

| 廠牌 | MB 建檔品質（見 `enum/jp-2.md`） |
|---|---|
| Trio／Whynot、East Wind、Frasco | **好**——目錄接近完整，可以直接當開批清單 |
| Alfa、Union、Kitty | **中等** |
| CBS/Sony、Denon、Polydor JP、Nippon Crown | **差**——release 數很多但日本自製爵士建得少 |
| DOMO、ALM、discomate、URC、KENWOOD | **2026-09-24 才列舉**（`batch-progress/enum-label.mjs`） |

⚠ **URC 在 MB 有 100 筆 release，只有 2 筆是爵士**——那是民謠廠牌（岡林信康 那一系）。
⚠ **KENWOOD 掛不到任何爵士 Album，本線 0 張。**

**切法**（`batch-progress/slice-jp2.mjs`）：十五家爵士 RG 945 筆 →
剔除**池中已有 167／1990 年後 140／無年份 8** → 547 張 →
⚠ ⚠ **再剔掉 217 張外國藝人的日本壓片**（見下）→ **338 張，9 批（c-183…c-191）**。
依 年份 → 廠牌 → 掛名 → 盤名 排序後平均切開。
⚠ **`inPool` 是切批當天（2026-09-24）用今天的池重算的，不是列舉檔裡 2026-09-15 那一欄**
（jp-1 就是踩了那一欄才在 c-173 交件後重切，第 1849-B 條）。

### ⚠ ⚠ 外國藝人那一欄重算過（主線第 1953-B 條）

**列舉層的 `domestic` 判準是「掛名藝人 country=JP **或** RG 初版國家含 JP」，
而後半那一句把「在日本發過片的外國藝人」全部標成本土**
——Miles Davis／Archie Shepp／Cecil Taylor／Jack DeJohnette 在 CBS/Sony・Denon・Trio 的
日本盤全是 `domestic: true`。**c-183 a 組 19 張裡 4 張（21%）是外國藝人。**
**已用 `batch-progress/jp2-fix-domestic.mjs` 重算**：**只認掛名藝人的 `country`，不看 release 國家**。
⚠ **c-183 是重算前切的、已經交件**，所以那一批裡仍混著外國藝人（策展層當場退掉了）。

### ⚠ ⚠ 再重算一次：出身地**只加註記，不判退**（主線第 1959-B 條）

**MB 的 `country`／`area` 會是「居住國」而不是國籍**（c-184 a 第 5732 條：`Sonia Rosa` 的 `country`
逐字 `JP`、`area` `Japan`，**只有 `begin-area` 是 `São Paulo`**）。**c-186 之後的 slice 多了一欄
`domesticRecheck.bornOutside`**：`country=JP` 而 `begin-area` 解到的國碼不是 JP 的，
**`domestic` 仍然是 `true`**，只在那一欄寫「出身地 X（國碼）不在日本，長住日本」。

⚠ ⚠ **這一欄不是退件理由**：`Marlene`（馬尼拉）、`Sonia Rosa`（São Paulo）、`朝比奈マリア`（華府）
**都是長住日本、替日本廠牌錄日本市場的盤**，與「Chet Baker 的日本壓片」是兩件事。
**身分要照第 4106 條四項（領銜／作曲／企劃／原盤發行）人工判，門檻 ≥ 3/4**
——c-184 a 第 5723 條退掉 `Sonia Rosa` 靠的就是四項 2/4，不是這一欄。
⚠ **出身地用 MB 區域階層解國碼，不用地名白名單**（第一版用白名單，70 張裡約 66 張是日本市町村被誤判）。

⚠ ⚠ **剩下 17 張「MB 藝人實體無 country、別名全羅馬字」的沒有剔掉，留在 slice 裡並在 `note` 標警語**
——**那一格裡兩種都有**：`増尾好秋`／`峰厚介`／`辛島文雄` 是日本人（羅馬字掛名而已），
`Steve Lacy`／`Saundra Hewitt` 是外國人。**那 17 張要逐張人工判本土。**

## 一、⚠ ⚠ 與 jp-1 最大的兩個不同

### (1) **沒有「四大廠硬門」這一關，改成「這十五家」**

jp-1 的第 1924-B 條（原壓廠牌必須是四大廠之一）在本線**不適用**——
本線退了四張好盤就是因為那一關（DOMO 三張、美國 TBA 一張），**它們現在在門內。**
⚠ **但「原壓廠牌」這個判準本身照舊**：**`house` 欄要驗的是原壓，不是後來的 CD 再發。**
⚠ **本線的 `house` 來自 MB 的 label 實體**，而 **MB 常把再發也掛在同一個實體上**
——**逐張回 Discogs 的 `/masters/<id>/versions` 確認原壓廠牌。**

### (2) ⚠ ⚠ **`why` 欄整欄是空的，曲風證據要從零建立**

jp-1 的 slice 帶著 `why`（`rg-tag`／`artist-tag`／…）當曲風線索。
**本線十五家裡有十家的列舉檔沒有這一欄**（2026-09-15 那支腳本沒留下這個欄位），
所以 **slice 的 `why` 對那十家是空字串**。
**→ 每一張的曲風都要自己查、自己寫依據，不能靠提示欄。**
⚠ **這反而少一個坑**：jp-1 的 `why` 有 31–44% 非爵士率，**空欄至少不會誤導**。

## 二、曲風判準（照 jp-1 的最終版，含 2026-09-22 補的三條）

**完整判準在 `CURATION-BRIEF-jp1.md` 的「一之二」與「二」兩節，逐字沿用。** 摘要：

- **①②④成立 → 進人工判，不是自動退**（Discogs 對日本盤的桶很粗）。
- **③成立（曲目過半是歌謡曲／演歌）→ 退，唯一的充分理由。**
- **⑤（堵收件款的縫）**：`genres` 不含 Jazz、或含 `Non-Music`／`Stage & Screen`、
  或 **`genres` 含 Jazz 但 `styles` 有內容而零爵士** → 不成立收件。
  ⚠ **`styles` 空陣列不在射程內**（空陣列是「沒有資訊」，不是「沒有爵士」）。
- ⚠ **`styles` 的首位在兩個方向都不是判準**（第 1944-B 條）。
- **既有的非爵士曲目（動畫主題曲、古典名曲的改編）→ 收件款第三肢失敗，可獨立退件**（第 1944-B 條）。
- **合輯（第 397 條）看的是「錄音是不是既有的」，不是「曲目是不是既有的」**（第 1948-B 條）：
  **既有錄音重新排列 → 退；舊曲新錄 → 收。**

## 三、開線時就知道的六件

1. ⚠ **`poolRecheck` 已標出 6 筆「確定撞池」**（c-185 1、c-186 2、c-187 1、c-188 2）
   ——**那六筆直接退，在 `rulings.md` 記下，不要補別張。**
   ⚠ ⚠ **但 `poolRecheck` 本身會漏**：c-183 a 組八格錯兩格（25%），**兩筆都是真撞池、其中一筆撞 apex 卡**
   （前綴比對只做單向，第 1953-B 條）——**「池中查無此藝人」那一格一定要自己再掃一次。**
2. ⚠ ⚠ **`enum/jp-2.md` 的最後兩節是現成的資產，開批前一定要讀**：
   **「§1 候選」**列了「我知道有、MB 查無或沒掛本廠牌」的碟（East Wind 的 GJT《Milestones》、
   Frasco 的山下洋輔 三張 solo、Union 的 1982–83 Union Jazz 六張⋯）；
   **「已知瑕疵」**列了 MB 重複 RG 與只有串流版的那幾張。
3. ⚠ **CBS/Sony 這個 imprint 也涵蓋西班牙 CBS/Sony**（到 1997）——**ES 盤已歸海外，但要自己再驗一次。**
4. ⚠ **Trio 目錄裡有 2007–2010 年的 GB/US CD 六筆**，是 Whynot 目錄的英美再發或英國「Trio Records」誤掛
   ——**已標註歸海外。**
5. ⚠ **Union 的池中 10 張裡有 6 張（c-87 的 1982–83 Union Jazz 卡）MB 完全查無 RG**
   ——**池中有、MB 沒有，不是漏標。撞池比對要用掛名＋盤名，不能只靠 rgMbid。**
6. ⚠ **Denon 的 1026 筆 release 大半是古典**，`DENON JAZZ` 實體只有 18 筆
   ——**本線 Denon 那 109 張的曲風要特別小心。**

7. ⚠ ⚠ **`live: false` 一樣要逐張讀 Discogs 原壓的 `notes`**（主線第 1958-B 條）：
   c-184 a 組 19 張裡 **3 張（16%）是反向漏標**——`live: false`、`note` 空白、
   **MB `secondary-types` 空陣列，三個機器欄位全部沉默**，而 notes 逐字寫著 `Recorded live`。
   **slice 的 `live` 直接抄 MB 那一欄，這個方向沒有任何警語。**
   ⚠ **掃這幾個字串就會全中**：`Recorded live`／`実況`／`ライヴ`／`Recital`／末軌題帶 `Encore`／
   credits 有 `MC —`／盤名帶 `In Person`／`in Japan`。
   ⚠ **往下修那個方向照舊**（第 1904-B 條：`Recorded At` 是錄音室的不算；`Direct Cutting` 系列會被誤標 Live）。
8. ⚠ ⚠ **`poolRecheck` 現在會直接報「前批策展層已裁定撞池」**（主線第 1960-B 條）：
   `batch-progress/enum/known-pool-collisions.json` 收著前幾批逐張確認過的撞池名單（目前 5 筆），
   **命中就是退，不必再查**。**反過來說，沒命中不代表沒撞**——
   c-183／c-184 連兩批各漏掉真撞池，**六道 dedup 加 `chk-prop` 全部放行**。
   ⚠ **固定動作（c-183 第 5685 條第 3 點，c-184 一次救兩張）**：
   **Union／Trio／East Wind／Frasco 這幾家的每一筆，以盤名為主鍵掃一次全池、兩種文字系統都試。**
   ⚠ **變體全是羅馬字時走 Discogs 藝人頁的 `realname`／`namevariations` 查漢字名再掃**
   （第 1890-B 條第四條路；c-184 #17 `峰厚介` 靠它救到，前三條路全落空）。

9. ⚠ ⚠ **`house` 的快篩只決定「要不要留意」，判定永遠是 Discogs 最早那一版的 `labels` 欄**（主線第 1965-B 條）：
   **`Alfa` 的年份界線挪到 1978**（c-184 b 實測 2/2 全錯、c-185 b 實測 4 張裡只有 1 張中，舊界線太寬）；
   **`Denon` 要看是不是母公司 `Columbia`**（Columbia 不在十五家）；
   **`CBS/Sony` 的 `SONP-`／`SOPM-` 號段混著美國 Columbia 授權壓片**，而 `SOPL-`／`SOPN-`／`SOCM-` 查過都是日本原壓。
10. ⚠ ⚠ **跑 `/masters/<id>/versions` 的時候順手比一次「MB 轄下的 JP release 數 vs Discogs 的日本盤數」**
   （主線第 1965-B 條）：**少了就把盤名與年份人工回查**——
   c-185 b 的 `中村照夫` 盤名真改判就是這一種（**MB 整個 RG 沒建日本原壓 `Kitty MKF 1014`**），
   **而 `titleCheck` 三欄一致、note 空白。**
11. ⚠ ⚠ **第 4106 條四項出現「不可判定」格時**（主線第 1965-B 條）：
   **不可判定的票不計分，門檻按比例向下取整**——**可判定 3 票時 ≥2 即過、可判定 2 票時要 2 票全中。**
12. ⚠ ⚠ **第 5701 條的乙，「未進入爵士曲目表者」這個限定套用到每一項**（主線第 1965-B 條）：
   判準統一成「**這首曲子有沒有進入爵士曲目表**」，不是「它原本屬於哪個類別」。
   **`Concierto De Aranjuez` 因此算甲**（Miles／Gil Evans 一系早已錄成爵士曲目）；
   ⚠ **但沒有進入爵士曲目表的歐洲古典名曲仍是乙**（第 1944-B 條那一批 8/8 軌不鬆動）。
   ⚠ **巴西曲目照主線第 1962-B 條分兩堆**（Jobim／Bonfá／Edu Lobo 一系算甲、當季 MPB 算乙、判不出來當乙）。
13. ⚠ **`live` 的日期那一肢改成「明確的場次日期（一個，或連續數晚的公演）」**（主線第 1965-B 條）
   ——**場館與 live／觀眾字樣那兩肢不動，三肢仍是且的關係。**
14. ⚠ **三條來自 c-185 b 的操作判準**（主線第 1965-B 條採納）：
   `Written-By: Folk` 與 `Traditional` 同處理；**`styles` 字面含 `Jazz` 一律算爵士成分**（`Jazz-Funk` 這種）；
   「原壓作曲欄空白」照三步工序（同廠其他壓片 → master 其他版本 → 曲題反查）。

## 四、交付

**與 jp-1 完全相同**：`batch-progress/c1XX/prop-{a,b}.json`、
`node batch-progress/c1XX/chk-prop.mjs a b`（標記 0 才算交件）、
`node batch-progress/dedup-crossbatch.mjs c1XX`、第 315 條結算、`rulings.md` 各組不越界。

⚠ **派工信的數字一律用 `node batch-progress/dispatch-stats.mjs c1XX <上一批>` 產生**（第 1937-B 條）。
⚠ **派每一批之前先跑 `node batch-progress/jp1-pool-refresh.mjs c1XX`**（第 1912-B 條）。
