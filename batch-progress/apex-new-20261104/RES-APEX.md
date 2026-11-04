# 研究層加做：頂點（異端）判定（ax 線）

這條線的卡都是策展層提名的**異端 heresy 候選**。照 `batch-progress/mood-cells-20261022/RES-DISPATCH.md` 做完一般研究之外，每張另外判定頂點資格。

## 標準（`ALBUM_ONBOARDING.md` §3，2026-11-02 起「頂點＝該軸 7 星」）
- 硬蕊度（accessibility）必須 5：整張難入耳，不是只有幾段噪音。
- 要到 7 星：有**可信資料**稱它是該場景最極端／最難入耳的錄音之一（harsh noise wall、Metal Machine Music、Merzbow 級）。一般前衛自由爵士、噪音搖滾、可聽的極簡、偏氛圍的 drone／dark ambient 只到 5，不合格。
- 可信資料：The Wire、樂評書目、專書、學術、AllMusic／Pitchfork／Quietus／Brainwashed 等樂評、廠牌官方說明、維基（有引註）、Discogs／RYM 該類型前段。單一部落格不夠。
- 同一位藝人在異端只能一張：查 `seed_cards.json` 第 9 欄 heresy 的藝人（含別名、化名、互為子字串），撞了就判不合格並寫明。

## 寫法
每張研究稿加一個欄位：
```json
"apex": {"verdict": "heresy|none", "accessibility": 5, "why": "一句話依據（中文）", "evidenceUrls": ["https://…", "https://…"]}
```
- `verdict: heresy` 需要至少 2 個不同網域的 https 證據網址，其中至少 1 個是上面說的可信資料。
- 拿不準就判 `none`，照一般卡上架。不要為了湊數放寬。
- 若這張根本不該上架（身分錯、是合輯／單曲／EP、現場盤又不是代表作、封面查不到），notes 寫「建議汰換：…」並在報告列出。
- 報告最後列：判 heresy 幾張、none 幾張、建議汰換幾張。
