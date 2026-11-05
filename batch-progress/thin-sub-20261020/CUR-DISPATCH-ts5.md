# 薄細項策展線 ts5（嘻哈深度）策展派工（2026-10-20）

共同規則、去重指令、身分兩條路（MB 釘住／§1 人工身分）、名稱、證據、輸出格式與續跑，**全部照 `batch-progress/thin-sub-20261020/CUR-DISPATCH.md`**，只有下面幾點不同：

- **收「該場景的正典嘻哈專輯」**（正規錄音室專輯或公認的 mixtape 專輯；不收單曲、EP、精選）。`genres` 第一個**一律 `hiphop`**（類型樹只把主類型＝hiphop 的卡掛進這些節點），第二個可選 `rnb`／`electronic`／`pop`。
- `country` 用 ISO 兩碼小寫（tw、cn、hk、kr、fr、be、ca、sn、us）。
- 中文與韓文掛名照**封面主要印的文字**，另一種寫法放 `queryAlias`。
- **WebSearch 每組最多 6 次**，多用 MB API 與 WebFetch 維基／Discogs。
- 池中現況（類型樹節點）：亞洲嘻哈／台灣與華語 10、韓國 11；法語嘻哈 10；New Orleans／Bounce 16；Cloud／Emo Rap 19（地下）＋32（南方）。**先用去重指令查每位藝人在池中已有幾張**，已有 2 張以上的藝人不要再提。

## 分組
| 組 | 範圍 | 張數 |
|---|---|---:|
| h | **台灣與華語**（MC HotDog 熱狗、大支、頑童 MJ116、蛋堡 Soft Lipa、國蛋 GorDoN、Leo 王、ØZI、高爾宣 OSN、瘦子 E.SO、謝和弦以外的饒舌、Higher Brothers、GAI、艾福杰尼、Kumachan、9m88 不算嘻哈；香港 LMF、MC 仁）12 ＋ **韓國**（Epik High、Dynamic Duo、Drunken Tiger、Garion、Verbal Jint、Dok2、Zion.T 不算、Beenzino、Jay Park、Keith Ape、E SENS、pH-1、Changmo、Lee Young Ji）10 | 22 |
| i | **法語嘻哈**（IAM《L'École du micro d'argent》、NTM、MC Solaar、Oxmo Puccino、Booba、Rohff、Diam's、Kery James、PNL、Damso（比）、Orelsan、Nekfeu、Stromae 不算、La Rumeur、Lunatic）10 ＋ **New Orleans bounce／No Limit／Cash Money**（Juvenile《400 Degreez》、Big Freedia、Mystikal、Master P、Hot Boys、B.G.、Lil Wayne 早期、Partners-N-Crime、DJ Jubilee、Magnolia Shorty）7 ＋ **Cloud／emo rap**（Yung Lean、Lil Peep、Bladee、Clams Casino 的 Instrumentals、Xavier Wulf、Bones、Lil Tracy、Spaceghostpurrp、Joji 早期不算）6 | 23 |

輸出檔：`batch-progress/thin-sub-20261020/curation-<組>.json`（h 或 i）。
**每做完 5 張就把目前結果寫進輸出檔**；若輸出檔已有部分內容就接續補完，不要從頭重寫。輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/ts-<組>/` 子目錄。
