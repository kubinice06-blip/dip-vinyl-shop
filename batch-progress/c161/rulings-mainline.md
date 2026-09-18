# c-161 主線裁定

（`rulings.md` 由策展兩組使用；主線的條目寫在本檔，避免與代理的 append 撞在一起。）

## 第 1670 條（主線，**稽核；起因是 c-161 策展 a 的第 1685／1705 條**）：**MB 的 `label` 欄會把 EMI 的碟標成 Blue Note——但已發卡的各批經逐卡覆核，沒有因此收錯**

c-161 策展 a 新立第 1685／1705 條，其中一句很重：
**「MB 的 `label` 欄本身會被標錯——本組第一次抓到 MB 把 EMI 的碟直接標成 `Blue Note [713c4a95]`，
光信 label id 不夠。」**

這動搖的不只是單批：**`batch-progress/enum/blue-note.json` 的 1,812 列就是用
`release?label=713c4a95` 拉出來的**——若 MB 會錯標，列舉檔本身可能混進非 Blue Note 的碟，
而且**那與第 1560-AD 條稽核過的 `Blue Note Label Group` 是相反方向的錯**（那次是該收的被標成別的部門，
這次是不該收的被標成主實體）。

### 稽核做法與結果

掃 `desc-tools/batches/cards/` 裡 **c-148～c-160 全部已發卡的卡單**，
取每張卡 `label` 欄的**第一格**，挑出「第一格不是 Blue Note」的卡逐張看 `why`／`risk`。

**命中 37 張，逐張覆核後結論：37 張全部是策展層當場判過、而且引了先例的，沒有一張是漏網。** 分成四類：

| 類 | 張數 | 說明 |
| --- | ---: | --- |
| **`Somethin' Else`（東芝 EMI 的日本線）** | 14 | 本線一路把它當 Blue Note 的日本首發處理，`year` 取日版 |
| **(丙) 母體在真正的他廠** | 16 | `label` 寫「原盤：X」，`year` 取他廠那一版（Elektra／DIW／Concord／Not Two／Egrem／Hispavox／Denon／Polskie Radio／Monkeywood…） |
| **第 906 條「同集團鄰居招牌」** | 3 | **Manhattan Records**（Al Di Meola ×2、Lou Rawls）——**年份沒錯、只改 `label`**；三張都有 Blue Note 的後續數位版，**符合第 1631 條「有沒有任何一版真的掛過 713c4a95」的分界** |
| **第 1146 條「庫存盤」** | 4 | 含 **Chet Baker《Embraceable You》（Pacific Jazz）**——⚠ **這一張看起來像 (戊) 但不是**：(戊) 擋的是**再發系列**，這張是 **1957 年錄音壓了 38 年才首度商業發行、13 軌裡 12 軌從未發行**，走第 1146／874 條 |

**→ 已發卡的 c-148～c-160 不需要回頭改任何一張。**

### 但殘留風險沒有清掉，要交給本機

**這次稽核查的是「策展層寫進 `label` 欄的第一格」，不是 MB 原始資料。**
**策展層每張都去 Discogs 看過零售條目，所以錯標在策展層就被攔下了**——
**真正沒被檢查的是「列舉檔裡從來沒進過任何 slice 的那些列」。**
`blue-note.json` 有 1,812 列，本線只切到 c-170；**沒切到的列從來沒有人用 Discogs 覆核過。**

**→ 建議本機**：用 **Discogs 零售條目的廠牌鏈第一格**重跑 `blue-note.json` 全部 1,812 列的過濾，
而不是信 MB 的 `label` 欄。⚠ **並且注意 c-161 策展 a 的補充：`50999`／`0946` 是 EMI 集團共用號段，
目錄號前綴不能當 imprint 的證據。**

## 第 1671 條（主線）：**c-161 策展 a 交件驗收**

**收 19、退 4（19＋4＝23 ✓）**；`chk-prop a` **標記 0**（124 批 5,022 卡）；**rgMbid 19／19 對上 slice**。
**年份改判 1 張**：**Eliane Elias《Something for You…Bill Evans》2008 → 2007**
（日版 TOCJ-68076 2007-10-24 首發，**目錄號序列 68074/68075→68078 單調遞增佐證**；
與 c-160 b 的 Ron Carter《Dear Miles,》同形，**第 1667 條的「目錄號序列定年」第二次應驗**）。

⚠ **`chk-prop` 的第三道報了 4 筆「同掛名盤名詞元包含」**——**照第 1708 條全是誤報**
（「同藝人的《X》與《X (Live)》」以及「藝人名寫在盤名裡」兩種形狀），**只報不擋、不計標記，不必處理。**

**四筆退件**：Turrentine《Dearly Beloved》(乙)、Turrentine《Return of the Prodigal Son》(乙＋合輯)、
Art Farmer《Brass Shout / Aztec Suite》(乙＋合輯)、**Milton Nascimento & Jobim Trio《Novas bossas》(非 Blue Note imprint)**。

✅ **Horace Silver《Live at Newport '58》判 (甲) 收**——三層證據：Discogs format 無 Reissue／Compilation、
**錄音日反查全庫零前發**、以及**紙本 `BB-2008-02-23` Chart Beat 逐字
「Fifty years after it was recorded… debuts on Top Jazz Albums at No. 9」**。
**這是第 1553 條那條認法第一次拿到紙本的正面佐證。**

**2008 紙本抓了 51 期入庫**，判準是 c-160 b 第 1664 條新立的**「看清單裡有幾張美國盤，不是看年份」**
——本組 13 張美國盤，結果 **10／19 命中、4 個街頭日＋1 個發行預告，比 c-160 a 的 3／18 好三倍。判準有效。**
