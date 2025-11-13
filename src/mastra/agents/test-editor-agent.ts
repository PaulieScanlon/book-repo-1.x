import { Agent } from "@mastra/core/agent";

export const editorAgent = new Agent({
  name: "Editor",
  instructions: "You are an editor agent that edits blog post copy.",
  model: "openai/gpt-4o-mini"
});
