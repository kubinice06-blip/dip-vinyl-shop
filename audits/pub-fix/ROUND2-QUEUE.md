# 已上線簡介・第二輪待修清單

`scripts/build-pub-fix-queue.mjs` 產生於 2026-10-04（第一輪修正包套用之後的 KV 現值）。機器可讀版是 `ROUND2-QUEUE.json`。

| 區 | 內容 | 數量 |
|---|---|---:|
| B1 | 退件說明／管線字樣——**客人看得到，最優先** | 2 則 |
| B1b | 正文以「本卡」當主詞的版本說明（非退件，次優先） | 7 則 |
| C | 人工補記（含另一個工作區點名的五件） | 6 則 |
| A | 事實更正，需研究後改寫 | 268 條／234 張卡 |
| B2 | 正文點名出處的**候選**（維基／MusicBrainz／Discogs／AllMusic…），逐則判斷要不要改成不具名敘述 | 786 則 |

A 區有 55 條的原句在線上已經找不到（多半被第一輪的去出處改寫順手改掉），派工前先看「原句還在」欄；6 條對不到卡。

## B1　退件說明／管線字樣

### `desc2:coleman hawkins|body and soul`　命中：本卡配到、策展指定、建議退回

> Coleman Hawkins 一九三九年的〈Body and Soul〉錄音是次中音薩克斯風即興藝術的分水嶺文獻，幾乎整曲不直陳主旋律而以和聲變奏行進。不過本卡配到的 MB release group 為二〇〇一年法國發行的單一版本合輯，並非店主策展指定的一九八六年 RCA Bluebird 權威結集，Apple 端亦僅配到單曲，建議退回重配。

### `desc2:odyssey|odyssey`　命中：策展意圖、本列所配

> 策展意圖指向的是紐約三重唱 Odyssey 1977 年在 RCA 發行的首作，其中收錄〈Native New Yorker〉，該曲進告示牌 Hot 100 第 21 名、英國單曲榜第 5 名；團體由 Lopez 姊妹起家，菲律賓裔貝斯手兼歌手 Tony Reynolds 在單曲走紅後加入，首作之後即由 William McEachern 接替。但本列所配的 release-group 首發於 1972 年、廠標為 Motown 子廠 Mowest，是另一個同名團體的唱片，兩者不可混為一談。

## B1b　「本卡」版本說明

| 鍵 | 前後文 |
|---|---|
| `desc2:ewan maccoll & a.l. lloyd／the english and scottish popular ballads` |  Ballads》四輯八張，是英倫民謠復興最直接的曲目來源。本卡對應的是其中第二卷，Folkways 於 1964 年以 FG 3510 重發， |
| `desc2:pacific 231／tropical songs gold` | ic 231，靠 disambiguation 欄才分得開。本卡是日本那個實體，那一欄寫 Shigeomi Hasumi、Takemasa Mi |
| `desc2:the rolling stones／between the buttons` | 1967 年 1 月 20 日英國 Decca 首發，本卡取隨後上市的美版 London——它把英版的〈Back Street Girl〉 |
| `desc2:the strokes／is this it` | Cops〉換上〈When It Started〉並另換封面，本卡採含該曲、封面為黑手套的國際版。 |
| `desc2:various artists／laos: lam saravane / musique pour le khène` | 二。這份錄音 1978 年先以雙 LP 由法國國家電台出版，本卡是 1989 年的 Ocora CD 版，六軌約七十分鐘。開頭那首長篇由兩位歌者 |
| `desc2:wanda landowska／bach: goldberg variations` | -la-Forêt 為 HMV 錄下二十世紀第一份此曲唱片；本卡則是 1945 年 3 月至 6 月在紐約 RCA Victor 第一錄音室的重 |
| `desc2:新寶島康樂隊／第3輯` | 目，一筆把這一軌算了進去記成 12 軌，另一筆記 11 軌。本卡採的是十二軌那筆，1995 年滾石唱片、一片 CD，開場〈歡聚歌〉2:22，最短 |

## C　人工補記

| 鍵 | 問題 |
|---|---|
| `desc2:fabrizio de andré／sogno nº 1` | 正文有校對痕跡「而非雜牌彙編」——那是給審稿看的卡池裁定語，不該給客人看。 |
| `desc4:齊豫／橄欖樹` | 這張只有 desc4（沒有產線稿）。兩處：禁歌原因只寫了「我的故鄉在遠方」，文獻上新聞局主要針對「流浪」（歌詞被迫改成「流浪流浪」）；「齊豫以〈歡顏〉拿下金馬獎最佳電影插曲」主詞錯，第 16 屆得獎人是作曲的李泰祥。建議直接走產線寫一則 desc2。 |
| `desc2:khaled／khaled` | 「1985 年在奧蘭音樂節得首獎後被冠上 Cheb」因果寫反：Cheb 是他少年時期錄音就用的稱號，1985 年得到的是「raï 之王」，1992 年拿掉 Cheb。 |
| `desc2:ofra haza／yemenite songs` | Shalom Shabazi 生卒 1619–約 1720，是十七世紀，不是十六世紀。 |
| `desc2:souad massi／raoui` | 「受死亡威脅後離開阿爾及利亞」——她本人受訪否認（The Markaz Review、Arab News），改中性寫法。 |
| `desc2:souad massi／deb` | 同上，「因伊斯蘭保守派的死亡威脅於 1999 年遷居巴黎」。 |

## A　事實更正

