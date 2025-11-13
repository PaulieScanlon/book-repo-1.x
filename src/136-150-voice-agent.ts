import "dotenv/config";
import { createReadStream } from "fs";

import { mastra } from "./mastra";

const voiceAgent = mastra.getAgent("voiceAgent");

const audioStream = createReadStream("./src/audio/catgirl.mp3");

const text = await voiceAgent.voice.listen(audioStream);
console.log(text)
