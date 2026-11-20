# spotify-fill-20261106：比對規則與裁定

## 防錯規則（2026-11-07 店主：「搜尋關鍵字寫錯或語言用錯，以前犯過的錯不要再犯」）

每條對應一個真實錯案（來源：10-29 連結稽核 92 筆指錯、10-27 Bandana、11-06 本批撤回 3 筆）：

| 錯案 | 規則 |
|---|---|
| The Birthday Party → 草東沒有派對、gap → Del Water Gap、Darius → Darius Lim | 藝人正規化後**完全相同**，不收子字串包含 |
| Gong《You》→ 同名別團、The Band 同名 → 別團 | 自題專輯／藝人名 ≤4 字／專輯名 ≤3 字：Spotify 年份與卡片差 >2 年不收 |
| Taylor Swift《Fearless》→ Taylor's Version、Bandana → Beats、Black Byrd → Live、True → Digital E.P.、King Crimson → Elemental Mixes、葉啟田 → DJ Remix、Northern Exposure → Redux | Spotify 名帶 live／EP／single／instrumental／beats／remix／Taylor's Version／re-recorded／sped up／tribute／best of／redux／unplugged…而卡名沒有 → 不收；album_type=single 不收；compilation 只在卡名本身是精選時收 |
| Led Zeppelin《II》→《III》、Godfather → Part II、Prodigy → More Music for… | 專輯名只收完全相同或只差版本後綴（remaster／deluxe／anniversary／RVG…）與冠詞，不做包含或模糊 |
| 早於原盤的對應 | Spotify 年份早於卡片 1 年以上不收 |
| 語言：卡池中文一律繁體、Spotify 常是簡體；拚／拼、裏／裡等異體字 | 兩邊都繁轉簡（opencc-js 1.4.2，多對一收斂）再比；變音符號（Mëkanïk）一律去除 |
| 語言：日韓中卡查回英文名、英文卡查回在地化名 | 依卡名語系送 Accept-Language（ja／ko／zh-TW／en） |
| 關鍵字：卡名中英並列（滅火器 Fire EX.）、CJK 藝人在 Spotify 用羅馬字 | 拆語段任一段相同即算同名；data/artist-romanization.json 別名只在原名查無時才查 |
| 關鍵字：《》「」引號、冒號副標害精準查詢落空 | 查詢先清符號；album:"…" 查不到才換「藝人＋去版本後綴、去冒號副標的專輯名」一般查詢 |

## 主線判讀（不收）
- Wikidata：Justice《Cross》→ 現場盤、Alice Coltrane《Turiya Sings》→《Kirtan》2021 版、Aznavour 同名 → 別張、Celentano → 單曲、Dom Salvador → 合輯、Hank Mobley《Hank》→《Hank Mobley》。
- Spotify 搜尋：Loretta Lynn → Ed Sullivan 現場、Spandau Ballet《True》→ EP、Donald Byrd《Black Byrd》→ Live（已撤回 KV）。
- MusicBrainz：Black Radio → III、Super Discount → 2、J Dilla → Instrumentals、J Balvin → Lado B、janet. → 同名首張、Temptations → Do The Temptations、Boult → 合輯、Martinho da Vila → 同名、RC サクセション → 現場重混、Ash Ra Tempel → Mixed Tracks、Nass El Ghiwane → 精選、Kreisler → 合輯、Northern Exposure → Redux。
- 保留（原盤即現場）：Jaco《Invitation》、Buddy Rich《Big Swing Face》、Aretha《Amazing Grace》、Prêtre《Last Concert at La Scala》。

## 每日批次 2026-11-07（第 2 批，395 次）
- 找到 190（exact 170、edition 20），收 189。**不收** Philip Glass《Koyaanisqatsi》（卡為 1998 Nonesuch 重錄，Spotify 為 2009《Complete Original Soundtrack》電影原錄音，不同錄音）。
- 事故：首跑 `limit=20` 被 Spotify 拒（現行上限 10），出錯不等待、一路空打 201 次並寫入 100 列空結果；已刪除那 100 列、limit 改 10、出錯也等待、連續 3 次錯即停、出錯不寫結果。

