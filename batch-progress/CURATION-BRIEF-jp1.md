# 策展簡報：日本爵士四大廠列舉線 jp-1（c-173 起，每批 40–41 張）

**店主 2026-09-15：「三盲鼠已經都有了／其他日本熱門先策展／美國先挖 blue note／不限數量 先列舉」
→ 2026-09-21：「Jp1 先開，切批次，先做 10 批」。**

Blue Note 線（c-148…c-172，839 張）已收尾。這條線接手 `batch-progress/enum/BRIEF-jazz-labels.md`
分工表的 **jp-1**：**Victor／JVC**、**東芝 EMI／Express**、**日本コロムビア／Better Days／Takt**、
**King／Paddle Wheel／Electric Bird**，四家的日本本土爵士盤。

`lineType: 深掘`。

## 〇、固定規格與共通條款

固定規格照 `CURATION-BRIEF-bluenote-post1985.md` → `CURATION-BRIEF-bluenote.md` → `c131` → `c127`
→ `c126` → `c103plus` → `c93plus`，**一字不改**。共通五條照 `CURATION-BRIEF-c128-c130.md` 第〇節。
**沒有 §1.5 獨立閘。**
⚠ **`CURATION-BRIEF-bluenote-post1985.md` 的「附錄二（雲端線實測）」照用**——
allmusic／allaboutjazz 在雲端一律 403、`itunes.apple.com/search` **間歇性 403，不是恆定**
（第 1853-B 條：c-173 b 組 11 次全部 200、us／jp 皆通，3 筆掛名是靠 Apple jp 定案的；**仍要備援**）、
`api.discogs.com/releases/<id>` 的完整 credits 是必跑的（`search` 摘要的 `extraartists` 只回 4 筆）、
Discogs `tracklist` 含 `position` 為空的標題列。

## 一、這 10 批是什麼——切法與**被排除的是什麼**

來源是 `batch-progress/enum/{jp-victor,jp-toshiba,jp-columbia,jp-king}.json` 的 `rows`
（2026-09-15 由 MB `release?label=` 逐頁拉完、折疊到 release-group）。

**四家合計缺 1,250 張**，本線這樣切：

| | 張數 | 處置 |
|---|---|---|
| 外國藝人的日本盤（`foreignArtist: true`） | 412 | **不切進本線**（是日本壓片、不是本家原盤，卡的身分應歸原盤；要不要另立一線待主線裁定） |
| 本土爵士盤、無年份 | 6 | **延後**，見 `batch-progress/enum/jp-1-deferred.json`；**定年後才排批** |
| 本土爵士盤、1990 年後 | 424 | **延後**（本窗之後的下一段） |
| **本土爵士盤、1989 年前** | **408** | **→ c-173…c-182，本次 10 批** |

依 **年份 → 廠牌（Victor／東芝／コロムビア／King）→ 掛名 → 盤名** 排序後平均切開：

| 批 | 張數 | 年份 | 廠牌分佈 |
|---|---|---|---|
| c-173 | 41 | 1958–1969 | コロムビア14 King13 Victor13 東芝1 |
| c-174 | 37 | 1969–1971 | コロムビア22 東芝6 Victor6 King3 |
| c-175 | 37 | 1971–1975 | コロムビア16 Victor9 東芝7 King5 |
| c-176 | 37 | 1975–1977 | コロムビア16 東芝10 Victor10 King1 |
| c-177 | 37 | 1977–1979 | Victor18 King13 コロムビア4 東芝2 |
| c-178 | 37 | 1979–1981 | コロムビア14 King9 Victor9 東芝5 |
| c-179 | 37 | 1981–1983 | King13 東芝9 Victor8 コロムビア7 |
| c-180 | 37 | 1983–1984 | コロムビア13 King9 Victor8 東芝7 |
| c-181 | 37 | 1985–1987 | Victor21 東芝8 King5 コロムビア3 |
| c-182 | 36 | 1987–1989 | 東芝15 Victor10 King8 コロムビア3 |

⚠ **c-174…c-182 在 c-173 交件後重切過**（第 1849-B 條）：原本各 40–41 張，
**`jp1-pool-recheck.mjs` 重算確定撞池的 35 筆已剔除**，所以現在是 36–37 張。
**c-173 的 41 張維持原樣**（它跑完才發現這件事）。

每批的 `batch-progress/c1XX/slice.json` 已切好（`g: "a"` 前半、`g: "b"` 後半），每筆帶
`artist／album／year／rgMbid／country／format／live／poolString／house／entities／why／nReleases／note`。

