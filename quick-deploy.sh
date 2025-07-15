#!/bin/bash

# Quick deployment script - run this locally
# It will execute commands on your server via SSH

SERVER="olmate@vmi2708937"

echo "🚀 Deploying static sites to Coolify server..."

# Deploy all apps via SSH
ssh $SERVER << 'ENDSSH'
# Create deployment directory
mkdir -p ~/coolify-apps
cd ~/coolify-apps

# Clone the repository
echo "📦 Cloning repository..."
git clone https://github.com/brentolmate/coolify-static-sites.git
cd coolify-static-sites

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

# Check status
echo ""
echo "✅ Deployment complete! Containers running:"
docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}"
ENDSSH

echo ""
echo "🌐 Your sites should be accessible at:"
echo "   http://pulsekeeper.coolify.lan (port 3010)"
echo "   http://band44.coolify.lan (port 3011)"
echo "   http://sigil.coolify.lan (port 3012)"
echo "   http://studio.coolify.lan (port 3013)"