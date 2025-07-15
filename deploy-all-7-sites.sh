#!/bin/bash

# Deploy ALL 7 static sites to Coolify server

SERVER="olmate@vmi2708937"

echo "🚀 Deploying ALL 7 static sites to Coolify server..."

# Deploy all apps via SSH
ssh $SERVER << 'ENDSSH'
# Clean up any existing containers
echo "🧹 Cleaning up existing containers..."
docker stop pulsekeeper band44 sigil-weaver game-studio signal-patents-founder signal-patents knowledge-graph 2>/dev/null
docker rm pulsekeeper band44 sigil-weaver game-studio signal-patents-founder signal-patents knowledge-graph 2>/dev/null

# Remove old deployment directory and start fresh
rm -rf ~/coolify-apps
mkdir -p ~/coolify-apps
cd ~/coolify-apps

# Clone the repository
echo "📦 Cloning repository..."
git clone https://github.com/brentolmate/coolify-static-sites.git
cd coolify-static-sites

# Pull latest changes
git pull origin main

# Build and deploy each app
echo "🏗️ Building Pulsekeeper..."
docker build -t pulsekeeper:latest ./pulsekeeper-enhanced
docker run -d --name pulsekeeper -p 3010:80 --restart unless-stopped pulsekeeper:latest

echo "🏗️ Building Band44..."
docker build -t band44:latest ./band44-website
docker run -d --name band44 -p 3011:80 --restart unless-stopped band44:latest

echo "🏗️ Building Sigil Weaver..."
docker build -t sigil-weaver:latest ./sigil-weaver
docker run -d --name sigil-weaver -p 3012:80 --restart unless-stopped sigil-weaver:latest

echo "🏗️ Building Game Studio..."
docker build -t game-studio:latest ./game-studio
docker run -d --name game-studio -p 3013:80 --restart unless-stopped game-studio:latest

echo "🏗️ Building Signal Patents Founder..."
docker build -t signal-patents-founder:latest ./signal-patents-founder
docker run -d --name signal-patents-founder -p 3014:80 --restart unless-stopped signal-patents-founder:latest

echo "🏗️ Building Signal Patents Website..."
docker build -t signal-patents:latest ./signal-patents-website
docker run -d --name signal-patents -p 3015:80 --restart unless-stopped signal-patents:latest

echo "🏗️ Building Knowledge Graph..."
docker build -t knowledge-graph:latest ./knowledge-graph
docker run -d --name knowledge-graph -p 3016:80 --restart unless-stopped knowledge-graph:latest

# Update Caddy configuration
echo ""
echo "📝 Updating Caddy configuration..."
sudo tee /etc/caddy/Caddyfile > /dev/null << 'CADDYEOF'
# Coolify Static Sites Configuration

pulsekeeper.coolify.lan {
    reverse_proxy localhost:3010
}

band44.coolify.lan {
    reverse_proxy localhost:3011
}

sigil.coolify.lan {
    reverse_proxy localhost:3012
}

studio.coolify.lan {
    reverse_proxy localhost:3013
}

patents-founder.coolify.lan {
    reverse_proxy localhost:3014
}

patents.coolify.lan {
    reverse_proxy localhost:3015
}

knowledge.coolify.lan {
    reverse_proxy localhost:3016
}

# Alternative .local domains
pulsekeeper.local {
    reverse_proxy localhost:3010
}

band44.local {
    reverse_proxy localhost:3011
}

sigil.local {
    reverse_proxy localhost:3012
}

studio.local {
    reverse_proxy localhost:3013
}
CADDYEOF

# Reload Caddy
sudo systemctl reload caddy

# Check status
echo ""
echo "✅ Deployment complete! Containers running:"
docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}" | grep -E "pulsekeeper|band44|sigil|studio|patents|knowledge"
ENDSSH

echo ""
echo "🌐 Your 7 sites are now accessible at:"
echo "   https://pulsekeeper.coolify.lan"
echo "   https://band44.coolify.lan"
echo "   https://sigil.coolify.lan"
echo "   https://studio.coolify.lan"
echo "   https://patents-founder.coolify.lan"
echo "   https://patents.coolify.lan"
echo "   https://knowledge.coolify.lan"
echo ""
echo "📱 Or via direct ports:"
echo "   http://100.110.173.78:3010 - Pulsekeeper"
echo "   http://100.110.173.78:3011 - Band44"
echo "   http://100.110.173.78:3012 - Sigil Weaver"
echo "   http://100.110.173.78:3013 - Game Studio"
echo "   http://100.110.173.78:3014 - Signal Patents Founder"
echo "   http://100.110.173.78:3015 - Signal Patents Website"
echo "   http://100.110.173.78:3016 - Knowledge Graph"