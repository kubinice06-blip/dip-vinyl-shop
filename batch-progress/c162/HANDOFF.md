# c-162 交接（2026-09-19）：Blue Note 2010–2013，36 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 36 退 9**（a 18、b 18）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **36/36 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **36 張全 full**，**227–240**，⚠ **上限貼得很緊但無一超界** |
| 封面 | **32/36**（缺 4，研究層已撿到其中 3 張的可用網址，見下） |
| 固定試聽／無來源狀態 | **34/36 有來源**（其中 **5 張是人工回收**），**2 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

**2 張走固定無來源狀態**：`Cassandra Wilson《Silver Pony》`（研究層另掃 us／gb／jp／fr／it／ca／de 七市場，
Apple 全庫無本碟條目）、`Robert Randolph & The Family Band《Lickety Split》`（掛名反查 Apple us 全目錄 30 筆，
**目錄從 2010《We Walk This Road》直接跳到 2017《Got Soul》**，中間沒有這張）。**兩張都是查到底才判的，不是資料不足。**

**缺封面 4 張**，研究層撿到三張的可用網址（**本機可直接取用**）：
- `Joe Lovano Us Five《Bird Songs》` → Apple us `715473977` 的 600×600
- `Jukka Perko《Avara》` → Apple fi `714164277` 的 600×600
- `quasimode《Soul Cookin'》` → **廠牌官網母版** `https://content-jp.umgi.net/products/to/toct-29063_MDQ_extralarge.jpg`
- `Joe Lovano Us Five《Cross Culture》` → Apple us `715531004` 的 600×600
⚠ 另 32 張的 Discogs／Apple 封面網址也逐張寫在各卡 `notes` 裡。

## 三、⚠ 五筆人工回收的試聽，本機不可改動

**五筆都經第 1433 條核對（id 未被任何其他卡使用）**：

| 卡 | collectionId | 市場 | 判準 |
|---|---|---|---|
| `quasimode《Soul Cookin'》` | `720494128` | jp | 軌數 14＝14、2012-09-26＝2012、℗ 逐字 2012 EMI Music Japan Inc.。⚠ **Apple 把盤名印成《Soul Cockin'》（少一個 o），是一字錯拼，同一張碟** |
| `Thelonious Monk《Paris 1969》` | `1443129233` | us | 軌數 12＝12、2013＝2013、盤名只多副標 |
| `Elvis Costello and The Roots《Wise Up Ghost》` | `1445883662` | us | **15 軌版**，對應美版豪華 CD `B001875002`。⚠ 同名的 `1445887865` 是 12 軌英版／數位版，**不取** |
| `Willie Nelson & Wynton Marsalis《Here We Go Again…》` | `716160282` | us | 前 12 軌與美版實體逐字逐序相同，第 13 軌〈You Don't Know Me (Live)〉對應 MB 同 RG 的數位筆 |
| `Avishai Cohen《Duende》` | `693212508` | **gb** | ⚠ ⚠ **us 店面是幽靈條目（碟在、0 首歌、無預覽）**；改掃 13 個市場全部回 10 軌且都有預覽，**front 取 gb** |

⚠ **《Duende》的四個同名候選是用第十軌分辨的**：`693212508` 第 10 軌是〈Con Alma〉（＝數位版 bonus），
`854571637` 第 10 軌是〈Take the Coltrane〉（本 RG 任何一層都沒有這軌），`653957196` 是 ℗ Sunnyside（排除）。

## 四、⚠ 研究層推翻策展層：a 組八處、b 組 18 張裡 17 張

**本機不要拿策展層的 `curatorWhy` 當事實，一律以 `desc-tools/batches/research/c162-{a,b}.json` 為準。**
最容易誤寫的幾條：
- `Avishai Cohen《Seven Seas》` 的〈Worksong〉**是 Cohen 自己的曲子**，不是 Nat Adderley 的翻唱。
- `Ravi Coltrane《Spirit Fiction》` 的作曲歸屬整段錯，**而且漏了兩首翻奏**（軌 9 Ornette Coleman、軌 10 Paul Motian，**那兩軌正是 Joe Lovano 吹的**）。
- `Jukka Perko《Streamline Jazztet》` 三處作曲欄全錯（〈The Duke〉是 **Dave Brubeck** 不是 Ellington），**Perko 本人十軌一首作曲都沒掛**。
- `Terence Blanchard《Magnetic》` 的〈Hallucinations〉是 **Blanchard 自作曲**（推翻 Bud Powell），**本碟零翻奏**。
- `quasimode《Soul Cookin'》` 鼓與打擊寫反；第 12 軌作曲欄逐字 Foster & McElroy（En Vogue 那首），不是 James Brown。
- `Lionel Loueke《Mwaliko》` 與《Heritage》兩張的編制都整段重寫過。

## 五、⚠ 主線在驗收時改過一張 desc，本機以 repo 現況為準

`Jukka Perko《Streamline Jazztet》`：hook 逐字寫「**兩首**芬蘭老歌換上英文曲名」，
但鉤子層的 `note` 只點名一首，寫作層照 note 走，**hook 的懸念只收了一半**（`writer-base.md:159` 要求 hook 的懸念必須收尾）。
**主線補上軌 7〈Under The Birch Tree (Rantakoivun Alla)〉／Onni Laihanen（facts 有 src），並整格捨去錄音地點與日期，改後 239 字、兩道 QA 重跑皆 0 標記。**

## 六、QA 結果

- `chk-prop a b`：標記 0。
- `qa-batch research/hooks/out c162`：**research 與 hooks 全清**；
  **out 一筆已載明的良性誤報**——`Gov't Mule《Shout!》` 的 `未具名出處?` 命中的是 **hook 原文本身**
  「是吉他手列出的一份許願名單」，那是 Warren Haynes 自己對客座名單的稱呼，**正文下一句就具名**，且 hook 不可改（第 1735-B 條）。
- `chk-hook-crossgroup c162`：36 張跨組全過（hook 加權 17–27、字數 17–29、note 241–350）。
- `qa-check-research`：兩檔各一次，**標記 0**；**hook 原封開頭 36/36**。
- `fix-spacing`：兩檔各跑一次，**待補 0**。⚠ **該腳本預設 dry-run，要 `--write` 才改檔**（第 1740-B 條）。
