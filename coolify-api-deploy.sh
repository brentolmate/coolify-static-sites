#!/bin/bash

# Coolify API Deployment Script
# Run this on your local machine or on the Coolify server

COOLIFY_URL="http://100.110.173.78:3000"
REPO_URL="https://github.com/brentolmate/coolify-static-sites"

echo "🚀 Deploying apps via Coolify API..."
echo ""
echo "First, you need to get your Coolify API token:"
echo "1. Log into Coolify at $COOLIFY_URL"
echo "2. Go to Settings → API Tokens"
echo "3. Create a new token"
echo "4. Set it here:"
echo ""
read -p "Enter your Coolify API token: " API_TOKEN

# Function to create an application
create_app() {
    local name=$1
    local base_dir=$2
    local domain=$3
    
    echo "📦 Creating $name..."
    
    # Create application via API
    response=$(curl -s -X POST "$COOLIFY_URL/api/v1/applications" \
        -H "Authorization: Bearer $API_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
            "name": "'$name'",
            "gitRepository": "'$REPO_URL'",
            "gitBranch": "main",
            "baseDirectory": "'$base_dir'",
            "buildPack": "dockerfile",
            "domains": ["'$domain'"],
            "port": 80
        }')
    
    echo "Response: $response"
    echo ""
}

# Deploy all applications
create_app "pulsekeeper" "pulsekeeper-enhanced" "pulsekeeper.coolify.lan"
create_app "band44" "band44-website" "band44.coolify.lan"
create_app "sigil-weaver" "sigil-weaver" "sigil.coolify.lan"
create_app "game-studio" "game-studio" "studio.coolify.lan"

echo "✅ Deployment requests sent!"
echo ""
echo "Check Coolify dashboard for deployment status"