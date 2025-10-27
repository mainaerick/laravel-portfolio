#!/bin/bash
set -e

SERVER_IP="137.184.37.67"
SERVER_PATH="/var/www/Portfolio"
REMOTE_USER="root"

echo "--------------------------------------"
echo " 🧱 Building Production Assets"
echo "--------------------------------------"

# Build locally using production .env
export APP_URL="https://portfolio.fluxnerve.com"
export FRONTEND_URL="https://portfolio.fluxnerve.com"
export ASSET_URL="https://portfolio.fluxnerve.com"

npm ci
npm run build

echo "✅ Build completed."

# Optional sanity check before deploy
if [ ! -d "public/build/assets" ]; then
  echo "❌ Build folder not found. Exiting."
  exit 1
fi

echo "--------------------------------------"
echo " 🚀 Deploying to $SERVER_IP"
echo "--------------------------------------"

rsync -avz --delete --progress public/build/ $REMOTE_USER@$SERVER_IP:$SERVER_PATH/public/build/
rsync -avz --delete --progress bootstrap/ssr/ $REMOTE_USER@$SERVER_IP:$SERVER_PATH/bootstrap/ssr/

echo "--------------------------------------"
echo " 🔄 Clearing Laravel caches remotely"
echo "--------------------------------------"

ssh $REMOTE_USER@$SERVER_IP <<EOF
cd $SERVER_PATH
php artisan optimize:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear
EOF

echo "--------------------------------------"
echo "✅ Deployment Complete!"
echo "--------------------------------------"
