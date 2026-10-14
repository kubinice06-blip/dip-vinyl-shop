# 新世代爵士（2010–2026）策展派工（2026-10-11）

店主：「新爵士 2010 年後到 2026 的也很缺……像 Kokoroko 這些也都是新世代的爵士。我指的就是爵士，不是 downtempo。」
四組並行，合計約 200 張。每組只負責自己的地區／場景，不要越界。

## 共同規則
- **原盤首發年必須在 2010–2026**。藝人可以是老將，但收錄重點是新世代場景（2010 年後成名或在新場景中扮演核心角色的人）。
- **是爵士**：新世代爵士的各種形態都算（spiritual jazz 復興、Afrobeat／grime／hip-hop 交融的爵士、beat-jazz、free／avant、post-bop、大樂團、鋼琴三重奏新浪潮），但**不收 downtempo、lounge、純電子、純 R&B／neo-soul**（爵士樂手參與但本質是歌手專輯的慎選）。
- **只收正規錄音室專輯或公認原創專輯**（現場專輯若是該藝人代表作可收）：不收合輯、精選、單曲、EP（除非是該藝人最重要且無對應 LP 的作品，需標註）。
- **去重**：每張都要跑下面的指令，輸出 0 才可提（藝人名互為子字串也算撞）：
  `node -e 'const s=require("./seed_cards.json");const n=x=>x.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu,"");const [a,b]=process.argv.slice(1);console.log(s.filter(r=>n(r[1])===n(b)&&(n(r[0]).includes(n(a))||n(a).includes(n(r[0])))).length)' "藝人" "專輯"`
  同時查該藝人在卡池已有幾張：`node -e 'const s=require("./seed_cards.json");const n=x=>x.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu,"");console.log(s.filter(r=>n(r[0])===n(process.argv[1])).map(r=>r[1]+" "+r[6]))' "藝人"`
- **同一藝人連同卡池既有最多 4 張**；卡池已有 3 張以上的藝人只補真正關鍵的一張。優先補**卡池 0 張的重要藝人**。
- **事實一律查證**：年份、廠牌、MusicBrainz release-group MBID 取自 MB API（`https://musicbrainz.org/ws/2/release-group?query=...&fmt=json`，header `User-Agent: dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，**每秒最多 1 次**，503 等 2 秒重試）。MB 查不到的照收但標 `uncertain`，附 Discogs／Bandcamp／維基網址。
- **WebSearch 每組最多 8 次**（整個工作階段共用額度）。多用 MB API、WebFetch 維基／Bandcamp／廠牌頁（International Anthem、Brownswood、Gondwana、Impulse!、Blue Note、Edition、Jazz re:freshed、Strut 等）。
- 名稱照 MB 正規名；連字號用 ASCII `-`（MB 常用 U+2010，不要照抄）。日本／韓國／台灣藝人用原文名。
- 每張至少 1 個 https 證據網址。

## 輸出格式（每組一個檔）
`batch-progress/newjazz-20261011/curation-<組>.json`：
```json
{"group":"a","factions":[{"id":"","zh":"","count":0,"why":""}],
 "albums":[{"artist":"","album":"","year":0,"label":"","faction":"","why":"一句收錄理由（代表作／場景定位）","evidence":["https://..."],"mbRgMbid":"","poolHas":0,"uncertain":""}],
 "notes":[]}
```
**每做完 5 張就把目前結果寫進輸出檔**；若輸出檔已有部分內容就接續補完，不要從頭重寫。
不要 git add／commit，不要改其他任何檔案。完成後回報：派系張數、總張數、卡池 0 張的新藝人有幾位、疑點。
