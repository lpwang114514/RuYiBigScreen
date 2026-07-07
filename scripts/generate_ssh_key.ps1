$pub = "$env:USERPROFILE\.ssh\id_ed25519.pub"
$dir = Split-Path $pub
if(-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
ssh-keygen -t ed25519 -C '3328494191@qq.com' -f $env:USERPROFILE\.ssh\id_ed25519 -N '' -q
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
Write-Output '---PUBKEY-CONTENT-START---'
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
Write-Output '---PUBKEY-CONTENT-END---'
ssh -T git@github.com -o StrictHostKeyChecking=no -o BatchMode=yes -o ConnectTimeout=10
