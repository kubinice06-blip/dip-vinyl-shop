# add-20261104-ax4 裁定（新頂點盤線・流亡 B：亞洲、拉美、非洲、東歐、早期電子私壓）

> 店主 2026-11-04：同意另外上架新盤，把流亡從 254 補到約 300。交接 `batch-progress/apex-new-20261104/PLAN.md`。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；**本批明確採用頂點**：研究層確認 listeners 有效且 1–299、非錯配、冷門度 5（無串流授權再發）者 seed 第 9 欄填 `pearl`，不合格照一般卡上架或汰換。
> 策展：`curation-ax4a.json`（亞洲＋非洲 15）＋`curation-ax4b.json`（拉美＋東歐＋早期電子 13）→ 主線汰 3（`master-override-ax4aax4b.json`）→ `master-ax4aax4b.json`（25 張：MB 7、§1 人工 18）→ `pick.json`（25）→ `build-cards.mjs`，再改分研究 a–c 三組。
> 本批卡單：`desc-tools/batches/cards/add-20261104-ax4-cards.json`（25 張；研究 a 9、b 9、c 7）。
> **預留：研究 a 51801–51810、b 51811–51820、c 51821–51830、鉤子 51851–51860、寫作 51861–51870、主線 51871–51880。**
---

## 主線策展（不佔條號）
- 汰 3：Marijata《This Is Marijata》（worker listeners 35,499、Apple 有 EP 版，策展層的 1 是錯配）；Sakhile《Sakhile》（Apple 有該團 1996 年同名盤，與 1982 Moonshine 原盤關係不明，listeners 268 貼上限，不冒險）；Judas《Judas》（Apple 有 Vicor 40 週年重發）。
- 掛名：Masabumi Kikuchi Sextet 改池中慣例「菊地雅章セクステット」（池中已有《Matrix》《Re-confirmation》），英文進 `queryAlias`。菊地雅章、강태환 池中已有卡但都不是 pearl，同級一人一張不受影響。
- 年份取原盤首發年：Jesper Siliya《Giant Steps》1978、Blackfoot《Youth Power》1975（MB 日期是近年重發）。《Hairpin Circus》MB 標 Album＋Soundtrack（同名電影配樂），照收。
- 交研究層把關（流亡資格）：每張 listeners 是否對到同一張盤（不是同名藝人）、Apple／Spotify／Bandcamp 數位是否有正式串流再發、壓量與重發史。

## 研究 a 組（51801–51810）
- 51801：Les Ambassadeurs《Mandjou》流亡不合格——Apple Music 有 Badmos International 2017 正式數位版（6 首《Mandjou》＋3 首 EP），且以 Ambassadeur International 查 listeners 為 450（>299）。建議不 pearl。
- 51802：Brigth Engelberts《Tolambo Funk》流亡不合格——Apple Music 有 Badmos 2017 同六首曲目、改名《Civilisation in the World》的正式數位版。listeners 29 有效，但有串流再發。建議不 pearl。
- 51803：《Hairpin Circus》卡單 manualEvidenceUrls 的 Discogs master/3419320 是 1972 年 7 吋單曲 FS-1707，專輯 LP 正確母版是 master/539078（MB 關聯亦指此）；掛名 worker 需用英文名查（日文名無回應）。合格。
- 51804：Blackfoot《Youth Power》合格，但 Spotify／Bandcamp 無法直接開頁驗證（WebSearch 與 LITA 頁皆無數位連結，iTunes 無）；建議主線再覆核。卡單的「The Blackfoot 287」是另一團，非本盤。
- 51805：Jesper Siliya《Giant Steps》合格，同上 Spotify／Bandcamp 未能直驗；iTunes 無，僅 2018 Shadoks 實體。
- 51806：Blackbuster 與 Fanny's Group 存疑：Blackbuster 3 實為舞曲串燒（附舞步海報），非卡單所述「被 DJ 圈挖出的 Pinoy funk」；Fanny's Group 無聲音來源，moodGuess 存疑，status 標 thin。
- 51807：Last.fm 頁面本機連線回 600，listeners 一律以 worker `_listeners` 為準。Urfalı Babi 卡單 key 為 desc2: 前綴（研究稿已照卡單）。

## 研究 b 組（51811–51820）