⚠ ⚠ **`inPool` 這一欄整欄作廢，不要看它**（第 1849-B 條）。列舉檔的池比對日是 2026-09-15，
而 **c-131…c-134 那四批日本爵士是之後才落地的**，吃掉的正是這條線前半的年段
（c-173 實測 **41/41 假陰性、實際撞池 13 張**）。

**c-174 起的 slice 改掛 `poolRecheck` 與 `artistVariants` 兩欄**，由
`node batch-progress/jp1-pool-recheck.mjs` 產生（每個掛名向 MB 問 `artist?query=`，
把 `name`／`sort-name`／`aliases` 收成同義字串集，再掃 `seed_cards.json` ＋ 本機卡單）：

- `poolRecheck.status` 說「池中查無此藝人」→ ⚠ ⚠ **這一格同樣要逐張人工掃，不要當結論**
  （第 1909-B 條：c-177 a 組實測 **9 筆裡錯了 5 筆，56%**）。**三種失效機制會同時出現**：
  反查到 Group 實體就掃不到人名／反查到 Person 實體就掃不到編制字串／**比對日早於近批落地**。
  **c-178 起的 slice 已用今天的池重掃並加了第三道「聯名內含」比對，但那只是把機率壓低，不是解決。**
- `poolRecheck.status` 逐字 **「同藝人在池中，盤名不同——逐張人工比」** →
  `artistAlbumsInPool` 列出這位藝人池中已有的盤（格式 `來源｜掛名｜盤名｜年`）。
  ⚠ **跨文字系統的盤名比對不可靠**（`Harlem Nocturne` vs `ハーレム・ノクターン`），
  **腳本刻意不自動判定**——**這一格要你逐張人工比**。撞到就退。
- `artistVariants` 是該掛名的全部同義字串，**掃池與查店面時兩種文字都要試**。

⚠ ⚠ **`artistVariants` 裡沒有漢字／假名字串就當「沒查過」，長度不是判準**（第 1868-B 條）：
`Kosuke Mine Quintet` 的變體長度是 2、兩個都是羅馬字編制串，
漏掉 seed 裡逐字同碟的 `峰厚介《Daguri》1973`。
**而且要逐「方」檢查**（第 1873-B 條）：**聯名列裡任何一方只出現羅馬字，那一方就算沒查過**——
c-175 a 組的 `沢田靖司`（MB `inc=aliases` 回的是空陣列）與 `東京室内楽協会`
都是人工查出漢字字串才補掃到的。那種列一律要你自己查出漢字名再掃一次池。

⚠ **c-175 起改用 v2（`jp1-slice-enrich.mjs`），同義字串的來源換了**（第 1856-B 條）：
v1 用 `artist?query=artist:"<名>"` 找同義字串是錯的——**MB 的 `artist:` 欄位查詢不比對 alias**
（實測 `artist:"Mina Aoe"`、`artist:"Takehiro Honda"` 都回 **count 0**），
而且回得到的可能是**別的實體**（`artist:"Sadao Watanabe"` 回的是 `Sadao Watanabe Quintet`，
它的 alias 裡沒有 `渡辺貞夫`）。
v2 改成**由 `rgMbid` 反查藝人 MBID**（`release-group/<id>?inc=artist-credits+releases`），再取該藝人的 alias。

⚠ **重算只保證「確定撞池」的已被剔除，不保證沒有漏網**：
v1 對 c-173 的 13 筆實際撞池抓到 12 筆（92%），**剩下那 8% 還是要靠你**。

### `titleCheck`（c-175 起）

⚠ **`album` 欄一律以「最早 release 的 title」為準，不讀 RG title**（第 1858-B 條）。
c-174 b 組實測 **RG title 取自再發的比例 33%（收件裡 57%）**，形狀是**原盤與再發 MB 都建了、
RG title 卻取了再發那一筆**。slice 的 `titleCheck` 欄已掛好：
`rgTitle`／`earliestRelease{date,title,country}`／`titlesSeen`（全部出現過的標題），
兩者不同時 `note` 會有一行逐字警語。
⚠ **只報不判**——最早的 release 未必是日本原壓（可能他國先發或 pseudo-release），**逐張人工定案。**

## 二、⚠ 你的工作是覆核，不是挑

逐筆做這些事（照 `CURATION-BRIEF-bluenote.md` 第一節，差異已標）：

