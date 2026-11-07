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
