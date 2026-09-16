# c-135 交接（2026-09-16）：Blue Note 10 吋時期（1945–1955），40 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

Blue Note 目錄補齊線的**最早一段**（`lineType: 深掘`）：**BN 78 轉單曲期的 1945–46、10 吋 7000 系列、10 吋 5000 系列**。
這一段是整條線**資料最薄、封面與試聽命中率最低**的一批——不是做得不好，是這些碟在 1950 年代之後就沒有再發過。

**40 張、29 位掛名、零 §1 人工身分、40/40 釘住 release-group MBID、全部 Album。**

| 組 | 內容 | 張 |
|---|---|---:|
| a | 1945–53：Ike Quebec、Sidney Bechet、James P. Johnson、Edmond Hall、Thelonious Monk 期的 78 轉／7000 系列，接 5000 系列開端（Miles Davis、Horace Silver、James Moody、Lee Konitz、Erroll Garner 四卷…） | 21 |
| b | 1953–55：5000 系列主體（Gil Mellé、Kenny Drew、Howard McGhee、Wynton Kelly、Sal Salvador、Tal Farlow、Elmo Hope、Clifford Brown、Gigi Gryce、Julius Watkins、Lou Donaldson、Jutta Hipp、Fats Sadi、Hank Mobley…） | 19 |

**原 slice 45 張，退 5**（理由逐筆在 `rulings.md`）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **40/40，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **40/40 全 full**，out-1 216–239／out-2 221–240 |
| 封面 | **33/40**（缺 7，見第六節） |
| 固定試聽／無來源狀態 | **35/40 有來源，5 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | **不適用**——40 張全是純 Album |
| published gate | 本機端 |

**驗證**：`qa-batch out c135` 40 張與卡單相符、全部通過；`qa-batch hooks c135`＋`chk-hook-crossgroup c135` 全過
（hook 加權 24–44.5、note 318–350）；`fix-spacing --field desc` 兩檔待補 0；research 兩組全 full。
主線複驗：40 張 `desc` 開頭與 `hook` 逐字相符、禁語 0。

## 三、⚠ 年份與廠牌：改了 5 張，其中一張改的是「原盤根本不是 Blue Note」

| 碟 | 原 | 改 | 依據 |
|---|---:|---:|---|
| Ike Quebec《Ike Quebec Tenor Sax》BN 102 | 1945 | **1946** | 同期紙本 1946-08-10 新片預告＋08-17 評論 |
| Miles Davis《Young Man With a Horn》BLP 5013 | 1952 | **1953** | 同期紙本 1953-03-21 新片評論 |
| Horace Silver《New Faces New Sounds》BLP 5018 | 1952 | **1953** | 同期紙本 1953-03-07 新片評論（**第 475 條：這一筆一度漏改**） |
| Sidney Bechet《Jazz Festival Concert, Paris 1952, Volume 2》BLP 7025 | 1952 | **1953** | 資料庫的 1952 是**演出年** |
| James Moody《With Strings》BLP 5005 | 1952／Blue Note | **1951／Vogue** | **原盤是 Vogue L.D. 018《Moody's Mood》**（法國 1951，同八首、同 10 吋、同 master） |

另 **Fats Sadi BLP 5061 的 `label` 欄 US 年份 1954 → 1955**（`year` 維持 1954，因為原盤是 Vogue L.D. 212／FR 1954）。

⚠ **第 467 條（擋住了 5 張本來會被誤改的年份）**：**jazzdisco 的 7000 系列年份欄系統性晚 1–2 年**
（它記 7001=1951，但同期紙本 1950-09-30 已報導首批六張 10 吋）。
**同一份目錄的 5000 系列年份欄反而最準**（第 470 條：Fats Sadi 那筆贏過 MB 與 Discogs 兩個資料庫）。
**→ 一份來源的可信度要按欄位／按系列評價，不是按來源評價。**

## 四、⚠ 研究層擋下策展層 8 處＋五句無出處的「最／唯一」

