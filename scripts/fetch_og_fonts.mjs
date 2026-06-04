#!/usr/bin/env node
/**
 * Copy Inter fonts from @fontsource/inter:
 * - WOFF → data/og/fonts/ for Satori (OFL license)
 * - WOFF2 → theme/promptanatomy/static/fonts/ for site @font-face
 * Run after npm install: npm run fonts:fetch
 */
import { mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SATORI_FONTS_DIR = join(ROOT, 'data', 'og', 'fonts');
const THEME_FONTS_DIR = join(ROOT, 'theme', 'promptanatomy', 'static', 'fonts');
const FONTSOURCE = join(ROOT, 'node_modules', '@fontsource', 'inter', 'files');

const SATORI_PAIRS = [
  ['inter-latin-400-normal.woff', 'Inter-Regular.woff'],
  ['inter-latin-700-normal.woff', 'Inter-Bold.woff'],
];

const SITE_PAIRS = [
  ['inter-latin-400-normal.woff2', 'inter-400.woff2'],
  ['inter-latin-500-normal.woff2', 'inter-500.woff2'],
  ['inter-latin-600-normal.woff2', 'inter-600.woff2'],
  ['inter-latin-700-normal.woff2', 'inter-700.woff2'],
];

function copyPairs(pairs, destDir, label) {
  mkdirSync(destDir, { recursive: true });
  for (const [srcName, destName] of pairs) {
    const src = join(FONTSOURCE, srcName);
    const dest = join(destDir, destName);
    if (!existsSync(src)) {
      throw new Error(`Missing ${src}. Run: npm install @fontsource/inter`);
    }
    copyFileSync(src, dest);
    console.log(`  ${label}: ${destName}`);
  }
}

function main() {
  console.log('Satori fonts (WOFF):');
  copyPairs(SATORI_PAIRS, SATORI_FONTS_DIR, 'satori');
  console.log('Site fonts (WOFF2):');
  copyPairs(SITE_PAIRS, THEME_FONTS_DIR, 'site');
  console.log('Fonts ready.');
}

main();
