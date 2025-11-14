import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { TokenLimiter } from "@mastra/memory/processors";

export const tokenAgent = new Agent({
  name: "token-agent",
  instructions: "Instructions for agent.",
  model: "openai/gpt-4o",
  memory: new Memory({
    processors: [
      // Ensure the total tokens from memory don't exceed ~127k.
      new TokenLimiter(127000)
    ]
  })
});
