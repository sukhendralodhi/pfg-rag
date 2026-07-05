import { Chroma } from "@langchain/community/vectorstores/chroma";
import { Document } from "@langchain/core/documents";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChromaClient } from "chromadb";
import dotenv from "dotenv";
dotenv.config();

class VectorService {
    private readonly embeddings: GoogleGenerativeAIEmbeddings;
    private readonly client: ChromaClient;

    constructor() {
        this.embeddings = new GoogleGenerativeAIEmbeddings({
            model: "gemini-embedding-001",
            apiKey: process.env.GOOGLE_API_KEY!
        });

        this.client = new ChromaClient({
            host: "localhost",
            port: 8000
        })
    }

    /**
    * Store document chunks in ChromaDB
    */

    async indexDocuments(
        chunks: Document[],
        collectionName: string
    ): Promise<Chroma> {
        try {
            const sanitizedChunks = chunks.map((chunk) => ({
                ...chunk,
                metadata: Object.fromEntries(
                    Object.entries(chunk.metadata).filter(
                        ([, value]) =>
                            value === null || ["string", "number", "boolean"].includes(typeof value)
                    )
                ),
            }));

            const vectorStore = await Chroma.fromDocuments(
                sanitizedChunks,
                this.embeddings,
                {
                    index: this.client,
                    collectionName,
                }
            );

            return vectorStore;
        } catch (error) {
            console.error("Vector Store Error:", error);
            throw new Error("Failed to index documents.");
        }
    }

    /**
     * Load an existing collection
     */

    async getVectorStore(collectionName: string): Promise<Chroma> {
        return new Chroma(this.embeddings, {
            index: this.client,
            collectionName
        });
    }

    async deleteCollection(collectionName: string): Promise<void> {
        await this.client.deleteCollection({
            name: collectionName,
        });
    }

    async listCollections() {
        return await this.client.listCollections();
    }

}

export default new VectorService();