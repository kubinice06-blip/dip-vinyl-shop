# add-20261106-md40 裁定（情緒薄格線・頹靡：Bandcamp downtempo 候選 md40）

> 店主 2026-11-06：協調端從 Bandcamp downtempo 等標籤抓 1,901 張、依 Last.fm 收聽排序、便宜模型粗估落格；店主選「先做最遠的」——預估離邊界遠的 289 張分六批，三個工作階段並行。本工作階段做 md40＋md41（並行：ml68＋ml69、ml70＋md39）。卡單 `batch-progress/bandcamp-dt-20261105/pick-md40.json`（47 張）即策展結果，不派策展代理；說明見同目錄 `README.md`。
> 目標格：**頹靡＝靜（x<3.0）＋重（y≥0.5）＋冷（z<0）**；評分照 `batch-progress/mood-axes/score500/BRIEF.md`（10-23 店主體感標準）。卡單的 moodGuess 是只看 Bandcamp 標籤的粗估、把握多半 low，**研究層要照聲音再判一次**：判輕、有拍子推進、判暖的汰掉，不補人。
> 流程：卡單 47 → 主線初篩（身分、去重、資格、文案直述聲音）→ `curation-md40.json`（32）→ `master-md40.json`（MB 釘住 32、§1 人工 0）→ `build-cards.mjs` → 研究 3 組（a 11、b 11、c 10；組數由五組併成三組，壓尖峰代理數）。
> **預留：研究 a 23801–23810、b 23811–23820、c 23821–23830（d、e 不用）、鉤子 23851–23860、寫作 23861–23870、主線 23871–23880。**
---

## 主線初篩（不佔條號；2026-11-06）
- 身分：Bandcamp 專輯頁 ld+json（發行日、曲數、總長、發行者）＋ MB release-group 查詢（score 100、primary Album、無 secondary）逐張比對；留下的全數 MB 釘得住。
- 去重：`dedup-md37.mjs`（seed、所有 manifest、`data/pool-removed.json`、所有卡單、所有 curation）0 撞。
- **主線初篩汰 15**（卡單 47 → 32）：
  - 資格（EP／合輯／demo 集／remix）：Arms and Sleepers《NOSTALGIA FOR THE ABSOLUTE》（MB 標 EP、28 分）、All India Radio《Diamonds In The Dark》（Bandcamp 自述「orphaned songs」合集）、36《The Lower Lights》（MB Album＋Compilation）、All India Radio《ISO 2020》《Utopia 2021》（Patreon demo／早期混音集）、2814《Lost Fragments》（MB Compilation，稀有曲與未發表）、Sorrow《Unrequited》（MB EP、29 分）、Kaya Project《Ambient Mixes 2》（舊曲重製混音）。
  - 去重：Yagya《Stormur》（md8 已提名、研究後以「純 techno、像 DJ set」汰掉，不再提）。
  - 聲音明顯不落頹靡（文案直述）：Martin Nonstatic《Granite》（「smooth catchy drifts、soothing」，判暖判輕）、International Observer《Seen》（旋律 dub、「gorgeously seductive」，判暖；店主 11-05 dub 太多）、Moth Equals《Honey Trap》（「colourful plunderphonics、sticky melodies、runny beats」）、Gaudi & Antonio Testa《CONTINVVM》（民族打擊樂儀式、psydub；MB 查無、2005 錄 2018 發）、rest symbol《rest symbol》（「smoke-choked soul、psychedelic dub、exotica」判暖，29 分）、Lavurn《Baby it Cold Outside》（R&B、懷舊情歌，判暖）。
- 年份以原盤首發為準：Blackbird《Lonely Bird》2018（2026 Doki Doki Beats 重發）、mars kumari 2023（Bandcamp 2023-12-01 早於 MB 2024-02-21）、Bed《Spacebox》2002。
- 自我同名：Halou《Halou》（MB rgMbid 釘住，2008 年 Halou 第四張專輯，身分以 rgMbid 為證）。
- 同人多張：Disparition 3、Between Interval 2、2814 1（池中另 1）、All India Radio 1；同人不設上限。


