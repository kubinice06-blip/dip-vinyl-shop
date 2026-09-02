# c-64 柬埔寨與越南 1960–70s：開批前抽驗（2026-09-02）

排程表寫「池中零張，但資料風險高——赤柬摧毀大量母帶」。照 c-53／c-62 的做法先抽驗：
第一輪 12 張樣本，**高棉文／越南文原文與拉丁轉寫各查一次**（不做條件式回退），
第二輪再 browse 38 位藝人的 MB 實體與名下 release-group。503 依裁定第 28 條退避重試，
探測錯誤 0。腳本與原始資料在 scratchpad 的 `c64-a/`（`probe.mjs`、`browse.mjs`、`rgdet.mjs`）。

## 結論：MB 對 1960–75 原盤的覆蓋遠低於五成，目標降到 15–20 張，實交 14 張

| | 第一輪抽驗（12 張） | 實際候選（14 張） |
|---|---|---|
| MB 藝人實體 | **11/12**（CBC Band 查無） | 14/14 |
| MB 名下有 **1960–75 原盤**的 release-group | **2/10 位**（只有 Khánh Ly 的《Hát Cho Quê Hương Việt Nam 1》1969 與《Sơn ca 7》1974，兩張都已在池中或留置） | — |
| MB release-group 釘住 | — | **14/14**（全部回問過端點） |
| CAA 封面 | — | **13/14（93%）** |
| Apple 試聽（藝人＋盤名粗形比對） | 9/12（寬鬆） | **9/14（64%）** |
| 探測錯誤 | 0 | 0 |

關鍵數字是第二列。**這一區的藝人實體幾乎都在 MB 上，但名下沒有那個年代的專輯**：

| 藝人 | MB 實體 | 名下 RG | 其中 1960–75 原盤 |
|---|---|---|---|
| ស៊ីន ស៊ីសាមុត（Sinn Sisamouth） | 高棉文 | 5 | **0**（3 張再發合輯、1 張 Single、1 張無日期泰柬合刻） |
| រស់ សេរីសុទ្ធា（Ros Serey Sothea） | 高棉文 | 5 | **0**（2 張 2021 年 Cambodian Vintage Music Archive 的數位輯） |
| Pan Ron | 拉丁 | 1 | 0 |
| Yol Aularong | 拉丁 | **0** | 0 |
| Huoy Meas／Meas Samon／Im Song Seum／Liev Tuk | 有 | **0** | 0 |
| Baksey Cham Krong | 拉丁 | 2 | 0（Akuphone 2016 復刻的 Single 與 EP，不合 §1） |
| Drakkar（KH） | 拉丁 | 1 | **1**（《Drakkar 74》，MB 只建 2014 再發） |
| Khánh Ly | 越南文 | 42 | 2（皆已收／留置） |
| Thanh Thúy | 越南文 | 2 | 0（Apple 上有《Thanh Thúy 06》1972 的數位版，MB 沒建） |
| Trịnh Công Sơn | 越南文 | 17 | 0（全是 1994 後的無日期合輯） |
| Phượng Hoàng、Lê Hựu Hà、Nguyễn Trung Cang、Carol Kim、Hùng Cường、Mai Lệ Huyền | 有 | 0–1 | 0 |
| CBC Band | **查無** | — | — |
| Lệ Thu／Thái Thanh／Duy Khánh／Thanh Tuyền／Hương Lan／Ngọc Lan／Tuấn Ngọc | 越南文 | 2–50 | 0（全是 1984 年後的海外盤） |
| Phạm Duy | 越南文 | 1 | **1**（Folkways《Folk Songs of Vietnam》1968） |

**這不是查法錯了**——第二輪已照裁定第 10／28／81 條走 `artist/<MBID>` browse、
試過 Sin Sisamuth／Sinn Sisamuth／Ros Sereysothea 等拉丁變體與高棉文，並用盤名反查。
金城時期的錄音本來就只以 45 轉單曲與卡帶流通（Discogs 上 Monorom、Chanchhaya、
Olympic 的條目幾乎全是 7 吋），MB 對那批單曲也只建了零星幾筆。

