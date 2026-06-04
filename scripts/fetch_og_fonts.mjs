#!/usr/bin/env node
/**
 * Copy Inter WOFF files from @fontsource/inter for Satori (OFL license).
 * Run after npm install: npm run fonts:fetch
 */
import { mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FONTS_DIR = join(ROOT, 'data', 'og', 'fonts');
const FONTSOURCE = join(ROOT, 'node_modules', '@fontsource', 'inter', 'files');

const PAIRS = [
  ['inter-latin-400-normal.woff', 'Inter-Regular.woff'],
  ['inter-latin-700-normal.woff', 'Inter-Bold.woff'],
];

function main() {
  mkdirSync(FONTS_DIR, { recursive: true });
  for (const [srcName, destName] of PAIRS) {
    const src = join(FONTSOURCE, srcName);
    const dest = join(FONTS_DIR, destName);
    if (!existsSync(src)) {
      throw new Error(
        `Missing ${src}. Run: npm install @fontsource/inter`
      );
    }
    copyFileSync(src, dest);
    console.log(`  copied: ${destName}`);
  }
  console.log('Fonts ready.');
}

main();
