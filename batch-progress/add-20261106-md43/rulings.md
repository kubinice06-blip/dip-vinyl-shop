# add-20261106-md43 裁定（情緒薄格線・頹靡：Bandcamp downtempo 候選第二輪 md43）

> 店主 2026-11-06「繼續」：第一輪（離邊界遠的 289 張）上線 104 張後，剩下靠近邊界的 612 張照第一輪教訓先過濾（帶舞池節拍標籤、<30 分的拿掉）→ 232 張，切成 ml71–73、md42–43。三個工作階段並行：本工作階段只做 md43（並行：ml71＋ml72、ml73＋md42）。卡單 `batch-progress/bandcamp-dt-20261105/pick-md43.json`（38 張）即策展結果，不派策展代理；說明見同目錄 `README.md`。
> 目標格：**頹靡＝靜（x<3.0）＋重（y≥0.5）＋冷（z<0）**；評分照 `batch-progress/mood-axes/score500/BRIEF.md`（10-23 店主體感標準）。卡單的 moodGuess 是只看 Bandcamp 標籤的粗估、且靠近邊界，**研究層要照聲音再判一次**：判輕、有拍子推進、判暖的汰掉，不補人。
> 流程：卡單 38 → 主線初篩（身分、去重、資格、同人、文案直述聲音）→ `curation-md43.json`（19）→ `master-md43.json`（MB 釘住 19、§1 人工 0）→ `build-cards.mjs` → 研究 2 組（a 10、b 9）。
> **預留：研究 a 24281–24290、b 24291–24300、鉤子 24311–24320、寫作 24321–24330、主線 24331–24340。**
---

## 主線初篩（不佔條號；2026-11-06）
- 身分：Bandcamp 專輯頁 ld+json（發行日、曲數、發行者、文案、曲目）＋ MB release-group 查詢（score 100、primary Album、無 secondary）逐張比對；留下的 19 張全數 MB 釘得住。Webinar™、Hungry Lucy、Nym、simvlacrvm、Rom Di Prisco 的 Bandcamp 自訂網域對腳本轉址迴圈，抓不到文案，交研究層用 WebFetch 再試。
- 去重：`dedup-md37.mjs`（seed、所有 manifest、`data/pool-removed.json`、所有卡單、所有 curation）0 撞。
- **主線初篩汰 19**（卡單 38 → 19）：
  - 資格：Fort Road《Cigarettes and Silhouettes》（7 軌中 4 首是 remix，原創只 3 首）、All India Radio《Lost Songs from Infinity》（文案自述是《The Generator of All Infinity》的 demo 與 outtake）、All India Radio《The Silent Surf (Reissue)》（2026 重發版 22 軌，另含 remix 與 early version；原盤 2010，且同人已留《Afterworld》）、Telenights《24-25》（文案「一年來未發表的曲子」集，含 Extended Mix；barber beats／lounge）。
  - 能量（文案直述有拍推進）：H.U.V.A. Network《Ephemeris》（「crisp, crunchy beats… forward driving melodies… morning trance」）、I AWAKE《The Core》（「deep, tribal beats… groovy bass lines」）、Ruth Mascelli《A Night At The Baths》（「pulse-racing dancefloor」、techno／acid house）、Halina Rice《Elision》（「beat-driven instrumentals… looping beats」）、PROFONDITA《Ciel》（廠牌文案「downtempo-trance… fat kicks」；md41 同人《Dracarys》同文案已汰）、Martin Nonstatic《Pulsatille》（dub techno／floating acid、「diaphanous… resplendent」判輕判亮）。
  - 判暖（文案直述）：CELL《Hanging Masses》（「warm melodic bass lines… gentle pulses」；MB 另有一筆 EP＋Compilation 同名 rg）、KiloWatts《Undercurrent》（作者自述「joyful tunes whistled」、旋律為本、曲名 The Undercurrent Is Love）、自決 9 6《Pink Soda》（mallsoft，文案與曲名是甜的粉紅色調：Drink Calpis & Be Happy!、Cinnamon Chewing Gum）。
  - 池中同人錨點判輕判暖（md41 先例）：Arms and Sleepers《THE ORGAN HEARTS》（同人《What Tomorrow Brings》落平靜 y 0.2；md39 也汰過同人）、Carbon Based Lifeforms《Twentythree》（同人《World of Sleepers》落平靜 y 0.3）、Funki Porcini《Le Banquet Cassio》（同人《Hed Phone Sex》落恍惚 z +0.2）。
  - 同人超量：State Azure《Edge of Forever》（池中已有 md41 兩張，並行 ml71–73、md42 卡單還有五張）、Hungry Lucy《Glō》（同人留《Apparitions》；Bandcamp 版 22 軌 105 分疑為加長版）、Nym《False Noon》（同人留聽眾較多的《Countermagic》；並行卡單另有五張 Nym）。
