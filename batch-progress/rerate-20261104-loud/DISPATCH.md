# 硬蕊度音量下限重評：判定代理派工（2026-11-04）

**只判硬蕊度（accessibility）。經典度、冷門度不動，不要輸出。**

## 新錨點（店主 2026-11-04 定案）
硬蕊度＝入耳難度，音量、失真、速度、嘶吼都算門檻。下限只在**整張大部分如此**時套：
- 失真吉他為主的龐克、流行龐克、車庫搖滾、傳統／另類金屬（含 nu-metal、doom、prog-metal 的重型盤）、音牆型 shoegaze、噪音搖滾、工業搖滾 → **至少 3**（blink-182《Enema of the State》是 3 的錨點）。
- hardcore、thrash、crust／d-beat、death、black、grind、powerviolence、sludge、metalcore／mathcore 這類極速／嘶吼／極重 → **至少 4**。
- harsh noise、power electronics 的純噪音盤、極端反結構 → 5；power electronics 以人聲／節奏為主的 → 至少 4。
- **只往上調到下限，不往下調**；現值已 ≥ 該下限的直接 keep。
- **維持原分**的情形：不插電／原聲專輯、抒情盤、柔和的獨立流行／dream-pop 型 shoegaze、power-pop／新浪潮式乾淨吉他、只有一兩首吵的、樂團轉型後的柔和期、標籤錯配（其實不是這類曲風）。
- 不要超過下限加分（例：pop-punk 給 3 就好，不給 4），除非該張本身就極端（如 thrash 標籤下的 grind 盤可給 4 以上原本就 4）；**一般就給下限值**。

## 欄位
- `class` A：已帶範圍標籤，`tagFloor` 是標籤推得的下限。你判整張是否屬實；若標籤推的下限偏高（例：tagFloor 4 但其實是旋律型 post-hardcore／emo 而非極速嘶吼）可給 3。
- `class` B：篩選。標籤只有 `rock/punk-wave` 母類或亞洲搖滾，先判這張是否屬上述曲風；不屬就 keep。
- `class` C：無標籤的 hardcore 分輯，tagFloor 4。

## 做法
- 靠你對樂史的知識判斷；拿不準時可 WebSearch 查維基／樂評一兩句（每片最多 8 次），不用每張查。不認得、查不到的 → keep，`why` 寫「不認得」。
- 輸出：`batch-progress/rerate-20261104-loud/verdicts/sNN.json`，JSON 陣列，**每張都要一筆**（含 keep）：
  `{"key": "<原 key>", "accessibility": <新值>, "keep": <true 表示維持原分>, "rule": "3"|"4"|"5"|null, "why": "<一句中文：整張聲音特徵>"}`
  keep=true 時 accessibility 填原值。
- **每做完 25 筆就把目前結果寫進輸出檔**（整檔覆寫為目前已判的陣列）。
- **輸出檔已有內容就接續**：先讀它，跳過已有 key，只補沒判的，不要重寫。
- 交件前自檢：筆數＝shard 筆數、key 一字不差、新值 ≥ 原值。
- 回報限 4 行：張數、到 3／到 4／到 5／keep 各幾張、拿不準的 3 張。
