# 新增專輯固定上架公式

本文件是 dip vinyl **所有新卡片專輯的唯一完成定義**。任何新增、匯入、補卡池、擴充廠牌或把商品同步成卡片的工作，都必須走完整流程；只完成封面或 `seed_cards.json` 不算上架。

## 完成標準

每張專輯必須同時具備：

1. 正確且實際可讀的封面。
2. `classic`、`obscurity`、`accessibility` 三軸 1–5 整數與依公式算出的 `rarity`。
3. 一次頂點卡資格評估；不得因三軸高分自動升頂點。
4. 經資料查證的繁體中文固定簡介，預生成進 Worker KV，不把現場 AI 生成當完成品。
5. 經人工核對的固定試聽網址，或明確的 `unavailable`／`disabled` 狀態。
6. `card_catalog`、簡介 KV、`album_overrides` 與 `seed_cards.json`／`apex_pool.json` 寫入完成並回讀一致。

任一項缺失就留在待處理批次，不得先上架。

## 單一批次 manifest

每批建立一份 scratch manifest，不提交研究中間檔。格式由 `scripts/verify-album-onboarding.mjs` 驗證：

```json
{
  "schemaVersion": 1,
  "batch": "2026-07-22-example",
  "albums": [{
    "artist": "Artist",
    "album": "Album",
    "identity": {
      "releaseType": "Album",
      "aliasesChecked": true,
      "aliasReview": "已比對原文、羅馬拼音、譯名與不同 artist-credit"
    },
    "cover": {
      "url": "https://...",
      "source": "caa",
      "httpStatus": 200,
      "checkedAt": "2026-07-22T12:00:00Z"
    },
    "ratings": {
      "classic": 4,
      "obscurity": 5,
      "accessibility": 3,
      "listeners": 120,
      "source": "worker:/album-rating",
      "checkedAt": "2026-07-22T12:00:00Z"
    },
    "rarity": "epic",
    "apexAssessment": {
      "eligible": false,
      "tier": null,
      "reason": "尚未達到三種頂點卡的嚴格定義",
      "evidenceUrls": []
    },
    "description": {
      "text": "樂手以緊密的節奏組推動演奏，旋律線在克制與爆發之間展開。編曲保留充足空間，讓各聲部的音色與互動清楚浮現。作品重點落在動態控制、段落銜接與長時間累積出的張力。",
      "sourceUrls": ["https://...", "https://..."]
    },
    "preview": {
      "status": "ready",
      "url": "https://...",
      "source": "youtube",
      "httpStatus": 200,
      "checkedAt": "2026-07-22T12:00:00Z"
    },
    "published": {
      "cardCatalog": true,
      "descriptionKv": true,
      "albumOverride": true,
      "seedCards": true,
      "apexPool": false
    }
  }]
}
```

`listeners` 查無時填 `null`。manifest 只保存完成判定與證據網址，不抄錄大段來源文字。

## 固定流程

### 0. 交接與範圍鎖定

- 先完成工作區 `AGENTS.md`／`CLAUDE.md` 的 fetch、status、memory 檢查。
- 明確列出本批目標、預計張數、曲風／廠牌範圍與精選或全收模式。
- 建立 manifest；後面所有步驟都更新同一份，不另外維護互相矛盾的清單。

### 0.5 藝人命名規則（2026-07-23 店主核定）

- **日籍藝人一律用日文漢字／假名本名**（山本剛トリオ、坂本龍一、細野晴臣、竹内まりや），不用羅馬拼音——但**官方藝名本身就是拉丁字者保留**（Ryoji Ikeda、Ken Ishii、rei harakami、Susumu Yokota、TOWA TEI、Mariah、Inoyama Land、Yellow Magic Orchestra）。判準：看該藝人的正式發行品掛名，不是看國籍。
- 韓籍藝人命名規則待店主定案（한글 vs 漢字），定案前維持現狀。
- **用非拉丁名上架時必須做兩件事**，否則卡片會從曲風流派抽牌池掉出去、簡介也查不到：
  1. 曲風標籤先用「串流平台認得的拼法」查好，寫進 KV `mapgenre3:<漢字名小寫>|<專輯名小寫>`；
  2. 簡介 KV 用 `desc4:` 前綴（CJK 鍵）。
- 三軸評分（Last.fm listeners）也要用串流拼法查，manifest 記錄實際查詢用名。

### 1. 身分確認與去重先行

