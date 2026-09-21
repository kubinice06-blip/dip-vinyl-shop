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
allmusic／allaboutjazz 在雲端一律 403、`itunes.apple.com/search` 間歇 403、
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
| c-174 | 41 | 1969–1971 | コロムビア28 Victor6 東芝4 King3 |
| c-175 | 41 | 1971–1973 | コロムビア17 Victor10 東芝9 King5 |
| c-176 | 41 | 1973–1977 | コロムビア18 Victor11 東芝10 King2 |
| c-177 | 41 | 1977–1979 | Victor18 東芝9 King7 コロムビア7 |
| c-178 | 41 | 1979–1981 | King17 Victor13 コロムビア6 東芝5 |
| c-179 | 41 | 1981–1982 | コロムビア17 東芝10 King8 Victor6 |
| c-180 | 41 | 1982–1984 | King12 コロムビア11 Victor11 東芝7 |
| c-181 | 40 | 1984–1987 | Victor17 King9 東芝8 コロムビア6 |
| c-182 | 40 | 1987–1989 | 東芝15 Victor14 King8 コロムビア3 |

每批的 `batch-progress/c1XX/slice.json` 已切好（`g: "a"` 前半、`g: "b"` 後半），每筆帶
`artist／album／year／rgMbid／country／format／live／poolString／house／entities／why／nReleases／note`。

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
3. ⚠ ⚠ **年份是本線最大的風險，比 Blue Note 嚴重得多。**
   列舉檔的 `year` 取 **MB 最早發行日**，而 **MB 對這四家「只建了再發」的比例很高**
   （`jp-1.md` 逐字：「只建了再發的會顯示再發年」）。
   **每一筆都要回查原盤年**，主要靠 **Discogs**（日本盤的 Discogs 覆蓋遠優於 MB）：
   `search` → 讀 `type`（⚠ **master 與 release 混在同一份結果裡；拿 master id 去打 `releases/<id>`
   會回一張完全不同的專輯，而且一樣 200**，第 1839-B 條）→ master 走 `/masters/<id>/versions`。
   改判就在 `rulings.md` 寫明改判前後與依據。
4. **掛名照池中先例**（第 307 條）：**新卡一律用池中多數寫法**，`risk` 標明 MB credit 的寫法。
   **絕不新造分裂、不自行合併。** ⚠ **漢字／羅馬字是這條線的分裂大宗**，
   `audits/pool-artist-name-splits.md` 要先讀。
   ⚠ **第 964／196／197 條：人名字串與團名字串是可以並存的**，不要把兩者收斂成一個。
5. **`why` 欄是列舉層判爵士的依據**，四種值：`rg-tag`（最可信）／`artist-tag`／`artist-search-tag`／
   imprint 推定（最寬鬆）。**`artist-tag` 與 `artist-search-tag` 的要逐張覆核曲風**——
   這四家什麼都出，演歌／偶像／輕音樂混進來的風險高。**非爵士就退，理由寫進 `rulings.md`。**
6. **`releaseType`**：列舉層已濾掉 Compilation／Soundtrack；**`live: true` 的收但要標**（本窗 45 張）。
   ⚠ **第 397 條：`secondary-types` 兩個方向都會漏**——盤名帶「ライヴ」「実況」「at ○○」的要再看一次。
7. **廠牌欄**：`entities` 是 MB 的廠牌實體名，**不等於盤面印的廠牌**
   （imprint 與母公司常互掛；Blue Note 線的第 2487 條就是這個形狀）。
   **`label` 欄要寫盤面實際廠牌＋目錄號**，以 Discogs `releases/<id>` 的 `labels` 欄為準，逐字引。
8. **三種店面查法**（第 254 條），**只寫觀察不寫結論**。
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