- 並行卡單同人（ml71–73、md42）：Nym、State Azure、All India Radio、boerd、ASURA、Solar Fields、Halina Rice、CELL、Funki Porcini、Carbon Based Lifeforms 都在別批出現；本批每人只留一張，藝人介紹合併時以先上 main 的版本為準。
- 年份以原盤首發為準：Peter Bjärgö《A Wave of Bitterness》2009（Bandcamp 版是 2019 重新母帶）、Webinar™ 2021（MB 首發 2021-07-03，卡單寫 2024）、Soapkills《Bater》2000（Bandcamp 2000-09，MB 只記 2001；研究層核實）。
- 保留 19 張的邊距風險逐張寫在卡單 `curatorRisk`（研究層逐條查）。


## 研究 b 組（24291–24300）
- 24291　Rom Di Prisco《Cryptidalia》：Bandcamp 自訂網域 303／301 互指迴圈，curl 與 WebFetch 皆抓不到一手文案。改用 Discogs（自行發行、風格 Dark Ambient／Trip Hop／Progressive Trance）、Wikipedia（作者本行 breakbeat／big beat／goa／psytrance）、Sputnik 聽眾評論（techno／house／EBM）。moodGuess 存疑，建議汰；label 填自行發行。
- 24292　ambientium《Fractal Philosophy》：Kahvi Collective kahvi265（2009-02-16）；Bandcamp 發行者為本人。psychill／psybient，聽眾稱 psychedelic downtempo，無鼓直述。輕度存疑，status thin，列備汰、不建議直接汰。
- 24293　Peter Bjärgö《A Wave of Bitterness》：原盤 Kalinkaland Records 2009-08-28（MB、Discogs、Spirit of Metal 一致）；Cyclic Law 公告寫「from 2010」與其餘衝突，採 2009。Bandcamp 版為 2019 重新母帶、Cyclic Law 重發。label 填 Kalinkaland Records。聲音無衝突，保留。
- 24294　Monophona《The Spy》：2012-11-24 自行發行（Discogs 廠牌欄 music:LX）。Maxazine 直述有鼓手與打擊、製作人為 drum 'n' bass 背景，原聲吉他加人聲，樂評說勝過「陽光系 chillout」。判輕、判暖、有鼓三疑，moodGuess 存疑，建議汰。
- 24295　Rabit《Stranger in a Strange Land》：label 填 Halcyon Veil（Rabit 自營，HALC044 卡帶 2026-05-01；數位 2026-03-26）。Bandcamp 帳號名 gangstalkers 非廠牌。無樂評，Discogs 風格 Screw／Trip Hop，有無拍子推進無直接證據，不汰、待聽。
- 24296　WMD《We Never Seem To Have Enough Time》：自行發行（Michael Erickson，波特蘭），帳號名 wmdchiptune 非廠牌。lofi／melancholy；聽眾留言一則陰天灰、一則光在隧道盡頭，冷暖兩端並存。無樂評，輕度存疑，不建議汰。
- 24297　boerd《Panacea》：Bandcamp 無文案、無演出名單、無樂評，WebSearch 額度已用於他張；只有標籤與曲目，facts 8 條、thin。聲音無法驗證，不建議汰。
- 24298　Andrew Tasselmyer《Yesteryear》：Seil Records（Seil 026）。來源直述鋼琴經磁帶處理改造、無鼓、quiet／melancholic／textured。標籤含 acoustic／piano／neoclassical，輕度存疑，不建議汰。短評（The Lifted Index、Lost Tribe Sound）為 Bandcamp 頁轉載，未查到原文。
- 24299　Pontiac Streator《Triz》：Motion Ward MW008。Discogs 黑膠逐曲標 BPM 80–120，是拍子導向的 downtempo，與卡單「抽象 ambient」牴觸，另有客座（Mister Water Wet、Ulla）。moodGuess 存疑，建議汰。
- 24300　本組統計：建議汰 3（Rom Di Prisco、Monophona、Pontiac Streator）；備汰 1（ambientium）；推翻策展層年份／廠牌 0 處，補廠牌 4 處（Bjärgö、Rabit、Tasselmyer、Pontiac）。WebSearch 用 3 次（Rom、Bjärgö、Monophona）。


