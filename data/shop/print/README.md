# 店內紙本介紹卡（A6）

- 尺寸 A6 直式 105×148mm、無邊界（`@page size: 105mm 148mm; margin: 0`），一張一頁。
- 內容：店名、曲風（中文＋英文）、藝人、專輯名、門市版介紹（`data/shop/descs.json`）、壓片年／品相（Notion 有填才顯示）、售價。不放封面。
- 產生：`node scripts/build-shop-print.mjs`（全部在售，依曲風排序）或 `--ids <Notion 頁面 id,…> --out <檔名>`。
- 轉 PDF：用 Chrome 開 HTML → 列印 → 紙張選 A6、邊界「無」、勾「背景圖形」；或用 Playwright `page.pdf({ width: '105mm', height: '148mm', printBackground: true })`。
- 後台改過的門市版文字存在 Firestore，不在 descs.json；要印改過的版本，先把改動同步回 descs.json。
