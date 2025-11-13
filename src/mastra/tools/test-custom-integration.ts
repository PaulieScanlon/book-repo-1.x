import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const customIntegration = createTool({
  id: "custom-integration-tool",
  description: "",
  inputSchema: z.object({
    query: z.string()
  }),
  outputSchema: z.object({
    information: z.string()
  }),
  execute: async (inputData) => {
    const { query } = inputData;

    const information = ""

    return { information };
  }
});
