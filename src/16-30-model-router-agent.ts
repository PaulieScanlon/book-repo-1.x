import "dotenv/config";

import { mastra } from "./mastra";

const agent = mastra.getAgent("modelRouterAgent");

const response = await agent.generate("What's the weather like?");

console.log(response.text);
