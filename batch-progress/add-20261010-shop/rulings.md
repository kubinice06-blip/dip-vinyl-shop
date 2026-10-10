# add-20261010-shop 裁定（店內販售區第四波上卡池：10-08／10-09 待上架 40 張）

> 來源：`data/shop/inventory.json` 的 pending_card 40 張（add-20261008-shop 22 張、add-20261009-shop 18 張）。
> 店主 2026-10-10：「我目前有新增很多專輯 都是店內販售的 你測試一下是否能正式上線」→ 盤點後回報，店主回「yufu那張可以跑／1 2都是專輯 3合輯不用／開跑」。
> 雲端工作階段一次跑完（REMOTE_RUNBOOK 2026-10-10 版：`node scripts/kv-token-check.mjs` exit 0，可寫 KV、seed、card_catalog）。
> 本檔由雲端主線建立；條號 8912–8940。

## 收錄（8912–8916）
- **8912** 40 張收 37、退 3：
  - Culture Club〈It's a Miracle / Miss Me Blind〉12 吋單曲——店主 8890「單曲就是單曲」，不建卡。
  - 奥村チヨ《デラックス・ダブル》——精選雙 LP（MB c43f3bfc Compilation），店主 2026-10-10「合輯不用」。
  - チェリッシュ《スーパー・デラックス》——研究 r12 identity.type＝compilation（日文維基稱ベストアルバム）。店主同日對《デラックス・ダブル》的「合輯不用」照套，不走 §5.6（一般 greatest-hits，不屬重要合輯）。可逆：要收就補 §5.6 的 exceptionReason／證據再跑一次。
- **8913** Yufu《To My Pen Pal》：策展 8782 以 §5.5 EP 白名單（只列日韓）退件；店主 2026-10-10「yufu那張可以跑」。manifest 寫 `releaseType: EP`、`genreException: asia-mini-album`，exceptionReason 寫明「店主指定單張適用，不擴大到其他台灣 EP」；**`EXCEPTION_GENRES` 不動**。年份取 2021 卡帶首發（Discogs 37253679 標 Mini-Album），身分走 §1 人工（MB 藝人 07b2c39f 只有兩筆 RG）。
- **8914** キャンディーズ《その気にさせないで》、小柳ルミ子《京のにわか雨》：店主 2026-10-10 裁定店內實物都是專輯（推掉 8794／8906 的單曲疑慮）。前者照 8794 釘 RG 7885238f；後者 MB 查無走 §1 人工（Discogs master 3203559）。
- **8915** 10-08 批 20 張身分沿用策展層卡單（`desc-tools/batches/cards/add-20261008-shop-{a,b,c}-cards.json`）；10-09 批 16 張與 Yufu 由主線在雲端補身分（`cards-new.json`，產生腳本 `build-new-cards.mjs`）：pinned 12（りりシズム、彷徨、人間なんて、希望の旅、HOT BABY、Little Concert、パーティー、LAFF、Leftover Wine、Words of Wisdom、OLIVE、悲しいほどお天気）、§1 人工 5（ラプソディ、タッチ・ミー、弘田三枝子の世界、京のにわか雨、To My Pen Pal）。MB 查詢 1 req/s，皆 HTTP 200。
- **8916** 撞池：37 張以 pool-keys 正規化掃 seed 18,666 列，0 命中。同藝人池中既有：弘田三枝子三張、松任谷由実三張、Dennis Brown 三張、坂本龍一 11 張、かぐや姫兩張、桃井かおり一張、カルメン・マキ（個人、OZ）、Marlene 兩張，皆不同碟。

## 掛名與盤名（8917–8922）
- **8917** 破地獄：卡名取《芒神》（店內實物＝2018 WV 025 黑膠，門市版寫的就是它，8891），MB RG b8ee76a1 題名 God of Silver Grass 進 queryAlias；年份照策展 8786 取 2016（同一張專輯首發）。可逆。
- **8918** `カルメン・マキ&LAFF`《LAFF》：照池中 `カルメン・マキ&OZ` 無空格寫法；MB 藝人 Carmen Maki & Laff（cbe295a6）、RG 46e9061a。與個人名義カルメン・マキ分開（8712 先例）。
- **8919** 吉田拓郎《人間なんて》掛漢字（同 8797《元気です。》），よしだたくろう 進 queryAlias。
- **8920** 盤名取日文正題：松尾和子《ラプソディ》、りりィ《りりシズム》、小椋佳《彷徨》（Notion「徬徨」異體）、小川知子《タッチ・ミー》、弘田三枝子《弘田三枝子の世界》（Discogs 英文題進 queryAlias）、朱里エイコ《パーティー》（副題進 queryAlias）、小柳ルミ子《京のにわか雨》（副題與 SOFTLY 進 queryAlias，照《愛に甦える》短形）。全大寫照 MB：《HOT BABY》《OLIVE》《LAFF》。
- **8921** 曲風：Dennis Brown → world（池中雷鬼慣例）；尾崎亜美 pop＋soul（City Pop 慣例）；LAFF rock；Yufu soul；松任谷兩張 pop；りりシズム、人間なんて folk＋pop；小椋佳、Melanie folk；其餘 pop。可逆。
- **8922** 10-08 批的掛名、盤名、年份、曲風全照策展層（8781–8810）；《愛に甦える》年份 1977（8808）。

