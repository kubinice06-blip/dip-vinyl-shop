# c-66 交接（2026-09-03）：印度 40 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。
**這是 c-52 起這條擴充線的最後一批。**

## 一、這批是什麼

廣度線（`lineType: 廣度`）。**40 張、32 位藝人、零跨批撞卡、零合輯**。

| 組 | 場景 | 張數 | 藝人 |
|---|---|---|---|
| a | 寶萊塢黃金期與印度流行 | 21 | 13 |
| b | 印度古典與南印電影歌 | 19 | 19 |

a 組藝人少於張數，是因為這條線的收錄單位是**作曲家（music director）**：
S.D. Burman、Shankar Jaikishan、Naushad、O.P. Nayyar 各收三張。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **38/40（95%）**，2 張要掃圖 | `c66/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:regional-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **40 張全部寫完並過機器 QA** | `desc-tools/batches/output/c66-out-{1,2}.json` |
| 5. 固定試聽 | **24/40 ready（60%）** | `c66/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：40/40 釘住 release-group MBID，零人工身分卡

**但修正了一筆，而且修的是腳本不是資料**（裁定第 126 條）：

**S.D. Burman《Guide》原本釘的是 1965 的 EP**（`1b58b2a6…`），
而策展層在 `mbNote` 白紙黑字寫著「本卡釘後者（`49763754…`）」「`1b58b2a6…` 為 1965 EP，
本卡刻意不釘」。追下去是 `fix-rgmbid.mjs` 自己換的：它的 `score()` **從頭到尾沒看 primary-type**，
兩筆同名 release-group 標題同分、合輯性同分，**只剩年份分勝負**——
EP 的 1965 剛好等於卡片年份，加 2 分就贏了 Album 的 1966。

已在 `score()` 加入 primary-type（Album +5、EP／Single −12，§5.5 `asia-mini-album`
白名單卡才改 +5），重跑後改釘 `49763754-47f4-43d9-aca7-2ab0d7dac117`，
**CAA 封面同步重取**（front 回 200）。

> **這是 `mbNote` 明寫的策展決定被下游腳本默默推翻的第二種形狀**
> （第一種是第 99 條：`make-cards-generic.mjs` 從舉證敘述裡抽藝人 MBID）。
> 往後任何會改寫 `rgMbid` 的腳本，都要先問：策展層有沒有明說過釘哪個？

### 封面 38/40
**缺 2 張要本機掃圖**：Ghantasala《Mayabazar》、M.S. Viswanathan《Apoorva Raagangal》。
這兩張的佐證本來就偏薄（前者 Discogs 查無該碟條目；後者 MB release 無國別無 status、
Discogs 只有 7 吋 EP，維基說有 LP 但 Discogs 無條目）——**上架前須先確認版本**。

### 試聽 24/40（60%）——但首跑只有 3

**`in` storefront 23 張、`us` 1 張。**

首跑 3/40、策展層估 27/40。依第 77 條的方法教訓「**逐張攤開對齊**」，
不去猜參數而是看 `tried` 記錄，發現 **37 張未配的裡有 31 張其實 `in` storefront 有回結果**，
是被過濾掉的。挑一張直接查 Apple：

```
卡片   S.D. Burman 《Guide》 1965
Apple  S.D. Burman 《Guide (Original Motion Picture Soundtrack)》 1965   ← 藝人與年份完全相符
```

`canon("Guide")` = 5 字元、`canon` 那個 OST 標題 = 36 字元，差 31，
被 `titleOk` 的 ≤8 上限擋死。`DECO` 剝了 remaster／reissue／deluxe／edition／anniversary／version，
**唯獨沒有原聲帶尾綴**。加了 `OST` 正規式（裁定第 123 條），
既有單元測試 20/20 加新增 5 例全過後才重跑，**3 → 25**。

複檢 25 張抓到一筆誤配（裁定第 124 條）：**Alla Rakha《Tabla!》配到《Tabla Beats》**
（1991、六軌、另一張碟）。把 `in` storefront 名下 Alla Rakha 的條目全部攤開看過，
《Tabla!》根本不在 Apple 上。**卡層剔除**，最終 24。

