# c-82 交接（2026-09-04）：日本 1990 年代地下 techno 與 ambient，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: {a: 日本 1990s techno·electro·breaks, b: 日本 1990s ambient·experimental}`）。
**45 張、40 位藝人、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID、合輯 0、EP 0。**

| 組 | 場景 | 張數 | 年份 |
|---|---|---:|---|
| a | techno／electro／breaks | 20 | 1994–2001 |
| b | ambient／experimental | 25 | 1994–2000 |

**廠牌**：Zero Gravity 11、Transonic 10、Frogman 5、Soup-Disk 5、Sublime 4、Syzygy 4、
Daisyworld 3、Music Mine 2、Reel Musiq 1。**這九家在本批之前池中一張都沒有。**

`fix-rgmbid` **修正 0**（依第 28 條附錄跑兩輪取聯集）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **21/45（47%）**，24 張要掃圖 | `c82/caa.json`、`caa.log` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c82-out-{1,2}.json` |
| 5. 固定試聽 | **22/45（49%）**，**命中全部在 `jp`** | `c82/previews.json`、`previews.log` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

## 三、這批立下的兩條裁定

### 第 149 條：**別名視同本人**（計數的部分後來被第 150 條作廢，但另一半仍成立）
Yokota／Harakami／Ishii 在這個場景大量用別名發片（Prism、Flare、Ringo、Stevia、Anima Mundi）。
當時是為「藝人上限」服務的，而**那條上限根本不存在（第 150 條，店主指正）**。
**但觀察本身仍然重要**：別名會讓**真撞卡**看不見——同一張碟掛不同別名發行、
或同一人的碟在池中掛另一種寫法。**`queryAlias` 仍要填別名，理由從「計數」改成「查得到」。**

### 第 149 條後半：**非拉丁線用「以廠牌反查」開場**
b 組幾乎全靠 `release?query=label:"<廠牌>"&limit=100` 撈出來——**一次回幾十個 release-group、
完全不會被拼寫擋住**。反例在同一批：松前公高用羅馬拼音查 MB，**藝人與作品兩個方向都回乾淨的 `count=0`**。

## 四、試聽回補一張：**第 152 條就是從這批立的**

**Quadra《Sketch From a Moment》** 探測層七個 storefront 全判 `unavailable`，其實 Apple 上就有。
成因是 Apple 的 `collectionName` 是
**「Quadra Complete Selection 95-07 / Sketch From A Moment (2016 Remaster)」**
——**系列名、盤名與版本註記串在同一個字串裡**，標題比對因此擋掉。
主線用 collectionId 1124763712 直查並逐軌核對：**14 軌、曲序與 MB 1997 JP 原盤逐項相同**。
唯一差異是 Apple 第 12 軌拼成〈Lumiosity〉、MB 作〈Luminosity〉——**Apple 那邊是錯字，行文採 MB 的拼法**。
**Apple 的 2016 是重製年，不得寫成發行年。** 試聽 21→22。

**通則（第 152 條）**：**`unavailable` 不等於「Apple 上沒有」，只等於「用這個比對法沒配到」。**

## 五、研究層推翻策展層十處

| 卡 | 策展層寫的 | 實際 |
|---|---|---|
| Blind Light《The Absence of Time》 | 廠牌 Music Mine；日本地下 techno | 廠牌 **Alida／ALDA-001**；credit 是 **Bill Laswell、Anton Fier、Nicky Skopelitis** 等，錄混音都在 Greenpoint Studio、母帶送 Masterdisk——**根本不是日本地下 techno** |
| Co-Fusion《Co-fu》 | 廠牌 Music Mine | **Sublime Records／MKCS-1012**（Music Mine 只是 (p)(c)） |
| Space Ranch | 與另三張「構成 Transonic 的創始名單」 | 1994 年八號裡**四號是 Various 合輯**，只能寫「開張第一年的四張個人專輯之一」 |
| Traveller's Light | Apple 那筆可當本卡試聽 | 那是 **2021 ExT 的十三軌 DELUXE**，**原盤 5 軌** |
| Trill | 未指出版本 | Apple 是 **2011 的 11 軌數位版**（原盤 9 軌），2023 版又是 16 軌 |
| No-Input Mixing Board | ZGV 線「四年後以本張收尾」 | ZGV-027–030 在 **2011／2016／2017 續出**，本張只是九〇年代連號的最後一張 |
| Sawasaki 本名 | queryAlias 寫「澤崎善弘」 | Discogs 藝人頁寫 **澤崎吉広**，前者無來源 |
| 《Photon》《Mind Edit》 | 「未查證」 | 都查證完了（2022 Camisole 版換了曲序、2003 GB 版廠牌是 Leaf／bay 32cd） |
| 《.,. (Ten-Chong-Ten)》 | 「Ten-Chong-Ten 是唸法」 | **無來源**，兩庫都只當完整標題登記 |
| 《Geo Rhythm》 | 「專輯線最後幾張之一」 | **無來源** |

**一處是「部分推翻」，分界值得記**：《Ambient Classics》策展層說「不得斷言舊作合輯，MB 沒有這一欄」，
但 **Discogs 的 credit 欄上永田掛 `Compiled By [Selected By]`**——
**那是唱片印的 credit，不是資料庫的型別欄**（第 136 條的分界）。
裁定：**可寫該 credit 本身，不得推導成「舊作合輯」**。

## 六、下游層層攔下的東西

**hook 層**（兩組合計退回七則候選）
- **算錯**：末軌 32:52 說「比前面四軌加起來還長」——**前四軌合計 34:59，比它長**；
  「橫跨十年」實為九年；「二十年後原封重出」實為十九年九個月。
- **讀反／補值**：說兩人「**互相**在對方碟上掛混音」（facts 只有單向）；
  「錄音室在紐約」（Greenpoint Studio 的所在地任何一條 fact 裡都沒有）；
  「只有第六首是合寫」（第 6 軌多掛的是**第三人**）。
- **踩禁令**：「先出的十二吋」（研究層已禁止先後斷言）。
- **六處跨組同構撞線全部讓開**（a 組先到），其中一句與 a 組幾乎逐字相同。
- **五處在源頭剝掉而非下游禁止**：不點副標、不點某軌、note 完全不出現查無來源的別名。

**寫作層（第 154 條的類型，b 組一組就攔下七處）**
| 卡 | 上游寫的 | 逐項數過 |
|---|---|---|
| Nina-Noho | 四軌不到一分鐘 | **三軌**（Dream 1:12 已過） |
| Temdendam Suay | 〈Sounzer Paranoun〉5:17 是上端 | 最長是〈Running Around The Suiside.〉**5:28** |
| Strange Garden | 每軌十二到十九分鐘 | **11:27–18:50** |
| Pacific 231 | LOTUStudio 錄的 | 只涵蓋第 1–3、5–8 軌 → 改寫「第 4 軌以外」 |
| World Standard | 某軌最長 | 最長是〈Montage: Lonesome Hobo-Land〉8:52 |

## 七、機器 QA 結果

```
node desc-tools/qa-batch.mjs research c82          a 20／b 25，key 與卡單完全一致 ✓
node desc-tools/qa-batch.mjs hooks c82             1 標記（誤報，見下）
node desc-tools/chk-hook-crossgroup.mjs c82        2 組｜45 張｜hook 加權 19–40.5｜note 276–350｜✓ 全部通過
node desc-tools/qa-batch.mjs out c82               out-1｜20 張｜字數 218–235
                                                   out-2｜25 張｜字數 222–235
                                                   合計 45 張，與卡單相符 ✓，>260: 0