**事實錯 5 處**：Gil Mellé BLP 5020 錄音日應是 **1952-03-02 與 1953-01-31**；Howard McGhee BLP 5024 應是 **1953-05-20**
（策展層寫 10-20，但 Billboard 1953-10-10 就已刊評論，不可能）；Sal Salvador BLP 5035 應是 **1953-12-24**；
Edmond Hall BLP 5026 的 Charlie Christian 彈的是**原聲吉他不是電吉他**（那正是這場被反覆提起的原因）；
Horace Silver BLP 5034 的 **Sabu 只在〈Message From Kenya〉一軌**。

**五句全擋**（全部查無來源）：Clifford Brown「生前唯一一組純四重奏錄音室錄音」、
Jutta Hipp「Blue Note 第一張非美國樂手領銜盤」（BLP 5019 1953、5052 1954 都更早）、
Fats Sadi「10 吋唯一一張歐陸樂手領銜盤」、Hank Mobley「5000 系列倒數第二張」（系列到 BLP 5070）與「24 張領銜盤」。
另**推翻英文維基**「Jutta Hipp 1956 年才在美國發行」——Billboard 1955-01-29 就已評（61 分）。

## 五、⚠ 10 吋↔12 吋回指：算術式的回指要逐軌驗（第 471 條）

- ✅ 可逐軌驗證：**BLP 5034＋BLP 5018 → 12 吋 BLP 1520**（店面 724469019 十六軌正好是兩張的八軌＋八軌）；
  **BLP 5040 六軌全數併進 BLP 1502**（引軌數要用 10 吋的 **6 軌**，不是 CD 的 11 軌）。
- ❌ **不成立**：「BLP 1537 ＝ 5021＋5055」——**1537 只收了 5055 四軌裡的三軌**（〈After You've Gone〉被拿掉），
  也漏了 5021 的〈Things We Did Last Summer〉。**c-136 收 1537 的回指寫法要照這條改。**
- **兩張 10 吋的軌數加起來剛好等於 12 吋的軌數時，漏收與收滿長得一模一樣。**

## 六、⚠ 缺的（這批是整條線缺最多的一批）

**封面缺 7 張**（CAA 無圖；研究層已覆核，三張在 Discogs 找到有圖條目）：
Sidney Bechet《with "Wild Bill" Davison》《and His Blue Note Jazz Men》《Jazz Festival Concert, Paris 1952, Volume 2》、
Edmond Hall & Sidney De Paris《Jamming in Jazz》、Edmond Hall《Memorable Sessions in Jazz》、
Julius Watkins《New Faces - New Sounds》、Fats Sadi《"Fats" Sadi's Combo》。

**試聽 35/40，5 張走固定無來源狀態**：Bechet《with "Wild Bill" Davison》、Edmond Hall & De Paris《Jamming in Jazz》、
James P. Johnson《Jazz Band Ball》、Lee Konitz《Plays With the Gerry Mulligan Quartet》、Erroll Garner《Overture to Dawn, Volume 3》。
（主線另查過 Garner Vol. 3 能不能沿用 Vol. 5 的公版廠合輯：**四軌只對到兩軌、且錄音日期對不上，不採**。）

⚠ **15 張的試聽是合訂版／回顧展／12 吋重組盤**，`previewUrl` 已指到**本盤的那一軌**（第 472 條），
例：Horace Silver 取 `724469019` 第 9 軌、Fats Sadi 取 `1661109180` 第 4 軌、
Dizzy Gillespie 取 `418323034` 的**第 2 片第 1 軌**。**本機上傳時要知道這些 collectionId 不是單張原盤。**

## 七、下一批

- **c-136、c-137 已走完雲端段**；c-138 寫作層在跑、c-139 研究層在跑、c-140 研究層在跑、c-141 待派。
- **第 312 條**：資料庫標 Compilation 的正典（Miles Davis《Volume 1》BLP 1501、Navarro《Vol. 2》BLP 1532……）
  被列舉檔濾掉了，**1939–66 六批跑完要另開 §5.6 子批撈回**。c-135 另記了兩筆：
  MB 把 BLP 5021 與 5030 折成同一 RG（5021 記 §1 候選）、《New Sounds》BLP 5010 是 split 合輯（§5.6 候補）。
