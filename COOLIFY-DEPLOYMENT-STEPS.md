# Coolify Deployment Steps

## Deploy First App (Pulsekeeper)

1. **Open Coolify**: https://100.110.173.78

2. **Create New Application**:
   - Click "New Resource" → "Application"
   - Select "Public Repository"
   
3. **Configure Repository**:
   - Repository URL: `https://github.com/brentolmate/coolify-static-sites`
   - Branch: `main`
   - Base Directory: `pulsekeeper-enhanced`
   
4. **Build Configuration**:
   - Build Pack: `Dockerfile`
   - Dockerfile Location: `./Dockerfile` (default)
   
5. **Network Configuration**:
   - Port: Leave empty (Coolify auto-assigns)
   - Domain: Leave empty for now
   
6. **Deploy**:
   - Click "Save"
   - Click "Deploy"
   - Wait for build to complete
   - Note the assigned port (e.g., 3000)

## Repeat for Other Apps

### Band 44 Website:
- Base Directory: `band44-website`
- Everything else same as above

### Sigil Weaver:
- Base Directory: `sigil-weaver`
- Everything else same as above

### Game Studio:
- Base Directory: `game-studio`
- Everything else same as above

## After Deployment

1. **Check assigned ports** in Coolify dashboard
2. **Update Caddy** if ports aren't 3000-3003:
   ```bash
   ssh YOUR_USER@100.110.173.78
   sudo nano /etc/caddy/Caddyfile
   # Update port numbers
   sudo systemctl reload caddy
   ```

3. **Test access**:
   - http://pulsekeeper.local
   - http://band44.local
   - http://sigil.local
   - http://studio.local

## Troubleshooting

**If sites don't load:**
- Check Coolify logs for each app
- Verify Caddy is running: `sudo systemctl status caddy`
- Test direct port access: `http://100.110.173.78:3000`
- Check hosts file: `cat /etc/hosts | grep local`