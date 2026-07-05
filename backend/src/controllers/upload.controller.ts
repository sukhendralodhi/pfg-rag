import type { Request, Response } from "express";
import pdfService from "../services/pdf.service.js";


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

        return res.status(201).json({
            success: true,
            message: "PDF uploaded successfully",
            file: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
            },
            pages: documents.length,
            documents
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}