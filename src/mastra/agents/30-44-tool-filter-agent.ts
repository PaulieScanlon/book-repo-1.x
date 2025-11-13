import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { TokenLimiter, ToolCallFilter } from "@mastra/memory/processors";

export const toolFilterAGent = new Agent({
  name: "tool-filter-agent",
  instructions: "Instructions for agent.",
  model: "openai/gpt-4.1",
  memory: new Memory({
    processors: [
      // Example 1: Remove all tool calls/results.
      new ToolCallFilter(),
      // Example 2: Remove only noisy image generation tool calls/results.
      new ToolCallFilter({
        exclude: ["generateImageTool"]
      }),
      // Always place TokenLimiter last.
      new TokenLimiter(127000)
    ]
  })
});
