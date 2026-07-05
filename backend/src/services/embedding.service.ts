import type { Document } from "@langchain/core/documents";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config()

class EmbeddingService {

    private readonly embeddingModel: GoogleGenerativeAIEmbeddings;

    constructor() {
        this.embeddingModel = new GoogleGenerativeAIEmbeddings({
            model: "gemini-embedding-001",
            apiKey: process.env.GOOGLE_API_KEY!,
        });
    }

    /**
    * Generate embeddings for multiple documents
    */

    async embedDocuments(documents: Document[]): Promise<number[][]> {
        try {
            const texts = documents.map((doc) => doc.pageContent);

            return await this.embeddingModel.embedDocuments(texts);

        } catch (error) {
            console.error("Embedding Documents Error:", error);

            throw new Error("Failed to generate document embeddings.");
        }
    }

    async embedQuery(query: string): Promise<number[]> {
        try {
            return this.embeddingModel.embedQuery(query);
        } catch (error) {
            console.error("Embedding Query Error:", error);
            throw new Error("Failed to generate query embedding.");
        }
    }
}

export default new EmbeddingService();