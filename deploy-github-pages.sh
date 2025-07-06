#!/bin/bash

# Deploy to GitHub Pages script

set -e

echo "🚀 Deploying Movie Library to GitHub Pages..."

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Navigate to frontend directory
cd frontend

# Install gh-pages if not already installed
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Installing gh-pages..."
    npm install --save-dev gh-pages
fi

# Build the project
echo "🔨 Building frontend..."
npm run build

# Deploy to GitHub Pages
echo "📤 Deploying to GitHub Pages..."
npx gh-pages -d build

echo "✅ Deployment completed!"
echo "🌐 Your app will be available at: https://[your-username].github.io/[your-repo-name]"
echo ""
echo "Note: It may take a few minutes for changes to appear on GitHub Pages." 