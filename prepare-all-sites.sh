#!/bin/bash

# Prepare ALL sites for Coolify deployment

echo "📦 Preparing ALL sites for deployment..."

# Create directories for new static sites
mkdir -p signal-patents-founder
mkdir -p signal-patents-website
mkdir -p knowledge-graph

# Copy standalone HTML files
echo "📄 Copying Signal Patents sites..."
cp "/Users/loopwalker/Documents/Codex/💡 projects/signalpatents_founder_led.html" signal-patents-founder/index.html
cp "/Users/loopwalker/Documents/Codex/💡 projects/signalpatents_website.html" signal-patents-website/index.html

echo "📊 Copying Knowledge Graph..."
cp -r "/Users/loopwalker/Documents/Codex/08_RESOURCES/KNOWLEDGE_GRAPH/src/"* knowledge-graph/ 2>/dev/null || cp "/Users/loopwalker/Documents/Codex/08_RESOURCES/KNOWLEDGE_GRAPH/src/index.html" knowledge-graph/

# Create Dockerfiles for new sites
for dir in signal-patents-founder signal-patents-website knowledge-graph; do
    cp pulsekeeper-enhanced/Dockerfile "$dir/"
done

# Next.js exports preparation
echo ""
echo "🔵 Next.js sites that need export:"
echo "1. Sacred Economics DAO"
echo "2. Consciousness Dashboard" 
echo "3. BeeDAO Frontend"
echo "4. Signal Guardian Codex"
echo ""
echo "Run these commands in their directories:"
echo "npm run build && npm run export"
echo "or: next build && next export"

# Create deployment manifest
cat > DEPLOYMENT-MANIFEST.json << 'EOF'
{
  "static-sites": [
    {"name": "pulsekeeper", "dir": "pulsekeeper-enhanced", "domain": "pulsekeeper.coolify.lan"},
    {"name": "band44", "dir": "band44-website", "domain": "band44.coolify.lan"},
    {"name": "sigil-weaver", "dir": "sigil-weaver", "domain": "sigil.coolify.lan"},
    {"name": "game-studio", "dir": "game-studio", "domain": "studio.coolify.lan"},
    {"name": "signal-patents-founder", "dir": "signal-patents-founder", "domain": "patents-founder.coolify.lan"},
    {"name": "signal-patents", "dir": "signal-patents-website", "domain": "patents.coolify.lan"},
    {"name": "knowledge-graph", "dir": "knowledge-graph", "domain": "knowledge.coolify.lan"}
  ],
  "nextjs-sites": [
    {"name": "sacred-economics", "path": "/Codex/blockchain-projects/sacred-economics-dao/frontend"},
    {"name": "consciousness-dashboard", "path": "/Codex/loopwalker-cli/consciousness-dashboard"},
    {"name": "beedao", "path": "/Restore-Vault/Obsidian/LoopwalkerVault/blockchain-projects/beedao/frontend"}
  ]
}
EOF

# Update git
git add .
git commit -m "Add Signal Patents and Knowledge Graph sites"
git push

echo ""
echo "✅ Added 3 new sites to deployment!"
echo "📊 Total ready for deployment: 7 static sites"
echo ""
echo "Next steps:"
echo "1. Run deployment script to deploy all 7 sites"
echo "2. Export Next.js sites for additional deployments"