## 研究 a 組（24281–24290）
- 24281　Webinar™《w w w . d e e p d i v e . c o m》：Bandcamp 自訂網域轉址迴圈、web.archive.org 被擋，抓不到文案；僅 MB 標籤（vaporwave、frutiger aero、late night lo-fi、faux-utopian）與曲名（Aqua、Euphoria、Underwater Disco）。年份採 2021（MB 首發 2021-07-03；卡單 2024 是 MB 另筆 2024-08-13 重發登記；Apple 頁標 2021-01-17 與 ℗2023 不採）。label Dream Corp.（MB）。thin；判亮判輕可能高，建議汰（弱）。
- 24282　Whatever The Weather（Loraine James）：Ghostly International，2022-04-08。文案直述「airy, transportive」「sunshower of soft hums」「warm delay」，也有〈17°C〉propulsive、〈0°C〉steely beats，但整體放棄打擊樂結構。判輕，建議汰。
- 24283　Solar Fields《Ourdom》：Droneform Records（Birgersson 自營），2018-03-29。無作者文案，僅標籤 downtempo、聽眾留言「gets groovin'」、曲名偏光；證據弱但方向偏有律動，建議汰（弱）。卡單「159 分」實為 13 首正曲加 79 分鐘連播混音。
- 24284　Between Interval《Legacy》：Spotted Peccary（MB），2017-04-07。文案直述合成器序列、琶音、次諧波低頻脈動、dub techno 元素，Igloo 評 propulsive；標籤含 chill／meditation。有脈衝推進，建議汰。
- 24285　ASURA《Radio Universe》：Ultimae inre057，2014-10-21。文案直述深低音 drone 與合成器墊，但「contrasted by the classic downtempo tracks」即專輯內有拍曲目；曲名偏明亮。混合型，建議汰（弱）。
- 24286　All India Radio《Afterworld》：自行發行（CD 為 Spectra，單源維基）；作者自述放慢、dark ambient／post-rock 標籤；無直述推翻，保留。Bandcamp 的兩條 20 分鐘黑膠母帶檔不是額外專輯曲。
- 24287　Hungry Lucy《Apparitions》：Fishtank Soundworks，2000-08-01（MB）。Bandcamp 轉址迴圈；零售文案「gothic/trip-hop、電子為主、加入鋼琴吉他長笛」。CD 14 首含 4 條混音版。聲音幾乎無直述，thin；Blue Dress 翻唱與 Alfa Matrix 重發為單源（波蘭語維基鏡像），寫作層勿用。
- 24288　Nym《Countermagic》：Melting Records（雅典，專攻 downtempo／trip-hop／instrumental hip-hop），2020-01-06；Nym 為美國達勒姆（MB 單源）。Bandcamp 轉址迴圈、廠牌頁 404、WebSearch 無果。風格偏有鼓的 beat 音樂，與卡單「無資訊／靜」無支持，建議汰（弱）。thin。
- 24289　Soapkills《Bater》：自行發行。年份定 2001（MB、維基、Bandcamp 簡介三源一致；Bandcamp 日期欄 2000-09-01 為離群值），建議卡單改 2001。簡介直述 Roland MC-303 鼓機為底、trip hop，判有拍；阿拉伯語人聲可能偏暖，建議汰（弱）。
- 24290　simvlacrvm《sequences》：echo cult（MB），2026-05-29。無文案、無樂評；MB 藝人附註為 jungle／breakcore，與卡單「靜」相反，建議汰（弱）。thin。
- 本組統計：建議汰 8（強證據：Whatever The Weather、Between Interval；弱證據：Webinar™、Solar Fields、ASURA、Nym、Soapkills、simvlacrvm）；保留 2（All India Radio、Hungry Lucy，無反證）。推翻策展層：年份 2 處（Webinar™ 卡單 2024→2021、Soapkills 2000→2001），label 補 7 處。WebSearch 用 3 次（Hungry Lucy、Webinar™、Nym）。

