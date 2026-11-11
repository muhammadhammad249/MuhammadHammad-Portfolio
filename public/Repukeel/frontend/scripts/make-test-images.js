/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, 'test-images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function generateTestImages() {
  const baseImagePath = path.join(__dirname, '../src/app/icon.jpg');
  if (!fs.existsSync(baseImagePath)) {
    throw new Error('Base image not found at ' + baseImagePath);
  }

  const base = sharp(baseImagePath);
  const metadata = await base.metadata();
  const width = metadata.width || 800;
  const height = metadata.height || 800;

  console.log(`Base image size: ${width}x${height}`);

  // 1. Base image (saved as standard png for baseline)
  const originalPath = path.join(outDir, '00_original.png');
  await base.clone().png().toFile(originalPath);

  // 2. Resized to 50%
  await base
    .clone()
    .resize(Math.round(width * 0.5), Math.round(height * 0.5))
    .toFile(path.join(outDir, '01_resized_50.jpg'));

  // 3. JPEG quality 30
  await base
    .clone()
    .jpeg({ quality: 30 })
    .toFile(path.join(outDir, '02_jpeg_quality_30.jpg'));

  // 4. Brightness +15% (modulate brightness: 1.15)
  await base
    .clone()
    .modulate({ brightness: 1.15 })
    .toFile(path.join(outDir, '03_brightness_plus_15.jpg'));

  // 5. Slight blur (sigma: 1.5)
  await base
    .clone()
    .blur(1.5)
    .toFile(path.join(outDir, '04_slight_blur.jpg'));

  // 6. 5% crop
  const crop5W = Math.round(width * 0.95);
  const crop5H = Math.round(height * 0.95);
  await base
    .clone()
    .extract({
      left: Math.round(width * 0.025),
      top: Math.round(height * 0.025),
      width: crop5W,
      height: crop5H,
    })
    .toFile(path.join(outDir, '05_crop_5_percent.jpg'));

  // 7. 20% crop
  const crop20W = Math.round(width * 0.8);
  const crop20H = Math.round(height * 0.8);
  await base
    .clone()
    .extract({
      left: Math.round(width * 0.1),
      top: Math.round(height * 0.1),
      width: crop20W,
      height: crop20H,
    })
    .toFile(path.join(outDir, '06_crop_20_percent.jpg'));

  // 8. 40% crop
  const crop40W = Math.round(width * 0.6);
  const crop40H = Math.round(height * 0.6);
  await base
    .clone()
    .extract({
      left: Math.round(width * 0.2),
      top: Math.round(height * 0.2),
      width: crop40W,
      height: crop40H,
    })
    .toFile(path.join(outDir, '07_crop_40_percent.jpg'));

  // 9. Horizontal mirror (flop)
  await base
    .clone()
    .flop()
    .toFile(path.join(outDir, '08_horizontal_mirror.jpg'));

  // 10. 90 degree rotation
  await base
    .clone()
    .rotate(90)
    .toFile(path.join(outDir, '09_rotated_90.jpg'));

  // 11. Small text watermark (svg overlay)
  const svgWatermark = Buffer.from(
    `<svg width="${width}" height="${height}">
      <text x="${Math.round(width * 0.05)}" y="${Math.round(height * 0.95)}" font-size="${Math.round(height * 0.05)}" fill="white" fill-opacity="0.8" font-family="sans-serif">RepuKeel Copyright Sample</text>
    </svg>`
  );
  await base
    .clone()
    .composite([{ input: svgWatermark, top: 0, left: 0 }])
    .toFile(path.join(outDir, '10_watermark.jpg'));

  // 12. Unrelated image (generate synthetic geometric pattern)
  const unrelatedSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgb(0,255,0);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <circle cx="${width/2}" cy="${height/2}" r="${width/4}" fill="yellow" />
      <polygon points="${width*0.1},${height*0.1} ${width*0.9},${height*0.2} ${width*0.5},${height*0.8}" fill="purple" opacity="0.7"/>
    </svg>`
  );
  await sharp(unrelatedSvg).png().toFile(path.join(outDir, '11_unrelated.png'));

  console.log('Successfully generated all 11 test image variants in:', outDir);
}

generateTestImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
