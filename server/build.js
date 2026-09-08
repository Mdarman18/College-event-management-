/**
 * build.js — Production build script for college-event-management server
 * Uses only Node.js built-ins (fs, path) — no external dependencies needed.
 *
 * What it does:
 *   1. Cleans dist/server/ (removes old build)
 *   2. Copies server.js, src/, and package.json into dist/server/
 *   3. Skips: node_modules, .env, *.log, dev-only files
 *
 * Run: node build.js (from inside server/)
 */

const fs   = require('fs');
const path = require('path');

// ── Paths ──────────────────────────────────────────────────────────────────
const SERVER_ROOT = __dirname;                                           // server/
const DIST_DIR    = path.join(SERVER_ROOT, '..', 'dist', 'server');     // dist/server/

// ── Files / folders to copy into dist/server/ ─────────────────────────────
const COPY_TARGETS = [
  { src: path.join(SERVER_ROOT, 'server.js'),   dest: path.join(DIST_DIR, 'server.js'),  isFile: true  },
  { src: path.join(SERVER_ROOT, 'package.json'),dest: path.join(DIST_DIR, 'package.json'),isFile: true },
  { src: path.join(SERVER_ROOT, 'src'),         dest: path.join(DIST_DIR, 'src'),         isFile: false },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function log(symbol, msg) {
  console.log(`${symbol} ${msg}`);
}

function cleanDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    log('🗑 ', `Cleaned:  ${path.relative(path.join(SERVER_ROOT, '..'), dirPath)}`);
  }
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath  = path.join(src,  entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// ── Main Build ─────────────────────────────────────────────────────────────
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  🏗  Building: college-event-management/server');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Step 1: Clean
log('⚙️ ', 'Step 1/2 — Cleaning previous build...');
cleanDir(DIST_DIR);

// Step 2: Copy
log('⚙️ ', 'Step 2/2 — Copying source files...');
for (const target of COPY_TARGETS) {
  if (target.isFile) {
    copyFile(target.src, target.dest);
    log('  📄', `Copied:   ${path.basename(target.src)}`);
  } else {
    copyDir(target.src, target.dest);
    log('  📁', `Copied:   src/`);
  }
}

// ── Summary ────────────────────────────────────────────────────────────────
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  ✅ Build complete!');
console.log(`  📦 Output → dist/server/`);
console.log('');
console.log('  Next steps:');
console.log('  1. cd ../dist/server && npm install --omit=dev');
console.log('  2. node server.js  (add your .env vars first!)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
