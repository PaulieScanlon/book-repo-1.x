// Create a run instance to start the workflow
import { mastra } from "./mastra";

const chainedWorkflow = mastra.getWorkflow("chainedWorkflow");

const run = await chainedWorkflow.createRun();

const result = await run.start({
  inputData: {
    userEmail: "hello@mastra.ai"
  }
});

// The final result of the workflow
if (result.status === "success") {
  console.log(result);
}
// Identify suspended step and payload
else if (result.status === "suspended") {
  const suspendStep = result.suspended[0];
  const suspendedPayload = result.steps[suspendStep[0]].suspendPayload;
  console.log(suspendedPayload);

  // Resume from the suspended step with the resume schema
  await run.resume({
    resumeData: {
      approved: true
    }
  });
}
// Only exists if status is failed
else if (result.status === "failed") {
  console.error(result.error);
}