- 只收 MusicBrainz `primary-type=Album`；Single、EP、Compilation 不進一般卡池。**唯一例外**：白名單曲風可依「曲風 release type 例外」章節收 EP／Single／DJ-mix。
- 在打封面、評分與試聽 API 前，先對現有卡池與批次內做去重，節省流量。
- 除了 artist+album 完全相同，必須人工檢查：不同 artist-credit、團名尾綴、`Vol.`／`Volume`、重音符號、特殊符號、譯名，以及片假名／漢字／羅馬拼音等跨文字系統版本。
- 自我同名或極短名稱屬高風險；只有在 release 身分與固定試聽都已嚴格核對時才能收錄。

### 2. 精選與三軸

- 候選很多時先跑 `/album-rating` 排序，只替短名單解封面與試聽。
- 三軸一律使用同一套 `/album-rating` 基準；人工修正必須在 manifest 留下理由。
- `accessibility` 是硬蕊／入耳難度，5 最晦澀，不是好聽度。
- 稀有度公式：`classic + accessibility + (obscurity >= 5 ? 1 : 0)`；10 以上 legendary、8 以上 epic、6 以上 uncommon、4 以上 rare，其餘 common。

### 3. 頂點卡資格評估

每張都要判斷，但預設是一般卡；**三軸 5 分或 legendary 都不等於頂點卡**。

- `hall` 殿堂：`classic=5` 只是最低門檻，還需跨來源的長期樂評共識，足以列入該領域史上核心作品。
- `pearl` 流亡：必須 `obscurity=5`，且 Last.fm 累積 listeners 有效數值並低於目前門檻 300；「查無資料」不能當成 0。
- `heresy` 異端：必須 `accessibility=5`，且有可信資料支持其極端前衛、噪音或結構性難入耳，不以個人喜好判定。
- 三種 tier 互斥。符合候選資格時，manifest 至少放兩個證據網址；實際寫入 `apex_pool.json` 前仍需本批任務明確採用頂點卡，否則可先作一般卡上架。

### 4. 封面

- 依 Bandcamp → Spotify → Cover Art Archive／release-group 再版補救解析。
- 封面必須核對藝人、專輯與版本，並實際 GET 得到 HTTP 2xx／3xx。
- iTunes 模糊搜尋不可作封面來源；抓不到可靠封面就停止該筆。

### 5. 固定簡介

- 每張先查資料再寫，至少兩個可追溯網址；優先廠牌／藝人官網、liner notes、MusicBrainz／Discogs，並以可靠樂評或資料庫交叉確認。
- 繁體中文 3–4 句、80–180 字；交代藝人／背景、聲音做法與真正值得注意的曲目、合作者或地位。超過 180 字允許（2026-07-22 店主核定），但必須經人工審核確認每句都有實質資訊、無冗贅字詞，並在 manifest 的 `description.lengthReviewed` 標記 `true`；未標記者驗證器照原上限擋下。
- 不確定的事實不寫；資料不足就暫停該筆，不用流暢文字掩蓋空白。
- 禁止「融合多種元素」「層次豐富」「獨樹一格」「具有代表性」「傑作」「必聽」「里程碑」等空泛或過度宣稱用語；不要以「這張專輯」開頭。
- Codex 與 Claude 都以同一份規格、來源證據和驗證器為品質基準。模型名稱不是驗收標準。
- 產出先通過本文件的 prepare gate 與人工事實抽驗，再以 `dip-vinyl-worker/scripts/desc-gen/from_onboarding_manifest.mjs` 轉成 `desc2:`／`desc4:` KV bulk；線上 `/album-desc` 必須回相同文字且 `X-Cache` 為 `KV-HIT` 或 `CURATED`。既有大批次的 `validate.mjs` 可作額外格式複驗。

### 5.5 曲風 release type 例外（白名單制）

某些曲風的核心經典不是正規專輯（電子樂的 12 吋單曲、EP 與 DJ mix 文化）。對這些曲風開放非 Album 收錄，但採**白名單＋精選制**，不是通則：

- **白名單目前只有 `electronic`**（2026-07-22 店主核定）。其他曲風偵測到同類文化時，須經店主指定才可把該曲風 id 加入 `scripts/verify-album-onboarding.mjs` 的 `EXCEPTION_GENRES`，不得自行擴大。
- 開放的 release type：`EP`、`Single`（12 吋文化）、`DJ-mix`（限 DJ-Kicks、fabric、Global Underground 等公認系列的里程碑輯）。Compilation 仍一律不收，包含單一藝人精選輯。
- manifest 的 `identity` 需多填三個欄位，驗證器會強制檢查：

  ```json
  "identity": {
    "releaseType": "Single",
    "genreException": "electronic",
    "exceptionReason": "Detroit techno 起源核心 12 吋，無正規專輯版本",
    "exceptionEvidenceUrls": ["https://...", "https://..."],
    "aliasesChecked": true,
    "aliasReview": "..."
  }
  ```

