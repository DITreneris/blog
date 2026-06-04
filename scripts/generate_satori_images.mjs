#!/usr/bin/env node
/**
 * Generate Satori PNG masters and og-default.png from data/illustrations.yaml.
 *
 * Usage:
 *   node scripts/generate_satori_images.mjs
 *   node scripts/generate_satori_images.mjs --slug what-is-context-architecture
 *   node scripts/generate_satori_images.mjs --id gov-memory-types --dry-run
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { renderPng } from './lib/render.mjs';
import { getTemplate } from '../data/og/templates/index.mjs';
import { buildOgDefault, ogDefaultSize } from '../data/og/templates/og-default.mjs';
import { sizes } from '../data/og/brand.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ILLUSTRATIONS_YAML = join(ROOT, 'data', 'illustrations.yaml');
const MASTERS = join(ROOT, 'data', '01_illustrations');
const ARTICLES = join(ROOT, 'content', 'articles');
const OG_DEFAULT = join(ROOT, 'theme', 'promptanatomy', 'static', 'img', 'og-default.png');

function parseArgs(argv) {
  const out = { slug: null, id: null, dryRun: false };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === '--dry-run') out.dryRun = true;
    else if (argv[i] === '--slug') out.slug = argv[++i];
    else if (argv[i] === '--id') out.id = argv[++i];
  }
  return out;
}

function loadManifest() {
  return yaml.load(readFileSync(ILLUSTRATIONS_YAML, 'utf8'));
}

function loadFrontmatter(slug) {
  const path = join(ARTICLES, `${slug}.md`);
  if (!existsSync(path)) {
    return {};
  }
  const raw = readFileSync(path, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  return yaml.load(match[1]) || {};
}

function truncate(text, max = 120) {
  if (!text) return '';
  const s = String(text).replace(/\s+/g, ' ').trim();
  return s.length <= max ? s : `${s.slice(0, max - 1)}…`;
}

function propsFromRow(row) {
  const fm = loadFrontmatter(row.slug);
  return {
    title: fm.title || row.title || row.slug,
    category: fm.category || row.category || 'Framework',
    subtitle: truncate(fm.hero_caption || fm.summary || row.title),
  };
}

async function writePng(buffer, dest, dryRun) {
  if (dryRun) {
    console.log(`  [dry-run] would write ${dest} (${buffer.length} bytes)`);
    return;
  }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buffer);
  console.log(`  OK: ${dest.replace(ROOT + '\\', '').replace(ROOT + '/', '')} (${buffer.length} bytes)`);
}

async function renderOgDefault(dryRun) {
  console.log('Rendering og-default.png…');
  const element = buildOgDefault();
  const png = await renderPng(element, ogDefaultSize);
  await writePng(png, OG_DEFAULT, dryRun);
}

async function renderRow(row, dryRun) {
  const templateName = row.template;
  if (!templateName) {
    throw new Error(`${row.id || row.slug}: missing template for generator satori`);
  }
  const build = getTemplate(templateName);
  const props = propsFromRow(row);
  const element = build(props);
  const png = await renderPng(element, {
    width: sizes.heroWidth,
    height: sizes.heroHeight,
  });
  const dest = join(MASTERS, row.source.replace(/\\/g, '/'));
  await writePng(png, dest, dryRun);
}

async function main() {
  const args = parseArgs(process.argv);
  const manifest = loadManifest();
  let rows = (manifest.illustrations || []).filter((r) => r.generator === 'satori');

  if (args.id) {
    rows = rows.filter((r) => r.id === args.id);
  }
  if (args.slug) {
    rows = rows.filter((r) => r.slug === args.slug);
  }

  if (rows.length === 0 && !args.id && !args.slug) {
    console.log('No Satori illustration rows in manifest (og-default still renders).');
  }

  console.log(`Satori PNG generation (${rows.length} article hero(s))…`);
  for (const row of rows) {
    console.log(`  ${row.slug} [${row.template}]`);
    await renderRow(row, args.dryRun);
  }

  await renderOgDefault(args.dryRun);
  console.log('Done.');
}

main().catch((err) => {
  console.error('Satori generation failed:', err);
  process.exit(1);
});
