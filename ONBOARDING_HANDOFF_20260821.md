# 2026-08-21 雲端研究批次交接單

這份文件給**回本機收尾的人**看。雲端工作階段只做到 **prepare gate**，
線上資料（Firestore `card_catalog`／`album_overrides`、Worker KV、`seed_cards.json`、
`apex_pool.json`）**一律沒動**，所有 manifest 的 `published` 全是 `false`。

照本文件第三節的順序推，就能把每一批變成線上的卡。

---

## 一、批次現況

| 批次 | manifest | 張數 | prepare gate | 狀態 |
|---|---|---:|---|---|
| c-29 藍調正典 | `onboarding-manifest-c29-blues-20260821.json` | 15 | **0 error / 1 warning** | 可推 |
| c-30 藍調擴充 | `onboarding-manifest-c30-blues-20260821.json` | **326** | **0 error / 44 warning** | 可推 |
| c-31 世界音樂 | `onboarding-manifest-c31-world-20260821.json` | **530** | **0 error / 64 warning** | 可推 |
| c-32 民謠 | `onboarding-manifest-c32-folk-20260821.json` | **335** | **0 error / 25 warning** | 可推 |

（進行中的批次完成後會補進這張表並更新張數與 gate 結果。）

### c-30 細節

326 張、稀有度 rare 163／uncommon 160／epic 3；封面來源 CAA 310／Apple 官方圖 16
（CAA 整個 release-group 都沒圖時的救援，`cover.note` 有記）；固定試聽 Apple ready 266／
unavailable 60。**hall 候選 11 張**（見第四節第 3 點，全部待你裁定，未寫入 `apex_pool.json`）：
Elizabeth Cotten《Folksongs and Instrumentals with Guitar》、Professor Longhair《Crawfish Fiesta》、
Dr. John《Dr. John's Gumbo》、Big Brother《Cheap Thrills》、Howlin' Wolf《Moanin' in the Moonlight》、
Sonny Boy Williamson II《Down and Out Blues》、Junior Wells《Hoodoo Man Blues》、
Otis Rush《Right Place, Wrong Time》、Jimmy Reed《I'm Jimmy Reed》、Willie Dixon《I Am the Blues》、
The Paul Butterfield Blues Band 同名首張。

候選 351 張裡有 25 張在管線各關被擋下，理由都記在研究稿裡，其中幾類值得知道：
MusicBrainz 只有合輯條目或根本沒建檔（戰後老盤常見）、Apple 試聽配到同名選輯
（Furry Lewis 配到 1927–29 戰前錄音、Pink Anderson 與 Big Bill Broonzy 曲目零重疊）、
兩個策展區塊用不同題名提同一張碟（Jimmy Witherspoon、SRV 各一組）、
以及 Janis Joplin《Pearl》——**prepare gate 查出它已經在 `apex_pool.hall` 王牌池裡**，
依規則不得再以普卡上架，已自本批移除。

### c-32 細節

335 張、稀有度 uncommon 206／rare 115／epic 14；封面 CAA 332／Apple 官方圖 3；
固定試聽 Apple ready 243／unavailable 92（**中日韓專輯在 Apple 的覆蓋率很低**，
92 張裡多數是這批，回本機補 YouTube Music 會比藍調線費工）。**hall 候選 10 張**待你裁定：
Woody Guthrie《Dust Bowl Ballads》、Nitty Gritty Dirt Band《Will the Circle Be Unbroken》、
Flatt & Scruggs《Foggy Mountain Banjo》、J.D. Crowe & The New South 同名盤、
Fairport Convention《Liege & Lief》、Richard & Linda Thompson《Shoot Out the Lights》、
楊弦《中國現代民歌集》、齊豫《橄欖樹》、岡林信康《わたしを断罪せよ》、井上陽水《氷の世界》。

**含 50 張中日韓專輯**，台灣民歌運動、日本 70 年代フォーク、韓國 통기타 都補進來了。
你指定的三張裡，**李雙澤與楊祖珺早就在池裡**（前者 2026-08-16 以《敬！李雙澤 唱自己的歌》
上架、後者在 `apex_pool.pearl`），本輪不需再收；**只有陳達還沒上架**，走人工身分路線但卡在封面，
詳見第七節。

