import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { userId: string };
}

const authMiddleware = (req: AuthRequest, res: Response,next: NextFunction): void => {
  const token = req.cookies?.accessToken;
  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized: No token provided" }); 
    return;}

  try {
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string) as { userId: string };
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Forbidden: Invalid token" });
    return;
  }
};

export default authMiddleware;
