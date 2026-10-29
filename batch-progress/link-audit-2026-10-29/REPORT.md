# 試聽連結＋串流連結全面檢查（2026-10-29）

**只讀稽核**：沒有寫 KV、Firestore，也沒改 repo 既有檔案。修正建議在 `fix-plan.json`，要店主說「可以」才套用。
10-27 已修的 23 條 Spotify 錯版本沒有重報；10-27 人工放行的 86 個旗標沿用當時裁定（`prior-2026-10-27-*.json`）。

## 一、結論

| 項目 | 檢查數 | 失效 | 指錯（人工確認） | 存疑待確認 | 其他 |
|---|---|---|---|---|---|
| Apple 試聽（runtime 索引） | 17,729 | **0** | **35**（錯版本 19、錯專輯 12、錯藝人 4） | 53 | 專輯下架 201（舊的 159、新發現 42）；卡池已無此卡 51 |
| Spotify 串流（KV `cover6:*`） | 7,955 | **0** | **92**（錯專輯 59、錯版本 25、錯藝人 8；卡池內 67、卡池外鍵 25） | 40 | — |

- **fix-plan 307 筆**：換新連結 **192**、清空 **115**（細目見第四節）。
- 試聽音檔全部活著（HEAD／Range GET 17,729/17,729 回 200）。串流 oEmbed 7,955/7,955 都有回應，沒有 404。
- 問題集中在「配錯張」，不是「連結死掉」。

## 二、Apple 試聽（`data/apple-audio-runtime-v1.json`）

做法：每筆 previewUrl 打 HEAD（失敗再用 Range GET 複驗）；collectionId 按 storefront 分組丟 iTunes Lookup（一次 150 個），取回專輯名、藝人名，跟卡片比對。
機器旗標 1,767 筆，大多是假警報：台灣店回中文譯名（Megadeth→麥加帝斯合唱團）、日本店回片假名、韓文／希臘文／緬甸文卡名對羅馬拼音、古典卡掛作曲家但 Apple 掛演奏者、原盤本來就是現場盤（Köln Concert、At Fillmore East）。
所以旗標項再到 TW/US/JP/KR/GB 五個店面各查一次，收集各語系名稱、用 artistId 查藝人別名，最後逐筆人工看過（`verdicts.json`）。

**指錯 35 筆，代表例：**
- 錯藝人：The KLF《Chill Out》→ John Lee Hooker 的同名專輯；山下達郎《For You》→ Selena Gomez《For You》；André Cluytens《Gounod: Faust》→ Henry Janzen 的聖誕單曲
- 錯版本：Atmosphere《Overcast!》、Curren$y《Covert Coup》、Illa J《Yancey Boys》、Lovage 都配到 Instrumental 版；Candi Staton、Giorgio Moroder、Nick Hakim 配到 Remixes；林生祥《臨暗》配到 2022 重新混音版；Four Tops／Roberta Flack／Supertramp 同名錄音室專輯配到現場盤
- 錯專輯：《魔法少女まどか☆マギカ OST I》→ 第 2 集；Rostropovich《柴可夫斯基第 6 號》→ 第 3、4 號；《SILENT HILL 2》→ 2024 重製版原聲；가리온 同名首張 → 第二張《무투》；蘇芮《蘇芮專輯》→《搭錯車》原聲

**專輯下架 201 筆**（Lookup 查無這個 collectionId）：
- 159 筆 map 早已標 `collectionGone`，Apple 鈕本來就是灰的，試聽仍可播。這次替其中 131 筆找到替代：62 筆換店面就有（同 ID），69 筆搜到重新上架的新 ID（Queen 全套、Belle and Sebastian、João Gilberto 等）。
- **42 筆是新發現**：map 沒標下架，Apple 鈕還連到已下架的頁面。27 筆找到新 ID，另 15 筆建議標下架（鈕改灰，試聽照播）。

**map 的 error 158 筆／review 36 筆：**
- error 158（卡池 140、apex 18）全是 2026-07-19 那輪被 iTunes 限流（HTTP 403／429），之後沒重跑。不是資料問題，用 `scripts/continue-apple-audio-map.mjs` 重跑這 158 筆就能補。明細在 `preview-issues.json` 的 `mapStatusError`。
- review 36：29 筆是 10-24 主線退回的「同曲異演出者」（古典同曲不同指揮、Various Artists 同名盤），退回正確。UFO《Strangers in the Night》候選是 Sinatra，也正確擋下。另有 6 筆候選其實沒錯（Iggy and The Stooges《Raw Power》、Live《Throwing Copper》、Kiss《Alive!》、Dick Lee、Evelyn King、Hermeto Pascoal，只差 remaster 加註或中文譯名），已列為 `promote`。Colin Davis《魔笛》候選是現場錄音，仍待確認。明細在 `mapStatusReview`。

## 三、Spotify 串流（KV `cover6:*`）

- KV 共 12,455 個 `cover6:` 鍵：有 spotifyUrl 7,955、null 4,495、空字串 5。卡池 21,894 張裡有 12,000 張已有 KV 鍵，其餘還沒被前台查過，不算問題。
- 值裡**只有 Spotify 一種平台連結**（欄位只有 imageUrl／coverSource／rgMbid／spotifyUrl／spotifyChecked／replacedSpotifyAlbum）。Apple Music 鈕走試聽索引，已在第二節驗過；沒有 YouTube 等其他欄位。
- 格式全部合法（`open.spotify.com/album/<22 碼>`），oEmbed 全部有回應。