**這批 gate 擋下 24 張已在王牌池的卡**（Dylan《Freewheelin'》、Joni《Blue》、Nick Drake 三張、
Bon Iver、Sufjan、Fleet Foxes…）。原因是策展只比對 `seed_cards.json`，而成了王牌的卡不在那份名冊裡。
管線已補上這道檢查，但**這條教訓值得記住：卡池的完整名冊是 seed + apex 兩份**。

### c-31 細節

530 張、稀有度 uncommon 347／rare 147／epic 36；封面 CAA 513／Apple 官方圖 17；
固定試聽 Apple ready 357／unavailable 173。這是三批裡最大也最硬的一批：非洲、拉美、
亞洲、歐洲地中海、中東、加勒比全數涵蓋。

**hall 候選 36 張**（全部待你裁定，未寫入 `apex_pool.json`）——比例偏高是有原因的：
世界音樂的「該地區史上核心」往往有明確的單一里程碑，例如 Mulatu Astatke《Ethio Jazz》
（ethio-jazz 奠基）、Umm Kulthum《Enta Omri》與《Al Atlal》、Paco de Lucía《Fuente y caudal》、
Amália Rodrigues 兩張、Fania All-Stars《Live at the Cheetah》、Tito Puente《Dance Mania》、
The Upsetters《Blackboard Jungle Dub》（最早的純 dub 專輯之一）、山口五郎《A Bell Ringing in
the Empty Sky》（航海家金唱片選曲）。**你可能會想把門檻收緊**，各卡的 `apexAssessment.reason`
都寫了依據。另外有一批 classic=5 但寫作 agent 保守標 false 的，理由多半是
「本環境只查得到 Wikipedia 單一來源家族」，`reason` 裡都註明了建議覆核。

**非拉丁文字是這批的主要難點**，各卡 `identity.aliasReview` 都逐一交代了原文寫法、
通行轉寫與 MB credit 三者的關係（阿姆哈拉文、阿拉伯文、希臘文、韓文、日文、泰文、
Tifinagh、約魯巴語聲調符號、夏威夷語 ʻokina、毛利語 macron 等）。

**七張換過 release-group**：Le Mystère des Voix Bulgares（原釘到 Volume 2）、
Exuma（原釘到《Exuma II》）、The Bothy Band（原釘到 1983 重發）、Misty in Roots（原釘到併發盤）、
Theodorakis《Axion Esti》（原釘到 2021 三作併輯）、Irakere（原釘到 1982 古巴國內盤）、
Adoniran Barbosa（原釘到 1975 同名盤）。每張的 `cover.note` 都記了原委，新 RG 的封面都實測過。

背景：實測卡池 8,314 張的曲風分布為 rock 2,944／jazz 1,620／electronic 1,480／
soul 1,429／hiphop 1,279／pop 1,215／classical 1,051／folk 661／world 301／blues 158。
`POOL_BALANCE_PLAN.md` 的四階段目標裡 classical 已達標，本輪攻的是剩下三個：
blues→500、world→800、folk→1,000。

---

## 二、名詞：KV 是什麼

站上一張卡的資料分散在三個地方，各有各的理由：

| 存放處 | 存什麼 | 為什麼在這 |
|---|---|---|
| **Worker KV**（Cloudflare Workers KV） | **固定簡介**，鍵是 `desc2:<artist>\|<album>`；CJK 名用 `desc4:` 前綴 | KV 是 Cloudflare 的鍵值資料庫，掛在 `dip-vinyl-worker` 上、貼著 CDN 邊緣節點跑。簡介是「寫一次、讀幾萬次、永遠不變」的資料，放這裡讀取最快也最便宜。前台打 `/album-desc` 就是從這裡拿；回應標頭 `X-Cache` 要是 `KV-HIT`／`KV-HIT-RESTYLED`／`CURATED`，若是別的值代表打到現場 AI 生成，等於這張卡的簡介沒真的落地 |
| **Firestore** | `card_catalog`（封面網址、三軸、rarity、`rgMbid`、`upc`）與 `album_overrides`（固定試聽網址／狀態、頂點 tier） | 需要查詢與後台改寫的結構化資料 |
| **Git**（本 repo） | `seed_cards.json`（卡池本體）、`apex_pool.json`（王牌池）、`data/apple-audio-*.json`（靜態試聽地圖） | 前台開場直接載入，走瀏覽器快取 |

