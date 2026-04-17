# Cloudflare Mesh & VPS Technical Manual

This document contains the permanent technical details for your secure development environment.

## 📡 Network Identities
- **Mesh IP**: `100.96.0.1`
- **Zero Trust Org**: `pjp-tech`
- **WARP Profile**: Mesh Node (`n8n-server`)

## 🖥️ VPS Environment
- **Provider**: Oracle Cloud (ARM64)
- **Primary User**: `ubuntu`
- **App Path**: `/home/ubuntu/quick-invoice`
- **Firewall**: `ufw` (Allows `port 22`, `80`, `443`, and `100.96.0.0/12` range)

## 🛠️ Critical Troubleshooting
- **Tailscale Conflict**: Tailscale was REMOVED to prevent route clashing. Do not reinstall it alongside Cloudflare Mesh.
- **Split Tunnels**: Always ensure `100.64.0.0/10` is NOT excluded in your Cloudflare Zero Trust Device Profile (PC side).

## 🚀 Deployment Command
Run the following in PowerShell from your project root:
```powershell
.\vibe-deploy.ps1
```
