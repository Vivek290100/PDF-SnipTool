// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\interfaces\IUserRepository.ts

import { IUser } from "../types/IUser";

export interface IUserRepository {
  create(user: Partial<IUser>): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findByUsername(userName: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}