## 主線研究後汰換（不佔條號；2026-11-06）
- 判準照 md41 先例：研究稿以來源直述**有拍推進／舞曲感**、**判輕判亮**、**判暖**的汰；只有「聲音僅標籤、邊距未知」的留給評分驗收。另加一條：研究層查到的**藝人本行**（MB 附註、作品風格）與頹靡相反，也算直述。
- **汰 8 張**（存 `dropped-cards.json`／`dropped-research.json`）：
  - 能量：Rom Di Prisco《Cryptidalia》（研究 b：作者本行 breakbeat／big beat／goa trance，聽眾評 techno／house／EBM 混合）、Pontiac Streator《Triz》（研究 b：Discogs 黑膠逐曲 BPM 80–120，拍子導向）、simvlacrvm《sequences》（研究 a：MB 藝人附註 jungle／breakcore）、Nym《Countermagic》（研究 a：廠牌風格 trip-hop／instrumental hip-hop；店主 11-04「嘻哈太多」，並行恍惚卡單另有四張 Nym）。
  - 判暖判輕：Whatever The Weather（研究 a：Ghostly 文案「airy, transportive」「warm delay」，另有 propulsive 曲）、Monophona《The Spy》（研究 b：樂評直述有鼓手，旋律勝過「陽光系 chillout」，原聲吉他＋人聲）、Webinar™（研究 a：MB 標籤 frutiger aero／faux-utopian，明亮的企業烏托邦美學）、Solar Fields《Ourdom》（研究 a：聽眾「gets groovin'」，曲名 Into The Sun、The Daylight Carrier；並行恍惚卡單另有三張 Solar Fields）。
- **留下但研究層標弱汰的 3 張**（可逆，留給評分驗收）：Between Interval《Legacy》（文案有序列與琶音、Igloo 評 propulsive；但池中同人兩張 x 1.4–1.5、y 1.2–1.5、z −1.3～−1.6 穩落頹靡，以錨點為準）、ASURA《Radio Universe》（主體是 drone 與合成器墊，「classic downtempo tracks」只是對比段）、Soapkills《Bater》（MC-303 鼓機 trip-hop，阿拉伯語人聲；Portishead 型 80 BPM 冷 trip-hop 是第一輪穩的那型）。ambientium（psychill 標籤、無直述）、boerd（只有標籤）同理留下。
- **研究層更正已改進卡單**：Soapkills 年份 2000 → 2001（MB、維基、Bandcamp 簡介三源一致）；label：Between Interval → Spotted Peccary、Hungry Lucy → Fishtank Soundworks、ambientium → Kahvi Collective、Peter Bjärgö → Kalinkaland Records（2009 原盤；2019 Cyclic Law 重發重新母帶）、Rabit → Halcyon Veil、Andrew Tasselmyer → Seil Records；All India Radio、Soapkills、WMD、boerd → self-released。
- 寫作層不用：Hungry Lucy〈Blue Dress〉翻唱與 2001 Alfa Matrix 重發（單一鏡像站來源）。
- 不補位。定案 **11 張**（a 5、b 6）。

