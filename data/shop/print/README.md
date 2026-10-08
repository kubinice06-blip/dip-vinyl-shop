# 店內紙本介紹卡（A6）

- 尺寸：A6 直式 105×148mm（預設）或 A7 直式 74×105mm（`--size a7`），無邊界，一張一頁。A6 內文 10.2pt、A7 內文 9pt（行距 1.5；10pt 會有 57 張塞不下）、專輯名 10.5pt。
- 內容：店名、頂點標示（殿堂／流亡／異端色塊徽章，無外框）、曲風（中文＋英文）、藝人、專輯名、三軸星等（讀 seed_cards.json；頂點卡對應軸滿 7 顆，與前台相同）、門市版介紹（`data/shop/descs.json`）、壓片年／品相（Notion 有填才顯示）、售價。不放封面。
- 產生：`node scripts/build-shop-print.mjs`（全部在售，依曲風排序）或 `--ids <Notion 頁面 id,…> --out <檔名>`。
- 轉 PDF：用 Chrome 開 HTML → 列印 → 紙張選 A6、邊界「無」、勾「背景圖形」；或用 Playwright `page.pdf({ width: '105mm', height: '148mm', printBackground: true })`。
- 後台改過的門市版文字存在 Firestore，不在 descs.json；要印改過的版本，先把改動同步回 descs.json。
