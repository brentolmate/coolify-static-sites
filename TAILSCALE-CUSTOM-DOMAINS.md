# Custom Tailscale Internal Domains

Yes! You have several options for better internal hostnames on Tailscale:

## Option 1: Tailscale MagicDNS Custom Names

### Enable MagicDNS
1. Go to https://login.tailscale.com/admin/dns
2. Enable MagicDNS
3. Your tailnet gets a domain like: `tail1234.ts.net`

### Set Custom Machine Names
```bash
# Rename your Coolify server
sudo tailscale up --hostname=coolify

# Now access as:
# http://coolify.tail1234.ts.net:3000
```

## Option 2: Tailscale Custom Domain (Beta)

### Use Your Own Domain
1. Go to https://login.tailscale.com/admin/dns
2. Add custom domain (e.g., `internal.tst.lat`)
3. Tailscale handles DNS automatically

### Result:
```
coolify.internal.tst.lat → 100.110.173.78
pulsekeeper.internal.tst.lat → 100.110.173.78
```

## Option 3: Local DNS Server (Pi-hole/AdGuard)

### Run DNS on Tailscale Network
```bash
# Install Pi-hole on a Tailscale machine
curl -sSL https://install.pi-hole.net | bash

# Configure custom DNS entries:
coolify.home         → 100.110.173.78
pulsekeeper.home     → 100.110.173.78
band44.home          → 100.110.173.78
```

### Point Tailscale to Your DNS
1. Admin console → DNS → Nameservers
2. Add your Pi-hole's Tailscale IP
3. All devices use your custom DNS

## Option 4: Split DNS with dnsmasq

### On your Coolify server:
```bash
# Install dnsmasq
sudo apt-get install dnsmasq

# Configure /etc/dnsmasq.conf
cat >> /etc/dnsmasq.conf << EOF
# Custom domains
address=/coolify.local/100.110.173.78
address=/pulsekeeper.local/100.110.173.78
address=/band44.local/100.110.173.78
address=/sigil.local/100.110.173.78
address=/studio.local/100.110.173.78

# Wildcard for all .local domains
address=/.local/100.110.173.78
EOF

# Restart dnsmasq
sudo systemctl restart dnsmasq
```

## Option 5: Caddy Reverse Proxy (Recommended)

### Install Caddy on Coolify server:
```bash
# Install Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# Configure Caddyfile
sudo nano /etc/caddy/Caddyfile
```

### Caddyfile Configuration:
```
# Pulsekeeper
pulsekeeper.home:80 {
    reverse_proxy localhost:3000
}

# Band44
band44.home:80 {
    reverse_proxy localhost:3001
}

# Sigil
sigil.home:80 {
    reverse_proxy localhost:3002
}

# Studio
studio.home:80 {
    reverse_proxy localhost:3003
}

# Coolify Dashboard
coolify.home:80 {
    reverse_proxy localhost:3000
}
```

### Then in hosts file on each machine:
```
100.110.173.78  pulsekeeper.home band44.home sigil.home studio.home coolify.home
```

## Best Solution for You

**For simplicity + flexibility, I recommend:**

1. **Use Tailscale MagicDNS** for machine names
2. **Install Caddy** on your Coolify server
3. **Configure pretty URLs** like:
   - `http://pulsekeeper.home`
   - `http://band44.home`
   - `http://studio.home`

This gives you:
- Clean URLs (no port numbers!)
- Easy to remember
- Works on all Tailscale devices
- No external DNS needed

Want me to help you set up Caddy with nice internal domains?