## 鉤子層（a、b）（24311–24320）
- **24311** 交件：`desc-tools/batches/hooks/add-20261106-md43-hooks-a.json`（5）、`-b.json`（6），共 11 張，key 與順序照研究稿現況（汰掉的 8 張不在）。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；上限 thin 170、full 230（thin＝Hungry Lucy、ambientium、Rabit、WMD、boerd；依研究稿 status）。逐筆（預算／hook 原始字元／加權）：Between Interval 228／20／20；ASURA 229／21／21；All India Radio 230／20／20；Hungry Lucy 170／29／22（thin）；Soapkills 230／25／21；ambientium 163／19／19（thin）；Peter Bjärgö 230／28／20.5；Rabit 166／22／22（thin）；WMD 168／21／21（thin）；boerd 166／28／21.5（thin）；Andrew Tasselmyer 223／22／22。依公式寫、不湊字。
- **24312** 初稿 11 張全超標（thin 190–251、full 236–393），整格捨去：Between Interval 的 Michal Karcz 封面、〈The Outer Shell〉、electronica 標籤；ASURA 的 inre057、〈Oblivion Gravity〉、〈Farscape 7〉Ayten、Studio 777／Villuis；All India Radio 的《Eternal》《Echo Other》《Fall》對照、客座自由發揮、Pink Floyd 曲名、Gilbert Williams 封面；Hungry Lucy 的發行日與 Fishtank Soundworks、原聲吉他、〈Bound in Blood〉改版、2014 停止活動；Soapkills 的九〇年代末成軍、阿拉伯古典與民謠來源、樂手名單、電影與媒體；ambientium 的 Kahvi Collective 免費授權、iT Records 50 張 CD、ambient／psychill 標籤；Bjärgö 的曲長、限量 500 張、下一張盤名；Rabit 的 Tri Angle 首張、2017 轉向、Björk〈Losss〉、Halcyon Veil 卡帶；WMD 的州名、在家製作、曲數曲長、黑膠；boerd 的曲長、24 位元、〈City Sleep〉〈Insomnia III〉、後續作品；Tasselmyer 的 38 分鐘、Sound Methods、卡帶。壓完回核：hook 依賴格全在 g1／g2 或 hook 自足（ASURA〈Overture〉9 分 55 秒放 g1；Rabit 三城與 11 首、1 到 3 分鐘在 g2；Hungry Lucy 的「主唱」在 g1 具名；WMD 懸疑收尾＝g2 的低谷與找回創作；boerd 的首尾曲名、Soapkills 的 MC-303、Tasselmyer 的編制由 hook 自足）。
- **24313** hook 事實自驗：ASURA「序曲在開場」研究稿未載曲序，回查 MB release 曲目（第 1 首〈Overture〉595 秒）成立；Bjärgö 研究稿寫「以本名」，但池中 Arcana 卡寫他原名 Peter Pettersson，hook 改「單獨掛名」、note 不寫「本名」；Soapkills「中東最早的獨立樂團」補回「之一」；Tasselmyer「一台手持錄音機」數量無出處，改「多種取樣器」（也避開 ml61 的「手持錄音機」4-gram）。研究後汰換段的禁用事實（Hungry Lucy〈Blue Dress〉翻唱、Alfa Matrix 重發）未進 note；媒體名（Igloo、Chain D.L.K.、Wired、Pitchfork、Time、The Lifted Index、Lost Tribe Sound）與榜單名次未進 note，Tasselmyer 只寫「樂評形容」、ASURA／Bjärgö 用廠牌與重發公告之口。Soapkills 年份寫 2001（主線已改卡單）；Bjärgö 只寫 2009 原盤，Cyclic Law 2019 重發標時序（作品流傳類）。self-released 四張（All India Radio、Soapkills、WMD、boerd）note 不寫廠牌，Soapkills 寫「三張自行發行專輯之首」屬事實。
- **24314** 骨架歸屬（11 張 11 條，各張 note 只寫自己的歸屬句）：Between Interval＝標題概念（探索欲即遺產）＋畫面留給聽者；ASURA＝向七〇年代太空音樂前輩回聲、與自己招牌 downtempo 對比的轉向作；All India Radio＝封城寫錄、刻意放慢；Hungry Lucy＝致敬專輯促成組團的首張；Soapkills＝一台 groovebox 頂替樂手（器物）＋戰後重建的團名；ambientium＝一句說明＝全部文案（自相似）；Bjärgö＝樂團主腦首張個人名義作、定下日後樣板＋作者重做母帶；Rabit＝三城寫成的短曲集；WMD＝心理健康低谷後找回創作（克制）；boerd＝只有標籤與曲序的獨立製作人；Tasselmyer＝以失去為題的即興少疊錄、磁帶處理鋼琴。hook 四型：斷言（Between Interval、ambientium、Tasselmyer）／場景（ASURA、Soapkills、Rabit、boerd）／人物定調（All India Radio、Hungry Lucy、Bjärgö）／懸疑（WMD）。
- **24315** 同人：全批無同人兩張以上，不配「他／她」表。性別：ambientium 不明，note 不用代名詞；Hungry Lucy 兩人以名字分工；其餘九張為男性個人或以名字領句。跨批同人（池中 Between Interval《Autumn Continent》《The Edge Of A Fairytale》、All India Radio《The Unified Field》、Arcana 兩張）的已上架首兩句已避開：不寫「是瑞典的 dark ambient 計畫」「塔斯馬尼亞的老團」「從出道作起始終在團」「瑞典 Arcana／Eskilstuna 據點」。
- **24316** 第二句句型配表：Between Interval「掛著…這個名號」；ASURA「…替自己取名…」；All India Radio「…創立的…專案，唯一固定成員是他」；Hungry Lucy「A 編程製作、B 唱歌寫詞」；Soapkills「同姓但非親戚」；ambientium「捷克的…替這張寫的」；Bjärgö「身兼…兩個計畫」；Rabit「早年做…」；WMD「…在…的個人電子計畫」；boerd「…的藝名」；Tasselmyer「…出身、現居…的」。避開 md41 用過的「是…的別名」「背後是」「以…為名」「用…發表」「來自英國」「住在…小鎮」「名下的計畫」。
- **24317** 「日」後一字逐張配死（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Between Interval 交、ASURA 以、All India Radio 問、ambientium 先、Bjärgö 經、Rabit 放、WMD 發、boerd 上、Tasselmyer 推；Hungry Lucy、Soapkills 只寫到年；Bjärgö 的 2019 重發只寫到月。
- **24318** 自查：11 個 hook 互掃中文 4-gram 0 撞；hook 對本批他張 note 0 撞；hook 與自己 note 0 共用 4-gram（All India Radio「封城期間」已把 hook 改成「封城時」）。對 `desc-tools/batches/hooks/add-202611*` 全部既有 hooks（hook＋note）掃出 3 處，hook 全改歸零：「為了一張」（ml64 Sounds From the Ground）→ Hungry Lucy 改「替…致敬盤做曲」；「封城期間」（ml64 El Búho）→ 改「封城時」；「手持錄音機」（ml61 Solar Bears）→ 改「多種取樣器」。開頭前四字全批互異，也不與既有 add-202611* hooks 開頭相同。hook 無「這張專輯」開頭、無你我、無分數星等、句末皆全形標點。
- **24319** 腳本：`node qa-batch.mjs hooks add-20261106-md43` 全部通過；`node chk-hook-crossgroup.mjs add-20261106-md43` 全部通過（2 組 11 張；hook 加權 19–22、note 164–237）。
- **24320** 給寫作層：WMD 的心理健康段照 note「語氣克制」，正文以作者自述口吻轉寫、不加渲染；hook 的反問由 g2 收尾。boerd 與 ambientium 是本批最薄的兩張（boerd 只有標籤與曲序），依預算寫短即可。

