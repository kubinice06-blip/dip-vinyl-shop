# c-55 交接（2026-09-02）：土耳其 Anadolu 與阿拉伯世界 45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

**45 張、27 位藝人**，年份 1971–1999。兩條線：土耳其 Anadolu rock 與 halk müziği
（Cem Karaca、Moğollar、Erkin Koray、Barış Manço、Selda Bağcan、Edip Akbayram、
3 Hür-El、Bülent Ortaçgil、Ruhi Su），以及阿拉伯世界（Abdel Halim Hafez、
Ziad Rahbani、Idir、Ilham Al Madfai）。曲風 world 26、folk 25、rock 19、pop 6、
classical 3、jazz 2。7 張自我同名。

**開批前的規模估計錯了一次**：我用取樣算出「池中已有 4 張」，實際策展層全掃後
是 6 張。裁定第 27 條記了這個形狀——**取樣只能用來排除，不能用來確認數量**，
這是同一個錯誤第三次出現（前兩次是韓國與牙買加）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **38/45（84%）**，7 張要掃圖 | `c55/caa.json` 的 `art` 欄 |
| 2. 三軸與 rarity | **雲端未做**（需 `/album-rating`） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c55-out-{1,2}.json` |
| 5. 固定試聽 | 已探測，**12/45 ready** | `c55/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：45 張全部釘住 release-group MBID——但這個數字修過一次

**這批出過本次擴充最嚴重的一個技術錯誤，本機要知道它已經修好了。**
`make-cards-generic.mjs` 從策展層的 `mbNote` 欄抽 MBID 時**取第一個出現的**，
而 `mbNote` 裡混著藝人 MBID 與 release-group MBID——**27 張因此釘到藝人條目**。
格式合法、驗證器擋不下來，而且它讓封面覆蓋率看起來只有 14/45。

`batch-progress/fix-rgmbid.mjs` 把每筆 `mbNote` 裡的**所有** MBID 都回問 MB、
取第一個確實是 release-group 且標題對得上的。修完 c-55 是 27 筆、
c-56 3 筆、c-57 1 筆、c-58 1 筆、c-59 4 筆。**修完後封面才是 38/45。**

這與 c-52 裁定第 1 條是同一個錯誤（那條就是我自己寫的）。教訓寫在
`c53/rulings.md` 的相關段落：**任何從 `mbNote` 抽 MBID 的腳本都必須回問實體類型。**

### 封面：38/45，全部來自 CAA

**7 張缺封面**（要掃圖）：Cem Karaca《Nem Kaldı?》、Ruhi Su《Yunus Emre》、
Ruhi Su《Semahlar》、Abdel Halim Hafez《Ya Malekan Kalby》、
Ziad Rahbani《Bennesbeh Labokra... Chou?》、Idir《Ay Arrac Nneɣ...》、
Ilham Al Madfai（同名）。

**缺的七張裡有四張是阿拉伯線**——阿拉伯目錄在 CAA 上建檔遠比土耳其薄。

### 試聽：12/45 ready

十一個 storefront（tr／ae／sa／eg／lb／ma／dz／de／fr／us／gb）全試過。
命中集中在土耳其線（Pharaway、Guerssen 這些再發廠牌有數位發行）。

## 三、上架前必須先看 `rulings.md`

主檔在 `c53/rulings.md`（42 條）。與 c-55 直接相關的：

1. **第 25 條：`queryAlias` 只填外部服務認得的字串**——阿拉伯文 credit 不入 alias。
   判準是「這條 alias 會拉高還是拉低封面／試聽命中率」，不是「看起來像不像別名」。
2. **第 26 條：阿拉伯文轉寫只用 MB 標題自帶的，不自創。**
3. **第 27 條：取樣低估第三次出現**（見上）。
4. **第 40 條：《Hey》雜誌 1973 年票選被 `qa-batch` 誤標成「未具名出處」**，
   已人工複核放行、規則不改。理由與 `qa-batch.mjs` 第 198–205 行的註解一致。

**本機還要知道一件本批以外的事**：`Selda` 與 `Selda Bağcan` 在池中是兩個掛名，
應該合併。這是線上資料，雲端不動。

## 四、簡介產線的數字

| | out-1 | out-2 | 合計 |
|---|---|---|---|
| 卡數 | 23（full 20／thin 3） | 22（full 18／thin 4） | **45** |
| 字數範圍 | 160–234 | 172–234 | 160–234 |
| 超過 240 | 0 | 0 | **0** |
| `qa-check-research` | 0 | 0 | **0** |
| `fix-spacing` | 0 | 0 | **0** |

`qa-batch out c55` 與卡單 45 張相符，唯一標記是上述第 40 條的已查核誤報。
研究層 38 張 `status: full`、**7 張 thin**（七批裡最多）。無合輯，不涉 §5.6 例外。
