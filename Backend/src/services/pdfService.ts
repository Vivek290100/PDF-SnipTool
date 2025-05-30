import { IPdfRepository } from "../repositories/pdfRepository";
import { IPdf } from "../models/pdfModel";
import { ValidationError } from "../utils/errors";
import pdfParse from "pdf-parse";
import fs from "fs/promises";
import path from "path";

export interface IPdfService {
  uploadPdf(userId: string, file: Express.Multer.File): Promise<IPdf>;
  getUserPdfs(userId: string): Promise<IPdf[]>;
}

export class PdfService implements IPdfService {
  constructor(private pdfRepository: IPdfRepository) {}

  async uploadPdf(userId: string, file: Express.Multer.File): Promise<IPdf> {
    if (!file) {
      throw new ValidationError("No file uploaded");
    }
    if (file.mimetype !== "application/pdf") {
      throw new ValidationError("Only PDF files are allowed");
    }

    // Get page count using pdf-parse
    const buffer = await fs.readFile(file.path);
    const pdfData = await pdfParse(buffer);
    const pageCount = pdfData.numpages;

    const pdfDataToStore: Partial<IPdf> = {
      userId,
      fileName: file.originalname,
      filePath: file.path,
      pageCount,
      uploadDate: new Date(),
    };

    return await this.pdfRepository.create(pdfDataToStore);
  }

  async getUserPdfs(userId: string): Promise<IPdf[]> {
    return await this.pdfRepository.findByUserId(userId);
  }
}