1. **回問 MB** `release-group/<id>` 與 `release?release-group=<id>&inc=media+labels`，核 artist-credit、
   first-release-date、原盤 catno、載體、軌數。**`rgMbid` 用 slice 的，不要自己另找**
   （查出釘錯要在 `rulings.md` 寫明）。
   ⚠ **查 MB 一定用 `releasegroup:`／`release:`，`title:` 不是有效欄位**——
   Lucene **不報錯、靜靜回 `count 0`**（第 1844-B 條，Blue Note 線上因此誤判過一張「MB 查無」）。
2. **實掃卡池**（`seed_cards.json` ＋ `desc-tools/batches/cards/c1*.json`）。
   `inPool` 是 2026-09-15 子字串比對的結果，**假陽性與假陰性都有**。撞到就退掉、在 `rulings.md` 記下，
   **不要補別張**（下一批清單已固定）。
   ⚠ **日本藝人要同時試漢字與羅馬字**（池中兩種都有：`渡辺貞夫`、`Hidehiko Matsumoto`），
   MB 別名也要試。
3. ⚠ ⚠ **原盤年與原盤盤名，兩件都要量**（第 1851-B 條；**這一段原本寫「年份是本線最大的風險」，
   c-173 實測不成立**：41 筆只改判 1 筆年份，b 組 20/20 原盤年與 slice 完全一致、18/20 的 release
   端點直接有 label ＋ catno。**真正在漏的是盤名**——b 組 3 筆（15%）的 RG title 取自再發版，
   例如 `イージー・リスニングの貴族達`→原題《Gazing The Cygnus》、
   `決定盤!これぞジャズ・ロック`→《This Is Jazz-Rock》。
   **照抄再發標題會做出一張盤名自稱「易聽音樂的貴族們」的爵士卡。**）
   列舉檔的 `year` 與 `album` 都取自 **MB 最早建檔的那一筆**，而 **MB 對這四家「只建了再發」的比例很高**。
   **每一筆的年與盤名都要回查原盤**，主要靠 **Discogs**（日本盤的 Discogs 覆蓋遠優於 MB）：
   `search` → 讀 `type`（⚠ **master 與 release 混在同一份結果裡；拿 master id 去打 `releases/<id>`
   會回一張完全不同的專輯，而且一樣 200**，第 1839-B 條）→ master 走 `/masters/<id>/versions`。
   ⚠ ⚠ **`catno=` 反查回來的年份與 slice 一致，也不保證那是原壓**（第 1887-B 條）——
   **固定動作是逐筆打 `/masters/<id>/versions` 看整張版本表**，不是比對單筆年份就算數。
   **`versions` 是本線在「原壓年／原盤盤名／再發數」三件事上的單一真相來源。**
   ⚠ **查日本樂手漢字名的來源順序**（第 1890-B 條）：MB `artist-rels`／alias → Apple jp → 盤面
   → ⚠ **第四條：`api.discogs.com/artists/<id>` 的 `namevariations`**（c-176 a 靠它查到 `野村元`，前三條全落空）。
   ⚠ **`live` 的判準要收窄**：`Recorded At: <場館>` **本身不足以判實況**，
   還要 notes 有 live／觀眾／單一日期；反向則是**系列欄有 `Direct Cutting` 而 MB 標 `Live` 時先假設是工法**。
   ⚠ **slice 的 `artist` 欄本身可能帶 U+2010**（`Hi‐Fi Set`），照抄會被 `chk-prop` 擋。
   改判就在 `rulings.md` 寫明改判前後與依據。
4. **掛名照池中先例**（第 307 條）：**新卡一律用池中多數寫法**，`risk` 標明 MB credit 的寫法。
   **絕不新造分裂、不自行合併。** ⚠ **漢字／羅馬字是這條線的分裂大宗**，
   `audits/pool-artist-name-splits.md` 要先讀。
   ⚠ **第 964／196／197 條：人名字串與團名字串是可以並存的**，不要把兩者收斂成一個。
