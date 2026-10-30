# add-20261030-sf02 裁定（店主 Spotify 追蹤藝人補卡池・日本：搖滾、獨立、流行、偶像、金屬）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作。交接 `batch-progress/spotify-follow-20261030/PLAN.md`；流程沿用 `batch-progress/HANDOFF-mood-cells-line.md` §二（不做 moodGuess 邊距檢查，情緒評分照 `batch-progress/mood-axes/RULES.md`、不算落格率）。本工作階段負責 sf01、sf02。
> 策展：`curation-sf02a.json`（15 位 25 張）＋`curation-sf02b.json`（15 位 21 張）→ 主線改 4、汰 1（`master-override-sf02asf02b.json`）→ `master-sf02asf02b.json`（MB 釘住 44、§1 人工 1）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf02-cards.json`（45 張；研究 a–e 各 9）。
> **預留：研究 a 30201–30210、b 30211–30220、c 30221–30230、d 30231–30240、e 30241–30250、鉤子 30251–30260、寫作 30261–30270、主線 30271–30280。**（spotify-follow 線條號＝30000＋批號×100，sf01 用 30101–30180。）
---

## 主線策展（不佔條號）
- 名單 30 位（`batches.json` sf02），**30 位全收，跳過 0 位（已在池 0）**：策展兩組以原文、羅馬拼音、MB 別名查 `seed_cards.json`、`data/artist-intros/`、`aliases.json`；主線再對 origin/main 與 146 條 `claude/*` 分支的 seed 與 10-30 卡單跑一次藝人層去重，命中只有子字串誤中（Hole、Twinkle Brothers、Kano 等），0 撞。
- 身分裁定：
  - Kinokoteikoku＝きのこ帝国；Chugakusei Kanoke＝中学生棺桶；Joe Yamanaka＝ジョー山中；Cosmos Factory＝コスモス・ファクトリー；Bakufu Slump＝爆風スランプ；InugamiCircusDan＝犬神サーカス団；Himekami＝姫神；Hiyajo Atsuko＝比屋定篤子。
  - **Shizuka＝静香**（主線定）：策展 b 以 MB 多位同名列不收；主線依名單脈絡（日本地下／迷幻同場景）與 MB 關係（Shizuka 三浦静香為樂團「静香」創團主唱，PSF Records）定為迷幻搖滾團静香，收唯一錄音室專輯《天界のペルソナ》1994（其餘多為現場與 Other）。
  - yuragi＝揺らぎ（MB 藝人名；shoegaze 樂團），掛名改 MB 正規名。
  - ピューパ 掛名改 MB 正規名「ピューパ!!」。
  - KIRINJI：《3》《Fine》發行時名義是キリンジ，掛名統一用現名 KIRINJI（藝人介紹單一鍵），queryAlias 帶キリンジ。
- 主線改／汰：
  - Thee Michelle Gun Elephant 第二張《Casanova Snake》→《GEAR BLUES》（1998；與《Chicken Zombies》並列樂團公認兩高峰）。
  - THE天国畑JAPON：策展收的《HIGHROCKER》MB 掛名是別名企劃 PUNK ROCKER LABOR UNION、7 首，改收本團名義正規專輯《BORONGE》2018（MB 查無，§1 人工：Discogs 15314386、Apple 1400033521）；掛名照 Apple「THE 天国畑 JAPON」。
  - 汰 姫神《遠野》1982：MB 名義為前身「姫神せんせいしょん」，與卡上掛名不一，只留《奥の細道》。
- 留下的待研究層核對：比屋定篤子《ルア・ラランジャ》MB 首發日空白，年份 1999 取 iTunes；GRASS VALLEY 為 1980 年代同名樂團（推定）；NTsKi《Orca》曲數；中学生棺桶、COHOL、ピューパ!! 代表作依據有限。各張 moodGuess 只是參考，本線不據以汰卡。
