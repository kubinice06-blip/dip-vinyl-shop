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