- 51811：Sagrado Coração da Terra 流亡不合格。Apple BR 已有 Marcus Viana 名下 1984 同名專輯，且 1985 Bemol 起多次再發。
- 51812：Color Humano《Sangre del Sol》不合格。Discogs master 是 1973 年 7 吋單曲（兩首），不是專輯；該團正式專輯 Apple 已上架。
- 51813：Marlui Miranda《Olho D'Água》不合格。Apple BR 有《Olhos D'Água》1979 串流，另有 2002 CD 再版。
- 51814：Magnetic Band 是 1980 年 Melodiya 7 吋 EP（兩首），不是 LP；listeners 35 與無串流兩條過，體裁不符，建議汰換。
- 51815：Mike Nyoni 判合格。2018 Now-Again 選輯《My Own Thing》在 Apple 只收其中 4 首，整張無單獨串流。原版廠牌 Discogs／Now-Again 指 Chris Editions（CL 012），卡單掛 ZMPL 51，建議廠牌欄改。
- 51816：Krzak《Paczka》判合格但存疑。listeners 238 貼上限；廠牌實為 Pronit（卡單 Muza）；卡單 manualEvidenceUrls 的 master／release id 對調（master 873309、release 2394903）。
- 51817：Cuarteto Cedrón 判合格。curatorWhy「流亡巴黎」與時序不符（1974 才移居法國，本盤 1972 西班牙壓片）。
- 51818：Last.fm 頁面經 proxy 一律 600 無法開啟，listeners 全取 worker `_listeners`（九張皆 1–299）；Tokyo Kid Brothers、Cool Knights 判合格（Apple 查無，Cool Knights 僅 2016 義大利非官方再版）。

## 研究 c 組（51821–51830）
- 51821：c 組 7 張逐張核對流亡資格。合格 3（Lutajuća Srca 12、Eloy 12、Maxfield 75）；不合格 4：Grupa 220《Sivilo Perona》（Discogs 全為 7" 單曲，非專輯）、Schnitzler《Eruption》（Apple 有 Bureau B 2012 Kluster《Eruption》同音源）、Dissevelt（卡單證據連到單曲 master 614758，真專輯為 master 178091／MB 4f7f8f29，且有 2012 Omni CD）、Lundsten（四張 CD 合輯在 Apple 串流含〈Mizar〉，邊緣）。
- 51822：Last.fm 直連多半回 600，listeners 以 worker `_listeners` 為準；Bandcamp 搜尋頁無法載入，Spotify 未核對，Eloy／Maxfield／Lutajuća Srca 為「暫時合格」。
- 51823：MB 實際有 Eloy（RG 67561f1f）、Maxfield（RG 85d86ba0）、Dissevelt（RG 4f7f8f29）條目，與卡單 mbAbsenceProof 不符，建議主線補 mbid。

## 主線研究驗收（51871–）
- 51871 汰 5（身分錯置，非整張專輯或不是這個掛名）：Grupa 220《Sivilo Perona》（Discogs master 426402 全是 1971 七吋）、Color Humano《Sangre del Sol》（Microfon 七吋兩首）、Magnetic Band《Magnetic Band》（Melodiya 七吋 EP）、Conrad Schnitzler《Eruption》（即 Kluster 1971 告別演出同一份音源，Bureau B 2012 以 Kluster 名義正式串流）、Tom Dissevelt《Song of the Second Moon》（卡單證據是七吋；真 LP 為 Limelight LS 86050、掛名 Tom Dissevelt & Kid Baltan，worker listeners 538，超過流亡上限）。卡單 25 → 20，研究稿同步刪。
- 51872 轉一般卡 5（不填 pearl）：Les Ambassadeurs《Mandjou》（以 Ambassadeur International 查 listeners 450、Badmos 2017 正式數位）、Brigth Engelberts《Tolambo Funk》（Badmos 2017 改名《Civilisation in the World》同曲目正式數位）、Sagrado Coração da Terra 同名作（Apple BR 有 1984 原盤串流）、Marlui Miranda《Olho D'Água》（Continental 正式商業廠、Apple BR 有串流）、Krzak《Paczka》（國營 Pronit、金唱片、1999 EMI／2005 Metal Mind 兩次 CD 再發，不符「私壓或極小廠」；listeners 238 貼上限）。
- 51873 流亡 15 張照研究層合格採用。兩個邊緣案例照收：Mike Nyoni《I Can't Understand You》——Now-Again 2018 選輯《My Own Thing》只收其中 4 首，整張無單獨串流；Ralph Lundsten《Elektronisk Musik》——只有〈Mizar〉一首收進 4CD 合輯串流。判準：「正式串流再發」指整張專輯，單曲收進跨盤選輯不算。主線另以 iTunes Search（jp／us）抽查 Hairpin Circus、강태환、Tokyo Kid Brothers、Cool Knights、Mike Nyoni，都沒有本盤。
- 51874 Hairpin Circus 身分證據改用 Discogs master 539078（研究 a：原 3419320 是 FS-1707 七吋）。

