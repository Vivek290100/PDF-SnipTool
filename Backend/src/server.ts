// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\server.ts
console.log("Starting server...");
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🌐 Server running http://localhost:${PORT}`);
});
