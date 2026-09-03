## 2026-09-02 — dip-vinyl-shop — c-63 a 組（民謠）研究層 28 張

**改動摘要**：完成 c-63 深掘線 a 組 28 張的事實研究，產出 `desc-tools/batches/research/c63-a.json`
（28 筆、key 與順序與卡單 a 組完全一致，全部 `full`，facts 236 條、非 HTTPS src 0、
`hookCandidates` 每張 2 條）。材料以 Discogs 公開 API 的原盤 credit／內頁註記／版本表、
MusicBrainz release-group、Mainly Norfolk（英國民謠復振）、Tobar an Dualchais（蘇格蘭）、
Southern Spaces 的 John Cohen 學術專文、Smithsonian Folkways、《衛報》訃聞、
英文／西班牙文／葡萄牙文／巴斯克文維基為主。

**主要檔案**：`desc-tools/batches/research/c63-a.json`（新增）。
未動 `seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`。

**推翻策展層三處（第 59 條授權，已寫進 notes）**：
1. **High Level Ranters《The Lads of Northumbria》** — 策展層說「本碟後來由 Topic 以 TSCD483 出 CD」。
   實查 TSCD 483 是 Topic 1968 年專輯《Northumberland Forever》(12T186) 的 1997 年重刊，
   十七軌與本碟曲目完全不重疊。**本碟沒有任何授權再發**，Mainly Norfolk 的唱片頁也只列 Trailer LER 2007 一種。
   → 本批零再發的碟從 3 張變成 **4 張**（Dave & Toni Arthur、Ray Fisher、Almeda Riddle、High Level Ranters），
   §0.8 冷門軸錨點制的評分基數要跟著改。
2. **Frankie Armstrong《Lovely on the Water》** — 策展層說「Topic 自家在 2000 年再出一次」。
   實查 MB 該筆 2000 年 release 的廠牌是 **Fellside Recordings FECD151**，Discogs 版本表也無 Topic 2000 年 CD。
   Topic 自家的再發是 2009 年 10 月的數位版 TSDL216。
3. **Meic Stevens《Outlander》** — 策展層稱「唯一一張由英美大廠發行的**英語**專輯」，
   但曲目表上的〈Dau Rhosyn Coch〉是威爾斯語；已收緊為維基原文「一次性的英語 LP」。

**另修正自己三處算術／最高級錯誤**（第 64 條）：Tony Rose 的最短曲、Mr. Fox 的最長曲、
Tommy Potts 的曲數；Frankie Armstrong 的「三首無伴奏」是推論，改成唱片說明直接給的逐軌樂器分佈。

**同調風險與互斥條款**：本批的共同標籤不是簡報預估的「Topic 橫跨 8 張」（實際 Topic 只有 2 張），
而是 **Bill Leader 橫跨 6 張、Trailer 廠牌橫跨 4 張**。已逐張下互斥條款：
Leader 個人線判給 Dave & Toni Arthur（臥室、Revox A77、車頭燈打光）、
Trailer／Leader 編號體系判給 High Level Ranters、Livingston Studios 與 Transatlantic 判給 Mr. Fox、
Topic 廠牌線判給 Louis Killen、Rounder 廠牌史判給 Fuzzy Mountain String Band、
Peter Howell 的《Doctor Who》線判給 Agincourt（Ithaca 改用「私壓 99 張」）、
「至今只有黑膠」判給 Dave & Toni Arthur 與 Almeda Riddle。
非英語圈那 4 張（José Afonso、Mikel Laboa、Daniel Viglietti、Patricio Manns）各給一個獨有錨點，
明令不得寫成同一個「抗爭歌曲」形狀。

**年份不斷言 5 張**（第 18／46 條）：Dave & Toni Arthur（封套 1970／黑膠版權年 1971，
當事三人 2021 年都記不得）、Simon Finn（Discogs 記 1971-04-01／標籤 ℗1970）、
Peter Walker（卡單 1967／維基 1966）、Tia Blake（卡單 1971／Bandcamp 說明 1972 年 2 月）、
Patricio Manns（卡單 1966／西班牙文維基的曲目條目記 1965）。
Daniel Viglietti 另因 MB 完全無日期而年份與 RG 脫鉤，改用「1967 年 9–10 月在哈瓦那錄音」當敘事錨點。

**驗證**：`node qa-batch.mjs research c63` → a 組 28 筆全 full、字元三掃描零標記、
src 與 hookCandidates 零標記；唯一標記「key 集合與卡單不一致」來自 b 組（24 張藍調）研究稿尚未產出，
非 a 組問題。
