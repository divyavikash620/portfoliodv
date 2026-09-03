const fs = require('fs');
const path = require('path');

// 1. Generate SVG Favicon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1c18" />
      <stop offset="100%" stop-color="#0f0f0c" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c9c394" />
      <stop offset="100%" stop-color="#9a9364" />
    </linearGradient>
  </defs>

  <!-- Dark charcoal capsule background -->
  <rect width="32" height="32" rx="7" fill="url(#bgGrad)" />
  <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" fill="none" stroke="#a8a274" stroke-opacity="0.4" stroke-width="1" />

  <!-- Letter D (Warm White) -->
  <path d="M6 7.5 H12 C16 7.5 18.2 10.5 18.2 16 C18.2 21.5 16 24.5 12 24.5 H6 V7.5 Z M9 10.5 V21.5 H11.8 C14 21.5 15.2 19.5 15.2 16 C15.2 12.5 14 10.5 11.8 10.5 H9 Z" fill="#f2f0e9" />

  <!-- Letter V (Accent Gold) -->
  <path d="M17 7.5 L21.5 20.5 L26 7.5 H29 L23.5 24.5 H19.5 L14 7.5 H17 Z" fill="url(#goldGrad)" />

  <!-- Subtle corner tech accent dot -->
  <circle cx="26.5" cy="22.5" r="1.2" fill="#c9c394" />
</svg>
`;

fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), svgContent, 'utf8');

// 2. Generate 32x32 BGRA bitmap for favicon.ico
const width = 32;
const height = 32;
const pixelBuffer = Buffer.alloc(width * height * 4, 0);

// Helper to draw a pixel with BGRA
function setPixel(x, y, r, g, b, a = 255) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  // BMP stores rows bottom-to-top!
  const bmpY = (height - 1 - y);
  const idx = (bmpY * width + x) * 4;
  pixelBuffer[idx] = b;
  pixelBuffer[idx + 1] = g;
  pixelBuffer[idx + 2] = r;
  pixelBuffer[idx + 3] = a;
}

// Background with rounded corners
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    // Corner rounding distance
    let inside = true;
    const r = 6;
    if (x < r && y < r && (x - r)**2 + (y - r)**2 > r**2) inside = false;
    if (x >= width - r && y < r && (x - (width - 1 - r))**2 + (y - r)**2 > r**2) inside = false;
    if (x < r && y >= height - r && (x - r)**2 + (y - (height - 1 - r))**2 > r**2) inside = false;
    if (x >= width - r && y >= height - r && (x - (width - 1 - r))**2 + (y - (height - 1 - r))**2 > r**2) inside = false;

    if (inside) {
      // Border or bg
      const isBorder = (x === 0 || x === width - 1 || y === 0 || y === height - 1);
      if (isBorder) {
        setPixel(x, y, 168, 162, 116, 255); // #a8a274 border
      } else {
        setPixel(x, y, 22, 22, 18, 255); // charcoal
      }
    }
  }
}

// Draw 'D' in white (x ~ 6 to 16, y ~ 8 to 23)
for (let y = 8; y <= 23; y++) {
  // Left bar of D
  for (let x = 6; x <= 8; x++) setPixel(x, y, 242, 240, 233);
  // Top bar of D
  if (y >= 8 && y <= 10) {
    for (let x = 6; x <= 13; x++) setPixel(x, y, 242, 240, 233);
  }
  // Bottom bar of D
  if (y >= 21 && y <= 23) {
    for (let x = 6; x <= 13; x++) setPixel(x, y, 242, 240, 233);
  }
  // Right curve of D
  if (y >= 11 && y <= 20) {
    for (let x = 13; x <= 15; x++) setPixel(x, y, 242, 240, 233);
  }
}

// Draw 'V' in gold (x ~ 16 to 27, y ~ 8 to 23)
for (let y = 8; y <= 23; y++) {
  const t = (y - 8) / 15; // 0 to 1
  const leftX = Math.round(16 + t * 5.5);
  const rightX = Math.round(27 - t * 5.5);
  for (let dx = -1; dx <= 1; dx++) {
    setPixel(leftX + dx, y, 196, 190, 143);
    setPixel(rightX + dx, y, 196, 190, 143);
  }
}

// AND mask (all 0 for opaque pixels, 1 for transparent)
const andMask = Buffer.alloc(width * height / 8, 0);

// Build ICO file
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // icon type
header.writeUInt16LE(1, 4); // 1 image

const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(width, 0);
dirEntry.writeUInt8(height, 1);
dirEntry.writeUInt8(0, 2); // colors
dirEntry.writeUInt8(0, 3); // reserved
dirEntry.writeUInt16LE(1, 4); // color planes
dirEntry.writeUInt16LE(32, 6); // bpp
const imgSize = 40 + pixelBuffer.length + andMask.length;
dirEntry.writeUInt32LE(imgSize, 8);
dirEntry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

const bmiHeader = Buffer.alloc(40);
bmiHeader.writeUInt32LE(40, 0); // biSize
bmiHeader.writeInt32LE(width, 4);
bmiHeader.writeInt32LE(height * 2, 8); // double height for icon
bmiHeader.writeUInt16LE(1, 12); // planes
bmiHeader.writeUInt16LE(32, 14); // bit count
bmiHeader.writeUInt32LE(0, 16); // compression BI_RGB
bmiHeader.writeUInt32LE(pixelBuffer.length, 20); // sizeImage
bmiHeader.writeInt32LE(0, 24);
bmiHeader.writeInt32LE(0, 28);
bmiHeader.writeUInt32LE(0, 32);
bmiHeader.writeUInt32LE(0, 36);

const icoBuf = Buffer.concat([header, dirEntry, bmiHeader, pixelBuffer, andMask]);
fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuf);
console.log('Saved public/favicon.ico and public/favicon.svg successfully!');
