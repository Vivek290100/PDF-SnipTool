import { Request, Response, NextFunction } from "express";

export const responseLogger = (req: Request, res: Response, next: NextFunction) => {
  const oldJson = res.json;

  res.json = function (data) {
    console.log("Response Data:", data);
    return oldJson.call(this, data);
  };

  next();
};
