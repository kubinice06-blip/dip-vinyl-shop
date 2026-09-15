# jp-2 爵士廠牌列舉（CBS/Sony、Polydor JP、Alfa、East Wind、Trio/Whynot、Denon、Nippon Crown、Kitty、Union、Frasco）

2026-09-15。資料：MB `release?label=` 逐頁到底 → 折疊到 release-group → 只留 primary=Album、無 Compilation/Soundtrack、Official（Live 留、另標）
→ 曲風用 RG tags／藝人 tags（jazz 票數要佔前段或 ≥25%），判不出的另列 `pendingGenre` → 池中比對 seed_cards.json 16,450 列 + c120～c131 本機卡（16,948 列），
漢字／羅馬字／MB 別名都試，雙向子字串但短字串（<6 字、<40% 長度）不算命中。
「本土」＝掛名藝人 country=JP，或 RG 初版國家含 JP（非本土的另標「海外原盤日本壓片」，那些是日本壓片不是本家原盤，不算缺）。

一家一檔：`jp-<slug>.json`（`rows`＝爵士純 Album；`pendingGenre`＝待人工判曲風；`nonJazzAlbumsExcluded`＝剔掉的非爵士張數）。

## 總表（本土日本盤：MB 有／池中有／缺）

| 廠牌 | MB 實體（release 數） | 純 Album RG | 爵士 RG | **本土 MB 有／池中有／缺** | 海外壓片 有／池中／缺 | 待人工判曲風 |
|---|---|---|---|---|---|---|
| CBS/Sony | CBS/Sony 3225、Epic/Sony 547、Inc. 3、SP 6 | 1492 | 301 | **242／27／215** | 59／32／27 | 101 |
| Polydor Japan | Polydor(JP) 1281、UNIVERSAL POLYDOR 54 | 559 | 73 | **64／1／63** | 9／4／5 | 66 |
| Alfa | Alfa 569、Alfa Jazz 37、Alfa Intl 133 | 298 | 103 | **96／6／90** | 7／2／5 | 24 |
| East Wind | EAST WIND 126 | 58 | 57 | **50／9／41** | 7／3／4 | 1 |
| Trio／Whynot | Trio 171、Whynot 34、Why Not Records 1 | 149 | 115 | **102／18／84** | 13／1／12 | 8 |
| Denon | DENON 1026、DENON JAZZ 18 | 701 | 143 | **118／6／112** | 25／1／24 | 50 |
| Nippon Crown | CROWN 676、PANAM 259、Co. 55、CROWN RECORDS(2005–) 88 | 365 | 30 | **30／5／25** | 0 | 128 |
| Kitty | Kitty Records 479、KittyMME 90、Kitty 17、Ent. 13 | 204 | 49 | **47／3／44** | 2／0／2 | 33 |
| Union | Union Records 103、Union Jazz 8 | 45 | 23 | **23／3／20** | 0 | 4 |
| Frasco | Frasco 18 | 14 | 13 | **13／6／7** | 0 | 1 |
| **合計** | | | **907** | **785／84／701** | | 416 |

## 每家一句

- **CBS/Sony**：缺 215，1970s 88／1980s 107。藝人集中：THE SQUARE 12、笠井紀美子 11、Maynard Ferguson 10（日本先發／同年壓片）、Marlene 8、日野皓正 7、渡辺貞夫 5（Pastoral／Paysages／Open Road／Mbali Africa／At Pit Inn）。
  ⚠ 這個 imprint 也涵蓋西班牙 CBS/Sony（到 1997），ES 盤已標「西班牙 CBS/Sony（非日本）」歸海外。Epic/Sony 已一併拉入（547 筆，爵士很少）。
