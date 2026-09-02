# c-66 印度：寶萊塢黃金期與印度古典——開批前抽驗（2026-09-02）

這一區從排程表第一版就排著、一路順延到最後一批，**是整條擴充線的最後一批**。
依 c-53／c-62／c-64 的作法先抽驗：第一輪 16 位藝人的 MB 實體
（**拉丁轉寫與天城體／坦米爾文原文各查一次**，不做條件式回退，
否則量不到原文的真實命中率），第二輪對 12 張具體的 release-group 查 CAA 與 Apple。
503 依裁定第 28 條退避重試（六次，遞增退避），Apple 的 403／429 依第 98 條同樣退避。
**探測錯誤 0。** 腳本與原始資料在 scratchpad 的 `c66/`
（`mb.mjs`、`probe1.mjs`／`probe1.json`、`probe2.mjs`／`probe2.json`、`probe3.mjs`／`probe3.json`）。

## 結論：可以開，而且是本次擴充基建最好的一批。**目標維持 30–40 張**

| | c-66 抽驗（12 張／16 位） | c-62 抽驗 | c-64 抽驗 |
|---|---|---|---|
| MB 藝人實體（拉丁） | **16/16** | 11/12 | 11/12 |
| MB 名下有**目標年代（1950–79）原盤**的 release-group | **16/16 位**（最少 5 張、最多 168 張） | — | **2/10 位** |
| 抽驗 12 張的目標年代 release-group 釘住 | **12/12** | 7/12 | — |
| CAA 封面 | **12/12（100%）** | 3/7 | 13/14 |
| Apple 試聽（藝人＋盤名粗形比對） | **8/12（67%）** | 9/12 | 9/12 |
| 探測錯誤 | **0** | 0 | 0 |

**關鍵那一列（第二列）與 c-64 完全相反。** c-64 的教訓（裁定第 94 條）是
「藝人實體在、名下卻沒有那個年代的原盤」；印度這一區**不吃這條**：
16 位受檢藝人**全部**在 MB 名下有 1950–79 年的 `primary-type=Album` 條目：

| 藝人 | MB 實體名 | 名下 RG | 其中 1950–79 Album |
|---|---|---|---|
| Sachin Dev Burman | 拉丁 | 79 | **44** |
| Rahul Dev Burman | 拉丁 | 339 | **100** |
| Shankar Jaikishan | 拉丁 | 131 | **76** |
| Naushad | 拉丁 | 50 | **27** |
| O. P. Nayyar | 拉丁 | 47 | **31** |
| Laxmikant Pyarelal | 拉丁 | 241 | 168（含 1980s） |
| Kalyanji Anandji | 拉丁 | 127 | 82（含 1980s） |
| Madan Mohan | 拉丁 | 57 | 23 |
| Roshan | 拉丁 | 26 | 14 |
| Salil Chowdhury | 拉丁 | 46 | 15 |
| Hemant Kumar | 拉丁 | 48 | 16 |
| Khayyam | 拉丁 | 21 | 15 |
| C. Ramachandra | 拉丁 | 23 | 7 |
| Vasant Desai | 拉丁 | 9 | 5 |
| Bappi Lahiri | 拉丁 | 129 | 12 |
| M. S. Viswanathan（坦米爾） | 拉丁 | 107 | 34 |
| Ilaiyaraaja（坦米爾） | 拉丁 | 466 | 192（含 1980s） |
| Ali Akbar Khan | 拉丁 | 74 | 22 |
| Vilayat Khan | 拉丁 | 53 | 14 |
| Bismillah Khan | 拉丁 | 40 | 12 |
| Nikhil Banerjee | 拉丁 | 46 | 6 |
| Imrat Khan | 拉丁 | 18 | 9（1966–89） |
| Ram Narayan | 拉丁 | 17 | 8（1968–89） |
| Amjad Ali Khan | 拉丁 | 52 | 6 |
| Alla Rakha | 拉丁 | 30 | 15 |
| Amir Khan | 拉丁 | 13 | 5 |
| Mallikarjun Mansur | 拉丁 | 19 | 5 |
| Kishori Amonkar | 拉丁 | 35 | 5 |
| Zia Mohiuddin Dagar | `Ustad Zia Mohiuddin Dagar` | 20 | 4 |
| M. S. Subbulakshmi | `M.S. Subbulakshmi` | 45 | 8（3 張標 Album） |
| Ramnad Krishnan | 拉丁 | 13 | 5（多為無 type 的音樂會） |
| Lalgudi Jayaraman | 拉丁 | 14 | 3 |
| Ghantasala（泰盧固） | 拉丁 | 10 | 4 |
| Satyajit Ray | 拉丁 | 6 | 4 |
| Hemanta Mukherjee | 拉丁 | 11 | 3 |

