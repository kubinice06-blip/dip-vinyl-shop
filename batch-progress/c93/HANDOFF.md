# c-93 交接（2026-09-05）：搖滾正典目錄深度 I，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主 2026-09-05「**接力做完十批**」的第一批。`lineType: 廣度`——
**不是去挖沒人聽過的小廠牌，是把已經在池裡、卻只有一兩張的正典藝人補到該有的深度**
（藍圖 §五-1：每位先確認「第一張該有的」在不在，再談深度）。

**45 張、22 位藝人、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID、合輯 0 張。
年份 1966–2008。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 後龐克與另類 | 20 |
| b | 前衛、車庫與 90s | 25 |

**逐位藝人**：Elvis Costello and The Attractions 4＋Elvis Costello 1、Magma 4、
Devo 3、Pere Ubu 3、The B-52's 3、Robert Wyatt 3、The Flaming Lips 3、
Joy Division 2、This Heat 2、Gentle Giant 2、Spiritualized 2、Liz Phair 2、
The Cranberries 2、Guns N' Roses 2，Suicide／Jane's Addiction／The Damned／
Gang of Four／Soft Machine／Jeff Buckley／The Sonics 各 1。

**策展層實掃後主動不收的五位**（目錄在池中已完整）：The Stooges 3、The Stone Roses 2、
New York Dolls 2、Neutral Milk Hotel 2、Slint 2。
另 Suicide《Suicide (The Second Album)》與池中《Suicide: Alan Vega and Martin Rev》是同碟。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **45/45（100%）** | `c93/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c93-out-{1,2}.json` |
| 5. 固定試聽 | **45/45（100%）**，命中 `gb 40｜us 5` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**封面與試聽都是滿版**，是台灣線以來第一批 100/100 的。

## 三、試聽從 38 補到 45 —— 七張全靠人工覆核

探測層第一輪 38/45。研究層兩組覆核推翻了**七張**，全部是第 152／158／166 條那一族：

| 卡 | 成因 | 正解 |
|---|---|---|
| Joy Division《Substance》 | 副標串進盤名（Apple 作《Substance 1977-1980》） | gb 996111401 |
| Elvis Costello《Blood & Chocolate》 | Apple 用 `and`、卡片用 `&` | gb 1443093435 |
| Spiritualized《Pure Phase》 | 掛名別名（MB 是 Spiritualized Electric Mainline） | gb 1502468694 |
| Liz Phair《whitechocolatespaceegg》 | Apple 寫成首字母大寫 | gb 724319797 |
| Guns N' Roses《Chinese Democracy》 | 撇號彎直兩形 ＋ **search 端點漏碟** | gb 1440756253 |
| The Sonics《Boom》 | Apple 把團名串進盤名（《The Sonics Boom》） | gb 626202316 |
| This Heat《Repeat》 | 盤名帶 `- EP` 後綴 | gb 1526177110 |

**另換綁一張版本錯的**：Suicide《A Way of Life》原綁 1684448551 是 2023 年 35 週年版、13 軌，
多四軌現場與早期版；改綁 1435782281（2005 remaster、9 軌），對應 MB 原盤（第 140 條）。

### 這批推動的三處管線修正

1. **`queryAlias` 一直只被當掛名別名用**（Blood & Chocolate 那張暴露的）。
   卡單本來就備了「Blood and Chocolate」，但 `termsFor` 每一種用法都是 `<alias> <c.album>`，
   `albumCands` 也沒把它算進去。**兩處都改了**，`test-match` 20/20 通過。
2. **第 166 條**：Apple 的 `search` 端點會系統性漏碟，改打藝人頁 `lookup?id=<artistId>&entity=album`。
   本批七張裡有五張是靠這條找到的。
3. **第 169 條**：探測工作握著 `previews.json` 的舊副本整檔覆寫，
   **把本批這五張人工修正靜默蓋掉過一次**（45/45 掉回 40/45，無任何錯誤訊息）。
   `probe-previews.mjs` 已改成「回寫前先重讀並合併」，五張已還原。

## 四、⚠ 上架前必須遵守的六條行文限制（已寫進 out 的正文，這裡是備查）

- **Gang of Four《Songs of the Free》**：MB 那筆標成 1982 GB EMI 原盤的 release，
  **曲序其實是 1996 年 Infinite Zero 版**（〈We Live as We Dream, Alone〉與〈Muscle for Brains〉對調）。
  **正文已全篇不寫任何一軌的序位。**
- **The B-52's《Whammy!》**：MB 預設的 GB release 是卡帶且**曲目重複列成 18 軌**。
  **正文未引任何軌數**；第七軌兩說改寫成「LP 首刷第七軌〈Don't Worry〉…後續壓片換成〈Moon 83〉」。
- **Pere Ubu《Song of the Bailing Man》**：MB 那筆 1982 GB ROUGH 33 的 medium 標成 CD，疑似 MB 有誤。
  **正文不寫載體。**
- **Guns N' Roses《Chinese Democracy》**：**Apple 的 collection 物件寫 `trackCount` 15，
  lookup 卻只回得出 14 個 song 列**（與 MB 原盤一致，第 14 軌〈Prostitute〉）。**軌數一律 14。**
- **This Heat《Repeat》**：Apple 條目只有同名首軌一軌（20:20，對得上 MB 的 20:23），原盤三軌。
  **主線裁定：試聽採用，但該 collectionId 不得作為封面或任何後設資料的來源**，封面走 CAA。
- **The Sonics《Boom》**：Apple 年份欄是 1977（再版年），**原盤 1966**。
  **Robert Wyatt《Ruth Is Stranger Than Richard》**：Apple 是 1998 後的翻面版曲序，**不寫軌序位**。
  **The Flaming Lips《Zaireeka》**：Apple 是四片攤平成 32 軌的單一序列，**不得寫成一張碟 32 軌**。

