// 落實 c-54 b 組研究層的更正。冪等。
// 三處策展 why 被來源下修——curatorWhy 會餵給 hook 層，留著誇大的說法下游就會照著寫。
import fs from 'node:fs';
const FIX = [
  { key: 'Film|Zona sumraka',
    to: '札格瑞布新浪潮樂團 Film 的第二張，主唱 Jura Stublić，班底是剛從 Azra 出走的四人。注意：原策展理由稱本作是「克羅埃西亞新浪潮在流行層面影響力最大的一張」，克羅埃西亞文維基記本作評價不佳、賣五萬張、被認為犯了第二張專輯的通病，且它既不在《YU 100》也不在 2015 年克羅埃西亞版《Rolling Stone》百大（Film 上榜的是另外四張）。' },
  // 注意：《Soldatski bal》是 **Plavi Orkestar** 的，不是 Zabranjeno Pušenje 的。
  // 我第一版把這兩個團配錯了鍵，靠腳本回報「查無鍵」才發現——這正是
  // 「停手並回報」比「盡力猜一個最接近的」有價值的地方。
  { key: 'Plavi Orkestar|Soldatski bal',
    to: '塞拉耶佛樂團 Plavi Orkestar 的首作。注意：原策展理由說它「讓新原始主義從次文化進入主流」，英文維基的說法方向相反——樂團早期與該運動有關，但在這張首作上已經離開那條路線、轉向商業取向的民謠流行搖滾，樂評反應不一。新原始主義在唱片上的正典是 Zabranjeno Pušenje《Das ist Walter》，兩張不要對調。' },
  { key: 'Leb i Sol|Beskonačno',
    to: '史高比耶樂團 Leb i Sol 的作品，唱片封面上印的標題其實是符號「∞」，Beskonačno 是通稱。注意：原策展理由稱它是「樂團國際評價最高的作品之一」，查無來源，且它不在《YU 100》也不在 Rolling Stone 百大（Leb i Sol 上榜的是另外四張）。' },
  { key: 'Šarlo Akrobata / Idoli / Električni Orgazam|Paket aranžman',
    to: '貝爾格勒新浪潮的起點與宣言，1981 年由 Jugoton 發行後成為 novi talas 世代的共同起跑線；三個團日後各自的路線都能回推到這張。注意：曲子在兩面交錯編排，各團 4／4／3 首，**不是「三個團各佔一面之三」**。' },
  { key: 'Borghesia|Ljubav je hladnija od smrti',
    to: '盧比安納的電子與工業團體。注意：原策展理由說本作是 FV Založba 的第一號作品，要修正兩點——目錄號 FV-LP-001 指的是該廠牌的第一號**黑膠**，且這**不是樂團的首作而是第三張**（1983、1984 已有《Borghesia》與《Clones》），多數曲子是首張作品的重錄版。盤名與 Fassbinder 電影同名，但查不到樂團自述取名意圖的來源，不得寫成「取自該片」。' },
];
let n = 0, miss = [];
for (const p of ['batch-progress/c54/prop-a.json', 'desc-tools/batches/cards/c54-cards.json']) {
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const f of FIX) {
    const hit = rows.filter(r => `${r.artist}|${r.album}` === f.key);
    if (!hit.length) { if (!miss.includes(f.key)) miss.push(f.key); continue; }
    for (const r of hit) {
      const field = 'curatorWhy' in r ? 'curatorWhy' : 'why';
      if (r[field] !== f.to) { r[field] = f.to; n++; }
    }
  }
  fs.writeFileSync(p, JSON.stringify(rows, null, 1));
}
console.log(`更正 ${n} 處` + (miss.length ? `｜查無鍵（掛名可能不同，需人工確認）：${miss.join('、')}` : ''));
