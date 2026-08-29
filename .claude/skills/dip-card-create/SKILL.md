---
name: dip-card-create
description: One-line entry point for adding album cards to dip vinyl — accepts artist(s), album(s), artist+album, or a genre/scene expansion request, then runs the full pipeline: candidate curation, identity checks, covers, three-axis ratings, apex assessment, desc-restyle-grade hook + description (180–240 chars), fixed preview, Firestore/KV writes, gates, and publication. Use for 新增專輯／新增卡片／補卡池／延伸某曲風／上架專輯. Supersedes dip-card-pool-expand as the entry point (its scripts remain the underlying library).
---

# dip-card-create — 一句話輸入的完整建卡產線

輸入一個或複數個藝人／專輯／兩者組合／曲風延伸請求，走完「候選 → 身分 → 封面 → 三軸 →
簡介產線 → 頂點與試聽 → 寫入 → 驗收」全程。**完成定義以 `dip-vinyl-shop/ALBUM_ONBOARDING.md` 為準**，
封面、三軸、頂點判定、固定簡介、固定試聽／無來源狀態缺一不可，不得先上 seed 再補其他資料。

**與既有兩條產線的分工**：
- 底層腳本沿用 `dip-card-pool-expand/scripts/`（1／1b／1c 清單、2 封面、2b 評分排序、3 三軸、
  3b 曲風名、3c 去重、4 預熱）。封面來源的脾氣、CAA 門檻、精選模式細節、歷史實績
  **見該 skill 的 SKILL.md，不在此重複**。
- 簡介品質沿用 `desc-restyle/` 的產線與工具（prompts 三份 base 檔、qa-batch、merge-writer-input、
  build-final、verify-kv、chk-diskvskv——已改造為接受 `add-*` 批名）。

## Phase 0：解析輸入與開工三讀

| 輸入範例 | 判定 | 走法 |
|---|---|---|
| `Ryo Fukui` | 單一藝人 | 1b 查 MB 官方專輯目錄 |
| `Fishmans, Lamp, きのこ帝国` | 複數藝人 | 1b 逐位查再合併 |
| `Tricky - Maxinquaye` | 藝人＋專輯 | 直查 MB 單張，跳過清單階段 |
| `Maxinquaye`（只有專輯名） | 歧義 | MB 查詢後**列候選讓店主確認**，不猜 |
| `延伸嘻哈`／`南方饒舌 40張` | 曲風策展 | 見下方「曲風策展模式」 |

- 複數藝人／曲風模式先問一次：**全收還是精選**（單張與少量指定不問，直接做）。
- 開工三讀：`dip-vinyl-shop/PROJECT_MEMORY.md` 逐次改動記錄前五筆、`ALBUM_ONBOARDING.md`、
  現有卡池比對（輸入已在池子裡就直接回報、不重做）。

## 曲風策展模式（店主 2026-08-10 裁定）

「延伸某曲風」**不是 MB tag 搜尋**（tag 是社群亂貼的、雜訊大），是策展：

1. **盤點現有覆蓋**：掃 `seed_cards.json` 該曲風的藝人／年代／子派系分布，找出空洞。
2. **研究層策展**：派研究代理（web 查證）提出「這個場景該收的重要專輯」清單，
   **必須含子派系配置**（如嘻哈分東岸黃金年代／南方／地下／abstract 等，各配張數），
   避開池內已有的、標明每張的收錄理由。曲風→六派對應遵守 `progress.json` 既有裁定
   （Soul/Funk 獨立成派不併 hiphop、當代 R&B 雙標兩池都抽等）。
3. **向店主回報策展摘要**（派系配置＋張數＋代表卡例，一則訊息），確認方向後才進重管線。
4. 之後每張走 MB 身分查證，進入 Phase 1 標準流程。

## Phase 1：候選與身分把關

- **入池字元正規化（硬性，寫進腳本不靠自覺）**：MB 回來的名字先過
  `U+2010/U+2011 → ASCII 連字號`、`U+03BC → U+00B5`；大小寫照 MB 正規名。
  **MB 自己用 U+2010（`alt‐J`、`blink‐182`），名稱可以抄、連字號不能照抄**——
  2026-08-10 全池 32 張污染的根因就是這個，事後清理動了 KV 遷移＋Firestore 搬移一整輪。
- 藝人名消歧義：MB 候選的 `disambiguation` 對不上（職業、國籍）就是抓錯人，用更完整的名字重查。
  同名者眾（Rosalía×3、Supercar×3），**以卡池實際專輯核對**。
- 去重四道：與現有卡池撞名（含藝人名互為子字串）、同批 artist-credit 拆分、
  跨文字系統重複（シーナリィ vs SCENERY，人工掃）、「樂團名＝專輯名」自我同名卡**直接排除**。

## Phase 2：封面與三軸

- **≤10 張**：直接逐張跑封面鏈（Bandcamp → Spotify → CAA）＋ `/album-rating`。
- **大批**：先 2b 評分排序取前 N，短名單才解封面；候補從 `*-full-ranked.json` 取。
- 3b 曲風名優化照跑（決定抽牌池分類）。**若改名發生在任何寫入之後，必須同步**：
  Firestore 舊文件刪除、KV key 搬移——`card_catalog`／`album_overrides` 的文件 id 是
  `(artist+'|'+album).toLowerCase().replace(/\//g,'-').trim()`，改字串就是改 id。
- 人工覆核不可省：聽眾數異常（同名誤配）、AI 推估的冷門度、藝人名爆版、封面真偽反查。

## Phase 3：簡介產線（desc-restyle 成品標準）

