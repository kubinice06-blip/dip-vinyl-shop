# 薄細項策展線 ts10–ts11（越南／新加坡／蒙古放寬補到 50）策展派工（2026-10-21）

店主 2026-10-21：越南、新加坡、蒙古「放寬」補到 50。現況：越南 31、新加坡 41、蒙古 15（類型樹 搖滾 › 日亞搖滾 國別節點）。
目標：越南 +19、新加坡 +9、蒙古 +35（蒙古夠不到就照實回報能找到的數字）。提名可多 20% 給主線汰換。

共同規則（身分兩條路、去重指令、名稱、證據格式、輸出格式、續跑）照 `CUR-DISPATCH.md`；**同一藝人沒有張數上限**（2026-09-04 店主裁定）。

## 放寬後的門檻（取代前一輪「每張都要讚」）
收「**場景裡有代表性**」的專輯，下列任一即可，`why` 寫明是哪一條＋來源：
1. 該國搖滾場景的重要樂團或歌手（維基有條目、被當地媒體稱為代表團體、長期活躍、得過任何獎或入圍）的正規專輯；
2. 正規廠牌或具名獨立廠牌發行、在當地有一定流通（Apple Music／Spotify 有上架、Discogs 有實體版、當地媒體報導過發行）；
3. 前一輪策展因「查不到專輯級好評」而沒收、但樂團本身夠代表性的候選——先讀前一輪輸出檔的 `notes`（越南 `curation-p/q/v.json`、新加坡 `curation-t/w.json`、蒙古 `curation-u/x.json`），那裡列的候選優先評估。

**仍然不收**：單曲、EP（含 Apple 標 EP 的短作品，除非長度與曲數明顯是專輯）、精選與再發合輯（考古整理盤除外）、現場專輯、非搖滾（流行歌手、嘻哈、純電子）、池中已有的同一張。
**每張都要找得到封面來源**（CAA、Apple Music／iTunes、Discogs 圖、Bandcamp 任一，把網址寫進 `evidence`）；找不到封面的不要提。`genres` 第一個一律 `rock`。

## 預算
WebSearch 每組最多 3 次（工作階段額度快用完）。多用 MB API、iTunes Search API（`https://itunes.apple.com/search?term=<藝人>&entity=album&country=<vn|sg|mn>&limit=50`，也可用 `https://itunes.apple.com/lookup?id=<artistId>&entity=album`）、`https://api.discogs.com/artists/<id>/releases`、WebFetch 維基（`index.php?action=raw`）。

## 分組
| 組 | 範圍 | 提名 |
|---|---|---:|
| vv | **越南**：池中與前幾輪已收樂團的其他正規專輯（Microwave、Bức Tường 其他、Ngũ Cung、Chillies、Cá Hồi Hoang、Ngọt、Thủy Triều Đỏ、Raditori、Hạc San、UnlimiteD、Windrunner、The Flob、Black Infinity…），以及前一輪 notes 列的候選（Da Vàng、Sói Đen、Gỗ、Ra Khơi、Rosewood、7UPPERCUTS、The Cassette、Ngủ Ngày Ngập Lụt、Mademoiselle、Lộn Xộn、Sputnik Mothership…），海外越南人搖滾團可收但註明 | 23 |
| ss | **新加坡**：前一輪 notes 列的候選（Stompin' Ground、Plainsunset、Livonia、Opposition Party、The Oddfellows《What's Yours and Mine》、Bellied Star、Rusty Blade 其他、Electrico 其他、Humpback Oak 其他、Forests 其他、Marijannah 全長、Caracal 其他…），以及 The Pinholes、Amateur Takes Control、I Am David Sparkle、Obedient Wives Club、Typewriter、Cockpit 等 | 11 |
| mm | **蒙古**：Haranga、Hurd、Altan Urag、Nisvanis、The Lemons、Soyol Erdene 的其他正規專輯，以及 Mohanik、Magnolian（若屬搖滾）、Night Train、Jonon、Domog、Chinggis Khaan、Kharanga、Ayas、The Colors、Bold Bayar 樂團作品等；Apple Music 蒙古區（country=mn）多翻幾頁 | 最多 42 |

輸出檔：`batch-progress/thin-sub-20261020/curation-<組>.json`（vv／ss／mm），`country`：vn／sg／mn。
**每做完 5 張就寫檔**；若輸出檔已有內容就接續補完。輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/ts-<組>/`。不要做 git 操作，不要動卡單、seed、PROJECT_MEMORY。
