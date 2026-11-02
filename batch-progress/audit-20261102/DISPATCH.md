# 全池稽核＋頂點篩選：代理派工

派工訊息會告訴你 shard（例 `H02`）和範圍（第 X–Y 張，0 起算，含頭不含尾）。shard 在 `batch-progress/audit-20261102/shards/`。

## 先讀

1. `batch-progress/rerate-20261101/RUBRIC.md`：三軸定義與錨點，必讀全文。**硬蕊度＝入耳難度，5＝晦澀前衛。**
2. `batch-progress/rerate-20261102/RUBRIC-ADDENDUM.md`：冷門度下限，硬規則；疑錯配例外。
3. 本檔下方的頂點卡定義。出處是 `ALBUM_ONBOARDING.md` §3 與 `CARD_GAME_DESIGN.md`。

## 頂點卡定義（三種互斥，嚴格）

| tier | 中文 | 必要條件 |
|---|---|---|
| `hall` | 殿堂 | 經典度必須是 5；而且有**跨來源的長期樂評共識**，足以列入該領域史上核心作品，例如 1001 Albums、Rolling Stone 500、Pitchfork／NME 歷代榜前段、Penguin Guide 皇冠、AllMusic 5 星且被廣泛列為經典、該國權威榜首位級。等級感約是「OK Computer」。只是「藝人代表作」或「場景里程碑」還不夠，要到「該領域人人必提」 |
| `pearl` | 流亡 | 冷門度必須是 5（私壓或極小廠，無串流再發），**而且** Last.fm 累積 listeners 是有效數值且 <300。查無資料不算 0；疑錯配不算 |
| `heresy` | 異端 | 硬蕊度必須是 5，**而且**有可信資料支持它極端前衛、噪音或結構上難入耳。不憑個人喜好 |

**頂點是門檻，不是獎勵。** 三軸高分或 legendary 都不等於頂點，預設 `none`。

## 各組要做什麼

- **A 組（現有頂點卡）**：判斷該卡現有 tier 是否成立。
  - 成立：`apex` 填原 tier，三軸照實判。若現值和 tier 的必要條件矛盾（例如殿堂卡經典度是 4），說明是三軸錯還是 tier 錯。
  - 不成立：`apex` 填 `none` 或另一個 tier，`why` 寫理由。
- **H／X／P 組（候選）**：判斷是否符合對應 tier 的嚴格定義。
  - 符合：`apex` 填 tier，`strength` 1–3（3＝毫無爭議），`evidence` 至少 2 個 https 網址。
  - 不符合：填 `none`。
  - 三軸一併照 RUBRIC 重判。
  - P 組另外要判斷 listeners 是否疑錯配；疑錯配就填 `none`，`why` 註明。
- **S 組（9 月前入庫的一般卡抽樣）**：**盲評**，先照 RUBRIC 自己判三軸，判完再看 `cur`。`apex` 照樣判，絕大多數是 `none`。

## 輸出

寫到 `batch-progress/audit-20261102/verdicts/<shard>-<起>-<迄>.json`：

```json
[{"key":"藝人|專輯","classic":5,"obscurity":2,"accessibility":2,"apex":"hall","strength":3,
  "evidence":["https://...","https://..."],"why":"≤80 字：依據","keep":false}]
```

- 每張都要有一筆，`key` 照 shard 原樣抄。
- **每做完 10 張就寫進輸出檔。** 輸出檔已有內容就接續，不要重寫。
- WebSearch 最多 8 次，只用在殿堂或異端的依據確認。其餘靠 `facts` 和既有知識。
- 不要 git add／commit，不要改其他檔案。
- 回報限 6 行：張數、apex 判定各幾張（原 tier → 新判定）、三軸平均變化方向、爭議最大的 3 張。