**所以簡報要的「柬埔寨 12–16 張個人專輯」在 MB 上做不到**：
柬埔寨那條線只能靠 §5.6 合輯與兩張再發專輯，越南 nhạc vàng 那條線除了已在池中的
Sơn Ca 系列與 Khánh Ly，MB 上也沒有可釘的原盤。**14 張是能釘住 release-group 的全部。**
若要再往上加，只有兩條路，都是店主的選擇不是雲端的（裁定第 83 條）：
走 §1 人工身分路線（Sinn Sisamouth《Groove Club Vol 4》Lion 2020、
Sinn／Ros 的 Monorom LP《ស្រីខ្មៅមាសបង》、Thanh Thúy 的 1972 卡帶系列），
或收 Cambodian Vintage Music Archive 2021 年的數位輯（授權狀態查無公開說明）。

## 掛名規則：高棉文看 MB 實體、越南文兩種寫法 MB 都認

- **高棉文**：Sinn Sisamouth 與 Ros Serey Sothea 的 MB 實體掛高棉文
  （用拉丁名查 **0/3 種拼法命中**），Pan Ron／Yol Aularong／Drakkar／Baksey Cham Krong
  掛拉丁。依簡報：MB 有高棉文實體就用高棉文、拉丁轉寫進 `queryAlias`，
  MB 只有拉丁實體就用拉丁，不自創轉寫（第 26、31 條）。本批唯一的高棉文掛名是
  **សូ សាវឿន（So Savoeun）**，MB 實體與 release-group credit 都是高棉文。
  注意 MB 的高棉文拼法與我第一輪用的不同（ស៊ីន vs ស៉ិន），但 MB 的搜尋容錯把它對上了，
  **日後查詢一律抄 MB 實體的拼法**。
- **越南文**：帶聲調與去聲調兩種寫法在 MB 的藝人搜尋**全部命中同一個實體**
  （5/5），MB 存的是帶聲調的越南文。卡片掛名用帶聲調（Khánh Ly、Phạm Duy、Phương Tâm），
  與池中既有的 9 張越南卡一致；`queryAlias` 填去聲調拉丁字給外部服務。
- **盤名**：14 張裡 10 張是英美法考古廠牌的拉丁盤名、3 張越南文、1 張拉丁（Drakkar 74）。
  與 c-62 同形：**盤名語言由發行方決定**。

## Apple：storefront 完全無差別，命中全在數位發行的考古廠牌

九個 storefront（kh→vn→us→fr→gb→th→sg→au→ca）**每一張命中的都是全部九個或全部零**。
這一區的再發（Dust-to-Digital、Sublime Frequencies、Akuphone、Metal Postcard、
Saigon Supersound）全走全球數位發行，Cambodian Vintage Music Archive 的 2021 年數位輯也是。
查不到的是 Lion Productions 的 Groove Club 2／3 與 Cambodian Cassette Archives
（黑膠／CD 為主）、Khánh Ly 1976 年的卡帶、Akuphone 的 So Savoeun 黑膠
（Apple 上有一張同名 16 曲的《So Savoeun》2025，**不是**Akuphone 那張 14 曲，粗形比對已擋掉）。
**與 c-61／c-62「本地 storefront 才有」相反**，這批 `kh` 或 `us` 都一樣。

Apple 上另有大量 2021–2022 年掛 Sinn Sisamouth／Ros Sereysothea／Pen Ran 的高棉文標題
數位「專輯」（多為兩首歌名並列），來源即 Cambodian Vintage Music Archive，MB 只建了兩筆。
**不要把那些當成原盤**，也不要拿去配本批的合輯卡。

## 合輯比例：14 張裡 10 張走 §5.6，是歷來最高

原因如上——母帶已毀、原盤只有單曲。10 張合輯的授權狀態逐筆看過（第 43／57／65／78 條）：

