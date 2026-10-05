### 2026-09-28｜dip-vinyl-shop｜c-192（日本爵士補遺線 hoyi 第一批）五層管線走完，23 張

**改動摘要**：四堆混編 1967–1988，**35 張收 23 退 12（66%）**；身分 **17 pinned ＋ 6 §1 人工**、簡介 **23/23 全 full（212–240）**、
**封面 CAA 12/23（§1 六張走 Apple 精確 collectionId／manual-scan）、串流 16/23**。apex 0、例外欄全空。

**主要檔案**：`batch-progress/c192/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF,preview-fixes*.sh}`、`batch-progress/c192/dispatch/*`、
`desc-tools/batches/{cards,research,hooks,input,output}/c192-*.json`、`batch-progress/probe/{match-lib,downgrade}.mjs`。

**驗證結果**：`chk-prop` 0、三階段 `qa-batch` 全過、`chk-hook-crossgroup` 全過、兩組 `qa-check-research`／`fix-spacing` 0；
**鉤子預算 212–230 與 desc 212–240 自己重算**；首句照抄 hook 23/23。

**值得記住的**：
1. ⚠ ⚠ **手寫的「MB 查無」清單只有 5/18 屬實**——§1 候選一律過 `jp1-slice-enrich`，而且撞池比對要做轉寫（羅馬字盤名 vs 池中和文題）。
2. ⚠ ⚠ **探測層第四種誤命中**：短掛名摺疊後成為長掛名的子字串（`CCK`→`ck` ⊂ `jackdejohnete`）——`looseArtistOk` 已補擋板。
3. ⚠ **批次順序反了（c-193 先寫完）時，後寫的那批要把先寫的算進跨批比對**——c-192 鉤子層改了 2 個 hook、十餘處 note。
