import { buildCaseStudySupport } from './case-study-support.mjs';

/** Finance close case study — distinct template id from support Part 1. */
export function buildCaseStudyFinance(props) {
  return buildCaseStudySupport({
    ...props,
    vertical: 'finance',
    subtitle:
      props.subtitle ||
      'Finance close assist — controlled draft, human review, audit trail per narrative.',
  });
}