| 批次 | 卡 | 上線寫法 | 問題 | 依據 | 原句還在 |
|---|---|---|---|---|---|
| ar-b-012 | 929《也許像星星》 | 929 由吳志寧與黃玠 2004 年在大學時期組成 | 此句依中文維基〈吳志寧〉；馬世芳〈8/14 耳朵借我：專訪929樂團〉寫 2005 年首次上節目是志寧和嘟嘟兩人組，黃玠後來才在四人編制出現、再因單飛退出，兩源對創團成員不一致；建議簡介只寫「吳志寧在大學時期組成」、不點黃玠為共同創團者，或標明出處 | https://vocus.cc/article/601a697bfd89780001367b50 | 是 |
| ar-b-012 | 929《929同名專輯》 | 2004 年吳志寧與黃玠在大學時期成立 929；同名碟是兩人編制做出來的 | 同上：兩人編制的另一位，馬世芳寫是嘟嘟（貝斯），中文維基則說成立者是黃玠；簡介引中文維基原句本身無誤，但讀者會以為兩人編制就是吳志寧與黃玠，建議不暗示這一點 | https://vocus.cc/article/601a697bfd89780001367b50 | 否 |
| ar-b-013 | Gene Clark《No Other》 | 2019 年 4AD 重製後評價翻轉 | 維基 No Other 條寫評價早在 2000 年代就已翻轉，4AD 2019 年重發是翻轉之後的豪華版（Metacritic 94）；The Quietus 的長文原稿寫於 1995 年已稱它是史上最偉大專輯之一。建議改成「多年後重新評價，2019 年 4AD 推出豪華重發」。 | https://en.wikipedia.org/wiki/No_Other | 是 |
| ar-b-013 | Gorilla Biscuits《Start Today》 | 全張總長 24 分 45 秒、十四軌 | 英文維基 Start Today 條寫總長 24:09，Crack 雜誌寫 12 軌；與上線簡介的 24:45、十四軌不一致，可能是不同版本（CD 再版加曲或 MusicBrainz 版本差異），請在本機對 MusicBrainz 與原盤核對。 | https://en.wikipedia.org/wiki/Start_Today | 否 |
| ar-b-014 | Leb i Sol《Leb i sol》 | 團名是馬其頓的待客語：貴客上門，先端出麵包和一撮鹽 | en 維基同此說，但 sr 維基把團名解釋為『只吃麵包和鹽也不放棄』的堅持之意，兩源解釋不一；建議改成只寫『團名是馬其頓語的麵包與鹽』或標明由來有兩種說法。低優先。 | https://sr.wikipedia.org/wiki/Леб_и_сол | 是 |
| ar-b-015 | Phil Collins《...But Seriously》 | 談無家者的〈Another Day in Paradise〉拿下第三十三屆葛萊美年度單曲 | 維基〈Another Day in Paradise〉條目寫它在 1991 年葛萊美獎得的是 Record of the Year（年度唱片），Song of the Year（年度歌曲）只是入圍沒得；『年度單曲』易被讀成 Song of the Year，建議改成『年度唱片』或寫成 Record of the Year。單源，建議本機再核。 | https://en.wikipedia.org/wiki/Another_Day_in_Paradise | 是 |
| ar-b-015 | Robert Calvert《Test-Tube Conceived》 | 1988 年他在拉姆斯蓋特去世，墓碑上刻著莎士比亞的一句詩 | 死亡地點兩源不一致：英文維基寫在 Ramsgate 的 Corner House 咖啡館外、Encyclopedia.com 寫在 Margate 家中；建議簡介只留「1988 年去世」，不寫地點（墓碑刻句只見維基與衍生網站，單源）。 | https://www.encyclopedia.com/education/news-wires-white-papers-and-books/calvert-robert | 是 |
| ar-b-015 | The Black Skirts《201》 | 他十二歲移居美國、2006 年返韓後以單人樂團起步。 | 移居年齡有 12 歲（英文維基）與 13 歲（韓文維基、搜尋摘要）兩說；返韓年份英文維基寫 2006，但韓文維基、Bugs 訪談、Newsis 訪談都指向 2007 年來韓，2006 年是樂團轉為單人專案的年份。建議把『十二歲』改成『青少年時期』、『2006 年返韓』改成『2007 年來韓發展』。 | https://ko.wikipedia.org/wiki/%EA%B2%80%EC%A0%95%EC%B9%98%EB%A7%88 | 是 |
| ar-b-015 | THE BLUE HEARTS《THE BLUE HEARTS》 | 甲本ヒロト、真島昌利、河口純之助、梶原徹也1985年組成 | 日文維基寫 1985 年成軍時是甲本、真島與河口，鼓手梶原徹也 1986 年才加入；單源（日文維基），建議把『四人 1985 年組成』改為『甲本與真島 1985 年起頭、1986 年補齊四人』或改成不點年份。 | https://ja.wikipedia.org/wiki/THE_BLUE_HEARTS | 是 |
| ar-b-016 | 光束夜《1st》 | 這張 12 吋出在 1990 年的日本 Ray Night Music，編號 RNM0001 | 英文維基系統來源（搜尋摘要）寫首張 LP 在 Ray Night Music 於 1991 年發行；MusicBrainz 記 1990；兩源不一致，未能判定，建議店主再核對 Discogs 實體資料。 | https://en.wikipedia.org/wiki/Kousokuya | 是 |
| ar-b-017 | 老王樂隊《暮夜徐行》 | 發行約半年之後樂團宣布暫時休團，這張碟因而成為目前的最後一張 | ETtoday 報導樂團 2025 年 11 月 30 日在簡單生活節 Legacy 舞台宣布暫時休團，中文維基寫 2025 年底在簡單生活節宣布；而本專輯首發為 2025 年 10 月 30 日（事實庫 MusicBrainz），第二張實體碟 11 月 13 日。休團距首發約一個月，不是約半年；建議改為『發行約一個月之後』，並因『目前的最後一張』會過期，建議改寫。 | https://star.ettoday.net/news/3076296 | 是 |
| ar-b-017 | 脫拉庫《飛向陽光飛向你》 | 一九九九年首張《歡迎脫拉庫》入圍第十一屆金曲獎最佳演唱團體獎 | 第 11 屆金曲獎典禮於 2000 年 4 月 28 日舉行，1999 年是專輯發行年；寫『一九九九年…入圍』易讀成入圍發生在 1999 年，建議改為『首張專輯入圍 2000 年第 11 屆…』或去掉年份。 | https://zh.wikipedia.org/zh-tw/%E7%AC%AC11%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E | 是 |
| ar-b-017 | 脫拉庫《歡迎脫拉庫》 | 貝斯彭承吉、鼓陳沐凡 | 本層開頁的中文維基摘要與聯合報 udn 專題都寫彭丞吉、陳牧凡，與上線簡介（彭承吉、陳沐凡）寫法不同；中文維基原頁字形請店主於本機核對（本層讀的是工具摘要，字形可能被轉寫，不確定）。 | https://time.udn.com/udntime/story/122834/8011437 | 是 |
| ar-b-017 | Dick Gaughan《Coppers & Brass》 | 同一段時間，他還與一支凱爾特搖滾團錄了四張 | Stoneyport（藝人經紀簡介）寫與 Five Hand Reel 錄了三張專輯，與簡介的『四張』不一致；是否有誤待店主用 Five Hand Reel 目錄核對（本層未查到可確認的專輯清單，僅供核對）。 | https://stoneyport.biz/dick-gaughan | 是 |
| ar-b-017 | Garth Brooks《No Fences》 | 獲 RIAA 認證 18 白金 | 本批特注規定 Garth Brooks 銷量與認證倍數不寫；這不是事實錯誤，是規則問題，建議店主本機改寫時拿掉認證倍數與週數統計 | https://en.wikipedia.org/wiki/Garth_Brooks | 是 |
| ar-b-017 | Garth Brooks《Garth Brooks》 | 2006 年 11 月鑽石認證、美國出貨超過一千萬張 | 同上，在世者認證與銷量不寫 | https://en.wikipedia.org/wiki/Garth_Brooks | 否 |
| ar-b-017 | Garth Brooks《The Chase》 | 首週賣出 403000 張並獲 RIAA 鑽石認證 | 同上，在世者銷量與認證不寫 | https://en.wikipedia.org/wiki/Garth_Brooks | 否 |
| ar-b-017 | Steve Earle《Copperhead Road》 | B 面轉成情歌，收尾的〈Nothing but a Child〉與 Maria McKee 對唱 | 維基〈Copperhead Road〉專輯條目把〈Nothing but a Child〉描述為聖誕主題的二重唱（Christmas-themed duet），不是情歌；建議把『B 面轉成情歌』改成較中性的說法 | https://en.wikipedia.org/wiki/Copperhead_Road | 是 |
| ar-b-018 | Woody Guthrie《Library of Congress Recordings》 | 維基記這是 Guthrie 最早的錄音 | Britannica 的傳記寫他『1941 年與 Alan Lomax 做了首批錄音』，與『1940 年 3 月最早』矛盾；『最早』一類宣稱兩源不一致，建議店主在本機改為不寫『最早』，只寫 1940 年 3 月為 Lomax 錄音、編目於國會圖書館 | https://www.britannica.com/biography/Woody-Guthrie | 否 |
| ar-b-018 | Charlie Rich《The Fabulous Charlie Rich》 | 1958 年剛進 Sun Records；九年後 Epic 簽下他（即 1967 年） | 年份來源不一致：Encyclopedia of Arkansas 寫 1957 年簽 Sun，encyclopedia.com 寫 1968 年簽 Epic，英文維基為 1958 與 1967。建議改為『1950 年代後期』與『1960 年代後期』，或不寫確切年份。 | https://encyclopediaofarkansas.net/entries/charlie-rich-2519/ | 否 |
| ar-b-018 | Dwight Yoakam《Guitars, Cadillacs, Etc., Etc.》 | 1980 年代初…從 Nashville 移居洛杉磯 | 年份來源不一致：PBS SoCal 寫 1977 年離開 Ohio State 與 Nashville 後來到洛杉磯，維基寫約 1982 年。建議不寫年份，或改成『離開 Nashville 後移居洛杉磯』。另『1984 年先在獨立廠牌發行同名六曲 EP』本層只查到 EP 在 1984 年錄成、之後簽 Warner 旗下廠牌，未查到『獨立廠牌發行』一節，請本機覆核。 | https://www.pbssocal.org/shows/artbound/dwight-yoakam-on-his-early-cowpunk-years-in-los-angeles | 否 |
| ar-b-018 | Fred Cockerham, Tommy Jarrell & Oscar Jenkins《Down to the Cider Mill》 | 這家廠牌的第一張唱片，材料直接來自老闆自己的收藏 | County Records 的第一張出版品是 1964 年的《A Collection of Mountain Fiddle Music》（County 501）；本張是 1968 年的 County 713，只能說是三人聯名的第一張。另外簡介「Charles Faurot 替廠牌錄的十幾張都在這一段」未在事實庫找到出處，建議一併查核。 | https://en.wikipedia.org/wiki/County_Records | 是 |
| ar-b-018 | Karel Kryl《Bratříčku, zavírej vrátka》 | 起初印一萬張很快售罄，換社長後庫存被圓鋸切掉，總印量估計五萬張 | 需確認口徑：Radiožurnál 報導該專輯數週內賣出約四萬張，捷克維基則稱該首歌 2015 年前累計約 30 萬張；簡介的『總印量五萬張』與這兩個數字的時間尺度不同，建議店主對照原始出處確認是哪個口徑。 | https://radiozurnal.rozhlas.cz/osobnosti-a-kultura-68-7571690/2 | 是 |
| ar-b-018 | Léo Ferré《Verlaine et Rimbaud chantés par Léo Ferré》 | 同一條目記這是流行音樂史上第一張錄音室雙唱片 | 這句出自法文維基單源、屬「史上第一」型宣稱，本層沒有另一個獨立來源，也沒有查到反例；建議改成『法文維基稱⋯』或刪去。上線簡介已寫成『同一條目記』，風險有限，列出供店主決定。 | https://fr.wikipedia.org/wiki/Verlaine_et_Rimbaud_chant%C3%A9s_par_L%C3%A9o_Ferr%C3%A9 | 否 |
| ar-b-018 | Michael Chapman《Rainmaker》 | 1967 年才進倫敦與 Cornwall 的民謠場演出 | 本層查到的來源對年份說法不一：維基與 KLOF 寫 1966 年在 Cornwall 演出，Tompkins Square 寫 1967 年在康瓦爾圈起步；上線簡介的『1967 年』與『才進倫敦』兩點無兩個一致來源，建議改為『1960 年代中期』或刪去年份。 | https://klofmag.com/2021/09/michael-chapman-dies-aged-80/ | 是 |
| ar-b-019 | Nic Jones《The Noah's Ark Trap》 | 聽過 Martin Carthy 的錄音之後，他把標準調弦換成了 DADGAD | DADGAD 只見英文維基單一說法；Living Tradition 專文寫他的招牌是 C 與 G modal 開放調弦，兩源不一致，建議改成「開放調弦」。 | https://www.livingtradition.co.uk/articles/nicjones | 是 |
| ar-b-019 | Randy Travis《Storms of Life》 | 史上第一張發行一年內銷量破 100 萬張的鄉村音樂首張錄音室專輯 | 鄉村音樂名人堂官網的措辭是『第一位以首張專輯達白金的鄉村藝人、第一位首張專輯達多白金的新人』，與上線簡介的『一年內破 100 萬張』不同口徑，且『第一』類宣稱本層無法獨立驗證；另外在世者的銷量與認證倍數（三白金）依現行規則不寫。建議改成名人堂官網的措辭或刪除。 | https://countrymusichalloffame.org/artist/randy-travis | 是 |
| ar-b-019 | Ray LaMontagne《God Willin' & the Creek Don't Rise》 | 同年 12 月獲兩項葛萊美提名，拿下最佳當代民謠專輯 | 提名公布在 2010 年 12 月 1 日，最佳當代民謠專輯的得獎在 2011 年 2 月 13 日的第 53 屆葛萊美獎；『同年 12 月……拿下』容易讓人讀成 2010 年得獎。建議改成『2010 年 12 月入圍、2011 年 2 月得獎』。 | https://en.wikipedia.org/wiki/53rd_Annual_Grammy_Awards | 是 |
| ar-b-019 | Seu Jorge《Cru》 | 第二張個人錄音室作 | 疑為第三張：KVPR 稱他 2001 年憑《Samba Esporte Fino》已在巴西成名，英文維基摘要另列 2003《Carolina》在《Cru》（2004）之前；上線簡介若按錄音室專輯數算，Cru 應是第三張（América Brasil o Disco 稱第四張則與此一致）。我只讀到維基摘要與 KVPR，未逐張核對年表，請店主本機覆核。 | https://www.kvpr.org/2016-02-27/brazilian-singer-seu-jorge-on-music-race-and-luck-versus-hard-work | 是 |
| ar-b-019 | Tammy Wynette《Your Good Girl's Gonna Go Bad》 | 維基記她 1965 年搬去（納許維爾） | 本次讀到的英文維基、Britannica、Country Music Hall of Fame 都寫 1966 年搬到納許維爾（維基寫 1966 年 1 月）；1965 年說法與本次三個來源不符，請店主在本機查原條目再決定是否改成 1966。 | https://www.countrymusichalloffame.org/artist/tammy-wynette | 否 |
| ar-b-019 | The Bothy Band《The Bothy Band 1975》 | Dónal Lunny 離開 Planxty、創辦 Mulligan 後召集的七人編制，首張同名專輯以 Keenan、Molloy、Peoples 齊奏 | 維基稱樂團最初的陣容有七人（原名 Seachtar，意為七人），但 Paddy Glackin 與 Tony MacMahon 在首張專輯前後離開，首張專輯的實際陣容是六人（RTÉ 與維基列出 Lunny、Keenan、Molloy、Peoples、Tríona Ní Dhomhnaill、Mícheál Ó Domhnaill）；寫成『首張專輯七人編制』不準確。另『Lunny 離開 Planxty、創辦 Mulligan』只見維基單源，我未取得第二源。 | https://www.rte.ie/culture/2018/0809/984081-simply-folk-recommends-the-bothy-band-1975-by-the-bothy-band/ | 否 |
| ar-b-019 | William Tyler《Impossible Truth》 | 2013 年這張…是他登陸 Merge 的第一張 | 本位未能查證：BOMB 2014 年 4 月稿寫 2014 年 4 月 29 日 Merge 發行《Lost Colony》EP，並稱《Impossible Truth》為 2013 年佳評作品，沒說明該張的廠牌；維基資訊框只列三個廠牌；建議店主在本機核對 Merge 官網或 Discogs 後再決定是否保留『Merge 的第一張』 | https://bombmagazine.org/articles/2014/04/24/william-tyler/ | 否 |
| ar-b-019 | คาราวาน《อเมริกันอันตราย》 | 碟是 1976 年 1 月的第二張，距首張一年多 | 泰文維基專輯表列首張《คนกับควาย》為 2518 年 12 月（1975 年 12 月）、《อเมริกันอันตราย》為 2519 年 1 月（1976 年 1 月），兩張只差約一個月；英文維基只標 1975 與 1976。泰文維基月份為單源，建議店主在本機以 Discogs 或 MusicBrainz 覆核後再改 KV。 | https://th.wikipedia.org/wiki/%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%A7%E0%B8%B2%E0%B8%99_(%E0%B8%A7%E0%B8%87%E0%B8%94%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B8%B5) | 是 |
| ar-b-019 | คาราวาน《อเมริกันอันตราย》 | 此後作品表空了七年，下一張要到 1983 年 | 英文維基寫 1976 年另有《Ruam Botpleng Sipsee Tulaa Siphok Vol. 2》，並稱 1982 年已出《Deuan Phen》（Full Moon）；泰文維基專輯表則在 1976 年 1 月後直接接 1983 年 6 月《บ้านนาสะเทือน》，無 1982 年一張。兩源不一致，『空了七年』『下一張是 1983』宜改為保守寫法或再覆核。 | https://en.wikipedia.org/wiki/Caravan_(Thai_band) | 是 |
| ar-b-019 | คาราวาน《บ้านนาสะเทือน》 | 七年沒出片之後，1983 年 6 月回來的這一張 | 同上：英文維基稱 1982 年已有《Deuan Phen》，故『七年沒出片之後』未必成立；泰文維基列 2526 年 6 月（1983 年 6 月）為《บ้านนาสะเทือน》。 | https://en.wikipedia.org/wiki/Caravan_(Thai_band) | 是 |
| ar-b-019 | あがた森魚《日本少年》 | マリオ／ニュー・モーニング 發行（FW-8001-02） | Mikiki 2021 年專欄『1976 年の細野晴臣』把本作標為『あがた森魚『日本少年（ヂパング・ボーイ）』フィリップス（1976）』，與上線簡介的發行廠牌寫法不同；FW- 開頭的編號是否屬 Philips 系統本層未核到，建議店主在本機以 Discogs 覆核廠牌與編號後再決定。 | https://mikiki.tokyo.jp/articles/-/44459 | 是 |
| ar-b-019 | あがた森魚《日本少年》 | 細野晴臣製作 | Mikiki 寫的是『細野晴臣が共同プロデュース』（共同製作），上線簡介寫『細野晴臣製作』，建議改為『共同製作』。 | https://mikiki.tokyo.jp/articles/-/44459 | 是 |
| ar-b-019 | 中島みゆき《愛していると云ってくれ》 | 先行單曲〈わかれうた〉…累計銷量破百萬 | ja 維基寫〈わかれうた〉銷量超過 70 萬枚（70万枚を超える），en 維基寫 more than 700,000；兩源都未達百萬；建議改為『超過 70 萬枚』或刪掉銷量。 | https://ja.wikipedia.org/wiki/%E4%B8%AD%E5%B3%B6%E3%81%BF%E3%82%86%E3%81%8D | 否 |
| ar-b-019 | 中島みゆき《愛していると云ってくれ》 | 〈世情〉後來因1980年《3年B組金八先生》第二季選為插入曲 | ja 維基與 en 維基都寫是 1981 年被該劇劇中使用而走紅（未提第二季）；上線簡介寫 1980 年。建議核對 TBS 播出年份後再決定，或改為『被《3年B組金八先生》使用後廣為人知』。 | https://en.wikipedia.org/wiki/Miyuki_Nakajima | 是 |
| ar-b-019 | 中島みゆき《予感》 | 末曲〈ファイト!〉後來在1994年被住友生命廣告啟用，並以兩A面單曲重新發行 | ja 維基只寫 1994 年的〈空と君のあいだに／ファイト!〉是雙 A 面單曲，並以〈空と君のあいだに〉為日本電視台《家なき子》主題歌；本位未查到〈ファイト!〉被住友生命廣告啟用一事，建議在本機核對。 | https://ja.wikipedia.org/wiki/%E4%B8%AD%E5%B3%B6%E3%81%BF%E3%82%86%E3%81%8D | 是 |
| ar-b-019 | 周雲蓬《牛羊下山》 | 此作使他獲得南方音樂盛典最佳民謠藝人 | 本層查得的最佳民謠藝人與最佳作詞是第 8 屆音樂風雲榜（Chinese Music Media Awards），中文維基連到的是《中國孩子》；未查到《牛羊下山》與南方音樂盛典的連結，建議店主本機核對該獎名稱與得獎專輯。 | https://zh.wikipedia.org/wiki/%E5%91%A8%E4%BA%91%E8%93%AC | 是 |
| ar-b-019 | 周雲蓬《沉默如謎的呼吸》 | 這是 2004 年的碟，也是他的首張專輯 | 中文與英文維基寫首張專輯 2003 年由摩登天空發行；MusicBrainz 的 release 年為 2004，兩種年份並存，建議簡介改成不寫發行年或標明為 2004 年版本。 | https://en.wikipedia.org/wiki/Zhou_Yunpeng | 是 |
| ar-b-020 | 林俊傑《和自己對話》 | 全球第一張以假人頭麥克風（人頭錄音）製作的華語流行唱片 | 『首張』的範圍有三種說法：中文維基〈和自己對話〉寫為全球首張以 Dummy Head 錄製的流行音樂專輯；媒體（人民網、Audionet）寫為華語樂壇先例或台灣創舉；英文維基該專輯頁未載。『第一』類宣稱兩源不一致，建議簡介改成較保守的『以人頭錄音技術錄製』，或寫成『中文維基稱…全球首張』。 | https://zh.wikipedia.org/zh-tw/%E5%92%8C%E8%87%AA%E5%B7%B1%E5%B0%8D%E8%A9%B1 | 是 |
| ar-b-020 | 藤圭子《新宿の女》 | 連續二十週第一，接續的《女のブルース》再連十七週，合計三十七週 | 《女のブルース》的連續週數與合計週數與來源不一致：Weblio（〈新宿の女／“演歌の星”藤圭子のすべて〉條目）寫《女のブルース》16 週、與其他作品合計 41 週；Tower Records 訃報與日文維基摘要寫其後三張共計 42 週。首張 20 週四源一致。建議簡介只留『首張連續二十週第一』，或查原始榜單後再定合計。 | https://www.weblio.jp/content/%E6%96%B0%E5%AE%BF%E3%81%AE%E5%A5%B3/%E2%80%9C%E6%BC%94%E6%AD%8C%E3%81%AE%E6%98%9F%E2%80%9D%E8%97%A4%E5%9C%AD%E5%AD%90%E3%81%AE%E3%81%99%E3%81%B9%E3%81%A6 | 是 |
| ar-b-020 | 謝雷《梨山痴情花》 | 1974 年在菲律賓被檢舉遣返，台灣也禁止他出境兩年，之後轉往歌廳與秀場 | 高風險事件只有中文維基單一來源；百度百科、WSM 經紀簡介、udn 專訪皆未提；本層未能找到第二來源，建議店主審視是否保留或改成較模糊寫法。 | https://zh.wikipedia.org/wiki/%E8%AC%9D%E9%9B%B7_%28%E6%AD%8C%E6%89%8B%29 | 否 |
| ar-b-021 | Collage《Collage》 | 成員關係欄只有六筆，六位全是女性 | 該句只依 MusicBrainz 關係欄；愛沙尼亞文維基列有 Aarne Vahuri、Tauno Vahter、Enn Tomson、Uno Loop 等人名為歌手，專輯條目另列男性樂手 German Pekarevski（長號）與 Lembit Saarsalu（次中音薩克斯風，性別由名字判斷、未另查），全是女性的說法恐誤導。 | https://et.wikipedia.org/wiki/Collage | 是 |
| ar-b-021 | Collage《Kadriko》 | 盤面是 1975 年 Мелодия СМ 02821-2 | 愛沙尼亞文維基團條目的唱片目錄把《Kadriko》記為 1974，與 MusicBrainz 的 1975 不一致，年份待核（Melodiya 目錄號本層未驗）。 | https://et.wikipedia.org/wiki/Collage | 是 |
| ar-b-021 | Collage《Käokiri》 | 盤面是 1977 年 Мелодия С60-08739-40；團史裡最後一個當年出的發行品 | 愛沙尼亞文維基記《Käokiri》為 1978，與 MusicBrainz 的 1977 不一致，年份待核；『最後一個當年出的發行品』的說法隨年份而變。 | https://et.wikipedia.org/wiki/Collage | 否 |
| ar-b-021 | Girls' Generation《Oh!》 | 原版在 2010 年 Gaon 年榜以 197,934 張排到全年第二 | 含銷量數字，依本批特注『K-pop 團體銷量、獎座數不寫』不應出現；數字本層未驗證。 | https://en.wikipedia.org/wiki/Girls%27_Generation | 是 |
| ar-b-021 | Girls' Generation《Gee》 | 實體是韓國一筆加中國一筆 | 事實庫引的英文維基〈Gee (EP)〉Release history 表列出南韓、菲律賓、台灣等地，與『韓國加中國』的說法對不上，待店主對照 MusicBrainz 核對。 | https://en.wikipedia.org/wiki/Gee_(EP) | 是 |
| ar-b-021 | H.O.T.《We Hate All Kinds of Violence》 | 銷量逾一百五十萬張，此後二十四年一直是 SM 旗下最暢銷的專輯，2020 年才被 NCT 打破 | 含銷量與排名宣稱，依本批特注『K-pop 團體銷量、獎座數不寫』不應出現；本層未驗證數字。 | https://en.wikipedia.org/wiki/H.O.T. | 是 |
| ar-b-021 | Phương Dung《Băng nhạc hương quê 1 - Tiếng hát Phương Dung》 | 她 1945 年生於 Gò Công | 越文維基寫 1945 年 8 月 9 日，英文維基寫 1946 年；來源不一致，建議店主確認或改成不帶年份 | https://en.wikipedia.org/wiki/Phuong_Dung | 是 |
| ar-b-021 | 이문세《이문세 4집》 | 〈그女의 웃음소리뿐〉 | 曲名中混入漢字「女」，疑為手誤，通行寫法應為純韓文〈그녀의 웃음소리뿐〉（英維〈Lee Young-hoon〉條目以 Only the Sound of Her Laughter 指同一曲；本層未逐字核對韓文曲名，建議店主在本機確認後改）。 | https://en.wikipedia.org/wiki/Lee_Young-hoon_(composer) | 是 |
| ar-b-021 | 이문세《이문세 4집》 | 銷量約 280 萬張 | 在世歌手的累計銷量，依本線規則不寫；英維與〈이영훈〉條目同為 2.85 million，數字本身有出處，是否保留請店主裁示。 | https://en.wikipedia.org/wiki/Lee_Moon-sae | 是 |
| ar-b-021 | 조용필《조용필 1집 (창밖의 여자)》 | 全輯成為韓國第一張銷量突破百萬的單張唱片 | 「第一張」類宣稱：韓國一日報只寫 1 집賣 100 萬張並載入金氏紀錄，沒寫『韓國第一張』；另有在世者累計銷量不寫的規則，建議店主複核這句。 | https://www.hankookilbo.com/news/article/201804121123249996 | 是 |
| ar-b-021 | サザンオールスターズ《NUDE MAN／KAMAKURA／熱い胸さわぎ》 | NUDE MAN『Oricon 累計97.1萬張』、KAMAKURA『累計95.3萬張』；熱い胸さわぎ『Music Magazine 2019 年 50 年邦樂專輯 100 選第 30 名』 | 規則面提醒而非事實錯誤：在世團體的累計銷量與樂評雜誌榜單名次依本線規則不寫（本層未查證這些數字）；是否保留請店主決定。 | https://ja.wikipedia.org/wiki/%E3%82%B5%E3%82%B6%E3%83%B3%E3%82%AA%E3%83%BC%E3%83%AB%E3%82%B9%E3%82%BF%E3%83%BC%E3%82%BA | 對不到卡 |
| ar-b-021 | 原子邦妮《折桂令》 | 這是首張專輯，2012 年發行；組合『一說分別來自櫻桃幫的查查與展翼樂團的 Nu』 | For Good Music 介紹稱 2011 年已推出獨立製作專輯，與『首張專輯』是否成立有出入（單源，未能確認 2011 年那張是否為正式專輯）；另 Star ETtoday 2017 年報導稱《孤單會消失離開不見》為『第二張專輯』，與《折桂令》為首張相符，故此疑點僅供店主參考。成員出身『一說』已有 zh 維基與兩篇新聞證實，可去掉『一說』。 | https://forgoodmusic.com.tw/live/concert/25 | 否 |
| ar-b-021 | 孫燕姿《孫燕姿同名專輯／我要的幸福》 | 『賣破三十三萬張』『上市十天賣破二十萬、累積三十八萬』『2000 年／2001 年全台銷售總冠軍』 | 規則面提醒而非事實錯誤：孫燕姿在世，累計銷量依本線規則不寫（本層未查證數字；zh 維基首張專輯 33 萬張、2000 年銷售冠軍一致）；是否保留請店主裁示。 | https://zh.wikipedia.org/zh-tw/%E5%AD%AB%E7%87%95%E5%A7%BF | 對不到卡 |
| ar-b-022 | 徐小鳳《風雨同路》 | 她的女低音在這批 1978 年的錄音裡壓得很低，「小白光」這個外號就是這麼來的 | 「小白光」是 1965 年她在「香港之鶯」歌唱比賽以白光的〈戀之火〉奪冠、出道時得到的稱號，與 1978 年的錄音音域無關；中文維基把這個外號放在出道段落（單源）；粵語維基與 ourchinastory 都只寫她 1965 年憑〈戀之火〉奪冠入行，未提外號。 | https://zh.wikipedia.org/wiki/%E5%BE%90%E5%B0%8F%E9%B3%B3 | 是 |
| ar-b-022 | 徐小鳳《每一步》 | 〈冬〉是 1985 年她加盟寶麗金時先灌的一首 | 中文維基寫她 1986 年起與寶麗金合作；上線簡介的〈全新歌集3〉則寫「翌年（1986）轉投寶麗金」。『1985 年加盟寶麗金』與兩處不一致，疑為 1985 年底簽約或 1986 年起算的差別，需回頭查單曲〈冬〉的實際年份。 | https://zh.wikipedia.org/wiki/%E5%BE%90%E5%B0%8F%E9%B3%B3 | 是 |
| ar-b-022 | 王菲《天空》 | 一九九四年十一月十日以「王靖雯」之名發行 | 中文維基王菲條寫 1992 年起藝名已改為 Faye Wong（王菲），而 ourchinastory 寫 1994 年才改回本名；兩說對不上，若採中文維基，1994 年的《天空》署名應核對原盤。建議核對原盤署名後再決定是否保留『以王靖雯之名發行』。 | https://zh.wikipedia.org/wiki/%E7%8E%8B%E8%8F%B2 | 是 |
| ar-b-022 | 蔡琴《此情可待》 | 〈最後一夜〉同時是電影《金大班的最後一夜》主題曲，拿下第 21 屆金馬獎最佳原創電影歌曲 | 中文維基第 21 屆金馬獎（1984 年）頁的獎項名稱寫『最佳電影插曲』，得獎者列為作曲陳志遠與作詞慎芝，不是演唱者蔡琴；簡介說『是主題曲』與『最佳原創電影歌曲』兩處的稱呼可能與當年獎名及片中用途不同。屬單源（只開了該屆維基頁），請主線在本機核對金馬獎官網的歷屆名單後再改。 | https://zh.wikipedia.org/wiki/第21屆金馬獎 | 是 |
| ar-b-022 | 蔡琴《出塞曲》 | 1979 年參加民謠風大賽走紅，『隔年』推出個人首作 | 中文維基蔡琴條目寫 1979 年同年發行首張專輯《出塞曲》；簡介的『隔年』與卡池年 1980 若是依 MusicBrainz 首發日期，可能不同於維基。單源，請主線本機以 MusicBrainz release-group 核對首發年。 | https://zh.wikipedia.org/wiki/蔡琴 | 否 |
| ar-b-022 | 陳慧嫻《永遠是你的朋友》 | 她也是唯一以同一張唱片有兩首歌同年入選十大中文金曲的女歌手 | 『唯一』類宣稱，補查的中文維基陳慧嫻條與〈千千闋歌〉條都只記〈千千闋歌〉入選 1989 年十大中文金曲，沒有『唯一』或另一首同年入選的記載，無法找到來源；建議主線在本機核對 1989 年十大中文金曲名單，查不到就刪掉這句。 | https://zh.wikipedia.org/wiki/千千闋歌 | 是 |
| ar-b-022 | Cesária Évora《Mar Azul》 | 前兩張唱片反應冷淡，1991 年這套八曲作品才真正賣動 | 英文維基與 Britannica 都寫的是 1992 年的《Miss Perfumado》帶來歐洲普遍的人氣與國際巡演；1991 年《Mar Azul》是她第三張，說它才真正賣動與兩源的突破作說法不符。建議改成『Miss Perfumado 之前的作品』或拿掉『才真正賣動』。另該簡介說 1987 年由 José da Silva 發掘，Britannica 與維基只說她 1985 年復出、1988 年首張專輯，1987 年未見支持。 | https://www.britannica.com/biography/Cesaria-Evora | 是 |
| ar-b-022 | Fania All-Stars《Latin-Soul-Rock》 | 同一條目抄下 1974 年原壓的說明欄：錄於 1973 年 8 月 24 日的洋基球場與紐約 Good Vibrations 錄音室，只有〈Soul Makossa〉錄在聖胡安 | 這句是轉述 Discogs 說明欄，洋基球場日期與美國國會圖書館文章不同（8 月 23 日 vs 24 日，LOC 文內自己也寫成『星期五』但 8 月 23 日是星期四），建議簡介保留轉述語氣，或把日期改成『1973 年 8 月』。另外 LOC 文章說《Live at Yankee Stadium》的音源有一部分取自 1973 年 11 月的波多黎各演出，與簡介無直接衝突。 | https://www.loc.gov/static/programs/national-recording-preservation-board/documents/FaniaAllStars.pdf | 是 |
| ar-b-022 | Goran Bregović《Time of the Gypsies》 | 是 Goran Bregović 結束 Bijelo Dugme 後跨進電影音樂的第一份工作 | 維基寫 Bijelo Dugme 1989 年才因政治危機解散，而《Time of the Gypsies》1988 年 12 月 21 日已在南斯拉夫首映，配樂早在樂團解散前完成，『結束 Bijelo Dugme 後』的時序對不上；『第一份電影音樂工作』也只見簡介，兩源都沒有這樣寫（Save The Music 只寫他『從 Time of the Gypsies 起』成為電影配樂主力）。建議改成『他在 Bijelo Dugme 時期之末跨進電影音樂的重要一步』或拿掉『第一份』。 | https://en.wikipedia.org/wiki/Time_of_the_Gypsies | 是 |
| ar-b-023 | Yellowman《Zungguzungguguzungguzeng》 | 源頭是 Alton Ellis 1967 年為 Coxsone Dodd 錄的〈Mad, Mad, Mad〉 | 維基 Alton Ellis 條目寫〈Mad Mad〉底軌是 1968 年與 Sound Dimension 錄製，與上線簡介的 1967 年不符；僅維基單源，建議店主在本機核對 Studio One 目錄再改。（此條在補查 Alton Ellis 時發現。） | https://en.wikipedia.org/wiki/Alton_Ellis | 是 |
| ar-b-023 | Youssou N'Dour《Egypt》 | 拿下 2004 年葛萊美最佳當代世界音樂專輯 | Grammy 官網的藝人頁記為第 47 屆（2005 年）Best Contemporary World Music Album 得獎專輯《Egypt》；2004 年（第 46 屆）他的提名是另一張《Nothing's In Vain (Coono du Réér)》。維基《Egypt》專輯條目寫成『2004 Grammy Award』，應是上線簡介出錯的來源。 | https://www.grammy.com/artists/youssou-ndour/17140/ | 是 |
| ar-b-023 | Alton Ellis《Sings Rock and Soul》 | 同年（1967）替 Duke Reid 錄的〈Rock Steady〉是第一首在歌名裡指出這個樂種的作品 | 維基 Alton Ellis 條目記〈Rock Steady〉為 1967 年；Songfacts 引 Ellis 本人說『1965 年我替它命名』並記發行 1965 年；兩源不一致，年份不宜寫死，建議刪年份或改寫『1960 年代中期』。 | https://www.songfacts.com/facts/alton-ellis/get-ready-rock-steady | 否 |
| ar-b-023 | Alton Ellis《Mr. Soul of Jamaica》 | Ellis 1967 年的〈Rock Steady〉是第一首把這個節奏名稱唱進歌名的作品 | 維基 Alton Ellis 條目記〈Rock Steady〉為 1967 年；Songfacts 引 Ellis 本人說『1965 年我替它命名』並記發行 1965 年；兩源不一致，年份不宜寫死，建議刪年份或改寫『1960 年代中期』。 | https://www.songfacts.com/facts/alton-ellis/get-ready-rock-steady | 是 |
| ar-b-023 | Alton Ellis《（Yellowman 卡）Zungguzungguguzungguzeng》 | 源頭是 Alton Ellis 1967 年為 Coxsone Dodd 錄的〈Mad, Mad, Mad〉 | 維基 Alton Ellis 條目寫〈Mad Mad〉底軌是 1968 年與 Sound Dimension 錄製，與上線簡介的 1967 年不符；僅維基單源，建議店主在本機核對 Studio One 目錄再改。 | https://en.wikipedia.org/wiki/Alton_Ellis | 對不到卡 |
| ar-b-023 | Dennis Brown《Wolf & Leopards》 | Bob Marley 口中的 Crown Prince of Reggae | 維基稱 Marley 贈此稱號，但 jamaicasonice 稱此稱號是 1980 年代前後才得到，各源只一致於『Marley 說他是最愛的歌手』；建議改寫成『Marley 曾說他是自己最喜歡的歌手』 | https://www.jamaicasonice.com/post/famous-jamaicans-the-crown-prince-of-reggae-dennis-emmanuel-brown | 是 |
| ar-b-023 | Dennis Brown《No Man Is an Island》 | 錄這批母帶時他 12 歲；錄音在 1969 至 1970 年間完成，他當時 12 到 13 歲 | 各源對出道錄音時的年齡不一（維基 12 歲、jamaicasonice 與 reggae museum 11 歲、牙買加國家圖書館 13 歲被發掘），建議改成『還是個孩子』避開年齡 | https://nlj.gov.jm/reggaeportal/dennisbrown/ | 否 |
| ar-b-023 | Los Van Van《Llegó... Van Van (Van Van Is Here)》 | 拿下 2000 年葛萊美最佳 salsa 專輯 | 2000 年是美國葛萊美（非拉丁葛萊美），當年類別名為 Best Salsa Performance（該類別後來改稱 Best Salsa Album），寫成『最佳 salsa 專輯』與當年名稱不同；另 en 維基〈Los Van Van〉條目把它寫成 2000 年拉丁葛萊美提名，與葛萊美類別條目、AfroCubaWeb 衝突（拉丁葛萊美 2000 年最佳 salsa 專輯另有提名紀錄、得獎者為 Celia Cruz）。建議簡介寫『2000 年葛萊美 Best Salsa Performance』或加上屆次。 | https://en.wikipedia.org/wiki/Grammy_Award_for_Best_Salsa_Album | 是 |
| ar-b-023 | Orhan Gencebay《Bir Teselli Ver》 | 〈Bir Teselli Ver〉最早是 1971 年的 45 轉單曲 | Daily Sabah 寫該曲所在 EP 為 1970 年；tr 維基寫 1969 年的突破單曲；上線簡介寫 1971；三源不一致，建議店主在本機核對原盤年份後再決定是否保留該年份 | https://www.dailysabah.com/portrait/2015/06/06/orhan-gencebay-inventor-of-turkish-arabesque-music | 是 |
| ar-b-024 | พุ่มพวง ดวงจันทร์（Pumpuang Duangjan）《ตะวันลับฟ้า／ลำเพลิน พุ่มพวง ดวงจันทร์》 | 《ตะวันลับฟ้า》寫「1975 年拜師之後才改用現在這個藝名」；《ลำเพลิน》寫「1976 年一位 luk thung 歌師收她為徒，替她取了名字」 | 兩張上線簡介對拜師與改名年份自相矛盾（1975 vs 1976）；泰文維基（事實庫）為 1975，英文維基只寫 15 歲（約 1976）被 Waiphot Phetsuphan 的巡演樂團發現，師父人名也不同。建議兩張都改成不帶年份的寫法，或由店主本機以泰文原始資料裁定。 | https://th.wikipedia.org/wiki/พุ่มพวง_ดวงจันทร์ | 對不到卡 |
| ar-b-024 | Amon Tobin《Supermodified》 | Metacritic 依八篇樂評給出 85 分，2012 年獲 IMPALA 雙銀認證，代表歐洲銷量逾四萬張 | 認證倍數與銷量（在世者）、樂評評分依共同特注不寫；事實本身與維基一致，只是違反寫作規範，建議本機刪去。 | https://en.wikipedia.org/wiki/Supermodified_(album) | 是 |
| ar-b-024 | Amon Tobin《Bricolage》 | Pitchfork 給滿分十分，Fact 在 2015 年 50 張最佳 trip-hop 專輯榜列第 23 | 雜誌榜單名次依共同特注不收；事實與維基一致，只是違反寫作規範，建議本機刪去。 | https://en.wikipedia.org/wiki/Bricolage_(album) | 是 |
| ar-b-024 | Bernard Parmegiani《Chants magnétiques》 | 法文維基記他 1959 至 1992 年是 GRM 的常任成員 | 待核：本層讀到的法文維基摘要寫 1960 年因 Schaeffer 邀請加入、到 1992 年；英文維基寫 1959 年加入。兩種維基對起始年不一致，上線簡介若要保留年份，建議改寫成不分起始年的說法或回頭對照法文維基原文（本層只讀到 WebFetch 摘要）。 | https://fr.wikipedia.org/wiki/Bernard_Parmegiani | 是 |
| ar-b-024 | Faithless《Reverence》 | Rollo、Sister Bliss 與 Maxi Jazz 在 1996 年 4 月推出的首張專輯 | 待核：CBS 訃聞與英文維基 Maxi Jazz 條目都寫創團成員還有 Jamie Catto，簡介只列三人，可能漏了一位創團成員；Catto 是否參與《Reverence》錄音本層未查，請店主對照專輯人員名單後決定是否補上。 | https://www.cbsnews.com/news/maxi-jazz-lead-singer-british-band-faithless-dies-at-65/ | 是 |
| ar-b-024 | Masonna《Inner Mind Mystique》 | 團名是一整句法文的縮寫……山崎マゾ 1987 年起用它當這個獨作計畫的名字 | 維基〈Masonna〉寫團名是マゾ與女的組合、亦為 Madonna 的諧音，縮寫展開只是『有時』的另一種讀法（且有兩種展開）；簡介把縮寫說成唯一由來，過度肯定。建議改成『名字常被拆成一句法文縮寫來讀』。 | https://en.wikipedia.org/wiki/Masonna | 否 |
| ar-b-025 | 冨田勲《展覧会の絵》 | 1960 年代末購入 Moog III 模組合成器 | 日文維基寫 1969 年在大阪的唱片行遇到《Switched-On Bach》、1971 年秋個人進口 Moog III-P；CISAC 與 Consequence 也都寫 1971 年進口。『1960 年代末購入』與來源不符，建議改『1971 年進口』。 | https://ja.wikipedia.org/wiki/冨田勲 | 是 |
| ar-b-025 | Cliff Martinez《Solaris》 | 本片獲 2003 年 Satellite Awards 最佳音效 | 獎項屬於電影音響（得主 Larry Blake），與 Martinez 的配樂無關；字面無誤但放在配樂簡介易被讀成配樂得獎，建議改寫或刪去 | https://en.wikipedia.org/wiki/Solaris_(2002_film) | 是 |
| ar-b-025 | DJ Koze《Kosi Comes Around》 | Stefan Kozalla 出身德國 Flensburg | en 維基寫生於 Flensburg，de 維基與 Pampa Records 官方頁寫生於 Marrakech，來源衝突；建議改成『在 Flensburg 的嘻哈圈起家』較穩。 | https://de.wikipedia.org/wiki/DJ_Koze | 是 |
| ar-b-026 | Paul van Dyk《Out There and Back》 | 自營廠牌 Vandit 的第一號發行 | 維基 Vandit Records 條目稱廠牌最早的發行是 Paul van Dyk 的單曲〈Another Way〉與〈Avenue〉；維基《Out There and Back》條目稱這是廠牌的第一張專輯。建議改成「Vandit 的第一張專輯」。兩條都是維基，非獨立，建議店主再核廠牌目錄。 | https://en.wikipedia.org/wiki/Vandit_Records | 是 |
| ar-b-026 | Sven Grünberg《Hingus》 | 愛沙尼亞文維基記載，1981 年完成的《Hingus》是整個蘇聯的第一張電子音樂唱片。 | 簡介把『蘇聯第一張電子音樂唱片』掛在愛沙尼亞文維基名下，原句確實出自該條目；但這是『第一』類宣稱且有明顯反例：拉脫維亞團 Zodiac 的《Disco Alliance》1980 年已由國營 Melodiya 發行，英文維基說它大量使用當時罕見的合成器音色，早於 1981 年。建議改成『愛沙尼亞文維基稱…』並加『說法有爭議』，或刪掉這個『第一』。另，Bureau B 重發頁（搜尋摘要）寫本作錄製於 1978 至 1980 年、1981 年發行，簡介『1981 年完成』可改『1981 年發行』。 | https://en.wikipedia.org/wiki/Zodiac_(Latvian_band) | 是 |
| ar-b-026 | 浜瀬元彦《Reminiscence》 | 1986 年 1 月 25 日由 Shi Zen 發行的個人作 | 日文維基唱片表把《Reminiscence》記為 1985 年，與上線簡介的 1986 年 1 月 25 日不一致；不確定誰對（Discogs／MusicBrainz 為 1986），僅供店主核對，非確定錯誤 | https://ja.wikipedia.org/wiki/%E6%BF%B1%E7%80%AC%E5%85%83%E5%BD%A6 | 是 |
| ar-b-028 | Blood Orange《Essex Honey》 | 距上一張完整長篇七年，中間只出過一張四首的 EP；2018 年《Negro Swan》之後他只放了那張 EP | 2018 年《Negro Swan》到 2025 年之間，Blood Orange 另有 2019 年 7 月 12 日的混音帶《Angel's Pulse》（Fader 稱《Essex Honey》距《Angel's Pulse》六年）；『只放了那張 EP』不成立。『七年』若指與《Negro Swan》之間的完整長篇，算法成立，但需避免暗示中間沒有其他發行。四首 EP《Four Songs》為 2022 年 9 月 16 日 RCA 發行、是他在 RCA 的第一個發行，上線簡介此點正確（RCA 簽約消息為 2022 年 9 月，維基與搜尋摘要一致）。 | https://www.thefader.com/2025/07/17/blood-orange-essex-honey-release-date | 否 |
| ar-b-028 | Chief Keef《Back From the Dead》 | 2012 年 3 月 … 的第五張 mixtape | 維基稱《Back from the Dead》是他的第五張 mixtape，Billboard（2019，Songs That Defined the Decade）卻稱是第三張；序數兩源不一致，建議店主改寫成不帶序數的版本，或另查 mixtape 目錄後再定。其餘如〈I Don't Like〉Hot 100 第 73 名、Kanye West 官方 remix 收進《Cruel Summer》，Billboard 與維基皆支持，無誤。 | https://www.billboard.com/music/music-news/chief-keef-dont-like-songs-that-defined-the-decade-8543876/ | 否 |
| ar-b-030 | 陶喆《I'm OK》 | 他以此拿下第十一屆金曲獎最佳唱片製作人獎 | 維基第 11 屆金曲獎頁與陶喆條目都寫第 11 屆該獎為『最佳專輯製作人獎』（維基第 9 屆頁則寫『最佳唱片製作人獎』），疑似該獎名在第 11 屆前後有更名；上線簡介的得獎事實本身與維基一致，只有獎項名稱待對官方資料確認，建議改寫成『最佳專輯製作人』或查金曲獎官網後定案 | https://zh.wikipedia.org/zh-tw/%E7%AC%AC11%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E | 否 |
| ar-b-030 | Astor Piazzolla《Adiós Nonino》 | 1959 年 10 月在紐約得知父親死訊後，不到一小時寫成 | 維基 Adiós Nonino 條目（僅見搜尋摘要，未開頁）與 Piazzolla 條目都說他是在波多黎各巡演時得知死訊；前者說幾天後在紐約寫成，後者說得知後不到一小時寫成，建議本機核對地點與『不到一小時』 | https://en.wikipedia.org/wiki/Adi%C3%B3s_Nonino | 否 |
| ar-b-030 | Bernard Herrmann《Taxi Driver》 | 錄音完成數小時後他即於 1975 年 12 月 24 日過世 | Britannica 寫他 1975 年 12 月 24 日過世、是完成配樂的隔天；『數小時後』與之不一致（僅 Britannica 單源，建議本機再核） | https://www.britannica.com/biography/Bernard-Herrmann | 是 |
| ar-b-030 | Jascha Heifetz《Korngold: Violin Concerto》 | 這是本曲的第一份錄音，往後很多年裡也是唯一的一份 | 英文維基 Korngold 小提琴協奏曲條目記 Heifetz 1947 年 2 月 15 日聖路易首演、1947 年 3 月 30 日 Carnegie Hall 演出有廣播轉錄盤；因此『第一份錄音』至少應限定為『第一份商業錄音』，『唯一』也沒有來源（僅查到維基，未能證實或推翻） | https://en.wikipedia.org/wiki/Violin_Concerto_(Korngold) | 是 |
| ar-b-031 | Budapest String Quartet《Ravel: Quartet in F major / Debussy: Quartet in G minor》 | 此後三十五年他們為 Columbia 錄下 89 首作品 | 1940 年轉投 Columbia、1967 年解散，只有約 27 年；維基人物條目首段寫『from 1940 through 1967 it recorded for Columbia』，內文另有一句『Over 35 years the quartet recorded 89 individual works』，條目自己前後不一，建議改寫成『在 Columbia 期間錄下 89 首作品』並避開年數 | https://en.wikipedia.org/wiki/Budapest_String_Quartet | 是 |
| ar-b-031 | Budapest String Quartet《Mozart: Haydn Quartets》 | 1939 年美方委託他們固定使用館藏五把史特拉底瓦里 | WETA 轉述的國會圖書館資料寫他們 1938 至 1962 年在該館演出，與維基的 1939 差一年，兩源不一致，建議改成『1930 年代末』 | https://weta.org/fm/classical-score/budapest-quartet-century-music-library-congress | 否 |
| ar-b-031 | Michael Nyman《The Piano》 | 售出超過三百萬張 | 各來源數字不一致（維基、IRCAM、Wise Music 寫三百萬張以上，encyclopedia.com 寫一百五十萬張），且藝人在世，依本批規則不寫累計銷量；建議移除該句。 | https://www.encyclopedia.com/people/literature-and-arts/music-popular-and-jazz-biographies/michael-nyman | 是 |
| ar-b-032 | Trevor Pinnock《Haydn: Nelson Mass》 | 他 1973 年創立 The English Concert | 創立年兩說：維基（Pinnock 與 English Concert 條目）、Askonas Holt、AMC、Avie 寫 1972 年（維基並註明常被寫成 1973 年）；樂團官網與 bach-cantatas 寫 1973 年；建議改成『1970 年代初』或加註。 | https://en.wikipedia.org/wiki/The_English_Concert | 是 |
| ar-c-001 | Astrud Gilberto《Beach Samba》 | 全片被收進《1001 Albums You Must Hear Before You Die》書單 | 「全片」不得用來指整張專輯（writer-base 用語規則），建議改「整張專輯」或「這張專輯」；書單收錄本身本層未查證。 | https://en.wikipedia.org/wiki/Astrud_Gilberto | 是 |
| ar-c-001 | Barney Wilen《Zodiac》 | 受克蘇魯文學影響 | Jazz Journal 與再版介紹（搜尋摘要）只寫 Larivière 構想的超現實超級英雄劇本（活的地景與怪物），未提 Lovecraft／克蘇魯；本層查不到此說依據，建議店主回頭核對再版內頁或刪除。 | https://jazzjournal.co.uk/2022/07/09/barney-wilen-zodiac/ | 是 |
| ar-c-001 | Barney Wilen《Zodiac》 | 直到 2022 年才由家族提供私藏首版修復再版 | Jazz Journal 寫「restored and remastered from Barney Wilen's personal copy」（取自 Wilen 本人的那一張），未寫由家族提供，也未明言母帶佚失；建議改成「取自 Wilen 本人留下的唱片修復」。 | https://jazzjournal.co.uk/2022/07/09/barney-wilen-zodiac/ | 是 |
| ar-c-001 | Barney Wilen《Zodiac》 | 當年銷量極差、每首僅兩三分鐘、最終只停在分鏡階段 | 本層開頁的來源都沒有這三點（銷量、曲長、分鏡階段）；Jazz Journal 只說電影當時沒有拍成，建議店主自行核實或刪除。 | https://jazzjournal.co.uk/2022/07/09/barney-wilen-zodiac/ | 否 |
| ar-c-001 | Clara Nunes《Canto das Três Raças》 | 一九七一年後改信溫班達（umbanda），舞台上以白衣與頭巾示人 | 宗教歸屬各源不一致：英文維基與 Dicionário Cravo Albin 寫她皈依 Candomblé，葡文維基寫 1971 年離開 Candomblé 轉 Umbanda，Projeto Colabora 說她兼信 Kardec 派、Umbanda 與 Candomblé。建議改成較中性的寫法（她的歌與舞台形象與非裔巴西宗教相連），不指定 1971 年與單一宗教。 | https://pt.wikipedia.org/wiki/Clara_Nunes | 是 |
| ar-c-001 | Clara Nunes《Alvorecer》 | 唱片銷量讓她成為巴西當時最暢銷的女歌手，也替 Alcione、Beth Carvalho 等人打開市場 | Alcione 與 Beth Carvalho 因她而受惠一說只見英文維基；銷量約 30 萬張兩源一致。建議保留銷量、對『最暢銷』與替他人開路的因果句降級。 | https://dicionariompb.com.br/artista/clara-nunes/ | 是 |
| ar-c-001 | Clara Nunes《Alvorecer》 | Clara Nunes 的第七張 | 英文維基專輯列表在 Alvorecer 之前已有 1966、1968、1969、1971、1972、1973、1973（與 Vinicius de Moraes、Toquinho 合輯）、1974《Brasileiro Profissão Esperança》，序數取決於是否計入合輯與演出專輯，各源口徑不一；建議刪『第七張』。 | https://en.wikipedia.org/wiki/Clara_Nunes | 是 |
| ar-c-001 | Cortex《Vol. 2》 | 1977 年由法國 Disques Espérance 發行（ESP 165501） | 維基目錄寫 Vol. 2 為 Sonodisc 發行（再版 Trad Vibe），Micro-Chop 則寫兩張都在 Disques Espérance；各源不一致，建議對照原盤標籤再定廠牌。 | https://en.wikipedia.org/wiki/Cortex_(band) | 是 |
| ar-c-002 | Édith Piaf《À l'Olympia 1961》 | 那一晚（1960 年 12 月 29 日）她首度在觀眾面前唱出〈Non, je ne regrette rien〉 | 上線簡介自己引用的 INA 專文，標題為『Piaf 首度演唱 Non, je ne regrette rien』，內文摘要指首唱是 1960 年 12 月 Olympia 開演前一晚、電視節目《Cinq colonnes à la Une》上（摘要寫 12 月 1 日，日期本層未能二次確認）；維基《Piaf》條目另寫 1961 年 Olympia 場次首唱。建議把『首度在觀眾面前』改成較不具體的寫法，或本機再核對 INA 原文。 | https://www.ina.fr/ina-eclaire-actu/edith-piaf-chante-pour-la-premiere-fois-non-je-ne-regrette-rien | 否 |
| ar-c-002 | Grover Washington Jr.《Winelight》 | 由 Bill Withers 獻聲的〈Just the Two of Us〉拿下 Hot 100 亞軍與葛萊美獎 | 〈Just the Two of Us〉的葛萊美是第 24 屆（1982 年）最佳 R&B 歌曲獎，得主是詞曲作者 Bill Withers、Ralph MacDonald 與 William Salter，不是演出者；原句主詞容易被讀成 Grover 或該曲演出者得獎，建議改寫主詞。專輯本身的最佳融合爵士演奏獎得主則是 Grover Washington Jr.（寫法無誤）。 | https://en.wikipedia.org/wiki/24th_Annual_Grammy_Awards | 是 |
| ar-c-002 | Guru《Jazzmatazz Volume 1》 | 爵士嘻哈（jazz rap）的起點——不再只是取樣爵士唱片，而是真的請來爵士樂手與嘻哈音樂人現場合作 | 『起點』過頭：維基 Jazz rap 條目列出更早的 Gang Starr〈Words I Manifest〉（取樣 Dizzy Gillespie）、1990 年〈Jazz Thing〉、Stetsasonic〈Talkin' All That Jazz〉（1989）與 Native Tongues 自 1988 年起的爵士取向專輯，並把 Jazzmatazz 描述為『持續的爵士饒舌合作系列』；建議改成『把爵士樂手請進錄音室的系列起點』之類的限定寫法。 | https://en.wikipedia.org/wiki/Jazz_rap | 是 |
| ar-c-002 | Harry Roesli《Titik Api》 | 在 1973 年《Philosophy Gang》、1975 年《Ken Arok》之後推出的第三作，1976 年問世 | 與《Ken Arok》上線簡介互相矛盾：該簡介與 MusicBrainz 都說《Ken Arok》唱片是 1977 年 Eterna 出版（1975 年是萬隆首演的搖滾歌劇），若如此 1976 年的《Titik Api》就不是《Ken Arok》唱片之後的第三作；Bandung Bergerak 另把《Ken Arok》列為 1975 年作品，兩邊對不上，建議改成不排專輯先後的寫法，或查清《Ken Arok》首版年再定。 | https://musicbrainz.org/release-group/480b1428-33b7-4aaa-b8d0-b39ee65d8486 | 是 |
| ar-c-002 | Ivo Papasov & His Bulgarian Wedding Band《Orpheus Ascending》 | 一九八二年因土耳其裔身分被當局拘捕毆打，社會主義政權要求他改名為 Ivo | 維基與 WOMEX 都寫 Papasov 是羅姆人，1982 年被捕是因為出身與在土耳其裔居民間的人氣，並非本人為土耳其裔；改名則是 1980 年代（多數來源寫中期）的同化政策，不是 1982 年的同一事件。建議改寫成『羅姆家庭、1982 年因出身與在土耳其裔居民間的人氣被拘捕毆打；1980 年代被迫改名 Ivo』。 | https://en.wikipedia.org/wiki/Ivo_Papazov | 是 |
| ar-c-002 | Janko Nilovic《Soul Impressions》 | 替專做配樂授權的廠牌一口氣做了十張唱片 | Bandcamp Daily 寫 over 10 albums，It's Psychedelic Baby 訪談中他說為 MP 2000 作了約 60 張；『十張』疑為低估，兩源不一致，建議改成不寫確切張數或標明說法不一。 | https://www.psychedelicbabymag.com/2013/02/janko-nilovic-interview.html | 否 |
| ar-c-003 | Leo Parker《Let Me Tell You 'Bout It》 | John Burks 的小號與 Bill Swindell 的次中音在前六首加進來 | 維基專輯條目摘要寫七首主要曲目的六重奏都有管樂，與簡介『前六首』可能不符；本層讀到的是網頁摘要，可能不精確，請主線對照維基原文與 Discogs 曲目後再決定是否改。人員名單、1961 年 9 月 9 日 Van Gelder 錄音、前一次錄音為 1957 年均與簡介一致。 | https://en.wikipedia.org/wiki/Let_Me_Tell_You_%27Bout_It | 是 |
| ar-c-003 | Louis Smith《Here Comes Louis Smith》 | 〈Tribute to Brownie〉是 Duke Pearson 寫給 Clifford Brown 的 | 本層未能開頁驗證曲目作曲者（AllMusic 403）；建議對 Blue Note BLP 1584 內頁或 Discogs 覆核。非確認有誤，只是未見兩源支持。 | https://en.wikipedia.org/wiki/Here_Comes_Louis_Smith | 是 |
| ar-c-003 | Mina《Mina® (1974)》 | 義大利第一位自己開唱片公司的歌手 | 本層查到 PDU 是 Mina 與父親 Giacomo Mazzini 於 1967 年在 Lugano 創立（義大利文維基、搜尋摘要一致），但沒有任何來源把這件事寫成『義大利第一位自己開唱片公司的歌手』，『第一位』宣稱無出處，建議退成『與父親創立 PDU』 | https://it.wikipedia.org/wiki/Mina_(cantante) | 是 |
| ar-c-004 | Rabih Abou-Khalil《Blue Camel》 | 在貝魯特隨 Georges Farah 學 oud | 英文維基支持 Georges Farah，但 Jazz in the Park 的簡介寫的是 Wadih El Safi，兩說並存；建議店主改成不點名老師，或另查官方傳記確認。 | https://jazzinthepark.ro/en/rabih-abou-khalil-a-unique-map-of-the-music/ | 是 |
| ar-c-004 | Serge Chaloff《Boston Blow-Up!》 | 1955 年 4 月在紐約為 Capitol 錄下 | boppinbob 亦寫 1955 年 4 月錄《Boston Blow-Up!》、Stan Kenton 製作、Capitol；未見錄音地點的第二源，「在紐約」維持未驗證，建議店主複核。 | https://fromthevaults-boppinbob.blogspot.com/2022/11/serge-chaloff-born-24-november-1923.html | 是 |
| ar-c-005 | Анатолий Вапиров《Мистерия》 | 他 1982 至 1983 年以「黑市投機」的罪名入獄。 | 俄文維基只寫『видимо（看來）за спекуляцию』，罪名並不確定；另有搜尋摘要稱 1982 年 8 月被判兩年、『私營企業』罪，提前獲釋。建議改成「1982 年入獄、次年獲釋」，不寫確切罪名。 | https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%BF%D0%B8%D1%80%D0%BE%D0%B2%2C_%D0%90%D0%BD%D0%B0%D1%82%D0%BE%D0%BB%D0%B8%D0%B9_%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%B2%D0%B8%D1%87 | 是 |
| ar-c-005 | Оркестр Олега Лундстрема《Оркестр Олега Лундстрема》 | 一支 1935 年在哈爾濱成立的大樂團 | 成軍年來源不一致：英文維基與 worldofjazz 寫 1935，樂團官方介紹頁寫 1934（2024 年慶祝 90 週年）。建議改成「1930 年代中期」或查證官方說法。 | https://ruskeala-symphony.com/en/page/lundstrem | 是 |
| ar-c-005 | 봄여름가을겨울《항상 기뻐하는 사람들》 | 整張以春夏秋冬四首曲名構成、CD 版十一軌 | 卡池的《봄여름가을겨울》（1988）與《항상 기뻐하는 사람들》（1988）疑為同一張專輯：Bugs 的專輯頁《봄여름가을겨울》1988-06-15 發行、1989-03 CD 版、11 軌，曲序與《항상 기뻐하는 사람들》簡介所列完全相同（第 1 軌〈항상 기뻐하는 사람들〉標春、第 4 軌〈거리의 악사〉標夏、第 6 軌〈사람들은 모두 변하나봐〉標秋、第 10 軌〈12월 31일〉標冬）。建議店主查是否重複上架。 | https://music.bugs.co.kr/album/3976 | 否 |
| ar-c-005 | ジョージ大塚トリオ《Page 1》 | 三重奏是他 1966 年組起的第一支樂團 | 日文維基寫 1966 年組成；arban 訃報寫 1965 年起以ジョージ大塚トリオ走紅，年份來源不一致。建議改成『1960 年代中期』。 | https://www.arban-mag.com/article/52595 | 是 |
| ar-c-005 | 張露《繁星點點 張露／百代中國時代曲名典13：張露 給我一個吻》 | 1975 年退出歌壇（離 1973 年這張不到兩年） | zh／en 維基支持 1975 年；但 TVBS 與新浪的訃聞都寫她 1957 年婚後息影。兩說衝突、未能裁定（1973 年確有專輯，傾向 1975 年說法），請店主視需要把「退出歌壇」寫成「淡出」或保留 1975 說並知悉分歧。 | https://ent.sina.cn/music/ygangtai/2009-02-02/detail-icczmvun3359630.d.html | 對不到卡 |
| ar-c-005 | 渋谷毅《ドリーム》 | 高中時聽到 Erroll Garner 才轉向爵士 | ja 維基寫 Erroll Garner，但 oil-magazine 的本人訪談說是同學帶來 George Shearing 的唱片讓他大受衝擊；兩說不一，建議改成『高中時接觸爵士』或明寫出處。 | https://oil-magazine.claska.com/tokyoandme/97928/ | 是 |
| ar-c-006 | Jazmine Sullivan《Heaux Tales》 | 〈Pick Up Your Feelings〉拿下第 64 屆葛萊美最佳 R&B 演唱 | 該獎項是與 Silk Sonic〈Leave the Door Open〉並列得獎（The FADER 報導）；原句未寫並列，不算錯但建議補上。 | https://www.thefader.com/2022/04/03/jazmine-sullivan-wins-best-rb-album-for-heaux-tales-at-the-2022-grammys | 否 |
| ar-c-006 | L.T.D.《Togetherness》 | 專輯拿下 R&B 榜第 3、Billboard 200 第 18 | theseconddisc.com（The Second Disc 2018）摘要寫 Something to Love 與 Togetherness 皆為 R&B 專輯榜第 1；與簡介的第 3 名不一致。僅此單源、頁面為小模型摘要，可能誤讀，建議本機查 Billboard 專輯榜確認再決定要不要改。 | https://theseconddisc.com/2018/05/25/back-in-love-again-robinsongs-collects-four-albums-from-soul-funk-disco-band-l-t-d/ | 是 |
| ar-c-006 | L.T.D.《Togetherness》 | 洛杉磯的九人編制放克／靈魂樂團 | theseconddisc.com 稱 L.T.D. 是 ten-piece band（十人編制）；簡介寫九人。編制隨年代增減，單源，建議本機核對 Togetherness 時期的實際人數。 | https://theseconddisc.com/2018/05/25/back-in-love-again-robinsongs-collects-four-albums-from-soul-funk-disco-band-l-t-d/ | 是 |
| ar-c-006 | Maceo & All the King's Men《Funky Music Machine》 | 1975 年才正式發行（樂隊活動末期完成） | 維基 Maceo Parker 條目寫 Funky Music Machine 為 1972 年專輯；搜尋摘要稱 1971 年底錄製、1972 年由 Excello 發行（未開頁）。1975 年可能是再版年，建議本機核對 MusicBrainz／Discogs 的首發年與廠牌後改簡介與卡池年份。 | https://en.wikipedia.org/wiki/Maceo_Parker | 否 |
| ar-c-006 | Marvin Gaye & Tammi Terrell《You're All I Need》 | 這批 1966–67 年錄音 | 維基 Tammi Terrell 條目寫兩人二重唱是 1967 年初才開始錄製，上線簡介的「1966–67 年」起點疑偏早；單源，建議本機核對後再決定是否改成 1967 年。 | https://en.wikipedia.org/wiki/Tammi_Terrell | 是 |
| ar-c-007 | Phyllis Hyman《Somewhere in My Lifetime》 | 「轉投 Arista 的首張專輯，1979 年 1 月發行」 | 英文維基藝人條目寫該專輯於 1978 年發行（Arista 首張，標題曲由 Barry Manilow 製作）；本層未取得專輯條目或第二源，無法判定哪邊對，待店主核對發行日 | https://en.wikipedia.org/wiki/Phyllis_Hyman | 否 |
| ar-c-007 | The Angelic Gospel Singers《Songs From The Heart》 | 1949 年的〈Touch Me, Lord Jesus〉售出超過一百萬張 | 維基寫 sold over a million，Hymnology Archive 寫首次錄音 sold over 100,000 copies，兩源差十倍；建議改為「在節奏藍調電台走紅」或查到更可靠的銷量來源後再寫。 | https://www.hymnologyarchive.com/margaret-wells-allison | 是 |
| ar-c-007 | The Angelic Gospel Singers《Songs From The Heart》 | 1947 年簽進費城的 Gotham | 維基寫 1947 年簽約 Gotham，Hymnology Archive 寫 1949 年 Gotham 依 Allison 編排的 Lucie Campbell 作品簽下她們；年份來源不一致，建議改寫「1940 年代後期」。 | https://www.hymnologyarchive.com/margaret-wells-allison | 是 |
| ar-c-007 | The Fatback Band《Raising Hell》 | 鼓手 Bill Curtis 一九七〇年在紐約組成 Fatback Band | 維基資料庫寫 formed 1970，北卡羅來納音樂名人堂 Bill Curtis 頁寫 1971 年在紐約組成；來源不一致，建議改寫「一九七〇年代初」。 | https://northcarolinamusichalloffame.org/inductee-item/bill-fatback-curtis/ | 是 |
| ar-c-007 | The Salsoul Orchestra《Salsoul Orchestra》 | 薩克斯風只保留上低音一支 | The Second Disc 的樂評稱 Salsoul 的薩克斯風編制是兩支（對照 MFSB 的五支），與上線簡介「一支」不一致；該評文字有銅管並用的說法，待核 | https://theseconddisc.com/2016/02/01/heat-it-up-groove-line-tells-the-salsoul-orchestra-story-40th-anniversary-collection/ | 是 |
| ar-c-007 | The Soul Stirrers《Shine on Me》 | 1930 年代初 R. H. Harris 成為音樂主導者 | 德州州立歷史協會 Handbook of Texas 說 Harris 約在 1930 年代中期加入、約 1937 年起推出 swing lead；與「1930 年代初」有落差，待核 | https://www.tshaonline.org/handbook/entries/harris-rebert-h | 是 |
| ar-c-007 | The Soul Stirrers《Shine on Me》 | 1950 年底他因不滿業界作風離團 | Handbook of Texas 的 Harris 條目寫他離團的原因是長年巡演的疲累（reportedly），與簡介的離團理由不一致，待核 | https://www.tshaonline.org/handbook/entries/harris-rebert-h | 是 |
| ar-c-007 | Big Walter Horton《The Soul of Blues Harmonica》 | Walter Horton（1921–1981） | 出生年有 1917（wikidata）、1918（密西西比藍調步道標誌牌）、1921（維基與 Earwig）三說，簡介取 1921 屬其中一說，建議拿掉出生年或改寫成生年有爭議。 | https://msbluestrail.org/blues-trail-markers/big-walter-horton | 是 |
| ar-c-007 | Blind Lemon Jefferson《King of the Country Blues》 | 是唱片工業裡第一位大量賣座的男聲鄉村藍調歌手 | TSHA 的說法是「第一位獲得全國聽眾的藍調自彈自唱歌手」，並明講他不是第一個錄音的人；「第一」類宣稱建議改成 TSHA 的限定說法或改成「最早的暢銷藍調歌手之一」。 | https://www.tshaonline.org/handbook/entries/jefferson-blind-lemon | 是 |
| ar-c-008 | Hound Dog Taylor and the HouseRockers《Natural Boogie》 | 1917 年生於密西西比 Natchez | 出生年有爭議：英文維基寫 1917 但註明有來源說 1915 或 1916，Alligator 官網與 Wikidata 為 1915；建議改寫「1917 年（一說 1915 年）」或略去年份 | https://en.wikipedia.org/wiki/Hound_Dog_Taylor | 是 |
| ar-c-008 | Jimmy Dawkins《All for Business》 | 錄音 1971 年，要到 1973 年才由 Delmark 發行 | 英文維基寫 1971 年 Delmark 發行第二張專輯，American Blues Scene 也寫 All For Business (1971)；與上線簡介的 1973 不一致。請在本機對 Delmark 目錄或 Discogs 原盤欄位核對後定稿（本層未能開 Discogs 驗證） | https://en.wikipedia.org/wiki/Jimmy_Dawkins | 否 |
| ar-c-008 | Lazy Lester《All Over You》 | 簡介引 Excello 時期，歌名「Hello Mary Lee�)」 | 上線簡介曲名「Hello Mary Lee�)」帶亂碼字元（應為 Hello Mary Lee），請在 KV 檢查修正 | https://www.alligator.com/artists/Lazy-Lester/ | 否 |
| ar-c-008 | Ma Rainey《Mother of the Blues》 | 五年間錄下九十餘個曲目 | 英文維基與 Georgia Encyclopedia 都寫五年間錄了一百多首（more than 100 recordings），womenshistory.org 寫近百首；若「九十餘個曲目」指不同曲名數則無誤，請本機核對後決定是否改成「百餘首錄音」 | https://www.georgiaencyclopedia.org/articles/arts-culture/gertrude-ma-rainey-1886-1939/ | 是 |
| ar-c-008 | Michael Burks《Iron Man》 | 他生前五度入圍 Blues Music Award | Alligator 官方介紹稱入圍 4 次（含 2012 年最佳吉他手），維基稱 5 次，兩源不一致，建議改成不寫次數或改寫「多次入圍」 | https://www.alligator.com/artists/Michael-Burks/ | 是 |
| ar-c-008 | Shemekia Copeland《Turn the Heat Up》 | 她約十歲就在 Cotton Club 首度公開演唱 | 維基稱約 10 歲，Alligator 官方介紹與多篇報導稱 8 歲，兩源不一致；建議改成不寫年紀（『很小就在 Cotton Club 登台』） | https://www.alligator.com/artists/Shemekia-Copeland/ | 是 |
| ar-c-008 | Susan Tedeschi《Just Won't Burn》 | 《Just Won't Burn》是她的『第二張個人作品』 | 維基稱 1995 年的《Better Days》是 Susan Tedeschi Band 名義發行，《Just Won't Burn》是首張以她個人名義發行的專輯；建議改成『她 1998 年的全國性出道作』或不寫序數 | https://en.wikipedia.org/wiki/Susan_Tedeschi | 否 |
| ar-c-008 | Tampa Red《The Guitar Wizard》 | 與 Georgia Tom Dorsey 1928 年賣破百萬的 hokum 名曲〈(Honey) It's Tight Like That〉 | 維基稱賣了一百萬張，Encyclopedia.com 稱近百萬張，『破百萬』偏強；建議改成『據稱約百萬張』 | https://www.encyclopedia.com/people/literature-and-arts/music-popular-and-jazz-biographies/tampa-red | 是 |
| ar-c-008 | Area《Crac!》 | Stratos 1979 年因白血病去世 | 英文維基 Area (Italian band) 條目寫 Stratos 1979 年 6 月、34 歲因 aplastic anemia（再生不良性貧血）併發症過世，並非白血病；另依共同特注，死因不宜寫進介紹，簡介可改成只寫『1979 年過世』。 | https://en.wikipedia.org/wiki/Area_(Italian_band) | 是 |
| ar-c-009 | Big Brother & The Holding Company《Big Brother & The Holding Company》 | 1966 年 12 月錄於洛杉磯（簡介寫法） | LoC 專文寫 Joplin 加入『數週後』樂團就趕進錄音室錄首張（Mainstream）；搜尋摘要又稱錄音在 1966 年 12 月進行。時序有出入但兩邊都有可能（可能分芝加哥與洛杉磯兩段場次），未能證實簡介錯誤，僅列請店主核對；本層不判定為錯。 | https://www.loc.gov/static/programs/national-recording-preservation-board/documents/BigBrotherAndTheHoldingCompany.pdf | 否 |
| ar-c-009 | Budka Suflera《Cień wielkiej góry》 | 樂隊 1969 年在 Lublin 成立 | 來源對成軍年份不一致：pl 維基與 ebilet 寫 1974 年，bibliotekapiosenki 寫 1973 年，en 維基首段兩種年份並陳（1969 是 Cugowski 早期同名前身團，1974 才是現行樂團成立）；建議改成不帶年份或寫「1970 年代前半」。 | https://pl.wikipedia.org/wiki/Budka_Suflera | 是 |
| ar-c-010 | Dara Puspita《Jang Pertama》 | 1968 到 1971 年她們在西歐巡演三年 | 行程包含匈牙利（英文維基列出 West Germany、Hungary、England、France、Belgium、Netherlands、Spain）與土耳其、伊朗（Garage Hangover），不只西歐；起訖年份各源不一（1968 年 7 月出國，印尼文維基寫巡演到 1969 年 10 月，Groovie 寫 1969 至 1971 駐歐）。建議改為「1968 年起赴歐洲巡演，約三年後返國」。 | https://en.wikipedia.org/wiki/Dara_Puspita | 是 |
| ar-c-010 | DEATH SIDE《Wasted Dream》 | 1989 年由 Selfish Records 發行，編號 BEL-12036，是 DEATH SIDE 目錄上最早的一張。 | 樂團的首張 EP《Satisfy the Instinct》1987 年已由 Selfish 發行（Maximum Rocknroll 稱其為該風格的奠基發行），比《Wasted Dream》早兩年；若簡介指「首張全長專輯」需另行查證，寫成「目錄上最早的一張」與 1987 年 EP 衝突。 | https://www.maximumrocknroll.com/band/death-side/ | 是 |
| ar-c-011 | Herbert Grönemeyer《Mensch》 | 期間他的兄長與其妻在幾天之內相繼過世 | 英文維基《Herbert Grönemeyer》條寫「his brother Wilhelm and his wife Anna」，Anna 是演員 Anna Henkel，即 Grönemeyer 自己的妻子（同條稍早寫他在片場認識「his later wife, the actress Anna Henkel」）；德文《Mensch (Album)》條也寫 Wilhelm 與妻子 Anna Henkel。上線簡介的「兄長與其妻」讀成兄長的妻子，疑為誤讀，應改為「他的哥哥與妻子」。兩源同屬維基家族，我只開了英文與德文維基，建議店主在本機覆核一個非維基來源。 | https://en.wikipedia.org/wiki/Herbert_Gr%C3%B6nemeyer | 是 |
| ar-c-011 | Hum《Downward Is Heavenward》 | Pitchfork 1999 年的九〇年代百大把它排在第 81 | 屬實（英文維基《Downward Is Heavenward》條：Pitchfork 1999 年 Top 100 Albums of the 1990s 第 81），但這是樂評媒體榜單名次，依本批特注不收；另 Ned Raggett 的評語是單一樂評人的形容。是否保留請店主裁示。 | https://en.wikipedia.org/wiki/Downward_Is_Heavenward | 是 |
| ar-c-011 | Idoli《VIS Idoli》 | 這張賣了約 200000 張，是樂團銷量最高的一張 | 搜尋摘要（維基《Čokolada》專輯頁）稱 1983 年《Čokolada》『被視為南斯拉夫賣得最好的唱片之一』；若屬實，『VIS Idoli 是樂團銷量最高的一張』可能過頭。本層沒實讀該頁數字，只提醒店主在本機核對兩張的銷量出處，不確定就改成不比較。 | https://en.wikipedia.org/wiki/%C4%8Cokolada_(album) | 是 |
| ar-c-011 | Jeff Buckley《Sketches for My Sweetheart the Drunk》 | 1997 年 5 月 29 日傍晚在密西西比河游泳時溺斃 | 英文維基寫的是 Wolf River，為密西西比河的支流；『在密西西比河』不精確，建議改為支流名稱或乾脆只寫年份 | https://en.wikipedia.org/wiki/Jeff_Buckley | 是 |
| ar-c-011 | Khun Narin《Khun Narin's Electric Phin Band》 | 看到當地樂手上傳的演出影片後找上 Innovative Leisure，由廠牌出資飛往泰國 | 兩源（Newsweek、Bandcamp）都寫影片是在 Dangerous Minds 部落格流傳，Newsweek 並說樂隊本身網路曝光極少；『當地樂手上傳』與『由廠牌出資』查無來源，建議改成『網路上流傳的演出影片』 | https://www.newsweek.com/khun-narin-phin-sing-psychedelic-rock-band-discovered-remote-village-thailand-266649 | 是 |
| ar-c-011 | Killswitch Engage《Alive or Just Breathing》 | 2001 年 11 月到 2002 年 2 月在麻州 Westfield 的 Zing Studios 錄音 | Loudwire 週年報導寫錄音期間是 2001 年 10 月到 2002 年 2 月；僅單源，建議店主對照維基專輯條目與專輯內頁後再決定是否改成「2001 年底到 2002 年 2 月」 | https://loudwire.com/killswitch-engage-alive-or-just-breathing-anniversary/ | 是 |
| ar-c-011 | La Düsseldorf《La Düsseldorf》 | David Bowie 稱這個團是八〇年代的原聲帶 | 只有英文維基首段（與依它轉述的頁面）有這句；本層另開的 Electricity Club、Tiny Mix Tapes、維基 Klaus Dinger 頁都沒有，湊不到第二源。建議店主改寫成「被 Bowie 與 Eno 視為影響來源」或確認原始出處（維基該句的引用） | https://en.wikipedia.org/wiki/La_D%C3%BCsseldorf | 是 |
| ar-c-011 | La Düsseldorf《La Düsseldorf》 | 他們後來用這張唱片的收益買下了自己的錄音室 | 本層讀到的來源（維基、Electricity Club、Tiny Mix Tapes）皆未提到，無法證實；建議店主確認原出處或刪除 | https://en.wikipedia.org/wiki/La_D%C3%BCsseldorf_(album) | 是 |
| ar-c-012 | Lady Pank《Lady Pank》 | 這張黑膠也賣到百萬張、獲金唱片 | 團仍在活動；本批特注規定在世者／仍在活動團體的累計銷量不收，建議上線簡介日後改寫時拿掉銷量句。 | https://pl.wikipedia.org/wiki/Lady_Pank_(album) | 是 |
| ar-c-012 | Linda Ronstadt《Simple Dreams》 | 一年內在美銷出逾三百五十萬張 | 事實本身與英文維基一致（不到一年在美國賣出逾 350 萬張），但依本批特注在世者累計銷量不收，建議日後改寫時拿掉。其餘（擠下已蟬聯 29 週的《Rumours》、自佔五週、兩首單曲同時進前五且為繼披頭四後首組、首位女歌手）經英文維基核對無誤。 | https://en.wikipedia.org/wiki/Simple_Dreams | 是 |
| ar-c-012 | Litfiba《El diablo》 | 〈Il volo〉悼念樂團的鼓手，他因海洛因過量過世 | 依本批特注，成員死亡只收年份與公開層級、不收死因；建議日後改寫時拿掉死因。 | https://it.wikipedia.org/wiki/El_diablo_(album_Litfiba) | 是 |
| ar-c-012 | Litfiba《El diablo》 | 約一年半內賣出四十萬張 | 團仍在活動；依本批特注在世者累計銷量不收，建議日後改寫時拿掉。 | https://it.wikipedia.org/wiki/El_diablo_(album_Litfiba) | 是 |
| ar-c-012 | Mr.Children《Atomic Heart》 | 並獲第 36 屆日本唱片大賞最佳專輯獎 | 日本作曲家協會的第 36 回頁面，Atomic Heart 列在『ベストアルバム賞』，『最優秀アルバム賞』是桑田佳祐《孤独の太陽》；『最佳專輯獎』易被讀成最優秀專輯獎，建議改寫為『ベストアルバム賞（優秀作品獎之一）』。 | https://www.jacompa.or.jp/record/36.php | 是 |
| ar-c-013 | Negasphere《Disadvantage》 | 鍵盤的基本軌由川崎馨在東京方南町的 Green Studio 錄下 | 日文維基與 Disk Union 的樂團頁把鍵盤手寫成「川崎薫」，上線簡介寫「川崎馨」。Discogs 製作名單可能用不同寫法，待店主對照原盤內頁確認。 | https://ja.wikipedia.org/wiki/Negasphere | 否 |
| ar-c-013 | Perfect《Perfect》 | 首張只在波蘭境內發行，估計賣了超過一百萬張 | Polskie Radio 店頁稱首版約數十萬張；pl 維基估計超過一百萬張，兩源衝突；Perfect 仍在活動，銷量與認證類內容依規則本就不該寫（含 2013 年白金認證）。建議改掉銷量句。 | https://sklep.polskieradio.pl/pl/p/Perfect-Perfect-reedycja-winyl/1399 | 是 |
| ar-c-013 | Radar《Trofee》 | 1985 這一年正好是三位團員在團區間的結束年，也是另外三位的起始年 | 這句的依據是 MusicBrainz 一家的成員起訖年；愛沙尼亞維基與 Jazzkaar 的年份與 MusicBrainz 有一年的落差（例：樂團存續 MB 為 1978 至 1988、愛沙尼亞維基為 1977 至 1987；首席吉他 Riho Lilje MB 1978 至 1982、愛沙尼亞維基 1977 至 1981），只有 Nevil Blumberg 1981 至 1985 兩邊一致。這種「剛好三進三出」的年份巧合建立在單一來源上，建議降級成較保守的寫法或刪句。 | https://et.wikipedia.org/wiki/Radar_(ansambel) | 是 |
| ar-c-013 | Radar《Baltic Coast》 | 到這一年（1987），1978 年那批原始成員只剩一位還在區間內 | 「1978 年那批原始成員」同樣建立在 MusicBrainz 的起始年上；愛沙尼亞維基把起點寫 1977 年，且團在 1987 年解散，Sergei Pedersen 與 Paap Kõlar 到 1987 兩源都在團。Pedersen 是原始成員這點成立，但「只剩一位」的說法取決於把 1978 還是 1977 當起點，可信度低於單源年份的寫法，建議改成「創團鍵盤手 Pedersen 還在團裡」這類可驗證的說法。 | https://et.wikipedia.org/wiki/Radar_(ansambel) | 否 |
| ar-c-013 | Rare Earth《Ecology》 | Motown 為進軍白人搖滾市場設立新廠牌時還沒想好名字，樂團開玩笑提議就叫 Rare Earth——公司真的採用了 | 本層開頁的底特律歷史協會、Motown 博物館、Louder、Michigan Rock and Roll Legends 皆只說廠牌「以團名命名／為紀念這支樂團而設」，團名早於廠牌（1968 年已改名），沒有一源提到「還沒想好名字」與「開玩笑提議」；這段軼事無法兩源驗證，建議刪或改成「廠牌以團名命名」。 | https://www.detroithistorical.org/learn/online-research/encyclopedia-of-detroit/rare-earth | 是 |
| ar-c-014 | Socrates Drank the Conium《Phos》 | 希臘文維基記它賣出超過二十萬張 | 各源數字不一：希臘文維基 20 萬以上，rocktime.gr 寫超過 30 萬，rockmachine 只說 70 年代希臘搖滾銷量最冠；原句已標明『希臘文維基記』，屬轉述無誤，但建議店主考慮改成『被稱為 1970 年代希臘搖滾銷量最高的一張』以免數字爭議。 | https://rocktime.gr/articles/socrates-drank-the-conium-o-ellenikos-rok-muthos-pou-xetrellane-to-sumpan | 是 |
| ar-c-014 | Stray Cats《Built for Speed》 | 十二首取自英國時期的《Stray Cats》與《Gonna Ball》，再加一首未發表的同名曲 | 英文維基《Built for Speed》條目寫：六首取自《Stray Cats》（1981 年 2 月）、五首取自《Gonna Ball》（1981 年 11 月），再加同名曲，共 11 加 1 等於 12 首；簡介『十二首取自…再加一首』會變成 13 首，疑似算錯。建議本機核對實際曲目表，再改成『十一首取自…再加一首同名曲』或『共十二首』。 | https://en.wikipedia.org/wiki/Built_for_Speed_(Stray_Cats_album) | 是 |
| ar-c-014 | Taj Mahal Travellers《August 1974》 | 一台廂型車從歐洲經中近東開到泰姬瑪哈陵，十一個月，沿路演奏 | Wire 小杉武久文章只說 1972 年 4 月在鹿特丹買福斯巴士、約一個月行經阿爾卑斯前往印度阿格拉；「十一個月」未在任何已開頁來源找到。建議店主核對原文或改成不寫長度（待核，非確定錯誤）。 | https://www.thewire.co.uk/in-writing/essays/p=14225 | 是 |
| ar-c-014 | The Ethiopians《Engine 54》 | 簡介寫「Leonard Dillon、Stephen Taylor 與 Aston Morrison 的三部和聲」 | 兩個獨立來源都寫成員名為 Aston Morris（非 Morrison）；建議以 Doctor Bird 原盤 credit 再核對後改為 Morris。 | https://bendbulletin.com/2011/10/03/reggae-pioneer-leonard-dillon-dies/ | 否 |
| ar-c-015 | The Sensational Nightingales《The Best of the Sensational Nightingales》 | John Fogerty 寫〈Proud Mary〉時想召喚的男聲和聲，正是這一支。 | 英文維基原文是 Fogerty 想召喚的是男聲福音和聲，『以 Swan Silvertones、Sensational Nightingales、Five Blind Boys of Mississippi 這類團體為代表』，Nightingales 只是被舉例的幾支之一，不是『正是這一支』。建議改成『Fogerty 想召喚的那種男聲福音和聲，Nightingales 是代表之一』。 | https://en.wikipedia.org/wiki/Sensational_Nightingales | 是 |
| ar-c-015 | The Sensational Nightingales《The Best of the Sensational Nightingales》 | 四重唱 1942 年由 Dixie Hummingbirds 出身的 Barney Parks 組成，1946 年 Julius「June」Cheeks 加入。 | 英文維基與 Journal of Gospel Music 作 1942 年 Parks 創團，但 Malaco 官方傳記寫前身為費城 Lamplighters、1949 年改名 Nightingale Quartet、Cheeks 1950 年才加入，來源不一致，Cheeks 加入年建議改為『四〇年代後期』或不寫年份。 | https://malaco.com/artist/gospel/the-sensational-nightingales/ | 否 |
| ar-c-015 | The Weather Station《Ignorance》 | 《紐約時報》Lindsay Zoladz 稱其為刺人的新作 | 簡介點出樂評姓名與媒體，違反『來源平台與樂評姓名不進正文』規則，建議改為不具名或刪除 | https://www.climateone.org/people/tamara-lindeman | 是 |
| ar-c-015 | Tim Hardin《Tim Hardin 2》 | 全片僅 22 分 38 秒 | 『全片』不得用來指整張專輯（writer-base 文字節）；建議改為『整張專輯』或直接寫『22 分 38 秒』 | https://en.wikipedia.org/wiki/Tim_Hardin | 是 |
| ar-c-015 | Tim Hardin《Tim Hardin 2》 | AllMusic 的 Richie Unterberger 認為它大概是 Hardin 最好的單張 | 點名來源平台與樂評姓名，違反『來源平台與樂評姓名不進正文』規則（writer-base）；建議改成不具名或刪除 | https://en.wikipedia.org/wiki/Tim_Hardin | 是 |
| ar-c-015 | Ton Steine Scherben《Warum geht es mir so dreckig?》 | 上線簡介寫「A 面四首、B 面五首」 | 英文維基專輯條目寫 Side 1 五首、Side 2 四首（並說 A 面是 1971 年 6 月 Mariannenplatz 活動的實況、B 面是錄音室精選）；與上線簡介的軌數分配相反。條目為單源、原盤實際分面待店主核對；其餘 1971 年 6 月 Mariannenplatz 活動與自發佔屋的說法與維基一致。 | https://en.wikipedia.org/wiki/Warum_geht_es_mir_so_dreckig%3F | 否 |
| ar-c-016 | 五條人《縣城記》 | 屬民謠大類，中國大陸多歸為「方言民謠」 | 店主用語規則（2026-09-29）：稱呼中國一律寫「中國」，不寫「中國大陸」；此句改成「在中國多歸為方言民謠」。 | https://zh.wikipedia.org/zh-tw/%E4%BA%94%E6%9D%A1%E4%BA%BA | 是 |
| ar-c-016 | 五條人《夢幻麗莎髮廊》 | 屬民謠大類，中國大陸多歸為「方言民謠」 | 同上，用語規則：不寫「中國大陸」。 | https://zh.wikipedia.org/zh-tw/%E4%BA%94%E6%9D%A1%E4%BA%BA | 是 |
| ar-c-016 | 唐朝樂隊《演義》 | 創隊貝斯手在 1995 年車禍身故 | 店主特注：成員死亡只收年份，不收死因；這句帶了死因，建議改成『創隊貝斯手 1995 年過世』。 | https://zh.wikipedia.org/wiki/%E5%94%90%E6%9C%9D%E4%B9%90%E9%98%9F | 是 |
| ar-c-016 | 唐朝樂隊《演義》 | 五月十一日出事之後，同年七月由新人接任貝斯 | 日期寫成中文數字，違反『年月日一律用阿拉伯數字』；且五月十一日是死亡日期，與死因同屬案情細節，建議一併刪去，改寫為『同年 7 月由新人接任貝斯』。 | https://zh.wikipedia.org/wiki/%E5%94%90%E6%9C%9D%E4%B9%90%E9%98%9F | 是 |
| ar-c-016 | 圖騰樂團《我在那邊唱》 | 二○○五年拿下貢寮國際海洋音樂祭大賞、二○○六年四月由彎的音樂發行首張 | 年份寫成中文數字（二○○五）；規則是年月日用阿拉伯數字。事實本身與維基、ltn 相符。 | https://zh.wikipedia.org/zh-tw/%E5%9C%96%E9%A8%B0%E6%A8%82%E5%9C%98 | 否 |
| ar-c-016 | 圖騰樂團《放羊的孩子》 | 彎的音樂二○○九年九月發行、樂團二○○二年成軍 | 同樣是年份寫成中文數字（二○○九、二○○二）；二○○二年成軍與維基相符。 | https://zh.wikipedia.org/zh-tw/%E5%9C%96%E9%A8%B0%E6%A8%82%E5%9C%98 | 否 |
| ar-c-017 | 陳珊妮《完美的呻吟》 | 末曲翻唱薛岳〈你在煩惱些什麼？親愛的〉並收進詩人夏宇的口白 | 中文維基寫的曲名是〈你在煩惱什麼呢？親愛的〉，與上線簡介〈你在煩惱些什麼？親愛的〉不同；實際曲名請對照曲目表，「末曲」一說維基未提 | https://zh.wikipedia.org/wiki/%E9%99%B3%E7%8F%8A%E5%A6%AE | 是 |
| ar-c-017 | Alela Diane《The Pirate's Gospel》 | 歌寫於一趟歐洲旅行 | 英文維基如此寫，但 Raise the Stakes 專訪（藝人本人說法）指最早的歌寫於 2002 至 2003 年搬到舊金山之後、標題曲來自露營划船，兩說不一，建議改成不指明寫作地點，或對照原始專訪後再定 | https://raisethestakeseditions.com/alela-diane/ | 是 |
| ar-c-017 | Barbara《Barbara chante Barbara》 | 是第一張全部由自己寫詞寫曲的唱片 | 法文維基專輯條目寫該張除兩首與外人合作的曲目外，其餘由她自己寫（單源，建議改為『幾乎全部』或『主要由自己創作』）。 | https://fr.wikipedia.org/wiki/Barbara_chante_Barbara | 是 |
| ar-c-017 | Buffy Sainte-Marie《It's My Way!》 | 2023 年 CBC 調查認定她長年宣稱的原住民血統不實 | 把 CBC 的調查結論寫成定論；她本人回應說從未確定出生地、從未把公民身分當祕密，並已交還勳章。建議改成中性寫法：『2023 年 CBC 調查報導認為她出生於美國，2025 年她的 Order of Canada、Juno 與 Polaris 等加拿大榮譽因公民身分被撤銷或交還』。 | https://consequence.net/2025/03/buffy-sainte-maries-polaris-juno-prizes-revoked/ | 是 |
| ar-c-017 | Buffy Sainte-Marie《Illuminations》 | Sainte-Marie 與製作人 Maynard Solomon 用 Buchla 合成器處理人聲 | Musicworks 寫 Buchla 的濾波、調變與閘控是 Juilliard 教師 Michael Czajkowski 操作；維基列製作人為 Maynard Solomon 與 Mark Roth。『他們用 Buchla 處理人聲』應補上 Czajkowski 或改寫為『人聲經 Buchla 處理』（Musicworks 單源）。 | https://www.musicworks.ca/profile/buffy-sainte-marie-reflects-illuminations | 是 |
| ar-c-017 | C.O.B.《Spirit of Love》 | 1970 年 CBS 的 12 吋原盤 | klofmag 悼文與搜尋摘要（維基 Clive Palmer 條目）都把《Spirit of Love》記為 1971 年；卡池年份為 1970，建議店主核對原盤年份（Discogs）後同步卡單與簡介。 | https://klofmag.com/2014/12/tribute-to-clive-palmer/ | 是 |
| ar-c-017 | Curly Ray Cline《Why Me, Ralph?》 | Ralph Stanley 在 Cline 的葬禮上這樣說他——他拉提琴的方式，有點像我彈五弦琴的方式 | 英文維基只寫 Stanley 曾這樣評論他（remarked），並未說是在葬禮上；『葬禮』場合本層找不到出處，建議改成『Ralph Stanley 評他』或查證出處 | https://en.wikipedia.org/wiki/Curly_Ray_Cline | 是 |
| ar-c-017 | Ewa Demarczyk《Live》 | 這是她的第三張：1967 年首張之後，1975 年那張只在蘇聯發行。 | 英文維基寫 1972 年離團『兩年後』發行第二張並在蘇聯賣數百萬張（約 1974），pl 維基作品目錄寫 1975 年、只在蘇聯發行；年份與『只在蘇聯』兩源不一致，建議店主對 Melodiya 目錄確認再決定是否保留年份。 | https://en.wikipedia.org/wiki/Ewa_Demarczyk | 是 |
| ar-c-017 | Ewa Demarczyk《Ewa Demarczyk śpiewa piosenki Zygmunta Koniecznego》 | 「波蘭歌曲的黑天使」這個稱號，是一位主持人 Lucjan Kydryński 給的。 | dzieje.pl 與 encyklopediateatru 都把『Czarny Anioł』說成源自她全身黑衣的舞台形象，沒有提到由哪位主持人命名；兩種說法未必矛盾，但命名者一節本層查不到兩源，建議店主複核。 | https://dzieje.pl/kultura-i-sztuka/nie-zyje-ewa-demarczyk-czarny-aniol-polskiej-piosenki | 否 |
| ar-c-018 | Iwan Fals《Sarjana Muda》 | 收在 1981 年 9 月 3 日由 Musica Studio's 發行的這張個人出道專輯裡 | 英文維基《Sarjana Muda》只寫 1981 年發行、沒有月日；9 月 3 日同時是歌手生日與《Opini》（1982 年）的發行日，疑為誤植。建議改寫成「1981 年」。 | https://en.wikipedia.org/wiki/Sarjana_Muda | 是 |
| ar-c-018 | Jack Rose《Luck in the Valley》 | 1999 年前後才專攻原音 | NPR Illinois 說他約 30 歲（約 2001 年）賣掉電吉他專心彈原音指彈；Bandcamp Daily 說 2000 年代初苦練後才轉向獨奏。1999 年沒有來源支持，建議改成「2000 年代初前後」。 | https://www.nprillinois.org/2010-02-19/remembering-dr-ragtime-guitarist-jack-rose | 是 |
| ar-c-018 | Jan Dukes de Grey《Sorcerers》 | 1969 年 Decca 的 12 吋原盤 | 維基條目寫《Sorcerers》1969 年 10 月錄完、1970 年 1 月發行（1969 年是與 Decca 簽約與錄音年）；發行年有兩說，建議改寫成「1969 年錄音、Decca 發行」之類不點明發行年的說法。 | https://en.wikipedia.org/wiki/Jan_Dukes_de_Grey | 是 |
| ar-c-018 | Jim Sullivan《Jim Sullivan》 | 車上留著一箱他沒賣掉的唱片。那一箱正是這張 1972 年的同名專輯 | 來源對車上唱片的描述不一：Ultimate Classic Rock 寫「Playboy 發行的 LP」、LARB 寫「一箱 Playboy 唱片」，另有搜尋摘要寫「兩張專輯各一箱」；沒有來源明指「正是這張同名專輯」。建議改成「一箱唱片」或「他自己的唱片」。 | https://ultimateclassicrock.com/missing-ufo-singer-songwriter/ | 是 |
| ar-c-018 | Malicorne《Almanach》 | 銷量逾五十萬張，拿下金唱片與法國唱片學院大獎 | 來源互相矛盾：法文維基記 1977 年 11 月達雙金唱片（10 萬張），French Music 電子報寫 50 萬張；獎項部分，法文維基與搜尋摘要寫的是 Académie Charles Cros 的 Grand Prix du disque（另有摘要稱 Académie du disque français 亦有大獎），與簡介的「法國唱片學院」是否同一機構未能第二源確認。建議刪去銷量數字，獎項改查 Académie Charles Cros 官方得獎名單後再寫。 | https://fr.wikipedia.org/wiki/Malicorne_(groupe) | 是 |
| ar-c-018 | Marissa Nadler《Songs III: Bird on the Water》 | 獲二〇〇七年 PLUG 獎最佳 Americana 專輯提名 | 維基 Songs III 條目的搜尋摘要寫該專輯入圍 2008 年 PLUG Independent Music Awards 的 Best Female Artist 與 Best Americana Record 兩項；PLUG 頒獎年與簡介的 2007 年可能對不上，且入圍不只一項。僅見搜尋摘要、未開頁，待店主本機核對。 | https://en.wikipedia.org/wiki/Songs_III:_Bird_on_the_Water | 是 |
| ar-c-018 | Marlon Williams《Marlon Williams》 | 2016 年 2 月才透過 Caroline Australia 推向國際 | 英文維基人物條目寫 2015 年 9 月簽下美國獨立廠牌 Dead Oceans，2016 年 2 月 2 日由 Dead Oceans 在全球發行；簡介的廠牌寫法與此不同，本層未能用第二源判定，建議店主對照專輯條目與廠牌頁後再決定是否改。 | https://en.wikipedia.org/wiki/Marlon_Williams_(New_Zealand_musician) | 是 |
| ar-c-018 | Martin Carthy & Dave Swarbrick《But Two Came By》 | 搭檔的提琴手生於 Surrey 的 Stoneleigh | 維基寫 Stoneleigh，Exclaim! 訃聞寫 New Malden，兩源不一致，簡介若要保守可只寫 Surrey 或不寫出生地。 | https://exclaim.ca/music/article/fairport_convention_fiddler_dave_swarbrick_dies_at_75 | 否 |
| ar-c-018 | Nadia Reid《Preservation》 | 十四歲開始彈吉他 | 維基寫 14 歲，AudioCulture 與 North & South 都寫 15 歲左右；來源不一致，建議簡介改寫成「十幾歲」或不寫年紀。 | https://www.audioculture.co.nz/profile/nadia-reid | 是 |
| ar-c-018 | Nadia Reid《Preservation》 | 2015 年以群眾募資完成首作起步 | 維基與 North & South 都寫首張《Listen to Formation, Look for the Signs》2014 年發行；簡介寫 2015 年，群眾募資一事本層沒有查到來源，建議核對。 | https://northandsouth.co.nz/2025/05/06/first-in-folk/ | 是 |
| ar-c-018 | Taraf de Haïdouks《Dumbala Dumba》 | 比利時人 Stéphane Karo 與 Michel Winter 自 1980 年代末把他們帶進西歐 | Nonesuch 官方頁寫兩人 1990 年赴羅馬尼亞時發現樂團，Chicago Reader 寫樂團 1990 年代初組成；『1980 年代末』找不到來源支持，建議改為『1990 年代初』或『1990 年起』。 | https://www.nonesuch.com/artists/taraf-de-haidouks | 是 |
| ar-c-019 | Terry Allen《Lubbock (On Everything)》 | Lloyd Maines「後來製作了 Wilco」 | 英文維基 Lloyd Maines 條目只寫他參與（鋼棒吉他）Wilco 首作《A.M.》等 alt-country 錄音；製作名單裡有 Uncle Tupelo、Chicks、Richard Buckner、Robert Earl Keen 等，沒有 Wilco。『製作了 Wilco』無據，建議改成『後來製作過 Uncle Tupelo、The Chicks 等』或『參與 Wilco 首作』。 | https://en.wikipedia.org/wiki/Lloyd_Maines | 否 |
| ar-c-019 | The Jayhawks《Hollywood Town Hall》 | 1992 年 9 月由 American 發行 | 維基寫 1992 年發行時廠牌是 Def American（Rick Rubin 的廠牌，後來改名 American Recordings，約 1993 年），上線簡介寫『American』可能是用了日後的名稱；建議寫 Def American 或『American（原名 Def American）』。證據強度中，建議店主核對發行頁。 | https://en.wikipedia.org/wiki/The_Jayhawks | 是 |
| ar-c-019 | Tír na nÓg《Tír na nÓg》 | 1969 年在都柏林組成 | Irish Rock 與 journalofmusic 都寫成軍約 1969 年底或 1970 年初（journalofmusic 寫 1970 年初）；維基寫 1969 年。來源互相不一致，非明確錯誤，建議店主視情況改為『約 1969–70 年』。 | https://www.irishrock.org/irodb/bands/tirnanog.html | 是 |
| ar-c-019 | Zach Bryan《American Heartbreak》 | 首週締造 7.1 萬張專輯等效單位，是 2022 年鄉村專輯最佳首週成績 | 維基《American Heartbreak》只記首週 71,500 單位、Billboard 200 第 5、鄉村專輯榜冠軍，以及「當日 Spotify 與 Apple Music 鄉村專輯串流最高」；查不到「2022 年鄉村專輯最佳首週」的來源，建議改成只寫單位數與榜位，或補來源。 | https://en.wikipedia.org/wiki/American_Heartbreak | 是 |
| ar-c-019 | Владимир Высоцкий《Баллады и песни》 | 他生前在蘇聯只拿到過一張 12 吋長片，其餘全是 7 吋的小碟 | 1976 年 Мелодия 發行了二張 12 吋的《Алиса в Стране чудес》，歌曲全由他作詞作曲、他並演唱數個角色（俄文維基稱這是他第一次以作者身分在國家出版唱片上合法露面）。「只拿到過一張 12 吋長片」不成立；可改成「生前在蘇聯境內合法發行的 12 吋唱片極少」之類說法，或指明 1978 年這張是以他個人名義的長片。 | https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B8%D1%81%D0%B0_%D0%B2_%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B5_%D1%87%D1%83%D0%B4%D0%B5%D1%81_(%D1%80%D0%B0%D0%B4%D0%B8%D0%BE%D0%BF%D1%8C%D0%B5%D1%81%D0%B0,_1976) | 是 |
| ar-c-019 | 한대수《멀고 먼-길》 | 一九六八年帶著長髮和吉他回首爾，在세시봉唱自作曲 | 韓文維基與英文維基都記 1968 年回國、1969 年才在세시봉出道並辦남산드라마센터演出；簡介把세시봉演唱放在 1968 年，似乎提早一年。其餘（신세계레코드簽約金、錄音班底、八小時錄完）本層未查到來源，未覆核。 | https://ko.wikipedia.org/wiki/%ED%95%9C%EB%8C%80%EC%88%98_(%EA%B0%80%EC%88%98) | 是 |
| ar-c-019 | かぐや姫《かぐや姫さあど》 | 〈神田川〉最後賣出一百二十萬張以上 | 英文與日文維基首段皆寫 160 萬張；「120 萬以上」不算錯但偏保守，可考慮改成維基首段的約 160 萬張或加註各紀錄不一。 | https://en.wikipedia.org/wiki/Kaguyahime_(band) | 否 |
| ar-c-019 | 好樂團《在遊蕩的路上學會寬容》 | 成團七年才交出第一張專輯，而且是先向歌迷募到錢才錄的 | 本層讀到的 VERSE、中央社、美麗佳人、維基皆未提及募資；『先募資才錄』無法核實，建議店主回頭確認該簡介的募資出處，找不到就改寫。 | https://www.cna.com.tw/news/amov/202212110123.aspx | 是 |
| ar-c-019 | 小河《飛的高的鳥不落在跑不快的牛的背上》 | 屬民謠大類，中國大陸慣稱「實驗民謠」（experimental folk） | 違反用語房規（2026-09-29 店主裁定）：稱呼中國一律寫「中國」，不寫「中國大陸」；此句另屬自行補充的類別說明，本層所讀來源（界面新聞、澎湃、Bandcamp Daily）沒有一處稱「實驗民謠」是中國慣稱，建議整句改寫或刪除。 | https://www.jiemian.com/article/8926943.html | 是 |
| ar-c-019 | 李志《被禁忌的遊戲》 | 作品在中國大陸串流平台陸續下架；中國大陸慣稱「獨立民謠」 | 用語不符 2026-09-29 店主裁定：稱中國一律寫「中國」，不寫「中國大陸」。 | https://zh.wikipedia.org/wiki/%E6%9D%8E%E5%BF%97 | 否 |
| ar-c-019 | 遠藤賢司《満足できるかな》 | 〈カレーライス〉先在此作出現，1972 年另錄的單曲版賣出十萬張 | 待核：日文維基寫〈カレーライス〉1972 年「シングルカット」並達 10 万枚；「シングルカット」通常指從專輯曲目切成單曲，與上線簡介的「另錄的單曲版」可能不符，本位未能另開一手資料確認。 | https://ja.wikipedia.org/wiki/%E9%81%A0%E8%97%A4%E8%B3%A2%E5%8F%B8 | 是 |
| ar-c-020 | 陳建年《大地》 | 2000 年得獎，同年自願調往蘭嶼服勤 | 調往蘭嶼的年份兩源不一致：中文維基寫 2000 年 9 月，中央社（開箱老照片）寫 2001 年 2 月 20 日自願請調；「同年」不確定，建議改寫成「得獎後自願調往蘭嶼」。 | https://www.cna.com.tw/news/ahel/202502195002.aspx | 否 |
| ar-c-020 | 齊豫《橄欖樹》 | 〈橄欖樹〉因「我的故鄉在遠方」一句被當局列為禁歌 | 中央社（李泰祥逝世 10 周年）與 Yam（禁唱八年）都說，新聞局把歌裡的「流浪」解讀為流浪海外而列禁歌，齊豫自己的說法也是「流浪」，兩篇都沒提「我的故鄉在遠方」這一句；建議改成「歌中的『流浪』被解讀為流浪海外」。 | https://n.yam.com/Article/20140103027966 | 是 |
| ar-c-020 | 齊豫《橄欖樹》 | 齊豫並以〈歡顏〉拿下金馬獎最佳電影插曲 | 台大圖書館頁與金曲獎官方簡介只寫〈歡顏〉獲第 16 屆金馬獎最佳電影插曲／齊豫個人成就含電影金馬獎音樂獎項，沒說獎頒給誰；是否「齊豫拿下」本位未能查證，建議改成「〈歡顏〉獲第 16 屆金馬獎最佳電影插曲」。 | https://focus.lib.ntu.edu.tw/?q=zh-hant%2F%E5%8F%B0%E7%81%A3%E6%A0%A1%E5%9C%92%E6%B0%91%E6%AD%8C%2F%E5%A4%A9%E7%B1%9F%E4%B9%8B%E9%9F%B3-%E9%BD%8A%E8%B1%AB | 否 |
| ar-c-021 | 潘迪華《The Exciting Rebecca Pan 我的心．潘迪華》 | 第十軌〈Bengawan Solo〉錄的時候她三十三歲 | 低優先：英文維基寫她 18 歲時錄，中英維基的生年又差一年（1930／1931），年齡說法不一；專輯為 1963 年，推算約 32 或 33 歲。建議確認錄音日期，或淡化成「三十出頭」。 | https://en.wikipedia.org/wiki/Bengawan_Solo_(song) | 是 |
| ar-c-021 | 藤井風《HELP EVER HURT NEVER》 | 日本唱片協會白金 | 英文維基 Fujii Kaze 條目導言寫該專輯 certified gold in Japan，與簡介的白金不一致，需查日本唱片協會認證資料庫後再改（待核，未確認哪邊錯） | https://en.wikipedia.org/wiki/Fujii_Kaze | 是 |
| ar-c-021 | 陳百強《偏偏喜歡你》 | 陳百強自任監製的第六張粵語大碟 | 英文維基寫前五張由譚國基監製、第六張《傾訴》起陳百強自己監製並與下一張《偏偏喜歡你》達五白金，與簡介「《偏偏喜歡你》是第六張」不一致；序數待核（未確認哪邊錯） | https://en.wikipedia.org/wiki/Danny_Chan | 是 |
| ar-c-021 | 陳芬蘭《親愛的母親》 | 她 8 歲就以〈孤女的願望〉一曲成名 | 中文維基寫 8 歲、中央社寫 9 歲、風傳媒寫 11 歲，來源不一；年齡待核，建議改成不寫年齡 | https://www.cna.com.tw/news/ahel/202402205002.aspx | 是 |
| ar-c-021 | 黃鶯鶯《雪在燒》 | 一九八七年八月二十七日、黃鶯鶯生日當天由飛碟唱片推出 | 中文維基寫 8 月 29 日生日當天發行，英文維基與 wikidata 生日也是 8 月 29 日，簡介的「二十七日」可能寫錯（發行日第二源未找到，建議改成「八月、她生日當天」或核對後改 29 日） | https://zh.wikipedia.org/zh-tw/%E9%BB%83%E9%B6%AF%E9%B6%AF | 是 |
| ar-c-021 | Ana Moura《Leva-me aos fados》 | 同年她獲 Amália 獎最佳藝人 | 英文維基寫 2008 年她獲 Prémio Amália 最佳演出者（Melhor Intérprete），Museu do Fado 寫是《Para Além da Saudade》獲 Amália Rodrigues 獎；簡介把獎項放在 2009 年並寫成「最佳藝人」，年份與類別對不上（待核） | https://en.wikipedia.org/wiki/Ana_Moura | 是 |
| ar-c-022 | Chavela Vargas《La Llorona》 | 2003 年在 Pedro Almodóvar 的推動下以 83 歲之齡首度登上卡內基音樂廳 | 她 1919 年 4 月 17 日生（英文維基、wikidata），2003 年 9 月登台應為 84 歲；Mexico News Daily 也寫 83 歲，兩者互相呼應但與生年不合；『首度』與『Almodóvar 推動』我未查到獨立來源。建議改成『2003 年登上卡內基音樂廳』或另查。 | https://mexiconewsdaily.com/culture/made-in-mexico-chavela-vargas/ | 是 |
| ar-c-022 | Djivan Gasparyan《I Will Not Be Sad in This World》 | 1959 至 1980 年間四度在 UNESCO 競賽奪金 | 維基與 armradio 只寫在 UNESCO 世界競賽得過四面獎牌（1959、1962、1973、1980），沒有寫金牌；「奪金」查無依據，建議改「四度獲 UNESCO 獎牌」。 | https://en.wikipedia.org/wiki/Djivan_Gasparyan | 是 |
| ar-c-022 | Djivan Gasparyan《I Will Not Be Sad in This World》 | 六歲起吹 duduk | 維基與 armradio 寫六歲，Songlines 導覽寫八歲，來源不一致，建議改成較含糊的「幼年」或註明來源。 | https://www.songlines.co.uk/content/features/djivan-gasparyan-a-beginners-guide | 是 |
| ar-c-022 | Dr Alimantado《Best Dressed Chicken in Town》 | Johnny Rotten 推崇後，這張在英國龐克圈流傳開來 | Songfacts 與搜尋結果指出 Rotten 點名的是單曲〈Born for a Purpose〉，維基只寫他在訪談中稱讚 Alimantado；維基與 Songfacts 都沒有把 Rotten 的推崇和這張專輯直接連起來，建議改成「Rotten 推崇他的單曲〈Born for a Purpose〉」。 | https://www.songfacts.com/facts/the-clash/rudie-cant-fail | 是 |
| ar-c-022 | Dr Alimantado《Best Dressed Chicken in Town》 | 1978 年由 Greensleeves 集結成該廠牌的第一張專輯；十首分別錄於 Black Ark、King Tubby's 與 Channel One | 維基只寫 1978 年 Greensleeves 彙整 1970 年代中期錄音，沒有寫「該廠牌第一張專輯」，也沒有各曲的錄音室；本層未找到佐證，屬「某廠牌第一張」類宣稱，建議反查 Greensleeves 沿革或退成可查證的說法。 | https://en.wikipedia.org/wiki/Dr_Alimantado | 否 |
| ar-c-022 | E.T. Mensah & the Tempos《All for You》 | 1957 年與 Louis Armstrong 同台 | Armstrong 訪問 Accra 是 1956 年 5 月 23 至 24 日（Georgetown 圖書館展覽、Afropop 皆如此）；英文維基寫 1957 年有誤。建議改為 1956 年，並可補一句：Armstrong 抵達時，13 支樂團在機場以〈All for You〉迎接。 | https://library.georgetown.edu/exhibition/jazz-ambassador-louis-armstrong-ghana-1956 | 是 |
| ar-c-022 | Fanfare Ciocărlia《Radio Pașcani》 | CD賣過十五萬張,成為該廠牌最暢銷的一張 | 搜尋結果摘要引維基〈Radio Pașcani〉寫的是 one of the biggest-selling albums in Piranha Musik's catalogue（該廠牌最暢銷專輯之一），不是「最暢銷的一張」；Songlines 導覽則寫銷量 8 萬餘張。維基頁本層沒有實際開頁，建議本機核對後改成「該廠牌最暢銷的專輯之一」或拿掉銷量。 | https://en.wikipedia.org/wiki/Radio_Pa%C8%99cani | 是 |
| ar-c-022 | Hugh Mundell《Blackman's Foundation》 | 1983 年由 Shanachie 發行 | LegendaryReggae 寫 Shanachie 是在 Mundell 身後發行《Blackman's Foundation》（1988 年）；事實庫的 MusicBrainz release group 登記的兩個 Shanachie release 為 1988 與 2005，沒有 1983 年的版本。上線簡介的 1983 年可能把他過世的年份誤當發行年，建議改為 1988 年。 | https://legendaryreggae.com/2013/10/01/hugh-mundell/ | 是 |
| ar-c-022 | Idir《A Vava Inou Va》 | 標題曲後來被譯成七種語言 | 英文維基寫七種語言，但 La Vie éco 的訃聞寫譯成 15 種語言、77 個國家播出；來源不一致，建議改成『被翻成多種語言』。 | https://www.lavieeco.com/au-royaume/idir-linterprete-du-celebre-a-vava-inouva-nest-plus/ | 是 |
| ar-c-022 | Juaneco y su Combo《El gran cacique》 | 1970 年由祕魯 Infopesa 壓成黑膠，編號 LPS 8063 | 發行年各源不一：西班牙文維基列 1972 年、Vice 寫 1971 年、MusicBrainz 與卡池列 1970 年；本層無法判定，建議以 Discogs 的 Infopesa LPS 8063 原盤年份核對後再決定是否改簡介。 | https://www.vice.com/es/article/juaneco-y-su-combo-reconstruyendo-la-raiz/ | 是 |
| ar-c-022 | Junior Murvin《Bad Man Possee》 | 開場的同名曲 7 分 05 秒，是全片唯一超過六分鐘的一首 | 用『全片』指整張專輯，與全站用語規則（『全片』『全曲』不用來指整張專輯）衝突，建議改成『整張』。 | https://api.discogs.com/masters/300561 | 是 |
| ar-c-022 | Junior Murvin《Bad Man Possee》 | 唱針一落是人聲版接它自己的 dub，兩首併成一個索引點 | MusicBrainz 與 Discogs 的曲目表中，A1 只列〈Bad Man Possee〉一首，被併成一個索引點的是 A2〈Guitar / Guitar Dub〉、A3、B1 等；開場句與後文列舉的併軌位置不一致（但 A1 長達 7 分 05 秒，可能實際含 dub，待核對原盤），建議店主本機查實後再改。 | https://musicbrainz.org/release-group/becb70b0-6019-4e13-8687-b74ef2fb3b06 | 是 |
| ar-c-022 | Khaled《Khaled》 | 1985 年在奧蘭音樂節得首獎後被冠上「Cheb」的稱號 | Cheb 是「年輕人」之意，男性 raï 歌手慣用的稱號，Khaled 青少年時就以 Cheb Khaled 錄音；1985 年是在首屆官方 raï 音樂節被加冕為「raï 之王」，1992 年出《Khaled》時才拿掉 Cheb。原句因果顛倒。 | https://en.wikipedia.org/wiki/Khaled_(musician) | 是 |
| ar-c-022 | Lee "Scratch" Perry《Time Boom X De Devil Dead》 | 1978 年整間燒掉，他一貫堅稱是自己在盛怒中放的火 | Black Ark 燒毀年份各源不一：Perry 自述為 1979，家屬說是 1983 年重建期間的電氣意外，Relix 與 X-Press 寫 1983；1978 找不到來源。建議改成 1979 年（Perry 自述）或迴避年份。 | https://en.wikipedia.org/wiki/Black_Ark_Studios | 是 |
| ar-c-022 | Lucky Dube《Slave》 | 隔年《Think About the Children》拿下白金 | 來源互相矛盾：Encyclopedia.com 記為 1986 年南非第一張雷鬼「金」唱片，African American Registry 寫 1985 年「白金」；「隔年」也取決於以《Rastas Never Die》的發行年（1984）或禁令年（1985）起算。建議改成不帶認證等級的寫法，例如「成為他在南非打開局面的專輯」。 | https://www.encyclopedia.com/education/news-wires-white-papers-and-books/dube-lucky | 是 |
| ar-c-022 | Lucky Dube《Slave》 | 1984 年的《Rastas Never Die》遭當局查禁 | 專輯 1984 年發行，禁令在 1985 年（AAR、Encyclopedia.com）；原句語序易讀成 1984 年被禁。 | https://aaregistry.org/story/lucky-dube-a-south-african-reggae-artist/ | 是 |
| ar-c-022 | Max Romeo《Reconstruction》 | 英文維基記那次拆夥發生在《War Ina Babylon》錄完之後 | 非事實錯誤，屬行文：簡介正文直接寫出「英文維基記」，其他簡介沒有這種寫法；內容本身與維基（兩人在《War Ina Babylon》後鬧翻、Romeo 自己製作《Reconstruction》）一致，建議改成直接陳述。 | https://en.wikipedia.org/wiki/Max_Romeo | 是 |
| ar-c-023 | Nass El Ghiwane《Nass El Ghiwane》 | 他們從前衛政治劇團走出來，第一件事是把班鳩琴帶進 chaabi | Aramco World 的班鳩琴專文指出，班鳩琴 1960 年代已出現在阿馬齊格民間表演與馬拉喀什 Jemaa el-Fnaa 廣場；Nass El Ghiwane 的貢獻是把它變成招牌聲響、帶進主流流行文化，不是最早。「把班鳩琴帶進 chaabi」可改寫為「讓班鳩琴成為樂團的招牌聲響」。英文維基「第一支引進班鳩琴等西方樂器」的說法有反例。 | https://www.aramcoworld.com/articles/2026/ja26/banjo-on-the-atlas | 否 |
| ar-c-023 | Nass El Ghiwane《Nass El Ghiwane》 | 樂團 1969 年成立於卡薩布蘭卡 | 1969 年只見英文維基；維基資料庫作 1970，法文維基與 Aramco World 作 1970 年代初。建議改「約 1970 年前後」或不寫年。 | https://www.aramcoworld.com/articles/2024/nass-el-ghiwane-the-voice-of-morocco | 是 |
| ar-c-023 | Natacha Atlas《Gedida》 | 1999 年由 Mantra Records 發行，Natacha Atlas 第三張個人專輯 | 英文維基藝人條目把《Gedida》列為 1998 年；卡單與簡介作 1999 年。發行年（各地區版本可能不同）待核，未開專輯頁確認。 | https://en.wikipedia.org/wiki/Natacha_Atlas | 是 |
| ar-c-023 | Ofra Haza《Yemenite Songs》 | 唱的是十六世紀拉比 Shalom Shabazi 的葉門猶太詩作 | Shalom Shabazi 為十七世紀的詩人；Encyclopedia.com 與〈Im Nin'alu〉相關文章都作 17th century。建議改「十七世紀」或略去世紀。 | https://www.encyclopedia.com/people/literature-and-arts/music-popular-and-jazz-biographies/ofra-haza | 是 |
| ar-c-023 | Prince Far I《Psalms for I》 | 伴奏多半是 Bunny Lee 製作、The Aggrovators 演奏的既有 riddim | Perfect Sound Forever 稱這張 LP 是「為 Lloydie Slim 錄的」，製作歸屬與簡介所寫不同；Discogs 的致謝欄有 Lee Perry、Bunny Lee，但製作人是誰沒有確證。簡介的「Bunny Lee 製作」待核。 | https://www.furious.com/perfect/princefari.html | 是 |
| ar-c-023 | Souad Massi《Raoui》 | 受死亡威脅後離開阿爾及利亞 | Massi 在 The Markaz Review 訪談中說「說她是因為死亡威脅離開，那是謊話」，1999 年是辭去工程師工作、受邀到巴黎演出後決定留下，因為她覺得自己在阿爾及利亞像「外星人」；維基與 The National 則寫成受威脅或遭極端分子針對。來源互相矛盾，建議改為中性寫法（Atakor 的政治歌詞使樂團成為目標、她 1999 年到巴黎演出後留下），不要寫成因死亡威脅離開。 | https://themarkaz.org/the-artist-at-work-a-conversation-with-souad-massi/ | 是 |
| ar-c-023 | Souad Massi《Deb》 | 因伊斯蘭保守派的死亡威脅於 1999 年遷居巴黎 | 同上，Massi 本人在 The Markaz Review 否認自己是因死亡威脅離開，說是受邀演出後選擇留在巴黎；建議改為中性寫法。 | https://themarkaz.org/the-artist-at-work-a-conversation-with-souad-massi/ | 是 |
| ar-c-023 | The Gladiators《Proverbial Reggae》 | Richard Branson 帶著 Johnny Rotten 到 Kingston 簽人，這是那條產線的第二號 | 待核：事實庫所引維基的 Front Line 條目只列 Prince Far I、Big Youth、Prince Hammer、Tappa Zukie、Sly Dunbar、The Twinkle Brothers 為那趟 Kingston 簽約行的人選，沒有 The Gladiators；維基與 Reggaeville 都稱 Gladiators 早在 1976 年就與 Virgin 簽約並發行《Trenchtown Mix Up》。簡介開頭把 Gladiators 寫成 Branson 與 Rotten 那趟簽人之行的產物，可能誤導；建議改為「Front Line 是 Virgin 1978 年成立的雷鬼子廠牌，Gladiators 已在 1976 年簽入 Virgin 旗下，本作是樂團的第二張、Front Line 的第二號目錄」。 | https://en.wikipedia.org/wiki/Front_Line_(record_label) | 是 |
| ar-c-023 | The Meditations《Message from the Meditations》 | 上線簡介寫這是首作，1976 年由 Dobby Dobson 製作兼編曲、Double-D 發行 | 維基的專輯清單把《Message From The Meditations》列為 1977 年，卡池年份為 1976；發行年待本機以 Discogs 原盤核對，若為 1977 則簡介與卡年份皆須改 | https://en.wikipedia.org/wiki/The_Meditations | 否 |
| ar-c-023 | Vicente Amigo《De mi corazón al aire》 | 師從 Manolo Sanlúcar 十年；1988 年在 La Unión 的 Festival Nacional del Cante de las Minas 拿下吉他首獎 | 「十年」只見維基單源，Córdoba Flamenca 記 1983 至 1988 年在 Sanlúcar 樂團（約五年）；La Unión 首獎年份 El Arte de Vivir el Flamenco 為 1988，Córdoba Flamenca 的年表寫成 1989；兩點兩源不一致，建議店主本機核對西班牙語官方傳記後再決定是否改 | https://cordobaflamenca.com/guitarristas/vicente-amigo/ | 否 |
| ar-c-023 | Wailing Souls《Fire House Rock》 | 當時陣容還包含 Black Uhuru 創團成員 Rudolph「Garth」Dennis | 維基整頁與 Encyclopedia.com 都沒有 Garth Dennis 或 Black Uhuru 的連結；本層沒找到佐證，建議店主本機以專輯內頁或 Discogs 核對陣容；若無法佐證，建議刪除此句 | https://en.wikipedia.org/wiki/The_Wailing_Souls | 是 |
| ar-c-024 | Aux 88《Is It Man or Machine?》 | Tommy Hamilton（TomTom）與 William「BJ」Smith（Posatronix）1993 年以《Bass Magnetic》出道 | 早期成員是 Hamilton 與 Keith Tucker（XLR8R：Hamilton 與 Tucker 組成 Aux 88；Mutek Montreal：1993 年由兩人成軍、Tucker 1995 年離團後 Smith 才成為核心）；最早的發行是 EP《Technology》，接著才是雙 EP《Bass Magnetic》，維基則把《Bass Magnetic》寫成首張專輯。建議改成「Hamilton 與 Keith Tucker 1993 年前後以《Bass Magnetic》亮相，Smith 後來成為搭檔」，或拿掉具名成員。 | https://montreal.mutek.org/en/artists/aux-88 | 是 |
| ar-c-024 | Carl Cox《F.A.C.T.》 | Mixmag 記述他同年在舞池『把三台唱盤拆了』的三盤手法，正是這份混音的底氣 | 讀到的 Mixmag 長文《Carl Cox: The Legend》摘要未見此句；Cox 以三唱盤成名的事件所有來源都記為 1988 年 Sunrise rave，不是 1995 年。引文出處建議回頭核對，找不到就改寫成 1988 年 Sunrise 的說法。 | https://mixmag.net/feature/carl-cox-the-legend | 否 |
| ar-c-024 | Derrick May《Innovator》 | 這套雙 CD 結集…二十六軌收齊 Transmat 時期的〈Nude Photo〉〈It Is What It Is〉〈Kaotic Harmony〉 | RA 傳記寫 1995 年由 Sony Japan 編成『單碟』的《Innovator》；MusicBrainz 記 Innovator 的 release group 首發日 1996 年 4 月 21 日、共 8 個 release。碟數與軌數依版本而異，建議以卡池實際對應的 release 在 MusicBrainz 核對『雙 CD、26 軌』是否屬同一版本。 | https://ra.co/dj/derrickmay/biography | 否 |
| ar-c-024 | Green Velvet《Constant Chaos》 | Curtis Alan Jones 1968 年生於芝加哥 | 生年各來源不一致：維基 1968-04-26、wikidata 1967-04-26、List 專訪摘要 1968；上線簡介的 1968 年未必錯，但建議主線核對一個權威來源（如 Billboard 或官方傳記）後再決定是否保留生年。 | https://www.wikidata.org/wiki/Q1544666 | 是 |
| ar-c-024 | Harold Budd & Brian Eno《Ambient 2: The Plateaux of Mirror》 | 1980 年於安大略省咸美頓錄成 | 英文維基 Ambient 2 條目寫 1979 年於 Hamilton 的 Grant Avenue Studio 錄音、1980 年 4 月發行；錄音年只有維基單一來源，需主線找第二源（如專輯內頁或 Eno 訪談）再決定是否改為 1979 年。 | https://en.wikipedia.org/wiki/Ambient_2:_The_Plateaux_of_Mirror | 是 |
| ar-c-fix1 | Buffy Sainte-Marie《It's My Way!》 | 2023 年 CBC 調查認定她長年宣稱的原住民血統不實 | 把 CBC 的調查結論寫成定論；她本人回應說從未確定出生地、從未把公民身分當祕密，並已交還勳章。建議改成中性寫法：『2023 年 CBC 調查報導認為她出生於美國，2025 年她的 Order of Canada、Juno 與 Polaris 等加拿大榮譽因公民身分被撤銷或交還』。 | https://consequence.net/2025/03/buffy-sainte-maries-polaris-juno-prizes-revoked/ | 是 |
| ar-c-fix1 | Buffy Sainte-Marie《Illuminations》 | Sainte-Marie 與製作人 Maynard Solomon 用 Buchla 合成器處理人聲 | Musicworks 寫 Buchla 的濾波、調變與閘控是 Juilliard 教師 Michael Czajkowski 操作；維基列製作人為 Maynard Solomon 與 Mark Roth。『他們用 Buchla 處理人聲』應補上 Czajkowski 或改寫為『人聲經 Buchla 處理』（Musicworks 單源）。 | https://www.musicworks.ca/profile/buffy-sainte-marie-reflects-illuminations | 是 |
| ar-c-fix1 | 何欣穗《她的。發光搖擺》 | 隔年在華語音樂傳媒大獎四項提名中獲十大華語唱片 | zh 維基寫的獎名是「第三屆華語流行樂傳媒大獎」（十大華語唱片獲獎，另有最佳搖滾藝人、最佳作詞人、獨立音樂大獎提名），上線簡介寫「華語音樂傳媒大獎」，獎名不完整；內容事實一致，屬獎名寫法問題。 | https://zh.wikipedia.org/wiki/%E4%BD%95%E6%AC%A3%E7%A9%97 | 是 |
| ar-c-fix2 | Barbara《Barbara chante Barbara》 | 是第一張全部由自己寫詞寫曲的唱片 | 法文維基專輯條目寫該張除兩首與外人合作的曲目外，其餘由她自己寫（單源，建議改為「幾乎全部」或「主要由自己創作」）。 | https://fr.wikipedia.org/wiki/Barbara_chante_Barbara | 是 |
| ar-c-fix2 | C.O.B.《Spirit of Love》 | 1970 年 CBS 的 12 吋原盤 | 英文維基、klofmag 悼文與 At The Barrier 樂評都把《Spirit of Love》記為 1971 年（BGO 重發頁寫 1972 年）；卡池年份為 1970，建議店主核對原盤年份（Discogs）後同步卡單與簡介。 | https://atthebarrier.com/2021/04/21/c-o-b-spirit-of-love-album-review/ | 是 |
| ar-c-fix2 | The Rollies《Dansa Yok Dansa》 | 樂團 1965 年成軍於萬隆 | 印尼文維基寫 1965 年，但 ANTARA 的印尼搖滾史報導寫 1967 年起在 Deddy Stanzah 領導下起步，兩說並存；建議改成「1960 年代中期」或加註兩說。 | https://www.antaranews.com/berita/1116114/histori-rock-indonesia-lahirnya-musisi-legenda | 是 |
| ar-c-fix2 | Curly Ray Cline《Chicken Reel》 | Cline 十五歲時與堂兄 Ezra、哥哥 Ned 組了 Lonesome Pine Fiddlers | 親屬關係兩說：英文維基寫堂兄 Ezra 與哥哥 Ned，e-WV（Ivan M. Tribe）寫 Curly Ray、Charlie、Ned 是堂（表）兄弟；建議改成「與親族」。 | https://www.wvencyclopedia.org/entries/1401 | 是 |
| ar-c-fix2 | Michael Burks《Make It Rain／Iron Man》 | 他生前五度入圍 Blues Music Award（Iron Man 簡介） | Alligator 官網寫入圍四次，維基寫五次，兩源不一致；建議改成『多次入圍』 | https://www.alligator.com/artists/Michael-Burks/ | 對不到卡 |
| ar-c-fix2 | Perfect《Perfect》 | 首張只在波蘭境內發行，估計賣了超過一百萬張 | Polskie Radio 店頁稱首版約數十萬張；pl／en 維基稱約一百萬張，說法不一；Perfect 在世且仍有成員活動，銷量與認證類內容依規則不寫（含 2013 年白金認證）。建議改掉銷量句。 | https://sklep.polskieradio.pl/pl/p/Perfect-Perfect-reedycja-winyl/1399 | 是 |
| ar-c-fix2 | 何欣穗《她的。發光搖擺》 | 隔年在華語音樂傳媒大獎四項提名中獲十大華語唱片 | zh 維基寫的獎名是「第三屆華語流行樂傳媒大獎」（十大華語唱片獲獎，另有最佳搖滾藝人、最佳作詞人、獨立音樂大獎提名），上線簡介寫「華語音樂傳媒大獎」，獎名不完整；內容事實一致，屬獎名寫法問題。 | https://zh.wikipedia.org/wiki/%E4%BD%95%E6%AC%A3%E7%A9%97 | 是 |
| ar-c-fix2 | 脆樂團《有多少光就有多少黑》 | 專輯裡十首歌各有一幅畫，其中五幅後來進了波隆那插畫展 | TiBE 台北國際書展的 2020 波隆那插畫展台灣入選頁，丁律妏名下只列《虛線．Déjà Vu》一件；『五幅』只見 zh 維基與搜尋摘要。建議把『五幅』改成『入選波隆那插畫展』，或確認件數再寫。 | https://www.tibe.org.tw/tw/show_detail/47/87/484 | 是 |

