#!/bin/bash

echo "Adding Coolify domains to /etc/hosts..."
echo ""
echo "This will add: pulsekeeper.local, band44.local, sigil.local, studio.local"
echo ""

# Check if entries already exist
if grep -q "pulsekeeper.local" /etc/hosts; then
    echo "⚠️  Entries already exist in /etc/hosts"
    echo "To update, first remove old entries, then run this script again"
    exit 1
fi

# Add the entries
echo "100.110.173.78  pulsekeeper.local band44.local sigil.local studio.local coolify.local" | sudo tee -a /etc/hosts

echo ""
echo "✅ Done! You can now access:"
echo "   http://pulsekeeper.local"
echo "   http://band44.local"
echo "   http://sigil.local"
echo "   http://studio.local"
echo ""
echo "Note: First deploy your apps in Coolify, then Caddy will route to the correct ports"