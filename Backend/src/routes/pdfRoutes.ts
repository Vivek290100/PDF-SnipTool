import { Router } from "express";
import { PdfRepository } from "../repositories/pdfRepository";
import { PdfService } from "../services/pdfService";
import authMiddleware from "../middlewares/authMiddleware";
import multer from "multer";
import path from "path";
import { PdfController } from "../controllers/pdfController";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const pdfRouter = Router();
const pdfRepository = new PdfRepository();
const pdfService = new PdfService(pdfRepository);
const pdfController = new PdfController(pdfService);

pdfRouter.post("/upload", authMiddleware, upload.single("pdf"), pdfController.uploadPdf.bind(pdfController));
pdfRouter.get("/user-pdfs", authMiddleware, pdfController.getUserPdfs.bind(pdfController));

export default pdfRouter;