## 每日批次 2026-11-08（第 3 批，395 次）
- 找到 261（exact 236、edition 25），全收；edition 都是同張的重製／擴充／豪華版（Mew 兩張 Extended Version、Stratovarius Original Version 亦同張）。
- 修：《Koyaanisqatsi》前一批已退回，但 v2 列有 url、make-plan 隔天又列入；新增 `rejected.json`，make-plan 一律排除。

## 每日批次 2026-11-09（第 4 批，395 次）
- 找到 149（exact 143、edition 6），全收；edition 都是同張的附加曲／重製／豪華版（Rubén Blades《Maestra vida》2025 重製亦同張）。

## 每日批次 2026-11-10（第 5 批，395 次）
- 找到 185（exact 176、edition 9），全收；edition 都是同張的重製／擴充／完整版（Goblin《Patrick》Complete OST 亦同張）。

## 每日批次 2026-11-11（第 6 批，395 次）
- 找到 223（exact 210、edition 13），全收；edition 都是同張的豪華／重製／擴充版（Curtis Mayfield《Short Eyes》原聲帶全名亦同張）。

## 每日批次 2026-11-12（第 7 批，395 次）
- 找到 153（exact 136、edition 17），全收；edition 都是同張的重製／原聲帶全名／擴充版。

## 每日批次 2026-11-13（第 8 批，395 次）
- 找到 167（exact 142、edition 25），全收；edition 都是同張的重製（RVG／Keepnews／OJC）／擴充版。

## 每日批次 2026-11-14（第 9 批，395 次）
- 找到 138（exact 117、edition 21），收 136。**不收** Michel Legrand《Les Demoiselles de Rochefort》→「Version instrumentale」純音樂版（法文 instrumentale 漏網）；Andrew Lloyd Webber《Cats》1981 原卡司 → 2019 電影版 Highlights。兩張進 rejected.json。
- 規則補強：OTHER_WORK 加 instrumentale(s)、highlights。回頭複查已寫入 2,071 條，無同類漏網。

## 每日批次 2026-11-15（第 10 批，395 次）
- 找到 94（exact 86、edition 8），全收；edition 都是同張的原聲帶／重製／擴充版。命中率下降（剩下多為冷門盤）。
- 寫入 89／94：許冠傑《半斤八兩》、陶喆、孫燕姿、張惠妹《Bad Boy》、王菲《天空》5 張 KV 已無此鍵（前台會即時查），記進 `skipped-nokey.json`，make-plan 不再列入。

## 每日批次 2026-11-16（第 11 批，395 次）
- 首跑 18 次即遇短暫 429（retry-after 23 秒）就停；改成 retry-after ≤120 秒時等待後重試、長鎖才停，續跑 377 次。
- 合計找到 57（exact 54、edition 3），全收；寫入 57，KV 無鍵 0。命中率降到約 15%（剩下多為冷門盤）。

## 每日批次 2026-11-17（第 12 批，395 次）
- 找到 101（exact 94、edition 7），全收；寫入 100，KV 無鍵 1。edition 都是同張的擴充／重製版。

## 每日批次 2026-11-18（第 13 批，395 次；11-20 才寫入）
- 搜尋 11-18 跑完後工作階段重啟，寫入延到 11-20。找到 139（exact 129、edition 10），全收；寫入 139，KV 無鍵 0。edition 都是同張重製／再發／擴充版。11-19 那批因重啟沒排到，11-20 補跑。

## 每日批次 2026-11-20（第 14 批，248 次，收尾）
- 未搜的 149 張全部搜完。找到 66（exact 65、edition 1：Dntel Deluxe 同張），全收；寫入 65。
- **收尾**：KV 原本沒連結的 4,051 張中，補上 2,657、主線退回 3、KV 已無鍵 7；**1,384 張搜過仍找不到，維持灰**（多為 Spotify 台灣區沒上架或卡名與 Spotify 差太多的冷門盤）。
