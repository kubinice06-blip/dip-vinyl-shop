# c-109 交接（2026-09-06）：法語搖滾與 80s 後流行，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

`EXPANSION-PLAN-c89plus.md` C 線，`lineType: 廣度`。**法語七位藝人抽測全零**，這條線此前近乎空白。

**45 張、18 位掛名、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID。年份 1967–2021。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 法語搖滾（Bashung、Noir Désir、Hallyday、Téléphone、Rita Mitsouko、Indochine、-M-、Dominique A） | 24 |
| b | 法語流行與新世代（Claude François、Mylène Farmer、Daho、Tellier、Céline Dion、PNL、Justice、M83、IAM、Angèle） | 21 |

**曲風**：rock 23、pop 16、hiphop 3、electronic 2、folk 1。**§5.6 合輯 0 張。**
Bashung 5、Noir Désir 4、Étienne Daho 4，Hallyday／Téléphone／Rita Mitsouko／
Claude François／Mylène Farmer／Sébastien Tellier 各 3，其餘各 1–2。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **45/45（100%）** | `c109/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c109-out-{1,2}.json` |
| 5. 固定試聽 | **45/45（100%）**，**45 張全部命中 `fr`** | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**封面與試聽都是滿的**——十六批裡第三批（前兩批是 c-111 與 c-112）。
**45 張全部命中同一個店面**是此前沒出現過的形狀：法語目錄的再發權集中在法國本土。

**簡介的機器 QA**：`qa-batch.mjs out c109` 全過（out-1 24 張 199–239、out-2 21 張 197–238、>260 零筆）；
`fix-spacing` 兩檔待補 0；`qa-batch research/hooks c109` 與 `chk-hook-crossgroup c109` 皆 0 標記
（hook 加權 19–37、note 265–349）。
主線一次性複驗：**45 張 `desc` 開頭與 `hook` 逐字相符**；
兩支寫作層各自掃過資料庫名、榜單評分、**彎撇 `’`**，三類都是 0 次。

## 三、策展層被推翻的 14 處（硬錯 4）

1. **Bashung《Roulette russe》**：`curatorWhy` 寫「收〈Gaby oh Gaby〉」——
   **1979 原盤 11 軌裡沒有這首**，它是 1980 年「nouveau couplage」版換進去的第 6 軌。
2. **Les Rita Mitsouko《The No Comprendo》**：「三張裡唯一走出法國市場」**與來源相反**——
   《Marc & Robert》有 1988 GB Official CD。
3. **Angèle《Nonante-cinq》**：「她只有兩張正規盤」**與來源相反**——目錄已有第三筆《Instinct》(2026-10-16)。
4. **Bashung《Bleu pétrole》**：「生前最後一張錄音室作品」——本張之後尚有
   2011《L'Homme à tête de chou》與 2018《En amont》兩筆 Album。

**序數 11 處**：Johnny Hallyday 三張的目錄序與條目差 **10–11 張**（他的目錄太長，機械數必錯）、
`-M-`《Qui de nous deux》目錄第 5／條目第 3、PNL 兩張、Noir Désir 首張、
Céline Dion《D'eux》、Claude François 兩張各差 1–3 張。**全部寫成「序數一律不提」。**

## 四、**線上版與原盤的軌數落差 10 處**（本批最重要的一條）

| 卡 | 線上版 | 原盤 |
|---|---|---|
| Téléphone 三張 | **2015 重製版** 9／13／10 軌 | 同軌數但母帶不同 |
| Dominique A《La Fossette》 | **31 軌合併版** | **前 13 軌**才是原盤 |
| Dominique A《Remué》 | **27 軌合併版** | **前 14 軌**才是原盤 |
| Indochine《Paradize》 | 15 軌（另有 28 軌豪華版） | 15 |
| Mylène Farmer 三張 | 12／12／10 軌（另有 24 軌版） | 12／12／10 |
| Étienne Daho 三張 | 軌數與原盤不同 | 見 `note` |

**行文一律只引原盤的軌數與曲序。** 簡介已逐張守住。

## 五、探測層 6 張 unavailable 全是假的

全部回撈成功、逐軌覆核成立（含回撈清單標「目錄裡找不到」的《Remué》）：
Noir Désir《Tostaky》fr `1443608935`、Téléphone 三張 fr `1055763940`／`1056175321`／`1056187455`、
Dominique A 兩張 fr `693506098`／`693505026`。
**另 2 張改指更接近原盤的 id**：Mylène Farmer《L'Autre...》fr `1855831155`、《Anamorphosée》fr `1855823375`。
回撈清單裡的 `1244745246`、`1056184622`、`693501713` 覆核為別碟，已排除。

## 六、給下游

- **撇號一律 ASCII 直撇**（池中 800 張帶撇號的有 774 張是 ASCII，且原盤 release 本身就是 ASCII）。
  簡介與 hook 的彎撇掃描都是 0。
- **寫作層的字數教訓（第 206 條）**：writer-1 的 24 張初稿**有 15 張超過 240、最高 293**，
  成因是 `note` 的節拍鏈裡幾乎每張都有一格「製作人／混音／樂手」，法語人名字元數是中文的三到四倍。
  往後這種批要**在預算表階段就把工作人員那格標成可捨**。
