# 情緒薄格策展線・頹靡線 md1–md4 策展派工（2026-10-22）

店主 2026-10-22：「可以開始補缺少的頻率了 再策一次計畫」。計畫 `batch-progress/EXPANSION-PLAN-mood-thin-cells.md`（10-22 v2 定案）。
目標格：**頹靡＝靜（能量 <3.0）＋重（質地 ≥+0.5）＋冷（色溫 <0）**。目前 952 張，是八格裡第三薄；雀躍 5,962。
每組負責一個場景、提名 **54 張**（45＋20% 給主線汰換），只在自己的範圍內提名。

## 這條線跟地區線不一樣的地方：照「規則會判進這格的聲音」挑，不照場景名字挑

評分規則在 `batch-progress/mood-axes/score500/BRIEF.md`（先把 X／Y／Z 三節含 2026-10-22 的兩條新規則讀完）。要落頹靡，三軸都得過：

1. **能量要靜（x ≤ 2.7）**。2026-10-22 能量軸改「兇不兇優先於快不快」：**攻擊性（失真牆／嘶吼／音壓）＋有鼓在推 → 躁**，再慢也躁。所以 **有鼓的 doom／sludge／黑金屬一律不收**（Windhand、Bell Witch、YOB、Pallbearer、Thou、Electric Wizard 全判躁，落亢奮）。收得進來的是：**沒有鼓或鼓極稀**的 drone metal（Sunn O)))、Earth《Earth 2》、Khanate 是先例，店主已裁定 Sunn O))) 算頹靡）、暗黑 ambient、drone、工業 drone、慢而不兇的 slowcore／dark jazz／dub techno／cloud rap。
2. **質地要重（y ≥ +0.8）**：低頻厚、失真、殘響長、糊。2026-10-22 新規則：**包覆感也算重**——殘響霧、厚合成器墊、磁帶糊，沒有失真也行。乾淨、有空氣、聲部分明的（純淨極簡古典、乾木吉他 sadcore、ECM 式北歐爵士）會判輕而落**平靜**，不收。
3. **色溫要冷（z ≤ −0.3）**：陰、疏離、金屬、都市夜、沒有人味。溫暖的 dub、靈魂、dream pop 會落**恍惚**（那是 ml 線的事），不收。