- **Polydor JP**：缺 63，但 1970s 只有 7 張（石川晶 バキシンバ、水谷公生 A Path Through Haze、Prism 四張、深町純）；其餘是 80–90s Shakatak／Jimsaku／MONDAY満ちる／Carioca。**MB 對 Polydor 日本爵士 1970s 建檔極少**。
- **Alfa**：缺 90，其中 43 張是 1990s Alfa Jazz CD（Kenny Drew Trio 4、European Jazz Trio 3、Mal Waldron、Pharoah Sanders、Barney Wilen、Enrico Pieranunzi…）；Casiopea 缺 15、佐藤博 8。1970s 只 13 張。
- **East Wind**：MB 目錄相當完整（58 RG），缺 41，32 張是 1974–79 原盤：菊地雅章《East Wind》《Wishes/Kochi》、日野皓正《Hogiuta》《Speak to Loneliness》《Wheel Stone ×2》、峰厚介《Out of Chaos》（MB 有兩筆重複 RG）《Sunshower》、益田幹夫 ×2、大野俊三 ×2、GJT《Love for Sale》《Direct from L.A.》《Great Tokyo Meeting》《Moreover》、渡辺貞夫《Recital》《I'm Old Fashioned》、Hank Jones 系 Andrew Hill《Hommage》、Cedar Walton《Pit Inn》、Don Friedman、Sam Jones、Art Farmer ×2、Dollar Brand《African Breeze》、Ann Burton、山本剛《Life》、LA4 ×2、Lennie Tristano 已在池。
- **Trio／Whynot**：MB 建得最好（149 RG，爵士 115）。缺 84，1970s 53：本田竹広 5 張、辛島文雄、今田勝、日野元彦、富樫（津波／ヴァレンシア／カフナ）；Whynot 全套幾乎都缺（Air Raid、Muhal Afrisong、Chico Freeman、Charles Sullivan、Ted Curson、Kalaparusha、Walt Dickerson、Joe Bonner、Donald Smith、Andrew Cyrille、Dave Burrell）；Trio 自製的美國人錄音也缺（Cecil Taylor《Akisakila》《Innovations》、Hank Jones《In Japan》、Elvin Jones、Roland Hanna ×3、Richie Beirach ×3、Helen Merrill、Carol Sloane、Anita O'Day、Steve Khan、Art Pepper ×2）。
  ⚠ 2007–2010 年 GB/US CD 六筆是 Whynot 目錄英美再發或英國「Trio Records」誤掛，已標註、歸海外。
- **Denon**：缺 112，1970s 41／1980s 50。Denon PCM 原盤：Archie Shepp 5（Day Dream／Ballads for Trane／Lady Bird／Tray of Silver／Live in Tokyo）、Max Roach Live in Tokyo ×2、Steve Lacy《The Wire》、Grachan Moncur《Shadows》、Billy Harper ×2、Dollar Brand《Anthem for the New Nations》、Frank Foster ×2、Dave Burrell ×2、富樫（モーション／エッセンス／かなたからの声／トゥワイライト）、佐藤允彦 ×2、板橋文夫《渡良瀬》、森山威男《スマイル》、渡辺香津美《Lonesome Cat》、山屋清 ×4、Count Buffalo ×2、秋吉敏子《Top of the Gate》已在 c131。GJT 三張 1984–90。
- **Nippon Crown／PANAM**：爵士只判出 30，缺 25，大半是 1969–75 ムード／jazz-rock（山下洋治 ’68オールスターズ、石川晶、太田幸雄）；山下洋輔《Up-To-Date》(1975 Crown) 缺、《Frozen Days》已在池。**待人工 128 張幾乎全是演歌／J-pop，可整批當非爵士**。
- **Kitty**：缺 44：高中正義 7（TAKANAKA／An Insatiable High／Brasilian Skies／T-Wave／Alone／Saudade／Can I Sing?）、深町純 4、Carioca 5、小林泉美 3、中村照夫《Manhattan Special》、Milford Graves《Meditation Among Us》；1990s 是 MONDAY満ちる／スガシカオ（曲風偏 pop-funk，tags 算 jazz，酌情）。
- **Union**：缺 20（1969–79 為主）：Guitar Workshop、宮沢昭《ミュージカル・プレイ・イン・ジャズ》、フォー・ユニッツ、山口真文 ×2、古沢良治郎《RACCO》、渡辺香津美《Milky Shade》（RG 無 tag，列待判但確定是爵士）、寺下誠《Great Harvest》、鈴木宏昌《Primrose》、生活向上委員会、稲垣次郎《Woodstock Generation》、山本邦山 ×2、1982 Union Jazz 系列（宮沢昭／鈴木勲 meets Duke Jordan／池田芳夫＋高瀬アキ）。
  ⚠ 池中 Union 10 張：MB 掛在 Union 實體的只有 3 張命中（Speed and Space／インディペンデンス／My Dear）；c-87 的 6 張 1982–83 Union Jazz 卡（岡野等／渡辺文男／柳原良乃／大森明／古谷隆／松本英彦）**MB 完全查無 RG**——池中有、MB 沒有，不是漏標。
- **Frasco**：14 RG 全部到齊，缺 7：坂田明《Counter Clockwise Trip》《Peking》、山下洋輔《Montreux Afterglow》《Hot Menu》、筒井康隆＋山下《家》、古沢良治郎《You Wanna Rain》、安田南＋山本剛《Sunny》；武田和命《Gentle November》無 tag 列待判（是爵士）。

## MB 建檔率判斷

