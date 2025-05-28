// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\middlewares\authMiddleware.ts

import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: { userId: string };
}

export default function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const userId = req.headers["x-user-id"] as string; // Example: Expect user ID in header
  if (!userId) {
    res.status(401).json({ success: false, message: "Unauthorized: No user ID provided" });
    return;
  }

  req.user = { userId };
  next();
}