5. ⚠ ⚠ **`why` 欄一律只當線索、不當結論**（第 1850-B 條，**這一段原本寫「`rg-tag` 最可信」，c-173 兩組實測推翻**：
   a 組 16 筆 `rg-tag` 有 5 筆非爵士、b 組 16 筆有 7 筆非爵士——**MB 的 RG tag 沒有票數門檻**，
   列舉腳本只看有沒有 `jazz`，同一筆並列的 `easy listening(1)`／`pop(1)` 被忽略）。
   實際出現的值有七種：`rg-tag`／`artist-tag`／`artist-search-tag`／`artist-disambig`／
   `pool-jazz-artist`／`imprint`／**`curator-list`**（本窗 7 筆，最不可信）。**不分哪個值，每一筆都要獨立覆核曲風。**

   ⚠ **判準用這一套**（c-173 b 組第 3753 條確立，後九批照此）：

   ⚠ **四款不是全等的**（第 1857-B 條，c-174 b 組第 3819 條提出並經我採納）：

   **①②成立 → 進人工判，不是自動退**：
   1. Discogs `styles` 含 **`Easy Listening`** 或 **`Kayōkyoku`**；
   2. Discogs `genres` 含 **`Folk, World, & Country`**（Discogs 把演歌／歌謡曲歸在這個桶）。
   **理由**：Discogs 對日本盤的 genre 桶很粗，**尺八／琴／和太鼓演奏的爵士盤會被丟進去**。
   實例是《Bamboo》（村岡実，尺八）字面中①②但③④不成立 → 收；
   而同一位藝人的《Harlem Nocturne》在單一 Easy Listening style 下 c-173 也是判收。

   **③成立 → 退（唯一的充分理由）**：
   3. **曲目過半是日本歌謡曲／演歌**（即使 genre 只寫 Jazz）。

   **④也降為「進人工判」**（第 1871-B 條，c-175 a 組第 3873 條提出並經我採納）：
   4. 藝人的整份 Discogs 目錄落在ムード／ソフト・コーラス／イージー・リスニング 系列。
   **理由**：④ 看的是**藝人的職業身分**，而 **1960–70 年代的日本錄音室樂手個個兼接ムード與爵士**。
   照字面執行會退掉 `Singers 3《Foliole #2》` 那種——A 面是佐藤允彦 16:36 的委作、
   伴奏是 The Freedom Unity ＋ 六位池中爵士樂手、King 自家爵士復刻線再發三次。
   **退件要看這張碟本身，不是看這個人平常接什麼案子。**

   **⑤（第 1861-B 條補，堵收件款的縫；措辭經第 1871-B 條修正）**：
   `genres` **不含 Jazz**，或含 `Non-Music`／`Stage & Screen`，而曲目又非爵士標準曲或原創曲
   → **不成立收件**。
   ⚠ **不要寫成「不以 Jazz 為首」**——**Discogs 的 `genres` 陣列是字母序**
   （c-175 a 組實測 19 筆有 14 筆嚴格字母序），`Electronic, Jazz, Rock` 不代表它不是爵士盤。
   **「首位」這個概念只對 `styles` 有意義。**

   **收（爵士）**：Discogs `genres` **含** Jazz（或 Jazz/Rock）且 `styles` **不含** Easy Listening／Kayōkyoku，
   且曲目是爵士標準曲或原創曲。

   **非爵士就退，理由與命中的條號寫進 `rulings.md`。退件不補張。**
6. **`releaseType`**：列舉層已濾掉 Compilation／Soundtrack；**`live: true` 的收但要標**（本窗 45 張）。
   ⚠ **第 397 條：`secondary-types` 兩個方向都會漏**——盤名帶「ライヴ」「実況」「at ○○」的要再看一次。
6b. ⚠ ⚠ **再發版本數一律以 Discogs master 的 `versions` 為準，MB 的 release 數不算數**
   ——⚠ ⚠ **而且是策展層自己逐筆跑完整張 `versions` 清單**（第 1905-B 條）。
   **c-176 的策展層這麼做了，結果研究層 12 筆逐筆重跑、改判 0 筆——本線五批以來第一次。**
   **前四批 71%／75%／47%／54% 的低估不是 Discogs 的問題，是「沒有跑版本表」的問題。**
   ⚠ **看 master 摘要不算跑版本表**；**沒有 master 頁的，只寫「資料庫裡只有這一筆」，
   不要寫成「沒有再發」。**
   （第 1879-B 條）。**連續兩批都在這裡出錯**：c-173 的《Charlie Mariano & Sadao Watanabe》
   被寫成「無再發」（Discogs master 644584 實有 10 版，含 1977 美國 Catalyst 盤）；
   c-174 b 組 **7 張有 5 張（71%）低估版本數**——《Bamboo》記 5 版、**實際 15 版**；
   《Down By The Naked City》的 `curatorRisk` 逐字寫「MB 與 Discogs 都只有 1971 原壓一版」、實際 3 版。
   **根因是只數 `mbNote` 裡的 MB release。**

