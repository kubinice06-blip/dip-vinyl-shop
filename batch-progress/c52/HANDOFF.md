# c-52 交接（2026-09-01）：東南亞收尾 25 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

c-SEA 的收尾。策展層當初提了 124 張，管線只收了有 rgMbid 的 99 張，
剩下 26 張因為「MusicBrainz 查無 release-group」被擱置——其中包括
**Rolling Stone Indonesia 150 大的第 1 名 Chrisye《Badai Pasti Berlalu》**。
本批把那 26 張撿回來，剔除 1 張撞卡後成 **25 張**。

同時替 9/1 上架時因缺封面而留置的 11 張補跑了封面線。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **13/25**，12 張要掃圖 | `desc-tools/batches/cards/c52-cards.json` 的 `cover` 欄 |
| 2. 三軸與 rarity | **雲端未做**（需 `/album-rating`） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **25 張全部寫完並過機器 QA** | `desc-tools/batches/output/c52-out-{1,2}.json` |
| 5. 固定試聽 | 已探測，2/25 ready | `batch-progress/c52/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：15 張釘住 rgMbid、10 張走 §1 的人工身分路線

**這批最要緊的一件事**：策展層 `mbNote` 欄記的 MBID **混了藝人 MBID 與
release-group MBID**（Barong's Band 那筆的 mbNote 自己就寫明「有藝人條目但
底下沒有任何 release-group」）。照抄會釘出一個「指向藝人而非碟」的假身分，
而且格式合法、驗證器擋不下來。`verify-noted.mjs` 逐個回問 MB 判定實體類型後才採用。

10 張人工身分卡（`identitySource: "manual"`）依 §1 需要：
`mbAbsenceProof`（≥2 組實際下過的 MB 查詢＋ISO 日期＋結論）、
≥2 個 HTTPS `manualEvidenceUrls`、`manualRuling`，且 **rgMbid 必須留空**。
**研究層已經把佐證網址備齊**（每張 3–5 個獨立來源，見各研究檔的 `identityEvidence` 欄），
本機組 manifest 時直接取用即可。`mbAbsenceProof.queries` 可從
`batch-progress/c52/requery-out.json` 與 `verify-noted.log` 取。

### 封面：13/25

- **CAA 12 張**（版本釘得住，以 release-group MBID 為鍵）
- **Bandcamp 1 張**（Panbers 的 2023 年合輯，官方頁）

**12 張缺封面**：Koes Plus《Volume 4》、Panbers《Volume 1》、Barong's Band、
Benyamin S.《Si Djampang》、Rhoma Irama《Darah Muda》、Yockie 兩張、
Bubi Chen、Indra Lesmana《No Standing》、Karimata《Pasti》、simakDialog《Baur》、
Cinderella《Ang Boyfriend Kong Baduy》。

**1 張封面版本存疑**（`coverVersionDoubt: true`）：Keenan Nasution
《Di Batas Angan Angan》——封面取自 MB 上唯一的 release-group，那是 2015 年再版
（8 軌），與 1978 原盤（14 軌）**選曲不同**。§4 要求核對版本，交本機以實體圖比對後決定。

### 試聽：2/25 ready

九個 storefront（id／ph／th／vn／my／sg／us／gb／jp）全試過，只有
Karimata《Pasti》與《Music of Indonesia, Vol. 20》命中。8% 的命中率比 c-SEA 正編的
25% 更低是合理的——這 25 張正是當初「連 MusicBrainz 都沒有」的那一批。

**兩張自我同名卡要注意**：Barong's Band《Barong's Band》與
Zainal Abidin《Zainal Abidin》。依 §1「自我同名屬高風險，只有在 release 身分與
固定試聽都已嚴格核對時才能收錄」，這兩張都無試聽；Barong's Band 另外也無封面。
c-SEA 已有 14 張同類留置的先例，是否留置由本機決定。

## 三、雲端替本機省下的事

**別重跑封面線。** §4 的 Bandcamp → Spotify 兩條都跑過了，而且 worker 的搜尋
**回的是「最像的東西」不是「同一張碟」**——12 個命中裡 5 個可證明是錯的：

| 卡 | 配到什麼 |
|---|---|
| Gombloh《Kebyar Kebyar》 | 1985 年的一軌**單曲** |
| Elvy Sukaesih《Menghitung Bintang》（留置卡） | 1980 年的一軌**單曲** |
| Koes Plus《Volume 4》 | 《Pop Melayu Volume 4》(1976)，**另一個編號系列** |
| Panbers《Volume 1》 | 英國廠牌的《Tom Shorterz - Chav Bangers Volume 1》 |
| Zainal Abidin | 43 軌的 2013 年合集 |

`batch-progress/c52/covers-adjudicated.json` 有逐張判定與理由。

**這個病也在線上卡池裡**：`audits/spotify-single-covers.md` 記了 5 張線上卡的封面
來自單曲條目（Loretta Lynn、Kraftwerk、Bobby Womack、Thelonious Monk、Gong），
屬線上資料，留給本機。同一份稽核也記了 6 張是**誤報**（Miles Davis
《In a Silent Way》《Pangaea》這類整面一首的碟本來就一到兩軌），不要動。

## 四、上架前必須先看 `rulings.md`

15 條裁定，其中五條會直接影響你的操作：

1. **Duo Kribo《Duo Kribo》已剔除**——與池中《Duo Kribo (Original Soundtrack)》是同一張碟。
   我原本的去重用完全字串比對、尾綴不同就漏了，已補寫 `dedup-loose.mjs`。
   **建議本機的上架管線也加一道同樣的鬆散去重。**
2. **Koes Plus《Volume 4》年份已改 1971 → 1972**（1971 是錄音年）。廠牌 Mesra、編號 LP 50。
3. **三張年份有爭議的卡維持卡單值、行文寫成有據的異說**：Rhoma Irama《Darah Muda》
   （1975／1976）、Indra Lesmana《No Standing》（1984／1982）、Karimata《Pasti》
   （1985／1986／1987 三說）。簡介裡不會出現單一年份的斷言。
4. **三個策展理由查無來源，已改寫或標記**：Barong's Band 與巴里島 barong 舞的關聯
   查無（實為德國科隆組成、編曲取材 J.S. Bach）；simakDialog《Baur》的巽他 kendang
   被兩份內頁證據推翻；Indra Lesmana 的「印尼爵士第一次打進國際發行」是無來源的
   最高級宣稱。前兩者的 `curatorWhy` 已直接改寫。
5. **Cinderella《Ang Boyfriend Kong Baduy》要小心兩件事**：與美國 hair metal 團完全撞名；
   且與該團 1975 年的同名首作《Cinderella》是兩張不同的碟、曲目完全不重疊。
   MB 只有首作那張，本卡走人工身分路線。

## 五、簡介產線的數字

| | writer-1 | writer-2 | 合計 |
|---|---|---|---|
| 卡數 | 13 | 12 | 25 |
| 字數範圍 | 227–240 | 229–240 | 227–240 |
| 超過 240 | 0 | 0 | **0** |
| `qa-check-research` | 0 | 0 | **0** |
| `fix-spacing` | 0 | 0 | **0** |

`qa-batch out c52` 全部通過、與卡單 25 張相符。研究層 25 張全部 `status: full`，
每筆 facts 都有可開啟的 HTTPS 來源，5 張合輯的 §5.6 例外齊備（`reason` ≥12 字、
`urls` ≥2 個 HTTPS）。
