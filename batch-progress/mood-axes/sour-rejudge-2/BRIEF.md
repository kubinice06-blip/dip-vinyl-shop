# 「酸冷」重判第二輪工單（2026-10-23）

第一輪（`../sour-rejudge/`）只抓了窄標籤，漏了很多。店主：「增加的太少了吧？是不是有漏，有些自由爵士或實驗音樂可能整首歌沒什麼聲音，但就是有寒氣，可能也被判為節奏慢的輕鬆」「Scott Walker 的 The Drift 歸類在哪？我覺得很有可能歸錯」。

**先完整讀第一輪的工單 `batch-progress/mood-axes/sour-rejudge/BRIEF.md`**，規則照用，下面是這輪補充的三點。

## 補充規則

1. **「寒氣」也是酸。** 不一定要吵。整張很安靜、留白很多、但聽起來陰森、駭人、不安、冰冷、無調、疏離的（Morton Feldman、Kurtág、Bill Dixon 晚期、Scott Walker 後期、Talk Talk《Laughing Stock》的陰冷段落、Bohren 那種只有陰森沒有暖意的）→ `sour:true`。這種最容易被當成「慢＝放鬆」，這輪就是要抓它們。
2. **驟然爆裂、極端張力 → `drive:true`**，即使大部分時間很安靜：Scott Walker《Tilt》《The Drift》《Bish Bosch》（長段留白後突然重擊、弦樂音塊、駭人人聲）都算。真正從頭到尾安靜、沒有爆發的（Feldman、Kurtág 小品）才是 `drive:false`。
3. **不是酸**（這輪候選裡會有很多，照樣 `false`）：只是「憂鬱」「慢」「冷色調」但和聲調性、聽起來舒服的——新古典鋼琴（Einaudi、Ólafur Arnalds）、浪漫派與印象派、dub／dub techno、trip-hop、ambient／new age、post-rock、IDM、溫暖的 krautrock 律動、ECM 抒情、synth-pop。標籤寫 experimental 不代表酸，**要真的有寒氣或刺耳**。

## 輸入與輸出

輸入 `sour-rejudge-2/chunk-NN.json`（每份約 300 張），每筆附 x／y／z、目前的格、標籤、原評分理由 `why`。
輸出 `sour-rejudge-2/out/chunk-NN.json`，JSON 陣列、筆數與輸入相同、id 照抄：
```json
{"id":"…","sour":true,"drive":false,"why":"≤30 字講聲音","conf":"high"}
```
- 不熟的照藝人、廠牌、年代典型推，標 low；**拿不準就 `sour:false`**。
- **每做完 10 筆就把目前結果整份寫回輸出檔**；若輸出檔已有部分內容就讀進來接續，不要從頭重寫。
- 輔助腳本放 `/tmp/claude-0/-home-user/f1503c39-7ef0-590a-82ba-a39436835848/scratchpad/sour2-NN/`。不要做 git 操作、不要改其他檔案、不上網。
- 完成回報：筆數、sour 幾筆、drive 幾筆、最沒把握的 3 張。


> **2026-10-23 更正**：上面第 2 點「驟然爆裂、極端張力 → drive」是錯的，店主：「The Drift 頹靡沒錯欸」。推力只看有沒有鼓／節拍在推（10-22 能量標準）。合併後已撤回 94 張只因爆裂、音塊、drone 就推到躁的卡（`drive-revert.json`），寒氣（冷色溫）保留。
