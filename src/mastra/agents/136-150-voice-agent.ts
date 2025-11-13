import { Agent } from "@mastra/core/agent";
import { OpenAIVoice } from "@mastra/voice-openai";

export const voiceAgent = new Agent({
  name: "voice-agent",
  instructions: "You are a helpful assistant with voice capabilities.",
  model: "openai/gpt-4.1",
  voice: new OpenAIVoice()
});
