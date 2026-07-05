import type { Request, Response } from "express";
import chunkService from "../services/chunk.service.js";
import pdfService from "../services/pdf.service.js";
import embeddingService from "../services/embedding.service.js";


export const uploadPdf = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF file is required",
            });
        }

        const documents = await pdfService.load(req.file.path);

        // split into chunks 
        const chunks = await chunkService.split(documents);
        const embeddings = await embeddingService.embedDocuments(chunks);

        return res.status(201).json({
            success: true,
            message: "PDF uploaded successfully",
            file: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
            },
            totalPages: documents.length,
            totalChunks: chunks.length,
            totalEmbeddings: embeddings.length,
            embeddingDimension: embeddings[0]?.length,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}