## 鉤子層（c）（51856–51860；a、b 組用 51851–51855）
- 51856 交件 `desc-tools/batches/hooks/add-20261104-ax4-hooks-c.json`（4 張，以主線汰後研究稿為準）。預算公式照 HOOK-DISPATCH §二：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（hook 原始／加權｜預算）：Lutajuća Srca 20／20｜147（thin 上限 170）；Eloy《Shānti》30／24｜224；Maxfield《Electronic Music》28／22.5｜223；Lundsten《Elektronisk Musik》21／21｜170（thin 上限）。初稿四張全超（208／257／299／192），整格捨去：Lutajuća 的詞曲署名與團員名、Eloy 的 Milhaud 與 Campo 朗讀、Maxfield 的 La Monte Young／一百多首只發六首／〈Amazing Grace〉佈道磁帶、Lundsten 的瑞典北部與 Frankenburg 名、去世年。壓完回核：四張 hook 依賴項（尼什＋兩支廣電樂團、Stockhausen 邀請＋冥想副題、Five Spot 拼貼、粉紅木造宅邸人稱城堡＋先驅）都在 g1／g2。
- 51857 骨架歸屬（c 組 4 條、各張 note 只寫自己的歸屬句）：Lutajuća Srca＝地方小團配國營廣電管弦樂團；Eloy＝學院作曲家受邀進外國電台工作室（兼轉向亞洲哲學）；Maxfield＝作者去世當年才出版（與作品直接綁定，note 標時序、語氣克制）；Lundsten＝自設工作室在特殊建築裡。請主線與 a、b 組的骨架表合併比對。
- 51858 hook 四型：場景（Lutajuća、Lundsten）／人物定調（Eloy）／懸疑（Maxfield，收尾在 g2〈Bacchanale〉）。四張各一位藝人，無跨張「他／她」；引入法配表：Lutajuća＝團名＋成立地年、Eloy＝全名＋生年與國籍、Maxfield＝身分（接下 Cage 的 New School 課）、Lundsten＝全名＋生年（hook 已給身分）。第二句句型：Lutajuća「團名領句」、Eloy「全名生年領句」、Maxfield「接下」動詞句、Lundsten「全名生年」——Eloy 與 Lundsten 同為人名領句，Eloy 寫「生於 1938 年的法國」、Lundsten 寫「1936 年生於瑞典」，語序錯開。四張 note 皆無「X 月 X 日」，「日」後一字不適用。
- 51859 n-gram 自查：c 組四句 hook 之間中文 4-gram 0 條；對 repo 內既有 add-2026* hooks 掃開頭前四字與 4-gram，撞到的已改（「南斯拉夫的」「塞爾維亞的」開頭、「背後站著」「國作曲家」「城堡裡的」「的工作室」「電子唱片」、開頭「Five」對 Five Satins），剩「管弦樂團」「電子音樂」兩個樂種／編制詞。hook 與自己 note 逐字重複 8 字以上：只有專名 Stockhausen。
- 51860 腳本：`chk-hook-crossgroup.mjs add-20261104-ax4`（僅 c 組在場）全部通過；`qa-batch.mjs hooks add-20261104-ax4` 僅報 a、b 缺檔，c 組 0 標記。a、b 交件後需重跑一次跨組。

