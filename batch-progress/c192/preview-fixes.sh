#!/bin/bash
# c-192 a 研究層第 7604 條的兩筆試聽修正（主線第 2011-B 條）。等所有探測鏈印出 CHAIN DONE 才寫 previews.json。
cd "$(dirname "$0")/../.."
SP=${SP:-/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad}
until grep -q "CHAIN DONE" $SP/chain-c196.log 2>/dev/null; do sleep 30; done
node batch-progress/probe/manual-recover.mjs '渡辺貞夫|Bossa Nova Concert' 1868591470 jp 'c-192 a 第 7604 條：原配 1770441305 是 1961《SADAO WATANABE》（aliasOnlyTitle），正解 1868591470'
node batch-progress/probe/manual-recover.mjs 'The Great Jazz Trio|Kindness, Joy, Love & Happiness' 1443515718 jp 'c-192 a 第 7604 條：rejectedMatch「Kjlh」2002 就是本盤（七軌逐軌核過、℗ 1977）'
echo "FIXES DONE"
