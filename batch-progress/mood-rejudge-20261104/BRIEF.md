# mood-rejudge-20261104 判定工單

店主 2026-11-04：「卡池分配頹靡跟恍惚還是太少了，多一點電子類的，嘻哈跟雷鬼太多了。」
這批只做**既有卡的座標重判**，不上架新卡。

## 先讀

`/home/user/dip-vinyl-shop/batch-progress/mood-axes/score500/BRIEF.md` 的 X／Y／Z 三節全讀（含 104 張校正表），
**以 2026-10-23 店主「體感標準」為準**：

- **能量 x（1–5）＝體感**：躁＝神經被挑起來、被推著走、身體想動；靜＝被安撫、被往下拉、被催眠、被包住。速度只是線索。
- **質地 y（−2～+2）**：尖細乾淨有空氣＝輕；厚密低沉、失真、殘響霧、dusty、磁帶糊＝重；**暖慢的包覆感也算重**。
- **色溫 z（−2～+2）＝聲響溫度＋旋律清楚度**：有人味、溫熱、旋律明確好入耳往暖；疏離、金屬、旋律不明、靠音色／律動撐往冷。

八格門檻（硬切）：x ≥ 3.0 躁、y ≥ 0.5 重、z ≥ 0 暖。
放鬆 calm＝靜輕暖、平靜 still＝靜輕冷、恍惚 languid＝靜重暖、頹靡 decay＝靜重冷、
雀躍 lift＝躁輕暖、冷冽 crisp＝躁輕冷、沸騰 boil＝躁重暖、暴躁 charge＝躁重冷。

## 兩種卡單

### A 片（`chunks/A*.json`）：目前在恍惚／頹靡的嘻哈、雷鬼
逐張嚴格看是不是真的「**靜（被安撫、往下拉）＋重**」。
- **該移出**（多半落雀躍、沸騰或放鬆）：boom bap 有鼓推進、頭會跟著點的；conscious／south／west coast／g-funk 這類拍子有勁、饒舌密集往前衝的；
  輕快 roots reggae（skank 吉他亮、旋律明朗）、rocksteady、lovers rock 輕快的、dancehall、ragga；pop-rap；trap／drill 帶攻擊性的（→ 暴躁或沸騰）。
  輕快 roots reggae 若製作乾淨、低頻不糊 → y 可能 < 0.5（放鬆或雀躍）。
- **該留下**：真的慵懶厚霧的——J Dilla《Donuts》、Nujabes、Madlib 煙霧系、lo-fi／jazzy 慢 beat、cloud rap、慢 dub（King Tubby、Scientist、Lee Perry 黑方舟糊音、Augustus Pablo 那種）、
  厚重低頻的慢 roots（Burning Spear 沉重那幾張、Congos）、abstract／dark hip-hop 慢而壓人的（頹靡）。
- 有疑慮、不熟這張（conf low）→ **留原座標**，不要猜著移。

### B 片（`chunks/B*.json`）：鄰格裡 genres 第一個是 electronic、貼近恍惚／頹靡邊界的
逐張看能不能進恍惚（暖）或頹靡（冷）：**厚墊、低頻、殘響霧、被催眠的** downtempo、ambient（有厚度那種）、dub techno、trip-hop、
IDM 慢而糊的、chillout、dub、glitch 糊的、dark ambient 有低頻的、chillwave 糊濾波 → 往靜＋重。
- 能落進去才移；**判不進就留原座標**，不准為了湊數硬拉。
- 四到四拍推著走的 techno／house、big beat、synth-pop、亮晶晶的 electronica、乾淨薄的 ambient（被你判輕的）→ 留原格。
- 這片也可以反方向修正（例如原本在冷冽，其實更像平靜），但**只有在你很有把握時**；主要任務是找漏判的靜＋重。

## 輸出

`out/<片名>.json`（例 `out/A1.json`），**JSON 陣列，輸入每一筆都要有一筆輸出**（含不動的）：

```json
{"id":"照抄","x":2.4,"y":1.1,"z":0.6,"cell":"languid","move":true,"conf":"high","why":"≤40 字，講聲音"}
```

- `move:false` 時 x／y／z 照抄輸入、`why` 一句說為什麼留（可很短）。
- `move:true` 時給新的三軸（一位小數），`cell` 必須等於新座標依上面門檻算出的格，且**與原格不同**；只微調不換格的不要標 move。
- 座標要合 BRIEF 的尺：新座標**留邊距**，不要剛好壓在門檻上（例：移進恍惚就 x ≤ 2.8、y ≥ 0.7、z ≥ 0.2）。
- `conf`：high（聽過有把握）／mid（熟風格不熟這張）／low（猜）。**low 一律 move:false**。
- `why` 台灣繁體中文，講聲音（速度、鼓、低頻、殘響、音色、旋律），不講地位與歌詞。
- 只憑你對聲音的知識，**不要上網搜尋**。`prevWhy` 是前幾輪重判的理由，可參考，不必照抄。

## 續跑

- **每做完 30 筆就把目前結果整份寫回輸出檔**（容器會不定時重啟）。
- **若輸出檔已有部分內容，讀進來、跳過已有的 id 接著做，不要從頭重寫。**
- 完成時輸出檔筆數要與輸入相同、id 一一對應。
- 不要 git add／commit，不要改其他任何檔案。輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/e327285a-72ec-5cae-9edb-8d4d4143b607/scratchpad/rj-<片名>/`。
- 完成回報：筆數、move 張數、移到各格的張數、你最沒把握的 3 張。
