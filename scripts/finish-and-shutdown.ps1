# 年份回填的無人值守收尾：等跑批結束 → 補跑短名卡 → Discogs 裁決 → 合併定版 → commit/push → 關機。
#
#   powershell -ExecutionPolicy Bypass -File scripts\finish-and-shutdown.ps1
#
# 安全設計：
#   - 任何一步失敗就「不關機」並保留現場，人回來看 data\finish-run.log 就知道斷在哪
#   - 關機前留 5 分鐘緩衝，隨時可用 `shutdown /a` 取消
#   - 不用 shutdown /f，讓其他程式有機會提示存檔

$ErrorActionPreference = 'Continue'
$root = 'C:\Users\User\dip-vinyl-home\dip-vinyl-shop'
Set-Location $root
$log = Join-Path $root 'data\finish-run.log'

function Write-Log($message) {
  $line = "[{0}] {1}" -f (Get-Date -Format 'MM-dd HH:mm:ss'), $message
  Write-Output $line
  Add-Content -Path $log -Value $line -Encoding utf8
}

Write-Log "=== 收尾流程啟動 ==="

# 1. 等目前那支跑批自己跑完（它已經在背景跑，這裡只是等）
Write-Log "等待進行中的 build-release-years 跑批…"
while ($true) {
  $running = Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
    Where-Object { $_.CommandLine -like '*build-release-years*' }
  if (-not $running) { break }
  Start-Sleep -Seconds 20
}
Write-Log "跑批已結束，開始收尾步驟"

# 2. 依序跑剩下的三步
$steps = @(
  @{ Name = '短名回歸補跑 186 張'; Args = @('scripts/build-release-years.mjs', '--only', 'data/short-artist-cards.json') },
  @{ Name = 'Discogs 三方裁決';    Args = @('scripts/verify-years-discogs.mjs') },
  @{ Name = '合併定版';            Args = @('scripts/merge-year-sources.mjs') },
  @{ Name = '年份寫進卡池';        Args = @('scripts/write-years-to-pool.mjs') }
)

$failedStep = $null
foreach ($step in $steps) {
  Write-Log ("開始：" + $step.Name)
  $output = & node $step.Args
  $exit = $LASTEXITCODE
  if ($output) { Add-Content -Path $log -Value $output -Encoding utf8 }
  if ($exit -ne 0) {
    Write-Log ("失敗：" + $step.Name + "（exit " + $exit + "）→ 中止，不關機")
    $failedStep = $step.Name
    break
  }
  Write-Log ("完成：" + $step.Name)
}

if ($failedStep) {
  Write-Log "=== 有步驟失敗，保留現場供人工檢查，電腦不關機 ==="
  exit 1
}

# 3. 提交成果（單人專案，直接推 main）
Write-Log "提交並推送"
git add data/release-years-v1.json data/discogs-verify-report.json data/years-pending-review.json data/release-years-recheck-report.json seed_cards.json apex_pool.json scripts/merge-year-sources.mjs scripts/write-years-to-pool.mjs scripts/finish-and-shutdown.ps1 scripts/build-release-years.mjs scripts/build-seed-genres.mjs
git commit -m "卡池發行年份：完成全池回填與 Discogs 三方裁決

無人值守收尾流程產出。詳細統計見 data/finish-run.log，
三方無共識的殘餘見 data/years-pending-review.json（未寫入資料檔）。

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
if ($LASTEXITCODE -ne 0) { Write-Log "commit 失敗（可能沒有變更），繼續" }
git push origin main
if ($LASTEXITCODE -ne 0) {
  Write-Log "push 失敗 → 不關機，保留現場"
  exit 1
}
Write-Log "已推送"

# 4. 關機（留 5 分鐘緩衝）
Write-Log "=== 全部完成，5 分鐘後關機。要取消請執行： shutdown /a ==="
shutdown /s /t 300 /c "dip vinyl 年份回填已完成，自動關機中。取消請執行 shutdown /a"
