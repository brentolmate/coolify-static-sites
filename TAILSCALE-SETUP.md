# Tailscale-Only Access Setup

Since you want internal Tailscale access only, you have better options than public DNS:

## Option 1: Direct Tailscale Access (Easiest)

No DNS setup needed! Coolify automatically assigns ports:

```bash
# Access your sites directly via Tailscale IP + port
http://100.110.173.78:3000  # First app
http://100.110.173.78:3001  # Second app
http://100.110.173.78:3002  # Third app
http://100.110.173.78:3003  # Fourth app
```

Coolify will show you the assigned ports after deployment.

## Option 2: Tailscale MagicDNS (Recommended)

Use Tailscale's built-in DNS:

1. **Find your Tailscale machine name:**
   ```bash
   tailscale status
   ```
   Look for the machine running Coolify (e.g., `coolify-server`)

2. **Access via Tailscale hostname:**
   ```
   http://coolify-server:3000  # Pulsekeeper
   http://coolify-server:3001  # Band44
   http://coolify-server:3002  # Sigil
   http://coolify-server:3003  # Studio
   ```

## Option 3: Local Hosts File

Add custom names to your local machine:

1. **Edit hosts file:**
   ```bash
   # Mac/Linux
   sudo nano /etc/hosts
   
   # Windows (as admin)
   notepad C:\Windows\System32\drivers\etc\hosts
   ```

2. **Add entries:**
   ```
   100.110.173.78  pulsekeeper.local
   100.110.173.78  band44.local
   100.110.173.78  sigil.local
   100.110.173.78  studio.local
   ```

3. **Configure in Coolify:**
   - Set domains as `pulsekeeper.local:3000` etc.

## Recommended Approach

**For internal use, skip DNS entirely:**

1. Deploy apps to Coolify
2. Note the assigned ports (3000, 3001, etc.)
3. Access via `http://100.110.173.78:PORT`
4. Bookmark the URLs

## Deployment Steps in Coolify

1. **Go to** https://100.110.173.78

2. **Create Application:**
   - New Resource → Application
   - Public Repository
   - URL: `https://github.com/brentolmate/coolify-static-sites`
   - Base Directory: `pulsekeeper-enhanced`
   - Build Pack: Dockerfile

3. **Skip domain configuration** (leave empty)

4. **Deploy** - Coolify will assign a port

5. **Access via:** `http://100.110.173.78:[assigned-port]`

## Benefits of This Approach

✅ No DNS configuration needed
✅ Works immediately after deployment
✅ Secure - only accessible via Tailscale
✅ No SSL certificate complications
✅ Simple and straightforward

## Quick Deploy Commands

After setting up in Coolify, you'll access your sites like:

```bash
# Open in browser
open http://100.110.173.78:3000  # Pulsekeeper
open http://100.110.173.78:3001  # Band44
open http://100.110.173.78:3002  # Sigil
open http://100.110.173.78:3003  # Studio
```

Ready to deploy the first app?