## 寫作層（writer-1、writer-2）（24321–24330）
- **24321** 交件：`desc-tools/batches/output/add-20261106-md43-out-1.json` 5 張、`-out-2.json` 6 張，key 逐字同序。逐張（Array.from）：Between Interval 237、ASURA 227、All India Radio 231、Hungry Lucy 177（thin）、Soapkills 240；ambientium 178（thin）、Peter Bjärgö 239、Rabit 179（thin）、WMD 157（thin）、boerd 171（thin）、Andrew Tasselmyer 239。full 227–240、thin 157–179。初稿超帶 5 張（Between Interval 242、ASURA 249、Soapkills 253、Hungry Lucy 182、Rabit 187），一律整格捨去或縮子句：ASURA 改寫廠牌介紹句與日期句、Soapkills 縮 Groovebox 句與「那樣的」、Rabit 捨「全長約 32 分鐘」、Hungry Lucy 縮主唱句、Between Interval 捨「做太空音樂」與「從底下」。無掉下限。
- **24322** 腳本：`qa-batch out`（11 張與卡單相符、thin 全 ≤180、全部通過）、`qa-check-research` 兩檔標記 0、`fix-spacing` 兩檔待補 0。「據」「也就是」、資料平台名（Discogs／MusicBrainz／維基）、媒體名（Igloo、Chain D.L.K.、Wired、Pitchfork、Time、The Lifted Index、Lost Tribe Sound）grep 0；媒體榜單名次未寫。
- **24323** 禁用事實照辦：Hungry Lucy 不寫〈Blue Dress〉翻唱與 Alfa Matrix 重發；Bjärgö 不寫「本名」，只寫 2009 原盤＋2019 重發標時序；Soapkills 寫 2001、不寫廠牌；All India Radio、WMD、boerd 不寫廠牌；Tasselmyer 寫「多種取樣器」（hook）、不寫手持錄音機；ASURA／Bjärgö 的聲音與樣板定位分別以「Ultimae 介紹這張時」「公告裡說」帶出（hook 層 24313 指定之口，非轉述引導詞「據」）；Tasselmyer 只寫「在樂評聽來」不具名。note 未列的 facts（封面畫家、曲長清單、黑膠、卡帶、後續作品、澳洲／新冠字樣）一律不寫。
- **24324** 第二句句型全照 24316：掛著…這個名號／…替自己取名…／…創立的專案，唯一固定成員是他／A 編程製作、B 唱歌寫詞／同姓但非親戚／捷克的…替這張寫的／身兼這兩個計畫／早年做…／…在…的個人電子計畫／…的藝名／…出身、現居…的。hook 代稱具名：Hungry Lucy 第二句收「被找來的主唱正是 Belle」；Soapkills「散掉的是 Zeid 的搖滾團 Lombrix」；WMD 反問由心理健康低谷與找回創作收尾（語氣克制、作者自述轉寫）；ASURA 序曲具名〈Overture〉9 分 55 秒。
- **24325** 「日」後一字偏離 24317 配表（可逆；照表的形狀對 `add-202611*` 既有 out 撞 3 張以上：年月日交 9、年月日以 7、年月日問 5、年月日先 5、年月日經 8、年月日放 4、年月日發 5、年月日上 8、年月日推 8）。定稿「日」後一字：Between Interval 現、ASURA 當、All India Radio 終、ambientium 率、Bjärgö 九、Rabit 專、WMD 公、boerd 掛、Tasselmyer 釋；Hungry Lucy、Soapkills 只寫到年。日期前一字也錄下：Between Interval 行、ASURA 比、All India Radio 首、ambientium 種、Bjärgö 日（出廠日）、Rabit 長、WMD 果、boerd 摩、Tasselmyer 它（原「發行日」與 Bjärgö 撞「日年月日」後改）。
- **24326** 自掃（han() 中文 4-gram；對象：out-1／out-2 互掃＋`desc-tools/batches/output/add-202611*` 全部既有 out）：兩檔互撞只剩樂種「太空音樂」（Between Interval／ASURA 各一，2 張）；3 張以上只剩地名（斯德哥爾摩、巴爾的摩、「在波特蘭」＝WMD 第二句指定句型＋地名）與 hook 原文（boerd「七首曲子」「一路走到」、Tasselmyer「鋼琴弦樂與」，寫作層不改 hook）。途中整詞拆掉：首約分鐘（×3 本批）、的第一張（Soapkills／Bjärgö）、多半只有（AIR／Rabit）、首合計分、是年月日、年月日它、日年月日、第五張專輯、的第四張、國作曲家、的作曲家、開場的長分秒、重新詮釋、首張專輯、在年發行、自行發行／自己發行、樂團之一、個人專輯、分鐘上下、分鐘左右、交由發行、時間是年、最長的有、其中最長、最後一首、長達分秒、製作人的（跨句黏合）、樂評形容、母帶交給、合成器和。
- **24327** 可逆小判斷：Soapkills「自行發行」寫成「自主發行」（避 4-gram，意義同）；Bjärgö「第一張個人專輯」寫成「個人作品的序號從《…》開始」、「往後個人作品」寫成「往後單飛作品」；All India Radio「電子樂專案」寫成「專案」（hook 已有「電子專案」）；ASURA「法國作曲家…人在里昂」併為「這位作曲家住在法國里昂」。主線審稿可再看。

