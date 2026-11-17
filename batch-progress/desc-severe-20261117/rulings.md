# desc-severe-20261117 裁定與審稿紀錄

## 第 0 步：全卡池判定（s1，2026-11-17）

- 範圍：KV 讀出 22,302 張（`dump-descs.mjs`），seed 無 tier 的一般卡 **21,523 張**（desc2 20,986、desc4 537；無簡介 0）。
- 切 72 份（按 key 排序、每份 300），Sonnet 子代理照 `prompt-triage.md`（general-desc-base 第一節＋apex-desc-base 七條 codes＋sample-400 的 16 則判例）判，工具 `tools/tri.mjs`（每 50 張併入一次，中斷自動接續）。
- **結果：severe 2,963（13.8%）／rewrite 13,711（63.7%）／keep 4,849（22.5%）**。明細 `triage.json`，分片 `triage/triage-NNN.json`。
- **與抽查樣本對照**：sample-400 落在已判分片的 42 張，severe 7/7 一致、無 severe 被放過；keep→rewrite 8、rewrite→keep 3。severe 比例低於抽查推估（17%），因派工詞明訂「身分、故事、聲音三者都缺才是 severe」，比抽查時嚴。
- **主線抽查**（種子 20261117 隨機）：severe 40 張逐張讀，40 張都是軌序／曲長／盤號／版本／credit 為主、沒有聲音與概念，判準無誤。keep 40 張中約 8 張是冷知識或懸念開頭（坂本龍一《Thousand Knives》「首刷 500 張退回 498 張」、Mastodon《Crack the Skye》等），照 general-desc-base 應屬 rewrite——**keep 偏鬆約兩成**，不影響本線（本線只修 severe），rewrite 另案時以「keep 也要再篩」處理。
- CJK 卡 severe 比例明顯偏高（066–072 七份純 CJK 分片 severe 約 25–35%，其他分片約 10–15%），舊 CJK 研究層最常只查 MB／Discogs。
- 過程事故：028 那支代理第二次 add 時把第 50–99 張用 0–49 的 i 送出，覆蓋前 50 張，代理自己發現並重判補正；之後 `tri.mjs add` 加了覆蓋警示，派工詞加「i 用方括號編號」。

## 切批（主線裁定）

- **sd-001、sd-002 提前鎖定**（`locked.json`）：純 CJK 分片 066–072 與 060–065 判完時就先切出這兩批開工，不等全卡池判完；其餘 CJK 分片零星的 severe（每份 0–17 張 CJK）後來才進來，若經典度更高會排在 sd-003 之後。可逆、不影響範圍，只影響順序。
- 全部 severe 2,963 張 → **99 批**（sd-001～sd-099，最後一批 23 張）：中日韓台 539（sd-001～sd-018）→ 經典度 ≥4 999 → 其餘 1,365。同類內按藝人聚在一起（藝人以其最高經典度排序）。`batches.json`、`batch-table.md`。

## sd-001（30 張，CJK：The Stalin、光田康典、古代祐三、富樫雅彦 16 張、植松伸夫、菊田裕樹、김현철、장필순、1976）

- 研究：3 支 Sonnet，WebSearch 9＋15＋10＝34 次。富樫雅彦多張只查得到店家介紹與 Organic Music／HHV 的描述，sound 多為 thin；武田和命《Gentle November》sound none（薄寫 150 字）。
- 寫作：2 支 Opus。派工詞加註「富樫雅彦 16 張每張聚焦自己的編制與場合，受傷背景最多半句」。
- 機器 QA：字數 150–240，薄寫 2 張（《モーション》175、《Gentle November》150）；「双」「会」是日文專名（《双晶》、生活向上委員会大管弦楽団），非簡體殘留；fix-spacing 0；全文無軌序／曲長／盤號。

### 主線審稿（2026-11-17，逐張 30 張，改 5 處，改動檔 `review-sd-001.json`）

