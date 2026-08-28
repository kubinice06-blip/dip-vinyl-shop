# c-46 待處理的判斷（第三支試聽 agent 回來後一併處理）

## 一、我要改判的 1 筆

**濱瀬元彦《Reminiscence》— 改判無來源（previewStatus: none）**

救援 agent 收的是 Apple 上 2018 studio mule 版（7 軌），與 1986 原盤（8 軌）
**選曲與曲序都不同**。它的理由是「同屬本卡的 release-group、primary-type=Album、
無 compilation 次類型」，並主動請覆核。

依本批一貫的判準：擴充盤可收的前提是**原盤曲目完整含在內**。
這筆 7 軌 vs 8 軌、選曲不同，不滿足「完整含在內」，屬重編盤，
與本批排除 Bix Beiderbecke（Apple 20 軌 vs MB 14 軌，另一 release group）、
Pilgrim Travelers（Apple 29 軌重編盤 vs MB 12 軌原 LP）同一標準。
同 RG 不足以放行——RG 底下本來就會收不同編輯的 release。

## 二、我覆核後維持原判的 2 筆

**鷺巣詩郎《NEON GENESIS EVANGELION》— 維持收**
Apple 22 軌，缺 MB 第 2 軌〈FLY ME TO THE MOON〉（版權歌曲），其餘完全同序。
這是串流授權的常見缺軌，不是配錯碟。與 c-45 的 Lil' Kim《Hard Core》
（缺原盤第 6 軌〈Crush on You〉，其餘 14 軌同序）同一情形，該筆當時判 ok。

**伊福部昭《ゴジラ》— 維持收**
Apple 22 軌 vs MB 21 軌，有數軌位置調動與題名差異，但全為 1954 原始單聲道錄音，
非重錄。agent 已排除差異更大的另一條目（1548613084）。

## 三、要寫進 PROJECT_MEMORY 的兩個方法發現

**1. `entity=song` 搜尋能挖出藝人目錄列不出來的條目。**
配樂線有 4 筆是這樣救回的（Blue Velvet、Pulp Fiction、The Last Emperor、
攻殻機動隊），album 搜尋與藝人目錄全都查不到。
最典型的是 Blue Velvet：藝人目錄在 us/gb/de/fr/jp 五店都只列得出 48 軌 Deluxe，
而那張**只有第 23 軌有 previewUrl**，等於不能用；song 搜尋才挖出未列在目錄中的
14 軌原盤，全軌有試聽且與 MB 逐軌同序。
→ 這是繼「artistId 拉整份目錄」之後的第二層備援，應寫進工作法。

**2. rgMbid 的「最早 release」可能是宣傳盤或 Pseudo-Release，拿它比對曲序會誤判。**
本批 3 筆中招：
- `The Social Network`：最早是 2010-09-17 的 **5 軌宣傳採樣盤**，正式盤是 19 軌
- `武満徹|Ran`：最早是 2002 JP 的 **Pseudo-Release（61 軌）**，可比對的是 2016 GB 正式盤 16 軌
- `Pulp Fiction`：抓到 1994 AU 版 30 軌（含 14 首澳洲宣傳 Interview 加收軌），非標準 16 軌盤
→ 比對曲序前要先確認拿到的 release 是正式盤，不能無條件用 first-release。

## 四、storefront 的雙向盲點（寫進下批 brief）

- **日本作品不一定在 jp**：吉卜力兩張（もののけ姫、千と千尋）、
  《NEON GENESIS EVANGELION》、《攻殻機動隊》在 **jp 查不到，要用 us ＋ 英文片名**。
  攻殻機動隊尤其典型：jp 用日文原題只回 Arise 與 remix，us 用 "Ghost in the Shell" 才命中原盤。
- **反之歐洲配樂要用母國店**：Morricone《C'era una volta il West》只有 it 有完整 27 軌版、
  Tangerine Dream《Thief》us 目錄 112 張無此片但 gb／de 有、
  Francis Lai 與 Jobim/Bonfá 要 fr。
- 封面補救那輪也是靠 gb 多救回 2 筆（Adelaide Hall、Johnny Dodds）。
- **Deezer 在本環境被 egress allowlist 擋掉**（api.deezer.com），不能當備援。

## 五、Apple 掛名與卡片不同的（下游比對會卡，寫進 aliasReview）

Tan Dun→Yo-Yo Ma、Cliff Martinez《Drive》→Various Artists、
Moroder《American Gigolo》→Various Artists、Philip Glass《Mishima》→Kronos Quartet、
MJQ《Odds Against Tomorrow》→**John Lewis & The Modern Jazz Quartet**（不換掛名查不到）、
Blue Velvet→Various Artists、The Last Emperor→Various Artists、
Cluster & Eno→Cluster & Brian Eno。

## 六、上游正字錯誤
候選寫「浜瀬元彦」，Apple 與正字皆為「**濱**瀬元彦」（U+6FF1）。
身分裁定階段也發現 MB 的藝人實體是「濱瀬元彦」、RG 掛名卻是羅馬拼音
`Motohiko Hamase`——三種寫法各不相同，aliasReview 三種都要記。
