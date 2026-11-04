# 硬蕊度音量下限第二輪：判定代理派工（2026-11-04）

**只判硬蕊度（accessibility）。經典度、冷門度不動，不要輸出。**

## 背景
第一輪（`batch-progress/rerate-20261104-loud/`）已照店主定案「硬蕊度＝入耳難度，音量、失真、速度、嘶吼都算門檻」
把龐克／金屬／shoegaze／hardcore 調了 475 張。本輪把**同一套規則延伸到 grunge、一般另類搖滾、emo、post-punk、噪音型 indie rock**。

## 錨點
- **整張以失真吉他、大音量、嘶吼／吼唱為主** → **至少 3**。
  例：Nirvana《Bleach》《Nevermind》、Mudhoney、Soundgarden《Badmotorfinger》《Louder Than Love》、Alice in Chains《Dirt》《Facelift》、
  Hole《Live Through This》、Jesus Lizard、Big Black、Shellac、Fugazi、Unwound、Sunny Day Real Estate《Diary》、Cap'n Jazz、
  Dinosaur Jr.（大音量失真）、Pixies《Surfer Rosa》式、Smashing Pumpkins《Siamese Dream》、Pearl Jam《Vs.》《Ten》（重吉他 grunge）、
  Hüsker Dü、Archers of Loaf、Drive Like Jehu、Les Savy Fav、METZ、Protomartyr 這類噪音／重型 post-punk。
  blink-182《Enema of the State》是 3 的錨點：失真快速、旋律直白的也是 3。
- **極端的**（大部分時間嘶吼、極速、噪音牆、screamo／emoviolence、noise rock 的反結構極端盤）→ **4**；harsh noise 級才 5。
  例：screamo（Orchid、pg.99、Saetia）→ 4；一般 emo／post-hardcore（Sunny Day Real Estate、Mineral、Jawbreaker）→ 3。
- **維持原分（keep）**：乾淨吉他、jangle、新浪潮味、合成器 post-punk、抒情、流行化、不插電、柔和 indie、britpop 主流盤、
  中期流行化（The Cure 流行期、The Smiths、Death Cab for Cutie、Interpol 多數、Coldplay、Radiohead《The Bends》以外的柔和期、
  Weezer《藍》可以 3 但 Weezer 後期流行盤 keep）。只有一兩首吵的 keep。MTV Unplugged／原聲盤 keep。
  emo 標籤下的 midwest emo 若以乾淨分解和弦、抒情為主（American Football、The Promise Ring 後期、Death Cab）→ keep。
- **只往上調到下限，不往下調**；不超過下限加分（一般就給 3）。
- **同藝人要一致**：同一團不同時期可以不同，但理由要寫在 `why`。

## 欄位
- `class` A：帶 alt-rock／emo／indie-rock／post-punk 標籤、硬蕊 ≤2；`tagFloor` 3 只是可能的下限，**你要先判這張是否屬「整張失真大音量」**，大部分不會是。
- `class` D：只帶 art-exp 標籤（噪音搖滾可能落這），判法同上。

## 做法
- 靠你對樂史的知識判斷；拿不準時可 WebSearch 查維基／樂評一兩句（**每片最多 8 次**），不用每張查。不認得、查不到 → keep，`why` 寫「不認得」。
- 輸出：`batch-progress/rerate-20261104-loud-r2/verdicts/sNN.json`，JSON 陣列，**每張都要一筆**（含 keep）：
  `{"key": "<原 key>", "accessibility": <新值>, "keep": <true 表示維持原分>, "rule": "3"|"4"|"5"|null, "why": "<一句中文：整張聲音特徵>"}`
  keep=true 時 accessibility 填原值。
- **每做完 25 筆就把目前結果寫進輸出檔**（整檔覆寫為目前已判的陣列）。
- **輸出檔已有內容就接續**：先讀它，跳過已有 key，只補沒判的，不要重寫。
- 交件前自檢：筆數＝shard 筆數、key 一字不差、新值 ≥ 原值。
- 回報限 4 行：張數、到 3／到 4／keep 各幾張、拿不準的 3 張。
