# Domain Setup for Coolify Deployments

## How Coolify Handles Domains

Each application in Coolify gets its own:
- Unique internal port (managed by Coolify)
- Subdomain or custom domain
- SSL certificate (auto-provisioned)

## Recommended Setup with tst.lat

### Option 1: Subdomains (Recommended)
```
pulsekeeper.tst.lat     → Pulsekeeper Enhanced
band44.tst.lat          → Band 44 Website
sigil.tst.lat           → Sigil Weaver MVP
studio.tst.lat          → Game Studio Suite
```

### Option 2: Subdirectories
```
tst.lat/pulsekeeper     → Pulsekeeper Enhanced
tst.lat/band44          → Band 44 Website
tst.lat/sigil           → Sigil Weaver MVP
tst.lat/studio          → Game Studio Suite
```

## DNS Configuration

### For Subdomains (*.tst.lat)
Add these DNS records to your domain provider:

```
Type  Name         Value
A     pulsekeeper  100.110.173.78
A     band44       100.110.173.78
A     sigil        100.110.173.78
A     studio       100.110.173.78
```

Or use a wildcard:
```
Type  Name  Value
A     *     100.110.173.78
```

### For Tailscale Access
If tst.lat is managed by Tailscale, you might need to:
1. Use Tailscale's MagicDNS
2. Or configure Tailscale Funnel for public access

## Coolify Domain Configuration

In Coolify, for each app:

1. **Go to Settings → Domains**
2. **Add domain**:
   - Pulsekeeper: `pulsekeeper.tst.lat`
   - Band 44: `band44.tst.lat`
   - Sigil: `sigil.tst.lat`
   - Studio: `studio.tst.lat`

3. **Enable**:
   - ✓ Force HTTPS redirect
   - ✓ Auto-generate SSL certificate

## Port Management

Coolify automatically:
- Assigns unique internal ports (3000, 3001, 3002, etc.)
- Uses reverse proxy (Traefik/Nginx) to route domains
- Each app's Dockerfile still exposes port 80 internally

## Access URLs After Deployment

### Public Access (if DNS configured):
- https://pulsekeeper.tst.lat
- https://band44.tst.lat
- https://sigil.tst.lat
- https://studio.tst.lat

### Tailscale Access (if not public):
- http://100.110.173.78:3000 (auto-assigned ports)
- Or through Tailscale hostnames

## Testing Domain Setup

```bash
# Test DNS resolution
dig pulsekeeper.tst.lat
nslookup pulsekeeper.tst.lat

# Test HTTPS
curl -I https://pulsekeeper.tst.lat
```