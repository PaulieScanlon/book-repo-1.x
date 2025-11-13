import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { TokenLimiter } from "@mastra/memory/processors";

export const tokenLimiterAgent = new Agent({
  name: "token-limiter-agent",
  instructions: "Instructions for agent.",
  model: "openai/gpt-4.1",
  memory: new Memory({
    processors: [
      // Ensure the total tokens from memory don't exceed ~127k.
      new TokenLimiter(127000)
    ]
  })
});
