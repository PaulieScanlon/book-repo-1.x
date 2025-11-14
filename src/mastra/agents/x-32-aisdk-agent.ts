import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const weatherAgent = new Agent({
  name: "weather-agent",
  instructions: "Instructions for agent.",
  model: openai("gpt-4o") // Model comes from ai-sdk.
});

// Use the agent.
const response = await weatherAgent.generate("What's the weather like?");
