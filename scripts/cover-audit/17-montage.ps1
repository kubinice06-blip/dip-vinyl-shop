# Composites the montage JPEG for step 17. ASCII comments only - this file is
# read by Windows PowerShell 5.1, which would mis-decode CJK without a BOM.
param([string]$Spec, [string]$Out)

Add-Type -AssemblyName System.Drawing

# NOTE: must NOT be named $spec. PowerShell variable names are case-insensitive,
# so $spec would alias the [string]$Spec parameter and the type constraint would
# coerce the parsed array into a string - Count then reads 1 and the whole
# montage collapses into a single row.
# Two statements on purpose. ConvertFrom-Json in PS 5.1 emits a top-level array
# as ONE object, so @(Get-Content ... | ConvertFrom-Json) yields a 1-element
# array wrapping the real one and Count reads 1. Assign first, then unroll.
$parsed = Get-Content -Raw -Encoding UTF8 $Spec | ConvertFrom-Json
$cards = @($parsed)

$IMG  = 160       # thumbnail edge
$LAB  = 16        # caption strip under each thumbnail
$GAPX = 10        # gap between the two card columns
$COLS = 2         # card columns
$MAXC = 4         # candidates per card

$cardW = $MAXC * $IMG
$cardH = $IMG + $LAB
$rows  = [math]::Ceiling($cards.Count / [double]$COLS)
$W = $COLS * $cardW + ($COLS - 1) * $GAPX
$H = $rows * $cardH

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::White)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$font  = New-Object System.Drawing.Font('Consolas', 10)
$black = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Black)
$grey  = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230,230,230))
$red   = New-Object System.Drawing.Pen([System.Drawing.Color]::Red, 3)
$blue  = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(0,110,200), 3)

for ($i = 0; $i -lt $cards.Count; $i++) {
  $card = $cards[$i]
  $col = $i % $COLS
  $row = [math]::Floor($i / $COLS)
  $x0 = $col * ($cardW + $GAPX)
  $y0 = $row * $cardH

  for ($c = 0; $c -lt $card.cells.Count; $c++) {
    $cell = $card.cells[$c]
    $x = $x0 + $c * $IMG
    $rect = New-Object System.Drawing.Rectangle($x, $y0, $IMG, $IMG)
    if ($cell.file -and (Test-Path $cell.file)) {
      try {
        $im = [System.Drawing.Image]::FromFile($cell.file)
        $g.DrawImage($im, $rect)
        $im.Dispose()
      } catch { $g.FillRectangle($grey, $rect) }
    } else {
      $g.FillRectangle($grey, $rect)
    }
    if ($cell.tag -eq 'NOW') { $g.DrawRectangle($red, $x+1, $y0+1, $IMG-3, $IMG-3) }
    elseif ($cell.tag -eq 'ORG') { $g.DrawRectangle($blue, $x+1, $y0+1, $IMG-3, $IMG-3) }
    $cap = "$($('abcd')[$c]) $($cell.label) $($cell.tag)"
    $g.DrawString($cap, $font, $black, $x + 2, $y0 + $IMG)
  }
  # card index at the far left of the caption strip, prefixed so it reads as an id
  $g.DrawString("#$($card.idx)", $font, $black, $x0 + $cardW - 52, $y0 + $IMG)
}

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ps = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ps.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82)
$bmp.Save($Out, $codec, $ps)
$g.Dispose(); $bmp.Dispose()
Write-Output "montage $W x $H -> $Out"
