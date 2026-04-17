# Vibe-Deploy.ps1 - Secure Deployment via Cloudflare Mesh
# Usage: .\Vibe-Deploy.ps1 -MeshIP "100.x.y.z" -RemotePath "/var/www/quick-invoice"

param (
    [Parameter(Mandatory=$false)]
    [string]$MeshIP = "100.96.0.1",
    
    [Parameter(Mandatory=$false)]
    [string]$RemotePath = "/home/ubuntu/quick-invoice",
    
    [Parameter(Mandatory=$false)]
    [string]$SSHUser = "ubuntu",

    [Parameter(Mandatory=$false)]
    [string]$SSHKey = ".\VPS\ssh-key-2026-01-06.key"
)

Write-Host "Starting Vibe Deployment to $MeshIP..." -ForegroundColor Cyan

# 1. Build the project locally (Optional, but usually needed for Next.js)
Write-Host "Building project..." -ForegroundColor Yellow
# npm run build 

# 2. Sync files over Cloudflare Mesh
Write-Host "Syncing files via private mesh fabric..." -ForegroundColor Yellow
# Using rsync if available (recommended) or scp
if (Get-Command "rsync" -ErrorAction SilentlyContinue) {
    rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' `
          -e "ssh -i $SSHKey -o StrictHostKeyChecking=no" `
          ./ ${SSHUser}@${MeshIP}:${RemotePath}
} else {
    Write-Host "rsync not found, falling back to SCP (slower)..." -ForegroundColor Magenta
    scp -i $SSHKey -r -o StrictHostKeyChecking=no `
        (Get-ChildItem -Exclude "node_modules", ".next", ".git").FullName `
        ${SSHUser}@${MeshIP}:${RemotePath}
}

# 3. Restart remote service (e.g., PM2)
Write-Host "Restarting remote services..." -ForegroundColor Yellow
ssh -i $SSHKey ${SSHUser}@${MeshIP} "cd $RemotePath && npm install && npm run build && pm2 restart all"

Write-Host "Vibe Deployment Complete!" -ForegroundColor Green
Write-Host "Preview internally at: http://$MeshIP:3000"