一句話：**KV 放簡介，Firestore 放卡的規格與試聽設定，Git 放卡池名冊。**
`seed_cards.json` 是最後一步，它才是上架開關——一旦某張卡進了卡池就抽得到，
所以簡介與封面必須先就位，否則玩家會抽到半成品。

---

## 三、推送步驟（每批照這個順序，不要跳）

以 c-29 為例，`M=onboarding-manifest-c29-blues-20260821.json`。

### 0. 開工前

```bash
git fetch origin && git log --oneline HEAD..origin/main   # 要是空的
node scripts/verify-album-onboarding.mjs $M               # 再跑一次 prepare gate，確認 0 error
```

### 1. 覆核本文件第四節的「推送前必做」

雲端環境有些事做不了（見第五節），這幾件事**必須在本機補做完才推**。

### 2. `card_catalog`（封面、三軸、rarity、rgMbid、upc）

用你本機既有的 onboarding 工具鏈寫入（c-22～c-27 那批用的同一套；
用 update mask，保留文件其他欄位）。這支腳本在本 repo 之外，雲端這邊無法代跑。

### 3. Worker KV（固定簡介）

依 `ALBUM_ONBOARDING.md` §8：

```bash
node ../dip-vinyl-worker/scripts/desc-gen/from_onboarding_manifest.mjs $M kv-bulk-c29.json
npx wrangler kv bulk put kv-bulk-c29.json --namespace-id 5f65e74b17d644b68a3f542b08a5c105
```

### 4. 固定試聽

**本輪所有批次的試聽都是 Apple 的 `.m4a` 直連**（`audio-ssl.itunes.apple.com/...`），
manifest 每筆都帶 `preview.appleCollectionId`，所以可以走
`ALBUM_ONBOARDING.md` §6 的**路徑 1（靜態地圖，預設路徑）**，不必開後台：

寫進 `data/apple-audio-map-v1.json` 後重建 `data/apple-audio-runtime-v1.json`
（鍵＝`appleAudioKey` 正規化，值＝`[storefront, collectionId, previewUrl]`）。

`preview.status` 是 `unavailable` 的卡：追加進 `card-preview-status.js`，不留 URL。

### 5. `album_overrides`

有頂點 tier 要採用的卡才需要寫 `tier`；試聽走靜態路徑的話這步只處理 tier。

### 6. 回讀確認

確認 `card_catalog`、KV、`album_overrides` 三處內容與 manifest 一致。

### 7. **最後**才動卡池（上架開關）

```bash
# 追加進 seed_cards.json（一卡一行的自訂格式，用既有腳本，勿整檔重排）
node scripts/build-seed-genres.mjs      # 補第 6 欄曲風陣列，缺這欄的卡「類型挑片」抽不到
```

明確採用頂點卡的才改 `apex_pool.json`（可參考 `scripts/publish-add-20260816.mjs`
的防呆寫法：round-trip 檢查＋tier 筆數檢查＋逐列比對）。

### 8. Published gate

```bash
node scripts/verify-album-onboarding.mjs $M --published
```

把 manifest 的 `published` 各欄補成 `true` 後跑，要 0 error。這關會實際回讀
Firestore、KV 與封面／試聽網址的 HTTP 狀態。

> CAA 封面偶發 500（會轉址到 archive.org，那層間歇性壞掉），gate 已內建重試 5 次。
> 若某張連續失敗，先用 `audit-caa-health.mjs` 那套多輪實測確認是不是真的爛了，
> 不要單發一次就判死。

### 9. 收尾

`PROJECT_MEMORY.md` 最上方追加一筆（雲端這邊每批都已先寫了一筆，本機推完後
補上「已上架」與實際張數即可）。

---

## 四、推送前必做（雲端做不到的部分）

1. **三軸重跑 `/album-rating` 覆核**。雲端的網路政策擋掉 `workers.dev` 與 `last.fm`
   （CONNECT 403），所以本輪三軸全是**人工錨點評定**、`ratings.listeners` 一律 `null`，
   每筆的 `ratings.note` 都寫明了。回本機請重跑 API 對照，差距大的人工複核。
2. **pearl 判定**。pearl 需要 `listeners < 300` 的有效數值，雲端拿不到，
   所以本輪**沒有任何 pearl 候選**。研究 agent 認為疑似 pearl 的卡都寫在
   `apexAssessment.reason` 裡（例如 Bukka White《Big Daddy》），補到 listeners 後再判。
