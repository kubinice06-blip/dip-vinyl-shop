# 類型遊戲：曲風分層計畫（兩層為主、第三層依資料開）

> 2026-09-04 店主指示：新增「類型遊戲」——選大類後逐層細選，最後挑到該類型的冷門專輯；
> 並研究該做兩層還是三層。本文件是研究結論與落地規格，承接 `GENRE_SUBTAG_PLAN.md`
> （搖滾 8 桶已建、rock 誤標修正 C 已於 2026-09-04 套用）。頂層十類與音樂地圖不動。

## 0. 研究方法與資料

- 把 13,913 張卡的 Last.fm 原始標籤（KV `mapgenre3:*` 的 `rawGenres`）整批拉下：
  **12,047 張有標籤（86.6%）**。各主類型覆蓋率：hiphop 98%、electronic／soul 96%、
  jazz 93%、rock 91%、folk 88%、world 78%、**classical 23%**（古典另議，見 §5）。
- 清掉年份／國籍／「favourite albums」等雜訊後，看每個大類底下標籤怎麼聚（第二層候選），
  再看搖滾 8 桶內部標籤能否再切（第三層候選），並算每個節點的**冷門卡量（obscurity≥4）**
  ——類型遊戲的終點是「冷門專輯」，節點沒有冷門卡就沒有存在的意義。
- 判斷「一層夠不夠切」的量化標準：節點 ≥40 張且冷門 ≥15 張才值得成為可選項；
  桶內卡「只命中單一子標」的比例越高，切起來越乾淨。

## 1. 結論：兩層為主，第三層只開在撐得住的桶

**店主的直覺是對的——後龐克與正統龐克該平等看待，但它們是第三層的兄弟，不是第二層。**

| 層 | 內容 | 範例 |
|---|---|---|
| L1 | 十大類（現有） | 搖滾 |
| L2 | 每類 6–11 桶 | 龐克新浪潮／金屬／迷幻前衛／獨立另類／音牆後搖／老搖滾／日亞搖滾／根源其他 |
| L3 | **只在資料撐得住的桶開** | 龐克新浪潮 → 龐克硬蕊／後龐克／新浪潮合成器／哥德暗潮／工業 |

第三層開放清單（依 2026-09-04 資料）：

| L2 桶 | 開 L3？ | 依據 |
|---|---|---|
| rock › punk-wave | **開** | 503 張；punk 145、post-punk 54＋組合、new wave 54＋組合、goth、industrial；單一子標 55% |
| rock › metal | **開** | 443 張；thrash／death／black／doom／prog／trad／alt 七桶各 66–168 張 |
| rock › psych-prog | **開** | 309 張；krautrock 45（冷門 27）、prog 177、psych 155、canterbury 18（冷門 15）、space 25 |
| rock › dream-post | **開** | 170 張；shoegaze／dream pop／post-rock／slowcore 各 29–81，冷門比例高 |
| rock › indie-alt | 不開（暫） | 905 張但 411 張落在「college/90s alt」大雜燴，其餘子桶冷門卡只有 2–18 張 |
| rock › classic | **不開** | 456 張但**冷門卡幾乎為零**（hard rock 0、blues rock 1）——這桶本來就是主流正典 |
| jazz | 不開 | L2 12 簇已夠細；bebop／hard bop／post-bop 可視需要再拆 |
| electronic | 之後再看 | techno→detroit／minimal、house→deep／chicago 資料有，但先驗證 L2 |
| 其他 | 不開 | — |

判準寫進建樹腳本（見 §3）：**節點 ≥40 張且冷門 ≥15 張才生成 L3 選項**，資料長大會自動開。

## 2. 各大類第二層（資料實測）

數字＝有標籤卡數／冷門≥4 卡數。**一張卡可以同時屬於多個 L2**（多重歸屬，不強制互斥）
——electronic 有 58% 的卡同時命中兩簇以上（ambient＋techno 很正常），硬切只會切錯。

- **搖滾**：沿用 `rock-subgenre-map.json` 8 桶（誤標修正後 roots-other 會縮小）。
- **爵士**（2,074 張）：bebop/hard bop 614/278、free/avant 383/309、fusion/jazz-funk 358/174、
  contemporary/nu 325/152、swing/big band 187/71、vocal 182/46、cool/west coast 132/42、
  modal/spiritual 100/52、soul jazz 93/41、latin/bossa 88/24、ECM/euro 80/57、日本爵士 11/11＊。
  未落簇 482 張（23%）→ 需藝人層補標（§3 步驟 3）。
- **電子**（1,443 張）：ambient/drone 516/214、techno 426/193、experimental/noise 424/189、
  IDM/glitch 315/128、house 273/84、trip-hop/downtempo 239/58、synthpop 202/27、
  dub/bass 158/65、industrial/EBM 112/40、city pop/日本 59/32、disco 33/9。
- **靈魂放克**（1,426 張）：funk、classic R&B/doo-wop、motown/northern、southern/stax、
  philly/quiet storm、disco/boogie、neo-soul、gospel、psychedelic soul（實測數字見附錄）。
  **當代 R&B 不在這裡**，見 §4。
