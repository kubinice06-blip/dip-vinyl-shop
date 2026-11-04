# 研究層補充（s10：流亡 ad-19、ad-20）

先完整讀 `prompt-research-extra-s7.md`（流亡節）與 `prompt-research-extra-s8.md`，照做。另加：

- **status 塊分兩半查，每半至少 1 條 fact**：(1) 為什麼少有人聽（私壓、壓量——有出處才寫張數、卡帶／demo、地方小廠、沒再版、樂團早散、只在某地流通）；(2) 為什麼值得聽（後來哪個廠哪年重新發行、被誰點名或收錄、收藏圈怎麼看、它做到了什麼）。
- 本批來源指引：
  - 日本噪音（Incapacitants、K2、MSBR、Pain Jerk、ASTRO、ハナタラシ、灰野敬二、光束夜、高柳昌行）：日文維基、Japanoise 專書（David Novak《Japanoise》、Paul Hegarty《Noise/Music》）、Halana、The Wire、Quietus、Aquarius Records、Discogs notes、廠牌頁（Alchemy、Pinakotheca、Endorphine Factory、PSF、Self Abuse、Tochnit Aleph 等）。
  - 日本爵士／自主民謠（八城一夫、北村英治、モア、真芽正恵、Maher Shalal Hash Baz）：日文維基、日文廠牌頁與部落格、再版廠（Think! Records、P-Vine、Super Fuji、Aguirre、Organ Of Corti、Studio Mule）、ディスクユニオン商品頁（事實可用、形容詞是文案）。
  - 沖繩／八重山民謠（山里勇吉、古謝美佐子）：日文維基、琉球新報、沖縄タイムス、Respect Record 等。
  - 台灣（1976、夾子電動大樂隊、Plainsunset）：中文維基、StreetVoice、金曲獎官網（入圍／得獎分清楚）、台灣樂評與媒體訪談（GQ、關鍵評論網、BIOS monthly、Blow 吹音樂、聯合報、自由時報）。
  - 紐約硬蕊 demo（Krakdown、Vision of Disorder、Bulldoze、Gorilla Biscuits、108）：維基、團員訪談、No Echo、Revelation／Equal Vision 等廠頁；demo 是否後來正式發行要查清。
  - 英國自由即興（SME、Howard Riley、Han Bennink、Bailey、Company、Oxley、Barry Guy、Alterations、Lytton）：Incus、Emanem、FMP、ICP、Ogun、Jazz in Britain、Cuneiform 頁、The Wire、Free Jazz Collective、Point of Departure、European Free Improvisation Pages（efi.group.shef.ac.uk）。
  - 牙買加／Wackies 系（Wayne Wade、Tyrone Evans、John Holt、Alton Ellis）：Basic Channel／Wackies 再版頁、維基、reggae 史料站、David Katz 等具名作者。
  - 黑暗氛圍／工業（Moljebka Pvlse、Hall of Mirrors、Organum、Duncan & Springer、Maurizio Bianchi、Deathprod）：Cold Meat Industry、Small Voices、Rune Grammofon、廠頁、Brainwashed、Heathen Harvest、The Wire。
- **Discogs API 可用**：`https://api.discogs.com/releases/<id>`、`/masters/<id>`、`/database/search` 需 token 不可用，但 releases／masters／artists／labels 直接 GET 可讀（UA 照規定）。網頁版 discogs.com 對代理常 403，改用 API。MusicBrainz API（`https://musicbrainz.org/ws/2/...?fmt=json`）也可用。這兩個不耗 WebSearch。
- **Discogs 收藏統計（have／want）不要寫成數字 fact**；可以在 notes 寫「想要數遠高於擁有數」供寫作層寫質性敘述。
- 只查到單一版本時，寫「沒有再版紀錄」，不要寫「從未再版」。
- 年份兩說時兩說都記，寫進 notes。
- **暫存檔一律放你自己的子目錄**：`/tmp/claude-0/s10-{BATCH}-{G}/`，不要用共用的 /tmp 檔名（s8 兩支代理撞檔過）。
- **你這支最多 25 次 WebSearch。**
