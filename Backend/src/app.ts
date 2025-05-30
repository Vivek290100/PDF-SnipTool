// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connectDb";
import userRouter from "./routes/userRoutes";
import morgan from "morgan";
import pdfRouter from "./routes/pdfRoutes";
import path from "path";
import fs from "fs";

dotenv.config();
connectDB();

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const app = express();
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());

app.use("/", userRouter);
app.use("/pdf", pdfRouter);


export default app;
