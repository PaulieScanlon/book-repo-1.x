import { MCPServer } from "@mastra/mcp";
import { weatherTool } from "../tools/21-35-weather-tool";

export const weatherServer = new MCPServer({
  name: "weather-server",
  version: "1.0.0",
  tools: { weatherTool },
});

await weatherServer.startStdio();
