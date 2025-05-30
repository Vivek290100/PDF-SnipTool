import Pdf, { IPdf } from "../models/pdfModel";

export interface IPdfRepository {
  create(pdf: Partial<IPdf>): Promise<IPdf>;
  findById(id: string): Promise<IPdf | null>;
  findByUserId(userId: string): Promise<IPdf[]>;
}

export class PdfRepository implements IPdfRepository {
  async create(pdf: Partial<IPdf>): Promise<IPdf> {
    return await Pdf.create(pdf);
  }

  async findById(id: string): Promise<IPdf | null> {
    return await Pdf.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<IPdf[]> {
    return await Pdf.find({ userId }).exec();
  }
}