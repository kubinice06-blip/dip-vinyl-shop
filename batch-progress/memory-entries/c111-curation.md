## 2026-09-06 — dip-vinyl-shop — c-111 策展提案（2024–2025 正典）

- **改動摘要**：新增 `batch-progress/c111/prop-a.json`（26 張）與 `batch-progress/c111/prop-b.json`（18 張），
  合計 **44 張、44 位藝人**（每位一張），`lineType: 廣度`。**2024 年 22 張、2025 年 22 張。**
  - **a 組＝2024–2025 英美與其餘西方正典**（26）：
    2024 十三張——MJ Lenderman《Manning Fireworks》、Waxahatchee《Tigers Blood》、
    Tyler, The Creator《CHROMAKOPIA》、Mk.gee《Two Star & The Dream Police》、
    Kim Gordon《The Collective》、Clairo《Charm》、Nick Cave & the Bad Seeds《Wild God》、
    English Teacher《This Could Be Texas》、Magdalena Bay《Imaginal Disk》、
    Beth Gibbons《Lives Outgrown》、Blood Incantation《Absolute Elsewhere》、
    Jack White《No Name》、Arooj Aftab《Night Reign》；
    2025 十三張——Geese《Getting Killed》、Wednesday《Bleeds》、Clipse《Let God Sort Em Out》、
    Turnstile《NEVER ENOUGH》、Hayley Williams《Ego Death at a Bachelorette Party》、
    Dijon《Baby》、Lorde《Virgin》、Blood Orange《Essex Honey》、Alex G《Headlights》、
    Stereolab《Instant Holograms on Metal Film》、Deafheaven《Lonely People With Power》、
    Ethel Cain《Willoughby Tucker, I’ll Always Love You》、ROSALÍA《LUX》。
  - **b 組＝2024–2025 日韓與華語正典**（18）：
    **日本 8**（柴田聡子《Your Favorite Things》／ZAZEN BOYS《らんど》／米津玄師《LOST CORNER》／
    折坂悠太《呪文》／星野源《Gen》／藤井風《Prema》／青葉市子《Luminescent Creatures》／石橋英子《Antigone》）、
    **韓國 4**（단편선 순간들《음악만세》／소음발광《불과 빛》／추다혜차지스《소수민족》／이찬혁《EROS》）、
    **台灣 5**（李竺芯《Suí 水》／呂士軒《好聲豪氣》／蔡依林《Pleasure》／張震嶽《跟著感覺走》／鄭宜農《圓缺》）、
    **香港 1**（林家謙《隱形色》）。**2024 九張、2025 九張。**
  - **合輯 0 張**（44 張全部 `primary-type=Album`、`secondary-types` 皆空，§5.6 一次都沒開，
    與裁定第 167 條一致）。
- **主要檔案**：`batch-progress/c111/prop-a.json`、`batch-progress/c111/prop-b.json`、
  `batch-progress/c111/rulings.md`、`batch-progress/c111/chk-prop.mjs`（由 c102 複製改批號）、
  `batch-progress/memory-entries/c111-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c111/chk-prop.mjs` → 44 張、44 位、**標記 0**；
  跨批去重掃到 56 批（其中 5 批讀 prop）、2,579 張卡，**跨批撞卡 0**。
  **44 張全部釘住 release-group MBID（100%）**，並逐一回問
  `release-group/<id>?fmt=json&inc=artist-credits+releases` 與
  `release?release-group=<id>&inc=labels&limit=100` 確認 `primary-type=Album`、`secondary-types` 為空、
  artist-credit、轄下 release 的國別／status 與廠牌欄（第 41 條）；
  藝人 MBID 名下的 release-group 數一律用 `release-group?artist=<MBID>&limit=100&offset=` 分頁全列（第 116 條）。
  **另實掃 `seed_cards.json` 全 14,424 列**，把池中 `year=2024` 的 94 張與 `year=2025` 的 86 張
  （合計 180 張）全部列出來逐一比對——**與線上池撞卡 0**。
- **這批立的裁定**：見 `batch-progress/c111/rulings.md`（9 條）。重點三條：
  **東亞線用獎項名單（第 22／23 屆한국대중음악상、第 36／37 屆金曲獎）代替年終榜**；
  **MB artist-credit 是羅馬字時卡片仍寫漢字**（石橋英子＝Eiko Ishibashi、藤井風＝Fujii Kaze）；
  **珂拉琪《Deus Ex Machina》與 c-91 撞批，換成林家謙《隱形色》**（順帶把 b 組從日／韓／台擴成日／韓／台／港）。
- **留給本機的事**：(1) `audits/pool-artist-name-splits.md` 的 09-06 續補**漏了兩組併寫分裂**
  （`魏如萱 waa wei`、`美秀集團 Amazing Show`）；(2) `落日飛車` 的三張要先正規化成純漢字，
  否則 c-112 收《Quit Quietly》會製造第四個鍵；(3) **⚠ 44 張的冷門軸全部失真**（新譜 Last.fm listeners
  還沒長起來），三軸一律人工看，不要照 `/album-rating` 收。
