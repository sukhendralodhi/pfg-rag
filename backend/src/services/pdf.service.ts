// for loading pdf 
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// Document[]: This is LangChain's specific data structure. The square brackets [] mean an Array (a list).
import type { Document } from "@langchain/core/documents";


export class PdfService {
    // Promise<...>: Because the function is async, it doesn't return the data instantly. Instead, it returns a "Promise" (a guarantee) that it will eventually finish processing and hand back the data.
    async load(filePath: string): Promise<Document[]> {
        try {
            const loader = new PDFLoader(filePath);

            const documents = await loader.load();

            return documents;
        } catch (error) {
            console.error("PDF Loading Error:", error);
            throw new Error("Unable to load PDF.");
        }
    }
}

export default new PdfService();