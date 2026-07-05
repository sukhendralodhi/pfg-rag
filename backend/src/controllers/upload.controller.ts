import type { Request, Response } from "express";
import documentIndexService from "../services/document-index.service.js";


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

        // const documents = await pdfService.load(req.file.path);

        // split into chunks 
        // const chunks = await chunkService.split(documents);
        // const embeddings = await embeddingService.embedDocuments(chunks);
        // const vectorStore = await vectorService.indexDocuments(
        //     chunks,
        //     "my-pdf-docs"
        // );

        const result = await documentIndexService.index(
            req.file.path,
        )

        // return res.status(201).json({
        //     success: true,
        //     message: "PDF uploaded successfully",
        //     file: {
        //         filename: req.file.filename,
        //         originalName: req.file.originalname,
        //         size: req.file.size,
        //     },
        //     totalPages: documents.length,
        //     totalChunks: chunks.length,
        //     collection: "my-pdf-docs"
        //     // totalEmbeddings: embeddings.length,
        //     // embeddingDimension: embeddings[0]?.length,
        // });

        return res.status(201).json({

            success: true,

            message:
                "PDF indexed successfully.",

            file: {

                filename:
                    req.file.filename,

                originalName:
                    req.file.originalname,

                size:
                    req.file.size,

            },

            ...result,

        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}