3. **hall 候選裁定**。凡 `apexAssessment.eligible=true` 的卡都**還沒**寫進 `apex_pool.json`，
   要你點頭才算數。另有一批「classic=5 但本環境只查得到單一獨立來源」的卡，
   研究稿保守標 `eligible=false` 並在 `reason` 寫明建議覆核。
4. **年份複核**。Discogs 與 AllMusic 在雲端也被擋，凡年份有疑義的都寫在
   `research.yearNote`（常見情況是 MusicBrainz 的 release-group 只登錄了 CD 再版年，
   例如 Lightnin' Hopkins《Lightnin'》MB 標 1977、實際是 1961 Bluesville）。
   規則照舊：**演奏者掛名取該錄音最早公開發行年**。
5. **`preview.status = unavailable` 的卡**。Apple 沒有可靠配對、而 YouTube 在雲端
   無法驗證，這些卡誠實標了 `unavailable`。要嘛本機補 YouTube Music album playlist
   走後台路徑，要嘛維持 `unavailable`（前台會是 `fixedOnly`，不會現場亂搜）。

---

## 五、這個環境的限制（給下次雲端開批的人）

- **可達**：MusicBrainz（會間歇 503／SSL 斷線，需重試）、Cover Art Archive（同樣間歇 500）、
  iTunes Search／Lookup、Wikipedia（會 429 限流，請求間隔 ≥3 秒並退避）、archive.org
- **被擋**：`workers.dev`（自家 Worker！）、last.fm、Discogs、AllMusic、rollingstone.com
- 因此雲端能做的是「身分＋封面＋試聽＋事實查證＋簡介」，
  做不了的是「機器評分＋listeners＋上架寫入」。這條界線就是本批次的交付範圍。

---

## 六、manifest 裡的額外欄位

驗證器不看、但收尾時很有用的欄位，都放在每筆的 `research` 底下：

- `suggestedYear` / `yearNote`：建議年份與依據（推 `seed_cards.json` 時第 7 欄用）
- `mbTitle` / `mbArtist` / `mbFirstRelease`：MusicBrainz 上的原始寫法，
  跟卡片用名不同時，`identity.aliasReview` 會說明為什麼
- `upcNote`：條碼查得到／查不到的情況
- `curatorWhy` / `curatorRisk`：當初為什麼選這張、有什麼已知風險

`cover.note` 會說明封面救援的來由（RG 層沒圖改用 release 層、或 CAA 全無改用
已驗證的 Apple 官方封面）；`cover.visuallyVerified` 代表那張圖被人眼看過、確認是對的專輯。

---

## 七、沒做完的事（明確清單）

研究層已完成的部分見上；以下是**確實還沒做、或做不到**的部分。

### 7-1 店主指定的三張台灣專輯：兩張早就在池裡，只剩陳達

| 專輯 | 狀態 |
|---|---|
| 李雙澤《敬！李雙澤 唱自己的歌》(2008) | **已在 `seed_cards.json`**，2026-08-16 上架、published gate 0 error |
| 楊祖珺《楊祖珺》(1979) | **已在 `apex_pool.pearl`** 王牌池 |
| 陳達《民族樂手──陳達和他的歌》(1971) | **仍未上架**，卡在封面 |

前兩張的指定要求早已滿足，本輪不需再收。c-32 策展提的
李雙澤《美麗島──李雙澤紀念專輯》是**另一張**紀念發行、不是店主指定的那張，
屬於可有可無的加收，同樣卡在封面（見下）。

**只有陳達是真的還沒做。** 身分那關其實走完了——走**人工身分路線**，MB 查無已完整舉證：
artist search 只回陳達偉／陈达飞／陳達儒 三個不相干的人，羅馬拼音 Chen Da、Chen Ta 皆空，
《民族樂手》《陳達和他的歌》《思想起》全文檢索全落空，**MB 上根本沒有這位恆春民謠歌手的藝人實體**。

卡住的是封面：人工身分卡沒有 rgMbid，而 Cover Art Archive 以 rgMbid 為鍵，那條路走不通；
Apple 實測也只有兩曲的《陳達與恆春調說唱》(2000)，不是要的那張。
依 `ALBUM_ONBOARDING.md`「封面必須核對版本並實際 GET 到 2xx／3xx」，不得上架。