| 合輯 | 廠牌 | 授權證據 | 備註 |
|---|---|---|---|
| Cambodian Rocks (1996) | Parallel World | **無**——英文維基明記未標藝人、未尋找遺族 | 收的理由是它本身是這條再發史的起點（Dengue Fever、《Don't Think I've Forgotten》都由它而來），維基有專條；不以「再發即背書」舉證 |
| Don't Think I've Forgotten (2015) | Dust-to-Digital DTD-42 | 電影原聲、36 頁冊子附藝人小傳 | |
| Groove Club Vol. 2／3 (2010) | Lion Productions | 封底印 ℗ © 2010 Lion Productions | Discogs 版本頁無 Unofficial 標記 |
| Electric Cambodia (2009) | Minky Records | Dengue Fever 選曲、收益捐 Cambodian Living Arts（英文維基） | |
| Cambodian Cassette Archives (2004) | Sublime Frequencies SF011 | 奧克蘭公立圖書館亞洲分館的卡帶 | 錄音多為 1979 後的僑社錄音，只有 6 軌是 1960 年代柬埔寨錄音——是這條線的「1975 後」對照組 |
| The Golden Voice of Phnom Penh (2025) | Akuphone AKULP1053 | Bandcamp 頁面記藝人本人參與 | 藝人仍在世 |
| Magical Nights (2021) | Sublime Frequencies SF120 | 由藝人女兒 Hannah Hà 與 Mark Gergis 編纂 | |
| Saigon Supersound Vol. 2 (2018)／Vol. 3 (2022) | Saigon Supersound (DE) | Jan Hagenkötter 編纂（Saigoneer、Songlines） | Vol. 1 已在池中 |

## 池中實掃：越南 12 張、柬埔寨 1 張、高棉文字元 0 列

`seed_cards.json` 全檔 13,418 列實掃（不取樣，第 27 條）：

- **越南**：Khánh Ly《Sơn Ca 7》(1974)、Phương Dung ×3（**已達上限**）、Chế Linh ×3（**已達上限**）、
  Giao Linh、Lệ Thu、Thái Thanh 各 1（皆 Sơn Ca 系列）、Hương Thanh《Moon and Wind》(1999)、
  Đặng Thái Sơn（古典）、`Various Artists`《Saigon Rock & Soul》(2010)、《Saigon Supersound, Vol. 1》(2017)。
- **柬埔寨**：只有 The Cambodian Space Project《2011: A Space Odyssey》——**金城時期零張**，簡報正確。
- **c-SEA 留置**：Khánh Ly《Hát Cho Quê Hương Việt Nam 1》(1969) 因缺封面留置未上架，
  但已有研究稿與身分，**本批不重提**；Khánh Ly 因此以 1 張既有＋1 張留置計，本批的
  《Khi tôi về》是第三張，**剛好到上限**。
- **第 49／71 條的盤名掃描**：把 14 張盤名的羅馬轉寫（見各卡 `risk`）逐一對池中 13 張越南／柬埔寨卡比對，
  **零撞卡**。全池高棉文字元列數為 0，越南文聲調列 54 列（含葡文／法文的重音誤中）已逐列看過。

## 規模：14 張、9 個掛名（含 Various Artists 8 張）

| 線 | 簡報建議 | 實交 |
|---|---|---|
| 柬埔寨金城時期（1960–75） | 12–16 | **6**（Cambodian Rocks、Don't Think I've Forgotten、Groove Club 2、Groove Club 3、Electric Cambodia、Drakkar《Drakkar 74》） |
| 柬埔寨倖存者與 1975 後 | — | **3**（So Savoeun、Banteay Ampil Band 1983、Cambodian Cassette Archives） |
| 越南 1960–75 | 10–14 | **2**（Phạm Duy《Folk Songs of Vietnam》1968、Phương Tâm 1964–66 回顧輯） |
| 1975 後海外越僑錄音與再發合輯 | 3–5 | **3**（Khánh Ly《Khi tôi về》1976、Saigon Supersound Vol. 2、Vol. 3） |

`Various Artists` 8 張不計入藝人上限（第 72 條），每張都有 §5.6 例外。
年份 1968–2025（合輯記合輯首度問世年，第 84 條；錄音年寫進 `risk`）。
