# 情緒薄格策展線 策展派工（2026-10-22；擴大版：頹靡 md／冷冽 mc／恍惚 ml 共用）

店主 2026-10-22：「可以開始補缺少的頻率了」→「新增的專輯數太少了 與雀躍嚴重不平衡」：三格**各補到約 2,000**。
計畫 `batch-progress/EXPANSION-PLAN-mood-thin-cells.md`；**場景與條號在 `batch-progress/mood-cells-20261022/SCENES.md`**。
派工訊息會告訴你**組別＝批名**（例 md5、mc3、ml7）：去 SCENES.md 找那一列，那就是你的場景。提名 **54 張**（45＋20% 給主線汰換）；場景挖不到 54 張就照實交（不湊數），在 notes 寫明。
目標格與門檻依線別（下面三節）：**頹靡 md**＝靜＋重＋冷、**冷冽 mc**＝躁＋輕＋冷、**恍惚 ml**＝靜＋重＋暖。

## 共通：照「規則會判進這格的聲音」挑，不照場景名字挑

評分規則在 `batch-progress/mood-axes/score500/BRIEF.md`（X／Y／Z 三節全讀，**以 2026-10-23 店主的「體感標準」為準**：**能量＝體感**——讓神經繃起來的是躁（安靜但緊繃也算），被安撫、被往下拉的是靜，速度只是線索；**色溫＝聲響溫度＋旋律清楚度**——旋律明確好入耳往暖，旋律不明、靠即興／音色／噪音撐往冷；**質地**——尖細高頻輕、厚密低沉重，暖慢的包覆感也算重）。
每張都要填 `moodGuess` 並**留邊距**（各線門檻見下），貼邊的不提——門檻是硬切，貼邊卡評分後一半掉到隔壁格。md1–md4 照這個做法，落格率 91–98%。

## 頹靡 md（靜＋重＋冷）

評分規則在 `batch-progress/mood-axes/score500/BRIEF.md`（先把 X／Y／Z 三節含 2026-10-22 的兩條新規則讀完）。要落頹靡，三軸都得過：

1. **能量要靜（x ≤ 2.7）＝被往下拉、被包住、被催眠**（2026-10-23 體感標準）。很大聲但把人往下壓的是靜：Sunn O)))、Earth 2、Boris《Altar》、Khanate、Low《Double Negative》、Scott Walker《The Drift》都在頹靡；慢的 doom 若是壓人下沉也可收，但嘶吼暴烈、讓人繃緊的落亢奮，不收。**安靜但讓神經緊繃的是躁**（Feldman《Rothko Chapel》、Ligeti、Penderecki、恐怖配樂的驚嚇段多的盤）→ 冷冽或亢奮，不收。
2. **質地要重（y ≥ +0.8）**：低頻厚、失真、殘響長、糊。2026-10-22 新規則：**包覆感也算重**——殘響霧、厚合成器墊、磁帶糊，沒有失真也行。乾淨、有空氣、聲部分明的（純淨極簡古典、乾木吉他 sadcore、ECM 式北歐爵士）會判輕而落**平靜**，不收。
3. **色溫要冷（z ≤ −0.3）**：陰、疏離、金屬、都市夜、沒有人味。溫暖的 dub、靈魂、dream pop 會落**恍惚**（那是 ml 線的事），不收。

**每張都要填 `moodGuess`**：`{"x":2.2,"y":1.4,"z":-1.2,"why":"≤30 字講聲音：有沒有鼓、失真、殘響、低頻、冷暖"}`。照 BRIEF 的尺估、**留邊距**：x ≤ 2.7、y ≥ +0.8、z ≤ −0.3 三條都過才提；貼邊的（x 2.9、y 0.6、z −0.1）不提——門檻是硬切，貼邊卡評分後一半掉到隔壁格。
**反例（別提）**：Talk Talk《Spirit of Eden》、Max Richter、Pärt、Red House Painters《Rollercoaster》、Mono 的乾淨段落多的盤 → 平靜；Whitehouse、Prurient、Pharmakon、暴烈的 doom、Swans《Cop》→ 亢奮；Feldman、Ligeti、Galás → 冷冽／亢奮（安靜但緊繃）；Burial、Portishead、Massive Attack 已在池且本來就落頹靡，不必重提。