**判準**：能寫成通則的（自我同名、數字殘餘、單曲尾綴、原聲帶尾綴）進 `match-lib.mjs`；
只在單張成立的留在卡層並寫進裁定，**不為一張碟去動全批的比對規則**。

## 三、兩筆年份改正（裁定第 127 條）

依第 86／103 條的判準（**「有來源直接寫出的年份」才能覆蓋卡單值，「依目錄號推斷」的不行**），
親自回問 Discogs API 核過：

| 卡 | 原 | 改成 | 證據 |
|---|---|---|---|
| Vilayat Khan《The Genius of Vilayat Khan》 | 1966 | **1962** | master 900353；三筆印度原盤（HMV EALP 1266 兩筆、Odeon MOAE 109）全部直記 1962 |
| Amjad Ali Khan《Raga Darbari》 | 1975 | **1979** | master 1018264；**六筆**印度原盤（HMV ECSD 2824 四筆、STCS 04B 1115、Odeon）全部直記 1979 |

**維持不動的兩筆**：Bismillah Khan 維持 1962（只差一年、master 與卡單一致）；
Satyajit Ray《Goopy Gyne》維持 1969——**卡單對、MB 的 1970 錯**（1969 有 Angel EP 三筆
＋電影上映日兩重證據，1970 是 Regal LP 那版）。

**另有九張的年份與來源有落差、證據不足以覆蓋**，`note` 一律明令「行文不得斷言發行年」，
簡介已照辦（全篇只用電影上映日、獎項屆數、錄音年等有據的錨點）：
《Chalte Chalte》（落差最一致，MB 與 Discogs 五筆全記 1974 而卡單 1976，**最該本機重看**）、
《Qurbani》《Madhumati》《Guide》《Mother India》《C.I.D.》《Naya Daur》
《Barsaat Ki Raat》《Sahib Bibi Aur Ghulam》。

**Apple 的 `releaseDate` 依第 77 條不採**（Baiju Bawra 1953、Sangam 1953、
Do Ankhen 2013 三筆明顯是數位化日期）。

## 四、研究層推翻策展層

**a 組 31 處**，散在 15 張。硬錯舉例：《Sangam》〈Main Kya Karoon Ram〉唱的是 **Lata**
不是 Vyjayanthimala；《Mughal-E-Azam》「鏡宮加人工回聲」**方向相反**（來源是沒有殘響設備
所以進浴室唱）、「上百人樂隊」實為一首歌的合唱團且有 100／1000 兩說；
《Aradhana》「S.D. Burman 病中由兒子代寫」**查無來源**；《Chalte Chalte》策展點名的
〈Dur Se Koi Aaye〉**不在曲目表上**；《Madhumati》Lata 拿的**不是**「最佳女歌手」；
《Baiju Bawra》「Rafi 唱到嗓子受損」查無來源。
另擋掉約 **20 處無來源的樂器與音色說法**——**這批策展 `why` 的樂器描述幾乎全部無來源**。
《Amar Akbar Anthony》維基的「第一張粉紅色膠 LP」自帶 citation needed，依第 80 條不收。

**b 組 6 處**：
1. **Ali Akbar Khan《Sound of the Sarod》三處全錯**——不是 Connoisseur Society、不是紐約錄音室，
   是 **World Pacific 的洛杉磯共濟會堂現場**；tabla 不是 Alla Rakha，是 **Shankar Ghosh**。
2. **Zia Mohiuddin Dagar**——碟上有 **Swami Pagal Das 的 mridangam** 與 **Iqbal Ahmed 的 sarangi**，
   不是無打擊樂的獨奏碟。
3. **Alla Rakha《Tabla!》**——是 sitar（Shamim Ahmed）、tambura、pakhawaj，不是 tanpura 與 sarangi 打 lehra。
4. **Mallikarjun Mansur**——「同年三張碟」是**同一張碟（HMV ECLP-2384）在 MB 上被建了三筆**（第 13 條形狀）。
5. **Ghantasala《Mayabazar》**——不是他一人作曲（S. Rajeswara Rao 先寫四首才離開）；
   且**無任何來源說他在本片演唱**。