**要你做的**：自備封面圖檔（實體唱片翻拍或正式再版書影），另補
`identity.manualEvidenceUrls`（≥2 個 HTTPS 佐證，例如唱片公司頁、圖書館館藏目錄）
與 `identity.manualRuling`（誰核定、依哪一條）——這兩欄驗證器會硬擋。
`mbAbsenceProof` 的查詢紀錄與結論已備妥，需要時可從研究稿導出。

### 7-2 候選裡沒能進 manifest 的 131 張

1,337 筆候選 → 1,206 張進 manifest。落掉的分三類，**都不是漏做，是規則擋下**：

- **MusicBrainz 查無或只有合輯條目（約 50 張）**：台灣原民與客語線最慘
  （桑布伊、以莉·高露、羅思容、陳永淘、王宏恩、謝銘祐——藝人實體在、專輯 browse count=0）、
  沖繩線 5 張退 4 張（ネーネーズ、りんけんバンド、登川誠仁、嘉手苅林昌）、
  加勒比 soca／calypso（Lord Kitchener、Lord Shorty、Kassav'、Arrow）、
  衣索比亞黃金年代原盤（Mulatu《Afro-Latin Soul》、Mahmoud Ahmed《Almaz》只剩 Éthiopiques 合輯）。
  **三張是純資料缺漏**：Bembeya Jazz《Regard sur le passé》、Jazz Epistles《Verse 1》、
  Violeta Parra《Canciones Reencontradas en París》在 MB 上 `primary-type` 欄是空的，
  條目本身正確——你若願意上 MB 補 type，這三張馬上能救回。
- **無可用封面（約 40 張）**：CAA 的 RG 與 release 兩層都沒圖、Apple 也配不到。
- **規則擋下（約 25 張）**：已在王牌池 25 張、自我同名卡缺固定試聽 19 張、
  跨區塊重複、寫作 agent 查出配錯且無可替代 RG（El Gran Combo《Mejor Que Nunca》
  在 MB 上根本沒有 1976 這張、Pablo Milanés 1976 同名錄音室盤 MB 全無、
  Nass El Ghiwane《Essiniya》查不到 1974 原盤依據）。

### 7-3 曲風歸屬待你裁定的幾張

寫作 agent 查證後認為可能不該掛在世界音樂線，已照常寫完並標註，**要不要留是你的決定**：
L. Subramaniam《Conversations》與 Zakir Hussain《Making Music》（MB tag 是 jazz、ECM／Milestone 發行）、
Asin《Asin》與 The Cambodian Space Project（MB tag 是 rock）、Jambinai《Différance》（post-rock）、
Alien Weaponry《Tū》（實為 groove metal，掛 world 的理由是全碟毛利語與 taonga pūoro）。

### 7-4 已知的個別瑕疵（研究稿裡都標了，但值得單獨列出來）

- **Ali Farka Touré & Toumani Diabaté《Ali and Toumani》**：CAA 該 RG 的主 front 掛錯圖
  （印的是《Kala Djula》），已退回，待你換圖。
- **Forest《Forest》**：原釘到俄羅斯黑金屬團的同名盤；正確 RG 是
  `c06e4cbe-190b-3636-a411-1e28567ddfab`（1969 Harvest 英國 acid folk 團），
  但它是自我同名卡、本環境查無可核對的固定試聽，依規則退回。
- **友部正人《にんじん》**：CAA 掛的正面圖是一張攤販菜單照，明顯錯圖，待換。
- **鄭怡《小雨來得正是時候》**：CAA 回 500、該 RG 無封面。
- **Michel Camilo & Tomatito《Spain》**：Apple 目錄恐怕根本沒有 2000 初代，只有 2006 續作。
- **Ojos de Brujo《Barí》**：美國區 iTunes 抓不到單曲，**西班牙區（country=ES）可以**——
  本輪試聽一律用 us 商店，非英語圈專輯改用當地商店可能救回一批 unavailable。

### 7-5 本來就不打算在雲端做的

三軸重跑 `/album-rating`、pearl 判定（需 listeners）、60 張 hall 候選裁定、
年份用 Discogs 複核、325 張 unavailable 試聽補 YouTube、以及整個上架寫入
（`card_catalog` → KV → `album_overrides` → `seed_cards.json`）。詳見第三、四節。
