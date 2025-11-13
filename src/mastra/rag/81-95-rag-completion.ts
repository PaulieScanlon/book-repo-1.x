import { generateText } from "ai";
import { getRelevantContext } from "./81-95-rag-retriever.js";

export async function generateAnswer(query: string): Promise<string> {
  const context = await getRelevantContext(query);

  const { text } = await generateText({
    model: "openai/gpt-4o-mini",
    prompt: `Please answer the following question:
${query}

Based on this context: ${context}
If the context lacks sufficient information, please state that explicitly.`
  });

  return text;
}
