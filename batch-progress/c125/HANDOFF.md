# c-125 交接（2026-09-08）：伊比利半島——佛朗哥的西班牙與薩拉查的葡萄牙，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主 2026-09-08：**「找出獨裁體制下的音樂……任何世界上的國家都可以」**。
收錄判準是**產製條件**——國營壟斷、審查、藝人流亡或被禁——不是曲風。

主線對卡池實掃 20 個體制場景，這是最空的三塊之一：
**西班牙 20 位標誌藝人有 18 位是零（池中 6 張）、葡萄牙 17/20 零（池中 7 張）。**

**45 張、44 位掛名、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID。
年份 1966–1984。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 西班牙：佛朗哥時期與過渡、la Movida | 25 |
| b | 葡萄牙：Estado Novo 與康乃馨革命 | 20 |

**加泰隆尼亞語 6 張＋加利西亞語 1 張**（Pau Riba、Raimon、Ovidi Montllor、Lluís Llach、
Sisa、Maria del Mar Bonet ＋ Fuxan os Ventos）——**盤名全照原文語言，沒有譯成西班牙語**。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **37/45（82%）** | `c125/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制 | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c125-out-{1,2}.json` |
| 5. 固定試聽 | **31/45（69%）**，全部命中 `es` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**缺封面 8 張**：Smash《Glorieta de los lotos》、Máquina!《Why?》、Vainica Doble、
Fuxan os Ventos、Vitorino、Grupo de Acção Cultural、Jorge Palma、Salada de Frutas。

**試聽從 27 補到 31**：研究層跑第三種查法（直查 `collectionId`）
**找回 8 張策展層判「沒有」的**——
**Sisa 要用店端全名「Jaume Sisa」才撈得到**、**José Cid 的店端盤名寫「10.000」帶點**、
**Quarteto 1111 策展層只找到 1993 合輯就停手**。

**簡介的機器 QA**：`qa-batch.mjs out c125` 全過
（out-1 25 張 181–216、out-2 20 張 166–202、>260 零筆），`fix-spacing --write` 兩檔待補 0；
`qa-batch research/hooks c125` 全過、`chk-hook-crossgroup c125` 45 張全過
（hook 加權 20–37、note 305–350）。
主線一次性複驗：**45 張 `desc` 開頭與 `hook` 逐字相符**、**四位中文數字年 0 筆**、
**45 張全部落在所屬字數帶**、**施工單洩漏 0 筆**、
**那四段被擋下的政治敘述關鍵詞 0 命中**。

## 三、⚠ 研究層擋下策展層 **45 張卡、166 處**（a 89／b 77）——最重的是政治敘述

**策展層寫了四段政治敘述，研究層逐段查證後全部查不到來源，整段擋掉**：

| 卡 | 策展層寫的 | 查證結果 |
|---|---|---|
| **Jarcha《Libertad sin ira》** | 「被《Diario 16》當創刊曲、電台停播後又解禁」 | **查無任何來源**，端上根本沒有承載播放紀錄的欄位。連 `risk` 給的「可寫播放與解禁紀錄」這個前提都不成立 |
| **Cecilia《Un ramito de violetas》** | 「歌詞多次送審被要求改字、〈Mi querida España〉兩版本並存」 | **查無來源**（目錄裡該曲只有一筆單曲）。另**本名是 Eva Sobredo** |
| **Carlos Paredes** | 「1958–1961 因政治案入獄」 | **實體欄位查無任何司法紀錄——這種政治敘述沒來源就一字不能寫** |
| **Gabinete Caligari** | 從〈Sangre española〉〈Maquis〉的曲名反推 | **曲名反推不算來源** |

**另加一類**：**Triana「1975 年正好是佛朗哥過世那一年」——這種因果暗示也不行。**

**其餘最重的五處**：
- **Canarios《Ciclos》不是「拆解韋瓦第《四季》」**——四軌全叫〈第 N 次 transmigración〉，
  **曲目表沒有一個字提到韋瓦第或四季**；「Teddy Bautista 帶領」零成員關係。
