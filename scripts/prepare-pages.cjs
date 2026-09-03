const fs = require('fs');
const path = require('path');

const distClientDir = path.join(__dirname, '../dist/client');
const outputPublicDir = path.join(__dirname, '../.output/public');

// 1. If dist/client exists, sync to .output/public for deployment compatibility
if (fs.existsSync(distClientDir)) {
  fs.mkdirSync(outputPublicDir, { recursive: true });
  fs.cpSync(distClientDir, outputPublicDir, { recursive: true });
  console.log('Synced dist/client static build to .output/public');
}

// 2. Ensure .output/public is fully prepared for GitHub Pages
if (fs.existsSync(outputPublicDir)) {
  // Create .nojekyll to prevent GitHub Pages Jekyll processing
  fs.writeFileSync(path.join(outputPublicDir, '.nojekyll'), '');
  console.log('Created .output/public/.nojekyll');

  // Create 404.html from index.html for SPA client-side routing on page refreshes
  const indexPath = path.join(outputPublicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, path.join(outputPublicDir, '404.html'));
    console.log('Created .output/public/404.html (SPA fallback for GitHub Pages)');
  } else {
    console.warn('Warning: index.html not found in .output/public');
  }
} else {
  console.error('.output/public directory does not exist');
}
