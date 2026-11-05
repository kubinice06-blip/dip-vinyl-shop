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

## 鉤子層（a–e）（23371–23380）
- **23371** 交件：`desc-tools/batches/hooks/add-20261105-ml66-hooks-{a,b,c,d,e}.json`（5／3／4／2／2＝16），key 逐字照主線汰換後研究稿、順序不變、欄位只有 key／hook／note。一人做全五組。公式照派工寫死版：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；16 張皆 full，上限 230。逐筆（hook 原始／加權／預算）：a：Silencia 25／22.5／224；Eleven Fugues 23／23／226；Lovegaze 24／24／226；All My People 21／21／218；Our Hands 20／20／225。b：Once Was Ours Forever 21／21／223；Holotropica 29／22.5／226；Eidetic 29／25／228。c：You Belong 21／21／228；a journey… 21／21／230；Star Dream FM 21／21／225；See-Through 21／21／224。d：Callisto 30／24／212；Olímpia 25／25／225。e：OTONOMA 27／23.5／229；Nothing Space Music 25／25／225。
- **23372** 初稿 14 張超標（最高 You Belong 312），整格捨去：Silencia 的「比前作收起後搖滾」與布達佩斯合唱團（單源）；Eleven Fugues 的 Robert Hampson 混音、開場曲 8 分鐘、McBride 辭世（綁定不明確，不指派）；Lovegaze 的〈Finding Mirrors〉trap 節拍、Ben Lukas Boysen；All My People 的哥哥教吉他、〈Dreaming〉；Our Hands 的吉他「質地豐富」形容；Once Was Ours 的封面風景畫、Joseph Shabason 客串（Shoei Ikeda／Kikagaku Moyo 不進 note，免與 maya ongaku 互指；〈Rain Song〉同名曲撞 You Belong，也不帶）；Eidetic 的「所愛之人與必死」、輕柔打擊；You Belong 的 1992 年、Gunter Hampel、Carlos Niño、Pharoah Sanders／Flying Lotus 比較、格倫代爾；a journey… 的「聲音療癒」；Star Dream FM 的處理人聲；See-Through 的器材清單（只留「配置精簡」）；Callisto 的嘻哈／house 混音帶、Luca Fontaneto、曲數長度；OTONOMA 的「字面是聲音之間的空間」（移進 hook）；Nothing Space Music 的神社位置。壓完回核：16 張 hook 依賴的事實都在 hook 本身或 g1（Eidetic 的小屋與朋友手製琴、Star Dream FM 的電台概念、See-Through 的哀悼後轉向、Nothing Space Music 的舊建築都在 g1；Olímpia 的「沉寂五年」只在 hook，研究 F2 有 src）。
- **23373** 骨架歸屬（16 張 16 條，只在擁有者 note 寫歸屬句）：Silencia＝藝人自定聆聽位置（壓軸、沉默的前奏）；Eleven Fugues＝反覆的夢＋藥名當盤名；Lovegaze＝教會鼓手晚學豎琴、借琴錄 demo；All My People＝已故親人僅存錄音入盤；Our Hands＝四年處理吉他、風格游移對應酷兒身分；Once Was Ours＝前作白天／本作黃昏的姊妹作；Holotropica＝冥想與懷孕起點、自造詞盤名；Eidetic＝鄉間小屋錄音、從 drone 回到歌；You Belong＝寄宿學校老友遠端寄回人聲；a journey…＝森林浴＋雙耳拍頻；Star Dream FM＝虛構電台播出十七歲；See-Through＝哀悼後的重生、為線上演出趕寫；Callisto＝舊名號外另立新名；Olímpia＝沉寂復出＋一人包辦；OTONOMA＝日語拆字盤名＋兩條路線合併；Nothing Space Music＝巡演後自建錄音室。「首張」只當 cell（Lovegaze、Our Hands、a journey…），不作任何一張的骨架；「一人包辦」只給 Olímpia，OTONOMA 的「自己寫演錄混」整格不帶。主線研究汰換段照辦：Maria Somerville、Adam Wiltzie 的 note 不出現序數；Somerville 寫自行發行＋Rush Hour 通路。
- **23374** hook 四型：懸疑（Eleven Fugues——收在第二句具名 Wiltzie；Star Dream FM——收在 g1「他自述的概念」）／斷言（Silencia、Our Hands、OTONOMA、Olímpia、See-Through）／場景（All My People、Once Was Ours、Eidetic、You Belong、a journey…、Nothing Space Music）／人物定調（Lovegaze、Holotropica、Callisto）。「開頭兩句讓不懂的人知道是誰」：hook 帶身分的（Callisto 米蘭 disco edit 製作人、Once Was Ours 荷蘭人＋指彈吉他）之外，其餘第二句都指派身分或樂種。
- **23375** 第二句句型配表（16 種）：Silencia＝「他與 Andrew Thompson 組成的 Hammock」＋序數（避開池中 Hammock 舊卡已用的「田納西州納許維爾的二人組」）；Eleven Fugues＝「做這個夢的是⋯共同創辦人」；Lovegaze＝「後來她成了洛杉磯的豎琴手兼歌手」；All My People＝「她是愛爾蘭西岸 Connemara 的歌手」；Our Hands＝「住在布魯克林」；Once Was Ours＝「吉他手⋯把這張當成前作的續篇」；Holotropica＝「她是哥本哈根的音樂人，常年習冥想」；Eidetic＝本名＋寫歌寫詩拍照（避開池中舊卡「1984 年生的美國多樂器演奏者」）；You Belong＝「是⋯Jesse Peterson 的計畫」；a journey…＝生在日本、英國長大＋伴奏經歷；Star Dream FM＝「很少自我宣傳的英國 ambient 製作人」；See-Through＝外人之口／自述「說這話的⋯在波特蘭做 DJ 與場錄」；Callisto＝「新名字叫 Robotalco」；Olímpia＝廠牌關係「曾在 Not Not Fun 發片的」＋成長地；OTONOMA＝「生於京都、住在柏林，是作曲家兼鋼琴家」（照卡單寫羅馬字 Midori Hirano，研究稿的漢字無原文字形來源，不指派）；Nothing Space Music＝「是湘南江之島一帶的日本三人組」。本批無同藝人跨卡，「他／她」引入法逐張不同：具名代稱（Eleven Fugues、All My People）、身分（Lovegaze、Star Dream FM）、居地（Our Hands、Holotropica）、本名（Eidetic）、自述之口（See-Through）、名號（Callisto）、廠牌關係（Olímpia）、樂器與作曲身分（OTONOMA）、團體屬性（Silencia、You Belong、Nothing Space Music）、樂器（Once Was Ours 吉他手）。
- **23376** 日期「日」後一字逐張配死（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Silencia 日交、Lovegaze 日發、All My People 日自、Our Hands 日推、Holotropica 日替、You Belong 日經、a journey… 日由、Star Dream FM 日在、See-Through 日出、Olímpia 日上、OTONOMA 日從；Eleven Fugues（月掛）、Callisto（月的）只到月，Once Was Ours（夏天回到）、Eidetic（月在⋯面世）只到月／季，Nothing Space Music 只到年（MB 與 Bandcamp 日期不一）。媒體名 0 進 note（一律「專欄」「樂評」「說明」「廠方」「發行商」），分數 0、榜位 0。
- **23377** 自查：hook 開頭前四字 16 張互異，對全 hooks 目錄（1088 檔）亦互異（原稿「Marc」撞 ts4，已改）。本批 hook 之間中文 4-gram 0；hook 對全批 note 0；hook 對自己 note 逐字 6 字以上只剩英文樂種詞「disco edit」（Callisto）。對他批 hook 的高頻殘片已改字：「他一個人」×24、「一個聲音」×3／「的另一個」×6、「拼成一張」×4、「盤名指的」×3、「換個名字」×3、「同一件事」「音樂的人」「排在最後」「巡演回來」×2；剩下皆 ≤2 次（「十七歲的」×2）。note 間 2 張以上 4-gram 只剩「的合成器」。腳本：`node qa-batch.mjs hooks add-20261105-ml66` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261105-ml66` 全部通過 ✓（5 組 16 張，hook 加權 20–25，note 207–235）。輔助腳本：scratchpad `ml66h/ml66h-draft.mjs`、`ml66h-measure.mjs`、`ml66h-scan.mjs`。

## 寫作層（writer-1）（23381–23390）
- **23381** 交件：`desc-tools/batches/output/add-20261105-ml66-out-1.json` 16 張（全 full），字數 207–240：Silencia 232、Eleven Fugues 239、Lovegaze 235、All My People 227、Our Hands 221、Once Was Ours 225、Holotropica 222、Eidetic 236、You Belong 222、a journey… 240、Star Dream FM 226、See-Through 236、Callisto 230、Olímpia 207、OTONOMA 218、Nothing Space Music 238。`qa-batch out` 全部通過、`qa-check-research` 標記 0、`fix-spacing` 待補 0；「據」0。初稿 3 張超標（maya ongaku 247、Lovegaze 244、a journey… 242），整格捨去：Lovegaze 砍「詩班在教會唱」（與 hook 重疊）；a journey… 與 maya ongaku 只削虛詞（「那些」「底下」「重新」「過程」「的」）。
- **23382** 第二句領句全照鉤子層 23375 指派。「日」後一字照 23376（交／發／自／推／替／經／由／在／出／上／從），Silencia 中途一度變成「日把」，已改回「日交」。跨張 han() 4-gram 自掃最後只剩「布魯克林」（地名，Our Hands×Eidetic）。途中拆掉：「在年月日」×3（Silencia、Lovegaze、Holotropica，Holotropica 拿掉「在」、Silencia 改成盤名領日期）、「專輯年月」×3（Eleven Fugues 改「個人唱片」、a journey… 改成日期領句的定語子句、See-Through 改成「日期＋出版第二張專輯」）、「首張全長專輯」（Our Hands 改「第一張全長作品」）、「的合成器」（a journey… 改「失諧合成器的 drone」）、「是她的首」（a journey… 改「是她第一張專輯」）。
- **23383** 轉述來源一律改成陳述句或被動：Silencia 的「專欄聽到」、Our Hands 的「說明把風格列成」、Once Was Ours 的「廠方說」、Eidetic 的「說明稱」、Olímpia 的「專欄說」「發行商說」直接陳述；Somerville「被形容成」、You Belong「被歸為靈性爵士」、Star Dream FM「照他自述的概念」（note 指定寫成自述）。媒體與平台名 0。
- **23384** hook 代稱具名：Silencia 第三句把 hook 的「Byrd」補全為 Marc Byrd；Lovegaze 第二句具名後，第三句只補 hook 沒說的「貝里斯裔」與「CalArts」，note 首環「教會學鼓與詩班」與 hook 重疊，不再複述；Olímpia note 首環「製作欄只有他」即 hook 原意，正文不再重講；Callisto 第三句補本名與 Club Silencio，「另立新名」改寫為「另起爐灶」避免逐字重複 hook；You Belong 第三句把「老同學」具名為 Cavana Lee，原稿「她的人聲」代名詞可能誤指 Jeanne Lee，改成無主語句。
- **23385** 只寫 note：You Belong 刪掉初稿從 facts 帶進的「盤旋流動」；Once Was Ours 刪掉「層層吉他」（facts 才有的「濃密層疊」）。maya ongaku 的 Sonoda 照 note 直接點名，沒有從 facts 補身分。Maria Somerville、Adam Wiltzie 不寫序數（照主線研究汰換段）。

## 主線審稿（2026-11-05，cloud-main）
- 逐張審 16 張，抽核關鍵事實回研究稿：Hammock 第十張、2019-11-15、Byrd「沉默的前奏」；Wiltzie 夢見聽者會死、sodium pentothal 為巴比妥類藥物、Oxdonk 住處＋布達佩斯 Magyar Radio Studio 22；Nailah Hunter 牧師之女、CalArts 豎琴課、借來的凱爾特豎琴、Cicely Goulder；Maria Somerville Connemara、叔叔 Michael Somerville 唯一錄音取樣、Rush Hour 通路；Rachika Nayar NNA Tapes 2021-03-05；Jonny Nash Melody As Truth、前作《Point Of Entry》2023；Sofie Birch interCourse 2022-05-27（長笛與豎琴未寫成本人演奏）；Pioulard 本名 Thomas Meluch、緬因小屋、parlor guitar；Turn On The Sunlight Cavana Lee 為 Jeanne Lee 之女、Laraaji、SK Kakraba；Hinako Omori 森林浴、Real World Studios；Dylan Henner Phantom Limb 2025-10-17；Patricia Wolf Balmat、9128 Live、〈Pacific Coast Highway〉唯一有鼓；Robotalco 本名 Sebastiano Urciuoli、Club Silencio、2016–2018；Pedro Magina 沉寂五年、一人包辦、Holuzam CD；Midori Hirano Oto＋Ma、Thrill Jockey 2026-02-20、川內倫子展；maya ongaku Nothing Space Studio、Juno-6。
- 媒體名 0、「據」0、序數矛盾的兩張（Somerville、Wiltzie）未寫序數。
- 逐張審過，未改字。

## 主線上線（條號 23391–23393）
- **23391**：上線 16 張：card_catalog 16／16、KV 16 鍵回讀逐字一致（stamp 20261105m66）、試聽 16 ready（12 張換成 Deezer 最紅那首）、seed +16、prepare／published gate 0 error。封面 CAA 15＋Bandcamp 1（Pedro Magina，CAA 404）；縮圖表目視相符。三軸 §0.8.1 錨點人工評分（經典度 3 佔 12、4 佔 4）。頂點 0。藝人介紹 ar-d-285（16 位）同 PR 上線。
- **23392**：情緒評分 `score-ml66/`：**落恍惚 7/16＝44%**（恍惚 7、放鬆 6、頹靡 3）。出格：Hinako Omori、Sofie Birch、Patricia Wolf、Nailah Hunter、maya ongaku、Midori Hirano 判輕落放鬆（原聲／合成器乾淨、無霧牆）；Adam Wiltzie、Maria Somerville、Rachika Nayar 判冷落頹靡（頹靡也是薄格，不算浪費）。
- **23393**：**Bandcamp 來源結論**：Best Ambient／Best Electronic 共約 200 期，暖而有旋律的 ambient 在評分尺下多判輕（乾淨、空氣感），厚的又多判冷；Best Electronic 九成是舞池。策展 47 → 研究後 16 → 落恍惚 7，產率約 15%，**不建議再派同場景**。
