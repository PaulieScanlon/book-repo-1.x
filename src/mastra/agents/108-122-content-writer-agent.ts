import { Agent } from "@mastra/core/agent";

import {
  createFaithfulnessScorer,
  createContentSimilarityScorer,
  createHallucinationScorer
} from "@mastra/evals/scorers/prebuilt";

export const ContentWriterAgent = new Agent({
  name: "context-writer-agent",
  instructions: "You are a content writer that creates accurate summaries.",
  model: "openai/gpt-4.1",
  scorers: {
    faithfulness: {
      // Checks accuracy of output
      scorer: createFaithfulnessScorer({ model: "openai/gpt-4.1-nano" })
    },
    similarity: {
      // Checks similarity of source and output
      scorer: createContentSimilarityScorer({
        ignoreWhitespace: true
      })
    },
    hallucination: {
      // Checks for contradictions between source and output
      scorer: createHallucinationScorer({ model: "openai/gpt-4.1-nano" })
    }
  }
});
