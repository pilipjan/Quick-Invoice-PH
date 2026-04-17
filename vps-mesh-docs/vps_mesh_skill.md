# Antigravity Skill: Secure VPS Mesh Deployment

**Role**: This file serves as the persistence layer for VPS management for PJ.

## 🎯 Context Summary
The project is hosted on an Oracle VPS connected via Cloudflare Mesh. This allows deployment without exposing public ports.

## 🔐 Credentials & Access
- **Host**: `100.96.0.1` (Mesh Private IP)
- **User**: `ubuntu`
- **Key**: Expected at `..\VPS\ssh-key-*.key` relative to project root.

## 📋 Skill Set: "Vibe Deploy"
When the user asks to "deploy" or "sync to VPS":
1.  **Locate**: Find `vibe-deploy.ps1`.
2.  **Execute**: Run the script in the local terminal.
3.  **Verify**: Log completion and check if the app is reachable at the public URL.

## ⚠️ Known Issues
- If connection fails, check if WARP client on user's PC is connected to `pjp-tech` team.