- **嘻哈／R&B**（1,255 張）：R&B side 309/25、east coast 249/33、underground/abstract 222/57、
  south/trap 213/21、jazz rap/conscious 166/22、gangsta 163/22、pop rap 63/0、
  west coast 61/8、亞洲 15/15＊。
- **民謠**（860 張）：singer-songwriter 408/103（大雜燴，需再拆）、country 231/40、
  americana/alt-country 178/34、folk rock 138/39、indie/chamber 131/17、british/celtic 80/41、
  psych/freak 77/33、bluegrass 40/11、台灣華語 33/16＊。
- **世界**（506 張）：reggae/dub 155/61、latin/salsa 120/29、african 100/37、flamenco/地中海 46/12、
  arabic/turkish 25/9、indian 24/11、brazil/bossa 22/8。單一子標 77%，最乾淨的一類。

＊標記的節點卡量少但冷門比例 100%，正是「類型遊戲」要帶人去的地方，保留。

## 3. 資料層落地（一支離線腳本，零 API 成本）

`scripts/build-genre-tree.mjs`，產出兩份靜態檔給前端載：

1. `genre-tree.json`：樹結構 `{id, zh, level, children[], rules:[regex]}`。規則就是本文件
   §1–§2 的標籤正規式，人工維護、可 review。
2. `card-subgenres.json`：`{ "artist|album": ["rock/punk-wave/post-punk", ...] }`，
   多重歸屬。建法三步：
   - **步驟 1 標籤命中**：卡的 rawGenres 對樹的 rules（86.6% 的卡走這條）。
   - **步驟 2 藝人傳播**：沒命中的卡，若同藝人其他卡已落節點就繼承（rock 已有整份藝人級
     對照 `rock-subgenre-map.json` 可直接併入）。
   - **步驟 3 代理補標**：仍未落的（估 jazz 482→約 200、其他各數十）按類切批派代理分桶，
     產出同格式對照檔併回；比照 rock 三 agent 交叉的做法。
3. 冷門卡量與 L3 開關由腳本按 §1 判準自動算，寫進 `genre-tree.json` 的 `counts`。
4. 新卡上架時 `build-seed-genres.mjs` 之後接跑本腳本；`ALBUM_ONBOARDING.md` 不用加欄位
   （子類型由標籤推導，不靠人填）。

KV 拉取用 Cloudflare bulk/get（`mood-quiz/fetch-desc2.mjs` 同法，需 `CLOUDFLARE_API_TOKEN`），
13,913 張約 140 個請求、一分半跑完，快取存本機。

## 4. 順手要修的資料：當代 R&B 主類型錯位

店主 2026-09-04：SZA 屬 hip-hop/R&B 塊，不是傳統靈魂樂。類型挑片的 hiphop 桶本來就標
「HIP-HOP / R&B」，但卡池把當代 R&B 的主類型放在 soul。用 Last.fm 標籤
（`contemporary rnb`／`alternative rnb`／`trap`／`hip-hop`）＋ 1995 年後篩出 **38 張**，
提案檔 `GENRE_FIX_RNB_20260904.json`：主類型改 hiphop、soul 降副標（音樂地圖「當代 R&B
兩池都抽」的裁定不變）。其中標籤偏 pop 的（Ed Sheeran、Charlie Puth 類）標 needsRuling。
**未套用，等店主過目。** neo-soul 而無當代 R&B 標的 78 張（Sade、Thundercat）維持 soul。

## 5. 古典：另一套規則

Last.fm 標籤只覆蓋古典卡 23%，且標的是「作曲家／鋼琴／指揮」而非流派，不能用同一套。
古典的第二層應以**時期＋形式**人工定義：巴洛克／古典／浪漫／20 世紀／當代與極簡／
電影配樂／古樂與早期音樂，用既有的作曲家欄（seed 第 8 欄）＋年份推導，另開計畫。

## 6. 產品規格（已由 `GENRE_PICK_SWAP_PLAN.md` 取代：名稱對調為「類型挑片」＝新機制、舊機制改「猜你喜歡」；下列保留作歷史）

- 入口：`find.html` 加第四張卡「類型遊戲」；原「類型挑片」改名（候選：品味挖片／三人行／品味羅盤）。
- 流程：L1 十類 → L2 晶片（顯示該桶冷門卡數）→ 有 L3 的桶再一排 → 終點頁。
- 終點頁：**先列 3 張冷門專輯**（obscurity≥4 依冷門度加權抽，同藝人不重複），附「換一批」；
  每張可直接進卡片詳情／試聽／收進唱片櫃。不做整表瀏覽，避免變成目錄頁。
- 抽卡動畫沿用 `DipDrawAnim` profile `front`；結果卡記進抽卡紀錄 type=`genre-tree`。
- 全本地：兩份靜態 JSON 走瀏覽器快取，抽卡零 API。

## 附錄：soul 第二層實測
（跑 `soul-rnb.mjs` 的輸出，數字併入 §2 後可刪）
