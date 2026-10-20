# 薄細項策展線 ts3（非洲）策展派工（2026-10-20）

共同規則、去重指令、身分兩條路（MB 釘住／§1 人工身分）、名稱、證據、輸出格式與續跑，**全部照 `batch-progress/thin-sub-20261020/CUR-DISPATCH.md`**，只有下面幾點不同：

- **收「該樂種的正典專輯」**，不限搖滾。`genres` 第一個一律 `world`，第二個可選 `jazz`／`soul`／`pop`／`folk`。
- `country` 用 ISO 兩碼小寫（cd 剛果民主共和國、cg 剛果共和國、et 衣索比亞、za 南非、zw 辛巴威、zm 尚比亞、mz 莫三比克…）。
- **WebSearch 每組最多 6 次**。
- 原盤是 LP 的收原盤；很多 soukous 與衣索比亞錄音原本是 45 轉單曲，後來由考古廠牌（Buda Musique《Éthiopiques》系列、Sterns、Stern's Africa、Analog Africa、Honest Jon's、Strut、Crammed、Smithsonian Folkways、Original Music）**以專輯形式整理**——這類可收，標 `releaseException: "archival-compilation"`，`why` 寫明收錄年代。《Éthiopiques》系列每一卷是獨立的整理盤，挑最重要的幾卷即可，同一卷不得與池中重複。
- 先查池中已有（去重指令）：池中已有 Franco & le TPOK Jazz 4、Tabu Ley Rochereau 4、Papa Wemba 1、Konono Nº1 2、Staff Benda Bilili、Mbongwana Star、Kasai Allstars、Jupiter & Okwess、Le Grand Kallé、Zao；Mulatu Astatke 6、Mahmoud Ahmed 2、Hailu Mergia 5、Tlahoun Gèssèssè 1、Aster Aweke 1、Ayalew Mesfin 1；南部非洲 Abdullah Ibrahim 18、Miriam Makeba 5、Hugh Masekela 2、Ladysmith 4、Mapfumo 3 等。

## 分組
| 組 | 範圍 | 張數 |
|---|---|---:|
| d | **剛果 soukous／rumba congolaise**：Zaiko Langa Langa、Papa Wemba 全盛（Viva La Musica）、Kanda Bongo Man、Pepe Kalle、Sam Mangwana、M'bilia Bel、Abeti Masikini、Koffi Olomide 早期、Tshala Muana、Bozi Boziana、Nyboma、Diblo Dibala／Loketo、Orchestre Veve／Verckys、Bella Bella、Les Bantous de la Capitale、Docteur Nico／African Fiesta、Rochereau 以外的 African Jazz 系、Ray Lema、Lokua Kanza、Kékélé 等 | 22 |
| e | **衣索比亞**（Éthiopiques 重要卷、Alemayehu Eshete、Getatchew Mekurya、Emahoy Tsege-Mariam Gebru、Tilahun Gessesse、Muluken Melesse、Bezunesh Bekele、Menelik Wossenachew、Walias Band、當代 Ethio-jazz 如 Krar Collective、Ethiopian Records 系）15 ＋ **南部非洲 township jazz／mbaqanga／chimurenga** 補缺（Mahotella Queens 個人盤、Philip Tabane／Malombo、Batsumi、Spokes Mashiyane、Brenda Fassie 其他、Oliver Mtukudzi 其他、Stella Chiweshe、Bhundu Boys 之外的 jit、Moses Molelekwa、Busi Mhlanga、Winston Mankunku Ngozi）8 | 23 |

輸出檔：`batch-progress/thin-sub-20261020/curation-<組>.json`（d 或 e）。
**每做完 5 張就把目前結果寫進輸出檔**；若輸出檔已有部分內容就接續補完，不要從頭重寫。輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/ts-<組>/` 子目錄，檔名不要跟別組撞。