6. **Amjad Ali Khan**——「整面只演一首」不精確，實為整張碟一個 raga、跨兩面四段。
另擋掉約 20 處無來源斷言（Kirana 派系、「raga 的博物館」、Baul／Hindustani 並置、
「最常被播放的古典唱片」、Vidwan 詞義、gamaka 與明亮音色等）。

**全部寫進各卡 `notes` 的禁止句，hook 與寫作層逐條遵守、一項未犯。**

> **目錄號要注意**：Ali Akbar Khan 的原盤是 **WPS-21435**。
> **WPS-21458 是同批 Alla Rakha《Tabla!》的**——我在派工時寫錯，
> hook 層依第 111 條以卡層 facts 為準擋了下來。

## 五、同調風險與拼法

- **a 組**：研究層跨 21 張分派了 12 組互斥條款（78 轉蟲膠、qawwali、古典聲樂家、
  西式管弦、銷量名次、Guru Dutt、V. Shantaram、柏林影展、Binaca Geetmala、作曲者自唱等）。
- **b 組**：19 張裡 15 張串流上完全查不到，但**19 張的 facts 沒有任何一條談串流**，
  因此**沒有任何一張寫「串流上找不到」**。唯一 facts 撐得住的同型說法
  （「Discogs 底下只有三筆版位、此後沒有再發」）**只判給 Imrat Khan 一張**。
  其餘各挖獨有錨點：共濟會堂現場、拒領勳章、電台試唱的指甲溝、tala 拍數編排、
  Menuhin 送琴、群鬼之舞、作曲權轉手等。
- **拼法一律採卡片寫法**：Shankar Jaikishan（MB 空格、維基連接號、Discogs 連字號、
  Apple「Shankar - Jaikishan」四種）、C. Ramchandra（MB 作 `C. Ramachandra`）、
  Laxmikant-Pyarelal（MB 無連字號）。
- **同曲異名各指定一種**：〈Tu Jahan Jahan Chalega〉／〈Mera Saaya Saath〉、
  〈Mere Sajan Hain Us Paar〉／〈O Mere Majhi〉。
- **《Navrang》〈Tu Chhupi Hai Kahan〉整條禁寫**（維基內文與曲目表的拉格自相矛盾、
  演唱者維基與 Discogs 也不同）。
- **《Mughal-E-Azam》2004 上色版一字不得引用**（重錄過管弦、轉 Dolby Digital）。

## 六、Bengali 與 Punjabi 民俗那條線交白卷

**資料面做不到，已逐項記在裁定第 122 條，不要再重查一次。**
要補只能走 §1 人工身分路線——**那是店主的決定，雲端不自行開。**

## 七、機器 QA

```
qa-batch.mjs research c66   40 張全 full｜key 與卡單完全一致 ✓
qa-batch.mjs hooks c66      0 標記
chk-hook-crossgroup.mjs c66 40 張｜hook 加權 17–32.5｜note 317–350｜✓ 全部通過
qa-batch.mjs out c66        out-1 21 張 221–239｜out-2 19 張 227–235｜>260: 0｜合計 40 與卡單相符 ✓
qa-check-research.mjs       兩檔各 0 標記
fix-spacing.mjs             兩檔各待補 0
chk-prop.mjs                15 批 665 張｜跨批撞卡 0
```

**注意**：`qa-batch` 會把天城體標成「非拉丁亂碼」——**那是誤報**（裁定第 127 條附記）。
c-66 的那筆是 Bismillah Khan 那張照實引用唱片上並列印出的天城體曲名，不是編碼壞掉。
**印度、希臘、西里爾這幾條線都會踩到，看到要逐條核對，不要直接照著「修」。**

## 八、跨批去重

已過 `dedup-crossbatch.mjs`，與 c-52…c-65 其餘未上傳批次無重複。
上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。
