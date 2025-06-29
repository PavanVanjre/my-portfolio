#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * This script provides guidance for optimizing images in your portfolio.
 *
 * To optimize your images:
 *
 * 1. Convert PNG/JPG to WebP format:
 *    - Use online tools like: https://convertio.co/png-webp/
 *    - Or use ImageMagick: convert image.png image.webp
 *
 * 2. Compress images:
 *    - Use TinyPNG: https://tinypng.com/
 *    - Or use ImageOptim (Mac): https://imageoptim.com/
 *
 * 3. Resize images to appropriate dimensions:
 *    - Profile image: 400x400px max
 *    - Project images: 800x600px max
 *
 * 4. Use responsive images with srcset:
 *    <img src="image.webp"
 *         srcset="image-300.webp 300w, image-600.webp 600w, image-800.webp 800w"
 *         sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 800px"
 *         alt="Description" />
 *
 * 5. Consider using a CDN for images in production
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = "./public";
const ASSETS_DIR = "./src/assets";

// Function to get file size in KB
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Function to convert image to WebP
async function convertToWebP(inputPath, outputPath, quality = 80) {
  try {
    await sharp(inputPath).webp({ quality }).toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
    return false;
  }
}

// Function to resize image
async function resizeImage(inputPath, outputPath, width, height) {
  try {
    await sharp(inputPath)
      .resize(width, height, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`Error resizing ${inputPath}:`, error.message);
    return false;
  }
}

// Function to analyze and optimize images
async function analyzeImages() {
  console.log("🔍 Analyzing images for optimization...\n");

  const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff"];
  const largeImages = [];
  const recommendations = [];

  // Check public directory
  if (fs.existsSync(PUBLIC_DIR)) {
    const publicFiles = fs.readdirSync(PUBLIC_DIR, { recursive: true });

    for (const file of publicFiles) {
      if (typeof file === "string") {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
          const filePath = path.join(PUBLIC_DIR, file);
          const size = getFileSize(filePath);

          if (parseFloat(size) > 100) {
            // Images larger than 100KB
            largeImages.push({
              path: filePath,
              size: size,
              type: "public",
            });
          }
        }
      }
    }
  }

  // Check assets directory
  if (fs.existsSync(ASSETS_DIR)) {
    const assetFiles = fs.readdirSync(ASSETS_DIR, { recursive: true });

    for (const file of assetFiles) {
      if (typeof file === "string") {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
          const filePath = path.join(ASSETS_DIR, file);
          const size = getFileSize(filePath);

          if (parseFloat(size) > 100) {
            // Images larger than 100KB
            largeImages.push({
              path: filePath,
              size: size,
              type: "assets",
            });
          }
        }
      }
    }
  }

  if (largeImages.length === 0) {
    console.log("✅ No large images found! Your images are already optimized.");
    return;
  }

  console.log("📊 Large images found:");
  largeImages.forEach((img) => {
    console.log(`  - ${img.path} (${img.size} KB)`);
  });

  console.log("\n🚀 Optimization recommendations:");

  for (const img of largeImages) {
    const ext = path.extname(img.path).toLowerCase();
    const baseName = path.basename(img.path, ext);
    const dir = path.dirname(img.path);
    const webpPath = path.join(dir, `${baseName}.webp`);

    console.log(`\n📸 ${img.path}:`);
    console.log(`   Current size: ${img.size} KB`);

    if (ext !== ".webp") {
      console.log(`   → Convert to WebP: ${webpPath}`);
      recommendations.push({
        type: "convert",
        original: img.path,
        webp: webpPath,
      });
    }

    // Check if it's a profile or project image that could be resized
    if (img.path.includes("profile-pic") || img.path.includes("Project")) {
      console.log(`   → Consider resizing for web use (max 800px width)`);
      recommendations.push({
        type: "resize",
        original: img.path,
        webp: webpPath,
        maxWidth: 800,
      });
    }
  }

  console.log("\n💡 Additional recommendations:");
  console.log("   - Use <picture> element with WebP fallback to PNG/JPG");
  console.log("   - Implement lazy loading for images below the fold");
  console.log("   - Consider using responsive images with srcset");
  console.log(
    "   - Use appropriate image dimensions for different screen sizes"
  );

  return recommendations;
}

// Function to create optimized images
async function createOptimizedImages(recommendations) {
  if (!recommendations || recommendations.length === 0) {
    return;
  }

  console.log("\n🔄 Creating optimized images...\n");

  for (const rec of recommendations) {
    if (rec.type === "convert") {
      console.log(`Converting ${rec.original} to WebP...`);
      const success = await convertToWebP(rec.original, rec.webp);
      if (success) {
        const originalSize = getFileSize(rec.original);
        const webpSize = getFileSize(rec.webp);
        const savings = (
          ((parseFloat(originalSize) - parseFloat(webpSize)) /
            parseFloat(originalSize)) *
          100
        ).toFixed(1);
        console.log(
          `  ✅ Created ${rec.webp} (${webpSize} KB, ${savings}% smaller)`
        );
      }
    } else if (rec.type === "resize") {
      console.log(`Resizing ${rec.original}...`);
      const success = await resizeImage(
        rec.original,
        rec.webp,
        rec.maxWidth,
        null
      );
      if (success) {
        const originalSize = getFileSize(rec.original);
        const webpSize = getFileSize(rec.webp);
        const savings = (
          ((parseFloat(originalSize) - parseFloat(webpSize)) /
            parseFloat(originalSize)) *
          100
        ).toFixed(1);
        console.log(
          `  ✅ Created resized ${rec.webp} (${webpSize} KB, ${savings}% smaller)`
        );
      }
    }
  }
}

// Main execution
async function main() {
  try {
    const recommendations = await analyzeImages();
    if (recommendations && recommendations.length > 0) {
      console.log("\n" + "=".repeat(50));
      const createOptimized = process.argv.includes("--create");

      if (createOptimized) {
        await createOptimizedImages(recommendations);
      } else {
        console.log("\n💡 To create optimized images, run:");
        console.log("   npm run check-images -- --create");
      }
    }
  } catch (error) {
    console.error("❌ Error analyzing images:", error.message);
  }
}

main();