**歌手那一側則相反，這正是簡報預警的形狀**（filmi 的掛名慣例是電影名＋作曲者）：

| 歌手 | 名下 RG | 1950–79 Album |
|---|---|---|
| Lata Mangeshkar | 101 | **10**（多為 Marathi 電影與 bhajan 專輯，不是 Hindi filmi） |
| Asha Bhosle | 82 | **3** |
| Mohammed Rafi | 55 | **2** |
| Kishore Kumar | 86 | **6** |

也就是說：**印度電影音樂在 MB 上是掛作曲者的，不是掛歌手的。**
Lata／Asha／Rafi／Kishore 的代表作全部以「作曲者的 OST」形態建檔
（《Guide》掛 S. D. Burman、《Mughal-E-Azam》掛 Naushad）。
**a 組因此一律走作曲者掛名**——這與卡池的既有先例一致（池中的
`R.D. Burman`《Sholay》、`Kalyanji-Anandji`《Don》都是作曲者掛名），
也與裁定第 103 條（作曲者主導的專輯不改走 §5.6）同形。
歌手寫進 `risk` 與 `why`，供研究層與去重使用。

**MB 查無在這一區幾乎不會發生。** 兩位例外：
- **T. N. Krishnan**（卡納提克小提琴）——查到的是 `N. S. Krishnan`（RG=0），非同一人，本批不收。
- **S. Balachander**（維納琴）——`S. Balachander` 與 `S Balachander` 兩種寫法都回
  **Johann Sebastian Bach**（縮寫被 MB 的搜尋當成 Bach 的別名），本批不收，記進待辦。
- 另 `Gangubai Hangal`（RG 3）、`Kesarbai Kerkar`（RG 6）、`Palghat Mani Iyer`（RG 1）
  實體在但名下**無目標年代條目**——這三位是本區唯一符合第 94 條那個形狀的，
  是零星例外不是通則。

## 掛名的文字：**用拉丁轉寫，因為 MB 的印度藝人實體本身就掛拉丁**

這是本批與 c-53（西里爾）、c-62（希臘文）最大的差別，而且**方向相反**。
抽驗對 16 位藝人同時查了拉丁轉寫與原文字（天城體／坦米爾文）的**藝人實體**：

| 查法 | 命中正確實體 |
|---|---|
| **拉丁轉寫** | **16/16** |
| 天城體／坦米爾文原文 | **5/16**（Lata Mangeshkar、Asha Bhosle、Mohammed Rafi、Bhimsen Joshi、Nikhil Banerjee） |

原文查失敗的 11 筆全部回了不相干的實體（`लता मंगेशकर` 以外的例子：
`सचिन देव बर्मन` → `विदेशी`、`नौशाद` → `विदेशी`、`ओ. पी. नय्यर` → `प्रलय`、
`एम. एस. सुब्बुलक्ष्मी` → `Subbu Arumugam`）。

**而且那 5 筆命中的實體，MB 顯示的名字本身也是拉丁**
（查 `लता मंगेशकर` 回的實體名是 `Lata Mangeshkar`）。
也就是說 **MB 對印度藝人存的就是拉丁轉寫**，原文只是別名。

**裁定（依簡報授權自決）：a／b 兩組的掛名一律用 MB 藝人實體的拉丁寫法，
天城體不入 `queryAlias`**——依第 25 條的判準（填進去命中率會變高還是變低），
Apple 的印度目錄用的也是拉丁（`S.D. Burman`、`Shankar - Jaikishan`、`Naushad`），
填天城體只會讓封面／試聽三條線落空。這與第 26 條（不自創轉寫）一致：
我們用的是 MB 實體自帶的寫法，不是自己編的。

**這也與池中既有的 8 個印度掛名一致**（`Ravi Shankar`、`Ali Akbar Khan`、
`Nikhil Banerjee`、`Vilayat Khan`、`R.D. Burman`、`Kalyanji-Anandji`、
`Hariprasad Chaurasia`、`Shivkumar Sharma` 全為拉丁），
所以**沒有 c-62 那種「新卡與池中既有卡分裂成兩個鍵」的代價**。