## 封面、三軸、頂點（8923–8927）
- **8923** 封面 37 張全用 `data/shop/pending-meta.json` 的 Discogs 圖（店主 10-09 指定盡量無側標，8910），同步登錄 `data/discogs-cover-registry.json`。主線把 37 張排成縮圖表逐張看過，皆為正確唱片；帶側標的（ラヴ・レター、フォグ・ランプ、思い出を置く 君を置く、ゴールデンハーフでーす、愛に甦える、タッチ・ミー 等）是 8910 找不到無側標照片的。pinned 卡也不改用 CAA——店主要求店內商品封面一致用無側標圖。
- **8924** Yufu 封面取 Discogs 34313131（2025 台灣 Coral 黑膠）主圖，照片上有 Yufu 的金色簽名；Apple／Bandcamp 都查無此作，沒有更乾淨的圖，照收。可逆。
- **8925** 《京のにわか雨》封面是巴西版 27939567（同 master 3203559、同 12 軌），封面設計與日本原版相同、無側標（店主 8910 選定）。
- **8926** 三軸照 pending-meta 的店內暫定值（8911 已註明「上卡池時可沿用」）；listeners 以卡面掛名重打 /album-rating（Last.fm），36 張有值、Yufu 查無。
- **8927** 頂點 0 張：無 classic 5、無 accessibility 5；obscurity 5 只有真芽正恵（listeners 4），沒有遺珠級證據（單一 Discogs 條目、無評論），不列 pearl。

## 試聽（8928–）
- **8928** 試聽 ready 26、unavailable 11（`preview-picks.json`，產生腳本 `build-picks.mjs`）。ready 逐張以 Apple lookup 對 Discogs 曲目表：全部 notExplicit、試聽檔 HTTP 206、collectionId 與現有靜態地圖無重複。版本差照收：Phoebe Snow（us 723387453，多 1 軌單曲 B 面）、朱里エイコ（2011 Remaster +1）、尾崎亜美（+單曲版與 B 面 2 軌）、Melanie（Happy Birthday 談話與歌合一軌）、かぐや姫（〈妹〉〈海〉medley 與原盤同）。小坂明子第 1 軌標 Single Version，改取第 2 軌。
- **8929** unavailable 11：The Three、芒神、It's Magic、To My Pen Pal、真芽正恵と小さな詩、Four、Mon-jah、弘田三枝子の世界、LAFF、タッチ・ミー、希望の旅。後三張的 Apple 只有收錄部分曲目的精選輯，不當本盤試聽。YouTube 來源要掛得走後台 album_overrides（雲端寫不進），未做。

## 寫入與驗收（8930–8935）
- **8930** prepare gate 0 error（47 warning：upc 空、§1 人工 6 張）。修兩處後過：Phoebe Snow 補 `selfTitledVerified`（pinned＋ready 試聽）；Yufu pending-meta 沒有封面，改用 Discogs 34313131（8924）。
- **8931** 寫入順序照 §8：card_catalog 37/37（`publish-stage/…/card-catalog-patches.json`）→ KV 67 鍵（CJK 30 張 desc2＋desc4、拉丁 7 張 desc2；wrangler v4 `Success!`，`verify-wave-kv 20261010 add-20261010-shop` 67/67 逐字一致）→ 靜態試聽 26＋負面狀態 11 → seed 37 列（18,666 → 18,703）→ build-seed-genres → **published gate 0 error**。
- **8932** 門市版 `元気です。` 只有一個來源（日文維基），manifest 的 sourceUrls 補 Discogs 原版 5493966 湊足兩個（`overrides.json`），門市版本身不動。37 張門市版皆無卡片禁語，未用 descReplace。
- **8933** 子曲風：直接打 worker /album-genres 預熱這 37 張（標籤 35、查無 2；`data/rawgenres-cache.json` 是本機快取、雲端沒有，所以沒用 warm-album-genres.mjs），`build-genre-tree.mjs --pull --write` 重建：card-subgenres 17,253 → 17,282（新卡落位 29/37）。
- **8934** 店內對接：Notion 37 列「卡池鍵」以 Notion MCP 寫入；`notion-snapshot.json` 同步 poolKey；`sync-shop-inventory.mjs` 的 PENDING_NEW 只留不建卡的 3 張；inventory 在售 113、待上架 3、售出 2；`mood-map.json` 補 37 張心情；`pending-meta.json` 刪掉已上架的 37 筆（留 3 筆）。
- **8935** 破地獄改名《芒神》後，`descs.json` 該筆 key 由 `破地獄|godofsilvergrass` 改為 `破地獄|芒神`（後台以卡池鍵對門市版）。Firestore `settings/shopDescs.byKey` 有一筆舊鍵的店主存檔，內容與預設稿一字不差，留著不影響（雲端寫不進 settings，無法搬）。Yufu 的店主存檔也與預設稿相同。
