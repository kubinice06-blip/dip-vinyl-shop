# Bandcamp downtempo 候選（2026-11-05）

店主：「Bandcamp 有 downtempo 分類，可以從那邊開始找」「先至少抓出 500 張」。

- 來源：`scripts/bandcamp-discover.mjs`，tag `downtempo`（top 40 頁）＋`downtempo` 與 trip-hop／chillout／ambient／electronica／jazz 交集（各 12 頁）；dub 交集不收（店主：嘻哈雷鬼 dub 太多）。
- 過濾：6 首、28 分以上；扣卡池既有（pool-keys，含 manifest）與 `data/pool-removed.json`；扣 Various Artists 與盤名含 live／remix／edit／compilation／vol.／EP／soundtrack 等。
- 結果：1,841 張，Last.fm 收聽人數（worker `/album-rating` 的 `_listeners`）排序 → `candidates-ranked.json`；前 600 張（第 500 名約 1,200 聽眾、第 600 名 720）→ `top600.json`，店主勾選頁 artifact `https://claude.ai/artifact/4ks5RzuhcCsVgjg8mWrVEK`（db `skip`＝不要）。
- 下一步：店主勾完後切批上架（照 mood-cells 線流程，研究層判恍惚／頹靡落格、查故事性與身分）。

## 預估落格（2026-11-06）

店主同意先粗估再上架。600 張抓 Bandcamp 專輯頁 keywords（566 張有），4 支 Sonnet 照 `score500/BRIEF.md` 估三軸（不上網、多數把握低），寫回 `top600.json`（`c` 預估格、`xyz`、`w` 聲音、`cf` 把握、`sure` 離邊界遠）。
結果：恍惚 218（穩 44）、頹靡 85（穩 45）、放鬆 145、暴躁 55、雀躍 43、沸騰 33、平靜 12、冷冽 9。勾選頁加「預估落格」篩選。

## 擴充到 1,901 張（2026-11-06）

店主：「應該可以挖超過 600 張吧？」downtempo 翻 160 頁（5,365）＋ trip-hop／chillout／psybient／lounge／nu-jazz 各 25 頁，去重後新增 5,361 張；Last.fm 收聽 ≥1,000（扣 remixed／redux／dub 版）1,301 張，同法粗估落格（9 支 Sonnet），與前 600 合併 → `candidates-1901.json`。
預估：恍惚 614（穩 148）、頹靡 287（穩 141）、放鬆 456、雀躍 184、暴躁 174、沸騰 95、平靜 55、冷冽 36。勾選頁同一個 artifact（v3）。
另：Bandcamp discover API 2026-11-06 改回駝峰欄位，`bandcamp-discover.mjs` 已兩種都收。

## 上架第一輪：離邊界遠的 289 張（2026-11-06）

店主：「先做最遠的」。預估落格離邊界遠（恍惚 x≤2.7、y≥0.8、z≥0.3；頹靡 x≤2.7、y≥0.8、z≤−0.3）的 289 張，店主勾「不要」0 張。依收聽人數輪流分配成六批：
恍惚 `pick-ml68.json` 50、`pick-ml69.json` 49、`pick-ml70.json` 49；頹靡 `pick-md39.json` 47、`pick-md40.json` 47、`pick-md41.json` 47。
條號：ml68 23481、ml69 23561、ml70 23641、md39 23721、md40 23801、md41 23881。藝人介紹批號 ar-d-521～526。三個子工作階段各兩批。

## 第一輪結果與第二輪（2026-11-06）

第一輪（ml68–70、md39–41，卡單 289）：上線 104、落目標格 92（恍惚 42、頹靡 50），PR #399／#400／#401。汰掉的主因：合輯／EP／同人超量、標 downtempo 卻有舞池／四拍／breakbeat 推進。
店主：「繼續」。剩下靠近邊界的 612 張先照第一輪教訓過濾：Bandcamp 標籤含 house／techno／breakbeat／funk／electro／disco／club／dance／trance／dubstep／drum／jungle／garage／synthwave／hip-hop／rap／reggae／dub／soul／r&b／pop 的拿掉（378），<30 分的拿掉（2）→ 232 張。
第二輪卡單：恍惚 `pick-ml71.json` 52、`pick-ml72.json` 52、`pick-ml73.json` 51；頹靡 `pick-md42.json` 39、`pick-md43.json` 38。條號 ml71 23961、ml72 24041、ml73 24121、md42 24201、md43 24281；藝人介紹 ar-d-527～531。

## 第二輪結果與「有鼓」名單（2026-11-06）

第二輪（ml71–73、md42–43，卡單 232）：上線 53、落目標格 44，PR #403／#404／#405。整條 Bandcamp 線（md37／38、ml66／67、兩輪卡單）上線 200、落恍惚／頹靡 164。
店主：「鼓推進有時候其實也沒關係，給我看那些名單」→ `beat-candidates.json` 473 張＝研究層判有拍推進而汰的 93 張（各批 `dropped-research.json`＋rulings 理由）＋第二輪前標籤篩掉的 380 張；勾選頁 artifact `https://claude.ai/artifact/VkquPFK8sauuHedAogkcC9`（db `want`＝要）。

## 第三輪：有鼓名單 473 張全部上架（2026-11-06）

店主：「有些要死不活的音樂也會有鼓推進」→ CUR-DISPATCH 加「有鼓不等於躁」（PR #407）；「全都上架吧」。
卡單依預估格切十批：恍惚 `pick-ml74.json`～`pick-ml81.json`（各約 47），頹靡 `pick-md44.json`、`pick-md45.json`（各約 48）。每列 `source`＝研究判有鼓／標籤篩掉，`priorDrop`＝當初汰的理由；研究判有鼓的 93 張在原批 `batch-progress/add-20261106-<批>/dropped-research.json` 已有研究稿，可直接沿用（`priorDrop` 開頭是原批號）。
條號：ml74 24361、ml75 24441、ml76 24521、ml77 24601、ml78 24681、ml79 24761、ml80 24841、ml81 24921、md44 25001、md45 25081。藝人介紹 ar-d-807～816。