**盤名同理**：filmi 的盤名就是電影名的拉丁轉寫（MB 與 Apple 都用），
印度古典的盤名多半是英美廠牌出的英文標題（`Sound of the Sarod`、
`The Genius of Vilayat Khan`）。**兩者都不是例外，都是第 6 條「原始發行的寫法」的結果。**
少數 MB 存原文的（Lata 的《अभंग तुकयाचे》、Asha 的古吉拉特文盤、
Kishori Amonkar 的《श्री राघवेंद्र बारो》）本批刻意迴避——
它們是地方語言的宗教／民謠盤，身分與年份都薄。

## Apple：`in` storefront 就夠，filmi 全中、古典幾乎全空

抽驗把 `in`→`us`→`gb`→`de`→`fr`→`ca`→`ae`→`sg`→`au` 九個 storefront 都試過
（順序依第 75 條照發行權排，移民市場的 `gb`／`ca`／`ae` 放在發行權之後）：

| 抽驗卡 | Apple | storefront |
|---|---|---|
| S. D. Burman《Guide》 | ✓ `Guide (Original Motion Picture Soundtrack)` / S.D. Burman (1965) | **in** |
| Shankar Jaikishan《Mera Naam Joker》 | ✓ / Shankar - Jaikishan (1970) | **in** |
| Naushad《Mughal-E-Azam》 | ✓ / Naushad (1960) | **in** |
| O. P. Nayyar《C.I.D.》 | ✓ / O. P. Nayyar, Majrooh Sultanpuri & Jan Nisar Akhtar (1956) | **in** |
| R. D. Burman《Amar Prem》 | ✓ / R.D. Burman (1971) | **in** |
| Kishore Kumar《Door Gagan Ki Chhaon Mein》 | ✓ / Kishore Kumar (1964) | **in** |
| Bappi Lahiri《Chalte Chalte》 | ✓ / **Various Artists** (1976) | **in** |
| M. S. Subbulakshmi《Meera Bhajans》 | ✓ / M. S. Subbulakshmi, T. K. Murthy & V.V. Subramaniam (1965) | **in** |
| Ali Akbar Khan《Sound of the Sarod》 | ✗ | — |
| Vilayat Khan《The Genius of Vilayat Khan》 | ✗ | — |
| Bismillah Khan《Raga Todi • Mishra Thumri》 | ✗ | — |
| Nikhil Banerjee《Raga Soheni, Raga Megh》 | ✗ | — |

**8 個命中全部落在 `in`，其他八個 storefront 一個都沒有。**
與 c-62（全在 `gr`）、c-61（全在本地）同形，與 c-53（全在 `us`）相反——
**再發權在誰手上決定 storefront**：Saregama／HMV India 把整套 filmi 目錄
做成印度數位發行，所以 `in` 全中；`gb`／`ca`／`ae` 這三個移民市場 storefront
**再次證實不成立**（第 75 條第三次應驗）。

**四筆落空的形狀值得記**：全部是 **b 組的印度古典錄音室名盤**，
而且全部是 1960–70 年代**英美廠牌**（Connoisseur Society、EMI/Odeon、World Pacific）
出的黑膠——那批母帶的再發權散在小廠與家族手上，沒有做全球數位發行。
**b 組的 Apple 覆蓋預期會顯著低於 a 組**，這不是探測失敗，是目錄真的沒有。
b 組的候選會優先挑「有 Saregama／HMV India 數位再發」與「AMMP／Alam Madina
（Ali Akbar Khan 家族自營廠牌）有在架」的條目來補這一塊。

## 授權舉證：印度目錄的未授權重刊確實極多（第 43／57／65／78 條）

抽驗時實查 Discogs 公開 API（`api.discogs.com` 免 token）確認：
Saregama／HMV India 的 filmi 黑膠有大量 1990 年代以後的第三方 CD 重刊，
Discogs 上同名廠牌帶括號序號的實體很常見。
**a 組因此一律不以「有再發」當背書**——filmi 的 OST 是 `Album/Soundtrack`
（`primary-type=Album`），依 §1 本來就走正規 Album 路線，**不需要 §5.6 舉證**，
授權問題只影響 `reissuedBy` 欄怎麼填。本批把 `reissuedBy` 留給
**能指到 Discogs version 頁或有官方數位發行**的那幾筆，其餘留空。
真正要走 §5.6 的只有少數幾張回顧輯與 Various Artists 合輯，逐張舉證。

