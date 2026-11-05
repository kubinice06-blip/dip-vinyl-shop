# 全池稽核＋頂點篩選：代理派工

派工訊息會告訴你 shard（例 `H02`）和範圍（第 X–Y 張，0 起算，含頭不含尾）。shard 在 `batch-progress/audit-20261102/shards/`。

## 先讀

1. `batch-progress/rerate-20261101/RUBRIC.md`：三軸定義與錨點，必讀全文。**硬蕊度＝入耳難度，5＝晦澀前衛。**
2. `batch-progress/rerate-20261102/RUBRIC-ADDENDUM.md`：冷門度下限，硬規則；疑錯配例外。
3. 本檔下方的頂點卡定義。出處是 `ALBUM_ONBOARDING.md` §3 與 `CARD_GAME_DESIGN.md`。

## 頂點卡定義：該軸要到「7 星」（2026-11-02 店主更正）

**店主**：「不是五分就可以進 是要七分 我以前有寫過標準」。

頂點卡就是王牌，對應的那一軸在前台和對戰裡都是 **7 星**（`CARD_GAME_DESIGN.md` §8.2「王牌＝單軸 7」）。所以判頂點時，要問的是**這張在那一軸上配不配得上 7 星**，也就是比 5 星錨點再高兩級。只拿到 5 分不夠。

| tier | 中文 | 該軸 | 5 星長什麼樣（一般卡上限） | **7 星長什麼樣（頂點門檻）** |
|---|---|---|---|---|
| `hall` | 殿堂 | 經典度 | 該場景或類型的里程碑、必聽盤 | **跨類型的史上正典**：幾乎所有綜合歷代榜（Rolling Stone 500、1001 Albums、Pitchfork／NME／Q 歷代榜、Penguin 皇冠＋普遍公認）都收，非該類型樂迷也知道。等級感：OK Computer、Kind of Blue、Pet Sounds、What's Going On、The Velvet Underground & Nico。只是「該國或該類型第一名盤」通常是 5，不是 7 |
| `pearl` | 流亡 | 冷門度 | 私壓或極小廠，沒有串流再發 | **傳說級稀有**：壓量有據極小（數百張以下），從未正式再發或只有極小量授權重發；Last.fm listeners 是有效數值且 <300（硬條件）；在收藏圈以「聖杯」或「幾乎沒人聽過」著稱 |
| `heresy` | 異端 | 硬蕊度 | 前衛、噪音、概念、極端（Cecil Taylor 級） | **極端中的極端**：被公認為史上最難入耳的錄音之一，例如 harsh noise wall、反音樂里程碑（Metal Machine Music、Merzbow《Pulse Demon》、非常階段、Trout Mask Replica 級的結構性拒斥）。單純「很前衛的自由爵士或噪音搖滾」是 5，不是 7 |

- **頂點是門檻，不是獎勵。** 三軸高分或 legendary 都不等於頂點，預設 `none`。
- 拿不準 7 還是 5，一律判 `none`。頂點全池應該是**少數**：殿堂原意約數百張，流亡、異端各約百張。
- `strength`：3＝毫無爭議的 7 星，2＝多數會同意，1＝勉強。之後收錄以 3 為主。
- 三軸欄位照填 1–5 的一般尺（頂點那一軸照實填 5）。是否到 7 星只寫在 `apex`／`strength`／`why`。

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
