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
