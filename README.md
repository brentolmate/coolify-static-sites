# Coolify Deployment Packages

Static websites ready for deployment to Coolify at https://100.110.173.78

## Prepared Sites

1. **pulsekeeper-enhanced/** - Consciousness Infrastructure for Gifted Youth
2. **band44-website/** - Band 44 Complete Website
3. **sigil-weaver/** - Sigil Weaver MVP Application
4. **game-studio/** - Game Studio Suite (3 pages)
   - index.html
   - mission-control.html
   - entity-profiles.html

## Deployment Instructions

### Method 1: Using Coolify UI

1. Access Coolify at https://100.110.173.78
2. Click "New Application"
3. Select "Docker" as deployment method
4. Choose deployment source:
   - Git repository (push these files to a repo)
   - Docker Hub (build and push images)
   - Direct upload

### Method 2: Build and Push Docker Images

```bash
# Build Docker images locally
cd ~/Documents/coolify-deploy/pulsekeeper-enhanced
docker build -t pulsekeeper:latest .

cd ~/Documents/coolify-deploy/band44-website
docker build -t band44:latest .

cd ~/Documents/coolify-deploy/sigil-weaver
docker build -t sigil-weaver:latest .

cd ~/Documents/coolify-deploy/game-studio
docker build -t game-studio:latest .

# Tag for your registry (replace with your registry URL)
docker tag pulsekeeper:latest your-registry/pulsekeeper:latest
docker tag band44:latest your-registry/band44:latest
docker tag sigil-weaver:latest your-registry/sigil-weaver:latest
docker tag game-studio:latest your-registry/game-studio:latest

# Push to registry
docker push your-registry/pulsekeeper:latest
docker push your-registry/band44:latest
docker push your-registry/sigil-weaver:latest
docker push your-registry/game-studio:latest
```

### Method 3: Using Git

1. Initialize git repository:
```bash
cd ~/Documents/coolify-deploy
git init
git add .
git commit -m "Initial static sites for Coolify deployment"
```

2. Push to GitHub/GitLab:
```bash
git remote add origin YOUR_REPO_URL
git push -u origin main
```

3. In Coolify:
   - Add your Git repository
   - Set build pack to "Docker"
   - Deploy each site from its subdirectory

## Testing Locally

Before deploying, test each site locally:

```bash
# Test individual sites
cd ~/Documents/coolify-deploy/pulsekeeper-enhanced
docker build -t test-site .
docker run -p 8080:80 test-site

# Visit http://localhost:8080
```

## Domain Configuration

In Coolify, configure domains for each app:
- pulsekeeper.yourdomain.com → pulsekeeper-enhanced
- band44.yourdomain.com → band44-website
- sigil.yourdomain.com → sigil-weaver
- studio.yourdomain.com → game-studio

## SSL/TLS

Coolify can automatically provision Let's Encrypt certificates when you configure domains.

## Next Steps

1. Access Coolify UI
2. Create new applications
3. Deploy using preferred method
4. Configure domains
5. Enable SSL
6. Test deployments