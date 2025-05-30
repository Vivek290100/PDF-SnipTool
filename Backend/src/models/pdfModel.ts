

import { Schema, model } from "mongoose";

export interface IPdf {
  userId: string;
  fileName: string;
  filePath: string;
  pageCount: number;
  uploadDate: Date;
}

const pdfSchema = new Schema<IPdf>({
  userId: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  pageCount: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
});

const Pdf = model<IPdf>("Pdf", pdfSchema);
export default Pdf;