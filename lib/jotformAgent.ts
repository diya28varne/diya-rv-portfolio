/** Set in `.env.local` after you create the agent on Jotform. */
export const jotformAgentId =
  process.env.NEXT_PUBLIC_JOTFORM_AGENT_ID?.trim() || "";

export const jotformAgentConfigured = Boolean(jotformAgentId);
