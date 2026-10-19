# desc-shop-voice-20261019 — 簡介去除店家第一人稱／推銷口吻

**起因**：店主截圖富樫雅彥《Sketch》卡頁，指示「把店主入坑那句刪掉，然後掃描我的簡介裡如果有類似的狀況全改掉」。

## 掃描範圍與方法

- 從 KV 撈下全部 `desc2:`（18,687）與 `desc4:`（2,086）共 20,773 則簡介（即時值，不靠 repo 快照）。
- 關鍵詞：店主／本店／小店／店家／店內／店裡／入坑／筆者／小編／老闆／我／我們／個人最…／推薦／入手／值得一聽／必聽／喜歡…的人 等；
  `我` 系列先剔除〈〉《》「」『』引號內文字再比對。
- 另把 72 則源自店主 IG（reels，c-35／c-36 與 worker `kv-import-reels.json`）的簡介全文逐則讀過。

## 結果

- **店主第一人稱**：只有 1 則（富樫雅彥《Sketch》）。其餘「店主」「老闆」「店裡」命中全是第三人稱史實（唱片行店主、廠牌老闆、俱樂部店裡錄音），不動；「我」命中全在引文或曲名內。
- **同源的賣場推薦口吻**（店主 IG 原文留下的）：5 則，一併改。
- **未改**：非 IG 來源、由產線寫的少數評價句（Morton Feldman《Triadic Memories》「絕對值得一聽」、Oneohtrix Point Never《Replicas》「很適合喜歡實驗電子樂的人」、今田勝《Toya》「特別適合喜歡細品…的樂迷」、Roosevelt Sykes《Blues》「好選擇」）——是評價語氣，不是店家口吻，留給 desc-restyle 重寫時處理。

## 改動（6 鍵）

| key | 原句 | 新句 |
|---|---|---|
| desc2:masahiko togashi quartet\|sketch | 店主入坑自由爵士的第一張唱片。free jazz 常讓人卻步 | 自由爵士常讓人卻步 |
| desc2:brian eno / jah wobble\|spinner | …ambient-dub 作品。推薦給喜歡 dub 低音迴響的人。 | …ambient-dub 作品。 |
| desc2:erroll garner\|erroll garner plays misty | 是放鬆聆聽 mellow jazz 的好選擇。推薦曲目〈Misty〉〈Again〉〈Exactly Like You〉。 | 標題曲之外另收〈Again〉〈Exactly Like You〉〈That Old Feeling〉等標準曲。 |
| desc2:estelle perrault\|promises | 極易入耳，推薦曲目〈Sunshine〉〈Day By Day〉〈I Know You Wish〉。 | 整張極易入耳，另收〈Sunshine〉〈Day By Day〉〈I Know You Wish〉等曲。 |
| desc2:de la soul\|art official intelligence: mosaic thump | 開場曲那種振奮人心的訊息，正是入手這張的理由。 | 開場曲便以振奮人心的訊息定下全張基調。 |
| desc2:de la soul\|aoi: mosaic thump | 開場曲振奮人心的訊息正是入手這張的理由。 | 開場曲便以振奮人心的訊息定下全張基調。 |

- 曲目依據：Apple `/lookup` collectionId 1440912155（Plays Misty，10 軌含 Again／Exactly Like You／That Old Feeling）、1800348064（Promises，11 軌含 Sunshine／Day By Day／I know you wish）。
- 全文前後對照見 `changes.json`。`onboarding-manifest-c36-reels-20260822.json` 同步改 5 處（aoi 鍵不在 manifest，來自 worker 舊匯入檔）。
- 未動 worker repo 的 `scripts/desc-gen/kv-import-reels.json`／`reels_raw.json`（一次性歷史匯入檔，不會再寫回 KV）。
