// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\interfaces\IUser.ts

import { Document as MongooseDocument } from "mongoose";

export interface IUser extends MongooseDocument {
  _id: string;
  userName: string;
  email: string;
  password: string;
  joinedDate?: Date;
}