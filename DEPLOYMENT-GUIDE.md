# Coolify Deployment Guide

Your static sites are ready for deployment! Here's how to deploy them to Coolify.

## Current Status
✅ Docker builds tested and working
✅ Git repository initialized
✅ All sites packaged with Dockerfiles

## Sites Ready for Deployment
1. **pulsekeeper-enhanced** - Consciousness Infrastructure for Gifted Youth
2. **band44-website** - Band 44 Complete Website  
3. **sigil-weaver** - Sigil Weaver MVP Application
4. **game-studio** - Game Studio Suite (3 HTML pages)

## Option 1: GitHub Deployment (Recommended)

### Step 1: Create GitHub Repository
```bash
# If you have GitHub CLI authenticated:
gh repo create coolify-static-sites --public

# Or create manually at https://github.com/new
# Repository name: coolify-static-sites
```

### Step 2: Push to GitHub
```bash
cd ~/Documents/coolify-deploy
git remote add origin https://github.com/YOUR_USERNAME/coolify-static-sites.git
git push -u origin main
```

### Step 3: Deploy in Coolify
1. Access Coolify at https://100.110.173.78
2. Click "New Resource" → "Application"
3. Choose "Public Repository"
4. Enter: `https://github.com/YOUR_USERNAME/coolify-static-sites`
5. For each site:
   - Set "Base Directory" to the site folder (e.g., `pulsekeeper-enhanced`)
   - Build Pack: Docker
   - Port: 80

## Option 2: Direct Docker Registry

### Build and Tag Images
```bash
cd ~/Documents/coolify-deploy

# Build all images
docker build -t pulsekeeper:latest ./pulsekeeper-enhanced
docker build -t band44:latest ./band44-website
docker build -t sigil-weaver:latest ./sigil-weaver
docker build -t game-studio:latest ./game-studio

# Tag for registry (replace with your registry)
docker tag pulsekeeper:latest registry.100.110.173.78/pulsekeeper:latest
docker tag band44:latest registry.100.110.173.78/band44:latest
docker tag sigil-weaver:latest registry.100.110.173.78/sigil-weaver:latest
docker tag game-studio:latest registry.100.110.173.78/game-studio:latest
```

## Option 3: Manual Upload

If Coolify supports file upload:
1. Create a ZIP of each site folder
2. Upload through Coolify UI
3. Set Dockerfile path

## Coolify Configuration

### Environment Variables (if needed)
```
NGINX_PORT=80
```

### Domain Setup
Configure domains for each app:
- `pulsekeeper.yourdomain.com` → pulsekeeper-enhanced
- `band44.yourdomain.com` → band44-website
- `sigil.yourdomain.com` → sigil-weaver
- `studio.yourdomain.com` → game-studio

### SSL Configuration
- Enable "Force HTTPS"
- Let Coolify auto-provision Let's Encrypt certificates

## Testing Deployments

Once deployed, test each site:
```bash
# Replace with your actual domains
curl -I https://pulsekeeper.yourdomain.com
curl -I https://band44.yourdomain.com
curl -I https://sigil.yourdomain.com
curl -I https://studio.yourdomain.com
```

## Troubleshooting

### If build fails:
- Check Coolify logs
- Verify Dockerfile syntax
- Ensure port 80 is exposed

### If site doesn't load:
- Check container is running
- Verify nginx configuration
- Check domain DNS settings

## Next Steps

1. Choose your deployment method
2. Set up domains in Coolify
3. Configure SSL certificates
4. Deploy remaining sites from the original list