| key | 原句 → 新句 | 依據 |
|---|---|---|
| 古代祐三\|bare knuckle | 「據稱影響了」→「常被認為影響了」 | 「據稱」語氣含糊；en.wikipedia Streets of Rage 有出處 |
| 植松伸夫\|ファイナルファンタジー vi | 刪「曾被評為史上最好的電玩原聲帶」 | 單一樂評人（Soundtrack Central）說法，當封號用 |
| 植松伸夫\|ファイナルファンタジー vi | 刪「〈Dancing Mad〉則被形容為鍵盤上寫出最非凡的音樂之一」，下句改「〈Terra's Theme〉、〈Dancing Mad〉與這首歌劇曲」 | 單一樂評人（RPGFan）讚語當封號 |
| 김현철\|김현철 vol.1 | 「2007 年《京鄉新聞》等選出的」→「2007 年的」 | 出處不寫進簡介，榜單名本身是事實 |
| 장필순\|나의 외로움이 널 부를 때 | 刪媒體名；100BEAT 榜單改「也常被列為 1990 年代最好的韓國專輯之一」 | 出處不寫進簡介 |

逐張四問其餘無改：第一句都講出是什麼唱片（原聲帶四張第一句點出遊戲名；《超時空之鑰》《太空戰士》用台灣通行舊譯名）；地位宣稱（The Stalin「日本最早的硬核龐克之一」Punknews、《双晶》「代表搭檔」Organic Music、ActRaiser「突出之作」ja.wikipedia 植松稱讚）都對得回 facts；無修辭封號。

### 上線

- KV：`kv-token-check` exit 0；舊值 `kv-before-sd-001.json`；desc2＋desc4 共 60 鍵（全為 CJK 卡）`wrangler@4 kv bulk put --remote` Success；bulk get 回讀 **60/60 逐字一致**；`front-check` **前台 30/30 新稿**。
- onboarding manifest 同步 30 處（15 個檔）。

## sd-002（30 張，CJK：1976、Crying Nut、deca joins、DSPS、ECD、傅聰、Tizzy Bac、台灣合輯三張、Wha-ha-ha、ゆらゆら帝国、りんけんバンド 5 張、ディラン系、シバ、チコ本田、ノヴェラ、上野好美、中村達也、丸山繁雄）

- 研究：3 支 Sonnet，WebSearch 16＋15＋19＝50 次（工作階段累計含主線約 85 次）。資料普遍薄：台灣獨立樂團多只有團體層級描述，りんけんバンド 三張 story／sound 為 none，シバ sound none。
- **留置 1 張：Various Artists《少年ㄞ國》**（角頭 2001 合輯）——研究層三塊全 none，主線補查一次 WebSearch 也查不到這張合輯本身的資料，舊簡介的收錄名單無法查證。照 general-desc-base「真的只查得到曲目表的薄寫」都做不到，不寫；KV 保留舊稿，留給之後有人工資料時再補。
- 寫作：2 支 Opus，29 張。薄寫：りんけんバンド《ゴンゴン》180、《チェレン》187、シバ《青い空の日》（無聲音段）等，主線裁定照收——比舊稿的曲長、盤號強，且沒有拿雜項湊。
- 機器 QA：「国」「来」為專名（ゆらゆら帝国、風来坊）；《アジマァ》的半形括號是原曲名〈エイサー(月ん夜ぬ下)〉，原文不改。

### 主線審稿（2026-11-17，逐張 29 張，改 5 處，改動檔 `review-sd-002.json`）

| key | 原句 → 新句 | 依據 |
|---|---|---|
| crying nut\|서커스 매직 유랑단 | 「김인수的鍵盤」→「金仁洙的鍵盤」 | 寫作層憑記憶補韓文名；照研究稿（ko.wikipedia） |
| crying nut\|서커스 매직 유랑단 | 「約 30263 張」→「約三萬張」 | 精確到個位像雜項（en.wikipedia Crying Nut） |
| deca joins\|在這裡停一下 | 刪「第三張專輯，距離第二張《鳥與倒影》已有六年」 | 研究稿另有 2023《暗流》，張數與間隔互相衝突 |
| various artists\|反中國併吞 | 第一句補出盤名；刪「由國家搖滾聯盟等主辦」（補名後超字） | 第一句要講出這是什麼唱片 |

其餘逐張無改：傅聰「第一位獲得國際肯定的中國鋼琴家」照研究稿 notes 改用英維基措辭；Wha-ha-ha 兩張沒寫「首張」與「打擊只有一人」；《LOCUS》採 BBE 的現場說法。

### 上線

- KV：`kv-token-check` exit 0；舊值 `kv-before-sd-002.json`；29 張 58 鍵 Success；回讀 **58/58 一致**；`front-check` **前台 29/29 新稿**。
- onboarding manifest 同步 29 處。
