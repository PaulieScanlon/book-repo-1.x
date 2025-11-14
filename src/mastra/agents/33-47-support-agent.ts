import { Agent } from "@mastra/core/agent";

import { knowledgeBase } from "../tools/test-knowledge-base-tool";
import { ticketSystem } from "../tools/ticket-system-tool";
import { advancedAnalytics } from "../tools/test-advanced-analytics";
import { customIntegration } from "../tools/test-custom-integration";

export const supportAgent = new Agent({
  name: "support-agent",
  instructions: async ({ requestContext }) => {
    const userTier = requestContext.get("user-tier");
    const language = requestContext.get("language");

    return `You are a customer support agent for our SaaS Platform.
    The current user is on the ${userTier} tier and prefers the ${language} language.

    For ${userTier} tier users:
    ${userTier === "free" ? "- Provide basic support and documentation links." : ""}
    ${userTier === "pro" ? "- Offer detailed technical support and best practices." : ""}
    ${userTier === "enterprise" ? "- Provide priority support with custom solutions." : ""}

    Always respond in ${language} language.`;
  },
  model: ({ requestContext }) => {
    const userTier = requestContext.get("user-tier");
    return userTier === "enterprise" ? "openai/gpt-4o" : "openai/gpt-3.5-turbo";
  },
  tools: ({ requestContext }) => {
    const userTier = requestContext.get("user-tier");
    const baseTools = [knowledgeBase, ticketSystem];

    if (userTier === "pro" || userTier === "enterprise") {
      baseTools.push(advancedAnalytics);
    }

    if (userTier === "enterprise") {
      baseTools.push(customIntegration);
    }

    return baseTools;
  }
});
