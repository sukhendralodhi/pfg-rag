import { v4 as uuid } from "uuid";
import type { IndexDocumentResponse } from "../types/document.js";
import chunkService from "./chunk.service.js";
import pdfService from "./pdf.service.js";
import vectorService from "./vector.service.js";

class DocumentIndexService {
    async index(
        filePath: string,
    ): Promise<IndexDocumentResponse> {
        const documentId = `pdf_${uuid()}`;
        // step 1
        const documents = await pdfService.load(filePath);
        // step 2
        const chunks = await chunkService.split(documents);
        await vectorService.indexDocuments(
            chunks,
            documentId
        )

        return {
            pages: documents.length,
            chunks: chunks.length,
            documentId,
        }
    }

}

export default new DocumentIndexService();