## 鉤子層（a、b）（51851–51855）
- 51851 交件 `desc-tools/batches/hooks/add-20261104-ax4-hooks-a.json`（9）、`-hooks-b.json`（7），key／順序照研究稿。預算公式照 HOOK-DISPATCH §二（同 51856）；上限 full 230／thin 170（status 照研究稿）。逐筆（預算｜hook 原始／加權）：a1 Hairpin Circus 215｜23／23；a2 Mandjou thin 166｜28／23；a3 Giant Steps 213｜26／21.5；a4 Youth Power 227｜29／22.5；a5 Tolambo Funk thin 152｜23／23；a6 Blackbuster 3 219｜23／23；a7 Korean Free Music 214｜21／21；a8 Cium Mesra thin 168｜23／20；a9 Disko Kebap 219｜23／23；b1 Golden Bat 219｜23／23；b2 Bana Mulenga thin 170｜22／22；b3 I Can't Understand You 225｜29／20；b4 Sagrado 215｜24／22；b5 Olho D'Água 229｜30／25；b6 De Argentina 230｜18／15；b7 Paczka 208｜29／25.5。初稿 13 張超標，整格捨去：Mouri／Victor 錄音室、Ousmane Kouyaté、〈Tandizo Ni Labwino〉當地語曲名、Tommy Mwale、Alfred Yabe／George Kabale、Holando Boys、P-Vine CD、〈Get Up And Boogie〉曲長、〈Charleston〉、Live Improvisation 副題、BRD-016、下田逸郎、MR-5005、Khuzwayo／Nyati、Reprise 再版、Sagrado 曲長、Krzak 三位團員名與〈Kawa Blues〉。壓完回核 hook 依賴：a3 補回「500 張」、a4 補回「學生身分」、a5 補回「六首」、a7 改寫成「三軌東京、一軌首爾」，其餘依賴項都在 g1／g2；b4 把「日本最早出 CD」前移到 g2、b7 把 10 分鐘那首前移到 g2。
- 51852 骨架歸屬（16 張 16 條，各張 note 只寫自己的歸屬句）：a1 爵士樂團替電影配樂＋兄弟同團；a2 西非盤經法國廠再版傳到歐洲；a3 考古廠牌重壓（全批唯一一張帶「考古廠」）；a4 同一批錄音被另一廠買下、改名再發（全批唯一「改名」）；a5 錄在別國錄音室、本國廠牌發行；a6 舞廳教學盤（附舞步海報）＋同年多國發行；a7 跨國多場現場拼成一張＋外國製作人；a8 國營唱片廠（全批 a、b 唯一「國營」；c1 note 有「國營 PGP RTB」當形容詞、骨架歸 c1 的廣電管弦樂團，請主線留意兩張是否要再錯開）；a9 傳統樂器接合成器與節奏機；b1 先在紐約舞台上演才灌唱片；b2 英文與當地語言曲名並陳；b3 樂團主唱單飛、換踏板轉放克；b4 自費首作先在日本紅；b5 民族音樂研究者出唱片＋名家伴奏；b6 探戈接上詩歌與政治歌謠（流亡法國只當時序一格）；b7 創團者離團後的轉型期。尚比亞四張（a3／a4／b2／b3）廠牌面向錯開：a3 重發盤面仍印原號、a4 ZMPL 買下母帶、b2 只寫 ZMPL 13 目錄、b3 簽約 Chris Editions 先後兩張。地方場景（盧薩卡）只在 a4 一格。
- 51853 hook 四型：人物定調（a1、a4、b3、b5）／場景（a2、a6、a7、a9、b1）／斷言（a3、a8、b2、b6、b7）／懸疑（a5、b4，收尾在 g2）。開頭前四字 16 張互異，並對 repo 全部既有 hooks 檔與 c 組掃過無撞。無跨張同藝人，「他／她」只 b3（「他」領 g1，第二句補名）、b5（hook「她」，第二句補名）。第二句句型逐張配死：a1 指示詞＋編制「這支六重奏」／a2「領銜署名是」／a3 名字直接領句／a4「樂團叫」／a5「掛名」／a6 年份逗號「1976 年，菲律賓」／a7「吹…的是」／a8 國籍＋樂團名／a9 名字由來／b1 劇團名／b2 名字＋同位語「這支尚比亞樂團」／b3 身分＋名字／b4 地名＋身分＋成軍年／b5 名字＋生年出生地／b6「創團者」／b7「定名的」。
- 51854 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：全 a、b 只有 b1「日由」，其餘只寫到年或月（a7 改成「6 至 9 月」）；c 組無日期。hook 間中文 4-gram（a、b、c 合掃）0 條；hook 對別張 note 只剩樂器「薩克斯風」、地名「象牙海岸」。拆掉的：「象牙海岸」a2×a5 hook、「一張尚比／張尚比亞」a3×b2 hook、「當地語言」b2 hook×a3 note、開頭「布宜諾斯」撞既有 hook。hook 與自己 note 無 6 字以上逐字重複子句（a6「附兩張舞步教」、b5「她研究亞馬遜」已改），只剩年份與人名。媒體名、媒體票選（Zambia Daily Mail、culture.pl）、Discogs 收藏／標價、串流上架資訊一律未進 note；b6 不寫成流亡期錄音；b1 不寫具體編制；b4 不混 1987 同名作。
- 51855 腳本：`qa-batch.mjs hooks add-20261104-ax4` 全部通過 ✓；`chk-hook-crossgroup.mjs add-20261104-ax4`（3 組 20 張）✓ 全部通過，hook 加權 15–25.5。
