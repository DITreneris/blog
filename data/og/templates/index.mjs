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
import { buildSplitCompare, buildSplitCompareOg } from './split-compare.mjs';
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
import { buildWorkflowCanvas } from './workflow-canvas.mjs';
import { buildFrameworkChooser } from './framework-chooser.mjs';
import { buildProcurementTimeline } from './procurement-timeline.mjs';
import { buildImplementationStack } from './implementation-stack.mjs';
import { buildOperatingCadence } from './operating-cadence.mjs';
import { buildWorkflowRoi } from './workflow-roi.mjs';
import { buildAgentOrchestrator } from './agent-orchestrator.mjs';
import { buildEvalHooksWorksheet } from './eval-hooks-worksheet.mjs';
import { buildPromptRegressionWeek } from './prompt-regression-week.mjs';
import { buildClearScorecardWorksheet } from './clear-scorecard-worksheet.mjs';
import { buildTeamRitualsWorksheet } from './team-rituals-worksheet.mjs';
import { buildRiskForumWorksheet } from './risk-forum-worksheet.mjs';
import { buildBusinessOutcomesFlow } from './business-outcomes-flow.mjs';
import { buildMultiAgentHandoffWorksheet } from './multi-agent-handoff-worksheet.mjs';
import { buildCaseStudyFinance } from './case-study-finance.mjs';
import { buildMcpSecurityControls } from './mcp-security-controls.mjs';
import { buildHumanHandoffWorksheet } from './human-handoff-worksheet.mjs';
import { buildAgentFrameworkComparison } from './agent-framework-comparison.mjs';
import { buildXPublishLoop } from './x-publish-loop.mjs';
import { buildTelegramCurriculumCms } from './telegram-curriculum-cms.mjs';
import { buildSixBlockWorksheet } from './six-block-worksheet.mjs';
import { buildSixBlockCanvas } from './six-block-canvas.mjs';
import { buildRolePathsFork } from './role-paths-fork.mjs';
import {
  buildMultiAgentObservabilityWorksheet,
  buildMultiAgentObservabilityOg,
} from './multi-agent-observability-worksheet.mjs';
import { buildGroundingSystemWorksheet } from './grounding-system-worksheet.mjs';
import {
  buildHandoffTriggerTable,
  buildHandoffTriggerTableOg,
} from './handoff-trigger-table.mjs';
import { buildGlossaryRoutingMap } from './glossary-routing-map.mjs';
import {
  buildScaleCapabilityGates,
  buildScaleCapabilityGatesOg,
} from './scale-capability-gates.mjs';

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
  'split-compare-og': buildSplitCompareOg,
  'tier-ladder': buildTierLadder,
  'context-window-tube': buildContextWindowTube,
  'memory-tiers': buildMemoryTiers,
  'grounding-stack': buildGroundingStack,
  'context-rot': buildContextRot,
  'checklist-worksheet': buildChecklistWorksheet,
  'security-controls': buildSecurityControls,
  'observability-trace': buildObservabilityTrace,
  'workflow-canvas': buildWorkflowCanvas,
  'framework-chooser': buildFrameworkChooser,
  'procurement-timeline': buildProcurementTimeline,
  'implementation-stack': buildImplementationStack,
  'operating-cadence': buildOperatingCadence,
  'workflow-roi': buildWorkflowRoi,
  'agent-orchestrator': buildAgentOrchestrator,
  'eval-hooks-worksheet': buildEvalHooksWorksheet,
  'prompt-regression-week': buildPromptRegressionWeek,
  'clear-scorecard-worksheet': buildClearScorecardWorksheet,
  'team-rituals-worksheet': buildTeamRitualsWorksheet,
  'risk-forum-worksheet': buildRiskForumWorksheet,
  'business-outcomes-flow': buildBusinessOutcomesFlow,
  'multi-agent-handoff-worksheet': buildMultiAgentHandoffWorksheet,
  'case-study-finance': buildCaseStudyFinance,
  'mcp-security-controls': buildMcpSecurityControls,
  'human-handoff-worksheet': buildHumanHandoffWorksheet,
  'agent-framework-comparison': buildAgentFrameworkComparison,
  'x-publish-loop': buildXPublishLoop,
  'telegram-curriculum-cms': buildTelegramCurriculumCms,
  'six-block-worksheet': buildSixBlockWorksheet,
  'six-block-canvas': buildSixBlockCanvas,
  'role-paths-fork': buildRolePathsFork,
  'multi-agent-observability-worksheet': buildMultiAgentObservabilityWorksheet,
  'multi-agent-observability-og': buildMultiAgentObservabilityOg,
  'grounding-system-worksheet': buildGroundingSystemWorksheet,
  'handoff-trigger-table': buildHandoffTriggerTable,
  'handoff-trigger-table-og': buildHandoffTriggerTableOg,
  'glossary-routing-map': buildGlossaryRoutingMap,
  'scale-capability-gates': buildScaleCapabilityGates,
  'scale-capability-gates-og': buildScaleCapabilityGatesOg,
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
