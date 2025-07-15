# Local Hosts File Setup

After installing Caddy on your Coolify server, configure your LOCAL machine (Mac/PC) to use the custom domains.

## Quick Setup

### On Your Mac (this machine):

1. **Open Terminal and edit hosts file:**
```bash
sudo nano /etc/hosts
```

2. **Add this line at the bottom:**
```
100.110.173.78  pulsekeeper.local band44.local sigil.local studio.local coolify.local
```

3. **Save and exit:**
- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter` to save

4. **Flush DNS cache:**
```bash
sudo dscache -flushcache
```

## How This Works

```
Your Mac → pulsekeeper.local → 100.110.173.78 → Caddy → Port 3000
         → band44.local     → 100.110.173.78 → Caddy → Port 3001
         → sigil.local      → 100.110.173.78 → Caddy → Port 3002
         → studio.local     → 100.110.173.78 → Caddy → Port 3003
```

## Testing

After setup, you can access:
- http://pulsekeeper.local (instead of http://100.110.173.78:3000)
- http://band44.local (instead of http://100.110.173.78:3001)
- http://sigil.local (instead of http://100.110.173.78:3002)
- http://studio.local (instead of http://100.110.173.78:3003)

## Deployment Order

1. ✅ Copy `setup-caddy.sh` to Coolify server
2. ✅ Run the script to install Caddy
3. ✅ Deploy apps in Coolify (note the ports)
4. ✅ Update Caddyfile if ports differ
5. ✅ Add hosts entries on your local Mac
6. ✅ Access via clean URLs!

## Alternative: Using .home domains

If .local causes issues (sometimes used by mDNS), use .home instead:

```
100.110.173.78  pulsekeeper.home band44.home sigil.home studio.home coolify.home
```

Then update the Caddyfile on the server to use .home domains.