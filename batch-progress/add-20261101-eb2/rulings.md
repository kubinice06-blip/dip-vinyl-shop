# add-20261101-eb2 裁定（鐵幕爵士＋MPS 策展線・匈牙利＋捷克斯洛伐克）

> 店主 2026-11-01：「Yancy Körössy* - Identification 收錄 並且擴展相關專輯」→「擴張到 200 張」（交接 `batch-progress/eastbloc-jazz-20261101/PLAN.md`）。本工作階段負責 eb1、eb2。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-eb2a.json`（24：匈牙利）＋`curation-eb2b.json`（24：捷克斯洛伐克）→ 主線汰 8（`master-override-eb2aeb2b.json`）→ `master-eb2aeb2b.json`（40 張：MB 釘住 21、§1 人工 19）→ `pick.json`（40）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261101-eb2-cards.json`（40 張；研究 a–e 各 8）。
> **預留：研究 a 47101–47110、b 47111–47120、c 47121–47130、d 47131–47140、e 47141–47150、鉤子 47151–47160、寫作 47161–47170、主線 47171–47180。**（eb 線條號：ebN → 47001＋(N−1)×100 起，每批 80 條。）
---

## 主線策展（不佔條號）
- **策展 48 張 → 收 40 張（匈牙利 22、捷克斯洛伐克 18）；對 seed 與 origin 163 條 main／claude/* 分支 seed 去重 0 撞。**
- **匈牙利人名照卡池慣例用西式「名 姓」**（池中 Gabor Szabo、Gábor Lázár、Ernő Dohnányi、Dezső Ránki 皆然）；團名照封面。同一人統一掛名以便藝人介紹歸戶：Szabados Quartet《Az Esküvő》→「György Szabados」；《A Szarvassá Vált Fiak》→「György Szabados & MAKUZ」；Pege Trio《Bass On Top》→「Aladár Pege Trio」。原寫法放 queryAlias。
- Walter Norris & Aladár Pege《Synchronicity》（Enja，西德錄）國別改 hu：派系屬匈牙利，Pege 為主角之一。
- **主線汰 8**：Mária Toldy《Viaszbaba》（爵士化流行／bossa，爵士歸屬邊緣）、Károly Binder《Kontinentspiel》（Binder 另收 1983 與 Tchicai 合作盤）、Velebný & SHQ《Jazzové nebajky》（SHQ 已收《Nonet》《Motus》）、Jazz Q《Symbiosis》（Jazz Q 留《Coniunctio》《Pozorovatelna》）、Stivín《Zvěrokruh》（Stivín 留《5 ran do čepice》《Výlety》）、Energit《Piknik》（Energit 留首作）、Brom & Maynard Ferguson《Maynard + Gustav》（策展自己存疑是否錄音室盤）、Fermáta《Huascaran》（Fermáta 留首作；年份三源不一）。
- MB release-group 首發日為重發年的照釘：Csaba Deseő《Ultraviola》（MB 2009 重發，原盤 1977 Pepita）；Jazz Q《Pozorovatelna》MB 掛名 Jazz Q Praha，同一團。

## 研究 b 組（47111–47120）
- **47111**　Aladár Pege Trio《Bass On Top》：Discogs release 8157958／master 1591988 是 1966 Supraphon SUK 35627 的 **7 吋 45 轉單聲道 EP（兩曲）**，不是完整 LP。標 thin，建議主線決定是否保留（規模存疑）。
- **47112**　György Vukán《Derby》：實為兩幕舞劇組曲（管弦樂＋銅管＋Super Trio 列名），非爵士鋼琴專輯；moodGuess 存疑（偏重、戲劇性，非輕）。年份 Discogs 1989、影片說明 1988，採 1989。
- **47113**　Szakcsi Lakatos《Sham》：錄音 1989-12，Hungaroton 影片的 1989-07-04 牴觸，發行年採 1990；〈Crying For Temesvár〉與羅馬尼亞起義只寫「曲名指向」。
- **47114**　Gonda Sextet《Sámánének》：hu 維基記 1975，Discogs／MB／℗ 皆 1976，採 1976。
- **47115**　Ultraviola：廠牌採 Pepita（SLPX 17504），hu 維基記 Hungaroton；年份 1977 保留（影片 1976-04-28）。
- **47116**　Super Trio《Birthday Party》：Discogs 1987、影片 1986-10-19，保 1987；無獨立樂評故 thin。
- 其餘（Synchronicity、Tomsits）無推翻。全組 8 張，facts 8–9 條，Discogs API 以 WebFetch 讀取（直連 curl 被權限擋）。

## 主線（條號 47171–47180）
- 47171：照研究 b 組推翻策展層換 2 張。**Aladár Pege Trio《Bass On Top》**：Discogs master 1591988 只有兩個版本，皆 1966 Supraphon 7 吋 45 轉（〈Salute To Ray Brown〉〈Dalia〉兩首），是單曲不是專輯，汰。**György Vukán《Derby》**：兩幕舞劇組曲，管弦樂團＋Budapest Brass Ensemble＋人聲，Vukán 掛作曲指揮，不是爵士盤，汰。補回主線先前汰換區的 **Károly Binder《Kontinentspiel》**（1989 Krém，MB 釘住）與 **Energit《Piknik》**（1978 Panton，MB 釘住），同置 group b 原位，由研究 b 組補研究。匈牙利 21、捷克斯洛伐克 19。
