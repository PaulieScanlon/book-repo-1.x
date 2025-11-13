import { MCPClient } from "@mastra/mcp";
import { Agent } from "@mastra/core/agent";

const mcp = new MCPClient({
  servers: {
    weather: {
      command: "npx",
      args: ["tsx", "weather-server.ts"]
    }
  },
  timeout: 30000
});

export const mcpAgent = new Agent({
  name: "mcp-agent",
  instructions: "You can answer weather questions using the weather tool.",
  model: "openai/gpt-4.1",
  tools: await mcp.listTools()
});