## 冷冽 mc（躁＋輕＋冷）

**2026-10-23 起照店主的「體感標準」**（`score500/BRIEF.md` X／Z 軸最新兩段，取代下面舊版的「要快、要有機械脈動」）。
門檻（留邊距）：**x ≥ 3.3、y ≤ +0.2、z ≤ −0.3**。
1. **能量要躁＝讓神經繃起來**：緊張、不安、刺激、坐不住、被推著走。**安靜但讓人緊繃的也是躁**（Feldman《Rothko Chapel》、Ligeti《Atmosphères》、Penderecki、Kancheli 都在冷冽）。速度只是線索；把人往下壓、催眠的（drone、Sunn O)))、slowcore）是靜，不收。
2. **質地要輕＝尖、細、高頻、薄、乾**。厚、密、低沉、失真牆的落亢奮（大編制 fire music、厚重 techno、噪音牆、EBM 重的那半），不收。
3. **色溫要冷＝旋律不明、靠即興／音色／噪音撐、無調、硬蕊**，不管樂器多溫潤、多「靈性」（Pharoah《Karma》、A Love Supreme 也算冷）。**旋律清楚、唱得出來、好入耳的往暖**——所以 synth-pop、new wave 金曲、旋律明確的 techno-pop、主流硬咆勃／靈魂爵士／風琴 groove 都會落雀躍，不收。
**最適合的場景**（第 4 輪起主力）：自由爵士小編制、AACM／loft jazz、歐陸自由即興、無調現代古典／序列主義／新複雜主義、glitch／microsound、日本前衛即興、RIO／前衛搖滾的尖細那半、現代前衛爵士（Tim Berne、Steve Lehman、Mary Halvorson 一路）。
**反例（別提）**：Sunn O)))、Earth 2、Boris《Altar》、Khanate、Scott Walker《The Drift》→ 頹靡（壓人下沉＝靜）；Brötzmann《Machine Gun》、Merzbow、Pan Sonic 重盤、大編制 fire music → 亢奮（厚＝重）；Jimmy Smith、Lee Morgan《The Sidewinder》、OMD 金曲、YMO 旋律盤 → 雀躍（旋律清楚＝暖）；Köln Concert → 雀躍。
`genres` 第一個照場景：爵士 `jazz`；現代古典 `classical`；glitch／實驗電子 `electronic`；RIO／前衛搖滾 `rock`。

## 恍惚 ml（靜＋重＋暖）

門檻（留邊距）：**x ≤ 2.7、y ≥ +0.8、z ≥ +0.3**。
1. **能量要靜**：慢、鬆、拍子懶。快的 neo-soul、disco、boom bap 快歌落雀躍或沸騰，不收。
2. **質地要重**：低頻厚、殘響霧、dusty 取樣、磁帶糊；**2026-10-22 新規則：暖慢的包覆感算重**——dream pop／shoegaze 殘響霧、chorus 夢幻吉他＋合成器墊的軟搖滾與 city pop 慢歌、慢板靈魂的厚低頻＋弦樂墊、chillwave 糊濾波，沒有失真也算。**乾淨、有空氣、聲部分明的（bossa、原聲民謠、Motown 快歌、明亮 city pop、乾淨的 bedroom pop）落放鬆，不收**。
3. **色溫要暖**：有人味、溫熱、擁抱、陽光、煙霧繚繞的暖。冷的 dream pop／slowcore 落頹靡（md 線的事），不收。
**先例（落恍惚）**：落日飛車、Marvin Gaye《Let's Get It On》《I Want You》、Al Green Hi 時期、Sade、D'Angelo、Maxwell《Urban Hang Suite》、Slowdive《Pygmalion》、Beach House、Men I Trust《Oncle Jazz》、Nujabes、J Dilla《Donuts》、roots dub。**反例**：Bill Withers、Roberta Flack、Lamp、Motown 快歌、山下達郎《For You》→ 放鬆（判輕）；Tame Impala《Currents》→ 沸騰（判躁）。
`genres` 第一個照場景：soul／R&B `soul`；嘻哈 `hiphop`；dream pop／shoegaze／迷幻 `rock`；reggae／dub `world`；downtempo／chillwave／ambient `electronic`；city pop `pop`。