qa-check-research（兩檔各一次）                      各 0 標記
fix-spacing（兩檔各一次）                             待補 0
```

**標記全是誤報，一條都沒為了關燈刪掉真話**（第 143 條）：
- 「非拉丁亂碼 АндрейЗувВикточф」——Kitchen Works 那張的西里爾人名
  （MB 實體「Андрей Зуев」、Legal name「Андрей Викторович Зуев」），**來源具名、是原始值**。
- 「簡體字 来会国」——三處全在**逐字引用的日文原文**裡（来歴／出会い／国立科学博物館）。
- **6 條 `http` src**：`japanimprov.com` 兩頁與 `yk.rim.or.jp` 三頁，
  **主線逐一實測 HTTP 全部 200、HTTPS 全部 000**，確為 HTTP-only，第 133 條成立。

## 八、本機還要做的事

1. **掃 24 張封面**（`c82/caa.log` 的「無圖」列）——本批封面率是這條線最低的幾批之一。
2. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。
3. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
4. **上架前逐張讀 `previews.json` 的 `note`**——尤其 **Quadra 是回補的**（見第四節）、
   **Dan Curtin《Deception》同年兩版軌數不同**（日版 10、英版 8，行文已把數字綁到版本上）。
5. **`node scripts/build-genre-tree.mjs --write`**（第 147 條）——
   **要排在 seed 上架之後**，否則本批的卡還不在 `seed_cards.json` 裡、算不進曲風樹。
   `data/rawgenres-cache.json` 過期就先跑一次 `--pull`。**這一步雲端做不到**（重建快取要碰 KV）。
6. **清掉本批的暫存腳本**：`desc-tools/entries-c82a.mjs`、`desc-tools/len-c82-w1.mjs`、
   `desc-tools/gen-c82-w2.mjs`、`desc-tools/len-c82-w2.mjs`。
