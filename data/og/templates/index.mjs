import { buildContextArchitecture } from './context-architecture.mjs';
import { buildCaseStudySupport } from './case-study-support.mjs';
import { buildPromptRegistry } from './prompt-registry.mjs';
import { buildMultiAgentHandoff } from './multi-agent-handoff.mjs';
import { buildBusinessOutcomes } from './business-outcomes.mjs';
import { buildOgDefault } from './og-default.mjs';
import { buildCategoryDefault } from './category-default.mjs';
import { buildArticleOg } from './article-og.mjs';
import { buildHomepageHeroFrame } from './homepage-hero-frame.mjs';
import { buildHomepageOg } from './homepage-og.mjs';
import { buildCategoryOg } from './category-og.mjs';
import { buildGovernanceRaci } from './governance-raci.mjs';
import { buildGovernanceAuditLog } from './governance-audit-log.mjs';
import { buildGovernanceEvalGates } from './governance-eval-gates.mjs';
import { buildClearScorecard } from './clear-scorecard.mjs';
import { buildRagLadder } from './rag-ladder.mjs';
import { buildMcpArchitecture } from './mcp-architecture.mjs';
import { buildPlatformComparison } from './platform-comparison.mjs';
import { buildCaseStudyEvalScale } from './case-study-eval-scale.mjs';
import { buildGlossaryTerms } from './glossary-terms.mjs';
import { buildSplitCompare } from './split-compare.mjs';
import { buildTierLadder } from './tier-ladder.mjs';
import { buildContextWindowTube } from './context-window-tube.mjs';
import { buildMemoryTiers } from './memory-tiers.mjs';
import { buildGroundingStack } from './grounding-stack.mjs';
import { buildContextRot } from './context-rot.mjs';
import { buildChecklistWorksheet } from './checklist-worksheet.mjs';
import { buildSecurityControls } from './security-controls.mjs';
import { buildObservabilityTrace } from './observability-trace.mjs';
import { buildGovernanceRaciWorksheet } from './governance-raci-worksheet.mjs';
import { buildPromptRegistryBlueprint } from './prompt-registry-blueprint.mjs';

/** @type {Record<string, (props: object) => object>} */
export const TEMPLATES = {
  'context-architecture': buildContextArchitecture,
  'case-study-support': buildCaseStudySupport,
  'case-study-eval-scale': buildCaseStudyEvalScale,
  'prompt-registry': buildPromptRegistry,
  'prompt-registry-blueprint': buildPromptRegistryBlueprint,
  'multi-agent-handoff': buildMultiAgentHandoff,
  'business-outcomes': buildBusinessOutcomes,
  'governance-raci': buildGovernanceRaci,
  'governance-raci-worksheet': buildGovernanceRaciWorksheet,
  'governance-audit-log': buildGovernanceAuditLog,
  'governance-eval-gates': buildGovernanceEvalGates,
  'clear-scorecard': buildClearScorecard,
  'rag-ladder': buildRagLadder,
  'mcp-architecture': buildMcpArchitecture,
  'platform-comparison': buildPlatformComparison,
  'glossary-terms': buildGlossaryTerms,
  'split-compare': buildSplitCompare,
  'tier-ladder': buildTierLadder,
  'context-window-tube': buildContextWindowTube,
  'memory-tiers': buildMemoryTiers,
  'grounding-stack': buildGroundingStack,
  'context-rot': buildContextRot,
  'checklist-worksheet': buildChecklistWorksheet,
  'security-controls': buildSecurityControls,
  'observability-trace': buildObservabilityTrace,
  'og-default': buildOgDefault,
  'category-default': buildCategoryDefault,
  'article-og': buildArticleOg,
  'homepage-hero-frame': buildHomepageHeroFrame,
  'homepage-og': buildHomepageOg,
  'category-og': buildCategoryOg,
};

export function getTemplate(name) {
  const fn = TEMPLATES[name];
  if (!fn) {
    throw new Error(`Unknown Satori template: ${name}`);
  }
  return fn;
}
