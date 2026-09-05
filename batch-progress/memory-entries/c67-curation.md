<!-- 雲端依 REMOTE_RUNBOOK 不動 PROJECT_MEMORY.md（裁定第 74 條）。
     這是 c-67 策展代理寫好的條目，由本機貼進 PROJECT_MEMORY.md 最上方。
     貼的時候依 CLAUDE.md：不要整檔提交，用 git show HEAD:PROJECT_MEMORY.md 為底只插這一筆。 -->

## 2026-09-03 — dip-vinyl-shop — c-67 策展提案（深掘：日本自主爵士小廠 1975–88）

- **改動摘要**：新增 `batch-progress/c67/prop-a.json`（21 張、16 位）與 `batch-progress/c67/prop-b.json`（15 張、15 位），
  合計 **36 張、31 位藝人**，`lineType: 深掘`，全部 `releaseType: Album`、**合輯 0 張**。
  a 組是續跑前已定案的 21 張（Johnny's Disk 3＋大槌ジャズファンクラブ 1、Aketa's Disk 10、
  A.S. Cap 1、ALM 4、Offbeat 1、Nadja 1）；b 組是本次補完的 15 張：
  Frasco 5（板橋文夫トリオ《Toh》、土岐英史《Sky View》、武田和命《Gentle November》、
  古沢良治郎カルテット《You Wanna Rain》、安田南《Some Feeling》、森山威男《Full Load》——含 Full Load 為 6）、
  Union Jazz 1（森山威男カルテット《My Dear》）、Whynot 1（辛島文雄《ピラニア》）、Nadja 1（菅野邦彦《Opa! Brasil》）、
  Aketa's Disk 1（つのだひろと体力バンド《サマー・サンバ》）、
  BBE J Jazz Masterclass 挖出的私壓 5（Smile《Stop Over》、Yupiteru《Kemo-Sabe》、Red Horison 寺川秀保、
  Sea Horse 中村達也《LOCUS》、Mobys 早坂紗知《Free Fight》）。
- **主要檔案**：`batch-progress/c67/prop-a.json`、`batch-progress/c67/prop-b.json`、
  `batch-progress/memory-entries/c67-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c67/chk-prop.mjs a b` → 36 張、31 位、**標記 0**（跨批去重：18 批 794 卡，撞卡 0）。
  36 張全部釘住 release-group MBID 並逐個回問 `release-group/<id>` 確認 primary-type=Album 與標題（第 41 條）；
  b 組 15 位藝人在 `seed_cards.json` 全 13,913 列實掃（假名／漢字／羅馬拼音三種寫法）皆未達 3 張上限，
  其中森山威男池中 1 張＋本批 2 張（兩種掛名）＝3 剛好到上限。
  盤名跨語言／跨字元的都在 `risk` 寫了羅馬拼音或英文名（第 49 條）：《ピラニア》＝Piranha、《サマー・サンバ》＝Summer Samba、
  《Toh》＝濤、《Kemo-Sabe》原 RG 標題用 U+2010 連字號（已改 ASCII）。
