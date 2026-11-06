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