## 共同規則（機制照薄細項線，重點複述）
- **只收正規專輯**：不收單曲、EP、精選、現場；噪音／drone 圈常見的限量卡帶與 CDr 若是正規全長作品可收（Discogs 有條目、有封面）。
- **去重**：每張都要跑，輸出 0 才可提（藝人名互為子字串也算撞）：
  `node -e 'const s=require("./seed_cards.json");const n=x=>x.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu,"");const [a,b]=process.argv.slice(1);console.log(s.filter(r=>n(r[1])===n(b)&&(n(r[0]).includes(n(a))||n(a).includes(n(r[0]))).length)' "藝人" "專輯"`
  先看該藝人在池中已有幾張：`node -e 'const s=require("./seed_cards.json");const a=process.argv[1].toLowerCase();console.log(s.filter(r=>r[0].toLowerCase()===a).map(r=>r[1]))' "藝人"`
- **同一藝人沒有張數上限**（2026-09-04 店主裁定）。判準只有「這張夠不夠格、落不落格、池中有沒有」。
- **身分兩條路，二選一**：
  1. **MB 釘得住**：`https://musicbrainz.org/ws/2/release-group?query=artist:"…" AND releasegroup:"…"&fmt=json`（header `User-Agent: dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，每秒最多 1 次，503 等 2 秒重試），取 `primary-type=Album`，填 `mbRgMbid`。
  2. **MB 查無 → 人工身分**（ALBUM_ONBOARDING §1）：`mbRgMbid` 留空，另填 `mbAbsenceProof: {queries:[藝人方向, 作品方向], checkedAt:"2026-10-22", conclusion:"…"}` 與 `manualEvidenceUrls: [至少兩個 https：Discogs master／release、廠牌頁、Bandcamp、維基]`。
- **每張都要找得到封面來源**（CAA、Apple Music／iTunes、Discogs 圖、Bandcamp 任一，網址寫進 `evidence`）；找不到封面的不要提。
- **名稱**照 MB 正規名（連字號用 ASCII `-`）；**年份**＝原盤首發年。
- **曲風** `genres`：第一個照場景——ambient／drone／工業／dub techno／電子類 `electronic`；slowcore／goth／darkwave／post-rock／drone metal `rock`；dark jazz `jazz`；嘻哈 `hiphop`；暗 R&B `soul`。第二個可選。主類型必須是類型樹第一層的大類。
- **WebSearch 每組最多 6 次**。多用 MB API、Discogs API（`https://api.discogs.com/…`，UA 同上）、Bandcamp 頁、WebFetch 維基（`index.php?action=raw`）、iTunes Search API。
- 每張至少 2 個 https 證據網址；`why` 一句寫「為什麼是這個場景的代表作＋聲音為什麼會落頹靡」。

## 分組
場景、條號、狀態都在 `SCENES.md`（每一列一組，組別＝批名）。md1–md4 已上線；同一位藝人若跨組，以 SCENES.md 裡先出現的批為準，提名前先 `grep` 一下其他組的 `curation-*.json` 有沒有提過。

## 輸出格式（每組一個檔）
`batch-progress/mood-cells-20261022/curation-<組>.json`：
```json
{"group":"md5","factions":[{"id":"dark-ambient","zh":"暗黑 ambient","count":0,"why":""}],
 "albums":[{"artist":"","album":"","year":0,"label":"","country":"","faction":"dark-ambient","genres":["electronic"],
   "why":"一句：場景代表作＋聲音為什麼落頹靡","moodGuess":{"x":1.8,"y":1.5,"z":-1.4,"why":"無鼓，低頻轟鳴與顆粒，陰"},
   "evidence":["https://...","https://..."],
   "mbRgMbid":"","mbAbsenceProof":null,"manualEvidenceUrls":[],"releaseException":"","queryAlias":"","uncertain":""}],
 "notes":[]}
```
`country` 填 ISO 兩碼小寫或留空。
**每做完 5 張就把目前結果寫進輸出檔**；若輸出檔已有部分內容就接續補完，不要從頭重寫。輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/cur-<組>/`，不要放 scratchpad 根目錄。
不要 git add／commit，不要改其他任何檔案。完成後回報：張數、各 faction 張數、MB 釘住／人工身分各幾張、moodGuess 三軸的分布（最小／最大）、疑點。
