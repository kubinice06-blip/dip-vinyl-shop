## 2026-09-05 — dip-vinyl-shop — c-98 策展提案（民謠／鄉村目錄深度）

- **改動摘要**：新增 `batch-progress/c98/prop-a.json`（23 張）與 `batch-progress/c98/prop-b.json`（21 張），
  合計 **44 張、32 位藝人**，`lineType: 廣度`。
  - **a 組＝鄉村與美國民謠目錄深度（23 張、15 位）**：
    Hank Williams 3（Hank Williams Sings 1952／Ramblin' Man 1955／Hank Williams as "Luke the Drifter" 1955）、
    Woody Guthrie 2（Struggle 1945／Library of Congress Recordings 1964）、
    Pete Seeger 2（American Favorite Ballads, Vol. 1 1957／Waist Deep in the Big Muddy & Other Love Songs 1967）、
    Odetta 1（One Grain of Sand 1963）、Patsy Cline 1（Patsy Cline's Greatest Hits 1967）、
    Tammy Wynette 2（Your Good Girl's Gonna Go Bad 1967／D-I-V-O-R-C-E 1968）、
    Marty Robbins 2（The Song of Robbins 1957／Devil Woman 1962）、Randy Travis 1（Old 8x10 1988）、
    Garth Brooks 1（The Chase 1992）、The Louvin Brothers 2（Nearer My God to Thee 1957／My Baby's Gone 1960）、
    Flatt & Scruggs 2（Songs of the Famous Carter Family 1961／Hard Travelin' 1963）、
    Dock Boggs 1（Dock Boggs: Legendary Singer and Banjo Player 1964）、
    Elizabeth Cotten 1（Volume 3: When I'm Gone 1979）、Joan Baez 1（Joan Baez, Vol. 2 1961）、
    Nitty Gritty Dirt Band 1（Uncle Charlie & His Dog Teddy 1970）。
  - **b 組＝歐洲與拉美民謠目錄深度（21 張、17 位）**：
    Georges Brassens 2（Nº2 1953／Nº10 : Les Copains d'abord 1964）、
    Léo Ferré 2（Verlaine et Rimbaud chantés par Léo Ferré 1964／Il n'y a plus rien 1973）、
    Víctor Jara 2（Canto libre 1970／Canto por travesura 1973）、
    Violeta Parra 1（Recordando a Chile: Una chilena en París 1965）、Atahualpa Yupanqui 1（Basta ya 1971）、
    Quilapayún 1（La Fragua 1973）、Inti-Illimani 1（Inti-Illimani 2: La nueva canción chilena 1974）、
    Chavela Vargas 1（La Llorona 1993）、Alan Stivell 2（Reflets 1970／E langonned (A Langonnet) 1974）、
    Malicorne 1（Le Bestiaire 1979）、Planxty 1（After the Break 1979）、The Chieftains 1（The Chieftains 1963）、
    Nic Jones 1（The Noah's Ark Trap 1977）、Selda Bağcan 1（Özgürlük ve Demokrasiyi Çizmek 1988）、
    Ruhi Su 1（Pir Sultan Abdal 1972）、Neşet Ertaş 1（Gönül Dağı 1999）、José Afonso 1（Venham mais cinco 1973）。
    **b 組骨幹只有五位，其餘十二位由策展層自行補進**（判準與掃過的候選名單見 `rulings.md` 第 14 條）。
  - **合輯 0 張**：44 張全部 `primary-type=Album`，`releaseType` 一律填 `Album`、例外欄位全空。
    其中 `secondary-types` 含 Compilation 的有 2 張（Hank Williams《Luke the Drifter》、
    Patsy Cline《Greatest Hits》），依 §5.6 明文照一般 Album 寫（`rulings.md` 第 1 條）。
