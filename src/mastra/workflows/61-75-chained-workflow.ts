import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";

const step1 = createStep({
  id: "step-1",
  inputSchema: z.object({
    userEmail: z.string()
  }),
  outputSchema: z.object({
    output: z.string()
  }),
  execute: async () => {
    return {
      output: ""
    };
  }
});

const step2 = createStep({
  id: "step-2",
  inputSchema: z.object({
    output: z.string()
  }),
  outputSchema: z.object({
    output: z.string()
  }),
  execute: async () => {
    return {
      output: ""
    };
  }
});

const step3 = createStep({
  id: "step-3",
  inputSchema: z.object({
    output: z.string()
  }),
  outputSchema: z.object({
    output: z.string()
  }),
  execute: async () => {
    return {
      output: ""
    };
  }
});

// const step1 = createStep({ ... })
// const step2 = createStep({ ... })
// const step3 = createStep({ ... })

export const chainedWorkflow = createWorkflow({
  id: "chained-workflow",
  inputSchema: z.object({
    userEmail: z.string()
  }),
  outputSchema: z.object({
    output: z.string()
  })
})
  .then(step1)
  .then(step2)
  .then(step3)
  .commit();
