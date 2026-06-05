import { articleOgFrameWithDiagram } from './base.mjs';
import { buildHubWorkflowDiagram } from './hub-workflow-diagram.mjs';

/** Homepage social OG — 1200×630, diagram-right (matches live hub hero). */
export function buildHomepageOg(props) {
  return articleOgFrameWithDiagram({
    category: 'Knowledge Hub',
    title: props.title || 'Build AI workflows your team can actually repeat',
    subtitle:
      props.subtitle ||
      'Frameworks, templates, and field notes for repeatable AI workflows.',
    diagram: buildHubWorkflowDiagram(),
  });
}
