#!/bin/bash

# Caddy Setup Script for Coolify Server
# Run this on your Coolify server (100.110.173.78)

echo "🚀 Setting up Caddy for internal domains..."

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux installation
    if command -v apt-get &> /dev/null; then
        # Debian/Ubuntu
        echo "📦 Installing Caddy on Debian/Ubuntu..."
        sudo apt update
        sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
        curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
        curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
        sudo apt update
        sudo apt install caddy
    elif command -v yum &> /dev/null; then
        # RHEL/CentOS
        echo "📦 Installing Caddy on RHEL/CentOS..."
        sudo yum install yum-plugin-copr
        sudo yum copr enable @caddy/caddy
        sudo yum install caddy
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS installation
    echo "📦 Installing Caddy on macOS..."
    if command -v brew &> /dev/null; then
        brew install caddy
    else
        echo "❌ Please install Homebrew first: https://brew.sh"
        exit 1
    fi
fi

# Create Caddy configuration directory
sudo mkdir -p /etc/caddy

# Create Caddyfile with internal domains
echo "📝 Creating Caddyfile..."
sudo tee /etc/caddy/Caddyfile > /dev/null << 'EOF'
# Coolify Internal Domains Configuration
# Access your apps with clean URLs like http://pulsekeeper.local

# Pulsekeeper - Consciousness Infrastructure
pulsekeeper.local {
    reverse_proxy localhost:3000
}

# Band 44 Website
band44.local {
    reverse_proxy localhost:3001
}

# Sigil Weaver MVP
sigil.local {
    reverse_proxy localhost:3002
}

# Game Studio Suite
studio.local {
    reverse_proxy localhost:3003
}

# Additional apps - adjust ports as needed
app1.local {
    reverse_proxy localhost:3004
}

app2.local {
    reverse_proxy localhost:3005
}

# Coolify Dashboard (if exposed on different port)
coolify.local {
    reverse_proxy localhost:80
}

# Catch-all for any .local domain
# Uncomment if you want all *.local to go to Coolify
# *.local {
#     reverse_proxy localhost:80
# }
EOF

# Start Caddy
echo "🚀 Starting Caddy..."
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo systemctl enable caddy
    sudo systemctl start caddy
    sudo systemctl status caddy
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS - start as service
    brew services start caddy
fi

# Create hosts file entries
echo ""
echo "✅ Caddy is installed and running!"
echo ""
echo "📝 Now add these entries to your LOCAL machine's hosts file:"
echo "   (NOT on the server, but on your Mac/PC)"
echo ""
echo "# For Mac/Linux: sudo nano /etc/hosts"
echo "# For Windows: edit C:\\Windows\\System32\\drivers\\etc\\hosts as admin"
echo ""
echo "# Coolify Internal Domains"
echo "100.110.173.78  pulsekeeper.local band44.local sigil.local studio.local coolify.local app1.local app2.local"
echo ""
echo "🎯 After adding hosts entries, access your sites at:"
echo "   http://pulsekeeper.local"
echo "   http://band44.local"
echo "   http://sigil.local"
echo "   http://studio.local"
echo ""
echo "📍 Note: First deploy your apps in Coolify to get the port numbers,"
echo "   then update the Caddyfile if ports are different than 3000-3003"