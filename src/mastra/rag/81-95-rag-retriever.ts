import { PgVector } from "@mastra/pg";
import { embed } from "ai";

const pgVector = new PgVector({
  id: "pg-vector",
  connectionString: process.env.PG_CONNECTION_STRING!
});

export async function getRelevantContext(query: string): Promise<string> {
  const { embedding } = await embed({
    value: query,
    model: "openai/text-embedding-3-small"
  });

  const results = await pgVector.query({
    indexName: "embeddings",
    queryVector: embedding,
    topK: 5
  });

  return results.map((r) => r?.metadata?.text as string).join("\n\n");
}
