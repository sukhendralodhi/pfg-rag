import { Router } from "express";
import { uploadPdf } from "../controllers/upload.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.post("/", upload.single("pdf"), uploadPdf);

export default router;