# 情緒薄格策展線 策展派工（2026-10-22；擴大版：頹靡 md／冷冽 mc／恍惚 ml 共用）

店主 2026-10-22：「可以開始補缺少的頻率了」→「新增的專輯數太少了 與雀躍嚴重不平衡」：三格**各補到約 2,000**。
計畫 `batch-progress/EXPANSION-PLAN-mood-thin-cells.md`；**場景與條號在 `batch-progress/mood-cells-20261022/SCENES.md`**。
派工訊息會告訴你**組別＝批名**（例 md5、mc3、ml7）：去 SCENES.md 找那一列，那就是你的場景。提名 **54 張**（45＋20% 給主線汰換）；場景挖不到 54 張就照實交（不湊數），在 notes 寫明。
目標格與門檻依線別（下面三節）：**頹靡 md**＝靜＋重＋冷、**冷冽 mc**＝躁＋輕＋冷、**恍惚 ml**＝靜＋重＋暖。

## 共通：照「規則會判進這格的聲音」挑，不照場景名字挑

評分規則在 `batch-progress/mood-axes/score500/BRIEF.md`（先把 X／Y／Z 三節含 2026-10-22 的兩條新規則讀完：**能量＝兇不兇優先**——攻擊性＋有鼓在推才算躁，再慢也躁；沒攻擊性的快歌照速度判；**質地＝暖慢的包覆感算重**）。
每張都要填 `moodGuess` 並**留邊距**（各線門檻見下），貼邊的不提——門檻是硬切，貼邊卡評分後一半掉到隔壁格。md1–md4 照這個做法，落格率 91–98%。

## 頹靡 md（靜＋重＋冷）

評分規則在 `batch-progress/mood-axes/score500/BRIEF.md`（先把 X／Y／Z 三節含 2026-10-22 的兩條新規則讀完）。要落頹靡，三軸都得過：

1. **能量要靜（x ≤ 2.7）**。2026-10-22 能量軸改「兇不兇優先於快不快」：**攻擊性（失真牆／嘶吼／音壓）＋有鼓在推 → 躁**，再慢也躁。所以 **有鼓的 doom／sludge／黑金屬一律不收**（Windhand、Bell Witch、YOB、Pallbearer、Thou、Electric Wizard 全判躁，落亢奮）。收得進來的是：**沒有鼓或鼓極稀**的 drone metal（Sunn O)))、Earth《Earth 2》、Khanate 是先例，店主已裁定 Sunn O))) 算頹靡）、暗黑 ambient、drone、工業 drone、慢而不兇的 slowcore／dark jazz／dub techno／cloud rap。
2. **質地要重（y ≥ +0.8）**：低頻厚、失真、殘響長、糊。2026-10-22 新規則：**包覆感也算重**——殘響霧、厚合成器墊、磁帶糊，沒有失真也行。乾淨、有空氣、聲部分明的（純淨極簡古典、乾木吉他 sadcore、ECM 式北歐爵士）會判輕而落**平靜**，不收。
3. **色溫要冷（z ≤ −0.3）**：陰、疏離、金屬、都市夜、沒有人味。溫暖的 dub、靈魂、dream pop 會落**恍惚**（那是 ml 線的事），不收。

**每張都要填 `moodGuess`**：`{"x":2.2,"y":1.4,"z":-1.2,"why":"≤30 字講聲音：有沒有鼓、失真、殘響、低頻、冷暖"}`。照 BRIEF 的尺估、**留邊距**：x ≤ 2.7、y ≥ +0.8、z ≤ −0.3 三條都過才提；貼邊的（x 2.9、y 0.6、z −0.1）不提——門檻是硬切，貼邊卡評分後一半掉到隔壁格。
**反例（別提）**：Talk Talk《Spirit of Eden》、Max Richter、Pärt、Feldman、Red House Painters《Rollercoaster》、Mono 的乾淨段落多的盤 → 平靜；Whitehouse、Prurient、Pharmakon、有鼓的 doom、Swans《Cop》→ 亢奮；Burial、Portishead、Massive Attack 已在池且本來就落頹靡，不必重提。


## 冷冽 mc（躁＋輕＋冷）

門檻（留邊距）：**x ≥ 3.3、y ≤ +0.2、z ≤ −0.3**。
1. **能量要躁**：快、密、想動。沒有攻擊性的快歌照速度判（Kraftwerk、YMO、bebop 快板、techno 都算）。
2. **質地要輕**：製作乾淨、薄、乾、聲部清楚、低頻不淹。**厚重的 techno、失真牆、厚殘響的 post-punk 牆（Interpol 那種）會判重落亢奮，不收**；techstep、darksynth、EBM 重的那半也是。
3. **色溫要冷**：機械、金屬、都市夜、疏離、沒有人味。**溫暖律動（funk、disco、多數 swing／hard bop 的暖、bossa、math rock 的明亮）落雀躍，不收**——爵士與 math rock 最容易判暖，只收真的冷的（Tristano 派、前衛 Blue Note、Dolphy、Hill、歐陸自由即興的乾硬那半）。
**反例（別提）**：Plastikman、Surgeon、Underground Resistance 重盤、Pan Sonic、Cabaret Voltaire 重盤、Interpol、Squarepusher、LFO → 亢奮（判重）；toe、大象體操、Steve Reich 暖盤、Chic、山下達郎 → 雀躍（判暖）；Neu! 慢段、Jimmy Giuffre 3、e.s.t.、Dry Cleaning → 平靜（判靜）。
`genres` 第一個照場景：synth／techno／electro `electronic`；post-punk／new wave／math rock `rock`；爵士 `jazz`；當代古典 `classical`；synth-pop `pop` 或 `electronic`。

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