- **主要檔案**：`batch-progress/c98/prop-a.json`、`batch-progress/c98/prop-b.json`、
  `batch-progress/c98/rulings.md`、`batch-progress/memory-entries/c98-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c98/chk-prop.mjs a b` → 44 張、32 位、**標記 0**；
  跨批去重掃到 50 批、2,340 張卡（最後一次執行時的讀數，其他批仍在增長），**跨批撞卡 0**。
  44 張全部釘住 release-group MBID 並**逐一回問 `release-group/<id>?fmt=json&inc=artist-credits+releases`**
  確認 `primary-type=Album`、`secondary-types`、artist-credit、first-release-date
  與轄下 release 的國別／status（第 41 條）。
  藝人目錄一律用 `release-group?artist=<MBID>&limit=100&offset=` 分頁取滿（第 116 條）；
  Hank Williams 214、Patsy Cline 355、Tammy Wynette 265、Marty Robbins 370、Brassens 203、Ferré 192
  六位都超過 100 筆，確實會踩到 25 筆上限那個陷阱。
  另在 `seed_cards.json` 全 14,424 列上做**盤名層級的全池實掃**（NFKD 摺疊＋去標點），44 張真撞卡 0；
  跨語言掛名四組（Víctor Jara／Selda Bağcan／Neşet Ertaş／Inti-Illimani）另做無變音符號版比對。
- **封面與試聽預估**：CAA release-group 端點逐張實測——**41 張 200、3 張 404**
  （The Louvin Brothers《My Baby's Gone》、Dock Boggs《Legendary Singer and Banjo Player》、
  Violeta Parra《Recordando a Chile》）。
  Apple 逐張實搜（店面序 USB `us→gb→jp→ca→de→fr→au`，歐洲與拉美另試 `fr/pt/es/tr/cl/ar/mx/ie`）——
  **39 張命中並記下確切 `collectionId` 與 `collectionExplicitness`（全為 notExplicit）、5 張全店面查無**。
  兩路交叉後：**封面預估 44/44 可得**（41 張走 CAA、3 張走 §4 `apple-verified-collection`，
  三個 collectionId 都已人工核對藝人／盤名／曲數並寫進 `risk`）；
  **試聽預估 39/44 可得**，5 張記 `unavailable` 不留 URL：Garth Brooks《The Chase》、
  Marty Robbins《The Song of Robbins》與《Devil Woman》、Nic Jones《The Noah's Ark Trap》、
  Inti-Illimani《Inti-Illimani 2》。
  另有 1 張的 Apple 條目是二合一併輯（Ruhi Su《Pir Sultan Abdal》→ tr 902820680
  《Karacaoğlan - Pir Sultan Abdal》），上架前必須 lookup 確認取到的軌屬本張那一半（第 140 條）。
- **未收清單**：見 `rulings.md` 第 8 條（四張因 CAA 與 Apple 兩路皆空而換片，全部可進 §1 補遺批）
  與第 14 條（查過、條件符合但本批未收的 17 位，以及池中零張的 8 位）。
  **MB 查無而剔除的：0 張**——本批候選全部在 MB 上有 `primary-type=Album` 的 release-group。
- **場景飽和度**：**鄉村這一側補完之後接近飽和，歐洲與拉美那一側還很空。**
  a 組 15 位補完後每位在池中都有 3 張以上、且「第一張該有的」都在；真正剩下的洞是
  戰前 old-time 與 1930–40 年代的整編輯（Document 分卷型，第 87 條擋在那裡）。
  b 組相反：法語香頌與智利 nueva canción 補到 3–5 張已成形，但**愛爾蘭、匈牙利、北歐、
  葡萄牙語圈與土耳其仍是每位 1–2 張**，而 De Dannan、Nuova Compagnia di Canto Popolare、
  Maria Farantouri、Alfredo Zitarrosa、Paco Ibáñez、Lluís Llach、Âşık Veysel、Márta Sebestyén
  八位池中零張——那不是深度問題，是整個場景還沒進來。
