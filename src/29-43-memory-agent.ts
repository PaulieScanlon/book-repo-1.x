import "dotenv/config";

import { mastra } from "./mastra";

const agent = mastra.getAgent("tokenLimiterAgent");

// Example: User asks about past feature discussion.
const stream = await agent.stream("What did we decided about the search feature last week?", {
  memory: {
    thread: "user-123",
    resource: "test-123",
    options: {
      lastMessages: 20,
      semanticRecall: {
        topK: 3,
        messageRange: 2
      }
    }
  }
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}
