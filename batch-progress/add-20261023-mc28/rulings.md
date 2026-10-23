# add-20261023-mc28 裁定（情緒薄格策展線・冷冽：歐陸自由即興＋mc34 日本前衛即興）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 6 輪，本工作階段負責 ml32、mc28。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc28 列，可擴寫 mc34），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x≥3.3、y≤0.2、z≤−0.3。
> 策展：`curation-mc28.json`（44 張）→ `master-mc28.json`（MB 回查 44/44 釘住）→ 主線汰 5（`master-override-mc28.json`）→ `pick.json`（39）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-mc28-cards.json`（39 張；研究 a–d 各 8、e 7）。身分：MB 釘住 39、§1 人工 0。
> **預留：研究 a 13161–13170、b 13171–13180、c 13181–13190、d 13191–13200、e 13201–13210、鉤子 13211–13220、寫作 13221–13230、主線 13231–13240。**
---

## 主線策展（不佔條號）
- 策展 44 張（Incus 系 20、FMP／Intakt 系 12、ICP 系小編制 6、日本音響派 6）；主場景 38、擴寫 mc34 6。WebSearch 0 次。
- **ICP Orchestra 與 Globe Unity 一張都沒收**：ICP Orchestra 的盤不是 MB 標現場，就是 Monk／Ellington 改編旋律清楚（往暖落雀躍）或大合奏太厚（落暴躁，池中 Globe Unity 4.8,1.7）；主力改小編制 duo／solo。MB 標 Live 的盤一律不收（Mengelberg／Bennink 多張、阿部薫未入池盤、EPEAE 後兩張）。
- **主線汰 5**：
  - 讓給並行的 mc33（`origin/claude/mood-ml34-mc33` 的 `curation-mc33.json` 已提）：Ikue Mori《Hex Kitchen》《Garden》（鼓機電子，屬 glitch／microsound 場景正位）。
  - x 貼邊：Paul Rutherford / Paul Lovens（池中 Rutherford 獨奏 x 2.2 落平靜）、Sachiko M《Sine Wave Solo》（極靜正弦波，體感可能判靜）、Hans Reichel《Bonobo》（MB 只有 2017 重發，且與《Wichlinghauser Blues》同型 x／z 雙貼邊，留一張）。
- 年份取原盤年（MB 首發日為重發或誤植，build-master flags 5）：Bailey & Bennink《Han》1988、Company《Company 5》1978、《Fables》1980、Bailey《Lot 74》1974、Butcher《Thirteen Friendly Numbers》1992（MB 盤名《13 Friendly Numbers》）。
- 跨分支去重：對 origin 65 個 `claude/*` 分支與 main 的 seed 與卡單 0 撞。
- 研究層重點查：《Topography of the Lungs》、Tony Oxley 同名、Alterations 的密度與厚度（y）；Barry Guy、Léandre 低音提琴獨奏（y）；Company 4、SME、News From the Shed、King Übü、大友《Cathode》稀疏段（x）；Mengelberg、Schweizer 的 Monk／township 動機（z）。

## 研究 a 組
- **13161**：Bennink《Solo》Discogs 完整盤名《Solo – Voor Masje》（ICP 011，1974）；錄音 1971–72 在自家馬廄自錄。年份維持 MB／Discogs 的 1974，維基／scaruffi 的 1970／1972 不採。
- **13162**：Mengelberg《Impromptus》年份三源不一（MB 1989、Discogs 1990、維基 1994），錄音確定 1988-06-04 FMP 柏林錄音室。卡單 year 1989 沿用不動；寫作層建議寫「1988 年錄成」。status thin（找不到樂評，旋律／Monk 動機無法由文字確認，z 存疑留給主線）。
- **13163**：Bennink《Tempo Comodo》策展層「偶有單簧管尖嘯」Discogs 無單簧管署名（只登 Drums、Other Stuff），moodGuess 存疑，列報告；status thin。
- **13164**：《Han Bennink & Derek Bailey》1969-07-30 錄音室錄製、1971 出版；維基 Bennink 頁的 1972 與 scaruffi 的 1969 年份不採。
- **13165**：Bailey／Bennink《Han》Incus CD02，1988 原盤成立（維基 Incus 頁佐證 CD02），MB 1998 為誤植。**實質現場錄音**（1986-03 巡演，Part 1 為三場觀眾私錄），MB 未標 Live；依派工規則請主線決定汰留。
- **13166**：《Instant Composers Pool》是 ICP 002，不是策展層寫的「廠牌第一號」（ICP 001＝Bennink／Breuker《New Acoustic Swing Duo》）；寫作層不可寫第一號。推翻策展層 1 處。
- **13167**：《The Topography of the Lungs》Parker 並非全程高音：維基列 3 首次中音、3 首高音（單源）；寫作層寫「次中音與高音」。y 風險無來源可判。
- **13168**：Parker《Six of One》錄音 1980、發行 1982；維基稱 live，MB／Discogs 未標，地點是教堂，含殘響。不動，知會主線。