- **釘不住 MB 而未收**（這 20 批不開 §1 人工身分路線）：
  Johnny's Disk 其餘 9 張全數查無——中山英二《My Present Song》(JD-02)、小栗均トリオ《みどりいろの渓流》(JD-06)、
  板倉克行《海猫の島》(JD-07)／《Honey Samba》(JD-12)、園田まゆみ《午後3時の秋》(JD-08，Studio Mule 2019 復刻)、
  キングコングパラダイス《あつさもさむさも》(JD-09，Studio Mule 復刻)、中村ヨシミツ《魂のギター》(JD-10)、
  平岡睦男《Johnny My House》(JD-11)、Lee Won Hui＋菊池コージ《Grow》(JD-13)、
  **三上寛・古澤良治郎《職業》(JD-16，Solid／Ultra-Vybe 三次再版、Apple 有條目，MB 三上寛名下 36 個 RG 無此張——最可惜的一張)**。
  Aketa's Disk：丸山繁雄《A Young Father's Song》、初山博《スマイル》、小田切一巳トリオ《突撃神風特攻隊》、
  清水末敏メレンゲ《Hot Cake Mix》、元岡一英《Dosanko Walk》。
  Nadja：高木元輝＝加古隆《Jazz à Maison de Japon》、沖至《しらさぎ》、豊住芳三郎《Message to Chicago》、
  渋谷毅《Dream》、中村達也《Song of Pat》、藤井貞泰《Prelude to a Kiss》、菅野邦彦《Live!》。
  Whynot：片岡輝彦《Love Walking》。Union Jazz：大井貴司《Good Vibration》、岡野等《Double Image》等 6 張。
  Frasco：国仲勝男《Warm Current》、Jam Rice Sextet；ALM：板橋文夫《Rise and Shine – Live at the Aketa's》（Studio Mule 2019 復刻）。
  Miyasaka + 5《Animals Garden》（ALM 1979，BBE 2019）：RG 2d4073c5… **primary-type 空**，不符 §1，未收。
- **再發不足或形狀不符而未收**：坂田明トリオ《Counter Clockwise Trip》（Frasco 1975，零再發、CAA 與 Apple 皆無）、
  池田芳夫／高瀬アキ《Esprit》（只有 Teichiku 自家再版、無封面無試聽）、高木元輝／土取利行《Origination》與《Kozan》（零再發）、
  安田南《South》（King 系再版）、どくとる梅津Diva《Diva》（NEC Avenue）、Yoshio Ikeda Quintet《Sketch of My Life》（Seven Seas／King）、
  Aki Takase Trio《Song for Hope》（Enja）、Toshiko Akiyoshi《1980 in Rikuzentakata》（2014 出土 CD）。
- **與池中撞卡／上限而未收**：中山英二《Aya's Samba》《North Plain》、Tohru Aizawa《Tachibana Vol. 1》、Shintaro Quintet《Evolution》、
  Koichi Matsukaze《Earth Mother》、福居良《Scenery》皆已在池；明田川荘之（本批已 3 張）、峰厚介（4）、鈴木勲（5）、今田勝（5）、
  山本剛（10）、富樫雅彦（3）、高柳昌行（4）已達上限，Masaru Imada《Planets》、Noriko Miyamoto／Isao Suzuki《Push》因此不收。
- **封面與試聽預估**：b 組 CAA 有 front 10／15，CAA 404 但 Apple 有圖 3（《Opa! Brasil》《Stop Over》《Free Fight》，可循 collectionId 補救），
  **兩者皆無 2（《Gentle November》《You Wanna Rain》，留置機率高）**；Apple jp 有條目 9／15，
  Frasco 的 UCCJ 再版系列似未上數位平台，《Sky View》《Gentle November》《You Wanna Rain》《Some Feeling》《Full Load》與《ピラニア》試聽預估 unavailable。
  a 組依卡單 `risk`：CAA 有 front 8／21，試聽預估 unavailable 7／21。全批無自我同名卡。
- **場景飽和度**：Johnny's Disk 本身在 MB 上只釘得住 5 張（池中 2＋本批 3），**其餘 9 張 MB 查無、這條線在資料面已到底**；
  Aketa's Disk 與 ALM／Nadja 周邊本批收滿，Frasco 還有山下洋輔系（非冷門）未動；
  BBE J Jazz Masterclass 系列挖出的私壓已全數在池或本批，**日本自主爵士小廠這個場景在池中接近飽和**，
  剩下的空洞集中在 MB 沒建檔的 Johnny's Disk 後期盤與 Nadja 的日本人領銜盤。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（§0.8 錨點制）、頂點資格評估、封面、簡介、固定試聽、
  Firestore／KV／`seed_cards.json` 寫入。**不動 git。**