- **Lluís Llach《Com un arbre nu》不是「全碟加泰隆尼亞語」**——
  〈Comandante〉西語、〈Madame〉法語、〈Debilitas formidinis〉拉丁語；
  「鋼琴自伴」也無樂器欄位（九軌只登錄錄音室／製作／工程／美術／演唱五種關係）。
- **Fausto 不是出生於安哥拉**（實體 begin-area 是葡萄牙 Vila Franca das Naves）；
  **「1970–1979 五個 Album」實數是 7**。
- **Carlos do Carmo「全部歌詞出自 Ary dos Santos」查無作詞者 credit**；
  **1977 那筆 status 是 Promotion、1980 才是 Official**（兩筆 catno 相同）。
- **Salada de Frutas 的 begin-area 是 Amadora 不是里斯本**，
  **唯一那筆 release 的載體是卡帶**（策展稿完全漏掉）。

## 四、⚠ 年份與版本狀態

| 卡 | 問題 |
|---|---|
| **Alaska y los Pegamoides** | 墨西哥盤是 **1987 不是 1982** |
| **Kaka de Luxe** | 串流 ℗ 1978 vs 首發 1983，**差五年，行文不得引 ℗** |
| **Gabinete Caligari** | ℗ 1984 vs 1983-12 |
| **Grupo de Acção Cultural** | 1975 **沒有任何第三方來源**（該團在店端連藝人實體都不存在），只能證明落在 life-span 1974–1978 內。**不得寫成有來源的發行年** |
| **Sérgio Godinho** | 兩說**都站得住**（資料庫 1972／串流標示與版權年 1971），維持卡單 1972，**但不得單方面斷言** |
| **Jorge Palma** | 「目錄裡有明確年份的第一張」**不得寫**（兩份目錄互相矛盾） |
| **Máquina!《Why?》** | 2015 瑞典那筆是 **Bootleg**（12 軌，與原盤 4 軌不同），**不算「四十五年間三次復刻」的第三次**；José Cid 的 2015 智利那筆也是 Bootleg |
| Carlos Paredes 1971／José Mário Branco 1971 | 裁定 257 的三張裡這兩張**拿到串流版權年佐證** |

## 五、⚠ 曲名與長度的來源

- **Fuxan os Ventos 13 軌與 Gabinete Caligari 11 軌在資料庫端只有軌數、沒有曲名**
  ——曲目唯一來源是店面側。
- **Paulo de Carvalho 與 Vitorino 兩張兩邊都零長度——簡介一個時間都沒寫。**
- Décima Víctima、Smash、Raimon、Cecilia 的原盤欄位沒有長度，
  Quarteto 1111／Brigada／Carlos do Carmo 的長度只有店面端有——**簡介已逐張註明來源**。

## 六、§5.6：**開 0 張**（與主線簡報的預期相反）

我的簡報寫「這條線大量是近年的復刻合輯，§5.6 是主要入口」。**伊比利不是。**
策展層實查：**45 張裡 41 張在資料庫有 1965–1980 的 release**，
復刻合輯全在 2000 年之後、與年份窗口直接衝突。
**合輯是 c-123 波羅的海與 c-124 伊朗那兩條線的入口，不是這條。**

## 七、⚠ Gong 撞卡（已排除）

池中既有的 5 張 `Gong` **全是法國 Daevid Allen 那支**；
西班牙的 Gong 排第 10／79，且 **release-group 瀏覽回 0 筆**——沒有可收的碟，不收。
**日後若要補收，要先解掛名撞卡。**

## 八、未收清單與下一批

`c125/rulings.md` 第四節分四類。**D 類 29 張碟本身合格、只是名額不足，
全部已釘 MBID，可直接開下一批。**

## 九、本機接手的順序

1. 三軸、rarity、頂點資格（§0.8 錨點制）。
2. **8 張缺封面要人工補圖**。
3. 上架 `seed_cards.json`、四處寫入與回讀。
4. **14 張沒有試聽來源**——研究層跑過三種查法確認，不用再跑探測。
5. **回看策展稿時請對照第三節那張表**——那四段政治敘述查不到來源，不要再寫回去。
