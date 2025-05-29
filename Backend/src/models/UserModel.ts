// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\models\UserModel.ts
import { Schema, model } from "mongoose";
import { IUser } from "../types/IUser";

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joinedDate: { type: Date, default: Date.now },
});

const User = model<IUser>("User", userSchema);
export default User;