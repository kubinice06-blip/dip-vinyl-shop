# c-106 轉出清單：MB 完全查無、可進 §1 補遺批的候選

本批（華語第三輪）**不開 §1**，MB 查無一律不收。以下 **13 位／16 張**是實查後確認
「唱片實體確鑿、MB 沒建檔」的碟，形狀與 c-87／c-92／c-115 那條線相同，建議整批轉進 §1 補遺批。

**查法與排除四種假查無**（第 28／98／116／122 條）：
每位都先用 `artist?query=<漢字名>&limit=8` 取到 score=100 的實體，
再用 `release-group?artist=<MBID>&limit=100&offset=` 分頁（**不是** `inc=release-groups` 的 25 筆上限），
503／403 一律退避重試。下表「MB 名下 RG」欄就是那次分頁的結果。
`checkedAt`：2026-09-06。

---

## 一、台語經典（1950s–1970s）：**這一代幾乎整代不存在**

| 藝人 | MB 藝人 MBID | MB 名下 RG | 建議收的碟 | 年 | 廠牌 | Discogs |
|---|---|---:|---|---|---|---|
| **文夏** | `cc1b4226-f391-4e8c-ba8c-e8e21c26638c`（TW、1928） | **0** | 文夏的採檳榔 | 1970 | 亞洲唱片 Asia | https://www.discogs.com/release/12893557 |
| **洪一峰** | `ee2f0937-47ee-4747-b86d-f08e886db038`（TW、1927-10-30） | **0** | 台語老歌金曲7 - 洪一峰 | －（名流復刻） | 名流唱片 Masters Records | https://www.discogs.com/release/32963061 |
| **紀露霞** | `62642603-701f-4493-90f6-d189a5c7348e`（TW、1936） | **0** | 意亂情迷 | 1966 | 羅盤唱片 | https://www.discogs.com/release/9792166 |
| 同上 | | | 台語老歌金曲15 - 紀露霞 | －（名流復刻） | 名流唱片 | https://www.discogs.com/release/32966151 |
| **郭金發** | `2aac08c7-a544-4a3b-81bb-b6dd5cda9877`（TW、1944-03-01） | **0** | 郭金發專輯（三） | －（英倫唱片） | 英倫 | https://www.discogs.com/release/36978918 |
| 同上 | | | 台語老歌金曲2 郭金發2 | －（名流復刻） | 名流唱片 | https://www.discogs.com/release/36749197 |
| **吳晉淮** | `b5aa1b97-c9d8-4489-8c41-db3be3d7b6fa`（TW、1916-06-08） | **0** | 合衆中國民謡（台湾篇）（與張淑美、阿美娜） | 1967 | Union Record | https://www.discogs.com/release/27565692 |
| **陳一郎** | `2ff97704-026a-47ca-baeb-62aff2a74c63`（TW） | **0** | 陳一郎與12個名女人（Club點唱站 1） | 1991 | 名冠唱片 | https://www.discogs.com/release/35869345 |
| **劉福助** | `82d63e66-7f13-4f80-bd66-923ae0ebd130`（TW、1940-10-06） | **0** | 劉福助落下咳 | 1975 | 藝海唱片 | https://www.discogs.com/release/19544098 |
| 同上 | | | 中國酒拳 劉福助專輯1 | 1984 | 藍天 Lantian | https://www.discogs.com/release/35575162 |

**為什麼 MB 查無**：這一代台語唱片由亞洲、五虎、鈴鈴、皇冠、電塔等中南部小廠發行，
1990 年代後的復刻權分散在名流、吉馬、鄉城等公司，**沒有任何一家跨國廠牌接手，
MB 的華語建檔幾乎全部來自 EMI／寶麗金／滾石那幾條線**——這一整塊落在外面。
藝人實體本身在 MB 上都建得出來（有生卒年與國別），**名下卻是 0 個 RG**，
這是「實體確鑿、發行品沒建檔」的典型形狀，不是查法不對。

---

## 二、上海／香港時代曲：MB 有實體、名下 0 個 RG

| 藝人 | MB 藝人 MBID | MB 名下 RG | 建議收的碟 | 年 | 廠牌 | Discogs |
|---|---|---:|---|---|---|---|
| **白虹** | `a1963319-1889-45a9-807e-c5c959734fb7`（CN、1920-02-24） | **0** | 白虹 = Bai Hong | 2008 | 中國唱片上海公司 CRSC | https://www.discogs.com/release/18323062 |
| 同上 | | | 白虹之歌 = Songs By Bai Hung - 郎是春日風 | 2022 | Reborn Record Ltd | https://www.discogs.com/release/32402670 |
| **李麗華** | `6db5b9d2-46a8-4e05-af23-c139e0cd0e02`（CN、1924-07-17） | **0** | 天上人間 = Paradise On Earth / 李麗華之歌 | 1961 | 百代 Pathé | https://www.discogs.com/release/23482610 |
| 同上 | | | 李麗華之歌 | 1964 | Double Ring Record 雙鈴 | https://www.discogs.com/release/8976772 |
| **方逸華** | `6a68ca37-bd59-4dc9-875e-28392b21a8b1`（CN、1934-01-01） | **0** | 中西名曲 = East & West ＋ 方逸華與西班牙旋律 | 2015（復刻） | EMI | https://www.discogs.com/release/8057994 |
| **謝雷** | `ad74b929-3d93-46b4-8d9a-a320fbb89a63`（TW、1940-02-02） | **0** | 謝雷之歌 | 1968 | 宇宙唱片 Audio Records | https://www.discogs.com/release/8968321 |
| 同上 | | | 謝雷金唱片 | 1969 | 金馬唱片 Golden Horse | https://www.discogs.com/release/11659270 |

**為什麼 MB 查無**：白虹與李麗華的原始錄音是 1930–50 年代的上海／香港百代蟲膠片，
復刻權分別落在中國唱片上海公司（白虹）與雙鈴、旭日等港台小廠（李麗華），
**都不在 EMI (HK) 那套《百代中國時代曲名典》系列裡**——
名典系列有進 MB 的那幾位（周璇、姚莉、吳鶯音、崔萍、潘秀瓊、靜婷、張露、龔秋霞、葛蘭、李香蘭）
本批已經收完或池中已有，剩下這幾位就是系列外的。
謝雷是台灣 1960 年代國語三大男聲之一（另兩位青山、姚蘇蓉本批都有卡），
宇宙與金馬兩家小廠的唱片同樣沒進 MB。

---

## 三、走 §1 時要注意的兩件事

1. **`mbAbsenceProof.queries` 兩個方向都要下過**。本批下的是藝人方向
   （`release-group?artist=<MBID>&limit=100&offset=` → 名下 0 個 RG）；
   §1 還要補作品方向（`release-group?query=release:"<盤名>" AND artist:"<藝人>"` → count=0）。
   **不要把本清單的「名下 0 個 RG」當成兩個方向都查過了。**
2. **封面走 `apple-verified-collection`，不得用 caa**（CAA 以 rgMbid 為鍵，§1 卡的 rgMbid 必須留空）。
   但要先解決一個更前面的問題：本批實測發現
   **`search?term=<藝人名>&entity=musicArtist&country=tw|hk` 對 `崔苔菁`／`沈文程`／`仙杜拉`／`太極`／`夏韶聲`
   連藝人實體都回不出來**（見 `rulings.md` 第 6 條）。這一線走 §1 時，
   「用藝人名 search 取 artistId 再 lookup 目錄」這條路不一定通得了，要準備曲名反查那條備援。
