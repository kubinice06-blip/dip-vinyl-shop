# 「酸冷」重判工單（2026-10-23）

店主裁定：Marion Brown《Geechee Recollections》被判放鬆是錯的——「這種自由爵士類的、或是現代音樂類的（比如 Ligeti）都很酸冷難聽又硬蕊，絕對不會是輕鬆」。

## 新規則（寫進 score500/BRIEF.md）

**酸＝冷＋硬。** 不和諧、無調性、自由即興、噪音質地、刺耳張力的音樂，不管樂器是原聲還是電子、不管混音溫不溫潤，色溫一律冷（z ≤ −1.2）；能量上只要有鼓／律動在推，或音塊密集刺耳有張力（Ligeti《Atmosphères》、Penderecki《Threnody》那種），就算躁（x ≥ 3.1）。
- 自由爵士（Ayler、Cecil Taylor、Brötzmann、Art Ensemble、AACM、loft、歐洲自由即興）、前衛／無調現代音樂（Ligeti、Penderecki、Xenakis、Stockhausen、Boulez、Schoenberg 表現主義期）、noise／harsh noise／power electronics、musique concrète、no wave、嘶吼咆哮的 fire music → **酸**。
- **不是酸**（維持原判）：溫暖的靈性爵士／調式爵士（A Love Supreme、Journey in Satchidananda、Lonnie Liston Smith）、後咆勃、ECM 抒情（Köln Concert、Belonging）、cool jazz、極簡（Reich、Glass、Pärt）、新古典／電影配樂（Richter、Frahm、Jóhannsson）、印象派與浪漫派、融合放克。前衛「標籤」不算，要真的酸。
- 同一張有酸有暖（Pharoah《Karma》、Coltrane《Meditations》）：**酸優先**——店主說「絕對不會是輕鬆」。

## 你要做的

輸入 `sour-rejudge/chunk-NN.json`：每筆是目前落在暖格、或靜格裡帶前衛／自由／噪音／現代古典標籤或評語有酸味的卡，附目前 x／y／z、格、標籤與原評分理由 `why`。憑你對這張唱片的認識判：
- `sour`：true／false（照上面的定義）。
- `drive`：只在 sour 為 true 時填——有鼓或律動在推、或密集刺耳有張力 → true；幾乎無拍、留白、安靜的酸（Marion Brown《Afternoon of a Georgia Faun》、Kurtág 小品、Feldman）→ false。
- `why`：≤30 字講聲音，為什麼酸或不酸。
- `conf`：high／mid／low。不熟的那張照藝人、廠牌與年代的典型推，標 low；**拿不準就 sour:false**，不要為了湊而判酸。

## 輸出

`sour-rejudge/out/chunk-NN.json`，JSON 陣列、筆數與輸入相同、id 照抄：
```json
{"id":"…","sour":true,"drive":true,"why":"…","conf":"high"}
```
- **每做完 10 筆就把目前結果整份寫回輸出檔**；若輸出檔已有部分內容就讀進來接續，不要從頭重寫。
- 輔助腳本放你自己的資料夾 `scratchpad/sour-NN/`。不要做 git 操作。不上網搜尋。
- 完成回報：筆數、sour 幾筆、drive 幾筆、最沒把握的 3 張。
