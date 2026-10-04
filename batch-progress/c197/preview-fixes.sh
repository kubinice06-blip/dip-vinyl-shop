#!/bin/bash
# c-197 a 研究：Farewell 誤命中降級（主線第 2012-B 條）。等 c196/preview-fixes.sh 印出 FIXES6 DONE。
cd "$(dirname "$0")/../.."
SP=${SP:-/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad}
until grep -q "FIXES6 DONE" $SP/c196-fixes.log 2>/dev/null; do sleep 30; done
node batch-progress/probe/downgrade.mjs 'Gil Evans|Farewell - Live at Sweet Basil' mainline-2012-B '誤命中：1649750964 是同系列第 1 張《Live at Sweet Basil》1984 的數位版；Farewell 在 Apple 查無；c-197 a 研究第 8242–8247 條'
echo "FIXES7 DONE"
