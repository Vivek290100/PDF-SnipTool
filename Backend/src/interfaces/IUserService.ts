//C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\interfaces\IUserService.ts

import { IUser } from "../types/IUser";

export interface IUserService {
  initiateSignUp(data: Partial<IUser>): Promise<{ email: string }>;
  loginUser(email: string, password: string): Promise<{ user: { userId: string; email: string; userName: string } }>;
  logout(userId: string): Promise<void>;
}

