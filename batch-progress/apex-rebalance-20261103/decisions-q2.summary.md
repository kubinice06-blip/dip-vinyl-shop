# Q2 決定清單摘要（2026-11-03）

`decisions-q2.json`：91 筆，全是 `from: null` → 新增頂點。**未改 seed／manifest／card_catalog。**
產生器：`q2/build-decisions.py`（合併 `q2/verdicts/*.json`＋主線裁定，內含硬條件斷言）。

## 數字

| | 現有 | Q1 同級去重後（估） | Q2 補 | 合計 | 目標 | 差 |
|---|---|---|---|---|---|---|
| 異端 | 54 | 41 | **44** | 85 | ~150 | −65 |
| 流亡 | 232 | 207（含拿掉《鬼島社會檔案》） | **47** | 254 | ~300 | −46 |

「Q1 後」依 2026-11-03 更正（**同級內**一藝人一張）機械估算，套用時以 Q1 實際結果對齊。

## 為什麼補不到目標：候選池本身不夠

- **異端**：152 位候選裡，6 支 Opus 代理加主線判定為「極端、有依據」的只有 40 位。其餘多半是「很前衛但聽得下去」：
  - 能量自由爵士（Sun Ra、Frank Lowe、Frank Wright、Globe Unity）
  - 碾核與技術死亡金屬（Terrorizer、Repulsion、Pig Destroyer、Meshuggah）
  - 學院前衛古典的二線錄音（Ferneyhough、Boulez、Barraqué、Xenakis 演奏版、Carter）
  - 依 PLAN 裁定 3 不收。
- **流亡**：778 張過硬條件（listeners 1–299）。其中約 560 張被代理判 1–2 分，原因是大廠、國營廠（Electrecord、PGP RTB、Amiga、Teichiku／Union Jazz、King、CBS/Sony、東芝 EMI）或已大量再發；它們冷門度 5 只是因為冷門度下限。另有約 30 張錯配。

## 主線裁定（逐條）

**異端**
- 收代理 yes＋maybe（HS1 27、HS2 13），下列 7 張除外：
  - 灰野敬二《Watashi Dake?》：同一人已取不失者。
  - Les Rallizes Dénudés《'77 Live》、The Shaggs：聽得下去。
  - Pierre Schaeffer《Musique concrète》：盤名疑為合輯。
  - de Leeuw 的 Ustvolskaya：同作曲家已取 Malov 版。
  - 高柳 New Direction Unit《Moers》：高柳系不再擠。
  - 高柳昌行《Eclipse》：改判流亡。
- 依「同級內一藝人一張」更正，主線另補 4 張「其他級已有頂點」的藝人：
  - Incapacitants《Quietus》
  - Maurizio Bianchi《Symphony for a Genocide》
  - Mazen Kerbaj《Solo Trumpet Vol. 2.1》
  - Lennon／Ono《Two Virgins》
- 代理判 6 分但沒有任何可信依據的不收，例如 Smegma、Farmers Manual、Voice Crack、高橋悠治 Herma。

**流亡**
- 收代理 yes＋maybe 33 張，含高柳《Eclipse》（原壓 100 張）。
- 主線補收 14 張代理判 4 分 no 的盤。這些盤過硬條件（listeners 有效、非錯配、冷門度 5），代理判 no 只是因為缺「聖杯」口碑。依據補 MusicBrainz＋Last.fm：
  - Mimaroğlu、Monkman《Energism》、Zoviet France《Norsch》、Philemon Arthur
  - Barney Wilen《Zodiac》、Svein Finnerud、Ric Colbeck、Piano Choir、Muriel Winston
  - Rien Djamain、Parker／Guy《Incision》、Transs、Angkanang Kunchai、Tyrone Evans
- David Tudor《Microphone》同時是兩邊候選，歸異端。

**依據網址**：208 個全部用 curl 驗過。4 個 404／逾時已移除並補上替代網址。403、429 是站方擋爬蟲，網址來自搜尋結果，予以保留。每筆至少 2 個。

## 流亡場景分布（47）

日本地下 9、自由即興 8、靈性／自由爵士 7、電子／極簡／音響 5、民謠／私民謠 4、迷幻／車庫 4、雷鬼／非洲／世界 4、其他 4、拉美／巴西 1、私壓福音／靈魂 1、**華語 0**。華語候選都是水晶等正規廠，沿用前例不收。

## 異端分布（44，以 seed 首曲風計）

電子／噪音 15、爵士／即興 11、搖滾／金屬 10、古典 8。

## 需要店主決定

1. **異端差 65 張**：要放寬到「前衛但聽得下去」的 5 分盤（池中約 65 張，可剛好補滿），還是維持 85？
2. **流亡差 46 張**：要收大廠或國營廠的冷門盤（池中約 400 張，冷門度只因下限才到 5），還是另開 `dip-card-create` 上架真正的聖杯盤補足？
