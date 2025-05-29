// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\repositories\UserRepository.ts

import { IUserRepository } from "../interfaces/IUserRepository";
import User from "../models/userModel";
import { IUser } from "../types/IUser";

export class UserRepository implements IUserRepository {
  async create(user: Partial<IUser>): Promise<IUser> {
    return await User.create(user);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).exec();
  }

  async findByUsername(userName: string): Promise<IUser | null> {
    return await User.findOne({ userName }).exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id).exec();
  }
}
