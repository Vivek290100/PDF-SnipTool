import { IUser } from "../interfaces/IUser";
import User from "../models/UserModel";
import BaseRepository from "./BaseRepository";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }
}

export default UserRepository
