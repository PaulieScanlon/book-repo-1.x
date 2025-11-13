import { MDocument } from "@mastra/rag";
import { PgVector } from "@mastra/pg";
import { embedMany } from "ai";

const pgVector = new PgVector({
  id: "pg-vector",
  connectionString: process.env.PG_CONNECTION_STRING!
});

export async function indexDocuments(texts: string[]) {
  const docs = texts.map((t) => MDocument.fromText(t));
  const allChunks = (
    await Promise.all(
      docs.map((d) =>
        d.chunk({
          strategy: "recursive",
          maxSize: 512,
          overlap: 50
        })
      )
    )
  ).flat();

  const { embeddings } = await embedMany({
    values: allChunks.map((c) => c.text),
    model: "openai/text-embedding-3-small"
  });

  await pgVector.createIndex({
    indexName: "embeddings",
    dimension: 1536
  });

  await pgVector.upsert({
    indexName: "embeddings",
    vectors: embeddings,
    metadata: allChunks.map((chunk) => ({ text: chunk.text }))
  });

  console.log(`✅ Indexed ${allChunks.length} chunks`);
}
