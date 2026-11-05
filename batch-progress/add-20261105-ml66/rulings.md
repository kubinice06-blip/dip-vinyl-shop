# add-20261105-ml66 裁定（情緒薄格策展線・恍惚 Bandcamp 爬梳 A：Best Ambient／Best Electronic 暖厚慢的那半）

> 店主 2026-11-05「恍惚跟頹靡可以去 Bandcamp 爬梳」；不收嘻哈、雷鬼、dub。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml66 列）；策展補充規則 `CUR-DISPATCH-bandcamp.md`（每張至少一篇 Bandcamp Daily 專文／榜單）。評分照 10-23 店主「體感標準」。
> 策展：`curation-ml66a.json`（24，Best Ambient 99 期）＋`curation-ml66b.json`（23，Best Electronic 97 期＋年度榜）→ `build-master.mjs ml66a ml66b` → `master-ml66aml66b.json`（46）；主線汰 16 → `pick.json`（30）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261105-ml66-cards.json`（30 張；研究 a–e 各 6）。
> **預留：研究 a 23321–23330、b 23331–23340、c 23341–23350、d 23351–23360、e 23361–23370、鉤子 23371–23380、寫作 23381–23390、主線 23391–23400。**（條號避開並行的 md37／md38＝23161–23320。）
---

## 主線策展（不佔條號）
- master 覆寫：Michael Claus《Lavender Palace》MB 無 primary type、Bandcamp 標 house → 刪；patten《GLOW》MB 查得到（92fe4e53…，盤名正規為《Glow》）→ 改釘 MB。
- **主線汰 16**（色溫／質地／能量貼邊，或場景不合）：
  - 色溫偏冷風險（純質感、無調、陰）：Chantal Michelle《All Things Might Spill》（Shelter Press）、Roméo Poirier《Living Room》（field recording 拼貼）、Ian William Craig《Red Sun Through Smoke》（池中同人 z 0）、Early Fern、Elori Saxl、Metra Vestlud（nature sounds）、Sunken Foal（Daily 稱 gothic）、Maria BC（朦朧憂鬱）、U-I（glitch）、Object Agency（31 分、抽象）。
  - 質地判輕風險（原聲獨奏、空氣感）：Mary Lattimore《Goodbye, Hotel Arkada》（豎琴）、Kalia Vandever（長號）。
  - 能量（四拍／碎拍／techno 段）：Talaboman、Piu、Tudor Acid、Nourished By Time（new jack 拍）。
- 交研究層把關：Rachika Nayar《Heaven Come Crashing》（x）、Kaitlyn Aurelia Smith（Buchla 晶亮、y）、Kaela／Midori Hirano／sachi's mirror／Los Sara Fontan（乾淨處判輕）、Photay（節拍推進）、Sui Zhen（z）、Carmen Villain（z）。
- 池中同人錨點：只有 Hammock（四張 z 0–0.4）、Benoît Pioulard（1.3,1,0.3）；其餘 28 張無錨點——這是本批最大風險，落格率以評分為準。

## 研究 b 組（條號 23331–23340）
- 23331：Croatian Amor 以 Bandcamp Daily 與 XLR8R 為準，Daily 明說有 garage grooves 的節拍，moodGuess（無鼓、慢）存疑，x 恐偏高；留卡，交主線以評分決定。
- 23332：Jonny Nash 卡單廠牌 PLANCHA 查無來源，Bandcamp 與 Daily 皆指 Melody As Truth；facts 只寫有來源的廠牌，建議主線改 label 欄。
- 23333：Steve Hauschildt《Nonlin》四個來源都指有 beat／glitch／techno 段，色溫偏冷疏離；moodGuess（慢、暖）明顯不符，建議主線汰換或降級。country=ge 疑為第比利斯錄音地誤判，藝人為芝加哥人，建議改 us。
- 23334：Benoît Pioulard 與 Dream Crease、Sofie Birch：色溫分歧處（Daily 說 cold／cool、廠方說 warm）一律寫成各來源原話並歸因，notes 標存疑，不替它裁決。Dream Crease 無來源提到節拍，判無鼓。
- 23335：Dream Crease、Jonny Nash、Pioulard 的第二來源用 Daily＋藝人 Bandcamp 頁（兩個不同 https 頁面）；獨立樂評額度（WebSearch 3 次）已用於 Croatian Amor、Hauschildt、Birch。

## 研究 c 組（條號 23341–23350）
- 23341：Dylan Henner 卡單寫紐約／us，Bandcamp 廠牌文案與 BC Daily 皆稱英國人，建議 country 改 gb；其餘（Phantom Limb、2025）對。
- 23342：patten《Glow》卡單廠牌 Warp 錯，Pitchfork／MB／Bandcamp 皆為自家廠牌 555-5555，建議 label 改 555-5555。
- 23343：patten《Glow》moodGuess 嚴重存疑：Pitchfork 稱無鼓、情緒木然／悶、恐怖片氣氛、小調，色溫偏冷；Daily 的 Durutti 吉他說法只是片段。較可能落頹靡，建議主線以評分把關或汰換（curatorRisk 預警屬實）。
- 23344：Patricia Wolf《See-Through》卡單 label 空，補 Balmat（BALMAT03D）；主體是合成器與場錄，非 Balearic 人聲／吉他 dream pop，人聲旋律性存疑；全專輯僅〈Pacific Coast Highway〉有鼓。
- 23345：Madeleine Cocolas《Bodies》moodGuess 存疑：兩源都沒提弦樂，實為處理過的水聲、人聲與合成器墊，藝人自述有壓迫黑暗段落，z 可能偏低、旋律性低。
- 23346：Turn On The Sunlight 有打擊樂（Carlos Niño 等）與 gyil、銅管，律動感比純 ambient 強，輕度存疑；Hinako Omori 無不符；Mendip／Wiltshire 兩源地名不一，facts 只寫「周遭鄉間」。
- 23347：WebSearch 3 次用於 Henner、Cocolas、Turn On The Sunlight；後兩者查無獨立樂評，聲音描述靠藝人自述／廠牌文案／製作名單。

## 研究 d 組
- 23351　Robotalco《Callisto》：卡單 label self-released 推翻，改 100% Silk（Bandcamp label_name＋MB release）；沿革未核到，不寫。
- 23352　Pedro Magina《Olímpia》：卡單 label 空白，補 Holuzam（MB／Progarchives／state51）；限量 150 與 Carpenters 歌詞說法單源，只放 notes。
- 23353　Rose Bonica《Tears for the Tea Maker》：廠牌 self-released 推翻，改 Roses Are Red；moodGuess 嚴重存疑（Daily：industrial-edged fractured beats），建議主線降權或汰換。
- 23354　Kaitlyn Aurelia Smith《The Kid》：廠牌 RVNG Intl. 推翻，改 Western Vinyl（Pitchfork＋MB）；有節拍（stomp and bite），「無硬拍」存疑。
- 23355　Carmen Villain《Only Love From Now On》：廠牌 Smalltown Supersound 核實；全器樂無低語人聲、意象偏冷，moodGuess 存疑。第幾張專輯兩源不一，不寫序數。
- 23356　Kaela《Supraliminal》：補 Other Suns；有兩首明確有拍（Tender、Valley of the Moon 有真鼓），moodGuess 存疑；短曲多，乾淨判輕風險屬實。

## 研究 e 組
- 23361　Photay《Waking Hours》：卡單「廠牌待核」→ Mexican Summer（MEX263，MB 與 Bandcamp 一致）。moodGuess 存疑：打擊樂與律動全程在場（Daily twitchy percussion、BPM groovy beats、Latin disco 段），旋律與人聲清楚偏明亮流行，非靜重；落恍惚格風險高。
- 23362　Sui Zhen《Losing, Linda》：廠牌推翻，Dream Damage → Cascine（MB 兩筆 release、Pitchfork、Bandcamp 皆為 Cascine）。moodGuess 存疑：鼓機與貝斯整張在場，Pitchfork 稱情緒在 ecstasy 與 unease 之間，暖度 z 不宜高。
- 23363　Los Sara Fontan《Consuelo》：卡單 label 空白，補 Aloud Music／Gandula（MB）。moodGuess 嚴重存疑：整張以多節奏鼓與電子節拍推進，含 techno、drum and bass、glitch、Godspeed 式高潮（Backseat Mafia）；僅〈Creer Fuerte〉〈Salomé〉偏柔。建議主線汰換。
- 23364　Midori Hirano《OTONOMA》：卡單 label 空白，補 Thrill Jockey（THRILL 643，官方頁與 MB）；Bandcamp 的 Erased Tapes 僅 publishing。聲音大致符合，但〈Illuminance〉以節奏脈衝開場、序列器織體多，非無鼓；乾淨清亮處可能判輕。
- 23365　maya ongaku《Nothing Space Music》：廠牌 Guruguru Brain 已核。日期 MB 2026-08-07、Bandcamp 2026-09-15，年份同為 2026。有鼓（底鼓、TR-8S、木質打擊）但速度悠閒，Juno-6／Rhodes／原聲樂器並重，暖；預估大致成立。
- 23366　sachi's mirror《Talking in a Different Way》：卡單 label 空白，補 Constellation Tatsu（MB／Bandcamp）。moodGuess 部分存疑：弦樂為主、非 beat tape，但 Daily 以 Radiohead 式緊繃小品與 drone、無線電雜訊描述，偏陰而非暖，弦樂乾淨處判輕風險仍在；鼓只在第 2、4 首與〈Roulette〉。
