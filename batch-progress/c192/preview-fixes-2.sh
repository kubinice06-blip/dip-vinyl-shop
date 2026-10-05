#!/bin/bash
# 主線第 2011-B 條：短掛名子字串誤命中兩筆降級。等 preview-fixes.sh 印出 FIXES DONE（它又等所有探測鏈）才寫 previews.json。
cd "$(dirname "$0")/../.."
SP=${SP:-/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad}
until grep -q "FIXES DONE" $SP/c192-fixes.log 2>/dev/null; do sleep 30; done
node batch-progress/probe/downgrade.mjs 'Jack DeJohnette|Have You Heard?' mainline-2011-B '誤命中：CCK《Have You Heard (Live)》2009——canon(CCK)=ck 落在 jackdejohnete 裡；c-192 b 研究第 7637 條抓到'
node batch-progress/probe/downgrade.mjs "Joe Lovano|I'm All for You" mainline-2011-B '誤命中：AAA《ALL》2007——短掛名 canon 子字串包含；主線補擋板後回掃全檔抓到'
echo "FIXES2 DONE"
