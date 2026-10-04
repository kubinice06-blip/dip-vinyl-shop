#!/bin/bash
# 一波批次的完整上架線。用法：bash scripts/onboard-wave.sh <stamp> <批名...>
# 依 ALBUM_ONBOARDING §8 的順序：card_catalog → KV → 靜態試聽 → 回讀 → seed（上架開關）
#
# 前置（逐批先做完）：stage-cloud-batch → 封面四層（apple-cover-from-preview／fill-covers／
# itunes-covers／discogs-covers）→ check-duplicate-covers → fetch-ratings →（需要的批）anchor-obscurity --write
#
# ⚠ 一波別放太多批：整支要在一次前景呼叫的時限（十分鐘）內跑完，實測約 150 張一波。
# ⚠ **重跑同一波時加 RERUN=1**：第 2 步的 filter-manifest-new 會把「已在池中的卡」濾掉，
#   第一次跑是對的；第二次跑時卡已經進池，manifest 會被濾成空的然後刪掉（2026-09-10 一次刪了 33 份）。
# 這支原本只存在暫存目錄，2026-10-04 才收進 repo——上一輪跑完就不見了，下一輪得從對話紀錄挖回來。
cd "$(dirname "$0")/.." || exit 1
STAMP=$1; shift
BS="$@"
KVNS=5f65e74b17d644b68a3f542b08a5c105

echo "########## 1. 建 manifest ##########"
for b in $BS; do node batch-progress/build-manifest.mjs $b $STAMP 2>&1 | grep -E "候選"; done

if [ -z "$RERUN" ]; then
  echo "########## 2. 濾掉已在池中的 ##########"
  ARGS=""; for b in $BS; do ARGS="$ARGS onboarding-manifest-$b-$STAMP.json"; done
  node scripts/filter-manifest-new.mjs $ARGS | tail -3
else
  echo "########## 2. （RERUN=1，跳過濾除）##########"
fi

echo "########## 3. prepare gate ##########"
# 重跑時卡已經在池裡，prepare gate 一定會報「已存在卡池」——那是它該報的，不是錯。重跑就略過，改由 published gate 把關。
[ -n "$RERUN" ] && echo "（RERUN=1，略過 prepare gate）"
GATE_FAIL=0
[ -n "$RERUN" ] && BS_GATE="" || BS_GATE="$BS"
for b in $BS_GATE; do f=onboarding-manifest-$b-$STAMP.json; [ -f "$f" ] || continue; r=$(node scripts/verify-album-onboarding.mjs $f 2>&1); echo "$b: $(echo "$r" | tail -1)"; echo "$r" | grep -q "：0 error" || { GATE_FAIL=1; echo "$r" | grep -E "^ERROR" | head -12; }; done
if [ "$GATE_FAIL" = 1 ]; then echo "✘ prepare gate 有 error，這一波停在這裡（還沒寫任何線上資料）"; exit 1; fi

echo "########## 4. 產 card_catalog payload ##########"
for b in $BS; do f=onboarding-manifest-$b-$STAMP.json; [ -f "$f" ] || continue; node scripts/publish-manifest.mjs $f 2>&1 | sed -n '2p'; done

echo "########## 5. 推 Firestore ##########"
ARGS=""; for b in $BS; do p="publish-stage/onboarding-manifest-$b-$STAMP/card-catalog-patches.json"; [ -f "$p" ] && ARGS="$ARGS $p"; done
node scripts/push-card-catalog-patches.mjs $ARGS 2>&1 | grep -v Assertion | tail -2

echo "########## 6. KV 固定簡介 ##########"
for b in $BS; do f=onboarding-manifest-$b-$STAMP.json; [ -f "$f" ] || continue; node ../dip-vinyl-worker/scripts/desc-gen/from_onboarding_manifest.mjs $f publish-stage/kv-$b-$STAMP.json 2>&1 | tail -1; done
for b in $BS; do p=publish-stage/kv-$b-$STAMP.json; [ -f "$p" ] || continue; echo -n "$b:"; npx wrangler kv bulk put $p --namespace-id $KVNS --remote 2>&1 | grep -cE "Success!"; done

echo "########## 7. 靜態試聽 ##########"
for b in $BS; do f=onboarding-manifest-$b-$STAMP.json; [ -f "$f" ] || continue; node scripts/publish-manifest.mjs $f --write-preview 2>&1 | grep -E "已寫入靜態試聽"; done
node scripts/build-apple-audio-runtime-map.mjs 2>&1 | tail -1

echo "########## 8. 上架開關：seed ##########"
for b in $BS; do f=onboarding-manifest-$b-$STAMP.json; [ -f "$f" ] || continue; node scripts/publish-manifest.mjs $f --write-pool 2>&1 | grep -E "已追加卡池"; done
node scripts/build-seed-genres.mjs 2>&1 | tail -2

echo "########## 9. 補 published 旗標 ##########"
for b in $BS; do f=onboarding-manifest-$b-$STAMP.json; [ -f "$f" ] || continue; node scripts/mark-manifest-published.mjs $f --catalog --kv --preview 2>&1 | tail -1; done

# SKIP_GATE=1：這一波先不跑 published gate，稍後用 GATE_ONLY=1 補跑。
# gate 會逐張打封面與試聽網址；archive.org 出狀況時每張都要等逾時，一波就會超過前景時限。
if [ -n "$SKIP_GATE" ]; then echo "########## （SKIP_GATE=1，published gate 稍後補跑）##########"; exit 0; fi
echo "########## 10. published gate ##########"
for b in $BS; do f=onboarding-manifest-$b-$STAMP.json; [ -f "$f" ] || continue; echo -n "$b: "; node scripts/verify-album-onboarding.mjs $f --published 2>&1 | tail -1; done
echo "########## 這一波完成 ##########"
