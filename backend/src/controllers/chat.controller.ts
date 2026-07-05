import type { Request, Response } from "express";
import ragService from "../services/rag.service.js";

export const chat = async (
    req: Request,
    res: Response
) => {

    try {

        const { documentId, message } = req.body;

        if (!documentId) {
            return res.status(400).json({
                success: false,
                message: "documentId is required",
            });
        }

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "message is required",
            });
        }

        const response = await ragService.ask({
            documentId,
            question: message,
        });

        return res.status(200).json({
            success: true,
            data: response,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};