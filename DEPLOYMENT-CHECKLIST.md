# Coolify Deployment Checklist

## App 1: Pulsekeeper Enhanced ✓
- **Repository**: https://github.com/brentolmate/coolify-static-sites
- **Branch**: main
- **Base Directory**: pulsekeeper-enhanced
- **Build Pack**: Dockerfile
- **Domain**: pulsekeeper.coolify.lan
- **Status**: [ ] Deployed
- **Assigned Port**: _____
- **URL**: https://pulsekeeper.coolify.lan

## App 2: Band 44 Website
- **Repository**: https://github.com/brentolmate/coolify-static-sites
- **Branch**: main
- **Base Directory**: band44-website
- **Build Pack**: Dockerfile
- **Domain**: band44.coolify.lan
- **Status**: [ ] Deployed
- **Assigned Port**: _____
- **URL**: https://band44.coolify.lan

## App 3: Sigil Weaver MVP
- **Repository**: https://github.com/brentolmate/coolify-static-sites
- **Branch**: main
- **Base Directory**: sigil-weaver
- **Build Pack**: Dockerfile
- **Domain**: sigil.coolify.lan
- **Status**: [ ] Deployed
- **Assigned Port**: _____
- **URL**: https://sigil.coolify.lan

## App 4: Game Studio Suite
- **Repository**: https://github.com/brentolmate/coolify-static-sites
- **Branch**: main
- **Base Directory**: game-studio
- **Build Pack**: Dockerfile
- **Domain**: studio.coolify.lan
- **Status**: [ ] Deployed
- **Assigned Port**: _____
- **URL**: https://studio.coolify.lan

## Quick Copy-Paste Values

### Repository URL:
```
https://github.com/brentolmate/coolify-static-sites
```

### Base Directories:
- pulsekeeper-enhanced
- band44-website
- sigil-weaver
- game-studio

### Domains:
- pulsekeeper.coolify.lan
- band44.coolify.lan
- sigil.coolify.lan
- studio.coolify.lan

## Post-Deployment Tests

```bash
# Test each app
curl -I https://pulsekeeper.coolify.lan
curl -I https://band44.coolify.lan
curl -I https://sigil.coolify.lan
curl -I https://studio.coolify.lan
```

## Troubleshooting

If deployment fails:
1. Check build logs in Coolify
2. Verify Dockerfile exists in each directory
3. Check if port 80 is exposed in Dockerfile
4. Ensure domain DNS resolves: `dig pulsekeeper.coolify.lan`