# 薄細項策展線 ts4（地中海與拉丁傳統）策展派工（2026-10-20）

共同規則、去重指令、身分兩條路（MB 釘住／§1 人工身分）、名稱、證據、輸出格式與續跑，**全部照 `batch-progress/thin-sub-20261020/CUR-DISPATCH.md`**，只有下面幾點不同：

- **收「該樂種的正典專輯」**，不限搖滾。`genres` 第一個一律 `world`，第二個可選 `folk`／`jazz`／`classical`／`pop`。
- `country` 用 ISO 兩碼小寫（pt 葡萄牙、es 西班牙、ar 阿根廷、uy 烏拉圭、rs 塞爾維亞、ro 羅馬尼亞、bg 保加利亞、mk 北馬其頓、hu 匈牙利、us 美國 klezmer…）。
- **WebSearch 每組最多 6 次**。
- 老錄音多半原本是 78 轉或單曲，後來以專輯整理（EMI Valentim de Carvalho、Harlequin、El Bandoneón、Tango Argentino 系列、Arhoolie、Yazoo…）——這類可收，標 `releaseException: "archival-compilation"`，`why` 寫明收錄年代。同一位藝人不要收多張重疊的精選。
- 先查池中已有（去重指令）：Amália Rodrigues 5、Carlos Paredes 2、Mariza 2、Ana Moura 2、Madredeus 2、Dulce Pontes 1、Carlos do Carmo 1、Dead Combo 1；Camarón 4、Paco de Lucía 8、ROSALÍA 4、Tomatito 2、Vicente Amigo 2、Enrique Morente & Lagartija Nick 1、Triana 1、Gipsy Kings 1；Astor Piazzolla 5、Gotan Project 2、Bajofondo 1；Goran Bregović 4、Fanfare Ciocărlia 2、Taraf de Haïdouks 2、Boban Marković 1、Kočani Orkestar 1、Ivo Papasov 2、The Klezmatics 2、Muzsikás 2、Kroke 1。

## 分組
| 組 | 範圍 | 張數 |
|---|---|---:|
| f | **Fado**（Camané、Cristina Branco、Mísia、Carminho、Gisela João、Katia Guerreiro、Alfredo Marceneiro、Argentina Santos、Hermínia Silva、Fernando Maurício、Lucília do Carmo、Maria Teresa de Noronha、António Zambujo、Ricardo Ribeiro）12 ＋ **Flamenco**（Lole y Manuel、Ketama、Pata Negra、Enrique Morente 個人盤《Omega》以外、Diego el Cigala、Estrella Morente、Mayte Martín、Miguel Poveda、Carmen Linares、José Mercé、La Paquera de Jerez、Antonio Mairena、Manolo Caracol、Bernarda y Fernanda de Utrera、Israel Fernández、Rocío Márquez、Niña Pastori、Remedios Amaya）12 | 24 |
| g | **Tango**（Carlos Gardel、Aníbal Troilo、Osvaldo Pugliese、Juan D'Arienzo、Carlos Di Sarli、Roberto Goyeneche、Horacio Salgán、Edmundo Rivero、Julio Sosa、Susana Rinaldi、Rodolfo Mederos、Orquesta Típica Fernández Fierro、Daniel Melingo、Adriana Varela）12 ＋ **巴爾幹／吉普賽／Klezmer**（Le Mystère des Voix Bulgares、Esma Redžepova、Šaban Bajramović 其他、Romica Puceanu、Gabi Lunca、Mahala Rai Banda、Naftule Brandwein、Dave Tarras、Brave Old World、Frank London's Klezmer Brass Allstars、Márta Sebestyén、Söndörgő、Trio Bulgarka）10 | 22 |

輸出檔：`batch-progress/thin-sub-20261020/curation-<組>.json`（f 或 g）。
**每做完 5 張就把目前結果寫進輸出檔**；若輸出檔已有部分內容就接續補完，不要從頭重寫。輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/ts-<組>/` 子目錄。
