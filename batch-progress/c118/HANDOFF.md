# c-118 交接（2026-09-06）：美國地下 house／techno 二線小廠，42 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

`EXPANSION-PLAN-c89plus.md` D 線，**`lineType: 深掘`**（本輪十六批唯一的深掘批）。

**42 張、42 位掛名（無一位重複）、零 §1 人工身分、零跨批撞卡、42/42 釘住
release-group MBID。年份 1988–1999。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 芝加哥 house 二線小廠 12 吋 | 19 |
| b | 底特律與紐澤西 techno／house 二線小廠 | 23 |

**「美國二線小廠」看的是製作端的場景與廠牌規模，不是壓片國**（本批裁定第 4 條／第 225 條）
——Virgo Four 的 1989 原盤是英國發行、Todd Terry 那張可引的只有荷蘭 Torso，兩張仍在收錄範圍內。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **42/42（100%）** | `c118/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **42 張全部寫完並過機器 QA** | `desc-tools/batches/output/c118-out-{1,2}.json` |
| 5. 固定試聽 | **23/42（55%）**，命中 `us 21｜gb 1｜jp 1` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**試聽從 15 補到 23**：研究層逐軌覆核了 43 個回撈候選與三店重掃的結果，
**採信 8 筆、駁回 39 筆**。剩下的 19 張是**真的沒有**——這條線的 12 吋本來就大量不在串流上。

**簡介的機器 QA**：`qa-batch.mjs out c118` 全過
（out-1 19 張 154–233、out-2 23 張 187–236、>260 零筆），`fix-spacing --write` 兩檔待補 0；
`qa-batch research/hooks c118` 與 `chk-hook-crossgroup c118` 皆 0 標記
（hook 加權 19–33、note 266–350）。
主線一次性複驗：**42 張 `desc` 開頭與 `hook` 逐字相符**、**四位中文數字年 0 筆**、
**42 張全部落在所屬字數帶**（full 40 張 187–236、partial 2 張 154／162）、
**禁寫項逐條掃描 0 次**（Trax／Fourth Floor／Ray Barney／Duane Buford／Sub-Urban，
其中 Armando 與 Virgo Four 兩處命中經覆核是**有來源的正確寫法**，不是禁寫項）。

## 三、⚠ 研究層擋下策展層 **27 張卡、31 處**（本輪單批最高）

較重的幾處，本機若要回看策展稿請一併對照：

| 卡 | 策展層寫的 | 實際 |
|---|---|---|
| Boo Williams | 「名下第一張／1990 年代唯一長篇」 | 1995 年已有兩張 Album，**本張排第 3** |
| Tyree | 「〈Turn Up the Bass〉出現之前」 | **那首就是本張第 5 軌** |
| Virgo Four | 「1989 年在 Trax 出」「美版原盤 Trax」 | **四筆 release 沒有一筆掛 Trax**（1989 是 GB 的 Radical Records） |
| Todd Terry | 「Fourth Floor」 | **一筆都沒有**；可引的只有荷蘭 Torso TORSO CD 109 |
| Sterling Void | 本名 Duane Buford | 條目記 **Duane Pelt** |
| DJ Deeon／Parris Mitchell | 「Dance Mania 是 Ray Barney 1985 年開的廠」 | 創辦人是 **Jesse Saunders**，Ray Barney 是隔年定名的人 |
| N.Y. House'n Authority | 「2018 Rush Hour 重發」 | 那筆是 **Nu Groove NG025D** |
| Eddie Fowlkes | 「35 個 RG 裡最完整的長篇」 | 純長篇有 7 張，**本張排第 5** |

**另有 9 張的人名與廠牌來歷實體欄位查不到來源**（Urban Tribe、Scan 7、K. Hand、
Terrence Parker、Byron Stingily、Photon Inc.、Dark Comedy、Silent Phase、The Martian），
**已標為不得寫，簡介裡一個人名都沒有**。**唯一寫得出成員名的是 Mood II Swing**
（實體 disambiguation 直接寫出兩人）。

## 四、⚠ 軌數：**42 張裡 12 張的黑膠／CD／數位軌數都不同**（第 251 條）

| 碟 | 版本與軌數 | 行文採用 |
|---|---|---|
| Blaze《Basic Blaze》 | **五個版本 9／10／8／10／8，無一相同** | 1997 九軌 |
| Sean Deason《Razorback》 | 黑膠 7／CD 9／數位 10 | CD 九軌，並說明黑膠七軌 |
| Blake Baxter《Dream Sequence》 | 6／8／11／5 | 黑膠六軌 |
| Infiniti《Skynet》 | 德版 9／美版 12（〈Body Oil〉10:28 對 4:10） | 德版九軌 |
| Kevin Saunderson《Faces & Phases》 | 英版 20／美版 22 | 二十軌 |
| Urban Tribe | 英 14／日 16 | 英版十四軌 |
| Armando | 原盤 8／1999 再壓 9（**換掉末軌**） | 八軌 |
| Virgo Four | 8／2010 黑膠與數位 9 | 八軌 |
| Glenn Underground | 黑膠 8／同年 CD 10 | 八軌 |
| DJ Sneak | 黑膠 8／美國 CD 11 | 八軌 |
| Steve Poindexter | 黑膠 8／CD 12 | 八軌 |
| Chez N Trent | 原盤 4／串流 5 | 四軌 |

**⚠ 最容易犯的錯是拿串流那一版的軌數，配上卡單那一版的廠牌編號。**
`note` 逐張寫明了「只能引 N 軌」與哪幾軌不是原盤曲目，簡介已逐張守住。

## 五、原盤的錯字一律照抄，本機不要「更正」

〈Love Gets Sronger〉（少一個 t）、〈Destorsion〉、〈Sympte Suite〉、〈Sience Funktion〉
（Sience 少一個 c、Funktion 用 k）、〈Jack 2 The Sound〉、〈Yo Yo Get Funky〉（黑膠分寫）、
〈Computer Gamez〉的 z、〈A 2½ Step〉（帶冠詞與 ½）、Todd Terry 第 3 軌的 `Cub version`（少一個 l）。

**盤名《House Work》兩個字、同名軌〈Housework〉一個字，不可互換。**

## 六、§5.5 electronic 白名單 7 張：**全數覆核成立**

Adonis（6 RG／Album 0）、Gherkin Jerks（3 RG／EP 2）、Chez N Trent（6 RG／Album 0）、
Chez Damier（27 RG／**純 Album 0**）、Photon Inc.（1 RG）、Reese（10 RG／Album 0）、
N.Y. House'n Authority（2 RG／皆 EP）。證據網址皆可開啟。

**一處措辭已修（第 249 條）**：Chez Damier 原寫「27 個沒有任何 Album」，
實際有 1 個 `primary-type=Album` 帶 `secondary-types [Compilation, DJ-mix]`，
已改成「沒有任何一張**純** Album」。

**其餘 35 張確認皆非 EP／Single**（其中 3 張是 Album+[Compilation]，
依第 167 條照一般 Album 處理，卡單填法無誤）。

## 七、本機接手的順序

1. 三軸、rarity、頂點資格（§0.8 錨點制）。
2. 上架 `seed_cards.json`、四處寫入與回讀。
3. **19 張沒有試聽來源**——這是真的沒有，不用再跑探測。
4. 回看策展稿時請對照第三節那張表，**策展層有 27 張卡被擋下**。
