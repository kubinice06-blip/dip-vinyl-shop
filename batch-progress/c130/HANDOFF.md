# c-130 交接（2026-09-15）：波蘭人民共和國時期，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主 2026-09-15「**台灣獨立 緬甸 波蘭 做**」——體制線第四批，`lineType: 廣度`。

**45 張、41 位掛名、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID。年份 1966–1989。**

| 組 | 場景 | 張 | 內容 |
|---|---|---:|---|
| a | 波蘭人民共和國：搖滾與 sung poetry | 23 | 國營發行體系內的主流與前衛（Niemen 3、SBB 3、Budka Suflera 2、Perfect 2、Maanam 2、Republika 2、Lady Pank 2、Skaldowie 2、Breakout、Czerwone Gitary、Klenczon、Grechuta、Demarczyk） |
| b | 波蘭 1980 年代龐克與新浪潮 | 22 | Dezerter 4（含 §5.6 合輯 1）、Siekiera 2（含 §5.6 合輯 1）、Kult 2、Moskwa 2、Brygada Kryzys、Aya RL、Klaus Mitffoch、Armia、Tilt、TSA、Oddział Zamknięty、Lombard、Kombi、Izrael、Sztywny Pal Azji、Abaddon |

**b 組十張同名盤**是這批的形狀難點——開頭四字與主結構全部互異。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **45/45，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **43 full／2 partial**，out-1 171–239／out-2 198–240 |
| 封面 | **43/45**（缺 Demarczyk《Live》、TSA《TSA》，見第五節） |
| 固定試聽／無來源狀態 | **36/45**（探測 35 ＋ 研究層第三種查法 1），無來源 **9 張** |
| §5.5／§5.6 例外欄位 | **§5.6 兩張**（Dezerter《Underground Out of Poland》、Siekiera《Na wszystkich frontach świata》），舉證研究層逐頁重讀後 0 個站不住 |
| published gate | 本機端 |

**驗證**：`qa-batch out c130` 45 張與卡單相符；`chk-hook-crossgroup c130` 全過
（hook 加權 23–46.5、note 313–350）；`fix-spacing --field desc` 兩檔待補 0；`chk-prop` 標記 0。
主線複驗：45 張 `desc` 開頭與 `hook` 逐字相符、四位中文數字年 0、資料庫與商店名 0、
**簡體 0**、`Deuter` 0、跨組開頭四字零重複。
`qa-batch` 唯一那個標記是**誤報**（Sztywny Pal Azji「票選未具名主辦者」——主辦者就在同句前面）。

## 三、⚠ 年份：這批改了四張，另有五張兩說

**改卡單四張**（裁定 311／329a）——資料庫端的 `first-release-date` 取的是**錄音月**：

| 盤 | 原 | 改 | 依據 |
|---|---:|---:|---|
| Republika《Nowe sytuacje》 | 1982 | **1983** | 發行日 1983-07-04，Polton 公司 1983 年才成立（錄音 1982-09） |
| Maanam《Maanam》 | 1980 | **1981** | 百科樂隊與專輯條目、專業資料庫、串流 ℗ 四邊一致（錄音 1980 夏） |
| TSA《TSA》 | 1982 | **1983** | 精確日 1983-03-09，三方一致（錄音 1982-11） |
| Kombi《Nowy rozdział》 | 1983 | **1984** | 精確日 1984-06-20，三方一致 |

**兩說維持卡片年、正文不斷言精確年五張**：Dezerter《Kolaboracja》1987／88、Armia 1987／88、
Moskwa《Moskwa》1988／89、Oddział Zamknięty 1983／84、Sztywny Pal Azji 黑膠 1987／88（卡帶 1987 無異議）。

**SBB《Welcome》**：波德合製，西德 Spiegelei-Intercord 1978 先發、Wifon 1979 波蘭版，卡片取 1979。
**Demarczyk《Live》**：錄音 1979 年 12 月華沙，1982 年發行——策展層「1982 年前後巡演」不成立。

## 四、⚠ 政治中立在這批的落法

審查、戒嚴、Jarocin、地下卡帶**全部只寫成發行事實**：哪張被退曲目、哪首不在盤上
（Aya RL〈Skóra〉、Lombard〈Przeżyj to sam〉電台禁播、Tilt 那首熱門曲）、哪張只出卡帶、
哪張標題未印。**零評價、零運動敘事。**
**Wifon／Tonpress／Polton／Muza／Pronit 一律不得寫成私營或獨立廠牌**（Savitor 與 Polton 只寫「波僑資本參股」）。
以「審查」為主結構的全批 4 張、以 Jarocin 為主結構 1 張，皆在上限內。

**人名**：只有 Kazik Staszewski 具名（四重背書，研究層翻案推翻策展層第 324 條第 3 點）；
其餘單一來源的製作人／錄音師／封面設計與兩說的 Moskwa 鼓手**一律不具名**。

## 五、缺的

- **封面 2 張**：Demarczyk《Live》（CAA 在 RG 與兩筆 release 端點皆 404，Apple 也無本輯）、
  TSA《TSA》（CAA 404，**但有 Apple 1099465354 的 artworkUrl 與 Discogs r1483738 可當來源**，寫在研究 notes）。
- **試聽 9 張無來源**：Grechuta《Magia obłoków》、Demarczyk《Live》、Siekiera 合輯、
  Moskwa《Nigdy!》、Oddział Zamknięty、Lombard、Kombi、Izrael、Abaddon。
  三種查法逐張跑過，排除的候選逐筆記在研究 notes。
- **`partial` 2 張**（Grechuta、Demarczyk）——只因串流落空，事實面完整。

## 六、盤名與掛名的坑（本機端要知道）

1. **Armia《Antiarmia》**：原盤三筆 release 的 title 都是《Armia》，「Antiarmia」是再發用名。卡片照 RG。
2. **Izrael 1985 黑膠的 artist-credit 印成「Issiael」**（封面倒排字母）。掛名仍是 Izrael。
3. **Aya RL 盤名取《Aya RL (Czerwona)》**（裁定 327）；**Lombard 盤面帶「!」**。
4. **Klenczon 同 RG 三筆黑膠 artist-credit 不一致**（兩筆只寫 Trzy Korony）。
5. **Grechuta《Magia obłoków》是單獨掛名**，不是 & Anawa。
6. **Aya RL catno 是 SX-T 67、Lombard 是 SX 2109**（MB 空、外部有）；**Siekiera 合輯出版年 2008-01-26**（MB 記 2007）。
7. **波蘭龐克團 `Deuter` 不收**（裁定 322）——池中已有德國的 Deuter，同字串不同人，全批 desc 零命中。

## 七、下一批

- **Jarocin 官方合輯這一輪沒收進來**（裁定 329），要收得走 §5.6 且舉證要到本輯層級。
- 波蘭這條線 1990 年後（Myslovitz、Hey、Kult 後期）**還沒動**，但那已不是體制線。
