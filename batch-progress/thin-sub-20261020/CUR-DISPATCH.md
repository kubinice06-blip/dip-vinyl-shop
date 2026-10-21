# 薄細項策展線（ts）策展派工（2026-10-20）

店主：「幫我掃描一下細項是否有些太少，比如越南搖滾只有一張；太少的策展增加卡池。」→「開始跑」。
計畫見 `batch-progress/EXPANSION-PLAN-thin-subgenres.md`。每組只負責自己的範圍，不越界提名。

## 共同規則
- **收「該地區的搖滾正典」**：在地最重要、最有代表性的錄音室專輯（含 60–70 年代的 garage／psych／beat，80–90 年代主流搖滾與另類，2000 後的獨立）。主流流行歌手不收；以樂團或搖滾創作人為主。
- **只收正規專輯**：不收單曲、EP、精選。**例外**：60–70 年代東南亞樂團很多只出過 EP 或卡帶、後來由考古廠牌（Sublime Frequencies、Dust-to-Digital、Light in the Attic、Strut、Soundway、Now-Again、Paradise Bangkok…）**以專輯形式**整理再發——這類考古合輯可收，但要在 `why` 寫明「考古整理盤」，並標 `releaseException: "archival-compilation"`（走 ALBUM_ONBOARDING §5.6）。
- **去重**：每張都要跑下面的指令，輸出 0 才可提（藝人名互為子字串也算撞）：
  `node -e 'const s=require("./seed_cards.json");const n=x=>x.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu,"");const [a,b]=process.argv.slice(1);console.log(s.filter(r=>n(r[1])===n(b)&&(n(r[0]).includes(n(a))||n(a).includes(n(r[0])))).length)' "藝人" "專輯"`
  另外先看該藝人在池中已有幾張：`node -e 'const s=require("./seed_cards.json");const a=process.argv[1].toLowerCase();console.log(s.filter(r=>r[0].toLowerCase()===a).map(r=>r[1]))' "藝人"`
- **同一藝人沒有張數上限**（2026-09-04 店主：「並沒有一個人只限三張這種限制」，`batch-progress/c53/rulings.md` 第 150 條）。判準只有「這張碟夠不夠格、池中有沒有」。
- **身分兩條路，二選一**：
  1. **MB 釘得住**：查 `https://musicbrainz.org/ws/2/release-group?query=artist:"…" AND releasegroup:"…"&fmt=json`（header `User-Agent: dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，**每秒最多 1 次**，503 等 2 秒重試），取 `primary-type=Album`（考古合輯可為 Compilation），填 `mbRgMbid`。
  2. **MB 查無 → 人工身分**（ALBUM_ONBOARDING §1）：`mbRgMbid` 留空，另填
     `mbAbsenceProof: {queries:["實際下過的 MB 查詢（藝人方向）","（作品方向）"], checkedAt:"2026-10-20", conclusion:"具體查無情況，例如 artist count=0／有藝人但無此 release-group"}`、
     `manualEvidenceUrls: ["至少兩個 https：Discogs master／release、唱片公司或官方頁、館藏目錄、維基"]`。
- **名稱**：MB 有就照 MB 正規名（連字號用 ASCII `-`，MB 常用 U+2010，不要照抄）；越南文保留聲調符號；泰文、高棉文、烏爾都文、蒙古文掛名照**該唱片封面主要印的文字**（池中先例：`คาราบาว`、`คาราวาน` 用泰文，`Caravan (Thailand)` 用英文——兩種都有，選封面主文字），`queryAlias` 欄寫另一種寫法。
- **年份**＝原盤首發年；考古合輯寫再發年並在 `why` 註明收錄年代。
- **曲風** `genres`：第一個一律 `rock`；第二個可選 `pop`／`world`／`folk`／`electronic`。
- **WebSearch 每組最多 10 次**（整個工作階段共用 200 次額度），多用 MB API 與 WebFetch 維基／Discogs。
- 每張至少 2 個 https 證據網址。

## 分組
| 組 | 範圍 | 張數 |
|---|---|---:|
| a | **越南**（西貢 60–70 年代 CBC Band、The Black Caps、Uptight、Phượng Hoàng、Lê Uyên Phương 一類；1990s 起 Bức Tường、Microwave、Ngọt、Cá Hồi Hoang、Chillies 一類）＋**柬埔寨**（60–70 年代 Sinn Sisamouth、Ros Sereysothea、Pan Ron、Yol Aularong、Baksey Cham Krong 一類；當代 Dengue Fever 是美國團，可收 1 張並註明）＋**新加坡**（60s The Quests、The Crescendos 已有…；90s 起獨立） | 30 |
| b | **泰國**（Carabao、Caravan 已在池；收 phleng phuea chiwit 其他、80–90s 泰國搖滾、2000 後獨立）＋**菲律賓**（Pinoy rock 正典：Asin、Hotdog、Rivermaya、Wolfgang、Up Dharma Down、Sandwich、Razorback…；Eraserheads 已有 2 張）＋**馬來西亞**（80–90s Malaysian rock、Search／Wings 已在池、pop yeh-yeh 樂隊） | 32 |
| c | **巴基斯坦**（Vital Signs、Strings、Noori、Entity Paradigm、Mekaal Hasan Band、Fuzon；Junoon 已 1 張）＋**印度**（Indian Ocean、Parikrama、Avial、Motherjane、Peter Cat Recording Co.、The Local Train、Thermal and a Quarter）＋**蒙古**（The Hu、Haranga、Hurd、Altan Urag、Mohanik）＋**孟加拉／斯里蘭卡／尼泊爾**（Azam Khan、Miles、Warfaze、Shironamhin…可選）＋**印尼補缺**（池中已 28 張 60–80s，補 1990 後：Dewa 19、Sheila on 7、Pure Saturday、Efek Rumah Kaca、Seringai、Navicula、The SIGIT 一類） | 30 |

## 輸出格式（每組一個檔）
`batch-progress/thin-sub-20261020/curation-<組>.json`：
```json
{"group":"a","factions":[{"id":"vn","zh":"越南","count":0,"why":""}],
 "albums":[{"artist":"","album":"","year":0,"label":"","country":"vn","faction":"vn","genres":["rock","pop"],
   "why":"一句收錄理由（為什麼是該地搖滾代表作）","evidence":["https://...","https://..."],
   "mbRgMbid":"","mbAbsenceProof":null,"manualEvidenceUrls":[],"releaseException":"","queryAlias":"","uncertain":""}],
 "notes":[]}
```
`country` 用 `rock-asia-country-map.json` 的代碼：vn／kh／sg／th／ph／my／pk／in／mn／id，孟加拉 bd、斯里蘭卡 lk、尼泊爾 np。
**每做完 5 張就把目前結果寫進輸出檔**；若輸出檔已有部分內容就接續補完，不要從頭重寫。
不要 git add／commit，不要改其他任何檔案。完成後回報：各地區張數、MB 釘住／人工身分各幾張、疑點。
