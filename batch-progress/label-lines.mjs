// 批次類型標示：替每張卡補 lineType（深掘／廣度）與 scene（場景標籤），未來好分類。
// 用法：node batch-progress/label-lines.mjs [--write]
// 2026-09-02 店主指示「記得標示類型 未來好分類」而建。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

// scene 可以是字串（整批同一個），也可以是 { 組別: 場景 }（一批分幾條線）。
export const LINES = {
  c52: { lineType: '廣度', scene: '東南亞' },
  c53: { lineType: '廣度', scene: { a: '蘇聯末期搖滾', b: '蘇聯吟遊歌謠與 estrada', c: '蘇聯爵士' } },
  c54: { lineType: '廣度', scene: '南斯拉夫地下搖滾' },
  c55: { lineType: '廣度', scene: '土耳其 Anadolu 與阿拉伯世界' },
  c56: { lineType: '廣度', scene: '捷克匈牙利與中東歐地下' },
  c57: { lineType: '廣度', scene: '牙買加' },
  c58: { lineType: '深掘', scene: '靈魂與放克' },
  c59: { lineType: '深掘', scene: '爵士' },
  c60: { lineType: '深掘', scene: { a: '北美私壓搖滾與迷幻', b: '歐日地下搖滾與迷幻' } },
  c61: { lineType: '深掘', scene: { a: '義大利與法國地下 prog', b: '北歐 progg 與荷比澳紐' } },
  // c-62 是單組（一位代理涵蓋 rebetiko／έντεχνο／地下三線），所以 scene 用單一字串。
  c62: { lineType: '廣度', scene: '希臘 rebetiko 與 έντεχνο' },
  c63: { lineType: '深掘', scene: { a: '民謠的冷門硬蕊', b: '藍調的冷門硬蕊' } },
  c64: { lineType: '廣度', scene: '柬埔寨與越南 1960–70s' },
  c65: { lineType: '深掘', scene: { a: '私壓電子與磁帶實驗', b: '圖書館音樂與早期電腦音樂' } },
  c66: { lineType: '廣度', scene: { a: '寶萊塢黃金期與印度流行', b: '印度古典與民俗' } },
  // 2026-09-03 店主指示「繼續策展 20 批次，回到日本、英國、美國等地的深度小眾有趣的專輯，比如 Johnny's Disk 這種廠牌」。
  // c-67～c-86 全是深掘線，以廠牌與場景為單位，日／英／美三地輪替。
  c67: { lineType: '深掘', scene: '日本自主爵士小廠 1975–88' },
  c68: { lineType: '深掘', scene: '英國私壓與小廠 prog／psych 1969–75' },
  c69: { lineType: '深掘', scene: '美國私壓 SSW 與 loner folk 二線 1968–80' },
  c70: { lineType: '深掘', scene: { a: '日本 1979–84 地下 new wave 廠牌（ピナコテカ／テレグラフ／ヴァニティ）', b: '日本 1984–90 indie 廠牌（ナゴム／キャプテン／Wax／Transistor）' } },
  c71: { lineType: '深掘', scene: '英國自主爵士與即興廠牌 1969–85' },
  c72: { lineType: '深掘', scene: '美國耶穌搖滾與 Xian 私壓 1969–80' },
  c73: { lineType: '深掘', scene: '日本 prog 私家版與小廠 1978–90' },
  c74: { lineType: '深掘', scene: '英國 1980s indie pop 微廠' },
  c75: { lineType: '深掘', scene: '美國黑人福音小廠二線 1955–80' },
  c76: { lineType: '深掘', scene: { a: '沖繩民謡與島唄 1960–95', b: '日本環境音樂與ニューエイジ二線 1982–92' } },
  c77: { lineType: '深掘', scene: '英國 DIY post-punk 與卡帶文化 1978–84' },
  c78: { lineType: '深掘', scene: '美國 old-time 與 bluegrass 小廠二線' },
  c79: { lineType: '深掘', scene: '日本 SSW 與 folk 私家版／小廠二線 1971–80' },
  c80: { lineType: '深掘', scene: '英國 neo-prog 自主制作 1980–86' },
  c81: { lineType: '深掘', scene: '美國 1980s 地下廠牌 B 面' },
  c82: { lineType: '深掘', scene: '日本 1990s 地下 techno／ambient 廠牌' },
  c83: { lineType: '深掘', scene: '英國 1990s 微廠二線' },
  c84: { lineType: '深掘', scene: '美國 1990s lo-fi 卡帶與微廠' },
  c85: { lineType: '深掘', scene: { a: '英國 lovers rock 與 UK roots 小廠 1975–88', b: '英國 1990s dub 小廠' } },
  c86: { lineType: '深掘', scene: '美國自主爵士廠牌 1969–82' },
  // 2026-09-04 店主核可開 §1 人工身分路線後新增的補遺批。
  // c-67 收尾時記下：Johnny's Disk 其餘 9 張、Aketa's Disk 5、Nadja 7、Union Jazz 6 在 MB 查無，
  // 走 pinned 補不了。這批專收那些「唱片實體確鑿、MB 沒建檔」的日本自主爵士盤。
  c87: { lineType: '深掘', scene: '日本自主爵士小廠 §1 人工身分補遺' },
  // c-88 是**覆蓋型**批次，不是深掘：店主 2026-09-04「冷門電影專輯有點太多了，反而耳熟能詳的不多」，
  // 要的是正典而非冷門。既有的 lineType 只有深掘／廣度兩種，取「廣度」——
  // 它補的是池子在一個主題上的覆蓋率，正是廣度的意思。
  c88: { lineType: '廣度', scene: { a: '電影原聲：主流熱門', b: '電影原聲：影展與作者電影' } },
  // 2026-09-05 店主指示「台語搖滾可以多一點」「林強、伍佰補齊」「骨肉皮時代的獨立樂團補齊」，
  // 開台灣線四批。c-89～c-91 是**目錄補完**（池中每團只有一到兩張招牌作，縱深幾乎沒有），
  // 所以 lineType 取「深掘」——它挖的是既有場景的深度，不是新場景的覆蓋率。
  // c-92 是 §1 人工身分補遺批，管線同 c-87（rgMbid 留空、fix-rgmbid 與 probe-caa-generic 都不跑）。
  c89: { lineType: '深掘', scene: { a: '林強與伍佰目錄補完', b: '新台語歌運動與台語根源 1971–99' } },
  c90: { lineType: '深掘', scene: { a: '台北地下：水晶世代 1988–95', b: '台北地下：角頭與 TCM 世代 1996–2003' } },
  c91: { lineType: '深掘', scene: { a: '台客搖滾目錄補完（董事長、濁水溪、閃靈）', b: '當代台語獨立 2007–2026' } },
  c92: { lineType: '深掘', scene: '台灣線 §1 人工身分補遺' },
  // c-93～c-102（2026-09-05 店主「接力做完十批」）：A 線目錄深度第二輪 8 批 ＋ B 線兩張最大的洞
  c93:  { lineType: '廣度', scene: { a: '搖滾正典目錄深度：後龐克與另類', b: '搖滾正典目錄深度：前衛、車庫與 90s' } },
  c94:  { lineType: '廣度', scene: { a: '金屬與硬蕊目錄深度', b: '龐克、emo 與日本另類目錄深度' } },
  c95:  { lineType: '廣度', scene: { a: '戰前藍調與芝加哥電藍調目錄深度', b: '爵士正典目錄深度：搖擺到自由' } },
  c96:  { lineType: '廣度', scene: { a: '嘻哈正典目錄深度', b: '靈魂與放克目錄深度' } },
  c97:  { lineType: '廣度', scene: { a: '電子目錄深度：house、techno 與 12 吋', b: '電子目錄深度：氛圍、具象音樂與 downtempo' } },
  c98:  { lineType: '廣度', scene: { a: '鄉村與美國民謠目錄深度', b: '歐洲與拉美民謠目錄深度' } },
  c99:  { lineType: '廣度', scene: { a: '非洲與加勒比目錄深度', b: '中東、南亞與拉丁目錄深度' } },
  c100: { lineType: '廣度', scene: '古典演奏家傳奇錄音目錄深度' },
  c101: { lineType: '廣度', scene: { a: '遊戲原聲正典：日本廠牌世代', b: '遊戲原聲正典：獨立遊戲與西方大作' } },
  c102: { lineType: '廣度', scene: { a: '動畫原聲正典：菅野・久石・梶浦世代', b: '動畫原聲正典：機械與劇伴' } },
  // 2026-09-06 店主「接著跑完」——規劃書剩下的 16 批（B 線 6／C 2／D 2／E 3／F 3）
  c103: { lineType: '廣度', scene: { a: '演歌與戰後歌謡：女聲正典', b: '演歌與戰後歌謡：男聲與昭和流行' } },
  c104: { lineType: '廣度', scene: { a: '韓國 80s–90s 歌謡與城市流行', b: '韓國 80s–90s 韓搖與민중가요' } },
  c105: { lineType: '廣度', scene: { a: 'K-pop 韓版里程碑', b: 'K-indie 第二輪' } },
  c106: { lineType: '廣度', scene: { a: '華語第三輪：上海時代曲與港星目錄', b: '華語第三輪：台語經典' } },
  c107: { lineType: '廣度', scene: { a: '中國搖滾正典：魔岩世代與北京搖滾', b: '中國獨立：後 2000 廠牌與地方場景' } },
  c108: { lineType: '廣度', scene: { a: '拉丁第二圈：chicha 與 cumbia', b: '拉丁第二圈：salsa dura 與 nueva canción' } },
  c109: { lineType: '廣度', scene: { a: '法語搖滾：Bashung 世代與 rock français', b: '法語流行與 rap français' } },
  c110: { lineType: '廣度', scene: { a: '德語搖滾與 NDW', b: '義大利搖滾與流行' } },
  c111: { lineType: '廣度', scene: { a: '2024–2025 正典：英美', b: '2024–2025 正典：日韓與華語' } },
  c112: { lineType: '廣度', scene: { a: '2026 新譜：英美', b: '2026 新譜：日韓與華語' } },
  c113: { lineType: '廣度', scene: '沖繩民謡 §1 補遺' },
  c114: { lineType: '廣度', scene: { a: '美國福音 Nashboro 補遺 I', b: '美國福音 Nashboro 補遺 II' } },
  c115: { lineType: '廣度', scene: { a: '英國 DIY 自壓盤補遺', b: '演歌批轉來的 §1 候選' } },
  c116: { lineType: '深掘', scene: { a: '日本自主 hardcore／ジャパコア', b: '日本 noise 小廠' } },
  c117: { lineType: '深掘', scene: { a: '英國 folk-rock 私壓：Leader／Trailer 系', b: '英國 folk-rock 小廠：Broadside／Village Thing 系' } },
  c118: { lineType: '深掘', scene: { a: '芝加哥 house 二線小廠 12 吋', b: '底特律與紐澤西 techno／house 二線小廠' } },
  // c-119～c-121（店主 2026-09-07 指定的三條線）
  c119: { lineType: '深掘', scene: { a: '台語獨立：創作者與本土語言', b: '台語獨立：樂團與廠牌' } },
  c120: { lineType: '深掘', scene: { a: '紐約硬蕊', b: 'youth crew／straight edge：Revelation 系' } },
  c121: { lineType: '深掘', scene: { a: '日本フリージャズ與即興演奏', b: '日本地下即興：PSF 前史' } },
  // c-122（店主 2026-09-08 核定為 hardcore 開 §5.5 白名單後成立）
  c122: { lineType: '深掘', scene: { a: '紐約硬蕊 7 吋與 demo', b: 'youth crew／straight edge 7 吋' } },
  // c-123～c-125（店主 2026-09-08：「找出獨裁體制下的音樂」）
  c123: { lineType: '廣度', scene: { a: '蘇聯愛沙尼亞地下', b: '蘇聯拉脫維亞與立陶宛地下' } },
  c124: { lineType: '廣度', scene: { a: '伊朗巴列維末期流行與 funk', b: '伊朗革命後：流亡、地下與古典' } },
  c125: { lineType: '廣度', scene: { a: '西班牙佛朗哥時期與 la Movida', b: '葡萄牙薩拉查時期與康乃馨革命' } },
  // c-126 a 組的 scene 拿掉「2010 後」：草莓救星《太陽系》2002 是池中已有樂團的最早一張，
  // 屬目錄深度、不屬年份窗口。b 組 21 張全部落在 2012–2025，窗口照留。
  c126: { lineType: '廣度', scene: { a: '台灣獨立：既有樂團的目錄深度', b: '台灣獨立 2010 後：池中全空的掛名' } },
  c127: { lineType: '廣度', scene: { a: '台灣獨立：c-126 額度外的目錄深度', b: '台灣獨立：獨立廠牌目錄挖出的新掛名' } },
  c128: { lineType: '廣度', scene: { a: '台灣獨立：c-127 額度外的廠牌目錄存貨', b: '台灣獨立：獨立廠牌目錄第二輪' } },
  // c-129 是「緬甸」擴成的東南亞體制線——MB 上緬甸掛名實測只有 3 筆，單獨撐不起一批。
  c129: { lineType: '廣度', scene: { a: '緬甸與寮國：軍政府時期', b: '印尼蘇哈托時期與泰國軍政府時期' } },
  c130: { lineType: '廣度', scene: { a: '波蘭人民共和國：搖滾與 sung poetry', b: '波蘭 1980 年代龐克與新浪潮' } },
  // c-131 起是店主 2026-09-15 指示的「爵士深度」線（「廣度應該足了 研究深度 再深挖爵士」）。
  c131: { lineType: '深掘', scene: { a: '秋吉敏子全目錄與日本爵士第一世代', b: '池中爵士名家的目錄深度' } },
  // c-132～c-134（2026-09-15 店主：「日本第一代不只秋吉 其他人也要齊全一點 其實都只要收錄重點專輯5-10張就好」）
  c132: { lineType: '深掘', scene: { a: '日本爵士第一世代：モダンジャズ主軸', b: '日本爵士第一世代：ピアノと管の目錄深度' } },
  c133: { lineType: '深掘', scene: { a: '日本爵士第一世代：ビッグバンドとコンボ', b: '日本爵士第一世代：和製ファンクとグルーヴ' } },
  c134: { lineType: '深掘', scene: { a: '日本爵士第一世代：戦後ピアノトリオ', b: '日本爵士第一世代：残る名手の重點作' } },
  // c-135～c-140（2026-09-15 店主：「美國先挖blue note」「Blue太少了 這麼多你才選198張？」）：Blue Note 1939–66 缺的 261 張，依年份與目錄號順序切六批
  c135: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1939–66）', b: 'Blue Note 目錄補齊（1939–66）' } },
  c136: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1939–66）', b: 'Blue Note 目錄補齊（1939–66）' } },
  c137: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1939–66）', b: 'Blue Note 目錄補齊（1939–66）' } },
  c138: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1939–66）', b: 'Blue Note 目錄補齊（1939–66）' } },
  c139: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1939–66）', b: 'Blue Note 目錄補齊（1939–66）' } },
  c140: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1939–66）', b: 'Blue Note 目錄補齊（1939–66）' } },
  // c-141～c-146：Blue Note 1967–84（Liberty／UA 期，含 LT 庫存系列與日本首發）缺的 243 張
  c141: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1967–84）', b: 'Blue Note 目錄補齊（1967–84）' } },
  c142: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1967–84）', b: 'Blue Note 目錄補齊（1967–84）' } },
  c143: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1967–84）', b: 'Blue Note 目錄補齊（1967–84）' } },
  c144: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1967–84）', b: 'Blue Note 目錄補齊（1967–84）' } },
  c145: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1967–84）', b: 'Blue Note 目錄補齊（1967–84）' } },
  c146: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1967–84）', b: 'Blue Note 目錄補齊（1967–84）' } },
  c147: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（§5.6 合輯正典）', b: 'Blue Note 目錄補齊（§5.6 合輯正典）' } },
  c148: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c149: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c150: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c151: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c152: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c153: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c154: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c155: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c156: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c157: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c158: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c159: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c160: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c161: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c162: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c163: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c164: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c165: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c166: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c167: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  // c168／c169／c170 是列舉層讀錯曲風層級後的補批（第 1557 條），同一條線。c168 只有 a 組。
  c168: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）' } },
  c169: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  c170: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
  // c171 是藝人軸稽核補批（第 1812-B 條）：MB 的 label-info 沒填或掛錯層級，廠牌軸列舉永遠碰不到的 25 張。
  c171: { lineType: '深掘', scene: { a: 'Blue Note 目錄補齊（1985 後）', b: 'Blue Note 目錄補齊（1985 後）' } },
};

