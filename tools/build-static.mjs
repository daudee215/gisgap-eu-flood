// build-static.mjs — assemble dist/ for a single-file static gisgap demo.
// Overwrites in place (synced filesystems can deny unlink on locked files).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.resolve(root, 'dist');

function copyRecursive(src, dest) {
  const stats = fs.existsSync(src) && fs.statSync(src);
  if (!stats) return;
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) copyRecursive(path.join(src, child), path.join(dest, child));
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

fs.mkdirSync(dist, { recursive: true });
for (const item of ['index.html', 'data', 'docs', 'CITATION.cff']) {
  const src = path.join(root, item);
  if (fs.existsSync(src)) copyRecursive(src, path.join(dist, item));
}
console.log('Static site assembled in dist/.');
