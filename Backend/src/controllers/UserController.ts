// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\controllers\UserController.ts
import { Request, Response } from "express";
import UserService from "../services/userService";

interface AuthRequest extends Request {
  user?: { userId: string };
}

class UserController {
  constructor(private _userService: UserService) {}

  async signUpUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, userName } = req.body;
      const result = await this._userService.initiateSignUp({
        email,
        password,
        userName,
      });

      res.status(200).json({
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
      const { user } = await this._userService.loginUser(email, password);

      const filteredUser = {
        id: user._id,
        userName: user.userName,
        email: user.email,
        joinedDate: user.joinedDate,
      };

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: filteredUser,
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

      await this._userService.logout(userId);

      res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default UserController;