#!/bin/bash

# Coolify CLI Deployment Script
# This script uses Coolify's CLI to deploy all static sites

echo "🚀 Deploying static sites to Coolify..."
echo "Note: This assumes Coolify CLI is installed and configured"

# Function to create and deploy an app
deploy_app() {
    local app_name=$1
    local base_dir=$2
    local domain=$3
    
    echo ""
    echo "📦 Deploying $app_name..."
    echo "   Repository: https://github.com/brentolmate/coolify-static-sites"
    echo "   Base Directory: $base_dir"
    echo "   Domain: $domain"
    
    # These are example commands - adjust based on your Coolify version
    # Option 1: Using Coolify API
    # curl -X POST http://localhost:3000/api/v1/applications \
    #   -H "Authorization: Bearer YOUR_API_TOKEN" \
    #   -d "{
    #     \"name\": \"$app_name\",
    #     \"repository\": \"https://github.com/brentolmate/coolify-static-sites\",
    #     \"branch\": \"main\",
    #     \"baseDirectory\": \"$base_dir\",
    #     \"buildPack\": \"dockerfile\",
    #     \"domain\": \"$domain\"
    #   }"
    
    # Option 2: Using docker-compose directly
    cat > /tmp/${app_name}-docker-compose.yml << EOF
version: '3.8'
services:
  ${app_name}:
    build:
      context: https://github.com/brentolmate/coolify-static-sites.git#main:${base_dir}
      dockerfile: Dockerfile
    ports:
      - "0:80"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.${app_name}.rule=Host(\`${domain}\`)"
      - "traefik.http.services.${app_name}.loadbalancer.server.port=80"
    restart: unless-stopped
EOF
    
    echo "   Created compose file for $app_name"
}

# Deploy all applications
deploy_app "pulsekeeper" "pulsekeeper-enhanced" "pulsekeeper.coolify.lan"
deploy_app "band44" "band44-website" "band44.coolify.lan"
deploy_app "sigil" "sigil-weaver" "sigil.coolify.lan"
deploy_app "studio" "game-studio" "studio.coolify.lan"

echo ""
echo "✅ Deployment scripts created!"
echo ""
echo "To complete deployment:"
echo "1. Copy this script to your Coolify server"
echo "2. Review the docker-compose files in /tmp/"
echo "3. Deploy using Coolify UI or docker-compose"
echo ""
echo "Or use Coolify UI directly with the settings above"