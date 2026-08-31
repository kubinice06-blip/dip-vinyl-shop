// 依 2026-08-29 的 MB 缺席複查結果修正身分路線（recheck-manual-mb.mjs 的後續處置）。
//
// 背景：§1 的 MBID 窄例外要求「真的查無」。複查發現四張的 mbAbsenceProof 不成立——
// MB 其實有該專輯的 release-group，舉證落空的原因是拿卡片帶後綴的全名去做精確比對，
// 而 MB 的標題是裸名。這類卡必須改回 MBID 釘選，否則窄例外會變成逃生門、硬規則作廢。
//
// 每一筆的 MB 資料都由主線自己打 API 核實過，不是採信代理回報。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const write = process.argv.includes('--write');

// 改走 MBID 釘選的四張。mbNote 逐張寫明「核實到什麼程度」與「本機還要確認什麼」，
// 不把推測寫成已驗證。
const TO_MBID = {
  '陳光榮|無間道 電影原聲配樂': {
    rgMbid: '189a203a-611b-3258-aeca-b9ab119f131d',
    mbTitle: '無間道', mbCredit: '陳光榮', mbFirstRelease: '2002',
    mbNote: '2026-08-29 主線以 MB API 核實：RG 189a203a（Album＋secondary-type Soundtrack、首發 2002、掛陳光榮），其下 release ecee1377 為 2002 年香港 Official、廠牌 Click Music、編號 CM001、13 軌，與本卡曲目規模相符。原本的 mbAbsenceProof 結論寫「該碟未建檔」不成立——失敗原因是用帶後綴的全名「無間道 電影原聲配樂」做精確比對，MB 標題是裸名「無間道」。**廠牌欄可據此填 Click Music（CM001）**，中文維基的「Sony BMG」為誤記（該公司 2004 年才成立）。本機請覆核 secondaryTypes 應為 ["Soundtrack"]。',
    label: 'Click Music（香港，CM001）',
    secondaryTypes: ['Soundtrack'],
  },
  '張露|百代中國時代曲名典13：張露 給我一個吻': {
    rgMbid: 'e0b3dfaf-1aa0-45fb-9bec-1647b48a9709',
    mbTitle: '給我一個吻', mbCredit: '張露', mbFirstRelease: '1992',
    mbNote: '2026-08-29 主線以 MB API 核實：RG e0b3dfaf（Album＋Compilation、首發 1992、掛張露），其下 release 8d1c9b66 為 1992 年香港 Official、廠牌 Pathé 百代唱片、編號 FH81013 2、15 軌、首軌〈給我一個吻〉——與研究層獨立查到的名典 13 規格（FH81013 2、15 軌）完全吻合，確認就是本卡這張碟。原 mbAbsenceProof 不成立，原因同樣是用帶系列前綴的全名做精確比對。',
    secondaryTypes: ['Compilation'],
  },
  'S.E.N.S.|悲情城市 電影原聲帶': {
    rgMbid: '2a2fd94a-dac5-48ae-8c7f-ad35876343e1',
    mbTitle: '悲情城市サウンドトラック', mbCredit: 'S.E.N.S.', mbFirstRelease: '1990-04-25',
    mbNote: '2026-08-29 主線以 MB API 核實：RG 2a2fd94a（Album＋Soundtrack、掛 S.E.N.S.）確實存在，其下有 1990-04-25 日本盤、2014 香港盤（A City of Sadness）與 2017-08-21 台灣盤（Memory-Tech 88985459482、7 軌）。**專輯本身在 MB 有 RG，故不適用 §1 的缺席例外**；但本卡鎖定的 1989 年台灣飛碟版未見於 MB 的 release 清單，本機釘版本時請注意 RG 涵蓋範圍與卡片鎖定版本不同一件事。',
    secondaryTypes: ['Soundtrack'],
  },
  '蔡琴|蔡琴老歌': {
    rgMbid: 'a59c45da-5e7a-3db2-9cff-39785f2e6bc8',
    mbTitle: '老歌', mbCredit: '蔡琴', mbFirstRelease: '2007-12-31',
    mbNote: '2026-08-29 主線以 MB API 核實：RG a59c45da（Album、掛蔡琴、標題「老歌」）存在，其下三筆 release 為 2007-12-31 加拿大盤（10 軌，首五軌〈痴痴的等〉〈寒雨曲〉〈落花流水〉〈是夢是真〉〈總有一天等到你〉）、2013-12-20 香港盤與一筆無日期盤，皆無廠牌資訊。曲目與本卡相符，**但 MB 收錄的最早版本是 2007 年、查無 1985 年三洋飛碟原盤**。改走 MBID 釘選是因為專輯層在 MB 有 RG、缺席例外不成立；**本機請務必覆核這個 RG 指的是 1985 年原盤所屬的專輯，而不是後世另編的同名選輯**，若確認不是同一張再改回人工身分並重寫舉證。',
  },
};

// 缺席舉證成立、但結論措辭要補正的（避免本機誤釘到同名的另一張碟）
const AMEND = {
  '姚莉|百代中國時代曲名典25／26：姚莉 秋的懷念（上海時期歌曲）':
    '｜【2026-08-29 主線複查】改以「抓藝人全目錄再回頭比對標題」重查，MB 確有一筆同名碟：RG 77767f27「秋的懷念」，但那是 1962 年香港 Pathé CPA 161、10 軌的另一張選輯，與本卡鎖定的 1990 年代名典 25／26 雙 CD 不是同一件。缺席舉證維持成立，本機釘版本時請勿誤用該 RG。',
};

let changed = 0, amended = 0;
for (const f of fs.readdirSync(DIR)) {
  if (!f.startsWith('cand-')) continue;
  const p = path.join(DIR, f);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  let dirty = false;
  for (const a of j.albums || []) {
    const k = `${a.artist}|${a.album}`;
    if (TO_MBID[k]) {
      const patch = TO_MBID[k];
      if (a.identitySource !== 'manual') { console.log(`  ！ ${k} 已非人工身分，跳過`); continue; }
      // 人工身分路線的欄位在改走 MBID 後全部失效，一律移除——
      // 留著一份已知不成立的 mbAbsenceProof 在檔案裡，正是這次要修的問題本身。
      delete a.identitySource; delete a.mbAbsenceProof;
      delete a.manualRuling; delete a.manualEvidenceUrls;
      Object.assign(a, patch);
      console.log(`  ✎ ${k}\n      → rgMbid ${patch.rgMbid}`);
      changed++; dirty = true;
    }
    if (AMEND[k] && a.mbAbsenceProof) {
      a.mbAbsenceProof.conclusion = String(a.mbAbsenceProof.conclusion || '') + AMEND[k];
      console.log(`  ＋ ${k}：補正 conclusion 措辭`);
      amended++; dirty = true;
    }
  }
  if (dirty && write) fs.writeFileSync(p, JSON.stringify(j, null, 1));
}
console.log(`\n改走 MBID ${changed} 張｜補正舉證措辭 ${amended} 張｜${write ? '已寫回' : '（乾跑）'}`);