## 研究 c 組（23821–23830；2026-11-06）
- 23821 Martin Stürtzer《Illumination Cycle》：moodVerdict borderline（Berlin School 音序脈動 x 風險）。單源（只有 Bandcamp＋Synphaera 廠牌官網），status thin。身分無誤。
- 23822 mars kumari《I Thought I Lost You》：moodVerdict keep（文案 mournful／tenebrous／power electronics）。單源 thin。建議 label 改 Bruiser Brigade（卡單寫藝人名）；年份 2023 維持。
- 23823 Bed《Spacebox》：moodVerdict drop（DeBaser 樂評：鼓刷、低音大提琴、幾乎全原聲，判輕、y 不足）。建議 label 改 Ici d'ailleurs（IDA022）；年份 MB 2002／Bandcamp 2003-03-11 有落差，維持 2002、寫作層勿寫具體日。單源（用戶樂評）thin。
- 23824 Black Boboi《Sepia》：moodVerdict borderline（trip-hop＋techno 拍、旋律起伏、合唱人聲）。Tokyo ON＋Bandcamp，full。
- 23825 Rún《Rún》：moodVerdict borderline（y 重、z 冷證據強；〈Terror Moon〉雷鳴打擊 x 風險）。Rocket Recordings 廠牌頁＋Bandcamp，full（無獨立樂評）。
- 23826 Disparition《Granicha》：moodVerdict drop（雙專輯、techno／工業／爵士／流行雜陳，Brainwashed 稱 crisp and vibrant）。moodGuess 推翻。full。
- 23827 worriedaboutsatan《Crystalline》：moodVerdict borderline（專輯層級無聲音文字，樂團史顯示 glitch／techno 根基）。單源 thin。
- 23828 il:lo《Lucent》：moodVerdict drop（文案 tension and hope、invigorating、light emerges）。單源 thin。
- 23829 Burning Pyre《Imago》：moodVerdict borderline（pristine、melodic stabs、skittering percussion 判輕；enveloping subs／dub 支持重）。Bandcamp 與 Rubadub 同稿，單源 thin。
- 23830 Disparition《Palm in Mirror》：moodVerdict drop（官網直述 storm of driving beats、shimmering textures）。moodGuess 推翻。full（藝人官網為自家稿）。
- 彙總：drop 4（Bed、Granicha、Lucent、Palm in Mirror）、borderline 5、keep 1（mars kumari）。WebSearch 用 3 次（Disparition 無評、Bed 取得 AllMusic／Uncut 摘要但頁面 403、Burning Pyre／il:lo 無結果）。

