# c-64 交接（2026-09-02）：柬埔寨與越南 1960–70s 32 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

廣度線（`lineType: 廣度`，`scene: 柬埔寨與越南 1960–70s`）。**32 張、25 張合輯**。

| 組 | 內容 | 張數 |
|---|---|---|
| a | 柬埔寨（Cambodian Rocks 系列與後續考古再發、Sinn Sisamouth／Ros Serey Sothea 相關、Drakkar） | 14 |
| b | 越南（Sơn Ca 與 Trường Sơn 卡帶序列、Shotguns 系列、Saigon Supersound、Thanh Thúy） | 18 |

**這批原本只挖得出 14 張**，是店主說「柬越可以去挖」之後才做到 32。多出來的 18 張
靠兩件事，兩件都寫進了裁定：

1. **§1 人工身分（8 張）**——柬越 1960–70s 的母帶序列在 MB 上大量不存在。
2. **Sơn Ca／Trường Sơn／Shotguns 這些卡帶序列在 MB 上掛 `Various Artists`**
   （裁定第 94 條），從藝人 browse 一定查不到，必須從發行序列反查。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **28/32（88%）**，4 張要掃圖 | `c64/caa.json`（22）＋`c64/apple-art.json`（6） |
| 2. 三軸與 rarity | **雲端未做**——**照 §0.8 錨點制**（第 89 條），`ratings.source` 記 `manual:regional-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **32 張全部寫完並過機器 QA** | `desc-tools/batches/output/c64-out-{1,2}.json` |
| 5. 固定試聽 | **19/32 ready（59%）** | `c64/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：24 張 pinned、8 張 §1 人工

**人工身分那 8 張**（`identitySource: manual`、`rgMbid` 必為空）：

- ស៊ីន ស៊ីសាមុត《Groove Club Vol 4: Sinn Sisamouth》
- ស៊ីន ស៊ីសាមុត《Groove Club Vol. 5: Sinn Sisamouth Vol. 2》
- Thanh Thúy《Thanh Thúy 06 - Tiếng Hát Thanh Thúy》
- Thanh Thúy《Thanh Thúy 12 - Tiếng Hát Thanh Thúy》
- Various Artists《Băng Nhạc Shotguns 7 (Yêu)》
- Various Artists《Băng Nhạc Shotguns 13》
- Various Artists《Băng Nhạc Shotguns - Khiêu Vũ Con Đường Mới 1》
- Various Artists《Băng Nhạc Shotguns - Băng Vàng 72》

八張都有 `mbAbsenceProof`（≥2 個實際查詢、涵蓋藝人與作品兩個方向、ISO `checkedAt`、
≥10 字結論）、≥2 個 HTTPS `manualEvidenceUrls`、≥10 字 `manualRuling`。

> **上傳前務必確認這 8 張的 `rgMbid` 是空字串。**
> `make-cards-generic.mjs` 曾把其中 2 張變成假 pinned 卡——它從 `mbAbsenceProof`
> 的舉證敘述裡抓到**藝人 MBID**，當成 release-group MBID 填進去，§1 的舉證欄位整組被丟掉。
> 已在來源修掉（策展層明寫 `identitySource: 'manual'` 就一律尊重，不從 `mbNote` 推導），
> 裁定第 99 條。這是同一個病第三次發作（c-52 第 1 條 → c-55 的 27 張 → 這次）。

### 封面 28/32

**CAA 22 張、Apple 驗證版 6 張**。後者走 §4 新開的 `coverSourceHint: "apple-verified-collection"`
例外：人工身分卡沒有 rgMbid，CAA 無從查起，改用**精確 `collectionId` 反查**（不是模糊搜尋），
`c64/apple-art.mjs` 產出，每筆都帶 `collectionId` 與該頁 HTTPS 網址。

**4 張缺封面要本機掃圖**：Khánh Ly《Khi tôi về》、Various Artists《Thanh Thúy 22
(Những Vùng Đất Mang Tên Anh)》、Various Artists《Băng Nhạc Shotguns 13》、
Various Artists《Băng Nhạc Shotguns - Khiêu Vũ Con Đường Mới 1》。

### 合輯 25/32 全走 §5.6

比例高是這條線的本質——柬越 1960–70s 的錄音幾乎只以**卡帶合集**與**後世考古再發**
兩種形態存在，原盤單張的形態很少。25 張都有 `releaseType: "Compilation"`、
≥12 字 `exceptionReason`、≥2 個 HTTPS `exceptionEvidenceUrls`，
卡片年份取**合輯首次出版年**（不是收錄錄音的年份）。

### 試聽 19/32（59%）

## 三、寫作層要注意的六處（兩位寫手都已依裁定處理，這裡留紀錄）

`note`／`hook` 與 `facts` 對不上的地方，一律**以 facts 為準**（第 42／62／63／64 條），
不跨卡取事實（第 33 條）：

1. 《The Golden Voice of Phnom Penh》：〈The Music Has Started〉只在 `keyTracks` 不在 facts → 不點。
2. 《Don't Think I've Forgotten》：facts 內部 `Sieng Vanthy`／`Sieng Vannthy` 拼法不一致
   → 依第 92 條行文避開該名字。**研究稿建議統一拼法。**
3. 《Groove Club Vol. 3》：「Drakkar 也有同名曲」只在別張卡的 facts → 不寫。
4. 《Saigon Supersound, Vol. 3》：「女星」只在 `researchNotes` → 略去。
5. 《Khi tôi về》：卡帶母源的窄頻與底噪只在 `sound` 欄 → 依第 41／64 條不寫音色。
6. 《Drakkar 74》：note 的敘述鏈與同段限定句打架 → 依第 63 條以限定句為準，不寫曲數與年份。

`Sơn Ca 8` 依第 114 條寫成同名巧合；`Trường Sơn 2` 全篇無年份。

### 題材禁令都遵守

未寫 Dengue Fever 聽《Cambodian Rocks》起家、未提 Metal Postcard／The Cambodian Space Project、
未寫 Phương Tâm 移民美國。**「赤柬」只出現在《Don't Think I've Forgotten》與《Drakkar 74》兩張**；
《Cambodian Liberation Songs》用 facts 原文的「種族滅絕期間」承接，其餘 11 張全數略去。

## 四、機器 QA

```
qa-batch.mjs out c64      out-1 14 張 226–235｜out-2 18 張 227–235｜>260: 0｜與卡單相符 ✓
qa-check-research.mjs     out-1 標記 0｜out-2 標記 0
fix-spacing.mjs           兩檔各待補 0
```

## 五、跨批去重

已過 `dedup-crossbatch.mjs`，與 c-52…c-66 其餘未上傳批次無重複。
