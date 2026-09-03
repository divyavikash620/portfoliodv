const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../.output/public');

if (fs.existsSync(publicDir)) {
  // 1. Create .nojekyll to prevent GitHub Pages from ignoring files starting with underscores
  fs.writeFileSync(path.join(publicDir, '.nojekyll'), '');
  console.log('Created .output/public/.nojekyll');

  // 2. Copy index.html to 404.html so GitHub Pages can route SPA requests client-side
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, path.join(publicDir, '404.html'));
    console.log('Created .output/public/404.html (SPA fallback for GitHub Pages)');
  } else {
    console.warn('Warning: .output/public/index.html was not found to generate 404.html');
  }
} else {
  console.error('.output/public directory does not exist');
}