## 研究 b 組（23811–23820；2026-11-06）
- 23811 Blackbird《Lonely Bird》：moodVerdict borderline（僅標籤 future garage／dubstep／trip hop，無聲音文字，x 有 2-step 風險）。單源 thin。原發 2018 自行發行，Doki Doki Beats 為 2026 重發廠牌；Discogs 稱法國製作人，與卡單 country us 矛盾，建議不寫國籍。
- 23812 Now Always Fades《Coalesce》：moodVerdict drop（廠方文案 bright、uplifting、warm、breakbeat，判暖且有拍）。moodGuess 推翻。單源 thin。
- 23813 2814《Rain Temple》：moodVerdict keep（drone、遙遠人聲、A.V. Club 比擬 This Mortal Coil／Andy Stott）。full。country 英美，非單純 gb。
- 23814 All India Radio《The Unified Field》：moodVerdict borderline（殘響 tremolo 吉他、Duster／Lynch 方向對；〈Catch The Breeze〉有人聲、z 風險）。full。數位版自行發行，實體 Spectra SPECTRA019，label 欄主線裁。
- 23815 Disparition《Transmutations》：moodVerdict borderline（IDM／downtempo 標籤、無聲音文字）。thin。label 欄是自行發行。
- 23816 Space Afrika《Quiet Storm》：moodVerdict borderline（人聲客串、弦樂、爵士打擊，與前作 industrial-noir 不同）。full（Clash＋Wikipedia 同源）。**label 應更正為 Dais Records（DAIS232）**。
- 23817 Lauge《Echoes》：moodVerdict borderline（無鼓 drone，但自然題材 ambient 恐判輕、無冷暖依據）。單源 thin。label 欄疑為帳號名拼接，真廠牌疑 Baba Gnohm，待證。
- 23818 Pye Corner Audio《Lake Deep Memory》：moodVerdict borderline（無鼓、磁帶嘶聲、彈簧殘響，靜重成立；樂評稱平和、旋律導向、有光，z 風險）。full。
- 23819 conelrad《Sure is the Risk Made》：moodVerdict borderline（僅標籤）。單源 thin；Wikipedia 僅證曲名與史事同名，不可寫成專輯主題。建議主線考慮汰換。
- 23820 Phelios《Astral Unity》：moodVerdict keep（暗黑 ambient，Discogs 樂評 hypnotic、ritualistic percussion、ominous）。full。Bandcamp 頁為含 5 首 bonus 的 12 首自行重發，原版 CD 7 首。
- One Arc Degree《The Glow Beneath》（共用 23820 區間尾，另記）：moodVerdict borderline（dub techno 標籤、x 風險）。thin。**country 應為希臘二人組，非 us**（us 是 Synphaera 廠牌所在）。
- 彙總：keep 2、drop 1、borderline 8。WebSearch 用 3 次（Pye Corner Audio 取得評論、One Arc Degree 與 Disparition 無專輯評）。Wikipedia、Discogs API、Clash、A.V. Club、Complex Distractions 以 curl 直抓。

## 研究 a 組（23801–23810；2026-11-06）
- 23801 Headache《The Head Hurts…》：moodVerdict borderline（只有標籤與兩句 Bandcamp 文案，鼓拍無來源）。label 推翻：Headache→PLZ Make It Ruins（MB PLZ051）。Headache 為 Vegyn 別名（維基 Vegyn 條）；AI 人聲說單源，寫作層慎用。thin。
- 23802 moby《Destroyed》：moodVerdict borderline（Moby 自述「凌晨兩點空城」利靜冷；但有旋律人聲曲、Spin 稱中速）。Mute 保留（MB 有登記）。full。
- 23803 Just Mustard《Heart Under》：moodVerdict borderline（noise rock、工業吉他、無副歌利重冷；有鼓與 scything guitars，x 風險）。full。
- 23804 Aydio《Nonentity》：moodVerdict drop（Kraak 頁：長笛、小提琴、trippy melodies、laid back；hip-hop／dub／爵士）。label 推翻→Kraak Records（KRK028）。moodGuess 推翻。thin。
- 23805 Halou《Halou》：moodVerdict borderline（Guthrie 吉他霧利重；歌曲式旋律、人聲，z 未必冷）。label 推翻→Vertebrae Music Productions（MB 數位版＋維基）。full。
- 23806 MANES《Slow Motion Death Sequence》：moodVerdict borderline（Metal Trenches：暗沉 subdued；廠牌 hook-ridden pop、PopMatters busier）。full。
- 23807 Between Interval《Autumn Continent》：moodVerdict keep（三篇獨立樂評：冷風 drone、旋律缺席）。label 推翻→Spotted Peccary（SPM-1602）。真名 Jönsson／Strand 兩說並存，寫作層不寫。full。
- 23808 gridlock《formless》：moodVerdict borderline（磨碾節奏、metalized noise vs. 文案 lush melodies、analog warmth）。full。
- 23809 Subheim《No Land Called Home》：moodVerdict borderline（深沉黑暗、低音線居中；現場鼓、penetrating rhythms、人聲歌曲）。label 推翻→Ad Noiseam（adn133）。full。
- 23810 Jogging House《Weight》與 Between Interval《The Edge Of A Fairytale》：Weight borderline（盤帶 lo-fi 利重；「melancholy and hope」；label 推翻→Seil Records；單源 thin）。Edge 為 keep（Lustmord 對照、dark ambient、近乎可怕；label 推翻→Spotted Peccary SPM-1604；full）。
- 彙總：keep 2（Autumn Continent、Edge）、drop 1（Aydio）、borderline 8。label 推翻 7 張（Headache、Aydio、Halou、兩張 Between Interval、Subheim、Jogging House）。WebSearch 用 3 次（Headache 無結果、Manes、Subheim）；其餘用維基／廠牌頁／Kraak 頁。