## B2　正文點名出處

| 鍵 | 命中 |
|---|---|
| `desc2:1976／1976 這個星球` | discogs、musicbrainz |
| `desc2:1976／late summer of 1976 不插電現場實況` | musicbrainz |
| `desc2:1976／前王子` | musicbrainz |
| `desc2:23 skidoo／seven songs` | allmusic |
| `desc2:929／3` | musicbrainz |
| `desc2:a band called doris／gypsy lady` | musicbrainz |
| `desc2:a.r. kane／i` | allmusic |
| `desc2:abba／waterloo` | musicbrainz |
| `desc2:abc／the lexicon of love` | allmusic |
| `desc2:abel ganz／gratuitous flash` | discogs |
| `desc2:aesop rock／bazooka tooth` | allmusic |
| `desc2:agape／victims of tradition` | discogs |
| `desc2:ahmad jamal／ahmad's blues` | allmusic |
| `desc2:air miami／me. me. me.` | discogs |
| `desc2:airbridge／paradise moves` | 維基 |
| `desc2:akio / okihide／scratches` | discogs |
| `desc2:akira yamaoka／silent hill 2 original soundtracks` | musicbrainz |
| `desc2:al campbell／diamonds` | musicbrainz |
| `desc2:al green／al green is love` | allmusic |
| `desc2:alain goraguer／la planète sauvage` | allmusic |
| `desc2:alan braufman／valley of search` | musicbrainz、維基 |
| `desc2:alban berg quartett／beethoven: the late string quartets` | 維基 |
| `desc2:albert ayler／bells` | allmusic |
| `desc2:alejandro jodorowsky／el topo` | discogs |
| `desc2:alfred cortot／victor recordings of 1919-1926` | 維基 |
| `desc2:ali farka touré & toumani diabaté／ali and toumani` | 維基 |
| `desc2:alice donut／bucketfulls of sickness and horror in an otherwise meaningless life` | discogs |
| `desc2:allen clapp and his orchestra／one hundred percent chance of rain` | 維基、discogs |
| `desc2:allen toussaint／life, love and faith` | allmusic |
| `desc2:alpha & omega／watch and pray` | mb |
| `desc2:alpha stone／elasticated waveband` | discogs |
| `desc2:amadeus quartet／haydn: string quartets op. 71, 74, 77 & 103` | 維基、discogs |
| `desc2:amp／sirènes` | discogs、musicbrainz |
| `desc2:andrei zueff／kitchen works` | discogs |
| `desc2:andrew cox／arioch` | discogs |
| `desc2:androids of mu／blood robots` | 維基 |
| `desc2:angelo badalamenti／mulholland drive` | discogs |
| `desc2:anthony braxton／for alto` | allmusic |
| `desc2:antoine duhamel／pierrot le fou / week-end` | discogs |
| `desc2:anton karas／the third man` | 維基 |
| `desc2:arcadium／breathe awhile` | 維基 |
| `desc2:armagideon／through the haze` | mb、discogs |
| `desc2:art blakey／child's dance` | allmusic |
| `desc2:arthur alexander／you better move on` | allmusic |
| `desc2:arthur rubinstein／rubinstein plays liszt` | discogs |
| `desc2:artur schnabel／schnabel plays the beethoven piano concertos` | musicbrainz、維基 |
| `desc2:artur schnabel／the complete schubert recordings` | musicbrainz、discogs |
| `desc2:arturo benedetti michelangeli／chopin: 10 mazurkas / ballade op. 23 / scherzo op. 31` | 維基 |
| `desc2:arturo toscanini／respighi: pini di roma / fontane di roma / feste romane` | discogs、維基 |
| `desc2:arturo toscanini／tchaikovsky: manfred symphony / romeo and juliet` | 維基、discogs |
| `desc2:astral engineering／chronoglide` | discogs、musicbrainz |
| `desc2:atahualpa yupanqui／basta ya` | discogs、維基 |
| `desc2:audio active／happy happer` | mb |
| `desc2:austin wintory／abzû` | 維基 |
| `desc2:austin wintory／journey` | 維基 |
| `desc2:auto-mod／requiem` | 維基 |
| `desc2:avrocar／cinematography` | discogs |
| `desc2:bananarians／boner` | discogs |
| `desc2:barker／utility` | allmusic |
| `desc2:barry harris／at the jazz workshop` | allmusic |
| `desc2:barry harris／barry harris plays tadd dameron` | allmusic |
| `desc2:barry harris／preminado` | allmusic |
| `desc2:basic channel／bcd-2` | 維基 |
| `desc2:basic channel／phylyps trak` | 維基 |
| `desc2:beach house／teen dream` | allmusic |
| `desc2:bernard parmegiani／chants magnétiques` | 維基 |
| `desc2:bernard parmegiani／dedans dehors` | 維基 |
| `desc2:betty everett／there'll come a time` | musicbrainz |
| `desc2:big brother & the holding company／big brother & the holding company` | 維基 |
| `desc2:big sleep／bluebell wood` | 維基 |
| `desc2:bikini kill / huggy bear／yeah yeah yeah yeah / our troubled youth` | 維基 |
| `desc2:black arthur blythe／bush baby` | 維基 |
| `desc2:black roots／natural reaction` | mb、discogs |
| `desc2:black sabbath／cross purposes` | allmusic |
| `desc2:black sabbath／tyr` | allmusic |
| `desc2:bladder flask／one day i was so sad that the corners of my mouth met & everybody thought i was whistling` | discogs |
| `desc2:blind light／the absence of time` | discogs |
| `desc2:bob carlin／fiddle tunes for clawhammer banjo` | discogs |
| `desc2:bobby hutcherson／montara` | allmusic |
| `desc2:bobby hutcherson／total eclipse` | allmusic |
| `desc2:bobby timmons／in person` | allmusic |
| `desc2:bobby timmons／soul time` | allmusic |
| `desc2:bonobo／animal magic` | allmusic |
| `desc2:booker ervin／that's it!` | allmusic |
| `desc2:booker ervin／the blues book` | allmusic |
| `desc2:booker ervin／the song book` | allmusic |
| `desc2:booker t. & the mg’s／and now!` | allmusic |
| `desc2:boyz ii men／nathan michael shawn wanya` | allmusic |
| `desc2:bram stoker／heavy rock spectacular` | discogs |
| `desc2:breakout／blues` | 維基 |
| `desc2:brother jack mcduff／the honeydripper` | allmusic |
| `desc2:bud powell／jazz giant` | mb |
| `desc2:bud powell／the amazing bud powell, volume two` | mb |
| `desc2:budapest string quartet／mozart: haydn quartets` | 維基、discogs |
| `desc2:budapest string quartet／ravel: quartet in f major / debussy: quartet in g minor` | 維基 |
| `desc2:buddy guy／damn right, i've got the blues` | allmusic |
| `desc2:buddy rich／keep the customer satisfied` | 維基 |
| `desc2:busch quartet／schubert: death and the maiden / string quartet d 887` | 維基、discogs |
| `desc2:c418／minecraft - volume alpha` | 維基 |
| `desc2:c418／minecraft - volume beta` | 維基 |
| `desc2:cappablack／the state of the night` | discogs |
| `desc2:captain funk／tatsuya oe presents an encounter with captain funk` | discogs、musicbrainz |
| `desc2:carey bell／carey bell's blues harp` | allmusic |
| `desc2:carmen mcrae／book of ballads` | allmusic |
| `desc2:carole king／rhymes & reasons` | allmusic |
| `desc2:catapilla／catapilla` | 維基 |
| `desc2:cecil taylor／silent tongues` | allmusic |
| `desc2:cecil taylor／unit structures` | allmusic |
| `desc2:cedar walton／a night at boomers, vol. 1` | allmusic |
| `desc2:celia cruz & johnny pacheco／tremendo caché` | discogs、維基 |
| `desc2:celia cruz & ray barretto／ritmo en el corazón` | 維基、discogs |
| `desc2:centry／thunder mountain - a dubwise selection` | discogs、mb |
| `desc2:charalambides／union` | discogs |
| `desc2:charles lloyd／dream weaver` | allmusic |
| `desc2:charles mingus／mingus at the bohemia` | allmusic |
| `desc2:charles sullivan／genesis` | 維基 |
| `desc2:charlie mcalister／mississippi luau` | discogs |
| `desc2:chavela vargas／la llorona` | 維基 |
| `desc2:chicane／far from the maddening crowds` | allmusic |
| `desc2:christone "kingfish" ingram／662` | allmusic |
| `desc2:christopher larkin／hollow knight` | 維基 |
| `desc2:christopher tin／calling all dawns: a song cycle` | 維基 |
| `desc2:clear blue sky／clear blue sky` | 維基 |
| `desc2:cleveland eaton／plenty good eaton` | 維基、discogs |
| `desc2:clint mansell featuring kronos quartet／requiem for a dream: soundtrack from the motion picture` | allmusic |
| `desc2:co-fusion／co-fu` | discogs |
| `desc2:coil／love's secret domain` | allmusic |
| `desc2:coil／time machines` | allmusic |
| `desc2:coleman hawkins／at ease with coleman hawkins` | allmusic |
| `desc2:con funk shun／candy` | allmusic |
| `desc2:condition green／life of change` | discogs |
| `desc2:control machete／mucho barato…` | 維基 |
| `desc2:cortot / thibaud / casals／beethoven: archduke trio / schubert: piano trio d 898` | 維基 |
| `desc2:count ossie & the rasta family／man from higher heights` | discogs、維基 |
| `desc2:crayon／brick factory` | musicbrainz、discogs |
| `desc2:creative arts ensemble／one step out` | discogs、mb |
| `desc2:cressida／asylum` | 維基 |
| `desc2:culture freeman meets the bush chemists／conqueror` | discogs、mb |
| `desc2:culture／international herb` | mb |
| `desc2:curly ray cline／why me, ralph?` | discogs |
| `desc2:curren$y／pilot talk` | allmusic |
| `desc2:curtis fuller／blues-ette` | allmusic |
| `desc2:curtis mayfield／curtis/live!` | allmusic |
| `desc2:dan curtin／deception` | discogs |
| `desc2:danielle howle／about to burst` | discogs |
| `desc2:datblygu／libertino` | musicbrainz |
| `desc2:david lynch & alan r. splet／eraserhead` | musicbrainz、discogs |
| `desc2:david wise／donkey kong country 2: diddy’s kong quest` | 維基 |
| `desc2:davy graham／midnight man` | mb |
| `desc2:death／scream bloody gore` | allmusic |
| `desc2:deep purple／in rock` | allmusic |
| `desc2:deerfield／nil desperandum` | discogs |
| `desc2:deja-vu／baroque in the future` | 維基 |
| `desc2:demon fuzz／afreaka!` | discogs |
| `desc2:derrick may／mix-up, volume 5` | 維基 |
| `desc2:desmond dekker／this is desmond dekker` | 維基 |
| `desc2:deuter／d` | allmusic |
| `desc2:dexter gordon／gettin' around` | allmusic |
| `desc2:dick griffin／the eighth wonder` | 維基 |
| `desc2:didjits／hey judester` | discogs |
| `desc2:dietrich fischer-dieskau／schubert: lieder volume 1` | 維基 |
| `desc2:disasterpeace／fez: original soundtrack` | 維基 |
| `desc2:disco inferno／open doors / closed windows` | discogs、musicbrainz |
| `desc2:dizzy gillespie／swing low, sweet cadillac` | allmusic |
| `desc2:dj krush／kakusei` | allmusic |
| `desc2:dock boggs／dock boggs: legendary singer and banjo player` | 維基 |
| `desc2:don wilkerson／preach brother!` | allmusic |
| `desc2:donald byrd／free form` | allmusic |
| `desc2:donald byrd／street lady` | allmusic |
| `desc2:donell jones／where i wanna be` | allmusic |
| `desc2:donnie & joe emerson／dreamin' wild` | 維基 |
| `desc2:donny hathaway／extension of a man` | allmusic |
| `desc2:dr alimantado／sons of thunder` | 維基 |
| `desc2:dr. z／three parts to my soul` | 維基 |
| `desc2:dub ghecko／love to the power of each` | mb、discogs |
| `desc2:duke ellington／ellington uptown` | allmusic |
| `desc2:e.t. mensah & the tempos／king of highlife anthology` | 維基 |
| `desc2:earth／earth 2: special low frequency version` | allmusic |
| `desc2:east river pipe／shining hours in a can` | musicbrainz |
| `desc2:ectogram／i can't believe it's not reggae!` | discogs |
| `desc2:ed askew／ask the unicorn` | discogs、維基 |
| `desc2:eggs／bruiser` | discogs |
| `desc2:el hombre trajeado／skipafone` | musicbrainz、discogs |
| `desc2:electroscope／homemade electroscope` | discogs、musicbrainz |
| `desc2:elisabeth schwarzkopf & dietrich fischer-dieskau／mahler: des knaben wunderhorn` | 維基 |
| `desc2:elisabeth schwarzkopf／lehár: die lustige witwe` | musicbrainz |
| `desc2:elmer bernstein and orchestra／the man with the golden arm` | allmusic |
| `desc2:elmo hope／homecoming!` | allmusic |
| `desc2:elton dean's ninesense／oh! for the edge` | discogs |
| `desc2:emerson string quartet／bartók: the 6 string quartets` | 維基 |
| `desc2:enrico caruso／the caruso edition, volume i: 1902-1908` | 維基 |
| `desc2:ep-4／lingua franca-1` | 維基 |
| `desc2:eric benét／a day in the life` | allmusic |
| `desc2:erich kleiber／r. strauss: der rosenkavalier (1954)` | 維基 |
| `desc2:erkin koray／erkin koray` | discogs |
| `desc2:ernie henry／presenting ernie henry` | allmusic |
| `desc2:evan parker／monoceros` | allmusic |
| `desc2:experience unlimited／free yourself` | 維基 |
| `desc2:experimental audio research／pestrepeller` | discogs |
| `desc2:fania all-stars／latin-soul-rock` | discogs |
| `desc2:felt／the splendour of fear` | allmusic |
| `desc2:fenton robinson／somebody loan me a dime` | allmusic |
| `desc2:ffa coffi pawb／hei vidal!` | musicbrainz |
| `desc2:fireworks／shatter the darkness` | 維基 |
| `desc2:fleetwood mac／tusk` | allmusic |
| `desc2:fletcher henderson／tidal wave` | 維基 |
| `desc2:franco & le tpok jazz／20ème anniversaire 6 juin 1956 - 6 juin 1976, volume 2` | discogs |
| `desc2:frankie knuckles presents satoshi tomiie／tears` | 維基 |
| `desc2:frankie knuckles／a new reality` | allmusic |
| `desc2:frankie knuckles／choice: a collection of classics` | allmusic |
| `desc2:franklin bruno／a bedroom community` | discogs |
| `desc2:fred jackson／hootin' 'n tootin'` | allmusic |
| `desc2:freddie hubbard／ready for freddie` | allmusic |
| `desc2:freeform／elastic speakers` | musicbrainz、discogs |
| `desc2:fritz kreisler／the berlin hmv recordings, 1926-27` | 維基 |
| `desc2:fritz wunderlich／salzburger liederabend` | discogs、維基 |
| `desc2:fuchsia／fuchsia` | 維基 |
| `desc2:gareth coker／ori and the blind forest (original soundtrack)` | 維基 |
| `desc2:garmarna／guds spelemän` | allmusic |
| `desc2:gary numan／the pleasure principle` | allmusic |
| `desc2:gato barbieri／last tango in paris` | musicbrainz、discogs |
| `desc2:gene russell／talk to my lady` | 維基 |
| `desc2:geoff mann／chants would be a fine thing` | discogs |
| `desc2:georges delerue／le mépris` | discogs |
| `desc2:gil evans／gil evans & ten` | allmusic |
| `desc2:gillian welch／revival` | allmusic |
| `desc2:giovanni fusco／l'avventura` | musicbrainz、discogs |
| `desc2:global communication／fabric 26` | 維基 |
| `desc2:gordon lightfoot／sit down young stranger` | musicbrainz |
| `desc2:graham central station／my radio sure sounds good to me` | allmusic |
| `desc2:graham collier music／symphony of scorpions` | allmusic |
| `desc2:graham collier／the day of the dead` | allmusic |
| `desc2:grant kirkhope／banjo-kazooie` | 維基 |
| `desc2:grenadine／goya` | discogs |
| `desc2:grumiaux trio／beethoven: serenades op. 8 & op. 25` | discogs |
| `desc2:hampton hawes／everybody likes hampton hawes` | allmusic |
| `desc2:hampton hawes／four!` | allmusic |
| `desc2:hank mobley／a caddy for daddy` | allmusic |
| `desc2:hank williams／hank williams as "luke the drifter"` | mb、discogs |
| `desc2:harold land／harold in the land of jazz` | allmusic |
| `desc2:harold land／the peace-maker` | allmusic |
| `desc2:harold vick／steppin' out!` | allmusic |
| `desc2:harry beckett／joy unlimited` | 維基、discogs |
| `desc2:harvey williams／california` | discogs |
| `desc2:hat／tokyo - frankfurt - new york` | musicbrainz |
| `desc2:hazard／north` | musicbrainz、discogs |
| `desc2:haze／c'est la vie` | musicbrainz |
| `desc2:helen merrill／helen merrill` | 維基 |
| `desc2:helena hauff／discreet desires` | allmusic |
| `desc2:helmet／meantime` | allmusic |
| `desc2:hidehiko matsumoto／hot jazz` | 維基 |
| `desc2:hideto sasaki, toshiyuki sekine quartet + 1／stop over` | discogs |
| `desc2:hirofumi goto／geo rhythm` | discogs |
| `desc2:hope of glory／second look` | discogs |
| `desc2:horace parlan／headin' south` | allmusic |
| `desc2:horace parlan／us three` | allmusic |
| `desc2:horace silver／6 pieces of silver` | allmusic |
| `desc2:horace tapscott with the pan-afrikan peoples arkestra／live at i.u.c.c.` | 維基 |
| `desc2:howlin' wolf, muddy waters & bo diddley／the super super blues band` | allmusic |
| `desc2:hughie izachaar／can't take the pressure` | discogs、mb |
| `desc2:hüsker dü／new day rising` | allmusic |
| `desc2:ike quebec／heavy soul` | allmusic |
| `desc2:ike quebec／it might as well be spring` | allmusic |
| `desc2:illés／illések és pofonok` | 維基 |
| `desc2:imarhan／imarhan` | 維基 |
| `desc2:imrat khan／ragas marva · sudda saranga` | discogs |
| `desc2:incognito／tribes, vibes and scribes` | allmusic |
| `desc2:indian summer／indian summer` | 維基 |
| `desc2:innerzone orchestra／programmed` | allmusic |
| `desc2:inoyama land／danzindan-pojidon` | discogs |
| `desc2:inoyama land／music for myxomycetes` | 維基、discogs |
| `desc2:irish coffee／irish coffee` | discogs |
| `desc2:iron & wine／beast epic` | allmusic |
| `desc2:ithaca／a game for all who know` | discogs |
| `desc2:jackie mclean／a fickle sonance` | allmusic |
| `desc2:jackie mclean／let freedom ring` | allmusic |
| `desc2:jackie mclean／new soil` | allmusic |
| `desc2:jack／pioneer soundtracks` | discogs |
| `desc2:jacqueline du pré／dvořák: cello concerto / waldesruhe` | 維基、discogs |
| `desc2:jacques thibaud & alfred cortot／franck: sonate / fauré: sonate no. 1 / debussy: sonate` | 維基 |
| `desc2:jah free／breaking out` | mb |
| `desc2:jaki byard／hi-fly` | allmusic |
| `desc2:jam city／dream a garden` | 維基 |
| `desc2:james brown／black caesar` | allmusic |
| `desc2:james brown／hot` | allmusic |
| `desc2:james brown／people` | allmusic |
| `desc2:james brown／reality` | allmusic |
| `desc2:james brown／sho is funky down here` | allmusic |
| `desc2:james horner／titanic: music from the motion picture` | 維基 |
| `desc2:james moody／last train from overbrook` | allmusic |
| `desc2:jean adebambo／feelings` | 維基 |
| `desc2:jeff mills／mix-up vol. 2: live mix at liquid room, tokyo` | allmusic |
| `desc2:jerry butler／the ice man cometh` | allmusic |
| `desc2:jesper kyd／assassin’s creed ii: the original game soundtrack` | 維基 |
| `desc2:jim eanes／a statesman of bluegrass music` | discogs |
| `desc2:jimmy arnold／strictly arnold` | musicbrainz |
| `desc2:jimmy raney／a` | allmusic |
| `desc2:jimmy riley／majority rule` | discogs |
| `desc2:joan sutherland／operatic arias` | 維基 |
| `desc2:joe bonamassa／the ballad of john henry` | allmusic |
| `desc2:joe lee wilson & bond street／what would it be without you` | 維基 |
| `desc2:joe williams／count basie swings, joe williams sings` | allmusic |
| `desc2:joe／my name is joe` | allmusic |
| `desc2:john coltrane／black pearls` | allmusic |
| `desc2:john hammond／so many roads` | allmusic |
| `desc2:john jenkins with kenny burrell／john jenkins with kenny burrell` | allmusic |
| `desc2:john villemonte／people like you` | discogs |
| `desc2:john zorn／naked city` | allmusic |
| `desc2:johnny clarke／yard style` | 維基、discogs、musicbrainz |
| `desc2:johnny griffin／the congregation` | allmusic |
| `desc2:johnny hartman／songs from the heart` | allmusic |
| `desc2:judas priest／painkiller` | allmusic |
| `desc2:judy henske & jerry yester／farewell aldebaran` | discogs |
| `desc2:junior murvin／bad man possee` | discogs |
| `desc2:junior parker／like it is` | 維基 |
| `desc2:justin hurwitz／la la land: original motion picture score` | 維基 |
| `desc2:kagami／the broken sequencer` | discogs |
| `desc2:karl richter／bach: johannes-passion` | 維基 |
| `desc2:kathleen ferrier／mahler: das lied von der erde (1952)` | 維基 |
| `desc2:kenny dorham／jazz contrasts` | allmusic |
| `desc2:kenny dorham／matador` | allmusic |
| `desc2:kenny drew／undercurrent` | allmusic |
| `desc2:king general bucks up pon de bush chemists／money run tings` | mb、discogs |
| `desc2:king oliver／the new york sessions (1929-1930)` | 維基 |
| `desc2:kleeer／get ready` | allmusic |
| `desc2:koerner, ray & glover／blues, rags & hollers + lots more blues, rags & hollers` | mb、release group |
| `desc2:kraftwerk／radio-activity` | allmusic |
| `desc2:lalo schifrin／black widow` | allmusic |
| `desc2:lalo schifrin／enter the dragon` | allmusic |
| `desc2:late!／pocketwatch` | 維基 |
| `desc2:lee morgan／the gigolo` | allmusic |
| `desc2:lee morgan／the procrastinator` | allmusic |
| `desc2:lee morgan／the rumproller` | allmusic |
| `desc2:lena raine／celeste: original soundtrack` | 維基 |
| `desc2:leroy smart／impressions of leroy smart` | musicbrainz |
| `desc2:lidj incorporated meets sound iration／dub liberation` | mb、discogs |
| `desc2:light／turning` | discogs、musicbrainz |
| `desc2:linda hill／lullaby for linda` | mb、discogs |
| `desc2:longstone／surrounded by glass` | discogs、musicbrainz |
| `desc2:lorelei／everyone must touch the stove` | discogs |
| `desc2:lou donaldson／light-foot` | allmusic |
| `desc2:lou rawls／all things in time` | allmusic |
| `desc2:louis armstrong／louis armstrong plays w.c. handy` | allmusic |
| `desc2:lucky thompson／lucky strikes` | allmusic |
| `desc2:luther allison／love me mama` | allmusic |
| `desc2:ma chérie for painting／una producion pop` | discogs、musicbrainz |
| `desc2:maitreya kali／apache` | 維基 |
| `desc2:mal waldron／impressions` | allmusic |
| `desc2:mal waldron／mal/2` | allmusic |
| `desc2:malicorne／le bestiaire` | 維基 |
| `desc2:marcus king／el dorado` | allmusic |
| `desc2:marden hill／cadaquéz` | discogs |
| `desc2:marek grechuta／korowód` | 維基 |
| `desc2:marian anderson／the lady from philadelphia` | 維基 |
| `desc2:marine girls／beach party` | allmusic |
| `desc2:marj snyder／let the son shine` | discogs |
| `desc2:marlena shaw／who is this bitch, anyway?` | allmusic |
| `desc2:marlon williams／make way for love` | allmusic |
| `desc2:martin carthy／prince heathen` | musicbrainz |
| `desc2:mary lou williams／zoning` | allmusic |
| `desc2:masao nakajima quartet／kemo-sabe` | discogs |
| `desc2:max brennan／alien to whom?` | discogs |
| `desc2:max roach／deeds, not words` | allmusic |
| `desc2:max roach／drums unlimited` | allmusic |
| `desc2:max romeo／reconstruction` | 維基 |
| `desc2:mccarthy／the enraged will inherit the earth` | 維基 |
| `desc2:mccoy tyner／asante` | allmusic |
| `desc2:mel tormé／mel tormé with the marty paich dek-tette` | allmusic |
| `desc2:metabolist／hansten klork` | discogs |
| `desc2:metrotone／the less you have, the more you are` | discogs |
| `desc2:mfon／a day trip to chicago` | discogs、musicbrainz |
| `desc2:michael hedges／aerial boundaries` | 維基 |
| `desc2:michael nyman／drowning by numbers` | 維基 |
| `desc2:michael nyman／the draughtsman's contract` | discogs、維基 |
| `desc2:mick gordon／doom eternal (original game soundtrack)` | 維基 |
| `desc2:mick gordon／doom: original game soundtrack` | 維基 |
| `desc2:midas／beyond the clear air` | discogs |
| `desc2:mighty baby／mighty baby` | 維基 |
| `desc2:minxus／pabulum` | discogs |
| `desc2:mission of burma／vs.` | allmusic |
| `desc2:model 500／classics` | allmusic |
| `desc2:montage／anthropologie` | discogs |
| `desc2:moonshake／the sound your eyes can follow` | discogs |
| `desc2:movietone／day and night` | musicbrainz |
| `desc2:mr. bungle／disco volante` | allmusic |
| `desc2:muddy waters／muddy waters sings big bill broonzy` | allmusic |
| `desc2:multi-story／chimes` | discogs |
| `desc2:multi-story／east west` | discogs |
| `desc2:mushroom now!／traveller's light` | discogs |
| `desc2:muslimgauze／buddhist on fire` | discogs |
| `desc2:myrna summers／come to jesus now` | musicbrainz |
| `desc2:mystic eyes／mysterious` | 維基 |
| `desc2:naked city／torture garden` | allmusic |
| `desc2:naná vasconcelos／saudades` | allmusic |
| `desc2:napoleon brown & the southern sisters／yes, i know the man` | discogs |
| `desc2:nathan milstein／paganiniana: violin recital` | discogs |
| `desc2:necros／conquest for death` | 維基 |
| `desc2:negasphere／castle in the air` | discogs |
| `desc2:nerve net noise／this island earth` | discogs |
| `desc2:neşet ertaş／gönül dağı` | mb |
| `desc2:neşet ertaş／kendim ettim kendim buldum` | mb |
| `desc2:nightmares on wax／carboot soul` | allmusic |
| `desc2:nitty gritty dirt band／uncle charlie & his dog teddy` | 維基 |
| `desc2:nothing painted blue／placeholders` | discogs |
| `desc2:nujabes / fat jon／samurai champloo music record: departure` | mb |
| `desc2:o.c.／word...life` | allmusic |
| `desc2:okihide／a boy in picca season` | discogs |
| `desc2:opus avantra／introspezione` | discogs |
| `desc2:otis spann／otis spann's chicago blues` | allmusic |
| `desc2:ozzy osbourne／blizzard of ozz` | allmusic |
| `desc2:p. mobil／mobilizmo` | 維基 |
| `desc2:pablo casals／dvořák: cello concerto / bruch: kol nidrei` | 維基 |
| `desc2:pablo milanés／yo me quedo` | mb、release group |
| `desc2:pacific 231／tropical songs gold` | musicbrainz |
| `desc2:pageant／the pay for dreamer's sin` | discogs |
| `desc2:palace brothers／days in the wake` | allmusic |
| `desc2:palomatic／trill` | discogs、musicbrainz |
| `desc2:pan afrikan peoples arkestra／flight 17` | 維基 |
| `desc2:pan sonic／a` | allmusic |
| `desc2:paul nagle／the soft room` | discogs |
| `desc2:peaches & herb／2 hot!` | allmusic |
| `desc2:peer raben／querelle - ein pakt mit dem teufel` | discogs |
| `desc2:pete seeger／american favorite ballads, vol. 1` | discogs |
| `desc2:petra／petra` | 維基 |
| `desc2:phil woods／musique du bois` | allmusic |
| `desc2:phineas newborn jr.／harlem blues` | allmusic |
| `desc2:phineas newborn jr.／here is phineas` | allmusic |
| `desc2:phineas newborn jr.／please send me someone to love` | allmusic |
| `desc2:phuture／we are phuture` | 維基 |
| `desc2:piano magic／low birth weight` | musicbrainz、discogs |
| `desc2:pierre henry／le voyage` | 維基 |
| `desc2:pierre henry／messe de liverpool` | 維基 |
| `desc2:pixies／trompe le monde` | allmusic |
| `desc2:plaid／double figure` | allmusic |
| `desc2:plaid／rest proof clockwork` | allmusic |
| `desc2:polvo／today's active lifestyles` | allmusic |
| `desc2:prince far i／psalms for i` | 維基 |
| `desc2:prolapse／backsaturday` | discogs |
| `desc2:protos／one day a new horizon` | discogs |
| `desc2:providence／and i'll recite an old myth from...` | discogs |
| `desc2:quadra／sketch from a moment` | discogs |
| `desc2:quartetto italiano／debussy: string quartet / ravel: string quartet` | 維基 |
| `desc2:quartetto italiano／schubert: string quartet op. 161 d 887` | 維基、discogs |
| `desc2:quasar／fire in the sky` | discogs |
| `desc2:quincy jones／in the heat of the night` | allmusic |
| `desc2:r. carlos nakai／canyon trilogy` | 維基 |
| `desc2:rahsaan roland kirk／blacknuss` | allmusic |
| `desc2:rahsaan roland kirk／bright moments` | allmusic |
| `desc2:randy newman／good old boys` | allmusic |
| `desc2:randy newman／sail away` | allmusic |
| `desc2:randy weston／uhuru afrika` | allmusic |
| `desc2:rashied ali & frank lowe／duo exchange` | 維基 |
| `desc2:ravi shankar／portrait of genius` | musicbrainz |
| `desc2:raw material／time is...` | discogs |
| `desc2:ray bryant／alone with the blues` | allmusic |
| `desc2:ray bryant／ray bryant trio` | allmusic |
| `desc2:red garland／a garland of red` | allmusic |
| `desc2:red garland／rojo` | allmusic |
| `desc2:red summer／release` | musicbrainz、release-group、discogs |
| `desc2:refrigerator／how you continue dreaming` | discogs |
| `desc2:refused／songs to fan the flames of discontent` | 維基 |
| `desc2:reload／a collection of short stories` | 維基 |
| `desc2:rené & angela／street called desire` | allmusic |
| `desc2:resurrection band／awaiting your reply` | 維基 |
| `desc2:reverend gary davis／say no to the devil` | allmusic |
| `desc2:revolutionary dub warriors／state of evolution` | discogs、mb |
| `desc2:rheinallt h. rowlands／bukowski` | discogs |
| `desc2:rhythim is rhythim／nude photo` | 維基 |
| `desc2:rhythm & sound／rhythm & sound` | 維基 |
| `desc2:rhythm & sound／see mi yah` | 維基 |
| `desc2:richard "groove" holmes／soul message` | allmusic |
| `desc2:richard o'brien／the rocky horror picture show` | 維基 |
| `desc2:richie hawtin／de9: closer to the edit` | 維基 |
| `desc2:richie hawtin／de9: decks, efx & 909` | allmusic |
| `desc2:richie hawtin／de9: transitions` | 維基 |
| `desc2:riow arai／circuit '72` | discogs |
| `desc2:robert calvert／freq` | musicbrainz |
| `desc2:robert calvert／hype` | discogs |
| `desc2:robert finley／sharecropper's son` | allmusic |
| `desc2:roberta flack／quiet fire` | allmusic |
| `desc2:rotary connection／hey, love` | allmusic |
| `desc2:roy haynes／we three` | allmusic |
| `desc2:rudolph johnson／the second coming` | discogs |
| `desc2:rufus featuring chaka khan／rufus featuring chaka khan` | musicbrainz |
| `desc2:ry cooder／chicken skin music` | allmusic |
| `desc2:saccharine trust／surviving you, always` | 維基、discogs |
| `desc2:sadayasu fujii／prelude to a kiss` | discogs |
| `desc2:sam dees／the show must go on` | 維基 |
| `desc2:sam gopal／escalator` | 維基 |
| `desc2:sam rivers／contours` | allmusic |
| `desc2:sam rivers／streams` | allmusic |
| `desc2:sarah jarosz／undercurrent` | allmusic |
| `desc2:sarah vaughan／no count sarah` | allmusic |
| `desc2:sarah vaughan／sarah vaughan at mister kelly's` | allmusic |
| `desc2:scanner／mass observation` | musicbrainz、discogs |
| `desc2:scream／this side up` | discogs |
| `desc2:second hand／death may be your santa claus` | 維基 |
| `desc2:sergiu celibidache／tchaikovsky: symphony no. 5` | musicbrainz、維基 |
| `desc2:shankar／vision` | discogs、維基 |
| `desc2:shankar／who's to know` | 維基、discogs |
| `desc2:shudder to think／ten spot` | discogs |
| `desc2:simon finn／pass the distance` | discogs |
| `desc2:sippie wallace／women be wise` | 維基 |
| `desc2:skara brae／skara brae` | 維基 |
| `desc2:skyray／mind lagoons` | discogs、musicbrainz |
| `desc2:slovenly／thinking of empire` | discogs |
| `desc2:sly & the family stone／dance to the music` | allmusic |
| `desc2:smokey robinson & the miracles／make it happen` | allmusic |
| `desc2:socrates drank the conium／phos` | 維基 |
| `desc2:sonny clark／my conception` | allmusic |
| `desc2:sonny criss／portrait of sonny criss` | allmusic |
| `desc2:sonny criss／this is criss!` | allmusic |
| `desc2:soulside／hot bodi-gram` | 維基 |
| `desc2:soundsmith／aquanaut` | discogs、musicbrainz |
| `desc2:sphere／inside ourselves` | mb |
| `desc2:spontaneous music ensemble／biosystem` | discogs |
| `desc2:stan sulzmann／on loan with gratitude` | discogs |
| `desc2:starless／silver wings` | discogs |
| `desc2:steel mill／green eyed god` | discogs |
| `desc2:steve beresford／the bath of surprise` | discogs |
| `desc2:steve lacy & michael smith／sidelines` | 維基 |
| `desc2:suicide／a way of life` | allmusic |
| `desc2:susan tedeschi／hope and desire` | allmusic |
| `desc2:suzukiski／kamakura` | discogs |
| `desc2:suzukiski／waiting` | discogs |
| `desc2:sven grünberg／hingus` | 維基 |
| `desc2:swans／white light from the mouth of infinity` | allmusic |
| `desc2:swa／your future if you have one` | discogs、維基 |
| `desc2:sylvia tella／will you still want me` | 維基 |
| `desc2:tabu ley rochereau／africa worldwide: 35th anniversary album` | discogs、維基 |
| `desc2:tabu ley rochereau／muzina` | 維基 |
| `desc2:tadd dameron／the magic touch` | allmusic |
| `desc2:tagomago／flower instrumental` | musicbrainz |
| `desc2:tagomago／prelude for afternoon` | discogs、musicbrainz |
| `desc2:tamaru／夢の途中` | discogs、musicbrainz |
| `desc2:teddy wilson／with billie in mind` | allmusic |
| `desc2:telefon tel aviv／fahrenheit fair enough` | allmusic |
| `desc2:temdendam suay／sounzer paranoun (sound tracks of some films)` | discogs |
| `desc2:temple of bon matin／thunder feedback confusion` | discogs |
| `desc2:terra rosa／honesty` | discogs |
| `desc2:terry callier／i just can't help myself` | allmusic |
| `desc2:th' faith healers／lido` | discogs |
| `desc2:thad jones／the magnificent thad jones` | allmusic |
| `desc2:the awakening／mirage` | discogs、mb、維基 |
| `desc2:the b-52's／wild planet` | allmusic |
| `desc2:the bats／daddy's highway` | allmusic |
| `desc2:the bush chemists／light up your spliff` | mb、discogs |
| `desc2:the bush chemists／strictly dubwise` | discogs、mb |
| `desc2:the chemical brothers／exit planet dust` | allmusic |
| `desc2:the chi-lites／a lonely man` | allmusic |
| `desc2:the congos／congo ashanti` | 維基 |
| `desc2:the deep freeze mice／teenage head in my refrigerator` | discogs |
| `desc2:the dicks／these people` | 維基、allmusic |
| `desc2:the disciples／infinite density of dub` | mb |
| `desc2:the dust brothers／fight club: original motion picture score` | 維基 |
| `desc2:the fabulous counts／jan jan` | discogs、維基 |
| `desc2:the four tops／reach out` | allmusic |
| `desc2:the freed unit／things are looking up` | discogs |
| `desc2:the future sound of london／lifeforms` | allmusic |
| `desc2:the hafler trio／negentropy` | musicbrainz、discogs |
| `desc2:the impressions／check out your mind!` | allmusic |
| `desc2:the intruders／save the children` | allmusic |
| `desc2:the john betsch society／earth blossom` | discogs |
| `desc2:the king of luxembourg／royal bastard` | discogs |
| `desc2:the knife／the knife` | allmusic |
| `desc2:the land of nod／translucent` | discogs |
| `desc2:the legendary pink dots／brighter now` | discogs |
| `desc2:the mighty diamonds／stand up to your judgment` | 維基 |
| `desc2:the modern jazz quartet／lonely woman` | allmusic |
| `desc2:the pooh sticks／orgasm` | discogs、allmusic |
| `desc2:the raymond brake／piles of dirty winters` | discogs |
| `desc2:the rootsman vs muslimgauze／city of djinn` | discogs、mb |
| `desc2:the rootsman／in dub we trust` | discogs、mb |
| `desc2:the running man／the running man` | discogs |
| `desc2:the sensational williams brothers／mama prayed for me` | musicbrainz、discogs |
| `desc2:the sweetest ache／jaguar` | discogs |
| `desc2:the third eye foundation／ghost` | discogs |
| `desc2:the upsetters／blackboard jungle dub` | 維基 |
| `desc2:the verlaines／bird dog` | allmusic |
| `desc2:the yummy fur／night club` | discogs |
| `desc2:thelonious monk／brilliant corners` | allmusic |
| `desc2:thelonious monk／it's monk's time` | allmusic |
| `desc2:third quadrant／n = r* fp ne fl fi fc l` | discogs、musicbrainz |
| `desc2:third quadrant／seeing yourself as you really are` | discogs、musicbrainz |
| `desc2:third quadrant／voyage to pluto` | discogs |
| `desc2:this heat／this heat` | allmusic |
| `desc2:tim hardin／tim hardin 2` | allmusic |
| `desc2:tinariwen／elwan` | allmusic |
| `desc2:toby fox／deltarune chapter 1 ost` | 維基 |
| `desc2:toby fox／undertale: soundtrack` | 維基 |
| `desc2:tomatito／barrio negro` | 維基 |
| `desc2:tommy flanagan／eclypso` | allmusic |
| `desc2:tommy flanagan／jazz poet` | allmusic |
| `desc2:tommy jarrell, kyle creed, audine lineberry and bobby patterson／june apple: old time fiddling & clawhammer banjo` | musicbrainz |
| `desc2:tony scott／music for zen meditation` | 維基 |
| `desc2:toshimaru nakamura／no-input mixing board` | 維基 |
| `desc2:toumani diabaté／djelika` | discogs |
| `desc2:tradition／captain ganja and the space patrol` | 維基 |
| `desc2:trans am／futureworld` | allmusic |
| `desc2:treatment／the world of treatment` | discogs |
| `desc2:trembling blue stars／her handwriting` | discogs |
| `desc2:tudor lodge／tudor lodge` | discogs |
| `desc2:twisted science／blown` | discogs |
| `desc2:tånk／upwards at 66°n` | discogs、musicbrainz |
| `desc2:ura ura／.,. (ten-chong-ten)` | discogs、musicbrainz |
| `desc2:urusei yatsura／we are urusei yatsura` | discogs |
| `desc2:van cliburn／prokofiev: piano concerto no. 3 / macdowell: piano concerto no. 2` | 維基 |
| `desc2:van cliburn／rachmaninoff: piano concerto no. 3` | discogs、維基 |
| `desc2:various artists／forrest gump: the soundtrack` | 維基 |
| `desc2:various artists／guardians of the galaxy: awesome mix, vol. 1: original motion picture soundtrack` | 維基 |
| `desc2:various artists／midnight cowboy: original motion picture score` | 維基、discogs |
| `desc2:various artists／o brother, where art thou? music from a film by joel coen & ethan coen` | 維基 |
| `desc2:various artists／reservoir dogs: music from the original motion picture soundtrack` | 維基、discogs |
| `desc2:various artists／the big lebowski: original motion picture soundtrack` | 維基 |
| `desc2:various artists／wings of desire (der himmel über berlin)` | discogs、musicbrainz |
| `desc2:various artists／woodstock: music from the original soundtrack and more` | 維基 |
| `desc2:various artists／zabriskie point` | discogs |
| `desc2:various artists／反中國併吞：anti china invasion live` | discogs、musicbrainz |
| `desc2:various artists／藏金閣第壹卷：metal treasure attic 1` | discogs |
| `desc2:various artists／赤聲搖滾第一集：scum` | musicbrainz |
| `desc2:victor romero evans／première` | discogs、musicbrainz |
| `desc2:village people／go west` | allmusic |
| `desc2:volcano the bear／yak folks y'are` | discogs |
| `desc2:von freeman／have no fear` | musicbrainz、discogs、維基 |
| `desc2:voodoo queens／chocolate revenge` | discogs |
| `desc2:wagon christ／throbbing pouch` | allmusic |
| `desc2:walter bishop, jr.'s 4th cycle／keeper of my soul` | musicbrainz、discogs |
| `desc2:web／ivory tower` | musicbrainz、discogs |
| `desc2:wendy & bonnie／genesis` | 維基 |
| `desc2:wilco／summerteeth` | allmusic |
| `desc2:willi williams／natty with a cause` | mb |
| `desc2:william bell／phases of reality` | musicbrainz |
| `desc2:willie colón／asalto navideño` | allmusic |
| `desc2:willie mitchell／solid soul` | musicbrainz |
| `desc2:wimp factor 14／ankle deep` | discogs |
| `desc2:winston edwards & blackbeard／at 10 downing street - dub conference` | 維基 |
| `desc2:would-be-goods／the camera loves me` | 維基 |
| `desc2:wynton kelly／kelly at midnite` | allmusic |
| `desc2:wynton kelly／someday my prince will come` | allmusic |
| `desc2:x-press 2／muzikizum` | allmusic |
| `desc2:x／los angeles` | allmusic |
| `desc2:y cyrff／llawenydd heb ddiwedd` | discogs |
| `desc2:yabby you／beware dub` | 維基 |
| `desc2:yagya／rigning` | 維基 |
| `desc2:yeah yeah noh／cutting the heavenly lawn of greatness... last rites for the god of love` | 維基 |
| `desc2:yellow swans／going places` | allmusic |
| `desc2:yellowman／king yellowman` | 維基 |
| `desc2:yes／fragile` | allmusic |
| `desc2:yevgeny mravinsky／shostakovich: symphony no. 11 the year 1905` | discogs、維基 |
| `desc2:yevgeny mravinsky／shostakovich: symphony no. 5` | 維基 |
| `desc2:yoko ono／fly` | allmusic |
| `desc2:yoshihiro sawasaki／perfumed garden` | discogs |
| `desc2:yoshimi ueno bestrio／live in otsuchi` | discogs |
| `desc2:yusef lateef／the blue yusef lateef` | allmusic |
| `desc2:zbigniew preisner／la double vie de véronique` | 維基、discogs |
| `desc2:zbigniew preisner／trois couleurs : rouge` | discogs |
| `desc2:zdenek liska／marketa lazarová soundtrack` | discogs |
| `desc2:zion train／great sporting moments in dub!` | mb、discogs |
| `desc2:zion train／passage to indica` | mb、discogs |
| `desc2:zomby／where were u in '92?` | allmusic |
| `desc2:zoviet france／norsch` | discogs |
| `desc2:αντώνης νταλγκάς／andonios dhiamandidhis 1928-1933` | 維基 |
| `desc2:γιώργος μητσάκης／διπλοπενιές και αναμνήσεις` | discogs |
| `desc2:александр галич／поэма о сталине` | 維基 |
| `desc2:владимир высоцкий／баллады и песни` | 維基 |
| `desc2:георгий гаранян／лабиринт: джазовые композиции` | 維基 |
| `desc2:жанна бичевская／поет жанна бичевская` | 維基 |
| `desc2:зоопарк／уездный город n` | 維基 |
| `desc2:сергей курёхин／the ways of freedom` | 維基 |
| `desc2:юлий ким／рыба-кит` | 維基 |
| `desc2:ひがしのひとし／はじめてのシャンソン` | 維基 |
| `desc2:ひがしのひとし／マクシム` | discogs |
| `desc2:ほうむず／朝日に向かって` | discogs、musicbrainz |
| `desc2:りんけんバンド／チェレン` | discogs |
| `desc2:テルズ・シンフォニア／symphonia` | discogs |
| `desc2:トメ北川／青春から` | discogs |
| `desc2:下村陽子／kingdom hearts original soundtrack` | musicbrainz |
| `desc2:下村陽子／live a live オリジナル・サウンドトラック` | musicbrainz |
| `desc2:下村陽子／聖剣伝説 legend of mana オリジナル・サウンドトラック` | musicbrainz |
| `desc2:中村達也／locus` | discogs |
| `desc2:伊藤賢治 / 植松伸夫／romancing sa・ga original sound version` | musicbrainz、release-group |
| `desc2:伍佰 & china blue／詩情搖滾` | musicbrainz |
| `desc2:光田康典／chrono cross original soundtrack` | musicbrainz |
| `desc2:光田康典／xenogears original soundtrack` | musicbrainz、維基 |
| `desc2:光田康典／クロノ・トリガー オリジナル・サウンド・ヴァージョン` | musicbrainz、維基 |
| `desc2:友部正人／にんじん` | discogs |
| `desc2:友部正人／大阪へやって来た` | discogs |
| `desc2:古代祐三／actraiser` | musicbrainz、維基 |
| `desc2:古代祐三／bare knuckle` | musicbrainz |
| `desc2:古川豪／羅針盤で星占いはできない` | discogs |
| `desc2:吉川洋一郎／アクアクの夢` | 維基 |
| `desc2:吉村弘／soundscape 1: surround` | 維基 |
| `desc2:喜納昌吉&チャンプルーズ／earth spirit` | discogs、維基 |
| `desc2:四分衛／世界` | musicbrainz |
| `desc2:四分衛／愛曾經讓我們在一起` | musicbrainz |
| `desc2:回聲樂團／處女空氣` | discogs |
| `desc2:夢幻／sinfonia della luna` | discogs |
| `desc2:大島ミチル／鋼の錬金術師 オリジナルサウンドトラック 1` | mb |
| `desc2:大谷幸／新機動戦記ガンダムw operation 1` | mb |
| `desc2:天野正道／ジャイアントロボ the animation -地球が静止する日- original sound track i` | 維基、mb |
| `desc2:夾子電動大樂隊／不會說台語` | discogs |
| `desc2:夾子電動大樂隊／地下人` | discogs |
| `desc2:夾子電動大樂隊／情慾教室` | discogs |
| `desc2:妮波寺／sorry` | discogs |
| `desc2:安田南／some feeling` | 維基 |
| `desc2:宮下富実夫／wave (sound of the universe)` | discogs |
| `desc2:寺川秀保クァルテット／introducing hideyasu terakawa quartet live featuring hiroshi fujii` | discogs、musicbrainz、release-group |
| `desc2:小栗均トリオ／みどりいろの渓流` | discogs |
| `desc2:山根ミチル／悪魔城ドラキュラx〜月下の夜想曲〜 オリジナル・ゲーム・サントラ` | musicbrainz |
| `desc2:岡部啓一／nier gestalt & replicant original soundtrack` | musicbrainz、維基 |
| `desc2:岡部啓一／nier:automata original soundtrack` | musicbrainz |
| `desc2:崎元仁 / 岩田匡治／final fantasy tactics original sound track` | 維基、musicbrainz |
| `desc2:崎元仁／final fantasy xii original soundtrack` | musicbrainz |
| `desc2:崎元仁／vagrantstory original soundtrack` | musicbrainz |
| `desc2:川井憲次／innocence o.s.t.` | mb、維基 |
| `desc2:川井憲次／patlabor 2 the movie` | mb |
| `desc2:平沢進／berserk` | mb、維基 |
| `desc2:平沢進／パプリカ オリジナルサウンドトラック` | 維基、mb |
| `desc2:平沢進／千年女優` | mb、維基 |
| `desc2:忍冬創／創ファーストアルバム 春秋坂` | discogs |
| `desc2:新寶島康樂隊／第3輯` | discogs |
| `desc2:新寶島康樂隊／第二輯` | discogs |
| `desc2:早坂紗知 & stir up／free fight` | discogs |
| `desc2:明田川荘之／アローン・イン・徳山` | discogs、musicbrainz |
| `desc2:松前公高／space ranch` | discogs |
| `desc2:柴田容子／とまり木` | 維基 |
| `desc2:梶浦由記／fate/zero original soundtrack i` | mb |
| `desc2:植松伸夫／final fantasy ix original soundtrack` | musicbrainz |
| `desc2:植松伸夫／final fantasy vii: original soundtrack` | musicbrainz |
| `desc2:植松伸夫／ファイナルファンタジー vi: オリジナル・サウンド・ヴァージョン` | musicbrainz |
| `desc2:横山菁児／聖闘士星矢 音楽集` | mb |
| `desc2:橙草／烏鴉` | musicbrainz |
| `desc2:武満徹／film music by toru takemitsu - volume 1` | musicbrainz、discogs |
| `desc2:永田一直／the world of electronic sound 4` | discogs |
| `desc2:浜瀬元彦／♯notes of forestry` | 維基 |
| `desc2:淺堤 shallow levée／沈默的鉅作` | musicbrainz |
| `desc2:渡辺岳夫／機動戦士ガンダム オリジナル・サウンドトラック` | mb |
| `desc2:滅火器／家和萬事興` | musicbrainz |
| `desc2:潘麗麗／春雨` | discogs |
| `desc2:潘麗麗／畫眉` | discogs |
| `desc2:澤野弘之／mobile suit gundam unicorn original soundtrack` | mb、release-group、維基 |
| `desc2:澤野弘之／tvアニメ「進撃の巨人」オリジナルサウンドトラック` | mb |
| `desc2:瀬川洋／pierrot` | musicbrainz、release-group |
| `desc2:熊寶貝樂團／年年` | musicbrainz |
| `desc2:熊寶貝樂團／美麗混亂` | musicbrainz |
| `desc2:玖壹壹／周法薷` | 維基 |
| `desc2:玖壹壹／打鐵` | 維基 |
| `desc2:玖壹壹／玖肆伍參` | 維基 |
| `desc2:珂拉琪／deus ex machina` | 維基、musicbrainz |
| `desc2:珂拉琪／memento·mori` | 維基 |
| `desc2:生活向上委員会／生活向上委員会ニューヨーク支部` | discogs |
| `desc2:田中公平／トップをねらえ! 音楽大図鑑` | mb |
| `desc2:盛岡夕美子／余韻 (resonance)` | musicbrainz |
| `desc2:目黒将司／「ペルソナ3」オリジナル・サウンドトラック` | musicbrainz |
| `desc2:目黒将司／『ペルソナ5』オリジナル・サウンドトラック` | musicbrainz |
| `desc2:神前暁／化物語 音楽全集 songs & soundtracks` | mb |
| `desc2:羽田健太郎／the s.d.f. macross` | mb、維基 |
| `desc2:羽田健太郎／「超時空要塞マクロス」愛・おぼえていますか` | mb、維基 |
| `desc2:花生隊長／oh my god` | discogs |
| `desc2:茄子蛋 eggplantegg／我們以後要結婚` | 維基 |
| `desc2:茶木みやこ／レインボウ・チェイサー` | discogs |
| `desc2:草莓救星／德古拉城市` | musicbrainz、discogs |
| `desc2:菅谷昌弘／海の動物園` | 維基 |
| `desc2:菅野邦彦／opa! brasil` | discogs |
| `desc2:菊池俊輔／ドラゴンボール 音楽集` | mb、維基 |
| `desc2:菊田裕樹／聖剣伝説2 original sound version` | musicbrainz、維基 |
| `desc2:蕭福德／春秋大夢` | 維基 |
| `desc2:薄荷葉／的士房間` | discogs |
| `desc2:血肉果汁機 flesh juicer／深海童話` | musicbrainz |
| `desc2:越智義朗／natural sonic` | 維基 |
| `desc2:趙季平／farewell my concubine` | musicbrainz |
| `desc2:農村武裝青年／予你的歌` | musicbrainz |
| `desc2:近藤浩治／スーパーマリオ64 オリジナルサウンドトラック` | musicbrainz |
| `desc2:近藤浩治／ゼルダの伝説 ムジュラの仮面 オリジナル・サウンドトラック` | musicbrainz |
| `desc2:近藤浩治／ゼルダの伝説 時のオカリナ オリジナルサウンドトラック` | musicbrainz |
| `desc2:零與聲音解放組織／哦！你宛若盛開的花朵的甜美屍體` | discogs |
| `desc2:音羽信／わすれがたみ` | discogs |
| `desc2:鷺巣詩郎／neon genesis evangelion ii` | 維基、mb |
| `desc2:鷺巣詩郎／shiro sagisu music from evangelion:1.0 you are (not) alone` | mb |
| `desc2:鷺巣詩郎／the end of evangelion` | mb |
| `desc4:cicada／邊境消逝` | mb |
| `desc4:外道／外道` | wikipedia |
| `desc4:桑布伊／椏幹 yaangad` | mb |
| `desc4:迷幻幼稚園／psychedelic kindergarten` | musicbrainz |
| `desc4:野孩子／咒語` | musicbrainz |
| `desc4:펄 시스터즈／님아` | 維基 |
