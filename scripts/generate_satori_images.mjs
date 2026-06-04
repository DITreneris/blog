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
const HUB_SECTIONS_YAML = join(ROOT, 'data', 'hub_sections.yaml');
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
  if (row.hub_asset === 'og') {
    const hub = yaml.load(readFileSync(HUB_SECTIONS_YAML, 'utf8'));
    return {
      title: row.title || hub?.hero?.headline || 'Prompt Anatomy',
      category: 'Knowledge Hub',
      subtitle: truncate(row.subtitle || hub?.hero?.subhead || hub?.hero?.methodology),
    };
  }
  if (row.category_slug) {
    return {
      title: row.title || row.category || 'Prompt Anatomy',
      category: row.category || row.title,
      subtitle: truncate(row.subtitle || ''),
    };
  }
  const fm = row.slug ? loadFrontmatter(row.slug) : {};
  return {
    title: fm.title || row.title || row.slug || 'Prompt Anatomy',
    category: fm.category || row.category || 'Framework',
    subtitle: truncate(fm.hero_caption || fm.summary || row.subtitle || row.title),
  };
}

function loadEmbedSrc(relativePath) {
  const abs = join(MASTERS, relativePath.replace(/\\/g, '/'));
  if (!existsSync(abs)) {
    throw new Error(`embed_source not found: ${relativePath}`);
  }
  const buf = readFileSync(abs);
  return `data:image/png;base64,${buf.toString('base64')}`;
}

function ogSourceForRow(row) {
  if (row.og_source) return row.og_source;
  if (!row.slug) return null;
  return `Satori/${row.slug}-og.png`;
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

async function renderHeroRow(row, dryRun) {
  const templateName = row.template;
  if (!templateName) {
    throw new Error(`${row.id || row.slug}: missing template for generator satori`);
  }
  const build = getTemplate(templateName);
  const props = propsFromRow(row);
  if (row.embed_source) {
    props.embedSrc = loadEmbedSrc(row.embed_source);
  }
  const element = build(props);
  const png = await renderPng(element, {
    width: sizes.heroWidth,
    height: sizes.heroHeight,
  });
  const dest = join(MASTERS, row.source.replace(/\\/g, '/'));
  await writePng(png, dest, dryRun);
}

async function renderStandaloneOgRow(row, dryRun) {
  const templateName = row.template || row.og_template || 'article-og';
  const build = getTemplate(templateName);
  const props = propsFromRow(row);
  const element = build(props);
  const png = await renderPng(element, {
    width: sizes.ogWidth,
    height: sizes.ogHeight,
  });
  const dest = join(MASTERS, row.source.replace(/\\/g, '/'));
  const label = row.slug || row.category_slug || row.id || row.hub_asset;
  console.log(`  OG surface: ${label} [${templateName}]`);
  await writePng(png, dest, dryRun);
}

async function renderOgRow(row, dryRun) {
  const ogSource = ogSourceForRow(row);
  if (!ogSource || !row.slug) return;

  const templateName = row.og_template || 'article-og';
  const build = getTemplate(templateName);
  const props = propsFromRow(row);
  const element = build(props);
  const png = await renderPng(element, {
    width: sizes.ogWidth,
    height: sizes.ogHeight,
  });
  const dest = join(MASTERS, ogSource.replace(/\\/g, '/'));
  console.log(`  OG: ${row.slug} [${templateName}]`);
  await writePng(png, dest, dryRun);
}

function rowMatchesFilter(row, args) {
  if (args.id && row.id !== args.id) return false;
  if (args.slug && row.slug !== args.slug) return false;
  return true;
}

async function main() {
  const args = parseArgs(process.argv);
  const manifest = loadManifest();
  const allRows = manifest.illustrations || [];
  let satoriRows = allRows.filter((r) => r.generator === 'satori');
  let ogRows = allRows.filter(
    (r) => (r.usage || []).includes('og') && r.slug && !r.generator
  );
  let categoryOgRows = manifest.category_og || [];

  if (args.id || args.slug) {
    satoriRows = satoriRows.filter((r) => rowMatchesFilter(r, args));
    ogRows = ogRows.filter((r) => rowMatchesFilter(r, args));
    categoryOgRows = categoryOgRows.filter((r) => rowMatchesFilter(r, args));
  }

  if (
    satoriRows.length === 0 &&
    ogRows.length === 0 &&
    categoryOgRows.length === 0 &&
    !args.id &&
    !args.slug
  ) {
    console.log('No Satori illustration rows in manifest (og-default still renders).');
  }

  console.log(
    `Satori PNG generation (${satoriRows.length} hero(s), ${ogRows.length} article OG-only, ${categoryOgRows.length} category OG)…`
  );

  for (const row of satoriRows) {
    const label = row.slug || row.id || row.hub_asset;
    if (row.hub_asset === 'og') {
      console.log(`  ${label} [${row.template}]`);
      await renderStandaloneOgRow(row, args.dryRun);
      continue;
    }
    console.log(`  ${label} [${row.template}]`);
    await renderHeroRow(row, args.dryRun);
    if ((row.usage || []).includes('og') && row.slug) {
      await renderOgRow(row, args.dryRun);
    }
  }

  for (const row of ogRows) {
    await renderOgRow(row, args.dryRun);
  }

  for (const row of categoryOgRows) {
    await renderStandaloneOgRow(row, args.dryRun);
  }

  await renderOgDefault(args.dryRun);
  console.log('Done.');
}

main().catch((err) => {
  console.error('Satori generation failed:', err);
  process.exit(1);
});
