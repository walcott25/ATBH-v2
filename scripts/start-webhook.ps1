param(
  [string]$NgrokToken = "3A69drXt9qFuRaYXL2eWdmZ9t0z_4Kk7dHY7g3kd7M2fT36TB",
  [int]$ProxyPort = 3001,
  [int]$FrontendPort = 3000
)

Write-Host "╔══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   ATBH Clerk Webhook Tunnel Setup              ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════╝" -ForegroundColor Cyan

# 1. Authenticate ngrok
Write-Host "`n🔑 Authenticating ngrok..." -ForegroundColor Yellow
ngrok config add-authtoken $NgrokToken 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ ngrok auth failed. Is ngrok installed?" -ForegroundColor Red
  Write-Host "   Download from: https://ngrok.com/download" -ForegroundColor Red
  exit 1
}
Write-Host "✅ ngrok authenticated" -ForegroundColor Green

# 2. Start the Express proxy server
Write-Host "`n🚀 Starting Express proxy server on port $ProxyPort..." -ForegroundColor Yellow
$proxyJob = Start-Job -ScriptBlock {
  param($port)
  Set-Location -Path $using:PWD
  $env:PROXY_PORT = $port
  npx tsx server/index.ts
} -ArgumentList $ProxyPort

Start-Sleep -Seconds 3

# Check if proxy started
$proxyRunning = Get-Job -Id $proxyJob.Id | Where-Object State -eq 'Running'
if (-not $proxyRunning) {
  Write-Host "❌ Proxy server failed to start" -ForegroundColor Red
  Receive-Job -Id $proxyJob.Id
  exit 1
}
Write-Host "✅ Express proxy running on http://localhost:$ProxyPort" -ForegroundColor Green

# 3. Start ngrok tunnel
Write-Host "`n🌐 Starting ngrok tunnel to port $ProxyPort..." -ForegroundColor Yellow
$ngrokJob = Start-Job -ScriptBlock {
  param($port)
  ngrok http $port --log=stdout
} -ArgumentList $ProxyPort

Start-Sleep -Seconds 4

# 4. Fetch the ngrok public URL
try {
  $ngrokApi = Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -ErrorAction Stop
  $publicUrl = $ngrokApi.tunnels[0].public_url
  Write-Host "`n✅ ngrok tunnel active!" -ForegroundColor Green
  Write-Host "`n╔══════════════════════════════════════════════════╗" -ForegroundColor Cyan
  Write-Host "║  Webhook URL: $publicUrl/api/webhooks/clerk" -ForegroundColor White
  Write-Host "╚══════════════════════════════════════════════════╝" -ForegroundColor Cyan
  Write-Host "`n📋 Add this URL to Clerk Dashboard:" -ForegroundColor Yellow
  Write-Host "   Dashboard → Webhooks → Add Endpoint" -ForegroundColor Gray
  Write-Host "   URL: $publicUrl/api/webhooks/clerk" -ForegroundColor White
  Write-Host "   Events: Select user.*, session.*, organization.*" -ForegroundColor Gray
  Write-Host "`n🔐 Then copy the Signing Secret into .env:" -ForegroundColor Yellow
  Write-Host "   CLERK_WEBHOOK_SIGNING_SECRET=""whsec_...""" -ForegroundColor White
  Write-Host "`n⚠️  Press Ctrl+C to stop all processes" -ForegroundColor Red
} catch {
  Write-Host "⚠️  Could not fetch ngrok URL. Check http://127.0.0.1:4040 manually" -ForegroundColor Yellow
}

# Wait for user interrupt
try {
  while ($true) { Start-Sleep -Seconds 1 }
} finally {
  Write-Host "`n🛑 Stopping processes..." -ForegroundColor Yellow
  Stop-Job -Id $proxyJob.Id -ErrorAction SilentlyContinue
  Stop-Job -Id $ngrokJob.Id -ErrorAction SilentlyContinue
  Remove-Job -Id $proxyJob.Id -ErrorAction SilentlyContinue
  Remove-Job -Id $ngrokJob.Id -ErrorAction SilentlyContinue
  Write-Host "✅ Stopped" -ForegroundColor Green
}
