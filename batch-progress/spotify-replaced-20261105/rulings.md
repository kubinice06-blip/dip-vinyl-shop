# spotify-replaced-20261105：被 MB 覆核清掉的 Spotify 連結重查

店主 11-05 截圖：Dudley Perkins《A Lil' Light》Spotify 按鈕灰，但 Spotify 有《Lil' Light》（Dudley Perkins • Declaime，2003-07-15）。

## 成因
worker `/spotify-search`：Spotify 只有模糊命中（「Lil' Light」≠「A Lil' Light」）→ MusicBrainz 給出標題完全相同的 release-group →
一律把 `spotifyUrl` 清成 null、記 `replacedSpotifyAlbum`。10-21 的 `kv-spotify-link-repair` 刻意跳過這類鍵，所以一直灰。

## 範圍
KV `cover6:*` 12,434 鍵；卡池內 `replacedSpotifyAlbum` 且無連結 64 鍵（`replaced.json`）。

## 裁定
- MB url-rels 有登錄 Spotify 的 20 張：oEmbed 核對專輯名，收 19；**不收** Sasha & John Digweed《Northern Exposure》→ MB 連到重混的《Northern Exposure Redux》。
  Bing Crosby《Merry Christmas》→《White Christmas》收（同一張 Decca LP 後來改名再發，MB 歸同一 release-group）。
- 其餘 44 張逐張判：同一張只差寫法／版本後綴的 11 張用 Spotify 搜尋取連結，收 10；**不收** Ohbliv《Rugged Tranquility》（卡為 2009，Spotify Vol. 1 為 2021，無法確認同一張）。
  收：Ellington《Masterpieces by Ellington》(Uncut)、Ella《Mack the Knife》(Live)、James Brown《Sex Machine》(Live)、Mikey Dread《African Anthem》、
  Robert Glasper《Covered》、S.E.S.《The 1st Album》、Sondheim《Sweeney Todd》OBC、Triana《El patio》50 Aniversario、大滝詠一《NIAGARA MOON》40th、Hang Raiji（ハング・ライジ，1983）。
- 維持灰（真的配錯或版本不明）33 張：Garth Brooks→致敬專輯、Faust→《You Know Faust》、Coldcut→《@0》、Mohn→Allie Mohn、Ray Charles→Vols 1 & 2 合輯、
  角松敏生→2017 重錄、Taj Mahal Travellers→雙張合輯、Rubinstein／Lovano／Boulanger／Weinberg 錄音版本不明等。

## 寫入
KV 29 鍵補 `spotifyUrl`＋`spotifyFix: replaced-recheck-20261105:<musicbrainz|spotify-search>`；舊值存 `before.json`。Spotify API 用量 11 次。

## 根因修正
dip-vinyl-worker PR #4（已合併）：覆核清空前先查 MB release-group 的 url-rels，有 Spotify 就用。**需店主本機 `npx wrangler deploy`。**

## 未處理（不在本次範圍）
10-21 留下的 MB 也沒有的約 3,851 張仍灰：要另一個 Spotify app（現有 app 每日約千次、正式站共用，不能跑批次）。
