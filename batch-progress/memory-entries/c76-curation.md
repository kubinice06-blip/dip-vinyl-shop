## 2026-09-04 — dip-vinyl-shop — c-76 策展提案（深掘：沖繩民謡／島唄　＋　日本環境音樂二線）

- **改動摘要**：新增 `batch-progress/c76/prop-a.json`（12 張）與 `batch-progress/c76/prop-b.json`（20 張），
  合計 **32 張、24 位藝人**，`lineType: 深掘`。
  - a 組＝沖繩民謡與島唄 1978–95（目標 1960–95，MB 的實際下限是 1978）：
    ネーネーズ 3、りんけんバンド 2、喜納昌吉&チャンプルーズ 2、大工哲弘 1、我如古より子 1、
    Condition Green 1（コザ 基地搖滾）、Diamantes 1（Bad News Records BN-001）、
    Various Artists 1（マルフクレコード《沖縄民謡名選集》，走 §5.6）。
  - b 組＝日本環境音樂與ニューエイジ二線 1983–90：私家版與小廠（Sound Process 1、FGW 1、
    BIWA Records 2、Shi Zen 1、Newsic 2、Green & Water 2、無廠牌自主制作 1、ALM 1）、
    企業委託盤（三澤ホーム 1、鐘紡 1）、大廠的一次性企劃盤（Vap 1、Canyon 2、Yen 1、
    Music Interior／JVC 1、Alfa 1、Eastworld 1）。
- **主要檔案**：`batch-progress/c76/prop-a.json`、`batch-progress/c76/prop-b.json`、
  `batch-progress/c76/chk-prop.mjs`（沿用 c-74 版，批次名已為 c76）、
  `batch-progress/memory-entries/c76-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c76/chk-prop.mjs` → a 12 張 8 位、b 20 張 16 位，**標記 0**；
  串跑 `dedup-crossbatch.mjs` → **28 批（其中 3 批讀 prop）、1,405 張、跨批撞卡 0**。
  32 張全部釘住 release-group MBID，逐個回問 `release-group/<id>?fmt=json&inc=artist-credits+releases`
  確認 `primary-type=Album`、secondary-types 與轄下 release（第 41 條）；
  已另寫檢查程式確認「`mbNote` 裡第一個 MBID＝釘位且該 RG 為 Album」32/32 通過。
  藝人上限以 `seed_cards.json` 全 13,913 列精確鍵實掃，24 位皆未超過 3 張
  （尾島由郎、吉村弘、ネーネーズ、喜納昌吉&チャンプルーズ、浜瀬元彦五組剛好到 3）。
- **實掃抓到 chk-prop 看不見的三張跨文字系統撞卡**（裁定第 49／115 條的第六～八次應驗），
  全部已剔除：
  1. 広瀬豊《Soundscape 2: Nova》(1986) ←→ 池中 `Yutaka Hirose`《Nova》(1986)
     （池中用羅馬拼音掛名＋WRWTFWW 再發的縮短盤名，兩層都不同）——**広瀬豊在本組只有這一張，整位剔除**。
  2. 濱瀬元彦《Reminiscence》(1986) ←→ 池中 `浜瀬元彦`《Reminiscence》(1986)
     （**異體字撞卡：濱／浜**，MB 與 Discogs 用「濱」、池中用「浜」）。
     其餘兩張浜瀬元彦的卡已改掛池中一致的「浜瀬元彦」以免造出分裂鍵。
  3. 矢吹紫帆《からだは宇宙のメッセージ》(1987) ←→ 池中 `Shiho Yabuki`《The Body Is a Message of the Universe》(1987)
     （羅馬拼音掛名＋英譯盤名，兩層都不同）。
  做法：把每張提案盤名的羅馬拼音／英譯寫出來，以**盤名為主鍵**掃一次全池（第 71 條），
  掛名只當輔助。三張都是 `chk-prop` 的 key 函式（`toLowerCase` + 去非字母數字）判不出來的。
- **本次自行下的裁定**（依 2026-09-02 的裁定權下放，判準：有先例／可逆／卡住整條線）：
  - **嘉手苅林昌《嘉手苅林昌》(1965, マルフクレコード F-8) 不收**——CAA 回 200 但 Apple 三個
    storefront 皆無條目，屬 CURATION-BRIEF 第二節明訂的「自我同名且 Apple 查不到就不收」。
    這是整條沖繩線最該收的一張，**本機若願意接受 `previewStatus=unavailable` 的自我同名卡，可以直接撿回**。
  - **里国隆《奄美の哭きうた》(1975, Teichiku BH-1527) 不收**——CAA 404 且 Apple 無條目，
    封面解不出來，依 §4「抓不到可靠封面就停止該筆」。
  - **大工哲弘《ウチナージンタ》(1994, off note ON-1) 不收**——同上，CAA 404 且 Apple 無條目。
  - **Various Artists《Music of Okinawa》(1991, Seven Seas KICH-2025) 與
    《Traditional Songs of Okinawa》(1990, Victor VICG-3003) 不收**——前者 MB 轄下只有一筆
    **Pseudo-Release**（無 Official release），後者在 Discogs 上完全查無，兩張都湊不出 §5.6 要求的
    兩個「證明這張合輯本身重要」的證據網址（第 72 條：VA 卡唯一的把關就是 §5.6）。
  - **喜納昌吉＆チャンプルーズ 1977 年的自我同名首作不收**，改收 1991／1992 兩張——
    首作是被反覆復刻的正典，本線要的是同一個團在那之後被忽略的十年（第 47 條：判準是非正典不是自資壓片）。
  - **掛名跟隨池中既有寫法者兩組**：喜納昌吉&チャンプルーズ（池中半形 `&`，MB 全形 `＆`）、
    浜瀬元彦（池中「浜」，MB「濱」）——依第 121 條不製造分裂鍵。
  - **掛名不跟隨池中者一組**：矢吹紫帆依 §0.5 與第 70 條用漢字，池中那張 `Shiho Yabuki` 才是異常；
    **這一筆要記進 `audits/pool-artist-name-splits.md`**。
  - **年份與 MB 脫鉤一張**：吉川洋一郎《アクアクの夢》MB 記 1987（且該筆是 Pseudo-Release），
    Discogs master 1260363 底下四筆原盤壓片一致記 1988 → 取 **1988**（第 86／127 條）。
  - **盤名採再發／Discogs 寫法三張**：柴野さつき《Erik Satie (France 1866-1925)》（MB 用 en dash
    會踩 `chk-prop` 反模式，第 50／118 條）、宮下富実夫兩張採 Discogs 原盤的括號全名
    （MB 只寫《WAVE》《SILENT ECHO》，第 91 條）、矢吹紫帆《Forest Land》（MB 標題帶
    U+2044 分數斜線的長副題）。
  - **收兩張不屬於本組體例的碟並寫明**：Condition Green《Life of Change》(1978，コザ 基地搖滾)
    與 上野耕路《Music For Silent Movies》(1985，Yen Records 的默片配樂)。兩張的 `risk` 都已
    註明「行文不得把它說成民謡／環境音樂盤」。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面解析與寫入、簡介、固定試聽、Firestore／KV／`seed_cards.json`／`apex_pool.json` 寫入。
