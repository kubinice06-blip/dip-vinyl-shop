## 2026-09-03 — dip-vinyl-shop — c-70 策展提案（深掘：日本 1980s indie 廠牌 1978–90）

- **改動摘要**：`batch-progress/c70/prop-a.json`（27 張）與 `batch-progress/c70/prop-b.json`（19 張）定案，
  合計 **46 張、43 位藝人**（EP-4、Katra Turana 各 2 張同在 a 組；少年ナイフ跨 a／b 組 2 張），
  `lineType: 深掘`，合輯 0 張，§5.5 asia-mini-album EP 1 張（Non Band）。年份 1978–1990。
  本次是容器重啟後的續跑：兩檔內容承接前一支代理的定案（快照 `026ea4c`），逐張複核、補齊 Non Band 的 §5.5 欄位、
  修 `chk-prop.mjs` 讓 §5.5 EP 卡走與 §5.6 同等的舉證檢查（原本會把例外欄位標成「非合輯卻帶例外欄位」）。
  - a 組＝1978–86 地下 new wave 廠牌 27 張：ヴァニティ（阿木譲，大阪）**10** ＝ LP 系列 vanity 0001–0009 全部
    （Dada、SAB、Aunt Sally、あがた森魚、R.N.A. Organism、Sympathy Nervous、BGM、Normal Brain；**Tolerance 在池不收**）＋
    1981 卡帶系列 VAT 2 捲（Salaried Man Club、Den Sei Kwan，MB 標 Album）；
    テレグラフ（地引雄一，東京）**9**（EP-4《Multilevel Holarchy》、Auto-Mod、Katra Turana ×2、Pablo Picasso、Bananarians、
    のいづんずり、Lizard、Non Band）；Zero（京都）3（少年ナイフ、Ché-SHIZU、須山公美子）；Pass 1（突然段ボール）、
    ADK 1（Gauze）、Political 1（ザ・スターリン《trash》）、Ugly Orphans 1（じゃがたら《南蛮渡来》）、
    EP-4《Lingua Franca-1》原盤 Columbia 但企劃出自京都地下場景（第 47 條形狀）。
    ピナコテカ本身在 MB 上只有 7 吋與合輯建檔，LP 級對象（EP-4、Ultra Bidé）已改由 Columbia／Telegraph 線收。
  - b 組＝1984–90 indie 廠牌 19 張：キャプテン **6**（The Willard、吉野大作＆プロスティテュート、パパイヤ・パラノイア、Lip Cream、
    メトロファルス、JUN SKY WALKER(S)）＋ Captain 承接再版的遠藤ミチロウ《ベトナム伝説》（原盤 JICC出版）；
    ナゴム 2（人生、木魚；**有頂天、筋肉少女帯、たま 在池不收**）；Transrecords 3（YBO²、Asylum、Z.O.A）＋ SSE 1（黒百合姉妹）；
    Wax 2（カーネーション、FRICTION《Replicant Walk》）；Zero 後期 2（少年ナイフ《Pretty Little Baka Guy》、After Dinner）；
    positive punk 自營廠牌 2（City Rocker：Madame Edwarda；Wechselbalg：G-Schmitt）。**不碰 noise／PSF／Alchemy 線**
    （Ché-SHIZU 原盤在 Zero，再發方才是 Alchemy，不因再發方排除）。
  - 再發舉證：Studio Mule、Mesh-Key、WRWTFWW、Kyou Records、EM Records、Belle Antique、TAL、Super Fuji Discs（Disk Union）、
    Solid、Ultra-Vybe、SS Recordings、Wax 2016 黑膠復刻、Oglio、Aguirre 等；Discogs 版本頁逐張看過，
    「Vanity Records (9)」名義的卡帶／黑膠與智利、愛沙尼亞卡帶等 Unofficial 一律不採（第 43／57 條）。
    再發舉證較薄的 3 張（吉野大作、メトロファルス、G-Schmitt 只有原廠牌自家再版或廠牌史）已在 `risk` 標錨點 3–4 分。
