#!/bin/bash
# c-194 a 研究第 7789 條的兩筆試聽誤命中降級（主線第 2011-B 條）。等 c-197 探測鏈印出 CHAIN DONE 才寫 previews.json。
cd "$(dirname "$0")/../.."
SP=${SP:-/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad}
until grep -q "^CHAIN DONE" $SP/chain-c197.log 2>/dev/null; do sleep 30; done
node batch-progress/probe/downgrade.mjs 'Aki Takase|As Time Goes By' mainline-2011-B '誤命中：高瀬アキ《AKI》1978（首作）——同一個 Apple 條目第二次配錯（第 1998-B 條 Esprit 那一次）；c-194 a 研究第 7789 條'
node batch-progress/probe/downgrade.mjs 'John Lewis & Hank Jones|Piano Play House' mainline-2011-B '誤命中：Apple 那張是同名 11 軌合輯，原 LP 六首只收兩首、試聽第 1 軌〈Mirjana〉不在本盤；c-194 a 研究第 7788／7789 條'
echo "FIXES3 DONE"
