import { buildSecurityControls } from './security-controls.mjs';

const MCP_CONTROLS = [
  { control: 'Server allowlist', allow: 'Named MCP hosts', deny: 'Wildcard tool discovery' },
  { control: 'OAuth / OIDC', allow: 'Scoped tokens per workflow', deny: 'Shared service account' },
  { control: 'Prompt injection', allow: 'Sanitize tool output', deny: 'Raw payload → model' },
  { control: 'Audit', allow: 'Tool + args hash logged', deny: 'Silent side effects' },
];

/** MCP security playbook — allow/deny matrix (distinct from enterprise MCP architecture hero). */
export function buildMcpSecurityControls(props) {
  return buildSecurityControls({
    ...props,
    controls: props.controls || MCP_CONTROLS,
    subtitle:
      props.subtitle ||
      'MCP tool security — allowlists, scoped auth, injection defense, audit logging.',
  });
}
