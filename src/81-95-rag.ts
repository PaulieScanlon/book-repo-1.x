import "dotenv/config";

import { embed, embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { PgVector } from "@mastra/pg";
import { MDocument } from "@mastra/rag";

// // Initialize document
// const doc = MDocument.fromText(`Your document text here...`);

// // Create chunks
// const chunks = await doc.chunk({
//   strategy: "recursive",
//   maxSize: 512,
//   overlap: 50
// });

// // Generate embeddings; we need to pass the text of each chunk
// const { embeddings } = await embedMany({
//   values: chunks.map((chunk) => chunk.text),
//   //   model: "openai/text-embedding-3-small"
//   model: openai.embedding("text-embedding-3-small")
// });

// Store in vector database
const pgVector = new PgVector({
  id: "pg-vector",
  connectionString: process.env.POSTGRES_CONNECTION_STRING!
});

// // Create the index first (run once)
// await pgVector.createIndex({
//   indexName: "embeddings",
//   dimension: 1536
// });

// await pgVector.upsert({
//   indexName: "embeddings",
//   vectors: embeddings,
//   metadata: chunks.map((chunk) => ({ text: chunk.text }))
// }); // using an index name of 'embeddings'


// Retrieval: embed your query and search
const queryText = "Your search query here";

const { embedding: queryVector } = await embed({
  value: queryText,
  model: openai.embedding("text-embedding-3-small")
});

const results = await pgVector.query({
  indexName: "embeddings",
  queryVector: queryVector,
  topK: 3
});

console.log("Similar chunks:", results);