## 池中實掃：印度區 26 張，四位藝人已達或逼近上限

`seed_cards.json` 全檔 **13,418 列實掃**（不取樣，第 27 條）。與印度直接相關的 26 張：

- **Ravi Shankar：8 張單掛（1956–1997）＋ 4 張聯名**（與 Ali Akbar Khan、Philip Glass、
  Menuhin ×2）。**遠超上限，本批一張都不碰**——簡報本來就寫「Ravi Shankar 以外」。
- **R.D. Burman：4 張**（`R.D. Burman` ×3 ＋ `R. D. Burman`《Teesri Manzil》1 張，
  **掛名分裂成兩個鍵**，與 Selda／Selda Bağcan、A.R. Rahman／A. R. Rahman 同形）。
  **已達上限，本批不收。** 掛名分裂屬線上資料，記進 `audits/pool-artist-name-splits.md`。
- **A.R. Rahman：4 張**（同樣分裂成 `A.R. Rahman` ×3 與 `A. R. Rahman` ×1）。年代也不在本批。
- **Nusrat Fateh Ali Khan：5 張＋1 張聯名**——巴基斯坦，不在本批範圍。
- Ali Akbar Khan 2 張（《Journey》1990、《Music of India: Morning and Evening Ragas》1955）
  → **還可收 1 張**。
- Nikhil Banerjee 1、Vilayat Khan 1、Hariprasad Chaurasia 1、Shivkumar Sharma 1、
  L. Subramaniam 1、Ananda Shankar 2、Kalyanji-Anandji 1、Shankar（L. Shankar）1、
  Bismillah Khan & V.G. Jog 1（聯名鍵）、Shivkumar Sharma 等三人聯名 1。
- **Lata／Asha／Rafi／Kishore／S.D. Burman／Shankar–Jaikishan／Naushad／O.P. Nayyar
  在池中零張。** a 組的整條線是空的。
- **Carnatic 在池中零張**（M.S. Subbulakshmi、Semmangudi、Lalgudi、Balamuralikrishna 皆無）。

### 第 49／71 條的盤名掃描

已把候選的盤名羅馬轉寫逐張對池中 26 張印度卡人眼比對（掃得完）。
**跨文字系統的撞卡在這一區風險比 c-60／c-62 低**，因為池中既有的 26 張與本批候選
**兩邊都用拉丁**，字串去重看得見。但第 71 條那個第三種形狀（**MB 掛作曲者、
卡池掛演唱者**）在 filmi 是**結構性存在**的：本批每張 a 組卡的 `risk` 都寫明
「電影名／作曲者／主要演唱者」三者，並以盤名為主鍵掃過一次池。
已排除的撞卡：**《Sholay》《Hare Rama Hare Krishna》《Shalimar》《Teesri Manzil》
《Don》**（池中皆有），以及 Ravi Shankar 名下的《Sound of the Sitar》
——**Alla Rakha 名下也有一張同名的 1967 年 RG，那是同一張碟的另一個 credit**，本批不收。

## 規模：維持 30–40 張

MB 對目標年代原盤的覆蓋遠高於五成（16/16 位藝人、12/12 抽驗卡），
**不觸發簡報裡「降到 20–25 張」的條款**。兩組各 17–20 張、合計 35 張為目標。

| 線 | 目標 |
|---|---|
| a：1950–60s filmi 黃金期（S.D. Burman／Shankar–Jaikishan／Naushad／O.P. Nayyar／Madan Mohan／Roshan／C. Ramchandra／Vasant Desai／Salil Chowdhury／Hemant Kumar） | 12–14 |
| a：1970s Bollywood funk／disco 與晚期 filmi（Laxmikant-Pyarelal／Kalyanji-Anandji／Bappi Lahiri／Khayyam） | 4–6 |
| b：Hindustani 器樂（sitar／sarod／sarangi／shehnai／rudra veena／tabla） | 9–11 |
| b：聲樂 khayal／dhrupad | 3–4 |
| b：Carnatic | 3–4 |
| b：Bengali／Marathi 與 Bollywood 以外的地方電影音樂 | 3–4 |
