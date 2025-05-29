// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\middlewares\authMiddleware.ts

import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: { userId: string };
}

export default function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const userId = req.body.userId;
  console.log("midddllellelelle", userId);
  
  if (!userId) {
    res.status(401).json({ success: false, message: "not getting userId in middleware" });
    return;
  }

  req.user = { userId };
  next();
}