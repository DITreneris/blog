import { buildContextArchitecture } from './context-architecture.mjs';
import { buildCaseStudySupport } from './case-study-support.mjs';
import { buildPromptRegistry } from './prompt-registry.mjs';
import { buildMultiAgentHandoff } from './multi-agent-handoff.mjs';
import { buildBusinessOutcomes } from './business-outcomes.mjs';
import { buildOgDefault } from './og-default.mjs';

/** @type {Record<string, (props: object) => object>} */
export const TEMPLATES = {
  'context-architecture': buildContextArchitecture,
  'case-study-support': buildCaseStudySupport,
  'prompt-registry': buildPromptRegistry,
  'multi-agent-handoff': buildMultiAgentHandoff,
  'business-outcomes': buildBusinessOutcomes,
  'og-default': buildOgDefault,
};

export function getTemplate(name) {
  const fn = TEMPLATES[name];
  if (!fn) {
    throw new Error(`Unknown Satori template: ${name}`);
  }
  return fn;
}
