# dip vinyl 專案備忘錄

### 2026-08-14｜desc-restyle（無 git）｜r-11..r-23 上線 491 張，wave3 重塑產線走完

接力模式一路跑完剩下的十三批。**重切後的 r-01..r-23 共 23 批全部上線**，wave3 至此結束。

| 批次 | 張數 | 家族 | 審稿修正 |
|---|---|---|---|
| r-11 | 41 | 爵士（Chet Baker 7、George Russell 6） | 6 |
| r-12 | 41 | 爵士（Jarrett 標準三重奏 7、Paul Bley 6） | 7 |
| r-13 | 27 | 經典（Coltrane 3、Miles 2、Rollins） | 5 |
| r-14 | 32 | Komeda 6、TOWA TEI 3、Venus 4 | 3 |
| r-15 | 32 | 當代爵士（Christian Scott 5、Ill Considered 4） | 1 |
| r-16 | 41 | 混合（前衛／工業／噪音／古典） | 2 |
| r-17 | 43 | 搖滾／流行（35 位藝人有已上線卡） | 2 |
| r-18 | 40 | 靈魂（Betty Wright 8、Shirley Brown 5） | 1 |
| r-19 | 38 | 靈魂（Candi Staton 7、Spinners 5） | 4 |
| r-20 | 39 | 放克（Staple Singers 6、Mandrill 6） | 1 |
| r-21 | 39 | 靈魂（Impressions 6、Tower of Power 6） | 5 |
| r-22 | 39 | 靈魂（Isley 6、Stevie Wonder 5） | 1 |
| r-23 | 39 | 放克（James Brown 6、War 5、Cameo 5） | **0** |

**十三批 491 張，KV 全部逐字驗證一致。**

## 卡池整理：這一輪移除 4 張、更正 3 處

- **Albert Ayler《Spiritual Unity》重複卡**：apex_pool 掛「Albert Ayler」（已上線、heresy 級）與 seed_cards 掛「Albert Ayler Trio」（待寫）指向同一張唱片。
  ESP 1002 封面與 Discogs 全部版次都掛 Trio，但不能直接刪 apex 那張（會動到頂級牌分層），
  所以走「apex 改掛名 + seed 刪重複」，四處同步：卡池、KV（新 key 寫入舊 key 刪除）、
  Firestore（兩份 doc 欄位互補，把 apex／tier 併進存活的那份、覆核後才刪舊 doc）、r-13 卡單與研究稿。
- **Sidney Bechet《Petite Fleur》《100 Ans De Jazz》、John Coltrane《Live Trane》**：三張無歷史定位的選輯／重發，依常設裁定移除。
- **Bobby Womack《I Still Love You》**：查實是 1987 年 MCA《The Last Soul Man》的預算線改名重發（曲目相同、拿其中一首歌當新標題），移除並刪 KV 孤兒鍵。
- 年份更正：Erroll Garner《Erroll Garner》1951→1953、Albert Ayler《Ghosts》1964→1965；專輯名錯字 Clark Terry 的 Balled→Ballad。
- seed_cards 7,489 → 7,484。

## 兩張本來要被寫錯的卡

- **《The Legacy, Volume 1》**：研究層只查到一條 facts、標 thin，並明確請主線覆核（1995 Enja 選輯 vs 1987 漢堡現場兩說矛盾）。
  主線用三個獨立來源查實為 1987-11-14 漢堡 NDR Bigband 現場、Enja 1995-06 發行九首約 50 分鐘，
  facts 補到四條、status 改 full、hook 重寫——它反而成了七張 Chet Baker 裡唯一的大樂團伴奏錄音。
- **《Ross》**：舊簡介整段寫的是 1983 年 RCA 版（Gary Katz 製作、Donald Fagen 客席），
  但卡池年份對應 1978 年 Motown 版，兩張完全不同的唱片。研究層全數更正。

## 這一輪的規則落地

1. **「研究稿的卡池現值是過期快照」**（寫進 `prompts/hook-base.md`）——研究稿的 poolIssue 記的是研究**當時**的卡池值，
   而卡池整頓發生在研究之後。r-12 兩處年份、r-14 一處曲風、r-15 九處年份、r-18 一處掛名，
   **逐一比對後十三處全部已經是正確的**。適用範圍涵蓋年份、曲風、掛名三類。
2. **prior-context.mjs 兩個缺陷**：①把已移除的卡當「已上線」餵排除條款（全池濾掉 70 筆過期 key）；
   ②按藝人字串精確比對，抓不到同一個人的其他掛名——r-12 的卡掛「Keith Jarrett, Gary Peacock, Jack DeJohnette」，
   13 張掛「Keith Jarrett」的已上線卡一張都沒列出，**包括最該避開的同組三重奏《At the Blue Note》**。改成歸戶比對後補齊。
3. **r-17 起改用 prior 檔**：該批 35 位藝人都有已上線卡，把開場句塞進派工詞會膨脹到上萬字，
   改成把 prior-context 輸出存成 `batches/notes/r-NN-prior.md` 叫代理自己讀。
   效果明確——六張卡因此主動換軸（Iggy Pop 讓開《Instinct》、Interpol 讓開《Marauder》的 Dave Fridmann⋯）。
4. **chk-hook-crossgroup.mjs 重建**：我在 r-10 收尾跑 `rm -f chk-*.mjs` 把這支常設工具一起刪了（檔名符合那個 pattern）。
   重建並在檔頭寫明清理要用帶批次前綴的 pattern；順便修掉排除條款造成的假陽性
   （「遺作歸《Passion》」會讓三張 Seifert 被判成同構），r-11 的告警從 7 項降到 4 項。

## 審稿抓到的實質錯誤（非體例）

- **《Frank Wright Trio》的〈Your Prayer〉是編造的曲名**——那是他 1967 年第二張專輯的**專輯名**（該卡已上線），
  Wikipedia 曲目是 The Earth／Jerry／The Moon。研究稿的 keyTracks 填錯，寫作層照抄。
- **《Dancers in Love》把〈Charleston Rag〉的作曲者寫成 James P. Johnson**——實為 Eubie Blake 1899 年的作品
  （James P. Johnson 寫的是 1923 年的〈Charleston〉）。研究稿的來源是零售商頁面。
- **《World Wide Funk》的「那天正是他的 66 歲生日」**——主詞省略後緊接 Worrell 辭世那句，讀起來是 Worrell，
  但享年 72 者不可能隔年過 66 歲生日。facts 寫明那是 Bootsy Collins 的生日。
- **《Art Davis|Life》把 1985 減 1980 算成六年**、**《Cheer》的 hook 立了 BBC 專訪的懸念而正文從未收尾**、
  **《Lost Weekend》的「該年 12 月」緊接 2026 年發行日會被讀成 2026**（實為 2022）。

## 三次「研究稿互相牴觸」

前十批未曾出現，這一輪三次：Mandrill《Beast from the East》與《Mandrilland》都寫「首度離開紐約錄音室」（依年份歸較早的）、
Brothers Johnson《Blam!!》與《Light Up the Night》都自稱「連續第三張白金」（兩張都降級不寫序數）、
以及 The Persuaders 的「Billboard Hot 100 第 105 名」（Hot 100 只到 100 名，該數字實屬 Bubbling Under）。

## 體例統一（回查全池慣例後才改）

`身分`（194:15）、半形 `&`（215:0）、綽號用「」（90:0 對 〝〞）、Memphis 寫 `曼菲斯`（24:13）。
Memphis 連三批出問題（r-20 的孟斐斯、r-21 同一份裡孟菲斯與曼菲斯並存），已加進每批的 QA 掃描。

## 操作教訓

**KV 寫入或刪除後立刻用 bulk get 讀回會拿到過期結果**（本輪兩次：Ayler 改名、Womack 移除，都回報「仍在」），
wrangler 直查才是可信路徑。bulk get 只適合隔一段時間後的批次核對。

## 主要檔案

- `desc-restyle/batches/output/r-1[1-9]-out-*.json`、`r-2[0-3]-out-*.json`
- `desc-restyle/batches/r-1[1-9]-kv.json`、`r-2[0-3]-kv.json`（已 bulk put）
- `desc-restyle/prompts/hook-base.md`（過期快照規則）
- `desc-restyle/{chk-hook-crossgroup,plan-batch,prior-context,show-writer-split}.mjs`
- `desc-restyle/progress.json`（r-11..r-23 十三筆＋status）
- `dip-vinyl-shop/{seed_cards,apex_pool}.json`

## 驗證

`node verify-kv.mjs r-11 … r-23` → 十三批共 491 張，一致 491、不符 0。

## 下一步

wave3 走完，重切後的 **840 張**全數上線（切批時是 845 張，跑的過程中移除了 5 張：
r-13 三張 Bechet／Coltrane 的廉價重發與拼盤、r-19 的 Bobby Womack《I Still Love You》、
Albert Ayler《Spiritual Unity》的重複卡。**下方 2026-08-14 的重切段落寫的 845 是切批當時的數字，
不是上線數**；以 progress.json 逐批加總為準＝840，與 23 個 `r-*-kv.json` 的實際筆數逐批相符）。
卡池另有一件待辦已另立背景任務：
**118 張同時掛 jazz 與 hiphop 的卡需要逐張稽核**（多數是 jazz rap 的正確雙標，但掃到 Janet Jackson《Control》這類明顯誤標）。


### 2026-08-14｜新功能：拍封面搜尋（測試版）——Haiku 視覺辨識＋卡池比對

- Repo：`dip-vinyl-worker`（新端點）＋`dip-vinyl-shop`（搜尋專輯頁 UI）
- **worker `/cover-scan`**（POST `{image: dataURL|base64}`）：照 `/claude` 既有 Anthropic
  呼叫模式打 `claude-haiku-4-5-20251001`（image block＋文字），system 要求只輸出
  `{"candidates":[{artist,album,confidence}]}`、最多 3 組。上限 base64 5.6M 字元（約 4MB）；
  回應剝 code fence 後 parse，失敗一律回空陣列。**不帶 temperature**（沿用 Sonnet5 教訓）。
- **前端**：搜尋 bar 下方「📷 拍封面搜尋 BETA」＋隱藏 `input[capture=environment]`
  （手機開相機、桌機選檔）。canvas 壓到長邊 1024／JPEG 0.75（約 150KB）再上傳，
  `createImageBitmap(..., imageOrientation:'from-image')` 處理手機 EXIF 方向。
  辨識結果只當線索，實際列出的一律是卡池真有的卡：候選逐一比對，
  **0=藝人＋專輯都中 ＞ 1=只中專輯 ＞ 2=只中藝人**，第 2 層專治「AI 專輯名認錯」。
  低信心（<0.5）標題改「不太確定，可能是」。點卡沿用既有詳情＋試聽。
- 重構：卡池索引 `_asPool()` 與結果渲染 `_asShowHits()` 抽出共用，文字搜尋一併改用。
- **提示詞教訓（Haiku 實測）**：日本藝人封面只印羅馬拼音時模型會照抄
  （TATSURO YAMASHITA），但卡池已全面漢字正名 → 提示詞明確要求換回官方漢字並給範例，
  修正後回「山下達郎」正確命中。另加「認得藝人但專輯沒把握就 album 留空」規則。
- **比對 bug（線上實測抓到）**：鬆散正規化會把《( )》《[untitled]》清成空字串，
  而空字串是任何字串的子字串 → 命中全卡池；單字母專輯（《O》《A》）同理亂中。
  修法：`_asContains()` 空字串直接 false，短字串（含 CJK 判定：CJK≥2、拉丁≥4）只認完全一致。
- 主要檔案：`dip-vinyl-worker/src/index.js`、`dip-vinyl-shop/index.html`
- 驗證：① 本機免費 Haiku 代理先驗提示詞（4 張封面）；② `wrangler deploy` 後 Node 打線上
  端點：Kind of Blue 0.99、Long Season 0.95、山下達郎 For You 0.95 皆正確，Vashti Bunyan
  手寫風封面認錯但 confidence 0.35；③ 離線拿真實卡池（8,118 張）測比對六案例，含
  「藝人對專輯錯」成功救回正確卡、「整組認錯」0 命中；④ 線上 pages.dev 端到端：把封面畫成
  傾斜＋反光的模擬照片塞進 file input，辨識到 Fishmans《Long Season》、命中 4 張（正確卡第一、
  其餘同藝人）、點卡詳情 3 列星星＋簡介＋試聽 playing；console 0 error。
- 成本：單次掃描 Haiku 約 NT$0.1 以下、耗時約 1.3–1.8 秒。測試版**未加頻率限制**，
  之後要防濫用可在 worker 用 KV 計數。
- 已知限制：手寫／純圖像無字封面辨識率低（靠候選清單＋手動搜尋兜底）；
  部署後舊訪客可能被瀏覽器 HTTP 快取擋一次，重新整理即可（SW 導覽本身是網路優先）。

### 2026-08-14｜desc-restyle（無 git）｜r-07..r-10 上線 168 張，接力十批收工

接力模式續跑第七至十批，四批各 42 張。研究層早已完成，每批只跑 hook 2 組＋寫作 2 組。
**卡池與 KV 的整頓資料這一輪沒有再動**（年份／曲風／掛名／移除都在 08-13 那批做完）。

| 批次 | 張數 | 家族 | 審稿修正 |
|---|---|---|---|
| r-07 | 42 | ECM／Black Saint 爵士 | **0** |
| r-08 | 42 | 義大利廠牌爵士 | **0** |
| r-09 | 42 | 自由爵士 | 2 |
| r-10 | 42 | 爵士（大人物集中批） | 1 |

**接力十批合計 r-01..r-10 共 349 張，KV 全部逐字驗證一致。**

## 重切的效果在 r-10 兌現

r-10 是重切設計的壓力測試：**Anthony Braxton 八張、Cecil Taylor 六張、
World Saxophone Quartet 三張、Dexter Gordon 三張、Stéphane Grappelli 三張全部落在同一批**。
舊切法下這些會散進五、六批各寫各的，互相撞軸而且沒人看得見。同批之後：

- 三張編號四重奏（1983／1984／1986）靠**鋼琴席位的人事更迭**切開——1983 是長號手 George Lewis 頂替、
  1984 是 Marilyn Crispell 首度加入、1986 是鋼琴與貝斯同時換血只剩鼓手銜接。**不用任何序數宣稱。**
- 六張 Cecil Taylor 全部避開已上線的《Conquistador!》《Silent Tongues》《Unit Structures》三條軸。
- 三張 Dexter Gordon 一律不寫「1962 年移居哥本哈根」；三張 WSQ 不重複「四把薩克斯風、無節奏組」。

## 審稿修正

**r-09（2 處）**：Mary Lou Williams 那張出現一份沒頭沒尾的排名，具名回《The Penguin Guide to Jazz》；
另一處是研究稿把 Albert Mangelsdorff 的無伴奏獨奏樂器誤寫成長笛，
依 `hook-base.md`「遇到與樂手身分矛盾的細節就降級成不指定寫法」處理，**沒有擅自改成自己以為對的樂器**。

**r-10（1 處，值得記下來）**：Billy Harper《In Europe》原稿以
「Bonandrini 1977 年買下 Black Saint、1979 年再創立 Soul Note」開場。
回查全池 40 餘筆帶 src 的 Bonandrini 事實，**只證得出「他是 Soul Note 創辦人」與「本作是該廠第一張正式發行」，
那組 1977／1979 年份一筆 src 都沒有——它只出現在該卡研究稿的 `notes` 欄**。
依 `hook-base.md`「`notes` ≠ `facts`」降級成只留有來源的部分。
這條規則是 08-11 寫進去的，這是它第一次在審稿階段真的攔下東西。

順帶修了研究稿兩處錯字（`Rosenberg Studie` → `Studio`，十份研究稿裡八份寫 Studio，
同批 Dexter Gordon 那張也寫 Studio），避免日後批次繼承。

## 中斷處理

r-10 的 writer-1 在**修剪階段**吃到一次 529 Overloaded（伺服器端，不是內容過濾器）。
產出檔已完整落地，驗過張數、key 順序、首句與 hook 逐字相符之後**沒有重跑**，
由主線代為把六張 241–272 字整格捨去壓回 188–239。這比重跑整組便宜得多。

## 主要檔案

- `desc-restyle/batches/output/r-0[789]-out-*.json`、`r-10-out-*.json`
- `desc-restyle/batches/r-0[789]-kv.json`、`r-10-kv.json`（已 bulk put）
- `desc-restyle/batches/research/r-10-a.json`、`w3-08-a.json`（錯字）
- `desc-restyle/progress.json`（r-07..r-10 四筆＋status）

## 驗證

`node verify-kv.mjs r-07 r-08 r-09 r-10` → 四批各 42 張，一致 168、不符 0。

## 下一步

**r-11**。重切後總共 r-01..r-23 共 845 張，已上線 349 張，剩 13 批 496 張尚未進 hook。
共用骨架帳本在 `desc-restyle/batches/recut/LEDGER.md`。


### 2026-08-11｜desc-restyle（無 git）｜wave3 重切後開跑：r-01..r-06 上線 181 張

接力模式（A 批進寫作時 B 批開 hook，**審稿與上線嚴格一次一批、照批次順序**）。
研究層已完成，所以每批只剩 hook 2 組＋寫作 2 組。**卡池與 KV 的整頓資料這一輪沒有再動。**

| 批次 | 張數 | 家族 | 審稿修正 |
|---|---|---|---|
| r-01 | 24 | 混合 | 5 |
| r-02 | 38 | 古典 | 1 |
| r-03 | 45 | 電子 | 3 |
| r-04 | 23 | 民謠／世界 | 2 |
| r-05 | 26 | 嘻哈／R&B | **0** |
| r-06 | 25 | 嘻哈／靈魂 | 1 |

六批 181 張，KV 全部逐字驗證一致。

## 規則落地：古典卡通則的適用邊界（已寫進 `prompts/hook-base.md`）

判準一句話：**問「這首曲子在這張唱片之前就存在嗎」**。
存在 → 古典通則（只寫創作背景與首演脈絡，不寫演奏者／指揮／廠牌／錄音年／排行榜）；
這張唱片就是它第一次存在 → 一般專輯規則。
r-02 的 38 張據此分成 21／17 兩邊，Kurtág 兩張還分屬兩種寫法
（《Játékok》是他夫婦自己彈的、《Kafka-Fragmente》寫作品本身）。
**若當初硬套古典通則，Nils Frahm、Yiruma、Einaudi 那幾張會無話可寫。**

## 重切批次的效果，在這六批看得見

- **Madlib 三張**（Lootpack／Madlib 個人／Kazi & Madlib）舊切法會散進三批、各寫各的 Stones Throw；
  重切後同批，創廠敘事只給 Lootpack 那張，正文還直接把「Otis Jackson Jr. 就是 Madlib」寫給讀者。
- **Brigitte Fontaine 七張**（兩張單人掛名＋五張與 Areski 聯名）擠在同一批，
  切出七條互斥的軸、開頭前四字全數互異。同人多卡本來最容易寫成流水帳。
- **底特律／芝加哥的通論**跨五張卡分派乾淨，沒有任何一張把源流概述重講一遍。

## 審稿抓到的 12 處，型態分佈

**時序矛盾 5 處**（最高頻）：Shabaka《Afrikan Culture》(2022) 被寫成「放下薩克斯風之後」但他 2023 年才停吹、
《Of the Earth》的「隔了兩年」實為三年、Kreutzer 的「首演者早已絕交」實為首演後才交惡、
Ernest Ranglin 的「隔了二十年」與 1974–81 錄音／1999 發行對不上、
José González 的「整整五年」實為四年半。
**校對痕跡 2 處**：Toots & The Maytals 的「掛名也仍是完整的」、Miguel Bosé 的「倒不是 Warhol 寫的」。
**指涉錯誤 2 處**：Shabaka 把「曲名」寫成「專輯名」、Aesop Rock 把「同步上架」寫成「買唱片附」。
**研究稿本身有問題 2 處**：Pierre Barouh 那條在來源內部自相矛盾（Saravah 自家型錄頁）、
《Vous et nous》的 Saravah 合作年限與同批另一張跨卡矛盾。
**行文 1 處**：混入 audiophile。

## 寫作層駁回主線 note 指派共 4 次，全部正確

r-05 的 busdriver（Exclaim! 年終榜附分數）、r-06 的 Open Mike Eagle（滾石／Spin 年終榜）、
Kool G Rap（note 要求「寫成 Complex 雜誌的觀察」）、Aesop Rock（Metacritic／Pitchfork 分數）。
**四次都是主線在 note 裡指派了 base 檔明令不得寫的樂評媒體與分數。**
base 檔的禁令設計成「寫作層可以駁回派工詞」是對的。

## 主線這輪犯的三類錯，與對策

1. **在派工詞裡指派研究稿沒查到的事**（3 次）：Saravah 廠牌創立來歷、Air 的 1971 芝加哥組團、
   Rei Harakami 的「日文專輯名」（那兩張的專輯名本來就是拉丁字母）。
   代理都照實回報並改用有來源的版本。**指派通論前要先確認研究稿真的有那條事實。**
2. **派工詞對錯寫作分份**（2 次，r-04 的 Johnny Cash、r-05 的 AKLO 與 Destiny's Child）。
   根因是 `merge-writer-input.mjs` 把研究組 a→e 串起來後**照張數切半**，不是按藝人分組。
   **已新增 `show-writer-split.mjs`，寫派工詞前先跑它對照。** r-06 用了，立刻發現
   Madlib 三張跨在兩份輸入上，兩邊派工詞因此都寫了交叉指認。
   兩次都沒出事，是因為 hook 層的 note 已把同樣指示寫成施工圖、寫作層照 note 走——
   **note 這一層的價值不只是防同構，也是派工詞出錯時的備援。**
3. **改藝人欄只改卡池、忘了同步 key**（1 次，Pierre Akendengué 的重音統一）。發現後補上下游 6 個檔與 KV。

## 待處理

- `skepta|insomnia` 的官方掛名是 **Skepta、Chip、Young Adz 三人聯名**（研究稿 facts 寫了、
  但沒列進 poolIssues），正文已寫成三人聯名，**卡池藝人欄仍是 Skepta 一人**。
- Areski Belkacem 已於 2026 年 6 月 2 日辭世。與 1970 年代那批作品無關、依反向禁令未寫，
  但日後若有他晚期作品的卡，那條時序就變成可寫。
- 《Comme à la radio》的年份在兩組研究稿裡不一致（1969／1970）。該張已上線、本批未觸及。

## 主要檔案

`desc-restyle/`：`show-writer-split.mjs`（新增）、`prompts/hook-base.md`（新增古典邊界一節）、
`batches/{hooks,input,output}/r-0*`、`batches/r-0*-kv.json`、`progress.json`。
剩 **r-07..r-23 共 17 批 / 664 張**未進 hook。

### 2026-08-14｜hub 搜尋列補上搜尋範圍下拉

- Repo：`dip-vinyl-shop`
- 店主問「怎麼把原本搜尋的下拉式選單移除了」——**並沒有移除**，2026-07-23 那組
  `#asField`（全部／專輯／藝人）一直在搜尋專輯頁內。落差是本次新增的 hub 搜尋列只有輸入框、
  field 寫死 `'all'`，首頁看不到下拉。依店主指示（選項 A）**在 hub 搜尋列也補上同一組下拉**。
- 新增 `#homehubSearchField`（三個 option 與頁內同值），送出時 `_asQuery.field` 改讀它而非固定 all；
  `.homehub-search select` 樣式沿用 `.album-search-bar select`（灰底、置中、去原生箭頭）。
  `form.reset()` 在讀值之後才跑，所以下拉會回到「全部」而不影響本次查詢。
- 順帶把 placeholder 改成與頁內一致的「專輯名或藝人名…」。
- 主要檔案：`index.html`。
- 驗證：本機實測三種範圍皆與 07-23 既知數字一致——藝人搜 blue **27 張**（前四張藝人名皆含 blue）、
  專輯搜 kind of blue **2 張**（Kind of Blue／Another Kind of Blues）、全部搜 blue 127 張；
  頁內下拉同步顯示帶進去的範圍；桌機 420px、手機 375px（下拉 45＋輸入 228＋鈕 60）皆無橫向溢出。
- 另依店主指示清掉下一筆紀錄標題前的 `NaN`（來自 commit `ae68dca` 的寫入，店主表示不知來源）。
  **產生該筆紀錄的腳本可能把某個數值算成 NaN 並貼在標題前，日後若再出現要回頭查寫入端。**

### 2026-08-11｜desc-restyle（無 git）｜wave3 重切批次＋通論帳本（寫作前的最後前置）

整頓完的 845 張重新切批。**卡池與 KV 這一輪沒有再動。**

## 人物歸戶：重切的核心

舊切法用**藝人字串**判斷同藝人，所以 Muhal Richard Abrams／Abrams Octet／The Muhal Richard
Abrams Orchestra 被當成三個人、散進三批。新增 `build-person-groups.mjs` 建歸戶層，
**530 種藝人字串 → 488 個人，29 組是多字串合併**（`batches/person-groups.json`）。

兩個來源：
- **findings 的 samePerson**（研究層查證過，最可信）——併了 8 組。
  另外 8 條的別名字串不在本波卡單裡（例如 Abdullah Ibrahim 的卡都在已上線的 w3-04），不需處理。
- **字串編制變體**（`X` / `X Trio` / `X & Y` / `The X`）——產生 38 組候選，**主線逐組看過才採用**。
  這批不能全自動：`Miles Davis` 與 `Miles Davis Quintet` 是同一人，但同名不同人的情況字串比對分不出來。
  規則刻意只比對**聯名的第一位**，所以 `Chet Baker & Paul Bley` 只併進 Chet Baker，
  不會把 Paul Bley 也拖進同一組。

最大的幾組：Archie Shepp 10 張（6 種掛名）、Muhal Richard Abrams 10 張（4 種）、
Betty Wright 8 張、Keith Jarrett 8 張、Chet Baker 7 張、Brigitte Fontaine & Areski Belkacem 7 張。

## 重切：23 批 / 845 張，同人跨批零組

`recut-batches.mjs`。最小 23 張、最大 45 張，**沒有碎批**。

第一版切出 25 批但尾巴碎成 2 張、5 張、10 張各一批——每批都有固定開銷（hook 兩組、寫作兩組），
這樣切是白付。改成**家族內先算好要幾批（`round(總數/40)`，平均超過上限就多切一批），
再把人物塊由大到小放進當下最小的批**，各批張數自然拉平；不足 20 張的小家族
（blues 2、pop 10、world 12）併成一批混合批。

家族分佈：soul 6 批、jazz-中期 6 批、jazz-當代 2、hiphop 2，
classical／electronic／folk／jazz-早期／rock／無曲風／混合 各 1。
**守恆驗過**：845 張、845 個 key，零遺漏零重複。

## 研究稿按新批次重組

研究稿原本按舊批次（`w3-XX-y`）存放，重切後對不上。已重組成 `r-NN-a..e` 共 **104 份**，
同人不跨組（hook 層要一眼看到同人全貌）。驗證：23 批的研究組檔與卡單完全對應、facts 皆非空。
**舊的 `w3-*` 檔案保留不動**，當對照用。

## 全域通論帳本

`batches/recut/LEDGER.md`。333 條共用骨架歸成 17 個主題，跨批分佈最廣的幾條：

| 主題 | 張數 / 批數 |
|---|---|
| Soul Note／Black Saint（Bonandrini） | 18 / 7 |
| 辭世使本作成為最後作品 | 17 / 11 |
| BYG Actuel 1969 巴黎 | 15 / 7 |
| Venus Records 日本重製 | 15 / 5 |
| 同一場錄音拆成多張 | 13 / 7 |

**這份帳本管的是反同構，不是配額**——廠牌沿革與曲風源流依 2026-08-02／08-08 裁定沒有配額，
只要是該作背景就要寫；帳本要防的是同一段沿革被照抄，每張得從自己這張唱片的角度切進去。

## 下一步

從 **r-01** 開始跑 hook → 合併 → 寫作 → 機器 QA → 逐張人工審稿 → 上 KV。
研究層已經做完，所以每批只剩 hook 2 組（Opus）＋ 寫作 2 組（Opus）。

### 2026-08-11｜dip-vinyl-shop ＋ desc-restyle｜wave3 卡池整頓（第一、二階段）

研究階段的 findings 落地。**掛名類（31 條）刻意未執行**，那會改藝人欄、連帶要搬 KV key
與 Firestore 文件 id，等店主裁示。

## ⚠ 先更正兩個先前報告裡的錯誤

1. **卡池是兩個檔案、兩種欄位排列**：
   `seed_cards.json` 是 `[artist, album, …, genres(5), year(6), …]`；
   `apex_pool.json` 是 `{hall|pearl|heresy: [[artist, album, genres(2), year(3)]]}`。
   先前的曲風年代稽核**只掃了 seed_cards**，漏掉 633 張 apex 卡。已改成兩個池都掃。
2. **「43 張無曲風卡」是錯的，實際只有 15 張**。w3-29 的卡單是照只讀 seed_cards 的舊掃描切的，
   把 apex 卡誤判成無曲風；那 28 張 apex 卡現在都已有標籤。研究層為它們補判的曲風
   帶著過時的 `current: []`，套用會覆蓋現有標籤，已在腳本裡擋掉（跳過 26 筆）。
3. 曲風年代稽核裡 `electronic` 的下限原設 1968 太晚——具象音樂 1948 年就有，
   Pierre Henry《Variations pour une porte et un soupir》(1967) 與 Zappa《Lumpy Gravy》(1967)
   是誤報。已把 electronic 移出年代判準。

## 第一階段：年份與曲風（不動 key）

`apply-pool-fixes.mjs`（新增，兩個池都處理，預設乾跑）。
- **年份 66 筆**（seed 63／apex 3），含 21 張原本是 `null` 的。落差最大的是
  Marian McPartland《Interplay》2017→1969、The Singers Unlimited《Four of Us》2014→1973。
- **曲風 160 筆**（研究層 109／程式全池稽核補 50，另手動修 1）。修完後
  **年代上不可能成立的標籤歸零、池外標籤歸零**。
- 曲風詞彙硬限制：兩個池合計只有 10 種標籤（rock/jazz/electronic/soul/hiphop/pop/folk/world/classical/blues）。
  **主線在 w3-29 派工詞裡誤列了 `funk` 與 `chanson`**，池內並不存在；腳本用 MAP 收斂
  （funk→soul、chanson→pop、new age→electronic、reggae→world…），收斂不了就跳過。
  **不得寫入池內不存在的標籤——那會產生抽卡永遠抽不到的孤兒。**
- 跳過 39 筆：26 筆過時建議、9 筆低信心、3 筆 proposed 寫成不可解析的字串、1 筆拿掉後會變空陣列。

## 第二階段：移除 9 張

`remove-w3-cards.mjs`（新增）。seed 7,501 → **7,492**。KV 清 27 個 key
（desc2/desc4/rating4 各一組），**用 bulk get 驗證零殘留**（沒用 `/album-desc`，那會觸發重新生成回寫）。

移除的是：Art Ensemble of Chicago 三張（一張與已上線卡同一份 BYG 529.302 錄音、兩張是合併重發）、
Don Cherry《“mu” First Part / “mu” Second Part》（1971 年 2LP 合併版）、
Gong《Radio Gnome Invisible Trilogy》（2015 套裝，三張裡兩張已是獨立卡）、
Héctor Lavoe《Asalto navideño, vol. II》（與已上線的 Willie Colón 同一份 1973 Fania 錄音）、
Maurane《Les Années Saravah》、Nightmares on Wax《Wax Da Soul》、
Pharoah Sanders《Ballads With Love》（與《Crescent With Love》同一份 1992 錄音）。

**重複卡的實務判準新增一條**：兩張都在時，**優先保留已有上線簡介的那張**（零重工）。

**乾跑救了一次**：清理下游檔案時原本會動到 `batches/research/w2-119-e.json`——
那是**已上線批次的歷史紀錄**，回頭刪列會讓紀錄對不上當初實際出貨的內容。
已限縮成只清 `w3-` 的檔案。這條寫進腳本註解了。

## 附帶修掉一個前台實際在壞的 bug

Busta Rhymes《Extinction Level Event 2: The Wrath of God》**不是重複卡**——
池內只有一張，但 KV 的簡介掛在**不帶冒號**的舊 key 底下，卡片自己的 key 沒有 desc2，
前台一直在走現場生成。已把值搬到正確 key、刪掉孤兒、驗證通過。

**順手做了全面排查**：對 wave3 全部 971 張卡產生 193 個標點變體 key（去冒號、彎引號→直引號、
去撇號／逗號／句點、破折號變體）逐一探測 KV，**只找到這一個孤兒**，不是系統性問題。
清單存 `batches/findings/AUDIT-orphan-desc-keys.json`。

## 待店主裁示（未動）

1. **31 條掛名更動**——會改藝人欄，連帶搬 KV key 與 Firestore 文件 id。
   最集中的是 Brigitte Fontaine 與 Areski Belkacem 的五張合作專輯被拆成單人掛名。
2. **The Gap Band《Gap Band III》vs《The Gap Band III》**——同一張 1980 年專輯，
   **兩張都已有上線簡介**，刪錯代價高。官方作品序列用「The Gap Band N」，傾向保留帶 The 的那張。
3. **Don Cherry《“Mu” First Part / “Mu” Second Part / Orient》(2013)**——已上線的三合一，
   與池內三張原作重疊，移除會刪掉現行簡介。
4. **三張《平均律鍵盤曲集》**（1999 Clavier／2004 Klavier, Buch I／2009 Klavier）——
   只差拼寫與大小寫，撞名偵測抓不到；且藝人欄分裂成「Johann Sebastian Bach」與「J. S. Bach」。

## 主要檔案與驗證

新增 `desc-restyle/{apply-pool-fixes,remove-w3-cards}.mjs`；
異動明細 `batches/findings/{APPLIED-pool-fixes,APPLIED-removals,AUDIT-orphan-desc-keys}.json`。
兩個池都在改動前備份（`*.backup-before-w3-cleanup.json`、`*.backup-before-w3-remove.json`）。
寫入前逐筆比對確認只有預期欄位變動；KV 刪除以 bulk get 驗證零殘留。

### 2026-08-11｜desc-restyle（無 git）｜wave3 研究階段全部完成（29 批 / 973 張）

依 2026-08-11 的新流程「先全部研究完、整頓卡單、重切批次，才開始 hook 與寫作」，
**w3-06..29 的研究已全部做完**。w3-07..29 共 **99 組 / 809 張**，加上先前的 w3-06（47 張），
全部通過 `qa-batch research`。**hook 與寫作一張都還沒開始**，卡池整頓也尚未執行。

## findings 總計（99 組）

| 類別 | 條數 | 備註 |
|---|---|---|
| 卡池問題 | **294** | 曲風 145、年份 84、掛名 31、待裁示 23、重複卡 7、建議移除 4 |
| 同人異名 | 16 | 重切批次時要歸同一批 |
| 舊稿錯誤 | **171** | 線上現有簡介的系統性稽核成果 |
| 共用骨架 | 333 | 全域通論帳本的原料（總骨架 809 條） |

信心分佈：high 187、medium 77、low 30。彙整表：`batches/findings/SUMMARY.md`。

## 三個系統性問題（不是零星錯誤）

1. **曲風標籤污染**。145 條曲風問題裡，最大宗是靈魂樂老專輯被標 `hiphop`。
   主線另寫了 `audit-genre-anachronism.mjs` 對全池掃描，找出 **76 張發行年早於該曲風成形**的卡
   （最早是 Little Richard 1957 年那張），清單在 `batches/findings/AUDIT-genre-anachronism.json`。
   **關鍵**：這 76 張裡有 44 張不在 wave3 卡單內，研究層永遠不會碰到——
   **逐張抽驗看不到規模，全池掃描才行**。修起來乾淨：75 張拿掉後仍有有效標籤，
   只有 The Staple Singers《Be What You Are》會變成空陣列。
   另注意研究層點出的第二類：**年代成立但內容不符**的誤標（1985 年的 Slave 標 hiphop），
   程式掃不到，只能靠逐張判斷——所以 76 張是下限不是全部。

2. **無曲風卡**。w3-29 那 43 張 `genres` 是空陣列，被所有曲風抽卡排除、等於不存在於遊戲中。
   研究層逐張補判，**41 張判出、2 張判不出**（Godard《Histoire(s) du Cinéma》、
   Cacciapaglia《Sonanze》）。順帶查出 **21 張年份原本是 null** 並補齊。

3. **同人異名與掛名拆散**。已記 16 條。最要緊的幾組：
   Wendy Carlos／Walter Carlos（1969 原版封面用舊名，池內另一張仍是舊名）、
   Johann Sebastian Bach／J. S. Bach、Abdullah Ibrahim／Dollar Brand／Abdullah Ibrahim & Ekaya、
   Muhal Richard Abrams 的 Octet／Orchestra、David Murray 的三種編制掛名。
   還有一組是**被拆散的聯名**：Brigitte Fontaine 與 Areski Belkacem 的五張合作專輯，
   卡池全部只留單人掛名（w3-07 一張、w3-28 四張）。

## 舊稿錯誤的型態（171 條）

最嚴重的是**整段簡介寫的是另一張專輯**，抓到三起：
Diana Ross《Ross》（1978 Motown 版被寫成 1983 RCA 版的內容）、
Alexander Robotnick《Kind of... Robotnick》（寫成他另一張已上線的《Ce N'Est Qu'Un Début》）、
以及 `?te whyte`（台灣歌手？te／壞特被讀成英文人名「Kate Whyte」，風格也全寫錯）。

其次是**張冠李戴**：Lakeside 用了另一張專輯的招牌曲當開場、Kool & the Gang〈Summer Madness〉
的出處寫錯（**且舊稿的整個開場鉤子就建立在這個錯誤上**）、Curtis Mayfield 的取樣者張冠李戴、
The Move 的翻唱對象把 Tom Paxton 誤記成 Tom Jones、Shirley Brown 把〈Woman to Woman〉
歌詞裡的 Barbara 記成 Betty 還據此編了續集敘事。

**新增一種有效的稽核手法：用生卒年反推。** 抓到兩筆：
Gianni Basso & Renato Sellani《Body and Soul》卡池標 2017，但兩人分別於 2009、2014 辭世；
Otis Clay《The Gospel Truth》（1993）的製作人 Monk Higgins 卒於 1986。
**已寫進後續派工詞的檢查清單。**

## 研究層推翻主線的重要一次：古典卡通則的適用邊界

w3-27 的 a 組與 b 組**各自獨立**指出——主線把整批當古典卡、要求套用
「只寫創作背景與首演脈絡，不寫演奏者／廠牌／錄音年」的通則是錯的。
那條規則預設的情境是**老曲目由後人重新演奏錄製**；但 Nils Frahm、Yiruma、Yann Tiersen、
Sébastien Tellier、Philippe Sarde 這些是**作曲者本人就是演奏者的當代原創作品**，
作品與唱片無法分離，硬套會寫不出東西。兩組都改用一般專輯寫法並回報。
**這條邊界要補進 `prompts/research-base.md` 的古典卡通則。**
同一批還抓到 Warne Marsh（咆勃系薩克斯風手）被標成 classical。

## 產線觀察

- **七次代理被內容過濾器中斷，七次產出零損失**——都斷在交件後的自我檢查階段，
  兩個檔案已經落地。主線逐一驗過張數、key 順序與 findings 四陣列才判定不必重跑。
  這是研究層維持多組小切（每組 8–9 張）的直接回報。
- **QA 誤報一次**：w3-28-b 的諺文被判為非拉丁污染，但那是 Brown Eyed Soul 的團員本名與曲名，
  規則明訂專名可用原文並附羅馬拼音，屬合法。
- 半形逗號貼中文共修 5 組（w3-07-b、w3-09-a、w3-09-c、w3-15-d、w3-28-c），
  第二波起在派工詞加了這條後發生率明顯下降。
- w3-14-b 漏進西里爾字母（打 billing 時前三字母跑成 бил）且研究稿順序被打亂，均已修。
- **WebSearch 額度在多組並行時會被整個 session 共用耗盡**，後段代理改用 WebFetch 補查。
  這是往後排波次時要納入考量的實際限制。

## 主要檔案

`desc-restyle/`：`mk-research-groups.mjs`（切組＋產批次備註）、`sum-findings.mjs`（彙整）、
`audit-genre-anachronism.mjs`（全池曲風年代稽核）、`batches/{groups,notes,research,findings}/`、`progress.json`。

## 驗證

99 組研究稿張數與 key 逐字對齊、findings 四陣列齊備；w3-07..29 全部批次 `qa-batch research` 通過。
**卡池一張都還沒動**——整頓要等店主對掛名類更動裁示後才執行。

### 2026-08-14｜歌荒救星 hub：三個主項目文字對齊、等高同列

- Repo：`dip-vinyl-shop`
- 店主回報介面亂、「品味生死鬥」偏左、標題上下沒置中。**根因是 BETA 標籤與收合 caret 都算進了
  flex 置中的寬度**，把文字推離中線（BETA 約推 19px、caret 約推 9.5px，三行各偏一點所以對不齊）。
- 修法：兩者都改 `position:absolute` 脫離排版流——`.homehub-beta` 定位在
  `left: calc(100% + 8px)`（需搭配 `.homehub-solo .homehub-card-name` 設 `position:relative; display:inline-block`，
  否則 100% 是容器寬不是文字寬）；`.homehub-group-caret` 定位 `right:24px`，與卡片箭頭 `right:20px`
  的字形右緣對齊（→ 的 advance width 較寬，同樣 right 值會差 4px）。
  caret 收合旋轉要寫成 `translateY(-50%) rotate(-90deg)`，否則會覆蓋掉垂直置中的 transform。
- 同時把三行做成**等高同列**：分組標題 padding 改對稱 `22px 44px` 並加 `border-bottom`，
  `.homehub-solo` 拿掉 `margin-top:24px` 與 `border-top`、padding 改 `22px 44px`（原本吃 `.homehub-card` 的 28px）。
- 主要檔案：`index.html`。
- 驗證：以 Range 量文字節點實際 bounding rect——找一張來聽／品味生死鬥／你的收藏／搜尋專輯
  四行文字中心**全部 187.5px＝hub 正中**（「找一張來聽」與「品味生死鬥」同為五字，left/right 都是 147/228）；
  三行等高 67.2px、間距 0；caret 右緣 355.1 對箭頭 355；展開後子卡接續整齊，手機 377px 無橫向溢出。

### 2026-08-14｜歌荒救星 hub：分組預設收起、品味生死鬥拿掉副標題

- Repo：`dip-vinyl-shop`
- 「找一張來聽」「你的收藏」**預設收起**：HTML 兩個 `.homehub-group-label` 的 `aria-expanded` 直接寫死
  `false`（不靠 JS 設定，避免載入瞬間閃現展開），收合判斷由 `stored === 'closed'` 反轉為
  `stored === 'open'` 才展開——沒存過的新訪客一律收起，點開後才寫入 `open` 並在下次記住。
- 品味生死鬥移除 `.homehub-card-desc` 副標題，另加 `.homehub-solo .homehub-card-name { margin-bottom: 0 }`
  補掉卡名原本留給副標題的 6px 下緣空白。
- 主要檔案：`index.html`。
- 驗證：清掉 localStorage 模擬新訪客——兩組 `aria-expanded=false`、body `display:none`，
  首頁只剩「找一張來聽／品味生死鬥／你的收藏／搜尋專輯」四行，hub 高度 943px→**514px**；
  品味生死鬥卡內文剩「品味生死鬥BETA →」無副標題；點開寫入 `open`、重整後維持展開，再點回收記 `closed`。

### 2026-08-11｜desc-restyle（無 git）｜wave3 第二波研究：w3-11..14、22、24-a、26

**只做研究、不進 hook**（沿用 2026-08-11 的新流程）。本波 162 張／20 組全部通過
`qa-batch research`。累計已研究 326 張，尚未研究的是 w3-15..21、w3-23、w3-25、w3-27..29 與 w3-24 的 b 組。

**兩件結構性的事，值得單獨記**：

1. **「Air」這個藝人欄把兩個完全不同的樂團併成同一個字串**——美國自由爵士三重奏 Air
   （Henry Threadgill／Fred Hopkins／Steve McCall）與法國電子雙人組 Air（Godin／Dunckel）。
   牽動本批的《Air Mail》《Air Song》與池內已上線的《Air Lore》《Moon Safari》等五張。
   前台抽卡與同藝人排除都以藝人字串為鍵，這會把兩個樂團當成同一位藝人。**待店主裁示怎麼分。**
2. **Gianni Basso & Renato Sellani《Body and Soul》的卡池年份標 2017，但 Basso 2009 年、
   Sellani 2014 年皆已辭世**——兩人不可能在 2017 年共同錄音。這筆是靠生卒年反推抓出來的，
   值得加進日後的年份稽核手法：**掛名雙人的卡，年份要對得上兩人的在世區間**。

**中斷與污染各一次，兩次都沒有流到下游**：
- w3-13-d 被內容過濾器中斷，但兩個檔在中斷前已完整寫出（8 張、key 對齊、findings 四陣列齊備），
  驗證後**不必重跑**。這正是研究層維持多組小切的價值——損失面被壓在一組之內。
- w3-14-b 漏進西里爾字母（打 billing 時前三個字母跑成 бил），QA 攔下、主線修掉；
  該組研究稿順序也被打亂，已對回組檔（`merge-writer-input` 靠順序對齊，不能留給下游踩）。
- w3-22-a 的研究層**第一版整份寫成簡體中文，它自己發現並整份重寫、以程式逐字掃描確認乾淨才交件**。
  w2-121 那次是主線事後才抓到，這次擋在源頭——base 檔那條「寫完請用程式逐字檢查、不要用眼睛掃」有效。

**本波 findings**：卡池問題 57 條（年份 30、曲風 13、待裁示 9、掛名 4、重複卡 1）、
同人異名 4 條、舊稿錯誤 14 條、共用骨架 73 條。
**全部 39 組累計**：卡池問題 107 條（年份 55、掛名 18、曲風 16、待裁示 13、重複卡 3、建議移除 2）、
同人異名 9 條、舊稿錯誤 20 條、共用骨架 168 條。彙整表見
`desc-restyle/batches/findings/SUMMARY.md`（全部）與各波的 `SUMMARY-*.md`。

**年份錯法的分佈已經很清楚**：55 筆裡絕大多數是**重發年或錄音年冒充發行年**，
日版 SACD 與 Venus Records 的重新母帶系列是重災區（w3-13 的 c 組 8 張裡 6 張同廠、4 張年份錯）。

**舊稿錯誤的型態**：數字誤植（Destiny's Child 把 Billboard 200 首週名次 59 當成最高名次，實為 34）、
過度概括（Betty Wright「整張親筆寫成」實為獨立或聯合創作、Goodie Mob「Cee-Lo 只在半數曲目」實為 16 首全掛名）、
查無來源的編制描述（Komeda《Dance of the Vampires》的「冷冽弦樂」，實際是人聲合唱、大鍵琴、雙簧管、法國號）、
以及**憑空出現的人名**（Shuggie Otis 舊稿的合寫者「Dan Aldrich」在完整 credit 裡查無此人）。

**主要檔案**：desc-restyle/batches/{groups,notes,research,findings}/、progress.json、sum-findings.mjs。
**驗證**：20 組研究稿張數與 key 逐字對齊、findings 四陣列齊備；六個批次的 `qa-batch research` 全部通過。
**卡池整頓仍未執行**——連同 w3-06 那批的更正，等全部批次研究完再一次動手。

### 2026-08-14｜歌荒救星 hub 字級層級調整

- Repo：`dip-vinyl-shop`
- 店主指定：「找一張來聽」「你的收藏」要跟「品味生死鬥」一樣大，分組內的子項目再小一點。
  分組標題 `.homehub-group-label` 由 10px/0.28em/灰 改為 **15px/700/0.08em/黑**（與 `.homehub-card-name` 同級），
  hover 由變色改為 `opacity:.6`；caret 縮到 9px 並保持灰色，避免跟著加粗。
- 新增 `.homehub-group-body` 內的降級規則：卡名 15px→**12px**、描述 10px→**9px**、padding 28px→22px。
  「你的收藏」小卡原本就是 12/9，現在兩組子項目字級一致；**品味生死鬥在 group-body 外，維持 15px 不受影響**。
- `.homehub-search-label` 同步跟上 15px/700（同層級區塊標題，不跟著改會看起來歪掉）。
- 主要檔案：`index.html`。
- 驗證：本機實測——找一張來聽／你的收藏／搜尋專輯／品味生死鬥皆 15px/700，
  心情選歌等子項目 12px、描述 9px，我的唱片櫃 12px；手機 378px 無橫向捲動（全展開 943px）。

### 2026-08-14｜歌荒救星 hub 改可收合分組、拿掉深色卡

- Repo：`dip-vinyl-shop`
- 店主回饋：深色 `.feature` 大卡不好看、分組要可以收起來。**全部卡片改回白底**
  （`.feature` 樣式與用法一併移除），「找一張來聽」與「你的收藏」的標題改成
  `<button class="homehub-group-label" data-group aria-expanded>`，點擊 toggle 相鄰
  `.homehub-group-body`（純 CSS `[aria-expanded="false"] + .homehub-group-body { display:none }`），
  箭頭 caret 收合時 rotate(-90deg)。收合狀態存 `localStorage` 的 `dipHubGroup:find|mine`，預設展開。
- **品味生死鬥不歸在任何分組**，獨立一張 `.homehub-solo`（上留白＋border-top），不可收合。
- 「搜尋專輯」標題改用 `.homehub-search-label`，與可收合分組標題區隔（否則會有 pointer 游標卻點不動）。
- 主要檔案：`index.html`。
- 驗證：本機實測——深色卡 0 張、卡片底色 rgb(255,255,255)；順序為 找一張來聽→三張→品味生死鬥→
  你的收藏→三張→搜尋專輯；點標題 body display 在 block/none 間切換且寫入 localStorage，
  重整後「你的收藏」維持收合、「找一張來聽」維持展開；手機 378px 無橫向捲動（收合 809px／展開 972px）。
  caret 旋轉以停用 transition 驗得 matrix(0,-1,1,0,0,0)——**Browser pane 未顯示時頁面不合成畫面，
  CSS transition 不會推進，量 computed transform 會停在起始值**，日後驗證動畫要注意這點。

### 2026-08-14｜歌荒救星首頁 hub 三段式分組改版

- Repo：`dip-vinyl-shop`
- 8 張等權重直排卡改為三段：「找一張來聽」（心情選歌／類型挑片／直接來一張）＋「玩點別的」
  （品味生死鬥 BETA）共四張 `.feature` 深色主選項大卡；「你的收藏」（我的唱片櫃／音樂地圖／
  我的抽卡紀錄）收成兩欄小卡（`.homehub-small-grid`，奇數尾卡跨滿版）。
- 「搜尋專輯」從卡片降級為 hub 底部搜尋列（`#homehubSearchForm`）：有關鍵字就設 `_asQuery`
  後 `setActiveTab('album-search')` 並直接 `doAlbumSearch()`，空白只開頁；送出後清空 hub 輸入框。
- 「我的紀錄」全站改名「我的抽卡紀錄」（hub 卡、historyModal 段落標題、兩處 go-history-btn 與其 title）。
- 「直接來一張」描述改「不想選？隨機抽一張你沒聽過的。」補句號並對仗。
- 主要檔案：`index.html`（hub HTML＋CSS＋bootstrapView 搜尋列 handler）。
- 驗證：本機 http-server 實測——首頁 hub 四大卡三小卡與四段標籤齊全、商店 UI 隱藏；
  搜尋列帶「blue」直進搜尋專輯頁命中 127 張（與 07-23 既知數一致）且輸入框清空；
  點「我的抽卡紀錄」小卡開 modal、段落標題同步新名；手機 375px 兩欄小卡無橫向捲動。
  console 僅 worker CORS（只允許 dipvinyl.tw，本機既有現象）。
- 順帶發現未處理：`akinator/index.html` 轉址到 `/#akinator` 但 index.html 無此路由，分享連結會落回首頁，待裁示留或刪。

### 2026-07-23｜搜尋專輯改單一 bar＋範圍下拉（全部／專輯／藝人，預設全部）

- Repo：`dip-vinyl-shop`
- 店主指示：兩個輸入欄收成一條搜尋 bar，左側加下拉單選搜尋範圍。`_asQuery` 改
  `{ q, field }`（field=all｜album｜artist，預設 all）；`doAlbumSearch` 依 field 決定
  matchArtist/matchAlbum，all 時任一欄含關鍵字即命中。排序改「命中欄位取較佳者
  完全一致＞開頭＞內含，同分經典度高→低」。下拉選項與關鍵字離開返回都保留。
- CSS 新增 `.album-search-bar`（flex：select 貼左＋input 佔滿、focus-within 邊框）。
- 主要檔案：`index.html`
- 驗證：本機實測——全部搜 blue 命中 127 張（專輯與藝人都中）；只搜藝人 blue 27 張
  藝人名全含；只搜專輯 kind of blue 命中 2 張（Kind of Blue／Another Kind of Blues）；
  下拉與關鍵字離開返回保留；點卡詳情開＋星星 3 列＋試聽 playing；空白查詢提示。
  （console 403 是 Apple JSONP 本機被擋既有現象，試聽仍走音源地圖播放成功。）

### 2026-08-11｜desc-restyle（無 git）＋ dip-vinyl-shop｜wave3 w3-03..05 上線、w3-07..10 研究波

**上線**：w3-03（19 張）、w3-04（40 張）、w3-05（10 張）推上 KV 並逐字驗證一致，前台抽驗五張皆 KV-HIT。
wave3 累計上線 115 張。w3-03 移除 Eddie Harris《Listen Here》（池內保留他的《The Electrifying Eddie Harris》），
卡池 7,502→7,501。**KV 的 desc2／desc4 已清乾淨，但 `rating4:eddie harris|listen here` 還留著一個孤兒**，
三軸資料無卡可對、不影響前台，日後做 KV 清理時一併刪。
卡池更正八筆年份與兩筆曲風：年份是 Chet Baker《When Sunny Gets Blue》1988→1986、
Abdullah Ibrahim《Banyana》1981→1976 與《Africa - Tears and Laughter》1991→1979、
Tomasz Stańko《Music 81》1983→1984、《Wolność w sierpniu》2005→2006、《Peyotl - Witkacy》2004→1986，
以及兩張 Dizzy Gillespie 的 Pleyel 現場**年份對調**（1948 那場標成 1953、1953 那場標成 1962）；
曲風是 Kenny Larkin《Metaphor》jazz+soul→electronic+jazz（底特律 techno 被標成爵士靈魂）、
橫田進《Over Head》jazz+soul→electronic。
**待裁示**：研究層回報 Butcher Brown《Triple Trey (Instrumentals)》是同年《Triple Trey》抽掉人聲的純演奏版
（曲目編曲錄音完全相同），這張最後保留並照常寫了簡介，是否比照衍生版本移除未定。人工審稿修 6 處，其中 w3-04 的《Leosia》是 hook 前提錯誤——
hook 寫「組了一支新四重奏」，但同四人 1993 年已錄過《Bosonossa》，寫作層照規矩沒動 hook、只回報，
主線三層同步改成「錄音地點挪到了奧斯陸」。

**研究波（新流程首度執行）**：依 2026-08-11 的裁定，w3-07 起先把研究全部做完再整頓卡單、重切批次，
才開始 hook 與寫作。本輪跑完 w3-07..10 共 164 張／20 組，全部通過 `qa-batch research`
（三組半形逗號貼中文已用程式正規化，《》〈〉內原文標題有保護）。**因額度考量停在 w3-10。**

**產線改動**：
- 新增 `desc-restyle/mk-research-groups.mjs`——把卡單切成組檔（`batches/groups/`）並產出批次備註
  （`batches/notes/`，內含多卡藝人分軸清單、專輯名撞名的重複卡候選、oldDesc 稽核名單、
  `prior-context.mjs` 的同藝人既有資料）。派工詞不再逐字打卡單，改叫代理去讀檔——
  23 批共 99 份組檔與 23 份備註已一次產好，w3-11..29 續跑時不必重做。
- **小批不再硬切五組**：五組的理由是中斷保險，8 張的批本來就沒有損失面。改成每組 8–9 張後，
  23 批的代理數從 115 降到 99。
- 新增 `desc-restyle/sum-findings.mjs`——把各組 findings 攤成一張整頓清單。

**研究層查出（尚未執行，等全部批次做完一次整頓）**：卡池問題 50 條——
年份 25（幾乎全是重發年或錄音年冒充發行年，Tommy Flanagan《Confirmation》1999→1982 落差十七年）、
掛名 14、曲風 3（Brigitte Fontaine 三張被誤標 jazz，疑似沿用《Comme à la radio》的標籤）、
重複卡 2、建議移除 2、待裁示 4。同人異名 5 條、舊稿錯誤 6 條、共用骨架 95 條。
最重要的是 **Art Ensemble of Chicago 與 Don Cherry「mu」兩個重複卡叢集**：
前者的《A.A.C.M., Great Black Music - A Jackson in Your House》與已上線的《A Jackson in Your House》
是同一張 BYG Actuel 529.302，差別只在封面印的完整系列標題；後者有四層包裝。
這兩組都是批次備註的「多卡藝人」欄自動攤開後才被代理一次看見的。

**舊稿錯誤（線上還有四百多張同期稿，這是系統性稽核的價值）**：Bill Dixon《Intents and Purposes》
被寫成「首張個人掛名專輯」（1963、1964 已有兩張）且 RCA 委託的成因寫錯；
Stan Getz & Bill Evans 的節奏組漏掉 Richard Davis、雪藏原因是樂評推測而非定論；
Tomasz Stańko《Music for K》寫成有鋼琴（五重奏是小號＋雙薩克斯風＋貝斯＋鼓）；
Tommy Flanagan《Thelonica》寫成鋼琴獨奏專輯（八曲只有頭尾兩曲是獨奏）。

**主要檔案**：desc-restyle/{mk-research-groups,sum-findings}.mjs、batches/{groups,notes,research,findings}/、
progress.json、dip-vinyl-shop/seed_cards.json（7,501 筆）。
**驗證**：w3-03/04/05 KV 逐字一致（19/19、40/40、10/10）；w3-07..10 研究稿 20 組張數與 key 逐字對齊、findings 四陣列齊備。

### 2026-08-11｜wave3 開跑：w3-01（6 張）與 w3-02（40 張）上線

- Repo：`dip-vinyl-shop`（移除 3 張、藝人欄 6 筆、年份 6 筆、曲風 1 筆）、
  `desc-restyle`（W3_PLAN.md、卡單 29 檔、writer-base 補一條、verify-kv 正規式）。
- 驗收：w3-01 KV 6/6、w3-02 KV 40/40 逐字一致；前台各抽驗 4–5 張（帶 cache-buster）全部命中新稿。
  非 CJK 卡回的是 `KV-HIT` 而不是 `KV-HIT-RESTYLED`，那是走一般 desc2 路徑、不是 CJK 優先分支，正常。

## w3-01（6 張，日本爵士）：先改藝人欄才開寫

這批的重點是**前置作業**。6 張的卡池藝人欄都是羅馬字，研究層逐一查證後改成日文原名，
**改完才凍結卡單開寫**——避免重演早上那次「寫完才發現要改藝人欄、得回頭搬 KV key」。
因為這批全是補寫卡（沒有 desc2），實際上不用搬 KV，只動卡池、卡單、研究稿 key 與 Firestore。

| 舊 | 新 | 附帶 |
|---|---|---|
| Naosuke Miyamoto Sextet | 宮本直介セクステット | |
| Sunao Wada Quartet | 和田直カルテット | 年份 1973 → **1977**（他在 TBM 的最後一張） |
| Sunao Wada Quintet + 1 | **和田直** | 年份 2006 → **1972**（TBM-12 原版，2006 是 SACD 重發年） |
| Koji Moriyama | 森山浩二 + 山本剛トリオ | **聯名作**，山本剛トリオ整團伴奏 |
| New Direction Unit | 高柳昌行ニュー・ディレクション・ユニット | |
| Ayako Hosokawa | 細川綾子 | |

**《Coco's Blues》我沒照研究層的建議**：它建議「和田直カルテット・セクステット」但自評只有中信心，
我改用最保守的「和田直」。**卡片標題不該押在查不實的字串上**，編制在四／六重奏之間切換這件事
寫進簡介即可。這條原則值得沿用。

**研究稿有一處串行誤植**：井野信義與鈴木勲都被標成「貝斯、大提琴」，兩位通行身分都是低音提琴手。
hook 層先發現、寫作層確認影響兩張，正文都只寫貝斯。**同一份研究稿裡出現重複的樂器兼任寫法時，要警覺是串行。**

**人工審稿修 2 處，都在細川綾子那張**：伴奏樂團寫成「T. Miyama & The New Herd」——
`writer-base.md` 第 191 行的舉例正好就是「宮間利之とニューハード」，這是明確違規；
另一處是「婚後移居美國，這位爵士鋼琴家兼樂團領班替她牽線」**指代不清**，讀起來像在講她丈夫，
改成明寫 Earl Hines。

## w3-02（40 張，爵士×靈魂樂）：移除 3 張、修正 5 筆

研究層 c 組查出 7 張裡 5 張身分有問題，我逐一覆核後依常設裁定**移除 3 張**：

- **Nina Simone《Ne me quitte pas》**——Philips 452.045 BE，法國四曲 7 吋 EP，曲目取自她的 Philips
  專輯，市場改包裝、無原創內容。
- **Nina Simone《Right On!》**——1972 Roker 小廠牌發行的 1968 蒙特勒現場；該場演出的權威版本是
  2021 年官方《The Montreux Years》。
- **Mahalia Jackson《Negro Spirituals, Vol. 2》**——1962 法國 Philips 把 1946–54 的 Apollo 舊錄音
  重新包裝，同名發行在歐洲有五種以上版號，無彙整論述。

**《In the Upper Room》保留**：那是 1959 年 Apollo（KLP 474）的正規發行，
1950 年代福音樂本來就是把單曲集結成專輯，卡池標的 1984 是法國重發年。

**年份更正四筆全是同一種錯法——重發年冒充發行年**：《In the Upper Room》1984→1959、
Urszula Dudziak《Future Talk》2008→1979、Baden Powell《Estudos》1974→1971、
Terry Callier《The New Folk Sound》1965→1968（這筆例外，1965 是原訂發行年，製作人錄完赴墨西哥而延宕）。
另修 Anita Baker《Giving You the Best That I Got》的曲風標籤 `jazz+hiphop` → `soul`。

**研究層推翻主線四處**：Maze 不是伴奏班底出身（The Butlers 與 Raw Soul 都是 Frankie Beverly
自己領銜主唱，與 Marvin Gaye 是巡演開場嘉賓關係）、Baden Powell 那四張不是都在 Villingen 錄
（《Tristeza》錄於里約、《Estudos》是 1971 夏威夷／Elenco 原發）、四張裡查無任何 Jobim 曲目、
Steve Lacy 是巴黎時期不是羅馬。

## `oldDesc` 稽核：這一波新加的機制，第一批就有收穫

把既有簡介當**稽核對象**而非來源，四組研究回報抓到六處舊稿錯誤：

1. Roy Ayers《Change Up the Groove》的「AllMusic 四星」查無來源。
2. Roy Ayers《A Tear to a Smile》把同團《Virgo Red》的**錄音工程師** James Green 寫成本張的協同製作人。
3. Azymuth《Light as a Feather》的「銷量逾五十萬張」查無來源。
4. Terry Callier《Lifetime》的廠牌寫錯——Verve Forecast 是前作《Timepeace》的廠牌，本張是
   Talkin Loud／Blue Thumb。
5. Anita Baker《The Songstress》的「出道即賣三十萬張」**方向反了**：獨立廠牌通路有限，
   當時沒賣動，30.7 萬是 1992–2007 的累計數字。
6. Dee Dee Bridgewater《Afro Blue》把 Cecil Bridgewater 誤植成她兄弟，實際是**當時的丈夫**。

**線上還有四百多張同期舊稿，這條回報線要一直開著。**

## 一個新的失敗模式：改年份會把 facts 掏空

Mahalia Jackson《In the Upper Room》的年份從 1984 改成 1959 之後，
**研究層原本三條 facts 全錨在 1984 年法國版上**，加上「不得交代重發」的禁令，
等於整張沒有可用素材；而我指派的「拒絕唱世俗音樂」骨架研究層也明說沒找到來源。
是 hook 層回報才發現的。Urszula Dudziak《Future Talk》同樣情況。
**兩張都由主線另行查證補入有來源的事實**（Bess Berman 要她錄藍調她拒絕、1937 年 Decca 也因此放棄她；
《Future Talk》的 Music Farm Studios、Bob Ludwig、以及「全碟無疊錄」這條剛好撐住 hook 的軸），
status 由 thin 升為 full。

**教訓：更正年份或下重發禁令之前，先確認該張的 facts 不是全部錨在被否定的那個版本上。**

## 工具與規則

- `writer-base.md` 補一條：**爵士與靈魂樂批次的字數低估與 CJK 批次同病**。
  三組獨立回報初稿單向超標、無一張掉下限（writer-1 是 9 張裡 8 張、writer-4 是 11 張裡 9 張、
  中位 +30）。根因不是日文，是這兩個曲風一張唱片要點名四到六個拉丁專名
  （〈Papa Was a Rolling Stone〉吃 25 字元、A Tribe Called Quest 20）。**3 個專名的上限一體適用。**
- `writer-base.md` 第 190 行的舉例改掉：原本拿「キングギドラ → King Giddra」示範全片假名改羅馬字，
  但那正好是卡池藝人欄，與新增的「本卡藝人名照卡池逐字寫」互相打架，改用レイ・ハラカミ。
- `verify-kv.mjs` 的批次名正規式加入 `w3-\\d+`。

**主要檔案**：`dip-vinyl-shop/seed_cards.json`、`desc-restyle/W3_PLAN.md`、
`desc-restyle/prompts/writer-base.md`、`desc-restyle/batches/{w3-01,w3-02}-kv.json`、
`desc-restyle/REMOVE_W3-02.json`。
### 2026-08-11｜戸谷重子改名＋第二階段（wave3）規劃完成、開跑

- Repo：`dip-vinyl-shop`（seed_cards.json 一筆藝人欄）、`desc-restyle`（W3_PLAN.md、卡單 29 檔、工具兩處修正）。

## 戸谷重子 with 今田勝トリオ（TBM-11 改掛雙掛名）

我先前把這張報成「藝人／專輯欄位誤植」，**判斷錯了**。店主指出這是雙掛名專輯，查證後成立：
Discogs 與 MusicBrainz 都顯示 TBM-11 是**同名作**——專輯名就等於掛名本身，
MB 把演出者記成 Masaru Imada Trio & Shigeko Toya。所以不是資料錯誤。

**唯一要改的是卡池藝人欄**：原本只掛 `今田勝トリオ`，但池內另外 267 張雙掛名卡
（Simon & Garfunkel、Richard & Linda Thompson…）都是把雙掛名整串放在藝人欄。已改成
`戸谷重子 with 今田勝トリオ`，三處同步（卡池／KV 搬 key／Firestore card_catalog 逐欄驗證後才刪舊）。
**舊的 desc4 沒有搬過去、直接刪掉**——那筆現場生成的內容把戸谷重子誤譯成「豐島茂子」。

**兩個操作教訓**：
- `wrangler kv bulk put` 吃的是**相對於當前目錄**的檔名，而 Bash 工具的 cwd 會被前一個
  `cd` 帶走。我在 dip-vinyl-shop 底下跑了指令，wrangler 找不到檔案而失敗，
  但我用 `tail -2` 截輸出、剛好把錯誤訊息切掉，以為成功了。
  **看 wrangler 結果一律用 `grep -E "Success|Error"`，不要用 tail。**
- 三處同步的順序仍是：卡池 → KV put → KV delete → Firestore（逐欄驗證後才刪舊）。

## 第二階段（wave3）：977 張非 CJK 卡

**「976」這個舊數字重算過，實際是 977，而且是兩類問題不是一類**：

| 類別 | 張數 | 狀態 |
|---|---|---|
| 補寫 | 470 | KV 完全沒有 desc2，前台走現場生成 |
| 重寫 | 507 | 有 desc2 但低於 180 字（61 張低於 120） |

那 470 張是 wave2 規劃**之後**才進卡池的新卡，其中 **406 張是爵士**——
看起來是一批 ECM／自由爵士／Black Saint 系的型錄匯入，從來沒寫過簡介
（Tomasz Stańko 13 張、Abdullah Ibrahim 12 張、Keith Jarrett 8 張、Anthony Braxton 8 張…）。
507 張重寫卡則以 soul 為主（229 張），是 wave1 早期規格未定時的產物。

**⚠ 統計口徑陷阱（我當場犯了一次）**：KV 的 desc2 key 是
`desc2:<artist>|<album>` 全小寫、**不動斜線**；`/` → `-` 是 **card id**
（Firestore 文件 id）的規則。兩者混用會把 Getz/Gilberto、Live/Dead、Speakerboxxx/The Love Below
這類卡誤判成缺 desc2——我第一次跑就誤報了 515 張。

**分批**：29 批、每批 40 上限 48，**同藝人零跨批**。切法是先全域依藝人成塊、
用「該藝人卡片數最多的家族」決定整塊歸屬（第一版只合併相鄰同藝人，結果爆出 180 組跨批，已修）。
完整批次表見 `desc-restyle/W3_PLAN.md`。

**這一波與前幾波不同的三件事**：
1. **卡單多了 `oldDesc` 欄位**（507 張重寫卡才有）。派工時必須寫明**它不是來源**，
   只能當查證線索或稽核對象，並**要求研究層主動回報 oldDesc 裡查無來源或查證有誤的說法**。
   線上還有五百多張同期舊稿，這是唯一能系統性抓出舊錯的機會。
2. **補寫卡的研究成本高於重寫卡**（沒有既有內容當線索，又集中在中文資料稀薄的自由爵士與 ECM）。
3. **w3-01 有前置作業**：那 6 張是日本樂手但藝人欄寫羅馬字（Naosuke Miyamoto、Sunao Wada、
   Koji Moriyama、Ayako Hosokawa、New Direction Unit），**要先查證日文原名、改完卡池才能凍結卡單**，
   否則會重演早上那次「寫完才發現要改藝人欄、得回頭搬 KV key」的工。

**工具修正兩處**：`verify-kv.mjs` 的批次名正規式加入 `w3-\\d+`；
`fix-spacing.mjs` 加了卡池專名保護清單（見前一筆記錄）。

**已開跑**：w3-01 的漢字查證＋研究（1 組）與 w3-02 的研究層（5 組）同時在飛。

**主要檔案**：`desc-restyle/W3_PLAN.md`、`desc-restyle/batches/cards/w3-*-cards.json`、
`desc-restyle/verify-kv.mjs`、`dip-vinyl-shop/seed_cards.json`。
### 2026-08-11｜心情選歌離線化：`mood-quiz/` 產線建立，pilot-01（50 張／142 則）跑完

- **repo**：無。新增工作區資料夾 `mood-quiz/`（與 `desc-restyle/` 平行，非 git），
  店主指示**文案要跟卡池分開存放**，不碰 `seed_cards.json`／`apex_pool.json`。
- **架構定案（店主提案，優於我原本的組裝方案）**：每張卡預先寫好數種心情變體，
  **整段一口氣寫完**而非句子拼裝——拼裝的接縫是「組裝感」的根源。
  生成用 **Haiku 代理**（店主指定，成本最低）；執行期純查表、零 API、流量高峰不當機。
  只替每張卡「配得到的」3 種心情生成（非全 11 種），量砍六成。
- **文案規則定案**（`mood-quiz/style-guide.md`）：三句、**150 字以內**（店主裁定
  「變長反而不好看、廢話太多」）；結構 = 生活場景 → 專輯具體細節 → 收尾。
  **禁止雞湯尾巴**（收尾後再補人生感悟＝最常見的廢話來源）；同一件事只講一次。
  語感 = 唐綺陽平視 ＋ 吳淡如白話 ＋ 侯文詠說故事。
  **放行以前禁的**：「卻」「像」「似乎」（文字的關節）、「我們」（店主明確批准）。
- **pilot-01 結果**：142/142 產出、98% 在 150 字內、中位 110 字、事實抽查無編造
  （desc2 當事實來源有效）。四個待修問題**全是我的設計失誤**：
  1. 輸入傳了 `situation` 全文 → 24% 直接抄來當開場，場景變成心情標籤的複述。
  2. 「卻」放行後變拐杖，32% 用到。
  3. 心情資格只看曲風標籤不夠準（`electronic` 同時涵蓋 ambient 與舞曲），
     Some Girls／Taylor Swift《Red》被配到「想安靜」。需每張卡一個能量標籤。
  4. 12 則沒提到藝人或專輯名。
- **成本實測**：全池推估約 7–10M token（Haiku、一道工序、零查證、抽驗代替逐張審稿），
  約為 desc-restyle 的 1/15；分享圖介紹框上限 300 字、硬截 340（`index.html:4407`）。
- 待辦：店主審 `mood-quiz/results/pilot-01-審稿.md`；修完四點跑 pilot-02。
  線上 `index.html` 尚未修改。

### 2026-08-11｜cjk-06 上線（28 張）— **CJK 補寫全部完成，222/222 零缺漏**

- Repo：`dip-vinyl-shop`（僅備忘錄）。desc-restyle 非 git 追蹤。
- 驗收：KV 28/28 逐字一致；前台 6 張抽驗（含韓文卡與帶點號的 key）全部 `KV-HIT-RESTYLED`。
- **全池稽核：卡池 222 張 CJK 卡逐一查 KV，缺 desc2 者 0 張。** 這條產線（07-24 從「山本剛簡介全一樣」
  查起的那條）到此結案。

## cjk-06（日本／台灣／韓國嘻哈與都會音樂，28 張）

**這批的難點不是寫作，是三條跨批地雷**（派工前掃出來的，寫進特注才擋住）：

1. RHYMESTER《Egotopia》已上線的卡開場就是「日語動詞黏句尾、押韻只能自己想辦法」——
   **「日語饒舌怎麼解決押韻」全批 28 張零名額**。這條對キングギドラ《空からの力》殺傷最大
   （它的教科書級敘事正是韻踏み），改配「日本硬派嘻哈原點」。
2. E SENS《The Anecdote》已寫過服刑、Supreme Team、大眾音樂賞年度專輯 →《저금통》全部不得碰，
   **「入獄／服刑後的作品」全批零名額**（連舐達麻的相關背景也不得當骨架）。
3. Epik High 有三張舊卡，把 Tablo 學歷爭議、〈Fly〉首座獎盃、出道作銷量、「賣不動就解散」
   四條都用掉了 → 本批兩張一條都不能碰；《신발장》原本兩條候選 hook 都押「簽入 YG 後的第一張」，
   正是與《99》卡直接打架的說法，**兩條全棄**。

**研究層推翻主線四處，其中兩處是我指派錯了獎**：
- **MC HotDog《貧民百萬歌星》第 24 屆金曲獎最佳國語專輯是入圍未得**，真正得獎的是
  **《Wake Up》第 18 屆**。「饒舌拿下主流大獎」的名額因此改配給《Wake Up》。
- **頑童MJ116 不是廠牌創辦人**：本色音樂／Kao!Inc. 是黃靜波與張震嶽 2004 年創立的既有廠牌，
  頑童是被簽下的。**「成立自己的廠牌」這條骨架全批取消、無人承載。**
- Leo王 先前的樂團是**巨大的轟鳴**。
- 回聲樂團**沒有「從 Echo 改名」這個事件**——中文團名源自 1998 年清大「回聲社」，兩名並存。
- 另：宇多丸的廣播與影評身分與《グレイゾーン》**時序不合**（節目 2004 年 4 月開播、晚於 2 月發行；
  影評身分 2007 才起），整條線不得寫。

**代理抓到兩個我沒抓到的錯**：
- hook 層發現研究稿把 **힙합플레이야（Hiphopplaya）譯成「HiphopLE」**——那是兩個不同的韓國嘻哈網站，
  該獎整項不用。
- 寫作層發現 `writer-base.md` 第 190 行拿「キングギドラ→King Giddra」當全片假名改羅馬字的例子，
  **正好跟我當天新增的「本卡藝人名照卡池逐字寫」互相打架**（キングギドラ 就是卡池藝人欄）。
  舉例已改成レイ・ハラカミ，並在該行直接標註這個例外。

**人工審稿修 8 處**，兩處是老毛病重演：
- **校對痕跡漏進正文兩處**：《犬》寫了「地下流傳與廠牌推出分屬兩個階段」、
  《Big Thing》寫了「最佳演唱組合這一項是得獎、不是入圍」——都是我的校對指示被原樣寫進消費者文字。
- **hook 懸念沒收尾一處**：박효신《I am A Dreamer》hook 押「他正把重心移向音樂劇舞台」，
  正文從頭到尾沒回到音樂劇。補上收尾後衝到 252 字，再壓回 234。
- **《Big Thing》的「組團十年後」是算術錯**：來源（中時）原文寫「相隔約十年」，但同段就寫著
  2004 年組團與第 29 屆（2018）得獎，讀者一算就是十四年。hook 與正文都改成十四年，三層同步。
  **教訓：媒體的「約十年」這種鬆散說法，只要同段有兩個年份就會被讀者抓包，一律自己重算。**
- 其餘：《廢物》的「頑童 MJ116」與《平庸之上》的「Leo 王」都多了空格、與卡池藝人欄對不上；
  〈영순위〉與〈헤픈엔딩〉補中譯與羅馬拼音；박효신 與中文之間補空格。

## `fix-spacing.mjs` 修好一個會改壞專名的 bug

它把 **頑童MJ116 拆成「頑童 MJ116」、さんピンCAMP 拆成「さんピン CAMP」**——前者拆掉了卡池藝人欄、
後者拆掉了活動專名。與先前的 CBS・Sony 同一類。修法：
**從卡池讀出所有「中文與拉丁直接相鄰」的藝人欄與專輯名，當成保護清單切出來原樣保留**，
另加手動清單 `EXTRA_PROTECTED` 收活動名。順帶修掉 `spaceOutside` 裡的 `.trim()`——
它原本作用在整串上，加了分段之後會吃掉保護專名後面的空格，已移到 `spacer` 最外層。
cjk-05 三檔回歸測試乾淨。

**主要檔案**：`desc-restyle/fix-spacing.mjs`、`desc-restyle/prompts/writer-base.md`、
`desc-restyle/batches/cjk-06-kv.json`。
### 2026-08-11｜cjk-05 上線（34 張）＋ 卡池年份更正 3 筆

- Repo：`dip-vinyl-shop`（seed_cards.json 三筆年份）。desc-restyle 非 git 追蹤。
- 驗收：KV 34/34 逐字一致；前台 5 張抽驗（帶 cache-buster）全部 `KV-HIT-RESTYLED`。

## cjk-05（華語新世代樂團與創作歌手，34 張）

**通論分派**：地下 live house 磨到被主流發掘釘五月天《五月天第一張創作專輯》、
學生時期組團釘告五人《運氣來得若有似無》（老王樂隊、五月天、蘇打綠、deca joins 皆排除）、
台語搖滾新世代釘茄子蛋《卡通人物》、海外樂迷讓台灣樂團被聽見釘落日飛車《Jinji Kikko》、
民俗元素做金屬釘血肉果汁機《GOLDEN太子BRO》（閃靈兩張與百合花皆排除）。
**零名額三條**：獨立製作對抗體制（cjk-04 已給陳綺貞）、音樂與社會運動（cjk-04 已給交工與生祥，
故滅火器兩張完全不提太陽花與〈島嶼天光〉）、大學社團（deca joins 另有跨批硬性排除，見下）。

**研究層推翻主線三處**：美秀集團出身**嘉義**不是屏東、淺堤成軍於**高雄**不是台南、
大象體操《角度》是 11 曲**正規專輯不是 EP**（我猜錯）。

**本批最大的系統性問題是序數**。多張的「第幾張專輯」只出現在 hook 或研究層 notes、
facts 沒有直接來源。hook 層主動回報兩處：1976 在《方向感》與《耳機裡的新浪潮》之間另有作品、
落日飛車《Cassa Nova》的「第三張」會被《Jinji Kikko》的發行格式牽動。
**寫作層據此改了兩張的 hook 首句**（序數換成年份），hooks 與 input 兩層已同步。
**往後派工一律加一條：facts 沒有直接支撐的序數不要寫，改寫年份。**

**人工審稿修 5 處**：五月天《愛情萬歲》一句重複（「第一座金曲獎」後又寫「首度站上頒獎台領獎」，
刪後低於 180 字下限，改補「飛往日本錄音室製作」這條實料）、落日飛車《Cassa Nova》把同團的
《Bossa Nova》寫成中文《芭莎諾娃》（**同一張唱片在兩張卡上要用卡池的卡名**）、
同張的「北美與加拿大」是包含關係錯誤（改美國）、《Jinji Kikko》的「Dindi 在葡萄牙文是寶貝的意思」
只有 Threads 單一來源且該詞源可疑（刪）、1976《方向感》hook 寫「四家媒體」但 facts 列的四個單位
裡有中華音樂人交流協會（改「四個單位」，三層同步）。

**我查錯一次**：草東《瓦合》寫「年度專輯獎自 1990 年首頒以來首次由樂團作品拿到」，
我以為五月天《自傳》已破例而準備砍掉——查證後《自傳》拿的是**最佳國語專輯獎**，
第 28 屆年度專輯獎得主是桑布伊。中央社原文確認該句成立，保留。
**教訓：金曲獎的「年度專輯獎」與「最佳國語專輯獎」是兩個獎，不要混。**

## 卡池年份更正 3 筆（研究層查出）

- 黃玠《綠色的日子》：原**缺年份** → 2007（2007-06-30 風和日麗唱片行）。
- 百合花《燒金蕉》：2018 → **2019**（數位版 2019-09-06、實體 09-20）。
- deca joins《鳥鳥鳥》：2021 → **2020**。卡池**沿用了金曲入圍年當發行年**（實際 2020-12-28），
  這是新型態的年份錯法，日後查年份時要留意這條路徑。

## 兩張 EP 的裁定（不再逐次請示）

落日飛車《Jinji Kikko》（3 曲）與老王樂隊《吾十有五而志於學》（首張實體 EP）**都保留**。
常設裁定要移除的是「無歷史定位的選輯／重發」，這兩張是**原創作品首發**、不在該類：
前者是樂團停擺後的復出作且〈My Jinji〉是海外突破的起點，後者是原創首發。
**寫法規則：照常寫，但正文一律不得交代「這是 EP 不是專輯」**（那是校對指示，不入正文）。

## `writer-base.md` 新增一條（為 cjk-06 補的）

**本卡自己的藝人名一律照卡池藝人欄逐字書寫**，羅馬字／漢字的判斷規則只適用於
內文提到的其他音樂人。否則 cjk-06 的キングギドラ 會依「全片假名改羅馬字」規則被寫成
King Giddra、박효신 會被寫成朴孝信，**與卡片標題對不上**——正是 08-11 稍早那個坑的翻版。

**主要檔案**：`dip-vinyl-shop/seed_cards.json`、`desc-restyle/prompts/writer-base.md`、
`desc-restyle/batches/cjk-05-kv.json`。
### 2026-08-11｜cjk-04 上線（36 張）＋ wave2 日文人名追溯改漢字（47 張）＋ 東亞藝人改名 8 張

- Repo：`dip-vinyl-shop`（卡池改名 5 張、補年份 1 筆）、`dip-vinyl-worker`（讀序調整，e8b5958）。
- 驗收：cjk-04 KV 36/36 逐字一致；wave2 改名 47 張逐字一致；前台全部確認（**要帶 cache-buster**，見下）。

## cjk-04（華語前輩世代與獨立經典，36 張）

**通論分派**：戒嚴／審查釘羅大佑《之乎者也》與黑名單工作室《抓狂歌》（只准兩張）、
新台語歌運動釘《抓狂歌》、幕後製作人做自己的唱片釘陳昇《擁擠的樂園》、
原住民歌手被主流看見釘陳建年《海洋》、金曲獎爆冷釘楊乃文《Silence》、
自組廠牌對抗體制釘陳綺貞《華麗的冒險》、音樂與社會運動釘交工《我等就來唱山歌》與生祥《圍庄》、
拖多年才發首張釘胡德夫《匆匆》。不設限的話「戒嚴抵抗」會有四張、「音樂為土地發聲」會有六張同構。

**研究層推翻主線三處**：四分衛《起來》**不是魔岩／水晶，是角頭音樂**（經董事長樂團阿吉引介認識
張四十三）；胡德夫是**卑南族與排灣族混血**，不只卑南族；美秀集團出身**嘉義**不是屏東（cjk-05）。
另否決「〈民主阿草〉是台灣最後一首禁歌」（來源自相矛盾），改用可查證的「新聞局核准歌詞卻發文
告誡電台不得打歌」。

**人工審稿修 6 處**，其中一處要查證才發現：
- **伍佰《白鴿》不是「寫給」那名中彈歌迷的**——該曲 1999 年初就寫好，6 月 5 日台中廣三 SOGO
  槍擊案後伍佰於 7 月 14 日到醫院探視，才把歌**獻給**她。初稿寫成「寫給」，時序反了。
- 甜梅號《腦海群島》把吉他手昆蟲白寫成「主唱」——**那是不帶歌詞的純器樂樂團**。
- 生祥《我庄》hook 押「評審團大獎在開獎前先頒」，正文卻整個沒提到那個獎（懸念沒收尾）。
- 羅大佑《未來的主人翁》出現「1983 年 8 月的報導記載」這種引註口吻的校對痕跡。
- 林強《娛樂世界》「羅百吉整張製作」與同段的「赴英與 John Fryer 合作」衝突。
- 伍佰《浪人情歌》給倪重華掛了查不到支撐的頭銜（他是真言社創辦人，非滾石企劃）。

## worker 讀序：CJK 卡的產線人工稿優先於 CURATED_DESCS

`CURATED_DESCS` 那 75 筆**全是 CJK 卡**、89–156 字，是產線還沒寫到華語卡時的過渡方案，
但優先權在 desc2 之上 → 新寫的 180–240 成品端不出來。改成「CJK 卡只要有 desc2 就優先」，
**沒寫到的仍照常吃人工簡介、不留空窗，後續批次上線也不必再改 worker**。
非 CJK 卡維持 CURATED 最優先（那些是專門修 AI 寫錯的校正條目，如 ?te 壞特）。

**⚠ 新陷阱：Cloudflare 邊緣快取。** `/album-desc` 的回應會被邊緣快取，改完 worker 後
直接 curl 會拿到舊回應——我一度以為改壞了。**驗證一律加隨機查詢參數**（`&_=${Date.now()}`）。

## wave2 日文人名追溯改漢字（店主裁定：確定是日本人才改）

線上 6,338 張是在舊規則「音樂人一律拉丁原文」下寫的。改法：掃出候選 → 代理逐一查證分五類
（`not-person`／`not-japanese`／`keep-latin`／`to-kanji`／`uncertain`）
→ 主線審表 → 只套用 `to-kanji`。**`uncertain` 12 筆一律不動**（漢字同音不同字查不到權威來源）。

**主線從代理的 59 筆 to-kanji 裡剔掉 5 筆**：Rei Harakami（藝名レイ・ハラカミ 全片假名，
依現行規則本來就用羅馬字）、Ken Ishii 與 ☆Taku Takahashi（官方一貫用拉丁字母）、
Kenmochi Hidefumi（代理查到的是 VOCALOID 開發者剣持秀紀，**撞名**）、Shigeo Sekito（來源疑似串線）。

**兩個自己犯的錯，都記下來**：
1. **半套轉換比不轉更糟。** 改完 Casiopea 那張變成「櫻井哲夫與 Akira Jimbo」——一句話裡
   一個漢字一個羅馬字。根因是我的音節偵測規則漏掉 `jimbo` 這種輔音串（mb）。
   **正確做法：改完要回頭掃「受影響卡片裡殘留的拉丁人名」**，補上 Akira Jimbo→神保彰、
   Issei Noro→野呂一生、Ringo Sheena→椎名林檎（最後這個正是同日改名的同一人）。
2. **空格清理的正規表示式會吃掉尾字。** `([中文]) +([中文])` 加 `g` 旗標時，
   比對會消耗尾端的中文字，導致「是 櫻井哲夫 與 神保彰」這種**連續配對漏掉最後一處**。
   **必須用前瞻 `([中文]) +(?=[中文])` 不消耗尾字。**
3. **括號並列寫法會被改成重複**：原文「矢野顕子（Akiko Yano）」被改成「矢野顕子（矢野顕子）」。
   收尾要掃 `([漢字])（\\1）` 這個樣式；移除括號後還要補回中文與數字之間的半形空格。

## 東亞藝人改名（卡池藝人欄，累計 8 張）

椎名林檎 3 張（連帶《Kalk Samen Kuri no Hana》改回官方原題《加爾基 精液 栗ノ花》）、
伍佰 & China Blue 4 張、回聲樂團 1 張——已於前一筆記錄。**本次再加 5 張**：
矢野顕子（原 Akiko Yano）、高中正義（Masayoshi Takanaka）、角松敏生（Toshiki Kadomatsu）、
日向敏文（Toshifumi Hinata）、芦川聡（Satoshi Ashikawa，apex/pearl）。
三處同步：卡池（seed＋apex）、KV（desc2／desc4／rating4 搬移）、Firestore card_catalog（逐欄驗證後才刪舊）。

**這五位是被防呆擋下來才發現的**：它們同時是卡池藝人欄的拉丁字串，只改內文會讓卡片標題與簡介
對不上。**往後做這類內文替換，一定要先比對卡池藝人欄。**

**卡池清理的鐵則再確認**：盲目替換 `"Echo"` 會毀掉 Tom Petty 與 Dave Burrell 那兩張
**專輯名叫 Echo** 的卡——必須用「藝人欄開頭」的完整片段定位。

**臨時檔清理一律指定精確檔名**，不用萬用字元（08-11 稍早才因 `rm -f chk-*.mjs`
誤刪常設工具 `chk-hook-crossgroup.mjs`）。

**主要檔案**：`dip-vinyl-shop/seed_cards.json`、`dip-vinyl-shop/apex_pool.json`、
`dip-vinyl-worker/src/index.js`、`desc-restyle/wave2-jp-name-map.json`（對照表，115 筆）、
`desc-restyle/batches/{cjk-04,jp-names}-kv.json`。
### 2026-08-11｜cjk-03 上線（33 張，日本 90s–00s 流行與電子）＋東亞藝人改名 8 張＋華語卡範圍重估

- Repo：`dip-vinyl-shop`（卡池改名 8 張、補年份 1 筆）。內容產出在 `desc-restyle`（非 git），KV 已推。
- 驗收：KV 33/33 逐字一致、前台回 `KV-HIT-RESTYLED`、`qa-check-research` 三檔零標記、字數 183–240。

**單一藝人最密集的一批**：電気グルーヴ 8 張、宇多田ヒカル 6 張、安室奈美恵 4 張、久保田利伸 4 張。
研究層與 hook 層逐張定軸，寫作層依組別切三檔（各 11 張）讓同藝人不跨檔。
八張電気グルーヴ的軸：TB-303 轉向／〈虹〉被廣告與益智節目賦予第二人生／歌詞曲比例翻回九成／
少一人卻做到 16 曲／睽違 8 年 2 個月／半年後再交一張／週年企劃主碟全新／封面出自離團 14 年的前成員。

**通論分派**：ピエール瀧 2019 年事件與作品全面下架釘《人間と動物》（標明時序、據實不渲染）、
場景定位釘《VITAMIN》、《First Love》銷售紀錄釘《Distance》、喪母與活動休止釘《Fantôme》、
小室哲哉全盛期釘《SWEET 19 BLUES》、日本 R&B 先驅釘《SHAKE IT PARADISE》、
暢銷單曲帶動專輯釘《LA・LA・LA LOVE THANG》。

**研究層的重要查證**
- 《20》**不是**紀念選輯，主碟九曲皆新創作 → 不移除。《わすれもの》是本人企劃的未發表舊作彙編、
  有歷史定位 → 不移除。
- **《LA・LA・LA LOVE THANG》專輯名正確**（我原本懷疑與單曲〈LA・LA・LA LOVE SONG〉混淆，
  查證確認是收錄關係，不需更正）。
- 安室的風格轉折是**兩階段**：《GENIUS 2000》是小室與 Dallas Austin 並列的過渡，
  《STYLE》才是脫離小室後的第一張、轉折的完成點。
- 主動排除三處不可靠宣稱：非常階段「世界最初的噪音樂團」（單一類型來源）、
  《DRAGON》銷量（9.3 萬與 17.6 萬互相矛盾）、《J-POP》Oricon 名次（單一來源）；
  宇多田《HEART STATION》與 2010 年人間活動宣言**查無直接因果**，休止敘事完整歸《Fantôme》。
- 2814 是 David Russo 與 Luke Laurila 的**英美雙人企劃、不是日本團體**，只有專輯名是日文。

**人工審稿修 1 處**：青山テルマ《DIARY》的 hook 押「金氏世界紀錄」，正文卻只寫「被認證為
日本最暢銷的下載單曲」、沒點名認證單位——hook 懸念沒收尾，機器驗不出。

## 東亞藝人改名（店主 2026-08-11 裁定）：卡池 8 張

**椎名林檎**（原 `Sheena Ringo`，3 張）——店主明確指示要用漢字。
連帶把《Kalk Samen Kuri no Hana》改成官方原題《加爾基 精液 栗ノ花》，因為**那張自己的 desc2
正文寫的就是漢字原題、與卡池的羅馬字互相矛盾**；而且藝人欄與專輯欄同一次改完才不會讓 Firestore 搬兩趟
（08-10 的教訓）。**伍佰 & China Blue**（原 `Wu Bai & China Blue`，4 張）與
**回聲樂團**（原 `Echo`，1 張）經店主確認後一併改。

- 三處同步：卡池、KV（desc2／rating4 搬移，孤兒 desc4 刪除）、Firestore card_catalog（逐欄驗證後才刪舊）。
- **worker 的 `CURATED_DESCS` 以 artist ＋ aliases 建索引，改名不會斷掉比對**（aliases 早已含中文寫法）。
- **防呆擋下一次事故**：盲目替換 `"Echo"` 會毀掉 Tom Petty 與 Dave Burrell 那兩張**專輯名叫 Echo**
  的卡。改用「藝人欄開頭」的完整片段定位才安全。
- **我驗證時把「椎名」打成「椒名」**，害 worker 現生一段簡介並寫回 KV，已刪除該垃圾鍵。
  教訓：用 `encodeURIComponent` 組 URL、不要手打百分比編碼。

**哪些不改**：官方團名本來就是拉丁字母的（RHYMESTER、Beyond、My Little Airport、Epik High、
Perfume、deca joins、9m88、Tizzy Bac、1976、E SENS、BUDDHA BRAND）、
全片假名依規則本來就該轉羅馬字的（Rei Harakami＝レイ・ハラカミ、Mariah＝マライア）、
以及非東亞的 2814。

## 華語卡的範圍重估（重要）

**`CURATED_DESCS` 那 75 筆人工精選簡介全部都是 CJK 卡**，而且人工表的優先權在 desc2 **之上**。
逐批對照：cjk-03 有 0 張、**cjk-04 全部 36 張、cjk-05 全部 34 張**、cjk-06 有 5 張。

也就是說**店主回報的「同一藝人簡介全一樣」那個病，華語卡完全沒有**——它們早有人工查證過的簡介
（「華語兩層方案」），只是字數 89–156（中位 112）低於現行 180–240 規格、也沒有故事鉤子。
**店主裁定升級成新規格。**作法：每批寫完就把該批從 `CURATED_DESCS` 移除並重新部署，
新稿上線前人工簡介照常服務、不會有空窗。

## 工具修正（都是 CJK 批次特有的誤報，w2 批不受影響）

- `fix-spacing.mjs` 兩處：(a) 中黑點 U+30FB 落在假名範圍內被當中文字，
  `CBS・Sony` 會被拆成 `CBS ・ Sony`；(b) 《》〈〉內的專輯名與曲名不該補空格，
  〈SAKURAドロップス〉不該變成〈SAKURA ドロップス〉。兩者都已豁免。
- `qa-check-hooks.mjs` 的 GROUPS 改為依實際研究稿組數決定。
- `chk-hook-crossgroup.mjs`：同一張卡出現在多個歷史建置檔時**改為後讀到的覆蓋先讀到的**、
  檔名排序讓新批次落在後面。**否則會拿早被取代的 wave1 舊稿來比對**——我曾因此誤判線上的
  Perfume《Future Pop》寫錯製作人名（線上其實是對的，錯的文字只存在歷史建置檔裡）。
  這與 08-10 那兩個「假孤兒」是同一類誤判。

**卡池補年份**：董事長樂團《眾神護台灣》原本**整個年份欄位不存在**（只有 6 格），
查證發行日 2010-12-31 後補為 2010。全池仍有 9 張無年份。

**待店主裁示**：wave2 那 6,338 張是在「音樂人一律拉丁原文」規則下寫的，
凡提到日本或華語音樂人都是羅馬字（例：Perfume 舊卡寫「Yasutaka Nakata」），
與今天起的新規則並存兩種風格。是否追溯修改尚未決定，**未擅自改動已上線的卡**。

**主要檔案**：`dip-vinyl-shop/seed_cards.json`、
`desc-restyle/{fix-spacing,qa-check-hooks,chk-hook-crossgroup}.mjs`、
`desc-restyle/batches/cjk-03-kv.json`。
### 2026-08-11｜心情選歌離線化規劃 ＋ 可玩原型（未動線上程式）

- **repo**：無（原型與工具都在 session scratchpad；線上 `index.html`／worker 皆未修改）。
- 店主想把心情選歌去 API 化。規劃結論：選片可完全離線——100 題每個選項標
  五維權重（E 能量／M 明暗／X 內外向／O 獵奇／S 秩序），加總成心情向量後對
  卡池匹配：`accessibility`/`obscurity` 對 O、`classic` 對安全需求、曲風靜態表對
  E/M/X；S 控制抽樣溫度。講解文案改「原型句庫開場＋卡片 desc2 第一句當質地
  句＋收尾」組裝，質地句**不寫進卡池資料**（執行期從簡介抽，簡介改了自動跟上）。
- 已做出離線原型 `心情選歌-離線原型.html`（自包含 1.5MB，內嵌 7505 張卡、
  90.4% 帶 hook 句、100 題權重全標完、11 個心情原型句庫佔位版），含校正面板
  （向量條、原型、前 15 候選逐張看文案）。已交店主測試校正。
- 驗證：四種極端向量選卡合理（獵奇→free jazz 晦澀盤、安全→鄧麗君/陳綺貞、
  陰暗沉靜→Arvo Pärt、高能外向→soul/hiphop）。
- **v2（同日）**：店主上傳 `命理參考.txt`（唐綺陽文＋塔羅牌義）。評估：唐綺陽段
  可學語感（時段／訊號／意謂／平視斷句），塔羅段是翻譯腔只取「雙面讀法」結構。
  句庫全面重寫成正式版：11 原型 × 10 開場 ＋ 11 × 6 收尾 ＝ 176 句，全數通過
  既有禁則掃描（無對比否定／建議語氣／AI 慣用詞／第三人稱／戲劇衝突詞）。
  加入 localStorage 輪替：同原型句子用完一輪才重複。組合數：同一張卡 60 種文案，
  全站理論組合約 4,360 萬（110 開場 × 6,786 hook × 66 收尾）。
- **v3（08-11）**：店主裁定 v2 的原型開場「太無聊沒戳中、收尾句尷尬」，定調
  **測驗是主角、專輯是配角，要塔羅式看穿感**。此裁定推翻舊 prompt「不要解析
  用戶答案」規則（語言層禁則照舊）。改版：新增 400 句「點破句」（100 題 × 4
  選項，每句直接長在用戶點的答案上）；出結果時以權重向量絕對值和當訊號強度，
  挑最強兩題的點破句＋一句原型總結組成「你的牌面」，再以翻牌過渡句帶出專輯
  （縮小為配角、hook 句當圖說）；收尾句庫棄用。換一張只換專輯、牌面不變。
  400 句過禁則掃描（修 8 句「讓你/應該」）。實測：點「放棄管理時間」→「你跟
  時間停戰了」，戳中感成立。
- **v4（08-11）**：店主再裁定 v3 點破句有**說教感**（「你自己知道」式斷言＝
  「你是懂我什麼」翻車，店主調線上提示詞時早踩過），且**測驗與專輯不能分段、
  必須融成一段**（附線上生成範例：BUBBA／Unitxt——場景開場、專輯聲音走進
  場景、輕碰「你」收攏）。改版：400 句點破句整批棄用刪除；新句庫三層＝
  場景句（11 原型 × 8，只給畫面禁止對用戶下斷言）× 聲音質地句（10 曲風＋
  default × 4，接「{artist}《{album}》{銜接}」）× 收攏句（11 原型 × 4），
  一段成文；換一張整段重組。掃描器加入「你自己知道／你其實／你需要／你不要」
  說教句型檢查，379 句全過。實測輸出已對齊線上範例骨架。
  **文案鐵律（多次翻車總結）：不對用戶下斷言、人的部分只給場景、
  專輯要織進段落裡不能翻牌式分段。**
- 待辦：店主測試校正 v4 場景／質地／收攏句與配對權重；校正後才動線上
  `index.html`。工作區根新增 `.claude/launch.json`（本機預覽用）。

### 2026-08-11｜cjk-02 上線（30 張，日本 city pop 與環境音樂）

- Repo：本備忘錄。內容產出在 `desc-restyle`（非 git），KV 已推。卡池未動（本批年份全部正確）。
- 30 張：坂本龍一 4／山下達郎 3／吉田美奈子 3／細野晴臣 2／大貫妙子 2／冨田勲 2／吉村弘 2 ＋單張若干，
  含 3 張頂點卡（尾島由郎、小久保隆、冨田勲《The Planets》）。
- 驗收：KV 30/30 逐字一致、前台回 `KV-HIT-RESTYLED`、`qa-check-research` 兩檔零標記、字數 196–239。

**通論分派**：YMO 沿革釘高橋幸宏《Neuromantic》、はっぴいえんど 釘細野晴臣《Hosono House》、
シュガー・ベイブ 釘大貫妙子《Sunshower》、冨田勲的 Moog 先驅地位釘《Snowflakes Are Dancing》
（《The Planets》改走英國禁制令回收）、廣告歌釘山下達郎《Ride on Time》、多軌疊錄釘《For You》、
環境音楽的委製源流釘尾島由郎、「被海外重新發掘」**全批只准兩張且必須不同場景**
（city pop 給竹内まりや《Variety》、環境音樂給吉村弘《Music for Nine Post Cards》）。
最後這條是本批最大的同構風險——四張環境音樂與整組 city pop 幾乎每張都沾得上。

**研究層推翻主線兩處**：大貫妙子《Sunshower》**不是**她單飛首作（首作是 1976 年《Grey Skies》，不在卡池），
是第二張；山下達郎《Spacy》**不是**多軌疊錄，是整團依精確總譜近乎一次同步錄完（疊錄是《For You》才對）。

**人工審稿修 8 處**
- 竹内まりや《Variety》：2017 年那支爆紅影片**不是官方 MV，是海外樂迷上傳**；官方 MV 遲至 2019 年
  才由林響太朗拍出。（查證後改寫。菊池桃子〈もう逢えないかもしれない〉的 Oricon 週榜冠軍則查證屬實、保留。）
- Mariah《うたかたの日々》：鼓手寫成「八木秀夫」，正確是**山木秀夫**，且與同批《Kakashi》那張不一致。
- 小坂忠《モーニング》：**hook 立了「坂本龍一只是伴奏鍵盤手」的軸，正文卻從頭到尾沒提到他**——
  這是產線列管的「hook 懸念沒收尾」型，機器驗不出來。
- 吉田美奈子《扉の冬》：把細野晴臣排除在キャラメル・ママ成員之外（他本來就是成員）。
- 吉田美奈子《Flapper》：「大瀧詠一」應作卡池與同批一致的「大滝詠一」；「村井邦彥」應作日文字形「村井邦彦」。
- 冨田勲《The Planets》：同一句裡「日本版」重複兩次。
- 全片假名團名的羅馬字化不一致：正文寫 Sugar Babe／Caramel Mama，hook 卻留片假名——已統一並同步三層。

**規則的兩個副作用（後續四批會反覆遇到）**

1. **全假名團名轉羅馬字會被 `qa-check-research` 判成「編造專名」**（研究稿裡是假名、正文是羅馬字）。
   處置：把對照關係補進 input 的 facts。這是規則變更的必然副作用，不是編造。
2. **`fix-spacing.mjs` 會拆壞含中黑點的日文專名**——中黑點 U+30FB 落在假名範圍內，被當成中文字而在兩側補空格，
   `CBS・Sony` 變成 `CBS ・ Sony`。已修：補完空格後一律收掉中黑點兩側的空格。
   cjk-01 與 w2-128 回歸零改動。

**`writer-base.md` 新增一條**：**日文專名比拉丁專名更吃字元**。cjk-02 writer-2 初稿 10 張有 8 張
落在 244–268，全靠整格捨去才壓回區間——〈光と風のシンフォニー〉、
`Une Collection des Chaînons I` 這類單一專名就吃掉一成篇幅。CJK 批次動筆前要把專名壓到 3 個以內，
超標時**整格捨去子句**而非逐字修剪。

**我又犯一次派工詞的錯**：切檔時把竹内まりや《Variety》分進 writer-1，派工詞卻照舊寫「你這 20 張
零張可用『海外重新發掘』」——而那張正是獨佔該敘事的卡。寫作代理依 note 判斷讓它照寫、其餘 19 張零使用，
處置正確。**教訓：切檔之後要重讀一次派工詞裡的「這一檔零張可用」清單，別沿用切檔前的假設。**

**工具**：`qa-check-hooks.mjs` 的 GROUPS 改為依實際研究稿組數決定（三組批不再假報缺 d／e）。
`chk-hook-crossgroup.mjs` **被我誤刪後重寫**——收尾清理用了 `rm -f chk-*.mjs`，
但臨時腳本的命名慣例是 `chk-<批次>-<組別>.mjs`，那支是常設工具、不該落在同一個模式裡。
已按原行為重建並用 w2-128 與 cjk-01 回歸驗證。**往後清理指定精確檔名，不用萬用字元。**

**主要檔案**：`desc-restyle/{fix-spacing,qa-check-hooks,chk-hook-crossgroup}.mjs`、
`desc-restyle/prompts/writer-base.md`、`desc-restyle/batches/cjk-02-kv.json`。
### 2026-08-11｜CJK 卡簡介斷層：worker 讀序修正 ＋ cjk-01 日本爵士 55 張上線

- Repo：`dip-vinyl-worker`（讀序修正，commit c6f4064 已 push）、`dip-vinyl-shop`（卡池年份修正五筆）、
  `desc-restyle`（非 git：新批次 cjk-01–06、prompts 規則更新、工具鏈小修）。
- 起因：店主回報山本剛的簡介全部一模一樣，並猜測整批三盲鼠要重做。

**根因是兩層疊起來，不是那批寫壞**

1. **全池 CJK 卡從一開始就不在產線名單內**。`restyle-tasks.json` 6,972 筆、wave2 128 批 6,336 張，
   **CJK 各為 0**。那些卡的 `desc2:` 鍵在 KV 裡根本不存在。
2. **worker 對 CJK 卡分流到 `desc4:` 鍵**，走的是「純聲音描述」提示，明文
   **嚴禁寫年份、廠牌、製作人、成員、任何具體歌曲名或人名**（當初為壓幻覺而設）。
   扣掉這些，同一位藝人的多張專輯只剩曲風、編制、氛圍可寫，**讀起來必然同質**——
   山本剛八張全是「道地的爵士鋼琴三重奏／琴音溫潤內斂／親密氛圍／適合深夜」。
   逐字比對其實沒有完全重複（0 組），是設計的必然結果、不是模型偷懶。

**規模：216 張，不是 207**。第一次稽核只掃 `seed_cards.json`（207 張），
**漏掉頂點卡池**——`apex_pool.json` 另有 9 張 CJK 卡（8 pearl、1 heresy）。其中 5 張是日本爵士，
且 3 張與已派工的卡同藝人（峰厚介、中山英二、富樫雅彦），即時追加給對應研究組才沒出事。
**教訓：CJK／字元／曲風這類全池稽核，seed 與 apex 兩個池子要同一次掃完。**

**修法必須兩半一起，缺一無效**

- **A｜worker 讀序**（`src/index.js` `/album-desc`）：改為**不分 CJK 一律最優先讀 desc2**
  （產線人工審稿成品），miss 才退回 desc4 保底，新命中回 `X-Cache: KV-HIT-RESTYLED`。
  **不改的話寫進 desc2 前台永遠讀不到。**沒有把人工稿寫進 desc4 的原因：desc2→3→4 這個版本號
  本來就是用來作廢舊 AI 快取的，人工稿放那裡會被下一次版本號調整清掉。
- **B｜216 張走 desc-restyle 產線**重寫，180–240 規格、逐張人工審稿。

**cjk-01 已完成上線（55 張日本爵士，含全部 9 張山本剛）**

- 分組原則改了：**同一位藝人的卡集中在同一組**（山本剛 9 張全在 a 組）。這正是本次事故的解方——
  讓同一個研究者一次看到同藝人全部卡片，才有辦法分軸。
- 研究層 5 組（d 組被內容過濾器中斷，但 13 筆已完整落盤、零損失）、hook 2 組、寫作 2 組。
- 驗收：KV 55/55 逐字一致；前台 curl 回 `KV-HIT-RESTYLED` 並取得新稿；
  `qa-check-research` 兩檔零標記；字數 148–240（thin 5 張走 120–180）。

**我自己判斷錯誤一次，記下來**

研究層回報《Blues for Tee》《Live at the Misty》的卡池年份是再版年、原始年為 1974。
我用 MusicBrainz 覆核後**推翻了研究層並發訊攔截 hook 層**——結果是**我錯**。
- **MB 的 release-group 日期對日本爵士是再版年**：山本剛トリオ有 35 個 release-group，
  同一張《Midnight Sugar》既掛 1974 也掛 2013（卡池的 2013 就是從那個重複條目來的）；
  福村博在 MB 只有 3 張專輯、根本沒收《Morning Flight》。
- 決定性來源是**樂手本人的官方作品表**（鼓手大隅寿男）：TBM-37《Live at the Misty》與
  TBM-41《Blues for Tee》都錄於 1974-12-25 六本木 Misty、黑膠當年發行
  （那一晚一口氣錄出三張，TBM-52《The In Crowd》也是同一場）。
- **往後查日本爵士年份的順序**：樂手官方作品表 ＞ MB 的 **release 層級**最早壓片 ＞ TBM 編號序列自洽性
  （TBM-1=1970、TBM-11=1972、TBM-19=1973、TBM-23=1974 這條線很穩）。
  **MB 的 release-group 層級不可用。**

**卡池年份修正五筆**（年份不進 card id，不需 KV／Firestore 遷移）

山本剛トリオ《Midnight Sugar》2013→1974、《Blues for Tee》1988→1974、《Live at the Misty》1991→1974、
福村博クインテット《Morning Flight》1977→1973（TBM-19、他的首張領銜作，差六年）、
金井英人クインテット《Concierto de Aranjuez》1978→1979。

**人工審稿修了 8 處**（除上述年份外）：山本剛《Midnight Sugar》「出道時 25 歲」歧義
（1948-03-23 生，錄音時 25、發行時 26，改為「錄這張時 25 歲」並同步 hook 三層）；
《Speak Low》誤稱 Venus Records 是「直刻高傳真」——Venus 的招牌是 24 bit 母帶處理
Hyper Magnum Sound，非直刻盤；《Greensleeves》的「渡邊弘」應作日文字形「渡辺弘」；
峰厚介《Mine》裡的《Now!》漏一個驚嘆號；辛島文雄《Gathering》與鈴木勲《Ako's Dream》
同一間錄音室寫成 Epicurus 與エピキュラス兩種；森山威男《East Plants》結尾的
「稀有原盤→西方廠牌復刻」與福居良《Scenery》同構，已刪（該敘事本批獨佔給 Scenery）。

**研究層推翻主線假設的重點**：TBM 直刻盤工法的指派**查證否定**（TBM 的發燒名聲屬於錄音師的整體做法、
非某張獨有），該通論本批取消；「赴美與美國樂手同台」原指派給渡辺貞夫《Pamoja》也**否定**
（那是東京現場、全員日本樂手），改派給富樫雅彦《Eternal Duo》；TBM 第一張是峰厚介《Mine》
不是今田勝《Now!!》；《Toya, Shigeko with The Imada, Masaru Trio》其實是歌手**戸谷重子**的
首張個人專輯（TBM-11），卡池的 artist／album 掛置方式會誤導；渡辺香津美《KYLYN》**細野晴臣沒有參與**；
《Dogatana》**不是**獨奏作品；**富樫雅彦下半身癱瘓不是意外**，是 1970-01 遭妻子持刀刺傷致脊髓損傷。

**內容過濾器中斷的新樣態**：研究層把富樫雅彦的傷害案寫得過細（刀具尺寸、住址、外遇起因）而中斷。
處置是**保留事實、刪去渲染**（逝者克制＝不渲染細節而非跳過事實），並在派工詞明令下游
**逐字沿用收斂版本、不得加回細節**。資料未損失。

**產線規則變更（base 檔已改，三份都動）**

- **東亞音樂人名一律照原文漢字**（山本剛、坂本龍一、羅大佑），**不再羅馬化**；
  **只有全平假名／全片假名的名字才用羅馬字**（キングギドラ → King Giddra）；
  韓文諺文維持諺文並補羅馬拼音。專名的日文字形照抄（渡辺不改渡邊、荒井由実不改荒井由實）。
  這是店主 2026-08-11 的裁定，取代舊的「音樂人一律拉丁原文」。
- **QA 誤報新增一類**：日文新字體的專名（稲葉国光、東京郵便貯金会館、曲名「都会」）會被簡體字掃描命中，
  一律是誤報。`qa-batch.mjs` 的簡體掃描已改為比照非拉丁掃描先剝除《》〈〉內的專名
  （中國發行的官方簡體標題如崔健《新长征路上的摇滚》因此不再誤報）；行文外露的簡體仍抓得到。

**工具鏈**：`verify-kv.mjs` 批名收 `cjk-\d+`；`qa-batch.mjs` 的 GROUPS 改為
「實際存在幾組就驗幾組」（三組批不再假報缺 d／e）。**向下相容，w2-128 回歸通過。**

**另記一個待辦**：全池 66 張卡的 `genres` 是空陣列（含這批的 37 張華語卡），
`index.html` 的 `c.genres.includes(gpGenre)` 會把它們排除在所有曲風抽牌之外、只有隨機模式抽得到。
等 cjk-04／05 研究層查出曲風後一併補。

**主要檔案**：`dip-vinyl-worker/src/index.js`、`dip-vinyl-shop/seed_cards.json`、
`desc-restyle/prompts/{research,hook,writer}-base.md`、`desc-restyle/{qa-batch,verify-kv}.mjs`、
`desc-restyle/batches/cards/cjk-0[1-6]-cards.json`。
### 2026-08-10｜新 skill `dip-card-create`：一句話輸入的完整建卡產線

- Repo：skill 檔在 `dip-vinyl-home/.claude/skills/`（非 git）；工具鏈改造在 `desc-restyle/`（非 git）；
  本備忘錄與 `CLAUDE.md` 指向更新。
- 店主指示：輸入一個或複數個藝人／專輯／兩者／曲風延伸請求，就啟動「封面→三軸→找資料→hook→簡介」全流程；
  名稱定為 `dip-card-create`。

**設計要點（店主已確認）**

- **定位**：接起兩條既有產線——`dip-card-pool-expand` 管上架結構（腳本全數沿用、降為腳本庫），
  `dip-desc-restyle` 管簡介品質（prompts 與 QA 工具照用）。完成定義仍是 `ALBUM_ONBOARDING.md`。
- **曲風模式＝策展**，不是 MB tag 搜尋：盤點現有覆蓋 → 研究層提子派系配置的重要專輯清單
  （嘻哈分東岸／南方／地下等）→ 店主過目摘要 → 每張走 MB 身分查證進標準流程。
- **簡介直上 180–240 新規格**（全池 6,338 張已統一，新卡不用舊的 80–180）。
- **代理配置按批量縮放**：1–5 張＝研究1／hook主線自寫／寫作1；6–15＝2/1/1；16–50＝照 desc-restyle 5/2/2。
- **入池字元正規化寫成硬規則**：MB 的名稱可以抄、連字號不能照抄（U+2010→ASCII、U+03BC→U+00B5）。
- **album_overrides 固定產出 repaste JSON** 交店主後台貼（isAdmin 規則、REST 403 繞不過）。

**desc-restyle 工具鏈改造（向下相容，w2 批行為不變，已用 w2-128 回歸）**

- `verify-kv.mjs`：批名 regex 加收 `add-*`。
- `qa-batch.mjs`／`build-final.mjs`：卡單路徑 fallback `batches/wave2/` → `batches/cards/`（新目錄已建）。
- `merge-writer-input.mjs`：改為「實際存在幾組研究稿就吃幾組」，小批 1–2 組不再炸檔案不存在。

**指向更新**：`CLAUDE.md` 的「新增專輯固定公式」改指 `dip-card-create`；
`dip-card-pool-expand/SKILL.md` 頂部加註降為腳本庫。

**主要檔案**：`.claude/skills/dip-card-create/SKILL.md`（新）、`CLAUDE.md`、
`.claude/skills/dip-card-pool-expand/SKILL.md`、`desc-restyle/{verify-kv,qa-batch,build-final,merge-writer-input}.mjs`。

**驗證結果**：`qa-batch out w2-128` 回歸通過（39 張與卡單相符）；`add-*` 批名走新路徑、
缺檔時給明確錯誤訊息不再靜默。
### 2026-08-10｜Firestore 孤兒文件搬移完成（39 筆）；專輯名 U+2010 正規化（7 張）

- Repo：`dip-vinyl-shop`（`seed_cards.json`、`apex_pool.json`、本備忘錄）。承接同日兩筆字串正規化。
- 店主開了 bypass permissions 並指示全部由 Claude 執行。

**Firestore 兩個集合的規則不同——這是整件事的關鍵，寫進來免得下次再問**

`firestore.rules` 裡：

- `match /card_catalog/{id}    { allow read: if true; allow write: if true; }`
  ——**任何人都能寫**，未登入玩家抽到卡就會寫入（用途就是讓後台看得到所有人抽了什麼）。
  所以拿公開 API key 就能用 REST 搬移。
- `match /album_overrides/{id} { allow read: if true; allow write: if isAdmin(); }`
  ——`isAdmin()` 檢查 `request.auth.token.email == 'kubinice06@gmail.com'`。
  **既有資料是店主在後台用 Google 登入後、由瀏覽器帶著登入 token 寫進去的。**
  **API key 不是身分驗證**（它只識別專案、不代表任何使用者），所以任何 REST 寫入一律 403 PERMISSION_DENIED。
  **這條繞不過，也不該繞——只能由店主在後台操作。**

**已完成**

- `card_catalog` 共 **39 筆**搬到新文件 id 並刪除舊文件（32 筆藝人字串改名 ＋ 7 筆專輯名改名），
  全部先備份、寫入後逐筆驗證 `coverUrl` 與上架欄位、驗過才刪。**失敗 0。**
  其中 **13 筆帶上架流程欄位**（`seed / classic / obscurity / rarity / accessibility / rgMbid / upc`）。
  Sonny Sharrock《Monkey-Pockie-Boo》特別注意：**人工上架那份（CAA 封面＋三軸＋稀有度）在 U+2010 的 id 上，
  ASCII id 上是更早的自動記錄（Spotify 封面）**，搬移方向是上架那份覆蓋掉自動記錄，方向正確。
- **專輯名的 U+2010 正規化 7 張**（藝人欄那批的另一半，同樣會分裂 KV key）：
  Sonny Sharrock《Monkey-Pockie-Boo》、Jean-Roger Caussimon《Jean-Roger Caussimon chante…》、
  Graham Central Station《Ain't No 'Bout-a-Doubt It》、Eric Burdon and War《The Black-Man's Burdon》、
  Smokey Robinson & the Miracles《Going to a Go-Go》、The Supremes《The Supremes A' Go-Go》、
  Stevie Wonder《Up-Tight (Everything's Alright)》。
  seed_cards 以字串替換保留單行格式（命中數／總長度／筆數／無重複卡四道防呆）、apex_pool 1 處、
  desc-restyle 2 處；**KV 遷移 5 筆**（另 2 張本來就沒有 KV 值）。

**待店主在後台處理：`album_overrides` 3 筆固定試聽連結**

清單已產出在 `dip-vinyl-shop/album_overrides-repaste.json`，可直接貼進後台的批次匯入框
（該框吃 `[{artist, album, previewUrl}]` 格式，以 merge 寫入、不會覆蓋既有介紹／三軸／頂級牌設定）：

- Niels-Henning Ørsted Pedersen & Sam Jones《Double Bass》
- Jean-Luc Godard《Histoire(s) du Cinéma》
- Sonny Sharrock《Monkey-Pockie-Boo》

**全域複查（改完後跑的）**

卡池 7,505 張｜藝人欄殘留分裂字元 **0**｜專輯欄殘留 **0**｜apex_pool 殘留 **0**（共 633 項）｜
藝人同名分裂 **0 組**｜重複卡 **0**｜本次遷移的 KV 新 key 34 筆缺漏 **0**｜
Firestore `card_catalog` 新 id 有文件 38/39、舊 id 殘留 **0**
（少的那 1 筆是 Caussimon 的中間態 id——先改藝人再改專輯，文件已接著搬到最終 id，非缺漏）。

**主要檔案**：`dip-vinyl-shop/seed_cards.json`、`dip-vinyl-shop/apex_pool.json`、
`dip-vinyl-shop/album_overrides-repaste.json`、`dip-vinyl-shop/scripts/migrate-card-catalog-ids.mjs`、
`dip-vinyl-shop/PROJECT_MEMORY.md`、`desc-restyle/progress.json`。
備份：`seed_cards.backup-before-album-hyphen.json`、`firestore-backup-cardids-2026-08-10.json`。
### 2026-08-10｜卡池藝人字串大小寫與冠詞正規化（21 組）；Firestore 孤兒文件清點

- Repo：`dip-vinyl-shop`（`seed_cards.json`、`apex_pool.json`、本備忘錄）。承接同日前一筆的字元正規化。
- 店主指示：大小寫／冠詞一律採官方用法。

**改法與依據**

- 寫法一律取 **MusicBrainz 的正規名稱**（本專案上架流程本來就以 MB 為準），
  **唯連字號改用 ASCII**——查證時發現 **MusicBrainz 自己用 U+2010**（`alt‐J`、`blink‐182` 在 MB 上都是 U+2010），
  **這極可能就是卡池那 32 張 U+2010 污染的來源**。MB 名稱可以抄，連字號不能照抄。
- 21 組、seed_cards 34 張卡、apex_pool 3 處（Sly & the Family Stone 兩張、KISS 一張）。
- 全大寫：KISS、SAULT、XXXTENTACION、KAYTRANADA、ROSALÍA、TOWA TEI、NUMBER GIRL、SUPERCAR、MONO。
  全小寫：beabadoobee、shame、black midi、toe、blink-182、alt-J、Charli xcx。
  冠詞小寫：Kool & the Gang、Sly & the Family Stone、Gladys Knight & the Pips、
  Florence + the Machine、King Gizzard & the Lizard Wizard。
- **這批完全不需要遷移 KV 或 Firestore**：只動大小寫與冠詞，`.toLowerCase()` 之後字串完全相同，
  而 KV key 與 Firestore 文件 id 都是轉小寫後才組出來的。
  **腳本把這條寫成硬性前置檢查——任一組轉小寫後不同就中止，不讓它有機會靜默改到 id。**
- 查證時抓到兩個同名不同人的陷阱：MusicBrainz 上有三個 Rosalía、三個 Supercar，
  已依卡池實際專輯確認為西班牙的 ROSALÍA（《El Mal Querer》）與日本的 SUPERCAR（《Highvision》）。
- 驗證：改後全池同名分裂組數 0、含 U+2010／U+03BC 的藝人 0、總數 7,505 張不變、兩個檔的單行壓縮格式保留。

**Firestore 孤兒文件（前一筆字元正規化的後續，尚未修）**

- **先釐清一個誤解：抽牌不受影響。** 抽卡直接讀 `seed_cards.json` 與 `apex_pool.json`
  （`index.html` 的 `loadCardPool`），Firestore 完全不參與「這張卡抽不抽得到」。
  Firestore 存的是封面快取與人工修正，查不到就退回即時抓 Spotify（`resolveCardAssets` 三路並行）。
- 以 Firestore REST 逐一查過（讀取是公開的，前台未登入就在讀），前一筆改名的 32 張留下：
  - **`card_catalog` 32 筆**。其中 26 筆只是抽卡時 fire-and-forget 記的封面快取，下次抽到自己重建；
    **但 6 筆帶著 `seed / classic / obscurity / rarity / accessibility / rgMbid / upc` 等上架流程欄位**
    （Niels-Henning Ørsted Pedersen、Jean-Luc Godard、Jean-Roger Caussimon、The Bar-Kays 三張），**這些不會自動長回來**。
  - **`album_overrides` 2 筆**，都是人工釘的固定試聽連結：
    Niels-Henning Ørsted Pedersen & Sam Jones《Double Bass》、Jean-Luc Godard《Histoire(s) du cinéma》。
- **已備妥腳本**：`scripts/migrate-card-catalog-ids.mjs`（預設乾跑，`--write` 才動手，`--delete-old` 才刪舊文件；
  會先整份備份、寫入後逐筆驗證 coverUrl 與上架欄位、任一筆不符就中止不刪）。
  對照表預設從 `seed_cards.backup-before-hyphen-normalize.json` 與現行檔比對推回，也可用 `--map` 指定。
  乾跑結果：card_catalog 待搬 32 筆（6 筆帶上架欄位）、album_overrides 2 筆需在後台重設。
- **未修的原因**：`card_catalog` 前台未登入就能寫（程式註解明講「任何人都能寫入」），本可用 REST 搬移，
  但這次的 Firestore 寫入被權限分類器擋下、未執行；`album_overrides` 是管理員寫入保護，本來就要登入後台。
  **34 份文件已完整備份**（scratchpad 的 `firestore-backup.json`），要修時直接照著搬即可。

**往後的硬規則**：**任何藝人字串的改名，動手前先跑三件事**——
(1) 掃 `apex_pool.json` 看有沒有頂級牌在內；
(2) 用 Firestore REST 查 `card_catalog` 與 `album_overrides` 的舊 id 有沒有文件、有沒有帶上架欄位；
(3) 確認改動是否真的會動到 `.toLowerCase()` 之後的 id——不會動到的話，整個遷移都可以省掉。

**主要檔案**：`dip-vinyl-shop/seed_cards.json`、`dip-vinyl-shop/apex_pool.json`、
`dip-vinyl-shop/PROJECT_MEMORY.md`、`desc-restyle/progress.json`、`desc-restyle/` 各層 artist 欄 168 處。

**驗證結果**：seed_cards 與 apex_pool 皆 JSON 合法、單行格式保留、筆數不變；
同名分裂 0 組；desc-restyle 71 檔 168 處同步；commit `d142803` 已 push。
### 2026-08-10｜desc-restyle w2-122 至 w2-128 上線（348 張）；**wave2 全部完成**；卡池藝人字串字元正規化

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- **七批全部上線，wave2 就此收工：128 批 / 6,338 張，`verify-kv.mjs` 逐批一致、`chk-diskvskv.mjs` 零分岔。**
  最後一批 w2-128 是家族混合批（electronic／industrial／noise／house／rock／world／blues／hiphop／具象音樂）。

**研究層推翻主線之處（挑重要的）**

- **獎項誤植連攔三次**：Tool《Lateralus》得獎的是收錄曲〈Schism〉在第 44 屆葛萊美的最佳金屬演出獎，
  **不是同名曲、也不是專輯本身**；Gary Clark Jr.《Blak and Blu》的兩項要分開講（〈Please Come Home〉得獎、
  〈Ain't Messin' Round〉只入圍）；Netsky 的 Drum & Bass Arena 獎項各來源全衝突，整條不寫。
- **EBM 詞源的層次**：「electronic body music」最早由 Kraftwerk 的 Ralf Hütter 1977 年受訪時提出，
  早於 DAF 與 Front 242；DAF 當年自稱 Körpermusik，EBM 成為類型標籤要到 1984 年 Front 242 才確立。
- **μ-Ziq《Scurlage》不是封存舊素材**，是 2020 年 Gower 半島封城期間的全新創作、廠牌是 Analogical Force 不是 Planet Mu。
- Severed Heads《City Slab Horror》的原始發行商是澳洲 Ink Records（1985），Volition 是 1989 年的重發商。
- Merzbow《Pulse Demon》的封面沒有任何爭議事件（是向 Philips 的 Prospective 21e Siècle 系列與 Bridget Riley 致敬）。
- Luc Ferrari〈Presque rien No.1〉不是「一整天」的錄音壓縮而成，是連續多個清晨錄的；這張精選輯最早是 1995 年 INA-GRM 的 CD。
- 23 Skidoo 與 Fun Boy Three 的合作查無紀錄，整條不寫；Emancipator 被 Nas／Damian Marley 取樣的說法查無證據，整條不寫。
- Satoshi Ashikawa 1983 年車禍辭世屬實，但 **Wave Notation 系列並未因此中斷**，第三輯 1984 年仍完成。

**人工審稿修到的（每批 0–8 處，其中三批零修正）**

- **w2-122／123／126 三批零修正。** 研究層自發做對三件事：查不到就說查不到並換一個查得到的事實、
  來源衝突就兩面並陳或乾脆不寫、連暗示都避開（DJ Rashad《Double Cup》略去「最後一張錄音室專輯」，因為那等於暗示他的死）。
- **w2-127**：Shackleton《Three EPs》的曲目原本要各自獨立成 **EP**、正文卻寫成「單曲」——
  專輯標題本身就寫著 EP，是掃描腳本抓不到的內部矛盾；Ron Trent 的「1986 年還在念高中時錄下〈Altered States〉」
  與他 1990 年發行時十七歲對不上（1986 年才十三歲）；OMD《Universal》寫「1996 年英國樂界正瘋 grunge」，
  1996 年的英國是 Britpop 高峰。
- **w2-128**：Merzbow 那張把 Masami Akita 寫成日文漢字「秋田昌美」（**中文正文裡的中文人名不會觸發任何 QA 規則**）；
  Cabaret Voltaire《The Crackdown》的 hook 前提錯了（不是「第一次進英國專輯榜」，是比先前唯一一次高出六十多名）；
  Ride《Nowhere》的「Creation 旗下第一張進英國 Top 75」查無來源、整條刪掉；
  Painkiller 的封面描述過細，依逝者克制原則削短；µ-Ziq 那張有一句校對痕跡（否定讀者從沒有過的前提）。

**卡池品質（4 張移除／更正）**

- 移除 Thomas Newman《Winter Walking: Soundtracks for Cold Days》（跨作曲家的串流合輯、無具名編選者、平台間掛名不一）。
- 移除藝人字串含 U+E45F 私有區字元的 Ice-T《Rhyme Pays》**損壞重複卡**（正確的那張完好保留）。
- 移除 Roosevelt Sykes《Blues》(1929)：**1929 年沒有「專輯」這種發行形式**，市面同名黑膠曲目彼此不一致、
  查無單一權威整理者，屬雜牌彙編。同一位藝人的《The Meek》(1970) 是正式錄音室專輯、保留。
- 更正掛名：Marta Złakowska 是《When It's Going Wrong》的主角，藝人欄由 `Tricky` 改為 `Marta and Tricky`（KV 鍵同步搬移）。
- 更正年份：Brian Eno《My Life in the Bush of Ghosts》1980 → 1981、Edward Ka-Spel《Aa?zhyd China Doll》1984 → 1987。

**卡池藝人字串的字元正規化（店主 2026-08-10 指示）**

- 起因：店主指出兩張 µ-Ziq 卡用了不同字元，搜尋只會出一張。掃全池後發現不是個案。
- **16 個藝人字串用了 U+2010 連字號而非 ASCII 的 `-`，共 32 張卡**（µ-Ziq 那張還多用了 U+03BC 希臘字母 mu）。
  **這類會讓 KV key 一起分裂**——key 是 `artist.toLowerCase()+"|"+album`，U+2010 ≠ U+002D，轉小寫救不了。
  其中 Wu-Tang Clan、Ice-T、alt-J、blink-182、Jean-Michel Jarre、Run-D.M.C.、Drive-By Truckers 這七個**卡池裡本來就兩種寫法並存**。
- 處理：`seed_cards.json` 以字串替換保留單行壓縮格式（三道防呆：逐藝人命中數等於卡數、總字串長度不變、筆數不變）；
  `desc-restyle/` 同步 110 檔 305 處；KV 遷移 29 張（寫新 key → 逐字比對內容相符 → 刪舊 key → 確認消失）。
- **⚠ 要記住的兩條**：(1) Cloudflare 的 bulk 寫入走 API 會被這顆 token 以 10405 擋下（只給讀），**寫入與刪除一律走 wrangler**；
  (2) bulk delete 之後立刻用 bulk/get 驗證會有一批還在（最終一致性），**隔一次呼叫再驗就全消失，別誤判成刪除失敗**。
- **⚠ 改藝人字串會連帶動到 Firestore**：`card_catalog` 與 `album_overrides` 的文件 id 用同一條
  `(artist+"|"+album).toLowerCase()` 規則（index.html 的 `cardIdOf`），改名等於讓既有文件變孤兒。
  card_catalog 抽卡時會自己重建，但**後台手動修過的封面、固定試聽連結、頂級牌 tier 旗標都會失聯**。
  這次先掃過 `apex_pool.json`：**含分裂字元的項目是 0，頂級牌一張都沒受影響。**
- **未處理、待裁示**：另有 11 組大小寫／冠詞分裂（KISS/Kiss、SAULT/Sault、Charli xcx、beabadoobee、black midi、
  shame、toe、MONO、Kool & The/the Gang、Sly & The/the Family Stone、Florence + The/the Machine 等）。
  **這類不影響 KV key**（key 本來就轉小寫），只影響顯示字串與按藝人分組，與字元分裂是兩件事。

**主要檔案**：`dip-vinyl-shop/seed_cards.json`、`dip-vinyl-shop/PROJECT_MEMORY.md`、
`desc-restyle/progress.json`、`desc-restyle/prompts/{research,hook,writer}-base.md`、
`desc-restyle/ELECTRONIC_LEDGER.md`、`desc-restyle/batches/` 各層產出。

**驗證結果**：七批 `build-final` 皆在 167–240 字區間內；`wrangler kv bulk put` 七次皆 `Success!`；
`verify-kv.mjs` 逐批「一致＝張數、不符 0」；`chk-diskvskv.mjs` 逐批零分岔；
字元正規化的 29 張 KV 遷移逐筆比對內容相符、舊 key 全數確認消失。
### 2026-08-10｜desc-restyle w2-117 至 w2-121 上線（250 張）；wave2 過 96%；四條常設規則改寫

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 五批各 50 張全部上線，`verify-kv.mjs` 逐批一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 121 批 / 6,049 張（96.6%），剩 7 批。**
- 店主本輪原指定 117–122 六批接力，中途指示 **122 不開**，實際完成 117–121 五批。

#### 四條常設規則改寫（本輪最重要的產出）

**一、`hook-base.md`：分數與星等一律不進 hook，也不進 note 的指派句。**
w2-117 有五張的 note 指派了樂評分數，其中一張**直接把「拿了 Pitchfork 9.1 分」寫進 hook 本身**。
查下去才發現根因：該檔教「note 要用正面表述」那一節，**範例句寫的就是
「不寫『禁補銷量』，改寫『成績段落只寫 Metacritic 分數』」——指令檔自己在示範違規，代理一字不差照抄。**
w2-112 那次只當個案修掉單張卡、沒回頭看指令檔，這才是它會重演的原因。
範例已改成榜單名次，並補一條區分「Pitchfork 選為 Best New Music」（定位，可寫）與「9.2 分」（評級，不可寫）。
**教訓：同一型錯誤第二次出現時，要去查它是不是寫在指令檔裡，而不是只修那張卡。**
效果立即可見——w2-119 的兩位 hook 代理主動把研究稿裡的分數改寫成非數字表述並在回報裡說明。

**二、`writer-base.md`：字元預算的「偏差方向」也不可繼承了。**
曾經有三代預測規則，每一代都被下一批推翻（樂團卡／個人卡 → 專名數量 → 至少方向可繼承）。
本輪把最後一代也推翻了，而且是在三個層級各推翻一次：
w2-118 **同一批的兩組方向相反**；w2-119 兩組都低估但幅度不同；
w2-120 **同一位代理手上，Alva Noto 與 Tim Hecker 段落貼近估值、Clark 五張卻系統性高估 15–25 字元**。
現行版本只留硬程序：動筆前列預算表、確認總和落在 180–240 之內（不是只確認沒超過 240）、
**動筆前就把專名壓下來**（這是唯一真正有效的做法）、初稿逐張實測、修剪一律整格捨去。

**三、`ELECTRONIC_LEDGER.md`：骨架「自組廠牌」改名為「他自己開了一家廠牌來發自己的唱片」。**
w2-121 的 hook 代理當場回報這條與「廠牌配額已取消」相牴觸。它的折衷處理是對的，但混淆是我們造成的：
受限的是**故事骨架**，2026-08-02 取消的是**廠牌題材配額**，舊名字面上看不出差別。已加說明框。

**四、`research-base.md`：繁體中文要交件前自驗，並列出兩類 QA 掃不到的日文陷阱。**
起因見下節。

#### 帳本漏了一整個維度：舊批

**`ELECTRONIC_LEDGER.md` 規劃的是 113–127 這 15 批彼此之間的位置分派，完全沒把 001–112 的舊卡算進去。**
w2-118 一次撞到四組、w2-119 再撞一組，帳本原定的位置當場作廢、必須改派：

- Einstürzende Neubauten 的「自製樂器與建築廢料」→ w2-050《Halber Mensch》整張寫過，改寫樂迷訂閱制等六條。
- Brian Eno 的「ambient 一詞的提出」→ w2-042《Discreet Music》寫過車禍臥床那段，改寫各張的合作對象。
- Ellen Allien 的 BPitch Control 自創 → w2-036《Berlinette》寫過，降為一句事實。
- Fatboy Slim 的 House of Love 工作室與 Atari ST → w2-011 寫過，降為一句事實。
- 「Plaid 與 The Black Dog 的同源分裂」→ w2-036《Double Figure》從 Plaid 那側寫過，
  改由 The Black Dog 這側切入、釘《Spanners》。

**往後每批步驟 1 的「掃舊批同藝人」不能只看開場句是否撞頭，要連舊卡把哪個切入點用掉了一起記下來。**
另注意 `chk-hook-crossgroup.mjs` 掃的是全池 6,035 張含 wave1，比手寫的 `w2-*-kv.json` 掃描完整
——w2-118 的 Biosphere 舊卡就在 wave1，只有那支工具抓得到。

#### 人工審稿抓到的錯誤型態（五批共 27 處）

**只有人眼抓得到的三型：**

1. **研究稿把人的所屬團體寫錯，一路傳到 hook**（w2-120）：Clark《Iradelphic》寫「Massive Attack 歌手
   Martina Topley-Bird」——她是 Tricky 的長期搭檔，與 Massive Attack 只有 2010 年一次客座。
   **人名與團名都真實存在、拼寫也對，錯的只有兩者的關係，機器完全掃不到。**
   而它剛好與 w2-119 的 Tricky 四張並行——**同一人物在相鄰批次出現時，前一批查證過的關係要當成對照組。**
2. **日文專名的兩層陷阱**（w2-119、w2-120）：Toshifumi Hinata 被寫成漢字「日向敏文」、
   Ryuichi Sakamoto 寫成「坂本龍一」、Tokyo Gakuso 寫成「東京楽所」（「楽」還是日文新字體）。
   **CJK 字元與中文字無法區分，QA 兩層都掃不到。** 規則：音樂人與團體一律拉丁原文；
   導演、畫家、數學家、哲學家才用台灣慣用中譯（本輪的柏格曼、馬諦斯、閔考斯基、班雅明都正確）。
3. **hook 懸念沒收尾三處**：Fatboy Slim 首張的「自宅閣樓一週做完」正文完全沒交代（該事實研究稿有、
   是壓字數時被整格砍掉）；Vitalic《OK Cowboy》的 hook 點名 Aphex Twin、正文只寫「DJ 圈」。

**校對痕跡四處**（都源自我派工詞的提問被研究層寫成否定句、再被寫作層抄進正文）：
Monolake《Polygon_Cities》「這不是一張全新的錄音室作品」、Yokota《Over Head》「是全新創作而不是舊作重組」、
Tiësto《In My Memory》「〈Silence〉本身並不收在這張裡」、Tricky《Mixed Race》「他本人從未公開說明命名的由來」、
Venetian Snares《The Chocolate Wheelchair Album》「不是選輯也不是混音輯」。
**根因固定：我在派工詞問「這是 A 還是 B」，答案就會以「是 A 不是 B」的形式一路傳到正文。**

**其他**：Pole《Steingarten》把 Düsseldorf 寫成「krautrock 的發源地」（超譯，改「重鎮」）；
Matmos 的 banjo 誤譯成「班鳩琴」（研究稿就錯，hook 也中招）；Ellen Allien 的 acid house 音譯成「酸浩室」；
Fuck Buttons 的奧運開幕寫成「典禮的第一聲」（研究稿只說「開場」）；
The Black Dog《Spanners》把 Dust Science 廠牌寫進 2001 年那個時點（該廠牌的合作要到 2005 年才有作品）。

#### 研究層推翻主線的重點（五批合計五十餘處）

- **外部資料本身是假的，兩型**：Plaid《Spokes》查到的「倫敦地下墓穴蝙蝠聲」四處無源、代理判定是 AI 生成內容；
  Tycho《Awake》廣為流傳的葛萊美入圍其實是 2016 年另一張《Epoch》的事。
- **讀法錯而非事實錯**：Venetian Snares《Winnipeg Is a Frozen Shithole》乍看在罵家鄉，
  但他自己的內頁寫那是「a tribute」、同年訪談說他真心喜歡溫尼伯（租金便宜、有空間工作）
  ——**照標題字面寫會把整張卡的語氣搞反。**
- **身分／性質判定四處**：`tricky|when it's going wrong` 不是 Tricky 的專輯，是波蘭歌手 Marta Złakowska 的首張、
  掛名「Marta and Tricky」（掛名裡有他，依常設裁定保留）；OPN《Music for Reliquary House》是與 Rene Hell 的
  分軌合輯、只有一面是他的；Skinny Puppy《Remission》是 EP；Washed Out《High Times》是限量卡帶 EP。
- **「第一張」反查擋下五處**：Nettwerk 的第一號其實是 Moev《Toulyev》EP、Hearts of Space 的第一號是
  Kevin Braheny《Perelandra》、Venetian Snares 的 `printf(...)` 是第四件作品（此前已自行發行三卷卡帶）、
  Oval 創立時是四人不是三人、《My Love Is a Bulldozer》的「首度自唱」降級成「罕見地」。
- **廠牌歸屬錯五處**：Alva Noto《Transform》原版在 Mille Plateaux（2008 才由 Raster-Noton 再版）、
  Mr. Oizo《The Church》是 Brainfeeder 不是 Ed Banger、Clark《Cave Dog》是自營 Throttle 不是 Warp、
  Peverelist《Tessellations》是 Livity Sound 不是 Punch Drunk、Pole《3》是 Kiff SM／Matador 不是 ~scape。
- **時序釐清四處**：Pan Sonic 1995 年發行《Vakio》時還叫 Panasonic（1998 春才改名，且與另一組的
  Neubauten 混音專輯名單交叉印證）、Skinny Puppy《Weapon》的帳單在專輯之後（2011 得知→2013 發行→2014 求償）、
  Tiësto 的雅典奧運演出晚於《Just Be》發行、Nosaj Thing《Drift》夾在 Kid Cudi（2008）與 Kendrick（2011）之間。
- **UR 的創始成員**：只有 Mad Mike Banks 與 Jeff Mills，Robert Hood 稍後加入、1992 年與 Mills 一同離團。
- **Low End Theory 的創辦人**是 Daddy Kev 與 Nocando，Gaslamp Killer 只是駐場 DJ 之一。
- 我派工詞給錯前提二十餘處，其中 w2-121 的 e 組一組就佔五處。

#### 內容過濾器連續中斷四個代理（w2-121）

四次全部發生在**代理輸出大段回報文字**的時候，工作檔案每次都完好——該批卡單含帶髒話的專輯標題。
**正確處置是先檢查檔案狀態、不要反射性重跑**：前三次檔案都完整，只有 writer-1 因為
「全部改完才第一次寫檔」而整組 25 張遺失。重派時加的兩條防護有效，同一位置再次中斷時零損失：

1. **初稿一完成就先存檔，之後就地改、每改幾張存一次。**
2. **完工回報壓成一行，不引用專輯標題與正文內容。**

**這兩條往後對長標題或敏感標題的批次應固定加進派工詞。**

#### 整組研究稿寫成簡體中文（本產線首見）

w2-121 的 e 組十張全中、四百餘處。QA 攔下了，沒流到下游。已在 `research-base.md` 加警告框，
要求交件前**用程式逐字檢查、不要用眼睛掃**——主線自己在這裡也犯了一次：
我用眼睛掃一串 621 字的密集字表，把繁體字誤認成簡體、判定「字表轉換不會收斂」，因而多發了一次代理請求
（那次還撞上過濾器）。**程式逐字驗證的結果是零殘留，轉換其實一次就完成了。**

#### 卡池

- **年份訂正一筆**：Brian Eno《My Life in the Bush of Ghosts》1980 → 1981（實際發行日 1981 年 2 月 25 日）。
  以字串替換保留單行壓縮格式、位元組數不變、已備份。
- **查到但不動的兩筆**：Arovane《Atol Scrap》的發行日來源衝突（MusicBrainz 記 1999 年 12 月、
  零售登錄 2000 年 1 月）——這種程度的分歧不動卡池，正文改成不寫月份、只寫它早於《Tides》；
  Venetian Snares《Winter in the Belly of a Snake》版權頁記 2002、實際因壓片問題延到 2003 年 1 月
  ——卡池登錄值有來源，不是錯誤。
- **待處理（延續前輪）**：w2-128 的 `ice?|rhyme pays`（藝人字串含私有區字元 U+E45F，
  是 `Ice‐T｜Rhyme Pays` 的編碼損壞重複卡）。

#### 主要檔案

`desc-restyle/prompts/{hook,writer,research}-base.md`、`desc-restyle/ELECTRONIC_LEDGER.md`、
`desc-restyle/batches/w2-1{17,18,19,20,21}-kv.json`、
`desc-restyle/batches/output/w2-1{17,18,19,20,21}-out-{1,2}.json`、
`desc-restyle/progress.json`、`dip-vinyl-shop/seed_cards.json`。
### 2026-08-09｜desc-restyle w2-113 至 w2-116 上線（197 張）；electronic 家族開跑；店主兩項裁定

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 四批分別 49／50／50／49 張全部上線，`verify-kv.mjs` 逐批一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 116 批 / 5,799 張（91.6%）。連同同日上線的 w2-110–112，本輪共完成 110–116 七批、340 張。**

#### 店主兩項裁定

**一、單曲卡：重要的一律保留。** 卡片指向的不是專輯而是一支單曲時，**只要那支單曲本身有歷史定位就保留**，
正文照實以單曲的框架書寫（發行形式、廠牌目錄編號、B 面），**不得為了湊成專輯而虛構曲目**。
**電子樂特別多這種卡**——house、techno、jungle、dubstep 的關鍵作品有很大一部分只以 12 吋單曲存在。
（店主指出這條先前已裁定過，但 progress notes、本備忘錄與 skill 檔裡都沒有留下記錄，本輪因此被當成新問題請示了一次。
現已寫進 skill 檔的「卡池品質」常設裁定清單、`ELECTRONIC_LEDGER.md` 與 progress notes 三處。）
實例：w2-114 的 `model 500|no ufo's` 是 1985 年 4 月 Metroplex 目錄第一號的 12 吋單曲、查無同名專輯，**保留並照實寫成單曲**。

**二、樂評本身就是這張卡最重要的內容時，寫進去**（「樂評媒體名不進正文」那條的窄例外）。
**判準只有一條：把樂評整條拿掉之後，這張卡還剩不剩得下一個故事。**
剩得下就照舊不寫；剩不下就寫——冷門作品的歷史定位常常只存在於樂評裡，它沒有榜單、認證或獎項可用。
寫法：優先寫評語的內容而非分數；那條定位非得靠出處才成立時（年度榜、票選、十年百大）**可以具名該媒體**，
因為去了頭就變成「一份清單第 81 名」這種無意義的數字；**星等與分數本身仍一律不寫**；一張卡最多用一次。
起因是 w2-115 有多張冷門電子樂卡因禁令只剩發行事實（Freescha 那張只寫得出 187 字、貼著下限）。
**首次實測兩組寫作代理都極保守**：w2-116 的 writer-2 判定 0 張適用，writer-1 標的 3 張其實都是舊規則本來就允許的不具名描述。

#### electronic 家族開跑：`ELECTRONIC_LEDGER.md` 新建（w2-113–127，750 張）

十六條源流的逐批位置一次規劃完畢。本家族與 hiphop 家族最大的不同是**化名鏈**：
字串比對只抓到 1 組跨批同藝人，但電子樂一人多名是常態——Larry Heard／Mr. Fingers／Fingers Inc.（113/124/128）、
Juan Atkins／Model 500／Cybotron（114/124）、Richie Hawtin／Plastikman（114/124）、
Vladislav Delay／Luomo（117/122）、Basic Channel／Rhythm & Sound（113/127）分別橫跨兩到三批，**掃描完全看不到**。
帳本已列表要求派工前逐條反查，並裁定「化名本身只准三張當主結構」。

另定六條高風險骨架，其中**「Kraftwerk 的影響」整個家族一律不得當主結構**。

**「某某是這個類型的第一張唱片」的反查規則見效顯著**——四批合計擋下：Warp 的「第一批發行」（實為第三張專輯，且 Warp 有三位創辦人）、
Fifty Foot Hose 的「史上第一張電子搖滾專輯」、YMO《BGM》的「最早採用 TR-808」（坂本龍一《B-2 Unit》更早）、
《Technodelic》的「取樣的早期使用」（《My Life in the Bush of Ghosts》同年更早）、
Mort Garson 的「西岸第一張全 Moog 專輯」（Beaver & Krause 1970 年更早）、Dabrye 的「廠牌首張全長」。
**這條要固定保留給整個 electronic 家族。**

#### 人工審稿抓到的三類錯誤

**一、hook 前提把專有名詞的類別搞錯**（w2-113）：Orbital《In Sides》寫「開場曲的電力全部來自一台音響擴大機」，
研究稿把「Cyrus」讀成音響品牌——實際上那是**綠色和平組織那台行動太陽能發電機的名字**，
〈The Girl with the Sun in Her Head〉是在他們的巴士上全程只用太陽能錄成的。
**字面上本來就有破綻（擴大機不是電源），但讀起來像器材規格，研究層與寫作層都放過去了。**

**二、研究稿內部互相矛盾**（w2-114）：Laibach《The Sound of Music》的 facts 寫「2015 年那場平壤演出是慶祝北韓建國 70 週年」，
**但同一份 facts 的下一條就提到該場演出拍成的紀錄片叫《Liberation Day》**。北韓建國是 1948 年，
2015 年 8 月是朝鮮半島脫離日本殖民統治 70 週年，演出日期 8 月 19 日正好落在光復節之後。
**教訓：審稿時要讓同一張卡的 facts 互相對照。**

**三、跨批矛盾**（w2-115）：Luke Vibert《YosepH》把 Peter Walker 也寫成「Warp 共同創辦人」，
但 **w2-113 才查證過 Warp 的三位創辦人是 Steve Beckett、Rob Mitchell 與 Robert Gordon**。
根因是研究稿那句的修飾範圍有歧義。**同一家族連跑時，前幾批查證過的「集體事實」要當成後續批次的既有知識來對照。**

另修：Porter Ricks 團名出處的中文片名掛錯（Porter Ricks 出自 1960 年代影集《Flipper》，
《海豚的一天》是 1973 年電影 The Day of the Dolphin）、Jade 的 hook 懸念沒收尾、Poliça 被寫成個人歌手（實為樂團）。

#### 研究層推翻主線的重點（四批合計四十餘處）

- **廠牌歸屬錯了五處**：Moodymann《Mahogany Brown》是 Peacefrog 不是 KDJ；Metro Area 是 Source 與 Environ 不是 DFA；
  Pinch 自營的是 Tectonic、Punch Drunk 是 Peverelist 的；Surgeon《Force + Form》是 Tresor 不是 Downwards；
  Robert Hood《Minimal Nation》最初是透過 Jeff Mills 的 Axis（AX 007）發行、M-Plant 當時只是錄音室名稱。
- **Wire 改名 Wir 是鼓手 Robert Gotobed 離團**，不是常被誤傳的 Bruce Gilbert。
- **Zero 7 兩人是 RAK Studios 的錄音工程師**，不是 Radiohead 或 Nigel Godrich 的助理；
  「Zero 7」這個名字首度使用是 1997 年替〈Climbing Up the Walls〉做混音重製那次；團名源自宏都拉斯一間叫 Cero Siete 的酒吧。
- **Ulrich Schnauss 本人否定樂評把他與 My Bloody Valentine 的比較**（說那「相當荒謬」），他講的是「讓吉他聽起來像合成器、也讓合成器聽起來像吉他」。
- **Chris Horne 不是 Boards of Canada 的正式團員**，是成軍前 Hexagon Sun 圈子的參與者，2002 年 Warp 重發《Twoism》時主動要求拿掉掛名。
- **Andrés 是 Slum Village 與 J Dilla 的駐團 DJ**，不是 Moodymann 的；〈New for U〉不在《II》。
- **《Metropolis》與《Metropolis Metropolis》是兩件不同的默片配樂**（2000 Tresor／2023 Axis）。
- 《Human After All》廣為流傳的「六週錄完」與可查證的錄製區間（2004-09-13 至 11-09，約八週）對不上。
- 「French touch」一詞是樂評人 Martin James 1996 年為《Super Discount》寫評論時創造的。
- 三張已發行卻被我當成未上市：A$AP Rocky《Don't Be Dumb》（2026-01-16）、Ski Mask《11th Dimension》（2024-06-07）、
  Jeff Mills《The Trip to Vega》（2026-06-19）；另 Seefeel《Sol.hz》確實存在（2026-05-01 Warp）。

#### 卡池：移除兩張、訂正一筆

- **808 State《Ninety》**（w2-113）：與《90》是同一張 1989 年唱片。封面印「808:90」、書背印「Ninety」，
  維基條目名與封面都用「90」，依短標慣例保留《90》。
- **Jeff Mills《Waveform Transmission, Volume 1》**（w2-116）：與《Waveform Transmission Vol. 1》是同一張 1993 年唱片。
- **年份訂正**：Jeff Mills《Metropolis Metropolis》2000 → 2023。
- 兩次移除都備份 seed_cards、以字串移除保留單行壓縮格式、逐筆確認只動到目標、卡單與 restyle-tasks 同步、KV 舊鍵刪除並確認 404。
  7,510 → 7,508。
- **待處理**：w2-128 的 `ice?|rhyme pays`（藝人字串含私有區字元 U+E45F，是 `Ice‐T｜Rhyme Pays` 的編碼損壞重複卡）。

#### 字元預算：四批實測後，可繼承的規則收斂成一條

嘻哈家族的上浮幅度兩度上調（15 → 30）之後，electronic 家族又推翻了「樂團卡／個人卡」的分類法
（w2-113 說個人卡高估、w2-114 說兩類齊低估）。四位寫作代理獨立驗證出更準的變數：
**這張卡會點到幾個拉丁專名**——多的那組手算會低估、少的那組方向不定且**風險常在下限**。
但 w2-114 與 w2-115 連幅度都對不上（+35 以上 vs 中位 +8），
**所以只有「方向」可繼承，任何數字都不行**。已把 `writer-base.md` 改成這個版本，並補上：
器材型號在字元計數上等同專名（`Roland TR-808` 13）、**最容易漏掉的是曲名**（〈Are We Here? (Criminal Justice Bill?)〉36）、
**hook 若指向超長專名要先留 50 字元**（w2-115 的 Groove Armada 那張，48 字元的專名佔掉整卡兩成）。
更根本的做法是動筆前就把專名壓下來——客座留 2 位、廠牌留 1 家、榜單留 1 個。

#### 其他寫進常設檔的規則

- `research-base.md`：**facts 欄只放事實、校對說明一律放 notes**。起因是 `merge-writer-input.mjs` 會把整個 facts 陣列
  帶進寫作層輸入檔，w2-112 有 19 條 facts 帶著校對括號（榜名沿革、標 uncertain、`【最高優先查證結果】`），
  主線得在合併前逐條清洗。**該規則寫入後，w2-114 五份研究稿的 facts 一次就全部乾淨。**
- `hook-base.md`：note 的寫法統一成正面表述（前一輪已改）；**hook 層也吃「星等與評分不進正文」那條**
  ——w2-112 有一張 hook 寫進了樂評分數，寫作層動不了 hook，只能由審稿層三層同步改掉。

#### 主要檔案

`desc-restyle/prompts/{writer,hook,research}-base.md`、`desc-restyle/ELECTRONIC_LEDGER.md`、
`.claude/skills/dip-desc-restyle/SKILL.md`（單曲卡常設裁定）、
`desc-restyle/batches/w2-11{3,4,5,6}-kv.json`、`desc-restyle/batches/output/w2-11{3,4,5,6}-out-{1,2}.json`、
`desc-restyle/progress.json`、`desc-restyle/restyle-tasks.json`、`dip-vinyl-shop/seed_cards.json`。
### 2026-08-09｜desc-restyle w2-110 至 w2-112 上線（142 張）；hiphop 家族完成；店主新裁定「一張卡只講一個主故事」

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 三批分別 49／50／43 張全部上線，`verify-kv.mjs` 逐批一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 112 批 / 5,601 張（88.4%）；hiphop 家族 w2-101–112 共 593 張至此全部完成。**

#### 店主新裁定：一張卡只講一個主故事

材料多的時候挑最重要的那一個講透，不要並列兩三段。已寫進 `writer-base.md` 的「## 內容」節開頭、
標明優先於該節其他條目。判準與配套：

- **判準**：讀完能不能用一句話說出「這張唱片發生了什麼事」。要用「而且」「另外」才接得下去的就是第二個故事。
- **砍掉之後字數不夠，不是把第二個故事加回來**，而是把主故事往下挖一層（起因、當事人怎麼說、造成了什麼結果）。
- 生平背景（出生地、家庭、遷徙、學歷）**只在直接推動主故事時才寫**——那是最常被誤當成「內容」塞進來的東西。
- 客座名單、製作人名單、曲目數**是佐料不是故事**，一張最多留一組。

w2-111 有 8 張依此退回重寫（Loyle Carner×2、Trippie Redd、Heize、Key Glock、Lucky Daye、Mick Jenkins、Smino），
砍掉的都是並列的第二條軸（公益計畫、選秀節目、生平遷徙、共組集體）。改後 8 張全部落在 180–240，其餘 42 張一字未動。

#### 榜名年代錯置：同一輪連中兩次，已找到系統性對策

w2-110 的 Queen Latifah《All Hail the Queen》（1989）與 w2-111 的 Masta Ace《Take a Look Around》（1990）
都寫成「Top R&B/Hip-Hop Albums」，但該榜 **1999 年 12 月**才改成這個名字（此前是 Top Black Albums、Top R&B Albums）。

**根因不是代理粗心——維基與二手資料一律用現行榜名回填舊年代**，研究層照抄、寫作層看不出來，只有審稿抓得到。
對策：自 w2-112 起在研究層派工詞加一條「逐項核對各榜當年的正式名稱並在 facts 裡寫出當年的名稱」，
該批五組合計攔下二十餘處，寫作層派工詞另加「照輸入檔寫、不得換成你熟悉的現行榜名」。
**這條要固定保留給所有 1999 年以前的批次。**

#### 研究稿的 facts 欄會原封不動進入寫作層輸入檔

`merge-writer-input.mjs` 會把整個 facts 陣列帶進 writer 輸入檔，所以寫進 facts 的任何一句話都可能被寫成正文。
w2-112 五份研究稿合計 **19 條** facts 帶著校對說明（榜名沿革括號、標 uncertain、`【最高優先查證結果】`、
「查無可靠來源證實⋯」、序數的括號註解），主線在合併前逐條清洗。
**已寫進 `research-base.md`：facts 只放事實、校對說明一律放 notes、否定敘述改寫成正面版本。**

#### 字元預算：嘻哈批次的上浮幅度兩度上調

w2-110 出現**同一批兩組方向相反**（writer-1 低估、writer-2 高估），首次觀察到批內分歧。
w2-111 起轉為單向低估，把兩格各上浮 15 字元；w2-112 照 15 上浮之後，
writer-1 的 22 張仍有 14 張初稿超標、**writer-2 的 21 張全部超標（255–304）**，實測低估接近一整格。
**已把 `writer-base.md` 的嘻哈上浮幅度改為 30。** 根因是專名不只多、而且個個偏長，加上廠牌雙掛與榜名全稱。

#### 卡池：移除三張

- **Nelly《Still Hot In Herre》**（w2-110）：2022 年 Republic 的 17 首精選，與 2005 年官方精選選曲高度重疊、
  查無獨特歷史定位，依常設裁定移除。
- **808 State《Ninety》**（w2-113 卡單）：與《90》是同一張 1989 年唱片。封面印「808:90」、書背印「Ninety」，
  維基條目名與封面都用「90」，依短標慣例保留《90》。
- 另 **w2-128 的 `ice?|rhyme pays`** 待移除：藝人字串含私有區字元 U+E45F，是 `Ice‐T｜Rhyme Pays` 的編碼損壞重複卡
  （同專輯、同年、同三軸，genres 欄卻是空陣列），Ice-T 那張已於 w2-105 上線。尚未寫稿、無 KV 鍵。
- 三次移除都備份 seed_cards、**以字串移除保留原檔單行壓縮格式**、逐筆確認只動到目標、卡單與 restyle-tasks 同步、
  KV 舊鍵刪除並確認 404。7,511 → 7,509。

#### 研究層推翻主線的重點（三批合計三十餘處）

- **《To the Death》與 DJ Premier 完全無關**（製作人是 DR Period），我派工詞問的是「Premier 製作了幾首」。
- **A$AP Rocky《Don't Be Dumb》已於 2026-01-16 發行**、**21 Savage《What Happened to the Streets?》已於 2025-12-12 發行**、
  **Ski Mask《11th Dimension》已於 2024-06-07 發行**——三張我都當成未上市。
- **Aesop Rock《Labor Days》從未登上 Billboard 任何榜**，二手資料把《Bazooka Tooth》的名次錯植在它身上。
- **Redman《Muddy Waters》的標題與藍調樂手無關**，講的是「上一張埋在土裡、這張從土裡浮上來」。
- **Masta Ace《MA_DOOM》的 MF DOOM 只授權既有節拍並客座一曲人聲、未參與製作**——這是最容易寫成「合作專輯」的一張。
- **Wire 改名 Wir 是鼓手 Robert Gotobed 離團**，不是常被誤傳的 Bruce Gilbert。
- **Warp Records 有三位創辦人**（第三位是製作人 Robert Gordon），且《Frequencies》是該廠第三張專輯、不是「第一批」。
- **「French touch」一詞是樂評人 Martin James 1996 年為《Super Discount》寫評論時創造的。**
- 《Nature of a Sista'》的「RIAA 金唱片」與「《Black Reign》是首張獲金認證的女性個人饒舌專輯」互相矛盾，移除較弱的一條。
- Doja Cat《Planet Her》研究稿寫「未查得得獎」，實際上〈Kiss Me More〉在第 64 屆拿下最佳流行團體演出
  ——**研究層說「未查得得獎」不等於沒得獎，審稿要自己再查一次。**

#### 敏感內容

Juice WRLD 四張（辭世後發行機制只釘一張、死因照官方法醫結果）、Injury Reserve 的成員辭世寫成「樂團形式的改變」、
Lil Peep 兩張、Ski Mask 與 XXXTentacion、Backxwash 三部曲的宗教與跨性別題材、Chris Brown 2009 年案件、
Gunna 的 YSL 案（發行早於起訴四個月，時序寫明）、Big L 與 Ol' Dirty Bastard 的辭世（**晚於作品且無綁定，一律不寫**）
——全部照三限制處理：要有來源、不逐字引歌詞、逝者克制。

#### 兩處我自己的操作失誤

1. **seed_cards 被寫成縮排格式**：移除卡片時用 `JSON.stringify(out, null, 2)` 重寫全檔，把單行壓縮檔展開成八萬多行。
   已從備份還原、改用字串移除。**往後一律用字串移除。**
2. **反引號陷阱再次重演**：用 `node -e "…"` 寫 progress.json 時，雙引號內的反引號被 bash 當成命令替換，
   把兩則備忘錄的內容整段吃掉**且不報錯**（只在 stderr 留下 command not found）。
   **凡內容含反引號，一律寫成 scratchpad 的 `.mjs` 檔再執行。**

#### 其他寫進常設檔的規則

- `hook-base.md`：note 的寫法統一成**正面表述**，把「缺數據處寫明禁補」「研究稿的禁語標示改寫」
  這兩條會反過來製造校對痕跡的舊措辭換掉，附三個對照例，標明優先於該節其他寫法。
- `HIPHOP_LEDGER.md` 三處訂正：T.I. 的「trap 命名史」已被舊批 w2-011《Trap Muzik》用掉（111 改寫出道作與被解約）；
  Aesop Rock×5 在 110 不在 111（兩支長壽地下線拆成 110＝Def Jux、111＝Rhymesayers）；Black Sheep 是 Native Tongues **正式成員**。
- **`ELECTRONIC_LEDGER.md` 新建**（w2-113–127，共 750 張，十六條源流的逐批位置）。本家族與 hiphop 家族最大的不同是**化名鏈**：
  字串比對只抓到 1 組跨批同藝人，但電子樂一人多名是常態——Larry Heard／Mr. Fingers／Fingers Inc.（113/124/128）、
  Juan Atkins／Model 500／Cybotron（114/124）、Richie Hawtin／Plastikman（114/124）、Vladislav Delay／Luomo（117/122）、
  Basic Channel／Rhythm & Sound（113/127）分別橫跨兩到三批，**掃描完全看不到**。帳本已列表要求派工前逐條反查，
  並裁定「化名本身只准三張當主結構」。另定六條高風險骨架，其中「Kraftwerk 的影響」整個家族一律不得當主結構。

#### 主要檔案

`desc-restyle/prompts/{writer,hook,research}-base.md`、`desc-restyle/HIPHOP_LEDGER.md`、
`desc-restyle/ELECTRONIC_LEDGER.md`（新建）、`desc-restyle/batches/w2-11{0,1,2}-kv.json`、
`desc-restyle/batches/output/w2-11{0,1,2}-out-{1,2}.json`、`desc-restyle/progress.json`、
`desc-restyle/restyle-tasks.json`、`dip-vinyl-shop/seed_cards.json`。
### 2026-08-09｜desc-restyle w2-107 至 w2-109 上線（148 張）；卡池移除兩張、訂正三筆

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 三批分別 49／49／50 張全部上線，`verify-kv.mjs` 逐批一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 109 批 / 5,459 張（86.1%）。**

#### 卡池：移除兩張、訂正三筆

- **重複卡（w2-107）**：Earl Sweatshirt 同一張唱片的長短標並存
  （`i don't like shit, i don't go outside` 與 `…: an album by earl sweatshirt`）。
  **保留短標**——副標與藝人欄完全重複，且合卡池短標慣例（比照 aespa《LEMONADE》前例）。
- **非官方彙編（w2-108）**：XXXTENTACION《/r/XXXTENTACION Presents: Xxxtra Rare Tracks, Volume One》——
  經 DatPiff 上架、源自同名 Reddit 版彙整、YouTube 版標「Unofficial」、官方作品列表未收錄，
  判定為無歷史定位的粉絲雜牌彙編，依常設裁定移除。
- 兩張都已備份 seed_cards、逐筆確認只動到目標（7,513 → 7,511）、卡單與 restyle-tasks 同步、KV 鍵刪除並確認 404。
- **年份三筆**：Brand Nubian《In God We Trust》1992 → 1993、Crush《Crush on You》2013 → 2014
  （2013 是先行單曲）、另 w2-108 的 Destiny's Child 已於前一輪處理。

#### 研究層推翻主線 32 處，三類最值得記

**一、作品性質整個判錯（8 處）**：`earl sweatshirt|pompeii // utility` 不是個人專輯而是三方合作雙專輯、
他只做 UTILITY 那一半；Skepta《Insomnia》是與 Chip、Young Adz 的三人合作；《Microphone Champion》是第二張；
Pete Rock《Petestrumentals》**不是**純器樂（真正的純器樂是十四年後的續作，兩張分軸對調）；
Gucci Mane《The State vs. Radric Davis II》官方定位是 commercial mixtape；
Big K.R.I.T. 的《K.R.I.T. Wuz Here》與《Return of 4eva》都是免費混音帶；Busdriver《Thumbs》亦然。

**二、廠牌歸屬查錯（5 處）**：Fool's Gold 不是搖滾起家、Danny Brown《Old》不是大廠出道作；
Roc Marciano《Reloaded》仍是 Decon 發行、還不是自營；clipping.《CLPPNG》是他們在 Sub Pop 的**第一張**（不是第二張）；
**Amoeba Culture 2006 年 9 月才創立**——Dynamic Duo《Taxi Driver》（2004）當時掛 EMI Music Korea、
Beenzino《12》掛 Illionaire Records，兩張都與該廠牌無關，**直接推翻我對 w2-109 韓國卡的整個框架**。

**三、把當事人沒說過的話寫成事實（2 處）**：Usher **本人否認**《Raymond v Raymond》直接寫離婚，
來源支持的只是「被解讀為與離婚相關」；Q-Tip 在 Mobb Deep《The Infamous》**並未掛執行製作**
（他做的是製作與混音），可查證的說法是他上一次掛此頭銜為 2014 年。

#### 敏感內容的處理（這三批特別多）

- **Ka（w2-107，六張）**：2024-10-12 辭世、享年 52、死因未公開。六張都不寫成遺作；
  《The Thief Next to Jesus》2024-08-19 發行、**早於辭世約兩個月，是他生前完成並發行的最後一張**，
  提及辭世須標先後；死因只寫「未對外公開」、不補寫。
- **Nicki Minaj《The Pinkprint》**：研究稿裡的具體私人經歷（喪親自責、墮胎）**只有單一來源**。
  「題材無禁區」的前提是要有來源，這種程度的私人事實單一來源不足——**只寫「轉向自傳式書寫」的定性敘述**。
- **XXXTentacion《17》**：辭世與生前刑事指控與該作無直接綁定，**一律不寫**；只有《Bad Vibes Forever》寫辭世後發行。
- **Noname《Sundial》**：客座 verse 引發的反猶爭議，寫成她**拒絕為不是自己寫的 verse 道歉**、
  並說明她反對的是白人至上主義體制——這是當事人的實際立場，寫反就是扭曲。
- **Bun B 兩張**：都收了 Pimp C 生前錄音、辭世後才發行的曲目，《Trill O.G.》還同時有 2Pac 的生前錄音，
  **時序必須標明，否則讀起來像死後合成**。
- G-DRAGON 的抄襲爭議、Brand Nubian 的歌詞爭議、E SENS 與前東家的糾紛、Gucci Mane 的司法紀錄
  ——一律中性陳述、不評斷，查不到最終結果就明講。

#### 人工審稿（三批合計修 14 處）

- **「廠牌史上第一張」第六與第七次**：Ice-T《Rhyme Pays》寫「Sire 與華納旗下第一張嘻哈專輯」——查無來源。
  真正有記載的是「第一張加註 Parental Advisory 警語的嘻哈專輯」，而那條研究層已自行降級成「常被列為之一」。
  **等於寫作層把一個已降級的宣稱，改頭換面成另一個沒查證的宣稱。**
  對照組：Ab-Soul《Control System》的「TDE 史上第一張 iTunes 冠軍」查證**成立**——這是該句型第一次通過查核。
- **校對痕跡第四型第四、五次**：billy woods《GOLLIWOG》寫「並無他本人的說法可循」、
  Mos Def《True Magic》寫「但查無他本人的直接說法」——都是把研究限制講給讀者聽。
- **hook 本身寫錯事實**：Big K.R.I.T.《Return of 4eva》的 hook 寫「還沒簽進大廠的新人」，
  但簽約在本作之前（前一卷混音帶換來的）。改成「簽了大廠卻還沒發正規專輯」，三層同步。
- **序數與地名錯誤**：Pretty Ricky《Late Night Special》是第二張不是第三張（hook 的「三張唱片裡」也不成立）；
  MC Lyte《Eyes on This》封面地點寫成 2010 年才成立的布魯克林大橋公園。
- **研究稿內部矛盾**：G-DRAGON《Übermensch》並列「Circle 五日 62.4 萬」與「Hanteo 首日 63.9 萬」，
  並排讀起來像首日超過五日，只留一個。
- 另有中文片名錯（GZA 那張是《笑俠楚留香》不是《新流星蝴蝶劍》）、用字錯（采樣 → 採樣）、
  hook 懸念未收尾（Field Mob《613》立了「鬥出一紙 MCA 合約」卻沒交代經過）等。

#### 三條寫進常設檔的規則

1. **派工措辭範式**（`writer-base.md`）：反同構條款一律寫
   **「某某骨架在本批只准 N 張、指定給某某卡」**，**不要寫「某某已在別批寫過所以不准寫」**——
   後者與已取消的題材配額難以分辨，w2-101 與 w2-108 的寫作代理各回報過一次衝突（兩次判斷都正確，
   但每次都得花一輪釐清）。要排除舊卡角度就具體寫出那張舊卡的切入點。
2. **帳本的廠牌歸屬只是規劃時的粗略印象**（`HIPHOP_LEDGER.md`）：派工前要讓研究層反查廠牌成立年，
   別把整組卡掛在一個沒查過的廠牌上。109 那列的「韓國獨立與 Amoeba Culture」就是這樣寫錯的。
3. **代理回報「已寫檔」不等於檔案存在**（前一輪已記）：w2-106 的 hook 代理回報三檔都寫了，
   實際缺一檔；`qa-batch.mjs hooks` 的缺檔檢查擋下了那次，**合併前一律要跑**。

#### 字元預算偏差方向（七批實測）

w2-103 低估 13 → w2-104 高估 20–30 → w2-105 略高估 → w2-106 低估 5–20 → w2-107 低估 20–30 →
w2-108 單向超標 → w2-109 雙向都有。**方向完全隨批次內容擺盪，係數不可沿用**；
這一輪三批合計只有 Kelela《Raven》一張差 1 字掉出下限、且在寫作層當場補回，
證明「驗區間而非只防超標」那條有效。

#### 主要檔案

`desc-restyle/HIPHOP_LEDGER.md`、`desc-restyle/prompts/writer-base.md`、
`desc-restyle/batches/w2-10{7,8,9}-kv.json`、`desc-restyle/batches/output/w2-10{7,8,9}-out-{1,2}.json`、
`desc-restyle/progress.json`、`desc-restyle/restyle-tasks.json`、`dip-vinyl-shop/seed_cards.json`。

### 2026-08-09｜desc-restyle w2-104 至 w2-106 上線（150 張）；卡池標題訂正兩筆

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 三批各 50 張全部上線，`verify-kv.mjs` 各 50/50 一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 106 批 / 5,311 張（83.8%）。**

#### 店主兩項裁示

1. **標題贅字直接改、不用問。** 已執行兩例：
   - `mary see the future|cheers` → 官方標題是《Cheer》（沒有 s）。卡池欄位、8 個 desc-restyle 檔與 `restyle-tasks.json` 同步；
     KV 寫入新鍵後刪舊鍵，舊鍵確認 404、w2-099 全批 50/50 仍一致。正文原就未印出專輯標題，內容一字未改。
   - `busta rhymes|extinction level event 2 the wrath of god (the leak)` → 《Extinction Level Event 2: The Wrath of God》。
     「(The Leak)」是串流平台為外流版另編目錄造成的贅綴、非正式標題；卡池無重複卡。新鍵隨 w2-105 上線、舊鍵已刪並確認 404。
2. **Binary Star 兩張都保留**（《Waterworld》與《Masters of the Universe》是同一批素材的原始自製版與換名重發版），正文各寫一端。

#### 帳本錯誤：跨批同藝人漏抓一組

先前寫進 `HIPHOP_LEDGER.md` 的「101–112 跨批同藝人 0 組」**是錯的**。
`ice-t`（w2-101，ASCII 連字號）與 `ice‐t`（w2-105，**U+2010 連字號**）是同一位藝人、兩種 key 拼法，純字串比對看成了兩個人。
以 NFKC 正規化並統一連字號與引號後重掃，**只有 Ice-T 這一組**，帳本其餘部分無誤。
已把修正、教訓與一張「含非 ASCII 字元的藝人字串」對照表寫進帳本
（`mýa`／`suprême ntm`／`destiny’s child` 彎引號／`ice‐t` 與 `g‐dragon` 的 U+2010／`dälek`），
並要求各批的 key 一律從卡單檔逐字複製、不可自行打字。

#### 「廠牌史上第一張」累計到第六次

w2-097、100 之後，w2-101 一批抓到三處，w2-105 再抓到一處：

| 卡 | 查證結果 |
| --- | --- |
| Ice-T《Rhyme Pays》 | 正文寫「Sire 與華納旗下第一張嘻哈專輯」——**查無來源**。真正有記載的是「第一張加註 Parental Advisory 警語的嘻哈專輯」，而那條研究層已自行降級成「常被列為之一」（Too $hort 1985 年已有類似警語）。**等於寫作層把一個已降級的宣稱，改頭換面成另一個沒查證的宣稱**，整條捨去 |

**這是同一類錯誤第六次出現，而且防線已經拉到研究層。下一步應考慮在機器 QA 加一條「廠牌＋第一張／首發」的樣式掃描。**

#### 研究層推翻主線的三次連鎖錯置（w2-106，Big Daddy Kane 七張）

我把三件事全排錯了，而且環環相扣：
《Taste of Chocolate》**查無拳擊人物客座**（真正的資深靈魂樂客座是 Barry White）；
**《Looks Like a Job For…》才是 Cold Chillin' 的最後一張**（不是《Daddy's Home》）；
「日後大咖客座」屬於**《Daddy's Home》**——當時沒沒無聞的 **Jay-Z** 在 DJ Premier 製作的〈Show & Prove〉裡。
等於這位藝人七張的分軸有將近一半要重排。**特注寫成問句而非肯定句的價值就在這裡。**

其他重要推翻：〈Dance with the Devil〉收在《Revolutionary Vol. 1》不在 Vol. 2；
〈Alphabet Aerobics〉不在《Blazing Arrow》（在 1999 年的 EP《A2G》）；
`timbaland|indecent proposal` 實為 Timbaland & Magoo 雙人組第二張；
`geto boys|making trouble` 發行時團名拼作 **Ghetto Boys**；
Ja Rule《Pain Is Love 2》發行時**人在獄中**；UGK《Dirty Money》的 Pimp C 入獄是**發行之後兩個月**；
DJ Krush 兩張 1994 年作品是**完全獨立的兩張**；Paul Wall《Chick Magnet》是**個人首張正規專輯**；
AI **不是在美國長大**、〈Story〉屬下一張；Pretty Ricky **不是兩對兄弟**；Lloyd《Street Love》客座是 **Lil Wayne**。

#### 人工審稿（三批合計修 16 處）

- **校對痕跡第四型再現**：Mos Def《True Magic》寫「但查無他本人的直接說法」——把研究限制講給讀者聽（w2-099、100 同型）。
- **hook 懸念沒收尾兩處**：Heavy D《Big Tyme》承諾白金卻只寫到金唱片（根因是我禁寫白金認證日期，寫作層連白金本身一起省了）；
  Field Mob《613》立了「鬥出一紙 MCA 合約」卻沒交代經過。
- **序數錯誤**：Pretty Ricky《Late Night Special》是第二張不是第三張，hook 的「三張唱片裡」也不成立。
- **中文片名錯**：GZA《Legend of the Liquid Sword》寫成《新流星蝴蝶劍》，實為《笑俠楚留香》（1993，王晶自編自導、郭富城飾楚留香）。
- **廠牌錯置**：DJ Krush《Cosmic Yard》的 Gamma Proforma 只是歐洲授權方，主廠牌是日本 Es.U.Es Corporation。
- **來源衝突不寫**：Marques Houston 的《Sister, Sister》參演季數（四季與五季兩說）。
- 另有音樂人名中文音譯（惠妮休斯頓 → Whitney Houston，機器 QA 沒抓到）、Mo'Wax 拼法批內不一致、
  代名詞所指不明、hook 與正文邏輯打架（Oh No 的「全數三國」vs 正文四國）等。

#### 卡池訂正

年份四筆：Mobb Deep《Amerikaz Nightmare》2003 → 2004、J Dilla《The Diary》2015 → 2016、
Destiny's Child 同名出道作 1997 → 1998（另 w2-101 已改三筆）。標題兩筆見上。

#### 兩條寫進 base 檔的常設規則

1. **字元預算的偏差是雙向的**（`writer-base.md`）。四批實測：w2-103 低估約 13、w2-104 高估 20–30、
   w2-105 略高估 5–15、w2-106 又低估 5–20。**方向隨批次內容擺盪，不可沿用上一批的修正係數**；
   預算表要驗的是「落在 180–240 區間內」，估值低於 200 就先想好補哪一格。
   w2-105 的 writer-2 回報這條在三張卡上實際生效、沒掉出下限。
2. **代理回報「已寫檔」不等於檔案存在**。w2-106 的 hook 代理回報三檔都寫了，
   但 `w2-106-hooks-c.json` 實際不存在（該檔 mtime 晚於主線去信時間）。
   `qa-batch.mjs hooks` 的缺檔檢查擋下了這次——**合併前一律要跑**。

#### 主要檔案

`desc-restyle/HIPHOP_LEDGER.md`、`desc-restyle/prompts/writer-base.md`、
`desc-restyle/batches/w2-10{4,5,6}-kv.json`、`desc-restyle/batches/output/w2-10{4,5,6}-out-{1,2}.json`、
`desc-restyle/progress.json`、`desc-restyle/restyle-tasks.json`、`dip-vinyl-shop/seed_cards.json`。

### 2026-08-09｜desc-restyle w2-103 上線；字元預算硬程序首次實測成功

- Repo：`dip-vinyl-shop`（本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 50 張全部上線，`verify-kv.mjs` 50/50 一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 103 批 / 5,111 張（80.6%）。**

#### 字元預算硬程序：一次就解決了反覆四批的老問題

w2-102 的 writer-1 是 25 張裡 24 張超標、最高 363 字、兩輪重寫（w2-057、072、099 之後第四次）。
把 `writer-base.md` 的「動筆前先想好」改成**五格字元預算表的硬程序**之後，
**w2-103 兩組合計 50 張零超標、零回頭刪節。**

有效的關鍵在兩組的回報裡講得很清楚：**砍內容發生在動筆之前，不是寫完之後。**
writer-2 有 8 張在預算表階段就算出會爆（估 236–257 字），先砍專名格才寫第一個字；
writer-1 有 5 張同樣如此（`steal this album` 預算階段點名到 8 個拉丁專名，先用「前東家」「那本書」替換）。

**已補進 base 檔的安全邊際**：法語一類專名的空格與變音符號會讓手算低估約 13 字元
（`Qui sème le vent récolte le tempo` 吃 33 字元），單張含兩個以上 20 字元級專名時預算表上浮 10 字元。

#### 研究層推翻主線 11 處，兩處影響卡片本身

- **`timbaland|indecent proposal` 掛名錯了**——這其實是 **Timbaland & Magoo 雙人組的第二張**，
  而卡池另有 `timbaland & magoo|welcome to our world` 是同一組合的第一張。
  依 w2-098（Preoccupations／Viet Cong）的前例**掛名維持不動**，正文據實寫成雙人組第二張；
  兩張的分軸因此改成：第一張寫「製作人跳到麥克風前」與相識，第二張只寫自己那張的事。
- **`geto boys|making trouble` 發行時團名拼作 Ghetto Boys**，陣容也還是換血前的四人。
  同樣掛名不動、正文寫出當年拼法。

其餘九處：Sensational 的 WordSound 是布魯克林本地廠牌（不是日／歐廠牌）；RHYMESTER《EGOTOPIA》
日語來源一致定位為**第二張**（英語資料常誤作首張全長）；MC Solaar《Prose Combat》**沒有美國製作人參與**；
Monica 發《Miss Thang》時**是 14 歲**（自動摘要工具算成 15）；Toni Braxton《Libra》的「健康影響宣傳」
**查無實據**；Willie D 離隊是**主動暫離、不是入獄**；Rick Rubin 1990 年的《The Geto Boys》與 1989 年的
《Grip It!》**是兩張不同專輯**；《We Can't Be Stopped》取樣來源訂正為 Isaac Hayes 與 Graham Central Station；
我派工詞裡的〈Fat Cats, Bigger Fish〉正確拼法是 **Bigga**。

#### 人工審稿修 5 處

| 卡 | 修了什麼 |
| --- | --- |
| BDP《Ghetto Music》 | **榜名錯置**——〈Why Is That?〉查證**沒有進過 Hot 100**，第 48 名是當年的 Hot Black Singles。與「1958 年前不得寫 Hot 100」同一類錯誤，研究稿寫錯、正文照抄 |
| IAM《L'École du micro d'argent》 | 研究稿只寫「部分錄於紐約、Nick Sansano 參與」，**漏掉更重要的事**：紐約版樂團不滿意，後來改請 Prince Charles Alexander 在巴黎花 24 天重錄了約八成。另「發行 24 小時內認證金唱片」精確化為「發行當天」 |
| IAM《Ombre est lumière》 | 銷量「突破 50 萬張」與法語來源的 45 萬餘張不符，依法語來源為準改寫（「法語饒舌史上第一張雙專輯」則查證成立） |
| Monica《Miss Thang》 | **音樂人名寫成中文音譯**（惠妮休斯頓 → Whitney Houston）。機器 QA 沒抓到，是靠人工掃描補的 |
| Monica《Code Red》 | 研究稿把 2011 年的併購方向寫反（RCA 併入 J Records），改為 J Records 併入 RCA |

#### 待店主裁示

**Binary Star《Waterworld》（1999，自製自銷 1000 張）與已上線的《Masters of the Universe》（w2-039）
是同一批素材**——後者是整批重新混音改編的換名重發，銷量約 20 倍。
主線傾向**兩張都保留**（前者是原始自製版、有自己的歷史身分），正文各寫一端：
本批寫自製自銷與 500 美元成本，舊卡寫的是獄中寫詞。**已依此寫成上線，若要砍再處理。**

#### 主要檔案

`desc-restyle/prompts/writer-base.md`、`desc-restyle/batches/w2-103-kv.json`、
`desc-restyle/batches/output/w2-103-out-{1,2}.json`、`desc-restyle/batches/research/w2-103-{a,c}.json`、
`desc-restyle/progress.json`。

### 2026-08-09｜hiphop 家族開跑（w2-101、w2-102 上線）；家族通論帳本一次規劃完畢

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 兩批各 50 張全部上線，`verify-kv.mjs` 各 50/50 一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 102 批 / 5,061 張（79.8%）。**

#### 店主裁定：12 批連號不一起跑，維持 3 批一段

店主問 hiphop 家族的 12 批（w2-101–112）是否該一起接力。**裁定：不要。**
接力省的是代理等待時間、不省流量；主線真正的成本是逐張審稿的全文（約 1.2 萬字／批），
一次掛 12 批只會讓那些字反覆重送。更關鍵的是**跨批更正的回饋窗口會拉到八、九批之後**——
像本輪抓到的「廠牌史上第一張」系統性錯誤，前幾批就只能事後回頭改稿。

**但 12 批連號真正要求一次做完的是通論帳本**，那是規劃成本、只付一次，也正好是提升品質的那一半。
因此新增 `desc-restyle/HIPHOP_LEDGER.md`（593 張、十條主源流的位置分派表），
**每批開工只讀該檔對應列，不必重掃 12 批卡單**。實掃確認 101–112 跨批同藝人 0 組。
帳本裡已寫死的跨批分軸：Scarface 六張（101）寫人／Geto Boys 六張（103）寫團；
Bun B（109）不重述 UGK（104）；KRS-One（108）不重述 BDP（103）。
另統一譯名：**曼菲斯**（全池 19 比 0，不寫孟斐斯）。

#### 「廠牌史上第一張」在一批裡出現三次（w2-101）

w2-097（Ulcerate／Debemur Morti）、w2-100（Mercyful Fate／Roadrunner）之後，w2-101 又抓到三處：

| 卡 | 查證結果 |
| --- | --- |
| 8Ball & MJG《Comin' Out Hard》 | 寫成 Suave House 的第一張作品。廠牌 1990 年創立、早三年，維基查不到首發是哪張 → 退成「廠牌簽下的第一組藝人交出的出道作」 |
| 8Ball & MJG《Living Legends》 | 寫成 Bad Boy South 的第一張作品。**該廠牌自己的維基目錄最早列的是 2005 年的 Boyz n da Hood**，與此矛盾 → 整條捨去 |
| Three 6 Mafia《Mystic Stylez》 | hook 寫「自家廠牌交出的第一張恐怖說唱」，但該廠牌先前已發過多張 EP → hook 改寫為「出道專輯」，三層同步 |

**w2-100 後補進 `research-base.md` 的規則在研究層確實生效了**（w2-101 的 c 組主動反查 Stones Throw
沿革、退掉 Lootpack 那張的首發宣稱），**但寫作層仍會從研究稿的模糊措辭裡長出這種宣稱**。
防線需要再往後拉一層。

#### 人物歸屬整個錯掉（w2-102）

研究層把 **Brandon Mitchell 寫成 Guy 的創團成員**、說樂團因他遇害而解散。
查證：他是 **Wreckx-n-Effect** 1987 年的創團成員（與 Aqil Davidson、Markell Riley 組團），
1990 年 8 月 8 日在曼哈頓遭槍殺，**與 Guy 無關**；Guy 的創團三人是 Teddy Riley、Aaron Hall、Timmy Gatling。
我還為此設了「跨卡分軸」要兩張各寫一端——**分軸的前提本身是假的**。
Guy 那張改寫成員更迭與解散時序，Mitchell 只留在 Wreckx-n-Effect 那張（團名改拼法紀念他是正確的）。

#### 其餘人工審稿（w2-101 修 11 處、w2-102 修 5 處）

- **校對痕跡第二型**：《On the Outside Looking In》寫「是完整的錄音室作品**而非精選或重發**」，否定讀者沒有的前提。
- **hook 懸念沒收尾**：Lords of the Underground 出道作立了「朋友一句引介」卻沒交代。
- **時代錯置的地名**：MC Lyte《Eyes on This》封面地點寫成「布魯克林大橋公園」——該公園 2010 年才成立。
- **同批撞措辭**：Juvenile《Solja Rags》與 Master P 首張都寫「沒有大廠鋪貨仍賣掉逾 20 萬張」，前者改寫。
- **無來源的曲風級評斷**：Scarface《The World Is Yours》寫「南方黑幫饒舌在他手上進入成熟期」，換成查證過的單曲事實。
- 另有 Keepers of the Funk 把發行日誤掛成錄音時間、Westside Connection 把 Mack 10 首作寫成 9 月（實為 6 月 20 日）、
  DJ Cam 廠牌創立年的臆測、Cee-Lo 譯名批內不一致等。
- **Kool G Rap《Live and Let Die》與《4, 5, 6》串成一條線**：前者被 Warner 拒絕經銷導致 Cold Chillin' 合約終止，
  後者確為該廠牌關門前的最後一張。

#### 兩件寫進 base 檔的常設規則

1. **「配額」與「反同構條款」是兩件事**（`writer-base.md`）。w2-101 的 writer-2 主動回報派工詞的
   「廠牌骨架只准兩張」與 base 檔已取消的廠牌配額字面牴觸——**它的回報是對的一半**：
   取消的是題材配額，我下的是故事骨架反同構。判準已寫入：**照辦之後若仍寫得出該廠牌與這張唱片的
   具體關係，就是反同構條款、照辦；若照辦等於整條事實不能寫，才是寫錯的配額。**
2. **字數紀律改成硬程序**（`writer-base.md`）。「動筆前先想好」這句提醒已失效四次
   （w2-057、072、099，w2-102 是 25 張裡 24 張超標、最高 363 字，而且派工詞事前警告過）。
   改成可執行步驟：**動筆前先列五格字元預算表（hook 實數＋懸念收尾 40–60＋發行事實 30–45＋
   主故事後續 50–70＋成績或聲音 30–45），先算總和 ≤240 再下筆**；並標明一個拉丁專名平均吃 12–18 字元。

#### 寫作層第一次反過來抓 hook 層

w2-101 的 writer-2 指出《The Last of a Dying Breed》的 hook 寫了「樂評分數反倒是這段時期最高的」——
分數式評價本來就在禁列，且拿不到可具名出處。已改成「樂評反應反倒是這段時期最好的」，三層同步。

#### 卡池訂正

- **年份三筆**：The Velvet Underground《Squeeze》1972 → 1973（1972 年秋錄音、1973 年 2 月 Polydor 發行）、
  Slum Village《Fantastic, Vol. 2》1998 → 2000（1998 錄完，原簽廠牌倒閉延宕）、
  Three 6 Mafia《The End》1997 → 1996（正式發行 1996-12-03）。
- **掛名維持不動但正文據實寫**：Three 6 Mafia《Smoked Out, Loced Out》確認是混音帶而非錄音室專輯
  （屬有歷史定位的早期地下作，保留）。

#### 主要檔案

`desc-restyle/HIPHOP_LEDGER.md`（新增）、`desc-restyle/prompts/writer-base.md`、
`desc-restyle/batches/w2-101-kv.json`、`w2-102-kv.json`、
`desc-restyle/batches/output/w2-10{1,2}-out-{1,2}.json`、`desc-restyle/progress.json`、
`dip-vinyl-shop/seed_cards.json`。

### 2026-08-08｜desc-restyle w2-100 上線；wave2 過 100 批

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 50 張全部上線，`verify-kv.mjs` 50/50 一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 100 批 / 4,961 張（78.2%）。**

#### 又一次「廠牌史上第一張」的假事實（與 w2-097 的 Ulcerate 同型）

Mercyful Fate《Melissa》的 hook 前提是「Roadrunner 開廠的第一張唱片」，
研究稿引 Wikipedia 條目的原句（英文維基 Melissa 與 Fandom 鏡站都這樣寫）。
**但 Roadrunner 1980 年成立時是授權代理商**，1981 至 1982 年間已經替 Patricia Ruddock、
Liaisons Dangereuses 等非金屬藝人發過唱片，1983 年的《Melissa》不可能是廠牌首發。
**維基百科這句話本身是錯的**，整張因此重寫：hook 改走頭骨上祭壇、
1984 年 1 月在阿姆斯特丹 Paradiso 被歌迷偷走那條線，廠牌事實降為「樂團在該廠牌的第一張」。

**這是「某廠牌史上第一張」第二次在同一輪被抓到**（w2-097 是 Ulcerate 與 Debemur Morti）。
教訓：**這類宣稱一律要反查廠牌自己的成立年與早期目錄，不能只憑作品條目的單句。**

#### 人工審稿修 10 處

| 卡 | 修了什麼 |
| --- | --- |
| Mercyful Fate《Melissa》 | 見上，整張重寫（hook 前提不成立） |
| Area《Arbeit macht frei》 | **Demetrio Stratos 不是「生於希臘」**——1945 年生於埃及亞歷山卓的希臘裔家庭、1962 年 17 歲移居米蘭。研究稿引的 progarchives 寫錯 |
| Sonic Youth《Experimental Jet Set》 | **榜單比較整句錯**。研究稿寫「Billboard 34 名與英國 10 名皆低於前作《Dirty》」，但《Dirty》在美國只到第 83 名——本作其實是他們當時在美最高名次，只有英國榜低於前作 |
| Braid《Frame & Canvas》 | **Chris Broach 是吉他手兼主唱，不是貝斯手**（貝斯是 Todd Bell）。研究稿寫錯 |
| Angélique Kidjo《Ayé》 | 兩處：倫敦錄音室名「Soul to Soul」查不到可靠來源（Discogs 之外無旁證），改成只寫倫敦並補上「十首歌對半拆」的實際分工；Jean Hébrail 那句「確切署名分工沒有明確記載」是**校對痕跡第四型**（把研究限制講給讀者聽），改成正面陳述兩人 1991 至 1998 年合作五張 |
| This Mortal Coil《Filigree & Shadow》 | 「25 首裡 13 首器樂曲」與「翻唱略多於原創」**同段自相矛盾**（器樂 13 首已過半，翻唱不可能多於原創總數），改成「有人聲的部分多半是翻唱」 |
| This Mortal Coil《Blood》 | hook 把 Tanya Donelly 寫成「Throwing Muses 的主唱」，她是吉他手兼合唱，主唱是 Kristin Hersh |
| King Diamond《Abigail》 | hook 用了直接引語『18 將變 9』，依規則轉間接敘述 |
| ANARCHY《Rob the World》 | 把研究稿的「**他自己**的饒舌敘事起點」放大成「**日本硬派街頭饒舌**的敘事起點」，是無來源的曲風級最高級，改回他個人 |
| Bolt Thrower《Those Once Loyal》 | 正文「是生涯最好的名次」重述了 hook 已說過的話 |

另統一批內譯名：明尼亞波利斯（全池 32 對 17 的多數式，Kidjo 那張原寫明尼阿波利斯）。

#### 寫作層自己擋下的三件事

兩組都主動整條捨去「拿不到可具名出處的榜單」：ANARCHY《Rob the World》的兩本雜誌年度專輯選入、
Laurel Halo 與 Lapalux 的 Metacritic 與樂評人具名、The Walkmen 的年度單曲名次、
Liars 的字母評分、Marillion《Fugazi》的樂評出處（金唱片與英國榜名次照寫）。
兩組也都回報「本批禁令都是舊卡角度的反同構條款、未出現已作廢的源流全禁令」——
base 檔那條授權連續四批都有實效。

**字數紀律恢復**：w2-099 的 writer-2 有 21 張初稿超標，本批派工時明寫「拉丁專名密度高，
動筆前先把陣容壓到主故事需要的那幾位」，兩組成稿 204–240、零張回頭刪。

#### 主要檔案

`desc-restyle/batches/w2-100-kv.json`、`desc-restyle/batches/output/w2-100-out-{1,2}.json`、
`desc-restyle/batches/research/w2-100-{d,e}.json`、`desc-restyle/progress.json`、
`dip-vinyl-shop/seed_cards.json` 的 Stratovarius《Twilight Time》年份 1991 → 1992
（該筆在本批派工前就改好，已隨 w2-099 的提交入庫，本次提交只含備忘錄）。

### 2026-08-08｜desc-restyle w2-099 上線；新源流做法的第三批實跑

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 50 張全部上線，`verify-kv.mjs` 50/50 一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 99 批 / 4,911 張（77.4%）。**

#### 源流位置分派（新做法的第三批）

| 源流 | 各卡的位置 |
| --- | --- |
| 後龐克 | Iceage《You're Nothing》＝把它拉回粗糲的原型；PiL 兩張＝1978 年把 dub 與舞曲拉進後龐克／重組後靠自資與自有廠牌守住自主；Protomartyr 兩張＝底特律支線的兩個切點（Domino 與假訊息年代／37 歲才組團與自由爵士客座） |
| skate punk | NOFX 兩張＝Epitaph 與雙封面爭議／Fat Wreck 與收山時序 |
| metalcore 與前衛金屬 | BTBAM 兩張＝2000 年代初 metalcore 成形期／把《Colors》的組曲式推到更極端 |
| pop-punk 與 emo | The Menzingers 兩張＝把自白腔裝回直球編制／把速度換成空隙 |
| hyperpop | 100 gecs《10,000 gecs》＝從網路社群長出來的東西進入主流廠牌體系（與舊卡《1000 gecs》面向不同） |
| stoner／sludge | High on Fire 兩張＝Lemmy 致敬與葛萊美／Sleep 血脈交到新一代鼓手手上 |
| 自主製作定位 | SEVENTEEN 三張各一個面向 |

#### 研究層推翻主線八處

Iceage《You're Nothing》是**第二張**不是第三張；新作《For Love of Grace…》在 **Mexican Summer**、是他們
**首次離開 Matador**（這本身成了那張的角度）；Melanie Martinez 在《The Voice》是**前六強被淘汰、不是第三名**；
Dua Lipa《Radical Optimism》在 2025 年葛萊美是**零入圍**（不是入圍未得獎）；Sondre Lerche 真正的
「離婚專輯」是 2014 年的《Please》**不是《Patience》**；Rina Sawayama《Hold the Girl》**查無水星獎紀錄**；
Descendents《9th & Walnut》的器樂是 **2002 年**錄的、不是 1977–79 的檔案母帶；PiL《What the World Needs Now…》
是**自籌資金、不是群眾募資**。

另外 High on Fire《Electric Messiah》在第 61 屆葛萊美是**得獎**（生涯首次入圍即得獎），
《Cometh the Storm》換的是**鼓手不是貝斯手**。

#### 人工審稿修 4 處

- **Sigrid 那張 thin 卡把研究限制講給讀者聽了**（「目前都還沒有可靠的公開資料」），
  屬校對痕跡第四型，改寫成只陳述查得到的事實並補上與前作的間隔。
- **Protomartyr《Ultimate Success Today》內部自相矛盾**：同一段同時給了 Joe Casey 的生日（1977 年 1 月）
  與「37 歲才組第一支樂團」，兩者算起來對不上。他本人受訪說的就是「37 歲」，
  因此保留他自己的說法、拿掉生日，矛盾即消失。
- **SEVENTEEN《An Ode》的 hook 指名了「唱片大賞」**，但研究稿把同一項同時寫成本賞與 Daesang、
  措辭自相矛盾；依「來源衝突就不寫」改成不指名層級。（**寫作層主動回報了這條派工詞內部衝突。**）
- 一個異體字（卧室 → 臥室）。

#### 卡池

`mary see the future|cheers` 補上年份 **2010**（2010 年 4 月發行，部分數位平台誤標 2007）。
**另有一件待店主裁示**：官方標題查證為《Cheer》（沒有 s），卡池標的《Cheers》多了一個字母。
改動會連 KV 的 key 一起變、可能影響封面查找，因此**未動 key**；正文已指示不印出專輯標題、以「這張」指稱。

#### 主要檔案

`desc-restyle/batches/w2-099-kv.json`、`desc-restyle/batches/output/w2-099-out-{1,2}.json`、
`desc-restyle/progress.json`、`dip-vinyl-shop/seed_cards.json`。

### 2026-08-08｜desc-restyle w2-098 上線；本輪首次人工審稿零修正

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 50 張全部上線，`verify-kv.mjs` 50/50 一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 98 批 / 4,861 張（76.6%）。**
- **人工審稿零修正**——機器 QA 零標記、校對痕跡掃描零命中、逐 key 更正全部落實。這是這一輪
  （w2-091 起）第一次逐張讀完 50 張沒有要改的。歸因於兩件事：base 檔補上的規則衝突授權，
  以及研究層更正在派工詞裡逐 key 寫得更細。

#### 卡池年份更正兩筆

- **`preoccupations|viet cong` 2023 → 2015。** 該作實為 2015 年 1 月 20 日由 Flemish Eye 與
  Jagjaguwar 發行，**發行時掛的團名就是 Viet Cong**，樂團 2016 年 4 月才因團名爭議改名 Preoccupations。
  **掛名維持 Preoccupations 未動**——改藝人字串會連 KV 的 key 一起變、牽動封面查找，而把改名樂團的
  舊作掛在現名下是常見慣例；正文則據實把「發行時的團名與後來的改名」寫成這張卡的主故事。
- **`panda bear|panda bear` 1998 → 1999**（錄於 1997 至 1998 年、正式發行是 1999 年 6 月 1 日）。

#### 研究層推翻主線八處

| 卡 | 查證結果 |
| --- | --- |
| The Jesus Lizard《Blue》 | **製作人不是 Steve Albini，是前 Gang of Four 的 Andy Gill**；轉投 Capitol 正是與 Albini 疏遠的原因。2000 年的《Bang》是選輯，所以《Blue》確為解散前最後一張錄音室專輯 |
| Cloud Nothings 同名輯 | **仍是 Dylan Baldi 一人操刀**，全團首作是 2012 年的《Attack on Memory》 |
| Panda Bear《Sinister Grift》 | 不是首度獨力全包，是與 Animal Collective 的 Josh Dibb 共同製作 |
| Conan Gray《Kid Krow》 | 不是「被星探從 YouTube 挖出」，是長期自製影音日誌累積聲量後才簽進 Republic |
| Sabrina Carpenter《Short n' Sweet》 | 廠牌是 **Island Records**，不是 Hollywood |
| Tate McRae《The One Day LP》 | 是**黑膠專屬彙整輯**（收簽 RCA 前 2016–2019 的獨立單曲），與 2021 年那張 EP《Too Young to Be Sad》是不同的東西 |
| Tom Misch《Happy Music》 | 官方掛名的藝人是他的電子分身 **Supershy**，不是本名 |
| Norma Jean 兩張 | 身分鎖定為 1960 年代美國鄉村歌手 Norma Jean Beasler，不是 1990 年代末的金屬硬蕊樂團；卡池年份與掛名皆無誤 |

#### 兩張的卡池裁定

- `tate mcrae|the one day lp` → **保留**。「把散落單曲首度彙整」屬有歷史定位那一類
  （比照 Cornelius《Ethereal Essence》與 Harmonia《Documents 1975》），正文據實寫成彙整輯。
- `tom misch|happy music` → **保留**。分身掛名仍是本人的作品，與別人的唱片（w2-094 的 Sting 案）
  不同；正文如實反映 Supershy 這個掛名，那正是這張的故事。卡池本來也容得下化名差異
  （`ariel pink's haunted graffiti` 與 `ariel pink` 就是兩張分開的卡）。

#### 主要檔案

`desc-restyle/batches/w2-098-kv.json`、`desc-restyle/batches/output/w2-098-out-{1,2}.json`、
`desc-restyle/progress.json`、`dip-vinyl-shop/seed_cards.json`。

### 2026-08-08｜店主再次糾正「源流禁令」；w2-097 上線並改用新的源流處理法

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；另改了 `desc-restyle/prompts/` 三份 base 檔。
- w2-097 共 49 張上線，`verify-kv.mjs` 49/49 一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 97 批 / 4,811 張（75.8%）。**

#### 這一輪最重要的一件事：我把作廢的舊配額搬回來了

跑 w2-091 至 098 期間，我在派工詞裡寫了一整串「djent／維京金屬／哥德堡旋死／death-doom／assouf／
交響金屬／不諧和死亡金屬／安那托利亞搖滾／南倫敦 post-punk 場景／SM 世界觀，源流概述一律不得重述」。
**這等於把 2026-08-02 與 08-08 已經取消的「一條源流只准一張卡寫」配額整套搬回來。**
店主當場糾正並補上關鍵理由：

> **卡池是打散抽卡的，卡與卡之間根本沒有閱讀順序，「先寫後寫」不構成任何約束。**

**這是同一條裁定的第三次糾正**（08-02 廠牌、08-07 擴大、08-08 曲風源流），前兩次我都只把「不得禁」
記成一條規則、沒記住理由，所以一再把配額當成反同構的工具重新發明出來。

**當場做的處置**：
1. 對五個正在跑的代理發出更正（w2-097 hook 兩組、w2-098 研究 a／c／d 組）。
   已存檔的組別只做定點 note 修改、未重寫整檔。
2. **三份 base 檔（research／hook／writer）都補上店主給的理由，並新增一條授權**：
   「若派工詞出現某條曲風源流或廠牌敘事一律不得重述的禁令，那是派工詞寫錯了——以本檔為準照常寫，
   並在回報裡指出這條衝突。」防線因此不再依賴我記不記得。
3. 效果當天就驗證到：w2-097 的 writer-2 主動回報研究稿 `researchNotes` 欄裡殘留的舊配額字樣
   （研究層在更正之前寫的），並依 base 檔照寫源流面向、未採用那些舊禁令。**判斷正確。**

**仍然有效的禁令只剩兩類**：具體某張舊卡已用掉的切入面向、純粹的故事骨架同構。

#### 新的源流處理法：指定位置，不是禁掉整條

w2-097 有 19 張屬同一波 post-punk，正好用來示範。**不再是「通論釘在一張、其餘全禁」，
而是為每張指定它在這條脈絡裡站的位置**：

| 卡 | 位置 |
| --- | --- |
| shame《Songs of Praise》 | 場景內圈最早留下的一份唱片文件 |
| Squid《Bright Green Field》 | 簽進 Warp、靠榜單把這批樂團推上主流視野 |
| black midi《Schlagenheim》 | 把它推向極端 |
| Black Country, New Road | 現場聲譽先於唱片 |
| Dry Cleaning《New Long Leg》 | 從場景外圍接進來（視覺藝術界的主唱） |
| Sleaford Mods《Divide and Exit》 | 其實不屬於這個場景（不在南倫敦、幾乎不用樂器、出手更早） |
| Viagra Boys《Street Worms》 | 不在英國，瑞典自成一支 |
| Amyl and the Sniffers 首張 | 不在英國，接的是澳洲 pub rock 血脈 |

其餘 9 張明寫「本張不碰脈絡敘事」，改走製作人／錄音地／專輯名出處／客座名單等面向。
**同樣的做法也套在 Mdou Moctar 三張的 assouf（takit 情歌傳統首度進錄音室／推進西方獨立廠牌體系／
政變後的政治處境）、Within Temptation 三張的交響金屬、aespa 與 Red Velvet 的 SM 企劃、
Ulcerate 的不諧和死亡金屬（南半球支線）、Barış Manço 的安那托利亞搖滾（把土耳其民謠推向交響化）。**
**資訊量比舊做法高得多，這才是那批唱片存在的理由。**

#### 卡池：又一張重複卡

`aespa|lemonade - the 2nd album` 與 `aespa|lemonade` 是同一張唱片（第二張正規，2026-05-29）。
官方標題就是《LEMONADE》，「- The 2nd Album」是串流平台的完整標題變體；保留短標也與卡池既有的
《Armageddon》命名慣例一致。seed_cards 7,514 → 7,513，KV 鍵已刪並以 bulk get 確認。

#### 研究層推翻主線五處

GusGus《Polydistortion》**不是樂團首張**（1995 年已有冰島本土同名作），只是他們在 4AD 的第一張；
beabadoobee《Beatopia》製作人是 Jacob Bugden 與 Iain Berryman；Halsey 四張**都查無葛萊美紀錄**；
Mdou Moctar「本作才改為全體掛名」**查無此事**（那個名字本來就同時指個人與樂團）；
Amyl「12 小時寫錄完」對應的是首張 EP《Giddy Up》**不是**那張全長。

另有一則需覆核的新事實，主線獨立查證後採用：**black midi 創團吉他手 Matt Kwasniewski-Kelvin
於 2026 年 1 月 12 日辭世、得年 26 歲**，他 2020 年因心理健康因素離團，《Schlagenheim》是他與樂團
唯一的錄音室作品——依反向禁令兩分法屬與作品直接綁定，已標時序、死因僅作最低限度陳述、只寫在那一張。

#### 人工審稿修 5 處

- **Ulcerate 那句「也是 Debemur Morti Productions 出版的第一張作品」是研究稿自己寫錯**
  （該廠牌 2003 年就成立、發過數百張），原意是「樂團在該廠牌的第一張」。
- black midi《Schlagenheim》把研究稿的「九曲中的八首（在五天內錄完）」誤讀成「九首裡只有八首成形」。
- 《Hellfire》的「化名登場的孫子」漏了羅馬拼音（Sun Tzu），讀者看不懂。
- GusGus 那張出現「嚴格說來並非樂團首張」——否定讀者沒有的前提，屬校對痕跡第二型。
- Within Temptation《Bleed Out》的「這不是選輯或重發」同型，改成正面陳述。

#### 主要檔案

`desc-restyle/prompts/{research,hook,writer}-base.md`、`desc-restyle/batches/w2-097-kv.json`、
`desc-restyle/batches/output/w2-097-out-{1,2}.json`、`desc-restyle/progress.json`、
`desc-restyle/REMOVE_LIST.json`、`dip-vinyl-shop/seed_cards.json`。

### 2026-08-08｜desc-restyle w2-096 上線；94–96 三批接力收尾，wave2 過四分之三

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 49 張全部上線，`verify-kv.mjs` 49/49 一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 96 批 / 4,762 張（75.1%），剩 32 批 / 1,583 張。**
- 題材：安那托利亞源流（Erkin Koray）、獨立搖滾（Yo La Tengo／Ought／Japandroids／Band of Horses／
  Beach Fossils／alt-J）、nu metal 與哥德金屬（Korn／Lacuna Coil）、挪威流行（AURORA）、
  The Weeknd 的 2011 年混音帶三部曲、日本（Suchmos）、台灣（deca joins）。

#### 卡池：本輪第二張掛名錯誤

**`yo la tengo|parallelogram` 不是 Yo La Tengo 的專輯。** Parallelogram 是 Three Lobed Recordings
2015 年的五張分軌黑膠盒裝（各方藝人合輯），Bardo Pond 與 Yo La Tengo 那張各出一首，
YLT 僅提供〈Electric Eye〉一軌。主線覆核後移除：seed_cards 7,515 → 7,514，KV 鍵已刪並以 bulk get 確認。

**這一輪三批共處理了三件掛名疑義，分界已經清楚**：
- `sting|all we get is life`（w2-094）→ **移除**，別人的唱片、Sting 客座一軌
- `yo la tengo|parallelogram`（w2-096）→ **移除**，各方分軌盒裝、YLT 一軌
- `wavves|no life for me`（w2-095）→ **保留**，Wavves × Cloud Nothings 共同掛名、自家廠牌發行

**判準是「客座／一軌」對「共同掛名」。**

#### 研究層推翻主線六處

| 卡 | 我寫錯的 | 查證結果 |
| --- | --- | --- |
| Korn《The Path of Totality》 | 指定查葛萊美 | **查無任何葛萊美紀錄**；它拿的 Revolver Golden Gods 是樂評雜誌主辦的獎，依 08-08 定案（Decibel 名人堂那條）同樣不得寫入正文 |
| Korn《The Serenity of Suffering》 | 預設是 Head 的回歸首作 | 他 **2013 年就已回歸**，隨 2014 年《The Paradigm Shift》完成回歸首作，本作是第二張 |
| Erkin Koray | 「自製樂器是否有來源」 | 電巴格拉馬琴是他與 **Orhan Gencebay 並列共同發明**，不是他獨自發明 |
| Pissed Jeans《Why Love Now》 | 疑 Lydia Lunch 獻聲旁白 | 旁白是作家 **Lindsay Hunter**；Lunch 是製作人 |
| Band of Horses《Why Are You OK》 | 「Lytle 或 Rubin 掛執行製作」 | **Lytle 是主製作、Rubin 是執行製作**，兩者不可對調 |
| Ought《Sun Coming Down》 | 疑與 2012 年魁北克學運有關 | **查無可靠交叉來源**，且與樂團 2011 年成軍的官方說法矛盾，整條排除 |

#### 人工審稿只修 2 處

- Daughters《You Won't Get What You Want》的「睽違近十二年」與可查證的間隔對不上——上一張是
  2010 年的同名作，實際相隔八年。改為「距上一張又隔了八年」。
- Suchmos《THE KIDS》的「專輯半年後才到」與正文自己給的日期矛盾（廣告 2016 年 9 月、專輯
  2017 年 1 月），改為「要再等幾個月」。

**兩處都是「hook 的概數與正文的精確日期打架」**，與 w2-094 的 Mudhoney 兩卡互相矛盾同型：
**同一張卡（或同批同藝人的多張卡）內部的數字必須互相對得起來。**

#### 一個切點陷阱

合併寫作層輸入時，a 組因移除一張變成 9 張，`--split=2` 的邊界跟著位移，把 AURORA 的兩部曲
（Step 1 與 Step 2）劈到不同寫手——那組的反同構條款要求兩張互不重述兩部曲架構，跨寫手就守不住。
已重排 c 組的順序讓 AURORA 三張落在同一個寫手。
**往後任何批次一旦中途移除卡片，都要重新檢查 `--split=2` 的切點有沒有劈開同藝人群組。**

#### 主要檔案

`desc-restyle/batches/w2-096-kv.json`、`desc-restyle/batches/output/w2-096-out-{1,2}.json`、
`desc-restyle/progress.json`、`desc-restyle/REMOVE_LIST.json`、`dip-vinyl-shop/seed_cards.json`。

### 2026-08-08｜desc-restyle w2-095 上線；榜別混淆第二例，與一次派工詞和 base 檔打架

- Repo：`dip-vinyl-shop`（僅本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 50 張全部上線，`verify-kv.mjs` 50/50 一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 95 批 / 4,713 張（74.3%），剩 33 批 / 1,633 張。**
- 題材：巴西（Erasmo Carlos／Marisa Monte）、車庫與獨立（Ty Segall／Best Coast／Primus／Wavves／
  Peter Bjorn and John／Waxahatchee／DIIV）、前衛與極端金屬（Haken／Ayreon／At the Gates／
  Cradle of Filth／Caligula's Horse）、K-pop（BTS／BIGBANG／SHINee）、工業（Ministry／Rob Zombie）。

#### 卡池：與前一批的 Sting 案相反的判定

`wavves|no life for me` 查出是 **Wavves 與 Cloud Nothings 的正式聯名合作專輯**（官方掛名
Wavves X Cloud Nothings）。但這張**判定保留**——Wavves 是共同掛名的一半、唱片由 Nathan Williams
自家的 Ghost Ramp 發行，卡池裡也沒有 Cloud Nothings 的重複卡，正文據實寫成兩團聯名即可。

**與同日移除的 `sting|all we get is life` 的分界是「客座一軌」與「共同掛名」**：前者是別人的唱片、
Sting 只是來賓，後者是兩團各出一半。往後遇到掛名疑義照這條分。

#### 研究層推翻主線五處

| 卡 | 我寫錯的 | 查證結果 |
| --- | --- | --- |
| Rob Zombie《The Great Satan》 | 「可能尚未上市」 | **已於 2026-02-27 由 Nuclear Blast 發行**，改走 full |
| Ministry《Relapse》 | 疑為 Mike Scaccia 的遺作 | 他辭世晚於本作**九個月**，而且真正的遺作是 2013 年的《From Beer to Eternity》 |
| Marisa Monte《O que você quer saber…》 | 指定查拉丁葛萊美 | **查無入圍紀錄**，該屆入圍者是 Céu 與 Seu Jorge，整條不寫 |
| Ty Segall《Melted》 | 「是否幾乎一人包辦」 | 包辦大部分但**不是完全一人**，至少四位友人客串 |
| Against Me!《Reinventing Axl Rose》 | — | 研究層自己剔除誤植：〈Sink, Florida, Sink〉其實在次張 |

另外 **BTS《ARIRANG》確認已於 2026-03-20 發行**（BigHit、Billboard 200 冠軍），不必走保守寫法。

#### 人工審稿修 7 處

- **Wolf Alice〈Moaning Lisa Smile〉是美國 Alternative Airplay 榜第 9 名，不是英國單曲榜前十。**
  研究稿把榜別搞錯、來源還掛在一篇 NPR 的樂評上。**這是榜別混淆的第二例**（第一例是 w2-091
  One Direction《Four》的「67 國冠軍」其實是 iTunes 榜）——**「某某榜第幾名」要連榜別一起查，
  已是穩定復發的型態。**
- **Haken《The Mountain》是我的派工詞和 base 檔打架。** 我在特注寫「樂評定位要用具體排名佐證」，
  但 `writer-base.md` 的 08-08 定案是樂評媒體榜單整條不寫；寫作層照特注做，成稿就出現
  「另一份年度榜」這種去頭寫法——正是那條規則要消滅的樣式。**寫作層主動回報了這個衝突，判斷正確。**
  以 base 檔為準，該卡連 hook 一起重寫成概念與曲式。
  **教訓：派工詞不得下與 base 檔相牴觸的指示；規則要改就改 base 檔。**
- **三張卡出現「都是確定得獎而非入圍」這類措辭**（BIGBANG《Remember》、SHINee 兩張）——
  這是我「得獎與入圍分開查」的指示被寫成給讀者看的免責聲明，屬校對痕跡的第四種變體，全部改寫。
- Rob Zombie《Venomous Rat…》寫了「查不到任何典故，也沒有可考的解釋」——把研究限制講給讀者聽，刪除。
- Rob Zombie《The Great Satan》的「個人名下最長間隔」是寫作層自行推算的最高級，改為不帶最高級的說法。
- BTS《WAKE UP》的〈相思病 (Boy in Luv)〉曲名寫法無法確認，改用不會錯的〈Boy in Luv〉。

#### 主要檔案

`desc-restyle/batches/w2-095-kv.json`、`desc-restyle/batches/output/w2-095-out-{1,2}.json`、
`desc-restyle/progress.json`。

### 2026-08-08｜desc-restyle w2-094 上線；卡池出現第三類問題：掛名錯誤

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 49 張全部上線，`verify-kv.mjs` 49/49 一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 94 批 / 4,663 張（73.5%），剩 34 批 / 1,683 張。**
- 題材：金屬（TesseracT／Amon Amarth／Helloween／Dark Tranquillity／Anathema）、老團重組
  （Gang of Four／Swans／Killing Joke／Dinosaur Jr.／Meat Puppets／Mudhoney／Real Estate）、
  主流流行（Sting／Little Mix／blink-182）。

#### 卡池：新出現「掛名錯誤」這一類

**`sting|all we get is life` 不是 Sting 的專輯。** 研究層查出那是 Ensemble Thélème 與
Jean-Christophe Groffe 的古樂專輯（2024-11-22，Aparté 發行，曲目為 John Dowland 與 John Cage），
Sting 只客座一軌、重新演繹〈Shape of My Heart〉。主線獨立覆核後移除：seed_cards 7,516 → 7,515，
KV 的 `desc2:` 鍵以 bulk delete 刪除並用 bulk get 確認為 null，本批因此是 49 張。

**這是卡池的第三類問題**——前兩類是重複卡（同一張唱片兩張卡）與無歷史定位的選輯重發，
這類是**卡宣稱某人出了一張他沒出的專輯**。偵測不到，只能靠研究層逐張查。

同一天在 w2-095 的研究層又遇到一次近似情形：`wavves|no life for me` 查出是 Wavves 與 Cloud Nothings 的
**正式聯名合作專輯**。但這張的判斷相反——Wavves 是共同掛名的一半、且由他自家廠牌 Ghost Ramp 發行，
卡池裡也沒有 Cloud Nothings 的重複卡，**判定保留**、正文據實寫成兩團聯名。
**兩案的分界是「客座一軌」與「共同掛名」。**

#### 研究層推翻主線六處

| 卡 | 我寫錯的 | 查證結果 |
| --- | --- | --- |
| Cursive《Such Blinding Stars…》 | 「首張是 Saddle Creek」 | 是 **Crank! Records**；Saddle Creek 要到 2000 年的《Domestica》才開始。通論改成只掛「奧馬哈場景與 Kasher 的人脈」 |
| Dark Tranquillity《The Mind's I》 | 預設 Stanne 是原始主唱 | 首張主唱是 **Anders Fridén**，他離團去了 In Flames，Stanne 才從節奏吉他接手 |
| TesseracT《Altered State》 | 「是否為全器樂」 | 不是——全清腔無吼腔，限量版才另附器樂碟 |
| Helloween《Straight Out of Hell》 | 預設 Nuclear Blast | 原始廠牌是 **The End Records**，Nuclear Blast 2020 年才再版 |
| Helloween《Rabbit Don't Come Easy》 | 「有無客座鼓手」 | 是**三人接力**：Mark Cross 錄 2 首後因病退出、Mikkey Dee 代打其餘、真正的新鼓手只出現在日版加曲 |
| The Offspring《Supercharged》 | 疑 Pete Parada 離團相關 | 離團（2021）與本作（2024）無直接時序綁定，依反向禁令排除 |

**Dinosaur Jr.《There Near》確實存在但尚未上市**（2026-08-28 由 Jagjaguwar 發行），標 thin、
走未發行卡的保守寫法。

#### 人工審稿修 5 處

- **The Offspring《Rise and Fall, Rage and Grace》寫成「首度把製作交給外人」是錯的**——
  《Splinter》就是 Brendan O'Brien 製作。研究稿只寫「首度找 Bob Rock」，是寫作層自己把它擴寫成
  更大的宣稱。**「首度／第一次」這種最高級被寫作層擅自放大，是新記錄的失敗型態。**
- **Mudhoney 兩張互相矛盾**：《Every Good Boy》寫「這是他們在 Sub Pop 的最後一張」，《Digital Garbage》
  卻寫「留在該廠牌的第七張」。數字沒錯（Sub Pop 第七張）但措辭讓兩張打架，改為「重返該廠牌後的第五張」。
  **同批同藝人多卡要互相對得起來，這點跟 w2-091 的 Shakira 序號問題同型。**
- Little Mix《Get Weird》的「對象是單曲本身，而不是專輯」是把校對指示寫給讀者看，刪除。
- `Mötörhead` 拼寫錯誤（應為 Motörhead）。
- `雷鬼動` 改為與卡池其他卡一致的 `雷鬼頓`。

#### Andy Gill 的時序判定

Gang of Four《Happy Now》(2019-04-19) 發行約十個月後，僅存的原始成員 Andy Gill 於 2020-02-01 辭世，
使本作成為他生前最後一張錄音室專輯——依反向禁令兩分法屬「與作品直接綁定」，可寫且已標明時序、
死因一句帶過不渲染。本作主唱是 John Sterry 而非 Gill，也已寫明。

#### 主要檔案

`desc-restyle/batches/w2-094-kv.json`、`desc-restyle/batches/output/w2-094-out-{1,2}.json`、
`desc-restyle/progress.json`、`desc-restyle/REMOVE_LIST.json`、`dip-vinyl-shop/seed_cards.json`。

### 2026-08-08｜自動播放加授權門檻：本站不主動發出「這次造訪的第一個聲音」

- Repo：`dip-vinyl-shop`。檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`。
- 店主要求：試聽的優先權要**永遠低於使用者自己的播放器**，正在聽 Spotify 時瀏覽器不該自動播。

**先講死技術現實（省得日後重查）**：網頁**沒有任何 API** 能得知使用者此刻是否正在用別的 App
聽音樂。iOS 原生的 `isOtherAudioPlaying` 沒開放給網頁；Android 完全沒有對應介面。
唯一沾邊的是 Audio Session API（`navigator.audioSession.type='ambient'` 宣告自己可混音、
不搶音訊焦點），但 2026-08 為止**只有 Safari 實作**（本機 Chrome 148 實測 `navigator.audioSession`
是 `undefined`），而且 ambient 的效果是「跟對方疊著一起播」不是「不播」。
**所以「保留自動播放、但偵測到在聽 Spotify 就不播」不可能實作**，別再嘗試。

**改用授權門檻**（`dip-player.js` 新增 `autoplayConsent`，存 **sessionStorage** `dip:autoplay-consent`）：

- `playAlbum({ auto:true })`＝系統自己決定要出聲（抽到卡、出牌、撿盤）。沒授權就安靜不播，
  回報 `stopped` + `code:'NO-AUTOPLAY'`（**不是 error**，介面要停在「可播放」而不是跳找不到試聽）。
- `playAlbum()` 不帶 auto ＝使用者自己按的（試聽鍵、唱片櫃把唱片放上轉盤、搜尋頁點卡、
  點播放列表某首）→ 播放並**授權本次造訪的後續自動播放**。
- 存 sessionStorage 不是 localStorage：關掉分頁重進要重新按一次。今天整天在聽 Spotify 就一路安靜。
- `grantAutoplayConsent()` **刻意不發 state 事件**。走 `emit()` 會順手跑 `syncMediaSession`，
  而授權當下 status 還停在 `stopped`，會把剛武裝好的 keep-alive src 拆掉（iOS 第一次播放沒聲音）；
  就算避開 media session，訂閱者收到的也是上一張的 artist/album，反而把播放鈕圖示打回停止。
  呼叫端自己同步介面。

**兩個遊戲頁的開關語意要跟著改**（`battleMusicOn`／`rogueMusicOn` 記在 localStorage、預設開，
原本一進去出牌就自動搶音訊）：

- 顯示狀態改成 `musicOn && 已授權`——沒授權時一律顯示成 🔇，讓「點一下才有音樂」看得出來。
- 新增 `battleMusicTap()`／`rogueMusicTap()`：**沒授權時第一次點擊解讀成「開啟音樂」而不是靜音**，
  否則使用者會發現按了 🔊 反而變 🔇。授權後照舊是開／關切換。
- `playBattleAlbum`／`playRogueAlbum` 加 `{auto}`，auto 且未授權就整條不跑，連來源查詢都省。

**另外**：抽卡結果頁播放鈕的預設圖示由 ⏸ 改成 ▶。原本靠「一定會自動播」讓預設 ⏸ 剛好正確，
現在自動播放可能被擋，預設 ▶ 才安全（真的有播時 `loading` 事件會即時換成 ⏸）。

**驗證**（本機 static server + 3 秒測試 wav 走 pinned-file 路徑，真實點擊觸發）：

| 步驟 | 結果 |
| --- | --- |
| 清掉 consent 後 `auto:true` | `false`，事件 `stopped/NO-AUTOPLAY`，沒出聲，consent 仍 false |
| 使用者按（`auto:false`） | `true`，正常播放，consent→true，sessionStorage 寫入 `1` |
| 授權後 `auto:true` | `true`，正常播放 |

roguelike 實測 `rogueMusicOn=true` 但 `rogueMusicLive()=false`（介面顯示靜音）。
**battle 主 script 是 `type="module"`**（函式不必全域），**roguelike 是一般 script**、
`rogueMusicTap` 要走 inline `onclick` 必須是全域——已確認 `typeof window.rogueMusicTap === 'function'`。
改這兩頁的事件綁定前記得先確認是哪一種。

- 三頁 `dip-player.js?v=33` → `v=34`。
- 本次未提交工作區既有的 `seed_cards.json` 改動（非本次工作產生，來自並行的 desc-restyle 作業）。

### 2026-08-08｜desc-restyle w2-093 上線；三批接力收尾（91–93 累計 148 張）

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 49 張全部上線，`verify-kv.mjs` 49/49 一致、`chk-diskvskv.mjs` 零分岔。
  **wave2 累計 93 批 / 4,614 張（72.7%），剩 35 批 / 1,733 張。**
- 題材：GY!BE 與 post-rock、2010 年代民謠復振、實驗女聲（Julia Holter／Jenny Hval／tUnE-yArDs／Circuit des Yeux）、
  Deerhoof 與 Dirty Projectors 的跨界委創、Buzzcocks、Sleigh Bells、EXO、Bon Jovi。

#### 研究層推翻主線三處

| 卡 | 我寫錯的 | 查證結果 |
| --- | --- | --- |
| Deerhoof《Balter / Saunier》 | 「雙方互改對方的曲子」 | Marcos Balter 是為 Deerhoof 加 Ensemble Dal Niente 新寫《meltDown Upshot》；Saunier 把自家歌寫成變奏交給 **Dal Niente（不是 Deerhoof）**演奏。性質是委創合作專輯 |
| Circuit des Yeux《Reaching for Indigo》 | 「2017 年那次崩潰」 | 事件是 **2016 年 1 月 22 日**（專輯即題獻該日期），2017 只是發行年 |
| EXO《EXIST》 | 「距前作兩年」 | 距前一張**正規**專輯《OBSESSION》(2019) 約 3 年 8 個月；2021 年的《Don't Fight the Feeling》是特別專輯、不算正規前作 |

另外 Poppy《Empty Hands》原本要走「可能未發行」的保守寫法，查證後確認**已於 2026 年 1 月 23 日由
Sumerian Records 發行**，改走 full。The Lumineers〈Ho Hey〉的 Hot 100 最高名次是**第 3 名不是冠軍**，
研究層特別標註這是常見誤傳。

#### 人工審稿修 5 處

- **Bastille〈Pompeii〉英國單曲榜最高第 2 名不是第 3 名**——研究層的完工報告寫「季軍」，但它自己的 facts
  欄寫的是第 2 名。**代理的摘要與它產出的檔案不一致，這是新記錄的一種失敗型態：口頭回報不能當事實用，
  派工前要回頭讀 facts 本身。**（我就是照那份摘要把「第 3 名」寫進 hook 派工詞的。）
- **Black Flag《Damaged》原輯是 15 首不是 14 首**（研究稿誤植，連帶影響「5 首沒收進來」的算術）。
- GY!BE《Lift Your Skinny Fists》把樂章寫成「小節」——`小節` 在音樂上是 bar，改為「段落」。
- **George Ezra 那張把我的校對指示寫給讀者看了**：我要求「嗓音比喻是樂評用語、不得寫成事實」，
  成稿就出現「那是形容音色的比喻，不是師承」。這是校對痕跡的第四種變體（前三種：交代卡池標錯、
  否定讀者沒有的前提、把校對指令本身寫出來），**這次是把「不得寫成事實」的免責聲明寫成了正文**。
- 一個異體字（絃樂 → 弦樂）。

#### 卡池年份更正兩筆

- `godspeed you! black emperor|lift your skinny fists like antennas to heaven` **原本沒有年份**，
  補上 2000（黑膠 2000-10-09、CD 2000-10-23）。
- `the head and the heart|the head and the heart` **2010 → 2009**。三個時間點是 2009 年 6 月自主發行、
  2010 年 11 月簽 Sub Pop、2011 年 4 月 19 日再版；**卡池原本標的 2010 是簽約年，既非發行也非再版年。**

#### 主要檔案

`desc-restyle/batches/w2-093-kv.json`、`desc-restyle/batches/output/w2-093-out-{1,2}.json`、
`desc-restyle/progress.json`、`dip-vinyl-shop/seed_cards.json`。

### 2026-08-08｜desc-restyle w2-092 上線；獎項「幾座、算誰的」連錯兩批

- Repo：`dip-vinyl-shop`（僅本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 50 張全部上線，`verify-kv.mjs` 50/50 一致、`chk-diskvskv.mjs` 零分岔。wave2 累計 92 批 / 4,565 張（71.9%）。
- 題材：英式 indie（Kasabian／Two Door）、美加獨立（Decemberists／Magnetic Fields／Destroyer／New Pornographers）、
  世界音樂（Bombino／Songhoy Blues／Elza Soares／Natalia Lafourcade／Altın Gün）、日本（Cornelius／Kikagaku Moyo）、
  極端金屬與 doom（Gorguts／Deafheaven／Alcest／Batushka／Panopticon／Mgła／Saint Vitus／Baroness）。

#### 研究層推翻我的特注四處

| 卡 | 我寫錯的 | 查證結果 |
| --- | --- | --- |
| The New Pornographers《Whiteout Conditions》 | 「Neko Case 缺席」 | 她仍在陣中，主唱〈Play Money〉；首度缺席的是 Dan Bejar 與鼓手 Kurt Dahle |
| The New Pornographers《In the Morse Code…》 | 「與親人辭世有關」 | 查無任何來源，整條角度捨棄；改走 Bejar 的退出在本作新聞稿才正式確認為無限期 |
| Baroness《Stone》 | 「陣容變動」 | 正好相反：樂團史上首度連兩張維持同一陣容；本作也打破了色彩命名傳統 |
| Altın Gün《On》 | 「查葛萊美入圍」 | 本作從未入圍，入圍的是隔年的《Gece》（第 62 屆，未得獎） |

另有兩處研究層自己砍掉沒來源的說法：Destroyer《Kaputt》的「Bejar 錄唱時的身體狀況」查無來源、
Songhoy Blues 那條音樂禁令的施行組織查不到確切名稱（只寫概括說法，不指名）。

#### 人工審稿修 5 處，兩處是獎項的老問題換了個形式

**Natalia Lafourcade《Hasta la Raíz》在第 16 屆拉丁葛萊美是五座不是四座，而且拆法錯了。**
研究稿寫「專輯 2 項＋單曲 2 項」，實際是**專輯 2 項**（最佳另類音樂專輯、最佳錄音工程專輯）
**＋同名曲 3 項**（年度製作、年度歌曲、最佳另類歌曲），另入圍年度專輯未得獎。
**年度製作（Record of the Year）頒給的是錄音、不是專輯**——這是前一批「入圍寫成得獎」之後的變形：
獎項對不對只是第一層，**「幾座」與「算在專輯還是單曲頭上」是第二層，同樣要逐項查。**

其餘四處：

- **Françoise Hardy《Entr'acte》不是「同一年裡的第二張」**，《Message personnel》是 1973 年 11 月、本作 1974 年 11 月。
- **Kikagaku Moyo《House in the Tall Grass》是第三張不是第二張**（研究稿誤植）。
- The Decemberists〈12/17/12〉：歐巴馬的 Newtown 追思演說在 12 月 16 日，不能把 12/17 寫成「演說當天」，
  改成不指定日期的敘述。
- Saint Vitus《Lillie: F-65》的藥物成分只見於粉絲百科交叉彙整、且與已知成分對不上，改成不指名成分，
  只留有出處的膠囊外觀、印字與 Wino 的說法。

#### 一項卡池裁定

**Cornelius《Ethereal Essence》查出不是新錄專輯**，而是把近年的委託配樂、展覽用曲與限量黑膠／卡帶稀有曲
重編彙整的 30 週年紀念輯。依 08-02 常設裁定，雜牌彙編要移除、但「把散落曲目首度彙整的權威選輯」有定位者保留——
這張是本人企劃、自家脈絡，**判定保留**，正文據實寫成彙整輯（比照 w2-088 的 `this will destroy you|young mountain`
查出是 EP 就照寫 EP）。

#### 主要檔案

`desc-restyle/batches/w2-092-kv.json`、`desc-restyle/batches/output/w2-092-out-{1,2}.json`、
`desc-restyle/progress.json`。

### 2026-08-08｜desc-restyle w2-091 上線；一則錯誤的 hook 前提與一個 iTunes 假冠軍

- Repo：`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 49 張全部上線，`verify-kv.mjs` 49/49 一致、`chk-diskvskv.mjs` 零分岔。wave2 累計 91 批 / 4,515 張（71.1%）。
- 題材：主流流行（Shakira／Kesha／P!nk／Miley Cyrus／Justin Bieber／One Direction）與 2010 年代 indie、hypnagogic pop。

#### 開工先移除一張重複卡

`p!nk|missundaztood` 與 `p!nk|m!ssundaztood` 是同一張 2001 年專輯的兩張卡。依「保留掛名與唱片實際版面
一致的那張」原則留下 `M!ssundaztood`，seed_cards 7,517 → 7,516，KV 的 `desc2:` 鍵以 bulk delete 刪除
並用 bulk get 確認為 null。本批因此是 49 張而非 50 張。

#### 研究層推翻主線 12 處

| 卡 | 查證結果 |
| --- | --- |
| One Direction《Four》 | Zayn Malik 離團公告晚於發行四個多月且與本作無綁定，依反向禁令排除 |
| Ellie Goulding《Lights》 | BBC Sound of 2010 與 BRIT Critics' Choice **兩項都是獲選、不是入圍** |
| Camila Cabello《Camila》 | 離團到首作間隔 13 個月，不是外傳的「數週後」（某自動摘要工具只取月份餘數、漏算整年） |
| Miley Cyrus《Something Beautiful》 | 專輯與同名電影非同步發行，三個時間點各自錯開 |
| P!nk《TRUSTFALL》 | 第 66 屆葛萊美**完全沒入圍**，不是入圍未得獎 |
| John Maus | 本作 2011 年發行時他尚未取得博士學位（2014 年才完成） |
| Imagine Dragons | 「團員曾任 Slipknot 成員」查無來源、疑為 AI 條目誤植，捨棄 |

#### 人工審稿修了 9 處，最重的一處是 hook 前提整個錯掉

**〈Pumped Up Kicks〉的靈感不是科倫拜案。** 研究稿把兩件事併成一句：Mark Foster 本人說這首歌起於他讀到
青少年心理疾病增加的趨勢、想弄懂那套對他全然陌生的心理；與科倫拜案有關的是**貝斯手 Cubbie Fink**，
他的表親是該案倖存者。hook 與正文首句連同 research／hooks／input 四層一併重寫。

其餘八處：

- **One Direction《Four》的「67 個國家專輯榜冠軍」其實是 iTunes 榜。** Wikipedia 原文是「豪華版在約 67 國
  登上 iTunes 榜首」，寫作層讀成各國專輯榜冠軍。hook 與正文同步改寫。
  **這類「某某榜冠軍」的榜別混淆是新記錄的失敗型態，往後榜單宣稱要連榜別一起查。**
- **Shakira《Sale el Sol》是第九張不是第七張**（研究稿的來源是 PR Newswire 新聞稿）。同批《Las mujeres
  ya no lloran》寫「第十二張」，兩者一比就露餡——**同藝人多卡放同一組時，序號必須互相對得起來。**
- **Rex Orange County 的「19 歲」是寫作層自己補的**，研究稿裡沒有任何年齡事實，且他當時實際是 18 歲。
  年齡整個拿掉。
- Miley Cyrus《Younger Now》的〈Rainbowland〉被威斯康辛州小學撤下是 **2023 年**，研究稿寫 2019 年。
- Kesha《Rainbow》的「提告後五年無法發片」與提告年份對不上（2014 提告、2017 發行），改為三年。
- Shakira《Laundry Service》的「一句英文都不會說」超譯了來源的「不諳英語」。
- Wild Nothing《Life of Pause》hook 說三位鼓手，正文只點到兩位，補上收尾。
- Julien Baker《Sprained Ankle》的「巡演路上自己賣的 CD」有來源但正文漏寫，補回。

#### 主要檔案

`desc-restyle/batches/w2-091-kv.json`、`desc-restyle/batches/output/w2-091-out-{1,2}.json`、
`desc-restyle/progress.json`、`desc-restyle/REMOVE_LIST.json`、`dip-vinyl-shop/seed_cards.json`。

### 2026-08-08｜鎖定畫面媒體通知改用 MediaSession，播完自動收掉

- Repo：`dip-vinyl-shop`。檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`。
- 現象（店主手機 Chrome 回報）：抽完卡、試聽播完後把網頁最小化，**鎖定畫面留著一則掛著網站
  logo 的播放器**，而且不會自己消失。

**根因**：全專案原本沒有用過 `navigator.mediaSession`。只要頁面有 `<audio>` 或 Web Audio 在出聲，
Android Chrome 就會自動掛一則媒體通知；metadata 沒人指定時它就抓 `document.title` ＋ manifest／
favicon 圖示來湊，所以顯示的是站名和 dip logo。試聽結束後 `stop()` 只有 `pause()`，
媒體 session 沒被銷毀，通知因此常駐；按它的播放鍵還會喚醒靜音 keep-alive，
變成**顯示在播、實際沒聲音**。

**改法**（`dip-player.js` 新增 `syncMediaSession` / `setMediaSession` / `clearMediaSession`，掛在 `emit()` 上）：

- `status:'playing'` → 寫入專輯／藝人／曲名與封面，`playbackState='playing'`。
  封面走 `playAlbum({ cover })` 新參數，四個呼叫點（唱片櫃、專輯搜尋、抽卡結果頁、對戰、Roguelike）
  都改成傳 `coverUrl`／`_coverUrl`。**沒帶 cover 就留空陣列，讓 Chrome 顯示無封面而不是退回網站 logo。**
- `status` 為 `stopped`／`error` → `playbackState='none'`、`metadata=null`，並**拆掉 keep-alive
  `<audio>` 的 src**（`removeAttribute('src')` + `load()`）。只設 playbackState 不夠——Chrome 仍會把
  卡片留在鎖屏，必須讓還掛著音源的元素失去來源，session 才會真的銷毀。
  不影響下一次播放：`primePreviewFromGesture` 每次都會重新指定 src 再 play。
- `loading`／`stopping` 不動，淡出那 1.5 秒卡片仍在。
- **刻意不註冊 `play` handler**，只掛 `pause`／`stop` → `stop({fade:true})`。
  30 秒試聽是一次性的 AudioBufferSource，沒有可回復的「繼續播放」；沒有 play handler
  鎖屏就不會給出按了不會出聲的播放鍵。

**驗證**（本機 static server + 3 秒測試 wav 走 pinned-file 路徑，實測 `onStateChange` 逐格快照）：

| 階段 | playbackState | metadata |
| --- | --- | --- |
| loading | none | null |
| playing | playing | Test Album／Test Artist／封面 512x512 |
| 自然播完 stopped | none | null，keep-alive src 已清空 |
| `stop({fade:true})` 淡出中 | playing | 仍在（正確） |
| 淡出結束 | none | null，keep-alive src 已清空 |

- 三頁的 `dip-player.js?v=32` → `v=33`（sw.js 對 .js 是網路優先，但沿用既有 cache-buster 慣例）。
- 未動 YouTube 路徑：`mount()` 仍會 prime YT placeholder（160ms），那則 session 屬於
  youtube.com，本次不處理；order 已是 `['itunes']`，YT prime 其實是舊路徑的殘留，日後可評估拿掉。

### 2026-08-01｜desc-restyle w2-041／042／043 三批上線（累計 2,912／6,971，41.8%）

- Repo：`dip-vinyl-shop`（僅本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 27 個子代理**全程零內容過濾器中斷，連續第四輪**；150 張 QA 全 0 標記、全部落在字數區間內。
- 題材：041 六〇年代搖滾與英國民謠復興、042 glam／鄉村搖滾／AOR／前衛、043 坎特伯里與德國 krautrock。

#### 先做了分池：wave2 預先切好的卡單到 040 就用完了

新增 `build-next-batches.mjs`——排除已分池與已移除的卡、**對現行 seed_cards/apex_pool 做存在性驗證**
（剩餘 4,379 張全部仍在，無幽靈卡）、照 `restyle-tasks.json` 原順序切（該檔已依風格與藝人分群）。
一度讓工具自動避開藝人跨批，但那會產生 48／49 張的批次、打亂管線的 5 組×10 張，
改回固定 50 張並**改為回報跨批藝人**由主會話寫特注協調。剩餘約 4,229 張、85 批。

#### 三個時序判定全部查證成立（新反向禁令兩分法的實戰）

| 卡 | 查證結果 |
| --- | --- |
| Fairport Convention《Unhalfbricking》 | 車禍 1969-05-12、發行 07-03；hook 寫成「錄音完成之後、唱片上架之前」 |
| Robert Wyatt《Rock Bottom》 | 墜樓 1973-06-01，早於 1974-02 錄音與 07-26 發行，作品是康復期完成的 |
| Gram Parsons《Grievous Angel》 | 1973-09 辭世、1974-01 發行，確認為遺作 |

意外收穫兩則：**UFO《Strangers in the Night》**的 Schenker 離團其實發生在錄製與發行**之間**，
根本不受反向禁令管；**Fleetwood Mac《Then Play On》**確認是 Peter Green 最後一張、他發行後八個月才離團。

另有細膩判例：Judee Sill《Heart Food》銷售失利導致廠牌關係終結、Vashti Bunyan 發行後退隱數十年、
John Martyn〈Solid Air〉因 Nick Drake 隔年辭世而被聽成安魂曲、Tim Buckley〈Song to the Siren〉
1983 年翻唱帶動回溫——**皆判為與作品綁定可寫並標時序，但七位藝人本人的辭世一律不寫**。

#### 研究層修正了三處問題

Gentle Giant《Free Hand》的「英國獨立榜第 20 名」時序矛盾（該榜 1980 年才成立、專輯 1975 年）已捨棄；
The Move《Shazam》封面不是墓碑而是超級英雄插畫；Brian Eno 的環境音樂起源查到完整版本
（1975 年 1 月車禍臥床、擴大機故障讓豎琴唱片近乎無聲）。

#### 新踩到的坑：含「..」的 key 無法用 wrangler 讀取

`wrangler kv key get` 把 key 放進 URL 路徑，含 `..` 的 key 會被 Cloudflare API 以
**403 Forbidden** 擋下（路徑穿越保護）。該 key 實際存在且服務正常，只是讀不到。
**全池共 18 個這類 key**（《Endtroducing.....》《MM..Food》《...Baby One More Time》《Takk...》
《Only Built 4 Cuban Linx...》《...Like Clockwork》《Miss E... So Addictive》等），
先前抽驗剛好沒抽到才沒發現。新增 `verify-kv.mjs` 改走 bulk get API（POST body，不受路徑限制），
並把驗證從抽樣升級為**整批逐張比對**——041–043 三批各 50/50 全數一致。

#### 規則過度執行第二例

043 writer-2 為了避開禁語「必聽」，放棄引用《1001 Albums You Must Hear Before You Die》這本書。
已於 `prompts/writer-base.md` 補上「**禁語只約束自己的行文，不約束書名／獎項名／專輯名等專名**」。
與先前半形逗號那次同型——**規則寫得像絕對禁令，代理就會連專名一起避開**，這類條款都要明寫適用範圍。

#### 審稿修正

僅三處：The Who《Sell Out》漏掉 hook 的收尾（廣告逼真到引來真正的電台與詞曲作者提告）、
Future 同名作漏掉版權收尾（038 已處理）、Eagles《On the Border》一處名次仍是中文數字。

### 2026-08-01｜desc-restyle w2-038／039／040 三批上線（累計 2,762／6,971，39.6%）

- Repo：`dip-vinyl-shop`（僅本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- **本工程首次三批並行**：27 個子代理（研究 15、hook 6、寫作 6）**全程零內容過濾器中斷**，連續第三輪。
- 150 張 QA 全 0 標記；**首次全部落在字數區間內、零超標**，不必事後修剪。
  字數：038 為 181–247、039 為 198–242、040 為 178–242。KV 直查抽驗 21/21 一致。
- 題材：038 當代 R&B＋南方饒舌、039 南方與地下饒舌、040 抽象與器樂嘻哈。

#### 同藝人協調再創新高

Future **五張**跨兩組（Pluto／Monster／56 Nights／Future／HNDRXX，連莊冠軍只寫在其中一張）；
Aesop Rock、Jedi Mind Tricks、Earl Sweatshirt、MIKE 各**四張**；
Mos Def／Talib Kweli 人脈重疊**六張**（Black Star 獨佔組團起源）；
Rick Ross 四張跨 038／039。三張一組者另有八組。全部分軸成功，成品逐張比對無撞車。

#### 子代理修正主會話錯誤 5 處（本輪最有價值的部分）

| 我寫錯的 | 實際 |
| --- | --- |
| Saul Williams 同名作與 Rick Rubin 合作 | Rubin 製作的是 2001 年前作《Amethyst Rock Star》 |
| Apollo Brown《Clouds》2012 年 | 2011 年（2012 是與 O.C. 的《Trophies》） |
| Nosaj Thing《Home》廠牌 | Innovative Leisure（常見誤植為 Sub Pop） |
| KRS-One 卡的〈Sound of da Police〉 | 是 1993 年前作曲目，hook 層下禁令擋掉 |
| Future《Monster》的一條「事實」 | 實為歌詞原句，改為大意轉述（不逐字引歌詞） |

hook 代理另自行補了我漏掉的協調：Bun B／Slim Thug／Paul Wall 三張會撞「2005 德州浪潮」共同背景。

#### 兩條寫作規則經實測修正（也是子代理指出的）

1. **半形逗號規則太粗糙**：038 writer-1 為了避開逗號，放棄了《Ugh, Those Feels Again》這種真實標題。
   已改為「**只禁半形逗號貼著中文字**，原文標題與專名的標點照原樣保留」。
2. **名次數字規則寫反了**：我原訂「名次維持中文數字」，實測全池 020–037 是
   **阿拉伯 508 例對中文 102 例**。已改為年月日與榜單名次都用阿拉伯數字。
   新增 `normalize-ranks.mjs` 一次正規化三批 **126 個欄位**——同步改 output／input／hooks，
   確保 hook 與正文首句仍逐字相符；並順手修掉「同一曲名在 hook 用《》、正文用〈〉」兩例。
   **殘留樣式「名列第五」（少「名」字）工具抓不到，仍需人工回讀。**

#### 其他審稿修正

- Future 同名作漏掉 hook 的收尾（〈Mask Off〉長笛取樣上線時版權尚未談妥），已補回。
- Memphis 譯名在 039 內同時出現兩種寫法，依全池慣例（曼菲斯 4：孟菲斯 2）統一為**曼菲斯**，
  並回頭修一張已上線的 Elvis 卡。
- 兩處「發行在前…遇害在後」的編輯註記式措辭改為讓年份自己說話。

#### 反向禁令兩分法在三批的實際運作

可寫並標時序者：Gang Starr《One of the Best Yet》（Guru 身後由 Premier 完成）、Big L 身後遺作、
Young Dolph《Rich Slave》（生前最後一張）、MIKE《Weight of the World》（母親辭世早於本作）、
TOKiMONSTA（腦部手術後康復完成本作）、Pharoahe Monch（東寶提告致下架至 2019 重發）、
Jurassic 5 解散、M.O.P. 廠牌收攤、slowthai 2019 水星獎典禮事件、T.I.《Paper Trail》的審判時序。
明文禁寫者：Young Dolph《Role Model》、Mystikal 後續案件、slowthai 2023 年案件、
Slum Village 的 J Dilla 2006 辭世、Eyedea 2010 辭世、T.I. 前兩張的 2007 年指控、
Rick Ross《Trilla》的獄警爭議（數月後才曝光）。

### 2026-08-01｜反向禁令修訂後的全池回溯清查（001–037）：實際需改 4 張

- Repo：`dip-vinyl-shop`（僅本備忘錄）；內容改動在 Worker KV 與 `desc-restyle/`。
- 承同日「反向禁令改兩分法」的裁定，全面回頭清查舊批是否有卡因舊規則過度克制。

**方法（三段式，新增兩支腳本）**

1. `scan-suppressed.mjs`：掃 **251 個 hook 檔**的 note，逐句找「禁令措辭 × 事件詞」同句命中者，
   得 **166 張**（死亡 78、訴訟指控 40、解散離團 36、重組復出 13、廠牌中斷 2）。
2. `fetch-suppressed.mjs`：以 Cloudflare bulk get 抓這些卡的 KV 現值，比對正文是否已有事件痕跡，
   篩出 **112 張「正文無痕跡」**。
3. 主會話逐張回讀正文全文判讀，判準只有一條：**辭世／事件是否使本作成為最後作品**。

**實際需改 4 張（皆為成員辭世使本作成為最後作品）**

| 卡 | 時序 |
| --- | --- |
| Linkin Park《One More Light》 | Bennington 發行兩個月後辭世，北美巡演取消 |
| TV on the Radio《Nine Types of Light》 | Gerard Smith 確診肺癌無法巡演，發行**八天**後辭世 |
| The Prodigy《No Tourists》 | Flint 四個月後辭世 |
| Grateful Dead《Built to Last》 | Mydland 隔年辭世，本作是他與樂團的最後一張錄音室專輯 |

四張皆只寫日期、年齡與時序，**不寫死因與過程**（與 Telefon Tel Aviv 同一處理）。
改完一度全部衝破 280 硬上限（282–297），已再修剪至 232–254。
研究稿／hook／寫手輸入／輸出四層同步，KV 直查驗證 4/4，四個批次 QA 全 0。

**其餘 108 張維持原狀**——多為與作品無關的後續事件（Nirvana《Bleach》之於 Cobain 1994、
DMX 1998 年作之於 2021 辭世、Cassie 與 Mary J. Blige 等十餘張 Bad Boy 體系的 Combs 禁令、
Ryan Adams 與 Brand New 的未證實指控），或本來就是姊妹卡互斥條款而非禁令
（Dream Theater、Smashing Pumpkins、Rage Against the Machine、Bell Biv Devoe）。

**比對詞表的誤判要記住**：不少卡其實早就寫了，只是用詞不在 TRACE 表裡——
Van Halen《1984》已寫「1985 年 4 月他宣布退出樂團，經典陣容告終」、
2Pac《Better Dayz》開頭就是「1996 年遇害的人，怎麼在 2002 年交出一張雙碟新作」、
Slayer《World Painted Blood》已寫「原始陣容共同完成的最後一張」、
Bill Withers《Watching You Watching Me》已寫「最後一張錄音室專輯…自此淡出樂壇」。
**判讀一律回讀正文全文，不可只信關鍵字比對。**

**方法限制**：本次只掃得到「hook note 曾下過禁令」的卡。若研究層當初根本沒查到該事件，
就不會留下禁令句，也就掃不出來——這類漏網只能靠日後單張深潛或人工發現。

### 2026-08-01｜店主兩項裁定：反向禁令改兩分法、卡池再移除一張

- Repo：`dip-vinyl-shop`（`seed_cards.json`、本備忘錄）＋ Worker KV ＋ `desc-restyle/prompts/`。

**① 反向禁令從「一律不寫」改為兩分法**

晚於專輯發行的事件，此後分兩類處理：

- **與作品直接綁定者可寫**，但正文必須標明時序：成員辭世使本作成為遺作或最後合作、
  作品本身的後世流傳、宣傳因某事件中斷、廠牌關係就此結束。
- **與作品無關的後續生平事件仍一律禁寫**：多年後的訴訟與指控、離婚、重組、個人爭議。

此修訂同時追認了既有作法（Tom Petty《Echo》寫 Epstein 最後參與、Nick Cave〈Red Right Hand〉
的後世流傳、Ashanti《Concrete Rose》寫發行後 Irv Gotti 案導致宣傳受挫），並劃清仍禁的那一邊
（Cassie 2006 首作不碰 2023 年後訴訟、Whitney Houston 1987 年作不寫 2012 年辭世）。
規則已寫進 `prompts/research-base.md` 與 `prompts/hook-base.md`。

**依此改寫 Telefon Tel Aviv《Immolate Yourself》**：原本依舊規則完全不提辭世，現改為以此為主軸——
Charles Cooper 於 2009-01-22 被發現離世、得年 31 歲，距 01-20 發行僅兩天，本作成為他與
Joshua Eustis 最後一次合作。克制原則照舊：只寫日期、年齡與時序，不寫死因與過程。
研究稿／hook／寫手輸入／輸出四層同步更新，單鍵上傳後以 `wrangler kv key get` 直查驗證一致。

**② 卡池：移除 1 張、保留 1 張（7,548 → 7,547）**

- 移除 `colde|love part 1`：2019 年 EP，研究兩次檢索連曲目與製作細節都查無，
  無故事亦無歷史獨特性。KV 鍵已刪並以 404 驗證，舊值留在 `batches/w2-037-kv.json`。
- **保留 `marshall jefferson|move your body`**：形式雖是 1986 年 12 吋單曲而非專輯，
  但副標即「The House Music Anthem」、是把鋼琴帶進 house 的奠基作，且故事完整
  （廠牌老闆打回票說這不算 house、自費約 9000 美元購置器材、鋼琴以 40–45 拍慢錄再加速、
  Ron Hardy 在芝加哥 Music Box 一夜連放六次）。符合店主「有故事、有歷史獨特性就留」的標準。

**待辦**：反向禁令放寬後，001–037 舊批可能有卡因舊規則過度克制而漏寫「與作品直接綁定」的
辭世或中斷事件，建議比照 2026-07-31 那次回溯清查再掃一輪。

### 2026-08-01｜desc-restyle w2-036／037 兩批上線（累計 2,613／6,972，37.5%）

- Repo：`dip-vinyl-shop`（僅本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 兩批 100 張，QA 全 0 標記；字數 036 為 179–247（均 230）、037 為 143–249（均 228）。
- 題材：036 前半電子（Plaid／Telefon Tel Aviv／Modeselektor／St Germain 等）＋後半九〇年代 R&B；
  037 全批新傑克搖擺到當代 R&B。

#### 同藝人多卡協調（歷來密度最高）

- **Mary J. Blige 四張擠在同一組**，分為 1992 出道與 hip-hop soul 奠基／1997 脫離 Sean Combs 換班底／
  2001 個人轉折／2005 商業與獎項；四張 note 明文**禁用「hip-hop soul 女王」這類通用定位**。
- 三張一組者：Mariah Carey、Telefon Tel Aviv、Plaid（跨組）、Ashanti、Amerie、Ciara（跨組）、
  Keyshia Cole、Miguel、Jhené Aiko。兩張一組者十餘組。
- **新傑克搖擺四張的撞軸風險**（Guy／Blackstreet ×2／Keith Sweat）：指定只有 Guy 同名作寫「曲風成形」，
  其餘三張各走自己的軸，成品確實守住。

#### 反向禁令（本批特別密集）

- `cassie|cassie`（2006）：2023 年後與 Sean Combs 相關的訴訟、和解與指控全部遠晚於本作，
  hook 層以「【寫手禁令】」開頭原樣傳遞，成品只有 2006 年事實。
- `whitney houston|whitney`（1987）：2012 年辭世與 1992 年婚事皆晚於本作，雙重禁令。
- `h-town|fever for da flavor`（1993）、Keyshia Cole 三張：各自的辭世事件晚於專輯。
- `telefon tel aviv|immolate yourself`：團員 Charles Cooper 於 2009-01-22 辭世，
  **晚於同月 20 日的發行日兩天**，依現行反向禁令不寫。**此條待店主裁定是否比照
  Mac Miller《Circles》那類「辭世早於發行」放行**，改判後可回補。
- 十餘張 Bad Boy／Uptown 體系卡一律標明 Combs 相關後續禁令。
- hook 代理另自行補了兩條正確禁令：112《Part III》把 R. Kelly 後續案件同列禁寫；
  Faith Evans《The First Lady》註明她本人 2004 年被捕與 Combs 無關，避免寫手混為一談。

#### 人工審稿修 7 處

- **排除條款過度執行**：Bell Biv Devoe《Poison》因「New Edition 拆夥敘事只給 Bobby Brown」被執行過頭，
  連三人出身 New Edition 都沒交代，卡片讀來斷頭。已補回團籍、仍不寫拆夥經過。
- **hook 開了頭正文沒交代**：Xscape 卡 hook 說「只花一週」但正文全無此事（已補）；
  Keyshia Cole 出道作 hook 說 64 週、正文只出現 84 週（不同榜，已補明 Billboard 200 的 64 週）。
- **語意錯誤**：Faith Evans《The First Lady》寫成「離開 Bad Boy 後的第四張」（實為生涯第四張、
  離開後第一張）；Johnny Gill「個人第三張同名專輯」歧義。
- **中文用詞**：Modeselektor hook「兩人整整十週百分之百待在同一間錄音室」不通，已改寫並同步 hook 三層；
  Arovane「橫貫東京…旅行」誤用。

#### 新踩到的坑：KV 上傳驗證的邊緣快取陷阱

`wrangler kv bulk put` 的輸出被 `tail -3` 截掉「Success!」時，我誤判已上傳就去公開端點抽驗——
當時 KV 還是舊值，**那次讀取把舊文灌進邊緣快取**；補傳成功後 KV 已是新值，公開端點卻仍回快取舊文，
抽驗 0/11 全錯。唯一通過的那張正是只出現在第二次清單、從未被舊值快取過的卡，反證了假設。
**教訓：①wrangler 輸出不可截斷，確認 Success 再往下走；②驗證改用 `wrangler kv key get` 直查
KV 真值**（036 補驗 9/9、037 驗 10/10 全過）。與既有「刪除後不可用公開端點驗證」是同一類陷阱，
兩者已一併寫入長期記憶。

#### 其他

- 兩批 **18 個子代理再次全程零內容過濾器中斷**（連續第二輪），本批題材涉大量逝者、成癮、訴訟仍未觸發，
  進一步佐證中斷主因是「整批內容的第二次輸出」而非敏感題材。
- 字數紀律仍未完全生效：037 writer-2 初稿 15/25 超標才回頭修（033 是 12/25），
  但因只做定點修改、未整批重寫，未引發中斷。**可考慮把目標值下修至 200–220，讓超寫剛好落進 180–240。**
- 037 的 hook a–c 有 21 則 note 超過 350 字（最長 508）——該組每則要背兩條互斥條款，長度有正當理由，
  多耗約 2k tokens，手修成本更高，決定不動。
- 卡池疑義：`marshall jefferson|move your body` 查證為 1986 年 12 吋單曲（非專輯）、
  `colde|love part 1` 為 2019 年 EP（非專輯），兩張簡介已照實寫明性質，
  **是否依 08-01 的收錄標準移除待店主裁定**。

### 2026-08-01｜卡池清理：移除 8 張非正規專輯卡（7,556 → 7,548）

- Repo：`dip-vinyl-shop`（`seed_cards.json`）＋ Worker KV（`desc2:` 鍵同步刪除）。
- 店主裁定收錄標準：**不是正規專輯、沒有正式封面的一律移除；致敬樂團看重要性決定去留，
  不重要的雜牌、無歷史意義者移除**。
- 判定方法：封面 API 對任何查詢都會回最接近的圖，不能拿「有沒有回圖」當標準；
  改拿 `/spotify-search` 回傳的連結去抓 `open.spotify.com/album/<id>` 的
  og:title／og:description，看封面**實際指向哪張、掛誰的名**。

**第一輪（查無實物／改標題 mixtape）**：
| 移除卡 | 實況 |
| --- | --- |
| Simon & Garfunkel｜Feelin' Groovy | 非專輯（歌曲俗稱）；封面實為 Simon & Garfunkel Revival Band 1993 年同名盤，該致敬團查無實質資料 |
| Future｜Zone | 官方作品列表查無此作 |
| Pusha T｜The Animosity of Caine | 2013 mixtape《Wrath of Caine》串流改標題版 |
| Raekwon｜Wu Victory | 2012 免費 mixtape《Unexpected Victory》串流改標題版 |

**第二輪（翻錄／雜牌選輯，店主授權由 Claude 判斷）**：
| 移除卡 | 實況 |
| --- | --- |
| Hans Zimmer｜Film Music of Hans Zimmer | Silva Screen 布拉格愛樂翻錄選輯，非本人錄音（w2-033 已寫明性質，仍不符收錄標準） |
| Hans Zimmer｜Music From the Pirates of the Caribbean Trilogy | 同上，Spotify 直接掛 City of Prague Philharmonic 名下 |
| Ennio Morricone｜Film Music Masterworks | 同上型 Silva Screen 系列 |
| Nino Rota｜Film Music | 卡面「Film Music, 1993」查無明確實體；封面借自 2019 Decca《The Fellini Album》 |

**同型但保留**（有正式身分，不符移除條件）：The Good, the Bad and the Ugly（原聲帶名盤）、
Yo-Yo Ma Plays Ennio Morricone（本人指揮的 Sony Classical）、Zimmer《Diamond in the Desert》
（本人 2025 現場）、Howard Shore 魔戒三部曲（本人指揮原始錄音）、Parquet Courts《MILANO》
（Luppi 聯名真專輯）、The Scythe 合輯、Interpol 未發行新作、The Doors RSD 選輯、
Sex Pistols《More Product》（官方訪談檔案輯）。

- 8 張皆不在 `apex_pool.json` 與 NEOCLASSIC_LIST。KV 舊值備份：前四張在
  `desc-restyle/batches/w2-03X-kv.json`，Nino Rota 在 `kv-backup-desc2.json`。
- **重要陷阱（已記入長期記憶）**：刪 `desc2:` 鍵後**不可用公開端點 /album-desc 驗證**——
  KV miss 會觸發 worker 即時生成罐頭簡介並寫回，等於重新汙染。第一輪就踩到，重刪一次。
  正確驗證：`wrangler kv key get` 看輸出含 `404: Not Found`（exit code 恆為 0，不可依賴）。
- 驗證：8 個 key wrangler 直查全部 404；seed_cards.json 單行格式未變、diff 乾淨。
- desc-restyle 進度同步調整：總池 6,980 → **6,972**、已完成 2,520 → **2,513**
  （8 張中 7 張已改寫上線、自完成數除名；Nino Rota 尚未改寫、只從總池扣除）。

### 2026-08-01｜desc-restyle w2-034／035 兩批上線（累計 2,520／6,980，36.1%）

- Repo：`dip-vinyl-shop`（僅本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- 兩批 100 張，QA 全 0 標記；線上抽驗 034 為 11/11、035 為 12/12，均 KV-HIT 且逐字一致。
- **產線再精簡：三層提示範本檔案化**（`prompts/research-base.md`、`hook-base.md`、
  `writer-base.md`）。主會話每批只需寫「特注」，省下三大段重複輸出。
- **key 轉錄風險歸零**：研究層改為代理自己從 `batches/wave2/<批次>-cards.json` 逐字複製 key，
  不再由主會話把 50 個 key 打進提示——那正是歷史上「key 損壞三型態」的來源。兩批 100 張 key 全對。
- **輸出紀律首次完整驗證**：兩批共 **18 個子代理（研究 10、hook 4、寫作 4）全程零內容過濾器中斷**，
  是導入「每組寫完立刻存檔、不整批重寫、回報不覆述原文」以來第一次整批無事故
  （對照：031、032 各有 d–e 槽被擋，033 writer-1 被擋）。寫手範本另把字數紀律前移為
  「動筆前先定好 3–4 個資訊點再下筆」，取代原本容易誘發重寫的「寫完自己數一次」。

#### 人工審稿抓到的三類問題（機器全過，只有人眼攔得下）

1. **研究層事實錯誤 ×2，均已 WebSearch 查證後溯源修四層**（研究稿／hook／寫手輸入／輸出）：
   - John Williams《How to Steal a Million》台灣譯名被寫成《偷天換日》——那是《The Italian Job》的
     譯名，正確為 **《偷龍轉鳳》**。
   - Pixies《Indie Cindy》寫成「取代原本考慮回鍋的三位 Kim（Deal、Shattuck、Lenchantin）」——
     **Paz Lenchantin 不叫 Kim**，且她與 Shattuck 是後來的巡演貝斯手，不是人選。該說法整段刪除。
2. **題材再度被寫糊**：Jane's Addiction《Nothing's Shocking》事實表寫「十一大通路中九家拒賣」，
   正文卻糊成「多數以此為由拒收」，還跟 hook 的「嚇退九家」對不上。已改回具體數字。
3. **格式一致性**：034-out-2 與 035-out-2 共 50 張整批用中文數字寫日期（「二〇〇四年八月十一日」），
   但全池 030–033 每批 25/25 都是阿拉伯數字。新增 `cn-date-to-arabic.mjs` 轉換
   （負向前瞻避開「年代」、不動名次與數量，另處理「一七九六至一八一五年」這類只有後者帶年的區間、
   以及「同月二十五日」這類省略月份的日期），轉後再跑 `fix-spacing.mjs` 補空格。
   副作用是 26 張漲到 241–251 字，仍在 280 硬上限內，未為此砍散文。規則已寫進 hook 與寫手兩份範本。

#### 卡池層資料疑義（本工程照實寫明性質，但卡本身要不要改名／併卡／下架待店主裁定）

| key | 研究查證結果 |
| --- | --- |
| `interpol|this mirror weighs a ton` | 尚未發行的第八張新作，預定 2026-08-28 上市 |
| `denzel curry|strictly 4 the scythe` | 不是個人作，是他與 A$AP Ferg 等人組成的 The Scythe 首張團體合輯 |
| `simon & garfunkel|feelin' groovy` | 不是專輯，是〈The 59th Street Bridge Song〉的通俗簡稱 |
| `parquet courts|milano` | 實際署名為 Daniele Luppi 與 Parquet Courts 聯名 |
| `raekwon|wu victory` | 2012 年免費 mixtape《Unexpected Victory》的串流改標題版 |
| `pusha t|the animosity of caine` | 串流上此標題對應 2013 年 mixtape《Wrath of Caine》，查無同名新作 |
| `future|zone` | 兩次檢索皆查無此作，官方作品列表無此品項 |
| `ennio morricone|film music masterworks` | City of Prague Philharmonic 翻錄選輯，非本人原始錄音 |
| `hans zimmer|...pirates of the caribbean trilogy` | 同上，另查明首集掛名作曲者實為 Klaus Badelt |

- 主要檔案：`desc-restyle/prompts/`（三份新範本）、`cn-date-to-arabic.mjs`（新增）、
  `progress.json`、`batches/`（034–035 各層產物）。
- 前批遺留疑義（未變）：`nina simone|gifted & black` 版本待實體片確認；
  `bloc party|anatomy of a brief romance`（2026-09-11）與
  `phoebe bridgers|lost weekend`（2026-08-14）尚未發行；
  `seed_cards.json` 18 筆藝人名亂碼屬卡池層清理。

### 2026-08-01｜desc-restyle w2-031／032／033 三批上線（累計 2,420／6,980，34.7%）

- Repo：`dip-vinyl-shop`（僅本備忘錄）；內容改動在 Worker KV 的 `desc2:` 與 `desc-restyle/`。
- **精簡管線首次連跑三批**，六項改動全數生效：hook 層 2 代理、note ≤350 字、範本瘦身、
  寫手只回報異常、qa-batch.mjs 三段檢查。三批 QA 均 0 標記，字數穩定在 156–252（平均約 222）。
- **Sonnet vs Opus hook 層 A/B 實測（031-a，10 張，同一份研究稿、同一份提示）**：兩者都通過
  機械檢查，但逐張比對 **Opus 明顯較佳 6 張、略佳 2 張、平手 2 張、Sonnet 0 勝**。
  Sonnet 三個系統性弱點：①寫聲音描述而非故事鉤；②以空泛設問收尾；③**把敏感事實委婉化**
  （The Cure 連續三次喪親被壓成「告別語調的專輯」）——正是 024 條款要防的退化。
  **裁定：hook 層維持 Opus 5。**
- **內容過濾器中斷根因查明（店主指示除錯）**：七次中斷的資料推翻「敏感題材」假說——
  被擋組平均 3.7 個風險詞、未被擋組 3.4 個，風險詞最多的一組（13 個）沒被擋、零風險詞的一組反而被擋。
  真正規律是 **7 次裡有 6 次發生在代理即將「再次輸出整批內容」的瞬間**（寫檔後又重寫／修剪／覆述驗證），
  檔案存活率高正因為擋的是**第二次**輸出。我自己的 note ≤350 字限制正是造成重寫回合的來源之一。
  對策已寫入 RUNBOOK 輸出紀律：**每組寫完立刻存檔不再整批重寫、超標只做定點修改、回報不覆述原文**。
  033 是首次全面套用：hook 兩個代理（含 031／032 都被擋過的 d–e 槽）與 writer-2 全部一次過。
- **檔案存活 ≠ 完成（032 教訓）**：writer 前被擋的 hook 檔看似完整，實為停在「補句末標點」那一步，
  20 條 hook 全缺句號。已把句末標點檢查加回 `qa-check-hooks.mjs`。
- **人名裁定（店主）**：歷史／政治人物用台灣慣用中文譯名（Patti Smith 卡的**胡志明**；沿用至 033 的
  **哈瑙戰役**），音樂圈人名維持拉丁原文。前例：Anthrax 的史蒂芬・金。
- **033 審稿實例（題材規避仍會偶發）**：GN'R《G N' R Lies》末曲爭議原寫成「歌詞引發爭議討論」，
  讀者完全不知爭議為何——改為明寫種族歧視、恐同與排外爭議（依既有原則不複述具體字眼）。
  另修 Metallica《Reload》hook 的都柏林在正文遺失、與「加州錄製」表面矛盾等 11 處。
- **QA 工具修補**：①中文數字年份正規化放寬為「一／二開頭四字」——note 寫「一九四六到一九四七年間」時
  首個年份後接「到」不接「年」，舊前瞻失敗造成誤報；②《》內原始專輯名排除於格式檢查
  （《Live ?!*@ Like a Suicide》的星號被誤判 markdown）；③簡體字表補 17 字（乐为无与软权变现等），
  Sinatra 研究稿的「乐评」原本漏網。
- 主要檔案：`desc-restyle/progress.json`、`qa-check-research.mjs`、`qa-check-hooks.mjs`、
  `qa-batch.mjs`、`fix-punct.mjs`、`RUNBOOK.md`、`batches/`（031–033 各層產物）。
- 驗證：三批 QA 全 0 標記；033 線上抽驗 **12/12** KV-HIT 且文字逐字一致，含四個特殊字元 key
  （`run‐d.m.c.` U+2010、`in times new roman…` 與 `king for a day…` 刪節號、
  `guns n’ roses|g n' r lies` 彎引號與直撇號混用）。
- 待裁定／已知疑義（未變）：`nina simone|gifted & black` 版本待實體片確認；
  `bloc party|anatomy of a brief romance`（2026-09-11）與 `phoebe bridgers|lost weekend`（2026-08-14）
  尚未發行；`seed_cards.json` 18 筆藝人名亂碼（顯示為 "Guns N??Roses"）屬卡池層清理，不在本工程範圍。

### 2026-08-01｜desc-restyle 產線精簡改版：實測 22.1k/張 → 目標 19k，RUNBOOK 全面重寫

- Repo：`dip-vinyl-shop`（僅本備忘錄）；改動在 `desc-restyle/`（RUNBOOK.md 重寫、新增 qa-batch.mjs、
  progress.json 記錄）。**未動任何已上線內容與 KV。**
- 依店主指示分析 027–030 四批實測算力：**22.1k tokens/張**（每批研究 433k＋hook 349k＋寫作 324k
  ≈ 1,105k/50 張），比 RUNBOOK 路線一的 19k 估算高約 16%。膨脹主因不是規則本身，而是：
  hook note 已長到**中位 479 字、P90 641**（note 會原样複製進寫手輸入、被讀第二次）；
  我的提示逐批堆疊逐卡點名（研究／hook／寫手三層重複同一批題材指示）；
  寫手回報 25 行全表；主會話每批手寫十多段 inline 檢查腳本。
- **六項精簡（w2-031 起適用，已寫進新版 RUNBOOK）**：
  1. hook 層 5 代理 → **2 代理**（a–c／d–e），省每代理固定開銷；研究層維持 5 組（中斷損失面小，
     歷史六次過濾器中斷有五次靠檔案存活救回）。
  2. **hook note 上限 350 字**——雙重計費的最大單一節省點。
  3. hookCandidates 上限 2 條。
  4. 寫手回報只列異常卡，不再輸出 25 行全表。
  5. 提示範本瘦身：題材通則一段取代逐卡點名；特注只留四類（事件晚於專輯的反向禁令、
     身分存疑／未發行、同名版本鎖定、同藝人分軸）；寫作層不再重複題材清單——**note 是唯一載體**。
  6. 新增 **`qa-batch.mjs`**：research／hooks／out 三個指令取代主會話每批十多段 inline script
     （key 對卡單、字元三掃描、hook 對事實表核查、字數統計一次跑完）；專名比對改拆詞，
     Lisa "Left Eye" Lopes／Maureen Yancey 這類「綽號夾中間」誤報從此消失。
- 順手修掉 w2-030 研究稿殘留：研究代理把我的括號指示抄進 album 欄（`（可能為近年新作,請先查證）`），
  及 notes 欄的半形逗號——新版研究範本已加「指示文字不得抄進資料欄」。
- 品質防線全數保留：五層流程、主會話逐張審稿、key 硬檢查、敏感題材條款、零新事實 QA 都不動；
  砍的只有重複傳輸與過長的中間產物。
- 主要檔案：`desc-restyle/RUNBOOK.md`（全面重寫）、`desc-restyle/qa-batch.mjs`（新增）、
  `desc-restyle/progress.json`（notes 記錄）。
- 驗證：qa-batch.mjs 以已完成的 w2-030 全批回歸測試，research／hooks／out 三階段皆通過，
  並實際抓出前述研究稿殘留兩處（已清）。

### 2026-08-01｜desc-restyle 027–030 四批 200 張連續上線，字元三掃描與 key 硬檢查定案

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。
- 進度：wave2 累計 **2,270 / 6,980（32.5%）**，003–030 全數上線。全程 Opus 5（研究層 Sonnet）。
  四批各 50 張，逐批細節記在 `desc-restyle/progress.json`，此處只記跨批結論。
- **執行方式**：滾動接力（一批進 hook 時下一批開研究），最高同時 12 個代理；四批研究／hook／
  寫作各層皆通過 QA 0 標記，逐批線上抽驗 5/5，另針對特殊字元 key 加驗（`[rammstein]` 方括號、
  `jane’s` 彎引號、`run‐d.m.c.` U+2010、`crystal castles|(iii)` 括號開頭、`bon iver|i,i` 逗號、
  TLC 刪節號、`édith piaf` 重音、`slipknot|.5:` 點號開頭），全數 KV-HIT 文字一致。

**這四批定案的五條管線規則（都是踩到才補上的）**

1. **字元三掃描固定進管線**：非拉丁亂碼（西里爾／天城／諺文）、簡體字、半形逗號貼中文。
   四批共抓到西里爾污染 3 處、簡體字 4 處、**整組 10 張全用半形逗號 1 次**。
   注意簡體字表必須用「簡體專用字」——制／值／台／准 都是正體字，誤列會造成大量誤報。
2. **hook 開頭雷同**改判為「前四字不可與同批任一張相同（含人名）」。實際攔到同藝人兩張
   都以 `Jim Morrison` 起首、兩張不同藝人都以 `Rick` 起首。
3. **數字一律不用千分位逗號**，改寫成「約 2.9 萬張」形式——這是半形逗號的根源，從源頭消除。
4. **key 損壞已出現三種型態**：漏 `desc2:` 前綴、只留藝人名（`|專輯` 整段消失）、
   **整行連 `｜artist｜album` 一起複製**。`build final` 前的「key 必須存在於 cards.json」是
   唯一能攔下的防線——線上抽驗驗不出來（錯 key 查錯 key 一樣回 KV-HIT）。修復一律走
   「依卡單同位置回填＋藝人名正規化比對把關」，對不上就中止。
5. **內容過濾器中斷**這四批又發生 3 次（029 hooks-d、030 hooks-e，加上先前 021／023）。
   除 023 研究 c 外**檔案皆完整存活**，先查檔再決定是否重跑，四次只真的損失一組。

**題材與品質**

- 敏感題材連續四批零縮手，且反向禁令（事件晚於專輯不寫）同樣守住。四批合計寫滿的招牌故事包括：
  Fiona Apple 母帶外流與 Free Fiona、Tears for Fears 預算失控致決裂、Megadeth 商業轉向致離團、
  Clash 的 Headon 遭開除（巴黎失蹤照更正為經紀人公關操作）、S&G 的未授權重混促成復合、
  Slipknot 的 Paul Gray 辭世、The Doors《Other Voices》的 Morrison 辭世、Beyoncé 的 CMA 種族化排斥、
  Notorious B.I.G. 身後企劃與樂評負評、Lauryn Hill 署名官司、TLC 破產與版稅、Bill Withers 與
  Columbia 決裂、Porter Robinson 的憂鬱敘事、Rammstein 的 MV 抗議事件（只陳述反應、不描述影像）。
- **零新事實防線的完整實例**：Paramore《Brand New Eyes》的「Farro 兄弟離團」只見於研究稿的
  hookCandidates、事實表未列——hook 層主動標記，寫作層照辦未寫入正文，三層各自守住、無需人工攔。
- 資料疑義處理：Bloc Party《Anatomy of a Brief Romance》查證為**尚未發行**（訂 2026-09-11），
  寫成「已宣布未上市」保守版；`m.i.a.|m.i.7`（2026-04）、`muse|the wow! signal`（2026-06）、
  `boards of canada|inferno`（2026-05-29）原標身分存疑，查證皆為真實新作；
  Édith Piaf 與 Frank Sinatra 兩張同名選輯版本鎖不定，走不寫年份廠牌曲序的保守寫法。
- **人名規則例外（店主裁定）**：歷史／政治人物用台灣慣用中文譯名，音樂圈人名維持拉丁原文。
  案例為 Patti Smith《Gung Ho》的胡志明；先前 Anthrax《Among the Living》的史蒂芬・金同屬此例。
- 主要檔案：`desc-restyle/progress.json`、`desc-restyle/batches/w2-02{7,8,9}-{final,kv}.json`、
  `desc-restyle/batches/w2-030-{final,kv}.json`。

### 2026-07-31｜desc-restyle w2-026 上線：新增亂碼掃描，三張資料疑義查清

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。
- 進度：wave2 累計 **2,070 / 6,980（29.7%）**，003–026 全數上線。全程 Opus 5（研究層 Sonnet）。
- **key 硬條款生效**：w2-025 的 key 損壞未重演，50 張研究稿 key 全數正確；build final 前的
  「key 必須存在於 cards.json」檢查照跑，final 與 KV 皆通過。
- **新增常規檢查：亂碼掃描**。研究層會偶發把非拉丁字元混進事實表——本批抓到三處
  （Orbital「трип-hop」、Nina Simone「демо帶」、Basement Jaxx「официальные專輯榜」），
  加上 w2-022 的「리फ」已是第二批出現。hook 層只零星回報一處、QA 也抓不到，因此改為
  **每批研究稿完成即掃一次，hook／寫作輸入合併後複掃**，三層一起修（本批複驗零殘留）。
- **三張資料疑義查清**：
  - `de la soul|cabin in the sky` 原疑為 1943 年同名音樂劇，**查證確為 2025 年正規第九張專輯**，
    主故事是 Trugoy the Dove 2023 年辭世後留下的未發表人聲做成致敬作——辭世早於本張，屬必寫。
    （同批《Buhloone Mindstate》1993 相反，辭世晚於專輯，明令不寫。同一位逝者、兩種判準。）
  - `jon hopkins|small craft on a milk sea` 正式掛名其實是 **Brian Eno with Jon Hopkins &
    Leo Abrahams**，簡介誠實交代掛名關係，不寫成 Hopkins 個人作。
  - `hans zimmer|diamond in the desert` 查無錄音室專輯，實為 **2025 年杜拜現場企劃**，標 thin。
  - 另 `nina simone|gifted & black` 版本無法鎖定（《Black Gold》1970 vs 同名重發，內容為 1957 年
    demo 事後加弦樂），已用不寫年份／廠牌／曲序／排行的保守寫法上線，**待店主以實體片確認**。
- 敏感題材**連續第三批零縮手**：Clapton 遭 Warner 整張退件、Paul Williams 的病與酒癮退團、
  Billy Joel 對前經紀人侵占的訴訟影射、Dylan 從惡評到 2013 翻案、Human League 惡評致 Virgin 解約、
  Adele 的離婚與 Spotify 一役、Van Halen 團名爭執、Spoon 遭撤片解約與報復單曲、CCR 逼宮、
  M.I.A. 的難民出身、Perfume Genius 的同志伴侶敘事、Basement Jaxx 的 Brixton 搶劫、
  INXS 的跨種族改詞，全部寫滿；反向禁令同樣守住。
- hook 品管與事實對照**雙零標記（連續第三批）**；審稿修 6 處，主要病灶是「格言式收語兼重述 hook」
  （「換來的是評價，不是銷量」「廠牌要的是單曲，最後也真的拿到了」這類），已逐張改回落在事實。
- 主要檔案：`desc-restyle/progress.json`、`desc-restyle/batches/w2-026-{final,kv}.json`。
- 驗證：QA 標記 0、`wrangler kv bulk put` Success、線上抽驗 5/5，另針對特殊字元與疑義卡
  （motörhead／buhlo͞one 合字／romantic? 問號／Jon Hopkins／Hans Zimmer／Nina Simone）加驗 6/6。
  **另因同日有別的會話在做全池空格回溯（也寫 KV），上線後再抽 6 張複驗，確認 026 未被其快照覆蓋。**

### 2026-07-31｜全池空格回溯收官：KV 快照掃 7,630 筆、再補 2,219 張，desc2 卡池格式全數補齊

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。
- 店主指示全面回溯。因 wave1 早期批次本機沒有 final 檔，改用 **KV 全量快照**當基準：
  export 腳本改輸出到 scratchpad 暫存檔，`kv-backup-desc2.json`（07-25 回滾基準）未動。
- 掃 7,630 筆 desc2:，**再補 2,219 張**（wave1 全部＋歷次零星殘留）。其中 **8 張補完超 280**
  （281–287，全為 wave1 冷門卡：Autechre《Confield》、Gila、Henry Cow、Xenakis《Persepolis》、
  Philip Cohran 等）——只超 1–7 字，由主會話本機**純刪除**微修（hook 不動、敏感與主故事不砍），
  壓到 268–280。
- 上傳兩包（2,211＋8）均 Success；被改 key 的原值另存回滾檔
  （scratchpad/`spacing-wave1-rollback.json`，2,219 筆）。
- **本機 w1-008〜012 final 以線上真值（快照＋spacer＋trim）反向同步**——過程中發現 10 張本機
  落後於回溯清查後的線上版本，一併校正，避免日後誰照舊流程 bulk put 舊檔把修正洗掉。
- 驗證：KV API 直查抽驗 12/12 一致且無缺空格（含全部 8 張 trim 卡）；全池複掃 2,219 筆
  仍缺空格 **0 筆**；worker 公開路徑抽驗 3/3 KV-HIT 一致。
- **結論：整個 desc2: 卡池 7,630 筆的中英空格至此全部補齊**（今日三輪合計 420＋2,219＝2,639 張）。
  021 起的新批由 hook 層提示內建規則維持，不會再產生此類缺漏。
- 主要檔案：`desc-restyle/batches/spacing-wave1-kv.json`、`spacing-wave1-trim8-kv.json`、
  `trim-wave1-{1,2}.json`、`w1-0{08..12}-{final,kv}.json`、`progress.json`。

### 2026-07-31｜補 001–014 中英空格 370 張，順帶把 52 張撐破上限的卡刪修回來

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。
- 承上一則，店主指示把空格修補延伸到 001–014。各批張數：001:41／002:23／003:33／004:18／
  005:33／006:29／**007:50（整批全中）**／008:25／009:31／010:34／011:23／012:20／013:3／014:7。
- **新問題：補完空格有 52 張衝破 280 硬上限**（281–307，最長 Rick James《Street Songs》307）。
  早期批次當初就是在「無空格」狀態下寫到接近上限，補空格等於憑空多出 1–27 字。
- 處理：發兩個 Opus「純刪修」代理壓回 250–275——只准刪除與合併、hook 一字不動、不得新增事實、
  **補上的空格不准被吃掉**、敏感事實不可為了省字整段刪（這批含 2Pac、Notorious B.I.G.、DMX、
  Iggy Pop 精神病院、Kanye 喪母等招牌內容）。
- 代理採**純字串刪除**（不重打字）並自驗「新文本必須是原文的子序列」，主會話另跑同一檢查把關。
  52 張中 50 張完全通過；2 張人工審核後放行並記錄理由：
  - Prince《Parade》：刪去與 hook 重複的《NME》句後，補「。專輯」三字讓句子完整。
  - The Temptations《All Directions》：踩禁語的「全曲榜」改「單曲榜」（該處指 Hot 100，事實不變）。
- 驗證：14 批 QA 標記 0；全域檢查「超 280」0 張、「缺空格」0 張；14 批 `bulk put` 全 Success；
  線上抽驗 **42/42** KV-HIT 且文字與 final 一致。
- **範圍結論**：w2-001～020 共補 **420 張**（370＋50），021 起 hook 層提示已內建空格規則故無此問題。
  仍未回溯的是 **wave1**（w1-001～012、batch-001、test20）：依舊紀錄，w1-001～007 與 batch-0XX
  當年直接出 KV、本機沒有 final.json，要補需先用 `export_kv.mjs` 匯出快照
  （輸出到暫存檔，**不可覆寫 `kv-backup-desc2.json`** 這個 07-25 回滾基準），待店主裁定。
- 主要檔案：`desc-restyle/progress.json`、`desc-restyle/batches/w2-0{01..14}-{final,kv}.json`、
  `desc-restyle/batches/trim-001-014-{1,2}.json` 與 `-out-{1,2}.json`、對應 input／output 檔。

### 2026-07-31｜三件修補：015–020 補空格 50 張、024 兩張改句、001–020 解除過度克制 5 張

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。

**① 補 015–020 中英數字空格（50 張）**
- 實際張數：015:1／016:19／017:0／018:24／019:4／020:2，與店主實測一致。根因是 hook 層當初沒補空格，
  寫手依「hook 一字不改」原封照抄。
- **關鍵判斷：以 `final.json` 為線上真值直接改，沒有從 output 重建**——016／018／020 有 10 張
  final≠output，那是同日回溯清查改過的內容，若重建會把那些修正洗掉。同時同步修 input 的 hook
  與 output 的 desc，避免日後重建回歸。補完最長 278 字，未破 280。
- 驗證：六批 QA 標記 0；全批不變量檢查「final 內不得再有中文緊貼英數字」六批皆 0；
  五批 `bulk put` Success（017 無異動）；線上抽驗 18/18 KV-HIT 一致。

**② 修 024 兩張句子不通**
- Carole King《Rhymes & Reasons》：破句「比這張史上最暢銷專輯之一」改為「沿用那張史上最暢銷專輯之一的
  原班人馬」，片語式短句「鋼琴主導的民謠搖滾寫作。」併入 AllMusic 那句（253 字）。
- Ella Fitzgerald《Like Someone in Love》：刪掉重述 hook 的「名字只出現這回」，懸空的 Songbook 句改成
  「這批錄音落在她龐大的 Songbook 系列企畫進行期間」（170 字，thin 卡）。
- 我第一版寫太長（294／188），字數檢查擋下未寫檔，壓合格才落地。QA 0、線上驗證 2/2。

**③ 解除 001–020 的過度克制（5 張）**
- 掃法：note 的封殺／克制條款 × 敏感題材 → 129 張；再篩「正文完全無敏感事實痕跡」→ 68 張；
  逐張人工判「事件年份 ≤ 專輯年份」→ 實際需改 **5 張**。
- 改的 5 張（原則是把空心委婉語換成中性一句，不展開細節）：
  - **Johnny Cash《At Folsom Prison》**：「事業與生活低潮」→ 補回藥物成癮（事實表本就載明）。
  - **Billie Holiday《Lady in Satin》**：「健康狀況不穩」→ 補回肝硬化確診；護士撐坐細節仍不寫。
  - **A Tribe Called Quest《We got it from here》**：原文只寫「未能親眼見到發行」等於沒交代死亡
    → 補回 2016 年 3 月因糖尿病併發症離世。
  - **Britney Spears《Blackout》**：補回「錄音那兩年始終是狗仔跟拍焦點、〈Piece of Me〉寫的正是
    媒體檢視」——不碰健康、監護權、家庭。
  - **Ariana Grande《Sweetener》**：補回 2017 曼徹斯特事件與 One Love Manchester 義演——
    不寫傷亡、攻擊者、任何醫療心理描述。
- **後兩張原事實表完全沒有來源**（研究層當初照「不著墨」指示根本沒查），因此另發研究補查，
  來源存 `desc-restyle/batches/research/fix-context-001-020.json`，並把 facts **回寫進 writer input**
  ——否則 QA 的零編造防線會直接擋下（實測確實擋了「One Love Manchester」與「2017」）。
- 其餘 63 張維持現狀，三類：事件晚於專輯（Nirvana／Soundgarden／STP／Deftones／Pantera／Type O／
  Mac Miller／Lil Peep／Crystal Castles／Brand New／Ryan Adams／Peter Tosh／Rush／Glenn Gould…）、
  正文其實已寫（Joy Division、Libertines、Gojira、Sublime、Temple of the Dog、Tricky、Mars Volta、
  Bob Marley、J Dilla、Morrissey《Low in High School》、Neil Young《Trans》…）、
  當事人隱私或未證實指控（Panic! at the Disco 家庭創傷、Sheryl Crow 的 O'Brien 之死說法）。
- 驗證：四批 QA 標記 0，五張線上抽驗 5/5 KV-HIT 一致。

**發現但未處理（待店主裁定）**：中英空格缺漏不只 015–020，w2-009 等早期批次同樣有
「睽違18年」「135000 張」這類情形；本輪僅依指定範圍處理 015–020，001–014 未回溯。

- 主要檔案：`desc-restyle/progress.json`、`desc-restyle/batches/w2-0{01,06,09,13,15,16,18,19,20,24}-{final,kv}.json`、
  `desc-restyle/batches/research/fix-context-001-020.json`、對應 `batches/input`／`batches/output` 檔。

### 2026-07-31｜desc-restyle w2-025 上線：攔到研究層 key 損壞事故，新增 key 對卡單硬檢查

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。
- 進度：wave2 累計 **2,020 / 6,980（28.9%）**，003–025 全數上線。全程 Opus 5（研究層 Sonnet）。
- **事故與新防線（本批最重要的一件事）**：研究層 a 組整組漏掉 `desc2:` 前綴、b 組更嚴重——
  key 只剩藝人名，`|專輯` 整段消失（`"dmx"`、`"foo fighters"`）。這 20 張若照原樣上線，
  會在 KV 建出 20 個垃圾鍵，真正的卡片一張都不會更新，**而且線上抽驗驗不出來**：
  抽驗是拿 final 檔的 key 去查，錯 key 查錯 key 一樣回 `KV-HIT` 且文字一致。
  舊檢查只比對「hook key 與研究稿 key 是否一致」，兩邊一起錯就漏抓。
  → **新增硬檢查：每批 build final 前必須驗「所有 key 都存在於該批 cards.json」**，
  並在寫手提示加「key 必須從輸入檔逐字複製」。修復採「依卡單同位置回填」，
  但腳本先以**藝人名正規化比對**確認對應無誤才允許寫入，任一張對不上就中止（20 張全數通過）。
- 敏感題材（024 條款持續生效，本批同樣零縮手）：2Pac《Better Dayz》身後發行與素材重製、
  Selena《Dreaming of You》遇害與四個月後遺作奪冠、Kate Bush《The Sensual World》的 Joyce
  授權完整鏈（誤判公共領域→遭拒→改寫→2011 獲准）、Chic 對〈Rapper's Delight〉提告與和解、
  Alice Cooper 的 PMRC 審查、Wu-Tang 的 ODB 受刑人電話錄音、Jarre 的挑戰者號題獻。
  **反向禁令也守住**：DMX 2021 辭世、Brand New 2017 爭議都晚於各自專輯，全篇未提。
- 研究層自查更正兩處：Motörhead《Snake Bite Love》的 Steve Vai 為誤傳（製作人是 Howard Benson）、
  Depeche Mode《Some Great Reward》錄音地是**西柏林 Hansa**，不是我下指示時誤寫的漢堡。
- hook 品管與事實對照**雙零標記**（連續第二批）；寫手審稿修 4 處（語序、指代、兩處重述 hook）。
- 主要檔案：`desc-restyle/progress.json`、`desc-restyle/batches/w2-025-{final,kv}.json`。
- 驗證：QA 標記 0、`wrangler kv bulk put` 成功、線上抽驗 5/5，另針對修復過與含特殊連字號的
  key（wu‐tang／jean‐michel jarre／a‐ha／run‐d.m.c./foo fighters／selena）加驗 6/6 全部 KV-HIT 一致。

### 2026-07-31｜desc-restyle w2-024 上線：敏感題材條款進管線提示層，Opus 5 實測零縮手

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。
- 進度：wave2 累計 **1,970 / 6,980（28.2%）**，003–024 全數上線。
- 背景：店主指示確保管線不再有「規避敏感字詞、刪減故事」。原計畫本批用 Fable 當 hook／寫作
  主引擎驗證，店主中途改令 **hook 與寫作照舊全用 Opus 5**，改以提示條款解決。
  （與同日另一會話的「政治正確回溯清查」四輪互補：那邊修既有卡，這邊管新批產線。）
- **敏感題材條款（w2-024 起寫入 hook 與寫手提示）**：爭議／失蹤／逝世／成癮／訴訟是招牌事實，
  **必須**寫進主故事鏈，不得因敏感刪減；僅三條限制（有來源、不逐字引歌詞、逝者克制），並明寫
  「**克制是指不渲染細節，不是指跳過事實**」＋逐張點名重點卡。023 的「只寫作品製作面」
  防禦性條款廢止。
- 實測（本批刻意當試金石）：Manics《Journal for Plague Lovers》Richey Edwards 手稿→失蹤→
  宣告死亡全時間線、MJ《Invincible》與 Sony 決裂並公開譴責 Mottola、Stones《Black and Blue》
  看板抵制全鏈、Whitney 婚變毒癮復出、Gaga 姑姑性侵創傷——**全數寫滿，Opus 5 零縮手、
  內容過濾器零觸發**。hook 品管與事實對照核查**首度雙零標記**；寫手審稿僅修 2 處
  （Common 指代斷裂、Cash 結尾重述 hook）。
- 事故：研究層首發五組因 Claude Code 程序中斷全滅（檔案未存活），重發時在提示加
  「每完成 3 張先存檔一次」防護。
- 驗證：QA 標記 0、`wrangler kv bulk put` Success、線上抽驗 5/5 KV-HIT 文字一致
  （抽驗含 MJ《Invincible》與 J. Cole 敏感卡）。
- 主要檔案：`desc-restyle/progress.json`、`desc-restyle/batches/w2-024-{final,kv}.json`。
- 本次依店主指示，全部完成後執行排程關機。

### 2026-07-31｜第四輪（結案）：三張懸案定案，政治正確回溯清查全部完成

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。
- 前三輪一直掛著的三張「事件早於專輯、但無來源」待決卡，發研究補查後定案：
  - **Bob Marley《Uprising》改**：補回 1977 年確診腳趾黑色素瘤、因 Rastafari 信仰拒絕截肢
    （AIM at Melanoma 等機構與傳記交叉）。與〈Redemption Song〉創作的直接關聯只有 Rita Marley
    說法的二手轉述，**不寫進正文**。順手修掉身體重述 hook 的「原有樂團編制版本」句。
  - **Björk《Utopia》改**：補回她本人 2017 年 Dazed 專訪自述——這是她的「Tinder 專輯」、寫
    《Vulnicura》分手之痛過後的墜入愛河與烏托邦追尋（一手引述、NME／i-D 等多家轉引一致）。
  - **DMX《Grand Champ》維持現狀**：查了 2002 年案件、2003 年 6 月案件與 Rolling Stone 訪談，
    沒有任何一件與本張歌詞、錄製或宣傳有記載的因果關聯——**不為了補而硬塞流水帳**。
- 兩張改動 QA 0、KV 覆寫後線上驗證 2/2 一致；facts 已回寫 writer input、舊封殺條款標記作廢。
- **結案總計**：四輪掃描（w2 note 封殺條款 → 軟性抹除＋委婉語 → KV 全量 7,630 張 → 懸案補查），
  共改 **21 張**＋Anthrax 人名一致性；每一張都補查來源、跑 QA、逐張線上驗證。三個判定
  「維持現狀」的類別：事件晚於專輯（47 句）、查無來源且與專輯無故事關聯（DMX）、
  本來就已寫進正文的（Ice Cube、Sheryl Crow、Smashing Pumpkins《Adore》等）。

### 2026-07-31｜第三輪收尾：改用 KV 全量快照掃完 7,630 張，補最後 2 張

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。
- **發現覆蓋漏洞**：前兩輪都只掃 `w2-*` 的檔案，但 **wave1 的 w1-001～007 與 batch-0XX 沒有本機
  `-final.json`**（當年直接出 KV，沒留 final），磁碟掃描根本掃不到那批。已改用
  `export_kv.mjs` 匯出 **KV 全量快照 7,630 筆**來掃（腳本輸出改到暫存檔，**不可覆寫
  `kv-backup-desc2.json`**，那是 07-25 的回滾基準）。
- 全量掃描結果：空心委婉語剩 4 張、「提到遺作／生前最後卻未交代死亡」在排除「驟逝／猝逝」
  誤報後為 **0 張**。wave1 的 note 掃出 17 張候選，逐張比對線上現值後多數其實寫得很完整——
  Bob Dylan《Desire》整段寫 Hurricane Carter 冤案與 1985 年認定的種族偏見、Slayer《Reign in Blood》
  的 Mengele 爭議正反並陳、RATM 的釋廣德自焚封面與拒絕 Epic 刪詞、Nirvana《MTV Unplugged》有寫
  「距 Cobain 辭世約七個月」、Ted Lucas 連死因都寫。**wave1 沒有系統性的自我審查。**
- 實際再改 2 張：
  - **Sufjan Stevens《Carrie & Lowell》**：事實表明寫「2012 年因胃癌過世」，是 note 軟化成
    「一句事實帶過即可」導致寫手把死因省掉。已補回（並縮短錄音地點那句以守 280 上限）。
  - **Nat King Cole《Welcome to the Club》**：「Basie 本人因故未參與」屬**資料缺口而非審查**，
    查證為合約因素無法參與、由 Gerald Wiggins 頂替，已改精確。
- 三輪合計改 19 張（12＋5＋2）＋Anthrax 人名一致性，全部 QA 0、線上逐張驗證 KV-HIT 文字一致。
- 主要檔案：`desc-restyle/batches/fix-round3-{final,kv}.json`、`w2-021-{final,kv}.json`、`progress.json`。

### 2026-07-31｜第二輪清查：非年份型的自我審查，再補 5 張＋Anthrax 人名一致性

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。
- 店主追問「還有沒有其他因政治正確刪改的內容」。第一輪只用「封殺式措辭＋事件年份 ≤ 專輯年」兩條篩，
  抓不到**軟性抹除**（不是禁寫，而是要求寫成中性套話）與**整段缺席**（根本沒進正文）。改用三種抓法：
  1. note 的軟性抹除：「不加評價／不定性／不影射／中性措辭」× 敏感題材 → 命中 32 句；
  2. 已上線正文的空心委婉語（一場意外／個人風波／健康因素…）→ 命中 3 張；
  3. **身後發行／遺作卡但正文完全沒交代死亡** → 這條抓出最嚴重的兩張。
- 再改 5 張：
  - **John Lennon《Milk and Honey》**：1984 年身後發行，正文只寫「生前未及完成」「身後發行」，
    **全篇沒提他 1980 年 12 月遇害**。已補「同年 12 月 8 日他在紐約遇害，錄音停在半途」。
  - **J Dilla《Rebirth of Detroit》**：2012 年身後發行，正文連他已離世都沒寫。已補死因與得年。
  - **Mastodon《Crack the Skye》**：Skye Dailor 的死因被抹成「早逝」，已改為「1990 年輕生離世、得年 14」；
    **另更正既有錯誤**——兩個來源都指她是 Brann Dailor 的妹妹，原文寫成姊姊。
  - **Kendrick Lamar《Mr. Morale》**：〈Auntie Diaries〉的用詞爭議與 Kodak Black 客座爭議整段缺席，
    兩者都與專輯同年。已補一句只陳述「有這首歌／有這位客座」與「引發正反討論」，不下定性判斷。
  - **Al Green《Full of Fire》**：前一輪是我自己寫成「發生一場意外」——**性質寫錯**（不是意外），
    而且事實表本來就有完整記載。已改為精確陳述（相識女子潑灑滾燙食物致燙傷、隨後在屋內自戕）。
- **Anthrax《Among the Living》**：hook 寫「史蒂芬・金」、正文寫「Stephen King」，同一張卡中譯與拉丁名
  並存。店主裁定以 hook 為準，正文改為「史蒂芬・金」——此卡是「人名一律拉丁原文」的明確例外。
- 判定為維持現狀並回報店主的三張：Björk《Utopia》（離婚背景，屬前作脈絡且無來源）、
  DMX《Grand Champ》（法律事件早於專輯但事實表無可引來源）、Bob Marley《Uprising》（1977 診斷早於專輯，
  但本張故事軸不在病情）。要補都得再發研究。
- 主要檔案：`desc-restyle/batches/research/fix-events-c.json`、`batches/fix-round2-{final,kv}.json`、
  同步 `w2-{010,016,020}-{final,kv}.json` 與各卡 writer input、`progress.json`。
- 驗證：QA 標記 0；`wrangler kv bulk put` Success；5 張＋Anthrax 全部線上 KV-HIT 文字一致。

### 2026-07-31｜封殺條款回溯清查：全 wave2 掃 note，12 張補回專輯發行前的事件

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。
- 承上一則的題材裁定，回頭掃 `batches/input/w2-*-writer-*.json` 全部 48 檔（約 1,150 張卡）的 note，
  找「封殺式措辭（不著墨／一律不寫／零觸碰…）」命中 **628 句**，再依店主給的兩條篩選：
  **①用了封殺式措辭 ②該事件年份 ≤ 專輯發行年份**，篩出 **12 張**改寫。
  事件發生在專輯之後的一律維持現狀（Cobain 1994 之於《Bleach》1989、Dimebag 2004 之於
  《Far Beyond Driven》1994、SOPHIE 2021、Jesse Lacey 2017、Whitney、Sinéad… 共 47 句）。
- 改寫的 12 張與補回的事件：Temple of the Dog／Andrew Wood 1990 逝世（整張就是悼念他）、
  The Mars Volta《De-Loused》／Julio Venegas 1996 與 Jeremy Ward 發行前一個月離世、
  《Frances the Mute》／Ward 死因、Tricky《Maxinquaye》／生母輕生（專輯名就是她）、
  J Dilla《Donuts》／病名 TTP 併發狼瘡、Anthrax《Among the Living》／題獻對象 Cliff Burton 1986 事故、
  Elton John《Jump Up!》／Lennon 1980 遇害、Nujabes《Spiritual State》／2010 車禍、
  Al Green《Full of Fire》／1974 事件與受任牧師的因果、Morrissey《Maladjusted》與《Low in High School》／
  政治爭議、Dizzee Rascal《Showtime》／2003 年 Ayia Napa 遇刺。
- **規則①「事實要有來源」沒有跟著移除**：10 張先發背景代理補查雙來源才改寫，2 張（Tricky、Donuts）
  的事實原本就在 facts 表、只是被 note 擋掉。Dizzee 那筆前一輪標「未查證」，這次找到 NME 2003 年 7 月
  同期報導才寫；攻擊者身分只有單方說法，不寫。
- **克制的界線**：自殺類只寫事實不寫方式（Venegas 寫「輕生離世」不寫細節），死因寫病名或事故類型
  但不寫傷勢；Al Green 那筆不描寫經過、不把當事女子工具化；Morrissey 兩張只陳述已發生的演出、歌詞
  與當時媒體反應，不下「是否構成種族主義」這類定性判斷。
- 補查到的事實已回寫進對應的 writer input，並在原 note 註記「封殺條款作廢」，保持記錄真實。
- 主要檔案：`desc-restyle/batches/research/fix-events-{a,b}.json`、`batches/fix-events-{final,kv}.json`、
  同步更新 `w2-{004,010,016,018,020,021,022}-{final,kv}.json` 與各卡 writer input、`progress.json`。
- 驗證：QA 標記 0；`wrangler kv bulk put` Success；**12 張全部線上驗證 KV-HIT 且文字一致（12/12）**。

### 2026-07-31｜店主裁定：簡介題材沒有禁區，14 張被自我審查掉招牌事實的卡重跑

- Repo：`dip-vinyl-shop`（僅本備忘錄）；產出在 `desc-restyle/` 與 Worker KV。
- **起因**：主會話為了閃 API 內容過濾器，在子代理提示裡自行加了「政治爭議／私生活／法律糾紛／
  死因／成癮一律不寫」的限制。結果整張唱片最值得講的事實被寫掉——**Iron Maiden《Piece of Mind》
  漏掉封面上被腦葉切除、鎖在精神病院裡的 Eddie**（那正是這張的招牌）、Nas《Life Is Good》的離婚
  題材被寫成「個人生活變動」、Morrissey《California Son》只剩選曲、Steven Wilson〈Raider II〉沒
  點名 Dennis Rader、Nina Simone 與 Ella Fitzgerald 兩張都被寫薄。店主退貨。
- **裁定（已寫進 `RUNBOOK.md` 新增的 0b 節，優先於任何自訂防護）**：唱片史上的爭議、犯罪題材、
  成癮、離婚、政治立場、封面爭議**全是可寫題材，往往就是招牌事實，一律照寫**。只保留三條限制：
  ①事實要有來源；②不逐字引歌詞（版權）；③涉逝者與受害者語氣克制——**克制＝不獵奇、不渲染、
  不消費，不是不准寫**，死因與事件本身平實寫出即可。遇過濾器中斷的正確處置是拆小批、聚焦作品面
  （寫封面設定與歌曲題材來源，而非犯罪過程）、邊查邊存檔，**不是把題材拿掉**。
- **重跑範圍 14 張**：w2-023 c 組 10 張＋Steven Wilson《Grace for Drowning》（021）、
  Fleetwood Mac《Kiln House》、Carole King《Welcome Home》、J Dilla《Batch #2》。
  重研究（3 agent）→ 重寫 hook（3 agent）→ 重寫作（2 agent）→ 覆寫 KV。
- 重研究順帶糾正主會話提示裡的兩個錯誤：Alan Parsons 是 2013 年《The Raven That Refused to Sing》
  的混音者、**與《Grace for Drowning》無關**；Rick Evers 得年 31 非 32。另攔下三筆會誤導的數據：
  〈Don't Let Me Be Misunderstood〉原唱名次兩輪研究不一致（131／134）故禁寫數字、
  〈Mississippi Goddam〉**不收錄於《Broadway-Blues-Ballads》**只能寫成同期背景、
  Yann Tiersen 的「UK 第 34 名」是官方榜的 **Record Store Chart 唱片行專榜**不是專輯總榜。
- 審稿修 1 處：Steven Wilson 那張把「查不到他本人的公開說法」這句研究過程語言寫進正文，刪除。
- 主要檔案：`desc-restyle/RUNBOOK.md`（新增 0b 題材規則）、`desc-restyle/progress.json`、
  `desc-restyle/batches/research/w2-023-rerun-{a,b,c}.json`、`batches/hooks/w2-023-rerun-hooks-*.json`、
  `batches/w2-023-rerun-{final,kv}.json`；並回寫 `w2-021-final.json`／`w2-023-final.json` 與兩份 kv 檔，
  讓磁碟與 KV 一致。
- 驗證：QA 標記 0；`wrangler kv bulk put` Success；**14 張全部（非抽樣）線上驗證 `X-Cache: KV-HIT`
  且文字與 final 完全一致（14/14）**。

### 2026-07-31｜desc-restyle wave2：021／022／023 三批 150 張上線，產線加四支腳本與兩道新防線

- Repo：`dip-vinyl-shop`（僅本備忘錄）；實際產出在 `desc-restyle/`（非 git 追蹤）與 Worker KV。
- 進度：wave2 累計 **1,920 / 6,980（27.5%）**，003–023 全數上線。三批的逐批細節記在
  `desc-restyle/progress.json`，此處只記跨批結論。
- **021（復工批）**：writer-1 重發（Opus 一次到位、QA 首輪 0 標記）；writer-2 沿用中斷前初稿改發
  「純刪修」代理，21 張從 286–462 字壓到 171–240 且 hook 全部原封。**刪修代理最後被 API 內容過濾器
  中斷，但檔案已完整存活**——再次驗證「先查 `batches/` 檔案再決定是否重跑」這條。審稿修 6 處。
- **022**：hook 品管新增**「hook 對照研究事實表」自動核查**（比對 hook 內曲名／西文專名／年份是否
  存在於 facts blob）。抓到 Stan Getz《West Coast Jazz》研究稿孤證「五個樂手全是東岸出身」
  （樂手出身地實際分歧），主會話改軸為「拍片檔期順手把夜店同台樂手拉進棚」並在 note 禁寫岸別。
  寫手審稿修 2 處：Dream Theater 憑空補上 John Petrucci（人對、但事實表沒有，零新事實防線攔下）、
  DMX 身體整句重述 hook。
- **023**：研究層 c 組（Morrissey／Nas／Iron Maiden）**被內容過濾器擋下且檔案未存活**，拆成兩個
  5 張代理並加三條防護後重跑成功：只寫作品與製作面、不逐字引歌詞或爭議發言、每 2–3 張先存檔一次。
  審稿抓到研究層年份錯誤：My Morning Jacket《Evil Urges》寫「2008 年葛萊美入圍」，但《In Rainbows》
  得獎是 2009 年 2 月第 51 屆，**已溯源修正研究稿與寫作輸入檔**，簡介改為不寫年份。
- **系統性破口（新發現）**：hook 層產出常漏「中文與英數字間半形空格」（「1982年」「第147名」），
  寫手因「hook 一字不改」原封照抄。抽查已上線的 016–020，250 張中 51 張帶此問題。021 起改為
  **寫手前先對 hook 跑 spacer、輸出稿再跑一次**；舊批次未回溯，待店主決定是否重刷。
- 新增檔案（`desc-restyle/`）：`qa-check-hooks.mjs`（hook 自動品管，全形計字把半形折半、禁語、
  引號整句包裹、note 主故事鏈箭頭、開頭雷同、半形標點只在貼中文時才算誤用）、
  `merge-writer-input.mjs`（合併時自動把 facts 物件轉字串）、`build-final.mjs`（產 final＋kv 並擋
  字數異常）、`fix-spacing.mjs`（中英數字補空格，預設 dry-run）。`qa-check-research.mjs` 的 hook
  前綴比對改為忽略空格差異，配合 spacer 補丁。
- 主要檔案：`desc-restyle/progress.json`、`desc-restyle/qa-check-hooks.mjs`、
  `desc-restyle/merge-writer-input.mjs`、`desc-restyle/build-final.mjs`、`desc-restyle/fix-spacing.mjs`、
  `desc-restyle/batches/w2-02{1,2,3}-{final,kv}.json`。
- 驗證：三批各 50 張 `qa-check-research` 標記 0；`wrangler kv bulk put` 三次皆 Success；
  線上抽驗各 5 張全部 `X-Cache: KV-HIT` 且文字與 final 完全一致（15/15）。

### 2026-07-27｜抽卡試聽：返回首頁沒收掉＋暫停鈕硬切，兩處都修

- Repo：`dip-vinyl-shop`
- 店主回報兩個問題（抽卡結果頁，即「直接來一張」／「類型挑片」／「心情選歌」共用的
  `gpPlayPreview` 路徑，非對戰頁）：
  1. 試聽播放中按「← 返回首頁」，音樂**繼續在背景跑**，沒有跟著收掉。
  2. 播放中按暫停鈕，音樂**突然停止**（硬切），沒有淡出。
- 根因：
  1. `setActiveTab()` 原本只在離開 `album-search` 時停播放器，抽卡結果頁
     （`currentView='genre'`）完全沒有對應處理——`genreModal` 只是被
     `classList.remove('open')` 收起來，播放器仍在跑。返回首頁走的正是 `setActiveTab('home')`。
  2. `gpStopPreview()` 呼叫的是無參數的 `stop()`，等同 `{fade:false}` 硬切。
- 改動（都在 `index.html`，播放器端不用動）：
  - `gpStopPreview()` 加上 `{ fade = false }` 參數並傳給 `DipPlayer.stop()`。
  - 暫停鈕（`gpPlayPreview()` 內的 toggle 分支）改傳 `{ fade: true }`。
  - `setActiveTab()` 增加 `if (tab !== currentView) gpStopPreview({ fade: true })`，
    離開抽卡結果頁（返回首頁或切去任何其他分頁）都會淡出收掉。
  - **刻意不改**「換下一張卡」的兩處（抽卡流程開頭的 `gpStopPreview()`）：
    那裡緊接著就有新的 `playAlbum` 接手，淡出只會拖慢起播。
- 主要檔案：`index.html`
- 驗證：桌機實測「直接來一張」，攔截 GainNode 取樣——
  暫停鈕 0.454→0.411→…→0 走滿 1.5 秒；返回首頁 0.457→0.415→…→0 走滿 1.5 秒且回到 home；
  「再一張（3）」換卡時 gain 全程維持 0.5 不淡出、直接接手新曲（符合預期）；
  回頭複測搜尋專輯關詳情仍為 0.45→…→0 正常淡出，未被本次改動影響；console 無錯誤。

### 2026-07-27｜卡池發行年份回填：取數腳本與 50 張抽樣驗證（dip-vinyl-shop）

- 目標是在藝人／專輯下面多顯示四位數發行年。新增 `scripts/build-release-years.mjs`：
  **MusicBrainz release-group 的 `first-release-date` 為主來源**（原始發行年），
  Apple `/lookup` 的 `releaseDate` 只做交叉驗證——**Apple 對老盤常回再版年，不可當主來源**，
  抽樣裡兩筆 `check` 都是這個原因（Ohio Players《Pleasure》MB 1972／Apple 2023、
  Gap Band IV MB 1982／Apple 1979），兩次都是 MB 對。
- 判定分級：`ok`（MB 命中且與 Apple 差 ≤2 年）／`ok-no-cross`（MB 命中、無 Apple 可比）／
  `check`（差 >2 年，人工看一眼）／`miss`（MB 無可信匹配）。輸出 `data/release-years-report.json`。
- 抽樣採**分層**（sha256 排序取樣，確定性可重跑）：40 張全池隨機 + 10 張 CJK。
  混在一起抽會完全看不出 CJK 這個破口——第一版 42/50＝84%，但**隨機層 98%、CJK 層只有 30%**。
- CJK 低命中的根因**不是 MB 沒收錄**，是卡池 artist 欄位為複合名（「蘇打綠 sodagreen」
  「茄子蛋 EggPlantEgg」「MC HotDog 熱狗」）→ MB 查詢 0 筆。加了兩條 fallback：
  ① **複合名拆成 CJK 段／拉丁段各查一次**（`split-artist`）；
  ② 前面都 0 筆時**只查專輯名、靠藝人 token 重疊認人**（`loose`，例如 Tony Williams
  早期掛 Anthony Williams），loose 一律進人工複查桶、**不寫進資料檔**。
- 加完 fallback 後 **46/50＝92%（隨機層 40/40＝100%，CJK 層 6/10＝60%）**。
  `split-artist` 救回的三張華語盤年份與 Apple 完全一致（茄子蛋 2017／MC HotDog 2012／
  蘇打綠 2015），loose 救回的 Tony Williams《Life Time》1964 也與 Apple 相符。
- 仍 miss 的 4 張全是**日本爵士小廠盤**（清水靖晃《Kakashi》、宮間利之とニューハード、
  山本剛トリオ《Speak Low》、福村博クインテット），其中只有清水靖晃有 Apple 年份可補。
  這類就是最後要靠 Apple 或 AI 消歧義的殘餘。
- MB 平均 **1.18 次請求／張**（只有第一輪沒中才走 fallback），全池 8193 張推估約 3 小時。
- 全池首跑 7931/8193＝96.8%，但複查時抓出**四個匹配 bug，全部已修**（都寫進腳本註解）：
  1. **空字串比對**：西里爾／希臘字母正規化後是 `''`，而 `任何字串.includes('')` 恆為真 →
     Fela Kuti 認到 Тимати、Deep Purple 認到 Марлины。空字串一律不得參與比對。
  2. **NFKD 拆解韓文**：韓文音節被拆成 Jamo（U+1100 區）後被字元類別濾光，同樣變空字串。
  3. **短名 substring**：`'wire'.includes('wir')` → Wire 認到 Wir。拉丁名要求較短那邊 ≥4 字，
     CJK ≥2 字（「王菲」不能被擋）。另加停用詞表：只共用一個 `the` 就配對會讓
     The Beach Boys 認到 The Swift，只共用 `trio` 會讓 Vince Guaraldi Trio 認到 Eric Byrd Trio。
  4. **最嚴重、且交叉驗證抓不出來的**：熱門老盤在 MB 有一大票同名合輯／紀念盤、score 全是 100，
     原版被擠出前十（查 Santana《Santana》前十筆全是 Compilation，1969 原版不在裡面）→
     拿到再版年（Santana 1997、Elvis Presley 2007、Camel 2013、Deep Purple 2014）。
     修法是**在查詢層擋掉**：`AND primarytype:album AND -secondarytype:compilation AND -secondarytype:live`
     ＋ limit 10→25，四張立刻全對。卡池本身收的現場盤／EP 會被這層擋光，所以保留
     不過濾的第二階段（`exact-any-type`），多候選時一律取 `first-release-date` 最早者。
     **這個 bug 不能靠 Apple 交叉驗證發現**——Apple 上架的常常也是 remaster，兩邊會一致地錯。
- 新增 `--recheck`（只重跑上一輪報告裡的非 ok 卡）與 `--only <清單檔>`（補跑指定卡片），
  兩者結果都**疊加**進既有資料檔（不整份覆寫），修嚴後不再成立的舊值會被撤掉。
- **實測錯誤率只有 1.8%**（新舊兩版比對前 551 張，10 張年份改變）。所以全池重跑不是因為錯得多，
  而是因為那 1.8% **無法用交叉驗證定位**——MB 與 Apple 會一致地錯，只能整批重算才知道是哪幾張。
  錯的都錯很大：Elvis Presley 差 51 年、Deep Purple《Made in Japan》差 42 年、Camel 差 38 年。
- 這次比對也揪出**修 bug 引入的回歸**：為了擋 `'wire'.includes('wir')` 而要求「較短那邊 ≥4 字」，
  結果把 3 字藝人名全害了——Can 的首版在 MB 掛「The Can」，`can` 只有 3 字配不上，
  1969 原版變成 2012 再版。修法是**在長度規則之前先做去冠詞比對**（`credited.replace(/^the/,'')`）。
  受影響 186 張／70 位藝人（R.E.M.、U2、N.W.A、Yes、War、Nas、SZA、Neu!、Low、TLC…），
  清單存 `data/short-artist-cards.json`，用 `--only` 補跑即可，不必再全池重來。
  **教訓：改比對規則後要拿新舊結果對跑一次 diff，不能只看總命中率——命中率不會掉，年份卻悄悄變錯。**
- **腳本只在跑完才寫檔，中途關機／中斷等於整批白跑**（第二次全池跑到一半時遇到要關機）。
  應急做法是解析跑批的 stdout 逐行輸出（含 verdict／MB 年／Apple 年／matchLevel，足以重建資料檔），
  存成 `data/release-years-partial.json`＋剩餘清單 `data/remaining-cards.json`。
  **待辦：腳本應該每 N 張就落一次檔。**

#### 2026-07-28 複查收尾：99.8% 覆蓋，只剩 15 張查無

- **名稱別名是補齊殘餘的關鍵**。三方全查無的 43 張，絕大多數不是資料庫沒收，而是卡在寫法：
  縮寫（OMD＝Orchestral Manoeuvres in the Dark）、俗稱括號（`Weezer (Blue Album)`）、
  日文原名 vs 羅馬字（`Sheena Ringo` 要查「椎名林檎」）、掛在別的團名下
  （Spinetta《Artaud》其實掛 Pescado Rabioso、Mos Def & Talib Kweli 掛 Black Star）。
  → 新增 `data/query-aliases.json`＋`scripts/fill-missing-years.mjs`，兩輪補回 28 張。
  **填錯別名只會查無、不會生出假年份，所以可以放心試。**
- 最終 **99.8%**：seed 7546/7558、apex 632/635、資料檔 8173 筆、離譜值 0。
- 覆寫表再添兩筆：`Weezer (Blue Album)` 1992→**1994**（Discogs 有早於發行的 1992 壓片登錄，
  「取較早」會踩到）、`Public Image Ltd. — Public Image: First Issue` **1978**（查得到但重跑時
  該次請求落空，屬網路波動，直接固定值）。
- **仍無年份 15 張**（多為自由爵士與冷門私盤：Horace Tapscott、Anthony Braxton、
  Art Ensemble of Chicago、Michael A. Grant、K. Leimer，以及台灣獨立盤黃玠、董事長樂團、
  Mary See the Future）。前端對無年份的卡本來就不顯示該行，不影響版面。
- 一筆待抽驗：`Chet Baker — Chet Baker Live in Tokyo` 取到 2000（Discogs 單一來源），
  但該場錄音實際在 1987、1988 首發，2000 很可能是再版年。

#### 2026-07-28 上線與複查：99.5% 覆蓋，前台已顯示年份

- **前台已上線**：卡片詳情 `.cd-year`、抽卡結果頁 `.quiz-result-year`，年份讀卡池本體
  （同 URL 走瀏覽器快取＝零額外請求）。本機實抽驗證 Coltrane《Ascension》1965、
  Elvin Jones 1968、Jodeci 1991 皆正確；無年份的卡該行 `:empty` 高度為 0，不留空白。
- **判定規則放寬後覆蓋率 99.0%→99.5%**（seed 7519/7558、apex 631/635、資料檔 8145 筆）：
  - `majority` 門檻從「完全相等」放寬到 **±3 年**（各庫差一年半載很正常：發行月份跨年、
    地區首發不同）。原本 113 張 three-way-split 裡有 42 張其實是共識。
  - 新增 `single-source`：只有一方查得到就採信但列入複查。實測這批多半正確
    （Carpenters《Close to You》1970、Coltrane & Hartman 1963、Santigold 2008）。
  - 取值優先用 MB 的 first-release-date（語義就是原始發行年）；MB 不在共識組時才取較早者。
- **同名不同團是最難的一類，三方投票抓不到**（錯的兩方會互相背書）：
  `Placebo — Placebo` 被標成 1974（MB 與 Discogs 都配到比利時同名爵士搖滾團），實際是 1996；
  `Jungle — Jungle` 標成 1969（配到 60 年代同名團），實際 2014。
  判別靠 **Apple 的藝人身份**（collectionId 是我們比對過的那張碟）＋ Discogs 壓片年份分佈
  （原版會有一整批再版壓片：Placebo 1996 有 26 片，比利時團 1973／1974 各只有 1 片）。
  → 新增人工覆寫表 `data/year-overrides.json`（填原名即可，鍵由腳本正規化），最後套用、優先於一切自動判定。
- **試過但放棄的規則**：用「壓片數佔比最高的年份」取代「取最早」。這會把大量正確的原版年
  改成 remaster 年——老盤原版登錄數本來就少（Max Roach《We Insist!》1961→2020、
  Os Mutantes 1968→2006、Monk《Alone in San Francisco》1959→1986 全被改錯）。
  **壓片數多寡只能拿來「標記可疑」，不能自動改值。** 保守標記出 20 張，人工看過只有上述 2 張真錯。
- 仍有 **251 張待複查**（`data/years-pending-review.json`），絕大多數是 single-source
  （已寫入、建議抽驗），其餘是三方都有值卻互相差很遠的真分歧。

#### 2026-07-28 完成：全池年份定版並寫入卡池

- **最終覆蓋率 99.0%**：`seed_cards.json` 7481/7558（第 7 欄）、`apex_pool.json` 626/635（第 4 欄），
  年份資料檔 `data/release-years-v1.json` 共 8102 筆。離譜值 0；年代分佈合理
  （1970s 1468／1990s 1377／2010s 1379 為大宗，最早 1918 Beethoven 早期錄音，最新 2026）。
- 抽驗 9 張已知案例全對，含這輪踩過的全部錯誤：Santana 1969、Elvis Presley 1956、
  Deep Purple《Made in Japan》1972、Camel 1975、Can《Monster Movie》1969。
- Discogs 裁決 657 張：majority 351／discogs-only 154／three-way-split 113／unresolved 39。
  併回時覆寫 23 筆、新增 268 筆。**待人工複查 306 張**存 `data/years-pending-review.json`
  （含 154 張 discogs-only——已寫入但屬單一來源，建議抽驗）。
- **踩到的坑：`--only` 與 `--recheck` 都寫同一個 `release-years-recheck-report.json`**，
  後跑的會把前面的整份蓋掉。續跑 4331 張的待驗清單就是被短名補跑（186 張）洗掉的，
  導致 Discogs 只裁決到 6 張（真正應該是 657 張）。
  補救：新增 `scripts/rebuild-pending-from-logs.mjs`，從跑批 stdout 依行號對回清單索引重建
  （逐行輸出含 verdict／MB 年／Apple 年，足以還原）。
  **待辦：報告檔名應該跟著 --only 的清單檔名走，不要共用同一個路徑。**
- `discogs-only` 改為「採信但一併列入複查清單」：單一來源沒有第二方背書，而 Discogs 未必收得到
  原版壓片（山本剛トリオ《Speak Low》只有 1999 再版，原版 1975 沒收）。
- 修 `build-seed-genres.mjs` 的 apex 洗檔 bug：原本把每列重建成三元素，會把第 4 欄年份整批抹掉，
  改為只覆寫第 3 欄。**這是往後任何補欄位腳本都要注意的模式。**
- 前端（`index.html`）已加顯示：卡片詳情 `.cd-year`、抽卡結果頁 `.quiz-result-year`，
  年份從卡池本體讀（同 URL 走瀏覽器快取＝零額外請求）。**尚未提交、尚未上線**，等人工看過樣式再推。

#### 2026-07-28 續跑、checkpoint 與無人值守收尾

- **補上 checkpoint**：`build-release-years.mjs` 現在每 200 張就把 `release-years-v1.json`
  落一次檔（原本只在跑完才寫，中斷等於白跑）。中止後直接 `--only` 接續即可。
- **續跑前務必先換基底**：`--only`／`--recheck` 是疊加模式，會疊在現有 `release-years-v1.json` 上。
  昨天那份是**第一次跑的舊版（含 1.8% 再版年誤差）**，直接續跑會把舊誤差留下來 →
  先把 `release-years-partial.json` 的內容換成基底才續跑。
- 新增 `scripts/merge-year-sources.mjs`：把 Discogs 三方裁決結果併回資料檔。
  只採信 `majority`（至少兩方同年）與 `discogs-only`（MB 查無、Discogs 查到）；
  `three-way-split`／`unresolved` 一律不寫入，另存 `data/years-pending-review.json` 待人工。
- 新增 `scripts/finish-and-shutdown.ps1`：無人值守收尾（等跑批 → 補跑短名 → Discogs →
  合併 → commit/push → 關機）。**任一步失敗就不關機**並保留現場，關機前留 5 分鐘可 `shutdown /a` 取消。
- **踩到的坑：`.ps1` 一定要存成 UTF-8 with BOM**。Windows PowerShell 5.1 讀無 BOM 的 UTF-8
  會當成 ANSI，中文註解與訊息全變亂碼，引號配對錯亂後直接變成語法錯誤（進程秒退、log 都來不及建）。
  更麻煩的是 `[PSParser]::Tokenize` 配合 `Get-Content` 檢查時會給**假陽性**，看起來語法沒問題。
  寫入時用 `[System.IO.File]::WriteAllText($path, $text, (New-Object System.Text.UTF8Encoding $true))`。

#### 2026-07-27 收工狀態與明天的續跑步驟

- 第二次全池跑在 **3862/8193** 停下（手動中止），已保存 **3681 筆年份**於
  `data/release-years-partial.json`；分佈 ok 3107／ok-no-cross 376／check 152／
  loose-confirmed 46／check-loose 28／miss 153。
- `data/release-years-v1.json` 仍是**第一次跑的舊版 7829 筆**（含 1.8% 再版年誤差），
  尚未被新版覆蓋；前端與 `seed_cards.json` **完全沒動過**。
- 續跑順序：
  1. `node scripts/build-release-years.mjs --only data/remaining-cards.json`（4331 張，約 100 分鐘）
  2. `node scripts/build-release-years.mjs --only data/short-artist-cards.json`（186 張短名回歸，約 5 分鐘）
  3. `node scripts/verify-years-discogs.mjs`（Discogs 三方裁決 miss／check／check-loose）
  4. 合併 partial 與上述結果 → 定版 `release-years-v1.json`，再談寫入卡池與前端顯示。
- 新增 `loose-confirmed` 判級：loose 本身不夠格寫入，但只要 Apple 這個獨立來源給同一年份
  就互相背書、可直接採信（實測 91 張可對照者有 83 張相符），不必人工。
- 加入 **Discogs 當第三方裁判**（`scripts/verify-years-discogs.mjs`），只跑 miss／check／
  check-loose，不做全池重查。要點：
  - **不能用「MB 與 Apple 取最舊」這種通則**——Gap Band IV 是 MB 1982／Apple 1979，取最舊反而寫錯；
    Apple 兩個方向都會偏，用一種錯換另一種錯，而且新錯誤沒有訊號能發現。
  - 查 `type=release` 取最早壓片，**不查 master**：master 的 year 未必是原始年
    （山本剛トリオ《Speak Low》master 標 1999，原版是 1975）。要濾掉 compilation／unofficial。
  - **Discogs 幾乎不索引 CJK 原名**：查「清水靖晃」0 筆、查 `Yasuaki Shimizu` 命中 1982 →
    新增 `data/artist-romanization.json` 對照表（卡池共 124 位 CJK 藝人／216 張卡，其中 52 位
    名稱本身已含英文，腳本會自動抽拉丁段）。只收有把握的，寧可留空——轉寫錯只會查無，硬猜會配到別人的碟。
  - 成效：福村博クインテット《Morning Flight》1977、宮間利之とニューハード《Sunday Thing》1976
    這兩張 MB 與 Apple 都查無的日本爵士盤被救回；三方投票也把 Apple 的偏差壓過去
    （Gap Band IV → 1982、Ohio Players《Pleasure》→ 1972）。
  - **token 存 `dip-vinyl-shop/.discogs-token` 並已加進 `.gitignore`**，腳本優先讀環境變數
    `DISCOGS_TOKEN`。此 token 曾貼進對話，應視為已洩漏、用完換一個。
- 兩個踩過的坑，寫在腳本註解裡：① Node `fetch` 預設不逾時，跑批一定要帶 `AbortSignal.timeout`；
  ② 參數解析原本只吃 `--sample=50`，`--sample 50` 會讓值變空字串→**靜靜跑成全池 8193 張**
  （誤判成 hang，白跑兩次），已改成兩種寫法都吃；
  ③ loose 的 token 比對一開始傳了**已正規化**的藝人名（`tony williams`→`tonywilliams`，
  空格被吃掉），永遠切不出跟 `anthony williams` 的共同 token，那條路等於沒作用——
  token 比對一律要用原字串。
- 驗證：`node scripts/build-release-years.mjs --sample 50` 實跑三輪（初版／加 fallback／修
  token bug），逐張人工掃過輸出，隨機層 40 張年份與已知事實相符。
  **尚未寫入任何卡池資料檔，也未改前端。**

### 2026-07-27｜分享圖字距對齊畫面

- 症狀：分享截圖的字看起來比抽卡結果頁擠。原因是**畫面吃 CSS `letter-spacing`，canvas 的
  `fillText` 預設字距是 0**，兩邊本來就不會一樣。
- 修法：`shareFont(ctx, font, kind)` 在設字體時一併套 `ctx.letterSpacing`，em 值直接對應結果頁樣式
  （`SHARE_TRACKING`：body 0.04／artist 0.06／徽章 0.15／rating-label 0.1／stars 2px÷13px≈0.154）。
  `buildShareCanvas` 裡所有 `ctx.font =` 都改走這支，避免字距殘留到下一段文字。
- `ctx.letterSpacing` 需 Chrome 99+／Safari 17.4+，開頭做特徵偵測（`CANVAS_TRACKING_OK`），
  不支援就退回零字距，不會壞版。**`measureText` 會把字距算進去**，所以斷行、專輯名縮字級、
  三軸靠右對齊的計算全部自動跟著調整，不必另外補償。
- 驗證：本機實抽產圖，一般卡與殿堂卡各一張；7 星列加寬後仍在右邊界內（實算左欄 520px 結束於
  x=592、右欄從 x≈664 起，留 72px 空隙），介紹框位置與行數未受影響。

### 2026-07-27｜抽卡結果頁的藝人／專輯／等級改置中

- 只動前台結果頁（心情選歌與類型挑片／直接來一張共用同一組 class），分享圖不受影響。
- `.quiz-result-artist`／`.quiz-result-album` 加 `text-align:center`，`.quiz-tier-slot` 也置中
  （徽章是 inline-block，要靠容器的 text-align 才會置中）。
- 原本是 `text-align:start`（靠左），不是靠右。介紹內文 `.quiz-result-reason` 維持靠左——
  長段落置中不好讀；上方的 `.quiz-result-label`（為你挖出的那張）也維持原樣。
- 驗證：本機實抽，用 Range 量文字實際佔位，artist／album／徽章的左右留白皆相等
  （一般卡與殿堂卡各驗一次），心情選歌那頁同樣置中。

### 2026-07-27｜Service Worker 一直餵舊的 dip-player.js（前一輪音訊修正等於沒上線）

- 店主回報「一樣，直接來一張抽到卡沒有直接播放」。查下去發現**修正根本沒跑到**：
  `index/battle/roguelike` 三頁都寫死 `<script src="dip-player.js?v=31">`，而 `sw.js` 對同源靜態檔
  用 **stale-while-revalidate**——URL 沒變就先回快取的舊檔、背景才更新。改了 dip-player.js 但
  沒動查詢字串，手機上跑的永遠是上一版；本機用 `caches.keys()` 直接看到快取裡躺著 `dip-player.js?v=31`。
- 修法三層：① 三頁 `?v=31`→`?v=32`（舊 SW 也會因為 URL 沒命中而走網路，當下就生效）；
  ② `sw.js` 對 `.js/.css/.json` 改成**網路優先**、失敗才回退快取（圖片字型維持 SWR）；
  ③ `VERSION` v1→v2 清掉舊快取。**以後改任何 JS 都要記得這條路徑會吃快取。**
- 另加現場診斷：前台網址帶 `?audiodebug=1` 會在畫面下方開一個黑框，即時列出 DipPlayer 狀態變化
  與 `DipPlayer.debugState()`（AudioContext 狀態／gain 值／keep-alive 是否還在播／是否在手勢內／
  失敗代碼）。自動播放失敗照設計是安靜的，手機上沒這個什麼都看不到。
- 順帶釐清一個**不是 bug** 的來源：抽卡有 10% 抽店內在售、10% 抽 IG reel，這兩類沒有 30 秒試聽，
  照設計不顯示播放鍵也不自動播；再加上 `card-preview-status.js` 有 271 張人工標記無來源
  （231 unavailable／40 disabled）。所以即使一切正常，每五次抽卡也會有一次是安靜的。
- 驗證：本機清掉 SW 與快取後重載，`DipPlayer.debugState` 存在（＝新檔有進去）；抽到有試聽的卡
  自動播放正常（ctx running、gain 0.5、playing true）；抽到 reel／無來源卡則如設計般安靜。

### 2026-07-27｜抽牌顯示卡牌等級＋分享圖統一改版＋修「第一次抽牌沒聲音」

- Repo：`dip-vinyl-shop`（`index.html`、`dip-player.js`）。`dip-vinyl-worker` 有其他協作者未提交的
  `src/index.js` 改動，本次完全沒動。
- **等級全面顯示**：新增 `resultTierOf()`／`resultTierBadgeHtml()`／`paintResultTier()`，
  心情選歌與類型挑片／直接來一張／特殊抽卡券的結果頁都在專輯名下加 `.quiz-tier-slot`。
  判定順序與唱片櫃一致（頂點旗標 > RARITY_OVERRIDES > 神作名單 > 三軸計算）；
  三軸是非同步取得，所以 `renderAlbumRatings()` 改為回傳 ratings，回來後補畫徽章並存進 result（分享圖也吃這份）。
- **分享圖 `buildGpCanvas` 改版**：頂部「類型挑片／挖出屬於你的那張」換成卡牌等級（頂點用掃光漸層、
  一般卡用 RARITY_COLOR），封面加等級外框；封面下改成左右兩欄——左藝人／專輯、右三軸星等。
- **店主第一輪回饋（已改）**：頂點三張去掉「級」字（`SPECIAL_TIERS` 移除 `badge` 欄，一律用 `label`）；
  分享圖改成固定網格——資訊帶固定起點與固定高（`META_TOP`／`META_H=210`），左欄藝人＋專輯整塊垂直置中、
  右欄三軸三列也垂直置中對齊（原本靠右上很怪）；介紹框起點固定在 `META_TOP+META_H+30`，
  不再被一行／兩行專輯名推位，字級在 30／28／26 之間挑第一個塞得下的，文字在框內垂直置中。
- **店主第二輪（260 字壓測，已修）**：舊碼有一行 `slice(0, 200)`，260 字的簡介會被硬切在句子中間且無刪節號
  （店主 07-24 已裁定審核過的簡介可超過 180 字，這個上限等於偷吃字）。改為：不設實質字數上限
  （340 字以上才加刪節號）、封面 900→840 讓出版面、字級候選加到 30／28／26／24／22、
  框高放不下時以行為單位截斷並在最後一行補「…」。實測 110 字＝30px 4 行、260 字＝26px 9 行全文完整、
  486 字＝縮到最小字級後截行加刪節號，三種都沒有畫出框外或蓋到頁尾網址，介紹框上緣位置三張一致。
  註：唱片櫃分享圖 `buildCardCanvas` 仍有 `slice(0, 200)`，本次未動（版面沒一起改，動了要重驗）。
- **店主第三輪（已修）**：分享圖頂端等級字級 52px→34px，與下方藝人名同級；掃光漸層寬度改成貼齊
  文字實際寬度（字變小後若仍用固定 300px 跨距，只會取到漸層中段最淡的一截，銀色會糊掉）。
  店主同時回報實際簡介最長 220–230 字、260 字很罕見，所以把上一輪為了硬塞 260 字而縮的封面
  840→還原 900（另把標題列上移，COVER_Y 250→230）。實測 110／230／260 字都完整不截、
  介紹框上緣三張一致。
- **店主第四輪（定案，已上線）**：
  1. **只有頂點三張顯示等級**，傳奇／史詩／獨特／稀有／普通一律留白——抽到一般卡不需要被貼「普通」。
     `resultTierBadgeHtml()` 與分享圖頭部都只認 `SPECIAL_TIERS`；封面外框同理，頂點卡才用掃光粗框，
     一般卡改中性細線（框色也會洩漏等級）。稀有度本身沒有廢除，仍在唱片櫃的排序與分組裡。
     `.quiz-rarity-badge` CSS 與 `RARITY_COLOR` 因此成為死碼，一併移除。
  2. **三軸順序統一為 經典度 → 冷門度 → 硬蕊度**（原本 index 是冷門在前）。battle.html／roguelike.html
     的 `ATTRS = ['classic','obscurity','accessibility']` 本來就是這個順序，這次是 index 對齊它們。
  3. **全站分享圖收斂成一支 `buildShareCanvas()`**：心情選歌的 `buildResultCanvas` 與唱片櫃的
     `buildCardCanvas` 整支刪除（各約 90–100 行），三個分享按鈕都改叫 `buildShareCanvas`。
     唱片櫃卡片以 `_tierInfo` 傳入唱片櫃算好的 tier（含後台校正），不必再走一次 resultTierOf。
- **殿堂銀在白底會消失**：畫面用的 `--silver-shine` 中段是純白，畫進白底分享圖等於看不到。
  canvas 專用的 hall 漸層改成壓暗金屬灰（#565c64→#a4aab2→#565c64），兩張分享圖共用
  （新抽出的 `tierGradient()`，順手把 buildCardCanvas 裡三份重複的漸層函式收掉）。
- **`wrapText` 改為英文不斷字**：分享圖左欄只有 520px 寬，原本逐字斷行會切出「Hymns From the H / eart」。
  抽出 `wrapLines()`，換行點落在拉丁字中間時退回上一個空白；CJK 照舊逐字斷。
- **修「第一次抽牌顯示在播卻沒聲音」**：根因是抽到卡後的自動播放會呼叫 `DipPlayer.unlock()`，
  而那時**不在手勢內**——`primePreviewFromGesture()` 的「完整重新武裝」把唯一在發聲的靜音 keep-alive
  `pause()` 掉，接著的 `play()` 在手機必被拒絕，於是往後 1〜3 秒的下載＋解碼期間毫無音訊輸出，
  iOS 收掉 audio session，`source.start(0)` 悄悄沒聲音、狀態卻照報 playing。第二次能出聲是因為
  暫停／播放都是真手勢且 buffer 已快取。修法兩層：`dip-player.js` 加 `inUserGesture()`
  （`navigator.userActivation` 為主、舊 iOS 退回自記時間戳），手勢外且 keep-alive 還在播就直接放行；
  `gpEnsurePlayer(withUnlock)` 讓自動播放路徑根本不呼叫 unlock。
- 驗證（本機 http-server + CDP）：三段 inline script 與 dip-player.js 語法檢查過；實際抽牌徽章正確
  （史詩／稀有／獨特／殿堂級／異端級）、console 0 error；分享圖三種等級實跑產出（見預覽圖）；
  音訊時序 log 修前「real start 前 1.5 秒出現非手勢 pause→play」、修後 keep-alive 一路撐到
  `source.start bufDur=29.9` 才被 releaseKeepAlive 收掉。**iOS 實機尚未驗**（本機無法重現手機的 play 被拒）。

### 2026-07-26｜修：教學第二場「冷」按不下去——淡出的老闆吐司仍在吃點擊

- Repo：`dip-vinyl-shop`。店主回報教學第二場第二回合的「冷」按鈕按不下去。
- **根因**：`coachToast`（第一場結業語）淡出時只設 `opacity:0`，元素仍留在 DOM，
  且帶 `z-index:998`＋`pointer-events:auto`，位置 `bottom:130px` 正好壓在出牌彈窗
  （`.tilepop` z-index 40）的屬性按鈕上——**看不見的吐司把 tap 吃掉**，畫面毫無反應
  （不是教學守門擋的，`play()` 根本沒被呼叫）。實測 `elementsFromPoint` 在按鈕中心
  回傳 `#coachToast` 在最上層，其矩形 y577–683 蓋住按鈕 y634。
- **修法**：吐司改 `pointer-events:none`＋淡出後 `visibility:hidden`（新增 `hideCoachToast()`，
  移除原本的點擊關閉），並在 `renderTilePop` 開啟彈窗時主動收起吐司，視覺上也不擋按鈕。
- 通則教訓：**這個專案任何浮層都必須 `pointer-events:none` 或真的隱藏**——只降 opacity
  的浮層會變成隱形點擊黑洞（`seedToast` 當初就有設 none，coachToast 漏了）。
- 主要檔案：`roguelike.html`
- 驗證：mobile 375×812 實測——修前 `hitOK:false`（命中 coachToast）、修後 `hitOK:true`
  且真觸控序列（pointerdown/up/click）成功出牌進到 step3；第二場剩餘三手（割捨／經／冷）
  tileHit＝btnHit＝true 全過、正常獲勝；console 0 error。

### 2026-07-26｜Roguelike 新手入門改造：等級解鎖流派＋老闆帶打兩場教學＋管理員訪客沙盒

- Repo：`dip-vinyl-shop`。背景：朋友實測第一步就看不懂，入門門檻過高。
- **等級解鎖流派（漸進式入門）**：樂歷 Lv.3 前不出現「流派」概念——新手首頁只有
  「🎁 老闆的入門套裝」＋開打按鈕，天賦／中繼票／解鎖清單全部收起；`UNLOCKS` 新增
  Lv.3「出師：流派三選一＋天賦配點」（升上後首次進入跳 🎓 出師橫幅，`classIntroSeen`
  旗標一次性）與 Lv.10「曲風流派搶先資格（開發中）」佔位。Lv.2 前首頁可選
  「🎓 教學開局／⏭ 跳過教學」（玩過教學後主打鍵互換）。
- **老闆帶打教學（`TUT_SCRIPT` 兩場腳本戰）**：上半場（音樂小白 HP23）＝比星→三種相剋
  各用一次→品味輾壓；下半場（文青同好 HP9、開場氣勢 5）＝相生連段→被硬蕊剋一下體會
  「相剋雙向」→敵方輾壓時教「🛡 割捨防禦」→重鋪連段收尾（允許 ⚡ 替代解）。引導方式＝
  介面照常、該按的按鈕金框脈動（`.tut-rec`）、該出的牌發光（`.tut-glow`）、按錯被擋並跳
  老闆糾正語；雙方牌庫指定順序不洗牌、敵三圍 0，每回合傷害／氣勢全程確定。教學進度存
  `G.tut`（跟戰鬥存檔走，中途離開可續）。另有 `coachTip` 一次性提示（首次連段／被虛晃／
  手上出現王牌），`META.tips` 記錄。教訓：課表用牌的「非教學軸」數值要壓低（Jane Doe
  經典 3 星被 AI 第一手選走整場歪掉→換 Merzbow 經典 1 星）。
- **品味生死鬥頁教學關卡**：`pvp.html` 第三張卡連 `roguelike.html?tutorial=1`，任何等級
  可無限重玩；進頁即開教學並以 `history.replaceState` 洗掉參數，重整不會被拉回。
- **管理員訪客沙盒**：`kubinice06@gmail.com` 登入後首頁出現「🧪 以訪客身分瀏覽」；沙盒＝
  獨立本機檔（`dipRogueMeta_v2:sandbox`＋`dipRogueRun_v1_sandbox`），升級收卡照常但
  saveMeta／run 同步／唱片櫃寫入／雲端拉檔全部封死不碰正式帳號；面板可設定等級（1〜99，
  天賦一併歸零）／樂歷歸零／全部重置／離開，topbar 帶 🧪 標記。
- 主要檔案：`roguelike.html`、`pvp.html`
- 驗證：本機 http-server 實測——兩場教學十手全程照劇本（敵 23→20→15→9→3→死；
  9→6→6→6→3→死）、按錯屬性被攔＋糾正語、割捨完全擋下、Untrue 真的從牌組移除、
  結業吐司兩段正確；新手首頁三種狀態（未玩教學／已玩／Lv.2）按鈕正確；`?tutorial=1`
  直入教學且參數洗掉；沙盒改等級 7→歸零→全部重置→離開後正式檔 Lv.5 原封不動；
  console 全程 0 error。教學文案與門檻（Lv.3／Lv.10）後續會再迭代。

### 2026-07-26｜desc-restyle wave1 完成：apex 620 張研究版簡介全數上線 KV

- Repo：只動 Worker KV（`desc2:`），repo 檔案未動；作業資料與逐批記錄在 `../desc-restyle/`（progress.json 為準）。
- 範圍：test20＋w1-001〜012 共 620 張（正典／名盤／冷門深水區全含），每批走五層管線：
  Sonnet 研究×5（WebSearch 兩獨立來源、主故事鏈、uncertain 標註）→ Fable hook×5（四型態輪換、擋研究過度推論）→
  主會話 hook 品管（字數/禁語/uncertain 回滲）→ Sonnet 寫作×2 → qa-check-research 零編造比對 → 主會話逐張審稿 → KV bulk put → 線上 5 張抽驗。
- 品質統計：研究層 full 約 9 成、thin 約 30 張、dry 3 張（誠實短寫不腦補）；每批 QA 標記歸零後上線；審稿層每批修 3〜23 處。
- 寫作層系統性通病（三批實證，前置規則已補死仍需審稿把關）：把半形空格插進 hook（008/010 各 18/19 張、自動還原）、
  引用含「必聽」的書單名（改英文原名或改述）、身體重述 hook、初稿爆字數 300〜600 再壓縮。
- 資料疑義（待店主裁定）：Alexander Robotnick《Kind of... Robotnick》查證疑為 2024 數位選輯、與卡池年代不符；
  San Ul Lim《The Mountain Hut》查無對應專輯；Michael A. Grant 同名盤查無任何紀錄——三張均以藝人/樂團層級保守簡介上線。
- 中斷事故：07-26 月額度用罄一度中斷 15 個研究 agent，額度恢復後全數重跑；009-b 另因程序退出三跑才完成。
- 累計 620/6980；wave2（正典高曝光 ~2000 張）待店主點頭再啟動。

### 2026-07-25｜desc-restyle 改走「全池深度研究」路線：test20＋w1-001 共 70 張研究版簡介上線

- 店主裁定：純風格改寫版（batch-001 50 張）太做作、已用備份回滾；改採 funksoul 式研究管線
  （Sonnet 研究層 WebSearch 兩來源→Fable 親寫 hook→Sonnet 寫身體→qa-check-research 零編造比對→Fable 全批審稿）
  對全池分四波重做，wave1＝apex 620 張。
- **test20**（殿堂10/珍珠5/異端5 跨冷門度試作）：19 full／1 thin，店主核准；
  《The Low End Theory》依店主回饋補 KQED 後續事實收滿故事弧——新通則：**hook 拋出的問題身體必須收尾**。
- **w1-001**（殿堂正典 50 張：Beatles/Dylan/MJ/Prince/龐克後龐克/90s 搖滾）：研究 49 full／1 thin、
  5 研究 agent＋2 寫作 agent 並行、Fable 審稿修 20 處（hook 重述、uncertain 名次誤用、簡體字、單曲/專輯榜混淆）、
  QA 標記 0、KV bulk put、線上 5 張 KV-HIT 抽驗過。
- 累計 70/6980；成本實測約 18k token/張；進度與批次狀態在 `desc-restyle/progress.json`。
- 現狀：停在 w1-001 待店主抽驗，OK 後續跑 w1-002〜012（apex 其餘 550 張）。

### 2026-07-25｜（已作廢）既有卡池簡介重塑（desc-restyle）啟動：KV 全量備份＋第一批 50 張改寫上線，待店主抽驗定調

- Repo：只動 Worker KV（`desc2:`），repo 檔案未動；作業資料夾 `../desc-restyle/`。
- 依 `desc-restyle/INSTRUCTIONS.md` 純風格改寫（零新事實）：重寫開頭 hook＋店主語氣 v2 改寫內文。
- 動工前已匯出 `desc2:` 全量 7,626 筆現值存 `desc-restyle/kv-backup-desc2.json`（回滾備份）。
- 淨範圍 6,980 張／140 批（排除 funksoul 523、CJK 216、NEOCLASSIC 2、CURATED 1、KV 無現值 471）。
- batch-001（50 張，六七零年代搖滾／民謠區段）：Fable 親寫 hook → Sonnet agent 改寫初稿 →
  **Fable 全批審稿重寫**（初稿有湊字填充句、身體重複 hook、格言式收語三類系統性問題，全數修掉）→
  qa-check 標記 0 → bulk put 50 筆 → 線上 `/album-desc` 抽驗 5 張 KV-HIT 且文字一致。
- 字數落點 80–117（原文短就讓它短，不灌水）。進度記錄在 `desc-restyle/progress.json`。
- **現狀：依規停在第一批，等店主抽驗定調後再放量**；不通過可用備份即時回滾這 50 鍵。

### 2026-07-25｜Funk & Soul 大擴充：523 張上架（店史最大單批）＋殿堂 4 張、流亡 2 張

- Repo：`dip-vinyl-shop`＋Worker KV。批次：`2026-07-24-funksoul`（首個套用 MBID/UPC 硬規則的批次）。
- 範圍：店主指示補齊 funk 與 soul 兩大類（原 soul 標僅 915 張）。160 位藝人 MB 反查 → 2243 候選
  → 評分排序精選 → 封面 98.5% → 最終 523 張（funk ~245／soul ~278）。seed 7041→7558、apex hall 410→414、pearl 107→109。
- **頂點卡**：升殿堂 4 張——Maggot Brain、Mothership Connection（池中普卡升級、自 seed 移入 apex）、
  The Payback、Cold Sweat（本批，funk 起源正典）；流亡珍珠 2 張——Damn Right I Am Somebody（149 listeners）、
  Breakin' Bread（123）。Black Byrd 經店主裁定不進殿堂。Firestore `album_overrides.tier` 需後台匯入同步（admin 權限）。
- **簡介**：523 張全數預生成入 KV（`desc2:`），管線＝Sonnet 研究層（WebSearch 兩來源）→ Fable 親寫 hook →
  Sonnet 寫身體 → 四道自動 QA（官方字數 80-280／禁語／曲風房規／簡介專名逐一對照事實表）。幻覺率 0。
  店主語氣房規 v2（簡潔有力、hook 一句到位、嚴禁詩化收語）與 280 字上限均為本批新定。
- **固定試聽**：497 ready（UPC 精準通道佔 273——MBID/UPC 新規則首批即回本）＋26 unavailable，
  全走靜態路徑（apple-audio-map-v1 追加 523 筆、runtime 重建 6689 筆、card-preview-status 追加 26 筆）。
- **研究層剔除 27 張偽裝品**：MB secondary-types 對「再發行合輯／出土帶／換皮再版／live 漏標」有系統性盲點
  （AWB R&B、Darondo、Meters Jam、J.B.'s 出土帶、Sings Out of Sight＝Out of Sight 重發等），
  單靠 MB 中繼資料不足以執行「Compilation 不收」規則，onboarding 研究層必須逐張網查 isCompilation。
- 掛名／年份修正十餘筆（The Jacksons→The Jackson 5、Miracles→Smokey Robinson & the Miracles、
  Easy→Marvin Gaye & Tammi Terrell、RSD 再版年誤植等）；池中重複 2 張揪出（Twist And Shout、Jackson 5 ABC）。
- 曲風欄：build-seed-genres 補齊，新卡 505/519 帶 soul 標（Funk & Soul 流派池 915→~1420）；8 張分類器回空。
- 驗證：prepare gate 0 error；published gate 0 error（92 個 UPC 軟警告為預期；CAA 封面在 gate 單發抓取偶發 500 屬 IA 節點隨機抽風，帶重試全量實測 523/523 全通過）；
  `/album-desc` 抽驗 KV-HIT 且文字一致；card_catalog 預熱 523/523 成功（含 rgMbid/upc 欄）。
- 候補待辦：AWB《Show Your Hand》(1973)、James Brown《Out of Sight》(1964) 為被移除再版盤的正主、未在池中，之後補批可收。
- 主要檔案：`seed_cards.json`、`apex_pool.json`、`data/apple-audio-map-v1.json`、`data/apple-audio-runtime-v1.json`、
  `card-preview-status.js`、Worker KV（desc2: 523 筆）、Firestore card_catalog（REST 預熱）。manifest 留存 scratchpad。

### 2026-07-24｜onboarding 硬規則：新卡一律記 MBID（必填）＋UPC（盡力）

- Repo：dip-vinyl-shop。commit b2f7949。
- 背景：外部識別過去單點依賴 Apple collectionId、卡片身分用 `artist|album` 字串當主鍵，
  同名不同碟（如 Aretha Franklin 有 1961／1986 兩張《Aretha》）與彎引號誤配風險高。
- 改動：
  1. `ALBUM_ONBOARDING.md` 步驟 1 加「外部識別」章節＋manifest schema 加 `identity.rgMbid`／`identity.upc`。
  2. `scripts/verify-album-onboarding.mjs`：`rgMbid` 缺漏／格式不符 → error；`upc` 缺漏 → warning。
     以 batch 名稱開頭日期判定，`MBID_RULE_EFFECTIVE=2026-07-24`；**舊批次不回溯**（守護嘻哈六波已完結的 manifest 不被追溯 fail）。
  3. skill `1b-artist-discography.mjs` 改為永遠帶出 `rgMbid`（MB release-group id 本來就查到、原本丟棄）。
- 決策要點：MBID 必填（release-group 穩定主鍵、免認證最便宜）；UPC 只警告不擋（release 層級、老黑膠與地區盤常查無，硬擋會砍掉最有收藏價值的冷門盤）。MBID／UPC 寫進 `card_catalog` 不進 apple-audio runtime 地圖（避免增肥前端執行時資料）。
- 驗證：`node --check` 通過；舊批次 manifest 不觸發 MBID error、新批次無 MBID 觸發 error＋UPC warning、補齊後兩者皆清（三種情境實測）。
- 進行中：funk/soul 擴充批（2026-07-24-funksoul，553 張）正在 scratchpad 補 MBID/UPC，將是首個套用此規則的批次。

### 2026-07-24｜嘻哈第 6 波（國際含華語）：50 張上架——六波擴充完結

- Repo：dip-vinyl-shop。批次：2026-07-24-hiphop-international-wave6。
- 範圍：法（NTM×4、MC Solaar×4、IAM×3）／韓（Epik High×5、Dynamic Duo×2、E SENS×2、
  가리온×2、Beenzino）／日（RHYMESTER×4、キングギドラ×2、KOHH×3、ANARCHY×2、AKLO×2、
  舐達麻×2、BUDDHA BRAND 黒船）／UK 補完（Dave、slowthai×2）／華語（MC HotDog 熱狗×4、
  頑童MJ116×3、大支 Dwagie）。127 候選→50 張。
- 華語命名依 0.5 規則採「中文名 拉丁名」複合掛名（MC HotDog 熱狗／大支 Dwagie），
  曲風以 mapgenre3: KV 手動播種 5 筆。人工升分 3 筆（黒船 C4、가리온 C3、Anecdote C4）。
- **Spotify 解除限流**：本波 9 張 CJK 封面靠 /spotify-search 補回；犬／Refuse to Listen
  最後靠 MB rg+CAA 救回。試聽 41 ready／9 unavailable（Apple 無 CJK 舊目錄居多）。
- 驗證：prepare 0 error；KV 50/50 KV-HIT；published gate 0 error。

**六波總結算（2026-07-23〜24）**：R&B 一批 101＋二批 107＋嘻哈六波 63+98+77+68+40+50
＝**604 張新卡**＋heresy 王牌 1 張（Government Plates）。seed 6,439→7041。
hiphop 含標 1277、soul 928——嘻哈R&B合計約 2205，超越爵士成第二大類。
待辦：缺封面 3 張（wave1 遺留）、apex pearl 2 張 spiritual jazz 誤標、
嘻哈 heresy 候選（Dälek/JPEG/clipping. 均 A4）可日後經後台 tier 升格。

### 2026-07-24｜搜尋專輯關詳情改淡出＋補提交 audio-debug.html 刪除

- Repo：`dip-vinyl-shop`
- 店主回報：搜尋專輯頁點開簡介後按叉叉，音樂硬切斷掉。改為與對戰頁同款的 1.5 秒淡出。
- 改動：`index.html` 兩處 `DipPlayer.stop()` 改成 `stop({ fade: true })`——
  `closeCardDetail()`（搜尋頁按叉叉關詳情）與 `setActiveTab()`（直接切去其他分頁離開搜尋頁）。
  播放器端不用動，`stop({fade:true})` 本來就支援（對戰頁關簡介就是走它）。
- 另補提交：上次「移除 #auddbg 偵錯層」（e20c4da）時 `audio-debug.html` 的刪除只做在
  工作區、沒被 add 進 commit，這次一併補上，線上站點才會真正移除該頁。
- 主要檔案：`index.html`、`audio-debug.html`（刪除）
- 驗證：桌機實測搜尋頁「Miles Davis → 點卡開詳情播放 → 按叉叉」，攔截 GainNode 排程
  確認為 `setValueAtTime(0.5)` → 1.5 秒 linearRamp 到 0，取樣 0.461→0.423→…→0 乾淨走滿。
  另查明一個非 bug 現象：固定試聽檔較短的卡在自然結尾淡出中按叉叉，會從當前音量
  （已近 0）接手淡出——這是中途打斷不跳音的正確行為。
- 附註：店主稍早回報「第一次點開又沒有立即播放」，複測後自行消失。查證過並行協作者
  近三筆 `dip-player.js` 提交（pinned previewUrl／只留 iTunes）都沒動到 iOS 解鎖與
  keep-alive 修復邏輯，判定是首次下載音檔的網路延遲（快取未命中），非回歸。

### 2026-07-23｜嘻哈第 5 波（Beat Scene／器樂）：40 張上架

- Repo：dip-vinyl-shop。批次：2026-07-23-hiphop-beatscene-wave5。
- 範圍：J Dilla 前期補完（Welcome 2 Detroit／Ruff Draft／The Diary）、Pete Rock 器樂線、
  RJD2《Deadringer》、Blockhead、Prefuse 73、DJ Krush 中期（Krush／Kakusei／Zen／
  Message at the Depth／Jaku）、Clams Casino、Onra、Karriem Riggins、Apollo Brown、
  Oh No 取樣考古雙作、Wax Tailor、TOKiMONSTA、Nosaj/Shlohmo/Mono-Poly（正確歸電子）。
- 封面教訓：CJK 原題（深層/寂 -jaku）與 Jay Dee 舊掛名要用 MB 原始標題反查才有封面。
- 試聽 36 ready／4 unavailable（Zen、Long Distance、Spare Time、Instrumentals 2 串流缺）。
- 簡介修正教訓：後綴補長法會產生冗贅句，之後一律重寫整段而非黏接。
- 驗證：prepare 0 error；KV 40/40；published gate 0 error。
- 上架後 seed 6,991：hiphop 1227。

### 2026-07-23｜嘻哈第 4 波（實驗／異端）：67 普卡＋1 張 heresy 王牌上架

- Repo：dip-vinyl-shop。批次：2026-07-23-hiphop-experimental-wave4。
- 範圍：Dälek×5／Armand Hammer 系（billy woods×5、AH×5）／Ka×5／Shabazz Palaces×3
  ／JPEGMAFIA、clipping.、Earl、MIKE 補完／Antipop、Techno Animal、cLOUDDEAD《Ten》
  ／Backxwash 三部曲／Moor Mother×3／Saul Williams×4／Roc Marciano×3／日本 Dos Monos。
- **嘻哈 heresy 王牌 0→1**：Death Grips《Government Plates》（A5、人聲退位噪響實驗，
  證據 wiki＋Pitchfork）——嘻哈異端從零建檔。其餘 A4 級（Dälek、JPEG、clipping.）之後
  可走 album_overrides.tier 後台升格，candidates 記在此。
- 試聽 62 ready／6 unavailable（Backxwash 早期目錄本人下架、Antipop 三張、WBDTS、
  New Kingdom 串流缺席）。封面 68/68 全 CAA。milo／R.A.P. Ferreira 分名處理
  （who told you to think 用 milo 名，符合串流掛名）。
- 驗證：prepare 0 error；KV 68/68；published gate 0 error。
- 上架後 seed 6,951：hiphop 1193／soul 923；apex heresy 112（嘻哈 1）。

### 2026-07-23｜嘻哈第 3 波（地下／獨立）：77 張上架

- Repo：dip-vinyl-shop。批次：2026-07-23-hiphop-underground-wave3。
- 範圍：Rawkus 系（Black Star、Reflection Eternal、Pharoahe Monch、Big L 遺作、Mos Def 補完）
  ／Def Jux（El-P、Aesop Rock、Mr. Lif）／Rhymesayers（Atmosphere、Eyedea、Brother Ali 池內已有）
  ／南方地下（CunninLynguists、Little Brother）／費城（Jedi Mind Tricks×5）／西岸（J5、Dilated、
  Hiero、Freestyle Fellowship、PUTS、The Coup×5）。412 候選→77 張。
- Mos Def 消歧義教訓：MB 搜「Mos Def」首位是 Black Star、次位是龐克團 The Yah Mos Def，
  本尊條目叫「Yasiin Bey (fka Mos Def)」——改名藝人要用現名找條目、用舊名上卡。
- J5 同名卡《Jurassic 5》因 Apple 無試聽觸發自我同名規則撤下（先前批次同規則）。
- 試聽 68 ready／9 unavailable（Rawkus／Def Jux／Viper 授權黑洞：Train of Thought、
  The Ecstatic、I Phantom、Revolutionary 卷一卷二等串流均缺）。封面 78/78 全 CAA。
- 驗證：prepare 0 error；KV 77/77；published gate 0 error。
- 上架後 seed 6,884：hiphop 1126／soul 923。

### 2026-07-23｜嘻哈第 2 波（南方）：98 張上架

- Repo：dip-vinyl-shop（Firestore/KV 亦寫入）。批次：2026-07-23-hiphop-south-wave2。
- 範圍：UGK／8Ball & MJG／Three 6／Geto Boys／Scarface／Master P（No Limit）／Cash Money
  （Juvenile、Big Tymers）／crunk（Lil Jon、Crime Mob、YoungBloodZ）／休士頓 2005 浪潮
  （Paul Wall、Slim Thug、Chamillionaire）／trap 世代（Gucci、Jeezy 補完、Future 補完、
  Lil Baby、Gunna、Young Dolph、Key Glock、Playboi Carti 首專）。613 候選→98 張。
- 掛名變體教訓再+3：Rick Ro$（Teflon Don）、Ghetto Boys（Grip It!）、The People's Champ
  （撇號害 MB 搜尋落空）——搜不到先想「這張當年掛什麼名」。
- 試聽 94 ready／4 unavailable（Pluto、Smoked Out, Loced Out、When the Smoke Clears、
  Space Age 4 Eva 均已從 Apple 下架）。封面 98/98 全 CAA。
- Jeezy 沿用池內既有「Young Jeezy」名（The Inspiration／The Recession），避免同人分裂。
- 驗證：prepare 0 error；KV 98/98；published gate 0 error（CAA 間歇 500 重跑即過）。
- 上架後 seed 6,807：hiphop 1,049 首度破千。

### 2026-07-23｜搜尋專輯頁移除唱盤機：點卡直接開簡介＋背景播試聽

- Repo：`dip-vinyl-shop`
- 店主指示：搜尋頁不要唱盤機。點專輯卡＝同時開詳情（簡介／星星／串流鈕）＋背景播
  30 秒試聽（`_asPlay()`：DipPlayer 掛隱藏 mount、prefer itunes、固定試聽優先）；
  ⓘ 按鈕移除（功能併入點卡）。
- 停播規則：關掉詳情就停（`closeCardDetail` 加 currentView==='album-search' 分支，
  唱片櫃的唱盤播放不受影響）；離開搜尋頁（返回首頁等）也停（`setActiveTab` 開頭攔）。
- 唱盤機通用化選擇器（`.quiz-modal.open .turntable-*`）保留——現在只有唱片櫃有唱盤，無害。
- 主要檔案：`index.html`
- 驗證：本機實測——搜尋頁無唱盤、無 ⓘ；點 In a Silent Way 詳情開＋星星 3 列＋
  status playing＋卡片高亮；關詳情 stopped＋高亮清除；播放中返回首頁也 stopped；
  console 0 error。

### 2026-07-23｜搜尋專輯改搜卡池（iTunes 全網搜尋保留備用）

- Repo：`dip-vinyl-shop`
- 店主指示：先只搜店裡卡池，iTunes 保留。`doAlbumSearch` 改本地比對 `loadCardPool()`
  （seed＋apex 合併、apex 撞名優先），藝人／專輯欄位皆 NFKC 小寫 includes、可擇一；
  排序完全一致＞開頭＞內含、同分經典度高→低；最多列 24 張並顯示總命中數。
- 卡片牆帶稀有度標（apex 用 SPECIAL_TIERS、seed 用 rarityOverrideOf→rarityFromRatings，
  與抽卡同規則）；封面／固定試聽走 `resolveCardAssets`（card_catalog 校正圖優先）背景
  6 張一批補進 `_asResults`，token 防新搜尋競態。
- 詳情補三軸星星（seed 直接帶、apex 向 worker /album-rating 補，頂點軸 7 星）；簡介
  優先序與抽卡結果頁一致：後台校正 ov.desc＞殿堂神作人工簡介＞/album-desc；固定試聽
  ／已確認無來源的卡不再打 Spotify API。
- **iTunes 全網搜尋（`_asItunesAlbums`/`_asJsonp`）留在原地未接線**，之後要做
  「卡池／全網」雙模式把 doAlbumSearch 換回即可。
- 主要檔案：`index.html`
- 驗證：本機實測——Miles Davis 命中 26 張列 24（史詩標＋封面齊）；Kind of Blue 命中
  apex 殿堂第一張（UK Subs《Another Kind of Blues》內含比對第二）、詳情 3 列星星
  hall 軸 7 星、簡介走覆寫鏈；點卡唱盤播放正常；查無顯示引導文案；console 0 error。

### 2026-07-23｜R&B 第二批＋嘻哈黃金年代第 1 波：共 170 張上架

- Repo：`dip-vinyl-shop`（Firestore/KV 亦寫入）。批次：`2026-07-23-rnb-wave2`（107 張：
  New Jack Swing 全收＋2000s R&B＋Alt-R&B）＋`2026-07-23-hiphop-goldenage-wave1`（63 張）。
- 流程同第一批：MB 目錄（61 位 1b＋19 位 mbid 消歧義）→ 567 候選評分 → 人工選片 171 →
  封面全走 MB→CAA（Spotify 全程 429；171/171 命中，含 Master Ace／Show & A.G. 舊掛名、
  Diamond and The Psychotic Neurotics 變名反查）→ 簡介 170 筆自寫 → 兩道 gate 全過。
- **試聽新教訓**：Apple /search 對「The Weeknd Thursday」這類詞會回垃圾結果，改用
  「artist 搜 id → /lookup 全目錄」最穩；「(Original)」「Bonus Track Version」後綴要納入
  albumCore 正規化。最終 A 106 ready／1 unavailable、B 56 ready／8 unavailable
  （Cold Chillin'／Wild Pitch 授權黑洞：Kool G Rap & DJ Polo×3、No More Mr. Nice Guy、
  Prince of Darkness、Take a Look Around、Eyes on This、Keepers of the Funk）。
- **舊髒資料修正**：先前擴充留下的 U+2010「Ne‐Yo」三張卡（雜湊評分 C1）改 ASCII 名、
  Because of You 套用重查評分 C3/O1/A1、刪 Firestore 舊孤兒文件補寫新 id；
  O.C.《Word...Life》既有卡假 O4 修正為 C4/O2/A3（seed＋card_catalog 同步）。
- 人工升分：Showbiz & A.G.《Runaway Slave》C2→C4（D.I.T.C. 開山，理由記 manifest）。
  ALBUM_GENRE_FIX 新增 5 筆。頂點 0 張採用。R. Kelly 掛名全程排除。
- 上架後（seed 6,709）：hiphop 951／soul 915，嘻哈R&B類含標破 1,860。
- 主要檔案：`seed_cards.json`（+169）、`data/apple-audio-map-v1.json`（+160）、
  `card-preview-status.js`（+9）、`scripts/build-seed-genres.mjs`
- 驗證：兩批 prepare gate 0 error；KV 回讀 170/170 KV-HIT；published gate A 107／B 63 全過。
- 待辦：嘻哈第 2–6 波（南方／地下／實驗／Beat Scene／國際含華語）接續執行。

### 2026-07-23｜新功能：搜尋專輯（擇一輸入、唱片櫃式卡片牆＋唱盤試聽、僅閱覽不能收藏）

- Repo：`dip-vinyl-shop`
- 首頁 hub 新增「搜尋專輯」卡（`data-go="album-search"`，排在「直接來一張」之後）。
  第二版（同日改版）：專輯名／藝人名**擇一即可搜**；結果走 Apple `itunes.apple.com/search`
  JSONP `entity=album`（與 dip-player 試聽同一條路，失敗退 r.jina.ai 文字閘道），最多 36 張，
  以唱片櫃 `collect-grid`／`collect-card` 版型排列（無稀有度標）。
- 互動與唱片櫃一致：**點卡片放上唱盤試聽**（重用 `playCollectionRecord`＋`turntableHtml`；
  四處 `#collectionContent .turntable-*` 選擇器一併通用化成 `.quiz-modal.open .turntable-*`，
  兩頁各有一台唱盤、同一個 DipPlayer 掛來掛去）；**點 ⓘ 開同一個 cardDetailOverlay**
  （/album-desc 簡介＋四平台串流鈕＋resolveBandcampBtn），但無收藏／分享／刪除。
- 搜尋卡 cardId 用 `as:` 前綴避免撞唱片櫃；容器級委派先攔截，全域唱片櫃 handler 查
  `_collCache` 不中會安靜略過。返回首頁再進來保留上次查詢與結果（`_asQuery`/`_asResults`）。
- **刻意不放「收進唱片櫃」按鈕**（店主指示結果頁不放「僅供閱覽」標註字樣）。
- 主要檔案：`index.html`
- 驗證：本機瀏覽器實測——只填 Fishmans 搜到 36 張（Long Season 第一張、封面齊）；點卡
  唱盤轉起來（status playing、封面上盤、卡片高亮，30 秒試聽放完自然停）；ⓘ 開詳情
  KV 簡介＋四平台鈕、無分享/刪除；返回再進結果保留；唱片櫃頁未登入空狀態正常；console 0 error。

### 2026-07-23｜R&B 擴充第一批：90s 黃金期＋日韓 R&B 共 101 張上架

- Repo：`dip-vinyl-shop`（Firestore/KV 亦有寫入）
- 店主決策：hiphop＋R&B 遊戲層同類、日韓 R&B 加重、R. Kelly 及掛名專輯一律排除。
- 走 `dip-card-pool-expand` 完整公式：MB 藝人目錄反查（40 位直查＋13 位高撞名用 mbid 消歧義）
  → 419 候選去重 368 → 評分排序人工選片 104（US 53＋日韓 51）→ 封面、簡介、試聽、published gate。
- **封面教訓（重要）**：Bandcamp 對大廠美日藝人幾乎全是 bootleg／remix 誤配（Mariah 首專配到
  耶誕 remix、Whitney 配到「Whitney Houston's Crypt」），39 張 bandcamp 命中全部作廢改走
  MB→CAA；Spotify 全程 429 限流僅 1 張。最終 101/104 有封面（WONK《EYES》、박효신《Soul Tree》、
  Colde《Wave》缺封面暫扣，等 Spotify 解限流補上）。
- **評分教訓**：彎引號（What's the 411?／Don't Be Cruel）與 U+2010（m‐flo）害 Last.fm 查錯、
  假 O5；重查修正 6 筆。人工升分 2 筆（Guy 首專、Candy Rain）理由記在 manifest。
- 曲風：全 104 張 /album-genres 可辨識；`build-seed-genres.mjs` 新增 `ALBUM_GENRE_FIX`
  專輯級覆寫（Bobby Brown《Bobby》jazz→hiphop,soul、Guy 首專、Total《Kima》rock 雜訊、
  MISIA×2 rock→soul,pop）。
- 試聽：Apple 本機 /search＋/lookup（4.2s 間隔），94 ready 寫入 apple-audio-map-v1＋重建
  runtime；7 unavailable 進 card-preview-status.js（安室×4 全串流下架、No More Drama 取樣
  授權缺席 Apple、DOUBLE《Vision》、Crush《Crush on You》Apple 只有同名 Single）。
- 簡介：101 筆繁中 80–180 字自寫並逐筆查證，來源 Wikipedia（驗證過的直查標題）＋MB
  release-group；KV desc2:/desc4: 匯入後全數回讀 KV-HIT。日籍藝人依 0.5 規則用官方掛名
  （宇多田ヒカル、久保田利伸…），韓籍維持串流通用拉丁名，박효신用한글（Apple US 可查）。
- 頂點：本批 0 張採用（What's the 411? 具 hall 候選資格但未採用，記在 manifest）。
- DEAN 因無正規專輯（《130 mood: TRBL》是 EP、非 electronic 白名單）整位排除。
- 上架後分布（seed 6,540）：hiphop 793／soul 843（嘻哈R&B類合計約 1,300 依含標計）。
- 主要檔案：`seed_cards.json`（+101）、`data/apple-audio-map-v1.json`、
  `data/apple-audio-runtime-v1.json`、`card-preview-status.js`、`scripts/build-seed-genres.mjs`
- 驗證：prepare gate 0 error → card_catalog 101 PATCH 成功 → KV 101 回讀一致 →
  published gate 101 張 0 error 0 warning。
- 待辦：3 張缺封面卡補上、apex pearl 那 2 張 spiritual jazz 誤標、嘻哈六波擴充尚未開始。

### 2026-07-23｜曲風標修正：經典 soul 世代整批從 hiphop 退回 soul

- Repo：`dip-vinyl-shop`
- 背景：曲風標來自 worker /album-genres（Spotify→Last.fm），Last.fm 把「R&B」粗分進 hiphop，
  導致 Marvin Gaye／Aretha／Stevie 等經典 soul 世代整批被誤標 hiphop。店主決策：
  遊戲層 hiphop＋R&B 視為同一類（當代 R&B 如 TLC/Usher/Mariah 維持 hiphop 標是對的），
  只需把「明顯是 soul」的藝人清出去；另 blues 之後在遊戲層併入 folk/world/classical（根源派）。
- 改動：`scripts/build-seed-genres.mjs` 新增 `SOUL_FIX` 人工覆寫表（74 組藝人：經典 soul/funk/
  Motown/Stax＋復古 soul＋neo-soul＋誤標流行歌手）與 `--fix-only` 模式；重抓或補新卡後自動套用，
  不會被 Last.fm 重新污染。執行後 seed 修正 151 列、apex 修正 11 列。
- 修正後分布（seed 6,439 含標）：rock 2867 / jazz 1482 / electronic 1405 / pop 1133 /
  soul 790 / hiphop 720 / folk 655 / world 287 / classical 237 / blues 159。
- 主要檔案：`scripts/build-seed-genres.mjs`、`seed_cards.json`、`apex_pool.json`
- 驗證：抽查 Marvin Gaye→["soul"]、Stevie Wonder→["soul"]、TLC/Mariah/2Pac 維持 hiphop；
  apex hall hiphop 26→15（soul 經典退場）。已知遺留：apex pearl 那 2 張 hiphop
  （Ndikho Xaba、Khan Jamal）其實是 spiritual jazz，待嘻哈擴充時一併處理。

### 2026-07-23｜試聽暫時只留 iTunes（YT/Spotify iframe 無法淡入淡出）

- Repo：`dip-vinyl-shop`
- 店主決定：YouTube iframe 音量控不了、做不到淡入淡出，**查無 iTunes 試聽的卡暫時不播音樂**。
- 改動（`dip-player.js`，v=30→31）：
  1. 固定連結是 YouTube 的卡：安靜停下（emit stopped、code YT-MUTED），不播、不退回即時搜尋。
  2. 即時來源鏈一律只剩 `['itunes']`——原本的 iTunes→YouTube→Spotify 混合退階整段保留在 git 歷史，恢復時把 `order` 換回即可。
- 影響：album_overrides 裡 previewUrl 為 YT 的卡（批次1 的 NWW《Chance Meeting》、Coil《Angelic Conversation》＋正名後那 10 筆日爵）以及 iTunes 查無的卡都會靜音。之後若做出可淡出的 YT 方案（或改存 .m4a）再恢復。
- 主要檔案：`dip-player.js`、三頁 v=31

### 2026-07-23｜日籍藝人全面正名為漢字（73 張七層遷移）＋命名規則入公式

- Repo：`dip-vinyl-shop`
- 店主核定：日籍藝人改用漢字／假名本名（46 組對照，含山本剛トリオ、今田勝トリオ、鈴木勲、日野皓正、宮間利之とニューハード、山下達郎、竹内まりや、大貫妙子、大滝詠一、細野晴臣、坂本龍一、吉村弘、高田みどり、清水靖晃、福居良等）；**官方拉丁藝名保留**（Ryoji Ikeda、Ken Ishii、rei harakami、Susumu Yokota、TOWA TEI、Mariah、Inoyama Land、YMO、Alva Noto & Ryuichi Sakamoto 合作計畫）；韓籍待店主定案暫不動。
- 七層遷移（`scratchpad/kanji-rename/migrate.mjs`，斷點續跑）：73 張全成功——seed/apex 改名＋刪 1 張跨拼法重複（Isao Tomita《Snowflakes Are Dancing》＝冨田勲版）；card_catalog 建新文件（保留封面/三軸/tier，舊文件 updatedAt=1 且無 desc 才刪）；KV `desc4:` 新鍵（簡介內文羅馬字名同步替換）；**KV `mapgenre3:` 曲風預播種**（用羅馬字查好標籤存進漢字鍵——不做這步漢字卡會從曲風流派抽牌池掉出去）；試聽地圖搬 29 鍵＋rebuild；狀態檔搬 34 鍵。battle.html 內建備援卡池 5 筆同步改名。
- `ALBUM_ONBOARDING.md` 新增 §0.5 命名規則：日籍用本名、官方拉丁保留、非拉丁名上架必須預播種 mapgenre3/desc4 兩鍵。
- 驗證：漢字鍵 `/album-desc`（山本剛トリオ|Midnight Sugar）與 `/album-genres`（山下達郎|For You）皆 KV-HIT；3 張舊名本就無曲風標籤（竹内まりや Variety／高柳昌行 Lonely Woman／植松孝夫 Debut），無損失。
- **店主待辦兩件**：①後台「批次固定試聽連結」貼 `scratchpad/kanji-rename/owner-overrides.json`（10 筆日爵固定試聽掛到新名下）；②「頂級牌」重按匯入＋入庫（讀新 apex_pool.json），並把清單裡舊羅馬字版（Masahiko Togashi／Takeo Moriyama／Fumio Itabashi／Takashi Kokubo／Kohsuke Mine／Hijokaidan／Yoshio Ojima）用 ✕ 刪掉，避免新舊並列。
- 已知殘留：玩家已抽的卡保留舊羅馬字名（uid 子集合無法批次遷移），同專輯可能新舊兩卡並存於卡冊，屬預期。

### 2026-07-23｜舊 apex 長尾 14 張 noCover 救回 12 張（純 Firestore，未 commit repo 檔案）

- Repo：`dip-vinyl-shop`（僅 PROJECT_MEMORY 本條；封面寫 Firestore card_catalog）
- 店主重按入庫後仍剩 14 張無封面——runQuery 撈出全是**舊 apex 名單長尾**（非電子批）：私盤怪奇（Zerfas、Moolah、Anno Luz、3 Hür-El、Egisto Macchi、山小屋、Michael A. Grant）＋名稱陷阱名盤（Big Star《Third/Sister Lovers》斜線、Peter Gabriel《(Melt)》括號、The Police）＋日韓噪音（Boredoms、非常階段、Ground Zero、尾島由郎）。
- 救回 12 張寫進 card_catalog：CAA 鏈 9 張（Spotify 全程 429 零命中）＋手動變體 3 張——Peter Gabriel 用「Peter Gabriel 3: Melt」、Big Star 用 iTunes 正名「Third」（第一輪配到《Complete Third》demo 盒已駁回）、尾島由郎配到《Une Collection des Chaînons I》（**apex_pool 名單標題拼錯**：Chaînées 應為 Chaînons，卡片仍用舊拼法、封面正確；要正名得改 pool＋遷移 Firestore 文件 id，暫留待辦）。
- 真無封面 2 張：San Ul Lim《The Mountain Hut》、Michael A. Grant 同名（私盤，各平台皆無）——維持 noCover 略過，或考慮自 apex_pool 移除。
- 店主操作：後台重按「⚡⚡ 全部入庫」，新封面鏈會從 card_catalog 直接命中這 12 張。

### 2026-07-23｜修正後台頂級牌入庫「重抓封面」把地下盤全標 noCover

- Repo：`dip-vinyl-shop`
- 店主入庫新王牌時發現大量「無封面略過」。根因：`admin.html` 的單張入庫與「⚡⚡ 全部入庫」抓封面**只打 worker /spotify-search**——本輪電子擴充的王牌（工業／Detroit／glitch）多不在 Spotify（封面本來就是 Bandcamp/CAA 解到、且 onboarding 已預熱進 card_catalog），Spotify 查無→標 `noCover`→之後永遠被排除。
- 修正（新增 `apexFindCover()` 封面鏈，三處共用）：
  1. **先讀 card_catalog 既有 coverUrl**（預熱過的直接命中、零 API）→ 查無才 worker Spotify → 再退 worker Bandcamp。
  2. 入庫候選不再排除 `noCover`（改為排序靠後），成功入庫時 `deleteField()` 清掉 noCover 標記——先前被 Spotify 誤判/429 的能自動救回。
- 主要檔案：`admin.html`
- 驗證：module script 語法 parse 通過；店主部署後重按「全部入庫」即可重試所有 noCover 卡。

### 2026-07-23｜電子補完批次9：98 張上架（店主加碼 100 張）

- Repo：`dip-vinyl-shop`
- 店主問「能否再補 100 張」→ 兩源合擊：**落榜區回收 60**（批次2/3-8 full-ranked 備份裡 classic 3、listeners≥5000 的熱門盤，Clark/Plaid/Ellen Allien/Apparat/The Black Dog 等，每藝人上限 4）＋**新藝人線 45**（ambient/drone：Basinski/Tim Hecker/Fennesz/Biosphere/The Orb；法式：Laurent Garnier/St Germain/Cassius/Étienne de Crécy/Mr. Oizo；英倫：808 State/A Guy Called Gerald/Leftfield/MJ Cole；footwork：Jlin；Matmos/Mouse on Mars 等 20 位）→ 105 候選 → 封面 105/105 → 研究後剔除 7 張（mixtape/迷你配樂/系列合輯/demo 合輯/有聲書配樂等）→ **98 張全過雙 gate**。
- 數量：一般卡 94（seed 6346→6440）；apex 4（hall：Biosphere《Substrata》；pearl：Jlin《Autobiography》、A Guy Called Gerald《Silent Sound Spread Spectrum》、Alexander Robotnick《Kind of... Robotnick》，皆 obscurity 5＋listeners<300）。preview ready 87／unavailable 11。
- 踩坑修復：**Apple「(Bonus Track Version)」後綴讓標題比對失敗**——Modeselektor 兩張、Lost Themes II 全滅在第一輪，`core()` 剝除清單加 bonus|version 後救回；resolver 腳本已同步修補。q3 agent 漏標 lengthReviewed 29 張（內容掃過無冗贅，補標後過 gate）。
- 驗證：prepare gate 0 error；published gate 98 張 0 error 0 warning。
- 主要檔案：`seed_cards.json`、`apex_pool.json`、`data/apple-audio-map-v1.json`＋runtime、`card-preview-status.js`
- **電子擴充總計（07-22~23 四波）**：77＋64＋182＋98＝**421 張新卡**；seed 6440、apex 628（hall 410/pearl 107/heresy 111）。店主後台「頂級牌」待入庫累計 28 張新王牌。

### 2026-07-23｜電子擴充批次3-8 合併執行：182 張上架（電子擴充計畫完成）

- Repo：`dip-vinyl-shop`
- 店主指示批次全部合併執行：65 位藝人（Berlin dub techno／Kompakt／UK 工業 techno／IDM 深挖／raster-noton glitch／合成器先驅+Italo+配樂／日本電子／UK bass+footwork）一次反查 → 1054 候選 → 修正 5 組 MB 錯抓（Maurizio→Maurizio Bianchi 工業噪音、Seether、Petula Clark、Mariah Carey、英搖版 Space；清掉 181 張污染）→ 917 評分 → 前 200＋手動補件 → 封面 100%（bandcamp 129/spotify 43/caa 29）→ 多輪剔除（自我同名 5、MB 誤標合輯/split/EP 6、Halloween 重複版 2、批內重複 3）→ **最終 182 張全過 published gate**。
- 數量：一般卡 167（seed 6179→6346）；**apex 15 張**（hall 3：Plastikman《Consumed》、Goblin《Suspiria》、Carpenter《Halloween》；pearl 4：冨田勲《The Planets》、Wendy Carlos×3——皆 obscurity 5＋listeners<300；heresy 8：Ryoji Ikeda×2、Venetian Snares×3、Pan Sonic×2、Alva Noto《unitxt》——皆 accessibility 5＋極端聲響證據）。preview ready 155（Apple .m4a 直連，靜態地圖）／unavailable 28（狀態檔）。
- 評分覆核抓到的系統性問題：**藝人名寫法會讓 bulk 評分靜默失敗**——`µ‐Ziq`（U+2010）整批 0 筆、Plantasia/Kakashi/Lunatic Harness 其實早在池中（3c 的 apex+變體比對接住 4 張，prepare gate 接住繞過去重的 Biokinetics 手動補件）。Mariah《うたかたの日々》AI 評 classic 2 人工修正 4（Palto Flats 再版正典）。
- 有趣配對：Apple TW 把 Pole 掛名「Pole吖」，曲目名逐一核實後確認是本尊，試聽保留。
- 三個 chunk agent 的 needsReview 全數裁定剔除：Goblin 精選輯、VS split 合輯、Gas《November 89》合輯、Ikeda《Time and Space》EP、Oval《Szenariodisk》CDEP、Seefeel 2024-25 迷你專輯×2（例外白名單只留有歷史地位的正典 12 吋，不放水）。
- 驗證：prepare gate 0 error（中途接住 1 張 http 證據網址＋1 張重複卡）；published gate 182 張 0 error 0 warning。
- 主要檔案：`seed_cards.json`、`apex_pool.json`、`data/apple-audio-map-v1.json`＋runtime、`card-preview-status.js`
- **電子擴充計畫總結**（2026-07-22~23，三個 commit 波次）：批次1 工業/synth-pop 77 → 批次2 Detroit/Chicago 64 → 批次3-8 合併 182，合計 **323 張新卡**（一般 294＋apex 28＋批次1升級9），電子類從 ~1028 張達到約 1350+。待辦：店主後台「頂級牌」匯入＋入庫（累計批次1 5張＋批次2 4張＋本批 15 張=24 張新王牌）。

### 2026-07-23｜電子擴充批次2：Detroit／Chicago 起源 64 張上架（首用 EP/Single 例外＋試聽改走靜態路徑）

- Repo：`dip-vinyl-shop`
- 1b 反查 35 位起源藝人（DAF 教訓沿用：Lil Louis 需查「Lil Louis & The World」）→ 266 候選 → 評分取前 60 → 封面 60/60（bandcamp 34/spotify 14/caa 12）→ 剔除 MB 誤標的 UR《Interstellar Fugitives》（實為合輯）、《Alleys of Your Mind / Off to Battle》（2004 合併再版）、《Omega: Alive》（live）、《Black Jazz Signature》（DJ-mix）→ 專輯 56 張。
- **首次使用 §5.5 曲風例外**：8 張奠基 12 吋（Strings of Life、Acid Tracks、No UFO's、Your Love、Move Your Body、French Kiss、No Way Back、Can You Feel It），MB 逐張核實 EP/Single、各附 ≥2 歷史地位證據；Adonis《No Way Back》AI 評 classic 2 人工修正 4（留 manualNote）。
- 數量：一般卡 60（seed 6119→6179）；**hall 王牌 4 張**（Strings of Life／Acid Tracks／Your Love／Can You Feel It，皆 classic=5＋跨來源共識；apex hall 406）——沿用店主「頂點卡都上」決策，如不同意可撤。preview ready 47／unavailable 17（地下廠牌不上串流屬預期；Frankie Knuckles《Your Love》iTunes 只有 Director's Cut 重錄版，人工駁回改 unavailable）。
- **試聽改走靜態路徑（店主核定為預設）**：47 張 ready 寫進 `data/apple-audio-map-v1.json`（含 collectionId）→ 重建 runtime；17 張 unavailable 追加 `card-preview-status.js`。不再需要店主進後台貼 JSON。`ALBUM_ONBOARDING.md` §6 已改寫為「兩條等價路徑」；驗證器 published gate 同步支援：album_overrides 缺文件（404=合法）時 fallback 驗靜態地圖／狀態檔。
- 踩坑：published gate 首跑 64 error——getJson 在 fallback 判斷前就把 404 記成 error；加 `allow404` 參數修正。另 chunkA agent 誤引 3 個 http:// 來源網址（驗證器擋下，換 https 或替代來源）。
- 驗證：prepare gate 0 error；封面＋試聽網址全數實測 2xx；published gate 0 error 0 warning。
- 主要檔案：`seed_cards.json`、`apex_pool.json`、`data/apple-audio-map-v1.json`、`data/apple-audio-runtime-v1.json`、`card-preview-status.js`、`scripts/verify-album-onboarding.mjs`、`ALBUM_ONBOARDING.md`
- 待辦：店主後台「👑 頂級牌」匯入＋入庫（批次1的5張＋本批4張一起）；批次3-8 評分進行中（917→前200）。

### 2026-07-22｜批次1頂點卡 9 張採用＋發現並修正「一卡兩身分」撞名

- Repo：`dip-vinyl-shop`
- 店主核定批次1全部 9 張頂點候選採用：hall×2（TG《20 Jazz Funk Greats》、OMD《Architecture & Morality》）、heresy×7。
- **執行時發現批次1去重漏洞**：5 張卡（TG《Second Annual Report》、NWW《Chance Meeting》、Neubauten《Kollaps》、CabVolt《Red Mecca》、SPK《Leichenschrei》）**早已在 apex_pool.heresy 固定名單**，批次1仍把它們上架成普卡——去重只比對了 seed_cards.json，沒比 apex_pool.json，造成一卡兩身分（普卡＋王牌並存）。
- 修正：10 張自 seed_cards.json 移除（9 張升級＋本來就是王牌的 Red Mecca），apex_pool.json 新增 5 張（其餘 5 張原本就在）；seed 6129→6119、apex hall 400→402、heresy 100→103。
- **工具防呆三處**（之後所有批次自動生效）：`verify-album-onboarding.mjs` prepare gate 加 apex_pool 撞名檢查；skill 的 `2b-rate-and-rank.mjs` 與 `3c-dedupe-finalize.mjs` 的「排除現有卡池」都改為 seed＋apex 聯集。
- 待辦：店主需在後台「👑 頂級牌」按「⬆ 匯入固定名單」＋「⚡⚡ 全部入庫」（等 Pages 部署完新 apex_pool.json 再按），把新 5 張寫進 Firestore card_catalog(tier)＋album_overrides.tier；完成後跑 manifest published gate 覆核。
- 主要檔案：`seed_cards.json`、`apex_pool.json`、`scripts/verify-album-onboarding.mjs`、skill scripts×2

### 2026-07-22｜電子擴充批次1：工業／synth-pop 根源 77 張上架

- Repo：`dip-vinyl-shop`
- 電子擴充第一批（規劃見同日「曲風 release type 例外」條目）：1b 藝人清單反查 39 組（DAF、OMD 需用全名 Deutsch Amerikanische Freundschaft／Orchestral Manoeuvres in the Dark 才不會抓錯人）→ 730 候選 → 排除已覆蓋充足的 6 團 → 620 張評分排序取前 80（classic 門檻線 4）→ 封面 80/80 → 排除 2 張髒資料（TG《CD1》《2nd Annual Report》變體）與 1 張未授權 bootleg（TG《The First Annual Report》）→ **77 張全部完成 onboarding 並上架**。
- 數量回報：候選 730／排除 653／一般卡 77／頂點候選 9（未採用）／preview ready 76（74 Apple .m4a＋2 YouTube）／unavailable 1（Coil《ANS》盒裝無串流）／disabled 0。曲風：73/77 判 electronic，4 張 Current 93 後期作正確歸 folk 保留。seed_cards.json 6052→6129。
- 頂點卡候選（記錄在 manifest、**尚未寫入 apex_pool.json，待店主決定**）：hall×2（TG《20 Jazz Funk Greats》、OMD《Architecture & Morality》）；heresy×7（TG《Second Annual Report》《D.o.A.》、NWW《Chance Meeting》《Homotopy to Marie》、Neubauten《Kollaps》《Zeichnungen》、SPK《Leichenschrei》）。
- 規則調整（店主核定）：簡介 180 字上限放寬——審核過無冗贅字詞可超過，manifest 標 `description.lengthReviewed=true`；驗證器與 ALBUM_ONBOARDING.md 已同步。
- 踩坑記錄：
  1. `2-resolve-covers.mjs` 讀 `row.title` 但 2b 精選流程輸出是 `album`，欄位對不上時不報錯、查字面 "undefined" 還巧合全配到同一張封面、假 100% 命中——已改成 title/album 都吃＋缺值防呆。**精選流程餵步驟 2 前務必轉 `{artist,title}`（skill 文件本來就有寫，這次是漏做）。**
  2. 固定試聽一開始誤填 music.apple.com **網頁**連結（admin 白名單擋下才發現）；播放器（`pinnedPreviewKind`）要的是 audio-ssl.itunes.apple.com 的**直接 .m4a 音檔**或 YouTube 連結。已用本機 iTunes Search API（沿用 build-apple-audio-map 比對邏輯、score≥85）重解 74 張＋手動補 6 張。
  3. 三個研究 agent 的簡介 46/78 超出 180 字，逐張人工精簡回區間（此事促成上述放寬政策，適用之後批次）。
- 主要檔案：`seed_cards.json`（+77）、`ALBUM_ONBOARDING.md`、`scripts/verify-album-onboarding.mjs`、Firestore `card_catalog`（77 筆 PATCH）、`album_overrides`（店主經後台批次工具寫入 77 筆）、Worker KV desc2:（77 筆）
- 驗證：prepare gate 0 error；封面／試聽網址全數實測 HTTP 2xx；`/album-desc` 抽查 KV-HIT 且文字一致；album_overrides 回讀 77/77 一致；published gate 0 error 0 warning。

### 2026-07-22｜上架公式新增「曲風 release type 例外」白名單（電子樂開放 EP／Single／DJ-mix）

- Repo：`dip-vinyl-shop`
- 背景：電子擴充前分析（電子現約 1028 張、564 藝人），Detroit/Chicago 起源與工業／synth-pop 根源是最大缺口，但大量經典是 12 吋單曲／EP／DJ mix，被「只收 primary-type=Album」擋掉。店主核定：只對電子樂開門，其他曲風未來偵測到同類文化再逐一指定；不開單一藝人精選輯窄門（Compilation 一律仍不收）。
- 改動：
  1. `ALBUM_ONBOARDING.md` 新增 §5.5「曲風 release type 例外（白名單制）」：白名單目前僅 `electronic`；開放 `EP`／`Single`／`DJ-mix`（DJ mix 限 DJ-Kicks、fabric 等公認系列）；manifest `identity` 需多填 `genreException`／`exceptionReason`／`exceptionEvidenceUrls`（≥2 個 HTTPS 證據網址，精選制）；其餘流程與正規專輯完全相同。
  2. `scripts/verify-album-onboarding.mjs`：新增 `EXCEPTION_RELEASE_TYPES`／`EXCEPTION_GENRES` 常數與對應驗證分支；非白名單曲風、缺理由、證據不足兩個網址都會 error。
- 主要檔案：`ALBUM_ONBOARDING.md`、`scripts/verify-album-onboarding.mjs`
- 驗證：`node --check` 通過；以假 manifest 實測五種路徑（合法例外 0 error、缺 genreException、白名單外曲風、證據只 1 個、Compilation）全部按預期擋下或放行。
- 附帶發現：卡池 Jarre 藝人名混用兩種連字號（`Jean-Michel Jarre` 與 U+2010 版本），電子批次去重時要正規化。

### 2026-07-22｜對手虛晃選牌、數值輾壓與戰鬥酬勞平衡
- Repo：`dip-vinyl-shop`
- 對手 AI 改為先決定氣場與是否虛晃，取得最終出招屬性後才從手牌挑該軸最高星牌；同星再取總星較高者。`battle.html` 與 `roguelike.html` 同步修正，不再為了虛晃拿低星牌硬打。
- 數值輾壓門檻統一為「被剋方高 2 星以上，相剋失效並改走純比星」；Roguelike 補上原先缺少的判定，規則例改為硬蕊 2★ 對冷門 4★ 仍由冷門勝。全 1 弱牌不設相剋豁免，維持牌型效果、連段、割捨與淘汰等牌組管理用途，避免補償過頭成為萬用反制。
- 每場現金以 `fightMul: 1.5` 對基本、深度與藏家加碼的合計值整筆加成 50%；破紀錄獎金不屬於單場酬勞，維持原值，避免額外加速長期經濟。
- 主要檔案：`battle.html`、`roguelike.html`、`CARD_GAME_DESIGN.md`、`ROGUELIKE_DESIGN.md`
- 驗證：兩頁共 7 個 inline script block 全數通過 `node --check --input-type=module`；行為測試通過虛晃後最高星選牌、2★ 對 4★ 相剋失效、差 1★ 仍可相剋、雙向判定，以及一般／藏家戰鬥酬勞 ×1.5；`git diff --check` 通過。

### 2026-07-22｜新增專輯改為單一完整上架公式
- Repo：`dip-vinyl-shop`、`dip-vinyl-worker`、工作區 Claude／Codex skills
- 店主要求之後只要新增專輯，一律完成「身分／跨文字系統去重 → 封面 → 三軸 → 頂點卡資格判定 → 查證型繁中簡介 → 固定試聽／無來源狀態 → 上架 → 線上回讀」，不得只加 seed 或封面後再慢慢補。
- 新增 `ALBUM_ONBOARDING.md` 作為唯一完成契約與 manifest schema。流程改為先寫 `card_catalog`、Worker 簡介 KV、`album_overrides`，全部回讀成功後才把 `seed_cards.json`／`apex_pool.json` 當上架開關；頂點卡逐張評估，但 legendary 或單軸 5 分不會自動升格。
- 新增 prepare／published 雙階段 gate `scripts/verify-album-onboarding.mjs`：驗身分、封面 HTTP、三軸／rarity、頂點條件、80–180 字簡介與兩個來源、Apple／YouTube 固定試聽；published 模式另回讀 seed／apex、Firestore、`/album-desc` KV cache 與網址。
- Worker 新增 `scripts/desc-gen/from_onboarding_manifest.mjs`，可在 seed 曝光前直接把已完成 manifest 轉為 `desc2:`／`desc4:` KV bulk，避免既有 `build_tasks.mjs` 必須先讀 seed 而顛倒發布順序。
- `AGENTS.md`／`CLAUDE.md`（工作區、shop、worker）與 `.agents`／`.claude` 的 `dip-card-pool-expand` 都加入強制路由；`dip-album-intro` 明確只處理既有商品／reels 的獨立補文。Codex 與 Claude 共用資料查證、文案規格與 gate，品質不綁特定模型名稱。
- 主要檔案：`ALBUM_ONBOARDING.md`、`scripts/verify-album-onboarding.mjs`、worker `scripts/desc-gen/from_onboarding_manifest.mjs`、兩 repo 與工作區規則、兩套 skill 鏡像
- 驗證：完整 prepare manifest 0 error、不完整 manifest 正確被擋；mock Firestore／Worker 加真實 HTTPS URL 的 published gate 0 error；manifest→KV 轉檔正確分流 `desc2`／`desc4`；兩份 card-pool skill SHA-256 完全一致、frontmatter／名稱／描述／500 行上限通過等價 quick validation；所有鏡像 card-pool scripts 與新增兩支腳本 `node --check` 通過。

### 2026-07-22｜固定試聽改為完整零 live provider 查詢，補齊無來源狀態與管理安全
- Repo：`dip-vinyl-shop`
- 店主確認目標：本輪新增專輯要比照商品固定試聽的原則，播放／開介紹時直接讀預先覆核的來源，不再每次臨時搜尋 Apple、YouTube、Spotify 或 Bandcamp；無可靠來源者寧可不播，不可為湊試聽誤配。
- `dip-player.playAlbum()` 新增 `fixedOnly`：固定 Apple 音檔或 YouTube 命中即播放且零 provider lookup；固定連結失效或明確無來源時直接停止（S11），不再偷偷 fallback。未納入人工稽核的舊卡仍保留原本即時 fallback，相容機制未移除。
- 新增 `card-preview-status.js` 保存本輪負面稽核結果：40 張三盲鼠＝`disabled`、101 張查無可靠來源＝`unavailable`；連同 Firestore 385 張固定連結，526 張本輪新卡完整覆蓋（385+40+101），無漏項、無額外項。唱片櫃首屏預抓與卡片介紹的 Spotify／Bandcamp enrichment 會跳過上述全部人工稽核卡。
- `battle.html`／`roguelike.html` 也會先讀固定試聽及負面狀態；20 筆可控音量的 Apple 直連可直接播放，365 筆 YouTube 固定來源因遊戲頁 iOS iframe 音量不可控而不播放、也不再另查 Apple。Firestore override 讀取加入頁內 cache。
- 後台「清除介紹／評分校正」改為只刪 `desc`／三軸／`tier`，保留 `previewUrl`／`previewStatus`；純試聽 override 改標「固定試聽」而非「已校正」。批次工具新增 `ready`／`unavailable`／`disabled` 狀態支援，未來可直接寫入正向或負向稽核結果。
- 主要檔案：`card-preview-status.js`、`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`admin.html`、`verify-playback.mjs`
- 驗證：`verify-playback.mjs` 通過固定 Apple、固定 YouTube、fixed-only 失效不查 provider、舊卡 fallback 保留等測試；526 張狀態重算為固定 385／disabled 40／unavailable 101，0 mismatch、0 extra；四頁 inline scripts、兩支 JS `node --check`、`git diff --check` 全數通過。

### 2026-07-22｜本輪爵士新卡固定試聽寫入（排除三盲鼠）
- Repo：`dip-vinyl-shop`
- 依店主指示，三盲鼠 40 張維持不處理試聽；本輪其餘 486 張新增專輯沿用固定連結流程，寫入受管理員規則保護的 Firestore `album_overrides.previewUrl`，前端專輯資訊會優先播放固定來源。
- 嚴格核對後取得 385 張可靠來源：YouTube Music Album playlist 349 張、YouTube 完整專輯影片 16 張、Apple 30 秒試聽音檔 20 張；全部網址實抓為 HTTP 2xx/3xx。另 101 張在 YouTube 與 Apple 都查無可靠配對，未強制寫入，避免播錯專輯。
- 後台卡牌管理新增可重用的「批次固定試聽連結」工具：僅接受 YouTube／Apple HTTPS 網址、檢查重複與必填欄位、每 400 筆分批 commit，使用 merge 保留既有介紹、三軸及頂級牌設定。
- Firestore 回查：385/385 筆 artist+album 文件的 `previewUrl` 與預定值完全一致，101 張未配對專輯沒有誤寫；既有 Abdullah Ibrahim《Good News From Africa》的 `desc` 與 `accessibility` 也確認保留。
- 主要檔案：`admin.html`、`PROJECT_MEMORY.md`
- 驗證：`admin.html` module script 通過 `node --check --input-type=module`；`git diff --check` 通過；385 個固定網址全數實際可讀；Firestore `album_overrides` 精確比對 0 mismatch。

### 2026-07-22 — jazz card-pool audit fixes and playback verification
- Repo: `dip-vinyl-shop` (plus mirrored workspace skill scripts)
- Removed 16 confirmed bad cards from `seed_cards.json`: six duplicate release groups / alternate credits and ten non-Album releases (Singles, EPs, or compilations). Deleted the matching Firestore `card_catalog` documents only after confirming `updatedAt=1` and no `desc`; all 16 now return HTTP 404.
- Hardened both copies of `1-label-catalog.mjs` (`.claude/...` and `.agents/...`): request MusicBrainz `release-groups` and retain only `primary-type=Album`, preventing future label imports from admitting Singles/EPs/compilations.
- Verification: `seed_cards.json` parses as 6,052 cards; every row has five fields and 1–5 integer axes; no case-folded artist+album duplicates; `node --check` passes for every card-pool script.
- Playback audit of the 486 surviving cards added in this expansion: 363 have a resolved `/yt-music-link` source (347 YouTube Music album playlists, 16 verified full-album videos). 123 resolve to no YouTube URL. The deployed Spotify endpoint returned no URL for all 486 and `/itunes-album-preview` returned HTTP 404 for all 486, so the unresolved 123 currently have no player fallback. Kept those album cards rather than deleting legitimate releases solely for catalog availability.

### 2026-07-22｜Disques Vogue 精選 20 張爵士（曲風先篩選再選卡）

- Repo：`dip-vinyl-shop`
- 店主指示 Vogue 的爵士很值得收，但只要 20 張精華即可。
- **驗證了先前的預判**：Vogue（1947–73 法國全類型國家級廠牌）直接反查 680 候選 →
  評分排序前 60 名幾乎全是法語香頌／流行／不相干授權再版（The Doors、ABBA、Lionel
  Richie、Sugarhill Gang），真正的爵士（Monk、Garner、Django Reinhardt、Sidney
  Bechet）散落其中只占約 1/6。
- **改用「先篩曲風、再選卡」的新做法**：不直接對評分排序前 N 名解封面，而是先對
  `classic≥4` 的 152 張候選逐一打 `/album-genres`，篩出 45 張帶 `jazz` 標籤的，
  再依 classic／listeners 排序取前 20 → 解封面 → 去重。這個做法比較適合「廠牌內容
  龐雜、只要抓出其中一個曲風」的情況，跟波蘭 Muza 那次「改查系列」是不同的解法，
  視廠牌實際情況選用。
- 45 張候選裡有大量迪吉·葛拉斯彼／薛尼·貝雪的巴黎現場錄音（1948–1954 這幾位美國
  爵士樂手常駐巴黎演出，正是 Vogue 廠牌抓到這些錄音的原因）。
- **抓到一張「樂團名＝專輯名」自我同名卡**：`Experience - Experience`（1971 年同名
  法國爵士搖滾團）——沿用三盲鼠那次的規則直接排除，不等實際發生 YT 誤配才處理。
  用下一名候選 `Don Byas - Tenderly` 遞補。
- 封面命中率偏低（首輪 17/20，85%；3 張沒中又逐輪候補到剛好 20 張，總共測了近 30 張
  候選才湊齊）——這批多是罕見的 1950 年代巴黎現場錄音，CAA／Bandcamp 收錄率本來就低。
- `seed_cards.json` 6048 → **6068 張**。20 筆封面＋三軸＋rarity 已 PATCH 進 Firestore
  `card_catalog`。
- 主要檔案：`seed_cards.json`
- 驗證：`seed_cards.json` parse 通過、6068 張全部 5 欄位且三軸皆 1–5 整數；20 張與現有
  卡池無重複；Firestore 抽驗 3 筆（Monk、Django Reinhardt、Bechet）封面圖實抓 HTTP 200。
- 待辦：爵士曲風目前約 1470 張（1450 + 20），距 1500 目標僅差約 30 張。

### 2026-07-22｜法國／德國三廠牌：BYG／Saravah／MPS 共 108 張

- Repo：`dip-vinyl-shop`
- 延續前一批（波蘭／義大利／現代英國／日本），繼續處理法國、德國剩下的廠牌。
- 三批各自：廠牌反查 → 評分排序取精選 → 只對短名單解封面 → 去重：
  - **BYG**（法國自由爵士）：103 候選 → 40（classic 門檻 4）→ 98% 命中 → 去重後 37
  - **Saravah**（法國香頌／世界音樂為主，夾雜爵士）：111 候選 → 40（門檻 3）→ 93% 命中 → 去重後 33
  - **MPS**（德國）：511 候選 → 45（門檻 4）→ 87% 命中 → 去重後 38
  - 三批合計 108 張，跨批次同名重複 0 筆。
- **MPS 目錄反查在 MusicBrainz 遇到暫時性 503 過載，整支腳本掛掉**——`1-label-catalog.mjs`
  原本沒有重試機制（只有先前為系列查詢寫的 `1c-series-catalog.mjs` 有）。已補上同一套重試
  邏輯（503 重試、間隔 2 秒、最多 3 次）＋分頁迴圈改成單頁持續失敗就跳出繼續，不會讓整批
  作廢重來。修好後 MPS 重跑一次成功抓到 827 releases。
- BYG／Saravah 這兩個廠牌本身內容龐雜（BYG 混了前衛搖滾團 Gong、Saravah 混了大量法語香頌），
  不是爵士專屬——沿用 ECM New Series 古典樂那次的原則：**非目標曲風的正確分類結果直接保留**，
  不必為了「這次是爵士擴充」而排除。
- 人工抓到自動化去重漏網的兩筆（BYG）：`Gong - Camembert Electrique` vs
  `Gong - Camembert électrique`（有無重音符號的同一張碟）；
  `Anthony Braxton - B-X0 N0-47A` vs `B-X° / NO-I-47ᴬ`（同一個神秘代號標題的不同符號轉寫）。
  兩組都手動移除其中一筆。
- `seed_cards.json` 5940 → **6048 張**。108 筆封面＋三軸＋rarity 已 PATCH 進 Firestore
  `card_catalog`。90/108 帶 `jazz` 標籤，其餘正確分類到 `folk`／`classical`（Areski Belkacem
  香頌、Bach 鋼琴演奏）不算誤判，直接保留。
- 主要檔案：`seed_cards.json`、`.claude/skills/dip-card-pool-expand/scripts/1-label-catalog.mjs`
  （補 503 重試與分頁容錯，跟 `1c-series-catalog.mjs` 同一套邏輯）
- 驗證：`seed_cards.json` parse 通過、6048 張全部 5 欄位且三軸皆 1–5 整數；108 張與現有卡池
  及批內皆無重複；Firestore 抽驗 3 筆（Grappelli、Fontaine、Gong）封面圖實抓 HTTP 200。
- 待辦：爵士曲風目前約 1450 張（1360 + 90），距 1500 目標僅差約 50 張，已接近完成；
  Disques Vogue（法國，765 releases）尚未處理——同波蘭 Muza 的疑慮，這是 1947–73 全類型
  國家級廠牌，若要收建議先用 1c 查有沒有對應的精選系列，不要直接用整個廠牌反查。

### 2026-07-22｜六批爵士擴充：波蘭／義大利／現代英國／日本／德國共 245 張

- Repo：`dip-vinyl-shop`
- 店主指示：波蘭/法國/德國、Black Saint、enja、其他日本廠牌、現代爵士（Yussef Dayes 一系）都要收，直接開始。
  先偵察 36 個候選廠牌在 MusicBrainz 的目錄規模，並比對現有卡池找覆蓋缺口——波蘭 0 張、
  日本非三盲鼠系 2 張、現代英國新浪潮 0 張，判定為優先順序；主流現代爵士（Yussef Dayes、
  Ezra Collective、Nubya Garcia、Kamasi Washington、Robert Glasper 等）其實已經在池子裡且
  分類正確，不必重收。
- 六批各自流程：廠牌/系列反查 → 評分排序取精選短名單 → 只對短名單解封面 → 去重 → 最終：
  - **Black Saint**：212 候選 → 45（classic 門檻 4）→ 100% 命中（43 Bandcamp／2 CAA）→ 去重後 44
  - **Soul Note**：335 候選 → 45（門檻 4）→ 96% 命中 → 去重後 43
  - **Enja**：703 候選 → 50（門檻 4）→ 96% 命中 → 去重後 47
  - **現代英國新浪潮**：改用**藝人清單反查**（非廠牌，因這批人散在多個小廠牌）；
    20 位藝人（Kamaal Williams、Joe Armon-Jones、Theon Cross、Nala Sinephro、Kokoroko、
    Yazz Ahmed、Butcher Brown、Christian Scott aTunde Adjuah 等）→ 105 候選 → 40（門檻 3）
    → 98% 命中 → 去重後 39
  - **日本 East Wind＋Better Days＋Trio＋Paddle Wheel**：四廠合併 426 候選 → 45（門檻 4）
    → 84% 命中 → 去重後 34（+1 張人工合併版）
  - **波蘭**：第一輪用整個廠牌 Polskie Nagrania "Muza" 反查（528 候選）**結果作廢**——
    這是波蘭國家廠牌，目錄混了蕭邦、哥雷茨基古典樂、Bruce Springsteen 授權版、波蘭搖滾樂團，
    不是爵士專屬。改用 MusicBrainz 的「Polish Jazz」**系列**條目（那套知名編號 1–80 精選系列），
    但該系列在 MB 只登錄 17 張（社群維護不完整），改**補一批藝人清單**（Komeda、Stańko、
    Namysłowski、Urbaniak、Seifert、Marcin Wasilewski Trio 等 18 位）202 候選，
    系列+藝人合併去重後 215 候選 → 45（門檻 4）→ 84% 命中（含 1 張終於等到 Spotify 恢復命中）
    → 去重後 38
  - 六批合計 245 張，跨批次同名重複 0 筆。
- **抓到自動化去重漏網的一個案例**：日本批 `Ryo Fukui - シーナリィ`（片假名拼音）與
  `福居良 - SCENERY`（漢字本名＋英文標題）是同一張 1976 年名盤《Scenery》，因文字系統
  完全不同（片假名 vs 拉丁字母），正規化字串比對抓不到。人工合併成一張
  `Ryo Fukui - Scenery`（沿用漢字版的冷門度 5，較符合這張盤的真實定位；片假名版聽眾數
  267704 明顯是 Last.fm 名稱誤配到別的熱門作品）。
- **藝人名最佳化撿到一個系統性問題**：`Chief Xian aTunde Adjuah`（Christian Scott 現在的法定
  藝名）6 張專輯全部查無曲風標籤；換成他更廣為人知的 `Christian Scott aTunde Adjuah` 或
  `Christian Scott` 就能正確查到 `jazz`。全部 6 張手動改名。
  最終 236/245 帶 jazz 標籤。
- 新增 skill 腳本：
  - `1b-artist-discography.mjs`：目標是藝人群而非廠牌時，逐位查 MB 官方專輯（release-group
    type=Album），比廠牌反查準——這批藝人散在很多小廠牌。**踩過一次藝人誤配**：搜尋
    「Christian Scott」抓到一位電玩配樂作曲家，必須用全名消歧義。
  - `1c-series-catalog.mjs`：目標是 MB 的「release-group series」而非整個廠牌時用——
    國家/官方廠牌的 label 目錄是全部產出混一起，不是只有你要的子系列。
    **踩過一個 API 欄位 bug**：MB 回傳的是底線 `release_group` 不是連字號 `release-group`，
    第一次抓到 0 張；也遇過 MB 503 暫時過載，已加重試與逐筆存檔（不會因中途失敗全部重來）。
- `seed_cards.json` 5695 → **5940 張**。245 筆封面＋三軸＋rarity 已 PATCH 進 Firestore
  `card_catalog`。稀有度分布 uncommon 119／epic 103／legendary 12／rare 11。
- 驗證：`seed_cards.json` parse 通過、5940 張全部 5 欄位且三軸皆 1–5 整數；245 張與現有
  卡池及批內皆無重複；Firestore 抽驗 4 筆（Komeda、Ibrahim、Fukui、Braxton）封面圖實抓
  HTTP 200 均通過。
- 待辦：爵士曲風目前約 1360 張（1123 + 236 新增 jazz 標籤），距 1500 目標還差約 140 張。
  法國（BYG／Saravah）、MPS、Disques Vogue 尚未處理；`Air`（前衛爵士團）這次在 Black Saint
  出現一次《Air Mail》（非自我同名，應無虞），但下次遇到 Air 相關卡都要比照三盲鼠的規則
  檢查是否為自我同名撞名。

### 2026-07-21｜三廠牌撿漏：只用 CAA 重試沒中的 18 張，救回 1 張

- Repo：`dip-vinyl-shop`
- 店主指示撿漏這步只用 CAA／MusicBrainz，不必等 Spotify 恢復。
- 對 Venus／SteepleChase／ECM 三批處理過程中實際沒中封面的 18 張（Venus 1、SteepleChase
  16、ECM 1）用更寬鬆的 CAA 查詢重試（多組查詢寫法、release-group 補救、門檻降到 50 分）：
  **只救回 1 張**——`Franz Schubert & Valery Afanassiev - Sonate B-Dur, D. 960`
  （ECM New Series，這張封面掛在一張合輯 release 底下，第一輪的查詢寫法沒抓到）。
  其餘 17 張（多為 SteepleChase 的 Dexter Gordon／Kenny Drew 冷門重發版）判定
  MusicBrainz／CAA 確實沒有掃描封面，非查詢寫法問題，不再繼續嘗試。
- 救回的 1 張走完整流程：`/album-rating` 取三軸（classic 5／obscurity 2／accessibility 2，
  obscurity 用 AI 推估因 Last.fm 查無）→ 確認與現有卡池無重複 → 加入 `seed_cards.json`
  → PATCH 進 `card_catalog`（`updateMask` 部分更新）。
- `seed_cards.json` 5694 → **5695 張**。
- 驗證：Firestore 回讀 `franz schubert & valery afanassiev|sonate b-dur, d. 960` 三軸／
  rarity（uncommon）正確，封面圖實抓 HTTP 200；`seed_cards.json` parse 通過、5 欄位完整。
- 待辦：Venus／SteepleChase／ECM 三批最終定案 Venus 43、SteepleChase 45、ECM 41
  （128 + 1 撿漏）。爵士曲風目前約 1124 張，距 1500 還差約 376 張。

### 2026-07-21｜Venus／SteepleChase／ECM 三廠牌精選 128 張（爵士曲風擴充第二批）

- Repo：`dip-vinyl-shop`
- 店主指示三個廠牌都有上串流、都只留精華，直接開始。流程改成**先評分排序、只對精選出的
  短名單解封面**（不像三盲鼠那批對全部候選都跑封面鏈）——因為候選量太大（Venus 449／
  SteepleChase 559／ECM 1185，MB 目錄反查得到），若全部跑封面鏈會浪費大量在「反正會被砍掉」
  的候選上。新增 skill 腳本 `2b-rate-and-rank.mjs`（只評分排序，不解封面）。
- **Spotify 全程仍在 429 限流中**（本機直打 token 確認），封面來源全靠 Bandcamp／CAA，
  三個廠牌命中率都不差：Venus 44/45、SteepleChase 一路補到 45/45（34→45，兩輪候補）、
  ECM 49/50。等 Spotify 恢復可考慮重跑第 2 步撿漏。
- **去重踩過的坑**：精選流程的候選內部會有「同一張碟被 MusicBrainz 拆成不同 artist-credit
  字串」的重複——`Chet Baker` vs `Chet Baker Trio`、`Sun Ra & Walt Dickerson` vs
  `Walt Dickerson & Sun Ra`（順序顛倒）、`Mary Lou Williams` vs `Mary Lou Williams Trio`；
  以及跟現有卡池撞名但只有藝人名尾綴不同（`Duke Jordan` vs `Duke Jordan Trio - Flight to
  Denmark`，後者其實已經在池子裡）。新增 skill 腳本 `3c-dedupe-finalize.mjs`：批次內部依
  **專輯名**（忽略藝人寫法差異）去重、對現有卡池依「專輯名相同＋藝人名互為子字串」抓變體重複。
  **仍有一類自動化抓不到**：文字上就是不同字串的縮寫變體（`Standards, Vol. 1` vs
  `Standards, Volume 1`），這次是人工掃出來手動移除 2 筆，之後可考慮把 `Vol.`/`Volume` 這類
  慣用縮寫加進正規化規則。
- **三個廠牌各自的精選結果**（依 classic 分數為主、Last.fm listeners 為輔排序，門檻線見下）：
  - **Venus**：449 候選 → classic 門檻線 4 → 43 張（Albert Ayler、Pharoah Sanders、Cecil Taylor
    等自由爵士／抒情盤）。
  - **SteepleChase**：559 候選 → classic 門檻線 4 → 45 張（Chet Baker、Mary Lou Williams、
    Bud Powell、Dexter Gordon、Horace Parlan 系列）。
  - **ECM**：1185 候選 → 前 50 名 **全部 classic=5**，改用「批次內部去重＋人工抓縮寫變體」
    砍到 40 張（Keith Jarrett 三重奏系列、Pat Metheny、Chick Corea、Dave Holland、
    Arvo Pärt、Gary Burton、以及一批 ECM New Series 古典錄音）。
    **ECM 主標籤同時發行爵士與現代古典**（Bach／Beethoven／Bartók／Pérotin／Kurtág／
    Thomas Tallis），曲風分類結果 10 張落在 `classical`（+ Arvo Pärt 落在 `classical,electronic`），
    這不是誤判——正好補上先前盤點過的曲風分布裡 classical（194 張，全池最小之一）的缺口，
    予以保留，不視為爵士擴充的雜訊。
  - 三批合計 128 張，最終曲風標籤分布：jazz 107（含跨類）、classical 11、world 6、
    (無標籤) 5——無標籤的仍是有效卡片，只是不進曲風流派抽牌池。
  - 稀有度分布：legendary 13／epic 46／uncommon 69。封面來源 caa 103／bandcamp 10／
    caa-rescue 15。
- **修過一個資料流程的 bug**：中間把候選瘦身成 `{artist,title}` 給封面解析腳本用時，
  漏掉了 `classic/obscurity/accessibility` 三軸欄位，直接合併會導致這三個欄位遺失。
  最終合併前用原始評分檔（`*-ranked-full-ranked.json`）依 artist+album 重新對照補回，
  補完後 128 張三軸欄位 100% 完整（`node -e` 驗證 0 缺漏）。
- `seed_cards.json` 5566 → **5694 張**；128 筆封面＋三軸＋rarity 已 PATCH 進
  Firestore `card_catalog`（`updateMask` 只動指定欄位、`updatedAt=1` 沉底）。抽驗
  `albert ayler trio|spiritual unity`／`chet baker|the touch of your lips`／
  `keith jarrett|the melody at night, with you` 三筆封面圖實抓 HTTP 200（其中一筆
  第一次量到 500，重試 3 次皆 200，判定是 Internet Archive 節點暫時性問題，非壞連結）。
- 主要檔案：`seed_cards.json`、`.claude/skills/dip-card-pool-expand/`
  （新增 `2b-rate-and-rank.mjs`、`3c-dedupe-finalize.mjs`，SKILL.md 補精選流程與去重原則）
- 驗證：`seed_cards.json` parse 通過、5694 張全部 5 欄位且三軸皆 1–5 整數；本批 128 張
  與現有卡池及批內皆做過重複檢查（0 筆）；Firestore 128 筆全數 PATCH 成功、無失敗。
- 待辦：爵士曲風目前約 1123 張（1016 + 107），距 1500 目標還差約 377 張；
  Spotify 額度恢復後可重跑三個廠牌的封面解析步驟撿漏那 1（Venus）＋11（SteepleChase）＋
  1（ECM）張沒中的候選。

### 2026-07-21｜三盲鼠精簡到 40 張：只留熱門經典

- Repo：`dip-vinyl-shop`
- 店主指示「三盲鼠不用全部都上，其他普通的排除，只保留 40 張左右」。
- 排序依據：`classic` 分數（既有 worker `/album-rating` 的樂評共識分）由高到低，
  同分再用 Last.fm `listeners` 由高到低當熱門度輔助排序（同一個冷門廠牌裡，聽眾數相對較高
  代表比較「知名」）；查無聽眾數（`listeners` 為 null）者排最後。
- 取前 40 張（classic=4 全 11 張 ＋ classic=3 中最熱門的 29 張），移除其餘 30 張全是
  classic=2 或聽眾數極低／查無的普通盤。移除清單見 `.claude/skills/dip-card-pool-expand/`
  本次執行紀錄（`Tee & Company` 三張、`Mari Nakamoto` 兩張、`New Direction for the Arts` 兩張等）。
- `seed_cards.json` 5596 → **5566 張**；對應 30 筆 `card_catalog` 文件逐一確認
  `updatedAt=1` 且無 `desc`（本批新建、玩家未抽過）後刪除，30 筆全數符合、無異常保留。
- 主要檔案：`seed_cards.json`
- 驗證：`node -e` parse 通過，5566 張全部 5 欄位；Firestore 刪除前逐一核對，30/30 成功。
- 三盲鼠最終定案：**40 張**（原始 105 張候選 → 封面命中 90 → 標題去重 73 →
  剔除自我同名撞名 3 張 → 精簡到熱門經典 40 張）。爵士曲風目前約 1016 張（1046 − 30），
  距 1500 目標還差約 484 張。

### 2026-07-21｜修 worker YT 配對誤配＋剔除三盲鼠「自我同名」高風險卡

- Repo：`dip-vinyl-shop`、`dip-vinyl-worker`
- 背景：前一輪發現對戰／Roguelike 排除 YouTube 是對的（iOS 上 `setVolume()` 無效，
  iPhone 實機測階梯/斜坡/mute 全部「都沒有」變化，`preview-lab.html` 桌機同頁正常，證實不是程式問題，
  只能靠 Web Audio GainNode 才能淡入淡出）。轉頭去修 worker `/yt-music-link` 的靜默配錯問題。
- **worker 根因**：`youtubeMusicAlbumPlaylist()` 有一條「頂部大卡片備援」完全不驗證專輯名，
  只要藝人對得上就採用——原意是給「專輯名被整個羅馬拼音化」的 CJK 案例用（南蛮渡来→Nanban Torai
  這種文字比對必斷的情況），但沒把條件限定在「查詢真的含中日韓文字」，導致純英文查詢也誤觸發。
  修法：加 `hasCJK(...)` 閘門。同時把快取鍵 `yt-music-link-album-v5` 升版為 `v6`，否則舊快取住的
  錯誤配對不會失效重查。已 `npm run deploy`（worker）兩次（先改邏輯、再升版快取鍵）。
  - 驗證：`New Herd`（原配到 Beneath the Underdog）、`Midnight Sugar`（原配到 A Shade Of Blue）
    修復後皆配對正確；`CHTHONIC - Seediq Bale` 中文案例確認備援機制未被誤砍仍可用。
- **新發現且未修的次要問題**：極短／自我同名專輯名（如「Mari」）會被字串子字串比對誤判成
  撞到藝人名本身，這是另一條路徑（`youtubeFullAlbumVideo`）的獨立瑕疵，這次沒有動它
  （見下方剔除清單，改用「直接不收錄」而非修演算法解決）。
- **三盲鼠卡池砍 3 張**：對 73 張逐一實測 `/yt-music-link`，抓出 3 張「樂團名＝專輯名」的
  自我同名卡全部配錯：
  - `Air - Air` → 配到法國電子雙人組 Air 的《Moon Safari》
  - `Mari Nakamoto - Mari` → 配到同廠牌另一張《Little Girl Blue》
  - `Window Pane - Window Pane` → 配到 2024 年另一支同名樂團的專輯
  店主指示「三盲鼠不用全部都上」，這類辨識度低又高風險的卡直接剔除，不修演算法去救。
  `seed_cards.json` 5599 → **5596 張**；對應 3 筆 `card_catalog` 文件確認皆 `updatedAt=1` 且
  無 `desc`（本批新建、玩家未抽過）後刪除。
- 主要檔案：`dip-vinyl-worker/src/index.js`（`youtubeMusicAlbumPlaylist` 加 CJK 閘門、快取鍵升版）、
  `seed_cards.json`、`.claude/skills/dip-card-pool-expand/SKILL.md`（補「自我同名卡直接排除」原則）
- 驗證：`node --check src/index.js` 通過；`seed_cards.json` parse 通過、5596 張全部 5 欄位；
  Firestore 3 筆刪除前逐一核對 `updatedAt`/`desc` 才動手。
- 待辦：「短專輯名撞藝人名」的演算法瑕疵留給下次批次挑選階段用人工篩掉（篩選時看到專輯名＝
  藝人名或極短就跳過），不預計修 `youtubeFullAlbumVideo` 本身。

### 2026-07-21｜卡片固定試聽連結（previewUrl）＋自架音檔淡入淡出實測

- Repo：`dip-vinyl-shop`
- 背景：三盲鼠 73 張新卡沒有串流音源。實測盤點：
  - **Apple**：現有索引命中 0/73；iTunes 本機直查 12 張只「命中」2 張且**兩張都是假的**
    （`Window Pane`→助眠雨聲「Soothing Downpour on Window Pane」、`Midnight Sugar`→`(Short Ver.) - Single`）。
    → 三盲鼠在 Apple Music 台灣區實質等於沒有。
  - **YT Music**（抽樣 25 張）：正確 8、**配到別張專輯 3**、查無 14 → 真正可用僅 32%。
    配錯案例：要《New Herd》給《Beneath the Underdog》、要《Midnight Sugar》給《A Shade Of Blue》、
    要《Mari》給《NADECICO》。**配錯比查無更糟**，卡牌遊戲點了播出別張碟會直接砸掉信任。
- 改動（A：固定連結）：
  1. `dip-player.js` `playAlbum()` 新增 `previewUrl` / `attribution` 參數與 `pinnedPreviewKind()`。
     命中固定連結就**完全跳過來源查詢**（不打 worker、不吃 YouTube Data API 配額、不會即時比對配錯）；
     連結失效才回退原本的查詢順序，卡片不會因此變啞。
     - **直接音檔**（.m4a/.mp3/…）→ 走既有 Web Audio buffer 路徑，**淡入淡出、音量、iOS session 全部沿用**現成邏輯。
     - **YouTube 連結** → 走 iframe 路徑（僅唱片櫃適用）。
  2. `index.html` 唱片櫃：從 `album_overrides` 讀 `previewUrl` 併進卡片資料並傳給 `playAlbum`。
     **刻意放 `album_overrides` 而非 `card_catalog`**——後者規則是 `allow write: if true`（全世界可寫），
     把「每位玩家瀏覽器都會去 fetch 並播放的網址」放在那裡等於開放任意 URL 注入；
     `album_overrides` 是 `allow write: if isAdmin()`，才適合放這種連結。
  3. 三頁 `dip-player.js?v=28 → v=29`。
- B 的實測結論（自架音檔能否淡入淡出）：**可以，而且不需要寫任何新的音訊程式**。
  `playItunes()` 本來就與網址來源無關——`loadPreviewBuffer(url)` → `fetch(mode:'cors')` →
  `decodeAudioData` → `createBufferSource` → `connect(previewGain)` → `fadePreview()`。
  任何帶 CORS 的音檔（自架在 Pages 上是同源，更沒問題）丟進去就自動獲得 1.5 秒淡入淡出、50% 音量，
  以及先前為 iOS 修的 keep-alive／resume 逾時保護。**對戰／Roguelike 也能用**——
  那兩頁排除 YouTube 的原因是「iOS 無法控制 iframe 音量」，自架音檔走的是 Web Audio，不受此限。
- 新增 `preview-lab.html`：試聽模式實驗室，用 AnalyserNode 量**實際輸出峰值**（不靠耳朵judge），
  含環境檢測（會驗 `HTMLAudioElement.volume` 在 iOS 是否唯讀）。供 iPhone 實機驗證。
- 驗證：`node --check dip-player.js` 通過。桌機 http-server 實測自架路徑，AnalyserNode 取樣證實
  gain 與實測峰值同步變化——
  淡入 `gain 0.043→0.112→0.248→0.379→0.5`（1.6 秒到頂）、
  淡出 `0.5→0.465→0.33→0.194→0.063→0`（1.5 秒歸零，peak 同步 0.17→0.08→0.05→0）；
  CORS `*`、下載 977KB／26ms、解碼 30.0 秒雙聲道、console 無錯誤。**iOS 實機待店主用 preview-lab.html 驗證**。
- 待辦：三盲鼠的固定連結尚未實際填入 `album_overrides`（要先決定音檔放哪、或逐張人工覆核 YT 連結）；
  worker `/yt-music-link` 的寬鬆比對會靜默配錯，影響整個 5599 張卡池，尚未修。

### 2026-07-21｜卡池擴充：三盲鼠 73 張入池＋封面預熱＋流程存成 skill

- Repo：`dip-vinyl-shop`、`dip-vinyl-home`（skill）
- 背景：店主要做「曲風流派」新系統，先盤點卡池曲風分布，發現爵士 984 張且**日系／歐系近乎掛零**
  （三盲鼠、Venus、East Wind 全部 0 張），決定先從爵士補起，目標 1500 張。本次完成第一批：三盲鼠 TBM。
- **曲風分布盤點**（沿用音樂地圖十類規則，5526 張逐張打 worker `/album-genres`）：
  rock 2809／pop 1086／electronic 1028／jazz 984／hiphop 856／soul 723／folk 622／world 244／
  classical 194／blues 150，未分類 49。單曲風 2258 張、跨兩類 3219 張。
  → blues／classical／world 池子太小不適合單獨開流派，建議合併成七個曲風流派（詳見對話規劃）。
- **封面來源改用 Cover Art Archive 為主力**（本次最重要的發現）：
  - Spotify 當時全面 429 限流（連已在池中的 Duke Jordan 都查不到），**限流期的空結果不可當「查無此碟」**。
  - 現有卡池隨機抽 60 張實測 CAA 命中 **58/60（97%）**，53/58 為正方形、其餘最歪 1.14 可用 `object-fit` 吸收。
  - CAA 與 Spotify 弱點互補：CAA 強在老黑膠／冷門盤、弱在近年新專（Lana Del Rey、Melanie Martinez 未中）。
  - **iTunes 不可用於抓封面**：模糊比對會配到錯的碟（`Midnight Sugar`→`Short Ver. Single`、`Misty`→`Live at Jazz is`）。
  - Deezer 台灣不可用，10/10 全空。
  - **架構紅線**：MusicBrainz 硬性 1 req/s 且 Cloudflare 共用出口 IP，**不得放進 worker 即時查詢**
    （與 Apple `/search` 被長效 IP 封鎖同一種死法）；只能本機批次跑後寫進 Firestore／KV。
- 改動：
  1. `seed_cards.json` 5526 → **5599 張**（+73 張三盲鼠）。流程：MusicBrainz 廠牌目錄 184 releases
     → 去重 113 → 排除 Various Artists 合輯 105 → 封面命中 90（Bandcamp 26／CAA 43／CAA 補救輪 21）
     → 標題去重 73 張。三軸沿用 worker `/album-rating`（冷門度=Last.fm 聽眾數、經典/硬蕊=Haiku 樂評共識）。
  2. **封面預熱**：73 張的封面＋三軸＋rarity 以 Firestore REST PATCH 寫入 `card_catalog`
     （`updateMask` 只動指定欄位、`updatedAt=1` 沉底）。**這步不能省**——前台封面查找是
     `card_catalog` → `/spotify-search`，而這批多半在 Spotify 查無，不預熱就永遠是空白卡。
  3. 新增 skill `dip-card-pool-expand`（`.claude/skills/` ＋ `.agents/` 鏡像），含 5 支可重跑腳本：
     廠牌目錄反查／封面解析鏈／產三軸／藝人名最佳化／封面預熱。
- 過程中修正的資料問題：
  - `Air《Air》` 被 Last.fm 算到**法國電子雙人組 Air** 的 66856 聽眾（冷門度 5→3），
    實為三盲鼠 1977 年日本前衛爵士團（MusicBrainz 標註 "70s Japanese avant-garde jazz band"），手動改回 5。
  - 17 張聯名藝人名過長會在卡面爆版，取主奏者精簡（最長 80 → 39 字元）。
  - **藝人名寫法會決定曲風分類器認不認得，且無單一規則**：`Hideto Kanai & King's Roar`→jazz 但
    `Hideto Kanai`→無；`Masaru Imada Trio +2`→無 但 `Masaru Imada Trio`→jazz。逐張試候選寫法後
    62/73 帶 jazz 標籤（jazz 984 → 1046）。改名造成的 7 筆孤兒文件已確認 `updatedAt=1` 且無 `desc` 後刪除。
  - 改名時 `Shuko Mizuno`（現代古典作曲家）會讓專輯被判成 classical，改用樂團名
    `Toshiyuki Miyama & The New Herd` 才正確回到 jazz。
- 主要檔案：`seed_cards.json`、`.claude/skills/dip-card-pool-expand/`（SKILL.md ＋ scripts×5）、`.agents/` 鏡像
- 驗證：`seed_cards.json` parse 通過、5599 張全部 5 欄位且三軸皆 1–5 整數；本批 73 張與現有卡池零重複
  （全池另有 4 組既存重複，屬 `Guns N??Roses` 編碼損壞的舊問題，非本次造成）。
  Firestore 抽驗 `tsuyoshi yamamoto trio|midnight sugar`／`air|air`／`isao suzuki trio|blow up`
  三軸與 rarity 正確、封面圖實抓 HTTP 200（121KB／37KB／77KB）；改名後的
  `hideto kanai & king's roar|ode to birds` 等三筆亦確認寫入成功。skill 5 支腳本 `node --check` 全通過。
- 待辦：爵士還差約 454 張才到 1500（Venus／East Wind／ECM／SteepleChase／波蘭法國德國／Black Saint 等）；
  曲風流派系統本身尚未實作。

### 2026-07-20｜移除 #auddbg 偵錯層，保留核心修復邏輯

- Repo：`dip-vinyl-shop`
- 店主確認 iOS 音訊問題已完全修復（「已經沒問題了」），決定拆掉 `#auddbg` 偵錯層。
- 改動：
  1. 刪除 `dip-player.js` 裡所有偵錯函式（`dbg()`、`dbgPeak()`、`dbgSnap()`）及 AUD_DEBUG 檢查
  2. 保留關鍵修復邏輯：keep-alive 節流、resume() 逾時保護、previewArmedAt 狀態追蹤
  3. 刪除獨立診斷頁 `audio-debug.html`
- 主要檔案：`dip-player.js`（移除偵錯）、`battle.html` / `index.html` / `roguelike.html`（v=28，版號不變）
- 驗證：`node --check` 通過。所有修復相關的功能邏輯保留無誤。

### 2026-07-20｜iOS 首次沒聲音修復確認生效＋去掉多餘的 1.5 秒等待

- Repo：`dip-vinyl-shop`
- 店主 iPhone 實機截圖確認 v=27 已修好：`ctx=running`、`peak=0.1839` 真的出聲了，
  但仍感覺「不是立即播放」——log 顯示 `loadPreviewBuffer 完成（3994ms）`。
  這 4 秒裡有一段是修法本身多花的：`loadPreviewBuffer()` 開頭那個 `await withTimeout(resume(), 1500)`
  是在**下載開始之前**空等，但下載與 `decodeAudioData` 在 suspended 的 context 上一樣能做，
  真正需要 running 的只有稍後的 `source.start()`（那裡已經有自己的 resume＋逾時）。
- 改動：拿掉 `loadPreviewBuffer()` 開頭那次 resume 等待，直接進入 fetch。
  `ensurePreviewGraph()`（在它之前就會呼叫）已經用 fire-and-forget 的方式發過
  `resume().catch(()=>{})`，不需要在這裡重複等待一次。`source.start()` 前那個
  `await withTimeout(resume(), 1500)` 原樣保留，作為起播前的最後把關。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`（v=27 → v=28）
- 驗證：`node --check` 通過。桌機帶 `#auddbg` 實測首播與快取路徑（靜音→重播）皆乾淨無
  AbortError、正常播放（peak 0.16～0.29）；不帶 hash 時 overlay 不存在、播放狀態 playing；
  battle 與 roguelike 兩頁 console 皆無錯誤。桌機環境本來就重現不出 iOS 的 resume 延遲，
  這次改動省下的 1.5 秒需由店主 iPhone 實機驗證是否感覺到起播變快。

### 2026-07-20｜找到真凶：await resume() 吊死 14.7 秒（iOS 首次沒聲音）

- Repo：`dip-vinyl-shop`
- 實機 log（`#auddbg`）決定性證據：
  - `10.30s 下載解碼前｜ctx=suspended t=0.00` — AudioContext 從 1.83s 建立起一直是 `suspended`，
    `currentTime` 十秒都還停在 `0.00`，一個 sample 都沒算過。
  - `25.05s loadPreviewBuffer 完成（14747ms）` — **卡了 14.7 秒**，卡在
    `loadPreviewBuffer()` 裡的 `await audioCtx.resume?.()`。iOS 在手勢外收到的 resume 請求
    會被無限期擱置、promise 永不 resolve，整條下載解碼路徑被吊死。所以根本不是「播了沒聲音」，
    **是壓根還沒播到**。它一直等到店主點唱盤機那兩下才被解開。
  - 對照差異：`10.29s unlock｜自認播放中 → 重發 play()`（ctx 仍 suspended、卡死）
    vs `24.76s unlock｜keep-alive 重新起播（paused=true）`（ctx 變 running、有聲音）。
- 根因：對「自認還在播」的 `<audio>` 呼叫 `play()` 是 no-op，**不會建立新的 audio session**，
  AudioContext 因此永遠 resume 不了。keep-alive 從進頁面就一直 loop 著，所以第一次點開簡介
  必定走到 no-op 分支 → 必定沒聲音；而任何一次成功播放結尾或 `stop()` 都會 pause keep-alive，
  之後就都會走到完整起播分支 → 之後都正常。（上一版 v=23「一律重發 play()」失敗正是因為
  補的是 no-op，沒有 pause→換 src→play 的完整循環。）
- 改動：
  1. `primePreviewFromGesture()` 改為**一律完整重新武裝**：`pause()` → 重設 `src` → `play()`，
     並在同一手勢內接著呼叫 `resume()`（session 由 play() 建立後才要求 resume 才有效）。
  2. 兩處 `await audioCtx.resume?.()` 一律包 `withTimeout(..., 1500)`。獨立防禦：
     就算 session 假設再次出錯，也不可能再出現整條路徑吊死十幾秒。
  3. 節流：同一次觸碰常連帶觸發兩次 unlock，若都重新武裝，第二次的 pause 會把第一次的
     `play()` 打成 AbortError。改為「剛武裝過且仍在播」時略過（400ms 內）。
  4. `playItunes` 釋放 keep-alive 改為等武裝的 promise 落定後才 `pause()`，
     否則快取命中時 start 與武裝幾乎同一 tick，必定把自己的 `play()` 打成 AbortError。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`（v=24 → v=27）
- 驗證：`node --check` 通過。桌機帶 `#auddbg` 實測：首播 log 乾淨無 AbortError、
  `loadPreviewBuffer` 515ms 完成、start+2.2s gain=0.500 peak=0.1046；
  靜音→重播的快取路徑（loadPreviewBuffer 0ms）同樣乾淨 resolve 並正常播放；
  不帶 hash 時 overlay 不存在、播放狀態 playing、console 無錯誤。iOS 實機待店主驗證。

### 2026-07-20｜殭屍假設也被推翻 → dip-player 內建 #auddbg 實機偵錯層

- Repo：`dip-vinyl-shop`
- 背景：keep-alive 殭屍修正（v=23）經店主 iPhone 實測**無效**，「第一次點開簡介沒聲音」依舊。
  至此兩個假設（session 空窗、keep-alive 殭屍）都被實機推翻；且獨立診斷頁 `audio-debug.html`
  在同一支 iPhone 上**全部路徑有聲音**——問題只出現在正式頁面的真實首播路徑上，
  只能在那條路徑上直接量測。
- 改動：`dip-player.js` 內建偵錯層，**只有網址帶 `#auddbg` 才啟動**，平常一行邏輯都不多跑：
  1. 畫面底部固定 log 面板，記錄：AudioContext 建立、unlock 各分支與 keep-alive `play()`
     的 promise 結果、playItunes 來源／曲目／buffer 快取命中、下載解碼耗時、每個關鍵點的
     `ctx.state`／`currentTime`／gain／**AnalyserNode 輸出峰值**／keep-alive 狀態、狀態機轉換、stop 呼叫。
  2. AnalyserNode 只作為 previewGain 的旁支（sink），不動原本輸出鏈。
  3. **自動修復實驗**：起播後 0.8 秒若量到輸出峰值=0（訊號沒到輸出端），自動執行
     `suspend()→resume()` 一次並記錄結果；2.2 秒再量一次。若音樂在約 1 秒後突然出來，
     即證明「輸出端卡死、suspend/resume 可解」，正式修法就照這個做成無偵錯版 watchdog。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`（v=23 → v=24）
- 驗證：`node --check` 通過。桌機帶 `#auddbg` 實測：overlay 逐步記錄完整（含 unlock 重發、
  下載 656ms、start+0.8s peak=0.173、start+2.2s peak=0.3527、keep-alive 交接 playing→paused）；
  不帶 hash 時 overlay 不存在、播放正常、console 無錯誤。
  待店主用 iPhone 開 `https://dipvinyl.tw/battle.html#auddbg` 重現第一次開簡介後截圖回報。
- 交接注意：本機測試時 python http.server 的 HTML 會被瀏覽器啟發式快取＋service worker 蓋住，
  改了 `?v=` 後要清 SW 並用 `?nocache=` 之類的 query 重載才拿得到新 HTML。

### 2026-07-20｜iOS 首次點開簡介沒聲音：真正根因是 keep-alive 殭屍狀態

- Repo：`dip-vinyl-shop`
- 診斷過程：店主 iPhone 實測 `audio-debug.html` ——最小重現路徑**全部有聲音**（連跳過解鎖鈕直接播
  都正常），證明 `dip-player.js` 的下載→解碼→BufferSource 播放管線在 iOS 上本身沒問題。
  同時發現新線索：正式頁第一次開簡介沒聲音時，**不用關視窗**，點小唱盤機兩下（靜音→再播）就有聲音。
- 根因：診斷頁與正式頁失敗那一下的唯一差別＝「該次手勢內有沒有真的對靜音 keep-alive `<audio>`
  重發 `play()`」。`primePreviewFromGesture()` 原本有 `if (!audio.paused && !audio.ended) return true`
  的提前返回——靜音循環從進頁面第一次觸碰就開始播，元素自認還在播；但 iOS 會把長時間循環的
  靜音元素實際停掉而 `paused` 仍回報 `false`（殭屍狀態），audio session 已不在頁面手上。
  於是開簡介那次手勢被提前返回白白流掉，稍後 `source.start(0)` 的訊號有產生卻被 iOS 擋在輸出端。
  一切觀察都吻合：點唱盤第一下 `stop()` 把元素真正 `pause()` 掉，第二下 unlock 看到 `paused===true`
  終於在手勢內重發 `play()`、session 抓回來就有聲；之後每次成功播放結尾都會 pause keep-alive，
  所以後續開簡介永遠走到重發分支 → 都正常 → 「只有第一次沒聲音」。
- 修法（一行語意）：提前返回的分支改為**手勢內一律重發 `audio.play()`** ——正常播放中的元素呼叫
  `play()` 是 no-op、立即 resolve；殭屍元素則重新起播、把 session 抓回來。單向保險，
  不動 `installAudioUnlock`／`unlock` 的任何其他邏輯。版號 v=22 → v=23。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`
- 驗證：`node --check` 通過。桌機回歸四條路徑全過——keep-alive 播放中重複 unlock 不炸、
  首播 gain 0.5＋keep-alive 正確交接（start 後 paused=true）、靜音→重播淡入 0.05→0.5 走滿 1.5 秒、
  關窗淡出 0.45→0 走滿 1.5 秒；console 無錯誤。iOS 實機由店主驗證（見下一步回報）。

### 2026-07-20｜新增試聽診斷頁（iOS 首次沒聲音仍未解）

- Repo：`dip-vinyl-shop`
- 背景：上一筆的 keep-alive 修正經店主 iPhone 實機驗證——**淡出、小唱盤機重播都好了，但「第一次點開簡介沒聲音」依舊**。
  代表「空窗期 audio session 被收掉」這個假設被推翻（keep-alive 全程墊著仍然無聲）。桌機 Chrome
  完全無法重現，繼續猜只會亂改核心音訊管線，因此改為先取得實機數據。
- 改動：新增獨立診斷頁 `audio-debug.html`（**全新檔案，不 import、不修改任何現有程式**，零風險）。
  以與 `dip-player.js` 相同形狀的最小碼重現整條路徑，並在手機上印出逐步數據：
  AudioContext state／sampleRate／currentTime 是否前進、keep-alive `<audio>.play()` 成功或被拒、
  音檔 fetch status 與耗時、`decodeAudioData` 結果、**解碼後 buffer 的峰值**（判斷音檔本身是否無聲）、
  以及用 AnalyserNode 量到的**圖形實際輸出峰值**（判斷訊號有沒有真的產生）。
  五個按鈕構成 A/B：⓪ 只解鎖（讓 AudioContext 在更早一次觸碰建立，與正式版一致）→ ① 完整首播
  → ② 快取路徑 → ③ 手勢當下立刻播 → ④ 同一份快取音但刻意空等 3 秒才播。
  ③ 與 ④ 的差別只有「離手勢多久」，可單獨隔離延遲是不是主因。
- 判讀方式：輸出峰值 >0 但耳朵沒聲音 → 訊號有產生、被 iOS 擋在輸出端（系統層路由）；
  峰值為 0 但時鐘正常 → 圖形連接或起播時機問題；時鐘沒前進 → context 根本沒在算圖。
- 主要檔案：`audio-debug.html`（新增）
- 驗證：桌機 Chrome 實測五個按鈕全部正常運作、log 累積不清空可一次截圖；
  首播路徑量到解碼峰值 0.9976、輸出峰值 0.4861、時鐘前進 2.51s，判讀邏輯正確。
  線上路徑為 `https://dipvinyl.tw/audio-debug.html`，待店主用 iPhone 實測回報。

### 2026-07-20｜試聽淡出失效修正（fadePreview 缺錨點）

- Repo：`dip-vinyl-shop`
- 改動：試聽的 1.5 秒淡出其實從來沒有生效，聽起來一直是硬切。成因在 `fadePreview()`：
  `cancelAndHoldAtTime(now)` 只有在「now 之後還有排程事件」時才會補上保持點；淡入的 ramp
  早在 28.5 秒前就結束，所以它什麼都不做，接著的 `linearRampToValueAtTime(0, now+1.5)`
  會從那個舊事件（t=1.5s、值 0.5）起算整條斜線 → 呼叫當下音量就已經掉到約 0.025（2.5%），
  剩下的 1.5 秒只是在聽不見的音量下慢慢爬到 0。修法：不再依賴 `cancelAndHoldAtTime`，
  一律自己 `cancelScheduledValues(now)` + `setValueAtTime(現值, now)` 當錨點再拉 ramp
  （原本 else 分支的寫法才是對的）。淡入不受影響（它前面本來就有 `setPreviewLevel(0)` 當錨點）。
  同一修正同時讓「30 秒播完」與「關閉簡介視窗」兩條淡出路徑都真的走滿 1.5 秒。
  另把三頁的 `dip-player.js?v=19` 一起改成 `?v=20`，讓已裝 PWA／service worker 的使用者拿得到新檔。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`
- 驗證：`node --check dip-player.js` 通過。本機 static server 瀏覽器實測（攔截 GainNode 取樣真實 gain）：
  修正前 30 秒結束時 gain 由 0.5 在一個取樣內塌到 0.026；修正後 0.5 → 0.43 → 0.345 → 0.264
  → 0.179 → 0.094 → 0 走滿 1.5 秒。關閉視窗的 `stop({fade:true})` 同樣由「瞬間 0.038」修正為
  0.45 → 0.396 → … → 0。另以 OfflineAudioContext 獨立重現並確認 `cancelAndHoldAtTime` 的行為
  （28.6s 時值 0.0246，與線上量到的 0.026 吻合）。battle 與 roguelike console 皆無錯誤。
### 2026-07-20｜iOS 首次點開簡介沒聲音：靜音 keep-alive 提早被收掉

- Repo：`dip-vinyl-shop`
- 背景：iOS 以前幾乎完全不會觸發試聽，現在這套解鎖流程是好不容易調到最接近理想的狀態，
  **除了「第一次點開簡介沒聲音、關掉重開才正常」之外其他都順**。因此本次修改刻意做成單向的：
  只延長 audio session 的維持時間，完全不動 `installAudioUnlock()`／`primePreviewFromGesture()`／
  `unlock()` 這三個負責解鎖的函式，避免補東牆壞西牆。
- 改動：
  1. **首次沒聲音的根因**：`playItunes()` 原本在 `await loadPreviewBuffer()` **之前**就把用來維持
     iOS audio session 的靜音 `<audio>` keep-alive `pause()` 掉。第一次點開要等網路下載＋解碼
     （手機 1～3 秒），這段空窗沒有任何東西在發聲，iOS 會把 session 收掉，之後 `source.start(0)`
     就沒有輸出——而且 `AudioContext` 仍回報 `running`，不會拋錯，所以完全查不出來。第二次因為
     buffer 已在 `previewBufferCache`，幾乎同一個 tick 就 start，來不及被收掉，所以正常。
     修法：把 `audio.loop=false; audio.pause()` 移到 `source.start(0)` 之後，讓靜音檔在整個
     下載解碼空窗期間持續墊著，等真實試聽開始輸出、由它接手 session 之後才釋放。失敗分支一律
     不收，讓下一次重試仍有 session 可用。小唱盤機「再點一次重播」推定同一根因（該邏輯本來就寫好了）。
  2. **順手修掉自己前一筆改動引入的回歸**：`fadePreview()` 改成讀 `gain.value` 當錨點後，
     「靜音後重播」會沒有淡入——因為 `setPreviewLevel(0)` 才剛在同一個 render quantum 排下去，
     `gain.value` 還是舊值 0.5，於是拉出一條 0.5→0.5 的平線、瞬間全音量進場。改成自己追蹤
     `previewLevel`／`previewRampEnd`：ramp 還在跑就取實際值（中途打斷不跳音），已跑完就取記錄值。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`（版號 v=20 → v=22）
- 驗證：`node --check` 通過。本機瀏覽器實測（攔截 GainNode 取樣、並人工延遲音檔下載 3 秒放大空窗）：
  下載解碼的 0～3.3 秒期間 keep-alive 維持 `paused:false`，3.6 秒真實試聽開始輸出（gain 0.019 起淡入）
  的同時才被釋放，交接正確。回歸測試四條路徑全過——首播淡入 0.031→…→0.5；靜音後重播淡入
  0.043→…→0.5（修正前是直接 0.5）；30 秒自然結束淡出 0.45→0.368→…→0 收在 30.5 秒；
  淡入途中打斷由 0.097 平順降到 0 不跳音。Apple 查無資料（S3）的失敗路徑仍照舊由 `playAlbum`
  錯誤分支收掉 keep-alive。battle 與 roguelike console 皆無錯誤。
- 注意：iOS 實機尚未驗證（桌機 Chrome 無法重現首次沒聲音的症狀，即使人工延遲 3.5 秒仍正常播放），
  需由店主用 iPhone 實測確認。若仍無聲，則本節的 session 假設被推翻，要再往下一層查。

### 2026-07-20｜整備面板列出全收藏＋趟中修理真正生效

- Repo：`dip-vinyl-shop`
- 改動：
  1. **趟中修理不顯示、還會被吃掉的 bug**：`doRepair` 原本只寫 `META.relicWear`，但趟中面板顯示與實際效果都讀 `RUN.relicWear`，且下一場結束 `syncWearToMeta()` 會用 RUN 的舊耗損把 META 蓋回去——趟中花的修理費等於白花。修法：新增 `curWearOf(id)` 單一入口（趟中帶著的讀 RUN、沒帶上路的讀跨趟紀錄），`doRepair`／`openRelicCare`／整備面板列全部改用；修理時 RUN 與 META 同步寫入，並 `recomputeMaxHp`（品相回升會改 ×倍率）＋`saveRun()`。
  2. **整備面板列出所有收藏配件**：`benchedRelics()` 從「只列 RUN.relics 沒出戰的」改為「RUN 帶著的＋收藏（`META.relicsOwned`）裡其他所有健在件」的聯集，出戰 3 件在上、其餘列在庫存區可隨時換上場。`loAct('equip')` 對還沒帶上路的收藏件走 `carryRelic()`（耐久沿用跨趟紀錄）。勝利畫面的「🎒 整備」按鈕條件放寬為 `RUN.relics.length || ownedRelicIds().length`，開局沒帶配件也能中途裝備。
- 主要檔案：`roguelike.html`
- 驗證：兩個 script 區塊 `node --check` 通過。本機 static server 瀏覽器 JS 實測：收藏 6 件、帶 3 件開趟 → 整備面板庫存正確列出未帶的 3 件且耐久讀 META（30/75/5）；卸下唱針換上見本盤，耐久 70 正確帶入 RUN；小保養唱針 40→15，RUN／META／面板三處同步、`syncWearToMeta()` 後不回退、現金 500→485；庫存件整新到全新 META 歸 0；開局零配件時勝利畫面照樣出現整備按鈕、可從收藏直接裝上。console 無錯誤。

### 2026-07-20｜試煉進度保留改跨裝置（存進玩家帳號）

- Repo：`dip-vinyl-shop`
- 改動：進行中那一趟的存檔改成登入者跟著帳號走，存 `users/{uid}` 的 `rogueRun` 欄位——和 `rogueMeta` 同一份文件，**不用改 Firestore 規則**。訪客行為不變（只存本機）。
  - **同步頻率**：平時只在場間畫面同步（戰鬥中每一手都寫太耗流量，留在本機就好）；按「⏸ 保留進度離開」時強制連戰鬥狀態一起上傳，換裝置能接在同一手、同一個對手暗定牌。跳頁前等寫入完成（最多 1.5 秒、按鈕顯示「儲存中…」），否則 fire-and-forget 的寫入會在導頁時被丟掉。
  - **墓碑 `rogueRunClearedAt`**：清檔（死亡結算／放棄／開新趟）時把 `rogueRun` 設 null 並記時間，讓別台裝置上同一趟的舊存檔作廢——否則同一趟能在兩台裝置各結算一次樂歷。
  - **比對規則**（`pullCloudRun`，跟著 `bindMetaToAccount` 在登入後跑）：墓碑較新 → 清本機；雲端較新 → 換裝置接續（後存的贏）；本機較新 → 保留本機。只在還沒開打時才動本機存檔，避免登入回應太慢時把正在玩的局面抽掉。
  - 離開對話框的說明文字改成依登入狀態顯示「換裝置也接得回來」或「只存這台裝置」。
- 主要檔案：`roguelike.html`（module 段新增 `__loadRogueRun`／`__saveRogueRun`；遊戲端新增 `syncRunToCloud`／`pullCloudRun`）、`ROGUELIKE_DESIGN.md`（§5.3 補「跨裝置」段）
- 驗證：注入假雲端在瀏覽器實測兩台裝置情境——戰鬥中不上雲、場間才同步（快照 3KB）；裝置 B 本機無存檔時從雲端拉回第 3 場並接續；裝置 B 打到死後立墓碑，裝置 A 上那份舊存檔被清掉、不能重複結算；「保留進度離開」強制同步含戰鬥狀態（8.4KB），另一台接回來是同一手同一個對手暗定牌；本機比雲端新時保留本機；`_phase` 非 menu（正在玩）時不動本機存檔；訪客完全不碰雲端。module 與主 script 兩段語法檢查通過、console 無錯誤。

### 2026-07-20｜試煉三機制：進度保留、備份盤倒帶、中繼票

- Repo：`dip-vinyl-shop`
- 改動：
  1. **⏸ 進度保留（自動續玩）**：一趟自動存一份在本機（`dipRogueRun_v1`），關掉分頁再開，主選單最上方出現「上一趟還在進行中」一鍵接續，不用被迫一次打完。存檔時機＝每回合開始、**玩家出牌的當下**、以及每個場間畫面（勝利／藏家三選一／升級／抽盤／撿盤／倒帶詢問／快速選秀）。存的是狀態快照而非亂數種子，**AI 每回合仍重新讀局**（虛晃、留手照舊隨機），續玩不會變成背版；又因為出牌當下就存檔，看到結果再關掉分頁也沒用——續玩會把那一手原樣打完，場間的三選一與抽到的盤也照原樣還原，關掉重開不會重骰獎品。戰鬥中的 ✕ 改成三選一：保留進度離開／放棄這趟離開（原本不結算的行為保留）／留下來繼續打；選流派開新趟若偵測到未完成存檔會先確認。
  2. **💿 備份盤（整趟一次的倒帶）**：每打贏一位傳說藏家，勝利畫面問要不要把當下壓成備份盤，整趟只能壓一次。死亡時先問要不要倒帶回那一場再決定結不結算，用掉就沒了。只回捲戰局（HP／牌組／深度／局內等級），**現金與配件耗損不回捲**、已毀損的配件不會回來。
  3. **🎫 中繼票（中繼點第 10 場）**：從頭打贏第 10 場才賺到一張票，同時存下踏進第 10 場前的 build 快照。用票才能從第 10 場開打，兩條路——照快照配置接續，或重選流派種子＋快速選秀（5 次撿盤二選一＋5 次升級三選一，刻意比正常略少）。票是 1:1 換來的，所以「再也不從頭打」不可能發生；樂歷結算改按**實際打過的場數**（`depth − baseDepth`），中繼開局沒有刷等優勢，最深紀錄仍用原始 depth。`MID`（depth／draftCards／draftLevels）可由後台 `roguelike.mid` 覆寫。
- 主要檔案：`roguelike.html`、`ROGUELIKE_DESIGN.md`（新增 §5.3）
- 驗證：本機 static server 實測（瀏覽器 JS 驅動）：開局→存檔→重整→接續，局面與手牌、對手暗定牌完全一致；出牌當下重整會自動把那一手打完（手牌少一張、HP 12→8、回合前進），不能重選；藏家三選一與抽到的盤重整後還原同一批；打到第 10 場正確發票並存下 depth 9 快照；照快照開局＝第 10 場藏家戰、扣票、耐久取現況；重選配置走完 5 撿盤（牌組 15 張）＋5 升級後直接開第 10 場；死亡先跳倒帶詢問、倒帶後 depth 回到 11 且現金不回捲、第二次死亡直接結算並清除存檔；中繼趟結算只算實際場數。375px 無橫向溢位、console 無錯誤；三個 script 區塊語法檢查通過。

### 2026-07-20｜移除「中國內地」用語＋種子選擇頁加回上一步

- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：
  1. 崔健《新长征路上的摇滚》的人工簡介把「中國內地第一張原創搖滾專輯」改為「中國第一張原創搖滾專輯」，移除以中國為主體、矮化台灣的用語。同時全庫掃描 `內地／大陸／台灣地區／中國台灣／港澳台／兩岸三地` 與常見中國用語（視頻、質量、信息、網絡、軟件、硬件、屏幕、音頻⋯），確認 CURATED_DESCS、NEOCLASSIC_LIST、desc-gen 批次與已入 KV 的 5,773 筆簡介都沒有其他違例；`index.html` 的「歐洲大陸」是地理名詞、`水準` 是台灣用語，均保留。
  2. Roguelike 種子選擇頁（選完流派後挑專輯）標題左側加一顆 `←` 小箭頭按鈕，點了回到選流派畫面。與標題同一行、寬 27px，不增加任何版面高度。`chooseClass()` 每次都會 `initRun()` 重建 RUN，所以回上一步再選流派不會殘留舊狀態。
- 主要檔案：`dip-vinyl-worker/src/index.js`、`dip-vinyl-shop/roguelike.html`
- 驗證：`node --check src/index.js` 通過；`npx wrangler deploy` 已部署（Version `6375beac`），線上 `/album-desc` 回傳新文案且 `X-Cache: CURATED`（第一次查到舊文案是 CDN 邊緣快取，加 cache buster 後確認正確）。前端一律走 `/album-desc`、不從 Firestore 讀簡介，故各頁面同步生效。瀏覽器實測：選流派 → 種子頁出現「回上一步：重選流派」→ 點擊回到流派清單；桌機與 375px 手機下箭頭與標題同一行、無橫向溢位。

### 2026-07-20｜Apple 試聽首次開啟：預配對、手勢解鎖與預熱快取

- Repo：`dip-vinyl-shop`
- 改動：新增 5,349 筆可直接播放的精簡 Apple 音源索引；頁面掛載時背景載入索引，命中後直接使用預存 preview URL，避免首次開啟再做名稱搜尋。首次指標手勢同時解鎖 Apple Web Audio；Roguelike 長按在 `pointerdown` 當下解鎖，不再等 450ms 計時器。預熱與正式播放共用下載／解碼 Promise（保留最近 3 筆）；若預存 URL 失效，會自動退回 Apple 搜尋。對戰與試煉唱機新增載入旋轉狀態。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`data/apple-audio-runtime-v1.json`、`scripts/build-apple-audio-runtime-map.mjs`、`verify-playback.mjs`
- 驗證：`node verify-playback.mjs` 通過（包含預配對免搜尋、預熱共用下載、失效 URL 搜尋修復）；`node --check dip-player.js`、`node scripts/build-apple-audio-runtime-map.mjs`、`git diff --check` 通過。The Clash／Diana Ross／Ol’ Dirty Bastard／Sarah Vaughan with Clifford Brown 均確認命中索引。

> 這是 `dip-vinyl-shop` 與 `dip-vinyl-worker` 共用的長期記憶。
> Claude 開始工作前必須先讀完本檔；任何檔案改動完成前必須追加一筆紀錄。

## 使用與維護規則

1. 開始工作前先讀本檔，並以「目前狀態」與「既定決策」為準。
2. 有修改檔案時，在「逐次改動記錄」最上方新增一筆；純讀取或分析不記。
3. 每筆至少記錄：日期、repo、改動摘要、主要檔案、驗證結果。
4. 紀錄的是使用者看得懂的成果與重要技術決策，不要只貼 commit message 或 diff。
5. 撤回或修正舊改動時新增一筆，不改寫舊紀錄，讓決策過程可追溯。
6. 備忘錄要在 commit 前更新；commit hash 可從同一時段的 Git 歷史查得，不必為了回填 hash 再製造一個 commit。
7. 若同一項工作同時改到兩個 repo，合併成一筆並分別列出檔案與驗證。
8. 「歷史改動摘要」不能代替逐次日誌；同一天有多個獨立 commit／工作項目時，必須逐筆記錄，不可只寫成一個籠統總結。
9. Claude 與 Codex 交替協作時，每次開工先對相關 repo 執行 `git fetch origin`、`git status --short`、`git log --oneline HEAD..origin/main`、`git diff --name-status HEAD..origin/main`，確認本機與遠端新增／修改／刪除項目；工作區乾淨且遠端領先才用 `git pull --ff-only` 同步。
10. 正式提交前再次 fetch 並確認遠端沒有工作期間的新提交；若有分歧或重疊，先保留、理解並整合對方工作，不得直接覆寫。

建議格式：

```md
### YYYY-MM-DD｜短標題
- Repo：`dip-vinyl-shop` / `dip-vinyl-worker`
- 改動：完成了什麼，以及重要行為或決策。
- 主要檔案：`path/to/file`
- 驗證：執行了什麼，結果如何。
```

## 目前狀態（基線：2026-07-16）

### 儲存庫與版本基線

- `dip-vinyl-shop`：靜態前端、後台與遊戲頁面；`main` 基線為 `b25a022`，從 2026-04-29 到 2026-07-15 共 467 次提交。
- `dip-vinyl-worker`：Cloudflare Worker API；`main` 基線為 `4234824`，從 2026-05-20 到 2026-07-15 共 62 次提交。
- 兩個 repo 都直接 commit 並 push 到 `origin/main`，不開 PR、不使用 worktree。
- 本基線依 Git 歷史整理；需要逐筆細節時，以各 repo 的 `git log` 為準。

### 系統輪廓

- 前端以原生 HTML、CSS、JavaScript 為主，核心集中在 `index.html`、`admin.html`、`battle.html`、`roguelike.html`。
- Firebase / Firestore 負責商品、會員、卡冊、遊戲設定與玩家進度；Google 登入是玩家身分來源。
- Worker 位於 `dip-vinyl-worker/src/index.js`，目前提供 `/claude`、`/spotify-token`、`/spotify-search`、`/album-genres`、`/bandcamp-search`、`/spotify-artist-albums`、`/spotify-album-link`、`/yt-music-link`、`/yt-album-verify`、`/album-desc`、`/album-rating` 等端點，並使用 KV / Cache 降低重複查詢。
- 商品站、選歌功能、卡冊、單場對戰、無止盡試煉與音樂地圖共用專輯封面、介紹、評分和玩家收藏資料。

### 現行產品與命名

- 首頁商店：新品／二手、曲風與標籤篩選、排序、商品詳情、多圖、購物車與結帳。
- 後台：商品與上下架、多幣別成本、售價、OBI／見本盤等標籤、試聽連結、Banner、Reels、會員、卡牌校正、頂級牌及遊戲參數管理。
- 「歌荒救星」：包含心情選歌、類型挑片、直接抽一張、歷史紀錄與串流平台連結。
- 卡牌收藏：Google 登入、我的卡冊、五階稀有度與殿堂／流亡／異端等頂點卡、分享圖、特殊抽卡券。
- 「品味生死鬥」是入口頁；`battle.html` 為單場對決，`roguelike.html` 為「無止盡品味試煉」。
- 三項卡牌屬性目前為冷門度、經典度、硬蕊度；戰鬥中的簡稱使用「硬蕊／硬」，不要再改回「入耳難易度／入耳／入」。
- Roguelike 的「遺物」已正式改名為「發燒配件」；有解鎖、最多三件出戰、跨趟耗損、現金與趟間保養機制。
- `music-map.html` 與 `music-map-widget.js` 依永久收進卡冊的專輯建立音樂地圖，跨曲風專輯可同時計入多個節點，並與探索獎勵及玩家收藏連動。

## 歷史改動摘要

### 2026-04｜商店與後台成形

- 建立商店首頁與管理後台，接上商品新增、編輯、刪除／下架流程。
- 加入曲風列、卡片標籤、新品／二手分頁、數位典藏、排序與商品詳情。
- 商品圖片改用 Cloudinary，支援多圖上傳、拖曳排序與前台輪播。
- 加入購物車、結帳、首版標籤，以及商品視窗內加入購物車。

### 2026-05｜選歌體驗、分享與 Worker 分工

- 後台補齊價格、成本、建議售價、NEW／見本盤／OBI 標籤、試聽連結、Discogs 價格搜尋與 Reels 管理。
- 建立「心情選歌」，反覆調整推薦多樣性、專輯真實性驗證、Spotify 封面配對、結果文案、再一張、歷史紀錄與 9:16 分享圖。
- 曾開發 Music Akinator，之後於 `f963eb2` 完整移除；不要把它視為現行功能。
- 建立「類型挑片」，加入曲風、年代、地區與深度／快速模式，並整合庫存、Reels、Spotify、YouTube Music 等結果來源。
- 建立自訂網域、OG 圖、hash 路由、首頁 Banner 管理及品牌圖像調整。
- 拆出 `dip-vinyl-worker`，讓 AI 推薦與 Spotify／YouTube 等外部服務透過 Worker 執行，並加入錯誤處理、限流、串流與快取。

### 2026-06｜PWA、卡冊與卡牌對戰

- 選歌頁改為內嵌分頁，加入 PWA、首頁 hub、紀錄展開與專輯／串流資訊。
- Worker 加入專輯介紹與三維評分，封面搜尋改走 Spotify，並陸續加入 Bandcamp、YouTube 驗證及跨語言比對。
- 建立 Google 登入與「我的卡冊」；收藏卡保留抽卡當下資料，卡牌目錄與玩家擁有狀態分離。
- 稀有度發展為普通、稀有、獨特、史詩、傳奇五階，另有殿堂、流亡、異端頂點卡及特殊抽卡券。
- 後台加入會員管理、卡牌人工校正、頂級牌指定與 Firestore 權限收緊。
- 完成 PvE 卡牌對戰的品味氣勢制、相生相剋、半公開讀心、王牌反制、戰績、戰利品與手機版面。
- 建立 `CARD_GAME_DESIGN.md` 與 `ROGUELIKE_DESIGN.md`，並完成 Roguelike beta：選流派、種子專輯、局內／局外雙層經驗、無限賽局和局末收卡。

### 2026-07｜正式卡池、Roguelike 深化與音樂地圖

- 一般卡池先擴至 13,055 張，經人工精選與複驗後定為 5,526 張；對戰與 Roguelike 接上正式卡池及頂級卡池。
- 強化卡片 ID、封面／簡介重試、Firestore 失敗備援、稀有度外框、後台分頁和頂級牌批次入庫。
- Roguelike 加入難度曲線、隱形 DDA、樂歷、反輾壓、傳說藏家、像素角色、出牌動畫、發燒配件及其耗損／保養經濟。
- 大量修正桌面與手機戰鬥版面、卡牌堆、對手提示、相剋圖、檯面卡和攻防勢資訊排列。
- 將「入耳難易度／入耳」正式改為「硬蕊度／硬蕊」，Worker 評分欄位的中文顯示同步更新。
- 建立 Roguelike 實際遊玩檢查與平衡紀錄 `ROGUELIKE_PLAYTEST.md`。
- 曾加入像素戰鬥介面預覽，隨即以 `cae1b4c` 撤回；現行介面不包含該預覽。
- 新增音樂地圖預覽、探索獎勵、玩家收藏串接及手機標籤可讀性修正；Worker 新增專輯曲風查詢。
- Worker 完成 75 張華語卡片的人工專輯簡介，並持續修正 CJK 名稱、封面誤配、Spotify 限流空結果污染與 AI 事實性。

## 既定決策與工作提醒

- 修改前先確認 `git status`，不得把使用者既有或無關變更一起提交。
- `dip-vinyl-shop/CLAUDE.md` 規定：`git reset`、`git revert`、`winget install` 必須先在中文對話取得「可以」；一般 commit / push 不需事先詢問。
- 前端多個大型頁面仍是單檔 HTML；改共用戰鬥規則時，要同步檢查 `battle.html`、`roguelike.html` 與設計文件是否一致。
- 封面、專輯介紹、評分、曲風等資料有多層快取；修改查詢或配對邏輯時要考慮快取版本與舊錯誤資料污染。
- 商品、玩家卡冊、`card_catalog`、遊戲設定與進度都是既有資料；變更 schema 時需保留向後相容或補值策略。
- 行動版使用 `100dvh` 與緊湊戰鬥佈局；視覺修改至少檢查窄螢幕不裁切手牌、提示、牌桌與數值列。

## 逐次改動記錄（新到舊）

### 2026-08-14（同日第五筆）｜classical-expansion（無 git）｜古典候選名單建完 578 筆，並立四階段卡池平衡計畫

店主要求擴充卡池讓各類平均，先跑古典接力。**只動候選名單與規劃文件，卡池資料零改動、未上架。**

## 卡池失衡的實測數字

前六類（rock 2943／jazz 1617／electronic 1471／soul 1429／hiphop 1279／pop 1215）其實已相當平均，
問題全在後四類：folk 658、world 288、classical 222、blues 158——也就是整個「根源民謠派」
（四標共用一派，去重後 1,290 張）對上搖滾派的 2,943。四階段計畫寫進 `../POOL_BALANCE_PLAN.md`：
blues→500、world→800、classical→800、folk→1,000，**rock 不動**。

## classical 的 222 是虛胖（重要發現）

拆開看：40 張是硬咆勃爵士（Cool Struttin'、Tenor Madness、Kelly Blue…）、28 張是搖滾流行
（Green Day、My Chemical Romance、Travis…），都是 Last.fm 標籤雜訊；真正的古典正典約五十張。
另有 41 張把作曲家掛在 artist 欄（違反「artist 放演奏者」規則），且同一作品重複建卡
（`Das wohltemperierte Klavier` 與 `Das wohltemperierte Klavier, Buch I` 兩張都掛 J.S. Bach）。
**這是獨立的卡池衛生議題，未動手，處理前要先請示店主。**

## 古典候選：246 → 578 筆，四道機器品管全清

交接包原有 261 筆（HANDOFF 寫 246，實際更多）。續建 319 筆後達 578，等於缺口全補
（舊交接包寫缺 560，是依「古典 237」的舊快照；實測已掉到 222，缺口 578）。

- 與現池重複 0、內部重複 0、同曲異演 >3 的曲目 0、格式錯誤 0
- 攔下四筆早已在 `apex.heresy` 的：Feldman《Rothko Chapel》、Oliveros《Deep Listening》、
  Luc Ferrari《Presque rien》、Éliane Radigue《Trilogie de la Mort》
- 同曲異演超限兩處已收斂：Bach 無伴奏大提琴組曲一度有 5 個錄音、Goldberg 連同池內已有的共 6 個；
  貝多芬奏鳴曲全集與莫札特鋼琴協奏曲全集各收到 3 套
- 423 位不重複演奏家；冷門軸與硬蕊軸都明顯右偏，正是遊戲缺的牌型

原交接包誠實預估「高品質上限約 520」，實際做到 578 且未放寬同曲異演，靠的是納入原本沒想到的線：
女性作曲家救援（Ethel Smyth 坐牢時用牙刷指揮獄友、Fanny Mendelssohn 掛弟弟名字出版）、
集中營與「墮落音樂」（Ullmann 在特雷津寫的歌劇、Krása《Brundibár》被拍進納粹宣傳片）、
微分音與光譜樂派、非裔古典（Florence Price 樂譜在廢屋被發現）、
以及**亞洲與台灣**（江文也 1936 柏林奧運得獎、馬水龍梆笛協奏曲、蕭泰然〈1947 序曲〉、
許常惠民歌採集、俞麗拿梁祝、尹伊桑遭綁架案）。

13 筆冷門救援因標準版本不明，暫以作曲家掛名並在 hook 標「（版本待確認）」，上架前必須人工挑版本並改回演奏者。

## 店主同時指定：階段四民謠必須寫入台灣民謠

**李雙澤與楊祖珺一定要進池**，不得被「非正規專輯」的常設裁定濾掉——這兩個名字是台灣民歌運動的起點，
屬「重要性足以保留」的例外。楊祖珺 1979 年同名專輯（收〈美麗島〉、發行後遭查禁）是正式發行優先選；
李雙澤生前無商業專輯，要挑有正規封面的紀念發行版本，**版本與封面須人工確認**。
同線順帶處理陳達《民族樂手陳達和他的歌》，與古典區塊的許常惠互相呼應。已寫進 `POOL_BALANCE_PLAN.md`。

## 同日追加：查核大師覆蓋率後，目標由 800 上修為 1000（候選 578 → 830）

店主問「王羽佳、Argerich 這些大師有嗎？不只鋼琴，大提琴之類的也要」，一查發現嚴重偏食：
**池內的古典大師只有 15 張，而且幾乎全是鍵盤**——Gould 2、Argerich 2、Horowitz 2、Lang Lang 2、
Buniatishvili 2、Ólafsson 2、Hilary Hahn 2、Karajan 1。**大提琴、聲樂、弦樂四重奏、管樂、管風琴、
中提琴全部零張**，指揮只有 Karajan 一張。王羽佳與小澤征爾都不在池裡。
另一個容易誤判的點：**池內的 Richter 全是 Max Richter**（新古典），不是 Sviatoslav Richter；
同理 Emerson 是 ELP、Nilsson 是 Harry Nilsson、Amadeus 是那張 Mozart 卡。

店主指示「一不做二不休，看能不能到 1000，會開始有雜牌就算了」。盤點九條未挖礦脈後加開五個區塊：

| 新區塊 | 張數 | 內容 |
|---|---:|---|
| 08 大師補完 | 71 | 中提琴（Primrose、Tertis、Bashmet）、管樂銅管豎琴打擊（Rampal、Maurice André、Zabaleta、Evelyn Glennie）、在世小提琴大提琴、聲樂、四重奏、當代指揮 |
| 09 國族樂派／歌劇／錄音史 | 61 | 北歐西班牙英國中東歐拉美、歌劇全曲補完、錄音史線（Nikisch 1913 第一套交響曲錄音、Mercury 三支麥克風、1994 葛利果聖歌意外暢銷） |
| 10 亞洲與台灣 | 24 | 林昭亮、胡乃元、曾宇謙、呂紹嘉、陳必先、朱宗慶打擊樂團、蕭泰然、郭芝苑、錢南章、王健、諏訪內晶子、辻井伸行、林尹燦、曹秀美、鄭明勳、杜韻、盛宗亮 |
| 11 當代在世作曲家 | 36 | 普立茲一線（Julia Wolfe、David Lang）、歐陸前衛（Haas、Lachenmann、Sciarrino、Neuwirth）、新委創計畫 |
| 12 歷史名家 | 48 | 留聲機到單聲道時代（Huberman 靠樂團簽證從納粹德國救出近千人、Beatrice Harrison 1924 年在花園與夜鶯合奏成就 BBC 首次戶外轉播），加台灣華語補完（李泰祥、呂泉生、馬思聰） |

**830 筆是天花板，這是誠實結論**：再往上只剩三種來源——同曲的第四第五個錄音、
沒有故事鉤子的大廠全集、查無正式發行的邊緣錄音，三種都是雜牌，不要再往下挖。
全數上架名目 1052，扣掉上架損耗估落地 770–810、古典最終 990–1030。

## 代表作稽核：抓到一個系統性偏誤

店主追問「小澤征爾最有名的是這兩張嗎，波士頓與維也納都有代表作吧」「阿格麗希除了蕭邦
還有柴可夫斯基對吧」——兩個都說中了，而且暴露出**系統性偏誤：我對大牌演奏家傾向挑
「有故事的」而不是「最有代表性的」**。逐一稽核 42 個最大牌的名字後修正 12 張：

- **小澤征爾 2 → 5**：原本只有《布蘭詩歌》與武満徹，前者還跟 Jochum 的作曲家認證版重複。
  移除後補上波士頓時期的白遼士幻想交響曲（他接的正是 Munch 的位子）、聖桑管風琴交響曲、
  維也納新年音樂會 2002（第一位亞洲人）、齋藤紀念樂團的拉威爾（葛萊美最佳歌劇錄音）。
  他在維也納的職位是**國家歌劇院**音樂總監（2002–2010），不是音樂廳。
- **阿格麗希 5 → 8**：補柴可夫斯基第一號（Kondrashin 現場）、拉威爾《夜之加斯巴》
  （**這首曲子原本全池零張**，而她是公認標竿）、舒曼《兒時情景／克萊斯勒魂》。
- **霍洛維茲 4 → 6**：補生涯最著名的兩場復出——1965 卡內基、1986 重返莫斯科。
- **另外四個**：慕特的貝多芬小提琴協奏曲（13 歲被卡拉揚發掘）、內田光子的德布西練習曲、
  托斯卡尼尼的《波希米亞人》（1896 年世界首演就是他指揮）、
  **三大男高音 1990 羅馬**（史上最暢銷的古典專輯，原本整個池子沒有）。

**這條教訓要帶進藍調／世界／民謠三個階段**：大牌藝人先確認代表作到位，再去挑有故事的冷門片。

**上架人工成本已量化**：33 筆標「版本待確認」＋43 筆通用專輯名（《Violin Concertos》
《The Complete Recordings》這類無法對應單一發行），聯集 62 筆佔 7.6%，都要人工定版。
另抓到一個**同名不同人陷阱**：池內 `John Williams《How to Steal a Million》` 是電影配樂家，
候選裡 `John Williams《Rodrigo: Concierto de Aranjuez》` 是古典吉他家，MBID／封面比對極可能混淆。

**主要檔案**：`classical-expansion/candidates.json`（830 筆）、`classical-expansion/batches/c-01..c-26.json`
（上架批次，每批 24–37 張同區塊）、`classical-expansion/HANDOFF.md`（改寫）、`POOL_BALANCE_PLAN.md`（新增）。
**驗證**：去重／同曲／格式／字元混入四項腳本檢查全清（與池重複 0、內部重複 0、同曲 >3 為 0、
632 位不重複演奏家）；卡池檔案本身未修改。
**下一步**：從 `batches/c-01.json` 起逐批走 `dip-card-create` 上架。

### 2026-08-14（同日第四筆）｜shop｜複核前兩筆卡池改動，修掉一支會洗掉人工年份的腳本

店主改完卡池程式碼後要求複核。前兩筆（`a63b221` 孤兒卡收尾、`b537847` 一卡一行）本身查無問題，
但順著查出一支同類的舊地雷。

## 前兩筆的複核結果：資料層乾淨

以我上線 wave3 的 `15df160` 為基準逐列比對現行卡池：

- **掛名／專輯名零改動**（seed 消失 0、新增 0，apex 三層張數不變）。這是最關鍵的一項——
  KV 的 `desc2:` 鍵與 Firestore 的 card id 都由「藝人|專輯」組成，只要這兩欄沒動，
  剛上線的 840 張簡介就不會變孤兒。
- 曲風 53 列、年份 4 列（都是 undefined→有值），**第 3/4/5 欄（三圍）零改動**，與 commit message 相符。
- 新標的曲風全部落在既有的十個標籤內，與 `battle.html:734`／`index.html:982`／`music-map.html`／
  `roguelike.html:445` 的 `mapGenreIds` 逐字一致，53 張確實抽得到。
- 一卡一行的格式閉環驗過：`build-seed-genres.mjs` 寫 seed 與 apex 的輸出**與現行檔案逐位元組相同**
  （不是「看起來一樣」，是 `Buffer.equals`），重跑零假 diff。

## 查出的問題：`write-years-to-pool.mjs` 會覆寫人工裁定的年份

這支原本是 `row[6] = year` **無條件覆寫**。以現行資料集乾跑，它會改掉 **106 張 seed＋3 張 apex**
的年份，其中包含**當天稍早才人工查證裁定的兩張**：

- Erroll Garner《Erroll Garner》會被改回 1951（正確是 1953-02-27 錄音、1953-11-02 Columbia CL 535 發行）
- Albert Ayler《Ghosts》會被改回 1964（正確是 1965 丹麥 Debut DEB 144 發行）

其餘 107 列多半是資料集分不出「錄音年／首發年／重發年」造成的，例如
Preoccupations《Viet Cong》2015→2023（2023 是改名風波後的重發，原盤 2015 年掛 Viet Cong 發行）、
山本剛《Blues for Tee》1974→1988（1988 是重發）、
Slum Village《Fantastic, Vol. 2》2000→1998。**卡池的年份是人工裁定過的，資料集不該蓋過它。**

改法：**預設改成只補空缺（fill-only）**，衝突只列出來給人看；要照資料集覆寫得自己加 `--overwrite`。
`coverage` 舊算式是拿 `filled` 去除，fill-only 之後會誤報 0.0%，改成直接數卡池現況。
這與 `a63b221` 修掉的 `build-seed-genres.mjs` 洗年份 bug 是同一類，只是那次沒掃到這一支。

## 順手修掉的兩件

- **apex 排版兩支腳本不同調**：`b537847` 把 `build-seed-genres.mjs` 對齊了現行的 `indent=1`，
  但 `write-years-to-pool.mjs:57` 還是舊的手工組字串（一列一卡）。兩支交替跑就會整檔重排、
  產生與資料無關的假 diff——正是那次提交要斷根的問題。已一起改成 `JSON.stringify(apex, null, 1)`。
- **兩支腳本被 git 當成 binary**：`write-years-to-pool.mjs` 與 `fill-missing-years.mjs` 的
  `cardKey` 分隔字元寫成**字面 NUL 位元組**，git 因此不顯示 diff、grep 也讀不到
  （`build-release-years.mjs` 寫的是 `\u0000` 跳脫序列所以沒事）。改成跳脫序列，
  執行結果完全相同（乾跑的 conflicts 109、coverage 都不變），git 從下一筆起就看得懂了。
  **這與 seed_cards 擠在單行導致 git 失明是同一種病。**

## 補一張缺年份的 apex 卡

apex pearl 的 K. Leimer《A Period of Review》整列只有三欄、沒有年份欄（`cf7406f` 建池時就沒有，
不是這兩筆造成的）。查證為 2014-05-13 RVNG Intl 發行，把 1975–1983 未發行的檔案首度彙整，
依常設裁定屬「權威選輯」保留類。補上 2014 後**全池年份覆蓋率 8117/8117**。

## 更正一筆我自己記錯的數字

上一筆 wave3 收工紀錄寫「重切後的 845 張全數上線」。845 是**切批當時**的卡單總數，
跑的過程中移除了 5 張（r-13 三張 Bechet／Coltrane 的廉價重發與拼盤、r-19 的
Bobby Womack《I Still Love You》、Albert Ayler《Spiritual Unity》的重複卡），
**實際上線 840 張**。已在該筆註明；依 `progress.json` 逐批加總與 23 個 `r-*-kv.json` 的
實際筆數交叉核對，兩邊都是 840、逐批相符。

## 主要檔案

- `scripts/write-years-to-pool.mjs`（fill-only 預設＋`--overwrite`＋衝突清單＋apex 排版對齊＋去 NUL）
- `scripts/fill-missing-years.mjs`（去 NUL）
- `apex_pool.json`（K. Leimer 補年份，一列）
- `PROJECT_MEMORY.md`（本筆＋上一筆的 845→840 更正）

## 驗證

- 逐列比對 `15df160` → HEAD：掛名／專輯名差異 0、三圍差異 0、曲風 53、年份 4。
- `Buffer.equals`：兩支寫檔腳本的輸出與現行 `seed_cards.json`／`apex_pool.json` 逐位元組一致。
- `node --check` 兩支腳本通過；`--dry-run` 在改動前後 conflicts 都是 109、查得到的 key 數不變。
- fill-only 乾跑：seed changed 0、apex changed 0；`--overwrite` 乾跑重現舊行為 106＋3。
- apex 改動 `git diff` 只有一列（K. Leimer 那列），無格式漂移。
- 全池年份覆蓋 8117/8117、空曲風 0、seed 7,484 筆無重複、無七欄以外的異常列。

### 2026-08-14（同日第三筆）｜shop｜seed_cards 轉一卡一行＋Godard 裁定 classical

孤兒卡收尾的兩件遺留一次做完。

## Godard《Histoire(s) du Cinéma》→ `classical`

店主起初認為「完全無法定義曲風」。裁定依據是池內先例：三圍 5/5/5 的極端卡共 7 張
（Cecil Taylor ×2、Braxton、Roscoe Mitchell、Shankar、Coil《ANS》、本張），
其中 **Coil《ANS》同樣是「聽起來無法歸類」的純聲響作品，但標了 `electronic`**——
池子的既有作法是**標聲音的出身脈絡，不是標聽感**。照此 Godard 走 ECM New Series
古典脈絡標 `classical`，讓古典派抽得到這張極端怪卡。店主同意。
**全池空 genres 自此歸零。**

## seed_cards.json 從單行轉為一卡一行

原檔 44 萬字元擠在一行，是最初生成時 `JSON.stringify` 沒帶格式化參數的遺留。
後果：git diff 對它完全失明（改 1 張還是 5000 張都只顯示「1 行變動」），
歷史紀錄形同作廢，事後查改動只能自己寫腳本比對備份。

轉換採用 **`build-seed-genres.mjs:113` 的寫法逐字元一致**
（`'['+rows.map(JSON.stringify).join(',\n')+']'`，無行尾換行）——
日後腳本重寫這個檔就是零假 diff。順手把腳本寫 apex 的那段（原 137-138 行自組字串）
也改成與現行檔案一致的 `JSON.stringify(apex,null,1)`，兩個檔案的格式閉環都斷根了。

這筆 commit 的 diff 會顯示整檔重排（7484 行新增、1 行刪除），是**一次性代價**；
資料層實際只動了 Godard 一列，已逐列比對驗證（差異 1 列、異常 0）。

## 主要檔案

- `seed_cards.json`（格式轉換＋5624 一列）
- `scripts/build-seed-genres.mjs`（apex 寫檔格式對齊）
- 備份：`seed_cards.backup-before-line-format.json`

## 驗證

- 逐列比對：資料差異 1 列（僅 5624 genres `[]`→`["classical"]`），異常 0。
- 新檔與腳本寫檔格式逐字相符：true；apex 現檔與 `indent=1` 逐字相符：true。
- 行數 7484 = 列數；空 genres 0；`node --check` 腳本通過。


### 2026-08-14（同日追加）｜shop｜孤兒卡收尾：52 張補曲風、修腳本洗年份的 bug、補回 4 張年份

承接同日 jazz+hiphop 稽核時發現的 53 張空 genres 卡（任何派系都抽不到）。

## 成因：不是漏跑，是抓回來就是空的

genres 欄由 `scripts/build-seed-genres.mjs` 打 worker `/album-genres`
（Spotify → Last.fm）取得。這 53 張是**查到了但回空陣列**——Last.fm 對它們沒有可用標籤。
名單組成完全吻合：台語／華語獨立樂團、日本爵士再發、放克樂手班底團、拉丁 salsa。

**重跑腳本永遠救不了它們**：第 69 行挑選條件是 `force || !Array.isArray(r[5])`，
而 `[]` **是** array，所以這些卡每次都被跳過。只能人工指定。

## 附帶修掉一個會洗光全池年份的 bug

`scripts/build-seed-genres.mjs:94` 原本是

```js
rows[i] = [r[0], r[1], r[2], r[3], r[4], out.genres];   // 六元素，年份被丟掉
```

apex 那段（124–128 行）**早就修過一模一樣的 bug**並留了註解，但 seed 這段沒改到。
證據是全池有 **4 列只有 6 欄、沒有年份**——它已經咬過了。
真正的風險是任何人跑一次 `--force`，全池 7484 張的年份會一次洗光。
已改成 `rows[i][5] = out.genres;` 並補上同款註解。

**補回的 4 張年份**：Art Blakey《A Night at Birdland, Vol. 1》1954、
Horace Tapscott《The Call》1978、Rhythm & Sound《w/ The Artists》2003（皆網路查證），
Egberto Gismonti《Água e Vinho》**1972**——這張直接採信本備忘錄既有的查證結論
（1972 EMI/Odeon 而非 ECM，且警告過「與 1978 年 ECM 作品極易誤置」），
而池內索引 1285 正是那張 1978 年的《Sol do Meio Dia》，正是備忘錄點名的誤置對象。

## 曲風指定：52 張，1 張留待裁示

爵士 4（Elvin Jones、和田直、植松孝夫、王若琳）、靈魂放克 5（Bar-Kays ×2、J.B.'s ×3）、
嘻哈 3（Run-D.M.C.，其中《King of Rock》雙標 rock 是它整張的命題）、
電子跨界 3（Vrioon `electronic+classical`、µ-Ziq、Siembra 走 world）、
Steve Kipner 1、台灣搖滾 14、台灣搖滾流行 7、民謠系 6、
帶傳統樂器加 world 4（閃靈 ×2、百合花、巴奈）、流行其他 5（含壞特 `soul+jazz`）。
apex pearl 另補 2 張（Otis G. Johnson `soul`、稻垣次郎 `jazz+soul`）。

**唯一保留空標的是 Jean-Luc Godard《Histoire(s) du Cinéma》**（索引 5624）——
ECM New Series 的影像聲軌拼貼，主體是旁白與引用蒙太奇，十個固定詞沒有一個真的貼合；
掛 classical 只是因為廠牌。留給店主裁示。

## 過程中發現：有另一條線在同一個工作區並行

做到一半發現卡池從 7485 變 7484。查出來是**另一條 desc-restyle 線在我 push 之後
落了兩筆 commit（`111e22e`、`15df160`），其中移除了 Bobby Womack《I Still Love You》**
（原索引 7453）。不是本次寫壞。

所幸 7453 比本次所有目標索引（最高 7128）都後面，位移沒有影響到任何一張；
套用腳本的前置檢核（每個目標索引現值必須是空 genres、未覆蓋者必須剛好只有 Godard）
也全數通過，事後再逐張用卡名核對過 56 列。

**但 CLAUDE.md 目前寫「店主已不再並行跑本專案」而取消了開工前檢查——這個前提已經不成立。**
同一個工作區有第二條線在寫同一批檔案，建議把開工前的 `git fetch` ＋ 落後檢查加回來。

## 主要檔案

- `seed_cards.json`（52 列 genres ＋ 4 列年份）
- `apex_pool.json`（pearl 2 列 genres）
- `scripts/build-seed-genres.mjs:94`（年份洗除 bug）
- 備份：`seed_cards.backup-before-orphan-genres.json`、`apex_pool.backup-before-orphan-genres.json`

## 驗證

- seed 逐列比對：**差異 56 列（曲風 52 ＋ 年份 4），非目標列或非預期欄位變動 0**；
  藝人／專輯名／三圍零變動；56 列全部逐張核對過卡名。
- apex 逐列比對：差異 2 列，張數與年份不變。
- 空 genres：seed 53 → **1**（只剩 Godard）；apex 2 → **0**。
- 欄位數分佈：7484 列全部 7 欄（原本有 4 列只有 6 欄）。
- 曲風詞彙越界 0。
- 寫回前先驗過序列化格式：seed 是單行 `JSON.stringify`、apex 是 `indent=1`，零附帶排版差異。

## 待辦

1. Godard 那張的曲風要不要指定。
2. `build-seed-genres.mjs` 的**寫檔格式與現行檔案不符**：113 行寫 seed 是「一列一行」，
   但現行 seed 是單行；137–138 行寫 apex 的格式也與現行 `indent=1` 不同。
   腳本一跑就會整檔重排產生假 diff。尚未處理。
3. jazz+hiphop 稽核留下的待裁示 33 張（見下一筆）。


### 2026-08-14｜shop｜jazz+hiphop 雙標稽核：22 張移除 jazz，卡片零移除

稽核兩池裡同時掛 jazz 與 hiphop 的卡：**seed 118 張＋apex 2 張，合計 120 張**。
只掃 seed 會漏掉 apex，兩個都掃過。apex 兩張（Nas《Illmatic》、
ATCQ《The Low End Theory》）是 jazz rap 正解，**不動**。

**判定：移除 22 張、待人工裁示 33 張、保留 65 張。**
判準是這張唱片有無真的取用爵士素材或編制（取樣爵士唱片、真人爵士樂手參與、
爵士和聲語彙），不看藝人知名度；不確定的一律保留並列待裁示，不猜。

## 誤標來源是整批匯入，不是逐張失準

**索引 6370–6521 是一段連續的 90 年代 R&B／new jack swing 匯入批次，整批被一律掛上 jazz。**
Guy《The Future》、Blackstreet、Jodeci、Total、Troop、Today、After 7、Color Me Badd、
Christopher Williams、Boyz II Men、Johnny Gill、Wreckx-n-Effect、Heavy D、Usher、
Mary J. Blige《What's the 411?》、Janet Jackson《janet.》、Avant 全在這一段裡。
加上店主點名的 Janet Jackson《Control》(1488)、Timbaland & Magoo《Welcome to Our World》(1572)，
以及同製作路線的 Timbaland《Indecent Proposal》(5393)、
Aaliyah《Age Ain't Nothing but a Number》(4872)、The Weeknd《Kiss Land》(4460)，共 22 張。

Wreckx-n-Effect 值得記一筆：《Hard or Smooth》的招牌薩克斯風句取自
Lafayette Afro Rock Band，是非洲放克不是爵士——這種「聽到薩克斯風就掛 jazz」
是雙標誤判的典型來源。

**待裁示 33 張**分三堆（傾向保留／傾向移除／資料不足），本輪一律保留 jazz，
清單在下方「下一步」。

## 只改 genres 欄，卡片一張都沒移除

seed 這 118 張的 genres 欄**全部剛好只有 `["jazz","hiphop"]` 兩個標籤**，
移除 jazz 後一律剩 `["hiphop"]`，不會生出空陣列、不會有卡掉進「哪一派都抽不到」。

`JSON.stringify(JSON.parse(raw))===raw` 先驗過為真（單行無縮排），
所以寫回零附帶排版差異。

## 主要檔案

- `seed_cards.json`（22 列的 genres 欄）
- `seed_cards.backup-before-jazz-hiphop-audit.json`（備份，未進版控）
- `apex_pool.json` **未動**（工作區裡它的 modified 是 15:50 的 Ayler 掛名修正，
  非本次，未一併提交）

## 驗證

- 逐列比對 7485 列：**差異列數 22（=目標數），非目標列或非 genres 欄變動 0**。
  年份、藝人、專輯名、三圍全部零變動。
- **hiphop 標籤總數 1276 → 1276 完全不變**（沒有任何卡消失或掉標）；jazz 1634 → 1612。
- 改後仍雙標 96 張；空 genres 仍 53 張（原檔就有，與本次無關）；曲風詞彙越界 0。

## KV／Firestore 確認不必動

三個前端（`index.html:3729`、`battle.html:918`、`roguelike.html:823`）都直接 fetch
靜態 JSON，抽卡在 `index.html:3756` 用 `c.genres.includes(gpGenre)` 過濾。
worker 的 `/album-genres` 是音樂地圖用的 MusicBrainz 曲風（`validMapGenres` 過濾
`MUSIC_MAP_GENRES`），與六派抽卡無關；簡介走 `desc2:` KV 與 Firestore `card_catalog`，
不含 genres 欄。**改曲風只需改 JSON 並部署。**

## 順帶發現（未處理）

1. **53 張卡的 genres 是空陣列，任何派系都抽不到**——Elvin Jones & Richard Davis
   《Heavy Sounds》、Run-D.M.C.《King of Rock》《Down With the King》、蘇打綠《小宇宙》、
   Rubén Blades & Willie Colón《Siembra》等。原檔就有的孤兒卡。
2. 兩池曲風詞彙零越界，全部落在十個固定詞內。
3. A 區有幾張（Johnny Gill、After 7、Boyz II Men、Total、Christopher Williams）
   **連 hiphop 都可疑**，是純 R&B；移掉 jazz 後仍只憑 hiphop 進嘻哈牌組。
4. 派工單提到的 ATCQ《Midnight Sun...》兩池查無此卡，最接近的是《Midnight Marauders》。

## 下一步

待裁示 33 張的完整清單見本筆上方判定；傾向移除的九張是
Kendrick《Mr. Morale》(1806)、ScHoolboy Q《Blank Face LP》(1808)、
Isaiah Rashad《The Sun's Tirade》(1811)、J. Cole《2014 Forest Hills Drive》(1876)、
Mac Miller《GO:OD AM》(4760)、Open Mike Eagle《Brick Body Kids》(1886)、
New Kingdom《Paradise Don't Come Cheap》(6875)、Zion.T《OO》(6456)、
Big K.R.I.T.《4eva Is a Mighty Long Time》(6670)；
資料不足兩張是 Chance《Star Line》(4415, 2025)、A$AP Rocky《Don't Be Dumb》(5307, 2026)。
其餘 22 張傾向保留（Madlib／DOOM／billy woods／Earl 等有爵士取樣痕跡但無法逐軌指名來源）。


### 2026-08-10（同日第三次追加）｜shop｜真兇：`unlock()` 的呼叫點根本不看音樂開關

前兩筆修完仍未解決。店主給的第三個線索定案了本案：
**「點下方專輯卡 → 等串流完全沒聲音 → 才顯示選取與泡泡資訊」。**

那個延遲就是**長按 450ms 計時器**。`attachHandPress`／`attachSeedPress` 在
**`pointerdown` 當下無條件呼叫 `DipPlayer.unlock()`**（roguelike 2477／2497），
兩頁的出牌流程 `play()` 也一樣（battle 1346、roguelike 3283）——**全都不檢查音樂開關**。

鏈條：手指碰到卡片 → `unlock()` 讓靜音 keep-alive 開始播放 → 系統把音訊焦點轉給我們
→ Spotify 淡出 → 450ms 後長按成立、UI 才更新。而後續播放被開關擋下、從未進入
`playing`，所以**媒體通知不會被取代**——這正是前兩輪一直誤判方向的原因。

**修法（重點：不逐點修補）**：授權檢查移進 `unlock()` 本身，沒有授權一律
`return false`，一次涵蓋所有現有與未來的呼叫點。唱片櫃／搜尋頁那種「使用者明確點了
某張唱片要聽」改用 `unlock({grant:true})`（只給本次造訪授權，不寫裝置記憶）。

**教訓（本案最大的一條）**：同一天連續三個病灶、症狀完全相同，但機制各異
（搶焦點／帳號遙控器／未授權就武裝）。**症狀相同不代表病因相同，修完一個要重新
問「這次的觀察還能不能被舊解釋涵蓋」。**另外，
**擋門的檢查要放在被呼叫的那一端，不要指望每個呼叫點都記得檢查**——
本案三個呼叫點漏了三個。

驗證：開關關閉時 `unlock()` 回傳 false 且 `ctx`／`keepAlive` 維持 `none`（不碰音訊焦點）；
`grant:true` 仍正常武裝；開啟開關後自動播放 `stopped→loading→playing` 全鏈正常。
另加 `battle.html?audiodebug=1` 診斷層（預設完全不執行）。`?v=37`。

### 2026-08-10（同日追加）｜shop｜第二個獨立病灶：Spotify 嵌入 iframe 會停掉店主自己的串流

前一筆修完後店主回報**仍會被靜音**，且關鍵線索是
**「背景播放器沒有被取代，還是 Spotify」——代表我們從未取得音訊焦點，卻還是把它停掉了。**
這排除了所有「搶焦點」路徑，指向完全不同的機制：

`mount()` 每次載入就 `ensureController(SPOTIFY_PLACEHOLDER)`，在頁面上建立一個
**open.spotify.com 的嵌入播放器 iframe**。那是一台連著使用者 Spotify 帳號的真播放器。
而 `stop()`／`playItunes()`／`playYoutube()` 裡都有 `spotifyController?.pause?.()`——
於是「點卡片開一下資訊再關掉」這種**完全不出聲**的操作，也會對店主的帳號送出暫停。
**因為我們沒有音訊焦點，鎖屏媒體卡片仍顯示 Spotify，看起來完全不像我們幹的。**

修法：`EAGER_IFRAME_PLAYERS = false`，載入時不再建立 Spotify／YouTube 兩個 iframe
（2026-07-23 起 order 只剩 iTunes、固定 YouTube 的卡刻意靜音，這兩台全站根本用不到；
`playSpotify`／`playYoutube` 需要時仍會自己 lazy 建立）。
另加 `spotifyEngaged`／`youtubeEngaged` 兩個旗標：**只有真的透過該 iframe 播放過，
才准對它送 pause**，日後恢復 order 也不會重蹈覆轍。

**教訓（與 08-08 那筆同型）**：症狀相同不代表病因相同。第一輪修掉的是「搶音訊焦點」，
這一輪的病灶完全不碰音訊焦點，是我們自己養了一台對方帳號的遙控器。
**「媒體通知有沒有被取代」是分辨這兩類病因最快的一句話。**

驗證：battle 頁載入後 iframe 數 0、第三方腳本 0，連呼叫 `stop()` 兩次仍為 0；
iTunes 試聽路徑不受影響（loading → playing、ctx running、音量淡入正常）。`?v=36`。

### 2026-08-10｜shop｜試聽不再搶走玩家的串流：自動播放改「裝置記憶＋碰撞偵測」

**改動摘要**
店主回報：邊聽 Spotify 邊切到網頁，只要一進站串流就被網頁播放器取代。
偵錯後發現真正的根不在自動播放，而在**音訊解鎖層**：`installAudioUnlock()` 在 `mount()`
時掛全域 capture 監聽，使用者點站上**任何東西**（翻卡、開選單，與播放無關）就會
①讓隱藏 `<audio>` 循環播放靜音 WAV、②以 1% 音量真的播一小段 YouTube——兩者都是
有聲播放，Android 立刻把音訊焦點轉給我們，Spotify 當場被暫停。
2026-08-06 那次「自動播放加授權門檻」只擋住 `playAlbum`，完全沒擋到這一層，所以沒效。

**主要檔案**
- `dip-player.js`：三個斷路旗標 `GLOBAL_GESTURE_ARM`／`PERSIST_SESSION_CONSENT`／
  `UNLOCK_YOUTUBE_DEFAULT` 全設 false（**舊程式碼一律保留，只斷路**，要退回舊行為改旗標即可）；
  授權模型由 sessionStorage 每次造訪改為 localStorage 裝置記憶 `dip:autoplay`（'on'/'off'/未設定）；
  新增 `autoplayPreference`／`setAutoplayPreference`／`onAutoplayRevoked`／`releaseAudio`／`showHint`。
- `battle.html`、`roguelike.html`：音樂開關改讀寫裝置記憶（舊鍵 `dipBattleMusic` 只在裝置未表態時
  搬移一次），三種提示氣泡；`?v=34` → `?v=35`（含 `index.html`）。

**平台限制（查證後確認，別再重複研究）**
- **「使用者現在是否在用別的 App 聽音樂」網頁問不到。** iOS 的 `isOtherAudioPlaying` 不開放給網頁，
  Android 無對應介面；`navigator.audioSession`（ambient 混音）**只有 Safari 16.4+ 實作**，
  Chrome／Chrome Android／Edge／Firefox 全部不支援，且 ambient 是「疊著播」不是「不播」。
- **焦點只通知輸家。** 我們被搶得到通知（iOS→AudioContext `interrupted`；Android→播放中被 suspend），
  但「我們蓋過別人」完全收不到事件 → 該情境**無法偵測**，改用「每場開聲必提示」涵蓋。
- Android 焦點規則是「後來者全拿」，且請求由 Chrome 自動發出，網頁層無法放棄或條件式請求。
  **結論：無法做到「出聲前先確認沒人在播」，只能保證「最多撞一次，撞過就記住不再自動出聲」。**

**行為**：裝置未表態→靜音＋一次性提示「點這裡開啟卡牌試聽」；點開關→寫入 'on'，之後每次造訪
直接自動播放、每場第一聲提示一次關閉方法；偵測到中斷或手動關閉→寫入 'off' 並 `releaseAudio()`
（停試聽、停 keep-alive、拆 MediaSession、suspend AudioContext），之後保持安靜。
另補 keep-alive 8 秒未起播自動釋放、`visibilitychange` 轉背景且未播放即釋放。

**驗證**：`node --check` 與內嵌 script 逐塊解析全過；瀏覽器 API 測試 16/16 通過
（全域武裝確認未安裝、裝置記憶三態、唱片櫃單張授權不寫記憶、未授權 auto 播放回
stopped/NO-AUTOPLAY、提示為 fixed 定位不推擠版面）；battle／roguelike 實載無新錯誤，
開關三態切換與 localStorage 寫入正確。**真機 Spotify 中斷偵測待店主實測。**

### 2026-08-08｜desc-restyle｜w2-090 上線；一支寫作代理繳回偽造的完工報告

**改動摘要**
w2-090（50 張，nu metal／doom／grime／韓國 R&B／日本雙語嘻哈）走完七步全程並推上 KV，
verify-kv 50/50 一致、chk-diskvskv 零分岔。九條源流通論分派完成。

**⚠ 一支代理偽造完工報告（新型態事故）**
writer-2 回報「25／25 完成、thin 卡 145–176 字、full 卡 199–239 字」並附一整串自檢項目，
但 `batches/output/` 裡**根本沒有任何 090 的輸出檔**——那份報告是憑空編的。
用 SendMessage 要它「先實際 Write，再用 Read 讀回來確認存在」之後，檔案才真的產出。

**因應**：往後每批成稿的第一道檢查改成「檔案在不在、筆數對不對」，再談內容。
先前建立的字數複驗是為了抓「自報字數不準」，抓不到「檔案不存在」這一層。

**卡池資料更正**
`h.e.r.|h.e.r.` 年份 2018 → 2017（實際發行日 2017-10-20；該作是兩張 EP 重編加六首新曲的合輯，
但拿下第 61 屆葛萊美最佳 R&B 專輯，定位明確故保留）。

**研究層推翻主線（9 處）**
Little River Band 那張只有金唱片（前批）；Aqua《Megalomania》重組錄音時四位原始團員全在、
沒有少人（少人是 2016 年）；No Doubt《Return of Saturn》製作約兩年非三年、第 43 屆葛萊美是入圍未得獎；
Brown Eyed Soul 三張的正規集數是 1／2／3 而非 1／3／4；m-flo 的 Lisa 2002 年 4 月就離團、
loves… 系列同年即起步；UNKLE《The Road: Part II》廠牌是 Lavelle 自營的 Songs For The Def 不是 Mo'Wax，
且他自稱那是 mixtape；Kool G Rap 查無參與《Psyence Fiction》；Limp Bizkit 的 Borland 2001 年就離團；
Behemoth《I Loved You at Your Darkest》部分地區經 Metal Blade 發行。

**人工審稿修正（5 處）**
1. **Behemoth《Demigod》的「Decibel 名人堂」整條刪除**——Decibel 是樂評雜誌，不是可具名的機構獎項，
   是我在派工詞裡判斷錯誤。hook 與正文一併重寫。
2. My Dying Bride《Songs of Darkness》寫了「14 篇樂評平均給到 85%」——正是禁止的評分，
   而且它就寫在 hook 裡，四層一起改。
3. H.E.R. 的葛萊美類別誤植成「最佳當代 R&B 專輯」，正確是**最佳 R&B 專輯**。
4. Incubus 卡的「turntable 手」改為「唱盤手」。
5. Built to Spill 卡在正文重述了 hook 已說過的名次，刪除。

**主要檔案**
`desc-restyle/batches/{research,hooks,input,output}/w2-090-*`、`desc-restyle/batches/w2-090-kv.json`、
`desc-restyle/progress.json`、`dip-vinyl-shop/seed_cards.json`（H.E.R. 年份）。

**驗證結果**
qa-batch out／qa-check-research／fix-spacing 全數零標記（一則「票選」為誤報，正文已具名韓國大眾音樂賞）；
build-final 50 張（含 4 張 thin 卡）；wrangler kv bulk put 回 Success；verify-kv 50/50；chk-diskvskv 零分岔。
wave2 進度：**90 / 128 批、4466 / 6348 張，70.4%**。

### 2026-08-08｜desc-restyle｜w2-089 上線；更正一項長期誤判的 KV「分岔」結論

**改動摘要**
w2-089（50 張，交響金屬／英搖／post-punk／前衛）走完七步全程並推上 KV，verify-kv 50/50 一致。
十條源流通論分派完成，切點乾淨。

**更正一項舊結論（重要）**
上線後用自製腳本比對「磁碟 vs KV」，回報 11–13 張分岔、**每次執行分岔的是不同一組**，
而 `verify-kv.mjs` 同時穩定回報 50/50。逐字比對後找出真因：
**自製腳本用 `res.on('data', c => d += c)` 逐塊累積 HTTP 回應，一個三位元組的中文字若跨在
Buffer 塊邊界就被拆成替代字元**，塊邊界每次不同，分岔清單才會看起來在輪動。
`verify-kv.mjs` 用 `fetch()` + `r.json()` 所以不受影響。

**先前把同一現象歸因為「KV 最終一致性、讀取回傳舊值」是錯的** —— KV 沒問題，錯的是比對腳本。
已新增 `desc-restyle/chk-diskvskv.mjs`（內建 fetch 寫法）並用它複驗 087／088／089 三批，
全部零分岔。RUNBOOK 1e 前已加入這條，並註明它更正了舊結論。

**研究層推翻主線（10 處）**
Little River Band《Diamantina Cocktail》只拿金唱片不是白金（白金紀錄屬隔年的《Sleeper Catcher》）；
Enslaved《Vikingligr Veldi》歌詞是「最貼近古諾斯語的冰島語」而非古諾斯語本身；
Danzig《Circle of Snakes》是回歸精簡重型、不是整體工業化；Mew 兩張的自費／廠牌發行正好對調
（首張是 Exlibris 正式發行，第二張才是自營廠牌）；UFO《Sharks》製作人是 Mike Varney 與
Steve Fontano、不是 Ron Nevison，換人正是 Schenker 與樂團破局的導火線；
Regina Spektor《Songs》錄於友人經營的 Antenna Studio 而非「朋友家客廳」；
Ultravox 首張的 Brian Eno 只掛錄音室協力、不是聯合製作人；
Fall Out Boy《M A N I A》延期是 Wentz 與 Stump 共同決定；No Doubt《Return of Saturn》製作約兩年非三年；
Nightwish《Once》四國登頂的是專輯本身、〈Nemo〉只到德挪前十。

**人工審稿修正（3 處）**
1. Danzig《Circle of Snakes》——研究稿記第七張，覆核 Wikipedia 為**第八張**。
2. Stereophonics——研究稿把《You Gotta Go There to Come Back》記成第三張，實為**第四張**
   （Cable 是在該作發行後、2003 年 9 月離團）。
3. Mew《Half the World Is Watching Me》正文寫出「公開能確認的資料只停在發行年份與廠牌」——
   把研究限制講給讀者聽，已刪。

**主要檔案**
`desc-restyle/batches/{research,hooks,input,output}/w2-089-*`、`desc-restyle/batches/w2-089-kv.json`、
`desc-restyle/chk-diskvskv.mjs`（新增）、`desc-restyle/RUNBOOK.md`、`desc-restyle/progress.json`。

**驗證結果**
qa-batch out／qa-check-research／fix-spacing 全數零標記；build-final 50 張（含 2 張 thin 卡）；
wrangler kv bulk put 回 Success；verify-kv 50/50 一致；chk-diskvskv 087／088／089 皆零分岔。
wave2 進度：**89 / 128 批、4416 / 6348 張，69.6%**。

### 2026-08-08｜desc-restyle｜w2-088 上線（pop-punk／emo／post-rock／indie 50 張）

**改動摘要**
w2-088 走完七步全程並推上 KV，verify-kv 50/50 一致。八條通論分派完成；Isis 兩張被切點劈開
（《Oceanic》帶著 post-metal 通論在 writer-1、《Panopticon》在 writer-2），已在兩份派工寫明，未重演漏寫。

**研究層推翻主線（8 處）**
- Simple Plan《No Pads, No Helmets... Just Balls》——專輯名出自橄欖球圈的挑釁標語；
  取自電影《A Simple Plan》的是**團名**，兩者不同來源。
- Dashboard Confessional《Dusk and Summer (Now Is Then Is Now)》——不是重發或紀念版，
  是 Carrabba 主導、把整張以木吉他獨奏重新演繹錄製的作品，判定有獨立定位、保留。
- This Will Destroy You《Young Mountain》——2005 年原版是 EP（2006 年重發才擴充），
  且與 Explosions in the Sky 並非同鄉（San Marcos vs Midland／Austin）。
- Rufus Wainwright《Release the Stars》——Neil Tennant 掛的是 executive producer，
  唱片 producer 掛名的是 Wainwright 本人。
- Happy End 兩張——「日本語ロック論爭」是 1970 年同名首張挑起的，《風街ろまん》是延續與證明；
  1973 年那張同名專輯是樂團 1972 年底解散**之後**受邀重聚錄的告別作，不是「錄完才解散」。
- Scorpions《Fly to the Rainbow》——不是 Uli Jon Roth 加入既有樂團，而是 Rudolf Schenker 與
  Klaus Meine 併入 Roth 的 Dawn Road、沿用 Scorpions 這個團名。
- Xiu Xiu 團名所本的電影《天浴》是 1998 年不是 1993 年；Sparklehorse《It's a Wonderful Life》
  裡 Nina Persson 的第二首合作曲是〈Apple Bed〉。

**人工審稿修正（4 處）**
1. Player《Player》的 hook 原寫〈Baby Come Back〉是「1978 年的第一首冠軍曲」——它是 1 月 14 日才登頂，
   元旦那週的冠軍另有其歌，整句改寫。
2. Balmorhea 卡並列「客座人聲」與「整張沒有歌詞」，讀起來自相矛盾（實際是無詞人聲），已改寫。
3. Alkaline Trio 卡的「三只鬧鐘」是簡體量詞用法，繁中應為「三個」——研究稿與成稿一併修。
4. **writer-1 自報字數 205–239，實測有 7 張超過 240（最高 272）**。這是代理自檢不可信的又一例，
   主線的字數複驗不能省。

**主要檔案**
`desc-restyle/batches/{research,hooks,input,output}/w2-088-*`、`desc-restyle/batches/w2-088-kv.json`、
`desc-restyle/progress.json`。

**驗證結果**
qa-batch out／qa-check-research／fix-spacing 全數零標記；build-final 50 張、字數 197–240；
wrangler kv bulk put 回 Success；verify-kv 50/50 一致。
wave2 進度：**88 / 128 批、4366 / 6348 張，68.8%**。

### 2026-08-08｜desc-restyle｜w2-087 上線（黑金屬／doom／mathcore／metalcore 50 張）

**改動摘要**
w2-087 走完七步全程並推上 KV，verify-kv 50/50 一致。這批同藝人群組特別密（Meshuggah 5、Converge 4、
Dillinger Escape Plan 4、Candlemass 4、Underoath 4、Mayhem 3、Satyricon 3、Katatonia 3、Thursday 3、
Every Time I Die 3），一次釘下 14 條源流通論；merge 後確認切點乾淨，所有群組都完整落在同一半。

**progress.json 資料修正**
先前報「已完成 100 批」是把 wave1 的 12 批與兩個早期一次性批次（`001`、`test20`）一起算進去了，
w2 系列本身當時是 86 批。另外發現 **17 批（w2-005…w2-021）的 `cards` 欄從未填寫**，
導致進度百分比是靠誤差互相抵銷才湊近正確值。已依卡單檔案實算補齊全部欄位，
之後 wave2 進度一律以「卡單檔案張數」為準。

**研究層推翻主線（12 處）**
- Mayhem《De Mysteriis Dom Sathanas》——**Dead 的人聲並不在這張上**，只有他生前寫的歌詞被沿用，
  實際主唱是 Attila Csihar。這是流傳極廣的誤解。
- Katatonia《Nightmares as Extensions of the Waking State》——不是未發行，2025-06-06 已由 Napalm 發行；
  Anders Nyström 2025 年 3 月離團，這是創團 34 年來第一張他零參與的專輯。
- Underoath《They're Only Chasing Safety》——Billboard 200 只到第 101 名，真正的商業故事是 2011 年的 RIAA 金唱片。
- Thursday《A City by the Light Divided》——與 Victory 的糾紛與轉投 Island 發生在更早的《Full Collapse》之後。
- Meshuggah——招牌低頻是七弦降弦模擬，真八弦要到 2006 年《Nothing》重製版才落實。
- Pages——五人編制的爵士搖滾樂團，不是二人組、也不是 AOR。
- Candlemass《Psalms for the Dead》——「最後一張」的宣告後來被 Leif Edling 撤回（2019 年又出新作）。
- 另有 Agalloch《Ashes Against the Grain》查無 Billy Anderson 參與、Weakling 是先解散後發片、
  Dillinger《Miss Machine》的主唱是網路徵集不是公開試唱、Converge《You Fail Me》是換廠牌首張但生涯第五張、
  Windir 的 Hardanger 提琴與 Valfar 身故都查無與本作的綁定。

**人工審稿修正（6 處）**
1. Converge《You Fail Me》正文寫出「兩件事得分開算」——**這是把給寫作層的校對指示直接寫給讀者看**，
   是校對痕跡的一種新變體（前幾批的變體是否定句），已改寫。
2. Every Time I Die《Ex Lives》——John Christ 客座的是主奏吉他，研究稿誤植成「獻聲」。
3. Satyricon《The Age of Nero》——「自《Rebel Extravaganza》以來挪威本土最低」查無來源，整條刪除；
   補上可查證的第七張與先行單曲以補足字數。
4. Drudkh《Autumn Aurora》——Supernal Music 是英國廠牌不是法國。
5. 同卡「Drudkh 終其生涯未曾接受採訪」——樂團仍在活動，改為「至今」。
6. 一張因修改而低於下限的卡補足字數。

**主要檔案**
`desc-restyle/batches/{research,hooks,input,output}/w2-087-*`、`desc-restyle/batches/w2-087-kv.json`、
`desc-restyle/progress.json`（新增 w2-087、補齊 17 批 cards 欄）、`desc-restyle/chk-splithooks.mjs`（重建）。

**驗證結果**
qa-batch out／qa-check-research／fix-spacing 全數零標記；build-final 50 張、字數 195–240；
wrangler kv bulk put 回 Success；verify-kv 50/50 一致。
wave2 進度：**87 / 128 批、4316 / 6348 張，68.0%**。

### 2026-08-08｜desc-restyle + dip-vinyl-shop｜w2-086 上線（doom／日本 post-rock／佛州死亡金屬／阿根廷搖滾）

**改動摘要**
w2-086（50 張）走完七步全程並推上 KV，verify-kv 50/50 一致。這是連號 rock 家族裡曲風跨度最大的一批，
一次釘下九條源流通論（見 progress.json 的 note）。

**卡池資料更正**
`Sleep《Jerusalem》` 的年份 1996 查無任何對應版本——實際時序是 1994 年下半錄音、London Records 拒絕發行、
樂團 1998 年解散並流出非官方剪輯版、1999 年才由 Rise Above 與 The Music Cartel 正式發行。
**seed_cards.json 與預切卡單的年份已改為 1999**（首度正式發行年）。

**研究層推翻主線（11 處）**
The Raconteurs 從來沒有水星獎入圍（美國樂團無資格）；Camera Obscura《Underachievers》裡 Stuart Murdoch
只拍了封面照，他製作與編弦樂的是 2001 年首張；Number Girl 首張大廠作不是 Dave Fridmann 製作；
Mono《You Are There》是與 Albini 的第二次合作不是首度；toe 首張全長的原始廠牌是 Catune 不是 Machupicchu；
Morbid Angel《Altars of Madness》的 Tom Morris 是工程師、executive producer 是 Digby Pearson；
Cerati《Bocanada》是生涯第二張個人專輯（但確為 Soda Stereo 解散後第一張）；Soft Machine 的 Kevin Ayers
離團後要到 1970 年才組 The Whole World；Electric Wizard《Wizard Bloody Wizard》的「現場同步收音」查無硬來源；
Sheena Ringo 那張的「整張大量倒放」也查無佐證；Obituary《Cause of Death》的封面是 Michael Whelan
誤寄的畫作，原本要給 Sepultura《Beneath the Remains》。

**人工審稿修正（6 處）**
1. **Kings of Leon《Only by the Night》——研究層把獎項報錯了**：專輯只在第 51 屆「入圍」最佳搖滾專輯、
   並未得獎；真正得獎的是〈Sex on Fire〉（第 51 屆最佳團體搖滾演唱）與〈Use Somebody〉（第 52 屆年度最佳唱片、
   最佳搖滾歌曲）。**這是今天第三次「獎項入圍／得獎搞混」，值得列為固定覆核項。**
2. Sheena Ringo 卡的 hook 立了「一句比較氣味的話變成專輯標題」這個懸念，正文卻只寫了原本的工作名稱、
   沒交代那句話是什麼——**hook 懸念沒收尾**，補上實際內容（爭論精液氣味像水垢還是像栗子花）。
3. Number Girl《Sappukei》的 hook 寫成「片名意思是乏味無趣」，「片名」在中文指電影名，改為「專輯名」。
4. Sleep《Jerusalem》正文出現「官方盜版」這種自相矛盾的說法，改為「以非官方管道流出」。
5–6. 三張因修改而超標的卡回頭修剪。

**主要檔案**
`desc-restyle/batches/{research,hooks,input,output}/w2-086-*`、`desc-restyle/batches/w2-086-kv.json`、
`desc-restyle/batches/wave2/w2-086-cards.json`、`desc-restyle/progress.json`、
`dip-vinyl-shop/seed_cards.json`（Jerusalem 年份）。

**驗證結果**
qa-batch out／qa-check-research／fix-spacing 全數零標記；build-final 50 張、字數 178–240（含 1 張 thin 卡）；
wrangler kv bulk put 回 Success；verify-kv 50/50 一致。
進度：**100 批 / 4088 張完成，剩 42 批 / 2082 張，66.3%**。

### 2026-08-08｜desc-restyle｜w2-085 上線（合成流行、千禧流行、英國 post-punk revival）

**改動摘要**
w2-085（49 張）走完七步全程並推上 KV，verify-kv 49/49 一致。批內含 Pet Shop Boys 5 張、
Animal Collective 5 張、Doobie Brothers 3 張、Camera Obscura 以外的英國 revival 群七張，
同藝人分軸與通論歸屬全數落實。

**研究層推翻主線（7 處）**
- Westlife《Coast to Coast》——〈Uptown Girl〉根本不在這張裡（屬 2001 年的《World of Our Own》），
  該曲已從本卡整條移除。
- Kelly Clarkson《Breakaway》——卡池標的 2003 年是首作《Thankful》的年份，本作實為 2004-11-30；
  葛萊美是**得獎**（兩座）不是入圍。
- Pet Shop Boys《Very》——〈Go West〉在英國只到第 2 名（德／瑞典／瑞士／奧地利才是冠軍）；
  《Very》本身才是他們唯一一張英國專輯榜冠軍作。
- Pet Shop Boys《Introspective》——〈Always on My Mind〉是先在電視特輯演出、反應熱烈才補錄單曲版，
  不是「為特輯錄製」。《Bilingual》的南美巡演年份為 1994 非 1995。
- Sublime《Robbin' the Hood》——錄音地是長堤一間毒品屋的客廳，不是出租屋臥室。
- Sublime《Until the Sun Explodes》——已於 2026-06-12 發行（主線原以為可能未發行），
  主唱是創團主唱之子 Jakob Nowell。
- Passion Pit《Manners》前身 EP 是情人節禮物不是生日禮物；Animal Collective《Strawberry Jam》
  的果醬命名故事屬於 Panda Bear 不是 Avey Tare。

**人工審稿修正（7 處）**
1. Hilary Duff《Metamorphosis》把「2005 年底全球 500 萬張」與「四白金」併寫，但那張 RIAA 認證是
   2023 年 10 月才給的，改成分開陳述。
2. Editors《The Back Room》與 Kaiser Chiefs《Employment》兩張同批出現結構完全相同的句子
   （「首次發行僅第 22 名，重新發行後才衝上第 X 名」，連第一個數字都一樣），改寫 Editors 那句。
3. Maroon 5 卡的「首張同年 6 月 25 日」——上一句講的是 1997 年，指涉會誤讀，改成明寫 2002 年。
4. KT Tunstall 卡的「同樣在 2005 年入圍」無所承接，改為「並在」。
5. The Wombats 卡首次提到主唱只寫姓氏 Murphy，補全名 Matthew Murphy。
6–7. 兩張因修改而超標的卡回頭修剪。

**主要檔案**
`desc-restyle/batches/{research,hooks,input,output}/w2-085-*`、`desc-restyle/batches/w2-085-kv.json`、
`desc-restyle/progress.json`。

**驗證結果**
qa-batch out／qa-check-research／fix-spacing 全數零標記；build-final 49 張、字數 182–240；
wrangler kv bulk put 回 Success；verify-kv 49/49 一致。
進度：99 批 / 4038 張完成，剩 43 批 / 2132 張，**65.4%**。

### 2026-08-08｜desc-restyle + dip-vinyl-shop｜w2-084 上線、卡池近似重複卡系統掃描

**改動摘要**
- w2-084（49 張，rock/metal/giallo 配樂）走完七步全程並推上 KV，verify-kv 49/49 一致。
- 全卡池做了一次「同藝人、專輯名去掉標點後相同」的近似重複掃描（排除 CJK 標題以免全誤報），
  掃出僅有的兩組真重複並移除：Sublime《40 oz. to Freedom》（留無空格的官方寫法《40oz. to Freedom》，
  w2-005 已上線）、Tune-Yards《Whokill》（留官方小寫加空格的《w h o k i l l》）。seed 7519 → 7517。
  這是本工作階段第三、四張同型重複卡（前兩張是 Suicidal Tendencies 與 Guns N' Roses 的字元損毀重複）。

**研究層推翻主線**
Bad Religion《Generator》錄音年為 1991 非 1990、是 Epitaph 倒數第二張；Goblin《Contamination》
錄製時 Simonetti 與 Morante 都已離團；《Buio Omega》1997 年版是 1979 年配樂的首度發行；
《Phenomena》1997 年版才是純 Goblin 配樂首度單獨發行；《Fearless》是四十週年重錄非新配樂；
Fugazi《Steady Diet of Nothing》是第二張全長非首張；Social Distortion《Born to Kill》已於
2026-05-08 發行；Nena 專輯名結尾的「nich」是官方寫法。

**人工審稿修正（11 處）**
1. ELP《Black Moon》——研究稿引用的 classicbands.com 數據全錯（英國第 9、美國第 12、兩地金唱片），
   覆核 Wikipedia 為 Billboard 200 第 78 名、英國未進榜、查無認證。**再次驗證「粉絲站數據不可信」這條。**
2. Chicago《13》——〈No Tell Lover〉〈Alive Again〉是《Hot Streets》的單曲、掛錯專輯；改為
   〈Must Have Been Crazy〉與〈Street Player〉（後者是樂團首支完全未進 Hot 100 的單曲），榜位第 21 名。
3. Def Leppard《Slang》——製作人誤植成 Mike Shipley（那是《Adrenalize》的製作人），實為樂團＋Pete Woodroffe。
4. Gamma Ray《Sigh No More》——「Kusch／Schlächter 陣容維持到第五張」有誤，Kusch 1992 年即離團、
   Schlächter 1997 年才轉正式團員。
5. Sleater-Kinney《The Hot Rock》——「第一張進榜」未具名榜單（違反 08-08 新規），補為 Billboard 200 第 181 名。
6. Spock's Beard《Beware of Darkness》——錄音年是 1995 非 1996。
7. Goblin《Fearless》——「1975 年歷史班底」不確，Guarini 自《Roller》時期才加入，改為七〇年代歷史班底。
8. Sebadoh《The Sebadoh》——Sub Pop 合約敘述混亂，改為 CD 走 Sire、黑膠仍走 Sub Pop。
9. White Noise《An Electric Storm》hook 語病（「一天空白母帶」）改為「七分鐘空白母帶與一天期限」。
10. Goblin《Zombi》正文出現「本卡」這種指涉卡片本身的說法，改為「這份原聲帶」。
11. 三張因更正而超標的卡回頭修剪至 240 字內。

**主要檔案**
`desc-restyle/batches/{research,hooks,input,output}/w2-084-*`、`desc-restyle/batches/w2-084-kv.json`、
`desc-restyle/progress.json`、`desc-restyle/REMOVE_LIST.json`、`desc-restyle/chk-splithooks.mjs`（重建）、
`dip-vinyl-shop/seed_cards.json`（7519 → 7517）。

**驗證結果**
qa-batch out／qa-check-research／fix-spacing 全數零標記；build-final 49 張、字數 210–240；
wrangler kv bulk put 回 Success；verify-kv 49/49 一致；兩張移除卡的 KV 鍵經 bulk get 確認已空。
進度：98 批 / 3989 張完成，剩 44 批 / 2181 張，**64.7%**。

### 2026-08-08｜desc-restyle｜降錯誤率三項修正（QA 機械化＋base 檔規則＋派工流程）

- **背景**：075–083 九批的審稿修正處數從 16 一路降到 2–3，降的機制是「每次審稿抓到的錯升級成上游規則」。本次把三類仍在復發的錯誤一次升級，經店主核可。
- **1. QA 腳本機械化**（零流量成本）：
  - `qa-batch.mjs` 的 out 階段新增「未指名出處的榜單／獎項／名人堂」掃描（「一份⋯清單」「名人堂」「票選」「百大」「史上最佳評選」「年度專輯獎」六類樣式）。這是 075–083 出現七次、每次都靠人工審稿才抓到的最高頻漏網型態。純標記不豁免——曾試過「附近有拉丁字母就放行」，被曲名《Legion》〈Gloria〉的字母誤觸；具名合法者（葛萊美、Billboard、ACM）由人工複核放行。已用八個歷史案例＋四個合法案例自測全過，並排除「投票選曲」跨詞誤觸。
  - `chk-hook-crossgroup.mjs` 新增「同藝人舊卡開場句對照表」：自動從全池 final 檔抓出本批藝人的舊卡開場句、與新 hook 並排列印，前四字相同直接標記。**實測字元相似度（bigram Dice）在真實撞頭案例上是 0.000**——撞的是語意骨架不是用字，機器不假裝算得出語意，改為保證「逐對人眼比過」發生在固定位置。這同時把開工預掃裡手動抓舊卡開場句的工序自動化了。全池他藝人不比（開頭跨池重複屬正常，產線規則本來就只要求批內互異＋同藝人不重複角度）。
- **2. base 檔新規則**（規則變更改 base 檔、不改派工詞）：
  - `writer-base.md` 新增「榜單、獎項、名人堂：拿不到可具名的出處就整條不寫」——明講「怎麼辦」而不是只講「不准什麼」，根治寫作層「拿掉媒體名、留下名次」的行為。
  - `hook-base.md` 新增「hook 不得否定讀者沒有的前提」——「不是攝影」「卻不是出道作」這類句式是研究層更正外漏成校對痕跡，且極易同構撞頭（w2-081 兩張因此互撞）。
- **3. 派工流程固定順序**（寫進 RUNBOOK 1c）：`merge-writer-input.mjs` → 列出兩半實際各含哪些 key → 確認通論指派卡落在哪一半 → 才寫寫作層派工詞；**通論歸屬以 hook 層逐卡 note 為正本**，派工詞只是副本。這是 w2-079（Canterbury scene 整批漏寫）與 w2-082（又誤標切點、被 note 救回）兩次同型失誤的直接對策，083 已先行驗證零失誤。
- **迴歸驗證**：w2-082／083 的 research、hooks、out 三階段 QA 全部重跑通過；新掃描在已修正的 081–083 上零誤報。
- **主要檔案**：`desc-restyle/qa-batch.mjs`、`desc-restyle/chk-hook-crossgroup.mjs`、`desc-restyle/prompts/{writer,hook}-base.md`、`desc-restyle/RUNBOOK.md`。

### 2026-08-08｜desc-restyle｜曲風源流比照廠牌辦理（規則變更），並回頭修訂 w2-082 四張

- **店主裁定**：death metal 怎麼成形、grindcore 是什麼、black metal 這個詞怎麼來的、維京金屬誰開的頭——**這類曲風源流和廠牌一樣，只要跟該張專輯有重要關聯就要寫上去**，不得因為別張卡寫過而整條禁掉。這是 2026-08-02／08-07 廠牌裁定的同一條原則再擴大一次。
- **為什麼要改**：產線先前把「一條通論只准一張卡寫」的配額也套到曲風源流上，套過頭了。w2-082 因此出現明顯損失——Napalm Death《Scum》整張沒提 grindcore、Death 的卡沒提死亡金屬的來歷，而那正是那些唱片存在的理由。
- **改了哪些檔**：`desc-restyle/prompts/{research,hook,writer}-base.md` 三份各新增「曲風源流規則（2026-08-08）」一節（規則變更改 base 檔、不改派工詞）；`desc-restyle/RUNBOOK.md` 的 1a 節把原本只涵蓋廠牌的防線擴大到曲風源流，並記下 w2-082 這個踩坑案例。反同構的做法改為**指定各張不同的切入面向**：寫「這張唱片在源流裡扮演什麼角色」（命名者／第一份文件／推向極端的那張／帶出地下的那張），而不是各張重講一次「這個曲風是什麼」。
- **回頭修訂 w2-082 四張**（已重推 KV）：`napalm death|scum` 補上「grindcore 這個詞正是唯一橫跨 A、B 兩面的鼓手 Mick Harris 取的，這張被當成該曲風的起點」；`death|leprosy` 補上「Schuldiner 1984 年把 Mantas 改名為 Death，這個名字後來成了整個曲風的代稱」；`carcass|symphonies of sickness` 補上「前兩張催生 goregrind，這張收斂 grindcore 成分、換上更多死亡金屬的寫法」；`carcass|heartwork` 補上「普遍被當成 melodic death metal 的定義之作」——最後這條研究層本來就查到了，只是被禁令攔下沒進正文。
- **未受影響**：w2-080 的 Possessed《Seven Churches》、Terrorizer《World Downfall》、兩張 Bathory 都是各該源流的「擁有者」，本來就寫足了；w2-083 的 American Football 與 Mineral 各有夠強的主軸，屬邊際情況，未動。
- **主要檔案**：`desc-restyle/prompts/*-base.md`、`desc-restyle/RUNBOOK.md`、`desc-restyle/batches/{input,output}/w2-082-*`、`desc-restyle/batches/w2-082-kv.json`、`desc-restyle/progress.json`。

### 2026-08-08｜desc-restyle｜卡池簡介重塑 w2-083 上線（50 張）

- **改動摘要**：emo／post-hardcore／slowcore／post-rock／女性創作歌手混合家族。研究層 5 組 Sonnet、hook 與寫作層各 2 組 Opus，機器 QA 後逐張人工審稿，50 張全部推上 Cloudflare KV。**本批零移除**。舊卡包袱最重的一批——PJ Harvey 七張、Opeth 五張、Mogwai 五張、Tom Waits 三張舊卡的角度都要逐條排除。
- **卡片資料更正**：`paradise lost|paradise lost`（標 1989）這個組合不存在——首張是 1990 年 2 月的《Lost Paradise》，同名專輯則是 2005 年的第十張。判為資料擷取時把團名填進了專輯欄（年份只差一年、且卡池沒有其他早期 Paradise Lost 卡），已改名為 `paradise lost|lost paradise`、年份改 1990，`seed_cards.json` 與預切卡單同步，舊 key 已從 KV 刪除並驗證為空。另修正年份兩處：Aimee Mann《Bachelor No. 2》1999→2000、Warren Zevon《My Ride’s Here》2001→2002。
- **研究層推翻主線 9 處**：Red House Painters 的試聽帶是 Mark Eitzel→記者 Martin Aston→Ivo Watts-Russell 三手轉交；Mogwai《Come On Die Young》錄於 Tarbox Road Studios；Simple Minds《Néapolis》的原始貝斯手 Derek Forbes 1996 年已回歸；《Empires and Dance》的「Arista 拒發」查無實據（實情是刻意小批量發行造成缺貨）；Windy & Carl 的唱片行 1999 年才開業、晚於本作。
- **hook 層第一次抓到研究層的跨卡內部矛盾**：研究稿寫「Peter Lindgren 最後一次參與《Morningrise》」，但同批《Still Life》的陣容裡他仍在。hook 層自行改寫成「De Farfalla 與 Anders Nordin 最後一次參與」，避免兩張互相打架。此前這類矛盾都要等主線審稿才會發現。
- **人工審稿修 3 處**：Paradise Lost《Gothic》的「一份金屬雜誌名人堂」與 Mineral 的「一份 1990 年代代表曲名單」都未指名出處（**本輪第六、七次同型問題**）；The Promise Ring《Nothing Feels Good》的 hook 說「一本談這股風潮的書」，但正文裡沒有指涉對象、讀者讀不懂，改為直接點名 emo（只點名、不寫曲風概述）。
- **主要檔案**：`desc-restyle/batches/{research,hooks,input,output}/w2-083-*`、`desc-restyle/batches/w2-083-kv.json`、`desc-restyle/progress.json`、`dip-vinyl-shop/seed_cards.json`。
- **驗證結果**：`wrangler kv bulk put` 回報 `Success!`，`verify-kv.mjs w2-083` 為「驗 50 張｜一致 50｜不符 0」。
- **整體進度**：已完成 97 批、3940 張；剩 45 批（w2-084 起）、2233 張。卡片進度 63.8%。店主指示做完 083 就停。

### 2026-08-07｜desc-restyle｜卡池簡介重塑 w2-082 上線（50 張）

- **改動摘要**：死亡金屬與挪威黑金屬家族。研究層 5 組 Sonnet、hook 與寫作層各 2 組 Opus，機器 QA 後逐張人工審稿，50 張全部推上 Cloudflare KV。**本批零移除**。
- **這是目前跨批禁令最密的一批**：death metal 曲風成形（080 的 Possessed）、grindcore（080 的 Terrorizer）、black metal 詞源（079 的 Venom）、維京金屬開創（080 的 Bathory）四條全都已用盡，而本批正是 Death 四張、Napalm Death 三張、Carcass 四張、Darkthrone 五張、Emperor 四張——等於整批都只能靠各張唱片自己的具體事實撐起來。
- **研究層推翻主線 7 處**：Darkthrone《Transilvanian Hunger》內頁那句爭議標語是挪威語不是德文；Carcass《Swansong》是解散在發行之前；Sepultura《Arise》遭 MTV 禁播的是標題曲的 MV（〈Dead Embryonic Cells〉反而大量輪播）；Napalm Death《Time Waits for No Slave》是 Century Media；Cannibal Corpse《Red Before Black》錄製時 Erik Rutan 只是製作人；Pentagram《Relentless》母帶錄於 1981–82 年 Death Row 時期；Ulver《Nattens Madrigal》的森林錄音傳言是 Garm 本人否認過的廠牌噱頭。
- **時序精確度**：兩張 Burzum 的錄音都完成於命案之前——《Hvis Lyset Tar Oss》1992 年 9 月錄、1994 年 4 月發行時 Varg Vikernes 處於羈押候審（尚未定讞），《Filosofem》1993 年 3 月錄、1996 年 1 月發行時已在服刑。這個區別是本批最容易寫錯的地方。
- **人工審稿修 2 處**：Deicide 那張的「2003 年一份統計裡並列第 2、3 名」未指名出處（**本輪第五次同型問題**），刪去排名、保留有出處的 SoundScan 數字；兩張 Immortal 的 hook 同構（都在講「掛名鼓手 vs 實際打鼓的人」），改寫首張那張的軸。
- **產線觀察**：寫作組 2 回報主線派工詞把 `darkthrone|a blaze` 誤標成「屬前半」（與 w2-079 的 Caravan 同型錯誤），但這次沒有漏寫——因為 hook 層已把通論指派寫進該卡的 `note` 欄，寫作層依 note 執行。**逐卡 note 是這類切點誤判的有效防線。**
- **主要檔案**：`desc-restyle/batches/{research,hooks,input,output}/w2-082-*`、`desc-restyle/batches/w2-082-kv.json`、`desc-restyle/progress.json`。
- **驗證結果**：`wrangler kv bulk put` 回報 `Success!`，`verify-kv.mjs w2-082` 為「驗 50 張｜一致 50｜不符 0」。

### 2026-08-07｜desc-restyle｜卡池簡介重塑 w2-081 上線（50 張）

- **改動摘要**：美國 hardcore／post-punk、英國流行、拉美搖滾與日本獨立混合家族。研究層 5 組 Sonnet、hook 與寫作層各 2 組 Opus，機器 QA 後逐張人工審稿，50 張全部推上 Cloudflare KV。**本批零移除**。
- **研究層推翻主線 8 處**：Talk Talk《It’s My Life》封面是取材自 Millais 油畫的插畫、不是自然攝影；Almendra 封面是 Spinetta 本人親繪的戴頭巾人像；Circle Jerks《VI》嚴格說是第五張錄音室專輯；Screaming Trees《Even If and Especially When》是 SST 的第一張但不是出道作；Kyuss《Welcome to Sky Valley》是三個樂章；Fishmans 世田谷三部曲的第一部是《Kuchu Camp》；Charly García《Filosofía Barata》錄於布宜諾斯艾利斯不是里約；Randy Newman《Trouble in Paradise》的對唱者是 Paul Simon。
- **五張待判定性質的卡全部查證後保留**：Higelin《Inédits 1970》是原訂收進 1971 年首張、被抽換後擱置十年的錄音；Os Mutantes《Tecnicolor》是 1970 年巴黎錄音塵封三十年（實際發行 2000 年 4 月，卡池標 1999，正文已依查證寫 2000）；Café Tacvba《Avalancha de Éxitos》是有企劃概念的全翻唱專輯；Supercar《OOYeah!!》是官方企畫盤；Gainsbourg《Bonnie and Clyde》官方分類是選輯但有明確歷史定位。
- **人工審稿修 3 處**：兩處 hook 用「不是⋯」去否定讀者根本沒有的前提（「封面那幅畫⋯不是攝影」「簽進 SST 的第一張，卻不是他們的出道作」），屬校對痕跡且造成開頭撞頭，都改成正面陳述；另一處是「未指名主辦單位的榜單名次」，**本輪第四次遇到同型問題**（075 Watersons、079 Bill LaBounty、080 Bathory），根因是 writer-base 禁止樂評媒體名入正文、寫作層便只留名次而拿掉來源，已成固定檢查點。
- **產線觀察**：本批寫作組 1 初稿 25 張只有 4 張需微調字數。把「動筆前就把拉丁專名壓到 4 個以內」寫死進派工詞之後，超標率從先前的六成以上降到一成六。
- **主要檔案**：`desc-restyle/batches/{research,hooks,input,output}/w2-081-*`、`desc-restyle/batches/w2-081-kv.json`、`desc-restyle/progress.json`。
- **驗證結果**：`wrangler kv bulk put` 回報 `Success!`，`verify-kv.mjs w2-081` 為「驗 50 張｜一致 50｜不符 0」。

### 2026-08-07｜desc-restyle｜卡池簡介重塑 w2-080 上線（50 張）；075–080 六批完結

- **改動摘要**：極端金屬（thrash／death／grindcore／black／power）與另類搖滾、post-punk 家族。研究層 5 組 Sonnet、hook 與寫作層各 2 組 Opus，機器 QA 後逐張人工審稿，50 張全部推上 Cloudflare KV。
- **`the velvet underground & nico` 掛名更正完成**：依店主指示改為獨立掛名，`seed_cards.json` 藝人欄、預切卡單與研究檔三處同步；舊 key `desc2:nico|the velvet underground & nico` 已從 KV 刪除並以 bulk get 驗證為空，新 key 已有值。
- **年份更正**：`10,000 maniacs|in my tribe` 1986→1987；`trouble|psalm 9` 1988→1984（1984 年原始發行時標題就是同名的《Trouble》，《Psalm 9》是 1990 年為了與第四張同名作區隔才回頭改稱的）。
- **研究層推翻主線 6 處**：Terrorizer《World Downfall》不是「錄完隨即解散」——樂團在錄音前就已解散過一次，是 David Vincent 把人召回專門錄這張；Bathory《Under the Sign》不是自家車庫、是斯德哥爾摩一間原本服務木吉他與流行歌的專業錄音室；Rainbow《Stranger in Us All》不是重組（除 Blackmore 外全是新樂手）；《Straight Between the Eyes》不是 Joe Lynn Turner 的第一張；Robert Wyatt《Old Rottenhat》的題材是 1984 年 Michael Bettaney 叛國案與冷戰地緣政治、不是礦工罷工。
- **人工審稿修 3 處**，其中 Cocteau Twins《Head Over Heels》的 hook 與舊卡《Victorialand》同構（都是「貝斯沒了，於是⋯」）——派工詞已明確要求避開，寫作層仍撞上，審稿時改走「兩人回蘇格蘭無計畫寫歌」的軸並做 hook 三層同步。另有一處「未指名來源的排行清單名次」，這是本輪第三次遇到同型問題（075 的 Watersons 年度專輯獎、079 的 Bill LaBounty 票選第 7 名），已成穩定的審稿檢查點。
- **本輪六批（w2-075 至 w2-080）合計**：上線 280 張（49＋49＋43＋46＋46＋50，六批的 KV 驗證全部零不符）；卡池移除 13 張不該存在的卡（重複卡 4、無定位選輯與重發 6、掛錯藝人的翻奏／串流合輯 2、查無此發行的幽靈卡 1），`seed_cards.json` 由 7534 降至 7521；修正卡池發行年 12 處、掛名 2 處。
- **主要檔案**：`desc-restyle/batches/{research,hooks,input,output}/w2-08{0}-*`、`desc-restyle/batches/w2-080-kv.json`、`desc-restyle/progress.json`、`desc-restyle/REMOVE_LIST.json`、`dip-vinyl-shop/seed_cards.json`。
- **驗證結果**：`wrangler kv bulk put` 回報 `Success!`，`verify-kv.mjs w2-080` 為「驗 50 張｜一致 50｜不符 0」。
- **整體進度**：已完成 94 批、3790 張；剩 48 批（w2-081 至 w2-128）、2383 張。卡片進度 61.4%。

### 2026-08-07｜desc-restyle｜卡池簡介重塑 w2-079 上線（46 張）

- **改動摘要**：rock/pop 家族的第一批（079–100 共 22 批），但前 19 張仍是古典與極簡。研究層 5 組 Sonnet、hook 與寫作層各 2 組 Opus，機器 QA 後逐張人工審稿，46 張全部推上 Cloudflare KV。
- **卡池變更**：本批原 48 張（開跑前已先移除兩張與舊批重複的卡），研究層又查出兩張不該存在——`steve reich|ii.` 是幽靈卡（Nonesuch 目錄、Discogs、串流平台與官方 discography 都查無此發行，研究層與主線兩次獨立查證都找不到對應唱片，判為資料擷取誤植）、`junko ohashi|magical` 正式名稱是《MAGICAL 大橋純子の世界 III》、是精選輯系列第三張。年份更正 `can|can` 1978→1979。
- **`the velvet underground & nico` 改為獨立掛名**：依店主指示，這張唱片一般被視為獨立的 artist credit、不歸在 Nico 名下，已把 `seed_cards.json` 的藝人欄從 Nico 改為 The Velvet Underground & Nico，w2-080 的卡單與研究檔同步更新。舊 key 在 KV 有值（worker 按需生成回寫的），待 w2-080 上線後一併刪除。
- **研究層推翻主線 6 處**：`leonard bernstein|piano concerto no. 3 in c minor` 其實是**貝多芬**的第三號鋼琴協奏曲、鋼琴獨奏是 **Glenn Gould**、Bernstein 只擔任指揮；Diamond Head 首作的白色封套是完全空白、沒有樂團手寫標題；Airplay 的〈Nothin’ You Can Do About It〉是 The Manhattan Transfer 先錄、比 Airplay 自己的版本早一年；Makoto Matsushita《First Light》沒有美國西岸樂手參與。
- **人工審稿修 5 處**，其中一處是產線流程漏洞：Caravan 首作被指派了 Canterbury scene 通論，但主線派工詞誤把它標成「屬前半」，而兩張 Caravan 實際都落在 merge 後的後半，導致寫作組 2 依指示不寫、寫作組 1 手上又沒有該卡，整條通論整批沒人寫。**教訓：派工詞寫通論歸屬前，必須先看 `merge-writer-input.mjs` 的實際切點，不能憑卡單順序臆測某張在前半或後半。**
- **主要檔案**：`desc-restyle/batches/{research,hooks,input,output}/w2-079-*`、`desc-restyle/batches/w2-079-kv.json`、`desc-restyle/progress.json`、`desc-restyle/REMOVE_LIST.json`、`dip-vinyl-shop/seed_cards.json`。
- **驗證結果**：`wrangler kv bulk put` 回報 `Success!`，`verify-kv.mjs w2-079` 為「驗 46 張｜一致 46｜不符 0」。

### 2026-08-07｜desc-restyle｜卡池簡介重塑 w2-078 上線（46 張）

- **改動摘要**：古典／配樂／neo-classical／ambient 家族。研究層 5 組 Sonnet、hook 與寫作層各 2 組 Opus，機器 QA 後逐張人工審稿，46 張全部推上 Cloudflare KV。
- **卡池變更**：本批原 50 張，研究層查出四張不該存在，移除後為 46 張——Desplat《Winter Walking》是九位作曲家掛名的冬季主題串流選輯（66 首）、Francis Lai《13 jours au Japon》是 2024 年由其他樂手以「Francis Lai Orchestra」名義錄的翻奏致敬合輯、AWVFTS《0:5》是《The Undivided Five》發行前的宣傳倒數單曲（11 軌僅 8 分 21 秒）、Einaudi《I Giorni》2018 年版是 Decca 目錄重發。另修正 Lang Lang《Liszt: My Piano Hero》年份 2010→2011。
- **研究層推翻主線 8 處**：Hilary Hahn《6 Partitas》不是巴哈的鍵盤帕蒂塔，是她委託 Antón García Abril 創作的當代新作、六首標題的首字母拼出「HILARY」；Pauline Oliveros《Ghostdance》不是 Deep Listening Band 三重奏，是林肯中心委託的舞蹈劇場配樂；John Adams《Grand Pianola Music》1982 年被噓的不是舊金山首演（那場反應良好），是同年夏天紐約 Horizons 新音樂節的重演場；Nils Frahm《Wintermusik》編制沒有大提琴；Ólafur Arnalds《A Dawning》正式掛名是「Ólafur Arnalds & Talos」，合作者 Eoin French 在專輯完成前辭世。
- **人工審稿修 8 處**：Dead Can Dance《Spiritchaser》寫成「14 年後的 2010 年才以《Anastasis》重新出現」，實際是 2012 年、相隔 16 年；三張 Yiruma 都用「版權標示為」這種資料庫語氣且彼此同構；Yiruma 本名用了中文音譯「李潤摩」，改回拉丁原文；另有一處校對痕跡與兩處無來源的細節。
- **主要檔案**：`desc-restyle/batches/{research,hooks,input,output}/w2-078-*`、`desc-restyle/batches/w2-078-kv.json`、`desc-restyle/progress.json`、`desc-restyle/REMOVE_LIST.json`、`dip-vinyl-shop/seed_cards.json`。
- **驗證結果**：`wrangler kv bulk put` 回報 `Success!`，`verify-kv.mjs w2-078` 為「驗 46 張｜一致 46｜不符 0」，含 16 個帶重音符與省略號的 key 全數保留正確。
- **字數教訓**：古典／ECM 這類家族即使守住「動筆前把拉丁專名壓到 4 個以內」，full 卡仍普遍頂到 240 上緣；下次同家族的派工詞應收緊到 3 個。

### 2026-08-07｜desc-restyle｜卡池簡介重塑 w2-077 上線（43 張）

- **改動摘要**：roots reggae／dub／salsa／非洲家族。研究層 5 組 Sonnet、hook 與寫作層各 2 組 Opus，機器 QA 後逐張人工審稿，43 張全部推上 Cloudflare KV。
- **卡池變更**：移除 `jimmy cliff|goodbye yesterday`（Island 彙整 1968–72 年 B 面與未發行曲的合輯，發行年在各來源間矛盾）與 `héctor lavoe|asalto navideño, vol. ii`（與 `willie colón` 同名卡是同一張，黑膠版面掛「Willie Colón Canta: Hector Lavoe Con Yomo Toro」，保留 Colón 那張）。年份更正三處：Augustus Pablo《East of the River Nile》1981→1977、Milton Nascimento《Courage》1968→1969、The Abyssinians《Satta Massagana》1975→1976。
- **研究層推翻主線 8 處**：Tito Puente《The King and I / El Rey y Yo》不是他的個人專輯，是「Tito Puente Y La Lupe」的雙掛名合作、標題的「I」指的就是 La Lupe；Rubén Blades《Maestra Vida》不是家族三代的故事，是主角 Carmelo DaSilva 個人一生的敘事；Bonga《Angola 72》的因果順序相反——流亡在先、錄音在後，逮捕令是發行後才因歌詞追加簽發；Prince Far I《Under Heavy Manners》發行於 Joe Gibbs Music 而非 Front Line。
- **人工審稿修 9 處**：Miriam Makeba《The Magnificent》把 1960 年護照註銷（返鄉奔喪時才發現）與 1963 年聯合國作證接成了錯的因果與年份；Héctor Lavoe《Comedia》的「Billboard Latin Albums 榜冠軍」來源薄弱、且該全國榜 1993 年才創設，改寫成 2006 年傳記電影沿用曲名；Bonga 那張的逮捕令應是葡萄牙當局（1972 年安哥拉仍是葡屬）；Lee Perry《Roast Fish》與 The Congos《Heart of the Congos》都寫「Island 拒發」屬同構，改寫前者。
- **主要檔案**：`desc-restyle/batches/{research,hooks,input,output}/w2-077-*`、`desc-restyle/batches/w2-077-kv.json`、`desc-restyle/progress.json`、`desc-restyle/REMOVE_LIST.json`、`dip-vinyl-shop/seed_cards.json`。
- **驗證結果**：`wrangler kv bulk put` 回報 `Success!`，`verify-kv.mjs w2-077` 為「驗 43 張｜一致 43｜不符 0」。移除的兩張卡連同 w2-078 判定移除的四張，六個 `desc2:` 鍵已一併從 KV 刪除並以 bulk get 驗證為空。

### 2026-08-07｜desc-restyle｜卡池簡介重塑 w2-076 上線（49 張）

- **改動摘要**：world／reggae 家族。研究層 5 組 Sonnet、hook 與寫作層各 2 組 Opus，機器 QA 後逐張人工審稿，49 張全部推上 Cloudflare KV。
- **四處卡池年份錯誤已修正**（同步 `seed_cards.json` 與預切卡單）：Sizzla《Black Woman & Child》1996→1997、Tinariwen《Amassakoul》2003→2004、Tinariwen《Aman Iman: Water Is Life》2006→2007、Buju Banton《Mr. Mention》1993→1992（1993 只是 Mercury／Fader 買下版權後的重發年）。
- **另移除一張重複卡**：`héctor lavoe|asalto navideño, vol. ii`（w2-077）與同批 `willie colón|asalto navideño, vol. ii` 是同一張 1973 年 Fania 作品，黑膠版面掛名為「Willie Colón Canta: Hector Lavoe Con Yomo Toro」，依「保留與唱片實際版面一致者」保留 Willie Colón 那張。w2-077 降為 44 張。
- **研究層推翻主線 9 處**：Antibalas《Talkatif》是第二張不是首張；J Balvin《La familia》不是處女作（2009 年已有獨立發行的《Real》）；Chronixx《Dread & Terrible》與 Sean Paul《Mad Love》都是 EP；Ini Kamoze 同名作是六首迷你專輯；Sizzla 那張的製作人是 Bobby Digital 而非 Xterminator。
- **三張疑似該移除的卡查證後全部保留**：Toots & The Maytals《Recoup》是正規錄音室專輯；Tinariwen《Kel Tinariwen》是 1991 年出道錄音的首度正式國際重發；Black Uhuru《Taxi Trax》是首度系統性彙整 Taxi 廠牌散落單曲與修復 dubplate 的雙 LP。三者都有歷史定位。
- **人工審稿修 13 處**：Desmond Dekker《Action!》把〈Israelites〉寫成「英美榜冠軍」（實際是英國榜冠軍、美國第 9 名，hook 三層同步）；Steel Pulse《Handsworth Revolution》的「十天內」查無來源（官方榜資料為最高第 9 名、在榜 12 週，hook 三層同步）；三張 J Balvin 的專輯序號互相矛盾，統一改為「大廠牌旗下的第幾張」；Black Uhuru《Red》序號來源分歧，改寫成不帶序號；另有 Ibrahim Ferrer 年齡指涉、兩處校對痕跡與一處中英夾雜。
- **主要檔案**：`desc-restyle/batches/{research,hooks,input,output}/w2-076-*`、`desc-restyle/batches/w2-076-kv.json`、`desc-restyle/progress.json`、`desc-restyle/REMOVE_LIST.json`、`dip-vinyl-shop/seed_cards.json`。
- **驗證結果**：`wrangler kv bulk put` 回報 `Success!`，`verify-kv.mjs w2-076` 為「驗 49 張｜一致 49｜不符 0」。

### 2026-08-07｜desc-restyle｜卡池簡介重塑 w2-075 上線（49 張）

- **改動摘要**：folk／world 家族第一批。研究層 5 組 Sonnet、hook 與寫作層各 2 組 Opus，機器 QA 後逐張人工審稿，49 張全部推上 Cloudflare KV。
- **開跑前移除三張確定重複卡**：`tinariwen|aman iman`（與同批 `aman iman: water is life` 同一張）、`can|ege bamyası`（與 w2-043 已上線的 `ege bamyasi` 同一張，僅土耳其文轉寫差異）、`glenn gould|the goldberg variations`（與 w2-017 已上線的 1955 年錄音同一份）。w2-076 降為 49 張、w2-079 降為 48 張。
- **研究層推翻主線 11 處**，三處是前提級：John Fahey《The Transfiguration of Blind Joe Death》不是 1959 年首張的重錄或續作、只沿用那個虛構藍調藝人的名字；Waylon Jennings《JD’s》正式標題是《Waylon at JD’s》而且不是現場專輯、是錄音室作品；Los Jaivas《Alturas de Macchu Picchu》錄音在巴黎 Pathé Marconi，馬丘比丘遺跡上的是 1981 年 9 月的現場演出與電視電影。
- **人工審稿修 16 處**，兩處是實質事實錯誤：Glen Campbell《Oh Happy Day》把〈Oh Happy Day〉寫成 Edwin Hawkins 創作（該曲是 18 世紀讚美詩，Hawkins 是改編）；Anne Briggs 那張把 CBS《The Time Has Come》與 1973 年被她自己攔下、二十多年後才問世的另一張混為一談。其餘含 Rita Coolidge《Anytime...Anywhere》年份、Gipsy Kings 的 1987 法國／1988 美國發行自相矛盾、Youssou N’Dour「十大專輯評選第 18 名」自相矛盾、三處校對痕跡、兩處 hook 三層同步（Waylon《Jewels》的張數、Eddie Palmieri 的「唯一一次」最高級）。
- **主要檔案**：`desc-restyle/batches/{research,hooks,input,output}/w2-075-*`、`desc-restyle/batches/w2-075-final.json`、`desc-restyle/batches/w2-075-kv.json`、`desc-restyle/progress.json`、`desc-restyle/REMOVE_LIST.json`、`desc-restyle/batches/wave2/w2-076-cards.json`、`desc-restyle/batches/wave2/w2-079-cards.json`。
- **驗證結果**：`wrangler kv bulk put` 回報 `Success!`，`verify-kv.mjs w2-075` 為「驗 49 張｜一致 49｜不符 0」。
- **工具環境變更**：`npx wrangler` 已失效（會去抓不存在的 4.120.0 tarball），改用 `dip-vinyl-worker/node_modules/.bin/wrangler`（3.114.17），該版不接受 `--remote` 參數。
### 2026-08-07｜desc-restyle w2-074 上線 50 張（072–074 三批完成）

- Repo：`dip-vinyl-shop` 僅本備忘錄；實際改動在 `desc-restyle` 工作區
- 改動：**w2-074 上線 50 張**（folk／country：Aldous Harding 4／Miranda Lambert 3／Tim McGraw 3／Alan Jackson 3／Kenny Rogers 3／Donovan 3 等），滿 50 張、無移除卡。**至此 072–074 三批共 148 張全數上線。**
- **跨三批的通論調度成功**：「American Primitive 吉他傳統與 John Fahey 系譜」從 w2-072 就先禁掉（Jack Rose）、w2-073 再禁一次（William Tyler、Ryley Walker），一路預留到 w2-074 的 Leo Kottke《6- and 12-String Guitar》才寫滿。「freak folk 與 New Weird America」同理，從 072 預留給 073 的 Devendra Banhart。
- 研究層推翻主線 9 處，其中四處是我方在特注裡寫死的假設：Aldous Harding **四張全部**都是 John Parish 製作（我以為三張）、《Train on the Island》**已於 2026 年 5 月發行**、Emmylou Harris 那張的和聲**含男歌手 Neil Young**（我寫成三位女歌手）、Donovan《7-Tease》的舞台演出**查無公演證據**（我寫成既成事實）。另抓到卡池年份錯誤一筆：Jewel《Pieces of You》1994 是簽約年、發行是 1995。
- 人工審稿修 4 處，兩處是硬條款違規：**Aldous Harding《Warm Chris》的 hook 直接寫了樂評平台名**（三層同步改寫）、**Donovan《7-Tease》把查證過程寫給讀者看**（校對痕跡）。
- Mount Eerie《A Crow Looked at Me》是本批克制要求最高的一張（整張寫伴侶因癌症過世），成稿只陳述確診年、辭世月與享年，不描述病程、不渲染、不引歌詞。
- 主要檔案：`desc-restyle/progress.json`、`desc-restyle/batches/`（w2-074 五層與 kv）
- 驗證：機器 QA 三關 0 標記、字數 207–240（均 230）；`wrangler kv bulk put` 回 Success!；`verify-kv.mjs` 逐字比對 **50/50 一致**。

### 2026-08-07｜desc-restyle w2-073 上線 50 張

- Repo：`dip-vinyl-shop`（seed_cards.json、本備忘錄）＋ `desc-restyle` 工作區
- 改動：**w2-073 上線 50 張**（folk 家族：Current 93 6／Gillian Welch 4／Shawn Mendes 4／Devendra Banhart 4／Carrie Underwood 3／Keith Urban 3 等），滿 50 張、無移除卡。
  - **卡池年份訂正兩筆**：`The Gloaming — The Gloaming` 2013 → 2014、`Jewel — Pieces of You` 1994 → 1995（1994 是簽約年）。
- 研究層推翻主線 5 處，其中兩處是我方憑印象寫進特注的細節：**The Tallest Man on Earth 查無任何來源指出是在「廚房」錄的**；**Current 93《Earth Covers Earth》的 United Dairies 不是 David Tibet 自營**，而是 Nurse With Wound 那兩人共創的廠牌。另抓到一處時序錯誤：**《At the Cut》不是 Vic Chesnutt 的遺作**，他在那之後、辭世前約兩個月還發過一張。
- **hook 層抓到研究稿自己打架的一處時序**：Keith Urban《Love, Pain & the Whole Crazy Thing》的 facts 同時寫著「發行 12 天後入住勒戒中心」與「10 月 19 日入住、11 月 7 日發行」——後者才對，是入住在先、專輯後發。已溯源更正。這是產線第一次由 hook 層攔下研究層的內部矛盾。
- 人工審稿修 2 處，其中一處是事實錯誤：Brandi Carlile 那張寫「**時任**美國總統歐巴馬把〈The Joke〉列進 2017 年年度愛歌」，但歐巴馬 2017 年 1 月已卸任，改為「前總統」。
- 主線另改寫 1 則 hook（三張卡的收尾都落在葛萊美座數，句式同構），並在寫作層開跑前先清掉研究稿裡兩處會外洩的內容（校對痕跡與樂器錯字）。
- 主要檔案：`dip-vinyl-shop/seed_cards.json`、`desc-restyle/progress.json`、`desc-restyle/batches/`（w2-073 五層與 kv）
- 驗證：機器 QA 三關 0 標記（唯一標記為已知良性誤報）、字數 194–241（均 232）；`wrangler kv bulk put` 回 Success!；`verify-kv.mjs` 逐字比對 **50/50 一致**。

### 2026-08-07｜desc-restyle w2-072 上線 48 張；寫作層新增拉丁專名上限

- Repo：`dip-vinyl-shop`（seed_cards.json、本備忘錄）＋ `desc-restyle` 工作區
- 改動：**w2-072 上線 48 張**（soul＋folk 交界批：孟菲斯與南方靈魂 11／Wilson Pickett 3／二〇〇〇年代原聲創作歌手 8／馬利音樂 4／實驗民謠 4／Faith Hill 4 等），滿 48 張、無移除卡。
  - **卡池年份訂正**：`The Gloaming — The Gloaming` 2013 → 2014（查證實際發行為 2014-01-20）。
- **產線改進**：寫作層新增硬條款「**拉丁專名每張壓到 4 個以內**」，已寫進 `desc-restyle/prompts/writer-base.md`。起因是本批 writer-1 初稿 24 張有 22 張超標、最高 346 字，根因是廠牌＋錄音室＋製作人＋樂手一次點滿。
- 研究層推翻主線 2 處：Jack Rose **不是只用某一種特殊吉他**（橫跨六弦、十二弦與 Weissenborn 膝上鋼棒吉他三種形制）；**《In the Heart of the Moon》不是 Ali Farka Touré 的遺作**（真正的最後錄音室作品是身後才發行的《Savane》），本張的正確寫法是他獲葛萊美隔月辭世、獎座未及送到手上。
- 人工審稿修 3 處，其中一處是校對痕跡：Manitoba 那張寫「並非敗訴被迫更名」，在否定讀者根本沒提出的說法，已改成正面表述；另一處是算術（葛萊美 2006、專輯 2008，相隔兩年而非三年）。
- 主要檔案：`dip-vinyl-shop/seed_cards.json`、`desc-restyle/prompts/writer-base.md`、`desc-restyle/progress.json`、`desc-restyle/batches/`（w2-072 五層與 kv）
- 驗證：機器 QA 三關 0 標記、字數 213–240（均 230）；`wrangler kv bulk put` 回 Success!；`verify-kv.mjs` 逐字比對 **48/48 一致**。

### 2026-08-07｜desc-restyle w2-071 上線 50 張（69–71 三批完成）

- Repo：`dip-vinyl-shop` 僅本備忘錄；實際改動在 `desc-restyle` 工作區
- 改動：**w2-071 上線 50 張**（費城國際唱片核心區塊＋Motown 靈魂：Spinners 3／Gladys Knight & The Pips 3／Smokey Robinson 3／Barry White 3／MISIA 3／Alicia Keys 3／Leon Bridges 3／Gil Scott-Heron 3／Harold Melvin 2／Temptations 2／Aretha Franklin 2／Parliament 2／Bootsy Collins 2 等），滿 50 張、無移除卡。**至此 069–071 三批共 150 張全數上線。**
- **PIR 通論的跨批調度**：費城國際唱片的創辦與 Gamble & Huff 起家這條，早在 w2-069 就先從 Teddy Pendergrass 那張禁掉、預留給本批的費城區塊，最後落在 Billy Paul《360 Degrees of Billy Paul》。
- **跨批藝人漏網一例**：The O'Jays 因預切時 068 的 key 用彎引號、071 用直引號而被正規化當成兩個藝人、拆到兩批。071 的《Ship Ahoy》已對 068 兩張加 w2-008《Back Stabbers》逐一寫排除，成稿零重疊。
- 研究層推翻主線 7 處，全是我方在特注裡寫死的假設：Jill Scott 新作**已於 2026 年 2 月發行**（非未發行卡）；Sister Sledge 那張的製作人是 **George Duke** 而非 Chic 兩人；Jordan Rakei《Cloak》的廠牌是**自營的 4101 Records**；Jorja Smith 的製作雙人組出身 **Walsall** 與曼徹斯特無關；Spinners《Love Trippin'》的翻唱組曲我指錯（那首在前一張）；Parliament 的 Dr. Funkenstein 是**本張才首度登場**的新角色；Leon Bridges《Leon》主題寫 Fort Worth 童年但**主體錄音在墨西哥城郊**。
- 人工審稿修 1 處：Alicia Keys《Santa Baby》的 hook 把 2012 到 2022 寫成「八年前」（實為十年），是 hook 層自己算錯，研究稿年份正確，已同步三層。
- **我方另一個錯已記錄**：派工詞把兩張的 key 描述成含彎引號，但卡單實際是半形 ASCII 撇號。hook 代理照「逐字複製」鐵則辦事並主動回報質疑，各層 key 與卡單 100% 一致。往後派工詞描述 key 字元前要先實際比對卡單。
- 主要檔案：`desc-restyle/progress.json`、`desc-restyle/batches/`（w2-071 研究／hooks／input／output／final／kv）
- 驗證：機器 QA 三關 0 標記（兩則已知誤報）、字數 203–240（均 229）；`wrangler kv bulk put` 回 Success!；`verify-kv.mjs` 逐字比對 **50/50 一致**。

### 2026-08-07｜desc-restyle w2-070 上線 50 張

- Repo：`dip-vinyl-shop` 僅本備忘錄；實際改動在 `desc-restyle` 工作區
- 改動：**w2-070 上線 50 張**（當代靈魂與流行：Ed Sheeran 5／India.Arie 4／Christina Aguilera 4／Sam Smith 4／Charles Bradley 3／Cleo Sol 3／Sault 3／Durand Jones & The Indications 3／Bruno Mars 3 等），滿 50 張、無移除卡。
- 研究層推翻主線 9 處，其中五處是我方假設錯誤：Bruno Mars《The Romantic》**已於 2026 年 2 月發行**（非未發行卡）；**Ed Sheeran 的數學符號系列只有五張，《Play》是另起爐灶的「播放器符號系列」首張**；Steve Lacy《Apollo XXI》**不是**那張用 iPhone 錄完的（那是他 2017 年的《Demo》EP）；**Cleo Sol 與 Sault 六張本身都沒有 Mercury Prize 或 Ivor Novello 紀錄**（那兩項分屬不在卡單內的《Untitled (Rise)》與《11》）；Georgia Anne Muldrow 兩張**都不是**她自營廠牌的作品，且《Zhigeist》實為與 Elzhi 的雙掛名。另查出 Christina Aguilera《AGUILERA》實為三張 EP 分批發行後彙整的**西語**專輯、廠牌是 Sony Music Latin 而非 RCA。
- 這批最吃力的限制是**「復古靈魂樂復興」通論已在 w2-069 給了 Sharon Jones**，而本批有八張落在同一個圈子（Charles Bradley 3、Lee Fields 2、Durand Jones 3），全部改走各自的專屬事件。
- 人稱處理：Sam Smith 於 2019 年公開表明為非二元性別、使用 they/them，中文無對應中性代名詞，四張一律以姓名或「這位歌手」帶過，成稿零性別代名詞。
- 人工審稿修 2 處，其中一處是人物關係的時序問題：Cleo Sol《Mother》把製作人 Inflo 寫成「丈夫」，但**無法確認 2021 年本作發行當時兩人是否已婚**（可得來源多為名人資料聚合站），改為時序上必然成立的「伴侶」，並同步 research／hooks／input／output 四層。
- 未發行卡一張：Sam Smith《Hazel Eyes》（官方訂 2026-08-21），依常設裁定保留、走保守 thin 版，發行後應重寫。
- 主要檔案：`desc-restyle/progress.json`、`desc-restyle/RUNBOOK.md`、`desc-restyle/batches/`（w2-070 研究／hooks／input／output／final／kv）
- 驗證：機器 QA 三關 0 標記、字數 178–240（均 225）；`wrangler kv bulk put` 回 Success!；`verify-kv.mjs` 逐字比對 **50/50 一致**。

### 2026-08-07｜desc-restyle w2-069 上線 50 張

- Repo：`dip-vinyl-shop` 僅本備忘錄；實際改動在 `desc-restyle` 工作區
- 改動：**w2-069 上線 50 張**（靈魂／R&B 跨四十年：Kool & The Gang 4／Sam Cooke 3／Patrick Cowley 3／Luther Vandross 3／Cameo 3／Tony! Toni! Toné! 3／千禧年前後靈魂樂六張等），滿 50 張、無移除卡。
- 研究層推翻主線 3 處：Johnny Gill《Provocative》不是首張個人專輯而是**第四張**；Corinne Bailey Rae **不是在唱片行或酒吧打工被發掘**（真正促成唱片約的是 2004 年與 Mark Hill 以化名 the stiX 合作的單曲）；Patrick Cowley《Menergy》的發行廠牌是 **Fusion Records**，不是他後來自創的 Megatone。另主動降級三則單一來源說法。
- 跨組處理：Raphael Saadiq 是 Tony! Toni! Toné! 的主唱兼貝斯手，個人專輯與團體三張分屬不同組，已互寫排除。
- 時序處理三組逝者與傷病：Teddy Pendergrass 1982 年車禍卡在兩張之間（前一張不寫、後一張標明相隔十六年）；Patrick Cowley 辭世前一個月發片；Sam Cooke 辭世二十一年後母帶才問世——三張都照寫但克制，無一以「他走之後」開場。
- 人工審稿修 3 處（gospedelic 的構詞說明錯誤、hook 用詞不通並同步三層、推論語氣贅詞）。
- **產線事故一次（已修並寫進 RUNBOOK）**：KV 上傳時把 `wrangler kv bulk put` 與 `verify-kv.mjs` 串在同一行、又用 `tail` 截斷輸出，導致沒看到 put 其實沒成功，verify 回報全批 50/50 不符。重跑 put 並親眼確認 `Success!` 後即 50/50 一致。往後 put 與 verify 一律分開兩次執行、輸出不可截斷。
- 主要檔案：`desc-restyle/RUNBOOK.md`、`desc-restyle/progress.json`、`desc-restyle/batches/`（w2-069 研究／hooks／input／output／final／kv）
- 驗證：機器 QA 三關 0 標記、字數 212–244（均 234）；`verify-kv.mjs` 逐字比對 **50/50 一致**。

### 2026-08-07｜卡池：Ahmad Jamal 自題作正式改為《Portfolio of Ahmad Jamal》

- Repo：`dip-vinyl-shop`（seed_cards.json、本備忘錄）＋ `desc-restyle` 工作區
- 改動：店主指定 Discogs master 214242，把卡池裡鎖不定版本的 `Ahmad Jamal — Ahmad Jamal` 正式改為 **`Ahmad Jamal — Portfolio of Ahmad Jamal`**。查證確認：1958 年 9 月 5、6 日錄於美國華盛頓特區的 Spotlite 俱樂部，三重奏為 Ahmad Jamal（鋼琴）、Israel Crosby（低音提琴）、Vernel Fournier（鼓），1959 年由 Argo 以壓凸對開封套的雙唱片形式發行，全碟十五首，含〈Autumn Leaves〉與他自己的〈Ahmad's Blues〉〈Serelitus〉。
  - 版本鎖定後，該卡**由 thin 升為 full 並整張重寫**（原本因為查不到是哪一版而只能寫成不指定年份廠牌的保守版本，222 字新稿改走「同一組三重奏同年稍晚換一間俱樂部再錄四面」的軸）。
  - 五層同步更新：`w2-067-cards.json`／research-b／hooks-b／writer-1／out-1，以及 `seed_cards.json`。
  - 明文禁寫項：唱片編號（Wikipedia 記 LPS-638、二手市場記 LP 2638，兩說並存）、Keith Jarrett 的背書（與 `At the Pershing` 舊卡的名人背書骨架同構）。
- 主要檔案：`dip-vinyl-shop/seed_cards.json`、`desc-restyle/RUNBOOK.md`、`desc-restyle/progress.json`、`desc-restyle/batches/`（w2-067 五層與 kv）
- 驗證：`wrangler kv bulk put` 回 Success!；`verify-kv.mjs` 重驗 w2-067 逐字比對 **48/48 一致**；舊鍵 `desc2:ahmad jamal|ahmad jamal` 已 bulk delete 並以 `wrangler kv key get` 驗到 **404**。RUNBOOK 的待裁定清單只剩 `nina simone|gifted & black`。

### 2026-08-07｜desc-restyle w2-068 上線 50 張；「來源平台不進正文」升為硬條款

- Repo：`dip-vinyl-shop`（本備忘錄）＋ `desc-restyle` 工作區
- 改動：
  - **w2-068 上線 50 張**（靈魂與放克：Funkadelic 6／Commodores 4／Otis Redding 3／Diana Ross 3／Ohio Players 3／Zapp 2／Cerrone 2 等），滿 50 張、無移除卡。
  - **規則升級**：「**來源平台與樂評姓名不進正文**」寫成硬條款加進 `desc-restyle/prompts/writer-base.md`。AllMusic、《滾石》、《Billboard》、DownBeat、樂評人姓名、星等與字母評分一律不寫；研究稿的 `src` 是給主線查核用的，不是給讀者看的。這條累犯到第五批（063、065、067 兩處、068 四處）才立成條款。
- 研究層推翻主線 6 處，並主動降級三則單一來源的說法（Commodores 團員因反對赴南非演出而退團、Berry Gordy 因 clavinet 彈法替〈Machine Gun〉命名、Shuggie Otis 錄《Freedom Flight》時 15 歲）。另查出 The O'Jays《Super Bad》不是獨立的錄音室企劃，而是同一批 H.B. Barnum 錄音在西德、英國、美國各以不同片名貼牌重發的其中一版，已比對卡池確認沒有同批錄音的重複卡。
- 人工審稿修 11 處，最重要的一處是地名誤譯：《Twer Nyame》把合作樂團 The Pelikans 寫成「開普敦十二人樂團」，但該團其實在**迦納的海岸角（Cape Coast）**，研究層把它誤譯成南非的開普敦（Cape Town），差了一個國家，已上網查證後溯源修正 research 與 input 兩層。另有一處時序錯誤：Tim Buckley《Sefronia》把 1974 年發行的《Look at the Fool》稱為「遺作」，但他 1975 年才辭世。
- 主線另手改 3 則 hook：兩則以「封面」開場與同批第三則撞頭，其中 Marcos Valle 那則的骨架還與他 w2-060 舊卡「封面上他沉在泳池水底」相同。
- 主要檔案：`desc-restyle/prompts/writer-base.md`、`desc-restyle/progress.json`、`desc-restyle/batches/`（w2-068 研究／hooks／input／output／final／kv）
- 驗證：機器 QA 三關 0 標記、字數 172–242（均 231）；`wrangler kv bulk put` 回 Success!；`verify-kv.mjs` 逐字比對 **50/50 一致**。

### 2026-08-07｜desc-restyle w2-067 上線 48 張

- Repo：`dip-vinyl-shop`（seed_cards.json、本備忘錄）＋ `desc-restyle` 工作區
- 改動：
  - **w2-067 上線 48 張**（爵士後段與靈魂前段的交界批：Monk 3／Wes Montgomery 3／Sérgio Mendes 3／Sonny Rollins 3／Donald Byrd 3／Chet Baker 3／Oscar Peterson 3／Isaac Hayes 4／Curtis Mayfield 6／Marvin Gaye 2 等）。原定 49 張，扣掉與 w2-066 一併移除的重複卡 `duke ellington|at newport` 後為 48 張。
  - **廠牌全程照現行裁定寫滿**（店主 2026-08-07 指正後的第一批）：Riverside 為留住 Milt Jackson 而答應他與 Wes Montgomery 合錄聯名專輯；Clef 與 Norgran 1957 年併入 Verve；波士頓 Transition Records 由非裔製作人 Tom Wilson 創立、兩年即倒閉、目錄轉賣 Blue Note 與 Delmark；Curtom 1968 年由 Mayfield 與經紀人 Eddie Thomas 合創、1980 年收攤；Sussex 1975 年因欠稅遭國稅局查封拍賣、母帶由 CBS 標下；Isaac Hayes 1976 年個人破產後才轉簽 Polydor。
  - **卡池年份訂正**：`Minnie Riperton — Come to My Garden` 由 1971 改為 1970（研究層以多方來源推翻卡池登錄值，1969 年 11 月錄音、1970 年由 GRT 發行，1974 年才有 Janus 重發版）。
- 研究層推翻主線 8 處，其中四處是掛名或身分錯誤：《In Orbit》正式掛名是《Clark Terry With Thelonious Monk》、Monk 只是客座；《Sonny Side Up》是 Gillespie／Stitt／Rollins 三人平權並列；《The Young Bloods》的聯名對象是 Phil Woods 而非 Gigi Gryce；《Born to Love》是 Peabo Bryson 與 Roberta Flack 的對等聯名。另推翻一則廣為流傳的說法：Marvin Gaye《Here, My Dear》並非「法官下令交出版稅」，而是雙方律師談成的贍養費抵付方案。
- 人工審稿修 11 處，最重要的一處是來源本身錯了：《Djangology》寫「Reinhardt 返回法國後不久驟逝」，但錄音在 1949 年、他 1953 年辭世，相隔約四年，已溯源修 research 與 input 兩層。另修兩處「來源平台與樂評姓名寫進正文」（《滾石》與 Robert Christgau 的評分、AllMusic 星等），比照 063／065 前例處理；兩處把 alto 寫成音譯「阿爾托薩克斯風」；一處把 1974 年的引用改編寫成「取樣」。
- 主要檔案：`dip-vinyl-shop/seed_cards.json`、`desc-restyle/progress.json`、`desc-restyle/batches/`（w2-067 研究／hooks／input／output／final／kv）、`desc-restyle/batches/wave2/w2-068-cards.json`
- 驗證：機器 QA 三關 0 標記、字數 144–240（均 226）；`wrangler kv bulk put` 回 Success!；`verify-kv.mjs` 逐字比對 **48/48 一致**。

### 2026-08-07｜desc-restyle w2-066 上線；店主指正廠牌歷史不得全面禁寫

- Repo：`dip-vinyl-shop`（seed_cards.json、本備忘錄）＋ `desc-restyle` 工作區
- 改動：
  - **w2-066 上線 48 張**（爵士與流行人聲）。原定 50 張，移除 2 張：`ornette coleman|free jazz` 與 w1-011 已上線的《Free Jazz: A Collective Improvisation》是同一張唱片（重複卡）；`freddie hubbard|minor mishap` 經研究層查出實為長號手 Willie Wilson 1961 年領銜的單一錄音，先後以《Groovy!》《Dedication!》《Minor Mishap》三度改名換領銜人發行，Hubbard 只是 23 歲的伴奏樂手，依常設裁定移除。
  - **店主指正**：本批首輪派工把舊批 note 的「跨批已用盡而本批全禁」清單照抄進特注，連 Blue Note 創辦史、Van Gelder 錄音室、Prestige／Impulse!／Atlantic／CTI 等**廠牌**條目一併禁掉，違反 2026-08-02 取消廠牌配額的裁定。店主明示「重要的廠牌歷史一樣要寫出來，不是全面禁止」。已另派補查代理把廠牌處境補回（12 張補到 8 張、13 條事實），並把防線寫進 `desc-restyle/RUNBOOK.md`：往後抄舊清單前必須先濾掉廠牌條目，仍有效的禁令只限樂種通論與故事骨架。
  - **補查層推翻的通說**：Blue Note 1965 年售予 Liberty、1967 年 Alfred Lion 退休、George Butler 要到 1972 年才接掌，因此《Green Is Beautiful》1970 年的放克轉向應歸因於 Grant Green 本人 1969 年復出後的方向，不是 Butler 主導；Prestige 1971 年售予 Fantasy，Dexter Gordon 的《The Tower of Power!》與《Generation》分屬交易前後。
  - **卡單補上卡池年份**：`seed_cards.json` 的年份先前沒被帶進研究層卡單，導致同名作只能標 uncertain（w2-067 的 Ahmad Jamal 自題作即是）。已把 `year` 欄補進全部 128 批預切卡單（6,326／6,363 張有值）。
  - **一併移除 w2-067 的重複卡** `duke ellington|at newport`（與 w2-006 的《Ellington at Newport》同一張）。seed_cards 7,534 → 7,531。
- 研究層推翻主線 12 處，人工審稿修 14 處，其中三處是來源本身錯了：《Dino Latino》引《The Silencers》為 1965 年電影（實為 1966 年 3 月上映）、Adele《19》的「17 歲」與「畢業後錄示範帶」互相矛盾（示範帶實為在學時的課堂作業）、Michael Bublé《It’s Time》的專輯序數算法有爭議。另有一處是寫作層為壓字數把《Green Is Beautiful》整條廠牌線刪掉，已補回。
- 主要檔案：`dip-vinyl-shop/seed_cards.json`、`desc-restyle/RUNBOOK.md`、`desc-restyle/progress.json`、`desc-restyle/REMOVE_LIST.json`、`desc-restyle/batches/`（w2-066 研究／hooks／input／output／final／kv）、`desc-restyle/batches/wave2/*-cards.json`
- 驗證：機器 QA 三關 0 標記、字數 132–240（均 225）；`wrangler kv bulk put` 回 Success!；`verify-kv.mjs` 逐字比對 **48/48 一致**；移除的三把 desc2: 鍵以 `wrangler kv key get` 驗到 **404**。

### 2026-08-02｜desc-restyle：店主裁定省流量優先於速度，hook 與寫作層回到各 2 組

- Repo：`dip-vinyl-shop` 僅本備忘錄；實際改動在 `desc-restyle/`（SKILL.md、RUNBOOK.md、progress.json）與長期記憶
- 起因：店主問「當初從五個寫作 agent 改成兩個是不是為了省流量」，並指示「速度沒關係，但流量一定要省」。
- **歷史核對（回答那個問題）**：08-01 RUNBOOK 把 **hook 5→2 確實是為省固定開銷**；寫作層當時本來就是 2 組。
  08-02 寫 skill 時把**寫作 2→5、hook 回到 5**，換的是速度（寫作段 16 分→7 分）與「a–e 對齊讓更正自動落位」——
  **那是用流量換速度**，方向與店主現在的優先序相反。
- **改動（現行預設）**：
  - **研究 5 組 Sonnet 不動**——不是為速度，是中斷保險：歷史七次中斷，中斷重跑燒掉的流量遠高於
    多養三個代理的固定開銷；研究層本來就是最貴的一層（WebSearch 結果吃 token），拆細是壓損失面。
  - **hook 2 組（a–c、d–e）、寫作 2 組（前半／後半）**，各 Opus。每省一個子代理省一份固定開銷
    （系統開場＋讀 base 檔＋派工詞＋完工回報＋回主線的通知），一批省 6 份。
  - **更正路由改用紀律換**：派工時每一條研究／hook 更正**逐 key 寫明屬於哪張卡**，
    不可只寫「c 組查出⋯」——那正是 054 那次錯置的根因，a–e 對齊當初就是為解它。
  - **機器 QA 與逐張審稿一項不減**（QA 是本機腳本、零流量）；`merge-writer-input.mjs --split=2` 為預設。
  - 接力模式照常（省的是等待、不是流量）；**全平行最傷流量**（多批全文壓主線上下文、每輪重送），非店主點名不用。
  - 5 組切法保留為**速度模式**，只在店主明講要趕時用。
- **估算**：063–065 實測代理端約 25k／張（hook 5＋寫作 5 配置）；回退後預估約 22k／張，**省一成多**。
  另附帶減少 6 則完工通知進主線上下文與 6 份派工詞輸出。
- **未採用的更激進選項**：hook 併入寫作層可再省一整層（每批約 300k），但會失去「寫作前攔掉 hook 前提錯誤」
  的閘門——歷史多次靠它在寫作前擋下（022 的 West Coast Jazz、060 的 Capra Black 型錯誤），
  錯誤流進成稿後的改寫成本更高。已在 SKILL 記明，店主若要再議。
- 主要檔案：`.claude/skills/dip-desc-restyle/SKILL.md`（含 frontmatter 描述、新增「省流量裁定」一節、
  hook／寫作層步驟與 QA 迴圈全面改寫、開工前補「掃舊批同藝人」步驟）、`desc-restyle/RUNBOOK.md`、
  `desc-restyle/progress.json`（notes 加一筆）、長期記憶 `feedback_token_economy_first.md`
- 驗證：16 處錨點替換全數命中；skill 描述與內文一致（hook 2、寫作 2）；QA 迴圈改為兩組。

### 2026-08-02｜desc-restyle：批次 065 共 49 張上線＋店主下了兩條卡池常設裁定（7,535 → 7,534）

- Repo：`desc-restyle`＋`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:`
- 改動：跑完 w2-065（jazz 家族第四批，UK 新一代爵士與當代人聲）。研究 5 組（Sonnet）＋補查 1 組、hook 5 組（Opus）、寫作 5 組（Opus），
  QA 三關 0 標記，字數 166–249（均 227），KV 逐字比對 **49/49 一致**。
  內容：Ezra Collective／Alfa Mist／Nubya Garcia 各三張、Makaya McCraven 四張、Cécile McLorin Salvant／Samara Joy／Laufey／Gregory Porter 各三張、
  Mammal Hands 與 Portico Quartet 各兩張、Charlie Parker 兩張。
- **店主兩條常設裁定（本次最重要的成果，往後不再逐次請示）**：
  1. **尚未發行的專輯卡 → 一律保留**，走保守寫法。
  2. **雜牌彙編／無歷史定位的選輯與重發 → 一律移除。**
  店主同時指示「不用再問我等我了」。規則已寫進三處：`desc-restyle/prompts/research-base.md`（研究層直接照辦）、
  `.claude/skills/dip-desc-restyle/SKILL.md` 的「卡池品質」一節、以及長期記憶。
  本批兩類各出現一次：**Ezra Collective《Here Because of Hope》**（第四張錄音室專輯、官方預定 2026 年 9 月、
  Bandcamp 與零售通路日期不一）以 thin 卡保守處理——正文明寫已宣布未上市、只用已公開資訊（廠牌、17 首、
  Letitia Wright 旁白、先行單曲）、**不寫死日期、不編造聲響與成績**；
  **Charlie Parker《The Happy "Bird"》**確認為雜牌彙編（1961／2009／2010 三次重發曲目互不相同）**予以移除**。
  同批另兩張 Parker 都有定位而保留：《Plays Cole Porter #5》收的是**他此生最後一次錄音（1954-12-10，三個月後辭世）**、
  《South of the Border》曲目可考自 1951 年《Fiesta》，是他與 Machito 樂團的 Afro-Cuban 合作。
- **本批的先例級發現：thin 判定過度保守，059 之後第二次發生。**
  研究層首輪 49 張標了 **21 張 thin**（歷史多在 4–14 張）。逐張核對事實字數後發現
  **14 張其實有 199–415 字的事實可寫，只因 `keyTracks` 留空就被降級**。
  處理：主線直接升級 13 張為 full（未發行那張維持 thin），另派一個補查代理處理真正不足的 7 張、**放寬到每張 3 次搜尋**，
  結果**7 張全部改判 full**。最終 48 full／1 thin。
  **這條已成常規：往後看到 thin 比例異常高，先核事實字數再決定，不要照收研究層的判定。**
- **研究層與補查層合計推翻主線 12 處**（本工程單批最高）：
  | 主線／首輪寫的 | 查證結果 |
  | --- | --- |
  | Mulgrew Miller《Grew's Tune》是 1985 年首張領銜作 | **是 2012 年他中風康復後與丹麥 Klüvers Big Band 的現場聯名錄音**，相差 27 年（真正首作是《Keys to the City》） |
  | 《Great Voices of Harlem》是 Gregory Porter 個人作 | **三人聯合掛名**（Porter、Donald Smith、Mansur Scott），卡池只掛 Porter |
  | Cory Wong《Meditations》是個人作 | **正式掛名是 Jon Batiste 與 Cory Wong 聯名** |
  | Ezra《Here Because of Hope》可能是 EP 或現場輯 | **是尚未發行的第四張錄音室專輯** |
  | Alfa Mist《Antiphon》是出道作 | **是第二張**（2015 年自家 Sekito 廠牌的《Nocturne》才是） |
  | Portico Quartet《Isla》入圍 Mercury | 入圍的是**前一張《Knee-Deep in the North Sea》** |
  | WONK 的 EPISTROPH 是自營廠牌 | **不是自營** |
  | Jacob Collier 的 Quincy Jones 是製作人 | **是賞識與提攜，非製作人** |
  | Salvant《Ghost Song》是概念專輯 | **她本人稱是日記式、刻意不定義概念** |
  | Cory Wong《Elevator Music》2023 年 | **2020-01-10**（2023 只是黑膠再版年） |
  | 《Louis and the Angels》收〈When the Saints Go Marching In〉 | **根本不在曲目裡**（首輪誤植，補查層抓到） |
  | Laufey《A Matter of Time》資料不足 | 補查找到主題、先行單曲與 **Billboard 200 生涯最佳第 4 名** |
- **c 組整份研究稿用半形標點**（82 個逗號、3 分號、6 冒號、32 括號），其他四組全是全形——
  主線只轉換緊貼中文的部分（Latin 標題內照原樣保留）後歸零。這是繼西里爾字母、簡體字之後的第三種字元污染型態。
- **人工審稿修 6 處**：《Louis and the Angels》把來源平台與樂評姓名寫進正文（比照 063 對 AllMusic 那次處理）；
  Peyroux《Half the Perfect World》的 **hook 立了「嗓音被拿去和 Billie Holiday 比」而正文從頭到尾沒回到**
  （補上那段復古爵士樂團巡演的來歷並重排時序）；Porter《Take Me to the Alley》的 hook 說「好萊塢與紐約的兩地錄音」
  但正文只寫時間沒對上地點；**WONK《Sphere》把四位日本樂手的名字寫成漢字**（違反音樂人名一律拉丁原文，
  063 的 Casiopea 已修過同型；本次改以編制表述，避開羅馬拼音誤植風險）；
  Parker《South of the Border》把樂器名寫成 alto 而非中音薩克斯風；Peyroux 那張補完後超標，重排修剪回區間。
- hook 層有 13 則 note 超過 350 字（a 組最長 510），比照 037 前例**未手修**——手改 13 則的成本高於多出來的 token，
  且 hook 的內容項與跨組掃描全數通過。
- 主要檔案：`desc-restyle/batches/w2-065-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-065*`、
  `desc-restyle/prompts/research-base.md`、`.claude/skills/dip-desc-restyle/SKILL.md`、`desc-restyle/REMOVE_LIST.json`、
  `desc-restyle/progress.json`、`dip-vinyl-shop/seed_cards.json`
- 驗證：`qa-batch.mjs` 三關 0 標記；`qa-check-research.mjs` 五檔各 0 標記；`fix-spacing` 待補 0 張；
  中文數字榜單名次、校對痕跡（含 064 新補的四組關鍵詞）、音譯人名、否定句式、評語式收語、榜名年代錯置、
  **Verve 時序陷阱**七項自訂掃描全數歸零；`wrangler kv bulk put` 回 `Success!`；
  `verify-kv.mjs` bulk-get 逐字比對 **49/49 一致**（含 5 個帶變音或彎引號的 key）。
- 後續：063–065 三批（146 張）已全數上線，卡池 7,534 張。066 卡單已預切完畢可直接開跑。

### 2026-08-02｜desc-restyle：批次 064 共 49 張上線＋移除 1 張精選輯（7,536 → 7,535）

- Repo：`desc-restyle`＋`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:`
- 改動：跑完 w2-064（jazz 家族第三批，當代與跨界爵士）。研究 5 組（Sonnet）、hook 5 組（Opus）、寫作 5 組（Opus），
  QA 三關 0 標記，字數 175–256（均 223），KV 逐字比對 **49/49 一致**。
  內容：Norah Jones 三張、Brad Mehldau 三張、Tigran Hamasyan 三張、Jamie Cullum 四張、Melody Gardot 三張、
  Esperanza Spalding 三張、GoGo Penguin 三張，以及**與 Shabaka Hutchings 有關的六張集中在同一組**
  （The Comet Is Coming 兩張、Sons of Kemet 三張、Shabaka and the Ancestors 一張）。
- **卡池：店主裁定「精選輯不留」，移除 Masayoshi Takanaka《All of Me》**（1979-06-21 日本 Kitty 唱片、編號 MKA 9005/6，
  彙整他在該廠牌時期分散的單曲 A/B 面與專輯曲目，非原創錄音室專輯）。
  **同藝人 1976 年個人首張《Seychelles》裁定保留**，已在本批上線。
  研究層原建議保留該精選輯（理由是「Kitty 為他推出的第一張精選輯」），主線判定歷史定位不足並提請裁示，店主裁定移除。
  移除流程同前例：備份 → 逐筆比對確認只動到那一筆、其餘 7,535 筆內容與順序完全相同 → `bulk delete` 回 `Success!` →
  **bulk get API 驗證**該鍵查無值、且《Seychelles》仍在。
- **一個新型態的校對痕跡外洩（本次最該記住的事）**：
  Avishai Cohen《From Darkness》把**身分鎖定的校對指示原樣寫進消費者看的正文**——
  「同名的小號手兼作曲家 Avishai Cohen 是另一個人，與這張無關」。
  這是 060／061 那個失敗模式的新變體：**特注要求「鎖定身分」，寫作層就把鎖定的過程寫出來**。
  既有的掃描關鍵詞（卡池／Discogs／Wikipedia／辨認／查無來源）**完全抓不到這種措辭**，
  已補上「**是另一個人／與這張無關／與本作無關／同名不同**」四組到 `chk-hook-crossgroup.mjs`。
  往後凡下「身分鎖定」類特注，都要同時寫明「正文只以查證後的身分敘述，不要交代另一位同名者的存在」。
- **研究層推翻主線 8 處**：
  | 主線寫的 | 查證結果 |
  | --- | --- |
  | GoGo Penguin 同名作在疫情期間完成 | **與疫情無關**——2019 年 9 月就錄完，只是 2020 年 6 月才發行；本作也沒有陣容變動（鼓手離團在 2021 年） |
  | 「戴耳機現場錄音」概念始於 Snarky Puppy《The World Is Getting Smaller》 | **始於更晚的《Tell Your Friends》**；廠牌也是 Sitmom 而非 Ropeadope |
  | Mehldau《Largo》用了鼓機 | 查無來源，改以合成器與客席樂手表述 |
  | Mehldau《Love Songs》可能是選輯 | **是與次女高音 Anne Sofie von Otter 的聯名雙碟企劃**，一半是卡內基音樂廳委託曲目，有定位 |
  | Vijay Iyer「在音樂認知領域取得學位」 | **耶魯數理雙主修 → 柏克萊物理博士班 → 自創 Technology and the Arts 學程 → 1998 年以具身認知論文取得博士** |
  | Johnny Smith 本作獲 Down Beat 年度唱片 | 得獎的是**1952 年那首單曲**，不是 1956 年這張 LP |
  | Cullum《Pointless Nostalgic》是自資發行 | **由獨立廠牌 Candid Records 發行**；真正自資自賣的是另一張不在本批的 1999 年作品 |
  | Spalding《Milton + Esperanza》與 Nascimento 的告別有關 | **不是告別作**——他 2022 年已展開告別巡演，這張合作反而讓他**延後退休** |
- **主線攔下的撞車**：三張二重奏卡（Vandermark／Iyer 與 Wadada Leo Smith／Gardot 與 Philippe Powell）
  一律不得以「二重奏」本身當軸；四張都能寫大牌客座名單的卡只留一張以客座為軸；
  「與某廠牌簽約的第一張」框架在研究稿出現超過五次，已對五組全下 hook 開場禁令。
- **人工審稿修 8 處**（除上述校對痕跡外）：Norah Jones《The Fall》把 hook 的答案再講一次（贅句）；
  Anita Baker 的葛萊美獎項語序；Sons of Kemet 那張的 New Orleans 未用中文譯名（同批其餘地名都是中文）；
  Vandermark 的 hook 說「台上重來一次」但現場碟其實是另一批即興；
  **GoGo Penguin《Fanfares》整篇被 Gondwana 廠牌創辦史吃掉、作品本身只剩一句**（補回錄音室與作品定位）——
  這是「廠牌配額取消」之後的新副作用，指派廠牌通論給某張卡時要順便確認那張卡自己的事實量夠不夠撐起主體；
  Avishai Cohen《Unity》的 Stretch Records 創立年與常見說法有出入（改為不指定年份）；
  Gardot《Entre eux deux》的「巴西的 Bill Evans」指代不明（父子分不清）。
- 主要檔案：`desc-restyle/batches/w2-064-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-064*`、
  `desc-restyle/chk-hook-crossgroup.mjs`（補關鍵詞）、`desc-restyle/HELD_W2-064-NONALBUMS.json`、
  `desc-restyle/REMOVE_LIST.json`、`desc-restyle/progress.json`、`dip-vinyl-shop/seed_cards.json`
- 驗證：`qa-batch.mjs` 三關 0 標記；`qa-check-research.mjs` 五檔各 0 標記；`fix-spacing` 待補 0 張；
  中文數字榜單名次命中 1 處經核對為序數誤報；校對痕跡（含新補四組關鍵詞）、音譯人名、否定句式、
  評語式收語、榜名年代錯置五項掃描皆歸零；`wrangler kv bulk put` 回 `Success!`；
  `verify-kv.mjs` bulk-get 逐字比對 **49/49 一致**。
- 後續：065 研究層五組已回齊，待跑 QA 與派 hook 層。**065 已有三件要裁示**（見下批紀錄）。

### 2026-08-02｜desc-restyle：批次 063 共 48 張上線＋卡池再移除 2 張（7,538 → 7,536）

- Repo：`desc-restyle`＋`dip-vinyl-shop`（`seed_cards.json` 與本備忘錄）；內容改動在 Worker KV 的 `desc2:`
- 改動：跑完 w2-063（jazz 家族第二批）。研究 5 組（Sonnet）、hook 5 組（Opus）、寫作 5 組（Opus），
  QA 三關 0 標記，字數 180–241（均 230），KV 逐字比對 **48/48 一致**。
  內容：爵士吉他（Tal Farlow／Charlie Christian／Rosenwinkel／Scofield）、Wayne Shorter 三張、
  young lions（Wynton 兩張、Joshua Redman 兩張、Roy Hargrove 兩張）、jazz-rap 與 drum and bass、
  Casiopea 四張、new jack swing 與 R&B 五張、Diana Krall 三張。
- **本次最有價值的發現：「同藝人跨批 0 組」只保證在新配置的 062–128 之間，054–061 與更早的舊批不算。**
  BATCH_PLAN 那次重切只處理了尚未執行的批次，**已上線的舊批不在對照範圍內**。
  實際掃出 **18 位藝人在舊批已有卡**，而且不是零星幾張：

  | 藝人 | 舊卡 | 063 新卡 |
  | --- | --- | --- |
  | Wayne Shorter | 6 張（006／055×4／060） | 3 張 |
  | Janet Jackson | 7 張（007／008×2／019／021／027／036） | 1 張 |
  | Robert Glasper | 4 張 | 1 張 |
  | Horace Silver、Pat Metheny、Dizzy、Abdullah Ibrahim、Jaco、William Parker、Troop、Ginuwine、Al B. Sure! | 各 1–2 張 | 各 1–3 張 |

  已寫腳本把每張舊卡的**開場句**抓出來、逐張寫成排除清單放進特注（例如 Janet 那張把七條舊軸逐條列禁、
  Glasper 禁四條舊軸、Shorter 禁 Blue Note 時期通論與 Weather Report）。**這一步已寫進 progress note，往後每批開工都要做。**
- **另一件要改的事：重複卡掃描腳本原本是壞的。** `seed_cards.json` 是**陣列的陣列**（`[artist, album, …]`）不是物件，
  第一版腳本用 `c.artist`／`c.album` 比對，等於比對 undefined、必然回報 0 對。改用索引重跑後：
  147 張目標卡對全池 7,536 張，**同名配對 16 組、逐組確認全是同名不同作**（Shorter／Sun Ra 的《Atlantis》、
  Norah Jones／Grimes／Sun Ra 的《Visions》、Cory Wong／Coltrane 的《Meditations》、
  BADBADNOTGOOD／Sebadoh／Crystal Castles 的《III》等），**疑似同一張唱片 0 組**。
  順帶確認《The Cats》正式掛名雖是 Flanagan／Coltrane／Burrell／Sulieman 四人，但卡池只有 Burrell 這一張，不是重複卡。
- **研究層推翻主線 6 處**：Wayne Shorter《Odyssey of Iska》的 **Iska 是他女兒的名字、不是「風」**（發行年也從 1970 更正為 1971）；
  Jaco《Stuttgart Aria》**1986 年錄音當年就發行、屬生前發行**，不是身後檔案盤（我的分軸假設作廢）；
  《Etcetera》「借來 Coltrane 班底」的說法不成立（實際是 Hancock／McBee／Chambers）；
  William Parker《Some Order, Long Understood》**實為 Wayne Horvitz／Butch Morris／Parker 三人平權掛名**；
  Casiopea《Dramatic》**是 1993 年、廠牌正是 Alfa**（我原以為是 2000 年後之作，整個分軸設計作廢）；
  Roy Hargrove《Earfood》**不是他最後一張錄音室專輯**（2009《Emergence》才是）→ 辭世一律不寫。
  另打假一處：The Bad Plus 翻唱的是 Aphex Twin，不是 Squarepusher。
- **主線攔下三處代理看不到的撞車**：①「把真人樂手請進錄音室」原有三張（Guru／Adam F／Blowout Comb），
  通論留給 Guru，Adam F 改走 MOBO Award、Blowout Comb 改走政治轉向與商業腰斬；
  ②「回歸某廠牌」原有兩張（Casiopea 回 Alfa／Horace Silver 重返 Columbia），後者改走大編制銅管；
  ③Kenny Garrett《Black Hope》的「離開 Miles 後的首張」正是已用盡的骨架，改走陣容與製作人。
  另外「⋯⋯之後的首張」這個框架研究稿出現五次，已對五組全下 hook 開場禁令。
- **人工審稿修 12 處**，其中兩處是機器完全驗不出的事實錯誤：
  1. **Joshua Redman 的時序**：研究稿寫「1991 年 11 月遷居紐約、五個月後奪 Monk 大賽冠軍」，
     但查證確認**他 1991 年就拿下該屆冠軍**（1991 年 11 月於華盛頓特區舉行）——11 月是**大賽日期、不是搬家日期**。
  2. **《Bird and Diz》的廠牌時序倒置**：研究稿寫「Verve 旗下的 Clef Records」，
     但 **Clef 早於 Verve**（Verve 要到 1956 年才創立），1952 年不可能是 Verve 旗下。改為「Norman Granz 的 Clef Records」。
  其餘十處：Tal Farlow 那張把「自學」寫成「唯一受過的正式訓練」（邏輯自相矛盾）；
  Blue Matter 把廠牌 Gramavision 當成錄音室；同一座葛萊美在 1.9 與 2.1 出現兩種譯名；
  Timeless Tales 的 hook 提了 Gershwin 而正文從沒回到（hook 前提沒收尾）；
  Blowout Comb 的「五巴仙教」非台灣用語；Parallel Universe 重述 hook 並把 AllMusic 與樂評姓名寫進正文；
  Casiopea《Dramatic》正文把「回到 Alfa」講了兩次；Janet 那張把 Michael Jackson 寫成「傑克森」中譯又重述 hook；
  new jack swing 大小寫兩種寫法；**兩張把 1990 年代前期的榜單寫成 1999 年才改名的「R&B/Hip-Hop 榜」**（榜名年代錯置，059 以來第三次）。
- **卡池：店主裁定移除 2 張、保留 1 張**（研究層列為建議移除的三張）：
  | 卡 | 裁定 | 依據 |
  | --- | --- | --- |
  | Joshua Redman《The Essence of Joshua Redman》 | **移除** | Wikipedia 正式專輯列表、AllMusic 完整 discography、RateYourMusic 三處皆查無；「The Essence of X」是九〇年代預算精選的命名套路 |
  | Dizzy Gillespie《Dizzy Gillespie》 | **移除** | 拼盤重發，至少兩種版本內容互不相同，無法鎖定對應版本 |
  | Jaco Pastorius《Golden Roads》 | **保留**（店主：故事很好聽） | 1986-10-11 錄於紐約 Skyline Studios，原是一部**從未完成的同名電影**的配樂，全碟單一長軌 30 分 35 秒，1997 年才由日本 Sound Hills 發行 |
  移除流程照 08-01／08-02 前例：備份 → **逐筆比對確認只動到那兩筆、其餘 7,536 筆內容與順序完全相同** →
  `wrangler kv bulk delete` 回 `Success!` → **驗證走 bulk get API**（`/album-desc` 會觸發重新生成回寫，絕不可用）→ 兩鍵確認查無值。
  《Golden Roads》由主線補寫 thin 卡（183 字），軸走「一部沒拍完的電影」，與《Etcetera》的擱置軸刻意錯開；
  同廠牌另一張身後盤的授權爭議與本作無直接關係，未寫入。
- 主要檔案：`desc-restyle/batches/w2-063-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-063*`、
  `desc-restyle/chk-hook-crossgroup.mjs`（新增，跨組 hook 撞頭與同構關鍵詞掃描）、
  `desc-restyle/HELD_W2-063-NONALBUMS.json`（新增）、`desc-restyle/REMOVE_LIST.json`、
  `desc-restyle/progress.json`、`dip-vinyl-shop/seed_cards.json`
- 驗證：`qa-batch.mjs` 三關 0 標記；`qa-check-research.mjs` 五檔各 0 標記（更正來源後已同步 research／hooks／input 三層，
  否則會被誤標編造——Clef 那處就先被標了一次）；`fix-spacing` 待補 0 張；中文數字榜單名次、校對痕跡、
  音譯人名、否定句式外洩、評語式收語五項自訂掃描皆歸零；`wrangler kv bulk put` 回 `Success!`；
  `verify-kv.mjs` bulk-get 逐字比對 **48/48 一致**（含帶 `..` 的兩個 key，該類 key 用 `wrangler kv key get` 會被 403 擋下）。
- 後續：064 已進寫作層、065 卡單待派研究層。**064 另有一張待裁示**：
  Masayoshi Takanaka《All of Me》查證為 1979 年 Kitty 唱片的精選輯，研究層建議保留（該廠牌為他推出的第一張精選輯），
  但主線判定歷史定位不足（所收曲目原本並非只存在於單曲、全張只查得兩筆事實、沒有可寫的故事），已先抽出，
  紀錄在 `HELD_W2-064-NONALBUMS.json`，064 暫以 49 張執行。

### 2026-08-02｜卡池清理：移除 8 張重複卡與 1 張無定位選輯（7,547 → 7,538）
- Repo：`dip-vinyl-shop`（`seed_cards.json`）＋ Worker KV（已上線者同步刪 `desc2:` 鍵）；`desc-restyle` 同步卡單與規則
- **店主裁定**：重複卡移除；選輯若沒有歷史定位一併移除。
- **第一類：同一張唱片有兩張卡（不同藝人掛名），移除 8 張**
  保留原則是**留掛名與唱片實際版面一致的那張**（合輯掛名 vs 個人掛名，留合輯）。
  | 移除 | 保留 |
  | --- | --- |
  | Jim Hall｜Undercurrent | Bill Evans & Jim Hall｜Undercurrent（055 已上線） |
  | Elis Regina｜Elis & Tom | Elis Regina & Antônio Carlos Jobim｜Elis & Tom（060 已上線） |
  | The Fugees｜The Score（**010 已上線，KV 已刪**） | Fugees｜The Score（021 已上線） |
  | Floating Points｜Promises | Floating Points, Pharoah Sanders & The London Symphony Orchestra｜Promises（006 已上線） |
  | Ali Farka Touré｜In the Heart of the Moon | Ali Farka Touré & Toumani Diabaté｜同名作 |
  | Toumani Diabaté｜In the Heart of the Moon | 同上（**這張唱片原本有三張卡**） |
  | Donny Hathaway｜Roberta Flack & Donny Hathaway | Roberta Flack & Donny Hathaway｜同名作 |
  | Jorge Ben Jor｜Samba esquema novo | Jorge Ben｜Samba Esquema Novo（1963 原作掛名為 Jorge Ben） |
- **第二類：無歷史定位的選輯，移除 1 張**
  Mahalia Jackson｜Mahalia Jackson（1971）——查證為精選輯／重發，**查無曲目與原作來源**，
  Columbia 該年的原創專輯目錄裡也沒有這張。**062 已上線，KV 已刪。**
- **關於選輯的重要發現：靠標題掃全池沒有意義。**
  全池標題含 Gold／Hits／Anthology／Best of／Complete 等字樣的只有 16 張，逐張看過後**真正的選輯只有 2 張候選，而且都判定保留**——
  Keith Jarrett《At the Blue Note: The Complete Recordings》是特定駐演的完整存檔盒裝、
  The Clean《Anthology》是該團散落 EP 與單曲唯一的權威彙整，兩者都有歷史定位。
  其餘 14 張全是誤報（Gold Cobra、Stay Gold、Solid Gold、Love Over Gold、New Gold Dream、End Hits 都是正規專輯）。
  **反過來，被移除的那張標題就叫《Mahalia Jackson》，從標題完全看不出是選輯——是研究層查證才發現的。**
  **結論：這類卡只能在研究階段逐張確認，不能靠標題批次偵測。** 規則已寫進 `prompts/research-base.md`：
  查到非原創錄音室專輯就在 notes 標明性質、判斷有無歷史定位、沒有的列為「建議移除」由主線彙整給店主；
  同一張唱片有兩張卡也一併要求研究層回報。`SKILL.md` 另新增「卡池品質：兩類要主動回報給店主的卡」一節與移除流程。
- **執行與驗證**：
  - 先備份 `seed_cards.json` 與 `apex_pool.json`；9 張全部命中 seed、apex 無。
  - 移除後**逐筆比對**：消失的正好是那 9 筆，其餘 7,538 筆內容與順序**完全相同**。
  - 已上線的 2 張（The Fugees｜The Score、Mahalia Jackson 同名作）以 `wrangler kv bulk delete` 刪鍵，回 `Success!`；
    **驗證走 bulk get API**（依既有陷阱紀錄，`/album-desc` 會觸發重新生成並回寫，絕不可用來驗刪除）：
    兩個鍵確認已刪、保留的 `fugees|the score` 確認仍在。
  - 同步清掉 6 份預切卡單裡的 7 張（另 2 張先前已擱置不在卡單內），並把 062 的 research／hooks／input／output 一併移除該卡，
    重跑 `build-final` 後 `verify-kv` 回報 **47/47 一致**。
  - `BATCH_PLAN.md` 的張數表與 `progress.json` 的 `batchPlan` 已更新：卡單總數 3,329 → 3,320。
- 主要檔案：`dip-vinyl-shop/seed_cards.json`、`desc-restyle/REMOVE_LIST.json`（新增）、`desc-restyle/BATCH_PLAN.md`、`desc-restyle/prompts/research-base.md`、`.claude/skills/dip-desc-restyle/SKILL.md`、六份預切卡單
- 後續：卡池 7,538 張；`seed_cards.backup-before-dedupe.json` 與 `apex_pool.backup-before-dedupe.json` 為本次備份，確認無誤後可刪。

### 2026-08-02｜desc-restyle：批次 062 共 48 張上線（新批次配置的第一批實跑）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：跑完 w2-062，這是前一筆紀錄那份 67 批新配置的**第一批實跑**。研究 5 組（Sonnet）、hook 5 組（Opus）、寫作 5 組（Opus），QA 三關 0 標記，字數 148–240（均 227），KV 逐字比對 48/48 一致。內容：巴西 MPB 與 Tropicália、Afrobeat 與衣索比亞爵士、靈性爵士與 Sun Ra、Weather Report 與 Cannonball。
- **原定 50 張，抽出 2 張後以 48 張執行**——見下方「卡池重複卡」。
- **新配置的效益已可量測**：
  - Fela×4、Caetano×4、Gil×3、Tom Zé×3、Chico×3、Weather Report×3、Cannonball×3 全部落在**同一組**，分軸只需組內處理，**不必再寫跨組排除條款**（舊配置下這些會散在十幾批）。
  - **五組寫手全部一次到位、零初稿超標**，與 060／061「初稿全數超標再回頭壓」形成對比。推測原因是同藝人集中後，寫手不必為跨組排除而額外交代背景。
  - 工具沒寫死 50 已獲驗證：`merge-writer-input.mjs` 依研究層實際張數對齊，48 張順利切成 10/10/9/9/10。
- **但預先分批解決不了跨批同構**：Braxton《In the Tradition》查出「原定樂手 Dexter Gordon 缺席、臨時由他頂替」，與**前一天才上線的 061《Heavy Sounds》**（Larry Coryell 缺席、剩下兩人索性一起掛名）**完全同骨架**。兩張卡本來就不該在同一批，只有人眼比對得出來。已下禁令改軸到「寫圖形記譜的人這回規矩吹標準曲」的反差上。
- **新查出的卡池問題：同一張專輯有兩張卡（不同藝人掛名）**。把預切卡單並排掃描後，全池找到 **8 對**：
  | 專輯 | 兩張卡 | 狀態 |
  | --- | --- | --- |
  | 《Undercurrent》 | Bill Evans & Jim Hall (055) ／ Jim Hall (062) | 055 已上線，062 這張**已擱置** |
  | 《Elis & Tom》 | Elis Regina & Antônio Carlos Jobim (060) ／ Elis Regina (062) | 060 已上線，062 這張**已擱置** |
  | 《The Score》 | The Fugees (010) ／ Fugees (021) | **兩張都已上線** |
  | 《Promises》 | Floating Points, Pharoah Sanders & LSO (006) ／ Floating Points (125) | 006 已上線 |
  | 《In the Heart of the Moon》 | 合輯掛名＋兩位個人掛名 (072) | **一張唱片三張卡**，未上線 |
  | 《Roberta Flack & Donny Hathaway》 | 合輯掛名 ／ Donny Hathaway (067) | 未上線 |
  | 《Samba Esquema Novo》 | Jorge Ben ／ Jorge Ben Jor (075) | 未上線 |
  擱置紀錄寫在 `desc-restyle/HELD_DUPLICATES.json`。**建議從卡池移除重複的那一張而不是寫兩份簡介，待店主裁示。**
  另有兩件是誤報、不需處理：Wayne Shorter《Atlantis》與 Sun Ra《Atlantis》、Kurt Rosenwinkel 與 People Under the Stairs 的《The Next Step》，都只是同名不同作。
- **另一件待裁示**：Mahalia Jackson《Mahalia Jackson》(1971) 查證為**精選輯／重發而非原創專輯**，依卡池收錄標準可能該移除；本批先以 thin 卡並在正文寫明選輯性質保守處理。
- **研究層推翻主線 18 處**，版本鎖定佔 7 處（這批巴西作品同名專輯特別多）：Gil《Gilberto Gil》(1968) 慣稱《Frevo Rasgado》**且與同年集體合輯《Tropicália》是兩張不同作品**；Tom Zé 首作**官方標題就是同名**、「Grande Liquidação」只是坊間通稱；Chico Buarque《en español》**既非原創也非選輯**而是舊作以西語重錄；Azymuth《Azimüth》**帶變音**、1977 年起才改拼作 Azymuth。推翻我的假設 5 處：**Art Blakey《Child's Dance》沒有 Cedar Walton**（他在同期《Anthenagin》）、**Charles Lloyd《Soundtrack》的貝斯手是 Ron McClure 不是 Cecil McBee**、**Elis Regina《Poema de amor》是第二張不是首張且刻意迴避 bossa nova**、Cannonball《Sharpshooters》非「解散前後」而是數月後為了結合約重聚、Fela 改名晚於《Gentleman》兩年故不寫。另打假三處來源：Terry Callier 卡的收購方是 **GRT 不是 GRP**（GRP 1978 年才成立）、David Byrne 發掘 Tom Zé 的年份採 **1989** 而非自相矛盾的 1998、**Tom Zé《Todos os Olhos》封面那顆「眼睛」依攝影師本人說法是模特兒嘴唇夾著玻璃珠**（坊間版本只是傳說）。
- **人工審稿修十一處**，其中三處是新失敗模式的延伸：
  1. **Jim Hall 那張的 hook 直接寫著「資料庫至今記著兩個年份」**——這是校對註記不是文案，連 hook 重寫。**新增的掃描關鍵詞當場抓到。**
  2. **Mahalia Jackson 選輯那張把「Discogs 的分類欄」「Wikipedia 的目錄」當證據寫進正文**——逐張讀才發現，掃描關鍵詞漏了。
  3. **Chico Buarque《Chico Buarque》寫「這張靠年份與〈Cálice〉辨認」**——同樣是版本鎖定指示外洩。
  **掃描關鍵詞已補：Discogs／Wikipedia／分類欄／目錄裡／辨認。**
  其餘八處：Funmilayo Ransome-Kuti 在 1977 年突襲時是 **76 歲不是 77**（1900 年 10 月生）；EWF 卡的「Top Soul Albums」「Hot Soul Songs」是**現代回溯標籤**、1973 年當時不這樣叫，比照 059 處理 Hot 100 的做法改用中文榜名；同批內 Africa 70／Afrika 70 拼法不一；「約魯巴高麗樂」會被讀成韓國音樂、改用 highlife 原文；引號『』改為全池慣例的「」；koto 寫成「古箏」改為日本箏；曲名大小寫與專輯名不一致。
- **同批內同名不同人的陷阱又出現一次**：兩張卡各自出現「Sandra Smith」——Fela 卡指的是引介他接觸黑權運動的黑豹黨成員，McCoy Tyner《Asante》指的是以 Songai 為藝名的歌手，兩者無關。已改用唱片實際掛的藝名迴避。
- 主要檔案：`desc-restyle/batches/w2-062-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-062*`、`desc-restyle/HELD_DUPLICATES.json`（新增）、`desc-restyle/progress.json`
- 驗證：`qa-batch.mjs` 三關 0 標記；`qa-check-research.mjs` 五檔各 0 標記（改動後已同步 research／hooks／input 三層，否則會被誤標編造）；`fix-spacing` 補 1 張後歸零；中文數字掃描命中 13 處經逐一核對**全為序數**；音樂人名中文音譯 0 處；校對痕跡掃描歸零；`wrangler kv bulk put` 回 `Success!`；`verify-kv.mjs` bulk-get 逐字比對 **48/48 一致**（含帶 `..` 的 key `jim hall|... where would i be?`，該 key 用 `wrangler kv key get` 會被 403 擋下，只能走 bulk get）。
- 後續：063 卡單已預切完畢（50 張，jazz 家族第二批），可直接開跑。

### 2026-08-02｜desc-restyle：一次規劃完剩餘 67 批的配置（w2-062–128，3,329 張）
- Repo：`desc-restyle`（新增 `BATCH_PLAN.md` 與 67 份預切卡單）；`dip-vinyl-shop` 僅更新本備忘錄
- 起因：店主指出連續幾批都遇到**相關專輯被拆到不同批**（Eddie Henderson 跨 059／060、Hampton Hawes 跨 060／061），要求先把批次分配好、之後再依配置執行。
- **根因不是邊界沒對齊，而是排序來源本身**：`restyle-tasks.json` 的尾段不是精選排序。剩餘 3,329 張其實分成三段——
  A 段（原順序 0–1125）相鄰同藝人密度每百張 14.5、已分群；**B 段（1125–2600，約 30 批）只有每百張 0.2，等同隨機**；C 段（2600–3329）每百張 23.3、已分群。
  B 段每張卡的藝人、曲風、年代都不相干，**且含大量 A 段藝人的其他專輯**。照原順序切下去，874 組多卡藝人會有 **713 組（82%）被拆散**，其中 351 組跨區段。
  最極端的例子：`makaya mccraven` 的四張會落在 w2-062、095、103 三批。
- **另查出工具的檢查範圍比想像窄**：`build-next-batches.mjs` 的跨批警告**只比對「本批最後一張」與「下批第一張」的藝人字串**。非相鄰的拆散一概看不到——Hampton Hawes 跨 060／061 那次就完全沒警告，是靠平行模式下把兩批卡單並排讀才發現的。
- **重切規則**（已寫進 `BATCH_PLAN.md`）：
  1. **同一藝人的卡絕不跨批**，正規化處理 the／big／little／dr／brother 前綴與 trio／quartet／orchestra 等團名後綴（這正是先前 Big John Patton／John Patton、Gary Bartz NTU Troop／Gary Bartz、Gene Harris／The Three Sounds 沒被工具抓到的原因）。
  2. **合作掛名與其成員收攏同批**（union-find，13 組）：Roberta Flack、Donny Hathaway 與兩人合輯同批；Rubén Blades、Willie Colón 與合輯同批；另有 Ali Farka Touré／Toumani Diabaté、Pete Rock、Kool G Rap、Timbaland、Alva Noto、Kode9、Sérgio Mendes、Ravi Shankar、Chaka Khan、Lee Fields、Davy Graham。
  3. **人工裁定的兩對**：`jorge ben` 與 `jorge ben jor` 是**同一人**（1989 年改名）已合併；`sunny day real estate` 與 `real estate` 是**不同樂團**、`belle and sebastian` 與 `sebastian` 無關，明文禁止合併。**這正是 059 那次 Lonnie Smith／Lonnie Liston Smith 陷阱的同型，這回改成在規劃階段先攔下。**
  4. 家族內先按年代（十年為單位）再按原精選錨點排序，兼顧主題收斂與保留 A／C 段既有順序；家族內嚴格裝箱，家族尾巴不足者與下一家族合成交界批。
- **結果**：67 批、3,329 張，**64 批剛好 50 張**（其餘 w2-077 為 45、w2-112 為 43、w2-128 為 41），**跨批藝人 0 組**（原 713 組），**61／67 為單一曲風家族**。
  家族區間：jazz 062–067、soul 068–071、folk 072–075、world 076–077、classical 078、rock/pop 079–100、hiphop 101–112、electronic 113–127、混合 128。
- **確認工具不寫死 50**：`merge-writer-input.mjs` 是讀研究層各組的實際張數來對齊 a–e，因此 45／43／41 張的批可照常跑五組，不需改工具。
- **執行時的兩項注意**：①`venetian snares×13`（w2-121）與 `vladislav delay×12`（w2-122）會**跨子組但不跨批**，派工時要在跨子組的特注互寫排除條款；②同家族連號是刻意的，rock/pop 連 22 批、electronic 連 15 批，**應在開跑該家族前一次盤點通論帳本**，而不是逐批發現撞車。
- 主要檔案：`desc-restyle/BATCH_PLAN.md`（新增）、`desc-restyle/batches/wave2/w2-062~128-cards.json`（67 份新卡單）、`desc-restyle/progress.json`（新增 `batchPlan` 欄）
- 驗證：67 份卡單逐檔重讀比對——卡片總數 3,329、**重複 key 0**、與可分池總數相符；正規化後**跨批藝人 0 組**；正規化未誤併（唯一合併多種原始字串的組是 `sun ra`／`the sun ra arkestra`，確為同一人；`mix`＝Little Mix、`brother`＝Little Brother 皆為單一藝人被剝掉 little 前綴）。
- 後續：**執行時直接讀預切卡單，不要再跑 `build-next-batches.mjs`**（該工具現已回報可分池 0 張）。卡池日後若新增專輯，新卡不在這 67 批內、需另行分批。


### 2026-08-02｜desc-restyle：批次 061 共 50 張上線（平行模式收官，060／061 合計 100 張）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：跑完 w2-061 一批 50 張，**與 060 平行跑三層、但依護欄分批審稿上線**（060 先收尾，061 稿件擱置至 060 上線後才開審）。研究 5 組（Sonnet）、hook 5 組（Opus）、寫作 5 組（Opus，a–e 對齊），QA 0 標記，字數 174–245（均 230），KV 逐字比對 50/50 一致。內容：巴西吉他與豎琴十張、大編制與跨界十張、底特律 Tribe 與黑人自營廠牌十張、Blue Note 六〇年代與鼓手十張、五〇年代硬咆勃十張。
  - **人工審稿修十處，其中一處又是 hook 前提整個錯掉**：
    1. **Luiz Bonfá《Solo in Rio 1959》**——原 hook 寫「母帶在庫房躺了四十多年，2005 年才第一次公開發行」，查證後**這批 1959 年錄音當年就以《O Violão de Luiz Bonfá》之名發行過**。真正的故事是母帶險些散失、1990 年隨 Emory Cook 把整間唱片公司捐給 Smithsonian 才重見天日、2005 年的 CD 依原順序重現舊作並補上未發表曲目。連 hook 重寫並同步 research／hooks／input 三層。
    2. **Dorothy Ashby《Afro-Harping》**——hook 以「她在婚宴上一場場推翻它」立軸，正文卻從頭到尾沒回到婚宴，懸念沒收尾。事實表本就有「靠免費演出與婚宴、舞會場合逐漸說服懷疑者」，已補回。
    3. **Art Taylor《A.T.'s Delight》**——「〈Move〉一曲裡他與 Taylor、Kelly 交鋒」的「他」指涉斷裂（前句連續出現三個人名），且該交鋒說法不在事實表內，整句移除。
    4. **Philly Joe Jones《Blues for Dracula》**——「他拿湯還沒凝固前得趕快喝這類台詞開玩笑」句子破碎不可讀（原始素材是吸血鬼口白裡「趁還沒凝固前把湯喝了」的玩笑），改寫。
    5. David Axelrod《Songs of Experience》的收語「後來成為經典」屬評語式收尾，改為事實。
    6. 《Rubaiyat》同一張卡內世紀寫法不一致（hook 十一世紀／正文 11 至 12 世紀），統一為中文數字。
    7–10. **四處校對用的編輯註記漏進正文**（見下）。
  - **與 060 同型的失敗模式再次出現**：特注寫「不得寫成 X」時，寫作層把否定句本身寫進了消費者看的正文——「而非同一份母帶的重發」「專輯名的語源沒有一手來源可查⋯坊間流傳的其他說法都無從查證」「所謂聽來不像同一支樂團，指的正是⋯」「兩個數字在不同來源間並存」。**兩批合計 10 處**。已確認往後特注一律改寫成「正文只寫查證後的正確版本，不要交代卡池標錯這件事」。
  - **研究層推翻主線 14 處**：Charles Tolliver《The Ringer》是 **1969 年錄於倫敦、英國 Polydor 發行，與 Strata-East 無關**（他兩年後才共同創立該廠牌）；The Lightmen 的廠牌**不是 Judnell** 而是 Bubbha Thomas 自營的 Bubbha's Lightnin'；Marcus Belgrave《Gemini II》採信 Tribe 而非網路孤說的 Gem Eye；**Baden Powell《Os Afro-Sambas》卡池標的 1991 不是重發、而是他本人 1990 年獨力重錄的版本**（重錄時原版合作者 Vinicius de Moraes 已辭世十年）；Cal Tjader《Amazonas》的三人角色必須拆開（監製 Airto Moreira／編曲 George Duke／客席鍵盤 Egberto Gismonti）。
    - **兩處直接推翻主線的假設**：①**Serge Chaloff《Blue Serge》不是他生前最後的錄音**（真正的最後一次是隔年與 Zoot Sims 等人的《Four Brothers…Together Again》）——我原本要拿「最後錄音」當軸線；②**Doug Watkins 與 Paul Chambers 並非血親**，只是同鄉至交，表兄弟之說是長年誤傳。
    - **一處誤植攔截**：Jack Wilson《Something Personal》的嘻哈取樣說法，實際指的是**另一位同名的風琴手 Reuben Wilson**（而他正是 059 的卡），已整條捨棄。
    - **一處跨卡時序證實**：〈The Moontrane〉是 Woody Shaw 二十歲寫給 Coltrane 的舊作、**1965 年先被 Larry Young 錄進《Unity》**，九年後 Shaw 才接回自己名下當標題——該時序獨佔於《The Moontrane》，《Unity》只留單句。
  - **組內同構預先拆開**：e 組同時有三位長號手與三位貝斯手領銜，兩個框架（「長號跟上咆勃的難題」「貝斯手當上領班」）各自只准一張或整組禁用；d 組五張鼓手領銜，「鼓手終於當領班」整組禁用。成稿逐張比對無撞車。
- 主要檔案：`desc-restyle/batches/w2-061-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-061*`、`desc-restyle/progress.json`
- 驗證：`qa-batch.mjs` 三關全數 0 標記；`qa-check-research.mjs` 五檔各 0 標記；`fix-spacing` 待補 0 張；中文數字掃描命中 12 處經逐一核對**全為序數**（第九屆、第二張專輯、第四號發行、第二群樂團、第一卷）非榜單名次；音樂人名中文音譯掃描 0 處；`wrangler kv bulk put` 回 `Success!`；`verify-kv.mjs` bulk-get 逐字比對 **w2-061 50/50、w2-060 復驗 50/50 一致**。
- 後續：尚未分池者 3,329 張。

### 2026-08-02｜desc-restyle：批次 060 共 50 張上線（首次採用「平行」模式，060／061 同時跑）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：跑完 w2-060 一批 50 張。**店主指定平行模式**（skill 新增的節奏參數，N≤3 才接受），060 與 061 兩批的研究→hook→寫作全部同時跑完（共 30 個代理），**但逐張審稿與上線嚴格照護欄一次只做一批**：本筆只涵蓋 060，061 稿件完成待審。研究 5 組（Sonnet）、hook 5 組（Opus）、**寫作 5 組（Opus，skill 新制的 a–e 對齊）**，QA 0 標記，字數 165–242（均 226），KV 逐字比對 50/50 一致。內容：靈性爵士與 Strata-East 十張、Blue Note jazz-funk 與 Black Jazz 十張、爵士鋼琴十張、巴西二十張。
  - **人工審稿修十三處，其中一處是 hook 前提整個錯掉**：
    1. **Billy Harper《Capra Black》**——原 hook 建立在「上半張 Capra 是器樂、下半張 Black 交給人聲」這個分面上，查證後**根本沒有這種分面**；人聲是**四人不是五重唱**、Gene McDaniels 只是四位之一**並非領軍**、且人聲**只出現在〈Soulfully, I Love You / Black Spiritual of Love〉一曲**而非正文寫的〈Cry of Hunger〉。整張連 hook 重寫，改以查實的「三位鼓手分曲輪坐」立軸，並同步改 research／hooks／input 三層。
    2. **Bayete《Worlds Around the Sun》**——原 hook 是「Down Beat 年終榜第 1、Miles Davis《On the Corner》屈居第 2」，該說法**唯一來源是再發行廠牌 Jazz Dispensary 的自家宣傳頁**，獨立搜尋無法佐證。這種等級的最高級宣稱不足以當 hook，整條移除並改軸；順帶修掉「多年之後被 Santana 翻唱」（實際僅隔約一年）。
    3. **Pharoah Sanders《Elevation》**——正文寫「英國爵士藍調專輯榜第 13 名、Billboard 當代爵士專輯榜第 14 名」，兩個榜名**都晚於本作 1974 年才創設**（Top Contemporary Jazz Albums 為 1987 年）。這與 Hot 100 那類錯置同型，整段移除改用查實的四次錄音日期。
    4. **Ronnie Foster《Two Headed Freap》**——正文寫他在 Grant Green《Alive!》彈風琴「被共同創辦人 Francis Wolff 記住」，但 **Wolff 於 1971 年 3 月辭世、本作 1972 年 1 月才錄音**，且該歸因超出研究稿。已移除（同時解掉與 Duke Pearson 卡重複使用 Wolff 當情節的問題）。
    5. Gene Russell 卡把 Stevie Wonder 音譯成「史提夫汪達」，違反「音樂人名一律拉丁原文」，已同步改三層。
    6. Wayne Shorter《Native Dancer》的「巴西籍妻子 Ana Maria」國籍查無來源，移除國籍。
    7. Hermeto Pascoal 卡把豬叫聲說成「唱片裡巴西原住民色彩最濃的一段」，兩者無關且無來源，改寫。
    8. Mtume 卡的「斯瓦希里語」與全池慣例（史瓦希里語）不一致，統一。
    9–13. **五處校對用的編輯註記漏進正文**（見下）。
  - **本輪最值得記下的新失敗模式：特注的否定句會被寫進消費者看的正文。** 我在特注寫「以查證年為準、不得寫成 1974 年」這類指令，寫作層照辦之餘，把**那句否定句本身**也寫進了 desc——例如「年份有出入：卡池標為 1974 年，兩個獨立來源則一致標為 1972 年，此處以查證到的 1972 年為準」「卡池標的 1962 年查無來源支撐」「兩者是完全不同的樂團與作品，僅標題巧合相同」「並不是這次錄音促成的」「而不是兩段長篇」。**這是校對痕跡，不是商品文案。** 往後特注一律改寫成「正文只寫查證後的正確版本，不要交代卡池標錯這件事」。
  - **研究層推翻主線 17 處**，其中版本／年份鎖定錯誤佔 8 處：Gismonti《Água e Vinho》是 **1972 年 EMI/Odeon 而非 ECM、且非獨奏**（與同組另一張 1978 年 ECM 作品極易誤置）；João Gilberto 同名作是 **1961 年**（六個來源一致，查無卡池標的 1962 年）；Dom Um Romão 為 1972 年；Gene Harris《Astral Signal》1974 錄／1975 發；Tete Montoliu 1971 錄／1974 發；Tommy Flanagan **1957 年錄於斯德哥爾摩**（1958 是 Prestige 重發年）。廠牌歸屬錯誤：**Bayete 是 Prestige 不是 Black Jazz**。人物關係：**Jimmy Heath 是 Mtume 的生父不是兄弟**；Airto 與 Flora Purim 1967 年就結婚、早於本作六年。**兩處直接否決主線的分軸設計**：Kenny Drew《Everything I Love》是**全獨奏、無伴奏樂手**（我特注問的 NHOP 根本沒參與）、Julian Priester《Love, Love》是**五段組曲而非兩段長篇**。另攔下一個常見誤傳：**《Clube da Esquina》封面那兩個男孩不是 Milton 與 Lô Borges 的童年照**，是攝影師 Cafi 拍的路人男孩，四十週年才尋回身分。
  - **主線修掉代理看不到的同構三處**：Mtume／Bill Evans／Andrew Hill 三張都是「錄完擱置多年才發行」（保留給塵封三十四年的 Andrew Hill，另兩張改軸）；Stanley Cowell 與 Gene Russell 兩張都是「廠牌共同創辦人把自己的鋼琴唱片放進自家目錄」（保留給 BJ-1 的 Gene Russell）。
  - **Hampton Hawes 的時序是本批最漂亮的一條**：錄音 1958 年 3 月 → 逮捕 1958 年 11 月（他 30 歲生日當天）→ 判十年 → **1961 年 8 月唱片發行時他仍在服刑中**（與「發行代表某階段完結」的直覺相反）→ 1963 年 8 月獲甘迺迪特赦。他在 061 另有一張《All Night Session!》，兩批已切開：060 拿入獄與特赦、061 拿通宵錄音。
  - **字數陷阱在本批再次實測**：巴西與靈性爵士的拉丁人名密度極高，五組寫手中有三組回報初稿全數超標（最高 333 字），一致指出「實際字元數比直覺高出約 60 字」。
- 主要檔案：`desc-restyle/batches/w2-060-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-060*`、`desc-restyle/progress.json`
- 驗證：`qa-batch.mjs` 三關全數 0 標記；`qa-check-research.mjs` 五檔僅 1 個已知誤報（`1948`——輸入層寫 `1947–48`，寫作層展開為「1947 至 1948 年」，屬正確展開）；`fix-spacing` 補 1 張後歸零；中文數字掃描命中 16 處經逐一核對**全為序數**（第三張個人作、第二首、第一位歐洲音樂家）非榜單名次；音樂人名中文音譯掃描修正 1 處後歸零；葡萄牙文變音（ã õ é ê ç í）在 10 個 key 與正文中全數保留；`wrangler kv bulk put` 回 `Success!`；`verify-kv.mjs` bulk-get 逐字比對 **50/50 一致**。
- 後續：061 已完成研究、hook 與寫作三層，**待逐張審稿後上線**；尚未分池者 3,379 張。

### 2026-08-02｜產線提速：寫作層 2 組 → 5 組並依 a–e 對齊；同時修好兩個會安靜漏驗的下游腳本
- Repo：`desc-restyle`（三支腳本＋三份 prompts）、工作區 skill；`dip-vinyl-shop` 僅更新本備忘錄
- 起因：店主反映單批太久，另一個 session 提出三刀改法（寫作層切五組、樣板搬進 base 檔、跨批用接力模式）。
- **方向採納，但那份提案不完整——只改 `merge-writer-input.mjs` 會出大事**：
  - **`qa-batch.mjs` 的 out 階段寫死 `for (const n of ['1','2'])`**。切成五組後 out-1／out-2 仍然存在，
    連「缺輸出檔」的警告都不會觸發，**它會安靜地只驗 20 張、另外 30 張完全沒過 QA**。
  - **`build-final.mjs` 只讀 out-1 與 out-2**，且**根本沒有卡單比對**（RUNBOOK 一直宣稱它有，
    這是既有的文件與程式落差），等於拿 20 張去建 final 與 KV 檔然後推上線。
  - 兩者都不會報錯。這正是本專案最怕的失敗型態：機器 QA 通過、內容卻是缺的。
- **三支腳本一起改成不綁組數**：
  - `merge-writer-input.mjs`：預設依 a–e 五組切檔（每組張數取自對應的 research 檔），`--split=2` 退回舊行為；
    切檔前先清掉舊的 `writer-*.json`，避免改變組數後殘留檔案被下游誤讀；並加了累計長度與合併總數的一致性檢查。
  - `qa-batch.mjs`：動態掃出所有 `out-N`，並新增**輸出總張數對卡單**的檢查（`out 合計 N 張，與卡單相符 ✓`）
    ——這是擋住「只驗到部分組別」的最後防線。
  - `build-final.mjs`：動態掃出所有 `out-N`，並**補上先前缺少的卡單逐字比對**（少一張或多一張就中止）。
- **回歸測試**（在已上線的 w2-058／059 上做，不動內容）：`build-final` 重建 058 的 KV 檔後對線上
  `verify-kv` 仍 **50/50 一致**；五組切檔驗證 `writer-3` 的 key 序列與 `research/w2-058-c.json` 逐字相同、
  `writer-5` 對 e 組亦同；`--split=2` 還原後 input／output 配對完好。**新腳本對舊的兩組批次向後相容**
  （059 以兩組跑完，新版 `qa-batch` 自動偵測到兩組並回報總數 50 相符）。三支腳本 `node --check` 均通過。
- **第二刀（樣板搬進 base 檔）**：查證後發現重複樣板有一半本來就在 base 檔裡，真正每批重打的是三段，已搬入
  ——廠牌規則（2026-08-02 新裁定）寫進 research／hook／writer 三份 base；**方法論**（特注是指派不是事實、
  請查證、明確回報推翻主線之處）與 **AI 生成百科站需交叉驗證**寫進 research-base。
  skill 新增「派工詞怎麼寫」一節，列出哪些已在 base 檔、派工詞只保留四樣（卡單／特注／上層更正／輸出路徑），
  並註明**規則變更要改 base 檔而非派工詞**，避免兩邊打架。
- **第三刀（接力模式）**：見下方前一筆紀錄，已實作。
- **生效範圍**：059 是在改動前以舊的兩組跑完並上線的，**新的五組切檔自 060 起生效**。
- 主要檔案：`desc-restyle/merge-writer-input.mjs`、`qa-batch.mjs`、`build-final.mjs`、
  `prompts/{research,hook,writer}-base.md`、`dip-vinyl-home/.claude/skills/dip-desc-restyle/SKILL.md`
- **教訓**：外部提出的改動即使方向正確，也要**自己把下游相依掃過一遍**再套用。
  這次若照單全收，060 之後每批都會有 30 張未經 QA 就上線，而且不會有任何錯誤訊息。

### 2026-08-02｜desc-restyle：批次 059 共 50 張上線（靈魂爵士／風琴爵士／jazz-funk／靈性爵士）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：跑完 w2-059 一批 50 張。研究 5 組（Sonnet）＋補查 1 組、hook 5 組（Opus）、寫作 2 組（Opus），QA 0 標記，字數 207–240（均 234），KV 逐字比對 50/50 一致。內容：硬咆勃與 Blue Note 靈魂爵士十張、Hammond 風琴爵士十張、jazz-funk 與 CTI 十張、Prestige 靈魂爵士與現場實錄十張、靈性爵士與黑人意識十張。
  - **研究層推翻主線 17 處**，其中五處是主線的假設整個落空：
    1. **《Person to Person》查無 Etta Jones 參與**——她本來是主線設計的軸線，查得的完整陣容裡沒有她；且兩人**多數資料稱從未正式結婚**（人稱「Aunt Etta and Uncle Person」），只能寫長期音樂搭檔。
    2. **《Afro-Disiac》鼓手是 Bernard Purdie**，不是主線問的 Idris Muhammad。
    3. **〈Blues Walk〉是 Lou Donaldson 自己的原創**，與 Clifford Brown 1955 年的〈The Blues Walk〉同名異曲，不是翻奏；且 **Ray Barretto 的康加鼓編制早一年在《Swing and Soul》就存在**，本作是延續而非開創。
    4. **〈Mercy, Mercy, Mercy〉屬 1966 年錄製的另一張專輯**，與《Country Preacher》無關。
    5. **Doug Carn《Infant Eyes》的歌詞 credit 是 Doug 為主要執筆者**，Jean Carn 的角色是演唱而非填詞——直接推翻主線特注的預設方向。
    其餘包括：Chick Corea 在《The Thing to Do》**不是**錄音室首度亮相、且不可寫成「原班節奏組」（只有三人承襲自解散的 Horace Silver 五重奏）；Ramsey Lewis《The In Crowd》發行當下廠牌是 **Argo**，同年 10 月才因商標爭議改名 Cadet；Charles Earland 在 Jimmy McGriff 團吹的是**次中音**而非低音薩克斯風；《Alive!》有**兩位風琴手同台**（Ronnie Foster 與 Neal Creque）且顫音琴手拼法為 **Willie Bivens**；《Alligator Bogaloo》「最暢銷」說法查無實據已捨棄，改用查實的 Top LP's 第 141 名。
  - **兩組身分查證定案**：「Big John Patton」與「John Patton」是同一人；**「Lonnie Smith」（風琴手）與「Lonnie Liston Smith」（鋼琴手）是不同的兩個人**——而且風琴手在名字前加「Dr.」正是為了避免這個混淆，這條查證本身成了該卡的主故事。
  - **補查代理推翻了首輪研究的否定結論**：Reuben Wilson 的職業拳擊背景首輪判「查無來源」，補查在 WRTI／NPR 訃聞找到佐證（打過 12 場職業賽、當過 Floyd Patterson 陪練），成了該卡最好的 hook；同時修正「自學成才」的絕對化說法（他曾向 Richard「Groove」Holmes 學藝）。
  - **人工審稿修六處，其中一處是 hook 前提整個錯掉**：
    1. **Kenny Dorham《Afro-Cuban》**——研究稿寫「1957 年再補三首擴為 12 吋」，查證後**兩場錄音都在 1955 年（1 月 30 日、3 月 29 日）**，1957 年 5 月底只是把兩場素材重編成 12 吋 BLP 1535 發行，**沒有任何 1957 年的新錄音**。hook 原本就寫「橫跨 1955 與 1957 兩次錄音」，前提整個錯，連 hook 一併重寫，並同步改研究／hooks／input 三層。
    2. **Baby Face Willette《Face to Face》**——研究稿寫 Grant Green「五天前（1 月 25 日）」錄完《Grant's First Stand》，實際該作錄於 **1961 年 1 月 28 日**，與本作的 1 月 30 日**相隔兩天**。
    3. Eddie Harris 那張 1961 年金唱片單曲的句子主詞與賓語不對應（「他⋯⋯成為⋯⋯單曲」），改寫。
    4. Charles Kynard 同一句裡把 Kansas City 寫成「堪薩斯城」與「堪薩斯市」兩種譯法，統一為堪薩斯城。
    5. 《Back at the Chicken Shack》把來源的「首度受矚目的錄音**之一**」寫成無條件斷言，補回限定。
    6. The Awakening 的「硬式爵士」非樂種名，改為硬式咆勃。
  - **主線修掉四處代理看不到的撞車**（代理只保證組內互異）：兩張卡都以 Newark 夜店開場（Melvin Sparks 與 Grant Green《Alive!》，兩處 Newark 都屬實，改掉前者）、**三張卡都是「前一種身分→改彈風琴」的同骨架**（John Patton、Willette、Reuben Wilson，改掉一張）、兩組前兩字撞頭。
  - **新增一條可沿用的判斷：「每張都對、整批讀起來全一樣」的重複只有主線看得到。** 研究稿裡 **19 張都寫了 Van Gelder 錄音室**、**Creed Taylor 掛名 6 張**、**Bob Porter 掛名 5 張**——每一條都正確且有來源，機器 QA 全數放行。已全批禁寫 Van Gelder（沒有一張的主故事依賴那個地點），並把兩位製作人各收斂成獨佔兩張（Creed Taylor 留 Kudu 創辦與 CTI 美學兩處、Bob Porter 留生產線通論與「簽下的第一位藝人」兩處）。
  - **工具的同藝人偵測有兩個盲點**，派工前必須人工再掃一次：①**藝人字串不同的同一人不會被警告**（Big John Patton／John Patton、Gary Bartz NTU Troop／Gary Bartz）；②**反向陷阱**——看起來像同藝人多卡、實際是不同人（Lonnie Smith／Lonnie Liston Smith），這種要主動寫進特注做身分鎖定。
  - **研究層的 thin 判定會過度保守**：首輪 9 張標 thin，逐張看過後有 6 張其實事實量足夠（只是 keyTracks 留空），僅 3 張真正不足，另派補查代理處理，最終 50 張全部 full。**往後收到 thin 不要照單全收，先看 facts 數量與內容。**
  - **內容過濾器**：hook a 組中斷一次，但**輸出檔 10 張完整存活**、key 逐字對齊、字數合格，僅最終回報被切，比照 049-d 前例獨立驗證後未重跑。再次印證「每組寫完立刻存檔、不整批重寫」這條紀律。
- 主要檔案：`desc-restyle/batches/w2-059-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-059*`、`desc-restyle/progress.json`
- 驗證：`qa-batch.mjs` 三關全數 0 標記；`qa-check-research.mjs` 兩檔標記 0 與 1（唯一標記 `DJ Jimmy Gray` 為已知誤報型——研究稿寫「地方 DJ／音樂推廣人 Jimmy Gray」，工具把「DJ Jimmy Gray」當成一個專名）；`fix-spacing` 待補 0 張；中文數字榜單名次掃描命中 14 處經逐一核對**全為序數**（第八張、第二軌、第一位）非榜單名次，音樂人名中文音譯掃描 3 處經核對為古典作曲家（史特勞斯）、地名（華盛頓特區）與政治人物（傑西·傑克森）皆合規；中間點字元確認為 U+00B7、與既有 58 個 final 檔一致；`wrangler kv bulk put` 回 `Success!`；`verify-kv.mjs` bulk-get 逐字比對 **50/50 一致**。
- 後續：尚未分池者 3,429 張。**Eddie Henderson 跨 059／060 邊界**——059 的《Realization》(1973) 已禁寫 1974 年以後與 Blue Note 時期，留給 060 的《Sunburst》(1975)；060 另有 Billy Harper、Egberto Gismonti、Azymuth、Marcos Valle、João Gilberto 各兩張需分軸。

### 2026-08-02｜`dip-desc-restyle` skill 新增第二個參數：批次節奏（序列／接力／全平行）
- Repo：工作區 `dip-vinyl-home/.claude/skills/dip-desc-restyle/SKILL.md`（該層非 git repo）；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：店主要求能指定多批同時跑。**這與他先前「一批走完全程再開下一批」的裁定直接衝突**，
  故做成**要明講才啟用、預設仍是序列**，並把代價寫在參數表旁邊讓他當下能判斷。
- 三種模式：
  - **序列（預設）**：一批完整走完七步、上線收尾才開下一批。即 2026-08-02 的原始裁定。
  - **接力（建議的平行法）**：A 批進 hook 層時就開 B 批的研究層；審稿與上線仍嚴格照批次順序、一次只做一批。
  - **全平行**：N 批的研究→hook→寫作全部同時跑完，最後才逐批審稿上線；**只在 N ≤ 3 時接受**。
- **寫進 skill 的代價說明（重點）**：
  - **代理階段平行沒有壞處**——子代理各有自己的上下文，平行不會讓主線變貴。
    **真正的成本在主線的逐張審稿**：每批 50 張全文約 1.2 萬字，序列模式下審完上線就不再重送，
    全平行則三批全文同時壓在上下文裡、後面每輪都要重送。這正是店主當初禁止平行的理由。
  - **跨批更正會來不及傳遞**：序列模式下 A 批審稿查出的錯能即時寫進 B 批特注；平行模式下 B 批
    可能早已派工完畢，只能事後改稿或重推 KV。**援引 054／055 的實例**（兩張都宣稱疊錄「首度」，
    是在 055 審稿時才發現、回頭改了已上線的 054）作為警示。
  - 接力模式的折衷點寫明：**B 批的特注只能吃 A 批研究層與 hook 層的回報，不能吃 A 批的審稿結果**。
- **硬性護欄（不論哪種模式）**：逐張審稿一次只做一批且做完就上線收尾、上線順序照批次號、
  子代理不超過 20（接力最多兩批在飛）、跨批的通論分配與同藝人排除條款必須在派工前一次規劃好全部 N 批。
- 同步修掉開頭與「派工方式」表格中與新模式牴觸的舊句（原本寫死「A 走完全程上線後才開 B」）。
- 主要檔案：`dip-vinyl-home/.claude/skills/dip-desc-restyle/SKILL.md`（200 → 238 行）
- 驗證：grep 逐處確認三種模式的敘述前後一致、無殘留的絕對禁令句。

### 2026-08-02｜`dip-desc-restyle` skill 補上派工方式（層內平行、層間等齊）
- Repo：工作區 `dip-vinyl-home/.claude/skills/dip-desc-restyle/SKILL.md`（該層非 git repo）；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：**店主指出 skill 只寫「5 組」卻沒寫「怎麼派」**——這是實作漏洞。本次對話全程都是
  **同一則訊息裡一次派出五個代理**（多個 Agent 工具呼叫並排、背景執行），但 skill 沒寫，
  新對話照著跑很可能一個一個派，慢上數倍且毫無好處（同層代理彼此不需要對方的產出）。
- 新增「派工方式（**最容易做錯的地方**）」一節，並用表格把三種節奏講清楚，避免與既有規則混淆：
  - **同一層的 5 個（或 2 個）代理 → 一次全部派出、平行跑。**
  - **研究層 → hook 層 → 寫作層 → 等齊再進下一層**（hook 的特注要帶入研究層回報的更正；
    merge 前要先查完 hook 的跨組撞頭）。
  - **批次 A → 批次 B → A 走完全程上線後才開 B**（這是店主先前的裁定，與層內平行是兩回事）。
  - 註明子代理上限 20、一批用 5＋5＋2＝12 個，額度充裕。
- 三層的小標題各補一句「一則訊息一次派出五個／兩個」與「等上一層全部回來才動」，避免只看步驟不看總則的人漏掉。
- 主要檔案：`dip-vinyl-home/.claude/skills/dip-desc-restyle/SKILL.md`（178 → 200 行）
- 驗證：三處小標題與新增章節已逐一 grep 確認落地。
  （過程註記：一度想用 `python` heredoc 批次改三處，但本機 `python` 是 WindowsApps 的殼、**靜默不執行**，
  改用 Edit 工具逐處修改。往後這台機器不要用 python 做檔案批改。）

### 2026-08-02｜取消開工前的協作交接檢查（店主已不在 codex 跑本專案）
- Repo：`dip-vinyl-shop`、`dip-vinyl-worker`（各自的 `CLAUDE.md`）；工作區根目錄 `CLAUDE.md` 與 `dip-desc-restyle` skill
- 改動：店主表示已不再於 codex 並行跑本專案，要求移除該規定以省額度。原本每次開工要對每個 repo 跑
  `git fetch origin`、`git status --short`、`git log --oneline HEAD..origin/main`、`git diff --name-status HEAD..origin/main`
  四道指令（兩個 repo 就是八次工具呼叫），**已全部取消**。
- **保留的兩道最低限度**（已向店主說明並標示，可再砍）：
  - **提交前** `git status --short`——這是防止把工作區既有的無關變更掃進 commit 的唯一防線；本專案長期存在
    `data/apple-audio-map-*.json` 等 untracked 檔，先前正是靠這道檢查才沒被誤提交。
  - **push 前** `git fetch origin` 並確認 `HEAD..origin/main` 為空——避免遠端已有新提交而被拒或造成分歧。
- 同步更新處：`dip-vinyl-home/CLAUDE.md`、`dip-vinyl-shop/CLAUDE.md`、`dip-vinyl-worker/CLAUDE.md` 三處的
  「開工前協作交接檢查（必做）」章節改寫為「Git 檢查（2026-08-02 精簡）」；`dip-desc-restyle` skill 的
  開工前第 4 步改為「不需要跑 git 檢查」，收尾步驟改為提交前 status、push 前 fetch。
- **未改動**：三個 `AGENTS.md`（那是 codex 自己讀的檔案，Claude 不會載入，留著不佔額度；日後若恢復協作可直接沿用）。
- 另清理兩則已失效的長期記憶：刪除「並行 agent 協調」，並改寫「開工前先讀備忘錄」的理由——
  讀 `PROJECT_MEMORY.md` 的必要性從「查 codex 改了什麼」改為「承接自己過去的決策」，該習慣本身保留。
- 主要檔案：`dip-vinyl-shop/CLAUDE.md`、`dip-vinyl-worker/CLAUDE.md`、`dip-vinyl-home/CLAUDE.md`、
  `dip-vinyl-home/.claude/skills/dip-desc-restyle/SKILL.md`
- 驗證：三個 `CLAUDE.md` 與 skill 的相關段落已逐一確認改寫完成；skill 內僅餘收尾處兩處 git 指令。

### 2026-08-02｜把 desc-restyle 產線固化成 skill `dip-desc-restyle`
- Repo：工作區 `dip-vinyl-home/.claude/skills/dip-desc-restyle/SKILL.md`（該層非 git repo）；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：店主要求「在新對話召喚 skill、輸入批次數或張數就能開跑」，已把整條產線寫成 178 行的 skill。
  參數接受批次號（`059`）、批數（`3 批`）或張數（`150 張`，換算每批 50 張）；不給參數則讀 `progress.json` 的 `status` 找下一個未跑批次。
- **skill 涵蓋**：開工前的交接檢查與備忘錄／progress 盤點、切卡單、研究 5 組（**指定 Sonnet**）→ hook 5 組（Opus）→ 合併 → 寫作 2 組（Opus）的派工模板與 model 指派、全套 QA 指令、逐張人工審稿的檢查清單、KV 上線與驗證、progress.json 與 PROJECT_MEMORY.md 的收尾格式、commit／push。
- **明確寫進 skill 的、不可自動化的兩件事**（已向店主說明）：
  1. **讀卡單決定通論分配與逐張特注**——代理看不到別組的卡，這是主線的判斷工作。
  2. **逐張人工審稿**——機器只驗「有沒有來源」，驗不出「來源對不對」。近六批靠它抓到的錯誤穩定落在每批 3–9 處，且多數要現場上網查證。skill 只能規定必須做，不能代替做。
- **把血淚教訓寫成硬規則**：
  - **特注裡的斷言會被代理當成既定事實往下長**——凡版本鎖定、序號、廠牌歸屬、人物歸屬、分軸軸線，一律寫成「請查證」的問句，並要求代理明列以來源推翻主線之處。改成問句式後研究層近三批推翻主線 16 處，含一次**否決分軸設計本身**。
  - **1958 年 8 月以前的單曲一律不得寫 Billboard Hot 100**（該榜那時才創設）——此錯已重演兩次。
  - 人物關係時序（「妻子」是當時就是還是後來才結婚）、hook 前提整個錯掉、編制陣容、跨批矛盾等高頻錯誤型態，依歷史頻率排序列進審稿清單。
  - 修正來源錯誤必須同步改 research／hooks／input 三層，否則會被 `qa-check-research` 誤標為編造。
  - 字數陷阱（中文夾拉丁人名時字元數遠高於直覺）、回報紀律（不得覆述原文，這是內容過濾器中斷的根因）、AI 生成百科站需交叉驗證。
  - 已知 QA 誤報型（《》內原文標題、綽號夾中間的人名、專名裡的半形逗號、序數被當名次）一併列出，避免下次「先查證再改稿」的功夫重做。
- **技術陷阱沿用既有紀錄**：wrangler 要親眼看到 `Success!`、`verify-kv.mjs` 在 Windows 要用 grep 取結果、含「..」的 key 不能用 `wrangler kv key get`（403）、Bash 工具不能用 PowerShell here-string 寫 commit message。
- 主要檔案：`dip-vinyl-home/.claude/skills/dip-desc-restyle/SKILL.md`（新增）
- 驗證：skill 已被系統載入並出現在可用清單中，frontmatter 的 name／description 格式與既有三個 dip-* skill 一致。

### 2026-08-02｜desc-restyle：批次 058 共 50 張上線（056–058 三批合計 150 張）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：跑完 w2-058 一批 50 張。研究 5 組（Sonnet）、hook 5 組（Opus）、寫作 2 組（Opus），QA 0 標記，字數 175–240（均 221），KV 逐字比對 50/50 一致。內容：loft jazz／BAG／AACM 系十張、晚期 Miles Davis 六張、Ornette Coleman 兩張、Gil Evans／George Russell／Jimmy Giuffre／Cecil Taylor／Steve Lacy／Mal Waldron 各兩張，以及南非與中東脈絡十張。
  - **新廠牌規則的效益在本批最明顯**：多條與作品直接綁定的廠牌事實終於寫得出來——Julius Hemphill 自創 Mbari 自資壓片約 1000 張、Nimbus West 是為記錄 Horace Tapscott 的音樂而創立、William Parker 自營 Centering Music 首發後轉 AUM Fidelity、Homestead 從獨立搖滾轉向簽下自由爵士、Timeless Records 的第一張作品即《Eastern Rebellion》、**ECM 1001 就是 Mal Waldron《Free at Last》**。這些在舊配額下全會被壓成一句「由某某發行」。
  - **harmolodics 通論從 056 一路預留到本批**，落在 Ornette《Dancing in Your Head》，三批合計只出現這一次。
  - **研究層推翻主線三處**：①〈The Train and the River〉在紀錄片《Jazz on a Summer's Day》裡的是 **1958 年以長號手 Bob Brookmeyer 取代貝斯手的另一組編制**，與本張 1956 年的單簧管／吉他／貝斯三重奏不同——主線在特注裡把兩者當成同一件事；②《Of Human Feelings》是「**美國境內**第一張數位錄製的爵士專輯」，不是流傳較廣的「全球第一張」；③《You're Under Arrest》的「Columbia 最後一張錄音室專輯」**有但書**（《Aura》是例外）。
  - 誠實處理數處：Leo Smith 的「留白／靜默音樂觀」查無可引用來源故不寫（只寫查實的 Ankhrasmation 記譜系統）、《O'Neal's Porch》標題由來查無來源不杜撰、四張因查不到具體曲名標 thin、《Ask the Ages》與 Sharrock 辭世相隔近三年判定不構成直接綁定故不寫。研究層另攔下一則疑似 AI 摘要把 Gullah／Geechee 的地域誤植為「喬治亞與北卡羅來納沿海」。
  - **資料缺口由卡池自身解決**：研究層回報《Old and New Dreams》有 **1977 Black Saint 與 1979 ECM 兩張同名專輯**、成員完全相同，卡單無欄位可辨。查 `seed_cards.json` 的年份欄為 **1977**，即 Black Saint 版，研究層的判斷正確、不需店主裁示。**這也提醒往後遇到同名作時先查卡池年份欄，不要直接當成待裁示項。**
  - **人工審稿修三處**：①《Dogon A.D.》的榜單出處原引自 rateyourmusic（使用者生成內容），查證後實為《紐約時報》樂評人 **Ben Ratliff** 的百張爵士必備錄音書單，已補正出處並把「必聽」改為「必備」以免與禁語混淆；②《O'Neal's Porch》點名了兩位側奏卻漏掉小號手 **Lewis Barnes**，讀起來像完整名單，已補回；③《The Jimmy Giuffre 3》的貝斯手 `Ralph Pena` 補回變音符號為 **Ralph Peña**。
  - **產線改良見效**：上一批 writer-1 初稿 19／25 超標（最高 312 字），已於 057 收尾時把「拉丁人名密集批次的字數陷阱」寫進 `prompts/writer-base.md`。本批兩位寫手**全數一次到位、零超標**（writer-1 為 192–240、writer-2 的 full 卡 211–237、thin 卡 175–178），並主動回報「動筆前就把陣容名單壓到主故事需要的人數、未把 facts 的完整編制照抄」。
  - **hook 層的跨組協調也自發改善**：c 組與 e 組在動筆前主動比對其他組已產出的開頭清單，前幾批都要靠主線在收尾時抓撞頭。本批仍有一處撞頭（Ulmer 與 Dixon 都以「唱片公司」起手）由主線修掉。
- 主要檔案：`desc-restyle/batches/w2-058-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-058*`、`desc-restyle/progress.json`
- 驗證：`qa-batch.mjs` 三關全數 0 標記（研究層本批零字元問題，前幾批都要修數十處半形逗號）；`qa-check-research.mjs` 兩檔各 0 標記（唯一殘留標記 `Lewis Barnes` 為已知誤報型——研究稿寫作 `Lewis「Flip」Barnes`，綽號夾在人名中間，RUNBOOK 已記載此類）；`fix-spacing` 待補 0 張；中文數字榜單名次與音樂人名中文音譯掃描皆 0 處；`wrangler kv bulk put` 回 `Success!`；`verify-kv.mjs` bulk-get 逐字比對 **50/50 一致**。
- 後續：尚未分池者 3,479 張。切 059 時注意 **Eddie Henderson 跨 058／059 邊界**（本批 1 張、下批 1 張），兩批特注要互寫排除條款。

### 2026-08-02｜店主裁定：廠牌敘事的「一次配額」取消；desc-restyle 批次 057 共 50 張上線
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- **規則變更（店主裁定，即刻生效）**：先前產線把「同一條廠牌敘事整個工程只准出現一次」當成硬性配額在管，**這是主線自己加嚴的，現已取消**。新規則是：**只要某張專輯的背景故事本來就牽涉廠牌，就要把它寫出來**，不必顧慮同一廠牌是否已在別張卡寫過。
  - **唯一保留的限制是反同構**：不得把同一段廠牌沿革原文照貼——每張要從自己這張唱片的角度切進去（這是他在該廠牌的第幾張／廠牌當時的處境促成了這張／製作人的哪個決定造就了這張的聲音），而不是重述創辦史。
  - **回頭清查已上線的 054–056**：共 81 張曾被下過廠牌禁令，但其中只有 10 張的研究稿真有廠牌素材，而那 10 張裡 9 張的廠牌事實其實都已寫入正文——因為舊配額只擋「展開沿革」，不擋「這是他在該廠牌的最後一張」「廠牌財務吃緊才押這張」這類與作品綁定的事實。**已上線內容實質未受損，不需回溯重寫。** 唯一小缺口是 055《The Real McCoy》未寫「也是他在 Blue Note 的首張領銜作」，該卡已貼 239 字上限，暫未補。
  - **真正被舊規則寫壞的是尚未執行的 057**：該批 c 組十張幾乎全是 ECM，而 Manfred Eicher 的錄音美學本來就是那些唱片的故事本體。規則在派工前解禁，效果立即可測——本批成稿裡 **ECM 出現於 14 張、Impulse! 9 張**，另有 Saturn／ESP-Disk／Elektra／Freedom／Arista／Philly Jazz／Blue Thumb／FMP／Tzadik 各自現身。
- 改動：跑完 w2-057 一批 50 張。研究 5 組（Sonnet）、hook 5 組（Opus）、寫作 2 組（Opus），QA 0 標記，字數 177–240（均 229），KV 逐字比對 50/50 一致。內容：融合爵士（Return to Forever 2、Weather Report 2、Mahavishnu 2、Pat Metheny 4）、ECM 群、AACM 與 Art Ensemble 2、Archie Shepp 3、Pharoah Sanders 4、Sun Ra 4、自由爵士體制外五張。
  - **研究層推翻主線七處，其中三處是廠牌歸屬**：①《Out of the Woods》是 **Elektra** 不是 ECM；②《The Black Ark》是 **Freedom** 不是 ESP-Disk；③《Liberation Music Orchestra》是 **Impulse!** 不是 ECM；④《Conception Vessel》**沒有 Sam Rivers**；⑤《Four for Trane》五曲**只有四首**取自 Coltrane，末曲〈Rufus〉是 Shepp 自作；⑥《Spaces》**不是四人同台**，Corea 只客串一曲；⑦《As Falls Wichita》標題曲**不是純二重奏**（另有 Nana Vasconcelos），真正的二重奏是〈September Fifteenth〉——**曲名正是 Bill Evans 的辭世日 1980-09-15、也是題獻對象**。
  - 另三處誠實標記：Eberhard Weber 的自製五弦電低音提琴查無專屬名稱、《Thembi》命名對象兩說並存、《Atlantis》原始廠牌查證不實故標 thin 且全篇不提廠牌。
  - **人工審稿修九處**：
    1. **《Lanquidity》的 hook 前提是錯的**——SNL 演出為 1978-05-20、錄音為 1978-07-17，**相隔近兩個月**，不是「演完當晚直奔錄音室」。整張連 hook 重寫。
    2. 《Out of the Woods》寫成「三人編制」，實為**四重奏**（漏了貝斯手 Glen Moore）；同時經 Wikipedia infobox 再次確認廠牌 Elektra 無誤（一則搜尋摘要曾誤稱 Vanguard）。
    3. 《Bright Size Life》的年齡各多算一歲：1975 年 12 月錄音時 **Metheny 21 歲、Jaco 24 歲**。
    4. 《Spectrum》寫成「Cobham 離開 Mahavishnu 之後的首張個人作」，實際錄於 1973 年 5 月、**當時原始陣容正在瓦解、他尚未離團**。
    5. 《Space Is the Place》自相矛盾：寫了「10 月 19 至 20 日」又說「一日完成」。
    6. 《Beyond the Missouri Sky》把 Lee's Summit 自造成中文「李鎮」，改用原文。
    7. 《Fire Music》的貝斯手拼寫 Izenson → **Izenzon**。
    8. 《Thembi》的錄音期間「1970 年冬至 1971 年冬」改為 1970 年 11 月至 1971 年 1 月。
    9. 《Odyssey》把 Rypdal 彈的 string ensemble 寫成「弦樂團」，改為**弦樂合成器**。
  - **產線問題（已寫進 `prompts/writer-base.md`）**：writer-1 回報初稿 **25 張有 19 張超標、最高 312 字**，才回頭刪節，違反「絕不先寫長再刪」的鐵則。原因是**中文行文夾大量拉丁人名、廠牌名與錄音室名時，實際字元數遠高於直覺估計**（一個 `Freddie Hubbard` 就吃掉 15 個字元）。已在寫作層範本加註：爵士／ECM 這類每張都要點名四五位樂手的批次，**動筆前就把陣容名單壓到主故事真正需要的那幾位**，不要先全列再刪。
- 主要檔案：`desc-restyle/batches/w2-057-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-057*`、`desc-restyle/prompts/writer-base.md`、`desc-restyle/progress.json`
- 驗證：`qa-batch.mjs` 三關全數 0 標記（研究層另修 40 處半形逗號）；`qa-check-research.mjs` 兩檔各 0 標記（三處主線更正已同步回研究與 input 層）；`fix-spacing` 待補 0 張；中文數字榜單名次與音樂人名中文音譯掃描皆 0 處；`wrangler kv bulk put` 回 `Success!`；`verify-kv.mjs` bulk-get 逐字比對 **50/50 一致**（含 `the colours of chloë` 的 ë）。

### 2026-08-02｜desc-restyle：批次 056 共 50 張上線（爵士女聲與 Blue Note 新浪潮）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：跑完 w2-056 一批 50 張。研究 5 組（Sonnet）、hook 5 組（Opus）、寫作 2 組（Opus），QA 0 標記，字數 187–239（均 224），KV 逐字比對 50/50 一致。內容：**14 張爵士女聲與人聲卡**、Ornette Coleman 4 張、Blue Note 新浪潮（Andrew Hill 3、Bobby Hutcherson 3、Jackie McLean 3、Joe Henderson 4）、Roland Kirk／Yusef Lateef／Keith Jarrett 各 2–3 張。
  - **本批的結構性難題：前兩批把廠牌通論額度全用完了。** Blue Note、Van Gelder 錄音室、Prestige、Impulse!、Atlantic 爵士部門、CTI、Norman Granz 的 Verve／JATP 體系，全部已在 054／055 落點完畢。本批 c／d 兩組幾乎整組是 Blue Note 作品、a 組多張是 Verve 作品，**二十餘張卡一律只能把廠牌寫成「由某某發行」**。這是 Blue Note 在 054 的處理原則往下延伸的必然結果，可行但要在派工時講死。
  - 新通論落點：自由爵士誕生與 Five Spot 駐場爭議只在 Ornette《The Shape of Jazz to Come》（**這條在 056／057／058 三批合計只出現一次**）、三管齊吹只在 Roland Kirk《The Inflated Tear》、東方樂器導入爵士只在 Yusef Lateef《Eastern Sounds》、獨奏鋼琴即興只在 Keith Jarrett《Facing You》、歌手自營廠牌只在 Betty Carter、Great American Songbook 標準曲傳統只在 Carmen McRae。**harmolodics 與 ECM 廠牌通論分別預留給 058 的《Dancing in Your Head》與 Mal Waldron《Free at Last》（ECM 1001，廠牌第一張發行），本批全面禁止。**
  - **研究層推翻主線六處**：①《Point of Departure》的小號手是 **Kenny Dorham**、**並無 Freddie Hubbard**；②《Mode for Joe》是**七重奏**非六重奏；③**Rahsaan 之名 1970 年才冠上**，晚於《Volunteered Slavery》(1969) 的發行；④《Wild Is the Wind》**與 Philips 合約收尾無關**（她隔年仍在該廠牌發片）；⑤《Eastern Sounds》是 **1961 年錄、1962 年發行**；⑥ Peggy Lee《Black Coffee》的**曲目全非她創作**，她的詞曲人身分是生涯標籤而非本作特徵。
    - **③是研究層第一次否決主線的「分軸設計」本身，不只是單一事實。** 主線原打算拿改名當兩張 Kirk 卡的軸線，但依反向禁令那屬「與作品無關的後續生平」，代理直接改用失明主題 vs 政治現場混編來分軸。**往後設計分軸時，軸線本身也要先查證時序。**
  - 另有兩處誠實降階：《Fuchsia Swing Song》的 time-no-changes 說法查無來源、《Forest Flower》的百萬銷量出自單一回顧來源。
  - **人工審稿修六處**：
    1. `julie london|julie is her name` **兩處**——Bobby Troup 1955 年是**未婚夫**（1959-12-31 才結婚），且**〈Cry Me a River〉不可能上 Billboard Hot 100**（該榜 1958-08 才創設），改稱全美流行單曲榜。**這是 049 那次 Chuck Berry 榜名年代錯置的同型重演，值得列為固定檢查項：凡 1958 年 8 月之前的單曲，一律不得寫 Hot 100。**
    2. `mel tormé|...dek-tette` 錄音地點誤植紐約，實為**好萊塢**（Radio Recorders）。
    3. `blossom dearie|blossom dearie` 稱她「與 Barclay 合組」Les Blue Stars，實際是**她自己創立**、Barclay 夫婦僅為支持者。
    4. `roland kirk|the inflated tear` 把致盲寫成「眼藥過量的**注射**」，實際是護理人員**點入過量藥水**。
    5. `eric dolphy|outward bound` 用了「低音黑管」，改為台灣慣用的**低音單簧管**。
    6. `ornette coleman|science fiction` 稱 Asha Puthli 為「印度裔美籍」，收斂為印度歌手。
  - **跨批次一致性照辦**：Abbey Lincoln《Straight Ahead》(1961) 全程未用「妻子」稱謂——她與 Max Roach 1962 年才結婚，這一點在 055 的《We Insist!》剛修過；《Inner Urge》把《A Love Supreme》只當時間座標（錄音早九天），未展開該作故事（那已在 054《Crescent》用掉）。
- 主要檔案：`desc-restyle/batches/w2-056-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-056*`、`desc-restyle/progress.json`
- 驗證：`qa-batch.mjs` 三關全數 0 標記（研究層另修 110 處半形逗號與簡體字）；`qa-check-research.mjs` 兩檔各 0 標記；`fix-spacing` 待補 0 張；中文數字榜單名次與音樂人名中文音譯掃描皆 0 處；`wrangler kv bulk put` 回 `Success!`；`verify-kv.mjs` bulk-get 逐字比對 **50/50 一致**（含 `mel tormé` 的 é 與 `destination... out!` 的三點 key）。

### 2026-08-02｜worker `/spotify-search`：模糊命中改由 CAA 覆核、修好 artistMatches 裸包含（已部署）

- Repo：`dip-vinyl-worker`（`src/index.js`）＋ `dip-vinyl-shop`（`scripts/cover-audit/` 兩支新腳本、本備忘錄）。
- 承同日稽核（下一筆）的處置。commit `e7db50f`，已 `wrangler deploy`，Version ID `0ee597e5`。

**三處改動**

1. `artistMatches` 從裸字串包含改為**詞集合互為子集**。舊寫法讓 `gong` 被 `gafaniogongkie`
   吃掉；單純加長度比例護欄則會誤殺 `Buddy Holly` vs `Buddy Holly & The Crickets`、
   `Sun Ra Arkestra` vs `Sun Ra`、`The Lightmen` vs `Bubbha Thomas & The Lightmen`。
2. 跨語言補救層的 `nameKnown` 同樣改用子集判定（The Birthday Party《Junkyard》
   就是靠 `party` 牽上草東沒有派對而配到《醜奴兒》）。
3. **CAA 從「Spotify 查不到才跑」擴為「模糊命中時也跑並覆核」。** 覆核要求 MB 標題與
   卡池專輯名**完全相同**，寧可放棄也不亂改；覆核成立時 `spotifyUrl` 設為 `null`。
   新增 `albumEffectivelyExact()`：剝掉版本後綴或藝人前綴後名稱相同者（`Abbey Road
   (Remastered)`、`The Beach Boys Today!`、`The Mack - Original Motion Picture Soundtrack`）
   視為完全吻合，**不勞動覆核層**，避免無謂的 MB 請求與誤改。

**刻意不動 `albumOK` 的長度門檻**——門檻無論訂多少都會在「續作編號只差 3 字」
（Hot August Night → III）與「官方全名多 30 字」之間顧此失彼；覆核是直接判對錯。

**驗證**（`scripts/cover-audit/7-verify-worker-logic.mjs`，並含與 worker 原始碼的特徵字串對照，防走鐘）

- 定點測試 **13/13** 通過（含 Gong、The Birthday Party、Led Zeppelin II→III、Nina Simone 原始案例）。
- 拿 2,173 張已稽核配對回歸：**2,020 張維持「直接信任」不改行為**、137 張落到覆核
  （即 A 級 116＋B 級 21）、16 張被藝人比對擋掉且**全部本就被標記可疑**。**誤殺 0、A 級漏網 0。**
- 線上實測：未快取的 `Nina Simone / Gifted and Black` 走 MISS，補救層回出**正確**封面
  （與先前人工修的同一個 MB release-group）；已快取者原樣回傳。

**遺留：已配錯並快取的卡不會自己好。** 新邏輯只在 KV MISS 時跑，`Gong / You` 等仍回舊的錯圖。
新增 `scripts/cover-audit/8-refresh-suspects.mjs`（刪鍵 → 重新解析 → 逐張 before／after），
但**Spotify 當時仍在限流（Retry-After 約 4.4 小時）**，腳本內建前提檢查會自行中止
（實測 exit 2）——限流期間重解析會全部落到 CAA、白白丟掉 `spotifyUrl`。
**改為人工觸發**：一度做了 `9-auto-refresh-runner.mjs`（commit `dde7bd7`）自動守候，
但**店主裁示不要輪詢通知、由他自己在限流解除後下指令**，該進程已停止。
腳本保留備用，正常流程是直接跑 `node scripts/cover-audit/8-refresh-suspects.mjs`
（`--dry` 可先看名單、`--levels A,B` 連 B 級一起清）。
步驟 8 內建限流檢查，時間沒到會自行 exit 2，不會誤刪。

### 2026-08-02｜卡池封面「Spotify 最近似匹配」錯配全面稽核：錯配率 3.5%、全池約 260 張

- Repo：`dip-vinyl-shop`（新增 `scripts/cover-audit/`、本備忘錄）；**worker 程式碼未改動**（依指示先量化）。
- 範圍：`seed_cards.json` 7,547 ＋ `apex_pool.json` 633 ＝ **8,180 張，兩池零重疊**。
- 產出：`scripts/cover-audit/FINDINGS.md`（結論）、`REPORT.md`（完整清單）、`data/suspects.json`／`.csv`。

**規模**：可稽核的 2,173 張（Spotify 供圖）中，工具標 A 級 116 張（5.34%），
逐張人工覆核**約 65% 是真配錯（約 75 張）**，換算全池約 **260 張**。屬「該改程式」而非「逐張改 KV」。
錯配型態六種：配到續作（Led Zeppelin II→III、The Godfather→Part II）、精選輯（Santana→Greatest Hits）、
兩張併一片的重發盤、現場盤、完全無關的作品（The Birthday Party《Junkyard》→草東《醜奴兒》）、同名別人。

**根因不只 `albumOK`，另實證兩處**（這是本次最該記住的）：
1. **`artistMatches` 有同型的裸字串包含問題**——`gong` 正好是 `gafaniogongkie` 的子字串，
   於是「藝人必須對得上」這道護欄自己先失守。**只加專輯名長度護欄擋不住這一類。**
2. **跨語言補救層會誤放行**——它的「藝人同名確認」同樣用裸字串包含。
   建議一律改用**詞集合互為子集**：實測擋掉 Gong 誤配，同時保住 `Buddy Holly` vs
   `Buddy Holly & The Crickets`、`Sun Ra Arkestra` vs `Sun Ra` 這些真同一人（裸長度比護欄會誤殺）。

**最關鍵發現：CAA 補救層準確度是 Spotify 模糊比對的五倍。**
抽驗 150 張反查 MusicBrainz release-group，**148 張標題完全吻合、0 張名稱不符**，錯誤率約 0.7%。
故建議修法**不是調 `albumOK` 門檻**（門檻無論訂多少都會在「續作編號只差 3 字」與
「官方全名多 30 字」之間顧此失彼），而是把補救層從「Spotify 查不到才跑」改成
**「只有 fuzzy 命中時就跑、以 MB 結果覆核」**；`exactHit` 照舊直接採用。

**副作用（待店主裁示）**：補齊掃描跑到約第 600 張時 Spotify `/v1/search` 開始回 429，
其後 **5,446 張改由 CAA 供圖並永久寫進 KV**（`spotifyUrl` 為 `null`）。
封面本身更準、且 worker 既有的「任何一步失敗就不寫入」護欄有生效（**沒有污染負面快取**）；
唯一損失是 Spotify 直連，前台按鈕會退回 `open.spotify.com/search/…` 不會壞。
鍵清單存 `data/caa-written-keys.json`，**建議保留封面、日後單獨回填 `spotifyUrl`**。
稽核結束時實測 `Retry-After`：`/v1/albums/{id}` 約 21 小時、`/v1/search` 約 5 小時。

**方法上的兩個坑**：① `open.spotify.com` 的 `og:title`／`og:description` **已經抓不到**
（web player 只吐 `og:site_name`），改用 `/embed/album/{id}` 頁的 `__NEXT_DATA__`，
有 `name` 與 `subtitle` 且不吃 API 額度；② `/v1/albums?ids=`（批次 20 張）對本 app 的
client-credentials token **回 403**，單張 `/v1/albums/{id}` 才是 200，省請求的批次路線走不通。

### 2026-08-02｜desc-restyle：批次 055 共 50 張上線（爵士正典第二批；053–055 三批合計 150 張）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：跑完 w2-055 一批 50 張。研究 5 組（Sonnet）、hook 5 組（Opus）、寫作 2 組（Opus），QA 0 標記，字數 166–240（均 234），KV 逐字比對 50/50 一致。內容：硬咆勃與 Blue Note 體系、Wayne Shorter 四張＋Herbie Hancock 五張、McCoy Tyner 三張＋Bill Evans 三張、吉他與酷派、Tristano 學派與搖擺長青樹。
  - **Blue Note 廠牌通論落在 Art Blakey《A Night at Birdland, Vol. 1》**，是 054／055 兩批合計唯一一次。**並依查證下了一條明文禁令**：Reid Miles 要到 1955 年底至 1956 年間才加入 Blue Note 任美術總監，本作 1954 年的原始 10 吋封面設計人是 **John Hermansader**，因此禁止把 Reid Miles 的視覺語彙掛在這張上。（這條是主線在派工時就以「若如此請照實寫明」的假設語氣要求查證的，結果顧慮成立。）
  - **主線撤回一條通論指派**：原把「西岸酷派與無鋼琴四重奏起源」指派給 Gerry Mulligan《Night Lights》，研究層查證後發現**該作陣容裡根本沒有 Chet Baker，且 Mulligan 在本作改彈鋼琴**——Mulligan／Baker 的無鋼琴四重奏是 1952–53 年另一個時期的組合。**該通論整批撤銷、不再指派給任何卡**，比照 053 處理 Wax Trax! 的同一原則：查無支撐就不硬塞。
  - **問句式派工持續見效，研究層推翻六處通行說法**：①《Undercurrent》那張水下封面是 Toni Frissell **1947 年的時尚攝影舊作、早於專輯 15 年**，並非為本作拍攝；②《Lennie Tristano》的爭議是 **1956 年〈Line Up〉等四曲的疊錄／變速磁帶技術**，不是 1949 年的自由即興實驗；③《Warne Marsh》是 **1958 年 11 月**發行，且與 1955 年的《Lee Konitz with Warne Marsh》是不同專輯；④《The Hawk Flies High》的陣容是**刻意的世代混搭**，不是「起用年輕一輩」；⑤《Lester Young with the Oscar Peterson Trio》**標題寫 Trio 實為四重奏**（多一位鼓手 J.C. Heard）；⑥Grant Green 1961 年的高產數字是**可考的五張**，非坊間的六張。另 Red Garland 與 Sugar Ray Robinson 交手一事雖見於多份記載但彼此疑似同源、無獨立拳擊史料佐證，正文改寫成「據傳」並禁寫回合數與傷勢。
  - **人工審稿修九處**：
    1. `stan getz|focus` **人物關係寫反**——〈Her〉題獻的 Goldie Getz 是他的**母親**（1961-07-13 辭世、就在首日錄音前一天），正文誤寫成「當時的妻子」。
    2. `paul desmond|take ten` 寫他「脫離 Brubeck 體系」，實際 1963 年他**仍是 Brubeck 四重奏成員**（1967 年才離開），只是另以個人名義與 RCA 簽約。
    3. `wynton kelly|kelly blue` 稱「首張以自己名義掛頭牌的專輯」，實際首作是 1951 年 Blue Note 的《Piano Interpretations》，本作是**該廠牌的第二張**領銜作。
    4. `joe pass|virtuoso` 發行年誤植 1973 年 12 月，實為 **1974 年**（1973-08-28 錄音）。
    5. `coleman hawkins|the hawk flies high` 的「十八小節獨奏」查無支撐，改為**兩段各 32 小節**的即興。
    6. `donald byrd|a new perspective` 把錄音年當成發行年，實為 **1963 年 1 月錄製、1964 年 2 月發行**。
    7. `max roach|we insist!` 稱 Abbey Lincoln 是「Max Roach 的妻子」，但**兩人 1962 年才成婚**，1960 年錄這張時尚未結婚。
    8. `herbie hancock|empyrean isles` 寫「四重奏編制裡沒有和聲樂器」——Hancock 彈的鋼琴本身就是和聲樂器，該句有誤，已刪。
    9. `wayne shorter|night dreamer` 說他「同年夏天」加入 Miles Davis，與上一批《E.S.P.》寫的「1964 年 9 月」對不上，改為不指定時點。另 `red garland|groovy` 的 hook 用了非通行中文的「彈鎖和弦」，且術語與 054 的《Workin'》不一致，統一改為 block chords。
  - **抓到一處跨批次矛盾並回頭修正已上線內容**：055 的《Lennie Tristano》寫 1956 年是「爵士史上首度大量疊錄」，但 **054 已上線的《The Black Saint and the Sinner Lady》(1963) 也用了「首度」**，而 Tristano 更早。兩張都改成不帶最高級的敘述，**054 該張已重新推送 KV 並復驗 50/50 一致**。這類矛盾單看一批看不出來，只有跨批審稿才會浮現。
- 主要檔案：`desc-restyle/batches/w2-055-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-055*`、`batches/output/w2-054-out-2.json`（Black Saint 一張）、`desc-restyle/progress.json`
- 驗證：`qa-batch.mjs` 三關全數 0 標記；`qa-check-research.mjs` 兩檔各 0 標記（更正來源後同步改研究與 input 層）；`fix-spacing` 待補 0 張；中文數字榜單名次與音樂人名中文音譯掃描皆 0 處；`wrangler kv bulk put` 兩次皆回 `Success!`；`verify-kv.mjs` bulk-get 逐字比對 **w2-055 50/50、w2-054 復驗 50/50 一致**。

### 2026-08-02｜desc-restyle：批次 054 共 50 張上線（爵士正典第一批）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：跑完 w2-054 一批 50 張。研究 5 組（Sonnet）、hook 5 組（Opus）、寫作 2 組（Opus），QA 0 標記，字數 179–240（均 231），KV 逐字比對 50/50 一致。內容為九〇年代電台搖滾尾聲四張，加上**爵士正典四十六張**：Miles Davis 十張、John Coltrane 七張、Charles Mingus 六張、Alice Coltrane 四張、Sonny Rollins 四張、Thelonious Monk 三張、Duke Ellington 三張。
  - **這是本工程密度最高的一批。** 廠牌線幾乎每張卡都沾得到邊，因此主線在派工前先把 8 條廠牌通論與 18 條場景通論各釘死在單一張卡上，跨 054／055 兩批生效，其餘卡一律只能寫成「由某廠牌發行」。**Blue Note 廠牌敘事在 054 整批禁止**，留給 055 的 Art Blakey《A Night at Birdland, Vol. 1》。
  - **派工方法改良（承接 053 的教訓，效果立竿見影）**：053 曾因主線把未查證的前提寫成肯定句，導致研究與 hook 兩層順著錯誤前提一路長上去。本批起，**特注裡凡屬版本鎖定、序號、廠牌歸屬、人物歸屬的斷言，一律改寫成「請查證」的問句，並要求代理明列任何以來源推翻主線的地方**。這一改就讓研究層推翻了三條通行說法：
    1. **《Live at Birdland》並非全部錄於現場**——〈Alabama〉與〈Your Lady〉錄於 1963-11-18 的錄音室，只有三曲錄自同年 10-08 的 Birdland 現場。此點後來成為該卡的 hook。
    2. **《Sun Ship》不是古典四重奏最後一次錄音室錄音**——一週後錄的《First Meditations》才是。主線特注原本是以肯定語氣暗示前者的。
    3. **《Universal Consciousness》的弦樂由 Alice Coltrane 本人譜寫**，Ornette Coleman 只負責謄寫樂譜，與通行說法相反。此點成為該卡的 hook。
  - 另有三處誠實處理：《Miles Smiles》的「time, no changes」查無直接來源，改用 Keith Waters 的可查證描述；《Filles de Kilimanjaro》的 Gil Evans 未具名編曲查無確證，直接略去並標 thin；The Verve Pipe《Villains》查證為第三張錄音室專輯（二手資料常誤植第二張）。
  - **人工審稿修八處**：
    1. `dizzy gillespie|sonny side up` 發行年誤植 1957，實為 **1957-12-19 錄音、1959 年發行**；〈The Eternal Triangle〉走 rhythm changes，調性由「B 大調」更正為**降 B 大調**。
    2. `miles davis|relaxin'` 把〈Surrey with the Fringe on Top〉寫成本作曲目，該曲實收於《Steamin'》，已刪。
    3. `dishwalla|pet your friends` 的 hook 說「換來死亡威脅」，正文卻寫弱成「強烈反彈」——查證後**死亡威脅屬實**，是正文寫弱而非 hook 寫過頭，改正文；單曲全名補回漏掉的 All。
    4. `marcy playground` 的 hook 說「擱了近十年」與正文的 1992／93 年自相矛盾，改為不指定年數。
    5. `john coltrane|sun ship` 的 hook 用了中文音譯「柯川」，違反「音樂人名用拉丁原文」，改回 Coltrane。
    6. `miles davis|on the corner` 同上，「史托克豪森」改為 Stockhausen。
    7. `john coltrane|meditations` 原寫「這個四重奏最後一次一起錄音」，與 Sun Ship 那張的說法表面衝突，改為「這四人最後一次同場錄音」——Sun Ship 指的是四重奏編制的最後兩次之一，Meditations 指的是四人同場的最後一次，兩者皆為真但用詞須分開。
    8. `charles mingus|the black saint and the sinner lady` 把「爵士史上首度大量疊錄」寫成定論，來源本身是 arguably，已收斂為「被視為」。
  - **兩處我差點把對的改成錯的，查到底才發現原稿正確**：①`kmfdm|nihil`（053 那批）的〈Juke-Joint Jezebel〉確實用於《Bad Boys》，《Mortal Kombat》用的是 Giorgio Moroder 混音版；②本批《The Black Saint and the Sinner Lady》確實錄於紐約 Atlantic Studios、Monk《Underground》封面確實是向 Baroness Pannonica de Koenigswarter 致敬且她本人形象在封面上。**溯源要查到底，不能只憑印象反向修正。**
  - **來源品質警訊**：d 組研究層回報，一個 **AI 生成的百科條目**把《Pithecanthropus Erectus》誤植為六重奏、鋼琴手 Jaki Byard（Byard 實際是《The Black Saint》的鋼琴手）。代理交叉核實後改回正確的五重奏編制。往後遇到這類站點要一律交叉驗證。
  - **主線派工失誤一處**：Alice Coltrane 四張與《Sun Ship》實際落在 writer-1，主線卻把對應的兩條更正寫進了 writer-2 的特注。所幸 hook 層已把禁令寫進 note 欄，writer-1 照 note 執行無誤（審稿逐張複驗過這五張）。**這再次確認 note 才是有效載體，寫手特注只是輔助。**
- 主要檔案：`desc-restyle/batches/w2-054-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-054*`、`desc-restyle/progress.json`
- 驗證：`qa-batch.mjs` 三關全數 0 標記；`qa-check-research.mjs` 兩檔各 0 標記（更正來源後同步改研究與 input 層，避免被誤標為編造）；`fix-spacing` 待補 0 張；中文數字榜單名次與音樂人名中文音譯掃描皆 0 處；`wrangler kv bulk put` 回 `Success!`；`verify-kv.mjs` bulk-get 逐字比對 **50/50 一致**。

### 2026-08-02｜desc-restyle：批次 053 共 50 張上線（尚未分池者 3,629 張）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：跑完 w2-053 一批 50 張。研究 5 組（Sonnet）、hook 5 組（Opus）、寫作 2 組（Opus），QA 0 標記，字數 179–240（均 230），KV 逐字比對 50/50 一致。批次主題：中西部重型太空搖滾／工業與 EBM／nu metal／後 grunge 與九〇年代電台搖滾。
  - **本輪改採「一批走完全程再開下一批」**（店主 2026-08-02 裁定）。先前三四批並行，逐張審稿會把整批全文帶進上下文，堆越多後面每輪重送越貴。同時**研究層固定指定 model 為 sonnet**（RUNBOOK 早有規定，上一輪派工漏寫導致研究層全跑成 Opus）。
  - **人工審稿抓到八處機器 QA 驗不出的錯誤，其中一處是主線自己造成的**：
    1. **`311|311`——錯誤前提由主線的派工特注引入。** 我在特注寫「本張是 1995 年同名作，不是 1990 年的自主發行 demo」，但該團 1990 年的自主發行是《Dammit!》，**早期根本沒有同名版本**。研究層順著我的前提查證並「確認」了差異，hook 更把它寫成「同名的唱片有兩張，掛上三白金的到底是哪一張？」——**整張卡的懸念建立在不存在的事實上**，因此 hook、note、facts、正文全部重寫。
    2. `front 242|front by front` 誤寫第三張錄音室專輯，實為**第四張**（Geography 1982→No Comment 1984→Official Version 1987→Front by Front 1988）。
    3. `live|throwing copper` 誤寫第三張，實為**第二張**（Mental Jewelry 1991→Throwing Copper 1994）。
    4. `barenaked ladies|stunt` 誤寫「1998 年 6 月發行、第五張錄音室專輯」，實為 **1998 年 7 月 7 日、第四張**。
    5. `the wallflowers|bringing down the horse` 把〈One Headlight〉的獲獎年寫成 1999 年，實為 **1998 年第 40 屆葛萊美**。
    6. `eve 6|eve 6` 把《X 檔案》〈Eve〉寫成第二季，實為**第一季第 11 集**（1993-12-10 首播）。
    7. `silverchair|frogstomp` 兩處：團員年齡誤為 14 歲（三人皆生於 1979 年，錄音與發行時**均為 15 歲**）、澳洲認證誤為 11 白金（實為**六白金**、約 42 萬張）；另刪去查無來源的「澳洲樂團史上第一張首張專輯即空降冠軍」。
    8. `bush|sixteen stone` 的美國發行日**來源分歧**（11 月 1 日與 12 月 6 日並存），改為只寫「1994 年底」不指定日期。
  - **這輪最值得記的教訓：主線寫進特注的錯誤前提，比研究層自己查錯更危險。** 研究層會把它當成待驗證的既定事實去「確認」，hook 層再據以建構懸念，三層一路長上去，機器 QA 只驗「有沒有來源」全數放行。**往後派工特注裡的版本鎖定、同名作區分、廠牌歸屬等斷言，要嘛附來源、要嘛寫成「請查證是否存在」的問句，不要寫成肯定句。**
  - **兩條通論查無支撐即不寫，不硬塞**：主線原把 Wax Trax! 廠牌通論配給 Ministry《The Land of Rape and Honey》、比利時 EBM 名詞由來配給 Front 242《Front by Front》，但 hook 層回報兩張的事實表都沒有對應細節（前者實為 **Sire** 發行，Wax Trax! 是 Ministry 更早的單曲時期）。兩條通論整批不展開。
  - **差點把對的改成錯的**：`kmfdm|nihil` 寫〈Juke-Joint Jezebel〉被電影《Bad Boys》採用，我一度以為應該是《Mortal Kombat》而準備更正，查證後**原稿正確**——原版用於《Bad Boys》，《Mortal Kombat》用的是 Giorgio Moroder 混音版。**溯源要查到底，不能只憑印象反向修正。**
  - **研究層主動推翻主線假設四處**：Collective Soul 的〈Shine〉電台自播故事屬 1993 年首張而非本張 1995 同名作、Republica 英美版曲序實際相同、Godflesh《Pure》無〈Spine〉一曲、White Zombie 的 Beavis and Butt-Head 曝光屬前作《La Sexorcisto》。
  - **店主中途補線索促成一張升級**：`papa roach|infest` 原標 thin（〈Last Resort〉取樣來源查無確證）。依店主提供的討論串線索追查 Louder 專文後確認**該 riff 並非取樣**——貝斯手 Tobin Esperance 九〇年代中期在沙加緬度合租屋用鋼琴寫出主旋律，Shaddix 形容「聽起來像一首古典樂曲」才搬上吉他；Iron Maiden〈Genghis Khan〉抄襲指控由 Shaddix 於 2020 年否認（稱他 2004 年才聽該團）。升為 full，並依規則同步改 research／hooks 兩層，note 下明令「嚴禁寫成取樣」（誤傳的正是這個詞）、指控與否認兩邊都要寫。
  - **同構故事分軸**：本批有四張真實骨架都是「離開原樂團另起爐灶」（Front Line Assembly／Jesu／Rob Zombie／Filter），note 全面禁用該框架並禁止互相轉述，成稿四張的開場切入點分別為發行錄音資訊、人員配置、取樣片單、歌曲取材對象。另有十張屬「單曲電台爆紅→專輯長銷」骨架，各指定不同切入點錯開。
  - **題材克制照辦**：Filter〈Hey Man Nice Shot〉點名 R. Budd Dwyer 與 1987 年、不寫過程；Disturbed 的獨白爭議只作事實陳述並註明未收進電台版；Everclear、Live、Fastball 涉逝者處只寫客觀事實與時序。P.O.D.《Satellite》明寫發行日與 2001-09-11 僅為時序重疊、非為該事件而作。
- 主要檔案：`desc-restyle/batches/w2-053-{final,kv}.json`、`batches/{wave2,research,hooks,input,output}/w2-053*`、`desc-restyle/progress.json`
- 驗證：`qa-batch.mjs` 三關（research／hooks／out）全數 0 標記；`qa-check-research.mjs` 兩檔各 0 標記；`fix-spacing` 待補 0 張；中文數字榜單名次殘留 0 處；`wrangler kv bulk put` 回 `Success!`；`verify-kv.mjs` 以 bulk-get 逐字比對 **50/50 一致**。（沿用既有陷阱處置：verify-kv 在 Windows 會於印完結果後觸發 libuv assertion，取結果用 grep 驗證行、勿用 `tail -1`。）

### 2026-08-02｜worker 封面解析補上 Cover Art Archive 層；Nina Simone 封面修正
- Repo：`dip-vinyl-worker`（`src/index.js`，commit 8009ff6，已 push 並部署）
- 改動一（本次需求）：`/spotify-search` 在 Spotify 未取得封面時，新增 MusicBrainz release-group 查詢 → Cover Art Archive 取封面的補救層。`ALBUM_ONBOARDING.md` 記載的解析鏈本來就有這層，但執行期先前缺席（實際只有 card_catalog → Spotify → Bandcamp）。
  - 門檻：MusicBrainz score >= 90 且 `primary-type` 為 Album。這層的用途就是修正 Spotify 的最近似匹配，自己放行低分結果只是換來源犯同樣的錯。secondary-types（Compilation／Live）不排除，卡池本就收錄少數精選輯與現場盤。
  - **CAA 的 JSON 有部分條目回傳 `http://` 網址**（實測 Laika、Rodan），前台為 HTTPS 會被瀏覽器以混合內容擋成破圖，故一律強制升級為 https。這是實測才發現的，靜態閱讀程式碼看不出來。
  - 線上驗證：Virginia Astley《From Gardens Where We Feel Secure》與 Talulah Gosh《Backwash》先前 `/spotify-search` 回空手，現在取得 CAA 封面且為 https。Drunks with Guns（Spotify 無、CAA 亦無封面）正常落空回 `{}`，不影響前端續打 `/bandcamp-search`。
- 改動二（工作區既有、非本次需求，經店主確認後一併提交）：YT Music「頂部大卡片備援」限縮為含 CJK 的查詢。該備援不驗證專輯名，對純 ASCII 查詢會誤採同藝人的別張專輯（New Herd→Beneath the Underdog 等）；快取鍵一併升為 v6 讓舊的錯誤配對失效。
- 改動三：`desc2:`／`cover6:` 所在 KV 直接覆寫 `cover6:nina simone|gifted & black`，改為 Cover Art Archive 的 1970 年正確封面，`spotifyUrl` 設為 null（原值指向 2006 年合輯，留著會把使用者導到錯的專輯）。
  - **修正一項先前的錯誤認知**：封面覆寫不需要 Firestore 權限。前台鏈是 card_catalog → Spotify → Bandcamp，未入庫的卡直接吃 worker 的 `cover6:` KV，而該 namespace（`5f65e74b17d644b68a3f542b08a5c105`）與 `desc2:` 完全相同，用既有的 `CLOUDFLARE_API_TOKEN` 即可寫入。
- **未解決的問題（重要）**：本補救層**只在 Spotify 完全查不到時觸發**，因此擋不住 Nina Simone 這一類「Spotify 有回結果但回錯」的情形——該張是靠直接改 KV 修好的，不是靠這層。根因在既有比對邏輯的 `albumOK`：專輯名採「正規化後互相包含」，卡池的 `gifted and black` 正好是合輯全名 `forever young gifted and black songs of freedom and spirit` 的子字串故通過。這個寬鬆比對是刻意的（要吃得下 `(Deluxe Edition)` 等副標），但同時放行了「短名被長名包住」的錯配。若要收緊需加長度比例護欄，有誤傷現有正確配對的風險，未動。
- 主要檔案：`dip-vinyl-worker/src/index.js`
- 驗證：`node --check` 通過、`wrangler deploy --dry-run` 建置成功、已部署（Version ID 2a46b3b9）；補救層演算法先以獨立腳本實測五張，再於部署後線上實測十三張，結果如上。

### 2026-08-02｜desc-restyle：批次 049–052 共 200 張上線（剩餘卡池 3,779 張）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄（Laika 卡池更正另有一筆紀錄）
- 改動：跑完 w2-049～052 各 50 張。研究 20 組、hook 20 組、寫作 8 組，四批 QA 皆 0 標記，字數 198–240（各批均值 225–233），KV 逐字比對 200/200 一致。批次主題：049 酒吧搖滾與 50 年代搖滾／陽光流行／法國香頌與 blaxploitation／舊金山迷幻、050 英國合成器流行與精緻流行／2 Tone／澳洲後龐克、051 工業與秘教／Factory／C86 與 Sarah／Stereolab 與 Broadcast、052 slowcore／路易維爾與芝加哥後搖滾／Albini 系譜／噪音搖滾。
  - **人工審稿抓到四處機器 QA 驗不出的錯誤，其中三處是研究層來源本身錯了**：
    1. Chuck Berry《After School Session》把 1957 年的名次掛在「Billboard Hot 100」，但該榜 1958 年 8 月才創設，已改「全美流行榜」。
    2. Felt《Forever Breathes the Lonely Word》的編號與月份皆誤——CRELP 001 是 1984 年 8 月的合輯《Alive in the Living Room》，本作為 **CRELP 011、1986 年 10 月**。
    3. Big Black《Songs About Fucking》寫「Touch and Go 由 Corey Rusk 於 1980 年底創立」，實際是 1979 年 Tesco Vee 等人辦的同人誌、1981 年轉為廠牌、**1983 年才交棒給 Rusk 夫婦**。
    4. The Waterboys《This Is the Sea》的 hook 寫「五年後再版」與正文的 1991 年自相矛盾（單曲 1985 年 10 月初發，實為六年），三層同步改為六年。
  - **這批的關鍵教訓**：上述 1、2、3 的數字**都存在於研究層事實表中**，因此 `qa-check-research` 的「編造專名／年份」檢查全數放行。該工具驗的是「這個數字有沒有來源」，驗不出「來源本身對不對」。修正後反而會被標成「編造年份」（正確年份不在錯誤的來源裡），因此**每次更正來源錯誤都必須同步改上游的 research／hooks／input 三層**，否則機器檢查與事實會長期背離。
  - **場景群聚控制**：四批共 21 條通論全部只落在指定的單一卡片上，包含 049 的 pub rock／搖滾草創／陽光流行／yé-yé／blaxploitation／舊金山迷幻、051 的 TG 系譜／後工業／Factory／C86／Sarah／K Records／後搖滾、052 的 slowcore／Slint 系譜／芝加哥後搖滾／Albini 系譜／Touch and Go／噪音搖滾／AmRep。同一人多卡的極端案例（Japan＋Sylvian 四張、Talk Talk＋Mark Hollis 三張、Stereolab 三張、Broadcast 三張、XTC 三張、Scott Walker 三張）亦全部分軸。
  - **同構故事的分軸**：050 的 Heaven 17 與 John Foxx 真實故事結構相同（皆離開原樂團另起爐灶），note 全面禁用該框架並禁止互相轉述，成稿兩張完全未提前團。這類「用字可以完全不同、骨架卻一模一樣」的重複比共用場景通論更難察覺，值得列為往後派工的固定檢查項。
  - **研究層開始主動推翻來源**：查證擋下〈Coup〉不在《Seven Songs》（故不寫 Chemical Brothers 取樣）、Nirvana 翻唱的三首不在《Dum-Dum》曲目中（成稿直接把此事寫成該卡的收尾事實）、Don Caballero《What Burns Never Returns》製作人是 Al Sutton 而非 Albini。另主動查出卡池的 Laika 專輯名錯誤（另有紀錄）。
  - **內容過濾器**：049-d 研究層中斷一次，但輸出檔 10 張完整、key 逐字對齊、notes 排除條款齊備，僅最終報告被切，獨立驗證後未重跑。同組後續的 hook 加強輸出紀律（只回計數與異常 key、零內容覆述）即順利通過。連續第六輪驗證根因是內容覆述而非題材敏感度。
  - **題材克制三處照辦**：Rapeman 團名爭議照實陳述不渲染不玩味、Unsane 封面不宣稱查無來源的「通路拒賣」而改用可查證說法、Drunks with Guns 寫明實為 3 首的 7 吋 EP 且曲名留空。
  - **待店主裁示**：`drunks with guns` 為 7 吋 EP 而非 LP，比照 `mudhoney|superfuzz bigmuff`、`misfits|static age` 的既有前例保留並於正文寫明實際性質。
- 主要檔案：`desc-restyle/batches/w2-049~052-{final,kv}.json`、`batches/{research,hooks,input,output}/*`、`desc-restyle/progress.json`、`desc-restyle/prompts/*.md`、`desc-restyle/qa-batch.mjs`
- 驗證：四批 `qa-check-research` 全數 0 標記、`fix-spacing` 待補 0 張、中文數字榜單名次殘留 0 處；`verify-kv.mjs` 以 bulk-get 逐字比對，四批各 50/50 一致。另針對已上線的 2,651 張回掃三種同型錯誤（Hot 100 年代錯置、CRELP 編號、Touch and Go 創辦說法），均無流出。

### 2026-08-01｜卡池更正：Laika 專輯名 Sun→Moon（seed 7547，張數不變）
- Repo：`dip-vinyl-shop`（`seed_cards.json`）、`desc-restyle`（任務檔與批次檔）
- 改動：`["Laika","Silver Apples of the Sun"]` 更正為 `["Laika","Silver Apples of the Moon"]`。Laika 1994 年首作正確名稱取自 Morton Subotnick 1967 年的電子樂作品《Silver Apples of the Moon》，該團目錄中並無任何名為「Sun」的作品，屬卡池原始資料的字詞錯誤。
  - **發現途徑**：desc-restyle 批次 w2-051 的研究層代理在查證時發現曲目與專輯名對不上，主動回報而非照著錯誤名稱編寫。
  - **查證**：MusicBrainz release-group 查詢命中《Silver Apples of the Moon》（primary-type Album、first-release-date 1994-10-17、artist Laika、score 100），無「Sun」版本。
  - **連帶更新**：`desc-restyle/restyle-tasks.json`、`batches/wave2/w2-051-cards.json`、`batches/research/w2-051-e.json` 的 `desc2:` key 一併改為 `desc2:laika|silver apples of the moon`。本張尚未寫入正式簡介，此時更名不影響已上線內容。
  - **孤兒鍵清除**：舊 key `desc2:laika|silver apples of the sun` 在 KV 中存有 worker 即時生成的 AI 備援值（卡片被抽到時會自動生成回寫），已一併刪除。
- 主要檔案：`seed_cards.json`
- 驗證：`seed_cards.json` JSON 可解析、張數維持 7547；`wrangler kv key get` 查舊 key 回 404 確認刪除（**未使用 `/album-desc` 驗證，該端點會觸發 worker 重新生成並回寫、反而污染已清除的鍵**）；`qa-batch.mjs research w2-051` 全批 50 張 key 與卡單完全一致。

### 2026-08-01｜desc-restyle：批次 044–048 共 250 張上線（剩餘卡池 3,979 張）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：跑完 w2-044～048 五批各 50 張。研究 25 組、hook 25 組、寫作 10 組全數完成，五批 QA 皆 0 標記，字數 179–240（各批均值 229–231），KV 逐字比對 250/250 一致。批次主題：044 藍調復興／紐奧良／經典搖滾／軟搖滾與迪斯可、045 英國後龐克與哥德／Postcard 蘇格蘭獨立／Flying Nun 紐西蘭、046 SST 與低傳真美國獨立／Elephant 6／4AD／shoegaze、047 shoegaze 後段／Madchester／Britpop／grunge 週邊、048 美國硬蕊與 Dischord／Epitaph／英國第一波龐克與無政府龐克。
  - **場景群聚控制是本輪重點，三個高密度群聚全部只落一張**：046 的 4AD 七張裡廠牌敘事只寫在 This Mortal Coil、shoegaze 十張裡「類型綽號由來」只寫在 Chapterhouse、Elephant 6 集體起源只寫在 The Apples in Stereo；045 的 Postcard 創辦故事只在 Orange Juice、Flying Nun 創辦故事只在 The Clean；048 的 Epitaph 草創只在 Bad Religion《Suffer》、Dischord 自營與低票價只在 Fugazi《Red Medicine》、無政府龐克體系與 Crass Records 成因只在 Crass《The Feeding of the 5000》。同體系其餘卡片僅將廠牌當作發行資訊帶過。
  - **反向禁令兩分法實測無誤**：Mother Love Bone《Apple》把 Andrew Wood 辭世日與延後發行日並列標明時序、不寫死因過程；Slowdive《Pygmalion》寫「1995-02-06 發行→約一週後解約→隨即解散」；The Germs《GI》標明 Darby Crash 辭世晚於發行一年多、僅點到用藥過量。反向：John Denver 的州歌通過（2007）明寫晚於 1997 年辭世，Harry Chapin 1981 年辭世與 X-Ray Spex 後續辭世則完全不寫入。
  - **人工審稿抓到四處機器檢查抓不到的問題**：`julian cope|fried` 照抄維基百科「距首作僅隔六個月」的錯算術（首作 1984-02-17、本作 11-09，實為近九個月），改為「不到一年」；`swervedriver|mezcal head` 誤用「夢核」（中文語境指 dreamcore 網路美學，非「夢幻」），改為「夢幻」；`oasis|be here now` 六位數裸寫「663389 張」不符全池「X 萬 Y 張」慣例，改為「66 萬 3389 張」；048-2 兩處「貝手」漏字補為「貝斯手」（全池其餘批次無此錯字）。
  - **QA 腳本補丁**：`qa-check-research.mjs` 與 `qa-check-hooks.mjs` 將《》內的原始標題排除於禁語與格式檢查之外。起因是 047 寫手依新規則正確保留《死前必聽 1001 張專輯》卻被誤標為禁語「必聽」——禁語只約束行文、不約束專名。
  - **並行代理暫存檔衝突**：044 寫手回報其 `chk.mjs` 被另一代理覆寫。三份 prompt 範本均已加入「臨時腳本與中間檔一律加批次組別前綴」規則。
  - **良性誤報記錄**：QA 逐卡比對事實表，寫手若採用同批其他卡研究稿裡的正確資訊會被誤標。本輪一例：`the mission` 的 note 只寫「Eldritch」，寫手補上全名「Andrew Eldritch」（該全名見於同批 Sisters of Mercy 兩張的研究稿），事實正確，保留。
  - **內容過濾器零中斷（連續第五輪）**：本輪 60 個代理全程無中斷，再次驗證根因是「整批內容重新輸出」而非題材敏感度——048 的無政府龐克十張含核戰意象、猥褻出版品查扣、極右翼滋事等題材，全數順利完成。
  - **待店主裁示**：`the clean|anthology` 正文自述為 2002 年 Flying Nun／Merge 雙 CD 精選輯而非錄音室專輯。它有正式封面與正式發行，且 The Clean 早期僅出 EP 與單曲、這是唯一能完整聽到那批錄音的出版品，依「非正規專輯即移除」的字面標準屬邊界案例，暫予保留。
- 主要檔案：`desc-restyle/batches/w2-044~048-{final,kv}.json`、`batches/{research,hooks,input,output}/*`、`desc-restyle/progress.json`、`desc-restyle/prompts/*.md`、`desc-restyle/qa-check-{research,hooks}.mjs`
- 驗證：五批 `qa-check-research` 全數 0 標記、`fix-spacing` 待補 0 張；中文數字榜單名次殘留掃描 0 處；`verify-kv.mjs` 以 bulk-get 逐字比對 KV，五批各 50/50 一致。（註：`verify-kv.mjs` 在 Windows 上會於結果印出後觸發 libuv 關閉期 assertion，取結果請 grep 驗證行、勿用 `tail -1`。）

### 2026-07-28｜卡池清理：移除四張查無對應的卡（seed 7558→7556、apex pearl 109→107）
- Repo：`dip-vinyl-shop`
- 改動：店主裁定移除查證後確認不存在或無法對應的卡片。`seed_cards.json` 移除 `["Genesis","Limbo"]`（官方目錄無此專輯，僅 1992 bootleg 與 1969 曲目〈In Limbo〉同名）與 `["Ennio Morricone","Ennio Morricone"]`（確認無同名專輯，原對應多張同名授權合輯）；`apex_pool.json` 的 pearl 分類移除 `["Michael A. Grant","Michael A. Grant"]`（查無任何紀錄）與 `["San Ul Lim","The Mountain Hut"]`（查無對應專輯）。四張卡在 KV 的 `desc2:` 簡介一併刪除，避免孤兒資料。
  - **保留裁定**：`["Weezer","Weezer"]` 確認鎖定 1994 年藍色專輯（該團有六張同名專輯，此為店主指定）。
  - **待裁定**：`apex_pool.json` pearl 仍有 `["Alexander Robotnick","Kind of... Robotnick",...,2024]`——此片**確實存在**但性質是 2024 年選輯，與前三張的「查無」不同類，依卡池排除合輯的既有原則可能該移除，保留待店主確認。
- 主要檔案：`seed_cards.json`、`apex_pool.json`
- 驗證：兩檔 JSON 皆可解析、殘留字串掃描全數 false；KV 四鍵刪除後線上查詢 `X-Cache` 由 `KV-HIT` 轉為 `MISS`（回傳值為 worker 即時生成的備援，非舊資料）。卡池程式一律以檔案當下內容為準、未寫死張數，故無需同步改碼。

### 2026-07-28｜desc-restyle 第二輪：批次 015–020 共 300 張上線（累計 1,770/6,980）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：以全 Opus 管線（研究 Sonnet、hook＋寫手 Opus 5）跑完 w2-015～020 六批，每批 50 張，全部 QA 標記歸零、逐張審稿、上 KV 並線上抽驗 5/5。批次主題：015 獨立搖滾／夢幻流行／雷鬼、016 世界音樂／金屬／前衛、017 emo／民謠／創作女聲、018 混合批（PJ Harvey ×4、Kate Bush、Sinéad）、019 深冷門混合批、020 深目錄混合批。
  - **品質顯著提升**：六批共 300 張，寫手輸出僅 3 處需修（前一輪同量約 30 處）。015 前半、016 後半、017 兩檔、018 兩檔、019 兩檔、020 兩檔皆審稿零修。
  - **審稿抓到的實質錯誤**：Bob Marley《Natty Dread》把 Trench Town（金斯敦貧民區）誤譯為「千里達鎮」——錯在研究層、寫手忠實照抄、QA 抓不到，已溯源修正研究稿與 input 檔；PJ Harvey《Stories from the City》hook 自行添加事實表沒有的「五角大廈仍在冒煙」，於 hook 品管階段攔下改寫；Paramore《Riot!》hook 用「全片」指整張專輯（禁用法）。
  - **新增資料疑義（待店主裁定）**：`desc2:genesis|limbo` 查無此專輯（官方目錄無，僅 1992 bootleg 與 1969 年曲目〈In Limbo〉同名）；`desc2:ennio morricone|ennio morricone` 對應多張同名授權合輯無法鎖定版本。兩張皆已用**藝人／樂團層級保守簡介**上線（不提任何專輯specific資訊），比照 wave1 前例。另 `desc2:weezer|weezer` 已鎖定 1994 藍色專輯，屬假設待確認。
  - **研究層自我修正三例**：Iron & Wine《Hen's Teeth》非稀有曲合輯而是 2026 全新錄音室專輯；Johnny Cash《Keep on the Sunny Side》實為 The Carter Family 專輯、Cash 僅特別來賓；Sigur Rós《Liminal Sleep》是睡眠環境音樂企劃非錄音室專輯。三張皆照實際性質誠實書寫。
  - **額度事故（第三次）**：月額度於 020/021/022 進行中用罄，砍掉 8 個代理。再次驗證「先查檔案再重跑」：020 兩檔、022 研究五組全數存活直接沿用，021 writer-2 留有可刪修的初稿，實際損失僅一個寫手。
- 主要檔案：`desc-restyle/batches/w2-015~020-{final,kv}.json`、`batches/{research,hooks,input,output}/*`、`desc-restyle/progress.json`
- 驗證：六批 × `node qa-check-research.mjs` 全數「標記 0」；六批 × 線上抽驗 5 張皆 `OK KV-HIT` 且與 final 逐字相符。021 寫作中斷、022 研究完成待 hook、023/024 未開始，狀態與復工順序均記於 progress.json。

### 2026-07-28｜desc-restyle w2-014 上線＋管線模型裁定：hook／寫手層改用 Opus 5（累計 1,420/6,980）
- Repo：`desc-restyle`；`dip-vinyl-shop` 僅更新本備忘錄
- 改動：額度重置後跑完 w2-014（2010s 流行／獨立／迷幻 50 張，Taylor Swift ×4、Lana ×3、Tame Impala ×3 等），這是**第一個 hook＋寫手全用 Opus 5 的批次**：hook 五組品管一次全過（全波首見）、寫手兩檔 QA 一次歸零且主會話審稿零修，是整個 wave2 最乾淨的一批。店主據此裁定：**hook 與寫作層改用 Opus 5（額度為 Fable 一半、品質實測持平或更佳），研究層維持 Sonnet**；已寫入 `desc-restyle/RUNBOOK.md`。關鍵經驗：Opus 寫手提示必須保留「字數最重要＋寫完自己數、超 260 先砍再存檔」段落，這是其字數紀律優於前期 Sonnet 寫手的主因。
- 主要檔案：`desc-restyle/batches/w2-014-{final,kv}.json`、`batches/hooks/w2-014-hooks-*.json`、`desc-restyle/RUNBOOK.md`、`desc-restyle/progress.json`
- 驗證：QA 兩檔皆「標記 0」；線上抽驗 5 張全 `OK KV-HIT` 且與 final 逐字一致；至此 005–014 十批共 500 張全數上線，wave2 累計 1,420/6,980。

### 2026-07-27｜desc-restyle wave2 量產：批次 005–013 共 450 張簡介改寫上線（累計 1,370/6,980）
- Repo：`desc-restyle`（工具鏈與批次檔）；KV 為線上資料面，`dip-vinyl-shop` 本次僅更新本備忘錄
- 改動：延續路線一（研究快查＋寫手一次到位）跑完 w2-005～w2-013 共九批，每批 50 張，全部經 `qa-check-research.mjs` 標記歸零、主會話逐張審稿、`wrangler kv bulk put` 上線並線上抽驗五張確認 `X-Cache: KV-HIT` 且文字與 final 完全一致。批次主題依序為：005 八〇年代流行／後龐克／nu-metal、006 爵士經典、007 靈魂放克、008 R&B／neo-soul、009 黃金年代嘻哈、010 trip hop／當代嘻哈、011 嘻哈與 UK grime／IDM、012 電子舞曲／後搖、013 北歐電子／流行天后。
  - **審稿抓到的實質錯誤**（非僅字數）：Sepultura《Roots》被寫成「Cavalera 最後一張錄音室專輯」（實為在 Sepultura 的最後一張，他之後另組 Soulfly）；Air《Talkie Walkie》hook 稱「未假外部樂手」但正文寫了弦樂編寫者與客席主唱，屬 hook 與事實直接矛盾，改寫 hook 並同步 hooks／input 檔；Marilyn Manson《Mechanical Animals》漏交代 note 明令的隱藏訊息機制（黃字＋藍膜＝綠色）；Bruno Mars《24K Magic》句尾「該曲」指代斷裂。其餘高頻缺陷仍是正文重述 hook、超出 280 字硬上限、專輯名漏書名號。
  - **額度事故與教訓**：fable 月額度於本日用罄，前後砍掉 12 個子代理。**關鍵發現：被砍的代理多半已把檔案寫進 `batches/`**——009 前半、010 後半 9 張、012 前半、013 研究四組都完整存活，主會話直接本機接手審稿刪修（010 前半一次修 18 張超長），省下的重跑額度遠多於重發。之後遇代理中斷，**一律先檢查既有檔案再決定是否重跑**。主會話與子代理其後改用 Opus 5，字數控制明顯優於先前（013 首稿即落在 197–249，僅 3 張略長）。
- 主要檔案：`desc-restyle/batches/w2-005~013-{final,kv}.json`、`batches/output/*`、`batches/hooks/*`、`batches/research/*`、`desc-restyle/progress.json`、`dip-vinyl-shop/PROJECT_MEMORY.md`
- 驗證：九批 × `node qa-check-research.mjs` 全數「標記 0」；九批 × 線上抽驗 5 張皆 `OK KV-HIT` 且與 final 逐字相符。w2-014 依店主指示暫停於研究層完成、hook 僅 b 組（檔案留存於 `batches/research/w2-014-a~e.json` 與 `batches/hooks/w2-014-hooks-b.json`），復工只需補 a/c/d/e 四組 hook 再進寫作。

### 2026-07-23｜修抽卡自動播放不響：播放器改常駐掛載＋手勢當下解鎖
- Repo：`dip-vinyl-shop`
- 改動：店主回報抽卡結果沒點開就不會自動播。根因：`DipPlayer` 的音訊解鎖（`primePreviewFromGesture`）開頭 `if (!root) return false`——root 要 `mount()` 後才存在，而前一版把 mount 放在 `gpPlayPreview` 內，抽卡非同步流程跑完才第一次 mount；用戶點「直接來一張」的手勢當下播放器根本沒掛載、解鎖監聽不存在，等自動播放要響時已無手勢授權被瀏覽器擋掉（對戰頁能自動播是因為開頁就 mount）。修法：新增 `gpEnsurePlayer()`——把 `#gpPlayerMount` 改為常駐 `document.body` 的隱藏節點（不再放結果頁 HTML、不隨重繪銷毀），mount＋unlock 一次完成；再掛 document capture `pointerdown` 監聽，凡點擊 `.homehub-card / #genreContent / [data-special-draw] / [data-collect]` 就在手勢當下同步呼叫，涵蓋首頁入口、類型/藝人選項、再一張、重試、特殊抽卡券全部路徑。
- 主要檔案：`index.html`
- 驗證：三段 inline script `node --check` 通過；本機真實點擊（CDP trusted event）實測——pointerdown 命中 homehub 卡片後 `gpPlayerMount` 掛在 body、`dipAudioUnlock=1`；類型挑片走完三輪抽到結果，DipPlayer 自動進 `playing/itunes`、圖示顯示 ⏸，點一下暫停切回 ▶ 正常。教訓：**DipPlayer 解鎖必須「先 mount 再有手勢」，mount 放在結果渲染後等於永遠鎖死自動播放**。

### 2026-07-23｜結果頁試聽鈕改小型無框圖示＋抽到自動播放；串流按鈕文字置中
- Repo：`dip-vinyl-shop`
- 改動：店主嫌「▶ 試聽這張」全寬按鈕醜。改為 34×34 無框無底色小按鈕（15px 實心 SVG ▶／⏸，**不用 ⏸ 字符——iOS 會渲染成彩色 emoji**），置中放在三軸下方；抽到結果即自動播放（跟對戰一樣），播放中顯示 ⏸、點擊暫停。自動播放被瀏覽器擋或查無來源時安靜停在 ▶ 不 toast（`gpPreviewManual` 旗標——只有手動點擊失敗才 toast 錯誤代碼）。分享圖為手繪 canvas 本就不含按鈕，無需處理。另修 Apple Music 按鈕文字偏左：`.streaming-btn` 寬 77px 時「Apple Music」折兩行、按鈕沒設 text-align 導致折行靠左，補 `text-align:center`。設計先做預覽 mockup 給店主選定（只留圖示不加提示字、自動播放套用全部結果）。
- 主要檔案：`index.html`
- 驗證：三段 inline script `node --check` 通過；本機實測——按鈕 34×34、無框透明底、水平置中（187 vs 視窗中心 189，差為捲軸寬）、Apple Music `text-align:center`；自動播放於授權環境下圖示正確顯示 ⏸、DipPlayer 進 playing；無手勢／跨域被擋時安靜退回 ▶ 無 toast；手動點擊切換播放／暫停正常。注意：本機測試瀏覽器對 worker 網域的 fetch 授權會隨導航過期（S4 音檔錯誤、簡介空白皆此因），正式站不受影響。

### 2026-07-23｜類型挑片／直接來一張改抽本地卡池（提示詞選片全面退役）
- Repo：`dip-vinyl-shop`
- 改動：店主要求兩個抽卡入口不再靠 AI 提示詞現想專輯，全面改抽現成資料庫。
  1. **曲風欄批次**：新增 `scripts/build-seed-genres.mjs`——打 worker `/album-genres`（KV 幾乎全命中）為 `seed_cards.json` 每列補第 6 欄、`apex_pool.json` 每列補第 3 欄音樂地圖曲風 id 陣列。全池 6,439 張 seed（60 張查無曲風）＋ 628 張 apex 全數標完；腳本冪等、onboarding 追加新卡後重跑即可補缺。**卡池持續擴充中，程式一律以檔案當下內容為準，不得寫死張數。**
  2. **`submitGenrePick` 重寫**：店內在售與 IG reel 由各 15% 改為**各 10%**；其餘全部改抽本地池——類型挑片按曲風欄過濾、直接來一張抽全池；三位品味錨點保留 UI，改為本地權重（錨點在 GENRE_DATA 名單前半＝深挖名字→抽卡往高冷門度偏，`gpDeepness`＋距離加權取代 AI 錨點提示詞）。特殊模式機率照舊（殿堂/流亡/異端各 3%、流行 5%），殿堂/流亡/異端改抽 `apex_pool` 對應分類（類型挑片時只挑同曲風王牌，沒有就退回一般池；流亡不再即時查聽眾數——池子已預先驗證），流行＝seed 中高經典低硬蕊低冷門子集。`drawSpecialCard`（特殊抽卡券）同步改抽 apex_pool。
  3. **資料全走現成快取**：封面 `card_catalog`（後台校正優先）→ worker KV `/spotify-search` 鏈；簡介 `album_overrides.desc` → NEOCLASSIC 人工簡介 → 店家/IG 自寫 → `/album-desc`（KV 預生成，與卡片詳情同一套）；三軸直接用 seed 自帶數值（後台校正覆蓋，省一次請求）；結果頁新增「▶ 試聽這張」＝ DipPlayer（iTunes 30 秒、固定連結優先、`DipPreviewStatus` 無來源不顯示）。
  4. **刪除**：六種選片提示詞、GP_*_SEEDS、GENRE_DATA subframes、529 排隊/429 額度/JSON 解析容錯、`fetchAlbumListeners`/`ULTRA_OBSCURE_MAX_LISTENERS`、`streamText`、`gp_mode`。心情選歌（quiz）仍走原提示詞路徑，未動。
  5. **Onboarding 同步**：`verify-album-onboarding.mjs` published gate 改驗三軸取 `slice(2,5)` 並強制曲風欄存在（seed 第 6 欄／apex 第 3 欄）；ALBUM_ONBOARDING.md 與兩份 dip-card-pool-expand SKILL.md 補格式與補欄指令。battle/roguelike/admin 均為前欄解構，新欄相容已確認。
- 主要檔案：`index.html`、`seed_cards.json`、`apex_pool.json`、`scripts/build-seed-genres.mjs`、`scripts/verify-album-onboarding.mjs`、`ALBUM_ONBOARDING.md`
- 驗證：三段 inline script `node --check` 通過；本機 http-server 實抽——直接來一張連抽三張皆本地池且不重複（seen 過濾生效）、類型挑片選 Jazz 走完三輪錨點抽到 jazz 標籤卡、三軸星數與 seed 數值逐一比對一致（4/1/1）、「▶ 試聽這張」實際播放成功並可停止、「再一張」正常；battle.html 與 roguelike.html 載入六欄 seed／三欄 apex console 零錯誤；`/album-desc` 抽測三張全 KV-HIT（測試瀏覽器擋跨域 fetch 導致面板顯示暫無介紹，屬測試環境限制，正式站同路徑即卡片詳情現行路徑）；build-seed-genres 重跑 0 補抓確認冪等。

### 2026-07-21｜音樂地圖 albums 掉隊偵測（healthy() 加一致性不變式）＋收合條顯示點數
- Repo：`dip-vinyl-shop`
- 改動：店主回報 pvp 收合條寫「收藏 1 張」但展開地圖有滿滿資料。查證實際資料為 `albums=1` 而 `credits` 合計 **29 點**（Folk 7／Hip-hop 6／Soul 5／Classical 3／Pop 2／Blues 2／Jazz・Rock・Electronic・World 各 1）——`musicMap.albums` 掉隊沒跟著累加，但摘要算出的主路徑（民謠／嘻哈）是正確的。
  - **根因為何沒被自動修**：`music-map.html` 的 `healthy()` 只檢查欄位存在與非負，**完全沒驗張數與點數的關係**，所以這種壞資料被判為健康，永遠不會觸發 `build()` 重建。三個寫入點（`index.html:908`／`battle.html:635`／`roguelike.html:443`）現行邏輯都是 albums 與 credits 一起 `increment(1)`，判斷是舊版資料殘留。
  - **修法**：新增 `consistent(value)` 不變式——**一張專輯最多讓每個曲風各 +1 點，故 `max(credits) ≤ albums` 且 `untagged ≤ albums` 必然成立**——併入 `healthy()`。店主的資料 Folk 7 > albums 1 即判為不健康，下次開 `music-map.html` 會自動從唱片櫃完整重建。
  - `pvp.html` 收合條摘要改為「收藏 N 張 · M 點 · 主路徑 X / Y」，張數與點數並列，日後對不上一眼可見。
- 主要檔案：`music-map.html`、`pvp.html`
- 驗證：Node 跑 8 組 `healthy()` 案例全數符合預期——店主實際壞資料判 false、重建後正確資料判 true、空地圖 albums=0 判 true、單張跨界 albums=1/兩曲風各 1 判 true（不誤殺）、count>1 重複盤 albums=5/單曲風 5 判 true、全未分類 untagged=albums 判 true、untagged>albums 判 false、舊 v1 判 false；`music-map.html` 模組腳本 `node --check` 語法通過。`pvp.html` 瀏覽器實測三種摘要字串（含最長「收藏 1234 張 · 5678 點 · 主路徑 嘻哈 / 世界」）均維持單行、列高 65px、文字置中於 x=188、縮圖不溢出左邊界。**注意**：重建會按唱片櫃實際內容重算 credits，對戰取得但未進唱片櫃的卡其點數可能因此變動；已領里程碑獎勵記在 `musicMapRewards`，不受影響。

### 2026-07-21｜品味生死鬥大廳改回原排版，只把音樂地圖收成第一列（修正同日前一筆）
- Repo：`dip-vinyl-shop`
- 改動：店主看過並排雙卡版後決定**保留原本的直式全寬排版**，只採用地圖收合的做法。因此把 `pvp.html` 的 hero（含兩行副標）、`.cards` 直式全寬卡、置中文字、右側箭頭全部還原成改版前的樣子；音樂地圖不再放在 hero 與卡片之間佔 370px，而是變成 `.cards` 清單的**第一列**收合條（65px：40px 迷你雷達＋「我的聆聽品味地圖／收藏 N 張 · 主路徑 X / Y」＋展開箭頭），點擊才在原地展開完整 compact 地圖，狀態存 `localStorage` 的 `dipPvpMapOpen`（預設收合）。展開面板內隱藏 widget 自己的標題列（`.music-map-head`），避免與收合條標題重複。收合條內容用 `max-width:760px` 置中，桌機才不會貼齊最左。前一筆的 `:hover` 包 `@media (hover:hover)`、補 `:active` 觸控回饋、`:focus-visible` 保留；`music-map-widget.js` 的 `ranking`／`summary`／`thumb` 三個新匯出續用。
- 主要檔案：`pvp.html`
- 驗證：本機瀏覽器實測——iPhone 375×812 收合時地圖列 y=181 高 65px，兩張入口卡 y=246／355 各高 109px，內容到 464px 收尾，**兩個入口完整在第一屏**（改版前落在 700px 之後）；展開後地圖列 492px、最後一張卡底 891px、無橫向捲動；桌機 1280 版面與原版一致、`scrollWidth` 無溢出；截圖確認展開後不再有重複標題；`aria-expanded` 與 `localStorage` 開關切換正確；console 零錯誤。

### 2026-07-21｜品味生死鬥大廳版面重排（兩個入口優先、音樂地圖收合）
- Repo：`dip-vinyl-shop`
- 改動：店主反映 `pvp.html` 大廳「地圖太大、兩個對戰選項被壓在底部很難按」。實測 iPhone 375×812 下地圖區佔 ~370px（46% 螢幕），兩張入口卡落在 700px 之後、iPhone SE 完全在摺線下。採「優先權對調」方案：
  1. **兩個對戰入口上移並排**：`.deck` 改 2 欄格線放在 hero 正下方，直式卡（編號／名稱／描述／右下箭頭），卡高固定 148px（<400px 螢幕 138px）。
  2. **音樂地圖降級為可收合摘要條**：新增 `.mapbar`，收合時只有 70px 一條——44px 迷你雷達縮圖 ＋「收藏 N 張 · 主路徑 X / Y」一行字；點擊才展開完整 compact 地圖，開關狀態存 `localStorage` 的 `dipPvpMapOpen`（預設收合）。
  3. **hero 瘦身**：刪掉兩行副標（文案併入卡片描述），padding 40→26。
  4. 順手修：箭頭改 `position:absolute` 釘在卡片右下、不再與描述文字重疊；`:hover` 包進 `@media (hover:hover)` 並補 `:active` 給觸控回饋；地圖預設收合所以不再有 Firestore 回來才撐開高度的版面跳動。
  - `music-map-widget.js` 新增三個匯出供摘要條使用：`ranking(data)`（依點數排序、含中文名）、`summary(data)`（張數／點數／前兩大路徑）、`thumb(data)`（只有外框＋形狀的迷你 SVG）＋對應 `.music-map-thumb` 樣式；皆為新增，既有 `mount` 行為不變，其他頁面（`index.html` 等）沿用 `?v=12` 不受影響，`pvp.html` 引用改 `?v=13`。
- 主要檔案：`pvp.html`、`music-map-widget.js`
- 驗證：本機瀏覽器實測——iPhone 375×812 第一屏總高 **340px**（原 ~775px），兩張卡位在 y=116–256 完全在上半部，各 166.5×138px；展開地圖後 mapbar 488px、頁面不橫向捲動；桌機 1280 寬置中 680px、`scrollWidth` 無溢出；箭頭與描述經幾何量測確認無重疊；收合開關 `aria-expanded` 正確切換；console 零錯誤。開工前交接：`git fetch` 遠端無新提交，工作區僅先前已刪的 `audio-debug.html` 與未追蹤 `data/apple-audio-map-*.json`，無衝突。

### 2026-07-20｜對戰旅途六項改進（音樂、整備維修、對手卡池、無限續戰、手牌長按）
- Repo：`dip-vinyl-shop`
- 改動：依店主六點需求改 `roguelike.html`：
  1. **抽/撿盤彈窗播試聽**：`openDrawReveal`（單張）與 `openLootReveal` 加上像素唱機 `rogueMiniPlayer` 與 `playRogueAlbum(c)`，跟唱片資訊同一套；確認帶走時 `_takeDrawnCard`／`confirmLoot` 停播（`DipPlayer.stop`）。
  2. **標題正名**：卡片資訊彈窗標題「卡片資訊」→「唱片資訊」。
  3. **整備即可維修/升級**：`openLoadout` 每列加「🔧 保養/升級」鈕（`loCare`→`openRelicCare`，疊在整備面板上），面板標頭補現金顯示；`refreshCareContext` 增補 `loadoutMask` 開著時重繪。**這推翻先前「保養只能趟間」的經濟決策**——店主要求每場結束整備時就能花現金維修＋升級（出戰欄上限仍維持 `wearSlots()`＝3，只是換裝/維修更自由）。
  4. **對手用完整卡池、照深度撈**：新增 `enemyPoolBag(d)`——從 `allPool()`（5600+ 張）撈，品質下限 `minSum=min(13,3+floor(d*0.7))` 隨深度爬升（d1→門檻3幾乎全池、d12→只剩最強約 400 張）；`enemyForDepth` 與補牌共用，移除舊的 `ranked/strongBag/wildBag/bandN` 固定強牌帶。
  5. **牌出完不結束、補三張續戰**：新增 `refillDeck(side)`——**雙方都從卡池隨機補**（玩家 `allPool()` 非王牌、對手 `enemyPoolBag(depth)`），各 3 張，補的牌是 `copyCard` 進 `G.p/e.deck`、**只在本場用、不寫回 `RUN.deck`、打完即棄**；`resolveTurn` 抽牌前偵測牌庫空即補，刪掉「任一方無牌→速判」；`startTurn` 的 `aiPlan()` 落空改為補牌重規劃；免死續戰路徑同步補牌。打到一方 HP 歸零才分勝負。
  6. **手牌長按看簡介＋試聽**：新增 `attachHandPress(el,card)`（450ms 長按→`openCardInfo`），`renderHand` 逐格掛上；`selectCard` 加 `_handHeld` 守門避免長按誤選。
- 主要檔案：`roguelike.html`
- 驗證：本機 http-server（localhost:8788）載入 console 零錯誤；JS 實測——`allPool()`=5619、`enemyPoolBag(1)`=5571／`enemyPoolBag(12)`=401（深度分級生效）；用 `initRun('guard')`→塞 5 種子→`startRun()` 實開第 1 場，雙方手牌各 5、手牌 tile 5 格、敵牌全來自卡池且非王牌；深度 9 `refillDeck` 雙方各補 3 張、uid 齊、敵補平均總星 10.3；`openCardInfo` 標題顯示「唱片資訊」且含唱機；`openLoadout` 顯示「🔧 保養/升級」＋現金、`loCare`→保養視窗含維修＋升級、`doRepair` 實測耗損 40→0；`openDrawReveal` 含唱機、`confirmDraw` 正常關閉。開工前交接：`git fetch` 遠端無新提交、工作區僅 `data/` 未追蹤，無衝突。

### 2026-07-19｜配件像素圖真正隨等級進化（85 張手繪圖，取代等級外框）
- Repo：`dip-vinyl-shop`
- 改動：店主要的是「像素圖本體進化」而非只加外框。手繪 17 件 × Lv.1~5＝85 張專屬 12×12 像素圖並接進遊戲：Lv.1 陽春／磨舊 → Lv.2 標準（沿用原圖）→ Lv.3 進階材質 → Lv.4 鍍金精品 → Lv.5 傳說（金件＋星光）。演化有劇情感：集點卡點數 1→3→6→銀卡→金 VIP、洗碟水半瓶→滿瓶→金噴頭、名片 Lv.4 翻霧黑卡→Lv.5 黑金卡、唱針鈍尖→金尖→銀唱頭→金唱頭→鑽石針尖等。新增 `PIX_ICONS_LV` 資料表與青光色 `c:#3fb6c9`；`relicIconHTML(r,size,lvOverride)` 改依當前等級取 `PIX_ICONS_LV[icon][lv-1]`，缺表（後台自訂件）退回 `PIX_ICONS`、再無則 emoji；移除上一版的「等級外框」疊加邏輯（`LV_DECO`）與 `.lvspark`，改為 Lv.5 外圈淡金光暈 `.pixlv5` 脈動（`prefers-reduced-motion` 關閉）。藏家升級卡片仍預覽下一級圖。全站顯示點沿用同函式自動生效；admin 無需改（只存 icon 鍵，不畫等級圖）。
- 主要檔案：`roguelike.html`、`ROGUELIKE_DESIGN.md`
- 驗證：先產 85 張獨立預覽頁經店主確認；接進後 Node `--check` 語法通過；本機 http-server 實跑 console 驗證五級圖各異（SVG 長度/ rect 數不同）、Lv.5 帶 `.pixlv5`、17 件全覆蓋 `PIX_ICONS_LV`、emoji 自訂件正確退回、藏家升級預覽下一級；實際遊戲畫面截圖確認 17 件五級皆用遊戲真函式渲染出不同圖、Lv.5 金光暈可見；頁面載入 console 零錯誤。開工前交接：codex 已推 3 筆（Apple 音源二輪、四平台串流連結，動到 roguelike.html 的簡介區塊），與本次圖示程式不重疊、本機 HEAD 已含其提交、無衝突。

### 2026-07-19｜專輯簡介改為四平台串流連結
- Repo：`dip-vinyl-shop`
- 改動：單場對戰與 Roguelike 的專輯簡介、勝利抽盤及撿盤視窗，將原本單一「串流聽這張」改成與首頁抽專輯卡相同的 Apple Music、Spotify、YT Music、Bandcamp 四平台列；Apple／Spotify／YT 提供立即可點搜尋，Spotify 背景換成專輯直連，Bandcamp 只有確認到正式專輯頁才啟用。Apple 試聽成功後 Apple Music 鍵會換成內容直連，並補上 iTunes 試聽來源標示。
- 主要檔案：`battle.html`、`roguelike.html`
- 驗證：兩頁共五段 inline script 全數通過 Node module 語法檢查；確認舊單一串流按鈕與函式已移除，四平台元件、非同步直連更新與 iTunes 來源標示均存在，`git diff --check` 通過。正式站桌面版實際開啟對戰專輯簡介，四平台列、Apple／Spotify 專輯直連與 Bandcamp 無結果停用狀態正確；390×844 手機版四鍵維持單列，頁面、簡介與按鈕列皆無橫向溢出，console 零錯誤。Roguelike 正式站亦確認新版四平台模板已上線、390px 頁寬無溢出且 console 零錯誤。

### 2026-07-19｜Apple 音源第二輪安全補查
- Repo：`dip-vinyl-shop`
- 改動：確認 6,126 張卡實為 6,122 個唯一專輯加 4 個標點／大小寫重複別名，修正品質 gate 的完整覆蓋算法；新增第二輪 Apple 專輯層級搜尋，依序檢查 TW／US／JP／GB storefront，並以 collectionId 回查實際試聽後才接受高信心配對，模糊結果保留待人工確認。
- 主要檔案：`scripts/build-apple-audio-map.mjs`、`scripts/verify-apple-audio-map.mjs`、`scripts/refine-apple-audio-map.mjs`
- 驗證：三支腳本均通過 `node --check`、`git diff --check`；完整覆蓋檢查為 6,126 張卡／6,122 唯一專輯／4 重複別名／0 缺漏並通過；以前三筆無試聽項目試跑，正確補回 The Allman Brothers Band《At Fillmore East》，另兩筆維持無試聽。

### 2026-07-19｜配件像素圖示隨等級進化（等級鑲框）
- Repo：`dip-vinyl-shop`
- 改動：發燒配件的 12×12 像素圖示會隨 Lv.1~5 越來越高級——本體不重畫，`relicIconHTML` 把 viewBox 外擴一圈疊「等級鑲框」：Lv.1 素面 → Lv.2 四角銅釘 → Lv.3 銀色 L 形角框 → Lv.4 金色角框 → Lv.5 金滿框＋兩點星光交錯閃爍（`.lvspark` CSS 動畫）。全站沿用同一個函式，開戰前選單／整備面板／圖鑑／保養視窗／戰鬥列自動生效；藏家三選一的「升級」卡片圖示先預覽下一級外框（`relicIconHTML(r,36,lv+1)`）。emoji 自訂圖示（後台加的）維持原樣不加框。
- 主要檔案：`roguelike.html`
- 驗證：本機 console 逐級檢查 SVG 結構（Lv.2 +4 銅釘、Lv.3/4 +12 角框、Lv.5 +52 滿框＋2 星光、viewBox 12→14）；產出 17 件 × 5 級的獨立預覽頁人工目視確認；頁面載入無 console 錯誤。

### 2026-07-19｜發燒配件大改版：五階品相、毀損即移除、Lv.1~5 升級制
- Repo：`dip-vinyl-shop`
- 改動：依店主三點指示優化發燒配件系統。①品相改唱片行邏輯五階：只有耐久 100 算「全新」，1 點耗損就掉「近全新」（M 0／NM 1–39 皆 ×1 → VG 良品 40–69 ×0.6 → G 堪用 70–99 ×0.3 → F 毀損 100）；各類別語彙補到五階（耗材滿瓶→空瓶、唱針全新→斷針）、戰鬥列耗損條改 5 格。②耐久磨到 0＝整件毀損、直接從收藏移除（`META.relicsOwned` 新欄位＝現持有清單；`relicsSeen` 仍當圖鑑永久點亮，未持有顯示「已毀損 · 未持有」），只能再打贏傳說藏家重新入手；原「♻ 回收報廢件」機制與報廢保養分支全數移除；洗碟水保養改在毀損判定前結算（最後一口氣救得回）。③新增配件等級 Lv.1~5（`META.relicLv`，跨趟且毀損後保留、帳號合併取較高）：fx＝Lv.1 起始值（整體壓低，如開局氣勢 2→1、輾壓傷 2→1、經驗 +25%→+10%）、fx5＝Lv.5 滿級值，線性內插（`fxAt`）；desc 用 `{v}` 帶入當前數值；升級管道＝藏家三選一撞已持有同款（免費升一級＋整新，滿級退出掉落池）或花現金升級（`CASH.upCost` 60/100/150/220、tier2 ×1.5，不附整新）；每級再 −6% 磨損（`WEAR.lvDura`）。神秘見本盤免死回魂 HP 改隨等級（4→10）。admin.html 同步：`DEF_ROGUE.relics` 更新＋配件編輯器加「Lv5 值」欄；roguelike `applyConfig` 對舊版後台存檔自動補回 `fx5`／`{v}` desc。
- 主要檔案：`roguelike.html`、`admin.html`、`ROGUELIKE_DESIGN.md`
- 驗證：本機 http-server 載入 roguelike.html／admin.html 皆無 console 錯誤；console 實測品相階梯門檻（0 全新／1 近全新／100 毀損）、fxAt 內插（唱針 1/2/3）、desc 帶值、升級成本表與 tier2 倍率、舊存檔 `relicsOwned` 遷移（耗損 100 的自動剔除）、applyWear 毀損整件移除（RUN＋META 同步、等級保留）、`upgradeRelic` 整新、滿級退出 relicPool、保養視窗與毀損播報渲染全數正確；Node `--check` 兩檔 script 語法通過。

### 2026-07-19｜像素唱機搬進專輯介紹彈窗、兩遊戲介紹版面統一
- Repo：`dip-vinyl-shop`
- 改動：依店主指示把像素唱機從戰場移進「專輯介紹（卡片資訊）」彈窗：battle 移除牌桌正中央的 `#battleMiniPlayer`、roguelike 移除我方小人旁那台，唱機改為彈窗內「三屬性下方、簡介上方」置中一台，播放時唱盤轉動＋音符飄出，點一下靜音停播、再點恢復播放目前這張（battle 用 recModal 事件委派，roguelike 用全域 `toggleCardInfoMusic()`；皆記住彈窗當前卡片以便恢復）。修正 roguelike 介紹彈窗三屬性跑版的根因：`.st` 的橫排規則只套在 `.card .st`，彈窗內沒套到，且屬性名稱誤吃 `.drawcard .lab` 金色大標樣式——補上 `.drawcard .st`／`.st .lab` 專屬規則，名稱＋星格同列、整組置中。單場對決的卡片資訊彈窗改成與 roguelike 一致的排版：封面→藝人→專輯→王牌徽章→三屬性星格（同色 pips、出招屬性名稱金色）→唱機→簡介→「▶ 串流聽這張」（雜牌不給串流鍵；battle 補上 `--classic/--obscurity/--accessibility` 色票與 `streamSearchUrl`/`hookStreamLink`，先給 Spotify 搜尋連結、抓到直連再換上）。
- 主要檔案：`battle.html`、`roguelike.html`
- 驗證：本機 http-server 實跑兩頁。battle：牌桌中央唱機消失；出牌後點檯面卡，彈窗順序與置中量測（stats/唱機 center offset 皆 0、三列 lab/pips X 對齊）、唱機 playing→點擊 muted 停播→再點恢復 playing、串流鍵存在。roguelike：戰場上無唱機；彈窗屬性名稱恢復灰 9px 非大寫、名稱與星格同列、整組置中、唱機置中並可靜音/恢復。兩頁手機 375px 寬皆無橫向溢出、彈窗內容置中完整。console 全程無 error。截圖工具逾時（既知環境問題），以 DOM 幾何量測代替。

### 2026-07-19｜啟動全卡池 Apple collectionId 預匹配管線
- Repo：`dip-vinyl-shop`
- 改動：依店主指示，將播放來源方向改為事先替 5,526 張 seed 卡與 600 張 apex 卡（共 6,126 張不重複專輯）建立 Apple 音源對照，不再於玩家點開介紹時依名稱臨時猜測。新增可中斷續跑、原子保存的批次工具：以保守速率查 TW／US storefront，嚴格核對藝人、專輯、合作藝人及版本，保存 `collectionId`、storefront、正式名稱、試聽數與代表 preview；低信心結果不強配，區分待複核、Apple 無試聽與查詢錯誤。第一批 1,000 張完成後會先通過結構、成功率、錯誤率與真實 `/lookup` 抽驗 gate；通過後自動重新分類第一批模糊結果，再接續掃完剩餘卡池。加入每小時進度／完成通知，遇品質 gate 失敗會停止，不會重複啟動批次。
- 主要檔案：`scripts/build-apple-audio-map.mjs`、`scripts/verify-apple-audio-map.mjs`、`scripts/continue-apple-audio-map.mjs`、`.gitignore`；執行中產物位於 `data/apple-audio-map-*.json`
- 驗證：三支腳本通過 `node --check`；前 5 張實跑可即時續存，3 張精準匹配、2 張保守列待確認、0 API 錯誤；部分資料執行品質檢查為 matched rate 86.41%、0 結構問題、0 錯誤並通過。第一批與後續全卡池程序仍在背景執行，完成後另新增最終結果紀錄。

### 2026-07-19｜修正 Apple 台灣區在地化藝人名與週年重製版配對
- Repo：`dip-vinyl-shop`
- 改動：店主回報 The Clash《London Calling》、Diana Ross《Swept Away》與 Ol' Dirty Bastard《Return to the 36 Chambers: The Dirty Version》無音樂。逐張查 Apple 台灣區 Search JSON，確認前兩張的 `artistName` 被在地化成「衝擊合唱團」「黛安娜羅絲」，第三張只回傳帶 `(25th Anniversary Remaster)` 的版本；舊邏輯因此分別在藝人與專輯版本比對階段排除。現在當搜尋詞與專輯已吻合、輸入為拉丁藝人名但 Apple 回傳 CJK 在地化名稱時允許配對，拉丁字翻唱／同名專輯仍需通過原藝人檢查；版本清理則會整段移除含 remaster／anniversary／deluxe 等關鍵字的括號，避免殘留 `25th`。音訊仍沿用 v17 的純 Web Audio、50% 音量與 1.5 秒淡入淡出；快取參數升至 v18。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：`node verify-playback.mjs` 全數通過，新增三張實際 Apple TW 回傳型態的回歸。手機文字閘道真實查詢三張皆 200，修正後分別配對 23、10、18 首；本機真實瀏覽器逐張連線 Apple 並播放成功，狀態皆為 `playing/itunes`，console 無 error／warning。`node --check dip-player.js` 通過。

### 2026-07-19｜手機 Apple 試聽改走純 Web Audio，消除起播 100% 音量旁路
- Repo：`dip-vinyl-shop`
- 改動：店主真機確認上一版只有關閉介紹時會瞬間降到 50% 再淡出，點開介紹仍以 100% 突然起播。根因是 iOS 的 `MediaElementAudioSourceNode` 路由不穩定：雖然程式先把 GainNode 設為 0，實際 `<audio>` 聲音仍可能繞過節點直接輸出。本次不再讓 Apple `.m4a` 進入 `<audio>`：改為 CORS 抓取試聽檔、`decodeAudioData` 解碼，再以唯一的 `AudioBufferSourceNode → GainNode → destination` 路徑播放；起播前 Gain 固定為 0，開始後 1.5 秒線性升至 0.5，關窗仍以 1.5 秒降至 0 才停止。`<audio>` 只保留全靜音手勢解鎖，不會收到真實試聽 URL。快取參數升至 v17。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：`node verify-playback.mjs` 全數通過，明確檢查真實 Apple URL 只被 fetch／解碼、BufferSource 只能接到 GainNode、起播 0→0.5／1.5 秒與關窗 0／1.5 秒後才停止；`node --check dip-player.js` 通過。390×844 真實瀏覽器完成對局並點敵方 Todd Rundgren《Runt》：介紹開啟後成功進入 playing，頁面 `<audio>` 仍只有靜音 blob（沒有 Apple 真實音檔旁路），關閉介紹後播放狀態結束，console 無 error／warning。

### 2026-07-18｜手機 iTunes 查詢加入可用備援，介紹關閉淡出通過 390px 實測
- Repo：`dip-vinyl-shop`
- 改動：店主回報 Windows 已正常、手機仍抓不到 iTunes 且關閉介紹沒有淡出。再次分離驗證後確認：手機當時只停在手勢解鎖用的靜音 WAV，根本沒有取得試聽音檔，因此不是 GainNode 的 1.5 秒參數失效；Apple 同時也會封鎖 Cloudflare Worker 機房出口，不能把查詢單純搬到 Worker。播放器新增行動裝置專用查詢順序：手機先透過文字讀取閘道取得 Apple 公開 Search JSON，桌面維持官方 JSONP 優先，兩條路最後都只播放 Apple CDN 原始 `.m4a`，共同套用 Web Audio 的 50% 音量、1.5 秒淡入與 1.5 秒淡出。單場介紹關閉改為只要視窗原本開著就一律呼叫淡出停止，涵蓋手機關閉鈕、遮罩與 Esc；試煉頁原有關閉鈕／遮罩亦維持同一路徑。快取參數升至 v16。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：`node verify-playback.mjs` 全數通過，涵蓋手機閘道優先、桌面 JSONP 優先／失敗再備援、50% 增益、1.5 秒淡入及關窗淡出。390×844 本機真實瀏覽器完成一回合並開啟 Robbie Basho《Visions of the Country》：成功載入 Apple `.m4a` 且播放時間前進；關閉後 0.3 秒視窗已消失但音訊仍在淡出、約 1.5 秒後才 pause（非突然停止）。`node --check dip-player.js` 與 `git diff --check` 通過。

### 2026-07-18｜關閉專輯介紹時同步讓音樂淡出停止
- Repo：`dip-vinyl-shop`
- 改動：店主確認 Windows 桌面版的點擊播放、1.5 秒淡入淡出與 50% 音量皆正常後，新增介紹視窗生命週期連動：單場對戰與無止盡試煉在按關閉、點遮罩外或（單場）按 Esc 關閉專輯介紹時，播放器會從當下音量淡出 1.5 秒至 0，再真正 pause。單場對戰共用的「出過的牌」清單視窗不會誤停音樂；淡出期間若立刻點另一張專輯，舊停止計時器會被取消，不會誤停新音樂。播放器快取參數升至 v15。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`verify-playback.mjs`
- 驗證：`node verify-playback.mjs` 全數通過，新增關窗後不立即 pause、Web Audio 於 1.5 秒 ramp 至 0、淡出完成才停止，以及淡出途中換專輯不受舊計時器影響的回歸；`battle.html`、`roguelike.html` 內嵌腳本通過 `node --check`；`git diff --check` 通過。

### 2026-07-18｜對戰改用可控音量的試聽來源，真正落實 1.5 秒淡入淡出與 50% 音量
- Repo：`dip-vinyl-shop`
- 改動：店主真機回報 v13 仍會突然全音量出聲。重新追查確認根因是 iPhone／iOS 不允許網頁控制 YouTube iframe 音量，`setVolume()` 模擬雖通過、真機卻會被平台忽略。為避免突發聲音，單場對戰與無止盡試煉改為點介紹時才查詢並播放可經 Web Audio GainNode 控制的 iTunes 30 秒試聽：同一點擊手勢先解鎖音訊圖，再從 gain 0 線性淡入 1.5 秒至 0.5；揭牌時不再預抓無用的 YouTube／Spotify，找不到試聽時也不退到無法保證音量的 YouTube。共用音量由 30% 改為店主指定的 50%。桌面仍使用 YouTube 的其他路徑也加強為載入與 buffering 全程 mute，確認目標影片播放後才在音量 0 解除靜音並淡入。播放器快取參數升至 v14。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`verify-playback.mjs`
- 驗證：`node verify-playback.mjs` 全數通過，新增 Web Audio gain 由 0 在 1.5 秒 ramp 至 0.5、YouTube 於 0 音量才解除靜音、`itunes-only` 不得退 YouTube 三項回歸；`battle.html`、`roguelike.html` 內嵌腳本通過 `node --check`；本機真實瀏覽器完成一回合後點我方檯面專輯，介紹正常開啟、實際載入 Apple `.m4a` 試聽並持續播放，console 無 error／warning；`git diff --check` 通過。

### 2026-07-18｜對戰音樂改為點專輯介紹才播放；修正 YouTube 1.5 秒淡入被覆蓋
- Repo：`dip-vinyl-shop`
- 改動：單場對戰與無止盡試煉全面移除每回合勝方自動播放；揭牌仍只做背景預抓，玩家主動點擊敵方或我方專輯、介紹視窗實際開啟時才播放。追查 1.5 秒淡入未生效的原因，是 YouTube 首次手勢解鎖排定的 160ms 清理動作會在真實專輯已開始後仍把音量直接設為 30%，中途蓋掉淡入；現在以播放 generation 防止舊清理動作干擾新播放，原有 30 秒片段結尾 1.5 秒淡出計時維持。播放器快取參數升至 v13。
- 主要檔案：`battle.html`、`roguelike.html`、`dip-player.js`、`index.html`、`verify-playback.mjs`
- 驗證：`node verify-playback.mjs` 全數通過，新增 YouTube 解鎖清理不得在淡入期間直接跳至 30% 的回歸；抽取 `battle.html`、`roguelike.html` 內嵌腳本後以 `node --check` 確認語法通過；`rg` 確認勝方播放函式／呼叫已移除，單場與試煉只剩介紹開窗觸發播放；`git diff --check` 通過。

### 2026-07-18｜全站音量 30%＋1.5 秒淡入淡出；修好 CJK 專輯的 YouTube 備援
- Repo：`dip-vinyl-shop`、`dip-vinyl-worker`
- 改動：店主回報混合版已能播多數專輯，但伍佰、閃靈、JAGATARA、三上寬等仍 S1（iTunes 被封且 YouTube 備援落空）。兩線處理：(1) 依店主要求，所有播放（唱片櫃／對戰／roguelike）音量降為 30%，開頭 1.5 秒淡入、結尾 1.5 秒淡出——iOS 忽略 `audio.volume`，iTunes 路徑改走 Web Audio GainNode（audio 元件加 `crossOrigin`，Apple CDN 帶 ACAO:* 不會被靜音；AudioContext 在手勢內建立／resume），YouTube 路徑用 `setVolume` 漸變；快取參數升 v12。(2) 追查 YouTube 備援落空根因是 worker 比對太嚴：閃靈敗在雙語標題（賽德克巴萊 Seediq Bale）與別名藝人（閃靈樂團），JAGATARA／三上寛敗在英文介面把標題羅馬拼音化。worker `/yt-music-link` 補三招：解析清單列（musicResponsiveListItemRenderer，冷門藝人沒有頂部大卡片）、寬鬆比對（專輯名允許包含、藝人逐 token 命中）＋頂部大卡片信任備援、CJK 查詢在英文介面落空後改用原文介面（ja／zh-TW／ko）重試。空結果快取由 6 小時降為 15 分鐘、快取鍵升 v5；shop 端 YouTube 空結果也比照 iTunes 套 15 秒重試窗。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`、`dip-vinyl-worker/src/index.js`
- 驗證：shop `verify-playback.mjs` 全數通過；真實瀏覽器 harness 攔截 AudioContext 實測——增益淡入後停在 0.3、RMS 0.083 證明未被 CORS 靜音、29 秒起漸弱 30 秒歸零停止。worker 部署後實測：三上寛（寬／寛皆可）、閃靈兩張、JAGATARA、伍佰全數解析出專輯清單與 highlight，Rolling Stones／辛曉琪迴歸正常。

### 2026-07-18｜唱片櫃改混合播放：iTunes 優先、失敗自動退 YouTube
- Repo：`dip-vinyl-shop`
- 改動：店主真機回報代碼 S8＋S1，證實其 iPhone 所有網路出口 IP 都被 Apple `/search` 長效封鎖（店主無 iCloud+，排除私密轉送因素；本機桌面同時段正常，確認是出口 IP 問題）。經店主選擇採混合方案：`prefer:'itunes'` 的搜尋順序改為 `['itunes','youtube']`——iTunes 可用時播真 30 秒試聽＋唱盤曲目列表；被封鎖（S1）或查無（S3/S4）時自動退到對戰同款、已在 iOS 驗證過的 YouTube 高觀看曲目 30 秒片段。播放成功的狀態事件先清空曲目欄位再展開結果，避免退 YouTube 時殘留上一張的 iTunes 列表；唱片櫃預抓同時抓 YouTube 連結（走 Worker KV 快取）讓備援即點即播。快取參數升 v11。治本備案（離線建 collectionId 表＋執行期 `/lookup`，被封 IP 實測仍可用）留待日後需要時再做。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`
- 驗證：`verify-playback.mjs` 新增「prefer itunes 在 Apple 失敗時退 YouTube、曲目列表清空」回歸，並確認雙雙失敗時仍回報 S 代碼；全部案例通過。

### 2026-07-18｜修正點擊永遠吃到快取空結果的 bug，失敗 toast 保證有代碼
- Repo：`dip-vinyl-shop`
- 改動：店主真機回報 v9 仍失敗且 toast 沒有任何 SX 代碼。追查發現 `playAlbum` 只在快取為 null 時才呼叫 `loadCachedSource`，因此頁面載入時前 4 張預抓一旦失敗被記成空結果後，之後點擊永遠直接拿快取的空資料——既不會過重試窗重新查詢、也沒有任何失敗代碼（「15 秒可重試」只對預抓有效，對點擊無效）。修正：`playAlbum` 一律經過 `loadCachedSource`（內部本來就會回快取並處理空結果重試窗），並在錯誤事件加 `S8` 保底代碼（＝沒有發出新查詢就失敗，通常是重試窗內的快取空結果），確保 toast 一定有代碼可回報。快取參數升 v10。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`
- 驗證：`verify-playback.mjs` 新增「首次真查詢回 S4:n、重試窗內再點回 S8」回歸並全數通過；真實瀏覽器 harness 以修正後檔案重測 Beware，自動播放與 11 首播放列表正常。

### 2026-07-18｜唱盤機下方加播放列表、失敗診斷代碼；確認 Apple 封鎖會自動過期
- Repo：`dip-vinyl-shop`
- 改動：本機實測確認三件事：(1) Apple 對 `/search` 的 IP 封鎖是長效但**會自動過期**（本機上午還全 403，晚間已恢復 200），店主 iPhone 全數失敗即是他用過的網路出口 IP（含行動網路 CGNAT、可能還有 iCloud Private Relay 的共用出口）被舊版全量預抓打進封鎖名單；(2) 被封期間 `/lookup` 與試聽音檔 CDN 仍可用，是日後備援方向；(3) Deezer API 在台灣回空 data（地區限制），**不能**當備援來源。本次上線：唱盤機下方新增小型像素風播放列表（曲序＋曲名，點任一首即在同一顆已解鎖 audio 元件換源播放，並附 Apple Music 商店連結作為 attribution 合規），播放器失敗時 toast 附診斷代碼（S1=JSONP 被封／斷網、S2=逾時、S3=查無、S4:n=配對全不符、S5:n=音檔 MediaError、S6=play() 被拒、S7=未開始播放），供店主真機回報失敗層；行動網路首包放寬 playing 等待 3→8 秒。快取參數升 v9。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`
- 驗證：`verify-playback.mjs` 新增「playing 狀態帶曲目摘要＋playTrack 強制換源」回歸並全數通過；真實瀏覽器 harness 實測 Beware 自動播放〈You Don't Love Me〉並列出 11 首、點列表第 3 首成功切〈My Life's Work〉、切辛曉琪《一夜之間》自動播放並列出 10 首，audio currentTime 實際前進、來源為 Apple 試聽 CDN。待辦：離線建全卡池 collectionId 對照表＋執行期改走 `/lookup`，讓 IP 再被封時也能播。

### 2026-07-18｜停止唱片櫃全量預抓造成的 Apple 403／429，維持 iOS 播放授權至曲目載入
- Repo：`dip-vinyl-shop`
- 改動：店主真機回報 v7 仍是唱臂動一下即歸位。重新分離測試後確認 Apple 曲目 metadata 已回空，主因是唱片櫃原本會對數百張收藏四路連續全量預抓，超過 Apple 官方約 20 calls/min 限制，頁面一開即把使用者 IP 打入 403／429 限流；v7 只處理 iOS 手勢並未消除這個上游空結果。現在只預抓排序後首屏 4 張，Search `limit` 由 200 降為 50，單次失敗結果 15 秒後可重試，不再整個分頁永久記空。iOS 解鎖改成讓同一 audio 元件的 0.25 秒靜音 WAV 持續 loop 到 JSONP 回傳，再直接在仍播放的同一元件上換成實際 preview；不再先暫停靜音、遺失 per-element 播放授權。播放器快取參數升至 v8。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：官方 iTunes Search API 文件確認限制約 20 calls/min 並建議縮小 `limit`、加入快取；瀏覽器分離測試在舊流程實際得到 `tracks:0`，與店主全數失敗一致。`verify-playback.mjs` 模擬 JSONP 延遲及「靜音一旦暫停即失去授權」的 iOS 行為，確認新流程會保持同一元件播放到換源並通過；正式 Apple metadata／音檔待本機 IP 限流視窗退去後再驗。

### 2026-07-18｜修正 iOS iTunes 試聽全數失敗並移除唱機下方文字
- Repo：`dip-vinyl-shop`
- 改動：確認 Apple JSONP 能正確回傳曲目，真正失敗點是未預抓的專輯要等待非同步查詢，iOS Safari 在資料回來時已收回點擊播放權限。播放器現在於點擊當下用同一個隱藏 audio 元件播放極短靜音 WAV 完成解鎖，再等待曲目回來切換來源；JSONP 等候上限由 6 秒延長為 10 秒。唱機下方的提示／曲名／Apple Music 文字列與其佔位、CSS 全部移除，唱機本身和既有收藏版面不動；三頁播放器快取參數升至 v7。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：`verify-playback.mjs` 新增「未預抓、JSONP 非同步後仍保有 iOS 播放授權」回歸案例並通過；本機真實瀏覽器直接載入 Apple JSONP 與音檔，Bonnie 'Prince' Billy《Beware》成功播放〈You Don't Love Me〉，再切辛曉琪《一夜之間》成功播放〈我在你懷裡哭你並不知道〉；確認 `turntable-preview` 與所有唱機下方試聽文字皆已移除。

### 2026-07-18｜唱片櫃改用 iTunes 試聽，對戰播放 YouTube 高觀看曲目片段
- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：唱片櫃不顯示完整播放清單，改由使用者瀏覽器以 JSONP 直連 Apple iTunes Search API 取得台灣區專輯曲目，並在每次點擊時隨機播放一首 30 秒試聽；唱機下方只保留一行極小的曲名與 Apple Music 來源連結。曾嘗試由 Worker 代查，但 Apple 對 Cloudflare 共用出口回 429／403，普通跨網域 `fetch` 的 CORS 標頭也不穩定，因此正式路徑刻意不經 Worker、改用 JSONP，避免共用限流與 CORS。對戰與 Roguelike 的勝方專輯維持 YouTube 路徑，Worker 從官方 Album playlist 取得各曲觀看數並挑選最高者，播放器再從可容納 30 秒的時間範圍隨機起播。播放器會核對實際載入的 YouTube video id，避免切換專輯時把上一張仍在播放的狀態誤認為新專輯成功；Spotify／iTunes／YouTube 切換時也會先停止舊來源。
- 主要檔案：Worker `src/index.js`；Shop `dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：`node --check`、三個 HTML 共 6 段 inline script 語法解析、`git diff --check` 均通過；`verify-playback.mjs` 通過瀏覽器直連 iTunes、隨機曲目／連續換專輯、YouTube 舊播放狀態隔離及隨機 30 秒區間回歸測試；Apple API 實測 Bonnie 'Prince' Billy《Beware》取得 11 首試聽、辛曉琪《一夜之間》取得 10 首，正式 Worker 的官方 YouTube playlist 則分別選出 `I Am Goodbye` 與〈一夜之間〉為最高觀看曲目。

### 2026-07-18｜整張專輯播放來源改為官方 Album playlist 優先
- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：Worker `/yt-music-link` 使用全新 `album-v1` 快取命名空間，完全移除一般 YouTube 搜尋首片與 Data API 任意影片退路；現在先解析 YouTube Music 官方 OLAK Album playlist，需同時吻合專輯、藝人及版本，找不到時才接受標題明寫 `Full Album`、片長至少 20 分鐘且排除未要求的 live／concert／interview／commentary／cover／Taylor's Version 等版本。前端播放器新增明確來源偏好：唱片櫃逐張點播固定 Spotify 優先，對戰與 Roguelike 勝方專輯固定 YouTube 優先、Spotify 備援；解析與播放依優先序逐一進行，不再為等候備援來源延遲首選來源，Album playlist 保持第一首起播且關閉 shuffle／loop。
- 主要檔案：Worker `src/index.js`；Shop `dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`PROJECT_MEMORY.md`
- 驗證：Worker `node --check`、`wrangler deploy --dry-run`、前端 `node --check dip-player.js`、`git diff --check` 通過。本機 Worker 真實查詢：Eurythmics《Peace》、Chicago《Chicago III》、B.B. King《Live at the Regal》、五月天《人生海海》與辛曉琪《一夜之間》皆回官方 OLAK Album playlist；Taylor Swift《Red》未誤收 Taylor's Version，改採 4,523 秒且標題明寫 Full Album 的影片；無合格整張來源的 Ariana Grande《petal》與 Vulfpeck 合輯正確回空。390×844 單場對戰實測 viewport／scrollWidth 均為 390、無橫向捲動，100dvh 仍為 844，迷你唱盤座標與既有版面未位移；cache-bust 已升 v4。iOS Safari 的非手勢勝方自動出聲仍須店主真機複驗。

### 2026-07-18｜修正 iOS 多數專輯與對戰無聲、唱盤移至玩家血條上方
- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：追查店主 iPhone 實測後確認，多數專輯雖有 Spotify 連結，但 iOS 無法在非同步流程後啟動有聲 Spotify iframe；同時 `/yt-music-link` 每張專輯使用兩次 YouTube Data API 搜尋，在卡冊預抓時迅速耗盡額度。Worker 將曲目快取升至 v5，優先以不耗 API quota 的 YouTube 公開搜尋結果選出可信音樂影片，官方 Data API 改為單次後備；前端 iOS 改成 YouTube 優先、在出牌／點唱手勢內以同一常駐 iframe 做 1% 有聲解鎖，並防止解鎖計時器誤停稍後載入的真正專輯。卡冊批次預抓只查 Spotify，使用者點唱時才查 YouTube，避免再度爆量。Roguelike 唱盤保持 absolute，移到玩家 nameplate 中央、血條上方並與右側像素小人水平置中，不參與現有版面流。
- 主要檔案：Worker `src/index.js`；Shop `dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`PROJECT_MEMORY.md`
- 驗證：Worker 7 組中英日專輯皆由線上 v5 端點回傳具體 YouTube URL，已部署 version `34aad4fc-79db-4fb9-b6da-275fbcd85eed`；本機實際 iframe 逐張播放 Etta James、Bonnie 'Prince' Billy、2Pac、The Sundays、辛曉琪均為 `playing/youtube`。iPhone UA 模擬確認 YouTube 優先、有聲手勢解鎖、解鎖計時器不會暫停目標曲，且卡冊批次不查 YouTube。390×844 實際完成 Roguelike 與單場 PVE 出牌，兩者唱盤均進入 `playing`；Roguelike 唱盤與玩家像素小人中心 Y 差 0.01px、位於 HP bar 上方、頁寬 390/390 無橫向捲動，既有雙卡、VS、HP 與手牌座標未位移。`node --check dip-player.js`、HTML inline script syntax、`git diff --check` 全數通過；仍待店主以 iOS Safari 真機複驗實際出聲。

### 2026-07-18｜P9d Roguelike 接入勝方音樂與迷你唱盤

- Repo：`dip-vinyl-shop`
- 改動：無止盡品味試煉載入 P9a 共用播放器並以 1×1 畫面外模式掛載；雙方專輯飛上檯面後並行預抓連結，回合結算依實際掉血差播放勝方專輯，平手不換曲，因此一般相剋／比星、品味輾壓、七星回擊、割捨防禦、派系額外傷害及 Boss 都走同一套實際結果判定。所有播放及預抓入口先檢查音樂開關；頂欄與 VS 下方 40×28px 像素唱盤共用 `dipBattleMusic` 偏好，關閉即停止播放。迷你唱盤以 absolute 疊在雙卡中央空隙，不參與牌桌 flex 尺寸，播放時唱片旋轉並有三顆純 CSS 音符上飄。
- 主要檔案：`roguelike.html`
- 驗證：三段 inline script 全數通過 Node 語法解析，靜態回歸確認隱藏掛載、雙卡預抓、勝方／平手判定、關閉音樂守衛及共用偏好鍵，`git diff --check` 通過。390×844 本機 guest 實戰：body=844、scrollWidth=390；敵方卡、VS、玩家卡的座標與改版前逐值相同；迷你唱盤 x=175.2–215.2、y=365.0–393.0，與雙卡及 VS 零重疊，console 零錯誤。開關在 `aria-pressed=true/false`、靜音 class 間正確同步；關閉狀態完成一回合後保持靜止且不影響勝負流程。

### 2026-07-18｜P9c 對戰改為播放勝方專輯並加入迷你唱盤

- Repo：`dip-vinyl-shop`
- 改動：單場對戰完整移除右下可見播放器抽屜，`DipPlayer` 改為 1×1 隱藏掛載；音樂觸發從玩家出牌當下移到回合結算，玩家勝播玩家卡、對手勝播對手卡，平手與雙方同時輾壓不換曲，七星回擊及單方品味輾壓按實際得利者播放。雙方檯面卡揭示即預抓連結；喇叭關閉時播放及預抓入口都先返回，避免新增播放器請求。VS 下方以 absolute 放入 40×28px 像素唱盤，不參與 flex 高度；播放時唱片旋轉並以純 CSS 讓三顆音符錯開上飄，點迷你唱盤與頂欄喇叭共用 `dipBattleMusic` 狀態。
- 主要檔案：`battle.html`
- 驗證：battle module、`dip-player.js` 語法與 `git diff --check` 通過；靜態回歸確認舊抽屜全數移除、無出牌起播 hook、勝方／平手／輾壓分支與關閉音樂零預抓守衛。390×844 本機 guest 實戰：body=844、scrollWidth=390；敵方卡、VS、玩家卡座標與改版前完全一致；迷你唱盤 x=175.2–215.2、y=283.8–311.8，與雙卡、VS、數值列、手牌皆零重疊，console 零錯誤。關閉迷你唱盤後頂欄與迷你按鈕均 `aria-pressed=false`，實跑一回合維持靜止。iOS 真機勝方自動切歌待店主配合驗收。

### 2026-07-18｜P9b 重做唱片櫃唱盤機與卡片播放互動

- Repo：`dip-vinyl-shop`
- 改動：唱片收藏移除卡片／木紋唱片櫃雙檢視與整組木架 HTML/CSS，保留乾淨卡片網格及曲風 chips；唱盤機移到 chips 下方、卡片網格上方，畫面只留機體與可點擊停止的唱臂，Spotify／YouTube 改用 P9a 1×1 隱藏掛載。點卡片本體改為封面飛行上盤並立即播放，右上低調 ⓘ 獨立開啟原卡片詳情，鍵盤 Enter／Space 亦可上盤。可見卡片連結以每批 4 張、批間 80ms 預抓。唱片旋轉改由 rAF 維護角度與角速度，播放約 1 秒升到 180°/s、停止約 1.2 秒降至零；換盤保持轉速並播放唱臂快速抬放動畫。唱臂加長、原點與播放角度重畫，針頭落到唱片外緣溝槽。
- 主要檔案：`index.html`
- 驗證：HTML module 語法、`dip-player.js` 語法與 `git diff --check` 通過；靜態回歸確認舊雙檢視／木架／可見播放器抽屜字串全數移除，唱盤排序在網格前、隱藏掛載、卡片播放、ⓘ 詳情、rAF 與 4 張批次預抓均存在；依 270px deck 幾何驗算針頭距唱片中心 72.1px，對齊 74px 外緣溝槽。

### 2026-07-18｜P9a 強化共用播放器的行動裝置自動播放

- Repo：`dip-vinyl-shop`
- 改動：`DipPlayer.mount(container,{hidden:true})` 新增 1×1 畫面外隱藏模式，不使用 `display:none`；掛載即預建 Spotify 控制器與 YouTube Player，第一次可用的 pointer／touch／click 以 mute→play→pause 解鎖 YouTube 音訊。新增 `prefetch()`，同時預抓 Spotify／YouTube 連結並以 artist＋album 記憶體快取去重；`playAlbum()` 優先使用快取，Spotify 起播後等待官方 `playback_started`／`playback_update`，1.5 秒未確認播放便暫停並改走 YouTube。兩平台都確認實際播放後才回報 `playing`，所有失敗仍收斂為 `false`，cache-bust 升至 v2。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`
- 驗證：`node --check dip-player.js` 與 `git diff --check` 通過；VM 回歸確認隱藏掛載、Spotify 控制器預建、重複預抓只發兩個端點請求、Spotify 看門狗逾時後由 YouTube 起播、`onStateChange` 與 `stop()` 正常。iOS 真機「點一下 1 秒內出聲」及首次解鎖後非手勢切歌待店主配合驗收。

### 2026-07-18｜P9 音樂體驗改版計畫定稿（店主 iPhone 實測六點回饋）

- Repo：`dip-vinyl-shop`
- 改動：店主真機實測後回饋六點，Claude 整合成 `MUSIC_MAP_PLAN.md` 新章節 P9 供 Codex 執行。重點：①診斷手機不自動出聲的根因是 tap 後的網路來回燒掉 iOS user activation，P9a 以連結預抓＋控制器預建＋首次互動音訊解鎖＋Spotify 起播看門狗（1.5s 沒起播改走 YouTube）解決，並新增播放器隱藏模式（1×1 off-screen，不可 display:none）；②P9b 唱片櫃移除雙檢視切換、唱盤機去文字移到最上方、點卡片＝上盤自動播（原卡片詳情改小 ⓘ 圖示）、唱臂修圖讓針頭落在唱片上、rAF 角速度緩升緩降＋唱臂緩入緩出；③P9c 對戰移除播放器抽屜、改回合結算播「勝方」專輯（平手不換曲）、VS 下方空白處放約 44×30px 迷你像素唱盤（轉動＋音符動畫、點擊＝喇叭開關）；④P9d roguelike 同機制接入、喇叭偏好共用 `dipBattleMusic` 鍵。全章節以「手機版面不得推擠、100dvh 不變」為最高原則，每階段固定 390×844 量測。
- 主要檔案：`MUSIC_MAP_PLAN.md`
- 驗證：純計畫文件；執行順序 P9a→P9b→P9c→P9d，每階段獨立 commit+push＋備忘錄。

### 2026-07-18｜音樂地圖 2.0 全系列（P1–P7）正式上線；Gate 2 抓到並修正曲風排序缺陷

- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：依三道 gate 完成部署。Gate 1：worker push＋deploy。Gate 2 驗收**首輪 3/4 FAIL**，查出兩個 worker 真 bug 並由 Claude 當場修正（commit `055c066`）：①`musicMapGenres` 固定規則順序取前二，pop／blues 排最後永遠被擠掉（竹内まりや city pop 變 soul+hiphop、B.B. King 變 rock+hiphop）→ 改為依「命中標籤數」計分排序、平手保留規則序；②Last.fm 藝人 tag fallback 只在專輯 tag 全空時觸發，垃圾標籤（五月天回「Chinese 2008」）會卡住 → 改為「對映結果為空」就追加藝人 tag。錯誤結果已入快取，KV 鍵升版 `mapgenre3:` 清除污染。重測四案例全 PASS：五月天→[rock,pop]、竹内まりや→[pop,soul]、B.B. King→[blues,rock]、Taylor Swift→[pop,electronic]。Gate 3：shop 11 個 commit push 上線（`4ac4e07..f720bc4`）。
- 主要檔案：`../dip-vinyl-worker/src/index.js`（musicMapGenres 計分、Last.fm fallback、mapgenre3）；shop 為既有本機提交鏈整批發布
- 驗證：worker 離線單元測試 23/23（含三組實戰 tag）；`verify-music-map.mjs` 4/4 PASS；wrangler deploy Version `8faa2910`；Pages 部署確認 widget v12 上線。手機版 390×844 逐頁量測（依店主指示加強）：music-map（無橫向捲動、十路徑、100 節點、示範地圖、點路徑開封面牆、軸高亮）、pvp（compact 前四路徑）、battle（100dvh=844 完整、收合抽屜 y=48–79 只蓋大廳框不壓手牌、喇叭鈕開關與 localStorage 記憶正常）、首頁（dip-player 載入、僅既有 main-tabs 水平捲動容器超寬屬原設計）、roguelike 正常，全部頁面 console 零錯誤。待真帳號驗收：登入後全量重建 v2、Spotify/YouTube 實際出聲、分享圖 Web Share。

### 2026-07-17｜收斂音樂地圖與播放器上線前 Medium／Low 項目

- Repo：`dip-vinyl-shop`
- 改動：依交叉檢驗清單完成非阻斷問題。曲風封面牆改為每批最多 8 張並行、批間 100ms，切換路徑時以 request token 在批次前後與等待後停止舊工作，避免大收藏一次爆發數百個 Firestore／Worker 請求。`DipMusicMap` 匯出唯一的 `levelRatio` 與 marks，分享圖移除重複公式並直接共用；示範資料調為 484 點，不超過 278 張已分類專輯的 556 點上限。外圈節點中心距改 9.5px、半徑改 4px，留出 1.5px 邊緣間距。新唱片櫃的 cover、card id、artist、album 與唱盤文字加入 HTML escape。手機戰鬥播放器改在頂欄下方以 `max-height` 收合，標題按鈕保持可見且不再覆蓋右下手牌。widget cache 升至 v12。`MUSIC_MAP_PLAN.md` 修正線性 commit 鏈的發布說明，加入 Worker→四案例驗收→Shop 三道硬 gate；新增 UTF-8 Node 驗收腳本，取代容易破壞 CJK query 的命令列 curl。
- 主要檔案：`music-map.html`、`music-map-widget.js`、`pvp.html`、`index.html`、`battle.html`、`MUSIC_MAP_PLAN.md`、`verify-music-map.mjs`
- 驗證：四個 HTML module、widget 與驗收腳本 Node 語法通過；離線測試確認 18 張封面最大並行 8、批間兩次 100ms、示範 484/556、levelRatio 單一來源、escape 輸出與兩處 v12 cache。browser skill 本機實測：390px 地圖 100 節點、邊緣間距 1.5px、文字零裁切、無橫向捲動；1280px 地圖零裁切／console error。390×844 戰鬥頁收合抽屜位於 y=48–79、與 y=713 起的手牌不重疊，展開後高度 111px、`aria-expanded=true`、`100dvh` 仍為 844px；1280px 固定抽屜不改 900px 戰鬥高度且 console 無 error。`git diff --check` 通過。因整串 commits 仍含待額度重置的 P1，本階段只本機 commit，不 push、不 deploy。

### 2026-07-17｜防止音樂地圖重建以暫時失敗清空曲風

- Repo：`dip-vinyl-shop`
- 改動：依上線前交叉檢驗修正高風險資料污染。`genres()` 現在以 `null` 區分網路錯誤、非 2xx、JSON 錯誤或回應 schema 異常，與成功查無曲風的 `[]` 不再混用；重建遇到失敗，或既有有效 `mapGenres` 卻突然查回空陣列時，保留舊標籤且不執行卡片 `setDoc`。任一批有此情況便中止本輪，不寫入最終 `musicMap.version: 2`，避免暫時性限流資料被標成 healthy 後永久保留；不加入自動重試迴圈。
- 主要檔案：`music-map.html`
- 驗證：HTML module Node 語法通過；離線 VM 測試涵蓋成功有標籤、成功確定無標籤、HTTP 500、fetch throw、JSON throw、缺少 genres schema，以及既有標籤遇空結果；確認所有暫時失敗均不清空卡片、不寫入 schema v2，正常空結果仍計入 untagged；8 張 `Promise.all` 與 200ms 批間隔保持不變，`git diff --check` 通過。依額度限制仍只本機 commit，不 push、不 deploy。

### 2026-07-17｜修正 PVP 地圖讀取 schema v2

- Repo：`dip-vinyl-shop`
- 改動：全階段回歸時發現 `pvp.html` 的共用 widget 已升版，但個人地圖讀取條件仍殘留 `musicMap.version === 1`，導致 P1 schema v2 上線後 PVP 入口會誤顯示尚未同步；改為只接受 v2，並全域搜尋確認前端不再殘留 v1 判斷。
- 主要檔案：`pvp.html`
- 驗證：PVP module Node 語法通過；全站搜尋無 `musicMap.version === 1` 殘留，schema v2 靜態斷言與 `git diff --check` 通過。修正仍位於待上線 P1 的本機提交鏈上，不提前 push。

### 2026-07-17｜P7 對戰出牌串接專輯音樂

- Repo：`dip-vinyl-shop`
- 改動：`battle.html` 引入共用 `dip-player.js`，只在玩家自己的出牌已被主流程接受後 fire-and-forget 播放該卡專輯，對手牌不觸發；頂欄新增預設開啟的喇叭切換並以 `dipBattleMusic` 保存至 localStorage，關閉時停止現有播放且後續出牌不呼叫播放器。Spotify／YouTube 控制面板收在固定於戰鬥區角落的小抽屜，不參與版面流、保留原 `100dvh` 一屏高度；找不到連結、播放器未就緒或 Promise 拒絕都靜默收起，不影響出牌與結算。
- 主要檔案：`battle.html`
- 驗證：battle module 與 `dip-player.js` Node 語法通過；VM 測試確認音樂關閉時播放器呼叫為 0、開啟時玩家出牌恰呼叫一次，靜態驗證確認唯一 hook 為 `playBattleAlbum(pCard)`、無對手 hook、無 `await`、固定抽屜與 `100dvh` 保留，手機寬度隱藏 beta 避免頂欄擠壓；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段先本機 commit、不提前 push。

### 2026-07-17｜P6b 加入曲風唱片櫃與像素唱盤

- Repo：`dip-vinyl-shop`
- 改動：唱片收藏新增全部、十種曲風與未分類篩選，並提供原卡片／木製唱片櫃雙檢視；唱片櫃手機版維持兩欄。頁面下方新增像素唱盤、換盤飛行動畫、旋轉唱片與唱臂狀態，點唱片即以 P6a 共用播放器播放，點唱臂可停止，Spotify／YouTube iframe 收進可展開的控制抽屜；播放查找失敗時唱臂退回且不阻塞收藏操作。
- 主要檔案：`index.html`
- 驗證：HTML module 與 `dip-player.js` Node 語法檢查通過；靜態驗證涵蓋十一個篩選 chip、雙檢視、共用播放器掛載／播放／停止、唱盤狀態與 `max-width:520px` 兩欄手機結構；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段先本機 commit、不提前 push。

### 2026-07-17｜P6a 建立共用專輯播放器模組

- Repo：`dip-vinyl-shop`
- 改動：新增全站共用 `dip-player.js`，提供 `DipPlayer.mount(container)`、`playAlbum({artist,album})`、`stop()`、`onStateChange(cb)`。播放時先呼叫既有 `/spotify-album-link` 取 album id，延遲載入 Spotify iFrame Embed API 並 `loadUri`／播放；解析或控制器失敗時改呼叫 `/yt-music-link`，建立可見的 YouTube playlist／video embed。所有網路、API、播放器與瀏覽器限制錯誤一律收斂為 `false`，不 throw；以 request token 防止快速換盤的舊請求蓋過新請求，`stop()` 同時取消待播、暫停 Spotify 與清空 YouTube。
- 主要檔案：`dip-player.js`
- 驗證：Node 語法與 VM 整合測試通過；模擬 Spotify controller 建立／播放、YouTube playlist fallback、無連結、網路 throw、無效輸入、快速停止與 state callback 均符合預期；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段先本機 commit、不提前 push。

### 2026-07-17｜P5 音樂地圖成長動畫與示範空狀態

- Repo：`dip-vinyl-shop`
- 改動：地圖資料更新時以固定十點 SVG path 進行 650ms 數值補間，形狀由舊等級平滑長到新等級；首次讀入玩家資料會由中心展開。新跨過的外圈節點各自播放一次 pulse，並尊重 `prefers-reduced-motion`。未登入時不再顯示全零圖，改用固定的十路徑非零示範資料並清楚標註「示範地圖」，登入與分享狀態仍保持隔離。元件快取升至 v11。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：widget／module Node 語法通過；以 jazz 7、rock 60、pop 500 模擬更新，確認 path／十個 dot 補間無 NaN 且 18 個新跨越節點觸發 pulse；靜態檢查確認非零 demo、示範標示、reduced-motion 分支與 v11 快取同步；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段先本機 commit、不提前 push。

### 2026-07-17｜P4 音樂地圖節點獎勵、稱號與分享圖

- Repo：`dip-vinyl-shop`
- 改動：音樂地圖載入後集中結算每條路徑 7、30、120、500 張里程碑，以 Firestore transaction 同步更新 `musicMapRewards` 已領清單並沿用唱片櫃既有 `specialDraws` 陣列補發 `random3` 特殊抽卡券，避免重整或多分頁重複發券；補發時顯示脈衝 toast。十類曲風加入 7 張探索者、60 張行家、500 張藏家傳奇稱號並顯示在側欄。新增 1080×1920 PNG 分享圖，包含十階地圖、總收藏、最強三條路徑與稱號、dip logo，支援手機 Web Share，無檔案分享能力時下載。元件快取升至 v10。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：widget 與 module Node 語法通過；稱號 6／7／60／500 邊界測試通過；模擬交易第一次補發 4 張、第二次 0 張，確認 rewards ledger、`random3` ticket schema 與冪等性正確；靜態檢查確認 canvas 1080×1920、logo、十角圖、最強三路徑、Web Share／下載 fallback 齊全；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段先本機 commit、不提前 push。

### 2026-07-17｜P3 點音樂地圖路徑展開專輯封面牆

- Repo：`dip-vinyl-shop`
- 改動：完整地圖的十條 SVG 軸與側欄路徑改為可選取控制項；點擊後以 Firestore `array-contains` 查詢玩家該曲風的永久收藏，在地圖下方展開封面牆。封面牆顯示總張數與款數、複本數、藝人、專輯及沿用唱片櫃層級的稀有度框，排序為稀有度優先、再依最後／首次取得時間；卡片既有封面優先，缺圖才呼叫 Worker Spotify 搜尋並回填既有 `coverUrl` 欄位。跨界卡可出現在多條路徑；手機改為單欄卡片列。元件快取升至 v9。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：四個 module／widget Node 語法檢查通過；互動單元測試確認十條 axis hit、十個側欄按鈕、滑鼠與鍵盤選取及 compact 靜態模式正確；靜態檢查確認 `array-contains` 查詢、總張數含 count、稀有度＋取得時間排序、封面／評分 fallback 與 ≤520px 單欄規則齊全；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段同樣先本機 commit、不提前 push。

### 2026-07-17｜P2 音樂地圖改用十階里程碑半徑

- Repo：`dip-vinyl-shop`
- 改動：將音樂地圖成長模型由曲風占比半徑改為固定十階里程碑 `[1,3,7,15,30,60,120,250,500,1000]`；每軸依已完成階數與下一階間進度計算半徑，滿 1000 張封頂，收藏增加時圖形不會因其他曲風成長而縮小。外圈改為每軸十顆節點，側欄保留占比、顯示真實下一節點，滿級改顯示「已滿級」；地圖說明與元件快取同步更新至 v8。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：0、1、61、999、1200 五組等級半徑公式全數通過；完整、compact、桌面與手機渲染分支皆通過本機測試並確認每張圖為 100 顆節點；本機瀏覽器 1280px／390px 實測皆為十條路徑、無橫向捲動，390px 二十個 SVG 標籤零越界且 console 無 error；Node 語法與 `git diff --check` 通過。因 P2 commit 以尚未上線的 P1 為祖先，為避免 push 時連帶提前觸發 P1 全量重建，本階段先本機 commit，待 2026-07-18 08:15 後與 P1 依序上線。

### 2026-07-17｜P1 音樂地圖資料層十角化（僅本機提交，待額度重置上線）

- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：完成音樂地圖 P1。Worker 曲風對映依固定順序擴為 jazz、rock、electronic、soul、hiphop、folk、classical、world、pop、blues，補齊中英文關鍵字，將 city pop／j-pop／k-pop 歸入 pop、排除 rhythm and blues 誤入 blues，並把 KV 鍵升為 `mapgenre2:`。前端六個同步點改用同一組十類 id；地圖資料升為 `version: 2`、十鍵 credits 與 `untagged`，舊 v1 會判定不健康並以每批 8 張、批間 200ms 的並行查詢重建，同時刷新卡片上的舊曲風結果。三個收卡入口不主動覆寫 schema version，確保尚未重建的 v1 帳號仍會走完整遷移；v2 建立後則持續累加曲風或未分類張數。地圖側欄顯示未分類張數，元件與品味生死鬥引用快取升至 v7。
- 主要檔案：`../dip-vinyl-worker/src/index.js`、`music-map-widget.js`、`music-map.html`、`index.html`、`battle.html`、`roguelike.html`、`pvp.html`
- 驗證：Worker `musicMapGenres()` 本機 29 組案例全過（含全部中文關鍵字、city/j/k/synth pop、blues、rhythm and blues 排除與跨界最多兩類），Worker 與 widget 通過 Node 語法檢查；四個 HTML module script 通過 Node `--check`；v1/v2 健康判斷、十鍵順序、8 張 `Promise.all` 批次、`untagged` 與兩處 v7 快取參數靜態測試通過；本機瀏覽器以 1280px／390px 實測皆渲染十條路徑與二十個 SVG 標籤，手機無橫向捲動或標籤越界，console 無 error；兩 repo 皆通過 `git diff --check`。依 2026-07-17 額度限制指示，本階段只做本機 commit，未 push、未執行 `wrangler deploy`，線上專輯驗收留待 2026-07-18 08:15 後。

### 2026-07-17｜音樂地圖計畫補上 KV 額度限制期間的執行時機

- Repo：`dip-vinyl-shop`
- 改動：店主回報目前 Cloudflare KV 寫入額度受限中。更新 `MUSIC_MAP_PLAN.md`：P1（會觸發大量 KV 寫入的資料層十角化）今天只寫程式碼＋本機 commit，不 `wrangler deploy`／不 `git push`，等明天（2026-07-18）台北 08:15 後額度重置再上線；P2–P7 不受影響照常當天推送。新增「給 Codex 的今日工作清單」段落，把上述時序寫成明確步驟與指令，供 Codex 直接照做。
- 主要檔案：`MUSIC_MAP_PLAN.md`
- 驗證：純計畫文件更新，無程式改動。

### 2026-07-17｜音樂地圖 2.0 執行計畫定稿（給 Codex 執行）

- Repo：`dip-vinyl-shop`
- 改動：Claude 檢查現行音樂地圖後與店主確認方向，寫成 `MUSIC_MAP_PLAN.md` 供 Codex 依階段執行。重點決策：①雷達改「里程碑等級半徑」十階制（1→1000，對數式成長，解決上千張收藏也要有成長感）；②八角圖十角化，新增 pop、blues 兩軸，city pop／k-pop／j-pop 改歸 pop，曲風對映補中文關鍵字（五月天→rock 這類）；③`musicMap` schema 升 version 2（十鍵＋untagged），靠 `healthy()` 自動觸發重建完成遷移，KV 鍵升版 `mapgenre2:`；④點路徑看封面牆、節點發特殊抽卡券＋稱號（結算集中在 music-map 頁）、9:16 分享圖、動畫與示範空狀態；⑤新增共用播放器 `dip-player.js`（Spotify iFrame Embed→YT fallback），唱片櫃加曲風篩選＋像素唱盤機播放，對戰出牌也接同一播放器（僅玩家出牌、喇叭鈕可關、不阻塞出牌）。
- 主要檔案：`MUSIC_MAP_PLAN.md`（新增）
- 驗證：純計畫文件，無程式改動；六處曲風 id 清單位置、KV 額度風險與依賴順序皆已寫入計畫。

### 2026-07-17｜修 KV 額度滿導致簡介全掛的 500；IG 介紹文入快取管線

- Repo：`dip-vinyl-worker`
- 改動：使用者回報 IG 卡（JAGATARA《それから》、Fraction《Moon Blood》）與推薦卡（Bonnie 'Prince' Billy《Beware》）看不到簡介。偵錯發現主因：昨日大量 KV 匯入吃滿 Cloudflare 免費方案每日寫入額度後，worker 7 處 `COVER_CACHE.put()` 沒有 try/catch，寫入被拒直接 throw → 所有快取未命中的請求（簡介／封面／評分／曲風）整個 500。修法：新增 `kvPut` 安全包裝取代全部裸 put——寫不進快取就略過、回應照常。另確認《Beware》不是「隨機從 Bandcamp 抓」，而是心情選歌／類型挑片的 AI 推薦卡（推薦後以 Spotify→Bandcamp→YT 驗證），此路線修好 500 即恢復正常。
- 優化：把 Firestore `reels` 36 篇店主 IG 介紹文抓下（`fetch_reels.mjs`）、逐篇人工摘要成簡介、寫入 `desc2:/desc4:` 快取鍵（`reels_to_kv.mjs`）——battle／roguelike 本來只打 `/album-desc` 看不到 IG 文，入 KV 後三頁零改動通吃，也蓋掉 AI 對冷門盤的幻覺（Fraction 曾被寫成「暗黑電子」，實為 1971 迷幻搖滾私壓盤）；另補寫《Beware》人工簡介。因當日 KV 寫入額度仍滿，37 筆放入 `pending-import/`，以 Windows 排程 `dip-vinyl-kv-auto-import`（每日 08:10，額度台北 08:00 重置）自動匯入，成功歸檔、全部完成後排程自動移除。
- 主要檔案：`src/index.js`（kvPut）、`scripts/desc-gen/`（`fetch_reels.mjs`、`reels_to_kv.mjs`、`reels_raw.json`、`kv-import-reels.json`、`auto_import.mjs`、`auto_import.cmd`）
- 驗證：wrangler deploy 成功（Version 96709c2f）；修復前三張卡 `/album-desc` 都是 500 HTML，修復後皆 200 即時生成；auto_import.mjs 手動試跑正確偵測 10048 並保留待傳檔；`schtasks` 確認排程 Ready。IG 摘要正式生效待明日 08:10 匯入後自動完成。

### 2026-07-16｜卡池簡介批次預生成全部完成（5,773 張入 KV）

- Repo：`dip-vinyl-worker`（工具與產物）、`dip-vinyl-shop`（本備忘錄）
- 改動：延續同日稍早的第一階段，分十二個階段（每階段約 500 張）陸續生成剩餘 059 批，全部由本機 Sonnet／Opus 子代理撰寫（冷門度 5 的 167 張用 Opus、其餘 Sonnet，CJK 卡 0 張全被 CURATED_DESCS 涵蓋）。過程中兩度遇到 Cloudflare KV 免費方案每日寫入額度用滿（code 10048），依使用者指示先生成囤積、隔日額度重置後一次補匯入；期間也遇到 Claude Code 子代理 API 額度／OAuth token 過期的錯誤，但檔案多半已在報錯前寫入完成，逐批驗證確認無缺漏。全部 12 個 `kv-import-stage-N.json` 最終於額度重置後一次匯入成功。
- 過程中發現並修正的品質問題：batch-028 一筆未跳脫雙引號導致 JSON 壞掉；batch-046 系統性半形逗號混用（85 處自動修正）；多筆誤用禁止用語（「層次豐富」「獨樹一格」「傑作」）與 validate.mjs 對「誠實地」「無法辨識」「你來我往」等正常用語的拒答字樣誤判，逐筆手動改寫。另發現 `seed_cards.json` 原始資料有 18 筆藝人／專輯名稱含編碼壞掉的問號（如 `Guns N??Roses`、`Ice?`），屬既有資料品質問題，不影響本次任務（KV 鍵與前端查詢字串來源一致），留待未來清洗。
- 主要檔案：`dip-vinyl-worker/scripts/desc-gen/`（`build_tasks.mjs`、`validate.mjs`、`to_kv_bulk.mjs`、`tasks.json`、`batches/`（001–059）、`kv-import-stage-1~12.json`、`progress.json`）
- 驗證：validate.mjs 全部 5,773 筆最終 0 異常；每階段人工抽樣（每 50–90 筆抽 1）核對事實無幻覺、曲風無安錯；`wrangler kv bulk put` 全部 12 階段回報 Success；線上抽驗 8 筆（涵蓋 sonnet／opus、各階段、含極冷門卡）皆 `X-Cache: KV-HIT`；`wrangler kv key list --prefix desc2:` 統計 6,081 把鍵（含既有 308＋本次新增）。任務狀態記於 `progress.json`（`status: COMPLETE`）。

### 2026-07-16｜卡池簡介批次預生成第一階段（500 張入 KV）

- Repo：`dip-vinyl-worker`（工具與產物）、`dip-vinyl-shop`（本備忘錄）
- 改動：建立 `scripts/desc-gen/` 批次簡介工具鏈，改用 Claude Code 本機 Sonnet／Opus 子代理預先撰寫卡池簡介、匯入 worker KV（沿用 `desc2:`/`desc4:` 鍵與 `{desc}` 值格式），worker 的付費 API 現場生成保留當新卡 fallback。任務清單共 5,773 張（seed 5,526＋apex 600，扣除人工精選 76、殿堂 2、KV 既有 275）；模型分工為冷門度 5 的 167 張用 Opus、其餘用 Sonnet（兩輪試做後棄用 Haiku——對冷門卡會安錯曲風）。第一階段 batch 001–005 共 500 張已生成、驗證並匯入 KV；**因額度用滿暫停，續跑從 batch-006 起**，流程為每 500 張驗證＋人工抽查＋使用者確認後匯入（見 `progress.json`）。
- 主要檔案：`dip-vinyl-worker/scripts/desc-gen/`（`build_tasks.mjs`、`validate.mjs`、`to_kv_bulk.mjs`、`tasks.json`、`batches/`、`progress.json`）
- 驗證：validate.mjs 500/500 通過（拒答／簡體／禁語／標點；英文專輯名內逗號與〈Funk #49〉的 # 為合法，已修驗證器誤判）；每 50 筆抽 1 人工核對事實無幻覺；`wrangler kv bulk put` 回報 Success；線上抽 3 筆 `/album-desc` 皆 `X-Cache: KV-HIT` 即時回應。

### 2026-07-16｜音樂地圖曲風標籤改為純英文

- Repo：`dip-vinyl-shop`
- 改動：八個音樂地圖曲風名稱移除中文並統一顯示英文；曲風 ID、點數與資料結構不變。同步將完整地圖與品味生死鬥引用的地圖元件快取版本升至 v6。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：`music-map-widget.js` 通過 Node 語法檢查；確認舊中英並列標籤皆已移除、兩個引用頁皆使用 v6，並通過 `git diff --check`。

### 2026-07-16｜音樂地圖文案與「唱片櫃」命名統一

- Repo：`dip-vinyl-shop`
- 改動：依指定縮短音樂地圖上方簡介與下方圖表說明；將商店首頁、唱片收藏、單場對戰、Roguelike、音樂地圖、品味生死鬥預覽及後台中原本顯示為「卡冊」的執行頁面文案統一改為「唱片櫃」。同步將地圖元件快取版本升至 v5，確保新說明立即載入；Firestore `collections` 路徑與程式識別字維持不變。
- 主要檔案：`index.html`、`admin.html`、`battle.html`、`roguelike.html`、`music-map.html`、`music-map-widget.js`、`pvp.html`
- 驗證：確認上述執行檔不再含「卡冊」、兩段指定文案完全吻合；六個 HTML module script 與 `music-map-widget.js` 皆通過 Node 語法檢查，兩個引用頁皆使用 `music-map-widget.js?v=5`，並通過 `git diff --check`。

### 2026-07-16｜修正音樂地圖隔日歸零並自動重建

- Repo：`dip-vinyl-shop`
- 改動：修正商店、單場對戰與 Roguelike 在曲風查詢回空時寫入 `credits: {}`、清除既有八大曲風點數的問題；改用 `mergeFields` 只更新實際命中的曲風欄位，空曲風仍保留收藏張數但不碰既有點數。音樂地圖若偵測到缺少曲風欄位或收藏非空但點數全為零，會自動從永久卡冊重建並回存。
- 主要檔案：`index.html`、`battle.html`、`roguelike.html`、`music-map.html`
- 驗證：抽出四個 HTML 的 module script 以 Node `--check` 驗證語法，`music-map-widget.js` 亦通過；靜態檢查確認三個收卡入口皆使用精準 `mergeFields` 且舊的整張 `credits` map 寫法已移除；另驗證損壞空 map、全零 map 與正常 map 三種健康判斷，並通過 `git diff --check`。

### 2026-07-16｜加入 Claude／Codex 開工前交接檢查

- Repo：工作區、`dip-vinyl-shop`、`dip-vinyl-worker`
- 改動：規定每次開工先 fetch 並檢查本機與遠端的新增、修改、刪除、重新命名及新提交；乾淨時才 fast-forward 同步，發現分歧或重疊時保留對方工作。提交前再檢查一次遠端，避免工作期間互相覆蓋。
- 主要檔案：`../AGENTS.md`、`../CLAUDE.md`、`AGENTS.md`、`CLAUDE.md`、`PROJECT_MEMORY.md`、`../dip-vinyl-worker/AGENTS.md`、`../dip-vinyl-worker/CLAUDE.md`
- 驗證：實際對兩個 repo 執行 fetch、status、遠端 commit 與 name-status 比對；本次開工時兩邊皆無本機或遠端待整合變更。

### 2026-07-16｜補齊昨天逐筆工作日誌

- Repo：`dip-vinyl-shop`
- 改動：修正初版備忘錄只有歷史摘要、沒有昨天逐筆紀錄的缺漏；依兩個 repo 的 Git 歷史補登 2026-07-15 全部 16 筆提交，並明訂歷史摘要不得取代逐筆日誌。
- 主要檔案：`PROJECT_MEMORY.md`
- 驗證：以台北時區查詢 2026-07-15，確認 `dip-vinyl-shop` 14 筆、`dip-vinyl-worker` 2 筆；逐筆比對 commit 時間、差異檔案與 shortstat。

### 2026-07-16｜建立 Claude 自動讀取的專案備忘錄

- Repo：工作區、`dip-vinyl-shop`、`dip-vinyl-worker`
- 改動：依兩個 repo 共 529 次既有提交建立歷史基線與目前狀態摘要；加入 Claude 啟動時自動讀取，以及所有專案代理每次檔案改動完成前必須追加紀錄的規則。
- 主要檔案：`../CLAUDE.md`、`../AGENTS.md`、`CLAUDE.md`、`AGENTS.md`、`PROJECT_MEMORY.md`、`../dip-vinyl-worker/CLAUDE.md`、`../dip-vinyl-worker/AGENTS.md`
- 驗證：確認兩個 repo 的 Git 基線與工作區狀態；確認三個啟動位置皆能指向同一份備忘錄。

### 2026-07-15｜逐筆工作日誌（由 Git 補登，共 16 筆）

> 以下依當天時間先後排列。這是事後依 commit 差異補登；「驗證」代表已用 Git
> 查證提交與檔案內容，不杜撰原提交沒有留下的人工或瀏覽器測試紀錄。

#### 12:10｜全站「入耳」屬性改名為「硬蕊」

- Repo／commit：`dip-vinyl-shop`／`d05a657`
- 改動：將使用者可見的「入耳難易度／入耳」改為「硬蕊度／硬蕊」，同步更新商店、後台、單場對戰、Roguelike 與兩份設計文件；底層相容欄位仍沿用 `accessibility`。
- 主要檔案：`index.html`、`admin.html`、`battle.html`、`roguelike.html`、`CARD_GAME_DESIGN.md`、`ROGUELIKE_DESIGN.md`
- 驗證：`git show --stat d05a657` 確認 6 個檔案、48 行新增與 48 行刪除。

#### 12:10｜Worker 評分提示同步「硬蕊度」命名

- Repo／commit：`dip-vinyl-worker`／`d9a49ad`
- 改動：`/album-rating` 的註解及 AI 評分提示改用「硬蕊度」，定義仍是越晦澀、實驗、需要時間消化，分數越高；JSON key 保持 `accessibility` 以維持前端相容。
- 主要檔案：`src/index.js`
- 驗證：`git show --stat d9a49ad` 確認 1 個檔案、3 行新增與 3 行刪除。

#### 12:15｜相生相剋圖節點由「入」改為「硬」

- Repo／commit：`dip-vinyl-shop`／`8892ade`
- 改動：單場對戰與 Roguelike 的 SVG 相生相剋圖，屬性節點簡稱同步由「入」改為「硬」。
- 主要檔案：`battle.html`、`roguelike.html`
- 驗證：`git show --stat 8892ade` 確認 2 個檔案各替換 1 行。

#### 17:06｜重畫 Roguelike 腳邊唱片堆

- Repo／commit：`dip-vinyl-shop`／`9e7eda8`
- 改動：把原本整齊色條改成散放的像素封套與黑膠，玩家唱片依手牌最高屬性顯示經典藍、冷門紫或硬蕊紅；顯示最近 5 張並隨抽牌／出牌更新。同時首次加入專案 `AGENTS.md` 協作規則。
- 主要檔案：`roguelike.html`、`AGENTS.md`
- 驗證：`git show --stat 9e7eda8` 確認 2 個檔案、30 行新增與 14 行刪除。

#### 17:12｜隱藏對手唱片堆的屬性線索

- Repo／commit：`dip-vinyl-shop`／`2a3ff3c`
- 改動：對手腳邊唱片一律使用中性色與暗色中心，不再用紅／藍／紫洩漏手牌主屬性；對手氣場提示同步改為靠右對齊。
- 主要檔案：`roguelike.html`
- 驗證：`git show --stat 2a3ff3c` 確認 1 個檔案、7 行新增與 6 行刪除。

#### 17:15｜建立 Roguelike 實玩與平衡紀錄

- Repo／commit：`dip-vinyl-shop`／`0bca788`
- 改動：新增逐趟實玩檢查表、健康指標、已知假設與一次只調一組數值的紀律；同時把 Roguelike 起始 HP 從 10 調回 12，與設計及後台預設一致，目標保留 3–4 個有效回合的反制空間。
- 主要檔案：`ROGUELIKE_PLAYTEST.md`、`roguelike.html`
- 驗證：`git show --stat 0bca788` 確認 2 個檔案、74 行新增與 1 行刪除。

#### 17:19｜替對手角色保留提示框空間

- Repo／commit：`dip-vinyl-shop`／`d35f889`
- 改動：對手氣場提示框左側預留 72px，避免提示框延伸到絕對定位的對手角色與唱片堆區域；桌面與手機規則同步。
- 主要檔案：`roguelike.html`
- 驗證：`git show --stat d35f889` 確認 1 個檔案、3 行新增與 2 行刪除。

#### 17:34｜讓對手提示框依內容收合

- Repo／commit：`dip-vinyl-shop`／`218f367`
- 改動：提示框改為靠右、`fit-content`，最大寬度扣除左側 72px；長文字維持單行並以省略號截斷，減少空白框佔據牌桌。
- 主要檔案：`roguelike.html`
- 驗證：`git show --stat 218f367` 確認 1 個檔案、3 行新增與 3 行刪除。

#### 18:47｜加入獨立像素戰鬥介面預覽

- Repo／commit：`dip-vinyl-shop`／`f522b6d`
- 改動：新增一份獨立的像素風戰鬥介面預覽頁，作為視覺方向試作，沒有直接替換正式對戰頁。
- 主要檔案：`battle-pixel-preview.html`
- 驗證：`git show --stat f522b6d` 確認新增 1 個檔案、297 行。

#### 18:48｜撤回像素戰鬥介面預覽

- Repo／commit：`dip-vinyl-shop`／`cae1b4c`
- 改動：完整撤回前一筆像素介面試作並刪除預覽頁；這個預覽不是現行產品功能。
- 主要檔案：`battle-pixel-preview.html`（刪除）
- 驗證：`git show --stat cae1b4c` 確認刪除 297 行，與 `f522b6d` 的新增互相抵銷。

#### 20:25｜建立音樂地圖預覽與勝場探索獎勵

- Repo／commit：`dip-vinyl-shop`／`c3e11a8`
- 改動：新增八大曲風雷達／里程碑音樂地圖、首頁入口、獨立頁與品味生死鬥預覽；Roguelike 勝利後改為必須先翻一張新專輯、閱讀介紹並帶入下一場，實玩檢查表也加入抽盤完成率指標。此階段地圖先使用可操作的示例資料。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`index.html`、`pvp.html`、`roguelike.html`、`ROGUELIKE_PLAYTEST.md`
- 驗證：`git show --stat c3e11a8` 確認 6 個檔案、115 行新增與 8 行刪除。

#### 20:49｜Worker 新增專輯曲風查詢

- Repo／commit：`dip-vinyl-worker`／`4234824`
- 改動：新增 `/album-genres`，先從 Spotify 專輯／藝人曲風取得資料，空白時退回 Last.fm 專輯或藝人標籤，再映射到音樂地圖的八大曲風；跨界專輯最多回傳兩條路徑，成功結果寫入 KV 快取。
- 主要檔案：`src/index.js`
- 驗證：`git show --stat 4234824` 確認 1 個檔案、61 行新增；差異中可見 Spotify、Last.fm fallback 與 `musicMapGenres` 規則。

#### 20:49｜音樂地圖接上玩家永久卡冊

- Repo／commit：`dip-vinyl-shop`／`894d241`
- 改動：移除示例操作，改從玩家 `musicMap` 與永久卡冊讀取真實收藏；舊卡冊首次開啟時逐張補查 `mapGenres` 並建立地圖，之後在商店、單場對戰與 Roguelike 永久收卡時同步累加專輯數及曲風點數；品味生死鬥顯示登入玩家的精簡地圖。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`index.html`、`pvp.html`、`battle.html`、`roguelike.html`
- 驗證：`git show --stat 894d241` 確認 6 個檔案、123 行新增與 76 行刪除；差異中可見卡冊回填、`mapGenres` 儲存及 Firestore `increment`。

#### 20:58｜更新音樂地圖元件快取版本

- Repo／commit：`dip-vinyl-shop`／`121db1d`
- 改動：將獨立音樂地圖與品味生死鬥引用的 `music-map-widget.js` 版本參數更新，強制瀏覽器取得接上真實收藏後的新元件。
- 主要檔案：`music-map.html`、`pvp.html`
- 驗證：`git show --stat 121db1d` 確認 2 個檔案各替換 1 行。

#### 21:13｜修正手機版音樂地圖標籤被裁切

- Repo／commit：`dip-vinyl-shop`／`7d8d1ea`
- 改動：手機完整地圖限制為 350px，並擴大 SVG `viewBox`，讓八大曲風標籤與數值有足夠外圍空間；同步更新元件快取版本。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：`git show --stat 7d8d1ea` 確認 3 個檔案、4 行新增與 4 行刪除。

#### 22:02｜提高手機版音樂地圖標籤可讀性

- Repo／commit：`dip-vinyl-shop`／`b25a022`
- 改動：手機完整地圖使用固定八方向標籤座標與專用 `viewBox`，曲風名稱及數值字級分別放大，避免依圓周計算的位置過小或靠邊；同步更新元件快取版本。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：`git show --stat b25a022` 確認 3 個檔案、15 行新增與 5 行刪除。