## 五、三層各自攔下的東西

**研究層擋下策展層 16 處無來源的說法**，其中**兩處與來源相反**：
- **Magma《Ẁurdah Ïtah》**：策展層寫「Theusz Hamtaahk 三部曲的第一部、時序起點」——
  **英文維基明載它是第二部**。
- **This Heat《Repeat》**：策展層寫三軌含〈Health and Efficiency〉——
  **MB 與維基都寫是〈Repeat〉〈Metal〉〈Graphic/Varispeed〉**。
- 另擋下 Jane's Addiction《Strays》的「1991 年解散、2001 年重組後的第一張」與
  「Farrell 與 Navarro 重聚的唯一一張」（維基皆無此說）、
  This Heat《Made Available》的「1996 年首次正式發行」（實為 1988 年 EP 的再發）、
  Suicide 的「流通最廣」、以及十處無來源的目錄號與樂評。

**研究層查證成立、措辭有指定的一處**：Gang of Four〈I Love a Man in a Uniform〉
1982 年福克蘭戰爭期間**遭 BBC 禁播**——**措辭必須是「BBC 禁播」，不是「電台限播」**。

**hook 層攔下 18 處**（兩組合計）。這批的新形狀是**候選本身踩到下游的純字串檢查**——
「0.0 分」會觸發分數星等檢查，Pitchfork 那筆改寫成不帶分數的說法。
另攔下八處算術（「八年前」「解散十一年後」「十六年後」曲長加總）、
三處否定句起手、一處掛名錯（《Still》「唱片公司自己說得白」其實是 BBC Music 的樂評語）、
一處誤述（Devo《Oh, No!》候選寫「刺殺雷根那個人」——維基是 **attempted**）。

**寫作層落筆時再攔下 17 處**，值得記的三處：
- **This Heat《Repeat》**：note 與 sound 都寫「末軌是**同名曲目**的 33 轉版本」，
  但 facts 寫的是〈Graphic/Varispeed〉的 33 轉版本——**note 的說法會把末軌誤指成〈Repeat〉。整條不寫。**
- **Magma《Üdü Wüdü》**：sound 寫〈De futura〉18:00「獨佔一面」，
  但 researchNotes 自己已註明「佔整個 B 面」查無來源。**只寫 18:00。**
- **The Flaming Lips《Transmissions》**：sound 寫「十一軌都在三到六分鐘之間」，
  同欄卻列〈Plastic Jesus〉2:19，**自相矛盾**。只寫最短軌曲長。

另：Devo《New Traditionalists》的 Casale 原話含第二人稱「你」會撞禁語，改寫但語意不變；
Devo《Oh, No!》的〈I Desire〉四項分開寫，**未寫成樂團同情刺客**；
The Damned 的全黑封面明確歸給 **1982 年 Big Beat 單片再版**（不是 1980 原盤）；
Elvis Costello《King of America》寫「取消計畫卻沒告知、旅館等電話」，**未寫成他開除 Attractions**。

## 六、機器 QA 結果

```
node desc-tools/qa-batch.mjs research c93        key 與卡單完全一致 ✓｜全部通過 ✓
node desc-tools/qa-batch.mjs hooks c93           全部通過 ✓
node desc-tools/chk-hook-crossgroup.mjs c93      2 組｜45 張｜hook 加權 17–40.5｜note 286–350｜✓ 全部通過
node desc-tools/qa-batch.mjs out c93             out-1｜20 張｜字數 217–235｜>260: 0
                                                 out-2｜25 張｜字數 177–239｜>260: 0
                                                 thin 卡 2 張，全部 ≤180 ✓
                                                 out 合計 45 張，與卡單相符 ✓
                                                 **未具名出處 0 盞**（兩組都在動筆時就避開裸字串）
qa-check-research（兩檔各一次）                    各 0 標記
fix-spacing（兩檔各一次）                           待補 0
node batch-progress/c93/chk-prop.mjs a b         45 張｜22 位｜標記 0（跨批撞卡 0）
```

**未具名出處 0 盞是這一輪的第一次**——前面幾批都要事後改寫措辭，這批兩組寫作層都在動筆時
就避開了「百大」「名人堂」「票選」「年度專輯獎」這些裸字串，榜位一律用具名形式
（Billboard 200、英國專輯榜、AllMusic、《New York Rocker》、《The Wire》）。

## 七、交給本機的線上資料問題

**兩組掛名因撇號字元而分裂**（策展層實掃時抓到，屬線上資料）：
- **Jane's Addiction**：簡報記池中 1 張，**實際 3 張**——彎撇號與直撇號各一批。
- **Guns N' Roses**：同形。

**兩處盤名裁定**（都可逆，改的是卡單欄位）：
Elvis Costello 的四張 Attractions 作沿用池中的 `Elvis Costello and The Attractions`、
《King of America》改掛通行名 `Elvis Costello`；Devo 在池中是全大寫，本批沿用。

## 八、本機還要做的事

1. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。**封面與試聽都滿版，沒有掃圖工作。**
2. **合併 Jane's Addiction 與 Guns N' Roses 的撇號分裂**（第七節）。
3. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
4. **上架前逐張讀 `previews.json` 的 `note`**——45 張裡有 8 張帶覆核說明或引用限制，
   特別是 Guns N' Roses（軌數 14 不是 15）、This Heat《Repeat》（collectionId 不得當後設資料來源）、
   The Sonics《Boom》（Apple 年份是再版年）。
5. **`node scripts/build-genre-tree.mjs --write`**（第 147 條）——**排在 seed 上架之後**，雲端做不到。
