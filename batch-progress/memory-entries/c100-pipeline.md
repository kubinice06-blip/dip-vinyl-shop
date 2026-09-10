## 2026-09-05 — dip-vinyl-shop — c-100 走完雲端段（古典演奏家傳奇錄音，40 張）

- **改動摘要**：店主「接力做完十批」的一批，`lineType: 廣度`，**單一組 a**。
  **40 張、32 位掛名**，卡單年份 1953–2005。
  Toscanini／Schnabel／Kreisler／Van Cliburn／Mravinsky／Budapest String Quartet／
  Quartetto Italiano／Joan Sutherland 各 2，其餘各 1（含 Cortot 的三種組合掛名形態）。
  **零 §1 人工身分、零跨批撞卡、40/40 釘住 release-group。**
- **主要檔案**：`batch-progress/c100/`（prop-a、caa.json、chk-prop.mjs、**rulings.md 九條**、HANDOFF.md）、
  `desc-tools/batches/research/c100-a.json`（由 a1＋a2 兩支代理各 20 張合併）、
  `hooks/c100-hooks-a.json`（由 a1＋a2 合併）、`input/c100-writer-1.json`、`output/c100-out-1.json`、
  `batch-progress/probe/previews.json`（**23 筆人工改寫**）、
  `batch-progress/c53/rulings.md`（**新增第 173–175 條**）。
- **驗證結果**：`qa-batch research/hooks/out c100` 全過、`chk-hook-crossgroup c100` 40 張
  （hook 加權 17–31、note 318–350、開頭前四字互異）、`fix-spacing` 待補 0。
  主線一次性複驗：**40 張 `desc` 開頭與 `hook` 逐字相符**、full 216–238、thin 1 張 170、
  **未具名出處 0 盞、六條硬禁令 0 命中、平台字眼 0 命中**。
  **封面 40/40、試聽 26/40（全部命中 gb）。**
- **這批的裁定與教訓**：
  1. **這批是第 173／174／175 三條通則的發源地。**
     **173**：Apple 的 `search` 與藝人頁目錄**會漏掉不同的碟，兩個都要跑**——
     Kreisler 那張是目錄漏掉、search 救回的（**與第 166 條方向相反**），
     Milstein 與 Quartetto Italiano 兩張則相反；**而且目錄端點自己會被 `limit=200` 截斷**
     （Toscanini／Casals／Kreisler 七個店面全部回滿 200）。
     **174**：**古典的假陽性擋不住軌數，只能用逐軌長度擋**——ABQ **27 軌對 27 軌**只差 Live 標記、
     Amadeus **34 軌對 34 軌連碟數 12+12+10 都相同**、Celibidache 四筆柴五**全是倫敦愛樂版**
     （每樂章短三到四分鐘）。**只要一個藝人會重錄同一份曲目，軌數就不是識別鍵。**
     **175**：`trackCount` 欄與攤開的曲目列可以不一致（Gilels 21 對 20、Van Cliburn 7 對 6）。
  2. **試聽 6/40 → 26/40**，是十批裡探測層最無力的一批。落空的形狀與流行樂完全不同：
     卡片盤名被策展層縮短過、作曲家姓名簡寫（R. Strauss）、年份括號、語言
     （Johannes-Passion vs St. John Passion、Waldesruhe vs Silent Woods）、數字的有無、
     以及**盤名零重疊、靠 51 軌的軌數比對撈到**（Schnabel）。
  3. **我判錯了一個方向，值得記**：我把 Sutherland《Operatic Arias》配到的
     《Finest Operatic Arias》（盤名不同＋5 軌＋appleYear 2016 對卡單 1959）判為「高度可疑」，
     **研究層逐軌比對推翻**——那就是 1959 Decca SXL 2159 那次錄音。
     **三個訊號同時指向錯配，結果三個全是再發包裝造成的。** 古典再發盤把這三件事一起改掉是常態。
  4. **⚠ 收尾要問店主的規格問題**：**40 張裡 21 張的卡單年份不是錄音年**，是復刻年／整編年／再壓年。
     「**Richter 卡單 1992，但他 1981 年已過世**」「Amadeus 卡單 1989，但團體 1987 年就解散」
     「Ferrier 卡單 1961，錄音是 1952 年 5 月維也納」——**這條線的卡片年份要記錄音年還是發行年，
     是規格層級的問題，雲端不自決**。卡單值一律未動（裁定 141），`yearVerified` 逐張並列三個數字。
  5. **策展層的時序／序數主張被攻破第九次：24 處，其中 6 處與來源相反**
     （Toscanini《Manfred》「整首錄完」實際做過多處刪節、Thibaud 是 Ysaÿe 的**朋友**不是學生、
     三人「決裂後再未同台」但最後一場是 1933-05-13、
     Cliburn《Rach 3》是**實況**不是重錄——唱片背面就印著「Actual Carnegie Hall Performance」）。
     **四位已故者的「生前最後」全部擋下**；Wunderlich 那個尤其險——
     被冠上「最後」之名的是 DG 的《Der letzte Liederabend》，**那是另一場**。
  6. **兩張加曲版依先例收下**：Casals 鎖原盤 4 軌、Rubinstein 鎖 7 軌
     且**固定試聽人工改指第二片首軌〈Funérailles〉**（第 1 軌是鋼琴協奏曲，取首軌會取錯；裁定 157 的形狀）。
  7. **工序上的一件事**：本批的研究、hook、寫作三層都拆成兩支各 20 張的代理再合併，
     理由是容器當天重啟過兩次。合併都在主線做（按卡單順序 sort、查重複與缺卡）。
     **代價是撞型**：hook 後半有 5 張、b 組有 6 張是在看到前半交件後回頭改掉的。