- **建得好**：Trio／Whynot、East Wind、Frasco——目錄接近完整，可以直接當開批清單。
- **中等**：Alfa（Alfa Jazz 37 筆全在）、Union（1969–79 主線在，1982–83 Union Jazz 系列缺一半）、Kitty（高中正義／深町純在，其他 1970s 爵士零星）。
- **差**：CBS/Sony（3225 筆但日本自製爵士只約 240 RG，笠井紀美子／日野皓正／渡辺貞夫在，其他 1970s 日本爵士幾乎沒建）、Denon（1026 筆大半古典，Denon Jazz 實體只 18 筆，1970s PCM 系列約 40 張）、Polydor JP（1970s 日本爵士只 7 張）、Nippon Crown／PANAM（PANAM 259 筆幾乎全非爵士，jazz-rock 系列建檔零星）。
- 第 309 條 `artist?query=country:JP AND tag:jazz`：MB 只有 **406** 位日本爵士藝人有 jazz tag，很多藝人（板橋文夫、峰厚介、益田幹夫…）RG 有 tag 但藝人實體沒有，所以本次以 RG tag 為主、藝人 tag 為輔。

## §1 候選（我知道有、MB 查無或未掛本廠牌）

查法：`release-group?query=artist:"…" AND releasegroup:"…"`。

**MB 完全查無 RG**（§1 人工建檔）：
- East Wind：The Great Jazz Trio《Milestones》(1978)、《At the Village Vanguard Vol. 2》(1978)；Ronnie Mathews《Trip to the Orient》(1975)
- Frasco：山下洋輔《Banslikana》(1976 solo)、《Inner Space》(1977)、《砂山》(1979，年份請覆核)
- Union：松本英彦 1982–83 Union Jazz 六張（見上，池中已有）；岡野等《Double Image》等同批
- Trio：鈴木良雄《Matsuri》(1980，是否 Trio 請覆核)
- Alfa：大村憲司《First Step》(1978，是否 Alfa 請覆核)
- Kitty：中村照夫《Rising Sun》(1978，是否 Kitty 請覆核)
- Nippon Crown：鈴木宏昌《Rock Joint Biwa》(1970s，廠牌請覆核)、猪俣猛《Sounds of Sound L.T.D.》(廠牌請覆核)
- CBS/Sony：渡辺貞夫《Bossa Nova Concert》(1969)；Polydor：日野皓正《Journey to Air》(1970，實為 Love/Polydor 系)

**MB 有 RG 但沒掛在本廠牌實體**（不用建 RG，直接釘 rgMbid；池中除注明外都沒有）：
- East Wind：GJT《Kindness, Joy, Love & Happiness》(1978)、渡辺貞夫《Autumn Blow》(1977)、Hank Jones《Hanky Panky》(1975，MB 只有 2005 再發)
- Union／Crown：稲垣次郎《Head Rock》(1970，**池中已有**)；松本英彦《The Session / Sleepy Meets the Great Jazz Trio》(1980)
- Trio：今田勝《Green Caterpillar》(1975)
- Denon：板橋文夫《Nature》(MB 只有 2010 再發)、森山威男《Live at Lovely》(1991)、Archie Shepp《Perfect Passions》(1992)
- Alfa Jazz：Kenny Drew Trio《Everything I Love》(1991；池中同名是 1973 SteepleChase 盤，不同碟)
- Polydor：Prism《Prism》(1977，MB 有兩筆重複 RG，其中一筆已掛 Polydor)；渡辺香津美《Infinite》(1971)
- CBS/Sony：日野皓正《Taro's Mood》(MB 只有 2006 再發)、渡辺貞夫《My Dear Life》(1977，實為 Flying Disk)

## 已知瑕疵

- MB 重複 RG：峰厚介《Out of Chaos》(East Wind)、Prism《Prism》——列表兩筆都留，note 標「疑 MB 重複 RG」。
- Trio 目錄裡 XW／Digital Media 的幾張（世良譲《Bacchus Swing》、渋谷毅《Cook Note》、辛島文雄《Hot Islands》、本田竹曠＋渡辺貞夫《Minton Blues》、加古隆《TOK》）MB 只有串流版、無年份，note 已標。
- 「待人工判曲風」在 CBS/Sony（101）、Denon（50）、Polydor（66）、Crown（128）、Kitty（33）多半是演歌／J-pop／古典，真正要人看的是 Union 4 張、Frasco 1 張、Trio 8 張、Denon 的 Eiichi Fujii Trio《Blues for Powell》與 Bridgewater Brothers 兩張、CBS/Sony 的 宮本文昭《Jazzy Wind》。
