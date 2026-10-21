# downtempo／chill dub 策展派工（2026-10-11）

店主：「補強 downtempo 類型 很chill的音樂類型 策展」→「太少了 至少找好聽的200張以上 dub的chill也要」。
四組並行，合計約 220 張。每組只負責自己的派系，不要越界提名別組的範圍。

## 共同規則
- **好聽、chill 是核心**：放鬆、適合夜晚／午後播放。避免 big beat、drum & bass、硬派 IDM、噪音、純 drone ambient（卡池 ambient 已 693 張）、舞池 house/techno。
- **只收正規錄音室專輯或公認原創專輯**：不收合輯、精選、DJ mix（DJ-Kicks、fabric 等）、單曲、EP。dub 例外：1970 年代 dub 專輯本來就是 version 盤，算原創專輯；但「Best of」「Anthology」「Collection」類合輯不收。
- **去重**：每張都要跑下面的指令，輸出 0 才可提（藝人名互為子字串也算撞）：
  `node -e 'const s=require("./seed_cards.json");const n=x=>x.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu,"");const [a,b]=process.argv.slice(1);console.log(s.filter(r=>n(r[1])===n(b)&&(n(r[0]).includes(n(a))||n(a).includes(n(r[0])))).length)' "藝人" "專輯"`
- **同一藝人沒有張數上限**（2026-09-04 店主裁定作廢；本行 2026-10-21 更正，原文誤寫「最多 3 張」）。
- **事實一律查證**：年份（原盤首發）、廠牌、MusicBrainz release-group MBID 取自 MusicBrainz API（`https://musicbrainz.org/ws/2/release-group?query=...&fmt=json`，header `User-Agent: dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，**每秒最多 1 次**，503 就等 2 秒重試）。MB 查不到的照收但標 `uncertain`，附 Discogs／維基網址。
- **WebSearch 每組最多 10 次**（整個工作階段共用 200 次額度），多用 MB API 與 WebFetch 維基／AllMusic。
- 名稱：照 MusicBrainz 正規名；連字號用 ASCII `-`（MB 常用 U+2010，**不要照抄**）；希臘字母 μ 用 U+00B5。
- 每張至少 1 個 https 證據網址（MB 頁、維基、AllMusic、Pitchfork、Discogs、廠牌頁）。

## 輸出格式（每組一個檔）
`batch-progress/downtempo-20261011/curation-<組>.json`：
```json
{"group":"a","factions":[{"id":"","zh":"","count":0,"why":""}],
 "albums":[{"artist":"","album":"","year":0,"label":"","faction":"","why":"一句收錄理由（為什麼是代表作／為什麼 chill）","evidence":["https://..."],"mbRgMbid":"","uncertain":""}],
 "notes":[]}
```
**每做完 5 張就把目前結果寫進輸出檔**；若輸出檔已有部分內容就接續補完，不要從頭重寫。
不要 git add／commit，不要改其他任何檔案。完成後回報：派系張數、總張數、疑點。