**規格＝全池現行標準**：hook 首句懸念＋正文 full 180–240 字（`Array.from` 計，硬上限 280、
下限 140；thin 卡 120–180）、反向禁令兩分法、題材無禁區三限制、無分數星等、音樂人一律拉丁原文、
繁體中文。三份 base 檔（`desc-restyle/prompts/{research,hook,writer}-base.md`）照用，
派工詞只寫卡單、逐張特注、上層更正（逐 key）、輸出路徑。

**批次命名與檔案位置**：批名 `add-YYYYMMDD`（同日多批加序號 `add-YYYYMMDD-2`），
卡單放 `desc-restyle/batches/cards/<batch>-cards.json`（格式同 wave2：
`[{key, artist, album, source, year}]`，key＝`desc2:artist|album` 全小寫）。
research／hooks／input／output 沿用既有目錄結構。

**代理配置按批量縮放**（5/2/2 是 50 張批的設計，小批照抄是浪費）：

| 批量 | 研究（Sonnet） | hook（Opus） | 寫作（Opus） |
|---|---|---|---|
| 1–5 張 | 1 組 | 主線自寫 | 1 組 |
| 6–15 張 | 2 組 | 1 組 | 1 組 |
| 16–50 張 | 5 組 | 2 組 | 2 組（照 desc-restyle 全套） |

同層一則訊息一次派齊、層間等齊；研究組別用 a、b…（缺組工具已可處理）。
反同構帳本照 desc-restyle 規則：位置指派限制的是**故事骨架**不是題材，
派工詞寫「某某骨架本批只准一張、指派給某某卡」，禁止「已由別批寫過」措辭。

**QA 與審稿**：
```bash
node qa-batch.mjs research add-YYYYMMDD
node qa-batch.mjs hooks add-YYYYMMDD && node chk-hook-crossgroup.mjs add-YYYYMMDD
node merge-writer-input.mjs add-YYYYMMDD --split=1   # 依組數
node qa-batch.mjs out add-YYYYMMDD
node qa-check-research.mjs batches/input/… batches/output/…   # 有幾組跑幾次
node fix-spacing.mjs batches/output/… [--write]
```
**逐張人工審稿不可省，不分批量**。高頻錯誤型態與校對痕跡四型見 desc-restyle SKILL.md。

## Phase 4：頂點、試聽、manifest

- 頂點卡逐張評估（hall 經典共識／pearl listeners 有效且 <300／heresy 極端難入耳證據），
  三軸 5 或 legendary **不自動升格**。
- 試聽：`/yt-music-link` 查找＋人工核對（只接受 Apple 直連、YT Music album playlist、完整專輯影片）。
  **`album_overrides` 規則是 `allow write: if isAdmin()`，Claude 用 REST 寫一律 403、繞不過也不該繞**
  ——固定產出一份 `album_overrides-repaste-<batch>.json`（`[{artist, album, previewUrl}]`，
  無來源者 `previewStatus: unavailable`／明確不試聽 `disabled`），批次結尾提醒店主到後台批次匯入框貼上。
- manifest 依 `ALBUM_ONBOARDING.md` 補齊全部欄位。

## Phase 5：寫入與驗收（順序不可倒）

```bash
node dip-vinyl-shop/scripts/verify-album-onboarding.mjs <manifest> # prepare gate，0 error
node dip-card-pool-expand/scripts/4-prewarm-covers.mjs … --dry     # card_catalog 預熱（先乾跑）
npx wrangler kv bulk put batches/add-…-kv.json --namespace-id 5f65e74b17d644b68a3f542b08a5c105 --remote
node verify-kv.mjs add-YYYYMMDD          # 逐字回讀；wrangler 要親眼看到 Success!
# seed_cards.json / apex_pool.json 最後才寫（曝光開關；單行壓縮格式用字串替換，勿 re-stringify）
node dip-vinyl-shop/scripts/build-seed-genres.mjs
node dip-vinyl-shop/scripts/verify-album-onboarding.mjs <manifest> --published
```

收尾：`PROJECT_MEMORY.md` 逐次改動記錄最上方補一筆（CRLF 保留）、`git status --short` 只提交
本次相關檔案、`git fetch origin` 確認無分歧後 push（不需事先問店主）、回報精確數量
（候選／排除／一般卡／頂點／preview ready･unavailable･disabled）。

## 紅線與陷阱（本產線專屬，通用的見兩個母 skill）

- **MusicBrainz／CAA 只能離線批次**（1 req/s＋UA 檢查），絕不進 worker 即時查詢；
  新寫 MB 腳本抄現成的 `mb()` 重試函式（503 重試 3 次、間隔 2 秒、逐筆存檔）。
- **KV 寫入與刪除一律走 wrangler**——REST bulk 寫入會被現有 token 以 10405 擋下（只給讀）。
  bulk delete 後立刻 bulk/get 驗證會有殘影（最終一致性），**隔一次呼叫再驗**，別誤判刪除失敗。
- **驗證 KV 刪除絕不用 `/album-desc`**（會觸發重新生成回寫），用 verify-kv 的 bulk get 看 404。
- **Firestore 兩集合規則不同**：`card_catalog` 是 `allow write: if true`（REST 可寫，
  文件 id 規則同上，`updatedAt: 1` 讓新卡在後台沉底）；`album_overrides` 只有店主後台能寫。
- **Spotify 429 期的空結果不是「查無此碟」**，別讓空值進 KV；iTunes 不要用來抓封面。
- 含 `..` 的 key 走 wrangler kv key get 會 403（路徑穿越保護），驗證一律走 verify-kv 的 bulk get。
- seed_cards／apex_pool 是**單行壓縮 JSON**：改動用字串替換＋三道防呆（命中數＝卡數、
  總長度合理、筆數不變），絕不 `JSON.stringify(arr, null, 2)` 重排。
