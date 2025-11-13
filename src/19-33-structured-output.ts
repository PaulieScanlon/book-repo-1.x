import "dotenv/config";

import { mastra } from "./mastra";
import { z } from "zod";

const structuredAgent = mastra.getAgent("modelRouterAgent");

const response = await structuredAgent.generate("Define machine learning and give examples.", {
  structuredOutput: {
    schema: z.object({
      definition: z.string(),
      examples: z.array(z.string())
    })
  }
});

// Response data shape matches schema.
console.log(response.object);