## 主線審稿（24331–24332；2026-11-06）
- **24331** 逐張審 11 張（out-1／out-2 全文印出，逐句對研究稿 a、b 與藝人補洞稿 ar-d-531）。改 3 張 3 處（直接改 out 檔；研究稿與 writer 輸入同步，hooks 未涉及）：
  - `Soapkills|Bater`：刪「屬於中東最早一批獨立樂團」。依據：只有 Soapkills 自己的 Bandcamp 簡介一源，屬自我評價；藝人介紹線同句也已不收。
  - `Hungry Lucy|Apparitions`：「在辛辛那提組成」→「在俄亥俄州組成」。依據：ar-d-531 補洞查到城市三說（維基未寫城市、校園報 Hamilton、Musicaldiscoveries 說兩人在辛辛那提認識），只寫州。
  - `ASURA|Radio Universe`：「這位作曲家住在法國里昂」→「法國作曲家」。依據：Bandcamp 地點標籤 Lyon 掛在 Ultimae 帳號下，是廠牌所在地；ar-d-531 補洞也查不到 Farewell 本人住哪。
  - 照准：Between Interval 寫 Stefan Strand（Bandcamp 簡介）；All India Radio 1997 塔斯馬尼亞（維基＋MB）；Rabit 三城寫成（Boomkat 文案，正文未掛媒體名，寫成專輯事實）；Peter Bjärgö「定下往後單飛樣板」寫成 Cyclic Law 公告的說法；寫作層日期「日」後一字偏離鉤子表（24327 自述，可逆，照准）。