**每張都要填 `moodGuess`**：`{"x":2.2,"y":1.4,"z":-1.2,"why":"≤30 字講聲音：有沒有鼓、失真、殘響、低頻、冷暖"}`。照 BRIEF 的尺估、**留邊距**：x ≤ 2.7、y ≥ +0.8、z ≤ −0.3 三條都過才提；貼邊的（x 2.9、y 0.6、z −0.1）不提——門檻是硬切，貼邊卡評分後一半掉到隔壁格。
**反例（別提）**：Talk Talk《Spirit of Eden》、Max Richter、Pärt、Feldman、Red House Painters《Rollercoaster》、Mono 的乾淨段落多的盤 → 平靜；Whitehouse、Prurient、Pharmakon、有鼓的 doom、Swans《Cop》→ 亢奮；Burial、Portishead、Massive Attack 已在池且本來就落頹靡，不必重提。

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
| 組 | 場景 | 池中已有（不要重提） | 候選方向（是方向不是名單，逐一核對在不在池、是不是同一人） |
|---|---|---|---|
| md1 | **dark ambient／isolationist／drone／工業 drone**（要有低頻與顆粒；純淨極簡古典落平靜） | Tim Hecker、Fennesz、Ben Frost 1、Haxan Cloak 1、Lustmord？（查）、Zoviet France 2、Hafler Trio 1、Roly Porter 1、Labradford 1、Windy & Carl 1、Eluvium 1、Coil、Nurse With Wound、Throbbing Gristle 3 | Lustmord、Deathprod、Thomas Köner、Raison d'être、Lull、Final、Kreng、Svarte Greiner、Deaf Center、Emptyset、Demdike Stare、Vatican Shadow、Puce Mary、Pan Daijing、Loscil、Pan American、Rafael Anton Irisarri、Bersarin Quartett、Abul Mogard、Kali Malone、Sarah Davachi、Lawrence English、Alessandro Cortini、Andy Stott 慢盤、The Caretaker《Everywhere at the End of Time》各階段、William Basinski 其他、Stars of the Lid 其他、Troum、Maeror Tri、Aidan Baker、Nadja（無鼓那幾張）、Celer、Yellow Swans |
| md2 | **slowcore／sadcore 二線＋dark jazz／doom jazz**（挑低頻厚、殘響長、慢的；乾木吉他那種落平靜） | Low 3、Red House Painters 2、Codeine？、Bedhead 1、Movietone 1、Flying Saucer Attack 1、Third Eye Foundation 1、Piano Magic 1、Mount Eerie 1、Duster？（查）、Carissa's Wierd？ | Idaho、Arab Strap、Tindersticks（慢而暗的那幾張）、Spain、Songs: Ohia／Magnolia Electric Co.、Lisa Germano、Mojave 3、Acetone、The New Year、Crescent、Early Day Miners、Karate、Nina Nastasia、Have a Nice Life、Giles Corey、Planning for Burial、Grouper（池中查）、Julee Cruise、Codeine、Duster、Hood、The For Carnation、Rex、Ida；dark jazz：Bohren & der Club of Gore、The Kilimanjaro Darkjazz Ensemble、Dale Cooper Quartet、The Mount Fuji Doomjazz Corporation、Angelo Badalamenti《Twin Peaks》原聲（若池中無）、Barry Adamson 暗盤 |
| md3 | **darkwave／goth／ethereal 的慢盤＋無鼓的 drone metal／funeral doom**（#114 後：有鼓又兇的 doom 不收；會跳舞的 EBM、快的 post-punk 落亢奮／冷冽，不收） | Sunn O))) 3、Earth 2、Khanate 2、Boris《Altar》、Cocteau Twins（已在池多張）、Dead Can Dance？、This Mortal Coil 2、Sisters of Mercy 2、Chameleons 1、Christian Death 1、Fields of the Nephilim 1、The Mission 1、Cult of Luna 2（判躁） | goth／darkwave 慢盤：Clan of Xymox、Xmal Deutschland、Sad Lovers & Giants、And Also the Trees、Red Lorry Yellow Lorry（慢盤）、Virgin Prunes、The Danse Society、Cindytalk、In the Nursery、Kirlian Camera、Lycia、Black Tape for a Blue Girl、Love Spirals Downwards、Lebanon Hanover、She Past Away、Molchat Doma、Drab Majesty、Cold Cave 慢盤、The Soft Moon 慢盤、Zola Jesus、Chelsea Wolfe《Pain Is Beauty》《Abyss》（慢而霧的；《Hiss Spun》有鼓偏躁）、Emma Ruth Rundle、King Dude、Dead Can Dance 早期、Lisa Gerrard；無鼓 drone／funeral doom：Sunn O))) 其他、Earth《Hex》《The Bees Made Honey…》、Boris《Flood》、Nadja、Corrupted（慢段為主的）、Skepticism、Thergothon、Esoteric 慢盤、Ahab、Bell Witch 只在幾乎無鼓的《Mirror Reaper》可提並標 uncertain、Om（判靜先例）、Jesu 的 ambient 盤、Final、Monarch |
| md4 | **暗色嘻哈／cloud rap／暗 R&B＋dub techno 二線＋亞洲頹靡** | Burial、Portishead、Tricky、Massive Attack、Armand Hammer 6、Ka 6、Deepchord 5、Pole、Gas、Andy Stott、Dälek（判躁）、King Krule？、Dean Blunt 1、甜梅號 4、落差草原 2、雷光夏 2、瓢蟲 1、達明一派 3、my little airport 2、Parannoul 3、Jambinai 1、Silica Gel 1、冥丁 1 | 嘻哈冷而重：Mach-Hommy、Navy Blue、Earl Sweatshirt《Some Rap Songs》《Feet of Clay》、billy woods、Elucid、MIKE 冷盤、Yves Tumor 早期、clipping. 慢盤、Lil Ugly Mane、Bones、$uicideboy$ 已在池查、Spaceghostpurrp、Clams Casino《Instrumentals》、Shlohmo、Salem；暗 R&B：Tirzah、Klein、Space Afrika、Mica Levi、Dean Blunt 其他、The Weeknd《Trilogy》《Kiss Land》、dvsn、PARTYNEXTDOOR、Sampha 冷盤、James Blake 首張；dub techno：Rod Modell／Deepchord 其他、Echospace、Fluxion、Vladislav Delay、Monolake、Porter Ricks、Basic Channel／Maurizio（查）、Rhythm & Sound（溫→不收）、cv313、Intrusion、Yagya、Loscil（與 md1 分配）；亞洲：Mong Tong、王榆鈞、きのこ帝国、downy、Boris 以外的日本 drone、Asian Glow、Brokenteeth、쏜애플、Sogumm、OOHYO 冷盤、草東沒有派對（查，可能判躁）、Sheena Ringo 不收 |

分配：同一位藝人若跨組（Nadja、Loscil、Final）歸表中第一次出現的組。

## 輸出格式（每組一個檔）
`batch-progress/mood-cells-20261022/curation-<組>.json`：
```json
{"group":"md1","factions":[{"id":"dark-ambient","zh":"暗黑 ambient","count":0,"why":""}],
 "albums":[{"artist":"","album":"","year":0,"label":"","country":"","faction":"dark-ambient","genres":["electronic"],
   "why":"一句：場景代表作＋聲音為什麼落頹靡","moodGuess":{"x":1.8,"y":1.5,"z":-1.4,"why":"無鼓，低頻轟鳴與顆粒，陰"},
   "evidence":["https://...","https://..."],
   "mbRgMbid":"","mbAbsenceProof":null,"manualEvidenceUrls":[],"releaseException":"","queryAlias":"","uncertain":""}],
 "notes":[]}
```
`country` 填 ISO 兩碼小寫或留空。
**每做完 5 張就把目前結果寫進輸出檔**；若輸出檔已有部分內容就接續補完，不要從頭重寫。輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/md-<組>/`，不要放 scratchpad 根目錄。
不要 git add／commit，不要改其他任何檔案。完成後回報：張數、各 faction 張數、MB 釘住／人工身分各幾張、moodGuess 三軸的分布（最小／最大）、疑點。
