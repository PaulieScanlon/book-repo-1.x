import { Agent } from "@mastra/core/agent";

import { copywriterTool } from "../tools/test-copywriter-tool";
import { editorTool } from "../tools/test-editor-tool";

export const publisherAgent = new Agent({
  name: "publisherAgent",
  instructions: `You are a publisher agent that coordinates content creation.
  First call the copywriter for initial content, then the editor for refinement.`,
  model: "openai/gpt-4o",
  tools: { copywriterTool, editorTool }
});
