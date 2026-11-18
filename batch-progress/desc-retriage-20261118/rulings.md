# desc-retriage-20261118 裁定與主線抽查

## 工具與派工

- `da/descs.json`：`dump-descs.mjs` 抓的現行簡介（22302 張，15 MB，`.gitignore` 排除不進 repo）。
- `tools/tri.mjs`：照 `desc-severe-20261117/tools/tri.mjs` 複製，路徑改本目錄、grade 加 `polish`、`split` 只取 11-17 `triage.json` grade=rewrite 的 13711 張（46 份，每份 300），`show` 在標題後印字數（給第 9 條「超過 240 字」用）、`merge` 輸出 `retriage.json`。
- `tools/sample.mjs`：主線抽查用，`node tools/sample.mjs <grade> <n> <seed>`。
- 派工詞 `prompt-retriage.md`：codes 沿用第 0 步 1–7（第 1 條改成只抓雜項開頭），**新增 8「主體不是這張專輯」（廠牌／單曲／人員／銷量）與 9「超過 240 字」**，方便後續分流。判例放店主看過的 5 張＋3 張舊 keep 判例。

## 校準抽查（前 500 張：rewrite 361／polish 110／keep 26／severe 3）

- rewrite 抽 12：Bunny Wailer《Blackheart Man》、Buzzcocks、Aphrodite's Child、311《Evolver》、Bill Charlap 現場盤等，都是聲音只有標籤或一句、主體在人員／廠牌／榜位，判對。Bill Madison《Sunday Mornin' Hayride》有指彈與踏板鋼棒吉他的聲音，但故事只有信箱與封套、開頭雜項，偏嚴但可接受（不上網寫不出故事）。
- polish 抽 10：Big Thief《Two Hands》、Café Tacvba、Jobim《Tide》、Bobby McFerrin《Spontaneous Inventions》等，聲音與故事都在、毛病是日期／品番／一兩句雜項或雜項開頭，判對。
- keep 抽 8：Bill Frisell《Harmony》、Alice Coltrane《Universal Consciousness》、Biglietto per l'Inferno 等，判對；Baby Rose 有一處發行日到日，嚴格說可進 polish，屬可接受範圍。
- **裁定**：判準無系統性偏差，派工詞不改，照原詞派完 46 份。keep 比例低（約 5%）是因為這批本來就是第 0 步篩下來的 rewrite，不是判得過嚴。

## 份間寬嚴差異（第一波交件後）

- 第一波 keep 比例份間落差大：004 是 46／300，007 只有 3／300。抽 004 的 keep 10 張：多數站得住（Ben LaMar Gay、betcover!!《卵》、Bedhead、Belong），但 Badbadnotgood《IV》聲音只有「更偏抒情、電子質感更明顯」應是 rewrite，幾張帶發行日到日依「拿不準 polish 還是 keep → polish」應進 polish。
- **裁定**：不重派整份；全部判完後加一道 **keep 複核**（把所有 keep 交給一支代理，用更嚴的鏡頭只問兩題：聲音是否具體、有無可刪雜項），降級的寫回並記在這裡。理由：keep 是唯一「之後不動」的級，錯放的代價最高；polish／rewrite 之間的誤差之後寫作層會再看到。
- 024 只出 27 張 polish、0 keep，抽 9 張 rewrite（Magma《Üdü Wüdü》、Maná、Callas《夢遊女》、Massive Attack《Protection》、Max Richter《Infra》等）：全篇確實沒有聲音描述，判對；這一份只是剛好落在弱稿密集的 M 段，不重判。

## 主線抽查（全數判完後）

- **rewrite** 抽 32 張（校準 12＋024 份 9＋全域 11：Tallis Scholars《Tenebrae Responsories》、Kancheli、John Lee Hooker《The Healer》、SHINee《Odd》、Argerich 拉三、Aventura、At the Drive-In《In/Casino/Out》等）：全篇沒有具體聲音或主體在人員／榜位／客座名單，判對，未發現該降 polish 的。
- **polish** 抽 30 張（校準 10＋全域 20）：多數判對。**發現系統性矛盾**：有 polish 同時標了 code 3（沒聲音）——Jacques Brel《N°2》聲音只有「鋼琴與弦樂為主」，自己的 codes 就寫 3。polish 的定義要求聲音具體，帶 3 的不可能是 polish；帶 7（事實可疑）要上網查證，也不能只改稿。
- **keep** 抽 35 張（校準 8＋004 份 10＋043–046 全部 5＋複核後 12）：複核後留下的都站得住（Air《Air Lore》、Glenn Gould 間奏曲、Weather Report《Sweetnighter》、Kevin Drumm《Tannenbaum》、Still Corners）。
- **severe** 看了 045 份全部 14 張（江蕙兩張、楊千嬅《Single》、田中フミヤ兩張、石野卓球、脫拉庫、珂拉琪等）：通篇獎項、曲長、盤號，判對。

## 收尾裁定（`tools/finalize.mjs` 套用）

1. **keep 複核**（`prompt-keepcheck.md`，K01／K02 兩份 533 張，001–042 份的全部 keep）：留 keep 253、降 polish 269、降 rewrite 11。降級的多是發行日到日、榜位銷量或只有曲風標籤（Badbadnotgood《IV》→ rewrite、Alfa Mist《Bring Backs》→ polish）。抽 10 張降 polish 的確認不是過嚴。043–046 份的 5 張 keep 由主線自己看：にせんねんもんだい《Destination Tokyo》（曲長開頭＋發行日到日）、舐達麻《NORTHERNBLUE1.0.4.》（發行日到日）降 polish，其餘 3 張留 keep。
2. **polish 帶 code 3 或 7 一律改 rewrite**：92 張。理由見上；可逆（retriage.json 留 `via` 欄 `+p2r` 標記，要撤回一行就好）。
3. polish 帶 code 8（主體偏人員／廠牌，但有聲音）**不改**：抽 8 張（Kikagaku Moyo、Papa Wemba《Le Voyageur》、Tim Maia《Reencontro》、George Jones《The Grand Tour》等）聲音都在，刪掉偏題段落就能成稿，符合 polish。
4. `retriage.json` 每筆多一個 `via`：`tri`（初判）、`keepcheck`（複核改判）、`tri+keepcheck`（複核維持 keep）、`main`（主線裁定）、`+p2r`（polish 帶 3／7 轉 rewrite）。

## 結果

severe 51／rewrite 9874／polish 3530／keep 256（合計 13711）。分布與代表例見 `summary.md`。