- **精選制門檻**：`exceptionEvidenceUrls` 至少兩個可追溯網址，證明歷史地位（樂評、資料庫條目、廠牌沿革）。例外卡不做廠牌全收，逐張判定。
- 其餘流程（封面、三軸、頂點評估、固定簡介、固定試聽、published gate）與正規專輯完全相同，不因例外身分放寬。

### 6. 固定試聽

- 優先 Apple 可直接播放的預覽音檔；其次 YouTube Music 官方 Album playlist；再其次經人工核對的完整專輯影片。
- 必須同時核對藝人、專輯、版本，並實際確認網址 HTTP 2xx／3xx。
- **兩條等價寫入路徑，擇一即可**（2026-07-22 店主確認靜態路徑為預設，不需後台人工操作）：
  1. **靜態路徑（預設）**：ready → 寫進 `data/apple-audio-map-v1.json` 並重建 `data/apple-audio-runtime-v1.json`（鍵＝`appleAudioKey` 正規化，值＝`[storefront, collectionId, previewUrl]`，僅限 Apple .m4a 直連）；unavailable／disabled → 追加進 `card-preview-status.js`。git push 即生效。
  2. **後台路徑**：經 admin.html 批次工具寫 `album_overrides.previewUrl`／`previewStatus`。YouTube 連結只能走這條（靜態地圖不收）。
- 驗證器兩條都認：`album_overrides` 有文件就比對文件，否則回讀靜態地圖／狀態檔。
- 查過但無可靠來源：`previewStatus=unavailable`，不留 URL。
- 明確不提供試聽：`previewStatus=disabled`，不留 URL。
- 不可為了提高命中率接受疑似配對。以上三種狀態都代表前端 `fixedOnly`，不得再即時搜尋 provider。

### 7. Prepare gate

在任何正式寫入前執行：

```bash
node scripts/verify-album-onboarding.mjs <manifest.json>
```

必須 0 error。警告項需人工看過並在 `identity.aliasReview` 留下結論。

### 8. 寫入與上架順序

跨 Firestore、KV 與 Git 無法做單一 transaction，因此依下列順序把曝光風險降到最低：

1. `card_catalog`：封面、三軸、rarity，使用 update mask，保留其他欄位。
2. Worker KV：固定簡介。先轉檔，再用既有 namespace bulk import：

   ```bash
   node ../dip-vinyl-worker/scripts/desc-gen/from_onboarding_manifest.mjs <manifest.json> <kv-bulk.json>
   npx wrangler kv bulk put <kv-bulk.json> --namespace-id 5f65e74b17d644b68a3f542b08a5c105
   ```

3. `album_overrides`：固定試聽／負面狀態，以及經明確採用的頂點 tier。
4. 回讀上述三處，確認內容與 manifest 一致。
5. **最後**才追加 `seed_cards.json`；若本次明確採用頂點卡則改寫 `apex_pool.json`。這一步是上架開關。
6. 追加後執行 `node scripts/build-seed-genres.mjs` 補曲風欄：`seed_cards.json` 每列第 6 欄、`apex_pool.json` 每列第 3 欄為音樂地圖曲風 id 陣列（首頁「類型挑片」直接抽本地卡池，靠這欄過濾；缺欄的卡抽不到）。腳本只補缺欄的列，可重複執行。

不要先推 seed 再補其他資料。

### 9. Published gate

將 `published` 狀態補齊後執行：

```bash
node scripts/verify-album-onboarding.mjs <manifest.json> --published
```

此模式會驗 seed／apex membership、Firestore `card_catalog`、`album_overrides`、固定簡介快取，以及封面／試聽網址的實際 HTTP 狀態。全部通過才可 commit／push。

### 10. 收尾

- 更新 `PROJECT_MEMORY.md` 最上方紀錄批次數量、頂點判定、固定試聽分布與驗證結果。
- 提交前再 fetch；只暫存本次檔案，直接 push `main`。
- 回報「候選／排除／一般卡／頂點候選／ready／unavailable／disabled」數量，不用模糊的「大約完成」。