// 給 make-cards-generic 用：查某批某組的類型標示。
export function lineOf(batch, group) {
  const def = LINES[batch];
  if (!def) return null;
  const scene = typeof def.scene === 'string' ? def.scene : (def.scene[group] || '');
  return scene ? { lineType: def.lineType, scene } : null;
}

// 直接執行才跑回填；被 import 時只提供 LINES 與 lineOf。
const RUN = process.argv[1] && process.argv[1].endsWith('label-lines.mjs');
const write = process.argv.includes('--write');
if (RUN) {
let touched = 0;
for (const [batch, def] of Object.entries(LINES)) {
  const f = path.join(ROOT, `desc-tools/batches/cards/${batch}-cards.json`);
  if (!fs.existsSync(f)) { console.log(`${batch}：查無卡單，略過`); continue; }
  const cards = JSON.parse(fs.readFileSync(f, 'utf8'));
  const seen = {};
  for (const c of cards) {
    const g = c.group || c.g || '';
    const scene = typeof def.scene === 'string' ? def.scene : (def.scene[g] || '');
    if (!scene) throw new Error(`${batch} 的組別 ${g} 沒有對應的 scene`);
    c.lineType = def.lineType;
    c.scene = scene;
    seen[`${def.lineType}／${scene}`] = (seen[`${def.lineType}／${scene}`] || 0) + 1;
  }
  if (write) fs.writeFileSync(f, JSON.stringify(cards, null, 1));
  touched += cards.length;
  console.log(`${batch}：${cards.length} 張｜` + Object.entries(seen).map(([k, n]) => `${k} ${n}`).join('、'));
}
console.log(`\n合計 ${touched} 張${write ? ' 已寫入' : '（試跑，加 --write 才寫入）'}`);
}
