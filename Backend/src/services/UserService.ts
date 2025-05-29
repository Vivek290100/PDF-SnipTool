// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\services\UserService.ts
import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUser } from "../types/IUser";
import bcrypt from "bcrypt";
import { ValidationError, NotFoundError, AuthenticationError } from "../utils/errors";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async initiateSignUp(data: Partial<IUser>): Promise<{ email: string }> {
    if (!data.email || !data.password || !data.userName) {
      throw new ValidationError("Required fields are missing");
    }

    if (!this.validateEmail(data.email)) {
      throw new ValidationError("Invalid email format");
    }

    const existingUser =
      (await this.userRepository.findByEmail(data.email)) ||
      (await this.userRepository.findByUsername(data.userName));
    if (existingUser) {
      throw new ValidationError("User with this email or username already exists");
    }

    const userData = {
      userName: data.userName,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      joinedDate: new Date(),
    };

    await this.userRepository.create(userData);
    return { email: data.email };
  }

  async loginUser(email: string, password: string): Promise<{ user: { userId: string; email: string; userName: string } }> {
    if (!this.validateEmail(email)) {
      throw new ValidationError("Invalid email format");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid password");
    }

    return {
      user: {
        userId: user._id.toString(),
        email: user.email,
        userName: user.userName,
      },
    };
  }

  async logout(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    // Implement logout logic, e.g., invalidate tokens or sessions
  }
}
