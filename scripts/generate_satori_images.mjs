#!/usr/bin/env node
/**
 * Generate Satori PNG masters and og-default.png from data/illustrations.yaml.
 *
 * Usage:
 *   node scripts/generate_satori_images.mjs
 *   node scripts/generate_satori_images.mjs --slug what-is-context-architecture
 *   node scripts/generate_satori_images.mjs --id gov-memory-types --dry-run
 *   node scripts/generate_satori_images.mjs --only hero
 *   node scripts/generate_satori_images.mjs --only og
 *   node scripts/generate_satori_images.mjs --check
 *
 * On Windows, prefer `node scripts/...` over `npm run build:satori -- --slug`
 * (npm may mis-pass extra args).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { renderPng } from './lib/render.mjs';
import { getTemplate } from '../data/og/templates/index.mjs';
import { buildOgDefault, ogDefaultSize } from '../data/og/templates/og-default.mjs';
import { sizes } from '../data/og/brand.mjs';
import { heroSubtitleMax, ogSubtitleMax } from '../data/og/typography.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ILLUSTRATIONS_YAML = join(ROOT, 'data', 'illustrations.yaml');
const HUB_SECTIONS_YAML = join(ROOT, 'data', 'hub_sections.yaml');
const MASTERS = join(ROOT, 'data', '01_illustrations');
const ARTICLES = join(ROOT, 'content', 'articles');
const OG_DEFAULT = join(ROOT, 'theme', 'promptanatomy', 'static', 'img', 'og-default.png');

function parseArgs(argv) {
  const out = { slug: null, id: null, dryRun: false, only: null, check: false };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === '--dry-run') out.dryRun = true;
    else if (argv[i] === '--check') out.check = true;
    else if (argv[i] === '--slug') out.slug = argv[++i];
    else if (argv[i] === '--id') out.id = argv[++i];
    else if (argv[i] === '--only') {
      const val = argv[++i];
      if (!['hero', 'og', 'og-default'].includes(val)) {
        throw new Error(`--only must be hero, og, or og-default (got: ${val})`);
      }
      out.only = val;
    }
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

function truncate(text, max) {
  if (!text) return '';
  const s = String(text).replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const slice = s.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > max * 0.5 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trim()}…`;
}

function rawSubtitleFromRow(row) {
  if (row.subtitle) {
    return row.subtitle;
  }
  if (row.hub_asset === 'og') {
    const hub = yaml.load(readFileSync(HUB_SECTIONS_YAML, 'utf8'));
    return (
      hub?.hero?.og_subhead ||
      row.subtitle ||
      hub?.hero?.subhead ||
      hub?.hero?.methodology ||
      ''
    );
  }
  if (row.category_slug) {
    return row.subtitle || '';
  }
  const fm = row.slug ? loadFrontmatter(row.slug) : {};
  return fm.hero_caption || fm.summary || row.subtitle || row.title || '';
}

function propsFromRow(row, surface = 'hero') {
  const subtitleMax = surface === 'og' ? ogSubtitleMax : heroSubtitleMax;
  const rawSubtitle = rawSubtitleFromRow(row);
  const subtitle =
    row.hub_asset === 'og' ? rawSubtitle : truncate(rawSubtitle, subtitleMax);

  if (row.hub_asset === 'og') {
    const hub = yaml.load(readFileSync(HUB_SECTIONS_YAML, 'utf8'));
    return {
      title: row.title || hub?.hero?.headline || 'Prompt Anatomy',
      category: 'Knowledge Hub',
      subtitle,
    };
  }
  if (row.category_slug) {
    return {
      title: row.title || row.category || 'Prompt Anatomy',
      category: row.category || row.title,
      subtitle,
    };
  }
  const fm = row.slug ? loadFrontmatter(row.slug) : {};
  const props = {
    title: row.satori_title || fm.title || row.title || row.slug || 'Prompt Anatomy',
    category: fm.category || row.category || 'Framework',
    subtitle,
    slug: row.slug || '',
  };
  const diagramKeys = [
    'variant', 'emphasis', 'vertical', 'leftTitle', 'rightTitle', 'leftItems', 'rightItems',
    'rungs', 'footer', 'tiers', 'metricStart', 'metricEnd', 'emptyGrid', 'showReleaseFlow',
    'workflowFooter', 'beforeItems', 'afterItems', 'beforeTitle', 'afterTitle',
    'slots', 'cadenceTitle', 'sections', 'phases', 'canvasTitle', 'layers', 'badgeLabel',
  ];
  for (const key of diagramKeys) {
    if (row[key] !== undefined) props[key] = row[key];
  }
  return props;
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

function relPath(dest) {
  return dest.replace(ROOT + '\\', '').replace(ROOT + '/', '');
}

function logRenderMeta(label, templateName, props, surface) {
  console.log(
    `    surface=${surface} template=${templateName} titleLen=${(props.title || '').length} subtitleLen=${(props.subtitle || '').length}`
  );
}

async function writePng(buffer, dest, dryRun) {
  if (dryRun) {
    console.log(`  [dry-run] would write ${relPath(dest)} (${buffer.length} bytes)`);
    return;
  }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buffer);
  console.log(`  OK: ${relPath(dest)} (${buffer.length} bytes)`);
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
  const props = propsFromRow(row, 'hero');
  if (row.embed_source) {
    props.embedSrc = loadEmbedSrc(row.embed_source);
  }
  const label = row.slug || row.id || row.hub_asset;
  logRenderMeta(label, templateName, props, 'hero');
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
  const props = propsFromRow(row, 'og');
  const label = row.slug || row.category_slug || row.id || row.hub_asset;
  logRenderMeta(label, templateName, props, 'og');
  const element = build(props);
  const png = await renderPng(element, {
    width: sizes.ogWidth,
    height: sizes.ogHeight,
  });
  const dest = join(MASTERS, row.source.replace(/\\/g, '/'));
  console.log(`  OG surface: ${label} [${templateName}]`);
  await writePng(png, dest, dryRun);
}

async function renderOgRow(row, dryRun) {
  const ogSource = ogSourceForRow(row);
  if (!ogSource || !row.slug) return;

  const templateName = row.og_template || 'article-og';
  const build = getTemplate(templateName);
  const props = propsFromRow(row, 'og');
  logRenderMeta(row.slug, templateName, props, 'og');
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

function masterPath(relative) {
  return join(MASTERS, String(relative).replace(/\\/g, '/'));
}

function collectMissingAssets(manifest) {
  const missing = [];
  const allRows = manifest.illustrations || [];

  for (const row of allRows) {
    const rowId = row.id || row.slug || '?';
    if (row.generator === 'satori' && row.source) {
      if (!existsSync(masterPath(row.source))) {
        missing.push({ rowId, path: row.source, kind: 'hero' });
      }
    }
    if ('og' in (row.usage || []) && row.slug) {
      const ogSrc = ogSourceForRow(row);
      if (ogSrc && !existsSync(masterPath(ogSrc))) {
        missing.push({ rowId, path: ogSrc, kind: 'og' });
      }
    }
  }

  for (const row of manifest.category_og || []) {
    const rowId = row.id || row.category_slug || '?';
    if (row.source && !existsSync(masterPath(row.source))) {
      missing.push({ rowId, path: row.source, kind: 'category-og' });
    }
  }

  const hubOg = (manifest.hub_images || {}).og;
  if (hubOg) {
    const hubRow = allRows.find((r) => r.hub_asset === 'og');
    if (hubRow?.source && !existsSync(masterPath(hubRow.source))) {
      missing.push({ rowId: 'hub-og', path: hubRow.source, kind: 'hub-og' });
    }
  }

  if (!existsSync(OG_DEFAULT)) {
    missing.push({ rowId: 'og-default', path: relPath(OG_DEFAULT), kind: 'og-default' });
  }

  return missing;
}

function runCheck(manifest) {
  const missing = collectMissingAssets(manifest);
  if (missing.length === 0) {
    console.log('Satori asset check OK — all expected masters present.');
    return 0;
  }
  console.error('Missing Satori assets:');
  for (const m of missing) {
    const loc =
      m.kind === 'og-default' ? m.path : `data/01_illustrations/${m.path}`;
    console.error(`  - ${m.rowId} (${m.kind}): ${loc}`);
  }
  console.error(`Run: node scripts/generate_satori_images.mjs --only hero && --only og`);
  return 1;
}

async function main() {
  const args = parseArgs(process.argv);
  const manifest = loadManifest();

  if (args.check) {
    process.exit(runCheck(manifest));
  }

  const only = args.only;
  const runHero = !only || only === 'hero';
  const runOg = !only || only === 'og';
  const runOgDefault =
    (!only || only === 'og-default') && !args.slug && !args.id;

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

  const heroCount = runHero
    ? satoriRows.filter((r) => r.hub_asset !== 'og').length
    : 0;
  const ogCount = runOg
    ? ogRows.length +
      categoryOgRows.length +
      satoriRows.filter((r) => (r.usage || []).includes('og') && r.slug).length +
      satoriRows.filter((r) => r.hub_asset === 'og').length
    : 0;

  console.log(
    `Satori PNG generation (heroes=${heroCount}, og surfaces≈${ogCount}${only ? `, --only ${only}` : ''})…`
  );

  if (runHero) {
    for (const row of satoriRows) {
      if (row.hub_asset === 'og') continue;
      const label = row.slug || row.id || row.hub_asset;
      console.log(`  ${label} [${row.template}]`);
      await renderHeroRow(row, args.dryRun);
    }
  }

  if (runOg) {
    for (const row of satoriRows) {
      if (row.hub_asset === 'og') {
        console.log(`  ${row.id || 'hub'} [${row.template}]`);
        await renderStandaloneOgRow(row, args.dryRun);
        continue;
      }
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
  }

  if (runOgDefault) {
    await renderOgDefault(args.dryRun);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error('Satori generation failed:', err);
  process.exit(1);
});
