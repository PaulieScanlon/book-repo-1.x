import { Agent } from "@mastra/core/agent";

export const weatherAgent = new Agent({
  name: "weather-agent",
  instructions: "Instructions for agent.",
  model: "openai/gpt-4o" // Model comes from Mastra's model router.
});
