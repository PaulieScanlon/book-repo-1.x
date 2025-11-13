import { Mastra } from "@mastra/core/mastra";

import { weatherAgent as modelRouterAgent } from "./agents/16-30-model-router-agent";
import { weatherAgent as aisdkAgent } from "./agents/x-32-aisdk-agent";
import { tokenLimiterAgent } from "./agents/29-43-token-limiter-agent";
import { copywriterAgent } from "./agents/test-copywriter-agent";
import { editorAgent } from "./agents/test-editor-agent";
import { voiceAgent } from "./agents/136-150-voice-agent";

import { conditionalWorkflow } from "./workflows/56-70-conditional-workflow";
import { chainedWorkflow } from "./workflows/61-75-chained-workflow";

import { weatherTool } from "./tools/21-35-weather-tool";

import { weatherServer } from "./mcp/45-59-weather-server";

export const mastra = new Mastra({
  agents: { modelRouterAgent, aisdkAgent, tokenLimiterAgent, copywriterAgent, editorAgent, voiceAgent },
  workflows: { conditionalWorkflow, chainedWorkflow },
  tools: { weatherTool },
  mcpServers: { weatherServer }
});

// import { Mastra } from "@mastra/core/mastra";

// import { chainedWorkflow } from "./workflows/61-75-chained-workflow";

// export const mastra = new Mastra({
//   workflows: { chainedWorkflow }
// });
