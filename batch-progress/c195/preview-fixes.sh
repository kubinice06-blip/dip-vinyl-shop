#!/bin/bash
# c-195 b 研究第 7888 條：Three Pearls 回撈（主線第 2012-B 條）。等 c194/preview-fixes-2.sh 印出 FIXES4 DONE。
cd "$(dirname "$0")/../.."
SP=${SP:-/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad}
until grep -q "FIXES4 DONE" $SP/c194-fixes2.log 2>/dev/null; do sleep 30; done
node batch-progress/probe/manual-recover.mjs 'Chris Connor, Ernestine Anderson, Carol Sloane|Three Pearls' 1668258956 jp 'c-195 b 研究第 7888 條：策展層已找到本盤 Apple jp 條目'
echo "FIXES5 DONE"
