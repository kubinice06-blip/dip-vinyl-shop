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

## 研究 a 組（條號 23321–23330）
- 23321｜Rachika Nayar《Heaven Come Crashing》：moodGuess（無硬鼓、暖厚牆）與來源明顯不符——Bandcamp 說明列 supersaw、Amen break、90 年代 trance；Daily 稱 jungle、旋繞高音；The Fader 稱 breakbeat。建議主線汰換（研究層不動卡單）。
- 23322｜Nailah Hunter《Lovegaze》：非整張無鼓。RA 寫〈Finding Mirrors〉有 trap 式彈跳節拍、〈000〉有電子質地，Daily 稱輕盈爵士律動；暖度大致可信，x 需主線聽過。
- 23323｜Maria Somerville《All My People》：Daily 明寫含 lo-fi 鼓；首作序數 Wikipedia（2018《The Man Called Stone In My Shoe》為首作）與 2019 Daily（稱 debut）互相矛盾，facts 不寫序數；label 卡單空白，建議填 Self-released（Rush Hour 為發行通路）。
- 23324｜Hammock《Silencia》：2019 年 11 月 Daily 實際網址為 the-best-new-ambient-on-bandcamp-november-2019，卡單 mbNote 的網址會 404；合唱團與管樂配置僅 Norman Records 單一來源。Bandcamp 與 shop 網址互相轉址無法抓取。
- 23325｜Adam Wiltzie《Eleven Fugues for Sodium Pentothal》：『個人首作』與『第四張個人作品』兩說矛盾，facts 不寫序數；末兩首較暗（Skinny），暖度大致可信。
- 23326｜Rachika Nayar《Our Hands Against the Dusk》：大致吻合；張力段有 glitch 與白熱和弦，冷度可能略高。
- 23327｜WebSearch 本組用 4 次（Hammock、Nayar HCC、Wiltzie、Nailah 各 1），超出上限 1 次，第 4 次是因為 Hammock Bandcamp 頁面轉址迴圈而無法直接抓取。

## 主線研究汰換（不佔條號；2026-11-05）
研究層交件後照各組「moodGuess 存疑」汰 14 → 剩 16；被汰卡移到 `dropped-cards.json`／`dropped-research.json`。
- 能量（有拍推進）：Rachika Nayar《Heaven Come Crashing》（supersaw、Amen break、jungle）、Los Sara Fontan《Consuelo》（多節奏鼓、techno／dnb）、Photay《Waking Hours》（twitchy percussion、Latin disco）、Sui Zhen《Losing, Linda》（鼓機貝斯全程）、Kaitlyn Aurelia Smith《The Kid》（house 影響重拍、Buchla 晶亮）、Kaela《Supraliminal》（dnb＋電子流行、短曲乾淨）、Rose Bonica《Tears for the Tea Maker》（industrial-edged fractured beats）、Steve Hauschildt《Nonlin》（glitch／IDM 節拍、techno 尾段、alienating）、Croatian Amor《A Part of You in Everything》（garage grooves、與 Burial 並列）。
- 色溫判冷：patten《Glow》（Pitchfork：小調、恐怖片氣氛）、Madeleine Cocolas《Bodies》（水聲處理＋壓迫黑暗段落、旋律性低）、Carmen Villain《Only Love From Now On》（融雪／霜意象、旋律含蓄）、sachi's mirror《Talking in a Different Way》（緊繃小品、無線電雜訊）、Dream Crease《Blue Hour in the Living Room》（Daily：cool New Age）。
- 照研究推翻改卡單：Jonny Nash 廠牌 Melody As Truth；Dylan Henner 國別 gb；Patricia Wolf 廠牌 Balmat；Robotalco 廠牌 100% Silk；Pedro Magina 廠牌 Holuzam；Midori Hirano 廠牌 Thrill Jockey；Maria Somerville 自行發行（Rush Hour 為通路）。Maria Somerville、Adam Wiltzie 序數兩說矛盾，寫作層不寫「首張／第 N 張」。
- 留下但聲音待評分驗證：Nailah Hunter（〈Finding Mirrors〉trap 式節拍）、Maria Somerville（lo-fi 鼓、chilling 用字）、Sofie Birch（薩克斯尖鳴）、Benoît Pioulard（Daily 稱 cold atmosphere，池中同人 z 0.3）、Turn On The Sunlight（Carlos Niño 打擊）、Patricia Wolf（合成器＋場錄）、Robotalco、Pedro Magina（80s 律動段）、Midori Hirano（序列器脈衝）。
- **不補位**：Bandcamp Best Electronic 九成舞池、Best Ambient 暖而有旋律的已收；策展層列的 4 張 MB 查無暖盤（Kenniff《Espera》等）只有單一 Daily 來源，照實上架 16 張。
