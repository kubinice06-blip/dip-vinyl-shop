# 薄細項策展線 ts7–ts10（越南／泰國／新加坡／蒙古搖滾補到 50）策展派工（2026-10-20）

店主 2026-10-20：「越南 泰國 新加坡 蒙古 多補充 補到至少 50（不能因此水掉，還是要讚的）」。
現況（類型樹 搖滾 › 日亞搖滾 國別節點）：越南 15、泰國 12、新加坡 11、蒙古 5。

共同規則、去重指令、身分兩條路（MB 釘住／§1 人工身分）、名稱、證據、輸出格式與續跑，**全部照 `batch-progress/thin-sub-20261020/CUR-DISPATCH.md`**，只有下面幾點不同或加嚴：

## 品質門檻（這次的重點）
- **每張都要「讚」**：要有具體的好評證據才收——當地或國際樂評推崇、年度／史上最佳榜單、重要獎項、場景里程碑（第一張某某、開創某風格）、或是後輩公認的經典。`why` 必須寫出這個證據（一句話＋來源在 `evidence`）。
- **寧缺勿濫**：真的找不到夠格的就停，**不要為了湊數收普通的碟**。湊不滿目標數時在 `notes` 寫明「夠格的只到 N 張」與理由，主線會照實回報店主。
- **同一藝人沒有張數上限**（2026-09-04 店主裁定；本行 2026-10-21 更正，原文誤寫「最多 3 張」）。但同團的每一張都要各自夠格，不是「同團另一張」就收。
- 池中已有（不要重提）：
  - 越南：Phương Tâm《Magical Nights》、Bức Tường 3 張（已滿）、Microwave《Lối thoát》《Thời gian》、Ngũ Cung《365000》、Ngọt《Ngọt》《Gieo》、Cá Hồi Hoang《Hiệu Ứng Trốn Chạy》《Gấp》、Chillies《Qua Khung Cửa Sổ》、Thủy Triều Đỏ《Nắng mới》、Sàigòn Soul Revival《Họa âm xưa》、Raditori《NHỮNG CON NGƯỜI》。
  - 泰國：Khun Narin 2 張、คาราบาว《เมด อิน ไทยแลนด์》《เวลคัมทูไทยแลนด์》、Loso 2 張、Silly Fools《Candyman》、bodyslam 同名、Slot Machine 同名、Moderndog《เสริมสุขภาพ》、Potato《Life》、พงษ์สิทธิ์ คำภีร์《เสือตัวที่ 11》。
  - 新加坡：Sweet Charity 2 張、The Quests《Questing》、Zircon Lounge《Regal Vigor》、The Oddfellows《Teenage Head》、The Great Spy Experiment《Flower Show Riots》、Humpback Oak《Ghostfather》、The Observatory《Blank Walls》、Electrico《Hip City》、Rusty Blade《Awas!》、Western Union Band 同名。
  - 蒙古：The HU《The Gereg》《Rumble of Thunder》、Altan Urag《Made in Altan Urag》、Hurd《Мянган жилд ганц》、Haranga《Color of the World》。
- **只收搖滾**：`genres` 第一個一律 `rock`（含 garage、psych、post-rock、shoegaze、金屬、folk rock、ethno-rock、indie rock、math rock、pop rock 樂團）。主流流行歌手、嘻哈、純電子不收。民族樂器融合搖滾可收（蒙古 ethno-rock、泰國 phleng phuea chiwit 樂團、越南民族搖滾）。
- 60–70 年代只有單曲／EP 的老團，考古廠牌整理成專輯的可收（`releaseException: "archival-compilation"`），但每國最多 3 張。

## 預算
- **WebSearch 每組最多 5 次**（整個工作階段共用額度已用掉一大半）。身分走 MB API，資料走 WebFetch 維基／`https://api.discogs.com/releases/<id>`、`/masters/<id>`、`/database/search` 不可用就改 `/artists/<id>/releases`（帶 `User-Agent: dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，每秒 1 次）。

## 分組（提名數含汰換餘量）
| 組 | 範圍 | 提名 |
|---|---|---:|
| p | **越南（一）**：1960–70 年代西貢樂團（CBC Band、The Black Caps、Uptight、Phượng Hoàng、The Rocking Stars 一類，含考古整理）、1990–2000 年代前期（Bức Tường 以外的 Atlantis、Da Vàng、Gạt Tàn Đầy、Small Fish…）、越南重金屬／民族搖滾、海外越南人搖滾團（要註明） | 20 |
| q | **越南（二）**：2005 後獨立與另類（Ngọt、Cá Hồi Hoang、Chillies 的其他夠格專輯、Microwave、Ngũ Cung 其他、Thủy Triều Đỏ、7UPPERCUTS、Gỗ、Rosewood、Ra Khơi、Mademoiselle、Lộn Xộn Band、Sputnik Mothership、Ngủ Ngày Ngập Lụt、Dế Choắt 不算〔嘻哈〕…） | 22 |
| r | **泰國（一）**：1970–2004（Carabao、Caravan／คาราวาน、Asanee–Wasan、Micro、Nuvo、Silly Fools、Moderndog、Loso、Big Ass、Clash、Labanoon、Sek Loso、Pru、Crub、Joey Boy 不算、Hi-Rock、Ebola、Paradox、Retrospect…，phleng phuea chiwit 樂團也可） | 22 |
| s | **泰國（二）**：2005 後（Desktop Error、Apartment Khunpa、Two Million Thanks、Yellow Fang、Inspirative、Hope the Flowers、Slur、The Yers、Cocktail、Tattoo Colour、Sweet Mullet、Stoondio、Slot Machine 其他、bodyslam 其他、Paradox 晚期、Safeplanet、Polycat 不算〔流行〕、Srirajah Rockers、The Paradise Bangkok Molam International Band…） | 22 |
| t | **新加坡**：1960s（The Crescendos、The Thunderbirds、Naomi & The Boys、The Silver Strings）、1990s（Concave Scream、Stompin' Ground、Opposition Party、Livonia、Plainsunset、The Padres、Force Vomit、The Pinholes 前身）、2000 後（The Observatory 其他、The Pinholes、Caracal、Amateur Takes Control、I Am David Sparkle、Obedient Wives Club、Cockpit、The Sam Willows 不算、Typewriter、Sobs、Subsonic Eye、Forests、.gif 不算、Wormrot〔grindcore 可〕、Rudeboy Faction…） | 46 |
| u | **蒙古**：Soyol Erdene（Соёл Эрдэнэ）、Haranga、Hurd 其他、Chinggis Khaan、Kharanga、Nisvanis、Mohanik、Magnolian、Altan Urag 其他、The HU 其他、Domog、Jonon、Night Train、Batzorig Vaanchig 樂團作品、Tengger Cavalry 不算（美國團）…；蒙古樂壇規模小，**夠格的就收、不夠就停**，把實際能找到的夠格數寫進 notes | 最多 52 |

輸出檔：`batch-progress/thin-sub-20261020/curation-<組>.json`（p／q／r／s／t／u）。`country`：vn／th／sg／mn。
**每做完 5 張就把目前結果寫進輸出檔**；若輸出檔已有部分內容就接續補完，不要從頭重寫。輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/ts-<組>/` 子目錄。
p／q 兩組、r／s 兩組各自同時跑：**提名前先讀對方的輸出檔**避免重複（以時代切開為主）。
