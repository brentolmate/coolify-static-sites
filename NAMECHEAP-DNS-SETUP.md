# Namecheap DNS Setup for tst.lat

## Step-by-Step DNS Configuration

### 1. Login to Namecheap
- Go to https://www.namecheap.com
- Sign in to your account

### 2. Navigate to DNS Settings
- Click "Domain List" in your account
- Find `tst.lat` 
- Click "Manage" button
- Click "Advanced DNS" tab

### 3. Add DNS Records

Delete any existing A records that might conflict, then add:

#### Option A: Individual Subdomains
| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | pulsekeeper | 100.110.173.78 | Automatic |
| A Record | band44 | 100.110.173.78 | Automatic |
| A Record | sigil | 100.110.173.78 | Automatic |
| A Record | studio | 100.110.173.78 | Automatic |

#### Option B: Wildcard (Easier - Covers All Subdomains)
| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | * | 100.110.173.78 | Automatic |

### 4. Save Changes
- Click "Save All Changes" (green checkmark)
- DNS propagation takes 0-48 hours (usually within 30 minutes)

## Important Considerations

### Is 100.110.173.78 Public?
This IP (100.110.173.78) appears to be a Tailscale IP (100.x.x.x range). 

**If it's Tailscale-only (not public):**
- These domains will only work when connected to Tailscale
- Consider using Tailscale Funnel for public access

**For public access, you need:**
1. A public IP address, OR
2. Tailscale Funnel enabled, OR  
3. Cloudflare Tunnel

### Testing DNS Propagation

After adding records, test with:

```bash
# Check if DNS is propagated
dig pulsekeeper.tst.lat
nslookup pulsekeeper.tst.lat

# Once propagated, you should see:
# pulsekeeper.tst.lat.    300    IN    A    100.110.173.78
```

### Alternative: Cloudflare (Free)

If you need public access without exposing Tailscale:

1. Add tst.lat to Cloudflare (free)
2. Change nameservers at Namecheap to Cloudflare's
3. Use Cloudflare Tunnel to connect to your Tailscale IP
4. Get free SSL, DDoS protection, and caching

## Next Steps in Coolify

Once DNS is configured:

1. In Coolify, for each app go to Settings → Domains
2. Add the domain (e.g., `pulsekeeper.tst.lat`)
3. Enable "Force HTTPS redirect"
4. Enable "Generate SSL Certificate"
5. Deploy!

## Troubleshooting

**If domains don't work:**
- Check DNS propagation (can take up to 48h)
- Verify Tailscale is accessible from outside
- Check Coolify's reverse proxy is running
- Look at Coolify logs for SSL cert generation

**If you see "Connection Refused":**
- The Tailscale IP might not be publicly accessible
- Consider Tailscale Funnel or Cloudflare Tunnel