## 主線研究後汰換（不佔條號；2026-11-06）
- 判準同 md41：研究稿以來源直述**有拍推進**、**判輕**、**判暖／旋律明確**的汰；聲音只有標籤、邊距未知的留給評分驗收。單源 thin 一般不汰，但**連聲音文字都沒有、只剩標籤**的單源卡汰（寫不出有內容的簡介）。
- **汰 12 張**（存 `dropped-cards.json`／`dropped-research.json`）：
  - 能量：Subheim《No Land Called Home》（研究 a：現場鼓、部落節奏）、gridlock《formless》（研究 a：磨碾節奏，文案另寫類比溫暖）、Black Boboi《Sepia》（研究 c：techno 拍、起伏旋律與合唱）、Disparition《Palm in Mirror》（研究 c：官網「a storm of driving beats」）、Disparition《Granicha》（研究 c：官網寫 techno、工業、爵士、流行雜陳的 112 分雙專輯）、Burning Pyre《Imago》（研究 c：pristine、melodic stabs、skittering percussion）。
  - 判輕：Bed《Spacebox》（研究 c：鼓刷、低音大提琴、幾乎全原聲）、Aydio《Nonentity》（研究 a：長笛、小提琴、爵士節拍）。
  - 判暖：Now Always Fades《Coalesce》（研究 b：廠方文案 bright、uplifting、warm，breakbeat 與 MPC 鼓）、il:lo《Lucent》（研究 c：tension and hope、invigorating、light emerges）、MANES《Slow Motion Death Sequence》（研究 a：廠牌文案 hook-ridden pop、旋律明確；金屬底的 x 也有風險）。
  - 故事與聲音皆無來源：conelrad《Sure is the Risk Made》（研究 b：只有標籤）。
- **研究層更正已改進卡單**：label——Headache → PLZ Make It Ruins、Halou《Halou》→ Vertebrae Music Productions、Between Interval 兩張 → Spotted Peccary、Jogging House → Seil Records、Space Afrika → Dais Records、mars kumari → Bruiser Brigade Records；Blackbird（2018 原發自行發行，Doki Doki Beats 為 2026 重發）、Disparition、All India Radio（數位版）→ self-released。country——One Arc Degree us → gr（希臘二人組；us 是 Synphaera 所在地）、Blackbird 清空（Discogs 稱法國製作人，與 Bandcamp 地點矛盾，不寫國籍）。
- 寫作層注意：Headache「人聲是 AI」單源，不寫；Between Interval 真名兩說，不寫真名；Phelios Bandcamp 版是含 5 首 bonus 的自行重發，以 Malignant 原版 7 首為準。
- 不補位。定案 **20 張**。留給評分驗收的邊距風險：moby《Destroyed》（techno 拍幾首）、Just Mustard（有鼓噪音 shoegaze）、Space Afrika（人聲客串、弦樂、打擊）、Pye Corner Audio（樂評稱平和、有光）、Blackbird（2-step）、Martin Stürtzer（音序器脈動）、All India Radio（人聲）、Lauge《Echoes》（自然題材判輕）。
