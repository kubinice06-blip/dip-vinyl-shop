# 新世代爵士（2010–）策展線：策展層與主線裁定

> 店主 2026-10-11：「新爵士2010年後到2026的也很缺 現在nu jazz都不是新世代的 為何」→「像kokoroko 一個低音號當leader的這些也都是新世代的爵士 我上面指的就是爵士 不是downtempo」；看過策展摘要後 2026-10-12 回「開跑」。
> 本檔由雲端主線建立；條號 9341–9360（各批 rulings 從 9361 起，見 `batch-progress/HANDOFF-newjazz-line.md`）。

## 策展（9341）
- **9341** 四組策展（`CUR-DISPATCH.md`：發行年 2010–2026、只收爵士、同藝人含卡池最多 4 張、卡池 0 張的優先）交件 219 張、167 位藝人：英國 57、美國 63、歐陸與世界 53、亞洲 46；跨組 0 重複、全部去重指令 0 命中。年份最新只到 2024（MB 上 2025–2026 的資料太少）；台灣、香港、中國查不到可靠的年份與廠牌，依寧缺勿濫未收（d 組 notes）。

## 主線刪除（9342–9344）——219 → 197
- **9342** 老世代刪 15 張：店主要的是「新世代」，1970–80 年代就成名的老將 2010 後的新作不算。Django Bates、Henry Threadgill Zooid、Wadada Leo Smith、Maria Schneider Orchestra ×2、Sun Ra Arkestra、Tomasz Stańko New York Quartet、Anouar Brahem、坂田明 ×2、高瀬アキ、菊地雅章 Trio、藤井郷子 Orchestra New York、The Necks ×2。保留 Nat Birchall（Gondwana 場景的一員）、나윤선（ACT 時期是 2010 年代）、The Bad Plus（2000 年成軍）、Jaga Jazzist（北歐新爵士的源頭）。可逆：要收回改 `build-master.mjs` 的 DROP。
- **9343** 偏離爵士刪 6 張：店主明言「不是 downtempo」。Ishmael Ensemble《Visions of Light》（電子／downtempo）、mouse on the keys（post-rock）、WONK（neo-soul）、박지하《Philos》（實驗／world）、BIGYUKI《Reaching for Chiron》（R&B／beat）、Kyoto Jazz Massive（2021 年的 club jazz，正是店主說「不是新世代」的那類 nu jazz）。保留 Mansur Brown《Shiroi》（倫敦南區場景、吉他即興為主）、Daymé Arocena（Brownswood 的古巴爵士歌手）、Ashley Henry（爵士鋼琴手）、Dewa Budjana（印尼 jazz-fusion 代表）。
- **9344** Byron Wallen《Portrait: Reflections on Belonging》MB 查無 release-group，身分只能走 §1 人工、來源只有維基與單篇評論，刪。

## 身分與掛名（9345–9347）
- **9345** 197 張全部 pinned（MB release-group 逐張回查，`master.json` 的 `mb` 欄）。MB 標 Live 的四張照收：Snarky Puppy《groundUP》《We Like It Here》（棚內有觀眾的錄音室專輯，樂團正式專輯序列）、Rob Mazurek & Exploding Star Orchestra《Galactic Parables: Volume 1》、Damon Locks Black Monument Ensemble《Where Future Unfolds》（公認代表作）。Ben LaMar Gay《Downtown Castles Can Never Block the Sun》MB 標 Compilation（從七張未發行專輯選出），International Anthem 以首張專輯發行、樂評也當首作看，照收、releaseType 寫 Album；研究層若查到它不被當專輯看再改走 §5.6 或刪。可逆。
- **9346** 曲風：派系預設（英國 Afro／加勒比、非洲、拉美加 world；broken beat、日本 club jazz 加 electronic；LA West Coast Get Down、歌手加 soul；爵士×嘻哈加 hiphop；印尼加 rock），再逐張更正（`build-cards.mjs` 的 GOV）：Snarky Puppy、Nate Smith、Keyon Harrold、Terri Lyne Carrington、Sam Gendel、Carlos Niño、Jamael Dean、Joey Alexander、Antonio Sánchez、Camila Meza 只掛 jazz；Roberto Fonseca 掛 jazz＋world。可逆。
- **9347** 掛名：Hiromi 兩張照池中《Another Mind》的 `Hiromi`（MB credit 上原ひろみ／上原ひろみ ザ・トリオ・プロジェクト 進 queryAlias）；Cassie Kinoshi's seed 照 MB（與 SEED Ensemble《Driftglass》是同一個團改名，正文寫清楚）；Dinosaur 與 Laura Jurd 各照 MB 掛名；Tenderlonious & The 22archestra 取樂團署名版；Rob Mazurek & Exploding Star Orchestra 照策展（MB credit 進 queryAlias）。

## 分批（9348）
- **9348** 197 張依地區順序切 5 批：nj1 40（英國：倫敦南區、Afro／加勒比、Gondwana）、nj2 40（英國後段＋美國 LA、爵士×嘻哈、芝加哥前段）、nj3 39（芝加哥後段、紐約、大樂團、豎琴、歌手、北歐前段）、nj4 39（北歐後段、波蘭、德奧瑞、法國、非洲、以色列、拉美）、nj5 39（拉美尾段、加澳、日本、韓國、印尼）。每批研究 a–e 各 7–8 張。卡單 `desc-tools/batches/cards/add-20261012-nj{1..5}-cards.json`。
