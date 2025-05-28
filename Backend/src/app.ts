// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connectDb";
import userRouter from "./routes/userRoutes";

dotenv.config();
connectDB();

const app = express();

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


export default app;
