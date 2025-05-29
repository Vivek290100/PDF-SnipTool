// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\controllers\UserController.ts
import { Request, Response } from "express";
import { IUserService } from "../interfaces/IUserService";

interface AuthRequest extends Request {
  user?: { userId: string };
}

export class UserController {
  constructor(private userService: IUserService) {}

  async signUpUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, userName } = req.body;
      const result = await this.userService.initiateSignUp({ email, password, userName });
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        email: result.email,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user } = await this.userService.loginUser(email, password);
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async logout(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new Error("Unauthorized: No user ID found");
      await this.userService.logout(userId);
      res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
