import dotenv from "dotenv";

dotenv.config(); 

export const CONFIG = {
  PORT: process.env.PORT,
  DB_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

