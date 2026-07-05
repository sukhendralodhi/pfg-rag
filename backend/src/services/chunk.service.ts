import type { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


class ChunkService {
    private readonly splitter: RecursiveCharacterTextSplitter;

    constructor() {
        this.splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
    }
    /**
     * Split LangChain Documents into smaller chunks
     */
    async split(documents: Document[]): Promise<Document[]> {
        try {
            const chunks = await this.splitter.splitDocuments(documents);
            return chunks;
        } catch (error) {
            console.error("Chunk Service Error:", error);

            throw new Error("Unable to split document.");
        }
    }
}

export default new ChunkService();