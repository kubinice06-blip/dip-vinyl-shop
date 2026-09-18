#!/usr/bin/env bash
# Cloudflare Pages 的 build command。把「網站要的檔案」組進 dist/，產線目錄留在 repo 裡不上傳。
#
# **為什麼需要這支**：這個 repo 同時是產線倉庫與網站部署來源。Pages 有 **單檔 25 MiB 上限**，
# 2026-09-16／09-17 連續三次部署因為 batch-progress/enum 的一份 33.2 MiB OCR 全文而 build 失敗，
# c-126～c-147 的 798 張卡卡在線上更新不了。`.assetsignore` 對 Pages 的 git 專案無效
# （那道檢查發生在讀清單之前），唯一能根治的是讓產線目錄根本不進輸出目錄。
#
# **排除清單是「排除法」不是「列舉法」**：預設全收，只拿掉明確屬於產線與備份的東西。
# 這樣新增一個網站頁面不會因為忘了加進白名單而消失。
set -euo pipefail

OUT=dist
rm -rf "$OUT"
mkdir -p "$OUT"

# tar 兩段式複製：比 cp 好處理萬用字元排除，且 Pages 的 build image 一定有 tar。
tar -c \
  --exclude=./.git \
  --exclude=./dist \
  --exclude=./node_modules \
  --exclude=./.wrangler \
  --exclude=./batch-progress \
  --exclude=./desc-tools \
  --exclude=./publish-stage \
  --exclude='./onboarding-manifest-*.json' \
  --exclude='./*.backup-*.json' \
  --exclude='./seed_cards.backup*.json' \
  --exclude='./apex_pool.backup*.json' \
  --exclude='./questions.backup*.json' \
  --exclude='./firestore-backup-*.json' \
  --exclude='./kv-backup-*.json' \
  . | tar -x -C "$OUT"

# 守門一：Pages 的單檔上限。與其讓 wrangler 丟一行看不懂的錯，不如在這裡講清楚是哪個檔。
BIG=$(find "$OUT" -type f -size +25M -printf '%p (%s bytes)\n' || true)
if [ -n "$BIG" ]; then
  echo "✘ dist 裡有超過 Cloudflare Pages 單檔 25 MiB 上限的檔案："
  echo "$BIG"
  echo "  → 若是產線資料，加進本腳本的排除清單；若是網站要用的，壓縮或拆檔。"
  exit 1
fi

# 守門二：網站的必要檔案一個都不能少。少了任何一個就是排除清單寫錯了，當場擋下來。
MUST="index.html find.html battle.html pvp.html roguelike.html music-map.html admin.html
seed_cards.json card-preview-status.js dip-player.js
data/apple-audio-runtime-v1.json"
for f in $MUST; do
  if [ ! -f "$OUT/$f" ]; then
    echo "✘ dist 缺少必要檔案：$f —— 排除清單寫得太寬了"
    exit 1
  fi
done

echo "✓ dist 組好了：$(find "$OUT" -type f | wc -l) 個檔案、$(du -sm "$OUT" | cut -f1) MB"
