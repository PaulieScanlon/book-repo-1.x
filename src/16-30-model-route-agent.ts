import "dotenv/config";

import { mastra } from "./mastra";
import { z } from "zod";

const agent = mastra.getAgent("modelRouterAgent");

const response = await agent.generate("What's the weather like?");
