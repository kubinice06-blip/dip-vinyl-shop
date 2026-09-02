# c-59 交接（2026-09-02）：深掘冷門硬蕊爵士 46 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線的第二批（第一批是 c-58 靈魂與放克）。**46 張、46 位藝人（零重複）**，
年份 1964–1983。spiritual jazz、free jazz、私人壓片與廠牌考古：
Strata-East（Shamek Farrah、The Piano Choir、Billy Parker's Fourth World）、
Black Jazz、聖路易 BAG、芝加哥 AACM（Kalaparusha）、日本 free
（山下洋輔トリオ《Dancing 古事記》）。曲風 jazz 48、soul 8、electronic 2、rock 2、pop 1。
零自我同名、零合輯。

**c-58 那條 obscurity 診斷同樣適用於這批**——見 `c58/HANDOFF.md` 第二節。
簡言之：考古廠牌的再發會製造 Last.fm 聽眾數，而 obscurity 軸實質上是聽眾數驅動的，
所以「證明這張碟重要」的證據會同時壓低它的冷門度分數。**加卡不會讓 `obscurity=5`
變多，這批補的是曲風的實質深度。** 要不要重新校準那個軸是店主的決定。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **45/48（94%）**，3 張要掃圖 | `c59/caa.json` 的 `art` 欄 |
| 2. 三軸與 rarity | **雲端未做**（需 `/album-rating`），且見上節 | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **48 張全部寫完並過機器 QA** | `desc-tools/batches/output/c59-out-{1,2}.json` |
| 5. 固定試聽 | 已探測，**14/48 ready** | `c59/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：48 張全部釘住 release-group MBID（其中 4 張經 `fix-rgmbid.mjs` 修正）

修正原因見 `c55/HANDOFF.md` 的同一段——`mbNote` 混著藝人 MBID 與 release-group MBID。

### 封面：45/48，全部來自 CAA。94% 是七批裡最高

**3 張缺封面**（要掃圖）：山下洋輔トリオ《Dancing 古事記》、
Charles Tyler《Saga of the Outlaws》、Chico Freeman《Kings of Mali》。

### 試聽：14/48 ready（29%）

七個 storefront（us／gb／jp／de／fr／nl／br）全試過。

## 三、上架前必須先看 `rulings.md`

主檔在 `c53/rulings.md`（42 條）。與 c-59 直接相關的：

1. **第 33 條：facts 的邊界要守在「這一條 fact」，不是「這張卡所有 facts 加起來的推論」。**
   這批的私壓盤最容易誘發推論式行文（幾條零散事實拼出一個因果故事）。
2. **第 34 條：`qa-check-research.mjs` 第 33 行把 `researchNotes` 也放進比對 blob**——
   規則與檢查器不一致，「只出現在 note 裡的人名」在檢查器眼中是合法的。
   **這一關只有寫作層人眼守得住**（c-57 的第 42 條是同一個洞的實例）。

### 一處寫作層主動回報、需要研究層補料才能解的落差

**第 23 張 Kalaparusha《Humility》**：hook 寫「同一張唱片上三種寫法」，
但 facts 只給得出**兩種**標題拼法（正面 *Humilty In the light of creator*、
背面與標籤 *Humilty In the light of the creator*）——第三種要把標籤上的掛名
「Maurice McIntyre (Kalaparusha)」算進去才湊得出來。

依規則 hook 原封保留，行文只寫兩種拼法＋掛名，**沒有替 hook 補足第三種**。
本機若要讓 hook 與行文完全對齊，得由研究層補一條帶 src 的 fact。

### 兩處刻意的保守寫法

Chico Freeman 與山下洋輔兩張**未斷言發行年**（來源互相矛盾）；
BAG 那張的「唯一一張」已加 **2024 年**的時間限定。**本機改寫時不要把限定拿掉。**

寫作層另回報為守字數捨棄的次要項目（《Synthesis》未寫封套英文標語、
《Voices in Harmony》未寫 Donovan 音樂總監、《In Paris, Aries 1973》未寫基金會補助
與 Lester Bowie 建議、《King of Kings》未寫 Ted Joans 與 Idris Ackamoor、
《Overground》只留一位導演）。**事實無一新增或改寫。**

## 四、簡介產線的數字

| | out-1 | out-2 | 合計 |
|---|---|---|---|
| 卡數 | 24 | 24 | **48** |
| 字數範圍 | 221–235 | 205–235 | 205–235 |
| 超過 240 | 0 | 0 | **0** |
| `qa-check-research` | 0 | 0 | **0** |
| `fix-spacing` | 0 | 0 | **0** |

`qa-batch out c59` 與卡單 48 張相符、>260 為 0。`chk-hook-crossgroup c59` 通過
（hook 加權 22–41.5、note 279–349）。key 順序與輸入一致、hook 全部原封當第一句。
研究層 **48 張全部 `status: full`**。無合輯，不涉 §5.6 例外。

### hook 重複的問題：把「自資發行」拆成 12 種機制

這批 48 張裡絕大多數都是自資或半自資發行，若照字面寫就會全批同調。
解法是把「self-release」拆成 12 種具體機制（樂手集資、教會出資、大學補助、
演出現場寄賣、樂手自己開的廠牌、基金會補助…），再依各卡的實情分派。
`chk-hook-crossgroup` 的通過是這個分派的結果。

## 五、一件作業環境的事故（未造成損害，但要記下來）

寫作代理回報：**共用 scratchpad 目錄下 `build.mjs` 這種通用檔名被別的工作階段
覆寫過**，它誤跑到對方的腳本一次（02:48），重生成了 `c56-out-1`／`c57-out-1`／
`c57-out-2` 三個檔。

**已確認無損害**：`c56-out-1.json` 與已提交版本逐位元組相同（`git status` 未列為
modified），`c57` 兩檔隨後由本批寫作層正常覆寫並通過全部驗收。
代理之後改用私有子目錄。

**教訓：多工作階段並行時，scratchpad 的通用檔名會互撞。** 腳本要放在
以批次命名的子目錄下。


---

## 2026-09-02 修訂：48 → 46 張（跨批撞卡，裁定第 119 條）

c-65 的封面探測跑出 Smegma《Glamour Girl 1941》時我覺得眼熟，回頭做了一次**跨批**去重，
抓到 **5 筆跨批撞卡**——`chk-prop` 只比對「線上池」與「批內跨組」，
**不比對其他待上架的批次**。本批因此拿掉兩張（依「先到先得」保留較早的 c-58）：

| 移除 | 保留在 |
|---|---|
| Henry Franklin《The Skipper》(1972) | c-58 |
| Dom Salvador e Abolição《Som, sangue e raça》(1971) | c-58（且 c-58 那張的 ç 寫法已依裁定第 36 條定案） |

**卡單、研究稿、hook 稿、寫作輸入、簡介輸出、封面與試聽探測七個檔都已同步移除**，
`qa-batch out c59` 重跑與卡單 46 張相符。

下面的數字表未逐格重算（out-1 由 24 → 23、out-2 由 24 → 23），
**字數區間與零標記的結論不變**。