做法：oEmbed 取專輯標題（4 個 worker、失敗退避重試），跟卡片專輯名比對，再查錯版本字樣（instrumental／karaoke／live／remix／cover-tribute／a cappella／beats／demo／commentary／sped-up／lullaby／re-recorded／best-of／single-EP 等）。比對時忽略 remaster／deluxe／anniversary／edition。
機器旗標 597 筆，人工判定：指錯 92、存疑 40，其餘是誤報（原盤即現場盤、合併重發盤、日文原題、古典曲目寫法）。

**指錯 92 筆，代表例：**
- 錯張：Led Zeppelin《II》→《III》；Neil Diamond《Hot August Night》→《III》；The Godfather → Part II；The Prodigy《Music for the Jilted Generation》→《More Music for…》；Velvet Underground 第三張同名 → 《& Nico》；BIGBANG《BIGBANG2》→ 精選；janet. → 出道專輯《Janet Jackson》
- 錯版本：Taylor Swift《Fearless》→ Taylor's Version；King Crimson《Larks' Tongues in Aspic》→ 2023 Elemental Mixes；Journey《Escape》、Dexter Gordon《Go》、Loretta Lynn《Coal Miner's Daughter》→ 現場盤；葉啟田《愛拚才會贏》→ DJ Remix
- 錯藝人：The Birthday Party《Junkyard》→ 草東沒有派對《醜奴兒》（worker 註解提過的舊 bug，KV 裡還留著）；The Band 同名 → 別團；Gong《You》→ 別團
- 卡池外的鍵 25 筆（小寫鍵，例如 `ryoji ikeda|spectra`→《+ / -》、`ju percussion group|…`→《十鼓》）：前台別處查過留下的，影響較小，一併列入。

**找替代**：照 sp-audit/fix.mjs 的做法，從 MusicBrainz release-group 底下各發行版的 url-rels 收 Spotify 連結。KV 沒 rgMbid 的，先用藝人＋專輯搜 MB（score ≥ 90 且標題吻合）。UA 用 `dip-vinyl-repair/1.0`，每秒最多 1 次。
用 oEmbed 標題挑出吻合、沒有錯版本字樣、不是 EP／單曲的那張：**15 筆找到正確版本，77 筆 MB 沒有正確的 Spotify 關聯，建議清空**。
清空後前台按鈕變灰，不會再導去錯的專輯。日後可以比照 sp-audit/sp.mjs，用 Spotify Search 再補一輪。

## 四、fix-plan.json（307 筆）

| 對象 | 動作 | 筆數 | 說明 |
|---|---|---|---|
| 試聽 | `replace` | 108 | 換成正確或重新上架的 collectionId＋previewUrl（新試聽 HEAD 已驗活）。錯配 12、新下架 27、舊下架 69 |
| 試聽 | `switch-storefront` | 62 | 同 ID、同試聽，只換到還有上架的店面 |
| 試聽 | `promote` | 6 | map review 轉 matched |
| 試聽 | `fill-slug` | 1 | カルメン・マキ & OZ 重新上架，補回名稱段 |
| 試聽 | `remove` | 23 | 錯配、找不到正確版本 → map 改 unavailable（前台走搜尋備援、Apple 鈕變灰） |
| 試聽 | `mark-gone` | 15 | 新發現下架、找不到替代 → 標 collectionGone（試聽照播，Apple 鈕變灰） |
| 串流 | `replace` | 15 | 換正確的 Spotify 連結 |
| 串流 | `clear` | 77 | spotifyUrl 改空字串 |

- **換新 192**（試聽 177＋串流 15）。**清空 115**（試聽撤下 23＋Apple 鈕改灰 15＋串流 77）。
- 每筆都有 `old`／`new`／`reason`；試聽另附 `mapPatch`（要改的 map 欄位）與 `priority`：high＝錯配、medium＝新下架、low＝舊下架補回。
- **套用方式**：
  - 試聽：照 `mapPatch` 改 `data/apple-audio-map-v1.json`（`collectionGone: null` 表示刪掉該欄），再跑 `scripts/build-apple-audio-runtime-map.mjs`。
  - 串流：比照 `sp-audit/apply.mjs`，先 GET 備份、確認現值等於 `old` 才 PUT（`spotifyChecked: fix-2026-10-29-link-audit`），寫完讀回。
- 存疑的 53＋40 筆**沒有**放進 fix-plan，只列在 issues 檔（`verdict: review`）。

## 五、檔案

- `preview-issues.json`：試聽旗標（wrong／review／gone／orphan），加 map error／review 明細
- `streaming-issues.json`：串流旗標（wrong／review）
- `fix-plan.json`：修正建議
- `verdicts.json`：人工裁定表；未列在表中的旗標都是人工判定的誤報
- 腳本（依執行順序）：
  1. `kv-dump.mjs`
  2. `sp-oembed.mjs`
  3. `ap-preview-head.mjs`
  4. `ap-lookup.mjs`
  5. `ap-analyze.mjs`
  6. `ap-recheck.mjs`
  7. `ap-analyze.mjs`（第二次）
  8. `sp-analyze.mjs`
  9. `classify.mjs`
  10. `sp-fix.mjs`
  11. `ap-fix.mjs`
  12. `build-outputs.mjs`

  共用的是 `common.mjs`。工作檔與 checkpoint 在 scratchpad 的 `link-audit/`；每 200 筆寫回一次，可以接續跑。
