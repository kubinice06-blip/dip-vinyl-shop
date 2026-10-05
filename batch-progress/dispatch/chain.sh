#!/bin/bash
# 探測鏈：rgMbid 修正 → CAA 封面 → Apple 試聽 → 回撈候選。用法：bash batch-progress/dispatch/chain.sh <批> [等待的前一條鏈的 log]
# ⚠ `previews.json` 不能兩條鏈同時寫（主線第 2006-B 條）：給第二個參數就先等那一條印出 CHAIN DONE。
B=$1; WAIT=$2
cd "$(dirname "$0")/../.."
if [ -n "$WAIT" ]; then until grep -q "CHAIN DONE" "$WAIT" 2>/dev/null; do sleep 20; done; fi
set -x
node batch-progress/fix-rgmbid.mjs $B 2>&1 | tail -3
node batch-progress/probe-caa-generic.mjs $B 2>&1 | tail -3
PREVIEWS_OUT=batch-progress/probe/previews.json node batch-progress/probe/probe-previews.mjs $B 2>&1 | tail -5
node batch-progress/probe/recover-unavailable.mjs $B 2>&1 | tail -5
echo "CHAIN DONE"
