#!/bin/bash
# 補跑 published gate。用法：bash scripts/run-gates.sh <stamp> <批名...>
# 每批的完整輸出存 publish-stage/gates/<批>.log；三批併行（gate 幾乎都在等封面與試聽網址的回應）。
cd "$(dirname "$0")/.." || exit 1
STAMP=$1; shift
mkdir -p publish-stage/gates
run() { b=$1; f=onboarding-manifest-$b-$STAMP.json; [ -f "$f" ] || { echo "$b: 沒有 manifest"; return; }
  node scripts/verify-album-onboarding.mjs $f --published > publish-stage/gates/$b.log 2>&1
  echo "$b: $(tail -1 publish-stage/gates/$b.log)"; grep -E "^ERROR" publish-stage/gates/$b.log | cut -c1-200; }
i=0
for b in "$@"; do run $b & i=$((i+1)); if [ $((i % ${PAR:-3})) -eq 0 ]; then wait; fi; done
wait
