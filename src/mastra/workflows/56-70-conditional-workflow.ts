import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";

const fetchDataStep = createStep({
  id: "fetchData",
  inputSchema: z.object({
    location: z.string()
  }),
  outputSchema: z.object({
    success: z.boolean(),
    data: z.string().optional()
  }),
  execute: async ({ inputData }) => {
    const { location } = inputData;

    const response = await fetch(`https://wttr.in/${location}?format=3`);
    const weather = await response.text();

    if (!response.ok) {
      return { success: false };
    }

    return {
      success: true,
      data: weather
    };
  }
});

const processDataStep = createStep({
  id: "processData",
  inputSchema: z.object({
    success: z.boolean(),
    data: z.string().optional()
  }),
  outputSchema: z.object({
    result: z.string()
  }),
  execute: async ({ inputData }) => {
    const processed = inputData.data?.toUpperCase() || "";
    return {
      result: `Processed: ${processed}`
    };
  }
});

export const conditionalWorkflow = createWorkflow({
  id: "conditional-workflow",
  inputSchema: z.object({
    location: z.string()
  }),
  outputSchema: z.object({
    result: z.string()
  })
})
  .then(fetchDataStep)
  .branch([
    [
      async ({ getStepResult }) => {
        const result = getStepResult("fetchData");
        return result.success === true;
      },
      processDataStep
    ]
  ])
  .commit();
