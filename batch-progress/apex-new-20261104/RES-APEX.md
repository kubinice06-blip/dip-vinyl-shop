# 研究層加做：頂點（異端）判定（ax 線）

這條線的卡都是策展層提名的**異端 heresy 候選**。照 `batch-progress/mood-cells-20261022/RES-DISPATCH.md` 做完一般研究之外，每張另外判定頂點資格。

## 標準（2026-11-04 主線更正，條號 51571）
**照店主 2026-11-03 裁定 3（`batch-progress/apex-rebalance-20261103/PLAN.md`）**：回到 `ALBUM_ONBOARDING.md` §3 的**基本定義**——
- 硬蕊度（accessibility）必須 5：**整張**難入耳（噪音牆、無調、無拍、刺耳音色、反結構、極端延長或靜默），不是只有幾段噪音。
- 有**可信資料**支持它極端前衛、噪音或結構上難入耳——樂評／專書／廠牌說明用 harsh、abrasive、unlistenable、extreme、punishing、uncompromising、brutal、radical reduction 這類描述，或把它列為該場景的極端代表作即可。
- **不要求**「史上最難入耳之一」的 7 星級證據（舊版本檔這樣寫是錯的，太嚴，已作廢）。
- 不收：聽得下去的前衛作品（有旋律、有穩定律動、偏氛圍的 drone／dark ambient、能量型自由爵士、一般碾核、只是陰暗的工業氛圍）。
- 可信資料：The Wire、樂評書目、專書、學術、AllMusic／Pitchfork／Quietus／Brainwashed／Musique Machine／Tiny Mix Tapes／Dusted 等樂評、廠牌官方說明、維基（有引註）。單一部落格不夠；Discogs 頁的 notes 不算樂評，但可當輔證。
- 同一位藝人在異端只能一張：查 `seed_cards.json` 第 9 欄 heresy 的藝人（含別名、化名、互為子字串），撞了就判不合格並寫明。

## 寫法
每張研究稿加一個欄位：
```json
"apex": {"verdict": "heresy|none", "accessibility": 5, "why": "一句話依據（中文）", "evidenceUrls": ["https://…", "https://…"]}
```
- `verdict: heresy` 需要至少 2 個不同網域的 https 證據網址，其中至少 1 個是上面說的可信資料。
- 聽感本身就是溫和、可入耳的判 `none`，照一般卡上架。
- 若這張根本不該上架（身分錯、是合輯／單曲／EP、現場盤又不是代表作、封面查不到），notes 寫「建議汰換：…」並在報告列出。
- 報告最後列：判 heresy 幾張、none 幾張、建議汰換幾張。
