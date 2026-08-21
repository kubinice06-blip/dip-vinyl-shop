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
| c-31 世界音樂 | `onboarding-manifest-c31-world-20260821.json` | 進行中 | — | 研究中 |
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
你指定的三張裡，**楊祖珺《楊祖珺》已經在 `apex_pool.pearl` 王牌池**（gate 查出，故未重複收），
**李雙澤與陳達走人工身分路線**——MusicBrainz 確認查無（李雙澤有藝人實體但 release-group
browse count=0；陳達連藝人實體都沒有，Chen Da／Chen Ta 等拼法全落空）。

**這批 gate 擋下 24 張已在王牌池的卡**（Dylan《Freewheelin'》、Joni《Blue》、Nick Drake 三張、
Bon Iver、Sufjan、Fleet Foxes…）。原因是策展只比對 `seed_cards.json`，而成了王牌的卡不在那份名冊裡。
管線已補上這道檢查，但**這條教訓值得記住：卡池的完整名冊是 seed + apex 兩份**。

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
