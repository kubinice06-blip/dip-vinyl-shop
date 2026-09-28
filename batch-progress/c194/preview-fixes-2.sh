#!/bin/bash
# c-194 b 研究的一筆試聽誤命中降級（主線第 2012-B 條）。等 c194/preview-fixes.sh 印出 FIXES3 DONE。
cd "$(dirname "$0")/../.."
SP=${SP:-/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad}
until grep -q "FIXES3 DONE" $SP/c194-fixes.log 2>/dev/null; do sleep 30; done
node batch-progress/probe/downgrade.mjs 'Freddie Hubbard|Mistral' mainline-2012-B '誤命中：Apple 1838100485 是西班牙歌手 Nati Mistral 的碟（藝人名含本張盤名）；本盤四店皆查無；c-194 b 研究'
echo "FIXES4 DONE"