- **主要檔案**：`batch-progress/c70/prop-a.json`、`batch-progress/c70/prop-b.json`、`batch-progress/c70/chk-prop.mjs`（§5.5 EP 檢查）、
  `batch-progress/memory-entries/c70-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c70/chk-prop.mjs a b` → 46 張、43 位、**標記 0**（含跨批去重 16 批 703 張 0 撞）。
  46 張全部釘住 release-group MBID，本次續跑再逐一回問 `release-group/<id>?inc=artist-credits` 一次：
  45 張 primary-type=Album、Non Band 為 EP（§5.5，`genreException: asia-mini-album`，證據 Discogs release 3584833 原盤 10" Album、
  10110615 TAL 12" Album）；Z.O.A 首輪 503 後單獨重查確認（第 28 條）。標題與 artist-credit 全部相符
  （MB 全大寫／U+2010 連字號／片假名 credit 的差異已在各卡 `risk` 記下，卡片用 ASCII 與 MB 實體文字，第 6／70／120 條）。
  對照組（Dada 1981 同名別團、Sympathy Nervous 1996 同名、EP-4 兩張 Lingua Franca EP、Katra Turana《THE END》EP、
  Pablo Picasso《Types 1981-1985》、Non Band 現場輯、R.N.A.O《Unaffected Mixes ±》、人生《Substance》、Z.O.A 兩張 EP、
  FRICTION 2007 重製 RG、少年ナイフ《+ Live in Japan》）皆在 `mbNote` 明寫刻意不釘。
  `seed_cards.json` 全 13,913 列實掃（假名／漢字／羅馬拼音三種寫法）：43 位藝人皆未達 3 張上限——
  あがた森魚 已有 2 張（本卡收後達 3，同批不得再提）、ザ・スターリン 1、じゃがたら 1、FRICTION 1（鍵為全大寫，本卡沿用），其餘 0。
  年份與 MB `first-release-date` 脫鉤 5 張（Auto-Mod、Bananarians：MB 只建再發；The Willard：MB 無日期；Gauze：MB 1984 vs Discogs 原盤 1985；
  FRICTION：MB 1989 vs Discogs 原盤 1988），依第 95／127 條取 Discogs 原盤年，`risk` 已標。
  自我同名卡 4 張（Aunt Sally、Sympathy Nervous、Katra Turana、Non Band）Apple 日本 storefront 皆查得到完全相等的條目
  （Sympathy Nervous 帶「(Remastered)」、Non Band 帶「- EP」尾綴，第 90 條）。
  Apple 抽驗 46 張：**23 張查得到條目、23 張查無**（試聽預估 50%）；封面預估 CAA 有再發版的約 35 張，
  Vanity 卡帶系列、Pablo Picasso、The Willard 等約 10 張要靠掃圖。
- **未收清單**（本次續跑逐項回問 MB／Discogs／Apple 核過）：
  **原盤不在本批廠牌線**——Ultra Bidé《The Original Ultra Bidé》（MB 6e4354f3… Album 1984，但原盤是 Alchemy ARLP-001，
  屬 c-60 交接說的 Alchemy／noise 線，本批不碰；ピナコテカ只出過他們的 7 吋）、Wha-ha-ha《死ぬ時は別》《下駄はいてこなくちゃ》
  （MB 兩張 Album 1981，原盤 Better Days／日本コロムビア YF-7018-AX，非獨立廠牌；ピナコテカ只出過 7 吋）；
  **MB 無 Album 級 RG**——Perfect Mother（Vanity 只出 7 吋，MB 只有 Single）、Sadato（MB 0 筆）、
  空手バカボン（MB 只有 1983／1985 兩張 EP 與 2005 ナゴムコレクション合輯）、ばちかぶり（MB 只有 1985 EP《一流》、現場輯與合輯）、
  カステラ（MB `artist:` 查 0 筆）、Kenzi & The Trips（Captain 時期在 MB 只見 Single 級；1988 Album 的廠牌回問時 MB 503，未定案）；
  **在池不收**——Tolerance《Anonym》（池中已有；同實體 1981《Divin》亦不收）、有頂天、筋肉少女帯、たま、INU、Phew；
  **掛名無法對齊**——YBO²《Kingdom of Familydream》（MB／Discogs 掛「YHWH····Black Omen II」）；
  **同藝人第二張未挖**——Auto-Mod《Deathtopia》（MB 986dca1f… Album 1985；再發方為 Genet 自家 Wechselbalg，Official 標記未核）、
  Vanity 其餘 4 捲卡帶（VAT2／4／5／6）；**合輯**——ピナコテカ與 Disk Union 的 Telegraph 作品集一律不收。
- **場景飽和度**：池中日本 1980s 地下 new wave／indie 廠牌線原本只有 Tolerance、INU、Phew、Friction《軋轢》、ザ・スターリン《STOP JAP》與
  ナゴム三團各 1 張，**Vanity LP 系列、Telegraph、Captain、Transrecords／SSE、positive punk 整片為零**——本批補後這條線的骨幹已齊，
  剩下的（Vanity 卡帶、ナゴム二線、Captain 中後期）多為 MB 查無或無 Official 再發，再挖邊際效益低。
- **給本機上架的提醒**：`build-manifest.mjs` 目前不會把策展檔的 `genreException` 帶進 manifest `identity`，
  Non Band 那張要在本機補 `genreException: "asia-mini-album"`，否則 `verify-album-onboarding.mjs` 會擋 EP。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制；Vanity 卡帶兩捲、Pablo Picasso、のいづんずり、
  吉野大作 是冷門軸 5 分候選）、頂點資格評估、封面、簡介、固定試聽、Firestore／KV／`seed_cards.json` 寫入。
