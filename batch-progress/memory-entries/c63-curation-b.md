# c-63 b 組（深掘：藍調的非正典那一端）策展完成

- 日期：2026-09-02
- repo：dip-vinyl-shop
- 改動摘要：新增 `batch-progress/c63/prop-b.json`，24 張、23 位藝人
  （`Various Artists` 2 張，依裁定第 72 條不計入藝人上限）。年份 1958–2006，
  `lineType: 深掘`，主曲風全部 `blues`。組成：戰前藍調二三線的考古合輯 7 張
  （Yazoo 5、Revenant 1、Testament 1）、1960 年代 blues revival 的再發現 4 張
  （Rounder／Delmar／Bluesville／Biograph）、電氣藍調地方場景 6 張
  （Excello 的巴頓魯治 2、底特律 1、休士頓 1、洛杉磯客座的芝加哥西區 1、
  Delmark 的芝加哥西區 1）、1970 年代 soul blues 2 張（Ronn、Mankind）、
  英國 blues boom 二三線 4 張（Blue Horizon 2、CBS 1、Liberty 1）、
  非洲藍調 1 張（馬利 Bambara blues）。
- 主要檔案：`batch-progress/c63/prop-b.json`
- 驗證結果：`node batch-progress/c63/chk-prop.mjs b` → 24 張／23 位／標記 0；
  併 a 組跑 `chk-prop.mjs` → 52 張／50 位／標記 0，跨組零重複。
- 去重：實掃 `seed_cards.json` 全 13,418 列（藝人鍵與盤名鍵各掃一次）。
  池中 blues 632 張、339 位藝人，正典藝人多已達 3 張上限
  （Muddy Waters 10、Lightnin' Hopkins 10、John Lee Hooker 9、Howlin' Wolf 7、
  B.B. King 5、Bukka White 4、Skip James 3、Fred McDowell 3、Sleepy John Estes 3、
  R.L. Burnside 4、Junior Kimbrough 3）。本批 23 位裡 20 位在池中 0 張，
  Charley Patton 1→2、Jimmy Dawkins 1→2、Z.Z. Hill 2→3（達上限）。
- 身分：24 張全部釘住 release-group MBID，並逐一回問
  `release-group/<id>?fmt=json` 與 `release?release-group=<id>&inc=labels`
  確認實體類型、標題、first-release-date 與轄下 release 的授權狀態。
  MB 探測全程 1 req/s、帶 User-Agent、503／502／504／429 退避重試六次，
  探測錯誤 0。
- 授權：所有作為背書引用的 release 皆為 Discogs／MB 標 Official。
  唯一含 Unofficial 的是 Groundhogs《Blues Obituary》
  （28 個版本中 1 筆俄羅斯 ADA Sound 的 CD），已寫進該卡 `risk` 並改以
  原盤、BGO、Sundazed 與 Fire Records 舉證（裁定第 43、57 條）。
- 年份與 MB 脫鉤共 8 張（依裁定第 1、18、46 條填原盤年、`risk` 標明落差）：
  Bo Carter 1979／MB 1991、Frank Stokes 1977／MB 1990、
  Traveling Through the Jungle 1974／MB 1995、Robert Nighthawk 1980／MB 1992、
  Eddie Taylor 1972／MB 1991、Little Sonny 1969／MB 1970、
  Big Joe Williams 1958／Discogs 1961、Cannon's Jug Stompers 1990／Discogs 1989。
- 盤名歧義三張已依裁定第 6、50 條採原盤寫法：Silas Hogan《Trouble》
  （MB 誤把英國 Blue Horizon 盤的 Trouble At Home 套到美國 Excello 盤上）、
  Chicken Shack《Forty Blue Fingers…》（維基作 40 Blue Fingers）、
  Jo Ann Kelly《Jo-Ann Kelly》（MB 標題實測含 U+2010 非 ASCII 連字號，
  卡片改用 ASCII，掛名依第 52 條用 Jo Ann Kelly，兩欄刻意不一致）。
- 合輯 8 張走 §5.6 例外，每張 `exceptionReason` ≥12 字並附 2–3 個 HTTPS 證據。
- 未動 `seed_cards.json`、`apex_pool.json`、`PROJECT_MEMORY.md`
  （`REMOTE_RUNBOOK.md` 第 68 行、裁定第 74 條）。
