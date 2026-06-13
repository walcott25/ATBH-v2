import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = 'public/Images';

// Clean up any leftover temp files first
for (const f of fs.readdirSync(imagesDir)) {
  if (f.startsWith('__tmp_')) {
    fs.unlinkSync(path.join(imagesDir, f));
    console.log(`  Cleaned up stale temp: ${f}`);
  }
}

// Only process files >2MB for maximum impact per file processed
const targets = fs.readdirSync(imagesDir)
  .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
  .map(f => ({ name: f, size: fs.statSync(path.join(imagesDir, f)).size }))
  .filter(f => f.size > 2 * 1024 * 1024) // > 2MB
  .sort((a, b) => b.size - a.size);

console.log(`\nOptimizing ${targets.length} images >2MB...\n`);

let totalSaved = 0;

for (const target of targets) {
  const inputPath = path.join(imagesDir, target.name);
  const tmpPath = path.join(imagesDir, `__tmp_${target.name}`);
  const originalSize = target.size;

  try {
    let pipeline = sharp(inputPath);
    const metadata = await pipeline.metadata();
    if (metadata.width && metadata.width > 1920) {
      pipeline = pipeline.resize(1920);
    }

    await pipeline
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(tmpPath);

    const newSize = fs.statSync(tmpPath).size;
    if (newSize < originalSize) {
      fs.unlinkSync(inputPath);
      const newName = inputPath.replace(/\.(png|jpeg)$/i, '.jpg');
      fs.renameSync(tmpPath, newName);
      const saved = originalSize - newSize;
      totalSaved += saved;
      const pct = ((saved / originalSize) * 100).toFixed(1);
      console.log(`  ✓ ${target.name.padEnd(50)} ${(originalSize/1024/1024).toFixed(1)}MB → ${(newSize/1024/1024).toFixed(1)}MB (saved ${pct}%)`);
    } else {
      fs.unlinkSync(tmpPath);
      console.log(`  - ${target.name.padEnd(50)} already optimal`);
    }
  } catch (err) {
    console.error(`  ✗ ${target.name}: ${err.message}`);
    try { fs.unlinkSync(tmpPath); } catch {}
  }
}

console.log(`\n  Total saved: ${(totalSaved/1024/1024).toFixed(1)} MB\n`);
