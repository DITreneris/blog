import { brand, sizes } from '../brand.mjs';
import { articleOgFrameWithDiagram } from './base.mjs';
import { buildHubWorkflowDiagram } from './hub-workflow-diagram.mjs';

/** Site-wide fallback OG — 1200×630, diagram-right. */
export function buildOgDefault() {
  return articleOgFrameWithDiagram({
    category: 'Knowledge Hub',
    title: brand.name,
    subtitle: brand.tagline,
    diagram: buildHubWorkflowDiagram(),
  });
}

export const ogDefaultSize = { width: sizes.ogWidth, height: sizes.ogHeight };
