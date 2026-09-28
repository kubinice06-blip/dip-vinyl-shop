#!/bin/bash
# c-196 a 研究的一筆試聽誤命中降級（主線第 2012-B 條）。等 c-198 探測鏈印出 CHAIN DONE。
cd "$(dirname "$0")/../.."
SP=${SP:-/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad}
until grep -q "^CHAIN DONE" $SP/chain-c198.log 2>/dev/null; do sleep 30; done
node batch-progress/probe/downgrade.mjs 'Richie Beirach|Ballads' mainline-2012-B '誤命中：Liebman & Beirach《Balladscapes》2016——同藝人別張；本盤 Apple 查無；c-196 a 研究'
echo "FIXES6 DONE"
