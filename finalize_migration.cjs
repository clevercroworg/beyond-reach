const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const auditDir = path.join(rootDir, 'beyond-reach-audit');
const legacyDir = path.join(rootDir, 'legacy');

// 1. Create legacy directory
if (!fs.existsSync(legacyDir)) {
  fs.mkdirSync(legacyDir);
}

// 2. Move Vite/React files to legacy
const filesToLegacy = [
  'src',
  'index.html',
  'vite.config.js',
  'eslint.config.js',
  'migrate.cjs',
  'migrate.js',
  'package.json',
  'package-lock.json',
  'node_modules'
];

filesToLegacy.forEach(file => {
  const srcPath = path.join(rootDir, file);
  const destPath = path.join(legacyDir, file);
  if (fs.existsSync(srcPath)) {
    try {
      fs.renameSync(srcPath, destPath);
      console.log(`Moved ${file} to legacy/`);
    } catch (e) {
      console.error(`Failed to move ${file}:`, e.message);
    }
  }
});

// 3. Move Next.js files to root
const auditFiles = fs.readdirSync(auditDir);

auditFiles.forEach(file => {
  const srcPath = path.join(auditDir, file);
  const destPath = path.join(rootDir, file);
  try {
    fs.renameSync(srcPath, destPath);
    console.log(`Moved ${file} to root/`);
  } catch (e) {
    console.error(`Failed to move ${file} to root:`, e.message);
  }
});

// 4. Remove empty beyond-reach-audit directory
try {
  fs.rmdirSync(auditDir);
  console.log(`Removed empty beyond-reach-audit directory`);
} catch (e) {
  console.error(`Failed to remove audit directory:`, e.message);
}

console.log("Migration complete!");