7. **廠牌欄**：`entities` 是 MB 的廠牌實體名，**不等於盤面印的廠牌**
   （imprint 與母公司常互掛；Blue Note 線的第 2487 條就是這個形狀）。
   **`label` 欄要寫盤面實際廠牌＋目錄號**，以 Discogs `releases/<id>` 的 `labels` 欄為準，逐字引。
8. ⚠ **只印片假名的日本原盤，用 `lookup?id=<id>&entity=song` 可拿到全部英文原題**（第 1882-B 條）——
   《Count Buffalo Plays Country Rock》十二軌因此全部對回原曲。
   ⚠ us 的 `entity=song` 有時只回 collection 不回 track，**換 `country=jp` 再打即可**。

   **三種店面查法**（第 254 條），**只寫觀察不寫結論**。
   ⚠ **日本盤的店面覆蓋率預期比 Blue Note 低很多**，查不到是常態，不是退件理由。
9. **`why`／`risk` 的密度照 `batch-progress/c131/prop-b.json`。**

## 三、坑

1. ⚠ ⚠ **MB 建檔率低而且偏新。** `jp-1.md` 抽驗 39 張代表作：**12 張 MB 完全沒有**、
   另 **9 張 MB 有 RG 但沒掛在這四家的任何廠牌實體**（只建了 Bridge／Finders Keepers／Trunk 的再發，
   或根本沒掛廠牌）。→ **列舉檔的數字是「MB 掛在這家廠牌下的」，真實目錄至少是兩到三倍。**
   **這 10 批只做「MB 有建檔且掛得到廠牌」的那一半**；**查無的代表作不要在本線硬補**，
   記進 `rulings.md`，**留給之後的 §1 人工身分補遺批**（管線同 c-87／c-92）。
   ⚠ 同理，**藝人軸重掃**（Blue Note 線第 1812-B／1818-B 條那招）在本線一定會再找出一批缺口——
   那也是後續的事，不要現在動。
2. **黃金期（1969–1979）四家加起來 MB 只有約 180 張**，2000 年後反而多。
   本窗刻意壓在 1989 年前，就是要先把黃金期吃完。
3. **Takt（コロムビア 60 年代爵士系列）MB 只建 8 筆**；Flying Disk 22 筆；Paddle Wheel 111 筆（含再發）；
   Express 1,083 筆裡判得出爵士的只 36 張。**批內看到這幾個 imprint 的，`nReleases` 通常是 1，佐證要靠 Discogs。**
4. **同一場錄音拆成多張、同一張碟多個 RG**（原盤 RG 與再發 RG 分開建）：
   `chk-prop` 有 rgMbid 掃描（只報不擋），**盤名＋掛名撞了先查是不是同一個 RG**。
5. **盤名的文字系統**：同一張碟 MB 可能建成漢字、片假名或羅馬字。
   **`album` 欄用盤面原題**（Discogs 的 `title` 為準）；**MB 用別的寫法就寫進 `risk`。**
   ⚠ **非 ASCII 連字號會讓比對整組失準**（`chk-prop` 會擋）。
6. ⚠ **`junkoonishi.com` 已易主為博弈導流站（HTTP 200），英文維基仍掛它當 Official website——禁用來源**
   （第 1827-B 條那一批記的，本線同樣適用：日本藝人的「官網」要先看內容再用）。

## 四、交付

每組交 `batch-progress/c1XX/prop-{a,b}.json`，欄位照 `c131/prop-b.json`。
交件前自己跑 `node batch-progress/c1XX/chk-prop.mjs a b` 與
`node batch-progress/dedup-crossbatch.mjs c1XX`，**標記 0 才算交件**。
裁定寫進 `batch-progress/c1XX/rulings.md`。

⚠ **`chk-prop` 標記 0 之後還要做一件事**（第 1263 條）：
**把 slice 的 `catno` 逐筆丟進 Discogs `catno=` 反查，看回來的 master 年份與本批 `year` 差多少。**
本線的 slice **沒有 catno**（列舉層沒拉），所以這一步改成：**用第二節第 3 點查到的 Discogs master 反查年份**。

**邊界**：不碰 `seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore（唯讀掃描可以）。
不 `git commit`／`git push`／不動 git 索引。**絕不 `git add -A` / `git add .`。**
