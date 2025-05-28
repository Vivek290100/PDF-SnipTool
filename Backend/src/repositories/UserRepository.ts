// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\repositories\UserRepository.ts

import { IUser } from "../interfaces/IUser";
import User from "../models/userModel";
import BaseRepository from "./baseRepository";
import { FilterQuery } from "mongoose";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.findByQuery({ email });
  }

  async findByUsername(userName: string): Promise<IUser | null> {
    return await this.findByQuery({ userName });
  }
}

export default UserRepository;