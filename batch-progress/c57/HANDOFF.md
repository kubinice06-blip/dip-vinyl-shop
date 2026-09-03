# c-57 交接（2026-09-02）：牙買加深度 50 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

**50 張、42 位藝人**，年份 1967–2001。rocksteady（Alton Ellis、Hopeton Lewis）、
Studio One 與 Treasure Isle 的歌手線（The Heptones、Delroy Wilson、Ken Boothe、
John Holt、The Ethiopians）、Jackie Mittoo 的鍵盤器樂、roots 與 dub
（The Revolutionaries、Yabby You、I-Roy），到八〇年代的 dancehall（Josey Wales）。
曲風 world 50、soul 16、electronic 6、rock 1。3 張合輯，零自我同名。

**規模估計又錯一次**：我用 20 位藝人取樣算出「池中已有 29 張」，策展代理實掃後
是 130 張以上。裁定第 27 條記了這個形狀（**取樣只能用來排除，不能用來確認數量**）。
這批因此從「開荒」改成「補深」——收的是池中沒有的 rocksteady 過渡期與 dub 專門盤。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **46/50（92%）**，4 張要掃圖 | `c57/caa.json` 的 `art` 欄 |
| 2. 三軸與 rarity | **雲端未做**（需 `/album-rating`） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **50 張全部寫完並過機器 QA** | `desc-tools/batches/output/c57-out-{1,2}.json` |
| 5. 固定試聽 | 已探測，**8/50 ready** | `c57/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：50 張全部釘住 release-group MBID（其中 1 張經 `fix-rgmbid.mjs` 修正）

### 封面：46/50，全部來自 CAA

**4 張缺封面**（要掃圖）：John Holt《Still In Chains》、
Various Artists《Nice Up the Dance: Studio One Discomixes》、
The Revolutionaries《Vital Dub: Well Charged》、I-Roy《Hell and Sorrow》。

### 試聽：8/50 ready——比預期低很多，原因已查明

六個 storefront（jm／gb／us／ca／de／jp）全試過。開批前預估「牙買加是三邊
（MB／CAA／Apple）都最全的一區」，實際 16% 是七批裡第二低。

原因在於**這批刻意收的是池中沒有的東西**：rocksteady 過渡期的原盤與 dub 專門盤，
正好是數位發行最薄的兩塊。池中既有的 130 張多半是有國際再發的正典，那批的試聽率
不能拿來推估這批。

## 三、上架前必須先看 `rulings.md`

主檔在 `c53/rulings.md`（42 條）。**第 41、42 條是本批發現的，兩條都關於
「來源層自己出錯，只有寫作層人眼守得住」**：

1. **第 41 條：研究層的 `sound` 欄把班底寫錯人。**
   Bunny Wailer《Protest》的 `sound` 寫「Barrett 一路的節奏組」，但同筆 facts
   明載貝斯 Robbie Shakespeare、鼓 Leroy「Horsemouth」Wallace 與 Michael Richards。
   （會串是因為 Barrett 兄弟是 the Wailers 的節奏組，而 Bunny Wailer 正是
   the Wailers 成員；同批 Max Romeo 那張的陣容裡也確實有兩位 Barrett。）
   **`sound` 是歸納欄、不逐條帶 src，`qa-check-research` 抓不到它的錯**——
   它比對的 blob 本身就含 `sound`，等於自己給自己背書。研究稿與寫作輸入都已改。
2. **第 42 條：note 的禁令引用了 facts 裡沒有的人名。**
   Max Romeo《Revelation Time》的 note 說「執行製作是 Geoffrey Chung」，
   但這個人只出現在 `researchNotes`、不在 facts。寫作層沒有硬寫，改成只依 facts
   寫「Perry 在這張碟上掛的是打擊與工程」，防錯效果相同。
   **要把 Chung 寫進行文，得先由研究層補一條帶 src 的 fact；本批不補。**

**第 35 條也與本批相關**：策展層有把「這位藝人的名曲」寫成「這張碟的曲目」的傾向，
研究層已逐張比對曲目表更正。

寫作層另回報一批為守字數而捨棄的次要項目（部分卡只留 note 指定兩首曲名中的一首、
或省掉工程掛名），**事實無一新增或改寫**。

## 四、簡介產線的數字

| | out-1 | out-2 | 合計 |
|---|---|---|---|
| 卡數 | 25 | 25 | **50** |
| 字數範圍 | 223–235 | 218–235 | 218–235 |
| 超過 240 | 0 | 0 | **0** |
| `qa-check-research` | 0 | 0 | **0** |
| `fix-spacing` | 0 | 0 | **0** |

`qa-batch out c57` 與卡單 50 張相符、>260 為 0。`chk-hook-crossgroup c57` 通過
（hook 加權 22.5–43、note 283–350）。key 順序與輸入一致、hook 全部原封當第一句。
研究層 **50 張全部 `status: full`**。3 張合輯的 §5.6 例外齊備。
