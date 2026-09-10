# c-97 交接（2026-09-05）：電子目錄深度，44 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主 2026-09-05「接力做完十批」的一批。`lineType: 廣度`——
**把已經在池裡、卻只有一兩張的正典藝人補到該有的深度。**

**44 張、23 位掛名、零 §1 人工身分、零跨批撞卡、44/44 釘住 release-group MBID。
年份 1967–2022。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 電子目錄深度：house、techno 與 12 吋 | 19 |
| b | 電子目錄深度：氛圍、具象音樂與 downtempo | 25 |

**逐位**：Sasha & John Digweed／Throbbing Gristle／Merzbow／The Art of Noise／Enya／
Harold Budd 各 3，Rhythim Is Rhythim／Basic Channel／Rhythm & Sound／Richie Hawtin／
Frankie Knuckles／Burial／Coldcut／Pierre Henry／Bernard Parmegiani 各 2，其餘各 1。

**型態分佈**：Album 36、EP 6、Single 2——後八張是 §5.5 白名單（逐張理由見 `rulings.md` 第 2 條）。
另有十四張是 `primary-type=Album` ＋ `secondary-types` 含 Compilation／DJ-mix，
依 `rulings.md` 第 3 條**不填例外欄位**。

**一人多掛名五組、十四個 MB 實體**（Derrick May＝Rhythim Is Rhythim＝Mayday、
Basic Channel＝Rhythm & Sound、Richie Hawtin＝F.U.S.E.、Global Communication＝Reload 等），
每個實體都單獨掃過線上池才提案，行文一律不得寫成兩個人（`rulings.md` 第 4 條）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **44/44（100%）** | `c97/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **44 張全部寫完並過機器 QA** | `desc-tools/batches/output/c97-out-{1,2}.json` |
| 5. 固定試聽 | **27/44（61%）**，命中 `gb 23｜fr 2｜jp 1｜us 1` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**簡介的機器 QA**：`qa-batch.mjs out c97` 全過；`fix-spacing` 兩檔各跑一次、待補 0；
主線另跑一次性複驗——**44 張的 `desc` 開頭與 `hook` 逐字相符**（含標點）、
full 卡 218–235 字、thin 卡 147–178 字、**未具名出處 0 盞**。

## 三、試聽 61% 是這條線的真實天花板，不是漏做

**十七張無試聽**，全部逐店面覆核過（研究層打藝人頁 `lookup`，不只 `search`）：

| 型態 | 張數 | 卡 |
|---|---:|---|
| Transmat／Trax／Warp 早期 12 吋，數位化從未發生 | 4 | Rhythim Is Rhythim《Nude Photo》《It Is What It Is》、Phuture《We Are Phuture》（有碟無預覽的 Tears 另計） |
| **DJ mix 盤，授權天生過不了**（曲目分屬數十家版權方） | 7 | Derrick May《Mix-Up, Volume 5》、Richie Hawtin《DE9: Closer to the Edit》《DE9: Transitions》、Sasha & John Digweed 三張、Akufen《Fabric 17》、Global Communication《Fabric 26》 |
| 廠牌自營、未進串流 | 3 | Frankie Knuckles《Choice》《A New Reality》、Reload《A Collection of Short Stories》 |
| 法國具象音樂機構錄音（INA-GRM 未上架） | 2 | Bernard Parmegiani《Chants magnétiques》《Dedans dehors》 |
| 早期 ZTT 盤 | 1 | The Art of Noise《Into Battle with the Art of Noise》 |

**DJ mix 這一類是結構性的**：本批八張混音盤裡七張無試聽，
不是「這次沒查到」，是這個型態在 Apple 上普遍不存在。往後電子線再排混音盤要先預期這件事。

`Frankie Knuckles presents Satoshi Tomiie《Tears》`狀態是 **`no-preview`（有碟無預覽）**，
與 unavailable 不同，本機若要補可從那個 collectionId 下手。

## 四、這批立的裁定（`c97/rulings.md` 共 12 條）

策展層九條：`chk-prop.mjs` 的 §5.5 electronic 分支、八張白名單卡的逐張理由、
十四張 Compilation／DJ-mix 不填例外欄位、五組掛名的池掃、Tears 取合併 credit、
三張盤名不取 MB 標題、DE9 統一用冒號、fabric 系列取短名、《Sound Mirrors》年份取 2006。

**主線追加三條，其中第 10、11 條是通則：**

**第 10 條——「缺一段」與「換了內容」是兩回事。** Pierre Henry《Messe de Liverpool》
的 Apple 條目缺〈Credo〉一段，是**同一部作品的子集**，可用（簡介裡那筆的軌數與曲目一律略去）；
Bernard Parmegiani《Dedans dehors》配到的是**不同內容**，不可用。
**軌數對不上本身判不出是哪一種**——要看少掉的是不是同一部作品的段落。

**第 11 條——gb 有條目不等於 gb 拿得到試聽。** Burial《Antidawn》研究層正確指出 gb 的
`0→0` 是 search 漏碟、gb 條目 1598131152 確實存在；但**那個條目一列曲目都沒攤開**。
改回 jp 1598321360（5 軌皆有 previewUrl）。**「條目存在」與「曲目列攤得開」是兩個獨立的檢查。**

第 12 條：其餘三處兩說（Enya《The Celts》年份、Le Voyage、Coldcut）一律維持卡單值。

## 五、交回本機的線上池問題

**七筆「同一張碟、池中用另一種字串」**（詳表在 `rulings.md` 的「附」節）——
標點、大小寫、前後綴的差異，`dedup-crossbatch.mjs` 與 `chk-prop` 的正規化
**處理掉前兩類、處理不掉前後綴的有無**（`Blood Music: `、`DE9: `、` et musiques concrètes`）。
這七張本批全部沒有提案，是策展層人眼擋下的。
**這是現行去重管線的第二個結構性缺口**（第一個是第 49 條的盤名羅馬拼音無處可放）。本批不改工具。

## 六、本機接手要做的

1. 三軸與 rarity（§0.8 錨點制）、頂點資格評估。
2. 44 張寫進 `seed_cards.json`、封面與試聽寫進 `album_overrides`、KV 與 Firestore 回讀。
3. 逐張審稿時對照 `desc-restyle/progress.json` 的**通論帳本**——
   雲端讀不到那個檔，只擋得住批內重複（`chk-hook-crossgroup` 44 張全過），
   **跨批次的通論重複要本機把關**。本批 44 種切入型態的清單見兩支 hook 代理的交件紀錄。
