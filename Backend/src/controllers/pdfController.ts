import { Request, Response } from "express";
import { IPdfService } from "../services/pdfService";

interface AuthRequest extends Request {
  user?: { userId: string };
}

export class PdfController {
  constructor(private pdfService: IPdfService) {}

  async uploadPdf(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new Error("Unauthorized: No user ID found");
      const file = req.file as Express.Multer.File;
      const pdf = await this.pdfService.uploadPdf(userId, file);
      res.status(201).json({
        success: true,
        message: "PDF uploaded successfully",
        pdf,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserPdfs(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new Error("Unauthorized: No user ID found");
      const pdfs = await this.pdfService.getUserPdfs(userId);
      res.status(200).json({
        success: true,
        pdfs,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}