- **24332** `qa-batch out` 11 張全部通過；「據」、媒體名、資料平台名 0。三軸 `ratings-override.json` 11 張全依 §0.8.1 人工錨點：經典 3／4＝9／2（Last.fm 逐人查過專輯排序，9 張都不是該藝人最多人聽的那張或是新作，不是失準）、冷門 3／4＝2／9、硬蕊 2／3＝4／7。頂點 0（無殿堂／遺珠／異端證據）。試聽 Apple 自動配對 10 ready；ambientium us／jp 查無 → unavailable。封面 CAA 11／11，縮圖表目視與盤名相符。

## 上線與評分（主線，2026-11-06）（條號 24333–24334）
- **24333** 上線 11 張：寫入前對 origin 所有 `claude/*` 分支的 seed 與卡單去重 0 撞；card_catalog 11／11、KV 11 鍵回讀逐字一致（stamp 20261106md43）、試聽 10 ready／1 unavailable（最紅那首換 9 張）、seed +11、published gate 0 error。藝人介紹 ar-d-531 寫 8／不寫 1（WMD）。
- **24334** Opus 1 支打 11 張（`batch-progress/mood-axes/score-md43/`），主線看過未改值。**落格 10／11＝91%**；出格 Soapkills《Bater》z +0.3 判暖落恍惚（阿拉伯語女聲旋律清楚，研究層已標弱汰）。貼邊：Hungry Lucy、Andrew Tasselmyer、WMD z −0.2，ambientium z −0.3。
